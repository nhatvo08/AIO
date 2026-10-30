export default {
  id: 'lp-c5-01',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.1',
  title: 'Hằng số bằng chữ số học (Numeric Literals) & Bảng 5-1',
  subtitle: 'Cú pháp viết trực tiếp các kiểu số trong mã nguồn: Bảng 5-1, các cơ số đếm và hàm khởi tạo',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt hằng số bằng chữ (literal) và lời gọi hàm khởi tạo (constructor) trong việc tạo đối tượng số.',
    'Nắm vững toàn bộ cú pháp biểu diễn trong Bảng 5-1 của Mark Lutz cho các kiểu số trong Python.',
    'Hiểu bản chất các tiền tố cơ số 0x (hex), 0o (bát phân), 0b (nhị phân): đều tạo ra cùng đối tượng số nguyên trong bộ nhớ.',
    'Ghi nhớ quy ước viết số thực dấu phẩy động (dấu chấm thập phân, số mũ e/E) và số phức (hậu tố j/J).'
  ],

  intuition: {
    title: 'Nhiều ngôn ngữ cho cùng một giá trị',
    metaphor: 'Con số 127 có thể được người La Mã viết là CXXVII, người đếm ngón tay viết là 127 (hệ 10), lập trình viên phần cứng viết là 0b01111111 (hệ nhị phân), hay kỹ sư hệ thống viết là 0x7F (hệ thập lục phân). Dù bạn viết bằng ký tự nào trên trang giấy mã nguồn, khi nạp vào máy tính, trình thông dịch Python cũng chỉ tạo ra một đối tượng số nguyên duy nhất chứa giá trị đó trong bộ nhớ RAM. Cú pháp literal chính là các "ngôn ngữ bề mặt" khác nhau để bạn giao tiếp thuận tiện nhất với Python.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CÁC CÁCH VIẾT HẰNG SỐ BẰNG CHỮ CỦA CÙNG GIÁ TRỊ 127 TRONG BỘ NHỚ</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:10px;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Thập phân (10)</div>
            <div style="font-weight:700;color:var(--accent-primary);margin-top:4px;">127</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Thập lục phân (16)</div>
            <div style="font-weight:700;color:var(--success);margin-top:4px;">0x7F</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Bát phân (8)</div>
            <div style="font-weight:700;color:var(--warning);margin-top:4px;">0o177</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Nhị phân (2)</div>
            <div style="font-weight:700;color:var(--accent-secondary);margin-top:4px;">0b01111111</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--text-muted);">Tất cả đều sinh ra cùng một đối tượng: <code>int(127)</code></div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Hằng số bằng chữ số học (Numeric Literals)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 2 / 38 – Trang 4 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Trong số các kiểu đối tượng cơ bản của mình, Python cung cấp:</p>
        <ul>
          <li><strong>Số nguyên (integer):</strong> là các số nguyên dương và âm, cùng số không (<code>0</code>). Số nguyên trong Python có độ chính xác không giới hạn—chúng có thể mở rộng với bao nhiêu chữ số tùy thuộc vào bộ nhớ RAM của bạn.</li>
          <li><strong>Số thực dấu phẩy động (floating-point number):</strong> là các số có phần thập phân (đôi khi được gọi tắt là float).</li>
          <li><strong>Các hệ đếm khác:</strong> cho phép viết số nguyên bằng các hằng số dạng thập lục phân (hexadecimal), bát phân (octal) và nhị phân (binary).</li>
          <li><strong>Số phức (complex number):</strong> gồm phần thực và phần ảo.</li>
        </ul>
        <p>Bảng 5-1 dưới đây minh họa các kiểu số học của Python trông như thế nào khi được viết ra trong mã nguồn dưới dạng <strong>hằng số bằng chữ (literal)</strong> hoặc <strong>lời gọi hàm khởi tạo (constructor)</strong>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bảng 5-1: Hằng số bằng chữ và hàm khởi tạo số học',
      content: `
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 14px;color:var(--text-primary);width:45%;">Hằng số bằng chữ / Cú pháp</th>
                <th style="padding:10px 14px;color:var(--text-primary);">Giải nghĩa</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;font-family:var(--font-mono);color:var(--accent-primary);">1234, -24, 0, 9_999_999_999_999</td>
                <td style="padding:10px 14px;">Số nguyên (kích thước không giới hạn)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;font-family:var(--font-mono);color:var(--accent-primary);">1.23, 1., 3.14e-10, 4E210, 4.0e+210</td>
                <td style="padding:10px 14px;">Số thực dấu phẩy động (floating-point)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;font-family:var(--font-mono);color:var(--accent-primary);">0o177, 0x9ff, 0b101010</td>
                <td style="padding:10px 14px;">Hằng số bằng chữ bát phân, thập lục phân và nhị phân</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;font-family:var(--font-mono);color:var(--accent-primary);">3+4j, 3.0+4.0j, 3J</td>
                <td style="padding:10px 14px;">Hằng số bằng chữ số phức</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;font-family:var(--font-mono);color:var(--accent-primary);">set('hack'), {1, 2, 3, 4}</td>
                <td style="padding:10px 14px;">Tập hợp: hàm khởi tạo và hằng số bằng chữ</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:10px 14px;font-family:var(--font-mono);color:var(--accent-primary);">Decimal('1.0'), Fraction(1, 3)</td>
                <td style="padding:10px 14px;">Kiểu mở rộng: số thập phân và phân số</td>
              </tr>
              <tr>
                <td style="padding:10px 14px;font-family:var(--font-mono);color:var(--accent-primary);">bool(X), True, False</td>
                <td style="padding:10px 14px;">Kiểu Boolean và các hằng số logic</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Phân tích Chi tiết Cú pháp từng Kiểu Số',
      content: `
        <p>Nhìn chung, việc viết các hằng số bằng chữ thuộc kiểu số học trong Python rất trực quan, nhưng có một vài sắc thái kỹ thuật đáng nhấn mạnh ngay từ đầu:</p>
        
        <h4>Hằng số bằng chữ số nguyên và số thực dấu phẩy động</h4>
        <p>Số nguyên được viết dưới dạng chuỗi các chữ số thập phân. Như Mark Lutz đã lưu ý, chúng có độ chính xác chỉ bị giới hạn bởi bộ nhớ khả dụng. Bạn có thể dễ dàng tính toán <code>2 ** 1000000</code>, mặc dù với hơn 300.000 chữ số, việc in ra màn hình sẽ bị kiểm soát bởi cơ chế DOS limit (đã nêu ở Chương 4).</p>
        <p>Số thực dấu phẩy động có <strong>dấu chấm thập phân</strong> và/hoặc <strong>phần số mũ</strong> bắt đầu bằng chữ cái <code>e</code> hoặc <code>E</code> (ví dụ: <code>1.23</code>, <code>1.</code>, <code>3.14e-10</code>). Nếu bạn viết một số có dấu chấm hoặc số mũ, Python sẽ biến nó thành đối tượng <code>float</code> và áp dụng các phép toán dấu phẩy động.</p>

        <h4>Hằng số bát phân, thập lục phân và nhị phân</h4>
        <p>Số nguyên có thể biểu diễn ở 4 cơ số:</p>
        <ul>
          <li><strong>Thập lục phân (Hexadecimal, cơ số 16):</strong> bắt đầu bằng tiền tố <code>0x</code> hoặc <code>0X</code>, theo sau bởi các chữ số <code>0–9</code> và <code>A–F</code> (chữ hoa hay thường đều được). Ví dụ: <code>0x7f</code>, <code>0x9ff</code>.</li>
          <li><strong>Bát phân (Octal, cơ số 8):</strong> bắt đầu bằng tiền tố <code>0o</code> hoặc <code>0O</code> (số 0 và chữ cái "o"), theo sau là các chữ số <code>0–7</code>. Ví dụ: <code>0o177</code>.</li>
          <li><strong>Nhị phân (Binary, cơ số 2):</strong> bắt đầu bằng tiền tố <code>0b</code> hoặc <code>0B</code>, theo sau là các bit <code>0–1</code>. Ví dụ: <code>0b101010</code>.</li>
        </ul>
        <p><strong>Lưu ý quan trọng:</strong> Tất cả các dạng này đều tạo ra những đối tượng số nguyên thông thường trong bộ nhớ. Mặc định Python luôn hiển thị số nguyên ở hệ thập phân khi in ra.</p>

        <h4>Số phức (Complex Numbers)</h4>
        <p>Được viết dưới dạng <code>phần-thực + phần-ảo</code>, trong đó phần ảo kết thúc bằng chữ cái <code>j</code> hoặc <code>J</code> (theo quy ước kỹ thuật điện để tránh nhầm với dòng điện <code>i</code>). Ví dụ: <code>3 + 4j</code> có phần thực 3.0 và phần ảo 4.0.</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng các dạng literal và tính đồng nhất trong bộ nhớ',
          code: `>>> 0o177, 0x7f, 0b01111111
(127, 127, 127)
>>> 0o177 == 0x7f == 0b01111111 == 127
True
>>> 1.23, 1., 3.14e-10
(1.23, 1.0, 3.14e-10)
>>> 3 + 4j, type(3 + 4j)
((3+4j), <class 'complex'>)`,
          output: `(127, 127, 127)
True
(1.23, 1.0, 3.14e-10)
((3+4j), <class 'complex'>)`,
          annotations: [
            { line: 2, text: 'Các literal ở hệ bát phân, hex, nhị phân đều sinh ra số nguyên 127.' },
            { line: 4, text: 'Toán tử == xác nhận cả 4 cách viết đều có giá trị bằng nhau tuyệt đối.' },
            { line: 6, text: 'Số thực có thể viết khuyết phần thập phân sau dấu chấm (1.) hoặc dùng số mũ khoa học.' },
            { line: 8, text: 'Số phức là kiểu cốt lõi riêng biệt có kiểu <class "complex">.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cú pháp tiền tố bát phân trong Python 3',
        content: 'Trong Python 2 cũ, số bát phân được viết bắt đầu bằng số 0 trần (ví dụ: <code>0177</code>). Từ Python 3.0 trở đi, cú pháp này đã bị loại bỏ vì dễ gây nhầm lẫn; số bát phân <strong>bắt buộc phải có chữ o</strong>: <code>0o177</code> hoặc <code>0O177</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Xác định kiểu dữ liệu từ cú pháp literal',
      level: 'Dễ',
      problem: 'Hãy cho biết kiểu dữ liệu của các literal sau trong Python: <code>42</code>, <code>42.0</code>, <code>0x42</code>, <code>42j</code>, <code>{42}</code>.',
      hint: 'Dựa vào Bảng 5-1: dấu chấm chỉ float, 0x chỉ int hệ hex, j chỉ complex, ngoặc nhọn chỉ set.',
      solutionCode: `literals = [42, 42.0, 0x42, 42j, {42}]
for item in literals:
    print(f"{repr(item):<10} -> {type(item)}")`,
      solutionOutput: `42         -> <class 'int'>
42.0       -> <class 'float'>
66         -> <class 'int'>
42j        -> <class 'complex'>
{42}       -> <class 'set'>`,
      explanation: '<code>42</code> và <code>0x42</code> đều thuộc lớp <code>int</code> (0x42 là 66 thập phân); <code>42.0</code> là <code>float</code>; <code>42j</code> là <code>complex</code>; và <code>{42}</code> là một <code>set</code> chứa một phần tử số nguyên.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về ba hằng số 0o177, 0x7f và 0b01111111 trong Python?',
      options: [
        'Chúng thuộc 3 kiểu dữ liệu khác nhau: OctalInt, HexInt và BinaryInt.',
        'Chúng là cùng một đối tượng số nguyên mang giá trị 127 thập phân trong bộ nhớ.',
        'Python chỉ cho phép tính toán trên chúng nếu gọi hàm ép kiểu int() trước.',
        'Các hằng số này có kích thước cố định là 8-bit và không thể cộng với số thập phân.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz nhấn mạnh: tất cả các dạng này đều tạo ra những đối tượng số nguyên int thông thường trong bộ nhớ, tương đương với 127 trong hệ thập phân.'
    },
    {
      question: 'Trong Python, số phức được viết mã với hậu tố ký tự nào ở phần ảo?',
      options: [
        'Ký tự i hoặc I (theo toán học thuần túy).',
        'Ký tự j hoặc J (theo quy ước ngành kỹ thuật điện).',
        'Ký tự c hoặc C (viết tắt của Complex).',
        'Ký tự z hoặc Z (theo tọa độ mặt phẳng phức).'
      ],
      correctIndex: 1,
      explanation: 'Python tuân theo quy ước của ngành kỹ thuật: sử dụng chữ cái j hoặc J ở cuối phần ảo (ví dụ: 3+4j hoặc 3J).'
    }
  ],

  summary: [
    'Bảng 5-1 tổng hợp toàn bộ các dạng hằng số bằng chữ và hàm khởi tạo số học của Python.',
    'Số nguyên (int) không giới hạn độ chính xác; số thực (float) có dấu chấm thập phân hoặc số mũ e/E.',
    'Các tiền tố cơ số: 0x (hex cơ số 16), 0o (bát phân cơ số 8), 0b (nhị phân cơ số 2) đều tạo đối tượng int thông thường.',
    'Số phức (complex) viết với hậu tố j hoặc J cho phần ảo (ví dụ: 3+4j).',
    'Ý chính: Cú pháp literal đa dạng giúp biểu diễn dữ liệu tự nhiên, nhưng trong bộ nhớ Python luôn quy về các đối tượng chuẩn mực.'
  ]
};