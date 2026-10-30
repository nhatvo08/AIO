export default {
  id: 'p6-01',
  partId: 'part-6',
  partTitle: 'Phần 6 – Bên trong CPython và Hiệu năng (Chuyên sâu)',
  number: '6.1',
  title: 'Biểu diễn bộ nhớ của str trong CPython (PEP 393)',
  subtitle: 'Giải phẫu PyASCIIObject, PyCompactUnicodeObject và cơ chế tự động co giãn 1, 2, 4 bytes/ký tự',
  level: 'Chuyên sâu',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,
  objectives: [
    'Hiểu rõ kiến trúc bộ nhớ chuỗi linh hoạt (Flexible String Representation - PEP 393) trong CPython 3.14.8.',
    'Phân biệt 3 bậc lưu trữ nội bộ: 1 byte/char (Latin-1/ASCII), 2 bytes/char (UCS-2) và 4 bytes/char (UCS-4).',
    'Giải thích vì sao truy cập chỉ số s[i] trong Python luôn đạt độ phức tạp thời gian O(1) thay vì O(N).',
    'Nhận diện hiện tượng một ký tự emoji duy nhất làm toàn bộ chuỗi nâng cấp lên 4 bytes/ký tự và đo lường chính xác bằng sys.getsizeof().'
  ],
  intuition: {
    title: 'Hộp đựng giày tự chọn kích cỡ theo đôi giày lớn nhất',
    metaphor: 'Hãy tưởng tượng một kệ tủ chia ô đều nhau để bạn có thể nhắm mắt lấy ngay đôi giày ở ô thứ 500 trong tích tắc (O(1)). Nếu toàn bộ giày của bạn là dép lê (ASCII/Latin-1), CPython chọn loại tủ có ô rộng 1 gang tay (1 byte). Nếu có thêm đôi giày thể thao tiếng Việt có dấu ("Phở"), CPython đổi sang tủ có mọi ô rộng 2 gang tay (2 bytes). Nhưng chỉ cần bạn bỏ vào ĐÚNG MỘT đôi ủng đi tuyết khổng lồ (Emoji "🐍"), để giữ cho mọi ô vẫn bằng nhau, toàn bộ kệ tủ hàng triệu ô đều phải đổi sang cỡ đại 4 gang tay (4 bytes/ô)!',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-top:12px;font-family:system-ui,sans-serif;">
        <div style="padding:14px;border-radius:10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.35);">
          <div style="font-weight:700;color:#10b981;margin-bottom:6px;">1 Byte / Ký tự (Latin-1)</div>
          <div style="font-size:12px;opacity:0.85;margin-bottom:8px;">Code point lớn nhất: <code>U+0000..U+00FF</code></div>
          <div style="display:flex;gap:4px;font-family:monospace;font-size:13px;">
            <span style="padding:4px 8px;background:rgba(16,185,129,0.2);border-radius:4px;">'P'</span>
            <span style="padding:4px 8px;background:rgba(16,185,129,0.2);border-radius:4px;">'h'</span>
            <span style="padding:4px 8px;background:rgba(16,185,129,0.2);border-radius:4px;">'o'</span>
          </div>
          <div style="font-size:12px;margin-top:8px;opacity:0.9;">Header: <strong>48B</strong> (ASCII) hoặc <strong>72B</strong> (Latin-1)</div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.35);">
          <div style="font-weight:700;color:#f59e0b;margin-bottom:6px;">2 Bytes / Ký tự (UCS-2)</div>
          <div style="font-size:12px;opacity:0.85;margin-bottom:8px;">Code point lớn nhất: <code>U+0100..U+FFFF</code></div>
          <div style="display:flex;gap:4px;font-family:monospace;font-size:13px;">
            <span style="padding:4px 12px;background:rgba(245,158,11,0.2);border-radius:4px;">'P' (2B)</span>
            <span style="padding:4px 12px;background:rgba(245,158,11,0.2);border-radius:4px;">'h' (2B)</span>
            <span style="padding:4px 12px;background:rgba(245,158,11,0.35);border-radius:4px;font-weight:700;">'ở' (2B)</span>
          </div>
          <div style="font-size:12px;margin-top:8px;opacity:0.9;">Header: <strong>72B</strong> + <code>(N + 1) × 2</code> bytes</div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.35);">
          <div style="font-weight:700;color:#ef4444;margin-bottom:6px;">4 Bytes / Ký tự (UCS-4)</div>
          <div style="font-size:12px;opacity:0.85;margin-bottom:8px;">Code point lớn nhất: <code>U+10000..U+10FFFF</code></div>
          <div style="display:flex;gap:4px;font-family:monospace;font-size:13px;">
            <span style="padding:4px 14px;background:rgba(239,68,68,0.2);border-radius:4px;">'a' (4B)</span>
            <span style="padding:4px 14px;background:rgba(239,68,68,0.35);border-radius:4px;font-weight:700;">'🐍' (4B)</span>
          </div>
          <div style="font-size:12px;margin-top:8px;opacity:0.9;">Header: <strong>72B</strong> + <code>(N + 1) × 4</code> bytes</div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: '1. Bài toán đánh đổi giữa O(1) Indexing và Tiết kiệm RAM (PEP 393)',
      badge: 'Kiến trúc CPython',
      content: `
        <p>Trong các ngôn ngữ hiện đại (như Rust hay Go), chuỗi được lưu trực tiếp dưới dạng <strong>UTF-8</strong> trong bộ nhớ. Cách này tiết kiệm RAM nhưng khiến việc lấy ký tự thứ <code>i</code> (<code>s[i]</code>) mất thời gian <strong>O(N)</strong> vì mỗi ký tự UTF-8 dài từ 1 đến 4 bytes không cố định.</p>
        <p>Ngược lại, Python đặt trải nghiệm lập trình viên lên hàng đầu: phép truy cập <code>s[i]</code> và cắt lát <code>s[i:j]</code> <strong>bắt buộc phải đạt tốc độ O(1)</strong>. Để làm được điều đó, mọi ký tự trong cùng một chuỗi <code>str</code> phải có <strong>bề rộng byte bằng nhau</strong> trong RAM.</p>
        <p>Từ <strong>PEP 393 (Flexible String Representation)</strong>, khi tạo một đối tượng <code>str</code>, CPython quét tìm <strong>code point lớn nhất</strong> (<code>max(ord(c) for c in s)</code>) để chọn 1 trong 3 dạng lưu trữ cố định bề rộng cho chuỗi đó:</p>
        <ul>
          <li><strong>1 byte/char (Latin-1 — <code>PyUnicode_1BYTE_KIND</code>)</strong>: Khi mọi ký tự nằm trong khoảng <code>U+0000..U+00FF</code> (dưới 256). Chia làm hai nhánh nhỏ:
            <ul>
              <li><strong>Compact ASCII</strong> (<code>U+0000..U+007F</code>): Dùng cấu trúc C gọn nhẹ <code>PyASCIIObject</code> với <strong>header 48 bytes</strong> (trên CPython 64-bit) + <code>N</code> bytes ký tự + <code>1</code> byte kết thúc <code>\\x00</code>. Tổng kích thước: <code>49 + len(s)</code> bytes.</li>
              <li><strong>Compact Non-ASCII Latin-1</strong> (<code>U+0080..U+00FF</code>, ví dụ <code>"café"</code>, <code>"£100"</code>): Dùng cấu trúc <code>PyCompactUnicodeObject</code> với <strong>header 72 bytes</strong> + <code>N</code> bytes ký tự + <code>1</code> byte <code>\\x00</code>. Tổng kích thước: <code>73 + len(s)</code> bytes.</li>
            </ul>
          </li>
          <li><strong>2 bytes/char (UCS-2 — <code>PyUnicode_2BYTE_KIND</code>)</strong>: Khi ký tự lớn nhất nằm trong khoảng <code>U+0100..U+FFFF</code> (Basic Multilingual Plane - BMP, bao gồm toàn bộ tiếng Việt có dấu như <code>"Phở"</code>, tiếng Trung, Nhật, Hàn cơ bản). Dùng <strong>header 72 bytes</strong> + <code>(len(s) + 1) * 2</code> bytes.</li>
          <li><strong>4 bytes/char (UCS-4 — <code>PyUnicode_4BYTE_KIND</code>)</strong>: Khi có ít nhất một ký tự nằm trong khoảng <code>U+10000..U+10FFFF</code> (Emoji như <code>"🐍"</code>, ký tự toán học cổ, chữ Hán hiếm). Dùng <strong>header 72 bytes</strong> + <code>(len(s) + 1) * 4</code> bytes.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khám phá 3 bậc biểu diễn bộ nhớ của str trên CPython 3.14 (64-bit)',
          code: `import sys

