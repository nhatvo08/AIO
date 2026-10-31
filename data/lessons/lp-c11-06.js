export default {
  id: 'lp-c11-06',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.6',
  title: 'Quy tắc và Quy ước Đặt tên Biến — Bảng 11-3 Từ khóa Dành riêng & Bản chất Động',
  subtitle: 'Cú pháp định danh, tính phân biệt hoa thường, trọn bộ 35 từ khóa trong Bảng 11-3, từ khóa mềm, quy ước CPython và bản chất "biến không có kiểu, đối tượng mới có kiểu"',
  level: 'Cơ bản đến Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững quy tắc cú pháp định danh biến trong Python: (chữ cái hoặc gạch dưới) + (chữ cái, chữ số hoặc gạch dưới), cùng tính phân biệt chữ hoa/chữ thường (case-sensitivity).',
    'Tra cứu và ghi nhớ trọn bộ 35 từ khóa dành riêng cứng trong Bảng 11-3 cùng 4 từ khóa mềm (soft reserved words: match, case, _, type).',
    'Hiểu các ràng buộc mở rộng khi đặt tên tệp module (.py) và thư mục package để bảo đảm khả năng import và tính khả chuyển (portability).',
    'Làm chủ các quy ước đặt tên CPython (_X, __X__, __X, _) và phân biệt sâu sắc: tên biến không có kiểu hay tính khả biến, chỉ có đối tượng mới có kiểu (Python không có const).'
  ],

  intuition: {
    title: 'Biển Tên Phòng Khám và Ngôi Nhà Không Đóng Đinh',
    metaphor: 'Tên biến trong Python giống như những tấm biển tên bằng nhựa có nam châm dán tạm trước cửa các phòng khám bệnh. Bạn có thể tự do ghi chữ "Bác sĩ", "_TruongKhoa", hay "Phong_101", nhưng ban quản lý bệnh viện đã giữ riêng một số chữ cấm kỵ (như Bảng 11-3: "class", "def", "if"...) mà bạn không được phép in lên biển tên. Đặc biệt, tấm biển không hề có "kiểu" cố định: hôm nay bạn có thể dán biển x trước một phòng bệnh chứa chiếc giường đơn (số nguyên 0), ngày mai bạn có thể gỡ biển x đó dán sang một căn phòng hội nghị chứa cả trăm người (danh sách list). Tấm biển không quan tâm bên trong là gì, nó chỉ là một ký hiệu trỏ hướng!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN BIỆT BẢN CHẤT: TÊN BIẾN (CON TRỎ) VS ĐỐI TƯỢNG (BỘ NHỚ)</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:var(--bg-surface);border-radius:6px;">
            <div style="width:110px;font-weight:700;color:#8b5cf6;">x = 0</div>
            <div style="color:var(--text-secondary);font-size:0.8rem;">Tên <code>x</code> trỏ tới đối tượng số nguyên <code>0</code> (kiểu <code>int</code>, bất biến)</div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:var(--bg-surface);border-radius:6px;">
            <div style="width:110px;font-weight:700;color:#10b981;">x = 'Hello'</div>
            <div style="color:var(--text-secondary);font-size:0.8rem;">Tên <code>x</code> gán lại, trỏ sang đối tượng chuỗi <code>'Hello'</code> (kiểu <code>str</code>, bất biến)</div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:var(--bg-surface);border-radius:6px;">
            <div style="width:110px;font-weight:700;color:#ec4899;">x = [1, 2, 3]</div>
            <div style="color:var(--text-secondary);font-size:0.8rem;">Tên <code>x</code> trỏ sang đối tượng danh sách <code>[1, 2, 3]</code> (kiểu <code>list</code>, khả biến)</div>
          </div>
        </div>
        <div style="padding:6px 12px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);font-size:0.8rem;color:var(--text-secondary);">
          <strong>Kết luận:</strong> Bản thân <code>x</code> không có kiểu dữ liệu. Kiểu thuộc về đối tượng mà <code>x</code> tình cờ tham chiếu tới tại từng thời điểm!
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Quy Tắc Đặt Tên Biến & Tính Phân Biệt Chữ Hoa/Thường',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 22–23 / 38</strong>.</p>
          </div>
        </div>

        <p>Trong Python, các tên biến xuất hiện tự nhiên khi bạn gán giá trị cho chúng, nhưng bạn bắt buộc phải tuân theo các quy tắc cú pháp khi đặt tên cho các đối tượng trong chương trình:</p>

        <blockquote>
          <p><strong>Cú pháp chuẩn: (dấu gạch dưới hoặc chữ cái) + (bất kỳ số lượng chữ cái, chữ số, hoặc dấu gạch dưới nào)</strong></p>
        </blockquote>

        <ul>
          <li><strong>Hợp lệ:</strong> <code>_hack</code>, <code>hack</code>, <code>Hack_1</code>, <code>bien_dem_2026</code>.</li>
          <li><strong>Không hợp lệ:</strong> <code>1_hack</code> (bắt đầu bằng chữ số), <code>hack$</code> (chứa ký tự đặc biệt), <code>@#!</code> (toán tử/ký tự lạ).</li>
        </ul>

        <h3>Phân biệt chữ hoa/chữ thường (Case Sensitivity)</h3>
        <p>Python luôn chú ý đến chữ hoa/chữ thường trong các chương trình, cả trong tên bạn tự tạo lẫn trong các từ khóa dành riêng:</p>
        <ul>
          <li>Các tên <code>X</code> và <code>x</code> đề cập đến <strong>hai biến hoàn toàn khác nhau</strong> trong không gian tên.</li>
          <li>Để đảm bảo <strong>tính khả chuyển (portability)</strong>, chữ hoa/chữ thường cũng đặc biệt quan trọng trong tên của các tệp module được <code>import</code>, ngay cả trên các hệ điều hành có hệ thống tệp không phân biệt chữ hoa/thường như Windows. Nhờ đó, mã nguồn của bạn sẽ chạy trơn tru khi triển khai lên các máy chủ Linux.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khảo sát quy tắc đặt tên hợp lệ và phân biệt hoa thường',
          code: `# Các tên biến hợp lệ
_khoi_tao = "Bắt đầu bằng gạch dưới"
bien_so_1 = 100
BienHoa = "Viết hoa chữ cái đầu"

# Phân biệt chữ hoa và chữ thường
gia_tri = 10
GIA_TRI = 99
Gia_Tri = "Khác biệt"

print("gia_tri:", gia_tri)
print("GIA_TRI:", GIA_TRI)
print("Gia_Tri:", Gia_Tri)

# Thử nghiệm tên không hợp lệ bằng exec để bắt lỗi cú pháp
try:
    exec("1_bien = 50")
except SyntaxError as err:
    print("Lỗi bắt đầu bằng số:", err)`,
          output: `gia_tri: 10
GIA_TRI: 99
Gia_Tri: Khác biệt
Lỗi bắt đầu bằng số: invalid decimal literal`,
          annotations: [
            { line: 2, text: '_khoi_tao là tên hợp lệ, thường dùng cho biến nội bộ.' },
            { line: 7, text: 'Ba tên biến gia_tri, GIA_TRI, Gia_Tri cùng tồn tại độc lập trong RAM.' },
            { line: 17, text: 'Tên biến bắt đầu bằng số 1_bien vi phạm ngữ pháp cơ sở của Python.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Toàn Cảnh Bảng 11-3 — 35 Từ Khóa Dành Riêng & Từ Khóa Mềm',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 23–24 / 38</strong>.</p>
          </div>
        </div>

        <p>Các tên bạn tự định nghĩa <strong>không được trùng</strong> với các từ mang ý nghĩa đặc biệt trong ngôn ngữ Python. Python sẽ đưa ra một lỗi cú pháp <code>SyntaxError</code> nếu bạn cố sử dụng <code>class = 1</code> làm biến, dù <code>klass</code> hoặc <code>Class</code> thì hoạt động bình thường. Bảng 11-3 liệt kê trọn bộ <strong>35 từ khóa cứng</strong> hiện đang được dành riêng trong Python:</p>

        <div class="table-wrapper" style="margin:20px 0;">
          <table class="markdown-table" style="width:100%;border-collapse:collapse;font-size:0.9rem;text-align:center;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);color:var(--accent-primary);">
                <th style="padding:10px;">Cột 1</th>
                <th style="padding:10px;">Cột 2</th>
                <th style="padding:10px;">Cột 3</th>
                <th style="padding:10px;">Cột 4</th>
                <th style="padding:10px;">Cột 5</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;"><code>False</code></td>
                <td style="padding:8px;"><code>await</code></td>
                <td style="padding:8px;"><code>else</code></td>
                <td style="padding:8px;"><code>import</code></td>
                <td style="padding:8px;"><code>pass</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;"><code>None</code></td>
                <td style="padding:8px;"><code>break</code></td>
                <td style="padding:8px;"><code>except</code></td>
                <td style="padding:8px;"><code>in</code></td>
                <td style="padding:8px;"><code>raise</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;"><code>True</code></td>
                <td style="padding:8px;"><code>class</code></td>
                <td style="padding:8px;"><code>finally</code></td>
                <td style="padding:8px;"><code>is</code></td>
                <td style="padding:8px;"><code>return</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;"><code>and</code></td>
                <td style="padding:8px;"><code>continue</code></td>
                <td style="padding:8px;"><code>for</code></td>
                <td style="padding:8px;"><code>lambda</code></td>
                <td style="padding:8px;"><code>try</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;"><code>as</code></td>
                <td style="padding:8px;"><code>def</code></td>
                <td style="padding:8px;"><code>from</code></td>
                <td style="padding:8px;"><code>nonlocal</code></td>
                <td style="padding:8px;"><code>while</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;"><code>assert</code></td>
                <td style="padding:8px;"><code>del</code></td>
                <td style="padding:8px;"><code>global</code></td>
                <td style="padding:8px;"><code>not</code></td>
                <td style="padding:8px;"><code>with</code></td>
              </tr>
              <tr>
                <td style="padding:8px;"><code>async</code></td>
                <td style="padding:8px;"><code>elif</code></td>
                <td style="padding:8px;"><code>if</code></td>
                <td style="padding:8px;"><code>or</code></td>
                <td style="padding:8px;"><code>yield</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Bốn từ khóa mềm (Soft Reserved Words)</h3>
        <p>Ngoài Bảng 11-3, các từ <code>match</code>, <code>case</code>, <code>_</code> (dùng trong câu lệnh so khớp cấu trúc ở Chương 12) và <code>type</code> (dùng cho câu lệnh khai báo bí danh kiểu <code>type aliases</code>) là các <strong>từ dành riêng mềm (soft reserved words)</strong>: chúng chỉ bị dành riêng khi xuất hiện ở đúng vị trí cú pháp câu lệnh tương ứng, còn ở tất cả các vị trí khác, bạn <em>vẫn có thể sử dụng chúng làm tên biến bình thường</em>.</p>

        <h3>Ràng buộc mở rộng sang tên tệp Module và Thư mục Package</h3>
        <p>Vì câu lệnh <code>import module_name</code> biến tên file thành một tên biến trong không gian tên chương trình của bạn, các ràng buộc tên biến mở rộng sang cả tên tệp <code>.py</code>:</p>
        <ul>
          <li>Bạn có thể tạo file <code>and.py</code> hay <code>my-code.py</code> và chạy trực tiếp, nhưng bạn <strong>không thể import chúng</strong> (<code>import and</code> báo lỗi từ khóa; <code>import my-code</code> bị hiểu lầm thành phép trừ). Dấu gạch dưới <code>my_code.py</code> thì hoạt động hoàn hảo!</li>
        </ul>

        <div class="callout-box callout-theory" style="border-left:4px solid #f59e0b;margin:16px 0;">
          <div class="callout-header">
            <span>⚡</span>
            <span><strong>Khung chuyên đề: Chính sách cảnh báo lỗi thời của Python (Deprecation Policy)</strong></span>
          </div>
          <div class="callout-body">
            <p><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz • <strong>PDF Trang 24 / 38</strong>.</p>
            <p>Bởi vì việc biến các từ mới thành từ dành riêng có nguy cơ phá vỡ hàng triệu dòng mã nguồn hiện có, Python đưa ra chính sách cảnh báo lỗi thời (<em>deprecation warnings</em>) qua nhiều phiên bản phát hành trước khi chính thức áp dụng. Mark Lutz đưa ra góc nhìn phản biện sâu sắc: Ban chỉ đạo (<em>steering committee</em>) chịu trách nhiệm kiểm soát điều này, nhưng các cảnh báo lỗi thời đôi khi bị lạm dụng. Đối với các hệ thống phân phối mã nguồn tới người dùng cuối, việc nâng cấp Python đột ngột vẫn có thể làm đổ vỡ phần mềm. Ông hóm hỉnh nhận định: <em>"Cảnh báo rằng bạn sắp sửa thô lỗ không có nghĩa là bạn được phép thô lỗ!"</em></p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khảo sát từ khóa cứng và tính linh hoạt của từ khóa mềm',
          code: `# 1. Từ khóa mềm: match và case vẫn được dùng làm biến bình thường
match = "Trận đấu chung kết"
case = "Trường hợp đặc biệt"
type = "Kiểu dữ liệu" # Ghi đè hàm type dựng sẵn (không khuyến khích nhưng hợp lệ)

print("Từ khóa mềm làm biến:", match, "|", case)

# 2. Thử nghiệm gán cho từ khóa cứng (SyntaxError)
try:
    exec("pass = 100")
except SyntaxError as err:
    print("Lỗi gán cho từ khóa cứng pass:", err)

# 3. Ba từ khóa viết hoa chữ cái đầu: True, False, None
print("Ba từ khóa đặc biệt:", True, False, None)`,
          output: `Từ khóa mềm làm biến: Trận đấu chung kết | Trường hợp đặc biệt
Lỗi gán cho từ khóa cứng pass: invalid syntax
Ba từ khóa đặc biệt: True False None`,
          annotations: [
            { line: 2, text: 'match và case là soft reserved words nên dùng làm biến bình thường ở đây.' },
            { line: 9, text: 'pass là từ khóa cứng trong Bảng 11-3, gán cho nó sinh lỗi SyntaxError ngay.' },
            { line: 14, text: 'True, False, None là 3 từ khóa duy nhất trong Bảng 11-3 viết hoa chữ đầu.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Quy Ước CPython & Bản Chất "Biến Không Có Kiểu, Đối Tượng Mới Có Kiểu"',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 25–26 / 38</strong>.</p>
          </div>
        </div>

        <p>Bên cạnh các quy tắc bắt buộc, cộng đồng Python tuân thủ nghiêm ngặt một tập hợp các <strong>quy ước đặt tên</strong> của trình thông dịch CPython:</p>

        <ul>
          <li><strong>Một dấu gạch dưới ở đầu (<code>_X</code>):</strong> Đánh dấu biến/hàm nội bộ, sẽ <strong>không được nhập</strong> bởi câu lệnh <code>from module import *</code> (Chương 23).</li>
          <li><strong>Hai dấu gạch dưới ở đầu và cuối (<code>__X__</code>):</strong> Các tên do hệ thống định nghĩa (<em>dunder methods</em>), mang ý nghĩa đặc biệt đối với trình thông dịch trong lập trình hướng đối tượng (ví dụ <code>__init__</code>, <code>__name__</code>) (Phần VI). Hãy tránh dùng định dạng này cho tên tự tạo của bạn!</li>
          <li><strong>Hai dấu gạch dưới ở đầu, không có ở cuối (<code>__X</code>):</strong> Được CPython biến đổi tên nội bộ (<em>name mangling</em>) để tránh xung đột thuộc tính trong kế thừa lớp (thuộc tính giả riêng tư — <em>pseudoprivate attributes</em>, Chương 31).</li>
          <li><strong>Dấu gạch dưới đơn lẻ (<code>_</code>):</strong> Tự động lưu giữ kết quả của biểu thức cuối cùng khi bạn làm việc tương tác tại REPL; đồng thời làm ký tự đại diện (<em>wildcard</em>) trong câu lệnh <code>match</code>.</li>
        </ul>

        <h3>Tên biến không có kiểu, nhưng đối tượng thì có</h3>
        <p>Điều cốt yếu mà mọi lập trình viên Python phải khắc sâu là <strong>sự phân biệt rạch ròi giữa tên biến và đối tượng</strong>:</p>
        <blockquote>
          <p><strong>Các đối tượng có một kiểu dữ liệu cụ thể (số nguyên, danh sách...) và có tính khả biến hoặc bất biến. Ngược lại, các tên biến chỉ là những con trỏ tham chiếu; bản thân biến không hề có kiểu và không có tính khả biến!</strong></p>
        </blockquote>

        <p>Do đó, việc gán cùng một tên biến cho các kiểu đối tượng hoàn toàn khác nhau tại những thời điểm khác nhau là <strong>hoàn toàn hợp lệ và là bản chất tự nhiên của Python</strong>:</p>
        <pre><code>x = 0         # x trỏ tới đối tượng số nguyên
x = 'Hello'   # Giờ x trỏ sang đối tượng chuỗi
x = [1, 2, 3] # Và giờ x trỏ sang đối tượng danh sách</code></pre>

        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin:16px 0;">
          <div class="callout-header">
            <span>📌</span>
            <span><strong>Chú thích [3] về từ khóa const:</strong></span>
          </div>
          <div class="callout-body">
            <p>Nếu bạn từng lập trình C++ hay Java, hãy lưu ý rằng <strong>Python hoàn toàn không có khái niệm khai báo hằng số <code>const</code> hay <code>final</code></strong>. Một số đối tượng có thể là bất biến (như số, chuỗi, tuple), nhưng các tên biến thì luôn luôn có thể bị gán lại sang đối tượng khác bất kỳ lúc nào.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khảo sát biến gán đổi kiểu động và quy ước dấu gạch dưới REPL',
          code: `# 1. Biến tự do trỏ sang các kiểu dữ liệu khác nhau
bien_dong = 42
print("1. Kiểu số nguyên:", type(bien_dong).__name__, "| Giá trị:", bien_dong)

bien_dong = "Học Python cùng Mark Lutz"
print("2. Chuyển sang kiểu chuỗi:", type(bien_dong).__name__, "| Giá trị:", bien_dong)

bien_dong = {'ten': 'Python', 'phien_ban': 3.14}
print("3. Chuyển sang kiểu từ điển:", type(bien_dong).__name__, "| Giá trị:", bien_dong)

# 2. Quy ước đặt tên CPython
class DemoQuyUoc:
    def __init__(self):
        self._noi_bo = "Quy ước nội bộ (_X)"
        self.__rieng_tu = "Name mangling (__X)"

obj = DemoQuyUoc()
print("Thuộc tính _noi_bo:", obj._noi_bo)
# Tên __rieng_tu bị đổi thành _DemoQuyUoc__rieng_tu
print("Tên sau khi name mangling:", getattr(obj, '_DemoQuyUoc__rieng_tu'))`,
          output: `1. Kiểu số nguyên: int | Giá trị: 42
2. Chuyển sang kiểu chuỗi: str | Giá trị: Học Python cùng Mark Lutz
3. Chuyển sang kiểu từ điển: dict | Giá trị: {'ten': 'Python', 'phien_ban': 3.14}
Thuộc tính _noi_bo: Quy ước nội bộ (_X)
Tên sau khi name mangling: Name mangling (__X)`,
          annotations: [
            { line: 2, text: 'Tên bien_dong ban đầu trỏ vào số 42 trong bộ nhớ.' },
            { line: 5, text: 'Cùng một tên bien_dong trỏ sang đối tượng chuỗi mà không báo lỗi kiểu.' },
            { line: 18, text: 'CPython tự động gắn tiền tố _TenLop vào các thuộc tính có hai gạch dưới __X.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời dặn dò từ Mark Lutz: Cẩn thận với việc ghi đè tên dựng sẵn',
        content: 'Các tên dựng sẵn như open, list, dict, str không phải là từ khóa dành riêng cứng trong Bảng 11-3. Do đó, bạn có thể vô tình viết open = 99 trong chương trình mà Python không hề báo lỗi, nhưng sau đó câu lệnh open("file.txt") sẽ bị đổ vỡ vì hàm open gốc đã bị ghi đè! Hãy luôn tỉnh táo để không đặt tên biến trùng với các hàm dựng sẵn.'
      }
    ]
  },

  exercises: [
    {
      title: 'Kiểm tra tính hợp lệ của danh sách các định danh trong Python',
      level: 'Cơ bản',
      problem: 'Cho một danh sách các chuỗi định danh: danh_sach = ["user_name", "2nd_player", "class", "Class", "_secret", "total$", "type", "yield"]. Hãy viết đoạn mã phân loại các định danh này thành 3 nhóm: (1) Tên hợp lệ dùng làm biến, (2) Từ khóa cứng bị cấm, (3) Lỗi cú pháp không hợp lệ.',
      hint: 'Dùng module keyword với keyword.iskeyword() và phương thức str.isidentifier().',
      solutionCode: `import keyword

danh_sach = ["user_name", "2nd_player", "class", "Class", "_secret", "total$", "type", "yield"]

hop_le = []
tu_khoa_cam = []
loi_cu_phap = []

for ten in danh_sach:
    if keyword.iskeyword(ten):
        tu_khoa_cam.append(ten)
    elif ten.isidentifier():
        hop_le.append(ten)
    else:
        loi_cu_phap.append(ten)

print("Tên hợp lệ dùng làm biến:", hop_le)
print("Từ khóa cứng bị cấm:", tu_khoa_cam)
print("Lỗi cú pháp định danh:", loi_cu_phap)`,
      solutionOutput: `Tên hợp lệ dùng làm biến: ['user_name', 'Class', '_secret', 'type']
Từ khóa cứng bị cấm: ['class', 'yield']
Lỗi cú pháp định danh: ['2nd_player', 'total$']`,
      explanation: 'class và yield là từ khóa cứng trong Bảng 11-3; 2nd_player bắt đầu bằng số và total$ chứa ký tự $ không hợp lệ; trong khi Class (viết hoa) và type (từ khóa mềm) hoàn toàn hợp lệ làm biến.'
    }
  ],

  quiz: [
    {
      question: 'Tên biến nào sau đây là KHÔNG HỢP LỆ trong cú pháp Python?',
      options: [
        '_system_var',
        'variable_2026',
        '2nd_count',
        'my_variable'
      ],
      correctIndex: 2,
      explanation: 'Tên biến trong Python bắt buộc phải bắt đầu bằng chữ cái hoặc dấu gạch dưới, không được bắt đầu bằng chữ số (2nd_count vi phạm quy tắc này).'
    },
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về từ khóa mềm (soft reserved words) như match, case trong Python?',
      options: [
        'Chúng bị cấm sử dụng làm tên biến ở mọi nơi trong chương trình giống như def hay class.',
        'Chúng chỉ được dành riêng trong ngữ cảnh câu lệnh tương ứng; bạn vẫn có thể sử dụng chúng làm tên biến bình thường ở các vị trí khác.',
        'Chúng sẽ bị xóa bỏ hoàn toàn trong các phiên bản Python tiếp theo.',
        'Chúng chỉ có hiệu lực khi chạy Python trên hệ điều hành Linux.'
      ],
      correctIndex: 1,
      explanation: 'Từ khóa mềm chỉ mang ý nghĩa đặc biệt khi đứng ở vị trí cú pháp câu lệnh của chúng (như câu lệnh match/case). Ở mọi vị trí khác, bạn vẫn tự do dùng chúng làm tên biến.'
    },
    {
      question: 'Khi bạn chạy câu lệnh open = "my_data.txt", điều gì sẽ xảy ra?',
      options: [
        'Python báo lỗi SyntaxError vì open là từ khóa dành riêng.',
        'Python tạo ra một hằng số bất biến mang tên open.',
        'Câu lệnh chạy thành công, nhưng biến open sẽ ghi đè hàm dựng sẵn open() của Python trong phạm vi hiện tại.',
        'Python tự động đổi tên biến thành open_file.'
      ],
      correctIndex: 2,
      explanation: 'open là tên hàm trong phạm vi dựng sẵn (built-in scope), không phải từ khóa dành riêng cứng. Việc gán open = ... hoạt động âm thầm nhưng sẽ che khuất hàm mở file dựng sẵn.'
    }
  ],

  summary: [
    'Quy tắc định danh biến: bắt đầu bằng chữ cái hoặc gạch dưới, theo sau bởi chữ cái, chữ số hoặc gạch dưới; phân biệt chữ hoa và chữ thường.',
    'Bảng 11-3 chứa 35 từ khóa dành riêng cứng tuyệt đối không thể dùng làm biến; 4 từ khóa mềm (match, case, _, type) chỉ dành riêng trong ngữ cảnh câu lệnh.',
    'Tên file module (.py) và package cũng phải tuân thủ quy tắc tên biến để bảo đảm khả năng import.',
    'Tên biến không có kiểu hay tính khả biến, chỉ có đối tượng mới có kiểu; Python không có khái niệm khai báo const.'
  ]
};
