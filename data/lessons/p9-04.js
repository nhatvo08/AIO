export default {
  id: 'p9-04',
  partId: 'part-1',
  partTitle: 'Phần 1 – Các kiểu số trong Python',
  number: '1.4',
  title: 'Số phức complex & Kiểu luận lý bool',
  subtitle: 'Cấu tạo 2 float của complex, module cmath và bản chất "bool thực ra là int" với các ứng dụng thanh lịch',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu cấu trúc bộ nhớ của số phức `complex` là cặp 2 số `float` 64-bit (`real` và `imag`), ký pháp `j`, số phức liên hợp `.conjugate()`.',
    'Sử dụng thành thạo module `cmath` để tính toán căn bậc hai số âm, tọa độ cực (polar / rect) và góc pha (phase).',
    'Nhận diện các lỗi thường gặp: cấm so sánh thứ tự `<`, `>` trên số phức và bẫy cú pháp `2j` vs `2*j`.',
    'Hiểu bản chất kiến trúc vì sao `bool` kế thừa `int` (`True == 1`, `False == 0`), và tại sao `True + True == 2`.',
    'Áp dụng các kỹ thuật Pythonic từ tính chất bool-là-int: đếm điều kiện thỏa mãn với `sum()`, dùng bool làm chỉ số danh sách.'
  ],

  intuition: {
    title: 'Mặt phẳng 2 chiều và Chiếc công tắc bóng đèn 0/1',
    metaphor: 'Nếu số thực `float` giống như những điểm nằm trên một sợi dây thẳng 1 chiều (trục số thực), thì số phức `complex` mở rộng không gian ra cả một mặt phẳng 2 chiều: mỗi số phức là một tọa độ $(x, y)$ giúp các kỹ sư điện và vật lý lượng tử xoay vector, tính dòng điện xoay chiều một cách thần kỳ mà không cần ma trận phức tạp. Còn `bool`? Nó giống như chiếc công tắc bóng đèn trên tường: người dùng nhìn thấy hai chữ "BẬT" (True) và "TẮT" (False), nhưng bên trong đường dây điện ngầm, vi mạch chỉ hiểu đúng hai mức điện thế: 1 Volt và 0 Volt!',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:12px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;">
        <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
          <div style="color:var(--accent-text);font-weight:700;">complex: (real + imag*j)</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:4px;">
            Trục hoành: <code>z.real</code> (float 64b)<br/>
            Trục tung: <code>z.imag</code> (float 64b)<br/>
            Liên hợp: <code>z.conjugate()</code> (real - imag*j)
          </div>
        </div>
        <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
          <div style="color:var(--success);font-weight:700;">bool: Lớp con của int</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:4px;">
            <code>True</code> = 1 &nbsp;|&nbsp; <code>False</code> = 0<br/>
            <code>True + True</code> = 2<br/>
            <code>["Tắt", "Bật"][True]</code> = 'Bật'
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Số phức complex: Cấu tạo bộ nhớ, ký pháp j và các thuộc tính',
      badge: 'Cấu trúc complex',
      content: `
        <p>Trong Python, số phức (<code>complex</code>) là kiểu dữ liệu tích hợp sẵn (built-in). Về mặt kiến trúc, một đối tượng <code>complex</code> bao gồm <strong>hai số thực float 64-bit ghép lại</strong>:</p>
        <ul>
          <li>Thuộc tính <code>.real</code>: Phần thực (float).</li>
          <li>Thuộc tính <code>.imag</code>: Phần ảo (float).</li>
          <li>Phương thức <code>.conjugate()</code>: Trả về số phức liên hợp (giữ nguyên phần thực, đổi dấu phần ảo).</li>
        </ul>
        <p><strong>Ký pháp <code>j</code>:</strong> Khác với toán học thuần túy thường dùng chữ cái $i$ cho đơn vị ảo ($i^2 = -1$), Python sử dụng chữ cái <strong><code>j</code> hoặc <code>J</code></strong> theo quy ước quốc tế của ngành Kỹ thuật Điện tử (Electrical Engineering — nơi ký tự $i$ đã được dành riêng cho cường độ dòng điện $i(t)$).</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo số phức và khám phá các thuộc tính cốt lõi',
          code: `z1 = 3 + 4j
z2 = complex(2, -1.5)

print("z1             :", z1, "| Kiểu:", type(z1).__name__)
print("Phần thực real :", z1.real, "| Kiểu:", type(z1.real).__name__)
print("Phần ảo imag   :", z1.imag, "| Kiểu:", type(z1.imag).__name__)
print("Liên hợp z1*   :", z1.conjugate())

# Phép toán số phức
print("Cộng z1 + z2   :", z1 + z2)
print("Nhân z1 * z2   :", z1 * z2)
print("Độ lớn (Modulus):", abs(z1))  # sqrt(3^2 + 4^2) = 5.0`,
          output: `z1             : (3+4j) | Kiểu: complex
Phần thực real : 3.0 | Kiểu: float
Phần ảo imag   : 4.0 | Kiểu: float
Liên hợp z1*   : (3-4j)
Cộng z1 + z2   : (5+2.5j)
Nhân z1 * z2   : (12+3.5j)
Độ lớn (Modulus): 5.0`,
          annotations: [
            { line: 1, text: 'Có thể viết trực tiếp số thực ghép với hậu tố j: 3 + 4j.' },
            { line: 5, text: 'Thuộc tính .real và .imag luôn luôn trả về kiểu float.' },
            { line: 7, text: 'Hàm abs(z) tính độ lớn bán kính r = sqrt(real^2 + imag^2).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Thư viện cmath chuyên dụng và Các bẫy thường gặp với số phức',
      badge: 'module cmath & Cạm bẫy',
      content: `
        <p>Hàm <code>math.sqrt(-1)</code> sẽ ném lỗi <code>ValueError: math domain error</code> vì module <code>math</code> được thiết kế thuần túy cho miền số thực. Khi cần làm việc với số phức, bạn phải dùng module chuẩn <strong><code>cmath</code> (Complex Math)</strong>:</p>
        <ul>
          <li><code>cmath.sqrt(-1)</code>: Trả về chính xác <code>1j</code> (hoặc <code>0+1j</code>).</li>
          <li><code>cmath.phase(z)</code>: Tính góc pha $\phi$ (argument) theo radian.</li>
          <li><code>cmath.polar(z)</code>: Chuyển đổi tọa độ Đề-các $(x, y)$ sang tọa độ cực $(r, \phi)$.</li>
          <li><code>cmath.rect(r, phi)</code>: Chuyển ngược lại từ tọa độ cực sang số phức.</li>
        </ul>
        <p><strong>2 Cạm bẫy thường gặp với complex:</strong></p>
        <ol>
          <li><strong>Cấm so sánh thứ tự:</strong> Tập số phức không có thứ tự trên trục số. Các biểu thức <code>(1+2j) &lt; (2+1j)</code> sẽ ném <strong><code>TypeError: '&lt;' not supported between instances of 'complex' and 'complex'</code></strong>!</li>
          <li><strong>Nhầm lẫn giữa literal <code>2j</code> và <code>2*j</code>:</strong> Khi bạn viết <code>2j</code>, Python hiểu đó là số ảo thuần túy. Nhưng nếu viết <code>2*j</code>, Python sẽ tìm kiếm biến mang tên <code>j</code> trong phạm vi chương trình và ném lỗi <code>NameError: name 'j' is not defined</code> nếu biến này chưa khai báo! Tương tự, để viết số ảo đơn vị $1j$, bắt buộc phải viết <code>1j</code> chứ không được viết lẻ một mình chữ <code>j</code>!</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Tính toán với module cmath và các lỗi cú pháp số phức',
          code: `import cmath
import math

# 1. Tính căn bậc hai của số âm với cmath
try:
    math.sqrt(-4)
except ValueError as e:
    print("math.sqrt(-4) bị lỗi:", e)

print("cmath.sqrt(-4) chuẩn xác:", cmath.sqrt(-4))

# 2. Tọa độ cực (Polar coordinates)
z = 1 + 1j
r, phi = cmath.polar(z)
print(f"Bán kính r={r:.4f}, Góc pha phi={phi:.4f} rad ({math.degrees(phi)}°)")

# 3. Lỗi so sánh thứ tự
try:
    print(1 + 2j < 2 + 1j)
except TypeError as e:
    print("So sánh thứ tự complex:", type(e).__name__, "-", e)`,
          output: `math.sqrt(-4) bị lỗi: math domain error
cmath.sqrt(-4) chuẩn xác: 2j
Bán kính r=1.4142, Góc pha phi=0.7854 rad (45.0°)
So sánh thứ tự complex: TypeError - '<' not supported between instances of 'complex' and 'complex'`,
          annotations: [
            { line: 8, text: 'cmath.sqrt(-4) trả về 2j.' },
            { line: 12, text: 'cmath.polar(1+1j) tách ra bán kính sqrt(2) = 1.4142 và góc 45 độ (pi/4 rad).' },
            { line: 18, text: 'Số phức không thể so sánh lớn hơn/nhỏ hơn; chỉ có thể so sánh bằng (==) hoặc khác (!=).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Kiểu luận lý bool: Bản chất "bool thực ra là int" và Hệ quả',
      badge: 'Bản chất bool is int',
      content: `
        <p>Trong Python, <code>bool</code> không phải là một kiểu nguyên thủy tách biệt như trong nhiều ngôn ngữ khác. Nó là một <strong>lớp con trực tiếp của <code>int</code></strong>:</p>
        <pre class="code-pre"><code>&gt;&gt;&gt; issubclass(bool, int)
True
&gt;&gt;&gt; isinstance(True, int)
True</code></pre>
        <p>Hai hằng số <code>True</code> và <code>False</code> thực chất mang giá trị số nguyên lần lượt là <strong><code>1</code></strong> và <strong><code>0</code></strong>. Chúng thừa hưởng toàn bộ các phương thức và toán tử của số nguyên!</p>
        <p><strong>Các ứng dụng thanh lịch (Pythonic Idioms):</strong></p>
        <ul>
          <li><strong>Đếm số điều kiện thỏa mãn bằng <code>sum()</code>:</strong> Thay vì dùng biến đếm với nhiều dòng <code>if</code>, bạn có thể truyền thẳng một biểu thức sinh boolean vào <code>sum()</code>. Vì <code>True == 1</code> và <code>False == 0</code>, <code>sum()</code> sẽ cộng dồn chính xác số lượng điều kiện đạt!</li>
          <li><strong>Dùng bool làm chỉ số chọn phần tử (Indexing):</strong> <code>["Thất bại", "Thành công"][is_ok]</code> — khi <code>is_ok</code> là <code>False</code> (0) nó lấy phần tử 0, khi là <code>True</code> (1) nó lấy phần tử 1!</li>
          <li><strong>Phép tính số học với boolean:</strong> Biểu thức <code>True + True</code> trả về <code>2</code>, <code>True * 50</code> trả về <code>50</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sức mạnh của bool là int trong kỹ thuật lập trình thực chiến',
          code: `# 1. Bản chất số học của bool
print("True + True =", True + True)
print("False * 100 =", False * 100)
print("True == 1   :", True == 1)
print("False == 0  :", False == 0)

# 2. Đếm số học sinh đạt điểm giỏi bằng sum()
scores = [8.5, 9.0, 6.5, 7.0, 9.5, 8.0]
excellent_count = sum(s >= 8.5 for s in scores)
print("Số học sinh giỏi (>= 8.5):", excellent_count)

# 3. Dùng bool làm chỉ số mảng
is_vip = True
status_text = ["Khách thường", "Khách VIP"][is_vip]
print("Trạng thái người dùng:", status_text)`,
          output: `True + True = 2
False * 100 = 0
True == 1   : True
False == 0  : True
Số học sinh giỏi (>= 8.5): 3
Trạng thái người dùng: Khách VIP`,
          annotations: [
            { line: 2, text: 'True + True = 1 + 1 = 2.' },
            { line: 9, text: 'sum(...) nhận vào một dãy True/False, tự động ép kiểu thành 1/0 để cộng dồn cực kỳ thanh lịch.' },
            { line: 14, text: 'is_vip là True (1) nên lấy đúng phần tử tại index 1 là "Khách VIP".' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Phân biệt x is True và x == True',
        content: 'Toán tử is kiểm tra đúng đối tượng Singleton True. Nếu x = 1, thì x == True trả về True (vì 1 == 1), nhưng x is True trả về False (vì 1 là int, không phải bool). Đừng bao giờ viết if x == True:, chỉ cần viết if x: theo phong cách chuẩn PEP 8.'
      },
      {
        title: 'Gõ thiếu số 1 trước chữ j',
        content: 'Nếu muốn biểu diễn 1 đơn vị ảo, bạn bắt buộc phải gõ 1j. Nếu chỉ gõ j, Python sẽ tưởng rằng bạn đang gọi tên một biến có tên là j và báo lỗi NameError: name \'j\' is not defined.'
      }
    ],
    tips: [
      {
        title: '💡 Điểm nối tư duy: Bản chất Truthiness và Singleton',
        content: 'Để hiểu sâu vì sao `True` và `False` là hai đối tượng Singleton bất biến được tạo sẵn trong RAM và cách mọi kiểu dữ liệu chuyển đổi sang bool thông qua Truthiness / Falsiness, hãy đối chiếu với [Phần 0: Nền tảng Python (Bài 0.5 - Logic Boolean, Toán tử và Truthiness)].'
      },
      {
        title: 'Chuyển đổi góc pha sang độ với math.degrees',
        content: 'Hàm `cmath.phase(z)` luôn trả về đơn vị radian (từ $-\pi$ đến $+\pi$). Khi cần hiển thị cho người dùng, hãy dùng `math.degrees(cmath.phase(z))` để chuyển sang góc từ $-180^\circ$ đến $+180^\circ$.'
      }
    ],
    deepDive: {
      title: 'Vì sao bool không thể bị kế thừa tiếp trong Python?',
      content: `
        <p>Nếu bạn thử tạo một lớp con kế thừa từ <code>bool</code>:</p>
        <pre class="code-pre"><code>&gt;&gt;&gt; class MyBool(bool):
...     pass
TypeError: type 'bool' is not an acceptable base type</code></pre>
        <p>CPython thiết lập cờ <code>Py_TPFLAGS_BASETYPE</code> bằng 0 cho cấu trúc <code>PyBool_Type</code>. Điều này nhằm bảo đảm bất biến logic của ngôn ngữ: kiểu boolean chỉ được phép có đúng <strong>2 cá thể duy nhất trên toàn thế giới (Singletons)</strong> là <code>True</code> và <code>False</code>. Nếu cho phép kế thừa, lập trình viên có thể tạo ra giá trị thứ ba (ví dụ "Maybe" hay "Unknown"), phá hỏng nền tảng của đại số Boole hai ngôi trong Python.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Tính điện trở tương đương của mạch xoay chiều',
      problem: 'Cho trở kháng của hai nhánh song song trong mạch điện xoay chiều: $Z_1 = 10 + 20j\ \Omega$ và $Z_2 = 15 - 10j\ \Omega$. Công thức tính trở kháng tương đương là: $Z_{eq} = \\frac{Z_1 \\times Z_2}{Z_1 + Z_2}$. Hãy tính $Z_{eq}$ và in ra phần điện trở thực và dung kháng ảo của mạch.',
      hint: 'Áp dụng công thức số phức thông thường `(z1 * z2) / (z1 + z2)`.',
      solutionCode: `z1 = 10 + 20j
z2 = 15 - 10j

z_eq = (z1 * z2) / (z1 + z2)
print("Trở kháng tương đương Z_eq:", z_eq)
print(f"Điện trở R (phần thực)    : {z_eq.real:.3f} Ohm")
print(f"Điện kháng X (phần ảo)    : {z_eq.imag:.3f} Ohm")`,
      solutionOutput: `Trở kháng tương đương Z_eq: (14.23076923076923+5.384615384615385j)
Điện trở R (phần thực)    : 14.231 Ohm
Điện kháng X (phần ảo)    : 5.385 Ohm`,
      explanation: 'Python xử lý phép nhân và chia số phức một cách tự nhiên và chính xác tuyệt đối mà không cần người học phải tự nhân liên hợp thủ công!'
    },
    {
      level: 'Vừa',
      title: 'Lọc và thống kê mật khẩu hợp lệ với kỹ thuật bool-là-int',
      problem: 'Cho một mật khẩu `pw = "Python@314"`. Mật khẩu được coi là mạnh nếu thỏa mãn 4 tiêu chí: (1) dài ít nhất 8 ký tự, (2) có chữ hoa, (3) có chữ số, (4) có ký tự đặc biệt (thuộc `@#$%`). Hãy dùng biểu thức boolean kết hợp `sum()` để đếm xem mật khẩu đạt bao nhiêu trên 4 tiêu chí.',
      hint: 'Tạo danh sách 4 điều kiện boolean và gọi `sum()`.',
      solutionCode: `pw = "Python@314"

checks = [
    len(pw) >= 8,
    any(c.isupper() for c in pw),
    any(c.isdigit() for c in pw),
    any(c in "@#$%" for c in pw)
]

score = sum(checks)
print("Các tiêu chí đạt:", checks)
print(f"Điểm đánh giá: {score}/4 tiêu chí")`,
      solutionOutput: `Các tiêu chí đạt: [True, True, True, True]
Điểm đánh giá: 4/4 tiêu chí`,
      explanation: 'Hàm sum([True, True, True, True]) tự động cộng 1+1+1+1 = 4 điểm, ngắn gọn hơn nhiều so với việc viết 4 câu lệnh if cộng dồn.'
    },
    {
      level: 'Khó',
      title: 'Giải phương trình bậc hai tổng quát trên miền số phức',
      problem: 'Hãy viết hàm `solve_quadratic(a, b, c)` giải phương trình $ax^2 + bx + c = 0$ cho mọi nghiệm (kể cả nghiệm thực và nghiệm phức khi biệt thức $\Delta < 0$) bằng cách sử dụng `cmath.sqrt()`.',
      hint: 'Tính `delta = b**2 - 4*a*c`, sau đó `cmath.sqrt(delta)`. Nếu phần ảo bằng 0, có thể trả về số thực.',
      solutionCode: `import cmath

def solve_quadratic(a, b, c):
    if a == 0:
        raise ValueError("Hệ số a phải khác 0")
    delta = b ** 2 - 4 * a * c
    sqrt_delta = cmath.sqrt(delta)
    
    x1 = (-b + sqrt_delta) / (2 * a)
    x2 = (-b - sqrt_delta) / (2 * a)
    
    # Rút gọn về số thực nếu phần ảo bằng 0
    clean = lambda z: z.real if z.imag == 0 else z
    return clean(x1), clean(x2)

print("x^2 - 4x + 3 = 0  -> Nghiệm:", solve_quadratic(1, -4, 3))
print("x^2 + 2x + 5 = 0  -> Nghiệm:", solve_quadratic(1, 2, 5))`,
      solutionOutput: `x^2 - 4x + 3 = 0  -> Nghiệm: (3.0, 1.0)
x^2 + 2x + 5 = 0  -> Nghiệm: ((-1+2j), (-1-2j))`,
      explanation: 'Với delta < 0 (-16), cmath.sqrt(-16) trả về 4j, giúp phương trình tìm ra 2 nghiệm phức liên hợp (-1+2j) và (-1-2j) một cách trơn tru.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về cấu trúc bộ nhớ của một đối tượng `complex` trong Python?',
      options: [
        'Gồm 1 số nguyên 32-bit và 1 số thực float 32-bit.',
        'Gồm 2 số thực float 64-bit IEEE 754 (phần thực `real` và phần ảo `imag`).',
        'Gồm 1 chuỗi ký tự chứa chữ `j`.',
        'Gồm 1 con trỏ trỏ tới ma trận 2x2.'
      ],
      correctIndex: 1,
      explanation: 'Mỗi đối tượng complex trong CPython chứa đúng hai số double (float 64-bit), một cho .real và một cho .imag.'
    },
    {
      question: 'Tại sao câu lệnh `(2 + 3j) < (3 + 2j)` lại gây ra lỗi `TypeError`?',
      options: [
        'Do 2+3j có phần ảo lớn hơn nên Python không biết so sánh thế nào.',
        'Do toán tử < chưa được nạp chồng (overload) trong CPython.',
        'Do tập số phức không có quan hệ thứ tự toàn phần (không thể xếp thứ tự trên một đường thẳng).',
        'Do số phức bắt buộc phải dùng hàm `cmath.compare()`.'
      ],
      correctIndex: 2,
      explanation: 'Trong toán học và Python, số phức không có thứ tự. Việc so sánh <, <=, >, >= bị cấm hoàn toàn và ném TypeError.'
    },
    {
      question: 'Kết quả của biểu thức `sum([True, False, True, True])` là bao nhiêu?',
      options: [
        '`True`',
        '`3`',
        'Ném lỗi `TypeError` vì sum chỉ nhận số.',
        '`[True, True, True]`'
      ],
      correctIndex: 1,
      explanation: 'Vì bool là lớp con của int, True mang giá trị số 1 và False mang giá trị 0. Hàm sum() cộng 1 + 0 + 1 + 1 = 3.'
    },
    {
      question: 'Điều gì xảy ra khi bạn khai báo `z = 3 + 2*j` mà chưa định nghĩa biến `j`?',
      options: [
        'Python tự hiểu `j` là đơn vị ảo và gán `z = (3+2j)`.',
        'Ném lỗi `NameError: name \'j\' is not defined`.',
        'Ném lỗi `SyntaxError`.',
        'Tạo ra số phức `(3+0j)`.'
      ],
      correctIndex: 1,
      explanation: 'Literal số ảo phải viết liền không dấu sao: `2j`. Nếu viết `2*j`, dấu nhân khiến Python coi `j` là một biến độc lập và ném NameError.'
    }
  ],

  summary: [
    'Kiểu `complex` gồm cặp 2 số `float` 64-bit (`.real` và `.imag`), dùng hậu tố `j` hoặc `J` và phương thức `.conjugate()`.',
    'Dùng `cmath` cho các phép toán số phức (tọa độ cực, căn bậc hai số âm); số phức TUYỆT ĐỐI không thể so sánh thứ tự `<`, `>`.',
    '`bool` là lớp con của `int`; `True == 1`, `False == 0`, `True + True == 2`.',
    'Tận dụng `sum()` trên danh sách boolean là kỹ thuật Pythonic cực kỳ thanh lịch để đếm số điều kiện thỏa mãn.'
  ]
};
