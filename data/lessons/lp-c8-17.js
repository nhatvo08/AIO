export default {
  id: 'lp-c8-17',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.17',
  title: 'Dictionary Comprehension (Comprehension từ điển): Cú pháp, Zip & Ánh xạ biểu thức',
  subtitle: 'Làm chủ biểu thức sinh từ điển {k: v for ...}, kết hợp với zip, tính toán khóa và giá trị động, và thay thế tối ưu cho fromkeys()',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cú pháp chuẩn của Dictionary Comprehension `{k: v for x in iterable}` và tương đương bằng vòng lặp.',
    'Sử dụng Dictionary Comprehension kết hợp với hàm `zip()` và phép giải nén tuple `(k, v)`.',
    'Tận dụng sức mạnh tổng quát: áp dụng các biểu thức tính toán tùy biến đồng thời cho cả KHÓA và GIÁ TRỊ.',
    'Biết cách sử dụng comprehension để khởi tạo từ điển từ danh sách khóa như một giải pháp thay thế an toàn cho `dict.fromkeys()`.'
  ],

  intuition: {
    title: 'Xưởng điêu khắc tự động cả Ổ khóa lẫn Chìa khóa',
    metaphor: 'Nếu List Comprehension là một dây chuyền đóng gói các kiện hàng đơn lẻ, thì Dictionary Comprehension là một xưởng cơ khí chính xác tự động: với mỗi lượt máy chạy (vòng lặp for), xưởng đồng thời tiện ra cả một chiếc chìa khóa (`k`) lẫn một chiếc ổ khóa (`v`) theo công thức bạn chỉ định `{k: v}`! Ví dụ: bạn đưa vào chữ \'HACK\', xưởng lập tức tạo ra ổ khóa là chữ thường \'hack\' và chiếc chìa là chữ hoa kèm dấu chấm than \'HACK!\'. Bạn không cần phải khởi tạo từ điển rỗng rồi gán thủ công từng dòng `D[k] = v`; toàn bộ chiếc tủ hồ sơ được đúc hoàn chỉnh chỉ trong một dòng biểu thức duy nhất!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">GIẢI MÃ CẤU TRÚC DICTIONARY COMPREHENSION</div>
        <div style="display:flex;justify-content:center;gap:6px;align-items:center;flex-wrap:wrap;font-size:0.95rem;">
          <span style="font-weight:700;font-size:1.2rem;">{</span>
          <span style="padding:6px 10px;background:rgba(139,92,246,0.2);border:1px solid #8b5cf6;border-radius:4px;color:#8b5cf6;font-weight:700;">c.lower()</span>
          <span style="font-weight:700;">:</span>
          <span style="padding:6px 10px;background:rgba(16,185,129,0.2);border:1px solid #10b981;border-radius:4px;color:#10b981;font-weight:700;">c + '!'</span>
          <span style="padding:6px 10px;background:rgba(59,130,246,0.2);border:1px solid #3b82f6;border-radius:4px;color:#3b82f6;font-weight:700;">for c in ['HACK', 'PY', 'CODE']</span>
          <span style="font-weight:700;font-size:1.2rem;">}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:8px;font-size:0.75rem;color:var(--text-secondary);text-align:center;">
          <div>▲ Biểu thức sinh KHÓA</div>
          <div>▲ Biểu thức sinh GIÁ TRỊ</div>
          <div>▲ Vòng lặp duyệt nguồn (Iterable)</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cú pháp Cơ bản của Dictionary Comprehension',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 24 / 42 – Trang 25 / 42</strong>.</p>
          </div>
        </div>

        <p>Giống như set comprehension và list comprehension mà chúng ta đã gặp trong phần trước, <strong>comprehension từ điển (dictionary comprehension)</strong> chạy một vòng lặp ngầm định, thu thập kết quả khóa/giá trị của các biểu thức trên mỗi lần lặp và sử dụng chúng để điền vào một dictionary mới:</p>

        <p>Về mặt trừu tượng, comprehension từ điển ánh xạ trực tiếp sang vòng lặp <code>for</code> như sau, trong đó cả <code>k</code> và <code>v</code> đều có thể sử dụng biến vòng lặp <code>x</code>:</p>
        <pre><code>{k: v for x in iterable}    # Dictionary comprehension

# Mã vòng lặp tương đương:
new = {}
for x in iterable:
    new[k] = v</code></pre>
      `,
      codeExamples: [
        {
          title: 'Kết hợp zip() với Dictionary Comprehension và giải nén tuple',
          code: `# Dùng dict(zip(...)) kinh điển
keys = ['a', 'b', 'c']
vals = [1, 2, 3]
d_zip = dict(zip(keys, vals))
print("Dùng dict(zip(...)):", d_zip)

# Tương đương bằng Dictionary Comprehension với tuple unpacking
d_comp = {k: v for (k, v) in zip(keys, vals)}
print("Dùng Dict Comprehension:", d_comp)`,
          output: `Dùng dict(zip(...)): {'a': 1, 'b': 2, 'c': 3}
Dùng Dict Comprehension: {'a': 1, 'b': 2, 'c': 3}`,
          annotations: [
            { line: 5, text: 'dict(zip(...)) ngắn gọn và nhanh.' },
            { line: 9, text: '{k: v for (k, v) in zip(...)} giải nén tuple (k, v) trên từng lượt lặp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Sức mạnh Tổng quát: Tính toán Biểu thức Khóa và Giá trị',
      content: `
        <p>Comprehension dài hơn một chút khi viết mã trong trường hợp <code>zip</code> đơn giản, nhưng chúng mang <strong>tính tổng quát hơn nhiều</strong> so với những gì ví dụ trên thể hiện:</p>

        <ul>
          <li>Chúng ta có thể sử dụng chúng để <strong>ánh xạ một luồng giá trị đơn lẻ</strong> vào dictionary.</li>
          <li>Áp dụng cho bất kỳ loại sequence nào (hoặc iterable khác).</li>
          <li>Cả khóa và giá trị thu thập được đều có thể là <strong>các biểu thức tính toán tùy biến</strong>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Các biểu thức tính toán khóa và giá trị linh hoạt trong ví dụ sách Lutz',
          code: `# 1. Số nguyên và bình phương: {x: x**2}
d_squares = {x: x ** 2 for x in [1, 2, 3, 4]}
print("Bình phương:          ", d_squares)

# 2. Nhân bản ký tự chuỗi: {c: c*4}
d_chars = {c: c * 4 for c in 'HACK'}
print("Ký tự nhân bản:       ", d_chars)

# 3. Biểu thức cho cả khóa và giá trị: {c.lower(): c + '!'}
d_expr = {c.lower(): (c + '!') for c in ['HACK', 'PY', 'CODE']}
print("Biểu thức khóa & giá trị:", d_expr)`,
          output: `Bình phương:           {1: 1, 2: 4, 3: 9, 4: 16}
Ký tự nhân bản:        {'H': 'HHHH', 'A': 'AAAA', 'C': 'CCCC', 'K': 'KKKK'}
Biểu thức khóa & giá trị: {'hack': 'HACK!', 'py': 'PY!', 'code': 'CODE!'}`,
          annotations: [
            { line: 2, text: 'Khóa là 1, 2, 3, 4; giá trị tương ứng là 1, 4, 9, 16.' },
            { line: 6, text: 'Duyệt qua từng ký tự của chuỗi \'HACK\'.' },
            { line: 10, text: 'c.lower() tính khóa chữ thường, (c + \'!\') tính giá trị đầu ra.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Thay thế fromkeys() và Khả năng Mở rộng',
      content: `
        <p>Comprehension từ điển cũng rất hữu ích để khởi tạo dictionary từ danh sách các khóa, theo cách thức rất giống với phương thức <code>fromkeys()</code> mà chúng ta đã gặp ở bài trước:</p>

        <ul>
          <li><code>dict.fromkeys(['a', 'b', 'c'], 0)</code> có thể viết tương đương bằng comprehension: <code>{k: 0 for k in ['a', 'b', 'c']}</code>.</li>
          <li><code>dict.fromkeys('code')</code> có thể viết tương đương: <code>{k: None for k in 'code'}</code>.</li>
        </ul>

        <p><em>Ưu điểm vượt trội của comprehension:</em> Nếu giá trị mặc định là một đối tượng khả biến (như list rỗng <code>[]</code>), viết <code>{k: [] for k in keys}</code> sẽ <strong>tạo ra các đối tượng list hoàn toàn độc lập cho từng khóa</strong>, triệt tiêu hoàn toàn bẫy chia sẻ tham chiếu nguy hiểm của <code>dict.fromkeys()</code>!</p>

        <p>Giống như họ hàng list và set của nó, comprehension từ điển hỗ trợ thêm các cú pháp mở rộng như <strong>mệnh đề <code>if</code></strong> để lọc kết quả, và các <strong>vòng lặp <code>for</code> lồng nhau</strong>. Chúng ta sẽ đào sâu hơn trong Chương 14 và 20.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh dict.fromkeys() với comprehension và khắc phục bẫy tham chiếu',
          code: `# So sánh fromkeys vs comprehension
print("fromkeys(['a', 'b'], 0):", dict.fromkeys(['a', 'b'], 0))
print("Comprehension tương đương: ", {k: 0 for k in ['a', 'b']})

# Giải pháp tạo danh sách con độc lập an toàn
keys = ['group1', 'group2']
safe_dict = {k: [] for k in keys}
safe_dict['group1'].append('item_1')

print("\nSau khi append vào group1:")
print("group1:", safe_dict['group1'])
print("group2:", safe_dict['group2'], "(vẫn rỗng, không bị chia sẻ tham chiếu!)")`,
          output: `fromkeys(['a', 'b'], 0): {'a': 0, 'b': 0}
Comprehension tương đương:  {'a': 0, 'b': 0}

Sau khi append vào group1:
group1: ['item_1']
group2: [] (vẫn rỗng, không bị chia sẻ tham chiếu!)`,
          annotations: [
            { line: 3, text: 'Cú pháp {k: 0 for k in ...} rõ ràng và trực quan.' },
            { line: 7, text: '{k: [] for k in keys} đánh giá biểu thức [] độc lập cho mỗi khóa.' },
            { line: 12, text: 'group2 hoàn toàn độc lập, không bị thay đổi theo group1.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mệnh đề lọc if trong Dictionary Comprehension',
        content: 'Bạn có thể lọc bỏ các cặp khóa/giá trị không mong muốn bằng cách thêm mệnh đề <code>if</code> ở cuối, ví dụ: <code>{x: x**2 for x in range(10) if x % 2 == 0}</code> chỉ lưu các số chẵn làm khóa.'
      }
    ],
    pitfalls: [
      {
        title: 'Cẩn thận khi biểu thức sinh khóa tạo ra các khóa trùng lặp',
        content: 'Nếu biểu thức sinh khóa trả về cùng một giá trị cho nhiều lượt lặp khác nhau (ví dụ: <code>{x % 2: x for x in range(5)}</code>), giá trị của lượt lặp sau sẽ ghi đè lên lượt lặp trước. Hãy đảm bảo biểu thức khóa tạo ra các giá trị duy nhất khi bạn muốn giữ đủ số lượng mục.'
      }
    ]
  },

  exercises: [
    {
      title: 'Đảo ngược Dictionary (hoán đổi Khóa và Giá trị) bằng Comprehension',
      level: 'Vừa',
      problem: 'Cho dictionary d = {"a": 1, "b": 2, "c": 3} có các giá trị là số nguyên duy nhất. Hãy viết đúng MỘT biểu thức Dictionary Comprehension để tạo ra dictionary đảo ngược inv_d có dạng {1: "a", 2: "b", 3: "c"}.',
      hint: 'Dùng cú pháp {v: k for k, v in d.items()}.',
      solutionCode: `d = {"a": 1, "b": 2, "c": 3}

# Đảo ngược khóa và giá trị bằng dict comprehension
inv_d = {v: k for k, v in d.items()}

print("Dictionary ban đầu: ", d)
print("Dictionary đảo ngược:", inv_d)`,
      solutionOutput: `Dictionary ban đầu:  {'a': 1, 'b': 2, 'c': 3}
Dictionary đảo ngược: {1: 'a', 2: 'b', 3: 'c'}`,
      explanation: 'Biểu thức {v: k for k, v in d.items()} lấy giá trị v làm khóa mới và khóa k làm giá trị mới.'
    }
  ],

  quiz: [
    {
      question: 'Biểu thức {x: x * 2 for x in [1, 2, 3]} sẽ tạo ra kết quả nào?',
      options: [
        '[(1, 2), (2, 4), (3, 6)]',
        '{1: 2, 2: 4, 3: 6}',
        '{1: 1, 2: 2, 3: 3}',
        '[2, 4, 6]'
      ],
      correctIndex: 1,
      explanation: 'Biểu thức {x: x * 2 for x in [1, 2, 3]} lần lượt gán các cặp 1: 2, 2: 4, 3: 6 vào dictionary mới.'
    },
    {
      question: 'Tại sao {k: [] for k in ["a", "b"]} lại an toàn hơn dict.fromkeys(["a", "b"], []) khi giá trị là list?',
      options: [
        'Vì dict.fromkeys() không cho phép truyền list làm giá trị.',
        'Vì dict.fromkeys() chia sẻ cùng một đối tượng list duy nhất cho tất cả các khóa, trong khi comprehension tạo ra một list mới tinh độc lập cho mỗi khóa.',
        'Vì comprehension chạy nhanh hơn gấp 10 lần.',
        'Vì dict.fromkeys() là hàm cũ đã bị loại bỏ.'
      ],
      correctIndex: 1,
      explanation: 'dict.fromkeys() dùng chung tham chiếu của đối tượng truyền vào. Trong khi đó, comprehension chạy lại biểu thức [] trên mỗi lượt lặp, tạo ra các đối tượng độc lập.'
    }
  ],

  summary: [
    'Dictionary Comprehension có cú pháp {k: v for x in iterable}, tương đương với việc lặp for và gán D[k] = v.',
    'Có thể dùng tuple unpacking kết hợp với zip: {k: v for (k, v) in zip(keys, values)}.',
    'Cho phép áp dụng các biểu thức tính toán tùy biến đồng thời cho cả khóa và giá trị đầu ra.',
    'Khắc phục triệt để bẫy chia sẻ tham chiếu của dict.fromkeys() khi khởi tạo với các đối tượng khả biến như list.',
    'Hỗ trợ mệnh đề lọc if và các vòng lặp lồng nhau tương tự như list comprehension.'
  ],

  nextSteps: 'Chúc mừng bạn đã hoàn thành Đợt 3! Trong bài tiếp theo (C8.18), chúng ta sẽ bước sang Đợt 4 để khám phá Thứ tự chèn khóa, LIFO với popitem(), Toán tử Hợp (| và |= từ Python 3.9+) và Triết lý ngôn ngữ của Mark Lutz.'
};