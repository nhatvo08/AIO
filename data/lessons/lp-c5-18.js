export default {
  id: 'lp-c5-18',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.18',
  title: 'Tập hợp nâng cao: Ràng buộc Bất biến, Frozenset & Set Comprehensions',
  subtitle: 'Khái niệm đối tượng băm được (hashable), cấm list/dict, tập hợp đóng băng frozenset và biểu thức sinh set comprehension',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt toán tử biểu thức (yêu cầu cả hai là set) và phương thức tập hợp (chấp nhận mọi iterable).',
    'Hiểu ràng buộc bất biến (hashable): vì sao danh sách list và từ điển dict bị cấm làm phần tử của tập hợp, trong khi tuple lại được phép.',
    'Sử dụng hàm dựng sẵn frozenset() để tạo tập hợp bất biến, cho phép lồng một tập hợp vào bên trong tập hợp khác.',
    'Viết các biểu thức comprehension tập hợp ({x**2 for x in seq}) để sinh tập hợp động từ bất kỳ iterable nào.'
  ],

  intuition: {
    title: 'Chiếc chìa khóa vân tay và tảng băng frozenset',
    metaphor: 'Để tìm kiếm một phần tử trong tập hợp siêu nhanh (tốc độ O(1)), Python sử dụng một bảng băm (hash table). Thuật toán này đòi hỏi mỗi phần tử phải có một "dấu vân tay bất biến" (mã băm hash không bao giờ đổi). Một danh sách list hay một từ điển dict giống như một sinh vật sống có thể mọc thêm tay chân bất cứ lúc nào (khả biến - mutable) — dấu vân tay của chúng sẽ thay đổi và làm lạc mất vị trí trong bảng băm. Do đó Python cấm tiệt list và dict! Nhưng nếu bạn đem một tập hợp nhúng vào chiếc tủ đông lạnh ma thuật frozenset, nó sẽ hóa thành một tảng băng bất biến cứng cáp, mang dấu vân tay cố định và có thể hiên ngang bước vào một tập hợp khác.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">RÀNG BUỘC PHẦN TỬ CỦA TẬP HỢP (HASHABLE VS UNHASHABLE)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">ĐƯỢC PHÉP (Bất biến / Hashable)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              • Số nguyên, float, chuỗi str<br>
              • Bộ giá trị <code>tuple</code> (chứa phần tử bất biến)<br>
              • Tập hợp đóng băng <code>frozenset</code>
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:4px;">BỊ CẤM (Khả biến / Unhashable)</div>
            <div style="font-size:0.8rem;color:var(--danger);">
              • Danh sách <code>list</code> (TypeError)<br>
              • Từ điển <code>dict</code> (TypeError)<br>
              • Tập hợp thông thường <code>set</code> (TypeError)
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Giao thức Lặp, Toán tử so với Phương thức Tập hợp',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 30 / 38 – Trang 32 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Tập hợp hỗ trợ giao thức lặp (iteration protocol): chúng có thể dùng trong các thao tác như <code>len()</code>, vòng lặp <code>for</code>, và list comprehension. Tuy nhiên, vì tập hợp không có thứ tự vị trí, chúng <strong>không hỗ trợ các thao tác dãy tuần tự như lập chỉ mục (indexing), cắt lát (slicing) hoặc phép ghép nối (<code>+</code>)</strong>:</p>
        <pre class="code-block"><code>>>> {'a', 'b', 'c'} + {'d'}
TypeError: unsupported operand type(s) for +: 'set' and 'set'</code></pre>

        <h4>Toán tử biểu thức vs Phương thức tương đương</h4>
        <p>Một điểm khác biệt tinh tế rất quan trọng của Mark Lutz: trong khi các biểu thức tập hợp yêu cầu <strong>cả hai toán hạng đều phải là đối tượng tập hợp</strong>, thì các phương thức tương đương của chúng lại <strong>chấp nhận bất kỳ đối tượng lặp (iterable) nào</strong> (như danh sách, tuple, range):</p>
      `,
      codeExamples: [
        {
          title: 'So sánh toán tử | và phương thức union()',
          code: `>>> S = set([1, 2, 3])
>>> S | set([3, 4])                    # Toán tử |: cả hai toán hạng phải là set
{1, 2, 3, 4}
>>> S | [3, 4]                         # Truyền list vào toán tử | -> Báo lỗi!
TypeError: unsupported operand type(s) for |: 'set' and 'list'
>>> S.union([3, 4])                    # Phương thức union(): chấp nhận list!
{1, 2, 3, 4}
>>> S.intersection((1, 3, 5))          # intersection(): chấp nhận tuple!
{1, 3}
>>> S.issubset(range(-5, 5))           # issubset(): chấp nhận range!
True`,
          output: `{1, 2, 3, 4}
TypeError: unsupported operand type(s) for |: 'set' and 'list'
{1, 2, 3, 4}
{1, 3}
True`,
          annotations: [
            { line: 4, text: 'Toán tử | nghiêm ngặt đòi hỏi toán hạng bên phải phải là set.' },
            { line: 7, text: 'Phương thức S.union() linh hoạt chấp nhận bất kỳ iterable nào.' },
            { line: 11, text: 'issubset() kiểm tra xem tất cả phần tử của S có nằm trong range(-5, 5) hay không.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Ràng buộc Bất biến (Hashable) và Tập hợp Đóng băng frozenset',
      content: `
        <p>Tập hợp chỉ có thể chứa các <strong>kiểu đối tượng bất biến</strong> (Python gọi đây là các đối tượng "băm được" - <strong>hashable</strong>). Do đó, các kiểu dữ liệu khả biến như danh sách (<code>list</code>) và từ điển (<code>dict</code>) không thể nhúng vào trong tập hợp.</p>
        <p>Tuy nhiên, <strong>bộ giá trị (tuple)</strong> chứa các phần tử bất biến thì hoàn toàn được phép nhúng vào tập hợp vì tuple là kiểu bất biến. Khi dùng trong tập hợp, tuple được so sánh theo toàn bộ giá trị của nó.</p>

        <h4>Tập hợp đóng băng: frozenset</h4>
        <p>Bản thân tập hợp <code>set</code> thông thường là khả biến (bạn có thể gọi <code>add</code>, <code>remove</code>), và do đó <em>không thể lồng trực tiếp một tập hợp vào bên trong một tập hợp khác</em>. Nếu bài toán của bạn cần lưu trữ một tập hợp bên trong một tập hợp khác (ví dụ tập các tập hợp), hàm dựng sẵn <strong><code>frozenset()</code></strong> hoạt động hoàn toàn giống như set nhưng tạo ra một tập hợp bất biến không thể thay đổi, nhờ đó có thể nhúng an toàn vào tập hợp bao ngoài:</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng ràng buộc hashable và sử dụng frozenset',
          code: `>>> S = {1.23}
>>> S.add([1, 2, 3])                   # Báo lỗi: list là unhashable!
TypeError: unhashable type: 'list'
>>> S.add({'a': 1})                    # Báo lỗi: dict cũng là unhashable!
TypeError: unhashable type: 'dict'
>>> S.add((1, 2, 3))                   # Hợp lệ: tuple là bất biến
>>> S
{1.23, (1, 2, 3)}
>>> S.add(frozenset('app'))            # frozenset là bất biến, được nhúng vào set!
>>> S
{1.23, (1, 2, 3), frozenset({'a', 'p'})}`,
          output: `TypeError: unhashable type: 'list'
TypeError: unhashable type: 'dict'
{1.23, (1, 2, 3)}
{1.23, (1, 2, 3), frozenset({'a', 'p'})}`,
          annotations: [
            { line: 3, text: 'list không có phương thức băm __hash__ nên bị từ chối.' },
            { line: 7, text: 'Tuple (1, 2, 3) bất biến nên được chấp nhận vào set.' },
            { line: 11, text: 'frozenset là giải pháp duy nhất để nhúng một tập hợp vào trong tập hợp khác.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Comprehension Tập hợp (Set Comprehensions)',
      content: `
        <p>Ngoài các hằng số bằng chữ và lời gọi hàm, tập hợp cũng có thể được tạo bằng cách chạy các biểu thức <strong>comprehension tập hợp (set comprehensions)</strong>.</p>
        <p>Đối với tập hợp, comprehension được viết trong cặp dấu ngoặc nhọn <code>{}</code>. Khi chạy, chúng thực hiện một vòng lặp thu thập kết quả của một biểu thức ở mỗi lần lặp và tự động lọc bỏ các phần tử trùng lặp:</p>
        <pre class="code-block"><code>>>> {x ** 2 for x in [1, 2, 3, 4]}
{16, 1, 4, 9}</code></pre>
        <p>Biểu thức này diễn đạt trực quan: <em>"Hãy cho tôi một tập hợp mới chứa X bình phương, đối với mỗi X trong danh sách"</em>. Set comprehension có thể lặp qua chuỗi ký tự và kết quả trả về hỗ trợ đầy đủ mọi thao tác tập hợp:</p>
      `,
      codeExamples: [
        {
          title: 'Thực hành set comprehension và các phép toán kết hợp',
          code: `>>> {x for x in 'py3X'}
{'p', 'X', '3', 'y'}
>>> {c * 4 for c in 'py3X'}
{'yyyy', '3333', 'XXXX', 'pppp'}
>>> S = {c * 4 for c in 'py3X'}
>>> S | {'zzzz', 'XXXX'}               # Phép hợp trên kết quả comprehension
{'yyyy', '3333', 'XXXX', 'pppp', 'zzzz'}
>>> S & {'zzzz', 'XXXX'}               # Phép giao
{'XXXX'}`,
          output: `{'p', 'X', '3', 'y'}
{'yyyy', '3333', 'XXXX', 'pppp'}
{'yyyy', '3333', 'XXXX', 'pppp', 'zzzz'}
{'XXXX'}`,
          annotations: [
            { line: 1, text: 'Comprehension duyệt qua chuỗi "py3X" để tạo tập hợp từng ký tự.' },
            { line: 3, text: 'Mỗi ký tự được nhân 4 lần: "p"*4 = "pppp", "y"*4 = "yyyy".' },
            { line: 7, text: 'Tập hợp kết quả hỗ trợ toán tử giao & để tìm phần tử chung {"XXXX"}.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cẩn thận với tuple chứa đối tượng khả biến',
        content: 'Một bộ giá trị <code>tuple</code> chỉ băm được (hashable) nếu <strong>tất cả các phần tử bên trong nó cũng băm được</strong>. Nếu bạn viết <code>t = (1, [2, 3])</code> (tuple chứa một list), lệnh <code>s.add(t)</code> vẫn sẽ báo lỗi <code>TypeError: unhashable type: "list"</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo tập hợp các số nguyên tố nhỏ hơn 20 bằng set comprehension',
      level: 'Vừa',
      problem: 'Viết một biểu thức set comprehension để lấy ra tập hợp tất cả các số lẻ bình phương từ dãy số từ 1 đến 10.',
      hint: 'Dùng cú pháp {x**2 for x in range(1, 11) if x % 2 != 0}.',
      solutionCode: `# Set comprehension với mệnh đề lọc if
tap_hop_so_le_bp = {x ** 2 for x in range(1, 11) if x % 2 != 0}

print("Tập hợp số lẻ bình phương:", sorted(list(tap_hop_so_le_bp)))`,
      solutionOutput: `Tập hợp số lẻ bình phương: [1, 9, 25, 49, 81]`,
      explanation: 'Các số lẻ từ 1 đến 10 là 1, 3, 5, 7, 9. Bình phương của chúng tương ứng là 1, 9, 25, 49, 81.'
    }
  ],

  quiz: [
    {
      question: 'Tại sao câu lệnh s.add([1, 2, 3]) lại gây ra lỗi TypeError trong Python?',
      options: [
        'Vì danh sách chứa quá nhiều phần tử.',
        'Vì danh sách (list) là đối tượng khả biến (mutable) và không có mã băm (unhashable).',
        'Vì hàm add chỉ chấp nhận số nguyên đơn lẻ.',
        'Vì dấu ngoặc vuông bị trùng cú pháp với toán tử cắt lát.'
      ],
      correctIndex: 1,
      explanation: 'Tập hợp sử dụng bảng băm để tra cứu nhanh, đòi hỏi các phần tử phải có giá trị băm cố định (hashable). Kiểu list là khả biến (có thể sửa đổi nội dung) nên không băm được.'
    },
    {
      question: 'Nếu bạn cần lồng một tập hợp vào bên trong một tập hợp khác, bạn phải sử dụng đối tượng nào?',
      options: [
        'set() thông thường.',
        'frozenset() (tập hợp đóng băng bất biến).',
        'tuple(set())',
        'dict.fromkeys(set())'
      ],
      correctIndex: 1,
      explanation: 'frozenset() tạo ra một tập hợp bất biến không thể thay đổi, do đó nó là hashable và có thể được dùng làm phần tử của một tập hợp khác.'
    }
  ],

  summary: [
    'Phương thức tập hợp (như union, intersection) chấp nhận mọi iterable, trong khi toán tử biểu thức (|, &) bắt buộc cả hai phải là set.',
    'Phần tử của tập hợp bắt buộc phải bất biến (hashable); danh sách list và từ điển dict bị cấm.',
    'Bộ giá trị tuple chứa các đối tượng bất biến được phép dùng làm phần tử của set.',
    'frozenset tạo tập hợp đóng băng bất biến, cho phép nhúng tập hợp vào bên trong tập hợp khác.',
    'Set comprehension {expr for x in iterable} cung cấp cú pháp súc tích để tạo và lọc tập hợp động.'
  ]
};