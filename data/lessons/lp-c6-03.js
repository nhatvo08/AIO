export default {
  id: 'lp-c6-03',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.3',
  title: 'Kiểu Dữ liệu Gắn liền với Đối tượng, Không phải Tên biến',
  subtitle: 'Làm sáng tỏ hiểu lầm kinh điển: bản thân biến không hề có kiểu, đối tượng tự lưu trữ và ghi nhớ kiểu của chính nó',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu rõ vì sao trong Python, kiểu dữ liệu luôn luôn gắn liền với đối tượng chứ không bao giờ thuộc về tên biến.',
    'Giải mã hành vi khi gán một biến liên tiếp cho nhiều kiểu đối tượng khác nhau (số nguyên -> chuỗi -> số thực).',
    'Thấy được cách trường định kiểu (type designator) của từng đối tượng tự chịu trách nhiệm ghi nhớ thông tin kiểu.',
    'Nắm vững định nghĩa chân thực nhất về một biến trong Python: một con trỏ tham chiếu tới đối tượng cụ thể tại một thời điểm cụ thể.'
  ],

  intuition: {
    title: 'Biển tên trên cửa phòng triển lãm nghệ thuật',
    metaphor: 'Hãy tưởng tượng tên biến a giống như một tấm biển tên di động treo trên cửa phòng triển lãm. Buổi sáng, người ta treo biển a trước cửa phòng trưng bày một bức tượng điêu khắc đá (số nguyên 3). Buổi chiều, ban quản lý dời biển a sang treo trước cửa phòng tranh sơn dầu (chuỗi "hack"). Buổi tối, biển a lại được chuyển sang treo trước cửa phòng chiếu phim tài liệu (số thực 1.23). Tấm biển a tự nó không có chất liệu là đá, không phải là sơn dầu, cũng không phải là phim ảnh. Chất liệu thực sự nằm ở chính tác phẩm nghệ thuật bên trong căn phòng. Tấm biển a chỉ đơn thuần là công cụ chỉ đường cho khách tham quan biết căn phòng nào đang được gọi tên.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BIẾN a CHUYỂN HƯỚNG THAM CHIẾU QUA 3 ĐỐI TƯỢNG ĐỘC LẬP</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <!-- Bước 1 -->
          <div style="display:flex;align-items:center;gap:16px;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="width:70px;font-weight:700;color:var(--text-secondary);">a = 3</div>
            <div style="font-weight:700;color:#0284c7;">[Biến a]</div>
            <div style="color:var(--accent-primary);">─── con trỏ ───►</div>
            <div style="padding:4px 10px;background:#e0f2fe;border:1px dashed #0284c7;border-radius:16px;color:#0369a1;font-weight:700;">
              Đối tượng int(3)
            </div>
          </div>
          <!-- Bước 2 -->
          <div style="display:flex;align-items:center;gap:16px;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="width:70px;font-weight:700;color:var(--text-secondary);">a = 'hack'</div>
            <div style="font-weight:700;color:#0284c7;">[Biến a]</div>
            <div style="color:var(--accent-primary);">─── con trỏ ───►</div>
            <div style="padding:4px 10px;background:#fef3c7;border:1px dashed #d97706;border-radius:16px;color:#b45309;font-weight:700;">
              Đối tượng str('hack')
            </div>
          </div>
          <!-- Bước 3 -->
          <div style="display:flex;align-items:center;gap:16px;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="width:70px;font-weight:700;color:var(--text-secondary);">a = 1.23</div>
            <div style="font-weight:700;color:#0284c7;">[Biến a]</div>
            <div style="color:var(--accent-primary);">─── con trỏ ───►</div>
            <div style="padding:4px 10px;background:#dcfce7;border:1px dashed #16a34a;border-radius:16px;color:#15803d;font-weight:700;">
              Đối tượng float(1.23)
            </div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--text-muted);">
          <em>Bản thân biến a không hề biến đổi kiểu dữ liệu; ta chỉ đang thay đổi đối tượng mà biến a trỏ tới.</em>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Thí nghiệm Gán Liên tiếp Nhiều Kiểu cho Cùng một Biến',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 4 / 17 – Trang 5 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Để hiểu rõ kiểu của đối tượng tham gia vào quá trình vận hành như thế nào, hãy quan sát điều gì xảy ra nếu chúng ta gán giá trị cho một biến nhiều lần liên tiếp trong một phiên tương tác:</p>
      `,
      codeExamples: [
        {
          title: 'Gán liên tiếp các kiểu dữ liệu khác nhau cho cùng một biến a',
          code: `>>> a = 3        # a trỏ tới một số nguyên
