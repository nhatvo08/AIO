export default {
  id: 'lp-c8-21',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.21',
  title: 'Biểu diễn Bản ghi (Record / JSON), Đối tượng View Dictionary, Tính chất Set-like & So sánh Dict',
  subtitle: 'Kỹ thuật cấu trúc dữ liệu bản ghi đa tầng, đối tượng View động (keys, values, items), toán tử tập hợp trên view và quy tắc so sánh Dictionary',
  level: 'Nâng cao',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Biểu diễn các bản ghi phức hợp (Record / Struct / JSON) bằng Dictionary lồng nhau và tích hợp vào cơ sở dữ liệu lớn.',
    'Hiểu sâu bản chất động của các đối tượng View (`dict_keys`, `dict_values`, `dict_items`): tự động cập nhật khi từ điển thay đổi.',
    'Thành thạo các phép toán tập hợp (Set-like operations: `&`, `|`, `-`, `^`) trên `keys()` và `items()` view.',
    'Nắm vững 3 phương pháp sắp xếp các khóa của Dictionary và cách so sánh bằng nhau (`==`) vs so sánh độ lớn bằng `sorted(items)`.',
    'Phân biệt điểm tinh tế: toán tử `>` trên view `items()` là phép kiểm tra tập cha (superset) chứ không phải so sánh độ lớn từ điển.'
  ],

  intuition: {
    title: 'Hồ sơ nhân viên đa tầng và Tấm kính phản chiếu thời gian thực',
    metaphor: 'Hãy tưởng tượng bạn đang xây dựng hồ sơ nhân sự. Thay vì tạo bảng phẳng đơn điệu, bạn dùng Dictionary để tạo một bộ hồ sơ đa tầng: tên, ngày sinh (dict con gồm năm/tháng), và danh sách bằng cấp (list con). Đây chính là định dạng JSON tiêu chuẩn của thế giới web! Khi bạn muốn quan sát danh sách các trường trong hồ sơ, phương thức D.keys() không in ra một tập giấy chết; nó giống như một tấm kính thần kỳ phản chiếu trực tiếp vào chiếc tủ hồ sơ: nếu ai đó thêm hoặc xóa một mục trong tủ, tấm kính lập tức cập nhật hình ảnh phản chiếu ngay tức khắc mà không cần bấm F5! Hơn thế nữa, tấm kính này còn có khả năng đọ tìm điểm chung (&) và gộp mục (|) hệt như một tập hợp toán học Set!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH VIEW TỰ ĐỘNG PHẢN ÁNH THAY ĐỔI ĐỘNG (DYNAMIC VIEWS)</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:700;width:120px;color:var(--text-muted);">1. Ban đầu:</span>
            <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">D = {'a': 1, 'b': 2, 'c': 3}</span>
            <span style="padding:4px 10px;background:var(--accent-soft);border:1px solid var(--accent-primary);border-radius:4px;font-weight:700;color:var(--accent-text);">K = D.keys() ➔ ['a', 'b', 'c']</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-weight:700;width:120px;color:var(--danger);">2. del D['b']:</span>
            <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">D chỉ còn {'a': 1, 'c': 3}</span>
            <span style="padding:4px 10px;background:rgba(16,185,129,0.15);border:2px solid #10b981;border-radius:4px;font-weight:700;color:#10b981;">K tự động đổi thành ['a', 'c'] ngay lập tức!</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Biểu diễn Bản ghi (Record / Struct / JSON) & Cơ sở Dữ liệu',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 32 / 42 – Trang 34 / 42</strong>.</p>
          </div>
        </div>

        <p>Dictionary là một trong nhiều cách để mô tả các thuộc tính của một mục trong miền bài toán của chương trình. Nghĩa là, chúng có thể phục vụ cùng vai trò như <strong>"bản ghi" (record)</strong> hoặc <strong>"cấu trúc" (struct)</strong> trong các ngôn ngữ khác, và là nền tảng trực tiếp của định dạng <strong>JSON</strong> trung lập về ngôn ngữ.</p>

        <p>Đặc biệt khi kết hợp lồng ghép giữa Dictionary và List, bạn có thể dễ dàng biểu diễn các cấu trúc thông tin phong phú: một dictionary lớn chứa các dictionary con và các list thuộc tính. Bạn chỉ cần xâu chuỗi các toán tử chỉ mục để đi sâu vào từng tầng dữ liệu:</p>
      `,
      codeExamples: [
        {
          title: 'Biểu diễn bản ghi cuốn sách có cấu trúc lồng nhau trong ví dụ sách Lutz',
          code: `# Biểu diễn bản ghi cuốn sách lồng ghép dict và list
rec = {
    'title': 'Learning Python, 5th Edition',
    'date': {'year': 2013, 'month': 'July'},
    'isbns': ['1449355730', '9781449355739']
}

# Truy xuất các thành phần lồng nhau bằng cách xâu chuỗi chỉ mục
print("Tiêu đề sách:       ", rec['title'])
print("Tất cả mã ISBN:     ", rec['isbns'])
print("Mã ISBN 13 chữ số:  ", rec['isbns'][1])
print("Năm xuất bản:       ", rec['date']['year'])

# Lồng bản ghi vào cơ sở dữ liệu lớn hơn (Database dạng List hoặc Dict)
db_list = [rec]
print("\nTruy xuất từ DB dạng list:", db_list[0]['isbns'][1])

db_dict = {'lp5e': rec}
print("Truy xuất từ DB dạng dict:", db_dict['lp5e']['isbns'][1])`,
          output: `Tiêu đề sách:        Learning Python, 5th Edition
Tất cả mã ISBN:      ['1449355730', '9781449355739']
Mã ISBN 13 chữ số:   9781449355739
Năm xuất bản:        2013

Truy xuất từ DB dạng list: 9781449355739
Truy xuất từ DB dạng dict: 9781449355739`,
          annotations: [
            { line: 2, text: 'Bản ghi kết hợp hài hòa giữa kiểu chuỗi, dict lồng nhau (date) và list (isbns).' },
            { line: 11, text: 'rec[\'isbns\'][1] xâu chuỗi khóa dict và chỉ số list.' },
            { line: 15, text: 'db_list gom các bản ghi thành danh sách cơ sở dữ liệu.' },
            { line: 18, text: 'db_dict sử dụng mã định danh \'lp5e\' làm khóa cấp cao.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bản chất Động của Đối tượng View (dict_keys, values, items)',
      content: `
        <p>Trong Python 3, ba phương thức <code>keys()</code>, <code>values()</code>, và <code>items()</code> trả về các đối tượng <strong>view (khung nhìn)</strong>. Dưới đây là các đặc tính cốt tử của chúng:</p>

        <ul>
          <li><strong>Bộ nhớ tối ưu:</strong> Chúng không chiếm dụng không gian bộ nhớ cho toàn bộ danh sách kết quả; chúng là các iterable sinh giá trị theo nhu cầu.</li>
          <li><strong>Không hỗ trợ chỉ mục và sort:</strong> Lệnh <code>K[0]</code> báo lỗi <code>TypeError: 'dict_keys' object is not subscriptable</code>, và <code>K.sort()</code> báo <code>AttributeError</code>. Để làm việc này, bạn phải bọc chúng qua <code>list(K)</code>.</li>
          <li><strong>Tính phản ánh động (Dynamic Reflection):</strong> Các view không bị cố định bất biến khi tạo ra; <strong>chúng tự động phản ánh các thay đổi trong tương lai đối với dictionary gốc</strong> ngay lập tức!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khảo sát tính phản ánh động của View khi thay đổi Dictionary gốc',
          code: `D = {'a': 1, 'b': 2, 'c': 3}

# Tạo các đối tượng view
K = D.keys()
V = D.values()
print("View ban đầu:")
print("list(K):", list(K), "| list(V):", list(V))

# Thay đổi dictionary tại chỗ: xóa khóa 'b'
del D['b']
print("\nSau khi del D['b'] trên dict gốc:")
print("list(K):", list(K), "| list(V):", list(V))

# Cố tình đánh chỉ mục hoặc sort trực tiếp trên view sẽ thất bại
try:
    K[0]
except TypeError as err:
    print("\nK[0] thất bại:", err)

try:
    K.sort()
except AttributeError as err:
    print("K.sort() thất bại:", err)`,
          output: `View ban đầu:
list(K): ['a', 'b', 'c'] | list(V): [1, 2, 3]

Sau khi del D['b'] trên dict gốc:
list(K): ['a', 'c'] | list(V): [1, 3]

K[0] thất bại: 'dict_keys' object is not subscriptable
K.sort() thất bại: 'dict_keys' object has no attribute 'sort'`,
          annotations: [
            { line: 4, text: 'K và V là hai đối tượng view gắn chặt với D.' },
            { line: 10, text: 'Xóa \'b\' khỏi D: K và V tự động cập nhật ngay mà không cần gọi lại D.keys()!' },
            { line: 15, text: 'View không hỗ trợ đánh chỉ mục [0].' },
            { line: 20, text: 'View không có phương thức .sort().' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. View của Dictionary và Tính chất Tập hợp (Set-like)',
      content: `
        <p>Như tác giả Mark Lutz phân tích ở trang 36: Một số view của dictionary có <strong>tính chất giống như tập hợp (set-like)</strong> và hỗ trợ các thao tác tập hợp như hợp (<code>|</code>), giao (<code>&amp;</code>), hiệu (<code>-</code>), và đối xứng (<code>^</code>):</p>

        <ul>
          <li><strong><code>D.keys()</code> luôn luôn mang tính set-like:</strong> Vì các khóa của dictionary luôn là duy nhất và có thể băm được (hashable), hoàn toàn đối xứng logic với tập hợp Set.</li>
          <li><strong><code>D.items()</code> mang tính set-like khi và chỉ khi:</strong> Tất cả các giá trị của nó đều có thể băm được (không chứa list hay dict con). Nếu có giá trị khả biến, phép toán set sẽ kích hoạt <code>TypeError: unhashable type: 'list'</code>.</li>
          <li><strong><code>D.values()</code> KHÔNG BAO GIỜ mang tính set-like:</strong> Vì các giá trị không nhất thiết phải là duy nhất hoặc bất biến.</li>
        </ul>

        <div class="callout-box callout-note">
          <div class="callout-header"><span>📌 Phân biệt tinh tế:</span> <span>Toán tử | trên View vs | trên Dictionary</span></div>
          <div class="callout-body">
            <p>Hãy cẩn thận đừng nhầm lẫn: khi chạy trên một view (<code>D.keys() | {'x': 4}</code>), toán tử <code>|</code> là một phép toán tập hợp toán học và <strong>kết quả trả về là một đối tượng Set không thứ tự</strong>! Trong khi đó, toán tử <code>|</code> giữa hai dictionary (<code>D1 | D2</code> từ Python 3.9) là một phép hợp nhất có thứ tự và trả về một <em>Dictionary mới</em>.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Các phép toán tập hợp trên đối tượng View keys() và items()',
          code: `D = {'a': 1, 'b': 2, 'c': 3}

# Giao giữa View keys và chính nó
print("D.keys() & D.keys():", D.keys() & D.keys())

# Giao giữa View keys và một Set
print("D.keys() & {'b'}:   ", D.keys() & {'b'})

# Giao giữa View keys và một Dictionary (dict được xử lý như keys)
print("D.keys() & {'b': 1}:", D.keys() & {'b': 1})

# Hợp giữa View keys và một Set
print("D.keys() | {'b', 'c', 'd'}:", D.keys() | {'b', 'c', 'd'})

# Phép hợp trên items view
D1 = {'a': 1}
items_union = D1.items() | {('c', 3), ('d', 4)}
print("\nD1.items() hợp với set tuple:", items_union)
print("Chuyển thành dict mới:       ", dict(items_union))`,
          output: `D.keys() & D.keys(): {'b', 'a', 'c'}
D.keys() & {'b'}:    {'b'}
D.keys() & {'b': 1}: {'b'}
D.keys() | {'b', 'c', 'd'}: {'b', 'a', 'd', 'c'}

D1.items() hợp với set tuple: {('a', 1), ('c', 3), ('d', 4)}
Chuyển thành dict mới:        {'a': 1, 'c': 3, 'd': 4}`,
          annotations: [
            { line: 4, text: 'Phép giao & trả về set chứa các khóa chung.' },
            { line: 10, text: 'View keys có thể giao trực tiếp với một dict khác.' },
            { line: 15, text: 'Items view có thể hợp với tập hợp các cặp tuple (k, v).' },
            { line: 17, text: 'dict() chấp nhận cả một iterable set các tuple để tạo từ điển.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Sắp xếp Khóa & Quy tắc So sánh Dictionary',
      content: `
        <p><strong>Ba phương pháp sắp xếp các khóa của Dictionary:</strong><br>
        Vì đối tượng view <code>D.keys()</code> không hỗ trợ phương thức <code>sort()</code>, bạn có ba cách giải quyết chuẩn mực:</p>
        <ol>
          <li><code>Ks = list(D.keys()); Ks.sort()</code>: Chuyển thành list rồi sort.</li>
          <li><code>sorted(D.keys())</code>: Dùng hàm dựng sẵn trên view.</li>
          <li><code>sorted(D)</code>: Dùng <code>sorted()</code> trực tiếp trên chính dictionary (đơn giản, thanh lịch và phổ biến nhất vì iterator ngầm định của dict sinh ra các khóa).</li>
        </ol>

        <p><strong>Quy tắc So sánh Dictionary:</strong></p>
        <ul>
          <li><strong>So sánh bằng nhau <code>==</code> và <code>!=</code>:</strong> Tự động so sánh từng cặp khóa/giá trị và <strong>hoàn toàn bỏ qua thứ tự chèn</strong>. Hai từ điển có cùng khóa và giá trị nhưng thứ tự chèn khác nhau vẫn được coi là bằng nhau (<code>True</code>).</li>
          <li><strong>So sánh độ lớn <code>&lt;</code> và <code>&gt;</code>:</strong> <strong>KHÔNG được hỗ trợ</strong> trên bản thân các dictionary trong Python 3 và sẽ phát sinh lỗi <code>TypeError</code>.</li>
          <li>Để so sánh độ lớn giữa hai dictionary, bạn phải tự so sánh các view items đã được sắp xếp: <code>sorted(D1.items()) &gt; sorted(D2.items())</code>.</li>
        </ul>

        <div class="callout-box callout-warning">
          <div class="callout-header"><span>⚠️ Điểm tinh tế về toán tử &gt; trên items():</span> <span>Không phải so sánh từ điển!</span></div>
          <div class="callout-body">
            <p>Nếu bạn viết trực tiếp <code>D1.items() &gt; D2.items()</code>, toán tử <code>&gt;</code> sẽ <strong>thực thi phép kiểm tra tập cha siêu cấp (superset test)</strong> vì các view này mang tính set-like, chứ KHÔNG phải so sánh độ lớn theo thứ tự từ điển! Hãy luôn bọc qua <code>sorted()</code> trước khi so sánh độ lớn.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Sắp xếp khóa và kiểm chứng các quy tắc so sánh Dictionary',
          code: `D1 = dict(a=1, b=2, c=3)
D2 = dict(c=3, b=2, a=1)

# 1. So sánh bằng nhau: bỏ qua thứ tự chèn
print("D1 == D2:", D1 == D2)
print("D1 != D2:", D1 != D2)

# 2. Sắp xếp các khóa bằng sorted(D)
print("\nDuyệt các khóa đã sắp xếp A-Z:")
for k in sorted(D1):
    print(f"  {k} => {D1[k]}")

# 3. So sánh độ lớn giữa hai dictionary
D_A = dict(a=1, b=2, c=4)
D_B = dict(c=3, b=2, a=1)

# D_A > D_B trực tiếp sẽ gây lỗi TypeError!
try:
    bad_cmp = D_A > D_B
except TypeError as err:
    print("\nD_A > D_B gây lỗi:", err)

# So sánh độ lớn chuẩn mực qua sorted(items)
is_greater = sorted(D_A.items()) > sorted(D_B.items())
print("sorted(D_A.items()) > sorted(D_B.items()):", is_greater)`,
          output: `D1 == D2: True
D1 != D2: False

Duyệt các khóa đã sắp xếp A-Z:
  a => 1
  b => 2
  c => 3

D_A > D_B gây lỗi: '>' not supported between instances of 'dict' and 'dict'
sorted(D_A.items()) > sorted(D_B.items()): True`,
          annotations: [
            { line: 5, text: 'D1 == D2 cho True dù thứ tự khóa bên trong khác nhau.' },
            { line: 10, text: 'sorted(D1) sinh ra danh sách khóa [\'a\', \'b\', \'c\'] đã sắp xếp.' },
            { line: 19, text: 'Toán tử > không hỗ trợ trực tiếp trên dict trong Python 3.' },
            { line: 23, text: 'sorted(items) so sánh tuần tự từng cặp tuple khóa/giá trị đã chuẩn hóa thứ tự.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lưu trữ đối tượng bền vững với module shelve',
        content: 'Như tác giả Mark Lutz giới thiệu ở trang 34: Sau này trong cuốn sách, bạn sẽ gặp công cụ <code>shelve</code> của Python. <code>shelve</code> hoạt động với cú pháp hoàn toàn giống hệt một Dictionary, nhưng tự động lưu trữ và ánh xạ các đối tượng đến và đi từ các tệp tin trên đĩa cứng, biến chúng thành cơ sở dữ liệu bền vững vĩnh viễn!'
      }
    ],
    pitfalls: [
      {
        title: 'Items view chỉ mang tính set-like khi giá trị hashable',
        content: 'Nếu dictionary của bạn có giá trị là list: <code>d = {\'a\': [1, 2]}</code>, thì <code>d.items() | {0, 1}</code> sẽ gây lỗi <code>TypeError: unhashable type: \'list\'</code> vì cặp tuple chứa list không thể băm được.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tìm khóa chung và khóa khác biệt giữa hai cấu hình bằng Set-like View',
      level: 'Vừa',
      problem: 'Cho hai cấu hình cfg1 = {"host": "a", "port": 80, "timeout": 30} và cfg2 = {"port": 80, "user": "admin", "timeout": 60}. Hãy dùng các toán tử tập hợp trên view keys() để: (1) Tìm các khóa chung xuất hiện ở cả hai cấu hình. (2) Tìm các khóa chỉ có trong cfg1 mà không có trong cfg2.',
      hint: 'Dùng phép giao & cho khóa chung, phép hiệu - cho khóa chỉ có trong cfg1.',
      solutionCode: `cfg1 = {"host": "a", "port": 80, "timeout": 30}
cfg2 = {"port": 80, "user": "admin", "timeout": 60}

# 1. Khóa chung (phép giao &)
common_keys = cfg1.keys() & cfg2.keys()
print("Các khóa chung giữa hai cấu hình: ", common_keys)

# 2. Khóa riêng của cfg1 (phép hiệu -)
unique_cfg1 = cfg1.keys() - cfg2.keys()
print("Các khóa chỉ có trong cấu hình 1:", unique_cfg1)`,
      solutionOutput: `Các khóa chung giữa hai cấu hình:  {'port', 'timeout'}
Các khóa chỉ có trong cấu hình 1: {'host'}`,
      explanation: 'View keys() hỗ trợ đầy đủ các phép toán tập hợp toán học, giúp việc so khớp các trường cấu hình diễn ra vô cùng ngắn gọn và tốc độ.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây đúng về phép so sánh hai Dictionary trong Python 3?',
      options: [
        'Toán tử D1 == D2 chỉ trả về True nếu cả hai có cùng các cặp khóa/giá trị VÀ cùng thứ tự chèn.',
        'Toán tử D1 == D2 trả về True nếu cả hai có cùng các cặp khóa/giá trị, hoàn toàn bỏ qua thứ tự chèn.',
        'Toán tử D1 > D2 so sánh tổng số lượng phần tử của hai từ điển.',
        'Dictionary không thể so sánh bằng toán tử ==.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, phép so sánh bằng nhau == trên Dictionary tự động so sánh từng cặp khóa/giá trị và bỏ qua thứ tự chèn của chúng.'
    },
    {
      question: 'Tại sao phép toán D.values() & {"a", "b"} lại gây ra lỗi TypeError trong Python?',
      options: [
        'Vì values() chỉ trả về số nguyên.',
        'Vì view values() không có tính chất giống tập hợp (set-like) do các giá trị trong dictionary không nhất thiết phải là duy nhất hoặc bất biến.',
        'Vì toán tử & chỉ dùng cho số nhị phân.',
        'Vì {"a", "b"} là một list.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz làm rõ: chỉ có keys() và items() (khi hashable) mới mang tính set-like; values() không bao giờ mang tính set-like vì giá trị có thể trùng lặp hoặc chứa đối tượng khả biến.'
    }
  ],

  summary: [
    'Dictionary là công cụ lý tưởng để biểu diễn các bản ghi thông tin đa tầng (Record / Struct / JSON) trong Python.',
    'Các đối tượng view keys(), values(), items() có tính phản ánh động: tự động cập nhật ngay khi từ điển gốc thay đổi.',
    'View keys() và items() (khi hashable) hỗ trợ các thao tác tập hợp toán học: & (giao), | (hợp), - (hiệu), ^ (đối xứng).',
    'Cú pháp đơn giản và phổ biến nhất để duyệt các khóa theo thứ tự là vòng lặp for k in sorted(D):.',
    'Toán tử == so sánh nội dung và bỏ qua thứ tự chèn; toán tử so sánh độ lớn < và > bị cấm trên Dictionary trong Python 3.'
  ],

  nextSteps: 'Trong bài học cuối cùng của Chương 8 (C8.22), chúng ta sẽ khám phá Khung chuyên đề: List vs Dictionary vs Set, Tóm tắt toàn diện chương và chinh phục Bộ 5 câu hỏi ôn tập kinh điển từ Mark Lutz.'
};