export default {
  id: 'lp-c5-11',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.11',
  title: 'Thao tác Bitwise: Dịch bit, Mặt nạ bit & bit_length()',
  subtitle: 'Xử lý số nguyên như các chuỗi bit nhị phân: các toán tử dịch bit, mặt nạ bit và phương thức bit_length()',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững tập hợp toán tử xử lý bit (bitwise) kiểu C trong Python: <<, >>, |, &, ^, ~.',
    'Hiểu nguyên lý hoạt động của phép dịch bit trái (tương đương nhân 2^n) và dịch phải (chia 2^n).',
    'Ứng dụng kỹ thuật mặt nạ bit (bit-masking) để đóng gói và kiểm tra cờ trạng thái (flags).',
    'Sử dụng phương thức integer.bit_length() để truy vấn số bit tối thiểu cần thiết để lưu giá trị.',
    'Thấm nhuần lời khuyên kiến trúc của Mark Lutz: ưu tiên cấu trúc dữ liệu bậc cao (list, dict) hơn là thao tác bit cấp thấp.'
  ],

  intuition: {
    title: 'Bảng công tắc điện tử và chuỗi cờ trạng thái',
    metaphor: 'Hãy tưởng tượng một bảng điều khiển gồm 8 chiếc công tắc đèn nhỏ xíu. Thay vì dùng 8 biến riêng biệt để lưu trạng thái bật/tắt của từng công tắc, một lập trình viên phần cứng có thể gom cả 8 công tắc này vào một số nguyên 8-bit duy nhất (từ 0 đến 255). Phép toán AND (&) giống như chiếc kính lọc để kiểm tra xem một công tắc cụ thể có đang bật hay không; phép OR (|) dùng để bật một công tắc lên; còn XOR (^) dùng để đảo ngược trạng thái. Đây là kỹ thuật mặt nạ bit (bit-masking) kinh điển trong lập trình hệ thống và vi điều khiển.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MINH HỌA CÁC THAO TÁC BITWISE TRÊN SỐ NGUYÊN</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:4px;">Dịch trái (&lt;&lt;) và Dịch phải (&gt;&gt;)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              <code>1 &lt;&lt; 2</code>: 0001 ➔ 0100 (bằng 4)<br>
              <code>8 &gt;&gt; 1</code>: 1000 ➔ 0100 (bằng 4)
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">AND (&amp;), OR (|), XOR (^)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              <code>1 | 3</code>: 0001 | 0011 ➔ 0011 (bằng 3)<br>
              <code>1 &amp; 3</code>: 0001 &amp; 0011 ➔ 0001 (bằng 1)
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Các Toán tử Bitwise Kiểu C trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 18 / 38 – Trang 19 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Bên cạnh các phép toán số học thông thường, Python hỗ trợ hầu hết các biểu thức xử lý bit có trong ngôn ngữ C. Điều này bao gồm các toán tử xử lý số nguyên như những <strong>chuỗi bit nhị phân</strong>:</p>
        <ul>
          <li><code>x &lt;&lt; y</code>: Dịch các bit của <code>x</code> sang trái <code>y</code> vị trí (tương đương nhân với 2<sup>y</sup>).</li>
          <li><code>x &gt;&gt; y</code>: Dịch các bit của <code>x</code> sang phải <code>y</code> vị trí (tương đương chia lấy sàn cho 2<sup>y</sup>).</li>
          <li><code>x | y</code>: Phép OR bitwise (cho ra bit 1 nếu ít nhất một trong hai bit tương ứng là 1).</li>
          <li><code>x &amp; y</code>: Phép AND bitwise (cho ra bit 1 khi và chỉ khi cả hai bit đều là 1).</li>
          <li><code>x ^ y</code>: Phép XOR bitwise (cho ra bit 1 khi hai bit khác nhau).</li>
          <li><code>~x</code>: Đảo ngược tất cả các bit của <code>x</code> (phép bù bit, trả về <code>-(x + 1)</code>).</li>
        </ul>
        <p>Các toán tử này rất hữu ích nếu bạn phải xử lý gói tin mạng, cổng nối tiếp phần cứng hoặc tệp dữ liệu nhị phân đóng gói từ C.</p>
      `,
      codeExamples: [
        {
          title: 'Các phép toán bitwise cơ bản',
          code: `>>> x = 1
>>> x << 2         # Số 1 nhị phân (0001) dịch trái 2 bit: 0100 -> 4
4
>>> x | 3          # Phép OR: 0001 | 0011 = 0011 -> 3
3
>>> x & 3          # Phép AND: 0001 & 0011 = 0001 -> 1
1`,
          output: `4
3
1`,
          annotations: [
            { line: 2, text: 'Phép dịch bit trái: 1 << 2 tương đương 1 * (2 ** 2) = 4.' },
            { line: 4, text: 'Phép OR kết hợp các bit: 1 | 2 | 1 = 3.' },
            { line: 6, text: 'Phép AND chọn ra các bit chung giữa hai số.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Kỹ thuật Mặt nạ Bit (Bit-masking) và Kiểm tra Nhị phân',
      content: `
        <p>Những thao tác mặt nạ bit (bit-masking) cho phép chúng ta <strong>mã hóa và trích xuất nhiều cờ hiệu (flags) cùng các giá trị khác bên trong một số nguyên duy nhất</strong>. Khi kết hợp với các hằng số nhị phân (<code>0b...</code>) và hàm <code>bin()</code>, chúng ta có thể kiểm tra trực tiếp chuỗi bit:</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra mặt nạ bit với literal nhị phân và hex',
          code: `>>> X = 0b0001
>>> X << 2
4
>>> bin(X << 2)                # Chuỗi chữ số nhị phân
'0b100'
>>> bin(X | 0b0011)            # Phép OR bitwise
'0b11'
>>> bin(X & 0b11)              # Phép AND bitwise
'0b1'
>>> X = 0xFF                   # 11111111
>>> X ^ 0b10101010             # Phép XOR: lật các bit tương ứng
85
>>> bin(X ^ 0b10101010)
'0b1010101'
>>> hex(85)
'0x55'`,
          output: `4
'0b100'
'0b11'
'0b1'
85
'0b1010101'
'0x55'`,
          annotations: [
            { line: 4, text: 'bin() trả về chuỗi nhị phân có tiền tố 0b.' },
            { line: 10, text: 'Phép XOR đảo ngược các bit: 11111111 ^ 10101010 = 01010101 (85 thập phân, 0x55 hex).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phương thức bit_length() và Lời khuyên Thiết kế của Mark Lutz',
      content: `
        <p>Số nguyên trong Python đi kèm với một phương thức đặc biệt là <strong><code>bit_length()</code></strong>, cho phép bạn truy vấn số lượng bit tối thiểu cần thiết để biểu diễn giá trị của con số dưới dạng nhị phân:</p>
        <p>Bạn cũng có thể đạt được cùng hiệu ứng bằng cách trừ <code>2</code> khỏi độ dài của chuỗi <code>bin()</code> bằng hàm <code>len()</code> (để trừ đi 2 ký tự tiền tố <code>"0b"</code>), mặc dù việc tạo ra một chuỗi tạm thời sẽ làm giảm hiệu năng đôi chút so với gọi trực tiếp phương thức <code>bit_length()</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Truy vấn số lượng bit với bit_length()',
          code: `>>> X = 99
>>> bin(X), X.bit_length(), len(bin(X)) - 2
('0b1100011', 7, 7)
>>> bin(256), (256).bit_length(), len(bin(256)) - 2
('0b100000000', 9, 9)`,
          output: `('0b1100011', 7, 7)
('0b100000000', 9, 9)`,
          annotations: [
            { line: 2, text: 'Số 99 nhị phân là 1100011 (7 bit); X.bit_length() trả về đúng 7.' },
            { line: 4, text: 'Số 256 nhị phân là 100000000 (9 bit).' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Quy tắc kinh nghiệm về lập trình bitwise của Mark Lutz',
        content: `
          <p>Mark Lutz chia sẻ một góc nhìn triết lý rất đáng suy ngẫm:</p>
          <blockquote>
            "Các thao tác bitwise thường không quan trọng trong một ngôn ngữ bậc cao như Python bằng trong một ngôn ngữ bậc thấp như C. Theo quy tắc kinh nghiệm, nếu bạn thấy mình muốn đảo từng bit trong Python, bạn nên suy nghĩ xem ngôn ngữ bạn thực sự đang lập trình là gì. Danh sách (list), từ điển (dict) và các kiểu tương tự của Python mang lại những cách phong phú hơn nhiều để mã hóa thông tin so với các chuỗi bit, đặc biệt là khi đối tượng tiếp nhận dữ liệu của bạn bao gồm cả những độc giả thuộc giống loài con người."
          </blockquote>
        `
      }
    ]
  },

  exercises: [
    {
      title: 'Kiểm tra quyền truy cập bằng mặt nạ bit',
      level: 'Vừa',
      problem: 'Trong một hệ thống phân quyền tệp, quyền READ có giá trị <code>0b100</code> (4), WRITE là <code>0b010</code> (2), và EXECUTE là <code>0b001</code> (1). Cho người dùng có quyền <code>user_perm = 6</code> (tức READ + WRITE). Hãy dùng toán tử <code>&</code> để kiểm tra xem người dùng này có quyền READ không, và có quyền EXECUTE không.',
      hint: 'user_perm & READ > 0 chứng tỏ có quyền.',
      solutionCode: `READ = 0b100      # 4
WRITE = 0b010     # 2
EXECUTE = 0b001   # 1

user_perm = READ | WRITE    # Gán quyền: 6

has_read = bool(user_perm & READ)
has_exec = bool(user_perm & EXECUTE)

print("Quyền hiện tại:", bin(user_perm))
print("Có quyền READ không?", has_read)
print("Có quyền EXECUTE không?", has_exec)`,
      solutionOutput: `Quyền hiện tại: 0b110
Có quyền READ không? True
Có quyền EXECUTE không? False`,
      explanation: '<code>user_perm &amp; READ</code> cho ra <code>0b100</code> (khác 0 -> True), trong khi <code>user_perm &amp; EXECUTE</code> cho ra <code>0</code> (False).'
    }
  ],

  quiz: [
    {
      question: 'Phép dịch bit trái "x << 3" đối với một số nguyên dương tương đương với phép toán số học nào?',
      options: [
        'Cộng x với 3.',
        'Nhân x với 2 lũy thừa 3 (x * 8).',
        'Chia x cho 8.',
        'Lấy căn bậc 3 của x.'
      ],
      correctIndex: 1,
      explanation: 'Dịch trái mỗi vị trí bit tương đương với nhân giá trị với 2. Do đó dịch trái 3 bit tương đương với nhân với 2³ = 8.'
    },
    {
      question: 'Phương thức (256).bit_length() trong Python trả về giá trị bao nhiêu?',
      options: [
        '8',
        '9',
        '16',
        '32'
      ],
      correctIndex: 1,
      explanation: 'Số 256 trong hệ nhị phân được biểu diễn là "0b100000000" (gồm một chữ số 1 và tám chữ số 0), tức là cần 9 bit để biểu diễn.'
    }
  ],

  summary: [
    'Python hỗ trợ đầy đủ các biểu thức bitwise kiểu C: <<, >>, |, &, ^, ~.',
    'Toán tử mặt nạ bit (bit-masking) giúp trích xuất và đóng gói nhiều cờ nhị phân trong một số nguyên duy nhất.',
    'Phương thức int.bit_length() trả về số lượng bit tối thiểu cần thiết để biểu diễn con số.',
    'Nên hạn chế lạm dụng xử lý bitwise trong Python; ưu tiên sử dụng các cấu trúc dữ liệu bậc cao như list và dict.',
    'Ý chính: Thao tác bitwise là công cụ giao tiếp hữu hiệu với phần cứng và dữ liệu C, nhưng lập trình Python hiện đại ưu tiên sự tường minh và dễ đọc.'
  ]
};