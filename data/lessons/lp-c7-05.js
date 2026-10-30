export default {
  id: 'lp-c7-05',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.5',
  title: 'Thao tác chuỗi cơ bản: Phép nối (+), Phép lặp (*), for & Toán tử in',
  subtitle: 'Phép nối chuỗi tạo đối tượng mới, phép nhân lặp lại, nạp chồng toán tử, tính đa hình, định kiểu mạnh chặt chẽ và duyệt chuỗi bằng vòng lặp',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững các biểu thức thao tác cơ bản trên chuỗi: tính độ dài bằng len(), phép nối chuỗi (+) và phép nhân lặp lại (*).',
    'Hiểu nguyên lý nạp chồng toán tử (operator overloading) và tính đa hình (polymorphism) khi áp dụng + và * cho chuỗi.',
    'Nhận biết tính định kiểu mạnh (strong typing) của Python: cấm cộng lẫn số và chuỗi (\'abc\' + 9 gây lỗi TypeError).',
    'Thành thạo kỹ thuật duyệt chuỗi bằng vòng lặp for và kiểm tra sự tồn tại của ký tự hay chuỗi con bằng toán tử in.'
  ],

  intuition: {
    title: 'Gia công và nhân bản trên dây chuyền tự động',
    metaphor: 'Hãy hình dung các chuỗi ký tự trong Python giống như các thanh ray kim loại có chiều dài tùy ý. Toán tử cộng (+) đóng vai trò như một cỗ máy hàn tự động: đặt hai thanh ray cạnh nhau, máy sẽ hàn chúng lại thành một thanh ray mới dài gấp đôi mà bạn không cần phải tính toán hay xin cấp phát thêm đất (bộ nhớ). Toán tử nhân (*) là chiếc máy dập khuôn siêu tốc: thay vì bạn phải tự tay xếp 80 thanh ray giống hệt nhau, bạn chỉ cần yêu cầu "thanh ray này nhân với 80", Python sẽ dập ra một chuỗi nối dài 80 lần chỉ trong một tích tắc. Và khi bạn muốn kiểm tra từng bu lông trên thanh ray đó, người bảo trì (vòng lặp for) sẽ tự động rảo bước từ đầu thanh đến cuối thanh một cách tuần tự.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CÁC THAO TÁC CƠ BẢN TRÊN DÃY TUẦN TỰ CHUỖI</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. Nối Chuỗi (+)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
              <code>'abc' + 'def'</code><br>
              ➔ <code>'abcdef'</code><br>
              Tạo ra đối tượng mới trong RAM
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">2. Lặp Lại (*)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
              <code>'Py!' * 3</code><br>
              ➔ <code>'Py!Py!Py!'</code><br>
              Tương đương cộng dồn nhiều lần
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);">3. Kiểm Tra (in)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
              <code>'k' in 'hacker'</code><br>
              ➔ <code>True</code><br>
              Tìm kiếm ký tự hoặc chuỗi con
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Chuỗi trong Thực tế Hoạt động & Các Thao tác Cơ bản',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 13 / 52 – Trang 14 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Một khi bạn đã tạo ra một chuỗi bằng các biểu thức hằng chuỗi mà chúng ta vừa khảo sát, gần như chắc chắn bạn sẽ muốn làm gì đó với nó. Tuyến công cụ đầu tiên phục vụ việc xử lý văn bản trong Python chính là các toán tử biểu thức cơ bản.</p>

        <p>Chúng ta hãy bắt đầu bằng cách tương tác với trình thông dịch Python để minh họa các thao tác chuỗi cơ bản đã được liệt kê trước đó trong Bảng 7-1:</p>
        <ul>
          <li><strong>Hàm dựng sẵn <code>len()</code>:</strong> Trả về độ dài (số lượng phần tử ký tự) của một chuỗi.</li>
          <li><strong>Toán tử cộng (<code>+</code>):</strong> Nối các chuỗi lại với nhau, tạo ra một đối tượng chuỗi mới chứa nội dung của các toán hạng ghép lại.</li>
          <li><strong>Toán tử nhân (<code>*</code>):</strong> Lặp lại chuỗi theo số lần quy định (giống như việc cộng một chuỗi với chính nó nhiều lần).</li>
        </ul>

        <p>Trong cả hai trường hợp nối và nhân chuỗi, Python cho phép bạn tạo ra các chuỗi có kích thước tùy ý; không cần phải khai báo trước bất kỳ điều gì, kể cả kích thước hay dung lượng bộ nhớ. Bạn chỉ việc xây dựng các đối tượng khi cần và để cơ chế quản lý bộ nhớ tự động của Python lo liệu bên dưới (như đã học ở Chương 6).</p>
      `,
      codeExamples: [
        {
          title: 'Các thao tác cơ bản: len, cộng chuỗi và nhân lặp chuỗi',
          code: `# Độ dài chuỗi
