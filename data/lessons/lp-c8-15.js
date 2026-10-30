export default {
  id: 'lp-c8-15',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.15',
  title: 'Các phương thức cốt lõi của Dictionary: values(), items(), get(), update() & pop()',
  subtitle: 'Khám phá hộp công cụ phương thức phong phú của Dictionary: lấy giá trị và tuple, truy xuất an toàn với get, hợp nhất với update và xóa lấy giá trị với pop',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo hai phương thức đối tượng view: `values()` (tất cả giá trị) và `items()` (tất cả các tuple khóa-giá trị).',
    'Sử dụng phương thức `get(key, default)` để tránh sập chương trình do lỗi `KeyError` khi làm việc với dữ liệu thời gian chạy.',
    'Sử dụng phương thức `update(D2)` để hợp nhất dữ liệu từ một dictionary khác vào dictionary hiện tại tại chỗ.',
    'Phân biệt phương thức `pop(key)` của Dictionary (nhận khóa) với `pop(i)` của List (nhận vị trí bù).',
    'Nắm vững phương thức `copy()` để tạo bản sao nông phòng ngừa tác dụng phụ từ tham chiếu chia sẻ.'
  ],

  intuition: {
    title: 'Bộ chìa khóa dự phòng và Chiếc phễu sáp nhập hồ sơ',
    metaphor: 'Hãy tưởng tượng bạn đang điều hành một quầy dịch vụ khách hàng với chiếc tủ hồ sơ Dictionary. Khi khách đến hỏi thông tin mã số "VIP-99" mà không rõ có hồ sơ hay không: nếu bạn dùng `D["VIP-99"]`, bạn sẽ nổi cáu và làm sập cả quầy (KeyError); nhưng nếu bạn dùng `D.get("VIP-99", "Khách vãng lai")`, bạn nhẹ nhàng kiểm tra, nếu chưa có thì mỉm cười trao ngay chiếc thẻ tạm "Khách vãng lai" mà quầy vẫn hoạt động trơn tru! Khi công ty bạn sáp nhập với một đối tác mới `D2`, phương thức `D.update(D2)` giống như chiếc phễu sáp nhập: toàn bộ hồ sơ khách hàng mới được đổ thẳng vào tủ của bạn, khách hàng nào trùng mã thì hồ sơ mới nhất từ đối tác sẽ ghi đè lên hồ sơ cũ. Còn khi khách muốn chuyển vùng, `D.pop("VIP-99")` sẽ rút hồ sơ ra khỏi tủ và trao tận tay cho khách!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BỘ NĂM PHƯƠNG THỨC CHỦ LỰC CỦA DICTIONARY</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. D.values() &amp; D.items()</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Trả về view các giá trị hoặc các bộ tuple <code>(khóa, giá trị)</code>.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #10b981;border-radius:6px;">
            <div style="font-weight:700;color:#10b981;">2. D.get(k, default)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Tra cứu an toàn: trả về default nếu khóa vắng mặt, không bao giờ KeyError.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #f59e0b;border-radius:6px;">
            <div style="font-weight:700;color:#f59e0b;">3. D.update(D2)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Hợp nhất tại chỗ: thêm khóa mới, ghi đè khóa trùng từ D2 sang D.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #ef4444;border-radius:6px;">
            <div style="font-weight:700;color:#ef4444;">4. D.pop(k, default)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Xóa khóa chỉ định khỏi dict và trả về giá trị liên kết của nó.</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phương thức values() và items(): Trích xuất Nội dung Toàn diện',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 21 / 42 – Trang 22 / 42</strong>.</p>
          </div>
        </div>

        <p>Cùng với <code>keys()</code> đã học ở bài trước, hai phương thức <strong><code>values()</code></strong> và <strong><code>items()</code></strong> cung cấp cái nhìn toàn diện vào nội dung của một dictionary:</p>

        <ul>
          <li><strong><code>D.values()</code>:</strong> Trả về một đối tượng view chứa tất cả các giá trị (values) được lưu trữ trong dictionary.</li>
          <li><strong><code>D.items()</code>:</strong> Trả về một đối tượng view chứa tất cả các bộ tuple dạng <code>(key, value)</code>. Đây là công cụ cực kỳ đắc lực trong các vòng lặp cần duyệt đồng thời cả khóa và giá trị (ví dụ: <code>for k, v in D.items():</code>).</li>
        </ul>

        <p>Tương tự như <code>keys()</code>, cả hai phương thức này đều trả về các đối tượng có thể lặp (iterable view). Để hiển thị trực quan hoặc đánh chỉ mục, ta bọc chúng qua hàm <code>list()</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Khám phá bộ ba phương thức keys, values và items trong REPL',
          code: `D = {'program': 1, 'script': 2, 'app': 3}

# Tất cả các khóa
print("list(D.keys()):  ", list(D.keys()))

# Tất cả các giá trị
print("list(D.values()):", list(D.values()))

# Tất cả các cặp tuple (khóa, giá trị)
print("list(D.items()): ", list(D.items()))

# Duyệt unpack tuple trong vòng lặp for
print("\nDuyệt đồng thời khóa và giá trị:")
for key, val in D.items():
    print(f"  • Khóa '{key}' liên kết với giá trị: {val}")`,
          output: `list(D.keys()):   ['program', 'script', 'app']
list(D.values()): [1, 2, 3]
list(D.items()):  [('program', 1), ('script', 2), ('app', 3)]

Duyệt đồng thời khóa và giá trị:
  • Khóa 'program' liên kết với giá trị: 1
  • Khóa 'script' liên kết với giá trị: 2
  • Khóa 'app' liên kết với giá trị: 3`,
          annotations: [
            { line: 4, text: 'list(D.keys()) lấy danh sách tất cả các khóa.' },
            { line: 7, text: 'list(D.values()) lấy danh sách tất cả các giá trị [1, 2, 3].' },
            { line: 10, text: 'list(D.items()) chuyển đổi các mục thành danh sách các cặp tuple (k, v).' },
            { line: 14, text: 'Cú pháp for key, val in D.items() unpack trực tiếp từng cặp tuple trong vòng lặp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phương thức get(key, default): Phòng ngừa Lỗi Thiếu Khóa',
      content: `
        <p>Trong các chương trình thực tế thu thập dữ liệu khi đang chạy (từ người dùng, tệp tin, API web), bạn thường sẽ không thể dự đoán trước những gì sẽ có trong một dictionary trước khi chương trình được khởi chạy, chứ chưa nói đến lúc viết mã.</p>

        <p>Việc truy xuất một khóa không tồn tại bằng <code>D[key]</code> thông thường là một lỗi làm dừng chương trình (<code>KeyError</code>). Phương thức <strong><code>get(key, default=None)</code></strong> cung cấp giải pháp an toàn tuyệt đối:</p>

        <ul>
          <li>Nếu khóa tồn tại: <code>get()</code> trả về giá trị liên kết của khóa đó (giống như <code>D[key]</code>).</li>
          <li>Nếu khóa không tồn tại: <code>get()</code> trả về giá trị mặc định (mặc định là <code>None</code>, hoặc bất kỳ giá trị nào bạn truyền vào làm đối số thứ hai).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng phương thức get() xử lý an toàn khóa vắng mặt',
          code: `D = {'program': 1, 'script': 2, 'app': 3}

# 1. Khóa có tồn tại: lấy và trả về giá trị
print("D.get('script'):   ", D.get('script'))

# 2. Khóa bị thiếu: trả về None mặc định
print("D.get('code'):     ", D.get('code'))

# 3. Khóa bị thiếu: chỉ định giá trị mặc định thay thế là 4
print("D.get('code', 4):  ", D.get('code', 4))

# Cố tình dùng cú pháp ngoặc vuông D['code'] sẽ phát sinh ngoại lệ KeyError
try:
    bad = D['code']
except KeyError as err:
    print("D['code'] gây lỗi: KeyError:", err)`,
          output: `D.get('script'):    2
D.get('code'):      None
D.get('code', 4):   4
D['code'] gây lỗi: KeyError: 'code'`,
          annotations: [
            { line: 4, text: '\'script\' có trong D nên trả về 2.' },
            { line: 7, text: '\'code\' không có trong D, get() trả về None mà không báo lỗi.' },
            { line: 10, text: 'Chỉ định đối số thứ hai là 4: khi thiếu khóa, get() trả về số 4.' },
            { line: 16, text: 'Cú pháp D[\'code\'] truyền thống quẳng ra KeyError khi không có khóa.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phương thức update() và Phương thức pop()',
      content: `
        <p><strong>Phương thức update(): Phép ghép nối cho Dictionary</strong><br>
        Phương thức <code>D.update(D2)</code> cung cấp một thao tác tương tự như phép ghép nối cho dictionary (mặc dù nó hoạt động trong phạm vi cả khóa lẫn giá trị). Nó hợp nhất các khóa và giá trị của một dictionary vào một dictionary khác tại chỗ: vừa thêm các mục mới cho các khóa mới, vừa <strong>ghi đè thẳng tay các giá trị của cùng một khóa nếu có sự xung đột</strong> (khóa của vế sau sẽ chiến thắng):</p>

        <p><strong>Phương thức pop(): Xóa theo khóa và trả về giá trị</strong><br>
        Phương thức <code>D.pop(key, [default])</code> xóa một khóa khỏi dictionary và trả về giá trị mà nó từng có. Nó tương tự như phương thức <code>pop()</code> của list, nhưng <strong>nhận một khóa thay vì một vị trí bù số học</strong>.</p>

        <p><strong>Phương thức copy(): Bản sao nông phòng ngừa tác dụng phụ</strong><br>
        Phương thức <code>D.copy()</code> tạo ra một bản sao cấp ngoài cùng của dictionary để tránh các tác dụng phụ tiềm ẩn từ các tham chiếu chia sẻ (shared references), điều mà chúng ta sẽ đào sâu hơn trong Chương 9.</p>
      `,
      codeExamples: [
        {
          title: 'Hợp nhất với update() và thu hẹp với pop() theo ví dụ sách Mark Lutz',
          code: `D = {'program': 1, 'script': 2, 'app': 3}
D2 = {'code': 4, 'hack': 5, 'app': 6} # Khóa 'app' bị trùng lặp, D2 có giá trị 6

# Hợp nhất D2 vào D tại chỗ: 'app': 6 sẽ chiến thắng giá trị 3 cũ
D.update(D2)
print("Sau D.update(D2):", D)

# Pop một khóa của dictionary: xóa và trả về giá trị
val_app = D.pop('app')
print("D.pop('app') trả về: ", val_app)
print("Sau khi pop 'app':   ", D)

# Pop khóa tiếp theo
val_hack = D.pop('hack')
print("D.pop('hack') trả về:", val_hack)
print("Dictionary còn lại:   ", D)`,
          output: `Sau D.update(D2): {'program': 1, 'script': 2, 'app': 6, 'code': 4, 'hack': 5}
D.pop('app') trả về:  6
Sau khi pop 'app':    {'program': 1, 'script': 2, 'code': 4, 'hack': 5}
D.pop('hack') trả về: 5
Dictionary còn lại:    {'program': 1, 'script': 2, 'code': 4}`,
          annotations: [
            { line: 5, text: 'update() ghi đè giá trị của \'app\' từ 3 thành 6 và thêm hai khóa mới \'code\', \'hack\'.' },
            { line: 9, text: 'D.pop(\'app\') xóa khóa \'app\' và trả về giá trị 6.' },
            { line: 15, text: 'D.pop(\'hack\') xóa tiếp khóa \'hack\' và trả về giá trị 5.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tra cứu danh sách phương thức phong phú của dict',
        content: 'Dictionary còn có các phương thức khác như <code>D.clear()</code> (xóa sạch toàn bộ mục), <code>D.setdefault(key, default)</code> (lấy giá trị nếu có, nếu chưa thì thêm mới với default), và <code>D.popitem()</code> (xóa và trả về cặp cuối cùng theo thứ tự LIFO). Bạn hãy chạy <code>help(dict)</code> hoặc <code>dir(dict)</code> để khám phá thêm.'
      }
    ],
    pitfalls: [
      {
        title: 'update() thực hiện tại chỗ và trả về None',
        content: 'Giống như <code>sort()</code> của list, phương thức <code>D.update(D2)</code> trực tiếp sửa đổi <code>D</code> tại chỗ và trả về <code>None</code>. Đừng bao giờ viết <code>D = D.update(D2)</code> nếu không muốn biến <code>D</code> thành <code>None</code>!'
      }
    ]
  },

  exercises: [
    {
      title: 'Đếm tần suất xuất hiện của các từ bằng phương thức get()',
      level: 'Vừa',
      problem: 'Cho danh sách các từ text = ["python", "code", "python", "dev", "code", "python"]. Hãy dùng một dictionary counts = {} và vòng lặp for duyệt qua danh sách, tận dụng phương thức get(word, 0) để đếm số lần xuất hiện của mỗi từ và in ra kết quả.',
      hint: 'Trong mỗi vòng lặp: counts[word] = counts.get(word, 0) + 1.',
      solutionCode: `text = ["python", "code", "python", "dev", "code", "python"]
counts = {}

# Đếm tần suất dùng get(word, 0)
for word in text:
    counts[word] = counts.get(word, 0) + 1

print("Tần suất xuất hiện của từng từ:")
for w, c in counts.items():
    print(f"  • '{w}': {c} lần")`,
      solutionOutput: `Tần suất xuất hiện của từng từ:
  • 'python': 3 lần
  • 'code': 2 lần
  • 'dev': 1 lần`,
      explanation: 'Mô thức kinh điển: counts.get(word, 0) trả về số lần đếm hiện tại nếu đã có, hoặc trả về 0 nếu từ lần đầu xuất hiện, sau đó cộng thêm 1.'
    }
  ],

  quiz: [
    {
      question: 'Khi gọi D.get("missing_key", 99) trên một dictionary D không có khóa "missing_key", kết quả trả về là gì?',
      options: [
        'Python quẳng ra ngoại lệ KeyError.',
        'Hàm trả về 99.',
        'Hàm trả về None.',
        'Dictionary D tự động thêm mục "missing_key": 99 vào bảng.'
      ],
      correctIndex: 1,
      explanation: 'Phương thức get(key, default) trả về giá trị mặc định được truyền vào (99) khi khóa vắng mặt, và KHÔNG làm thay đổi nội dung của dictionary.'
    },
    {
      question: 'Điều gì xảy ra khi bạn gọi D.update(D2) và cả hai dictionary đều có cùng khóa "title"?',
      options: [
        'Python báo lỗi KeyError vì xung đột khóa.',
        'Giá trị của khóa "title" trong D được giữ nguyên, giá trị trong D2 bị bỏ qua.',
        'Giá trị của khóa "title" từ D2 sẽ ghi đè lên giá trị trong D.',
        'Giá trị của hai khóa được cộng dồn lại với nhau.'
      ],
      correctIndex: 2,
      explanation: 'update() hợp nhất theo nguyên tắc: các khóa trùng lặp từ dictionary đối số (D2) sẽ ghi đè trực tiếp lên giá trị cũ trong dictionary gọi phương thức (D).'
    }
  ],

  summary: [
    'values() trả về đối tượng view chứa tất cả các giá trị; items() trả về view các bộ tuple (khóa, giá trị).',
    'get(key, default=None) tra cứu an toàn, trả về giá trị mặc định nếu khóa không tồn tại, tránh lỗi KeyError.',
    'update(D2) hợp nhất các khóa và giá trị từ D2 vào D tại chỗ; vế đối số sẽ ghi đè giá trị nếu xảy ra xung đột khóa.',
    'pop(key, [default]) xóa khóa chỉ định và trả về giá trị liên kết của nó; báo KeyError nếu thiếu khóa và không có default.',
    'copy() tạo bản sao nông cấp ngoài cùng (shallow copy), giúp cách ly dữ liệu khỏi tác dụng phụ của tham chiếu chia sẻ.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.16), chúng ta sẽ khám phá Các kỹ thuật tạo Dictionary thay thế: 4 cách kinh điển, dict(zip()), dict.fromkeys() và cú pháp Unpacking **.'
};