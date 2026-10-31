export default {
  id: 'lp-c11-05',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.5',
  title: 'Biểu thức Gán có tên (Toán tử Walrus :=) — Cú pháp, Ứng dụng và Thực hành Tối ưu',
  subtitle: 'Lịch sử PEP 572, cơ chế vừa gán vừa trả về giá trị, các giới hạn cú pháp, tối ưu hóa vòng lặp đọc file và triết lý "không dùng búa tạ đóng mọi cây đinh"',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu bối cảnh lịch sử và nguyên lý thiết kế của biểu thức gán có tên (named assignment expression — toán tử walrus :=) được đưa vào từ Python 3.8 theo PEP 572.',
    'Nắm vững cơ chế kép của toán tử :=: vừa gán giá trị cho một tên biến, vừa trả về chính kết quả đó làm giá trị của toàn bộ biểu thức.',
    'Nhận diện các giới hạn cú pháp khắt khe: chỉ chấp nhận một tên biến đơn lẻ ở vế trái (cấm chỉ mục, lát cắt, thuộc tính, hoặc gán mở rộng).',
    'Thành thạo ứng dụng toán tử walrus trong vòng lặp while đọc file/dòng dữ liệu, quy tắc bắt buộc dùng ngoặc đơn quanh phép so sánh, và tránh bẫy lạm dụng làm rối mã nguồn.'
  ],

  intuition: {
    title: 'Người Đưa Thư Vừa Bỏ Thư Vào Hòm Vừa Báo Tin',
    metaphor: 'Một câu lệnh gán thông thường (=) giống như một người đưa thư chỉ âm thầm nhét phong bì vào hòm thư bên trái rồi quay gót bước đi—bạn không thể biết bên trong có gì nếu không đích thân mở hòm ra kiểm tra. Ngược lại, toán tử walrus (:=) giống như một người đưa thư vừa nhét phong bì vào hòm thư, vừa nhanh nhẹn giơ một bản sao của lá thư đó lên trước mặt bạn và reo to nội dung cho bạn kiểm tra ngay tại cửa! Nhờ hành động "kép" này, bạn có thể kiểm tra xem lá thư có hợp lệ không (trong tiêu đề while/if) mà không cần phải chạy ra mở hòm thư thêm một lần nữa.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ HOẠT ĐỘNG KÉP CỦA TOÁN TỬ HẢI MÃ (name := value)</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:#8b5cf6;">HÀNH ĐỘNG 1: GÁN GIÁ TRỊ</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Gán kết quả của <code>value</code><br>cho tên biến <code>name</code></div>
          </div>
          <div style="font-size:1.6rem;color:var(--accent-primary);font-weight:700;">&</div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:#10b981;">HÀNH ĐỘNG 2: TRẢ VỀ GIÁ TRỊ</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Trả về chính giá trị đó<br>làm kết quả của biểu thức</div>
          </div>
        </div>
        <div style="padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--warning);border-radius:4px;font-size:0.8rem;color:var(--text-secondary);">
          <strong>Cảnh báo độ ưu tiên:</strong> Toán tử <code>!=</code> hay <code>==</code> liên kết chặt hơn <code>:=</code>. Luôn bọc ngoặc đơn <code>(line := stream.read()) != ''</code>!
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Lịch Sử PEP 572 & Cơ Chế Vừa Gán Vừa Trả Về Giá Trị',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 19–20 / 38</strong>.</p>
          </div>
        </div>

        <p>Trong phần lớn ba thập kỷ tồn tại của Python, ngôn ngữ này đã kiên quyết chống lại việc mô phỏng thành ngữ "phép gán dưới dạng biểu thức" của ngôn ngữ C, với lý do rằng nó quá tinh vi, dễ mắc lỗi và tạo ra những đoạn mã khó đọc. Trong C, người mới học rất hay vô tình viết <code>if (x = 0)</code> (phép gán luôn trả về 0 khiến điều kiện luôn Sai) khi thực sự muốn viết <code>if (x == 0)</code>.</p>
        <p>Mặc dù những lo ngại này vẫn còn hiệu lực, <strong>Python 3.8 đã đưa vào một biến thể có kiểm soát</strong> theo đề xuất <em>PEP 572</em>, được gọi là <strong>phép gán có tên (named assignment)</strong> với toán tử <code>:=</code> (thường gọi là <em>toán tử hải mã — walrus operator</em> vì trông giống đôi mắt và cặp ngà của con hải mã).</p>

        <h3>Cơ chế hoạt động</h3>
        <p>Biểu thức <code>name := value</code> trước tiên sẽ định giá trị biểu thức <code>value</code> ở bên phải, rồi sau đó đồng thời thực hiện hai việc:</p>
        <ol>
          <li><strong>Gán kết quả</strong> cho tên biến <code>name</code> được chỉ định ở bên trái.</li>
          <li><strong>Trả về chính kết quả đó</strong> làm giá trị của toàn bộ biểu thức <code>:=</code> để sử dụng tiếp trong cấu trúc bao quanh.</li>
        </ol>

        <p>Ví dụ đơn giản nhất minh họa cho điều này:</p>
        <pre><code>>>> a = 'hack' * (b := 2)
>>> a
'hackhack'
>>> b
2</code></pre>

        <h3>Các giới hạn cú pháp khắt khe</h3>
        <p>Toán tử <code>:=</code> bị giới hạn chặt chẽ hơn nhiều so với câu lệnh gán thông thường <code>=</code> để ngăn ngừa mã nguồn bị lạm dụng:</p>
        <ul>
          <li><strong>Chỉ cho phép một tên biến đơn lẻ ở bên trái:</strong> Không hỗ trợ gán chỉ mục <code>(python[0] := 3.12)</code> → <code>SyntaxError</code>.</li>
          <li><strong>Không hỗ trợ gán thuộc tính:</strong> <code>(python.attr := 3.12)</code> → <code>SyntaxError</code>.</li>
          <li><strong>Không hỗ trợ gán giải nén dãy tuần tự:</strong> <code>(python, Python := 3.12, 3.13)</code> → <code>TypeError</code>.</li>
          <li><strong>Không hỗ trợ phép gán tăng cường:</strong> Hoàn toàn không có cú pháp <code>:+=</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khảo sát toán tử walrus := và các trường hợp bị cấm cú pháp',
          code: `# 1. Biểu thức walrus cơ bản
thong_bao = "Python " * (so_lan := 3)
print("Kết quả chuỗi:", thong_bao)
print("Biến so_lan được gán:", so_lan)

# 2. Tính toán biểu thức có chứa walrus
gia_tri = (x := 10) + 5
print("Biểu thức gia_tri:", gia_tri, "| x =", x)

# 3. Lỗi khi cố tình dùng chỉ mục ở vế trái :=
try:
    exec("(ds[0] := 100)", {'ds': [1, 2]})
except SyntaxError as err:
    print("Bắt lỗi chỉ mục:", err)

# 4. Lỗi khi cố tình dùng thuộc tính ở vế trái :=
class Obj: pass
o = Obj()
try:
    exec("(o.attr := 'loi')", {'o': o})
except SyntaxError as err:
    print("Bắt lỗi thuộc tính:", err)`,
          output: `Kết quả chuỗi: Python Python Python 
Biến so_lan được gán: 3
Biểu thức gia_tri: 15 | x = 10
Bắt lỗi chỉ mục: cannot use assignment expressions with subscript
Bắt lỗi thuộc tính: cannot use assignment expressions with attribute`,
          annotations: [
            { line: 2, text: 'Biến so_lan vừa nhận giá trị 3, vừa trả về số 3 để nhân bản chuỗi.' },
            { line: 7, text: 'x := 10 gán 10 cho x, sau đó trả về 10 để cộng thêm 5.' },
            { line: 14, text: 'CPython cấm triệt để việc dùng chỉ mục subscript với :=.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Khi Nào Nên Sử Dụng: Vòng Lặp Đọc File & Bắt Buộc Dấu Ngoặc Đơn',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 20–21 / 38</strong>.</p>
          </div>
        </div>

        <p>Mặc dù các ngữ cảnh thực sự hữu ích cho <code>:=</code> bị hạn chế, trường hợp sử dụng kinh điển và phổ biến nhất của nó xuất hiện kết hợp với các câu lệnh <code>if</code> và đặc biệt là vòng lặp <code>while</code> khi đọc dòng dữ liệu từ file hoặc luồng mạng.</p>

        <h3>Cách truyền thống (khi chưa có :=)</h3>
        <p>Trước khi có <code>:=</code>, để đọc từng dòng cho đến hết file (EOF trả về chuỗi rỗng có giá trị logic là <code>False</code>), lập trình viên phải chọn một trong hai cách:</p>
        <pre><code># Cách 1: Lặp lại lệnh readline 2 lần (dư thừa mã)
line = file.readline()
while line:
    print(line)
    line = file.readline()

# Cách 2: Vòng lặp vô hạn kết hợp kiểm tra thoát (while True)
while True:
    line = file.readline()
    if not line: break
    print(line)</code></pre>

        <h3>Cách hiện đại với toán tử Walrus :=</h3>
        <p>Với <code>:=</code>, chúng ta có thể cô đọng việc tìm nạp dữ liệu, phép gán biến và phép kiểm tra điều kiện thành một dòng duy nhất ngay trong tiêu đề vòng lặp:</p>
        <pre><code>while line := file.readline():
    print(line)</code></pre>
        <p>Vì <code>:=</code> trả về kết quả của lệnh gọi <code>readline</code>, giá trị logic của nó được kiểm tra ngay trong tiêu đề. Và vì nó đồng thời gán kết quả cho <code>line</code>, biến đó có sẵn ngay trong thân vòng lặp.</p>

        <div class="callout-box callout-warning" style="border-left:4px solid var(--warning);margin:16px 0;">
          <div class="callout-header">
            <span>⚠️</span>
            <span><strong>Quy tắc sinh tử: Bắt buộc dùng ngoặc đơn khi kết hợp phép so sánh</strong></span>
          </div>
          <div class="callout-body">
            <p>Toán tử so sánh (như <code>!=</code>, <code>==</code>) có <strong>độ ưu tiên cao hơn</strong> toán tử <code>:=</code>. Do đó, nếu bạn viết:</p>
            <pre><code># SAI LẦM NGUY HIỂM:
while line := file.readline() != '':  # line sẽ nhận kết quả Boolean True/False!</code></pre>
            <p>Python sẽ thực hiện phép so sánh <code>readline() != ''</code> trước, rồi gán giá trị <code>True/False</code> đó cho biến <code>line</code> thay vì gán nội dung chuỗi! Bạn <strong>bắt buộc phải bọc ngoặc đơn</strong> quanh biểu thức walrus:</p>
            <pre><code># ĐÚNG CHUẨN:
while (line := file.readline()) != '':
    print(line)</code></pre>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh vòng lặp đọc dữ liệu stream giữa while True và toán tử walrus :=',
          code: `# Mô phỏng một nguồn dữ liệu trả về các phần tử và kết thúc bằng chuỗi rỗng
class LuongDuLieu:
    def __init__(self, data):
        self.data = list(data)
    def readline(self):
        return self.data.pop(0) if self.data else ''

# 1. Cách dùng while True truyền thống
luong1 = LuongDuLieu(['Dòng 1\\n', 'Dòng 2\\n', 'Dòng 3\\n'])
print("--- 1. Đọc bằng while True: ---")
while True:
    dong = luong1.readline()
    if not dong: break
    print(" ", dong.strip())

# 2. Cách dùng toán tử walrus := hiện đại
luong2 = LuongDuLieu(['Gói A', 'Gói B', 'Gói C'])
print("\\n--- 2. Đọc bằng toán tử walrus := ---")
while goi := luong2.readline():
    print(" ", goi)

# 3. Minh họa bọc ngoặc đơn khi so sánh với giá trị đặc biệt
luong3 = LuongDuLieu(['START', 'RUN', 'STOP', 'IDLE'])
print("\\n--- 3. Walrus có ngoặc đơn so sánh dừng khi gặp 'STOP': ---")
while (lenh := luong3.readline()) != 'STOP':
    print("  Thực thi lệnh:", lenh)`,
          output: `--- 1. Đọc bằng while True: ---
  Dòng 1
  Dòng 2
  Dòng 3

--- 2. Đọc bằng toán tử walrus := ---
  Gói A
  Gói B
  Gói C

--- 3. Walrus có ngoặc đơn so sánh dừng khi gặp 'STOP': ---
  Thực thi lệnh: START
  Thực thi lệnh: RUN`,
          annotations: [
            { line: 18, text: 'goi := luong2.readline() vừa đọc dữ liệu, vừa kiểm tra tính truthiness, vừa gán cho goi.' },
            { line: 25, text: 'Bắt buộc cặp ngoặc đơn quanh (lenh := luong3.readline()) trước khi so sánh != \'STOP\'.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ứng Dụng Trong Comprehension, f-string & Triết Lý "Không Dùng Búa Tạ"',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 21–22 / 38</strong>.</p>
          </div>
        </div>

        <p>Bên cạnh việc đọc file, <code>:=</code> có thể được tận dụng để tái sử dụng kết quả tính toán tốn kém trong các biểu thức hằng trị (<em>literals</em>) hoặc bắt giữ kết quả cuối cùng trong <em>comprehension</em>:</p>

        <pre><code>>>> [val := 'Py!', val * 2, val * 3]
['Py!', 'Py!Py!', 'Py!Py!Py!']

>>> list(pow := 2 ** num for num in [2, 4, 8])
[4, 16, 256]
>>> pow # Biến pow lưu giữ giá trị của lần lặp cuối cùng!
256</code></pre>

        <p>Thậm chí, toán tử walrus có thể được nhúng bên trong f-string hoặc tự lồng vào chính nó (với các cặp ngoặc đơn bắt buộc):</p>
        <pre><code>>>> (x := (y := (z := 1) + 1) + 1)
3
>>> x, y, z
(3, 2, 1)</code></pre>

        <div class="callout-box callout-tip" style="border-left:4px solid #8b5cf6;margin:16px 0;">
          <div class="callout-header">
            <span>🔨</span>
            <span><strong>Triết lý thiết kế của Mark Lutz: Đừng dùng búa tạ để đóng mọi cây đinh!</strong></span>
          </div>
          <div class="callout-body">
            <p>Hãy nhớ rằng một biểu thức <code>:=</code> lồng sâu và phức tạp có thể trông có vẻ thông minh, nhưng sẽ <strong>khó đọc hơn nhiều</strong>—và thậm chí rất khó phát hiện lỗi—so với việc tách thành một hoặc hai phép gán độc lập đơn giản. Vì lợi ích của người đọc mã (bao gồm cả chính bạn trong tương lai!), hãy sử dụng <code>:=</code> một cách <strong>tiết chế và khôn ngoan</strong>. Sự rõ ràng, tường minh của mã nguồn luôn xứng đáng với một hoặc hai dòng mã thêm vào.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Tái sử dụng kết quả tính toán trong Comprehension và Literal',
          code: `# 1. Tái sử dụng giá trị đắt đỏ trong danh sách literal
kho = [gia_goc := 150.0, gia_goc * 1.1, gia_goc * 1.2]
print("Bảng giá:", kho)
print("Biến gia_goc lưu giá trị:", gia_goc)

# 2. Bắt giữ trạng thái trong generator expression
ket_qua = list(tam := n ** 3 for n in [1, 2, 3, 4, 5])
print("Lập phương:", ket_qua)
print("Giá trị cuối cùng của biến tam:", tam)

# 3. Lồng walrus tự thân (minh họa cú pháp)
(a := (b := 10) * 2)
print(f"a = {a}, b = {b}")`,
          output: `Bảng giá: [150.0, 165.0, 180.0]
Biến gia_goc lưu giá trị: 150.0
Lập phương: [1, 8, 27, 64, 125]
Giá trị cuối cùng của biến tam: 125
a = 20, b = 10`,
          annotations: [
            { line: 2, text: 'gia_goc := 150.0 gán biến ngay trong phần tử đầu, các phần tử sau dùng lại.' },
            { line: 7, text: 'Biến tam rò rỉ ra ngoài phạm vi generator và lưu giá trị bước lặp cuối 5^3 = 125.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    warnings: [
      {
        title: 'Lời cảnh báo về khả năng đọc hiểu (Readability)',
        content: 'Python tuân thủ phương châm "Explicit is better than implicit" (Tường minh tốt hơn ngầm định). Đừng cố nhét mọi câu lệnh gán vào biểu thức walrus chỉ để giảm bớt một dòng code nếu điều đó làm đồng nghiệp của bạn phải nhíu mày suy nghĩ.'
      }
    ]
  },

  exercises: [
    {
      title: 'Lọc và chuẩn hóa dữ liệu đầu vào bằng toán tử Walrus',
      level: 'Trung bình',
      problem: 'Cho một danh sách các chuỗi văn bản thô: raw_inputs = ["  python ", "", "   ", "javascript  ", "  go   "]. Hãy viết một list comprehension sử dụng toán tử walrus := để vừa cắt khoảng trắng dư thừa (strip) vừa lọc bỏ các chuỗi rỗng mà không phải gọi hàm strip() hai lần.',
      hint: 'Trong phần if của list comprehension, viết if (clean := s.strip()): để vừa lưu chuỗi sạch vào clean vừa kiểm tra truthiness.',
      solutionCode: `raw_inputs = ["  python ", "", "   ", "javascript  ", "  go   "]

# Dùng walrus để chỉ gọi strip() một lần duy nhất
clean_inputs = [clean for s in raw_inputs if (clean := s.strip())]

print("Kết quả làm sạch:", clean_inputs)`,
      solutionOutput: `Kết quả làm sạch: ['python', 'javascript', 'go']`,
      explanation: 'Biểu thức (clean := s.strip()) trong mệnh đề if vừa gán chuỗi đã strip cho biến clean, vừa kiểm tra truthiness (chuỗi rỗng sẽ là False). Mệnh đề biểu thức đầu chỉ việc dùng lại biến clean mà không cần gọi lại strip().'
    }
  ],

  quiz: [
    {
      question: 'Toán tử walrus := được chính thức đưa vào phiên bản Python nào theo PEP 572?',
      options: [
        'Python 3.5',
        'Python 3.6',
        'Python 3.8',
        'Python 3.10'
      ],
      correctIndex: 2,
      explanation: 'Toán tử walrus := (named assignment expression) được chính thức đưa vào ngôn ngữ từ phiên bản Python 3.8.'
    },
    {
      question: 'Vì sao trong câu lệnh while (line := file.readline()) != \'\': bắt buộc phải có cặp dấu ngoặc đơn quanh phép gán?',
      options: [
        'Vì cú pháp while trong Python bắt buộc điều kiện phải nằm trong ngoặc đơn.',
        'Vì toán tử so sánh != có độ ưu tiên cao hơn toán tử :=; nếu không có ngoặc, biến line sẽ nhận giá trị Boolean True/False thay vì nội dung chuỗi.',
        'Vì dấu ngoặc đơn giúp Python tự động đóng file sau khi đọc.',
        'Vì toán tử := không thể đứng ở đầu dòng.'
      ],
      correctIndex: 1,
      explanation: 'Toán tử so sánh != liên kết chặt hơn :=. Cặp ngoặc đơn ép buộc phép gán line := file.readline() thực hiện trước, sau đó mới lấy kết quả đem so sánh với \' \'.'
    },
    {
      question: 'Cú pháp nào sau đây là KHÔNG HỢP LỆ với toán tử :=?',
      options: [
        '(x := 10) + 1',
        'if x := len([1, 2, 3]): pass',
        '(ds[0] := 99)',
        'print(val := "test")'
      ],
      correctIndex: 2,
      explanation: 'Toán tử := chỉ cho phép một tên biến đơn lẻ ở vế trái. Việc sử dụng mục tiêu chỉ mục ds[0] := 99 sẽ gây ra ngoại lệ SyntaxError.'
    }
  ],

  summary: [
    'Toán tử walrus := (Python 3.8+) cho phép viết phép gán dưới dạng biểu thức: vừa gán cho biến vừa trả về giá trị.',
    'Chỉ chấp nhận một tên biến đơn lẻ ở vế trái; cấm chỉ mục, lát cắt, thuộc tính đối tượng.',
    'Ứng dụng tối ưu trong vòng lặp while đọc file/stream, tránh lặp lại mã và tránh vòng lặp vô hạn.',
    'Bắt buộc bọc ngoặc đơn khi kết hợp với toán tử so sánh (==, !=); cần dùng tiết chế để bảo vệ tính tường minh của mã nguồn.'
  ]
};
