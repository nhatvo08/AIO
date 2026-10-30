export default {
  id: 'lp-c9-12',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.12',
  title: 'Phân cấp kiểu của Python: Đối tượng hạng nhất, Kiểu type, Kiểu mở rộng & Khung Range',
  subtitle: 'Khám phá cây phân cấp kiểu Hình 9-3, mô hình đối tượng hạng nhất (first-class), đối tượng kiểu type, triết lý duck typing, và phân tích chuyên đề về range',
  level: 'Nâng cao',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Bao quát toàn cảnh Hình 9-3: cây phân cấp toàn bộ các kiểu đối tượng dựng sẵn chính của Python được sắp xếp theo 5 thể loại lớn (Tập hợp, Số học, Khả gọi, Khác, Nội bộ trình thông dịch).',
    'Thấu suốt mô hình Đối tượng "Hạng nhất" (First-class object model): mọi thực thể trong Python (từ số, chuỗi, đến hàm, module, lớp) đều là đối tượng bình đẳng, có thể gán cho biến, truyền vào hàm, hoặc đặt trong list/dict.',
    'Hiểu bản chất của Đối tượng kiểu (type object): bản thân các kiểu cũng là đối tượng; các tên kiểu dựng sẵn (list, dict, str, int) thực chất là các Lớp (Class) và lời gọi tới chúng là các lệnh gọi hàm tạo (constructor).',
    'Thấm nhuần triết lý thiết kế Python: tránh kiểm tra kiểu thủ công (type(X) == ...) để không làm phá vỡ tính đa hình (polymorphism) và triết lý Duck Typing; nắm vững trường hợp sử dụng hợp lệ của isinstance().',
    'Tiếp thu phân tích sắc bén của Mark Lutz trong Khung chuyên đề về range: range là một đối tượng khả lặp (iterable) sinh số theo yêu cầu (on-demand), không phải là một dãy tuần tự vật lý lưu trữ trong RAM.'
  ],

  intuition: {
    title: 'Xã hội công dân bình đẳng và Chiếc máy làm kem theo yêu cầu',
    metaphor: 'Trong các ngôn ngữ lập trình truyền thống như C hay Java, có sự phân biệt giai cấp rạch ròi: dữ liệu thô (số, mảng) là "thứ dân", còn hàm và lớp là các "chỉ thị điều hành" không thể đặt vào biến hay nhét vào mảng. Trong Python, mô hình đối tượng "hạng nhất" (first-class) giống như một xã hội bình đẳng tuyệt đối: hàm cũng là một đối tượng, module cũng là một đối tượng, thậm chí bản thân kiểu dữ liệu (type) cũng là một đối tượng! Bạn có thể nhét một hàm vào trong một list, truyền một lớp vào một hàm khác như tham số. Và ở góc nhìn về bộ nhớ, đối tượng `range` giống như một chiếc máy làm kem tự động: nó không tích trữ sẵn 1 triệu que kem trong tủ lạnh (làm tràn bộ nhớ RAM), mà chỉ giữ chiếc van để mỗi khi bạn đưa cốc vào (vòng lặp for), nó sẽ rót ra đúng một que kem tại thời điểm đó!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CÂY PHÂN CẤP ĐỐI TƯỢNG PYTHON (HÌNH 9-3 TRONG GIÁO TRÌNH)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. Tập Hợp (Collections)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
              • Dãy tuần tự: str, bytes, tuple, list, bytearray<br>
              • Ánh xạ: dict<br>
              • Tập hợp: set, frozenset
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #10b981;border-radius:6px;">
            <div style="font-weight:700;color:#10b981;">2. Số Học (Numbers)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
              • Số nguyên: int, bool<br>
              • Số thực: float<br>
              • Số phức: complex<br>
              • Thư viện: Decimal, Fraction
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #f59e0b;border-radius:6px;">
            <div style="font-weight:700;color:#f59e0b;">3. Khả Gọi (Callables)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
              • Hàm (Function)<br>
              • Generator<br>
              • Lớp (Class)<br>
              • Phương thức (Method)
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;">
            <div style="font-weight:700;color:#8b5cf6;">4. Khác & Nội Bộ</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
              • Module, Instance, File, None<br>
              • View (dict view)<br>
              • Type, Code, Frame, Traceback
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phân Cấp Kiểu của Python & Mô Hình Đối Tượng Hạng Nhất (Hình 9-3)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 36 / 48 – Trang 37 / 48</strong>.</p>
          </div>
        </div>

        <p>Như một bản tóm tắt và tài liệu tham khảo, <strong>Hình 9-3</strong> trong giáo trình phác họa toàn bộ các kiểu đối tượng dựng sẵn chính có sẵn trong Python và mối quan hệ giữa chúng. Chúng ta đã khám phá những đối tượng nổi bật nhất trong số này ở Phần II:</p>

        <p>Các đối tượng khác trong Hình 9-3 là các đơn vị chương trình (ví dụ: hàm, generator, module và lớp) hoặc các thành phần nội bộ của trình thông dịch (ví dụ: khung ngăn xếp — stack frame, mã đã biên dịch — compiled code, đối tượng truy vết — traceback). Điểm cốt lõi cần ghi nhớ là: <strong>Mọi thứ được xử lý trong một chương trình Python đều là một đối tượng!</strong></p>

        <p>Mô hình này được gọi là mô hình đối tượng <strong>"hạng nhất" (first-class)</strong>, bởi vì mọi đối tượng đều bình đẳng như nhau đối với mã nguồn của bạn:</p>
        <ul>
          <li>Bạn có thể gán một hàm hoặc một lớp cho một biến thông thường.</li>
          <li>Bạn có thể truyền một hàm hoặc một module vào làm đối số của một hàm khác.</li>
          <li>Bạn có thể nhét một lớp hoặc một hàm vào trong một list hoặc dictionary để làm bảng điều phối (dispatch table).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Mô hình đối tượng hạng nhất: Gán hàm vào biến và đặt vào Dictionary',
          code: `# Định nghĩa các hàm thông thường
def add(a, b): return a + b
def mul(a, b): return a * b

# Hàm là đối tượng hạng nhất: có thể gán cho biến
operation = add
print("Gọi hàm qua biến operation:", operation(10, 20))

# Hàm có thể đặt vào Dictionary làm bảng điều phối (Dispatch Table)
math_ops = {'+': add, '*': mul}
print("Gọi hàm từ Dict '+':", math_ops['+'](5, 6))
print("Gọi hàm từ Dict '*':", math_ops['*'](5, 6))
print("Kiểu của hàm add:", type(add).__name__)`,
          output: `Gọi hàm qua biến operation: 30
Gọi hàm từ Dict '+': 11
Gọi hàm từ Dict '*': 30
Kiểu của hàm add: function`,
          annotations: [
            { line: 6, text: 'Biến operation nhận tham chiếu trỏ tới đối tượng hàm add.' },
            { line: 10, text: 'Dictionary math_ops lưu trữ trực tiếp các hàm làm giá trị.' },
            { line: 11, text: 'math_ops[\'+\'](5, 6) lấy hàm add ra và thực thi lời gọi với đối số 5, 6.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Đối Tượng Kiểu (type), Hàm Tạo Constructor & Triết Lý Duck Typing',
      content: `
        <p>Trên thực tế, ngay cả bản thân các kiểu cũng là một kiểu đối tượng trong Python: kiểu của một đối tượng là một đối tượng thuộc kiểu <code>type</code>. Lời gọi tới hàm dựng sẵn <code>type(X)</code> sẽ trả về đối tượng kiểu của <code>X</code>:</p>

        <p>Mỗi kiểu cốt lõi đều có một cái tên dựng sẵn: <code>dict</code>, <code>list</code>, <code>str</code>, <code>tuple</code>, <code>int</code>, <code>float</code>, <code>set</code>, <code>bytes</code>, v.v. Nói một cách chính xác về mặt kỹ thuật, <strong>các tên này tham chiếu tới các lớp (class)</strong>, và các lời gọi tới những tên này thực chất là các lệnh gọi hàm tạo đối tượng (constructor), chứ không đơn thuần chỉ là các hàm chuyển đổi kiểu.</p>

        <div class="callout-box callout-pitfall">
          <div class="callout-header"><span>🦆 Triết lý thiết kế Python:</span> <span>Tránh kiểm tra kiểu thủ công (Duck Typing)</span></div>
          <div class="callout-body">
            <p>Như Mark Lutz nhấn mạnh ở trang 38: <strong>Việc kiểm tra kiểu thủ công bằng <code>type(X) == list</code> thường không phải là cách làm đúng đắn trong Python</strong>! Lối viết này sẽ phá vỡ tính linh hoạt của mã nguồn: nếu một hàm chỉ chấp nhận duy nhất kiểu list, nó sẽ từ chối một tuple hoặc một đối tượng tùy biến do người dùng tạo ra có hành vi giống list. Triết lý của Python là <em>Duck Typing</em>: "Nếu nó đi như một con vịt và kêu như một con vịt, thì nó là một con vịt". Hãy kiểm tra xem đối tượng có hỗ trợ phương thức hoặc thao tác cần thiết hay không, thay vì kiểm tra tên khai sinh của nó.</p>
            <p style="margin-top:6px;">Trong những trường hợp hiếm hoi mà mã nguồn bắt buộc phải kiểm tra kiểu có tính tới yếu tố kế thừa trong OOP, hãy sử dụng hàm dựng sẵn <code>isinstance(X, SomeClass)</code> thay vì so sánh <code>type()</code> trực tiếp.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khám phá đối tượng type và hàm kiểm tra kế thừa isinstance()',
          code: `# Mọi kiểu dữ liệu đều là đối tượng của metaclass 'type'
print("type(42):", type(42))
print("type(list):", type(list))
print("type(type):", type(type))

# Tên kiểu dựng sẵn là các constructor tạo đối tượng
new_list = list('abc')
print("Constructor list('abc'):", new_list)

# Phân biệt so sánh type trực tiếp vs isinstance có tính kế thừa
flag = True
print("type(flag) == int:", type(flag) == int)      # False (vì type(flag) là bool)
print("isinstance(flag, int):", isinstance(flag, int))# True (vì bool là subclass của int!)`,
          output: `type(42): <class 'int'>
type(list): <class 'type'>
type(type): <class 'type'>
Constructor list('abc'): ['a', 'b', 'c']
type(flag) == int: False
isinstance(flag, int): True`,
          annotations: [
            { line: 3, text: 'Bản thân lớp list cũng là một đối tượng thuộc kiểu type.' },
            { line: 7, text: 'list(\'abc\') gọi constructor của lớp list.' },
            { line: 12, text: 'isinstance nhận diện bool kế thừa từ int, trong khi so sánh type bị trượt.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Các Kiểu Dữ Liệu Khác Trong Hệ Sinh Thái Python',
      content: `
        <p>Bên cạnh các đối tượng cốt lõi đã học và các đơn vị chương trình (hàm, module, class), một bản cài đặt Python điển hình có hàng chục kiểu đối tượng bổ sung có sẵn dưới dạng các phần mở rộng viết bằng C hoặc các lớp trong thư viện chuẩn được import:</p>
        <ul>
          <li><strong>Biểu thức chính quy (Regular Expressions):</strong> Đối tượng mẫu tìm kiếm do <code>re.compile()</code> trả về.</li>
          <li><strong>Giao diện đồ họa (GUI widgets):</strong> Các nút bấm, khung cửa sổ trong <code>tkinter</code> hoặc <code>PyQt</code>.</li>
          <li><strong>Mạng:</strong> Đối tượng <code>socket</code> trong module <code>socket</code> để truyền thông TCP/UDP.</li>
          <li><strong>Kiểu số mở rộng:</strong> <code>Decimal</code> và <code>Fraction</code> đã gặp ở Chương 5.</li>
          <li><strong>Bản ghi mở rộng:</strong> <code>namedtuple</code> đã học ở Bài C9.3.</li>
        </ul>

        <p>Điểm khác biệt chính giữa các công cụ này và các kiểu dựng sẵn là: <strong>các kiểu dựng sẵn sở hữu cú pháp được định nghĩa ở cấp độ ngôn ngữ</strong> để tạo ra đối tượng (như <code>[1, 2]</code> cho list, <code>open</code> cho file, <code>def</code> cho hàm), trong khi các công cụ khác được cung cấp trong các module thư viện mà bạn phải <code>import</code> để sử dụng.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-4',
      title: '4. Khung Chuyên Đề: Thế Còn range Thì Sao?',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>🔍 Khung chuyên đề Mark Lutz:</span> <span>Thế còn range thì sao?</span>
          </div>
          <div class="callout-body">
            <p>Tài liệu chính thức của Python đã tái phân loại hàm dựng sẵn <code>range</code> như một kiểu dãy tuần tự (sequence), cùng hàng với list và tuple. Tuy nhiên, Mark Lutz chỉ ra rằng: <strong>đây chỉ là một sự xảo thuật học thuật mà chúng tôi sẽ không tuân theo trong cuốn sách này!</strong></p>
            <p style="margin-top:6px;">Như bạn sẽ thấy sau này, <code>range</code> trả về một đối tượng khả lặp (<em>iterable</em>) sinh kết quả theo yêu cầu (<em>on demand</em>), chứ <strong>không phải là một dãy tuần tự được lưu trữ vật lý trong bộ nhớ</strong>. Nó hỗ trợ một số thao tác của dãy tuần tự (như đánh chỉ mục <code>r[0]</code> và <code>len(r)</code>), nhưng các thao tác cốt lõi khác của dãy tuần tự như phép ghép nối <code>+</code> hay phép lặp <code>*</code> thì hoàn toàn không được hỗ trợ! Việc dán nhãn range là một "dãy tuần tự các số nguyên bất biến" làm lẫn lộn các thể loại công cụ và gây bối rối lớn cho người học.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm bản chất của range: Tiết kiệm bộ nhớ và không hỗ trợ ghép nối',
          code: `import sys

# range không lưu trữ mảng triệu phần tử trong RAM
r = range(1000000)
print("Kích thước bộ nhớ của range(1 triệu):", sys.getsizeof(r), "bytes")

# Trong khi list 1 triệu số chiếm hàng megabyte
# (range chỉ lưu 3 thông số: start=0, stop=1000000, step=1)
print("range hỗ trợ chỉ mục r[5]:", r[5])
print("range hỗ trợ độ dài len(r):", len(r))

# Nhưng range KHÔNG hỗ trợ phép ghép nối + của dãy tuần tự thực sự:
try:
    combined = r + range(5)
except TypeError as err:
    print("Bắt lỗi khi cộng hai range:", err)`,
          output: `Kích thước bộ nhớ của range(1 triệu): 48 bytes
range hỗ trợ chỉ mục r[5]: 5
range hỗ trợ độ dài len(r): 1000000
Bắt lỗi khi cộng hai range: unsupported operand type(s) for +: 'range' and 'range'`,
          annotations: [
            { line: 5, text: 'range(1 triệu) chỉ chiếm 48 bytes RAM vì sinh số lười (lazy).' },
            { line: 9, text: 'r[5] tính toán số học O(1), không đọc từ mảng vật lý.' },
            { line: 16, text: 'r + range(5) báo lỗi TypeError chứng minh range không phải sequence đầy đủ.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tư duy đối tượng hạng nhất trong thiết kế hàm',
        content: 'Khả năng truyền hàm vào hàm khác (như <code>map(func, iterable)</code> hay tham số <code>key=str.lower</code> trong <code>sort()</code>) là ứng dụng trực tiếp và phổ biến nhất của mô hình đối tượng hạng nhất trong Python.'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy so sánh type() với các lớp con kế thừa',
        content: 'Không nên dùng <code>if type(x) == int:</code> nếu bạn muốn cho phép cả các kiểu kế thừa từ int như <code>bool</code>. Hãy dùng <code>isinstance(x, int)</code> để hỗ trợ tính đa hình.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo từ điển ánh xạ hàm và kiểm chứng kích thước range',
      level: 'Vừa',
      problem: 'Hãy viết mã Python: (1) Tạo 2 hàm square(x) và cube(x); lưu chúng vào một dictionary dispatch_table = {\'sq\': square, \'cb\': cube}. Lấy hàm từ dict ra và tính lũy thừa của 4. (2) So sánh dung lượng bộ nhớ (dùng sys.getsizeof) giữa range(1000) và list(range(1000)).',
      hint: 'Import module sys; gọi sys.getsizeof().',
      solutionCode: `import sys

def square(x): return x ** 2
def cube(x): return x ** 3

dispatch = {'sq': square, 'cb': cube}
print("Tính square(4) từ dict:", dispatch['sq'](4))
print("Tính cube(4) từ dict:", dispatch['cb'](4))

r = range(1000)
l = list(r)
print(f"Kích thước bộ nhớ: range = {sys.getsizeof(r)} bytes | list = {sys.getsizeof(l)} bytes")`,
      solutionOutput: `Tính square(4) từ dict: 16
Tính cube(4) từ dict: 64
Kích thước bộ nhớ: range = 48 bytes | list = 8056 bytes`,
      explanation: 'range chỉ lưu trữ 3 con số (start, stop, step) nên dung lượng luôn cố định 48 bytes; list cấp phát mảng 1000 con trỏ thực sự trong RAM nên chiếm hơn 8KB.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây mô tả ĐÚNG NHẤT về mô hình "Đối tượng hạng nhất" (First-class objects) trong Python?',
      options: [
        'Chỉ các đối tượng do người dùng tự tạo mới được coi là đối tượng hạng nhất.',
        'Mọi thực thể trong Python (số, chuỗi, hàm, lớp, module) đều bình đẳng như nhau: có thể gán cho biến, đặt trong tập hợp, và truyền vào hàm.',
        'Các kiểu dữ liệu bất biến có quyền ưu tiên cao hơn kiểu khả biến.',
        'Mọi đối tượng đều tự động được dịch sang mã máy nhị phân C.'
      ],
      correctIndex: 1,
      explanation: 'Trong mô hình đối tượng hạng nhất, không có sự phân biệt giai cấp: hàm, module hay lớp đều là đối tượng có thể thao tác và truyền nhận tự do như số hay chuỗi.'
    },
    {
      question: 'Vì sao Mark Lutz không đồng tình với việc tài liệu chính thức phân loại range là một dãy tuần tự (sequence)?',
      options: [
        'Vì range chạy chậm hơn list 10 lần.',
        'Vì range không phải là một dãy tuần tự được lưu trữ vật lý trong bộ nhớ RAM mà là một bộ sinh số theo yêu cầu (iterable on-demand), và nó không hỗ trợ phép ghép nối (+).',
        'Vì range chỉ hỗ trợ số âm.',
        'Vì range không thể dùng được trong vòng lặp for.'
      ],
      correctIndex: 1,
      explanation: 'range tính toán số theo yêu cầu khi lặp, không cấp phát mảng ô nhớ vật lý trong RAM, và không hỗ trợ các toán tử dãy tuần tự cốt lõi như ghép nối + hay lặp lại *.'
    }
  ],

  summary: [
    'Hình 9-3 tổng hợp toàn bộ các kiểu đối tượng dựng sẵn chính của Python thành một cây phân cấp thống nhất.',
    'Python áp dụng mô hình đối tượng hạng nhất (first-class): mọi thực thể đều là đối tượng có quyền bình đẳng trong mã nguồn.',
    'Bản thân các kiểu dữ liệu cũng là đối tượng thuộc metaclass type; các tên kiểu cốt lõi (list, dict, str) chính là các constructor lớp.',
    'Triết lý Duck Typing khuyến nghị tránh kiểm tra kiểu thủ công; hãy ưu tiên kiểm tra hành vi hoặc dùng isinstance() khi cần thiết.',
    'range là một iterable sinh số on-demand tiết kiệm bộ nhớ tuyệt đối, không nên nhầm lẫn với dãy tuần tự lưu trữ vật lý trong RAM.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.13), chúng ta sẽ điểm qua Bốn cạm bẫy kinh điển thường gặp nhất về kiểu dữ liệu dựng sẵn: tham chiếu chia sẻ, nhân bản lồng một cấp, cấu trúc tham chiếu vòng và sự cố sửa đổi đối tượng bất biến.'
};
