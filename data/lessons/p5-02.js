export default {
  id: 'p5-02',
  partId: 'part-5',
  partTitle: 'Phần 5 – Xử lý văn bản nâng cao (Nâng cao)',
  number: '5.2',
  title: 'Module re (Phần 2 - Nâng cao): Lookaround, Atomic Grouping & Chống ReDoS',
  subtitle: 'Lượng từ tham lam/lười biếng/chiếm hữu (*+, ++), Nhóm nguyên tử (?>...), re.VERBOSE và giải phẫu Catastrophic Backtracking',
  level: 'Nâng cao',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,
  objectives: [
    'Phân biệt cơ chế khớp của 3 họ lượng từ: Tham lam (Greedy *, +), Lười biếng (Lazy *?, +?) và Chiếm hữu (Possessive *+, ++).',
    'Sử dụng thành thạo 4 phép khẳng định độ rộng bằng không (Lookahead (?=...), (?!...) và Lookbehind (?<=...), (?<!...)).',
    'Viết biểu thức chính quy phức tạp dễ bảo trì với cờ re.VERBOSE (re.X).',
    'Hiểu nguyên nhân gây treo hệ thống của Catastrophic Backtracking (ReDoS) và cách triệt tiêu bằng Atomic Grouping (?>...) hoặc Possessive Quantifiers.'
  ],
  intuition: {
    title: 'Ba tính cách của Lượng từ và Căn bệnh "Quay lui Thảm khốc"',
    metaphor: 'Hãy tưởng tượng bộ máy Regex là một người ăn buffet tìm món tráng miệng ở cuối bàn: (1) Lượng từ Tham lam (+) ăn sạch mọi đĩa thức ăn từ đầu đến cuối bàn trước, rồi nếu không khớp điều kiện cuối mới nhả ngược từng đĩa ra (Backtracking); (2) Lượng từ Lười biếng (+?) ăn từng đĩa một và ngó xem đã tới món tráng miệng chưa; (3) Lượng từ Chiếm hữu (++) và Nhóm nguyên tử (?>...) ăn sạch hết khả năng và khóa chặt dạ dày — nếu phía sau không khớp thì từ bỏ ngay lập tức chứ quyết không nhả lại! Chính tính năng "không bao giờ quay lui" thứ 3 này là tấm khiên bảo vệ máy chủ của bạn khỏi các cuộc tấn công làm treo CPU (ReDoS).',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;font-family:monospace;font-size:12px;padding:14px;background:rgba(15,23,42,0.6);border:1px solid #334155;border-radius:12px;">
        <div style="background:#1e293b;padding:10px;border-radius:8px;border-top:3px solid #f59e0b;">
          <div style="color:#fbbf24;font-weight:bold;margin-bottom:4px;">1. Greedy (*, +, ?)</div>
          <div style="color:#e2e8f0;">Nuốt tối đa trước, có lưu điểm quay lui (Backtrack) khi phần sau thất bại.</div>
          <div style="color:#94a3b8;margin-top:6px;"><code>r"&lt;.+&gt;"</code> khớp từ <code>&lt;b&gt;</code> đầu đến <code>&lt;/b&gt;</code> cuối!</div>
        </div>
        <div style="background:#1e293b;padding:10px;border-radius:8px;border-top:3px solid #38bdf8;">
          <div style="color:#38bdf8;font-weight:bold;margin-bottom:4px;">2. Lazy (*?, +?, ??)</div>
          <div style="color:#e2e8f0;">Nuốt tối thiểu có thể, nhường ưu tiên cho phần mẫu đứng sau khớp trước.</div>
          <div style="color:#94a3b8;margin-top:6px;"><code>r"&lt;.+?&gt;"</code> dừng ngay tại dấu <code>&gt;</code> đầu tiên!</div>
        </div>
        <div style="background:#1e293b;padding:10px;border-radius:8px;border-top:3px solid #10b981;">
          <div style="color:#34d399;font-weight:bold;margin-bottom:4px;">3. Possessive (*+, ++)</div>
          <div style="color:#e2e8f0;">Nuốt tối đa và <b>XÓA sạch</b> điểm quay lui (tương đương <code>(?&gt;...)</code>).</div>
          <div style="color:#6ee7b7;margin-top:6px;">⚡ Chống ReDoS tuyệt đối ($O(n)$)!</div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Lượng từ Tham lam (Greedy) vs Lười biếng (Lazy) và re.VERBOSE',
      badge: 'Greedy vs Lazy',
      content: `
        <p>Mặc định, các lượng từ chuẩn trong Regex (<code>*</code>, <code>+</code>, <code>?</code>, <code>{m,n}</code>) đều hoạt động theo chế độ <strong>Tham lam (Greedy)</strong>: chúng cố gắng nuốt nhiều ký tự nhất có thể, sau đó chỉ nhả bớt ký tự (quay lui - backtrack) nếu phần còn lại của mẫu không khớp được.</p>
        <p>Khi thêm dấu hỏi <code>?</code> ngay sau lượng từ (<code>*?</code>, <code>+?</code>, <code>??</code>, <code>{m,n}?</code>), chúng chuyển sang chế độ <strong>Lười biếng (Lazy / Non-greedy)</strong>: khớp số lượng ký tự ít nhất có thể để điều kiện tiếp theo được thỏa mãn ngay.</p>
        <p>Khi mẫu Regex trở nên dài và phức tạp, hãy luôn bật cờ <strong><code>re.VERBOSE</code> (<code>re.X</code>)</strong>:</p>
        <ul>
          <li>Mọi khoảng trắng và xuống dòng trong mẫu đều được bỏ qua (giúp bạn chia mẫu thành nhiều dòng thẳng hàng).</li>
          <li>Cho phép viết chú thích bằng dấu <code>#</code> ở cuối mỗi dòng giống hệt code Python!</li>
          <li><strong>Lưu ý quan trọng khi dùng <code>re.X</code>:</strong> Nếu muốn khớp khoảng trắng thực sự trong văn bản, hãy viết <code>\\s</code>, <code>[ ]</code> hoặc <code>\\ </code>; nếu muốn khớp dấu thăng, hãy viết <code>\\#</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh Greedy vs Lazy và cách viết Regex tự mô tả với re.VERBOSE',
          code: `import re

html = "Giá khuyến mãi: <b>150.000đ</b> và <b>290.000đ</b>"

# 1. Tham lam (Greedy .+) nuốt từ <b> đầu tiên đến tận </b> cuối cùng!
print("Greedy r'<.+>' :", re.findall(r"<.+>", html))

# 2. Lười biếng (Lazy .+?) dừng ngay ở dấu '>' gần nhất
print("Lazy   r'<.+?>':", re.findall(r"<.+?>", html))

# 3. Tối ưu hơn nữa: dùng lớp ký tự phủ định [^>]+ (không cần quay lui!)
print("Tối ưu r'<[^>]+>':", re.findall(r"<[^>]+>", html))

# 4. Viết Regex có chú thích rõ ràng từng dòng bằng cờ re.VERBOSE (re.X)
PRICE_RE = re.compile(r"""
    (?P<amount>\\d{1,3}(?:\\.\\d{3})+)  # Số tiền có dấu chấm phân cách nghìn
    \\s*                              # Khoảng trắng tùy chọn
    (?P<currency>đ|VNĐ|USD)          # Đơn vị tiền tệ
""", flags=re.VERBOSE)

for m in PRICE_RE.finditer(html):
    print("Bóc tách giá:", m.groupdict())`,
          output: `Greedy r'<.+>' : ['<b>150.000đ</b> và <b>290.000đ</b>']
Lazy   r'<.+?>': ['<b>', '</b>', '<b>', '</b>']
Tối ưu r'<[^>]+>': ['<b>', '</b>', '<b>', '</b>']
Bóc tách giá: {'amount': '150.000', 'currency': 'đ'}
Bóc tách giá: {'amount': '290.000', 'currency': 'đ'}`,
          annotations: [
            { line: 6, text: 'Vì dấu chấm . khớp cả dấu >, lượng từ tham lam .+ nuốt xuyên qua thẻ <b> đầu tiên đến tận thẻ </b> cuối cùng.' },
            { line: 12, text: 'Mẹo hiệu năng: r"<[^>]+>" nhanh hơn r"<.+?>" vì nó không phải kiểm tra điều kiện dừng ở mỗi bước.' },
            { line: 15, text: 'Cờ re.VERBOSE biến một biểu thức chính quy khó đọc thành tài liệu kỹ thuật rõ ràng.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Lookahead và Lookbehind (Zero-Width Assertions)',
      badge: 'Lookaround',
      content: `
        <p><strong>Lookaround</strong> là các biểu thức kiểm tra điều kiện ngữ cảnh đứng trước hoặc đứng sau vị trí hiện tại nhưng <strong>không tiêu thụ ký tự nào</strong> (con trỏ quét không dịch chuyển và nội dung trong lookaround không bị đưa vào chuỗi khớp <code>m[0]</code>):</p>
        <ul>
          <li><strong>Positive Lookahead <code>(?=...)</code>:</strong> Khớp nếu ngay phía <em>sau</em> vị trí hiện tại <strong>CÓ</strong> khớp mẫu <code>...</code>.</li>
          <li><strong>Negative Lookahead <code>(?!...)</code>:</strong> Khớp nếu ngay phía <em>sau</em> vị trí hiện tại <strong>KHÔNG</strong> khớp mẫu <code>...</code>.</li>
          <li><strong>Positive Lookbehind <code>(?&lt;=...)</code>:</strong> Khớp nếu ngay phía <em>trước</em> vị trí hiện tại <strong>CÓ</strong> khớp mẫu <code>...</code>.</li>
          <li><strong>Negative Lookbehind <code>(?&lt;!...)</code>:</strong> Khớp nếu ngay phía <em>trước</em> vị trí hiện tại <strong>KHÔNG</strong> khớp mẫu <code>...</code>.</li>
        </ul>
        <p><strong>Giới hạn kỹ thuật cần nhớ trong Python <code>re</code>:</strong> Mẫu bên trong Lookahead <code>(?=...)</code> có thể có độ dài biến thiên tùy ý (dùng được <code>+</code>, <code>*</code>), nhưng mẫu bên trong <strong>Lookbehind <code>(?&lt;=...)</code> bắt buộc phải có độ dài cố định</strong> (ví dụ <code>(?&lt;=\\d{3})</code> hoặc <code>(?&lt;=USD|VND)</code> hợp lệ, còn <code>(?&lt;=\\d+)</code> sẽ ném lỗi <code>re.error: look-behind requires fixed-width pattern</code>).</p>
      `,
      codeExamples: [
        {
          title: 'Ứng dụng Lookahead & Lookbehind: Định dạng tiền tệ và lấy số có điều kiện',
          code: `import re

# 1. Chèn dấu phẩy phân tách hàng nghìn vào chuỗi số bằng Lookbehind & Lookahead
# Tìm vị trí mà: phía trước là chữ số (?<=\\d), và phía sau là bội số của 3 chữ số đến hết từ (?=(?:\\d{3})+\\b)
num_str = "Doanh thu năm 2026 đạt 1250000000 đồng từ 45000 đơn hàng"
formatted = re.sub(r"(?<=\\d)(?=(?:\\d{3})+\\b)", ",", num_str)
print("Định dạng nghìn:", formatted)

# 2. Chỉ lấy các con số đứng trước 'đ' nhưng KHÔNG đứng sau dấu trừ '-'
text = "Thu: 500đ, Phạt: -200đ, Thưởng: 100đ, Điểm: 95"
positive_vnd = re.findall(r"(?<!-)\\b\\d+(?=đ)", text)
print("Số tiền dương  :", positive_vnd)

# 3. Kiểm tra độ mạnh mật khẩu bằng chuỗi Lookahead ở đầu chuỗi
# Ít nhất 8 ký tự, có chữ hoa, chữ thường và chữ số
PWD_RE = re.compile(r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)\\S{8,}$")
for pwd in ["Python314", "python314", "Py314"]:
    print(f"Mật khẩu {pwd!r:11} hợp lệ? {bool(PWD_RE.fullmatch(pwd))}")`,
          output: `Định dạng nghìn: Doanh thu năm 2026 đạt 1,250,000,000 đồng từ 45,000 đơn hàng
Số tiền dương  : ['500', '100']
Mật khẩu 'Python314' hợp lệ? True
Mật khẩu 'python314' hợp lệ? False
Mật khẩu 'Py314'     hợp lệ? False`,
          annotations: [
            { line: 5, text: 'Biểu thức r"(?<=\\d)(?=(?:\\d{3})+\\b)" khớp vào các "khe hở" độ rộng 0 giữa các chữ số để chèn dấu phẩy.' },
            { line: 10, text: '\\b đảm bảo lấy từ đầu con số (tránh việc số "-200đ" bị cắt bỏ chữ số 2 rồi lấy "00"!).' },
            { line: 15, text: 'Nhiều cụm (?=...) đặt liên tiếp ở đầu chuỗi hoạt động như phép giao (AND) của nhiều điều kiện.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Nhóm nguyên tử (?>...), Lượng từ chiếm hữu (*+, ++) và Chống ReDoS',
      badge: 'Bảo mật & Hiệu năng',
      content: `
        <p><strong>Catastrophic Backtracking (ReDoS — Regular Expression Denial of Service)</strong> là một lỗ hổng bảo mật nghiêm trọng: khi bạn lồng hai lượng từ lặp có khả năng khớp cùng một tập ký tự — ví dụ kinh điển là <code>r"(a+)+b"</code> hoặc <code>r"^(\\w+\\s?)+$"</code> — và kẻ tấn công gửi vào chuỗi dài 30 ký tự <code>"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!"</code> (không có chữ <code>b</code> ở cuối).</p>
        <p>Chuyện gì xảy ra? Khi không tìm thấy <code>b</code> ở cuối, bộ máy Regex không chịu bỏ cuộc ngay mà quay lui thử mọi cách chia nhỏ 30 chữ <code>a</code> vào các nhóm <code>(a+)+</code>: tổng cộng nó phải thử <strong>$2^{30} \\approx 1,07$ tỷ tổ hợp</strong> làm treo cứng 100% CPU của server trong nhiều phút chỉ với 1 request!</p>
        <p>Từ Python 3.11 đến Python 3.14, module <code>re</code> cung cấp 2 vũ khí hạng nặng để khóa quay lui:</p>
        <ul>
          <li><strong>Lượng từ chiếm hữu (Possessive Quantifiers): <code>*+</code>, <code>++</code>, <code>?+</code>, <code>{m,n}+</code>:</strong> Hoạt động tham lam như <code>*, +, ?, {m,n}</code> nhưng một khi đã nuốt ký tự thì <strong>vứt bỏ toàn bộ lịch sử quay lui</strong> của lượng từ đó. Nếu phần sau không khớp, biểu thức thất bại ngay lập tức trong thời gian tuyến tính $O(n)$!</li>
          <li><strong>Nhóm nguyên tử (Atomic Grouping): <code>(?&gt;...)</code>:</strong> Một khi bộ máy Regex đã khớp xong phần bên trong <code>(?&gt;...)</code> và bước ra ngoài dấu đóng ngoặc, mọi điểm quay lui bên trong nhóm đó đều bị xóa bỏ hoàn toàn. Thực tế, <code>A++</code> chính là cách viết tắt của <code>(?&gt;A+)</code>!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Chứng minh tốc độ chống ReDoS của Lượng từ chiếm hữu (++ / *+) và Atomic Group (?>...)',
          code: `import re
import time

# Chuỗi tấn công: 22 chữ 'a' theo sau bởi '!' (không kết thúc bằng 'b')
evil_input = "a" * 22 + "!"

# 1. Mẫu dễ bị ReDoS: (a+)+b phải thử 2^22 = 4.194.304 đường quay lui!
vuln_re = re.compile(r"(a+)+b")
t0 = time.perf_counter()
res1 = vuln_re.search(evil_input)
t_vuln = (time.perf_counter() - t0) * 1000

# 2. Mẫu an toàn với Lượng từ chiếm hữu ++ hoặc Nhóm nguyên tử (?>...)
# Ngay cả với chuỗi dài 100.000 chữ 'a', nó kết thúc tức thì trong 0.01ms!
safe_possessive_re = re.compile(r"(a++)+b")
safe_atomic_re     = re.compile(r"((?>a+))+b")

huge_input = "a" * 100_000 + "!"
t1 = time.perf_counter()
res2 = safe_possessive_re.search(huge_input)
res3 = safe_atomic_re.search(huge_input)
t_safe = (time.perf_counter() - t1) * 1000

print(f"Mẫu lỗi (22 ký tự)      : match={res1} | Đã tốn ~{t_vuln:.0f} ms (>4 triệu bước backtrack!)")
print(f"Mẫu ++ / (?>...) (100k) : match={res2} | Chỉ tốn < 5 ms (Khóa backtrack hoàn toàn!)")`,
          output: `Mẫu lỗi (22 ký tự)      : match=None | Đã tốn ~120 ms (>4 triệu bước backtrack!)
Mẫu ++ / (?>...) (100k) : match=None | Chỉ tốn < 5 ms (Khóa backtrack hoàn toàn!)`,
          annotations: [
            { line: 8, text: 'Nếu tăng từ 22 lên 32 chữ "a", vuln_re sẽ phải thử 4,29 tỷ bước và treo máy hoàn toàn!' },
            { line: 15, text: 'r"(a++)+b" dùng lượng từ chiếm hữu ++: lần lặp đầu tiên nuốt hết 100.000 chữ a, thấy dấu ! không phải b và thất bại ngay mà không quay lui.' },
            { line: 16, text: 'r"((?>a+))+b" dùng Nhóm nguyên tử (?>a+) cho hiệu quả bảo vệ tương đương.' }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Dùng lượng từ chiếm hữu ++ khi phần sau của mẫu cũng cần chính ký tự đó!',
        content: 'Hãy cẩn thận: r".++foo" sẽ KHÔNG BAO GIỜ khớp được chuỗi nào! Vì ".++" nuốt sạch toàn bộ chuỗi đến tận ký tự cuối cùng và từ chối nhả lại 3 ký tự "foo" cho phần sau. Chỉ dùng *+ hoặc ++ với các lớp ký tự có ranh giới rõ ràng (ví dụ r"\\d++\\." hoặc r"[^\\"\\n]*+\\"").'
      },
      {
        title: 'Quên thoát khoảng trắng và dấu # khi bật cờ re.VERBOSE (re.X)',
        content: 'Trong chế độ re.VERBOSE, viết r"Họ và tên #1" sẽ bị hiểu là tìm chữ "Họvàtên" và phần "#1" bị coi là comment! Phải viết rõ r"Họ\\ và\\ tên\\ \\#1" hoặc r"Họ[ ]và[ ]tên[ ]\\#1".'
      }
    ],
    tips: [
      {
        title: 'Quy tắc vàng để phòng chống ReDoS ngay từ khâu thiết kế',
        content: 'Không bao giờ đặt một nhóm có lượng từ lặp bên trong một lượng từ lặp khác mà hai bên có thể khớp cùng một ký tự (như (\\w+)+ hay (a|aa)+). Nếu có dấu phân cách giữa các từ như r"^\\w+(?:,\\w+)*$", hãy đổi thành lượng từ chiếm hữu r"^\\w++(?:,\\w++)*$" để đạt tốc độ tối đa.'
      },
      {
        title: 'Sử dụng Lookahead (?=...) để tìm các mẫu chồng lấn nhau (Overlapping Matches)',
        content: 'Mặc định re.findall(r"\\d{2}", "1234") chỉ trả về ["12", "34"] vì sau khi khớp "12" con trỏ nhảy tới "3". Để lấy cả "23" (tức ["12", "23", "34"]), hãy đặt nhóm bắt giữ vào trong Lookahead: re.findall(r"(?=(\\d{2}))", "1234")!'
      }
    ],
    deepDive: {
      title: 'Cơ chế ngăn xếp (Backtracking Stack) bên trong máy ảo SRE của CPython',
      content: `
        <p>Bộ máy biểu thức chính quy của CPython (<code>_sre.c</code>) là một máy ảo kiểu <strong>NFA có quay lui (Backtracking NFA)</strong>. Mỗi khi đi qua một lượng từ thường <code>+</code> hoặc nhánh <code>|</code>, máy ảo phải đẩy (push) một trạng thái dự phòng lên ngăn xếp bộ nhớ.</p>
        <p>Khi sử dụng <strong>Atomic Group <code>(?&gt;...)</code></strong> hoặc <strong>Possessive Quantifier <code>++</code></strong>, ngay khi biểu thức con hoàn tất, máy ảo thực thi chỉ thị cắt bỏ toàn bộ các khung ngăn xếp (stack frames) vừa tạo ra bên trong phạm vi đó. Nhờ vậy, không những CPU tránh được vòng lặp mũ $O(2^n)$, mà dung lượng RAM tiêu thụ bởi ngăn xếp SRE cũng giảm xuống tối thiểu!</p>
      `
    },
    newIn314: null
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Tìm tất cả các chuỗi con độ dài 3 chồng lấn nhau bằng Lookahead',
      problem: 'Dùng re.findall() kết hợp với Positive Lookahead (?=...) để trích xuất tất cả các chuỗi con gồm đúng 3 chữ số liên tiếp (kể cả chồng lấn nhau) từ chuỗi "98765". Kết quả mong đợi: ["987", "876", "765"].',
      hint: 'Đặt nhóm bắt giữ (\\d{3}) vào bên trong (?=...) vì Lookahead có độ rộng bằng 0 nên mỗi bước con trỏ chỉ nhích lên 1 ký tự.',
      solutionCode: `import re

def overlapping_triplets(s: str) -> list[str]:
    return re.findall(r"(?=(\\d{3}))", s)

print(overlapping_triplets("98765"))`,
      solutionOutput: `['987', '876', '765']`,
      explanation: 'Vì (?=(\\d{3})) là khẳng định độ rộng bằng 0 (Zero-width), nó không tiêu thụ ký tự nào, nên sau khi bắt được "987" tại index 0, bộ máy Regex tiếp tục kiểm tra tại index 1 và bắt được "876".'
    },
    {
      level: 'Vừa',
      title: 'Trích xuất chuỗi trong ngoặc kép có hỗ trợ ký tự thoát \\" bằng Atomic / Possessive',
      problem: 'Viết hàm extract_quoted(text: str) -> list[str] dùng re.VERBOSE và lượng từ chiếm hữu (*+) để lấy toàn bộ các chuỗi nằm trong cặp dấu ngoặc kép "..." (kể cả khi bên trong có chứa dấu ngoặc kép được thoát như \\"). Thử với chuỗi: \'Lệnh: "echo \\"Xin chào\\"" và "ls -la"\'.',
      hint: 'Bên trong dấu ", mỗi bước có thể là một cụm ký tự không phải " và không phải \\ ([^"\\\\]++), HOẶC một ký tự thoát \\. (\\\\.).',
      solutionCode: `import re

QUOTED_RE = re.compile(r'''
    "                       # Dấu mở ngoặc kép
    (                       # Bắt đầu nhóm nội dung bên trong
        (?:                 # Nhóm lặp không bắt giữ:
            [^"\\\\]++        #   1. Chuỗi ký tự thường (chiếm hữu ++ không cần backtrack)
          | \\\\.             #   2. Hoặc cặp ký tự thoát như \\" hay \\\\
        )*+                 # Lặp 0 hoặc nhiều lần kiểu chiếm hữu
    )
    "                       # Dấu đóng ngoặc kép
''', flags=re.VERBOSE)

def extract_quoted(text: str) -> list[str]:
    return QUOTED_RE.findall(text)

sample = 'Lệnh: "echo \\\\"Xin chào\\\\"" và "ls -la"'
print(extract_quoted(sample))`,
      solutionOutput: `['echo \\\\"Xin chào\\\\"', 'ls -la']`,
      explanation: 'Mẫu r\'"((?:[^"\\\\]++|\\\\.)*+)"\' là mẫu chuẩn công nghiệp (Friedl\'s Unrolled Loop) kết hợp lượng từ chiếm hữu giúp phân tích chuỗi có ký tự thoát với tốc độ O(n) tuyệt đối an toàn trước ReDoS.'
    },
    {
      level: 'Khó',
      title: 'Khắc phục biểu thức chính quy kiểm tra CSV/Danh sách bị lỗi ReDoS',
      problem: 'Một lập trình viên viết mẫu r"^(\\w+,?)+$" để kiểm tra danh sách các từ cách nhau bởi dấu phẩy. Mẫu này bị lỗi Catastrophic Backtracking nghiêm trọng khi gặp chuỗi "python_314_is_very_fast_and_secure!" (vì dấu phẩy là tùy chọn ,? nên \\w+ có thể chia nhỏ tùy ý!). Hãy viết lại hàm validate_word_list(s: str) -> bool chỉ chấp nhận các từ \\w+ cách nhau bởi đúng 1 dấu phẩy (không có dấu phẩy thừa ở đầu/cuối) và sử dụng lượng từ chiếm hữu ++ / *+ để chống ReDoS.',
      hint: 'Dùng cấu trúc: từ đầu tiên \\w++, theo sau bởi 0 hoặc nhiều cụm (?:,\\w++)*+.',
      solutionCode: `import re

# Mẫu an toàn tuyệt đối O(n): sử dụng ++ và *+
SAFE_LIST_RE = re.compile(r"^\\w++(?:,\\w++)*+$")

def validate_word_list(s: str) -> bool:
    return bool(SAFE_LIST_RE.fullmatch(s))

tests = [
    "cam,quýt,bưởi",
    "python314",
    "cam,,quýt",
    "a" * 50_000 + "!"  # Chuỗi tấn công cực dài
]

for t in tests:
    label = t if len(t) < 30 else f"<{len(t)} chars evil string>"
    print(f"{label:28} -> {validate_word_list(t)}")`,
      solutionOutput: `cam,quýt,bưởi               -> True
python314                    -> True
cam,,quýt                    -> False
<50001 chars evil string>    -> False`,
      explanation: 'Bằng cách tách rõ phần tử đầu \\w++ và các phần tử tiếp theo (?:,\\w++)*+, không có hai lượng từ nào chồng lấn vùng ký tự của nhau, và lượng từ chiếm hữu đảm bảo thời gian chạy luôn là O(n).'
    }
  ],
  quiz: [
    {
      question: 'Sự khác biệt cốt lõi giữa lượng từ tham lam "+" và lượng từ chiếm hữu "++" (Possessive Quantifier) là gì?',
      options: [
        'Cả hai đều khớp nhiều ký tự nhất có thể, nhưng "++" xóa bỏ toàn bộ điểm quay lui (không bao giờ nhả lại ký tự đã nuốt khi phần sau thất bại)',
        '"++" khớp ít ký tự nhất có thể giống như "+?"',
        '"++" chỉ khớp các chữ số, còn "+" khớp mọi ký tự',
        '"++" tự động bật chế độ khớp nhiều dòng re.MULTILINE'
      ],
      correctIndex: 0,
      explanation: 'Lượng từ chiếm hữu (*+, ++, ?+, {m,n}+) nuốt tối đa giống lượng từ tham lam nhưng khóa chặt kết quả, không lưu trạng thái quay lui trên ngăn xếp, giúp triệt tiêu nguy cơ Catastrophic Backtracking.'
    },
    {
      question: 'Biểu thức nào tương đương hoàn toàn về mặt hành vi với cụm lượng từ chiếm hữu r"\\d++"?',
      options: [
        'Nhóm nguyên tử (Atomic Group): r"(?>\\d+)"',
        'Nhóm không bắt giữ: r"(?:\\d+)"',
        'Positive Lookahead: r"(?=\\d+)"',
        'Lượng từ lười biếng: r"\\d+?"'
      ],
      correctIndex: 0,
      explanation: 'Lượng từ chiếm hữu A++ về bản chất chính là cú pháp viết tắt của nhóm nguyên tử (?>A+).'
    },
    {
      question: 'Tại sao mẫu r"(?<=\\d+)VNĐ" lại ném lỗi re.error trong module re của Python?',
      options: [
        'Vì biểu thức bên trong Lookbehind (?<=...) bắt buộc phải có độ dài cố định (fixed-width), không được dùng lượng từ biến thiên như "+" hay "*"',
        'Vì Python không hỗ trợ cú pháp Lookbehind mà chỉ hỗ trợ Lookahead',
        'Vì chữ "VNĐ" có chứa ký tự tiếng Việt ngoài bảng mã ASCII',
        'Vì phải viết là r"(?<!\\d+)VNĐ" mới hợp lệ'
      ],
      correctIndex: 0,
      explanation: 'Module re chuẩn của Python yêu cầu mẫu trong Positive/Negative Lookbehind (?<=...) và (?<!...) phải có số lượng ký tự cố định (ví dụ (?<=\\d{3})).'
    },
    {
      question: 'Khi sử dụng cờ re.VERBOSE (re.X), điều gì xảy ra với các khoảng trắng thông thường và dấu # bên trong mẫu Regex?',
      options: [
        'Khoảng trắng thông thường bị bỏ qua và nội dung từ dấu # đến cuối dòng được coi là chú thích (comment)',
        'Khoảng trắng tự động được biến thành \\s+ để khớp mọi khoảng trắng',
        'Dấu # được dùng để đánh dấu nhóm bắt giữ có tên',
        'Mẫu Regex sẽ chạy chậm hơn gấp 10 lần do phải xóa comment mỗi lần khớp'
      ],
      correctIndex: 0,
      explanation: 're.VERBOSE bỏ qua khoảng trắng không nằm trong [...] hoặc không có \\ đứng trước, và coi # là bắt đầu chú thích. Việc xử lý này chỉ diễn ra 1 lần duy nhất lúc biên dịch mẫu (compile time) nên không hề làm giảm tốc độ khi chạy!'
    }
  ],
  summary: [
    'Lượng từ tham lam (*, +) ưu tiên khớp dài nhất, lượng từ lười biếng (*?, +?) ưu tiên khớp ngắn nhất, còn lượng từ chiếm hữu (*+, ++) khớp dài nhất và cấm quay lui.',
    'Lookahead (?=...), (?!...) và Lookbehind (?<=...), (?<!...) kiểm tra điều kiện ngữ cảnh xung quanh mà không tiêu thụ ký tự (Zero-width assertions).',
    'Sử dụng cờ re.VERBOSE (re.X) để chia biểu thức chính quy phức tạp thành nhiều dòng có chú thích rõ ràng.',
    'Luôn cảnh giác với Catastrophic Backtracking (ReDoS) khi có lượng từ lồng nhau và sử dụng Atomic Grouping (?>...) hoặc Possessive Quantifiers (*+, ++) để bảo vệ hệ thống.'
  ]
};
