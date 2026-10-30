export default {
  id: 'p8-01',
  partId: 'part-8',
  partTitle: 'Phần 8 – Tổng kết & Kiểm tra cuối khóa',
  number: '8.1',
  title: 'Tổng kết toàn khóa: Cheat Sheet 1 trang, Từ điển lỗi thường gặp, Bài kiểm tra cuối khóa & Dự án Capstone',
  subtitle: 'Hệ thống hóa toàn bộ kiến thức chuỗi Python 3.14.8 trên một trang tra cứu nhanh, cẩm nang chẩn đoán lỗi, Final Exam và dự án tổng hợp thực tế',
  level: 'Chuyên sâu',
  duration: '45 phút',
  isNew314: true,
  interactiveWidget: null,

  objectives: [
    'Tra cứu nhanh mọi cú pháp, toán tử, nhóm phương thức chủ lực, Format Mini-Language, f-string và t-string (PEP 750) qua Cheat Sheet một trang.',
    'Chẩn đoán và xử lý tức thì 8 ngoại lệ thường gặp nhất khi làm việc với chuỗi (`TypeError`, `ValueError`, `IndexError`, `UnicodeDecodeError`, `UnicodeEncodeError`, `KeyError`...).',
    'Hoàn thành Dự án Capstone tổng hợp: Xây dựng bộ phân tích Log ứng dụng kết hợp chuẩn hóa Unicode Tiếng Việt, Regex nhóm có tên và kết xuất báo cáo HTML chống XSS bằng `t"..."` (Python 3.14).',
    'Tự đánh giá toàn diện năng lực từ Phần 1 đến Phần 7 qua Bài kiểm tra cuối khóa (Final Exam).'
  ],

  intuition: {
    title: 'Bản đồ Kho báu & Hộp dụng cụ khẩn cấp của Kỹ sư Python 3.14',
    metaphor: 'Sau 7 phần đi từ những toa tàu Unicode cơ bản đến cấu trúc bộ nhớ PEP 393 của CPython, bài học cuối cùng này chính là tấm bản đồ thu gọn để bạn dán ngay trước bàn làm việc: khi cần nhớ nhanh một cờ định dạng, phân vân giữa `removeprefix` với `lstrip`, hay gặp lỗi `UnicodeDecodeError` lúc 2 giờ sáng, bạn chỉ cần mở đúng bảng tương ứng dưới đây.',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;font-family:var(--font-mono);font-size:0.83rem;">
        <div style="padding:10px;border:1px solid var(--accent-soft-border);background:var(--accent-soft);border-radius:8px;">
          <strong>1. Nền tảng &amp; Phương thức</strong><br/>
          Immutable Unicode • Slicing • 47 phương thức dir(str)
        </div>
        <div style="padding:10px;border:1px solid var(--py-gold-border);background:var(--py-gold-bg);border-radius:8px;">
          <strong>2. Định dạng &amp; PEP 750</strong><br/>
          Format Spec • f-string PEP 701 • t-string Template
        </div>
        <div style="padding:10px;border:1px solid var(--success-border);background:var(--success-bg);border-radius:8px;">
          <strong>3. Unicode &amp; Văn bản</strong><br/>
          UTF-8 • NFC/NFD Tiếng Việt • Regex Atomic/Possessive
        </div>
        <div style="padding:10px;border:1px solid var(--deep-border);background:var(--deep-bg);border-radius:8px;">
          <strong>4. Nội bộ &amp; Bảo mật</strong><br/>
          PEP 393 • sys.intern • Chống SQLi/XSS • LiteralString
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cheat Sheet một trang: Toàn cảnh Chuỗi (str) trong Python 3.14.8',
      badge: 'Cheat Sheet',
      content: `
        <p>Bảng tra cứu nhanh dưới đây tổng hợp các thao tác chuẩn mực nhất (Pythonic idioms) mà mọi kỹ sư Python 3.14 cần nắm vững:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Nhóm tác vụ</th>
                <th>Cách viết chuẩn Python 3.14 (Khuyên dùng)</th>
                <th>Tránh dùng / Cạm bẫy cần nhớ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Kiểm tra chuỗi rỗng</strong></td>
                <td><code>if not s:</code> (rỗng) / <code>if s:</code> (không rỗng)</td>
                <td>Tránh <code>if len(s) == 0:</code>; lưu ý <code>bool(" ")</code> là <code>True</code></td>
              </tr>
              <tr>
                <td><strong>Đảo ngược chuỗi</strong></td>
                <td><code>s[::-1]</code></td>
                <td>Với emoji ghép phức tạp (ZWJ/cờ), cắt theo code point sẽ đảo thứ tự thành phần</td>
              </tr>
              <tr>
                <td><strong>Kiểm tra chuỗi con</strong></td>
                <td><code>if sub in s:</code> / <code>s.startswith(("a", "b"))</code></td>
                <td>Đừng viết <code>if s.find(sub):</code> vì index <code>0</code> bị coi là <code>False</code></td>
              </tr>
              <tr>
                <td><strong>Gỡ tiền tố / hậu tố cố định</strong></td>
                <td><code>s.removeprefix("pre_")</code> / <code>s.removesuffix(".txt")</code></td>
                <td>Tuyệt đối không dùng <code>lstrip("pre_")</code> hay <code>rstrip(".txt")</code></td>
              </tr>
              <tr>
                <td><strong>Tách &amp; ghép chuỗi</strong></td>
                <td><code>s.split()</code>, <code>s.splitlines()</code>, <code>sep.join(parts)</code></td>
                <td><code>s.split(" ")</code> giữ lại chuỗi rỗng giữa các dấu cách liên tiếp</td>
              </tr>
              <tr>
                <td><strong>So sánh không phân biệt hoa/thường</strong></td>
                <td><code>s1.casefold() == s2.casefold()</code></td>
                <td><code>lower()</code> không xử lý triệt để ký tự quốc tế như <code>"ß"</code> → <code>"ss"</code></td>
              </tr>
              <tr>
                <td><strong>Kiểm tra chuỗi số nguyên</strong></td>
                <td><code>s.isdecimal()</code> (trước khi gọi <code>int(s)</code>)</td>
                <td><code>"²".isdigit()</code> và <code>"½".isnumeric()</code> là <code>True</code> nhưng gây lỗi <code>int()</code></td>
              </tr>
              <tr>
                <td><strong>Định dạng chuỗi thông thường</strong></td>
                <td><code>f"{val:,.2f}"</code>, <code>f"{user=}"</code>, <code>f"{text!r}"</code></td>
                <td>Không dùng f-string trực tiếp cho câu lệnh SQL hoặc HTML chưa escape</td>
              </tr>
              <tr>
                <td><strong>Xử lý mẫu an toàn (Mới 3.14)</strong></td>
                <td><code>t"SELECT * FROM users WHERE id = {uid}"</code> + hàm xử lý <code>Template</code></td>
                <td><code>Template</code> không phải <code>str</code>; không thể cộng <code>t"..." + "..."</code></td>
              </tr>
              <tr>
                <td><strong>Đọc/ghi file &amp; Tiếng Việt</strong></td>
                <td><code>open(path, encoding="utf-8")</code> + <code>unicodedata.normalize("NFC", s)</code></td>
                <td>Bỏ trống <code>encoding=</code> trên Windows dễ dính <code>cp1252</code> lỗi dấu tiếng Việt</td>
              </tr>
              <tr>
                <td><strong>Ghép chuỗi trong vòng lặp</strong></td>
                <td>Thu thập vào <code>list</code> rồi gọi <code>"".join(items)</code> một lần</td>
                <td><code>s += chunk</code> chỉ tối ưu cục bộ trên CPython, không đảm bảo trên mọi trình thông dịch</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Tổ hợp các kỹ thuật Pythonic 3.14 trong 15 dòng code',
          code: `import unicodedata
from string.templatelib import Template, Interpolation

# 1. Chuẩn hóa NFC + gỡ tiền tố/hậu tố + tách phần tử
raw_line = "  ITEM_Phơ\\u0309_Bò.txt  "
clean_name = unicodedata.normalize("NFC", raw_line.strip())
core = clean_name.removeprefix("ITEM_").removesuffix(".txt")
words = core.split("_")

# 2. Định dạng f-string hiện đại & kiểm tra t-string PEP 750
price = 55000
summary = f"Món: {' '.join(words)} | Giá: {price:,}đ"
tpl = t"<span>{summary}</span>"

print(summary)
print("Là Template?", isinstance(tpl, Template), "| Values:", tpl.values)`,
          output: `Món: Phở Bò | Giá: 55,000đ
Là Template? True | Values: ('Món: Phở Bò | Giá: 55,000đ',)`,
          annotations: [
            { line: 6, text: 'Kết hợp `strip()` và `unicodedata.normalize("NFC", ...)` để gộp tổ hợp dấu hỏi `ơ + \\u0309` thành `ở` dựng sẵn.' },
            { line: 7, text: 'Dùng `removeprefix` và `removesuffix` nối tiếp nhau để bóc tách phần lõi tên file an toàn.' },
            { line: 12, text: 'Từ Python 3.12+ (PEP 701), ta có thể dùng lại nháy đơn `\' \'.join(words)` ngay bên trong f-string.' },
            { line: 13, text: 'Từ Python 3.14 (PEP 750), `t"..."` tạo đối tượng `Template` tách biệt phần tĩnh và giá trị nội suy.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Từ điển Chẩn đoán Lỗi thường gặp (Common String Exceptions)',
      badge: null,
      content: `
        <p>Khi làm việc với <code>str</code>, 95% lỗi lúc chạy (runtime exceptions) đều rơi vào 7 thông báo kinh điển dưới đây. Hiểu rõ nguyên nhân gốc sẽ giúp bạn sửa lỗi chỉ trong vài giây:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Thông báo lỗi</th>
                <th>Nguyên nhân gốc rễ</th>
                <th>Cách khắc phục chuẩn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>TypeError: can only concatenate str (not "int") to str</code></td>
                <td>Dùng toán tử <code>+</code> giữa một chuỗi và một số (ví dụ <code>"Tuổi: " + 20</code>).</td>
                <td>Dùng f-string <code>f"Tuổi: {age}"</code> hoặc ép kiểu <code>"Tuổi: " + str(age)</code>.</td>
              </tr>
              <tr>
                <td><code>TypeError: 'str' object does not support item assignment</code></td>
                <td>Cố gắng gán trực tiếp <code>s[i] = "a"</code> trên chuỗi bất biến.</td>
                <td>Tạo chuỗi mới: <code>s = s[:i] + "a" + s[i+1:]</code> hoặc dùng <code>list(s)</code> + <code>"".join()</code>.</td>
              </tr>
              <tr>
                <td><code>TypeError: sequence item 0: expected str instance, int found</code></td>
                <td>Truyền danh sách chứa số hoặc <code>None</code> vào <code>sep.join(items)</code>.</td>
                <td>Chuyển mọi phần tử sang chuỗi trước: <code>sep.join(map(str, items))</code>.</td>
              </tr>
              <tr>
                <td><code>TypeError: unsupported operand type(s) for +: 'Template' and 'str'</code></td>
                <td>Cộng trực tiếp đối tượng <code>t"..."</code> (Python 3.14) với chuỗi <code>"..."</code>.</td>
                <td>Chỉ cộng <code>Template + Template</code> (<code>t"..." + t"..."</code>) hoặc render <code>Template</code> ra <code>str</code> trước.</td>
              </tr>
              <tr>
                <td><code>IndexError: string index out of range</code></td>
                <td>Truy cập <code>s[i]</code> khi <code>i &gt;= len(s)</code> hoặc chuỗi <code>s</code> đang rỗng <code>""</code>.</td>
                <td>Kiểm tra <code>if s:</code> trước khi lấy <code>s[0]</code>, hoặc dùng lát cắt an toàn <code>s[:1]</code>.</td>
              </tr>
              <tr>
                <td><code>ValueError: substring not found</code></td>
                <td>Gọi <code>s.index(sub)</code> hoặc <code>s.rindex(sub)</code> khi <code>sub</code> không có trong <code>s</code>.</td>
                <td>Dùng <code>s.find(sub)</code> (trả về <code>-1</code>), hoặc kiểm tra <code>if sub in s:</code>, hoặc dùng <code>partition()</code>.</td>
              </tr>
              <tr>
                <td><code>UnicodeDecodeError: 'utf-8' codec can't decode byte...</code></td>
                <td>Giải mã dãy <code>bytes</code> không phải UTF-8 (như <code>cp1252</code>, <code>latin-1</code>, hoặc dữ liệu nhị phân) bằng UTF-8.</td>
                <td>Chỉ định đúng bảng mã gốc khi gọi <code>b.decode(encoding)</code> hoặc dùng <code>errors="replace"</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Mẫu phòng vệ an toàn trước 4 lỗi phổ biến nhất',
          code: `# 1. Lấy ký tự đầu tiên an toàn ngay cả khi chuỗi rỗng
empty_input = ""
first_char = empty_input[:1] or "<rỗng>"
print("1. Ký tự đầu:", first_char)

# 2. Ghép danh sách hỗn hợp bằng map(str, ...)
mixed = ["Phiên bản", 3, 14, 8]
print("2. Join hỗn hợp:", ".".join(map(str, mixed)))

# 3. Tách cặp key=value an toàn bằng partition thay vì index/split
config_line = "DEBUG_MODE"   # Không có dấu '='
key, sep, val = config_line.partition("=")
print(f"3. Key={key!r}, HasEqual={bool(sep)}, Val={val!r}")

# 4. Giải mã bytes lỗi an toàn với errors='replace'
broken_bytes = b"Vi\\xe1\\xbb\\x87t Nam \\xff"
print("4. Decode an toàn:", broken_bytes.decode("utf-8", errors="replace"))`,
          output: `1. Ký tự đầu: <rỗng>
2. Join hỗn hợp: Phiên bản.3.14.8
3. Key='DEBUG_MODE', HasEqual=False, Val=''
4. Decode an toàn: Việt Nam `,
          annotations: [
            { line: 3, text: '`empty_input[:1]` trả về `""` thay vì ném `IndexError`, kết hợp `or` để lấy giá trị mặc định.' },
            { line: 8, text: '`map(str, mixed)` biến các số `3, 14, 8` thành chuỗi trước khi đưa vào `".".join(...)`.' },
            { line: 12, text: '`partition("=")` luôn trả về đúng 3 phần tử ngay cả khi dòng cấu hình thiếu dấu `=`.' },
            { line: 17, text: 'Byte `\\xff` không hợp lệ trong UTF-8 được thay bằng ký tự `` (`U+FFFD`) thay vì làm sập chương trình.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Dự án Capstone Cuối khóa: Bộ phân tích Log & Xuất Báo cáo HTML An toàn (Python 3.14)',
      badge: 'Capstone Project',
      content: `
        <p>Để kết nối toàn bộ kiến thức từ Phần 1 đến Phần 7, chúng ta sẽ xây dựng một <strong>Pipeline Xử lý Log &amp; Kết xuất Báo cáo Bảo mật</strong> hoàn chỉnh trong Python 3.14:</p>
        <ol>
          <li><strong>Bước 1 (Làm sạch &amp; Chuẩn hóa - Phần 2 &amp; 4):</strong> Tách từng dòng log bằng <code>splitlines()</code>, bỏ khoảng trắng thừa bằng <code>strip()</code>, và chuẩn hóa tiếng Việt về dạng <code>NFC</code>.</li>
          <li><strong>Bước 2 (Bóc tách có cấu trúc bằng Regex Named Groups - Phần 5):</strong> Dùng <code>re.compile(..., re.VERBOSE)</code> với nhóm có tên <code>(?P&lt;level&gt;...)</code>, <code>(?P&lt;user&gt;...)</code>, <code>(?P&lt;msg&gt;...)</code> để phân tích từng dòng log.</li>
          <li><strong>Bước 3 (Kết xuất HTML chống XSS bằng t-strings PEP 750 - Phần 3 &amp; 7):</strong> Ngay cả khi thông điệp log chứa mã độc <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> do kẻ tấn công gửi vào, bộ render <code>Template</code> của chúng ta sẽ tự động escape toàn bộ các giá trị nội suy trong khi vẫn cho phép lồng các thẻ <code>Template</code> con một cách an toàn!</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Mã nguồn Hoàn chỉnh Dự án Capstone (Chạy trên Python 3.14.8)',
          code: `import html
import re
import unicodedata
from string.templatelib import Template, Interpolation, convert

# 1. Bộ xử lý t-string xuất HTML chống XSS (hỗ trợ lồng Template)
def render_html(tpl: Template) -> str:
    out: list[str] = []
    for item in tpl:
        match item:
            case str() as s:
                out.append(s)
            case Interpolation(value, _, conversion, format_spec):
                if isinstance(value, Template):
                    out.append(render_html(value))
                elif isinstance(value, list):
                    out.append("".join(
                        render_html(x) if isinstance(x, Template) else html.escape(str(x))
                        for x in value
                    ))
                else:
                    val = convert(value, conversion)
                    formatted = format(val, format_spec)
                    out.append(html.escape(formatted))
    return "".join(out)

# 2. Mẫu Regex phân tích dòng log với re.VERBOSE và nhóm có tên
LOG_PATTERN = re.compile(r"""
    ^\\[(?P<time>\\d{2}:\\d{2}:\\d{2})\\]\\s+
    (?P<level>INFO|WARN|ERROR)\\s+
    user=(?P<user>[\\w-]+):\\s+
    (?P<msg>.+)$
""", re.VERBOSE)

raw_logs = """
[09:15:02] INFO user=minh_anh: Đăng nhập thành công từ Hà Nội
[09:16:40] WARN user=guest_01: Thử mật khẩu sai <script>alert('XSS')</script>
[09:18:10] ERROR user=ho\\u0300a_ng: Lỗi kết nối cơ sở dữ liệu (timeout=30.5s)
"""

rows_tpl: list[Template] = []
for raw_line in raw_logs.strip().splitlines():
    norm_line = unicodedata.normalize("NFC", raw_line.strip())
    m = LOG_PATTERN.match(norm_line)
    if m:
        d = m.groupdict()
        rows_tpl.append(
            t"<tr class='{d['level'].lower()}'>"
            t"<td>{d['time']}</td><td>{d['user']}</td><td>{d['msg']}</td>"
            t"</tr>"
        )

report_html = render_html(t"<table>\\n{rows_tpl}\\n</table>")
print(report_html)`,
          output: `<table>
<tr class='info'><td>09:15:02</td><td>minh_anh</td><td>Đăng nhập thành công từ Hà Nội</td></tr><tr class='warn'><td>09:16:40</td><td>guest_01</td><td>Thử mật khẩu sai &lt;script&gt;alert(&#x27;XSS&#x27;)&lt;/script&gt;</td></tr><tr class='error'><td>09:18:10</td><td>hòa_ng</td><td>Lỗi kết nối cơ sở dữ liệu (timeout=30.5s)</td></tr>
</table>`,
          annotations: [
            { line: 7, text: 'Hàm `render_html` nhận đối tượng `Template` từ biểu thức `t"..."` (PEP 750).' },
            { line: 14, text: 'Nếu giá trị nội suy là một `Template` con (hoặc `list[Template]`), hàm đệ quy kết xuất cấu trúc HTML của nó mà không làm hỏng thẻ.' },
            { line: 24, text: 'Mọi dữ liệu chuỗi thông thường từ biến bên ngoài đều đi qua `html.escape()`, chặn đứng hoàn toàn tấn công XSS.' },
            { line: 43, text: 'Chuẩn hóa `NFC` biến tên `ho\\u0300a_ng` (dấu tổ hợp) thành `hòa_ng` chuẩn trước khi khớp Regex và xuất báo cáo.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Trộn lẫn ranh giới giữa văn bản (`str`), dữ liệu nhị phân (`bytes`) và mẫu cấu trúc (`Template`)',
        content: 'Hãy luôn nhớ mô hình "Bánh mì kẹp Unicode" (Unicode Sandwich) và mô hình mẫu của Python 3.14: Giải mã `bytes -> str` ngay tại rìa nhập dữ liệu (`decode`), xử lý hoàn toàn trên `str` ở tầng nghiệp vụ, và dùng `Template` (`t"..."`) khi truyền dữ liệu sang các ngôn ngữ đích khác như HTML, SQL hay Shell.'
      }
    ],
    tips: [
      {
        title: 'Tài liệu tham khảo chính thức của Python 3.14',
        content: 'Để tra cứu thêm các chi tiết đặc tả ngôn ngữ và thư viện chuẩn cập nhật nhất của nhánh 3.14, hãy luôn tham khảo tài liệu chính thức tại: https://docs.python.org/3.14/'
      }
    ],
    deepDive: {
      title: 'Gợi ý mở rộng Dự án Capstone cho hồ sơ cá nhân (Portfolio)',
      content: `
        <p>Bạn có thể nâng cấp Dự án Capstone ở trên thành một công cụ dòng lệnh (CLI) hoàn chỉnh bằng cách:</p>
        <ul>
          <li>Đọc file log lớn theo từng dòng với <code>open(log_path, encoding="utf-8", errors="replace")</code>.</li>
          <li>Thêm hàm tạo slug tiếng Việt cho tên từng người dùng để xuất các trang báo cáo riêng <code>report-minh-anh.html</code>.</li>
          <li>Sử dụng Format Mini-Language <code>{pct:.1%}</code> để hiển thị tỷ lệ phần trăm từng mức độ log <code>INFO</code> / <code>WARN</code> / <code>ERROR</code>.</li>
        </ul>
      `
    },
    newIn314: {
      title: 'Tổng kết điểm mới cốt lõi của Python 3.14 (3.14.8) về chuỗi',
      content: 'Điểm mới quan trọng nhất của nhánh Python 3.14 đối với xử lý chuỗi là **Template Strings (`t"..."`, PEP 750)** cùng module `string.templatelib` (`Template`, `Interpolation`, `convert`). Các tính năng chuỗi khác trong 3.14.8 giữ nguyên sự ổn định của nhánh 3.14.0.'
    }
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Chuẩn hóa và trích xuất mã sản phẩm từ dòng dữ liệu thô',
      problem: 'Cho chuỗi `raw = "   SKU-2026-VN_PRO.json   "`. Hãy viết 1 chuỗi thao tác (method chaining) để: bỏ khoảng trắng 2 đầu, gỡ bỏ tiền tố `"SKU-"`, gỡ bỏ hậu tố `".json"`, và đổi dấu `"_"` thành `"-"`.',
      hint: 'Kết hợp `.strip().removeprefix("SKU-").removesuffix(".json").replace("_", "-")`.',
      solutionCode: `raw = "   SKU-2026-VN_PRO.json   "
cleaned = (
    raw.strip()
    .removeprefix("SKU-")
    .removesuffix(".json")
    .replace("_", "-")
)
print(cleaned)`,
      solutionOutput: `2026-VN-PRO`,
      explanation: 'Mỗi phương thức trả về một đối tượng `str` mới nên có thể nối chuỗi liên tiếp (chaining) rất rõ ràng và an toàn.'
    },
    {
      level: 'Vừa',
      title: 'Kiểm tra và tính tổng các chuỗi số nguyên hợp lệ trong danh sách bẩn',
      problem: 'Cho danh sách `raw_values = [" 150 ", "²", "½", "300", "abc", "050"]`. Hãy lọc ra các phần tử mà sau khi `.strip()` chỉ chứa các chữ số thập phân hệ 10 chuẩn (có thể chuyển sang `int` an toàn, không nhận `"²"` hay `"½"`), rồi tính tổng của chúng.',
      hint: 'Sử dụng `.strip().isdecimal()` để lọc trước khi gọi `int()`.',
      solutionCode: `raw_values = [" 150 ", "²", "½", "300", "abc", "050"]

valid_ints = []
for item in raw_values:
    s = item.strip()
    if s.isdecimal():
        valid_ints.append(int(s))

print("Các số hợp lệ:", valid_ints)
print("Tổng:", sum(valid_ints))`,
      solutionOutput: `Các số hợp lệ: [150, 300, 50]
Tổng: 500`,
      explanation: '`isdecimal()` loại bỏ chính xác cả chỉ số mũ `"²"` (vốn làm `isdigit()` trả về `True`) và phân số `"½"` (vốn làm `isnumeric()` trả về `True`), chỉ giữ lại các chữ số hệ 10 hợp lệ cho `int()`.'
    },
    {
      level: 'Khó',
      title: 'Viết bộ lọc маскировка (Masking) dữ liệu nhạy cảm bằng t-strings (PEP 750)',
      problem: 'Trong hệ thống log ngân hàng, ta muốn viết một hàm `audit_log(tpl: Template) -> str` nhận một `t"..."` trong Python 3.14. Nếu biểu thức nội suy có tên biến (`interp.expression`) chứa từ `"secret"`, `"password"` hoặc `"pin"`, hàm sẽ tự động che giá trị thành `"***REDACTED***"`, ngược lại hiển thị giá trị đã định dạng như bình thường.',
      hint: 'Duyệt qua `tpl`, kiểm tra `any(k in interp.expression.lower() for k in ("secret", "password", "pin"))`.',
      solutionCode: `from string.templatelib import Template, Interpolation, convert

SENSITIVE_KEYS = ("secret", "password", "pin", "token")

def audit_log(tpl: Template) -> str:
    parts: list[str] = []
    for item in tpl:
        match item:
            case str() as s:
                parts.append(s)
            case Interpolation(value, expr, conv, spec):
                expr_lower = expr.lower()
                if any(k in expr_lower for k in SENSITIVE_KEYS):
                    parts.append("***REDACTED***")
                else:
                    val = convert(value, conv)
                    parts.append(format(val, spec))
    return "".join(parts)

user = "nguyen_an"
user_pin = "998877"
amount = 2500000

log_msg = audit_log(t"User={user} | PIN={user_pin} | Amount={amount:,} VND")
print(log_msg)`,
      solutionOutput: `User=nguyen_an | PIN=***REDACTED*** | Amount=2,500,000 VND`,
      explanation: 'Nhờ `Interpolation.expression` trong PEP 750 lưu lại nguyên văn tên biểu thức `"user_pin"`, hàm `audit_log` phát hiện được đây là trường nhạy cảm và tự động che giá trị mà lập trình viên không thể vô tình quên như khi dùng f-string!'
    }
  ],

  quiz: [
    {
      question: '[Final Exam 1/6] Cho `s = "www.testing.com"`. Để gỡ bỏ đúng tiền tố `"www."` ở đầu chuỗi một cách an toàn nhất trong Python 3.14, ta dùng biểu thức nào?',
      options: [
        '`s.lstrip("www.")`',
        '`s.removeprefix("www.")`',
        '`s.replace("www.", "")`',
        '`s[4:]`'
      ],
      correctIndex: 1,
      explanation: '`s.removeprefix("www.")` chỉ gỡ bỏ đúng một lần tiền tố `"www."` nếu chuỗi thực sự bắt đầu bằng nó. Còn `lstrip("www.")` sẽ xóa mọi chữ `w` và `.` ở đầu!'
    },
    {
      question: '[Final Exam 2/6] Trong Python 3.14, kết quả của `isinstance(t"Hello {name}", str)` và `len(t"A{1}B{2}".strings)` lần lượt là gì?',
      options: [
        '`True` và `2`',
        '`False` và `3`',
        '`False` và `2`',
        '`True` và `3`'
      ],
      correctIndex: 1,
      explanation: 'Đối tượng tạo bởi `t"..."` thuộc kiểu `string.templatelib.Template`, KHÔNG phải là `str` (`False`). Thuộc tính `.strings` luôn có `len(interpolations) + 1` phần tử: ở đây có 2 nội suy nên `.strings` có `3` phần tử `(\'A\', \'B\', \'\')`.'
    },
    {
      question: '[Final Exam 3/6] Hai chuỗi tiếng Việt `s1 = "Hoà"` (dựng sẵn NFC) và `s2 = "Ho\\u0300a"` (tổ hợp NFD) hiển thị giống hệt nhau. Làm thế nào để so sánh chúng bằng nhau một cách chuẩn xác?',
      options: [
        'Dùng `s1.casefold() == s2.casefold()`',
        'Dùng `unicodedata.normalize("NFC", s1) == unicodedata.normalize("NFC", s2)`',
        'Dùng `s1.encode("utf-8") == s2.encode("utf-8")`',
        'Dùng `s1 is s2`'
      ],
      correctIndex: 1,
      explanation: 'Đưa cả hai chuỗi về cùng một dạng chuẩn hóa Unicode (`NFC` hoặc `NFD`) bằng `unicodedata.normalize("NFC", ...)` sẽ quy đổi các dấu tổ hợp và dấu dựng sẵn về cùng một dãy code point thống nhất.'
    },
    {
      question: '[Final Exam 4/6] Trong CPython (PEP 393), điều gì xảy ra với biểu diễn bộ nhớ khi bạn nối thêm 1 ký tự Emoji `"🐍"` (`U+1F40D`) vào một chuỗi gồm 1.000 chữ cái ASCII?',
      options: [
        'Chỉ riêng ký tự Emoji chiếm 4 bytes, 1.000 chữ ASCII vẫn chiếm 1 byte/ký tự.',
        'Toàn bộ 1.001 ký tự của chuỗi mới đều phải lưu ở chế độ 4 bytes/ký tự (UCS-4) để giữ khả năng truy cập chỉ số `s[i]` trong thời gian $O(1)$.',
        'CPython chuyển chuỗi sang định dạng UTF-8 độ dài thay đổi.',
        'CPython ném lỗi `UnicodeError`.'
      ],
      correctIndex: 1,
      explanation: 'Theo PEP 393, mỗi đối tượng `str` dùng một độ rộng cố định cho mọi phần tử của nó (1, 2 hoặc 4 bytes) dựa trên code point lớn nhất trong chuỗi. Vì `"🐍"` (`U+1F40D > U+FFFF`) cần 4 bytes, cả 1.001 ký tự trong chuỗi mới đều được cấp phát 4 bytes/ký tự.'
    },
    {
      question: '[Final Exam 5/6] Vì sao tuyệt đối không được cho người dùng cuối nhập chuỗi mẫu `template_str` rồi gọi `template_str.format(event=event_obj)`?',
      options: [
        'Vì `str.format()` chạy chậm hơn f-string.',
        'Vì kẻ tấn công có thể nhập `"{event.__init__.__globals__}"` để đọc các biến toàn cục, khóa bí mật và cấu hình nhạy cảm của ứng dụng.',
        'Vì `str.format()` không hỗ trợ tiếng Việt.',
        'Vì `str.format()` đã bị xóa trong Python 3.14.'
      ],
      correctIndex: 1,
      explanation: '`str.format()` cho phép truy cập thuộc tính (`.attr`) và chỉ mục (`[key]`) bên trong `{...}`, dẫn đến lỗ hổng Format String Attribute Leak nghiêm trọng.'
    },
    {
      question: '[Final Exam 6/6] Cú pháp lượng từ chiếm hữu (Possessive Quantifier) nào trong module `re` (từ Python 3.11+) giúp khớp một hoặc nhiều chữ cái mà KHÔNG BAO GIỜ quay lui (backtrack) để phòng chống ReDoS?',
      options: [
        '`[a-z]+?`',
        '`[a-z]++`',
        '`(?=[a-z]+)`',
        '`[a-z]*`'
      ],
      correctIndex: 1,
      explanation: 'Dấu cộng kép `++` (hoặc `*+`, `?+`, hoặc nhóm nguyên tử `(?>...)`) là lượng từ chiếm hữu: một khi đã khớp các ký tự, bộ máy Regex khóa chặt không trả lại ký tự để thử nhánh quay lui.'
    }
  ],

  summary: [
    'Bạn đã hoàn thành trọn vẹn hành trình 8 Phần từ nền tảng `str`, 47 phương thức, Format Mini-Language, f-string PEP 701, t-string PEP 750 đến Unicode Tiếng Việt, Regex, CPython PEP 393 và Bảo mật thực chiến.',
    'Luôn ghi nhớ bản chất cốt lõi: `str` là dãy bất biến gồm các Unicode code point.',
    'Tận dụng sức mạnh mới của Python 3.14 (`t"..."` và `string.templatelib`) mỗi khi xây dựng HTML, SQL hay cấu trúc dữ liệu có đầu vào từ bên ngoài.',
    'Hãy sử dụng Cheat Sheet và Từ điển lỗi trong bài này làm tài liệu tra cứu đồng hành trong các dự án Python thực tế của bạn!'
  ]
};
