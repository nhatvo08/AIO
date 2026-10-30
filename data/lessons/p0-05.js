export default {
  id: 'p0-05',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.5',
  title: 'Biểu thức, toán tử và tính "đúng/sai" (Truthiness)',
  subtitle: 'Biểu thức vs câu lệnh, so sánh dây chuyền, ngắn mạch short-circuit, and/or trả về toán hạng và giá trị falsy',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt rõ ràng giữa Biểu thức (Expression - sinh ra giá trị) và Câu lệnh (Statement - thực hiện một hành động).',
    'Thành thạo các họ toán tử: Số học, So sánh (kể cả so sánh dây chuyền `1 < x < 10`), Thành viên (`in`), Định danh (`is`).',
    'Hiểu sâu tính ngắn mạch (Short-circuit Evaluation) của `and` và `or`, và sự thật bất ngờ: `and`/`or` trả về chính toán hạng chứ không nhất thiết là `True`/`False`.',
    'Nắm trọn vẹn khái niệm Truthiness trong Python: Danh sách các giá trị Falsy và vì sao viết `if danh_sach:` là chuẩn Pythonic.',
    'Bảng thứ tự ưu tiên của các toán tử trong biểu thức phức tạp.'
  ],

  intuition: {
    title: 'Chiếc cầu chì tự ngắt và Câu hỏi tính toán',
    metaphor: 'Trong đời sống, "Hôm nay là thứ mấy?" là một câu hỏi sinh ra câu trả lời (đây là Biểu thức). Còn "Hãy bật đèn lên!" là một mệnh lệnh thực thi hành động (đây là Câu lệnh). Khi nói chuyện logic: "Nếu trời mưa VÀ tôi có ô thì đi chơi", nếu nhìn ra cửa thấy trời KHÔNG mưa, não bạn lập tức quyết định ở nhà ngay mà chẳng thèm kiểm tra xem mình có ô hay không! Python cũng thông minh y như vậy: cơ chế Ngắn mạch (Short-circuit) giống như chiếc cầu chì điện tự ngắt, nếu toán hạng đầu tiên của "and" đã sai thì nó lập tức dừng lại, không thèm tính toán biểu thức phía sau, giúp chương trình vừa chạy nhanh vừa tránh được lỗi chia cho 0 hay truy cập ô nhớ rỗng.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">CƠ CHẾ NGẮN MẠCH (SHORT-CIRCUIT) TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--danger);">A and B</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">Nếu A là FALSY:</div>
            <div style="color:var(--danger);font-weight:700;">DỪNG NGAY ──► Trả về A</div>
            <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:2px;">(B hoàn toàn không được tính toán)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--success);">A or B</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">Nếu A là TRUTHY:</div>
            <div style="color:var(--success);font-weight:700;">DỪNG NGAY ──► Trả về A</div>
            <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:2px;">(B hoàn toàn không được tính toán)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Biểu thức (Expression) khác gì Câu lệnh (Statement)?',
      badge: 'Cú pháp Nền tảng',
      content: `
        <p>Hiểu sự khác biệt này giúp bạn không bao giờ viết sai cú pháp khi dùng hàm ẩn danh (lambda) hay biểu thức điều kiện:</p>
        <ul>
          <li><strong>Biểu thức (Expression):</strong> Là một đoạn mã mà khi chạy xong, nó <strong>luôn trả về một giá trị duy nhất</strong>. Bạn có thể in nó ra, gán nó vào biến, hoặc truyền làm tham số cho hàm. Ví dụ: <code>2 + 3</code>, <code>len("abc")</code>, <code>x > 5</code>, <code>"chẵn" if n % 2 == 0 else "lẻ"</code>.</li>
          <li><strong>Câu lệnh (Statement):</strong> Là một câu chỉ thị hoàn chỉnh <strong>làm một việc gì đó</strong> nhưng bản thân nó không có giá trị trả về. Bạn không thể gán một câu lệnh cho biến. Ví dụ: câu lệnh gán <code>x = 5</code>, câu lệnh rẽ nhánh <code>if</code>, câu lệnh lặp <code>for</code>, câu lệnh <code>import math</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Phân biệt Biểu thức và Câu lệnh trong thực tế',
          code: `# Các BIỂU THỨC (Expressions) - đều sinh ra giá trị:
a = 10 + 20                     # 10 + 20 là biểu thức (trả về 30)
b = len("Python") > 3           # len("Python") > 3 là biểu thức (trả về True)
c = [x * 2 for x in range(3)]   # List comprehension là biểu thức

print("Giá trị sinh ra:", a, b, c)

# CÂU LỆNH (Statements) - thực hiện hành động:
# pass, break, continue, return, import
if a > 20:                      # Đây là câu lệnh if
    print("a lớn hơn 20")

# Biểu thức bậc ba (Ternary Expression) - sinh ra giá trị:
trang_thai = "Đạt" if a >= 18 else "Trượt"
print("Kết quả xét tuyển:", trang_thai)`,
          output: `Giá trị sinh ra: 30 True [0, 2, 4]
a lớn hơn 20
Kết quả xét tuyển: Đạt`,
          annotations: [
            { line: 2, text: 'Phần bên phải dấu "=" là một biểu thức có giá trị 30.' },
            { line: 14, text: 'Biểu thức điều kiện cú pháp: giá_trị_1 if điều_kiện else giá_trị_2.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Các họ toán tử — So sánh dây chuyền, in và is',
      badge: 'Bộ công cụ Toán tử',
      content: `
        <p>Python sở hữu các toán tử trực quan, mang đậm tính toán học tự nhiên:</p>
        <ul>
          <li><strong>Toán tử số học:</strong> <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> (luôn trả về số thực float), <code>//</code> (chia lấy phần nguyên sàn), <code>%</code> (chia lấy phần dư), <code>**</code> (lũy thừa).</li>
          <li><strong>So sánh dây chuyền (Chained Comparisons):</strong> Thay vì phải viết dài dòng <code>a < b and b < c</code> như các ngôn ngữ khác, Python cho phép viết trực tiếp theo chuẩn toán học: <code>a < b < c</code> hoặc <code>18 <= tuoi <= 65</code>!</li>
          <li><strong>Toán tử thành viên (Membership):</strong> <code>in</code> và <code>not in</code> kiểm tra phần tử có nằm trong tập hợp/chuỗi/danh sách hay không (<code>'a' in 'apple'</code>).</li>
          <li><strong>Toán tử định danh (Identity):</strong> <code>is</code> và <code>is not</code> kiểm tra hai đối tượng có cùng địa chỉ RAM hay không.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sức mạnh của So sánh dây chuyền và Toán tử in',
          code: `# So sánh dây chuyền tự nhiên như toán học
tuoi = 25
hop_le = 18 <= tuoi <= 35
print("25 tuổi có nằm trong độ tuổi thanh niên (18-35)?", hop_le)

# Biểu thức dây chuyền phức tạp hơn
x = 5
print("0 < x < 10 == 10:", 0 < x < 10 == 10)
# Giải nghĩa: (0 < x) and (x < 10) and (10 == 10) -> True and True and True -> True

# Toán tử thành viên 'in'
ds_khoa = ["toan", "ly", "hoa"]
print("'toan' có trong danh sách?:", "toan" in ds_khoa)
print("'sinh' KHÔNG có trong danh sách?:", "sinh" not in ds_khoa)
print("'th' có trong chuỗi 'Python'?:", "th" in "Python")`,
          output: `25 tuổi có nằm trong độ tuổi thanh niên (18-35)? True
0 < x < 10 == 10: True
'toan' có trong danh sách?: True
'sinh' KHÔNG có trong danh sách?: True
'th' có trong chuỗi 'Python'?: True`,
          annotations: [
            { line: 3, text: 'Cú pháp 18 <= tuoi <= 35 đẹp và dễ đọc hơn 18 <= tuoi and tuoi <= 35.' },
            { line: 8, text: 'CPython dịch a < b < c thành a < b and b < c, nhưng chỉ tính giá trị của b một lần duy nhất.' },
            { line: 15, text: 'Toán tử in trên chuỗi kiểm tra chuỗi con (substring).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Bản chất của and và or — Ngắn mạch và Trả về Toán hạng',
      badge: 'Cơ chế Sâu sắc',
      content: `
        <p>Hầu hết người học đều nghĩ rằng <code>and</code> và <code>or</code> chỉ trả về <code>True</code> hoặc <code>False</code>. <strong>Đây là một hiểu lầm lớn!</strong></p>
        <p>Quy tắc kỹ thuật chính xác trong CPython:</p>
        <ul>
          <li><code>A and B</code>: Đánh giá <code>A</code>. Nếu <code>A</code> là <em>Falsy</em>, <strong>trả về ngay chính giá trị <code>A</code></strong> mà không cần nhìn tới <code>B</code>. Nếu <code>A</code> là <em>Truthy</em>, <strong>trả về giá trị của <code>B</code></strong>.</li>
          <li><code>A or B</code>: Đánh giá <code>A</code>. Nếu <code>A</code> là <em>Truthy</em>, <strong>trả về ngay chính giá trị <code>A</code></strong> mà không cần nhìn tới <code>B</code>. Nếu <code>A</code> là <em>Falsy</em>, <strong>trả về giá trị của <code>B</code></strong>.</li>
        </ul>
        <p>Nhờ quy tắc này, ta có thể viết cú pháp gán giá trị mặc định cực kỳ thanh lịch: <code>ten_hien_thi = ten_nguoi_dung or "Khách ẩn danh"</code>!</p>
      `,
      codeExamples: [
        {
          title: 'and và or trả về chính toán hạng trong thực tế',
          code: `# or trả về toán hạng Truthy đầu tiên
print("0 or 'Python' ->", repr(0 or "Python"))
print("'' or 'Mặc định' ->", repr("" or "Mặc định"))
print("'Hà Nội' or 'Sài Gòn' ->", repr("Hà Nội" or "Sài Gòn"))

# and trả về toán hạng Falsy đầu tiên, hoặc toán hạng cuối cùng nếu tất cả đều Truthy
print("\\n0 and 'Python' ->", repr(0 and "Python"))
print("'Python' and 42 ->", repr("Python" and 42))
print("[] and 'Hello' ->", repr([] and "Hello"))

# Lợi ích ngắn mạch: Tránh lỗi chia cho 0 hoặc lỗi Index
mau_so = 0
# Nếu mau_so != 0 là False, CPython DỪNG NGAY, không bao giờ chạy 10 / mau_so!
ket_qua = (mau_so != 0) and (10 / mau_so > 1)
print("\\nKhông bị lỗi ZeroDivisionError nhờ ngắn mạch:", ket_qua)`,
          output: `0 or 'Python' -> 'Python'
'' or 'Mặc định' -> 'Mặc định'
'Hà Nội' or 'Sài Gòn' -> 'Hà Nội'

0 and 'Python' -> 0
'Python' and 42 -> 42
[] and 'Hello' -> []

Không bị lỗi ZeroDivisionError nhờ ngắn mạch: False`,
          annotations: [
            { line: 2, text: '0 là Falsy, do đó or nhảy sang trả về toán hạng thứ hai "Python".' },
            { line: 8, text: '"Python" là Truthy, do đó and trả về toán hạng tiếp theo là 42.' },
            { line: 15, text: 'Nhờ cơ chế ngắn mạch, phép tính 10 / 0 không hề được thực thi.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Khái niệm "Truthiness" — Cái gì được coi là Đúng và Sai?',
      badge: 'Phong cách Pythonic',
      content: `
        <p>Trong Python, bất kỳ đối tượng nào cũng có thể được đưa vào mệnh đề điều kiện <code>if</code>. Python không bắt buộc điều kiện phải là kiểu <code>bool</code>.</p>
        <p>Để biết một đối tượng là "Đúng" (Truthy) hay "Sai" (Falsy), CPython gọi hàm <code>bool(obj)</code>. Quy tắc cực kỳ nhất quán và dễ nhớ:</p>
        <h4>Danh sách duy nhất các giá trị bị coi là FALSY (Sai):</h4>
        <ul>
          <li>Đối tượng đơn lẻ: <code>None</code> và <code>False</code>.</li>
          <li>Mọi con số mang giá trị KHÔNG: số nguyên <code>0</code>, số thực <code>0.0</code>, số phức <code>0j</code>, <code>Decimal(0)</code>, <code>Fraction(0, 1)</code>.</li>
          <li>Mọi chuỗi và tập hợp RỖNG: chuỗi rỗng <code>""</code>, danh sách rỗng <code>[]</code>, tuple rỗng <code>()</code>, dict rỗng <code>{}</code>, set rỗng <code>set()</code>, dải rỗng <code>range(0)</code>.</li>
        </ul>
        <p><strong>Mọi đối tượng còn lại trong vũ trụ Python đều được coi là TRUTHY (Đúng)!</strong></p>
        <p>Do đó, viết <code>if danh_sach:</code> là cách viết chuẩn mực Pythonic để kiểm tra danh sách có phần tử hay không, thay vì viết rườm rà <code>if len(danh_sach) > 0:</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra Truthiness bằng hàm bool() và cú pháp Pythonic',
          code: `# Kiểm tra các giá trị Falsy
print("bool(None):", bool(None))
print("bool(0):", bool(0))
print("bool(''):", bool(""))
print("bool([]):", bool([]))
print("bool({}):", bool({}))

# Kiểm tra các giá trị Truthy
print("\\nbool(' '):", bool(" "), "-> Chuỗi có 1 dấu cách KHÔNG rỗng!")
print("bool([0]):", bool([0]), "-> Danh sách chứa số 0 KHÔNG rỗng!")
print("bool(-1):", bool(-1), "-> Số âm khác 0 vẫn là Truthy!")

# Áp dụng vào câu lệnh if chuẩn mực
thong_bao = ["Có tin nhắn mới!"]
if thong_bao:
    print("\\nChuẩn Pythonic: Bạn có thông báo cần đọc.")
else:
    print("\\nHòm thư rỗng.")`,
          output: `bool(None): False
bool(0): False
bool(''): False
bool([]): False
bool({}): False

bool(' '): True -> Chuỗi có 1 dấu cách KHÔNG rỗng!
bool([0]): True -> Danh sách chứa số 0 KHÔNG rỗng!
bool(-1): True -> Số âm khác 0 vẫn là Truthy!

Chuẩn Pythonic: Bạn có thông báo cần đọc.`,
          annotations: [
            { line: 9, text: 'Cạm bẫy: chuỗi chứa dấu cách " " có len = 1 nên là Truthy!' },
            { line: 10, text: 'Danh sách [0] chứa 1 phần tử nên len = 1, là Truthy dù phần tử bên trong là 0.' },
            { line: 15, text: 'if thong_bao: tự động kiểm tra bool(thong_bao), cực kỳ súc tích.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cạm bẫy chuỗi có khoảng trắng và danh sách chứa số 0',
        content: 'Rất nhiều lập trình viên nhầm lẫn: cho rằng `" "` là Falsy vì trông nó trống trải, hoặc `[0]` là Falsy vì bên trong có số 0. Hãy nhớ: chỉ chuỗi rỗng tuyệt đối `""` (độ dài 0) và danh sách rỗng tuyệt đối `[]` mới là Falsy!'
      },
      {
        title: 'Bẫy thứ tự ưu tiên giữa toán tử so sánh và toán tử logic',
        content: 'Toán tử so sánh (`==`, `<`, `>`) có độ ưu tiên cao hơn toán tử logic (`and`, `or`, `not`). Ví dụ: `not a == b` thực chất là `not (a == b)`. Khi viết biểu thức phức tạp, hãy luôn đặt dấu ngoặc đơn `()` để bảo vệ logic tường minh.'
      }
    ],
    tips: [
      {
        title: '💡 Điểm nối tư duy: Khám phá trực quan hóa luồng rẽ nhánh tại Phần 0B',
        content: 'Để nhìn thấy rõ ràng từng đường đi ngắn mạch (short-circuit) và các nhánh điều kiện dưới dạng đồ thị luồng trực quan chuẩn ISO 5807, hãy xem thêm các bài học tại [Phần 0B: Flowchart và tư duy thuật toán (Bài B1.4, B1.5)].'
      }
    ],
    deepDive: {
      title: 'Bên trong CPython: Phương thức __bool__() và __len__()',
      content: `
        <p>Làm sao CPython biết một đối tượng tùy biến do bạn tự tạo bằng <code>class</code> là Truthy hay Falsy?</p>
        <p>Quy trình CPython kiểm tra Truthiness:</p>
        <ol>
          <li>Trước hết, CPython tìm xem đối tượng có cài đặt phương thức <code>__bool__()</code> không. Nếu có, nó gọi phương thức này và lấy kết quả <code>True</code>/<code>False</code>.</li>
          <li>Nếu không có <code>__bool__()</code>, nó tìm tiếp phương thức đo độ dài <code>__len__()</code>. Nếu <code>len == 0</code> thì là Falsy, <code>len > 0</code> thì là Truthy.</li>
          <li>Nếu cả hai phương thức đều không có, đối tượng mặc định luôn là <strong>Truthy</strong>!</li>
        </ol>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Thiết lập giá trị mặc định cho cấu hình người dùng bằng toán tử or',
      problem: 'Viết một hàm `lay_ten_hien_thi(ho_ten)` nhận vào tham số `ho_ten` (có thể là chuỗi rỗng `""` hoặc `None`). Hàm trả về họ tên đó nếu có dữ liệu hợp lệ, hoặc trả về chuỗi mặc định `"Người dùng ẩn danh"` nếu chuỗi rỗng hoặc None, chỉ bằng đúng 1 dòng lệnh dùng toán tử `or`.',
      hint: 'Cú pháp: return ho_ten or "Người dùng ẩn danh".',
      solutionCode: `def lay_ten_hien_thi(ho_ten):
    # Dùng tính chất trả về toán hạng của or
    return ho_ten or "Người dùng ẩn danh"

print("1.", lay_ten_hien_thi("Nguyễn Văn An"))
print("2.", lay_ten_hien_thi(""))
print("3.", lay_ten_hien_thi(None))`,
      solutionOutput: `1. Nguyễn Văn An
2. Người dùng ẩn danh
3. Người dùng ẩn danh`,
      explanation: 'Khi ho_ten là "" hoặc None, chúng là Falsy nên toán tử or tự động trả về toán hạng thứ hai "Người dùng ẩn danh". Khi ho_ten là "Nguyễn Văn An" (Truthy), or trả về ngay lập tức giá trị này.',
      annotations: [
        { line: 3, text: 'Ngắn gọn, súc tích và chuẩn mực Pythonic.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Xác thực an toàn chuỗi truy vấn bằng tính ngắn mạch',
      problem: 'Cho một danh sách `ds = []`. Viết một biểu thức kiểm tra: nếu danh sách không rỗng VÀ phần tử đầu tiên bằng 10 thì in ra `"Đạt"`, ngược lại in `"Không đạt"`. Đảm bảo rằng khi danh sách rỗng, chương trình không bị lỗi `IndexError: list index out of range`.',
      hint: 'Dùng ngắn mạch: if ds and ds[0] == 10.',
      solutionCode: `def kiem_tra_danh_sach(danh_sach):
    # Nhờ ngắn mạch, nếu danh_sach là rỗng (Falsy), Python dừng ngay,
    # hoàn toàn không chạy danh_sach[0] nên không bao giờ bị IndexError!
    if danh_sach and danh_sach[0] == 10:
        return "Đạt"
    return "Không đạt"

print("Test danh sách rỗng:", kiem_tra_danh_sach([]))
print("Test danh sách [5, 10]:", kiem_tra_danh_sach([5, 10]))
print("Test danh sách [10, 20]:", kiem_tra_danh_sach([10, 20]))`,
      solutionOutput: `Test danh sách rỗng: Không đạt
Test danh sách [5, 10]: Không đạt
Test danh sách [10, 20]: Đạt`,
      explanation: 'Biểu thức danh_sach and danh_sach[0] == 10 là mẫu thiết kế kinh điển bảo vệ an toàn biên trong lập trình Python.',
      annotations: [
        { line: 4, text: 'danh_sach rỗng khiến vế trái là Falsy, CPython ngắt mạch ngay lập tức.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Kết quả của biểu thức `[] or "Python" and 100` trong Python là gì?',
      options: [
        'True',
        'False',
        '100',
        '"Python"'
      ],
      correctIndex: 2,
      explanation: 'Toán tử and có độ ưu tiên cao hơn or. Trước hết "Python" and 100: "Python" là Truthy nên trả về 100. Biểu thức trở thành [] or 100. Vì [] là Falsy nên or trả về toán hạng thứ hai là 100!'
    },
    {
      question: 'Trong các giá trị sau, giá trị nào được Python coi là TRUTHY (Đúng)?',
      options: [
        '0.0',
        '"" (chuỗi rỗng)',
        '"0" (chuỗi chứa ký tự số không)',
        'None'
      ],
      correctIndex: 2,
      explanation: '"0" là một chuỗi có độ dài bằng 1 (chứa ký tự \'0\'), không phải là chuỗi rỗng, nên nó là Truthy. Trong khi đó số thực 0.0, chuỗi rỗng "" và None đều là Falsy.'
    },
    {
      question: 'Tại sao viết `if len(ds) > 0:` được coi là kém Pythonic hơn `if ds:`?',
      options: [
        'Vì if len(ds) > 0 chạy chậm hơn gấp 100 lần.',
        'Vì trong triết lý Python, mọi tập hợp rỗng tự nhiên đều mang giá trị chân lý Falsy; viết if ds: vừa trực tiếp, vừa biểu đạt đúng bản chất Truthiness của ngôn ngữ.',
        'Vì len() không dùng được trên danh sách lớn.',
        'Vì if len(ds) > 0 sẽ gây lỗi cú pháp trong Python 3.'
      ],
      correctIndex: 1,
      explanation: 'Python định nghĩa tính Truthiness để các cấu trúc rỗng tự động chuyển thành False, giúp mã nguồn ngắn gọn, thanh lịch và tự nhiên như ngôn ngữ nói.'
    }
  ],

  summary: [
    'Biểu thức sinh ra giá trị; Câu lệnh thực hiện hành động.',
    'Python hỗ trợ so sánh dây chuyền tự nhiên: 18 <= tuoi <= 65 tương đương (18 <= tuoi) and (tuoi <= 65).',
    'and và or hoạt động theo cơ chế ngắn mạch và trả về chính toán hạng: A and B trả về A nếu A falsy, ngược lại trả về B; A or B trả về A nếu A truthy, ngược lại trả về B.',
    'Chỉ có 3 nhóm Falsy: None & False; số không (0, 0.0); chuỗi và tập hợp rỗng ("", [], (), {}, set()). Tất cả những thứ còn lại đều là Truthy.',
    'Viết "if danh_sach:" là chuẩn mực Pythonic để kiểm tra tập hợp có phần tử.'
  ]
};
