export default {
  id: 'p5-01',
  partId: 'part-5',
  partTitle: 'Phần 5 – Xử lý văn bản nâng cao (Nâng cao)',
  number: '5.1',
  title: 'Biểu thức chính quy với Module re (Phần 1): Cốt lõi & Nhóm bắt giữ',
  subtitle: 'Làm chủ các hàm tìm kiếm/thay thế, Named Groups (?P<name>...), Backreferences và hệ thống cờ điều khiển trong Python 3.14',
  level: 'Nâng cao',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,
  objectives: [
    'Hiểu vì sao luôn phải dùng Raw String (r"...") cho mẫu biểu thức chính quy trong Python.',
    'Phân biệt chính xác hành vi và giá trị trả về của 10 hàm cốt lõi: search, match, fullmatch, findall, finditer, sub, subn, split, compile và escape.',
    'Khai thác nhóm bắt giữ thường (...), nhóm không bắt giữ (?:...), nhóm có tên (?P<name>...) cùng .groupdict().',
    'Sử dụng tham chiếu ngược (?P=name) / \\g<name> và các cờ điều khiển re.I, re.M, re.S, re.A.'
  ],
  intuition: {
    title: 'Đội đặc nhiệm Tìm kiếm & Khuôn đúc Thông tin tự động',
    metaphor: 'Nếu các phương thức str.find() hay str.replace() giống như việc bạn tìm đúng một từ cố định trong sách bằng kính lúp, thì Biểu thức chính quy (Regular Expression - module re) giống như một chiếc máy quét X-quang lập trình được: bạn chỉ cần mô tả "hình dáng" của dữ liệu (ví dụ: 2 chữ số ngày + dấu gạch chéo + 2 chữ số tháng + 4 chữ số năm), máy quét sẽ lập tức tìm ra mọi ngày tháng trong hàng triệu dòng nhật ký, đồng thời tự động bóc tách từng phần vào các ngăn chứa có dán nhãn tên (Named Groups) để bạn lấy ra dưới dạng từ điển Python!',
    visualHtml: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-family:monospace;font-size:12.5px;padding:14px;background:rgba(15,23,42,0.6);border:1px solid #334155;border-radius:12px;">
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-top:3px solid #38bdf8;">
          <div style="color:#38bdf8;font-weight:bold;margin-bottom:6px;">So sánh 3 hàm khớp mẫu đơn</div>
          <div style="color:#e2e8f0;line-height:1.6;">
            • <b>re.search(pat, s)</b>: Quét tìm ở <i>bất kỳ vị trí nào</i> trong chuỗi<br/>
            • <b>re.match(pat, s)</b>: Chỉ khớp ngay từ <i>đầu chuỗi</i> (index 0)<br/>
            • <b>re.fullmatch(pat, s)</b>: Khớp trọn vẹn <i>100% toàn bộ chuỗi</i>
          </div>
        </div>
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-top:3px solid #10b981;">
          <div style="color:#34d399;font-weight:bold;margin-bottom:6px;">Named Group &amp; Backreference</div>
          <div style="color:#e2e8f0;line-height:1.6;">
            • Định nghĩa: <code>(?P&lt;year&gt;\\d{4})</code><br/>
            • Lấy dict: <code>m.groupdict()</code> ➔ <code>{'year': '2026'}</code><br/>
            • Khớp lặp lại trong mẫu: <code>(?P=year)</code><br/>
            • Thay thế trong sub(): <code>\\g&lt;year&gt;</code>
          </div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Raw String r"..." và Bộ 10 hàm cốt lõi của module re',
      badge: '10 Hàm Cốt lõi',
      content: `
        <p><strong>Quy tắc số 1:</strong> Luôn viết mẫu Regex bằng <strong>Raw String (<code>r"..."</code>)</strong> để dấu gạch chéo ngược <code>\\</code> được truyền thẳng tới bộ máy Regex thay vì bị trình thông dịch Python hiểu nhầm thành ký tự thoát chuỗi (ví dụ <code>"\\b"</code> là ký tự xóa lùi ASCII <code>0x08</code>, còn <code>r"\\b"</code> mới là ranh giới từ <em>word boundary</em>! Từ Python 3.12–3.14, viết <code>"\\d"</code> không có <code>r</code> sẽ phát cảnh báo <code>SyntaxWarning: invalid escape sequence</code>).</p>
        <p>Bộ 10 công cụ nền tảng trong module <code>re</code>:</p>
        <ul>
          <li><strong>Tìm 1 kết quả (trả về đối tượng <code>re.Match</code> hoặc <code>None</code>):</strong>
            <ul>
              <li><code>re.search(pattern, string)</code>: Tìm vị trí khớp đầu tiên ở <strong>bất kỳ đâu</strong> trong chuỗi.</li>
              <li><code>re.match(pattern, string)</code>: Chỉ kiểm tra khớp tại <strong>vị trí đầu chuỗi</strong>.</li>
              <li><code>re.fullmatch(pattern, string)</code>: Toàn bộ chuỗi từ đầu đến cuối phải khớp hoàn toàn với mẫu (tốt nhất để validate email, số điện thoại, mã sinh viên).</li>
            </ul>
          </li>
          <li><strong>Tìm tất cả kết quả:</strong>
            <ul>
              <li><code>re.findall(pattern, string)</code>: Trả về <code>list[str]</code> (hoặc <code>list[tuple]</code> nếu mẫu có nhiều nhóm bắt giữ).</li>
              <li><code>re.finditer(pattern, string)</code>: Trả về một <strong>iterator các đối tượng <code>re.Match</code></strong> — tiết kiệm bộ nhớ và giữ nguyên thông tin vị trí <code>m.span()</code> cũng như các nhóm con.</li>
            </ul>
          </li>
          <li><strong>Biến đổi, cắt chuỗi và tiện ích:</strong>
            <ul>
              <li><code>re.sub(pattern, repl, string, count=0)</code>: Thay thế các vùng khớp bằng chuỗi mới hoặc bằng một <strong>hàm callback <code>repl(match)</code></strong>.</li>
              <li><code>re.subn(pattern, repl, string, count=0)</code>: Giống <code>sub()</code> nhưng trả về tuple <code>(new_string, number_of_subs_made)</code>.</li>
              <li><code>re.split(pattern, string, maxsplit=0)</code>: Tách chuỗi theo mẫu biểu thức chính quy.</li>
              <li><code>re.compile(pattern, flags=0)</code>: Biên dịch sẵn mẫu thành đối tượng <code>re.Pattern</code> để tái sử dụng hiệu năng cao và truyền thêm tham số <code>pos, endpos</code>.</li>
              <li><code>re.escape(string)</code>: Tự động thêm <code>\\</code> trước mọi ký tự đặc biệt trong chuỗi đầu vào của người dùng để tìm kiếm nguyên nghĩa an toàn.</li>
            </ul>
          </li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh search, match, fullmatch, findall, finditer, subn, split và escape',
          code: `import re

log = "ID: PY-101 | Giá: 250$ | Mã phụ: PY-202"

# 1. Phân biệt search, match và fullmatch
pat = re.compile(r"PY-\\d+")
print("search   :", pat.search(log).group(0))
print("match    :", pat.match(log))           # None vì đầu chuỗi là "ID: "
print("fullmatch:", pat.fullmatch("PY-101").group(0))

# 2. finditer lấy cả vị trí span() lẫn giá trị
for m in pat.finditer(log):
    print(f"Tìm thấy {m.group(0)!r} tại vị trí {m.span()}")

# 3. subn với hàm callback và escape chuỗi có ký tự đặc biệt
new_log, count = pat.subn(lambda m: f"[{m.group(0)}]", log)
print(f"subn ({count} lần): {new_log}")

# 4. split theo nhiều dấu phân cách và escape từ khóa chứa '$'
parts = re.split(r"\\s*\\|\\s*", log)
safe_price_pat = re.escape("250$")
print("split :", parts)
print("escape:", safe_price_pat, "-> Khớp:", bool(re.search(safe_price_pat, log)))`,
          output: `search   : PY-101
match    : None
fullmatch: PY-101
Tìm thấy 'PY-101' tại vị trí (4, 10)
Tìm thấy 'PY-202' tại vị trí (33, 39)
subn (2 lần): ID: [PY-101] | Giá: 250$ | Mã phụ: [PY-202]
split : ['ID: PY-101', 'Giá: 250$', 'Mã phụ: PY-202']
escape: 250\\$ -> Khớp: True`,
          annotations: [
            { line: 8, text: 'pat.match(log) trả về None vì "PY-\\d+" nằm ở vị trí index 4 chứ không phải index 0.' },
            { line: 16, text: 're.sub / re.subn cho phép truyền một hàm nhận đối tượng Match và trả về chuỗi thay thế động.' },
            { line: 21, text: 'Nếu không dùng re.escape("250$"), ký hiệu $ sẽ bị hiểu là kết thúc chuỗi thay vì ký tự đô-la!' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Nhóm bắt giữ, Nhóm có tên (?P<name>...) và Tham chiếu ngược',
      badge: 'Groups & Backrefs',
      content: `
        <p>Dấu ngoặc đơn trong Regex không chỉ dùng để gom nhóm lượng từ mà còn tạo ra các <strong>Nhóm bắt giữ (Capturing Groups)</strong>:</p>
        <ul>
          <li><strong>Nhóm đánh số thường <code>(...)</code>:</strong> Đánh số từ <code>1</code> trở đi theo thứ tự dấu mở ngoặc <code>(</code> từ trái sang phải. Truy cập bằng <code>m.group(1)</code> (hoặc <code>m[1]</code> từ Python 3.6+), lấy toàn bộ bằng <code>m.groups()</code>. Nhóm <code>0</code> (<code>m.group(0)</code> hay <code>m[0]</code>) luôn là toàn bộ chuỗi khớp.</li>
          <li><strong>Nhóm không bắt giữ <code>(?:...)</code> (Non-capturing Group):</strong> Chỉ gom nhóm biểu thức (ví dụ <code>(?:http|https)://</code>) mà không tạo nhóm đánh số mới — giúp <code>re.findall()</code> và <code>m.groups()</code> không bị rác bởi các nhóm phụ.</li>
          <li><strong>Nhóm có tên <code>(?P&lt;name&gt;...)</code> (Named Group — Cú pháp đặc sản của Python):</strong> Đặt tên định danh trực tiếp cho nhóm. Bạn có thể truy cập bằng <code>m.group("name")</code>, <code>m["name"]</code>, hoặc gọi <strong><code>m.groupdict()</code></strong> để nhận ngay một <code>dict</code> Python hoàn chỉnh!</li>
          <li><strong>Tham chiếu ngược (Backreferences):</strong>
            <ul>
              <li>Ngay bên trong mẫu Regex: Dùng <code>\\1</code>, <code>\\2</code> hoặc <strong><code>(?P=name)</code></strong> để yêu cầu văn bản tại vị trí đó phải <strong>giống hệt</strong> nội dung mà nhóm trước đã bắt được (ví dụ bắt thẻ đóng HTML khớp thẻ mở, hoặc tìm từ bị gõ lặp đôi).</li>
              <li>Trong chuỗi thay thế của <code>re.sub()</code>: Dùng <code>\\1</code> hoặc <strong><code>\\g&lt;name&gt;</code></strong> (hoặc <code>\\g&lt;1&gt;</code> để tránh nhập nhằng khi ngay sau nhóm là một chữ số).</li>
            </ul>
          </li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Bóc tách dữ liệu có cấu trúc với (?P<name>...), groupdict() và (?P=name)',
          code: `import re

# 1. Trích xuất ngày tháng thành dict với (?P<name>...) và groupdict()
date_pat = re.compile(r"(?P<day>\\d{2})/(?P<month>\\d{2})/(?P<year>\\d{4})")
m = date_pat.search("Hạn chót nộp bài: 25/10/2026 lúc 23:59")
if m:
    print("Truy cập m['year']:", m["year"])
    print("groupdict()       :", m.groupdict())

# 2. Đổi định dạng DD/MM/YYYY -> YYYY-MM-DD bằng tham chiếu ngược \\g<name>
iso_text = date_pat.sub(r"\\g<year>-\\g<month>-\\g<day>", "Ngày 05/09/2026 và 20/11/2026")
print("Đổi sang chuẩn ISO:", iso_text)

# 3. Tham chiếu ngược (?P=word) ngay trong mẫu để xóa từ tiếng Việt bị gõ lặp đôi
dup_pat = re.compile(r"\\b(?P<word>\\w+)\\s+(?P=word)\\b", flags=re.IGNORECASE)
sentence = "Anh ấy ấy đang học học lập trình Python"
print("Khử từ lặp đôi    :", dup_pat.sub(r"\\g<word>", sentence))`,
          output: `Truy cập m['year']: 2026
groupdict()       : {'day': '25', 'month': '10', 'year': '2026'}
Đổi sang chuẩn ISO: Ngày 2026-09-05 và 2026-11-20
Khử từ lặp đôi    : Anh ấy đang học lập trình Python`,
          annotations: [
            { line: 7, text: 'Từ Python 3.6+, đối tượng Match hỗ trợ cú pháp m["year"] hoặc m[1] ngắn gọn hơn m.group("year").' },
            { line: 11, text: 'Dùng \\g<year> trong re.sub() rõ ràng và an toàn hơn \\1, đặc biệt khi nối liền với chữ số.' },
            { line: 15, text: '(?P=word) bắt buộc từ thứ hai phải trùng khớp chính xác với từ mà nhóm (?P<word>\\w+) vừa bắt được.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Các cờ điều khiển re.IGNORECASE, re.MULTILINE, re.DOTALL, re.ASCII',
      badge: 'Regex Flags',
      content: `
        <p>Bạn có thể thay đổi hành vi của bộ máy Regex bằng cách truyền tham số <code>flags=...</code> (kết hợp nhiều cờ bằng toán tử bitwise OR <code>|</code>, ví dụ <code>flags=re.I | re.M</code>) hoặc viết cờ nội tuyến (inline flag) như <code>(?im)</code> ở đầu mẫu:</p>
        <ul>
          <li><code>re.IGNORECASE</code> (<code>re.I</code>): Khớp không phân biệt chữ hoa/thường (hỗ trợ cả Unicode theo mặc định).</li>
          <li><code>re.MULTILINE</code> (<code>re.M</code>): Mặc định <code>^</code> chỉ khớp đầu toàn bộ chuỗi và <code>$</code> chỉ khớp cuối toàn bộ chuỗi. Khi bật <code>re.M</code>, <code>^</code> và <code>$</code> sẽ khớp với cả <strong>đầu và cuối của từng dòng</strong> (ngay sau và ngay trước ký tự xuống dòng <code>\\n</code>).</li>
          <li><code>re.DOTALL</code> (<code>re.S</code>): Mặc định dấu chấm <code>.</code> khớp mọi ký tự <em>ngoại trừ ký tự xuống dòng <code>\\n</code></em>. Khi bật <code>re.S</code>, dấu chấm <code>.</code> khớp <strong>tất cả mọi ký tự bao gồm cả <code>\\n</code></strong> (rất cần khi quét nội dung nằm trên nhiều dòng).</li>
          <li><code>re.ASCII</code> (<code>re.A</code>): Mặc định trong Python 3, <code>\\w</code> khớp mọi chữ cái/số Unicode (bao gồm cả tiếng Việt <code>"Đắk_Lắk"</code>) và <code>\\d</code> khớp cả chữ số Ả Rập, chữ số Thái hay chữ số Fullwidth <code>"１２３"</code>! Khi bật <code>re.A</code>, các lớp <code>\\w, \\d, \\s, \\b</code> bị thu hẹp về đúng phạm vi <strong>ASCII thuần túy</strong> (<code>[a-zA-Z0-9_]</code> và <code>[0-9]</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sự khác biệt quyết định của các cờ re.I, re.M, re.S và re.A',
          code: `import re

multiline_log = """INFO: Khởi động hệ thống
error: Không kết nối được DB
WARN: Thử lại lần 1
ERROR: Hết thời gian chờ"""

# 1. Kết hợp re.MULTILINE (^) và re.IGNORECASE để lấy các dòng bắt đầu bằng ERROR
errors = re.findall(r"^error:.*$", multiline_log, flags=re.M | re.I)
print("Các dòng lỗi (re.M | re.I):", errors)

# 2. Cờ re.DOTALL (re.S) giúp dấu chấm '.' đi xuyên qua ký tự xuống dòng \\n
block = "/* Đây là chú thích\\nnằm trên 2 dòng */"
print("Không có re.S:", re.search(r"/\\*.*\\*/", block))
print("Có bật   re.S:", re.search(r"/\\*.*\\*/", block, flags=re.S).group(0).replace("\\n", "\\\\n"))

# 3. Cờ re.ASCII (re.A) với tiếng Việt và chữ số ngoại lai
sample = "Mã_Việt_123 và số Thái ๔๕๖"
print("Mặc định Unicode \\\\w+:", re.findall(r"\\w+", sample))
print("Khi bật re.ASCII \\\\w+:", re.findall(r"\\w+", sample, flags=re.A))
print("Mặc định \\\\d+ vs re.A :", re.findall(r"\\d+", sample), "vs", re.findall(r"\\d+", sample, flags=re.A))`,
          output: `Các dòng lỗi (re.M | re.I): ['error: Không kết nối được DB', 'ERROR: Hết thời gian chờ']
Không có re.S: None
Có bật   re.S: /* Đây là chú thích\\nnằm trên 2 dòng */
Mặc định Unicode \\w+: ['Mã_Việt_123', 'và', 'số', 'Thái', '๔๕๖']
Khi bật re.ASCII \\w+: ['M', '_Vi', 't_123', 'v', 's', 'Th', 'i']
Mặc định \\d+ vs re.A : ['123', '๔๕๖'] vs ['123']`,
          annotations: [
            { line: 9, text: 'Nếu thiếu cờ re.M, dấu ^ chỉ kiểm tra dòng đầu tiên ("INFO: ...") nên trả về danh sách rỗng [].' },
            { line: 21, text: 'Chữ số Thái "๔๕๖" (456) được \\d+ mặc định nhận diện là số! Nếu chỉ muốn nhận chữ số 0-9 chuẩn ASCII, hãy dùng re.ASCII hoặc [0-9]+.' }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Cạm bẫy của re.findall() khi mẫu có Capturing Group (...)',
        content: 'Nếu mẫu không có ngoặc đơn, re.findall(r"\\d+-\\d+", "10-20") trả về ["10-20"]. Nhưng nếu bạn thêm ngoặc đơn để lặp như r"(\\d+)-\\d+", findall() sẽ CHỈ trả về nội dung bên trong nhóm bắt giữ (["10"]) chứ không trả về toàn bộ chuỗi khớp! Hãy dùng nhóm không bắt giữ (?:...) khi chỉ muốn gom nhóm ngữ pháp, hoặc dùng re.finditer().'
      },
      {
        title: 'Dùng re.match() để kiểm tra toàn bộ chuỗi mà quên rằng nó cho phép phần đuôi dư thừa!',
        content: 're.match(r"\\d{4}", "2026_abc_xyz") vẫn trả về Match thành công vì nó chỉ kiểm tra ở ĐẦU chuỗi! Để xác thực toàn bộ chuỗi từ đầu đến cuối (như kiểm tra mật khẩu, email, OTP), luôn dùng re.fullmatch() thay cho re.match().'
      }
    ],
    tips: [
      {
        title: 'Truy cập nhóm bắt giữ bằng cú pháp m[0], m[1], m["name"]',
        content: 'Thay vì viết dài dòng m.group(0) hay m.group("email"), đối tượng re.Match hỗ trợ giao thức __getitem__, cho phép bạn viết trực tiếp m[0] và m["email"] cực kỳ gọn gàng.'
      },
      {
        title: 'Khi nào cần gọi re.compile()?',
        content: 'Module re đã tự động lưu bộ nhớ đệm (cache) cho 512 mẫu regex gần nhất. Tuy nhiên, gọi re.compile() ngoài vòng lặp vẫn nhanh hơn vì bỏ qua bước tra cứu cache mỗi vòng lặp, đồng thời làm mã nguồn sạch sẽ và tự mô tả rõ nghĩa qua tên biến.'
      }
    ],
    deepDive: {
      title: 'Tại sao \\d trong Python 3 lại khớp cả chữ số Ả Rập, Thái, Devanagari?',
      content: `
        <p>Trong Python 3, các mẫu trên chuỗi <code>str</code> mặc định hoạt động ở chế độ <strong>Unicode (<code>re.UNICODE</code>)</strong>. Điều đó có nghĩa là <code>\\d</code> khớp với mọi ký tự có thuộc tính <code>unicodedata.category(c) == 'Nd'</code> (gồm hàng chục hệ chữ số trên thế giới như <code>٠١٢٣</code>, <code>०१२३</code>, <code>０１２３</code>). Đáng ngạc nhiên hơn, hàm <code>int("０１２３")</code> của Python cũng chuyển chuỗi đó thành số nguyên <code>123</code> hợp lệ!</p>
        <p>Tuy nhiên, nếu bạn đang viết bộ kiểm tra cho hệ thống bên ngoài (như SQL, API ngân hàng, Regex phía JavaScript) chỉ chấp nhận chữ số ASCII <code>0-9</code>, hãy luôn viết rõ <code>[0-9]</code> hoặc bật cờ <code>re.ASCII</code> (<code>re.A</code>).</p>
      `
    },
    newIn314: null
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Xác thực biển số xe máy/ô tô Việt Nam với fullmatch',
      problem: 'Viết hàm is_valid_plate(plate: str) -> bool sử dụng re.fullmatch() để kiểm tra biển số xe có đúng định dạng: 2 chữ số tỉnh thành + 1 chữ cái in hoa (A-Z) + dấu gạch ngang "-" + 3 chữ số + dấu chấm "." + 2 chữ số (ví dụ: "51G-123.45", "29A-999.99").',
      hint: 'Dùng mẫu r"\\d{2}[A-Z]-\\d{3}\\.\\d{2}" hoặc r"[0-9]{2}[A-Z]-[0-9]{3}\\.[0-9]{2}" với re.fullmatch(). Nhớ thoát dấu chấm bằng \\.',
      solutionCode: `import re

PLATE_PATTERN = re.compile(r"[0-9]{2}[A-Z]-[0-9]{3}\\.[0-9]{2}")

def is_valid_plate(plate: str) -> bool:
    return bool(PLATE_PATTERN.fullmatch(plate))

for test in ["51G-123.45", "29A-999.99", "51G-12345", "51G-123.45_extra"]:
    print(f"{test:18} -> {is_valid_plate(test)}")`,
      solutionOutput: `51G-123.45         -> True
29A-999.99         -> True
51G-12345          -> False
51G-123.45_extra   -> False`,
      explanation: 'Nhờ dùng fullmatch(), chuỗi "51G-123.45_extra" bị từ chối chính xác (nếu dùng match() sẽ bị lọt lưới). Dấu chấm phải được thoát thành \\. để không khớp với ký tự bất kỳ.'
    },
    {
      level: 'Vừa',
      title: 'Phân tích dòng Log Nginx bằng Named Groups (?P<name>...)',
      problem: 'Cho một dòng log có định dạng: "203.113.152.1 - [21/Oct/2026] \\"GET /api/v1/users HTTP/1.1\\" 200 1540". Hãy viết hàm parse_log(line: str) -> dict[str, str] | None dùng 1 biểu thức chính quy với các nhóm có tên: ip, date, method, path, status, bytes và trả về kết quả từ .groupdict().',
      hint: 'Đặt tên từng nhóm bằng (?P<ip>...), (?P<date>...), (?P<method>...), (?P<path>...), (?P<status>\\d{3}), (?P<bytes>\\d+).',
      solutionCode: `import re

LOG_RE = re.compile(
    r"(?P<ip>\\d+(?:\\.\\d+){3})\\s+-\\s+"
    r"\\[(?P<date>[^\\]]+)\\]\\s+"
    r'"(?P<method>[A-Z]+)\\s+(?P<path>\\S+)\\s+HTTP/[0-9.]+"\\s+'
    r"(?P<status>\\d{3})\\s+(?P<bytes>\\d+)"
)

def parse_log(line: str) -> dict[str, str] | None:
    m = LOG_RE.fullmatch(line.strip())
    return m.groupdict() if m else None

sample = '203.113.152.1 - [21/Oct/2026] "GET /api/v1/users HTTP/1.1" 200 1540'
print(parse_log(sample))`,
      solutionOutput: `{'ip': '203.113.152.1', 'date': '21/Oct/2026', 'method': 'GET', 'path': '/api/v1/users', 'status': '200', 'bytes': '1540'}`,
      explanation: 'Sử dụng nhóm không bắt giữ (?:\.\\d+){3} bên trong (?P<ip>...) giúp không làm sinh thêm nhóm thừa, và m.groupdict() xuất thẳng ra dict với các key đã định nghĩa.'
    },
    {
      level: 'Khó',
      title: 'Ẩn thông tin nhạy cảm (Masking) bằng re.sub với hàm Callback và Named Groups',
      problem: 'Viết hàm mask_sensitive(text: str) -> str tìm cả địa chỉ Email lẫn số điện thoại 10 chữ số (bắt đầu bằng số 0) trong cùng 1 lần quét re.sub. Nếu khớp email (ví dụ "nhatvo@gmail.com"), giữ ký tự đầu và cuối của phần tên trước @, thay ở giữa bằng "***" ("n***o@gmail.com"). Nếu khớp số điện thoại (ví dụ "0912345678"), chỉ giữ 3 số đầu và 2 số cuối, thay 5 số giữa bằng "*****" ("091*****78").',
      hint: 'Kết hợp 2 mẫu bằng toán tử | với m.lastgroup để biết nhóm nào vừa khớp trong hàm callback truyền vào re.sub.',
      solutionCode: `import re

SENSITIVE_RE = re.compile(
    r"(?P<email>\\b(?P<user>[a-zA-Z0-9._%+-]+)@(?P<domain>[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})\\b)"
    r"|(?P<phone>\\b0[0-9]{9}\\b)"
)

def _replacer(m: re.Match) -> str:
    if m.lastgroup == "email":
        u = m["user"]
        masked_u = u[0] + "***" + u[-1] if len(u) > 2 else u[0] + "***"
        return f"{masked_u}@{m['domain']}"
    p = m["phone"]
    return f"{p[:3]}*****{p[-2:]}"

def mask_sensitive(text: str) -> str:
    return SENSITIVE_RE.sub(_replacer, text)

msg = "Liên hệ KH qua email nhatvo@gmail.com hoặc SĐT 0912345678 để xác nhận."
print(mask_sensitive(msg))`,
      solutionOutput: `Liên hệ KH qua email n***o@gmail.com hoặc SĐT 091*****78 để xác nhận.`,
      explanation: 'Thuộc tính m.lastgroup trả về tên của nhóm bắt giữ ngoài cùng vừa khớp ("email" hoặc "phone"), kết hợp với hàm callback trong re.sub() cho phép xử lý nhiều quy tắc biến đổi phức tạp chỉ trong một lần duyệt chuỗi.'
    }
  ],
  quiz: [
    {
      question: 'Hàm nào trong module re đảm bảo rằng TOÀN BỘ chuỗi từ ký tự đầu tiên đến ký tự cuối cùng phải khớp hoàn toàn với biểu thức chính quy?',
      options: [
        're.fullmatch(pattern, string)',
        're.match(pattern, string)',
        're.search(pattern, string)',
        're.findall(pattern, string)'
      ],
      correctIndex: 0,
      explanation: 're.match() chỉ kiểm tra từ đầu chuỗi (cho phép phần đuôi thừa phía sau), re.search() tìm ở bất kỳ đâu, chỉ có re.fullmatch() mới bắt buộc toàn bộ chuỗi phải khớp trọn vẹn với mẫu.'
    },
    {
      question: 'Cú pháp nào dùng để định nghĩa một nhóm bắt giữ có tên "code" trong biểu thức chính quy của Python và tham chiếu ngược lại chính nó ngay trong mẫu đó?',
      options: [
        'Định nghĩa bằng (?P<code>...) và tham chiếu ngược trong mẫu bằng (?P=code)',
        'Định nghĩa bằng (?<code>...) và tham chiếu ngược trong mẫu bằng \\k<code>',
        'Định nghĩa bằng (:code:...) và tham chiếu ngược trong mẫu bằng $code',
        'Định nghĩa bằng (?P=code...) và tham chiếu ngược trong mẫu bằng (?P<code>)'
      ],
      correctIndex: 0,
      explanation: 'Trong Python re, (?P<name>...) dùng để tạo nhóm có tên, (?P=name) dùng để tham chiếu ngược ngay trong mẫu regex, còn \\g<name> dùng trong chuỗi thay thế của re.sub().'
    },
    {
      question: 'Kết quả của re.findall(r"(\\d+)-(\\d+)", "Từ 10-20 đến 30-40") là gì?',
      options: [
        '[("10", "20"), ("30", "40")]',
        '["10-20", "30-40"]',
        '["10", "20", "30", "40"]',
        'Một đối tượng iterator chứa hai phần tử Match'
      ],
      correctIndex: 0,
      explanation: 'Khi biểu thức trong re.findall() có từ 2 nhóm bắt giữ (...) trở lên, nó trả về một danh sách các tuple chứa nội dung của từng nhóm bắt giữ tương ứng.'
    },
    {
      question: 'Để dấu chấm "." trong biểu thức chính quy khớp được với cả ký tự xuống dòng "\\n", bạn cần bật cờ nào?',
      options: [
        're.DOTALL (hoặc re.S)',
        're.MULTILINE (hoặc re.M)',
        're.VERBOSE (hoặc re.X)',
        're.IGNORECASE (hoặc re.I)'
      ],
      correctIndex: 0,
      explanation: 'Cờ re.DOTALL (viết tắt là re.S — Single-line mode) cho phép ký tự đại diện "." khớp với mọi ký tự bao gồm cả ký tự xuống dòng "\\n".'
    }
  ],
  summary: [
    'Luôn viết biểu thức chính quy bằng Raw String r"..." để tránh xung đột ký tự thoát \\ giữa Python và bộ máy Regex.',
    'Sử dụng re.fullmatch() khi xác thực toàn bộ chuỗi, re.search() khi tìm kiếm một vị trí bất kỳ, và re.finditer() khi cần lặp qua nhiều kết quả kèm vị trí.',
    'Tận dụng nhóm có tên (?P<name>...), m.groupdict(), tham chiếu ngược (?P=name) và \\g<name> để mã nguồn tự mô tả và dễ bảo trì.',
    'Nắm vững tác dụng của các cờ điều khiển: re.I (không phân biệt hoa/thường), re.M (^ và $ khớp từng dòng), re.S (dấu . khớp cả \\n) và re.A (giới hạn \\w, \\d về ASCII).'
  ]
};
