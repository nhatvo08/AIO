export default {
  id: 'p0-06',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.6',
  title: 'Bản đồ các kiểu dữ liệu có sẵn (Built-in Data Types)',
  subtitle: 'Bức tranh toàn cảnh 10 kiểu dữ liệu cốt lõi: Bảng so sánh 5 tiêu chí, tính chất trật tự, trùng lặp và khi nào dùng',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm trọn vẹn bản đồ 10 kiểu dữ liệu có sẵn trong Python: `int`, `float`, `complex`, `bool`, `str`, `bytes`, `list`, `tuple`, `dict`, `set`.',
    'Thành thạo bảng so sánh theo 5 tiêu chí: Có thể thay đổi? Có thứ tự? Cho phép trùng lặp? Khả băm (Hashable)? Cú pháp khai báo nhanh.',
    'Nắm vững cam kết của ngôn ngữ từ Python 3.7+: `dict` bảo đảm luôn giữ nguyên thứ tự chèn (Insertion Order).',
    'Hiểu nguyên tắc chọn kiểu dữ liệu đúng cho từng bài toán thực tế để đạt hiệu năng tối ưu.'
  ],

  intuition: {
    title: 'Hộp đồ nghề đa năng của người thợ mộc',
    metaphor: 'Khi bước vào xưởng mộc, người thợ không chỉ có một cây búa. Ông có cưa để cắt (list), thước dây để đo đạc chính xác (str), chiếc kìm bấm cố định bu-lông không bao giờ xê dịch (tuple), hộp đinh phân loại theo nhãn mác để tìm tức thì (dict), và chiếc sàng lọc bụi để loại bỏ tạp chất trùng lặp (set). Mỗi công cụ sinh ra để giải quyết một bài toán duy nhất một cách hoàn hảo nhất. Học lập trình không phải là cố nhét mọi thứ vào một cái list, mà là biết mở đúng ngăn kéo để lấy ra kiểu dữ liệu sinh ra cho nhiệm vụ đó.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">BẢN ĐỒ PHÂN LOẠI 4 CẤU TRÚC DỮ LIỆU TẬP HỢP CỐT LÕI</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;text-align:center;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--accent-primary);">list [ ]</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Có thứ tự<br/>Có thể sửa<br/>Cho phép trùng</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--py-gold);">tuple ( )</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Có thứ tự<br/><strong>Bất biến</strong><br/>Cho phép trùng</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--success);">dict {k: v}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Giữ thứ tự chèn<br/>Khóa độc nhất<br/>Tra cứu O(1)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--danger);">set { }</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Không thứ tự<br/><strong>Không trùng lặp</strong><br/>Toán học tập hợp</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Bảng so sánh Toàn diện 10 Kiểu Dữ liệu Tích hợp',
      badge: 'Bản đồ Trung tâm',
      content: `
        <p>Dưới đây là tấm bản đồ mà bất kỳ lập trình viên Python nào cũng cần khắc ghi trong tâm trí trước khi bắt đầu bất kỳ dự án nào:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Kiểu dữ liệu</th>
                <th>Cú pháp mẫu</th>
                <th>Mutable?</th>
                <th>Thứ tự?</th>
                <th>Trùng lặp?</th>
                <th>Khả băm?</th>
                <th>Ứng dụng điển hình</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>int</code></td>
                <td><code>42</code></td>
                <td>❌ Không</td>
                <td>—</td>
                <td>—</td>
                <td>✅ Có</td>
                <td>Đếm, số lượng, chỉ số mảng, số nguyên lớn</td>
              </tr>
              <tr>
                <td><code>float</code></td>
                <td><code>3.14</code></td>
                <td>❌ Không</td>
                <td>—</td>
                <td>—</td>
                <td>✅ Có</td>
                <td>Đo lường khoa học, tỷ lệ, đồ họa, AI</td>
              </tr>
              <tr>
                <td><code>complex</code></td>
                <td><code>1 + 2j</code></td>
                <td>❌ Không</td>
                <td>—</td>
                <td>—</td>
                <td>✅ Có</td>
                <td>Kỹ thuật điện, xử lý tín hiệu, vật lý lượng tử</td>
              </tr>
              <tr>
                <td><code>bool</code></td>
                <td><code>True, False</code></td>
                <td>❌ Không</td>
                <td>—</td>
                <td>—</td>
                <td>✅ Có</td>
                <td>Điều kiện logic, rẽ nhánh, mặt nạ lọc dữ liệu</td>
              </tr>
              <tr>
                <td><code>str</code></td>
                <td><code>"Xin chào"</code></td>
                <td>❌ Không</td>
                <td>✅ Có (0..n)</td>
                <td>✅ Có</td>
                <td>✅ Có</td>
                <td>Văn bản, thông điệp người dùng, định danh</td>
              </tr>
              <tr>
                <td><code>bytes</code></td>
                <td><code>b"PDF-1.4"</code></td>
                <td>❌ Không</td>
                <td>✅ Có (0..n)</td>
                <td>✅ Có</td>
                <td>✅ Có</td>
                <td>Đọc ghi file nhị phân (ảnh, âm thanh), socket mạng</td>
              </tr>
              <tr>
                <td><code>list</code></td>
                <td><code>[1, "a", 3.5]</code></td>
                <td>✅ <strong>Có</strong></td>
                <td>✅ Có (0..n)</td>
                <td>✅ Có</td>
                <td>❌ Không</td>
                <td>Danh sách linh hoạt cần thêm, sửa, xóa, sắp xếp</td>
              </tr>
              <tr>
                <td><code>tuple</code></td>
                <td><code>(21.0, 105.8)</code></td>
                <td>❌ Không</td>
                <td>✅ Có (0..n)</td>
                <td>✅ Có</td>
                <td>✅ (*)</td>
                <td>Bản ghi cố định (record), tọa độ, khóa dict</td>
              </tr>
              <tr>
                <td><code>dict</code></td>
                <td><code>{"ten": "An"}</code></td>
                <td>✅ <strong>Có</strong></td>
                <td>✅ Giữ chèn</td>
                <td>Khóa: ❌ | Trị: ✅</td>
                <td>❌ Không</td>
                <td>Tra cứu nhanh O(1) theo tên/mã, ánh xạ đối tượng</td>
              </tr>
              <tr>
                <td><code>set</code></td>
                <td><code>{1, 2, 3}</code></td>
                <td>✅ <strong>Có</strong></td>
                <td>❌ Không</td>
                <td>❌ <strong>Không</strong></td>
                <td>❌ Không</td>
                <td>Lọc phần tử trùng, phép giao/hợp toán học, kiểm tra in O(1)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style="font-size:0.85rem;color:var(--text-muted);">(*) <code>tuple</code> chỉ khả băm nếu toàn bộ các phần tử bên trong nó đều là kiểu bất biến.</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo nhanh và kiểm tra tính năng của các kiểu tập hợp',
          code: `# 1. list: Danh sách có thứ tự và cho phép trùng
ds = [10, 20, 10, 30]
ds.append(40)
print("list:", ds)

# 2. tuple: Bộ cố định, không thể append
tp = (10, 20, 30)
print("tuple:", tp)

# 3. set: Tự động loại bỏ trùng lặp
tap_hop = {10, 20, 10, 30}
print("set (đã lọc trùng):", tap_hop)

# 4. dict: Lưu trữ theo cặp Khóa -> Giá trị
tu_dien = {"id": 101, "ten": "Python"}
tu_dien["nam"] = 1991
print("dict:", tu_dien)`,
          output: `list: [10, 20, 10, 30, 40]
tuple: (10, 20, 30)
set (đã lọc trùng): {10, 20, 30}
dict: {'id': 101, 'ten': 'Python', 'nam': 1991}`,
          annotations: [
            { line: 2, text: 'list giữ nguyên cả hai số 10.' },
            { line: 10, text: 'set tự động loại bỏ số 10 bị trùng lặp.' },
            { line: 15, text: 'dict thêm khóa "nam" ở cuối và bảo toàn thứ tự chèn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Chuỗi str — Dãy Unicode, Cắt lát và f-string căn bản',
      badge: 'Kiểu Văn bản',
      content: `
        <p>Kiểu <code>str</code> là một chuỗi bất biến gồm các ký tự Unicode. Hai kỹ năng nền tảng nhất khi làm việc với chuỗi:</p>
        <ol>
          <li><strong>Đánh chỉ số (Indexing) và Cắt lát (Slicing):</strong>
            <ul>
              <li>Chỉ số dương từ trái sang phải: bắt đầu từ <code>0</code>.</li>
              <li>Chỉ số âm từ phải sang trái: ký tự cuối cùng luôn là <code>-1</code>.</li>
              <li>Cắt lát: <code>s[start : stop : step]</code> (lấy từ vị trí <code>start</code> đến sát vị trí <code>stop</code>, với bước nhảy <code>step</code>).</li>
            </ul>
          </li>
          <li><strong>f-string (Formatted String Literals):</strong> Cách định dạng chuỗi hiện đại nhất trong Python, bắt đầu bằng chữ <code>f"..."</code> và đưa biến hoặc biểu thức trực tiếp vào trong ngoặc nhọn <code>{biểu_thức}</code>.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Thao tác chỉ số âm, cắt lát và f-string',
          code: `s = "Python 3.14"

# 1. Chỉ số âm
print("Ký tự đầu tiên s[0]:", s[0])
print("Ký tự cuối cùng s[-1]:", s[-1])

# 2. Cắt lát (Slicing)
print("Cắt từ 0 đến 6 s[0:6]:", s[0:6])
print("Cắt lấy đuôi phiên bản s[7:]:", s[7:])
print("Đảo ngược chuỗi s[::-1]:", s[::-1])

# 3. f-string hiện đại
ten = "An"
diem = 9.5
thong_bao = f"Học viên {ten} đạt điểm {diem:.1f} (Xếp loại: {'Giỏi' if diem >= 8 else 'Khá'})"
print("\\nf-string:", thong_bao)`,
          output: `Ký tự đầu tiên s[0]: P
Ký tự cuối cùng s[-1]: 4
Cắt từ 0 đến 6 s[0:6]: Python
Cắt lấy đuôi phiên bản s[7:]: 3.14
Đảo ngược chuỗi s[::-1]: 41.3 nohtyP

f-string: Học viên An đạt điểm 9.5 (Xếp loại: Giỏi)`,
          annotations: [
            { line: 5, text: 's[-1] lấy nhanh ký tự cuối cùng mà không cần gọi len(s) - 1.' },
            { line: 10, text: 's[::-1] là thành ngữ kinh điển trong Python để đảo ngược chuỗi.' },
            { line: 15, text: 'f-string cho phép nhúng trực tiếp biểu thức và định dạng {diem:.1f}.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Cam kết Kiến trúc của Python 3.7+ về Từ điển dict',
      badge: 'Lịch sử & Cam kết',
      content: `
        <p>Trước phiên bản Python 3.6, kiểu <code>dict</code> không hề có thứ tự: bạn đưa các khóa vào theo thứ tự A, B, C thì khi duyệt vòng lặp nó có thể xuất hiện thành C, A, B một cách ngẫu nhiên.</p>
        <p>Tuy nhiên, từ <strong>Python 3.7 trở đi</strong>, nhờ thuật toán tối ưu bộ nhớ đột phá của kỹ sư Raymond Hettinger, <strong>từ điển dict được bảo đảm chính thức bởi đặc tả ngôn ngữ là luôn luôn GIỮ NGUYÊN THỨ TỰ CHÈN (Insertion Order)</strong>!</p>
        <p>Điều này có nghĩa là khi bạn duyệt <code>for k, v in dict.items():</code>, các phần tử chắc chắn sẽ xuất hiện theo đúng thứ tự mà bạn đã thêm vào trước đó.</p>
      `,
      codeExamples: [
        {
          title: 'Chứng minh dict giữ nguyên thứ tự chèn',
          code: `# Tạo dict với thứ tự chèn rõ ràng
cau_hinh = {}
cau_hinh["may_chu"] = "127.0.0.1"
cau_hinh["cong"] = 8080
cau_hinh["che_do"] = "debug"
cau_hinh["ma_hoa"] = "utf-8"

print("Duyệt qua các khóa của dict theo đúng thứ tự đã chèn:")
for key, val in cau_hinh.items():
    print(f" -> {key}: {val}")`,
          output: `Duyệt qua các khóa của dict theo đúng thứ tự đã chèn:
 -> may_chu: 127.0.0.1
 -> cong: 8080
 -> che_do: debug
 -> ma_hoa: utf-8`,
          annotations: [
            { line: 2, text: 'Khởi tạo dict rỗng.' },
            { line: 9, text: 'Thứ tự in ra luôn bảo toàn 100% đúng thứ tự may_chu -> cong -> che_do -> ma_hoa.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Nhầm lẫn cú pháp khởi tạo giữa set rỗng và dict rỗng',
        content: 'Cặp dấu ngoặc nhọn rỗng `{}` trong Python được quy ước mặc định là **TỪ ĐIỂN RỖNG (dict)**, chứ KHÔNG PHẢI là tập hợp rỗng (set)! Để tạo một set rỗng, bạn BẮT BUỘC phải dùng cú pháp hàm dựng: `tap_hop_rong = set()`.'
      },
      {
        title: 'Tạo tuple có đúng 1 phần tử bị thiếu dấu phẩy',
        content: 'Nếu bạn viết `t = (5)`, Python sẽ coi đây là số nguyên 5 đặt trong ngoặc đơn toán học, kiểu của `t` là `int`. Để Python nhận biết đó là một tuple có 1 phần tử, bạn bắt buộc phải có dấu phẩy: `t = (5,)`!'
      }
    ],
    tips: [
      {
        title: 'Quy tắc chọn kiểu dữ liệu siêu tốc trong 3 giây',
        content: 'Cần tìm kiếm theo tên/mã? -> Dùng `dict`. Cần lọc phần tử duy nhất hoặc kiểm tra tồn tại siêu nhanh? -> Dùng `set`. Dữ liệu cố định không bao giờ đổi (tọa độ, cấu hình)? -> Dùng `tuple`. Dữ liệu biến động cần sắp xếp, thêm bớt liên tục? -> Dùng `list`.'
      }
    ],
    deepDive: {
      title: 'So sánh tốc độ tra cứu "x in s": list vs set',
      content: `
        <p>Tại sao kiểm tra phần tử bằng toán tử <code>in</code> trên <code>set</code> lại nhanh hơn <code>list</code> hàng ngàn lần?</p>
        <ul>
          <li><strong>Trên list:</strong> Python phải duyệt tuần tự từ đầu đến cuối danh sách (Linear Search, độ phức tạp $O(n)$). Nếu danh sách có 1 triệu phần tử, máy tính phải so sánh tới 1 triệu lần.</li>
          <li><strong>Trên set:</strong> Python tính mã băm <code>hash(x)</code> và nhảy thẳng tới vị trí ô nhớ tương ứng trong Bảng băm (Hash Table Lookup, độ phức tạp trung bình $O(1)$). Dù set có 1 triệu hay 100 triệu phần tử, thời gian tìm kiếm chỉ tốn đúng vài nano-giây!</li>
        </ul>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Lọc danh sách các số điện thoại bị trùng lặp',
      problem: 'Cho một danh sách số điện thoại của khách hàng có nhiều số bị nhập trùng: `sdt = ["0901", "0902", "0901", "0903", "0902"]`. Hãy viết mã chuyển danh sách này thành tập hợp để lọc trùng, sau đó chuyển ngược lại thành danh sách và sắp xếp theo thứ tự tăng dần.',
      hint: 'Dùng hàm set(sdt) để lọc trùng, sau đó dùng sorted(set(sdt)).',
      solutionCode: `sdt = ["0901", "0902", "0901", "0903", "0902"]

# Lọc trùng bằng set
sdt_duy_nhat = set(sdt)

# Sắp xếp và chuyển thành list
sdt_sap_xep = sorted(sdt_duy_nhat)

print("Gốc:", sdt)
print("Đã lọc trùng và sắp xếp:", sdt_sap_xep)`,
      solutionOutput: `Gốc: ['0901', '0902', '0901', '0903', '0902']
Đã lọc trùng và sắp xếp: ['0901', '0902', '0903']`,
      explanation: 'set tự động loại bỏ các phần tử trùng lặp. Hàm sorted() nhận vào bất kỳ iterable nào và luôn trả về một list mới đã được sắp xếp.',
      annotations: [
        { line: 4, text: 'set() giữ lại các giá trị độc nhất.' },
        { line: 7, text: 'sorted() sắp xếp các chuỗi theo thứ tự từ điển.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Đếm tần suất xuất hiện của từ bằng dict',
      problem: 'Cho một danh sách các từ trong một đoạn văn: `tu_vung = ["cam", "tao", "cam", "le", "tao", "cam"]`. Hãy dùng một `dict` để đếm xem mỗi từ xuất hiện bao nhiêu lần trong danh sách.',
      hint: 'Duyệt qua từng từ, dùng phương thức dict.get(tu, 0) + 1.',
      solutionCode: `tu_vung = ["cam", "tao", "cam", "le", "tao", "cam"]
dem = {}

for w in tu_vung:
    # Nếu từ đã có thì lấy số cũ cộng 1, chưa có thì lấy mặc định 0 cộng 1
    dem[w] = dem.get(w, 0) + 1

print("Tần suất xuất hiện:", dem)`,
      solutionOutput: `Tần suất xuất hiện: {'cam': 3, 'tao': 2, 'le': 1}`,
      explanation: 'Phương thức dict.get(key, default) là công cụ cực kỳ hữu ích để tránh lỗi KeyError khi khóa chưa tồn tại trong từ điển.',
      annotations: [
        { line: 6, text: 'dem.get(w, 0) trả về 0 nếu w chưa có trong dict.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG khi nói về kiểu `dict` trong các phiên bản Python hiện đại (từ 3.7 trở đi)?',
      options: [
        'dict không có thứ tự và các khóa xuất hiện hoàn toàn ngẫu nhiên.',
        'dict được cam kết bởi ngôn ngữ là luôn luôn bảo toàn đúng thứ tự chèn (Insertion Order) của các phần tử.',
        'dict chỉ cho phép lưu trữ tối đa 256 cặp khóa-giá trị.',
        'dict là kiểu dữ liệu bất biến không thể thêm khóa mới.'
      ],
      correctIndex: 1,
      explanation: 'Từ Python 3.7 trở đi, bảo toàn thứ tự chèn là một cam kết chính thức của đặc tả ngôn ngữ Python.'
    },
    {
      question: 'Để khởi tạo một Tập hợp rỗng (Empty Set) trong Python, cú pháp nào sau đây là CHÍNH XÁC?',
      options: [
        's = {}',
        's = set()',
        's = []',
        's = (0,)'
      ],
      correctIndex: 1,
      explanation: 'Dấu {} dùng để tạo dict rỗng. Để tạo set rỗng, bắt buộc phải dùng s = set().'
    },
    {
      question: 'Cho biến `t = (10)`. Kiểu dữ liệu thực tế của `t` trong Python là gì?',
      options: [
        '<class \'tuple\'>',
        '<class \'int\'>',
        '<class \'list\'>',
        '<class \'set\'>'
      ],
      correctIndex: 1,
      explanation: 'Nếu không có dấu phẩy ở sau, Python coi (10) là số nguyên 10 trong ngoặc đơn số học thông thường. Cú pháp tuple 1 phần tử đúng phải là (10,).'
    }
  ],

  summary: [
    'Python có 10 kiểu dữ liệu có sẵn cốt lõi chia thành các nhóm: Số (int, float, complex, bool), Dãy (str, bytes, list, tuple) và Ánh xạ / Tập hợp (dict, set).',
    'list là danh sách có thể sửa đổi; tuple là bộ bất biến an toàn; set là tập hợp không trùng lặp; dict là bảng tra cứu siêu tốc.',
    'Từ Python 3.7+, dict luôn bảo toàn thứ tự chèn của các phần tử.',
    'Để tạo set rỗng, phải dùng set() vì dấu {} dành riêng cho dict rỗng.',
    'Tuple có 1 phần tử bắt buộc phải có dấu phẩy: (x,).'
  ]
};
