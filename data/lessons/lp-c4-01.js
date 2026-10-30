export default {
  id: 'lp-c4-01',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.1',
  title: 'Hệ thống cấp bậc khái niệm của Python',
  subtitle: 'Bức tranh toàn cảnh 4 cấp: Module, câu lệnh, biểu thức và đối tượng — Cùng Khung chuyên đề về 3 trụ cột truyền thống',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững 4 cấp độ trong hệ thống phân cấp cấu trúc của một chương trình Python.',
    'Hiểu vị trí xuất phát của Phần II: bắt đầu từ tầng dưới cùng là các đối tượng dựng sẵn và biểu thức.',
    'Thấy rõ mối quan hệ giữa đối tượng dựng sẵn và các lớp trong lập trình hướng đối tượng (OOP).',
    'Hiểu thấu suốt Khung chuyên đề: vì sao phân chia lập trình theo 3 trụ cột truyền thống (tuần tự, lựa chọn, lặp) lại khiên cưỡng trong Python so với nguyên lý thống nhất về đối tượng.'
  ],

  intuition: {
    title: 'Ngôi nhà xây từ từng viên gạch',
    metaphor: 'Hãy hình dung một chương trình Python giống như một tòa nhà phức hợp. Cả tòa nhà là một "Chương trình". Tòa nhà được chia thành các căn hộ độc lập — đó là các "Module". Trong mỗi căn hộ có các bức tường chịu lực định hình không gian sống — đó là các "Câu lệnh" (statements). Để xây dựng nên bức tường, người thợ ghép các hàng gạch bằng vữa liên kết — đó là các "Biểu thức" (expressions). Và bản thân từng viên gạch đặc chắc mang kích thước, hình dạng và độ cứng cụ thể — đó chính là các "Đối tượng" (objects). Bạn không thể xây nhà nếu không có gạch; trong Python, đối tượng là viên gạch nền tảng của mọi cấu trúc.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HỆ THỐNG PHÂN CẤP 4 TẦNG TRONG PYTHON</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--border-strong);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-weight:700;color:var(--text-primary);">1. CHƯƠNG TRÌNH (Program)</span>
            <span style="font-size:0.75rem;color:var(--text-muted);background:var(--bg-surface-alt);padding:2px 8px;border-radius:4px;">Cấp cao nhất: Cấu thành từ các module</span>
          </div>
          <div style="text-align:center;color:var(--text-muted);font-size:0.9rem;">▲ chứa ▲</div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-weight:700;color:var(--accent-primary);">2. MODULE</span>
            <span style="font-size:0.75rem;color:var(--text-muted);background:var(--bg-surface-alt);padding:2px 8px;border-radius:4px;">File .py: Chứa các câu lệnh (Statements)</span>
          </div>
          <div style="text-align:center;color:var(--text-muted);font-size:0.9rem;">▲ chứa ▲</div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--warning);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-weight:700;color:var(--warning);">3. CÂU LỆNH (Statements)</span>
            <span style="font-size:0.75rem;color:var(--text-muted);background:var(--bg-surface-alt);padding:2px 8px;border-radius:4px;">Cấu trúc điều khiển & Quản lý: Chứa các biểu thức</span>
          </div>
          <div style="text-align:center;color:var(--text-muted);font-size:0.9rem;">▲ chứa ▲</div>
          <div style="padding:10px 14px;background:var(--accent-soft);border:2px solid var(--success);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-weight:700;color:var(--success);">4. BIỂU THỨC (Expressions) ──► ĐỐI TƯỢNG (Objects)</span>
            <span style="font-size:0.75rem;color:var(--success);font-weight:600;">Tầng xuất phát: Tạo ra & Xử lý đối tượng</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bốn Cấp bậc Khái niệm trong Kiến trúc Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 1–2 / 38</strong>.</p>
          </div>
        </div>

        <p>Trước khi đi vào phần mã nguồn chi tiết, tác giả Mark Lutz phác thảo một bức tranh toàn cảnh rõ ràng về vị trí ăn khớp của Chương 4 trong bức tranh tổng thể về Python. Dưới góc nhìn phân rã cấu trúc, các chương trình Python được phân rã thành 4 cấp bậc cơ bản từ trên xuống dưới:</p>
        <ol>
          <li><strong>Chương trình (Program)</strong> được cấu thành từ các module.</li>
          <li><strong>Module</strong> chứa các câu lệnh (statements).</li>
          <li><strong>Câu lệnh</strong> chứa các biểu thức (expressions).</li>
          <li><strong>Biểu thức</strong> tạo ra và xử lý các đối tượng (objects).</li>
        </ol>
        <p>Phần thảo luận về module ở Chương 3 đã giới thiệu cấp độ cao nhất của hệ thống phân cấp này. Toàn bộ các chương trong Phần II hiện tại sẽ bắt đầu từ <strong>tầng dưới cùng của hệ thống</strong>: khám phá cả các đối tượng dựng sẵn lẫn các biểu thức mà bạn có thể lập trình để sử dụng chúng.</p>
        <p>Chúng ta sẽ chuyển sang tìm hiểu các câu lệnh ở phần tiếp theo của cuốn sách, dù bạn sẽ thấy rằng các câu lệnh thực tế phần lớn tồn tại nhằm quản lý các đối tượng mà bạn gặp ở đây.</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa 4 cấp bậc khái niệm qua một đoạn mã ngắn',
          code: `# Cấp 2: Module math (được nạp vào)
import math

# Cấp 3: Câu lệnh gán (Assignment Statement)
# Cấp 4: Biểu thức 2 * math.pi * 5 tạo ra đối tượng số float 31.4159...
chu_vi = 2 * math.pi * 5

# Cấp 3: Câu lệnh gọi hàm print
# Cấp 4: Biểu thức f-string sinh ra đối tượng chuỗi
print(f"Chu vi hình tròn bán kính 5: {chu_vi:.2f}")`,
          output: `Chu vi hình tròn bán kính 5: 31.42`,
          annotations: [
            { line: 2, text: 'Câu lệnh import math quản lý cấp module.' },
            { line: 6, text: 'Câu lệnh gán chu_vi = ... bao bọc biểu thức số học tạo đối tượng float.' },
            { line: 10, text: 'Câu lệnh gọi hàm print nhận đối tượng chuỗi sinh ra từ biểu thức f-string.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Đối tượng Dựng sẵn là Điểm Xuất phát Bắt buộc cho OOP',
      content: `
        <p>Xa hơn nữa trong giáo trình, khi chúng ta bước tới chủ đề về lớp trong phần lập trình hướng đối tượng (Object-Oriented Programming - OOP), bạn sẽ khám phá ra rằng:</p>
        <blockquote>
          <em>"Các lớp cho phép bạn tự định nghĩa những kiểu đối tượng mới của riêng mình, bằng cách vừa sử dụng vừa mô phỏng lại các kiểu đối tượng dựng sẵn mà bạn khám phá ở phần này."</em>
        </blockquote>
        <p>Ví dụ, một lớp đại diện cho tài khoản ngân hàng bên trong sẽ dùng các đối tượng số dựng sẵn để ghi số dư và chuỗi dựng sẵn để lưu tên chủ tài khoản. Một cấu trúc ngăn xếp (stack) hay hàng đợi (queue) tùy biến sẽ gói gọn hoặc kế thừa một danh sách (<code>list</code>) dựng sẵn.</p>
        <p>Vì tất cả những lý do đó, <strong>các đối tượng dựng sẵn là điểm xuất phát bắt buộc cho mọi hành trình học Python</strong>. Bạn không thể hiểu được OOP hay cấu trúc chương trình nếu chưa nắm chắc các viên gạch đối tượng nguyên tử này.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Khung chuyên đề: Giới thiệu Truyền thống về Lập trình',
      content: `
        <details class="deep-dive-details" open>
          <summary class="deep-dive-summary">
            <span>🔍 Khung chuyên đề: Khoảnh khắc thuật ngữ — Giới thiệu truyền thống về lập trình (Mark Lutz)</span>
            <span class="deep-dive-toggle-hint">Trang 2 / 38 ▾</span>
          </summary>
          <div class="deep-dive-content">
            <p><strong>Khoảnh khắc thuật ngữ:</strong> Các bài giảng nhập môn lập trình truyền thống thường nhấn mạnh ba trụ cột nền tảng:</p>
            <ul>
              <li><strong>Tuần tự (Sequence):</strong> <em>"Làm việc này, sau đó việc kia"</em>.</li>
              <li><strong>Lựa chọn (Selection):</strong> <em>"Làm việc này nếu điều kiện kia đúng"</em>.</li>
              <li><strong>Lặp lại (Iteration):</strong> <em>"Làm việc này nhiều lần"</em>.</li>
            </ul>
            <p>Python sở hữu các công cụ thuộc cả ba nhóm này, và những thuật ngữ trên có thể giúp bạn sắp xếp tư duy trong giai đoạn đầu. <strong>Tuy nhiên, chúng cũng mang tính khiên cưỡng, đơn giản hóa quá mức và dễ gây nhầm lẫn:</strong></p>
            <ol>
              <li>Chẳng hạn, các công cụ hiện đại như cú pháp rút gọn <strong>comprehension vừa là phép lặp vừa là phép lựa chọn</strong> (khi có mệnh đề <code>if</code> lọc dữ liệu) tích hợp trên cùng một dòng biểu thức.</li>
              <li>Những thuật ngữ này lại mang các ý nghĩa chuyên biệt khác trong Python: từ "dãy tuần tự" (sequence) trong Python dùng để chỉ một danh mục kiểu dữ liệu có vị trí (như <code>str</code>, <code>list</code>, <code>tuple</code>), chứ không chỉ đơn thuần là thứ tự thực thi câu lệnh.</li>
              <li>Nhiều khái niệm nâng cao sau này (như generator, coroutine, context manager, decorator, metaclass) sẽ hoàn toàn không thể gò ép vào khuôn mẫu ba trụ cột đó được.</li>
            </ol>
            <p style="margin-top:10px;padding:10px 14px;background:var(--bg-surface);border-left:3px solid var(--accent-primary);border-radius:4px;">
              <strong>Kết luận của tác giả:</strong> Trong Python, <em>nguyên lý thống nhất mạnh mẽ hơn cả chính là các đối tượng và những gì chúng ta có thể làm với chúng</em>. Để hiểu rõ lý do, hãy cùng đọc tiếp sang bài tiếp theo.
            </p>
          </div>
        </details>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy nhầm lẫn giữa Biểu thức (Expression) và Câu lệnh (Statement)',
        content: 'Một <strong>biểu thức</strong> luôn tính toán ra một giá trị (một đối tượng), ví dụ: <code>2 + 3</code>, <code>s.upper()</code>, <code>[x * 2 for x in data]</code>. Trong khi đó, một <strong>câu lệnh</strong> thực thi một hành động quản lý và không tự nó có giá trị trả về, ví dụ: câu lệnh gán <code>x = 5</code>, câu lệnh <code>if</code>, câu lệnh <code>for</code>, câu lệnh <code>import</code>.'
      }
    ],
    tips: [
      {
        title: 'Tầng xuất phát chiến lược',
        content: 'Bằng cách bắt đầu từ tầng đáy (Đối tượng & Biểu thức) trước khi học Câu lệnh và Module, bạn sẽ hiểu bản chất vì sao các câu lệnh lại được thiết kế theo cú pháp như vậy — chúng sinh ra chính là để phục vụ cho các đối tượng.'
      }
    ]
  },

  exercises: [
    {
      title: 'Nhận diện thành phần trong hệ thống phân cấp',
      level: 'Dễ',
      problem: 'Cho đoạn mã sau:<br><code>import math</code><br><code>dien_tich = math.pi * (r ** 2)</code><br>Hãy phân loại từng phần của đoạn mã theo 4 cấp bậc khái niệm của Python.',
      hint: 'Đối chiếu với 4 cấp: Module, Câu lệnh, Biểu thức, Đối tượng.',
      solutionCode: `# Phân tích chi tiết:
# Cấp 1 & 2: import math             -> Câu lệnh nạp Module math
# Cấp 3:     dien_tich = ...         -> Câu lệnh gán (Statement)
# Cấp 4:     math.pi * (r ** 2)      -> Biểu thức số học (Expression)
# Tầng đáy:  math.pi, r, 2, kết quả  -> Các Đối tượng (Objects) trong RAM`,
      solutionOutput: `Phân cấp rõ ràng từ Module -> Statement -> Expression -> Object`,
      explanation: '<code>import math</code> là câu lệnh module; <code>dien_tich = ...</code> là câu lệnh gán; vế phải <code>math.pi * (r ** 2)</code> là biểu thức; các thực thể tham gia tính toán là các đối tượng số thực và số nguyên.'
    },
    {
      title: 'Chứng minh comprehension phá vỡ ranh giới 3 trụ cột truyền thống',
      level: 'Vừa',
      problem: 'Viết một biểu thức list comprehension lọc ra bình phương của các số chẵn từ danh sách <code>[1, 2, 3, 4, 5, 6]</code>. Giải thích vì sao nó vừa mang tính "lặp" vừa mang tính "lựa chọn".',
      hint: 'Dùng cú pháp <code>[x**2 for x in data if x % 2 == 0]</code>.',
      solutionCode: `numbers = [1, 2, 3, 4, 5, 6]
# Biểu thức comprehension kết hợp cả lặp và lựa chọn trên 1 dòng duy nhất:
even_squares = [x ** 2 for x in numbers if x % 2 == 0]
print(even_squares)`,
      solutionOutput: `[4, 16, 36]`,
      explanation: 'Vòng lặp <code>for x in numbers</code> thể hiện tính chất "lặp lại" (iteration); mệnh đề <code>if x % 2 == 0</code> thể hiện tính chất "lựa chọn" (selection). Comprehension hợp nhất cả hai trong một biểu thức đơn giản, chứng minh sự khiên cưỡng khi chia tách lập trình thành các khuôn mẫu cứng nhắc.'
    }
  ],

  quiz: [
    {
      question: 'Trong hệ thống phân cấp 4 cấp của Python do Mark Lutz mô tả, thứ tự từ cấp cao nhất đến cấp thấp nhất là gì?',
      options: [
        'Module → Biểu thức → Câu lệnh → Đối tượng',
        'Chương trình (Module) → Câu lệnh → Biểu thức → Đối tượng',
        'Câu lệnh → Module → Biểu thức → Đối tượng',
        'Đối tượng → Biểu thức → Câu lệnh → Module'
      ],
      correctIndex: 1,
      explanation: 'Hệ thống gồm 4 cấp: (1) Chương trình cấu thành từ module; (2) Module chứa câu lệnh; (3) Câu lệnh chứa biểu thức; (4) Biểu thức tạo ra và xử lý các đối tượng.'
    },
    {
      question: 'Tại sao các chương trong Phần II của cuốn sách lại bắt đầu nghiên cứu từ tầng dưới cùng (đối tượng cốt lõi) thay vì từ câu lệnh hay module?',
      options: [
        'Vì đối tượng dễ học hơn câu lệnh và không đòi hỏi tư duy logic.',
        'Vì các câu lệnh phần lớn tồn tại nhằm quản lý đối tượng, và các lớp (OOP) được xây dựng dựa trên việc sử dụng và mô phỏng các đối tượng dựng sẵn.',
        'Vì Python không hỗ trợ lập trình module nếu chưa khai báo đối tượng từ trước.',
        'Vì trình thông dịch Python chỉ có thể biên dịch đối tượng trước khi đọc câu lệnh.'
      ],
      correctIndex: 1,
      explanation: 'Các câu lệnh chủ yếu phục vụ việc quản lý đối tượng, và các lớp OOP đều xây dựng trên nền tảng các kiểu đối tượng dựng sẵn. Do đó đối tượng là điểm xuất phát bắt buộc.'
    },
    {
      question: 'Theo Khung chuyên đề của sách, tại sao cách chia lập trình thành 3 trụ cột truyền thống (tuần tự, lựa chọn, lặp) lại bị coi là khiên cưỡng trong Python?',
      options: [
        'Vì Python không có vòng lặp for hay câu lệnh if.',
        'Vì Python chỉ chạy tuần tự mà không cho phép rẽ nhánh điều kiện.',
        'Vì nhiều công cụ (như comprehension) kết hợp cả lặp và lựa chọn, từ "dãy tuần tự" mang nghĩa kiểu dữ liệu trong Python, và nguyên lý đối tượng mới là thứ thống nhất mạnh mẽ hơn.',
        'Vì mô hình 3 trụ cột chỉ áp dụng cho ngôn ngữ Assembly và C.'
      ],
      correctIndex: 2,
      explanation: 'Mark Lutz giải thích rằng comprehension vừa lặp vừa chọn, từ "dãy tuần tự" có nghĩa chuyên biệt trong Python, và nguyên lý thống nhất thực sự là đối tượng cùng những gì ta có thể làm với chúng.'
    }
  ],

  summary: [
    'Chương trình Python phân rã thành 4 cấp: Chương trình cấu thành từ Module → Module chứa Câu lệnh → Câu lệnh chứa Biểu thức → Biểu thức tạo và xử lý Đối tượng.',
    'Phần II tập trung vào tầng đáy cốt lõi: các đối tượng dựng sẵn và các biểu thức thao tác với chúng.',
    'Các lớp trong lập trình hướng đối tượng (OOP) vừa sử dụng vừa mô phỏng lại các kiểu đối tượng dựng sẵn.',
    'Cách tiếp cận truyền thống qua 3 trụ cột (tuần tự, lựa chọn, lặp lại) quá gò bó; nguyên lý thống nhất mạnh mẽ hơn của Python là đối tượng.',
    'Ý chính: Mọi kiến trúc phức tạp trong Python đều bắt nguồn từ các biểu thức sản sinh và thao tác lên đối tượng.'
  ]
};
