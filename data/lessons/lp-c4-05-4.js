export default {
  id: 'lp-c4-05-4',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.5.4',
  title: 'Chuỗi ký tự: Định dạng chuỗi (Formatting)',
  subtitle: 'Ba hương vị định dạng chuỗi trong Python: Biểu thức %, phương thức format() và chuỗi f-string hiện đại',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu mục đích của thao tác định dạng chuỗi: thay thế nâng cao các giá trị động vào mẫu văn bản.',
    'Nhận biết và viết đúng cú pháp của cả 3 hương vị: Biểu thức %, Phương thức format() và f-string.',
    'Phân biệt cơ chế hoạt động: thay thế khóa định dạng riêng biệt vs nhúng biểu thức trực tiếp.',
    'Hiểu lý do vì sao cần đọc hiểu cả 3 phong cách khi làm việc với các codebase Python trong thực tế.'
  ],

  intuition: {
    title: 'Ba thế hệ của mẫu hợp đồng điền chỗ trống',
    metaphor: 'Hãy tưởng tượng việc định dạng chuỗi giống như điền thông tin vào một hợp đồng mẫu có sẵn các khoảng trống. Thế hệ thứ nhất (Biểu thức %) giống như để các ký hiệu %s rồi gửi kèm một phong bì danh sách các giá trị ở cuối trang để người đánh máy dò ghép lần lượt. Thế hệ thứ hai (Phương thức format()) đánh dấu các ô ngoặc nhọn {} hoặc {ten} và gọi hàm điền từ khóa rõ ràng hơn. Thế hệ thứ ba (f-string) giống như một văn bản điện tử thông minh: bạn gõ thẳng biểu thức tính toán vào ngay bên trong ô trống {major + 9}, máy tính sẽ tự tính và hiện kết quả ngay lập tức.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">3 HƯƠNG VỊ ĐỊNH DẠNG CHUỖI CÙNG CHO RA KẾT QUẢ GIỐNG NHAU</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <span style="color:var(--warning);font-weight:700;">1. Biểu thức % (Nguyên bản):</span>
            <div style="margin-top:4px;color:var(--text-secondary);"><code>'Using %s version %s.%s' % (tool, major, minor + 9)</code></div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <span style="color:var(--accent-primary);font-weight:700;">2. Phương thức format() (Mới hơn):</span>
            <div style="margin-top:4px;color:var(--text-secondary);"><code>'Using {} version {}.{}'.format(tool, major, minor + 9)</code></div>
          </div>
          <div style="padding:10px;background:var(--accent-soft);border:2px solid var(--success);border-radius:6px;">
            <span style="color:var(--success);font-weight:700;">3. Chuỗi f-string (Mới nhất & Khuyên dùng):</span>
            <div style="margin-top:4px;color:var(--success);font-weight:600;"><code>f'Using {tool} version {major}.{minor + 9}'</code></div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Thao tác Thay thế Nâng cao: Định dạng Chuỗi',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 12 / 38</strong>.</p>
          </div>
        </div>

        <p>Các phương thức chuỗi cũng là một cách để thực thi thao tác thay thế nâng cao gọi là <strong>định dạng chuỗi (formatting)</strong>, tồn tại dưới <strong>ba dạng (ba hương vị)</strong> trong Python:</p>
        <ol>
          <li><strong>Một biểu thức (dạng nguyên bản):</strong> Sử dụng toán tử <code>%</code> (thừa hưởng từ hàm <code>printf</code> trong ngôn ngữ C).</li>
          <li><strong>Một lệnh gọi phương thức chuỗi (mới hơn):</strong> Gọi phương thức <code>.format()</code> của đối tượng chuỗi.</li>
          <li><strong>Dạng chuỗi ký tự nguyên văn gọi là f-string (mới nhất):</strong> Bắt đầu bằng tiền tố <code>f</code> hoặc <code>F</code> trước dấu nháy.</li>
        </ol>
        <p>Hai dạng đầu thay thế các khóa định dạng bằng các giá trị riêng biệt được truyền ở phía sau, dạng thứ ba thay thế các biểu thức Python nhúng trực tiếp trong ngoặc nhọn bằng kết quả của chúng khi chạy. Cả ba dạng đều phân giải các giá trị thay thế để xây dựng các chuỗi mới khi chạy:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh trực diện 3 hương vị định dạng chuỗi trong REPL',
          code: `>>> tool = 'Python'
>>> major = 3
>>> minor = 3

>>> 'Using %s version %s.%s' % (tool, major, minor + 9)       # Biểu thức định dạng
'Using Python version 3.12'

>>> 'Using {} version {}.{}'.format(tool, major, minor + 9)    # Phương thức định dạng
'Using Python version 3.12'

>>> f'Using {tool} version {major}.{minor + 9}'                 # Chuỗi f-string định dạng
'Using Python version 3.12'`,
          output: `'Using Python version 3.12'
'Using Python version 3.12'
'Using Python version 3.12'`,
          annotations: [
            { line: 5, text: '%s nhận giá trị từ tuple (tool, major, minor + 9) phía sau.' },
            { line: 8, text: 'Các cặp ngoặc {} nhận đối số từ lệnh gọi .format().' },
            { line: 11, text: 'f-string tính toán trực tiếp biểu thức nhúng minor + 9 = 12 ngay tại chỗ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Lời khuyên của Tác giả: Vì sao có tới Ba Hương vị?',
      content: `
        <p>Và đúng vậy, tính năng này ngày nay có tới ba hương vị khác nhau! Dù bạn có thể muốn chọn ra một phong cách ưa thích cho mã nguồn của riêng mình (ngày nay f-string thường được ưa chuộng nhất vì ngắn gọn và trực quan):</p>
        <blockquote>
          <em>"Cả ba dạng đều là những trường hợp phổ biến trong mã nguồn thực tế mà bạn sẽ đọc (cũng như trong các cuốn sách bao quát toàn diện). Mỗi dạng đều phong phú các tính năng mà chúng ta sẽ tạm hoãn thảo luận chi tiết cho tới phần sau của cuốn sách."</em>
        </blockquote>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khả năng nhúng biểu thức tùy ý của f-string',
        content: 'Bên trong cặp ngoặc nhọn <code>{...}</code> của f-string, bạn có thể đặt bất kỳ biểu thức Python hợp lệ nào: phép toán số học, gọi phương thức <code>{tool.upper()}</code>, hay thậm chí gọi hàm, giúp mã nguồn trở nên vô cùng súc tích.'
      }
    ]
  },

  exercises: [
    {
      title: 'Định dạng thông báo người dùng bằng f-string',
      level: 'Dễ',
      problem: 'Cho các biến: <code>ten = "Pat"</code>, <code>tuoi = 40</code>. Hãy viết một chuỗi f-string để in thông báo: <code>"Xin chào Pat, năm sau bạn sẽ 41 tuổi!"</code>.',
      hint: 'Dùng biểu thức nhúng <code>{tuoi + 1}</code> bên trong f-string.',
      solutionCode: `ten = "Pat"
tuoi = 40
thong_bao = f"Xin chào {ten}, năm sau bạn sẽ {tuoi + 1} tuổi!"
print(thong_bao)`,
      solutionOutput: `Xin chào Pat, năm sau bạn sẽ 41 tuổi!`,
      explanation: 'f-string tự động tính toán <code>tuoi + 1</code> cho ra 41 và ghép nối vào chuỗi kết quả.'
    },
    {
      title: 'Chuyển đổi giữa 3 phong cách định dạng',
      level: 'Vừa',
      problem: 'Viết lại câu lệnh sau bằng 2 cách còn lại (dùng % và dùng .format()):<br><code>f"Hệ tọa độ: X={x}, Y={y}"</code> với <code>x = 10, y = 20</code>.',
      hint: 'Dùng <code>"Hệ tọa độ: X=%s, Y=%s" % (x, y)</code> và <code>"Hệ tọa độ: X={}, Y={}".format(x, y)</code>.',
      solutionCode: `x, y = 10, 20
c1 = "Hệ tọa độ: X=%s, Y=%s" % (x, y)
c2 = "Hệ tọa độ: X={}, Y={}".format(x, y)
print("Cách 1 (%):", c1)
print("Cách 2 (.format):", c2)`,
      solutionOutput: `Cách 1 (%): Hệ tọa độ: X=10, Y=20
Cách 2 (.format): Hệ tọa độ: X=10, Y=20`,
      explanation: 'Cả 3 cách đều cho ra cùng chuỗi kết quả: <code>"Hệ tọa độ: X=10, Y=20"</code>.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về ba dạng định dạng chuỗi trong Python?',
      options: [
        'Dạng f-string đã hoàn toàn xóa bỏ và vô hiệu hóa dạng % và format() trong Python 3.',
        'Cả ba dạng đều hợp lệ, thường gặp trong các dự án thực tế, và cùng giải quyết bài toán thay thế giá trị vào mẫu văn bản.',
        'Chỉ có dạng % mới có thể in được số thực dấu phẩy động.',
        'f-string chỉ chạy được trên hệ điều hành Linux.'
      ],
      correctIndex: 1,
      explanation: 'Cả 3 phong cách đều cùng tồn tại trong chuẩn ngôn ngữ Python và được hỗ trợ đầy đủ.'
    },
    {
      question: 'Điểm vượt trội lớn nhất của f-string so với toán tử % và phương thức .format() là gì?',
      options: [
        'f-string chạy chậm hơn nhưng tiết kiệm RAM hơn.',
        'f-string cho phép nhúng trực tiếp biểu thức Python tùy ý ngay bên trong mẫu chuỗi mà không cần truyền danh sách biến riêng ở đuôi.',
        'f-string tự động mã hóa chuỗi sang chuẩn UTF-16.',
        'f-string chỉ nhận kiểu dữ liệu số nguyên.'
      ],
      correctIndex: 1,
      explanation: 'f-string cho phép viết trực tiếp biến và biểu thức (như {minor + 9}) ngay vị trí thay thế, giúp mã nguồn rõ ràng và dễ đọc hơn.'
    },
    {
      question: 'Kết quả của biểu thức f\'Using {\"Py\" + \"thon\"} v{3}.{10 + 2}\' là gì?',
      options: [
        '\'Using Python v3.12\'',
        '\'Using Py+thon v3.10+2\'',
        'Lỗi SyntaxError vì không được cộng chuỗi trong f-string.',
        '\'Using {Python} v{3}.{12}\''
      ],
      correctIndex: 0,
      explanation: 'Các biểu thức bên trong {...} được tính toán đầy đủ: \'Py\'+\'thon\' thành \'Python\', 10+2 thành 12, cho ra \'Using Python v3.12\'.'
    }
  ],

  summary: [
    'Định dạng chuỗi là thao tác thay thế nâng cao để sinh các chuỗi văn bản mới khi chạy.',
    '3 phong cách cùng tồn tại: Biểu thức % (nguyên bản), Phương thức format() (mới hơn), và f-string (mới nhất).',
    'f-string cho phép nhúng trực tiếp biểu thức tính toán vào trong cặp ngoặc nhọn {...}.',
    'Cần đọc hiểu cả 3 phong cách vì chúng xuất hiện phổ biến trong mã nguồn thực tế và thư viện.',
    'Ý chính: f-string mang lại sự súc tích tối đa, nhưng sự đa dạng của các phong cách định dạng phản ánh quá trình phát triển bền bỉ của Python.'
  ]
};
