export default {
  id: 'lp-c5-15',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.15',
  title: 'Đối tượng Decimal: Số thực Thập phân Độ chính xác Cố định',
  subtitle: 'Giải quyết sai số dấu phẩy động nhị phân bằng toán học cơ số 10, thiết lập độ chính xác ngữ cảnh và ứng dụng tài chính',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên lý đối tượng Decimal: sử dụng toán học cơ số 10 để đạt độ chính xác tuyệt đối, tránh sai số nhị phân của float.',
    'Thực hành tạo đối tượng Decimal bằng cách truyền chuỗi ký tự (string literal) thay vì số float trần.',
    'Làm chủ quy tắc tự động nâng độ dài phần thập phân theo số hạng có nhiều chữ số nhất.',
    'Cấu hình độ chính xác toàn cục và chế độ làm tròn thông qua đối tượng ngữ cảnh decimal.getcontext().prec.',
    'Xác định phạm vi ứng dụng chuẩn mực: hệ thống tiền tệ, ngân hàng, hóa đơn thuế và kiểm toán.'
  ],

  intuition: {
    title: 'Hóa đơn đồng xu của nhân viên ngân hàng',
    metaphor: 'Nếu bạn mua 3 món hàng giá 0.1 USD và thanh toán bằng 0.3 USD, trên giấy tờ bạn chẳng còn nợ xu nào (0.1 + 0.1 + 0.1 - 0.3 = 0.0). Nhưng máy tính dùng số thực float IEEE 754 lại báo rằng bạn vẫn còn dư nợ 0.0000000000000000555 USD! Trong cuộc sống thường ngày thì không sao, nhưng trong hệ thống ngân hàng xử lý hàng triệu giao dịch mỗi giây, sai số này sẽ tích tụ thành hàng ngàn đô la thất thoát. Đối tượng Decimal giống như một nhân viên ngân hàng cẩn trọng: anh ta tính toán từng chữ số theo đúng hệ thập phân cơ số 10 như con người viết trên giấy, đảm bảo từng xu lẻ luôn chính xác tuyệt đối.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH PHÉP TÍNH: 0.1 + 0.1 + 0.1 - 0.3 TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--danger);border-radius:8px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">Dấu phẩy động Float (Cơ số 2)</div>
            <div style="font-size:0.85rem;color:var(--text-primary);margin-bottom:6px;"><code>0.1 + 0.1 + 0.1 - 0.3</code></div>
            <div style="font-size:0.8rem;color:var(--danger);">➔ 5.551115123125783e-17</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Lệch khỏi 0 do xấp xỉ nhị phân phần cứng.</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Thập phân Decimal (Cơ số 10)</div>
            <div style="font-size:0.85rem;color:var(--text-primary);margin-bottom:6px;"><code>Decimal('0.1')*3 - Decimal('0.3')</code></div>
            <div style="font-size:0.8rem;color:var(--success);font-weight:700;">➔ Decimal('0.0')</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Chính xác tuyệt đối 100%.</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Cơ bản về Đối tượng Decimal',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 24 / 38 – Trang 25 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Python bao gồm kiểu đối tượng số thập phân <code>Decimal</code> nằm trong module thư viện chuẩn <code>decimal</code>. Các đối tượng <code>Decimal</code> là những số thực dấu phẩy động với <strong>độ chính xác cố định (số chữ số phần thập phân cố định)</strong> do chính bạn chỉ định.</p>
        <p>Không giống như các số thực float thông thường, <code>Decimal</code> biểu diễn các con số một cách chính xác tuyệt đối, bằng cách sử dụng <strong>toán học cơ số 10</strong> thay vì toán học dấu phẩy động cơ số 2 của phần cứng máy tính.</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo Decimal và triệt tiêu hoàn toàn sai số làm tròn',
          code: `>>> 0.1 + 0.1 + 0.1 - 0.3          # Gần bằng 0, nhưng chưa hoàn toàn bằng 0
5.551115123125783e-17
>>> from decimal import Decimal
>>> Decimal('0.1') + Decimal('0.1') + Decimal('0.1') - Decimal('0.3')
Decimal('0.0')`,
          output: `5.551115123125783e-17
Decimal('0.0')`,
          annotations: [
            { line: 1, text: 'Toán học float cơ số 2 bị giới hạn độ chính xác phần cứng.' },
            { line: 4, text: 'Với Decimal, kết quả cho ra chính xác tuyệt đối Decimal("0.0").' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Tự động Nâng Số chữ số Thập phân và Chuyển đổi từ Float',
      content: `
        <p>Chúng ta tạo các đối tượng <code>Decimal</code> bằng cách gọi hàm khởi tạo <code>Decimal()</code> và truyền vào các chuỗi có số lượng chữ số thập phân mong muốn (dùng hàm <code>str()</code> để chuyển đổi giá trị dấu phẩy động sang chuỗi nếu cần).</p>
        <p>Khi các số <code>Decimal</code> có độ chính xác khác nhau được kết hợp trong các biểu thức, Python sẽ <strong>tự động nâng kiểu lên số lượng chữ số thập phân lớn nhất</strong> giữa các toán hạng:</p>
        <pre class="code-block"><code>>>> Decimal('0.1') + Decimal('0.10') + Decimal('0.1000') - Decimal('0.30')
Decimal('0.0000')</code></pre>
        <p>Chúng ta cũng có thể tạo một đối tượng <code>Decimal</code> từ một số thực dấu phẩy động bằng cách gọi <code>Decimal.from_float()</code> hoặc truyền trực tiếp số float. Tuy nhiên, việc chuyển đổi từ float trần sẽ giữ lại toàn bộ chuỗi chữ số xấp xỉ của phần cứng nhị phân:</p>
      `,
      codeExamples: [
        {
          title: 'Decimal từ chuỗi so với Decimal từ float',
          code: `>>> Decimal('0.1') + Decimal('0.10') + Decimal('0.1000') - Decimal('0.30')
Decimal('0.0000')
>>> Decimal(0.1) + Decimal(0.1) + Decimal(0.1) - Decimal(0.3)
Decimal('2.775557561565156540423631668E-17')`,
          output: `Decimal('0.0000')
Decimal('2.775557561565156540423631668E-17')`,
          annotations: [
            { line: 1, text: 'Kết quả tự động nâng lên 4 chữ số thập phân theo toán hạng "0.1000".' },
            { line: 3, text: 'Truyền float trần Decimal(0.1) mang theo toàn bộ sai số xấp xỉ phần cứng.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Thiết lập Độ chính xác Toàn cục (Setting Decimal Precision)',
      content: `
        <p>Các công cụ khác trong module <code>decimal</code> có thể được sử dụng để thiết lập độ chính xác của tất cả các số <code>Decimal</code>, sắp xếp xử lý lỗi, v.v. Chẳng hạn, một <strong>đối tượng ngữ cảnh (context)</strong> trong module này cho phép chỉ định độ chính xác (số chữ số thập phân) và các chế độ làm tròn (làm tròn xuống, làm tròn lên, trần, v.v.).</p>
        <p>Độ chính xác được thiết lập qua <code>decimal.getcontext().prec</code> sẽ được áp dụng toàn cục cho tất cả các phép tính <code>Decimal</code> được tạo ra sau đó:</p>
      `,
      codeExamples: [
        {
          title: 'Cấu hình độ chính xác qua decimal.getcontext().prec',
          code: `>>> import decimal
>>> decimal.Decimal(1) / decimal.Decimal(7)     # Độ chính xác mặc định (28 chữ số)
Decimal('0.1428571428571428571428571429')
>>> decimal.getcontext().prec = 4               # Thiết lập độ chính xác cố định là 4
>>> decimal.Decimal(1) / decimal.Decimal(7)
Decimal('0.1429')
>>> Decimal(0.1) + Decimal(0.1) + Decimal(0.1) - Decimal(0.3)
Decimal('1.110E-17')`,
          output: `Decimal('0.1428571428571428571428571429')
Decimal('0.1429')
Decimal('1.110E-17')`,
          annotations: [
            { line: 3, text: 'Mặc định Python áp dụng 28 chữ số có nghĩa cho các phép tính Decimal.' },
            { line: 6, text: 'Sau khi đặt prec = 4, phép chia 1/7 được làm tròn chuẩn mực thành 0.1429.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Luôn khởi tạo Decimal từ chuỗi ký tự',
        content: 'Tuyệt đối tránh truyền số thực trực tiếp như <code>Decimal(0.1)</code> vì bản thân số <code>0.1</code> trong bộ nhớ đã bị sai số nhị phân trước khi đến được tay hàm khởi tạo. Hãy luôn bọc trong chuỗi: <code>Decimal("0.1")</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tính tiền thuế giá trị gia tăng (VAT) chính xác bằng Decimal',
      level: 'Dễ',
      problem: 'Một mặt hàng có giá chưa thuế là 199.99 USD, thuế suất VAT là 8.25%. Hãy tính số tiền thuế và tổng giá trị thanh toán bằng đối tượng Decimal, làm tròn đến đúng 2 chữ số thập phân.',
      hint: 'Khởi tạo Decimal("199.99") và Decimal("0.0825"). Dùng round() để làm tròn 2 chữ số.',
      solutionCode: `from decimal import Decimal

gia_goc = Decimal('199.99')
thue_suat = Decimal('0.0825')

tien_thue = round(gia_goc * thue_suat, 2)
tong_tien = gia_goc + tien_thue

print("Tiền thuế VAT:", tien_thue)
print("Tổng thanh toán:", tong_tien)`,
      solutionOutput: `Tiền thuế VAT: 16.50
Tổng thanh toán: 216.49`,
      explanation: '199.99 * 0.0825 = 16.499175. Làm tròn 2 chữ số thập phân cho ra tiền thuế chính xác là 16.50 USD và tổng thanh toán 216.49 USD.'
    }
  ],

  quiz: [
    {
      question: 'Tại sao nên truyền chuỗi ký tự "0.1" thay vì số float 0.1 vào hàm khởi tạo Decimal()?',
      options: [
        'Vì hàm Decimal() không chấp nhận đối số kiểu float và sẽ báo lỗi TypeError.',
        'Vì số thực float 0.1 đã mang sẵn sai số làm tròn của phần cứng nhị phân trước khi đưa vào Decimal.',
        'Vì truyền chuỗi giúp tăng tốc độ tính toán lên gấp 10 lần.',
        'Vì Decimal chỉ hỗ trợ số nguyên nếu truyền số trực tiếp.'
      ],
      correctIndex: 1,
      explanation: 'Số thực float 0.1 trên phần cứng nhị phân thực chất là 0.10000000000000000555... Do đó Decimal(0.1) sẽ sao chép toàn bộ sai số này vào đối tượng mới. Truyền chuỗi "0.1" giúp Decimal khởi tạo chính xác số thập phân 0.1.'
    },
    {
      question: 'Để thay đổi độ chính xác toàn cục cho các phép toán Decimal thành 6 chữ số, lệnh nào sau đây là ĐÚNG?',
      options: [
        'Decimal.set_precision(6)',
        'decimal.getcontext().prec = 6',
        'decimal.precision(6)',
        'sys.set_decimal_precision(6)'
      ],
      correctIndex: 1,
      explanation: 'Trong module decimal, thuộc tính .prec của đối tượng ngữ cảnh decimal.getcontext() kiểm soát độ chính xác toàn cục của các phép tính.'
    }
  ],

  summary: [
    'Đối tượng Decimal trong module decimal hiện thực hóa số thực thập phân cơ số 10 có độ chính xác cố định.',
    'Decimal triệt tiêu hoàn toàn các sai số làm tròn của số thực float nhị phân (như 0.1 + 0.1 + 0.1 - 0.3 = 0.0).',
    'Luôn khởi tạo Decimal bằng chuỗi ký tự (ví dụ: Decimal("0.1")) để đảm bảo độ chính xác tuyệt đối.',
    'Các phép tính Decimal tự động nâng số chữ số thập phân theo toán hạng có độ chính xác cao nhất.',
    'Thuộc tính decimal.getcontext().prec cho phép thiết lập độ chính xác tính toán toàn cục.'
  ]
};