print("len('abc'):", len('abc'))

# Phép nối chuỗi: tạo một chuỗi mới
s = 'abc' + 'def'
print("'abc' + 'def':", s)

# Phép lặp lại: tương đương 'Py!' + 'Py!' + 'Py!' + 'Py!'
rep = 'Py!' * 4
print("'Py!' * 4:", rep)`,
          output: `len('abc'): 3
'abc' + 'def': abcdef
'Py!' * 4: Py!Py!Py!Py!`,
          annotations: [
            { line: 2, text: 'len(\'abc\') trả về 3 ký tự.' },
            { line: 5, text: 'Toán tử + cấp phát đối tượng mới \'abcdef\' trong RAM.' },
            { line: 10, text: 'Toán tử * 4 lặp lại chuỗi 4 lần.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Nạp chồng Toán tử, Đa hình & Ràng buộc Định kiểu Mạnh',
      content: `
        <p>Phép lặp chuỗi thoạt nhìn có vẻ hơi lạ lẫm nếu bạn đến từ ngôn ngữ khác, nhưng nó lại rất tiện dụng trong nhiều tình huống bất ngờ. Ví dụ, để in một đường phân cách gồm 80 dấu gạch ngang, bạn không cần phải tự đếm đến 80 hay gõ thủ công, mà chỉ cần để Python làm giúp bạn:</p>
        <pre class="code-pre"><code>print('-' * 80) # 80 dấu gạch ngang, cách dễ dàng và chuẩn xác</code></pre>

        <p>Hãy chú ý rằng <strong>nạp chồng toán tử (operator overloading)</strong> và <strong>tính đa hình (polymorphism)</strong> đã được nhắc đến ở Chương 5 đã hoạt động ngay tại đây: chúng ta đang dùng cùng các toán tử <code>+</code> và <code>*</code> vốn thực hiện phép cộng và phép nhân số học khi làm việc với số. Python tự động thực hiện đúng thao tác vì nó nhận biết được kiểu của các đối tượng đang tham gia biểu thức.</p>

        <p>Tuy nhiên, các quy tắc không hoàn toàn thoải mái như bạn nghĩ. Python là một ngôn ngữ có <strong>định kiểu mạnh chặt chẽ (strongly typed)</strong>: nó không cho phép bạn trộn lẫn số và chuỗi xung quanh toán tử <code>+</code>. Biểu thức <code>'abc' + 9</code> sẽ lập tức gây ra lỗi <code>TypeError</code> thay vì tự động ép kiểu số 9 thành chuỗi (chúng ta sẽ khắc phục điều này bằng các hàm chuyển đổi ở bài sau):</p>
      `,
      codeExamples: [
        {
          title: 'Đa hình toán tử và lỗi TypeError khi trộn lẫn số và chuỗi',
          code: `# Tính đa hình: toán tử thích ứng theo kiểu dữ liệu
print("Cộng số:", 2 + 3)
print("Cộng chuỗi:", '2' + '3')

# Phân cách dòng cực kỳ tiện lợi
print('=' * 40)

# Cố tình cộng chuỗi và số nguyên:
try:
    result = 'abc' + 9
except TypeError as e:
    print("Bắt lỗi thành công:", e)`,
          output: `Cộng số: 5
