export default {
  id: 'lp-c9-05',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.5',
  title: 'Sử dụng File trong thực tế: Đọc ghi readline, EOF, Bộ lặp file & Tự động đóng close()',
  subtitle: 'Thao tác đọc ghi tệp tin cơ bản, phương thức write và ký tự xuống dòng, dấu hiệu EOF chuỗi rỗng, duyệt lặp bằng file iterator, và cơ chế đóng file',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thực hành thành thạo chu trình làm việc kinh điển với file: mở file ghi -> gọi write() -> đóng file close() -> mở file đọc -> duyệt readline().',
    'Nhận biết chính xác dấu hiệu kết thúc file (EOF): phương thức readline() trả về một chuỗi rỗng \'\' (mang giá trị boolean False), phân biệt với một dòng trống chỉ chứa ký tự xuống dòng \'\\n\'.',
    'Nắm vững cơ chế của phương thức write(): trả về số ký tự đã ghi, không tự ý chèn ký tự xuống dòng, lập trình viên phải chủ động thêm \\n để phân định các dòng.',
    'So sánh sự khác biệt giữa read() (đọc toàn bộ vào một chuỗi) và Bộ lặp file (File Iterator for line in open): cơ chế đọc từng dòng on-demand tiết kiệm RAM tuyệt đối.',
    'Hiểu sâu cơ chế đóng file: close() thủ công, cơ chế tự động đóng khi thu gom rác (Garbage Collection / Refcount) trong CPython, và phương thức flush() xả sạch bộ đệm.'
  ],

  intuition: {
    title: 'Chiếc đầu từ chạy trên cuộn băng cassette',
    metaphor: 'Hãy hình dung file trên đĩa cứng giống như một cuộn băng từ cassette dài được ghi chép các dòng chữ. Khi bạn mở file, chiếc đầu từ (con trỏ vị trí - file pointer) được đặt ở điểm xuất phát (đầu cuộn băng). Mỗi lần bạn gọi `readline()`, cuộn băng quay từ từ, đầu từ đọc lướt qua các ký tự cho đến khi chạm vào ký hiệu ngắt dòng `\\n` thì dừng lại và trao dòng chữ đó cho bạn. Nếu bạn tiếp tục gọi `readline()` sau khi cuộn băng đã chạy hết đến cuối, đầu từ chạm vào khoảng không và trả về một chuỗi rỗng `\'\'` — đó chính là tín hiệu báo hiệu hết file (EOF). Bộ lặp file của Python thông minh đến mức nó tự động kéo cuộn băng từng đoạn một vừa khít với vòng lặp, giúp bạn không bao giờ phải chất toàn bộ cuộn băng khổng lồ vào bàn làm việc bộ nhớ RAM!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHU KỲ ĐỌC FILE BẰNG READLINE() VÀ TÍN HIỆU EOF</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
            <span style="font-weight:700;color:var(--accent-primary);min-width:110px;">Lần 1: readline()</span>
            <span style="font-family:monospace;background:rgba(59,130,246,0.1);padding:4px 8px;border-radius:4px;">'hello text file\\n'</span>
            <span style="font-size:0.75rem;color:var(--text-muted);margin-left:auto;">(Dòng 1 + ký tự \\n)</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
            <span style="font-weight:700;color:var(--accent-primary);min-width:110px;">Lần 2: readline()</span>
            <span style="font-family:monospace;background:rgba(59,130,246,0.1);padding:4px 8px;border-radius:4px;">'goodbye text file\\n'</span>
            <span style="font-size:0.75rem;color:var(--text-muted);margin-left:auto;">(Dòng 2 + ký tự \\n)</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg-surface);border:1px solid #10b981;border-radius:6px;">
            <span style="font-weight:700;color:#10b981;min-width:110px;">Lần 3: readline()</span>
            <span style="font-family:monospace;background:rgba(16,185,129,0.15);padding:4px 8px;border-radius:4px;font-weight:700;">'' (Chuỗi rỗng!)</span>
            <span style="font-size:0.75rem;color:#10b981;margin-left:auto;font-weight:700;">➔ Đã chạm điểm kết thúc file (EOF)</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Thao Tác Ghi & Đọc Từng Dòng: write(), readline() & Dấu Hiệu EOF',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 13 / 48 – Trang 14 / 48</strong>.</p>
          </div>
        </div>

        <p>Chúng ta hãy cùng theo dõi một ví dụ minh họa các thao tác xử lý file cơ bản. Đoạn mã sau bắt đầu bằng việc mở một file văn bản mới cho đầu ra với mode <code>'w'</code>, ghi hai dòng kết thúc bằng ký tự ngắt dòng <code>\\n</code>, rồi đóng file lại bằng <code>close()</code>. Sau đó, mở lại chính file đó ở chế độ đầu vào (<code>'r'</code> mặc định) và đọc lại từng dòng một:</p>

        <p>Điểm mấu chốt cần lưu ý:</p>
        <ul>
          <li><strong>Phương thức write(str):</strong> Trả về số lượng ký tự (hoặc byte) đã được ghi vào file. Phương thức ghi <em>không tự động thêm ký tự xuống dòng</em> cho chúng ta, vì vậy bạn phải chủ động đưa <code>\\n</code> vào chuỗi để kết thúc dòng một cách chuẩn xác; nếu không có ký tự này, lệnh ghi kế tiếp sẽ tiếp tục nối thẳng vào đuôi dòng hiện tại.</li>
          <li><strong>Dấu hiệu EOF (End of File):</strong> Lần gọi <code>readline()</code> thứ ba trả về một chuỗi rỗng <code>''</code> — đây là cách mà hầu hết các phương thức đọc file của Python báo cho bạn biết rằng con trỏ file đã chạm tới điểm kết thúc tệp tin. Chuỗi rỗng này mang giá trị boolean <code>False</code>, giúp bạn dễ dàng viết vòng lặp kiểm tra. Ngược lại, một dòng trống trong file sẽ được trả về dưới dạng chuỗi chứa ký tự xuống dòng <code>'\\n'</code> (mang giá trị boolean <code>True</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Ghi hai dòng vào file văn bản và đọc lại từng dòng bằng readline()',
          code: `# 1. Mở file để ghi mới ('w')
myfile = open('myfile.txt', 'w')
chars_written_1 = myfile.write('hello text file\\n')
chars_written_2 = myfile.write('goodbye text file\\n')
myfile.close()

print(f"Đã ghi dòng 1: {chars_written_1} ký tự")
print(f"Đã ghi dòng 2: {chars_written_2} ký tự")

# 2. Mở lại file để đọc ('r' là mặc định)
myfile = open('myfile.txt')
line1 = myfile.readline()
line2 = myfile.readline()
line3 = myfile.readline()
myfile.close()

print("Line 1:", repr(line1))
print("Line 2:", repr(line2))
print("Line 3 (EOF):", repr(line3), "| Is empty?", line3 == '')`,
          output: `Đã ghi dòng 1: 16 ký tự
Đã ghi dòng 2: 18 ký tự
Line 1: 'hello text file\\n'
Line 2: 'goodbye text file\\n'
Line 3 (EOF): '' | Is empty? True`,
          annotations: [
            { line: 3, text: 'myfile.write trả về 16 (độ dài chuỗi tính cả ký tự \\n).' },
            { line: 5, text: 'myfile.close() xả sạch bộ đệm xuống đĩa và đóng tệp.' },
            { line: 12, text: 'Lần đọc thứ 3 sau khi hết dữ liệu trả về chuỗi rỗng \'\'.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Đọc Toàn Bộ Bằng read() & Đọc Tối Ưu Bằng Bộ Lặp File',
      content: `
        <p>Nếu bạn muốn đọc toàn bộ nội dung của file vào một chuỗi duy nhất cùng một lúc, bạn có thể gọi phương thức <code>read()</code> mà không truyền đối số. Kết hợp đọc và <code>print()</code> sẽ thông diễn các ký tự <code>\\n</code> để hiển thị thân thiện:</p>

        <p>Tuy nhiên, <strong>nếu bạn muốn quét qua một file văn bản từng dòng một, Bộ lặp file (File Iterator) luôn là lựa chọn tối ưu nhất của bạn</strong>:</p>

        <p>Khi được viết dưới dạng <code>for line in open('myfile.txt'):</code>, đối tượng file tạm thời được tạo ra sẽ tự động đọc và nạp một dòng trong mỗi lần lặp. Cấu trúc này vừa dễ viết, vừa tiêu tốn cực ít bộ nhớ RAM (vì không tải toàn bộ file vào bộ nhớ), và chạy nhanh hơn so với các phương pháp đọc thủ công khác!</p>
      `,
      codeExamples: [
        {
          title: 'Đọc toàn bộ file bằng read() và duyệt từng dòng bằng bộ lặp file',
          code: `# Cách 1: Đọc toàn bộ nội dung cùng một lúc vào một chuỗi
full_text = open('myfile.txt').read()
print("Chuỗi nguyên bản:", repr(full_text))
print("--- Hiển thị thân thiện qua print() ---")
print(full_text, end='')

# Cách 2: Quét từng dòng bằng bộ lặp file (Iterator) - Khuyến nghị tối ưu
print("--- Duyệt từng dòng bằng Bộ lặp file ---")
for line in open('myfile.txt'):
    # Dùng end='' vì biến line đã có sẵn ký tự \\n ở cuối
    print(line, end='')`,
          output: `Chuỗi nguyên bản: 'hello text file\\ngoodbye text file\\n'
--- Hiển thị thân thiện qua print() ---
hello text file
goodbye text file
--- Duyệt từng dòng bằng Bộ lặp file ---
hello text file
goodbye text file`,
          annotations: [
            { line: 2, text: 'open(\'myfile.txt\').read() nạp toàn bộ file vào một chuỗi.' },
            { line: 9, text: 'for line in open(...) sử dụng giao thức iterator, nạp từng dòng on-demand.' },
            { line: 11, text: 'print(line, end=\'\') tránh bị giãn dòng đôi (double-spacing).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cơ Chế Đóng File close(), Thu Gom Rác & Xả Bộ Đệm flush()',
      content: `
        <p>Phương thức <code>close()</code> chấm dứt kết nối của chương trình với tệp tin bên ngoài, giải phóng tài nguyên hệ thống (file descriptor của OS), và xả sạch toàn bộ dữ liệu đang đệm xuống đĩa cứng. Khi nào bạn cần đóng file?</p>

        <ul>
          <li><strong>Tự động đóng khi thu gom rác (Garbage Collection):</strong> Như đã học ở Chương 6, khi một đối tượng file không còn được biến nào tham chiếu tới (ví dụ đối tượng file tạm thời trong <code>open('...').read()</code>), Python sẽ tự động thu hồi ô nhớ và đóng file lại. Điều này cũng xảy ra khi chương trình kết thúc.</li>
          <li><strong>Vì sao vẫn nên gọi close() thủ công?</strong> Mark Lutz phân tích rằng việc tự động đóng là một chi tiết cài đặt riêng của CPython dựa trên cơ chế đếm tham chiếu (reference counting). Trên các bản cài đặt Python khác (như PyPy, Jython) có bộ thu gom rác thế hệ không thu hồi tức thì, hoặc trong các vòng lặp lớn mở hàng nghìn file, hệ điều hành có thể bị cạn kiệt tay cầm file (file handles) trước khi bộ thu gom rác kịp chạy.</li>
          <li><strong>Phương thức flush():</strong> Theo mặc định, file đầu ra luôn được đệm trong bộ nhớ (buffered) để tăng hiệu năng ghi đĩa. Gọi <code>myfile.flush()</code> sẽ ép dữ liệu trong bộ đệm phải ghi ngay tức khắc xuống đĩa mà không cần đóng file.</li>
        </ul>
      `,
      codeExamples: []
    },
    {
      id: 'sec-4',
      title: '4. File Ghi Chuỗi, Không Ghi Đối Tượng: Lỗi TypeError khi Ghi Số',
      content: `
        <p>Một nguyên lý căn bản của file trong Python: <strong>Nội dung được ghi vào file luôn luôn phải là chuỗi (str hoặc bytes), và nội dung đọc từ file cũng luôn luôn quay về dưới dạng chuỗi</strong>.</p>

        <p>Các phương thức <code>write()</code> không hề thực hiện bất kỳ phép chuyển đổi kiểu tự động nào. Nếu bạn cố tình truyền một con số (hoặc list, dict) vào <code>write()</code>, Python sẽ lập tức báo lỗi <code>TypeError</code>. Bạn bắt buộc phải tự chuyển đổi số thành chuỗi bằng hàm <code>str()</code> hoặc f-string trước khi ghi:</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa lỗi TypeError khi ghi số và giải pháp chuyển đổi kiểu',
          code: `# Thử ghi trực tiếp số thực 3.14 vào file
f = open('myfile2.txt', 'w')
try:
    f.write(3.14)
except TypeError as err:
    print("Bắt lỗi TypeError:", err)

# Giải pháp chuẩn: Chuyển đổi số thành chuỗi và thêm ký tự \\n
chars = f.write(str(3.14) + '\\n')
f.close()
print("Số ký tự chuỗi đã ghi thành công:", chars)

# Đọc lại và chuyển đổi chuỗi ngược về số thực bằng float()
raw_data = open('myfile2.txt').read()
print("Dữ liệu chuỗi đọc được:", repr(raw_data))
num_val = float(raw_data.rstrip())
print("Giá trị số sau khi chuyển đổi lại:", num_val, type(num_val).__name__)`,
          output: `Bắt lỗi TypeError: write() argument must be str, not float
Số ký tự chuỗi đã ghi thành công: 5
Dữ liệu chuỗi đọc được: '3.14\\n'
Giá trị số sau khi chuyển đổi lại: 3.14 float`,
          annotations: [
            { line: 5, text: 'f.write(3.14) thất bại vì write đòi hỏi đối số là str, không nhận float.' },
            { line: 9, text: 'str(3.14) + \'\\n\' tạo chuỗi \'3.14\\n\' có độ dài 5 ký tự.' },
            { line: 16, text: 'float(...) tự động bỏ qua khoảng trắng và \\n để chuyển thành số thực.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tránh giãn dòng đôi khi in file (Double Spacing)',
        content: 'Vì mỗi dòng do <code>readline()</code> hoặc bộ lặp file trả về đã có sẵn ký tự <code>\\n</code> ở cuối, khi dùng lệnh <code>print(line)</code> bạn nên truyền thêm tham số <code>end=\'\'</code> để tránh việc print tự động thêm một dấu xuống dòng thứ hai.'
      }
    ],
    pitfalls: [
      {
        title: 'Phân biệt giữa dòng trống và điểm kết thúc file (EOF)',
        content: 'Một dòng trống trong file văn bản trả về chuỗi <code>\'\\n\'</code> (độ dài 1 ký tự, mang giá trị boolean True). Chỉ khi nào chạm đến cuối file (EOF), phương thức readline() mới trả về chuỗi rỗng <code>\'\'</code> (độ dài 0 ký tự, mang giá trị boolean False).'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo nhật ký và duyệt từng dòng bằng bộ lặp file',
      level: 'Dễ',
      problem: 'Hãy viết mã Python: (1) Mở file \'log.txt\' ở chế độ ghi mới, ghi vào đó 3 dòng nội dung bất kỳ kèm ký tự \\n, sau đó đóng file. (2) Mở lại file đó và dùng bộ lặp file (for line in ...) để in ra từng dòng kèm số thứ tự dòng (1, 2, 3), loại bỏ ký tự ngắt dòng thừa.',
      hint: 'Dùng enumerate(open(\'log.txt\'), 1) và phương thức line.rstrip().',
      solutionCode: `# 1. Ghi file
f = open('log.txt', 'w')
f.write('Khởi động hệ thống\\n')
f.write('Kết nối cơ sở dữ liệu\\n')
f.write('Sẵn sàng tiếp nhận yêu cầu\\n')
f.close()

# 2. Đọc bằng bộ lặp file kết hợp enumerate
for idx, line in enumerate(open('log.txt'), 1):
    print(f"Dòng {idx}: {line.rstrip()}")`,
      solutionOutput: `Dòng 1: Khởi động hệ thống
Dòng 2: Kết nối cơ sở dữ liệu
Dòng 3: Sẵn sàng tiếp nhận yêu cầu`,
      explanation: 'Bộ lặp file kết hợp với enumerate vừa cung cấp số thứ tự dòng vừa nạp từng dòng theo cơ chế iterator hiệu quả.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn gọi f.readline() trên một file đang mở và nhận được kết quả là chuỗi rỗng \'\', điều đó có ý nghĩa gì?',
      options: [
        'File đó đang chứa một dòng trống không có chữ.',
        'File đó không tồn tại trên đĩa cứng.',
        'Con trỏ đọc đã chạm tới điểm kết thúc tệp tin (End of File - EOF).',
        'Bộ đệm file đang bị tắc nghẽn.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python, readline() trả về chuỗi rỗng \'\' để báo hiệu đã đọc hết file (EOF). Một dòng trống sẽ trả về chuỗi \'\\n\'.'
    },
    {
      question: 'Vì sao vòng lặp "for line in open(\'data.txt\'):" được khuyến nghị sử dụng thay vì "open(\'data.txt\').readlines()"?',
      options: [
        'Vì readlines() bị cấm trong Python 3.',
        'Vì bộ lặp file nạp từng dòng theo yêu cầu (on-demand), tiêu tốn cực ít bộ nhớ RAM ngay cả với file có dung lượng hàng gigabyte.',
        'Vì bộ lặp file tự động xóa các ký tự xuống dòng \\n.',
        'Vì readlines() chạy chậm hơn 100 lần so với bộ lặp.'
      ],
      correctIndex: 1,
      explanation: 'readlines() nạp toàn bộ mọi dòng vào một list trong RAM cùng lúc, có thể làm tràn bộ nhớ với file lớn. Bộ lặp file là một iterator chỉ giữ một dòng duy nhất trong RAM tại mỗi thời điểm.'
    }
  ],

  summary: [
    'Quy trình xử lý file cơ bản: open(filename, mode) -> thao tác đọc/ghi -> close().',
    'Phương thức write() không tự chèn ký tự xuống dòng; lập trình viên phải chủ động thêm \\n để phân định các dòng.',
    'Phương thức readline() trả về từng dòng kèm ký tự \\n; khi chạm điểm kết thúc file (EOF), nó trả về chuỗi rỗng \'\'.',
    'Bộ lặp file (for line in open(...)) là giải pháp tối ưu hàng đầu để duyệt từng dòng trong file văn bản mà không tốn bộ nhớ.',
    'Nội dung file luôn là chuỗi; mọi đối tượng số hay tập hợp khác bắt buộc phải được chuyển đổi (như qua str()) trước khi ghi.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.6), chúng ta sẽ khám phá sự phân biệt rạch ròi giữa File văn bản (str) và File nhị phân (bytes), cùng các kỹ thuật lưu trữ nhiều đối tượng Python đa dạng kèm chuyển đổi và phân tích cú pháp (parse).'
};
