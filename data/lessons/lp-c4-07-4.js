export default {
  id: 'lp-c4-07-4',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.7.4',
  title: 'Từ điển: Lặp qua Từ điển với Vòng lặp for',
  subtitle: 'D.keys(), D.values(), D.items(), lặp ngầm định và sắp xếp khóa với hàm sorted()',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững 3 phương thức dạng khung nhìn (view objects) của từ điển: keys(), values(), items().',
    'Hiểu nguyên tắc lặp ngầm định: câu lệnh for key in D: tự động duyệt qua các khóa của từ điển.',
    'Áp dụng hàm dựng sẵn sorted(D) để duyệt qua các khóa theo thứ tự bảng chữ cái/số học.',
    'Phân biệt thứ tự chèn tự nhiên (insertion order từ Python 3.7) và thứ tự sắp xếp có chủ đích (sorted order).'
  ],

  intuition: {
    title: 'Người phát thư duyệt danh bạ',
    metaphor: 'Khi người phát thư cầm một cuốn sổ địa chỉ (từ điển) để đi phát quà, cách tự nhiên nhất là anh ấy lật từng trang để đọc tên chủ nhà (khóa): for key in D. Nếu muốn lấy cả tên và gói quà cùng lúc, anh ấy dùng D.items(). Và nếu muốn đi giao theo thứ tự tên A-Z để không bị sót ngõ, anh ấy chỉ cần nhờ người thư ký sắp xếp danh sách tên trước khi lên đường: for key in sorted(D).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">3 CÁCH DUYỆT TỪ ĐIỂN VỚI VÒNG LẶP FOR</div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);font-size:0.8rem;">for k in D:</div>
            <div style="color:var(--text-secondary);font-size:0.75rem;margin:4px 0;">Lặp qua KHÓA</div>
            <div style="color:var(--text-muted);font-size:0.7rem;">(Chuẩn mực ngầm định)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);font-size:0.8rem;">for v in D.values():</div>
            <div style="color:var(--text-secondary);font-size:0.75rem;margin:4px 0;">Lặp qua GIÁ TRỊ</div>
            <div style="color:var(--text-muted);font-size:0.7rem;">(Không quan tâm khóa)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);font-size:0.8rem;">for k, v in D.items():</div>
            <div style="color:var(--text-secondary);font-size:0.75rem;margin:4px 0;">Lặp KHÓA + GIÁ TRỊ</div>
            <div style="color:var(--text-muted);font-size:0.7rem;">(Cặp tuple hoàn chỉnh)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Vòng lặp for và Lặp Ngầm định trên Từ điển',
      content: `
        <p>Vòng lặp <code>for</code> là công cụ chính trong Python để duyệt qua các phần tử của một tập hợp. Khi bạn đặt một từ điển trực tiếp vào vòng lặp <code>for</code>, Python sẽ <strong>ngầm định duyệt qua các khóa (keys)</strong> của từ điển đó.</p>
        <p>Đây là phong cách viết ngắn gọn, tự nhiên và được xem là chuẩn mực Pythonic:</p>
      `,
      codeExamples: [
        {
          title: 'Lặp ngầm định qua các khóa của từ điển',
          code: `>>> D = {'a': 1, 'b': 2, 'c': 3}
>>> for key in D:
...     print(key, '=>', D[key])
... 
a => 1
b => 2
c => 3`,
          output: `a => 1
b => 2
c => 3`,
          annotations: [
            { line: 2, text: 'for key in D ngầm định tương đương với for key in D.keys().' },
            { line: 3, text: 'D[key] truy xuất giá trị tương ứng của mỗi khóa trong từng lượt lặp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Các Phương thức Khung nhìn: keys(), values(), items()',
      content: `
        <p>Để trích xuất các thành phần cụ thể của từ điển, Python cung cấp ba phương thức dạng khung nhìn (view objects):</p>
        <ul>
          <li><code>D.keys()</code>: Trả về tập hợp các khóa của từ điển.</li>
          <li><code>D.values()</code>: Trả về tập hợp các giá trị của từ điển.</li>
          <li><code>D.items()</code>: Trả về danh sách các cặp <code>(khóa, giá_trị)</code> dưới dạng tuple.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng keys(), values() và items()',
          code: `>>> D = {'a': 1, 'b': 2, 'c': 3}
>>> list(D.keys())
['a', 'b', 'c']
>>> list(D.values())
[1, 2, 3]
>>> list(D.items())
[('a', 1), ('b', 2), ('c', 3)]`,
          output: `['a', 'b', 'c']
[1, 2, 3]
[('a', 1), ('b', 2), ('c', 3)]`,
          annotations: [
            { line: 2, text: 'Chuyển view keys thành danh sách các chuỗi khóa.' },
            { line: 4, text: 'Chuyển view values thành danh sách các giá trị số.' },
            { line: 6, text: 'Chuyển view items thành danh sách các cặp tuple (key, value).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Sắp xếp Khóa trước khi Lặp: sorted(D)',
      content: `
        <p>Trước Python 3.7, từ điển lưu trữ các khóa theo thứ tự băm ngẫu nhiên. Khi cần hiển thị hoặc xử lý dữ liệu theo thứ tự bảng chữ cái hoặc số học tăng dần của khóa, lập trình viên thường dùng hai cách:</p>
        <p><strong>Cách 1 (Thủ công / Truyền thống):</strong></p>
        <pre><code>Ks = list(D.keys())
Ks.sort()
for key in Ks:
    print(key, '=>', D[key])</code></pre>
        <p><strong>Cách 2 (Hiện đại, khuyên dùng): Sử dụng hàm dựng sẵn <code>sorted()</code></strong></p>
        <p>Hàm <code>sorted(D)</code> nhận bất kỳ đối tượng có thể lặp nào, tự động thu thập các khóa, sắp xếp chúng theo thứ tự tăng dần và trả về một danh sách mới:</p>
      `,
      codeExamples: [
        {
          title: 'Duyệt từ điển theo thứ tự khóa đã sắp xếp với sorted()',
          code: `>>> D = {'a': 1, 'c': 3, 'b': 2}
>>> for key in sorted(D):
...     print(key, '=>', D[key])
... 
a => 1
b => 2
c => 3`,
          output: `a => 1
b => 2
c => 3`,
          annotations: [
            { line: 2, text: 'sorted(D) sắp xếp các khóa [\'a\', \'c\', \'b\'] thành [\'a\', \'b\', \'c\'].' },
            { line: 3, text: 'Vòng lặp duyệt tuần tự qua các khóa đã được sắp xếp ngay ngắn.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Tránh sửa đổi từ điển trong khi đang lặp',
        content: `
          <p>Nếu bạn thêm hoặc xóa bớt khóa của từ điển trực tiếp bên trong một vòng lặp <code>for key in D:</code>, Python sẽ ném ngoại lệ:</p>
          <pre><code>RuntimeError: dictionary changed size during iteration</code></pre>
          <p>Nếu bạn muốn xóa các phần tử thỏa mãn điều kiện, hãy lặp qua một bản sao danh sách các khóa: <code>for key in list(D.keys()):</code>.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Phân biệt Thứ tự Chèn vs Thứ tự Sắp xếp',
        content: `
          <p>Kể từ Python 3.7, từ điển duy trì <strong>thứ tự chèn (insertion order)</strong>. Tức là nếu bạn chèn theo thứ tự <code>'z'</code> rồi đến <code>'a'</code>, vòng lặp <code>for k in D:</code> sẽ xuất hiện <code>'z'</code> trước <code>'a'</code>.</p>
          <p>Nếu bạn muốn thứ tự bảng chữ cái <code>'a'</code> trước <code>'z'</code>, bạn bắt buộc phải dùng <code>sorted(D)</code>.</p>
        `
      }
    ],
    deepDive: {
      title: 'Bản chất của Dictionary View Objects',
      content: `
        <p>Trong Python 2, <code>D.keys()</code> trả về một danh sách mới hoàn chỉnh, gây lãng phí bộ nhớ nếu từ điển lớn. Trong Python 3, <code>D.keys()</code>, <code>D.values()</code>, <code>D.items()</code> trả về các đối tượng <strong>khung nhìn (view objects)</strong> động.</p>
        <p>Khung nhìn không sao chép dữ liệu; nếu từ điển <code>D</code> thay đổi sau khi tạo khung nhìn, khung nhìn sẽ tự động phản ánh các thay đổi mới đó ngay lập tức mà không tốn thêm byte RAM nào.</p>
      `
    }
  },

  exercises: [
    {
      title: 'In bảng điểm xếp hạng học sinh theo bảng chữ cái',
      level: 'Dễ',
      description: 'Cho từ điển điểm số <code>scores = {\'Nam\': 8.5, \'An\': 9.0, \'Cường\': 7.0, \'Bình\': 8.0}</code>. Hãy viết vòng lặp in danh sách theo thứ tự tên học sinh từ A đến Z dạng "Tên: Điểm".',
      starterCode: `scores = {'Nam': 8.5, 'An': 9.0, 'Cường': 7.0, 'Bình': 8.0}

# Dùng sorted(scores) và vòng lặp for
`,
      solution: `scores = {'Nam': 8.5, 'An': 9.0, 'Cường': 7.0, 'Bình': 8.0}

for name in sorted(scores):
    print(f"{name}: {scores[name]}")`,
      solutionOutput: `An: 9.0
Bình: 8.0
Cường: 7.0
Nam: 8.5`,
      explanation: '<code>sorted(scores)</code> sắp xếp các khóa chuỗi tiếng Việt/ASCII theo thứ tự chữ cái, giúp hiển thị bảng điểm có trật tự.'
    },
    {
      title: 'Lọc và xóa các khóa có giá trị âm an toàn',
      level: 'Vừa',
      description: 'Cho từ điển tài khoản <code>balances = {\'acc1\': 100, \'acc2\': -50, \'acc3\': 200, \'acc4\': -20}</code>. Hãy xóa các tài khoản có số dư âm mà không gặp lỗi RuntimeError.',
      starterCode: `balances = {'acc1': 100, 'acc2': -50, 'acc3': 200, 'acc4': -20}

# Xóa các tài khoản số dư âm an toàn
`,
      solution: `balances = {'acc1': 100, 'acc2': -50, 'acc3': 200, 'acc4': -20}

for acc in list(balances.keys()):
    if balances[acc] < 0:
        del balances[acc]

print("Tài khoản hợp lệ:", balances)`,
      solutionOutput: `Tài khoản hợp lệ: {'acc1': 100, 'acc3': 200}`,
      explanation: '<code>list(balances.keys())</code> tạo ra một danh sách bản sao tách rời, cho phép xóa phần tử trong <code>balances</code> mà không làm hỏng vòng lặp.'
    }
  ],

  quiz: [
    {
      question: 'Khi thực thi vòng lặp for x in D:, biến x đại diện cho thành phần nào của từ điển?',
      options: [
        'Giá trị (value)',
        'Khóa (key)',
        'Cặp tuple (key, value)',
        'Chỉ mục số nguyên 0, 1, 2...'
      ],
      correctIndex: 1,
      explanation: 'Quy ước chuẩn của Python: lặp trực tiếp trên từ điển sẽ lặp qua các khóa (keys).'
    },
    {
      question: 'Hàm dựng sẵn nào sau đây nhận từ điển D và trả về một danh sách các khóa đã được sắp xếp tăng dần?',
      options: [
        'D.sort()',
        'sorted(D)',
        'order(D)',
        'D.order_keys()'
      ],
      correctIndex: 1,
      explanation: 'sorted(D) trả về danh sách các khóa được sắp xếp. Bản thân từ điển không có phương thức sort().'
    },
    {
      question: 'Điều gì xảy ra nếu bạn thêm một khóa mới vào từ điển ngay bên trong thân vòng lặp for k in D:?',
      options: [
        'Vòng lặp sẽ chạy tiếp bình thường và duyệt luôn khóa mới.',
        'Python tự động bỏ qua khóa mới.',
        'Ném ngoại lệ RuntimeError: dictionary changed size during iteration.',
        'Từ điển bị xóa sạch dữ liệu.'
      ],
      correctIndex: 2,
      explanation: 'Python cấm thay đổi kích thước từ điển khi đang lặp qua khung nhìn lặp của nó để đảm bảo tính nhất quán dữ liệu.'
    }
  ],

  summary: [
    'Vòng lặp for key in D: là cách duyệt từ điển chuẩn mực, tự động lặp ngầm định qua các khóa.',
    'D.keys(), D.values(), D.items() cung cấp các khung nhìn (view objects) động tới các thành phần của từ điển.',
    'Hàm dựng sẵn sorted(D) thu thập và sắp xếp các khóa theo thứ tự tăng dần mà không làm thay đổi từ điển gốc.',
    'Kể từ Python 3.7, từ điển bảo toàn thứ tự chèn, nhưng khi cần thứ tự quy chuẩn hãy dùng sorted().',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 25–26.'
  ]
};
