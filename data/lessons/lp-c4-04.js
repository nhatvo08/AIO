export default {
  id: 'lp-c4-04',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.4',
  title: 'Kiểu số (Numbers)',
  subtitle: 'Số nguyên vô hạn độ chính xác, số thực float, module math, random và Khung chuyên đề về giới hạn DOS số lớn',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Khảo sát các đại diện số học cốt lõi trong Python: số nguyên, số thực float, số phức, Decimal và Fraction.',
    'Sử dụng các toán tử số học cơ bản (+, *, **) và cơ chế tự động cung cấp độ chính xác vô hạn cho số nguyên.',
    'Nạp và áp dụng các công cụ tính toán nâng cao từ module math và module random trong thư viện chuẩn.',
    'Hiểu rõ Khung chuyên đề DOS: giới hạn chuyển đổi 4.300 chữ số trong Python 3.11+ và cách điều chỉnh với sys.set_int_max_str_digits.'
  ],

  intuition: {
    title: 'Từ chiếc máy tính bỏ túi đến siêu máy tính số học vô hạn',
    metaphor: 'Trong các ngôn ngữ cấp thấp, số nguyên giống như những chiếc hộp nhỏ có kích thước cố định (32-bit hay 64-bit). Nếu bạn nhét một con số quá lớn vào, chiếc hộp sẽ bị tràn (overflow) và tạo ra một số âm kỳ quái. Nhưng trong Python, số nguyên giống như dải đất sét có thể kéo dài vô tận: bạn muốn nhân một số có hàng nghìn chữ số, Python sẽ tự động mở rộng vùng nhớ để chứa vừa vặn toàn bộ con số đó mà không bao giờ bị tràn số.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHỔ CÁC KIỂU SỐ TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">Số nguyên (int)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">1234, 0b111, 0x15, 2**100 (Độ chính xác vô hạn, co giãn theo RAM)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">Số thực (float)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">3.1415, 1.5 * 4 = 6.0 (Biểu diễn dấu phẩy động kép IEEE 754)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);">Số chuyên dụng</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Decimal (tài chính), Fraction (phân số), 3+4j (số phức)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--text-primary);">Mở rộng bên thứ ba</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">NumPy arrays, ma trận, vector hiệu năng cao</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tổng quan về Kiểu số trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 5–7 / 38</strong>.</p>
          </div>
        </div>

        <p>Nếu bạn từng lập trình hoặc viết kịch bản trong quá khứ, các kiểu đối tượng số trong Bảng 4-1 có lẽ sẽ trông rất quen thuộc. Ngay cả khi bạn chưa từng, kiểu số cũng khá dễ hiểu. Tập hợp các đối tượng cốt lõi của Python bao gồm những gương mặt quen thuộc:</p>
        <ul>
          <li><strong>Số nguyên (integers):</strong> Các số không có phần thập phân (như <code>123</code>, <code>-45</code>).</li>
          <li><strong>Số thực dấu phẩy động (floating-point):</strong> Các số có phần thập phân (như <code>3.1415</code>, <code>1.5</code>).</li>
          <li><strong>Các kiểu số đặc biệt hơn:</strong> Số phức với phần ảo (<code>3+4j</code>), số thập phân <code>Decimal</code> với độ chính xác linh hoạt (dành cho tính toán tài chính), số hữu tỉ <code>Fraction</code> với tử số và mẫu số, cùng các tập hợp <code>set</code> đầy đủ tính năng.</li>
        </ul>
        <p>Các kiểu số dựng sẵn là đủ để biểu diễn hầu hết các đại lượng số học—từ tuổi tác của bạn cho đến số dư tài khoản ngân hàng. Nhưng các đối tượng số chuyên biệt như vector và ma trận cũng luôn có sẵn dưới dạng các tiện ích bổ sung của bên thứ ba (như thư viện NumPy).</p>
        <p>Các số cơ bản trong Python hỗ trợ những phép toán số học thông thường: dấu cộng (<code>+</code>) thực hiện phép cộng, dấu sao (<code>*</code>) dùng cho phép nhân, và hai dấu sao (<code>**</code>) dùng cho phép lũy thừa.</p>
      `,
      codeExamples: [
        {
          title: 'Khởi chạy phiên REPL và các phép toán số học cơ bản',
          code: `$ python3                            # Khởi chạy một phiên REPL
>>> 123 + 222                        # Cộng số nguyên
345
>>> 1.5 * 4                          # Nhân số thực dấu phẩy động
6.0
>>> 1_234_567, 0x15, bin(21)         # Dấu phân cách, thập lục phân, nhị phân
(1234567, 21, '0b10101')
>>> 2 ** 100                         # 2 lũy thừa 100, một lần nữa
1267650600228229401496703205376`,
          output: `345
6.0
(1234567, 21, '0b10101')
1267650600228229401496703205376`,
          annotations: [
            { line: 2, text: 'Phép cộng số nguyên cho kết quả chính xác 345.' },
            { line: 4, text: 'Nhân số thực float với số nguyên trả về kiểu float 6.0.' },
            { line: 6, text: 'Dấu gạch dưới _ giúp phân tách hàng nghìn; 0x15 là hex; bin() đổi sang nhị phân.' },
            { line: 8, text: 'Toán tử ** tính 2^100 cho con số khổng lồ mà không bị tràn số.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Số nguyên Vô hạn Độ chính xác và Lệnh gọi Lồng nhau',
      content: `
        <p>Hãy chú ý kết quả cuối cùng ở ví dụ trên: <strong>đối tượng số nguyên của Python tự động cung cấp thêm độ chính xác cho các số lớn như thế này khi cần thiết</strong>. Bạn có thể tính 2 lũy thừa 12.345 dưới dạng một số nguyên trong Python mà không gặp bất kỳ lỗi tràn bộ nhớ nào.</p>
        <p>Tuy nhiên, với gần 4.000 chữ số, đó là một con số quá đồ sộ để hiển thị đọc hiểu tường tận. Chúng ta có thể kiểm tra số lượng chữ số của nó thông qua một lệnh gọi lồng nhau:</p>
      `,
      codeExamples: [
        {
          title: 'Đếm số lượng chữ số trong một con số CỰC LỚN',
          code: `>>> len(str(2 ** 12345))             # Có bao nhiêu chữ số trong một số CỰC LỚN
3717`,
          output: `3717`,
          annotations: [
            { line: 1, text: 'Hoạt động từ trong ra ngoài: (1) Tính 2**12345, (2) str() đổi sang chuỗi chữ số, (3) len() đếm số ký tự.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Các Module Số học: math và random',
      content: `
        <p>Bên cạnh các toán tử biểu thức, Python đi kèm sẵn các module hữu ích phục vụ tính toán số học—vốn chỉ là những gói công cụ bổ sung mà chúng ta nạp vào bằng câu lệnh <code>import</code>:</p>
        <ul>
          <li><strong>Module <code>math</code>:</strong> Chứa các hằng số và công cụ số học nâng cao (như $\\pi$, căn bậc hai, hàm lượng giác).</li>
          <li><strong>Module <code>random</code>:</strong> Cung cấp các công cụ sinh số ngẫu nhiên và lựa chọn phần tử ngẫu nhiên từ danh sách.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng module math và module random trong REPL',
          code: `>>> import math
>>> math.pi
3.141592653589793
>>> math.sqrt(85)
9.219544457292887

>>> import random
>>> random.random()
0.7082048489415967
>>> random.choice([1, 2, 3, 4])
2`,
          output: `3.141592653589793
9.219544457292887
0.7082048489415967
2`,
          annotations: [
            { line: 2, text: 'math.pi cung cấp hằng số Pi chính xác dấu phẩy động.' },
            { line: 4, text: 'math.sqrt(85) tính căn bậc hai của 85.' },
            { line: 8, text: 'random.random() sinh số thực ngẫu nhiên trong khoảng [0.0, 1.0) (kết quả mỗi lần chạy khác nhau).' },
            { line: 10, text: 'random.choice() chọn ngẫu nhiên một phần tử từ danh sách (kết quả mỗi lần chạy khác nhau).' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Khung chuyên đề: Số lớn và Nguy cơ Tấn công DOS',
      content: `
        <details class="deep-dive-details" open>
          <summary class="deep-dive-summary">
            <span>🔍 Khung chuyên đề: Số lớn và nguy cơ tấn công từ chối dịch vụ (DOS)</span>
            <span class="deep-dive-toggle-hint">PDF Trang 7 / 38 ▾</span>
          </summary>
          <div class="deep-dive-content">
            <p><strong>Số lớn và nguy cơ tấn công DOS:</strong> Các số nguyên trong Python có thể lớn tùy ý và thậm chí có thể được dùng để biểu diễn các giá trị dấu phẩy động với độ chính xác mở rộng. Mặc dù kích thước số nguyên chỉ bị giới hạn bởi bộ nhớ máy tính của bạn, nhưng <strong>kể từ Python 3.11 trở lên</strong>, ngôn ngữ yêu cầu các bước xử lý bổ sung để chuyển đổi các con số lớn bất thường thành chuỗi thập phân (ví dụ: dùng cho hàm <code>str()</code> hoặc hiển thị trực tiếp ra màn hình).</p>
            <p>Thuật toán chuyển đổi từ hệ nhị phân sang chuỗi thập phân có độ phức tạp thuật toán bậc hai $O(N^2)$, có thể bị kẻ tấn công lợi dụng để làm cạn kiệt CPU của máy chủ web bằng cách gửi vào một con số khổng lồ (tấn công DOS).</p>
            <p>Để ngăn chặn điều này:</p>
            <ul>
              <li>Python thiết lập <strong>giới hạn mặc định là 4.300 chữ số</strong> cho thao tác chuyển đổi số nguyên sang chuỗi.</li>
              <li>Giới hạn này có thể được nâng lên bằng công cụ <code>sys.set_int_max_str_digits()</code> của module <code>sys</code> (ví dụ: gọi <code>sys.set_int_max_str_digits(10000)</code> nếu bạn cần đếm hoặc in số có độ dài lớn hơn).</li>
            </ul>
            <p><em>(Đã kiểm chứng thực nghiệm trên Python 3.14.8: hàm <code>sys.get_int_max_str_digits()</code> trả về mặc định đúng 4300)</em>.</p>
          </div>
        </details>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mẹo kiểm chứng kết quả ngẫu nhiên',
        content: 'Khi chạy thử <code>random.random()</code> và <code>random.choice()</code> trên máy tính cá nhân của bạn, kết quả in ra sẽ khác với các con số <code>0.7082...</code> và <code>2</code> được in trong sách. Đây là hành vi hoàn toàn bình thường của bộ sinh số ngẫu nhiên giả lập (PRNG).'
      }
    ]
  },

  exercises: [
    {
      title: 'Tính toán lũy thừa lớn và đếm chữ số',
      level: 'Dễ',
      problem: 'Hãy viết biểu thức Python tính giá trị $3^{500}$ và cho biết con số này có bao nhiêu chữ số trong hệ thập phân.',
      hint: 'Kết hợp toán tử <code>**</code> cùng các hàm <code>len()</code> và <code>str()</code>.',
      solutionCode: `ket_qua = 3 ** 500
so_chu_so = len(str(ket_qua))
print("Giá trị (rút gọn):", str(ket_qua)[:20], "...")
print("Số chữ số:", so_chu_so)`,
      solutionOutput: `Giá trị (rút gọn): 36360291795869936842 ...
Số chữ số: 239`,
      explanation: '3**500 cho một số nguyên gồm 239 chữ số, hoàn toàn nằm trong giới hạn an toàn 4.300 chữ số của Python.'
    },
    {
      title: 'Mô phỏng gieo xúc xắc bằng module random',
      level: 'Vừa',
      problem: 'Sử dụng module <code>random</code> để mô phỏng việc tung một con xúc xắc 6 mặt (từ 1 đến 6) đúng 5 lần và in các kết quả.',
      hint: 'Có thể dùng <code>random.choice([1, 2, 3, 4, 5, 6])</code> hoặc <code>random.randint(1, 6)</code> trong vòng lặp.',
      solutionCode: `import random

xuc_xac = [1, 2, 3, 4, 5, 6]
ket_qua_gieo = [random.choice(xuc_xac) for _ in range(5)]
print("5 lần gieo xúc xắc:", ket_qua_gieo)`,
      solutionOutput: `5 lần gieo xúc xắc: [..., ..., ..., ..., ...]`,
      explanation: 'Hàm <code>random.choice()</code> chọn ngẫu nhiên một phần tử từ danh sách các mặt xúc xắc với xác suất đồng đều.'
    }
  ],

  quiz: [
    {
      question: 'Khi thực hiện phép tính lũy thừa cực lớn như 2 ** 100 trong Python, điều gì sẽ xảy ra?',
      options: [
        'Xảy ra lỗi tràn số nguyên (Integer Overflow) giống như ngôn ngữ C.',
        'Python tự động ép kiểu kết quả về số thực dấu phẩy động làm mất độ chính xác.',
        'Python tự động cấp phát thêm độ chính xác cần thiết để biểu diễn con số nguyên chính xác tuyệt đối.',
        'Chương trình bị treo vô hạn vì CPU không thể xử lý số vượt quá 64-bit.'
      ],
      correctIndex: 2,
      explanation: 'Số nguyên trong Python hỗ trợ vô hạn độ chính xác, tự động mở rộng kích thước vùng nhớ khi cần thiết.'
    },
    {
      question: 'Biểu thức len(str(2 ** 12345)) thực thi theo thứ tự nào?',
      options: [
        'Từ trái sang phải: len tính trước, sau đó tới str, cuối cùng là 2 ** 12345.',
        'Từ trong ra ngoài: tính 2 ** 12345 trước, rồi đổi sang chuỗi bằng str(), sau đó lấy độ dài bằng len().',
        'Tất cả các hàm chạy song song trên các luồng CPU riêng biệt.',
        'Chỉ có hàm len() thực thi, các hàm bên trong bị bỏ qua.'
      ],
      correctIndex: 1,
      explanation: 'Các lệnh gọi hàm lồng nhau trong Python luôn đánh giá đối số bên trong trước: tính lũy thừa -> ép chuỗi -> đếm độ dài.'
    },
    {
      question: 'Theo Khung chuyên đề của sách, từ Python 3.11 trở lên, giới hạn mặc định khi chuyển đổi số nguyên sang chuỗi thập phân là bao nhiêu để ngăn ngừa tấn công DOS?',
      options: [
        '256 chữ số',
        '1.024 chữ số',
        '4.300 chữ số',
        '65.536 chữ số'
      ],
      correctIndex: 2,
      explanation: 'Giới hạn mặc định là 4.300 chữ số (có thể điều chỉnh bằng sys.set_int_max_str_digits) nhằm ngăn chặn tấn công cạn kiệt CPU.'
    }
  ],

  summary: [
    'Tập hợp kiểu số cốt lõi gồm số nguyên (int), số thực dấu phẩy động (float), số phức, Decimal và Fraction.',
    'Số nguyên trong Python không có kích thước cố định, tự động mở rộng theo dung lượng RAM.',
    'Toán tử số học cơ bản gồm +, *, và ** (lũy thừa).',
    'Module math cung cấp các hàm số học nâng cao; module random cung cấp các công cụ ngẫu nhiên.',
    'Python 3.11+ áp dụng giới hạn 4.300 chữ số khi đổi số nguyên sang chuỗi nhằm chống tấn công từ chối dịch vụ (DOS).',
    'Ý chính: Kiểu số trong Python vừa đơn giản như máy tính bỏ túi vừa mạnh mẽ với độ chính xác vô hạn.'
  ]
};
