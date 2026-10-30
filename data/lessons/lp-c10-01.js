export default {
  id: 'lp-c10-01',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.1',
  title: 'Toàn cảnh Bảng 10-1 — 26 Câu lệnh nền tảng của Python',
  subtitle: 'Khảo sát danh mục toàn bộ câu lệnh, vai trò cú pháp và 4 điểm lưu ý tinh tế: sắc thái gán, hàm print, yield/await và soft reserved words',
  level: 'Cơ bản đến Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Bao quát toàn cảnh 26 câu lệnh và biểu thức câu lệnh nền tảng trong Bảng 10-1 của Mark Lutz.',
    'Nhận biết vai trò chức năng và cú pháp đặc thù của từng nhóm câu lệnh: gán, điều khiển luồng, định nghĩa hàm/lớp, quản lý không gian tên và ngoại lệ.',
    'Nắm vững 4 lưu ý tinh tế về cú pháp: (1) các sắc thái của phép gán và toán tử walrus `:=`, (2) bản chất hàm của `print`, (3) `yield` và `await` là biểu thức kiêm từ khóa, (4) từ dành riêng cứng và từ dành riêng mềm (soft reserved words: match, case, type).'
  ],

  intuition: {
    title: 'Hộp đồ nghề chuyên dụng của người thợ cơ khí',
    metaphor: 'Hãy hình dung các câu lệnh trong Bảng 10-1 giống như bộ công cụ cơ khí được sắp xếp ngăn nắp trong một chiếc hộp đồ nghề đa năng. Có những công cụ bạn dùng hàng ngày và liên tục (như cờ-lê gán biến, tuốc-nơ-vít rẽ nhánh if/else, kìm kẹp vòng lặp while/for). Lại có những công cụ chuyên dụng quy mô lớn dành cho việc lắp ráp các cụm máy móc phức tạp (như mỏ lết def định nghĩa hàm, máy hàn class tạo lớp, đồng hồ đo áp suất try/except bắt lỗi). Bạn không cần phải dùng hết mọi công cụ cùng một lúc, nhưng bạn cần biết rõ vị trí, tên gọi và công năng của từng món đồ để khi gặp sự cố là có ngay công cụ phù hợp.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN BỔ TẬP HỢP CÂU LỆNH TRONG GIÁO TRÌNH PYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">PHẦN III (Hiện tại)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Gán, Biểu thức, print, if/elif/else, match/case, while, for, pass, break, continue</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #10b981;border-radius:6px;">
            <div style="font-weight:700;color:#10b981;">PHẦN IV &amp; V</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">def, return, yield, global, nonlocal, async, await, import, from</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #f59e0b;border-radius:6px;">
            <div style="font-weight:700;color:#f59e0b;">PHẦN VI &amp; VII</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">class, try/except/finally, raise, assert, with/as, del, type alias</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái quát Tập hợp Câu lệnh của Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 2–5 / 21</strong>.</p>
          </div>
        </div>

        <p>Mỗi câu lệnh trong Python đều có <strong>mục đích cụ thể riêng</strong> và <strong>cú pháp đặc thù riêng</strong>—tức các quy tắc định nghĩa cấu trúc của nó. Mặc dù vậy, như bạn sẽ thấy, nhiều câu lệnh chia sẻ chung các mẫu cú pháp (chẳng hạn như dòng tiêu đề kết thúc bằng dấu hai chấm <code>:</code> theo sau bởi một khối lệnh thụt lề), và vai trò của một số câu lệnh có phần chồng lấn nhau.</p>
        <p>Trong một chương trình, các câu lệnh có thể thực hiện hành động, lặp lại tác vụ, đưa ra lựa chọn rẽ nhánh, hoặc xây dựng các cấu trúc chương trình lớn hơn:</p>
        <ul>
          <li><strong>Phần III của cuốn sách:</strong> Xử lý các câu lệnh thủ tục cơ bản từ đầu bảng cho đến <code>break</code> và <code>continue</code> (các câu lệnh rẽ nhánh và vòng lặp).</li>
          <li><strong>Các phần sau:</strong> Các câu lệnh nằm ở nửa dưới bảng liên quan đến các đơn vị chương trình quy mô lớn hơn—hàm (<code>def</code>, <code>return</code>, <code>yield</code>), lớp (<code>class</code>), module (<code>import</code>, <code>from</code>) và ngoại lệ (<code>try</code>, <code>raise</code>, <code>assert</code>, <code>with</code>) sẽ có các phần chuyên biệt riêng.</li>
        </ul>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bảng 10-1: Trọn bộ 26 Câu lệnh Nền tảng của Python',
      content: `
        <p>Dưới đây là <strong>Bảng 10-1</strong> tóm tắt đầy đủ tập hợp các câu lệnh của Python cùng vai trò và ví dụ cú pháp chuẩn tắc:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="markdown-table" style="width:100%;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);">
                <th style="padding:10px 12px;text-align:left;width:24%;">Câu lệnh</th>
                <th style="padding:10px 12px;text-align:left;width:36%;">Vai trò</th>
                <th style="padding:10px 12px;text-align:left;width:40%;">Ví dụ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Phép gán (Assignment)</strong></td>
                <td>Tạo tham chiếu tên-đối tượng</td>
                <td><code>a, b = 'python', 3.12</code><br><code>a = (b := next()) + more</code></td>
              </tr>
              <tr>
                <td><strong>Lời gọi hàm &amp; biểu thức khác</strong></td>
                <td>Chạy các hàm và tính toán</td>
                <td><code>log.write('app crash')</code></td>
              </tr>
              <tr>
                <td><strong>print</strong></td>
                <td>In các đối tượng ra luồng xuất</td>
                <td><code>print(hack, code, file=log)</code></td>
              </tr>
              <tr>
                <td><strong>if / elif / else</strong></td>
                <td>Lựa chọn hành động rẽ nhánh</td>
                <td><code>if 'python' in text:<br>&nbsp;&nbsp;&nbsp;&nbsp;read(text)</code></td>
              </tr>
              <tr>
                <td><strong>match / case</strong></td>
                <td>Lựa chọn đa nhánh theo mẫu</td>
                <td><code>match edition:<br>&nbsp;&nbsp;&nbsp;&nbsp;case 6:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(2024)</code></td>
              </tr>
              <tr>
                <td><strong>for / else</strong></td>
                <td>Phép lặp tuần tự (Iteration)</td>
                <td><code>for x in myiterable:<br>&nbsp;&nbsp;&nbsp;&nbsp;print(x)</code></td>
              </tr>
              <tr>
                <td><strong>while / else</strong></td>
                <td>Vòng lặp tổng quát theo điều kiện</td>
                <td><code>while x := file.readline():<br>&nbsp;&nbsp;&nbsp;&nbsp;print(x)</code></td>
              </tr>
              <tr>
                <td><strong>pass</strong></td>
                <td>Phần giữ chỗ trống (No-op)</td>
                <td><code>if 'python' not in text:<br>&nbsp;&nbsp;&nbsp;&nbsp;pass</code></td>
              </tr>
              <tr>
                <td><strong>break</strong></td>
                <td>Thoát khỏi vòng lặp ngay lập tức</td>
                <td><code>while True:<br>&nbsp;&nbsp;&nbsp;&nbsp;if exittest(): break</code></td>
              </tr>
              <tr>
                <td><strong>continue</strong></td>
                <td>Bỏ qua vòng hiện tại, sang lần lặp kế tiếp</td>
                <td><code>while True:<br>&nbsp;&nbsp;&nbsp;&nbsp;if skiptest(): continue</code></td>
              </tr>
              <tr>
                <td><strong>def</strong></td>
                <td>Định nghĩa hàm và phương thức</td>
                <td><code>def f(a, b, c=2, *more):<br>&nbsp;&nbsp;&nbsp;&nbsp;print(a + b + c)</code></td>
              </tr>
              <tr>
                <td><strong>return</strong></td>
                <td>Trả về kết quả của hàm</td>
                <td><code>def f(a, b, c=2, *more):<br>&nbsp;&nbsp;&nbsp;&nbsp;return a + b + c</code></td>
              </tr>
              <tr>
                <td><strong>yield</strong></td>
                <td>Hàm sinh dữ liệu (Generator)</td>
                <td><code>def gen(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;for i in n: yield i*2</code></td>
              </tr>
              <tr>
                <td><strong>global</strong></td>
                <td>Khai báo biến thuộc không gian tên module</td>
                <td><code>x = 1<br>def function():<br>&nbsp;&nbsp;&nbsp;&nbsp;global x; x = 2</code></td>
              </tr>
              <tr>
                <td><strong>nonlocal</strong></td>
                <td>Khai báo biến thuộc phạm vi hàm bao ngoài</td>
                <td><code>def outer():<br>&nbsp;&nbsp;&nbsp;&nbsp;x = 1<br>&nbsp;&nbsp;&nbsp;&nbsp;def inner():<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nonlocal x; x = 2</code></td>
              </tr>
              <tr>
                <td><strong>async</strong></td>
                <td>Chỉ định hàm coroutine</td>
                <td><code>async def consumer(a, b):<br>&nbsp;&nbsp;&nbsp;&nbsp;await producer()</code></td>
              </tr>
              <tr>
                <td><strong>await</strong></td>
                <td>Chuyển giao quyền điều khiển coroutine</td>
                <td><code>await asyncio.sleep(1)</code></td>
              </tr>
              <tr>
                <td><strong>import</strong></td>
                <td>Truy cập và tải module</td>
                <td><code>import sys</code></td>
              </tr>
              <tr>
                <td><strong>from</strong></td>
                <td>Truy cập thuộc tính cụ thể từ module</td>
                <td><code>from sys import stdin as f</code></td>
              </tr>
              <tr>
                <td><strong>class</strong></td>
                <td>Xây dựng đối tượng và khuôn mẫu lớp</td>
                <td><code>class Subclass(Superclass):<br>&nbsp;&nbsp;&nbsp;&nbsp;classAttr = []<br>&nbsp;&nbsp;&nbsp;&nbsp;def method(self): pass</code></td>
              </tr>
              <tr>
                <td><strong>try / except / finally</strong></td>
                <td>Bắt ngoại lệ, hành động dọn dẹp khi kết thúc</td>
                <td><code>try:<br>&nbsp;&nbsp;&nbsp;&nbsp;action()<br>except:<br>&nbsp;&nbsp;&nbsp;&nbsp;print('action error')</code></td>
              </tr>
              <tr>
                <td><strong>raise</strong></td>
                <td>Kích hoạt ngoại lệ tường minh</td>
                <td><code>raise EndSearch(location)</code></td>
              </tr>
              <tr>
                <td><strong>assert</strong></td>
                <td>Kiểm tra điều kiện phục vụ gỡ lỗi (debug)</td>
                <td><code>assert X > Y, 'X too small'</code></td>
              </tr>
              <tr>
                <td><strong>with</strong></td>
                <td>Trình quản lý ngữ cảnh (Context manager)</td>
                <td><code>with open('data') as file:<br>&nbsp;&nbsp;&nbsp;&nbsp;process(file)</code></td>
              </tr>
              <tr>
                <td><strong>del</strong></td>
                <td>Xóa tham chiếu tên / phần tử / thuộc tính</td>
                <td><code>del data[k]<br>del data[i:j]<br>del obj.attr<br>del variable</code></td>
              </tr>
              <tr>
                <td><strong>type</strong></td>
                <td>Bí danh gợi ý kiểu (Type hint alias)</td>
                <td><code>type vector = list[float]</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Bốn Điểm Lưu Ý Tinh Tế về Nội dung Bảng 10-1',
      content: `
        <p>Về mặt kỹ thuật, Bảng 10-1 là vừa đủ cho một cái nhìn tổng quan nhanh và làm tài liệu tra cứu, nhưng nó chưa hẳn là hoàn chỉnh tuyệt đối. Mark Lutz chỉ ra <strong>4 điểm lưu ý tinh tế</strong> cần nắm vững:</p>

        <h3>1. Đa dạng sắc thái cú pháp của phép gán</h3>
        <p>Các câu lệnh gán xuất hiện dưới rất nhiều sắc thái cú pháp đa dạng (được trình bày chi tiết trong Chương 11): gán cơ bản (<code>a = 1</code>), gán dãy tuần tự (<code>a, b = 1, 2</code>), gán tăng cường (<code>a += 1</code>), và gán danh sách biến (<code>a = b = c = 0</code>). Đáng chú ý, <strong>phép gán có đặt tên (named assignment, <code>:=</code>)</strong> được sử dụng như một biểu thức, chứ không phải câu lệnh.</p>

        <h3>2. Bản chất thực sự của print</h3>
        <p>Trong Python 3, <code>print</code> thực chất là một <strong>lời gọi hàm dựng sẵn (built-in function call)</strong>, chứ không phải từ dành riêng hay câu lệnh chuyên biệt như trong Python 2. Tuy nhiên, vì nó gần như luôn luôn được chạy dưới dạng một câu lệnh biểu thức (expression statement) đứng riêng trên một dòng, nên nó thường được người học và tài liệu xem như một dạng câu lệnh thực thụ.</p>

        <h3>3. yield và await là biểu thức kiêm từ dành riêng</h3>
        <p>Cả <code>yield</code> và <code>await</code> về mặt cú pháp chính thức đều là <strong>các biểu thức</strong> thay vì câu lệnh. Giống như <code>print</code>, chúng thường được sử dụng dưới dạng câu lệnh biểu thức đứng một mình, nhưng các tập lệnh cũng có thể gán hoặc sử dụng kết quả trả về của chúng. Tuy nhiên, điểm khác biệt với <code>print</code> là <code>yield</code> và <code>await</code> là các <strong>từ khóa dành riêng (reserved words)</strong>.</p>

        <h3>4. Từ dành riêng cứng vs Từ dành riêng "mềm" (Soft Reserved Words)</h3>
        <p>Phần lớn các từ được sử dụng trong câu lệnh đều là từ dành riêng (reserved words) và bạn không thể dùng làm tên biến (như <code>and, in, if, for, while...</code>). Nhưng các câu lệnh mới hơn của Python sử dụng <strong>từ dành riêng "mềm" (soft reserved words)</strong>: chúng chỉ được xem là từ khóa khi nằm trong ngữ cảnh câu lệnh trực thuộc, còn ở ngữ cảnh khác bạn vẫn có thể đặt tên biến trùng với chúng. Nhóm này bao gồm <code>match</code>, <code>case</code> (Python 3.10) và <code>type</code> (Python 3.12, định nghĩa bí danh kiểu), dù không bao gồm <code>async</code> và <code>await</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa từ dành riêng mềm type và match trong Python',
          code: `# 'type' được dùng làm tên biến hợp lệ ở ngoài câu lệnh alias
type = 'số nguyên'
print("Biến type:", type)

# 'type' trở thành từ khóa mềm khi dùng trong câu lệnh type alias (PEP 695)
type ToaDo = tuple[float, float]
diem: ToaDo = (10.5, 20.0)
print("Điểm tọa độ:", diem)`,
          output: `Biến type: số nguyên
Điểm tọa độ: (10.5, 20.0)`,
          annotations: [
            { line: 2, text: 'type vẫn dùng làm biến bình thường vì nó là soft keyword.' },
            { line: 6, text: 'Khi đứng đầu câu lệnh type alias, type đóng vai trò từ khóa mềm định nghĩa kiểu.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tra cứu nhanh danh sách từ khóa trong Python',
        content: 'Bạn luôn có thể kiểm tra danh sách toàn bộ từ khóa dành riêng cứng của phiên bản Python hiện tại trong REPL bằng cách: <code>import keyword; print(keyword.kwlist)</code>. Đối với từ khóa mềm, hãy tra cứu qua: <code>keyword.softkwlist</code>.'
      }
    ],
    pitfalls: [
      {
        title: 'Ghi đè hàm print dựng sẵn bằng biến cùng tên',
        content: 'Vì <code>print</code> là hàm dựng sẵn (built-in) chứ không phải từ dành riêng cứng, bạn có thể vô tình viết <code>print = 100</code>. Khi đó bạn sẽ làm mất khả năng in dữ liệu và gây ra lỗi <code>TypeError: \'int\' object is not callable</code> khi gọi <code>print(...)</code> ở các dòng sau!'
      }
    ],
    deepDive: {
      title: 'PEP 634 & PEP 695: Sự xuất hiện của Soft Keywords',
      content: '<p>Để duy trì tính tương thích ngược tuyệt đối (backward compatibility), Python Core Developers không muốn biến <code>match</code>, <code>case</code> hoặc <code>type</code> thành từ khóa cứng vì hàng triệu dòng mã cũ trên thế giới đã đặt biến mang tên đó. Giải pháp của trình phân tích cú pháp PEG (từ Python 3.9) là phân tích ngữ cảnh: chỉ xem chúng là từ khóa khi chúng đứng ở vị trí cú pháp phù hợp.</p>'
    }
  },

  exercises: [
    {
      title: 'Phân loại các câu lệnh theo nhóm chức năng',
      level: 'Dễ',
      problem: 'Trong Bảng 10-1, hãy phân loại 6 câu lệnh sau vào 3 nhóm (Điều khiển luồng, Định nghĩa đối tượng, Quản lý không gian tên): <code>if</code>, <code>class</code>, <code>global</code>, <code>for</code>, <code>def</code>, <code>nonlocal</code>.',
      hint: 'Hãy nhớ lại mục đích chính của từng lệnh: kiểm soát thứ tự thực thi, tạo hàm/lớp, hay khai báo phạm vi biến LEGB.',
      solutionCode: `# Phân loại theo nhóm:
nhom_dieu_khien = ['if', 'for']        # Điều khiển rẽ nhánh và lặp
nhom_dinh_nghia = ['def', 'class']     # Tạo đối tượng hàm và lớp
nhom_khong_gian = ['global', 'nonlocal'] # Quản lý scope biến

print("1. Điều khiển luồng:", nhom_dieu_khien)
print("2. Định nghĩa đối tượng:", nhom_dinh_nghia)
print("3. Quản lý không gian tên:", nhom_khong_gian)`,
      solutionOutput: `1. Điều khiển luồng: ['if', 'for']
2. Định nghĩa đối tượng: ['def', 'class']
3. Quản lý không gian tên: ['global', 'nonlocal']`,
      explanation: 'Sự phân chia này giúp người học hệ thống hóa Bảng 10-1 thành các công cụ tương ứng với từng giai đoạn phát triển chương trình.'
    },
    {
      title: 'Kiểm chứng từ khóa cứng vs từ khóa mềm trong thư viện keyword',
      level: 'Vừa',
      problem: 'Viết đoạn code Python sử dụng module <code>keyword</code> để kiểm tra xem <code>for</code>, <code>type</code> và <code>match</code> thuộc loại từ khóa nào (cứng hay mềm)?',
      hint: 'Sử dụng <code>keyword.iskeyword()</code> và <code>keyword.issoftkeyword()</code>.',
      solutionCode: `import keyword

cac_tu = ['for', 'type', 'match', 'print']

for tu in cac_tu:
    la_cung = keyword.iskeyword(tu)
    la_mem = keyword.issoftkeyword(tu)
    print(f"Từ '{tu}': Cứng = {la_cung}, Mềm = {la_mem}")`,
      solutionOutput: `Từ 'for': Cứng = True, Mềm = False
Từ 'type': Cứng = False, Mềm = True
Từ 'match': Cứng = False, Mềm = True
Từ 'print': Cứng = False, Mềm = False`,
      explanation: 'Kết quả kiểm chứng hoàn toàn khớp với lý thuyết: <code>for</code> là từ khóa cứng, <code>type</code> và <code>match</code> là từ khóa mềm, còn <code>print</code> chỉ là hàm dựng sẵn thông thường.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về câu lệnh print trong Python 3?',
      options: [
        'print là một từ khóa dành riêng cứng giống như if và for.',
        'print là một câu lệnh phức hợp bắt buộc phải có dấu hai chấm ở cuối.',
        'print là một lời gọi hàm dựng sẵn thường được thực thi như một câu lệnh biểu thức.',
        'print là một toán tử số học đặc biệt dùng để kết nối với màn hình console.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python 3, print thực chất là một lời gọi hàm dựng sẵn (built-in function), thường chạy như một expression statement đứng riêng trên một dòng.'
    },
    {
      question: 'Đặc điểm then chốt của từ dành riêng "mềm" (soft reserved words như match, case, type) là gì?',
      options: [
        'Chúng chỉ được coi là từ khóa khi nằm trong câu lệnh mà chúng trực thuộc; ngoài ra vẫn có thể đặt làm tên biến.',
        'Chúng sẽ bị xóa bỏ khỏi Python ở các phiên bản tiếp theo.',
        'Chúng chỉ có thể được sử dụng bên trong các hàm bất đồng bộ async.',
        'Chúng bắt buộc phải viết hoa toàn bộ ký tự khi viết mã nguồn.'
      ],
      correctIndex: 0,
      explanation: 'Từ khóa mềm chỉ có hiệu lực đặc biệt trong ngữ cảnh câu lệnh tương ứng. Ở những nơi khác trong chương trình, lập trình viên vẫn có thể sử dụng chúng làm tên định danh thông thường.'
    },
    {
      question: 'Theo lộ trình của cuốn sách, những câu lệnh nào sau đây sẽ được khám phá chi tiết ngay trong Phần III?',
      options: [
        'def, return, yield',
        'class, inheritance, super',
        'import, from, as',
        'Phép gán, print, if/elif/else, while, for, pass, break, continue'
      ],
      correctIndex: 3,
      explanation: 'Phần III xử lý các câu lệnh thủ tục cơ bản từ phép gán, biểu thức, print cho tới break và continue. Các câu lệnh lớn hơn (hàm, lớp, module, ngoại lệ) thuộc về các phần IV đến VII.'
    }
  ],

  summary: [
    'Bảng 10-1 bao quát 26 câu lệnh và biểu thức câu lệnh nền tảng cấu thành logic thủ tục trong Python.',
    'Phần III tập trung vào các câu lệnh thủ tục cơ bản: gán, print, rẽ nhánh if/else, vòng lặp while/for, break và continue.',
    'print trong Python 3 là một hàm dựng sẵn chạy như một câu lệnh biểu thức, không phải từ khóa cứng.',
    'Python hiện đại phân biệt từ khóa cứng (không thể đặt làm biến) và từ khóa mềm như match, case, type (vẫn có thể dùng làm biến ngoài ngữ cảnh của lệnh).'
  ]
};
