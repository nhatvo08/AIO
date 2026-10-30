export default {
  id: 'lp-c5-22',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.22',
  title: 'Tóm tắt Chương 5 & Bộ 9 câu hỏi ôn tập kèm lời giải chi tiết',
  subtitle: 'Tổng kết toàn diện kiến thức Chương 5 và bộ 9 câu hỏi tự đánh giá kinh điển của Mark Lutz kèm đáp án giải thích',
  level: 'Trung bình',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Tổng hợp toàn bộ kiến thức cốt lõi của Chương 5: số học, biểu thức, các kiểu mở rộng, và module tiện ích.',
    'Tự kiểm tra và củng cố hiểu biết thông qua bộ 9 câu hỏi ôn tập nguyên bản từ sách giáo trình.',
    'Nắm vững đáp án gợi ý và phân tích chuyên sâu của tác giả Mark Lutz cho từng câu hỏi.',
    'Chuẩn bị tâm thế và kiến thức nền tảng để bước sang Chương 6 (Cơ chế Phép gán Biến trong Python).'
  ],

  intuition: {
    title: 'Trạm dừng chân và bài kiểm tra tư cách hoa tiêu',
    metaphor: 'Sau khi băng qua một chặng đường dài khám phá thế giới số học — từ những con số nguyên vô hạn, những con số thực dấu phẩy động tinh tế, cho đến các đối tượng chuyên biệt như Decimal, Fraction, và Set — bài học này giống như một trạm dừng chân trên đỉnh núi. Người hoa tiêu kỳ cựu Mark Lutz sẽ đặt ra cho bạn 9 câu hỏi thử thách. Trả lời được trọn vẹn 9 câu hỏi này nghĩa là bạn đã thực sự làm chủ toàn bộ nền tảng số học của Python, sẵn sàng cho những vùng đất mới lạ hơn ở các chương tiếp theo!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢN ĐỒ KIẾN THỨC TOÀN DIỆN CHƯƠNG 5: SỐ VÀ BIỂU THỨC</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. Kiểu Số Cốt Lõi</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• int (vô hạn, DOS 4300)<br>• float (IEEE 754, math.isclose)<br>• complex (real + imag*j)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">2. Toán Tử & Biểu Thức</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Bảng 5-2 (19 bậc ưu tiên)<br>• / (chia thực) vs // (chia sàn)<br>• Ngoặc đơn () &amp; So sánh chuỗi</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);">3. Kiểu Mở Rộng</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Decimal (cơ số 10 cố định)<br>• Fraction (hữu tỉ GCD)<br>• Set &amp; frozenset (tập hợp)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-secondary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-secondary);">4. Tiện Ích &amp; Bitwise</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• 0x, 0o, 0b &amp; int(s, base)<br>• math, random, statistics<br>• bool là subclass của int</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tóm tắt Cốt lõi Chương 5',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 36 / 38 – Trang 38 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Chương này đã dạo qua các kiểu đối tượng số học của Python cùng những thao tác mà chúng ta có thể áp dụng lên chúng. Trên hành trình đó, chúng ta đã gặp gỡ các đối tượng số nguyên và số thực dấu phẩy động đáng tin cậy, cũng như một số kiểu đặc thù và ít phổ biến hơn như số phức, số thập phân <code>Decimal</code>, phân số <code>Fraction</code> và tập hợp <code>set</code>.</p>
        <p>Chúng ta cũng đã khám phá cú pháp biểu thức của Python, các phép chuyển đổi kiểu tự động, các thao tác bitwise, cùng các hình thức hằng số bằng chữ khác nhau để viết số trong tập lệnh.</p>
        <p>Ở phần sau của cuốn sách này, chúng ta sẽ tiếp tục chuyến khám phá đối tượng chuyên sâu bằng cách bổ sung chi tiết về kiểu đối tượng tiếp theo—<strong>chuỗi ký tự (str)</strong> trong Chương 7. Tuy nhiên, trong <strong>Chương 6 kế tiếp</strong>, chúng ta sẽ dành thời gian tìm hiểu cơ chế <strong>phép gán biến (variable assignment)</strong> chi tiết hơn—đây chính là ý tưởng nền tảng cốt lõi bậc nhất trong Python. Nhưng trước hết, đã đến lúc làm bài ôn tập 9 câu hỏi của chương.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bộ 9 Câu hỏi Ôn tập và Đáp án Gợi ý Chi tiết',
      content: `
        <p>Hãy tự suy nghĩ câu trả lời cho 9 câu hỏi dưới đây trước khi mở phần đáp án và giải thích chi tiết của Mark Lutz:</p>

        <div style="display:flex;flex-direction:column;gap:18px;margin-top:16px;">
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu 1. Giá trị của biểu thức 2 * (3 + 4) trong Python là bao nhiêu, và tại sao?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Đáp án:</strong> Giá trị sẽ là <strong>14</strong>, kết quả của <code>2 * 7</code>, bởi vì dấu ngoặc đơn ép buộc phép cộng <code>(3 + 4)</code> phải diễn ra trước phép nhân.
            </div>
          </div>

          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu 2. Giá trị của biểu thức 2 * 3 + 4 trong Python là bao nhiêu, và tại sao?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Đáp án:</strong> Giá trị sẽ là <strong>10</strong>, kết quả của <code>6 + 4</code>. Các quy tắc ưu tiên toán tử của Python được áp dụng khi không có dấu ngoặc đơn, và phép nhân có độ ưu tiên cao hơn (nghĩa là diễn ra trước) phép cộng, theo Bảng 5-2.
            </div>
          </div>

          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu 3. Giá trị của biểu thức 2 + 3 * 4 trong Python là bao nhiêu, và tại sao?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Đáp án:</strong> Biểu thức này cho ra <strong>14</strong>, kết quả của <code>2 + 12</code>, vì cùng lý do độ ưu tiên toán tử như trong câu hỏi trước: phép nhân được thực hiện trước phép cộng.
            </div>
          </div>

          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu 4. Bạn có thể sử dụng những công cụ nào để tính căn bậc hai của một số, cũng như bình phương của nó?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Đáp án:</strong> Các hàm để lấy căn bậc hai, cũng như số pi, tang, v.v., có sẵn trong module <code>math</code> được import. Để tìm căn bậc hai của một số, hãy import math và gọi <code>math.sqrt(N)</code>. Để tính bình phương của một số, hãy sử dụng biểu thức lũy thừa <code>X ** 2</code> hoặc hàm dựng sẵn <code>pow(X, 2)</code>. Một trong hai cách cuối này cũng có thể tính căn bậc hai khi được truyền số mũ là 0.5 (ví dụ: <code>X ** .5</code> hoặc <code>pow(X, .5)</code>).
            </div>
          </div>

          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu 5. Kiểu dữ liệu kết quả của biểu thức 1 + 2.0 + 3 là gì, và tại sao?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Đáp án:</strong> Kết quả sẽ là một số thực dấu phẩy động (<strong><code>float</code></strong>): các số nguyên được tự động nâng kiểu lên thành số thực dấu phẩy động—kiểu phức tạp nhất trong biểu thức, và toán học dấu phẩy động được sử dụng để đánh giá biểu thức (cho ra <code>6.0</code>).
            </div>
          </div>

          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu 6. Làm thế nào bạn có thể cắt phần thập phân (truncate) và làm tròn (round) một số thực dấu phẩy động?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Đáp án:</strong> Các hàm <code>int(N)</code> và <code>math.trunc(N)</code> thực hiện cắt bỏ phần thập phân, còn hàm <code>round(N, digits)</code> thực hiện làm tròn. Chúng ta cũng có thể tính giá trị sàn bằng <code>math.floor(N)</code> và làm tròn để hiển thị bằng các thao tác định dạng chuỗi.
            </div>
          </div>

          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu 7. Làm thế nào bạn có thể chuyển đổi một số nguyên thành một số thực dấu phẩy động?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Đáp án:</strong> Hàm <code>float(I)</code> chuyển đổi một số nguyên thành một số thực dấu phẩy động; việc kết hợp một số nguyên với một số thực bên trong một biểu thức cũng sẽ dẫn đến việc tự động chuyển đổi kiểu. Theo một khía cạnh nào đó, phép chia thực <code>/</code> của Python cũng chuyển đổi kiểu—nó luôn luôn trả về kết quả dấu phẩy động bao gồm cả phần dư, ngay cả khi cả hai toán hạng đều là số nguyên.
            </div>
          </div>

          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu 8. Làm thế nào bạn có thể hiển thị một số nguyên dưới dạng ký hiệu bát phân, thập lục phân hoặc nhị phân?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Đáp án:</strong> Các hàm dựng sẵn <code>oct(I)</code>, <code>hex(I)</code> và <code>bin(I)</code> trả về các chuỗi biểu diễn dạng bát phân, thập lục phân và nhị phân cho một số nguyên. Cả ba hình thức định dạng chuỗi (dùng biểu thức <code>%</code>, phương thức <code>format()</code>, và <code>f-string</code>) cũng hỗ trợ các ký tự định dạng đích cho những phép chuyển đổi này.
            </div>
          </div>

          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Câu 9. Làm thế nào bạn có thể chuyển đổi một chuỗi bát phân, thập lục phân hoặc nhị phân thành một số nguyên thông thường?</div>
            <div style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Đáp án:</strong> Hàm <code>int(S, base)</code> có thể được dùng để chuyển đổi từ các chuỗi chữ số bát phân, thập lục phân và nhị phân sang số nguyên thông thường (truyền vào <code>8</code>, <code>16</code>, hoặc <code>2</code> cho tham số <code>base</code>). Hàm <code>eval(S)</code> cũng có thể dùng cho mục đích này, nhưng nó tốn kém tài nguyên hơn khi chạy và có thể tiềm ẩn các rủi ro bảo mật. Ở một mức độ nhất định, các hằng số bằng chữ ở cơ số khác như <code>0xFFFF</code> và <code>0b1111</code> trong mã nguồn của bạn cũng thực hiện công việc này khi được Python đọc vào. Hãy nhớ rằng các số nguyên luôn luôn được lưu trữ dưới dạng nhị phân trong bộ nhớ máy tính; đây chỉ là các phép chuyển đổi định dạng chuỗi phục vụ hiển thị.
            </div>
          </div>
        </div>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời nhắn gửi trước khi sang Chương 6 của Mark Lutz',
        content: 'Chương 6 kế tiếp sẽ đào sâu vào cơ chế gán biến và mô hình tham chiếu đối tượng trong bộ nhớ CPython. Đây là khái niệm bản lề quan trọng nhất quyết định khả năng làm chủ các cấu trúc dữ liệu phức tạp sau này (danh sách, từ điển, hàm và lớp).'
      }
    ]
  },

  exercises: [
    {
      title: 'Kiểm tra độ hiểu bài tổng hợp Chương 5',
      level: 'Vừa',
      problem: 'Viết một hàm <code>chuyen_doi_co_so(n)</code> nhận vào một số nguyên dương <code>n</code> và trả về một từ điển chứa các chuỗi biểu diễn của <code>n</code> ở 4 cơ số: thập phân, hex (in hoa kèm tiền tố), bát phân, và nhị phân.',
      hint: 'Dùng f-string với các ký tự định dạng :d, :#X, :#o, :#b.',
      solutionCode: `def chuyen_doi_co_so(n):
    return {
        'thap_phan': f"{n:d}",
        'hex': f"{n:#X}",
        'bat_phan': f"{n:#o}",
        'nhi_phan': f"{n:#b}"
    }

kq = chuyen_doi_co_so(255)
for k, v in kq.items():
    print(f"{k:<10}: {v}")`,
      solutionOutput: `thap_phan : 255
hex       : 0XFF
bat_phan  : 0o377
nhi_phan  : 0b11111111`,
      explanation: 'Sử dụng f-string với tiền tố # giúp tự động bổ sung 0X, 0o, 0b vào đầu các chuỗi biểu diễn cơ số.'
    }
  ],

  quiz: [
    {
      question: 'Phép toán 1 + 2.0 + 3 trong Python cho ra kết quả mang kiểu dữ liệu gì?',
      options: [
        'int (vì số lượng toán hạng số nguyên nhiều hơn).',
        'float (vì các số nguyên được tự động nâng kiểu lên float - kiểu phức tạp nhất).',
        'Decimal (vì có số thập phân).',
        'Báo lỗi TypeError vì không thể cộng int với float.'
      ],
      correctIndex: 1,
      explanation: 'Trong biểu thức hỗn hợp, Python tự động nâng các toán hạng đơn giản lên kiểu phức tạp nhất trong biểu thức (ở đây là float), cho ra kết quả 6.0 mang kiểu float.'
    },
    {
      question: 'Cách nào sau đây là an toàn và chuẩn mực nhất để chuyển chuỗi hex "0x2A" thành số nguyên 42?',
      options: [
        'eval("0x2A")',
        'int("0x2A", 16)',
        'hex("0x2A")',
        'float("0x2A")'
      ],
      correctIndex: 1,
      explanation: 'Hàm int(S, 16) là phương thức chuẩn mực, an toàn và hiệu năng cao nhất để chuyển đổi chuỗi cơ số 16 thành số nguyên.'
    }
  ],

  summary: [
    'Chương 5 hoàn tất việc trang bị toàn diện kiến thức về hệ thống số học và biểu thức trong Python.',
    'Số nguyên (int) không giới hạn kích thước; số thực (float) tuân theo chuẩn phần cứng nhị phân IEEE 754.',
    'Các kiểu mở rộng: Decimal cho tính toán tiền tệ cơ số 10 cố định; Fraction cho tỷ số hữu tỉ tối giản; Set cho lý thuyết tập hợp.',
    'Tháp nâng kiểu tự động int < float < complex chi phối mọi biểu thức số học hỗn hợp.',
    'Sẵn sàng bước sang Chương 6 để khám phá cơ chế phép gán biến—nền tảng cốt lõi nhất của ngôn ngữ Python!'
  ]
};