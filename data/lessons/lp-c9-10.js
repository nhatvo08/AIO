export default {
  id: 'lp-c9-10',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.10',
  title: 'Tính linh hoạt của đối tượng: Cây lồng nhau & Phép gán Tham chiếu vs Bản sao (copy/deepcopy)',
  subtitle: 'Cấu trúc lồng nhau tùy ý, mô hình cây đối tượng Hình 9-1, đối tượng được chia sẻ Hình 9-2, và kỹ thuật tạo bản sao nông vs bản sao sâu',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững tính linh hoạt vượt trội của các đối tượng phức hợp trong Python: lồng ghép tùy ý, tự do co giãn kích thước để mô hình hóa mọi cấu trúc thông tin thực tế.',
    'Phân tích chi tiết Hình 9-1: cấu trúc cây đối tượng dãy tuần tự phức hợp lồng nhau và cơ chế đánh chỉ mục đa tầng từ trái sang phải.',
    'Khắc sâu nguyên lý nền tảng của Chương 6: phép gán trong Python LUÔN LUÔN lưu trữ con trỏ tham chiếu tới đối tượng, không bao giờ tự động tạo ra bản sao.',
    'Phân tích sâu sắc Hình 9-2: hiện tượng Đối tượng được chia sẻ (Shared mutable object) khi nhiều biến cùng tham chiếu tới một list, và tác dụng phụ lan truyền khi thay đổi tại chỗ.',
    'Thành thạo các giải pháp tạo bản sao để ngắt chia sẻ tham chiếu: lát cắt giới hạn rỗng L[:], phương thức copy(), và phân biệt rõ ràng giữa Bản sao nông (Shallow copy) và Bản sao sâu đệ quy (Deep copy với copy.deepcopy()).'
  ],

  intuition: {
    title: 'Nhiều chiếc chìa khóa cùng mở một căn phòng và Bản photocopy hồ sơ',
    metaphor: 'Khi bạn gán một danh sách `X = [1, 2, 3]` rồi nhúng vào một biến khác `L = [\'a\', X, \'b\']`, hãy tưởng tượng bạn không hề xây thêm một căn phòng mới nào cả. `[1, 2, 3]` là một căn phòng duy nhất trên đĩa nhớ RAM, và biến `X` đang cầm chiếc chìa khóa số 1 mở căn phòng đó. Khi bạn nhúng `X` vào `L`, bạn chỉ đơn giản trao cho `L` chiếc chìa khóa số 2 mở chính căn phòng đó! Nếu người cầm chìa khóa `X` bước vào phòng và sơn lại bức tường thành màu đỏ (`X[1] = \'surprise\'`), thì khi người cầm chìa khóa `L` mở cửa bước vào, căn phòng trước mắt họ đương nhiên cũng đã đổi sang màu đỏ! Để tránh tác dụng phụ này, bạn bắt buộc phải tạo ra một "bản sao photocopy" độc lập (`L = [\'a\', X[:], \'b\']`) — một căn phòng mới hoàn toàn ở địa chỉ khác.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH THAM CHIẾU ĐƯỢC CHIA SẺ (HÌNH 9-2 TRONG GIÁO TRÌNH)</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:16px;flex-wrap:wrap;">
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="padding:6px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;font-weight:700;">Biến L: ['a', X, 'b']</div>
            <div style="padding:6px 12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:6px;font-weight:700;color:var(--accent-primary);">Biến X</div>
            <div style="padding:6px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;font-weight:700;">Biến D: {'x': X, 'y': 2}</div>
          </div>
          <div style="font-size:1.4rem;color:var(--accent-primary);">➔ ➔ ➔</div>
          <div style="padding:14px 20px;background:var(--bg-surface);border:2px dashed #ef4444;border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:#ef4444;margin-bottom:6px;">Đối tượng List chung duy nhất trong RAM</div>
            <div style="display:flex;gap:6px;justify-content:center;">
              <span style="padding:6px 10px;background:rgba(239,68,68,0.1);border-radius:4px;">1</span>
              <span style="padding:6px 10px;background:#ef4444;color:#fff;border-radius:4px;font-weight:700;">? ('surprise')</span>
              <span style="padding:6px 10px;background:rgba(239,68,68,0.1);border-radius:4px;">3</span>
            </div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;">Thay đổi qua X làm thay đổi cả L và D!</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tính Linh Hoạt của Đối Tượng & Cây Lồng Nhau Đa Tầng (Hình 9-1)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 26 / 48 – Trang 27 / 48</strong>.</p>
          </div>
        </div>

        <p>Phần này của cuốn sách đã giới thiệu một số kiểu đối tượng phức hợp — các tập hợp chứa các phần tử thành phần. Nhìn chung:</p>
        <ul>
          <li>List, dictionary và tuple có thể chứa bất kỳ loại đối tượng nào.</li>
          <li>Set có thể chứa bất kỳ kiểu đối tượng bất biến nào.</li>
          <li>List, dictionary và tuple có thể lồng nhau tùy ý đến độ sâu bất kỳ.</li>
          <li>List, dictionary và set có thể tự động tăng giảm kích thước linh hoạt.</li>
        </ul>

        <p><strong>Hình 9-1</strong> trong giáo trình phác họa một cây các đối tượng dãy tuần tự phức hợp lồng nhau: <code>L = ['abc', [(1, 2), ([3], 4)], 5]</code>. Để truy cập các thành phần của nó, bạn có thể đưa vào bao nhiêu thao tác chỉ mục tùy thích. Python đánh giá các chỉ mục từ trái sang phải và lấy về một tham chiếu tới đối tượng lồng sâu hơn ở mỗi bước:</p>
      `,
      codeExamples: [
        {
          title: 'Truy xuất các phần tử trong cây đối tượng lồng nhau đa tầng (Hình 9-1)',
          code: `# Cây đối tượng lồng nhau gồm List, Tuple và Chuỗi (Hình 9-1)
L = ['abc', [(1, 2), ([3], 4)], 5]

print("Cấp 0 (toàn bộ L):", L)
print("Chỉ mục L[1] (danh sách con):", L[1])
print("Chỉ mục L[1][1] (tuple con thứ hai):", L[1][1])
print("Chỉ mục L[1][1][0] (list con chứa 3):", L[1][1][0])
print("Chỉ mục sâu nhất L[1][1][0][0] (số 3):", L[1][1][0][0])`,
          output: `Cấp 0 (toàn bộ L): ['abc', [(1, 2), ([3], 4)], 5]
Chỉ mục L[1] (danh sách con): [(1, 2), ([3], 4)]
Chỉ mục L[1][1] (tuple con thứ hai): ([3], 4)
Chỉ mục L[1][1][0] (list con chứa 3): [3]
Chỉ mục sâu nhất L[1][1][0][0] (số 3): 3`,
          annotations: [
            { line: 2, text: 'L chứa 3 phần tử cấp cao nhất: chuỗi \'abc\', list con, và số 5.' },
            { line: 6, text: 'L[1][1] lấy phần tử thứ hai của list con, là một tuple ([3], 4).' },
            { line: 8, text: 'L[1][1][0][0] truy xuất sâu 4 cấp để lấy ra số nguyên 3.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Tham Chiếu so với Bản Sao & Hiện Tượng Đối Tượng Được Chia Sẻ (Hình 9-2)',
      content: `
        <p>Chương 6 đã đề cập rằng <strong>các phép gán luôn luôn lưu trữ tham chiếu tới các đối tượng, chứ không phải bản sao của những đối tượng đó</strong>. Trong thực tế, đây thường là điều bạn mong muốn vì nó giúp truyền nhận các cấu trúc dữ liệu khổng lồ đi khắp chương trình mà không tiêu tốn tài nguyên sao chép.</p>

        <p>Tuy nhiên, vì các phép gán có thể tạo ra nhiều tham chiếu cùng trỏ tới một đối tượng, điều tối quan trọng là bạn phải nhận thức được rằng: <strong>việc thay đổi một đối tượng khả biến tại chỗ có thể ảnh hưởng tới tất cả các tham chiếu khác trỏ tới cùng đối tượng đó ở những nơi khác trong chương trình của bạn</strong>.</p>

        <p>Tình huống này được minh họa trong <strong>Hình 9-2</strong>: biến <code>X</code> là một list, và tham chiếu của nó được nhúng đồng thời vào bên trong list <code>L</code> và dictionary <code>D</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Đối tượng được chia sẻ: thay đổi từ X khiến L và D cùng thay đổi (Hình 9-2)',
          code: `# Khởi tạo list X và nhúng tham chiếu của nó vào L và D
X = [1, 2, 3]
L = ['a', X, 'b']          # Nhúng tham chiếu của X vào list L
D = {'x': X, 'y': 2}       # Nhúng tham chiếu của X vào dict D

print("Trước khi thay đổi:")
print("L =", L)
print("D =", D)

# Thay đổi đối tượng list X tại chỗ thông qua chỉ mục
X[1] = 'surprise'

print("--- Sau khi thực hiện lệnh: X[1] = 'surprise' ---")
print("L =", L)
print("D =", D)
print("Cả ba có cùng trỏ vào một đối tượng không?")
print("L[1] is X:", L[1] is X, "| D['x'] is X:", D['x'] is X)`,
          output: `Trước khi thay đổi:
L = ['a', [1, 2, 3], 'b']
D = {'x': [1, 2, 3], 'y': 2}
--- Sau khi thực hiện lệnh: X[1] = 'surprise' ---
L = ['a', [1, 'surprise', 3], 'b']
D = {'x': [1, 'surprise', 3], 'y': 2}
Cả ba có cùng trỏ vào một đối tượng không?
L[1] is X: True | D['x'] is X: True`,
          annotations: [
            { line: 3, text: 'L[1] lưu chính tham chiếu tới đối tượng X.' },
            { line: 4, text: 'D[\'x\'] cũng lưu chính tham chiếu tới X.' },
            { line: 11, text: 'X[1] thay đổi phần tử tại chỗ mà không tạo list mới.' },
            { line: 18, text: 'Toán tử is trả về True xác nhận cả 3 biến cùng dùng chung một ô nhớ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Các Kỹ Thuật Tạo Bản Sao Nông (Shallow Copy) Để Tránh Tác Dụng Phụ',
      content: `
        <p>Nếu bạn thực sự muốn tránh các tác dụng phụ tiềm ẩn của các tham chiếu được chia sẻ, bạn có thể yêu cầu tạo bản sao theo một trong nhiều cách sau:</p>

        <ul>
          <li><strong>Biểu thức cắt lát với các giới hạn rỗng (<code>L[:]</code>):</strong> Sao chép toàn bộ các phần tử của dãy tuần tự để tạo ra một list mới.</li>
          <li><strong>Phương thức sao chép <code>copy()</code> của dictionary, set và list:</strong> <code>X.copy()</code> tạo bản sao độc lập của đối tượng.</li>
          <li><strong>Các hàm dựng sẵn tạo bản sao:</strong> <code>list(L)</code>, <code>dict(D)</code>, <code>set(S)</code>.</li>
        </ul>

        <p>Bằng cách này, các thay đổi được thực hiện từ các biến khác sẽ chỉ làm thay đổi bản sao chứ không làm đổi bản gốc:</p>
      `,
      codeExamples: [
        {
          title: 'Ngắt chia sẻ tham chiếu bằng bản sao nông (Shallow Copy)',
          code: `# Dùng bản sao để tránh tác dụng phụ
X = [1, 2, 3]
L = ['a', X[:], 'b']       # Nhúng bản sao nông của X bằng X[:]
D = {'x': X.copy(), 'y': 2}# Nhúng bản sao nông của X bằng .copy()

# Thay đổi X
X[1] = 'surprise'

print("X =", X)
print("L (không bị ảnh hưởng):", L)
print("D (không bị ảnh hưởng):", D)
print("L[1] is X?", L[1] is X)`,
          output: `X = [1, 'surprise', 3]
L (không bị ảnh hưởng): ['a', [1, 2, 3], 'b']
D (không bị ảnh hưởng): {'x': [1, 2, 3], 'y': 2}
L[1] is X? False`,
          annotations: [
            { line: 3, text: 'X[:] tạo một list mới chứa cùng các phần tử.' },
            { line: 4, text: 'X.copy() tạo một bản sao độc lập.' },
            { line: 12, text: 'L[1] is X trả về False: hai vùng nhớ hoàn toàn độc lập.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Bản Sao Sâu Đệ Quy (Deep Copy) Bằng Module copy',
      content: `
        <p>Một lưu ý sống còn về các bản sao: <strong>lát cắt giới hạn rỗng <code>L[:]</code> và phương thức <code>copy()</code> chỉ tạo các bản sao cấp cao nhất (bản sao nông - shallow copy)</strong>; nghĩa là chúng không sao chép đệ quy các cấu trúc dữ liệu lồng nhau nếu có.</p>

        <p>Nếu bạn có một cấu trúc dữ liệu lồng nhau nhiều tầng sâu và bạn cần một bản sao hoàn chỉnh, hoàn toàn độc lập đến tận các nhánh lá con, bạn bắt buộc phải sử dụng module <code>copy</code> của thư viện chuẩn với hàm <code>copy.deepcopy()</code>:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh Bản sao nông (shallow copy) và Bản sao sâu (copy.deepcopy)',
          code: `import copy

# Cấu trúc dữ liệu lồng nhau 2 tầng
original = [1, [2, 3], 4]

# 1. Bản sao nông (Shallow copy)
shallow = original[:]

# 2. Bản sao sâu (Deep copy)
deep = copy.deepcopy(original)

# Thay đổi phần tử trong list con lồng nhau
original[1][0] = 'MODIFIED'

print("Bản gốc original:", original)
print("Bản sao nông shallow (bị thay đổi theo!):", shallow)
print("Bản sao sâu deep (hoàn toàn miễn nhiễm):", deep)`,
          output: `Bản gốc original: [1, ['MODIFIED', 3], 4]
Bản sao nông shallow (bị thay đổi theo!): [1, ['MODIFIED', 3], 4]
Bản sao sâu deep (hoàn toàn miễn nhiễm): [1, [2, 3], 4]`,
          annotations: [
            { line: 7, text: 'original[:] chỉ sao chép mảng ngoài, list con [2, 3] vẫn dùng chung.' },
            { line: 10, text: 'copy.deepcopy đệ quy sao chép cả mảng ngoài lẫn mọi list con bên trong.' },
            { line: 17, text: 'deep giữ nguyên vẹn [2, 3] không bị tác động.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào cần deepcopy?',
        content: 'Hầu hết các tác vụ thông thường chỉ cần bản sao nông (shallow copy) qua <code>L[:]</code> hoặc <code>D.copy()</code> là đủ và đạt hiệu năng cao. Chỉ sử dụng <code>copy.deepcopy()</code> khi bạn thao tác trên các bản ghi phức tạp có nhiều tầng lồng nhau mà bạn không muốn bất kỳ nhánh con nào bị chia sẻ.'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy Shallow copy với cấu trúc lồng nhau',
        content: 'Rất nhiều lập trình viên nghĩ rằng <code>L.copy()</code> đã là một bản sao độc lập hoàn toàn, nhưng quên mất rằng các list con bên trong vẫn là các tham chiếu dùng chung. Thay đổi một phần tử trong list con sẽ làm thay đổi cả hai bản!'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo bản sao nông và bản sao sâu cho ma trận 2D',
      level: 'Vừa',
      problem: 'Cho ma trận matrix = [[1, 2], [3, 4]]. Hãy viết mã Python: (1) Tạo bản sao nông s_copy bằng phương thức .copy(). (2) Tạo bản sao sâu d_copy bằng copy.deepcopy(). (3) Thay đổi phần tử matrix[0][0] = 99 và in ra s_copy cùng d_copy để kiểm chứng sự khác biệt.',
      hint: 'Import module copy; dùng copy.deepcopy(matrix).',
      solutionCode: `import copy

matrix = [[1, 2], [3, 4]]
s_copy = matrix.copy()
d_copy = copy.deepcopy(matrix)

matrix[0][0] = 99

print("Bản gốc sau sửa:", matrix)
print("Shallow copy:", s_copy)
print("Deep copy:", d_copy)`,
      solutionOutput: `Bản gốc sau sửa: [[99, 2], [3, 4]]
Shallow copy: [[99, 2], [3, 4]]
Deep copy: [[1, 2], [3, 4]]`,
      explanation: 's_copy dùng chung tham chiếu tới hàng đầu [1, 2], nên khi sửa matrix[0][0] thì s_copy[0][0] cũng đổi thành 99. d_copy nhân bản độc lập toàn bộ các hàng con nên bảo toàn số 1.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây mô tả ĐÚNG NHẤT về cơ chế gán biến trong Python (ví dụ: B = A)?',
      options: [
        'Python luôn sao chép toàn bộ vùng nhớ của A sang một vùng nhớ mới cấp phát cho B.',
        'Python chỉ lưu trữ một con trỏ tham chiếu từ biến B trỏ tới cùng đối tượng mà A đang trỏ tới.',
        'Nếu A là số thì tạo tham chiếu, nếu A là list thì tự động tạo bản sao.',
        'Biến B chỉ tồn tại trong phạm vi cục bộ của hàm.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, phép gán biến B = A luôn luôn lưu trữ một tham chiếu tới cùng đối tượng hiện có, không bao giờ tự động tạo ra bản sao.'
    },
    {
      question: 'Thao tác nào sau đây tạo ra một Bản sao sâu hoàn toàn độc lập (Deep copy) của một danh sách lồng nhau?',
      options: [
        'B = A[:]',
        'B = A.copy()',
        'B = list(A)',
        'B = copy.deepcopy(A)'
      ],
      correctIndex: 3,
      explanation: 'Cả A[:], A.copy() và list(A) đều chỉ tạo bản sao nông (shallow copy) ở cấp cao nhất. Chỉ có hàm copy.deepcopy() mới thực hiện sao chép đệ quy mọi cấp độ sâu.'
    }
  ],

  summary: [
    'Đối tượng phức hợp trong Python có tính linh hoạt cao: lồng nhau tùy ý đến độ sâu bất kỳ và tự động co giãn kích thước (Hình 9-1).',
    'Phép gán luôn lưu trữ tham chiếu; nhiều biến trỏ cùng vào một đối tượng khả biến sẽ tạo ra hiện tượng chia sẻ tham chiếu (Hình 9-2).',
    'Để tránh tác dụng phụ ngoài ý muốn, sử dụng các phép tạo bản sao nông: L[:], D.copy(), list(L).',
    'Bản sao nông chỉ sao chép cấp ngoài cùng; đối với các cấu trúc lồng nhau đa tầng, bắt buộc phải dùng copy.deepcopy() của module copy để sao chép đệ quy toàn diện.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.11), chúng ta sẽ khám phá cơ chế So sánh đối tượng trong Python: so sánh đệ quy, phân biệt sâu sắc giữa toán tử tương đương giá trị (==) và toán tử định danh đối tượng (is), hiện tượng lưu đệm chuỗi ngắn, cùng Bảng 9-4 về Giá trị chân lý (Truthiness).'
};
