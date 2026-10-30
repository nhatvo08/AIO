export default {
  id: 'p2-05',
  partId: 'part-2',
  partTitle: 'Phần 2 – Phương thức của str (Trung cấp)',
  number: '2.5',
  title: 'Nhóm thay thế & căn lề (replace, translate, maketrans, center, ljust, rjust, zfill, expandtabs)',
  subtitle: 'Biến đổi chuỗi con, dịch bảng ký tự tốc độ cao và dàn trang văn bản chuyên nghiệp',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng thành thạo replace(old, new, count=-1) để thay thế hoặc xóa chuỗi con có kiểm soát số lần thay thế.',
    'Làm chủ cặp bài trùng str.maketrans() và str.translate() để thay thế hoặc xóa hàng loạt ký tự đơn lẻ trong một lần duyệt duy nhất.',
    'Phân biệt và áp dụng đúng 4 phương thức căn lề ljust(), rjust(), center() và zfill() (đặc biệt là cách zfill xử lý dấu +/- ở đầu chuỗi số).',
    'Hiểu cơ chế cột dừng tab (tab stops) của expandtabs(tabsize=8) khác với phép thay thế replace("\\t", " " * 8) như thế nào.'
  ],

  intuition: {
    title: 'Bàn chế bản in ấn: Tìm-thay thế, Bảng mã dịch thuật và Thước căn lề',
    metaphor: 'Khi biên tập một trang báo: replace() giống như tính năng Find & Replace trong trình soạn thảo, tìm từng cụm từ cũ và thế bằng cụm từ mới. Nhưng nếu bạn cần đổi cùng lúc 10 chữ cái có dấu thành không dấu và xóa luôn 5 loại dấu câu chỉ trong 1 nhát quét, maketrans() + translate() chính là bộ khuôn dịch thuật siêu tốc ánh xạ trực tiếp từng mã ký tự. Cuối cùng, ljust(), rjust(), center(), zfill() và expandtabs() là bộ thước căn chỉnh giúp các cột chữ và con số thẳng hàng tăm tắp trên trang in.',
    visualHtml: `
      <div class="table-responsive">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>Phương thức</th>
              <th>Nhóm chức năng</th>
              <th>Ví dụ minh họa</th>
              <th>Kết quả trả về</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>s.replace(old, new, count=-1)</code></td>
              <td>Thay thế chuỗi con</td>
              <td><code>"a-b-c".replace("-", "_", 1)</code></td>
              <td><code>"a_b-c"</code></td>
            </tr>
            <tr>
              <td><code>str.maketrans(x[, y[, z]])</code></td>
              <td>Tạo bảng ánh xạ mã Unicode</td>
              <td><code>str.maketrans("ab", "12", "!")</code></td>
              <td><code>{97: 49, 98: 50, 33: None}</code></td>
            </tr>
            <tr>
              <td><code>s.translate(table)</code></td>
              <td>Dịch/xóa ký tự theo bảng</td>
              <td><code>"ab!c".translate(table)</code></td>
              <td><code>"12c"</code></td>
            </tr>
            <tr>
              <td><code>s.ljust(width, fillchar=' ')</code></td>
              <td>Căn trái (đệm bên phải)</td>
              <td><code>"Py".ljust(5, ".")</code></td>
              <td><code>"Py..."</code></td>
            </tr>
            <tr>
              <td><code>s.rjust(width, fillchar=' ')</code></td>
              <td>Căn phải (đệm bên trái)</td>
              <td><code>"Py".rjust(5, ".")</code></td>
              <td><code>"...Py"</code></td>
            </tr>
            <tr>
              <td><code>s.center(width, fillchar=' ')</code></td>
              <td>Căn giữa (đệm 2 bên)</td>
              <td><code>"Py".center(6, "-")</code></td>
              <td><code>"--Py--"</code></td>
            </tr>
            <tr>
              <td><code>s.zfill(width)</code></td>
              <td>Đệm số <code>'0'</code> (nhận biết dấu <code>+/-</code>)</td>
              <td><code>"-42".zfill(6)</code></td>
              <td><code>"-00042"</code></td>
            </tr>
            <tr>
              <td><code>s.expandtabs(tabsize=8)</code></td>
              <td>Đổi <code>\\t</code> theo cột tab stops</td>
              <td><code>"a\\tbc".expandtabs(4)</code></td>
              <td><code>"a   bc"</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Thay thế chuỗi con với replace(old, new, count=-1)',
      badge: 'Thay thế linh hoạt',
      content: `
        <p>Phương thức <strong><code>str.replace(old, new, count=-1)</code></strong> trả về một bản sao của chuỗi trong đó các lần xuất hiện (không chồng lấp) của chuỗi con <code>old</code> được thay thế bằng chuỗi <code>new</code>.</p>
        <ul>
          <li><strong>Tham số <code>count</code>:</strong> Mặc định là <code>-1</code> (thay thế tất cả). Nếu truyền một số nguyên không âm <code>count</code> (ví dụ <code>count=2</code>), chỉ <code>count</code> lần xuất hiện đầu tiên tính từ trái sang phải được thay thế. <em>(Lưu ý: Từ Python 3.13+ và trong Python 3.14, bạn có thể truyền <code>count</code> dưới dạng keyword argument <code>s.replace("a", "b", count=1)</code>).</em></li>
          <li><strong>Xóa chuỗi con ở bất kỳ đâu:</strong> Khác với <code>strip()</code> chỉ xóa ở hai biên, để xóa hoàn toàn một chuỗi con ở mọi vị trí, bạn chỉ cần thay thế nó bằng chuỗi rỗng: <code>s.replace(old, "")</code>.</li>
          <li><strong>Trường hợp đặc biệt <code>old == ""</code>:</strong> Chuỗi <code>new</code> sẽ được chèn vào đầu chuỗi, cuối chuỗi và xen giữa từng ký tự của chuỗi gốc! Ví dụ <code>"abc".replace("", "-")</code> trả về <code>"-a-b-c-"</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng replace() với tham số count và trường hợp chuỗi rỗng',
          code: `log = "ERROR: Disk full. ERROR: Retry failed. ERROR: Halted."

# Thay thế tất cả vs giới hạn số lần bằng keyword argument count (Python 3.13/3.14+)
print("Thay tất cả :", log.replace("ERROR", "WARN"))
print("Thay 1 lần  :", log.replace("ERROR", "WARN", count=1))

# Xóa toàn bộ dấu gạch ngang và khoảng trắng trong số điện thoại
phone = "(+84) 090-123-4567"
clean_phone = phone.replace(" ", "").replace("-", "")
print("SĐT đã dọn  :", clean_phone)

# Khi old là chuỗi rỗng ""
print("Chèn giữa   :", "Py".replace("", "|"))`,
          output: `Thay tất cả : WARN: Disk full. WARN: Retry failed. WARN: Halted.
Thay 1 lần  : WARN: Disk full. ERROR: Retry failed. ERROR: Halted.
SĐT đã dọn  : (+84)0901234567
Chèn giữa   : |P|y|`,
          annotations: [
            { line: 5, text: 'Trong Python 3.14, truyền count=1 bằng tên tham số giúp mã nguồn cực kỳ rõ nghĩa.' },
            { line: 9, text: 'Nối chuỗi (chaining) nhiều lệnh replace(..., "") là cách đơn giản để xóa vài ký tự cố định.' },
            { line: 13, text: '"Py" có 3 vị trí biên rỗng (trước P, giữa P-y, sau y) nên "|" được chèn vào cả 3 vị trí.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Dịch và xóa hàng loạt ký tự với str.maketrans() và translate()',
      badge: 'Hiệu năng cực đại',
      content: `
        <p>Nếu bạn cần thay thế hoặc xóa <strong>hàng chục ký tự khác nhau</strong> (ví dụ: bỏ dấu câu, chuyển đổi bảng chữ cái, lọc ký tự điều khiển), gọi <code>.replace()</code> nối tiếp nhau 20 lần sẽ tạo ra 20 chuỗi trung gian gây lãng phí bộ nhớ. Giải pháp chuẩn là dùng cặp <strong><code>str.maketrans()</code></strong> và <strong><code>str.translate(table)</code></strong> để xử lý tất cả chỉ trong <strong>1 lần duyệt duy nhất</strong>.</p>
        <p>Hàm tĩnh <code>str.maketrans()</code> hỗ trợ <strong>3 cách gọi</strong> để tạo bảng ánh xạ mã Unicode (<code>dict[int, int | str | None]</code>):</p>
        <ul>
          <li><strong>Cách 1 (1 đối số <code>dict</code>):</strong> <code>str.maketrans({"a": "1", "b": "2", "!": None})</code>. Khóa là ký tự (chuỗi dài 1) hoặc mã <code>ord()</code>; giá trị là chuỗi thay thế hoặc <code>None</code> (để xóa ký tự đó).</li>
          <li><strong>Cách 2 (2 đối số chuỗi cùng độ dài):</strong> <code>str.maketrans("abc", "123")</code> ánh xạ tương ứng <code>'a' &rarr; '1'</code>, <code>'b' &rarr; '2'</code>, <code>'c' &rarr; '3'</code>.</li>
          <li><strong>Cách 3 (3 đối số chuỗi):</strong> <code>str.maketrans(x, y, z)</code> ánh xạ <code>x &rarr; y</code> đồng thời <strong>xóa sạch mọi ký tự nằm trong chuỗi thứ ba <code>z</code></strong> (ánh xạ chúng về <code>None</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Ba cách tạo bảng dịch với maketrans() và lọc dữ liệu bằng translate()',
          code: `import string

# Cách 3 đối số: Đổi nguyên âm sang số VÀ xóa toàn bộ dấu câu trong 1 bước
table = str.maketrans("aeiou", "12345", string.punctuation)
raw_text = "Hello, World! Python 3.14 is awesome..."
print("Sau translate:", raw_text.translate(table))

# Cách 1 đối số (dict): Một ký tự có thể dịch thành chuỗi nhiều ký tự!
viet_to_ascii = str.maketrans({
    "đ": "d", "Đ": "D",
    "&": " và ",
    "#": None  # Xóa ký tự '#'
})
title = "Đường phố & Hẻm nhỏ #2026"
print("Dịch bằng dict:", title.translate(viet_to_ascii))`,
          output: `Sau translate: H2ll4 W4rld Pyth4n 314 3s 1w2s4m2
Dịch bằng dict: Dường phố  và  Hẻm nhỏ 2026`,
          annotations: [
            { line: 4, text: 'Tham số thứ 3 (string.punctuation) đánh dấu mọi dấu câu (!, ., ,) thành None để xóa bỏ.' },
            { line: 5, text: 'translate() quét chuỗi đúng 1 lần: vừa đổi a,e,i,o,u sang 1,2,3,4,5 vừa xóa dấu câu.' },
            { line: 9, text: 'Khi dùng dict, giá trị đích có thể là một chuỗi dài nhiều ký tự như " và ".' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Căn lề văn bản và định dạng bảng (ljust, rjust, center, zfill, expandtabs)',
      badge: 'Dàn trang & Hiển thị',
      content: `
        <p>Để trình bày bảng biểu trên terminal hoặc tạo mã số hóa đơn có độ dài cố định, Python cung cấp 5 phương thức dàn trang:</p>
        <ul>
          <li><strong><code>s.ljust(width, fillchar=' ')</code></strong>, <strong><code>s.rjust(width, fillchar=' ')</code></strong>, <strong><code>s.center(width, fillchar=' ')</code></strong>: Trả về chuỗi có độ dài tối thiểu <code>width</code> bằng cách đệm ký tự <code>fillchar</code> (bắt buộc phải là chuỗi có độ dài đúng bằng 1). <strong>Quan trọng:</strong> Nếu <code>width &lt;= len(s)</code>, chuỗi gốc được trả về nguyên vẹn, <strong>không bao giờ bị cắt ngắn</strong>!</li>
          <li><strong><code>s.zfill(width)</code></strong>: Đệm chữ số <code>'0'</code> vào bên trái cho đủ độ dài <code>width</code>. Khác biệt thông minh so với <code>s.rjust(width, '0')</code>: nếu chuỗi bắt đầu bằng dấu <strong><code>'+'</code> hoặc <code>'-'</code></strong>, <code>zfill()</code> sẽ chèn các số <code>'0'</code> vào <strong>sau dấu đó</strong> (ví dụ <code>"-42".zfill(5)</code> thành <code>"-0042"</code>, còn <code>"-42".rjust(5, "0")</code> lại thành <code>"00-42"</code>!).</li>
          <li><strong><code>s.expandtabs(tabsize=8)</code></strong>: Thay thế các ký tự tab <code>'\\t'</code> bằng một hoặc nhiều dấu cách sao cho ký tự kế tiếp nằm đúng tại <strong>cột dừng tab (tab stop)</strong> là bội số của <code>tabsize</code>. Bộ đếm cột được đặt lại về <code>0</code> mỗi khi gặp ký tự xuống dòng <code>\\n</code> hoặc <code>\\r</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Căn lề báo cáo, so sánh zfill() vs rjust() và cột dừng của expandtabs()',
          code: `# 1. Căn lề tiêu đề và các cột
print(" BÁO CÁO DOANH THU ".center(34, "="))
items = [("Áo sơ mi", 250), ("Quần jeans", 1200), ("Giày", 85)]
for name, price in items:
    print(f"{name.ljust(15, '.')} {str(price).rjust(6)} USD")

# 2. Sự khác biệt sống còn giữa zfill() và rjust(..., '0')
num_str = "-125"
print("zfill(7)     :", num_str.zfill(7))
print("rjust(7, '0'):", num_str.rjust(7, "0"))

# 3. Cơ chế cột dừng (tab stops) của expandtabs(8)
header = "ID\\tTÊN_MỤC\\tGIÁ"
row1   = "1\\tBút\\t15"
print(header.expandtabs(10))
print(row1.expandtabs(10))`,
          output: `======= BÁO CÁO DOANH THU ========
Áo sơ mi.......    250 USD
Quần jeans.....   1200 USD
Giày...........     85 USD
zfill(7)     : -000125
rjust(7, '0'): 000-125
ID        TÊN_MỤC   GIÁ
1         Bút       15`,
          annotations: [
            { line: 5, text: 'ljust(15, ".") tạo đường chấm dẫn mắt từ tên sản phẩm sang cột giá.' },
            { line: 9, text: 'zfill(7) giữ dấu "-" ở đầu rồi mới điền số 0 ở sau: "-000125".' },
            { line: 10, text: 'rjust(7, "0") không hiểu ý nghĩa toán học của dấu "-" nên đẩy dấu "-" vào giữa: "000-125".' },
            { line: 15, text: 'Với tabsize=10, "ID" dài 2 nên bù 8 dấu cách, còn "TÊN_MỤC" dài 7 nên chỉ bù 3 dấu cách để cùng chạm cột 10 và 20!' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Truyền chuỗi dài hơn 1 ký tự vào tham số fillchar',
        content: 'Các phương thức <code>ljust()</code>, <code>rjust()</code>, <code>center()</code> chỉ chấp nhận <code>fillchar</code> có độ dài <strong>đúng bằng 1</strong>. Nếu bạn viết <code>"Hi".center(10, "*=")</code>, Python sẽ ném lỗi <code>TypeError: The fill character must be exactly one character long</code>.'
      },
      {
        title: 'Tưởng rằng ljust/rjust/center sẽ cắt bớt chuỗi nếu chuỗi dài hơn width',
        content: 'Nếu chuỗi gốc dài 10 ký tự mà bạn gọi <code>s.ljust(5)</code>, kết quả trả về vẫn dài 10 ký tự nguyên vẹn. Nếu muốn ép vừa khung 5 ký tự cả khi chuỗi quá dài, hãy kết hợp slicing: <code>s[:5].ljust(5)</code>.'
      },
      {
        title: 'Nhầm expandtabs(4) với replace("\\t", "    ")',
        content: '<code>replace("\\t", "    ")</code> luôn thay mỗi dấu tab bằng đúng 4 dấu cách cố định. Trong khi đó, <code>expandtabs(4)</code> tính toán số dấu cách (từ 1 đến 4) dựa trên vị trí cột hiện tại để căn thẳng hàng với mốc bội số của 4.'
      }
    ],
    tips: [
      {
        title: 'Tạo bảng maketrans() một lần ở cấp module để tái sử dụng',
        content: 'Nếu hàm làm sạch văn bản của bạn được gọi hàng triệu lần, hãy khởi tạo <code>TRANS_TABLE = str.maketrans(...)</code> thành hằng số toàn cục ở ngoài hàm, sau đó bên trong hàm chỉ gọi <code>text.translate(TRANS_TABLE)</code> để đạt tốc độ tối đa.'
      }
    ],
    deepDive: {
      title: 'Cấu trúc bảng dịch của str.translate() hoạt động như thế nào?',
      content: `
        <p>Thực chất, đối số truyền vào <code>s.translate(table)</code> không bắt buộc phải được tạo từ <code>str.maketrans()</code>! Nó chỉ cần là bất kỳ đối tượng ánh xạ (mapping) hoặc dãy (sequence) nào hỗ trợ phép truy cập chỉ số <code>table[code_point]</code>, trong đó <code>code_point</code> là số nguyên <code>ord(char)</code>.</p>
        <p>Khi duyệt từng ký tự <code>ch</code> trong chuỗi, Python tra cứu <code>table[ord(ch)]</code>:</p>
        <ul>
          <li>Nếu ném <code>LookupError</code> (ví dụ <code>KeyError</code> hoặc <code>IndexError</code>): ký tự <code>ch</code> được giữ nguyên không đổi.</li>
          <li>Nếu trả về <code>None</code>: ký tự <code>ch</code> bị xóa khỏi chuỗi kết quả.</li>
          <li>Nếu trả về một số nguyên <code>k</code>: thay thế bằng ký tự <code>chr(k)</code>.</li>
          <li>Nếu trả về một chuỗi <code>str</code>: chèn toàn bộ chuỗi đó vào vị trí hiện tại.</li>
        </ul>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Định dạng mã hóa đơn chuẩn hóa với zfill()',
      problem: 'Cho danh sách các mã giao dịch dạng chuỗi số (có thể kèm dấu âm hoặc dương ở đầu): `codes = ["45", "-12", "+7", "999999"]`. Hãy chuẩn hóa tất cả về độ dài tối thiểu 5 ký tự bằng chữ số `0` đứng sau dấu (nếu có) và ghép thêm tiền tố `"TX_"` ở đầu mỗi kết quả.',
      hint: 'Gọi `.zfill(5)` trên từng phần tử rồi nối với `"TX_"`.',
      solutionCode: `codes = ["45", "-12", "+7", "999999"]

for c in codes:
    formatted = f"TX_{c.zfill(5)}"
    print(f"{c:8} -> {formatted}")`,
      solutionOutput: `45       -> TX_00045
-12      -> TX_-0012
+7       -> TX_+0007
999999   -> TX_999999`,
      explanation: '`zfill(5)` tự động nhận diện cả dấu `-` lẫn dấu `+` để đặt các chữ số `0` vào sau dấu. Với `"999999"` đã dài 6 ký tự (> 5), `zfill(5)` giữ nguyên không cắt bớt.'
    },
    {
      level: 'Vừa',
      title: 'Mã hóa mật thư ROT13 bằng maketrans() và translate()',
      problem: 'Mật mã Caesar ROT13 dịch chuyển mỗi chữ cái tiếng Anh (A-Z, a-z) đi 13 vị trí trong bảng chữ cái (ví dụ `A -> N`, `N -> A`, `a -> n`, `n -> a`), giữ nguyên chữ số và dấu câu. Hãy dùng `str.maketrans()` và `translate()` để viết hàm `rot13(text)` vừa dùng để mã hóa vừa dùng để giải mã thông điệp `"Python 3.14 - Top Secret!"`.',
      hint: 'Tạo chuỗi gốc gồm `"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"` và chuỗi đích đã xoay 13 vị trí `"NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"`.',
      solutionCode: `upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
lower = "abcdefghijklmnopqrstuvwxyz"
rot_upper = upper[13:] + upper[:13]
rot_lower = lower[13:] + lower[:13]

ROT13_TABLE = str.maketrans(upper + lower, rot_upper + rot_lower)

def rot13(text: str) -> str:
    return text.translate(ROT13_TABLE)

secret = "Python 3.14 - Top Secret!"
encoded = rot13(secret)
decoded = rot13(encoded)

print("Bản gốc   :", secret)
print("Đã mã hóa :", encoded)
print("Giải mã   :", decoded)`,
      solutionOutput: `Bản gốc   : Python 3.14 - Top Secret!
Đã mã hóa : Clguba 3.14 - Gbc Frperg!
Giải mã   : Python 3.14 - Top Secret!`,
      explanation: 'Vì bảng chữ cái tiếng Anh có 26 chữ cái, việc dịch chuyển 13 vị trí có tính đối xứng hoàn hảo: gọi `translate(ROT13_TABLE)` lần đầu sẽ mã hóa và gọi lần thứ hai sẽ khôi phục nguyên văn bản gốc.'
    },
    {
      level: 'Khó',
      title: 'Tạo chuỗi URL Slug tiếng Việt sạch bằng translate() và split()',
      problem: 'Viết hàm `to_slug(title)` chuyển một tiêu đề tiếng Việt có dấu và ký tự đặc biệt thành chuỗi slug chuẩn SEO (chỉ gồm chữ thường a-z, số 0-9 và dấu gạch ngang `-` nối giữa các từ). Yêu cầu dùng `str.maketrans()` + `translate()` để chuyển các nguyên âm/phụ âm tiếng Việt trong câu mẫu `"Lập trình Python 3.14: Nhanh, Đẹp & Chuẩn!"` về không dấu và xóa các dấu câu `":,!&"`, sau đó nối các từ bằng dấu `"-"`.',
      hint: 'Khởi tạo bảng ánh xạ các ký tự có dấu trong câu mẫu sang không dấu và tham số thứ 3 chứa các dấu câu cần xóa. Sau khi `lower()` và `translate()`, dùng `"-".join(s.split())`.',
      solutionCode: `VIET_SRC = "ậìđẹẩ"
VIET_DST = "aide" + "a"
PUNCT_REMOVE = ":,!&"

SLUG_TABLE = str.maketrans(VIET_SRC, VIET_DST, PUNCT_REMOVE)

def to_slug(title: str) -> str:
    cleaned = title.lower().translate(SLUG_TABLE)
    return "-".join(cleaned.split())

raw_title = "Lập trình Python 3.14: Nhanh, Đẹp & Chuẩn!"
print("Tiêu đề gốc:", raw_title)
print("URL Slug   :", to_slug(raw_title))`,
      solutionOutput: `Tiêu đề gốc: Lập trình Python 3.14: Nhanh, Đẹp & Chuẩn!
URL Slug   : lap-trinh-python-3.14-nhanh-dep-chuan`,
      explanation: 'Sau khi `.lower()`, các chữ cái có dấu được dịch sang không dấu và các dấu `:,!&` bị xóa bỏ. Khi dấu `&` bị xóa sẽ để lại nhiều khoảng trắng liên tiếp, nhưng `.split()` tự động gộp chúng lại trước khi `"-".join(...)` nối thành slug hoàn chỉnh.'
    }
  ],

  quiz: [
    {
      question: 'Kết quả của hai biểu thức `"+42".zfill(5)` và `"+42".rjust(5, "0")` lần lượt là gì?',
      options: [
        '`"+0042"` và `"+0042"`',
        '`"00+42"` và `"+0042"`',
        '`"+0042"` và `"00+42"`',
        '`"00042"` và `"00+42"`'
      ],
      correctIndex: 2,
      explanation: '`zfill()` nhận biết ký tự dấu `+` hoặc `-` ở đầu chuỗi và điền các chữ số `0` vào sau dấu đó (`"+0042"`), trong khi `rjust(5, "0")` đệm thuần túy vào bên trái chuỗi (`"00+42"`).'
    },
    {
      question: 'Biểu thức `"ab\\tcd".expandtabs(4)` trả về chuỗi nào sau đây (biết `"ab"` dài 2 ký tự)?',
      options: [
        '`"ab    cd"` (4 dấu cách ở giữa)',
        '`"ab  cd"` (2 dấu cách ở giữa)',
        '`"ab cd"` (1 dấu cách ở giữa)',
        '`"abcd"` (0 dấu cách)'
      ],
      correctIndex: 1,
      explanation: 'Với `tabsize=4`, điểm dừng tab đầu tiên nằm ở cột 4. Vì `"ab"` đã chiếm 2 cột (cột 0 và 1), ký tự `\\t` chỉ cần bù thêm `4 - 2 = 2` dấu cách để chữ `"cd"` bắt đầu đúng tại cột 4.'
    },
    {
      question: 'Trong `str.maketrans(x, y, z)`, đối số thứ ba `z` có vai trò gì?',
      options: [
        'Chuỗi ký tự mặc định khi không tìm thấy trong `x`',
        'Chuỗi chứa các ký tự sẽ bị xóa (ánh xạ về `None`) khi gọi `translate()`',
        'Chuỗi ký tự dùng để đệm vào cuối chuỗi',
        'Số lần thay thế tối đa'
      ],
      correctIndex: 1,
      explanation: 'Khi gọi `str.maketrans(x, y, z)` với 3 đối số, mọi ký tự xuất hiện trong chuỗi `z` sẽ được gán giá trị `None` trong bảng dịch, nghĩa là sẽ bị xóa bỏ hoàn toàn khi qua `translate()`.'
    },
    {
      question: 'Kết quả của biểu thức `"banana".replace("a", "o", 2)` là gì?',
      options: [
        '`"bonono"`',
        '`"bonona"`',
        '`"banono"`',
        '`"banana"`'
      ],
      correctIndex: 1,
      explanation: 'Tham số `count=2` giới hạn chỉ thay thế 2 chữ `"a"` đầu tiên tính từ trái sang phải, giữ nguyên chữ `"a"` cuối cùng, tạo thành `"bonona"`.'
    }
  ],

  summary: [
    'replace(old, new, count=-1) thay thế chuỗi con từ trái sang phải; dùng replace(old, "") để xóa chuỗi con ở mọi vị trí.',
    'str.maketrans() kết hợp với translate() là công cụ tối ưu nhất để thay thế và xóa hàng loạt ký tự đơn lẻ chỉ trong 1 lần quét.',
    'ljust(), rjust(), center() đệm ký tự đơn fillchar cho đủ độ dài width (không cắt bớt nếu chuỗi đã dài hơn width); zfill() đệm số 0 và bảo toàn vị trí dấu +/- ở đầu.',
    'expandtabs(tabsize=8) căn chỉnh ký tự sau dấu \\t nhảy tới đúng cột bội số của tabsize thay vì thay thế số dấu cách cố định.'
  ]
};
