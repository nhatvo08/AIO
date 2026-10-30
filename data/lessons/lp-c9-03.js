export default {
  id: 'lp-c9-03',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.3',
  title: 'Tại sao có cả List và Tuple? & Bản ghi mở rộng Named Tuple (namedtuple)',
  subtitle: 'Khám phá triết lý thiết kế đằng sau List và Tuple, toàn vẹn dữ liệu hằng số, làm khóa Dictionary, và tiện ích mở rộng namedtuple trong collections',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thấu suốt triết lý thiết kế cốt lõi giải thích vì sao Python cần cả List lẫn Tuple: cấu trúc biến thiên theo thời gian vs cấu trúc liên kết dữ liệu hằng định.',
    'Hiểu rõ vai trò then chốt của Tuple trong việc bảo vệ tính toàn vẹn dữ liệu (data integrity) và đáp ứng điều kiện làm khóa cho Dictionary (tính bất biến / hashable).',
    'So sánh 3 cách mô hình hóa bản ghi (records): bản ghi dựa trên List (vị trí khả biến), bản ghi dựa trên Dictionary (khóa ngữ nghĩa), và bản ghi dựa trên Tuple (vị trí bất biến).',
    'Thành thạo công cụ namedtuple từ module collections: khởi tạo lớp được sinh ra, truy cập trường bằng cả vị trí bù lẫn tên thuộc tính (attribute), và chuyển đổi sang dictionary qua _asdict().',
    'Đánh giá sự đánh đổi về chi phí dòng mã và hiệu năng của namedtuple, định hình mối liên hệ chuyển tiếp tới Lớp (Class) trong lập trình hướng đối tượng ở Chương 27.'
  ],

  intuition: {
    title: 'Tờ giấy nháp, Văn bản khắc đá và Tấm thẻ ID thông minh',
    metaphor: 'Khi người mới bắt đầu học Python, câu hỏi thường trực nhất là: "Nếu List đã làm được mọi thứ và lại còn thay đổi được, tại sao lại phải sinh ra Tuple cho rắc rối?" Hãy hình dung List giống như một tờ giấy nháp viết bằng bút chì: bạn có thể ghi thêm, tẩy xóa, viết đè bất kỳ lúc nào — hoàn hảo cho các danh sách công việc cần xử lý. Nhưng nếu bạn cần lưu trữ tọa độ địa lý của một ngọn hải đăng `(10.762622, 106.660172)` hoặc bản ghi một hàng trong cơ sở dữ liệu quan hệ, bạn không muốn bất kỳ hàm nào vô tình sửa lệch con số đó! Tuple giống như một văn bản đã khắc trên đá: một khi đã tạo ra, bạn có sự đảm bảo tuyệt đối rằng nó là một hằng số bất biến. Và để khắc phục nhược điểm "không có nhãn tên", Python cung cấp Named Tuple — như một tấm thẻ ID thông minh vừa giữ nguyên tính bất biến vừa gắn chip định danh tên trường rõ ràng!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">TIẾN TRÌNH TIẾN HÓA CỦA MÔ HÌNH BẢN GHI (RECORD MODELS)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:#10b981;">1. List Record</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;"><code>['Pat', 40.5, ['dev']]</code><br>• Truy cập: <code>L[0]</code>, <code>L[1]</code><br>• Khả biến, dễ bị sửa ngoài ý muốn<br>• Vị trí thiếu tính ngữ nghĩa</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:#8b5cf6;">2. Dict Record</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;"><code>{'name': 'Pat', 'age': 40.5}</code><br>• Truy cập: <code>D['name']</code><br>• Khóa có tên tự ghi tài liệu<br>• Chi phí bộ nhớ bảng băm lớn hơn</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">3. Named Tuple</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;"><code>Rec(name='Pat', age=40.5)</code><br>• Truy cập: <code>pat[0]</code> VÀ <code>pat.name</code><br>• Bất biến, toàn vẹn dữ liệu<br>• Tiết kiệm bộ nhớ như tuple thường</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tại Sao Lại Có Cả List và Tuple?',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 7 / 48</strong>.</p>
          </div>
        </div>

        <p>Đây dường như luôn là câu hỏi đầu tiên nảy sinh khi học về tuple: <em>Tại sao chúng ta lại cần tuple khi mà đã có list?</em> Mark Lutz giải thích sự tồn tại của cả hai kiểu dữ liệu thông qua ba lý do nền tảng:</p>

        <ol>
          <li><strong>Triết lý thiết kế mô hình hóa dữ liệu:</strong> Tuple nhằm mục đích biểu diễn một tập hợp liên kết đơn giản và cố định giữa các đối tượng (như tọa độ một điểm, bản ghi một hàng cơ sở dữ liệu quan hệ), trong khi list được thiết kế như một cấu trúc dữ liệu biến đổi và co giãn linh hoạt theo thời gian.</li>
          <li><strong>Đảm bảo tính toàn vẹn dữ liệu (Data Integrity):</strong> Tính bất biến của tuple mang lại sự an tâm tuyệt đối — bạn có thể chắc chắn rằng một tuple sẽ không bao giờ bị thay đổi ngầm sau lưng bạn thông qua một tham chiếu khác ở bất kỳ nơi nào trong chương trình. Do đó, tuple đóng vai trò tương tự như việc khai báo "hằng số" (constant) trong các ngôn ngữ khác.</li>
          <li><strong>Làm khóa cho Dictionary:</strong> Dictionary đòi hỏi các khóa của nó phải có giá trị băm cố định (hashable / immutable). List là đối tượng khả biến nên không bao giờ có thể làm khóa dict, trong khi tuple hoàn toàn có thể đảm nhiệm vai trò này (như bài toán ma trận thưa ở Chương 8).</li>
        </ol>

        <div class="callout-box callout-tip">
          <div class="callout-header"><span>💡 Quy tắc ngón tay cái (Rule of thumb):</span> <span>Khi nào chọn List, khi nào chọn Tuple?</span></div>
          <div class="callout-body">
            <p><strong>List</strong> là công cụ được lựa chọn hàng đầu cho các tập hợp có thứ tự có nhu cầu thay đổi, chèn, xóa hoặc mở rộng động trong chương trình. Ngược lại, <strong>Tuple</strong> sẽ đảm nhiệm các trường hợp liên kết dữ liệu có cấu trúc cố định, dữ liệu không được phép sửa đổi hoặc khi cần dùng làm khóa cho từ điển.</p>
          </div>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Xem Lại Bản Ghi: Bản Ghi Tuple so với Dictionary',
      content: `
        <p>Trong Chương 8, chúng ta đã thấy cách biểu diễn thông tin dạng bản ghi (record) bằng cả list và dictionary. Nếu không đòi hỏi tính khả biến, tuple hoàn toàn có thể thay thế list để làm bản ghi, với các vị trí đại diện cho các trường dữ liệu:</p>

        <p>Tuy nhiên, cũng giống như với list, các số thứ tự chỉ mục <code>0, 1, 2</code> trong tuple truyền tải ít thông tin ngữ nghĩa hơn so với tên các khóa trong dictionary. Chúng ta cũng có thể chuyển đổi linh hoạt giữa các thành phần của dictionary và tuple:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh bản ghi bằng Tuple, Dictionary và phép chuyển đổi',
          code: `# Bản ghi biểu diễn bằng Tuple (bất biến, truy cập theo offset)
pat_tup = ('Pat', 40.5, ['dev', 'mgr'])
print("Bản ghi Tuple:", pat_tup)
print("Truy cập theo vị trí [0] và [2]:", pat_tup[0], pat_tup[2])

# Bản ghi biểu diễn bằng Dictionary (khả biến, truy cập theo khóa nhãn)
pat_dict = dict(name='Pat', age=40.5, jobs=['dev', 'mgr'])
print("Bản ghi Dict:", pat_dict)
print("Truy cập theo khóa ['name'] và ['jobs']:", pat_dict['name'], pat_dict['jobs'])

# Chuyển đổi giữa Dictionary và Tuple
vals_tup = tuple(pat_dict.values())
items_list = list(pat_dict.items())
print("Chuyển values thành Tuple:", vals_tup)
print("Chuyển items thành List các Tuple cặp:", items_list)`,
          output: `Bản ghi Tuple: ('Pat', 40.5, ['dev', 'mgr'])
Truy cập theo vị trí [0] và [2]: Pat ['dev', 'mgr']
Bản ghi Dict: {'name': 'Pat', 'age': 40.5, 'jobs': ['dev', 'mgr']}
Truy cập theo khóa ['name'] và ['jobs']: Pat ['dev', 'mgr']
Chuyển values thành Tuple: ('Pat', 40.5, ['dev', 'mgr'])
Chuyển items thành List các Tuple cặp: [('name', 'Pat'), ('age', 40.5), ('jobs', ['dev', 'mgr'])]`,
          annotations: [
            { line: 2, text: 'pat_tup an toàn trước việc bị gán đè trường, nhưng cần nhớ offset.' },
            { line: 7, text: 'pat_dict có tên trường tường minh nhưng tiêu tốn bộ nhớ bảng băm.' },
            { line: 12, text: 'pat_dict.items() trả về danh sách các tuple cặp (key, value).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bản Ghi Mở Rộng: Tiện Ích namedtuple trong Thư Viện Chuẩn collections',
      content: `
        <p>Như Mark Lutz phân tích ở trang 8, sự đối lập giữa việc chọn tuple (tiết kiệm, bất biến, truy cập theo vị trí) và dictionary (tên khóa rõ ràng) thực chất là một sự phân đôi giả tạo. Thư viện chuẩn của Python cung cấp một công cụ tuyệt vời mang tên <strong>namedtuple</strong> trong module <code>collections</code>.</p>

        <p><code>namedtuple</code> là một hàm sinh ra một lớp con của tuple, bổ sung thêm khả năng truy cập các trường bằng <strong>tên thuộc tính (attribute <code>obj.name</code>)</strong> bên cạnh việc vẫn hỗ trợ đầy đủ việc đánh chỉ mục theo vị trí bù <code>obj[0]</code>, cắt lát, và giải nén. Nó cũng cung cấp phương thức <code>_asdict()</code> để chuyển đổi sang dictionary khi cần:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo và sử dụng namedtuple trong module collections',
          code: `from collections import namedtuple

# 1. Định nghĩa một lớp bản ghi Rec dựa trên namedtuple
Rec = namedtuple('Rec', ['name', 'age', 'jobs'])

# 2. Tạo một thực thể bản ghi
pat = Rec('Pat', age=40.5, jobs=['dev', 'mgr'])
print("Đối tượng namedtuple:", pat)

# 3. Truy cập theo vị trí bù (như tuple thường)
print("Truy cập theo offset [0], [2]:", (pat[0], pat[2]))

# 4. Truy cập theo tên thuộc tính (attribute name)
print("Truy cập theo thuộc tính .name, .jobs:", (pat.name, pat.jobs))

# 5. Chuyển đổi sang dictionary thông qua phương thức _asdict()
D = pat._asdict()
print("Chuyển thành dict qua _asdict():", D)
print("Truy cập dạng dict D['name']:", D['name'])`,
          output: `Đối tượng namedtuple: Rec(name='Pat', age=40.5, jobs=['dev', 'mgr'])
Truy cập theo offset [0], [2]: ('Pat', ['dev', 'mgr'])
Truy cập theo thuộc tính .name, .jobs: ('Pat', ['dev', 'mgr'])
Chuyển thành dict qua _asdict(): {'name': 'Pat', 'age': 40.5, 'jobs': ['dev', 'mgr']}
Truy cập dạng dict D['name']: Pat`,
          annotations: [
            { line: 4, text: 'namedtuple tạo ra một class Python mới kế thừa từ tuple.' },
            { line: 7, text: 'Thực thể pat vừa là tuple vừa có các thuộc tính tương ứng.' },
            { line: 14, text: 'pat.name chạy nhanh và tự động kiểm tra tên trường hợp lệ.' },
            { line: 17, text: 'pat._asdict() trả về một dictionary giữ nguyên thứ tự chèn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Sự Đánh Đổi Hiệu Năng & Hướng Tới Lớp (Class) trong OOP',
      content: `
        <p>Như bạn có thể thấy, <code>namedtuple</code> là một dạng lai thú vị giữa tuple, class và dictionary. Chúng cũng đại diện cho một sự đánh đổi kỹ thuật kinh điển:</p>

        <ul>
          <li><strong>Ưu điểm:</strong> Giữ nguyên hiệu quả bộ nhớ và tính bất biến của tuple, nhưng mang lại cú pháp truy cập thuộc tính trong sáng như object-oriented programming (OOP).</li>
          <li><strong>Chi phí:</strong> Đòi hỏi viết thêm mã khởi tạo (phải <code>import</code> và định nghĩa lớp trước), và có một chút chi phí hiệu năng nhỏ khi khởi tạo lớp.</li>
        </ul>

        <p>Sau này, trong Chương 27, chúng ta sẽ thấy rằng các <strong>Lớp do người dùng tự định nghĩa (User-defined Classes)</strong> còn có thể tiến xa hơn nữa: chúng không chỉ gắn nhãn các trường dữ liệu bằng tên thuộc tính, mà còn có thể gắn kèm các phương thức xử lý logic nghiệp vụ ngay trong cùng một gói mã nguồn.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào nên dùng namedtuple?',
        content: 'namedtuple là lựa chọn lý tưởng khi bạn làm việc với dữ liệu bảng (như kết quả truy vấn SQL bằng thư viện sqlite3 / psycopg, đọc các dòng từ file CSV), nơi cấu trúc mỗi hàng là cố định và việc truy cập bằng <code>row.username</code> dễ đọc hơn nhiều so với <code>row[3]</code>.'
      }
    ],
    pitfalls: [
      {
        title: 'namedtuple vẫn là đối tượng bất biến!',
        content: 'Đừng nhầm lẫn namedtuple với các đối tượng class thông thường có thể gán đè thuộc tính: lệnh <code>pat.age = 41</code> sẽ báo lỗi <code>AttributeError: can\'t set attribute</code>. Để cập nhật, bạn cần dùng phương thức <code>pat._replace(age=41)</code> để sinh ra một namedtuple mới.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo bản ghi tọa độ điểm không gian 3D bằng namedtuple',
      level: 'Vừa',
      problem: 'Hãy viết mã Python: (1) Dùng collections.namedtuple để tạo một kiểu bản ghi Point3D gồm 3 trường \'x\', \'y\', \'z\'. (2) Khởi tạo điểm p1 tại tọa độ x=10, y=20, z=30. (3) In ra giá trị tọa độ x bằng thuộc tính, tọa độ y bằng chỉ số vị trí bù, và xuất toàn bộ điểm p1 dưới dạng dictionary.',
      hint: 'Import namedtuple từ collections; dùng Point3D = namedtuple(\'Point3D\', [\'x\', \'y\', \'z\']).',
      solutionCode: `from collections import namedtuple

Point3D = namedtuple('Point3D', ['x', 'y', 'z'])
p1 = Point3D(10, y=20, z=30)

print("Tọa độ x qua thuộc tính:", p1.x)
print("Tọa độ y qua offset [1]:", p1[1])
print("Điểm p1 dạng dictionary:", p1._asdict())`,
      solutionOutput: `Tọa độ x qua thuộc tính: 10
Tọa độ y qua offset [1]: 20
Điểm p1 dạng dictionary: {'x': 10, 'y': 20, 'z': 30}`,
      explanation: 'Point3D cung cấp giao diện đồng nhất: vừa hỗ trợ cú pháp hướng đối tượng p1.x vừa hỗ trợ giải nén unpacking (*p1) và truy xuất vị trí p1[1].'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây giải thích ĐÚNG NHẤT vì sao Tuple có thể làm khóa cho Dictionary trong khi List thì không?',
      options: [
        'Vì Tuple lưu trữ ít phần tử hơn List nên tốc độ tìm kiếm nhanh hơn.',
        'Vì Tuple là kiểu bất biến (immutable) nên giá trị băm (hash value) của nó không bao giờ thay đổi sau khi tạo, đáp ứng yêu cầu của bảng băm.',
        'Vì Tuple được viết trong dấu ngoặc đơn, cú pháp này được CPython ưu tiên riêng cho bảng khóa.',
        'Vì List chiếm nhiều bộ nhớ RAM hơn Tuple.'
      ],
      correctIndex: 1,
      explanation: 'Các thuật toán bảng băm (hash table) của Dictionary đòi hỏi giá trị băm của khóa phải bất biến trong suốt vòng đời của nó. Tuple là bất biến (nếu chứa các đối tượng bất biến) nên có thể băm (hashable), trong khi List khả biến nên không thể băm.'
    },
    {
      question: 'Điều gì sẽ xảy ra nếu bạn thực hiện lệnh gán pat.age = 41 trên một đối tượng namedtuple?',
      options: [
        'Thuộc tính age sẽ được cập nhật thành công thành 41.',
        'Một bản sao mới của namedtuple sẽ tự động được tạo ra.',
        'Python sẽ báo lỗi AttributeError vì namedtuple kế thừa tính bất biến từ tuple.',
        'Chương trình sẽ tự động chuyển đổi namedtuple thành dictionary.'
      ],
      correctIndex: 2,
      explanation: 'namedtuple kế thừa bản chất bất biến của tuple thông thường, do đó các trường của nó không thể bị thay đổi tại chỗ. Mọi cố gắng gán trực tiếp sẽ gây ra lỗi AttributeError.'
    }
  ],

  summary: [
    'List dành cho các tập hợp đối tượng có thứ tự biến thiên cần thêm, bớt, sửa tại chỗ; Tuple dành cho các liên kết dữ liệu hằng định cần bảo toàn tính toàn vẹn.',
    'Tuple đáp ứng yêu cầu bất biến và có thể băm (hashable), cho phép nó đóng vai trò làm khóa trong Dictionary (như ma trận thưa).',
    'Bản ghi Tuple truy cập theo vị trí bù (offset), trong khi bản ghi Dictionary truy cập theo tên khóa ngữ nghĩa.',
    'Tiện ích namedtuple trong module collections dung hòa cả hai ưu điểm: vừa bất biến và truy cập theo vị trí bù, vừa truy cập bằng tên thuộc tính tự nhiên (.name) và chuyển đổi dạng dict qua _asdict().'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.4), chúng ta sẽ bước sang kiểu đối tượng cốt lõi thứ hai của Chương 9: File. Bạn sẽ học cách sử dụng hàm open(), quy tắc xử lý đường dẫn trên Windows và Unix, cùng các chế độ mở file cơ bản.'
};
