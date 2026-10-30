export default {
  id: 'lp-c5-00',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.0',
  title: 'Mở đầu: Khám phá chuyên sâu Đối tượng Số & Tổng quan công cụ',
  subtitle: 'Khởi đầu Phần II với đối tượng số: mô hình họ kiểu dữ liệu, vai trò nền tảng và 8 nhóm công cụ số học cốt lõi',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Xác định vai trò của Chương 5: khởi đầu hành trình khám phá chuyên sâu về các đối tượng và thao tác trong Python.',
    'Hiểu mô hình đối tượng số trong Python: không phải một kiểu đơn lẻ mà là một họ các kiểu có liên hệ mật thiết.',
    'Nắm vững danh mục 8 nhóm kiểu và công cụ số học cốt lõi từ thư viện chuẩn đến các phần mở rộng bên thứ ba.',
    'Nhận biết vị trí đặc biệt của kiểu Tập hợp (set): nằm ở giao lộ giữa bộ sưu tập đối tượng và lý thuyết toán học.'
  ],

  intuition: {
    title: 'Hộp đồ nghề của nhà toán học và kỹ sư',
    metaphor: 'Nếu coi lập trình là công việc kiến thiết, thì các con số chính là những viên gạch cơ bản nhất. Tuy nhiên, Python không chỉ đưa cho bạn một loại gạch duy nhất. Python cung cấp cả một hộp đồ nghề số học đa năng: từ những khối gạch thô mộc như số nguyên (int) và số thực (float) cho nhu cầu thường nhật; đến các công cụ đo lường chính xác tuyệt đối như số thập phân (Decimal) cho ngân hàng, phân số (Fraction) cho toán học thuần túy; thước đo hai chiều như số phức (complex) cho kỹ thuật điện; và các chiếc giỏ phân loại độc nhất như tập hợp (set). Hiểu rõ từng công cụ giúp bạn chọn đúng vật liệu cho từng bài toán.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HỆ THỐNG CÔNG CỤ SỐ HỌC CỦA PYTHON (CHƯƠNG 5)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">1. Số học Cốt lõi</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);">• Số nguyên (<code>int</code> vô hạn)<br>• Số thực float (<code>float</code> IEEE 754)<br>• Số phức (<code>complex</code> <code>3+4j</code>)</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">2. Số học Chuyên biệt</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);">• Thập phân cố định (<code>Decimal</code>)<br>• Phân số hữu tỉ (<code>Fraction</code>)<br>• Kiểu logic (<code>bool</code>: True / False)</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:6px;">3. Toán học Tập hợp</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);">• Tập hợp (<code>set</code>: phần tử duy nhất)<br>• Tập hợp đóng băng (<code>frozenset</code>)<br>• Phép toán lý thuyết tập hợp</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-secondary);margin-bottom:6px;">4. Module & Bên thứ ba</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);">• Dựng sẵn: <code>math</code>, <code>random</code>, <code>statistics</code><br>• Khoa học: NumPy, SciPy, pandas<br>• Thay thế linh hoạt cho MATLAB</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khởi đầu Phần II: Khám phá Chuyên sâu Đối tượng Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác (Objects and Operations) • Chương 5: Số và biểu thức • <strong>PDF Trang 1 / 38 – Trang 2 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Chương này chính thức mở màn cho chuyến khảo sát chuyên sâu của chúng ta về ngôn ngữ Python. Trong Chương 4 trước đó, chúng ta đã có một cái nhìn lướt nhanh qua bức tranh toàn cảnh về các kiểu đối tượng cốt lõi dựng sẵn. Bắt đầu từ chương này và vài chương tiếp theo trong Phần II, chúng ta sẽ quay trở lại tìm hiểu chúng với mục tiêu nắm bắt sâu hơn về các thao tác, sắc thái chi tiết và vai trò kỹ thuật của từng kiểu.</p>
        <p>Như Mark Lutz nhấn mạnh: trong Python, <strong>mọi dữ liệu đều tồn tại dưới dạng các đối tượng (objects)</strong>—có thể là các đối tượng dựng sẵn (built-in) do chính Python cung cấp trong nhân ngôn ngữ, hoặc các đối tượng do lập trình viên tự định nghĩa thông qua các lớp (classes) và module mở rộng từ C. Đối tượng là nền tảng của mọi chương trình Python bạn từng viết, và chúng ta sẽ khởi động hành trình chuyên sâu này với đối tượng quen thuộc nhất: <strong>các con số</strong>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bản chất Mô hình Đối tượng Số trong Python',
      content: `
        <p>Bên cạnh chuỗi ký tự (<code>str</code>), số là những đối tượng cơ bản nhất trong các tập lệnh Python. Tuy nhiên, trong mô hình đối tượng của Python, số không thực sự chỉ là một kiểu đối tượng đơn lẻ, mà là <strong>một nhóm các kiểu có liên hệ chặt chẽ với nhau</strong>.</p>
        <p>Python hỗ trợ cả các kiểu số thông thường mà mọi ngôn ngữ lập trình đều có (như số nguyên và số thực dấu phẩy động), lẫn các kiểu đặc thù và chuyên biệt hơn (như số phức, số nguyên với độ chính xác vô hạn, số thập phân <code>Decimal</code>, phân số hữu tỉ <code>Fraction</code> và tập hợp <code>set</code>).</p>
        <p>Về tổng thể, bạn có thể tin tưởng rằng trình thông dịch Python (interpreter) sẽ đánh giá các biểu thức số học theo đúng những quy tắc toán học tiêu chuẩn. Dẫu vậy, thế giới số học trong máy tính luôn ẩn chứa các chi tiết tinh tế về độ chính xác và biểu diễn bộ nhớ mà một lập trình viên chuyên nghiệp cần phải làm chủ.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Khảo sát 8 Nhóm Công cụ Số học Cốt lõi',
      content: `
        <p>Trước khi đi sâu vào cú pháp chi tiết, dưới đây là cái nhìn tổng quan ngắn gọn về 8 nhóm kiểu và công cụ số học được Mark Lutz liệt kê ở đầu Chương 5:</p>
        <ul>
          <li><strong>Số nguyên (integer) và số thực dấu phẩy động (floating-point number):</strong> Các kiểu cốt lõi quen thuộc. Số nguyên đại diện cho các số nguyên vẹn không giới hạn kích thước, còn số thực có thêm phần thập phân ánh xạ trực tiếp tới chuẩn phần cứng máy tính.</li>
          <li><strong>Số phức (complex number):</strong> Gồm cả phần thực và phần ảo, được viết mã với chữ cái <code>j</code> hoặc <code>J</code> ở cuối (theo quy ước kỹ thuật điện).</li>
          <li><strong>Số thập phân với độ chính xác cố định (fixed-precision decimal):</strong> Các con số có độ chính xác cố định về số chữ số thập phân, hiện thực hóa trong module thư viện chuẩn <code>decimal</code>.</li>
          <li><strong>Phân số hữu tỉ (rational fraction):</strong> Lưu giữ rõ ràng cả tử số và mẫu số, hiện thực hóa trong module <code>fractions</code> để triệt tiêu hoàn toàn sai số làm tròn của số thực dấu phẩy động.</li>
          <li><strong>Tập hợp (set):</strong> Các bộ sưu tập chứa các phần tử duy nhất và không có thứ tự, hỗ trợ các phép toán lý thuyết tập hợp (giao, hợp, hiệu).</li>
          <li><strong>Kiểu logic (Boolean):</strong> Hai giá trị <code>True</code> và <code>False</code> thực chất là các phiên bản tùy biến của số nguyên <code>1</code> và <code>0</code> với cách tự in ấn thân thiện hơn.</li>
          <li><strong>Các hàm và module dựng sẵn (built-in functions and modules):</strong> Các hàm luôn có sẵn như <code>abs</code>, <code>round</code>, <code>pow</code>, cùng các module tiêu chuẩn như <code>math</code>, <code>cmath</code>, <code>random</code> và <code>statistics</code>.</li>
          <li><strong>Các phần mở rộng của bên thứ ba (third-party extensions):</strong> Các thư viện khoa học mã nguồn mở mạnh mẽ như NumPy, SciPy, pandas... đáp ứng nhu cầu tính toán số học ma trận và phân tích dữ liệu quy mô lớn.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khảo sát nhanh một số công cụ số học cơ bản trong REPL',
          code: `>>> x = 42          # Số nguyên int
>>> y = 3.14        # Số thực float
>>> z = 2 + 3j      # Số phức complex
>>> type(x), type(y), type(z)
(<class 'int'>, <class 'float'>, <class 'complex'>)
>>> abs(-15), round(3.567, 2)
(15, 3.57)`,
          output: `(<class 'int'>, <class 'float'>, <class 'complex'>)
(15, 3.57)`,
          annotations: [
            { line: 4, text: 'Ba kiểu số cốt lõi dựng sẵn trong nhân Python: int, float, complex.' },
            { line: 6, text: 'Các hàm số học dựng sẵn như abs, round luôn có sẵn trong không gian tên builtins.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Vị trí đặc biệt của kiểu Tập hợp (set) trong giáo trình',
        content: 'Tác giả Mark Lutz xếp kiểu <strong>Tập hợp (set)</strong> vào chương này thay vì chương về cấu trúc dữ liệu chuỗi/danh sách. Lý do là vì mặc dù tập hợp là một bộ sưu tập đối tượng có thể lặp qua (iterable), nhưng các thao tác cốt lõi của nó (hợp, giao, hiệu, tập con) lại mang bản chất toán học tập hợp thuần túy.'
      }
    ]
  },

  exercises: [
    {
      title: 'Phân loại các công cụ số học theo nguồn gốc',
      level: 'Dễ',
      problem: 'Hãy cho biết trong 3 công cụ sau: <code>math.sqrt</code>, <code>Decimal</code>, và <code>abs</code>, công cụ nào là hàm dựng sẵn có thể gọi trực tiếp, công cụ nào cần phải <code>import</code> từ thư viện chuẩn?',
      hint: 'Hàm dựng sẵn cư ngụ trong module builtins, còn module chuyên biệt cần câu lệnh import.',
      solutionCode: `# abs là hàm dựng sẵn (built-in), không cần import
gia_tri_tuyet_doi = abs(-99)
print("abs(-99) =", gia_tri_tuyet_doi)

# math.sqrt và Decimal nằm trong thư viện chuẩn, bắt buộc phải import
import math
from decimal import Decimal

can_bac_hai = math.sqrt(100)
so_thap_phan = Decimal('0.1')
print("math.sqrt(100) =", can_bac_hai)
print("Decimal('0.1') =", so_thap_phan)`,
      solutionOutput: `abs(-99) = 99
math.sqrt(100) = 10.0
Decimal('0.1') = 0.1`,
      explanation: '<code>abs()</code> là hàm dựng sẵn luôn có mặt trong không gian tên toàn cục. Trong khi đó, <code>math</code> và <code>decimal</code> là các module thuộc thư viện chuẩn của Python, cần được nạp bằng từ khóa <code>import</code> trước khi sử dụng.'
    }
  ],

  quiz: [
    {
      question: 'Theo Mark Lutz, mô hình đối tượng số trong Python có đặc điểm cốt lõi nào?',
      options: [
        'Chỉ gồm một kiểu số duy nhất là số thực dấu phẩy động 64-bit.',
        'Là một họ gồm nhiều kiểu đối tượng có liên hệ chặt chẽ với nhau, từ cơ bản đến chuyên biệt.',
        'Mọi con số đều được lưu trữ trực tiếp dưới dạng chuỗi nhị phân không có lớp đối tượng.',
        'Chỉ hỗ trợ số nguyên 32-bit và không thể mở rộng độ chính xác.'
      ],
      correctIndex: 1,
      explanation: 'Trong mô hình Python, số không chỉ là một kiểu đơn lẻ mà là một nhóm các kiểu có liên hệ mật thiết: int, float, complex, decimal, fraction, set và bool.'
    },
    {
      question: 'Tại sao kiểu Tập hợp (set) lại được giới thiệu và nghiên cứu trong Chương 5 về Số học?',
      options: [
        'Vì tập hợp chỉ có thể chứa các con số nguyên, không chứa được chuỗi.',
        'Vì tập hợp hỗ trợ các phép toán tương ứng với lý thuyết tập hợp trong toán học.',
        'Vì tập hợp là một kiểu dãy tuần tự có thứ tự giống như danh sách list.',
        'Vì tập hợp là tên gọi khác của kiểu số phức trong Python.'
      ],
      correctIndex: 1,
      explanation: 'Tập hợp đứng ở ranh giới giữa các bộ sưu tập và toán học, nhưng nghiêng đủ nhiều về phía lý thuyết tập hợp toán học để được xếp vào chương về số và biểu thức.'
    }
  ],

  summary: [
    'Chương 5 mở màn Phần II của cuốn sách: khảo sát chuyên sâu về các đối tượng và thao tác trong Python.',
    'Đối tượng là nền tảng của mọi chương trình Python; dữ liệu luôn tồn tại dưới dạng đối tượng trong bộ nhớ.',
    'Số trong Python là một họ đối tượng đa dạng: int, float, complex, Decimal, Fraction, set và bool.',
    'Python cung cấp hệ sinh thái công cụ số học phong phú từ hàm dựng sẵn, thư viện chuẩn đến các gói khoa học bên thứ ba.',
    'Hiểu rõ bản chất từng kiểu số giúp lập trình viên lựa chọn đúng công cụ, tối ưu hóa độ chính xác và hiệu năng.'
  ]
};