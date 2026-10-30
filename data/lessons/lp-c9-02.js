export default {
  id: 'lp-c9-02',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.2',
  title: 'Thao tác Tuple: Chuyển đổi list, sorted, Comprehension giả lập & Tính bất biến một cấp',
  subtitle: 'Kỹ thuật sắp xếp tuple, list comprehension và mô phỏng generator cho tuple, phương thức index và count, cùng nguyên lý bất biến một cấp độ sâu',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ 2 giải pháp sắp xếp tuple: chuyển đổi qua list rồi gọi phương thức sort(), hoặc dùng trực tiếp hàm dựng sẵn sorted().',
    'Hiểu rõ vì sao Python không có cú pháp "tuple comprehension" chính thức: biểu thức trong ngoặc đơn tạo ra một generator, và cách dùng hàm tuple() để buộc giải phóng giá trị.',
    'Thành thạo hai phương thức duy nhất của Tuple: index() để tìm vị trí bù xuất hiện đầu tiên (hỗ trợ vị trí bắt đầu) và count() để đếm số lần xuất hiện.',
    'Thấu suốt nguyên lý "Bất biến một cấp độ sâu" (Top-level immutability): quy tắc bất biến chỉ bảo vệ cấu trúc mảng tham chiếu ngoài cùng của tuple, các đối tượng khả biến lồng bên trong (như list) vẫn có thể bị sửa đổi tại chỗ.'
  ],

  intuition: {
    title: 'Khung ảnh khóa kín chứa trang giấy viết chì',
    metaphor: 'Hãy tưởng tượng Tuple giống như một chiếc khung ảnh được bọc kính và bắt ốc vít cố định (bất biến một cấp). Bạn không thể tháo ốc vít ra để đổi vị trí hay chèn thêm bức tranh mới vào khung (lỗi TypeError khi gán chỉ mục). Tuy nhiên, nếu một trong những bức tranh bên trong khung là một trang giấy viết bằng bút chì (một list khả biến), bạn hoàn toàn có thể dùng đầu tẩy luồn qua khe để sửa đổi nội dung trên trang giấy đó mà không hề làm nứt vỡ hay thay đổi chiếc khung kính bên ngoài! Khung ảnh vẫn đang giữ nguyên vẹn chính bức tranh đó (cùng địa chỉ ô nhớ), chỉ có nét chữ chì bên trong bức tranh là đã thay đổi.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">NGUYÊN LÝ BẤT BIẾN MỘT CẤP ĐỘ SÂU (TOP-LEVEL IMMUTABILITY)</div>
        <div style="display:flex;justify-content:center;gap:12px;align-items:center;flex-wrap:wrap;">
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Tuple T = (1, [2, 3], 4)</div>
            <div style="display:flex;gap:6px;justify-content:center;">
              <span style="padding:6px 10px;background:var(--accent-soft);border-radius:4px;">T[0]: 1</span>
              <span style="padding:6px 10px;background:#f59e0b;color:#fff;border-radius:4px;font-weight:700;">T[1]: List [2, 3]</span>
              <span style="padding:6px 10px;background:var(--accent-soft);border-radius:4px;">T[2]: 4</span>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="padding:8px 12px;background:rgba(239,68,68,0.1);border:1px solid #ef4444;border-radius:6px;font-size:0.8rem;">
              ❌ <code>T[1] = 'mod'</code> ➔ <strong>TypeError</strong> (Không đổi được con trỏ cấp cao nhất)
            </div>
            <div style="padding:8px 12px;background:rgba(16,185,129,0.1);border:1px solid #10b981;border-radius:6px;font-size:0.8rem;">
              ✅ <code>T[1][0] = 'mod'</code> ➔ <strong>Hợp lệ!</strong> (Sửa list khả biến bên trong)
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Kỹ Thuật Chuyển Đổi & Sắp Xếp Tuple',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 5 / 48 – Trang 6 / 48</strong>.</p>
          </div>
        </div>

        <p>Bên cạnh cú pháp hằng số bằng chữ, các thao tác với tuple hoàn toàn đồng nhất với chuỗi và list. Những điểm khác biệt then chốt cần ghi nhớ:</p>
        <ul>
          <li>Các phép toán <code>+</code>, <code>*</code> và cắt lát <code>[:]</code> khi áp dụng cho tuple sẽ luôn trả về một đối tượng tuple mới.</li>
          <li>Tuple không hỗ trợ phương thức <code>sort()</code> tại chỗ. Nếu muốn sắp xếp một tuple, bạn có hai lựa chọn kinh điển:</li>
        </ul>
        <ol>
          <li><strong>Chuyển đổi thủ công:</strong> Dùng <code>list(T)</code> để tạo một bản sao list khả biến, gọi phương thức <code>sort()</code> tại chỗ trên list đó, rồi chuyển đổi ngược lại thành tuple bằng <code>tuple(...)</code>.</li>
          <li><strong>Dùng hàm dựng sẵn sorted():</strong> Hàm <code>sorted()</code> chấp nhận bất kỳ đối tượng dãy tuần tự (hoặc iterable) nào và trả về một list đã sắp xếp, tiết kiệm số bước viết mã.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Sắp xếp tuple qua chuyển đổi list và hàm dựng sẵn sorted()',
          code: `T = ('cc', 'aa', 'dd', 'bb')

# Cách 1: Chuyển thành list -> sort() -> chuyển ngược về tuple
tmp = list(T)           # Tạo list mới từ các phần tử của tuple
tmp.sort()              # Sắp xếp tại chỗ trên list
T_sorted = tuple(tmp)   # Đóng gói ngược lại thành tuple
print("Cách 1 (chuyển đổi):", T_sorted)

# Cách 2: Sử dụng hàm dựng sẵn sorted() với tham số đảo ngược
res = sorted(T, reverse=True)
print("Cách 2 (sorted list):", res)
print("Cách 2 (tuple hóa):", tuple(res))`,
          output: `Cách 1 (chuyển đổi): ('aa', 'bb', 'cc', 'dd')
Cách 2 (sorted list): ['dd', 'cc', 'bb', 'aa']
Cách 2 (tuple hóa): ('dd', 'cc', 'bb', 'aa')`,
          annotations: [
            { line: 4, text: 'list(T) sao chép các tham chiếu của T sang một list mới.' },
            { line: 5, text: 'tmp.sort() sắp xếp tại chỗ không trả về giá trị (trả về None).' },
            { line: 10, text: 'sorted(T) luôn trả về một đối tượng list mới.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. List Comprehension & Giả Lập Comprehension cho Tuple',
      content: `
        <p>Biểu thức list comprehension luôn xây dựng các list mới, nhưng chúng có thể duyệt lặp qua bất kỳ đối tượng dãy tuần tự nào, bao gồm cả tuple. Ví dụ, chúng ta có thể tạo một list mới từ một tuple đồng thời thực hiện biến đổi toán học trên từng phần tử:</p>

        <p>Tuy nhiên, <strong>không có khái niệm "tuple comprehension" chính thức trong Python</strong>! Nếu bạn đặt một biểu thức comprehension bên trong cặp dấu ngoặc đơn <code>(x for x in T)</code>, Python sẽ không sinh ra một tuple mà sẽ tạo ra một <strong>máy sinh (generator)</strong> — một đối tượng sinh phần tử tuần tự theo yêu cầu (on-demand) mà chúng ta sẽ tìm hiểu kỹ ở các chương sau.</p>

        <p>Để tạo ra một tuple từ biểu thức comprehension, bạn chỉ việc truyền biểu thức generator đó vào hàm tạo <code>tuple(...)</code> để buộc nó giải phóng toàn bộ các giá trị:</p>
      `,
      codeExamples: [
        {
          title: 'Duyệt tuple bằng comprehension và giả lập tuple comprehension',
          code: `T = (1, 2, 3, 4, 5)

# List comprehension duyệt qua tuple
L = [x + 20 for x in T]
print("List comprehension từ tuple:", L)

# Dấu ngoặc đơn tạo Generator (máy sinh), không tạo tuple
gen = (x + 20 for x in T)
print("Biểu thức ngoặc đơn là Generator:", gen)

# Ép kiểu generator thành tuple để tạo ra tuple comprehension thực sự
T_new = tuple(x + 20 for x in T)
print("Tuple comprehension giả lập:", T_new)`,
          output: `List comprehension từ tuple: [21, 22, 23, 24, 25]
Biểu thức ngoặc đơn là Generator: <generator object <genexpr> at ...>
Tuple comprehension giả lập: (21, 22, 23, 24, 25)`,
          annotations: [
            { line: 4, text: 'List comprehension luôn tạo một list mới, duyệt qua tuple T.' },
            { line: 8, text: '(x for x in T) là generator expression, sinh phần tử lười (lazy).' },
            { line: 12, text: 'tuple(...) ép generator sinh toàn bộ phần tử và đóng vào tuple.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Hai Phương Thức Duy Nhất của Tuple: index() và count()',
      content: `
        <p>Mặc dù không có các phương thức phong phú như list, tuple có riêng cho mình hai phương thức tìm kiếm và thống kê — <code>index()</code> và <code>count()</code>. Chúng hoạt động giống hệt như trên list:</p>

        <ul>
          <li><code>T.index(value, [start, [stop]])</code>: Tìm kiếm và trả về vị trí bù (chỉ mục) xuất hiện đầu tiên của <code>value</code>. Bạn có thể truyền thêm đối số vị trí bù bắt đầu để tìm kiếm sau một offset nhất định. Báo lỗi <code>ValueError</code> nếu không tìm thấy.</li>
          <li><code>T.count(value)</code>: Đếm tổng số lần xuất hiện của <code>value</code> trong toàn bộ tuple. Trả về 0 nếu không xuất hiện.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Minh họa phương thức index và count của Tuple',
          code: `T = (1, 2, 3, 2, 4, 2)

print("Tập hợp tuple:", T)
print("Chỉ mục xuất hiện đầu tiên của 2:", T.index(2))
print("Chỉ mục của 2 sau vị trí bù 2:", T.index(2, 2))
print("Số lần xuất hiện của số 2:", T.count(2))
print("Số lần xuất hiện của số 99:", T.count(99))`,
          output: `Tập hợp tuple: (1, 2, 3, 2, 4, 2)
Chỉ mục xuất hiện đầu tiên của 2: 1
Chỉ mục của 2 sau vị trí bù 2: 3
Số lần xuất hiện của số 2: 3
Số lần xuất hiện của số 99: 0`,
          annotations: [
            { line: 4, text: 'T.index(2) tìm từ đầu (offset 0), tìm thấy 2 ở vị trí 1.' },
            { line: 5, text: 'T.index(2, 2) bắt đầu tìm từ offset 2, tìm thấy 2 tiếp theo ở offset 3.' },
            { line: 6, text: 'T.count(2) duyệt toàn bộ tuple và đếm được 3 phần tử mang giá trị 2.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Tính Bất Biến Một Cấp Độ Sâu (Top-Level Immutability)',
      content: `
        <p>Như tác giả Mark Lutz nhấn mạnh ở trang 7, một quy tắc cực kỳ quan trọng về tính bất biến của tuple là: <strong>Quy tắc này chỉ áp dụng cho cấp độ cao nhất của chính bản thân tuple đó, chứ không áp dụng đệ quy cho nội dung bên trong các phần tử của nó</strong>.</p>

        <p>Nếu bạn đặt một đối tượng khả biến (như list hoặc dictionary) bên trong một tuple, bản thân đối tượng list đó vẫn có thể bị thay đổi tại chỗ như bình thường. Thao tác này hoàn toàn hợp lệ vì địa chỉ tham chiếu của list lưu trong tuple không hề thay đổi — chỉ có các phần tử bên trong đối tượng list đó bị biến đổi:</p>
      `,
      codeExamples: [
        {
          title: 'Bất biến một cấp độ sâu: Thay đổi list khả biến nằm bên trong tuple',
          code: `T = (1, [2, 3], 4)

# Thử thay đổi trực tiếp phần tử cấp 1 của tuple
try:
    T[1] = 'mod'
except TypeError as err:
    print("Lỗi khi sửa tuple:", err)

# Nhưng sửa đổi đối tượng list bên trong tuple thì hoàn toàn được phép!
T[1][0] = 'mod'
print("Tuple sau khi sửa list con:", T)

# Thậm chí có thể mở rộng list con bên trong tuple
T[1].append(99)
print("Tuple sau khi append vào list con:", T)`,
          output: `Lỗi khi sửa tuple: 'tuple' object does not support item assignment
Tuple sau khi sửa list con: (1, ['mod', 3], 4)
Tuple sau khi append vào list con: (1, ['mod', 3, 99], 4)`,
          annotations: [
            { line: 5, text: 'T[1] = ... cố gắng gán lại con trỏ của tuple -> Bị chặn bởi TypeError.' },
            { line: 10, text: 'T[1][0] = ... gọi thao tác gán chỉ mục trên list con -> Hoàn toàn hợp lệ.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tính bất biến một cấp độ sâu là đủ cho hầu hết ứng dụng',
        content: 'Trong phần lớn các hệ thống, việc bảo vệ các tham chiếu ở cấp cao nhất của tuple đã đủ để đảm bảo toàn vẹn cấu trúc bản ghi và ngăn ngừa lỗi vô tình gán đè.'
      }
    ],
    pitfalls: [
      {
        title: 'Cẩn trọng khi dùng Tuple chứa List làm khóa Dictionary',
        content: 'Một tuple chỉ có thể được dùng làm khóa cho dictionary nếu TOÀN BỘ các phần tử bên trong nó đều là đối tượng bất biến (hashable). Một tuple chứa list như <code>(1, [2, 3])</code> sẽ báo lỗi <code>TypeError: unhashable type: \'list\'</code> khi dùng làm khóa!'
      }
    ]
  },

  exercises: [
    {
      title: 'Đếm tần suất và sắp xếp tuple các chuỗi',
      level: 'Vừa',
      problem: 'Cho một tuple: T = (\'apple\', \'banana\', \'apple\', \'cherry\', \'apple\', \'banana\'). Hãy viết mã Python: (1) Đếm xem \'apple\' xuất hiện bao nhiêu lần; tìm vị trí bù của \'apple\' xuất hiện sau offset 1. (2) Sắp xếp tuple trên theo thứ tự bảng chữ cái ngược và lưu kết quả vào một tuple mới.',
      hint: 'Dùng T.count(\'apple\'), T.index(\'apple\', 1) và sorted(T, reverse=True).',
      solutionCode: `T = ('apple', 'banana', 'apple', 'cherry', 'apple', 'banana')

apple_count = T.count('apple')
apple_second_idx = T.index('apple', 1)
print(f"Số lần xuất hiện của 'apple': {apple_count}")
print(f"Vị trí bù xuất hiện lần hai của 'apple': {apple_second_idx}")

sorted_tup = tuple(sorted(T, reverse=True))
print("Tuple sau khi sắp xếp ngược:", sorted_tup)`,
      solutionOutput: `Số lần xuất hiện của 'apple': 3
Vị trí bù xuất hiện lần hai của 'apple': 2
Tuple sau khi sắp xếp ngược: ('cherry', 'banana', 'banana', 'apple', 'apple', 'apple')`,
      explanation: 'T.index(\'apple\', 1) bắt đầu tìm kiếm từ offset 1, bỏ qua phần tử đầu tiên tại offset 0 và tìm thấy \'apple\' kế tiếp ở offset 2.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn thực thi biểu thức g = (x * 2 for x in (1, 2, 3)), biến g sẽ lưu đối tượng kiểu gì?',
      options: [
        'tuple chứa (2, 4, 6)',
        'list chứa [2, 4, 6]',
        'generator object (máy sinh biểu thức)',
        'Lỗi SyntaxError vì không có tuple comprehension'
      ],
      correctIndex: 2,
      explanation: 'Cú pháp (expr for x in iterable) trong Python được định nghĩa riêng để tạo ra generator expression, không tạo ra tuple. Để có tuple, phải bao bọc bằng tuple(...).'
    },
    {
      question: 'Cho T = (10, [20, 30], 40). Câu lệnh nào sau đây sẽ gây ra lỗi TypeError?',
      options: [
        'T[1][0] = 99',
        'T[1].append(400)',
        'T[1] = [20, 30]',
        'del T[1][1]'
      ],
      correctIndex: 2,
      explanation: 'T[1] = ... cố gắng gán lại một phần tử cấp cao nhất của tuple, hành động này bị cấm vì tuple là bất biến. Ba thao tác còn lại chỉ sửa đổi nội dung bên trong list con T[1].'
    }
  ],

  summary: [
    'Để sắp xếp một tuple, bạn có thể chuyển đổi thành list rồi gọi sort(), hoặc dùng hàm dựng sẵn sorted(T) để có ngay kết quả đã sắp xếp.',
    'Python không có cú pháp tuple comprehension chính thức; biểu thức trong dấu ngoặc đơn sinh ra một generator, cần truyền qua tuple(...) để thu được tuple kết quả.',
    'Tuple cung cấp hai phương thức tìm kiếm và thống kê: index() (hỗ trợ tham số start) và count().',
    'Tính bất biến của tuple chỉ mang tính một cấp độ sâu: cấu trúc con trỏ của tuple không đổi, nhưng các đối tượng khả biến nằm bên trong nó vẫn có thể thay đổi tại chỗ bình thường.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.3), chúng ta sẽ trả lời câu hỏi kinh điển: Tại sao Python lại cần cả List lẫn Tuple? Đồng thời khám phá kiểu mở rộng Named Tuple (collections.namedtuple) giúp kết hợp sức mạnh truy cập theo vị trí và theo tên thuộc tính.'
};
