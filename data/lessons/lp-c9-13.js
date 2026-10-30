export default {
  id: 'lp-c9-13',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.13',
  title: 'Bốn cạm bẫy kinh điển của kiểu dựng sẵn: Tham chiếu chia sẻ, Nhân bản lồng, Cấu trúc vòng & Bất biến',
  subtitle: 'Phân tích sâu sắc 4 lỗi gài bẫy phổ biến nhất của Mark Lutz: tham chiếu chia sẻ ngoài ý muốn, phép nhân bản [L]*4 chỉ thêm 1 cấp, cấu trúc tham chiếu vòng cyclic object [...], và tính bất biến',
  level: 'Nâng cao',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân tích cặn kẽ Cạm bẫy 1: Tác dụng phụ khi các biến chia sẻ tham chiếu tới cùng đối tượng khả biến và phương pháp sao chép tường minh (L[:]) để cô lập dữ liệu.',
    'Thấu suốt cơ chế Cạm bẫy 2: Phép nhân bản lặp lại (*) chỉ thêm một cấp độ sâu; hiểu vì sao [L] * 4 hay [list(L)] * 4 vẫn tạo ra các hàng dùng chung tham chiếu, và làm chủ giải pháp duy nhất đúng: List Comprehension [list(L) for i in range(4)].',
    'Nhận diện Cạm bẫy 3: Cấu trúc dữ liệu tham chiếu vòng (Cyclic Object L.append(L)): hiểu ý nghĩa ký hiệu [...] của Python, nguy cơ sập chương trình do đệ quy vô hạn khi duyệt cây, và kỹ thuật duy trì tập hợp phần tử đã ghé thăm (visited set).',
    'Khắc phục Cạm bẫy 4: Lỗi sửa đổi đối tượng bất biến tại chỗ (T[2] = 4) bằng kỹ thuật cắt lát và ghép nối T = T[:2] + (4,), đồng thời nhận ra lợi thế miễn nhiễm tác dụng phụ tuyệt vời của các kiểu bất biến.'
  ],

  intuition: {
    title: 'Bốn hố cát ngụy trang trên bãi tập và Chiếc la bàn cảnh báo',
    metaphor: 'Khi bước đi trên con đường lập trình Python, có những hố cát được ngụy trang vô cùng khéo léo khiến ngay cả các lập trình viên kỳ cựu đôi khi cũng sảy chân. Hố cát thứ nhất là "ảo giác sở hữu riêng": bạn tưởng gán `M = [\'X\', L, \'Y\']` là tạo ra một bản ghi mới, nhưng thực chất `L` và `M` đang cùng chia sẻ một trái tim chung. Hố cát thứ hai là "nhân bản ảo": bạn viết `[[0]] * 4` với hy vọng tạo ra một bảng cờ 4 hàng độc lập, nhưng thực chất bạn chỉ đang nhân bản 4 chiếc chìa khóa cùng mở một ngăn kéo! Hố cát thứ ba là "con rắn tự cắn đuôi mình" (vòng lặp tham chiếu vòng lặp vô tận). Và hố cát thứ tư là "cố đập phá khối đá hoa cương" (sửa đối tượng bất biến). Bài học này sẽ cắm 4 biển báo phát quang rực rỡ giúp bạn tự tin vượt qua mọi hố cát hiểm trở!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BỐN CẠM BẪY ĐỐI TƯỢNG KINH ĐIỂN VÀ GIẢI PHÁP CHUẨN XÁC</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #ef4444;border-radius:6px;">
            <div style="font-weight:700;color:#ef4444;">1. Tham chiếu chia sẻ</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;"><code>L[1] = 0</code> làm đổi cả biến M.<br>➔ <strong>Giải pháp:</strong> Sao chép <code>M = ['X', L[:], 'Y']</code></div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #f59e0b;border-radius:6px;">
            <div style="font-weight:700;color:#f59e0b;">2. Nhân bản lồng 1 cấp</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;"><code>[list(L)] * 4</code> vẫn trỏ cùng 1 bản sao!<br>➔ <strong>Giải pháp:</strong> <code>[list(L) for _ in range(4)]</code></div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;">
            <div style="font-weight:700;color:#8b5cf6;">3. Tham chiếu vòng [...]</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;"><code>L.append(L)</code> trỏ lại chính nó.<br>➔ <strong>Giải pháp:</strong> Duy trì tập <code>visited</code> khi duyệt đệ quy</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #3b82f6;border-radius:6px;">
            <div style="font-weight:700;color:#3b82f6;">4. Sửa kiểu bất biến</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;"><code>T[2] = 4</code> báo TypeError.<br>➔ <strong>Giải pháp:</strong> Cắt lát ghép nối <code>T = T[:2] + (4,)</code></div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cạm Bẫy 1: Phép Gán Tạo Tham Chiếu, Không Phải Bản Sao',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 39 / 48 – Trang 40 / 48</strong>.</p>
          </div>
        </div>

        <p>Điều này có vẻ dư thừa, nhưng đây là một cạm bẫy quá đỗi phổ biến đến mức đáng để nhấn mạnh thêm một lần nữa: <strong>các tham chiếu được chia sẻ tới những đối tượng khả biến có thể gây ra vấn đề lớn</strong>.</p>

        <p>Ví dụ, trong đoạn mã sau, đối tượng list được gán cho tên <code>L</code> được tham chiếu đồng thời từ cả <code>L</code> lẫn từ bên trong list được gán cho tên <code>M</code>. Việc thay đổi <code>L</code> tại chỗ cũng sẽ làm thay đổi cả những gì <code>M</code> đang tham chiếu tới:</p>
      `,
      codeExamples: [
        {
          title: 'Cạm bẫy tham chiếu chia sẻ và giải pháp sao chép L[:]',
          code: `# Vấn đề: M chia sẻ cùng đối tượng list với L
L = [1, 2, 3]
M = ['X', L, 'Y']
print("M ban đầu:", M)

L[1] = 0               # Thay đổi L tại chỗ
print("M sau khi L thay đổi (bị đổi theo!):", M)

# Giải pháp: Sao chép tường minh bằng lát cắt L[:]
L = [1, 2, 3]
M = ['X', L[:], 'Y']   # Nhúng một bản sao cấp cao nhất của L
L[1] = 0               # Chỉ thay đổi L, không đổi M
print("L sau khi sửa:", L)
print("M hoàn toàn độc lập:", M)`,
          output: `M ban đầu: ['X', [1, 2, 3], 'Y']
M sau khi L thay đổi (bị đổi theo!): ['X', [1, 0, 3], 'Y']
L sau khi sửa: [1, 0, 3]
M hoàn toàn độc lập: ['X', [1, 2, 3], 'Y']`,
          annotations: [
            { line: 6, text: 'L[1] = 0 làm thay đổi đối tượng list mà M[1] cũng đang trỏ tới.' },
            { line: 11, text: 'L[:] trích xuất toàn bộ phần tử sang một list mới độc lập.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Cạm Bẫy 2: Phép Lặp (Nhân Bản) Chỉ Thêm Một Cấp Độ Sâu',
      content: `
        <p>Như chúng ta đã biết, việc nhân bản (lặp lại) một dãy tuần tự tương tự như việc cộng nó với chính nó một số lần. Tuy nhiên, khi các dãy tuần tự khả biến bị lồng ghép nhau, hiệu ứng thu được có thể không phải lúc nào cũng như bạn mong đợi.</p>

        <p>Một cách tinh vi, bởi vì <code>L</code> được đặt lồng nhau trong phép nhân bản <code>Y = [L] * 4</code>, <code>Y</code> kết cục sẽ <strong>nhúng 4 tham chiếu trỏ ngược về duy nhất một list ban đầu được gán cho L</strong>! Do đó, việc thay đổi <code>L[1] = 0</code> sẽ làm thay đổi cả 4 hàng trong <code>Y</code>!</p>

        <p>Thậm chí tinh vi hơn nữa, nếu bạn viết <code>Y = [list(L)] * 4</code>, mặc dù <code>Y</code> không còn chia sẻ đối tượng với <code>L</code> nữa, nó vẫn nhúng bốn tham chiếu cùng trỏ tới duy nhất một bản sao đó của nó. <strong>Nếu bạn bắt buộc phải tránh cả việc chia sẻ này, bạn phải sử dụng List Comprehension</strong>:</p>
      `,
      codeExamples: [
        {
          title: 'Khảo sát bẫy nhân bản lồng [L] * 4 và giải pháp chuẩn xác List Comprehension',
          code: `L = [4, 5, 6]
X = L * 4              # Ghép nối các phần tử: [4, 5, 6, 4, 5, 6, ...]
Y = [L] * 4            # Tạo list chứa 4 tham chiếu cùng trỏ tới L!

print("Y ban đầu:", Y)
L[1] = 0               # Tác động tới cả 4 hàng của Y!
print("Y sau khi L[1]=0:", Y)

# Nỗ lực sai lầm: Y = [list(L)] * 4 vẫn chia sẻ 1 bản sao duy nhất!
Y_still_shared = [list(L)] * 4
Y_still_shared[0][1] = 99
print("Cả 4 hàng vẫn bị đổi chung:", Y_still_shared)

# GIẢI PHÁP DUY NHẤT ĐÚNG: List Comprehension tạo 4 bản sao độc lập!
L = [4, 5, 6]
Y_independent = [list(L) for i in range(4)]
Y_independent[0][1] = 99
print("--- Sau khi dùng List Comprehension ---")
print("Chỉ hàng 0 thay đổi:", Y_independent)`,
          output: `Y ban đầu: [[4, 5, 6], [4, 5, 6], [4, 5, 6], [4, 5, 6]]
Y sau khi L[1]=0: [[4, 0, 6], [4, 0, 6], [4, 0, 6], [4, 0, 6]]
Cả 4 hàng vẫn bị đổi chung: [[4, 99, 6], [4, 99, 6], [4, 99, 6], [4, 99, 6]]
--- Sau khi dùng List Comprehension ---
Chỉ hàng 0 thay đổi: [[4, 99, 6], [4, 5, 6], [4, 5, 6], [4, 5, 6]]`,
          annotations: [
            { line: 3, text: '[L] * 4 nhân bản tham chiếu, không nhân bản đối tượng bên trong.' },
            { line: 10, text: '[list(L)] * 4 chỉ gọi list(L) 1 lần rồi nhân bản tham chiếu đó 4 lần.' },
            { line: 16, text: 'List comprehension chạy vòng for 4 lần, thực thi list(L) 4 lần độc lập!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cạm Bẫy 3: Cẩn Trọng Với Cấu Trúc Dữ Liệu Tham Chiếu Vòng (Cyclic Object)',
      content: `
        <p>Nếu một đối tượng tập hợp chứa một tham chiếu trỏ ngược lại chính nó, nó được gọi là một <strong>đối tượng tuần hoàn / tham chiếu vòng (cyclic object)</strong>. Python sẽ in ra ký hiệu <code>[...]</code> bất cứ khi nào nó phát hiện thấy một vòng lặp tham chiếu trong đối tượng quay trở lại chính nó, thay vì bị kẹt trong một vòng lặp vô hạn:</p>

        <div class="callout-box callout-pitfall">
          <div class="callout-header"><span>🌀 Nguy cơ thực tế từ tham chiếu vòng:</span> <span>Tràn ngăn xếp (RecursionError)</span></div>
          <div class="callout-body">
            <p>Bên cạnh việc hiểu rằng ba dấu chấm trong ngoặc vuông <code>[...]</code> đại diện cho một vòng lặp tham chiếu trong đối tượng (phòng khi chúng xuất hiện trong kết quả hoặc phỏng vấn), trường hợp này rất đáng để biết vì nó có thể dẫn đến những cạm bẫy thực sự:</p>
            <p>Các cấu trúc tham chiếu vòng có thể khiến các hàm đệ quy tự viết duyệt qua cấu trúc dữ liệu bị rơi vào các vòng lặp vô hạn và tràn ngăn xếp (RecursionError)! Để phòng tránh, các chương trình duyệt qua các cấu trúc dữ liệu phải duy trì một list, dictionary hoặc set chứa các phần tử đã ghé thăm (<em>visited set</em>) để kiểm tra trước khi tiếp tục đào sâu.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Tạo đối tượng tham chiếu vòng cyclic object và ký hiệu [...]',
          code: `# Tạo một list chứa một chuỗi
L = ['stuff']

# Nối thêm chính tham chiếu của L vào bên trong L
L.append(L)

print("Kết quả hiển thị của đối tượng cyclic L:")
print(L)

# Truy cập đệ quy vô hạn: L[1] chính là L, L[1][1] cũng chính là L!
print("L[1] is L?", L[1] is L)
print("L[1][1][0]:", L[1][1][0])`,
          output: `Kết quả hiển thị của đối tượng cyclic L:
['stuff', [...]]
L[1] is L? True
L[1][1][0]: stuff`,
          annotations: [
            { line: 5, text: 'L.append(L) tạo ra một chu trình tham chiếu khép kín.' },
            { line: 8, text: 'Python in [...] để ngắt hiển thị, tránh vòng lặp vô tận.' },
            { line: 11, text: 'L[1] is L là True vì phần tử thứ hai trỏ chính xác vào đối tượng L.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Cạm Bẫy 4: Các Kiểu Bất Biến Không Thể Thay Đổi Tại Chỗ',
      content: `
        <p>Và xin được nhắc lại thêm một lần nữa cho trọn vẹn: <strong>bạn không thể thay đổi một đối tượng bất biến tại chỗ</strong>. Nếu bạn cố tình gán chỉ mục cho một tuple (<code>T[2] = 4</code>) hay chuỗi, Python sẽ báo lỗi <code>TypeError</code>.</p>

        <p>Thay vào đó, bạn phải xây dựng một đối tượng mới bằng cách kết hợp cắt lát (slicing) và ghép nối (concatenation), rồi gán ngược nó lại cho tên biến ban đầu nếu cần:</p>

        <div class="callout-box callout-tip">
          <div class="callout-header"><span>🛡️ Mặt tích cực của tính bất biến:</span> <span>Miễn nhiễm với các cạm bẫy tham chiếu</span></div>
          <div class="callout-body">
            <p>Mặc dù việc tạo đối tượng mới đòi hỏi thêm thao tác viết mã, mặt tích cực to lớn là: <strong>hầu hết các cạm bẫy nguy hiểm ở các phần trước (tham chiếu được chia sẻ, nhân bản lồng) không thể xảy ra khi bạn sử dụng các đối tượng bất biến như tuple và chuỗi</strong>! Bởi vì chúng không thể bị thay đổi tại chỗ, chúng hoàn toàn miễn nhiễm với những tác dụng phụ có thể gây nguy hiểm cho các đối tượng khả biến như list và dictionary.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thay đổi giá trị của tuple bằng kỹ thuật cắt lát và ghép nối',
          code: `T = (1, 2, 3)

# Cố gắng sửa tại chỗ sẽ báo lỗi TypeError
try:
    T[2] = 4
except TypeError as err:
    print("Bắt lỗi khi sửa tuple:", err)

# Giải pháp chuẩn: Cắt lát lấy phần đầu + ghép nối tuple mới
T = T[:2] + (4,)
print("Tuple mới sau khi thay thế phần tử cuối:", T)`,
          output: `Bắt lỗi khi sửa tuple: 'tuple' object does not support item assignment
Tuple mới sau khi thay thế phần tử cuối: (1, 2, 4)`,
          annotations: [
            { line: 5, text: 'T[2] = 4 bị từ chối vì tuple là bất biến.' },
            { line: 10, text: 'T[:2] lấy (1, 2); (4,) là tuple 1 phần tử; + tạo tuple mới (1, 2, 4).' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Công thức an toàn để tạo ma trận đa chiều',
        content: 'Tuyệt đối KHÔNG viết <code>[[0] * cols] * rows</code>. Hãy luôn ghi nhớ công thức vàng sử dụng list comprehension: <code>[[0 for _ in range(cols)] for _ in range(rows)]</code>.'
      }
    ],
    pitfalls: [
      {
        title: 'Cạm bẫy đối tượng tuần hoàn với JSON',
        content: 'Nếu bạn truyền một đối tượng cyclic (như <code>L.append(L)</code>) vào <code>json.dumps()</code>, Python sẽ ngay lập tức quăng lỗi <code>ValueError: Circular reference detected</code>!'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo bảng cờ caro 3x3 độc lập và đánh dấu nước đi',
      level: 'Vừa',
      problem: 'Hãy viết mã Python: (1) Khởi tạo một bảng cờ board kích thước 3x3 chứa toàn ký tự \'-\' bằng list comprehension sao cho cả 3 hàng hoàn toàn độc lập. (2) Đánh dấu nước đi \'X\' vào ô chính giữa (hàng 1, cột 1). (3) In bảng cờ ra màn hình để chứng minh rằng chỉ duy nhất ô chính giữa đổi thành \'X\', hai hàng còn lại không bị ảnh hưởng.',
      hint: 'Dùng board = [[\'-\' for _ in range(3)] for _ in range(3)] và gán board[1][1] = \'X\'.',
      solutionCode: `# 1. Tạo bàn cờ 3x3 bằng list comprehension an toàn
board = [['-' for _ in range(3)] for _ in range(3)]

# 2. Đánh dấu nước đi 'X' vào giữa
board[1][1] = 'X'

# 3. In bàn cờ
for row in board:
    print(' '.join(row))`,
      solutionOutput: `- - -
- X -
- - -`,
      explanation: 'List comprehension chạy vòng lặp và tạo 3 list con độc lập ở 3 ô nhớ khác nhau, đảm bảo việc sửa board[1][1] chỉ tác động tới hàng 1.'
    }
  ],

  quiz: [
    {
      question: 'Trong đoạn mã "L = [1, 2]; Y = [L] * 3; L[0] = 99", giá trị của Y sẽ là gì?',
      options: [
        '[[99, 2], [1, 2], [1, 2]]',
        '[[99, 2], [99, 2], [99, 2]]',
        '[[1, 2], [1, 2], [1, 2]]',
        'Báo lỗi TypeError'
      ],
      correctIndex: 1,
      explanation: 'Phép nhân [L] * 3 nhân bản 3 tham chiếu trỏ cùng vào một list L duy nhất. Khi L thay đổi, cả 3 phần tử trong Y đều phản chiếu sự thay đổi đó.'
    },
    {
      question: 'Ký hiệu "[...]" khi in một đối tượng List trong Python biểu thị điều gì?',
      options: [
        'List có quá nhiều phần tử nên Python tự động rút gọn để tiết kiệm màn hình.',
        'Python phát hiện một cấu trúc tham chiếu vòng (cyclic reference) trỏ ngược lại chính nó.',
        'File chứa list đang bị khóa bởi tiến trình khác.',
        'List chứa các ký tự Unicode không in được.'
      ],
      correctIndex: 1,
      explanation: 'Ký hiệu [...] xuất hiện khi một đối tượng tập hợp chứa tham chiếu vòng quay trở lại chính nó, Python ngắt hiển thị đệ quy để tránh lặp vô tận.'
    }
  ],

  summary: [
    'Phép gán luôn tạo tham chiếu; hãy cẩn trọng với các đối tượng khả biến được chia sẻ và dùng L[:] để tạo bản sao khi cần.',
    'Phép nhân bản một dãy tuần tự chứa list ([L] * 4) chỉ nhân bản tham chiếu ở cấp 1; hãy luôn dùng List Comprehension để tạo các bản sao độc lập.',
    'Cấu trúc tham chiếu vòng (cyclic object) được Python biểu diễn bằng [...] và đòi hỏi phải có tập hợp visited khi duyệt đệ quy để tránh lặp vô tận.',
    'Các kiểu dữ liệu bất biến như tuple không thể sửa tại chỗ nhưng hoàn toàn miễn nhiễm với mọi tác dụng phụ nguy hiểm của tham chiếu chia sẻ.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.14), chúng ta sẽ tóm tắt toàn bộ Chương 9 và giải quyết trọn vẹn Bộ 6 Câu hỏi trắc nghiệm kiểm tra kiến thức nguyên bản của Mark Lutz kèm đáp án và phân tích chi tiết.'
};
