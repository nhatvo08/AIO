export default {
  id: 'lp-c4-09-3',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.9.3',
  title: 'Tệp: Các công cụ Nâng cao tương tự Tệp',
  subtitle: 'Pipes, Sockets mạng, cơ sở dữ liệu DBM, hệ thống lưu trữ bền vững shelve, và luồng bộ nhớ StringIO',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên lý thiết kế "Giao diện giống tệp" (File-like Interface) và tính đa hình trong kiến trúc I/O của Python.',
    'Nhận biết các công cụ giao tiếp nâng cao: Pipes (đường ống liên tiến trình) và Sockets (mạng Internet).',
    'Khám phá cơ chế lưu trữ bền vững đối tượng Python qua module shelve và cơ sở dữ liệu DBM.',
    'Làm quen với luồng bộ nhớ ảo trong RAM: io.StringIO và io.BytesIO.'
  ],

  intuition: {
    title: 'Cùng một chiếc phích cắm cho mọi thiết bị điện',
    metaphor: 'Trong Python, khái niệm "Tệp" không chỉ bó hẹp ở một tệp tin có đuôi .txt hay .pdf nằm trên ổ cứng. Python thiết kế một giao diện chuẩn mực (chiếc phích cắm 3 chấu: read(), write(), close()). Bất kể đầu bên kia cắm vào một tệp trên đĩa, một cổng socket nối với máy chủ ở Mỹ, một đường ống pipe nói chuyện với tiến trình bên cạnh, hay một biến chuỗi tạm thời trong RAM (StringIO) — toàn bộ mã nguồn của bạn đều có thể đọc ghi dữ liệu mà không cần phải thay đổi một dòng code nào.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">GIAO DIỆN GIỐNG TỆP (FILE-LIKE INTERFACE)</div>
        <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:8px;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);font-size:0.8rem;">Ổ đĩa cứng</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">open()</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);font-size:0.8rem;">Mạng Internet</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">socket.makefile()</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);font-size:0.8rem;">Đĩa từ khóa</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">shelve.open()</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--text-secondary);border-radius:6px;">
            <div style="font-weight:700;color:var(--text-primary);font-size:0.8rem;">Bộ nhớ RAM</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">io.StringIO()</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);font-weight:600;">Tất cả đều hỗ trợ phương thức thống nhất: .read(), .write(), .close()</div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Giao diện Giống tệp (File-like Interfaces)',
      content: `
        <p>Trong hệ sinh thái Python, đối tượng tệp cốt lõi thiết lập một quy chuẩn thiết kế cực kỳ quan trọng: bất kỳ đối tượng nào cung cấp các phương thức như <code>read()</code> hoặc <code>write()</code> đều được coi là một <strong>"đối tượng giống tệp" (file-like object)</strong>.</p>
        <p>Nhờ nguyên lý đa hình (polymorphism), các hàm trong Python được thiết kế để nhận một đối tượng tệp có thể làm việc trơn tru với bất kỳ đối tượng nào tuân thủ giao diện này mà không cần quan tâm dữ liệu thực sự nằm ở đâu.</p>
      `
    },
    {
      id: 'sec-2',
      title: '2. Các Công cụ Nâng cao trong Thư viện chuẩn',
      content: `
        <p>Mark Lutz liệt kê các công cụ dựa trên mô hình đối tượng tệp được tích hợp sẵn trong Python:</p>
        <ul>
          <li><strong>Pipes (Đường ống liên tiến trình):</strong> Cho phép một chương trình Python kết nối và truyền dữ liệu trực tiếp với một tiến trình hoặc chương trình dòng lệnh khác của hệ điều hành.</li>
          <li><strong>Sockets (Giao tiếp mạng):</strong> Cung cấp giao diện để gửi và nhận dữ liệu qua mạng LAN hoặc Internet bằng giao thức TCP/IP. Phương thức <code>socket.makefile()</code> cho phép bọc một kết nối mạng vào một đối tượng tệp thông thường.</li>
          <li><strong>Cơ sở dữ liệu DBM:</strong> Hệ thống lưu trữ tệp trên đĩa truy cập theo cơ chế bảng băm dựa trên khóa.</li>
          <li><strong>Hệ thống shelve:</strong> Thư viện cực kỳ tiện lợi kết hợp <code>pickle</code> và <code>dbm</code>, cho phép bạn lưu trữ các đối tượng Python phức tạp (kể cả danh sách, từ điển, thể hiện lớp) vào tệp đĩa bền vững và truy xuất lại bằng cú pháp từ điển quen thuộc <code>db['key'] = obj</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Lưu trữ đối tượng bền vững ra đĩa với module shelve',
          code: `>>> import shelve
>>> db = shelve.open('persondb')    # Mở hoặc tạo tệp cơ sở dữ liệu persondb
>>> rec = {'name': 'Bob', 'jobs': ['dev', 'mgr']}
>>> db['bob'] = rec                 # Lưu toàn bộ từ điển rec vào đĩa với khóa 'bob'
>>> db.close()                      # Đóng cơ sở dữ liệu
>>> 
>>> db = shelve.open('persondb')    # Mở lại ở một lần chạy khác
>>> db['bob']['name']               # Dữ liệu đối tượng được khôi phục nguyên vẹn
'Bob'
>>> db.close()`,
          output: `'Bob'`,
          annotations: [
            { line: 2, text: 'shelve.open tạo ra một tệp hoạt động y như từ điển nhưng lưu bền vững trên đĩa.' },
            { line: 4, text: 'Gán đối tượng Python phức tạp vào đĩa một cách hoàn toàn tự động.' },
            { line: 8, text: 'Dữ liệu được khôi phục chính xác mà không cần tự phân tích chuỗi văn bản.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Luồng Tệp Ảo trong Bộ nhớ: io.StringIO và io.BytesIO',
      content: `
        <p>Khi bạn muốn kiểm thử (unit test) các đoạn mã ghi tệp mà không muốn tạo ra các tệp rác trên ổ đĩa cứng, hoặc khi bạn muốn tái sử dụng các hàm nhận đối tượng tệp để xử lý một chuỗi văn bản trong RAM, thư viện chuẩn cung cấp module <code>io</code>:</p>
        <ul>
          <li><code>io.StringIO</code>: Tạo một đối tượng tệp ảo trong RAM xử lý chuỗi ký tự (str).</li>
          <li><code>io.BytesIO</code>: Tạo một đối tượng tệp ảo trong RAM xử lý chuỗi byte nhị phân (bytes).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Đọc và ghi tệp ảo trong bộ nhớ với io.StringIO',
          code: `>>> import io
>>> buffer = io.StringIO()
>>> buffer.write("Dòng 1 trong RAM\\n")
18
>>> buffer.write("Dòng 2 trong RAM\\n")
18
>>> buffer.seek(0)                  # Quay con trỏ đọc về đầu bộ đệm
0
>>> buffer.read()
'Dòng 1 trong RAM\\nDòng 2 trong RAM\\n'`,
          output: `18
18
0
'Dòng 1 trong RAM\\nDòng 2 trong RAM\\n'`,
          annotations: [
            { line: 2, text: 'buffer hoạt động hoàn toàn như một đối tượng tệp thật nhưng chỉ nằm trong RAM.' },
            { line: 6, text: 'buffer.seek(0) di chuyển con trỏ đọc về vị trí byte đầu tiên.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'shelve không theo dõi các thay đổi cấu trúc con tại chỗ',
        content: `
          <p>Mặc định, nếu bạn viết <code>db['bob']['jobs'].append('janitor')</code>, sự thay đổi này có thể <em>không được ghi xuống đĩa</em> vì <code>shelve</code> chỉ ghi lại khi có phép gán trực tiếp lên khóa cấp cao nhất. Để lưu lại, bạn phải gán lại <code>temp = db['bob']; temp['jobs'].append('janitor'); db['bob'] = temp</code> hoặc mở shelve với tham số <code>writeback=True</code>.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Chuyển hướng sys.stdout vào tệp hoặc giao diện đồ họa',
        content: `
          <p>Trong Python, lệnh <code>print()</code> thực chất chỉ gọi phương thức <code>sys.stdout.write()</code>. Do đó, bạn có thể chuyển hướng toàn bộ các thông báo <code>print()</code> của chương trình vào một tệp tin hoặc một ô chữ trên giao diện cửa sổ GUI chỉ bằng một phép gán đơn giản: <code>sys.stdout = my_file_or_widget</code>.</p>
        `
      }
    ],
    deepDive: {
      title: 'Triết lý Duck Typing trong kiến trúc I/O của Python',
      content: `
        <p>Thuật ngữ <strong>Duck Typing</strong> (<em>"Nếu nó đi như một con vịt và kêu như một con vịt, thì nó là một con vịt"</em>) là nền tảng cốt lõi của Python. Một hàm xử lý tệp trong Python không bao giờ kiểm tra <code>if type(f) is file:</code>. Nó chỉ đơn giản gọi <code>f.read()</code>. Bất kỳ đối tượng nào cung cấp phương thức <code>read()</code> đều được coi là một tệp hợp lệ.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Chụp lại luồng xuất stdout với io.StringIO',
      level: 'Dễ',
      description: 'Hãy dùng <code>io.StringIO</code> và chuyển hướng tạm thời <code>sys.stdout</code> để bắt lấy dòng chữ in ra từ lệnh <code>print("Xin chào Python!")</code> thành một biến chuỗi mà không cho nó hiển thị ra màn hình terminal.',
      starterCode: `import io
import sys

# Chụp lại output của lệnh print
`,
      solution: `import io
import sys

old_stdout = sys.stdout
captured_buffer = io.StringIO()
sys.stdout = captured_buffer

# Lệnh print được chuyển hướng vào buffer
print("Xin chào Python!")

# Khôi phục lại stdout chuẩn
sys.stdout = old_stdout

captured_text = captured_buffer.getvalue().strip()
print("Văn bản đã chụp được:", captured_text)`,
      solutionOutput: `Văn bản đã chụp được: Xin chào Python!`,
      explanation: 'Gán <code>sys.stdout = captured_buffer</code> cho phép thu thập mọi dữ liệu xuất ra của chương trình vào RAM.'
    },
    {
      title: 'Lưu và nạp phiên làm việc người dùng với shelve',
      level: 'Vừa',
      description: 'Viết đoạn mã sử dụng <code>shelve</code> để lưu thông tin phiên làm việc <code>session = {\'user\': \'admin\', \'tokens\': 5}</code> vào tệp <code>mysession</code>. Sau đó mở lại để kiểm tra xem <code>tokens</code> có đúng là 5 hay không.',
      starterCode: `import shelve

# Lưu session vào mysession
# Mở lại và kiểm tra
`,
      solution: `import shelve

# Lưu phiên làm việc
with shelve.open('mysession') as db:
    db['session'] = {'user': 'admin', 'tokens': 5}

# Nạp lại phiên làm việc
with shelve.open('mysession') as db:
    loaded_session = db['session']
    print("User:", loaded_session['user'])
    print("Tokens:", loaded_session['tokens'])`,
      solutionOutput: `User: admin
Tokens: 5`,
      explanation: 'Module <code>shelve</code> cung cấp cách lưu trữ đối tượng dạng từ điển vĩnh viễn trên đĩa cực kỳ đơn giản và mạnh mẽ.'
    }
  ],

  quiz: [
    {
      question: 'Khái niệm "File-like object" (đối tượng giống tệp) trong Python chỉ những đối tượng nào?',
      options: [
        'Chỉ các tệp tin có phần mở rộng .txt trên đĩa.',
        'Bất kỳ đối tượng nào hỗ trợ các phương thức chuẩn của tệp như read(), write(), close().',
        'Các lớp kế thừa từ lớp built-in FileClass.',
        'Các tệp nhị phân có dung lượng nhỏ hơn 1MB.'
      ],
      correctIndex: 1,
      explanation: 'Theo triết lý Duck Typing, bất kỳ đối tượng nào triển khai giao diện tương thích (read, write...) đều được xem là file-like object.'
    },
    {
      question: 'Mô-đun nào trong thư viện chuẩn Python kết hợp pickle và DBM để tạo ra một "từ điển lưu trữ trên đĩa cứng"?',
      options: [
        'json',
        'shelve',
        'sqlite3',
        'csv'
      ],
      correctIndex: 1,
      explanation: 'Module shelve cung cấp giao diện từ điển lưu trữ đối tượng bền vững ra đĩa cứng.'
    },
    {
      question: 'Khi cần tạo một luồng tệp văn bản ảo tạm thời hoàn toàn trong RAM (ví dụ phục vụ cho việc kiểm thử tự động), bạn nên dùng lớp nào?',
      options: [
        'io.StringIO',
        'io.BytesIO',
        'sys.stdin',
        'os.pipe'
      ],
      correctIndex: 0,
      explanation: 'io.StringIO hoạt động như một tệp văn bản ảo trong bộ nhớ RAM.'
    }
  ],

  summary: [
    'Python sử dụng mô hình "Giao diện giống tệp" (File-like interface) thống nhất dựa trên nguyên lý đa hình.',
    'Pipes và Sockets mở rộng mô hình tệp cho giao tiếp liên tiến trình và mạng Internet.',
    'Module shelve mang lại cơ chế lưu trữ đối tượng Python bền vững theo cú pháp từ điển tiện lợi.',
    'io.StringIO và io.BytesIO cung cấp các đối tượng tệp ảo trong RAM phục vụ chuyển hướng và kiểm thử.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 31.'
  ]
};
