export default {
  id: 'lp-c5-12',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.12',
  title: 'Dấu gạch dưới phân cách trong số & Bẫy dấu phẩy tạo Tuple',
  subtitle: 'Cú pháp dấu gạch dưới từ Python 3.6, quy tắc đặt dấu, bản chất trong bộ nhớ và bẫy tai hại khi dùng dấu phẩy',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng dấu gạch dưới (_) để nhóm các chữ số trong số nguyên, số thực float, hex, bát phân và nhị phân.',
    'Hiểu bản chất cú pháp: dấu gạch dưới hoàn toàn bị loại bỏ khi nạp vào bộ nhớ RAM.',
    'Nắm vững 3 quy tắc cấm của cú pháp dấu gạch dưới (không ở đầu, không ở cuối, không đứng liên tiếp).',
    'Nhận biết khả năng xử lý dấu gạch dưới trong các hàm chuyển đổi chuỗi int() và float().',
    'Cảnh giác cao độ với bẫy dấu phẩy (,): biến một con số thành một bộ tuple gồm nhiều phần tử.'
  ],

  intuition: {
    title: 'Dấu phân cách vô hình và chiếc bẫy dấu phẩy',
    metaphor: 'Khi đọc một số tiền mười tỷ "10000000000", mắt bạn phải hoa lên đếm từng số 0. Dấu gạch dưới trong Python 3.6+ giống như việc bạn dùng bút chì vạch nhẹ những nét đứt "10_000_000_000" để dễ nhìn hơn: người đọc thấy thoải mái, nhưng đối với máy tính, lớp phấn chì đó bị thổi bay ngay lập tức khi nạp vào bộ nhớ. Nhưng hãy cẩn thận: nếu quen tay gõ dấu phẩy "10,000,000,000" như trong văn bản Word, Python sẽ không coi đó là một con số mười tỷ, mà coi là bạn vừa tạo ra một bộ tuple gồm 4 số nguyên riêng biệt: (10, 0, 0, 0)!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN BIỆT DẤU GẠCH DƯỚI (_) VÀ DẤU PHẨY (,) TRONG SỐ HỌC</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Dấu Gạch Dưới (ĐÚNG)</div>
            <div style="font-size:0.85rem;color:var(--text-primary);margin-bottom:4px;"><code>x = 12_345_678</code></div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              ➔ Giá trị: <code>12345678</code><br>
              ➔ Kiểu: <code>&lt;class 'int'&gt;</code><br>
              ➔ Một số nguyên duy nhất.
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--danger);border-radius:8px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">Dấu Phẩy (BẪY SAI LẦM)</div>
            <div style="font-size:0.85rem;color:var(--danger);margin-bottom:4px;"><code>x = 12,345,678</code></div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              ➔ Giá trị: <code>(12, 345, 678)</code><br>
              ➔ Kiểu: <code>&lt;class 'tuple'&gt;</code><br>
              ➔ Bộ tuple gồm 3 số nguyên!
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cú pháp Dấu gạch dưới Phân cách trong Số (Python 3.6+)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 19 / 38 – Trang 21 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Kể từ phiên bản Python 3.6, các hằng số bằng chữ số học trong Python có thể được viết kèm các <strong>dấu gạch dưới lồng bên trong (<code>_</code>)</strong> để nhóm các chữ số giúp dễ quan sát hơn. Những dấu gạch dưới này hoàn toàn không làm thay đổi giá trị của số; Python chỉ đơn giản là loại bỏ chúng sau khi phân tích cú pháp mã nguồn.</p>
        <p>Tính năng này hoạt động trên tất cả các loại số và cơ số mà chúng ta đã gặp:</p>
      `,
      codeExamples: [
        {
          title: 'Các hằng số số học sử dụng dấu gạch dưới phân cách',
          code: `>>> 9999999999999 == 9_999_999_999_999               # Thập phân: nhóm hàng nghìn
True
>>> 0xFFFFFFFF == 0xFF_FF_FF_FF                       # Hex: các byte 8-bit
True
>>> 0o777777777777 == 0o777_777_777_777               # Bát phân: 9 bit mỗi nhóm
True
>>> 0b1111111111111111 == 0b1111_1111_1111_1111       # Nhị phân: các cụm 4-bit (nibble)
True
>>> 3.141592653589793 == 3.141_592_653_589_793       # Float: các chữ số thập phân
True
>>> 123456789.123456789 == 123_456_789.123_456_789   # Float: cả hai phía dấu chấm
True`,
          output: `True
