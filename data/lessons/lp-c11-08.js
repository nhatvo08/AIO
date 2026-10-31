export default {
  id: 'lp-c11-08',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.8',
  title: 'Thao tác In ấn Toàn diện — Hàm print(), 4 Tham số Từ khóa & Thực hành Định dạng',
  subtitle: 'Bản chất giao diện stdout, 3 luồng tiêu chuẩn, phân tích sâu 4 tham số sep, end, file, flush và ranh giới giữa print() thô với f-string',
  level: 'Cơ bản đến Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu bản chất của thao tác in ấn: print() là một hàm gọi biểu thức cung cấp giao diện công thái học thân thiện tới luồng đầu ra tiêu chuẩn (sys.stdout).',
    'So sánh sự tiện lợi của print() với phương thức file.write(str) nguyên thủy: tự động chuyển đổi đối tượng qua str(), tự động chèn khoảng cách và ngắt dòng.',
    'Làm chủ toàn diện 4 tham số từ khóa của hàm print(): sep (phân cách), end (kết thúc dòng), file (luồng đích) và flush (xả bộ đệm tức thời).',
    'Phân định rõ ràng khi nào nên dùng tham số sep/end của print() và khi nào nên dùng định dạng chuỗi chuyên biệt (f-string), tránh lạm dụng búa tạ đóng đinh nhỏ.'
  ],

  intuition: {
    title: 'Người Phiên Dịch Tự Động Trước Cánh Cửa Màn Hình',
    metaphor: 'Luồng đầu ra tiêu chuẩn (stdout) giống như một khe hẹp của bức tường chỉ chấp nhận nuốt từng ký tự chữ thô đơn lẻ (chuỗi str). Nếu bạn dùng công cụ thô sơ file.write(), bạn phải tự mình làm mọi việc thủ công: tự ép các con số, danh sách thành chuỗi, tự chèn dấu cách ở giữa, và tự gõ thêm ký tự xuống dòng \\n ở cuối. Nhưng hàm print() giống như một người phiên dịch viên mẫn cán và hào hiệp đứng túc trực ngay trước khe hẹp đó: bạn chỉ việc ném bất kỳ loại đồ vật nào cho anh ta (số, danh sách, từ điển), anh ta sẽ tự động chụp ảnh chuyển đổi thành chữ (qua str()), tự xếp chúng cách nhau một khoảng trắng đều đặn (sep=" "), tự nhấn phím xuống dòng (end="\\n"), và đẩy thẳng vào khe màn hình cho bạn!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">KIẾN TRÚC ĐIỀU PHỐI CỦA HÀM PRINT() TỚI LUỒNG TIÊU CHUẨN</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
            <strong style="color:var(--accent-primary);">1. ĐẦU VÀO ĐA DẠNG:</strong> <code>print(x, y, z)</code> nhận bất kỳ đối tượng nào (int, list, dict...)
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;margin-left:14px;">
            <strong style="color:#8b5cf6;">2. BỘ CHUYỂN ĐỔI:</strong> Tự động gọi <code>str()</code> cho từng đối tượng, chèn <code>sep=' '</code> ở giữa
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #10b981;border-radius:6px;margin-left:28px;">
            <strong style="color:#10b981;">3. ĐÓNG GÓI CUỐI:</strong> Gắn thêm chuỗi kết thúc <code>end='\\n'</code> vào cuối văn bản
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #f59e0b;border-radius:6px;margin-left:42px;">
            <strong style="color:#f59e0b;">4. ĐÍCH ĐẾN I/O:</strong> Gửi chuỗi hoàn chỉnh tới <code>file.write()</code> (mặc định là <code>sys.stdout</code>)
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Thao Tác In Ấn & Giao Diện Luồng Đầu Ra Tiêu Chuẩn (stdout)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 28–29 / 38</strong>.</p>
          </div>
        </div>

        <p>Trong Python, hàm in (<code>print</code>) dùng để in mọi thứ—nó chỉ đơn thuần là một giao diện thân thiện với lập trình viên tới <strong>luồng đầu ra tiêu chuẩn (standard output stream)</strong>. Nó là một biểu thức gọi hàm mà chúng ta gọi riêng ra ở đây vì nó quá đỗi phổ biến và thường được viết như một câu lệnh đứng riêng.</p>

        <h3>So sánh print() với các phương thức của đối tượng file</h3>
        <p>Trong Chương 9, chúng ta đã khám phá các phương thức của đối tượng file dùng để ghi văn bản (ví dụ <code>file.write(str)</code>). Các thao tác in ấn cũng tương tự, nhưng tập trung và tiện lợi hơn rất nhiều:</p>
        <ul>
          <li><strong>Phương thức <code>file.write()</code>:</strong> Chỉ ghi chuỗi ký tự thô vào file; không hỗ trợ in các đối tượng khác nếu bạn chưa tự gọi <code>str()</code>; không tự thêm dấu cách; và không tự thêm ký tự xuống dòng.</li>
          <li><strong>Hàm <code>print()</code>:</strong> Mặc định ghi các đối tượng vào luồng <code>sys.stdout</code>, tự động chuyển đổi mọi đối tượng thành chuỗi hiển thị thân thiện, tự động chèn dấu phân cách giữa các đối tượng và tự động thêm ký tự xuống dòng.</li>
        </ul>

        <h3>Ba luồng tiêu chuẩn hệ thống</h3>
        <p>Khi một tập lệnh Python khởi động, ba kết nối dữ liệu tiêu chuẩn tự động được thiết lập sẵn trong module <code>sys</code>:</p>
        <ol>
          <li><strong>Luồng đầu vào tiêu chuẩn (<code>sys.stdin</code>):</strong> Nơi nhận dữ liệu nhập (được hàm <code>input()</code> sử dụng).</li>
          <li><strong>Luồng đầu ra tiêu chuẩn (<code>sys.stdout</code>):</strong> Nơi nhận văn bản xuất ra màn hình console (được hàm <code>print()</code> sử dụng).</li>
          <li><strong>Luồng lỗi tiêu chuẩn (<code>sys.stderr</code>):</strong> Nơi chuyên xuất các thông báo lỗi và cảnh báo của hệ thống.</li>
        </ol>

        <div class="callout-box callout-note" style="border-left:4px solid #8b5cf6;margin:16px 0;">
          <div class="callout-header">
            <span>🕰️</span>
            <span><strong>Ghi chú: Ký ức quá khứ: Lệnh in (Python 2 vs Python 3)</strong></span>
          </div>
          <div class="callout-body">
            <p>Việc in ấn là một trong những điểm khác biệt lớn nhất giữa Python 2.X và 3.X: <code>print</code> đã chuyển từ một <em>câu lệnh (statement)</em> trong 2.X (cú pháp <code>print x</code>) thành một <em>hàm dựng sẵn (built-in function)</em> trong 3.X (cú pháp <code>print(x)</code>). Thay đổi này đã phá vỡ gần như mọi chương trình Python khi nâng cấp lên 3.0, nhưng bù lại mang đến sự linh hoạt tột bậc: <code>print</code> giờ đây có thể nhận các đối số từ khóa, có thể truyền đi như một đối tượng hàm và có thể được thay thế tùy biến.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh việc xuất dữ liệu giữa sys.stdout.write() thô và hàm print()',
          code: `import sys

x = 'Python'
y = 3.14
z = ['Lutz', 2026]

# 1. Xuất dữ liệu bằng sys.stdout.write (cách làm thủ công khó nhọc)
sys.stdout.write(str(x) + ' ' + str(y) + ' ' + str(z) + '\\n')

# 2. Xuất dữ liệu bằng print() (cách làm thanh lịch, công thái học)
print(x, y, z)

# Cả hai dòng đều cho kết quả hiển thị giống hệt nhau trên màn hình!`,
          output: `Python 3.14 ['Lutz', 2026]
Python 3.14 ['Lutz', 2026]`,
          annotations: [
            { line: 8, text: 'Phải tự gọi str() cho từng biến, tự nối dấu cách và tự thêm \\n.' },
            { line: 11, text: 'print() tự động lo toàn bộ các khâu chuyển đổi và định dạng trên.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Định Dạng Lệnh Gọi Hàm print() & Bốn Tham Số Từ Khóa',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 29–31 / 38</strong>.</p>
          </div>
        </div>

        <p>Về mặt cú pháp, các lệnh gọi hàm <code>print()</code> có định dạng đầy đủ như sau:</p>
        <pre><code>print([object, ...][, sep=' '][, end='\\n'][, file=sys.stdout][, flush=False])</code></pre>

        <p>Trong ký hiệu này, các mục trong dấu ngoặc vuông là tùy chọn và có thể được bỏ qua; các giá trị sau dấu <code>=</code> biểu thị giá trị mặc định của <strong>4 đối số từ khóa (keyword arguments)</strong>. Bạn phải truyền các đối số này theo tên (cú pháp <code>name=value</code>) và chúng phải xuất hiện phía sau tất cả các đối tượng cần in:</p>

        <ol>
          <li>
            <strong><code>sep</code> (Separator — Ký tự phân cách):</strong> Chuỗi được chèn vào giữa văn bản của từng đối tượng. Mặc định là một dấu cách đơn <code>' '</code>. Truyền <code>sep=''</code> (chuỗi rỗng) sẽ triệt tiêu hoàn toàn khoảng cách; hoặc bạn có thể truyền bất kỳ chuỗi tùy chỉnh nào như <code>sep=', '</code> hay <code>sep=' -> '</code>.
          </li>
          <li>
            <strong><code>end</code> (End string — Chuỗi kết thúc):</strong> Chuỗi được thêm vào cuối văn bản được in. Mặc định là ký tự xuống dòng <code>'\\n'</code>. Truyền <code>end=''</code> sẽ triệt tiêu việc xuống dòng, giúp lệnh <code>print()</code> tiếp theo ghi nối tiếp ngay sau dữ liệu vừa in trên cùng một dòng.
          </li>
          <li>
            <strong><code>file</code> (Target stream — Luồng đích):</strong> Chỉ định đối tượng file hoặc luồng mà văn bản sẽ được gửi tới. Mặc định là <code>sys.stdout</code>. Bất kỳ đối tượng nào hỗ trợ phương thức <code>write(string)</code> đều có thể truyền vào, bao gồm cả file thực tế mở bằng <code>open('data.txt', 'w')</code>.
          </li>
          <li>
            <strong><code>flush</code> (Xả bộ đệm):</strong> Giá trị boolean, mặc định là <code>False</code>. Thông thường đầu ra được gom đệm trong bộ nhớ RAM để tối ưu tốc độ I/O. Truyền <code>flush=True</code> sẽ ép buộc luồng phải đẩy ngay lập tức toàn bộ dữ liệu đang đệm ra thiết bị hiển thị hoặc đường truyền mạng mà không cần chờ bộ đệm đầy hay chờ ký tự <code>\\n</code>.
          </li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Thực hành toàn diện 4 tham số từ khóa của hàm print()',
          code: `x = 'python'
y = 3.14
z = ['lp6e']

# 1. Gọi mặc định: sep=' ', end='\\n'
print(x, y, z)

# 2. Tùy chỉnh sep: triệt tiêu phân cách
print(x, y, z, sep='')

# 3. Tùy chỉnh sep: phân cách bằng dấu phẩy
print(x, y, z, sep=', ')

# 4. Tùy chỉnh end: không xuống dòng, in nối tiếp
print("Đang xử lý: ", end='')
print("[25%]", end='...')
print("[100%] Hoàn tất!")

# 5. Kết hợp cả sep và end
print(x, y, z, sep='...', end='!\\n')`,
          output: `python 3.14 ['lp6e']
python3.14['lp6e']
python, 3.14, ['lp6e']
Đang xử lý: [25%]...[100%] Hoàn tất!
python...3.14...['lp6e']!`,
          annotations: [
            { line: 5, text: 'Mặc định chèn dấu cách ở giữa x, y, z và xuống dòng ở cuối.' },
            { line: 8, text: 'sep=\'\' dán các đối tượng liền sát nhau.' },
            { line: 14, text: 'end=\'\' giữ con trỏ console ở cuối dòng để lệnh sau in tiếp.' },
            { line: 19, text: 'Thứ tự giữa các tham số từ khóa không quan trọng, miễn là đứng sau các đối tượng in.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. In Vào File & Ranh Giới: Khi Nào Dùng print(), Khi Nào Dùng f-string?',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 31–32 / 38</strong>.</p>
          </div>
        </div>

        <p>Tham số <code>file</code> của <code>print()</code> cho phép bạn điều hướng văn bản in tới một file đang mở hoặc một luồng tùy ý trong suốt thời gian của một lệnh <code>print()</code> duy nhất, mà không làm ảnh hưởng tới các lệnh in khác:</p>

        <pre><code>>>> print(x, y, z, sep='...', file=open('data.txt', 'w'))
>>> print(x, y, z) # Lệnh này lập tức quay lại in ra stdout bình thường!
python 3.12 ['lp6e']

>>> print(open('data.txt').read())
python...3.12...['lp6e']</code></pre>

        <h3>Ranh giới định dạng: Đừng dùng búa tạ để đóng mọi cây đinh!</h3>
        <p>Các tùy chọn <code>sep</code> và <code>end</code> của <code>print()</code> chỉ là những sự tiện lợi cho các nhu cầu đơn giản. Nếu bạn cần định dạng phức tạp (căn lề trái/phải, số chữ số thập phân, thêm số 0 ở đầu), hãy sử dụng <strong>f-string</strong> hoặc biểu thức định dạng chuỗi của Chương 7 để xây dựng toàn bộ chuỗi trước khi in:</p>
        <pre><code># Định dạng chuyên nghiệp bằng f-string:
print(f"{x}: {y:-0.4f}, {int(z[0][-2]):05d}")</code></pre>

        <div class="callout-box callout-warning" style="border-left:4px solid var(--warning);margin:16px 0;">
          <div class="callout-header">
            <span>🔨</span>
            <span><strong>Cảnh báo của Mark Lutz về việc lạm dụng f-string:</strong></span>
          </div>
          <div class="callout-body">
            <p>Mặt khác, dường như có một quan niệm sai lầm phổ biến rằng f-string bằng cách nào đó là "bắt buộc" đối với mọi lệnh <code>print</code>. Trên thực tế, <strong>f-string là quá mức cần thiết và làm rối mã nguồn</strong> nếu bạn chỉ đơn giản cố gắng in các đối tượng được ngăn cách bằng dấu cách:</p>
            <pre><code># DÙNG BÚA TẠ ĐÓNG ĐINH (QUÁ RƯỜM RÀ):
print(f"{a} {b} {c}")

# THANH THOÁT, CHUẨN PYTHONIC:
print(a, b, c)</code></pre>
            <p>Cả hai đều cho kết quả y hệt nhau, nhưng cách thứ hai ngắn gọn hơn, chạy nhanh hơn và đúng với tinh thần tự nhiên của ngôn ngữ!</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khảo sát in vào file tạm và đối chiếu print() thô vs f-string',
          code: `# 1. In trực tiếp vào một file bằng tham số file=
with open('tam_thoi.txt', 'w', encoding='utf-8') as f:
    print('Báo cáo hệ thống', 2026, sep=' - ', file=f)
    print('Trạng thái: Hoạt động', file=f)

# Đọc lại nội dung file vừa in
with open('tam_thoi.txt', 'r', encoding='utf-8') as f:
    print("Nội dung trong file:")
    print(f.read().strip())

# 2. So sánh in thô vs f-string
a, b, c = 11, 3.14, 'hack'

print("\\nSo sánh in thô vs f-string:")
print("In thô chuẩn Pythonic:", a, b, c)
print("Dùng f-string thừa thãi:", f"{a} {b} {c}")`,
          output: `Nội dung trong file:
Báo cáo hệ thống - 2026
Trạng thái: Hoạt động

So sánh in thô vs f-string:
In thô chuẩn Pythonic: 11 3.14 hack
Dùng f-string thừa thãi: 11 3.14 hack`,
          annotations: [
            { line: 3, text: 'Tham số file=f điều hướng văn bản ghi thẳng vào file tam_thoi.txt.' },
            { line: 16, text: 'print(a, b, c) thanh lịch, không cần tốn công tạo f-string bọc ngoài.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời khuyên từ Mark Lutz: Vấn đề xả bộ đệm (flush)',
        content: 'Khi bạn in một thanh tiến trình (progress bar) trên một dòng đơn bằng cách dùng end="", bạn thường thấy chữ không chịu xuất hiện ngay trên màn hình mà bị "nghẽn". Đó là vì luồng stdout đang gom đệm chờ ký tự xuống dòng. Hãy thêm tham số flush=True để ép hệ điều hành đẩy dữ liệu ra màn hình tức thì!'
      }
    ]
  },

  exercises: [
    {
      title: 'Mô phỏng thanh tiến trình tải dữ liệu bằng print và flush',
      level: 'Trung bình',
      problem: 'Viết một hàm hien_thi_tien_trinh(tong_so) in ra các dấu chấm biểu thị tiến trình trên cùng một dòng. Sau mỗi dấu chấm, sử dụng end="" và flush=True để đảm bảo dấu chấm hiển thị ngay lập tức ra màn hình console.',
      hint: 'Dùng vòng lặp for với range(tong_so), gọi print(".", end="", flush=True) và cuối cùng gọi print(" [Xong]") để xuống dòng.',
      solutionCode: `def hien_thi_tien_trinh(tong_so):
    print("Đang nạp dữ liệu: ", end="", flush=True)
    for _ in range(tong_so):
        print(".", end="", flush=True)
    print(" [Hoàn tất!]")

hien_thi_tien_trinh(10)`,
      solutionOutput: `Đang nạp dữ liệu: .......... [Hoàn tất!]`,
      explanation: 'end="" ngăn lệnh print tự ý xuống dòng, trong khi flush=True ép buộc luồng stdout xả từng dấu chấm ra màn hình ngay khi lệnh thực thi.'
    }
  ],

  quiz: [
    {
      question: 'Giá trị mặc định của hai tham số từ khóa sep và end trong hàm print() lần lượt là gì?',
      options: [
        'sep=\'\' và end=\' \'',
        'sep=\' \' (dấu cách) và end=\'\\n\' (xuống dòng)',
        'sep=\',\' và end=\'\\n\'',
        'sep=None và end=None'
      ],
      correctIndex: 1,
      explanation: 'Theo đặc tả của hàm print() trong Python, tham số sep mặc định là một dấu cách \' \' và end mặc định là ký tự ngắt dòng \'\\n\'.'
    },
    {
      question: 'Khi bạn muốn in hai dòng thông tin nối tiếp nhau trên cùng một dòng hiển thị của console, bạn cần làm gì?',
      options: [
        'Truyền sep=\'\\n\' vào lệnh print thứ nhất.',
        'Truyền end=\'\' vào lệnh print thứ nhất.',
        'Truyền flush=False vào cả hai lệnh print.',
        'Sử dụng câu lệnh sys.stdout.close().'
      ],
      correctIndex: 1,
      explanation: 'Tham số end=\'\' triệt tiêu ký tự xuống dòng mặc định của lệnh print thứ nhất, giữ con trỏ tại chỗ để lệnh print tiếp theo in nối tiếp ngay sau.'
    },
    {
      question: 'Khi nào bạn NÊN sử dụng f-string thay vì dựa vào các tham số của hàm print()?',
      options: [
        'Khi bạn chỉ cần in 3 biến cách nhau bởi một dấu cách đơn.',
        'Khi bạn cần in ra màn hình console thông thường.',
        'Khi bạn cần định dạng phức tạp như căn lề, số chữ số thập phân, hoặc đệm số 0 vào số nguyên.',
        'f-string luôn luôn là bắt buộc khi gọi hàm print().'
      ],
      correctIndex: 2,
      explanation: 'f-string chuyên dụng cho các yêu cầu định dạng hiển thị tỉ mỉ (như căn lề, format số thực, padding); còn nếu chỉ in các biến cách nhau bằng dấu cách thì print(a, b, c) đơn giản và tối ưu hơn nhiều.'
    }
  ],

  summary: [
    'print() là giao diện thân thiện tới luồng xuất tiêu chuẩn sys.stdout, tự động chuyển đổi đối tượng qua str().',
    'Bốn tham số từ khóa: sep (phân cách), end (kết thúc), file (luồng đích), flush (xả đệm tức thì).',
    'Tham số file=open(...) cho phép chuyển hướng đầu ra tới một file ngoài trong phạm vi một lệnh in duy nhất.',
    'Tránh lạm dụng f-string thừa thãi: hãy dùng print(a, b, c) tự nhiên thay cho print(f"{a} {b} {c}").'
  ]
};
