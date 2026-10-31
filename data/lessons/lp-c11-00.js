export default {
  id: 'lp-c11-00',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.0',
  title: 'Mở đầu Chương 11 & Bảng 11-1 — Bản chất Phép gán và Kỹ thuật Giải nén (Unpacking)',
  subtitle: '4 đặc tính then chốt của phép gán, toàn cảnh 8 dạng cú pháp trong Bảng 11-1, 4 loại mục tiêu gán và kỹ thuật hoán đổi biến (swap) không cần biến tạm',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thấu hiểu 4 đặc tính then chốt của phép gán trong Python: tạo tham chiếu đối tượng (con trỏ), tự động khai sinh biến, bắt buộc gán trước khi tham chiếu, và các ngữ cảnh gán ngầm định.',
    'Nắm vững toàn bộ 8 dạng cú pháp câu lệnh và biểu thức gán trong Bảng 11-1 của Mark Lutz.',
    'Phân biệt và làm chủ 4 loại mục tiêu gán: tên biến (variable), chỉ mục (index), lát cắt (slice), và thuộc tính đối tượng (attribute).',
    'Ứng dụng thành thạo phép gán tuple và list (unpacking) để trích xuất dữ liệu theo vị trí và thành ngữ hoán đổi giá trị hai biến mà không cần biến tạm thời.'
  ],

  intuition: {
    title: 'Gắn Nhãn Tên Lên Chiếc Hộp và Ghép Đôi Song Song',
    metaphor: 'Trong các ngôn ngữ truyền thống như C hay Pascal, câu lệnh gán giống như việc bạn xúc dữ liệu đổ vào một chiếc hộp cố định được khoét sẵn trên thanh RAM. Nhưng trong Python, đối tượng dữ liệu đã tự đứng vững trong bộ nhớ từ trước; câu lệnh gán (=) chỉ đơn thuần là hành động dán một tấm nhãn tên (name tag) nối bằng sợi chỉ tham chiếu đến đối tượng đó. Khi bạn viết một tuple các nhãn ở vế trái và một tuple các đối tượng ở vế phải, Python như một trọng tài tung đồng xu: lưu trữ toàn bộ các đối tượng vế phải vào một bộ nhớ tạm rồi đồng loạt dán các nhãn vế trái vào đúng vị trí đối diện theo thứ tự từ trái qua phải, cho phép hoán đổi nhãn tên kỳ diệu mà không làm xáo trộn dữ liệu.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH PHÉP GÁN THAM CHIẾU & GIẢI NÉN TUPLE (UNPACKING)</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--accent-primary);">VẾ TRÁI: MỤC TIÊU (TARGETS)</div>
            <div style="margin-top:6px;font-size:0.82rem;color:var(--text-secondary);">Các nhãn tên hoặc vị trí cấu trúc<br><code>first, second</code></div>
          </div>
          <div style="font-size:1.4rem;color:var(--accent-primary);font-weight:700;">=</div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:#10b981;">VẾ PHẢI: ĐỐI TƯỢNG (OBJECTS)</div>
            <div style="margin-top:6px;font-size:0.82rem;color:var(--text-secondary);">Tạo tuple tạm thời trong bộ nhớ<br><code>second, first</code></div>
          </div>
        </div>
        <div style="padding:8px 12px;background:var(--bg-surface);border-left:4px solid #f59e0b;border-radius:4px;font-size:0.8rem;color:var(--text-secondary);">
          <strong>Kết quả ghép đôi:</strong> <code>first</code> liên kết tới giá trị cũ của <code>second</code>; <code>second</code> liên kết tới giá trị cũ của <code>first</code> (Hoán đổi tức thời không cần biến tạm <code>temp</code>).
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Mở Đầu Chương 11 & Bốn Đặc Tính Then Chốt của Phép Gán',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp (Statements and Syntax) • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 1–2 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Ghi chú học tập: Toàn bộ cấu trúc, thuật ngữ và mã nguồn kiểm chứng được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình kinh điển Mark Lutz.</em></p>
          </div>
        </div>

        <p>Sau khi đã hoàn thành phần giới thiệu mở đầu về cú pháp câu lệnh Python ở Chương 10, chương này sẽ khởi đầu chuyến tham quan chuyên sâu của chúng ta về các câu lệnh cụ thể trong Python. Chúng ta sẽ bắt đầu với những nền tảng cơ bản nhất: <strong>câu lệnh gán (assignment statement)</strong>, <strong>câu lệnh biểu thức (expression statement)</strong> và các <strong>thao tác in ấn (print)</strong>.</p>
        <p>Ở dạng cơ bản nhất, bạn viết mục tiêu của phép gán ở bên trái dấu bằng (<code>=</code>), và đối tượng cần gán ở bên phải. Mục tiêu ở bên trái có thể là một tên biến hoặc một thành phần của đối tượng, còn đối tượng ở bên phải có thể là một biểu thức tùy ý tạo ra đối tượng. Mark Lutz nhấn mạnh <strong>4 đặc tính then chốt</strong> cần khắc ghi ngay từ đầu:</p>

        <ol>
          <li>
            <strong>Phép gán tạo ra các tham chiếu đối tượng (object references):</strong> Như đã thảo luận trong Chương 6, các phép gán trong Python lưu trữ các tham chiếu đến đối tượng vào các tên biến hoặc các thành phần của cấu trúc dữ liệu. Chúng luôn luôn tạo ra tham chiếu tới đối tượng thay vì sao chép đối tượng đó. Chính vì thế, các biến trong Python giống như các con trỏ (pointers) hơn là các vùng lưu trữ dữ liệu cố định.
          </li>
          <li>
            <strong>Tên biến được tạo ra khi được gán lần đầu tiên:</strong> Python tự động tạo ra một tên biến ngay lần đầu tiên bạn gán cho nó một giá trị (tức là một tham chiếu đối tượng), do đó hoàn toàn không cần phải khai báo trước tên biến. Một số vị trí trong cấu trúc dữ liệu cũng được tạo khi được gán (ví dụ: các khóa trong từ điển — <code>dictionary</code>, hoặc một số thuộc tính đối tượng — <code>object attributes</code>). Một khi đã được gán, tên biến sẽ được thay thế bằng giá trị mà nó tham chiếu tới bất cứ khi nào nó xuất hiện trong một biểu thức.
          </li>
          <li>
            <strong>Tên biến phải được gán trước khi được tham chiếu:</strong> Việc sử dụng một tên biến mà bạn chưa từng gán giá trị là một lỗi nghiêm trọng. Python sẽ phát sinh một ngoại lệ (exception: <code>NameError</code>) nếu bạn cố làm điều đó, thay vì trả về một dạng giá trị mặc định mơ hồ nào đó (như <code>undefined</code> hay rác bộ nhớ). Điều này hóa ra lại rất quan trọng trong Python vì các tên biến không được khai báo trước — nếu Python tự ý cung cấp giá trị mặc định cho các tên biến chưa gán, bạn sẽ khó phát hiện ra các lỗi gõ sai chính tả tên biến trong mã của mình hơn rất nhiều!
          </li>
          <li>
            <strong>Một số thao tác thực hiện phép gán ngầm định (implicit assignment):</strong> Phép gán không chỉ giới hạn ở câu lệnh <code>=</code> và toán tử walrus <code>:=</code>, mà còn diễn ra ngầm định trong rất nhiều ngữ cảnh khác của Python: việc nhập module (<code>import</code>), định nghĩa hàm (<code>def</code>), định nghĩa lớp (<code>class</code>), biến vòng lặp <code>for</code>, và việc truyền đối số khi gọi hàm đều là các phép gán ngầm định liên kết tên biến với tham chiếu đối tượng tại thời gian chạy (runtime).
          </li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Khảo sát 4 đặc tính của phép gán và lỗi NameError khi tham chiếu biến chưa gán',
          code: `# 1. Phép gán tạo tham chiếu đối tượng (trỏ cùng id bộ nhớ)
du_lieu_goc = [1, 2, 3]
tham_chieu = du_lieu_goc
print("Cùng trỏ một đối tượng:", tham_chieu is du_lieu_goc)

# 2. Tên biến tự động khai sinh khi gán lần đầu
bien_moi = "Python 3.14"
print("Giá trị biến mới:", bien_moi)

# 3. Ngoại lệ NameError khi dùng biến chưa từng được gán
try:
    print(bien_chua_khoi_tao)
except NameError as err:
    print("Bắt ngoại lệ bắt buộc gán trước:", type(err).__name__, "-", err)

# 4. Phép gán ngầm định trong vòng lặp for
for muc in ['A', 'B']:
    pass
print("Biến muc được gán ngầm định sau vòng lặp:", muc)`,
          output: `Cùng trỏ một đối tượng: True
Giá trị biến mới: Python 3.14
Bắt ngoại lệ bắt buộc gán trước: NameError - name 'bien_chua_khoi_tao' is not defined
Biến muc được gán ngầm định sau vòng lặp: B`,
          annotations: [
            { line: 3, text: 'Phép gán không sao chép mảng, chỉ tạo tham chiếu đối tượng mới trỏ cùng vùng nhớ.' },
            { line: 7, text: 'Không cần khai báo kiểu trước, biến_moi lập tức xuất hiện trong không gian tên.' },
            { line: 13, text: 'Python bảo vệ mã nguồn: biến chưa gán sinh lỗi NameError ngay lập tức.' },
            { line: 19, text: 'Vòng lặp for ngầm gán từng phần tử cho biến muc ở mỗi bước lặp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Toàn Cảnh Bảng 11-1 — Các Dạng Cú Pháp Phép Gán & Bốn Loại Mục Tiêu',
      content: `
        <p>Mặc dù phép gán là một khái niệm tổng quát và phổ biến khắp nơi trong Python, nhưng trong chương này, chúng ta chủ yếu tập trung vào các <strong>câu lệnh gán</strong>, cùng với <strong>biểu thức gán có tên</strong>. Bảng 11-1 dưới đây minh họa toàn bộ các dạng cú pháp có sẵn để viết phép gán trong Python:</p>

        <div class="table-wrapper" style="margin:20px 0;">
          <table class="markdown-table" style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:10px 14px;color:var(--accent-primary);">Thao tác (Cú pháp)</th>
                <th style="padding:10px 14px;color:var(--accent-primary);">Ý nghĩa giải thích</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;"><code>target = 'Hack'</code></td>
                <td style="padding:10px 14px;">Phép gán cơ bản (basic assignment)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;"><code>code, hack = 'py', 'PY'</code></td>
                <td style="padding:10px 14px;">Phép gán tuple (tuple assignment / unpacking)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;"><code>[code, hack] = ['py', 'PY']</code></td>
                <td style="padding:10px 14px;">Phép gán list (list assignment / unpacking)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;"><code>a, b, c, d = 'hack'</code></td>
                <td style="padding:10px 14px;">Phép gán dãy tuần tự (sequence assignment)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;"><code>a, *b = 'hack'</code></td>
                <td style="padding:10px 14px;">Phép gán giải nén mở rộng (extended unpacking)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;"><code>code = hack = 'python'</code></td>
                <td style="padding:10px 14px;">Phép gán đa mục tiêu (multiple-target assignment)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;"><code>code += 1, hack *= 2</code></td>
                <td style="padding:10px 14px;">Phép gán tăng cường (augmented assignment — xem ghi chú bên dưới)</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;"><code>(python := 3.12) + 0.01</code></td>
                <td style="padding:10px 14px;">Biểu thức gán có tên (named assignment expression / walrus)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin:16px 0;">
          <div class="callout-header">
            <span>💡</span>
            <span><strong>Ghi chú của trang web về dòng áp chót Bảng 11-1:</strong></span>
          </div>
          <div class="callout-body">
            <p>Trong Bảng 11-1 của bản gốc Mark Lutz, dòng gán tăng cường viết <code>code += 1, hack *= 2</code> để liệt kê hai ví dụ tiêu biểu cạnh nhau trên cùng một ô bảng nhằm tiết kiệm không gian. Trong cú pháp Python thực tế, bạn <strong>không thể</strong> dùng dấu phẩy để ghép hai phép gán tăng cường trên cùng một dòng (điều này sẽ gây ra <code>SyntaxError</code>). Mỗi câu lệnh tăng cường phải nằm trên một dòng riêng biệt, hoặc được ngăn cách bằng dấu chấm phẩy (<code>code += 1; hack *= 2</code>).</p>
          </div>
        </div>

        <h3>Bốn loại mục tiêu gán trong phép gán cơ bản</h3>
        <p>Dạng cơ bản ở trên cùng của Bảng 11-1 liên kết một mục tiêu đơn lẻ với một đối tượng đơn lẻ. Mục tiêu ở vế trái của dấu bằng có thể thuộc một trong <strong>4 loại mục tiêu</strong> sau:</p>
        <ul>
          <li><strong>Tên biến (variable):</strong> <code>L = [1, 2]</code></li>
          <li><strong>Chỉ mục (index):</strong> <code>L[0] = 3</code> (thay đổi tại chỗ phần tử danh sách)</li>
          <li><strong>Lát cắt (slice):</strong> <code>L[-1:] = [4, 5]</code> (thay thế một đoạn danh sách)</li>
          <li><strong>Thuộc tính đối tượng (attribute):</strong> <code>object.attr = L</code> (thay đổi trường dữ liệu của lớp đối tượng)</li>
        </ul>

        <div class="callout-box callout-tip" style="border-left:4px solid #8b5cf6;margin:16px 0;">
          <div class="callout-header">
            <span>📌</span>
            <span><strong>Ghi chú: Chú thích tên (Name Annotations & Type Hinting)</strong></span>
          </div>
          <div class="callout-body">
            <p>Các câu lệnh gán cơ bản cũng có thể có một <em>biểu thức chú thích (annotation expression)</em> được đưa vào bằng dấu hai chấm ngay sau mục tiêu ở bên trái (ví dụ: <code>x: int = 10</code>). Dạng câu lệnh này chỉ cho phép một mục tiêu duy nhất và được sử dụng cho hệ thống gợi ý kiểu (<em>type hinting</em>) xuất hiện gần cuối Chương 6. Như Mark Lutz đã nhấn mạnh, vì tính năng này hoàn toàn là tùy chọn, rườm rà phức tạp, bản thân trình thông dịch Python không hề sử dụng để ép kiểu tại runtime, và về cơ bản đi ngược lại lối tư duy định kiểu động cốt lõi của ngôn ngữ, giáo trình sẽ không đi sâu vào nó.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thực hành 4 loại mục tiêu gán tại dấu nhắc REPL',
          code: `# Khởi tạo danh sách bằng mục tiêu tên biến
L = [1, 2]
print("Ban đầu:", L)

# Mục tiêu là chỉ mục (thay đổi phần tử đầu tiên)
L[0] = 3
print("Sau khi gán L[0] = 3:", L)

# Mục tiêu là lát cắt (thay thế phần tử cuối bằng 2 phần tử mới)
L[-1:] = [4, 5]
print("Sau khi gán lát cắt L[-1:] = [4, 5]:", L)

# Mục tiêu là thuộc tính đối tượng (minh họa với class đơn giản)
class HopChua:
    pass

hop = HopChua()
hop.attr = L # Gán thuộc tính đối tượng
print("Thuộc tính hop.attr:", hop.attr)`,
          output: `Ban đầu: [1, 2]
Sau khi gán L[0] = 3: [3, 2]
Sau khi gán lát cắt L[-1:] = [4, 5]: [3, 4, 5]
Thuộc tính hop.attr: [3, 4, 5]`,
          annotations: [
            { line: 2, text: 'L là mục tiêu tên biến, trỏ tới đối tượng danh sách mới tạo [1, 2].' },
            { line: 6, text: 'L[0] là mục tiêu chỉ mục, thay đổi giá trị 1 thành 3 tại chỗ.' },
            { line: 10, text: 'L[-1:] cắt lát phần tử cuối (2) và thay bằng danh sách [4, 5].' },
            { line: 17, text: 'hop.attr là mục tiêu thuộc tính đối tượng, gắn tham chiếu tới L.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phép Gán Tuple, List & Kỹ Thuật Hoán Đổi Biến (Unpacking)',
      content: `
        <p>Dạng thứ hai và thứ ba trong Bảng 11-1 có liên quan chặt chẽ với nhau: khi bạn viết một <strong>tuple</strong> hoặc <strong>list</strong> ở vế trái của dấu <code>=</code>, Python sẽ ghép đôi các đối tượng ở vế phải với các mục tiêu ở vế trái theo vị trí và gán chúng lần lượt từ trái qua phải.</p>
        <p>Vế trái của dấu <code>=</code> là cú pháp chỉ định mục tiêu, trong khi vế phải là một đối tượng thực sự. Đó là lý do tại sao dạng này được gọi là <strong>phép gán giải nén (unpacking assignment)</strong>: các phần tử ở vế phải được "mở gói" và chuyển vào từng mục tiêu riêng biệt ở vế trái.</p>

        <h3>Mẹo lập trình kinh điển: Hoán đổi giá trị hai biến không cần biến tạm</h3>
        <p>Phép gán tuple dẫn tới một thành ngữ lập trình cực kỳ phổ biến và thanh lịch trong Python. Trong các ngôn ngữ khác, để hoán đổi giá trị của hai biến, bạn bắt buộc phải tạo một biến tạm thời:</p>
        <pre><code>temp = first
first = second
second = temp</code></pre>
        <p>Trong Python, bởi vì trình thông dịch tự động tạo ra một <strong>tuple tạm thời trong bộ nhớ</strong> để lưu giữ toàn bộ các giá trị ban đầu của các biến ở vế phải trước khi câu lệnh gán thực sự bắt đầu ghi đè, bạn có thể hoán đổi hai biến chỉ bằng một dòng lệnh duy nhất:</p>
        <pre><code>first, second = second, first</code></pre>
        <p>Tuple ở vế phải tự động ghi nhớ các giá trị trước đó của các biến, loại bỏ hoàn toàn nhu cầu quản lý biến tạm thủ công.</p>

        <h3>Khái quát hóa cho mọi Iterable ở vế phải</h3>
        <p>Các dạng gán tuple và list ban đầu của Python cuối cùng đã được khái quát hóa thành <strong>phép gán dãy tuần tự (sequence assignment)</strong>: vế phải có thể là bất kỳ đối tượng có thể lặp (<em>iterable</em>) nào—chuỗi ký tự, tuple, list, range, thậm chí là các dòng đọc từ file—miễn là nó có cùng số lượng phần tử với dãy tuần tự mục tiêu ở vế trái!</p>
      `,
      codeExamples: [
        {
          title: 'Giải nén Tuple/List, Hoán đổi biến và Giải nén chuỗi ký tự',
          code: `# Phép gán Tuple (lược bỏ ngoặc đơn)
first, second = 1, 2
print("Tuple gán ban đầu:", first, second)

# Hoán đổi giá trị hai biến tức thì không cần biến tạm
first, second = second, first
print("Sau khi hoán đổi:", first, second)

# Phép gán List mục tiêu
[C, D] = [first, second]
print("List mục tiêu [C, D]:", C, D)

# Khái quát hóa: Gán chuỗi ký tự cho Tuple các biến
(a, b, c) = 'ABC'
print("Giải nén chuỗi 'ABC':", a, b, c)

# Gán Tuple giá trị cho List tên biến
[x, y, z] = (10, 20, 30)
print("Giải nén tuple vào list biến:", x, y, z)`,
          output: `Tuple gán ban đầu: 1 2
Sau khi hoán đổi: 2 1
List mục tiêu [C, D]: 2 1
Giải nén chuỗi 'ABC': A B C
Giải nén tuple vào list biến: 10 20 30`,
          annotations: [
            { line: 2, text: 'Cả hai vế đều là tuple được lược bỏ cặp dấu ngoặc đơn.' },
            { line: 6, text: 'Python tạo tuple tạm thời (2, 1) ở vế phải rồi gán lần lượt cho first và second.' },
            { line: 14, text: 'Chuỗi 3 ký tự \'ABC\' được tự động giải nén thành 3 ký tự gán cho a, b, c.' },
            { line: 18, text: 'Không bắt buộc kiểu hai vế phải giống nhau: vế trái là list mục tiêu, vế phải là tuple đối tượng.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời khuyên từ Mark Lutz: Biến trong Python là Con trỏ',
        content: 'Hãy luôn ghi nhớ rằng tên biến trong Python chỉ là những con trỏ tham chiếu đến đối tượng trong bộ nhớ. Phép gán không bao giờ sao chép dữ liệu bên trong đối tượng, mà chỉ liên kết tên biến tới địa chỉ đối tượng đó. Hiểu rõ điều này sẽ giúp bạn làm chủ toàn bộ hành vi bộ nhớ và tránh được các cạm bẫy tham chiếu chia sẻ ở các phần sau.'
      }
    ]
  },

  exercises: [
    {
      title: 'Hoán đổi vị trí xoay vòng 3 biến bằng phép gán Tuple',
      level: 'Cơ bản',
      problem: 'Cho ba biến a = 1, b = 2, c = 3. Hãy dùng một câu lệnh gán duy nhất để hoán đổi xoay vòng giá trị của chúng sao cho a nhận giá trị của b, b nhận giá trị của c, và c nhận giá trị của a ban đầu.',
      hint: 'Áp dụng cú pháp phép gán tuple đa mục tiêu: vế trái là các biến cần nhận, vế phải là tuple các biến mang giá trị ban đầu tương ứng.',
      solutionCode: `a, b, c = 1, 2, 3
a, b, c = b, c, a
print(f"a = {a}, b = {b}, c = {c}")`,
      solutionOutput: `a = 2, b = 3, c = 1`,
      explanation: 'Python tạo ra tuple tạm thời (b, c, a) tương đương (2, 3, 1) trong bộ nhớ, sau đó giải nén tuần tự từ trái qua phải vào a, b, c mà không cần bất kỳ biến trung gian nào.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về bản chất câu lệnh gán trong Python theo Mark Lutz?',
      options: [
        'Phép gán sao chép toàn bộ khối dữ liệu của đối tượng vào một vùng nhớ mới dành riêng cho biến.',
        'Phép gán lưu trữ tham chiếu (con trỏ) đến đối tượng vào tên biến hoặc thành phần cấu trúc dữ liệu.',
        'Mọi tên biến trong Python đều bắt buộc phải được khai báo kiểu dữ liệu trước khi gán.',
        'Nếu bạn sử dụng một biến chưa từng được gán giá trị, Python sẽ tự gán cho nó giá trị mặc định là 0 hoặc None.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, phép gán luôn tạo ra tham chiếu đối tượng (object references) thay vì sao chép đối tượng. Biến đóng vai trò như các con trỏ trỏ tới vùng nhớ.'
    },
    {
      question: 'Điều gì xảy ra khi bạn cố tình tham chiếu đến một tên biến chưa từng được gán giá trị trong chương trình?',
      options: [
        'Chương trình tiếp tục chạy và biến nhận giá trị rỗng chuỗi \' \'.',
        'Python đưa ra cảnh báo lỗi thời (DeprecationWarning) nhưng vẫn chạy tiếp.',
        'Python phát sinh ngoại lệ NameError ngay lập tức.',
        'Trình biên dịch tự động khởi tạo biến đó bằng giá trị False.'
      ],
      correctIndex: 2,
      explanation: 'Python yêu cầu biến phải được gán trước khi tham chiếu. Việc dùng biến chưa gán sẽ kích hoạt ngoại lệ NameError, giúp lập trình viên phát hiện lỗi gõ sai tên biến.'
    },
    {
      question: 'Trong câu lệnh hoán đổi biến first, second = second, first, vì sao Python không làm mất giá trị ban đầu của first?',
      options: [
        'Vì Python sử dụng một thanh ghi phần cứng chuyên dụng trên CPU.',
        'Vì vế phải được định giá trị và lưu trữ thành một tuple tạm thời trong bộ nhớ trước khi phép gán vế trái diễn ra.',
        'Vì Python hoãn việc thực thi câu lệnh cho đến cuối chương trình.',
        'Vì second tự động sao chép sâu (deep copy) đối tượng của first.'
      ],
      correctIndex: 1,
      explanation: 'Python định giá trị toàn bộ biểu thức vế phải trước, đóng gói thành một tuple tạm thời lưu giữ các tham chiếu cũ, sau đó mới giải nén vào các mục tiêu ở vế trái.'
    }
  ],

  summary: [
    'Câu lệnh gán tạo ra các tham chiếu đối tượng (con trỏ) trong bộ nhớ, không sao chép dữ liệu.',
    'Tên biến tự động sinh ra khi gán lần đầu, nhưng bắt buộc phải được gán trước khi đem ra tham chiếu (tránh lỗi NameError).',
    'Bảng 11-1 tổng kết 8 dạng cú pháp gán phong phú: từ cơ bản, tuple/list unpacking, đa mục tiêu, tăng cường đến toán tử walrus :=.',
    'Phép gán giải nén dãy tuần tự cho phép hoán đổi biến tức thì A, B = B, A và chấp nhận mọi iterable ở vế phải có cùng độ dài.'
  ]
};
