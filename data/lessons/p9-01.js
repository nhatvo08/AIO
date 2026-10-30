export default {
  id: 'p9-01',
  partId: 'part-1',
  partTitle: 'Phần 1 – Các kiểu số trong Python',
  number: '1.1',
  title: 'Bức tranh Tổng thể các Kiểu Số & Tháp Kiểu numbers',
  subtitle: 'Hiểu đúng bản chất hệ thống số trong Python từ các kiểu tích hợp đến Tháp số Trừu tượng (Numeric Tower)',
  level: 'Nâng cao',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm trọn vẹn bức tranh tổng thể các kiểu số trong Python: 4 kiểu tích hợp sẵn (`int`, `float`, `complex`, `bool`) và 2 kiểu chuẩn độ chính xác cao (`Decimal`, `Fraction`).',
    'Hiểu bản chất phân cấp của Tháp số Trừu tượng trong module `numbers` (PEP 3141): `Number` → `Complex` → `Real` → `Rational` → `Integral`.',
    'Giải mã bản chất vì sao `bool` lại là lớp con trực tiếp của `int` và hệ quả kiến trúc của nó.',
    'Hiểu lý do sâu sắc vì sao `decimal.Decimal` cố tình KHÔNG nằm trong nhánh `Real` của Tháp số.'
  ],

  intuition: {
    title: 'Hộp đồ nghề cơ khí và Thước đo của thợ kim hoàn',
    metaphor: 'Trong đời sống, bạn không dùng cân tạ của xe tải để cân bột làm bánh, cũng không dùng thước kẻ học sinh để đo đường kính sợi tóc. Python cũng vậy: `int` và `float` giống như chiếc thước dây và cân đồng hồ quen thuộc trong sinh hoạt — tính toán cực nhanh, tiện lợi, đủ chính xác cho 95% công việc thường ngày. Nhưng khi bước vào tiệm vàng bạc đá quý hay phòng thí nghiệm hạt nhân, bạn cần chiếc cân tiểu ly điện tử `Decimal` để không thất thoát một ly vàng, hoặc chiếc compa quang học `Fraction` để giữ nguyên tỷ lệ phân số hoàn hảo không một phần triệu sai số.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:10px;font-family:var(--font-mono);font-size:0.85rem;padding:14px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">HỆ THỐNG CÁC KIỂU SỐ TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--success);">Tích hợp sẵn (Built-in)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
              • <code>int</code>: Số nguyên vô hạn<br/>
              • <code>float</code>: Dấu phẩy động IEEE 754<br/>
              • <code>complex</code>: Số phức (real + imag*j)<br/>
              • <code>bool</code>: Lớp con của int (0 & 1)
            </div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--py-gold);">Thư viện chuẩn (Standard Lib)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
              • <code>decimal.Decimal</code>: Thập phân chính xác tuyệt đối<br/>
              • <code>fractions.Fraction</code>: Số hữu tỷ (tử / mẫu)
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Bức tranh toàn cảnh 6 kiểu số cốt lõi trong Python',
      badge: 'Tổng quan Kiến trúc',
      content: `
        <p>Mỗi khi viết một phép tính trong Python, trình thông dịch phải quyết định: con số này được biểu diễn bằng bao nhiêu bit trong bộ nhớ RAM, lưu dưới dạng nhị phân hay thập phân, và phép toán đó ưu tiên <strong>tốc độ phần cứng</strong> hay <strong>độ chính xác toán học tuyệt đối</strong>.</p>
        <p>Python trang bị sẵn 6 kiểu số chính, chia thành 2 nhóm:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Kiểu dữ liệu</th>
                <th>Vị trí</th>
                <th>Bản chất lưu trữ</th>
                <th>Độ chính xác</th>
                <th>Ứng dụng điển hình</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>int</code></td>
                <td>Built-in</td>
                <td>Mảng các số nguyên 30-bit (CPython)</td>
                <td>Tùy ý (vô hạn, chỉ giới hạn bởi RAM)</td>
                <td>Đếm, chỉ số mảng, mật mã học, số nguyên lớn</td>
              </tr>
              <tr>
                <td><code>float</code></td>
                <td>Built-in</td>
                <td>Chuẩn IEEE 754 binary64 (64-bit đôi)</td>
                <td>53 bit nhị phân (~15-17 chữ số thập phân)</td>
                <td>Khoa học, game, đo lường liên tục, học máy</td>
              </tr>
              <tr>
                <td><code>complex</code></td>
                <td>Built-in</td>
                <td>Cặp 2 số float 64-bit (phần thực & phần ảo)</td>
                <td>Tương đương 2 lần float</td>
                <td>Kỹ thuật điện, xử lý tín hiệu số, cơ học lượng tử</td>
              </tr>
              <tr>
                <td><code>bool</code></td>
                <td>Built-in</td>
                <td>Kế thừa trực tiếp từ <code>int</code></td>
                <td>Mang giá trị <code>0</code> (False) hoặc <code>1</code> (True)</td>
                <td>Logic điều kiện, mặt nạ lọc dữ liệu</td>
              </tr>
              <tr>
                <td><code>Decimal</code></td>
                <td><code>decimal</code></td>
                <td>Cơ số 10 (chuẩn IEEE 854), lưu dạng chuỗi số</td>
                <td>Tùy chỉnh linh hoạt (mặc định 28 chữ số)</td>
                <td>Tài chính, ngân hàng, kế toán, tính tiền thuế</td>
              </tr>
              <tr>
                <td><code>Fraction</code></td>
                <td><code>fractions</code></td>
                <td>Cặp 2 số <code>int</code> (Tử số / Mẫu số tối giản)</td>
                <td>Chính xác tuyệt đối dạng phân số hữu tỷ</td>
                <td>Đại số, bài toán chia phần, tỷ lệ xác suất chính xác</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khám phá kiểu dữ liệu và giá trị của 6 kiểu số',
          code: `import decimal
