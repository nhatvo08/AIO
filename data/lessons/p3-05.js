export default {
  id: 'p3-05',
  partId: 'part-3',
  partTitle: 'Phần 3 – Định dạng chuỗi (Trung cấp → Nâng cao)',
  number: '3.5',
  title: 't-strings Chuyên Sâu (PEP 750): Định Dạng Chuỗi An Toàn Trong Python 3.14',
  subtitle: 'Làm chủ cú pháp t"...", module string.templatelib (Template, Interpolation, convert) và 3 mẫu thiết kế thực chiến chống XSS, SQL Injection & Structured Logging',
  level: 'Nâng cao',
  duration: '50 phút',
  isNew314: true,
  interactiveWidget: null,

  objectives: [
    'Hiểu bản chất t-string (t"..." và rt"...") trong Python 3.14: vì sao Template KHÔNG phải là str và vì sao Template + str ném lỗi TypeError.',
    'Nắm vững cấu trúc bất biến của đối tượng Template (.strings luôn có N + 1 phần tử, .interpolations có N phần tử, .values) và 4 thuộc tính của Interpolation (value, expression, conversion, format_spec).',
    'Duyệt qua Template bằng vòng lặp for kết hợp match/case và sử dụng hàm chuẩn string.templatelib.convert(value, conversion).',
    'Tự tay xây dựng 3 bộ xử lý Template thực chiến: lọc HTML chống XSS (html_safe), tách câu truy vấn SQL tham số hóa (sql_query) và ghi Structured Logging ra JSON.'
  ],

  intuition: {
    title: 'Khay nguyên liệu Bento tách ngăn thay vì nồi sinh tố xay nhuyễn',
    metaphor: 'Một `f-string` giống như chiếc máy xay sinh tố: bạn bỏ văn bản mẫu của lập trình viên và dữ liệu của người dùng vào, bấm nút, lập tức thu được một cốc `str` đồng nhất — không ai còn phân biệt được đâu là câu lệnh gốc, đâu là dữ liệu lạ do kẻ tấn công tiêm vào. Ngược lại, `t-string` (`t"..."`) trong Python 3.14 là một khay cơm Bento nhiều ngăn: ngăn `.strings` chứa đúng `N + 1` đoạn văn bản tĩnh của lập trình viên, còn ngăn `.interpolations` chứa `N` hộp dữ liệu kèm đầy đủ nhãn mác (`value`, `expression`, `conversion`, `format_spec`). Hàm xử lý (HTML/SQL/Logger) sẽ mở từng ngăn dữ liệu để khử trùng trước khi bày lên đĩa.',
    visualHtml: `
      <div style="padding:16px;border-radius:12px;background:rgba(15,23,42,0.8);border:1px solid rgba(192,132,252,0.4);font-family:system-ui,sans-serif;">
        <div style="font-size:13px;color:#c084fc;font-weight:700;text-transform:uppercase;margin-bottom:8px;">
          Giải phẫu <code>tmpl = t"&lt;p&gt;Chào {name!s:&gt;8}, điểm: {score:.1f}&lt;/p&gt;"</code>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;font-family:monospace;font-size:12px;">
          <div style="padding:10px;border-radius:8px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);">
            <div style="color:#38bdf8;font-weight:700;">strings[0]</div>
            <div style="color:#f8fafc;margin-top:4px;">"&lt;p&gt;Chào "</div>
          </div>
          <div style="padding:10px;border-radius:8px;background:rgba(244,114,182,0.14);border:1px solid rgba(244,114,182,0.45);">
            <div style="color:#f472b6;font-weight:700;">interpolations[0]</div>
            <div style="color:#f8fafc;margin-top:4px;">value: "An"<br/>expr: "name"<br/>conv: "s"<br/>spec: "&gt;8"</div>
          </div>
          <div style="padding:10px;border-radius:8px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);">
            <div style="color:#38bdf8;font-weight:700;">strings[1]</div>
            <div style="color:#f8fafc;margin-top:4px;">", điểm: "</div>
          </div>
          <div style="padding:10px;border-radius:8px;background:rgba(244,114,182,0.14);border:1px solid rgba(244,114,182,0.45);">
            <div style="color:#f472b6;font-weight:700;">interpolations[1]</div>
            <div style="color:#f8fafc;margin-top:4px;">value: 9.5<br/>expr: "score"<br/>conv: None<br/>spec: ".1f"</div>
          </div>
          <div style="padding:10px;border-radius:8px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);">
            <div style="color:#38bdf8;font-weight:700;">strings[2]</div>
            <div style="color:#f8fafc;margin-top:4px;">"&lt;/p&gt;"</div>
          </div>
        </div>
        <div style="margin-top:10px;font-size:12px;color:#cbd5e1;">
          ⚡ Quy luật bất biến: Nếu có <strong>N</strong> vùng nội suy (<code>len(tmpl.interpolations) == N</code>), thì <code>tmpl.strings</code> luôn luôn có đúng <strong>N + 1</strong> phần tử <code>str</code>!
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Cú pháp t"...", rt"..." và Vì sao Template KHÔNG phải là str',
      badge: 'Mới trong 3.14',
      content: `
        <p>Được định nghĩa trong <strong>PEP 750</strong> (Python 3.14), một <strong>t-string</strong> được viết bằng tiền tố <code>t</code> hoặc <code>T</code> trước dấu nháy (ví dụ <code>t"Xin chào {name}"</code>), hoặc kết hợp với tiền tố raw thành <code>rt"..."</code> / <code>tr"..."</code> để giữ nguyên ký tự gạch chéo ngược <code>\\</code> trong văn bản tĩnh.</p>
        <p>Hai quy tắc an toàn quan trọng nhất của t-string mà bạn phải khắc cốt ghi tâm:</p>
        <ul>
          <li><strong><code>Template</code> KHÔNG kế thừa từ <code>str</code>:</strong> <code>isinstance(t"hi", str)</code> trả về <code>False</code>. Bạn không thể vô tình truyền một <code>Template</code> chưa xử lý vào nơi chỉ nhận <code>str</code> mà không qua hàm kết xuất.</li>
          <li><strong>Quy tắc nối nghiêm ngặt:</strong> Bạn có thể nối hai Template bằng toán tử cộng (<code>Template + Template</code>) hoặc viết liền hai literal <code>t"a" t"b"</code>. Nhưng nếu lấy <strong><code>Template + str</code> hoặc <code>str + Template</code>, Python sẽ lập tức ném lỗi <code>TypeError</code></strong> để ngăn chặn việc trộn chuỗi ngoài luồng làm hỏng ranh giới kiểm duyệt!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra kiểu dữ liệu, Raw t-string (rt"...") và Quy tắc nối Template',
          code: `from string.templatelib import Template

user = "linh_dan"
greeting = t"Xin chào {user}!"

# 1. Template hoàn toàn KHÔNG phải là str
print("Kiểu dữ liệu :", type(greeting))
print("Là Template? :", isinstance(greeting, Template))
print("Là str?      :", isinstance(greeting, str))

# 2. Raw template string (rt"...") giữ nguyên dấu \\ trong phần tĩnh
regex_tmpl = rt"\\buser_id={user}\\b"
print("Raw strings  :", regex_tmpl.strings)

# 3. Nối Template + Template hợp lệ, nhưng Template + str ném TypeError
full_tmpl = t"Hệ thống: " + greeting
print("Nối 2 Template:", full_tmpl.strings, "| Values:", full_tmpl.values)

try:
    bad = greeting + " Chúc một ngày tốt lành"
except TypeError as e:
    print("Nối Template + str bị chặn:", e)`,
          output: `Kiểu dữ liệu : <class 'string.templatelib.Template'>
Là Template? : True
Là str?      : False
Raw strings  : ('\\\\buser_id=', '\\\\b')
Nối 2 Template: ('Hệ thống: Xin chào ', '!') | Values: ('linh_dan',)
Nối Template + str bị chặn: unsupported operand type(s) for +: 'string.templatelib.Template' and 'str'`,
          annotations: [
            { line: 9, text: 'isinstance(greeting, str) == False giúp hệ thống kiểu (type checker) và hàm API phân biệt rõ dữ liệu đã qua kiểm duyệt hay chưa.' },
            { line: 12, text: 'rt"..." (hoặc tr"...") hoạt động giống rf"...": không giải mã chuỗi thoát \\b, \\n ở phần văn bản tĩnh.' },
            { line: 16, text: 'Khi cộng 2 đối tượng Template, phần tử strings cuối của vế trái được ghép nối liền với phần tử strings đầu của vế phải.' },
            { line: 20, text: 'Cố tình cộng Template với str (hoặc ngược lại) sẽ ném TypeError ngay lập tức.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Giải phẫu lớp Template (.strings, .interpolations, .values) và Interpolation',
      badge: 'Mới trong 3.14',
      content: `
        <p>Khi một biểu thức <code>t"..."</code> được thực thi, Python tính toán các biểu thức bên trong <code>{...}</code> ngay tại thời điểm đó (giống f-string), nhưng <strong>chưa ép kiểu sang chuỗi và chưa áp dụng format_spec</strong>. Thay vào đó, mỗi vùng <code>{...}</code> được đóng gói thành một đối tượng bất biến <code>string.templatelib.Interpolation</code> gồm 4 thuộc tính:</p>
        <ul>
          <li><strong><code>.value</code></strong>: Giá trị Python thực tế sau khi tính biểu thức (giữ nguyên kiểu gốc như <code>int</code>, <code>float</code>, <code>list</code>, <code>datetime</code>...).</li>
          <li><strong><code>.expression</code></strong>: Chuỗi văn bản ghi lại đúng biểu thức mã nguồn ban đầu (ví dụ <code>"price * 1.1"</code>) — cực kỳ hữu ích cho việc gỡ lỗi và ghi log có cấu trúc!</li>
          <li><strong><code>.conversion</code></strong>: Một trong ba chuỗi <code>'r'</code>, <code>'s'</code>, <code>'a'</code> nếu có cờ <code>!r</code>, <code>!s</code>, <code>!a</code>, hoặc <code>None</code> nếu không có.</li>
          <li><strong><code>.format_spec</code></strong>: Chuỗi định dạng đứng sau dấu <code>:</code> (ví dụ <code>",.2f"</code>), hoặc chuỗi rỗng <code>""</code> nếu không có.</li>
        </ul>
        <p>Trên đối tượng <code>Template</code>, thuộc tính <strong><code>.strings</code> luôn là một tuple gồm <code>N + 1</code> chuỗi tĩnh</strong> (với <code>N</code> là số lượng <code>Interpolation</code>). Nếu mẫu bắt đầu/kết thúc bằng <code>{...}</code> hoặc có hai <code>{x}{y}</code> đứng sát nhau, Python sẽ đặt chuỗi rỗng <code>""</code> vào các vị trí biên đó.</p>
      `,
      codeExamples: [
        {
          title: 'Khám phá quy luật N + 1 của .strings và 4 thuộc tính của Interpolation',
          code: `price = 125000
qty = 3
item = "Sách Python 3.14"

# Mẫu bắt đầu và kết thúc ngay bằng vùng nội suy { ... }
tmpl = t"{item!r}: {price * qty:,.0f}"

print("Số lượng interpolations (N) :", len(tmpl.interpolations))
print("Số lượng strings (N + 1)    :", len(tmpl.strings))
print("tmpl.strings                :", tmpl.strings)
print("tmpl.values                 :", tmpl.values)

for idx, interp in enumerate(tmpl.interpolations):
    print(
        f"[{idx}] value={interp.value!r} (type={type(interp.value).__name__}) | "
        f"expr={interp.expression!r} | conv={interp.conversion!r} | spec={interp.format_spec!r}"
    )`,
          output: `Số lượng interpolations (N) : 2
Số lượng strings (N + 1)    : 3
tmpl.strings                : ('', ': ', '')
tmpl.values                 : ('Sách Python 3.14', 375000)
[0] value='Sách Python 3.14' (type=str) | expr='item' | conv='r' | spec=''
[1] value=375000 (type=int) | expr='price * qty' | conv=None | spec=',.0f'`,
          annotations: [
            { line: 6, text: 'Vì {item!r} đứng ngay đầu và {price * qty:,.0f} đứng sát cuối, strings[0] và strings[2] đều là chuỗi rỗng "".' },
            { line: 11, text: 'tmpl.values trả về nhanh tuple các giá trị đã tính (\'Sách Python 3.14\', 375000), giữ nguyên kiểu int cho 375000.' },
            { line: 15, text: 'Chú ý: dù có !r và :,.0f, interp.value vẫn là giá trị thô chưa bị biến đổi; conv và spec được lưu riêng để hàm xử lý quyết định!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Duyệt qua Template với match/case và hàm convert()',
      badge: 'Mới trong 3.14',
      content: `
        <p>Để giúp việc viết hàm xử lý <code>Template</code> thuận tiện nhất, đối tượng <code>Template</code> là một <strong>iterable</strong>. Khi bạn lặp <code>for part in template:</code>, Python trả về xen kẽ các đoạn <code>str</code> và <code>Interpolation</code> theo đúng thứ tự xuất hiện, nhưng <strong>tự động lược bỏ tất cả các chuỗi tĩnh rỗng <code>""</code></strong>!</p>
        <p>Kết hợp với cấu trúc <code>match / case</code> và hàm trợ giúp <strong><code>string.templatelib.convert(value, conversion)</code></strong> (thực hiện chuyển đổi <code>'s'</code> ➔ <code>str</code>, <code>'r'</code> ➔ <code>repr</code>, <code>'a'</code> ➔ <code>ascii</code>, hoặc giữ nguyên nếu <code>None</code>), bạn có thể viết một bộ kết xuất tổng quát chỉ trong vài dòng code.</p>
      `,
      codeExamples: [
        {
          title: 'Duyệt Template bằng match/case và sử dụng string.templatelib.convert()',
          code: `from string.templatelib import Template, Interpolation, convert

def render_fstring_equivalent(template: Template) -> str:
    """Mô phỏng lại chính xác cách f-string kết xuất một Template."""
    out = []
    for item in template:
        match item:
            case str() as static_text:
                out.append(static_text)
            case Interpolation(value, _, conversion, format_spec):
                # Bước 1: Áp dụng cờ chuyển đổi (!s, !r, !a) nếu có
                val = convert(value, conversion)
                # Bước 2: Áp dụng đặc tả định dạng (:format_spec)
                out.append(format(val, format_spec))
    return "".join(out)

x = 42
name = "Đức"
t = t"{x}# Xin chào {name!a:>10} -> {x / 7:.3f}"

# Lưu ý: list(t) tự động bỏ qua chuỗi rỗng "" ở đầu trước {x}
print("Số phần tử khi duyệt for:", len(list(t)))
print("Kết quả render          :", render_fstring_equivalent(t))`,
          output: `Số phần tử khi duyệt for: 6
Kết quả render          : 42# Xin chào  '\\u0110\\u1ee9c' -> 6.000`,
          annotations: [
            { line: 6, text: 'Vòng lặp for item in template tự động bỏ qua các chuỗi "" rỗng trong .strings.' },
            { line: 10, text: 'Interpolation hỗ trợ распаковка (positional pattern matching) theo đúng thứ tự (value, expression, conversion, format_spec).' },
            { line: 12, text: 'convert(value, conversion) là hàm chuẩn của string.templatelib để xử lý cờ !s, !r, !a.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Ba Mẫu Thiết Kế Thực Chiến Với t-string (HTML, SQL & Structured Log)',
      badge: 'Mới trong 3.14',
      content: `
        <p>Sức mạnh thực sự của PEP 750 tỏa sáng khi bạn viết các hàm nhận <code>Template</code> để giải quyết triệt để ba bài toán kinh điển của kỹ nghệ phần mềm:</p>
        <ol>
          <li><strong>Chống XSS trong HTML (<code>html_safe</code>):</strong> Giữ nguyên các thẻ HTML ở phần văn bản tĩnh (<code>.strings</code>), nhưng tự động chạy <code>html.escape()</code> cho mọi giá trị nội suy (<code>Interpolation</code>).</li>
          <li><strong>Truy vấn SQL tham số hóa (<code>sql_query</code>):</strong> Thay thế mọi vùng <code>{...}</code> bằng dấu hỏi chấm <code>?</code> (hoặc <code>$1, $2</code>) để tạo câu lệnh chuẩn, đồng thời gom các <code>interp.value</code> thành một tuple tham số tách rời truyền cho DB driver — miễn nhiễm 100% với SQL Injection!</li>
          <li><strong>Structured Logging (<code>log_structured</code>):</strong> Tận dụng <code>interp.expression</code> làm tên trường (key) và <code>interp.value</code> làm giá trị nguyên bản để vừa in bản tin con người dễ đọc, vừa xuất JSON tự động cho hệ thống giám sát (Datadog, ELK).</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Thực chiến 1, 2 & 3: HTML Sanitizer, SQL Parameterizer và Structured Logger',
          code: `import html
import json
from string.templatelib import Template, Interpolation, convert

# 1. THỰC CHIẾN 1: Tự động Escape HTML chống tấn công XSS
def html_safe(template: Template) -> str:
    parts = []
    for item in template:
        match item:
            case str() as s:
                parts.append(s)
            case Interpolation(value, _, conversion, format_spec):
                formatted = format(convert(value, conversion), format_spec)
                parts.append(html.escape(formatted, quote=True))
    return "".join(parts)

# 2. THỰC CHIẾN 2: Tách câu lệnh SQL tham số hóa (?) và tuple params
def sql_query(template: Template) -> tuple[str, tuple]:
    query_parts = []
    params = []
    for item in template:
        match item:
            case str() as s:
                query_parts.append(s)
            case Interpolation(value, _, _, _):
                query_parts.append("?")
                params.append(value)
    return "".join(query_parts), tuple(params)

# 3. THỰC CHIẾN 3: Structured Logging trích xuất tự động cặp (expression: value)
def log_structured(template: Template) -> str:
    msg_parts = []
    context = {}
    for item in template:
        match item:
            case str() as s:
                msg_parts.append(s)
            case Interpolation(value, expr, conversion, format_spec):
                msg_parts.append(format(convert(value, conversion), format_spec))
                context[expr.strip()] = value
    return json.dumps({"message": "".join(msg_parts), "fields": context}, ensure_ascii=False)

# --- KIỂM CHỨNG CẢ 3 CÔNG CỤ ---
attacker_input = "<script>stealCookies()</script>"
print("1. HTML Safe :", html_safe(t"<div class='bio'>Tên: {attacker_input}</div>"))

evil_id = "1 OR 1=1 --"
min_bal = 500.0
sql_stmt, sql_params = sql_query(t"SELECT * FROM accounts WHERE id = {evil_id} AND balance >= {min_bal}")
print("2. SQL Query :", sql_stmt, "| Params:", sql_params)

order_id = 9081
latency_ms = 14.68
print("3. JSON Log  :", log_structured(t"Xử lý đơn {order_id} hoàn tất trong {latency_ms:.1f}ms"))`,
          output: `1. HTML Safe : <div class='bio'>Tên: &lt;script&gt;stealCookies()&lt;/script&gt;</div>
2. SQL Query : SELECT * FROM accounts WHERE id = ? AND balance >= ? | Params: ('1 OR 1=1 --', 500.0)
3. JSON Log  : {"message": "Xử lý đơn 9081 hoàn tất trong 14.7ms", "fields": {"order_id": 9081, "latency_ms": 14.68}}`,
          annotations: [
            { line: 14, text: 'Thẻ <div class=\'bio\'> trong phần tĩnh được giữ nguyên, chỉ có biến attacker_input bị html.escape().' },
            { line: 26, text: 'Mọi vùng nội suy đều biến thành dấu ? và giá trị gốc đẩy vào params — kẻ tấn công nhập "1 OR 1=1" cũng vô hại.' },
            { line: 40, text: 'Nhờ interp.expression, hàm log tự biết tên biến gốc là "order_id" và "latency_ms" mà không cần truyền dict thủ công!' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Gọi str(t"...") với kỳ vọng nhận được chuỗi đã nối như f-string',
        content: 'Bởi vì `Template` không biết ngữ cảnh đích là HTML, SQL hay Shell, việc gọi `str(t"Chào {name}")` KHÔNG nối chuỗi mà chỉ trả về chuỗi biểu diễn đối tượng dạng `Template(strings=(\'Chào \', \'\'), interpolations=(...))`. Bạn luôn phải truyền `Template` qua một hàm xử lý (processor function).'
      },
      {
        title: 'Nhầm lẫn giữa số phần tử của tmpl.strings và số phần tử khi duyệt for item in tmpl',
        content: 'Thuộc tính `tmpl.strings` luôn giữ đầy đủ `N + 1` chuỗi tĩnh (kể cả chuỗi rỗng `""` ở đầu, cuối hoặc giữa hai `{x}{y}` liền nhau). Ngược lại, vòng lặp `for item in tmpl:` tự động bỏ qua các chuỗi `""` rỗng để bạn xử lý ngắn gọn hơn.'
      }
    ],
    tips: [
      {
        title: 'Khởi tạo thủ công Template và Interpolation khi viết Unit Test',
        content: 'Cả hai lớp `Template(*args)` và `Interpolation(value, expression="", conversion=None, format_spec="")` trong `string.templatelib` đều có thể được khởi tạo trực tiếp bằng code Python thông thường để phục vụ kiểm thử hoặc xây dựng cây template động.'
      }
    ],
    deepDive: {
      title: 'Cách t-string xử lý Format Spec lồng nhau và Cú pháp gỡ lỗi {x=}',
      content: '<p>Điều gì xảy ra khi bạn dùng tính năng nâng cao của f-string bên trong t-string? PEP 750 hỗ trợ trọn vẹn cả hai:<br/>1) Với format spec lồng nhau như <code>t"{val:{width}.{prec}f}"</code>, Python tự động tính toán các nội suy bên trong phần format spec trước để thuộc tính <code>interp.format_spec</code> nhận được chuỗi phẳng đã giải nén (ví dụ <code>"10.2f"</code>).<br/>2) Với cú pháp tự gỡ lỗi <code>t"{x=}"</code>, Python chèn chuỗi tĩnh <code>"x="</code> vào phần tử <code>.strings</code> đứng ngay trước đó, đồng thời đặt <code>interp.conversion = "r"</code> (nếu bạn chưa chỉ định conversion hay format_spec nào khác).</p>'
    },
    newIn314: {
      title: 'PEP 750 — Bước ngoặt lớn nhất về xử lý chuỗi trong Python 3.14',
      content: 'Sau gần một thập kỷ kể từ khi f-string ra đời ở Python 3.6, t-string (PEP 750) mang khả năng tương đương Tagged Templates của JavaScript và String Interpolation của Rust/C# vào Python 3.14 với thiết kế hướng đối tượng tường minh và an toàn tuyệt đối.'
    }
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Khám phá cấu trúc Template và kiểm tra bất biến N + 1',
      problem: 'Viết hàm `inspect_template(tmpl: Template) -> dict` trả về một từ điển gồm 4 khóa:\n- `"num_strings"`: số lượng phần tử trong `tmpl.strings`\n- `"num_interpolations"`: số lượng phần tử trong `tmpl.interpolations`\n- `"expressions"`: danh sách các chuỗi `.expression` của từng interpolation\n- `"non_empty_items"`: tổng số phần tử thực tế khi duyệt `for item in tmpl`',
      hint: 'Dùng len(tmpl.strings), len(tmpl.interpolations), [i.expression for i in tmpl.interpolations] và len(list(tmpl)).',
      solutionCode: `from string.templatelib import Template

def inspect_template(tmpl: Template) -> dict:
    return {
        "num_strings": len(tmpl.strings),
        "num_interpolations": len(tmpl.interpolations),
        "expressions": [i.expression for i in tmpl.interpolations],
        "non_empty_items": len(list(tmpl))
    }

a, b = 10, 20
# Mẫu bắt đầu và kết thúc bằng vùng nội suy, và có 2 nội suy liền kề {a}{b}
sample = t"{a}{b} = {a + b}"
print(inspect_template(sample))`,
      solutionOutput: `{'num_strings': 4, 'num_interpolations': 3, 'expressions': ['a', 'b', 'a + b'], 'non_empty_items': 4}`,
      explanation: 'Mẫu có 3 vùng nội suy (`N = 3`) nên `.strings` có đúng `N + 1 = 4` phần tử là `("", "", " = ", "")`. Khi duyệt `list(sample)`, 3 chuỗi rỗng `""` bị bỏ qua, chỉ còn lại 3 đối tượng `Interpolation` và 1 chuỗi `" = "` (tổng cộng 4 phần tử).'
    },
    {
      level: 'Vừa',
      title: 'Xây dựng bộ tạo câu lệnh Shell chống Command Injection',
      problem: 'Viết hàm `safe_shell(tmpl: Template) -> str` sử dụng hàm `shlex.quote()` của thư viện chuẩn để bọc an toàn mọi giá trị nội suy trong `tmpl` (sau khi đã áp dụng `convert` và `format`), giữ nguyên các phần văn bản lệnh tĩnh.',
      hint: 'Duyệt qua tmpl, nếu là Interpolation thì tính text = format(convert(item.value, item.conversion), item.format_spec) rồi thêm shlex.quote(text).',
      solutionCode: `import shlex
from string.templatelib import Template, Interpolation, convert

def safe_shell(tmpl: Template) -> str:
    parts = []
    for item in tmpl:
        match item:
            case str() as s:
                parts.append(s)
            case Interpolation(value, _, conversion, format_spec):
                rendered = format(convert(value, conversion), format_spec)
                parts.append(shlex.quote(rendered))
    return "".join(parts)

malicious_filename = "report.txt; rm -rf /"
cmd = safe_shell(t"cat {malicious_filename} | wc -l")
print(cmd)`,
      solutionOutput: `cat 'report.txt; rm -rf /' | wc -l`,
      explanation: 'Nhờ `t-string` tách riêng biến `malicious_filename`, hàm `safe_shell` bọc riêng giá trị đó bằng `shlex.quote()` thành một đối số chuỗi đơn an toàn `\'report.txt; rm -rf /\'`, trong khi dấu pipe `|` ở phần tĩnh của câu lệnh vẫn hoạt động bình thường!'
    },
    {
      level: 'Khó',
      title: 'Bộ biên dịch truy vấn SQL sang chuẩn PostgreSQL (`$1`, `$2`, ...)',
      problem: 'Khác với SQLite dùng dấu `?`, PostgreSQL dùng ký hiệu giữ chỗ đánh số thứ tự `$1`, `$2`, `$3`... Hãy viết hàm `pg_compile(tmpl: Template) -> tuple[str, list]` nhận vào một `Template` (có thể được ghép từ nhiều `Template` con bằng toán tử `+`) và trả về `(câu_lệnh_sql, danh_sách_tham_số)`.',
      hint: 'Dùng một biến đếm param_index bắt đầu từ 1, tăng dần mỗi khi gặp một đối tượng Interpolation.',
      solutionCode: `from string.templatelib import Template, Interpolation

def pg_compile(tmpl: Template) -> tuple[str, list]:
    sql_chunks = []
    params = []
    param_idx = 1

    for item in tmpl:
        match item:
            case str() as s:
                sql_chunks.append(s)
            case Interpolation(value, _, _, _):
                sql_chunks.append(f"\${param_idx}")
                params.append(value)
                param_idx += 1

    return "".join(sql_chunks), params

dept = "Engineering"
min_salary = 2000
limit_rows = 5

# Ghép động nhiều mảnh Template bằng toán tử +
base_query = t"SELECT id, name FROM employees WHERE dept = {dept}"
filter_clause = t" AND salary >= {min_salary}"
limit_clause = t" ORDER BY salary DESC LIMIT {limit_rows}"

full_query = base_query + filter_clause + limit_clause
sql_text, bound_params = pg_compile(full_query)

print("SQL   :", sql_text)
print("Params:", bound_params)`,
      solutionOutput: `SQL   : SELECT id, name FROM employees WHERE dept = $1 AND salary >= $2 ORDER BY salary DESC LIMIT $3
Params: ['Engineering', 2000, 5]`,
      explanation: 'Vì phép cộng `Template + Template` tạo ra một `Template` hợp nhất giữ nguyên mọi `Interpolation`, bạn có thể ghép nối các mảnh truy vấn SQL động một cách tự nhiên rồi đánh số `$1, $2, $3` một lần duy nhất ở bước biên dịch cuối cùng.'
    }
  ],

  quiz: [
    {
      question: 'Trong Python 3.14, cho `x = 10; y = 20; tmpl = t"{x}{y}"`. Giá trị của `tmpl.strings` và `list(tmpl)` có độ dài lần lượt là bao nhiêu?',
      options: [
        'len(tmpl.strings) == 2 và len(list(tmpl)) == 2',
        'len(tmpl.strings) == 3 và len(list(tmpl)) == 2',
        'len(tmpl.strings) == 3 và len(list(tmpl)) == 5',
        'len(tmpl.strings) == 0 và len(list(tmpl)) == 2'
      ],
      correctIndex: 1,
      explanation: 'Có `N = 2` vùng nội suy nên `tmpl.strings` luôn có `N + 1 = 3` phần tử là `("", "", "")`. Khi duyệt `list(tmpl)`, các chuỗi rỗng `""` bị bỏ qua nên chỉ còn lại đúng 2 phần tử `Interpolation`.'
    },
    {
      question: 'Điều gì xảy ra khi thực thi đoạn mã `t"Xin chào " + "An"` trong Python 3.14?',
      options: [
        'Trả về chuỗi str `"Xin chào An"`',
        'Trả về đối tượng Template tương đương `t"Xin chào An"`',
        'Phát sinh lỗi `TypeError` vì không được phép cộng trực tiếp `Template` với `str`',
        'Phát sinh lỗi `ValueError`'
      ],
      correctIndex: 2,
      explanation: 'Theo PEP 750, `Template` chỉ cho phép nối với một `Template` khác (`Template + Template`). Phép cộng `Template + str` hoặc `str + Template` bị cấm và ném `TypeError` để đảm bảo an toàn dữ liệu.'
    },
    {
      question: 'Trong đối tượng `Interpolation` tạo bởi `price = 99.5; t"{price!r:>10}"`, giá trị của thuộc tính `interp.value` và `interp.conversion` là gì?',
      options: [
        '`interp.value` là `"      99.5"` và `interp.conversion` là `"!r"`',
        '`interp.value` là `99.5` (kiểu float) và `interp.conversion` là `"r"`',
        '`interp.value` là `"99.5"` (kiểu str) và `interp.conversion` là `None`',
        '`interp.value` là `99.5` và `interp.conversion` là `repr`'
      ],
      correctIndex: 1,
      explanation: 'Khác với f-string, `t-string` KHÔNG tự động chạy cờ chuyển đổi hay format spec lên `interp.value`. Do đó `interp.value` giữ nguyên số thực `99.5`, còn `interp.conversion` lưu chuỗi `"r"` (không kèm dấu `!`).'
    },
    {
      question: 'Hàm `string.templatelib.convert(value, conversion)` trả về kết quả gì khi tham số `conversion` là `None`?',
      options: [
        'Trả về `str(value)`',
        'Trả về chính đối tượng `value` nguyên vẹn mà không chuyển đổi kiểu',
        'Trả về `None`',
        'Ném lỗi `ValueError`'
      ],
      correctIndex: 1,
      explanation: 'Khi `conversion is None` (tức không có cờ `!s`, `!r`, `!a`), hàm `convert(value, None)` trả về nguyên gốc đối tượng `value` để bước tiếp theo có thể gọi `format(value, format_spec)` đúng theo kiểu dữ liệu của nó (như `float` hoặc `datetime`).'
    }
  ],

  summary: [
    'Cú pháp `t"..."` (và `rt"..."`, mới trong Python 3.14 — PEP 750) tạo ra đối tượng `string.templatelib.Template`, hoàn toàn KHÔNG phải là `str` (`isinstance(t"hi", str) == False`).',
    '`Template` có thuộc tính `.strings` (tuple gồm `N + 1` chuỗi tĩnh), `.interpolations` (tuple gồm `N` đối tượng `Interpolation`) và `.values` (tuple gồm `N` giá trị).',
    'Mỗi đối tượng `Interpolation` lưu giữ 4 thuộc tính: `.value` (giá trị gốc), `.expression` (văn bản biểu thức mã nguồn), `.conversion` (`"s"`, `"r"`, `"a"` hoặc `None`) và `.format_spec`.',
    'Khi lặp `for item in template:`, Python trả về xen kẽ `str` và `Interpolation` đồng thời tự động bỏ qua mọi chuỗi tĩnh rỗng `""`.',
    'Phép nối `Template + Template` hợp lệ, nhưng `Template + str` hoặc `str + Template` ném `TypeError` để bảo vệ ranh giới an toàn chống XSS và SQL Injection.'
  ]
};
