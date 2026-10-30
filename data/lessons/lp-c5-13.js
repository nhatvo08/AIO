export default {
  id: 'lp-c5-13',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.13',
  title: 'Công cụ số học dựng sẵn: Module math & 3 cách tính Căn bậc hai',
  subtitle: 'Thư viện toán học math, hàm dựng sẵn pow/abs/round, phân biệt round vs format và kiến trúc namespace builtins',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ các công cụ phổ biến trong module math: math.pi, math.e, math.sin, math.sqrt.',
    'Sử dụng thành thạo các hàm số học dựng sẵn: abs, sum, min, max, pow.',
    'So sánh sự khác biệt bản chất giữa round() (tạo số trong RAM) và định dạng chuỗi (tạo chuỗi str).',
    'Nắm vững 3 cách tính căn bậc hai trong Python: math.sqrt(N), N ** 0.5, và pow(N, 0.5).',
    'Hiểu kiến trúc không gian tên: vì sao abs() gọi được ngay còn math.sqrt() bắt buộc phải import.'
  ],

  intuition: {
    title: 'Dụng cụ trong túi áo và dụng cụ trong kho xưởng',
    metaphor: 'Khi bạn đi làm, những vật dụng thiết yếu như chiếc bút chì và chiếc thước kẻ luôn nằm sẵn trong túi áo (tương đương với các hàm dựng sẵn trong module builtins như abs, round, min, max) — bạn rút ra dùng ngay lập tức mà không cần xin phép ai. Nhưng những cỗ máy chuyên dụng phức tạp hơn như máy cắt laze hay máy tiện (tương đương module math, random) thì được cất trong nhà kho — muốn dùng, bạn phải làm thủ tục "nhập kho" (lệnh import) để đưa chúng vào bàn làm việc của mình. "Hễ nghe thấy từ module, hãy nghĩ ngay đến import!"',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BA CÁCH TÍNH CĂN BẬC HAI CỦA 144 TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:4px;">1. Dùng Module</div>
            <div style="font-size:0.85rem;color:var(--text-primary);"><code>math.sqrt(144)</code></div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Cần <code>import math</code></div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">2. Dùng Biểu thức</div>
            <div style="font-size:0.85rem;color:var(--text-primary);"><code>144 ** 0.5</code></div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Toán tử lũy thừa số mũ 1/2</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:4px;">3. Dùng Hàm Built-in</div>
            <div style="font-size:0.85rem;color:var(--text-primary);"><code>pow(144, 0.5)</code></div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Hàm dựng sẵn có sẵn</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Module Toán học math và Các Hàm Số học Dựng sẵn',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 21 / 38 – Trang 22 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Bên cạnh các kiểu đối tượng cốt lõi, Python còn cung cấp cả các hàm dựng sẵn lẫn các module trong thư viện chuẩn để xử lý số học. Chẳng hạn, các hàm dựng sẵn <code>pow</code> và <code>abs</code> lần lượt tính lũy thừa và giá trị tuyệt đối.</p>
        <p>Module dựng sẵn <code>math</code> chứa hầu hết các công cụ trong thư viện toán học của ngôn ngữ C:</p>
      `,
      codeExamples: [
        {
          title: 'Khảo sát các công cụ phổ biến trong module math và built-in',
          code: `>>> import math
>>> math.pi, math.e                    # Các hằng số thông dụng
(3.141592653589793, 2.718281828459045)
>>> math.sin(2 * math.pi / 180)        # Sin góc (đổi từ độ sang radian)
0.03489949670250097
>>> math.sqrt(144), math.sqrt(2)       # Căn bậc hai
(12.0, 1.4142135623730951)
>>> pow(2, 4), 2 ** 4, 2.0 ** 4.0      # Lũy thừa (số mũ)
(16, 16, 16.0)
>>> abs(-62.0), sum((1, 2, 3, 4))      # Giá trị tuyệt đối, tính tổng
(62.0, 10)
>>> min(3, 1, 2, 4), max(3, 1, 2, 4)   # Giá trị nhỏ nhất, lớn nhất
(1, 4)`,
          output: `(3.141592653589793, 2.718281828459045)
0.03489949670250097
(12.0, 1.4142135623730951)
(16, 16, 16.0)
(62.0, 10)
(1, 4)`,
          annotations: [
            { line: 2, text: 'Hằng số Pi và số e của Euler được lưu trữ ở độ chính xác kép (double precision).' },
            { line: 4, text: 'Hàm sin() nhận đối số là radian.' },
            { line: 8, text: 'Hàm sum() hoạt động trên một iterable các con số.' },
            { line: 10, text: 'min() và max() chấp nhận một bộ sưu tập hoặc các đối số riêng lẻ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phân biệt Làm tròn round() và Định dạng Chuỗi',
      content: `
        <p>Có nhiều cách để loại bỏ các chữ số thập phân của số thực float cho cả mục đích tính toán lẫn hiển thị:</p>
        <ul>
          <li><code>math.floor(N)</code>: Lấy giá trị sàn (số nguyên nhỏ hơn liền kề).</li>
          <li><code>math.trunc(N)</code> và <code>int(N)</code>: Cắt bỏ phần thập phân, kéo về phía số 0.</li>
          <li><code>round(N, digits)</code>: Làm tròn theo số chữ số thập phân chỉ định. Khi đối số thứ hai mang số âm (ví dụ: <code>round(2567, -3)</code>), nó làm tròn đến hàng nghìn thành <code>3000</code>.</li>
        </ul>
        <p><strong>Điểm khác biệt tinh tế:</strong> <code>round()</code> làm tròn và loại bỏ các chữ số thập phân nhưng <strong>vẫn tạo ra một con số trong bộ nhớ RAM</strong>; trong khi định dạng chuỗi (như <code>f'{x:.2f}'</code>) tạo ra một <strong>chuỗi ký tự (str)</strong> chứ không phải một con số.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh round() và định dạng chuỗi',
          code: `>>> math.floor(2.567), math.floor(-2.567)
(2, -3)
>>> math.trunc(2.567), math.trunc(-2.567)
(2, -2)
>>> int(2.567), int(-2.567)
(2, -2)
>>> round(2.567), round(2.567, 2), round(2567, -3)
(3, 2.57, 3000)
>>> (1 / 3.0), round(1 / 3.0, 2), f'{(1 / 3.0):.2f}'
(0.3333333333333333, 0.33, '0.33')`,
          output: `(2, -3)
(2, -2)
(2, -2)
(3, 2.57, 3000)
(0.3333333333333333, 0.33, '0.33')`,
          annotations: [
            { line: 8, text: 'round(1/3.0, 2) cho ra con số 0.33 (kiểu float).' },
            { line: 9, text: 'f"{(1/3.0):.2f}" cho ra chuỗi ký tự "0.33" (kiểu str).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ba Cách Tính Căn Bậc Hai & Không gian Tên builtins',
      content: `
        <p>Thật thú vị là có đến <strong>ba cách để tính căn bậc hai</strong> trong Python:</p>
        <ol>
          <li>Sử dụng hàm của module: <code>math.sqrt(144)</code></li>
          <li>Sử dụng biểu thức toán tử: <code>144 ** 0.5</code></li>
          <li>Sử dụng hàm dựng sẵn: <code>pow(144, 0.5)</code></li>
        </ol>
        <p>Cả ba cách này đều cho ra kết quả <code>12.0</code>.</p>

        <h4>Kiến trúc Không gian tên (Namespaces)</h4>
        <p>Các module thuộc thư viện chuẩn như <code>math</code> bắt buộc phải được <code>import</code>, nhưng các hàm dựng sẵn như <code>abs</code> và <code>round</code> luôn luôn sẵn sàng sử dụng mà không cần import. Điều này là bởi vì module là các thành phần bên ngoài, còn các hàm dựng sẵn lại cư ngụ trong một không gian tên ngầm định mà Python tự động tìm kiếm: module thư viện chuẩn <strong><code>builtins</code></strong>.</p>
        <p>Quy tắc ghi nhớ: <em>Hễ nghe thấy "module", hãy nghĩ ngay đến "import"</em>.</p>
      `,
      codeExamples: [
        {
          title: 'Ba cách tính căn bậc hai trong REPL',
          code: `>>> import math
>>> math.sqrt(144)     # Cách 1: Dùng module math
12.0
>>> 144 ** .5          # Cách 2: Dùng biểu thức lũy thừa
12.0
>>> pow(144, .5)       # Cách 3: Dùng hàm dựng sẵn
12.0`,
          output: `12.0
12.0
12.0`,
          annotations: [
            { line: 2, text: 'math.sqrt() là hàm chuyên dụng của module math.' },
            { line: 4, text: 'Toán tử ** với số mũ 0.5 là cách viết nhanh gọn không cần import.' },
            { line: 6, text: 'pow(N, 0.5) là hàm built-in luôn sẵn có trong builtins.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Làm tròn đến hàng chục, hàng trăm với round()',
        content: 'Đối số thứ hai của hàm <code>round(number, ndigits)</code> có thể nhận giá trị âm. Khi <code>ndigits &lt; 0</code>, phép làm tròn sẽ tác động lên các hàng số bên trái dấu chấm thập phân: <code>round(1234, -2)</code> sẽ cho ra <code>1200</code>; <code>round(2567, -3)</code> cho ra <code>3000</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tính khoảng cách Euclid giữa hai điểm',
      level: 'Dễ',
      problem: 'Cho hai điểm trong mặt phẳng có tọa độ (x1, y1) = (1, 2) và (x2, y2) = (4, 6). Hãy tính khoảng cách Euclid giữa hai điểm này theo công thức: d = √((x2 - x1)² + (y2 - y1)²) bằng 2 cách khác nhau.',
      hint: 'Cách 1 dùng math.sqrt, cách 2 dùng lũy thừa ** 0.5.',
      solutionCode: `import math

x1, y1 = 1, 2
x2, y2 = 4, 6

# Cách 1: Dùng math.sqrt
d1 = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

# Cách 2: Dùng lũy thừa ** 0.5
d2 = ((x2 - x1)**2 + (y2 - y1)**2) ** 0.5

print("Khoảng cách (math.sqrt):", d1)
print("Khoảng cách (** 0.5):", d2)`,
      solutionOutput: `Khoảng cách (math.sqrt): 5.0
Khoảng cách (** 0.5): 5.0`,
      explanation: '(4-1)² + (6-2)² = 3² + 4² = 9 + 16 = 25. Căn bậc hai của 25 bằng 5.0 theo cả hai phương thức.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây phân biệt ĐÚNG giữa hàm round(x, 2) và định dạng f"{x:.2f}"?',
      options: [
        'Cả hai đều tạo ra cùng một đối tượng số thực float trong bộ nhớ.',
        'round(x, 2) trả về một số (float), còn f"{x:.2f}" trả về một chuỗi ký tự (str).',
        'round(x, 2) chỉ hoạt động trên số nguyên, còn f-string hoạt động trên số thực.',
        'f-string chạy nhanh hơn round gấp 100 lần.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz nhấn mạnh: round làm tròn và tạo ra một con số trong bộ nhớ, trong khi định dạng chuỗi tạo ra một chuỗi ký tự (str) chứ không phải một con số.'
    },
    {
      question: 'Tại sao bạn có thể gọi hàm abs(-5) trực tiếp mà không cần lệnh import, trong khi math.sqrt(25) bắt buộc phải import math?',
      options: [
        'Vì abs là từ khóa của Python giống như if hay while.',
        'Vì abs cư ngụ trong không gian tên ngầm định builtins, còn math là module thư viện chuẩn bên ngoài.',
        'Vì hàm math.sqrt được viết bằng C, còn abs được viết bằng Python.',
        'Vì hàm abs không làm thay đổi giá trị của đối số.'
      ],
      correctIndex: 1,
      explanation: 'Các hàm dựng sẵn cư ngụ trong không gian tên ngầm định builtins mà Python tự động tìm kiếm, trong khi module math là thành phần bên ngoài cần được nạp bằng lệnh import.'
    }
  ],

  summary: [
    'Module math cung cấp các hằng số (pi, e) và các hàm toán học chuyên sâu như sin, cos, sqrt.',
    'Các hàm số học dựng sẵn như abs, sum, min, max, pow luôn sẵn có từ không gian tên builtins.',
    'Có 3 cách tính căn bậc hai: math.sqrt(N), N ** 0.5, và pow(N, 0.5).',
    'round() tạo ra số trong RAM, định dạng chuỗi tạo ra văn bản str để hiển thị.',
    'Hàm round() với số âm ở đối số thứ hai cho phép làm tròn đến hàng chục, hàng trăm, hàng nghìn.'
  ]
};