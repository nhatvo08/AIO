export default {
  id: 'lp-c8-10',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.10',
  title: 'List Comprehension và Hàm map: Cú pháp cơ bản, Bộ lọc if & Vòng lặp lồng',
  subtitle: 'Khám phá biểu thức sinh danh sách (list comprehension), so sánh hiệu năng với vòng lặp for truyền thống và hàm ánh xạ map()',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo cú pháp cơ bản của List Comprehension `[biểu_thức for x in iterable]` để tạo danh sách mới ngắn gọn.',
    'Hiểu lý do tại sao List Comprehension thường chạy nhanh hơn vòng lặp `for` thủ công kết hợp `append()`.',
    'Sử dụng mệnh đề điều kiện `if` để lọc phần tử và vòng lặp `for` lồng nhau trong comprehension.',
    'Sử dụng hàm dựng sẵn `map()` và hiểu sự tương đồng giữa hàm ánh xạ hàm và biểu thức comprehension.'
  ],

  intuition: {
    title: 'Dây chuyền biến đổi công nghiệp thay cho thợ làm tay',
    metaphor: 'Hãy hình dung bạn có một rổ quả cam và muốn vắt lấy từng ly nước cam. Cách làm truyền thống (vòng lặp for + append) giống như một người thợ thủ công: anh ta lấy một chiếc khay rỗng `res = []`, rồi tự tay cầm từng quả cam trong rổ, vắt lấy nước, rồi nhấc ly đặt vào khay `res.append(ly_nuoc)`. Việc này đòi hỏi nhiều động tác chân tay và liên tục phải gọi người thợ. Ngược lại, List Comprehension `[vat_cam(x) for x in ro_cam]` giống như một dây chuyền công nghiệp tự động tốc độ cao được lập trình sẵn: cả quá trình lấy cam, vắt nước và sắp xếp vào khay diễn ra khép kín ở cấp độ vi mạch (tầng mã C bên trong CPython), không mất chi phí qua lại giữa các câu lệnh Python. Kết quả là nhanh hơn, gọn hơn và thanh lịch hơn gấp nhiều lần!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">GIẢI MÃ CẤU TRÚC LIST COMPREHENSION VÀ BỘ LỌC IF</div>
        <div style="display:flex;justify-content:center;gap:6px;align-items:center;flex-wrap:wrap;font-size:0.95rem;">
          <span style="font-weight:700;font-size:1.2rem;">[</span>
          <span style="padding:6px 12px;background:rgba(16,185,129,0.2);border:1px solid #10b981;border-radius:4px;color:#10b981;font-weight:700;">x * 4</span>
          <span style="padding:6px 12px;background:rgba(59,130,246,0.2);border:1px solid #3b82f6;border-radius:4px;color:#3b82f6;font-weight:700;">for x in 'program'</span>
          <span style="padding:6px 12px;background:rgba(239,68,68,0.2);border:1px solid #ef4444;border-radius:4px;color:#ef4444;font-weight:700;">if x &gt;= 'p'</span>
          <span style="font-weight:700;font-size:1.2rem;">]</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:8px;font-size:0.75rem;color:var(--text-secondary);text-align:center;">
          <div>▲ Biểu thức biến đổi đầu ra</div>
          <div>▲ Nguồn duyệt phần tử (Iterable)</div>
          <div>▲ Bộ lọc điều kiện (Chỉ giữ khi True)</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cú pháp Cơ bản của List Comprehension',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 13 / 42</strong>.</p>
          </div>
        </div>

        <p>Các mục cuối cùng trong Bảng 8-1, <strong>list comprehension</strong> và các lệnh gọi <strong><code>map()</code></strong>, cũng đã được giới thiệu sơ lược trong Chương 4 và sẽ được trình bày chuyên sâu trong các Chương 14 và 20.</p>

        <p>Tuy nhiên, cách sử dụng cơ bản của chúng rất trực quan: <strong>List comprehension là họ hàng gần gũi của vòng lặp for</strong>, và xây dựng một list mới bằng cách áp dụng một biểu thức cho từng phần tử trong một sequence (thực chất là bất kỳ iterable nào):</p>

        <p>Về mặt ngữ nghĩa, biểu thức comprehension <code>res = [x * 4 for x in 'code']</code> tương đương hoàn toàn với việc bạn tạo một list rỗng rồi dùng vòng lặp <code>for</code> thủ công để gọi <code>res.append(x * 4)</code>. Nhưng như tác giả Mark Lutz khẳng định: <em>List comprehension viết mã đơn giản hơn và thường chạy nhanh hơn đáng kể vì việc gom nhả phần tử diễn ra hoàn toàn ở tầng mã C của trình thông dịch CPython</em>.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh List Comprehension với Vòng lặp for tương đương',
          code: `# 1. Dùng List Comprehension (ngắn gọn, tối ưu)
res_comp = [x * 4 for x in 'code']
print("Dùng List Comprehension:", res_comp)

# 2. Dùng Vòng lặp for thủ công tương đương
res_loop = []
for x in 'code':
    res_loop.append(x * 4)
print("Dùng Vòng lặp for:       ", res_loop)`,
          output: `Dùng List Comprehension: ['cccc', 'oooo', 'dddd', 'eeee']
Dùng Vòng lặp for:        ['cccc', 'oooo', 'dddd', 'eeee']`,
          annotations: [
            { line: 2, text: 'List comprehension áp dụng phép nhân chuỗi x * 4 cho từng ký tự của \'code\'.' },
            { line: 8, text: 'Vòng lặp for phải tốn chi phí tra cứu thuộc tính .append và gọi hàm liên tục trên từng lượt lặp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Mở rộng Comprehension: Bộ lọc if và Vòng lặp lồng nhau',
      content: `
        <p>List comprehension không chỉ dừng lại ở phép biến đổi đơn giản một-đối-một; nó còn hỗ trợ các cấu trúc mở rộng vô cùng mạnh mẽ:</p>

        <ul>
          <li><strong>Bộ lọc điều kiện <code>if</code>:</strong> Cho phép bạn chỉ giữ lại các phần tử thỏa mãn điều kiện logic. Các phần tử không thỏa mãn sẽ bị loại bỏ hoàn toàn khỏi list kết quả mà không cần khối lệnh <code>if/else</code> cồng kềnh.</li>
          <li><strong>Các vòng lặp <code>for</code> lồng nhau:</strong> Cho phép bạn kết hợp các tập dữ liệu đa chiều hoặc tính tích Descartes giữa nhiều dãy tuần tự khác nhau.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Mở rộng comprehension với mệnh đề lọc if và vòng lặp lồng',
          code: `# 1. Lọc phần tử bằng mệnh đề if
filtered = [x * 4 for x in 'program' if x >= 'p']
print("Lọc phần tử if x >= 'p':", filtered)

# 2. Vòng lặp for lồng nhau (tích Descartes)
nested_comp = [x + y for x in 'py' for y in '312']
print("Vòng lặp for lồng nhau: ", nested_comp)`,
          output: `Lọc phần tử if x >= 'p': ['pppp', 'rrrr', 'rrrr']
Vòng lặp for lồng nhau:  ['p3', 'p1', 'p2', 'y3', 'y1', 'y2']`,
          annotations: [
            { line: 2, text: 'Chỉ các ký tự \'p\' và \'r\' thỏa mãn x >= \'p\' được đưa vào tính toán đầu ra.' },
            { line: 6, text: 'for x in \'py\' lặp 2 lần; bên trong for y in \'312\' lặp 3 lần, sinh ra 2x3 = 6 cặp kết hợp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Hàm Dựng Sẵn map(): Ánh xạ Hàm qua Sequence',
      content: `
        <p>Hàm dựng sẵn <strong><code>map(func, iterable)</code></strong> thực hiện công việc tương tự như comprehension, nhưng nó áp dụng một <em>hàm có sẵn</em> (thay vì một biểu thức nội tuyến) cho các phần tử trong một sequence và thu thập kết quả:</p>

        <p>Trong Python 3, <code>map()</code> trả về một đối tượng iterable lười biếng (generator). Để buộc nó thực thi và thu thập tất cả các kết quả vào một list phục vụ hiển thị hoặc lưu trữ, chúng ta chỉ cần bọc nó trong một lệnh gọi <code>list()</code>:</p>

        <p><em>Góc nhìn so sánh:</em> Trong khi <code>map()</code> rất gọn khi bạn đã có sẵn một hàm định danh (như <code>abs</code>, <code>ord</code>, <code>int</code>), thì List Comprehension lại chiếm ưu thế tuyệt đối khi bạn cần thực hiện các biểu thức tính toán tùy biến (như <code>x * 4</code> hay <code>x ** 2</code>) hoặc khi cần lọc dữ liệu bằng <code>if</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng hàm dựng sẵn map() và so sánh với comprehension',
          code: `# Ánh xạ hàm abs (trị tuyệt đối) qua sequence
mapped = list(map(abs, [-1, -2, 0, 1, 2]))
print("list(map(abs, ...)):    ", mapped)

# Tương đương bằng list comprehension
comp_abs = [abs(x) for x in [-1, -2, 0, 1, 2]]
print("Comprehension tương đương:", comp_abs)`,
          output: `list(map(abs, ...)):     [1, 2, 0, 1, 2]
Comprehension tương đương: [1, 2, 0, 1, 2]`,
          annotations: [
            { line: 2, text: 'map áp dụng hàm abs cho từng số âm/dương trong list.' },
            { line: 6, text: 'Comprehension viết tương đương [abs(x) for x in ...].' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mặc dù mạnh mẽ, các công cụ này mang tính tùy chọn',
        content: 'Như tác giả Mark Lutz lưu ý: Mọi điều bạn làm được với list comprehension và <code>map()</code> đều có thể làm được bằng các câu lệnh vòng lặp <code>for</code> và <code>if</code> truyền thống. Hãy sử dụng comprehension khi nó giúp mã nguồn trong sáng hơn, và tránh viết các biểu thức comprehension lồng nhau quá 2 tầng gây khó đọc.'
      }
    ],
    pitfalls: [
      {
        title: 'Đừng quên bọc map() trong list() nếu cần hiển thị kết quả!',
        content: 'Nếu bạn chỉ viết <code>res = map(abs, L)</code> rồi in ra, kết quả bạn thấy sẽ là <code><map object at ...></code>. Hàm <code>map</code> không tự động sinh danh sách trong bộ nhớ mà chờ bạn duyệt qua nó bằng vòng lặp <code>for</code> hoặc ép kiểu qua <code>list()</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo danh sách bình phương của các số lẻ bằng List Comprehension',
      level: 'Vừa',
      problem: 'Sử dụng đúng MỘT biểu thức list comprehension kết hợp range(10) và mệnh đề if để tạo ra danh sách chứa bình phương (x**2) của tất cả các số lẻ từ 0 đến 9.',
      hint: 'Cú pháp dạng [x**2 for x in range(10) if x % 2 != 0].',
      solutionCode: `# Tạo danh sách bình phương các số lẻ
odd_squares = [x**2 for x in range(10) if x % 2 != 0]

print("Bình phương các số lẻ (0..9):", odd_squares)`,
      solutionOutput: `Bình phương các số lẻ (0..9): [1, 9, 25, 49, 81]`,
      explanation: 'Các số lẻ là 1, 3, 5, 7, 9. Biểu thức x**2 lần lượt tính 1^2=1, 3^2=9, 5^2=25, 7^2=49, 9^2=81 và gom vào list mới.'
    }
  ],

  quiz: [
    {
      question: 'Kết quả của biểu thức list comprehension [c.upper() for c in "abc"] là gì?',
      options: [
        '["A", "B", "C"]',
        '"ABC"',
        '["ABC"]',
        'Lỗi TypeError vì "abc" là chuỗi chứ không phải list.'
      ],
      correctIndex: 0,
      explanation: 'Comprehension duyệt qua chuỗi "abc", gọi hàm c.upper() cho từng ký tự \'a\', \'b\', \'c\' và thu thập kết quả thành list [\'A\', \'B\', \'C\'].'
    },
    {
      question: 'Tại sao List Comprehension thường chạy nhanh hơn vòng lặp for kết hợp append() trong CPython?',
      options: [
        'Vì List Comprehension không sử dụng bộ nhớ RAM.',
        'Vì chu trình gom nhả phần tử của comprehension được tối ưu hóa ở tầng mã C nội bộ của trình thông dịch, giảm chi phí tra cứu thuộc tính và gọi hàm.',
        'Vì List Comprehension chạy trên đa luồng CPU.',
        'Vì vòng lặp for bị Python 3 giới hạn tốc độ.'
      ],
      correctIndex: 1,
      explanation: 'Trong CPython, List Comprehension được biên dịch thành bytecode đặc thù (LIST_APPEND) thực thi trực tiếp trong vòng lặp C tốc độ cao, không tốn chi phí tra cứu phương thức append() của đối tượng Python.'
    }
  ],

  summary: [
    'List Comprehension có cú pháp [biểu_thức for x in iterable], xây dựng một list mới nhanh chóng và thanh lịch.',
    'So với vòng lặp for + append(), list comprehension ngắn gọn hơn và thường chạy nhanh hơn nhờ tối ưu hóa tầng C.',
    'Hỗ trợ mệnh đề lọc if ở cuối để chọn lọc các phần tử thỏa mãn điều kiện logic.',
    'Hỗ trợ nhiều mệnh đề for lồng nhau để xử lý ma trận và tích Descartes dữ liệu.',
    'Hàm dựng sẵn map(func, iterable) ánh xạ hàm cho từng phần tử, trả về một iterable lười biếng cần bọc trong list() để thu thập.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.11), chúng ta sẽ nghiên cứu cú pháp Unpacking hằng số List với dấu sao (*), câu lệnh del và phương thức sao chép nông copy().'
};