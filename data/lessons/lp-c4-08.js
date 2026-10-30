export default {
  id: 'lp-c4-08',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.8',
  title: 'Bộ giá trị (Tuples): Dãy tuần tự Bất biến',
  subtitle: 'Cú pháp (...), tính bất biến, phương thức index/count, và vai trò bảo vệ toàn vẹn dữ liệu',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững định nghĩa: Bộ giá trị (tuple) là một dãy tuần tự bất biến (immutable sequence).',
    'Sử dụng các thao tác dãy tuần tự và các phương thức đặc thù: index(), count().',
    'Nhận biết lỗi TypeError khi cố tình thay đổi phần tử của tuple.',
    'Trả lời câu hỏi bản chất của Mark Lutz: Tại sao cần tuple khi đã có danh sách (tính toàn vẹn dữ liệu và làm khóa từ điển).'
  ],

  intuition: {
    title: 'Hợp đồng công chứng không thể sửa chữa',
    metaphor: 'Nếu danh sách (list) là một bản nháp viết bằng bút chì có thể tẩy xóa, viết thêm, chèn dòng bất cứ lúc nào, thì bộ giá trị (tuple) giống như một văn bản hợp đồng đã được đóng dấu công chứng và niêm phong trong khung kính. Bạn có thể đọc từng điều khoản (chỉ mục), đếm số trang (len), nhưng không ai có quyền sửa một từ hay thêm một dòng vào đó. Tính bất biến này mang lại sự tin cậy tuyệt đối trong các hệ thống lớn.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH BẢN CHẤT: LIST VS TUPLE</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">DANH SÁCH (LIST) [...]</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">Khả biến (Mutable)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">L[0] = 99 ➔ ✅ Thành công</div>
            <div style="font-size:0.75rem;color:var(--danger);">❌ Không làm khóa từ điển được</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--success);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">BỘ GIÁ TRỊ (TUPLE) (...)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">Bất biến (Immutable)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">T[0] = 99 ➔ ❌ TypeError!</div>
            <div style="font-size:0.75rem;color:var(--success);">✅ Làm khóa từ điển (hashable)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm và Cú pháp Bộ giá trị (Tuples)',
      content: `
        <p>Đối tượng <strong>bộ giá trị (tuple)</strong> về cơ bản là một danh sách <strong>bất biến (immutable)</strong>. Giống như danh sách, tuple là một dãy tuần tự có thứ tự vị trí và có thể chứa các đối tượng thuộc kiểu tùy ý; nhưng giống như chuỗi, một khi đã được tạo ra, tuple không thể thay đổi giá trị tại chỗ.</p>
        <p>Về mặt cú pháp, tuple được khai báo bằng cặp ngoặc tròn <code>(...)</code> thay vì cặp ngoặc vuông:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo tuple và các thao tác dãy tuần tự',
          code: `>>> T = (1, 2, 3, 4)        # Cú pháp tuple 4 phần tử
>>> len(T)                  # Chiều dài của tuple
4
>>> T + (5, 6)              # Phép ghép nối sinh ra tuple mới
(1, 2, 3, 4, 5, 6)
>>> T[0]                    # Truy cập chỉ mục vị trí
1`,
          output: `4
