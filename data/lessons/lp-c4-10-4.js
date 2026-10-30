export default {
  id: 'lp-c4-10-4',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.10.4',
  title: 'Kiểu dữ liệu & Làm sao để Phá vỡ Độ linh hoạt của Mã',
  subtitle: 'Hàm type(), isinstance(), quan điểm phê bình của tác giả Mark Lutz về kiểm tra kiểu và Type Hinting',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng hàm type() và isinstance() để tra cứu thông tin kiểu của đối tượng.',
    'Thấu hiểu chuyên đề đặc sắc của Mark Lutz: "Làm sao để phá vỡ độ linh hoạt của mã của bạn".',
    'Nhận biết tác hại của việc kiểm tra kiểu cứng nhắc: triệt tiêu tính đa hình (polymorphism) và biến Python thành ngôn ngữ tĩnh.',
    'Hiểu đúng bản chất của Type Hinting (PEP 484): công cụ hỗ trợ IDE và phân tích tĩnh, không kiểm tra ép kiểu lúc runtime.'
  ],

  intuition: {
    title: 'Hộ chiếu sinh trắc học vs Khả năng làm việc thực tế',
    metaphor: 'Hãy tưởng tượng một công ty tuyển dụng: thay vì kiểm tra xem ứng viên có khả năng hoàn thành công việc hay không (Duck Typing: "anh có biết code không?"), người phỏng vấn lại khăng khăng đòi xem hộ chiếu và chứng minh thư xem ứng viên có đúng là người thị trấn A hay không (kiểm tra type(x) is int). Bằng cách đó, công ty đã tự tay loại bỏ hàng nghìn nhân tài xuất sắc khác (số thực, ma trận, lớp tự tạo) có cùng khả năng làm việc. Đó chính là cách bạn tự tay phá hỏng sự linh hoạt của mã Python.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HAI TRƯỜNG PHÁI TƯ DUY TRONG THIẾT KẾ MÃ</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);font-size:0.8rem;margin-bottom:4px;">❌ KIỂM TRA KIỂU CỨNG NHẮC</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.5;">
              <code>if type(x) == list:</code><br>
              • Triệt tiêu Đa hình (Polymorphism)<br>
              • Từ chối các lớp con tùy biến<br>
              • Phá vỡ khả năng mở rộng của mã
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);font-size:0.8rem;margin-bottom:4px;">✅ TRIẾT LÝ DUCK TYPING (PYTHONIC)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.5;">
              <code>x.append(item) / x + y</code><br>
              • Tập trung vào Giao diện (Interface)<br>
              • Tự động tương thích với mọi kiểu<br>
              • Tối đa hóa khả năng tái sử dụng
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tra cứu Kiểu Đối tượng: type() và isinstance()',
      content: `
        <p>Trong Python, mọi đối tượng đều tự biết kiểu dữ liệu của chính nó thông qua thuộc tính nội bộ. Để kiểm tra kiểu của một đối tượng, ta có hai công cụ chính:</p>
        <ul>
          <li><strong>Hàm <code>type(obj)</code>:</strong> Trả về đối tượng kiểu của <code>obj</code>.</li>
          <li><strong>Hàm <code>isinstance(obj, class_or_tuple)</code>:</strong> Kiểm tra xem <code>obj</code> có phải là một thể hiện của lớp đó (hoặc bất kỳ lớp con nào kế thừa từ lớp đó) hay không.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra kiểu đối tượng trong REPL',
          code: `>>> L = [1, 2, 3]
>>> type(L)                         # Trả về đối tượng lớp list
<class 'list'>
>>> type(L) == type([])             # So sánh với kiểu của một danh sách mẫu
True
>>> type(L) == list                 # So sánh trực tiếp với tên kiểu dựng sẵn
True
>>> isinstance(L, list)             # Khuyên dùng hơn khi thực sự cần kiểm tra
True`,
          output: `<class 'list'>
