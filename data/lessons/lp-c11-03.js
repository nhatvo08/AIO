export default {
  id: 'lp-c11-03',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.3',
  title: 'Phép gán Đa mục tiêu — Cơ chế Hoạt động & Cạm bẫy Tham chiếu Chia sẻ',
  subtitle: 'Cú pháp a = b = c = val, cơ chế trỏ chung địa chỉ bộ nhớ, sự an toàn của kiểu bất biến và cạm bẫy biến đổi dây chuyền với đối tượng khả biến',
  level: 'Cơ bản đến Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu rõ cú pháp và hành vi của phép gán đa mục tiêu (multiple-target assignment): gán cùng một tham chiếu đối tượng cho tất cả các biến ở vế trái.',
    'Nhận biết vì sao phép gán đa mục tiêu hoàn toàn an toàn khi khởi tạo các kiểu dữ liệu bất biến (immutable) như số nguyên và chuỗi ký tự.',
    'Phân tích sâu sắc cạm bẫy tham chiếu chia sẻ (shared references) khi khởi tạo các đối tượng khả biến (mutable) như danh sách rỗng hoặc từ điển rỗng.',
    'Áp dụng thành thạo hai phương án khắc phục chuẩn mực: khởi tạo trên các dòng độc lập hoặc sử dụng phép gán tuple đối tượng riêng biệt.'
  ],

  intuition: {
    title: 'Nhiều Tấm Thẻ Tên Cùng Cột Vào Một Chiếc Hộp',
    metaphor: 'Hãy tưởng tượng bạn có 3 tấm thẻ tên ghi a, b, c và cột chung cả 3 sợi dây vào cùng một chiếc hộp quà duy nhất trong phòng khách. Nếu món quà bên trong là một tảng đá đúc nguyên khối bất biến (con số 0), bạn không thể thay đổi tảng đá đó; nếu người giữ thẻ b muốn số 1, anh ta buộc phải cắt dây và cột thẻ b sang một tảng đá số 1 mới ở chỗ khác, nên a và c vẫn giữ nguyên tảng đá 0. Nhưng nếu chiếc hộp đó là một chiếc túi xách mở nắp (danh sách list rỗng), bất kỳ ai cầm thẻ b thò tay nhét một quả bóng vào túi, thì khi người cầm thẻ a nhìn vào chiếc túi của mình, anh ta cũng sẽ bàng hoàng thấy quả bóng đó xuất hiện! Đó chính là bản chất của hiện tượng tham chiếu chia sẻ.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH THAM CHIẾU CHIA SẺ TRONG PHÉP GÁN ĐA MỤC TIÊU</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:center;">
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="padding:8px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;text-align:center;">Biến <code>a</code></div>
            <div style="padding:8px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;text-align:center;">Biến <code>b</code></div>
            <div style="padding:8px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;text-align:center;">Biến <code>c</code></div>
          </div>
          <div style="font-size:1.6rem;color:var(--danger);font-weight:700;">➔ ➔ ➔</div>
          <div style="padding:16px;background:rgba(239,68,68,0.1);border:2px solid var(--danger);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--danger);">MỘT ĐỐI TƯỢNG DUY NHẤT</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:6px;">Địa chỉ bộ nhớ: <code>id: 0x7fa...</code><br>Dữ liệu: <code>[42]</code></div>
          </div>
        </div>
        <div style="padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--danger);border-radius:4px;font-size:0.8rem;color:var(--text-secondary);">
          <strong>Hậu quả:</strong> Gọi <code>b.append(42)</code> biến đổi tại chỗ đối tượng dùng chung, khiến <code>a</code> và <code>c</code> cũng đồng thời bị biến đổi theo!
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cú Pháp Phép Gán Đa Mục Tiêu & Bản Chất Hoạt Động',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 14 / 38</strong>.</p>
          </div>
        </div>

        <p>Đơn giản hơn phép gán dãy tuần tự khi thoạt nhìn, <strong>phép gán đa mục tiêu (multiple-target assignment)</strong> chỉ đơn thuần gán tất cả các mục tiêu được đưa ra cho cùng một đối tượng nằm ở ngoài cùng bên phải. Ví dụ sau đây gán ba tên biến <code>a</code>, <code>b</code>, và <code>c</code> cho cùng chuỗi <code>'code'</code>:</p>

        <pre><code>>>> a = b = c = 'code'
>>> a, b, c
('code', 'code', 'code')</code></pre>

        <p>Dạng này tương đương với—nhưng dễ viết mã hơn và tốn ít dòng hơn—ba câu lệnh gán tuần tự từ phải sang trái:</p>
        <pre><code>c = 'code'
b = c
a = b</code></pre>
        <p>Bởi vì <code>c</code> được định giá trị thành đối tượng chuỗi ban đầu, <code>b</code> và <code>a</code> lần lượt nhận cùng tham chiếu đến chính đối tượng chuỗi đó chứ không phải một bản sao riêng biệt.</p>
      `,
      codeExamples: [
        {
          title: 'Khảo sát phép gán đa mục tiêu và kiểm tra địa chỉ bộ nhớ id()',
          code: `# Gán ba biến cho cùng một chuỗi
a = b = c = 'Python'

print("Giá trị:", a, b, c)
print("Cùng trỏ một đối tượng:", a is b and b is c)
print(f"Địa chỉ bộ nhớ a: {id(a)}")
print(f"Địa chỉ bộ nhớ b: {id(b)}")
print(f"Địa chỉ bộ nhớ c: {id(c)}")`,
          output: `Giá trị: Python Python Python
Cùng trỏ một đối tượng: True
Địa chỉ bộ nhớ a: 140723456789
Địa chỉ bộ nhớ b: 140723456789
Địa chỉ bộ nhớ c: 140723456789`,
          annotations: [
            { line: 2, text: 'Phép gán đa mục tiêu liên kết 3 tên biến vào cùng một đối tượng chuỗi duy nhất.' },
            { line: 5, text: 'Toán tử is xác nhận cả 3 biến cùng chia sẻ một địa chỉ id bộ nhớ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Cạm Bẫy Tham Chiếu Chia Sẻ: Kiểu Khả Biến (Mutable) vs Bất Biến (Immutable)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 14–15 / 38</strong>.</p>
          </div>
        </div>

        <p>Mặc dù điều này có vẻ đơn giản, hãy luôn nhớ rằng <strong>chỉ có một đối tượng duy nhất ở đây, được chia sẻ bởi cả ba biến</strong>. Hành vi này dẫn đến hai kết cục hoàn toàn trái ngược tùy thuộc vào tính khả biến của đối tượng:</p>

        <h3>1. Hoàn toàn vô hại đối với các kiểu bất biến (Immutable)</h3>
        <p>Khi bạn khởi tạo một tập hợp các biến đếm về 0:</p>
        <pre><code>>>> a = b = 0
>>> b = b + 1
>>> a, b
(0, 1)</code></pre>
        <p>Ở đây, việc thay đổi <code>b</code> chỉ làm thay đổi riêng <code>b</code>. Bởi vì số nguyên là bất biến và không hỗ trợ thay đổi tại chỗ, phép toán <code>b + 1</code> tạo ra một đối tượng số <code>1</code> hoàn toàn mới và gán lại cho <code>b</code>. Biến <code>a</code> vẫn tiếp tục trỏ tới số <code>0</code> ban đầu. Miễn là đối tượng được gán là bất biến, việc có nhiều tên biến cùng tham chiếu tới nó là điều an toàn tuyệt đối.</p>

        <h3>2. Cạm bẫy chết người đối với các kiểu khả biến (Mutable)</h3>
        <p>Tuy nhiên, chúng ta phải đặc biệt cẩn trọng khi khởi tạo các biến thành một đối tượng khả biến như một danh sách hoặc từ điển rỗng:</p>
        <pre><code>>>> a = b = []
>>> b.append(42)
>>> a, b
([42], [42])</code></pre>
        <p>Lần này, vì <code>a</code> và <code>b</code> cùng trỏ tới một vùng nhớ danh sách duy nhất, việc thêm phần tử vào danh sách đó tại chỗ thông qua phương thức <code>append</code> của <code>b</code> cũng sẽ <strong>làm thay đổi dữ liệu mà chúng ta nhìn thấy qua <code>a</code></strong>! Đây là hiện tượng <em>tham chiếu chia sẻ (shared reference)</em> đã được cảnh báo trong Chương 6.</p>

        <h3>Hai giải pháp phòng ngừa chuẩn mực</h3>
        <p>Để tránh cạm bẫy này, bạn phải đảm bảo mỗi biến được khởi tạo từ một biểu thức hằng trị (literal) riêng biệt:</p>
        <ol>
          <li>
            <strong>Khởi tạo trên các câu lệnh riêng biệt:</strong>
            <pre><code>a = []
b = [] # a và b trỏ tới hai danh sách độc lập trong bộ nhớ</code></pre>
          </li>
          <li>
            <strong>Dùng phép gán Tuple ngắn gọn:</strong>
            <pre><code>a, b = [], [] # Hai biểu thức [] tạo ra hai đối tượng danh sách riêng biệt</code></pre>
          </li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Đối chứng trực tiếp: Cạm bẫy tham chiếu chia sẻ và Giải pháp khắc phục',
          code: `# CẠM BẪY: Khởi tạo dùng chung đối tượng khả biến
a = b = []
b.append(42)
print("Cạm bẫy a = b = []:")
print("  a =", a) # Bị đổi thành [42] ngoài ý muốn!
print("  b =", b)
print("  a is b:", a is b)

# GIẢI PHÁP 1: Khởi tạo trên 2 dòng riêng
x = []
y = []
y.append(99)
print("\\nGiải pháp 1 (Hai câu lệnh riêng):")
print("  x =", x) # Giữ nguyên []
print("  y =", y)
print("  x is y:", x is y)

# GIẢI PHÁP 2: Phép gán Tuple hai literals riêng
m, n = [], []
n.append(100)
print("\\nGiải pháp 2 (m, n = [], []):")
print("  m =", m) # Giữ nguyên []
print("  n =", n)
print("  m is n:", m is n)`,
          output: `Cạm bẫy a = b = []:
  a = [42]
  b = [42]
  a is b: True

Giải pháp 1 (Hai câu lệnh riêng):
  x = []
  y = [99]
  x is y: False

Giải pháp 2 (m, n = [], []):
  m = []
  n = [100]
  m is n: False`,
          annotations: [
            { line: 3, text: 'b.append(42) biến đổi danh sách tại chỗ, khiến a cũng bị ảnh hưởng.' },
            { line: 12, text: 'Mỗi lần trình thông dịch đọc cú pháp [] là một lần tạo vùng nhớ danh sách mới.' },
            { line: 20, text: 'm, n = [], [] thực thi hai biểu thức [] độc lập, tạo ra 2 đối tượng riêng biệt.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    warnings: [
      {
        title: 'Quy tắc vàng của Mark Lutz về khởi tạo biến',
        content: 'Chỉ sử dụng phép gán đa mục tiêu a = b = c = val khi val là một giá trị bất biến (như số 0, None, hoặc chuỗi rỗng ""). Tuyệt đối không bao giờ dùng a = b = [] hoặc a = b = {} nếu bạn muốn hai biến hoạt động độc lập!'
      }
    ]
  },

  exercises: [
    {
      title: 'Khắc phục lỗi chia sẻ tham chiếu trong bảng cấu hình người dùng',
      level: 'Cơ bản',
      problem: 'Một lập trình viên viết: config_default = config_user = {"theme": "light", "notifications": True}. Sau đó người dùng thay đổi: config_user["theme"] = "dark". Hãy giải thích điều gì xảy ra với config_default và viết lại câu lệnh để hai cấu hình hoàn toàn độc lập.',
      hint: 'Từ điển là kiểu dữ liệu khả biến. Hãy dùng copy() hoặc khởi tạo hai dict riêng biệt.',
      solutionCode: `# Sửa lại bằng cách khởi tạo độc lập hoặc dùng dict literal riêng
config_default, config_user = {"theme": "light", "notifications": True}, {"theme": "light", "notifications": True}

config_user["theme"] = "dark"

print("config_default:", config_default)
print("config_user:", config_user)`,
      solutionOutput: `config_default: {'theme': 'light', 'notifications': True}
config_user: {'theme': 'dark', 'notifications': True}`,
      explanation: 'Khi khởi tạo bằng hai literal riêng biệt, config_default và config_user là hai đối tượng từ điển khác nhau, việc sửa đổi config_user không làm ảnh hưởng cấu hình mặc định.'
    }
  ],

  quiz: [
    {
      question: 'Trong câu lệnh x = y = 0; y = y + 5, giá trị của x và y lần lượt là gì?',
      options: [
        'x = 5, y = 5',
        'x = 0, y = 5',
        'x = 0, y = 0',
        'Phát sinh ngoại lệ TypeError'
      ],
      correctIndex: 1,
      explanation: 'Số nguyên là kiểu bất biến. Biểu thức y + 5 tạo ra số 5 mới và gán lại cho y; x vẫn tiếp tục trỏ tới số 0 ban đầu.'
    },
    {
      question: 'Khi bạn chạy hai dòng mã: a = b = []; b.append(10), kết quả in ra của biến a là gì?',
      options: [
        '[] (danh sách rỗng)',
        '[10] (danh sách có một phần tử)',
        'None',
        'Lỗi RuntimeError'
      ],
      correctIndex: 1,
      explanation: 'Vì a và b cùng chia sẻ một đối tượng danh sách duy nhất trong bộ nhớ, thao tác thay đổi tại chỗ b.append(10) sẽ hiển thị trên cả hai biến.'
    },
    {
      question: 'Cách nào sau đây là giải pháp đúng để tạo hai danh sách rỗng độc lập trên một dòng lệnh?',
      options: [
        'a = b = []',
        'a, b = [], []',
        '[a, b] = [[]] * 2',
        'a = b = list()'
      ],
      correctIndex: 1,
      explanation: 'Cú pháp a, b = [], [] thực thi hai biểu thức hằng trị [] riêng biệt ở vế phải, tạo ra hai đối tượng danh sách độc lập trong bộ nhớ.'
    }
  ],

  summary: [
    'Phép gán đa mục tiêu a = b = c = val gán cùng một tham chiếu đối tượng cho tất cả các biến.',
    'Hoàn toàn an toàn với các kiểu bất biến (số, chuỗi, tuple) vì các phép tính toán luôn tạo ra đối tượng mới.',
    'Là cạm bẫy nguy hiểm với các kiểu khả biến (list, dict, set) vì thao tác cập nhật tại chỗ qua một biến sẽ làm đổi dữ liệu của các biến còn lại.',
    'Khắc phục triệt để bằng cách tách thành các câu lệnh riêng hoặc sử dụng phép gán tuple a, b = [], [].'
  ]
};
