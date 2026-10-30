export default {
  id: 'lp-c10-02',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.2',
  title: 'Câu chuyện về hai câu lệnh if — Dấu hai chấm & Những gì Python loại bỏ',
  subtitle: 'So sánh cú pháp rẽ nhánh giữa C và Python, khuôn mẫu dòng tiêu đề (header line) với dấu hai chấm bắt buộc, và 3 thành phần rườm rà được Python lược bỏ',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'So sánh trực quan sự khác biệt cú pháp giữa câu lệnh if trong các ngôn ngữ họ C (C, C++, Java, JS) và Python.',
    'Nắm vững quy tắc dấu hai chấm (:) ở cuối dòng tiêu đề (header line) của mọi câu lệnh phức hợp trong Python.',
    'Hiểu rõ khuôn mẫu câu lệnh phức hợp chuẩn tắc: Header line: theo sau bởi khối lệnh lồng nhau (suite/block).',
    'Chỉ ra 3 thành phần cú pháp họ C mà Python đã có chủ ý loại bỏ: dấu ngoặc đơn bao quanh điều kiện, dấu chấm phẩy kết thúc dòng, và dấu ngoặc nhọn bao quanh khối lệnh.'
  ],

  intuition: {
    title: 'Bỏ đi những giàn giáo rườm rà của công trình',
    metaphor: 'Hãy tưởng tượng bạn đang xây một ngôi nhà bằng gạch. Trong các ngôn ngữ họ C, người ta vừa xây tường bằng cách thụt gạch vào trong, lại vừa bắt buộc phải dựng thêm những bộ giàn giáo cồng kềnh: hai thanh giằng ngoặc đơn kẹp chặt bản thiết kế (x > y), những chiếc đinh ghim chấm phẩy cắm ở đuôi từng viên gạch (;), và hai cánh cổng ngoặc nhọn kềnh càng ({ và }) bao bọc xung quanh. Python nhìn vào công trình và nhận ra: chỉ cần xếp các viên gạch thẳng hàng ngay ngắn (thụt lề) và gắn một chiếc biển chỉ dẫn duy nhất ở đầu hàng (dấu hai chấm :), ngôi nhà vẫn đứng vững chãi mà thoáng đãng hơn gấp bội!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">ĐỐI CHIẾU CÚ PHÁP: NGÔN NGỮ HỌ C VS PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="color:var(--danger);font-weight:700;margin-bottom:6px;">NGÔN NGỮ HỌ C (C, C++, Java, JS)</div>
            <pre style="margin:0;color:var(--text-secondary);font-size:0.82rem;line-height:1.4;"><code>if <span style="color:var(--danger);">(x &gt; y)</span> <span style="color:var(--danger);">{</span>
    x = 1<span style="color:var(--danger);">;</span>
    y = 2<span style="color:var(--danger);">;</span>
<span style="color:var(--danger);">}</span></code></pre>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;">Ngoặc đơn + Chấm phẩy + Ngoặc nhọn</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;">
            <div style="color:var(--success);font-weight:700;margin-bottom:6px;">PYTHON (Tối giản &amp; Trực quan)</div>
            <pre style="margin:0;color:var(--text-primary);font-size:0.82rem;line-height:1.4;"><code>if x &gt; y<span style="color:var(--accent-primary);font-weight:700;">:</span>
    x = 1
    y = 2</code></pre>
            <div style="font-size:0.75rem;color:var(--accent-text);margin-top:6px;">Dấu hai chấm (:) + Thụt lề đồng nhất</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Câu Chuyện về Hai Câu Lệnh if',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 5–7 / 21</strong>.</p>
          </div>
        </div>

        <p>Trước khi đi sâu vào chi tiết của từng câu lệnh cụ thể trong Bảng 10-1, Mark Lutz muốn nhấn mạnh một trong những khía cạnh độc đáo và mang tính bản sắc nhất trong mô hình cú pháp của Python: <strong>việc sử dụng độ thụt lề (indentation) để phân định các khối lệnh</strong>.</p>
        <p>Để minh họa điều này, chúng ta hãy xem xét ví dụ quen thuộc nhất về cú pháp câu lệnh khi hoạt động: <strong>câu lệnh <code>if</code></strong>.</p>
        <p>Trong một ngôn ngữ họ C như C, C++, C#, Java hay JavaScript, một phép kiểm tra <code>if</code> đơn giản thường được viết:</p>
        <pre><code>if (x &gt; y) {
    x = 1;
    y = 2;
}</code></pre>
        <p>Trong Python, câu lệnh hoàn toàn tương đương về mặt logic được viết như sau:</p>
        <pre><code>if x &gt; y:
    x = 1
    y = 2</code></pre>
        <p>Thoạt nhìn, phiên bản Python có vẻ tương tự, nhưng nó <strong>đòi hỏi gõ ít ký tự hơn đáng kể</strong> và có <strong>ít thành phần thị giác cần phải phân tích cú pháp hơn</strong>. Mắt người đọc lướt qua mã nguồn một cách tự nhiên và mạch lạc mà không bị phân tâm bởi các ký tự dấu câu kỹ thuật.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Những Gì Python Thêm Vào: Dấu Hai Chấm Bắt Buộc',
      content: `
        <p>Yêu cầu cú pháp duy nhất mà Python thêm vào câu lệnh <code>if</code> chính là <strong>ký tự dấu hai chấm (<code>:</code>) ở cuối dòng đầu tiên</strong>.</p>
        <p>Tất cả các <strong>câu lệnh phức hợp (compound statements)</strong> trong Python—những câu lệnh có các câu lệnh khác lồng bên trong nó (như <code>if</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>class</code>, <code>try</code>)—đều tuân theo cùng một khuôn mẫu chung bất di bất dịch này:</p>
        <blockquote>
          <p><strong>Header line:</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;<strong>Nested statement block</strong> (khối lệnh lồng nhau, đôi khi gọi là <em>suite</em>)</p>
        </blockquote>
        <p>Quy tắc này gồm hai vế gắn liền:</p>
        <ol>
          <li><strong>Dòng tiêu đề (header line)</strong> chứa từ khóa điều khiển, biểu thức điều kiện (nếu có), và <em>bắt buộc phải kết thúc bằng dấu hai chấm</em>.</li>
          <li><strong>Khối lệnh lồng nhau (block/suite)</strong> theo sau bên dưới dòng tiêu đề, bắt buộc phải được <em>thụt lề đồng nhất về phía bên phải</em>.</li>
        </ol>
        <p><strong>Dấu hai chấm là bắt buộc.</strong> Quên dấu hai chấm có lẽ là sai sót phổ biến nhất của những người mới bắt đầu học Python, nhưng trình phân tích cú pháp (parser) của Python bắt buộc phải có nó: việc bỏ quên dấu hai chấm sẽ dẫn đến lỗi cú pháp <code>SyntaxError</code> ngay lập tức.</p>
      `,
      codeExamples: [
        {
          title: 'Trình thông dịch bắt lỗi SyntaxError ngay khi thiếu dấu hai chấm',
          code: `# Thử nghiệm quên dấu hai chấm trong biểu thức if
try:
    exec("if x > y\\n    x = 1")
except SyntaxError as e:
    print(f"Bắt lỗi thành công: {type(e).__name__}: {e.msg}")
    print(f"Dòng lỗi: {e.text.strip()}")
    print(f"Vị trí con trỏ parser: {' ' * (e.offset - 1)}^")`,
          output: `Bắt lỗi thành công: SyntaxError: expected ':'
Dòng lỗi: if x > y
Vị trí con trỏ parser:         ^`,
          annotations: [
            { line: 3, text: 'Chuỗi mã thiếu dấu hai chấm ở cuối dòng if.' },
            { line: 7, text: 'Con trỏ parser (dấu ^) chỉ chính xác vị trí cuối dòng cần bổ sung dấu hai chấm.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Những Gì Python Loại Bỏ (Ba Thành Phần Cú Pháp Họ C)',
      content: `
        <p>Mặc dù Python bắt buộc phải có dấu hai chấm, nó lại <strong>loại bỏ ba thành phần cú pháp</strong> vốn rất phổ biến và mang tính bắt buộc trong các ngôn ngữ họ C:</p>

        <h3>1. Dấu ngoặc đơn bao quanh điều kiện là tùy chọn (Optional)</h3>
        <p>Biểu thức điều kiện kiểm tra ở đầu câu lệnh không yêu cầu phải có dấu ngoặc đơn. Bạn có thể bao bọc điều kiện trong dấu ngoặc đơn nếu muốn (chẳng hạn để trải dài một điều kiện phức tạp trên nhiều dòng), nhưng chúng không bắt buộc:</p>
        <ul>
          <li>Cách viết 1: <code>if (x &lt; y):</code> (hợp lệ nhưng thừa ký tự).</li>
          <li>Cách viết 2: <code>if x &lt; y:</code> (<strong>chuẩn mực Python</strong>, ngắn gọn và tự nhiên).</li>
        </ul>

        <h3>2. Hết dòng là hết câu lệnh (Không cần dấu chấm phẩy)</h3>
        <p>Trong Python, các câu lệnh không kết thúc bằng dấu chấm phẩy (<code>;</code>). Thay vào đó, <strong>việc kết thúc một dòng (hết dòng) thông thường sẽ kết thúc câu lệnh xuất hiện trên dòng đó</strong>.</p>
        <ul>
          <li>Bạn có thể kết thúc câu lệnh bằng dấu chấm phẩy nếu muốn (<code>x = 1;</code>), nhưng điều đó hoàn toàn dư thừa.</li>
          <li>Cách viết chuẩn mực là <code>x = 1</code>. Dấu chấm phẩy chỉ bắt buộc trong trường hợp ngoại lệ: khi bạn muốn dồn nhiều câu lệnh đơn lên cùng một dòng duy nhất.</li>
        </ul>

        <h3>3. Dấu ngoặc nhọn bao quanh khối lệnh bị loại bỏ hoàn toàn</h3>
        <p>Python không dùng dấu ngoặc nhọn <code>{}</code> để bao quanh các khối lệnh lồng nhau. Độ thụt lề vật lý sẽ đảm nhận trọn vẹn vai trò phân định ranh giới bắt đầu và kết thúc của khối lệnh.</p>
      `,
      codeExamples: [
        {
          title: 'Phong cách viết điều kiện chuẩn mực trong Python',
          code: `a = 15
b = 10

# Chuẩn mực: Không ngoặc đơn thừa quanh điều kiện, không dấu chấm phẩy
if a > b:
    thong_bao = "a lớn hơn b"
    do_lech = a - b

print(f"{thong_bao}, chênh lệch = {do_lech}")`,
          output: `a lớn hơn b, chênh lệch = 5`,
          annotations: [
            { line: 5, text: 'if a > b: không có ngoặc đơn bao quanh điều kiện và kết thúc bằng dấu hai chấm.' },
            { line: 6, text: 'Các câu lệnh bên trong khối lệnh không cần dấu chấm phẩy ở cuối dòng.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào nên dùng ngoặc đơn trong câu lệnh if?',
        content: 'Chỉ nên dùng dấu ngoặc đơn quanh điều kiện <code>if</code> khi bạn cần kết hợp nhiều phép toán logic phức tạp và muốn tận dụng quy tắc dòng nối tiếp tự nhiên (line continuation) để ngắt xuống nhiều dòng mà không gây lỗi cú pháp.'
      }
    ],
    pitfalls: [
      {
        title: 'Quên dấu hai chấm (:) khi chuyển từ C/Java/JS sang Python',
        content: 'Lập trình viên chuyển từ C++, Java hay JavaScript sang Python thường có thói quen gõ <code>if (x > y)</code> rồi mở ngoặc nhọn <code>{</code> ngay mà quên mất dấu hai chấm <code>:</code>. Hãy luôn ghi nhớ: <em>Dòng tiêu đề của mọi câu lệnh phức hợp trong Python bắt buộc phải chốt lại bằng dấu hai chấm!</em>'
      }
    ],
    deepDive: {
      title: 'Triết lý thiết kế của Guido van Rossum',
      content: '<p>Guido van Rossum (cha đẻ của Python) nhận thấy rằng trong 99% trường hợp, lập trình viên C đã thụt lề mã nguồn để mắt người dễ đọc, nhưng trình biên dịch C lại chỉ tin vào dấu ngoặc nhọn. Nếu việc thụt lề đã là bắt buộc đối với con người, tại sao lại bắt con người phải gõ thêm dấu ngoặc nhọn cho máy tính? Python loại bỏ sự trùng lặp thừa thãi này bằng cách biến chính thụt lề thành cú pháp chính thức.</p>'
    }
  },

  exercises: [
    {
      title: 'Chuyển đổi câu lệnh if từ cú pháp C sang chuẩn Python',
      level: 'Dễ',
      problem: 'Hãy chuyển đổi đoạn mã C sau sang cú pháp chuẩn mực, ngắn gọn nhất của Python:\\n\\n<code>if (diem_so >= 50) {\\n    ket_qua = "Đỗ";\\n    print(ket_qua);\\n}</code>',
      hint: 'Bỏ dấu ngoặc đơn quanh điều kiện, thêm dấu hai chấm ở cuối dòng if, bỏ dấu ngoặc nhọn, bỏ các dấu chấm phẩy và thụt lề 4 khoảng trắng.',
      solutionCode: `diem_so = 75

# Chuyển đổi sang Python chuẩn mực:
if diem_so >= 50:
    ket_qua = "Đỗ"
    print(ket_qua)`,
      solutionOutput: `Đỗ`,
      explanation: 'Phiên bản Python loại bỏ cặp ngoặc đơn thừa, hai dấu chấm phẩy, cặp ngoặc nhọn và dùng dấu hai chấm kết hợp thụt lề để phân định khối.'
    },
    {
      title: 'Phát hiện và sửa lỗi cú pháp thiếu dấu hai chấm',
      level: 'Vừa',
      problem: 'Đoạn mã sau bị lỗi cú pháp gì và làm sao để sửa lại cho đúng?\\n\\n<code>so = 42\\nif so % 2 == 0\\n    print("Số chẵn")</code>',
      hint: 'Dòng tiêu đề if kết thúc ở đâu và thiếu ký tự bắt buộc nào?',
      solutionCode: `so = 42

# Sửa lại bằng cách bổ sung dấu hai chấm (:) ở cuối dòng if
if so % 2 == 0:
    print("Số chẵn")`,
      solutionOutput: `Số chẵn`,
      explanation: 'Dòng <code>if so % 2 == 0</code> thiếu dấu hai chấm bắt buộc ở cuối dòng tiêu đề, dẫn đến <code>SyntaxError: expected \':\'</code>.'
    }
  ],

  quiz: [
    {
      question: 'Yêu cầu cú pháp DUY NHẤT mà Python thêm vào câu lệnh if so với các ngôn ngữ họ C là gì?',
      options: [
        'Dấu chấm phẩy ở cuối dòng tiêu đề.',
        'Dấu hai chấm (:) ở cuối dòng tiêu đề.',
        'Từ khóa then sau biểu thức điều kiện.',
        'Dấu ngoặc vuông bao quanh biểu thức so sánh.'
      ],
      correctIndex: 1,
      explanation: 'Yêu cầu cú pháp duy nhất mà Python thêm vào dòng tiêu đề của câu lệnh if và mọi câu lệnh phức hợp khác là ký tự dấu hai chấm (:).'
    },
    {
      question: 'Phát biểu nào sau đây thể hiện ĐÚNG quy tắc của Python về dấu ngoặc đơn trong điều kiện kiểm tra if?',
      options: [
        'Dấu ngoặc đơn là bắt buộc, thiếu sẽ gây SyntaxError.',
        'Dấu ngoặc đơn bị cấm hoàn toàn trong câu lệnh if.',
        'Dấu ngoặc đơn là tùy chọn; dạng không có ngoặc đơn là cách viết chuẩn mực của Python.',
        'Dấu ngoặc đơn chỉ được phép dùng khi có từ khóa elif.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python, dấu ngoặc đơn quanh biểu thức điều kiện là tùy chọn (optional). Cách viết chuẩn mực và phổ biến nhất trong Python là không dùng ngoặc đơn.'
    },
    {
      question: 'Ba thành phần cú pháp nào trong các ngôn ngữ họ C được Python chủ động loại bỏ?',
      options: [
        'Từ khóa if, toán tử so sánh ==, câu lệnh return.',
        'Dấu ngoặc đơn quanh điều kiện, dấu chấm phẩy sau câu lệnh, dấu ngoặc nhọn quanh khối lệnh.',
        'Tên biến, hàm in dữ liệu, toán tử gán =.',
        'Các chú thích, ký tự khoảng trắng, kiểu số nguyên int.'
      ],
      correctIndex: 1,
      explanation: 'Python loại bỏ 3 thành phần rườm rà của C: dấu ngoặc đơn bao quanh điều kiện, dấu chấm phẩy kết thúc câu lệnh và dấu ngoặc nhọn bao quanh khối lệnh.'
    }
  ],

  summary: [
    'Python đơn giản hóa cú pháp rẽ nhánh bằng việc loại bỏ ngoặc đơn điều kiện, dấu chấm phẩy và ngoặc nhọn.',
    'Dấu hai chấm (:) là yêu cầu cú pháp bắt buộc ở cuối dòng tiêu đề (header line) của mọi câu lệnh phức hợp.',
    'Khuôn mẫu câu lệnh phức hợp chuẩn: Header line: theo sau bởi khối lệnh lồng nhau (block/suite) được thụt lề đồng nhất.',
    'Việc hết dòng thông thường đồng nghĩa với hết câu lệnh; dấu chấm phẩy là dư thừa trừ khi dồn nhiều câu lệnh đơn trên cùng một dòng.'
  ]
};
