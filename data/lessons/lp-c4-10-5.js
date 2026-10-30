export default {
  id: 'lp-c4-10-5',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.10.5',
  title: 'Các kiểu do Người dùng định nghĩa: Lớp (Classes) & Lớp Worker',
  subtitle: 'Tạo kiểu dữ liệu tùy biến với câu lệnh class, gắn kết dữ liệu và logic qua thuộc tính và phương thức',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu vai trò của câu lệnh class: tạo ra các kiểu đối tượng hoàn toàn mới vượt ra ngoài các kiểu dựng sẵn.',
    'Nhận biết các khái niệm cơ bản của Lập trình Hướng đối tượng (OOP): Lớp (Class), Thể hiện (Instance), Thuộc tính (Attribute) và Phương thức (Method).',
    'Thực hành gọi phương thức và truy cập thuộc tính trên các thể hiện bob và sue của lớp Worker.',
    'Nắm vững mối liên kết giữa các kiểu dựng sẵn và các lớp tự tạo: các kiểu dựng sẵn là vật liệu xây dựng nền tảng để tạo nên các lớp nghiệp vụ.'
  ],

  intuition: {
    title: 'Khuôn đúc bánh và Những chiếc bánh thực tế',
    metaphor: 'Các kiểu dữ liệu dựng sẵn như số, chuỗi, từ điển giống như bột mỳ, đường và bơ. Khi bạn muốn tạo ra một món ăn riêng biệt của nhà hàng — ví dụ "Bánh sinh nhật Worker" — bạn cần một chiếc khuôn đúc (Lớp / Class). Từ chiếc khuôn Worker đó, bạn có thể đúc ra hàng trăm chiếc bánh cụ thể (Thể hiện / Instance như bob, sue). Mỗi chiếc bánh có tên riêng và mức lương riêng (thuộc tính), đồng thời biết cách tự phản ứng khi được yêu cầu tăng lương (phương thức giveRaise).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH LỚP VÀ THỂ HIỆN (CLASS ➔ INSTANCES)</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
          <div style="padding:10px 20px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--accent-primary);">KHUÔN MẪU: class Worker</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Phương thức: .lastName(), .giveRaise(percent)</div>
          </div>
          <div style="color:var(--text-muted);font-weight:700;">Đúc thành các thể hiện (Instances) ➔</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;max-width:440px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;text-align:center;">
              <div style="font-weight:700;color:var(--success);">bob = Worker(...)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">name: 'Bob Smith'<br>pay: 50000</div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;text-align:center;">
              <div style="font-weight:700;color:var(--warning);">sue = Worker(...)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">name: 'Sue Jones'<br>pay: 66000.0</div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Vượt ra ngoài Kiểu Dựng sẵn: Câu lệnh class',
      content: `
        <p>Các kiểu dữ liệu dựng sẵn mà chúng ta đã tìm hiểu (số, chuỗi, danh sách, từ điển, tuple, tệp, tập hợp) là những "ngựa thồ" vô cùng mạnh mẽ. Tuy nhiên, khi xây dựng các ứng dụng thực tế quy mô lớn, chúng ta thường cần mô hình hóa những thực thể nghiệp vụ phức tạp mang tính đặc thù riêng biệt — ví dụ: một nhân viên, một giao dịch ngân hàng, hay một nút bấm trên màn hình.</p>
        <p>Python cho phép người lập trình định nghĩa các kiểu dữ liệu hoàn toàn mới thông qua câu lệnh <strong><code>class</code></strong> (Lập trình hướng đối tượng - OOP).</p>
      `
    },
    {
      id: 'sec-2',
      title: '2. Lớp Worker trong Sách của Mark Lutz',
      content: `
        <p>Trong Chương 4, Mark Lutz giới thiệu một lớp mẫu mang tên <code>Worker</code>. Tác giả giữ lại phần thân cài đặt chi tiết cho Phần VI (chuyên đề chuyên sâu về OOP), nhưng minh họa cách sử dụng trực quan của đối tượng thể hiện:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo và sử dụng thể hiện của lớp Worker',
          code: `>>> # Định nghĩa lớp Worker (chi tiết đón xem ở Phần VI)
>>> bob = Worker('Bob Smith', 50000)       # Tạo thể hiện thứ nhất: Bob
>>> sue = Worker('Sue Jones', 60000)       # Tạo thể hiện thứ hai: Sue
>>> bob.lastName()                         # Gọi phương thức trích xuất họ
'Smith'
>>> sue.giveRaise(0.10)                    # Tăng 10% lương cho Sue
>>> sue.pay                                # Kiểm tra thuộc tính lương mới
66000.0`,
          output: `'Smith'
66000.0`,
          annotations: [
            { line: 2, text: 'Worker(\'Bob Smith\', 50000) gọi phương thức khởi tạo __init__ để tạo đối tượng bob.' },
            { line: 4, text: 'bob.lastName() thực thi logic tách chuỗi để trả về phần họ \'Smith\'.' },
            { line: 6, text: 'sue.giveRaise(0.10) tính toán lương mới: 60000 + 6000 = 66000.0.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Mã nguồn Tham khảo Hoàn chỉnh của Lớp Worker (Trang web Bổ sung)',
      content: `
        <p>Để bạn có thể chạy thử nghiệm mã nguồn này trực tiếp trong môi trường Python của mình, dưới đây là cài đặt hoàn chỉnh của lớp <code>Worker</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Cài đặt hoàn chỉnh lớp Worker có thể chạy được (do trang web bổ sung)',
          code: `class Worker:
    def __init__(self, name, pay):
        self.name = name
        self.pay = pay
    
    def lastName(self):
        return self.name.split()[-1]
    
    def giveRaise(self, percent):
        self.pay *= (1.0 + percent)

# Chạy thử nghiệm:
bob = Worker('Bob Smith', 50000)
sue = Worker('Sue Jones', 60000)

print(bob.lastName())
sue.giveRaise(0.10)
print(sue.pay)`,
          output: `Smith
66000.0`,
          annotations: [
            { line: 2, text: '__init__ là hàm khởi tạo, gán các thuộc tính name và pay vào self.' },
            { line: 6, text: 'self.name.split()[-1] cắt chuỗi theo khoảng trắng và lấy từ cuối cùng (họ).' },
            { line: 9, text: 'self.pay *= (1.0 + percent) cập nhật trực tiếp thuộc tính pay của đối tượng.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Nhầm lẫn giữa Thuộc tính (Attribute) và Phương thức (Method)',
        content: `
          <p>Thuộc tính là dữ liệu gắn liền với đối tượng (ví dụ <code>sue.pay</code> — không có cặp ngoặc tròn <code>()</code>). Phương thức là hàm thực hiện hành động gắn liền với đối tượng (ví dụ <code>bob.lastName()</code> — bắt buộc có cặp ngoặc tròn <code>()</code> để thực thi).</p>
        `
      }
    ],
    tips: [
      {
        title: 'Các kiểu dựng sẵn là nền móng của Lớp tự tạo',
        content: `
          <p>Hãy chú ý: bên trong lớp <code>Worker</code>, chúng ta lưu trữ tên bằng chuỗi (<code>str</code>), lương bằng số (<code>int/float</code>), và trích xuất họ bằng phương thức chuỗi (<code>split()</code>). Các lớp do bạn tự định nghĩa không thay thế các kiểu dựng sẵn mà được xây dựng trực tiếp từ chính những kiểu dữ liệu cốt lõi đó.</p>
        `
      }
    ],
    deepDive: {
      title: 'Mọi lớp trong Python đều là đối tượng hạng nhất',
      content: `
        <p>Trong Python, bản thân câu lệnh <code>class</code> là một câu lệnh thực thi: khi Python đọc qua định nghĩa lớp, nó tạo ra một đối tượng kiểu <code>type</code> trong bộ nhớ. Bạn có thể truyền lớp như tham số, gán lớp vào biến, hoặc kiểm tra các thuộc tính của lớp bằng <code>dir(Worker)</code>.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Thêm phương thức hiển thị thông tin nhân viên',
      level: 'Dễ',
      description: 'Dựa trên lớp <code>Worker</code> ở trên, hãy bổ sung phương thức <code>describe(self)</code> trả về chuỗi có định dạng: <code>"Nhân viên: [tên] - Lương: [lương]"</code>.',
      starterCode: `class Worker:
    def __init__(self, name, pay):
        self.name = name
        self.pay = pay

    # Bổ sung phương thức describe tại đây
`,
      solution: `class Worker:
    def __init__(self, name, pay):
        self.name = name
        self.pay = pay

    def describe(self):
        return f"Nhân viên: {self.name} - Lương: {self.pay}"

w = Worker('Alice Trần', 75000)
print(w.describe())`,
      solutionOutput: `Nhân viên: Alice Trần - Lương: 75000`,
      explanation: 'Phương thức <code>describe</code> truy cập vào hai thuộc tính <code>self.name</code> và <code>self.pay</code> để ghép thành chuỗi mô tả.'
    },
    {
      title: 'Lớp Tài khoản Ngân hàng đơn giản',
      level: 'Vừa',
      description: 'Hãy viết lớp <code>BankAccount</code> gồm phương thức khởi tạo <code>__init__(self, owner, balance=0)</code>, phương thức nạp tiền <code>deposit(self, amount)</code> và rút tiền <code>withdraw(self, amount)</code> (chỉ cho rút nếu đủ số dư).',
      starterCode: `class BankAccount:
    pass

acc = BankAccount("Bob", 100)
acc.deposit(50)
acc.withdraw(30)
print("Số dư:", acc.balance)`,
      solution: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return True
        print("Không đủ số dư!")
        return False

acc = BankAccount("Bob", 100)
acc.deposit(50)
acc.withdraw(30)
print("Số dư:", acc.balance)`,
      solutionOutput: `Số dư: 120`,
      explanation: 'Mô hình hóa tài khoản đóng gói dữ liệu số dư và các quy tắc nghiệp vụ nạp/rút trong cùng một thực thể lớp.'
    }
  ],

  quiz: [
    {
      question: 'Câu lệnh nào trong Python được dùng để định nghĩa một kiểu dữ liệu mới do người dùng tự tạo?',
      options: [
        'def',
        'type',
        'class',
        'struct'
      ],
      correctIndex: 2,
      explanation: 'Câu lệnh class là công cụ trung tâm để tạo các kiểu đối tượng tùy biến trong lập trình hướng đối tượng của Python.'
    },
    {
      question: 'Khi bạn gọi bob = Worker(\'Bob Smith\', 50000), đối tượng bob được gọi là gì trong thuật ngữ OOP?',
      options: [
        'Một Lớp (Class)',
        'Một Thể hiện (Instance)',
        'Một Mô-đun (Module)',
        'Một Gói (Package)'
      ],
      correctIndex: 1,
      explanation: 'bob là một thể hiện cụ thể (instance) được sinh ra từ khuôn mẫu của lớp Worker.'
    },
    {
      question: 'Phát biểu nào sau đây phân biệt ĐÚNG giữa Thuộc tính (Attribute) và Phương thức (Method)?',
      options: [
        'Thuộc tính lưu trữ trạng thái dữ liệu (sue.pay); Phương thức là hàm xử lý hành vi (sue.giveRaise()).',
        'Thuộc tính bắt buộc phải có dấu ngoặc tròn (); Phương thức thì không.',
        'Thuộc tính chỉ dùng cho số; Phương thức chỉ dùng cho chuỗi.',
        'Không có sự khác biệt nào giữa chúng.'
      ],
      correctIndex: 0,
      explanation: 'Thuộc tính biểu diễn dữ liệu của đối tượng, còn phương thức là các hàm thực hiện hành động trên dữ liệu đó.'
    }
  ],

  summary: [
    'Câu lệnh class cho phép lập trình viên định nghĩa các kiểu dữ liệu hướng đối tượng tùy biến.',
    'Một lớp (class) đóng vai trò khuôn mẫu; từ một lớp ta có thể tạo ra nhiều thể hiện (instances) độc lập.',
    'Thuộc tính (attributes) lưu trữ dữ liệu; phương thức (methods) gắn kết logic xử lý đi kèm đối tượng.',
    'Các kiểu dữ liệu dựng sẵn là vật liệu xây dựng nền tảng cho các lớp tự tạo.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 35.'
  ]
};
