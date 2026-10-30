export default {
  id: 'lp-c9-04',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.4',
  title: 'Căn bản về Đối tượng File: Hàm open(), Đường dẫn Windows/Unix & Chế độ xử lý',
  subtitle: 'Khám phá đối tượng kết nối tệp tin trong Python, hàm dựng sẵn open(), cấu trúc đường dẫn thư mục, CWD, và các tùy chọn chế độ xử lý file',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững bản chất của đối tượng File: không phải là số, chuỗi hay ánh xạ, mà là một giao diện kết nối (handle) giữa chương trình Python và các tệp tin trên hệ điều hành.',
    'Thành thạo cú pháp cơ bản của hàm dựng sẵn open(filename, mode) và các đối số truyền vào.',
    'Hiểu rõ khái niệm Thư mục làm việc hiện tại (CWD - Current Working Directory), cách xác định CWD bằng os.getcwd() và liệt kê tệp bằng os.listdir().',
    'Giải quyết triệt để vấn đề ký tự thoát khi viết đường dẫn tệp trên Windows bằng 3 giải pháp: chuỗi thô (raw string r\'...\'), dấu gạch chéo xuôi (\'/\') kiểu Unix, và nhân đôi dấu gạch chéo ngược (\'\\\\\').',
    'Phân biệt rõ ràng các chế độ xử lý file cốt lõi: \'r\' (đọc văn bản), \'w\' (tạo mới/ghi đè), \'a\' (nối tiếp), \'b\' (nhị phân), và \'+\' (vừa đọc vừa ghi).'
  ],

  intuition: {
    title: 'Đường ống van khóa kết nối với giếng ngầm lưu trữ',
    metaphor: 'Tất cả các đối tượng mà bạn đã tạo ra từ trước đến nay — số nguyên, chuỗi, list, dict, tuple — đều cư trú tạm thời trên bộ nhớ RAM: khi chương trình tắt, toàn bộ dữ liệu sẽ tan biến. Đối tượng File trong Python giống như một chiếc đường ống có van khóa kết nối từ bàn làm việc (bộ nhớ RAM) xuống giếng ngầm lưu trữ vĩnh cửu (ổ đĩa cứng SSD/HDD). Lời gọi hàm `open()` chính là động tác mở van lắp đường ống: tham số `filename` chỉ định chính xác giếng nào cần kết nối, còn `mode` quy định chiều dòng chảy (chỉ múc nước lên bằng mode `\'r\'`, bơm nước mới vào làm sạch giếng cũ bằng mode `\'w\'`, hay đổ thêm nước vào cuối bể bằng mode `\'a\'`).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH KẾT NỐI VÀ CHẾ ĐỘ XỬ LÝ CỦA HÀM OPEN()</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #3b82f6;border-radius:8px;">
            <div style="font-weight:700;color:#3b82f6;margin-bottom:6px;">📖 Mode 'r' (Read)</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);">Mở để đọc (mặc định) • Con trỏ ở đầu file • Báo lỗi <code>FileNotFoundError</code> nếu file chưa tồn tại.</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #ef4444;border-radius:8px;">
            <div style="font-weight:700;color:#ef4444;margin-bottom:6px;">✍️ Mode 'w' (Write)</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);">Mở để ghi mới • Tự tạo file nếu chưa có • <strong>Xóa sạch (truncate)</strong> nội dung cũ nếu file đã tồn tại!</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;">
            <div style="font-weight:700;color:#10b981;margin-bottom:6px;">➕ Mode 'a' (Append)</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);">Mở để nối thêm • Tự tạo file nếu chưa có • Con trỏ ở cuối file, bảo toàn toàn bộ dữ liệu cũ.</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Đối Tượng File trong Python & Cú Pháp Mở File Cơ Bản',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 9 / 48 – Trang 11 / 48</strong>.</p>
          </div>
        </div>

        <p>Kiểu đối tượng dựng sẵn chính cuối cùng mà chúng ta tìm hiểu trong Phần II cung cấp cách thức truy cập các tệp tin được quản lý bởi hệ điều hành máy tính. Để mở một file, chương trình Python sẽ gọi hàm dựng sẵn <code>open</code>:</p>

        <pre><code>afile = open(filename, mode)
