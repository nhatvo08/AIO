export default {
  id: 'p3-04',
  partId: 'part-3',
  partTitle: 'Phần 3 – Định dạng chuỗi (Trung cấp → Nâng cao)',
  number: '3.4',
  title: 'Giao thức __format__, Hàm format() và Module string',
  subtitle: 'Tùy biến ngôn ngữ định dạng cho đối tượng riêng, khai thác bộ công cụ module string và phân biệt string.Template (`$name`) với string.templatelib.Template (t-string)',
  level: 'Nâng cao',
  duration: '40 phút',
  isNew314: true,
  interactiveWidget: null,

  objectives: [
    'Hiểu cơ chế hàm tích hợp format(value, spec) và tự cài đặt phương thức __format__(self, format_spec) để thiết kế mini-language riêng cho class Python.',
    'Sử dụng thành thạo các hằng số ký tự chuẩn (ascii_letters, digits, hexdigits, punctuation, whitespace) và hàm string.capwords() trong module string.',
    'Tùy biến quy trình định dạng bằng lớp string.Formatter và xử lý mẫu người dùng an toàn với string.Template (.substitute() và .safe_substitute()).',
    'Phân biệt chính xác hai lớp trùng tên Template trong thư viện chuẩn Python 3.14: string.Template (cú pháp `$name`) và string.templatelib.Template (cú pháp t"...").'
  ],

  intuition: {
    title: 'Hợp đồng giao tiếp giữa f-string và mọi đối tượng Python',
    metaphor: 'Khi bạn viết `f"{sp:compact}"`, f-string thực chất không hề biết `"compact"` nghĩa là gì! Nó chỉ đóng vai người đưa thư: cầm chuỗi `"compact"` gõ cửa phương thức `sp.__format__("compact")` của chính đối tượng `sp`. Điều đó có nghĩa là bất kỳ class nào bạn viết ra đều có thể tự sáng tạo một "ngôn ngữ định dạng mini" của riêng mình, giống hệt cách `float` hiểu `.2f` hay `datetime` hiểu `%Y-%m-%d`.',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-top:12px;font-family:system-ui,sans-serif;">
        <div style="padding:14px;border-radius:10px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.35);">
          <div style="font-size:12px;color:#38bdf8;font-weight:700;text-transform:uppercase;">Giao thức Định dạng Đối tượng</div>
          <div style="font-size:15px;font-weight:700;color:#f8fafc;margin:6px 0;"><code>format(obj, spec)</code> ➔ <code>obj.__format__(spec)</code></div>
          <div style="font-size:13px;color:#cbd5e1;">Mọi biểu thức <code>f"{obj:spec}"</code> và <code>"{:spec}".format(obj)</code> đều ủy quyền về <code>type(obj).__format__(obj, spec)</code>.</div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(250,204,21,0.1);border:1px solid rgba(250,204,21,0.35);">
          <div style="font-size:12px;color:#facc15;font-weight:700;text-transform:uppercase;">Cổ điển • Module <code>string</code></div>
          <div style="font-size:15px;font-weight:700;color:#f8fafc;margin:6px 0;"><code>string.Template("Chào $name")</code></div>
          <div style="font-size:13px;color:#cbd5e1;">Nhận chuỗi chứa <code>$name</code> / <code>\${name}</code>. Gọi <code>.substitute()</code> hoặc <code>.safe_substitute()</code> trả về <code>str</code>.</div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.4);">
          <div style="font-size:12px;color:#c084fc;font-weight:700;text-transform:uppercase;">Python 3.14 • Module <code>string.templatelib</code></div>
          <div style="font-size:15px;font-weight:700;color:#f8fafc;margin:6px 0;"><code>t"Chào {name}"</code> ➔ <code>Template</code></div>
          <div style="font-size:13px;color:#cbd5e1;">Cú pháp literal mới của Python 3.14. Lưu trữ cấu trúc <code>.strings</code> và <code>.interpolations</code> để xử lý an toàn.</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Hàm tích hợp format() và Giao thức __format__()',
      badge: null,
      content: `
        <p>Hàm tích hợp <code>format(value, format_spec="")</code> là điểm truy cập trực tiếp vào giao thức định dạng của Python khi bạn chỉ muốn định dạng một giá trị đơn lẻ mà không cần bọc trong <code>f"{value:spec}"</code>. Về bản chất:</p>
        <p><code>format(value, spec)</code> tương đương với <code>type(value).__format__(value, spec)</code>.</p>
        <p>Khi tự thiết kế một lớp (ví dụ <code>Money</code>, <code>Vector2D</code>, <code>Duration</code>), việc định nghĩa phương thức <code>__format__(self, format_spec: str) -> str</code> cho phép đối tượng của bạn phản hồi mượt mà với các mã định dạng riêng ngay trong f-string!</p>
      `,
      codeExamples: [
        {
          title: 'Xây dựng lớp Money có Mini-Language định dạng riêng',
          code: `class Money:
    def __init__(self, amount: float, currency: str = "VND"):
        self.amount = amount
        self.currency = currency

    def __str__(self) -> str:
        return f"{self.amount:,.0f} {self.currency}"

    def __format__(self, format_spec: str) -> str:
        # Nếu không truyền format_spec (f"{m}"), trả về str(self)
        if not format_spec:
            return str(self)
        if format_spec == "k":
            return f"{self.amount / 1_000:,.1f}K {self.currency}"
        if format_spec == "m":
            return f"{self.amount / 1_000_000:,.2f}M {self.currency}"
        if format_spec == "accounting":
            if self.amount < 0:
                return f"({abs(self.amount):,.0f} {self.currency})"
            return f"{self.amount:,.0f} {self.currency}"
        # Nếu là format_spec chuẩn của chuỗi (như :>20), áp dụng lên str(self)
        return format(str(self), format_spec)

revenue = Money(18_500_000)
loss = Money(-450_000)

print(f"Mặc định  : {revenue}")
print(f"Rút gọn M : {revenue:m}")
print(f"Kế toán   : {loss:accounting} (Rút gọn K: {loss:k})")
print("Gọi hàm format() trực tiếp:", format(revenue, ">20"))`,
          output: `Mặc định  : 18,500,000 VND
Rút gọn M : 18.50M VND
Kế toán   : (450,000 VND) (Rút gọn K: -450.0K VND)
Gọi hàm format() trực tiếp:       18,500,000 VND`,
          annotations: [
            { line: 10, text: 'Theo quy ước của Python, khi format_spec == "", __format__ nên trả về kết quả giống str(self).' },
            { line: 22, text: 'Ủy quyền format(str(self), format_spec) ở cuối giúp đối tượng hỗ trợ sẵn căn lề :>20, :<20.' },
            { line: 30, text: 'Hàm tích hợp format(val, spec) rất tiện khi chỉ cần định dạng 1 biến mà không muốn tạo f-string.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Các hằng số ký tự trong module string và hàm capwords()',
      badge: null,
      content: `
        <p>Module <code>string</code> trong thư viện chuẩn cung cấp các tập hợp ký tự ASCII chuẩn xác để kiểm tra hợp lệ (validation), sinh mật khẩu hoặc lọc văn bản mà không cần tự gõ thủ công dễ sót ký tự:</p>
        <ul>
          <li><code>string.ascii_lowercase</code>: <code>'abcdefghijklmnopqrstuvwxyz'</code></li>
          <li><code>string.ascii_uppercase</code>: <code>'ABCDEFGHIJKLMNOPQRSTUVWXYZ'</code></li>
          <li><code>string.ascii_letters</code>: Ghép của <code>ascii_lowercase</code> và <code>ascii_uppercase</code> (52 chữ cái).</li>
          <li><code>string.digits</code>: <code>'0123456789'</code> | <code>string.hexdigits</code>: <code>'0123456789abcdefABCDEF'</code> | <code>string.octdigits</code>: <code>'01234567'</code>.</li>
          <li><code>string.punctuation</code>: 32 ký tự dấu câu ASCII (<code>!"#$%&amp;'()*+,-./:;&lt;=&gt;?@[\\]^_\`{|}~</code>).</li>
          <li><code>string.whitespace</code>: Khoảng trắng, tab, dòng mới (<code>' \\t\\n\\r\\x0b\\x0c'</code>).</li>
        </ul>
        <p>Ngoài ra, hàm <strong><code>string.capwords(s, sep=None)</code></strong> tách chuỗi theo khoảng trắng (hoặc theo <code>sep</code>), viết hoa chữ cái đầu mỗi từ bằng <code>.capitalize()</code> rồi nối lại. Cách này khắc phục nhược điểm của <code>str.title()</code> vốn làm viết hoa nhầm chữ cái sau dấu nháy đơn (như <code>"don't".title()</code> thành <code>"Don'T"</code>).</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra chuỗi bằng hằng số string và so sánh capwords() với .title()',
          code: `import string

def is_valid_hex_color(code: str) -> bool:
    return (
        len(code) == 7
        and code.startswith("#")
        and all(ch in string.hexdigits for ch in code[1:])
    )

print("Màu #1a2B3c hợp lệ:", is_valid_hex_color("#1a2B3c"))
print("Màu #12345G hợp lệ:", is_valid_hex_color("#12345G"))

# So sánh str.title() và string.capwords()
raw_heading = "   don't   stop   learning  python-3.14   "
print("Dùng .title()   :", repr(raw_heading.title()))
print("Dùng capwords() :", repr(string.capwords(raw_heading)))

# capwords với ký tự phân cách sep tùy chỉnh
slug = "ngon-ngu-lap-trinh-python"
print("Dùng capwords(sep='-'):", string.capwords(slug, sep="-"))`,
          output: `Màu #1a2B3c hợp lệ: True
Màu #12345G hợp lệ: False
Dùng .title()   : "   Don'T   Stop   Learning  Python-3.14   "
Dùng capwords() : "Don't Stop Learning Python-3.14"
Dùng capwords(sep='-'): Ngon-Ngu-Lap-Trinh-Python`,
          annotations: [
            { line: 7, text: 'string.hexdigits chứa sẵn cả chữ thường a-f lẫn chữ hoa A-F cùng 0-9.' },
            { line: 15, text: '.title() coi dấu nháy đơn là ranh giới từ nên biến chữ t sau dấu nháy thành chữ T hoa ("Don\'T").' },
            { line: 16, text: 'string.capwords() tương đương với " ".join(w.capitalize() for w in s.split()), vừa chuẩn hóa khoảng trắng thừa vừa giữ nguyên "Don\'t".' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Tùy biến chuyên sâu với string.Formatter',
      badge: null,
      content: `
        <p>Khi bạn cần một bộ định dạng chuỗi kiểu <code>"{field}"</code> nhưng muốn thay đổi quy tắc lấy dữ liệu (chẳng hạn: tự động thay các khóa bị thiếu bằng <code>"N/A"</code>, hoặc chặn không cho truy cập thuộc tính <code>.</code> vì lý do bảo mật), lớp <strong><code>string.Formatter</code></strong> cho phép bạn kế thừa và ghi đè từng bước trong quy trình định dạng.</p>
      `,
      codeExamples: [
        {
          title: 'Xây dựng DefaultFormatter không bao giờ lỗi thiếu biến và Che dữ liệu nhạy cảm',
          code: `import string

class SafeAuditFormatter(string.Formatter):
    def get_value(self, key, args, kwargs):
        # Nếu là tên biến trong kwargs: tự động che mật khẩu và điền mặc định nếu thiếu
        if isinstance(key, str):
            if "password" in key.lower() or "secret" in key.lower():
                return "***REDACTED***"
            return kwargs.get(key, f"<{key}:Chưa có>")
        return super().get_value(key, args, kwargs)

fmt = SafeAuditFormatter()
template = "User: {username} | Role: {role} | Pass: {db_password} | Dept: {department}"
result = fmt.format(template, username="admin_01", role="SysAdmin", db_password="SuperSecret123")
print(result)`,
          output: `User: admin_01 | Role: SysAdmin | Pass: ***REDACTED*** | Dept: <department:Chưa có>`,
          annotations: [
            { line: 4, text: 'get_value() được gọi cho mỗi trường thay thế để tra cứu giá trị từ args hoặc kwargs.' },
            { line: 7, text: 'Tự động phát hiện các khóa nhạy cảm để che dấu trước khi xuất chuỗi log.' },
            { line: 9, text: 'Trả về chuỗi mặc định thay vì ném KeyError khi biến department không được truyền vào.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: string.Template (`$name`) vs string.templatelib.Template (t-string 3.14)',
      badge: 'Mới trong 3.14',
      content: `
        <p>Trong Python 3.14, có <strong>hai lớp đều mang tên <code>Template</code></strong> nằm trong gói <code>string</code> nhưng phục vụ hai mục đích hoàn toàn khác nhau:</p>
        <ol>
          <li><strong><code>string.Template</code> (Có từ Python 2.4 — PEP 292):</strong> Nhận vào một chuỗi thường có các biến đánh dấu bằng dấu đô-la <code>$var</code> hoặc <code>\${var}</code> (thoát dấu đô-la bằng <code>$$</code>). Không hỗ trợ gọi hàm, không cho phép truy cập thuộc tính <code>$obj.attr</code> hay chỉ mục <code>$arr[0]</code>. Nhờ sự tối giản này, <code>string.Template</code> cùng <code>.safe_substitute()</code> cực kỳ an toàn để xử lý <strong>mẫu thông báo do người dùng cuối tự nhập</strong>.</li>
          <li><strong><code>string.templatelib.Template</code> (Mới trong Python 3.14 — PEP 750):</strong> Được tạo bởi cú pháp literal <code>t"..."</code> trong mã nguồn Python. Hỗ trợ mọi biểu thức Python phức tạp trong <code>{...}</code> nhưng trả về đối tượng <code>Template</code> chứa <code>.strings</code> và <code>.interpolations</code> thay vì trả về <code>str</code>.</li>
        </ol>
        <div class="table-responsive">
          <table class="lesson-table">
          <thead>
            <tr style="background:rgba(148,163,184,0.15);text-align:left;">
              <th style="padding:8px;border:1px solid rgba(148,163,184,0.3);">Đặc điểm</th>
              <th style="padding:8px;border:1px solid rgba(148,163,184,0.3);"><code>string.Template</code> (Cũ)</th>
              <th style="padding:8px;border:1px solid rgba(148,163,184,0.3);"><code>string.templatelib.Template</code> (3.14)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><strong>Cách khởi tạo</strong></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><code>Template("Chào $name")</code></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><code>t"Chào {name}"</code></td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><strong>Ký hiệu giữ chỗ</strong></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><code>$name</code> hoặc <code>\${name}</code> (thoát: <code>$$</code>)</td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><code>{expr!conv:spec}</code> (thoát: <code>{{</code>, <code>}}</code>)</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><strong>Cách lấy chuỗi đích</strong></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">Gọi <code>.substitute()</code> / <code>.safe_substitute()</code></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">Truyền vào hàm xử lý (HTML/SQL sanitizer...)</td>
            </tr>
          </tbody>
        </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Sử dụng string.Template (`$name`) và đối chiếu với string.templatelib.Template (t"...")',
          code: `from string import Template as DollarTemplate
from string.templatelib import Template as TStringTemplate

# 1. string.Template: Dùng $name, \${name} và thoát $$
user_tpl = DollarTemplate("Xin chào $user, hoàn tiền $$50 vào ví \${wallet}VN!")
print("Danh sách biến trong mẫu:", user_tpl.get_identifiers())

# .substitute() yêu cầu đủ mọi biến; .safe_substitute() giữ nguyên biến thiếu
print("Substitute đủ   :", user_tpl.substitute(user="Bình", wallet="Momo"))
print("Safe substitute :", user_tpl.safe_substitute(user="Bình"))

# 2. string.templatelib.Template (Python 3.14): Tạo từ cú pháp t"..."
user = "Bình"
wallet = "Momo"
t_obj = t"Xin chào {user}, hoàn tiền $50 vào ví {wallet}VN!"

print("Kiểu của user_tpl:", type(user_tpl))
print("Kiểu của t_obj   :", type(t_obj))
print("t_obj là TStringTemplate:", isinstance(t_obj, TStringTemplate))`,
          output: `Danh sách biến trong mẫu: ['user', 'wallet']
Substitute đủ   : Xin chào Bình, hoàn tiền $50 vào ví MomoVN!
Safe substitute : Xin chào Bình, hoàn tiền $50 vào ví \${wallet}VN!
Kiểu của user_tpl: <class 'string.Template'>
Kiểu của t_obj   : <class 'string.templatelib.Template'>
t_obj là TStringTemplate: True`,
          annotations: [
            { line: 5, text: 'Dùng $$50 để in ký tự $ thật sự; dùng ${wallet}VN khi ngay sau tên biến là các chữ cái liền kề.' },
            { line: 6, text: 'Phương thức .get_identifiers() (từ Python 3.11) trả về danh sách các tên biến $ xuất hiện trong mẫu.' },
            { line: 10, text: 'safe_substitute() không ném KeyError mà giữ nguyên ${wallet} khi biến chưa được cung cấp.' },
            { line: 15, text: 't"..." trong Python 3.14 tạo đối tượng thuộc module string.templatelib, hoàn toàn độc lập với string.Template.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Import nhầm giữa string.Template và string.templatelib.Template',
        content: 'Trong Python 3.14, câu lệnh `from string import Template` sẽ lấy lớp `Template` kiểu `$name` truyền thống. Nếu bạn muốn kiểm tra kiểu (`isinstance`) hoặc khai báo type hint cho `t"..."`, bạn PHẢI import từ module con mới: `from string.templatelib import Template`.'
      },
      {
        title: 'Quên bọc ${name} khi ký tự theo sau tên biến là chữ hoặc số',
        content: 'Trong `string.Template`, nếu viết `"Khuyến mãi $discount50%"`, Python sẽ tìm biến tên là `discount50` thay vì `discount`. Hãy bọc ngoặc nhọn `"Khuyến mãi ${discount}50%"` để tách rõ tên biến.'
      }
    ],
    tips: [
      {
        title: 'Dùng string.Template cho mẫu thông báo do khách hàng tự soạn thảo',
        content: 'Nếu ứng dụng SaaS của bạn cho phép chủ cửa hàng tự soạn mẫu SMS (ví dụ: `\"Chào $ten_khach, đơn hàng $ma_don đã giao\"`), hãy dùng `string.Template(sms).safe_substitute(data)`. Người dùng không thể truy cập thuộc tính nội bộ của Python và nếu họ gõ sai tên biến `$ten_khac`, hệ thống cũng không bị sập vì `KeyError`.'
      }
    ],
    deepDive: {
      title: 'Tùy biến ký tự tiền tố của string.Template (ví dụ đổi `$` thành `%` hoặc `@`)',
      content: '<p>Lớp <code>string.Template</code> hoạt động dựa trên biểu thức chính quy (regex) được biên dịch tự động thông qua siêu lớp (metaclass) <code>_TemplateMetaclass</code>. Bạn chỉ cần kế thừa <code>string.Template</code> và đặt lại thuộc tính lớp <code>delimiter = "@"</code> (hoặc <code>"%"</code>) là có ngay một hệ thống template dùng cú pháp <code>@name</code> và <code>@{name}</code> mà không cần tự viết regex!</p>'
    },
    newIn314: {
      title: 'Phân tách rõ không gian tên string và string.templatelib trong Python 3.14',
      content: 'Để đảm bảo tương thích ngược 100% với hàng triệu dòng code cũ đang dùng `from string import Template`, Python 3.14 đặt toàn bộ hệ sinh thái t-string mới vào `string.templatelib` (`Template`, `Interpolation`, `convert`).'
    }
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Chuẩn hóa tiêu đề bài viết và kiểm tra mã PIN',
      problem: 'Sử dụng module `string`, hãy viết hàm `clean_and_verify(raw_title, pin_code)` trả về một tuple gồm:\n1) Chuỗi `raw_title` đã được chuẩn hóa viết hoa chữ cái đầu mỗi từ bằng `string.capwords()`.\n2) Giá trị boolean kiểm tra xem `pin_code` có phải là chuỗi dài đúng 6 ký tự và tất cả đều nằm trong `string.digits` hay không.',
      hint: 'Dùng string.capwords(raw_title) và all(c in string.digits for c in pin_code).',
      solutionCode: `import string

def clean_and_verify(raw_title: str, pin_code: str) -> tuple[str, bool]:
    clean_title = string.capwords(raw_title)
    valid_pin = len(pin_code) == 6 and all(c in string.digits for c in pin_code)
    return clean_title, valid_pin

print(clean_and_verify("  it's   a   wonderful   day  ", "482910"))
print(clean_and_verify("python's new template strings", "12345a"))`,
      solutionOutput: `("It's A Wonderful Day", True)
("Python's New Template Strings", False)`,
      explanation: '`string.capwords()` vừa loại bỏ khoảng trắng thừa ở hai đầu và giữa các từ, vừa giữ đúng chữ thường sau dấu nháy đơn (`"It\'s"` và `"Python\'s"`). Trong khi đó `string.digits` chỉ chấp nhận 10 chữ số ASCII `0-9`.'
    },
    {
      level: 'Vừa',
      title: 'Thiết kế lớp Coordinate hỗ trợ giao thức __format__',
      problem: 'Viết lớp `Coordinate(lat, lon)` cài đặt `__format__(self, format_spec)` hỗ trợ 3 chế độ:\n- Mặc định (`""` hoặc `"dec"`): trả về `"{lat:.4f}, {lon:.4f}"`.\n- `"geo"`: trả về `"{abs(lat):.2f}°{\'N\' if lat >= 0 else \'S\'}, {abs(lon):.2f}°{\'E\' if lon >= 0 else \'W\'}"`.\n- `"tuple"`: trả về `"({lat:.2f}, {lon:.2f})"`.',
      hint: 'Kiểm tra giá trị của tham số format_spec trong phương thức __format__.',
      solutionCode: `class Coordinate:
    def __init__(self, lat: float, lon: float):
        self.lat = lat
        self.lon = lon

    def __format__(self, format_spec: str) -> str:
        if format_spec in ("", "dec"):
            return f"{self.lat:.4f}, {self.lon:.4f}"
        if format_spec == "geo":
            ns = "N" if self.lat >= 0 else "S"
            ew = "E" if self.lon >= 0 else "W"
            return f"{abs(self.lat):.2f}°{ns}, {abs(self.lon):.2f}°{ew}"
        if format_spec == "tuple":
            return f"({self.lat:.2f}, {self.lon:.2f})"
        raise ValueError(f"Unknown format code {format_spec!r} for Coordinate")

hanoi = Coordinate(21.028511, 105.804817)
sydney = Coordinate(-33.868820, 151.209290)

print(f"Hà Nội (Mặc định): {hanoi}")
print(f"Hà Nội (Geo)     : {hanoi:geo}")
print(f"Sydney (Geo)     : {sydney:geo} | Tuple: {sydney:tuple}")`,
      solutionOutput: `Hà Nội (Mặc định): 21.0285, 105.8048
Hà Nội (Geo)     : 21.03°N, 105.80°E
Sydney (Geo)     : 33.87°S, 151.21°E | Tuple: (-33.87, 151.21)`,
      explanation: 'Khi một mã định dạng không hợp lệ được truyền vào, chuẩn của Python là ném `ValueError` bên trong `__format__`.'
    },
    {
      level: 'Khó',
      title: 'Trình kiểm tra & kết xuất mẫu SMS của khách hàng với string.Template',
      problem: 'Viết hàm `process_sms_template(raw_tpl, allowed_keys, data)` sử dụng `string.Template`:\n1) Dùng `.is_valid()` kiểm tra cú pháp `$` trong `raw_tpl`; nếu sai trả về `"LỖI CÚ PHÁP MẪU"`.\n2) Dùng `.get_identifiers()` kiểm tra xem có biến nào nằm ngoài tập `allowed_keys` không; nếu có trả về `"BIẾN KHÔNG ĐƯỢC PHÉP: <danh sách biến lạ>"`.\n3) Nếu hợp lệ, trả về kết quả `.safe_substitute(data)`.',
      hint: 'Khởi tạo tpl = string.Template(raw_tpl), kiểm tra tpl.is_valid(), sau đó kiểm tra [k for k in tpl.get_identifiers() if k not in allowed_keys].',
      solutionCode: `from string import Template

def process_sms_template(raw_tpl: str, allowed_keys: set[str], data: dict) -> str:
    tpl = Template(raw_tpl)
    if not tpl.is_valid():
        return "LỖI CÚ PHÁP MẪU"
    
    used_keys = tpl.get_identifiers()
    forbidden = [k for k in used_keys if k not in allowed_keys]
    if forbidden:
        return f"BIẾN KHÔNG ĐƯỢC PHÉP: {', '.join(forbidden)}"
    
    return tpl.safe_substitute(data)

allowed = {"name", "code", "amount"}
payload = {"name": "Hoàng", "code": "OTP-9921"}

print(process_sms_template("Chào $name, mã của bạn là \${code} (Phí $$0)", allowed, payload))
print(process_sms_template("Chào $name, khóa bí mật là $secret_key", allowed, payload))
print(process_sms_template("Lỗi dấu đô la đơn lẻ ở cuối $", allowed, payload))`,
      solutionOutput: `Chào Hoàng, mã của bạn là OTP-9921 (Phí $0)
BIẾN KHÔNG ĐƯỢC PHÉP: secret_key
LỖI CÚ PHÁP MẪU`,
      explanation: 'Hai phương thức `.is_valid()` và `.get_identifiers()` của `string.Template` giúp bạn kiểm tra tính hợp lệ và danh sách biến trong mẫu của người dùng trước cả khi thực hiện thay thế dữ liệu.'
    }
  ],

  quiz: [
    {
      question: 'Khi thực thi biểu thức `format(obj, "custom_spec")`, Python sẽ gọi phương thức đặc biệt nào của `obj`?',
      options: [
        'obj.__str__("custom_spec")',
        'obj.__repr__("custom_spec")',
        'type(obj).__format__(obj, "custom_spec")',
        'obj.__template__("custom_spec")'
      ],
      correctIndex: 2,
      explanation: 'Hàm tích hợp `format(value, format_spec)` cũng như f-string và `str.format()` đều tra cứu và gọi phương thức `__format__(self, format_spec)` trên kiểu của đối tượng.'
    },
    {
      question: 'Vì sao `string.capwords("don\'t   panic")` thường được ưa chuộng hơn `"don\'t   panic".title()`?',
      options: [
        'Vì `.title()` biến chữ sau dấu nháy đơn thành chữ hoa (`"Don\'T   Panic"`) và giữ nguyên khoảng trắng thừa, còn `capwords()` trả về `"Don\'t Panic"`',
        'Vì `.title()` không hoạt động với chuỗi tiếng Anh',
        'Vì `capwords()` giữ nguyên mọi khoảng trắng thừa ở giữa chuỗi',
        'Vì `.title()` đã bị loại bỏ trong Python 3.14'
      ],
      correctIndex: 0,
      explanation: '`string.capwords(s)` tách từ bằng `s.split()`, gọi `.capitalize()` cho từng từ rồi ghép lại bằng `" ".join(...)`, nên vừa xử lý đúng dấu nháy đơn trong `"Don\'t"` vừa rút gọn khoảng trắng thừa.'
    },
    {
      question: 'Sự khác biệt giữa `.substitute()` và `.safe_substitute()` của lớp `string.Template` là gì?',
      options: [
        '`.safe_substitute()` tự động mã hóa HTML, còn `.substitute()` thì không',
        'Khi thiếu biến trong dữ liệu truyền vào, `.substitute()` ném lỗi `KeyError`, còn `.safe_substitute()` giữ nguyên `$tên_biến` trong chuỗi kết quả',
        '`.safe_substitute()` chỉ nhận tham số kiểu list',
        '`.substitute()` trả về đối tượng Template, còn `.safe_substitute()` trả về str'
      ],
      correctIndex: 1,
      explanation: '`.safe_substitute()` được thiết kế để không bao giờ ném `KeyError` nếu thiếu khóa: các placeholder chưa có giá trị sẽ được giữ nguyên trong chuỗi đầu ra.'
    },
    {
      question: 'Phát biểu nào sau đây phân biệt ĐÚNG giữa `string.Template` và `string.templatelib.Template` trong Python 3.14?',
      options: [
        'Cả hai là cùng một lớp, chỉ khác tên alias',
        '`string.Template` dùng cú pháp `$name` trên chuỗi và trả về `str` khi substitute; còn `string.templatelib.Template` được tạo bởi cú pháp `t"..."` và giữ nguyên cấu trúc `.strings` / `.interpolations`',
        '`string.Template` mới ra mắt ở Python 3.14, còn `string.templatelib.Template` có từ Python 2.4',
        '`string.templatelib.Template` dùng dấu `$name` thay vì `{name}`'
      ],
      correctIndex: 1,
      explanation: '`string.Template` là công cụ thay thế biến `$name` đơn giản có từ Python 2.4. Trong khi đó `string.templatelib.Template` là kiểu dữ liệu mới của Python 3.14 (PEP 750) đứng sau cú pháp `t"..."`.'
    }
  ],

  summary: [
    'Mọi cơ chế định dạng hiện đại (`format()`, `str.format()`, `f-string`) đều hoạt động dựa trên giao thức `__format__(self, format_spec)`.',
    'Module `string` cung cấp sẵn các hằng số ký tự chuẩn (`ascii_letters`, `digits`, `hexdigits`, `punctuation`, `whitespace`) và hàm `capwords()` xử lý viết hoa từ chuẩn xác hơn `.title()`.',
    'Lớp `string.Formatter` cho phép tùy biến sâu cách phân tích và tra cứu biến của cú pháp `{}`.',
    'Lớp `string.Template` (cú pháp `$name` / `${name}`, thoát `$$`) với `.safe_substitute()` là giải pháp an toàn cho các mẫu văn bản do người dùng cuối nhập vào.',
    'Đừng nhầm lẫn `string.Template` truyền thống với `string.templatelib.Template` (đối tượng kết quả của `t"..."` mới trong Python 3.14).'
  ]
};
