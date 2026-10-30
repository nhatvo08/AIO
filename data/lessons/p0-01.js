export default {
  id: 'p0-01',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.1',
  title: 'Máy tính lưu và xử lý thông tin như thế nào',
  subtitle: 'Hiểu từ gốc rễ phần cứng: Bit, byte, hệ cơ số, bù hai và cách chữ số biến thành dữ liệu trong Python',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu vì sao máy tính chỉ làm việc với số nhị phân (0 và 1) từ mức transistor vật lý đến ô nhớ RAM.',
    'Thành thạo chuyển đổi qua lại giữa hệ thập phân (cơ số 10), nhị phân (cơ số 2) và thập lục phân (hex, cơ số 16) bằng tay và bằng các hàm Python.',
    'Nắm bản chất cách phần cứng biểu diễn số nguyên âm qua bù hai (two\'s complement) và sự khác biệt với số nguyên vô hạn của Python.',
    'Hiểu trực giác vì sao số thập phân như 0.1 khi đổi sang nhị phân lại bị vô hạn tuần hoàn (tiền đề số thực float).',
    'Phân biệt rõ ràng giữa ký tự văn bản (`str`), điểm mã số và dãy byte thô (`bytes`).'
  ],

  intuition: {
    title: 'Hàng triệu công tắc đèn và chiếc tủ ngăn kéo vô tận',
    metaphor: 'Hãy tưởng tượng máy tính giống như một tòa nhà khổng lồ có hàng tỷ bóng đèn siêu nhỏ (transistor). Mỗi bóng đèn chỉ có đúng 2 trạng thái: TẮT (0) hoặc BẬT (1). Đó là 1 bit. Bộ nhớ RAM giống như một dãy tủ ngăn kéo kéo dài bất tận được đánh số thứ tự từ 0 trở đi (địa chỉ bộ nhớ). Mỗi ngăn kéo chứa đúng 8 bóng đèn (1 byte). CPU là một anh thợ cực kỳ chăm chỉ nhưng chỉ biết làm những việc hết sức đơn giản: mở ngăn kéo số X, lấy số ra, cộng vào số ở ngăn kéo số Y, rồi cất kết quả vào ngăn kéo số Z. Mọi phần mềm kỳ diệu bạn thấy — từ trò chơi 3D, trí tuệ nhân tạo đến trình duyệt web — bên dưới đều chỉ là trò chơi sắp xếp và bật tắt các bóng đèn đó.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">CẤU TRÚC 1 BYTE (8 BITS) &amp; TRỌNG SỐ NHỊ PHÂN</div>
        <div style="display:grid;grid-template-columns:repeat(8, 1fr);gap:6px;text-align:center;">
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.7rem;color:var(--text-muted);">2⁷=128</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-primary);">0</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.7rem;color:var(--text-muted);">2⁶=64</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-primary);">1</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.7rem;color:var(--text-muted);">2⁵=32</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-primary);">0</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.7rem;color:var(--text-muted);">2⁴=16</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-primary);">0</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.7rem;color:var(--text-muted);">2³=8</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-primary);">0</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.7rem;color:var(--text-muted);">2²=4</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-primary);">0</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.7rem;color:var(--text-muted);">2¹=2</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-primary);">0</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.7rem;color:var(--text-muted);">2⁰=1</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--accent-primary);">1</div>
          </div>
        </div>
        <div style="text-align:center;color:var(--success);font-weight:600;margin-top:4px;">
          Nhị phân: 0b01000001 = 64 + 1 = 65 (Thập phân) = 0x41 (Hex) = Ký tự 'A' (ASCII)
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Bit, Byte và Kiến trúc Bộ nhớ Máy tính',
      badge: 'Cơ sở Phần cứng',
      content: `
        <p>Để trở thành một lập trình viên hiểu bản chất, điều đầu tiên cần ghi nhớ: <strong>máy tính không thông minh như ta nghĩ</strong>. Ở tầng vật lý, mạch điện tử chỉ nhận biết được hai mức điện áp (cao và thấp). Ta quy ước điện áp cao là <code>1</code> và điện áp thấp là <code>0</code>.</p>
        <ul>
          <li><strong>Bit (Binary digit):</strong> Đơn vị thông tin nhỏ nhất, chỉ mang giá trị <code>0</code> hoặc <code>1</code>.</li>
          <li><strong>Byte:</strong> Một nhóm gồm 8 bit liên tiếp. Vì mỗi bit có 2 trạng thái, nên 1 byte có thể biểu diễn được $2^8 = 256$ trạng thái khác nhau (từ số nguyên <code>0</code> đến <code>255</code>).</li>
          <li><strong>Bộ nhớ RAM (Random Access Memory):</strong> Là một dải tuyến tính các byte. Mỗi byte có một <em>địa chỉ bộ nhớ</em> (memory address) duy nhất, thường được biểu diễn dưới dạng số thập lục phân như <code>0x7ffd8a12</code>.</li>
          <li><strong>CPU:</strong> Bộ vi xử lý trung tâm, chỉ có khả năng thực hiện các lệnh sơ cấp: nạp byte từ RAM vào thanh ghi, làm phép cộng/trừ/bit-shift, so sánh và nhảy sang địa chỉ khác.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khám phá biểu diễn nhị phân và độ dài bit trong Python',
          code: `# Xem biểu diễn nhị phân của số nguyên bằng hàm bin()
number = 65
print("Hệ thập phân:", number)
print("Dạng nhị phân:", bin(number))
print("Số bit tối thiểu để lưu số này:", number.bit_length())

# 1 byte có thể chứa tối đa số 255 (tất cả 8 bit đều là 1)
max_byte = 255
print("255 dạng nhị phân:", bin(max_byte))
print("Số bit cần dùng:", max_byte.bit_length())`,
          output: `Hệ thập phân: 65
Dạng nhị phân: 0b1000001
Số bit tối thiểu để lưu số này: 7
255 dạng nhị phân: 0b11111111
Số bit cần dùng: 8`,
          annotations: [
            { line: 2, text: 'Khai báo một số nguyên trong hệ thập phân thông thường.' },
            { line: 4, text: 'Hàm bin() trả về chuỗi bắt đầu bằng tiền tố "0b", biểu thị số nhị phân.' },
            { line: 5, text: 'Phương thức bit_length() tính chính xác số bit cần thiết (bỏ qua các bit 0 ở đầu).' },
            { line: 8, text: '255 tương ứng với 8 bit 1 liên tiếp (11111111).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Các hệ cơ số và lý do lập trình viên dùng Thập lục phân (Hex)',
      badge: 'Toán học Máy tính',
      content: `
        <p>Con người dùng hệ cơ số 10 (thập phân) vì chúng ta có 10 ngón tay. Máy tính dùng hệ cơ số 2 (nhị phân). Nhưng tại sao màn hình gỡ lỗi, địa chỉ bộ nhớ và mã màu CSS luôn dùng hệ cơ số 16 (thập lục phân - Hexadecimal)?</p>
        <p>Lý do rất đơn giản: <strong>16 là lũy thừa của 2 ($16 = 2^4$)</strong>. Đúng 4 bit nhị phân (gọi là 1 <em>nibble</em>) tương ứng hoàn hảo với đúng 1 ký tự hex (từ <code>0</code>–<code>9</code> và <code>A</code>–<code>F</code>). Do đó, 1 byte (8 bit) luôn được viết gọn gàng bằng đúng <strong>2 ký tự hex</strong>, ví dụ <code>0b11111111 = 0xFF</code>.</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Thập phân</th>
                <th>Nhị phân (4 bit)</th>
                <th>Hex</th>
                <th>Thập phân</th>
                <th>Nhị phân (4 bit)</th>
                <th>Hex</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0</td><td>0000</td><td><code>0</code></td><td>8</td><td>1000</td><td><code>8</code></td></tr>
              <tr><td>1</td><td>0001</td><td><code>1</code></td><td>9</td><td>1001</td><td><code>9</code></td></tr>
              <tr><td>2</td><td>0010</td><td><code>2</code></td><td>10</td><td>1010</td><td><code>A</code></td></tr>
              <tr><td>3</td><td>0011</td><td><code>3</code></td><td>11</td><td>1011</td><td><code>B</code></td></tr>
              <tr><td>4</td><td>0100</td><td><code>4</code></td><td>12</td><td>1100</td><td><code>C</code></td></tr>
              <tr><td>5</td><td>0101</td><td><code>5</code></td><td>13</td><td>1101</td><td><code>D</code></td></tr>
              <tr><td>6</td><td>0110</td><td><code>6</code></td><td>14</td><td>1110</td><td><code>E</code></td></tr>
              <tr><td>7</td><td>0111</td><td><code>7</code></td><td>15</td><td>1111</td><td><code>F</code></td></tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi qua lại giữa các hệ cơ số trong Python',
          code: `# Khai báo số nguyên bằng các tiền tố khác nhau
dec_num = 42
bin_num = 0b101010
hex_num = 0x2A

print("So sánh giá trị:", dec_num == bin_num == hex_num)

# Chuyển từ thập phân sang các hệ khác (kết quả là chuỗi str)
print("Sang nhị phân:", bin(dec_num))
print("Sang bát phân (cơ số 8):", oct(dec_num))
print("Sang thập lục phân:", hex(dec_num))

# Chuyển từ chuỗi bất kỳ sang số thập phân bằng int(x, base)
print("Chuỗi '101010' cơ số 2 ->", int("101010", 2))
print("Chuỗi '2A' cơ số 16 ->", int("2A", 16))
print("Chuỗi 'ff' cơ số 16 ->", int("ff", 16))`,
          output: `So sánh giá trị: True
Sang nhị phân: 0b101010
Sang bát phân (cơ số 8): 0o52
Sang thập lục phân: 0x2a
Chuỗi '101010' cơ số 2 -> 42
Chuỗi '2A' cơ số 16 -> 42
Chuỗi 'ff' cơ số 16 -> 255`,
          annotations: [
            { line: 2, text: 'Các tiền tố trong Python: 0b (nhị phân), 0o (bát phân), 0x (thập lục phân).' },
            { line: 6, text: 'Dù viết ở hệ nào, trong bộ nhớ chúng đều là cùng một giá trị số học.' },
            { line: 14, text: 'Hàm int() với tham số thứ hai cho phép phân tích chuỗi văn bản theo cơ số bất kỳ từ 2 đến 36.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Bù hai, Giới hạn phần cứng và Hạt mầm của Sai số Dấu phẩy động',
      badge: 'Bản chất sâu sắc',
      content: `
        <p>Khi nhìn vào bộ nhớ phần cứng, có 3 sự thật cốt lõi mà lập trình viên cần hiểu:</p>
        <ol>
          <li><strong>Số nguyên âm và Mã Bù Hai (Two's Complement):</strong> Để CPU không phải thiết kế hai mạch tính riêng cho phép cộng và phép trừ, phần cứng quy ước bit cao nhất (bit ngoài cùng bên trái) làm bit dấu (0 là dương, 1 là âm). Để lấy số âm của $x$, CPU đảo toàn bộ bit của $x$ rồi cộng thêm 1. Nhờ cơ chế này, phép tính $A - B$ đơn giản biến thành $A + (-B)$.</li>
          <li><strong>Giới hạn bit phần cứng vs int của Python:</strong> Ngôn ngữ C, C++, Java có kiểu số nguyên bị giới hạn cố định (ví dụ 32-bit: $-2^{31}$ đến $2^{31}-1$). Nếu tính vượt ngưỡng, máy sẽ bị tràn số (*integer overflow*). <strong>Python thì không!</strong> Kiểu <code>int</code> của Python tự động mở rộng vùng nhớ để chứa số lớn tùy ý.</li>
          <li><strong>Cạm bẫy 0.1 sang nhị phân:</strong> Giống như phân số $1/3 = 0.3333...$ bị vô hạn tuần hoàn trong hệ thập phân, số $0.1$ ($1/10$) khi đổi sang hệ nhị phân lại bị <strong>vô hạn tuần hoàn</strong>: <code>0.0001100110011...</code> Vì thanh ghi máy tính chỉ có hữu hạn bit, nó buộc phải cắt ngắn con số, dẫn tới sai số dấu phẩy động nổi tiếng mà ta sẽ mổ xẻ ở Phần 1!</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Chứng minh: Python không bao giờ bị tràn số nguyên',
          code: `# Trong C/Java, phép tính này sẽ gây lỗi tràn số bộ nhớ
huge_int = 2 ** 100
print("2^100 có độ dài bit:", huge_int.bit_length())
print("Giá trị:", huge_int)

# Thử nghiệm gieo ý tưởng: 0.1 + 0.2 trong máy tính
print("\\nHiện tượng lạ với số thực:")
print("0.1 + 0.2 =", 0.1 + 0.2)
print("0.1 + 0.2 == 0.3 không?", 0.1 + 0.2 == 0.3)`,
          output: `2^100 có độ dài bit: 101
Giá trị: 1267650600228229401496703205376

Hiện tượng lạ với số thực:
0.1 + 0.2 = 0.30000000000000004
0.1 + 0.2 == 0.3 không? False`,
          annotations: [
            { line: 2, text: '2^100 vượt xa giới hạn 64-bit của phần cứng (khoảng 1.84 x 10^19), nhưng Python vẫn xử lý chính xác.' },
            { line: 8, text: 'Kết quả 0.30000000000000004 xuất hiện vì 0.1 không thể biểu diễn chính xác ở hệ nhị phân!' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Chữ cũng là Số — Ký tự str vs Dãy byte thô bytes',
      badge: 'Mã hóa Dữ liệu',
      content: `
        <p>Vì máy tính chỉ chứa số nhị phân, làm sao ta lưu được chữ <code>'A'</code>, chữ tiếng Việt <code>'ế'</code> hay biểu tượng cảm xúc <code>'🐍'</code>? Câu trả lời là: <strong>Mã hóa ký tự (Character Encoding)</strong>.</p>
        <ul>
          <li><strong>Bảng mã ASCII (1963):</strong> Dùng 7 bit (từ 0 đến 127) để mã hóa chữ cái tiếng Anh không dấu, chữ số và ký tự điều khiển. Ví dụ: mã 65 là <code>'A'</code>, mã 97 là <code>'a'</code>.</li>
          <li><strong>Bảng mã Unicode:</strong> Bảng danh bạ khổng lồ gán cho MỌI ký tự trên thế giới một con số định danh duy nhất gọi là <em>Code Point</em> (ví dụ chữ <code>'đ'</code> là <code>U+0111</code>, mã 273).</li>
          <li><strong>UTF-8:</strong> Phương pháp dịch con số Unicode trừu tượng thành dãy các byte nhị phân thực tế để lưu xuống ổ cứng hoặc truyền qua mạng.</li>
        </ul>
        <p>Trong Python, cần phân biệt rạch ròi 2 kiểu:</p>
        <ul>
          <li><code>str</code>: Chuỗi ký tự Unicode (ở mức khái niệm người dùng đọc được).</li>
          <li><code>bytes</code>: Dãy các con số nguyên từ 0 đến 255 (dữ liệu thô thực sự nằm trong RAM hoặc card mạng).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Phân biệt str và bytes, mã hóa UTF-8 trong Python',
          code: `# Ký tự văn bản Unicode (str)
text = "Phở 🐍"
print("Kiểu dữ liệu:", type(text))
print("Độ dài ký tự len():", len(text))

# Chuyển đổi từ ký tự thành mã nhị phân lưu trữ (bytes) bằng UTF-8
raw_bytes = text.encode("utf-8")
print("Dạng bytes:", raw_bytes)
print("Số byte thực tế chiếm dụng:", len(raw_bytes))

# Xem từng byte bên trong
byte_list = list(raw_bytes)
print("Danh sách giá trị từng byte (0-255):", byte_list)
print("Dạng hex của từng byte:", [hex(b) for b in byte_list])`,
          output: `Kiểu dữ liệu: <class 'str'>
Độ dài ký tự len(): 5
Dạng bytes: b'Ph\\xe1\\xbb\\x9f \\xf0\\x9f\\x90\\x8d'
Số byte thực tế chiếm dụng: 9
Danh sách giá trị từng byte (0-255): [80, 104, 225, 187, 159, 32, 240, 159, 144, 141]
Dạng hex của từng byte: ['0x50', '0x68', '0xe1', '0xbb', '0x9f', '0x20', '0xf0', '0x9f', '0x90', '0x8d']`,
          annotations: [
            { line: 2, text: '"Phở 🐍" có đúng 5 ký tự văn bản.' },
            { line: 7, text: 'encode("utf-8") biến chuỗi ký tự thành dãy byte nhị phân.' },
            { line: 9, text: 'Mặc dù chỉ có 5 ký tự, nhưng nó tốn 9 bytes: P(1 byte), h(1 byte), ở(3 bytes), dấu cách(1 byte), 🐍(4 bytes).' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Nhầm lẫn giữa giá trị số và cách biểu diễn của nó',
        content: 'Số `42`, `0b101010` và `0x2A` chỉ là 3 cách viết khác nhau của cùng một đối tượng số trong bộ nhớ. Python không lưu "số này ở hệ 16" hay "số kia ở hệ nhị phân". Khi in ra bằng `print()`, Python mặc định luôn chuyển sang chuỗi thập phân để con người dễ đọc.'
      },
      {
        title: 'Cố cộng trực tiếp giữa chuỗi str và số nguyên int',
        content: 'Trong nhiều ngôn ngữ lỏng lẻo như JavaScript hay PHP, `"10" + 1` có thể tự động thành `"101"` hoặc `11`. Trong Python, câu lệnh `"10" + 1` sẽ văng lỗi ngay lập tức: `TypeError: can only concatenate str (not "int") to str`. Python là ngôn ngữ có kiểu chặt chẽ (Strongly Typed).'
      }
    ],
    tips: [
      {
        title: 'Quy tắc ngón tay cái đổi nhanh Hex sang Byte',
        content: 'Nhớ rằng mỗi 2 chữ số hex đại diện chính xác cho 1 byte (8 bit). Ký hiệu `0x00` là byte nhỏ nhất (0), `0xFF` là byte lớn nhất (255). Nhìn vào `0x1A2B`, ta biết ngay nó chiếm 2 bytes bộ nhớ (`1A` và `2B`).'
      }
    ],
    deepDive: {
      title: 'Bên trong CPython: Trình thông dịch thực thi mã nguồn như thế nào?',
      content: `
        <p>Khi bạn gõ <code>python script.py</code>, chương trình thực sự trải qua 4 giai đoạn:</p>
        <ol>
          <li><strong>Phân tích từ vựng (Tokenizer):</strong> Đọc từng dòng text và tách thành các từ khóa, biến số, toán tử (tokens).</li>
          <li><strong>Phân tích cú pháp (Parser):</strong> Xây dựng Cây cú pháp trừu tượng (Abstract Syntax Tree - AST) kiểm tra quy tắc ngữ pháp.</li>
          <li><strong>Biên dịch (Compiler):</strong> Chuyển đổi cây AST thành <em>Bytecode</em> — một tập hợp các lệnh nhị phân cho một chiếc "máy tính ảo" (Python Virtual Machine).</li>
          <li><strong>Máy ảo CPython (PVM):</strong> Vòng lặp lớn bằng ngôn ngữ C (nằm trong hàm <code>_PyEval_EvalFrameDefault</code>) đọc lần lượt từng lệnh bytecode và gọi lệnh CPU tương ứng để thực thi.</li>
        </ol>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Chuyển đổi năm sinh và số tuổi sang hệ cơ số khác',
      problem: 'Hãy viết một đoạn mã Python nhận một số nguyên đại diện cho năm hiện tại (ví dụ 2026), sau đó in ra biểu diễn nhị phân, bát phân và thập lục phân của số đó. Tính xem số đó cần tối thiểu bao nhiêu bit để lưu trữ.',
      hint: 'Sử dụng các hàm bin(), oct(), hex() và phương thức .bit_length().',
      solutionCode: `year = 2026

bin_str = bin(year)
oct_str = oct(year)
hex_str = hex(year)
bits = year.bit_length()

print("Năm:", year)
print("Nhị phân:", bin_str)
print("Bát phân:", oct_str)
print("Thập lục phân:", hex_str)
print("Số bit cần dùng:", bits)`,
      solutionOutput: `Năm: 2026
Nhị phân: 0b11111101010
Bát phân: 0o3752
Thập lục phân: 0x7ea
Số bit cần dùng: 11`,
      explanation: '2026 trong hệ nhị phân là 11111101010 (11 chữ số nhị phân), vì vậy bit_length() trả về đúng 11 bit.',
      annotations: [
        { line: 1, text: 'Khởi tạo biến year = 2026.' },
        { line: 6, text: 'Gọi bit_length() trực tiếp từ biến số nguyên.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Kiểm tra dung lượng byte thực tế của chuỗi ký tự UTF-8',
      problem: 'Cho một danh sách các từ: `words = ["Python", "Hà Nội", "🚀"]`. Hãy viết mã duyệt qua từng từ, in ra độ dài ký tự (`len()`) và độ dài byte thực tế khi mã hóa sang UTF-8. Giải thích vì sao có sự chênh lệch.',
      hint: 'Dùng hàm len(w) cho ký tự và len(w.encode("utf-8")) cho byte.',
      solutionCode: `words = ["Python", "Hà Nội", "🚀"]

for w in words:
    char_count = len(w)
    byte_count = len(w.encode("utf-8"))
    print(f"Từ: '{w}' -> {char_count} ký tự, chiếm {byte_count} bytes")`,
      solutionOutput: `Từ: 'Python' -> 6 ký tự, chiếm 6 bytes
Từ: 'Hà Nội' -> 6 ký tự, chiếm 8 bytes
Từ: '🚀' -> 1 ký tự, chiếm 4 bytes`,
      explanation: 'Các chữ tiếng Anh thuộc ASCII chỉ tốn 1 byte. Chữ tiếng Việt có dấu như "à", "ộ" tốn 2 bytes trong UTF-8. Các Emoji hiện đại tốn 4 bytes.',
      annotations: [
        { line: 3, text: 'Vòng lặp duyệt qua từng chuỗi văn bản.' },
        { line: 5, text: 'w.encode("utf-8") trả về đối tượng bytes, sau đó đo len().' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Tại sao lập trình viên thường dùng hệ thập lục phân (Hex) thay vì nhị phân khi quan sát bộ nhớ máy tính?',
      options: [
        'Vì hệ thập lục phân tính toán nhanh hơn hệ nhị phân trong CPU.',
        'Vì đúng 4 bit nhị phân tương ứng với 1 ký tự hex, giúp 1 byte luôn được viết gọn thành đúng 2 ký tự hex.',
        'Vì hệ thập lục phân có thể lưu được số âm mà không cần dấu trừ.',
        'Vì Python chỉ cho phép biểu diễn địa chỉ RAM dưới dạng thập lục phân.'
      ],
      correctIndex: 1,
      explanation: '16 = 2^4, do đó 4 bit nhị phân luôn tương ứng 1 ký tự hex. 1 byte (8 bit) luôn tương ứng 2 ký tự hex (00 đến FF), giúp con người đọc gọn gàng hơn hàng dãy dài 0 và 1.'
    },
    {
      question: 'Điều gì xảy ra khi bạn tính lũy thừa một số nguyên rất lớn trong Python, ví dụ `2 ** 1000`?',
      options: [
        'Chương trình báo lỗi OverflowError vì vượt quá giới hạn 64-bit của CPU.',
        'Kết quả bị quay vòng về số âm do cơ chế tràn số bù hai.',
        'Python tự động cấp phát thêm các ô nhớ trong RAM để chứa kết quả chính xác tuyệt đối mà không bị tràn số.',
        'Python tự động chuyển kết quả sang kiểu số thực float xấp xỉ.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python 3, kiểu int là arbitrary-precision (độ chính xác tùy ý). CPython phân rã số nguyên lớn thành các mảng chữ số (digits) và tự động mở rộng theo dung lượng RAM có sẵn.'
    },
    {
      question: 'Kết quả của biểu thức `len("Xin chào".encode("utf-8"))` so với `len("Xin chào")` là:',
      options: [
        'Bằng nhau, cả hai đều là 8.',
        'Lớn hơn, vì chữ "à" có dấu trong tiếng Việt cần 2 bytes để biểu diễn trong chuẩn UTF-8.',
        'Nhỏ hơn, vì UTF-8 đã nén chuỗi lại.',
        'Báo lỗi TypeError vì hàm len() không nhận kiểu bytes.'
      ],
      correctIndex: 1,
      explanation: '"Xin chào" có 8 ký tự. Tuy nhiên chữ "à" là ký tự ngoài ASCII nên UTF-8 dùng 2 bytes để mã hóa. Do đó tổng số bytes là 9 bytes.'
    }
  ],

  summary: [
    'Mọi thông tin trong máy tính ở tầng vật lý đều được tạo thành từ các bit nhị phân (0 và 1). 8 bit tạo thành 1 byte.',
    'Hệ thập lục phân (hex) là "công cụ viết tắt" của hệ nhị phân: 2 chữ số hex đại diện cho đúng 1 byte (0x00 đến 0xFF).',
    'Phần cứng dùng bù hai để biểu diễn số âm trong hữu hạn bit, trong khi Python 3 tự động cấp phát bộ nhớ để số nguyên int không bao giờ bị tràn số.',
    'Một số hữu hạn trong hệ thập phân (như 0.1) có thể trở thành vô hạn tuần hoàn trong hệ nhị phân, là nguồn gốc của sai số dấu phẩy động.',
    'Chuỗi ký tự `str` là khái niệm trừu tượng cho con người; khi lưu xuống máy tính hoặc gửi qua mạng, nó phải được mã hóa thành `bytes` qua chuẩn như UTF-8.'
  ]
};
