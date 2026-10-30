export default {
  id: 'lp-c9-08',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.8',
  title: 'Lưu trữ dữ liệu có định dạng (struct, csv) & Trình quản lý ngữ cảnh File (with)',
  subtitle: 'Đóng gói dữ liệu nhị phân C với struct, bảng CSV với module csv, cơ chế quản lý ngữ cảnh with open và các công cụ file mở rộng',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Khám phá module struct của thư viện chuẩn: đóng gói các số int và chuỗi bytes vào định dạng nhị phân đóng gói dạng C (struct.pack) và giải nén lại (struct.unpack).',
    'Thực hành xử lý dữ liệu bảng phân tách bằng dấu phẩy với module csv thông qua đối tượng csv.reader.',
    'Thấu suốt cơ chế Trình quản lý ngữ cảnh (Context Manager) của câu lệnh with open(...) as myfile: đảm bảo tự động đóng file và xả sạch dữ liệu bộ đệm ngay khi thoát khỏi khối lệnh, bất kể có lỗi ngoại lệ xảy ra hay không.',
    'So sánh câu lệnh with với cấu trúc bắt ngoại lệ tổng quát try/finally: myfile.close().',
    'Bao quát toàn cảnh các công cụ liên quan đến file trong Python: luồng tiêu chuẩn (sys.stdout, sys.stdin), file descriptor trong module os, socket mạng, tiến trình subprocess.Popen, và gói module io.'
  ],

  intuition: {
    title: 'Chiếc cửa tự động đóng có chốt hãm thủy lực an toàn',
    metaphor: 'Trong lập trình xử lý file, một trong những lỗi sơ đẳng nhưng nguy hiểm nhất là "quên đóng file" sau khi mở: nếu chương trình gặp lỗi bất ngờ ở giữa chừng, luồng thực thi bị ngắt trước khi chạm tới lệnh `f.close()`, tệp tin có thể bị khóa hoặc dữ liệu trong bộ đệm bị mất vĩnh viễn! Câu lệnh `with open(...) as f:` giống như một chiếc cửa thông minh được lắp bản lề thủy lực tự động: bất kể bạn bước ra khỏi phòng một cách bình thường hay hốt hoảng chạy ra ngoài do báo động cháy (ngoại lệ Exception), chiếc chốt thủy lực sẽ luôn luôn tự động kéo sập cánh cửa lại, xả sạch toàn bộ van áp suất xuống đĩa và giải phóng tài nguyên cho hệ điều hành một cách chắc chắn 100%!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHU TRÌNH BẢO ĐẢM TỰ ĐỘNG ĐÓNG CỦA CÂU LỆNH WITH OPEN</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:4px;">
            <code>with open('data.txt') as myfile:</code> ➔ <strong>Mở file & kích hoạt __enter__()</strong>
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid #3b82f6;border-radius:4px;margin-left:20px;">
            <code>for line in myfile: ... xử lý ...</code> ➔ <strong>Khối lệnh thực thi nghiệp vụ</strong>
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid #10b981;border-radius:4px;">
            <code>[Tự động gọi __exit__()]</code> ➔ <strong>Xả bộ đệm & tự động myfile.close() dù có lỗi hay không!</strong>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Đóng Gói Dữ Liệu Nhị Phân Dạng C Bằng Module struct',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 22 / 48</strong>.</p>
          </div>
        </div>

        <p>Để biết các cách phổ biến khác xử lý các file dữ liệu có định dạng, hãy xem các module <code>struct</code> và <code>csv</code> của thư viện chuẩn. Một cách rất ngắn gọn, module <code>struct</code> vừa có thể tạo vừa có thể phân tích cú pháp dữ liệu nhị phân đóng gói thuộc dạng thường được chia sẻ với các chương trình viết bằng C:</p>

        <ul>
          <li><code>struct.pack(format, v1, v2, ...)</code>: Đóng gói các giá trị Python vào một chuỗi <code>bytes</code> theo chuỗi định dạng (ví dụ: <code>'i6s'</code> biểu thị một số nguyên 4-byte <code>int</code> đi kèm một chuỗi 6-byte <code>bytes</code>).</li>
          <li><code>struct.unpack(format, bytes_data)</code>: Giải nén chuỗi bytes nhị phân trở lại thành một tuple các đối tượng Python.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Đóng gói và giải nén dữ liệu nhị phân dạng C với module struct',
          code: `import struct

# Đóng gói số nguyên 62 và chuỗi bytes b'Python' vào chuỗi nhị phân (format 'i6s')
data = struct.pack('i6s', 62, b'Python')
print("Dữ liệu nhị phân đóng gói data:", repr(data))

# Ghi dữ liệu nhị phân xuống file 'data.bin'
file = open('data.bin', 'wb')
file.write(data)
file.close()

# Đọc lại và giải nén trực tiếp từ file
raw = open('data.bin', 'rb').read()
unpacked = struct.unpack('i6s', raw)
print("Kết quả giải nén unpacked:", unpacked)
print("Số nguyên:", unpacked[0], "| Chuỗi bytes:", unpacked[1])`,
          output: `Dữ liệu nhị phân đóng gói data: b'>\\x00\\x00\\x00Python'
Kết quả giải nén unpacked: (62, b'Python')
Số nguyên: 62 | Chuỗi bytes: b'Python'`,
          annotations: [
            { line: 4, text: '62 là số nguyên dạng C (4 bytes: >\\x00\\x00\\x00 vì 62 là mã ASCII của ký tự >).' },
            { line: 5, text: 'b\'Python\' chiếm đúng 6 bytes tiếp theo.' },
            { line: 15, text: 'struct.unpack trả về tuple đối tượng tương ứng ban đầu.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phân Tích Cú Pháp Dữ Liệu Bảng Phân Tách Bằng Module csv',
      content: `
        <p>Và module <code>csv</code> phân tích cú pháp và tạo dữ liệu phân tách bằng dấu phẩy (CSV) trong các file và chuỗi. Nó không ánh xạ trực tiếp sang các đối tượng Python như pickle (và đòi hỏi phải chuyển đổi kiểu sau khi phân tích cú pháp), nhưng là một cách tiêu chuẩn để ánh xạ giá trị bảng đến và đi từ file:</p>
      `,
      codeExamples: [
        {
          title: 'Ghi và đọc file CSV bằng module csv của thư viện chuẩn',
          code: `import csv

# 1. Ghi một file dữ liệu CSV mẫu
f_out = open('csvdata.txt', 'w', newline='', encoding='utf-8')
writer = csv.writer(f_out)
writer.writerow(['a', 'bbb', 'cc', 'dddd'])
writer.writerow(['11', '22', '33', '44'])
f_out.close()

# 2. Đọc file CSV bằng csv.reader
f_in = open('csvdata.txt', 'r', encoding='utf-8')
rdr = csv.reader(f_in)
for row in rdr:
    print("Dòng CSV:", row)
f_in.close()`,
          output: `Dòng CSV: ['a', 'bbb', 'cc', 'dddd']
Dòng CSV: ['11', '22', '33', '44']`,
          annotations: [
            { line: 5, text: 'csv.writer xử lý việc chèn dấu phẩy và thoát ký tự an toàn.' },
            { line: 12, text: 'csv.reader tự động bóc tách từng trường dữ liệu thành list các chuỗi.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Trình Quản Lý Ngữ Cảnh của File: Câu Lệnh with open',
      content: `
        <p>Bạn cũng sẽ muốn đón đọc phần thảo luận chuyên sâu ở Chương 34 về việc hỗ trợ <strong>trình quản lý ngữ cảnh (context manager)</strong> của file. Dù tính năng này thiên về cơ chế xử lý ngoại lệ hơn là bản thân file, nó cho phép chúng ta bọc mã xử lý file trong một tầng logic đảm bảo rằng file sẽ được đóng (và nếu cần, toàn bộ đầu ra được xả sạch xuống đĩa) một cách tự động khi thoát khỏi câu lệnh, thay vì phải phụ thuộc vào việc tự động đóng trong quá trình thu gom rác hay các lệnh gọi <code>close()</code> thủ công.</p>

        <p>So sánh hai cách viết để đạt cùng một mục đích an toàn tuyệt đối:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh câu lệnh with open hiện đại và cấu trúc try / finally kinh điển',
          code: `# Cách 1: Dùng trình quản lý ngữ cảnh with (Khuyến nghị hiện đại)
with open('data.txt', 'w', encoding='utf-8') as myfile:
    myfile.write('Dòng 1 trong khối with\\n')
    myfile.write('Dòng 2 trong khối with\\n')
# Ra khỏi khối thụt lề, myfile tự động được đóng!
print("myfile đã đóng chưa?", myfile.closed)

# Cách 2: Cấu trúc tương đương try / finally (phải viết thêm 3 dòng mã)
f = open('data.txt', 'a', encoding='utf-8')
try:
    f.write('Dòng 3 ghi trong try/finally\\n')
finally:
    f.close()
print("f đã đóng chưa?", f.closed)`,
          output: `myfile đã đóng chưa? True
f đã đóng chưa? True`,
          annotations: [
            { line: 2, text: 'Câu lệnh with gán đối tượng file cho biến myfile.' },
            { line: 7, text: 'myfile.closed trả về True chứng minh file đã được đóng tự động.' },
            { line: 13, text: 'Khối finally đảm bảo f.close() luôn chạy kể cả khi có ngoại lệ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Các Công Cụ Thao Tác Với File Khác Trong Python',
      content: `
        <p>Như Mark Lutz nhấn mạnh ở trang 23, ngoài hàm <code>open</code> thông dụng, trong hệ sinh thái Python còn tồn tại rất nhiều công cụ liên quan đến file phục vụ các tác vụ cấp thấp hoặc chuyên biệt:</p>

        <ul>
          <li><strong>Luồng tiêu chuẩn (Standard streams):</strong> Các đối tượng file được mở sẵn trong module <code>sys</code>, chẳng hạn như <code>sys.stdout</code> (đầu ra chuẩn kết nối với màn hình console), <code>sys.stdin</code> (đầu vào chuẩn), và <code>sys.stderr</code> (luồng báo lỗi).</li>
          <li><strong>File mô tả (Descriptor files) trong module os:</strong> Các tay cầm file dạng số nguyên (integer file descriptor) hỗ trợ các lời gọi hệ thống cấp thấp như <code>os.open()</code>, <code>os.read()</code>, và cờ <code>"x"</code> trong hàm <code>open</code> để tạo file độc quyền (báo lỗi nếu file đã tồn tại).</li>
          <li><strong>Socket, pipe và FIFO:</strong> Các đối tượng giống file (file-like) được sử dụng để đồng bộ hóa các tiến trình hoặc truyền thông mạng.</li>
          <li><strong>Luồng lệnh shell (Shell-command streams):</strong> Các công cụ như <code>os.popen</code> và <code>subprocess.Popen</code> hỗ trợ sinh ra các lệnh shell và đọc ghi vào các luồng tiêu chuẩn của chúng (tìm hiểu kỹ ở Chương 21).</li>
          <li><strong>Gói module io:</strong> Đối với những người thích thám hiểm mã nguồn sâu (code spelunkers), hàm <code>open</code> của Python thực chất là một giao diện kết nối tới các công cụ trong module <code>io</code> của thư viện chuẩn, bổ sung các tầng logic đệm và mã hóa Unicode lên trên các công cụ file của hệ điều hành bên dưới.</li>
        </ul>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Luôn luôn sử dụng câu lệnh with cho mọi tác vụ xử lý file',
        content: 'Trong mọi đoạn mã thực tế hiện đại, việc bọc các thao tác file trong <code>with open(...) as f:</code> là tiêu chuẩn vàng (gold standard) giúp ngăn ngừa hoàn toàn rò rỉ tài nguyên hệ thống.'
      }
    ],
    pitfalls: [
      {
        title: 'Biến file vẫn tồn tại sau khi thoát with nhưng đã bị đóng!',
        content: 'Biến <code>myfile</code> sau khi thoát khỏi khối lệnh <code>with</code> vẫn tham chiếu tới đối tượng file đó, nhưng trạng thái của nó là <code>myfile.closed == True</code>. Mọi cố gắng gọi <code>myfile.read()</code> hay <code>myfile.write()</code> sau đó sẽ báo lỗi <code>ValueError: I/O operation on closed file</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Đọc ghi an toàn bằng with open và kiểm tra thuộc tính closed',
      level: 'Dễ',
      problem: 'Hãy viết mã Python: (1) Sử dụng câu lệnh with open để tạo file \'notes.txt\', ghi một dòng thông điệp và in ra giá trị f.closed bên trong khối with. (2) Ra ngoài khối with, in lại giá trị f.closed và thử gọi f.read() trong khối try/except để quan sát lỗi ValueError.',
      hint: 'Dùng with open(\'notes.txt\', \'w+\') as f: và kiểm tra f.closed.',
      solutionCode: `with open('notes.txt', 'w+', encoding='utf-8') as f:
    f.write('Ghi chú an toàn với context manager\\n')
    print("Bên trong with: f.closed =", f.closed)

print("Bên ngoài with: f.closed =", f.closed)

try:
    f.read()
except ValueError as err:
    print("Bắt lỗi khi thao tác trên file đã đóng:", err)`,
      solutionOutput: `Bên trong with: f.closed = False
Bên ngoài with: f.closed = True
Bắt lỗi khi thao tác trên file đã đóng: I/O operation on closed file.`,
      explanation: 'Khi thoát khỏi thụt lề của with, phương thức __exit__ tự động đóng file (closed = True), ngăn chặn mọi thao tác I/O tiếp theo.'
    }
  ],

  quiz: [
    {
      question: 'Ưu thế lớn nhất của câu lệnh "with open(...) as f:" so với việc gọi open() và close() thủ công là gì?',
      options: [
        'Câu lệnh with giúp file ghi nhanh gấp hai lần.',
        'Đảm bảo file luôn luôn được đóng và xả bộ đệm tự động ngay khi thoát khỏi khối lệnh, kể cả khi xảy ra ngoại lệ làm sập chương trình.',
        'Tự động mã hóa mật khẩu cho file văn bản.',
        'Chỉ cho phép đọc mà không cho phép ghi đè.'
      ],
      correctIndex: 1,
      explanation: 'Giao thức context manager của with đảm bảo phương thức __exit__() luôn được kích hoạt trong mọi tình huống thoát (kể cả exception), đảm bảo an toàn tài nguyên tuyệt đối.'
    },
    {
      question: 'Module nào của thư viện chuẩn cung cấp sys.stdout - đối tượng file kết nối trực tiếp với giao diện console chuẩn?',
      options: [
        'os',
        'sys',
        'io',
        'struct'
      ],
      correctIndex: 1,
      explanation: 'Module sys cung cấp các luồng tiêu chuẩn: sys.stdout (chuẩn xuất), sys.stdin (chuẩn nhập) và sys.stderr (chuẩn báo lỗi).'
    }
  ],

  summary: [
    'Module struct cho phép đóng gói (pack) và giải nén (unpack) dữ liệu nhị phân tương thích với các kiểu dữ liệu và cấu trúc trong ngôn ngữ C.',
    'Module csv cung cấp các bộ đọc (csv.reader) và bộ ghi (csv.writer) chuyên dụng để xử lý dữ liệu bảng phân tách bằng dấu phẩy an toàn.',
    'Câu lệnh with open(...) là trình quản lý ngữ cảnh chuẩn mực, bảo đảm tự động đóng file và xả sạch dữ liệu trong mọi kịch bản thoát lệnh.',
    'Bên cạnh open(), Python còn sở hữu hệ thống công cụ phong phú: luồng tiêu chuẩn sys, file descriptor os, socket mạng, và gói module io nền tảng.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.9), chúng ta sẽ bước sang phần thứ hai của Chương 9: Đánh giá và Tóm tắt các kiểu cốt lõi, bao quát toàn cảnh Bảng 9-3, phân loại thể loại đối tượng, tính khả biến và khái niệm nạp chồng toán tử trong OOP.'
};
