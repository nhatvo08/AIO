export default {
  id: 'lp-c7-01',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.1',
  title: 'Hằng chuỗi: Dấu nháy đơn, Nháy kép & Tự động nối chuỗi',
  subtitle: 'Quy ước viết hằng chuỗi trong mã nguồn, tính tương đương của nháy đơn/nháy kép, cơ chế tự động nối chuỗi liền kề và bẫy dấu phẩy tuple',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững các dạng cú pháp để biểu diễn hằng chuỗi (string literal) trong mã nguồn Python.',
    'Hiểu nguyên lý tương đương hoàn toàn giữa dấu nháy đơn và dấu nháy kép, cùng kỹ thuật nhúng chéo dấu nháy không cần escape.',
    'Nhận biết và áp dụng cơ chế tự động nối các hằng chuỗi đứng liền kề ngay tại thời điểm đọc mã.',
    'Cảnh giác và tránh bẫy dấu phẩy vô tình biến các chuỗi thành một đối tượng tuple thay vì một chuỗi duy nhất.'
  ],

  intuition: {
    title: 'Hai chiếc kẹp gắp và cơ chế tự động dính liền',
    metaphor: 'Trong xưởng chế tạo văn bản Python, dấu nháy đơn (\') và dấu nháy kép (") giống như hai cặp kẹp gắp có chất liệu khác nhau nhưng cùng một công năng. Nếu bạn muốn gắp một dòng chữ chứa dấu nháy kép (như lời thoại), hãy dùng cặp kẹp nháy đơn bao bên ngoài. Ngược lại, nếu trong văn bản có dấu nháy đơn (như sở hữu cách tiếng Anh), hãy dùng cặp kẹp nháy kép bao ngoài. Điều kỳ diệu là nếu bạn đặt các khối chữ này đứng sát nhau mà không có chướng ngại vật nào ngăn cách, Python sẽ xem chúng như được phết keo nam châm và tự động hàn gắn chúng lại thành một khối chữ duy nhất. Nhưng chỉ cần bạn vô tình đánh rơi một dấu phẩy (,) vào giữa, bạn sẽ không nhận được một chuỗi dài mà là một chiếc hộp phân ngăn (tuple) chứa nhiều chuỗi riêng biệt!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">KỸ THUẬT NHÚNG DẤU NHÁY & TỰ ĐỘNG NỐI CHUỖI LIỀN KỀ</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Nhúng Chéo Dấu Nháy</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>'python"s'</code> ➔ Chứa nháy kép <code>"</code><br>
              <code>"python's"</code> ➔ Chứa nháy đơn <code>'</code><br>
              <span style="color:var(--accent-primary);">✓ Không cần dùng dấu gạch chéo ngược \\</span>
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:6px;">Tự Động Nối Liền Kề vs Dấu Phẩy</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>"Learning " 'Python'</code> ➔ <code>'Learning Python'</code> (str)<br>
              <code>"Learning ", 'Python'</code> ➔ <code>('Learning ', 'Python')</code> (tuple!)<br>
              <span style="color:var(--danger);">⚠️ Dấu phẩy tạo ra bộ giá trị tuple</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khảo sát các Dạng Hằng Chuỗi trong Mã Nguồn',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 4 / 52 – Trang 5 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Nhìn chung, chuỗi khá dễ sử dụng trong Python. Tuy nhiên, điều đầu tiên bạn cần biết về chúng là có rất nhiều cách khác nhau để viết chuỗi trực tiếp trong mã nguồn của bạn:</p>
        <ul>
          <li><strong>Dấu nháy đơn:</strong> <code>'cod"e'</code></li>
          <li><strong>Dấu nháy kép:</strong> <code>"cod'e"</code></li>
          <li><strong>Dấu nháy ba:</strong> <code>'''…code…'''</code> hoặc <code>"""…code…"""</code></li>
          <li><strong>Ký tự thoát:</strong> <code>"c\\to\\nd\\0e"</code></li>
          <li><strong>Chuỗi thô (raw string):</strong> <code>r"C:\\new\\test.bin"</code></li>
          <li><strong>Hằng chuỗi byte (Chương 37):</strong> <code>b'co\\x01de'</code></li>
          <li><strong>Hằng chuỗi Unicode (Chương 37):</strong> <code>'h\\u00c4ck'</code></li>
        </ul>

        <p>Các dạng dùng dấu nháy đơn và nháy kép cho đến nay là phổ biến nhất; những dạng khác phục vụ các vai trò chuyên biệt, và chúng ta sẽ lần lượt điểm qua chi tiết tất cả các tùy chọn này.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Dấu Nháy Đơn và Nháy Kép là Hoàn Toàn Như Nhau',
      content: `
        <p>Bao quanh chuỗi trong Python, các ký tự nháy đơn và nháy kép có thể thay thế cho nhau, miễn là chúng <strong>phải khớp nhau</strong> (mở bằng nháy nào thì đóng bằng nháy đó) và <strong>phải là dấu nháy thẳng</strong> (hãy cảnh giác với các trình soạn thảo văn bản như Word hoặc blog tự động sửa thành dấu nháy cong kiểu <code>“...”</code> hay <code>‘...’</code> gây lỗi cú pháp <code>SyntaxError</code>).</p>

        <p>Nghĩa là, các hằng chuỗi có thể được viết bao bọc bởi hai dấu nháy đơn thẳng hoặc hai dấu nháy kép thẳng—hai dạng này hoạt động như nhau và trả về cùng một kiểu đối tượng <code>str</code>. Chẳng hạn, khi được viết tại REPL thông thường, hai chuỗi sau là hoàn toàn giống nhau một khi chúng được Python đọc vào:</p>
      `,
      codeExamples: [
        {
          title: 'Nháy đơn và nháy kép trả về cùng kiểu đối tượng',
          code: `s1 = 'python'
s2 = "python"
print(s1, s2)
print("Hai chuỗi có bằng nhau không?", s1 == s2)
print("Kiểu của cả hai:", type(s1), type(s2))`,
          output: `python python
Hai chuỗi có bằng nhau không? True
Kiểu của cả hai: <class 'str'> <class 'str'>`,
          annotations: [
            { line: 1, text: 's1 được khai báo bằng dấu nháy đơn thẳng.' },
            { line: 2, text: 's2 được khai báo bằng dấu nháy kép thẳng.' },
            { line: 4, text: 'Toán tử == xác nhận hai chuỗi có giá trị nội dung giống hệt nhau 100%.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Nhúng Chéo Dấu Nháy & Cơ Chế Tự Động Nối Chuỗi Liền Kề',
      content: `
        <p>Lý do Python hỗ trợ cả hai loại dấu nháy là vì điều này cho phép bạn <strong>nhúng một ký tự dấu nháy thuộc loại còn lại vào bên trong chuỗi mà không cần phải dùng dấu gạch chéo ngược (\\) để thoát (escape) nó</strong>:</p>
        <ul>
          <li>Bạn có thể nhúng một ký tự nháy kép vào trong một chuỗi được bao bọc bởi các ký tự nháy đơn: <code>'python"s'</code>.</li>
          <li>Và ngược lại, nhúng một ký tự nháy đơn vào chuỗi bao bọc bởi nháy kép: <code>"python's"</code>.</li>
        </ul>

        <p>Đặc biệt, nếu hai hay nhiều hằng chuỗi thuộc bất kỳ loại nào đứng liền kề nhau mà không có toán tử hay dấu phân cách, <strong>Python sẽ tự động nối chúng lại thành một chuỗi duy nhất</strong> từ sớm ngay khi mã nguồn được đọc vào (thời điểm phân tích cú pháp):</p>
      `,
      codeExamples: [
        {
          title: 'Nhúng chéo dấu nháy và tự động nối chuỗi ngầm định',
          code: `# Nhúng dấu nháy mà không cần ký tự thoát
mixed = ('python"s', "python's")
print("Nhúng chéo:", mixed)

# Tự động nối chuỗi liền kề ngay khi đọc mã
title = "Learning " 'Python' " 6E"
print("Chuỗi sau khi tự nối:", title)
print("Kiểu:", type(title).__name__)`,
          output: `Nhúng chéo: ('python"s', "python's")
Chuỗi sau khi tự nối: Learning Python 6E
Kiểu: str`,
          annotations: [
            { line: 2, text: '\'python"s\' chứa dấu nháy kép; "python\'s" chứa dấu nháy đơn mà không cần dùng ký tự \\.' },
            { line: 6, text: 'Ba hằng chuỗi đứng liền kề ("Learning ", \'Python\', " 6E") tự động hàn gắn thành một chuỗi duy nhất.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Sở thích phong cách của Mark Lutz: Ưu tiên dấu nháy đơn',
        content: 'Cuốn sách <em>Learning Python</em> nhìn chung thích dùng dấu nháy đơn bao quanh chuỗi hơn vì chúng tạo cảm giác gọn gàng và dễ đọc hơn đôi chút khi nhìn lướt qua mã nguồn, ngoại trừ những trường hợp bên trong chuỗi có nhúng dấu nháy đơn. Đây là một lựa chọn mang tính phong cách, nhưng bản thân Python REPL cũng mặc định in chuỗi trong dấu nháy đơn (trừ khi chuỗi chứa nháy đơn), và phần lớn cộng đồng Python hiện đại cũng tuân theo thói quen này.'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy dấu phẩy vô tình tạo ra tuple thay vì chuỗi',
        content: `Lưu ý rằng dấu phẩy là vô cùng nhạy cảm trong Python! Nếu bạn đặt dấu phẩy giữa các chuỗi: <code>title = "Learning ", 'Python', " 6E"</code>, Python sẽ không nối chúng lại mà sẽ gom chúng vào một <strong>bộ giá trị (tuple) gồm 3 phần tử</strong>: <code>('Learning ', 'Python', ' 6E')</code>. Nếu cần nhúng dấu nháy cùng loại, hãy dùng ký tự thoát: <code>'python\\'s', "python\\"s"</code>.`
      }
    ]
  },

  exercises: [
    {
      title: 'Tận dụng dấu nháy hỗn hợp để viết chuỗi không cần ký tự thoát',
      level: 'Dễ',
      problem: 'Cho câu văn tiếng Anh sau: "Knights who say: \'Ni!\'". Hãy viết hai cách biểu diễn câu này trong Python: (1) Bằng cách chọn dấu nháy bao bọc phù hợp để không phải dùng bất kỳ dấu gạch chéo ngược (\\) nào; (2) Tận dụng tính năng tự động nối chuỗi liền kề để tách câu trên thành 2 đoạn hằng chuỗi đứng cạnh nhau.',
      hint: 'Câu văn có chứa dấu nháy đơn \'Ni!\', do đó hãy dùng dấu nháy kép "..." làm dấu bao bọc bên ngoài.',
      solutionCode: `# Cách 1: Dùng dấu nháy kép bao ngoài để nhúng trực tiếp nháy đơn
sentence1 = "Knights who say: 'Ni!'"

# Cách 2: Tự động nối hai hằng chuỗi liền kề
sentence2 = "Knights who say: " "'Ni!'"

print("sentence1:", sentence1)
print("sentence2:", sentence2)
print("Hai chuỗi có đồng nhất?", sentence1 == sentence2)`,
      solutionOutput: `sentence1: Knights who say: 'Ni!'
sentence2: Knights who say: 'Ni!'
Hai chuỗi có đồng nhất? True`,
      explanation: 'Khi chuỗi chứa dấu nháy đơn, việc bao bọc bằng nháy kép là giải pháp thanh lịch nhất giúp mã nguồn sạch đẹp, loại bỏ hoàn toàn các ký tự thoát \\ rối mắt. Tính năng tự nối chuỗi liền kề cũng hoạt động hoàn hảo khi ghép hai phần lại với nhau.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG khi so sánh giữa dấu nháy đơn (\') và dấu nháy kép (") trong Python?',
      options: [
        'Dấu nháy đơn dùng cho ký tự đơn lẻ (char), còn dấu nháy kép dùng cho chuỗi nhiều ký tự (str).',
        'Dấu nháy đơn và nháy kép hoạt động hoàn toàn giống nhau và trả về cùng kiểu đối tượng str.',
        'Chuỗi viết trong dấu nháy kép tự động kích hoạt chế độ f-string nội suy biểu thức.',
        'Dấu nháy đơn có hiệu năng thực thi nhanh hơn dấu nháy kép trong bộ máy CPython.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, nháy đơn và nháy kép là hoàn toàn tương đương nhau về mặt ngữ nghĩa và kiểu dữ liệu trả về, cho phép lập trình viên linh hoạt chọn loại nháy phù hợp để nhúng loại còn lại.'
    },
    {
      question: 'Kết quả của biểu thức sau trong Python là gì: result = "Py" "thon", "3"',
      options: [
        'Một chuỗi duy nhất mang giá trị "Python, 3"',
        'Một lỗi cú pháp SyntaxError vì thiếu toán tử cộng (+)',
        'Một tuple gồm hai phần tử: (\'Python\', \'3\')',
        'Một danh sách gồm ba phần tử: [\'Py\', \'thon\', \'3\']'
      ],
      correctIndex: 2,
      explanation: 'Hai chuỗi "Py" "thon" đứng liền kề không có dấu phẩy sẽ tự động nối thành "Python". Dấu phẩy tiếp theo sau đó sẽ tạo ra một tuple gồm 2 phần tử: (\'Python\', \'3\').'
    }
  ],

  summary: [
    'Hằng chuỗi trong Python có thể được viết bằng nháy đơn, nháy kép, nháy ba, ký tự thoát hoặc chuỗi thô.',
    'Nháy đơn và nháy kép hoàn toàn bình đẳng và trả về cùng kiểu đối tượng str; chúng phải là dấu nháy thẳng.',
    'Nhúng chéo dấu nháy (nháy đơn bao ngoài nháy kép hoặc ngược lại) giúp tránh phải dùng dấu gạch chéo ngược.',
    'Các hằng chuỗi đứng liền kề nhau sẽ được Python tự động nối ngầm định ngay tại thời điểm đọc mã.',
    'Cần cảnh giác với dấu phẩy giữa các chuỗi vì nó sẽ tạo ra một đối tượng tuple thay vì một chuỗi.'
  ]
};
