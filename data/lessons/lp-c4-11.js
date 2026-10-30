export default {
  id: 'lp-c4-11',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.11',
  title: 'Và Mọi thứ Còn lại: Triết lý "Mọi thứ đều là Đối tượng"',
  subtitle: 'Phân biệt "Ngựa thồ cốt lõi" với "Đối tượng thực thi chương trình" và tính nhất quán tuyệt đối của Python',
  level: 'Trung cấp',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thấu hiểu triết lý nền tảng tối thượng của Python: "Mọi thứ trong Python đều là đối tượng" (Everything is an object).',
    'Phân biệt rõ hai nhóm đối tượng: Nhóm "ngựa thồ cốt lõi" (lưu trữ dữ liệu) và Nhóm "đối tượng thực thi chương trình" (vận hành mã nguồn).',
    'Nhận biết các đối tượng thực thi: Hàm (Function), Mô-đun (Module), Lớp (Class), Khung ngăn xếp (Stack Frame), và Ngoại lệ (Traceback).',
    'Thấy được sức mạnh của khả năng nội quan (introspection) và đối tượng hạng nhất (first-class objects).'
  ],

  intuition: {
    title: 'Hàng hóa trên tàu vs Thủy thủ đoàn và Con tàu',
    metaphor: 'Trong một chuyến hải trình, hàng hóa trong kho (ngũ cốc, vàng bạc, vải vóc) giống như các kiểu dữ liệu cốt lõi (số, chuỗi, danh sách, từ điển) — chúng là dữ liệu bạn cần vận chuyển. Còn động cơ tàu, bánh lái, bản đồ hàng hải và thuyền trưởng giống như hàm, mô-đun, lớp và khung ngăn xếp — chúng vận hành chuyến đi. Nhưng trong thế giới Python kỳ diệu, cả hàng hóa lẫn con tàu và thuyền trưởng đều được đúc từ cùng một chất liệu duy nhất: ĐỐI TƯỢNG (PyObject)! Bạn có thể xem xét, đo đạc và điều khiển tất cả chúng bằng cùng một bộ quy tắc.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HAI NHÓM ĐỐI TƯỢNG TRONG HỆ SINH THÁI PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);font-size:0.82rem;margin-bottom:6px;">🐎 NGỰA THỒ CỐT LÕI (DỮ LIỆU)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">
              • Số (int, float, decimal, fraction)<br>
              • Chuỗi & Bytes (str, bytes)<br>
              • Dãy tuần tự (list, tuple)<br>
              • Ánh xạ (dict) & Tập hợp (set)<br>
              • Tệp (file) & Booleans / None
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);font-size:0.82rem;margin-bottom:6px;">⚙️ ĐỐI TƯỢNG THỰC THI (VẬN HÀNH)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">
              • Hàm (functions - def, lambda)<br>
              • Mô-đun (modules - import)<br>
              • Lớp (classes - OOP)<br>
              • Ngăn xếp (stack frames)<br>
              • Vết ngoại lệ (tracebacks)
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Nhóm "Ngựa thồ cốt lõi" (Core Workhorses)',
      content: `
        <p>Trong toàn bộ Chương 4, chúng ta đã lần lượt khảo sát các kiểu đối tượng cốt lõi dựng sẵn của Python. Mark Lutz gọi nhóm này là những <strong>"ngựa thồ cốt lõi" (Core Workhorses)</strong>.</p>
        <p>Chúng được gọi như vậy vì:</p>
        <ul>
          <li>Chúng trực tiếp mang tải trọng dữ liệu của ứng dụng: văn bản, con số, bảng biểu, cặp khóa-giá trị, tệp tin.</li>
          <li>Chúng được tích hợp sâu vào nhân của ngôn ngữ, tối ưu hóa tốc độ bằng mã C, và cung cấp sẵn cú pháp hằng tiện lợi.</li>
          <li>Bạn sẽ sử dụng chúng trong hầu như mọi dòng mã nguồn Python được viết ra.</li>
        </ul>
      `
    },
    {
      id: 'sec-2',
      title: '2. Nhóm "Đối tượng Thực thi Chương trình" (Program Execution Objects)',
      content: `
        <p>Ngoài các kiểu dữ liệu lưu trữ, Python còn có một nhóm đối tượng khác đại diện cho chính bộ máy đang chạy mã nguồn của bạn:</p>
        <ul>
          <li><strong>Hàm (Functions):</strong> Được tạo bởi câu lệnh <code>def</code> hoặc <code>lambda</code>. Hàm trong Python là <em>đối tượng hạng nhất (first-class objects)</em> — bạn có thể gán hàm vào biến, lưu hàm trong danh sách, hoặc truyền hàm như một tham số.</li>
          <li><strong>Mô-đun (Modules):</strong> Được tạo khi bạn <code>import</code> một tệp Python. Mô-đun thực chất là một đối tượng có thuộc tính (các hàm, biến, lớp định nghĩa bên trong tệp).</li>
          <li><strong>Lớp (Classes):</strong> Khuôn mẫu đối tượng tạo bởi câu lệnh <code>class</code>.</li>
          <li><strong>Mã máy / Bytecode (Code objects):</strong> Khối lệnh Python đã được biên dịch thành bytecode trong bộ nhớ.</li>
          <li><strong>Khung ngăn xếp (Stack frames) & Vết thực thi (Tracebacks):</strong> Các đối tượng lưu lại trạng thái các lời gọi hàm đang hoạt động và vị trí dòng lệnh xảy ra sự cố khi gặp lỗi.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Hàm và Mô-đun hoạt động như các đối tượng thông thường',
          code: `>>> import math
>>> type(math)                      # math là một đối tượng module
<class 'module'>
>>> square_root = math.sqrt         # Gán hàm vào một biến mới!
>>> square_root(16)
4.0
>>> functions = [math.sin, math.cos, square_root] # Lưu hàm trong danh sách
>>> [f(0) for f in functions[:2]]
[0.0, 1.0]`,
          output: `<class 'module'>
4.0
[0.0, 1.0]`,
          annotations: [
            { line: 2, text: 'Mô-đun math là một đối tượng đầy đủ thuộc lớp module.' },
            { line: 4, text: 'Hàm sqrt được gán vào biến square_root mà không cần gọi hàm () ngay.' },
            { line: 7, text: 'Hàm có thể được đưa vào danh sách và lặp qua như mọi đối tượng dữ liệu khác.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Triết lý "Mọi thứ đều là Đối tượng" (Everything is an Object)',
      content: `
        <p>Trong nhiều ngôn ngữ lập trình truyền thống (như C hay Java nguyên thủy), có sự phân chia ranh giới ngặt nghèo giữa kiểu dữ liệu nguyên thủy (primitive types như <code>int</code>, <code>double</code> không phải là object) và các lớp đối tượng.</p>
        <p>Trong Python, ranh giới đó hoàn toàn bị xóa bỏ:</p>
        <blockquote>
          <p><strong>Mọi thứ bạn có thể gán vào một biến, truyền vào một hàm, hoặc kiểm tra trong chương trình Python đều là một Đối tượng (Object).</strong></p>
        </blockquote>
        <p>Từ một con số nguyên <code>42</code>, chuỗi ký tự <code>'spam'</code>, giá trị <code>None</code>, hàm <code>print</code>, cho đến mô-đun <code>sys</code> hay một lớp tự tạo — tất cả đều có một định danh bộ nhớ (<code>id()</code>), một kiểu dữ liệu (<code>type()</code>), và một tập hợp các thuộc tính/phương thức có thể khám phá qua <code>dir()</code>.</p>
      `
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy gọi hàm () khi chỉ muốn truyền tham chiếu',
        content: `
          <p>Vì hàm là một đối tượng, hãy chú ý sự khác biệt cực kỳ quan trọng:</p>
          <ul>
            <li><code>func</code> (không có ngoặc): Tham chiếu tới chính đối tượng hàm.</li>
            <li><code>func()</code> (có ngoặc): Thực thi hàm và nhận về kết quả trả về.</li>
          </ul>
          <p>Khi bạn truyền một hàm vào bộ xử lý sự kiện nút bấm trên giao diện đồ họa GUI (callback), hãy truyền tên hàm <code>button.on_click(my_handler)</code>, đừng truyền <code>my_handler()</code>!</p>
        `
      }
    ],
    tips: [
      {
        title: 'Sức mạnh của Nội quan (Introspection)',
        content: `
          <p>Nhờ mô hình "Mọi thứ là đối tượng", các chương trình Python có khả năng tự kiểm tra chính mình tại thời điểm chạy (runtime introspection). Bạn có thể kiểm tra xem một đối tượng có thuộc tính nào không bằng <code>hasattr(obj, 'attr')</code>, hoặc lấy thuộc tính động bằng <code>getattr(obj, 'attr')</code>.</p>
        `
      }
    ],
    deepDive: {
      title: 'Tiêu đề PyObject trong mã nguồn CPython',
      content: `
        <p>Bên dưới mã nguồn C của CPython, mọi thực thể từ số nguyên nhỏ nhất cho đến mô-đun phức tạp nhất đều được kế thừa từ cùng một cấu trúc C gốc mang tên <code>PyObject</code>:</p>
        <pre><code>struct _object {
    _PyObject_HEAD_EXTRA
    Py_ssize_t ob_refcnt;
    struct _typeobject *ob_type;
};</code></pre>
        <p>Chính sự thống nhất ở mức mã máy này đã mang lại cho Python vẻ đẹp thiết kế thanh lịch và tính dự đoán cao trong toàn bộ hệ thống.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Bảng ánh xạ các phép tính toán học (Dispatch Table)',
      level: 'Dễ',
      description: 'Hãy tạo một từ điển <code>operations</code> trong đó các khóa là tên phép tính ("add", "mul") và giá trị là các hàm tương ứng (dùng hàm lambda hoặc hàm từ module <code>operator</code>). Sau đó dùng từ điển để thực hiện phép tính linh hoạt.',
      starterCode: `# Tạo từ điển operations chứa các đối tượng hàm
`,
      solution: `import operator

operations = {
    'add': operator.add,
    'mul': operator.mul,
    'sub': operator.sub
}

op_name = 'mul'
result = operations[op_name](6, 7)
print(f"Kết quả phép {op_name}(6, 7):", result)`,
      solutionOutput: `Kết quả phép mul(6, 7): 42`,
      explanation: 'Vì hàm là đối tượng hạng nhất, ta có thể lưu trữ trực tiếp các hàm vào từ điển để xây dựng bảng điều phối (dispatch table) gọn gàng thay cho chuỗi lệnh if/elif dài dòng.'
    },
    {
      title: 'Khám phá thuộc tính của một hàm bất kỳ',
      level: 'Vừa',
      description: 'Gán thêm một thuộc tính tùy biến <code>version = "1.0"</code> trực tiếp vào một hàm <code>calculate</code>, sau đó dùng <code>dir()</code> và <code>getattr()</code> để đọc thuộc tính đó ra.',
      starterCode: `def calculate(x):
    return x * x

# Gán thuộc tính tùy biến vào hàm calculate
`,
      solution: `def calculate(x):
    return x * x

calculate.version = "1.0"
calculate.author = "Mark Lutz Reader"

print("Tên hàm:", calculate.__name__)
print("Phiên bản của hàm:", getattr(calculate, 'version'))
print("Tác giả của hàm:", calculate.author)`,
      solutionOutput: `Tên hàm: calculate
Phiên bản của hàm: 1.0
Tác giả của hàm: Mark Lutz Reader`,
      explanation: 'Trong Python, hàm là đối tượng đầy đủ nên bạn hoàn toàn có thể gắn thêm các thuộc tính siêu dữ liệu (metadata) trực tiếp vào đối tượng hàm.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây thể hiện ĐÚNG NHẤT triết lý "Mọi thứ là đối tượng" trong Python?',
      options: [
        'Chỉ các thể hiện của câu lệnh class mới là đối tượng; số và chuỗi là các kiểu nguyên thủy.',
        'Mọi thực thể trong Python (số, chuỗi, danh sách, hàm, mô-đun, lớp) đều là đối tượng có kiểu, danh tính và thuộc tính.',
        'Chỉ các kiểu dữ liệu có thể sửa đổi (khả biến) mới là đối tượng.',
        'Python không hỗ trợ lập trình hướng đối tượng.'
      ],
      correctIndex: 1,
      explanation: 'Không có ngoại lệ nào: tất cả mọi thứ trong Python đều được mô hình hóa và vận hành như một đối tượng (PyObject).'
    },
    {
      question: 'Khái niệm "Đối tượng hạng nhất" (First-class Object) áp dụng cho hàm trong Python có nghĩa là gì?',
      options: [
        'Hàm luôn luôn được thực thi trước tất cả các câu lệnh khác.',
        'Hàm chạy với tốc độ nhanh nhất.',
        'Hàm có thể được gán vào biến, lưu trữ trong cấu trúc dữ liệu, và truyền làm đối số như mọi đối tượng thông thường khác.',
        'Hàm không bao giờ phát sinh ngoại lệ.'
      ],
      correctIndex: 2,
      explanation: 'Đối tượng hạng nhất có quyền bình đẳng tuyệt đối: có thể được truyền, nhận, gán và lưu trữ tự do trong chương trình.'
    },
    {
      question: 'Thực thể nào sau đây thuộc nhóm "Đối tượng thực thi chương trình" theo phân loại của Mark Lutz?',
      options: [
        'Kiểu số nguyên int',
        'Chuỗi ký tự str',
        'Mô-đun và Khung ngăn xếp (Stack Frame)',
        'Danh sách list'
      ],
      correctIndex: 2,
      explanation: 'Mô-đun, hàm, lớp, và các khung ngăn xếp thuộc nhóm đối tượng quản lý và vận hành việc thực thi mã nguồn.'
    }
  ],

  summary: [
    'Python chia các đối tượng thành hai nhóm: "Ngựa thồ cốt lõi" (dữ liệu) và "Đối tượng thực thi chương trình" (vận hành mã).',
    'Các đối tượng thực thi bao gồm: Hàm, Mô-đun, Lớp, Mã máy (Bytecode), và Khung ngăn xếp.',
    'Hàm trong Python là đối tượng hạng nhất (first-class object), có thể gán, truyền và lưu trữ tự do.',
    'Triết lý tối thượng: "Mọi thứ trong Python đều là đối tượng" mang lại sự nhất quán và sức mạnh nội quan tuyệt vời.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 36.'
  ]
};
