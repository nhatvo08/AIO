export default {
  id: 'p4-02',
  partId: 'part-4',
  partTitle: 'Phần 4 – Unicode, bytes và Mã hóa (Nâng cao)',
  number: '4.2',
  title: 'Bộ xử lý lỗi mã hóa (Error Handlers) và Module unicodedata',
  subtitle: 'Kiểm soát ngoại lệ mã hóa với 7 chế độ errors và làm chủ cơ sở dữ liệu chuẩn hóa Unicode',
  level: 'Nâng cao',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,
  objectives: [
    'Phân biệt nguyên nhân gây ra UnicodeEncodeError và UnicodeDecodeError trong thực tế.',
    'Sử dụng thành thạo 7 bộ xử lý lỗi mã hóa chuẩn: strict, ignore, replace, backslashreplace, xmlcharrefreplace, namereplace và surrogateescape.',
    'Khai thác module unicodedata để tra cứu thuộc tính ký tự: name(), lookup(), category(), combining().',
    'Hiểu sâu và áp dụng đúng 4 chuẩn chuẩn hóa Unicode: NFC, NFD, NFKC và NFKD.'
  ],
  intuition: {
    title: 'Người phiên dịch trước những từ "bất khả dịch" và Chữ viết đồng quy',
    metaphor: 'Khi một phiên dịch viên gặp một từ tiếng lóng hoặc chữ viết nhòe mực không có trong từ điển mục tiêu, họ có nhiều chiến lược xử lý: ngừng dịch và báo cáo lỗi ngay lập tức (strict), lờ đi như chưa từng thấy (ignore), điền dấu chấm hỏi [?] thay thế (replace), ghi chú mã số gốc của từ đó (backslashreplace / xmlcharrefreplace), hoặc ghi tên mô tả của ký tự (namereplace). Mặt khác, ngay trong cùng một ngôn ngữ, chữ "Ω" (Ohm trong vật lý) và chữ "Ω" (Omega trong bảng chữ cái Hy Lạp), hay chữ "ﬁ" (dính liền) và hai chữ "f" + "i" rời nhau cần một "Ủy ban Chuẩn hóa" (unicodedata.normalize) để đưa về cùng một mặt bằng so sánh!',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;font-family:monospace;font-size:12.5px;padding:14px;background:rgba(15,23,42,0.6);border:1px solid #334155;border-radius:12px;">
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-top:3px solid #f59e0b;">
          <div style="color:#fbbf24;font-weight:bold;margin-bottom:6px;">7 Chiến lược Error Handlers (errors=...)</div>
          <div style="color:#e2e8f0;line-height:1.6;">
            • <b>strict</b>: Ném lỗi UnicodeError (Mặc định)<br/>
            • <b>ignore</b>: Bỏ qua ký tự/byte lỗi<br/>
            • <b>replace</b>: Thay bằng <code>?</code> hoặc <code> (U+FFFD)</code><br/>
            • <b>backslashreplace</b>: Thay bằng <code>\\xNN, \\uNNNN</code><br/>
            • <b>xmlcharrefreplace</b>: Thay bằng <code>&amp;#NNNN;</code><br/>
            • <b>namereplace</b>: Thay bằng <code>\\N{NAME}</code><br/>
            • <b>surrogateescape</b>: Bảo toàn byte lỗi vào U+DC80..U+DCFF
          </div>
        </div>
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-top:3px solid #a855f7;">
          <div style="color:#c084fc;font-weight:bold;margin-bottom:6px;">4 Chuẩn hóa unicodedata.normalize()</div>
          <div style="color:#e2e8f0;line-height:1.6;">
            • <b>NFD</b> (Tách chuẩn): <code>"ế"</code> ➔ <code>"e" + "ˆ" + "´"</code><br/>
            • <b>NFC</b> (Gộp chuẩn): <code>"e" + "ˆ" + "´"</code> ➔ <code>"ế"</code><br/>
            • <b>NFKD</b> (Tách tương thích): <code>"ﬁ"</code> ➔ <code>"f" + "i"</code>, <code>"²"</code> ➔ <code>"2"</code><br/>
            • <b>NFKC</b> (Gộp tương thích): Chuẩn hóa tìm kiếm & bảo mật định danh
          </div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Các bộ xử lý lỗi mã hóa (Error Handlers)',
      badge: 'Error Handling',
      content: `
        <p>Hai ngoại lệ phổ biến nhất khi đi qua ranh giới <code>str ↔ bytes</code> là:</p>
        <ul>
          <li><code>UnicodeEncodeError</code>: Xảy ra khi <code>str.encode(enc)</code> gặp ký tự không tồn tại trong bảng mã đích (ví dụ mã hóa chữ <code>"Việt 🐍"</code> sang <code>'ascii'</code> hoặc <code>'latin-1'</code>).</li>
          <li><code>UnicodeDecodeError</code>: Xảy ra khi <code>bytes.decode(enc)</code> gặp chuỗi byte không hợp lệ theo quy tắc của bảng mã nguồn (ví dụ giải mã byte <code>0xFF</code> bằng <code>'utf-8'</code>).</li>
        </ul>
        <p>Tham số <code>errors</code> trong <code>encode()</code>, <code>decode()</code> và <code>open()</code> cho phép chỉ định 1 trong <strong>7 bộ xử lý lỗi dựng sẵn</strong>:</p>
        <ul>
          <li><code>'strict'</code> (mặc định): Ném ngoại lệ ngay khi gặp lỗi.</li>
          <li><code>'ignore'</code>: Âm thầm xóa bỏ ký tự hoặc byte không hợp lệ.</li>
          <li><code>'replace'</code>: Thay thế bằng <code>b'?'</code> (khi encode) hoặc ký tự <code>''</code> (<code>U+FFFD REPLACEMENT CHARACTER</code> khi decode).</li>
          <li><code>'backslashreplace'</code>: Thay thế bằng chuỗi thoát Python (<code>\\xNN</code>, <code>\\uNNNN</code>, <code>\\UNNNNNNNN</code>) — hoạt động cho <strong>cả encode lẫn decode</strong>.</li>
          <li><code>'xmlcharrefreplace'</code> (chỉ encode): Thay bằng thực thể số XML/HTML như <code>&amp;#7879;</code>.</li>
          <li><code>'namereplace'</code> (chỉ encode): Thay bằng <code>\\N{UNICODE CHARACTER NAME}</code>.</li>
          <li><code>'surrogateescape'</code> (PEP 383): Khi decode gặp byte lẻ không hợp lệ <code>0x80..0xFF</code>, nó cất tạm vào vùng Low Surrogate <code>U+DC80..U+DCFF</code>; khi encode ngược lại với <code>'surrogateescape'</code>, nó trả về <strong>chính xác từng byte gốc 100% không mất mát</strong>!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Trải nghiệm thực tế cả 7 chế độ Error Handlers',
          code: `text = "Giá: 50€ 🐍"

for mode in ["ignore", "replace", "backslashreplace", "xmlcharrefreplace", "namereplace"]:
    encoded = text.encode("ascii", errors=mode)
    print(f"encode({mode:18}) -> {encoded}")

# Giải mã luồng byte bị hỏng (chứa byte 0x80 và 0xFE không hợp lệ trong UTF-8)
corrupted = b"Log: \\x80\\xfe OK"
print("decode(replace)         ->", repr(corrupted.decode("utf-8", errors="replace")))
print("decode(backslashreplace)->", repr(corrupted.decode("utf-8", errors="backslashreplace")))

# Khôi phục nguyên vẹn 100% byte gốc nhờ surrogateescape (Round-trip lossless)
s_escaped = corrupted.decode("utf-8", errors="surrogateescape")
restored  = s_escaped.encode("utf-8", errors="surrogateescape")
print("surrogateescape khôi phục đúng bản gốc?", restored == corrupted)`,
          output: `encode(ignore            ) -> b'Gi: 50 '
encode(replace           ) -> b'Gi?: 50? ?'
encode(backslashreplace  ) -> b'Gi\\xe1: 50\\u20ac \\U0001f40d'
encode(xmlcharrefreplace ) -> b'Gi&#225;: 50&#8364; &#128013;'
encode(namereplace       ) -> b'Gi\\N{LATIN SMALL LETTER A WITH ACUTE}: 50\\N{EURO SIGN} \\N{SNAKE}'
decode(replace)         -> 'Log:  OK'
decode(backslashreplace)-> 'Log: \\\\x80\\\\xfe OK'
surrogateescape khôi phục đúng bản gốc? True`,
          annotations: [
            { line: 4, text: 'xmlcharrefreplace cực kỳ hữu ích khi xuất văn bản đa ngôn ngữ ra tài liệu HTML/XML chỉ hỗ trợ ASCII.' },
            { line: 13, text: 'surrogateescape ánh xạ byte 0x80 -> U+DC80 và 0xFE -> U+DCFE để bảo toàn dữ liệu nhị phân qua tầng xử lý chuỗi.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Tra cứu cơ sở dữ liệu ký tự với module unicodedata',
      badge: 'unicodedata',
      content: `
        <p>Thư viện chuẩn <code>unicodedata</code> cung cấp quyền truy cập trực tiếp vào <strong>Unicode Character Database (UCD)</strong> (trong Python 3.14 là chuẩn Unicode 16.0.0):</p>
        <ul>
          <li><code>unicodedata.name(chr[, default])</code>: Trả về tên chính thức viết hoa của ký tự trong bảng chuẩn Unicode.</li>
          <li><code>unicodedata.lookup(name)</code>: Tìm ký tự từ tên chuẩn (tương đương cú pháp chuỗi <code>"\\N{NAME}"</code> tại thời điểm dịch).</li>
          <li><code>unicodedata.category(chr)</code>: Trả về mã phân loại gồm 2 chữ cái, ví dụ:
            <code>'Lu'</code> (Letter, uppercase), <code>'Ll'</code> (Letter, lowercase), <code>'Nd'</code> (Number, decimal digit), <code>'No'</code> (Number, other - phân số, số La Mã), <code>'Mn'</code> (Mark, nonspacing - dấu thanh/dấu mũ tổ hợp), <code>'Po'</code> (Punctuation, other), <code>'Sc'</code> (Symbol, currency), <code>'So'</code> (Symbol, other - bao gồm Emoji).</li>
          <li><code>unicodedata.combining(chr)</code>: Trả về lớp tổ hợp (Canonical Combining Class — số nguyên <code>> 0</code> nếu là dấu tổ hợp đi kèm ký tự gốc, và <code>0</code> nếu là ký tự độc lập).</li>
          <li><code>unicodedata.numeric(chr[, default])</code>: Trả về giá trị số thực của mọi ký tự mang ý nghĩa con số (kể cả <code>'¾'</code>, chữ Hán <code>'万'</code> hay số La Mã <code>'Ⅷ'</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Giải phẫu thuộc tính ký tự bằng module unicodedata',
          code: `import unicodedata

samples = ['Đ', '\\u0301', '¾', '₫', '🐍']
for ch in samples:
    name = unicodedata.name(ch, "UNKNOWN")
    cat  = unicodedata.category(ch)
    comb = unicodedata.combining(ch)
    num  = unicodedata.numeric(ch, None)
    print(f"{ch!r:5} | Cat: {cat} | Comb: {comb:3d} | Num: {str(num):4} | Name: {name}")

# Tìm ký tự theo tên hoặc cú pháp \\N{...}
print("Lookup:", unicodedata.lookup("VIET NAM DONG SIGN") == "\\N{VIET NAM DONG SIGN}")`,
          output: `'Đ'   | Cat: Lu | Comb:   0 | Num: None | Name: LATIN CAPITAL LETTER D WITH STROKE
'́'    | Cat: Mn | Comb: 230 | Num: None | Name: COMBINING ACUTE ACCENT
'¾'   | Cat: No | Comb:   0 | Num: 0.75 | Name: VULGAR FRACTION THREE QUARTERS
'₫'   | Cat: Sc | Comb:   0 | Num: None | Name: VIET NAM DONG SIGN
'🐍'  | Cat: So | Comb:   0 | Num: None | Name: SNAKE
Lookup: True`,
          annotations: [
            { line: 3, text: '\\u0301 là dấu sắc tổ hợp (COMBINING ACUTE ACCENT) có Category là Mn (Mark, nonspacing) và lớp tổ hợp 230.' },
            { line: 8, text: 'unicodedata.numeric("¾") trả về số thực 0.75 chính xác.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Bốn chuẩn chuẩn hóa NFC, NFD, NFKC và NFKD',
      badge: 'Normalization',
      content: `
        <p>Unicode phân biệt hai cấp độ tương đương giữa các chuỗi ký tự:</p>
        <ol>
          <li><strong>Tương đương chính tắc (Canonical Equivalence — NFC / NFD):</strong> Hai chuỗi có hình ảnh hiển thị và ý nghĩa ngữ nghĩa giống hệt nhau (ví dụ chữ <code>'ệ'</code> dựng sẵn 1 Code Point <code>U+1EC7</code> so với tổ hợp 3 Code Point <code>'e' + U+0302 (mũ) + U+0323 (nặng)</code>).
            <ul>
              <li><strong>NFD (Canonical Decomposition):</strong> Tách rời ký tự thành ký tự gốc + các dấu tổ hợp theo thứ tự chuẩn.</li>
              <li><strong>NFC (Canonical Composition):</strong> Tách chuẩn NFD trước, sau đó ghép lại thành ký tự dựng sẵn ngắn gọn nhất. <strong>NFC là chuẩn khuyến nghị của W3C cho Web và lưu trữ dữ liệu.</strong></li>
            </ul>
          </li>
          <li><strong>Tương đương tương thích (Compatibility Equivalence — NFKC / NFKD):</strong> Ngoài việc xử lý dấu tổ hợp, còn biến đổi các biến thể trình bày (font, chỉ số trên/dưới, chữ ghép ligature, ký tự độ rộng toàn phần Fullwidth) về ký tự chuẩn cơ bản:
            <ul>
              <li>Ví dụ: chữ ghép <code>"ﬁ" (U+FB01)</code> ➔ <code>"fi"</code>, số mũ <code>"2⁵"</code> ➔ <code>"25"</code>, số La Mã <code>"Ⅳ"</code> ➔ <code>"IV"</code>, chữ Nhật/Trung Fullwidth <code>"Ｐｙｔｈｏｎ"</code> ➔ <code>"Python"</code>.</li>
              <li><strong>NFKC / NFKD</strong> cực kỳ quan trọng khi xây dựng công cụ tìm kiếm (Search Indexing) và kiểm tra chống giả mạo tên người dùng (Identifier Spoofing).</li>
            </ul>
          </li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'So sánh thực tế NFC, NFD, NFKC và NFKD',
          code: `import unicodedata

# 1. Tương đương chính tắc (NFC vs NFD)
s_composed = "\\u1ec7"              # 'ệ' (1 Code Point)
s_decomposed = "e\\u0323\\u0302"     # 'e' + dấu nặng + dấu mũ (3 Code Points)
print("Bằng nhau trực tiếp?", s_composed == s_decomposed)
print("Bằng nhau sau NFC?  ", unicodedata.normalize("NFC", s_composed) == unicodedata.normalize("NFC", s_decomposed))

# 2. Tương đương tương thích (NFKC vs NFC) trên văn bản trình bày đặc biệt
fancy = "Ｐｙｔｈｏｎ ﬃ 2⁵ №1"
print("NFC giữ nguyên :", repr(unicodedata.normalize("NFC", fancy)))
print("NFKC chuẩn hóa :", repr(unicodedata.normalize("NFKC", fancy)))
print("Đã chuẩn NFKC? :", unicodedata.is_normalized("NFKC", fancy))`,
          output: `Bằng nhau trực tiếp? False
Bằng nhau sau NFC?   True
NFC giữ nguyên : 'Ｐｙｔｈｏｎ ﬃ 2⁵ №1'
NFKC chuẩn hóa : 'Python ffi 25 No1'
Đã chuẩn NFKC? : False`,
          annotations: [
            { line: 5, text: 'Dù dấu nặng và dấu mũ viết ngược thứ tự (\\u0323 rồi \\u0302), thuật toán chuẩn hóa vẫn sắp xếp Canonical Ordering trước khi gộp về đúng U+1EC7.' },
            { line: 12, text: 'NFKC chuyển chữ Fullwidth "Ｐｙｔｈｏｎ" về ASCII "Python", chữ ghép "ﬃ" về "ffi", "⁵" về "5" và "№" về "No".' }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Lỗ hổng bảo mật khi dùng errors="ignore" trước bước kiểm tra tường lửa',
        content: 'Nếu bạn lọc chuỗi cấm (như "<script>") TRƯỚC khi gọi .encode("ascii", errors="ignore"), kẻ tấn công có thể chèn ký tự Unicode vô hình vào giữa: "<scr🐍ipt>". Bộ lọc không phát hiện ra, sau đó errors="ignore" xóa mất 🐍 và tái tạo thành "<script>" hoàn chỉnh! Luôn chuẩn hóa và giải mã/mã hóa TRƯỚC khi validate.'
      },
      {
        title: 'Lạm dụng NFKC làm thay đổi ngữ nghĩa toán học hoặc đơn vị',
        content: 'NFKC biến "2⁵" thành "25" và phân số "1⁄4" thành "1/4" (nếu ghép sát với số trước như "11⁄4" sẽ biến thành "11/4"!). Chỉ dùng NFKC cho mục đích lập chỉ mục tìm kiếm hoặc kiểm tra định danh, còn khi lưu trữ văn bản gốc của người dùng hãy luôn ưu tiên NFC.'
      }
    ],
    tips: [
      {
        title: 'Kiểm tra nhanh bằng unicodedata.is_normalized() trước khi chuẩn hóa',
        content: 'Hàm unicodedata.is_normalized("NFC", s) kiểm tra cực nhanh xem chuỗi đã ở chuẩn NFC chưa mà không cần cấp phát chuỗi mới, rất hữu ích trong các vòng lặp xử lý hàng triệu bản ghi.'
      },
      {
        title: 'Tự tạo Error Handler riêng với codecs.register_error()',
        content: 'Nếu 7 chế độ chuẩn chưa đủ, bạn có thể đăng ký hàm xử lý riêng nhận vào đối tượng UnicodeError và trả về tuple (replacement_str_or_bytes, next_index) thông qua codecs.register_error("my_handler", func).'
      }
    ],
    deepDive: {
      title: 'Cách Python thực thi định danh biến theo chuẩn NFKC (PEP 3131)',
      content: `
        <p>Bạn có biết trình thông dịch Python cho phép đặt tên biến bằng chữ cái Unicode (như <code>tên_biến = 10</code>), nhưng bên dưới nó tự động áp dụng chuẩn <strong>NFKC</strong> cho mọi tên biến trong mã nguồn?</p>
        <p>Điều đó có nghĩa là nếu bạn đặt biến bằng chữ Fullwidth <code>ｐｙ = 42</code>, Python sẽ chuẩn hóa NFKC tên định danh đó thành <code>py</code> — bạn có thể gọi <code>print(py)</code> và nhận được <code>42</code>! Đây là lý do tiêu chuẩn bảo mật Unicode (UTS #39) luôn yêu cầu áp dụng NFKC cho tên tài khoản và định danh hệ thống.</p>
      `
    },
    newIn314: null
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Xuất chuỗi đa ngôn ngữ sang ASCII HTML an toàn',
      problem: 'Viết hàm to_ascii_html(text: str) -> str chuyển đổi một chuỗi chứa tiếng Việt và Emoji thành chuỗi chỉ gồm các ký tự ASCII, trong đó mọi ký tự ngoài bảng ASCII đều được chuyển thành mã thực thể số HTML (dạng &#NNNN;).',
      hint: 'Kết hợp .encode("ascii", errors="xmlcharrefreplace") rồi .decode("ascii").',
      solutionCode: `def to_ascii_html(text: str) -> str:
    return text.encode("ascii", errors="xmlcharrefreplace").decode("ascii")

print(to_ascii_html("Phở Hà Nội 🍜"))`,
      solutionOutput: `Ph&#7903; H&#224; N&#7897;i &#127836;`,
      explanation: 'Chế độ errors="xmlcharrefreplace" tự động thay thế mọi Code Point > 127 bằng thực thể thập phân &#codepoint; chuẩn XML/HTML.'
    },
    {
      level: 'Vừa',
      title: 'Bộ lọc phân tích ký tự theo Category của unicodedata',
      problem: 'Viết hàm classify_chars(s: str) -> dict[str, list[str]] phân loại các ký tự (bỏ qua khoảng trắng) trong chuỗi sau khi đã chuẩn hóa NFD thành 3 nhóm: "base_letters" (Category bắt đầu bằng "L"), "accents" (Category == "Mn" — dấu tổ hợp), và "others" (các loại còn lại). Thử với chuỗi "Phở 24!".',
      hint: 'Chuẩn hóa NFD trước bằng unicodedata.normalize("NFD", s), sau đó kiểm tra unicodedata.category(ch).',
      solutionCode: `import unicodedata

def classify_chars(s: str) -> dict[str, list[str]]:
    res = {"base_letters": [], "accents": [], "others": []}
    for ch in unicodedata.normalize("NFD", s):
        if ch.isspace():
            continue
        cat = unicodedata.category(ch)
        if cat.startswith("L"):
            res["base_letters"].append(ch)
        elif cat == "Mn":
            res["accents"].append(unicodedata.name(ch))
        else:
            res["others"].append(ch)
    return res

info = classify_chars("Phở 24!")
for k, v in info.items():
    print(f"{k:12}: {v}")`,
      solutionOutput: `base_letters: ['P', 'h', 'o']
accents     : ['COMBINING HORN', 'COMBINING HOOK ABOVE']
others      : ['2', '4', '!']`,
      explanation: 'Khi tách NFD, chữ "ở" được phân rã thành chữ gốc "o" (Ll), dấu móc râu COMBINING HORN (U+031B, Mn) và dấu hỏi COMBINING HOOK ABOVE (U+0309, Mn).'
    },
    {
      level: 'Khó',
      title: 'Phát hiện và khử ký tự giả mạo định danh với NFKC',
      problem: 'Kẻ gian đăng ký tên tài khoản bằng các ký tự trông giống chữ cái thường như "ａｄｍｉｎ" (Fullwidth) hoặc "ﬁnance" (chữ ghép ligature) để qua mặt bộ lọc trùng tên. Viết hàm sanitize_username(raw_name: str) -> tuple[str, bool] trả về (tên_chuẩn_hóa_NFKC_in_thường, có_bị_biến_đổi_compatibility_không). Một tên được coi là có biến đổi compatibility nếu NFC(raw_name) != NFKC(raw_name).',
      hint: 'So sánh unicodedata.normalize("NFC", raw_name) với unicodedata.normalize("NFKC", raw_name).',
      solutionCode: `import unicodedata

def sanitize_username(raw_name: str) -> tuple[str, bool]:
    nfc = unicodedata.normalize("NFC", raw_name)
    nfkc = unicodedata.normalize("NFKC", raw_name)
    had_compat_chars = (nfc != nfkc)
    return nfkc.casefold(), had_compat_chars

for candidate in ["Admin", "ａｄｍｉｎ", "ﬁnance_01", "nguyễn_văn_a"]:
    clean, suspicious = sanitize_username(candidate)
    print(f"{candidate:12} -> clean={clean!r:14} | compat_spoof={suspicious}")`,
      solutionOutput: `Admin        -> clean='admin'        | compat_spoof=False
ａｄｍｉｎ       -> clean='admin'        | compat_spoof=True
ﬁnance_01    -> clean='finance_01'   | compat_spoof=True
nguyễn_văn_a -> clean='nguyễn_văn_a' | compat_spoof=False`,
      explanation: 'Các ký tự tiếng Việt chuẩn không thay đổi giữa NFC và NFKC (compat_spoof=False), trong khi các ký tự Fullwidth hoặc Ligature bị NFKC biến đổi về ASCII nên bị phát hiện ngay lập tức.'
    }
  ],
  quiz: [
    {
      question: 'Bộ xử lý lỗi (error handler) nào cho phép giải mã một luồng byte chứa các byte không hợp lệ sang str và sau đó mã hóa ngược lại về chính xác 100% các byte ban đầu mà không mất dữ liệu?',
      options: [
        'surrogateescape',
        'backslashreplace',
        'replace',
        'ignore'
      ],
      correctIndex: 0,
      explanation: 'Theo PEP 383, surrogateescape ánh xạ các byte không hợp lệ (0x80..0xFF) vào vùng mã U+DC80..U+DCFF khi decode, và chuyển ngược lại về đúng các byte gốc đó khi encode với surrogateescape.'
    },
    {
      question: 'Khi gọi "Việt".encode("ascii", errors="xmlcharrefreplace"), kết quả nhận được là gì?',
      options: [
        'b"Vi&#7879;t"',
        'b"Vi\\u1ec7t"',
        'b"Vi?t"',
        'Ném lỗi vì xmlcharrefreplace chỉ dùng cho decode()'
      ],
      correctIndex: 0,
      explanation: 'Chữ "ệ" có Code Point thập phân là 7879 (0x1EC7), nên xmlcharrefreplace thay thế nó bằng thực thể số XML/HTML b"&#7879;".'
    },
    {
      question: 'Dạng chuẩn hóa nào trong unicodedata.normalize() sẽ biến chữ ghép "ﬁ" (U+FB01) thành 2 ký tự "fi" và biến chữ "ệ" thành 1 ký tự dựng sẵn duy nhất?',
      options: [
        'NFKC',
        'NFC',
        'NFD',
        'NFKD'
      ],
      correctIndex: 0,
      explanation: 'Chữ "K" (Compatibility) trong NFKC giúp phân rã ký tự tương thích "ﬁ" thành "f" + "i", còn chữ "C" (Composition) giúp gộp các dấu tổ hợp của chữ "ệ" thành 1 Code Point dựng sẵn U+1EC7.'
    },
    {
      question: 'Hàm unicodedata.category(ch) trả về giá trị "Mn" cho biết ký tự ch thuộc nhóm nào?',
      options: [
        'Dấu tổ hợp không chiếm độ rộng ngang (Mark, nonspacing — như dấu sắc, huyền, hỏi, ngã, nặng rời)',
        'Chữ số thập phân (Number, decimal digit)',
        'Chữ cái viết thường (Letter, lowercase)',
        'Ký hiệu tiền tệ (Symbol, currency)'
      ],
      correctIndex: 0,
      explanation: 'Mã "Mn" là viết tắt của "Mark, nonspacing" — tức các dấu phụ/dấu thanh tổ hợp bám vào ký tự đứng trước nó.'
    }
  ],
  summary: [
    'Sử dụng tham số errors trong encode()/decode() để kiểm soát lỗi mã hóa: strict, ignore, replace, backslashreplace, xmlcharrefreplace, namereplace, surrogateescape.',
    'surrogateescape là công cụ chuẩn để xử lý tên file hệ điều hành hoặc dữ liệu nhị phân pha lẫn văn bản mà không làm hỏng byte gốc.',
    'Module unicodedata cung cấp siêu dữ liệu chuẩn cho mọi ký tự thông qua name(), lookup(), category(), combining() và numeric().',
    'Luôn dùng NFC khi lưu trữ/hiển thị văn bản chuẩn, NFD khi cần tách riêng dấu thanh khỏi chữ gốc, và NFKC khi chuẩn hóa tìm kiếm hoặc định danh bảo mật.'
  ]
};
