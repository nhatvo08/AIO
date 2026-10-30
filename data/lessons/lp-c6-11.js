export default {
  id: 'lp-c6-11',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.11',
  title: 'Định kiểu Động ở Khắp Mọi nơi & Cội nguồn của Tính Đa hình',
  subtitle: 'Sự nhất quán kỳ diệu của một mô hình phép gán duy nhất xuyên suốt ngôn ngữ và sức mạnh thích ứng của tính đa hình',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nhận biết giá trị của việc phác họa cấu trúc tham chiếu con trỏ khi gỡ lỗi các biến đổi ngầm trong chương trình.',
    'Nắm vững nguyên lý: trong Python chỉ tồn tại duy nhất một mô hình phép gán xuyên suốt mọi ngóc ngách.',
    'Liệt kê 5 ngữ cảnh then chốt cùng vận hành trên cơ chế phép gán tham chiếu: biến, tham số hàm, vòng lặp for, import và thuộc tính class.',
    'Hiểu vì sao định kiểu động chính là cội nguồn tạo nên tính đa hình (polymorphism) và sự ngắn gọn, linh hoạt của Python.'
  ],

  intuition: {
    title: 'Một chiếc chìa vạn năng mở mọi ổ khóa',
    metaphor: 'Trong nhiều ngôn ngữ phức tạp, bạn phải học hàng chục quy tắc khác nhau: quy tắc truyền giá trị (pass-by-value), quy tắc truyền tham chiếu (pass-by-reference), con trỏ hằng, quy tắc nạp chồng hàm theo kiểu dữ liệu. Nhưng ở Python, người tạo ra ngôn ngữ đã trao cho bạn một "chiếc chìa khóa vạn năng" duy nhất: Phép gán luôn luôn là gắn kết tên vào đối tượng qua tham chiếu con trỏ. Khi bạn gọi hàm, Python gán đối số cho tham số y hệt như câu lệnh a = b. Khi bạn chạy vòng lặp for, Python gán từng phần tử cho biến lặp cũng bằng đúng cơ chế đó. Hiểu được một cơ chế duy nhất này, bạn đã làm chủ toàn bộ dòng chảy dữ liệu trong vũ trụ Python.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH PHÉP GÁN ĐỒNG NHẤT XUYÊN SUỐT 5 NGỮ CẢNH CỦA PYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:4px;">1. Câu lệnh Gán</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);"><code>x = 100</code><br>Tên x liên kết tới đối tượng 100.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">2. Tham số Hàm</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);"><code>func(x) ──► def func(a):</code><br>Tham số a liên kết tới đối tượng của x.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:4px;">3. Vòng lặp for</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);"><code>for item in items:</code><br>Biến item liên kết tới từng phần tử.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-secondary);margin-bottom:4px;">4. Phép import</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);"><code>import math</code><br>Tên math liên kết tới đối tượng module.</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--text-muted);">
          <em>Tất cả đều là cùng một cơ chế: liên kết tên biến tới đối tượng thông qua con trỏ tham chiếu.</em>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Sức mạnh của Sơ đồ Tham chiếu khi Gỡ lỗi',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 12 / 17 – Trang 13 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Dĩ nhiên, bạn không nhất thiết phải vẽ ra những sơ đồ tên biến/đối tượng với các vòng tròn và mũi tên mỗi khi lập trình Python. Tuy nhiên, khi mới bắt đầu làm quen, việc có thể <strong>phác họa lại cấu trúc tham chiếu</strong> của chúng trong tâm trí (hoặc trên giấy nháp) như chúng ta vừa thực hiện ở các bài học trước đôi khi sẽ giúp bạn thấu suốt những tình huống bất thường nhất.</p>

        <p>Chẳng hạn, nếu một đối tượng khả biến bất ngờ bị thay đổi ngầm "sau lưng" bạn khi được truyền qua lại giữa các tầng logic trong chương trình, rất có thể bạn đang trực tiếp chứng kiến những kiến thức thuộc chủ đề của chương này: <strong>hiện tượng tham chiếu chia sẻ và thay đổi tại chỗ</strong>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Tính Nhất quán Kỳ diệu: Duy nhất Một Mô hình Phép gán',
      content: `
        <p>Hơn thế nữa, ngay cả khi định kiểu động có vẻ hơi trừu tượng ở thời điểm hiện tại, sớm muộn gì bạn cũng sẽ cần quan tâm sâu sắc đến nó. Bởi vì <strong>dường như mọi cơ chế trong Python đều hoạt động dựa trên phép gán và tham chiếu</strong>, nên sự hiểu biết căn bản về mô hình này sẽ hữu ích trong vô số ngữ cảnh khác nhau.</p>

        <p>Như Mark Lutz nhấn mạnh, mô hình này vận hành hoàn toàn đồng nhất trong:</p>
        <ol>
          <li><strong>Các câu lệnh gán thông thường:</strong> <code>a = 3</code> liên kết tên <code>a</code> với đối tượng số 3.</li>
          <li><strong>Các tham số của hàm:</strong> Khi gọi hàm <code>f(x)</code>, đối số <code>x</code> được gán cho tham số <code>arg</code> của hàm bằng đúng cơ chế tham chiếu chia sẻ.</li>
          <li><strong>Các biến trong vòng lặp <code>for</code>:</strong> Mỗi lần lặp qua <code>for x in danh_sach:</code>, biến <code>x</code> được gán tham chiếu tới từng đối tượng phần tử trong danh sách.</li>
          <li><strong>Các phép nhập (<code>import</code>) module:</strong> Câu lệnh <code>import math</code> tạo ra một tên biến <code>math</code> trong bảng tên toàn cục và liên kết nó tới đối tượng module đã được nạp trong bộ nhớ.</li>
          <li><strong>Các thuộc tính của lớp:</strong> Phép gán <code>self.name = 'Mark'</code> liên kết thuộc tính <code>name</code> của đối tượng thể hiện tới chuỗi <code>'Mark'</code>.</li>
        </ol>

        <p><strong>Tin mừng lớn cho lập trình viên Python:</strong> Trong Python chỉ tồn tại duy nhất một mô hình phép gán! Một khi bạn đã nắm vững cơ chế định kiểu động, bạn sẽ nhận thấy nó hoạt động nhất quán như nhau ở mọi ngóc ngách của ngôn ngữ, không hề có những ngoại lệ rắc rối.</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa cơ chế phép gán đồng nhất trong vòng lặp for và hàm',
          code: `# 1. Trong hàm: tham số 'target' nhận tham chiếu tới danh sách gốc
def bo_sung_phan_tu(target, gia_tri):
    target.append(gia_tri)

ds = [1, 2]
bo_sung_phan_tu(ds, 3)
print("Danh sách sau khi qua hàm:", ds)

# 2. Trong vòng lặp for: 'item' nhận tham chiếu tới từng phần tử
for item in ds:
    print("item trỏ tới:", item, "| id:", id(item))`,
          output: `Danh sách sau khi qua hàm: [1, 2, 3]
item trỏ tới: 1 | id: ...
item trỏ tới: 2 | id: ...
item trỏ tới: 3 | id: ...`,
          annotations: [
            { line: 6, text: 'Danh sách ds bị biến đổi tại chỗ thông qua tham số target của hàm.' },
            { line: 9, text: 'Biến lặp item lần lượt được gán tham chiếu tới từng đối tượng số nguyên trong ds.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cội nguồn của Tính Đa hình (Polymorphism) và Sự Ngắn gọn',
      content: `
        <p>Ở cấp độ thực tiễn nhất, định kiểu động đồng nghĩa với việc <strong>bạn phải viết ít mã nguồn hơn rất nhiều</strong>. Bạn không cần phải khai báo trước kiểu của tham số hàm, không cần viết 5 phiên bản nạp chồng (overload) của cùng một hàm chỉ để xử lý số nguyên, số thực, chuỗi và danh sách.</p>

        <p>Nhưng quan trọng không kém, định kiểu động cũng chính là <strong>cội nguồn của tính đa hình (polymorphism)</strong> trong Python, một khái niệm then chốt đã được giới thiệu trong Chương 4 mà chúng ta sẽ còn gặp lại xuyên suốt cuốn sách:</p>
        <ul>
          <li>Nhờ việc không gò ép kiểu dữ liệu trong mã nguồn, chương trình vừa đạt được sự ngắn gọn súc tích lại vừa có tính linh hoạt tối đa.</li>
          <li>Hành vi của một thao tác phụ thuộc hoàn toàn vào <em>bản thân đối tượng đang được thao tác</em> (ví dụ toán tử <code>+</code> trên số là cộng đại số, trên chuỗi là ghép nối văn bản, trên danh sách là nối mảng).</li>
          <li>Khi được vận dụng khéo léo, định kiểu động—cùng tính đa hình đi liền với nó—sẽ tạo ra những đoạn mã có khả năng <strong>tự động thích ứng với các yêu cầu mới</strong> khi hệ thống của bạn phát triển và mở rộng trong tương lai.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sức mạnh đa hình tự nhiên của một hàm duy nhất',
          code: `def gap_doi(x):
    return x * 2

print("Số nguyên:", gap_doi(10))        # Toán học: 10 * 2 = 20
print("Số thực:", gap_doi(3.14))         # Toán học: 3.14 * 2 = 6.28
print("Chuỗi:", gap_doi("Python "))      # Nhân bản chuỗi: 'Python Python '
print("Danh sách:", gap_doi([1, 2, 3]))   # Nối danh sách: [1, 2, 3, 1, 2, 3]`,
          output: `Số nguyên: 20
Số thực: 6.28
Chuỗi: Python Python 
Danh sách: [1, 2, 3, 1, 2, 3]`,
          annotations: [
            { line: 1, text: 'Hàm gap_doi hoàn toàn không khai báo kiểu của x; nó chấp nhận mọi đối tượng hỗ trợ toán tử *.' },
            { line: 4, text: 'Hoạt động hoàn hảo trên số nguyên, số thực, chuỗi và danh sách nhờ tính đa hình!' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Triết lý Duck Typing trong Python',
        content: 'Tính đa hình của Python thường được đúc kết qua triết lý nổi tiếng: <em>"Nếu một vật đi như một con vịt và kêu như một con vịt, thì đó là một con vịt"</em>. Một hàm không cần quan tâm tham số của nó thuộc class nào; miễn là đối tượng được truyền vào hỗ trợ các thao tác mà hàm cần (như dấu nhân *, phép lặp for, phương thức read), hàm sẽ tự động vận hành hoàn hảo.'
      }
    ]
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Tạo một hàm đa hình tự nhiên xử lý nhiều kiểu dữ liệu',
      problem: 'Hãy viết một hàm <code>ket_hop(a, b)</code> sử dụng toán tử <code>+</code>. Chạy thử hàm này với: 1. Hai số nguyên; 2. Hai chuỗi; 3. Hai danh sách. Giải thích tính đa hình diễn ra ở đâu.',
      hint: 'Toán tử + có cơ chế nạp chồng toán tử tự động tùy theo đối tượng bên trái quyết định.',
      solutionCode: `def ket_hop(a, b):
    return a + b

print("1. Hai số:", ket_hop(15, 25))
print("2. Hai chuỗi:", ket_hop("Học ", "Python"))
print("3. Hai danh sách:", ket_hop([1, 2], [3, 4]))`,
      solutionOutput: `1. Hai số: 40
2. Hai chuỗi: Học Python
3. Hai danh sách: [1, 2, 3, 4]`,
      explanation: 'Tính đa hình nằm ở chỗ hàm `ket_hop` hoàn toàn không có bất kỳ câu lệnh rẽ nhánh if/else nào để kiểm tra kiểu của `a` và `b`. Bản thân các đối tượng tự kích hoạt phương thức `__add__` tương ứng của riêng chúng tại thời điểm chạy.'
    }
  ],

  quiz: [
    {
      question: 'Trong Python, có bao nhiêu mô hình phép gán cơ bản tồn tại trong toàn bộ ngôn ngữ?',
      options: [
        'Ba mô hình: gán theo giá trị, gán theo con trỏ và gán theo tham chiếu hằng.',
        'Duy nhất một mô hình phép gán: liên kết tên biến tới đối tượng thông qua con trỏ tham chiếu.',
        'Mỗi kiểu dữ liệu có một mô hình phép gán riêng biệt.',
        'Hai mô hình: mô hình cho biến toàn cục và mô hình cho biến cục bộ.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz khẳng định: trong Python chỉ tồn tại duy nhất một mô hình phép gán; nó vận hành nhất quán như nhau trong câu lệnh gán, tham số hàm, vòng lặp for, import và thuộc tính class.'
    },
    {
      question: 'Tính đa hình (polymorphism) trong Python xuất phát từ cội nguồn nào?',
      options: [
        'Xuất phát từ mô hình định kiểu động: mã nguồn không gò ép kiểu tĩnh, để đối tượng tự quyết định hành vi.',
        'Xuất phát từ trình biên dịch C++ ngầm bên dưới hệ điều hành.',
        'Xuất phát từ cú pháp thụt lề 4 dấu cách bắt buộc của Python.',
        'Xuất phát từ việc cài đặt module typing của bên thứ ba.'
      ],
      correctIndex: 0,
      explanation: 'Định kiểu động chính là cội nguồn của tính đa hình trong Python: nhờ việc không ép buộc kiểu dữ liệu tĩnh trong mã nguồn, cùng một đoạn mã có thể tự động áp dụng và tương thích trên nhiều kiểu đối tượng khác nhau.'
    }
  ],

  summary: [
    'Vẽ sơ đồ tham chiếu là kỹ năng gỡ lỗi đắc lực khi đối tượng khả biến bị thay đổi ngầm.',
    'Python chỉ sở hữu duy nhất một mô hình phép gán đồng nhất trong toàn bộ ngôn ngữ.',
    'Phép gán tham chiếu vận hành đồng đều ở biến, tham số hàm, vòng lặp for, import và class.',
    'Định kiểu động giúp lập trình viên viết ít mã hơn và triệt tiêu các khai báo dư thừa.',
    'Định kiểu động là cội nguồn của tính đa hình (polymorphism), tạo nên sự linh hoạt vượt trội của Python.'
  ]
};
