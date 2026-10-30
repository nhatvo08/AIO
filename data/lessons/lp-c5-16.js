export default {
  id: 'lp-c5-16',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.16',
  title: 'Đối tượng Phân số (Fraction Objects) & So sánh Độ chính xác Số học',
  subtitle: 'Biểu diễn hữu tỉ với tử số và mẫu số rõ ràng, tự động rút gọn ước chung và đối chiếu trực diện Float - Decimal - Fraction',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên lý hoạt động của đối tượng Fraction: lưu giữ cặp tử số và mẫu số nguyên để biểu diễn số hữu tỉ hoàn hảo.',
    'Thực hành tạo phân số từ các cặp số nguyên, chuỗi thập phân, và tự động rút gọn qua ước chung lớn nhất (GCD).',
    'Thực hiện các phép toán số học (+, -, *, /) trên phân số và nhận lại kết quả dạng phân số tối giản.',
    'So sánh trực diện hành vi và độ chính xác của 3 công cụ: Float (phần cứng nhị phân), Decimal (cơ số 10) và Fraction (hữu tỉ).',
    'Làm chủ các phương thức chuyển đổi: as_integer_ratio(), from_float(), và ép kiểu float().'
  ],

  intuition: {
    title: 'Chiếc bánh pizza và ba cách chia sẻ',
    metaphor: 'Hãy tưởng tượng bạn có một chiếc bánh pizza và muốn chia đều cho 3 người. Nếu dùng thước đo float nhị phân của máy tính, mỗi người được 0.3333333333333333 phần chiếc bánh (vẫn thiếu một mảnh vụn siêu nhỏ). Nếu dùng Decimal với độ chính xác 2 chữ số, mỗi người được 0.33 phần chiếc bánh. Nhưng đối tượng Fraction thì tuyên bố đanh thép: "Mỗi người được chính xác 1/3 chiếc bánh!". Khi gộp 3 phần lại (1/3 + 1/3 + 1/3), Fraction trả về đúng 1/1 — chiếc bánh nguyên vẹn 100% không mất đi dù chỉ là một hạt bụi.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">ĐỐI CHIẾU TRỰC DIỆN 3 HỆ THỐNG SỐ HỌC TRÊN PHÉP TÍNH 1/3</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:12px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--text-muted);margin-bottom:4px;">1. Float (Phần cứng)</div>
            <div style="font-size:0.85rem;color:var(--accent-primary);">1 / 3</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;"><code>0.3333333333333333</code><br>Xấp xỉ nhị phân IEEE 754</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:4px;">2. Decimal (Cơ số 10)</div>
            <div style="font-size:0.85rem;color:var(--warning);">Decimal(1) / Decimal(3)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;"><code>Decimal('0.33')</code><br>Giới hạn độ chính xác cố định</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">3. Fraction (Hữu tỉ)</div>
            <div style="font-size:0.85rem;color:var(--success);">Fraction(1, 3)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;"><code>Fraction(1, 3)</code> (1/3)<br>Bảo toàn tử số & mẫu số tuyệt đối</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Cơ bản về Đối tượng Phân số (Fraction Objects)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 25 / 38 – Trang 27 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Module <code>fractions</code> trong thư viện chuẩn của Python hiện thực hóa một đối tượng số hữu tỉ. Về cơ bản, nó <strong>lưu giữ rõ ràng cả tử số (numerator) và mẫu số (denominator)</strong>, nhằm tránh sự thiếu chính xác và các giới hạn cố hữu của toán học dấu phẩy động.</p>
        <p><code>Fraction</code> là một "người anh em họ" về mặt chức năng với đối tượng <code>Decimal</code>, vì cả hai đều có thể được sử dụng để giải quyết các sai số toán học của số thực float. Khi bạn tạo một phân số, Python sẽ <strong>tự động rút gọn phân số</strong> về dạng tối giản bằng cách tìm ước chung lớn nhất (GCD):</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo và tính toán cơ bản với Fraction',
          code: `>>> from fractions import Fraction
>>> x = Fraction(1, 3)        # Tử số 1, mẫu số 3
>>> y = Fraction(4, 6)        # Tự động rút gọn thành 2/3 nhờ ước chung lớn nhất
>>> x
Fraction(1, 3)
>>> y
Fraction(2, 3)
>>> print(y)
2/3
>>> x + y                     # Phép cộng: 1/3 + 2/3 = 3/3 -> 1/1
Fraction(1, 1)
>>> x - y                     # Phép trừ: 1/3 - 2/3 = -1/3
Fraction(-1, 3)
>>> x * y                     # Phép nhân: 1/3 * 2/3 = 2/9
Fraction(2, 9)`,
          output: `Fraction(1, 3)
Fraction(2, 3)
2/3
Fraction(1, 1)
Fraction(-1, 3)
Fraction(2, 9)`,
          annotations: [
            { line: 3, text: 'Fraction(4, 6) tự động tìm ước chung lớn nhất là 2 để rút gọn thành Fraction(2, 3).' },
            { line: 7, text: 'Lệnh print(y) hiển thị phân số dưới dạng thân thiện: "2/3".' },
            { line: 9, text: 'Mọi phép toán số học đều cho ra kết quả là một đối tượng Fraction tối giản mới.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Khởi tạo từ Chuỗi và So sánh Độ chính xác Số học',
      content: `
        <p>Các đối tượng phân số cũng có thể được tạo từ các chuỗi số thực dấu phẩy động (rất giống với <code>Decimal</code>):</p>
        <pre class="code-block"><code>>>> Fraction('.25')
Fraction(1, 4)
>>> Fraction('1.25')
Fraction(5, 4)
>>> Fraction('.25') + Fraction('1.25')
Fraction(3, 2)</code></pre>

        <h4>Độ chính xác số học trong phân số và số thập phân</h4>
        <p>Để thấy rõ sự khác biệt giữa toán học phân số và toán học float, hãy quan sát cùng một loạt phép tính được chạy bằng ba cơ chế khác nhau:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh Float, Fraction và Decimal',
          code: `>>> # 1. Dùng số thực Float thông thường:
>>> 0.1 + 0.1 + 0.1 - 0.3
5.551115123125783e-17

>>> # 2. Dùng Phân số Fraction:
>>> from fractions import Fraction
>>> Fraction(1, 10) + Fraction(1, 10) + Fraction(1, 10) - Fraction(3, 10)
Fraction(0, 1)

>>> # 3. Dùng Thập phân Decimal:
>>> from decimal import Decimal
>>> Decimal('0.1') + Decimal('0.1') + Decimal('0.1') - Decimal('0.3')
Decimal('0.0')`,
          output: `5.551115123125783e-17
Fraction(0, 1)
Decimal('0.0')`,
          annotations: [
            { line: 2, text: 'Float bị trôi một sai số tí hon ở chữ số thứ 17.' },
            { line: 7, text: 'Fraction giữ đúng 0/1 (tức bằng 0 tuyệt đối).' },
            { line: 12, text: 'Decimal cho ra chính xác Decimal("0.0").' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Tự động Rút gọn và Các Phương thức Chuyển đổi Qua lại',
      content: `
        <p>Trên thực tế, phân số vừa duy trì độ chính xác vừa tự động rút gọn kết quả qua từng bước tính toán:</p>
        <pre class="code-block"><code>>>> (1 / 3) + (6 / 12)                              # Float: 0.8333333333333333
0.8333333333333333
>>> Fraction(1, 3) + Fraction(6, 12)                # Fraction: 1/3 + 1/2 = 5/6
Fraction(5, 6)
>>> decimal.Decimal(1 / 3) + decimal.Decimal(6 / 12)
Decimal('0.8333333333333333296288674981')</code></pre>
        <p>Để hỗ trợ chuyển đổi qua lại giữa các kiểu số học:</p>
        <ul>
          <li>Các đối tượng số thực float có phương thức <strong><code>as_integer_ratio()</code></strong> giúp trả về một bộ tuple gồm tử số và mẫu số tương đương: <code>(2.5).as_integer_ratio() -> (5, 2)</code>.</li>
          <li>Đối tượng phân số có phương thức <strong><code>Fraction.from_float()</code></strong>.</li>
          <li>Hàm dựng sẵn <strong><code>float()</code></strong> chấp nhận một <code>Fraction</code> làm đối số để chuyển đổi ngược về số thực: <code>float(Fraction(5, 6)) -> 0.8333333333333334</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi giữa Float và Fraction',
          code: `>>> (2.5).as_integer_ratio()           # Trả về tử số và mẫu số
(5, 2)
>>> Fraction.from_float(2.5)           # Tạo Fraction từ float
Fraction(5, 2)
>>> float(Fraction(5, 2))              # Ép kiểu Fraction sang float
2.5`,
          output: `(5, 2)
Fraction(5, 2)
2.5`,
          annotations: [
            { line: 2, text: 'Phương thức as_integer_ratio() của float phân tích 2.5 thành tỷ số 5/2.' },
            { line: 4, text: 'Tạo đối tượng Fraction(5, 2) chính xác.' },
            { line: 6, text: 'float() khôi phục lại giá trị dấu phẩy động thông thường.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào nên dùng Decimal và khi nào nên dùng Fraction?',
        content: 'Hãy dùng <strong>Decimal</strong> khi bạn xử lý dữ liệu con người viết bằng hệ thập phân hữu hạn (như tiền lương, giá bán 19.99 USD, thuế suất). Hãy dùng <strong>Fraction</strong> khi bài toán mang bản chất toán học thuần túy hoặc tỷ lệ phân chia không thể biểu diễn hữu hạn trong hệ thập phân (như chia 3 phần, tỷ lệ góc, đại số số học).'
      }
    ]
  },

  exercises: [
    {
      title: 'Cộng một danh sách phân số và tính trung bình',
      level: 'Dễ',
      problem: 'Cho ba phân số hữu tỉ: 1/4, 1/3 và 1/2. Hãy dùng đối tượng Fraction để tính tổng và giá trị trung bình chính xác của ba phân số này dưới dạng phân số tối giản.',
      hint: 'Khởi tạo các Fraction rồi cộng lại và chia cho 3.',
      solutionCode: `from fractions import Fraction

p1 = Fraction(1, 4)
p2 = Fraction(1, 3)
p3 = Fraction(1, 2)

tong = p1 + p2 + p3
trung_binh = tong / 3

print("Tổng ba phân số:", tong)
print("Trung bình cộng:", trung_binh)`,
      solutionOutput: `Tổng ba phân số: 13/12
Trung bình cộng: 13/36`,
      explanation: '1/4 + 1/3 + 1/2 = 3/12 + 4/12 + 6/12 = 13/12. Trung bình cộng là (13/12) / 3 = 13/36. Cả hai kết quả đều được Fraction tự động rút gọn tối giản.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn khởi tạo Fraction(4, 6) trong Python, đối tượng trả về sẽ có tử số và mẫu số lần lượt là bao nhiêu?',
      options: [
        'Tử số là 4 và mẫu số là 6 (giữ nguyên).',
        'Tử số là 2 và mẫu số là 3 (tự động rút gọn qua GCD).',
        'Báo lỗi ValueError vì 4/6 không phải phân số tối giản.',
        'Tự động chuyển thành số thực float 0.6666666666666666.'
      ],
      correctIndex: 1,
      explanation: 'Hàm khởi tạo Fraction tự động tìm ước chung lớn nhất (greatest common divisor - gcd) của tử số và mẫu số để rút gọn phân số về dạng tối giản nhất (2 và 3).'
    },
    {
      question: 'Phương thức nào của số thực float cho phép trả về một cặp tuple gồm tử số và mẫu số nguyên tương đương?',
      options: [
        'float.to_fraction()',
        'float.as_integer_ratio()',
        'float.numerator_denominator()',
        'float.ratio()'
      ],
      correctIndex: 1,
      explanation: 'Phương thức as_integer_ratio() trên các đối tượng số thực float trả về một cặp tuple (tử_số, mẫu_số) biểu diễn chính xác giá trị dấu phẩy động đó.'
    }
  ],

  summary: [
    'Đối tượng Fraction trong module fractions biểu diễn số hữu tỉ bằng cặp tử số và mẫu số nguyên.',
    'Fraction tự động rút gọn về phân số tối giản nhờ ước chung lớn nhất (GCD).',
    'Phân số có thể khởi tạo từ hai số nguyên (1, 3), chuỗi thập phân (".25"), hoặc từ float.',
    'So với float (sai số nhị phân) và Decimal (làm tròn cơ số 10), Fraction bảo toàn độ chính xác tuyệt đối trên các phép chia hữu tỉ.',
    'Phương thức as_integer_ratio() của float và from_float() của Fraction giúp chuyển đổi mượt mà giữa hai kiểu.'
  ]
};