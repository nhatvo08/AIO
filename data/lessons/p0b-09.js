export default {
  id: 'p0b-09',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B2.2',
  title: '8 Mẫu thuật toán lặp kinh điển (Algorithmic Loop Patterns)',
  subtitle: 'Bộ cẩm nang mẫu hình tư duy: Counter, Accumulator, Flag, Min/Max, Swap, Input Validation, Traversal và Linear Search',
  level: 'Trung cấp',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nhận diện và áp dụng thành thạo 8 mẫu thuật toán lặp nền tảng xuất hiện trong 90% bài toán thực tế.',
    'Hiểu sâu bản chất gán khởi tạo đúng cho từng mẫu hình để tránh lỗi logic nghiêm trọng (như gán min = 0).',
    'Nắm vững cơ chế `for...else` độc đáo trong Python khi thực hiện tìm kiếm tuyến tính có dừng sớm.',
    'Nhìn một yêu cầu bài toán là lập tức phác thảo được sơ đồ tư duy tương ứng mà không phải băn khoăn.'
  ],

  intuition: {
    title: 'Bộ khuôn đúc bánh quy của người kỹ sư phần mềm',
    metaphor: 'Khi mới học lập trình, mỗi bài toán mới trông giống như một mê cung hoàn toàn xa lạ. Nhưng với một kỹ sư giàu kinh nghiệm, 90% bài toán xử lý dữ liệu thực chất chỉ là sự kết hợp khéo léo của các "khuôn mẫu" (design patterns) quen thuộc. Giống như người làm bánh chỉ có vài chiếc khuôn cơ bản (hình tròn, ngôi sao, trái tim, bông hoa) nhưng có thể làm ra hàng trăm loại bánh thơm ngon khác nhau bằng cách thay đổi nguyên liệu. 8 mẫu thuật toán lặp trong bài này chính là 8 chiếc khuôn đúc tư duy sắc bén nhất giúp bạn giải quyết hầu hết mọi logic phức tạp.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">8 KHUÔN MẪU THUẬT TOÁN LẶP NỀN TẢNG</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;">
          <div style="padding:8px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface);"><strong style="color:var(--accent-primary);">1. Counter</strong>: count += 1</div>
          <div style="padding:8px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface);"><strong style="color:var(--accent-primary);">2. Accumulator</strong>: total += x</div>
          <div style="padding:8px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface);"><strong style="color:var(--accent-primary);">3. Flag</strong>: found = True</div>
          <div style="padding:8px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface);"><strong style="color:var(--accent-primary);">4. Min / Max</strong>: if x > mx: mx = x</div>
          <div style="padding:8px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface);"><strong style="color:var(--accent-primary);">5. Swap</strong>: a, b = b, a</div>
          <div style="padding:8px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface);"><strong style="color:var(--accent-primary);">6. Validation</strong>: while not valid</div>
          <div style="padding:8px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface);"><strong style="color:var(--accent-primary);">7. Traversal</strong>: for item in list</div>
          <div style="padding:8px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface);"><strong style="color:var(--accent-primary);">8. Linear Search</strong>: break on match</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Mẫu 1 & 2: Biến đếm (Counter) và Biến tích lũy (Accumulator)',
      badge: 'Cơ bản',
      content: `
        <p>Hai mẫu này là nền móng của mọi phép thống kê. Dù rất quen thuộc, sự khác biệt bản chất giữa chúng nằm ở giá trị cộng dồn:</p>
        <ul>
          <li><strong>Counter (Đếm số lần):</strong> Cộng thêm một hằng số cố định (thường là <code>count += 1</code>) mỗi khi một sự kiện thỏa mãn.</li>
          <li><strong>Accumulator (Tích lũy giá trị):</strong> Cộng dồn chính giá trị biến động của phần tử (<code>total += value</code>).</li>
        </ul>
        <div style="margin:20px 0;display:flex;justify-content:center;">
          <svg viewBox="0 0 560 300" style="max-width:100%;height:auto;font-family:var(--font-mono);font-size:12px;" role="img" aria-label="Sơ đồ Counter và Accumulator">
            <defs>
              <marker id="arrow-b2-2a" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--text-muted)" />
              </marker>
            </defs>
            <!-- Khởi tạo -->
            <rect x="180" y="20" width="200" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="280" y="45" fill="var(--text-primary)" text-anchor="middle" font-weight="bold">count = 0, total = 0</text>
            <path d="M 280 60 L 280 95" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-2a)"/>

            <!-- Điều kiện lặp -->
            <polygon points="280,100 370,140 280,180 190,140" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="2"/>
            <text x="280" y="144" fill="var(--text-primary)" text-anchor="middle" font-size="11">Còn phần tử x?</text>
            
            <!-- Nhánh Đúng -->
            <path d="M 280 180 L 280 215" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-2a)"/>
            <text x="290" y="200" fill="var(--accent-primary)" font-weight="bold">Đúng</text>

            <!-- Cập nhật -->
            <rect x="160" y="220" width="240" height="50" rx="4" fill="var(--bg-surface)" stroke="var(--py-gold)" stroke-width="2"/>
            <text x="280" y="240" fill="var(--text-primary)" text-anchor="middle">count += 1 (Counter)</text>
            <text x="280" y="258" fill="var(--text-primary)" text-anchor="middle">total += x (Accumulator)</text>

            <!-- Vòng lặp quay lại -->
            <path d="M 160 245 L 120 245 L 120 140 L 185 140" fill="none" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-2a)"/>

            <!-- Nhánh Sai -->
            <path d="M 370 140 L 440 140" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-2a)"/>
            <text x="390" y="132" fill="var(--danger-text)" font-weight="bold">Sai</text>
            <rect x="445" y="120" width="100" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="2"/>
            <text x="495" y="145" fill="var(--text-primary)" text-anchor="middle" font-size="11">Xuất kết quả</text>
          </svg>
        </div>
      `,
      codeExamples: [
        {
          title: 'Đếm số chẵn và tính tổng số chẵn trong danh sách',
          code: `numbers = [4, 7, 2, 9, 12, 15, 8]

even_count = 0      # Khởi tạo Counter
even_sum = 0        # Khởi tạo Accumulator

for num in numbers:
    if num % 2 == 0:
        even_count += 1
        even_sum += num

print(f"Số lượng số chẵn: {even_count}")  # 4
print(f"Tổng các số chẵn: {even_sum}")    # 4 + 2 + 12 + 8 = 26`
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Mẫu 3: Cờ hiệu (Flag / Boolean Sentinel)',
      badge: 'Cơ chế Boolean',
      content: `
        <p>Mẫu <strong>Flag</strong> sử dụng một biến kiểu <code>bool</code> (thường ban đầu đặt là <code>False</code> hoặc <code>True</code>) để ghi nhớ trạng thái: <em>"Đã có sự kiện nào đó từng xảy ra hay chưa?"</em></p>
        <p>Ví dụ: Kiểm tra xem một danh sách sinh viên có bất kỳ ai bị điểm liệt (&lt; 4.0) hay không.</p>
        <div class="callout-box callout-pitfall">
          <strong>Lưu ý chí mạng:</strong> Đừng bao giờ đặt lại cờ hiệu <code>has_failed = False</code> bên trong vòng lặp nếu không có lý do! Khi đã bắt được lỗi (chuyển cờ sang <code>True</code>), cờ phải được giữ nguyên trạng thái hoặc thoát vòng lặp ngay lập tức (dùng <code>break</code>).
        </div>
      `,
      codeExamples: [
        {
          title: 'Mẫu Flag phát hiện sự tồn tại',
          code: `scores = [8.5, 7.0, 3.5, 9.0, 6.5]
has_failed = False   # Cờ hiệu ban đầu: giả định chưa ai trượt

for s in scores:
    if s < 4.0:
        has_failed = True
        break        # Tối ưu: tìm thấy 1 người là đủ kết luận, dừng ngay

if has_failed:
    print("Cảnh báo: Lớp có học viên điểm liệt!")
else:
    print("Chúc mừng: Toàn bộ lớp đều đạt chuẩn!")`
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Mẫu 4: Tìm Cực trị Min / Max và Cạm bẫy khởi tạo giá trị',
      badge: 'Cạm bẫy logic',
      content: `
        <p>Để tìm phần tử lớn nhất (Max) hoặc nhỏ nhất (Min), ta so sánh từng phần tử với giá trị kỷ lục hiện tại. Nếu phần tử mới phá kỷ lục, ta cập nhật kỷ lục mới.</p>
        <h4>Sai lầm kinh điển: Gán giá trị khởi tạo bằng 0</h4>
        <pre><code class="language-python"># CẠM BẪY CHẾT NGƯỜI:
max_val = 0
numbers = [-50, -20, -5, -100]
for x in numbers:
    if x > max_val:
        max_val = x
print(max_val)  # IN RA 0! SAI HOÀN TOÀN vì danh sách toàn số âm!</code></pre>
        <p><strong>Giải pháp chuẩn mực:</strong> Luôn khởi tạo <code>max_val = numbers[0]</code> (lấy chính phần tử đầu tiên của tập dữ liệu làm mốc ban đầu) hoặc dùng <code>float('-inf')</code> / <code>float('inf')</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Mẫu Min/Max chuẩn xác 100%',
          code: `temperatures = [-15, -8, -22, -5, -12]

# Khởi tạo bằng phần tử đầu tiên
max_temp = temperatures[0]
min_temp = temperatures[0]

for t in temperatures[1:]:  # Duyệt từ phần tử thứ 2 trở đi
    if t > max_temp:
        max_temp = t
    if t < min_temp:
        min_temp = t

print(f"Nhiệt độ cao nhất: {max_temp}°C")  # -5°C
print(f"Nhiệt độ thấp nhất: {min_temp}°C")  # -22°C`
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Mẫu 5: Hoán đổi hai biến (Swap)',
      badge: 'Thao tác bộ nhớ',
      content: `
        <p>Trong các ngôn ngữ truyền thống như C/C++/Java, để tráo giá trị của hai biến <code>a</code> và <code>b</code>, ta bắt buộc phải dùng một biến phụ tạm thời <code>temp</code> giống như chuyển nước giữa hai cốc cần có cốc thứ ba.</p>
        <p>Trong Python, cú pháp <strong>Tuple Unpacking</strong> cho phép hoán đổi cực kỳ thanh lịch trên một dòng duy nhất: <code>a, b = b, a</code>.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh hoán đổi truyền thống và Pythonic',
          code: `# Cách cổ điển (dùng biến tạm temp):
a = 10
b = 20
temp = a
a = b
b = temp
print(f"Cổ điển: a={a}, b={b}")

# Cách Pythonic chuẩn mực:
x = "Cốc Trà"
y = "Cốc Cà phê"
x, y = y, x  # Đánh giá vế phải tạo thành tuple (y, x), sau đó gán ngược vào vế trái
print(f"Pythonic: x='{x}', y='{y}'")`
        }
      ]
    },
    {
      id: 'sec-5',
      title: 'Mẫu 6: Vòng lặp kiểm tra tính hợp lệ đầu vào (Input Validation)',
      badge: 'Phòng vệ',
      content: `
        <p>Đây là ứng dụng điển hình nhất của vòng lặp <strong>Post-test</strong> (lặp ít nhất 1 lần để người dùng nhập, nếu nhập sai thì bắt nhập lại đến khi nào đúng mới cho đi tiếp).</p>
        <p>Khuôn mẫu này kết hợp <code>while True</code>, <code>try...except</code> và lệnh <code>break</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Khuôn mẫu chuẩn ép nhập số nguyên dương',
          code: `while True:
    try:
        user_input = input("Nhập tuổi của bạn (1 - 120): ")
        age = int(user_input)
        if 1 <= age <= 120:
            break  # Nhập chuẩn xác -> Thoát vòng lặp!
        print("Lỗi: Tuổi phải nằm trong khoảng từ 1 đến 120. Vui lòng nhập lại!")
    except ValueError:
        print("Lỗi: Bạn phải nhập một số nguyên hợp lệ!")

print(f"Xác nhận tuổi của bạn: {age}")`
        }
      ]
    },
    {
      id: 'sec-6',
      title: 'Mẫu 7 & 8: Duyệt danh sách (Traversal) và Tìm kiếm tuyến tính (Linear Search)',
      badge: 'Tìm kiếm & Duyệt',
      content: `
        <p>Tìm kiếm tuyến tính (Linear Search) là thuật toán duyệt tuần tự từ đầu đến cuối danh sách để tìm một giá trị mục tiêu (target). Nếu tìm thấy, ta dừng ngay lập tức (early exit với <code>break</code>).</p>
        <h4>Tuyệt kỹ Python: <code>for...else</code></h4>
        <p>Trong Python, khối <code>for</code> có thể đi kèm một khối <code>else</code>. Khối <code>else</code> này chỉ được kích hoạt khi vòng lặp <code>for</code> chạy hết trọn vẹn mà <strong>không bị ngắt bởi lệnh <code>break</code></strong>!</p>
      `,
      codeExamples: [
        {
          title: 'Tìm kiếm tuyến tính với for...else',
          code: `users = ["alice", "bob", "charlie", "david"]
target = "bob"

for index, name in enumerate(users):
    if name == target:
        print(f"Tìm thấy '{target}' tại vị trí chỉ số {index}!")
        break
else:
    # Chỉ chạy khi vòng lặp for duyệt hết danh sách mà không gặp break
    print(f"Không tìm thấy '{target}' trong hệ thống!")`
        }
      ]
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Lời khuyên từ giảng viên',
      content: 'Mỗi khi đứng trước một bài toán mới, hãy tự hỏi: "Bài này cần đếm (Counter)? Cần tính tổng (Accumulator)? Cần tìm có hay không (Flag)? Hay cần tìm phần tử vô địch (Min/Max)?". Nhận diện đúng mẫu là bạn đã giải quyết xong 80% độ khó của bài toán.'
    },
    {
      type: 'warning',
      title: 'Cạm bẫy for...else',
      content: 'Nhiều người mới học nhầm lẫn khối `else` của vòng lặp `for` với `else` của câu lệnh `if`. Khối `else` của vòng lặp nằm thụt lề ngang hàng với chữ `for`, và nó đại diện cho kịch bản: "Vòng lặp hoàn thành trọn vẹn từ đầu đến cuối một cách tự nhiên mà không bị ngắt giữa chừng".'
    }
  ],

  exercises: [
    {
      title: 'Bài tập 1: Thống kê nhiệt độ tuần',
      description: 'Cho danh sách nhiệt độ đo được trong 7 ngày: `temps = [28, 31, 26, 35, 29, 32, 27]`. Hãy áp dụng các mẫu thuật toán lặp để tính: nhiệt độ trung bình của tuần, nhiệt độ cao nhất, và đếm xem có bao nhiêu ngày nhiệt độ vượt quá 30°C.',
      initialCode: `temps = [28, 31, 26, 35, 29, 32, 27]

# Viết code của bạn ở đây:
# 1. Tính tổng và trung bình (Accumulator)
# 2. Tìm max (Max pattern)
# 3. Đếm số ngày > 30 (Counter)
`,
      solution: `temps = [28, 31, 26, 35, 29, 32, 27]

total = 0
max_temp = temps[0]
hot_days_count = 0

for t in temps:
    total += t
    if t > max_temp:
        max_temp = t
    if t > 30:
        hot_days_count += 1

avg_temp = total / len(temps)

print(f"Nhiệt độ TB: {avg_temp:.2f}°C")
print(f"Nhiệt độ cao nhất: {max_temp}°C")
print(f"Số ngày nóng (>30°C): {hot_days_count} ngày")`
    }
  ],

  quiz: [
    {
      question: 'Tại sao việc khởi tạo biến `min_val = 0` khi tìm giá trị nhỏ nhất của mảng `[-10, -5, -20]` lại là một lỗi logic nghiêm trọng?',
      options: [
        'Vì Python không cho phép gán số âm cho biến nguyên.',
        'Vì 0 lớn hơn mọi phần tử trong danh sách, nên điều kiện `x < min_val` không bao giờ thỏa mãn, dẫn đến kết quả sai là 0.',
        'Vì biến min_val bắt buộc phải là kiểu float.',
        'Vì mảng không có phần tử 0 thì không được khởi tạo bằng 0.'
      ],
      correctIndex: 1,
      explanation: 'Khi danh sách toàn số âm, nếu khởi tạo `min_val = 0`, thì số 0 vô tình trở thành giá trị nhỏ nhất ảo mà không có số âm nào phá được kỷ lục của nó. Kết quả trả về sẽ là 0 (hoàn toàn không có trong danh sách). Cách chuẩn là gán `min_val = numbers[0]`.'
    },
    {
      question: 'Trong Python, khối `else` gắn liền với vòng lặp `for` sẽ chạy khi nào?',
      options: [
        'Chạy sau mỗi lần lặp của vòng for.',
        'Chỉ chạy khi danh sách rỗng.',
        'Chỉ chạy khi vòng lặp duyệt hết toàn bộ danh sách bình thường mà không bị ngắt bởi lệnh `break`.',
        'Chỉ chạy khi lệnh `break` được thực thi.'
      ],
      correctIndex: 2,
      explanation: 'Khối `for...else` trong Python có cơ chế đặc biệt: phần `else` chỉ được thực thi khi vòng lặp kết thúc tự nhiên (không gặp lệnh `break`). Nếu bị `break` ngắt, phần `else` sẽ bị bỏ qua.'
    }
  ],

  summary: '8 mẫu thuật toán lặp (Counter, Accumulator, Flag, Min/Max, Swap, Input Validation, Traversal, Linear Search) là các khối xếp hình logic cốt lõi. Hiểu sâu bản chất gán giá trị khởi tạo và cơ chế kết thúc của từng mẫu giúp bạn viết code không bao giờ mắc lỗi ngớ ngẩn.'
};
