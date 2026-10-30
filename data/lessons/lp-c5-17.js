export default {
  id: 'lp-c5-17',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.17',
  title: 'Đối tượng Tập hợp (Set): Khái niệm, Cú pháp & Thao tác Cơ bản',
  subtitle: 'Lý thuyết tập hợp trong Python: phần tử duy nhất, hằng số {}, unpack *, toán tử biểu thức và các phương thức cốt lõi',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu định nghĩa đối tượng Tập hợp (set): bộ sưu tập không có thứ tự, phần tử duy nhất và bất biến.',
    'Phân biệt hai cách tạo tập hợp: hằng số bằng chữ {} và hàm khởi tạo set(); ghi nhớ bắt buộc dùng set() để tạo tập rỗng.',
    'Sử dụng cú pháp giải nén dấu sao * (unpacking) trong hằng số tập hợp.',
    'Thực hiện thành thạo các phép toán tập hợp bằng toán tử biểu thức: hiệu (-), hợp (|), giao (&), hiệu đối xứng (^), tập con (<).',
    'Sử dụng các phương thức biến đổi tập hợp: add(), update(), remove(), intersection().'
  ],

  intuition: {
    title: 'Chiếc túi lọc thông minh và các vòng tròn Venn',
    metaphor: 'Hãy tưởng tượng bạn ném một nắm hạt vào một chiếc túi thần kỳ. Dù bạn ném vào 10 hạt đậu giống hệt nhau, chiếc túi chỉ giữ lại đúng 1 hạt duy nhất và tự động gạt bỏ 9 hạt thừa (tự động khử trùng lặp). Chiếc túi không có ngăn trước hay ngăn sau (không có thứ tự). Khi bạn đặt chiếc túi này cạnh một chiếc túi khác, bạn có thể thực hiện những phép thuật toán học kỳ diệu: tìm những hạt chung của cả hai túi (phép giao &), gom tất cả hạt của hai túi lại làm một (phép hợp |), hoặc tìm những hạt chỉ có ở túi này mà không có ở túi kia (phép hiệu -). Đó chính là bản chất của đối tượng Tập hợp (set) trong Python.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">4 PHÉP TOÁN TẬP HỢP CỐT LÕI (BIỂU THỨC TOÁN TỬ)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:12px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:4px;">1. Phép Hợp (|)</div>
            <div style="font-size:0.85rem;color:var(--text-primary);"><code>x | y</code></div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">Có trong ít nhất một bên (Union)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">2. Phép Giao (&amp;)</div>
            <div style="font-size:0.85rem;color:var(--text-primary);"><code>x &amp; y</code></div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">Có trong cả hai bên (Intersection)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:4px;">3. Phép Hiệu (-)</div>
            <div style="font-size:0.85rem;color:var(--text-primary);"><code>x - y</code></div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">Có trong x nhưng không có trong y (Difference)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-secondary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-secondary);margin-bottom:4px;">4. Hiệu Đối Xứng (^)</div>
            <div style="font-size:0.85rem;color:var(--text-primary);"><code>x ^ y</code></div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">Chỉ thuộc một bên, không thuộc cả hai (XOR)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Đối tượng Tập hợp (Set Objects)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 28 / 38 – Trang 30 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Bên cạnh tất cả các đối tượng số học mà chúng ta đã khám phá, Python còn tích hợp sẵn sự hỗ trợ cho <strong>tập hợp (set)</strong>—một bộ sưu tập <strong>không có thứ tự chứa các đối tượng duy nhất và bất biến</strong>, hỗ trợ các thao tác tương ứng với lý thuyết tập hợp trong toán học.</p>
        <p>Tập hợp đứng ở ranh giới giữa các bộ sưu tập và toán học nhưng nghiêng đủ nhiều về phía toán học để xứng đáng được đề cập trong chương này. Theo định nghĩa, <em>một phần tử chỉ xuất hiện duy nhất một lần trong một tập hợp, bất kể nó được thêm vào bao nhiêu lần</em>.</p>
        <p>Tập hợp có thể lặp qua (iterable), có thể mở rộng và thu hẹp theo nhu cầu, và có thể chứa nhiều kiểu đối tượng khác nhau. Tuy nhiên, vì tập hợp không có thứ tự và không ánh xạ khóa tới giá trị, chúng <strong>không phải là kiểu dãy tuần tự (sequence) cũng không phải kiểu ánh xạ (mapping)</strong>; chúng là một thể loại kiểu dữ liệu riêng biệt.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Cú pháp Tạo Tập hợp và Giải nén Dấu sao (*)',
      content: `
        <p>Có hai cách để tạo tập hợp trong Python:</p>
        <ol>
          <li><strong>Hằng số bằng chữ (Literal):</strong> Sử dụng cặp ngoặc nhọn <code>{}</code> liệt kê các phần tử không có khóa (ví dụ: <code>{1, 2, 3}</code>).</li>
          <li><strong>Lời gọi hàm khởi tạo <code>set()</code>:</strong> Nhận một dãy tuần tự (hoặc bất kỳ iterable nào) để chuyển thành tập hợp. <em>Bắt buộc phải dùng <code>set()</code> để tạo tập hợp rỗng</em>, vì cú pháp <code>{}</code> trần trụi đã được dành riêng cho từ điển rỗng (dict).</li>
        </ol>
        <p>Từ Python 3.5+, bạn có thể dùng toán tử dấu sao <code>*</code> bên trong hằng số tập hợp để giải nén (unpack) các phần tử từ một iterable khác vào tập hợp mới:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo tập hợp và giải nén bằng dấu sao',
          code: `>>> x = set('abcde')                  # Tạo tập hợp từ chuỗi bằng hàm set()
>>> y = {99, 'b', 'y', 'd', 1.2}      # Tạo tập hợp bằng hằng số chữ {}
>>> z = set()                         # Tạo tập hợp rỗng ({} là từ điển rỗng!)
>>> z
set()
>>> z = set([1.2, 'a', 3, 1.2, 'a'])  # Tự động lọc bỏ các phần tử trùng lặp
>>> z
{'a', 1.2, 3}
>>> {1, *'abc', *[1, 2, 3]}           # Giải nén bằng dấu * trong hằng số (Python 3.5+)
{1, 2, 3, 'c', 'b', 'a'}`,
          output: `set()
{'a', 1.2, 3}
{1, 2, 3, 'c', 'b', 'a'}`,
          annotations: [
            { line: 3, text: 'Bắt buộc dùng set() để tạo tập hợp rỗng, in ra dưới dạng set().' },
            { line: 5, text: 'Các phần tử 1.2 và "a" bị lọc bỏ trùng lặp, chỉ giữ lại một lần xuất hiện.' },
            { line: 8, text: 'Toán tử * giải nén chuỗi "abc" và danh sách [1, 2, 3] vào tập hợp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phép toán Tập hợp bằng Toán tử và Phương thức',
      content: `
        <p>Một khi bạn đã có các tập hợp, các toán tử biểu thức sẽ kích hoạt các phép toán lý thuyết tập hợp tiêu chuẩn:</p>
        <ul>
          <li><code>x - y</code>: <strong>Phép hiệu</strong> (chứa các phần tử có trong <code>x</code> nhưng không có trong <code>y</code>).</li>
          <li><code>x | y</code>: <strong>Phép hợp</strong> (chứa các phần tử có trong ít nhất một trong hai bên).</li>
          <li><code>x &amp; y</code>: <strong>Phép giao</strong> (chứa các phần tử chung xuất hiện ở cả hai bên).</li>
          <li><code>x ^ y</code>: <strong>Hiệu đối xứng</strong> (chứa các phần tử thuộc một bên nhưng không thuộc cả hai).</li>
          <li><code>x &lt; y</code>, <code>x &gt; y</code>: Kiểm tra quan hệ tập con (subset) và tập cha (superset).</li>
          <li><code>'d' in x</code>: Kiểm tra thành viên (hoạt động trên mọi tập hợp và iterable).</li>
        </ul>
        <p>Ngoài các biểu thức toán tử, đối tượng tập hợp còn cung cấp các <strong>phương thức</strong> tương ứng hỗ trợ thay đổi tập hợp: <code>add()</code> chèn thêm phần tử, <code>update()</code> hợp tại chỗ, và <code>remove()</code> xóa phần tử theo giá trị.</p>
      `,
      codeExamples: [
        {
          title: 'Các toán tử và phương thức tập hợp trong REPL',
          code: `>>> x = set('abcd')
>>> y = set('bdxy')
>>> x - y                             # Phép hiệu: có trong x, không có trong y
{'a', 'c'}
>>> x | y                             # Phép hợp: có trong ít nhất một bên
{'y', 'd', 'x', 'c', 'a', 'b'}
>>> x & y                             # Phép giao: có trong cả hai bên
{'d', 'b'}
>>> x ^ y                             # Hiệu đối xứng: không cùng thuộc cả hai
{'y', 'x', 'c', 'a'}
>>> 'd' in x                          # Kiểm tra thành viên
True
>>> z = x.intersection(y)             # Phương thức tương đương x & y
>>> z.add('HACK')                     # Chèn thêm một phần tử
>>> z.remove('b')                     # Xóa một phần tử theo giá trị
>>> z
{'X', 'HACK', 'd'}`.replace("{'X', 'HACK', 'd'}", "{'HACK', 'd'}"),
          output: `{'a', 'c'}
{'y', 'd', 'x', 'c', 'a', 'b'}
{'d', 'b'}
{'y', 'x', 'c', 'a'}
True
{'HACK', 'd'}`,
          annotations: [
            { line: 3, text: 'Phép hiệu x - y loại bỏ các ký tự "b", "d" vốn có mặt trong y.' },
            { line: 7, text: 'Phép giao x & y tìm ra hai phần tử chung là "d" và "b".' },
            { line: 12, text: 'Phương thức add() chèn thêm chuỗi "HACK" vào tập hợp z.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy cú pháp: Cặp ngoặc nhọn rỗng {} là từ điển rỗng (dict)',
        content: 'Vì từ điển ra đời trước tập hợp trong lịch sử Python, cú pháp <code>{}</code> đã được dành riêng cho từ điển rỗng (<code>dict</code>). Do đó, biểu thức <code>type({})</code> trả về <code>&lt;class "dict"&gt;</code>. Muốn tạo tập hợp rỗng, bạn <strong>bắt buộc phải gọi hàm <code>set()</code></strong>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Lọc phần tử chung giữa hai danh sách',
      level: 'Dễ',
      problem: 'Cho hai danh sách <code>lop_A = ["An", "Bình", "Cường", "Dũng"]</code> và <code>lop_B = ["Bình", "Dũng", "Giang", "Hương"]</code>. Hãy dùng phép toán tập hợp để tìm danh sách các bạn học sinh tham gia cả hai lớp.',
      hint: 'Chuyển hai list thành set rồi lấy phép giao &.',
      solutionCode: `lop_A = ["An", "Bình", "Cường", "Dũng"]
lop_B = ["Bình", "Dũng", "Giang", "Hương"]

# Chuyển thành tập hợp và lấy phép giao (&)
hoc_sinh_chung = set(lop_A) & set(lop_B)

print("Học sinh tham gia cả 2 lớp:", sorted(list(hoc_sinh_chung)))`,
      solutionOutput: `Học sinh tham gia cả 2 lớp: ['Bình', 'Dũng']`,
      explanation: 'Phép giao <code>&amp;</code> giữa hai tập hợp trả về tập gồm các phần tử xuất hiện ở cả hai bên: <code>{\'Bình\', \'Dũng\'}</code>.'
    }
  ],

  quiz: [
    {
      question: 'Cú pháp nào sau đây là cách duy nhất ĐÚNG để tạo một tập hợp rỗng trong Python?',
      options: [
        's = {}',
        's = set()',
        's = set({})',
        's = []'
      ],
      correctIndex: 1,
      explanation: 'Cú pháp {} trần trụi tạo ra một từ điển rỗng (dict). Do đó bạn bắt buộc phải dùng s = set() để tạo tập hợp rỗng.'
    },
    {
      question: 'Cho x = set("abc") và y = set("bcd"). Biểu thức x ^ y (hiệu đối xứng) sẽ trả về tập hợp nào?',
      options: [
        "{'b', 'c'}",
        "{'a', 'b', 'c', 'd'}",
        "{'a', 'd'}",
        "{'a'}"
      ],
      correctIndex: 2,
      explanation: 'Hiệu đối xứng (symmetric difference - ^) giữ lại các phần tử chỉ thuộc x hoặc chỉ thuộc y, nhưng loại bỏ các phần tử chung của cả hai bên. Do đó kết quả là {\'a\', \'d\'}.'
    }
  ],

  summary: [
    'Tập hợp (set) là bộ sưu tập không có thứ tự, chứa các phần tử duy nhất và bất biến.',
    'Tạo tập hợp bằng hằng số {1, 2, 3} hoặc hàm set(); tập hợp rỗng bắt buộc dùng set().',
    'Toán tử dấu sao * cho phép giải nén các phần tử từ iterable vào hằng số tập hợp.',
    'Bốn phép toán tập hợp cốt lõi: hiệu (-), hợp (|), giao (&), và hiệu đối xứng (^).',
    'Các phương thức tập hợp: add() thêm phần tử, update() hợp tại chỗ, remove() xóa phần tử.'
  ]
};