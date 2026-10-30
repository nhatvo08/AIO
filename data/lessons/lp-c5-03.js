export default {
  id: 'lp-c5-03',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.3',
  title: 'Độ ưu tiên, Dấu ngoặc đơn, Nâng kiểu tự động & Tính đa hình',
  subtitle: 'Quy tắc kết hợp biểu thức, tháp nâng kiểu số học int → float → complex, và bản chất nạp chồng toán tử',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững 2 quy tắc độ ưu tiên và hướng kết hợp (trái sang phải, riêng lũy thừa ** từ phải sang trái).',
    'Hiểu sức mạnh của dấu ngoặc đơn: ghi đè trật tự ưu tiên và gia tăng tối đa tính dễ đọc của mã nguồn.',
    'Làm chủ quy tắc tự động nâng kiểu (converted up) trong biểu thức số học hỗn hợp theo tháp: int < float < complex.',
    'Nhận biết nguyên lý Nạp chồng toán tử (operator overloading) và Tính đa hình (polymorphism) qua hành vi của toán tử +.'
  ],

  intuition: {
    title: 'Dòng chảy tự nhiên và người điều phối giao thông',
    metaphor: 'Khi bạn hòa một thìa đường (số nguyên) vào một cốc nước (số thực float), đường sẽ tan biến vào nước để biến toàn bộ thành một cốc nước đường (kết quả mang kiểu float). Python cũng xử lý các kiểu hỗn hợp y như vậy: kiểu đơn giản hơn sẽ tự động "hòa tan" và nâng cấp lên kiểu phức tạp hơn. Còn dấu ngoặc đơn () giống như một người cảnh sát điều phối giao thông: dù dòng xe có đông đúc và các toán tử có chen lấn thế nào theo luật ưu tiên mặc định, hễ cảnh sát ngoắc tay ưu tiên làn nào trong ngoặc, làn đó lập tức được đi trước!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">THÁP NÂNG KIỂU SỐ HỌC TỰ ĐỘNG (CONVERTED UP)</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;">
          <div style="padding:10px 16px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Đơn giản nhất</div>
            <div style="font-weight:700;color:var(--accent-primary);">int</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">40</div>
          </div>
          <div style="font-size:1.2rem;color:var(--accent-primary);">── nâng lên ──►</div>
          <div style="padding:10px 16px;background:var(--bg-surface);border:2px solid var(--success);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Phức tạp hơn</div>
            <div style="font-weight:700;color:var(--success);">float</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">40.0 + 3.14</div>
          </div>
          <div style="font-size:1.2rem;color:var(--success);">── nâng lên ──►</div>
          <div style="padding:10px 16px;background:var(--bg-surface);border:2px solid var(--warning);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Cao nhất</div>
            <div style="font-weight:700;color:var(--warning);">complex</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">(43.14 + 0j)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Quy tắc Ưu tiên và Dấu ngoặc đơn trong Biểu thức',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 6 / 38 – Trang 9 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Khi bạn viết một biểu thức có nhiều hơn một toán tử (ví dụ: <code>A * B + C * D</code>), làm thế nào Python biết được thao tác nào cần thực hiện trước? Câu trả lời nằm ở <strong>độ ưu tiên của toán tử (operator precedence)</strong>:</p>
        <ul>
          <li><strong>Vị trí trong Bảng 5-2:</strong> Các toán tử nằm ở vị trí thấp hơn trong bảng có độ ưu tiên cao hơn, và do đó liên kết chặt chẽ hơn trong các biểu thức hỗn hợp. Ví dụ: trong <code>X + Y * Z</code>, Python thực hiện phép nhân <code>Y * Z</code> trước rồi mới cộng kết quả vào <code>X</code>, vì <code>*</code> nằm thấp hơn <code>+</code>.</li>
          <li><strong>Hướng nhóm (Associativity):</strong> Các toán tử nằm cùng một hàng trong bảng nhìn chung sẽ được nhóm từ <strong>trái sang phải</strong> khi kết hợp với nhau. Ngoại lệ quan trọng: <em>phép lũy thừa <code>**</code> được nhóm từ phải sang trái</em> (ví dụ: <code>2 ** 3 ** 2</code> tương đương <code>2 ** (3 ** 2) = 512</code>, chứ không phải <code>(2 ** 3) ** 2 = 64</code>).</li>
        </ul>

        <h4>Dấu ngoặc đơn nhóm các biểu thức con</h4>
        <p>Bạn phần lớn có thể quên đi các quy tắc ưu tiên nếu bạn cẩn thận nhóm các phần của biểu thức lại bằng <strong>dấu ngoặc đơn <code>()</code></strong>. Khi bạn bao bọc các biểu thức con trong ngoặc đơn, bạn đã ghi đè lên các quy tắc ưu tiên mặc định của Python:</p>
        <pre class="code-block"><code>(X + Y) * Z    # Phép cộng được thực hiện trước vì nằm trong ngoặc
X + (Y * Z)    # Phép nhân thực hiện trước (giống mặc định nhưng tường minh)</code></pre>
        <p>Thêm dấu ngoặc đơn vào các biểu thức phức tạp là một thói quen rất tốt—nó không chỉ ép buộc thứ tự đánh giá mà bạn mong muốn, mà còn hỗ trợ đắc lực cho tính dễ đọc và bảo trì mã nguồn.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Các Kiểu Hỗn hợp được Tự động Nâng kiểu (Converted Up)',
      content: `
        <p>Bên cạnh việc kết hợp nhiều toán tử, bạn cũng có thể kết hợp các kiểu số học khác nhau trong cùng một biểu thức (ví dụ: cộng một số nguyên với một số thực: <code>40 + 3.14</code>).</p>
        <p>Câu hỏi đặt ra: kết quả thuộc kiểu gì—số nguyên hay số thực float? Quy tắc của Python như sau:</p>
        <blockquote>
          Trong các biểu thức số học kiểu hỗn hợp, các toán hạng (operands) trước tiên sẽ được <strong>tự động nâng kiểu (converted up)</strong> lên kiểu của toán hạng phức tạp nhất, và sau đó phép toán sẽ được thực hiện trên các toán hạng có cùng kiểu. Kết quả tạo ra sẽ mang kiểu của các toán hạng đã được nâng kiểu.
        </blockquote>
        <p>Tháp độ phức tạp của các kiểu số học trong Python được xếp hạng như sau:</p>
        <div style="text-align:center;font-weight:700;margin:12px 0;color:var(--accent-primary);font-size:1.05rem;">
          Số nguyên (int) &lt; Số thực dấu phẩy động (float) &lt; Số phức (complex)
        </div>
        <p>Vì vậy, khi số nguyên <code>40</code> kết hợp với số thực <code>3.14</code>, số <code>40</code> sẽ được nâng thành <code>40.0</code> trước, và phép toán cho ra <code>43.14</code> (kiểu <code>float</code>). Bạn cũng có thể chủ động ép kiểu thủ công bằng các hàm dựng sẵn như <code>int()</code> và <code>float()</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Tự động nâng kiểu và ép kiểu thủ công trong REPL',
          code: `>>> 40 + 3.14      # Số nguyên chuyển sang float, phép toán/kết quả float
43.14
>>> int(3.1415)    # Cắt phần thập phân của float thành số nguyên
3
>>> float(3)       # Chuyển đổi số nguyên thành float
3.0
>>> 3 == 3.0       # So sánh bằng: 3 được nâng thành 3.0 trước khi so sánh
True
>>> 3 > 3.0        # So sánh độ lớn: cùng giá trị
False`,
          output: `43.14
3
3.0
True
False`,
          annotations: [
            { line: 1, text: 'Phép cộng hỗn hợp tự động nâng 40 thành 40.0.' },
            { line: 3, text: 'Hàm int() cắt bỏ toàn bộ phần thập phân, giữ lại phần nguyên 3.' },
            { line: 7, text: 'Toán tử == nâng kiểu số nguyên lên float để so sánh giá trị toán học.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ranh giới Kiểu dữ liệu & Xem trước: Nạp chồng toán tử và Tính đa hình',
      content: `
        <p><strong>Lưu ý ranh giới kiểu:</strong> Việc tự động nâng kiểu <em>chỉ áp dụng khi kết hợp các đối tượng số với nhau</em>. Nhìn chung, Python không tự động chuyển đổi kiểu qua lại giữa bất kỳ ranh giới kiểu nào khác. Chẳng hạn, phép cộng chuỗi với số nguyên (<code>'42' + 1</code>) sẽ báo lỗi <code>TypeError</code> ngay lập tức thay vì tự động biến số thành chuỗi như trong JavaScript.</p>

        <h4>Nạp chồng toán tử (Operator Overloading)</h4>
        <p>Mặc dù lúc này chúng ta đang tập trung vào các kiểu số dựng sẵn, nhưng tất cả các toán tử của Python đều có thể được <strong>nạp chồng (operator overloading)</strong> bởi các lớp (class) Python để hoạt động trên những đối tượng do chính bạn tạo ra (ví dụ: tự viết class hỗ trợ <code>x + y</code>, <code>x[i]</code>).</p>

        <h4>Tính đa hình (Polymorphism)</h4>
        <p>Hơn nữa, bản thân Python cũng tự động nạp chồng một số toán tử dựng sẵn. Cùng một toán tử <code>+</code> nhưng:</p>
        <ul>
          <li>Áp dụng cho <strong>số học:</strong> thực hiện phép tính cộng (<code>3 + 4 = 7</code>).</li>
          <li>Áp dụng cho <strong>dãy tuần tự (sequence)</strong> như chuỗi (<code>str</code>) và danh sách (<code>list</code>): thực hiện phép ghép nối (concatenation).</li>
        </ul>
        <p>Đặc tính này trong khoa học máy tính được gọi là <strong>tính đa hình (polymorphism)</strong>—một thuật ngữ chỉ ra rằng <em>ý nghĩa của một thao tác phụ thuộc vào kiểu của các đối tượng đang được xử lý</em>.</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa tính đa hình của toán tử + trên các kiểu dữ liệu khác nhau',
          code: `>>> 3 + 4                  # Số học: Phép cộng
7
>>> 'Py' + 'thon'          # Chuỗi: Phép ghép nối (concatenation)
'Python'
>>> [1, 2] + [3, 4]        # Danh sách: Phép ghép nối list
[1, 2, 3, 4]`,
          output: `7
'Python'
[1, 2, 3, 4]`,
          annotations: [
            { line: 1, text: 'Toán tử + thực hiện phép cộng toán học trên các đối tượng int.' },
            { line: 3, text: 'Cùng là toán tử + nhưng thực hiện ghép nối khi áp dụng lên đối tượng chuỗi str.' },
            { line: 5, text: 'Và tạo ra danh sách mới nối liền hai danh sách ban đầu.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cấm chuyển đổi kiểu tự động qua ranh giới chuỗi và số',
        content: 'Python là ngôn ngữ có hệ thống kiểu động nhưng định kiểu rất mạnh (strongly typed). Biểu thức <code>"Hello " + 42</code> sẽ làm Python phát sinh <code>TypeError: can only concatenate str (not "int") to str</code>. Bạn bắt buộc phải chuyển đổi thủ công: <code>"Hello " + str(42)</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Xác định kiểu kết quả và giá trị của biểu thức hỗn hợp',
      level: 'Dễ',
      problem: 'Biểu thức sau đây cho ra kết quả mang kiểu dữ liệu gì và giá trị bao nhiêu: <code>2 ** 3 ** 2 + 10.0</code>?',
      hint: 'Nhớ rằng ** kết hợp từ phải sang trái, sau đó biểu thức hỗn hợp giữa int và float sẽ nâng kiểu lên float.',
      solutionCode: `# Bước 1: 3 ** 2 = 9 (nhóm từ phải sang trái)
# Bước 2: 2 ** 9 = 512 (kiểu int)
# Bước 3: 512 + 10.0 -> nâng 512 thành 512.0 -> kết quả: 522.0 (float)
kq = 2 ** 3 ** 2 + 10.0
print("Kết quả:", kq)
print("Kiểu dữ liệu:", type(kq))`,
      solutionOutput: `Kết quả: 522.0
Kiểu dữ liệu: <class 'float'>`,
      explanation: 'Phép lũy thừa <code>**</code> nhóm từ phải sang trái tính <code>3**2=9</code> rồi <code>2**9=512</code>. Sau đó phép cộng với <code>10.0</code> (float) tự động nâng 512 thành 512.0 để cho kết quả cuối cùng là <code>522.0</code> mang kiểu float.'
    }
  ],

  quiz: [
    {
      question: 'Trong biểu thức kết hợp 40 + 3.14, cơ chế nâng kiểu tự động của Python hoạt động như thế nào?',
      options: [
        'Cắt phần thập phân của 3.14 thành 3, rồi thực hiện phép cộng số nguyên 40 + 3 = 43.',
        'Nâng số nguyên 40 lên thành số thực 40.0, rồi thực hiện phép cộng dấu phẩy động cho ra 43.14.',
        'Báo lỗi TypeError vì không cho phép kết hợp các kiểu số học khác nhau.',
        'Biến cả hai thành chuỗi ký tự rồi thực hiện phép ghép nối thành "403.14".'
      ],
      correctIndex: 1,
      explanation: 'Python xếp hạng int < float < complex. Số nguyên 40 sẽ được tự động nâng kiểu lên float (40.0), và phép toán thực hiện trên hai số float cho ra kết quả kiểu float (43.14).'
    },
    {
      question: 'Hiện tượng toán tử + thực hiện phép cộng khi gặp số nhưng thực hiện phép nối khi gặp chuỗi được gọi là gì?',
      options: [
        'Tính đóng gói (Encapsulation).',
        'Tính kế thừa (Inheritance).',
        'Tính đa hình (Polymorphism).',
        'Tính trì hoãn (Lazy evaluation).'
      ],
      correctIndex: 2,
      explanation: 'Tính đa hình (polymorphism) chỉ ra rằng ý nghĩa của một thao tác phụ thuộc vào kiểu của các đối tượng đang được xử lý.'
    }
  ],

  summary: [
    'Quy tắc ưu tiên quyết định thứ tự thực hiện; hầu hết toán tử nhóm từ trái sang phải, riêng lũy thừa ** nhóm từ phải sang trái.',
    'Dấu ngoặc đơn () cho phép ghi đè mọi quy tắc ưu tiên và giúp mã nguồn rõ ràng, tường minh.',
    'Biểu thức hỗn hợp số học tự động nâng kiểu theo tháp: int < float < complex.',
    'Python không tự động chuyển đổi kiểu giữa chuỗi và số (ngôn ngữ định kiểu mạnh).',
    'Tính đa hình: cùng một toán tử (+) thực hiện các hành động khác nhau tùy thuộc vào kiểu đối tượng (cộng số hoặc ghép chuỗi).'
  ]
};