export default {
  id: 'lp-c11-09',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.9',
  title: 'Chuyển hướng Luồng in (Stream Redirection), Tóm tắt Chương 11 & Trọn bộ 4 Câu hỏi Ôn tập',
  subtitle: 'Kỹ thuật gán sys.stdout, khôi phục luồng an toàn, luồng sys.stderr, đối tượng FileFaker đa hình, tổng kết toàn diện và trọn bộ 4 câu hỏi ôn tập của Mark Lutz',
  level: 'Trung cấp đến Nâng cao',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ hai kỹ thuật chuyển hướng luồng in (stream redirection) trong Python: gán lại luồng hệ thống sys.stdout (thủ công) và sử dụng tham số từ khóa file= (tự động, an toàn).',
    'Hiểu cách lưu và khôi phục luồng gốc qua biến tạm hoặc thuộc tính sys.__stdout__, cùng kỹ thuật xuất thông báo lỗi chuyên biệt ra sys.stderr.',
    'Khám phá khung chuyên đề nâng cao "Vì sao bạn sẽ quan tâm: print và stdout": lớp FileFaker, tính đa hình (polymorphic operation) của phương thức write() và ứng dụng trong GUI/Web server.',
    'Tổng kết toàn diện kiến thức Chương 11 và giải trọn vẹn 4 Câu hỏi ôn tập nguyên bản từ trang 36–37 của giáo trình Mark Lutz.'
  ],

  intuition: {
    title: 'Hệ Thống Đường Ống Nước và Cút Nối Đa Năng',
    metaphor: 'Hãy hình dung luồng đầu ra của chương trình Python giống như một vòi nước chữa cháy khổng lồ: theo mặc định, vòi nước này được nối thẳng ra một đường ống tiêu chuẩn chảy ra mặt đường (màn hình console sys.stdout). Hàm print() chỉ đơn giản là việc bạn vặn khóa mở nước. Tuy nhiên, bằng cách tháo cút nối và lắp một đường ống mới (sys.stdout = open("log.txt")), bạn có thể chuyển toàn bộ dòng nước đó chảy vào một bể chứa ngầm (file trên ổ đĩa) mà người vặn van print() không hề hay biết! Thậm chí kỳ diệu hơn, bạn có thể nối vòi nước vào bất kỳ cỗ máy nào (lớp FileFaker), miễn là cỗ máy đó có một miệng ống khớp chuẩn (phương thức write) để đón nhận dòng nước và dẫn đi bất cứ đâu: lên màn hình đồ họa GUI hay truyền qua đại dương mạng Internet.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH CHUYỂN HƯỚNG ĐA HÌNH CỦA HÀM PRINT() QUA LUỒNG I/O</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:center;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--accent-primary);">HÀM PRINT(X, Y)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Gọi ngầm định:<br><code>sys.stdout.write(...)</code></div>
          </div>
          <div style="font-size:1.6rem;color:var(--accent-primary);font-weight:700;">➔</div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div style="padding:6px 10px;background:var(--bg-surface);border-left:4px solid #10b981;border-radius:4px;font-size:0.78rem;">
              <strong>Mặc định:</strong> Màn hình Console / Terminal
            </div>
            <div style="padding:6px 10px;background:var(--bg-surface);border-left:4px solid #f59e0b;border-radius:4px;font-size:0.78rem;">
              <strong>Chuyển hướng File:</strong> <code>file=open('log.txt')</code>
            </div>
            <div style="padding:6px 10px;background:var(--bg-surface);border-left:4px solid #8b5cf6;border-radius:4px;font-size:0.78rem;">
              <strong>Đa hình (FileFaker):</strong> Cửa sổ GUI / Mạng Socket
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Chuyển Hướng Luồng Thủ Công & Tự Động (sys.stdout vs file=)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 32–35 / 38</strong>.</p>
          </div>
        </div>

        <p>Như chúng ta đã biết, <code>print</code> mặc định gửi văn bản tới luồng đầu ra tiêu chuẩn (stdout). Tuy nhiên, việc điều hướng dữ liệu in đi nơi khác là một nhu cầu cực kỳ phổ biến trong các hệ thống phần mềm thực tế—chẳng hạn như ghi nhật ký (log) vào file trên đĩa để tra cứu sau này, hoặc bắt giữ đầu ra để kiểm thử tự động.</p>

        <h3>Phương pháp 1: Chuyển hướng luồng thủ công bằng cách gán sys.stdout</h3>
        <p>Vì câu lệnh <code>print(X, Y)</code> thực chất chỉ là một lớp vỏ bọc công thái học cho lệnh gọi:</p>
        <pre><code>import sys
sys.stdout.write(str(X) + ' ' + str(Y) + '\\n')</code></pre>
        <p>Bạn có thể gán lại thuộc tính <code>sys.stdout</code> thành một đối tượng file đang mở ở chế độ ghi thêm (<code>'a'</code>):</p>
        <pre><code>import sys
sys.stdout = open('log.txt', 'a') # Chuyển hướng toàn bộ các lệnh print sau đó
print("Dòng này sẽ được ghi vào file log.txt thay vì màn hình!")</code></pre>
        <p>Bởi vì trong một tiến trình Python chỉ có <strong>một module <code>sys</code> duy nhất</strong>, thao tác gán này sẽ chuyển hướng toàn bộ các câu lệnh <code>print</code> xuất hiện ở bất kỳ đâu trong toàn bộ chương trình của bạn!</p>

        <h3>Cách khôi phục luồng ban đầu an toàn</h3>
        <p>Nếu bạn muốn quay lại in ra màn hình console sau khi đã ghi file, bạn phải chủ động lưu luồng gốc vào một biến tạm thời:</p>
        <pre><code>temp = sys.stdout                 # 1. Lưu luồng console ban đầu
sys.stdout = open('log.txt', 'a') # 2. Chuyển hướng sang file
print("Ghi vào file...")
sys.stdout.close()                # 3. Đóng và xả đệm xuống đĩa
sys.stdout = temp                 # 4. Khôi phục lại luồng console!
print("Đã quay trở lại màn hình console bình thường!")</code></pre>
        <p><em>(Chú thích chân trang [5]: Ngoài ra, bạn cũng có thể dùng thuộc tính <code>sys.__stdout__</code> vốn lưu giữ tham chiếu đến giá trị ban đầu của stdout tại thời điểm khởi động chương trình để khôi phục: <code>sys.stdout = sys.__stdout__</code>).</em></p>

        <h3>Phương pháp 2: Chuyển hướng tự động thông qua tham số file=</h3>
        <p>Để không phải xoay xở với việc lưu và khôi phục biến tạm rườm rà, Python cung cấp tham số từ khóa <code>file=</code> ngay trong hàm <code>print()</code>:</p>
        <pre><code>log = open('log2.txt', 'w')
print(1, 2, 3, file=log)  # Chỉ duy nhất lệnh này in vào file
log.close()
print(7, 8, 9)            # Lệnh kế tiếp tự động in ra màn hình console ban đầu!</code></pre>

        <h3>Xuất thông báo lỗi ra luồng sys.stderr</h3>
        <p>Đối tượng <code>sys.stderr</code> luôn mở sẵn cho bạn để in các thông điệp cảnh báo hoặc thông báo lỗi hệ thống, tách biệt khỏi luồng dữ liệu chuẩn <code>stdout</code>:</p>
        <pre><code>print("CẢNH BÁO LỖI!", file=sys.stderr)</code></pre>
      `,
      codeExamples: [
        {
          title: 'Khảo sát chuyển hướng luồng in thủ công và qua tham số file=',
          code: `import sys

# 1. Chuyển hướng an toàn qua tham số file=
with open('nhat_ky_he_thong.log', 'w', encoding='utf-8') as f_log:
    print("Khởi động tiến trình máy chủ 2026...", file=f_log)
    print("Cổng lắng nghe: 8080", file=f_log)

# Lệnh print này in ra màn hình chuẩn console như thường lệ
print("Thông báo console: Đã ghi nhật ký xong!")

# 2. Đọc lại nội dung file vừa ghi
with open('nhat_ky_he_thong.log', 'r', encoding='utf-8') as f_log:
    print("Nội dung file log:")
    print(f_log.read().strip())

# 3. In ra luồng lỗi tiêu chuẩn sys.stderr
print("Lỗi kết nối cơ sở dữ liệu!", file=sys.stderr)`,
          output: `Thông báo console: Đã ghi nhật ký xong!
Nội dung file log:
Khởi động tiến trình máy chủ 2026...
Cổng lắng nghe: 8080
Lỗi kết nối cơ sở dữ liệu!`,
          annotations: [
            { line: 5, text: 'file=f_log chỉ định luồng ghi cho từng lệnh in độc lập.' },
            { line: 9, text: 'Lệnh print thông thường không bị ảnh hưởng, vẫn xuất ra console.' },
            { line: 18, text: 'file=sys.stderr chuyển dữ liệu vào kênh báo lỗi riêng biệt của OS.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Khung Chuyên Đề Nâng Cao: Tính Đa Hình của print và Lớp FileFaker',
      content: `
        <div class="callout-box callout-theory" style="border-left:4px solid #8b5cf6;margin-bottom:20px;">
          <div class="callout-header">
            <span>🔮</span>
            <span><strong>Vì sao bạn sẽ quan tâm: print và stdout — Đa hình (Polymorphism) & FileFaker</strong></span>
          </div>
          <div class="callout-body">
            <p><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz • <strong>PDF Trang 37–38 / 38</strong>.</p>
            <p>Sự tương đương giữa thao tác in ấn và việc gọi phương thức <code>sys.stdout.write()</code> mở ra một sức mạnh kiến trúc phi thường: <strong>bạn có thể thiết lập lại <code>sys.stdout</code> thành một đối tượng hoàn toàn không phải là file trên ổ đĩa!</strong></p>
            <p>Hàm <code>print()</code> không hề quan tâm đối tượng nhận là một file vật lý, một cổng mạng hay một cửa sổ giao diện. Nó chỉ đòi hỏi đối tượng đó cung cấp một <strong>giao diện (interface) duy nhất: một phương thức có tên <code>write(string)</code></strong>. Trong khoa học máy tính và lập trình hướng đối tượng, đây chính là <strong>thao tác đa hình (polymorphic operation)</strong> và triết lý <em>Duck Typing</em> trứ danh của Python (<em>"nếu nó đi như vịt và kêu như vịt, thì nó là vịt"</em>).</p>

            <h4>Mô hình hóa lớp FileFaker</h4>
            <pre><code>class FileFaker:
    def __init__(self):
        self.buffer = []
    def write(self, string):
        # Định tuyến dữ liệu văn bản tùy ý: lưu vào RAM, gửi lên GUI, mã hóa...
        self.buffer.append(string)

faker = FileFaker()
print("Xin chào thế giới!", file=faker) # print tự động gọi faker.write()!
print("Dữ liệu bắt giữ:", "".join(faker.buffer))</code></pre>

            <p>Kỹ thuật đa hình này được ứng dụng rộng rãi trong:</p>
            <ul>
              <li><strong>Giao diện đồ họa (GUI):</strong> Đón bắt mọi lệnh <code>print</code> trong chương trình và hiển thị chúng lên một hộp thoại pop-up hoặc vùng văn bản đồ họa.</li>
              <li><strong>Trình soạn thảo & IDE (như IDLE, VS Code):</strong> Chuyển hướng stdout để tô màu cú pháp hoặc làm nổi bật các dòng văn bản.</li>
              <li><strong>Máy chủ Web (Web Server):</strong> Trong các tập lệnh CGI/WSGI truyền thống, văn bản in ra <code>stdout</code> chính là các thẻ HTML được máy chủ bắt giữ và gửi về trình duyệt của người dùng!</li>
              <li><strong>Chuyển hướng Shell hệ điều hành:</strong> Cú pháp chuyển hướng trong Python cung cấp sự thay thế thuần Python (<em>pure-Python</em>) độc lập với hệ điều hành cho các cú pháp shell như <code>python script.py &gt; output.txt</code> hay đường ống dẫn <code>python script.py | filterProgram</code>.</li>
            </ul>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Xây dựng lớp FileFaker bắt giữ dữ liệu in vào bộ nhớ RAM',
          code: `# Định nghĩa đối tượng giả lập file (File-like object)
class BoGhiNhoRAM:
    def __init__(self):
        self.noi_dung = []

    def write(self, van_ban):
        # Bắt giữ từng chuỗi ký tự được gửi tới
        self.noi_dung.append(van_ban)

    def lay_ket_qua(self):
        return "".join(self.noi_dung)

# Khởi tạo đối tượng bắt giữ
ram_stream = BoGhiNhoRAM()

# In trực tiếp vào đối tượng thông qua tham số file= (Đa hình)
print("Học lập trình Python", 2026, sep=" - ", file=ram_stream)
print("Tác giả: Mark Lutz", file=ram_stream)

# Lấy dữ liệu văn bản đã tích lũy trong RAM
print("Dữ liệu thu được từ BoGhiNhoRAM:")
print(ram_stream.lay_ket_qua().strip())`,
          output: `Dữ liệu thu được từ BoGhiNhoRAM:
Học lập trình Python - 2026
Tác giả: Mark Lutz`,
          annotations: [
            { line: 6, text: 'Phương thức write() thỏa mãn giao diện mà hàm print() đòi hỏi.' },
            { line: 17, text: 'print() tương tác đa hình với ram_stream mà không cần biết nó là file hay RAM.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Tóm Tắt Toàn Diện Chương 11 & Cầu Nối Sang Chương 12',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 36 / 38</strong>.</p>
          </div>
        </div>

        <p>Trong chương này, chúng ta đã bắt đầu cái nhìn chuyên sâu về các câu lệnh cụ thể trong Python bằng cách khám phá chi tiết <strong>các phép gán, các câu lệnh biểu thức, và các thao tác in ấn</strong>:</p>

        <ul>
          <li><strong>Phép gán:</strong> Chúng ta đã thấy phép gán tạo ra các tham chiếu đối tượng (con trỏ), tự động khai sinh biến và có 8 dạng cú pháp phong phú (Bảng 11-1). Phép gán giải nén mở rộng với dấu sao <code>*X</code> (luôn trả về List) và phép gán tăng cường (tối ưu hóa tại chỗ) giúp chúng ta tránh được rất nhiều công việc viết mã thủ công.</li>
          <li><strong>Biểu thức walrus <code>:=</code>:</strong> Đưa phép gán thành biểu thức có thể lồng trong tiêu đề <code>while</code>/<code>if</code>, nhưng cần dùng có tiết chế theo triết lý "đừng dùng búa tạ đóng mọi cây đinh".</li>
          <li><strong>Quy tắc đặt tên & Từ khóa:</strong> Nắm vững cú pháp tên biến, Bảng 11-3 với 35 từ khóa cứng, 4 từ khóa mềm, các quy ước <code>_X</code>, <code>__X__</code>, và chân lý cốt lõi: <em>tên biến không có kiểu, đối tượng mới có kiểu</em>.</li>
          <li><strong>Câu lệnh biểu thức & In ấn:</strong> Biểu thức thực thi vì tác dụng phụ; cạm bẫy gán ngược phương thức tại chỗ (<code>L = L.append()</code>); cùng toàn bộ các sắc thái chuyển hướng luồng I/O của hàm <code>print()</code> qua <code>sys.stdout</code>, <code>sys.stderr</code> và cơ chế đa hình.</li>
        </ul>

        <h3>Cầu nối chuyển tiếp sang Chương 12</h3>
        <p>Trong chương tiếp theo (<strong>Chương 12</strong>), chúng ta sẽ tiếp tục chuyến tham quan câu lệnh bằng cách lấp đầy các chi tiết về <strong>câu lệnh <code>if</code></strong>—công cụ lựa chọn và rẽ nhánh chính của Python. Tại đó, chúng ta cũng sẽ xem lại mô hình cú pháp một cách sâu sắc hơn, khám phá hành vi của các <strong>biểu thức Boolean</strong> (nguyên lý đoản mạch <em>short-circuit</em>), và đặc biệt là câu lệnh lựa chọn đa nhánh mạnh mẽ <strong><code>match/case</code></strong> vừa xuất hiện từ Python 3.10.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-4',
      title: '4. Trọn Bộ 4 Câu Hỏi Ôn Tập Kiến Thức & Đáp Án Chi Tiết của Mark Lutz',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 36–37 / 38</strong>.</p>
          </div>
        </div>

        <p>Dưới đây là phần trình bày trọn vẹn và giải thích chuyên sâu cho <strong>toàn bộ 4 câu hỏi ôn tập kiến thức</strong> nguyên bản ở cuối Chương 11 của giáo trình Mark Lutz:</p>

        <h3>Câu hỏi 1: Hãy nêu ba cách mà bạn có thể gán ba biến cho cùng một giá trị?</h3>
        <p><strong>Đáp án chi tiết của Mark Lutz:</strong></p>
        <ol>
          <li><strong>Cách 1: Sử dụng phép gán đa mục tiêu (multiple-target assignment):</strong><br><code>A = B = C = 0</code></li>
          <li><strong>Cách 2: Sử dụng phép gán dãy tuần tự (sequence assignment / unpacking):</strong><br><code>A, B, C = 0, 0, 0</code> (hoặc <code>(A, B, C) = (0, 0, 0)</code>)</li>
          <li><strong>Cách 3: Sử dụng nhiều câu lệnh gán trên ba dòng riêng biệt:</strong><br><code>A = 0</code><br><code>B = 0</code><br><code>C = 0</code><br><em>(Với kỹ thuật cuối cùng này, như đã giới thiệu trong Chương 10, bạn cũng có thể ghép ba câu lệnh riêng biệt lại với nhau trên cùng một dòng bằng cách ngăn cách chúng bằng dấu chấm phẩy: <code>A = 0; B = 0; C = 0</code>).</em></li>
        </ol>

        <hr style="border:none;border-top:1px solid var(--border-subtle);margin:20px 0;">

        <h3>Câu hỏi 2: Điều gì nguy hiểm khi gán ba biến cho một đối tượng khả biến?</h3>
        <p><strong>Đáp án chi tiết của Mark Lutz:</strong></p>
        <p>Nếu bạn gán chúng theo dạng phép gán đa mục tiêu: <code>A = B = C = []</code>, thì <strong>cả ba tên biến đều cùng tham chiếu đến một đối tượng danh sách duy nhất trong bộ nhớ</strong>. Do đó, việc thay đổi danh sách đó tại chỗ thông qua bất kỳ một biến nào (ví dụ: gọi <code>A.append(99)</code>) sẽ làm thay đổi đối tượng dùng chung và <strong>ảnh hưởng ngay lập tức tới giá trị mà các biến còn lại (B và C) nhìn thấy</strong>!</p>
        <p><em>Lưu ý:</em> Điều này chỉ đúng và nguy hiểm đối với các thao tác thay đổi tại chỗ trên những <strong>đối tượng khả biến (mutable)</strong> như danh sách (list) và từ điển (dict); đối với các đối tượng bất biến (immutable) như số nguyên và chuỗi ký tự, vấn đề này hoàn toàn không liên quan vì chúng không bao giờ có thể bị thay đổi tại chỗ.</p>

        <hr style="border:none;border-top:1px solid var(--border-subtle);margin:20px 0;">

        <h3>Câu hỏi 3: Có điều gì sai khi viết L = L.sort()?</h3>
        <p><strong>Đáp án chi tiết của Mark Lutz:</strong></p>
        <p>Phương thức <code>sort()</code> của danh sách giống như <code>append()</code> ở chỗ nó <strong>thực hiện thay đổi tại chỗ trực tiếp trên danh sách chủ thể—nó luôn luôn trả về <code>None</code></strong>, chứ không phải danh sách đã sắp xếp. Phép gán ngược lại cho <code>L</code> (<code>L = L.sort()</code>) sẽ đặt giá trị của biến <code>L</code> thành <code>None</code>, khiến bạn <strong>làm mất sạch toàn bộ danh sách ban đầu</strong> (và đối tượng đó có thể bị bộ thu gom rác xóa bỏ)!</p>
        <p><em>Giải pháp đúng:</em> Nếu bạn muốn tạo ra một danh sách mới đã được sắp xếp để gán an toàn cho một biến, hãy sử dụng hàm dựng sẵn <code>sorted()</code>: <code>L_moi = sorted(L)</code>; còn nếu dùng phương thức <code>sort()</code>, hãy chỉ gọi nó đứng riêng như một câu lệnh: <code>L.sort()</code>.</p>

        <hr style="border:none;border-top:1px solid var(--border-subtle);margin:20px 0;">

        <h3>Câu hỏi 4: Bạn có thể sử dụng thao tác in ấn như thế nào để gửi văn bản tới một file bên ngoài?</h3>
        <p><strong>Đáp án chi tiết của Mark Lutz:</strong></p>
        <p>Có 3 phương pháp chính:</p>
        <ol>
          <li><strong>Phương pháp 1 (Tiện lợi nhất):</strong> Sử dụng tham số từ khóa <code>file</code> trong lệnh gọi hàm in: <code>print(X, file=F)</code>, trong đó <code>F</code> là một đối tượng file đã mở ở chế độ ghi (ví dụ <code>F = open('out.txt', 'w')</code>).</li>
          <li><strong>Phương pháp 2:</strong> Gán lại luồng tiêu chuẩn <code>sys.stdout</code> thành một đối tượng file đã mở trước khi gọi lệnh in (<code>sys.stdout = F</code>), và khôi phục lại luồng console ban đầu sau đó nếu cần thiết (qua biến tạm <code>temp</code> hoặc <code>sys.__stdout__</code>).</li>
          <li><strong>Phương pháp 3 (Ngoài phạm vi Python):</strong> Chuyển hướng toàn bộ văn bản xuất của chương trình bằng cú pháp chuyển hướng của shell hệ điều hành khi chạy dòng lệnh: <code>python script.py &gt; file.txt</code>.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng thực nghiệm toàn bộ 4 câu hỏi ôn tập của Mark Lutz',
          code: `# Câu 1: Ba cách gán 3 biến cùng giá trị 0
A1 = B1 = C1 = 0
A2, B2, C2 = 0, 0, 0
A3 = 0; B3 = 0; C3 = 0
print("Câu 1 - Ba cách đều cho kết quả:", A1, B2, C3)

# Câu 2: Nguy hiểm khi gán đa mục tiêu cho đối tượng khả biến
A = B = C = []
A.append(99) # Thay đổi tại chỗ từ A
print("Câu 2 - Cả B và C đều bị biến đổi theo:", B, C)

# Câu 3: Sai lầm L = L.sort() vs sorted() chuẩn mực
L_sai = [3, 1, 2]
L_sai = L_sai.sort() # Biến thành None!
print("Câu 3 - L_sai bị mất dữ liệu:", L_sai)

L_dung = [3, 1, 2]
L_moi = sorted(L_dung) # sorted() tạo danh sách mới an toàn
print("Câu 3 - sorted() an toàn:", L_moi)

# Câu 4: In ra file ngoài bằng tham số file=
with open('ket_qua_cau4.txt', 'w', encoding='utf-8') as f_out:
    print("Câu 4 - Gửi dữ liệu in vào file thành công!", file=f_out)

print("Đọc kiểm chứng câu 4:", open('ket_qua_cau4.txt', encoding='utf-8').read().strip())`,
          output: `Câu 1 - Ba cách đều cho kết quả: 0 0 0
Câu 2 - Cả B và C đều bị biến đổi theo: [99] [99]
Câu 3 - L_sai bị mất dữ liệu: None
Câu 3 - sorted() an toàn: [1, 2, 3]
Đọc kiểm chứng câu 4: Câu 4 - Gửi dữ liệu in vào file thành công!`,
          annotations: [
            { line: 2, text: 'Ba cú pháp gán hợp lệ cùng sinh ra ba biến có giá trị 0.' },
            { line: 9, text: 'A, B, C cùng trỏ 1 list nên append qua A làm B và C thấy [99].' },
            { line: 14, text: 'L.sort() trả về None gán vào L_sai làm biến mất dữ liệu.' },
            { line: 22, text: 'file=f_out điều hướng văn bản in thẳng vào ổ đĩa.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời chúc mừng hoàn thành Chương 11 từ Mark Lutz',
        content: 'Xin chúc mừng bạn đã làm chủ toàn bộ nền tảng của phép gán, biểu thức và hệ thống in ấn I/O trong Python! Đây là những viên gạch cơ sở vững chắc nhất để chúng ta tự tin bước sang Chương 12: thế giới của các quyết định logic rẽ nhánh với câu lệnh if, Boolean và cấu trúc so khớp match/case.'
      }
    ]
  },

  exercises: [
    {
      title: 'Xây dựng trình chuyển hướng log đa hình ghi đồng thời ra 2 luồng',
      level: 'Nâng cao',
      problem: 'Viết một lớp TeeStream có phương thức write(string) nhận dữ liệu từ lệnh print và gửi đồng thời dữ liệu đó tới cả màn hình console (sys.__stdout__) lẫn một file log trên đĩa.',
      hint: 'Lưu đối tượng file trong __init__ và trong write(string) gọi cả sys.__stdout__.write(string) và self.file.write(string).',
      solutionCode: `import sys

class TeeStream:
    def __init__(self, file_path):
        self.file = open(file_path, 'w', encoding='utf-8')

    def write(self, string):
        # 1. Ghi ra màn hình console gốc
        sys.__stdout__.write(string)
        # 2. Ghi đồng thời ra file trên đĩa
        self.file.write(string)

    def close(self):
        self.file.close()

tee = TeeStream('tee_output.txt')
print("Dòng này hiển thị cả trên Console lẫn trong File!", file=tee)
tee.close()

# Kiểm chứng file
print("Nội dung file tee:", open('tee_output.txt', encoding='utf-8').read().strip())`,
      solutionOutput: `Dòng này hiển thị cả trên Console lẫn trong File!
Nội dung file tee: Dòng này hiển thị cả trên Console lẫn trong File!`,
      explanation: 'Nhờ tính đa hình của hàm print(), TeeStream đóng vai trò như một cút nối chữ T (tee) phân nhánh dữ liệu tới hai đích đến cùng lúc.'
    }
  ],

  quiz: [
    {
      question: 'Trong Python, điều gì xảy ra nếu bạn chạy câu lệnh L = L.sort() trên một danh sách L = [3, 2, 1]?',
      options: [
        'L trở thành [1, 2, 3].',
        'L trở thành None vì phương thức sort() thay đổi tại chỗ và trả về None.',
        'Python phát sinh ngoại lệ TypeError.',
        'L giữ nguyên [3, 2, 1].'
      ],
      correctIndex: 1,
      explanation: 'sort() là phương thức thay đổi tại chỗ (in-place) và trả về None. Gán ngược lại cho L sẽ làm biến L nhận giá trị None và mất sạch dữ liệu.'
    },
    {
      question: 'Để hàm print(X) gửi văn bản tới một đối tượng tùy chỉnh do bạn tự viết lớp, đối tượng đó bắt buộc phải có phương thức nào?',
      options: [
        'Phương thức __str__()',
        'Phương thức write(string)',
        'Phương thức flush()',
        'Phương thức append()'
      ],
      correctIndex: 1,
      explanation: 'Hàm print() hoạt động theo cơ chế đa hình: nó gửi văn bản bằng cách gọi phương thức .write(string) của đối tượng luồng được truyền vào.'
    },
    {
      question: 'Cách nào sau đây KHÔNG THỂ dùng để gán 3 biến a, b, c cùng nhận giá trị số 10?',
      options: [
        'a = b = c = 10',
        'a, b, c = 10, 10, 10',
        'a = 10; b = 10; c = 10',
        'a == b == c == 10'
      ],
      correctIndex: 3,
      explanation: 'Cú pháp a == b == c == 10 là phép so sánh chuỗi (chained comparison) trả về giá trị Boolean True/False, hoàn toàn không phải là câu lệnh gán giá trị.'
    }
  ],

  summary: [
    'Chuyển hướng luồng in có thể thực hiện thủ công qua gán sys.stdout hoặc tự động an toàn qua tham số file= của hàm print.',
    'Tính đa hình của print: bất kỳ đối tượng nào cung cấp phương thức write(string) (như lớp FileFaker) đều có thể đón nhận dữ liệu in.',
    'Trọn vẹn 4 câu hỏi ôn tập của Mark Lutz đã làm sáng tỏ: 3 cách gán đa biến, cạm bẫy đối tượng khả biến, sai lầm L = L.sort(), và các kỹ thuật chuyển hướng file.',
    'Chương 11 kết thúc toàn diện; toàn bộ nền tảng đã sẵn sàng để tiếp nối sang Chương 12: Câu lệnh if, Boolean và Match/Case.'
  ]
};
