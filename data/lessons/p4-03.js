export default {
  id: 'p4-03',
  partId: 'part-4',
  partTitle: 'Phần 4 – Unicode, bytes và Mã hóa (Nâng cao)',
  number: '4.3',
  title: 'Tiếng Việt và Các cạm bẫy Unicode thực chiến',
  subtitle: 'Giải quyết triệt để lỗi NFC/NFD tiếng Việt, thuật toán bỏ dấu tạo URL Slug, Grapheme Cluster, casefold() và open(encoding="utf-8")',
  level: 'Nâng cao',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,
  objectives: [
    'Hiểu rõ vì sao hai chuỗi tiếng Việt hiển thị giống hệt nhau trên màn hình nhưng phép so sánh == trả về False và len() khác nhau.',
    'Chuẩn hóa tiếng Việt về chuẩn NFC và xây dựng thuật toán bỏ dấu tiếng Việt chuẩn xác để tạo URL Slug.',
    'Phân biệt Code Point và Grapheme Cluster qua các trường hợp cờ quốc gia "🇻🇳" (Regional Indicators) và Emoji gia đình nối bằng ZWJ (\\u200d).',
    'Sử dụng str.casefold() thay cho lower() khi so sánh không phân biệt hoa thường đa ngôn ngữ, và luôn chỉ định encoding="utf-8" khi mở file trên Windows.'
  ],
  intuition: {
    title: 'Ảo ảnh thị giác của Chữ viết: Cùng một diện mạo, khác bộ khung xương',
    metaphor: 'Hãy nhìn chữ "Hoà" trên màn hình: mắt người chỉ thấy 3 chữ cái. Nhưng bên dưới lớp kính hiển thị, một bộ gõ (như Unikey kiểu Unicode dựng sẵn - NFC) lưu nó thành 3 viên gạch nguyên khối ["H", "o", "à"]. Trong khi đó, dữ liệu copy từ PDF, macOS Finder hoặc bộ gõ tổ hợp (NFD) lại lưu thành 4 viên gạch rời ["H", "o", "a", "̀" (dấu huyền rời U+0300)]! Tương tự, lá cờ "🇻🇳" trông như 1 biểu tượng nhưng thực chất là 2 chữ cái vùng V + N ghép lại, hay gia đình "👨‍👩‍👧" là 3 người nối nhau bằng mối hàn vô hình ZWJ. Hiểu được "bộ khung xương" này là chìa khóa để phần mềm của bạn không bao giờ gặp những lỗi ma quái với tiếng Việt và Emoji!',
    visualHtml: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-family:monospace;font-size:12.5px;padding:14px;background:rgba(15,23,42,0.6);border:1px solid #334155;border-radius:12px;">
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-left:4px solid #ef4444;">
          <div style="color:#f87171;font-weight:bold;margin-bottom:6px;">Cạm bẫy NFC vs NFD Tiếng Việt</div>
          <div style="color:#f8fafc;">NFC: <b>"Hoà"</b> = <code>'H' + 'o' + 'à' (U+00E0)</code> ➔ len = <b>3</b></div>
          <div style="color:#f8fafc;margin-top:4px;">NFD: <b>"Hoà"</b> = <code>'H' + 'o' + 'a' + '̀' (U+0300)</code> ➔ len = <b>4</b></div>
          <div style="color:#fca5a5;margin-top:6px;">⚠️ Hiển thị giống hệt nhau nhưng <code>s_nfc == s_nfd</code> là <b>False</b>!</div>
        </div>
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-left:4px solid #10b981;">
          <div style="color:#34d399;font-weight:bold;margin-bottom:6px;">Grapheme Cluster vs Code Point</div>
          <div style="color:#f8fafc;">🇻🇳 = <code>U+1F1FB (🇻) + U+1F1F3 (🇳)</code> ➔ len = <b>2</b></div>
          <div style="color:#f8fafc;margin-top:4px;">👨‍👩‍👧 = <code>👨 + ZWJ + 👩 + ZWJ + 👧</code> ➔ len = <b>5</b></div>
          <div style="color:#6ee7b7;margin-top:6px;">✅ 1 ký tự hiển thị (Grapheme) có thể gồm nhiều Code Point!</div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Dựng sẵn (NFC) vs Tổ hợp (NFD) trong Tiếng Việt',
      badge: 'Tiếng Việt cốt lõi',
      content: `
        <p>Trong thực tế phát triển phần mềm tại Việt Nam, đây là lỗi gây đau đầu nhất khi tìm kiếm cơ sở dữ liệu hoặc so khớp chuỗi:</p>
        <ul>
          <li><strong>Unicode dựng sẵn (Precomposed — NFC):</strong> Mỗi chữ cái có dấu là một Code Point đơn lẻ (ví dụ <code>'à'</code> là <code>U+00E0</code>, <code>'ệ'</code> là <code>U+1EC7</code>). Chuỗi <code>"Hoà"</code> có 3 Code Point: <code>['H', 'o', 'à']</code>.</li>
          <li><strong>Unicode tổ hợp (Decomposed / Combining — NFD):</strong> Chữ cái gốc đứng trước, theo sau là một hoặc hai <strong>dấu tổ hợp (Combining Marks)</strong> như <code>U+0300</code> (dấu huyền), <code>U+0301</code> (dấu sắc), <code>U+0303</code> (dấu ngã), <code>U+0309</code> (dấu hỏi), <code>U+0323</code> (dấu nặng). Chuỗi <code>"Hoa\\u0300"</code> hoặc <code>"Ho\\u0300a"</code> có tới <strong>4 Code Point</strong>!</li>
          <li><strong>Hệ quả nghiêm trọng:</strong> Trên màn hình trình duyệt hay Terminal, hệ thống dựng chữ (Font Shaping Engine) vẽ cả hai chuỗi giống hệt nhau. Nhưng trong Python, phép so sánh <code>==</code> so sánh từng Code Point theo thứ tự, nên trả về <code>False</code>, <code>len()</code> trả về kết quả khác nhau, và tìm kiếm <code>in</code> hoàn toàn thất bại!</li>
          <li><strong>Giải pháp bắt buộc:</strong> Luôn gọi <code>unicodedata.normalize("NFC", s)</code> cho mọi dữ liệu đầu vào từ form web, file Excel/PDF, hoặc tên file từ macOS trước khi lưu trữ và so sánh.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Chẩn đoán và khắc phục lỗi so sánh chuỗi Tiếng Việt NFC vs NFD',
          code: `import unicodedata

# Chuỗi 1: Unicode dựng sẵn (NFC) - 3 Code Points
s_nfc = "Hoà"
# Chuỗi 2: Unicode tổ hợp (NFD) - 4 Code Points ('H', 'o', 'a', U+0300)
s_nfd = "Hoa\\u0300"
# Chuỗi 3: Đặt dấu huyền vào chữ 'o' rồi mới tới 'a' ("Ho\\u0300a")
s_ho_a = "Ho\\u0300a"

print(f"Hiển thị : s_nfc={s_nfc} | s_nfd={s_nfd} | s_ho_a={s_ho_a}")
print(f"Độ dài   : len(s_nfc)={len(s_nfc)}, len(s_nfd)={len(s_nfd)}, len(s_ho_a)={len(s_ho_a)}")
print(f"Ký tự rời: s_nfc={list(s_nfc)} vs s_nfd={list(s_nfd)}")
print(f"So sánh trực tiếp s_nfc == s_nfd : {s_nfc == s_nfd}")

# Chuẩn hóa về NFC trước khi so sánh
norm_1 = unicodedata.normalize("NFC", s_nfc)
norm_2 = unicodedata.normalize("NFC", s_nfd)
print(f"Sau khi normalize('NFC')         : {norm_1 == norm_2} (len={len(norm_2)})")`,
          output: `Hiển thị : s_nfc=Hoà | s_nfd=Hoà | s_ho_a=Hòa
Độ dài   : len(s_nfc)=3, len(s_nfd)=4, len(s_ho_a)=4
Ký tự rời: s_nfc=['H', 'o', 'à'] vs s_nfd=['H', 'o', 'a', '̀']
So sánh trực tiếp s_nfc == s_nfd : False
Sau khi normalize('NFC')         : True (len=3)`,
          annotations: [
            { line: 6, text: 'Trong NFD, chữ "à" gồm chữ gốc "a" (U+0061) theo sau bởi dấu huyền tổ hợp U+0300.' },
            { line: 13, text: 'Vì list Code Point khác nhau ([H, o, à] vs [H, o, a, ̀]), toán tử == trả về False dù nhìn trên màn hình giống hệt nhau!' },
            { line: 17, text: 'unicodedata.normalize("NFC", ...) gộp "a" + "\\u0300" về lại 1 Code Point duy nhất "à" (U+00E0).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Thuật toán bỏ dấu Tiếng Việt và tạo URL Slug chuẩn',
      badge: 'Thuật toán Thực chiến',
      content: `
        <p>Làm sao để chuyển câu <code>"Đắk Lắk: Thủ phủ Cà phê Việt Nam!"</code> thành đường dẫn URL chuẩn <code>"dak-lak-thu-phu-ca-phe-viet-nam"</code> mà không cần viết bảng tra thủ công 134 chữ cái tiếng Việt?</p>
        <p>Chúng ta tận dụng chính cơ chế <strong>tách chuẩn NFD</strong> của Unicode qua 4 bước thanh lịch:</p>
        <ol>
          <li><strong>Bước 1:</strong> Tách chuỗi bằng <code>unicodedata.normalize("NFD", text)</code>. Lúc này mọi dấu thanh (sắc, huyền, hỏi, ngã, nặng) và dấu mũ/râu (<code>ă, â, ê, ô, ơ, ư</code>) đều bị tách rời thành các ký tự tổ hợp có <code>unicodedata.combining(c) > 0</code> (hoặc <code>category(c) == 'Mn'</code>).</li>
          <li><strong>Bước 2:</strong> Lọc bỏ toàn bộ các ký tự có <code>unicodedata.combining(c) != 0</code>.</li>
          <li><strong>Bước 3 (Bắt buộc với Tiếng Việt):</strong> Chữ <strong><code>đ</code> (<code>U+0111</code>) và <code>Đ</code> (<code>U+0110</code>)</strong> trong chuẩn Unicode là một chữ cái độc lập có gạch ngang thân (<em>Latin Letter D with Stroke</em>), <strong>KHÔNG phải chữ <code>d</code> ghép với dấu tổ hợp</strong>! Do đó NFD không tách chữ <code>đ/Đ</code>, ta phải thay thế riêng <code>.replace('đ', 'd').replace('Đ', 'D')</code>.</li>
          <li><strong>Bước 4:</strong> Chuyển về chữ thường và thay các cụm ký tự không phải chữ/số bằng dấu gạch ngang <code>-</code> để tạo URL Slug.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Hàm bỏ dấu Tiếng Việt và tạo URL Slug chuẩn SEO',
          code: `import re
import unicodedata

def remove_vietnamese_accents(text: str) -> str:
    # Bước 1: Phân rã NFD để tách rời toàn bộ dấu mũ, dấu râu và dấu thanh
    nfd_text = unicodedata.normalize("NFD", text)
    # Bước 2: Loại bỏ các ký tự dấu tổ hợp (combining class > 0)
    stripped = "".join(ch for ch in nfd_text if not unicodedata.combining(ch))
    # Bước 3: Xử lý riêng chữ đ/Đ vì đây là chữ cái độc lập (U+0111 / U+0110)
    return stripped.replace("đ", "d").replace("Đ", "D")

def slugify_vietnamese(title: str) -> str:
    no_accents = remove_vietnamese_accents(title).casefold()
    # Thay mọi chuỗi ký tự không phải chữ/số ASCII bằng 1 dấu gạch ngang '-'
    slug = re.sub(r"[^a-z0-9]+", "-", no_accents).strip("-")
    return slug

sample = "Đắk Lắk: Thủ phủ Cà phê & Hồ tiêu Việt Nam 2026!"
print("Bỏ dấu :", remove_vietnamese_accents(sample))
print("URL Slug:", slugify_vietnamese(sample))`,
          output: `Bỏ dấu : Dak Lak: Thu phu Ca phe & Ho tieu Viet Nam 2026!
URL Slug: dak-lak-thu-phu-ca-phe-ho-tieu-viet-nam-2026`,
          annotations: [
            { line: 8, text: 'unicodedata.combining(ch) trả về 0 cho chữ cái gốc và > 0 cho mọi dấu tổ hợp đi kèm.' },
            { line: 10, text: 'Nếu quên xử lý đ/Đ, chữ "Đắk" sẽ biến thành "Đak" gây lỗi URL Slug!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Bẫy Emoji (🇻🇳, ZWJ), casefold() vs lower() và open(encoding="utf-8")',
      badge: 'Cạm bẫy Đa ngôn ngữ',
      content: `
        <p>Ngoài dấu tiếng Việt, lập trình viên Python chuyên nghiệp cần nắm vững 3 cạm bẫy Unicode kinh điển sau:</p>
        <ul>
          <li><strong>Cạm bẫy 1 — Grapheme Cluster khác với Code Point:</strong> Một "ký tự hiển thị trên màn hình" mà con người cảm nhận được gọi là <strong>Extended Grapheme Cluster</strong>, nhưng hàm <code>len()</code> của Python chỉ đếm số <strong>Code Point</strong>:
            <ul>
              <li>Lá cờ Việt Nam <code>"🇻🇳"</code> được ghép từ 2 ký tự <em>Regional Indicator Symbol Letter V</em> (<code>U+1F1FB</code>) + <em>Letter N</em> (<code>U+1F1F3</code>) ➔ <code>len("🇻🇳") == 2</code>!</li>
              <li>Emoji gia đình <code>"👨‍👩‍👧"</code> hoặc kỹ sư nữ <code>"👩‍💻"</code> dùng ký tự nối <strong>ZWJ (Zero Width Joiner — <code>\\u200d</code>)</strong> để hàn nhiều Emoji đơn lại với nhau ➔ <code>len("👨‍👩‍👧") == 5</code>, và nếu bạn đảo ngược chuỗi bằng <code>s[::-1]</code> hay cắt lát <code>s[:1]</code>, biểu tượng sẽ bị vỡ vụn!</li>
            </ul>
          </li>
          <li><strong>Cạm bẫy 2 — <code>casefold()</code> mạnh hơn <code>lower()</code>:</strong> Khi so sánh chuỗi không phân biệt hoa thường (case-insensitive), <code>.lower()</code> chỉ chuyển đổi đơn giản 1-1 nên thất bại với các ngôn ngữ như tiếng Đức hay tiếng Hy Lạp. Ví dụ chữ Eszett <code>"ß"</code> trong tiếng Đức viết hoa là <code>"SS"</code>; <code>"ß".lower()</code> vẫn là <code>"ß"</code>, nhưng <code>"ß".casefold()</code> chuyển đúng thành <code>"ss"</code>!</li>
          <li><strong>Cạm bẫy 3 — Không truyền <code>encoding="utf-8"</code> vào <code>open()</code> trên Windows:</strong> Trên Linux/macOS, encoding mặc định của <code>open()</code> thường là UTF-8, nhưng trên <strong>Windows (Python <= 3.14 khi chưa bật UTF-8 Mode)</strong>, <code>open("data.txt", "r")</code> mặc định dùng bảng mã 1-byte của hệ thống (như <code>cp1252</code> hoặc <code>cp1258</code>), dẫn đến lỗi <code>UnicodeDecodeError</code> hoặc biến tiếng Việt thành chữ rác (Mojibake) ngay khi chạy trên máy khách hàng!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng Cờ 🇻🇳, Emoji ZWJ, casefold() và open(encoding="utf-8")',
          code: `import locale

# 1. Cờ quốc gia và Emoji ZWJ (Grapheme Cluster vs Code Point)
flag_vn = "🇻🇳"
family  = "👨‍👩‍👧"
print(f"Cờ {flag_vn}: len = {len(flag_vn)} | Code points: {[ hex(ord(c)) for c in flag_vn ]}")
print(f"Gia đình {family}: len = {len(family)} | Tách ZWJ: {family.split('\\u200d')}")

# 2. So sánh không phân biệt hoa/thường chuẩn quốc tế với casefold()
german_1 = "Straße"
german_2 = "STRASSE"
print("So sánh bằng lower()   :", german_1.lower() == german_2.lower())
print("So sánh bằng casefold():", german_1.casefold() == german_2.casefold())

# 3. Kiểm tra encoding mặc định nguy hiểm trên hệ điều hành
print("Encoding mặc định của locale:", locale.getencoding())`,
          output: `Cờ 🇻🇳: len = 2 | Code points: ['0x1f1fb', '0x1f1f3']
Gia đình 👨‍👩‍👧: len = 5 | Tách ZWJ: ['👨', '👩', '👧']
So sánh bằng lower()   : False
So sánh bằng casefold(): True
Encoding mặc định của locale: UTF-8`,
          annotations: [
            { line: 6, text: '0x1F1FB là Regional Indicator V, 0x1F1F3 là Regional Indicator N. Đảo ngược flag_vn[::-1] sẽ biến cờ Việt Nam (VN) thành cờ... không tồn tại (NV)!' },
            { line: 7, text: 'Giữa 👨, 👩, 👧 là hai ký tự nối vô hình \\u200d (Zero Width Joiner), làm tổng len() bằng 5.' },
            { line: 13, text: '"Straße".casefold() biến thành "strasse", khớp hoàn hảo với "STRASSE".casefold().' }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Đảo ngược chuỗi s[::-1] làm hỏng chữ Tiếng Việt NFD và Emoji!',
        content: 'Nếu chuỗi "Hoà" đang ở dạng tổ hợp NFD ("H" + "o" + "a" + "\\u0300"), phép đảo ngược s[::-1] sẽ đưa dấu huyền "\\u0300" lên đầu đứng một mình hoặc nhảy sang bám vào chữ "o" đứng sau! Tương tự, "🇻🇳"[::-1] đảo thứ tự V-N thành N-V. Luôn chuẩn hóa NFC trước khi thao tác trên ký tự.'
      },
      {
        title: 'Mở file văn bản không có encoding="utf-8" trên Windows',
        content: 'Trên Windows truyền thống, locale.getencoding() thường trả về "cp1252" (Latin phương Tây). Viết open("baocao.txt", "w") mà thiếu encoding="utf-8" sẽ ném UnicodeEncodeError ngay khi ghi chữ "Đ" hoặc "ệ"!'
      }
    ],
    tips: [
      {
        title: 'Quy chuẩn vàng khi so sánh hai chuỗi bất kỳ từ người dùng',
        content: 'Luôn kết hợp chuẩn hóa NFC và casefold() theo công thức: unicodedata.normalize("NFC", s1).casefold() == unicodedata.normalize("NFC", s2).casefold(). Công thức 1 dòng này giải quyết đồng thời cả lỗi bộ gõ tiếng Việt lẫn chữ hoa/thường đa ngôn ngữ!'
      },
      {
        title: 'Bật Python UTF-8 Mode bằng biến môi trường PYTHONUTF8=1',
        content: 'Trong Python 3.14, bạn có thể chạy python -X utf8 hoặc đặt biến môi trường PYTHONUTF8=1 để buộc mọi hàm open() mặc định dùng UTF-8 trên mọi hệ điều hành (tính năng này sẽ thành mặc định tự động từ PEP 686 trong tương lai).'
      }
    ],
    deepDive: {
      title: 'Khác biệt giữa Dấu thanh kiểu cũ (Hoà, uỷ) và kiểu mới (Hòa, ủy)',
      content: `
        <p>Ngay cả khi hai chuỗi đều đã chuẩn hóa <strong>NFC</strong>, tiếng Việt vẫn còn một bài toán thú vị: vị trí đặt dấu thanh trên các nguyên âm đôi <code>oa, oe, uy</code>.</p>
        <ul>
          <li>Kiểu cũ: đặt dấu ở nguyên âm đầu (<strong>oà, oé, uỷ</strong>) — ví dụ <code>"Hoà"</code> có chữ <code>'à' (U+00E0)</code>.</li>
          <li>Kiểu mới (quy định Bộ GD&ĐT): đặt dấu ở nguyên âm chính đứng sau (<strong>òa, óe, ủy</strong>) — ví dụ <code>"Hòa"</code> có chữ <code>'ò' (U+00F2)</code>.</li>
        </ul>
        <p>Lưu ý rằng <code>unicodedata.normalize("NFC", ...)</code> <strong>KHÔNG</strong> tự động đổi <code>"Hòa"</code> thành <code>"Hoà"</code> vì về mặt Unicode, <code>'ò' + 'a'</code> và <code>'o' + 'à'</code> là các ký tự khác nhau hoàn toàn. Do đó trong các hệ thống tìm kiếm tiếng Việt chuyên sâu (Elasticsearch / PostgreSQL Full-Text Search), người ta thường lập chỉ mục song song trên cả bản gốc NFC lẫn bản đã bỏ dấu bằng <code>remove_vietnamese_accents()</code>!</p>
      `
    },
    newIn314: null
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Hàm so sánh chuỗi Tiếng Việt bất chấp bộ gõ và hoa thường',
      problem: 'Viết hàm vn_equal(a: str, b: str) -> bool trả về True nếu hai chuỗi tương đương nhau về mặt chuẩn hóa chính tắc (NFC) và không phân biệt chữ hoa/thường đa ngôn ngữ (casefold). Kiểm tra với cặp ("NGUYỄN VĂN HOÀ", "nguyê\u0303n văn hoa\u0300") và ("Straße", "STRASSE").',
      hint: 'Áp dụng unicodedata.normalize("NFC", s).casefold() cho cả hai chuỗi.',
      solutionCode: `import unicodedata

def vn_equal(a: str, b: str) -> bool:
    norm_a = unicodedata.normalize("NFC", a).casefold()
    norm_b = unicodedata.normalize("NFC", b).casefold()
    return norm_a == norm_b

print(vn_equal("NGUYỄN VĂN HOÀ", "nguyê\\u0303n văn hoa\\u0300"))
print(vn_equal("Straße", "STRASSE"))`,
      solutionOutput: `True
True`,
      explanation: 'Khi gọi normalize("NFC", b), tổ hợp "ê\\u0303" gộp thành "ễ" và "a\\u0300" gộp thành "à". Sau đó .casefold() đưa cả hai về chữ thường chuẩn quốc tế.'
    },
    {
      level: 'Vừa',
      title: 'Tìm kiếm từ khóa Tiếng Việt không dấu (Accent-Insensitive Search)',
      problem: 'Người dùng gõ từ khóa không dấu "ดak lak" hoặc "ca phe" vào ô tìm kiếm nhưng dữ liệu sản phẩm trong kho có dấu đầy đủ. Hãy viết hàm search_products(products: list[str], query: str) -> list[str] trả về danh sách các sản phẩm khớp với query bất kể người dùng gõ có dấu hay không dấu, hoa hay thường.',
      hint: 'Viết hàm phụ normalize_search(s) thực hiện bỏ dấu tiếng Việt (NFD + lọc combining + đổi đ->d) và .casefold(), rồi kiểm tra normalize_search(query) in normalize_search(item).',
      solutionCode: `import unicodedata

def normalize_search(text: str) -> str:
    nfd = unicodedata.normalize("NFD", text)
    no_accents = "".join(c for c in nfd if not unicodedata.combining(c))
    return no_accents.replace("đ", "d").replace("Đ", "D").casefold()

def search_products(products: list[str], query: str) -> list[str]:
    q = normalize_search(query.strip())
    return [item for item in products if q in normalize_search(item)]

catalog = [
    "Cà phê Chồn Đắk Lắk thượng hạng",
    "Trà Ô Long Lâm Đồng",
    "Hạt điều rang muối Bình Phước",
    "Phin pha cà phê inox 304"
]

print(search_products(catalog, "dak lak"))
print(search_products(catalog, "CA PHE"))`,
      solutionOutput: `['Cà phê Chồn Đắk Lắk thượng hạng']
['Cà phê Chồn Đắk Lắk thượng hạng', 'Phin pha cà phê inox 304']`,
      explanation: 'Nhờ đưa cả danh mục lẫn từ khóa về dạng không dấu chữ thường qua normalize_search(), người dùng gõ "dak lak", "Đắk Lắk" hay "CA PHE" đều tìm thấy kết quả chính xác.'
    },
    {
      level: 'Khó',
      title: 'Bộ tách cụm ký tự hiển thị (Grapheme-aware Splitter cơ bản)',
      problem: 'Khi cắt hoặc đảo ngược chuỗi có chứa dấu tổ hợp NFD (ví dụ "Hoa\\u0300") hoặc Emoji nối bằng ZWJ ("👨‍👩‍👧"), nếu duyệt từng Code Point sẽ làm rớt dấu hoặc vỡ Emoji. Hãy viết hàm split_graphemes_basic(s: str) -> list[str] gom nhóm: (1) Các dấu tổ hợp (unicodedata.combining(c) > 0) luôn dính vào cụm ký tự ngay trước nó; (2) Ký tự ZWJ ("\\u200d") và ký tự ngay sau ZWJ luôn dính vào cụm trước nó. Thử đảo ngược chuỗi "Ho\u0300a 👨‍👩‍👧!" theo từng cụm.',
      hint: 'Duyệt từng ký tự ch trong s: nếu danh sách kết quả không rỗng và (unicodedata.combining(ch) > 0 hoặc ch == "\\u200d" hoặc clusters[-1].endswith("\\u200d")), hãy nối ch vào clusters[-1], ngược lại append cụm mới.',
      solutionCode: `import unicodedata

def split_graphemes_basic(s: str) -> list[str]:
    clusters: list[str] = []
    for ch in s:
        if clusters and (
            unicodedata.combining(ch) > 0
            or ch == "\\u200d"
            or clusters[-1].endswith("\\u200d")
        ):
            clusters[-1] += ch
        else:
            clusters.append(ch)
    return clusters

text = "Hoa\\u0300 👨‍👩‍👧!"
clusters = split_graphemes_basic(text)
print("Các cụm hiển thị:", clusters)
print("Đảo ngược an toàn:", "".join( reversed(clusters) ))`,
      solutionOutput: `Các cụm hiển thị: ['H', 'o', 'à', ' ', '👨\\u200d👩\\u200d👧', '!']
Đảo ngược an toàn: !👨‍👩‍👧 àoH`,
      explanation: 'Nhờ gom dấu tổ hợp "\\u0300" vào "a" và gom các thành phần nối bởi ZWJ "\\u200d" thành một cụm "👨‍👩‍👧" duy nhất, phép đảo ngược reversed(clusters) giữ nguyên vẹn cả chữ "à" lẫn biểu tượng gia đình!'
    }
  ],
  quiz: [
    {
      question: 'Tại sao khi viết thuật toán bỏ dấu tiếng Việt bằng cách tách NFD và lọc bỏ các ký tự có unicodedata.combining(c) > 0, chữ "Đ" và "đ" vẫn không biến thành "D" và "d"?',
      options: [
        'Vì "Đ" (U+0110) và "đ" (U+0111) là các chữ cái độc lập có gạch ngang thân trong Unicode, không phải chữ D ghép với dấu tổ hợp',
        'Vì hàm unicodedata.normalize("NFD", s) bị lỗi với các chữ cái viết hoa',
        'Vì chữ "Đ" chỉ tồn tại trong bảng mã VNI và TCVN3 chứ không có trong Unicode',
        'Vì phải dùng chuẩn NFKD mới tách được chữ "Đ" thành "D" và dấu gạch ngang'
      ],
      correctIndex: 0,
      explanation: 'Trong chuẩn Unicode, LATIN CAPITAL/SMALL LETTER D WITH STROKE (U+0110 / U+0111) là ký tự cơ sở (base character) độc lập, không có phân rã NFD hay NFKD. Do đó luôn phải .replace("đ", "d").replace("Đ", "D") riêng.'
    },
    {
      question: 'Biểu thức len("🇻🇳") trong Python 3.14 trả về giá trị bao nhiêu?',
      options: [
        '2 (vì cờ quốc gia được tạo từ 2 ký tự Regional Indicator Symbol V và N)',
        '1 (vì đây là 1 biểu tượng lá cờ duy nhất)',
        '4 (vì mỗi Emoji chiếm 4 bytes)',
        '8 (vì 2 ký tự nhân với 4 bytes UTF-8)'
      ],
      correctIndex: 0,
      explanation: 'Biểu tượng cờ "🇻🇳" là 1 Grapheme Cluster nhưng được cấu thành từ 2 Unicode Code Points: U+1F1FB (Regional Indicator V) và U+1F1F3 (Regional Indicator N), nên len("🇻🇳") == 2.'
    },
    {
      question: 'Sự khác biệt quan trọng nhất giữa s.casefold() và s.lower() là gì?',
      options: [
        'casefold() thực hiện chuẩn hóa không phân biệt hoa thường triệt để hơn cho đa ngôn ngữ (ví dụ biến chữ "ß" tiếng Đức thành "ss"), còn lower() giữ nguyên "ß"',
        'casefold() tự động xóa toàn bộ dấu tiếng Việt, còn lower() giữ nguyên dấu',
        'casefold() chỉ hoạt động với bảng mã ASCII, còn lower() hoạt động với Unicode',
        'casefold() chuyển chữ đầu từ thành chữ hoa, còn chữ còn lại thành chữ thường'
      ],
      correctIndex: 0,
      explanation: 'Theo mục 3.13 của chuẩn Unicode, casefold() được thiết kế chuyên biệt cho việc so khớp không phân biệt hoa thường (caseless matching), xử lý cả các ánh xạ 1-nhiều như "ß" -> "ss".'
    },
    {
      question: 'Điều gì có thể xảy ra nếu bạn gọi open("baocao.txt", "w") mà KHÔNG truyền tham số encoding="utf-8" khi chạy chương trình trên Windows?',
      options: [
        'Python dùng bảng mã mặc định của locale hệ thống (như cp1252), gây lỗi UnicodeEncodeError hoặc làm hỏng chữ tiếng Việt/Emoji',
        'Python tự động chuyển sang chế độ ghi nhị phân (binary mode)',
        'Python luôn mặc định dùng UTF-32 trên Windows làm file nặng gấp 4 lần',
        'Không có vấn đề gì vì open() từ Python 3.0 đã luôn cố định dùng UTF-8 trên mọi hệ điều hành'
      ],
      correctIndex: 0,
      explanation: 'Khi không chỉ định encoding, open() phụ thuộc vào locale.getencoding() của hệ điều hành. Trên Windows truyền thống, bảng mã này thường là cp1252 không chứa đủ ký tự tiếng Việt và Emoji.'
    }
  ],
  summary: [
    'Hai chuỗi tiếng Việt nhìn giống hệt nhau có thể khác nhau về biểu diễn NFC (dựng sẵn) và NFD (tổ hợp); hãy luôn gọi unicodedata.normalize("NFC", s) ở đầu vào.',
    'Thuật toán bỏ dấu tiếng Việt chuẩn gồm 3 bước: tách NFD -> lọc bỏ ký tự có unicodedata.combining(c) > 0 -> thay thế riêng đ/Đ thành d/D.',
    'Một ký tự hiển thị (Grapheme Cluster) như cờ "🇻🇳" (len=2) hoặc Emoji gia đình "👨‍👩‍👧" (len=5, nối bằng ZWJ \\u200d) có thể gồm nhiều Code Point.',
    'Luôn dùng .casefold() thay cho .lower() khi so khớp không phân biệt hoa/thường, và luôn chỉ định rõ encoding="utf-8" khi gọi open().'
  ]
};
