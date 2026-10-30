export default {
  id: 'lp-c4-06-1',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.6.1',
  title: 'Danh sách: Thao tác trên dãy tuần tự',
  subtitle: 'Dãy tuần tự tổng quát nhất, không cố định kích thước, chứa kiểu dữ liệu tùy ý và thừa hưởng các thao tác vị trí',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững định nghĩa: danh sách (list) là dãy tuần tự tổng quát nhất được Python cung cấp.',
    'Nhận biết các đặc tính cốt lõi: có thứ tự vị trí, không ràng buộc kiểu, không cố định kích thước, và khả biến.',
    'Áp dụng toàn bộ thao tác dãy tuần tự chung đã học từ chuỗi (len, chỉ mục, cắt lát, +, *) lên danh sách.',
    'Thấy rõ điểm khác biệt: các thao tác dãy tuần tự trên list trả về list mới và không làm thay đổi list gốc.'
  ],

  intuition: {
    title: 'Hộp đồ chơi đa năng nhiều ngăn',
    metaphor: 'Nếu chuỗi ký tự giống như một chuỗi hạt ngọc được xâu cố định bằng sợi cước niêm phong (chỉ xâu được hạt chữ và không tháo ra được), thì danh sách (list) giống như một chiếc hộp nhiều ngăn co giãn: mỗi ngăn bạn có thể nhét một món đồ thuộc bất kỳ kiểu nào — một con số nguyên, một dòng chữ, hay thậm chí cả một chiếc hộp đồ chơi khác. Bạn có thể đếm ngăn, xem đồ trong ngăn thứ 0, cắt lấy 2 ngăn đầu tiên, hoặc nối hai chiếc hộp lại với nhau một cách tự nhiên.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CẤU TRÚC DANH SÁCH KHÔNG RÀNG BUỘC KIỂU: L = [123, 'text', 1.23]</div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;max-width:480px;margin:0 auto;width:100%;text-align:center;">
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Chỉ mục: 0</div>
            <div style="font-size:1.2rem;font-weight:700;color:var(--accent-primary);margin:4px 0;">123</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Kiểu: int</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--success);border-radius:8px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Chỉ mục: 1</div>
            <div style="font-size:1.2rem;font-weight:700;color:var(--success);margin:4px 0;">'text'</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Kiểu: str</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--warning);border-radius:8px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Chỉ mục: 2</div>
            <div style="font-size:1.2rem;font-weight:700;color:var(--warning);margin:4px 0;">1.23</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Kiểu: float</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Danh sách là Dãy tuần tự Tổng quát nhất',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 16 / 38</strong>.</p>
          </div>
        </div>

        <p>Đối tượng <strong>danh sách (list)</strong> của Python là dãy tuần tự tổng quát nhất được ngôn ngữ cung cấp:</p>
        <ul>
          <li>Danh sách là <strong>các tập hợp có thứ tự vị trí</strong> của các đối tượng thuộc kiểu dữ liệu tùy ý.</li>
          <li>Chúng <strong>không có kích thước cố định</strong> và là cấu trúc <strong>khả biến (mutable)</strong>.</li>
          <li>Khác với chuỗi ký tự, danh sách có thể được sửa đổi tại chỗ bằng phép gán theo độ dời cũng như thông qua nhiều lệnh gọi phương thức danh sách đa dạng.</li>
        </ul>
        <p>Theo đó, chúng cung cấp một công cụ rất linh hoạt để biểu diễn các tập hợp tùy ý trong đời sống thực tế—các tệp trong một thư mục, nhân viên trong một công ty, email trong hộp thư đến của bạn, vân vân.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Các Thao tác Dãy tuần tự trên Danh sách',
      content: `
        <p>Bởi vì chúng là các dãy tuần tự, danh sách hỗ trợ tất cả các thao tác dãy tuần tự mà chúng ta đã thảo luận cho chuỗi ký tự; điểm khác biệt duy nhất là hầu hết chúng trả về danh sách thay vì chuỗi.</p>
        <p>Ví dụ, cho một danh sách gồm ba phần tử thuộc ba kiểu dữ liệu hoàn toàn khác nhau (số nguyên, chuỗi, số thực dấu phẩy động):</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo danh sách và kiểm tra độ dài bằng len()',
          code: `>>> L = [123, 'text', 1.23]           # Danh sách gồm ba đối tượng thuộc các kiểu khác nhau
>>> len(L)                            # Số lượng phần tử trong danh sách
3`,
          output: `3`,
          annotations: [
            { line: 1, text: 'Danh sách L được tạo bằng cặp ngoặc vuông [...] chứa 3 kiểu dữ liệu khác nhau.' },
            { line: 2, text: 'len(L) trả về 3 phần tử ở cấp cao nhất.' }
          ]
        },
        {
          title: 'Chỉ mục, cắt lát, ghép nối và lặp lại trên danh sách',
          code: `>>> L[0]                              # Lập chỉ mục theo vị trí (độ dời)
123
>>> L[:-1]                            # Cắt lát danh sách trả về một danh sách mới
[123, 'text']
>>> L + [4, 5, 6]                     # Ghép nối cũng tạo danh sách mới
[123, 'text', 1.23, 4, 5, 6]
>>> L * 2                             # Lặp lại cũng tạo danh sách mới
[123, 'text', 1.23, 123, 'text', 1.23]
>>> L                                 # Chúng ta không làm thay đổi danh sách gốc
[123, 'text', 1.23]`,
          output: `123