Cộng chuỗi: 23
========================================
Bắt lỗi thành công: can only concatenate str (not "int") to str`,
          annotations: [
            { line: 2, text: 'Toán tử + thực hiện phép cộng toán học khi cả hai là int.' },
            { line: 3, text: 'Toán tử + thực hiện ghép nối chuỗi khi cả hai là str.' },
            { line: 6, text: '\'=\' * 40 tạo ra đúng 40 dấu bằng.' },
            { line: 12, text: 'TypeError: Python từ chối tự phỏng đoán xem bạn muốn \'abc9\' hay tính toán số.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Duyệt Chuỗi bằng Vòng lặp for & Kiểm tra Thành viên với in',
      content: `
        <p>Bởi vì chuỗi là một dãy tuần tự (sequence), bạn có thể lặp qua các ký tự của nó bằng câu lệnh <strong>vòng lặp <code>for</code></strong>, và kiểm tra tư cách thành viên đối với cả ký tự lẫn chuỗi con bằng <strong>toán tử biểu thức <code>in</code></strong>:</p>
        <ul>
          <li><strong>Vòng lặp <code>for c in S:</code>:</strong> Gán biến <code>c</code> cho từng ký tự liên tiếp trong chuỗi từ trái sang phải và thực thi khối lệnh được thụt lề cho mỗi ký tự.</li>
          <li><strong>Toán tử <code>in</code>:</strong> Thực chất là một phép tìm kiếm trả về giá trị Boolean (<code>True</code> hoặc <code>False</code>). Đối với chuỗi con, <code>in</code> rất giống với phương thức <code>find()</code>, nhưng nó cho kết quả đúng/sai ngắn gọn hơn thay vì vị trí số:</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Duyệt chuỗi bằng for và tìm kiếm chuỗi con bằng in',
          code: `myjob = 'hacker'

# Duyệt qua các ký tự và in cách nhau bởi khoảng trắng
print("Duyệt từng ký tự: ", end='')
for c in myjob:
    print(c, end=' ')
print()

# Kiểm tra ký tự đơn lẻ
print("'k' in myjob:", 'k' in myjob)
print("'z' in myjob:", 'z' in myjob)

# Kiểm tra chuỗi con nhiều ký tự
print("'HACK' in 'abcHACKdef':", 'HACK' in 'abcHACKdef')
print("'ack' in myjob:", 'ack' in myjob)`,
          output: `Duyệt từng ký tự: h a c k e r 
'k' in myjob: True
'z' in myjob: False
'HACK' in 'abcHACKdef': True
'ack' in myjob: True`,
          annotations: [
            { line: 5, text: 'Biến c lần lượt nhận các ký tự \'h\', \'a\', \'c\', \'k\', \'e\', \'r\'.' },
            { line: 6, text: 'end=\' \' thay thế ký tự dòng mới mặc định của print bằng dấu cách.' },
            { line: 10, text: '\'k\' in myjob trả về True vì ký tự \'k\' có mặt trong \'hacker\'.' },
            { line: 14, text: 'Toán tử in hỗ trợ tìm kiếm cả cụm chuỗi con nhiều ký tự.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tạo văn bản lặp lại định dạng bảng cực nhanh',
        content: 'Khi cần tạo các tiêu đề bảng hoặc khung viền cho console log, hãy dùng phép nhân chuỗi: <code>header = '+' + '-' * 30 + '+'</code> sẽ tạo ra một khung viền thẳng tắp 32 ký tự hoàn hảo mà không cần đếm thủ công.'
      }
    ],
    pitfalls: [
      {
        title: 'Hiệu năng khi nối chuỗi trong vòng lặp lớn',
        content: `Bởi vì chuỗi là bất biến, việc dùng toán tử <code>+</code> dồn dập trong một vòng lặp hàng ngàn lần (<code>s += line</code>) sẽ liên tục cấp phát và sao chép vùng nhớ mới. Với dữ liệu lớn, hãy gom vào danh sách rồi dùng <code>''.join(list_data)</code> như chúng ta sẽ tìm hiểu ở Bài C7.11.`
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo thanh tiến trình văn bản (ASCII Progress Bar) bằng toán tử chuỗi',
      level: 'Dễ',
      problem: 'Hãy viết một hàm render_progress_bar(percent, width=20) nhận vào một số nguyên từ 0 đến 100 và độ rộng thanh bar, sau đó sử dụng các toán tử chuỗi (+ và *) để tạo ra một thanh tiến trình dạng: "[========>------------] 40%".',
      hint: 'Tính số lượng dấu \'=\' bằng công thức int(width * percent / 100), số dấu \'-\' còn lại bằng width trừ đi số dấu \'=\'.',
      solutionCode: `def render_progress_bar(percent, width=20):
    filled_len = int(width * percent / 100)
    empty_len = width - filled_len
    
    # Tạo thanh bar bằng toán tử * và +
    bar = '=' * filled_len + '>' + '-' * (empty_len - 1) if empty_len > 0 else '=' * width
    return f"[{bar}] {percent}%"

print(render_progress_bar(40))
print(render_progress_bar(75))
print(render_progress_bar(100))`,
      solutionOutput: `[========>-----------] 40%
[===============>----] 75%
[====================] 100%`,
      explanation: 'Phép lặp chuỗi * kết hợp với phép nối chuỗi + cho phép chúng ta tạo ra các giao diện văn bản thanh tiến trình động cực kỳ ngắn gọn, thanh lịch mà không cần bất kỳ thư viện ngoài nào.'
    }
  ],

  quiz: [
    {
      question: 'Khi thực hiện biểu thức \'Py\' * 3 trong Python, cơ chế bên dưới hoạt động như thế nào?',
      options: [
        'Python sửa đổi chuỗi \'Py\' tại chỗ và tăng kích thước vùng nhớ lên gấp 3 lần.',
        'Python nạp chồng toán tử nhân để tạo ra một đối tượng chuỗi mới tinh có giá trị \'PyPyPy\'.',
        'Python chuyển đổi \'Py\' sang kiểu số trước khi thực hiện phép nhân số học.',
        'Python báo lỗi TypeError vì toán tử nhân chỉ được định nghĩa cho kiểu số.'
      ],
      correctIndex: 1,
      explanation: 'Nhờ cơ chế nạp chồng toán tử (operator overloading), toán tử * khi tác động lên chuỗi sẽ thực hiện phép nhân bản tuần tự và tạo ra một đối tượng chuỗi mới trong bộ nhớ.'
    },
    {
      question: 'Điều gì xảy ra khi bạn chạy dòng mã sau: result = \'Value: \' + 100',
      options: [
        'result nhận chuỗi \'Value: 100\' nhờ tính năng tự động ép kiểu.',
        'result nhận chuỗi \'Value: \' kèm theo ký tự có mã ASCII 100.',
        'Python báo lỗi TypeError: can only concatenate str (not "int") to str.',
        'Python tạo ra một đối tượng tuple: (\'Value: \', 100).'
      ],
      correctIndex: 2,
      explanation: 'Python là ngôn ngữ định kiểu mạnh. Nó từ chối tự động chuyển đổi kiểu số sang chuỗi trong biểu thức nối +, và bắt buộc người lập trình phải chuyển đổi tường minh bằng str(100).'
    }
  ],

  summary: [
    'len() trả về số lượng ký tự của chuỗi; + nối chuỗi tạo đối tượng mới; * nhân bản chuỗi nhiều lần.',
    'Nạp chồng toán tử và tính đa hình giúp + và * tự động thích ứng với kiểu dữ liệu đang tham gia biểu thức.',
    'Python định kiểu mạnh chặt chẽ: cấm cộng lẫn số và chuỗi (\'abc\' + 9 gây lỗi TypeError).',
    'Vòng lặp for duyệt tuần tự qua từng ký tự của chuỗi từ trái sang phải.',
    'Toán tử in kiểm tra nhanh sự tồn tại của một ký tự hoặc một chuỗi con, trả về kết quả Boolean True/False.'
  ]
};