>>> a = 'hack'   # Giờ a trỏ tới một chuỗi
>>> a = 1.23     # Giờ a trỏ tới một số thực dấu phẩy động`,
          output: ``,
          annotations: [
            { line: 1, text: 'a tham chiếu tới đối tượng số nguyên 3.' },
            { line: 2, text: 'a chuyển hướng tham chiếu tới đối tượng chuỗi \'hack\'.' },
            { line: 3, text: 'a chuyển hướng tham chiếu tới đối tượng số thực 1.23.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Giải mã Bản chất: Tên Biến Không Có Kiểu',
      content: `
        <p>Đây không phải là phong cách viết mã Python điển hình trong các dự án sản xuất thực tế, nhưng đoạn mã này <strong>hoàn toàn hợp lệ và chạy trơn tru</strong> trong Python—biến <code>a</code> khởi đầu đại diện cho một số nguyên, sau đó chuyển thành một chuỗi, và cuối cùng trở thành một số thực dấu phẩy động (floating-point).</p>

        <p>Ví dụ này thường trông đặc biệt kỳ lạ và gây bối rối đối với các cựu lập trình viên C hoặc Java, bởi nó tạo ra cảm giác như thể kiểu dữ liệu của biến <code>a</code> đã bị "thay đổi" từ số nguyên sang chuỗi khi ta viết câu lệnh <code>a = 'hack'</code>.</p>

        <p>Tuy nhiên, như Mark Lutz chỉ ra, <strong>đó không phải là điều thực sự đang diễn ra dưới nền tảng</strong>. Trong Python, mọi thứ vận hành đơn giản và thanh thoát hơn nhiều:</p>
        <ul>
          <li><strong>Tên biến không có kiểu dữ liệu:</strong> Kiểu dữ liệu gắn liền với đối tượng, chứ không nằm ở tên biến.</li>
          <li>Trong đoạn mã liệt kê phía trên, chúng ta đơn thuần chỉ thay đổi con trỏ của <code>a</code> để nó tham chiếu tới các đối tượng khác nhau trong bộ nhớ.</li>
          <li>Do các biến không sở hữu kiểu dữ liệu, chúng ta thực chất <strong>không hề thay đổi kiểu của biến <code>a</code></strong>; ta chỉ đơn giản làm cho biến đó trỏ tới một đối tượng thuộc kiểu khác.</li>
        </ul>

        <p>Thậm chí, xin nhắc lại một nguyên lý cốt tử: tất cả những gì chúng ta có thể khẳng định một cách chính xác về một biến trong Python chỉ là: <strong>nó đang tham chiếu tới một đối tượng cụ thể tại một thời điểm cụ thể</strong>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Đối tượng Tự Ghi nhớ Kiểu qua Trường Định kiểu',
      content: `
        <p>Trái lại, các đối tượng luôn biết rõ chúng thuộc kiểu dữ liệu nào—mỗi đối tượng đều chứa một trường tiêu đề đánh dấu kiểu của nó (trường định kiểu <code>type designator</code>):</p>
        <ul>
          <li>Đối tượng số nguyên <code>3</code> sẽ chứa giá trị <code>3</code>, cộng thêm một trường định kiểu báo cho Python biết đối tượng này là một số nguyên (nói một cách chặt chẽ bên dưới CPython là một con trỏ trỏ tới đối tượng kiểu có tên là <code>int</code>).</li>
          <li>Trường định kiểu của đối tượng chuỗi <code>'hack'</code> thay vào đó sẽ trỏ tới kiểu chuỗi (gọi là <code>str</code>).</li>
          <li>Và con số <code>1.23</code> sẽ trỏ tới kiểu số thực (gọi là <code>float</code>).</li>
        </ul>

        <p><strong>Chính vì các đối tượng đã tự ghi nhớ kiểu của mình, nên các biến không cần phải làm việc đó nữa!</strong></p>

        <p>Tóm lại: kiểu dữ liệu trong Python luôn gắn liền với đối tượng, chứ không gắn liền với biến. Trong mã nguồn thông thường, một biến đã cho thường sẽ chỉ tham chiếu tới một loại đối tượng duy nhất xuyên suốt vòng đời của hàm. Dẫu vậy, vì đây hoàn toàn không phải là quy định bắt buộc của ngôn ngữ, bạn sẽ nhận thấy mã nguồn Python linh hoạt hơn rất nhiều so với những gì bạn từng quen thuộc—nếu bạn vận dụng tốt Python, mã của bạn có thể <strong>tự động hoạt động tương thích trên nhiều kiểu dữ liệu khác nhau</strong> mà không cần viết các hàm nạp chồng (overload) phức tạp.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời khuyên về quy ước viết mã thực tế',
        content: 'Mặc dù Python cho phép bạn gán lại biến <code>a</code> cho nhiều kiểu dữ liệu khác nhau, nhưng trong thực tế phát triển phần mềm, việc dùng cùng một tên biến để lưu chuỗi rồi lại lưu số nguyên trong cùng một phạm vi hàm là một thói quen xấu khiến người đọc mã bối rối. Hãy chỉ tận dụng tính năng này khi tái sử dụng các biến tạm hoặc khi chuyển đổi trạng thái có chủ đích.'
      }
    ]
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Dùng hàm type() để chứng minh kiểu gắn liền với đối tượng',
      problem: 'Hãy chạy đoạn mã sau và cho biết hàm <code>type()</code> đang kiểm tra kiểu của tên biến <code>x</code> hay kiểu của đối tượng mà <code>x</code> trỏ tới?\n\n```python\nx = 100\nprint(type(x))\nx = [1, 2, 3]\nprint(type(x))\n```',
      hint: 'Hãy nhớ lại: khi một biến xuất hiện trong biểu thức như type(x), biến đó lập tức bị thay thế bằng cái gì?',
      solutionCode: `x = 100
# Khi gọi type(x), Python lập tức thay thế x bằng đối tượng 100 trong RAM
print("Lần 1:", type(x))

x = [1, 2, 3]
# Khi gọi type(x), Python thay thế x bằng đối tượng danh sách [1, 2, 3]
print("Lần 2:", type(x))`,
      solutionOutput: `Lần 1: <class 'int'>
Lần 2: <class 'list'>`,
      explanation: 'Hàm `type(x)` không nhận diện kiểu của tên biến `x` (vì bản thân `x` không có kiểu). Khi biểu thức `type(x)` được đánh giá, `x` ngay lập tức được thay thế bằng đối tượng mà nó tham chiếu tới, và `type()` đọc trường định kiểu (type designator) của chính đối tượng đó.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG NHẤT về khái niệm biến trong Python?',
      options: [
        'Biến là một ô nhớ cố định mang kiểu dữ liệu được xác định khi khai báo.',
        'Biến là một con trỏ tham chiếu khái quát (generic) trỏ tới đối tượng cụ thể tại một thời điểm cụ thể.',
        'Mỗi biến trong Python bắt buộc phải lưu trữ một bảng kích thước byte của kiểu dữ liệu.',
        'Kiểu dữ liệu của biến sẽ vĩnh viễn không thể thay đổi sau lần gán đầu tiên.'
      ],
      correctIndex: 1,
      explanation: 'Bản chất của các biến trong Python là mang tính khái quát (generic); chúng không có kiểu dữ liệu mà chỉ đơn thuần tham chiếu đến một đối tượng cụ thể tại một thời điểm cụ thể.'
    },
    {
      question: 'Tại sao các biến trong Python không cần phải lưu trữ thông tin kiểu dữ liệu?',
      options: [
        'Vì Python sử dụng trình thu gom rác để đoán kiểu ngẫu nhiên.',
        'Vì hệ điều hành tự động cấp phát kiểu mặc định cho mọi chương trình.',
        'Vì bản thân các đối tượng đã tự mang trường định kiểu để ghi nhớ kiểu của chính mình.',
        'Vì Python chỉ hỗ trợ duy nhất một kiểu dữ liệu là chuỗi nhị phân.'
      ],
      correctIndex: 2,
      explanation: 'Mỗi đối tượng trong CPython đều chứa một trường tiêu đề định kiểu (type designator) chỉ ra nó thuộc class nào (int, str, float...), do đó các biến hoàn toàn không cần phải làm công việc này.'
    }
  ],

  summary: [
    'Kiểu dữ liệu trong Python luôn gắn liền với đối tượng trong RAM, không nằm ở tên biến.',
    'Biến là các con trỏ khái quát (generic) có thể tham chiếu tới bất kỳ kiểu đối tượng nào.',
    'Việc gán lại biến chỉ làm thay đổi đối tượng đích mà biến trỏ tới, không làm thay đổi kiểu của biến.',
    'Mỗi đối tượng tự chịu trách nhiệm ghi nhớ kiểu của mình thông qua trường định kiểu (type designator).',
    'Nhờ mô hình này, mã nguồn Python có khả năng tự động thích ứng linh hoạt trên nhiều kiểu dữ liệu.'
  ]
};
