export default {
  id: 'lp-c9-16',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.16',
  title: 'Kiểm tra kiến thức Phần II (Bài 2, 3, 4): Trường hợp biên của Đánh chỉ mục, Cắt lát, del & Gán Tuple',
  subtitle: 'Thực hành các trường hợp biên của list: IndexError vs kẹp biên tự động, gán lát cắt ngược, gán list rỗng, câu lệnh del và hoán đổi biến qua tuple packing',
  level: 'Cơ bản đến Nâng cao',
  duration: '40 phút',
  isNew314: false,
  readings: [
    {
      title: 'Learning Python, 6th Edition — Chương 9: Kiểm tra kiến thức: Bài tập Phần II (Bài 2, 3, 4)',
      author: 'Mark Lutz',
      pages: 'Trang 46 / 48 (Bản dịch tiếng Việt)'
    },
    {
      title: 'Learning Python, 6th Edition — Phụ lục B: Đáp án bài tập Phần II (Đối tượng và Thao tác)',
      author: 'Mark Lutz',
      pages: 'Trang 1160–1162 (Bản gốc tiếng Anh)'
    }
  ],
  objectives: [
    'Phân biệt rõ cơ chế báo lỗi IndexError khi đánh chỉ mục vượt biên đối nghịch với cơ chế tự động kẹp biên (bounds clipping) khi cắt lát.',
    'Hiểu sâu hiện tượng cắt lát ngược với cận dưới lớn hơn cận trên (L[3:1]) và hiệu ứng chèn phần tử khi gán vào một lát cắt rỗng.',
    'Nắm vững sự khác nhau giữa gán list rỗng cho vị trí bù (L[2] = []) và gán cho lát cắt (L[2:3] = []), cũng như giới hạn iterable của phép gán lát cắt.',
    'Thực hành câu lệnh del để xóa phần tử đơn lẻ và toàn bộ lát cắt danh sách tại chỗ.',
    'Giải mã cơ chế hoán đổi giá trị hai biến X, Y = Y, X bằng tuple packing và sequence unpacking không cần biến trung gian tạm thời.'
  ],
  sections: [
    {
      id: 'sec-1',
      title: '1. Bài tập 2: Đánh Chỉ Mục và Cắt Lát — Các Trường Hợp Biên (Boundary Cases)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz (Trang 46 / 48)</span>
          </div>
          <div class="callout-body">
            <p>Khởi đầu với một list gồm 4 phần tử: <code>L = [0, 1, 2, 3]</code>. Tác giả Mark Lutz yêu cầu thử nghiệm 3 trường hợp biên:</p>
          </div>
        </div>

        <p><strong>a. Đánh chỉ mục vượt quá giới hạn (Index Out of Bounds):</strong></p>
        <p>Phép đánh chỉ mục đơn lẻ <code>L[4]</code> cố gắng truy cập ô nhớ ở vị trí offset thứ 4. Do danh sách chỉ có 4 phần tử (các chỉ số hợp lệ từ <code>0</code> đến <code>3</code>), Python từ chối truy xuất và ném ngay ngoại lệ <code>IndexError: list index out of range</code> để ngăn ngừa việc đọc bộ nhớ rác.</p>

        <p><strong>b. Cắt lát vượt ngoài giới hạn (Slice Bounds Clipping):</strong></p>
        <p>Ngược lại hoàn toàn với đánh chỉ mục, thao tác cắt lát <code>L[-1000:100]</code> áp dụng cơ chế <strong>tự động kẹp biên (bounds clipping)</strong>:</p>
        <ul>
          <li>Cận dưới <code>-1000</code> vượt quá chỉ số âm đầu danh sách, Python tự kẹp về <code>0</code>.</li>
          <li>Cận trên <code>100</code> lớn hơn độ dài của danh sách, Python tự kẹp về vị trí cuối cùng <code>len(L)</code>.</li>
          <li>Kết quả trả về toàn bộ danh sách <code>[0, 1, 2, 3]</code> mà <em>không hề báo lỗi</em>.</li>
        </ul>

        <p><strong>c. Cắt lát ngược cận (Cận dưới lớn hơn cận trên) & Phép gán lát cắt rỗng:</strong></p>
        <p>Biểu thức <code>L[3:1]</code> có cận dưới (3) lớn hơn cận trên (1) theo chiều bước nhảy tiến (step = +1), do đó trả về một list rỗng <code>[]</code>.</p>
        <p>Đặc biệt, khi bạn gán cho lát cắt rỗng này: <code>L[3:1] = ['?']</code>, cơ chế gán lát cắt hiểu rằng 0 phần tử bị xóa và các phần tử vế phải sẽ được <strong>chèn (insert)</strong> vào ngay trước vị trí cận dưới (vị trí 3). Kết quả thu được là <code>[0, 1, 2, '?', 3]</code>!</p>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 2: IndexError, Bounds Clipping và Gán Lát Cắt Ngược',
          code: `# Khởi tạo danh sách 4 phần tử
L = [0, 1, 2, 3]

# a. Đánh chỉ mục vượt biên
try:
    print("L[4]:", L[4])
except IndexError as e:
    print("L[4] ném lỗi:", type(e).__name__, "-", e)

# b. Cắt lát vượt ngoài biên (tự động kẹp biên)
print("L[-1000:100] =", L[-1000:100])

# c. Cắt lát ngược cận
print("L[3:1] =", L[3:1])

# Gán vào lát cắt ngược (chèn phần tử vào trước chỉ số 3)
L[3:1] = ['?']
print("Sau khi gán L[3:1] = ['?'] ->", L)`,
          output: `L[4] ném lỗi: IndexError - list index out of range
L[-1000:100] = [0, 1, 2, 3]
L[3:1] = []
Sau khi gán L[3:1] = ['?'] -> [0, 1, 2, '?', 3]`
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bài tập 3: Đánh Chỉ Mục, Cắt Lát, và Câu Lệnh del',
      content: `
        <p>Bài tập này phân tích sâu sự khác nhau giữa việc <em>thay thế một phần tử</em> và <em>thay đổi kích thước cấu trúc danh sách</em>:</p>

        <p><strong>1. Gán list rỗng cho vị trí bù: <code>L[2] = []</code></strong></p>
        <p>Phép gán chỉ mục chỉ thay thế giá trị tại ô nhớ thứ 2 thành đối tượng list rỗng. Độ dài của danh sách vẫn giữ nguyên là 4: <code>[0, 1, [], 3]</code>.</p>

        <p><strong>2. Gán list rỗng cho một lát cắt: <code>L[2:3] = []</code></strong></p>
        <p>Lát cắt <code>L[2:3]</code> chứa phần tử tại vị trí 2. Phép gán lát cắt thay thế cả đoạn này bằng danh sách rỗng, đồng nghĩa với việc <strong>xóa bỏ phần tử đó khỏi danh sách tại chỗ</strong>. Độ dài giảm xuống còn 3: <code>[0, 1, 3]</code>.</p>

        <p><strong>3. Câu lệnh <code>del</code>:</strong></p>
        <p>Câu lệnh <code>del L[0]</code> xóa phần tử đầu tiên tại chỗ ra <code>[1, 2, 3]</code>. Lệnh <code>del L[1:]</code> xóa toàn bộ lát cắt từ vị trí 1 đến hết, chỉ để lại <code>[0]</code>.</p>

        <p><strong>4. Gán đối tượng không phải dãy tuần tự cho lát cắt: <code>L[1:2] = 1</code></strong></p>
        <p>Python yêu cầu vế phải của phép gán lát cắt bắt buộc phải là một iterable (như list, tuple, chuỗi). Gán một số nguyên đơn lẻ <code>1</code> sẽ gây lỗi <code>TypeError: can only assign an iterable</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 3: So sánh Gán chỉ mục, Gán lát cắt, del và Lỗi kiểu',
          code: `# 1. Gán list rỗng cho chỉ mục
L = [0, 1, 2, 3]
L[2] = []
print("Sau L[2] = []:", L)

# 2. Gán list rỗng cho lát cắt
L = [0, 1, 2, 3]
L[2:3] = []
print("Sau L[2:3] = []:", L)

# 3. Sử dụng del
L = [0, 1, 2, 3]
del L[0]
print("Sau del L[0]:", L)

L = [0, 1, 2, 3]
del L[1:]
print("Sau del L[1:]:", L)

# 4. Gán số nguyên cho lát cắt
L = [0, 1, 2, 3]
try:
    L[1:2] = 1
except TypeError as e:
    print("L[1:2] = 1 ném lỗi:", type(e).__name__, "-", e)`,
          output: `Sau L[2] = []: [0, 1, [], 3]
Sau L[2:3] = []: [0, 1, 3]
Sau del L[0]: [1, 2, 3]
Sau del L[1:]: [0]
L[1:2] = 1 ném lỗi: TypeError - can only assign an iterable`
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bài tập 4: Phép Gán Tuple (Tuple Assignment / Sequence Unpacking)',
      content: `
        <p>Mark Lutz giới thiệu đoạn mã hoán đổi giá trị hai biến kinh điển:</p>
        <pre><code class="language-python">&gt;&gt;&gt; X = 'code'
&gt;&gt;&gt; Y = 'hack'
&gt;&gt;&gt; X, Y = Y, X
&gt;&gt;&gt; X, Y
('hack', 'code')</code></pre>

        <p><strong>Bản chất hoạt động dưới "mui xe" (Under the Hood):</strong></p>
        <ol>
          <li><strong>Tuple Packing ở vế phải:</strong> Trước tiên, Python đánh giá vế phải <code>Y, X</code>. Do có dấu phẩy, Python đóng gói hai tham chiếu đối tượng thành một tuple ẩn <code>('hack', 'code')</code> trong bộ nhớ tạm thời.</li>
          <li><strong>Sequence Unpacking sang vế trái:</strong> Sau khi tuple vế phải đã được tạo trọn vẹn, Python mở gói từng phần tử gán song song cho các biến ở vế trái: <code>X</code> nhận tham chiếu đến <code>'hack'</code> và <code>Y</code> nhận tham chiếu đến <code>'code'</code>.</li>
        </ol>
        <p>Nhờ cơ chế này, bạn hoán đổi hai biến mà không cần phải khai báo biến tạm thời <code>temp = X; X = Y; Y = temp</code> như trong C, Java cổ điển hay Pascal!</p>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 4: Hoán đổi hai biến và kiểm tra định danh ID',
          code: `X = 'code'
Y = 'hack'

print("Trước hoán đổi: X =", repr(X), "Y =", repr(Y))

# Hoán đổi thông qua tuple packing & sequence unpacking
X, Y = Y, X

print("Sau hoán đổi:   X =", repr(X), "Y =", repr(Y))`,
          output: `Trước hoán đổi: X = 'code' Y = 'hack'
Sau hoán đổi:   X = 'hack' Y = 'code'`
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Cạm bẫy gán lát cắt với kiểu non-iterable',
        content: 'Vế phải của phép gán lát cắt (như L[1:3] = ...) bắt buộc phải là một dãy tuần tự hoặc iterable. Nếu bạn muốn thay thế lát cắt bằng một số đơn lẻ 99, bắt buộc phải bọc nó vào list [99] hoặc tuple (99,), nếu không Python sẽ ném lỗi TypeError.'
      }
    ],
    tips: [
      {
        title: 'Tự động kẹp biên an toàn khi xử lý dữ liệu động',
        content: 'Khi trích xuất chuỗi hoặc danh sách không rõ độ dài, dùng slicing text[:N] an toàn hơn nhiều so với indexing text[N] vì slicing tự động kẹp biên mà không bao giờ gây lỗi IndexError.'
      }
    ]
  },
  quiz: [
    {
      question: 'Phát biểu nào sau đây đúng khi so sánh việc truy cập L[100] và L[:100] trên một danh sách L có độ dài 5 phần tử?',
      options: [
        'Cả hai thao tác đều gây lỗi IndexError vì chỉ số 100 vượt quá độ dài của danh sách.',
        'L[100] gây lỗi IndexError, trong khi L[:100] an toàn trả về toàn bộ 5 phần tử của L nhờ cơ chế kẹp biên tự động.',
        'Cả hai thao tác đều trả về danh sách rỗng [] vì ngoài phạm vi lưu trữ.',
        'L[:100] sẽ tự động chèn thêm 95 phần tử None vào danh sách để đủ 100 phần tử.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, phép đánh chỉ mục đơn lẻ (indexing) đòi hỏi chỉ số phải nằm trong phạm vi hợp lệ nếu không sẽ ném IndexError. Ngược lại, phép cắt lát (slicing) tự động kẹp biên (clip bounds) cận trên và cận dưới về giới hạn của danh sách.'
    },
    {
      question: 'Cho list L = [1, 2, 3]. Điều gì xảy ra khi bạn thực thi lệnh L[2:1] = [99]?',
      options: [
        'Số 99 được chèn vào trước vị trí chỉ số 2, kết quả là [1, 2, 99, 3].',
        'Python báo lỗi ValueError vì cận dưới lớn hơn cận trên.',
        'Danh sách bị đảo ngược thành [3, 99, 2, 1].',
        'Phần tử tại chỉ số 2 (số 3) bị thay thế thành 99.'
      ],
      correctIndex: 0,
      explanation: 'Khi cắt lát với cận dưới lớn hơn cận trên (như L[2:1]), lát cắt trích xuất là rỗng. Khi gán cho lát cắt rỗng này, Python chèn các phần tử vế phải vào ngay vị trí cận dưới (chỉ số 2) mà không xóa phần tử nào, tạo ra kết quả [1, 2, 99, 3].'
    },
    {
      question: 'Sự khác biệt căn bản giữa hai câu lệnh L[2] = [] và L[2:3] = [] trên danh sách L = [10, 20, 30, 40] là gì?',
      options: [
        'Cả hai câu lệnh đều có kết quả xóa phần tử 30 ra khỏi danh sách.',
        'Cả hai câu lệnh đều biến L thành list rỗng [].',
        'L[2] = [] lồng một list rỗng tại ô nhớ 2 ra [10, 20, [], 40]; trong khi L[2:3] = [] xóa bỏ phần tử 30 tại chỗ ra [10, 20, 40].',
        'L[2:3] = [] báo lỗi cú pháp vì không thể gán list rỗng cho lát cắt.'
      ],
      correctIndex: 2,
      explanation: 'Gán chỉ mục (L[2] = []) thay thế ô nhớ 2 bằng giá trị đối tượng vế phải (list rỗng), không làm đổi độ dài L. Gán lát cắt (L[2:3] = []) thay thế lát cắt [30] bằng các phần tử của vế phải (không có phần tử nào), tức là xóa hẳn phần tử đó.'
    },
    {
      question: 'Tại sao câu lệnh X, Y = Y, X trong Python có thể hoán đổi hai biến mà không làm mất dữ liệu ban đầu?',
      options: [
        'Vì Python có bộ nhớ phụ tự động sao lưu tất cả biến trước mỗi dòng lệnh.',
        'Vì vế phải (Y, X) được đánh giá và đóng gói trước thành một tuple tham chiếu tạm thời trước khi mở gói gán cho vế trái.',
        'Vì toán tử dấu phẩy tạo ra một luồng đa luồng (multi-threading) thực thi đồng thời.',
        'Vì X và Y là các con trỏ trỏ tới cùng một địa chỉ bộ nhớ.'
      ],
      correctIndex: 1,
      explanation: 'Vế phải được đánh giá trước tạo thành một tuple (tuple packing). Sau đó tuple này được mở gói song song cho vế trái (sequence unpacking), giúp hoán đổi nguyên vẹn hai giá trị mà không cần biến trung gian thủ công.'
    }
  ],
  summary: [
    'Đánh chỉ mục đơn lẻ vượt giới hạn luôn gây IndexError; trong khi cắt lát vượt biên luôn an toàn nhờ cơ chế tự động kẹp biên (bounds clipping).',
    'Cắt lát với cận ngược (cận dưới > cận trên) tạo ra dãy rỗng; gán cho lát cắt rỗng này hoạt động như một phép chèn (insertion) vào trước vị trí cận dưới.',
    'Gán cho vị trí bù (L[i] = x) thay thế phần tử đơn lẻ; gán cho lát cắt (L[i:j] = seq) thay thế hoặc xóa cả đoạn và vế phải bắt buộc phải là một iterable.',
    'Câu lệnh del L[i] xóa phần tử đơn; del L[i:j] xóa sạch toàn bộ đoạn lát cắt tại chỗ.',
    'Cú pháp X, Y = Y, X hoán đổi hai biến dựa trên tuple packing ở vế phải và sequence unpacking ở vế trái mà không cần biến phụ.'
  ],
  nextSteps: 'Trong bài học tiếp theo (C9.17), chúng ta sẽ khám phá Bài tập 5, 6 và 7: Khóa Dictionary, lỗi KeyError vs tự động tạo mới, và nguyên tắc đa hình của các thao tác chung.'
};
