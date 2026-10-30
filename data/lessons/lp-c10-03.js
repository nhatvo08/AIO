export default {
  id: 'lp-c10-03',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.3',
  title: 'Cú pháp Thụt lề — Triết lý Trực quan & Bài học Dangling Else từ C',
  subtitle: 'Cơ chế phân định khối bằng độ thụt lề vật lý, mổ xẻ lỗi IndentationError, cạm bẫy "else lơ lửng" kinh điển trong C và nguyên lý "thấy sao chạy vậy"',
  level: 'Cơ bản đến Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững nguyên lý "Hết thụt lề là hết khối lệnh": cách Python sử dụng độ thụt lề đồng nhất để định nghĩa phạm vi khối mã lồng nhau.',
    'Nhận diện và xử lý lỗi IndentationError khi các dòng trong cùng một khối không gióng thẳng hàng theo một cột dọc.',
    'Hiểu sâu sắc lý do thiết kế cú pháp thụt lề: sự mâu thuẫn giữa con người và trình biên dịch trong các ngôn ngữ họ C.',
    'Phân tích cạm bẫy kinh điển "mệnh đề else lơ lửng" (dangling else) trong C và cách Python loại bỏ hoàn toàn sự nhập nhằng này.',
    'Nắm vững quy tắc thực hành: quy ước 4 khoảng trắng và cảnh báo cấm tuyệt đối trộn lẫn Tab và Khoảng trắng.'
  ],

  intuition: {
    title: 'Bậc thang đá và Chiếc thước đo thẳng hàng',
    metaphor: 'Hãy tưởng tượng việc viết mã nguồn giống như việc xếp các bậc thang đá đi vào một hang động sâu. Khi bước vào một căn phòng mới (một khối lệnh lồng nhau), bạn bước sang phải một bậc đá có độ rộng đúng bằng 4 ngón tay. Toàn bộ các công việc trong căn phòng đó phải được thực hiện trên cùng một mặt phẳng bậc đá này. Khi bạn bước lùi sang trái, căn phòng đó lập tức khép lại phía sau lưng bạn. Trong thế giới của Python, không cần ai phải dựng thêm cánh cửa ngoặc nhọn; chỉ cần nhìn vào độ cao và vị trí của bậc đá (cột thụt lề), bất kỳ người lữ hành nào cũng biết ngay mình đang đứng ở căn phòng nào!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">GIẢI MÃ CẠM BẪY DANGLING ELSE: C VS PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="color:var(--danger);font-weight:700;margin-bottom:6px;">TRONG C: THỤT LỀ LỪA DỐI MẮT NGƯỜI</div>
            <pre style="margin:0;color:var(--text-secondary);font-size:0.82rem;line-height:1.4;"><code>if (x)
    if (y)
        statement1;
<span style="color:var(--danger);font-weight:700;">else</span>
    statement2;</code></pre>
            <div style="font-size:0.75rem;color:var(--danger);margin-top:6px;">Mắt tưởng else của if(x), nhưng Compiler C lại ghép vào if(y)!</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;">
            <div style="color:var(--success);font-weight:700;margin-bottom:6px;">TRONG PYTHON: THỊ GIÁC = LOGIC</div>
            <pre style="margin:0;color:var(--text-primary);font-size:0.82rem;line-height:1.4;"><code>if x:
    if y:
        statement1
<span style="color:var(--accent-primary);font-weight:700;">else:</span>
    statement2</code></pre>
            <div style="font-size:0.75rem;color:var(--accent-text);margin-top:6px;">else gióng thẳng hàng với if x:, tuyệt đối không nhập nhằng!</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Hết Thụt Lề là Hết Khối Lệnh & Lỗi IndentationError',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 7–9 / 21</strong>.</p>
          </div>
        </div>

        <p>Điểm khác biệt quan trọng nhất giữa Python và các ngôn ngữ khác: <strong>Python không dùng dấu ngoặc nhọn (<code>{}</code>) để bao quanh các khối lệnh lồng nhau</strong>.</p>
        <p>Thay vào đó, trong Python, chúng ta <strong>thụt lề đồng nhất tất cả các câu lệnh trong một khối lồng nhau về phía bên phải cùng một khoảng cách như nhau</strong>. Sự kết thúc của một khối lệnh đơn giản được báo hiệu bằng việc kết thúc phần thụt lề:</p>
        <blockquote>
          <p><strong>Khi Python gặp một dòng được thụt lề ít hơn khối lệnh hiện tại, nó hiểu rằng khối lệnh đó đã kết thúc.</strong></p>
        </blockquote>
        <p>Chẳng hạn, khi cả hai câu lệnh bên dưới <code>if x &gt; y:</code> đều được thụt lề bốn khoảng trắng, Python biết rằng cả hai đều là một phần của khối lệnh <code>if</code>. Một dòng không thụt lề (hoặc một dòng thụt lề ít hơn) sẽ báo hiệu rằng khối lệnh <code>if</code> đã chấm dứt.</p>
        <p>Nếu bạn không thụt lề các câu lệnh trong cùng một khối một cách nhất quán theo một cột dọc, trình phân tích cú pháp sẽ phát sinh lỗi <code>IndentationError</code> ngay lập tức.</p>
      `,
      codeExamples: [
        {
          title: 'Lỗi IndentationError khi thụt lề không gióng thẳng hàng',
          code: `# Thử nghiệm thụt lề lệch cột trong cùng một khối
try:
    exec("if True:\\n    a = 1\\n   b = 2")
except IndentationError as e:
    print(f"Bắt lỗi: {type(e).__name__}: {e.msg}")
    print(f"Dòng lỗi: {e.text.strip()}")
    print(f"Vị trí con trỏ: {' ' * (e.offset - 1)}^")`,
          output: `Bắt lỗi: IndentationError: unindent does not match any outer indentation level
Dòng lỗi: b = 2
Vị trí con trỏ:   ^`,
          annotations: [
            { line: 3, text: 'Dòng b = 2 chỉ thụt 3 khoảng trắng trong khi dòng a = 1 thụt 4 khoảng trắng.' },
            { line: 5, text: 'Python báo lỗi unindent does not match any outer indentation level vì không khớp cột lề ngoài nào.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Tại Sao Lại Dùng Cú Pháp Thụt Lề?',
      content: `
        <p>Những lập trình viên mới làm quen với Python đôi khi phàn nàn về cú pháp dựa trên thụt lề của nó. Họ thường thắc mắc:</p>
        <ul>
          <li><em>“Tại sao tôi không thể dùng dấu ngoặc nhọn như trong C?”</em></li>
          <li><em>“Cú pháp thụt lề chẳng phải rất nguy hiểm hay sao?”</em></li>
        </ul>
        <p>Đây là những thắc mắc hoàn toàn tự nhiên đối với những người đã quen với cú pháp họ C. Nhưng trong thực tế phát triển phần mềm, <strong>cú pháp thụt lề gần như luôn nhận được sự khen ngợi nồng nhiệt từ các lập trình viên Python dày dạn kinh nghiệm</strong>. Có một vài lý do khoa học giải thích cho điều này:</p>

        <ol>
          <li><strong>Dù thế nào đi nữa bạn cũng bắt buộc phải thụt lề mã nguồn!</strong> Trong các ngôn ngữ như C, C++ và Java, phong cách lập trình chuẩn mực (coding style) đòi hỏi bạn bắt buộc phải thụt lề các khối lệnh lồng nhau để mã nguồn trở nên dễ đọc và có thể bảo trì được.</li>
          <li><strong>Sự chia rẽ nguy hiểm trong C:</strong> Trong C, việc thụt lề hoàn toàn chỉ nhằm phục vụ cho <em>con người đọc</em>; trình biên dịch (compiler) C bỏ qua nó hoàn toàn và chỉ phụ thuộc vào các dấu ngoặc nhọn. Điều này có thể dẫn đến những lỗi tiềm ẩn cực kỳ tai hại khi phần thụt lề thị giác không khớp với dấu ngoặc nhọn logic.</li>
        </ol>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Bài Học Kinh Điển: Mệnh Đề Else Lơ Lửng (Dangling Else) trong C',
      content: `
        <p>Một ví dụ kinh điển trong lịch sử khoa học máy tính là vấn đề <strong>mệnh đề else lơ lửng (dangling else)</strong> trong ngôn ngữ C:</p>
        <pre><code>if (x)
    if (y)
        statement1;
else
    statement2;</code></pre>
        <p>Hãy phân tích đoạn mã C ở trên:</p>
        <ul>
          <li><strong>Thị giác con người:</strong> Cách thụt lề của từ khóa <code>else</code> gióng thẳng hàng với <code>if (x)</code> ở ngoài cùng gợi ý cho người đọc rằng <code>statement2</code> sẽ được chạy khi <code>x</code> mang giá trị sai (false).</li>
          <li><strong>Trình biên dịch C:</strong> Theo quy tắc ngữ pháp của C, từ khóa <code>else</code> luôn tự động gắn kết với lệnh <code>if</code> gần nhất chưa có else—tức là nó thực chất lại gắn với <code>if (y)</code> bên trong! Do đó, nếu <code>x</code> là false, chương trình không làm gì cả; nhưng nếu <code>x</code> là true và <code>y</code> là false thì <code>statement2</code> lại bị kích hoạt! Đây là một lỗi logic chết người.</li>
        </ul>

        <p><strong>Trong Python, sự nhập nhằng này là hoàn toàn không thể xảy ra:</strong></p>
        <pre><code>if x:
    if y:
        statement1
else:
    statement2</code></pre>
        <p>Tại đây, bởi vì <code>else:</code> được gióng thẳng hàng chính xác theo cột dọc với <code>if x:</code> ngoài cùng, ý nghĩa là hoàn toàn tường minh và minh bạch 100%: <code>statement2</code> chỉ thực thi khi <code>x</code> mang giá trị sai (false).</p>
      `,
      codeExamples: [
        {
          title: 'Python triệt tiêu hoàn toàn sự nhập nhằng bằng độ thụt lề',
          code: `def kiem_tra_logic(x, y):
    ket_qua = []
    if x:
        if y:
            ket_qua.append("x True và y True")
    else:
        ket_qua.append("x False (nhánh else ngoài cùng)")
    return ket_qua

print("Test 1 (x=False, y=True):", kiem_tra_logic(False, True))
print("Test 2 (x=True, y=False):", kiem_tra_logic(True, False))`,
          output: `Test 1 (x=False, y=True): ['x False (nhánh else ngoài cùng)']
Test 2 (x=True, y=False): []`,
          annotations: [
            { line: 6, text: 'else gióng hàng với if x: nên khi x=False, nhánh else lập tức chạy.' },
            { line: 11, text: 'Khi x=True nhưng y=False, nhánh else ngoài cùng không chạy, kết quả là danh sách rỗng.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Triết lý "Thấy sao Chạy vậy" & Quy Tắc Thực Hành',
      content: `
        <p>Bằng cách bắt buộc thụt lề phải là một phần của cú pháp, Python đảm bảo một nguyên lý vàng:</p>
        <blockquote>
          <p><strong>Cấu trúc thị giác của chương trình luôn luôn trùng khớp với cấu trúc logic của nó. Những gì bạn nhìn thấy chính là những gì chương trình thực hiện.</strong></p>
        </blockquote>
        <p>Điều này làm cho mã nguồn Python trở nên vô cùng đồng nhất và dễ đọc—ngay cả khi bạn đang phải bảo trì hoặc đọc mã do người khác viết.</p>

        <h3>Hỗ trợ từ các trình soạn thảo (Editor Support)</h3>
        <p>Hầu như mọi trình soạn thảo văn bản hiện đại (IDLE, VS Code, PyCharm) đều tích hợp sẵn cơ chế tự động thụt lề cho Python: khi bạn gõ dấu hai chấm và nhấn Enter, con trỏ tự động lùi vào trong; nhấn phím Backspace sẽ lùi lại một cấp thụt lề.</p>

        <h3>Quy tắc thực hành và Cảnh báo cấm trộn Tab và Space</h3>
        <ul>
          <li><strong>Quy ước chuẩn mực:</strong> <strong>Bốn khoảng trắng (4 spaces)</strong> cho mỗi cấp thụt lề là quy ước phổ biến nhất được PEP 8 khuyến nghị.</li>
          <li><strong>Cảnh báo tối quan trọng:</strong> <strong>Tuyệt đối không được trộn lẫn ký tự Tab và Khoảng trắng</strong> trong cùng một khối lệnh. Trong Python 3, việc trộn lẫn tab và space trong cùng một file sẽ phát sinh lỗi <code>TabError: inconsistent use of tabs and spaces in indentation</code> ngay khi biên dịch sang bytecode.</li>
        </ul>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Cài đặt Editor tự động biến phím Tab thành 4 Spaces',
        content: 'Hãy cấu hình trình soạn thảo của bạn (VS Code, Sublime Text, PyCharm) bật tùy chọn <em>"Insert Spaces when pressing Tab"</em> với kích thước Tab Size = 4. Điều này giúp bạn bấm phím Tab tiện lợi mà mã nguồn vẫn luôn là 4 ký tự khoảng trắng chuẩn mực.'
      }
    ],
    pitfalls: [
      {
        title: 'Lỗi TabError khi sao chép mã nguồn từ internet',
        content: 'Khi copy mã Python từ các trang web hoặc tài liệu khác, rất có thể đoạn mã đó sử dụng ký tự Tab thực (\\t). Nếu dự án của bạn đang dùng khoảng trắng, Python 3 sẽ báo lỗi <code>TabError</code> ngay lập tức. Hãy dùng tính năng <em>"Convert Indentation to Spaces"</em> của editor để chuẩn hóa.'
      }
    ],
    deepDive: {
      title: 'Cú pháp thụt lề và các công cụ phát sinh mã (Code Generators)',
      content: '<p>Nhiều người từng lo ngại việc sinh mã nguồn Python tự động bằng script sẽ khó hơn ngôn ngữ dùng ngoặc nhọn. Tuy nhiên Mark Lutz chỉ ra rằng việc in ra một chuỗi khoảng trắng hoặc tab hoàn toàn không phức tạp hơn việc in ra các dấu ngoặc nhọn <code>{</code> và <code>}</code>. Hơn nữa, việc thụt lề bắt buộc loại bỏ hoàn toàn các cuộc tranh luận vô bổ về vị trí đặt dấu ngoặc nhọn (K&amp;R style vs Allman style).</p>'
    }
  },

  exercises: [
    {
      title: 'Phát hiện vị trí kết thúc của khối lệnh dựa trên độ thụt lề',
      level: 'Dễ',
      problem: 'Trong đoạn mã sau, lệnh <code>print("Kết thúc")</code> có thuộc về khối lệnh của vòng lặp <code>for</code> hay không? Giải thích vì sao.\\n\\n<code>for i in range(3):\\n    print(i)\\nprint("Kết thúc")</code>',
      hint: 'Hãy quan sát xem dòng print cuối cùng có được thụt lề bằng với dòng print(i) hay đã lùi ra ngoài.',
      solutionCode: `for i in range(3):
    print(i)
print("Kết thúc")`,
      solutionOutput: `0
1
2
Kết thúc`,
      explanation: 'Dòng <code>print("Kết thúc")</code> không được thụt lề, tức là đã lùi ra ngoài cùng cấp với từ khóa <code>for</code>. Do đó khối lệnh lồng của vòng lặp đã kết thúc, và dòng này chỉ chạy đúng một lần duy nhất sau khi vòng lặp hoàn tất.'
    },
    {
      title: 'Tái hiện và xử lý sự cố dangling else trong Python',
      level: 'Trung bình',
      problem: 'Viết một đoạn mã Python có hai câu lệnh if lồng nhau để kiểm tra tài khoản: <code>da_dang_nhap</code> và <code>la_admin</code>. Hãy đặt mệnh đề <code>else</code> sao cho nó gắn với lệnh if kiểm tra đăng nhập ngoài cùng (in thông báo "Vui lòng đăng nhập"), chứ không gắn với lệnh if kiểm tra admin.',
      hint: 'Hãy gióng hàng từ khóa else thẳng hàng với từ khóa if kiểm tra đăng nhập ở cột lề ngoài cùng.',
      solutionCode: `da_dang_nhap = False
la_admin = True

if da_dang_nhap:
    if la_admin:
        print("Chào mừng Quản trị viên!")
    else:
        print("Chào mừng Thành viên thông thường!")
else:
    print("Vui lòng đăng nhập để tiếp tục!")`,
      solutionOutput: `Vui lòng đăng nhập để tiếp tục!`,
      explanation: 'Nhờ gióng thẳng hàng <code>else:</code> với <code>if da_dang_nhap:</code>, logic phân nhánh rõ ràng tuyệt đối: khi chưa đăng nhập, chương trình báo ngay thông báo yêu cầu đăng nhập.'
    }
  ],

  quiz: [
    {
      question: 'Python xác định điểm kết thúc của một khối lệnh lồng nhau bằng cách nào?',
      options: [
        'Bằng ký tự dấu chấm phẩy (;).',
        'Bằng dấu ngoặc nhọn đóng (}).',
        'Bằng từ khóa end if hoặc end while.',
        'Bằng một dòng được thụt lề ít hơn khối lệnh hiện tại (hết thụt lề).'
      ],
      correctIndex: 3,
      explanation: 'Sự kết thúc của một khối lệnh đơn giản được báo hiệu bằng việc kết thúc phần thụt lề: khi Python gặp một dòng thụt lề ít hơn khối lệnh hiện tại, nó hiểu rằng khối lệnh đó đã kết thúc.'
    },
    {
      question: 'Vấn đề kinh điển "mệnh đề else lơ lửng" (dangling else) trong ngôn ngữ C xảy ra do nguyên nhân nào?',
      options: [
        'Do thiếu bộ nhớ RAM khi chạy lệnh if lồng nhau.',
        'Do việc thụt lề thị giác không khớp với quy tắc cú pháp ngầm định gắn else vào if gần nhất của compiler C.',
        'Do ngôn ngữ C không cho phép sử dụng từ khóa else quá hai lần.',
        'Do lập trình viên quên khai báo biến kiểu boolean.'
      ],
      correctIndex: 1,
      explanation: 'Trong C, thụt lề chỉ phục vụ mắt người; compiler bỏ qua thụt lề và luôn tự động gắn else với if gần nhất chưa có else, dẫn đến sự nhập nhằng chết người nếu thụt lề sai.'
    },
    {
      question: 'Điều gì sẽ xảy ra trong Python 3 nếu bạn trộn lẫn ký tự Tab và Khoảng trắng (spaces) trong cùng một khối lệnh?',
      options: [
        'Python tự động chuyển đổi tab thành 4 khoảng trắng mà không thông báo gì.',
        'Chương trình chạy bình thường nhưng tốc độ bị chậm đi.',
        'Python sẽ phát sinh lỗi TabError (hoặc IndentationError) và dừng thực thi ngay lập tức.',
        'Python chỉ đưa ra một cảnh báo nhẹ (warning) trong console.'
      ],
      correctIndex: 2,
      explanation: 'Python 3 cấm tuyệt đối việc trộn lẫn tab và khoảng trắng để thụt lề trong cùng một khối và sẽ phát sinh lỗi biên dịch TabError.'
    }
  ],

  summary: [
    'Python sử dụng độ thụt lề vật lý đồng nhất sang phải để định nghĩa ranh giới các khối lệnh lồng nhau.',
    'Các câu lệnh trong cùng một khối bắt buộc phải gióng thẳng hàng theo một cột dọc duy nhất; lệch cột sẽ gây lỗi IndentationError.',
    'Cú pháp thụt lề loại bỏ hoàn toàn cạm bẫy "else lơ lửng" (dangling else) kinh điển của ngôn ngữ họ C.',
    'Triết lý vàng của Python: Cấu trúc thị giác luôn trùng khớp với cấu trúc logic — những gì bạn nhìn thấy chính là những gì chương trình thực hiện.',
    'Quy ước chuẩn mực là 4 khoảng trắng; tuyệt đối không trộn lẫn Tab và Khoảng trắng trong cùng một khối lệnh.'
  ]
};