True
True
True
True
True`,
          annotations: [
            { line: 2, text: 'Dấu gạch dưới phân cách hàng nghìn giúp chuỗi 13 chữ số trở nên rõ ràng.' },
            { line: 4, text: 'Phân nhóm byte trong hệ hex (mỗi byte gồm 2 ký tự hex).' },
            { line: 8, text: 'Nhóm từng cụm 4-bit (nibble) trong số nhị phân.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bản chất Bộ nhớ, Định dạng Hiển thị và Quy tắc Cú pháp',
      content: `
        <p>Bạn nên nhớ rằng tính năng này <strong>chỉ tồn tại ở bề mặt cú pháp</strong>. Ví dụ, các con số sẽ mất đi dấu gạch dưới ngay sau khi được nạp vào bộ nhớ. Khi in ra, số sẽ trở về dạng liền mạch.</p>
        <p>Nếu muốn hiển thị lại dấu phân cách hàng nghìn khi xuất chuỗi, bạn dùng định dạng chuỗi với đặc tả dấu phẩy <code>:,</code> hoặc dấu gạch dưới <code>:_</code>:</p>
        <pre class="code-block"><code>>>> x = 9_999_998
>>> x
9999998
>>> f'{x:,} and {x:_}'
'9,999,998 and 9_999_998'</code></pre>

        <h4>Các quy tắc kiểm tra cú pháp của dấu gạch dưới</h4>
        <p>Python không thực hiện bất kỳ kiểm tra tính hợp lý ngữ nghĩa nào đối với dấu gạch dưới (ví dụ bạn viết <code>1_23_456</code> không theo hàng nghìn thì Python vẫn chấp nhận). Tuy nhiên, Python <strong>nghiêm cấm 3 vị trí đặt dấu</strong>:</p>
        <ul>
          <li><strong>Không được đặt ở đầu số:</strong> <code>_9</code> sẽ bị hiểu nhầm thành tên biến (<code>NameError</code>).</li>
          <li><strong>Không được đặt ở cuối số:</strong> <code>9_</code> gây lỗi cú pháp <code>SyntaxError: invalid decimal literal</code>.</li>
          <li><strong>Không được xuất hiện liên tiếp nhiều dấu:</strong> <code>9__9</code> gây lỗi <code>SyntaxError</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra các lỗi cú pháp khi dùng dấu gạch dưới',
          code: `>>> 99_9
999
>>> 1_23_456_7890          # Cú pháp hợp lệ dù không chia theo nhóm 3
1234567890
>>> hex(0xf_ff_fff_f_f)    # Tùy ý chia trong hex
'0xffffffff'
>>> int('1_234_567')       # Hoạt động mượt mà với chuỗi đầu vào
1234567
>>> float('1_2_34.567_8_90')
1234.56789`,
          output: `999
1234567890
'0xffffffff'
123456789
1234.56789`,
          annotations: [
            { line: 3, text: 'Python chấp nhận đặt dấu gạch dưới ở bất kỳ vị trí số nào bên trong.' },
            { line: 7, text: 'Hàm int() và float() tự động bỏ qua dấu gạch dưới khi phân tích chuỗi dữ liệu.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bẫy Chí mạng: Tuyệt đối Không Dùng Dấu Phẩy làm Dấu Phân cách',
      content: `
        <p>Cũng hãy luôn ghi nhớ rằng <strong>dấu phẩy <code>,</code> không thể được sử dụng</strong> trong các hằng số bằng chữ số học mà bạn viết.</p>
        <p>Mặc dù trông chúng có vẻ tương đồng trong văn bản tiếng Anh thông thường (như <code>12,345,678</code>), nhưng trong cú pháp Python, dấu phẩy lại là toán tử ngăn cách phần tử để tạo ra một <strong>bộ giá trị (tuple)</strong>:</p>
        <pre class="code-block"><code>>>> 12_345_678      # Dấu gạch dưới bị bỏ qua -> số nguyên 12345678
12345678
>>> 12,345,678      # Nhưng dấu phẩy lại tạo thành một tuple!
(12, 345, 678)</code></pre>
        <p>Nếu bạn vô tình truyền <code>12,345,678</code> vào một hàm yêu cầu số nguyên, hàm đó sẽ nhận một bộ tuple gồm 3 số nguyên và có thể sinh ra các lỗi logic cực kỳ khó phát hiện.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy dấu phẩy tạo tuple thay vì số nguyên',
        content: 'Tuyệt đối không bao giờ viết dấu phẩy bên trong một hằng số số học. Lệnh <code>salary = 50,000,000</code> sẽ gán cho biến <code>salary</code> một tuple <code>(50, 0, 0)</code> thay vì con số 50 triệu! Hãy luôn sử dụng dấu gạch dưới: <code>salary = 50_000_000</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Làm sạch chuỗi số có dấu gạch dưới hoặc dấu phẩy',
      level: 'Dễ',
      problem: 'Cho một chuỗi dữ liệu thô đọc từ tệp văn bản: <code>raw = "1,234,567"</code>. Hãy chuyển đổi chuỗi này thành số nguyên hợp lệ trong Python bằng cách thay thế dấu phẩy.',
      hint: 'Dùng raw.replace(",", "") rồi truyền vào int().',
      solutionCode: `raw = "1,234,567"
# Chuỗi thô có dấu phẩy nếu truyền trực tiếp vào int() sẽ lỗi ValueError
cleaned = raw.replace(",", "")
so_nguyen = int(cleaned)

print("Số nguyên đã làm sạch:", so_nguyen)
print("Hiển thị lại với dấu gạch dưới:", f"{so_nguyen:_}")`,
      solutionOutput: `Số nguyên đã làm sạch: 1234567
Hiển thị lại với dấu gạch dưới: 1_234_567`,
      explanation: 'Hàm <code>int()</code> hiểu dấu gạch dưới nhưng không chấp nhận dấu phẩy. Việc dùng <code>replace(",", "")</code> giúp loại bỏ dấu phẩy trước khi chuyển đổi.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là SAI về quy tắc sử dụng dấu gạch dưới trong hằng số số học của Python?',
      options: [
        'Dấu gạch dưới có thể được đặt ở giữa các chữ số của số nguyên và số thực float.',
        'Có thể đặt một dấu gạch dưới ở đầu số (ví dụ: _100) để biểu diễn số dương.',
        'Không được đặt hai dấu gạch dưới liên tiếp (ví dụ: 10__000).',
        'Không được đặt dấu gạch dưới ở vị trí cuối cùng của số (ví dụ: 100_).'
      ],
      correctIndex: 1,
      explanation: 'Dấu gạch dưới ở đầu (_100) sẽ bị Python coi là tên định danh biến (identifier) chứ không phải số học, gây lỗi NameError nếu biến chưa được gán.'
    },
    {
      question: 'Trong Python, biểu thức "x = 1,000,000" sẽ tạo ra đối tượng thuộc kiểu dữ liệu gì?',
      options: [
        'Kiểu số nguyên int với giá trị 1 triệu.',
        'Kiểu số thực float.',
        'Kiểu bộ giá trị tuple chứa 3 phần tử: (1, 0, 0).',
        'Báo lỗi SyntaxError do dấu phẩy không hợp lệ.'
      ],
      correctIndex: 2,
      explanation: 'Dấu phẩy trong Python là toán tử tạo tuple. Do đó "1,000,000" tạo ra bộ tuple gồm 3 số nguyên (1, 0, 0).'
    }
  ],

  summary: [
    'Python 3.6+ hỗ trợ dấu gạch dưới (_) để phân nhóm chữ số trong mọi kiểu và cơ số số học.',
    'Dấu gạch dưới chỉ mang tính hình thức cú pháp, bị loại bỏ hoàn toàn trong bộ nhớ RAM.',
    'Quy tắc cú pháp: cấm đặt ở đầu (_9), cấm đặt ở cuối (9_), cấm đặt liên tiếp (9__9).',
    'Các hàm chuyển đổi int() và float() tự động hỗ trợ dấu gạch dưới trong chuỗi đầu vào.',
    'Bẫy chí mạng: Tuyệt đối không dùng dấu phẩy (,) làm phân cách hàng nghìn vì sẽ tạo thành đối tượng tuple.'
  ]
};