afile.method()</code></pre>

        <p>Hàm <code>open</code> trả về một đối tượng file. Đối tượng này đóng vai trò như một liên kết tới tệp tin bên ngoài, sở hữu các phương thức để truyền nhận chuỗi dữ liệu đến và đi từ tệp tin đó.</p>

        <p>So với các kiểu dữ liệu đã học, đối tượng file là một <strong>trường hợp ngoại lệ đặc biệt</strong>: Chúng được coi là một kiểu cốt lõi vì được tạo ra bởi hàm dựng sẵn, nhưng chúng không phải là số học, dãy tuần tự hay ánh xạ, và chúng không phản hồi các toán tử biểu thức (như phép cộng <code>+</code> hay chỉ mục <code>[]</code>); chúng chỉ cung cấp các phương thức phục vụ các tác vụ xử lý tệp tin.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Đường Dẫn Tệp Tin, Thư Mục Làm Việc Hiện Tại (CWD) & Module os',
      content: `
        <p>Đối số đầu tiên truyền vào <code>open</code> là tên tệp tin bên ngoài. Nó có thể bao gồm tiền tố đường dẫn thư mục tuyệt đối (đầy đủ) hoặc tương đối (một phần):</p>
        <ul>
          <li><strong>Đường dẫn tuyệt đối:</strong> Xác định vị trí tệp tin từ gốc cây thư mục (ví dụ <code>/Users/me/data.txt</code> trên Unix/macOS hoặc <code>C:\\data.txt</code> trên Windows).</li>
          <li><strong>Đường dẫn tương đối:</strong> Nếu <code>filename</code> không chứa tiền tố thư mục (chỉ ghi <code>'data.txt'</code>), file được coi là tồn tại trong <strong>Thư mục làm việc hiện tại (CWD - Current Working Directory)</strong>.</li>
        </ul>

        <p>CWD là thư mục mà từ đó tập lệnh của bạn được khởi chạy trong console. Trong Python, bạn có thể kiểm tra xem CWD hiện tại là gì và liệt kê danh sách tệp tin bằng module thư viện chuẩn <code>os</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra thư mục làm việc hiện tại (CWD) và danh sách file bằng module os',
          code: `import os

# Lấy đường dẫn thư mục làm việc hiện tại (tương tự lệnh pwd trên terminal)
cwd = os.getcwd()
print("Thư mục CWD hiện tại:", cwd)

# Liệt kê danh sách các tệp tin và thư mục con trong CWD
files = os.listdir('.')
print(f"Số lượng mục trong CWD: {len(files)}")
print("Một vài file tiêu biểu:", files[:3])`,
          output: `Thư mục CWD hiện tại: d:\\str
Số lượng mục trong CWD: 10
Một vài file tiêu biểu: ['.vscode', 'assets', 'css']`,
          annotations: [
            { line: 4, text: 'os.getcwd() trả về chuỗi đường dẫn tuyệt đối của thư mục làm việc.' },
            { line: 8, text: 'os.listdir(\'.\') trả về danh sách tên các tệp và thư mục con.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Khung Chuyên Đề: Viết Đường Dẫn Thư Mục trên Windows',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>🪟 Khung chuyên đề Mark Lutz:</span> <span>Viết đường dẫn trên Windows</span>
          </div>
          <div class="callout-body">
            <p>Nếu bạn cung cấp đường dẫn thư mục đầy đủ trên hệ điều hành Windows, bạn sẽ gặp phải một vấn đề cú pháp kinh điển: ký tự phân tách đường dẫn <code>\\</code> của Windows trùng với ký tự bắt đầu của các ký tự thoát (<em>escape sequence</em>) trong chuỗi Python theo Chương 7 (chẳng hạn <code>\\n</code> bị hiểu nhầm thành ký tự xuống dòng, <code>\\t</code> thành tab).</p>
          </div>
        </div>

        <p>Để khắc phục triệt để vấn đề này, Mark Lutz chỉ ra <strong>3 giải pháp hoàn toàn tương đương và hoạt động tốt trên Windows</strong>:</p>

        <ol>
          <li><strong>Chuỗi thô (Raw string với tiền tố <code>r</code>):</strong> <code>open(r'C:\\Users\\me\\newdata.txt')</code> — Tiền tố <code>r</code> tắt toàn bộ cơ chế thông diễn ký tự thoát, giữ nguyên dấu gạch chéo ngược.</li>
          <li><strong>Sử dụng dấu gạch chéo xuôi kiểu Unix (<code>/</code>):</strong> <code>open('C:/Users/me/newdata.txt')</code> — Hàm <code>open</code> của Python trên Windows tự động chấp nhận và chuyển đổi dấu gạch chéo xuôi sang dấu gạch chéo chuẩn của Windows. Đây là giải pháp di động và thanh lịch nhất!</li>
          <li><strong>Nhân đôi ký tự gạch chéo ngược (<code>\\\\</code>):</strong> <code>open('C:\\\\Users\\\\me\\\\newdata.txt')</code> — Mỗi cặp <code>\\\\</code> biểu thị đúng một ký tự <code>\\</code> nguyên bản.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Ba cách viết đường dẫn tệp tin trên Windows không bị lỗi escape sequence',
          code: `# Cách 1: Sử dụng chuỗi thô (raw string) - khuyến nghị
