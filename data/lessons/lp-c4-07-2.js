export default {
  id: 'lp-c4-07-2',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.7.2',
  title: 'Từ điển: Cấu trúc lồng nhau & Dọn rác tự động',
  subtitle: 'Mô hình hóa bản ghi phức tạp, truy xuất đa tầng, cơ chế thu hồi bộ nhớ khi rec = 0 và định dạng JSON/pickle',
  level: 'Trung bình',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Mô hình hóa các thực thể dữ liệu thực tế phức tạp (bản ghi, hồ sơ) bằng từ điển lồng danh sách và từ điển.',
    'Truy xuất và thao tác sửa đổi trên các cấp độ dữ liệu lồng nhau đa tầng.',
    'Hiểu sâu cơ chế quản lý bộ nhớ và thu hồi rác tự động (Garbage Collection) của CPython.',
    'Làm quen với khái niệm lưu trữ bền vững (object persistence) qua module json và pickle.'
  ],

  intuition: {
    title: 'Hồ sơ nhân sự và Máy hủy tài liệu tự động',
    metaphor: 'Hãy hình dung bản ghi nhân viên rec như một tập hồ sơ: bên trong có phong bì "name" chứa 2 thẻ tên riêng ("first", "last"), một tập phiếu "jobs" chứa danh sách các công việc đã làm ("dev", "mgr"), và một mẩu ghi chú tuổi. Bạn có thể mở phong bì để đổi họ, hoặc bấm thêm một phiếu công việc mới vào tập phiếu. Và điều tuyệt vời nhất: khi công ty đóng cửa hồ sơ đó (gán rec = 0), một chiếc máy dọn dẹp vô hình sẽ tự động thu gom toàn bộ giấy tờ, phong bì và thẻ tên không còn dùng đến để tái chế bộ nhớ ngay lập tức.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH HỒ SƠ LỒNG NHAU (rec)</div>
        <div style="display:flex;flex-direction:column;gap:8px;max-width:440px;margin:0 auto;width:100%;">
          <div style="padding:10px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:4px;">
            <span style="color:var(--accent-primary);font-weight:700;">'name':</span> {'first': 'Bob', 'last': 'Smith'}
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">➔ rec['name']['last'] = 'Smith'</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:4px;">
            <span style="color:var(--success);font-weight:700;">'jobs':</span> ['dev', 'mgr']
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">➔ rec['jobs'].append('janitor')</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border-left:4px solid var(--warning);border-radius:4px;">
            <span style="color:var(--warning);font-weight:700;">'age':</span> 40.5
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">Khi gán rec = 0 ➔ Không còn con trỏ tham chiếu ➔ Tự động giải phóng vùng nhớ.</div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Mô hình hóa Bản ghi Phức tạp với Cấu trúc Lồng nhau',
      content: `
        <p>Trong thực tế, thông tin không bao giờ tồn tại dưới dạng các giá trị đơn lẻ. Một bản ghi nhân viên, thông tin khách hàng hay phản hồi API từ máy chủ web luôn là sự kết hợp của nhiều thuộc tính có cấu trúc khác nhau.</p>
        <p>Python cho phép bạn xây dựng các cấu trúc dữ liệu lồng nhau phức tạp một cách tự nhiên và trực quan:</p>
      `,
      codeExamples: [
        {
          title: 'Bản ghi nhân sự lồng nhau đa tầng',
          code: `>>> rec = {'name': {'first': 'Bob', 'last': 'Smith'},
...        'jobs': ['dev', 'mgr'],
...        'age': 40.5}
>>> rec['name']
{'first': 'Bob', 'last': 'Smith'}
>>> rec['name']['last']
'Smith'
>>> rec['jobs']
['dev', 'mgr']
>>> rec['jobs'][-1]
'mgr'`,
          output: `{'first': 'Bob', 'last': 'Smith'}
'Smith'
['dev', 'mgr']
'mgr'`,
          annotations: [
            { line: 4, text: 'rec[\'name\'] trả về một từ điển con chứa first và last name.' },
            { line: 6, text: 'rec[\'name\'][\'last\'] trích xuất trực tiếp giá trị của từ điển con.' },
            { line: 8, text: 'rec[\'jobs\'] trả về danh sách các chức danh.' },
            { line: 10, text: 'rec[\'jobs\'][-1] dùng chỉ mục âm để lấy công việc mới nhất ở cuối danh sách.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Thao tác Sửa đổi trên Cấu trúc Con',
      content: `
        <p>Vì các cấu trúc con (như danh sách trong <code>rec['jobs']</code>) là các đối tượng khả biến độc lập, bạn có thể gọi toàn bộ phương thức của kiểu dữ liệu đó trực tiếp trên cấu trúc lồng nhau:</p>
      `,
      codeExamples: [
        {
          title: 'Thêm công việc vào danh sách con trong từ điển',
          code: `>>> rec['jobs'].append('janitor')
>>> rec
{'name': {'first': 'Bob', 'last': 'Smith'}, 'jobs': ['dev', 'mgr', 'janitor'], 'age': 40.5}`,
          output: `{'name': {'first': 'Bob', 'last': 'Smith'}, 'jobs': ['dev', 'mgr', 'janitor'], 'age': 40.5}`,
          annotations: [
            { line: 1, text: 'rec[\'jobs\'] trích xuất danh sách, sau đó append(\'janitor\') thêm trực tiếp vào danh sách đó.' },
            { line: 3, text: 'Từ điển rec đã được cập nhật toàn diện.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cơ chế Quản lý Bộ nhớ và Dọn rác Tự động (Garbage Collection)',
      content: `
        <p>Khi bạn không còn cần sử dụng đối tượng bản ghi này nữa, bạn chỉ cần gán biến sang một giá trị khác, ví dụ:</p>
        <pre><code>rec = 0</code></pre>
        <p>Điều gì xảy ra với đối tượng từ điển phức tạp, hai danh sách và chuỗi mà nó chứa?</p>
        <p>Trong Python, bạn không bao giờ phải viết lệnh <code>free()</code> như trong C. Python sử dụng cơ chế <strong>đếm số tham chiếu (Reference Counting)</strong> kết hợp <strong>bộ gom rác chu trình (Cyclic Garbage Collector)</strong>:</p>
        <ul>
          <li>Mỗi đối tượng trong bộ nhớ có một biến đếm số lượng tên đang trỏ tới nó.</li>
          <li>Khi bạn gán <code>rec = 0</code>, số đếm tham chiếu của đối tượng từ điển giảm về 0.</li>
          <li>Python lập tức giải phóng vùng nhớ của đối tượng từ điển, đồng thời giảm số tham chiếu của các đối tượng con bên trong nó (từ điển tên, danh sách công việc).</li>
          <li>Toàn bộ cây dữ liệu được tự động thu hồi một cách an toàn và sạch sẽ.</li>
        </ul>
      `
    },
    {
      id: 'sec-4',
      title: '4. Lưu trữ Bản ghi Bền vững: JSON và Pickle',
      content: `
        <p>Dữ liệu trong RAM sẽ mất khi chương trình Python kết thúc. Để lưu giữ các cấu trúc bản ghi lồng nhau này ra đĩa hoặc gửi qua mạng Internet, Python cung cấp hai thư viện tiêu chuẩn quan trọng:</p>
        <ul>
          <li><strong>module json:</strong> Chuyển đổi từ điển và danh sách Python thành chuỗi văn bản JSON tiêu chuẩn quốc tế, dễ đọc và tương thích với mọi ngôn ngữ lập trình (JavaScript, Java, C#, v.v.).</li>
          <li><strong>module pickle:</strong> Thư viện chuyên biệt của Python, cho phép "đóng gói" gần như mọi đối tượng Python thành một chuỗi byte nhị phân để lưu trữ hoặc phục hồi nguyên vẹn sau này.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi bản ghi từ điển sang định dạng JSON',
          code: `>>> import json
>>> rec = {'name': {'first': 'Bob', 'last': 'Smith'}, 'jobs': ['dev', 'mgr'], 'age': 40.5}
>>> json_str = json.dumps(rec)
>>> json_str
'{"name": {"first": "Bob", "last": "Smith"}, "jobs": ["dev", "mgr"], "age": 40.5}'
>>> restored = json.loads(json_str)
>>> restored['name']['first']
'Bob'`,
          output: `'{"name": {"first": "Bob", "last": "Smith"}, "jobs": ["dev", "mgr"], "age": 40.5}'
'Bob'`,
          annotations: [
            { line: 3, text: 'json.dumps() chuyển từ điển Python thành chuỗi định dạng JSON.' },
            { line: 6, text: 'json.loads() khôi phục lại cấu trúc từ điển nguyên bản từ chuỗi JSON.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cẩn thận với tham chiếu vòng (Circular References)',
        content: `
          <p>Nếu bạn tạo ra cấu trúc lồng nhau trong đó một danh sách chứa chính nó (ví dụ <code>L = []; L.append(L)</code>), số đếm tham chiếu sẽ không bao giờ về 0. Rất may mắn, Python có một bộ dọn rác phát hiện chu trình (Cyclic GC) chạy định kỳ trong nền để tìm và giải phóng các khối bộ nhớ "mồ côi" này.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Ưu tiên JSON cho giao tiếp liên hệ thống',
        content: `
          <p>Mặc dù <code>pickle</code> rất mạnh mẽ vì lưu được hầu như mọi đối tượng Python, nhưng nó tiềm ẩn nguy cơ bảo mật nếu bạn mở các tệp pickle từ nguồn không đáng tin cậy. Vì vậy, đối với dữ liệu cấu trúc như hồ sơ, cấu hình hoặc API, hãy luôn ưu tiên sử dụng định dạng <strong>JSON</strong>.</p>
        `
      }
    ],
    deepDive: {
      title: 'Mô hình PyObject và ob_refcnt',
      content: `
        <p>Mỗi đối tượng trong CPython đều bắt đầu bằng tiêu đề <code>PyObject</code>, trong đó có trường <code>ob_refcnt</code> lưu số lượng tham chiếu. Mỗi phép gán (<code>b = a</code>) hoặc đưa vào tập hợp sẽ tăng <code>ob_refcnt</code> lên 1. Lệnh <code>del</code> hoặc gán đè biến sẽ giảm <code>ob_refcnt</code> đi 1. Ngay khi <code>ob_refcnt == 0</code>, macro giải phóng bộ nhớ <code>Py_DECREF</code> sẽ lập tức trả vùng nhớ lại cho hệ điều hành.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Xây dựng hồ sơ sản phẩm lồng nhau',
      level: 'Dễ',
description: 'Hãy tạo từ điển <code>product</code> mô tả một chiếc điện thoại gồm các trường: <code>id</code>: 101, <code>specs</code>: {\'ram\': \'8GB\', \'storage\': \'128GB\'}, <code>tags</code>: [\'smartphone\', \'tech\']. Sau đó thêm tag mới \'sale\' vào danh sách tags.',      starterCode: `# Tạo product và thêm tag 'sale'
`,
      solution: `product = {
    'id': 101,
    'specs': {'ram': '8GB', 'storage': '128GB'},
    'tags': ['smartphone', 'tech']
}

product['tags'].append('sale')
print("Số tags:", len(product['tags']))
print("Dung lượng:", product['specs']['storage'])`,
      solutionOutput: `Số tags: 3
Dung lượng: 128GB`,
      explanation: '<code>product[\'tags\'].append(\'sale\')</code> truy cập vào danh sách lồng nhau và thêm phần tử mới.'
    },
    {
      title: 'Tuần tự hóa và lưu tệp JSON giả lập',
      level: 'Vừa',
      description: 'Cho từ điển cấu hình <code>config = {\'theme\': \'dark\', \'volume\': 80, \'plugins\': [\'auth\', \'cache\']}</code>. Hãy dùng module <code>json</code> để tạo chuỗi JSON có thụt lề 2 khoảng trắng (indent=2) và in ra màn hình.',
      starterCode: `import json

config = {'theme': 'dark', 'volume': 80, 'plugins': ['auth', 'cache']}
# Chuyển đổi config thành chuỗi JSON định dạng đẹp
`,
      solution: `import json

config = {'theme': 'dark', 'volume': 80, 'plugins': ['auth', 'cache']}
pretty_json = json.dumps(config, indent=2)
print(pretty_json)`,
      solutionOutput: `{
  "theme": "dark",
  "volume": 80,
  "plugins": [
    "auth",
    "cache"
  ]
}`,
      explanation: 'Tham số <code>indent=2</code> của <code>json.dumps()</code> tự động định dạng chuỗi JSON nhiều dòng đẹp mắt, dễ đọc.'
    }
  ],

  quiz: [
    {
      question: 'Cho rec = {\'name\': {\'first\': \'Bob\', \'last\': \'Smith\'}, \'jobs\': [\'dev\', \'mgr\']}. Biểu thức nào lấy ra chữ \'mgr\'?',
      options: [
        'rec[\'jobs\'][0]',
        'rec[\'jobs\'][-1]',
        'rec[\'jobs\'][\'mgr\']',
        'rec.jobs.mgr'
      ],
      correctIndex: 1,
      explanation: 'rec[\'jobs\'] trả về danh sách [\'dev\', \'mgr\']. Phần tử thứ hai hoặc cuối cùng được truy xuất bằng chỉ mục [1] hoặc [-1].'
    },
    {
      question: 'Điều gì xảy ra trong bộ nhớ CPython khi bạn thực thi lệnh: rec = 0?',
      options: [
        'Bộ nhớ bị rò rỉ (memory leak) vì không có lệnh free().',
        'Python lập tức xóa file mã nguồn trên đĩa cứng.',
        'Số tham chiếu đến đối tượng từ điển cũ giảm về 0, bộ dọn rác tự động giải phóng vùng nhớ.',
        'Hệ điều hành sẽ gửi tín hiệu cảnh báo tràn RAM.'
      ],
      correctIndex: 2,
      explanation: 'Khi số tham chiếu giảm về 0, cơ chế Reference Counting của Python sẽ tự động thu hồi đối tượng và các cấu trúc con bên trong.'
    },
    {
      question: 'Mô-đun nào trong thư viện chuẩn Python được dùng để chuyển đổi cấu trúc dữ liệu sang văn bản tiêu chuẩn để trao đổi giữa các ngôn ngữ?',
      options: [
        'pickle',
        'json',
        'csv',
        'shelve'
      ],
      correctIndex: 1,
      explanation: 'Mô-đun json là chuẩn quốc tế để biểu diễn dữ liệu có cấu trúc dưới dạng văn bản tương thích giữa nhiều ngôn ngữ.'
    }
  ],

  summary: [
    'Từ điển hỗ trợ cấu trúc lồng nhau tùy ý (nesting) để mô hình hóa các bản ghi và hồ sơ phức tạp.',
    'Truy xuất và sửa đổi dữ liệu đa tầng bằng cách xâu chuỗi các chỉ mục và phương thức: rec[\'name\'][\'last\'], rec[\'jobs\'].append(...).',
    'CPython quản lý bộ nhớ hoàn toàn tự động bằng cơ chế Đếm tham chiếu (Reference Counting) và Bộ dọn rác chu trình.',
    'Gán biến sang giá trị khác (rec = 0) sẽ kích hoạt việc tự động thu hồi bộ nhớ không còn sử dụng.',
    'Sử dụng json và pickle để lưu trữ và tuần tự hóa đối tượng bền vững ra đĩa hoặc truyền mạng.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 22–23.'
  ]
};
