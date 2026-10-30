export default {
  id: 'lp-c4-09-2',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.9.2',
  title: 'Tệp: Tệp Văn bản Unicode và Tệp Nhị phân',
  subtitle: 'Tham số encoding="utf-8", đối tượng bytes (b"..."), cơ chế chuyển đổi dòng CRLF trên Windows và mảng bytearray',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cách làm việc với tệp văn bản đa ngôn ngữ thông qua tham số encoding="utf-8".',
    'Phân biệt ranh giới rõ ràng trong Python 3: Tệp văn bản (xử lý chuỗi str) và Tệp nhị phân (xử lý chuỗi bytes b"...").',
    'Đọc tệp nhị phân để quan sát các byte mã hóa UTF-8 thực tế lưu trên đĩa và giải mã bằng decode().',
    'Hiểu cơ chế chuyển đổi ký tự xuống dòng (\\n vs \\r\\n) trên Windows giữa chế độ văn bản và nhị phân.',
    'Làm quen với kiểu dữ liệu mảng byte khả biến (bytearray).'
  ],

  intuition: {
    title: 'Bức thư tay dịch tự động vs Kiện hàng niêm phong',
    metaphor: 'Chế độ văn bản (text mode) giống như việc bạn gửi thư qua một thông dịch viên: thông dịch viên sẽ đọc các con chữ của bạn và tự động chuyển đổi chúng sang bảng mã quy định (như UTF-8), đồng thời tự động sửa dấu xuống dòng cho hợp thói quen của người nhận (CRLF trên Windows). Ngược lại, chế độ nhị phân (binary mode \'rb\', \'wb\') giống như một chiếc thùng niêm phong bằng chì: bất kể bên trong là bức tranh, bản nhạc hay mã máy, từng bit 0 và 1 đều được vận chuyển nguyên vẹn tuyệt đối, không một ký tự nào bị sửa đổi.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHUỖI UNICODE TRONG BỘ NHỚ VÀ BYTE TRÊN ĐĨA</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Chuỗi ký tự trong RAM</div>
            <div style="color:var(--accent-primary);font-weight:700;font-size:1.1rem;">'sp\\xc4\\x81m' ('spām')</div>
            <div style="font-size:0.7rem;color:var(--text-secondary);">len = 4 ký tự</div>
          </div>
          <div style="font-size:1.2rem;color:var(--text-muted);">➔ encode('utf-8') ➔</div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--success);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Chuỗi byte trên đĩa</div>
            <div style="color:var(--success);font-weight:700;font-size:1.1rem;">b'sp\\xc4\\x81m'</div>
            <div style="font-size:0.7rem;color:var(--text-secondary);">len = 5 bytes (\\xc4\\x81 chiếm 2 bytes)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tệp Nhị phân: Chế độ "wb" và Chuỗi bytes',
      content: `
        <p>Python vạch ra ranh giới rõ rệt giữa dữ liệu văn bản và dữ liệu nhị phân trong các tệp: trong khi tệp văn bản biểu diễn nội dung dưới dạng chuỗi <code>str</code> thông thường và tự động thực hiện mã hóa/giải mã, thì tệp nhị phân biểu diễn nội dung dưới dạng chuỗi <code>bytes</code> đặc biệt và cho phép bạn truy cập nội dung tệp ở trạng thái nguyên vẹn không bị biến đổi.</p>
        <p>Để kích hoạt chế độ nhị phân, ta thêm chữ <code>b</code> vào tham số chế độ (ví dụ <code>'wb'</code> để ghi nhị phân hoặc <code>'rb'</code> để đọc nhị phân):</p>
      `,
      codeExamples: [
        {
          title: 'Ghi và đọc dữ liệu nhị phân với chuỗi bytes',
          code: `>>> bf = open('data.bin', 'wb')
>>> bf.write(b'h\\xFFa\\xEEc\\xDDk\\n')
8
>>> bf.close()
>>> open('data.bin', 'rb').read()
b'h\\xffa\\xeec\\xddk\\n'`,
          output: `8
b'h\\xffa\\xeec\\xddk\\n'`,
          annotations: [
            { line: 1, text: 'Mở tệp data.bin ở chế độ ghi nhị phân (\'wb\').' },
            { line: 2, text: 'Ghi trực tiếp chuỗi bytes chứa các mã hex phi văn bản và ký tự \\n (8 bytes).' },
            { line: 5, text: 'Đọc lại ở chế độ \'rb\' nhận được chính xác chuỗi byte nguyên vẹn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Tệp Văn bản Unicode và Tham số encoding="utf-8"',
      content: `
        <p>Đối với các tệp văn bản, nội dung luôn gắn liền với một bảng mã Unicode cụ thể. Nếu bạn muốn mã của mình có tính khả chuyển cao và hoạt động tốt trên các hệ điều hành khác nhau hoặc trên Internet, bạn nên chỉ định rõ ràng bảng mã bắt buộc bằng tham số <code>encoding</code> trong hàm <code>open()</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Ghi chuỗi Unicode và so sánh giữa chế độ đọc văn bản vs nhị phân',
          code: `>>> tf = open('unidata.txt', 'w', encoding='utf-8')
>>> tf.write('🐍h\\u00c4ck👏')
6
>>> tf.close()
>>> open('unidata.txt', 'r', encoding='utf-8').read()
'🐍hÄck👏'
>>> open('unidata.txt', 'rb').read()
b'\\xf0\\x9f\\x90\\x8dh\\xc3\\x84ck\\xf0\\x9f\\x91\\x8f'`,
          output: `6
'🐍hÄck👏'
b'\\xf0\\x9f\\x90\\x8dh\\xc3\\x84ck\\xf0\\x9f\\x91\\x8f'`,
          annotations: [
            { line: 1, text: 'Chỉ định rõ encoding=\'utf-8\' để ghi văn bản đa ngôn ngữ.' },
            { line: 2, text: 'Chuỗi chứa emoji rắn 🐍, Ä (\\u00c4), và emoji vỗ tay 👏 (tổng cộng 6 ký tự).' },
            { line: 5, text: 'Đọc ở chế độ văn bản trả về đúng 6 ký tự Unicode ban đầu.' },
            { line: 7, text: 'Đọc ở chế độ nhị phân \'rb\' hiển thị 13 bytes UTF-8 thực tế được lưu trên đĩa.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cơ chế Chuyển đổi Dòng (\\n vs \\r\\n) trên Windows',
      content: `
        <p>Một điểm khác biệt rất lớn giữa chế độ văn bản và chế độ nhị phân nằm ở cách xử lý ký tự kết thúc dòng trên hệ điều hành Windows:</p>
        <ul>
          <li><strong>Chế độ văn bản (Text mode <code>'r'</code>, <code>'w'</code>):</strong> Python tự động thực hiện phép chuyển đổi. Khi ghi vào tệp trên Windows, ký tự <code>\\n</code> trong mã Python sẽ được tự động đổi thành cặp <code>\\r\\n</code> (CRLF) trên đĩa. Khi đọc tệp từ đĩa vào RAM, cặp <code>\\r\\n</code> lại được tự động chuyển về ký tự <code>\\n</code> đơn nhất.</li>
          <li><strong>Chế độ nhị phân (Binary mode <code>'rb'</code>, <code>'wb'</code>):</strong> Python <strong>tuyệt đối không chuyển đổi</strong> bất kỳ byte nào. Dữ liệu nhị phân như hình ảnh JPEG hay tệp thực thi EXE chứa các byte có giá trị <code>0x0A</code> (\\n) sẽ được giữ nguyên 100%, không bị biến thành <code>0x0D 0x0A</code>, nhờ đó bảo vệ tệp tin không bị hỏng hóc cấu trúc.</li>
        </ul>
      `
    },
    {
      id: 'sec-4',
      title: '4. Mảng Byte Khả biến: Kiểu bytearray',
      content: `
        <p>Đối tượng <code>bytes</code> là bất biến (immutable) giống như chuỗi <code>str</code>. Tuy nhiên, khi cần chỉnh sửa dữ liệu nhị phân trực tiếp trong bộ nhớ (ví dụ lọc pixel ảnh hoặc thay thế header của tệp), Python cung cấp kiểu đối tượng <strong>bytearray</strong> — một dãy các số nguyên byte khả biến:</p>
      `,
      codeExamples: [
        {
          title: 'Sửa đổi dữ liệu nhị phân tại chỗ với bytearray',
          code: `>>> ba = bytearray(b'spam')
>>> ba
bytearray(b'spam')
>>> ba[0] = ord('S')          # Sửa byte đầu tiên thành mã ASCII của chữ 'S' hoa
>>> ba
bytearray(b'Spam')
>>> ba.decode()               # Chuyển thành chuỗi văn bản
'Spam'`,
          output: `bytearray(b'spam')
bytearray(b'Spam')
'Spam'`,
          annotations: [
            { line: 1, text: 'Khởi tạo đối tượng mảng byte khả biến từ chuỗi byte ban đầu.' },
            { line: 4, text: 'bytearray cho phép gán trực tiếp phần tử theo vị trí chỉ mục.' },
            { line: 7, text: 'Giải mã thành chuỗi str thông thường.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Mở tệp ảnh/video bằng chế độ văn bản',
        content: `
          <p>Nếu bạn mở một bức ảnh PNG hay tệp ZIP bằng lệnh <code>open('photo.png', 'w')</code> hoặc <code>'r'</code>, Python sẽ cố gắng giải mã các byte nhị phân thành ký tự văn bản hoặc tự động đổi các byte <code>\\n</code> thành <code>\\r\\n</code>. Kết quả là tệp tin sẽ bị biến dạng dữ liệu và không thể mở được. Hãy luôn luôn dùng chế độ <code>'rb'</code> hoặc <code>'wb'</code> cho các tệp không phải văn bản thuần túy!</p>
        `
      }
    ],
    tips: [
      {
        title: 'Ghi chú của trang: Nhận xét của tác giả về Windows',
        content: `
          <p>Trong sách, Mark Lutz có đề cập đến chế độ nhị phân trên Windows. Xin lưu ý một quy tắc dễ nhớ: <em>"Văn bản thì cần thông dịch (CRLF và Encoding); Nhị phân thì giữ nguyên vẹn từng byte (Bit-exact byte-for-byte)"</em>.</p>
        `
      }
    ],
    deepDive: {
      title: 'Hệ thống Universal Newline trong Python 3',
      content: `
        <p>Khác với các ngôn ngữ cũ, Python 3 tích hợp sẵn cơ chế <strong>Universal Newline Support</strong>. Khi đọc tệp ở chế độ văn bản, cho dù tệp đó được tạo ra trên Windows (<code>\\r\\n</code>), Linux/macOS (<code>\\n</code>) hay Mac OS cổ điển (<code>\\r</code>), Python đều tự động chuẩn hóa tất cả về một ký tự <code>\\n</code> duy nhất trong chương trình của bạn, giúp mã nguồn chạy nhất quán trên mọi nền tảng.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Đọc byte đầu của tệp nhị phân',
      level: 'Dễ',
      description: 'Mọi tệp định dạng thường có "Magic Bytes" để nhận diện (ví dụ tệp PNG luôn bắt đầu bằng 8 bytes: <code>b\'\\x89PNG\\r\\n\\x1a\\n\'</code>). Hãy viết đoạn mã mở một tệp nhị phân giả lập và kiểm tra xem nó có đúng 4 byte đầu là <code>b\'TEST\'</code> hay không.',
      starterCode: `# 1. Tạo tệp sample.bin ở chế độ 'wb' ghi b'TEST_DATA_123'
# 2. Mở lại ở chế độ 'rb' và đọc 4 byte đầu tiên
# 3. Kiểm tra và in kết quả`,
      solution: `with open('sample.bin', 'wb') as f:
    f.write(b'TEST_DATA_123')

with open('sample.bin', 'rb') as f:
    magic_header = f.read(4)

if magic_header == b'TEST':
    print("Xác nhận: Tệp đúng định dạng TEST!")
else:
    print("Tệp không đúng định dạng.")`,
      solutionOutput: `Xác nhận: Tệp đúng định dạng TEST!`,
      explanation: '<code>f.read(4)</code> trong chế độ nhị phân chỉ đọc đúng 4 bytes đầu tiên của tệp.'
    },
    {
      title: 'Chuyển đổi văn bản Unicode sang Base64',
      level: 'Vừa',
      description: 'Cho chuỗi tiếng Việt <code>message = "Python 3 rất mạnh mẽ!"</code>. Hãy dùng <code>encode("utf-8")</code> để chuyển chuỗi thành <code>bytes</code>, sau đó dùng module <code>base64</code> để mã hóa và giải mã chuỗi đó.',
      starterCode: `import base64

message = "Python 3 rất mạnh mẽ!"
# Chuyển thành bytes và mã hóa base64
`,
      solution: `import base64

message = "Python 3 rất mạnh mẽ!"
raw_bytes = message.encode('utf-8')
encoded_b64 = base64.b64encode(raw_bytes)
print("Base64:", encoded_b64.decode('ascii'))

decoded_bytes = base64.b64decode(encoded_b64)
restored_message = decoded_bytes.decode('utf-8')
print("Khôi phục:", restored_message)`,
      solutionOutput: `Base64: UHl0aG9uIDMgcuG6pXQgbeG6oW5oIG3hur0h
Khôi phục: Python 3 rất mạnh mẽ!`,
      explanation: 'Sự kết hợp giữa <code>encode(\'utf-8\')</code> và <code>decode(\'utf-8\')</code> là quy trình chuẩn mực để xử lý văn bản Unicode qua các giao thức mạng.'
    }
  ],

  quiz: [
    {
      question: 'Khi mở tệp ảnh JPEG trên máy tính, chế độ mở nào sau đây là BẮT BUỘC để không làm hỏng cấu trúc tệp?',
      options: [
        '\'r\' (Chế độ đọc văn bản)',
        '\'w\' (Chế độ ghi văn bản)',
        '\'rb\' hoặc \'wb\' (Chế độ nhị phân)',
        '\'utf-8\''
      ],
      correctIndex: 2,
      explanation: 'Các tệp không phải văn bản thuần túy (ảnh, nhạc, nén) bắt buộc phải mở ở chế độ nhị phân (\'rb\', \'wb\').'
    },
    {
      question: 'Trong Python 3, chuỗi ký tự bắt đầu bằng tiền tố b"..." (ví dụ b\'hello\') thuộc kiểu đối tượng nào?',
      options: [
        'str',
        'bytes',
        'bytearray',
        'unicode'
      ],
      correctIndex: 1,
      explanation: 'Tiền tố b\'...\' đại diện cho đối tượng thuộc kiểu bytes — dãy các byte số nguyên từ 0 đến 255 bất biến.'
    },
    {
      question: 'Kiểu dữ liệu nhị phân nào trong Python có tính chất KHẢ BIẾN (cho phép sửa đổi giá trị byte tại chỗ)?',
      options: [
        'bytes',
        'str',
        'bytearray',
        'memoryview_immutable'
      ],
      correctIndex: 2,
      explanation: 'bytearray là phiên bản khả biến của bytes, cho phép sửa đổi các byte trực tiếp tại chỗ.'
    }
  ],

  summary: [
    'Tệp văn bản Unicode yêu cầu chỉ định bảng mã rõ ràng qua tham số encoding="utf-8" khi mở.',
    'Tệp nhị phân (\'rb\', \'wb\') xử lý trực tiếp chuỗi bytes (b"..."), giữ nguyên vẹn 100% dữ liệu gốc.',
    'Trên Windows, chế độ văn bản tự động chuyển đổi giữa \\n và \\r\\n, trong khi chế độ nhị phân giữ nguyên vẹn.',
    'bytearray cung cấp mảng byte có khả năng sửa đổi tại chỗ linh hoạt.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 29–31.'
  ]
};
