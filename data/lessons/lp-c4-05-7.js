export default {
  id: 'lp-c4-05-7',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.5.7',
  title: 'Chuỗi ký tự: Chuỗi ký tự Unicode và Bytes',
  subtitle: 'Phân định str vs bytes, điểm mã Unicode (code points), mã hóa encode/decode, 4 cách viết ký tự phi ASCII và ví dụ Emoji đã kiểm chứng',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt ranh giới rõ rệt giữa chuỗi văn bản str (Unicode code points) và chuỗi byte thô bytes / bytearray.',
    'Hiểu bản chất điểm mã Unicode (code point) và vì sao khái niệm byte không thể đại diện đơn lẻ cho mọi ký tự.',
    'Thực hiện chuyển đổi hai chiều: chuỗi văn bản sang chuỗi byte bằng .encode() và ngược lại bằng .decode().',
    'Nhận biết 4 cách viết ký tự phi ASCII trong chuỗi văn bản: thoát hex (\\x), Unicode ngắn (\\u), Unicode dài (\\U) và ký tự UTF-8 trực tiếp.',
    'Kiểm chứng chính xác số lượng điểm mã và số byte UTF-8 / UTF-16 trên văn bản chứa Emoji.'
  ],

  intuition: {
    title: 'Ý niệm vô hình và bản vẽ in trên đĩa',
    metaphor: 'Một chuỗi văn bản str giống như một ý niệm trừu tượng trong tâm trí: chữ \'A\', chữ \'Ä\', hay biểu tượng con rắn 🐍 là các điểm mã định danh duy nhất trong từ điển toàn cầu Unicode (Universal Coded Character Set). Chúng không có kích thước byte cố định trong đầu bạn. Nhưng khi bạn cần ghi ý niệm đó xuống đĩa cứng hoặc truyền qua dây cáp mạng (thế giới vật lý), bạn buộc phải "đóng gói" (encode) nó thành một dãy các byte 8-bit cụ thể theo một quy ước mã hóa như UTF-8 hoặc UTF-16. Khi đọc lại, bạn lại "giải mã" (decode) các byte thô đó trở lại thành các điểm mã quen thuộc.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHU TRÌNH CHUYỂN ĐỔI: VĂN BẢN UNICODE (str) ỨNG VỚI BYTE THÔ (bytes)</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;text-align:center;">
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Chuỗi văn bản (str)</div>
            <div style="font-weight:700;font-size:1.1rem;color:var(--accent-primary);">'🐍hÄck👏'</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">len = 6 điểm mã (Code Points)</div>
          </div>
          <div>
            <div style="font-weight:700;color:var(--warning);font-size:0.8rem;">.encode('utf-8') ──►</div>
            <div style="font-weight:700;color:var(--success);font-size:0.8rem;margin-top:8px;">◄── .decode('utf-8')</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--warning);border-radius:8px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Dãy byte thô (bytes)</div>
            <div style="font-weight:700;font-size:0.85rem;color:var(--warning);word-break:break-all;">b'\\xf0\\x9f\\x90\\x8dh\\xc3\\x84ck\\xf0\\x9f\\x91\\x8f'</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">len = 13 bytes vật lý</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phân định rõ Chuỗi Văn bản (str) và Chuỗi Byte (bytes)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 14–16 / 38</strong>.</p>
          </div>
        </div>

        <p>Chuỗi ký tự của Python đi kèm hỗ trợ đầy đủ Unicode cần thiết cho việc xử lý văn bản phi ASCII. Văn bản như vậy bao gồm các ký tự thuộc những ngôn ngữ phi tiếng Anh (như tiếng Việt, tiếng Đức), cũng như các biểu tượng và emoji, vốn rất phổ biến ngày nay trên các trang web, email, giao diện GUI và dữ liệu.</p>
        <p>Các đối tượng chuỗi của Python cho phép bạn xử lý văn bản như vậy một cách liền mạch, thông qua việc phân chia ranh giới rõ rệt giữa hai nhóm:</p>
        <ul>
          <li><strong>Kiểu chuỗi <code>str</code> thông thường:</strong> Xử lý văn bản Unicode (bao gồm cả ASCII, vốn chỉ là một dạng đơn giản của Unicode).</li>
          <li><strong>Kiểu chuỗi <code>bytes</code> (và người anh em họ khả biến <code>bytearray</code>):</strong> Xử lý các giá trị byte thô 8-bit (bao gồm dữ liệu đa phương tiện, hình ảnh JPEG, âm thanh và văn bản đã được mã hóa).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo chuỗi văn bản str và chuỗi byte thô bytes',
          code: `>>> 'hÄck'                             # Chuỗi str thông thường là văn bản Unicode
'hÄck'
>>> b'a\\x01c'                         # Chuỗi bytes là dữ liệu dựa trên byte
b'a\\x01c'`,
          output: `'hÄck'
b'a\\x01c'`,
          annotations: [
            { line: 1, text: 'Chuỗi str chứa ký tự phi ASCII Ä được hiển thị tự nhiên.' },
            { line: 3, text: 'Tiền tố b biểu thị chuỗi bytes gồm các giá trị byte thô.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Điểm mã Unicode (Code Points) và Cơ chế Mã hóa (.encode)',
      content: `
        <p>Về mặt quy chuẩn, các chuỗi byte của Python là các dãy tuần tự của các byte 8-bit in ra dưới dạng ký tự ASCII khi có thể, và các chuỗi văn bản của nó là <strong>các dãy tuần tự của các điểm mã Unicode (code point)</strong>—những con số định danh cho các ký tự, in ra dưới dạng các ký tự đồ họa quen thuộc và không nhất thiết phải ánh xạ vừa vặn vào các byte đơn lẻ khi lưu trong bộ nhớ hoặc mã hóa vào tệp.</p>
        <p>Trên thực tế, khái niệm byte không hoàn toàn áp dụng được cho Unicode: nó bao gồm vô số điểm mã ký tự quá lớn để vừa trong một byte, và định nghĩa các chuẩn mã hóa để lưu trữ và truyền tải mà trong đó các ký tự có thể mang bất kỳ kích thước nào:</p>
      `,
      codeExamples: [
        {
          title: 'Mã hóa chuỗi ASCII đơn giản sang UTF-8 và UTF-16',
          code: `>>> 'Code'                           # Ký tự có thể có kích thước bất kỳ trong bộ nhớ
'Code'
>>> 'Code'.encode('utf-8')            # Mã hóa thành 4 byte ở chuẩn UTF-8 trong tệp
b'Code'
>>> 'Code'.encode('utf-16')           # Nhưng mã hóa thành 10 byte ở chuẩn UTF-16
b'\\xff\\xfeC\\x00o\\x00d\\x00e\\x00'`,
          output: `'Code'
b'Code'
b'\\xff\\xfeC\\x00o\\x00d\\x00e\\x00'`,
          annotations: [
            { line: 3, text: 'UTF-8 mã hóa các ký tự ASCII chỉ tốn 1 byte cho mỗi ký tự (4 ký tự = 4 byte).' },
            { line: 5, text: 'UTF-16 tốn 2 byte BOM (\\xff\\xfe) + 8 byte cho 4 ký tự (mỗi ký tự 2 byte) = 10 byte.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Văn bản Phong phú, Hàm ord, hex và Kiểm chứng Emoji',
      content: `
        <p>Điều này đặc biệt đúng đối với văn bản phong phú hơn chứa các ký tự đặc biệt và biểu tượng emoji. Hàm <code>ord()</code> cung cấp điểm mã (code point) của một ký tự, và hàm <code>hex()</code> cung cấp chuỗi thập lục phân tương ứng của nó:</p>
        <div class="callout-box callout-tip" style="margin-bottom:14px;">
          <div class="callout-header"><span>🐍</span> <span>Xác minh Nguồn gốc Ký tự:</span></div>
          <div class="callout-body">
            <p>Trong một số bản trích xuất PDF, ký tự Emoji con rắn 🐍 và vỗ tay 👏 có thể bị lỗi hiển thị thành ký tự Hy Lạp lạ. Tuy nhiên, căn cứ vào mã hex <code>0x1f40d</code>, độ dài chuỗi 6 và chuỗi byte UTF-8 <code>\\xf0\\x9f\\x90\\x8d...\\xf0\\x9f\\x91\\x8f</code>, chúng ta xác nhận chính xác các ký tự nguyên bản của tác giả chính là 🐍 (U+1F40D) và 👏 (U+1F44F).</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khám phá điểm mã Unicode và số byte mã hóa thực tế (Đã kiểm chứng trên Python 3.14.8)',
          code: `>>> hex(ord('🐍'))                   # Điểm mã quá lớn đối với một byte đơn lẻ
'0x1f40d'

>>> len('🐍hÄck👏')                   # Mỗi phần tử là một ký tự (điểm mã)
6

>>> len('🐍hÄck👏'.encode('utf-8'))  # Nhưng số byte sau khi mã hóa lại khác nhau
13

>>> len('🐍hÄck👏'.encode('utf-16'))
18`,
          output: `'0x1f40d'
6
13
18`,
          annotations: [
            { line: 1, text: 'ord("🐍") cho điểm mã 128.013 = 0x1F40D, vượt xa giới hạn 255 của 1 byte (8-bit).' },
            { line: 4, text: 'len() trên chuỗi str đếm số ký tự điểm mã: 6 ký tự gồm 🐍, h, Ä, c, k, 👏.' },
            { line: 7, text: 'len() trên kết quả .encode(\'utf-8\') đếm số byte: 4 (rắn) + 1 (h) + 2 (Ä) + 1 (c) + 1 (k) + 4 (vỗ tay) = 13 byte.' },
            { line: 10, text: 'len() trên UTF-16: 2 (BOM) + 4 (rắn) + 2 (h) + 2 (Ä) + 2 (c) + 2 (k) + 4 (vỗ tay) = 18 byte.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Bốn Cách Viết Ký tự Phi ASCII và Mã hóa Latin-1',
      content: `
        <p>Để viết các ký tự phi ASCII trong chuỗi văn bản, hãy sử dụng:</p>
        <ol>
          <li>Các ký tự thoát thập lục phân <code>\\xNN</code> (cho ký tự trong phạm vi 8-bit).</li>
          <li>Ký tự thoát Unicode ngắn <code>\\uXXXX</code> (4 chữ số thập lục phân cho phạm vi 16-bit).</li>
          <li>Ký tự thoát Unicode dài <code>\\UXXXXXXXX</code> (8 chữ số thập lục phân cho phạm vi 32-bit).</li>
          <li>Văn bản thô được diễn giải theo bảng mã nguồn được khai báo (mặc định cho mã nguồn Python là chuẩn UTF-8 phổ quát).</li>
        </ol>
        <p>Để minh họa, dưới đây là ký tự phi ASCII chữ A có dấu hai chấm trên đầu <strong>Ä</strong> được viết theo bốn cách trong Python:</p>
      `,
      codeExamples: [
        {
          title: 'Bốn cách biểu diễn cùng một ký tự phi ASCII trong chuỗi văn bản',
          code: `>>> 'h\\xc4\\u00c4\\U000000c4Äck'          # Mã hóa ký tự phi ASCII: hex, ngắn, dài, thô
'hÄÄÄÄck'

>>> # Chuỗi byte chỉ dùng thoát hex \\x để nhúng giá trị byte thô:
>>> '\\u00A3', '\\u00A3'.encode('latin1'), b'\\xA3'.decode('latin1')
('£', b'\\xa3', '£')`,
          output: `'hÄÄÄÄck'
('£', b'\\xa3', '£')`,
          annotations: [
            { line: 1, text: '\\xc4 (hex), \\u00c4 (Unicode 16-bit), \\U000000c4 (Unicode 32-bit) và chữ Ä trực tiếp đều sinh cùng 1 ký tự.' },
            { line: 5, text: 'Ký tự bảng Anh £ (U+00A3) mã hóa latin1 thành 1 byte b\'\\xa3\', giải mã lại cho ra \'£\'.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Quy tắc mã hóa/giải mã khi đọc ghi tệp',
        content: 'Phần lớn việc xử lý Unicode trong thực tế quy về chuyển dữ liệu văn bản vào và ra khỏi các tệp: đối tượng tệp trong Python sẽ tự động mã hóa văn bản thành byte khi lưu xuống đĩa và tự động giải mã thành các điểm mã ký tự khi đọc trở lại bộ nhớ.'
      }
    ]
  },

  exercises: [
    {
      title: 'Khám phá điểm mã của ký tự tiếng Việt',
      level: 'Dễ',
      problem: 'Hãy dùng hàm <code>ord()</code> và <code>hex()</code> để tìm điểm mã Unicode của chữ cái tiếng Việt <code>\'ở\'</code> trong chuỗi <code>"Phở"</code>.',
      hint: 'Lấy ký tự <code>"Phở"[2]</code> rồi truyền vào hàm <code>ord()</code>.',
      solutionCode: `ky_tu = "Phở"[2]
diem_ma = ord(ky_tu)
print("Ký tự:", ky_tu)
print("Điểm mã thập phân:", diem_ma)
print("Điểm mã Hex (Unicode):", hex(diem_ma))`,
      solutionOutput: `Ký tự: ở
Điểm mã thập phân: 7903
Điểm mã Hex (Unicode): 0x1edf`,
      explanation: 'Ký tự \'ở\' có điểm mã Unicode là U+1EDF, được lưu trữ và hiển thị tự nhiên trong chuỗi str của Python.'
    },
    {
      title: 'Đo lường số byte UTF-8 của chuỗi tiếng Việt',
      level: 'Vừa',
      problem: 'Cho chuỗi <code>s = "Lập trình"</code>. Hãy so sánh số lượng ký tự điểm mã với số lượng byte thực tế khi mã hóa theo chuẩn UTF-8.',
      hint: 'Dùng <code>len(s)</code> so với <code>len(s.encode(\'utf-8\'))</code>.',
      solutionCode: `s = "Lập trình"
so_ky_tu = len(s)
so_byte = len(s.encode('utf-8'))
print("Số ký tự (điểm mã):", so_ky_tu)
print("Số byte UTF-8:", so_byte)`,
      solutionOutput: `Số ký tự (điểm mã): 9
Số byte UTF-8: 13`,
      explanation: 'Chuỗi gồm 9 ký tự, nhưng các ký tự có dấu như \'ậ\', \'ì\' tốn 3 byte mỗi chữ trong bảng mã UTF-8, nên tổng dung lượng byte là 13.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây phân định ĐÚNG NHẤT giữa chuỗi str và chuỗi bytes trong Python?',
      options: [
        'str chỉ chạy trên Windows còn bytes chạy trên Linux.',
        'str là chuỗi văn bản gồm các điểm mã Unicode, trong khi bytes là dãy các giá trị byte 8-bit thô.',
        'str không thể chuyển đổi thành bytes.',
        'bytes có thể chứa bất kỳ ký tự Unicode nào mà không cần mã hóa.'
      ],
      correctIndex: 1,
      explanation: 'str đại diện cho văn bản trừu tượng gồm các Unicode code points, còn bytes đại diện cho các byte 8-bit vật lý.'
    },
    {
      question: 'Tại sao len(\'🐍\') trả về 1 trong khi len(\'🐍\'.encode(\'utf-8\')) lại trả về 4?',
      options: [
        'Vì Python bị lỗi đếm khi gặp emoji.',
        'Vì len(str) đếm số lượng điểm mã Unicode (1 ký tự rắn), còn len(bytes) đếm số lượng byte thực tế sau khi mã hóa UTF-8 (cần 4 byte).',
        'Vì hệ điều hành tự động nhân 4 lần dung lượng.',
        'Vì emoji con rắn bao gồm 4 chữ cái tiếng Anh ghép lại.'
      ],
      correctIndex: 1,
      explanation: 'len(str) đếm số lượng ký tự / điểm mã (code point), trong khi len(bytes) đếm dung lượng byte nhị phân sau khi encode.'
    },
    {
      question: 'Phương thức nào được dùng để chuyển đổi một chuỗi văn bản str thành chuỗi byte bytes theo một bảng mã chỉ định?',
      options: [
        '.decode()',
        '.encode()',
        '.to_bytes()',
        '.ascii()'
      ],
      correctIndex: 1,
      explanation: 'Dùng .encode(\'utf-8\') để mã hóa chuỗi văn bản thành chuỗi bytes; ngược lại dùng .decode(\'utf-8\') để giải mã bytes về str.'
    }
  ],

  summary: [
    'Python phân định rõ chuỗi văn bản str (tập hợp các điểm mã Unicode) và chuỗi byte thô bytes / bytearray (dãy byte 8-bit).',
    'Điểm mã Unicode (code point) là con số định danh cho ký tự đồ họa, không nhất thiết vừa trong 1 byte.',
    'Chuyển đổi văn bản sang byte bằng .encode(), và giải mã từ byte sang văn bản bằng .decode().',
    'Ký tự phi ASCII có thể viết bằng 4 cách: thoát hex (\\x), Unicode ngắn (\\u), Unicode dài (\\U) và ký tự UTF-8 trực tiếp.',
    'Ý chính: Cơ chế Unicode nhất quán giúp Python xử lý mọi ngôn ngữ và biểu tượng cảm xúc trên toàn cầu mà không gặp rào cản bảng mã.'
  ]
};
