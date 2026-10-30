export default {
  id: 'p7-02',
  partId: 'part-7',
  partTitle: 'Phần 7 – Thực chiến và Bảo mật (Chuyên sâu)',
  number: '7.2',
  title: '5 Dự án nhỏ thực chiến & Biên niên sử tính năng chuỗi Python (3.6 → 3.14.8)',
  subtitle: 'Slugify tiếng Việt, Word Frequency, Palindrome đa ngôn ngữ, Caesar Cipher maketrans và SafeHTML t-strings',
  level: 'Chuyên sâu',
  duration: '60 phút',
  isNew314: true,
  interactiveWidget: null,
  objectives: [
    'Xây dựng hoàn chỉnh hàm slugify_vi(text) chuyển đổi tiêu đề tiếng Việt có dấu (kể cả đ/Đ) thành URL slug chuẩn SEO.',
    'Viết bộ đếm tần suất từ (word_frequency) và bộ kiểm tra Palindrome đa ngôn ngữ bằng chuẩn hóa Unicode NFC + casefold().',
    'Triển khai thuật toán mã hóa/giải mã Caesar Cipher bảo toàn hoa/thường với tốc độ cấp độ C nhờ str.maketrans() và str.translate().',
    'Thiết kế bộ dựng HTML an toàn tự động chống XSS bằng t-strings (Python 3.14 PEP 750) kết hợp lớp đánh dấu SafeHTML.',
    'Hệ thống hóa toàn bộ lịch sử tiến hóa của kiểu str từ Python 3.6 đến Python 3.14.8.'
  ],
  intuition: {
    title: 'Từ mảnh ghép rời rạc đến dây chuyền sản xuất thực tế',
    metaphor: 'Trong các phần trước, bạn đã rèn luyện từng thanh công cụ riêng lẻ: cắt lát, bảng dịch maketrans, chuẩn hóa Unicode NFD/NFC, biểu thức chính quy và t-strings. Bài học này giống như một xưởng chế tạo thực chiến — nơi bạn lắp ghép các công cụ đó lại với nhau chỉ trong 10–20 dòng code tinh gọn để giải quyết 5 bài toán kinh điển xuất hiện trong hầu hết các dự án Backend, Web và Data Engineering.',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin-top:12px;font-family:system-ui,sans-serif;">
        <div style="padding:12px;border-radius:8px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);">
          <div style="font-weight:700;color:#3b82f6;">1. slugify_vi()</div>
          <div style="font-size:12px;margin-top:4px;"><code>"Phở Đặc Biệt!"</code> ➔ <code>"pho-dac-biet"</code></div>
        </div>
        <div style="padding:12px;border-radius:8px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);">
          <div style="font-weight:700;color:#10b981;">2. word_frequency()</div>
          <div style="font-size:12px;margin-top:4px;">NFC + <code>casefold()</code> + <code>Counter</code></div>
        </div>
        <div style="padding:12px;border-radius:8px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);">
          <div style="font-weight:700;color:#f59e0b;">3. is_palindrome()</div>
          <div style="font-size:12px;margin-top:4px;">Đa ngôn ngữ, lọc dấu câu</div>
        </div>
        <div style="padding:12px;border-radius:8px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);">
          <div style="font-weight:700;color:#a855f7;">4. Caesar Cipher</div>
          <div style="font-size:12px;margin-top:4px;"><code>maketrans</code> + <code>translate</code></div>
        </div>
        <div style="padding:12px;border-radius:8px;background:rgba(236,72,153,0.1);border:1px solid rgba(236,72,153,0.3);">
          <div style="font-weight:700;color:#ec4899;">5. SafeHTML (3.14)</div>
          <div style="font-size:12px;margin-top:4px;">PEP 750 <code>t"..."</code> chống XSS</div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: 'Dự án 1 & 2: Tạo URL Slug Tiếng Việt (slugify_vi) và Bộ đếm tần suất từ (word_frequency)',
      badge: 'Thực chiến NLP & Web',
      content: `
        <p><strong>Dự án 1 — <code>slugify_vi(text)</code>:</strong> Khi xây dựng Blog, CMS hay sàn thương mại điện tử tại Việt Nam, bạn luôn cần chuyển tiêu đề bài viết như <code>"Khóa học Đỉnh Cao: Chuỗi Python 3.14.8!"</code> thành đường dẫn thân thiện <code>"khoa-hoc-dinh-cao-chuoi-python-3-14-8"</code>. Bí quyết gồm 4 bước:</p>
        <ol>
          <li>Chuyển riêng chữ <code>đ</code>/<code>Đ</code> thành <code>d</code> (vì trong bảng mã Unicode, <code>đ</code> là <code>U+0111</code> — một ký tự có gạch ngang thân chữ chứ không phải chữ <code>d</code> ghép với dấu thanh, nên <code>NFD</code> sẽ không tách được chữ <code>đ</code>!).</li>
          <li>Phân rã chuỗi sang dạng <strong>NFD</strong> (<code>unicodedata.normalize("NFD", text)</code>) rồi lọc bỏ toàn bộ các ký tự thuộc nhóm dấu kết hợp <code>unicodedata.category(c) == "Mn"</code> (Mark, Nonspacing).</li>
          <li>Hạ chữ thường (<code>.lower()</code>) và dùng Regex thay thế mọi cụm ký tự không phải chữ/số ASCII bằng một dấu gạch ngang <code>"-"</code>.</li>
          <li>Cắt bỏ dấu <code>"-"</code> thừa ở hai đầu bằng <code>.strip("-")</code>.</li>
        </ol>
        <p><strong>Dự án 2 — <code>word_frequency(text)</code>:</strong> Để đếm từ chính xác cho văn bản tiếng Việt hoặc đa ngôn ngữ, ta cần chuẩn hóa về <strong>NFC</strong> (tránh trường hợp một từ gõ bằng bộ gõ dựng sẵn NFC và một từ gõ bằng bộ gõ tổ hợp NFD bị tính thành 2 từ khác nhau), chuyển về <code>.casefold()</code> và tách từ bằng biểu thức chính quy.</p>
      `,
      codeExamples: [
        {
          title: 'Dự án 1 (slugify_vi) & Dự án 2 (word_frequency chuẩn hóa Unicode)',
          code: `import re
import unicodedata
from collections import Counter

# --- DỰ ÁN 1: Chuyển tiêu đề Tiếng Việt thành URL Slug chuẩn ---
def slugify_vi(text: str) -> str:
    # Bước 1: Chuyển đ/Đ thành d trước khi phân rã NFD
    text = text.replace("đ", "d").replace("Đ", "d")
    # Bước 2: Phân rã NFD và loại bỏ toàn bộ dấu thanh/dấu mũ (nhóm 'Mn')
    nfd_text = unicodedata.normalize("NFD", text)
    ascii_text = "".join(c for c in nfd_text if unicodedata.category(c) != "Mn")
    # Bước 3: Hạ chữ thường, thay mọi cụm ký tự ngoài [a-z0-9] bằng '-' và cắt '-' ở 2 đầu
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_text.lower()).strip("-")
    return slug

# --- DỰ ÁN 2: Bộ đếm tần suất từ chuẩn hóa Unicode & dấu câu ---
def word_frequency(text: str, top_n: int = 5) -> list[tuple[str, int]]:
    # Chuẩn hóa về NFC để hợp nhất các từ tiếng Việt gõ theo NFD/NFC khác nhau
    clean_text = unicodedata.normalize("NFC", text).casefold()
    words = re.findall(r"\\w+", clean_text)
    return Counter(words).most_common(top_n)

print("Slug 1:", slugify_vi("Phở Bò Đặc Biệt — Món Ngon Hà Nội 2026!"))
print("Slug 2:", slugify_vi("  Đường đến Đỉnh Vinh Quang & Python 3.14.8  "))

sample_article = "Python 3.14 rất nhanh! Học python, làm chủ PYTHON và xử lý chuỗi tiếng Việt: Tiếng\\u0020Việt."
print("Top từ:", word_frequency(sample_article, top_n=4))`,
          output: `Slug 1: pho-bo-dac-biet-mon-ngon-ha-noi-2026
Slug 2: duong-den-dinh-vinh-quang-python-3-14-8
Top từ: [('python', 3), ('tiếng', 2), ('việt', 2), ('3', 1)]`,
          annotations: [
            { line: 8, text: "Bắt buộc xử lý riêng 'đ'/'Đ' vì Unicode định nghĩa U+0111 là chữ cái độc lập, không tách dấu qua NFD." },
            { line: 11, text: "unicodedata.category(c) != 'Mn' loại bỏ sạch sẽ cả dấu mũ (â, ê, ô, ă, ơ, ư) lẫn 5 dấu thanh tiếng Việt." },
            { line: 19, text: "Kết hợp NFC và casefold() đảm bảo 'PYTHON', 'Python', 'python' hay chữ ghép dấu NFD đều gom về đúng 1 khóa." }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Dự án 3 & 4: Kiểm tra Palindrome đa ngôn ngữ và Caesar Cipher bằng maketrans',
      badge: 'Thuật toán & Mật mã cổ điển',
      content: `
        <p><strong>Dự án 3 — Kiểm tra Palindrome đa ngôn ngữ (<code>is_palindrome_i18n</code>):</strong> Một chuỗi đối xứng (Palindrome) thực tế thường chứa khoảng trắng, dấu câu, chữ hoa/thường và ký tự quốc tế (như chữ <code>ß</code> tiếng Đức hoặc tiếng Việt). Thay vì chỉ dùng <code>.lower()</code>, việc kết hợp <code>unicodedata.normalize("NFC", text).casefold()</code> và lọc <code>c.isalnum()</code> giúp hàm hoạt động hoàn hảo trên mọi ngôn ngữ.</p>
        <p><strong>Dự án 4 — Mã hóa &amp; Giải mã Caesar Cipher bằng <code>str.maketrans</code> + <code>translate</code>:</strong> Thay vì dùng vòng lặp <code>for</code> tính toán <code>chr((ord(c) - 65 + shift) % 26 + 65)</code> cho từng ký tự ở tầng Python, ta xây dựng bảng dịch 52 chữ cái (cả <code>a-z</code> và <code>A-Z</code>) bằng <code>str.maketrans()</code> rồi gọi <code>.translate()</code> để CPython thực hiện toàn bộ phép dịch chuyển ở tốc độ C!</p>
      `,
      codeExamples: [
        {
          title: 'Dự án 3 (Palindrome đa ngôn ngữ) & Dự án 4 (Caesar Cipher với maketrans + translate)',
          code: `import string
import unicodedata

# --- DỰ ÁN 3: Kiểm tra Palindrome đa ngôn ngữ ---
def is_palindrome_i18n(text: str) -> bool:
    normalized = unicodedata.normalize("NFC", text).casefold()
    cleaned = "".join(c for c in normalized if c.isalnum())
    return cleaned == cleaned[::-1]

# --- DỰ ÁN 4: Mã hóa & Giải mã Caesar Cipher bảo toàn hoa/thường ---
def caesar_cipher(text: str, shift: int, decrypt: bool = False) -> str:
    if decrypt:
        shift = -shift
    shift %= 26
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    shifted_lower = lower[shift:] + lower[:shift]
    shifted_upper = upper[shift:] + upper[:shift]

    trans_table = str.maketrans(lower + upper, shifted_lower + shifted_upper)
    return text.translate(trans_table)

for phrase in ["A man, a plan, a canal: Panama!", "Lập trình Python", "Nồi đồng nấu ốc, nồi đất nấu ếch"]:
    print(f"Palindrome? {phrase!r:35} -> {is_palindrome_i18n(phrase)}")

print("Palindrome Tiếng Việt ('Radar - Cọc - Radar'):", is_palindrome_i18n("Radar - Cọc - Radar!"))

secret = caesar_cipher("Python 3.14.8 - Master String & Security!", shift=13)
restored = caesar_cipher(secret, shift=13, decrypt=True)
print("Đã mã hóa (ROT13):", secret)
print("Đã giải mã       :", restored)`,
          output: `Palindrome? 'A man, a plan, a canal: Panama!'   -> True
Palindrome? 'Lập trình Python'                  -> False
Palindrome? 'Nồi đồng nấu ốc, nồi đất nấu ếch'  -> False
Palindrome Tiếng Việt ('Radar - Cọc - Radar'): True
Đã mã hóa (ROT13): Clguba 3.14.8 - Znfgre Fgevat & Frphevgl!
Đã giải mã       : Python 3.14.8 - Master String & Security!`,
          annotations: [
            { line: 8, text: "cleaned == cleaned[::-1] đảo ngược chuỗi bằng slicing C-level cực nhanh để kiểm tra đối xứng." },
            { line: 17, text: "Cắt lát lower[shift:] + lower[:shift] xoay vòng bảng chữ cái một cách thanh lịch chỉ trong 1 dòng." },
            { line: 20, text: "str.maketrans ánh xạ đồng thời 26 chữ thường và 26 chữ hoa, giữ nguyên mọi chữ số, dấu câu và tiếng Việt!" }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Dự án 5: Bộ dựng HTML an toàn chống XSS bằng t-strings (Python 3.14 PEP 750)',
      badge: 'Mới trong Python 3.14',
      content: `
        <p>Đây là ứng dụng tỏa sáng rực rỡ nhất của <strong>Template Strings (<code>t"..."</code> — PEP 750)</strong> trong <strong>Python 3.14.8</strong>. Khi xây dựng giao diện HTML động, chúng ta muốn:</p>
        <ol>
          <li>Mọi biến thông thường chèn vào <code>{user_name}</code> phải được <strong>tự động escape HTML</strong> (<code>html.escape()</code>) để chặn đứng XSS.</li>
          <li>Nhưng nếu một biến là một thành phần HTML con đã được kiểm duyệt an toàn (thuộc lớp đánh dấu <code>SafeHTML</code>) hoặc một <code>Template</code> lồng bên trong, nó phải được <strong>giữ nguyên thẻ HTML</strong> mà không bị escape lần hai (double-escaping)!</li>
          <li>Hỗ trợ cả <code>format_spec</code> tùy chỉnh: ví dụ viết <code>{price:,.0f}</code> để định dạng số trước khi escape.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Dự án 5: Bộ dựng HTML an toàn (html_render) với lớp SafeHTML và t-strings 3.14',
          code: `import html
from string.templatelib import Template

class SafeHTML(str):
    """Lớp đánh dấu chuỗi HTML đã được kiểm chứng an toàn, không cần escape lại."""
    pass

def html_render(template: Template) -> SafeHTML:
    if not isinstance(template, Template):
        raise TypeError("html_render() chỉ chấp nhận t-string (Template)!")

    out: list[str] = []
    for item in template:
        if isinstance(item, str):
            out.append(item)
        else:
            val = item.value
            # Nếu lồng một t-string khác bên trong, đệ quy render nó thành SafeHTML
            if isinstance(val, Template):
                val = html_render(val)

            # Nếu đã là SafeHTML thì giữ nguyên, ngược lại định dạng rồi escape chống XSS
            if isinstance(val, SafeHTML):
                out.append(str(val))
            else:
                if item.conversion == "r":
                    text = repr(val)
                elif item.conversion == "a":
                    text = ascii(val)
                else:
                    text = format(val, item.format_spec) if item.format_spec else str(val)
                out.append(html.escape(text, quote=True))

    return SafeHTML("".join(out))

# Thử nghiệm với dữ liệu chứa mã độc XSS và thành phần SafeHTML lồng nhau
untrusted_author = '<script>alert("XSS")</script> & NhatVo'
badge_html = SafeHTML('<span class="badge-verified">✔ Đã xác thực</span>')
course_price = 1250000

card = html_render(
    t'<article class="card"><h3>Tác giả: {untrusted_author} {badge_html}</h3>'
    t'<p>Học phí: {course_price:,.0f} VNĐ</p></article>'
)
print(card)`,
          output: `<article class="card"><h3>Tác giả: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt; &amp; NhatVo <span class="badge-verified">✔ Đã xác thực</span></h3><p>Học phí: 1,250,000 VNĐ</p></article>`,
          annotations: [
            { line: 4, text: "SafeHTML kế thừa từ str để đánh dấu các đoạn HTML đã an toàn (tương tự MarkupSafe trong Jinja2/Flask)." },
            { line: 22, text: "Nếu biến nội suy thuộc kiểu SafeHTML (như badge_html), bộ dựng giữ nguyên thẻ <span> mà không escape." },
            { line: 30, text: "Biến untrusted_author bị html.escape() khóa chặt, còn course_price được áp dụng format_spec ',.0f' chuẩn xác!" }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Biên niên sử tiến hóa của kiểu chuỗi qua các phiên bản Python (3.6 → 3.14.8)',
      badge: 'Tổng hợp Lịch sử',
      content: `
        <p>Để làm việc tự tin với các codebase từ cũ đến mới và tận dụng tối đa sức mạnh của <strong>Python 3.14.8</strong>, hãy nắm vững bảng tổng hợp các cột mốc quan trọng nhất của kiểu dữ liệu <code>str</code>:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr style="background:rgba(59,130,246,0.15);text-align:left;">
                <th style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Phiên bản</th>
                <th style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Tính năng chuỗi nổi bật</th>
                <th style="padding:10px;border:1px solid rgba(148,163,184,0.3);">PEP / Module</th>
                <th style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Ví dụ cú pháp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);font-weight:700;">Python 3.6</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Ra đời <strong>f-strings</strong> (Formatted String Literals) nhanh và trực quan</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">PEP 498</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);"><code>f"Xin chào {name.upper()}!"</code></td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);font-weight:700;">Python 3.8</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Cú pháp tự gỡ lỗi (Self-documenting expressions) trong f-strings</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Core</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);"><code>f"{x=}, {x+1=}"</code></td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);font-weight:700;">Python 3.9</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Bổ sung <code>str.removeprefix()</code> và <code>str.removesuffix()</code> thay thế thói quen dùng sai <code>lstrip</code>/<code>rstrip</code></td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">PEP 616</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);"><code>"test_api.py".removesuffix(".py")</code></td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);font-weight:700;">Python 3.11</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);"><code>enum.StrEnum</code>, kiểu tĩnh <code>typing.LiteralString</code>, cùng <strong>Atomic Grouping</strong> <code>(?&gt;...)</code> và <strong>Possessive Quantifiers</strong> <code>*+</code>, <code>++</code> chống ReDoS trong <code>re</code></td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">PEP 675, <code>enum</code>, <code>re</code></td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);"><code>re.compile(r"\\w++")</code>, <code>class Role(StrEnum)</code></td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);font-weight:700;">Python 3.12</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Gỡ bỏ mọi hạn chế cú pháp của f-strings: cho phép tái sử dụng cùng loại dấu nháy, lồng f-string tùy ý, dùng backslash <code>\\n</code> và viết comment <code>#</code> bên trong <code>{...}</code></td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">PEP 701</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);"><code>f"List: {'\\n'.join(items)}"</code></td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);font-weight:700;">Python 3.13</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Hỗ trợ đối số từ khóa <code>count=...</code> trong <code>str.replace(old, new, count=1)</code>; trình biên dịch tự động cắt khoảng trắng thụt lề của docstring (<code>__doc__</code>) để tiết kiệm RAM</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Core Optimization</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);"><code>s.replace("a", "b", count=1)</code></td>
              </tr>
              <tr style="background:rgba(16,185,129,0.12);">
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);font-weight:700;color:#10b981;">Python 3.14 (3.14.8)</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);">Ra mắt <strong>Template Strings (<code>t"..."</code>)</strong> trả về đối tượng <code>Template</code> tách biệt phần chuỗi tĩnh và <code>Interpolation</code> để xử lý an toàn SQL, HTML, Shell, Logging</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);"><strong>PEP 750</strong> (<code>string.templatelib</code>)</td>
                <td style="padding:10px;border:1px solid rgba(148,163,184,0.3);"><code>tpl = t"Hello {user!r:&gt;10}"</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Điểm danh các tính năng hiện đại từ Python 3.8 đến Python 3.14.8 trong một đoạn code',
          code: `from string.templatelib import Template

# Python 3.9: removeprefix / removesuffix
raw_route = "api/v1/users.json"
clean_route = raw_route.removeprefix("api/v1/").removesuffix(".json")

# Python 3.12 (PEP 701): Tái sử dụng dấu nháy kép và dùng '\\n' trực tiếp trong f-string
items = ["Phở", "Bún chả", "Cà phê"]
menu_str = f"Thực đơn hôm nay: {', '.join(f'[{x}]' for x in items)}"

# Python 3.13: Keyword argument count= trong str.replace()
fixed_log = "ERROR: ERROR: Kết nối thất bại".replace("ERROR: ", "[WARN] ", count=1)

# Python 3.14.8 (PEP 750): Template Strings t"..."
tpl: Template = t"Route={clean_route} | Log={fixed_log}"

print("Route (3.9) :", clean_route)
print("Menu  (3.12):", menu_str)
print("Log   (3.13):", fixed_log)
print("t-str (3.14): strings =", tpl.strings, "| values =", [i.value for i in tpl.interpolations])`,
          output: `Route (3.9) : users
Menu  (3.12): Thực đơn hôm nay: [Phở], [Bún chả], [Cà phê]
Log   (3.13): [WARN] ERROR: Kết nối thất bại
t-str (3.14): strings = ('Route=', ' | Log=', '') | values = ['users', '[WARN] ERROR: Kết nối thất bại']`,
          annotations: [
            { line: 5, text: "removeprefix và removesuffix (3.9) cắt đúng chuỗi con thay vì cắt tập hợp ký tự như lstrip/rstrip." },
            { line: 9, text: "PEP 701 (3.12) cho phép lồng f-string và dùng lại dấu nháy cực kỳ tự nhiên." },
            { line: 12, text: "Từ Python 3.13, count=1 có thể truyền dưới dạng keyword argument giúp đọc code rõ nghĩa hơn hẳn." },
            { line: 15, text: "PEP 750 (3.14) giữ nguyên cấu trúc tpl.strings và tpl.interpolations cho mọi tác vụ hậu xử lý." }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Quên xử lý chữ "đ" và "Đ" trong hàm bỏ dấu tiếng Việt',
        content: 'Rất nhiều hàm bỏ dấu tiếng Việt copy trên mạng chỉ gọi unicodedata.normalize("NFD", s) rồi lọc bỏ ký tự "Mn", dẫn đến chữ "Đà Nẵng" bị biến thành "Đa Nang" (vẫn còn chữ Đ!). Luôn nhớ .replace("đ", "d").replace("Đ", "d") trước hoặc sau bước NFD.'
      }
    ],
    tips: [
      {
        title: 'Biên dịch sẵn Regex (re.compile) cho các hàm tiện ích gọi hàng triệu lần',
        content: 'Nếu hàm slugify_vi() hoặc word_frequency() được gọi liên tục trong vòng lặp xử lý dữ liệu lớn, hãy đưa biểu thức chính quy ra ngoài hàm dưới dạng hằng số đã biên dịch: _NON_ALNUM_RE = re.compile(r"[^a-z0-9]+").'
      }
    ],
    deepDive: {
      title: 'Tối ưu hóa bộ nhớ Docstring tự động từ Python 3.13 & 3.14',
      content: `
        <p>Trước Python 3.13, mọi docstring viết thụt lề bên trong hàm/class đều lưu cả hàng chục khoảng trắng thừa ở đầu mỗi dòng vào thuộc tính <code>__doc__</code> trong RAM. Từ Python 3.13 và 3.14.8, trình biên dịch CPython tự động cắt bỏ khoảng trắng thụt lề chung (tương đương <code>inspect.cleandoc()</code>) ngay lúc biên dịch bytecode, giúp giảm đáng kể dung lượng bộ nhớ của các thư viện lớn!</p>
      `
    },
    newIn314: {
      title: 'Mới trong Python 3.14.8: Sự kết hợp hoàn hảo giữa PEP 701 và PEP 750',
      content: 'Template Strings (t"..." - PEP 750) trong Python 3.14.8 thừa hưởng toàn bộ bộ phân tích cú pháp hiện đại của PEP 701 (Python 3.12): bạn có thể lồng các t"..." vào bên trong biểu thức nội suy của nhau, tái sử dụng dấu nháy và đặt comment ngay bên trong { ... }.'
    }
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Mở rộng hàm slugify_vi hỗ trợ giới hạn độ dài từ nguyên vẹn',
      problem: 'Hãy nâng cấp hàm `slugify_vi(text: str, max_length: int = 30) -> str` sao cho nếu chuỗi slug dài hơn `max_length`, hàm sẽ cắt tại ranh giới dấu gạch ngang `-` gần nhất (không cắt cụt giữa chừng một từ) và không để lại dấu `-` ở cuối.',
      hint: 'Sau khi tạo `slug`, nếu `len(slug) > max_length`, hãy cắt `slug[:max_length]` rồi dùng `.rsplit("-", 1)[0]` nếu ký tự tiếp theo không phải là `"-"`.',
      solutionCode: `import re
import unicodedata

def slugify_vi(text: str, max_length: int = 30) -> str:
    text = text.replace("đ", "d").replace("Đ", "d")
    nfd = unicodedata.normalize("NFD", text)
    no_accent = "".join(c for c in nfd if unicodedata.category(c) != "Mn")
    slug = re.sub(r"[^a-z0-9]+", "-", no_accent.lower()).strip("-")

    if len(slug) <= max_length:
        return slug
    if slug[max_length] == "-":
        return slug[:max_length].rstrip("-")
    clipped = slug[:max_length]
    return clipped.rsplit("-", 1)[0] if "-" in clipped else clipped

title = "Hướng dẫn lập trình chuỗi chuyên sâu trong Python 3.14.8"
print("Full slug :", slugify_vi(title, max_length=100))
print("Short slug:", slugify_vi(title, max_length=28))`,
      solutionOutput: `Full slug : huong-dan-lap-trinh-chuoi-chuyen-sau-trong-python-3-14-8
Short slug: huong-dan-lap-trinh-chuoi`,
      explanation: 'Khi cắt ở vị trí 28 (`"huong-dan-lap-trinh-chuoi-ch"`), từ `"chuyen"` bị đứt đôi. Nhờ `.rsplit("-", 1)[0]`, hàm lùi về ranh giới từ nguyên vẹn `"huong-dan-lap-trinh-chuoi"` chuẩn SEO.'
    },
    {
      level: 'Vừa',
      title: 'Phá mã Caesar Cipher tự động bằng thống kê tần suất (Brute-force + Scoring)',
      problem: 'Khi nhận một bản mã Caesar tiếng Anh mà không biết khóa `shift` (từ 0 đến 25), hãy viết hàm `crack_caesar(ciphertext: str, common_words: set[str]) -> tuple[int, str]` thử cả 26 khóa dịch chuyển bằng `caesar_cipher()`, đếm số từ giải mã xuất hiện trong `common_words`, và trả về cặp `(best_shift, plaintext)` có điểm cao nhất.',
      hint: 'Duyệt `shift` từ `0..25`, giải mã với `decrypt=True`, tách các từ viết thường và tính tổng số từ thuộc `common_words`.',
      solutionCode: `import re
import string

def caesar_cipher(text: str, shift: int, decrypt: bool = False) -> str:
    shift = (-shift if decrypt else shift) % 26
    lo, up = string.ascii_lowercase, string.ascii_uppercase
    table = str.maketrans(lo + up, lo[shift:] + lo[:shift] + up[shift:] + up[:shift])
    return text.translate(table)

def crack_caesar(ciphertext: str, common_words: set[str]) -> tuple[int, str]:
    best_shift = 0
    best_text = ciphertext
    best_score = -1
    for s in range(26):
        candidate = caesar_cipher(ciphertext, s, decrypt=True)
        words = re.findall(r"[a-z]+", candidate.lower())
        score = sum(1 for w in words if w in common_words)
        if score > best_score:
            best_score, best_shift, best_text = score, s, candidate
    return best_shift, best_text

vocab = {"python", "string", "is", "fast", "and", "secure", "with", "template"}
encrypted = caesar_cipher("Python string is fast and secure with template!", shift=19)
shift_found, plain = crack_caesar(encrypted, vocab)
print(f"Bản mã  : {encrypted}")
print(f"Khóa tìm: shift={shift_found} -> {plain}")`,
      solutionOutput: `Bản mã  : Irmahg lmkbgz bl ytlk tgw lxvnkx pbma kxfietkx!
Khóa tìm: shift=19 -> Python string is fast and secure with template!`,
      explanation: 'Vì không gian khóa của Caesar Cipher chỉ có 26 trường hợp và `str.translate()` chạy cực nhanh, việc thử cả 26 khóa kết hợp đếm từ vựng tiếng Anh giúp tìm ra chính xác `shift=19` chỉ trong chưa đầy 1 mili-giây.'
    },
    {
      level: 'Khó',
      title: 'Bộ dựng thuộc tính thẻ HTML (html_attrs) bằng t-string Python 3.14',
      problem: 'Mở rộng bộ dựng HTML ở Dự án 5: Viết hàm xử lý t-string hỗ trợ truyền một `dict` các thuộc tính HTML (ví dụ `attrs = {"href": "https://example.com?a=1&b=2", "title": \'Click "here"\'}`) khi đặt format_spec là `:attrs` (tức `t"<a {attrs:attrs}>{label}</a>"`). Hàm sẽ tự động biến `dict` đó thành chuỗi thuộc tính `href="..." title="..."` đã được `html.escape(..., quote=True)` an toàn.',
      hint: 'Kiểm tra `if item.format_spec == "attrs" and isinstance(val, dict):`, duyệt qua từng cặp `(k, v)` trong dict và tạo `f\'{k}="{html.escape(str(v), quote=True)}"\'`.',
      solutionCode: `import html
from string.templatelib import Template

def render_tag(tpl: Template) -> str:
    parts = []
    for item in tpl:
        if isinstance(item, str):
            parts.append(item)
        elif item.format_spec == "attrs" and isinstance(item.value, dict):
            attr_str = " ".join(
                f'{k}="{html.escape(str(v), quote=True)}"'
                for k, v in item.value.items()
            )
            parts.append(attr_str)
        else:
            parts.append(html.escape(str(item.value), quote=True))
    return "".join(parts)

link_attrs = {"href": "https://python.org/search?q=a&b=2", "data-tip": 'Nhấn "vào đây"'}
label = "<Python 3.14.8>"
print(render_tag(t"<a {link_attrs:attrs}>{label}</a>"))`,
      solutionOutput: `<a href="https://python.org/search?q=a&amp;b=2" data-tip="Nhấn &quot;vào đây&quot;">&lt;Python 3.14.8&gt;</a>`,
      explanation: 'Nhờ thuộc tính `item.format_spec` trên đối tượng `Interpolation` của PEP 750, ta có thể định nghĩa các quy tắc định dạng chuyên biệt theo ngữ cảnh như `:attrs`, `:json`, `:url` ngay bên trong `t"..."`.'
    }
  ],
  quiz: [
    {
      question: 'Khi viết hàm `slugify_vi(text)` để bỏ dấu tiếng Việt, vì sao chỉ dùng `unicodedata.normalize("NFD", text)` và lọc bỏ nhóm `"Mn"` vẫn KHÔNG chuyển được chữ `"đ"` thành `"d"`?',
      options: [
        'Vì hàm normalize("NFD") bị lỗi với tiếng Việt',
        'Vì trong chuẩn Unicode, chữ "đ" (U+0111 - Latin Small Letter D with Stroke) là một ký tự cơ sở độc lập có nét gạch ngang thân chữ, không phải chữ "d" ghép với dấu kết hợp (combining mark)',
        'Vì chữ "đ" thuộc bảng mã UCS-4 (4 bytes)',
        'Vì chữ "đ" là ký tự dấu câu'
      ],
      correctIndex: 1,
      explanation: 'NFD chỉ tách các chữ cái có dấu mũ/dấu thanh tổ hợp (như `ở` -> `o` + ` ̛` + ` ̉`). Còn `đ` (`U+0111`) và `Đ` (`U+0110`) là ký tự cơ sở nguyên khối nên phải `.replace("đ", "d").replace("Đ", "d")` riêng.'
    },
    {
      question: 'Tính năng nào được giới thiệu trong Python 3.12 (PEP 701) đã thay đổi hoàn toàn cách viết f-strings?',
      options: [
        'Thêm tiền tố t"..." cho Template Strings',
        'Cho phép tái sử dụng cùng loại dấu nháy bên trong biểu thức { ... }, lồng f-string tùy ý, sử dụng ký tự backslash (\\n) và viết comment trong f-string',
        'Thêm phương thức str.removeprefix()',
        'Tự động mã hóa HTML cho mọi f-string'
      ],
      correctIndex: 1,
      explanation: 'PEP 701 trong Python 3.12 đã viết lại bộ phân tích cú pháp f-string dựa trên PEG parser, gỡ bỏ toàn bộ các giới hạn khó chịu trước đó về việc tái sử dụng dấu nháy và ký tự `\\` bên trong `{...}`.'
    },
    {
      question: 'Trong Dự án 5 (`html_render` với `t"..."` của Python 3.14.8), lớp `SafeHTML(str)` đóng vai trò gì?',
      options: [
        'Tự động xóa mọi thẻ HTML khỏi chuỗi',
        'Đánh dấu một chuỗi là mã HTML đã được kiểm duyệt an toàn (hoặc đã được render từ một t-string con) để không bị `html.escape()` mã hóa lặp lần thứ hai (double-escaping)',
        'Nén chuỗi HTML sang định dạng gzip',
        'Chuyển đổi HTML sang câu lệnh SQL'
      ],
      correctIndex: 1,
      explanation: 'Khi ghép các thành phần giao diện lồng nhau, thành phần con đã được escape an toàn và trả về dưới kiểu `SafeHTML`. Nhờ kiểm tra `isinstance(val, SafeHTML)`, thành phần cha giữ nguyên các thẻ HTML của thành phần con mà chỉ escape các chuỗi dữ liệu thô.'
    }
  ],
  summary: [
    'Quy trình chuẩn để tạo URL slug tiếng Việt (`slugify_vi`): thay `đ/Đ -> d`, phân rã `NFD`, lọc bỏ ký tự nhóm `"Mn"`, chuyển chữ thường và dùng Regex gom các ký tự đặc biệt thành dấu `"-"`.',
    'Kết hợp `unicodedata.normalize("NFC", s).casefold()` trước khi tách từ hoặc kiểm tra Palindrome để xử lý chính xác mọi bảng mã và phương thức gõ tiếng Việt.',
    'Sử dụng `str.maketrans()` + `str.translate()` cho các bài toán dịch chuyển bảng chữ cái như Caesar Cipher để đạt tốc độ xử lý cấp độ C.',
    'Python 3.14.8 với Template Strings (`t"..."`, PEP 750) đánh dấu đỉnh cao tiến hóa của chuỗi Python (sau f-strings 3.6, `f"{x=}"` 3.8, `removeprefix` 3.9, `StrEnum` 3.11, PEP 701 3.12, `replace(count=...)` 3.13), mở ra chuẩn mực mới cho việc xây dựng HTML/SQL/DSL an toàn.'
  ]
};