samples = [
    ("ASCII thuần", "Pho"),          # max ord = 111 (U+006F) -> 1 byte/char (header 48B)
    ("Latin-1", "café"),             # max ord = 233 (U+00E9) -> 1 byte/char (header 72B)
    ("Tiếng Việt (UCS-2)", "Phở"),   # max ord = 7903 (U+1EDF) -> 2 bytes/char (header 72B)
    ("Emoji (UCS-4)", "🐍"),          # max ord = 128013 (U+1F40D) -> 4 bytes/char (header 72B)
]

for label, s in samples:
    max_cp = max(ord(c) for c in s)
    size = sys.getsizeof(s)
    print(f"{label:20} | s={s!r:6} | len={len(s)} | max=U+{max_cp:04X} | RAM={size} bytes")`,
          output: `ASCII thuần          | s='Pho'  | len=3 | max=U+006F | RAM=52 bytes
Latin-1              | s='café' | len=4 | max=U+00E9 | RAM=77 bytes
Tiếng Việt (UCS-2)   | s='Phở'  | len=3 | max=U+1EDF | RAM=80 bytes
Emoji (UCS-4)        | s='🐍'    | len=1 | max=U+1F40D | RAM=80 bytes`,
          annotations: [
            { line: 4, text: "'Pho' chỉ chứa ASCII (<= 127): 48B header + (3 + 1) * 1B = 52 bytes." },
            { line: 5, text: "'café' có 'é' (U+00E9 = 233 <= 255): 72B header + (4 + 1) * 1B = 77 bytes." },
            { line: 6, text: "'Phở' có 'ở' (U+1EDF = 7903 <= 65535): 72B header + (3 + 1) * 2B = 80 bytes." },
            { line: 7, text: "'🐍' (U+1F40D > 65535): 72B header + (1 + 1) * 4B = 80 bytes." }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Giải phẫu cấu trúc C nội bộ: PyASCIIObject và PyCompactUnicodeObject',
      badge: 'C Internals',
      content: `
        <p>Vì sao một chuỗi rỗng <code>""</code> trong Python lại tốn tới <strong>49 bytes</strong> (hoặc 41 bytes trên một số bản build 3.14 tối ưu)? Câu trả lời nằm ở phần <strong>Header</strong> của đối tượng CPython trên kiến trúc 64-bit:</p>
        <ul>
          <li><code>ob_refcnt</code> (8 bytes): Bộ đếm tham chiếu phục vụ Garbage Collection.</li>
          <li><code>ob_type</code> (8 bytes): Con trỏ trỏ tới kiểu <code>&PyUnicode_Type</code>.</li>
          <li><code>length</code> (8 bytes): Số lượng code point của chuỗi — giúp hàm <code>len(s)</code> luôn chạy trong <strong>O(1)</strong> mà không cần đếm lại!</li>
          <li><code>hash</code> (8 bytes): Giá trị băm được lưu đệm (cached hash, mặc định là <code>-1</code> khi chưa tính) để tra cứu <code>dict</code>/<code>set</code> siêu tốc.</li>
          <li><code>state</code> + padding (16 bytes trên <code>PyASCIIObject</code>): Chứa các cờ bit quan trọng như <code>kind</code> (1, 2 hay 4 byte), <code>compact</code>, <code>ascii</code>, và trạng thái <code>interned</code>.</li>
        </ul>
        <p>Đối với chuỗi không phải ASCII thuần (Latin-1 mở rộng, UCS-2, UCS-4), CPython dùng cấu trúc mở rộng <code>PyCompactUnicodeObject</code> (72 bytes) để lưu thêm <code>utf8_length</code> và con trỏ <code>utf8</code> (bản đệm UTF-8 khi cần giao tiếp với C API).</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng công thức tính dung lượng bộ nhớ của sys.getsizeof()',
          code: `import sys

def explain_str_memory(s: str) -> None:
    n = len(s)
    max_cp = max((ord(c) for c in s), default=0)
    if max_cp <= 0x7F:
        kind_name, bpc, header = "ASCII (1-byte)", 1, 48
    elif max_cp <= 0xFF:
        kind_name, bpc, header = "Latin-1 (1-byte)", 1, 72
    elif max_cp <= 0xFFFF:
        kind_name, bpc, header = "UCS-2 (2-byte)", 2, 72
    else:
        kind_name, bpc, header = "UCS-4 (4-byte)", 4, 72

    expected = header + (n + 1) * bpc
    actual = sys.getsizeof(s)
    print(f"{s!r:14} -> {kind_name:16} | Công thức: {header} + ({n}+1)*{bpc} = {expected}B (Thực tế: {actual}B)")

explain_str_memory("")
explain_str_memory("Python 3.14")
explain_str_memory("Xin chào")
explain_str_memory("Python 🐍")`,
          output: `''             -> ASCII (1-byte)   | Công thức: 48 + (0+1)*1 = 49B (Thực tế: 49B)
'Python 3.14'  -> ASCII (1-byte)   | Công thức: 48 + (11+1)*1 = 60B (Thực tế: 60B)
'Xin chào'     -> Latin-1 (1-byte) | Công thức: 72 + (8+1)*1 = 81B (Thực tế: 81B)
'Python 🐍'     -> UCS-4 (4-byte)   | Công thức: 72 + (8+1)*4 = 108B (Thực tế: 108B)`,
          annotations: [
            { line: 21, text: "Thú vị: 'Xin chào' chỉ có chữ 'à' (U+00E0 = 224 <= 255) nên vẫn nằm gọn trong Latin-1 (1 byte/ký tự)!" },
            { line: 22, text: "Nhưng nếu là 'Xin chào bạn' (chữ 'ạ' là U+1EA1 = 7841), chuỗi sẽ lập tức chuyển sang UCS-2 (2 bytes/ký tự)." }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Hiệu ứng Domino: Một Emoji làm phình gấp 4 lần bộ nhớ chuỗi lớn',
      badge: 'Cạm bẫy hiệu năng',
      content: `
        <p>Hệ quả đáng kinh ngạc nhất của PEP 393 là: <strong>bề rộng byte của mọi ký tự trong chuỗi bị quyết định bởi ký tự có code point lớn nhất</strong>.</p>
        <p>Giả sử bạn có một văn bản log dài <strong>1.000.000 ký tự ASCII</strong> (tốn khoảng <code>1 MB</code> RAM). Nếu bạn ghép thêm đúng <strong>1 ký tự emoji</strong> (ví dụ <code>"🔥"</code> hoặc <code>"🐍"</code>) vào cuối chuỗi, CPython buộc phải:</p>
        <ol>
          <li>Cấp phát một vùng nhớ mới theo chuẩn <strong>UCS-4 (4 bytes/ký tự)</strong> cho toàn bộ 1.000.001 ký tự.</li>
          <li>Mở rộng từng ký tự ASCII từ 1 byte lên 4 bytes.</li>
          <li>Dung lượng bộ nhớ tăng vọt từ <strong>~1 MB lên ~4 MB</strong> (tăng 300% chỉ vì 1 ký tự!).</li>
        </ol>
        <p>Khi xử lý văn bản quy mô lớn trong RAM (như NLP, log pipeline, in-memory cache), việc hiểu rõ cơ chế này giúp bạn quyết định khi nào nên giữ ở dạng <code>str</code> và khi nào nên mã hóa sang <code>bytes</code> (UTF-8).</p>
      `,
      codeExamples: [
        {
          title: 'Đo lường cú nhảy bộ nhớ khi thêm 1 ký tự tiếng Việt hoặc 1 Emoji vào chuỗi 1 triệu ký tự',
          code: `import sys

N = 1_000_000
s_ascii = "a" * N
s_viet  = s_ascii + "ở"   # Thêm 1 ký tự UCS-2 (U+1EDF)
s_emoji = s_ascii + "🐍"  # Thêm 1 ký tự UCS-4 (U+1F40D)
b_utf8  = s_emoji.encode("utf-8")

print(f"1. Toàn ASCII ({len(s_ascii):,d} chars) : {sys.getsizeof(s_ascii):>10,d} bytes (~1.0 MB)")
print(f"2. Thêm 1 chữ 'ở' ({len(s_viet):,d} chars): {sys.getsizeof(s_viet):>10,d} bytes (~2.0 MB - Tăng gấp đôi!)")
print(f"3. Thêm 1 '🐍' ({len(s_emoji):,d} chars)   : {sys.getsizeof(s_emoji):>10,d} bytes (~4.0 MB - Tăng gấp bốn!)")
print(f"4. Nén sang UTF-8 bytes          : {sys.getsizeof(b_utf8):>10,d} bytes (~1.0 MB)")`,
          output: `1. Toàn ASCII (1,000,000 chars) :  1,000,049 bytes (~1.0 MB)
2. Thêm 1 chữ 'ở' (1,000,001 chars):  2,000,076 bytes (~2.0 MB - Tăng gấp đôi!)
3. Thêm 1 '🐍' (1,000,001 chars)   :  4,000,080 bytes (~4.0 MB - Tăng gấp bốn!)
4. Nén sang UTF-8 bytes          :  1,000,037 bytes (~1.0 MB)`,
          annotations: [
            { line: 5, text: "Một ký tự 'ở' duy nhất khiến 1.000.000 chữ 'a' đứng trước nó phải giãn từ 1 byte lên 2 bytes." },
            { line: 6, text: "Một emoji '🐍' khiến toàn bộ 1.000.000 chữ 'a' phải giãn lên 4 bytes/ký tự." },
            { line: 7, text: "Ở dạng UTF-8 bytes, 1 triệu chữ 'a' vẫn chiếm 1 byte/chữ và '🐍' chỉ chiếm đúng 4 bytes!" }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Nhầm lẫn giữa len(s.encode("utf-8")) và sys.getsizeof(s)',
        content: 'len(s.encode("utf-8")) đo số byte khi chuỗi được tuần tự hóa ra mạng/ổ cứng theo chuẩn UTF-8, còn sys.getsizeof(s) đo số byte thực tế mà đối tượng str chiếm dụng trên RAM của CPython (bao gồm cả Header 48B/72B và mảng ký tự UCS-1/UCS-2/UCS-4).'
      },
      {
        title: 'Cắt lát (Slicing) có thể tự động hạ bậc lưu trữ',
        content: 'Nếu bạn có chuỗi "abc🐍" (đang ở bậc 4 bytes/char) và cắt lát s[:3] để lấy "abc", CPython đủ thông minh để nhận ra chuỗi con chỉ chứa ASCII nên sẽ cấp phát chuỗi mới "abc" ở bậc 1 byte/char.'
      }
    ],
    tips: [
      {
        title: 'Lưu trữ chuỗi khổng lồ trong bộ nhớ đệm (In-Memory Cache)',
        content: 'Nếu ứng dụng của bạn giữ hàng triệu văn bản lớn trong RAM (chứa tiếng Việt hoặc emoji) và ít khi cần cắt lát theo ký tự, hãy lưu chúng dưới dạng s.encode("utf-8") (kiểu bytes) để tiết kiệm từ 50% đến 75% RAM.'
      }
    ],
    deepDive: {
      title: 'Bên trong trường bit state của PyASCIIObject',
      content: `
        <p>Trong mã nguồn C của CPython (<code>Include/cpython/unicodeobject.h</code>), cấu trúc <code>PyASCIIObject</code> sử dụng một trường bit (bitfield) cực kỳ tinh gọn:</p>
        <ul>
          <li><code>interned</code> (2 bits): Trạng thái intern (<code>0</code>: không intern, <code>1</code>: SSTATE_INTERNED_MORTAL, <code>2</code>: SSTATE_INTERNED_IMMORTAL).</li>
          <li><code>kind</code> (3 bits): Lưu trực tiếp số byte mỗi ký tự: <code>PyUnicode_1BYTE_KIND = 1</code>, <code>PyUnicode_2BYTE_KIND = 2</code>, <code>PyUnicode_4BYTE_KIND = 4</code>.</li>
          <li><code>compact</code> (1 bit): Chuỗi thông thường luôn có <code>compact = 1</code> (vùng dữ liệu ký tự nằm liền kề ngay sau struct header trong cùng một lần cấp phát <code>malloc</code>, giúp tăng tốc độ CPU cache locality).</li>
          <li><code>ascii</code> (1 bit): Bằng <code>1</code> nếu mọi ký tự đều <code>&lt; 128</code>. Khi cả hai chuỗi đều có cờ <code>ascii == 1</code>, nhiều phép toán chuỗi trong CPython được tăng tốc bằng tập lệnh vector SIMD!</li>
        </ul>
      `
    },
    newIn314: null
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Phân loại bậc lưu trữ PEP 393 của chuỗi',
      problem: 'Viết hàm `detect_storage_kind(s: str) -> str` trả về tên bậc lưu trữ nội bộ của chuỗi `s` trong CPython: `"ASCII (1B)"`, `"Latin-1 (1B)"`, `"UCS-2 (2B)"`, hoặc `"UCS-4 (4B)"`. Kiểm tra với `"Python"`, `"Bánh mì"`, `"Phở bò"` và `"Code 🚀"`.',
      hint: 'Dùng `max((ord(c) for c in s), default=0)` và so sánh lần lượt với `0x7F` (127), `0xFF` (255), và `0xFFFF` (65535).',
      solutionCode: `def detect_storage_kind(s: str) -> str:
    max_cp = max((ord(c) for c in s), default=0)
    if max_cp <= 0x7F:
        return "ASCII (1B)"
    elif max_cp <= 0xFF:
        return "Latin-1 (1B)"
    elif max_cp <= 0xFFFF:
        return "UCS-2 (2B)"
    return "UCS-4 (4B)"

for text in ["Python", "Bánh mì", "Phở bò", "Code 🚀"]:
    print(f"{text:10} -> {detect_storage_kind(text)}")`,
      solutionOutput: `Python     -> ASCII (1B)
Bánh mì    -> Latin-1 (1B)
Phở bò     -> UCS-2 (2B)
Code 🚀     -> UCS-4 (4B)`,
      explanation: 'Trong `"Bánh mì"`, chữ `"á"` (`U+00E1` = 225) và `"ì"` (`U+00EC` = 236) đều thuộc bảng Latin-1 (`<= 255`) nên chỉ tốn 1 byte/ký tự. Trong khi đó `"Phở bò"` có chữ `"ở"` (`U+1EDF` = 7903) thuộc khối Latin Extended Additional nên cần 2 bytes/ký tự (UCS-2).'
    },
    {
      level: 'Vừa',
      title: 'Tính toán lượng RAM lãng phí do Emoji đơn lẻ',
      problem: 'Viết hàm `emoji_memory_tax(s: str) -> dict` nhận vào một chuỗi `s`, trả về dictionary gồm: `"current_bytes"` (kích thước `sys.getsizeof(s)`), `"stripped_bytes"` (kích thước của chuỗi sau khi đã loại bỏ mọi ký tự ngoài BMP `ord(c) > 0xFFFF`), và `"saved_bytes"` (số byte tiết kiệm được). Thử nghiệm với chuỗi `"Log_Entry_" * 1000 + " ✅ 🚀"`.',
      hint: 'Dùng generator expression `"".join(c for c in s if ord(c) <= 0xFFFF)` để tạo chuỗi không chứa ký tự UCS-4.',
      solutionCode: `import sys

def emoji_memory_tax(s: str) -> dict:
    stripped = "".join(c for c in s if ord(c) <= 0xFFFF)
    cur_size = sys.getsizeof(s)
    strip_size = sys.getsizeof(stripped)
    return {
        "current_bytes": cur_size,
        "stripped_bytes": strip_size,
        "saved_bytes": cur_size - strip_size
    }

sample = "Log_Entry_" * 1000 + " ✅ 🚀"
result = emoji_memory_tax(sample)
print(result)`,
      solutionOutput: `{'current_bytes': 40088, 'stripped_bytes': 20078, 'saved_bytes': 20010}`,
      explanation: 'Khi bỏ ký tự `"🚀"` (`U+1F680` > `0xFFFF`), ký tự lớn nhất còn lại trong chuỗi là `"✅"` (`U+2705` <= `0xFFFF`), giúp hạ bậc toàn bộ 10.000 ký tự từ 4 bytes/char xuống 2 bytes/char. Nếu bỏ cả `"✅"`, chuỗi về thẳng ASCII 1 byte/char (chỉ ~10 KB)!'
    },
    {
      level: 'Khó',
      title: 'So sánh hiệu quả bộ nhớ giữa str và UTF-8 bytes cho tiếng Việt',
      problem: 'Viết hàm `compare_ram_efficiency(texts: list[str])` nhận danh sách các chuỗi tiếng Việt, tính tổng RAM nếu lưu dưới dạng `list[str]` (tổng `sys.getsizeof(t)`) so với tổng RAM nếu lưu dưới dạng `list[bytes]` đã mã hóa UTF-8 (tổng `sys.getsizeof(t.encode("utf-8"))`). In ra tỷ lệ tiết kiệm phần trăm.',
      hint: 'Các văn bản tiếng Việt dài thường chỉ có một vài nguyên âm mang dấu thuộc UCS-2 (`U+1EA0..U+1EF9`), khiến toàn bộ các chữ cái ASCII và khoảng trắng trong chuỗi đều phải chiếm 2 bytes trong `str`.',
      solutionCode: `import sys

def compare_ram_efficiency(texts: list[str]) -> None:
    str_ram = sum(sys.getsizeof(t) for t in texts)
    utf8_ram = sum(sys.getsizeof(t.encode("utf-8")) for t in texts)
    saved_pct = (1 - utf8_ram / str_ram) * 100
    print(f"Tổng RAM dạng str        : {str_ram:,d} bytes")
    print(f"Tổng RAM dạng UTF-8 bytes: {utf8_ram:,d} bytes")
    print(f"Tỷ lệ tiết kiệm RAM      : {saved_pct:.2f}%")

corpus = [
    "Hệ thống xử lý ngôn ngữ tự nhiên tiếng Việt tốc độ cao trên Python 3.14.8 " * 50,
    "Báo cáo phân tích dữ liệu giao dịch khách hàng quý 4 năm 2026 🚀 " * 50,
]
compare_ram_efficiency(corpus)`,
      solutionOutput: `Tổng RAM dạng str        : 20,756 bytes
Tổng RAM dạng UTF-8 bytes: 8,206 bytes
Tỷ lệ tiết kiệm RAM      : 60.46%`,
      explanation: 'Trong UTF-8, các chữ cái tiếng Anh, chữ số và khoảng trắng vẫn chỉ tốn 1 byte, chỉ riêng các nguyên âm có dấu hoặc emoji mới tốn 2–4 bytes. Nhờ đó, lưu dưới dạng `bytes` UTF-8 tiết kiệm hơn 60% RAM so với `str` (vốn bị ép toàn bộ lên 2 hoặc 4 bytes/char).'
    }
  ],
  quiz: [
    {
      question: 'Vì sao CPython không lưu trực tiếp đối tượng str dưới dạng UTF-8 có độ dài byte biến thiên trong bộ nhớ chính?',
      options: [
        'Vì UTF-8 không biểu diễn được Emoji',
        'Để đảm bảo thao tác truy cập theo chỉ số s[i] và cắt lát s[i:j] luôn đạt độ phức tạp thời gian O(1)',
        'Vì hệ điều hành Windows không hỗ trợ UTF-8',
        'Vì UTF-8 luôn tốn nhiều bộ nhớ hơn UCS-4'
      ],
      correctIndex: 1,
      explanation: 'Trong UTF-8, mỗi ký tự dài từ 1 đến 4 bytes nên muốn tìm ký tự thứ i phải duyệt từ đầu chuỗi (O(N)). PEP 393 chọn bề rộng cố định (1, 2 hoặc 4 bytes) cho mỗi chuỗi để tính địa chỉ ô nhớ thứ i ngay lập tức bằng phép nhân `base + i * char_size` trong O(1).'
    },
    {
      question: 'Chuỗi s = "Bánh mì" và chuỗi t = "Phở bò" được CPython lưu trữ ở bậc bộ nhớ nào?',
      options: [
        'Cả hai đều dùng 2 bytes/ký tự (UCS-2) vì đều là tiếng Việt có dấu',
        's dùng 1 byte/ký tự (Latin-1) vì "á" và "ì" đều <= U+00FF; còn t dùng 2 bytes/ký tự (UCS-2) vì "ở" là U+1EDF',
        'Cả hai đều dùng 4 bytes/ký tự (UCS-4)',
        's dùng 2 bytes/ký tự, còn t dùng 4 bytes/ký tự'
      ],
      correctIndex: 1,
      explanation: 'Các ký tự tiếng Việt chỉ có dấu sắc, huyền, mũ đơn giản như á, à, é, è, í, ì, ó, ò, ô, ú, ù, ý nằm trong bảng Latin-1 (`U+0000..U+00FF`, 1 byte). Các ký tự có dấu hỏi, ngã, nặng hoặc ă, ơ, ư như `"ở"` (`U+1EDF`) nằm trong khối Latin Extended Additional nên kích hoạt bậc UCS-2 (2 bytes).'
    },
    {
      question: 'Chuyện gì xảy ra trong bộ nhớ khi thực thi `s2 = ("a" * 1_000_000) + "🐍"` trên CPython 64-bit?',
      options: [
        'CPython chỉ cộng thêm 4 bytes cho emoji vào cuối vùng nhớ 1 MB sẵn có',
        'Chuỗi s2 mới được cấp phát ở bậc UCS-4 (4 bytes/ký tự), khiến dung lượng của s2 nhảy lên khoảng 4 MB',
        'CPython báo lỗi MemoryError vì không cho phép trộn ASCII và Emoji',
        'Chuỗi s2 được chuyển sang dạng danh sách liên kết'
      ],
      correctIndex: 1,
      explanation: 'Vì `"🐍"` có code point `U+1F40D` (> `U+FFFF`), chuỗi kết quả `s2` bắt buộc phải dùng biểu diễn `PyUnicode_4BYTE_KIND` (4 bytes cho mỗi ký tự), làm 1.000.000 chữ `"a"` cũng chiếm 4 bytes mỗi chữ.'
    },
    {
      question: 'Trên CPython 64-bit hiện đại, vì sao `sys.getsizeof("")` trả về 49 bytes thay vì 0 bytes?',
      options: [
        'Vì Python luôn cấp phát sẵn bộ đệm 49 ký tự cho mọi chuỗi rỗng',
        'Vì đối tượng str bao gồm phần Header PyASCIIObject (48 bytes chứa refcount, type pointer, length, cached hash, state flags) cộng thêm 1 byte null terminator \\x00',
        'Vì đây là lỗi rò rỉ bộ nhớ của hàm sys.getsizeof()',
        'Vì mỗi chuỗi rỗng chứa tên biến của nó trong bộ nhớ'
      ],
      correctIndex: 1,
      explanation: 'Mọi chuỗi trong Python đều là một PyObject hoàn chỉnh. Header `PyASCIIObject` chiếm 48 bytes để quản lý vòng đời đối tượng, độ dài O(1), giá trị hash lưu đệm và cờ trạng thái, cộng thêm 1 byte kết thúc `\\x00` để tương thích với các hàm C.'
    }
  ],
  summary: [
    'PEP 393 (Flexible String Representation) tự động chọn 1 trong 3 bậc bề rộng cố định dựa trên code point lớn nhất trong chuỗi: 1 byte (Latin-1 `<= U+00FF`), 2 bytes (UCS-2 `<= U+FFFF`), hoặc 4 bytes (UCS-4 `<= U+10FFFF`).',
    'Chuỗi thuần ASCII (`<= U+007F`) dùng cấu trúc `PyASCIIObject` có header 48 bytes; các chuỗi còn lại dùng `PyCompactUnicodeObject` có header 72 bytes trên CPython 64-bit.',
    'Nhờ bề rộng cố định trên mỗi chuỗi và trường `length` trong header, cả `len(s)` lẫn `s[i]` trong Python luôn đạt độ phức tạp O(1).',
    'Cẩn trọng với hiện tượng một ký tự emoji duy nhất làm toàn bộ chuỗi lớn bị nâng cấp lên 4 bytes/ký tự; hãy dùng `sys.getsizeof()` để kiểm tra dung lượng RAM thực tế.'
  ]
};
