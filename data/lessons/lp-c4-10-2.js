export default {
  id: 'lp-c4-10-2',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.10.2',
  title: 'Các kiểu cốt lõi khác: Số Thập phân (Decimal) & Phân số (Fraction)',
  subtitle: 'Khắc phục sai số dấu phẩy động IEEE 754, module decimal cho tài chính và module fractions cho toán học chính xác',
  level: 'Trung bình',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên nhân gốc rễ của sai số làm tròn dấu phẩy động (float IEEE 754) trong phần cứng máy tính.',
    'Sử dụng module decimal và đối tượng Decimal cho các phép tính tiền tệ và tài chính đòi hỏi độ chính xác cố định.',
    'Áp dụng module fractions và đối tượng Fraction để thực hiện phép toán phân số hữu tỉ chính xác tuyệt đối.',
    'Nắm vững cách điều khiển độ chính xác toàn cục bằng decimal.getcontext().prec.'
  ],

  intuition: {
    title: 'Thước đo thợ mộc vs Kính hiển vi phòng thí nghiệm',
    metaphor: 'Kiểu float thông thường giống như một chiếc thước dây thợ mộc: nó đo rất nhanh, đủ tốt cho 99% công việc hàng ngày, nhưng khi chia 1 mét thành 3 phần thì mỗi phần sẽ bị lệch vài micromet (0.3333333333333333). Đối với ngân hàng tính tiền lãi hay các nhà khoa học, một xu bị lệch cũng là tai họa. Kiểu Decimal và Fraction giống như kính hiển vi điện tử: chúng giữ nguyên từng con số thập phân và phân số nguyên bản (2/3 + 1/2 = 7/6) mà không làm mất đi một phần triệu giá trị nào.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH ĐỘ CHÍNH XÁC: 2/3 + 1/2</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);font-size:0.8rem;">SỐ THỰC FLOAT</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin:4px 0;">1.1666666666666665</div>
            <div style="font-size:0.7rem;color:var(--text-muted);">(Có sai số làm tròn phần cứng)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);font-size:0.8rem;">PHÂN SỐ FRACTION</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin:4px 0;">Fraction(7, 6)</div>
            <div style="font-size:0.7rem;color:var(--success);">(Chính xác tuyệt đối 7/6)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Hạn chế của Số thực Dấu phẩy động (Float)',
      content: `
        <p>Kiểu số thực <code>float</code> tiêu chuẩn trong Python được cài đặt trực tiếp bằng kiểu <code>double</code> của ngôn ngữ C, tuân thủ chuẩn phần cứng IEEE 754. Chuẩn này biểu diễn các số thập phân dưới dạng nhị phân cơ số 2.</p>
        <p>Bởi vì nhiều số thập phân quen thuộc (như 0.1 hay 1/3) không thể biểu diễn hữu hạn dưới dạng nhị phân, các phép toán float thường mang theo một lượng sai số làm tròn nhỏ:</p>
      `,
      codeExamples: [
        {
          title: 'Hiện tượng sai số làm tròn trên kiểu float',
          code: `>>> 1 / 3
0.3333333333333333
>>> (2 / 3) + (1 / 2)
1.1666666666666665
>>> 0.1 + 0.1 + 0.1 - 0.3
5.551115123125783e-17`,
          output: `0.3333333333333333
1.1666666666666665
5.551115123125783e-17`,
          annotations: [
            { line: 3, text: 'Kết quả mang số 5 ở cuối thay vì số 6 tròn trĩnh.' },
            { line: 5, text: '0.1 + 0.1 + 0.1 - 0.3 không ra 0 mà ra một số siêu nhỏ 5.55e-17!' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Số Thập phân Cố định: Module decimal',
      content: `
        <p>Để giải quyết bài toán tính toán tài chính, kế toán và tiền tệ — nơi mỗi xu đều phải chính xác tuyệt đối — Python cung cấp module <code>decimal</code>.</p>
        <p>Đối tượng <code>Decimal</code> lưu trữ các con số thập phân dưới dạng cơ số 10 với độ chính xác cố định do người dùng kiểm soát:</p>
      `,
      codeExamples: [
        {
          title: 'Tính toán chính xác với đối tượng Decimal',
          code: `>>> import decimal
>>> d = decimal.Decimal('3.141')
>>> d + 1
Decimal('4.141')
>>> decimal.getcontext().prec = 2    # Đặt độ chính xác hiển thị toàn cục là 2 chữ số
>>> decimal.Decimal('1.00') / decimal.Decimal('3.00')
Decimal('0.33')`,
          output: `Decimal('4.141')
Decimal('0.33')`,
          annotations: [
            { line: 2, text: 'Khởi tạo Decimal từ chuỗi ký tự \'3.141\' để tránh sai số float ban đầu.' },
            { line: 5, text: 'decimal.getcontext().prec thiết lập độ chính xác tính toán.' },
            { line: 7, text: 'Kết quả được làm tròn chính xác về 2 chữ số thập phân 0.33.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phân số Hữu tỉ: Module fractions',
      content: `
        <p>Đối với các bài toán đại số cần bảo toàn giá trị phân số nguyên bản mà không chuyển thành số thập phân, Python cung cấp module <code>fractions</code> với đối tượng <code>Fraction</code>:</p>
        <p>Đối tượng <code>Fraction</code> lưu trữ riêng biệt tử số và mẫu số nguyên, tự động rút gọn phân số và thực hiện các phép cộng trừ nhân chia hoàn toàn chính xác:</p>
      `,
      codeExamples: [
        {
          title: 'Phép toán phân số chính xác với Fraction',
          code: `>>> from fractions import Fraction
>>> f = Fraction(2, 3)             # Phân số 2/3
>>> f + 1
Fraction(5, 3)
>>> Fraction(2, 3) + Fraction(1, 2) # 2/3 + 1/2 = 4/6 + 3/6 = 7/6
Fraction(7, 6)`,
          output: `Fraction(5, 3)
Fraction(7, 6)`,
          annotations: [
            { line: 2, text: 'Fraction(2, 3) đại diện cho phân số 2/3.' },
            { line: 5, text: '2/3 + 1/2 cho kết quả chính xác tuyệt đối 7/6 mà không có bất kỳ sai số nào.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy truyền float vào Decimal: Decimal(0.1)',
        content: `
          <p>Nếu bạn viết <code>Decimal(0.1)</code> (truyền một số float), Python sẽ lấy chính xác giá trị nhị phân đã bị lệch của float: <code>Decimal('0.1000000000000000055511151231257827021181583404541015625')</code>.</p>
          <p>Hãy <strong>luôn luôn truyền chuỗi ký tự</strong> khi khởi tạo Decimal: <code>Decimal('0.1')</code>!</p>
        `
      }
    ],
    tips: [
      {
        title: 'Độ phức tạp và Tốc độ',
        content: `
          <p>Các phép toán trên <code>float</code> được thực thi trực tiếp bằng bóng bán dẫn trên CPU nên cực nhanh. Phép toán trên <code>Decimal</code> và <code>Fraction</code> được phần mềm mô phỏng nên chậm hơn. Do đó, hãy dùng <code>float</code> cho đồ họa, trò chơi và thuật toán máy học; chỉ dùng <code>Decimal/Fraction</code> khi đòi hỏi độ chính xác số học nghiêm ngặt.</p>
        `
      }
    ],
    deepDive: {
      title: 'Tầng C của module _decimal trong CPython',
      content: `
        <p>Để cải thiện hiệu năng cho các ứng dụng tài chính lớn của phố Wall, kể từ Python 3.3, module <code>decimal</code> đã được viết lại hoàn toàn bằng thư viện C (<code>_decimal</code> / <code>libmpdec</code>). Nhờ đó, tốc độ xử lý của <code>Decimal</code> trong Python hiện đại đã nhanh hơn từ 20 đến 120 lần so với các phiên bản Python cũ viết thuần bằng Python.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Tính toán tiền thuế chính xác cho hóa đơn',
      level: 'Dễ',
      description: 'Cho đơn giá sản phẩm <code>19.99</code> USD và mức thuế suất <code>8.25%</code>. Hãy dùng module <code>decimal</code> để tính số tiền thuế và tổng số tiền thanh toán, làm tròn đến đúng 2 chữ số thập phân (cent).',
      starterCode: `from decimal import Decimal, ROUND_HALF_UP

price = Decimal('19.99')
tax_rate = Decimal('0.0825')

# Tính tax và total
`,
      solution: `from decimal import Decimal, ROUND_HALF_UP

price = Decimal('19.99')
tax_rate = Decimal('0.0825')

tax = (price * tax_rate).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
total = price + tax

print("Tiền thuế:", tax)
print("Tổng thanh toán:", total)`,
      solutionOutput: `Tiền thuế: 1.65
Tổng thanh toán: 21.64`,
      explanation: 'Sử dụng <code>quantize(Decimal(\'0.01\'))</code> đảm bảo quy tắc làm tròn tài chính chuẩn xác từng cent.'
    },
    {
      title: 'Tìm ước lượng phân số của số Pi',
      level: 'Vừa',
      description: 'Sử dụng phương thức <code>limit_denominator()</code> của đối tượng <code>Fraction</code> để tìm phân số gần đúng nhất của số <code>3.1415926535</code> với mẫu số không vượt quá 100.',
      starterCode: `from fractions import Fraction

pi_val = 3.1415926535
# Tìm phân số gần đúng với mẫu số <= 100
`,
      solution: `from fractions import Fraction

pi_val = 3.1415926535
pi_fraction = Fraction(pi_val).limit_denominator(100)
print("Phân số xấp xỉ Pi:", pi_fraction)
print("Giá trị float:", float(pi_fraction))`,
      solutionOutput: `Phân số xấp xỉ Pi: 22/7
Giá trị float: 3.142857142857143`,
      explanation: '<code>limit_denominator(100)</code> tìm ra phân số kinh điển 22/7 do Archimedes khám phá ra cách đây hơn 2000 năm.'
    }
  ],

  quiz: [
    {
      question: 'Tại sao trong Python biểu thức 0.1 + 0.1 + 0.1 == 0.3 lại trả về False?',
      options: [
        'Do lỗi trong trình biên dịch Python 3.',
        'Do số thực float tuân theo chuẩn phần cứng IEEE 754 lưu dưới dạng nhị phân, dẫn đến sai số làm tròn.',
        'Do toán tử == không dùng được với số thực.',
        'Do Python tự động ép kiểu thành số nguyên.'
      ],
      correctIndex: 1,
      explanation: 'Số 0.1 là số thập phân vô hạn tuần hoàn trong hệ nhị phân, gây ra sai số làm tròn phần cứng.'
    },
    {
      question: 'Cách khởi tạo đối tượng Decimal nào sau đây là CHÍNH XÁC NHẤT để tránh nhận sai số từ float?',
      options: [
        'Decimal(0.1)',
        'Decimal(\'0.1\')',
        'Decimal.from_float(0.1)',
        'Decimal[0.1]'
      ],
      correctIndex: 1,
      explanation: 'Khởi tạo bằng chuỗi ký tự Decimal(\'0.1\') bảo toàn chính xác giá trị thập phân ban đầu.'
    },
    {
      question: 'Kết quả của biểu thức Fraction(1, 3) + Fraction(1, 6) là gì?',
      options: [
        '0.5',
        'Fraction(2, 9)',
        'Fraction(1, 2)',
        'Fraction(3, 6)'
      ],
      correctIndex: 2,
      explanation: '1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2. Fraction tự động rút gọn về tối giản Fraction(1, 2).'
    }
  ],

  summary: [
    'Số thực float IEEE 754 bị hạn chế bởi sai số làm tròn nhị phân phần cứng máy tính.',
    'Module decimal cung cấp kiểu Decimal với độ chính xác cố định cho các ứng dụng kế toán và tiền tệ.',
    'Module fractions cung cấp kiểu Fraction hỗ trợ các phép toán đại số phân số hữu tỉ chính xác tuyệt đối.',
    'Cần phân bổ hợp lý: dùng float cho tốc độ, dùng Decimal/Fraction cho sự chính xác số học.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 32–33.'
  ]
};
