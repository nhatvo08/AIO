export default {
  id: 'lp-c4-10-3',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.10.3',
  title: 'Các kiểu cốt lõi khác: Boolean và Đối tượng đặc biệt None',
  subtitle: 'Kiểu bool kế thừa int, quy tắc chân lý (truthiness), đối tượng giữ chỗ None và so sánh is None',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững bản chất của kiểu Boolean (bool): gồm hai hằng số True và False, là lớp con của int.',
    'Hiểu nguyên lý chân lý (truthiness): nhận biết chính xác danh sách các giá trị Falsy trong Python.',
    'Nhận biết vai trò của đối tượng đơn vị đặc biệt None: giá trị trả về mặc định và đối tượng giữ chỗ.',
    'Tuân thủ chuẩn mực Pythonic: sử dụng toán tử đồng nhất is None thay vì toán tử so sánh == None.'
  ],

  intuition: {
    title: 'Công tắc bật/tắt và Chiếc hộp rỗng niêm phong',
    metaphor: 'Kiểu Boolean (True/False) giống như một chiếc công tắc đèn: hoặc có dòng điện (1 / True), hoặc ngắt mạch (0 / False). Trong khi đó, đối tượng None giống như một chiếc hộp rỗng được niêm phong mang nhãn "Chưa có đồ". Nó không phải là con số 0, cũng không phải là dòng chữ rỗng ""; nó là một đối tượng duy nhất tồn tại để đánh dấu: "Tại đây hiện thời chưa có giá trị nào cả".',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢN ĐỒ GIÁ TRỊ CHÂN LÝ TRONG PYTHON (TRUTHINESS)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);font-size:0.8rem;margin-bottom:4px;">FALSY (COI LÀ SAI / 0)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">
              • Hằng số: <code>False</code>, <code>None</code><br>
              • Số học: <code>0</code>, <code>0.0</code>, <code>Decimal(0)</code><br>
              • Dãy rỗng: <code>''</code>, <code>()</code>, <code>[]</code><br>
              • Ánh xạ rỗng: <code>{}</code>, <code>set()</code>
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);font-size:0.8rem;margin-bottom:4px;">TRUTHY (COI LÀ ĐÚNG)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">
              • Hằng số: <code>True</code><br>
              • Mọi số khác 0: <code>1</code>, <code>-42</code>, <code>3.14</code><br>
              • Mọi tập hợp có ít nhất 1 phần tử: <code>' '</code>, <code>[0]</code>, <code>{'a': 0}</code>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Kiểu Boolean: True và False',
      content: `
        <p>Kiểu <strong>Boolean (<code>bool</code>)</strong> trong Python chỉ có hai đối tượng hằng số duy nhất: <code>True</code> (đúng) và <code>False</code> (sai).</p>
        <p>Một chi tiết kiến trúc thú vị mà Mark Lutz nhấn mạnh: trong Python, kiểu <code>bool</code> thực chất là một lớp con (subclass) của kiểu số nguyên <code>int</code>:</p>
        <ul>
          <li><code>True</code> ứng với số nguyên <code>1</code> và hiển thị thành chuỗi <code>'True'</code>.</li>
          <li><code>False</code> ứng với số nguyên <code>0</code> và hiển thị thành chuỗi <code>'False'</code>.</li>
        </ul>
        <p>Vì vậy, bạn có thể thực hiện các phép toán số học như <code>True + 4</code> (cho kết quả <code>5</code>), dù trong thực tế bạn không nên làm như vậy.</p>
      `,
      codeExamples: [
        {
          title: 'Khám phá kiểu bool và mối quan hệ với int',
          code: `>>> 1 > 2
False
>>> 1 < 2
True
>>> isinstance(True, int)          # bool kế thừa trực tiếp từ int
True
>>> True == 1                      # Giá trị số học tương đương
True
>>> False == 0
True`,
          output: `False
True
True
True
True`,
          annotations: [
            { line: 2, text: 'Phép so sánh trả về đối tượng hằng số False.' },
            { line: 4, text: 'isinstance xác nhận True là một đối tượng thuộc họ int.' },
            { line: 6, text: 'Toán tử == so sánh giá trị xác nhận True bằng 1.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Đối tượng Đơn vị Đặc biệt: None',
      content: `
        <p>Python cung cấp một đối tượng hằng số duy nhất mang tên <strong><code>None</code></strong> (thuộc kiểu <code>NoneType</code>). <code>None</code> đóng vai trò là một đối tượng giữ chỗ đặc biệt (placeholder) để biểu diễn sự "vắng mặt của một giá trị" hoặc "chưa được khởi tạo".</p>
        <p>Các vai trò chính của <code>None</code>:</p>
        <ul>
          <li><strong>Giá trị trả về mặc định:</strong> Bất kỳ hàm Python nào kết thúc mà không gặp lệnh <code>return</code> có giá trị đều ngầm định trả về <code>None</code>.</li>
          <li><strong>Kết quả của phương thức in-place:</strong> Các phương thức sửa đổi danh sách tại chỗ như <code>L.append()</code> hay <code>L.sort()</code> đều trả về <code>None</code>.</li>
          <li><strong>Khởi tạo mảng có kích thước cố định:</strong> Bạn có thể tạo danh sách có sẵn 100 ô rỗng bằng cú pháp <code>L = [None] * 100</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng None làm đối tượng giữ chỗ',
          code: `>>> X = None
>>> print(X)
None
>>> L = [None] * 4                 # Khởi tạo danh sách 4 phần tử rỗng
>>> L
[None, None, None, None]
>>> type(None)
<class 'NoneType'>`,
          output: `None
[None, None, None, None]
<class 'NoneType'>`,
          annotations: [
            { line: 1, text: 'Gán biến X trỏ tới đối tượng duy nhất None.' },
            { line: 4, text: 'Tạo sẵn 4 ô nhớ chứa con trỏ None để chuẩn bị gán dữ liệu sau này.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Chuẩn mực So sánh: is None vs == None',
      content: `
        <p>Do <code>None</code> là một đối tượng duy nhất (singleton) trong toàn bộ phiên chạy của CPython, chuẩn mực lập trình Python (PEP 8) quy định:</p>
        <p><strong>Luôn luôn sử dụng toán tử đồng nhất danh tính <code>is</code> hoặc <code>is not</code> khi kiểm tra <code>None</code>:</strong></p>
        <pre><code>if val is None:       # CHUẨN PYTHONIC (nhanh và chính xác tuyệt đối)
    ...
if val == None:       # KHÔNG NÊN DÙNG (chậm hơn và có thể bị quá tải sai lệch)
    ...</code></pre>
      `
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Lỗi viết thường true hoặc false',
        content: `
          <p>Trong các ngôn ngữ như C++, Java, JavaScript, từ khóa boolean viết thường là <code>true</code> và <code>false</code>. Trong Python, chúng bắt buộc phải <strong>viết hoa chữ cái đầu</strong>: <code>True</code> và <code>False</code>. Nếu bạn viết chữ thường, Python sẽ hiểu đó là một tên biến chưa khai báo và ném lỗi <code>NameError: name 'true' is not defined</code>.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Khác biệt giữa is và ==',
        content: `
          <p>Toán tử <code>==</code> so sánh <em>giá trị</em> (hai đối tượng có cùng nội dung không). Toán tử <code>is</code> so sánh <em>danh tính bộ nhớ</em> (hai biến có cùng trỏ vào một ô nhớ duy nhất hay không: <code>id(a) == id(b)</code>). Vì <code>None</code> là đối tượng duy nhất, kiểm tra <code>is None</code> diễn ra ở tốc độ so sánh con trỏ C tức thì.</p>
        `
      }
    ],
    deepDive: {
      title: 'Cài đặt Py_True, Py_False và Py_None trong CPython',
      content: `
        <p>Trong mã nguồn C của CPython, <code>Py_True</code> và <code>Py_False</code> là hai cấu trúc tĩnh <code>_PyLongValue</code> có giá trị số 1 và 0. Tương tự, <code>Py_None</code> là một biến cấu trúc đơn lẻ được chia sẻ toàn hệ thống. Mọi biến trong chương trình Python trỏ tới <code>None</code> thực chất đều trỏ cùng vào địa chỉ con trỏ của <code>Py_None</code> này.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Khởi tạo danh sách kết quả đo lường',
      level: 'Dễ',
      description: 'Hãy tạo danh sách <code>measurements</code> gồm 10 phần tử <code>None</code> đại diện cho 10 cảm biến chưa ghi nhận dữ liệu. Sau đó gán giá trị nhiệt độ <code>28.5</code> cho cảm biến thứ 0 và <code>30.2</code> cho cảm biến thứ 9.',
      starterCode: `# 1. Tạo danh sách 10 phần tử None
# 2. Gán cảm biến 0 và cảm biến 9
# 3. In danh sách`,
      solution: `measurements = [None] * 10
measurements[0] = 28.5
measurements[9] = 30.2

print("Tổng số cảm biến:", len(measurements))
print("Cảm biến 0:", measurements[0])
print("Cảm biến 5:", measurements[5])
print("Cảm biến 9:", measurements[9])`,
      solutionOutput: `Tổng số cảm biến: 10
Cảm biến 0: 28.5
Cảm biến 5: None
Cảm biến 9: 30.2`,
      explanation: '<code>[None] * 10</code> tạo ra danh sách cố định kích thước, cho phép gán chỉ mục an toàn mà không sợ lỗi IndexError.'
    },
    {
      title: 'Hàm xử lý tham số mặc định an toàn với None',
      level: 'Vừa',
      description: 'Một lỗi kinh điển trong Python là dùng danh sách rỗng làm tham số mặc định <code>def add_item(item, lst=[]):</code>. Hãy viết lại hàm <code>add_item(item, lst=None)</code> sử dụng <code>None</code> làm giá trị giữ chỗ để tránh bẫy tham số khả biến.',
      starterCode: `def add_item(item, lst=None):
    # Viết mã khởi tạo an toàn
    pass

l1 = add_item('A')
l2 = add_item('B')
print("l1:", l1)
print("l2:", l2)`,
      solution: `def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

l1 = add_item('A')
l2 = add_item('B')
print("l1:", l1)
print("l2:", l2)`,
      solutionOutput: `l1: ['A']
l2: ['B']`,
      explanation: 'Sử dụng <code>lst is None</code> là mẫu thiết kế tiêu chuẩn vàng (gold standard) trong Python để tạo danh sách mới độc lập cho mỗi lần gọi hàm.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về kiểu dữ liệu bool trong Python?',
      options: [
        'bool là một kiểu dữ liệu hoàn toàn tách rời, không liên quan đến số học.',
        'bool là lớp con của int, trong đó True có giá trị số là 1 và False có giá trị số là 0.',
        'True và False được viết chữ thường là true và false như trong JavaScript.',
        'Toán tử so sánh danh tính is không dùng được cho True/False.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, bool kế thừa từ int; True tương đương 1 và False tương đương 0.'
    },
    {
      question: 'Giá trị nào sau đây được coi là TRUTHY khi đặt trong câu lệnh điều kiện if?',
      options: [
        '0.0',
        '"" (chuỗi rỗng)',
        '[] (danh sách rỗng)',
        '[0] (danh sách chứa số 0)'
      ],
      correctIndex: 3,
      explanation: '[0] là một danh sách có 1 phần tử nên nó là Truthy, dù phần tử bên trong là số 0.'
    },
    {
      question: 'Theo chuẩn PEP 8 của Python, cách nào sau đây là CHUẨN MỰC NHẤT để kiểm tra xem biến x có phải là None hay không?',
      options: [
        'if x == None:',
        'if x is None:',
        'if type(x) == NoneType:',
        'if not x:'
      ],
      correctIndex: 1,
      explanation: 'Toán tử đồng nhất danh tính if x is None: là chuẩn mực tối thượng theo đặc tả PEP 8.'
    }
  ],

  summary: [
    'Kiểu bool gồm hai hằng số True và False (bắt buộc viết hoa chữ cái đầu), kế thừa trực tiếp từ int.',
    'Nguyên lý chân lý (truthiness): False, None, số 0, chuỗi và tập hợp rỗng được coi là Falsy; mọi giá trị khác là Truthy.',
    'Đối tượng None là một đơn vị đặc biệt (singleton) đại diện cho sự vắng mặt của một giá trị hoặc đối tượng giữ chỗ.',
    'Luôn sử dụng toán tử is None và is not None khi kiểm tra giá trị của None.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 33.'
  ]
};
