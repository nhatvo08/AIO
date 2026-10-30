export default {
  id: 'lp-c10-08',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.8',
  title: 'Lồng Mã Nguồn Sâu Ba Cấp & Đào Sâu eval / exec',
  subtitle: 'Quy tắc thụt lề tăng tiến khi lồng cấu trúc sâu 3 cấp (while › if/elif/else › if/else) và đào sâu cơ chế thực thi động của eval, exec và compile',
  level: 'Trung cấp đến Nâng cao',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ kỹ thuật lồng câu lệnh nhiều cấp (multi-level nesting) trong Python bằng nguyên tắc thụt lề tăng tiến sang phải.',
    'Phân tích chi tiết luồng điều khiển của cấu trúc lồng 3 cấp: vòng lặp while › bộ lọc rẽ nhánh if/elif/else › phân nhánh điều kiện if/else.',
    'Hiểu nguyên lý hoạt động của hàm dựng sẵn eval() trong việc thực thi các biểu thức tùy ý và nhận biết các rủi ro bảo mật nghiêm trọng.',
    'Phân biệt vai trò của eval() (thực thi biểu thức) và exec() (thực thi câu lệnh), cùng hàm compile() biên dịch bytecode.'
  ],

  intuition: {
    title: 'Những chiếc hộp gỗ Matryoshka lồng nhau',
    metaphor: 'Hãy hình dung cấu trúc lồng nhiều cấp giống như bộ búp bê gỗ Matryoshka của Nga. Chiếc hộp lớn nhất bên ngoài cùng là vòng lặp while (chạy liên tục). Mở chiếc hộp lớn ra, bên trong là chiếc hộp thứ hai: cấu trúc rẽ nhánh if/elif/else (phân loại xem khách đưa vào chữ hay số). Mở tiếp nhánh số hợp lệ, bên trong lại chứa chiếc hộp thứ ba: cấu trúc if/else (đánh giá xem con số lớn hay nhỏ). Mỗi lần mở một chiếc hộp lồng sâu hơn vào bên trong, bạn chỉ đơn giản là dịch thước đo sang phải thêm 4 khoảng trắng. Mọi thứ được sắp đặt ngăn nắp và rõ ràng, chiếc hộp nhỏ nằm gọn gàng bên trong chiếc hộp lớn mà không bao giờ bị lẫn lộn.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH CẤU TRÚC LỒNG SÂU 3 CẤP THỤT LỀ</div>
        <div style="padding:10px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;">
          <strong style="color:#8b5cf6;">CẤP 1 (Cột 0):</strong> <code>while True:</code> (Vòng lặp bao ngoài)
          <div style="margin-left:18px;margin-top:6px;padding:8px;background:var(--bg-surface-alt);border:1px solid var(--accent-primary);border-radius:6px;">
            <strong style="color:var(--accent-primary);">CẤP 2 (Cột 4):</strong> <code>if ... / elif ... / else:</code> (Bộ lọc hợp lệ)
            <div style="margin-left:18px;margin-top:6px;padding:8px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
              <strong style="color:var(--success);">CẤP 3 (Cột 8):</strong> <code>if num &lt; 20: ... else: ...</code> (Phân loại giá trị)
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Kỹ Thuật Lồng Mã Nguồn Sâu Ba Cấp',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 19–20 / 21</strong>.</p>
          </div>
        </div>

        <p>Cấu trúc lồng nhau trong Python có thể đưa chúng ta đi xa hơn nữa nếu bài toán thực tế yêu cầu. Chẳng hạn, chúng ta có thể mở rộng tập lệnh chỉ xử lý số nguyên trước đó để <strong>rẽ nhánh sang một trong số các lựa chọn thay thế dựa trên độ lớn tương đối</strong> của một dữ liệu nhập hợp lệ:</p>
        <ul>
          <li>Nếu số nhỏ hơn 20: in ra dòng thông báo <code>"low"</code>.</li>
          <li>Ngược lại (từ 20 trở lên): in giá trị bình phương của nó (<code>num ** 2</code>).</li>
        </ul>

        <p>Đoạn mã hoàn chỉnh lồng 3 cấp trông như sau:</p>
        <pre><code>while True:
    reply = input('Enter text:')
    if reply == 'stop':
        break
    elif not reply.isdigit():
        print('Bad!' * 8)
    else:
        num = int(reply)
        if num &lt; 20:
            print('low')
        else:
            print(num ** 2)
print('Bye')</code></pre>

        <p><strong>Nguyên tắc thụt lề khi lồng nhiều cấp:</strong></p>
        <ol>
          <li><strong>Cấp 1 (Thụt 0 space):</strong> Dòng tiêu đề <code>while True:</code> và câu lệnh dọn dẹp kết thúc <code>print('Bye')</code>.</li>
          <li><strong>Cấp 2 (Thụt 4 spaces):</strong> Khối lệnh thân của <code>while</code>, bao gồm phép nhận dữ liệu <code>reply = input(...)</code> và câu lệnh <code>if / elif / else</code> lọc dữ liệu.</li>
          <li><strong>Cấp 3 (Thụt 8 spaces):</strong> Bên trong mệnh đề <code>else</code> của Cấp 2, chúng ta lồng thêm một câu lệnh <code>if num &lt; 20: ... else: ...</code> mới. Khối lệnh của <code>if num &lt; 20:</code> và <code>else:</code> con này tiếp tục được thụt lề <strong>12 khoảng trắng</strong>!</li>
        </ol>
        <p>Quy tắc của Python vô cùng đơn giản và nhất quán: <em>Mỗi khi mã nguồn mang tính có điều kiện hoặc được lặp lại, chúng ta chỉ đơn giản là thụt lề nó sâu hơn sang phía bên phải</em>.</p>
      `,
      codeExamples: [
        {
          title: 'Chạy thử tập lệnh lồng 3 cấp với dữ liệu thực tế từ sách',
          code: `# Giả lập luồng dữ liệu: '19' -> '20' -> 'hack' -> 'stop'
inputs = ['19', '20', 'hack', 'stop']
it = iter(inputs)

def mock_input(prompt):
    val = next(it)
    print(f"{prompt}{val}")
    return val

while True:
    reply = mock_input('Enter text:')
    if reply == 'stop':
        break
    elif not reply.isdigit():
        print('Bad!' * 8)
    else:
        num = int(reply)
        if num < 20:
            print('low')
        else:
            print(num ** 2)
print('Bye')`,
          output: `Enter text:19
low
Enter text:20
400
Enter text:hack
Bad!Bad!Bad!Bad!Bad!Bad!Bad!Bad!
Enter text:stop
Bye`,
          annotations: [
            { line: 18, text: 'Nhập \'19\': Cấp 3 chạy nhánh if num < 20, in \'low\'.' },
            { line: 20, text: 'Nhập \'20\': Cấp 3 chạy nhánh else, in 20^2 = 400.' },
            { line: 15, text: 'Nhập \'hack\': Cấp 2 chạy nhánh elif not isdigit, in Bad! 8 lần.' },
            { line: 14, text: 'Nhập \'stop\': Cấp 2 chạy nhánh if break, thoát ra in Bye.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Khung Chuyên Sâu: Thực Thi Động với eval, exec và compile',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>🔍</span>
            <span><strong>Ghi chú chuyên sâu từ tác giả: Hoặc chạy bất kỳ thứ gì với eval và exec</strong></span>
          </div>
          <div class="callout-body">
            <p>Trong Chương 5 và 9, chúng ta đã từng bắt gặp hàm dựng sẵn <code>eval()</code> của Python để chuyển đổi chuỗi và đọc file. Mark Lutz chỉ ra rằng <code>eval()</code> cũng sẽ hoạt động thay thế cho <code>float()</code> tại đây, và sẽ cho phép người dùng <strong>nhập vào các biểu thức tính toán tùy ý</strong> (chẳng hạn <code>"2 ** 100"</code> hoặc <code>"math.sqrt(144)"</code> sẽ là dữ liệu nhập hoàn toàn hợp lệ!).</p>
          </div>
        </div>

        <h3>1. Hàm eval(expression, globals, locals)</h3>
        <p>Hàm <code>eval()</code> nhận vào một chuỗi ký tự, coi chuỗi đó là một <strong>biểu thức Python (expression)</strong>, tiến hành phân tích cú pháp, đánh giá giá trị và trả về đối tượng kết quả tính toán được.</p>
        <p><strong>Cảnh báo an ninh tối thượng:</strong> Đây là một công cụ cực kỳ mạnh mẽ nhưng cũng tiềm ẩn các <strong>rủi ro bảo mật nghiêm trọng (lỗ hổng Code Injection)</strong>. Nếu người dùng nhập vào một chuỗi độc hại như <code>"__import__('os').system('rmdir /s /q data')"</code>, hàm <code>eval()</code> sẽ ngây thơ thực thi lệnh xóa sổ ổ cứng! Vì vậy: <em>Nếu bạn không thể hoàn toàn tin tưởng nguồn gốc của chuỗi mã nguồn, hãy luôn dùng các công cụ chuyển đổi chuyên biệt và chặt chẽ như <code>int()</code> và <code>float()</code></em>.</p>

        <h3>2. Hàm exec(statement, globals, locals)</h3>
        <p>Tương tự như <code>eval()</code>, nhưng <code>exec()</code> dùng để <strong>chạy một chuỗi mã nguồn chứa một hoặc nhiều câu lệnh (statements)</strong> thay vì biểu thức, và bản thân nó không trả về giá trị (luôn trả về <code>None</code>). Nó có thể chạy cả một khối định nghĩa hàm, vòng lặp hay câu lệnh <code>import</code> động (được khám phá trong Chương 25).</p>

        <h3>3. Hàm compile(source, filename, mode)</h3>
        <p>Hàm <code>compile()</code> biên dịch trước chuỗi mã nguồn thành một <strong>đối tượng mã bytecode (code object)</strong>. Nếu bạn cần chạy một chuỗi câu lệnh hoặc biểu thức lặp đi lặp lại hàng nghìn lần bằng <code>eval()</code> hay <code>exec()</code>, việc biên dịch trước bằng <code>compile()</code> sẽ giúp tiết kiệm chi phí phân tích cú pháp lặp lại và tăng tốc độ thực thi đáng kể.</p>
      `,
      codeExamples: [
        {
          title: 'Thử nghiệm eval tính toán biểu thức tùy ý & compile bytecode',
          code: `# Dùng eval() đánh giá một biểu thức toán học tùy ý từ chuỗi
bieu_thuc = "2 ** 10 + 24"
ket_qua = eval(bieu_thuc)
print(f"eval('{bieu_thuc}') =", ket_qua)

# Biên dịch trước với compile() sang bytecode
ma_bytecode = compile("x * 10", "<string>", "eval")
x = 5
print("Chạy bytecode đã compile:", eval(ma_bytecode))`,
          output: `eval('2 ** 10 + 24') = 1048
Chạy bytecode đã compile: 50`,
          annotations: [
            { line: 3, text: 'eval phân tích chuỗi \'2 ** 10 + 24\' và tính ra giá trị 1048.' },
            { line: 7, text: 'compile() biên dịch chuỗi thành đối tượng code trước khi eval thực thi.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Giới hạn độ sâu lồng khối lệnh (Nesting Depth)',
        content: 'Mặc dù Python không giới hạn số cấp thụt lề, theo triết lý *The Zen of Python* (PEP 20): <em>"Flat is better than nested" (Phẳng tốt hơn lồng nhau)</em>. Nếu mã nguồn của bạn phải thụt lề sâu hơn 4 hoặc 5 cấp, hãy cân nhắc tách logic đó thành các hàm phụ trợ riêng biệt để mã nguồn dễ đọc và dễ bảo trì hơn.'
      }
    ],
    pitfalls: [
      {
        title: 'Tuyệt đối không dùng eval() cho ứng dụng web công khai',
        content: 'Không bao giờ được truyền trực tiếp dữ liệu từ người dùng (HTTP request, form nhập liệu) vào hàm <code>eval()</code> hoặc <code>exec()</code>. Đây là lỗ hổng bảo mật số 1 (Remote Code Execution) có thể khiến toàn bộ hệ thống máy chủ bị chiếm quyền điều khiển.'
      }
    ],
    deepDive: {
      title: 'Phân biệt 3 chế độ (mode) của hàm compile()',
      content: '<p>Hàm <code>compile(source, filename, mode)</code> nhận đối số <code>mode</code> gồm 3 giá trị: (1) <code>\'eval\'</code> dành cho một biểu thức đơn lẻ; (2) <code>\'exec\'</code> dành cho một chuỗi chứa nhiều câu lệnh; (3) <code>\'single\'</code> dành cho một câu lệnh tương tác đơn lẻ (sẽ in kết quả ra nếu là biểu thức, giống như REPL).</p>'
    }
  },

  exercises: [
    {
      title: 'Vẽ lại sơ đồ điều khiển luồng của mã lồng 3 cấp',
      level: 'Dễ',
      problem: 'Hãy liệt kê toàn bộ các đường đi (execution paths) có thể xảy ra trong một lần lặp của tập lệnh lồng 3 cấp ở mục 1.',
      hint: 'Có 4 nhánh rẽ chính tương ứng với các giá trị nhập: \'stop\', chuỗi chữ, số < 20, và số >= 20.',
      solutionCode: `# 4 nhánh rẽ luồng logic:
# Nhánh 1: reply == 'stop' -> thực thi break, thoát vòng lặp.
# Nhánh 2: not reply.isdigit() -> in 'Bad!' * 8, tiếp tục lặp.
# Nhánh 3: reply.isdigit() VÀ int(reply) < 20 -> in 'low', tiếp tục lặp.
# Nhánh 4: reply.isdigit() VÀ int(reply) >= 20 -> in num ** 2, tiếp tục lặp.
print("Tổng số đường đi logic độc lập: 4 nhánh")`,
      solutionOutput: `Tổng số đường đi logic độc lập: 4 nhánh`,
      explanation: 'Việc xác định rõ 4 đường đi độc lập này là cơ sở để thiết kế bộ kiểm thử (test suite) đạt độ bao phủ nhánh 100% (branch coverage).'
    },
    {
      title: 'Sử dụng eval an toàn với không gian tên hạn chế',
      level: 'Trung bình',
      problem: 'Làm thế nào để sử dụng hàm <code>eval()</code> tính toán biểu thức toán học nhưng khóa chặt không cho phép người dùng truy cập các hàm dựng sẵn nguy hiểm (như <code>__import__</code> hay <code>open</code>)?',
      hint: 'Truyền một từ điển rỗng cho đối số globals: eval(expr, {"__builtins__": {}}).',
      solutionCode: `bieu_thuc_an_toan = "10 + 20 * 3"
# Khóa __builtins__ để ngăn chặn code injection
ket_qua = eval(bieu_thuc_an_toan, {"__builtins__": {}})
print("Kết quả tính toán an toàn:", ket_qua)

# Thử nghiệm chuỗi độc hại sẽ bị chặn đứng:
try:
    eval("open('secret.txt')", {"__builtins__": {}})
except NameError as e:
    print("Đã chặn thành công:", e)`,
      solutionOutput: `Kết quả tính toán an toàn: 70
Đã chặn thành công: name 'open' is not defined`,
      explanation: 'Bằng cách gán <code>{"__builtins__": {}}</code> cho tham số globals của <code>eval()</code>, chúng ta vô hiệu hóa toàn bộ các hàm dựng sẵn nguy hiểm, ngăn chặn kẻ tấn công truy cập hệ thống tệp hay thực thi lệnh shell.'
    }
  ],

  quiz: [
    {
      question: 'Khi lồng một câu lệnh if bên trong một câu lệnh if khác đã nằm trong vòng lặp while, quy tắc thụt lề của Python đòi hỏi điều gì?',
      options: [
        'Mỗi cấp lồng nhau bắt buộc phải sử dụng một ký tự khác nhau (cấp 1 dùng space, cấp 2 dùng tab).',
        'Mỗi cấp lồng nhau chỉ đơn giản là thụt lề sâu hơn sang bên phải một khoảng cách đồng nhất.',
        'Python chỉ cho phép lồng tối đa 2 cấp; cấp thứ 3 sẽ gây SyntaxError.',
        'Các khối lồng sâu bắt buộc phải dùng thêm dấu ngoặc nhọn để phân định.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, khi mã nguồn mang tính có điều kiện hoặc lặp lại nhiều cấp, chúng ta chỉ đơn giản là thụt lề nó sâu hơn sang phía bên phải theo từng cột gióng hàng đồng nhất.'
    },
    {
      question: 'Điểm khác biệt căn bản giữa hàm eval() và hàm exec() trong Python là gì?',
      options: [
        'eval() chạy các hàm toán học, exec() chạy các thuật toán sắp xếp.',
        'eval() đánh giá một biểu thức và trả về kết quả; exec() thực thi một câu lệnh hoặc chuỗi câu lệnh và không trả về kết quả.',
        'eval() chỉ có trong Python 2, exec() chỉ có trong Python 3.',
        'eval() an toàn tuyệt đối, exec() luôn luôn gây lỗi bảo mật.'
      ],
      correctIndex: 1,
      explanation: 'eval() nhận vào một biểu thức và trả về kết quả tính toán; exec() nhận vào câu lệnh (statement) hoặc chuỗi câu lệnh, thực thi chúng và không trả về giá trị.'
    },
    {
      question: 'Tại sao việc dùng eval() để nhận dữ liệu từ người dùng trong các ứng dụng thực tế lại bị coi là nguy hiểm?',
      options: [
        'Vì eval() làm chậm CPU đi 50%.',
        'Vì eval() có thể thực thi bất kỳ đoạn mã độc hại nào do người dùng nhập vào (lỗ hổng Code Injection).',
        'Vì eval() không hỗ trợ số nguyên âm.',
        'Vì eval() bắt buộc phải cài đặt thêm thư viện bên ngoài.'
      ],
      correctIndex: 1,
      explanation: 'eval() thực thi bất kỳ mã Python nào có trong chuỗi, do đó nếu người dùng nhập lệnh hệ thống nguy hiểm (như xóa file, kết nối mạng), eval() sẽ chạy lệnh đó gây hại cho máy chủ.'
    }
  ],

  summary: [
    'Python hỗ trợ cấu trúc lồng nhau tùy ý bằng cách thụt lề tăng tiến sang phải theo các cột dọc nhất quán.',
    'Cấu trúc lồng 3 cấp kết hợp nhịp nhàng giữa vòng lặp tổng quát, bộ lọc dữ liệu hợp lệ và phân loại giá trị chi tiết.',
    'Hàm eval() cho phép thực thi động biểu thức tùy ý nhưng chứa đựng rủi ro bảo mật nghiêm trọng nếu không kiểm soát nguồn gốc.',
    'Hàm exec() chạy chuỗi câu lệnh, và compile() hỗ trợ biên dịch trước sang bytecode để tối ưu hóa hiệu năng lặp lại.'
  ]
};
