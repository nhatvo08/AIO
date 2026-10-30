export default {
  id: 'lp-c4-06-4',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.6.4',
  title: 'Danh sách: Cấu trúc lồng nhau (Nesting)',
  subtitle: 'Biểu diễn ma trận đa chiều bằng danh sách lồng danh sách và mẹo mở rộng NumPy',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững tính năng lồng nhau (nesting) của cấu trúc dữ liệu Python: danh sách chứa các danh sách con.',
    'Biểu diễn và thao tác trên ma trận số học 2 chiều bằng cú pháp chỉ mục kép M[hàng][cột].',
    'Hiểu cách thức Python quản lý cây tham chiếu trong các cấu trúc lồng nhau tùy ý.',
    'Nhận biết mẹo của sách: khi nào nên dùng list lồng nhau và khi nào nên dùng thư viện khoa học NumPy.'
  ],

  intuition: {
    title: 'Tủ ngăn kéo chứa các hộp nhỏ',
    metaphor: 'Hãy tưởng tượng bạn có một chiếc tủ lớn gồm 3 ngăn kéo (hàng 0, hàng 1, hàng 2). Bên trong mỗi ngăn kéo lại chứa một chiếc hộp chia làm 3 ô nhỏ (cột 0, cột 1, cột 2). Để lấy một món đồ, trước tiên bạn kéo ngăn thứ nhất ra: M[1] cho bạn cả chiếc hộp đó. Sau đó bạn nhón tay vào ô thứ hai của chiếc hộp: M[1][2] cho bạn chính xác món đồ cần tìm. Đó chính là cơ chế lồng nhau (nesting) trong Python.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MA TRẬN LỒNG NHAU: M = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:320px;margin:0 auto;width:100%;">
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;text-align:center;">
            <div style="padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:4px;">1</div>
            <div style="padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:4px;">2</div>
            <div style="padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:4px;">3</div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;text-align:center;border:2px dashed var(--accent-primary);border-radius:6px;padding:2px;">
            <div style="padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:4px;">4</div>
            <div style="padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:4px;">5</div>
            <div style="padding:8px;background:var(--accent-primary);color:#fff;font-weight:700;border-radius:4px;">6 (M[1][2])</div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px;text-align:center;">
            <div style="padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:4px;">7</div>
            <div style="padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:4px;">8</div>
            <div style="padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:4px;">9</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">M[1] trích xuất hàng thứ hai [4, 5, 6]; tiếp tục [2] trích xuất phần tử 6.</div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Cấu trúc Lồng nhau (Nesting)',
      content: `
        <p>Một đặc tính cực kỳ mạnh mẽ của các kiểu dữ liệu cốt lõi trong Python là chúng hỗ trợ <strong>lồng nhau tùy ý (nesting)</strong>.</p>
        <p>Bạn có thể tạo ra các tập hợp chứa các tập hợp khác ở bất kỳ cấp độ nào. Ví dụ, một danh sách có thể chứa các số nguyên, chuỗi, và các danh sách khác; một từ điển có thể chứa danh sách; một danh sách có thể chứa từ điển.</p>
        <p>Tính năng này cho phép bạn xây dựng các cấu trúc dữ liệu phức tạp để mô hình hóa thế giới thực một cách tự nhiên mà không cần phải viết thêm cấu trúc lớp hay quản lý bộ nhớ thủ công.</p>
      `
    },
    {
      id: 'sec-2',
      title: '2. Biểu diễn Ma trận bằng Danh sách 2 chiều',
      content: `
        <p>Một ứng dụng phổ biến và trực quan nhất của cấu trúc lồng nhau là mô hình hóa <strong>ma trận số học</strong> hoặc bảng dữ liệu dạng lưới (grid):</p>
        <ul>
          <li>Danh sách ngoài cùng đại diện cho toàn bộ ma trận (tập hợp các hàng).</li>
          <li>Mỗi danh sách con đại diện cho một hàng riêng biệt trong ma trận.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Ma trận 3x3 và truy cập chỉ mục kép',
          code: `>>> M = [[1, 2, 3],
...      [4, 5, 6],
...      [7, 8, 9]]
>>> M
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
>>> M[1]                    # Lấy toàn bộ hàng thứ hai (chỉ mục 1)
[4, 5, 6]
>>> M[1][2]                 # Lấy phần tử ở cột thứ ba (chỉ mục 2) của hàng thứ hai
6`,
          output: `[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
[4, 5, 6]
6`,
          annotations: [
            { line: 1, text: 'M là danh sách gồm 3 phần tử, mỗi phần tử lại là một danh sách 3 số.' },
            { line: 6, text: 'M[1] trích xuất phần tử ở vị trí 1, kết quả là danh sách [4, 5, 6].' },
            { line: 8, text: 'M[1][2] áp dụng tiếp chỉ mục [2] lên danh sách vừa nhận được, cho kết quả là 6.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy nhân bản danh sách con: [[0]*3]*3',
        content: `
          <p>Khi muốn khởi tạo ma trận 3x3 chứa toàn số 0, nhiều người viết: <code>M = [[0] * 3] * 3</code>.</p>
          <p><strong>CẢNH BÁO NGUY HIỂM:</strong> Phép nhân <code>* 3</code> ở ngoài không tạo ra 3 danh sách độc lập, mà nó nhân bản 3 tham chiếu trỏ cùng vào <em>MỘT</em> danh sách con duy nhất! Khi bạn sửa <code>M[0][0] = 9</code>, cả 3 hàng đều sẽ đổi thành <code>[9, 0, 0]</code>.</p>
          <p>Cách viết đúng là dùng comprehension: <code>M = [[0] * 3 for _ in range(3)]</code>.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Mẹo của sách: Khi nào nên dùng NumPy?',
        content: `
          <p>Cấu trúc danh sách lồng nhau của Python rất tuyệt vời và đủ dùng cho các tác vụ cơ bản. Tuy nhiên, đối với các phép toán ma trận nhiều chiều quy mô lớn, tính toán đồ họa hoặc xử lý khoa học dữ liệu chuyên sâu, Mark Lutz khuyến nghị sử dụng <strong>NumPy</strong> (Numeric Python).</p>
          <p>NumPy lưu trữ dữ liệu dưới dạng các khối nhị phân liên tục bằng ngôn ngữ C, giúp tính toán ma trận với tốc độ nhanh hơn từ hàng chục đến hàng trăm lần so với danh sách Python thuần túy.</p>
        `
      }
    ],
    deepDive: {
      title: 'Mô hình con trỏ trong ma trận lồng nhau',
      content: `
        <p>Trong C, một mảng 2 chiều <code>int M[3][3]</code> là một khối 9 số nguyên nằm liền kề nhau trong bộ nhớ RAM.</p>
        <p>Trong Python, danh sách <code>M</code> chứa 3 con trỏ trỏ tới 3 đối tượng <code>list</code> riêng biệt nằm rải rác trên heap. Mỗi đối tượng <code>list</code> đó lại chứa 3 con trỏ trỏ tới 3 đối tượng số nguyên <code>int</code> độc lập. Cơ chế này cho phép các hàng có độ dài khác nhau tùy ý (ragged arrays) và chứa các kiểu dữ liệu khác nhau trong cùng một ma trận.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Truy xuất phần tử ma trận',
      level: 'Dễ',
      description: 'Cho ma trận <code>grid = [[10, 20], [30, 40], [50, 60]]</code>. Hãy viết mã để lấy giá trị số <code>50</code> và tính tổng của toàn bộ hàng thứ nhất.',
      starterCode: `grid = [[10, 20], [30, 40], [50, 60]]

# 1. Lấy phần tử 50
# 2. Tính tổng hàng đầu tiên (chỉ mục 0)`,
      solution: `grid = [[10, 20], [30, 40], [50, 60]]

val_50 = grid[2][0]
row_0_sum = sum(grid[0])

print("Giá trị 50:", val_50)
print("Tổng hàng 0:", row_0_sum)`,
      solutionOutput: `Giá trị 50: 50
Tổng hàng 0: 30`,
      explanation: 'Số 50 nằm ở hàng chỉ mục 2, cột chỉ mục 0 nên truy cập bằng <code>grid[2][0]</code>. Hàng đầu tiên là <code>grid[0]</code>, có tổng 10 + 20 = 30.'
    },
    {
      title: 'Sửa đổi phần tử trong cấu trúc lồng nhau',
      level: 'Vừa',
      description: 'Cho danh sách sinh viên <code>students = [["Nam", [8, 9]], ["Hoa", [7, 6]]]</code>. Hãy thêm điểm 10 vào danh sách điểm của "Nam", và thay đổi điểm thứ hai của "Hoa" thành 8.',
      starterCode: `students = [["Nam", [8, 9]], ["Hoa", [7, 6]]]

# Thực hiện sửa đổi tại đây
`,
      solution: `students = [["Nam", [8, 9]], ["Hoa", [7, 6]]]

# Thêm điểm 10 cho Nam (hàng 0, danh sách con vị trí 1)
students[0][1].append(10)

# Sửa điểm thứ hai của Hoa thành 8
students[1][1][1] = 8

print(students)`,
      solutionOutput: `[['Nam', [8, 9, 10]], ['Hoa', [7, 8]]]`,
      explanation: '<code>students[0][1]</code> truy cập tới danh sách <code>[8, 9]</code> và gọi <code>append(10)</code>. <code>students[1][1][1]</code> chỉ tới điểm số 6 của Hoa để gán lại thành 8.'
    }
  ],

  quiz: [
    {
      question: 'Cho M = [[1, 2], [3, 4], [5, 6]]. Biểu thức M[2][1] trả về giá trị nào?',
      options: [
        '3',
        '4',
        '5',
        '6'
      ],
      correctIndex: 3,
      explanation: 'M[2] là hàng thứ ba [5, 6]. M[2][1] là phần tử ở chỉ mục 1 của hàng đó, tức là 6.'
    },
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về cấu trúc lồng nhau trong Python?',
      options: [
        'Tất cả các danh sách con trong một ma trận bắt buộc phải có cùng số lượng phần tử.',
        'Các cấu trúc dữ liệu có thể lồng nhau với độ sâu tùy ý và chứa các kiểu dữ liệu khác nhau.',
        'Python chỉ hỗ trợ lồng nhau tối đa 2 cấp độ.',
        'Một danh sách không thể chứa đối tượng từ điển bên trong.'
      ],
      correctIndex: 1,
      explanation: 'Python cho phép lồng các cấu trúc dữ liệu với độ sâu tùy ý và không giới hạn kiểu phần tử.'
    },
    {
      question: 'Theo sách của Mark Lutz, hệ thống mở rộng nào được khuyên dùng khi cần tính toán ma trận lớn với hiệu năng cao?',
      options: [
        'MathMatrix',
        'NumPy',
        'SciPy-Lite',
        'PyArray'
      ],
      correctIndex: 1,
      explanation: 'NumPy (Numeric Python) là thư viện mở rộng tiêu chuẩn thực tế cho tính toán ma trận và mảng đa chiều hiệu năng cao.'
    }
  ],

  summary: [
    'Python hỗ trợ cấu trúc dữ liệu lồng nhau tùy ý (nesting): danh sách trong danh sách, từ điển trong danh sách, v.v.',
    'Ma trận 2 chiều được biểu diễn trực quan bằng danh sách các danh sách: M = [[1, 2, 3], [4, 5, 6], [7, 8, 9]].',
    'Truy cập phần tử qua nhiều tầng chỉ mục liên tiếp: M[hàng][cột].',
    'Mẹo của sách: Sử dụng thư viện mở rộng NumPy cho các ma trận toán học lớn và tính toán khoa học chuyên sâu.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 18.'
  ]
};
