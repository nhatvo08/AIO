export default {
  id: 'p0b-21',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B3.6',
  title: 'Đệ quy trong Flowchart và Call Stack (Recursion vs Iteration)',
  subtitle: 'Giải mã hiện tượng tự gọi chính mình: Ký hiệu sơ đồ con tự thân, cơ chế Call Stack bộ nhớ, nguy cơ tràn ngăn xếp và kỹ thuật khử đệ quy',
  level: 'Chuyên sâu',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Biết cách biểu diễn hàm Đệ quy (Recursion) chuẩn xác trên Flowchart bằng ký hiệu Predefined Process tự quy chiếu.',
    'Hiểu sâu bản chất vật lý của Call Stack trong bộ nhớ RAM và nguyên nhân gây lỗi kinh hoàng RecursionError.',
    'Phân biệt rõ ràng sự khác nhau giữa Vòng lặp lặp tại chỗ (Iteration) và Đệ quy sinh khung ngăn xếp mới.',
    'Thành thạo kỹ thuật chuyển đổi (Khử đệ quy) từ đệ quy ngây thơ sang vòng lặp tối ưu O(n) qua bài toán Fibonacci.'
  ],

  intuition: {
    title: 'Búp bê Nga Matryoshka và Chồng đĩa thức ăn trong bếp',
    metaphor: 'Đệ quy giống như bộ búp bê gỗ Matryoshka nổi tiếng của Nga: bạn mở búp bê lớn nhất ra, bên trong là một búp bê giống hệt nhưng nhỏ hơn một chút; bạn mở tiếp cho đến khi chạm tới con búp bê nhỏ nhất bằng gỗ đặc không thể mở được nữa (Trường hợp cơ sở - Base Case). Nhưng trong máy tính, mỗi lần bạn mở một con búp bê, máy tính phải đặt một chiếc đĩa mới lên "Chồng đĩa ngăn xếp" (Call Stack) trong bộ nhớ RAM. Nếu bạn quên làm búp bê lõi đặc (quên Base Case) hoặc bộ búp bê có hơn 1000 lớp, chồng đĩa sẽ cao chót vót chạm trần nhà và đổ sập tan tành (Stack Overflow)!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">CƠ CHẾ NGĂN XẾP GỌI HÀM (CALL STACK) CỦA ĐỆ QUY</div>
        <div style="display:flex;flex-direction:column-reverse;gap:6px;max-width:280px;margin:0 auto;width:100%;">
          <div style="padding:6px;border:1px solid var(--accent-primary);border-radius:4px;background:var(--bg-surface);text-align:center;"><strong>factorial(1)</strong> ➔ return 1 (Base Case)</div>
          <div style="padding:6px;border:1px solid var(--accent-primary);border-radius:4px;background:var(--bg-surface);text-align:center;"><strong>factorial(2)</strong> ➔ chờ factorial(1)</div>
          <div style="padding:6px;border:1px solid var(--accent-primary);border-radius:4px;background:var(--bg-surface);text-align:center;"><strong>factorial(3)</strong> ➔ chờ factorial(2)</div>
          <div style="padding:6px;border:2px solid var(--py-gold);border-radius:4px;background:var(--bg-surface);text-align:center;"><strong>factorial(4)</strong> ➔ gọi đầu tiên (Đáy Stack)</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Cấu trúc giải phẫu của Hàm Đệ quy',
      badge: 'Cơ chế giải thuật',
      content: `
        <details class="deep-dive-details" open style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:16px;">
          <summary style="cursor:pointer;font-weight:bold;color:var(--accent-primary);">Thu gọn / Mở rộng kiến thức Chuyên sâu Tầng 3</summary>
          <div style="margin-top:12px;">
            <p>Bất kỳ một hàm đệ quy hợp lệ nào cũng bắt buộc phải gồm hai thành phần sống còn:</p>
            <ol>
              <li><strong>Trường hợp cơ sở (Base Case):</strong> Điều kiện dừng mà tại đó hàm trả về kết quả ngay lập tức bằng giá trị cụ thể, tuyệt đối <em>không</em> gọi đệ quy nữa.</li>
              <li><strong>Bước đệ quy (Recursive Step):</strong> Thu nhỏ quy mô bài toán ($n - 1$, $n // 2$) và gọi lại chính hàm đó, bảo đảm sau mỗi bước khoảng cách tới Base Case ngày một ngắn lại.</li>
            </ol>
            <p>Trên Flowchart, Đệ quy được vẽ bằng ký hiệu Predefined Process (hình chữ nhật có 2 vạch dọc đôi) nhưng bên trong mang tên của chính hàm đó!</p>
          </div>
        </details>
      `
    },
    {
      id: 'sec-2',
      title: 'Call Stack bộ nhớ và Lỗi RecursionError trong Python',
      badge: 'Kiến trúc máy tính',
      content: `
        <p>Khác biệt căn bản giữa <strong>Vòng lặp (Loop)</strong> và <strong>Đệ quy (Recursion)</strong>:</p>
        <ul>
          <li><strong>Vòng lặp:</strong> Tái sử dụng cùng một vùng nhớ cố định của các biến ($O(1)$ không gian nhớ).</li>
          <li><strong>Đệ quy:</strong> Mỗi lần gọi hàm, hệ điều hành cấp phát một <strong>Khung ngăn xếp mới (Stack Frame)</strong> lưu các tham số và địa chỉ quay về ($O(n)$ bộ nhớ).</li>
        </ul>
        <p>Python mặc định giới hạn độ sâu đệ quy là 1000 lần gọi (để bảo vệ bộ nhớ không bị sập hoàn toàn). Nếu vượt quá, Python sẽ ném ngoại lệ <code>RecursionError: maximum recursion depth exceeded</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra giới hạn đệ quy trong Python 3.14',
          code: `import sys

print("Giới hạn đệ quy mặc định của Python:", sys.getrecursionlimit())

def infinite_recursion(depth):
    # Hàm quên không viết Base Case -> Lỗi tràn ngăn xếp!
    return infinite_recursion(depth + 1)

try:
    infinite_recursion(1)
except RecursionError as e:
    print("Bắt được ngoại lệ bảo vệ bộ nhớ:", e)`
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Chuyển đổi Đệ quy thành Lặp: Thảm họa Fibonacci O(2ⁿ)',
      badge: 'Khử đệ quy',
      content: `
        <p>Hàm tính số Fibonacci đệ quy kinh điển $F(n) = F(n-1) + F(n-2)$ là ví dụ đau đớn nhất về sự lãng phí tài nguyên máy tính:</p>
        <p>Để tính $F(40)$, thuật toán đệ quy ngây thơ tính toán lại $F(2)$ hơn 60 triệu lần! Thời gian chạy bùng nổ theo hàm mũ $O(2^n)$. Nhưng chỉ cần chuyển sang <strong>Vòng lặp (Iteration)</strong> với 2 biến tạm, thời gian chạy giảm về $O(n)$ tức thì!</p>
      `,
      codeExamples: [
        {
          title: 'So sánh Đệ quy ngây thơ và Vòng lặp tối ưu',
          code: `# CÁCH 1: Đệ quy ngây thơ O(2^n) - Cực chậm khi n > 35
def fib_recursive(n):
    if n <= 1:
        return n
    return fib_recursive(n - 1) + fib_recursive(n - 2)

# CÁCH 2: Khử đệ quy bằng Vòng lặp O(n) và bộ nhớ O(1) - Chạy tức thì!
def fib_iterative(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print("F(10) =", fib_iterative(10))  # 55
print("F(50) =", fib_iterative(50))  # 12586269025 (Chạy chưa tới 1 mili-giây!)`
        }
      ]
    }
  ],

  callouts: [
    {
      type: 'important',
      title: 'Khi nào nên dùng Đệ quy?',
      content: 'Hãy dùng đệ quy khi cấu trúc dữ liệu bản thân nó có tính chất đệ quy tự nhiên: duyệt Cây thư mục (Directory Tree), duyệt Cấu trúc DOM HTML, duyệt cây nhị phân (Binary Search Tree), hoặc các thuật toán chia để trị kinh điển như QuickSort, MergeSort.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Viết hàm tính lũy thừa aⁿ bằng đệ quy và lặp',
      description: 'Viết hai hàm `power_rec(a, n)` và `power_iter(a, n)` để tính $a^n$ (với $n \\ge 0$). Kiểm tra xem cả hai hàm có cho ra cùng kết quả hay không.',
      initialCode: `def power_rec(a, n):
    # Viết đệ quy:
    pass

def power_iter(a, n):
    # Viết vòng lặp:
    pass
`,
      solution: `def power_rec(a, n):
    if n == 0:
        return 1
    return a * power_rec(a, n - 1)

def power_iter(a, n):
    res = 1
    for _ in range(n):
        res *= a
    return res

assert power_rec(2, 10) == 1024
assert power_iter(2, 10) == 1024
print("Cả hai phương pháp đều tính chính xác 2^10 = 1024!")`
    }
  ],

  quiz: [
    {
      question: 'Tại sao việc gọi hàm đệ quy không có Base Case lại gây ra lỗi RecursionError / Stack Overflow?',
      options: [
        'Vì ổ cứng bị đầy dữ liệu.',
        'Vì mỗi lần gọi hàm, máy tính phải cấp phát một Stack Frame mới trên Call Stack trong RAM, khiến vùng nhớ ngăn xếp bị cạn kiệt.',
        'Vì Python không hỗ trợ toán tử cộng trong hàm.',
        'Vì CPU bị quá nhiệt.'
      ],
      correctIndex: 1,
      explanation: 'Mỗi lời gọi hàm đòi hỏi lưu trữ các biến cục bộ và con trỏ lệnh vào vùng nhớ Call Stack. Không có Base Case thì các khung ngăn xếp liên tục chồng chất cho tới khi vượt giới hạn an toàn của máy tính.'
    }
  ],

  summary: 'Đệ quy là công cụ thanh lịch để giải quyết các bài toán phân rã tự nhiên. Hiểu rõ Call Stack và rủi ro bùng nổ tài nguyên giúp kỹ sư biết khi nào nên tận dụng vẻ đẹp của đệ quy và khi nào cần khử đệ quy thành vòng lặp để đạt hiệu năng tối đa.'
};
