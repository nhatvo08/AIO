export default {
  id: 'p3-03',
  partId: 'part-3',
  partTitle: 'Phần 3 – Định dạng chuỗi (Trung cấp → Nâng cao)',
  number: '3.3',
  title: 'f-string Chuyên Sâu & Kỷ Nguyên PEP 701',
  subtitle: 'Làm chủ cờ chuyển đổi !r/!s/!a, cú pháp tự gỡ lỗi {x=}, định dạng động lồng nhau và cú pháp f-string tự do của Python 3.12–3.14',
  level: 'Nâng cao',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu rõ thứ tự thực thi bên trong một trường thay thế f-string: Biểu thức ➔ Cờ chuyển đổi (!s, !r, !a) ➔ Đặc tả định dạng (:format_spec).',
    'Sử dụng thành thạo cú pháp tự gỡ lỗi {biến=} (kể cả giữ khoảng trắng {x = } và kết hợp với :format_spec).',
    'Xây dựng bảng biểu có độ rộng và độ chính xác thay đổi linh hoạt lúc chạy nhờ Format Spec lồng nhau {x:{w}.{p}f}.',
    'Khai thác trọn vẹn 4 đột phá của PEP 701 (Python 3.12+): tái sử dụng dấu nháy kép, dùng ký tự thoát \\ trong biểu thức, lồng f-string nhiều cấp và viết # comment trong ngoặc nhọn.'
  ],

  intuition: {
    title: 'Trạm biến áp 3 công đoạn bên trong cặp ngoặc nhọn {}',
    metaphor: 'Mỗi cặp ngoặc nhọn `{biểu_thức!chuyển_đổi:định_dạng}` trong f-string không chỉ đơn thuần là chỗ điền biến, mà là một dây chuyền 3 bước tuần tự: (1) Máy tính thực thi `biểu_thức` để lấy đối tượng Python; (2) Nếu có dấu chấm than `!`, đối tượng bị ép kiểu thành chuỗi qua `str()`, `repr()` hoặc `ascii()`; (3) Cuối cùng, kết quả mới đi qua bộ lọc `:định_dạng`. Từ Python 3.12 (PEP 701), phần `biểu_thức` được tháo bỏ mọi xiềng xích cũ và sử dụng trực tiếp bộ phân tích cú pháp PEG đầy đủ của Python.',
    visualHtml: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:16px;border-radius:12px;background:rgba(15,23,42,0.75);border:1px solid rgba(74,222,128,0.3);font-family:system-ui,sans-serif;">
        <div style="flex:1;min-width:170px;padding:12px;border-radius:8px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);">
          <div style="font-size:11px;color:#38bdf8;font-weight:700;text-transform:uppercase;">Bước 1 • Expression</div>
          <div style="font-size:15px;font-weight:700;color:#f8fafc;margin:4px 0;"><code>{ user["name"]</code></div>
          <div style="font-size:12px;color:#cbd5e1;">Đánh giá biểu thức Python bất kỳ (PEP 701 cho phép nháy trùng, <code>\\n</code>, <code>#comment</code>)</div>
        </div>
        <div style="font-size:20px;color:#64748b;font-weight:700;">➔</div>
        <div style="flex:1;min-width:170px;padding:12px;border-radius:8px;background:rgba(250,204,21,0.12);border:1px solid rgba(250,204,21,0.35);">
          <div style="font-size:11px;color:#facc15;font-weight:700;text-transform:uppercase;">Bước 2 • Conversion</div>
          <div style="font-size:15px;font-weight:700;color:#f8fafc;margin:4px 0;"><code>!r / !s / !a</code></div>
          <div style="font-size:12px;color:#cbd5e1;">Chuyển đổi sớm đối tượng bằng <code>repr()</code>, <code>str()</code> hoặc <code>ascii()</code> trước khi format</div>
        </div>
        <div style="font-size:20px;color:#64748b;font-weight:700;">➔</div>
        <div style="flex:1;min-width:170px;padding:12px;border-radius:8px;background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.35);">
          <div style="font-size:11px;color:#4ade80;font-weight:700;text-transform:uppercase;">Bước 3 • Format Spec</div>
          <div style="font-size:15px;font-weight:700;color:#f8fafc;margin:4px 0;"><code>:&gt;{width} }</code></div>
          <div style="font-size:12px;color:#cbd5e1;">Gọi <code>format(val, spec)</code> (hỗ trợ cả các biến lồng nhau <code>{width}</code>)</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Ba cờ chuyển đổi (!s, !r, !a) và Thứ tự ưu tiên',
      badge: null,
      content: `
        <p>Mặc định, f-string gọi trực tiếp phương thức <code>__format__()</code> của đối tượng. Tuy nhiên, nếu bạn đặt một trong ba cờ chuyển đổi sau ngay trước dấu hai chấm <code>:</code>, Python sẽ <strong>ép đối tượng thành <code>str</code> trước</strong> rồi mới áp dụng <code>format_spec</code>:</p>
        <ul>
          <li><strong><code>!s</code></strong>: Gọi <code>str(obj)</code> — hữu ích khi đối tượng có <code>__format__</code> tùy biến nhưng bạn chỉ muốn căn lề chuỗi hiển thị thông thường của nó.</li>
          <li><strong><code>!r</code></strong>: Gọi <code>repr(obj)</code> — giữ nguyên dấu nháy bao quanh chuỗi, ký tự thoát <code>\\n</code>, hoặc biểu diễn kỹ thuật của đối tượng để ghi log/gỡ lỗi.</li>
          <li><strong><code>!a</code></strong>: Gọi <code>ascii(obj)</code> — giống <code>!r</code> nhưng thoát toàn bộ ký tự ngoài bảng mã ASCII (như tiếng Việt, Emoji) về dạng <code>\\x..</code>, <code>\\u....</code> hoặc <code>\\U........</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Phân biệt !s, !r, !a và tác động lên Format Spec phía sau',
          code: `city = "Đà Nẵng\\t🌊"
raw_id = "007"

print(f"Mặc định : {city}")
print(f"Cờ !r    : {city!r}")
print(f"Cờ !a    : {city!a}")

# Khi phân biệt kiểu dữ liệu trong log (str "007" khác int 7)
print(f"Không có !r: id={raw_id} | Có !r: id={raw_id!r}")

# Cờ chuyển đổi chạy TRƯỚC format_spec:
# {raw_id!r:>10} -> repr("007") tạo chuỗi "'007'" (dài 5), sau đó căn phải rộng 10
print(f"Căn phải chuỗi repr: [{raw_id!r:>10}]")`,
          output: `Mặc định : Đà Nẵng	🌊
Cờ !r    : 'Đà Nẵng\\t🌊'
Cờ !a    : '\\u0110\\xe0 N\\x1eb5ng\\t\\U0001f30a'
Không có !r: id=007 | Có !r: id='007'
Căn phải chuỗi repr: [     '007']`,
          annotations: [
            { line: 5, text: '!r gọi repr(), hiển thị rõ ký tự tab \\t và cặp dấu nháy đơn bao quanh chuỗi.' },
            { line: 6, text: '!a chuyển mọi ký tự tiếng Việt và emoji sang mã thoát Unicode thuần ASCII.' },
            { line: 13, text: 'Vì !r đã biến đối tượng thành chuỗi "\'007\'", phần :>10 tính độ dài bao gồm cả 2 dấu nháy đơn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Cú pháp tự gỡ lỗi {x=} (Self-Documenting Expressions)',
      badge: null,
      content: `
        <p>Thay vì phải gõ lặp lại <code>f"x = {x}, y = {y}"</code>, cú pháp <code>{biểu_thức=}</code> (từ Python 3.8) tự động in ra <strong>cả văn bản gốc của biểu thức, dấu <code>=</code> (cùng mọi khoảng trắng xung quanh), và giá trị kết quả</strong>.</p>
        <p>Một tinh chỉnh rất thông minh cần nhớ: Mặc định <code>f"{x=}"</code> dùng <strong><code>!r</code> (<code>repr</code>)</strong> để bạn nhìn rõ kiểu dữ liệu. Nhưng nếu bạn đính kèm <code>:format_spec</code> (như <code>f"{x=:.2f}"</code>), Python sẽ chuyển sang định dạng trực tiếp trên giá trị gốc mà không ép qua <code>repr()</code> nữa!</p>
      `,
      codeExamples: [
        {
          title: 'Tận dụng {x=} để soi giá trị biến và biểu thức phức tạp',
          code: `user = "minh_anh"
scores = [8.5, 9.0, 9.75]
tax_rate = 0.08

# 1. Giữ nguyên khoảng trắng xung quanh dấu = và tự động dùng !r
print(f"{user=}")
print(f"{user = }")
print(f"{sum(scores) / len(scores) = }")

# 2. Kết hợp {x=} với !s hoặc :format_spec
print(f"{user=!s}")
print(f"{sum(scores) / len(scores) = :.2f}")
print(f"{tax_rate = :+.1%}")`,
          output: `user='minh_anh'
user = 'minh_anh'
sum(scores) / len(scores) = 9.083333333333334
user=minh_anh
sum(scores) / len(scores) = 9.08
tax_rate = +8.0%`,
          annotations: [
            { line: 6, text: 'Mặc định {user=} gọi repr(user) nên in ra dấu nháy đơn \'minh_anh\'.' },
            { line: 7, text: 'Khoảng trắng trước và sau dấu = được bảo toàn nguyên vẹn trong chuỗi kết quả.' },
            { line: 11, text: 'Thêm !s sau dấu = nếu muốn in giá trị qua str() thay vì repr().' },
            { line: 12, text: 'Khi có :.2f sau dấu =, Python định dạng trực tiếp số float thành 9.08.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Format Spec lồng nhau {x:{w}.{p}f} và Thoát ngoặc nhọn {{ }}',
      badge: null,
      content: `
        <p>Điều gì xảy ra khi độ rộng cột <code>width</code>, hướng căn lề <code>align</code> hay số chữ số thập phân <code>precision</code> không cố định mà phụ thuộc vào dữ liệu lúc chạy? Bạn có thể đặt các cặp ngoặc nhọn <code>{}</code> <strong>ngay bên trong phần <code>:format_spec</code></strong>!</p>
        <p>Bên cạnh đó, nếu muốn in ký tự ngoặc nhọn <code>{</code> hoặc <code>}</code> thật sự ra màn hình (ví dụ khi sinh mã JSON, LaTeX hoặc CSS bằng f-string), hãy nhân đôi chúng thành <code>{{</code> và <code>}}</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Định dạng động bằng ngoặc nhọn lồng nhau và thoát {{ }}',
          code: `data = [12.3, 456.7891, 9.05]

# Tự động tính độ rộng cột dựa trên dữ liệu hoặc cấu hình người dùng
col_width = 12
decimals = 3
align_char = ">"

for val in data:
    # {val:{align_char}{col_width}.{decimals}f} sẽ được giải nén thành {val:>12.3f}
    print(f"| {val:{align_char}{col_width}.{decimals}f} |")

# Thoát ngoặc nhọn {{ }} khi tạo chuỗi JSON hoặc biểu thức toán
metric_name = "cpu_load"
metric_val = 0.75
print(f'{{"metric": "{metric_name}", "value": {metric_val:.2f}}}')`,
          output: `|       12.300 |
|      456.789 |
|        9.050 |
{"metric": "cpu_load", "value": 0.75}`,
          annotations: [
            { line: 10, text: 'Python đánh giá các biến bên trong format_spec trước (tạo thành ">12.3f"), rồi áp dụng lên val.' },
            { line: 15, text: '{{ ở đầu và }} ở cuối biến thành { và } tĩnh trong chuỗi JSON, còn {metric_name} vẫn được nội suy.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Cuộc cách mạng PEP 701 (Python 3.12 – 3.14)',
      badge: null,
      content: `
        <p>Trước Python 3.12, f-string bị xử lý bằng một bộ tách từ thủ công đầy hạn chế: không được dùng trùng loại dấu nháy, không được dùng ký tự <code>\\</code> trong <code>{...}</code>, và không được viết chú thích <code>#</code>. Từ Python 3.12 trở đi (và ổn định hoàn toàn trong Python 3.14), <strong>PEP 701</strong> đã tích hợp f-string trực tiếp vào bộ phân tích cú pháp PEG chính thức, mang lại 4 siêu năng lực:</p>
        <ol>
          <li><strong>Tái sử dụng cùng loại dấu nháy:</strong> Bên trong <code>f"..."</code>, bạn thoải mái viết <code>{user["name"]}</code> mà không cần đổi sang nháy đơn.</li>
          <li><strong>Dùng ký tự gạch chéo ngược <code>\\</code> trong biểu thức:</strong> Viết trực tiếp <code>f"Danh sách:\\n{'\\n'.join(items)}"</code> hợp lệ 100%.</li>
          <li><strong>Lồng f-string nhiều cấp tùy ý:</strong> Có thể đặt <code>f"..."</code> bên trong <code>{...}</code> của một <code>f"..."</code> khác.</li>
          <li><strong>Viết <code># comment</code> bên trong biểu thức ngoặc nhọn nhiều dòng:</strong> Giúp giải thích công thức phức tạp ngay trong f-string.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Bốn tính năng hiện đại của f-string theo chuẩn PEP 701',
          code: `employee = {"name": "Lê Hoàng", "skills": ["Python", "Rust", "SQL"]}

# 1. Tái sử dụng dấu nháy kép "" ngay bên trong f"..."
# 2. Dùng '\\n' trực tiếp trong .join() bên trong {}
print(f"Hồ sơ: {employee["name"]}\\nKỹ năng:\\n{ "\\n".join(f"  - {s}" for s in employee["skills"]) }")

# 3. Biểu thức nhiều dòng có kèm chú thích # comment bên trong {}
base_salary = 25_000_000
bonus_rate = 0.2
summary = f"Thực lĩnh: {
    base_salary * (1 + bonus_rate)  # Cộng thưởng hiệu suất 20%
    - 1_500_000                     # Khấu trừ bảo hiểm cố định
:,.0f} VNĐ"
print(summary)`,
          output: `Hồ sơ: Lê Hoàng
Kỹ năng:
  - Python
  - Rust
  - SQL
Thực lĩnh: 28,500,000 VNĐ`,
          annotations: [
            { line: 5, text: 'Vừa dùng lại nháy kép employee["name"], vừa dùng "\\n".join(...), vừa lồng f"  - {s}" bên trong!' },
            { line: 10, text: 'Ngay cả trong f-string một dấu nháy f"...", biểu thức bên trong { ... } vẫn có thể xuống dòng và chứa # comment!' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Áp dụng định dạng số thực sau khi đã dùng cờ chuyển đổi !r hoặc !s',
        content: 'Biểu thức `f"{3.14159!r:.2f}"` có vẻ hợp lý nhưng thực tế sẽ cắt chuỗi `\'3.14159\'` hay báo lỗi? Nó ném `ValueError: Unknown format code \'f\' for object of type \'str\'`! Vì `!r` biến số `3.14159` thành đối tượng `str` trước, mà kiểu `str` thì không có mã định dạng `f`.'
      },
      {
        title: 'Lạm dụng lồng f-string quá sâu làm giảm khả năng đọc code',
        content: 'Dù PEP 701 cho phép lồng f-string không giới hạn và tái sử dụng dấu nháy kép liên tục, việc nhồi nhét logic quá phức tạp vào một dòng `f"..."` sẽ khiến đồng nghiệp rất khó bảo trì. Nếu biểu thức dài quá 1-2 phép biến đổi, hãy tách ra biến trung gian có tên rõ nghĩa.'
      }
    ],
    tips: [
      {
        title: 'Mẹo kết hợp {biến=} với định dạng nghìn để debug số lớn',
        content: 'Khi gỡ lỗi các con số hàng triệu hoặc tỷ, thay vì viết `f"{total_bytes=}"` (in ra `total_bytes=1073741824` rất khó đếm chữ số), hãy viết `f"{total_bytes=:,}"` hoặc `f"{total_bytes=:_}"` để nhận ngay `total_bytes=1,073,741,824`!'
      }
    ],
    deepDive: {
      title: 'Cách trình biên dịch CPython xử lý f-string từ PEP 701',
      content: '<p>Trước Python 3.12, trình biên dịch coi toàn bộ f-string là một hằng chuỗi thường rồi mới cắt nhỏ các đoạn trong <code>{}</code> để gọi hàm <code>PyParser</code> lần hai — dẫn đến việc không thể biết dấu <code>"</code> bên trong <code>{}</code> là mở đầu chuỗi con hay kết thúc f-string. Với PEP 701, bộ từ vựng (lexer) và bộ phân tích PEG hoạt động theo ngăn xếp trạng thái (stateful tokenizer): ngay khi gặp dấu <code>{</code> bên trong f-string, lexer chuyển sang chế độ biểu thức Python chuẩn hoàn toàn độc lập cho đến khi gặp dấu <code>}</code> cân bằng.</p>'
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'In thông tin gỡ lỗi (Debug Log) với {x=} và !a',
      problem: 'Cho biến `query = "SELECT * FROM users\\nWHERE role = \'admin\'"` và `elapsed_sec = 0.004567`. Hãy in 2 dòng:\n1) Sử dụng cú pháp `{query=}` (mặc định dùng `!r`).\n2) Sử dụng cú pháp `{elapsed_sec = :.4f}` (có khoảng trắng quanh dấu `=` và làm tròn 4 chữ số thập phân).',
      hint: 'Đặt trực tiếp biểu thức vào f"{query=}" và f"{elapsed_sec = :.4f}".',
      solutionCode: `query = "SELECT * FROM users\\nWHERE role = 'admin'"
elapsed_sec = 0.004567

print(f"{query=}")
print(f"{elapsed_sec = :.4f}")`,
      solutionOutput: `query="SELECT * FROM users\\nWHERE role = 'admin'"
elapsed_sec = 0.0046`,
      explanation: 'Với `{query=}`, Python tự động dùng `repr(query)` nên ký tự xuống dòng được hiển thị rõ thành `\\n` trên cùng một dòng log. Với `{elapsed_sec = :.4f}`, Python in kèm tên biến, dấu `=` có khoảng trắng và định dạng số thực 4 chữ số.'
    },
    {
      level: 'Vừa',
      title: 'Hàm tạo bảng căn lề động theo độ dài dữ liệu',
      problem: 'Viết hàm `render_kv_table(rows, pad_char=".")` nhận danh sách các cặp `(key, value)` (trong đó `value` là số nguyên) và trả về chuỗi nhiều dòng. Độ rộng của cột `key` phải tự động bằng độ dài của `key` dài nhất cộng thêm 4 ký tự, căn trái và đệm bằng `pad_char`. Cột `value` căn phải trong độ rộng 10 có dấu phẩy tách nghìn.',
      hint: 'Tính key_width = max(len(k) for k, _ in rows) + 4, sau đó dùng f"{k:{pad_char}<{key_width}s}{v:>10,d}".',
      solutionCode: `def render_kv_table(rows: list[tuple[str, int]], pad_char: str = ".") -> str:
    key_width = max(len(k) for k, _ in rows) + 4
    lines = [
        f"{k:{pad_char}<{key_width}s}{v:>10,d}"
        for k, v in rows
    ]
    return "\\n".join(lines)

metrics = [
    ("Request thành công", 128450),
    ("Lỗi 500", 12),
    ("Băng thông (KB)", 9450200)
]
print(render_kv_table(metrics))`,
      solutionOutput: `Request thành công....   128,450
Lỗi 500...............        12
Băng thông (KB)....... 9,450,200`,
      explanation: 'Cú pháp `{k:{pad_char}<{key_width}s}` nội suy `pad_char` và `key_width` trước để tạo ra format spec `. <22s`, giúp bảng tự động co giãn vừa khít với mọi bộ dữ liệu.'
    },
    {
      level: 'Khó',
      title: 'Khai thác PEP 701 tạo báo cáo từ cấu trúc lồng nhau',
      problem: 'Cho từ điển `server = {"host": "prod-db-01", "tags": ["primary", "ssd", "encrypted"], "load": [0.42, 0.51, 0.37]}`. Chỉ dùng **một biểu thức f-string duy nhất**, hãy tạo chuỗi thông báo có định dạng:\n`Host "prod-db-01" [primary | ssd | encrypted] - Avg Load: 43.3%`\nTrong đó sử dụng trực tiếp dấu nháy kép `""` để truy cập key của `server` và nối `tags` theo chuẩn PEP 701.',
      hint: 'Bên trong f"...", dùng server["host"], " | ".join(server["tags"]) và sum(server["load"]) / len(server["load"]):.1%.',
      solutionCode: `server = {
    "host": "prod-db-01",
    "tags": ["primary", "ssd", "encrypted"],
    "load": [0.42, 0.51, 0.37]
}

report = f'Host "{server["host"]}" [{" | ".join(server["tags"])}] - Avg Load: {sum(server["load"]) / len(server["load"]):.1%}'
print(report)`,
      solutionOutput: `Host "prod-db-01" [primary | ssd | encrypted] - Avg Load: 43.3%`,
      explanation: 'Nhờ PEP 701, bạn có thể dùng thoải mái `" | ".join(server["tags"])` với dấu nháy kép bên trong f-string mà không gặp lỗi SyntaxError như các phiên bản trước Python 3.12.'
    }
  ],

  quiz: [
    {
      question: 'Trong biểu thức `f"{val!r:>10}"`, thứ tự xử lý của Python là gì?',
      options: [
        'Căn phải `val` trong 10 ký tự trước, sau đó mới gọi `repr()` trên chuỗi kết quả',
        'Gọi `repr(val)` để chuyển thành chuỗi trước, sau đó mới căn phải chuỗi đó trong độ rộng 10 ký tự',
        'Gọi `str(val)` rồi mới gọi `repr()`',
        'Báo lỗi SyntaxError vì không thể dùng cả `!r` và `:>10` cùng lúc'
      ],
      correctIndex: 1,
      explanation: 'Theo quy tắc f-string, cờ chuyển đổi (`!s`, `!r`, `!a`) luôn được thực thi TRƯỚC khi kết quả được đưa vào `format(converted_value, format_spec)`.'
    },
    {
      question: 'Kết quả của `name = "An"; print(f"{name=}")` khác gì so với `print(f"{name=!s}")`?',
      options: [
        'Không khác gì nhau, cả hai đều in `name=An`',
        '`f"{name=}"` in ra `name=\'An\'` (dùng repr), còn `f"{name=!s}"` in ra `name=An` (dùng str)',
        '`f"{name=}"` in ra `An`, còn `f"{name=!s}"` in ra `name=An`',
        '`f"{name=!s}"` là cú pháp không hợp lệ'
      ],
      correctIndex: 1,
      explanation: 'Khi dùng `{biến=}` mà không chỉ định cờ chuyển đổi hay format spec, Python mặc định dùng `!r` (`repr`) nên chuỗi có dấu nháy đơn `\'An\'`. Khi chỉ định rõ `!s`, Python dùng `str()` nên không có dấu nháy đơn.'
    },
    {
      question: 'Tính năng nào sau đây được PEP 701 (Python 3.12+) cho phép sử dụng bên trong cặp ngoặc nhọn `{...}` của f-string?',
      options: [
        'Tái sử dụng cùng loại dấu nháy bao ngoài f-string và dùng ký tự gạch chéo ngược `\\` (như `\\n`)',
        'Dùng câu lệnh `return` và `break` trực tiếp bên trong `{...}`',
        'Tự động chống SQL Injection mà không cần thư viện',
        'Biến f-string thành hàm trì hoãn tính toán (lazy function)'
      ],
      correctIndex: 0,
      explanation: 'PEP 701 gỡ bỏ các giới hạn từ vựng cũ của f-string, cho phép dùng lại cùng loại dấu nháy, dùng ký tự thoát `\\`, lồng f-string nhiều cấp và viết `# comment` bên trong biểu thức `{...}`.'
    },
    {
      question: 'Để in ra màn hình chuỗi văn bản nguyên vẹn `{status}: OK` (trong đó chữ `{status}` có dấu ngoặc nhọn thật sự, còn `OK` lấy từ biến `msg = "OK"`), ta viết f-string như thế nào?',
      options: [
        'f"\\{status\\}: {msg}"',
        'f"{{status}}: {msg}"',
        'f"{{{status}}}: {msg}"',
        'rf"{status}: {msg}"'
      ],
      correctIndex: 1,
      explanation: 'Trong f-string (và `str.format()`), để tạo một ký tự ngoặc nhọn tĩnh `{` hoặc `}`, bạn nhân đôi nó thành `{{` hoặc `}}`. Ký tự `\\` không dùng để thoát ngoặc nhọn trong f-string.'
    }
  ],

  summary: [
    'Cấu trúc đầy đủ của một trường thay thế trong f-string là `{biểu_thức[=][!s|!r|!a][:format_spec]}`.',
    'Ba cờ chuyển đổi `!s` (`str`), `!r` (`repr`), `!a` (`ascii`) luôn chạy trước khi áp dụng `:format_spec`.',
    'Cú pháp `{x=}` giúp gỡ lỗi nhanh bằng cách in cả biểu thức lẫn giá trị (mặc định qua `repr`, hoặc qua `__format__` nếu có `:format_spec`).',
    'Format spec lồng nhau `{val:{width}.{prec}f}` cho phép tham số hóa độ rộng, căn lề và độ chính xác theo biến lúc chạy.',
    'Nhờ PEP 701 (Python 3.12–3.14), biểu thức trong `{...}` có thể dùng trùng dấu nháy, chứa ký tự thoát `\\n`, lồng f-string nhiều tầng và chứa chú thích `# comment`.'
  ]
};