True
True
True`,
          annotations: [
            { line: 2, text: 'Hàm type() trả về đối tượng kiểu dữ liệu <class \'list\'>.' },
            { line: 4, text: 'So sánh kiểu với một danh sách rỗng mẫu.' },
            { line: 6, text: 'list là tên kiểu dựng sẵn toàn cục.' },
            { line: 8, text: 'isinstance hỗ trợ kế thừa lớp nên an toàn hơn type() == ...' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Quan điểm của Tác giả: "Làm sao để Phá vỡ Độ linh hoạt của Mã của bạn"',
      content: `
        <p>Đây là một trong những chuyên đề triết lý quan trọng và đặc sắc nhất của Mark Lutz trong cuốn <em>Learning Python</em>:</p>
        <blockquote>
          <p><em>"Việc kiểm tra kiểu cụ thể bằng <code>type()</code> hoặc <code>isinstance()</code> trong mã Python của bạn thực chất là một cách phá vỡ độ linh hoạt và triệt tiêu tính đa hình — tính năng mạnh mẽ nhất của ngôn ngữ."</em></p>
        </blockquote>
        <p>Hãy xem xét ví dụ: bạn viết một hàm tính tổng hai giá trị:</p>
        <pre><code>def add(x, y):
    if type(x) is int and type(y) is int:
        return x + y
    else:
        raise TypeError("Chỉ chấp nhận số nguyên!")</code></pre>
        <p>Bằng cách thêm câu lệnh <code>if type(...)</code> ở trên, bạn đã:</p>
        <ul>
          <li>Biến một hàm Python thanh lịch trở nên cứng nhắc và dài dòng.</li>
          <li>Tước đoạt khả năng của hàm trong việc cộng hai số thực (<code>float</code>), hai số phức (<code>complex</code>), hai chuỗi ký tự (<code>str</code>), hai danh sách (<code>list</code>), hay các đối tượng toán học tự tạo sau này.</li>
        </ul>
        <p><strong>Lời khuyên của tác giả:</strong> Đừng bao giờ hỏi <em>"Đối tượng này thuộc kiểu gì?"</em>. Hãy để đối tượng tự thực hiện hành vi của nó: nếu đối tượng hỗ trợ phép toán <code>+</code>, nó sẽ hoạt động; nếu không, Python sẽ tự động ném ra ngoại lệ <code>TypeError</code> thích hợp.</p>
      `
    },
    {
      id: 'sec-3',
      title: '3. Type Hinting trong Python Hiện đại (Gợi ý Kiểu theo PEP 484)',
      content: `
        <p>Trong các phiên bản Python hiện đại (từ Python 3.5+), cú pháp <strong>chú thích kiểu (Type Hinting)</strong> đã được bổ sung:</p>
        <pre><code>def add(x: int, y: int) -> int:
    return x + y</code></pre>
        <p>Mark Lutz đưa ra góc nhìn phân tích sâu sắc về công cụ này:</p>
        <ul>
          <li><strong>Bản chất lúc chạy (Runtime):</strong> Trình thông dịch CPython <strong>hoàn toàn phớt lờ</strong> các chú thích kiểu này khi thực thi. Nếu bạn truyền hai chuỗi <code>add('a', 'b')</code>, Python vẫn chạy và trả về <code>'ab'</code> bình thường mà không báo lỗi.</li>
          <li><strong>Mục đích thực tế:</strong> Type hinting sinh ra để phục vụ các công cụ bên ngoài: tính năng tự động gợi ý mã (IntelliSense) của IDE, và các công cụ kiểm tra tĩnh như <code>mypy</code>.</li>
          <li><strong>Cảnh báo của tác giả:</strong> Nếu quá lạm dụng type hinting để ép buộc Python hành xử như C++ hay Java, bạn đang đánh đổi sự linh hoạt, tốc độ phát triển và tính biểu cảm tự nhiên của ngôn ngữ lập trình động.</li>
        </ul>
      `
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy dùng type() thay vì isinstance() khi cần kiểm tra',
        content: `
          <p>Nếu trong một trường hợp đặc biệt bạn bắt buộc phải kiểm tra kiểu, hãy luôn dùng <code>isinstance(x, MyClass)</code> thay vì <code>type(x) is MyClass</code>. Lý do là <code>type(x) == ...</code> sẽ từ chối tất cả các lớp con kế thừa từ <code>MyClass</code>, trong khi <code>isinstance()</code> nhận diện đúng cây phả hệ kế thừa.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Quan điểm của tác giả: Cân bằng thực dụng',
        content: `
          <p>Mark Lutz không phủ nhận giá trị của Type Hinting trong các dự án hàng triệu dòng code với hàng trăm kỹ sư. Tuy nhiên, ông nhắc nhở: <em>"Hãy xem gợi ý kiểu như một tài liệu ghi chú hữu ích cho con người và IDE, đừng biến nó thành bức tường ngăn cản tính đa hình tuyệt vời của Python."</em></p>
        `
      }
    ],
    deepDive: {
      title: 'Mô hình Đa hình động (Dynamic Polymorphism) của Python',
      content: `
        <p>Trong C++, hàm <code>add()</code> phải được nạp chồng (overload) cho từng kiểu: <code>int add(int, int)</code>, <code>float add(float, float)</code>. Trong Python, chỉ cần MỘT hàm duy nhất: <code>def add(x, y): return x + y</code>. Trình thông dịch sẽ tự động tìm phương thức <code>__add__</code> trên đối tượng thực tế tại thời điểm chạy. Đây là đỉnh cao của sự tinh gọn trong thiết kế ngôn ngữ.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Thiết kế hàm đa hình tự nhiên',
      level: 'Dễ',
      description: 'Hãy viết hàm <code>double(x)</code> nhân đôi giá trị đầu vào mà KHÔNG dùng bất kỳ câu lệnh kiểm tra kiểu nào. Thử nghiệm hàm lần lượt với một số nguyên (10), một số thực (3.14), một chuỗi ("Py"), và một danh sách ([1, 2]).',
      starterCode: `def double(x):
    # Viết mã hàm đa hình tại đây
    pass

# Thử nghiệm với 4 kiểu dữ liệu khác nhau
`,
      solution: `def double(x):
    return x * 2

print("Số nguyên:", double(10))
print("Số thực:", double(3.14))
print("Chuỗi:", double("Py"))
print("Danh sách:", double([1, 2]))`,
      solutionOutput: `Số nguyên: 20
Số thực: 6.28
Chuỗi: PyPy
Danh sách: [1, 2, 1, 2]`,
      explanation: 'Toán tử * 2 tự động hoạt động đa hình trên cả 4 kiểu đối tượng khác nhau mà không cần bất kỳ dòng mã kiểm tra kiểu nào.'
    },
    {
      title: 'Kiểm tra kiểu an toàn với isinstance hỗ trợ nhiều kiểu',
      level: 'Vừa',
      description: 'Viết hàm <code>sum_numbers(a, b)</code> kiểm tra xem cả hai đối số có thuộc nhóm số học (int hoặc float) hay không bằng <code>isinstance(x, (int, float))</code>. Nếu đúng thì trả về tổng, nếu sai thì thông báo lỗi.',
      starterCode: `def sum_numbers(a, b):
    pass

print(sum_numbers(10, 20.5))
print(sum_numbers(10, "20"))`,
      solution: `def sum_numbers(a, b):
    if isinstance(a, (int, float)) and isinstance(b, (int, float)):
        return a + b
    return "Lỗi: Cả hai đối số bắt buộc phải là số!"

print(sum_numbers(10, 20.5))
print(sum_numbers(10, "20"))`,
      solutionOutput: `30.5
Lỗi: Cả hai đối số bắt buộc phải là số!`,
      explanation: '<code>isinstance(x, (int, float))</code> chấp nhận một tuple các kiểu, cho phép mở rộng kiểm tra an toàn hơn.'
    }
  ],

  quiz: [
    {
      question: 'Theo Mark Lutz, tại sao việc kiểm tra type(x) is int trong thân hàm lại bị coi là thói quen xấu trong Python?',
      options: [
        'Vì hàm type() chạy rất chậm trong CPython.',
        'Vì nó phá vỡ tính đa hình (polymorphism), ngăn cản hàm tái sử dụng cho các kiểu đối tượng hợp lệ khác.',
        'Vì Python không cho phép so sánh kiểu.',
        'Vì kiểu int sắp bị loại bỏ trong các phiên bản Python tương lai.'
      ],
      correctIndex: 1,
      explanation: 'Kiểm tra kiểu cứng nhắc tước bỏ tính đa hình tự nhiên — ưu thế lớn nhất của ngôn ngữ lập trình động Python.'
    },
    {
      question: 'Điều gì xảy ra khi bạn gọi hàm def greet(name: str): return "Hi " + name với tham số là số 123 tại thời điểm chạy (runtime)?',
      options: [
        'Python lập tức ném ngoại lệ TypeError ngay khi vừa gọi hàm.',
        'IDE sẽ ngăn không cho chạy chương trình.',
        'Chương trình vẫn thực thi bình thường và chỉ phát sinh lỗi TypeError khi thực hiện phép cộng "Hi " + 123.',
        'Python tự động ép kiểu 123 thành chuỗi "123".'
      ],
      correctIndex: 2,
      explanation: 'Python phớt lờ type hint lúc runtime. Lỗi chỉ phát sinh khi dòng mã bên trong ("Hi " + 123) gặp phép toán không hợp lệ.'
    },
    {
      question: 'Khi bắt buộc phải kiểm tra quan hệ kiểu dữ liệu, hàm nào được ưu tiên sử dụng vì có khả năng nhận diện kế thừa lớp?',
      options: [
        'type(x) == Y',
        'isinstance(x, Y)',
        'hasattr(x, Y)',
        'id(x) == id(Y)'
      ],
      correctIndex: 1,
      explanation: 'isinstance(x, Y) nhận diện chính xác cả các lớp con kế thừa từ Y, bảo vệ tính tương thích mở rộng.'
    }
  ],

  summary: [
    'Hàm type() trả về đối tượng lớp của một đối tượng; isinstance() kiểm tra quan hệ thể hiện và kế thừa.',
    'Chuyên đề của tác giả: Kiểm tra kiểu cụ thể làm phá vỡ tính đa hình và độ linh hoạt tự nhiên của mã nguồn.',
    'Ưu tiên thiết kế mã dựa trên Giao diện và Duck Typing: tập trung vào những gì đối tượng có thể làm.',
    'Type Hinting (PEP 484) là công cụ ghi chú dành cho IDE và phân tích tĩnh bên ngoài, không kiểm tra ép kiểu lúc runtime.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 33–35.'
  ]
};
