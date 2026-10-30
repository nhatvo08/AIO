export default {
  id: 'p7-01',
  partId: 'part-7',
  partTitle: 'Phần 7 – Thực chiến và Bảo mật (Chuyên sâu)',
  number: '7.1',
  title: 'Bảo mật chuỗi, Chống Injection, Timing Attack, Homoglyph & Type Hints hiện đại',
  subtitle: 'Từ SQL/XSS/Shell Injection, lỗ hổng str.format(), secrets.compare_digest() đến LiteralString và StrEnum',
  level: 'Chuyên sâu',
  duration: '55 phút',
  isNew314: true,
  interactiveWidget: null,
  objectives: [
    'Phòng chống triệt để SQL Injection, HTML/XSS và Shell Injection bằng Parameterized Queries, html.escape(), shlex.quote() và t-strings (PEP 750).',
    'Hiểu và chặn đứng lỗ hổng rò rỉ dữ liệu nhạy cảm khi để người dùng kiểm soát chuỗi mẫu của str.format().',
    'Sử dụng secrets.compare_digest() để chống Timing Attack và phát hiện tấn công giả mạo ký tự đồng hình (Homoglyph Attack).',
    'Áp dụng chuẩn Logging trì hoãn (lazy % formatting) và hệ thống Type Hints chuỗi hiện đại: Literal, LiteralString (PEP 675), và enum.StrEnum.'
  ],
  intuition: {
    title: 'Đừng bao giờ trộn lẫn "Bản thiết kế lệnh" và "Dữ liệu khách gửi"',
    metaphor: 'Hãy tưởng tượng bạn đưa cho nhân viên ngân hàng một tờ phiếu chuyển tiền. Nếu bạn dùng f-string để ghép tên khách hàng thẳng vào câu lệnh SQL hay Shell, điều đó giống như bạn cho phép khách hàng tự cầm bút viết thêm dòng chữ "...và chuyển toàn bộ tiền trong kho cho tôi" прямо vào phần mệnh lệnh của ngân hàng! Ngược lại, Parameterized Query và t-strings (PEP 750) đóng khung dữ liệu của khách vào một ô niêm phong riêng biệt: dù khách có viết ký hiệu gì bên trong, hệ thống cũng chỉ coi đó là văn bản thuần túy chứ không bao giờ thực thi như mã lệnh.',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-top:12px;font-family:system-ui,sans-serif;">
        <div style="padding:14px;border-radius:10px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.35);">
          <div style="font-weight:700;color:#ef4444;margin-bottom:6px;">❌ Nguy hiểm: Ghép f-string / format</div>
          <div style="font-size:12px;line-height:1.5;">
            • SQL/XSS/Shell Injection trực tiếp<br/>
            • <code>user_tpl.format(event=e)</code> làm lộ <code>__globals__[SECRET_KEY]</code><br/>
            • <code>token == expected</code> rò rỉ thời gian (Timing Attack)
          </div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.35);">
          <div style="font-weight:700;color:#10b981;margin-bottom:6px;">✅ Ла́ chắn bảo mật Python 3.14</div>
          <div style="font-size:12px;line-height:1.5;">
            • SQL Params / <strong>PEP 750 t-strings</strong><br/>
            • <code>html.escape()</code>, <code>shlex.quote()</code>, <code>string.Template</code><br/>
            • <code>secrets.compare_digest()</code> &amp; <code>LiteralString</code>
          </div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: '1. Phòng chống bộ ba Injection: SQL, HTML/XSS và Shell Command',
      badge: 'An toàn ứng dụng',
      content: `
        <p>Mọi lỗ hổng <strong>Injection (Tiêm mã độc)</strong> đều bắt nguồn từ cùng một sai lầm: ghép nối trực tiếp chuỗi đầu vào của người dùng (untrusted input) vào chuỗi lệnh bằng <code>+</code>, <code>%</code>, <code>str.format()</code> hoặc <code>f"..."</code>.</p>
        <ul>
          <li><strong>SQL Injection</strong>: Không bao giờ viết <code>f"SELECT * FROM users WHERE name = '{user}'"</code>. Kẻ tấn công chỉ cần nhập <code>' OR '1'='1</code> là đọc toàn bộ bảng!
            <br/>👉 <em>Giải pháp</em>: Luôn dùng <strong>Parameterized Query</strong> của DB driver (<code>cursor.execute("... WHERE name = ?", (user,))</code>) hoặc dùng <strong>t-string (PEP 750)</strong> trong Python 3.14 để bộ xử lý tự động tách phần tĩnh thành câu SQL và phần nội suy thành tuple tham số.</li>
          <li><strong>HTML / Cross-Site Scripting (XSS)</strong>: Nếu chèn thẳng bình luận của người dùng <code>&lt;script&gt;stealCookie()&lt;/script&gt;</code> vào trang web, trình duyệt sẽ thực thi mã độc.
            <br/>👉 <em>Giải pháp</em>: Luôn dùng <code>html.escape(untrusted_text, quote=True)</code> để biến <code>&lt; &gt; &amp; " '</code> thành thực thể HTML an toàn (<code>&amp;lt;</code>, <code>&amp;gt;</code>, ...), hoặc dùng hàm bọc <code>t"..."</code> tự động escape.</li>
          <li><strong>Shell / Command Injection</strong>: Không bao giờ gọi <code>os.system(f"ping -c 1 {host}")</code> hay <code>subprocess.run(..., shell=True)</code> với dữ liệu người dùng (kẻ tấn công truyền <code>8.8.8.8; rm -rf /</code>).
            <br/>👉 <em>Giải pháp</em>: Luôn truyền danh sách đối số <code>subprocess.run(["ping", "-c", "1", host], shell=False)</code>. Nếu bắt buộc phải sinh chuỗi lệnh cho tiến trình từ xa (như SSH), hãy bọc từng tham số bằng <code>shlex.quote(arg)</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Xử lý an toàn SQL (với t-string 3.14), HTML/XSS và Shell Command',
          code: `import html
import shlex
import sqlite3
from string.templatelib import Template

# 1. Bộ chuyển đổi t-string (Python 3.14 PEP 750) thành Parameterized SQL an toàn
def safe_sql(template: Template) -> tuple[str, tuple]:
    query_parts = []
    params = []
    for item in template:
        if isinstance(item, str):
            query_parts.append(item)
        else:
            query_parts.append("?")
            params.append(item.value)
    return "".join(query_parts), tuple(params)

malicious_user = "admin' OR '1'='1"
sql_query, sql_params = safe_sql(t"SELECT id, role FROM users WHERE username = {malicious_user}")
print("SQL Query :", sql_query)
print("SQL Params:", sql_params)

# 2. Chống XSS bằng html.escape()
xss_input = '<img src=x onerror="alert(document.cookie)">'
print("HTML Safe :", html.escape(xss_input, quote=True))

# 3. Chống Shell Injection bằng shlex.quote()
evil_filename = "report.txt; cat /etc/passwd"
safe_cmd = f"wc -l {shlex.quote(evil_filename)}"
print("Shell Safe:", safe_cmd)`,
          output: `SQL Query : SELECT id, role FROM users WHERE username = ?
SQL Params: ("admin' OR '1'='1",)
HTML Safe : &lt;img src=x onerror=&quot;alert(document.cookie)&quot;&gt;
Shell Safe: wc -l 'report.txt; cat /etc/passwd'`,
          annotations: [
            { line: 7, text: "Hàm safe_sql nhận đối tượng Template từ t'...' và tự động thay mọi vùng {expr} bằng dấu hỏi chấm '?'." },
            { line: 25, text: "html.escape(..., quote=True) mã hóa cả dấu <, > lẫn dấu nháy kép/đơn để an toàn ngay cả trong thuộc tính HTML." },
            { line: 29, text: "shlex.quote() khóa chặt chuỗi độc hại trong cặp nháy đơn POSIX để shell chỉ coi đó là 1 tên file duy nhất." }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Lỗ hổng nghiêm trọng khi để người dùng kiểm soát chuỗi mẫu str.format()',
      badge: 'Cảnh báo Bảo mật',
      content: `
        <p>Đôi khi ứng dụng cho phép người dùng hoặc quản trị viên tự nhập <strong>mẫu thông báo tùy chỉnh</strong> (ví dụ: mẫu email <code>"Xin chào {user.name}!"</code>) rồi chương trình gọi <code>user_template.format(user=current_user)</code>.</p>
        <p><strong>Đây là một lỗ hổng bảo mật cực kỳ nghiêm trọng!</strong> Mặc dù <code>str.format()</code> không cho phép gọi hàm tùy ý như <code>eval()</code>, nhưng nó <strong>cho phép truy cập thuộc tính (<code>.attr</code>) và chỉ mục (<code>[key]</code>)</strong> không giới hạn. Kẻ tấn công chỉ cần đi từ một đối tượng bất kỳ, leo qua phương thức <code>__init__.__globals__</code> là có thể <strong>đọc toàn bộ biến toàn cục của ứng dụng</strong> (bao gồm <code>SECRET_KEY</code>, mật khẩu DB, biến môi trường trong module)!</p>
        <p><strong>Cách khắc phục triệt để:</strong></p>
        <ul>
          <li>Nếu mẫu chuỗi đến từ người dùng/cơ sở dữ liệu bên ngoài: Hãy dùng <code>string.Template</code> (cú pháp <code>$name</code> hoặc <code>\${name}</code>) vì nó <strong>chỉ thay thế đúng tên khóa trong dictionary</strong> và hoàn toàn không cho phép truy cập thuộc tính <code>.attr</code>!</li>
          <li>Nếu mẫu chuỗi viết trực tiếp trong mã nguồn: Dùng <strong>t-strings (PEP 750)</strong> với bộ xử lý tùy chỉnh để kiểm soát chặt chẽ dữ liệu đầu ra.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Minh họa khai thác lỗ hổng str.format() để đánh cắp SECRET_KEY và cách vá bằng string.Template',
          code: `from string import Template

# Giả sử đây là khóa bí mật toàn cục trong module backend
SECRET_KEY = "sk_live_999_SUPER_SECRET_TOKEN"

class OrderEvent:
    def __init__(self, order_id: int, customer: str):
        self.order_id = order_id
        self.customer = customer

event = OrderEvent(1024, "NhatVo")

# ❌ NGUY HIỂM: Kẻ tấn công nhập mẫu thông báo độc hại để đọc biến toàn cục qua __init__.__globals__
attacker_format_str = "Đơn hàng #{event.order_id} | Đánh cắp khóa: {event.__init__.__globals__[SECRET_KEY]}"
leaked_output = attacker_format_str.format(event=event)
print("[LỖ HỔNG str.format]:", leaked_output)

# ✅ AN TOÀN: Dùng string.Template và chỉ truyền đúng dictionary dữ liệu cho phép
safe_context = {"order_id": event.order_id, "customer": event.customer}
user_template = Template("Đơn hàng #$order_id của khách hàng $customer đã hoàn tất.")
print("[AN TOÀN Template]  :", user_template.safe_substitute(safe_context))`,
          output: `[LỖ HỔNG str.format]: Đơn hàng #1024 | Đánh cắp khóa: sk_live_999_SUPER_SECRET_TOKEN
[AN TOÀN Template]  : Đơn hàng #1024 của khách hàng NhatVo đã hoàn tất.`,
          annotations: [
            { line: 14, text: "Thông qua {event.__init__.__globals__[SECRET_KEY]}, kẻ tấn công đọc thẳng biến toàn cục của module!" },
            { line: 19, text: "string.Template chỉ cho phép tra cứu phẳng trên safe_context, không hỗ trợ dấu chấm (.attr) hay ngoặc vuông ([key])." }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Chống Timing Attack với secrets.compare_digest() & Chống giả mạo Homoglyph',
      badge: 'Mật mã & Unicode',
      content: `
        <p><strong>1. Tấn công đo thời gian (Timing Attack) khi so sánh Token/Mật khẩu:</strong></p>
        <p>Toán tử <code>a == b</code> được tối ưu để dừng ngay lập tức tại <strong>ký tự đầu tiên khác nhau</strong>. Nếu kẻ tấn công gửi một API Token giả và đo thời gian phản hồi ở mức nano-giây với hàng chục ngàn mẫu thử, hắn sẽ biết được ký tự đầu tiên nào làm server mất thêm một chút thời gian để kiểm tra sang ký tự thứ hai — từ đó đoán dần từng ký tự của khóa bí mật!</p>
        <p>👉 <strong>Giải pháp</strong>: Khi so sánh chữ ký HMAC, API key, OTP hay mật khẩu băm, <strong>luôn dùng <code>secrets.compare_digest(a, b)</code></strong>. Hàm này mất một khoảng thời gian <strong>không đổi (constant-time)</strong> khi hai chuỗi cùng độ dài, bất kể chúng khác nhau ở ký tự đầu tiên hay cuối cùng.</p>
        <p><strong>2. Tấn công ký tự đồng hình (Homoglyph / Confusable Attack):</strong></p>
        <p>Trong bảng mã Unicode, chữ <code>'а'</code> nhỏ tiếng Nga (Cyrillic Small Letter A — <code>U+0430</code>) có hình dáng hiển thị giống hệt chữ <code>'a'</code> Latin (<code>U+0061</code>). Kẻ tấn công có thể đăng ký tên người dùng <code>"аdmin"</code> (dùng chữ <code>а</code> Cyrillic) hoặc tên miền <code>"pаypal.com"</code> để lừa đảo vì <code>"аdmin" != "admin"</code>!</p>
        <p>👉 <strong>Giải pháp</strong>: Với định danh tài khoản, tên miền hoặc mã lệnh, hãy chuẩn hóa bằng <code>unicodedata.normalize("NFKC", s)</code> và kiểm tra <code>s.isascii()</code> hoặc kiểm tra xem có sự pha trộn bất thường giữa nhiều bảng chữ cái (Latin + Cyrillic + Greek) bằng <code>unicodedata.name(c)</code> hay không.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh an toàn bằng secrets.compare_digest() và Phát hiện giả mạo Homoglyph',
          code: `import secrets
import unicodedata

# 1. So sánh API Token bằng thời gian hằng số (Chống Timing Attack)
real_api_key = "ak_prod_8f92a1b4c3d2e1f0"
user_supplied_key = "ak_prod_8f92a1b4c3d2e1f0"
is_valid = secrets.compare_digest(user_supplied_key, real_api_key)
print("Token hợp lệ (constant-time):", is_valid)

# 2. Phát hiện tấn công Homoglyph (chữ 'а' Cyrillic U+0430 giả làm 'a' Latin U+0061)
real_admin = "admin"
fake_admin = "\\u0430dmin"  # Chữ đầu là Cyrillic Small Letter A

def inspect_identifier(username: str) -> str:
    norm = unicodedata.normalize("NFKC", username)
    if not norm.isascii():
        non_ascii_info = [f"{c!r} (U+{ord(c):04X} {unicodedata.name(c)})" for c in norm if not c.isascii()]
        return f"CẢNH BÁO HOMOGLYPH trong {username!r}: {', '.join(non_ascii_info)}"
    return f"Hợp lệ (100% ASCII): {norm!r}"

print("Trông giống hệt nhau:", real_admin, "vs", fake_admin, "| Bằng nhau?", real_admin == fake_admin)
print(inspect_identifier(real_admin))
print(inspect_identifier(fake_admin))`,
          output: `Token hợp lệ (constant-time): True
Trông giống hệt nhau: admin vs аdmin | Bằng nhau? False
Hợp lệ (100% ASCII): 'admin'
CẢNH BÁO HOMOGLYPH trong 'аdmin': 'а' (U+0430 CYRILLIC SMALL LETTER A)`,
          annotations: [
            { line: 7, text: "secrets.compare_digest() duyệt hết toàn bộ các byte bằng phép XOR bitwise mà không thoát sớm (no short-circuit)." },
            { line: 12, text: "fake_admin trông giống hệt 'admin' trên màn hình nhưng ký tự đầu tiên là U+0430." },
            { line: 16, text: "Kết hợp chuẩn hóa NFKC và kiểm tra isascii() giúp phát hiện ngay ký tự ngoại lai giả mạo." }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Lazy Logging và Hệ thống Type Hints chuỗi hiện đại (Literal, LiteralString, StrEnum)',
      badge: 'Chuẩn mực Production',
      content: `
        <p><strong>1. Logging với định dạng trì hoãn (Lazy <code>%</code> Formatting):</strong></p>
        <p>Khi viết <code>logger.debug(f"Payload: {expensive_serialize(data)}")</code>, Python <strong>luôn luôn thực thi biểu thức bên trong f-string và ghép chuỗi trước</strong> rồi mới truyền vào hàm <code>logger.debug()</code> — ngay cả khi ở môi trường Production cấp log đang đặt là <code>WARNING</code> (tức là dòng debug đó sẽ bị vứt bỏ!). Ngược lại, nếu viết:</p>
        <p><code>logger.debug("User %s từ IP %s", username, ip_addr)</code></p>
        <p>Module <code>logging</code> sẽ kiểm tra cấp độ log trước: nếu cấp <code>DEBUG</code> đang tắt, nó <strong>thoát ngay lập tức mà không hề thực hiện phép định dạng chuỗi nào</strong>!</p>
        <p><strong>2. Bộ tứ Type Hints cho chuỗi trong Python hiện đại (3.11 – 3.14):</strong></p>
        <ul>
          <li><code>str</code>: Chuỗi bất kỳ.</li>
          <li><code>typing.Literal["asc", "desc"]</code>: Giới hạn tham số chỉ được phép nhận một trong các hằng chuỗi liệt kê sẵn.</li>
          <li><code>typing.LiteralString</code> (<strong>PEP 675</strong>): Vũ khí chống SQL/Shell Injection ngay từ lúc gõ code! Một tham số kiểu <code>LiteralString</code> chỉ chấp nhận chuỗi được viết cứng trong mã nguồn (hoặc ghép từ các <code>LiteralString</code> khác). Nếu ai đó truyền chuỗi lấy từ biến người dùng (<code>f"SELECT ... {user_input}"</code>) vào hàm yêu cầu <code>LiteralString</code>, trình kiểm tra kiểu tĩnh (<code>mypy</code> / <code>pyright</code>) sẽ <strong>báo lỗi đỏ ngay lập tức</strong> trước cả khi chạy chương trình!</li>
          <li><code>enum.StrEnum</code> (từ Python 3.11): Lớp Enum mà mỗi thành viên đồng thời là một <code>str</code> thực thụ (<code>isinstance(Role.ADMIN, str) == True</code>), giúp so sánh trực tiếp hoặc serialize ra JSON mà không cần viết <code>.value</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng Lazy Logging, StrEnum, Literal và LiteralString (PEP 675)',
          code: `import logging
from enum import StrEnum
from typing import Literal, LiteralString

# 1. StrEnum: Vừa an toàn kiểu dữ liệu, vừa hoạt động trực tiếp như một chuỗi str
class Environment(StrEnum):
    DEV = "development"
    STAGING = "staging"
    PROD = "production"

# 2. LiteralString (PEP 675) & Literal: Chặn SQL Injection và sai lệch tham số từ bước kiểm tra kiểu
def run_safe_query(
    sql: LiteralString,
    params: tuple = (),
    sort_order: Literal["ASC", "DESC"] = "ASC"
) -> str:
    return f"Executing [{sql} ORDER BY id {sort_order}] with params={params}"

# 3. Lazy % formatting trong logging (không tốn CPU ghép chuỗi khi cấp DEBUG bị tắt)
logger = logging.getLogger("app.security")
logger.setLevel(logging.INFO)  # Cấp DEBUG đang tắt!
logger.debug("Chi tiết phiên làm việc của %s tại môi trường %s", "nhatvo", Environment.PROD)

print("StrEnum là str?     :", isinstance(Environment.PROD, str), "| Giá trị:", Environment.PROD.upper())
print("Truy vấn hợp lệ     :", run_safe_query("SELECT * FROM orders WHERE status = ?", ("PAID",), "DESC"))`,
          output: `StrEnum là str?     : True | Giá trị: PRODUCTION
Truy vấn hợp lệ     : Executing [SELECT * FROM orders WHERE status = ? ORDER BY id DESC] with params=('PAID',)`,
          annotations: [
            { line: 6, text: "StrEnum kế thừa từ cả str và Enum: Environment.PROD == 'production' là True và gọi được mọi phương thức của str." },
            { line: 13, text: "LiteralString bắt buộc đối số sql phải là hằng chuỗi trong code; truyền f-string có biến động sẽ bị mypy/pyright chặn ngay." },
            { line: 22, text: "Vì logger đang ở mức INFO, dòng logger.debug(...) không hề thực hiện phép ghép chuỗi %s, tiết kiệm CPU tối đa." }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Dùng secrets.compare_digest() với 2 chuỗi khác bậc Unicode (Non-ASCII)',
        content: 'secrets.compare_digest(a, b) chỉ hỗ trợ chuỗi str thuần ASCII hoặc đối tượng bytes. Nếu token/mật khẩu có thể chứa ký tự ngoài bảng ASCII (ví dụ tiếng Việt hoặc emoji), hãy mã hóa cả hai sang UTF-8 trước: secrets.compare_digest(a.encode("utf-8"), b.encode("utf-8")).'
      },
      {
        title: 'Nhầm lẫn rằng LiteralString chặn lỗi ở Runtime',
        content: 'Giống như mọi Type Hints khác trong Python, typing.LiteralString được kiểm tra bởi các công cụ phân tích tĩnh (mypy, pyright, PyCharm/VSCode) ở bước phát triển và CI/CD. Ở runtime, bạn vẫn nên kết hợp với Parameterized Queries hoặc t-string (Template) để bảo vệ kép.'
      }
    ],
    tips: [
      {
        title: 'Kết hợp PEP 750 t-strings với kiểu Template trong Python 3.14',
        content: 'Trong Python 3.14.8, thay vì nhận tham số str thông thường, hãy viết hàm nhận tham số kiểu string.templatelib.Template (ví dụ def render_html(tpl: Template) -> str). Khi đó, nếu lập trình viên lỡ tay truyền f"..." (kiểu str) thay vì t"..." (kiểu Template), chương trình có thể từ chối ngay cả ở bước kiểm tra kiểu lẫn ở Runtime!'
      }
    ],
    deepDive: {
      title: 'Cách NFKC giúp chống vượt rào bộ lọc bảo mật (WAF Bypass)',
      content: `
        <p>Kẻ tấn công thường dùng các ký tự Unicode dạng Fullwidth như <code>"＜script＞"</code> (<code>U+FF1C</code>, <code>U+FF1E</code>) hoặc chữ <code>"ѕcript"</code> để vượt qua bộ lọc từ khóa đơn giản, hy vọng rằng một tầng phía sau sẽ chuẩn hóa chúng về <code>"&lt;script&gt;"</code>.</p>
        <p>Quy tắc bảo mật vàng (theo khuyến nghị của Unicode Technical Report #36): <strong>Luôn chuẩn hóa chuỗi đầu vào bằng <code>unicodedata.normalize("NFKC", s)</code> TRƯỚC KHI thực hiện bất kỳ bước kiểm tra hợp lệ (validation), lọc từ cấm hoặc escape nào!</strong></p>
      `
    },
    newIn314: {
      title: 'Mới trong Python 3.14.8: Chặn đứng Injection ở Runtime bằng Template Strings (PEP 750)',
      content: 'Trước Python 3.14, f"..." trả về ngay một str phẳng khiến hàm nhận chuỗi không thể phân biệt đâu là phần mẫu cố định của lập trình viên, đâu là dữ liệu nguy hiểm do người dùng nhập vào. Với t"..." (PEP 750) trong Python 3.14.8, đối tượng Template giữ nguyên ranh giới giữa template.strings (an toàn) và template.interpolations (cần escape/parameterize), xóa sổ tận gốc XSS và SQL Injection.'
    }
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Xây dựng hàm thông báo người dùng an toàn chống rò rỉ __globals__',
      problem: 'Một hệ thống cũ đang dùng `user_tpl.format(user=user_obj)` và bị kẻ tấn công khai thác bằng mẫu `"{user.__init__.__globals__[DB_PASSWORD]}"`. Hãy viết hàm `render_safe_notification(user_tpl: str, username: str, role: str) -> str` sử dụng `string.Template.safe_substitute()` để chỉ cho phép thay thế `$username` và `$role` một cách an toàn.',
      hint: 'Khởi tạo `Template(user_tpl)` từ module `string` và gọi `.safe_substitute(username=username, role=role)`.',
      solutionCode: `from string import Template

DB_PASSWORD = "postgres_master_password_2026"

def render_safe_notification(user_tpl: str, username: str, role: str) -> str:
    tpl = Template(user_tpl)
    return tpl.safe_substitute(username=username, role=role)

normal_msg = render_safe_notification("Xin chào $username (Quyền: $role)!", "nhatvo", "Admin")
attack_msg = render_safe_notification("Xin chào $username | Hack: {user.__init__.__globals__[DB_PASSWORD]}", "hacker", "Guest")

print(normal_msg)
print(attack_msg)`,
      solutionOutput: `Xin chào nhatvo (Quyền: Admin)!
Xin chào hacker | Hack: {user.__init__.__globals__[DB_PASSWORD]}`,
      explanation: '`string.Template` chỉ nội suy các biến bắt đầu bằng `$` có mặt trong từ điển truyền vào (`username`, `role`) và giữ nguyên chuỗi `{user.__init__.__globals__[DB_PASSWORD]}` như văn bản vô hại.'
    },
    {
      level: 'Vừa',
      title: 'Bộ kiểm tra định danh chống giả mạo Homoglyph & chuẩn hóa NFKC',
      problem: 'Viết hàm `validate_username(raw_name: str) -> tuple[bool, str]` thực hiện: (1) Chuẩn hóa `NFKC` chuỗi đầu vào, (2) Kiểm tra xem chuỗi sau chuẩn hóa có phải toàn bộ là ASCII (`isascii()`) và chỉ gồm chữ cái/số/gạch dưới (`isalnum()` khi bỏ `_`) hay không. Nếu phát hiện ký tự ngoài ASCII (như chữ `а` Cyrillic), trả về `(False, "Phát hiện ký tự ngoại lai...")`; ngược lại trả về `(True, normalized_name)`.',
      hint: 'Dùng `unicodedata.normalize("NFKC", raw_name)` trước, sau đó kiểm tra `norm.isascii()`.',
      solutionCode: `import unicodedata

def validate_username(raw_name: str) -> tuple[bool, str]:
    norm = unicodedata.normalize("NFKC", raw_name)
    if not norm.isascii():
        bad_chars = [f"{c}(U+{ord(c):04X})" for c in norm if not c.isascii()]
        return False, f"Từ chối {raw_name!r}: Chứa ký tự dễ nhầm lẫn {', '.join(bad_chars)}"
    if not norm.replace("_", "").isalnum():
        return False, f"Từ chối {raw_name!r}: Chỉ cho phép chữ cái, số và dấu gạch dưới"
    return True, norm.lower()

for candidate in ["Admin_01", "\\u0430dmin_01", "ｕｓｅｒ_99"]:
    ok, msg = validate_username(candidate)
    print(f"Input: {candidate:10} -> OK={str(ok):5} | {msg}")`,
      solutionOutput: `Input: Admin_01   -> OK=True  | admin_01
Input: аdmin_01   -> OK=False | Từ chối 'аdmin_01': Chứa ký tự dễ nhầm lẫn а(U+0430)
Input: ｕｓｅｒ_99    -> OK=True  | user_99`,
      explanation: 'Chuỗi Fullwidth `"ｕｓｅｒ_99"` được `NFKC` chuẩn hóa về `"user_99"` hợp lệ, trong khi chuỗi giả mạo `"аdmin_01"` (chứa chữ `а` Cyrillic `U+0430`) bị chặn đứng ngay lập tức!'
    },
    {
      level: 'Khó',
      title: 'Xây dựng bộ thực thi Shell an toàn bằng t-string (Python 3.14 PEP 750)',
      problem: 'Viết hàm `safe_shell_cmd(cmd_tpl: Template) -> str` nhận vào một t-string của Python 3.14 (ví dụ `t"grep -i {search_term} {file_path}"`). Hàm duyệt qua các phần tử của `cmd_tpl`: giữ nguyên các phần văn bản tĩnh (`str`), và tự động bọc mọi giá trị nội suy (`Interpolation.value`) bằng `shlex.quote(str(item.value))` để ngăn chặn hoàn toàn Command Injection.',
      hint: 'Duyệt `for item in cmd_tpl:`, kiểm tra `isinstance(item, str)` hoặc truy cập `item.value` rồi áp dụng `shlex.quote(str(item.value))`.',
      solutionCode: `import shlex
from string.templatelib import Template

def safe_shell_cmd(cmd_tpl: Template) -> str:
    if not isinstance(cmd_tpl, Template):
        raise TypeError("Bắt buộc phải truyền t-string (Template) để đảm bảo an toàn!")
    parts = []
    for item in cmd_tpl:
        if isinstance(item, str):
            parts.append(item)
        else:
            parts.append(shlex.quote(str(item.value)))
    return "".join(parts)

keyword = "ERROR; rm -rf /"
log_file = "/var/log/app log.txt"
command = safe_shell_cmd(t"grep -F {keyword} {log_file}")
print("Lệnh Shell an toàn:", command)`,
      solutionOutput: `Lệnh Shell an toàn: grep -F 'ERROR; rm -rf /' '/var/log/app log.txt'`,
      explanation: 'Nhờ PEP 750 t-string trong Python 3.14.8, hàm `safe_shell_cmd` tách biệt rõ phần khung lệnh `grep -F ` và hai biến nội suy, tự động gọi `shlex.quote()` cho từng biến nên dấu `; rm -rf /` và khoảng trắng trong tên file đều bị vô hiệu hóa hoàn toàn.'
    }
  ],
  quiz: [
    {
      question: 'Điều gì có thể xảy ra nếu ứng dụng cho phép người dùng nhập chuỗi mẫu rồi gọi `user_input_string.format(event=event_obj)`?',
      options: [
        'Không có rủi ro gì vì `str.format()` chỉ định dạng văn bản thuần túy',
        'Kẻ tấn công có thể truyền `"{event.__init__.__globals__[SECRET_KEY]}"` để đọc các biến toàn cục nhạy cảm trong bộ nhớ của chương trình',
        'Chương trình chỉ có thể bị lỗi `ValueError` nhẹ',
        '`str.format()` sẽ tự động xóa mọi biến toàn cục'
      ],
      correctIndex: 1,
      explanation: 'Cú pháp của `str.format()` cho phép truy cập thuộc tính và chỉ mục lồng nhau (`.__init__.__globals__[...]`). Do đó, tuyệt đối không bao giờ truyền chuỗi từ người dùng làm chuỗi mẫu của `.format()`; hãy dùng `string.Template` thay thế.'
    },
    {
      question: 'Vì sao phải dùng `secrets.compare_digest(a, b)` thay vì `a == b` khi kiểm tra chữ ký HMAC, API token hoặc mật khẩu băm?',
      options: [
        'Vì `secrets.compare_digest` chạy nhanh gấp 10 lần toán tử `==`',
        'Vì toán tử `==` dừng ngay ở ký tự khác nhau đầu tiên (short-circuit), tạo ra sự chênh lệch thời gian phản hồi giúp kẻ tấn công đoán dần từng ký tự qua Timing Attack',
        'Vì toán tử `==` không so sánh được chuỗi dài hơn 32 ký tự',
        'Vì `secrets.compare_digest` tự động mã hóa chuỗi sang SHA-256'
      ],
      correctIndex: 1,
      explanation: '`secrets.compare_digest(a, b)` được thiết kế để chạy trong thời gian hằng số (constant-time) đối với hai chuỗi cùng độ dài, ngăn kẻ tấn công suy đoán số lượng ký tự đầu tiên trùng khớp thông qua việc đo thời gian phản hồi.'
    },
    {
      question: 'Trong câu lệnh `logger.debug("User %s action %s", user, action)`, vì sao dùng cú pháp `%s` trì hoãn lại tốt hơn `logger.debug(f"User {user} action {action}")`?',
      options: [
        'Vì module `logging` không cho phép truyền f-string',
        'Vì với f-string, Python luôn tốn CPU đánh giá biểu thức và cấp phát chuỗi mới TRƯỚC khi gọi hàm `debug()`, ngay cả khi cấp log `DEBUG` đang bị tắt ở Production',
        'Vì `%s` tự động dịch thông báo sang nhiều ngôn ngữ',
        'Vì f-string làm tăng kích thước file mã nguồn `.py`'
      ],
      correctIndex: 1,
      explanation: 'Khi truyền `"User %s action %s", user, action`, hàm `logger.debug()` sẽ kiểm tra `isEnabledFor(DEBUG)` trước. Nếu log `DEBUG` đang tắt, nó bỏ qua ngay mà không hề thực hiện phép ghép chuỗi nào.'
    },
    {
      question: 'Kiểu chú thích `typing.LiteralString` (PEP 675) giải quyết bài toán bảo mật nào?',
      options: [
        'Ép chuỗi chỉ được chứa các chữ cái viết hoa',
        'Yêu cầu đối số chuỗi truyền vào hàm (như câu lệnh SQL) phải là hằng chuỗi viết trực tiếp trong mã nguồn, giúp trình kiểm tra kiểu tĩnh (mypy/pyright) phát hiện ngay lỗi ghép chuỗi động gây SQL/Command Injection',
        'Tự động nén chuỗi trong RAM',
        'Tự động mã hóa HTML ở runtime'
      ],
      correctIndex: 1,
      explanation: '`LiteralString` chỉ chấp nhận các hằng chuỗi tĩnh từ mã nguồn (hoặc kết hợp từ các `LiteralString` khác). Nếu ai đó truyền một f-string có chứa biến ngoại lai vào hàm yêu cầu `sql: LiteralString`, mypy/pyright sẽ báo lỗi ngay lập tức.'
    }
  ],
  summary: [
    'Phòng chống Injection bằng nguyên tắc tách biệt mã lệnh và dữ liệu: dùng Parameterized Queries hoặc t-string (PEP 750) cho SQL, `html.escape(..., quote=True)` cho HTML/XSS, và `subprocess.run([...], shell=False)` hoặc `shlex.quote()` cho Shell.',
    'Tuyệt đối không để người dùng kiểm soát chuỗi mẫu của `str.format()` vì lộ trình `{obj.__init__.__globals__}` làm rò rỉ khóa bí mật; hãy dùng `string.Template` cho mẫu do người dùng nhập.',
    'Dùng `secrets.compare_digest()` để so sánh token/chữ ký trong thời gian hằng số (chống Timing Attack), và kết hợp chuẩn hóa `NFKC` + kiểm tra `isascii()`/bảng mã để chống tấn công ký tự đồng hình (Homoglyph Attack).',
    'Sử dụng định dạng trì hoãn `logger.debug("... %s", val)` để tối ưu hiệu năng logging, kết hợp các Type Hints hiện đại (`Literal`, `LiteralString` PEP 675, `enum.StrEnum`) để bắt lỗi ngay từ bước kiểm tra kiểu.'
  ]
};
