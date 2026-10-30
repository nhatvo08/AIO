export default {
  id: 'lp-c6-00',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.0',
  title: 'Mở đầu: Khúc đệm về Định kiểu Động & Bí ẩn Thiếu vắng Khai báo',
  subtitle: 'Khám phá cội nguồn của sự linh hoạt và tính đa hình trong Python: mô hình định kiểu động và bản chất biến, đối tượng, mối liên kết',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Xác định vai trò của Chương 6: "khúc đệm" thiết yếu để nắm vững nguyên lý vận hành trước khi khám phá các kiểu dữ liệu phức tạp tiếp theo.',
    'Hiểu khái niệm định kiểu động (dynamic typing) và tính đa hình (polymorphism) mà cơ chế này mang lại.',
    'Giải mã bí ẩn vì sao Python không bao giờ đòi hỏi các câu lệnh khai báo kiểu biến như C, C++ hay Java.',
    'Nắm vững 3 trụ cột cơ bản của mô hình bộ nhớ Python: biến, đối tượng và mối liên kết tham chiếu giữa chúng.'
  ],

  intuition: {
    title: 'Thế giới không cần nhãn khuôn đúc sẵn',
    metaphor: 'Trong các ngôn ngữ định kiểu tĩnh như C, C++ hay Java, một biến giống như một ngăn kéo kim loại được đúc khuôn cứng nhắc: ngăn kéo dán nhãn "int" chỉ được phép nhét số nguyên, ngăn kéo dán nhãn "String" chỉ được nhét văn bản. Nhưng trong thế giới Python, biến không hề có hình thù hay kích cỡ riêng. Biến đơn thuần chỉ là những sợi dây vô hình (các con trỏ tham chiếu) gắn nhãn tên. Các đối tượng (con số, chuỗi, danh sách) là những vật thể độc lập trôi nổi tự do trong không gian bộ nhớ RAM. Sợi dây mang tên a hôm nay có thể buộc vào một viên sỏi số nguyên, tích tắc sau có thể tháo ra để buộc vào một cánh diều chuỗi ký tự. Chính cơ chế tự do này giải phóng lập trình viên khỏi những khai báo khuôn mẫu tẻ nhạt, đồng thời thổi bùng lên tính linh hoạt vượt trội của Python.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH MÔ HÌNH ĐỊNH KIỂU: TĨNH (C/JAVA) VS ĐỘNG (PYTHON)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--text-primary);margin-bottom:8px;">1. Ngôn ngữ Định kiểu Tĩnh (C / C++ / Java)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>int a = 3;</code><br>
              • Ô nhớ cố định được cấp phát riêng cho biến <code>a</code>.<br>
              • Kiểu dữ liệu <code>int</code> gắn cứng vào chính tên biến <code>a</code>.<br>
              • Không thể gán <code>a = "hack"</code> vì xung đột kiểu tại thời điểm biên dịch (compile-time).
            </div>
          </div>
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">2. Mô hình Định kiểu Động của Python</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>a = 3</code><br>
              • Biến <code>a</code> chỉ là một con trỏ tham chiếu trong bảng tên.<br>
              • Kiểu <code>int</code> nằm hoàn toàn ở chính đối tượng <code>3</code> trong RAM.<br>
              • Có thể gán lại <code>a = 'hack'</code> bất kỳ lúc nào vì biến <code>a</code> không có ràng buộc kiểu.
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khúc đệm Cốt yếu: Tại sao phải Tìm hiểu Định kiểu Động?',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác (Objects and Operations) • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 1 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Trong chương trước (Chương 5), chúng ta đã bắt đầu đi sâu khám phá các kiểu đối tượng cốt lõi của Python qua việc tìm hiểu các kiểu số và những thao tác số học phong phú. Chúng ta sẽ tiếp tục chuyến hành trình khám phá thế giới đối tượng trong chương tiếp theo với chuỗi ký tự. Nhưng trước khi đi tiếp, điều cốt yếu là bạn phải nắm vững một ý niệm có thể coi là căn bản bậc nhất trong lập trình Python, đồng thời chắc chắn là nền tảng tạo nên cả tính ngắn gọn lẫn sự linh hoạt vượt trội của ngôn ngữ này: <strong>định kiểu động (dynamic typing)</strong>, cùng <strong>tính đa hình (polymorphism)</strong> mà cơ chế này mang lại.</p>

        <p>Như tác giả Mark Lutz nhấn mạnh xuyên suốt cuốn sách, trong Python, chúng ta <strong>không cần phải khai báo kiểu dữ liệu cụ thể</strong> cho các đối tượng mà tập lệnh (script) sử dụng. Thậm chí trên thực tế, hầu hết các chương trình Python còn chủ động <em>không quan tâm</em> đến các kiểu dữ liệu cụ thể. Bằng cách loại bỏ hoàn toàn những ràng buộc kiểu tĩnh theo cách này, mã nguồn Python sẽ tự nhiên hoạt động được trong nhiều ngữ cảnh khác nhau và thường vượt xa cả mong đợi ban đầu của người viết.</p>

        <p>Bởi vì định kiểu động chính là cội nguồn của sự linh hoạt này, đồng thời cũng là chướng ngại tiềm ẩn đối với những người mới bắt đầu bước chân vào Python, nên chúng ta hãy cùng thực hiện một chuyến du hành ngắn để khám phá toàn diện mô hình này tại đây. Ở cuối chặng đường của chương, chúng ta cũng sẽ dừng chân đôi chút tại nghịch lý của cơ chế gợi ý kiểu (type hinting), để hiểu rõ lý do vì sao tác giả khuyến nghị bạn nên thận trọng và tránh lạm dụng nó.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bí ẩn về sự Vắng mặt của các Câu lệnh Khai báo',
      content: `
        <p>Nếu bạn từng có nền tảng về các ngôn ngữ định kiểu tĩnh (statically typed languages) như C, C++ hoặc Java, có thể bạn sẽ cảm thấy đôi chút bối rối và lạ lẫm ở giai đoạn này. Cho đến nay, trong suốt các chương học trước, chúng ta vẫn liên tục sử dụng các biến mà không hề khai báo sự tồn tại hay kiểu dữ liệu của chúng, ấy thế mà mọi thứ bằng cách nào đó vẫn vận hành trơn tru hoàn hảo.</p>

        <p>Chẳng hạn, khi ta gõ câu lệnh <code>a = 3</code> trong một phiên làm việc tương tác (interactive REPL session) hoặc trong tệp chương trình, câu hỏi tự nhiên nảy sinh là:</p>
        <ul>
          <li>Làm sao Python biết được rằng biến <code>a</code> sẽ đại diện cho một số nguyên?</li>
          <li>Và quan trọng hơn, làm sao Python biết bản thân <code>a</code> thực chất là cái gì?</li>
        </ul>

        <p>Một khi bạn bắt đầu đặt ra những câu hỏi nền tảng như vậy, bạn đã chính thức bước chân vào địa hạt của <strong>mô hình định kiểu động trong Python</strong>.</p>

        <p>Trong Python, các kiểu dữ liệu được xác định hoàn toàn tự động tại <strong>thời điểm chạy (runtime — "động")</strong>, chứ không phải dựa vào các khai báo được thêm sẵn vào mã nguồn từ trước (<strong>thời điểm biên dịch — "tĩnh"</strong>). Điều này đồng nghĩa với việc bạn không bao giờ phải viết những dòng khai báo biến dài dòng. Khái niệm này sẽ trở nên vô cùng sáng tỏ và dễ nắm bắt nếu bạn luôn ghi nhớ rằng trong Python, mọi thứ suy cho cùng chỉ quy về ba thành tố:</p>
        <ol>
          <li><strong>Biến (Variables):</strong> Các tên gọi trong bảng hệ thống.</li>
          <li><strong>Đối tượng (Objects):</strong> Các khối bộ nhớ lưu trữ giá trị thực.</li>
          <li><strong>Mối liên kết giữa chúng (References):</strong> Các con trỏ tham chiếu nối từ biến tới đối tượng.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'So sánh trải nghiệm khai báo trong Python và ngôn ngữ tĩnh',
          code: `# Trong C hoặc Java, bạn bắt buộc phải viết:
# int a = 3;
# a = "hack";  // LỖI BIÊN DỊCH: incompatible types

# Nhưng trong Python REPL, ta chỉ cần viết trực tiếp:
a = 3
print("Kiểu của đối tượng mà a trỏ tới:", type(a))

a = "hack"
print("Sau khi gán lại, kiểu đối tượng mới:", type(a))`,
          output: `Kiểu của đối tượng mà a trỏ tới: <class 'int'>
Sau khi gán lại, kiểu đối tượng mới: <class 'str'>`,
          annotations: [
            { line: 6, text: 'Phép gán a = 3 tạo ra đối tượng số nguyên 3 và liên kết biến a tới nó.' },
            { line: 7, text: 'Hàm type(a) kiểm tra kiểu của đối tượng mà a đang tham chiếu tới, trả về <class \'int\'>.' },
            { line: 9, text: 'Gán a = "hack" giải phóng liên kết cũ và nối a sang đối tượng chuỗi mới.' },
            { line: 10, text: 'Lúc này type(a) phản ánh đối tượng chuỗi mới, hoàn toàn không có lỗi xung đột kiểu.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Vai trò bàn đạp của Chương 6 trong giáo trình',
        content: 'Chương 6 được Mark Lutz gọi là <em>"Khúc đệm" (An Interlude)</em> vì nó tạm thời dừng việc giới thiệu từng kiểu dữ liệu riêng lẻ để làm rõ "luật chơi chung" của toàn bộ hệ thống Python: cách biến trỏ tới đối tượng trong RAM. Một khi nắm vững luật chơi này, bạn sẽ đọc hiểu và dự đoán chính xác hành vi của chuỗi, list, tuple, dict và class ở tất cả các chương tiếp theo.'
      }
    ]
  },

  exercises: [
    {
      title: 'Phân tích sự khác biệt giữa định kiểu tĩnh và định kiểu động',
      level: 'Dễ',
      problem: 'Hãy giải thích ngắn gọn bằng lời: tại sao trong Python đoạn mã <code>x = 10; x = "Python"</code> lại hoàn toàn hợp lệ, trong khi đoạn mã tương tự trong ngôn ngữ C (<code>int x = 10; x = "Python";</code>) sẽ bị trình biên dịch từ chối ngay lập tức?',
      hint: 'Hãy chú ý đến nơi lưu trữ thông tin kiểu dữ liệu: nó nằm ở tên biến hay nằm ở đối tượng trong bộ nhớ?',
      solutionCode: `# Đoạn mã minh họa trong Python:
x = 10
print(f"Bước 1: x trỏ tới {type(x).__name__} giá trị {x}")

x = "Python"
print(f"Bước 2: x trỏ tới {type(x).__name__} giá trị '{x}'")`,
      solutionOutput: `Bước 1: x trỏ tới int giá trị 10
Bước 2: x trỏ tới str giá trị 'Python'`,
      explanation: 'Trong ngôn ngữ định kiểu tĩnh như C, kiểu dữ liệu gắn chặt vào chính vị trí ô nhớ của biến `x` từ lúc khai báo. Trong khi đó ở Python, bản thân biến `x` hoàn toàn không có kiểu; kiểu dữ liệu nằm ở chính đối tượng trong RAM. Do đó, việc đổi `x` từ số `10` sang chuỗi `"Python"` chỉ đơn thuần là chuyển hướng con trỏ tham chiếu của `x` từ đối tượng này sang đối tượng khác.'
    }
  ],

  quiz: [
    {
      question: 'Theo giáo trình của Mark Lutz, kiểu dữ liệu trong Python được xác định vào thời điểm nào?',
      options: [
        'Tại thời điểm biên dịch mã nguồn sang file bytecode .pyc.',
        'Tại thời điểm chạy chương trình (runtime) một cách hoàn toàn tự động.',
        'Khi lập trình viên khai báo từ khóa chỉ định kiểu ở đầu tệp tin.',
        'Tại thời điểm cài đặt trình thông dịch Python vào hệ điều hành.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, các kiểu dữ liệu được xác định tự động tại thời điểm chạy (runtime — "động"), không dựa vào bất kỳ khai báo tĩnh nào trước đó trong mã nguồn.'
    },
    {
      question: 'Toàn bộ mô hình định kiểu và thực thi trong Python suy cho cùng quy về ba thành tố nào?',
      options: [
        'Hàm, Lớp và Gói thư viện.',
        'Trình biên dịch, Trình thông dịch và Hệ điều hành.',
        'Biến (tên), Đối tượng (bộ nhớ) và Mối liên kết tham chiếu giữa chúng.',
        'Cú pháp lệnh, Dấu chấm phẩy và Khối thụt lề.'
      ],
      correctIndex: 2,
      explanation: 'Mark Lutz khẳng định: mọi cơ chế phép gán và định kiểu trong Python suy cho cùng đều quy về ba yếu tố nền tảng: Biến, Đối tượng và Mối liên kết (tham chiếu) giữa chúng.'
    }
  ],

  summary: [
    'Chương 6 là khúc đệm lý thuyết then chốt: khám phá mô hình định kiểu động và tính đa hình của Python.',
    'Python không bao giờ đòi hỏi câu lệnh khai báo kiểu cho biến; mã nguồn tự do thích ứng đa ngữ cảnh.',
    'Kiểu dữ liệu được xác định tự động tại thời điểm chạy (runtime), chứ không cố định tại thời điểm biên dịch.',
    'Mọi cơ chế vận hành trong Python đều quy về 3 thành tố: Biến (Names), Đối tượng (Objects) và Tham chiếu (References).',
    'Nắm chắc mô hình định kiểu động là chìa khóa để giải mã hành vi của mọi kiểu dữ liệu ở các chương tiếp theo.'
  ]
};
