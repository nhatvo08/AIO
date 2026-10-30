export default {
  id: 'lp-c4-06-5',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.6.5',
  title: 'Danh sách: Cú pháp Comprehension',
  subtitle: 'List comprehension, bộ lọc if, biểu thức sinh (generator) với next(), set & dict comprehension',
  level: 'Trung bình',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cú pháp list comprehension để trích xuất và biến đổi dữ liệu từ ma trận hoặc iterable.',
    'Sử dụng mệnh đề if bên trong comprehension để lọc bỏ phần tử không mong muốn.',
    'Hiểu biểu thức sinh (generator expression) với ngoặc tròn (...) và cách gọi next() để sinh giá trị theo yêu cầu.',
    'Nhận biết các biến thể: set comprehension {...} và dictionary comprehension {k: v ...}.',
    'Thấy rõ ưu thế vượt trội về hiệu năng tốc độ C của comprehension so với vòng lặp for thông thường.'
  ],

  intuition: {
    title: 'Dây chuyền sản xuất tự động thu nhỏ',
    metaphor: 'Thay vì phải viết một vòng lặp for dài dòng: tạo danh sách rỗng, duyệt từng phần tử, kiểm tra điều kiện, rồi gọi append(), cú pháp comprehension giống như một dây chuyền tự động gói gọn trong một dòng duy nhất. Bạn chỉ cần đặt đề bài: "Với mỗi hàng trong ma trận M, nếu phần tử cột 1 là số chẵn, hãy nhặt lấy nó và đặt vào danh sách mới". Toàn bộ quy trình diễn ra ở tầng mã C của Python với tốc độ cực nhanh.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">GIẢI PHẪU CÚ PHÁP COMPREHENSION</div>
        <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;align-items:center;">
          <div style="padding:8px 12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:6px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--text-muted);">Biểu thức kết quả</div>
            <div style="font-weight:700;color:var(--accent-primary);">row[1]</div>
          </div>
          <div style="color:var(--text-secondary);font-weight:700;">for</div>
          <div style="padding:8px 12px;background:var(--bg-surface);border:2px solid var(--success);border-radius:6px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--text-muted);">Vòng lặp nguồn</div>
            <div style="font-weight:700;color:var(--success);">row in M</div>
          </div>
          <div style="color:var(--text-secondary);font-weight:700;">if</div>
          <div style="padding:8px 12px;background:var(--bg-surface);border:2px solid var(--warning);border-radius:6px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--text-muted);">Bộ lọc điều kiện</div>
            <div style="font-weight:700;color:var(--warning);">row[1] % 2 == 0</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">Bọc trong [...] sinh ra list; bọc trong (...) sinh ra generator; bọc trong {...} sinh ra set hoặc dict.</div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. List Comprehension: Cú pháp và Ứng dụng trên Ma trận',
      content: `
        <p>Bên cạnh các thao tác dãy tuần tự và phương thức của danh sách, Python cung cấp một công cụ xử lý mạnh mẽ mang tên <strong>List Comprehension</strong> (biểu thức tạo danh sách).</p>
        <p>List comprehension cung cấp một cú pháp ngắn gọn, trực quan để xây dựng một danh sách mới bằng cách áp dụng một biểu thức lên từng phần tử của một dãy tuần tự (hoặc bất kỳ đối tượng có thể lặp nào).</p>
        <p>Một trong những ứng dụng điển hình là trích xuất <strong>các cột</strong> của ma trận — điều mà phép cắt lát thông thường không thể làm được trực tiếp:</p>
      `,
      codeExamples: [
        {
          title: 'Trích xuất cột và biến đổi ma trận với List Comprehension',
          code: `>>> M = [[1, 2, 3],
...      [4, 5, 6],
...      [7, 8, 9]]
>>> col2 = [row[1] for row in M]     # Lấy phần tử ở cột 1 của từng hàng
>>> col2
[2, 5, 8]
>>> [row[1] + 1 for row in M]        # Vừa lấy vừa cộng thêm 1
[3, 6, 9]
>>> [row[1] for row in M if row[1] % 2 == 0]  # Lọc: chỉ giữ phần tử chẵn
[2, 8]`,
          output: `[2, 5, 8]
[3, 6, 9]
[2, 8]`,
          annotations: [
            { line: 4, text: 'row duyệt qua từng hàng con; row[1] trích xuất phần tử ở vị trí cột 1.' },
            { line: 7, text: 'Biểu thức row[1] + 1 tính toán giá trị mới cho từng phần tử của danh sách kết quả.' },
            { line: 9, text: 'Mệnh đề if row[1] % 2 == 0 đóng vai trò bộ lọc (filter), chỉ lấy các phần tử chẵn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Trích xuất Đường chéo và Thao tác trên Chuỗi',
      content: `
        <p>Comprehension không giới hạn ở ma trận mà hoạt động trên mọi đối tượng có thể lặp (iterable), bao gồm danh sách chỉ số và chuỗi ký tự.</p>
      `,
      codeExamples: [
        {
          title: 'Đường chéo ma trận và nhân đôi ký tự',
          code: `>>> diag = [M[i][i] for i in [0, 1, 2]]   # Trích xuất đường chéo chính
>>> diag
[1, 5, 9]
>>> doubles = [c * 2 for c in 'spam']     # Lặp trên chuỗi ký tự
>>> doubles
['ss', 'pp', 'aa', 'mm']`,
          output: `[1, 5, 9]
['ss', 'pp', 'aa', 'mm']`,
          annotations: [
            { line: 1, text: 'i nhận các giá trị 0, 1, 2; M[i][i] lần lượt lấy M[0][0], M[1][1], M[2][2].' },
            { line: 4, text: 'c duyệt qua từng ký tự của "spam", biểu thức c * 2 nhân đôi từng ký tự.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Biểu thức Sinh (Generator Expressions) và hàm next()',
      content: `
        <p>Nếu thay cặp ngoặc vuông <code>[...]</code> bằng cặp ngoặc tròn <code>(...)</code>, ta nhận được một <strong>biểu thức sinh (generator expression)</strong>.</p>
        <p>Khác với list comprehension (tạo ngay toàn bộ danh sách trong bộ nhớ), biểu thức sinh là một đối tượng tạo kết quả <em>theo yêu cầu (on-demand)</em>:</p>
        <ul>
          <li>Nó tuân thủ <strong>giao thức lặp (iteration protocol)</strong>.</li>
          <li>Mỗi lần bạn gọi hàm dựng sẵn <code>next(G)</code>, nó chỉ tính toán và trả về một giá trị duy nhất.</li>
          <li>Điều này giúp tiết kiệm bộ nhớ tối đa khi làm việc với tập dữ liệu khổng lồ.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Biểu thức sinh và gọi hàm next()',
          code: `>>> G = (sum(row) for row in M)     # Biểu thức sinh tạo một generator
>>> next(G)                         # Tính và trả về tổng hàng đầu tiên (1+2+3)
6
>>> next(G)                         # Tính và trả về tổng hàng thứ hai (4+5+6)
15
>>> next(G)                         # Tính và trả về tổng hàng thứ ba (7+8+9)
24`,
          output: `6
15
24`,
          annotations: [
            { line: 1, text: 'G là đối tượng generator, chưa thực hiện phép tính sum nào vào lúc này.' },
            { line: 2, text: 'next(G) kích hoạt vòng lặp chạy bước đầu tiên, trả về 6.' },
            { line: 4, text: 'next(G) tiếp tục từ vị trí trước đó, trả về 15.' },
            { line: 6, text: 'next(G) trả về 24; nếu gọi tiếp lần thứ 4 sẽ ném ngoại lệ StopIteration.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Set Comprehension và Dictionary Comprehension',
      content: `
        <p>Cú pháp comprehension tổng quát của Python còn có thể tạo trực tiếp tập hợp (set) và từ điển (dict) bằng cách sử dụng cặp ngoặc nhọn <code>{...}</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Tạo tập hợp và từ điển bằng comprehension',
          code: `>>> {sum(row) for row in M}                 # Set comprehension (loại bỏ trùng lặp)
{24, 6, 15}
>>> {i: sum(M[i]) for i in range(3)}        # Dict comprehension (cặp khóa: giá trị)
{0: 6, 1: 15, 2: 24}`,
          output: `{24, 6, 15}
{0: 6, 1: 15, 2: 24}`,
          annotations: [
            { line: 1, text: 'Set comprehension trả về tập hợp các tổng hàng (thứ tự hiển thị có thể thay đổi).' },
            { line: 3, text: 'Dict comprehension tạo các cặp key: value với chỉ số i làm khóa và sum làm giá trị.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Hiệu ứng cạn kiệt của Generator',
        content: `
          <p>Đối tượng generator chỉ có thể duyệt qua một lần duy nhất. Sau khi <code>next()</code> đã đi đến phần tử cuối cùng, generator bị "cạn kiệt" (exhausted). Nếu bạn muốn duyệt lại từ đầu, bạn phải tạo lại một đối tượng generator mới.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Ưu thế tốc độ C của Comprehension',
        content: `
          <p>Trong thực tế, một biểu thức list comprehension chạy nhanh hơn khoảng <strong>gấp đôi</strong> so với một vòng lặp <code>for</code> viết bằng Python thông thường tương đương. Lý do là vì vòng lặp của comprehension được thực thi ở tầng mã C tối ưu hóa bên trong nhân CPython, giảm thiểu chi phí thông dịch bytecode qua từng bước.</p>
        `
      }
    ],
    deepDive: {
      title: 'So sánh Comprehension với hàm map() và filter()',
      content: `
        <p>Trong các phiên bản Python ban đầu, các hàm hàm chức năng như <code>map()</code> và <code>filter()</code> là cách duy nhất để xử lý dãy mà không dùng vòng lặp:</p>
        <pre><code>list(map(sum, M))       # Phong cách hàm
[sum(row) for row in M] # Phong cách comprehension (trực quan, dễ đọc hơn)</code></pre>
        <p>Mark Lutz chỉ ra rằng cú pháp comprehension ra đời sau đã trở thành chuẩn mực được cộng đồng Python ưa chuộng hơn vì tính rõ ràng, khả năng đọc hiểu cao và kết hợp mượt mà cả biến đổi lẫn bộ lọc.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Lọc và bình phương số lẻ',
      level: 'Dễ',
      description: 'Cho danh sách <code>numbers = [1, 2, 3, 4, 5, 6, 7, 8]</code>. Hãy dùng duy nhất một câu lệnh list comprehension để lọc lấy các số lẻ và tính bình phương của chúng.',
      starterCode: `numbers = [1, 2, 3, 4, 5, 6, 7, 8]
# Tạo squared_odds dùng list comprehension
`,
      solution: `numbers = [1, 2, 3, 4, 5, 6, 7, 8]
squared_odds = [x ** 2 for x in numbers if x % 2 != 0]
print("Bình phương các số lẻ:", squared_odds)`,
      solutionOutput: `Bình phương các số lẻ: [1, 9, 25, 49]`,
      explanation: 'Mệnh đề <code>if x % 2 != 0</code> lọc ra các số lẻ [1, 3, 5, 7], và biểu thức <code>x ** 2</code> bình phương từng số đó.'
    },
    {
      title: 'Chuyển vị ma trận bằng List Comprehension lồng nhau',
      level: 'Khó',
      description: 'Cho ma trận <code>M = [[1, 2, 3], [4, 5, 6]]</code> (kích thước 2x3). Hãy dùng list comprehension lồng nhau để tạo ma trận chuyển vị <code>transposed</code> (kích thước 3x2).',
      starterCode: `M = [[1, 2, 3], [4, 5, 6]]
# Tạo transposed có dạng [[1, 4], [2, 5], [3, 6]]
`,
      solution: `M = [[1, 2, 3], [4, 5, 6]]
transposed = [[row[i] for row in M] for i in range(len(M[0]))]
print("Ma trận chuyển vị:", transposed)`,
      solutionOutput: `Ma trận chuyển vị: [[1, 4], [2, 5], [3, 6]]`,
      explanation: 'Vòng lặp ngoài <code>for i in range(3)</code> duyệt qua từng chỉ số cột, vòng lặp trong trích xuất cột đó từ mọi hàng của M.'
    }
  ],

  quiz: [
    {
      question: 'Cho M = [[1, 2], [3, 4]]. Kết quả của biểu thức [row[0] for row in M] là gì?',
      options: [
        '[1, 2]',
        '[1, 3]',
        '[2, 4]',
        '[[1], [3]]'
      ],
      correctIndex: 1,
      explanation: 'row[0] lấy phần tử ở cột 0 của từng hàng trong M, tức là 1 và 3.'
    },
    {
      question: 'Điểm khác biệt cốt lõi giữa biểu thức list comprehension [...] và biểu thức sinh generator (...) là gì?',
      options: [
        'Generator chỉ dùng được với số thực.',
        'List comprehension tạo toàn bộ danh sách trong bộ nhớ cùng lúc; generator sinh từng phần tử theo yêu cầu (on-demand).',
        'Generator chạy chậm hơn nhiều so với vòng lặp for.',
        'List comprehension không hỗ trợ mệnh đề if.'
      ],
      correctIndex: 1,
      explanation: 'Generator tính toán lười (lazy evaluation), trả về từng phần tử khi được yêu cầu qua hàm next(), giúp tiết kiệm bộ nhớ.'
    },
    {
      question: 'Cú pháp nào sau đây tạo ra một Dictionary Comprehension?',
      options: [
        '[k: v for k, v in items]',
        '(k: v for k, v in items)',
        '{k: v for k, v in items}',
        'dict[k for k in items]'
      ],
      correctIndex: 2,
      explanation: '{k: v for ...} sử dụng dấu ngoặc nhọn kèm dấu hai chấm giữa khóa và giá trị để tạo từ điển.'
    }
  ],

  summary: [
    'List comprehension cung cấp cú pháp súc tích để ánh xạ và lọc dữ liệu: [biểu_thức for mục in dãy if điều_kiện].',
    'Ứng dụng mạnh mẽ để trích xuất cột ma trận, đường chéo, và biến đổi chuỗi.',
    'Biểu thức sinh (generator expression) dùng ngoặc tròn (...), tính toán theo yêu cầu với next() để tiết kiệm bộ nhớ.',
    'Hỗ trợ set comprehension {...} và dict comprehension {k: v for ...}.',
    'Comprehension chạy ở tầng CPython, thường nhanh gấp đôi vòng lặp for thông thường.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 19–20.'
  ]
};
