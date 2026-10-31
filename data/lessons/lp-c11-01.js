export default {
  id: 'lp-c11-01',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.1',
  title: 'Khuôn mẫu Gán Dãy tuần tự Nâng cao — Dãy lồng nhau, Mô phỏng Enum và Vòng lặp while',
  subtitle: 'Xử lý lỗi lệch số lượng ValueError, kỹ thuật giải nén lồng nhau, thành ngữ mô phỏng Enum bằng range() và thuật toán duyệt ngăn xếp trong vòng lặp while',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên nhân và cách giải quyết ngoại lệ ValueError: too many values to unpack khi số lượng mục tiêu vế trái không khớp số phần tử vế phải.',
    'Làm chủ 4 kỹ thuật kết hợp đánh chỉ mục và cắt lát (slicing) để tùy biến việc trích xuất các phần tử từ dãy tuần tự.',
    'Nắm vững cơ chế giải nén dãy tuần tự lồng nhau (nested sequence assignment) và ứng dụng trong tiêu đề vòng lặp for.',
    'Áp dụng thành ngữ mô phỏng kiểu dữ liệu liệt kê (enumerated types) bằng range() và kỹ thuật chia tách đầu/cuối trong vòng lặp while.'
  ],

  intuition: {
    title: 'Khuôn Đúc Hình Học và Dây Chuyền Bóc Tách',
    metaphor: 'Hãy tưởng tượng phép gán dãy tuần tự giống như việc bạn đưa một kiện hàng phức tạp vào một khuôn đúc có các ngăn định hình sẵn. Nếu kiện hàng bên phải là một hộp lớn chứa một hộp nhỏ và một món quà rời, thì khuôn đúc bên trái cũng phải có cấu trúc lồng nhau y hệt ((a, b), c) để từng món lọt khít vào đúng ngăn của nó. Nếu kiện hàng có 4 món mà khuôn chỉ có 3 ngăn, Python sẽ lập tức báo còi dừng dây chuyền (ValueError) vì không biết phải bỏ món nào đi. Để linh hoạt khi số lượng không khớp trước khi có cú pháp dấu sao, người thợ lập trình dùng "lưỡi dao cắt lát" (slicing) để chia nhỏ kiện hàng ra các phần vừa khít với từng ngăn đúc.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH GIẢI NÉN DÃY TUẦN TỰ LỒNG NHAU (NESTED ASSIGNMENT)</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:16px;flex-wrap:wrap;">
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px dashed #8b5cf6;border-radius:8px;">
            <div style="color:#8b5cf6;font-weight:700;">Vế trái: Khuôn lồng nhau</div>
            <code>((a, b), c)</code>
          </div>
          <div style="font-size:1.4rem;color:var(--accent-primary);">← Ghép đôi hình dạng ←</div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid #10b981;border-radius:8px;">
            <div style="color:#10b981;font-weight:700;">Vế phải: Cấu trúc lồng nhau</div>
            <code>('TE', 'XT')</code>
          </div>
        </div>
        <div style="padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:4px;font-size:0.8rem;color:var(--text-secondary);">
          • Tuple con <code>(a, b)</code> khớp với chuỗi <code>'TE'</code> → <code>a = 'T'</code>, <code>b = 'E'</code><br>
          • Mục tiêu đơn <code>c</code> khớp với chuỗi <code>'XT'</code> → <code>c = 'XT'</code>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Lỗi Lệch Số Lượng (ValueError) & Các Kỹ Thuật Kết Hợp Cắt Lát',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 6 / 38</strong>.</p>
          </div>
        </div>

        <p>Mặc dù chúng ta có thể kết hợp lẫn lộn các kiểu dãy tuần tự xung quanh ký hiệu <code>=</code> (ví dụ gán chuỗi cho tuple các biến), quy tắc thông thường bắt buộc <strong>số lượng phần tử ở vế phải phải bằng chính xác số lượng mục tiêu ở vế trái</strong>. Nếu số lượng hai vế không khớp nhau, trình thông dịch Python sẽ phát sinh một ngoại lệ <code>ValueError</code>:</p>

        <pre><code>>>> string = 'TEXT'
>>> a, b, c, d = string # 4 mục tiêu = 4 ký tự -> Hợp lệ
>>> a, b, c, d
('T', 'E', 'X', 'T')

>>> a, b, c = string    # 3 mục tiêu nhưng chuỗi có 4 ký tự -> Lỗi!
ValueError: too many values to unpack (expected 3)</code></pre>

        <h3>Vận dụng Cắt Lát (Slicing) để giải quyết xung đột</h3>
        <p>Để linh hoạt hơn khi chưa sử dụng cú pháp dấu sao mở rộng, chúng ta luôn có thể tận dụng các thao tác cắt lát (slice) và đánh chỉ mục để trích xuất chính xác các phần tử mong muốn. Mark Lutz trình bày <strong>4 phương án kết hợp</strong> kinh điển:</p>
        <ol>
          <li><strong>Đánh chỉ mục kết hợp cắt lát:</strong> <code>a, b, c = string[0], string[1], string[2:]</code></li>
          <li><strong>Cắt lát và ghép nối danh sách:</strong> <code>a, b, c = list(string[:2]) + [string[2:]]</code></li>
          <li><strong>Cắt lát và giải nén trực tiếp hai dòng:</strong> <code>a, b = string[:2]; c = string[2:]</code></li>
          <li><strong>Tạo tuple lồng nhau từ các lát cắt:</strong> <code>(a, b), c = string[:2], string[2:]</code></li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Khảo sát lỗi ValueError và 4 cách dùng lát cắt để giải nén',
          code: `string = 'TEXT'

# 1. Khớp số lượng chính xác
a, b, c, d = string
print("1. Khớp hoàn hảo:", a, b, c, d)

# Bắt lỗi khi không khớp số lượng
try:
    x, y, z = string
except ValueError as err:
    print("Bắt lỗi lệch số lượng:", err)

# 2. Cách 1: Chỉ mục và cắt lát
a, b, c = string[0], string[1], string[2:]
print("2. Chỉ mục + lát cắt:", a, b, c)

# 3. Cách 2: Cắt lát và nối danh sách
a, b, c = list(string[:2]) + [string[2:]]
print("3. Ghép nối list:", a, b, c)

# 4. Cách 3: Hai câu lệnh phân tách
a, b = string[:2]
c = string[2:]
print("4. Cắt lát trực tiếp:", a, b, c)

# 5. Cách 4: Dãy tuần tự lồng nhau
(a, b), c = string[:2], string[2:]
print("5. Dãy tuần tự lồng nhau:", a, b, c)`,
          output: `1. Khớp hoàn hảo: T E X T
Bắt lỗi lệch số lượng: too many values to unpack (expected 3)
2. Chỉ mục + lát cắt: T E XT
3. Ghép nối list: T E XT
4. Cắt lát trực tiếp: T E XT
5. Dãy tuần tự lồng nhau: T E XT`,
          annotations: [
            { line: 9, text: 'Chuỗi 4 phần tử không thể tự giải nén vào 3 biến nếu không có chỉ dẫn rõ ràng.' },
            { line: 13, text: 'string[2:] lấy toàn bộ phần còn lại từ vị trí 2 trở đi gán cho biến c.' },
            { line: 25, text: 'Vế trái là cấu trúc lồng nhau khớp với cấu trúc hai phần tử ở vế phải.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phép Gán Dãy Tuần Tự Lồng Nhau & Ứng Dụng Trong Vòng Lặp for',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 6–7 / 38</strong>.</p>
          </div>
        </div>

        <p>Như ví dụ số 5 ở phần trước đã chứng minh, chúng ta thậm chí có thể gán các <strong>dãy tuần tự lồng nhau (nested sequences)</strong>, và Python sẽ giải nén các phần của chúng theo đúng hình dạng cấu trúc tương ứng:</p>
        <pre><code>>>> ((a, b), c) = ('TE', 'XT')
>>> a, b, c
('T', 'E', 'XT')</code></pre>
        <p>Tại đây, Python ghép đôi chuỗi đầu tiên ở bên phải (<code>'TE'</code>) với tuple đầu tiên ở bên trái (<code>(a, b)</code>) và gán từng ký tự một tại một thời điểm, trước khi gán toàn bộ chuỗi thứ hai (<code>'XT'</code>) cho biến <code>c</code> cùng một lúc. Hình dạng lồng nhau của dãy tuần tự ở bên trái <em>bắt buộc phải khớp với hình dạng cấu trúc của đối tượng ở bên phải</em>.</p>

        <h3>Ứng dụng trong vòng lặp for</h3>
        <p>Kỹ thuật gán cấu trúc này hoạt động hoàn hảo trong các vòng lặp <code>for</code>. Bởi vì các phần tử của vòng lặp được gán cho mục tiêu được chỉ định trong tiêu đề vòng lặp giống hệt như thể một câu lệnh <code>=</code> được thực thi ở mỗi bước lặp:</p>
        <pre><code>for (a, b, c) in [(1, 2, 3), (4, 5, 6)]: ...       # Gán tuple đơn giản
for ((a, b), c) in [((1, 2), 3), ((4, 5), 6)]: ... # Gán tuple lồng nhau</code></pre>
        <p><em>(Ghi chú tham chiếu: Những phép gán dãy tuần tự lồng nhau phức tạp như thế này cũng có thể đạt được thông qua câu lệnh so khớp khuôn mẫu <code>match/case</code> mà chúng ta sẽ tìm hiểu kỹ lưỡng trong Chương 12).</em></p>
      `,
      codeExamples: [
        {
          title: 'Duyệt cấu trúc dữ liệu phức tạp bằng phép gán lồng nhau trong vòng lặp for',
          code: `# Dữ liệu danh sách chứa các tuple lồng nhau: ((tên, họ), điểm_số)
hoc_vien = [
    (('Nam', 'Nguyễn'), 9.5),
    (('Hương', 'Trần'), 9.8),
    (('Tuấn', 'Lê'), 8.7)
]

# Vòng lặp for giải nén trực tiếp cấu trúc lồng nhau trong header
for ((ten, ho), diem) in hoc_vien:
    print(f"Học viên: {ho} {ten} - Điểm: {diem}")`,
          output: `Học viên: Nguyễn Nam - Điểm: 9.5
Học viên: Trần Hương - Điểm: 9.8
Học viên: Lê Tuấn - Điểm: 8.7`,
          annotations: [
            { line: 9, text: '((ten, ho), diem) phản chiếu chính xác cấu trúc ((str, str), float) của từng phần tử.' },
            { line: 10, text: 'Các biến con ten, ho, diem có sẵn ngay lập tức trong thân vòng lặp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Thành Ngữ Mô Phỏng Enum Bằng range() & Phép Gán Trong Vòng Lặp while',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 7–8 / 38</strong>.</p>
          </div>
        </div>

        <p>Các phép gán giải nén dãy tuần tự cũng làm nảy sinh một thành ngữ lập trình cực kỳ phổ biến trong cộng đồng Python: <strong>gán một chuỗi số nguyên liên tiếp cho một tập hợp các biến</strong> để mô phỏng kiểu liệt kê (<em>enumerated data types</em>):</p>
        <pre><code>>>> red, green, blue = range(3)
>>> red, blue
(0, 2)</code></pre>
        <p>Mã này khởi tạo ba tên biến ở bên trái dấu <code>=</code> lần lượt nhận các số nguyên 0, 1 và 2. Bởi vì mỗi tên nhận một giá trị nguyên duy nhất, đây là giải pháp tương đương đơn giản và thanh thoát nhất của Python cho các kiểu dữ liệu <code>enum</code> thường thấy trong C hay C++.</p>

        <h3>Chia tách dãy tuần tự thành "đầu" và "còn lại" trong vòng lặp while</h3>
        <p>Một ngữ cảnh thực tiễn khác mà bạn thường thấy phép gán tuple hoạt động là để chia tách một danh sách thành phần tử đầu tiên (<em>front</em>) và danh sách phần tử còn lại (<em>rest</em>) trong các vòng lặp <code>while</code>:</p>
        <pre><code>L = [1, 2, 3, 4]
while L:
    front, L = L[0], L[1:]
    print(front, L)</code></pre>
        <p>Mỗi bước lặp trích xuất <code>L[0]</code> vào biến <code>front</code> và gán lát cắt thu gọn <code>L[1:]</code> ngược lại cho chính <code>L</code>. Vòng lặp dừng lại khi <code>L</code> trở thành danh sách rỗng (mang giá trị boolean <code>False</code>). Kỹ thuật này sử dụng danh sách tương tự một <strong>ngăn xếp (stack)</strong>.</p>
        <p>Mặc dù hành vi này cũng có thể đạt được bằng phương thức <code>front = L.pop(0)</code>, nhưng đó là một thao tác cập nhật tại chỗ (<em>in-place</em>). Ở bài học kế tiếp, bạn sẽ thấy cú pháp giải nén mở rộng với dấu sao <code>*</code> sẽ nâng tầm kỹ thuật chia tách này lên một đẳng cấp ngắn gọn và tự nhiên hơn nhiều!</p>
      `,
      codeExamples: [
        {
          title: 'Mô phỏng Enum bằng range() và thuật toán duyệt ngăn xếp với while',
          code: `# 1. Thành ngữ mô phỏng kiểu liệt kê Enum
RED, GREEN, BLUE = range(3)
print("Enum mô phỏng:", f"RED={RED}, GREEN={GREEN}, BLUE={BLUE}")

# 2. Duyệt ngăn xếp chia tách đầu và phần còn lại
danh_sach = [10, 20, 30, 40]
print("Bắt đầu duyệt danh sách:")

while danh_sach:
    dau, danh_sach = danh_sach[0], danh_sach[1:]
    print(f"  Phần tử đầu: {dau} | Phần còn lại: {danh_sach}")`,
          output: `Enum mô phỏng: RED=0, GREEN=1, BLUE=2
Bắt đầu duyệt danh sách:
  Phần tử đầu: 10 | Phần còn lại: [20, 30, 40]
  Phần tử đầu: 20 | Phần còn lại: [30, 40]
  Phần tử đầu: 30 | Phần còn lại: [40]
  Phần tử đầu: 40 | Phần còn lại: []`,
          annotations: [
            { line: 2, text: 'range(3) tạo iterable sinh 0, 1, 2 giải nén đồng thời vào 3 hằng số.' },
            { line: 9, text: 'Phép gán tuple dau, danh_sach đồng thời lấy phần tử đầu và co ngắn danh sách.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời dặn từ Mark Lutz: Ghép đôi theo hình học cấu trúc',
        content: 'Khi sử dụng phép gán dãy tuần tự lồng nhau, hãy coi vế trái như một chiếc khuôn hình học. Vế phải có bao nhiêu cấp ngoặc lồng nhau thì vế trái cũng phải bố trí các biến con trong các cặp ngoặc tương ứng. Python sẽ tự động đệ quy bóc tách từng lớp để gán giá trị chính xác tuyệt đối.'
      }
    ]
  },

  exercises: [
    {
      title: 'Trích xuất thông tin nhân sự từ danh sách hồ sơ lồng nhau',
      level: 'Trung bình',
      problem: 'Cho cấu trúc dữ liệu hồ sơ nhân sự dạng tuple: ho_so = ("IT_01", ("Nguyễn Văn A", "Kỹ sư Cầu nối"), (2020, "Hà Nội")). Hãy sử dụng một phép gán giải nén dãy tuần tự lồng nhau duy nhất để trích xuất mã nhân viên, họ tên, chức danh và năm vào công ty vào các biến riêng biệt.',
      hint: 'Tạo khuôn vế trái khớp với cấu trúc 3 phần tử, trong đó phần tử thứ hai và thứ ba là các tuple con.',
      solutionCode: `ho_so = ("IT_01", ("Nguyễn Văn A", "Kỹ sư Cầu nối"), (2020, "Hà Nội"))

ma_nv, (ho_ten, chuc_danh), (nam_vao, dia_diem) = ho_so

print(f"Mã: {ma_nv}")
print(f"Họ tên: {ho_ten}")
print(f"Chức danh: {chuc_danh}")
print(f"Năm vào: {nam_vao}")`,
      solutionOutput: `Mã: IT_01
Họ tên: Nguyễn Văn A
Chức danh: Kỹ sư Cầu nối
Năm vào: 2020`,
      explanation: 'Khuôn lồng nhau ma_nv, (ho_ten, chuc_danh), (nam_vao, dia_diem) khớp nối trực tiếp với từng phần tử và tuple con của đối tượng ho_so.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn chạy câu lệnh a, b, c = [1, 2], điều gì sẽ xảy ra?',
      options: [
        'Biến c nhận giá trị mặc định None.',
        'Python phát sinh ngoại lệ ValueError: not enough values to unpack.',
        'Biến a nhận 1, b nhận 2, và c nhận 0.',
        'Python tự động lặp lại phần tử cuối cùng để gán cho c.'
      ],
      correctIndex: 1,
      explanation: 'Khi số lượng mục tiêu ở vế trái (3) lớn hơn số phần tử ở vế phải (2), Python báo lỗi ValueError vì không đủ giá trị để giải nén.'
    },
    {
      question: 'Thành ngữ red, green, blue = range(3) mang lại kết quả gì cho biến green?',
      options: [
        'green = 0',
        'green = 1',
        'green = 2',
        'green = [0, 1, 2]'
      ],
      correctIndex: 1,
      explanation: 'Hàm range(3) sinh ra dãy số 0, 1, 2. Giải nén theo vị trí từ trái qua phải sẽ gán red = 0, green = 1, blue = 2.'
    },
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về phép gán dãy tuần tự lồng nhau ((a, b), c) = (\'TE\', \'XT\')?',
      options: [
        'Python báo lỗi cú pháp vì không cho phép ngoặc lồng nhau ở vế trái.',
        'a nhận \'TE\', b nhận \'XT\', c nhận giá trị rỗng.',
        'Chuỗi \'TE\' được giải nén vào tuple (a, b) thành a = \'T\', b = \'E\'; c nhận chuỗi \'XT\'.',
        'Toàn bộ chuỗi được ghép lại và gán cho c.'
      ],
      correctIndex: 2,
      explanation: 'Python ghép đôi cấu trúc theo vị trí: phần tử đầu tiên \'TE\' khớp với (a, b) để giải nén từng ký tự, phần tử thứ hai \'XT\' gán trọn vẹn cho c.'
    }
  ],

  summary: [
    'Phép gán dãy tuần tự thông thường yêu cầu số lượng mục tiêu vế trái phải khớp chính xác với số lượng phần tử vế phải, nếu không sẽ phát sinh ValueError.',
    'Có thể dùng các kỹ thuật đánh chỉ mục và cắt lát (slicing) linh hoạt để trích xuất từng phần khi độ dài không khớp.',
    'Python hỗ trợ giải nén dãy tuần tự lồng nhau theo đúng khuôn hình học cấu trúc, cực kỳ đắc lực trong các vòng lặp for.',
    'Thành ngữ gán range(N) cho N biến là cách mô phỏng Enum đơn giản nhất; phép gán front, L = L[0], L[1:] là nền tảng xử lý ngăn xếp trong vòng lặp while.'
  ]
};
