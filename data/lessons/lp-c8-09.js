export default {
  id: 'lp-c8-09',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.9',
  title: 'Duyệt lặp List: Toán tử in, Vòng lặp for & Hàm dựng sẵn range()',
  subtitle: 'Khám phá giao thức lặp tuần tự của List, kiểm tra thành viên với toán tử in, vòng lặp for và bộ sinh đếm số nguyên range()',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo toán tử quan hệ thành viên `in` và phủ định `not in` trên List với cú pháp tự nhiên như tiếng Anh.',
    'Sử dụng vòng lặp `for` để duyệt tuần tự qua từng phần tử của List từ trái sang phải.',
    'Nắm vững hàm dựng sẵn `range()` và cách ép kiểu `list(range(...))` để sinh danh sách các số nguyên liên tiếp.',
    'Hiểu khái niệm nền tảng về đối tượng có thể lặp (Iterable) và giao thức lặp (Iteration Protocol) trong Python.'
  ],

  intuition: {
    title: 'Điểm danh hàng quân và Chiếc máy đánh số tự động',
    metaphor: 'Hãy hình dung List như một hàng quân lính đang xếp ngay ngắn từ trái sang phải. Toán tử `in` giống như một viên sĩ quan điểm danh: anh ta cầm danh sách và quét nhanh từ đầu hàng đến cuối hàng xem có người lính số hiệu 3 ở đó không (`3 in [1, 2, 3]`), lập tức trả lời True hoặc False. Vòng lặp `for x in L:` giống như việc viên sĩ quan đi dọc theo hàng quân, dừng lại trước mặt từng người lính một để giao nhiệm vụ. Còn hàm `range(5)` giống như một chiếc máy dập số tự động: nó không in sẵn cả cuộn vé số tốn giấy mực, mà mỗi lần bạn nhấn nút (hoặc bọc vào `list()`), nó sẽ nhả ra lần lượt các số nguyên từ 0 đến N-1!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHU TRÌNH DUYỆT LẶP TUẦN TỰ (FOR ITERATION) TRÊN LIST</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;">
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:6px;text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);">Lần 1</span>
            <div style="font-weight:700;color:var(--accent-primary);font-size:1.1rem;">x = 1</div>
          </div>
          <span style="color:var(--accent-primary);font-weight:700;">➔</span>
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:6px;text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);">Lần 2</span>
            <div style="font-weight:700;color:var(--accent-primary);font-size:1.1rem;">x = 2</div>
          </div>
          <span style="color:var(--accent-primary);font-weight:700;">➔</span>
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:6px;text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);">Lần 3</span>
            <div style="font-weight:700;color:var(--accent-primary);font-size:1.1rem;">x = 3</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--text-secondary);">
          Duyệt tuần tự từ trái sang phải • Không cần quản lý biến đếm chỉ mục thủ công
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Kiểm tra Tư cách Thành viên với Toán tử in',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 12 / 42</strong>.</p>
          </div>
        </div>

        <p>List đáp ứng đầy đủ các thao tác trên dãy tuần tự (sequence) mà chúng ta đã từng áp dụng cho chuỗi trước đây, mở đầu bằng toán tử kiểm tra tư cách thành viên <strong><code>in</code></strong> và toán tử phủ định <strong><code>not in</code></strong>:</p>

        <ul>
          <li>Toán tử <code>x in L</code> quét qua danh sách và trả về <code>True</code> nếu tìm thấy bất kỳ phần tử nào bằng với <code>x</code>, ngược lại trả về <code>False</code>.</li>
          <li>Thao tác này rất dễ đọc và trực quan như một câu tiếng Anh tự nhiên.</li>
          <li><em>Độ phức tạp:</em> Vì list là dãy tuần tự, toán tử <code>in</code> thực hiện tìm kiếm tuyến tính từ trái sang phải, với chi phí trong trường hợp xấu nhất là <strong>O(N)</strong> (so với O(1) của dictionary và set).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra thành viên trên List với toán tử in và not in',
          code: `# Kiểm tra phần tử có mặt trong list
print("3 in [1, 2, 3]:    ", 3 in [1, 2, 3])
print("99 in [1, 2, 3]:   ", 99 in [1, 2, 3])

# Phủ định thành viên
print("'a' not in ['x', 'y']:", 'a' not in ['x', 'y'])

# Kiểm tra thành viên với sublist lồng nhau
nested = [1, [2, 3], 4]
print("2 in nested:       ", 2 in nested)
print("[2, 3] in nested:   ", [2, 3] in nested)`,
          output: `3 in [1, 2, 3]:     True
99 in [1, 2, 3]:    False
'a' not in ['x', 'y']: True
2 in nested:        False
[2, 3] in nested:    True`,
          annotations: [
            { line: 2, text: '3 in [1, 2, 3] trả về True.' },
            { line: 10, text: '2 in nested trả về False vì 2 nằm bên trong sublist chứ không phải phần tử trực tiếp của nested.' },
            { line: 11, text: '[2, 3] in nested trả về True vì sublist [2, 3] là một phần tử cấp ngoài cùng.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Vòng lặp for: Duyệt Tuần tự qua các Phần tử',
      content: `
        <p>Giống như mọi tập hợp trong Python, list là các <strong>đối tượng có thể lặp (iterable)</strong>. Chúng có thể được sử dụng trực tiếp với bộ công cụ lặp toàn diện của Python, nổi bật nhất là <strong>vòng lặp <code>for</code></strong>.</p>

        <p>Theo phần giới thiệu ở Chương 4 và sẽ được mở rộng bài bản trong Chương 13, vòng lặp <code>for</code> duyệt qua các phần tử trong bất kỳ sequence nào từ trái sang phải, tự động gán từng phần tử cho biến lặp và thực thi khối lệnh tương ứng. Bạn không cần phải khai báo biến chỉ mục đếm <code>i = 0, i++</code> thủ công như trong các ngôn ngữ C hay Java.</p>
      `,
      codeExamples: [
        {
          title: 'Duyệt lặp qua List bằng vòng lặp for và tham số end trong print',
          code: `# Duyệt lặp in các phần tử trên cùng một dòng
print("Các phần tử trong list: ", end="")
for x in [1, 2, 3]:
    print(x, end=" ")
print()

# Duyệt qua danh sách chuỗi và biến đổi
fruits = ['táo', 'chuối', 'cam']
for fruit in fruits:
    print(f"• Tôi thích ăn: {fruit.title()}")`,
          output: `Các phần tử trong list: 1 2 3 
• Tôi thích ăn: Táo
• Tôi thích ăn: Chuối
• Tôi thích ăn: Cam`,
          annotations: [
            { line: 3, text: 'Vòng lặp for lần lượt gán x = 1, x = 2, x = 3.' },
            { line: 4, text: 'Tham số end=" " ngăn print xuống dòng và in dấu cách giữa các số.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Hàm Dựng Sẵn range(): Bộ Sinh Đếm Số Nguyên',
      content: `
        <p>Vòng lặp <code>for</code> của list thường xuyên được sử dụng kết hợp với <strong>hàm dựng sẵn <code>range()</code></strong>:</p>

        <ul>
          <li><code>range(N)</code>: Sinh ra dãy số nguyên liên tiếp từ <code>0</code> đến trước <code>N</code> (tức <code>0...N-1</code>).</li>
          <li><code>range(start, stop, [step])</code>: Sinh số nguyên từ <code>start</code> đến trước <code>stop</code> với bước nhảy <code>step</code>.</li>
          <li><em>Đặc tính lười biếng (Lazy):</em> Trong Python 3, <code>range</code> là một đối tượng generator-like tiết kiệm bộ nhớ; nó không tạo ra một danh sách đầy đủ trong RAM. Để buộc nó nhả ra toàn bộ các giá trị nhằm hiển thị hoặc tạo list số, ta bọc nó vào hàm dựng sẵn <code>list()</code>: <code>list(range(5))</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng hàm range() và tạo danh sách số nguyên liên tiếp',
          code: `# Bộ sinh đếm 0...N-1 được ép kiểu bằng list()
nums = list(range(5))
print("list(range(5)):          ", nums)

# Dãy số nguyên có start và stop âm
neg_nums = list(range(-4, 4))
print("list(range(-4, 4)):       ", neg_nums)

# Dãy số chẵn với bước nhảy step = 2
even_nums = list(range(0, 10, 2))
print("list(range(0, 10, 2)):    ", even_nums)

# Ứng dụng duyệt list kèm chỉ số vị trí
items = ['first', 'second', 'third']
for i in range(len(items)):
    print(f"Vị trí bù {i}: {items[i]}")`,
          output: `list(range(5)):           [0, 1, 2, 3, 4]
list(range(-4, 4)):        [-4, -3, -2, -1, 0, 1, 2, 3]
list(range(0, 10, 2)):     [0, 2, 4, 6, 8]
Vị trí bù 0: first
Vị trí bù 1: second
Vị trí bù 2: third`,
          annotations: [
            { line: 2, text: 'list(range(5)) tạo ra list 5 số nguyên [0, 1, 2, 3, 4].' },
            { line: 6, text: 'range(-4, 4) tạo số nguyên từ -4 đến 3.' },
            { line: 14, text: 'Dùng range(len(items)) cho phép truy cập chỉ số và giá trị cùng lúc.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Ưu tiên enumerate() thay vì range(len(L)) trong mã Python chuẩn mực',
        content: 'Mặc dù cú pháp <code>for i in range(len(L)):</code> rất phổ biến, nhưng trong Python chuẩn mực, khi bạn cần cả chỉ số <code>i</code> lẫn phần tử <code>x</code>, hàm <code>enumerate(L)</code> (sẽ học kỹ ở Chương 13) là cách viết thanh lịch và tối ưu hơn.'
      }
    ],
    pitfalls: [
      {
        title: 'Cẩn thận khi sửa đổi List trong lúc đang duyệt vòng lặp for!',
        content: 'Tuyệt đối tránh việc thêm (`append`) hoặc xóa (`remove`) các phần tử của một danh sách ngay trong thân vòng lặp `for` đang duyệt chính danh sách đó. Bộ lặp nội bộ sẽ bị lệch chỉ mục dẫn đến việc bỏ sót phần tử hoặc lặp vô tận. Hãy duyệt qua một bản sao cắt lát `for x in L[:]:` nếu bạn cần sửa đổi `L`.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tính tổng các số chẵn trong danh sách bằng for và toán tử %',
      level: 'Dễ',
      problem: 'Cho danh sách số nguyên numbers = list(range(1, 11)). Hãy dùng vòng lặp for duyệt qua danh sách để tính tổng của tất cả các số chẵn (chia hết cho 2) và in ra kết quả.',
      hint: 'Khởi tạo total = 0. Trong vòng lặp, kiểm tra if x % 2 == 0: total += x.',
      solutionCode: `numbers = list(range(1, 11))

total_even = 0
for n in numbers:
    if n % 2 == 0:
        total_even += n

print("Danh sách các số:", numbers)
print("Tổng các số chẵn:", total_even)`,
      solutionOutput: `Danh sách các số: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Tổng các số chẵn: 30`,
      explanation: 'Các số chẵn gồm 2, 4, 6, 8, 10. Tổng của chúng là 2 + 4 + 6 + 8 + 10 = 30.'
    }
  ],

  quiz: [
    {
      question: 'Lệnh list(range(3, 8)) sẽ tạo ra danh sách nào sau đây trong Python?',
      options: [
        '[3, 4, 5, 6, 7, 8]',
        '[3, 4, 5, 6, 7]',
        '[0, 1, 2, 3, 4, 5, 6, 7]',
        '[4, 5, 6, 7, 8]'
      ],
      correctIndex: 1,
      explanation: 'Hàm range(start, stop) sinh số nguyên bắt đầu từ start (3) và dừng lại trước stop (8), do đó kết quả gồm [3, 4, 5, 6, 7].'
    },
    {
      question: 'Phát biểu nào sau đây đúng về cơ chế duyệt của vòng lặp for trên List?',
      options: [
        'Vòng lặp for duyệt ngẫu nhiên các phần tử trong list.',
        'Vòng lặp for bắt buộc phải có biến đếm i tăng dần thủ công.',
        'Vòng lặp for duyệt tuần tự từ trái sang phải theo thứ tự vị trí các phần tử của list.',
        'Vòng lặp for chỉ duyệt được danh sách chứa các số nguyên.'
      ],
      correctIndex: 2,
      explanation: 'Vòng lặp for sử dụng giao thức lặp (iteration protocol) để duyệt tuần tự từng phần tử từ trái sang phải của bất kỳ sequence nào.'
    }
  ],

  summary: [
    'Toán tử in và not in cho phép kiểm tra tư cách thành viên của phần tử trong List với cú pháp tự nhiên.',
    'Vòng lặp for duyệt tuần tự qua từng phần tử từ trái sang phải mà không cần quản lý biến đếm thủ công.',
    'Hàm dựng sẵn range() sinh ra dãy số nguyên liên tiếp theo nhu cầu mà không tốn nhiều bộ nhớ RAM.',
    'Dùng hàm dựng sẵn list(range(...)) để tạo ra một đối tượng List chứa các số nguyên phục vụ hiển thị hoặc lưu trữ.',
    'Tránh thêm hoặc xóa phần tử của List ngay trong lúc đang duyệt vòng lặp trên chính list đó.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.10), chúng ta sẽ bước vào công cụ quyền năng bậc nhất của Python: List Comprehension và hàm ánh xạ map().'
};