export default {
  id: 'lp-c10-09',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.9',
  title: 'Tóm tắt Chương 10 & Trọn bộ 8 Câu hỏi Ôn tập kèm Lời giải Chi tiết',
  subtitle: 'Khái quát toàn bộ quy tắc cú pháp câu lệnh, cầu nối chuyển tiếp sang Chương 11 và giải trọn vẹn 8 câu hỏi kiểm tra kiến thức nguyên bản của Mark Lutz',
  level: 'Trung bình',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Tổng hợp toàn bộ các quy tắc cú pháp nền tảng của Chương 10: quy tắc một dòng một lệnh, thụt lề vật lý, dấu hai chấm bắt buộc và các ngoại lệ.',
    'Xác định rõ cầu nối chuyển tiếp sang Chương 11: đi sâu vào chi tiết các câu lệnh thủ tục cơ bản (phép gán, biểu thức, lời gọi hàm và print).',
    'Thử thách và củng cố toàn diện kiến thức với Trọn bộ 8 Câu hỏi ôn tập nguyên bản từ trang 20–21 của giáo trình Mark Lutz.',
    'Phân tích sâu sắc lời giải chi tiết cho từng câu hỏi kèm mã nguồn thực nghiệm kiểm chứng.'
  ],

  intuition: {
    title: 'Bản đồ địa hình đã vẽ xong và Trạm kiểm soát trước khi lên đường',
    metaphor: 'Sau khi đi hết Chương 10, bạn đã nắm trong tay tấm bản đồ địa hình hoàn chỉnh về cú pháp của thế giới Python. Bạn đã hiểu vì sao những con đường ở đây lại thẳng tắp không cần rào chắn ngoặc nhọn, vì sao mỗi ngã rẽ đều có biển báo dấu hai chấm, và làm thế nào để căng dây nối các dòng lệnh khi gặp vực sâu. Bài học này là trạm kiểm soát cuối cùng trước khi đoàn lữ hành chính thức tiến vào Chương 11: bạn sẽ đối diện với 8 câu hỏi khảo hạch kinh điển của Mark Lutz để chứng minh mình đã thuần thục toàn bộ luật lệ giao thông trên miền đất này!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢN ĐỒ TỔNG KẾT QUY TẮC CÚ PHÁP CHƯƠNG 10</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. QUY TẮC CHUẨN</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Hết dòng = hết câu lệnh<br>• Dấu hai chấm (:) ở header<br>• Thụt lề vật lý gom khối (suite)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #10b981;border-radius:6px;">
            <div style="font-weight:700;color:#10b981;">2. BA THỨ LOẠI BỎ</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Không bắt buộc ngoặc đơn ( )<br>• Không cần dấu chấm phẩy ;<br>• Không dùng ngoặc nhọn { }</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #f59e0b;border-radius:6px;">
            <div style="font-weight:700;color:#f59e0b;">3. CÁC NGOẠI LỆ</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Dồn lệnh đơn bằng dấu ;<br>• Dòng nối tiếp với ( ), [ ], { }<br>• Lệnh đơn sau dấu :</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;">
            <div style="font-weight:700;color:#8b5cf6;">4. THỰC CHIẾN REPL</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• while True + input + break<br>• try/except/else (EAFP)<br>• Toán tử gán walrus :=</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tóm Tắt Toàn Diện Chương 10 & Cầu Nối Sang Chương 11',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 20–21 / 21</strong>.</p>
          </div>
        </div>

        <p>Đến đây là kết thúc cái nhìn đầu tiên của chúng ta về cú pháp câu lệnh trong Python. Chương này đã giới thiệu các quy tắc tổng quát để viết câu lệnh và các khối lệnh:</p>
        <ul>
          <li><strong>Quy tắc nền tảng:</strong> Trong Python, chúng ta thông thường viết một câu lệnh trên mỗi dòng và thụt lề tất cả các câu lệnh trong một khối lồng nhau cùng một khoảng cách như nhau (<em>thụt lề là một phần của cú pháp Python</em>).</li>
          <li><strong>Những gì thêm vào và loại bỏ:</strong> Bắt buộc phải có dấu hai chấm <code>:</code> ở cuối dòng tiêu đề; đồng thời loại bỏ ngoặc đơn điều kiện, dấu chấm phẩy và dấu ngoặc nhọn bao quanh khối lệnh của ngôn ngữ họ C.</li>
          <li><strong>Các ngoại lệ linh hoạt:</strong> Các dòng nối tiếp bằng cặp ngoặc cú pháp <code>()</code>, <code>[]</code>, <code>{}</code> và dấu <code>\\</code>; cùng các điều kiện kiểm tra và vòng lặp trên một dòng đơn sau dấu hai chấm.</li>
          <li><strong>Thực tiễn sinh động:</strong> Chúng ta đã đưa những ý tưởng này vào thực tế trong một tập lệnh tương tác REPL nhằm minh họa một số câu lệnh và cho thấy cú pháp câu lệnh khi vận hành thực tế.</li>
        </ul>

        <h3>Cầu nối chuyển tiếp sang Chương 11</h3>
        <p>Trong chương tiếp theo (Chương 11), chúng ta sẽ bắt đầu đi sâu hơn bằng cách khảo sát kỹ lưỡng từng câu lệnh thủ tục cơ bản của Python: <strong>các sắc thái phong phú của câu lệnh gán, các câu lệnh biểu thức, và câu lệnh print chuyên biệt</strong>. Tuy nhiên, như bạn sẽ thấy, tất cả các câu lệnh đó đều tuân theo những quy tắc chung đã được giới thiệu tại đây.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Trọn Bộ 8 Câu Hỏi Ôn Tập Kiến Thức & Lời Giải Chi Tiết của Mark Lutz',
      content: `
        <p>Dưới đây là phần trình bày và phân tích chi tiết cho toàn bộ <strong>8 câu hỏi kiểm tra kiến thức</strong> nguyên bản từ trang 20–21 của giáo trình Mark Lutz:</p>

        <h3>Câu 1: Ba điều nào bắt buộc phải có trong ngôn ngữ họ C nhưng lại được lược bỏ trong Python?</h3>
        <p><strong>Lời giải:</strong> Các ngôn ngữ họ C đòi hỏi: (1) dấu ngoặc đơn bao quanh các điều kiện kiểm tra trong một số câu lệnh, (2) dấu chấm phẩy ở cuối mỗi câu lệnh, và (3) dấu ngoặc nhọn bao quanh một khối lệnh lồng nhau. Python không yêu cầu bất kỳ điều nào trong số ba điều này (nhưng thêm vào dấu hai chấm <code>:</code> ở cuối dòng tiêu đề).</p>

        <h3>Câu 2: Một câu lệnh thông thường được kết thúc như thế nào trong Python?</h3>
        <p><strong>Lời giải:</strong> Việc kết thúc một dòng (hết dòng) thông thường sẽ kết thúc câu lệnh xuất hiện trên dòng đó. Ngoài ra, nếu có nhiều hơn một câu lệnh xuất hiện trên cùng một dòng, chúng có thể được phân tách bằng dấu chấm phẩy; tương tự như vậy, nếu một câu lệnh trải dài trên nhiều dòng, bạn phải kết thúc nó bằng cách đóng cặp dấu ngoặc cú pháp tương ứng.</p>

        <h3>Câu 3: Các câu lệnh trong một khối lệnh lồng nhau thông thường được liên kết với nhau như thế nào trong Python?</h3>
        <p><strong>Lời giải:</strong> Các câu lệnh (các dòng mã) trong một khối lệnh lồng nhau đều được thụt lề cùng một số lượng ký tự tab hoặc khoảng trắng như nhau theo một cột dọc.</p>

        <h3>Câu 4: Làm thế nào để bạn có thể làm cho một câu lệnh đơn trải dài trên nhiều dòng?</h3>
        <p><strong>Lời giải:</strong> Bạn có thể làm cho một câu lệnh trải dài trên nhiều dòng bằng cách bao bọc một phần của nó trong dấu ngoặc đơn, ngoặc vuông hoặc ngoặc nhọn; câu lệnh sẽ kết thúc khi Python gặp dòng chứa phần đóng tương ứng của cặp dấu ngoặc (ngoài ra có thể kết thúc dòng bằng dấu gạch chéo ngược <code>\\</code>, nhưng không được khuyến khích).</p>

        <h3>Câu 5: Làm thế nào để bạn có thể viết một câu lệnh phức hợp trên một dòng đơn?</h3>
        <p><strong>Lời giải:</strong> Phần thân của một câu lệnh phức hợp có thể được đưa lên cùng dòng tiêu đề phía sau dấu hai chấm, nhưng chỉ khi phần thân đó hoàn toàn chỉ bao gồm các câu lệnh không phức hợp (câu lệnh đơn).</p>

        <h3>Câu 6: Có lý do chính đáng nào để gõ dấu chấm phẩy ở cuối câu lệnh trong Python không?</h3>
        <p><strong>Lời giải:</strong> Chỉ khi bạn cần dồn nhiều hơn một câu lệnh lên một dòng mã duy nhất. Ngay cả khi đó, điều này chỉ hoạt động nếu tất cả các câu lệnh đều là câu lệnh đơn, và điều này không được khuyến khích vì nó có thể dẫn đến mã nguồn khó đọc.</p>

        <h3>Câu 7: Câu lệnh try được dùng để làm gì?</h3>
        <p><strong>Lời giải:</strong> Câu lệnh <code>try</code> được sử dụng để bắt và phục hồi từ các ngoại lệ (lỗi) trong một tập lệnh Python. Nó thường là giải pháp thay thế cho việc kiểm tra lỗi thủ công trong mã nguồn (triết lý EAFP).</p>

        <h3>Câu 8: Lỗi lập trình phổ biến nhất đối với những người mới bắt đầu học Python là gì?</h3>
        <p><strong>Lời giải:</strong> Quên gõ ký tự dấu hai chấm (<code>:</code>) ở cuối dòng tiêu đề trong một câu lệnh phức hợp là lỗi phổ biến nhất của người mới bắt đầu. Nếu bạn mới làm quen với Python và chưa từng mắc lỗi này, có lẽ bạn sẽ sớm mắc phải nó thôi!</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng thực nghiệm các điểm ngữ pháp trong 8 câu hỏi của Mark Lutz',
          code: `# Câu 1 & 8: Dấu hai chấm bắt buộc, không ngoặc đơn, không chấm phẩy
x, y = 10, 5
if x > y:
    # Câu 3: Thụt lề liên kết khối
    print("Câu 1, 3, 8 - Thỏa mãn quy tắc cú pháp!")

# Câu 4: Dòng nối tiếp bằng cặp ngoặc vạn năng
danh_sach = (
    x +
    y
)
print("Câu 4 - Dòng nối tiếp:", danh_sach)

# Câu 5 & 6: Dồn lệnh đơn bằng dấu chấm phẩy và lệnh một dòng
if x > y: z = 1; w = 2; print(f"Câu 5, 6 - Dồn lệnh: z={z}, w={w}")

# Câu 7: Bắt và phục hồi lỗi với câu lệnh try
try:
    loi = int('khong_phai_so')
except ValueError:
    print("Câu 7 - try bắt ngoại lệ thành công!")`,
          output: `Câu 1, 3, 8 - Thỏa mãn quy tắc cú pháp!
Câu 4 - Dòng nối tiếp: 15
Câu 5, 6 - Dồn lệnh: z=1, w=2
Câu 7 - try bắt ngoại lệ thành công!`,
          annotations: [
            { line: 3, text: 'Câu lệnh if chuẩn: có dấu hai chấm, không ngoặc đơn quanh điều kiện.' },
            { line: 8, text: 'Cặp ngoặc đơn cho phép trải dòng tự do an toàn.' },
            { line: 15, text: 'Phần thân if một dòng chứa hai phép gán và một lời gọi print phân tách bằng dấu ;.' },
            { line: 18, text: 'Khối try/except chặn đứng ValueError và phục hồi luồng chạy.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời dặn dò từ Mark Lutz',
        content: 'Nếu bạn thực hiện đúng những gì bạn vốn dĩ nên làm trong một ngôn ngữ họ C (thụt lề mã nguồn để dễ đọc), nhưng vứt bỏ đi các dấu ngoặc nhọn, dấu ngoặc đơn thừa và dấu chấm phẩy, thì mã nguồn của bạn sẽ tự nhiên thỏa mãn toàn bộ các quy tắc cú pháp của Python!'
      }
    ],
    pitfalls: [
      {
        title: 'Đừng tạo thói quen gõ dấu chấm phẩy vô nghĩa',
        content: 'Nhiều lập trình viên từ Java/C# chuyển sang vẫn giữ thói quen gõ dấu chấm phẩy <code>;</code> ở đuôi mỗi dòng mã Python. Mặc dù Python không báo lỗi, điều này được coi là một "code smell" trong cộng đồng Python và khiến mã của bạn trông xa lạ với phong cách Pythoneers.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tự kiểm tra: 8 Quy tắc vàng của cú pháp Python',
      level: 'Dễ',
      problem: 'Hãy viết một đoạn mã Python ngắn (dưới 10 dòng) thể hiện đầy đủ 4 đặc điểm: (1) câu lệnh phức hợp có dấu hai chấm, (2) dòng nối tiếp bằng cặp ngoặc, (3) khối lệnh lồng nhau thụt lề 4 khoảng trắng, và (4) một câu lệnh một dòng.',
      hint: 'Kết hợp if/else, danh sách trong cặp ngoặc vuông, và một lệnh if một dòng.',
      solutionCode: `# Đoạn mã hội tụ 4 đặc điểm cú pháp vàng:
danh_sach = [
    'Python',
    '3.14'
]

if len(danh_sach) > 0:
    for item in danh_sach:
        if item == 'Python': print("Tìm thấy:", item)`,
      solutionOutput: `Tìm thấy: Python`,
      explanation: 'Đoạn mã kết hợp hài hòa giữa dòng nối tiếp của list, câu lệnh if/for có dấu hai chấm, thụt lề phân cấp và lệnh if một dòng.'
    }
  ],

  quiz: [
    {
      question: 'Theo Mark Lutz, lỗi lập trình phổ biến nhất đối với những người mới bắt đầu học Python là gì?',
      options: [
        'Đặt sai tên biến.',
        'Quên gõ ký tự dấu hai chấm (:) ở cuối dòng tiêu đề trong câu lệnh phức hợp.',
        'Dùng sai kiểu dữ liệu của số thực.',
        'Quên import thư viện math.'
      ],
      correctIndex: 1,
      explanation: 'Quên dấu hai chấm (:) ở cuối dòng tiêu đề là lỗi phổ biến nhất của người mới học, dẫn đến SyntaxError: expected \':\'.'
    },
    {
      question: 'Trường hợp nào sau đây là lý do chính đáng DUY NHẤT để gõ dấu chấm phẩy (;) trong Python?',
      options: [
        'Khi muốn kết thúc một câu lệnh return.',
        'Khi muốn dồn nhiều câu lệnh đơn lên cùng một dòng duy nhất.',
        'Khi muốn khai báo biến toàn cục global.',
        'Khi muốn đóng một khối lệnh try.'
      ],
      correctIndex: 1,
      explanation: 'Dấu chấm phẩy trong Python chỉ bắt buộc khi bạn muốn dồn nhiều câu lệnh đơn lên cùng một dòng duy nhất với vai trò là dấu phân tách câu lệnh.'
    },
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về vai trò của câu lệnh try trong Python?',
      options: [
        'Dùng để kiểm tra cú pháp của chương trình trước khi biên dịch.',
        'Dùng để tăng tốc độ thực thi của vòng lặp for.',
        'Dùng để bắt và phục hồi từ các ngoại lệ (lỗi) trong tập lệnh, thay thế cho việc kiểm tra thủ công.',
        'Dùng để ép kiểu dữ liệu từ chuỗi sang số nguyên bắt buộc.'
      ],
      correctIndex: 2,
      explanation: 'Câu lệnh try được sử dụng để bắt và phục hồi từ các ngoại lệ (lỗi), là nền tảng của triết lý EAFP trong Python.'
    }
  ],

  summary: [
    'Chương 10 đã trang bị toàn bộ mô hình cú pháp nền tảng của ngôn ngữ Python: kết thúc dòng, thụt lề vật lý và dấu hai chấm.',
    'Ba thành phần rườm rà của ngôn ngữ họ C (ngoặc đơn điều kiện, chấm phẩy, ngoặc nhọn) bị loại bỏ có chủ ý để nâng cao khả năng đọc hiểu.',
    'Các trường hợp đặc biệt: dồn lệnh bằng chấm phẩy, dòng nối tiếp tự nhiên bằng cặp ngoặc (), [], {} và lệnh một dòng sau dấu hai chấm.',
    'Chương 11 tiếp theo sẽ khảo sát chi tiết từng câu lệnh thủ tục cơ bản: các sắc thái của câu lệnh gán, biểu thức và câu lệnh print.'
  ]
};