path1 = r'C:\\Users\\me\\code\\data.txt'

# Cách 2: Sử dụng dấu gạch chéo xuôi (slash) kiểu Unix - di động nhất
path2 = 'C:/Users/me/code/data.txt'

# Cách 3: Nhân đôi dấu gạch chéo ngược
path3 = 'C:\\\\Users\\\\me\\\\code\\\\data.txt'

print("Độ dài chuỗi path1:", len(path1))
print("Độ dài chuỗi path3:", len(path3))
print("Hai đường dẫn path1 và path3 có bằng nhau không?", path1 == path3)`,
          output: `Độ dài chuỗi path1: 29
Độ dài chuỗi path3: 29
Hai đường dẫn path1 và path3 có bằng nhau không? True`,
          annotations: [
            { line: 2, text: 'r\'...\' giữ nguyên mọi ký tự gạch chéo ngược, không kích hoạt escape.' },
            { line: 5, text: 'Dấu gạch chéo xuôi / hoạt động hoàn hảo trên mọi hệ điều hành (Windows, Linux, macOS).' },
            { line: 12, text: 'Cả path1 và path3 đều chứa đúng 29 ký tự sau khi thoát.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Các Chế Độ Xử Lý File (Processing Modes) & Tham Số Đệm',
      content: `
        <p>Đối số thứ hai truyền vào <code>open</code> là chuỗi chế độ xử lý (<em>processing mode</em>). Nếu bỏ qua đối số này, Python mặc định sử dụng <code>'r'</code> (mở để đọc văn bản). Các tùy chọn chế độ xử lý bao gồm:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:20%;">Chế độ (Mode)</th>
                <th style="padding:10px 12px;">Mục đích và Hành vi chi tiết</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'r'</code></td>
                <td style="padding:8px 12px;"><strong>Đọc văn bản (Mặc định):</strong> File phải tồn tại trước; con trỏ đặt ở đầu file.</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'w'</code></td>
                <td style="padding:8px 12px;"><strong>Ghi mới văn bản:</strong> Tự động tạo file nếu chưa có; xóa sạch nội dung cũ về 0 byte nếu file đã có!</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'a'</code></td>
                <td style="padding:8px 12px;"><strong>Nối thêm (Append):</strong> Tự động tạo file nếu chưa có; con trỏ đặt ở cuối file, giữ nguyên vẹn nội dung cũ.</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'rb', 'wb', 'ab'</code></td>
                <td style="padding:8px 12px;"><strong>Chế độ Nhị phân (Binary):</strong> Thêm ký tự <code>'b'</code> để đọc/ghi chuỗi <code>bytes</code> thô; tắt cơ chế tự động chuyển đổi ngắt dòng và giải mã Unicode.</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><code>'r+', 'w+'</code></td>
                <td style="padding:8px 12px;"><strong>Cập nhật (Đọc và Ghi):</strong> Thêm dấu <code>'+'</code> cho phép vừa đọc vừa ghi trên cùng một đối tượng file, kết hợp với các thao tác định vị con trỏ <code>seek()</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Ngoài ra, hàm <code>open</code> còn nhận một đối số thứ ba tùy chọn là một số nguyên điều khiển <strong>bộ đệm đầu ra (output buffering)</strong>: truyền số <code>0</code> biểu thị chế độ không dùng bộ đệm (dữ liệu được ghi lập tức xuống đĩa cứng, chỉ áp dụng cho file nhị phân); truyền số <code>1</code> là đệm theo từng dòng (line buffering cho file văn bản); hoặc một số nguyên dương xác định kích thước bộ đệm tính theo byte.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Ưu tiên dùng dấu gạch chéo xuôi / trên mọi nền tảng',
        content: 'Thay vì phải viết chuỗi thô phức tạp trên Windows, hãy tạo thói quen sử dụng dấu gạch chéo xuôi <code>path = \'data/sub/myfile.txt\'</code>. Mã nguồn của bạn sẽ chạy trơn tru trên cả Windows, macOS và Linux mà không cần sửa đổi.'
      }
    ],
    pitfalls: [
      {
        title: 'Cẩn trọng tuyệt đối với Mode \'w\'!',
        content: 'Khi mở một file với chế độ <code>\'w\'</code>, nếu file đó đã tồn tại, hệ điều hành sẽ lập tức cắt ngắn kích thước của nó về 0 (xóa sạch toàn bộ nội dung cũ) ngay tại thời điểm gọi lệnh open, kể cả khi bạn chưa hề gọi phương thức write nào!'
      }
    ]
  },

  exercises: [
    {
      title: 'Xử lý đường dẫn Windows và kiểm tra sự tồn tại của file',
      level: 'Dễ',
      problem: 'Hãy viết mã Python: (1) Khởi tạo đường dẫn tới file \'data/test.txt\' bằng 2 cách: dùng raw string với gạch chéo ngược Windows và dùng dấu gạch chéo xuôi Unix. (2) Sử dụng module os.path để kiểm tra xem file đó có tồn tại trong thư mục làm việc hiện tại hay không.',
      hint: 'Dùng r\'data\\\\test.txt\', \'data/test.txt\' và hàm os.path.exists().',
      solutionCode: `import os

path_win = r'data\\test.txt'
path_unix = 'data/test.txt'

print("Đường dẫn Windows raw string:", path_win)
print("Đường dẫn Unix gạch chéo xuôi:", path_unix)
print("File có tồn tại không?", os.path.exists(path_unix))`,
      solutionOutput: `Đường dẫn Windows raw string: data\\test.txt
Đường dẫn Unix gạch chéo xuôi: data/test.txt
File có tồn tại không? False`,
      explanation: 'Hàm os.path.exists kiểm tra sự tồn tại của tệp trên đĩa cứng; cả hai định dạng đường dẫn đều được Python chuyển hóa chính xác sang hệ thống gọi hàm của hệ điều hành.'
    }
  ],

  quiz: [
    {
      question: 'Điều gì sẽ xảy ra nếu bạn gọi lệnh open(\'important_notes.txt\', \'w\') trên một file quan trọng đang có sẵn dữ liệu?',
      options: [
        'Python sẽ báo lỗi FileExistsError để ngăn chặn việc ghi đè.',
        'File sẽ bị cắt ngắn kích thước về 0 byte (xóa sạch toàn bộ nội dung cũ) ngay lập tức.',
        'Python sẽ tự động tạo một file sao lưu mang tên important_notes.bak.',
        'Nội dung mới sẽ được nối thêm vào cuối file.'
      ],
      correctIndex: 1,
      explanation: 'Mode \'w\' luôn tạo mới hoặc cắt ngắn file về 0 byte (truncate). Muốn giữ lại nội dung cũ và nối thêm vào cuối, bạn phải dùng mode \'a\' (append).'
    },
    {
      question: 'Cách viết nào sau đây giúp tránh lỗi ký tự thoát escape sequence khi viết đường dẫn thư mục trên Windows?',
      options: [
        'Dùng chuỗi thô: r\'C:\\new\\temp.txt\'',
        'Dùng dấu gạch chéo xuôi: \'C:/new/temp.txt\'',
        'Nhân đôi dấu gạch chéo: \'C:\\\\new\\\\temp.txt\'',
        'Cả ba cách trên đều đúng và đều hoạt động tốt trong Python'
      ],
      correctIndex: 3,
      explanation: 'Cả 3 cách đều là giải pháp chuẩn xác được Mark Lutz trình bày trong khung chuyên đề: raw string tắt escape, dấu / được Python tự chuyển đổi, và \\\\ triệt tiêu ký tự thoát.'
    }
  ],

  summary: [
    'Đối tượng File là cổng giao tiếp I/O kết nối chương trình Python với các tệp tin bên ngoài do hệ điều hành quản lý.',
    'Hàm dựng sẵn open(filename, mode) trả về đối tượng file; filename không có tiền tố thư mục sẽ mặc định trỏ vào Thư mục làm việc hiện tại (CWD).',
    'Module os cung cấp các tiện ích os.getcwd() để xác định CWD và os.listdir() để xem danh mục tệp tin.',
    'Trên Windows, luôn ưu tiên sử dụng chuỗi thô r\'...\' hoặc dấu gạch chéo xuôi \'/\' để tránh lỗi ký tự thoát ngoài ý muốn.',
    'Chế độ xử lý phân định rõ: \'r\' (đọc, mặc định), \'w\' (ghi mới, xóa sạch cũ), \'a\' (nối tiếp), \'b\' (nhị phân), và \'+\' (cập nhật vừa đọc vừa ghi).'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.5), chúng ta sẽ bắt tay vào thực hành xử lý File: ghi dữ liệu bằng write(), đọc từng dòng bằng readline(), nhận biết điểm kết thúc file (EOF), và tìm hiểu cơ chế tự động đóng file trong bộ thu gom rác của Python.'
};
