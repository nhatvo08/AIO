export default {
  id: 'lp-c6-15',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.15',
  title: 'Tóm tắt Chương 6 & Bộ 3 Câu hỏi Ôn tập kèm Lời giải Chi tiết',
  subtitle: 'Tổng kết toàn diện kiến thức Chương 6 và bộ 3 câu hỏi tự đánh giá kinh điển của Mark Lutz về tham chiếu và tính khả biến',
  level: 'Trung bình',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Tổng hợp toàn bộ 5 trụ cột kiến thức cốt lõi của Chương 6: định kiểu động, tham chiếu, thu gom rác, tham chiếu chia sẻ và tính đa hình.',
    'Tự kiểm tra và củng cố hiểu biết thông qua bộ 3 câu hỏi ôn tập nguyên bản từ sách giáo trình của Mark Lutz.',
    'Nắm vững đáp án gợi ý và phân tích chuyên sâu của tác giả cho từng trường hợp: chuỗi bất biến, list khả biến và list slicing.',
    'Chuẩn bị tâm thế và kiến thức nền tảng vững chắc để bước sang Chương 7 (Khám phá Chuyên sâu Chuỗi ký tự str).'
  ],

  intuition: {
    title: 'Trạm dừng chân trước thềm thế giới chuỗi ký tự',
    metaphor: 'Sau khi băng qua chặng đường tìm hiểu khúc đệm định kiểu động — từ 3 bước của phép gán, cấu trúc PyObject, đến cơ chế thu gom rác và hiện tượng tham chiếu chia sẻ — bài học này là trạm dừng chân tổng kết trên đỉnh đèo. Tác giả Mark Lutz trao cho bạn một bộ 3 câu hỏi thử thách kinh điển. Ba câu hỏi này chính là thước đo chuẩn xác nhất xem bạn đã thực sự thấu suốt sự khác biệt giữa biến, đối tượng và con trỏ hay chưa. Vượt qua 3 thử thách này, bạn đã nắm trong tay tấm vé thông hành danh giá để tự tin bước vào thế giới chuỗi ký tự trong Chương 7.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢN ĐỒ KIẾN THỨC CỐT LÕI CHƯƠNG 6: KHÚC ĐỆM VỀ ĐỊNH KIỂU ĐỘNG</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. Biến & Tham Chiếu</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Biến sinh ra khi gán<br>• Không có kiểu ở biến<br>• 3 bước phép gán Hình 6-1</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">2. Cấu Trúc Đối Tượng</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Trường định kiểu int/str<br>• Bộ đếm tham chiếu refcount<br>• Đối tượng bất tử Python 3.12+</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);">3. Thu Gom Rác (GC)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Tự động khi refcount = 0<br>• Trả về free memory pool<br>• Module gc dò tham chiếu vòng</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-secondary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-secondary);">4. Tham Chiếu Chia Sẻ</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Bất biến: an toàn tuyệt đối<br>• Khả biến: bẫy đổi tại chỗ<br>• Slicing [:] &amp; deepcopy()</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tóm tắt Cốt lõi Toàn bộ Chương 6',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 15 / 17 – Trang 16 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Chương này đã đi sâu tìm hiểu mô hình định kiểu động của Python—tức là phương thức mà Python tự động theo dõi và quản lý kiểu dữ liệu của các đối tượng thay cho chúng ta, thay vì bắt buộc chúng ta phải viết các câu lệnh khai báo dài dòng trong tập lệnh của mình.</p>

        <p>Xuyên suốt chương học, chúng ta đã đúc rút được những trụ cột lý thuyết quan trọng sau:</p>
        <ol>
          <li><strong>Gắn kết biến và đối tượng:</strong> Các biến và đối tượng được gắn kết với nhau thông qua các tham chiếu (con trỏ địa chỉ bộ nhớ) trong Python để mang lại sự linh hoạt tối đa về kiểu.</li>
          <li><strong>Thu gom rác tự động:</strong> Python quản lý bộ nhớ hoàn toàn tự động bằng bộ đếm tham chiếu kết hợp bộ dò chu trình vòng trong module <code>gc</code>, giải phóng không gian bộ nhớ ngay khi không còn ai sử dụng.</li>
          <li><strong>Tham chiếu chia sẻ và thay đổi tại chỗ:</strong> Chúng ta đã học được cách các tham chiếu chia sẻ trỏ tới các đối tượng khả biến (như list, dict, set) có thể ảnh hưởng đồng thời tới nhiều biến ra sao khi có thao tác sửa đổi tại chỗ, cũng như cách hóa giải bằng các kỹ thuật sao chép (cắt lát <code>[:]</code>, <code>copy()</code> và <code>deepcopy()</code>).</li>
          <li><strong>Bản chất của so sánh bằng:</strong> Nhận thấy tham chiếu chi phối trực tiếp khái niệm so sánh bằng trong Python: toán tử <code>==</code> so sánh giá trị nội dung, trong khi toán tử <code>is</code> so sánh định danh con trỏ đối tượng.</li>
          <li><strong>Nghịch lý gợi ý kiểu:</strong> Điểm qua cơ chế gợi ý kiểu (type hinting)—một phân nhánh bổ sung các khai báo kiểu không hề được sử dụng khi thực thi vào một ngôn ngữ định kiểu động.</li>
        </ol>

        <p>Bởi vì trong Python chỉ tồn tại duy nhất một mô hình phép gán, và bởi vì phép gán hiện diện ở khắp mọi nơi trong ngôn ngữ, nên điều cốt yếu là bạn phải nắm thật chắc mô hình này trước khi bước tiếp. Sau phần câu hỏi ôn tập dưới đây, chúng ta sẽ tiếp tục chuyến hành trình khám phá các kiểu đối tượng cốt lõi trong Chương 7 với <strong>chuỗi ký tự (str)</strong>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bộ 3 Câu hỏi Ôn tập Kiểm tra Kiến thức Kinh điển',
      content: `
        <p>Hãy tự phân tích và suy nghĩ câu trả lời cho 3 câu hỏi kinh điển dưới đây trước khi mở xem phần đáp án và giải thích chi tiết của Mark Lutz:</p>

        <div style="display:flex;flex-direction:column;gap:18px;margin-top:16px;">
          <!-- Câu 1 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">Câu hỏi 1. Hãy xem xét ba câu lệnh sau. Chúng có làm thay đổi giá trị được in ra của A hay không?</div>
            <pre style="margin:8px 0;padding:10px;background:var(--bg-surface-alt);border-radius:6px;font-family:var(--font-mono);font-size:0.88rem;">A = 'code'
B = A
B = 'Python'</pre>
          </div>

          <!-- Câu 2 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">Câu hỏi 2. Hãy xem xét ba câu lệnh này. Chúng có làm thay đổi giá trị được in ra của A hay không?</div>
            <pre style="margin:8px 0;padding:10px;background:var(--bg-surface-alt);border-radius:6px;font-family:var(--font-mono);font-size:0.88rem;">A = ['code']
B = A
B[0] = 'Python'</pre>
          </div>

          <!-- Câu 3 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">Câu hỏi 3. Còn trường hợp này thì sao—liệu giá trị của A có bị thay đổi hay không?</div>
            <pre style="margin:8px 0;padding:10px;background:var(--bg-surface-alt);border-radius:6px;font-family:var(--font-mono);font-size:0.88rem;">A = ['code']
B = A[:]
B[0] = 'Python'</pre>
          </div>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Đáp án Gợi ý & Phân tích Chi tiết từ Tác giả Mark Lutz',
      content: `
        <div style="display:flex;flex-direction:column;gap:18px;margin-top:16px;">
          <!-- Đáp án 1 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Đáp án Câu hỏi 1: KHÔNG</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p><strong>A vẫn được in ra là <code>'code'</code>.</strong></p>
              <p>Khi <code>B</code> được gán cho chuỗi <code>'Python'</code>, tất cả những gì diễn ra chỉ là biến <code>B</code> được chuyển hướng để trỏ sang đối tượng chuỗi mới. Ban đầu <code>A</code> và <code>B</code> cùng chia sẻ (tức cùng tham chiếu/trỏ tới) đối tượng chuỗi duy nhất <code>'code'</code>, nhưng trong Python hai tên biến không bao giờ liên kết trực tiếp với nhau. Do đó, việc đặt <code>B</code> trỏ tới một đối tượng khác hoàn toàn không ảnh hưởng gì tới <code>A</code>.</p>
              <p>Nhân tiện cũng xin nói thêm, kết quả vẫn sẽ tương tự nếu câu lệnh cuối cùng ở đây là <code>B = B + 'coding'</code>—phép nối chuỗi sẽ tạo ra một đối tượng mới chứa kết quả, và đối tượng mới này sau đó chỉ được gán riêng cho <code>B</code>. Chúng ta không bao giờ có thể ghi đè một chuỗi (hay một con số, hoặc một <code>tuple</code>) tại chỗ, bởi vì chuỗi là kiểu dữ liệu <strong>bất biến (immutable)</strong>.</p>
            </div>
          </div>

          <!-- Đáp án 2 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">Đáp án Câu hỏi 2: CÓ</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p><strong>A bây giờ được in ra là <code>['Python']</code>.</strong></p>
              <p>Về mặt kỹ thuật, chúng ta thực chất không hề thay đổi trực tiếp bản thân biến <code>A</code> hay <code>B</code>; thay vào đó, chúng ta đã thay đổi một phần của đối tượng mà cả hai biến cùng tham chiếu (cùng trỏ tới) bằng cách ghi đè lên đối tượng đó tại chỗ thông qua biến <code>B</code>. Bởi vì <code>A</code> tham chiếu tới cùng đối tượng với <code>B</code>, nên thay đổi cập nhật này cũng được phản chiếu sang <code>A</code>.</p>
            </div>
          </div>

          <!-- Đáp án 3 -->
          <div style="padding:16px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Đáp án Câu hỏi 3: KHÔNG</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
              <p><strong>A vẫn được in ra là <code>['code']</code>.</strong></p>
              <p>Phép gán tại chỗ thông qua <code>B</code> lần này không gây ảnh hưởng gì tới <code>A</code> bởi vì biểu thức cắt lát (<code>slice</code>) <code>A[:]</code> đã tạo ra một bản sao riêng của đối tượng danh sách trước khi nó được gán cho <code>B</code>.</p>
              <p>Sau câu lệnh gán thứ hai, tồn tại hai đối tượng danh sách hoàn toàn tách biệt có cùng giá trị—trong Python, chúng ta nói rằng chúng <strong>bằng nhau theo toán tử <code>==</code>, nhưng không bằng nhau theo toán tử <code>is</code></strong>. Câu lệnh thứ ba làm thay đổi giá trị của đối tượng danh sách do <code>B</code> trỏ tới, chứ không làm thay đổi đối tượng do <code>A</code> trỏ tới.</p>
            </div>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm trực tiếp kiểm chứng 3 câu hỏi ôn tập trên máy tính',
          code: `# Thử nghiệm Câu 1: Chuỗi bất biến
A = 'code'
B = A
B = 'Python'
print("Câu 1 - A:", A)

# Thử nghiệm Câu 2: List khả biến thay đổi tại chỗ
A = ['code']
B = A
B[0] = 'Python'
print("Câu 2 - A:", A)

# Thử nghiệm Câu 3: List cắt lát tạo bản sao độc lập
A = ['code']
B = A[:]
B[0] = 'Python'
print("Câu 3 - A:", A)`,
          output: `Câu 1 - A: code
Câu 2 - A: ['Python']
Câu 3 - A: ['code']`,
          annotations: [
            { line: 5, text: 'Câu 1 in ra \'code\': chuỗi bất biến được bảo vệ.' },
            { line: 10, text: 'Câu 2 in ra [\'Python\']: thay đổi tại chỗ lan truyền qua tham chiếu chia sẻ.' },
            { line: 15, text: 'Câu 3 in ra [\'code\']: bản sao cắt lát A[:] bảo vệ đối tượng của A hoàn toàn.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời kết của Chương 6',
        content: 'Nắm vững 3 câu hỏi này đồng nghĩa với việc bạn đã thực sự làm chủ toàn bộ tư duy mô hình tên-đối tượng của Python. Bạn đã hoàn toàn sẵn sàng cho Chương 7: Chuỗi ký tự!'
      }
    ]
  },

  exercises: [
    {
      level: 'Vừa',
      title: 'Mở rộng câu hỏi ôn tập: Thử thách với tuple chứa list',
      problem: 'Hãy dự đoán giá trị in ra của T sau chuỗi lệnh sau:\n\n```python\nT = (1, [2, 3])\nT[1].append(4)\nprint(T)\n```\nTại sao tuple là kiểu bất biến nhưng thao tác trên vẫn thành công?',
      hint: 'Tuple không cho phép thay đổi các tham chiếu mà nó nắm giữ. Nhưng đối tượng list bên trong tham chiếu đó là kiểu khả biến hay bất biến?',
      solutionCode: `T = (1, [2, 3])
# T[1] lấy ra tham chiếu tới đối tượng list [2, 3]
T[1].append(4)
print("Kết quả của T:", T)`,
      solutionOutput: `Kết quả của T: (1, [2, 3, 4])`,
      explanation: 'Tuple T không hề bị thay đổi con trỏ tham chiếu của nó (nó vẫn trỏ tới đối tượng số 1 và đối tượng list đó). Nhưng bản thân đối tượng list ở vị trí thứ hai là một đối tượng khả biến, nên phương thức append(4) sửa đổi nội dung bên trong đối tượng list tại chỗ mà không vi phạm tính bất biến của tuple bên ngoài.'
    }
  ],

  quiz: [
    {
      question: 'Trong đoạn mã: A = "code"; B = A; B = "Python", tại sao giá trị của A vẫn là "code"?',
      options: [
        'Vì chuỗi là kiểu dữ liệu bất biến và phép gán cho B chỉ chuyển hướng con trỏ của B sang đối tượng chuỗi mới.',
        'Vì tên biến B có thứ tự bảng chữ cái đứng sau A nên không có quyền sửa A.',
        'Vì Python lưu trữ chuỗi "code" trong tập tin tạm không thể ghi đè.',
        'Vì câu lệnh B = A đã tạo ra bản sao sâu tự động cho A.'
      ],
      correctIndex: 0,
      explanation: 'Chuỗi ký tự là kiểu bất biến trong Python. Khi B = "Python", Python chỉ đơn thuần chuyển con trỏ của B sang đối tượng chuỗi "Python" mới, hai biến A và B không liên kết trực tiếp với nhau nên A vẫn trỏ tới "code".'
    },
    {
      question: 'Để ngăn chặn việc thay đổi phần tử qua biến B làm ảnh hưởng tới danh sách của A trong câu lệnh B = A, lập trình viên nên viết câu lệnh như thế nào?',
      options: [
        'B = freeze(A)',
        'B = A[:] hoặc B = A.copy()',
        'B = &A',
        'B = str(A)'
      ],
      correctIndex: 1,
      explanation: 'Sử dụng toán tử cắt lát B = A[:] hoặc phương thức B = A.copy() sẽ tạo ra một bản sao danh sách độc lập mới cho B, giúp cách ly hoàn toàn các thay đổi tại chỗ giữa A và B.'
    }
  ],

  summary: [
    'Chương 6 đã khám phá toàn diện mô hình định kiểu động và cơ chế phép gán nền tảng trong Python.',
    'Biến chỉ là con trỏ tham chiếu trong bảng tên; kiểu dữ liệu luôn nằm ở chính đối tượng trong RAM.',
    'Thu gom rác tự động giải phóng vùng nhớ ngay khi bộ đếm tham chiếu của đối tượng giảm về 0.',
    'Tham chiếu chia sẻ trên đối tượng khả biến (list, dict, set) có thể tạo tác động lan truyền tại chỗ.',
    'Sử dụng các kỹ thuật sao chép (slicing, copy, deepcopy) khi cần bảo vệ dữ liệu độc lập.',
    'Hoàn tất Chương 6 làm nền tảng vững chắc để chuyển sang khám phá chuỗi ký tự trong Chương 7.'
  ]
};
