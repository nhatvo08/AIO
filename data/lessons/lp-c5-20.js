export default {
  id: 'lp-c5-20',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.20',
  title: 'Đối tượng Boolean (bool) & "Sự ngụy trang" của Số nguyên',
  subtitle: 'Bản chất kiểu bool là lớp con của int, định nghĩa lại str/repr, bẫy True + 4 = 5 và phân biệt == vs is',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu bản chất kỹ thuật: lớp bool là một lớp con (subclass) trực tiếp của kiểu số nguyên int.',
    'Giải thích cơ chế "ngụy trang": True và False hành xử như số 1 và 0 nhưng định nghĩa lại str/repr để in ra chữ.',
    'Kiểm chứng mối quan hệ kế thừa qua type(True) và isinstance(True, int).',
    'Giải mã hiện tượng kỳ lạ: True + 4 cho ra số nguyên 5, và hiểu vì sao True == 1 là True nhưng True is 1 là False.',
    'Nhận biết ứng dụng thực tế: viết mã tường minh với while True: và cờ hiệu flag = False.'
  ],

  intuition: {
    title: 'Số 1 và số 0 đeo mặt nạ dạ hội',
    metaphor: 'Hãy tưởng tượng hai số nguyên quen thuộc là 1 và 0 quyết định đi dự một buổi dạ hội hóa trang. Chúng khoác lên mình chiếc áo choàng lộng lẫy và đeo chiếc mặt nạ ghi tên "True" và "False". Khi người ta nhìn vào diện mạo bên ngoài của chúng (thao tác in print hoặc hiển thị REPL), ai cũng trầm trồ gọi chúng là kiểu Boolean. Nhưng khi bạn đưa chúng vào một phép toán số học như cộng với 4 (True + 4), lớp mặt nạ rơi xuống và lộ diện bản chất số nguyên bên dưới: 1 + 4 = 5! Python thiết kế như vậy để vừa giữ được sự tương thích số học lịch sử, vừa giúp mã nguồn của bạn trở nên trong sáng và dễ đọc.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MỐI QUAN HỆ KẾ THỪA: BOOL KẾ THỪA TỪ INT</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <div style="padding:10px 24px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">LỚP CHA (BASE CLASS)</div>
            <div style="font-weight:700;color:var(--accent-primary);font-size:1.1rem;">class int</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Giá trị: ..., -1, 0, 1, 2, ...</div>
          </div>
          <div style="color:var(--accent-primary);font-size:1.2rem;">▲ kế thừa (subclass)</div>
          <div style="padding:10px 24px;background:var(--bg-surface);border:2px solid var(--success);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">LỚP CON (SUBCLASS)</div>
            <div style="font-weight:700;color:var(--success);font-size:1.1rem;">class bool</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">2 thể hiện duy nhất: True (1) &amp; False (0)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bản chất Kỹ thuật của Kiểu Boolean trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 34 / 38 – Trang 35 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Mặc dù ranh giới có phần mờ nhạt, kiểu Boolean <code>bool</code> của Python có thể xem là mang bản chất số học vì hai giá trị của nó, <strong><code>True</code> và <code>False</code>, chỉ là những phiên bản tùy biến của các số nguyên 1 và 0</strong> với cách tự in ra màn hình khác biệt.</p>
        <p>Để đại diện cho các giá trị chân lý, Python có một kiểu rõ ràng tên là <code>bool</code>. Nghĩa là, <code>True</code> và <code>False</code> là các thể hiện (instance) của lớp <code>bool</code>, mà bản thân lớp này lại chỉ là <strong>một lớp con (subclass - theo nghĩa hướng đối tượng) của kiểu số nguyên dựng sẵn <code>int</code></strong>.</p>
        <p><code>True</code> và <code>False</code> hành xử hoàn toàn giống hệt như các số nguyên 1 và 0, ngoại trừ việc chúng có logic in ấn tùy biến—chúng tự in ra dưới dạng các từ <code>True</code> và <code>False</code> thay vì các chữ số <code>1</code> và <code>0</code>. Lớp <code>bool</code> đạt được điều này bằng cách định nghĩa lại các phương thức chuỗi <code>str</code> và <code>repr</code>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. "Vạch trần Sự Ngụy trang": Thực hành trong REPL',
      content: `
        <p>Đối với hầu hết các mục đích thực tế, bạn có thể xem <code>True</code> và <code>False</code> như thể chúng là những biến được định nghĩa trước mang giá trị số nguyên 1 và 0.</p>
        <p>Tuy nhiên, cách hiện thực hóa cài đặt này có thể dẫn đến những kết quả khá kỳ lạ khi tính toán:</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra bản chất số nguyên của True và False',
          code: `>>> type(True)                     # True thuộc kiểu bool
<class 'bool'>
>>> isinstance(True, int)          # Đồng thời cũng là một số nguyên int!
True
>>> True == 1                      # Cùng giá trị toán học
True
>>> True is 1                      # Nhưng là hai đối tượng khác nhau trong bộ nhớ
False
>>> True or False                  # Tương đương: 1 or 0
True
>>> True + 4                       # True là số 1 có hiển thị tùy biến -> 1 + 4 = 5!
5`,
          output: `<class 'bool'>
True
True
False
True
5`,
          annotations: [
            { line: 3, text: 'isinstance(True, int) trả về True khẳng định bool là subclass của int.' },
            { line: 5, text: 'Toán tử == so sánh giá trị và xác nhận True tương đương 1.' },
            { line: 7, text: 'Toán tử is so sánh địa chỉ vùng nhớ (danh tính đối tượng).' },
            { line: 11, text: 'True + 4 tạo ra số nguyên 5 trong Python!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Giá trị Thực tiễn của Boolean trong Lập trình',
      content: `
        <p>Vì có lẽ bạn sẽ chẳng bao giờ cố tình viết một biểu thức như <code>True + 4</code> trong mã nguồn Python thực tế, bạn hoàn toàn có thể yên tâm bỏ qua mọi hàm ý mang tính siêu hình sâu xa của nó.</p>
        <p>Giá trị lớn nhất mà kiểu Boolean mang lại là <strong>làm cho ý định của mã nguồn trở nên tường minh và sáng rõ hơn</strong>:</p>
        <ul>
          <li>Một vòng lặp vô hạn được viết thành <code>while True:</code> thay vì cách viết ít trực quan của ngôn ngữ C là <code>while 1:</code>.</li>
          <li>Các cờ hiệu (flag) có thể được khởi tạo rõ ràng với <code>flag = False</code> thay vì <code>flag = 0</code>.</li>
        </ul>
        <p>Chúng ta sẽ xem lại kiểu Boolean trong Chương 9 để định nghĩa khái niệm chân lý (Truthiness) của Python, và một lần nữa trong Chương 12 để xem cách thức các toán tử Boolean như <code>and</code> và <code>or</code> hoạt động.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cảnh báo SyntaxWarning khi dùng "is" với hằng số trong Python 3.8+',
        content: `
          <p>Khi bạn gõ <code>True is 1</code>, Python sẽ trả về <code>False</code> vì <code>True</code> và <code>1</code> là hai đối tượng riêng biệt trong bộ nhớ CPython. Trong các phiên bản Python hiện đại (từ 3.8 trở đi), trình biên dịch sẽ phát ra một cảnh báo:</p>
          <pre class="code-block"><code>SyntaxWarning: "is" with a literal. Did you mean "=="?</code></pre>
          <p>Luôn dùng <strong><code>==</code></strong> để so sánh giá trị và để dành <strong><code>is</code></strong> cho việc kiểm tra đơn lẻ (như <code>x is None</code>).</p>
        `
      }
    ]
  },

  exercises: [
    {
      title: 'Đếm số lượng điều kiện thỏa mãn bằng hàm sum()',
      level: 'Dễ',
      problem: 'Cho danh sách điểm thi: <code>diem_so = [8, 4, 9, 3, 7, 5, 10]</code>. Tận dụng tính chất True tương đương với số nguyên 1, hãy dùng một biểu thức generator kết hợp với hàm sum() để đếm xem có bao nhiêu điểm số >= 5 (đạt yêu cầu).',
      hint: 'sum(d >= 5 for d in diem_so). Mỗi lần d >= 5 cho ra True (1).',
      solutionCode: `diem_so = [8, 4, 9, 3, 7, 5, 10]

# Mỗi khi d >= 5 là True, sum() sẽ cộng thêm 1
so_luong_dat = sum(d >= 5 for d in diem_so)

print("Số học sinh đạt yêu cầu:", so_luong_dat)`,
      solutionOutput: `Số học sinh đạt yêu cầu: 5`,
      explanation: 'Các điểm thỏa mãn >= 5 là 8, 9, 7, 5, 10 (tổng cộng 5 điểm). Biểu thức sinh ra 5 giá trị True và 2 giá trị False; hàm sum() cộng lại ra 5.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây mô tả ĐÚNG mối quan hệ giữa lớp bool và lớp int trong Python?',
      options: [
        'bool và int là hai kiểu dữ liệu độc lập hoàn toàn, không có quan hệ kế thừa.',
        'int là lớp con của bool.',
        'bool là một lớp con (subclass) của int, với True và False là các thể hiện của bool.',
        'bool là một chuỗi ký tự đặc biệt có độ dài 4 hoặc 5 byte.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python, lớp bool kế thừa trực tiếp từ lớp int. Điều này được chứng minh bằng isinstance(True, int) trả về True và issubclass(bool, int) trả về True.'
    },
    {
      question: 'Kết quả của biểu thức "True + True + False" trong Python là bao nhiêu?',
      options: [
        'True',
        '2',
        'Báo lỗi TypeError',
        'None'
      ],
      correctIndex: 1,
      explanation: 'Vì True mang giá trị số nguyên 1 và False mang giá trị số nguyên 0 trong biểu thức số học, phép tính 1 + 1 + 0 cho ra số nguyên 2.'
    }
  ],

  summary: [
    'Kiểu logic bool trong Python là một lớp con (subclass) của kiểu số nguyên int.',
    'True và False là các thể hiện của bool, mang giá trị số học tương đương 1 và 0.',
    'bool định nghĩa lại phương thức str() và repr() để hiển thị thành chữ "True" và "False".',
    'Phép so sánh True == 1 là True, nhưng True is 1 là False vì chúng là hai đối tượng khác nhau trong bộ nhớ.',
    'Sử dụng True và False giúp mã nguồn biểu đạt ý định logic rõ ràng, chuyên nghiệp hơn hẳn các con số 1 và 0.'
  ]
};