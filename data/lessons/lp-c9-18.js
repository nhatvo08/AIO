export default {
  id: 'lp-c9-18',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.18',
  title: 'Kiểm tra kiến thức Phần II (Bài 8, 9): Đánh chỉ mục chuỗi đệ quy & Kỹ thuật chuyển đổi kiểu bất biến',
  subtitle: 'Giải mã bí mật "ký tự là chuỗi 1 phần tử", hiện tượng đánh chỉ mục vô tận S[0][0][0], và các phương pháp cập nhật đối tượng bất biến chuẩn mực',
  level: 'Cơ bản đến Nâng cao',
  duration: '40 phút',
  isNew314: false,
  readings: [
    {
      title: 'Learning Python, 6th Edition — Chương 9: Kiểm tra kiến thức: Bài tập Phần II (Bài 8, 9)',
      author: 'Mark Lutz',
      pages: 'Trang 47 / 48 (Bản dịch tiếng Việt)'
    },
    {
      title: 'Learning Python, 6th Edition — Phụ lục B: Đáp án bài tập Phần II (Đối tượng và Thao tác)',
      author: 'Mark Lutz',
      pages: 'Trang 1164–1166 (Bản gốc tiếng Anh)'
    }
  ],
  objectives: [
    'Giải thích tại sao Python không có kiểu char riêng biệt và hệ quả dẫn tới hiện tượng đánh chỉ mục chuỗi đệ quy vô tận S[0][0][0][0][0].',
    'So sánh hành vi đánh chỉ mục nhiều cấp giữa danh sách chứa chuỗi và danh sách chứa số nguyên.',
    'Hiểu nguyên nhân cốt lõi tại sao phép gán chỉ mục S[1] = \'e\' thất bại với lỗi TypeError: \'str\' object does not support item assignment.',
    'Thành thạo hai kỹ thuật sửa đổi chuỗi bất biến chuẩn mực của Mark Lutz: (1) Cắt lát và ghép nối; (2) Đánh chỉ mục và ghép nối.',
    'Mở rộng các phương pháp cập nhật chuỗi hiện đại trong Python: phương thức .replace() và kỹ thuật list-join chuyển đổi trung gian.'
  ],
  sections: [
    {
      id: 'sec-1',
      title: '1. Bài tập 8: Đánh Chỉ Mục Chuỗi Đệ Quy (Recursive String Indexing)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz (Trang 47 / 48)</span>
          </div>
          <div class="callout-body">
            <p>Định nghĩa chuỗi 4 ký tự: <code>S = 'hack'</code>. Sau đó gõ biểu thức sau:</p>
            <pre><code class="language-python">&gt;&gt;&gt; S[0][0][0][0][0]
'h'</code></pre>
          </div>
        </div>

        <p><strong>Bản chất thiết kế: Python không có kiểu Char riêng biệt!</strong></p>
        <p>Trong C, C++ hay Java, một chuỗi gồm nhiều phần tử ký tự nguyên thủy kiểu <code>char</code>. Trong Python thì khác:</p>
        <ul>
          <li><strong>Mọi ký tự đơn lẻ thực chất là một đối tượng chuỗi (<code>str</code>) có độ dài bằng 1</strong>.</li>
          <li>Khi bạn gọi <code>S[0]</code>, Python trả về chuỗi <code>'h'</code>.</li>
          <li>Vì <code>'h'</code> vẫn là một chuỗi <code>str</code> đầy đủ tính năng, nó lại hỗ trợ phép đánh chỉ mục <code>'h'[0]</code>, tiếp tục trả về chuỗi <code>'h'</code>!</li>
          <li>Do đó, bạn có thể viết <code>S[0][0][0]...[0]</code> bao nhiêu lần tùy thích, kết quả vẫn luôn là <code>'h'</code>!</li>
        </ul>

        <p><strong>Áp dụng lên danh sách (List):</strong></p>
        <ul>
          <li>Với <code>L = ['h', 'a', 'c', 'k']</code>: Biểu thức <code>L[0][0][0][0][0]</code> <em>vẫn hoạt động hoàn hảo</em> vì <code>L[0]</code> trả về chuỗi <code>'h'</code>, và chuỗi này tiếp tục được đánh chỉ mục đệ quy.</li>
          <li>Với <code>L = [1, 2, 3]</code>: Biểu thức <code>L[0][0]</code> sẽ <em>ném lỗi TypeError</em> vì <code>L[0]</code> trả về số nguyên <code>1</code>. Số học là kiểu vô hướng (scalar), không phải dãy tuần tự nên không thể đánh chỉ mục (<code>'int' object is not subscriptable</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 8: Đánh chỉ mục chuỗi đệ quy trên Chuỗi và Danh sách',
          code: `S = 'hack'

# Đánh chỉ mục liên hoàn 5 cấp
print("S[0][0][0][0][0] =", repr(S[0][0][0][0][0]))
print("Kiểu của S[0]:", type(S[0]).__name__)

# Thử nghiệm trên List chứa ký tự
L_chars = ['h', 'a', 'c', 'k']
print("L_chars[0][0][0] =", repr(L_chars[0][0][0]))

# Thử nghiệm trên List chứa số nguyên
L_ints = [1, 2, 3]
try:
    print(L_ints[0][0])
except TypeError as e:
    print("L_ints[0][0] ném lỗi:", type(e).__name__, "-", e)`,
          output: `S[0][0][0][0][0] = 'h'
Kiểu của S[0]: str
L_chars[0][0][0] = 'h'
L_ints[0][0] ném lỗi: TypeError - 'int' object is not subscriptable`
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bài tập 9: Kỹ Thuật Biến Đổi Các Kiểu Bất Biến (Immutable Types)',
      content: `
        <p>Cho chuỗi <code>S = 'hack'</code>. Mục tiêu là biến đổi nội dung của nó thành <code>'heck'</code>.</p>

        <p><strong>1. Phép gán chỉ mục tại chỗ: Thất bại!</strong></p>
        <p>Câu lệnh <code>S[1] = 'e'</code> ngay lập tức bị Python từ chối với lỗi <code>TypeError: 'str' object does not support item assignment</code>. Chuỗi là kiểu dữ liệu bất biến (immutable), không bao giờ có thể ghi đè nội dung ô nhớ tại chỗ sau khi đã khởi tạo.</p>

        <p><strong>2. Kỹ thuật 1: Cắt lát và Ghép nối (Slicing and Concatenation)</strong></p>
        <p>Đây là giải pháp chuẩn tắc và thanh lịch nhất của Mark Lutz:</p>
        <pre><code class="language-python">&gt;&gt;&gt; S = S[0] + 'e' + S[2:]
&gt;&gt;&gt; S
'heck'</code></pre>
        <p><code>S[0]</code> lấy <code>'h'</code>, <code>S[2:]</code> lấy <code>'ck'</code>. Biểu thức ghép nối tạo ra một chuỗi mới tinh và gán lại cho biến <code>S</code>.</p>

        <p><strong>3. Kỹ thuật 2: Đánh chỉ mục và Ghép nối (Indexing and Concatenation)</strong></p>
        <p>Trích xuất từng ký tự lẻ phía sau:</p>
        <pre><code class="language-python">&gt;&gt;&gt; S = 'hack'
&gt;&gt;&gt; S = S[0] + 'e' + S[2] + S[3]
&gt;&gt;&gt; S
'heck'</code></pre>

        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-top:15px;">
          <div class="callout-header">
            <span>💡</span>
            <span><strong>Mở rộng:</strong> Các giải pháp thay thế phổ biến trong thực tế</span>
          </div>
          <div class="callout-body">
            <ul>
              <li><strong>Dùng phương thức <code>replace()</code>:</strong> <code>S = S.replace('a', 'e')</code> trực quan và dễ đọc.</li>
              <li><strong>Chuyển sang List khả biến:</strong> <code>L = list(S); L[1] = 'e'; S = ''.join(L)</code> cực kỳ hữu dụng khi bạn cần biến đổi nhiều ký tự phức tạp trong chuỗi dài.</li>
            </ul>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 9: So sánh các phương pháp biến đổi chuỗi bất biến',
          code: `S = 'hack'

# 1. Thử thay đổi tại chỗ
try:
    S[1] = 'e'
except TypeError as e:
    print("S[1] = 'e' ném lỗi:", type(e).__name__, "-", e)

# 2. Phương pháp 1: Cắt lát và ghép nối
S1 = S[0] + 'e' + S[2:]
print("Cách 1 (Slicing + Concat):", S1)

# 3. Phương pháp 2: Đánh chỉ mục và ghép nối
S2 = S[0] + 'e' + S[2] + S[3]
print("Cách 2 (Indexing + Concat):", S2)

# 4. Phương thức replace()
S3 = S.replace('a', 'e')
print("Cách 3 (replace):         ", S3)

# 5. Chuyển sang List rồi join()
L = list(S)
L[1] = 'e'
S4 = ''.join(L)
print("Cách 4 (list + join):      ", S4)`,
          output: `S[1] = 'e' ném lỗi: TypeError - 'str' object does not support item assignment
Cách 1 (Slicing + Concat): heck
Cách 2 (Indexing + Concat): heck
Cách 3 (replace):          heck
Cách 4 (list + join):       heck`
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Hiệu năng khi ghép nối chuỗi trong vòng lặp',
        content: 'Vì chuỗi là bất biến, việc dùng phép cộng dồn S += char trong vòng lặp lớn sẽ tạo ra hàng nghìn chuỗi tạm thời trong bộ nhớ. Thay vào đó, hãy gom các phần tử vào một danh sách rồi dùng chuỗi rỗng \'\'.join(L) để đạt hiệu năng O(N) tối ưu.'
      }
    ],
    tips: [
      {
        title: 'Tại sao Python chọn không có kiểu char riêng?',
        content: 'Việc xem mọi ký tự là chuỗi 1 phần tử giúp hệ thống kiểu của Python trở nên đơn giản, nhất quán và trực quan: tất cả phương thức chuỗi (upper, find, isdigit...) đều có thể gọi trực tiếp trên từng ký tự mà không cần ép kiểu hay bao bọc đặc biệt.'
      }
    ]
  },
  quiz: [
    {
      question: 'Tại sao biểu thức S[0][0][0][0][0] trên chuỗi S = \'hack\' lại trả về kết quả \'h\' mà không báo lỗi cú pháp hay giới hạn?',
      options: [
        'Vì trình thông dịch Python tự động bỏ qua các chỉ số [0] dư thừa.',
        'Vì Python không có kiểu char; ký tự là chuỗi độ dài 1, nên thao tác đánh chỉ mục [0] trên chuỗi độ dài 1 tiếp tục trả về chính chuỗi đó vô tận.',
        'Vì chuỗi được lưu trữ dưới dạng mảng 5 chiều trong bộ nhớ CPython.',
        'Vì S[0] trả về con trỏ địa chỉ của chuỗi trong RAM.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, một ký tự đơn chỉ là một chuỗi str có len() bằng 1. Vì nó là một chuỗi, nó hỗ trợ indexing [0], trả về chính chuỗi độ dài 1 đó, cho phép đánh chỉ mục đệ quy liên tục.'
    },
    {
      question: 'Nếu áp dụng L[0][0] trên list L = [42, 99], điều gì sẽ xảy ra?',
      options: [
        'Python trả về số 42.',
        'Python trả về chữ số đầu tiên là 4.',
        'Python ném ngoại lệ TypeError: \'int\' object is not subscriptable.',
        'Python trả về số 0.'
      ],
      correctIndex: 2,
      explanation: 'L[0] trả về số nguyên 42. Số nguyên trong Python là kiểu số học vô hướng (scalar), không phải dãy tuần tự nên không có phương thức __getitem__ hỗ trợ phép đánh chỉ mục, gây lỗi TypeError.'
    },
    {
      question: 'Tại sao phép gán S[1] = \'e\' trên chuỗi S = \'hack\' lại gây ra lỗi?',
      options: [
        'Vì chuỗi trong Python là kiểu dữ liệu bất biến (immutable), không cho phép thay đổi phần tử tại chỗ.',
        'Vì ký tự \'e\' không tương thích với bộ mã hóa Unicode của \'a\'.',
        'Vì cần phải dùng phương thức S.set(1, \'e\').',
        'Vì chỉ số 1 đã bị khóa bảo vệ bởi bộ dọn rác garbage collector.'
      ],
      correctIndex: 0,
      explanation: 'Chuỗi (str) là đối tượng bất biến. Khi đã được tạo ra, nội dung chuỗi không thể sửa đổi tại chỗ. Phép gán chỉ mục hay cắt lát trên chuỗi đều bị cấm và ném TypeError.'
    },
    {
      question: 'Kỹ thuật nào sau đây là giải pháp chuẩn tắc để đổi S = \'hack\' thành \'heck\' bằng cách cắt lát và ghép nối?',
      options: [
        'S = S[0:1] + \'e\' + S[1:]',
        'S[1:] = \'eck\'',
        'S = S[:1] + \'e\' + S[3:]',
        'S = S[0] + \'e\' + S[2:]'
      ],
      correctIndex: 3,
      explanation: 'S[0] lấy \'h\', ký tự mới là \'e\', và lát cắt S[2:] lấy phần còn lại từ vị trí thứ 2 đến hết (\'ck\'). Ghép lại ta được \'heck\'.'
    }
  ],
  summary: [
    'Python không có kiểu char riêng biệt; mỗi ký tự đơn giản là một chuỗi (str) có độ dài bằng 1.',
    'Biểu thức S[0][0][0]... hoạt động được trên chuỗi vì mỗi lần lấy chỉ số [0] đều trả về một chuỗi mới có độ dài 1.',
    'Trên list, L[0][0] chỉ hoạt động nếu phần tử L[0] là một kiểu tuần tự (chuỗi, list, tuple); nếu là số nguyên sẽ gây lỗi TypeError.',
    'Chuỗi là bất biến nên không thể dùng phép gán chỉ mục S[1] = \'e\'.',
    'Để sửa chuỗi, ta kết hợp cắt lát và ghép nối (S[0] + \'e\' + S[2:]) hoặc sử dụng các công cụ như .replace() hoặc list(S) + \'\'.join().'
  ],
  nextSteps: 'Trong bài học tiếp theo (C9.19), chúng ta sẽ hoàn thành hai bài tập cuối cùng của Phần II: Xây dựng bản ghi dữ liệu lồng nhau phức hợp và viết kịch bản tương tác tập tin File thực chiến.'
};