[123, 'text']
[123, 'text', 1.23, 4, 5, 6]
[123, 'text', 1.23, 123, 'text', 1.23]
[123, 'text', 1.23]`,
          annotations: [
            { line: 1, text: 'L[0] trích xuất phần tử đầu tiên (độ dời 0).' },
            { line: 3, text: 'L[:-1] cắt lát lấy từ đầu đến trước phần tử cuối cùng, trả về list mới.' },
            { line: 5, text: 'Toán tử + kết hợp hai danh sách lại thành danh sách thứ ba hoàn toàn mới.' },
            { line: 7, text: 'Toán tử * nhân bản gấp đôi danh sách.' },
            { line: 9, text: 'Quan trọng: Bản thân danh sách gốc L hoàn toàn không bị thay đổi bởi +, *, cắt lát.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Thao tác dãy tuần tự không làm đổi list gốc',
        content: 'Hãy ghi nhớ: Dù danh sách là đối tượng khả biến, nhưng các toán tử dãy tuần tự tổng quát như cắt lát <code>L[1:3]</code>, ghép nối <code>L + [...]</code>, lặp lại <code>L * 2</code> luôn sinh ra một <strong>danh sách mới</strong> làm kết quả mà không hề làm biến đổi danh sách gốc <code>L</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo danh sách hỗn hợp và truy xuất phần tử',
      level: 'Dễ',
      problem: 'Tạo một danh sách <code>items</code> chứa 4 phần tử: tên bạn (str), tuổi (int), chiều cao (float) và trạng thái đang học (bool True). In ra phần tử cuối cùng bằng chỉ mục âm.',
      hint: 'Dùng chỉ mục <code>items[-1]</code>.',
      solutionCode: `items = ['Pat', 40, 1.75, True]
print("Phần tử cuối cùng:", items[-1])
print("Số lượng phần tử:", len(items))`,
      solutionOutput: `Phần tử cuối cùng: True
Số lượng phần tử: 4`,
      explanation: 'Danh sách Python chứa được các kiểu dữ liệu không đồng nhất và chỉ mục âm -1 luôn lấy ra phần tử cuối cùng.'
    },
    {
      title: 'Nhân bản và ghép danh sách',
      level: 'Vừa',
      problem: 'Cho danh sách <code>prefix = [0] * 3</code> và <code>data = [1, 2]</code>. Hãy ghép chúng lại thành một danh sách kết quả duy nhất và in ra.',
      hint: 'Dùng toán tử <code>+</code> giữa hai danh sách.',
      solutionCode: `prefix = [0] * 3
data = [1, 2]
combined = prefix + data
print("Danh sách kết hợp:", combined)`,
      solutionOutput: `Danh sách kết hợp: [0, 0, 0, 1, 2]`,
      explanation: '<code>[0] * 3</code> sinh ra <code>[0, 0, 0]</code>, sau đó phép cộng ghép nối tạo ra danh sách mới 5 phần tử.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về kiểu danh sách (list) trong Python?',
      options: [
        'Tất cả các phần tử trong danh sách bắt buộc phải cùng một kiểu dữ liệu như mảng trong C.',
        'Danh sách có kích thước cố định khi khai báo và không thể mở rộng.',
        'Danh sách là tập hợp có thứ tự vị trí, chứa các đối tượng thuộc kiểu tùy ý, không cố định kích thước và khả biến.',
        'Danh sách không hỗ trợ phép cắt lát slicing.'
      ],
      correctIndex: 2,
      explanation: 'List là dãy tuần tự tổng quát: có thứ tự, chứa kiểu tùy ý, co giãn linh hoạt và khả biến (có thể sửa tại chỗ).'
    },
    {
      question: 'Cho danh sách L = [10, 20, 30]. Sau khi thực thi biểu thức L + [40, 50], giá trị của danh sách L ban đầu là gì?',
      options: [
        '[10, 20, 30, 40, 50]',
        '[10, 20, 30]',
        '[40, 50]',
        'Lỗi TypeError vì không được cộng danh sách.'
      ],
      correctIndex: 1,
      explanation: 'Toán tử + tạo ra một danh sách mới, không làm thay đổi danh sách gốc L.'
    },
    {
      question: 'Biểu thức nào sau đây trả về một bản sao mức cao nhất của toàn bộ danh sách L?',
      options: [
        'L[0]',
        'L[-1]',
        'L[:]',
        'L[1:]'
      ],
      correctIndex: 2,
      explanation: 'Cú pháp cắt lát L[:] với hai cận mặc định trích xuất toàn bộ phần tử thành một bản sao danh sách mới.'
    }
  ],

  summary: [
    'Danh sách (list) là dãy tuần tự tổng quát nhất: có thứ tự vị trí, không ràng buộc kiểu, không kích thước cố định.',
    'Danh sách là cấu trúc khả biến (mutable), có thể sửa đổi tại chỗ.',
    'Thừa hưởng toàn bộ thao tác dãy tuần tự: len(), chỉ mục dương/âm, cắt lát X[I:J], ghép nối (+) và lặp lại (*).',
    'Các thao tác dãy tuần tự tổng quát luôn sinh ra danh sách mới, không làm thay đổi danh sách gốc.',
    'Ý chính: Danh sách mang lại sự linh hoạt tối đa để mô hình hóa mọi tập hợp thực thể trong thế giới thực.'
  ]
};
