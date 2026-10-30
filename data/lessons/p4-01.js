export default {
  id: 'p4-01',
  partId: 'part-4',
  partTitle: 'Phần 4 – Unicode, bytes và Mã hóa (Nâng cao)',
  number: '4.1',
  title: 'Kiến trúc Unicode, UTF-8/16/32 và Ranh giới str ↔ bytes',
  subtitle: 'Hiểu bản chất Code Point, các chuẩn mã hóa UTF và thao tác với bytes / bytearray trong Python 3.14',
  level: 'Nâng cao',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: 'unicode-viewer',
  objectives: [
    'Phân biệt rõ khái niệm ký tự trừu tượng (Code Point) trong chuẩn Unicode và cách lưu trữ vật lý dưới dạng byte (Encoding).',
    'So sánh cơ chế hoạt động, ưu nhược điểm và kích thước bộ nhớ của UTF-8, UTF-16 và UTF-32.',
    'Nắm vững ranh giới bất khả xâm phạm giữa kiểu văn bản (str) và kiểu nhị phân (bytes, bytearray) trong Python 3.',
    'Thực hiện chuyển đổi hai chiều với encode() / decode(), thao tác byte mức thấp với bytes (bất biến) và bytearray (khả biến).'
  ],
  intuition: {
    title: 'Bản nhạc trên giấy và Sóng âm trong đĩa CD',
    metaphor: 'Hãy tưởng tượng chuỗi văn bản (str) giống như một bản khuông nhạc: mỗi nốt nhạc (ký tự) có một tên gọi và cao độ quy ước toàn cầu — đó chính là Unicode Code Point (ví dụ chữ "A" là U+0041, chữ "Đ" là U+0110, biểu tượng 🐍 là U+1F40D). Nhưng máy tính, ổ cứng hay đường truyền mạng không lưu được "nốt nhạc trừu tượng", chúng chỉ lưu được dãy các con số từ 0 đến 255 (bytes). Quá trình chuyển bản nhạc thành xung số để ghi lên đĩa là encode(), còn đọc xung số từ đĩa để khôi phục lại bản nhạc là decode(). Cùng một bản nhạc, bạn có thể ghi ở định dạng MP3, FLAC hay WAV — cũng như cùng một chuỗi Unicode có thể mã hóa thành UTF-8, UTF-16 hay UTF-32!',
    visualHtml: `
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:center;font-family:monospace;font-size:13px;padding:14px;background:rgba(15,23,42,0.6);border:1px solid #334155;border-radius:12px;">
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-left:4px solid #38bdf8;">
          <div style="color:#38bdf8;font-weight:bold;margin-bottom:6px;">Thế giới Văn bản (str)</div>
          <div style="font-size:16px;color:#f8fafc;margin-bottom:4px;">"AĐ🐍"</div>
          <div style="color:#94a3b8;font-size:12px;">Code Points trừu tượng:</div>
          <div style="color:#e2e8f0;margin-top:4px;">U+0041 · U+0110 · U+1F40D</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;text-align:center;">
          <div style="background:#0284c7;color:#fff;padding:4px 10px;border-radius:999px;font-size:11px;">.encode('utf-8') ➔</div>
          <div style="background:#059669;color:#fff;padding:4px 10px;border-radius:999px;font-size:11px;">⬅ .decode('utf-8')</div>
        </div>
        <div style="background:#1e293b;padding:12px;border-radius:8px;border-left:4px solid #10b981;">
          <div style="color:#10b981;font-weight:bold;margin-bottom:6px;">Thế giới Nhị phân (bytes)</div>
          <div style="font-size:13px;color:#f8fafc;margin-bottom:4px;">b'A\\xc4\\x90\\xf0\\x9f\\x90\\x8d'</div>
          <div style="color:#94a3b8;font-size:12px;">7 bytes trong bộ nhớ / mạng:</div>
          <div style="color:#a7f3d0;margin-top:4px;">41 | C4 90 | F0 9F 90 8D</div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Unicode Code Point và Biểu diễn nội bộ PEP 393',
      badge: 'Nền tảng Unicode',
      content: `
        <p><strong>Unicode không phải là một bảng mã lưu trữ byte</strong>, mà là một bảng danh mục toàn cầu gán cho mỗi ký tự một mã số nguyên duy nhất gọi là <strong>Code Point</strong>, viết theo quy ước hệ thập lục phân là <code>U+XXXX</code> (từ <code>U+0000</code> đến <code>U+10FFFF</code> — tổng cộng không gian hơn 1,1 triệu mã).</p>
        <ul>
          <li>Hàm <code>ord(char)</code> trả về số nguyên Code Point của một ký tự Unicode.</li>
          <li>Hàm <code>chr(code_point)</code> nhận số nguyên (<code>0 <= i <= 0x10FFFF</code>) và trả về ký tự tương ứng.</li>
          <li>Trong chuỗi Python, bạn có thể viết ký tự bằng mã thoát: <code>\\xNN</code> (2 chữ số hex, <code>U+0000..U+00FF</code>), <code>\\uNNNN</code> (4 chữ số hex, mặt phẳng BMP <code>U+0000..U+FFFF</code>), hoặc <code>\\UNNNNNNNN</code> (8 chữ số hex cho toàn bộ không gian Unicode, bao gồm Emoji và ký tự cổ).</li>
        </ul>
        <p>Từ Python 3.3+ đến Python 3.14 (theo <strong>PEP 393 – Flexible String Representation</strong>), CPython tự động chọn độ rộng lưu trữ tối ưu trong RAM cho đối tượng <code>str</code> dựa trên ký tự có Code Point lớn nhất trong chuỗi: <strong>1 byte/ký tự</strong> (Latin-1, <code><= U+00FF</code>), <strong>2 bytes/ký tự</strong> (UCS-2, <code><= U+FFFF</code>), hoặc <strong>4 bytes/ký tự</strong> (UCS-4, <code><= U+10FFFF</code>). Nhờ vậy, truy cập chỉ mục <code>s[i]</code> trong Python luôn đạt độ phức tạp $O(1)$!</p>
      `,
      codeExamples: [
        {
          title: 'Khám phá Code Point và cơ chế cấp phát bộ nhớ PEP 393',
          code: `import sys

chars = ['A', 'é', 'iệt', '🐍']
for item in ['A', 'é', 'Đ', '🐍']:
    cp = ord(item)
    print(f"Ký tự: {item!r:4} | ord={cp:6d} | Hex: U+{cp:04X} | RAM: {sys.getsizeof(item)} bytes")

# Chuỗi có cùng độ dài 4 ký tự nhưng kích thước RAM khác nhau theo PEP 393
s_ascii  = "abcd"      # Max U+0064 -> 1 byte/char (Latin-1)
s_viet   = "abđef"[:4] # Max U+0111 -> 2 bytes/char (UCS-2)
s_emoji  = "abc🐍"     # Max U+1F40D -> 4 bytes/char (UCS-4)

print("ASCII (1B/char):", sys.getsizeof(s_ascii))
print("Việt  (2B/char):", sys.getsizeof(s_viet))
print("Emoji (4B/char):", sys.getsizeof(s_emoji))`,
          output: `Ký tự: 'A'  | ord=    65 | Hex: U+0041 | RAM: 42 bytes
Ký tự: 'é'  | ord=   233 | Hex: U+00E9 | RAM: 66 bytes
Ký tự: 'Đ'  | ord=   272 | Hex: U+0110 | RAM: 66 bytes
Ký tự: '🐍' | ord=128013 | Hex: U+1F40D | RAM: 76 bytes
ASCII (1B/char): 45
Việt  (2B/char): 66
Emoji (4B/char): 88`,
          annotations: [
            { line: 4, text: 'ord() trả về giá trị số nguyên của Unicode Code Point.' },
            { line: 5, text: 'Định dạng U+{cp:04X} in mã chuẩn Unicode dạng thập lục phân.' },
            { line: 11, text: 'Chỉ cần 1 ký tự Emoji xuất hiện, toàn bộ chuỗi nâng lên chuẩn UCS-4 (4 bytes/ký tự) để giữ truy cập chỉ mục O(1).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Giải phẫu UTF-8, UTF-16 và UTF-32',
      badge: 'Chuẩn mã hóa',
      content: `
        <p>Khi ghi chuỗi ra file, gửi qua socket mạng hay lưu vào cơ sở dữ liệu, Python phải chuyển các Code Point thành dãy byte theo một <strong>chuẩn mã hóa (Character Encoding)</strong>:</p>
        <ul>
          <li><strong>UTF-8 (Mặc định của Python 3.14 & Web hiện đại):</strong> Độ dài biến thiên từ <strong>1 đến 4 bytes</strong> cho mỗi Code Point. Tương thích ngược 100% với ASCII (<code>U+0000..U+007F</code> tốn đúng 1 byte). Các ký tự tiếng Việt có dấu thường chiếm 2 hoặc 3 bytes (ví dụ <code>'đ'</code> là 2 bytes, <code>'ệ'</code> là 3 bytes), còn Emoji chiếm 4 bytes. Không phụ thuộc thứ tự byte (Endianness).</li>
          <li><strong>UTF-16:</strong> Độ dài biến thiên <strong>2 hoặc 4 bytes</strong>. Các ký tự trong BMP (<code>U+0000..U+FFFF</code>) tốn 2 bytes; ký tự ngoài BMP dùng một cặp <strong>Surrogate Pair</strong> (4 bytes). Vì đọc theo cụm 16-bit nên cần biết thứ tự byte (Little-Endian hay Big-Endian). Mặc định <code>'utf-16'</code> sẽ chèn 2 byte <strong>BOM (Byte Order Mark - <code>\\xff\\xfe</code>)</strong> ở đầu; muốn bỏ BOM hãy dùng <code>'utf-16-le'</code> hoặc <code>'utf-16-be'</code>.</li>
          <li><strong>UTF-32:</strong> Độ dài cố định <strong>4 bytes</strong> cho mọi Code Point (cộng thêm 4 bytes BOM nếu dùng <code>'utf-32'</code>, hoặc không BOM với <code>'utf-32-le'</code>). Đơn giản nhưng tốn bộ nhớ gấp 4 lần với văn bản tiếng Anh.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh biểu diễn byte của UTF-8, UTF-16-LE và UTF-32-LE',
          code: `text = "Aệ🐍"

for enc in ["utf-8", "utf-16-le", "utf-16", "utf-32-le"]:
    raw = text.encode(enc)
    print(f"{enc:10} ({len(raw):2d} bytes): {raw.hex(' ').upper()}")

# Kiểm tra kích thước UTF-8 của từng ký tự trong "Aệ🐍"
for ch in text:
    b = ch.encode("utf-8")
    print(f"Ký tự {ch!r} (U+{ord(ch):04X}) -> {len(b)} byte(s) UTF-8: {b.hex(' ').upper()}")`,
          output: `utf-8      ( 8 bytes): 41 E1 BB 87 F0 9F 90 8D
utf-16-le  ( 8 bytes): 41 00 C7 1E 3D D8 0D DC
utf-16     (10 bytes): FF FE 41 00 C7 1E 3D D8 0D DC
utf-32-le  (12 bytes): 41 00 00 00 C7 1E 00 00 0D F4 01 00
Ký tự 'A' (U+0041) -> 1 byte(s) UTF-8: 41
Ký tự 'ệ' (U+1EC7) -> 3 byte(s) UTF-8: E1 BB 87
Ký tự '🐍' (U+1F40D) -> 4 byte(s) UTF-8: F0 9F 90 8D`,
          annotations: [
            { line: 5, text: 'Phương thức .hex(" ") giúp quan sát từng byte dưới dạng mã hex cách nhau bởi khoảng trắng.' },
            { line: 10, text: 'Chữ "ệ" (U+1EC7) có cả dấu mũ lẫn dấu nặng, nằm ở vùng Latin Extended Additional nên chiếm 3 bytes UTF-8.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Ranh giới str vs bytes, encode()/decode() và bytearray',
      badge: 'Thực chiến Nhị phân',
      content: `
        <p>Trong Python 3, <code>str</code> và <code>bytes</code> không bao giờ tự động ép kiểu ngầm định với nhau:</p>
        <ul>
          <li><code>"abc" == b"abc"</code> luôn trả về <code>False</code>; nối <code>"a" + b"b"</code> lập tức ném lỗi <code>TypeError</code>.</li>
          <li><strong>Khác biệt khi lấy chỉ mục (Indexing):</strong> Lấy 1 phần tử của chuỗi <code>"ABC"[0]</code> trả về chuỗi con độ dài 1 (<code>'A'</code>), nhưng lấy 1 phần tử của <code>b"ABC"[0]</code> lại trả về số nguyên <code>65</code> (<code>int</code>)! Muốn lấy đối tượng <code>bytes</code> độ dài 1, bạn phải dùng cắt lát (slicing): <code>b"ABC"[0:1]</code> trả về <code>b'A'</code>.</li>
          <li><strong><code>bytes</code> (Bất biến - Immutable):</strong> Khởi tạo bằng <code>b"..."</code>, <code>bytes([65, 66])</code>, <code>bytes(5)</code> (5 byte 0) hoặc <code>bytes.fromhex("41 42")</code>. Có thể làm key của <code>dict</code> hoặc phần tử của <code>set</code>.</li>
          <li><strong><code>bytearray</code> (Khả biến - Mutable):</strong> Dãy byte cho phép thay đổi trực tiếp tại chỗ (in-place mutation) mà không cần tạo bản sao bộ nhớ mới — cực kỳ hiệu quả khi xử lý gói tin mạng (packet buffer), mã hóa XOR hoặc đọc stream dữ liệu lớn.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sự khác biệt giữa str, bytes (bất biến) và bytearray (khả biến)',
          code: `s = "Việt"
b = s.encode("utf-8")
print("Đối tượng bytes:", b, "| Số byte:", len(b))
print("Indexing b[0]:", b[0], type(b[0]).__name__)
print("Slicing  b[0:1]:", b[0:1], type(b[0:1]).__name__)

# Khởi tạo bytearray khả biến từ bytes để chỉnh sửa tại chỗ
buf = bytearray(b)
buf[0] = ord('B')  # Đổi chữ 'V' (86) thành 'B' (66) ngay tại chỗ
buf.extend(b" Nam")
print("Sau khi sửa bytearray:", buf.decode("utf-8"))

# Chuyển đổi qua lại với chuỗi Hex chuẩn
packet = bytes.fromhex("48 65 6c 6c 6f")
print("Từ Hex -> str:", packet.decode("ascii"))`,
          output: `Đối tượng bytes: b'Vi\\xe1\\xbb\\x87t' | Số byte: 6
Indexing b[0]: 86 int
Slicing  b[0:1]: b'V' bytes
Sau khi sửa bytearray: Biệt Nam
Từ Hex -> str: Hello`,
          annotations: [
            { line: 4, text: 'Cạm bẫy kinh điển: b[0] trả về int (86), không phải b"V"!' },
            { line: 9, text: 'bytearray cho phép gán lại từng byte bằng số nguyên trong khoảng 0..255.' },
            { line: 14, text: 'bytes.fromhex() bỏ qua khoảng trắng và chuyển chuỗi thập lục phân thành đối tượng bytes.' }
          ]
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Nhầm lẫn giữa len(str) và kích thước byte thực tế',
        content: 'Hàm len(s) trên kiểu str đếm số lượng Unicode Code Point chứ KHÔNG đếm số byte. Ví dụ len("Việt") == 4, nhưng len("Việt".encode("utf-8")) == 6. Khi giới hạn trường VARCHAR(N) theo byte hoặc đóng gói header Content-Length HTTP, luôn phải tính len(s.encode("utf-8")).'
      },
      {
        title: 'So sánh phần tử bytes với ký tự: b"A"[0] == b"A" là False!',
        content: 'Vì b"A"[0] là số nguyên 65 còn b"A" là đối tượng bytes, phép so sánh b"A"[0] == b"A" trả về False! Hãy so sánh b[0] == ord("A") (hoặc 65), hoặc dùng lát cắt b[0:1] == b"A".'
      },
      {
        title: 'Gọi str(b"hello") thay vì b"hello".decode()',
        content: 'Gọi str(b"hello") mà không truyền encoding sẽ tạo ra chuỗi đại diện "\'b\'hello\'\'" (dài 8 ký tự có chữ b ở đầu)! Luôn dùng b.decode("utf-8") hoặc str(b, "utf-8").'
      }
    ],
    tips: [
      {
        title: 'Mẹo nhớ quy tắc "Unicode Sandwich"',
        content: 'Kiến trúc chuẩn trong mọi ứng dụng Python: Giải mã (decode bytes -> str) ngay tại rìa đầu vào (đọc file, nhận request mạng), xử lý 100% nghiệp vụ bên trong bằng str (Unicode), và chỉ mã hóa (encode str -> bytes) ở rìa đầu ra cuối cùng.'
      },
      {
        title: 'Dùng utf-8-sig khi đọc file CSV/Text tạo bởi Excel trên Windows',
        content: 'Nhiều phần mềm trên Windows chèn 3 byte BOM (EF BB BF) vào đầu file UTF-8 khiến ký tự đầu tiên bị dính "\\ufeff". Dùng encoding="utf-8-sig" sẽ tự động bóc bỏ BOM khi đọc và thêm BOM khi ghi.'
      }
    ],
    deepDive: {
      title: 'Cách UTF-8 tự đồng bộ hóa (Self-Synchronizing) nhờ tiền tố Bit',
      content: `
        <p>Tại sao UTF-8 lại thống trị hơn 98% trang web toàn cầu? Nhờ thiết kế tiền tố bit thiên tài của Ken Thompson và Rob Pike:</p>
        <ul>
          <li><strong>1 byte (ASCII):</strong> <code>0xxxxxxx</code> (bit đầu luôn là <code>0</code>, giá trị <code>0x00..0x7F</code>).</li>
          <li><strong>Byte mở đầu của ký tự nhiều byte:</strong> Số bit <code>1</code> liên tiếp ở đầu báo hiệu tổng số byte: <code>110xxxxx</code> (2 bytes), <code>1110xxxx</code> (3 bytes), <code>11110xxx</code> (4 bytes).</li>
          <li><strong>Byte nối tiếp (Continuation byte):</strong> Luôn bắt đầu bằng <code>10xxxxxx</code> (giá trị <code>0x80..0xBF</code>).</li>
        </ul>
        <p>Hệ quả: Không bao giờ một byte ASCII (<code>0xxxxxxx</code>) trùng với một phần của ký tự đa byte! Nếu nhảy vào giữa một luồng byte bất kỳ, bộ giải mã biết ngay mình đang đứng ở byte nối tiếp (<code>10xxxxxx</code>) và chỉ cần dịch tối đa 3 byte là tìm thấy đầu ký tự tiếp theo.</p>
      `
    },
    newIn314: null
  },
  exercises: [
    {
      level: 'Dễ',
      title: 'Bảng giám định Code Point và UTF-8',
      problem: 'Viết hàm inspect_text(s: str) nhận vào một chuỗi và in ra cho mỗi ký tự: ký tự đó, mã Unicode dạng U+XXXX (ít nhất 4 chữ số hex in hoa), và chuỗi hex các byte UTF-8 cách nhau bởi dấu gạch ngang "-". Thử nghiệm với chuỗi "Đà Nẵng 🏖".',
      hint: 'Dùng ord(ch) với format f"U+{ord(ch):04X}" và ch.encode("utf-8").hex("-").upper().',
      solutionCode: `def inspect_text(s: str) -> None:
    for ch in s:
        cp = f"U+{ord(ch):04X}"
        utf8_hex = ch.encode("utf-8").hex("-").upper()
        print(f"{ch!r:4} -> {cp:7} -> UTF-8: {utf8_hex}")

inspect_text("Đà 🏖")`,
      solutionOutput: `'Đ'  -> U+0110  -> UTF-8: C4-90
'à'  -> U+00E0  -> UTF-8: C3-A0
' '  -> U+0020  -> UTF-8: 20
'🏖'  -> U+1F3D6 -> UTF-8: F0-9F-8F-96`,
      explanation: 'ord(ch) lấy giá trị Code Point nguyên, định dạng :04X đảm bảo tối thiểu 4 ký tự Hex, còn .hex("-") tự động nối các byte bằng dấu gạch ngang.'
    },
    {
      level: 'Vừa',
      title: 'Cắt chuỗi theo giới hạn Byte UTF-8 an toàn',
      problem: 'Cơ sở dữ liệu legacy giới hạn trường tên tối đa max_bytes byte theo chuẩn UTF-8. Nếu cắt thô b[:max_bytes] trên đối tượng bytes, bạn có thể cắt đôi một ký tự tiếng Việt đa byte gây lỗi UnicodeDecodeError. Hãy viết hàm truncate_utf8(s: str, max_bytes: int) -> str cắt chuỗi sao cho kết quả encode UTF-8 không vượt quá max_bytes và không làm hỏng ký tự nào.',
      hint: 'Có thể duyệt từng ký tự, hoặc tận dụng cấu trúc byte nối tiếp của UTF-8, hoặc dùng b[:max_bytes].decode("utf-8", errors="ignore"). Hãy viết cách kiểm soát trực tiếp trên byte nối tiếp (0x80..0xBF tức (b & 0xC0) == 0x80).',
      solutionCode: `def truncate_utf8(s: str, max_bytes: int) -> str:
    raw = s.encode("utf-8")
    if len(raw) <= max_bytes:
        return s
    # Lùi lại nếu điểm cắt rơi vào byte nối tiếp (10xxxxxx -> 0x80..0xBF)
    cut = max_bytes
    while cut > 0 and (raw[cut] & 0b1100_0000) == 0b1000_0000:
        cut -= 1
    return raw[:cut].decode("utf-8")

sample = "Lập trình Python"
for limit in [5, 6, 7]:
    res = truncate_utf8(sample, limit)
    print(f"Giới hạn {limit}B -> {res!r} ({len(res.encode('utf-8'))} bytes)")`,
      solutionOutput: `Giới hạn 5B -> 'Lập' (5 bytes)
Giới hạn 6B -> 'Lập ' (6 bytes)
Giới hạn 7B -> 'Lập t' (7 bytes)`,
      explanation: 'Trong "Lập", chữ "L" là 1 byte, chữ "ậ" là 3 bytes (E1 BB AD), chữ "p" là 1 byte -> tổng 5 bytes. Nhờ kiểm tra bit đầu (raw[cut] & 0xC0) == 0x80, thuật toán chạy O(1) (lùi tối đa 3 bước) mà không bao giờ cắt đứt gãy ký tự UTF-8.'
    },
    {
      level: 'Khó',
      title: 'Mã hóa XOR tại chỗ với bytearray',
      problem: 'Viết hàm xor_cipher(data: bytes, key: bytes) -> bytes thực hiện phép XOR từng byte của data với key lặp vòng (repeating-key XOR) bằng cách dùng bytearray khả biến. Chứng minh tính đối xứng: mã hóa chuỗi tiếng Việt "Bí mật Quốc gia 🔒" với khóa b"PY314" rồi giải mã lại.',
      hint: 'Khởi tạo buf = bytearray(data), duyệt i in range(len(buf)) và gán buf[i] ^= key[i % len(key)].',
      solutionCode: `def xor_cipher(data: bytes, key: bytes) -> bytes:
    buf = bytearray(data)
    klen = len(key)
    for i in range(len(buf)):
        buf[i] ^= key[i % klen]
    return bytes(buf)

secret = "Bí mật 🔒".encode("utf-8")
key = b"PY314"

encrypted = xor_cipher(secret, key)
print("Bản mã (Hex):", encrypted.hex(" "))

decrypted = xor_cipher(encrypted, key).decode("utf-8")
print("Giải mã     :", decrypted)`,
      solutionOutput: `Bản mã (Hex): 12 9a f6 5c d5 91 a7 51 14 d0 a0 67
Giải mã     : Bí mật 🔒`,
      explanation: 'Thao tác trực tiếp trên bytearray với toán tử ^= sửa đổi bộ nhớ tại chỗ (in-place) trên các số nguyên 0..255 mà không phải tạo hàng loạt đối tượng bytes trung gian.'
    }
  ],
  quiz: [
    {
      question: 'Kết quả của biểu thức b"Python"[0] trong Python 3.14 là gì?',
      options: [
        'Số nguyên 80 (kiểu int)',
        'Đối tượng bytes b"P"',
        'Chuỗi ký tự "P" (kiểu str)',
        'Ném ngoại lệ TypeError vì bytes không hỗ trợ indexing'
      ],
      correctIndex: 0,
      explanation: 'Đối tượng bytes là một dãy bất biến các số nguyên 8-bit (0..255). Do đó truy cập chỉ mục đơn b[0] trả về mã ASCII của "P" là 80 (kiểu int). Muốn lấy b"P", phải dùng slicing b[0:1].'
    },
    {
      question: 'Chuỗi s = "Việt" có len(s) và len(s.encode("utf-8")) lần lượt bằng bao nhiêu?',
      options: [
        'len(s) == 4 và len(s.encode("utf-8")) == 6',
        'len(s) == 4 và len(s.encode("utf-8")) == 4',
        'len(s) == 6 và len(s.encode("utf-8")) == 6',
        'len(s) == 4 và len(s.encode("utf-8")) == 8'
      ],
      correctIndex: 0,
      explanation: 'Chuỗi "Việt" gồm 4 Code Point ("V", "i", "ệ", "t") nên len(s) == 4. Khi mã hóa UTF-8, "V", "i", "t" mỗi chữ tốn 1 byte, riêng "ệ" (U+1EC7) tốn 3 bytes, tổng cộng là 6 bytes.'
    },
    {
      question: 'Theo PEP 393 (Flexible String Representation), điều gì xảy ra với bộ nhớ trong RAM khi nối thêm một Emoji 🐍 (U+1F40D) vào chuỗi toàn ký tự ASCII?',
      options: [
        'Chuỗi kết quả chuyển sang biểu diễn nội bộ UCS-4 (4 bytes cho mỗi ký tự trong chuỗi)',
        'Chỉ riêng ký tự Emoji tốn 4 bytes, các ký tự ASCII vẫn tốn 1 byte như UTF-8',
        'Python ném lỗi UnicodeError vì không thể trộn ASCII và Emoji',
        'Toàn bộ chuỗi được nén lại bằng UTF-16'
      ],
      correctIndex: 0,
      explanation: 'Để đảm bảo thao tác lấy chỉ mục s[i] luôn có độ phức tạp O(1), CPython chọn độ rộng cố định cho toàn bộ chuỗi theo Code Point lớn nhất: 1 byte (Latin-1), 2 bytes (UCS-2) hoặc 4 bytes (UCS-4).'
    },
    {
      question: 'Phương thức nào dùng để biến đổi một đối tượng bytes khả biến tại chỗ mà không tạo đối tượng mới sau mỗi lần gán?',
      options: [
        'Sử dụng kiểu bytearray thay cho bytes',
        'Gọi phương thức bytes.mutate()',
        'Truyền tham số mutable=True vào str.encode()',
        'Dùng phép gán trực tiếp b[0] = 65 trên kiểu bytes'
      ],
      correctIndex: 0,
      explanation: 'Kiểu bytes là bất biến (immutable). Để sửa đổi từng byte tại chỗ (ví dụ buf[0] = 65 hoặc buf.append(10)), bạn phải sử dụng kiểu bytearray.'
    }
  ],
  summary: [
    'str lưu trữ chuỗi các Unicode Code Point trừu tượng (U+0000..U+10FFFF), còn bytes/bytearray lưu trữ dãy các số nguyên 8-bit (0..255).',
    'Chuyển từ str sang bytes dùng s.encode(encoding), chuyển từ bytes về str dùng b.decode(encoding); chuẩn mặc định trong Python 3.14 là UTF-8.',
    'UTF-8 dùng 1–4 bytes/ký tự (tương thích ASCII), UTF-16 dùng 2 hoặc 4 bytes, UTF-32 dùng cố định 4 bytes.',
    'Lấy chỉ mục b[i] trên bytes trả về số nguyên int, trong khi cắt lát b[i:i+1] trả về đối tượng bytes; dùng bytearray khi cần thay đổi dữ liệu nhị phân tại chỗ.'
  ]
};
