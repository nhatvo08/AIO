export default {
  id: 'p1-02',
  partId: 'part-1',
  partTitle: 'Phần 1 – Nền tảng (Cơ bản)',
  number: '1.2',
  title: 'Cách viết chuỗi: Nháy đơn/đôi/ba, Escape, Raw string, print & repr',
  subtitle: 'Nắm vững mọi cú pháp khai báo chuỗi literal, ký tự thoát Unicode và phân biệt hiển thị người dùng với biểu diễn gỡ lỗi',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng linh hoạt nháy đơn `\'...\'`, nháy đôi `"..."`, và nháy ba `"""..."""` cho chuỗi một dòng và nhiều dòng.',
    'Làm chủ các chuỗi thoát (escape sequences): `\\n`, `\\t`, `\\\\`, `\\\'`, `\\"`, `\\uXXXX`, `\\UXXXXXXXX` và `\\N{name}`.',
    'Hiểu cách hoạt động của chuỗi thô (raw string `r"..."`), nối chuỗi literal ngầm định và xuống dòng trong code.',
    'Phân biệt bản chất giữa `print(s)` (`str`) dành cho người đọc và `repr(s)` / `ascii(s)` dành cho lập trình viên.'
  ],

  intuition: {
    title: 'Hai chiếc kính nhìn cùng một chuỗi: Kính Người Dùng (print) và Kính X-Quang Kỹ Sư (repr)',
    metaphor: 'Khi bạn viết `"Dòng 1\\nDòng 2"`, ký tự `\\n` trong mã nguồn giống như một lệnh điều khiển ẩn. Khi nhìn qua kính Người Dùng (`print()`), lệnh đó biến thành hành động xuống dòng thật sự trên màn hình. Nhưng khi đeo kính X-Quang của Kỹ Sư (`repr()`), bạn sẽ nhìn thấy nguyên vẹn dấu nháy bao ngoài và mã lệnh `\\n` nằm bên trong — giúp bạn phát hiện ngay những khoảng trắng thừa hay ký tự ẩn.',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="padding:12px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface-alt);">
          <div style="color:var(--accent-primary);font-weight:700;margin-bottom:6px;">Trong mã nguồn (Literal):</div>
          <code>s = "Xin chào\\tViệt Nam\\n"</code>
        </div>
        <div style="padding:12px;border:1px solid var(--success-border);border-radius:8px;background:var(--success-bg);">
          <div style="color:var(--success-text);font-weight:700;margin-bottom:6px;">Qua print(s) — Cho người đọc:</div>
          <div>Xin chào&nbsp;&nbsp;&nbsp;&nbsp;Việt Nam</div>
          <div style="color:var(--text-muted);font-size:0.75rem;">(Có 1 dòng trống phía dưới do \\n)</div>
        </div>
        <div style="padding:12px;border:1px solid var(--warning-border);border-radius:8px;background:var(--warning-bg);">
          <div style="color:var(--warning-text);font-weight:700;margin-bottom:6px;">Qua print(repr(s)) — Kính X-Quang:</div>
          <code>'Xin chào\\tViệt Nam\\n'</code>
          <div style="color:var(--text-muted);font-size:0.75rem;">(Thấy rõ nháy bao ngoài, \\t và \\n)</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Nháy đơn (\'), Nháy đôi (") và Nháy ba (""" / \'\'\')',
      badge: null,
      content: `
        <p>Trong Python, cặp nháy đơn <code>'...'</code> và nháy đôi <code>"..."</code> có ý nghĩa <strong>hoàn toàn tương đương nhau</strong> — cả hai đều tạo ra đối tượng <code>str</code> giống hệt nhau. Lý do Python hỗ trợ cả hai là để bạn dễ dàng đặt dấu nháy này bên trong dấu nháy kia mà không cần dùng dấu gạch chéo ngược <code>\\</code>.</p>
        <p>Khi cần viết chuỗi kéo dài trên nhiều dòng (như đoạn văn, câu truy vấn SQL, mẫu email) hoặc viết <strong>docstring</strong> tài liệu cho hàm/lớp, hãy dùng <strong>nháy ba</strong> (<code>"""..."""</code> hoặc <code>'''...'''</code>).</p>
      `,
      codeExamples: [
        {
          title: 'So sánh nháy đơn, nháy đôi và chuỗi nhiều dòng với nháy ba',
          code: `s1 = 'Python 3.14'
s2 = "Python 3.14"
print("s1 == s2:", s1 == s2)

quote_in_quote = "Người Việt thường nói: 'Đi một ngày đàng, học một sàng khôn.'"
print(quote_in_quote)

poem = """Trăm năm trong cõi người ta,
Chữ tài chữ mệnh khéo là ghét nhau."""
print(poem)
print("Biểu diễn repr:", repr(poem))`,
          output: `s1 == s2: True
Người Việt thường nói: 'Đi một ngày đàng, học một sàng khôn.'
Trăm năm trong cõi người ta,
Chữ tài chữ mệnh khéo là ghét nhau.
Biểu diễn repr: 'Trăm năm trong cõi người ta,\\nChữ tài chữ mệnh khéo là ghét nhau.'`,
          annotations: [
            { line: 3, text: '`\'Python 3.14\'` và `"Python 3.14"` tạo ra cùng một giá trị chuỗi (`s1 == s2` là `True`).' },
            { line: 5, text: 'Bao ngoài bằng nháy đôi `"..."` giúp viết trực tiếp nháy đơn `\'...\'` bên trong rất tự nhiên.' },
            { line: 8, text: 'Chuỗi nháy ba `"""..."""` tự động lưu lại ký tự xuống dòng `\\n` tại nơi bạn bấm phím Enter.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Ký tự thoát (Escape Sequences) & Unicode Escape',
      badge: null,
      content: `
        <p>Dấu gạch chéo ngược <code>\\</code> (backslash) bên trong chuỗi thường được dùng để mở đầu một <strong>chuỗi thoát (escape sequence)</strong> — biểu diễn các ký tự đặc biệt hoặc mã Unicode bằng văn bản thuần:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Cú pháp Escape</th>
                <th>Ý nghĩa</th>
                <th>Ví dụ</th>
                <th>Kết quả hiển thị</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>\\n</code></td>
                <td>Xuống dòng mới (Linefeed - LF, <code>U+000A</code>)</td>
                <td><code>"A\\nB"</code></td>
                <td><code>A</code> rồi xuống dòng <code>B</code></td>
              </tr>
              <tr>
                <td><code>\\t</code></td>
                <td>Dấu Tab ngang (Horizontal Tab, <code>U+0009</code>)</td>
                <td><code>"Cột1\\tCột2"</code></td>
                <td><code>Cột1    Cột2</code></td>
              </tr>
              <tr>
                <td><code>\\\\</code></td>
                <td>Một dấu gạch chéo ngược thật sự <code>\\</code></td>
                <td><code>"C:\\\\Users"</code></td>
                <td><code>C:\\Users</code></td>
              </tr>
              <tr>
                <td><code>\\'</code> hoặc <code>\\"</code></td>
                <td>Dấu nháy đơn hoặc nháy đôi nguyên bản</td>
                <td><code>'I\\'m OK'</code></td>
                <td><code>I'm OK</code></td>
              </tr>
              <tr>
                <td><code>\\xHH</code></td>
                <td>Ký tự có mã Hex 2 chữ số (<code>00..FF</code>)</td>
                <td><code>"\\x41"</code></td>
                <td><code>A</code></td>
              </tr>
              <tr>
                <td><code>\\uXXXX</code></td>
                <td>Ký tự Unicode có mã Hex đúng 4 chữ số</td>
                <td><code>"\\u1edf"</code></td>
                <td><code>ở</code></td>
              </tr>
              <tr>
                <td><code>\\UXXXXXXXX</code></td>
                <td>Ký tự Unicode có mã Hex đúng 8 chữ số</td>
                <td><code>"\\U0001f40d"</code></td>
                <td><code>🐍</code></td>
              </tr>
              <tr>
                <td><code>\\N{name}</code></td>
                <td>Ký tự tra theo Tên chuẩn trong cơ sở dữ liệu Unicode</td>
                <td><code>"\\N{SNAKE}"</code></td>
                <td><code>🐍</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><strong>Lưu ý từ Python 3.12 → 3.14:</strong> Một chuỗi thoát không hợp lệ (ví dụ viết <code>"\\d"</code> hay <code>"\\s"</code> trong chuỗi thường mà không dùng raw string <code>r""</code>) sẽ phát ra cảnh báo <code>SyntaxWarning: invalid escape sequence</code> và sẽ trở thành lỗi cú pháp trong tương lai!</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng Escape Sequences và Unicode theo mã / tên chuẩn',
          code: `path = "C:\\\\Python314\\\\python.exe"
vn_word = "Ph\\u1edf"
snake_by_code = "\\U0001f40d"
snake_by_name = "\\N{SNAKE} \\N{LATIN SMALL LETTER O WITH HORN AND HOOK ABOVE}"

print(path)
print(vn_word)
print(snake_by_code == "🐍")
print(snake_by_name)`,
          output: `C:\\Python314\\python.exe
Phở
True
🐍 ở`,
          annotations: [
            { line: 1, text: 'Mỗi cặp `\\\\` trong mã nguồn biểu diễn đúng 1 dấu `\\` trong chuỗi thực tế (`len("\\\\") == 1`).' },
            { line: 2, text: '`\\u1edf` (4 chữ số hex) chính là ký tự `ở` trong tiếng Việt.' },
            { line: 3, text: '`\\U0001f40d` (8 chữ số hex, chữ `U` hoa) dùng cho các code point lớn hơn `FFFF` như Emoji.' },
            { line: 4, text: '`\\N{...}` giúp mã nguồn tự mô tả rõ ký tự đặc biệt đang dùng là gì mà không cần nhớ mã số.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Raw String (r""), Nối chuỗi ngầm định & Xuống dòng trong code',
      badge: null,
      content: `
        <p>Khi làm việc với <strong>biểu thức chính quy (Regex)</strong> hoặc <strong>đường dẫn Windows</strong> có nhiều dấu <code>\\</code>, việc phải gõ <code>\\\\</code> liên tục gây rối mắt. Tiền tố <strong>raw string</strong> <code>r"..."</code> (hoặc <code>R"..."</code>) bảo Python: <em>"Hãy giữ nguyên mọi dấu <code>\\</code> như ký tự thường, đừng dịch escape!"</em>.</p>
        <p>Ngoài ra, khi hai hoặc nhiều chuỗi literal đặt cạnh nhau (chỉ cách nhau bởi khoảng trắng hoặc xuống dòng bên trong cặp ngoặc <code>(...)</code>), trình biên dịch Python sẽ <strong>tự động nối chúng lại thành 1 chuỗi duy nhất ngay lúc biên dịch</strong> (implicit concatenation) mà không tốn chi phí cộng chuỗi lúc chạy.</p>
      `,
      codeExamples: [
        {
          title: 'Raw string r"" và kỹ thuật chia chuỗi dài trên nhiều dòng code',
          code: `win_path = r"C:\\Users\\Admin\\Documents\\new_report.txt"
regex_pattern = r"\\d{2}/\\d{2}/\\d{4}"

print(win_path)
print(regex_pattern)

# Nối chuỗi literal ngầm định bên trong ngoặc tròn (Khuyên dùng theo PEP 8)
long_url = (
    "https://docs.python.org/3.14/"
    "library/stdtypes.html"
    "#text-sequence-type-str"
)
print(long_url)`,
          output: `C:\\Users\\Admin\\Documents\\new_report.txt
\\d{2}/\\d{2}/\\d{4}
https://docs.python.org/3.14/library/stdtypes.html#text-sequence-type-str`,
          annotations: [
            { line: 1, text: 'Nhờ tiền tố `r`, `\\n` trong `\\new_report.txt` KHÔNG bị biến thành ký tự xuống dòng.' },
            { line: 2, text: 'Luôn dùng `r"..."` khi viết mẫu Regex để tránh `SyntaxWarning: invalid escape sequence`.' },
            { line: 8, text: 'Ba chuỗi literal đặt trong `(...)` trên 3 dòng được ghép thành một chuỗi liên tục không có `\\n` thừa.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Sự khác biệt giữa print(s), repr(s) và ascii(s)',
      badge: null,
      content: `
        <p>Trong Python, mỗi đối tượng có hai cách biểu diễn văn bản:</p>
        <ul>
          <li><code>str(s)</code> (được gọi tự động bởi <code>print(s)</code>): Trả về nội dung dễ đọc cho <strong>người dùng cuối</strong>, thực thi các ký tự xuống dòng/tab và bỏ dấu nháy bao ngoài.</li>
          <li><code>repr(s)</code>: Trả về biểu diễn <strong>chính xác, không nhập nhằng cho lập trình viên</strong> (unambiguous representation), có dấu nháy bao ngoài và hiện rõ các ký tự thoát như <code>\\n</code>, <code>\\t</code>.</li>
          <li><code>ascii(s)</code>: Giống <code>repr(s)</code>, nhưng thoát thêm mọi ký tự ngoài bảng ASCII (như chữ tiếng Việt hay Emoji) thành dạng <code>\\x..</code>, <code>\\u....</code>, <code>\\U........</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Đối chiếu kết quả của str(), repr() và ascii()',
          code: `text = "Chào\\tPython 🐍\\n"

print("1. Qua print(text):")
print(text)
print("2. Qua repr(text):", repr(text))
print("3. Qua ascii(text):", ascii(text))`,
          output: `1. Qua print(text):
Chào	Python 🐍

2. Qua repr(text): 'Chào\\tPython 🐍\\n'
3. Qua ascii(text): 'Ch\\xe0o\\tPython \\U0001f40d\\n'`,
          annotations: [
            { line: 4, text: '`print(text)` hiển thị tab và xuống dòng thật sự.' },
            { line: 5, text: '`repr(text)` giữ nguyên chữ tiếng Việt và emoji hiển thị được, nhưng làm lộ rõ `\\t` và `\\n`.' },
            { line: 6, text: '`ascii(text)` chuyển cả chữ `à` thành `\\xe0` và `🐍` thành `\\U0001f40d`.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Raw string KHÔNG THỂ kết thúc bằng một số lẻ dấu gạch chéo ngược `\\`',
        content: 'Biểu thức `r"C:\\Users\\"` sẽ gây lỗi cú pháp `SyntaxError: unterminated string literal`! Lý do: trong raw string, bộ phân tích cú pháp vẫn cho phép `\\"` để thoát dấu nháy đóng, nên dấu `\\` cuối cùng vô tình "nuốt" mất dấu nháy kết thúc chuỗi. Cách xử lý: viết `r"C:\\Users" + "\\\\"` hoặc dùng `pathlib.Path` / dấu `/`.'
      },
      {
        title: 'Quên dấu phẩy trong danh sách dẫn đến nối chuỗi ngầm định ngoài ý muốn',
        content: 'Nếu bạn viết `langs = ["Python", "Rust" "Go"]` (thiếu dấu phẩy sau `"Rust"`), Python KHÔNG báo lỗi mà âm thầm nối thành `["Python", "RustGo"]` (chỉ có 2 phần tử thay vì 3)!'
      }
    ],
    tips: [
      {
        title: 'Loại bỏ xuống dòng đầu tiên trong chuỗi nháy ba `"""\\`',
        content: 'Khi viết chuỗi `"""` nhiều dòng, nếu bạn xuống dòng ngay sau `"""` cho đẹp code, chuỗi sẽ bắt đầu bằng `\\n`. Thêm một dấu `\\` ngay sau `"""` (tức là `"""\\`) sẽ bỏ qua ký tự xuống dòng đầu tiên đó!'
      }
    ],
    deepDive: {
      title: 'Nối chuỗi ngầm định ("a" "b") diễn ra ở bước nào của CPython?',
      content: `
        <p>Khi bạn viết <code>s = "Hello, " "World!"</code> (hai literal đặt cạnh nhau không có dấu <code>+</code>), bộ phân tích cú pháp (Parser/AST compiler) của CPython nối chúng lại <strong>ngay khi tạo cây cú pháp trừu tượng (AST)</strong> trước cả khi sinh bytecode!</p>
        <p>Do đó, bytecode sinh ra chỉ nạp một hằng số duy nhất <code>'Hello, World!'</code> (<code>LOAD_CONST</code>), hoàn toàn không tốn phép toán nối chuỗi lúc chạy.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Sửa lỗi đường dẫn Windows bị biến dạng bởi Escape',
      problem: 'Đoạn code `folder = "C:\\temp\\new_table"` bị lỗi hiển thị vì `\\t` biến thành dấu Tab và `\\n` biến thành xuống dòng. Hãy viết lại biến `folder` bằng 2 cách khác nhau (dùng escape `\\\\` và dùng raw string `r""`) rồi kiểm tra xem hai cách có bằng nhau không.',
      hint: 'Cách 1 nhân đôi dấu `\\` thành `\\\\`. Cách 2 thêm tiền tố `r` trước dấu nháy mở.',
      solutionCode: `folder_escaped = "C:\\\\temp\\\\new_table"
folder_raw = r"C:\\temp\\new_table"

print(folder_escaped)
print(folder_raw)
print("Hai chuỗi bằng nhau?", folder_escaped == folder_raw)`,
          solutionOutput: `C:\\temp\\new_table
C:\\temp\\new_table
Hai chuỗi bằng nhau? True`,
      explanation: 'Raw string `r"..."` chỉ là cú pháp viết tắt ở tầng mã nguồn; đối tượng `str` tạo ra trong bộ nhớ hoàn toàn giống hệt chuỗi viết bằng `"C:\\\\temp\\\\new_table"`.'
    },
    {
      level: 'Vừa',
      title: 'Giải mã thông điệp từ mã Unicode Hex',
      problem: 'Hãy tạo một chuỗi sử dụng duy nhất các mã escape Unicode `\\uXXXX` và `\\N{...}` để tạo ra chuỗi `"Việt Nam ★"` (biết rằng chữ `ệ` có mã `U+1EC7`, và ngôi sao đen có tên chuẩn Unicode là `BLACK STAR`). In ra chuỗi và kết quả của `ascii()` trên chuỗi đó.',
      hint: 'Kết hợp `"Vi\\u1ec7t Nam \\N{BLACK STAR}"`.',
      solutionCode: `s = "Vi\\u1ec7t Nam \\N{BLACK STAR}"
print("Hiển thị:", s)
print("Độ dài:", len(s))
print("Mã ASCII:", ascii(s))`,
      solutionOutput: `Hiển thị: Việt Nam ★
Độ dài: 10
Mã ASCII: 'Vi\\u1ec7t Nam \\u2605'`,
      explanation: 'Ký tự `\\N{BLACK STAR}` được ánh xạ tới code point `U+2605` (`★`). Khi gọi `ascii(s)`, cả `ệ` và `★` đều được biểu diễn lại dưới dạng mã thoát `\\uXXXX`.'
    },
    {
      level: 'Khó',
      title: 'Khám phá bẫy quên dấu phẩy và kiểm tra ký tự ẩn bằng repr()',
      problem: 'Cho danh sách `lines = ["Dòng 1 ", "Dòng 2" "Dòng 3\\r\\n"]`. Hãy viết đoạn code in ra số lượng phần tử thực tế của `lines` và in từng phần tử kèm theo `repr()` của nó để chỉ ra 2 điểm bất thường trong danh sách trên.',
      hint: 'Duyệt qua `lines` và in cả `line` lẫn `repr(line)`.',
      solutionCode: `lines = ["Dòng 1 ", "Dòng 2" "Dòng 3\\r\\n"]
print("Số phần tử thực tế:", len(lines))
for idx, item in enumerate(lines):
    print(idx, "-> repr:", repr(item))`,
      solutionOutput: `Số phần tử thực tế: 2
0 -> repr: 'Dòng 1 '
1 -> repr: 'Dòng 2Dòng 3\\r\\n'`,
      explanation: 'Nhờ `repr()`, ta thấy ngay: (1) Phần tử 0 có một khoảng trắng thừa ở cuối `\'Dòng 1 \'`; (2) Do thiếu dấu phẩy giữa `"Dòng 2"` và `"Dòng 3\\r\\n"`, Python đã nối ngầm định chúng thành 1 phần tử duy nhất kèm `\\r\\n` ở cuối.'
    }
  ],

  quiz: [
    {
      question: 'Độ dài `len(r"\\n")` so với `len("\\n")` trong Python 3.14 là bao nhiêu?',
      options: [
        'Cả hai đều bằng `1`',
        'Cả hai đều bằng `2`',
        '`len(r"\\n")` bằng `2`, còn `len("\\n")` bằng `1`',
        '`len(r"\\n")` bằng `1`, còn `len("\\n")` bằng `2`'
      ],
      correctIndex: 2,
      explanation: 'Trong raw string `r"\\n"`, dấu `\\` không kích hoạt escape nên chuỗi gồm 2 ký tự riêng biệt là `\'\\\\\'` và `\'n\'` (`len == 2`). Trong chuỗi thường `"\\n"`, đó là 1 ký tự xuống dòng duy nhất (`len == 1`).'
    },
    {
      question: 'Biểu thức nào sau đây gây lỗi `SyntaxError` trong Python?',
      options: [
        '`r"C:\\new_folder\\test"`',
        '`r"C:\\new_folder\\"`',
        '`"Py" "thon"`',
        '`"\\N{SNAKE}"`'
      ],
      correctIndex: 1,
      explanation: 'Một raw string không bao giờ được kết thúc bằng một số lẻ dấu gạch chéo ngược `\\` vì `\\"` làm thoát dấu nháy đóng chuỗi.'
    },
    {
      question: 'Hàm nào trả về biểu diễn chuỗi có dấu nháy bao ngoài và thoát toàn bộ các ký tự tiếng Việt / Emoji thành mã `\\x..`, `\\u....`, `\\U........`?',
      options: [
        '`str()`',
        '`repr()`',
        '`ascii()`',
        '`print()`'
      ],
      correctIndex: 2,
      explanation: '`ascii(obj)` hoạt động giống `repr(obj)` nhưng biến mọi ký tự non-ASCII thành dạng escape chỉ chứa các ký tự ASCII 7-bit.'
    }
  ],

  summary: [
    'Nháy đơn `\'...\'` và nháy đôi `"..."` tạo ra đối tượng `str` giống hệt nhau; nháy ba `"""..."""` dùng cho chuỗi nhiều dòng và docstring.',
    'Các chuỗi thoát phổ biến gồm `\\n`, `\\t`, `\\\\`, `\\\'`, `\\"`, `\\xHH`, `\\uXXXX` (4 số hex), `\\UXXXXXXXX` (8 số hex) và `\\N{NAME}`.',
    'Raw string `r"..."` giữ nguyên dấu `\\` (rất hữu ích cho Regex và đường dẫn), nhưng không được kết thúc bằng số lẻ dấu `\\`.',
    'Dùng `print(s)` (`str`) để hiển thị cho người dùng cuối và dùng `repr(s)` / `ascii(s)` để kiểm tra chính xác các ký tự ẩn khi gỡ lỗi.'
  ]
};