(1, 2, 3, 4, 5, 6)
1`,
          annotations: [
            { line: 1, text: 'Tuple được định nghĩa trong cặp ngoặc tròn (...).' },
            { line: 4, text: 'Phép ghép nối + trả về tuple mới, T gốc không đổi.' },
            { line: 6, text: 'Chỉ mục vị trí T[0] lấy phần tử đầu tiên.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phương thức Đặc thù của Tuple: index() và count()',
      content: `
        <p>Vì là đối tượng bất biến nên tuple không có các phương thức sửa đổi như <code>append()</code>, <code>extend()</code> hay <code>sort()</code>. Thay vào đó, tuple chỉ cung cấp các phương thức truy vấn thông tin an toàn:</p>
        <ul>
          <li><code>T.index(x)</code>: Tìm và trả về chỉ mục xuất hiện đầu tiên của giá trị <code>x</code>.</li>
          <li><code>T.count(x)</code>: Đếm tổng số lần giá trị <code>x</code> xuất hiện trong tuple.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Tra cứu với index() và count()',
          code: `>>> T = (1, 2, 3, 4, 4)
>>> T.index(4)              # Vị trí xuất hiện đầu tiên của số 4
3
>>> T.count(4)              # Đếm số lần số 4 xuất hiện
2`,
          output: `3
2`,
          annotations: [
            { line: 2, text: 'Số 4 xuất hiện lần đầu ở chỉ mục 3.' },
            { line: 4, text: 'Số 4 xuất hiện tổng cộng 2 lần trong tuple T.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Tính Bất biến (Immutability) và Biến thể Cú pháp',
      content: `
        <p>Điểm khác biệt cốt lõi nhất của tuple so với list là tính <strong>bất biến</strong>. Bất kỳ nỗ lực nào nhằm gán lại phần tử đều sẽ bị trình thông dịch từ chối ngay lập tức:</p>
      `,
      codeExamples: [
        {
          title: 'Bảo vệ tính bất biến và cách tạo tuple mới',
          code: `>>> T = (1, 2, 3, 4)
>>> T[0] = 2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>> T = (2,) + T[1:]        # Muốn thay đổi, phải tạo một tuple mới hoàn toàn
>>> T
(2, 2, 3, 4)`,
          output: `TypeError: 'tuple' object does not support item assignment
(2, 2, 3, 4)`,
          annotations: [
            { line: 2, text: 'Phát sinh ngoại lệ TypeError vì tuple không cho phép gán phần tử.' },
            { line: 6, text: 'Cắt lát T[1:] kết hợp dấu phẩy tạo tuple mới.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Tại sao lại cần Tuple khi đã có Danh sách?',
      content: `
        <p>Đây là câu hỏi thường trực của những người mới học Python: nếu danh sách có thể làm được mọi việc của tuple và còn linh hoạt hơn, tại sao Python lại cần thêm kiểu dữ liệu tuple?</p>
        <p>Mark Lutz giải thích hai lý do kiến trúc căn bản:</p>
        <ol>
          <li><strong>Tính toàn vẹn dữ liệu (Data Integrity):</strong> Tính bất biến đảm bảo rằng dữ liệu sẽ không bị vô tình làm biến đổi bởi bất kỳ hàm hay tiến trình nào khác trong một chương trình phức tạp. Khi truyền một tuple, bạn có được sự đảm bảo chắc chắn rằng hằng số của bạn không bị "lệch".</li>
          <li><strong>Làm khóa trong Từ điển (Dictionary Keys):</strong> Do tuple là bất biến, nó có mã băm cố định (hashable). Do đó, tuple có thể dùng làm khóa trong từ điển (ví dụ tọa độ <code>(x, y)</code> hoặc <code>(năm, tháng)</code>) — điều mà danh sách khả biến tuyệt đối không thể làm được.</li>
        </ol>
      `
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy dấu phẩy cho Tuple một phần tử: (40,)',
        content: `
          <p>Nếu bạn viết <code>T = (40)</code>, Python sẽ hiểu cặp ngoặc tròn là dấu ngoặc biểu thức toán học, và <code>T</code> chỉ là số nguyên <code>40</code>! Để định nghĩa một tuple chỉ có 1 phần tử, bạn bắt buộc phải thêm dấu phẩy ở cuối:</p>
          <pre><code>T = (40,)    # Đây mới thực sự là tuple 1 phần tử!</code></pre>
        `
      }
    ],
    tips: [
      {
        title: 'Cú pháp tuple không cần ngoặc tròn',
        content: `
          <p>Trong thực tế, dấu phẩy mới là yếu tố quyết định tạo nên tuple chứ không phải dấu ngoặc tròn. Câu lệnh <code>x = 1, 2, 3</code> tự động tạo ra một tuple <code>(1, 2, 3)</code>. Ngoặc tròn chỉ bắt buộc khi cần tránh nhập nhằng cú pháp (ví dụ truyền tuple vào làm đối số hàm).</p>
        `
      }
    ],
    deepDive: {
      title: 'Hiệu năng và Tối ưu bộ nhớ của Tuple trong CPython',
      content: `
        <p>Vì tuple có kích thước cố định vĩnh viễn, CPython cấp phát đúng kích thước bộ nhớ cần thiết mà không cần over-allocation như list. Hơn nữa, CPython có cơ chế bộ nhớ đệm (freelist) để tái sử dụng các khối bộ nhớ tuple nhỏ đã giải phóng, giúp việc khởi tạo tuple nhanh hơn đáng kể so với danh sách.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Dùng tuple làm khóa bản đồ tọa độ',
      level: 'Dễ',
      description: 'Hãy tạo từ điển <code>elevation_map</code> lưu độ cao của các điểm địa lý với khóa là tuple tọa độ <code>(vĩ_độ, kinh_độ)</code>: điểm (10.5, 106.7) có độ cao 15 mét, điểm (21.0, 105.8) có độ cao 25 mét. Sau đó tra cứu độ cao tại điểm (21.0, 105.8).',
      starterCode: `# Tạo từ điển elevation_map với khóa tuple
`,
      solution: `elevation_map = {
    (10.5, 106.7): 15,
    (21.0, 105.8): 25
}

hanoi_point = (21.0, 105.8)
print("Độ cao tại Hà Nội:", elevation_map[hanoi_point], "mét")`,
      solutionOutput: `Độ cao tại Hà Nội: 25 mét`,
      explanation: 'Tuple là đối tượng bất biến (hashable) nên hoàn toàn hợp lệ để làm khóa trong từ điển, rất lý tưởng để biểu diễn cặp tọa độ.'
    },
    {
      title: 'Hoán đổi hai giá trị không cần biến tạm',
      level: 'Vừa',
      description: 'Cho hai biến <code>a = 100</code> và <code>b = 200</code>. Hãy hoán đổi giá trị của chúng trong một dòng lệnh duy nhất bằng kỹ thuật tuple packing và unpacking.',
      starterCode: `a = 100
b = 200

# Hoán đổi trong 1 dòng
`,
      solution: `a = 100
b = 200

a, b = b, a

print(f"a = {a}, b = {b}")`,
      solutionOutput: `a = 200, b = 100`,
      explanation: 'Vế phải <code>b, a</code> đóng gói thành tuple <code>(200, 100)</code>, vế trái tự động giải nén lần lượt vào <code>a</code> và <code>b</code>.'
    }
  ],

  quiz: [
    {
      question: 'Khai báo nào sau đây tạo ra một bộ giá trị (tuple) gồm 1 phần tử?',
      options: [
        'x = (1)',
        'x = (1,)',
        'x = tuple[1]',
        'x = [1,]'
      ],
      correctIndex: 1,
      explanation: 'Dấu phẩy (1,) là bắt buộc để phân biệt tuple một phần tử với biểu thức toán học trong ngoặc tròn.'
    },
    {
      question: 'Phương thức nào sau đây KHÔNG thuộc về kiểu đối tượng tuple?',
      options: [
        'T.index(x)',
        'T.count(x)',
        'T.append(x)',
        'T.__len__()'
      ],
      correctIndex: 2,
      explanation: 'Tuple là kiểu bất biến nên không có phương thức append() hay bất kỳ phương thức sửa đổi tại chỗ nào.'
    },
    {
      question: 'Tại sao danh sách (list) không thể dùng làm khóa cho từ điển trong khi tuple lại làm được?',
      options: [
        'Vì danh sách chiếm nhiều byte bộ nhớ hơn.',
        'Vì danh sách là đối tượng khả biến (mutable) nên không hashable; tuple là bất biến (immutable) nên hashable.',
        'Vì từ điển chỉ chấp nhận chuỗi ký tự làm khóa.',
        'Vì cú pháp Python không cho phép viết ngoặc vuông trong ngoặc nhọn.'
      ],
      correctIndex: 1,
      explanation: 'Bảng băm yêu cầu khóa phải có mã băm bất biến trong suốt vòng đời. Tính bất biến của tuple đáp ứng yêu cầu này.'
    }
  ],

  summary: [
    'Bộ giá trị (tuple) là một dãy tuần tự bất biến, được biểu diễn bằng cú pháp ngoặc tròn (...).',
    'Tuple một phần tử bắt buộc phải có dấu phẩy đi kèm: (x,).',
    'Chỉ hỗ trợ các thao tác đọc và phương thức truy vấn thông tin: index() và count().',
    'Cố tình gán phần tử T[0] = x sẽ làm phát sinh ngoại lệ TypeError.',
    'Tuple đóng vai trò then chốt trong việc bảo vệ toàn vẹn dữ liệu và được dùng làm khóa trong từ điển.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 27–28.'
  ]
};
