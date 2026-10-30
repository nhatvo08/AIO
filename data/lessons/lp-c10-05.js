export default {
  id: 'lp-c10-05',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.5',
  title: 'Vòng lặp Tương tác Cơ bản — Mô hình REPL, while True & Toán tử Walrus :=',
  subtitle: 'Xây dựng chương trình tương tác người dùng kinh điển (REPL), mổ xẻ 4 thành phần: while, input, if một dòng, break và mở rộng với toán tử walrus :=',
  level: 'Cơ bản đến Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu cách thức các quy tắc cú pháp và cấu trúc lồng nhau kết hợp lại trong một chương trình thực tế: vòng lặp tương tác REPL.',
    'Nắm vững cách vận hành của 4 câu lệnh cốt lõi: vòng lặp vô hạn while True, hàm nhập dữ liệu input(), câu lệnh if một dòng, và lệnh thoát break.',
    'Phân tích cơ chế gióng hàng thụt lề liên kết các câu lệnh thành khối thân vòng lặp.',
    'Khám phá khung mở rộng của Mark Lutz: rút gọn mã nguồn từ 4 dòng xuống 2 dòng với biểu thức gán có đặt tên (toán tử walrus :=).'
  ],

  intuition: {
    title: 'Nhân viên lễ tân mẫn cán và Mật mã chia tay',
    metaphor: 'Hãy hình dung vòng lặp tương tác giống như một nhân viên lễ tân trực tại quầy đón khách của khách sạn. Nhân viên này luôn túc trực không rời vị trí (while True:), liên tục chìa sổ đăng ký và lắng nghe yêu cầu của từng vị khách bước vào (reply = input()). Khi khách nói điều gì, người lễ tân nhắc lại thật to và rõ ràng bằng chữ in hoa (reply.upper()). Người lễ tân chỉ tạm dừng công việc và đóng cửa quầy khi nghe đúng mật khẩu quy định: "stop" (if reply == \'stop\': break). Nếu không có mật khẩu này, quầy lễ tân sẽ tiếp tục hoạt động mãi mãi!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHU TRÌNH REPL (READ - EVALUATE - PRINT LOOP) THU NHỎ</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:8px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">1. READ (ĐỌC)</div>
            <div style="font-weight:700;color:var(--accent-primary);">input('Enter text:')</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Nhận chuỗi ký tự</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">2. EVALUATE (ĐÁNH GIÁ)</div>
            <div style="font-weight:700;color:var(--warning);">if reply == 'stop'</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Kiểm tra cờ thoát break</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">3. PRINT (IN)</div>
            <div style="font-weight:700;color:var(--success);">print(reply.upper())</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">In hoa phản hồi</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">4. LOOP (LẶP)</div>
            <div style="font-weight:700;color:#8b5cf6;">while True</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Quay lại bước 1</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bài Toán Vòng Lặp Tương Tác Dòng Lệnh (Console REPL)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 12–14 / 21</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Tệp mã nguồn tương ứng trong gói ví dụ: <code>interact.py</code> (được giới thiệu ở Chương 3).</em></p>
          </div>
        </div>

        <p>Tất cả các quy tắc cú pháp mà chúng ta vừa khảo sát (kết thúc dòng, thụt lề vật lý, dấu hai chấm, dòng nối tiếp) hoạt động hoàn toàn giống nhau ở mọi ngóc ngách của ngôn ngữ Python.</p>
        <p>Để bắt đầu quan sát chúng kết hợp lại trong thực tế, chúng ta hãy cùng xem qua một <strong>ví dụ ngắn gọn nhưng mang tính thực chiến cao</strong>: xây dựng một chương trình tương tác người dùng qua cửa sổ dòng lệnh (console). Giả sử bạn cần viết một chương trình:</p>
        <ul>
          <li>Đọc một hoặc nhiều giá trị do người dùng gõ từ bàn phím.</li>
          <li>Xử lý và in trả về kết quả cho từng giá trị đó.</li>
          <li>Lặp lại liên tục cho đến khi người dùng yêu cầu dừng chương trình.</li>
        </ul>
        <p>Nói cách khác, chúng ta đang viết một <strong>vòng lặp đọc / đánh giá / in (Read / Evaluate / Print Loop — REPL)</strong> kinh điển, tương tự như chính giao diện dòng lệnh tiêu chuẩn của Python.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Xây dựng Vòng Lặp Tương Tác Đơn Giản & Mổ Xẻ 4 Thành Phần',
      content: `
        <p>Trong Python, đoạn mã khuôn mẫu (boilerplate) điển hình cho một vòng lặp tương tác như vậy trông như sau:</p>
        <pre><code>while True:
    reply = input('Enter text:')
    if reply == 'stop': break
    print(reply.upper())</code></pre>

        <p>Đoạn mã này kết hợp <strong>4 câu lệnh then chốt</strong> mà cách thức vận hành của chúng rất trực quan:</p>
        <ol>
          <li><strong>Vòng lặp <code>while</code>:</strong> Là câu lệnh lặp mang tính tổng quát nhất của Python. Nó bao gồm từ khóa <code>while</code>, theo sau bởi biểu thức điều kiện và một khối lệnh được thụt lề. Python sẽ tiếp tục chạy khối lệnh này chừng nào điều kiện vẫn còn đúng (<code>True</code>). Ở đây, điều kiện là hằng số <code>True</code>—vốn luôn luôn đúng—vì vậy vòng lặp sẽ chạy vô hạn cho đến khi gặp lệnh thoát tường minh.</li>
          <li><strong>Hàm dựng sẵn <code>input()</code>:</strong> In chuỗi đối số tùy chọn làm lời nhắc (prompt) và chờ người dùng gõ phím, sau đó trả về phản hồi dưới dạng một đối tượng chuỗi ký tự (<code>str</code>).</li>
          <li><strong>Câu lệnh <code>if</code> một dòng:</strong> Tận dụng quy tắc đặc biệt dành cho câu lệnh phức hợp có thân là câu lệnh đơn: phần thân <code>break</code> xuất hiện ngay sau dấu hai chấm. Cách viết này tiết kiệm một dòng mã thừa mà vẫn rất sáng sủa.</li>
          <li><strong>Câu lệnh <code>break</code>:</strong> Được sử dụng để thoát khỏi vòng lặp ngay lập tức—nó nhảy hoàn toàn ra ngoài câu lệnh vòng lặp, và chương trình sẽ tiếp tục chạy các câu lệnh phía sau vòng lặp.</li>
        </ol>

        <p><strong>Ý nghĩa tổng thể:</strong> Đoạn mã thực hiện chính xác chỉ thị: <em>“Đọc một dòng từ người dùng và in hoa nó cho đến khi người dùng nhập từ 'stop'”</em>.</p>
        <p><strong>Cơ chế thụt lề:</strong> Cả ba dòng bên dưới <code>while True:</code> đều được thụt lề cùng một khoảng cách (4 khoảng trắng) gióng thẳng hàng theo một cột dọc, tạo thành khối lệnh lặp gắn liền với điều kiện <code>while</code>. Khi file mã kết thúc (hoặc gặp một dòng lùi lề), khối lệnh vòng lặp chính thức khép lại.</p>
      `,
      codeExamples: [
        {
          title: 'Mô phỏng phiên chạy tương tác chuẩn xác từ giáo trình',
          code: `# Mã nguồn vòng lặp tương tác (interact.py)
# Giả lập dòng nhập tương tác: 'python' -> '312' -> 'stop'
inputs = ['python', '312', 'stop']
input_iter = iter(inputs)

def mock_input(prompt):
    val = next(input_iter)
    print(f"{prompt}{val}")
    return val

while True:
    reply = mock_input('Enter text:')
    if reply == 'stop': break
    print(reply.upper())`,
          output: `Enter text:python
PYTHON
Enter text:312
312
Enter text:stop`,
          annotations: [
            { line: 12, text: 'Lần lặp 1: Nhập \'python\', in hoa thành \'PYTHON\'.' },
            { line: 12, text: 'Lần lặp 2: Nhập \'312\', chuỗi ký tự số in ra \'312\'.' },
            { line: 13, text: 'Lần lặp 3: Nhập \'stop\', lệnh break lập tức kết thúc vòng lặp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Khung Mở Rộng: Rút Gọn Mã Nguồn với Toán Tử Walrus (:=)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--warning);margin-bottom:20px;">
          <div class="callout-header">
            <span>💡</span>
            <span><strong>Ghi chú chuyên sâu từ tác giả: Rút gọn mã nguồn với toán tử :=</strong></span>
          </div>
          <div class="callout-body">
            <p>Mã nguồn ở phần trước mang tính truyền thống, đơn giản và đóng vai trò như một bài minh họa cú pháp cơ bản. Tuy nhiên, Mark Lutz tiết lộ trước: chúng ta hoàn toàn có thể <strong>rút gọn nó từ bốn dòng xuống còn hai dòng</strong> bằng <strong>biểu thức gán có đặt tên (named assignment, toán tử walrus <code>:=</code>)</strong> được bổ sung trong Python 3.8 (PEP 572):</p>
            <pre><code>while (reply := input('Enter text:')) != 'stop':
    print(reply.upper())</code></pre>
          </div>
        </div>

        <p>Cơ chế hoạt động của biểu thức gán có đặt tên <code>:=</code>:</p>
        <ul>
          <li>Nó vừa <strong>gán giá trị</strong> trả về từ <code>input()</code> cho biến <code>reply</code>, vừa <strong>đồng thời trả về chính giá trị đó</strong> làm kết quả để so sánh ngay với <code>!= 'stop'</code>.</li>
          <li>Hiệu ứng mang lại cho phép chúng ta <strong>vừa lấy dữ liệu, vừa gán biến, vừa kiểm tra điều kiện trên cùng một dòng duy nhất</strong>—và tất cả đều nằm ngay trên dòng tiêu đề của vòng lặp <code>while</code>!</li>
        </ul>
        <p><strong>Lưu ý từ Mark Lutz:</strong> Mặc dù hữu ích trong những vai trò hẹp, biểu thức này cũng đòi hỏi phải có <em>dấu ngoặc đơn lồng nhau</em> trong ngữ cảnh so sánh (để phép gán <code>:=</code> được ưu tiên thực hiện trước toán tử so sánh <code>!=</code>), và có phần mang tính ẩn ý (implicit) hơn so với các dạng thức truyền thống tường minh.</p>
      `,
      codeExamples: [
        {
          title: 'Vòng lặp tương tác 2 dòng sử dụng toán tử walrus :=',
          code: `# Giả lập dữ liệu nhập: 'code' -> 'stop'
inputs = ['code', 'stop']
input_iter = iter(inputs)

def mock_input(prompt):
    val = next(input_iter)
    print(f"{prompt}{val}")
    return val

# Rút gọn 2 dòng: vừa gán vào reply vừa kiểm tra khác 'stop'
while (reply := mock_input('Enter text:')) != 'stop':
    print(reply.upper())`,
          output: `Enter text:code
CODE
Enter text:stop`,
          annotations: [
            { line: 11, text: 'Phép gán walrus gán vào biến reply và trả về giá trị để so sánh != \'stop\'.' },
            { line: 12, text: 'Khối thân vòng lặp thu gọn chỉ còn đúng một dòng in hoa.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tại sao cần dấu ngoặc đơn quanh (reply := ...)?',
        content: 'Toán tử gán walrus <code>:=</code> có độ ưu tiên thấp hơn các toán tử so sánh như <code>!=</code> hay <code>==</code>. Nếu không có ngoặc đơn bao bọc: <code>reply := input() != \'stop\'</code>, Python sẽ đánh giá <code>input() != \'stop\'</code> trước và gán giá trị boolean <code>True/False</code> vào <code>reply</code> thay vì chuỗi văn bản!'
      }
    ],
    pitfalls: [
      {
        title: 'Quên câu lệnh break trong vòng lặp while True',
        content: 'Nếu bạn viết <code>while True:</code> nhưng quên câu lệnh <code>break</code> hoặc điều kiện thoát không bao giờ xảy ra, chương trình sẽ rơi vào <strong>vòng lặp vô hạn (infinite loop)</strong>. Khi chạy trên console, bạn bắt buộc phải nhấn tổ hợp phím <code>Ctrl+C</code> để ngắt cưỡng bức.'
      }
    ],
    deepDive: {
      title: 'Lịch sử PEP 572 và nguồn gốc tên gọi Walrus',
      content: '<p>Toán tử <code>:=</code> được gọi là <strong>toán tử Walrus (Hải mã)</strong> vì hình dáng của dấu hai chấm và dấu bằng <code>:=</code> trông giống như đôi mắt và hai chiếc ngà dài của loài hải mã. Đây từng là một trong những đề xuất PEP gây tranh cãi sôi nổi nhất trong lịch sử Python trước khi được chính thức chấp thuận ở bản 3.8.</p>'
    }
  },

  exercises: [
    {
      title: 'Thêm điều kiện thoát phụ cho vòng lặp tương tác',
      level: 'Dễ',
      problem: 'Hãy sửa đổi vòng lặp tương tác để chương trình dừng lại khi người dùng nhập chuỗi <code>"stop"</code> HOẶC nhập chuỗi <code>"exit"</code>.',
      hint: 'Sử dụng toán tử logic in: if reply in (\'stop\', \'exit\'): break.',
      solutionCode: `inputs = ['hello', 'exit']
it = iter(inputs)

while True:
    reply = next(it)
    print(f"Nhập: {reply}")
    # Kiểm tra cả stop và exit
    if reply in ('stop', 'exit'):
        break
    print(reply.upper())`,
      solutionOutput: `Nhập: hello
HELLO
Nhập: exit`,
      explanation: 'Sử dụng <code>if reply in (\'stop\', \'exit\'): break</code> cho phép mở rộng linh hoạt nhiều từ khóa thoát khác nhau.'
    },
    {
      title: 'Viết lại vòng lặp đọc file từng dòng bằng toán tử walrus',
      level: 'Trung bình',
      problem: 'Dựa vào ví dụ trong Bảng 10-1: <code>while x := file.readline(): print(x)</code>, hãy giải thích cách thức hoạt động của vòng lặp này khi đọc hết file.',
      hint: 'Hàm readline() trả về chuỗi rỗng \'\' khi tới cuối file (EOF), mà chuỗi rỗng trong Python mang giá trị falsy.',
      solutionCode: `# Mô phỏng đọc từng dòng từ một danh sách dòng:
dong_du_lieu = iter(['Dòng 1\\n', 'Dòng 2\\n', ''])

# readline trả về '' khi hết file, '' là falsy -> vòng lặp kết thúc tự nhiên!
while dong := next(dong_du_lieu):
    print(f"Đọc được: {dong.strip()}")`,
      solutionOutput: `Đọc được: Dòng 1
Đọc được: Dòng 2`,
      explanation: 'Khi gặp EOF, <code>readline()</code> trả về chuỗi rỗng <code>\'\'</code>. Phép gán walrus gán <code>\'\'</code> vào biến <code>dong</code> và trả về <code>\'\'</code>, điều kiện while nhận giá trị falsy và tự động dừng mà không cần lệnh break tường minh!'
    }
  ],

  quiz: [
    {
      question: 'Trong vòng lặp tương tác while True:, câu lệnh nào đảm nhận vai trò kết thúc vòng lặp để tránh lặp vô hạn?',
      options: [
        'Câu lệnh continue.',
        'Câu lệnh break.',
        'Câu lệnh pass.',
        'Câu lệnh return ngoài hàm.'
      ],
      correctIndex: 1,
      explanation: 'Câu lệnh break có nhiệm vụ nhảy hoàn toàn ra khỏi vòng lặp ngay lập tức, chấm dứt chu trình lặp vô hạn của while True.'
    },
    {
      question: 'Hàm dựng sẵn input() trong Python trả về dữ liệu thuộc kiểu đối tượng nào?',
      options: [
        'Kiểu số nguyên (int).',
        'Kiểu chuỗi ký tự (str).',
        'Kiểu danh sách (list).',
        'Kiểu dữ liệu tự động suy diễn tùy theo người dùng gõ gì.'
      ],
      correctIndex: 1,
      explanation: 'Hàm input() luôn luôn trả về phản hồi của người dùng dưới dạng một chuỗi ký tự (str), bất kể người dùng gõ chữ hay số.'
    },
    {
      question: 'Ưu điểm chính của toán tử gán walrus (:=) khi áp dụng vào vòng lặp tương tác là gì?',
      options: [
        'Giúp tăng tốc độ xử lý CPU lên gấp 10 lần.',
        'Cho phép vừa gán biến vừa kiểm tra điều kiện ngay trên dòng tiêu đề vòng lặp, rút gọn số dòng mã.',
        'Tự động ép kiểu chuỗi nhập vào sang số nguyên.',
        'Ngăn chặn mọi lỗi ngoại lệ có thể xảy ra trong chương trình.'
      ],
      correctIndex: 1,
      explanation: 'Toán tử walrus := trả về giá trị được gán làm kết quả biểu thức, cho phép kết hợp việc đọc, gán và kiểm tra điều kiện trên cùng dòng tiêu đề while.'
    }
  ],

  summary: [
    'Chương trình tương tác REPL minh họa cách phối hợp nhịp nhàng giữa các câu lệnh: while, input, if một dòng và break.',
    'while True tạo vòng lặp vô hạn tổng quát, kết hợp với break tạo cơ chế thoát vòng lặp tường minh và linh hoạt.',
    'Cả ba câu lệnh con đều được thụt lề cùng cấp, tạo thành khối lệnh lặp được gióng hàng theo một cột dọc.',
    'Toán tử gán có đặt tên (walrus :=) từ Python 3.8 cho phép rút gọn chu trình đọc-gán-kiểm tra dữ liệu từ 4 dòng xuống 2 dòng.'
  ]
};