import fractions

a_int = 42
a_float = 3.14
a_complex = 2 + 3j
a_bool = True
a_decimal = decimal.Decimal("0.1")
a_fraction = fractions.Fraction(1, 3)

for x in [a_int, a_float, a_complex, a_bool, a_decimal, a_fraction]:
    print(f"{type(x).__name__:10} -> Giá trị: {str(x):10} | repr: {repr(x)}")`,
          output: `int        -> Giá trị: 42         | repr: 42
float      -> Giá trị: 3.14       | repr: 3.14
complex    -> Giá trị: (2+3j)     | repr: (2+3j)
bool       -> Giá trị: True       | repr: True
Decimal    -> Giá trị: 0.1        | repr: Decimal('0.1')
Fraction   -> Giá trị: 1/3        | repr: Fraction(1, 3)`,
          annotations: [
            { line: 4, text: 'Số nguyên int trong Python 3 có độ dài vô hạn, không bị tràn 32-bit hay 64-bit như C.' },
            { line: 5, text: 'Số thực float dùng dấu chấm thập phân, bản chất là double precision 64-bit.' },
            { line: 6, text: 'Số phức complex dùng hậu tố j thay cho i (theo truyền thống kỹ thuật điện).' },
            { line: 7, text: 'Kiểu bool chỉ có đúng 2 đối tượng duy nhất: True và False.' },
            { line: 8, text: 'Decimal khởi tạo từ chuỗi "0.1" để đảm bảo không bị sai số nhị phân.' },
            { line: 9, text: 'Fraction biểu diễn chính xác 1/3, điều mà float không bao giờ làm được.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Tháp số Trừu tượng (The Numeric Tower — PEP 3141)',
      badge: 'module numbers',
      content: `
        <p>Để giúp các thư viện số học có thể kiểm tra kiểu theo hướng trừu tượng (Abstract Base Classes - ABCs) thay vì ràng buộc cứng nhắc vào kiểu cụ thể, Python 3 giới thiệu <strong>Tháp số (Numeric Tower)</strong> trong module tích hợp <code>numbers</code> (theo đề xuất của PEP 3141):</p>
        <div style="font-family:var(--font-mono);font-size:0.9rem;padding:12px;background:var(--bg-code);color:var(--text-inverse);border-radius:8px;line-height:1.7;margin:12px 0;">
          <strong>Number</strong> (Cấp trừu tượng cao nhất: mọi số)<br/>
          &nbsp;&nbsp;└── <strong>Complex</strong> (Số có thể lấy liên hợp, real, imag)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── <strong>Real</strong> (Số có thể so sánh thứ tự &lt;, &lt;=, &gt;=, &gt;)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── <strong>Rational</strong> (Số biểu diễn được bằng tử số và mẫu số: numerator, denominator)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── <strong>Integral</strong> (Số nguyên: chia hết, toán tử bitwise &amp;, |, ^)
        </div>
        <p>Cơ chế này giúp các hàm thư viện chỉ cần viết <code>isinstance(x, numbers.Real)</code> là có thể chấp nhận cả <code>int</code>, <code>float</code>, lẫn <code>Fraction</code> mà không sợ nhận nhầm <code>complex</code> (vốn không có thứ tự trên trục số!).</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra vị trí của các kiểu số trong Tháp số numbers',
          code: `import numbers
from fractions import Fraction

print("int là Integral? ", isinstance(10, numbers.Integral))
print("int là Rational? ", isinstance(10, numbers.Rational))
print("Fraction là Rational? ", isinstance(Fraction(3, 4), numbers.Rational))
print("float là Real?    ", isinstance(3.14, numbers.Real))
print("float là Rational?", isinstance(3.14, numbers.Rational))
print("complex là Real?  ", isinstance(1 + 2j, numbers.Real))
print("complex là Complex?", isinstance(1 + 2j, numbers.Complex))`,
          output: `int là Integral?  True
int là Rational?  True
Fraction là Rational?  True
float là Real?     True
float là Rational? False
complex là Real?   False
complex là Complex? True`,
          annotations: [
            { line: 4, text: 'int vừa là Integral, vừa kế thừa Rational, Real, Complex, Number.' },
            { line: 6, text: 'Fraction là một Rational chuẩn mực vì có thuộc tính .numerator và .denominator.' },
            { line: 7, text: 'float thuộc nhánh Real, nhưng KHÔNG đăng ký làm Rational vì nó không cung cấp numerator/denominator nguyên mẫu.' },
            { line: 9, text: 'complex KHÔNG thuộc Real vì tập số phức không có quan hệ thứ tự toàn phần (không thể so sánh 1+2j > 2+1j).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Điều kỳ lạ: Vì sao Decimal KHÔNG nằm trong nhánh Real của Tháp số?',
      badge: 'Quyết định Kiến trúc PEP 3141',
      content: `
        <p>Nếu bạn kiểm tra <code>isinstance(Decimal("1.5"), numbers.Real)</code>, Python sẽ trả về <strong><code>False</code></strong>! <code>Decimal</code> chỉ kế thừa duy nhất <code>numbers.Number</code>.</p>
        <p>Tại sao lại như vậy? Các nhà thiết kế Python (đứng đầu là Guido van Rossum và tác giả PEP 3141) đã đưa ra một quyết định kiến trúc có chủ đích cực kỳ tinh tế:</p>
        <ul>
          <li><strong>Ngăn chặn sai số lan truyền ngầm định:</strong> Trong toán học, số thực thập phân hiển nhiên là số thực. Nhưng trong máy tính, phép toán giữa <code>float</code> (nhị phân cơ số 2) và <code>Decimal</code> (thập phân cơ số 10) không thể thực hiện ngầm định mà không gây mất mát dữ liệu hoặc hiểu lầm tai hại.</li>
          <li><strong>Nếu Decimal thuộc Real:</strong> Mọi hàm chấp nhận <code>Real</code> sẽ vô tình cho phép cộng trừ hỗn hợp giữa <code>float</code> và <code>Decimal</code>. Python cố tình tách rời để buộc lập trình viên phải chuyển đổi tường minh khi muốn ghép hai thế giới này lại với nhau!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Decimal và bài kiểm tra với Tháp số numbers',
          code: `import numbers
from decimal import Decimal

d = Decimal("10.5")
print("Decimal là Number?  ", isinstance(d, numbers.Number))
print("Decimal là Complex? ", isinstance(d, numbers.Complex))
print("Decimal là Real?    ", isinstance(d, numbers.Real))

try:
    result = d + 1.5
except TypeError as e:
    print("Cộng Decimal với float:", type(e).__name__, "-", e)`,
          output: `Decimal là Number?   True
Decimal là Complex?  False
Decimal là Real?     False
Cộng Decimal với float: TypeError - unsupported operand type(s) for +: 'decimal.Decimal' and 'float'`,
          annotations: [
            { line: 5, text: 'Decimal chỉ triển khai numbers.Number.' },
            { line: 7, text: 'Decimal từ chối đăng ký vào numbers.Real.' },
            { line: 12, text: 'Python chặn đứng phép cộng giữa Decimal và float để bảo vệ độ chính xác tài chính của bạn.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Dùng type(x) is int thay vì isinstance(x, int)',
        content: 'Vì bool kế thừa trực tiếp từ int, nếu bạn kiểm tra type(True) is int thì kết quả là False (vì kiểu thực tế của nó là bool). Nhưng nếu viết isinstance(True, int), kết quả sẽ là True! Trong các ứng dụng cần phân biệt rõ ràng biến cờ boolean với số đếm, hãy dùng type(x) is int hoặc kiểm tra if isinstance(x, bool) trước.'
      },
      {
        title: 'Nhầm lẫn giữa "Số thực trong Toán học" và kiểu float trong Máy tính',
        content: 'Số thực toán học ($\mathbb{R}$) là tập hợp liên tục và vô hạn. Ngược lại, kiểu float trong Python chỉ là một tập con hữu hạn gồm các số có thể biểu diễn được bằng 64 bit nhị phân theo chuẩn IEEE 754. Rất nhiều số thực đơn giản như 0.1, 0.2, 1/3 không thể biểu diễn chính xác bằng float!'
      }
    ],
    tips: [
      {
        title: '💡 Điểm nối tư duy: Nền tảng từ Phần 0',
        content: 'Mọi kiểu số trong Python đều tuân thủ nguyên lý hướng đối tượng đã học tại [Phần 0: Nền tảng Python (Bài 0.3 - Mọi thứ đều là Đối tượng và 0.4 - Tính Bất biến)]. Các đối tượng số (int, float, complex) một khi đã sinh ra trên Heap RAM đều là đối tượng bất biến (Immutable), không thể bị thay đổi giá trị tại chỗ.'
      },
      {
        title: 'Quy tắc chọn kiểu số nhanh theo nhu cầu',
        content: 'Cần đếm hay định danh? Dùng `int`. Cần tính toán khoa học, đo lường tốc độ cao? Dùng `float`. Cần tính tiền bạc, hóa đơn, lãi suất? Dùng `Decimal`. Cần giữ nguyên tỷ lệ chia bánh, xác suất không làm tròn? Dùng `Fraction`. Cần xoay tọa độ 2D, dao động điều hòa? Dùng `complex`.'
      }
    ],
    deepDive: {
      title: 'Khảo sát cây kế thừa MRO (Method Resolution Order) của bool và int',
      content: `
        <p>Hãy xem xét thứ tự phân giải phương thức (MRO) của kiểu <code>bool</code> trong CPython 3.14:</p>
        <pre class="code-pre"><code>&gt;&gt;&gt; bool.__mro__
(&lt;class 'bool'&gt;, &lt;class 'int'&gt;, &lt;class 'object'&gt;)
&gt;&gt;&gt; issubclass(bool, int)
True</code></pre>
        <p>Lịch sử: Trước Python 2.3, Python thậm chí chưa có kiểu <code>bool</code> riêng; lập trình viên dùng số nguyên <code>1</code> và <code>0</code> cho đúng và sai. Khi PEP 285 được thông qua, để đảm bảo <strong>tương thích ngược 100%</strong> với hàng triệu dòng code đang có lúc bấy giờ, Guido van Rossum đã quyết định cho <code>bool</code> kế thừa từ <code>int</code> thay vì tạo ra một kiểu độc lập hoàn toàn. Đó là lý do biểu thức <code>True + True</code> trong Python luôn cho kết quả bằng <code>2</code>!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Phân loại các số đầu vào theo kiểu dữ liệu',
      problem: 'Cho danh sách dữ liệu hỗn hợp: `data = [100, 3.14, 2+5j, False, "42", 0]`. Hãy viết vòng lặp in ra những phần tử là kiểu số hợp lệ (thuộc `numbers.Number`) kèm theo tên kiểu của nó.',
      hint: 'Dùng `import numbers` và kiểm tra `isinstance(x, numbers.Number)`.',
      solutionCode: `import numbers

data = [100, 3.14, 2+5j, False, "42", 0]
for item in data:
    if isinstance(item, numbers.Number):
        print(f"Giá trị: {str(item):6} | Kiểu: {type(item).__name__}")`,
      solutionOutput: `Giá trị: 100    | Kiểu: int
Giá trị: 3.14   | Kiểu: float
Giá trị: (2+5j) | Kiểu: complex
Giá trị: False  | Kiểu: bool
Giá trị: 0      | Kiểu: int`,
      explanation: 'Chuỗi `"42"` là văn bản (`str`), không phải số nên bị loại. Cả 5 phần tử còn lại (kể cả `False` vì `bool` kế thừa `int`) đều là thể hiện hợp lệ của `numbers.Number`.'
    },
    {
      level: 'Vừa',
      title: 'Viết hàm tính trung bình cộng an toàn với Tháp số',
      problem: 'Hãy viết hàm `calculate_real_average(numbers_list)` nhận vào một danh sách. Hàm chỉ tính trung bình cộng của các phần tử là số thực (thuộc `numbers.Real`), nhưng PHẢI LOẠI BỎ các giá trị kiểu `bool` (vì dù bool là Real nhưng ta không muốn True/False bị tính lẫn vào điểm số). Nếu gặp số phức `complex`, hãy ném lỗi `TypeError`.',
      hint: 'Kiểm tra `isinstance(x, numbers.Real) and not isinstance(x, bool)`. Nếu `isinstance(x, numbers.Complex)`, ném `TypeError`.',
      solutionCode: `import numbers

def calculate_real_average(items):
    valid_numbers = []
    for x in items:
        if isinstance(x, numbers.Complex) and not isinstance(x, numbers.Real):
            raise TypeError(f"Không thể tính trung bình với số phức: {x}")
        if isinstance(x, numbers.Real) and not isinstance(x, bool):
            valid_numbers.append(x)
    if not valid_numbers:
        return 0.0
    return sum(valid_numbers) / len(valid_numbers)

scores = [8.5, 9, 10, True, False, 7.5]
print("Điểm trung bình:", calculate_real_average(scores))`,
      solutionOutput: `Điểm trung bình: 8.75`,
      explanation: 'Hàm lọc lấy `[8.5, 9, 10, 7.5]` (tổng 35.0 chia 4 phần tử = 8.75). Hai giá trị `True` và `False` bị loại bỏ chính xác dù chúng là lớp con của `int`.'
    },
    {
      level: 'Khó',
      title: 'Tự tạo lớp Số tùy biến tương thích Tháp số numbers.Rational',
      problem: 'Hãy tạo một lớp `SimpleRatio` có thuộc tính `numerator` và `denominator`. Hãy đăng ký lớp này vào Tháp số sao cho `isinstance(SimpleRatio(1, 2), numbers.Rational)` trả về `True`.',
      hint: 'Kế thừa từ `numbers.Rational` hoặc sử dụng phương thức đăng ký ảo `numbers.Rational.register(SimpleRatio)`.',
      solutionCode: `import numbers

class SimpleRatio:
    def __init__(self, num, den):
        self.numerator = num
        self.denominator = den

# Đăng ký làm lớp con ảo (Virtual Subclass) theo cơ chế ABC của Python
numbers.Rational.register(SimpleRatio)

r = SimpleRatio(3, 5)
print("r là Rational? ", isinstance(r, numbers.Rational))
print("r là Real?     ", isinstance(r, numbers.Real))
print("r là Number?   ", isinstance(r, numbers.Number))`,
      solutionOutput: `r là Rational?  True
r là Real?      True
r là Number?    True`,
      explanation: 'Bằng phương thức `register()`, lớp `SimpleRatio` trở thành lớp con ảo của `numbers.Rational` mà không cần kế thừa phức tạp, đồng thời tự động thừa hưởng tính chất là `Real` và `Number`.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây mô tả ĐÚNG NHẤT về mối quan hệ giữa `bool` và `int` trong Python?',
      options: [
        '`bool` và `int` là hai kiểu độc lập hoàn toàn cùng kế thừa từ `object`.',
        '`int` là lớp con của `bool`.',
        '`bool` là lớp con trực tiếp của `int` (`issubclass(bool, int) is True`).',
        '`bool` là một giao diện ảo (Virtual Interface) trong module numbers.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python, `bool` kế thừa trực tiếp từ `int`. `True` có giá trị số là 1 và `False` có giá trị số là 0.'
    },
    {
      question: 'Trong module `numbers`, kiểu `complex` (số phức) nằm ở cấp nào trong Tháp số?',
      options: [
        'Nằm dưới `Real` vì mọi số phức đều chứa số thực.',
        'Nằm trên `Real` (`Complex` là lớp cha của `Real`).',
        'Nằm ngang hàng với `Integral`.',
        '`complex` không thuộc Tháp số `numbers`.'
      ],
      correctIndex: 1,
      explanation: 'Tháp số đi từ tổng quát đến chi tiết: Number → Complex → Real → Rational → Integral. Do đó Complex là lớp cha của Real.'
    },
    {
      question: 'Vì sao `decimal.Decimal` cố tình KHÔNG đăng ký vào nhánh `numbers.Real`?',
      options: [
        'Vì Decimal không phải là số thực trong toán học.',
        'Vì Decimal được viết bằng ngôn ngữ C nên không tương thích với Python ABC.',
        'Để ngăn chặn các phép tính ngầm định giữa số thực nhị phân (float) và số thực thập phân (Decimal) gây sai số tài chính.',
        'Vì Decimal có thể lưu trữ số phức.'
      ],
      correctIndex: 2,
      explanation: 'Đây là quyết định thiết kế có chủ đích: nếu Decimal là Real, các hàm nhận Real sẽ ngầm định cho phép trộn Decimal với float, phá hỏng nguyên tắc chính xác tuyệt đối của Decimal.'
    },
    {
      question: 'Kết quả của biểu thức `isinstance(3.14, numbers.Rational)` là gì?',
      options: [
        '`True`, vì mọi số thập phân hữu hạn đều viết được thành phân số.',
        '`False`, vì float là kiểu dấu phẩy động nhị phân xấp xỉ không cung cấp thuộc tính numerator/denominator nguyên mẫu.',
        '`TypeError`, vì numbers không hỗ trợ float.',
        '`None`.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, `float` chỉ kế thừa `numbers.Real`, không kế thừa `numbers.Rational`. Muốn làm việc với số hữu tỷ có tử số và mẫu số nguyên, phải dùng `fractions.Fraction`.'
    }
  ],

  summary: [
    'Python có 4 kiểu số tích hợp sẵn (`int`, `float`, `complex`, `bool`) và 2 kiểu chuẩn độ chính xác cao (`Decimal`, `Fraction`).',
    'Tháp số trong module `numbers` phân cấp trừu tượng: `Number` → `Complex` → `Real` → `Rational` → `Integral`.',
    '`bool` là lớp con trực tiếp của `int` nhằm đảm bảo tương thích ngược lịch sử.',
    '`Decimal` cố tình chỉ kế thừa `Number` mà không vào nhánh `Real` để triệt tiêu nguy cơ trộn lẫn sai số với `float`.'
  ]
};
