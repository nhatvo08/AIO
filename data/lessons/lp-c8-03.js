export default {
  id: 'lp-c8-03',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.3',
  title: 'Đánh chỉ mục (Indexing), Cắt lát (Slicing) & Ma trận đa chiều (Matrix) với List',
  subtitle: 'Kỹ thuật trích xuất phần tử, chỉ mục âm, cắt lát trả về list mới và biểu diễn mảng đa chiều bằng sublist lồng nhau',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo kỹ thuật đánh chỉ mục dương và chỉ mục âm trên List để trích xuất đối tượng bất kỳ.',
    'Hiểu rõ bản chất phép cắt lát (slicing) trên List: luôn luôn trả về một đối tượng List mới tinh.',
    'Biểu diễn và truy xuất ma trận hai chiều (2D Matrix / mảng đa chiều) bằng kỹ thuật lồng ghép sublist.',
    'Nắm vững quy tắc cú pháp đa dòng tự nhiên của List trong cặp dấu ngoặc vuông `[]`.'
  ],

  intuition: {
    title: 'Bàn cờ ma trận và Tọa độ hàng-cột hai tầng',
    metaphor: 'Hãy tưởng tượng một bảng tính Excel hay một bàn cờ caro 3x3. Làm thế nào để biểu diễn chiếc bàn cờ này trong một ngôn ngữ chỉ có mảng một chiều như Python? Câu trả lời vô cùng thanh lịch: một chiếc hộp lớn chứa 3 chiếc hộp con bên trong! Chiếc hộp lớn `matrix` chứa 3 hàng: hàng 0, hàng 1, hàng 2. Mỗi hàng lại là một list nhỏ chứa 3 ô số tương ứng với các cột. Khi bạn viết `matrix[1]`, bạn nhấc toàn bộ chiếc hộp con của hàng thứ hai ra ngoài. Nếu bạn muốn lấy chính xác con số ở cột thứ hai của hàng đó, bạn chỉ cần mở tiếp chiếc hộp con bằng chỉ mục thứ hai: `matrix[1][1]`. Việc xâu chuỗi hai dấu ngoặc vuông `[hàng][cột]` chính là chìa khóa mở ra cánh cửa thế giới dữ liệu đa chiều!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH MA TRẬN 3x3 VỚI CÁC SUBLIST LỒNG NHAU</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:6px;">
            <span style="font-size:0.75rem;color:var(--text-muted);width:70px;line-height:36px;">Hàng 0:</span>
            <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">1</span>
            <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">2</span>
            <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">3</span>
          </div>
          <div style="display:flex;gap:6px;">
            <span style="font-size:0.75rem;color:var(--accent-primary);font-weight:700;width:70px;line-height:36px;">Hàng 1:</span>
            <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">4</span>
            <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);border:2px solid var(--accent-primary);border-radius:4px;font-weight:700;font-size:1.1rem;">5</span>
            <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">6</span>
          </div>
          <div style="display:flex;gap:6px;">
            <span style="font-size:0.75rem;color:var(--text-muted);width:70px;line-height:36px;">Hàng 2:</span>
            <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">7</span>
            <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">8</span>
            <span style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">9</span>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--accent-primary);font-weight:700;">
          matrix[1][1] = 5 (Hàng index 1, Cột index 1)
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Đánh chỉ mục (Indexing) và Cắt lát (Slicing) trên List',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 5 / 42 – Trang 6 / 42</strong>.</p>
          </div>
        </div>

        <p>Vì list là các dãy tuần tự (sequence), thao tác đánh chỉ mục (indexing) và cắt lát (slicing) cũng hoạt động đối với list theo cách tương tự như đối với chuỗi. Tuy nhiên, có hai điểm khác biệt bản chất bạn cần lưu ý:</p>

        <ul>
          <li><strong>Kiểu dữ liệu trả về khi đánh chỉ mục:</strong> Kết quả của phép đánh chỉ mục <code>L[i]</code> là bất kỳ kiểu đối tượng nào cư trú tại vị trí bù đó (số nguyên, chuỗi, dict, hay một list khác), chứ không bị ép buộc thành chuỗi một ký tự như khi đánh chỉ mục chuỗi.</li>
          <li><strong>Kiểu dữ liệu trả về khi cắt lát:</strong> Thao tác cắt lát <code>L[start:stop]</code> <strong>luôn luôn trả về một đối tượng List mới tinh</strong> (chứ không phải chuỗi), chứa bản sao nông các tham chiếu trong phân đoạn được chọn.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Các thao tác Indexing và Slicing căn bản trên List trong REPL',
          code: `L = ['hack', 'Hack', 'HACK!']

# Vị trí bù bắt đầu từ số 0
print("L[2]:", repr(L[2]))

# Số âm: đếm ngược từ bên phải sang (-1 là cuối cùng)
print("L[-2]:", repr(L[-2]))

# Cắt lát để lấy các phân đoạn: trả về list mới
print("L[1:]:", L[1:])`,
          output: `L[2]: 'HACK!'
L[-2]: 'Hack'
L[1:]: ['Hack', 'HACK!']`,
          annotations: [
            { line: 4, text: 'L[2] lấy phần tử tại offset 2, trả về chuỗi \'HACK!\'.' },
            { line: 7, text: 'L[-2] đếm từ bên phải: -1 là \'HACK!\', -2 là \'Hack\'.' },
            { line: 10, text: 'L[1:] cắt lát từ offset 1 đến hết, trả về list mới gồm 2 phần tử.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Ma trận Đa chiều (Matrix) với các Sublist Lồng nhau',
      content: `
        <p>Điểm mới mẻ và vô cùng mạnh mẽ ở đây: vì bạn có thể lồng các list vào bên trong list khác, bạn có thể xâu chuỗi nhiều thao tác chỉ mục lại với nhau để đi sâu hơn vào một cấu trúc dữ liệu nhiều tầng bậc.</p>

        <p>Một trong những cách đơn giản nhất để biểu diễn <strong>ma trận (mảng đa chiều)</strong> trong Python thuần là sử dụng các list chứa các sublist lồng nhau. Dưới đây là một mảng hai chiều kích thước 3 × 3 cơ bản dựa trên list:</p>

        <ul>
          <li>Với <strong>một chỉ mục</strong> (ví dụ: <code>matrix[1]</code>), bạn nhận được toàn bộ một hàng (thực chất là một sublist lồng nhau).</li>
          <li>Với <strong>hai chỉ mục</strong> (ví dụ: <code>matrix[1][1]</code>), bạn lấy được một phần tử cụ thể bên trong hàng đó.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo và truy xuất phần tử ma trận 3x3 trong Python',
          code: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Lấy toàn bộ hàng index 1
row_1 = matrix[1]
print("matrix[1] (Hàng 1):", row_1)

# Lấy phần tử hàng 1, cột 1
val_center = matrix[1][1]
print("matrix[1][1] (Tâm ma trận):", val_center)

# Lấy phần tử hàng 2, cột 0
val_corner = matrix[2][0]
print("matrix[2][0] (Đầu hàng cuối):", val_corner)`,
          output: `matrix[1] (Hàng 1): [4, 5, 6]
matrix[1][1] (Tâm ma trận): 5
matrix[2][0] (Đầu hàng cuối): 7`,
          annotations: [
            { line: 4, text: 'matrix[1] trả về sublist [4, 5, 6].' },
            { line: 8, text: 'matrix[1][1] lấy phần tử offset 1 trong sublist đó, cho kết quả là 5.' },
            { line: 12, text: 'matrix[2][0] lấy phần tử offset 0 trong sublist thứ ba, cho kết quả là 7.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cú pháp Trải dài trên Nhiều dòng Tự nhiên',
      content: `
        <p>Như đã minh họa, các hằng số list có thể trải dài một cách tự nhiên trên nhiều dòng văn bản nếu bạn muốn, bởi vì chúng được bao bọc bởi một cặp dấu ngoặc vuông <code>[]</code>. Khi gặp dấu mở ngoặc vuông, trình thông dịch Python sẽ tự động bỏ qua các ký tự xuống dòng cho tới khi gặp dấu đóng ngoặc vuông tương ứng, mà <strong>không cần phải thêm ký tự gạch chéo ngược <code>\\</code></strong> ở cuối mỗi dòng:</p>

        <p>Điều này giúp việc trình bày các ma trận, bảng số liệu hoặc danh sách cấu hình dài trở nên vô cùng trực quan và dễ đọc trong mã nguồn thực tế.</p>
      `,
      codeExamples: [
        {
          title: 'Định nghĩa ma trận đa dòng trực quan chuẩn PEP 8',
          code: `# Trải dài tự nhiên trên nhiều dòng trong cặp ngoặc vuông []
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print("Ma trận 3 hàng:")
for row in matrix:
    print(" ", row)

print("Phần tử trung tâm:", matrix[1][1])`,
          output: `Ma trận 3 hàng:
  [1, 2, 3]
  [4, 5, 6]
  [7, 8, 9]
Phần tử trung tâm: 5`,
          annotations: [
            { line: 2, text: 'Mỗi hàng đặt trên một dòng riêng biệt giúp cấu trúc dữ liệu hiển thị đúng dạng hình học 3x3.' },
            { line: 9, text: 'Vòng lặp for duyệt qua từng hàng một cách mạch lạc.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mở rộng về xử lý ma trận hiệu năng cao và ma trận thưa',
        content: 'Với các bài toán khoa học dữ liệu đòi hỏi tính toán số học trên ma trận khổng lồ, thư viện <strong>NumPy</strong> (được giới thiệu ở các Chương 1, 4, 5) cung cấp các mảng đa chiều thực thụ được tối ưu hóa bằng C. Ngoài ra, với ma trận phần lớn là các ô rỗng (<em>ma trận thưa - sparse matrix</em>), việc dùng Dictionary với khóa tuple (tọa độ) sẽ tiết kiệm bộ nhớ hơn nhiều so với list lồng nhau (chúng ta sẽ học ở bài C8.20).'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy chỉ mục ngoài biên IndexError',
        content: 'Khác với cắt lát cho phép chỉ số vượt biên một cách an toàn (ví dụ: <code>L[0:100]</code> không báo lỗi), phép đánh chỉ mục đơn lẻ <code>L[99]</code> sẽ kích hoạt ngay lập tức ngoại lệ <code>IndexError: list index out of range</code> nếu vị trí bù đó không tồn tại trong list.'
      }
    ]
  },

  exercises: [
    {
      title: 'Trích xuất đường chéo chính của một ma trận 3x3',
      level: 'Vừa',
      problem: 'Cho ma trận 3x3: m = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]. Hãy viết mã Python trích xuất 3 phần tử nằm trên đường chéo chính (tọa độ [0][0], [1][1], [2][2]) và gom chúng vào một list mới.',
      hint: 'Dùng cú pháp gom list [m[0][0], m[1][1], m[2][2]] hoặc duyệt vòng lặp range(3).',
      solutionCode: `m = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]

# Trích xuất các phần tử đường chéo chính
diag = [m[i][i] for i in range(len(m))]

print("Ma trận ban đầu:")
for r in m:
    print(r)
print("Đường chéo chính:", diag)`,
      solutionOutput: `Ma trận ban đầu:
[10, 20, 30]
[40, 50, 60]
[70, 80, 90]
Đường chéo chính: [10, 50, 90]`,
      explanation: 'Biểu thức m[i][i] với i chạy từ 0 đến 2 sẽ lần lượt trích xuất m[0][0] = 10, m[1][1] = 50, m[2][2] = 90.'
    }
  ],

  quiz: [
    {
      question: 'Cho m = [[1, 2], [3, 4], [5, 6]]. Biểu thức m[2][0] sẽ trả về giá trị nào?',
      options: [
        '3',
        '5',
        '[5, 6]',
        '6'
      ],
      correctIndex: 1,
      explanation: 'm[2] truy xuất sublist ở vị trí bù thứ hai là [5, 6]. Thêm [0] sẽ lấy phần tử đầu tiên của sublist đó, tức là 5.'
    },
    {
      question: 'Phép cắt lát L[1:3] trên một list gồm 5 phần tử sẽ trả về kiểu dữ liệu nào?',
      options: [
        'Một tuple mới chứa 2 phần tử.',
        'Một list mới chứa 2 phần tử.',
        'Chính list L ban đầu bị thu hẹp tại chỗ còn 2 phần tử.',
        'Một iterator tạo giá trị theo nhu cầu.'
      ],
      correctIndex: 1,
      explanation: 'Phép cắt lát trên list luôn trả về một đối tượng List mới tinh chứa các phần tử trong phạm vi lát cắt.'
    }
  ],

  summary: [
    'Đánh chỉ mục trên List bắt đầu từ 0 đến len(L)-1; chỉ mục âm đếm ngược từ phải sang trái (-1 là cuối cùng).',
    'Cắt lát List luôn trả về một List mới chứa các phần tử trong khoảng [start:stop].',
    'Ma trận đa chiều có thể được xây dựng đơn giản trong Python bằng các sublist lồng nhau.',
    'Để truy xuất ô phần tử trong ma trận, ta xâu chuỗi các chỉ mục theo dạng matrix[hàng][cột].',
    'Nhờ cặp ngoặc vuông [], list có thể trải dài tự nhiên trên nhiều dòng văn bản mà không cần ký tự gạch chéo \\.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.4), chúng ta sẽ bước vào tính năng quyền năng nhất của List: Thay đổi List tại chỗ (In-Place) với phép gán chỉ mục và cơ chế gán lát cắt (Trích xuất, Xóa và Chèn).'
};