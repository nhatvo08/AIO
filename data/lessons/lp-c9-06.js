export default {
  id: 'lp-c9-06',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.6',
  title: 'File văn bản vs File nhị phân (bytes) & Lưu trữ đối tượng kèm chuyển đổi (eval)',
  subtitle: 'Phân biệt rạch ròi file văn bản Unicode và file nhị phân bytes, ghi nhiều đối tượng có phân tách, phân tích cú pháp (parse) và hàm eval',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt rạch ròi giữa File văn bản (Text file) và File nhị phân (Binary file) trong Python: đối tượng chuỗi biểu diễn (str vs bytes), cơ chế mã hóa Unicode và quy tắc ánh xạ ngắt dòng.',
    'Thực hành đọc và ghi file nhị phân với mode \'wb\' và \'rb\': xử lý chuỗi bytes với tiền tố b\'...\', trích xuất giá trị số nguyên 8-bit bằng chỉ mục bù, kiểm tra bằng chr() và bin().',
    'Nắm vững kỹ thuật lưu trữ nhiều đối tượng Python đa dạng (số, chuỗi, list, dict) vào file văn bản thông qua việc chuyển đổi chuỗi, chèn ký tự xuống dòng và ký tự phân cách (như $ hoặc dấu phẩy).',
    'Thành thạo quy trình phân tích cú pháp (parsing) dữ liệu đọc từ file: kết hợp rstrip(), split(), int() và list comprehension để phục hồi các đối tượng kiểu số.',
    'Hiểu cách hoạt động của hàm dựng sẵn eval() để phục hồi các cấu trúc dữ liệu phức tạp (list, dict), đồng thời nhận thức sâu sắc về lỗ hổng bảo mật chết người của eval khi thực thi mã không tin cậy.'
  ],

  intuition: {
    title: 'Bức thư dịch thuật và Bản quét quang học nguyên bản',
    metaphor: 'Hãy tưởng tượng việc gửi một tài liệu đi xa theo hai cách: Cách thứ nhất giống như File Văn Bản (Text File) — bạn viết một bức thư bằng ngôn ngữ tự nhiên. Khi qua bưu điện (hệ điều hành), nhân viên bưu điện có thể tự động dịch ngôn ngữ theo bảng mã địa phương (Unicode encoding) và thay đổi kiểu ngắt câu cho phù hợp với phong tục nơi nhận (ánh xạ `\\r\\n` của Windows thành `\\n` của Python). Ngược lại, File Nhị Phân (Binary File) giống như một bức ảnh chụp X-quang hoặc bản quét quang học chính xác từng điểm ảnh: không có bất kỳ ký tự nào được dịch thuật hay thay đổi; từng byte dữ liệu 8-bit thô (từ `0x00` đến `0xFF`) được giữ nguyên vẹn 100% từ đĩa cứng vào bộ nhớ RAM. Nếu bạn cố dùng kính đọc văn bản để dịch bức ảnh X-quang, bạn sẽ chỉ nhận được những thông báo lỗi hoặc các ký tự rác vô nghĩa!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH CƠ CHẾ XỬ LÝ: FILE VĂN BẢN vs FILE NHỊ PHÂN</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #3b82f6;border-radius:8px;">
            <div style="font-weight:700;color:#3b82f6;margin-bottom:6px;">📝 File Văn Bản (Mode 'r' / 'w')</div>
            <ul style="font-size:0.75rem;color:var(--text-secondary);padding-left:16px;margin:0;">
              <li>Kiểu đối tượng trong Python: <strong>str</strong> (chuỗi Unicode)</li>
              <li>Tự động mã hóa/giải mã theo <code>encoding</code></li>
              <li>Tự động ánh xạ ngắt dòng (CRLF ⇄ LF <code>\\n</code>)</li>
              <li>Phù hợp cho: mã nguồn, log, HTML, JSON, CSV</li>
            </ul>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;">
            <div style="font-weight:700;color:#10b981;margin-bottom:6px;">💾 File Nhị Phân (Mode 'rb' / 'wb')</div>
            <ul style="font-size:0.75rem;color:var(--text-secondary);padding-left:16px;margin:0;">
              <li>Kiểu đối tượng trong Python: <strong>bytes</strong></li>
              <li>Byte thô nguyên vẹn, <strong>không</strong> mã hóa Unicode</li>
              <li><strong>Không</strong> chuyển đổi ký tự kết thúc dòng</li>
              <li>Phù hợp cho: hình ảnh, âm thanh, nén zip, file đóng gói C</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phân Biệt Rạch Ròi: File Văn Bản (str) vs File Nhị Phân (bytes)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 16 / 48</strong>.</p>
          </div>
        </div>

        <p>Tổng quát hơn, loại file được xác định bởi đối số thứ hai của hàm <code>open</code> — việc đưa thêm ký tự <code>"b"</code> vào chuỗi chế độ có nghĩa là <strong>chế độ nhị phân (binary)</strong>, vốn có sự phân biệt rạch ròi với văn bản:</p>

        <ul>
          <li><strong>File văn bản (Text file):</strong> Biểu diễn nội dung dưới dạng chuỗi <code>str</code> thông thường, tự động thực hiện mã hóa và giải mã Unicode, và theo mặc định sẽ chuyển đổi ký tự kết thúc dòng (ví dụ trên Windows, cặp ký tự <code>\\r\\n</code> sẽ được tự động dịch thành <code>\\n</code> khi đọc vào Python).</li>
          <li><strong>File nhị phân (Binary file):</strong> Biểu diễn nội dung dưới dạng chuỗi <code>bytes</code> đặc biệt và cho phép các chương trình truy cập nội dung file một cách nguyên vẹn không đổi. Chế độ này dùng cho nội dung không phải văn bản như hình ảnh, âm thanh, video, hoặc dữ liệu đóng gói C.</li>
        </ul>

        <p>Bởi vì file văn bản luôn thực hiện phép giải mã Unicode, bạn <strong>không bao giờ nên mở một file dữ liệu nhị phân ở chế độ văn bản</strong>: việc cố tình giải mã các byte nhị phân ngẫu nhiên sang văn bản Unicode sẽ dẫn đến lỗi <code>UnicodeDecodeError</code> ngay lập tức!</p>
      `,
      codeExamples: [
        {
          title: 'Ghi và đọc file nhị phân: chuỗi bytes, trích xuất byte 8-bit',
          code: `# Ghi dữ liệu nhị phân vào file bằng mode 'wb'
myfile = open('myfile3.bin', 'wb')
# Chuỗi bytes được viết với tiền tố b'...' chứa các mã thoát hex
bytes_written = myfile.write(b'\\x00\\x01hack\\x02\\x03')
myfile.close()
print("Số byte đã ghi:", bytes_written)

# Đọc lại ở chế độ nhị phân 'rb'
data = open('myfile3.bin', 'rb').read()
print("Dữ liệu thô nguyên vẹn:", data, "| Kiểu:", type(data).__name__)

# Cắt lát trên chuỗi bytes
sub_bytes = data[2:6]
print("Lát cắt data[2:6]:", sub_bytes)

# Đánh chỉ mục một byte cụ thể trả về một số nguyên 8-bit (0-255)
first_byte = sub_bytes[0]
print("Byte đầu của 'hack':", first_byte)
print("Ký tự tương ứng (chr):", chr(first_byte))
print("Biểu diễn nhị phân (bin):", bin(first_byte))`,
          output: `Số byte đã ghi: 8
Dữ liệu thô nguyên vẹn: b'\\x00\\x01hack\\x02\\x03' | Kiểu: bytes
Lát cắt data[2:6]: b'hack'
Byte đầu của 'hack': 104
Ký tự tương ứng (chr): h
Biểu diễn nhị phân (bin): 0b1101000`,
          annotations: [
            { line: 4, text: 'b\'\\x00\\x01hack\\x02\\x03\' có đúng 8 byte dữ liệu.' },
            { line: 9, text: 'open(\'...\', \'rb\').read() trả về một đối tượng bytes.' },
            { line: 16, text: 'sub_bytes[0] trả về mã số nguyên ASCII của chữ \'h\' là 104.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bộ Mã Hóa Unicode và Tham Số encoding trong open()',
      content: `
        <p>File văn bản áp dụng các bộ mã hóa Unicode khi truyền nhận dữ liệu, sử dụng tên mã hóa tùy chọn được truyền vào đối số <code>encoding</code> của <code>open</code> (ví dụ: <code>open('f.txt', encoding='utf-8')</code>).</p>

        <p>Nếu bạn không chỉ định tham số <code>encoding</code>, Python sẽ sử dụng bộ mã hóa mặc định của nền tảng hệ điều hành (chẳng hạn UTF-8 trên Linux/macOS, hoặc CP1252 / UTF-8 trên Windows). Để đảm bảo ứng dụng có thể trao đổi dữ liệu an toàn trên mọi hệ điều hành và máy chủ khác nhau, thực hành tốt nhất là <strong>luôn luôn chỉ định rõ ràng <code>encoding='utf-8'</code> khi mở file văn bản</strong>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Lưu Trữ Nhiều Đối Tượng Kèm Chuyển Đổi Định Dạng',
      content: `
        <p>Ví dụ tiếp theo của chúng ta minh họa việc ghi nhiều đối tượng Python đa dạng (số, chuỗi, list, dict) vào một file văn bản trên nhiều dòng. Một lần nữa, nội dung file luôn luôn phải là chuỗi trong mã nguồn của bạn:</p>

        <p>Sau khi đã ghi và đóng file, chúng ta có thể kiểm tra nội dung của nó bằng cách đọc lại từng dòng bằng <code>readline()</code>, loại bỏ ký tự ngắt dòng bằng <code>rstrip()</code>, và phân tách bằng phương thức <code>split()</code> của chuỗi để chuyển dịch các con số về kiểu số nguyên bằng <code>int()</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Ghi nhiều đối tượng vào file văn bản và phân tích cú pháp (parse)',
          code: `# 1. Chuẩn bị các đối tượng Python
X, Y, Z = 62, 63, 64
S = 'Text'
D = {'a': 1, 'b': 2}
L = [1, 2, 3]

# 2. Ghi vào file văn bản với các định dạng phân cách
F = open('datafile.txt', 'w')
F.write(S + '\\n')                          # Dòng 1: Chuỗi
F.write(f'{X},{Y},{Z}\\n')                  # Dòng 2: Ba số phân cách bằng dấu phẩy
F.write(str(L) + '$' + str(D) + '\\n')       # Dòng 3: List và Dict phân cách bằng $
F.close()

# 3. Mở lại và đọc dòng 1 (chuỗi)
F = open('datafile.txt')
line1 = F.readline().rstrip()
print("Dòng 1 đã parse:", repr(line1))

# 4. Đọc dòng 2 và parse thành các số nguyên int
line2 = F.readline()
parts = line2.rstrip().split(',')
numbers = [int(p) for p in parts]
print("Dòng 2 đã parse thành list số:", numbers)
print("Tổng ba số:", sum(numbers))`,
          output: `Dòng 1 đã parse: 'Text'
Dòng 2 đã parse thành list số: [62, 63, 64]
Tổng ba số: 189`,
          annotations: [
            { line: 10, text: 'Ghi chuỗi kèm \\n để ngắt dòng phân định.' },
            { line: 11, text: 'f-string chuyển các số X, Y, Z thành chuỗi \'62,63,64\\n\'.' },
            { line: 20, text: 'split(\',\') tách dòng thành list chuỗi [\'62\', \'63\', \'64\'].' },
            { line: 21, text: 'List comprehension chuyển từng chuỗi con thành số int thực thụ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Tái Tạo Cấu Trúc Bằng eval() & Cảnh Báo Nguy Cơ Bảo Mật',
      content: `
        <p>Cuối cùng, để chuyển đổi chuỗi biểu diễn của list và dictionary ở dòng thứ ba của file trở lại thành các đối tượng Python thực sự, chúng ta có thể đưa chúng qua hàm dựng sẵn <code>eval</code>. Hàm <code>eval</code> coi một chuỗi như một biểu thức mã nguồn Python có thể thực thi:</p>

        <div class="callout-box callout-pitfall">
          <div class="callout-header"><span>⚠️ Cảnh báo an ninh nghiêm ngặt:</span> <span>Nguy cơ từ hàm eval()</span></div>
          <div class="callout-body">
            <p>Như Mark Lutz nhấn mạnh ở trang 19: <strong>Việc sử dụng <code>eval</code> là một công cụ cực kỳ mạnh mẽ, nhưng đôi khi quá nguy hiểm!</strong> <code>eval</code> sẽ sẵn sàng chạy bất kỳ biểu thức Python nào được nhúng trong chuỗi — kể cả một đoạn mã độc hại có thể xóa sạch mọi tệp tin trên máy tính của bạn nếu có đủ quyền hạn (ví dụ: <code>eval("__import__('os').system('rm -rf /')")</code>).</p>
            <p style="margin-top:6px;">Do đó, trong thực tế, nếu bạn chỉ muốn lưu trữ và nạp lại các đối tượng Python nguyên bản mà không muốn thực thi nội dung file như mã chương trình, bạn <strong>tuyệt đối không nên dùng eval</strong> mà hãy chuyển sang dùng các công cụ an toàn và chuyên dụng hơn: module <code>pickle</code> hoặc <code>json</code>!</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Phục hồi List và Dictionary từ file bằng eval()',
          code: `# Tiếp tục đọc dòng thứ ba từ file đang mở
line3 = F.readline()
F.close()

# Tách hai phần tử bằng ký tự phân cách $
parts = line3.split('$')
print("Các phần chuỗi thô:", parts)

# Dùng eval để chuyển đổi chuỗi thành đối tượng Python thực thụ
obj_list = eval(parts[0])
obj_dict = eval(parts[1])

print("Đối tượng List sau khi eval:", obj_list, type(obj_list).__name__)
print("Đối tượng Dict sau khi eval:", obj_dict, type(obj_dict).__name__)
print("Truy xuất phần tử dict['b']:", obj_dict['b'])`,
          output: `Các phần chuỗi thô: ['[1, 2, 3]', "{'a': 1, 'b': 2}\\n"]
Đối tượng List sau khi eval: [1, 2, 3] list
Đối tượng Dict sau khi eval: {'a': 1, 'b': 2} dict
Truy xuất phần tử dict['b']: 2`,
          annotations: [
            { line: 6, text: 'split(\'$\') tách chuỗi tại vị trí ký tự phân cách.' },
            { line: 10, text: 'eval(parts[0]) dịch chuỗi \'[1, 2, 3]\' thành list [1, 2, 3].' },
            { line: 11, text: 'eval(parts[1]) dịch chuỗi thành dictionary thực tế.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Luôn chỉ định encoding=\'utf-8\'',
        content: 'Khi mở file văn bản cho cả đầu vào lẫn đầu ra, hãy luôn viết <code>open(\'file.txt\', \'r\', encoding=\'utf-8\')</code>. Điều này giúp loại bỏ hoàn toàn các lỗi sai lệch bảng mã khi chạy mã trên Windows hoặc máy chủ Linux.'
      }
    ],
    pitfalls: [
      {
        title: 'Không bao giờ dùng eval() với dữ liệu từ người dùng',
        content: 'Chỉ sử dụng eval trong các bài kiểm tra nội bộ hoặc khi bạn hoàn toàn kiểm soát 100% nội dung tệp tin. Đối với bất kỳ dữ liệu đầu vào nào đến từ bên ngoài hoặc mạng, hãy luôn thay thế bằng <code>json.loads()</code> hoặc <code>ast.literal_eval()</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Ghi và đọc dữ liệu nhị phân với chuỗi bytes',
      level: 'Vừa',
      problem: 'Hãy viết mã Python: (1) Mở một file nhị phân \'test.bin\' ở mode \'wb\', ghi vào đó một chuỗi bytes b\'\\x48\\x65\\x6c\\x6c\\x6f\\x21\'. (2) Mở lại file ở mode \'rb\', đọc dữ liệu và in ra chuỗi bytes, đồng thời dùng phương thức .decode(\'ascii\') để chuyển thành chuỗi văn bản thông thường.',
      hint: 'Dùng mode \'wb\' và \'rb\'; data.decode(\'ascii\') giải mã bytes sang str.',
      solutionCode: `# 1. Ghi nhị phân
f = open('test.bin', 'wb')
f.write(b'\\x48\\x65\\x6c\\x6c\\x6f\\x21')
f.close()

# 2. Đọc nhị phân và giải mã
data = open('test.bin', 'rb').read()
print("Dữ liệu bytes:", data)
print("Giải mã sang chuỗi văn bản:", data.decode('ascii'))`,
      solutionOutput: `Dữ liệu bytes: b'Hello!'
Giải mã sang chuỗi văn bản: Hello!`,
      explanation: 'Các mã hex 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x21 chính là các mã ASCII của từng ký tự trong từ \'Hello!\'.'
    }
  ],

  quiz: [
    {
      question: 'Điểm khác biệt quan trọng nhất giữa file văn bản (\'r\') và file nhị phân (\'rb\') trong Python là gì?',
      options: [
        'File văn bản chạy nhanh hơn file nhị phân.',
        'File văn bản trả về chuỗi str và tự động mã hóa/giải mã Unicode cùng ngắt dòng; file nhị phân trả về bytes thô và giữ nguyên vẹn nội dung không đổi.',
        'File nhị phân chỉ mở được trên hệ điều hành Linux.',
        'File văn bản không thể lưu trữ các ký tự số.'
      ],
      correctIndex: 1,
      explanation: 'File văn bản biểu diễn dữ liệu bằng str, áp dụng Unicode encoding và ánh xạ ngắt dòng. File nhị phân xử lý bằng bytes thô, không biến đổi bất kỳ bit nào.'
    },
    {
      question: 'Vì sao Mark Lutz cảnh báo không nên lạm dụng hàm eval() để nạp lại đối tượng từ file?',
      options: [
        'Vì eval() chạy chậm gấp 1000 lần so với các hàm khác.',
        'Vì eval() sẽ thực thi bất kỳ mã lệnh Python tùy ý nào có trong file, tạo ra lỗ hổng bảo mật nghiêm trọng nếu file bị kẻ xấu chỉnh sửa.',
        'Vì eval() chỉ xử lý được số nguyên, không xử lý được chuỗi.',
        'Vì eval() sẽ tự động xóa file sau khi đọc.'
      ],
      correctIndex: 1,
      explanation: 'eval() thông dịch chuỗi như mã nguồn thực thi, cho phép kẻ tấn công chèn các câu lệnh nguy hiểm như xóa file hay gửi thông tin bảo mật ra ngoài.'
    }
  ],

  summary: [
    'File văn bản làm việc với chuỗi str, tự động mã hóa/giải mã Unicode và chuyển đổi ngắt dòng; File nhị phân làm việc với bytes thô nguyên vẹn không đổi.',
    'Các byte trong chuỗi bytes có thể truy xuất theo chỉ số vị trí, trả về các số nguyên 8-bit từ 0 đến 255.',
    'Để lưu nhiều đối tượng vào file văn bản, ta định dạng thành chuỗi, thêm \\n và dùng các ký tự phân cách như dấu phẩy hoặc $ rồi lưu.',
    'Khi đọc lại, dùng rstrip(), split() và các hàm ép kiểu như int() để phục hồi đối tượng.',
    'Hàm eval() có thể tái tạo cấu trúc phức tạp từ chuỗi nhưng tiềm ẩn rủi ro bảo mật nghiêm trọng; nên dùng pickle hoặc JSON để thay thế.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.7), chúng ta sẽ khám phá hai công cụ tuần tự hóa dữ liệu chuyên nghiệp và an toàn hơn nhiều so với eval: module pickle (dành riêng cho Python) và định dạng di động đa nền tảng JSON.'
};
