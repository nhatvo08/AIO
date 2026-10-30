export default {
  id: 'lp-c4-07-1',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.7.1',
  title: 'Từ điển: Kiểu dữ liệu Ánh xạ (Mappings)',
  subtitle: 'Lưu trữ theo cặp khóa-giá trị (key-value), truy cập không theo vị trí và gán để tạo khóa mới',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt rõ ràng hai nhóm cấu trúc dữ liệu cốt lõi: Dãy tuần tự (Sequence) và Ánh xạ (Mapping).',
    'Nắm vững cú pháp tạo từ điển bằng cặp ngoặc nhọn {k: v} và hàm khởi dựng dict().',
    'Sử dụng khóa để truy xuất và cập nhật giá trị trong từ điển.',
    'Hiểu nguyên lý quan trọng: phép gán D[khóa] = giá_trị sẽ tự động tạo khóa mới nếu khóa đó chưa tồn tại.'
  ],

  intuition: {
    title: 'Danh bạ điện thoại và Tủ hồ sơ có nhãn',
    metaphor: 'Nếu danh sách (list) giống như một hàng người xếp hàng đánh số thứ tự từ 0 đến N (bạn tìm người bằng số thứ tự), thì từ điển (dictionary) giống như một cuốn danh bạ điện thoại hoặc một chiếc tủ hồ sơ có dán nhãn tên. Bạn không quan tâm hồ sơ nằm ở ngăn thứ mấy; bạn chỉ cần tìm đúng chiếc nhãn "name" hay "job" để lấy ngay thông tin bên trong. Đó chính là bản chất của ánh xạ (mapping).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CẤU TRÚC ÁNH XẠ (KEY ➔ VALUE)</div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;max-width:520px;margin:0 auto;width:100%;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="color:var(--accent-primary);font-weight:700;font-size:0.8rem;">'food'</div>
            <div style="color:var(--text-muted);font-size:0.7rem;margin:2px 0;">khóa (key)</div>
            <div style="color:var(--text-primary);font-weight:600;">'Spam'</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="color:var(--success);font-weight:700;font-size:0.8rem;">'quantity'</div>
            <div style="color:var(--text-muted);font-size:0.7rem;margin:2px 0;">khóa (key)</div>
            <div style="color:var(--text-primary);font-weight:600;">4</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;">
            <div style="color:var(--warning);font-weight:700;font-size:0.8rem;">'color'</div>
            <div style="color:var(--text-muted);font-size:0.7rem;margin:2px 0;">khóa (key)</div>
            <div style="color:var(--text-primary);font-weight:600;">'pink'</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">D['food'] trả về 'Spam'. Không dùng chỉ mục số 0, 1, 2 để truy cập.</div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Từ điển là Kiểu Ánh xạ (Mapping)',
      content: `
        <p>Từ điển trong Python hoàn toàn khác biệt so với chuỗi và danh sách. Chúng không phải là một dãy tuần tự (sequence) mà là kiểu tập hợp duy nhất trong các kiểu cốt lõi thuộc nhóm <strong>ánh xạ (mapping)</strong>.</p>
        <p>Các đặc tính cơ bản của ánh xạ:</p>
        <ul>
          <li><strong>Không dựa trên vị trí:</strong> Ánh xạ không duy trì thứ tự sắp xếp từ trái qua phải như chuỗi hay danh sách để truy cập bằng chỉ số 0, 1, 2.</li>
          <li><strong>Lưu trữ theo cặp khóa-giá trị:</strong> Các đối tượng được lưu trữ và truy xuất thông qua một <em>khóa (key)</em> định danh.</li>
          <li><strong>Khả biến và co giãn động:</strong> Giống như danh sách, từ điển có thể thay đổi trực tiếp tại chỗ và tự động mở rộng/thu hẹp kích thước theo nhu cầu.</li>
        </ul>
      `
    },
    {
      id: 'sec-2',
      title: '2. Khởi tạo và Truy xuất Dữ liệu',
      content: `
        <p>Cú pháp quen thuộc nhất để tạo một từ điển là sử dụng cặp ngoặc nhọn <code>{...}</code> chứa các cặp <code>khóa: giá_trị</code> phân tách nhau bằng dấu phẩy.</p>
        <p>Để truy xuất một giá trị, ta đặt khóa vào bên trong cặp ngoặc vuông <code>D[khóa]</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo từ điển và truy xuất theo khóa',
          code: `>>> D = {'food': 'Spam', 'quantity': 4, 'color': 'pink'}
>>> D['food']              # Lấy giá trị ứng với khóa 'food'
'Spam'
>>> D['quantity'] += 1     # Tăng giá trị của khóa 'quantity' thêm 1
>>> D
{'food': 'Spam', 'quantity': 5, 'color': 'pink'}`,
          output: `'Spam'
{'food': 'Spam', 'quantity': 5, 'color': 'pink'}`,
          annotations: [
            { line: 2, text: 'D[\'food\'] tìm kiếm theo khóa và trả về giá trị \'Spam\'.' },
            { line: 4, text: 'Toán tử += 1 cập nhật trực tiếp giá trị số 4 thành 5 tại chỗ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Gán để Tạo Khóa Mới (Dynamic Key Assignment)',
      content: `
        <p>Đây là điểm tương phản sâu sắc nhất giữa Danh sách và Từ điển:</p>
        <ul>
          <li>Với danh sách, việc gán vào chỉ mục không tồn tại <code>L[99] = 1</code> sẽ phát sinh lỗi <code>IndexError</code>.</li>
          <li>Với từ điển, việc gán vào một khóa chưa từng tồn tại <code>D['new_key'] = value</code> là <strong>hoàn toàn hợp lệ</strong>! Python sẽ tự động tạo một cặp khóa-giá trị mới và thêm vào từ điển.</li>
        </ul>
        <p>Nhờ đặc tính này, ta có thể bắt đầu với một từ điển rỗng và bồi đắp dữ liệu từng bước một cách linh hoạt:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo từ điển rỗng và thêm khóa bằng phép gán',
          code: `>>> D = {}
>>> D['name'] = 'Bob'
>>> D['job'] = 'dev'
>>> D['age'] = 40
>>> D
{'name': 'Bob', 'job': 'dev', 'age': 40}
>>> print(D['name'])
Bob`,
          output: `{'name': 'Bob', 'job': 'dev', 'age': 40}
Bob`,
          annotations: [
            { line: 1, text: 'Khởi tạo từ điển rỗng D = {}.' },
            { line: 2, text: 'Gán D[\'name\'] tạo ra khóa \'name\' với giá trị \'Bob\'.' },
            { line: 5, text: 'Từ điển chứa đủ 3 cặp khóa-giá trị được bổ sung liên tiếp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Các cách khác để Tạo Từ điển: Hàm dict()',
      content: `
        <p>Ngoài cú pháp ngoặc nhọn trực tiếp, Python còn cung cấp hàm khởi dựng <code>dict()</code> với nhiều dạng tham số tiện lợi:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo từ điển bằng hàm dict()',
          code: `>>> bob1 = dict(name='Bob', job='dev', age=40)      # Dạng tham số từ khóa
>>> bob1
{'name': 'Bob', 'job': 'dev', 'age': 40}
>>> bob2 = dict([('name', 'Bob'), ('job', 'dev'), ('age', 40)]) # Dạng danh sách tuple
>>> bob2
{'name': 'Bob', 'job': 'dev', 'age': 40}`,
          output: `{'name': 'Bob', 'job': 'dev', 'age': 40}
{'name': 'Bob', 'job': 'dev', 'age': 40}`,
          annotations: [
            { line: 1, text: 'dict(name=\'Bob\', ...) tự động chuyển các tên đối số thành chuỗi khóa.' },
            { line: 4, text: 'dict() chấp nhận dãy các cặp (key, value), rất hữu ích khi kết hợp với hàm zip().' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Khóa phải là đối tượng Bất biến (Immutable)',
        content: `
          <p>Trong Python, khóa của từ điển bắt buộc phải là đối tượng có thể băm (hashable) và có giá trị bất biến, ví dụ: chuỗi ký tự, số nguyên, số thực, hoặc tuple chứa các phần tử bất biến.</p>
          <p>Bạn <strong>không thể</strong> sử dụng danh sách (list) hoặc từ điển khác làm khóa (ví dụ <code>D[[1, 2]] = 'val'</code> sẽ ném lỗi <code>TypeError: unhashable type: 'list'</code>) vì giá trị của chúng có thể bị thay đổi sau đó, làm phá vỡ bảng băm.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Thứ tự chèn trong Python 3.7+',
        content: `
          <p>Trong các phiên bản Python cũ trước 3.6/3.7, từ điển hoàn toàn không đảm bảo thứ tự của các khóa khi hiển thị. Tuy nhiên, kể từ Python 3.7, hành vi bảo toàn thứ tự chèn (insertion order) đã trở thành một phần chính thức của đặc tả ngôn ngữ Python.</p>
        `
      }
    ],
    deepDive: {
      title: 'Bản chất Bảng băm (Hash Table) của Từ điển',
      content: `
        <p>Bên dưới CPython, từ điển được cài đặt bằng một bảng băm cực kỳ tối ưu (Compact Hash Table do Raymond Hettinger thiết kế). Khi bạn tìm kiếm <code>D['name']</code>, Python tính toán mã băm của chuỗi <code>'name'</code> thông qua thuật toán băm để nhảy thẳng tới ô nhớ chứa con trỏ giá trị trong thời gian <strong>O(1)</strong> trung bình.</p>
        <p>Điều này giải thích vì sao việc tìm kiếm trong từ điển có hàng triệu phần tử diễn ra gần như tức thì, vượt xa tốc độ duyệt tuần tự O(N) của danh sách.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Tạo hồ sơ thiết bị bằng từ điển',
      level: 'Dễ',
      description: 'Hãy tạo một từ điển <code>server</code> biểu diễn thông tin một máy chủ với các khóa: <code>host</code> ("192.168.1.10"), <code>port</code> (8080), <code>status</code> ("online"). Sau đó đổi cổng <code>port</code> thành 443 và thêm khóa <code>ssl</code> mang giá trị <code>True</code>.',
      starterCode: `# 1. Tạo từ điển server ban đầu
# 2. Đổi port thành 443
# 3. Thêm khóa ssl = True
# 4. In từ điển server`,
      solution: `server = {'host': '192.168.1.10', 'port': 8080, 'status': 'online'}
server['port'] = 443
server['ssl'] = True
print(server)`,
      solutionOutput: `{'host': '192.168.1.10', 'port': 443, 'status': 'online', 'ssl': True}`,
      explanation: '<code>server[\'port\'] = 443</code> cập nhật khóa đã có, và <code>server[\'ssl\'] = True</code> tự động tạo thêm khóa mới.'
    },
    {
      title: 'Kết hợp hai danh sách thành từ điển với zip()',
      level: 'Vừa',
      description: 'Cho danh sách các trường <code>fields = ["name", "role", "exp"]</code> và danh sách các giá trị tương ứng <code>values = ["Alice", "Team Lead", 5]</code>. Hãy dùng <code>zip()</code> và <code>dict()</code> để tạo thành từ điển <code>profile</code>.',
      starterCode: `fields = ["name", "role", "exp"]
values = ["Alice", "Team Lead", 5]

# Tạo từ điển profile tại đây
`,
      solution: `fields = ["name", "role", "exp"]
values = ["Alice", "Team Lead", 5]

profile = dict(zip(fields, values))
print(profile)`,
      solutionOutput: `{'name': 'Alice', 'role': 'Team Lead', 'exp': 5}`,
      explanation: '<code>zip(fields, values)</code> ghép từng cặp tương ứng thành các tuple, sau đó <code>dict()</code> chuyển chúng thành từ điển.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây phân biệt ĐÚNG nhất giữa Danh sách và Từ điển?',
      options: [
        'Danh sách truy cập phần tử theo vị trí chỉ mục; Từ điển truy cập đối tượng theo khóa định danh.',
        'Danh sách là bất biến, Từ điển là khả biến.',
        'Danh sách không thể chứa chuỗi ký tự, chỉ Từ điển mới chứa được.',
        'Từ điển bắt buộc kích thước phải cố định ngay khi khai báo.'
      ],
      correctIndex: 0,
      explanation: 'Danh sách là dãy tuần tự có vị trí; Từ điển là ánh xạ theo cặp khóa-giá trị không dựa vào vị trí.'
    },
    {
      question: 'Điều gì xảy ra khi bạn thực thi D = {}; D[\'color\'] = \'red\'?',
      options: [
        'Báo lỗi KeyError vì khóa \'color\' chưa có trong từ điển rỗng.',
        'Báo lỗi IndexError.',
        'Tự động thêm cặp khóa-giá trị \'color\': \'red\' vào từ điển.',
        'D vẫn là từ điển rỗng, giá trị \'red\' bị bỏ qua.'
      ],
      correctIndex: 2,
      explanation: 'Phép gán D[khóa] = giá_trị trên từ điển sẽ tự động tạo khóa mới nếu khóa đó chưa tồn tại.'
    },
    {
      question: 'Kiểu dữ liệu nào sau đây KHÔNG THỂ dùng làm khóa (key) trong từ điển Python?',
      options: [
        'Chuỗi ký tự (\'name\')',
        'Số nguyên (100)',
        'Danh sách ([1, 2, 3])',
        'Bộ giá trị tuple ((1, 2))'
      ],
      correctIndex: 2,
      explanation: 'Khóa của từ điển phải là đối tượng bất biến (hashable). Danh sách (list) là đối tượng khả biến nên không thể làm khóa.'
    }
  ],

  summary: [
    'Từ điển là kiểu dữ liệu thuộc nhóm ánh xạ (mapping), lưu trữ thông tin dưới dạng cặp khóa-giá trị (key-value).',
    'Khác với dãy tuần tự, từ điển không truy cập bằng vị trí số nguyên mà truy cập bằng khóa định danh.',
    'Phép gán D[khóa] = giá_trị có khả năng tự động tạo thêm khóa mới nếu khóa chưa có trong từ điển.',
    'Có thể khởi tạo bằng cú pháp ngoặc nhọn {k: v} hoặc hàm dựng dict().',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 21–22.'
  ]
};
