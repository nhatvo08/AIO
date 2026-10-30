export default {
  id: 'p0-02',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.2',
  title: 'Python là gì và chương trình Python chạy ra sao',
  subtitle: 'Đặc tả ngôn ngữ vs CPython, quy trình dịch Bytecode, PVM, kiểu động chặt chẽ và môi trường venv',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt rõ ràng giữa đặc tả ngôn ngữ Python (Language Specification) và các bản cài đặt (CPython, PyPy, Jython).',
    'Gỡ bỏ hiểu lầm kinh điển "Python chỉ là ngôn ngữ thông dịch": hiểu quy trình biên dịch thành Bytecode và cách Máy ảo Python (PVM) thực thi.',
    'Nắm vững bản chất kiểu động nhưng chặt (Dynamically & Strongly Typed) trong cách Python quản lý kiểu dữ liệu.',
    'Phân biệt khi nào nên dùng chế độ tương tác (REPL) để khám phá và khi nào dùng file kịch bản (.py).',
    'Hiểu lý do sống còn vì sao mọi dự án Python chuyên nghiệp đều phải dùng môi trường ảo (venv) và pip.'
  ],

  intuition: {
    title: 'Bản thiết kế kiến trúc và Đội thợ xây dựng',
    metaphor: 'Hãy tưởng tượng "Ngôn ngữ Python" giống như một bản thiết kế kiến trúc chi tiết của một ngôi nhà: nó quy định tường xây thế nào, cửa đặt ở đâu, điện đi ra sao. Còn "CPython" chính là một đội thợ xây cụ thể (được viết bằng ngôn ngữ C) chuyên đọc bản thiết kế đó để xây nên ngôi nhà thực tế. Bạn có thể thuê một đội thợ khác tên là PyPy (xây cực nhanh nhờ động cơ JIT) hay Jython (xây nhà trên nền móng Java), nhưng bản thiết kế ngôi nhà vẫn là một. Khi chạy một chương trình, CPython không đọc từng chữ một cách thủ công mà trước hết dịch bản vẽ đó thành một bảng mã thi công tốc độ cao gọi là Bytecode, rồi đưa cho cỗ máy ảo PVM thi công từng lệnh.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:10px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">QUY TRÌNH THỰC THI MÃ NGUỒN CỦA CPYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;text-align:center;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-size:0.75rem;color:var(--text-muted);">Bước 1: Mã nguồn</div>
            <div style="font-weight:700;color:var(--text-primary);margin-top:4px;">script.py</div>
            <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:2px;">Văn bản con người đọc</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-size:0.75rem;color:var(--text-muted);">Bước 2: CPython Compiler</div>
            <div style="font-weight:700;color:var(--py-gold);margin-top:4px;">__pycache__/*.pyc</div>
            <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:2px;">Bytecode trung gian</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-size:0.75rem;color:var(--text-muted);">Bước 3: Máy ảo Python (PVM)</div>
            <div style="font-weight:700;color:var(--success);margin-top:4px;">CPU Execution</div>
            <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:2px;">Chạy lệnh máy thực tế</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Ngôn ngữ (Đặc tả) khác gì Bản cài đặt (CPython)?',
      badge: 'Khái niệm Cốt lõi',
      content: `
        <p>Khi ai đó nói <em>"Python làm việc này chậm"</em> hay <em>"Python có tính năng X"</em>, họ thường vô tình lẫn lộn giữa hai khái niệm:</p>
        <ul>
          <li><strong>Đặc tả ngôn ngữ Python (Language Specification):</strong> Là cuốn sách quy định ngữ pháp, từ khóa, cú pháp và hành vi chuẩn của ngôn ngữ do tổ chức phi lợi nhuận <em>Python Software Foundation (PSF)</em> và cha đẻ Guido van Rossum dẫn dắt qua các tài liệu PEP (Python Enhancement Proposals).</li>
          <li><strong>Bản cài đặt (Implementation):</strong> Là phần mềm cụ thể thực thi đặc tả đó trên máy tính:
            <ul>
              <li><strong>CPython:</strong> Bản cài đặt tham chiếu chính thức, được viết bằng ngôn ngữ <strong>C</strong>. Khi bạn tải Python từ trang chủ <code>python.org</code>, bạn đang dùng CPython.</li>
              <li><strong>PyPy:</strong> Bản cài đặt sử dụng trình biên dịch động (Just-In-Time - JIT), có thể chạy nhanh gấp 4–7 lần CPython với các phép tính nặng.</li>
              <li><strong>Jython / IronPython:</strong> Bản cài đặt chạy trên máy ảo Java (JVM) hoặc nền tảng .NET của Microsoft.</li>
            </ul>
          </li>
        </ul>
        <p>Trong toàn bộ tài liệu này, khi ta nói về chi tiết bộ nhớ như <code>id()</code>, bảng mã nhúng hay bộ thu gom rác, đó là <strong>chi tiết cài đặt của CPython</strong>.</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra thông tin bản cài đặt Python đang chạy',
          code: `import platform
import sys

print("Phiên bản Python:", platform.python_version())
print("Bản cài đặt (Implementation):", platform.python_implementation())
print("Trình biên dịch C dùng để build CPython:", platform.python_compiler())
print("Kiến trúc phần cứng:", platform.architecture()[0])
print("Đường dẫn file thực thi:", sys.executable)`,
          output: `Phiên bản Python: 3.14.8
Bản cài đặt (Implementation): CPython
Trình biên dịch C dùng để build CPython: MSC v.1942 64 bit (AMD64)
Kiến trúc phần cứng: 64bit
Đường dẫn file thực thi: C:\\Python314\\python.exe`,
          annotations: [
            { line: 4, text: 'Hàm platform.python_implementation() xác nhận rõ ta đang chạy CPython.' },
            { line: 5, text: 'Bản CPython này được biên dịch bằng Microsoft C/C++ Compiler (MSC).' },
            { line: 7, text: 'sys.executable cho biết vị trí file python.exe thực tế trên ổ đĩa.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Gỡ bỏ hiểu lầm — Python có biên dịch không? Bytecode và PVM',
      badge: 'Cơ chế Thực thi',
      content: `
        <p>Nhiều sách báo viết rằng: <em>"C là ngôn ngữ biên dịch, còn Python là ngôn ngữ thông dịch thuần túy"</em>. <strong>Đây là một hiểu lầm tai hại!</strong></p>
        <p>Python thực chất là một ngôn ngữ <strong>vừa biên dịch, vừa thông dịch</strong>:</p>
        <ol>
          <li><strong>Giai đoạn Biên dịch (Compilation):</strong> Khi bạn chạy file <code>app.py</code>, trình biên dịch của CPython lập tức dịch toàn bộ mã nguồn chữ thành các mã lệnh bytecode nhị phân siêu gọn nhẹ. Nếu mã nguồn được nhập khẩu qua <code>import</code>, CPython sẽ lưu lại bytecode này vào thư mục <code>__pycache__</code> dưới đuôi <code>.pyc</code> để lần sau mở lên chạy ngay mà không tốn công dịch lại.</li>
          <li><strong>Giai đoạn Máy ảo (Virtual Machine Execution):</strong> <em>Máy ảo Python (Python Virtual Machine - PVM)</em> là một phần mềm giả lập CPU. PVM đọc từng chỉ thị bytecode (như <code>LOAD_CONST</code>, <code>BINARY_OP</code>, <code>STORE_NAME</code>) và ánh xạ chúng thành các lệnh mã máy x86_64 hay ARM64 thực tế.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Dùng module dis để "nhìn tận mắt" bytecode bên trong CPython',
          code: `import dis

def tinh_tong(a, b):
    return a + b

# Hiển thị các lệnh bytecode mà CPython tạo ra cho hàm này
print("=== BYTECODE CỦA HÀM tinh_tong ===")
dis.dis(tinh_tong)`,
          output: `=== BYTECODE CỦA HÀM tinh_tong ===
  3           0 RESUME                   0

  4           2 LOAD_FAST                0 (a)
              4 LOAD_FAST                1 (b)
              6 BINARY_OP                0 (+)
             10 RETURN_VALUE`,
          annotations: [
            { line: 1, text: 'Module chuẩn dis (Disassembler) dùng để phân rã mã bytecode của CPython.' },
            { line: 3, text: 'Định nghĩa hàm Python tinh_tong(a, b).' },
            { line: 4, text: 'Lệnh return a + b dịch thành các lệnh bytecode: LOAD_FAST (nạp a, b lên ngăn xếp), BINARY_OP (+) và RETURN_VALUE.' },
            { line: 8, text: 'Gọi dis.dis() để in bảng phân tích chỉ thị bytecode của hàm ra console.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Kiểu Động nhưng Chặt (Dynamically & Strongly Typed)',
      badge: 'Hệ thống Kiểu',
      content: `
        <p>Để hiểu hành vi của Python, bạn phải nắm rõ hai trục phân loại ngôn ngữ lập trình:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th>Kiểu Tĩnh (Statically Typed)</th>
                <th>Kiểu Động (Dynamically Typed) - <em>Python</em></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Thời điểm kiểm tra kiểu</strong></td>
                <td>Lúc biên dịch (C, C++, Java, Rust). Biến phải khai báo kiểu: <code>int x = 5;</code></td>
                <td>Lúc chạy chương trình (Runtime). Tên biến chỉ là nhãn dán, không có kiểu cố định.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-responsive" style="margin-top:12px;">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th>Kiểu Lỏng lẻo (Weakly Typed)</th>
                <th>Kiểu Chặt chẽ (Strongly Typed) - <em>Python</em></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tự động ép kiểu ngầm</strong></td>
                <td>Tự động đoán và ép kiểu bừa bãi. Ví dụ JS: <code>"5" + 2 = "52"</code>, <code>"5" - 2 = 3</code>.</td>
                <td><strong>Không bao giờ ép kiểu ngầm vô căn cứ</strong>. Phép tính không hợp lý sẽ ném lỗi <code>TypeError</code> ngay!</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Vì Python là <strong>Kiểu Động nhưng Chặt</strong>, bạn được tự do đổi kiểu của đối tượng mà một biến trỏ tới, nhưng Python bảo vệ bạn tuyệt đối không để xảy ra các phép tính quái gở ngoài ý muốn.</p>
      `,
      codeExamples: [
        {
          title: 'Chứng minh tính động và tính chặt chẽ của Python',
          code: `# 1. Tính ĐỘNG (Dynamic): Tên x có thể trỏ vào số, rồi chuỗi, rồi danh sách
x = 100
print("Ban đầu x là:", type(x))

x = "Trở thành chuỗi chữ"
print("Sau đó x trỏ vào:", type(x))

# 2. Tính CHẶT CHẼ (Strong): Python từ chối cộng chuỗi với số
try:
    ket_qua = "Tuổi của bạn là: " + 20
except TypeError as err:
    print("\\nBị chặn bởi Strong Typing:")
    print("Thông điệp lỗi:", err)

# Cách đúng trong Python: Phải ép kiểu tường minh (Explicit)
ket_qua = "Tuổi của bạn là: " + str(20)
print("\\nHợp lệ khi ép kiểu rõ ràng:", ket_qua)`,
          output: `Ban đầu x là: <class 'int'>
Sau đó x trỏ vào: <class 'str'>

Bị chặn bởi Strong Typing:
Thông điệp lỗi: can only concatenate str (not "int") to str

Hợp lệ khi ép kiểu rõ ràng: Tuổi của bạn là: 20`,
          annotations: [
            { line: 2, text: 'Biến x trỏ vào đối tượng int 100.' },
            { line: 5, text: 'Gán lại x trỏ vào đối tượng str hoàn toàn hợp lệ trong ngôn ngữ kiểu động.' },
            { line: 11, text: 'Python từ chối tự động biến 20 thành "20", mà bắt lập trình viên phải viết rõ ý định bằng str(20).' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: REPL vs File Script & Sự cần thiết của Môi trường ảo (venv)',
      badge: 'Thực hành Chuẩn mực',
      content: `
        <p>Trong quá trình làm việc với Python, bạn sẽ dùng hai chế độ:</p>
        <ul>
          <li><strong>REPL (Read-Eval-Print Loop):</strong> Bật lên bằng lệnh <code>python</code> trên terminal. Nó đọc một lệnh bạn gõ, thực thi ngay, in kết quả ra màn hình bằng <code>repr()</code> rồi chờ lệnh tiếp. REPL là phòng thí nghiệm thần kỳ để thử nghiệm nhanh các hàm và kiểm chứng nghi vấn.</li>
          <li><strong>File kịch bản (.py):</strong> Dùng khi viết phần mềm hoàn chỉnh, chạy lệnh tuần tự từ trên xuống dưới một cách tự động.</li>
        </ul>
        <h4>Vì sao Môi trường ảo (Virtual Environment - venv) là bắt buộc?</h4>
        <p>Mặc định, khi bạn dùng <code>pip install pandas</code>, thư viện được cài vào thư mục toàn cục của máy. Nếu Dự án A cần <code>pandas 1.5</code> còn Dự án B cần <code>pandas 2.2</code>, cài đè lên nhau sẽ phá hỏng cả hai dự án!</p>
        <p><strong>Môi trường ảo (venv)</strong> tạo ra một thư mục độc lập (thường đặt tên là <code>.venv</code>) chứa riêng một bản sao trình thực thi Python và thư mục <code>site-packages</code> riêng. Dự án nào chỉ dùng thư viện của dự án đó, xóa đi không ảnh hưởng gì tới máy tính.</p>
      `,
      codeExamples: [
        {
          title: '3 Lệnh sống còn khi dùng venv và pip trong Terminal',
          code: `# 1. Tạo môi trường ảo tên .venv trong thư mục dự án
# python -m venv .venv

# 2. Kích hoạt môi trường ảo:
# Trên Windows:  .venv\\Scripts\\activate
# Trên macOS/Linux: source .venv/bin/activate

# 3. Sau khi kích hoạt (dòng lệnh có tiền tố (.venv)), cài đặt thư viện:
# pip install requests
# pip list

# 4. Khi làm xong, thoát môi trường ảo:
# deactivate`,
          output: `(Đoạn lệnh chạy trên Terminal máy tính, giúp cách ly 100% môi trường dự án)`,
          annotations: [
            { line: 2, text: 'Cờ -m gọi module venv có sẵn trong thư viện chuẩn Python.' },
            { line: 5, text: 'Lệnh kích hoạt thêm thư mục .venv vào đầu biến môi trường PATH.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Hiểu lầm thư mục __pycache__ là virus hoặc rác thừa',
        content: 'Khi thấy thư mục `__pycache__` sinh ra cạnh file code của mình, đừng hoảng hốt và không cần xóa nó đi. Đó là nơi CPython lưu trữ các file Bytecode `.pyc` đã được biên dịch sẵn nhằm tăng tốc khởi động chương trình cho các lần chạy sau.'
      },
      {
        title: 'Cài đặt thư viện toàn cục bằng lệnh sudo pip hoặc chạy pip trực tiếp ngoài venv',
        content: 'Tuyệt đối không bao giờ dùng quyền Admin/sudo để cài package toàn cục vào hệ điều hành. Hãy luôn tạo một venv riêng cho từng bài học hoặc dự án.'
      }
    ],
    tips: [
      {
        title: 'Triết lý "Rõ ràng hơn mập mờ" (Explicit is better than implicit)',
        content: 'Đây là câu số 2 trong bản tuyên ngôn nổi tiếng The Zen of Python (xem bằng lệnh `import this`). Tính chất Strong Typing của Python tuân thủ triệt để nguyên tắc này: thà báo lỗi để lập trình viên sửa cho chuẩn, còn hơn ngấm ngầm ép kiểu lung tung gây ra lỗi bảo mật tiềm ẩn.'
      }
    ],
    deepDive: {
      title: 'Global Interpreter Lock (GIL) trong CPython là gì?',
      content: `
        <p>Trong CPython, có một cơ chế bảo vệ bộ nhớ nổi tiếng gọi là <strong>GIL (Global Interpreter Lock)</strong>. Đây là một chiếc khóa đồng bộ ngăn không cho nhiều luồng (threads) thực thi bytecode Python cùng một lúc trên nhiều nhân CPU vật lý.</p>
        <p>Mục đích của GIL là để quản lý bộ đếm tham chiếu (reference counting) của CPython một cách an toàn mà không bị tranh chấp dữ liệu (race condition). Từ Python 3.13 và 3.14, cộng đồng Python đang thử nghiệm chế độ <em>Free-threaded Python</em> (tắt hoàn toàn GIL) để tận dụng đa nhân tối đa.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Phân tích kiểu động bằng type() qua nhiều lần gán',
      problem: 'Khai báo một biến `val` ban đầu có giá trị là số nguyên `42`. Sau đó lần lượt gán lại `val` thành số thực `3.14`, chuỗi `"CPython"`, và danh sách `[1, 2]`. Sau mỗi lần gán, hãy in ra giá trị và kiểu dữ liệu hiện tại của `val`.',
      hint: 'Dùng hàm type(val) kết hợp với print().',
      solutionCode: `val = 42
print("1. Giá trị:", val, "| Kiểu:", type(val))

val = 3.14
print("2. Giá trị:", val, "| Kiểu:", type(val))

val = "CPython"
print("3. Giá trị:", val, "| Kiểu:", type(val))

val = [1, 2]
print("4. Giá trị:", val, "| Kiểu:", type(val))`,
      solutionOutput: `1. Giá trị: 42 | Kiểu: <class 'int'>
2. Giá trị: 3.14 | Kiểu: <class 'float'>
3. Giá trị: "CPython" | Kiểu: <class 'str'>
4. Giá trị: [1, 2] | Kiểu: <class 'list'>`,
      explanation: 'Trong Python, kiểu dữ liệu gắn với chính đối tượng trong bộ nhớ, không gắn với tên biến. Biến val chỉ đơn thuần chuyển mũi tên trỏ từ đối tượng này sang đối tượng khác.',
      annotations: [
        { line: 1, text: 'val trỏ vào đối tượng int 42.' },
        { line: 4, text: 'val đổi sang trỏ vào đối tượng float 3.14.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Khám phá Zen of Python và phiên bản hệ thống',
      problem: 'Hãy viết mã Python nhập khẩu module `sys` và kiểm tra xem phiên bản Python hiện tại có phải là phiên bản 3.10 trở lên hay không bằng cách dùng thuộc tính `sys.version_info`. In ra thông báo chúc mừng nếu đạt yêu cầu.',
      hint: 'sys.version_info trả về tuple có cấu trúc (major, minor, micro).',
      solutionCode: `import sys

major = sys.version_info.major
minor = sys.version_info.minor
micro = sys.version_info.micro

print(f"Phiên bản đang chạy: {major}.{minor}.{micro}")

if sys.version_info >= (3, 10):
    print("Thỏa mãn: Môi trường hiện đại, sẵn sàng học Python chuyên sâu!")
else:
    print("Cảnh báo: Bạn đang dùng phiên bản Python quá cũ.")`,
      solutionOutput: `Phiên bản đang chạy: 3.14.8
Thỏa mãn: Môi trường hiện đại, sẵn sàng học Python chuyên sâu!`,
      explanation: 'Python cho phép so sánh tuple theo thứ tự từ trái sang phải. sys.version_info >= (3, 10) là cách chuẩn mực nhất để kiểm tra điều kiện tương thích phiên bản.',
      annotations: [
        { line: 1, text: 'Module sys chứa các biến và hàm tương tác chặt chẽ với trình thông dịch CPython.' },
        { line: 9, text: 'So sánh trực tiếp tuple phiên bản rất an toàn và gọn gàng.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG khi nói về quy trình thực thi mã nguồn của CPython?',
      options: [
        'CPython không biên dịch gì cả, nó đọc trực tiếp từng dòng chữ văn bản .py và chuyển ngay sang lệnh vi xử lý.',
        'CPython biên dịch mã nguồn .py thành Bytecode trung gian, sau đó Máy ảo Python (PVM) thực thi từng lệnh bytecode này.',
        'CPython biên dịch toàn bộ chương trình thành file nhị phân .exe độc lập giống hệt như C và C++.',
        'CPython gửi mã nguồn lên máy chủ đám mây của tổ chức PSF để xử lý.'
      ],
      correctIndex: 1,
      explanation: 'CPython gồm 2 công đoạn: Compiler biên dịch mã nguồn thành bytecode (chỉ thị độc lập phần cứng), sau đó PVM đóng vai trò máy ảo để thực thi bytecode đó.'
    },
    {
      question: 'Tại sao Python được gọi là ngôn ngữ "Kiểu Động nhưng Chặt chẽ" (Dynamically & Strongly Typed)?',
      options: [
        'Vì biến phải khai báo kiểu trước nhưng có thể cộng chuỗi với số tự do.',
        'Vì tên biến không bị trói buộc vào một kiểu dữ liệu cố định (động), nhưng Python từ chối tự ý ép kiểu ngầm bừa bãi khi làm phép toán (chặt chẽ).',
        'Vì tốc độ chạy của Python thay đổi linh hoạt theo dung lượng RAM.',
        'Vì Python không hỗ trợ lập trình hướng đối tượng.'
      ],
      correctIndex: 1,
      explanation: 'Động nghĩa là loại dữ liệu được xác định lúc chạy (runtime) và tên biến có thể trỏ đổi kiểu. Chặt chẽ nghĩa là các quy tắc về kiểu được thực thi nghiêm ngặt, "1" + 1 sẽ báo TypeError chứ không tự ép kiểu ngầm.'
    },
    {
      question: 'Mục đích chính của việc sử dụng Môi trường ảo (venv) trong Python là gì?',
      options: [
        'Tăng tốc độ tính toán CPU của máy tính lên gấp đôi.',
        'Giúp chương trình Python chạy được trên máy không cài hệ điều hành.',
        'Cô lập các thư viện được cài đặt cho từng dự án riêng biệt, tránh xung đột phiên bản giữa các dự án trên cùng một máy tính.',
        'Mã hóa code để người khác không xem được.'
      ],
      correctIndex: 2,
      explanation: 'venv tạo một không gian độc lập chứa bản sao Python và thư mục site-packages riêng cho từng dự án, ngăn chặn việc thư viện mới của dự án này làm hỏng dự án kia.'
    }
  ],

  summary: [
    'Phân biệt rõ: Ngôn ngữ Python là bản quy chuẩn đặc tả (specification), còn CPython là phần mềm cài đặt tham chiếu chính thức bằng ngôn ngữ C.',
    'Python không phải là thông dịch thuần túy: mã nguồn được biên dịch thành Bytecode, sau đó Máy ảo PVM thực thi bytecode.',
    'Python là ngôn ngữ Kiểu Động nhưng Chặt chẽ (Dynamically & Strongly Typed): biến chỉ là nhãn tên linh hoạt, nhưng phép toán giữa các kiểu dữ liệu không tương thích luôn bị báo lỗi TypeError.',
    'REPL là công cụ khám phá, thử nghiệm tức thì; file .py là kịch bản chạy tự động tuần tự.',
    'Luôn tạo và kích hoạt môi trường ảo (venv) cho mỗi dự án để quản lý gói thư viện sạch sẽ, chuyên nghiệp.'
  ]
};
