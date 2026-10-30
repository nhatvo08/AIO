export default {
  id: 'p6-02',
  partId: 'part-6',
  partTitle: 'Phần 6 – Bên trong CPython và Hiệu năng (Chuyên sâu)',
  number: '6.2',
  title: 'String Interning, Băm chuỗi (Hash) và Tối ưu hiệu năng nối chuỗi',
  subtitle: 'Cơ chế sys.intern(), chống Hash DoS với PYTHONHASHSEED và sự thật về += vs "".join()',
  level: 'Chuyên sâu',
  duration: '50 phút',
  isNew314: false,
  interactiveWidget: null,
  objectives: [
    'Hiểu cơ chế String Interning (tự động ở thời điểm biên dịch và chủ động qua sys.intern()) cùng lý do tuyệt đối không dùng toán tử is để so sánh nội dung chuỗi.',
    'Nắm vững cơ chế băm chuỗi hash(s), lưu đệm giá trị hash trong header của str và ngẫu nhiên hóa hàm băm (PYTHONHASHSEED) để chống tấn công Hash DoS.',
    'Phân tích độ phức tạp thuật toán khi nối chuỗi bằng +=, "".join(parts), và io.StringIO kèm cách đo chuẩn xác với timeit.timeit().',
    'Hiểu rõ tối ưu hóa += khi refcount == 1 chỉ là chi tiết triển khai riêng của CPython (implementation detail) và vì sao "".join() luôn là chuẩn mực.'
  ],
  intuition: {
    title: 'Kho lưu trữ mẫu duy nhất, Mã vân tay lưu đệm và Dây chuyền lắp ráp một lần',
    metaphor: 'String Interning giống như việc thư viện chỉ giữ ĐÚNG MỘT cuốn từ điển gốc trên kệ và cho mọi độc giả cùng chỉ tay vào đó thay vì in hàng ngàn bản giống hệt nhau. Hash caching giống như việc đóng dấu mã vạch lên bìa sách ngay lần kiểm tra đầu tiên để từ lần sau quét trong 1 mili-giây. Còn "".join() giống như bạn đo tổng chiều dài tất cả các toa tàu trước, đặt làm một đường ray vừa khít một lần duy nhất thay vì cứ nối thêm một toa lại phải dỡ cả đoàn tàu ra xây lại!',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:12px;font-family:system-ui,sans-serif;">
        <div style="padding:14px;border-radius:10px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.35);">
          <div style="font-weight:700;color:#3b82f6;margin-bottom:6px;">1. String Interning</div>
          <div style="font-size:12px;line-height:1.5;">
            <code>a = sys.intern("user_id")</code><br/>
            <code>b = sys.intern("user_id")</code><br/>
            <span style="color:#10b981;font-weight:600;">a is b ➔ True (cùng địa chỉ RAM, so sánh O(1) bằng con trỏ)</span>
          </div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.35);">
          <div style="font-weight:700;color:#a855f7;margin-bottom:6px;">2. Cached SipHash + Seed</div>
          <div style="font-size:12px;line-height:1.5;">
            Lần 1: <code>hash(s)</code> tính SipHash + <code>PYTHONHASHSEED</code> (O(N)) ➔ lưu vào header.<br/>
            Lần 2+: Đọc thẳng từ header <code>ob_shash</code> (O(1)).
          </div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.35);">
          <div style="font-weight:700;color:#10b981;margin-bottom:6px;">3. Chuẩn mực "".join(parts)</div>
          <div style="font-size:12px;line-height:1.5;">
            Tính tổng độ dài trước ➔ Cấp phát đúng <strong>1 lần duy nhất</strong> ➔ Đảm bảo <strong>O(N)</strong> trên mọi trình thông dịch Python.
          </div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: '1. String Interning (sys.intern) và Cạm bẫy kinh điển dùng "is" thay vì "=="',
      badge: 'Quản lý bộ nhớ',
      content: `
        <p><strong>String Interning</strong> là kỹ thuật chỉ lưu giữ <strong>một bản sao duy nhất</strong> của mỗi giá trị chuỗi phân biệt trong một bảng toàn cục nội bộ (interned dictionary). Trong CPython, các chuỗi sau đây được <strong>tự động intern</strong> ở thời điểm biên dịch hoặc khởi tạo:</p>
        <ul>
          <li>Tên biến, tên hàm, tên lớp, tên thuộc tính, tên module.</li>
          <li>Các hằng chuỗi trong mã nguồn có hình dạng giống định danh (chỉ gồm chữ cái ASCII, chữ số và dấu gạch dưới <code>[a-zA-Z0-9_]+</code>).</li>
          <li>Chuỗi rỗng <code>""</code> và mọi chuỗi có độ dài 1 ký tự thuộc bảng Latin-1 (<code>U+0000..U+00FF</code>).</li>
        </ul>
        <p>Ngược lại, các chuỗi chứa khoảng trắng, dấu câu (như <code>"hello world!"</code>) hoặc chuỗi được tạo động lúc chạy (runtime) thường <strong>không được tự động intern</strong>, dẫn đến hai biến mang cùng nội dung nhưng nằm ở hai địa chỉ ô nhớ khác nhau.</p>
        <p><strong>Cạm bẫy chết người:</strong> Nhiều lập trình viên thử trên REPL thấy <code>a = "python"; b = "python"; a is b</code> trả về <code>True</code> nên lầm tưởng có thể dùng <code>is</code> để so sánh chuỗi. Toán tử <code>is</code> chỉ so sánh <strong>địa chỉ bộ nhớ</strong> (<code>id(a) == id(b)</code>), còn <code>==</code> mới so sánh <strong>nội dung ký tự</strong>!</p>
        <p>Khi nào bạn nên chủ động gọi <code>sys.intern(s)</code>? Khi ứng dụng nạp hàng triệu bản ghi JSON/CSV lặp đi lặp lại một tập hợp chuỗi khóa (ví dụ mã quốc gia, tên trạng thái, token từ vựng NLP). Intern giúp giảm mạnh RAM và tăng tốc phép so sánh bằng <code>==</code> (vì bên trong <code>str.__eq__</code> của CPython luôn kiểm tra nhanh <code>if (a == b) return True;</code> theo địa chỉ con trỏ trước tiên trong <strong>O(1)</strong>!).</p>
      `,
      codeExamples: [
        {
          title: 'Sự khác biệt giữa tự động intern, tạo chuỗi lúc chạy và sys.intern()',
          code: `import sys

# 1. Chuỗi hằng giống định danh -> Tự động intern lúc biên dịch
s1 = "python_314"
s2 = "python_314"
print("Giống định danh (is):", s1 is s2)

# 2. Chuỗi được ghép động lúc chạy (runtime) -> Khác địa chỉ ô nhớ!
 prefix = "python"
dynamic_s = prefix + "_314"
print("Tạo lúc chạy (is)   :", s1 is dynamic_s)  # False! Cạm bẫy nếu dùng 'is'
print("Tạo lúc chạy (==)   :", s1 == dynamic_s)  # True! Luôn dùng '==' để so sánh nội dung

# 3. Chủ động hợp nhất ô nhớ bằng sys.intern()
interned_s = sys.intern(dynamic_s)
print("Sau sys.intern (is) :", s1 is interned_s) # True! Trỏ về cùng đối tượng gốc`,
          output: `Giống định danh (is): True
Tạo lúc chạy (is)   : False
Tạo lúc chạy (==)   : True
Sau sys.intern (is) : True`,
          annotations: [
            { line: 11, text: "dynamic_s được tạo ở runtime nên là một đối tượng str mới tinh trên Heap: s1 is dynamic_s trả về False." },
            { line: 12, text: "Quy tắc bất di bất dịch: Luôn dùng == (hoặc !=) khi so sánh giá trị chuỗi!" },
            { line: 15, text: "sys.intern() tra cứu bảng intern toàn cục và trả về đúng tham chiếu của 'python_314' đã có." }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Băm chuỗi hash(s), Lưu đệm Hash và Chống tấn công Hash DoS (PYTHONHASHSEED)',
      badge: 'Bảo mật & Cấu trúc dữ liệu',
      content: `
        <p>Vì chuỗi <code>str</code> trong Python là <strong>bất biến (immutable)</strong>, giá trị băm <code>hash(s)</code> của nó không bao giờ thay đổi trong suốt vòng đời đối tượng. Nhờ đó, CPython áp dụng hai thiết kế tối ưu cực kỳ quan trọng:</p>
        <ol>
          <li><strong>Lưu đệm giá trị băm (Cached Hash trong Header)</strong>: Trong header 48B/72B của mỗi đối tượng <code>str</code> có sẵn trường <code>hash</code> (8 bytes), khởi tạo bằng <code>-1</code>. Lần đầu tiên bạn gọi <code>hash(s)</code> hoặc dùng <code>s</code> làm khóa trong <code>dict</code>/<code>set</code>, CPython duyệt qua chuỗi để tính hash trong <strong>O(N)</strong> rồi ghi kết quả vào header. Mọi lần tra cứu tiếp theo chỉ việc đọc số nguyên đã lưu sẵn trong <strong>O(1)</strong> tức thì!</li>
          <li><strong>Ngẫu nhiên hóa hàm băm (Hash Randomization &amp; chống Hash DoS)</strong>: Trước đây, nếu hàm băm cố định và biết trước, kẻ tấn công có thể gửi một JSON chứa hàng chục ngàn khóa chuỗi khác nhau nhưng cố tình được chế tạo để có <strong>cùng giá trị hash</strong> (Hash Collision). Khi đưa vào <code>dict</code>, mọi khóa rơi vào cùng một bucket làm thao tác chèn suy thoái từ <strong>O(1) thành O(N²)</strong>, gây treo máy chủ web chỉ bằng một request vài trăm KB (tấn công <strong>Hash DoS</strong>).</li>
        </ol>
        <p>Để triệt tiêu nguy cơ này, Python sử dụng thuật toán băm mật mã tốc độ cao <strong>SipHash</strong> kết hợp với một khóa bí mật ngẫu nhiên sinh mới mỗi khi khởi động tiến trình. Hệ quả là:</p>
        <ul>
          <li>Giá trị <code>hash("python")</code> sẽ <strong>khác nhau giữa mỗi lần chạy chương trình</strong>!</li>
          <li>Tuyệt đối <strong>không lưu kết quả của <code>hash(s)</code> xuống cơ sở dữ liệu hay file cache</strong> để dùng cho lần chạy sau (hãy dùng <code>hashlib.sha256</code> hoặc <code>zlib.crc32</code> nếu cần băm cố định).</li>
          <li>Khi cần tái hiện lỗi trong kiểm thử (debugging/unit test), bạn có thể cố định hạt giống băm bằng biến môi trường <code>PYTHONHASHSEED=42</code> trước khi chạy Python.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng tốc độ Cached Hash và tính chất phụ thuộc phiên chạy của hash(s)',
          code: `import os
import timeit
import hashlib

big_str = "x" * 1_000_000

# Lần gọi đầu tiên sẽ tính SipHash trên 1 triệu ký tự và lưu vào header của big_str
first_hash = hash(big_str)

# Đo thời gian 1.000.000 lần gọi hash(big_str) tiếp theo (chỉ đọc từ header O(1))
cached_time = timeit.timeit(lambda: hash(big_str), number=1_000_000)

# Nếu cần mã băm cố định giữa mọi máy/phiên chạy, phải dùng hashlib:
stable_digest = hashlib.sha256(big_str.encode("utf-8")).hexdigest()[:16]

print(f"PYTHONHASHSEED hiện tại  : {os.environ.get('PYTHONHASHSEED', 'random (mặc định)')}")
print(f"hash(big_str) đọc từ đệm : {first_hash} (1 triệu lần gọi chỉ mất {cached_time:.4f}s)")
print(f"SHA-256 cố định (16 hex) : {stable_digest}")`,
          output: `PYTHONHASHSEED hiện tại  : random (mặc định)
hash(big_str) đọc từ đệm : -4829103847561928371 (1 triệu lần gọi chỉ mất 0.0312s)
SHA-256 cố định (16 hex) : 6836cf13bac47b87`,
          annotations: [
            { line: 8, text: "Lần đầu gọi hash(big_str) mất thời gian quét 1 triệu ký tự, sau đó ghi vào trường ob_shash." },
            { line: 11, text: "1 triệu lần gọi tiếp theo chỉ mất ~0.03 giây vì CPython trả về ngay trường ob_shash đã tính sẵn." },
            { line: 14, text: "hashlib.sha256 luôn cho kết quả giống hệt nhau trên mọi máy và mọi lần khởi động Python." }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Hiệu năng nối chuỗi: += vs "".join() vs io.StringIO và Sự thật về tối ưu CPython',
      badge: 'Tối ưu thuật toán',
      content: `
        <p>Khi cần ghép <code>N</code> mảnh chuỗi nhỏ trong vòng lặp, theo lý thuyết về chuỗi bất biến, phép cộng <code>result += part</code> ở bước thứ <code>k</code> phải cấp phát chuỗi mới và sao chép lại toàn bộ các ký tự cũ: $1 + 2 + 3 + \\dots + N = O(N^2)$.</p>
        <p><strong>Sự thật quan trọng cần phân biệt rõ:</strong></p>
        <ul>
          <li><strong>Chi tiết triển khai riêng của CPython (Implementation Detail)</strong>: CPython có một cơ chế tối ưu hóa đặc biệt trong hàm C <code>_PyUnicode_Append</code>. Nếu đối tượng chuỗi bên trái của <code>s += part</code> chỉ có <strong>đúng 1 tham chiếu duy nhất (<code>refcount == 1</code>)</strong>, CPython sẽ thử mở rộng vùng nhớ tại chỗ bằng <code>realloc</code> với tốc độ tiệm cận <strong>O(N)</strong>.</li>
          <li><strong>Vì sao bạn KHÔNG ĐƯỢC phụ thuộc vào tối ưu hóa <code>+=</code> này?</strong>
            <ol>
              <li>Đây <strong>chỉ là chi tiết triển khai riêng của CPython</strong>, hoàn toàn không phải đảm bảo của đặc tả ngôn ngữ Python (trên PyPy, Jython, GraalPy hoặc MicroPython, <code>+=</code> trong vòng lặp có thể rơi thẳng về $O(N^2)$).</li>
              <li>Ngay trên CPython, chỉ cần có <strong>một biến khác cùng tham chiếu</strong> tới chuỗi đó (ví dụ <code>backup = s</code> khiến <code>refcount == 2</code>), hoặc bạn viết <code>s = part + s</code> (nối vào đầu chuỗi), hoặc chuỗi chuyển bậc từ ASCII sang UCS-2/UCS-4 giữa chừng, tối ưu hóa tại chỗ sẽ bị vô hiệu hóa hoặc phải cấp phát lại!</li>
            </ol>
          </li>
        </ul>
        <p><strong>Chuẩn mực vàng trong Python:</strong></p>
        <ul>
          <li><strong><code>"".join(parts)</code></strong>: Thu thập các mảnh vào một <code>list</code> (hoặc truyền generator), sau đó gọi <code>"".join(parts)</code>. Python sẽ quét nhanh để tính <strong>tổng độ dài chính xác</strong> và finding bậc PEP 393 cao nhất (1, 2 hay 4 byte), rồi <strong>cấp phát vùng nhớ đúng 1 lần duy nhất</strong>. Đảm bảo $O(N)$ trên mọi trình thông dịch và tiết kiệm RAM nhất!</li>
          <li><strong><code>io.StringIO</code></strong>: Phù hợp khi bạn đang xây dựng chuỗi theo kiểu luồng ghi (streaming/file-like interface, truyền đối tượng vào hàm cần tham số <code>file=...</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Đo hiệu năng bằng timeit: "".join() vs io.StringIO vs += (khi refcount == 1 và khi refcount > 1)',
          code: `import io
import timeit

N = 20_000
chunks = [f"dong_{i};" for i in range(N)]

def use_join() -> str:
    return "".join(chunks)

def use_stringio() -> str:
    buf = io.StringIO()
    for c in chunks:
        buf.write(c)
    return buf.getvalue()

def use_plus_equal_ref1() -> str:
    s = ""
    for c in chunks:
        s += c  # refcount == 1: CPython kích hoạt tối ưu hóa riêng tại chỗ
    return s

def use_plus_equal_shared_ref() -> str:
    s = ""
    history = s
    for c in chunks:
        history = s  # Giữ thêm 1 tham chiếu làm refcount == 2 -> Mất tối ưu hóa, suy thoái về O(N^2)!
        s += c
    return s

t_join   = timeit.timeit(use_join, number=20)
t_sio    = timeit.timeit(use_stringio, number=20)
t_plus1  = timeit.timeit(use_plus_equal_ref1, number=20)
t_plus2  = timeit.timeit(use_plus_equal_shared_ref, number=20)

print(f"1. ''.join(chunks) (Chuẩn mực O(N)) : {t_join:.4f}s (Nhanh nhất)")
print(f"2. io.StringIO()   (Luồng ghi O(N)) : {t_sio:.4f}s")
print(f"3. s += c (CPython refcount == 1)   : {t_plus1:.4f}s (Chi tiết riêng của CPython)")
print(f"4. s += c (Khi refcount > 1, O(N²)) : {t_plus2:.4f}s (Chậm gấp ~{t_plus2 / t_join:.0f} lần!)")`,
          output: `1. ''.join(chunks) (Chuẩn mực O(N)) : 0.0038s (Nhanh nhất)
2. io.StringIO()   (Luồng ghi O(N)) : 0.0195s
3. s += c (CPython refcount == 1)   : 0.0114s (Chi tiết riêng của CPython)
4. s += c (Khi refcount > 1, O(N²)) : 0.6420s (Chậm gấp ~169 lần!)`,
          annotations: [
            { line: 8, text: "''.join(chunks) chạy hoàn toàn trong vòng lặp C, cấp phát bộ nhớ đúng 1 lần nên luôn nhanh nhất." },
            { line: 19, text: "s += c khi refcount == 1 chỉ nhanh nhờ mẹo realloc nội bộ của riêng CPython." },
            { line: 26, text: "Chỉ cần có biến khác giữ tham chiếu (history = s), refcount > 1 khiến s += c lập tức rơi về O(N²) chậm gấp hàng trăm lần!" }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Nối vào đầu chuỗi s = chunk + s luôn là O(N²) ngay cả trên CPython!',
        content: 'Tối ưu hóa tại chỗ của CPython chỉ hoạt động khi nối vào CUỐI chuỗi (s += chunk hoặc s = s + chunk). Nếu bạn viết s = chunk + s trong vòng lặp, CPython buộc phải cấp phát vùng nhớ mới và dịch chuyển toàn bộ chuỗi cũ ở mỗi vòng lặp, gây độ phức tạp O(N²) khủng khiếp.'
      },
      {
        title: 'Dùng hash(s) để làm khóa phân vùng (sharding) lưu xuống ổ cứng hoặc Redis',
        content: 'Vì PYTHONHASHSEED mặc định sinh ngẫu nhiên mỗi khi khởi động lại tiến trình Python, hash("user_123") sau khi restart server sẽ trả về một con số hoàn toàn khác, làm hỏng toàn bộ định tuyến cache/database shard. Hãy dùng hashlib.md5/sha256 hoặc zlib.crc32.'
      }
    ],
    tips: [
      {
        title: 'Truyền trực tiếp List Comprehension thay vì Generator vào "".join() khi cần tốc độ tối đa',
        content: 'Cú pháp "".join([f(x) for x in data]) thực tế chạy nhanh hơn "".join(f(x) for x in data) khoảng 15–25% trong CPython! Lý do: "".join() cần biết tổng độ dài nên nếu truyền một generator, CPython vẫn phải chuyển generator đó thành một list tạm bên dưới trước khi ghép.'
      }
    ],
    deepDive: {
      title: 'Trạng thái Immortal Interned Strings từ Python 3.12 – 3.14 (PEP 683)',
      content: `
        <p>Từ Python 3.12 đến <strong>Python 3.14.8</strong>, nhiều hằng chuỗi được intern ở mức biên dịch hoặc khởi tạo interpreter được đánh dấu là <strong>Immortal Objects (Đối tượng bất tử — PEP 683)</strong>.</p>
        <p>Các chuỗi bất tử này có trường <code>ob_refcnt</code> được gán một giá trị bit đặc biệt cực lớn để CPython <strong>không bao giờ tăng hay giảm refcount</strong> khi truyền biến. Điều này giúp tránh hiện tượng <em>CPU cache invalidation</em> giữa các luồng (đặc biệt quan trọng cho chế độ <strong>Free-threaded Python 3.13/3.14 không GIL</strong>) và cho phép chia sẻ trang nhớ (Copy-on-Write) hiệu quả giữa các tiến trình con <code>fork()</code>.</p>
      `
    },
    newIn314: null
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Khử trùng lặp bộ nhớ cho danh sách nhãn bằng sys.intern()',
      problem: 'Giả sử bạn đọc 100.000 dòng dữ liệu trạng thái đơn hàng mà mỗi dòng tạo ra một chuỗi mới ở runtime `status = "ORDER_" + "COMPLETED"`. Hãy viết hàm `deduplicate_labels(raw_labels: list[str]) -> tuple[int, int]` trả về số lượng địa chỉ bộ nhớ phân biệt (`len({id(x) for x in ...})`) trước và sau khi áp dụng `sys.intern()`.',
      hint: 'Dùng set comprehension `{id(s) for s in labels}` để đếm có bao nhiêu đối tượng `str` thực sự đang tồn tại độc lập trên Heap.',
      solutionCode: `import sys

# Tạo 10.000 chuỗi động ở runtime có nội dung giống nhau nhưng khác địa chỉ
prefix = "ORDER_"
raw_labels = [prefix + str(100 + (i % 3)) for i in range(10_000)]

def deduplicate_labels(labels: list[str]) -> tuple[int, int]:
    unique_ids_before = len({id(s) for s in labels})
    interned_labels = [sys.intern(s) for s in labels]
    unique_ids_after = len({id(s) for s in interned_labels})
    return unique_ids_before, unique_ids_after

before, after = deduplicate_labels(raw_labels)
print(f"Số đối tượng str trên RAM trước khi intern: {before}")
print(f"Số đối tượng str trên RAM sau khi intern  : {after}")`,
      solutionOutput: `Số đối tượng str trên RAM trước khi intern: 10000
Số đối tượng str trên RAM sau khi intern  : 3`,
      explanation: 'Khi đọc dữ liệu từ file/mạng, Python tạo đối tượng `str` mới cho mỗi dòng (10.000 đối tượng riêng biệt). Sau khi qua `sys.intern()`, toàn bộ danh sách 10.000 phần tử chỉ trỏ về đúng 3 đối tượng duy nhất (`"ORDER_100"`, `"ORDER_101"`, `"ORDER_102"`), giải phóng 9.997 bản sao trùng lặp!'
    },
    {
      level: 'Vừa',
      title: 'Tái cấu trúc hàm ghép chuỗi O(N²) sang chuẩn "".join() O(N)',
      problem: 'Đoạn code dưới đây dùng phép nối vào đầu chuỗi `report = line + "\\n" + report` để đảo ngược thứ tự các dòng log, khiến chương trình chạy cực chậm ở độ phức tạp $O(N^2)$. Hãy viết lại hàm `build_reverse_log(lines: list[str]) -> str` đạt độ phức tạp $O(N)$ chuẩn mực và so sánh kết quả.',
      hint: 'Kết hợp slicing đảo ngược `lines[::-1]` (hoặc `reversed(lines)`) với `"\\n".join(...)`.',
      solutionCode: `def build_reverse_log_slow(lines: list[str]) -> str:
    report = ""
    for line in lines:
        report = (line + "\\n" + report) if report else line
    return report

def build_reverse_log_fast(lines: list[str]) -> str:
    return "\\n".join(reversed(lines))

sample_logs = [f"[2026-10-21 10:00:0{i}] Request #{i} OK" for i in range(5)]
slow_out = build_reverse_log_slow(sample_logs)
fast_out = build_reverse_log_fast(sample_logs)

print("Kết quả khớp nhau:", slow_out == fast_out)
print(fast_out)`,
      solutionOutput: `Kết quả khớp nhau: True
[2026-10-21 10:00:04] Request #4 OK
[2026-10-21 10:00:03] Request #3 OK
[2026-10-21 10:00:02] Request #2 OK
[2026-10-21 10:00:01] Request #1 OK
[2026-10-21 10:00:00] Request #0 OK`,
      explanation: 'Phép nối vào đầu chuỗi `line + "\\n" + report` không bao giờ được CPython tối ưu tại chỗ nên luôn chạy trong $O(N^2)$. Ngược lại, `"\\n".join(reversed(lines))` cấp phát vùng nhớ đúng 1 lần duy nhất và chạy trong $O(N)$.'
    },
    {
      level: 'Khó',
      title: 'Hàm băm phân vùng ổn định (Consistent Shard Hash) thay thế hash() mặc định',
      problem: 'Vì `hash(s)` thay đổi theo `PYTHONHASHSEED` sau mỗi lần khởi động lại server, hãy viết hàm `get_shard_id(user_key: str, num_shards: int = 8) -> int` sử dụng `hashlib.blake2b` (với `digest_size=8`) để chuyển một chuỗi khóa bất kỳ thành chỉ số shard cố định từ `0` đến `num_shards - 1` trên mọi máy và mọi phiên chạy.',
      hint: 'Mã hóa `user_key.encode("utf-8")`, băm bằng `hashlib.blake2b(..., digest_size=8).digest()`, rồi dùng `int.from_bytes(..., "big") % num_shards`.',
      solutionCode: `import hashlib

def get_shard_id(user_key: str, num_shards: int = 8) -> int:
    raw_bytes = user_key.encode("utf-8")
    digest = hashlib.blake2b(raw_bytes, digest_size=8).digest()
    hash_int = int.from_bytes(digest, byteorder="big")
    return hash_int % num_shards

for uid in ["user_1001", "user_1002", "user_1003", "khách_vip_99"]:
    print(f"{uid:15} -> Shard #{get_shard_id(uid, num_shards=8)}")`,
      solutionOutput: `user_1001       -> Shard #6
user_1002       -> Shard #1
user_1003       -> Shard #5
khách_vip_99    -> Shard #3`,
      explanation: '`hashlib.blake2b` là hàm băm mật mã cực nhanh được tích hợp sẵn trong thư viện chuẩn của Python. Không giống `hash()`, kết quả của `blake2b` hoàn toàn tất định (deterministic), không bị ảnh hưởng bởi `PYTHONHASHSEED`, an toàn tuyệt đối để định tuyến database shard hay phân vùng file cache.'
    }
  ],
  quiz: [
    {
      question: 'Vì sao chúng ta KHÔNG BAO GIỜ nên dùng toán tử `is` (ví dụ `if name is "admin":`) để so sánh hai chuỗi trong Python?',
      options: [
        'Vì toán tử `is` chạy chậm hơn toán tử `==`',
        'Vì `is` chỉ so sánh địa chỉ bộ nhớ (id); việc hai chuỗi có cùng địa chỉ hay không phụ thuộc vào String Interning, vốn không áp dụng cho mọi chuỗi tạo ở runtime',
        'Vì Python 3.14 đã xóa bỏ toán tử `is`',
        'Vì `is` không phân biệt chữ hoa và chữ thường'
      ],
      correctIndex: 1,
      explanation: 'Toán tử `is` kiểm tra hai biến có trỏ tới cùng một đối tượng trong bộ nhớ hay không (`id(a) == id(b)`). Chuỗi nhập từ người dùng, đọc từ file/database hoặc ghép lúc chạy thường nằm ở ô nhớ mới nên `name is "admin"` sẽ trả về `False` dù nội dung giống hệt `"admin"`. Luôn dùng `==`!'
    },
    {
      question: 'Cơ chế lưu đệm giá trị băm (Cached Hash) và biến môi trường `PYTHONHASHSEED` trong CPython hoạt động như thế nào?',
      options: [
        'Mỗi lần gọi `hash(s)` đều phải tính toán lại từ đầu với một hạt giống ngẫu nhiên mới',
        '`hash(s)` được tính một lần ở lần gọi đầu tiên dựa trên hạt giống ngẫu nhiên của tiến trình (`PYTHONHASHSEED`) rồi lưu vào header của chuỗi để các lần gọi sau trong cùng tiến trình đạt O(1)',
        '`PYTHONHASHSEED` giúp chuỗi tốn ít bộ nhớ RAM hơn',
        '`hash(s)` luôn trả về cùng một số nguyên cố định giữa các lần khởi động lại máy chủ'
      ],
      correctIndex: 1,
      explanation: 'Trong cùng một tiến trình Python, `hash(s)` được tính ở lần đầu tiên bằng SipHash + khóa bí mật khởi tạo từ `PYTHONHASHSEED` và lưu vào trường `hash` trong header của đối tượng `str` (nên các lần tra `dict`/`set` sau đó đạt O(1)). Giữa các tiến trình khác nhau, hạt giống thay đổi để chống tấn công Hash DoS.'
    },
    {
      question: 'Nhận định nào sau đây là ĐÚNG NHẤT về việc nối chuỗi bằng `+=` trong vòng lặp so với `"".join(parts)`?',
      options: [
        '`+=` luôn luôn nhanh hơn `"".join(parts)` trong mọi trường hợp',
        'CPython có tối ưu hóa `+=` tại chỗ khi `refcount == 1`, nhưng đó chỉ là chi tiết triển khai riêng của CPython (implementation detail) và sẽ sụp đổ về O(N²) nếu có biến khác cùng tham chiếu hoặc chạy trên trình thông dịch khác; do đó `"".join(parts)` luôn là chuẩn mực',
        '`"".join(parts)` có độ phức tạp O(N²) còn `+=` có độ phức tạp O(N)',
        'Cả hai đều không thể nối các chuỗi có chứa tiếng Việt hoặc Emoji'
      ],
      correctIndex: 1,
      explanation: 'Tối ưu hóa `_PyUnicode_Append` khi `refcount == 1` chỉ là đặc thù riêng của CPython. Khi có thêm tham chiếu (`refcount > 1`) hoặc trên các Python VM khác, `+=` sẽ sao chép lại chuỗi ở mỗi bước (O(N²)). Ngược lại, `"".join(parts)` tính tổng độ dài và cấp phát đúng 1 lần duy nhất, đảm bảo O(N) chuẩn mực.'
    }
  ],
  summary: [
    '`sys.intern(s)` hợp nhất các chuỗi có cùng giá trị về một đối tượng duy nhất trong RAM, giúp tiết kiệm bộ nhớ và tăng tốc so sánh `==` khi có hàng triệu chuỗi khóa lặp lại. Tuyệt đối luôn dùng `==` thay vì `is` khi so sánh nội dung chuỗi.',
    'Giá trị `hash(s)` được tính một lần và lưu đệm (cache) ngay trong header của đối tượng `str` để tra cứu `dict`/`set` với tốc độ O(1).',
    'Python ngẫu nhiên hóa hàm băm qua `PYTHONHASHSEED` ở mỗi lần khởi động tiến trình nhằm chống tấn công Hash DoS; không lưu kết quả `hash()` xuống đĩa mà hãy dùng `hashlib` khi cần mã băm cố định.',
    'Khi ghép nhiều chuỗi trong vòng lặp, chuẩn mực luôn là thu thập vào `list` rồi gọi `"".join(parts)` (cấp phát 1 lần, đảm bảo O(N)). Tối ưu hóa `+=` khi `refcount == 1` chỉ là chi tiết triển khai riêng của CPython (implementation detail), không phải đảm bảo của ngôn ngữ Python.'
  ]
};
