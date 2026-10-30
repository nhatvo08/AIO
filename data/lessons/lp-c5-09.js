export default {
  id: 'lp-c5-09',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.9',
  title: 'Số phức (Complex Numbers) & Module cmath',
  subtitle: 'Kiểu số phức cốt lõi: phần thực, phần ảo j, thuộc tính real/imag và thư viện toán chuyên dụng cmath',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cú pháp biểu diễn số phức trong Python với phần thực và phần ảo hậu tố j hoặc J.',
    'Hiểu cấu trúc biểu diễn nội bộ: số phức được lưu dưới dạng một cặp số thực dấu phẩy động (float).',
    'Thực hành các phép toán số phức (nhân hai đơn vị ảo 1j * 1J = -1) và trích xuất thuộc tính .real, .imag.',
    'Biết cách sử dụng module chuyên dụng cmath thay cho math khi làm việc với số phức.'
  ],

  intuition: {
    title: 'Mặt phẳng tọa độ hai chiều của toán học',
    metaphor: 'Các số thông thường (như 3 hay 3.14) chỉ sống trên một đường thẳng một chiều: bạn chỉ có thể đi tới hoặc đi lui. Nhưng trong kỹ thuật điện tử (mô phỏng sóng xoay chiều AC), quang học và vật lý lượng tử, các tín hiệu vừa có độ lớn (biên độ) vừa có góc quay (pha). Số phức giống như một điểm tọa độ hai chiều trên mặt phẳng (Argand): trục hoành là phần thực (real), trục tung là phần ảo (imag). Thay vì phải viết một lớp riêng để theo dõi 2 tọa độ, Python hỗ trợ số phức như một kiểu dữ liệu hạng nhất tích hợp sẵn ngay trong nhân ngôn ngữ.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CẤU TRÚC ĐỐI TƯỢNG SỐ PHỨC TRONG PYTHON: 2 + 3j</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:20px;flex-wrap:wrap;">
          <div style="padding:12px 18px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Phần Thực (Real)</div>
            <div style="font-size:1.2rem;font-weight:700;color:var(--accent-primary);">z.real = 2.0</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Kiểu float</div>
          </div>
          <div style="font-size:1.5rem;color:var(--text-muted);">+</div>
          <div style="padding:12px 18px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Phần Ảo (Imaginary)</div>
            <div style="font-size:1.2rem;font-weight:700;color:var(--success);">z.imag = 3.0</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Gắn hậu tố <code>j</code></div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm và Cú pháp Số phức trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 16 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Mặc dù ít được sử dụng phổ biến hơn các kiểu dữ liệu cơ bản, số phức vẫn là một kiểu đối tượng cốt lõi riêng biệt trong Python. Chúng thường được dùng trong các ứng dụng kỹ thuật và khoa học.</p>
        <p>Số phức được biểu diễn dưới dạng <strong>hai số thực dấu phẩy động—phần thực và phần ảo</strong>—và bạn viết mã cho chúng bằng cách thêm hậu tố <code>j</code> hoặc <code>J</code> vào phần ảo (tuân theo quy ước kỹ thuật điện). Ví dụ: số phức có phần thực là <code>2</code> và phần ảo là <code>-3</code> được viết là <code>2 + -3j</code> hoặc <code>2 - 3j</code>.</p>
        <p>Về mặt nội bộ, số phức được hiện thực hóa dưới dạng các cặp số thực float, nhưng mọi thao tác số học đều sẽ tự động thực hiện các quy tắc đại số số phức khi được áp dụng lên chúng.</p>
      `,
      codeExamples: [
        {
          title: 'Các phép toán số phức cơ bản trong REPL',
          code: `>>> 1j * 1J          # Đơn vị ảo nhân đơn vị ảo: j^2 = -1
(-1+0j)
>>> 2 + 1j * 3       # Phép nhân * ưu tiên hơn +
(2+3j)
>>> (2 + 1j) * 3     # Nhân số phức với một số thực
(6+3j)`,
          output: `(-1+0j)
(2+3j)
(6+3j)`,
          annotations: [
            { line: 1, text: 'Phép nhân hai đơn vị ảo j * j cho ra phần thực -1 và phần ảo 0j.' },
            { line: 3, text: '1j * 3 = 3j, sau đó cộng với phần thực 2 cho ra đối tượng (2+3j).' },
            { line: 5, text: 'Phân phối phép nhân: 2*3 = 6 và 1j*3 = 3j.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Trích xuất Thuộc tính và Module cmath',
      content: `
        <p>Số phức trong Python cho phép chúng ta trích xuất các thành phần của chúng dưới dạng thuộc tính thông qua hai thuộc tính chỉ đọc là <strong><code>.real</code></strong> và <strong><code>.imag</code></strong> (cả hai đều trả về giá trị kiểu <code>float</code>):</p>
        <p>Số phức cũng có thể được tạo bằng hàm khởi tạo dựng sẵn <code>complex(real, imag)</code>. Hơn nữa, để thực hiện các phép toán cao cấp (như căn bậc hai, sin, cos của số phức), Python cung cấp module chuẩn <strong><code>cmath</code></strong> (tương đương với module <code>math</code> dành riêng cho số phức):</p>
      `,
      codeExamples: [
        {
          title: 'Thuộc tính .real, .imag và hàm khởi tạo complex()',
          code: `>>> z = 3 + 4j
>>> z.real, z.imag              # Trích xuất phần thực và phần ảo
(3.0, 4.0)
>>> z.conjugate()               # Số phức liên hợp (3 - 4j)
(3-4j)
>>> complex(5, -2)              # Tạo bằng hàm dựng sẵn complex()
(5-2j)
>>> import cmath
>>> cmath.sqrt(-1)              # Căn bậc hai của -1 bằng cmath
1j`,
          output: `(3.0, 4.0)
(3-4j)
(5-2j)
1j`,
          annotations: [
            { line: 2, text: 'Các thuộc tính .real và .imag luôn trả về số thực float.' },
            { line: 4, text: 'Phương thức conjugate() đổi dấu của phần ảo.' },
            { line: 8, text: 'Module math.sqrt(-1) sẽ báo ValueError, nhưng cmath.sqrt(-1) trả về chính xác 1j.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Phân biệt module math và cmath khi tính toán',
        content: 'Hàm <code>math.sqrt(-4)</code> sẽ làm chương trình dừng lại với lỗi <code>ValueError: math domain error</code> vì module <code>math</code> chỉ làm việc trên tập số thực. Nếu bài toán của bạn chấp nhận kết quả số phức, hãy nhập từ module <code>cmath</code>: <code>cmath.sqrt(-4)</code> sẽ trả về <code>2j</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tính mô-đun của một số phức',
      level: 'Dễ',
      problem: 'Cho số phức <code>z = 3 + 4j</code>. Hãy tính mô-đun (độ lớn tuyệt đối |z| = √(real² + imag²)) của <code>z</code> bằng hàm dựng sẵn <code>abs()</code>.',
      hint: 'Hàm abs() khi áp dụng lên số phức sẽ tự động tính độ lớn hình học của nó.',
      solutionCode: `z = 3 + 4j
mo_dun = abs(z)

print("Số phức:", z)
print("Mô-đun |z|:", mo_dun)`,
      solutionOutput: `Số phức: (3+4j)
Mô-đun |z|: 5.0`,
      explanation: 'Hàm <code>abs(z)</code> trên số phức tính căn bậc hai của tổng bình phương phần thực và phần ảo: √(3² + 4²) = √25 = 5.0.'
    }
  ],

  quiz: [
    {
      question: 'Trong Python, biểu thức nào sau đây dùng để biểu diễn số phức có phần thực là 0 và phần ảo là 5?',
      options: [
        '5i',
        '5j hoặc 5J',
        'complex(0, 5j)',
        '0 + 5*I'
      ],
      correctIndex: 1,
      explanation: 'Phần ảo của số phức được viết với chữ cái j hoặc J ở cuối; do đó 5j hoặc 5J biểu diễn số phức thuần ảo 0+5j.'
    },
    {
      question: 'Để tính căn bậc hai của một số âm (cho ra kết quả số phức), bạn cần sử dụng module nào trong thư viện chuẩn?',
      options: [
        'Module math.',
        'Module cmath.',
        'Module complexmath.',
        'Module numbers.'
      ],
      correctIndex: 1,
      explanation: 'Module cmath (Complex Math) là thư viện toán học chuyên biệt dành cho số phức trong thư viện chuẩn của Python.'
    }
  ],

  summary: [
    'Số phức (complex number) là kiểu đối tượng cốt lõi dựng sẵn trong Python.',
    'Số phức gồm phần thực và phần ảo, phần ảo gắn hậu tố j hoặc J (ví dụ: 3 + 4j).',
    'Các thuộc tính z.real và z.imag cho phép trích xuất các thành phần dưới dạng float.',
    'Hàm abs(z) tính độ lớn mô-đun của số phức (√(real² + imag²)).',
    'Module cmath cung cấp các hàm toán học chuyên dụng cho số phức (như cmath.sqrt(-1) ra 1j).'
  ]
};