export default {
  id: 'lp-c4-07-5',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.7.5',
  title: 'Từ điển: Giao thức Lặp & Phép gán Tuple',
  subtitle: 'Cơ chế hoạt động của iter(), next(), ngoại lệ StopIteration và kỹ thuật mở gói for k, v in D.items()',
  level: 'Trung bình',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu sâu bản chất cơ chế lặp trong Python: Giao thức lặp (Iteration Protocol).',
    'Phân biệt rõ hai khái niệm: Đối tượng có thể lặp (Iterable) và Bộ lặp (Iterator).',
    'Tự tay điều khiển quá trình duyệt tuần tự bằng hàm iter(), next() và xử lý ngoại lệ StopIteration.',
    'Sử dụng phép gán bộ giá trị (tuple assignment / unpacking) để bóc tách khóa và giá trị gọn gàng trong for k, v in D.items().'
  ],

  intuition: {
    title: 'Bộ máy kéo băng chuyền và Hộp quà hai ngăn',
    metaphor: 'Vòng lặp for thực ra là một người công nhân đứng bên cạnh một cỗ máy băng chuyền (giao thức lặp). Trước tiên, anh ta bấm nút khởi động (iter(D)) để cỗ máy nhả ra một trục lăn (iterator). Cứ mỗi nhịp, trục lăn lại nhích một bước và thả ra một hộp quà (next(I)). Mỗi hộp quà lại có hai ngăn (k, v) — anh ta chỉ việc mở toang hai ngăn cùng lúc (tuple assignment). Khi băng chuyền cạn đồ, cỗ máy giơ biển "Hết quà!" (StopIteration) và người công nhân ngừng việc mà không hề bối rối.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">GIAO THỨC LẶP: iter() ➔ next() ➔ StopIteration</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;">
          <div style="padding:8px 12px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--text-muted);">Iterable</div>
            <div style="font-weight:700;color:var(--text-primary);">D = {'a': 1, 'b': 2}</div>
          </div>
          <div style="color:var(--accent-primary);font-weight:700;">iter() ➔</div>
          <div style="padding:8px 12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--accent-primary);">Iterator (I)</div>
            <div style="font-weight:700;color:var(--accent-primary);">next(I) ➔ 'a'<br>next(I) ➔ 'b'</div>
          </div>
          <div style="color:var(--danger);font-weight:700;">next(I) ➔</div>
          <div style="padding:8px 12px;background:var(--bg-surface);border:2px dashed var(--danger);border-radius:6px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--danger);">Dừng lại an toàn</div>
            <div style="font-weight:700;color:var(--danger);">StopIteration</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">Vòng lặp for tự động xử lý toàn bộ quy trình 3 bước này trong nền.</div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Giao thức Lặp trong Python (Iteration Protocol)',
      content: `
        <p>Vòng lặp <code>for</code> không phải là một câu thần chú ma thuật. Nó hoạt động dựa trên một kiến trúc nền tảng phổ quát của Python gọi là <strong>Giao thức lặp (Iteration Protocol)</strong>.</p>
        <p>Giao thức lặp quy định hai bước cơ bản:</p>
        <ol>
          <li>Một đối tượng <strong>có thể lặp (iterable)</strong> (như danh sách, chuỗi, từ điển, tệp tin) khi truyền vào hàm <code>iter()</code> sẽ trả về một đối tượng <strong>bộ lặp (iterator)</strong>.</li>
          <li>Đối tượng bộ lặp này hỗ trợ hàm <code>next()</code> để nhả ra từng phần tử một tại một thời điểm. Khi không còn phần tử nào nữa, hàm <code>next()</code> sẽ ném ngoại lệ <code>StopIteration</code> để báo hiệu chấm dứt.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Khám phá giao thức lặp bằng hàm iter() và next()',
          code: `>>> D = {'a': 1, 'b': 2, 'c': 3}
>>> I = iter(D)             # Nhận đối tượng bộ lặp của từ điển D
>>> next(I)                 # Lấy phần tử thứ nhất
'a'
>>> next(I)                 # Lấy phần tử thứ hai
'b'
>>> next(I)                 # Lấy phần tử thứ ba
'c'
>>> next(I)                 # Đã hết phần tử!
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration`,
          output: `'a'
'b'
'c'
StopIteration`,
          annotations: [
            { line: 2, text: 'iter(D) khởi tạo một iterator gắn liền với các khóa của D.' },
            { line: 3, text: 'Mỗi lời gọi next(I) trả về một khóa tiếp theo.' },
            { line: 9, text: 'Khi không còn khóa nào, StopIteration được kích hoạt. Vòng lặp for sẽ bắt lỗi này để thoát lặp an toàn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phép gán Tuple (Tuple Assignment / Unpacking)',
      content: `
        <p>Khi bạn cần truy cập đồng thời cả <strong>khóa</strong> và <strong>giá trị</strong> trong một vòng lặp từ điển, cách thức thanh lịch và hiệu quả nhất là kết hợp phương thức <code>D.items()</code> với kỹ thuật <strong>phép gán bộ giá trị (tuple assignment)</strong>.</p>
        <p>Bản chất của phép gán tuple trong Python cho phép bạn mở gói một tuple có N phần tử vào đúng N biến tương ứng:</p>
        <pre><code>k, v = ('a', 1)    # k nhận 'a', v nhận 1</code></pre>
        <p>Khi đưa kỹ thuật này vào đầu vòng lặp <code>for</code>, Python tự động giải nén cặp <code>(khóa, giá_trị)</code> trong mỗi nhịp lặp mà bạn không cần phải truy xuất lại qua <code>D[k]</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Duyệt khóa và giá trị đồng thời với D.items()',
          code: `>>> D = {'a': 1, 'b': 2, 'c': 3}
>>> for k, v in D.items():
...     print(k, '=>', v)
... 
a => 1
b => 2
c => 3`,
          output: `a => 1
b => 2
c => 3`,
          annotations: [
            { line: 2, text: 'D.items() sinh ra các tuple (khóa, giá_trị).' },
            { line: 2, text: 'Cú pháp for k, v tự động mở gói từng tuple vào hai biến k và v độc lập.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Lỗi ValueError khi số lượng biến không khớp',
        content: `
          <p>Khi sử dụng phép mở gói (unpacking), số lượng biến bên trái phải khớp chính xác với số phần tử trong tuple. Ví dụ: nếu bạn viết <code>for k, v in D:</code> (thiếu <code>.items()</code>), Python sẽ cố giải nén từng ký tự của chuỗi khóa vào hai biến và báo lỗi:</p>
          <pre><code>ValueError: not enough values to unpack (expected 2, got 1)</code></pre>
          <p>Hãy luôn nhớ gọi <code>.items()</code> khi muốn mở gói cả <code>k, v</code>!</p>
        `
      }
    ],
    tips: [
      {
        title: 'Mọi cấu trúc lặp đều dùng chung một giao thức',
        content: `
          <p>Không chỉ vòng lặp <code>for</code>, mà cả <strong>list comprehension</strong>, toán tử <code>in</code>, hàm <code>map()</code>, các hàm dựng sẵn <code>sum()</code>, <code>min()</code>, <code>max()</code>, và phép mở gói <code>*args</code> đều âm thầm sử dụng chung Giao thức Lặp này. Hiểu được giao thức lặp là bạn đã nắm được chìa khóa vận hành của toàn bộ hệ sinh thái Python.</p>
        `
      }
    ],
    deepDive: {
      title: 'Mô phỏng vòng lặp for bằng while và try/except',
      content: `
        <p>Để thấy rõ vòng lặp <code>for</code> làm gì bên dưới, ta có thể viết lại một vòng lặp tương đương 100% bằng câu lệnh <code>while</code> cấp thấp:</p>
        <pre><code>I = iter(D)
while True:
    try:
        k = next(I)
    except StopIteration:
        break
    print(k, '=>', D[k])</code></pre>
        <p>Vòng lặp <code>for</code> chính là cú pháp tiện lợi (syntactic sugar) giúp chúng ta tránh phải viết khối <code>try/except</code> này hàng nghìn lần.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Tính tổng hóa đơn mua hàng bằng D.items()',
      level: 'Dễ',
      description: 'Cho giỏ hàng <code>cart = {\'sách\': 120, \'bút\': 15, \'vở\': 30}</code>. Hãy dùng vòng lặp <code>for item, price in cart.items():</code> để in chi tiết từng món đồ và tính tổng số tiền của giỏ hàng.',
      starterCode: `cart = {'sách': 120, 'bút': 15, 'vở': 30}
total = 0

# Viết vòng lặp mở gói cart.items()
`,
      solution: `cart = {'sách': 120, 'bút': 15, 'vở': 30}
total = 0

for item, price in cart.items():
    print(f"Món: {item} - Giá: {price}k")
    total += price

print("Tổng thanh toán:", total, "k")`,
      solutionOutput: `Món: sách - Giá: 120k
Món: bút - Giá: 15k
Món: vở - Giá: 30k
Tổng thanh toán: 165 k`,
      explanation: '<code>cart.items()</code> cung cấp đồng thời tên món hàng vào biến <code>item</code> và giá tiền vào biến <code>price</code>.'
    },
    {
      title: 'Tự viết hàm mô phỏng vòng lặp for thủ công',
      level: 'Vừa',
      description: 'Hãy viết hàm <code>my_for(iterable, func)</code> nhận vào một iterable và một hàm xử lý. Sử dụng <code>iter()</code>, <code>while True</code>, <code>next()</code> và bắt ngoại lệ <code>StopIteration</code> để thực thi <code>func</code> trên từng phần tử.',
      starterCode: `def my_for(iterable, func):
    # Viết mã sử dụng iter() và next()
    pass

my_for({'x': 10, 'y': 20}, print)`,
      solution: `def my_for(iterable, func):
    it = iter(iterable)
    while True:
        try:
            item = next(it)
            func(item)
        except StopIteration:
            break

my_for({'x': 10, 'y': 20}, print)`,
      solutionOutput: `x
y`,
      explanation: 'Hàm minh họa chính xác cơ chế bên dưới của vòng lặp for thông qua việc gọi <code>iter()</code>, <code>next()</code> và ngắt vòng lặp bằng <code>StopIteration</code>.'
    }
  ],

  quiz: [
    {
      question: 'Trong giao thức lặp của Python, ngoại lệ nào được ném ra khi một iterator không còn phần tử nào tiếp theo?',
      options: [
        'IndexError',
        'KeyError',
        'StopIteration',
        'EndOfIterationError'
      ],
      correctIndex: 2,
      explanation: 'Ngoại lệ StopIteration là tín hiệu chuẩn báo hiệu việc kết thúc chu trình lặp của iterator.'
    },
    {
      question: 'Khi thực thi câu lệnh for k, v in D.items():, Python sử dụng cơ chế nào để đưa khóa vào k và giá trị vào v?',
      options: [
        'Phép gán bộ giá trị (tuple assignment / unpacking).',
        'Tự động ép kiểu chuỗi.',
        'Hàm eval().',
        'Bộ tiền xử lý macro C.'
      ],
      correctIndex: 0,
      explanation: 'Cơ chế giải nén tuple (tuple unpacking) tự động bóc tách các phần tử của tuple thành các biến tương ứng.'
    },
    {
      question: 'Phát biểu nào sau đây phân biệt ĐÚNG giữa Iterable và Iterator?',
      options: [
        'Iterable và Iterator là hai tên gọi khác nhau của cùng một đối tượng.',
        'Iterable là đối tượng có thể sinh ra Iterator khi truyền vào iter(); Iterator là đối tượng hỗ trợ next() để duyệt qua từng phần tử.',
        'Iterator chỉ dùng cho số học, Iterable dùng cho chuỗi.',
        'Iterable chỉ duyệt được một lần duy nhất, còn Iterator duyệt được vô tận lần.'
      ],
      correctIndex: 1,
      explanation: 'Iterable là tập hợp nguồn chứa dữ liệu; Iterator là con trỏ trạng thái duyệt tuần tự qua các phần tử khi gọi next().'
    }
  ],

  summary: [
    'Giao thức lặp (Iteration Protocol) là kiến trúc nền tảng cho mọi thao tác duyệt dữ liệu trong Python.',
    'iter(iterable) tạo ra bộ lặp iterator; next(iterator) trả về phần tử tiếp theo hoặc ném StopIteration khi kết thúc.',
    'Vòng lặp for là cú pháp thanh lịch tự động hóa giao thức lặp trong nền.',
    'for k, v in D.items() kết hợp view items() và phép gán tuple để duyệt đồng thời cả khóa và giá trị một cách tự nhiên.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 26–27.'
  ]
};
