export default {
  id: 'lp-c5-08',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.8',
  title: 'Độ chính xác số nguyên không giới hạn & Giới hạn DOS chuỗi',
  subtitle: 'Sức mạnh của số nguyên vô hạn (bignum), ứng dụng tính toán quy mô lớn và cơ chế phòng thủ DOS 4300 chữ số',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu cơ chế quản lý bộ nhớ số nguyên của Python: tự động mở rộng theo nhu cầu, không bao giờ bị tràn số (overflow).',
    'Thực hành tính toán với các lũy thừa siêu lớn như 2**269 và 2**1000000.',
    'Nắm vững nguyên nhân xuất hiện lỗi ValueError khi vượt ngưỡng 4300 chữ số và cách sử dụng sys.set_int_max_str_digits().',
    'Phân tích sự đánh đổi giữa độ chính xác số học tuyệt đối và chi phí hiệu năng tính toán.'
  ],

  intuition: {
    title: 'Chiếc thước dây co giãn vô tận và cánh cổng kiểm soát an ninh',
    metaphor: 'Trong hầu hết các ngôn ngữ lập trình như C, C++ hay Java, một số nguyên integer giống như một chiếc thước kẻ cố định dài 32-bit hoặc 64-bit: nếu con số vượt quá giới hạn (ví dụ vượt qua 2 tỷ với số nguyên 32-bit), thước sẽ gãy và giá trị bị lộn ngược sang số âm (tràn số - overflow). Trong Python, số nguyên giống như một chiếc thước dây ma thuật: con số lớn đến đâu, bộ nhớ CPython tự động nối thêm dây đến đó! Tuy nhiên, khi bạn yêu cầu Python đổi một sợi dây dài hàng triệu mét thành chữ viết in ra màn hình, nó sẽ tốn rất nhiều CPU. Để tránh bị kẻ xấu làm nghẽn máy (tấn công DOS), Python đặt một "cánh cổng an ninh" chặn lại nếu một chuỗi số vượt quá 4300 chữ số.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ SỐ NGUYÊN BIGNUM VÀ CỔNG BẢO VỆ DOS TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Tính toán Số học (Không Giới Hạn)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              <code>x = 2 ** 1000000</code><br>
              ➔ Tính toán hoàn tất trong RAM!<br>
              ➔ Không bị giới hạn 32/64-bit.<br>
              ➔ Không xảy ra tràn số.
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">Chuyển đổi Chuỗi (Ngưỡng An Ninh)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              <code>print(x)</code> hoặc <code>str(x)</code><br>
              ➔ Chặn nếu &gt; 4300 chữ số thập phân.<br>
              ➔ Phòng thủ tấn công từ chối dịch vụ (DOS).<br>
              ➔ Cấu hình: <code>sys.set_int_max_str_digits()</code>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Số nguyên với Độ chính xác Không giới hạn',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 15 / 38 – Trang 16 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Phép chia trong Python có thể có nhiều hình thức khác nhau, nhưng nó vẫn khá chuẩn mực theo góc độ các ngôn ngữ lập trình. Dưới đây là một điều có phần khác thường và mạnh mẽ hơn rất nhiều: <strong>số nguyên trong Python hỗ trợ kích thước không giới hạn (arbitrary precision integers / bignum)</strong>.</p>
        <p>Số nguyên với độ chính xác không giới hạn là một công cụ dựng sẵn vô cùng tiện lợi. Ví dụ, bạn có thể dùng chúng để tính nợ công quốc gia trong Python mà không bao giờ gặp phải lỗi tràn giá trị số (overflow). Phổ quát hơn, các lũy thừa lớn vẫn được tính toán chuẩn xác từng chữ số trong bộ nhớ:</p>
      `,
      codeExamples: [
        {
          title: 'Tính toán với các số nguyên siêu lớn',
          code: `>>> 999999999999999999999999999999 + 1
1000000000000000000000000000000
>>> 2 ** 269
948568795032094272909893509191171341133987714380927500611236528192824358010355712`,
          output: `1000000000000000000000000000000
948568795032094272909893509191171341133987714380927500611236528192824358010355712`,
          annotations: [
            { line: 1, text: 'Phép cộng 30 chữ số 9 với 1 cho ra chính xác 1 kèm 30 chữ số 0.' },
            { line: 3, text: '2 lũy thừa 269 sinh ra một số nguyên gồm 81 chữ số, hoàn toàn không bị tràn bộ đếm.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Giới hạn An ninh DOS khi Chuyển đổi Chuỗi (sys.set_int_max_str_digits)',
      content: `
        <p>Những con số lớn hơn nhiều (như <code>2 ** 1000000</code> với hơn 300.000 chữ số) vẫn được Python tính toán bình thường trong RAM. Tuy nhiên, khi bạn cố gắng hiển thị hoặc in con số đó ra màn hình dưới dạng chuỗi thập phân, bạn sẽ gặp phải một cơ chế an ninh được Python bổ sung:</p>
        <pre class="code-block"><code>>>> x = 2 ** 1000000
>>> x
ValueError: Exceeds the limit (4300 digits) for integer string conversion; 
use sys.set_int_max_str_digits() to increase the limit</code></pre>
        <p>Thuật toán chuyển đổi từ biểu diễn nhị phân nội bộ sang chuỗi thập phân của một số nguyên khổng lồ có độ phức tạp thuật toán phi tuyến tính O(N²), có thể làm treo CPU của máy chủ nếu kẻ xấu gửi vào các số hàng triệu chữ số. Do đó, Python mặc định giới hạn độ dài chuỗi chuyển đổi ở mức <strong>4300 chữ số</strong>. Nếu bài toán của bạn thực sự cần in ra số lớn hơn, bạn có thể chủ động nâng hạn mức bằng cách gọi <code>sys.set_int_max_str_digits(1000000)</code> hoặc đặt về <code>0</code> để tắt hoàn toàn giới hạn.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Sự Đánh đổi giữa Độ chính xác và Hiệu năng',
      content: `
        <p>Bởi vì Python phải thực hiện thêm công việc cấp phát bộ nhớ động và tính toán từng khối chữ số để hỗ trợ độ chính xác mở rộng, nên các phép toán số nguyên thường <strong>chậm hơn đáng kể so với bình thường khi các con số phát triển quá lớn</strong>.</p>
        <p>Tuy nhiên, đối với hầu hết các bài toán thường nhật, số nguyên thông thường (nằm trong giới hạn 64-bit) vẫn được tối ưu hóa cực nhanh. Và nếu bạn thực sự cần độ chính xác mở rộng cho mật mã học (như thuật toán mã hóa khóa công khai RSA) hay khoa học dữ liệu, thì việc tính năng này đã được tích hợp sẵn tự động trong ngôn ngữ gần như chắc chắn sẽ có giá trị vượt trội so với sự đánh đổi về mặt hiệu năng.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Điều chỉnh giới hạn chuyển đổi chuỗi số nguyên an toàn',
        content: `
          <p>Để tăng hoặc tắt bỏ giới hạn chuyển chuỗi khi cần xử lý số học chuyên sâu, bạn dùng module <code>sys</code>:</p>
          <pre class="code-block"><code>import sys
sys.set_int_max_str_digits(50000)   # Nâng hạn mức lên 50.000 chữ số
# hoặc sys.set_int_max_str_digits(0) để tắt bỏ giới hạn hoàn toàn</code></pre>
        `
      }
    ]
  },

  exercises: [
    {
      title: 'Tính số chữ số của một lũy thừa lớn',
      level: 'Vừa',
      problem: 'Viết mã tính giá trị <code>2 ** 500</code> và sử dụng phương thức <code>bit_length()</code> để kiểm tra con số này cần bao nhiêu bit trong bộ nhớ máy tính.',
      hint: 'Gọi phương thức (2**500).bit_length().',
      solutionCode: `so_lon = 2 ** 500
so_bit = so_lon.bit_length()
so_chu_so_thap_phan = len(str(so_lon))

print("Số bit cần thiết:", so_bit)
print("Số chữ số hệ thập phân:", so_chu_so_thap_phan)`,
      solutionOutput: `Số bit cần thiết: 501
Số chữ số hệ thập phân: 151`,
      explanation: '<code>2 ** 500</code> là một số có 501 bit nhị phân trong bộ nhớ và gồm 151 chữ số thập phân khi chuyển đổi thành chuỗi.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về kích thước tối đa của số nguyên (int) trong Python 3?',
      options: [
        'Bị giới hạn ở 32-bit (tối đa khoảng 2,1 tỷ).',
        'Bị giới hạn ở 64-bit (chuẩn long int của ngôn ngữ C).',
        'Không giới hạn kích thước, chỉ bị giới hạn bởi dung lượng bộ nhớ RAM khả dụng trên máy tính.',
        'Tối đa là 4300 chữ số, nếu lớn hơn sẽ gây lỗi tràn số OverflowError.'
      ],
      correctIndex: 2,
      explanation: 'Số nguyên trong Python 3 có kích thước không giới hạn (arbitrary precision) và có thể mở rộng bao nhiêu chữ số tùy thuộc vào dung lượng bộ nhớ RAM của thiết bị.'
    },
    {
      question: 'Ngưỡng mặc định 4300 chữ số (gây lỗi ValueError) trong Python được áp dụng cho thao tác nào?',
      options: [
        'Thao tác tính toán số học cộng, trừ, nhân, lũy thừa trong RAM.',
        'Thao tác chuyển đổi qua lại giữa số nguyên và chuỗi văn bản (integer string conversion).',
        'Thao tác lưu biến số nguyên vào tập tin nhị phân.',
        'Thao tác so sánh độ lớn giữa hai số nguyên.'
      ],
      correctIndex: 1,
      explanation: 'Giới hạn 4300 chữ số chỉ áp dụng cho việc chuyển đổi chuỗi sang số nguyên hoặc từ số nguyên sang chuỗi thập phân (để phòng thủ tấn công DOS do thuật toán chuyển chuỗi O(N²)), bản thân việc tính toán số học trong RAM vẫn không bị giới hạn.'
    }
  ],

  summary: [
    'Số nguyên trong Python hỗ trợ kích thước không giới hạn, loại bỏ hoàn toàn nguy cơ lỗi tràn số (overflow).',
    'Python tự động cấp phát bộ nhớ động khi con số phát triển lớn, đánh đổi một phần tốc độ để đổi lấy độ chính xác tuyệt đối.',
    'Để phòng chống tấn công từ chối dịch vụ (DOS), Python giới hạn việc chuyển đổi chuỗi số nguyên mặc định ở mức 4300 chữ số.',
    'Có thể dùng sys.set_int_max_str_digits() để kiểm soát hoặc tắt bỏ giới hạn chuyển chuỗi này.',
    'Tính năng số nguyên vô hạn là công cụ cực kỳ quý giá cho mật mã học, tài chính quy mô lớn và toán học trừu tượng.'
  ]
};