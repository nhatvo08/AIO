export default {
  id: 'lp-c9-01',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.1',
  title: 'Cú pháp Tuple trong thực tế: Dấu phẩy tạo tuple, Bỏ ngoặc đơn & Phép gán dãy',
  subtitle: 'Khám phá các thao tác thực chiến với Tuple, điểm đặc thù dấu phẩy và ngoặc đơn, phép gán dãy tuần tự viết tắt và quan điểm của tác giả về dấu ngoặc đơn',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thực hành thành thạo các thao tác dãy tuần tự trên Tuple: ghép nối (+), nhân bản (*), đánh chỉ mục, cắt lát và giải nén iterable với toán tử *.',
    'Nắm vững quy tắc cú pháp đặc thù: vì sao tuple một phần tử bắt buộc phải có dấu phẩy đi kèm (40,) để phân biệt với biểu thức số học.',
    'Hiểu rõ cơ chế lược bỏ dấu ngoặc đơn của Python trong các ngữ cảnh không nhập nhằng và cách thức hoạt động của phép gán dãy tuần tự (sequence assignment).',
    'Xác định chính xác các trường hợp bắt buộc phải có dấu ngoặc đơn bao bọc (lời gọi hàm, nhúng trong literal lớn) và cạm bẫy cú pháp khi dùng biểu thức lambda.',
    'Tiếp thu quan điểm thực tiễn của Mark Lutz: tạo thói quen luôn bao bọc tuple trong dấu ngoặc đơn để mã nguồn rõ ràng và tránh lỗi cú pháp bất ngờ.'
  ],

  intuition: {
    title: 'Chiếc phong bì và Tem niêm phong dấu phẩy',
    metaphor: 'Trong ngữ pháp Python, dấu ngoặc đơn `()` thường mang hai nhiệm vụ: bao bọc các biểu thức số học ưu tiên (như `(2 + 3) * 4`) và đóng gói tuple. Vậy làm sao Python biết khi nào bạn đang viết một biểu thức và khi nào bạn muốn tạo một tuple một phần tử? Hãy hình dung dấu ngoặc đơn giống như chiếc phong bì, còn dấu phẩy `,` chính là chiếc tem niêm phong. Nếu bạn chỉ bỏ một tờ giấy ghi số 40 vào phong bì mà không dán tem `(40)`, Python sẽ mở phong bì ra và chỉ thấy số nguyên 40. Nhưng chỉ cần bạn dán chiếc tem dấu phẩy vào `(40,)`, Python lập tức công nhận đây là một bưu phẩm tuple chính thức! Trên thực tế, đối với các chuyên gia ngữ pháp ngôn ngữ, chính dấu phẩy mới là thứ tạo nên tuple, còn chiếc phong bì ngoặc đơn nhiều khi chỉ là lớp vỏ bọc bảo vệ.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN BIỆT CÚ PHÁP: DẤU NGOẶC ĐƠN BIỂU THỨC vs TUPLE 1 PHẦN TỬ</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #ef4444;border-radius:8px;">
            <div style="font-weight:700;color:#ef4444;margin-bottom:6px;">❌ Biểu thức ngoặc đơn thông thường</div>
            <div style="padding:8px;background:rgba(239,68,68,0.1);border-radius:4px;margin-bottom:6px;">
              <code>x = (40)</code> ➔ <strong>x = 40 (kiểu int)</strong>
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Dấu ngoặc đơn chỉ đóng vai trò ưu tiên phép tính, không tạo ra tuple!</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;">
            <div style="font-weight:700;color:#10b981;margin-bottom:6px;">✅ Tuple một phần tử (Bắt buộc dấu phẩy)</div>
            <div style="padding:8px;background:rgba(16,185,129,0.1);border-radius:4px;margin-bottom:6px;">
              <code>y = (40,)</code> ➔ <strong>y = (40,) (kiểu tuple)</strong>
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Dấu phẩy báo hiệu cho Python biết đây là một cấu trúc bộ giá trị!</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tuple trong Thực Tế: Thao Tác Dãy Tuần Tự & Giải Nén Iterable',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 3 / 48 – Trang 4 / 48</strong>.</p>
          </div>
        </div>

        <p>Như đã thấy trong Bảng 9-1, tuple không sở hữu các phương thức sửa đổi nội dung như <code>append</code> của list. Tuy nhiên, chúng hỗ trợ đầy đủ các thao tác dãy tuần tự tiêu chuẩn mà bạn đã làm quen với chuỗi và list:</p>
        <ul>
          <li><strong>Ghép nối (<code>+</code>):</strong> Kết hợp các phần tử của hai hay nhiều tuple để tạo ra một đối tượng tuple hoàn toàn mới.</li>
          <li><strong>Lặp lại (<code>*</code>):</strong> Nhân bản các tham chiếu phần tử của tuple lên N lần.</li>
          <li><strong>Đánh chỉ mục (Indexing) và Cắt lát (Slicing):</strong> Truy xuất phần tử theo vị trí bù (offset) và trích xuất dãy con.</li>
          <li><strong>Giải nén Iterable (Unpacking) với dấu <code>*</code>:</strong> Kể từ Python 3.5, bạn có thể giải nén bất kỳ iterable nào vào bên trong một hằng số bằng chữ của tuple.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Phiên tương tác REPL: Các thao tác dãy tuần tự và giải nén với Tuple',
          code: `# Khởi động với các thao tác dãy tuần tự cơ bản
t1 = (1, 2) + (3, 4)           # Ghép nối hai tuple
print("Ghép nối:", t1)

t2 = (1, 2) * 4                # Lặp lại tuple 4 lần
print("Lặp lại:", t2)

T = (1, 2, 3, 4)
print("Chỉ mục [0] và lát cắt [1:3]:", (T[0], T[1:3]))
print("So sánh độ lớn và bằng nhau:", (T == (1, 2, 3, 4), T > (1, 2, 3, 3), T > (1, 2, 3)))

# Giải nén iterable với toán tử *
L = ['code', 'hack']
packed = (*L, 1, 2, *(3, 4))   # Giải nén list L và tuple (3, 4) vào tuple mới
print("Kết quả giải nén *:", packed)`,
          output: `Ghép nối: (1, 2, 3, 4)
Lặp lại: (1, 2, 1, 2, 1, 2, 1, 2)
Chỉ mục [0] và lát cắt [1:3]: (1, (2, 3))
So sánh độ lớn và bằng nhau: (True, True, True)
Kết quả giải nén *: ('code', 'hack', 1, 2, 3, 4)`,
          annotations: [
            { line: 2, text: 'Phép ghép nối + luôn sinh ra một tuple mới trong bộ nhớ.' },
            { line: 5, text: 'Phép nhân * tạo ra tuple gồm các tham chiếu lặp lại.' },
            { line: 8, text: 'Lát cắt T[1:3] trả về một tuple con (2, 3).' },
            { line: 13, text: 'Cú pháp *L giải nén từng phần tử từ iterable vào literal tuple.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Điểm Đặc Thù Cú Pháp: Dấu Phẩy và Dấu Ngoặc Đơn',
      content: `
        <p>Vì dấu ngoặc đơn <code>()</code> cũng được sử dụng để bao bọc các biểu thức số học ưu tiên (như đã học trong Chương 5), Python cần một quy tắc cú pháp đặc biệt để nhận diện khi nào một đối tượng đơn lẻ trong dấu ngoặc đơn là một tuple chứ không phải là một biểu thức đơn thuần.</p>

        <p>Quy tắc vàng của Python là: <strong>Nếu bạn muốn tạo một tuple chứa duy nhất một phần tử, bạn bắt buộc phải đặt một dấu phẩy theo sau phần tử đó, ngay trước dấu ngoặc đơn đóng</strong>:</p>
      `,
      codeExamples: [
        {
          title: 'Phân biệt số nguyên trong ngoặc đơn và tuple một phần tử',
          code: `# Dấu ngoặc đơn thông thường: chỉ là biểu thức ưu tiên tính toán
x = (40)
print("x =", x, "| Kiểu:", type(x).__name__)

# Thêm dấu phẩy trước ngoặc đơn đóng: tạo thành tuple 1 phần tử
y = (40,)
print("y =", y, "| Kiểu:", type(y).__name__)
print("Độ dài của tuple y:", len(y))`,
          output: `x = 40 | Kiểu: int
y = (40,) | Kiểu: tuple
Độ dài của tuple y: 1`,
          annotations: [
            { line: 2, text: 'x là một số nguyên (int), dấu ngoặc đơn bị loại bỏ sau khi tính toán.' },
            { line: 6, text: 'Dấu phẩy sau 40 báo hiệu cho Python tạo đối tượng tuple.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bỏ Qua Dấu Ngoặc Đơn & Phép Gán Dãy Tuần Tự (Sequence Assignment)',
      content: `
        <p>Như một trường hợp đặc biệt, Python cho phép bạn bỏ qua dấu ngoặc đơn mở và đóng của một tuple trong những ngữ cảnh mà việc đó không gây nhập nhằng về mặt cú pháp. Ví dụ, khi bạn liệt kê các giá trị phân tách nhau bằng dấu phẩy trong câu lệnh gán, Python sẽ tự động đóng gói chúng thành một tuple:</p>

        <p>Thủ thuật cú pháp này cũng là cơ chế vận hành bên dưới của <strong>phép gán dãy tuần tự viết tắt (sequence assignment)</strong> — các tên biến ở vế trái được ghép cặp với các giá trị ở vế phải theo vị trí, nhưng thực chất cả hai vế đều là các tuple không có dấu ngoặc đơn:</p>
      `,
      codeExamples: [
        {
          title: 'Tuple không dấu ngoặc đơn và phép gán dãy tuần tự',
          code: `# Khởi tạo tuple không cần ngoặc đơn
tup_no_parens = 1, 2, 3, 4
print("Tuple không ngoặc:", tup_no_parens, "| Kiểu:", type(tup_no_parens).__name__)

# Phép gán dãy tuần tự: cả hai vế đều là tuple không ngoặc đơn
a, b, c = 1, 2, 3
print("Các biến sau khi gán:", a, b, c)
print("Biểu thức (a, b, c) tạo ra tuple:", (a, b, c))`,
          output: `Tuple không ngoặc: (1, 2, 3, 4) | Kiểu: tuple
Các biến sau khi gán: 1 2 3
Biểu thức (a, b, c) tạo ra tuple: (1, 2, 3)`,
          annotations: [
            { line: 2, text: 'Python tự động đóng gói thành tuple và in ra kèm dấu ngoặc đơn.' },
            { line: 6, text: 'Vế phải 1, 2, 3 tạo tuple, sau đó giải nén vào a, b, c ở vế trái.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Khi Nào Dấu Ngoặc Đơn Bắt Buộc? Dấu Phẩy là Toán Tử & Lời Khuyên Của Tác Giả',
      content: `
        <p>Như tác giả Mark Lutz phân tích ở trang 5, trong cộng đồng lập trình Python, có người khuyên bạn hãy luôn sử dụng dấu ngoặc đơn cho mọi tuple, và cũng có người thích phong cách lược bỏ tối đa dấu ngoặc đơn. Tuy nhiên, các vị trí phổ biến nhất mà <strong>dấu ngoặc đơn là BẮT BUỘC</strong> đối với giá trị nguyên bản của tuple bao gồm:</p>

        <ul>
          <li><strong>Bên trong một lời gọi hàm:</strong> Ví dụ <code>func((1, 2))</code> truyền vào một tuple 2 phần tử. Nếu bạn viết <code>func(1, 2)</code>, Python sẽ hiểu là bạn đang truyền 2 đối số riêng biệt vào hàm!</li>
          <li><strong>Nhúng bên trong giá trị nguyên bản của một đối tượng lớn hơn:</strong> Chẳng hạn <code>[(1, 2), (3, 4)]</code> bên trong list hoặc dictionary.</li>
          <li><strong>Bên trong biểu thức lambda:</strong> Bỏ quên dấu ngoặc đơn trong thân hàm lambda có thể khiến dấu phẩy bị hiểu nhầm là kết thúc biểu thức, dẫn đến lỗi cú pháp kỳ quặc.</li>
        </ul>

        <div class="callout-box callout-note">
          <div class="callout-header"><span>⚖️ Góc nhìn chuyên gia câu chữ (Language Lawyers):</span> <span>Dấu phẩy mới là toán tử</span></div>
          <div class="callout-body">
            <p>Đối với các chuyên gia ngữ pháp ngôn ngữ Python, hãy nhớ rằng <strong>dấu phẩy thực chất là một dạng toán tử có độ ưu tiên thấp nhất</strong> trong các ngữ cảnh nó không mang ý nghĩa cú pháp khác. Chính dấu phẩy mới là thứ tạo nên tuple chứ không phải dấu ngoặc đơn! Tuy nhiên, vì độ ưu tiên quá thấp, việc bỏ dấu ngoặc đơn rất dễ dẫn đến lỗi khó nhận biết. Lời khuyên tốt nhất của Mark Lutz dành cho bạn là: <em>Hãy tạo thói quen luôn bao bọc tuple trong cặp dấu ngoặc đơn <code>()</code></em>. Điều này giúp mã nguồn của bạn trở nên tường minh, tự ghi tài liệu và miễn nhiễm với các lỗi ngữ pháp bất ngờ.</p>
          </div>
        </div>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời khuyên thực tiễn: Luôn dùng dấu ngoặc đơn cho Tuple',
        content: 'Mặc dù Python cho phép bỏ dấu ngoặc đơn trong câu lệnh gán, việc luôn viết đầy đủ <code>(1, 2, 3)</code> giúp người đọc mã nguồn lập tức nhận diện đây là một tuple thay vì nhầm lẫn với danh sách tham số hay cú pháp khác.'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy truyền Tuple vào hàm func(T)',
        content: 'Khi truyền một tuple vào hàm, nếu bạn viết <code>print(1, 2, 3)</code>, bạn đang truyền 3 đối số độc lập. Để truyền đúng một tuple duy nhất, bạn bắt buộc phải dùng thêm cặp ngoặc đơn thứ hai: <code>print((1, 2, 3))</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo tuple 1 phần tử và hoán đổi giá trị hai biến',
      level: 'Dễ',
      problem: 'Hãy viết đoạn mã Python: (1) Khởi tạo biến single_tup chứa duy nhất một chuỗi \'Python\' dưới dạng tuple; kiểm tra kiểu của nó. (2) Khởi tạo x = 10, y = 20; dùng phép gán tuple để hoán đổi giá trị của x và y mà không dùng biến tạm thời thứ ba.',
      hint: 'Dùng dấu phẩy sau chuỗi: (\'Python\',). Hoán đổi bằng x, y = y, x.',
      solutionCode: `# 1. Tuple một phần tử
single_tup = ('Python',)
print("single_tup:", single_tup, "| type:", type(single_tup).__name__)

# 2. Hoán đổi hai biến bằng tuple packing/unpacking
x = 10
y = 20
print(f"Trước khi hoán đổi: x = {x}, y = {y}")

x, y = y, x
print(f"Sau khi hoán đổi: x = {x}, y = {y}")`,
      solutionOutput: `single_tup: ('Python',) | type: tuple
Trước khi hoán đổi: x = 10, y = 20
Sau khi hoán đổi: x = 20, y = 10`,
      explanation: 'Phép gán x, y = y, x trước tiên đóng gói (y, x) thành một tuple tạm thời ở vế phải, sau đó giải nén theo vị trí vào hai biến x và y ở vế trái.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn chạy biểu thức a = (100) trong Python, biến a sẽ có kiểu dữ liệu là gì?',
      options: [
        'tuple có độ dài 1',
        'int (số nguyên)',
        'list có 1 phần tử',
        'Báo lỗi cú pháp SyntaxError'
      ],
      correctIndex: 1,
      explanation: 'Biểu thức (100) chỉ là số nguyên 100 đặt trong dấu ngoặc đơn ưu tiên phép tính. Muốn thành tuple, bắt buộc phải viết (100,).'
    },
    {
      question: 'Trong tình huống nào sau đây, dấu ngoặc đơn của tuple là BẮT BUỘC?',
      options: [
        'Khi gán một tuple gồm nhiều phần tử cho một biến duy nhất: T = 1, 2, 3',
        'Khi truyền một literal tuple gồm nhiều phần tử làm một đối số duy nhất vào lời gọi hàm: foo((1, 2))',
        'Khi duyệt vòng lặp for: for x in 1, 2, 3:',
        'Khi thực hiện phép gán dãy tuần tự: a, b = 1, 2'
      ],
      correctIndex: 1,
      explanation: 'Nếu không có dấu ngoặc đơn trong foo((1, 2)), Python sẽ hiểu dấu phẩy là phân tách các đối số của hàm, tương đương truyền hai đối số riêng biệt foo(1, 2).'
    }
  ],

  summary: [
    'Tuple hỗ trợ đầy đủ các thao tác dãy tuần tự thông thường: ghép nối (+), lặp lại (*), chỉ mục, lát cắt và giải nén iterable với toán tử *.',
    'Tuple một phần tử bắt buộc phải có dấu phẩy ở cuối: (40,) là tuple, trong khi (40) chỉ là số nguyên.',
    'Python cho phép bỏ dấu ngoặc đơn trong các ngữ cảnh không nhập nhằng, tạo tiền đề cho cú pháp phép gán dãy tuần tự thanh lịch (a, b = 1, 2).',
    'Dấu phẩy thực chất là toán tử có độ ưu tiên thấp nhất tạo nên tuple; dấu ngoặc đơn là bắt buộc khi truyền tuple vào lời gọi hàm hoặc lồng trong các đối tượng khác.',
    'Thực hành tốt nhất: Luôn viết rõ dấu ngoặc đơn cho mọi tuple để mã nguồn tường minh và tránh bẫy cú pháp.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.2), chúng ta sẽ tìm hiểu cách sắp xếp tuple bằng việc chuyển đổi qua list hoặc hàm sorted, mô phỏng comprehension bằng generator, hai phương thức index và count, cùng quy tắc bất biến một cấp độ sâu.'
};
