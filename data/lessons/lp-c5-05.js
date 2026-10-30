export default {
  id: 'lp-c5-05',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.5',
  title: 'Định dạng hiển thị số & Phân biệt str với repr',
  subtitle: 'Hiện tượng 1.1 + 2.2 = 3.3000000000000003, giới hạn phần cứng nhị phân và cơ chế chuỗi repr vs str',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên nhân cốt lõi khiến 1.1 + 2.2 sinh ra 3.3000000000000003: giới hạn phần cứng dấu phẩy động nhị phân.',
    'Sử dụng các công cụ định dạng chuỗi (% formatting, str.format, f-string) để chủ động kiểm soát số chữ số hiển thị.',
    'Phân biệt bản chất của hai hàm dựng sẵn repr() (dạng mã lệnh cho REPL) và str() (dạng thân thiện cho print).',
    'Nhận thức rõ: định dạng chuỗi chỉ thay đổi cách hiển thị trực quan, không thay đổi giá trị nhị phân lưu trong bộ nhớ.'
  ],

  intuition: {
    title: 'Phân số 1/3 trong hệ thập phân và 0.1 trong hệ nhị phân',
    metaphor: 'Trong hệ thập phân (cơ số 10), bạn không bao giờ có thể viết hết phân số 1/3 bằng một số chữ số hữu hạn: nó sẽ kéo dài vô tận thành 0.333333... Đối với phần cứng máy tính sử dụng hệ nhị phân (cơ số 2), số 0.1 hay 0.2 cũng rơi vào tình trạng tương tự: chúng là những phân số vô hạn tuần hoàn trong hệ nhị phân! Khi chip máy tính phải cắt cụt chuỗi bit này để nhét vừa vào thanh ghi 64-bit (chuẩn IEEE 754), một phần sai số tí hon ở chữ số thứ 17 xuất hiện. Cả Python lẫn chip máy tính đều không tính sai—chỉ là phần cứng đang làm hết sức trong giới hạn vật lý của nó.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN BIỆT ĐỊNH DẠNG HIỂN THỊ: REPR() VS STR()</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">repr(obj) / REPL Phản hồi</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:8px;">• Mục đích: Cho lập trình viên và kiểm thử<br>• Hình thức: Trông giống mã nguồn Python<br>• Ví dụ chuỗi: <code>"'hack'"</code> (có dấu nháy)</div>
            <div style="padding:6px;background:var(--bg-surface-alt);border-radius:4px;font-size:0.75rem;color:var(--text-muted);">>>> repr('hack') ➔ "'hack'"</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">str(obj) / Thao tác print()</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:8px;">• Mục đích: Thân thiện với người dùng cuối<br>• Hình thức: Văn bản tự nhiên, bỏ dấu nháy ngoài<br>• Ví dụ chuỗi: <code>'hack'</code></div>
            <div style="padding:6px;background:var(--bg-surface-alt);border-radius:4px;font-size:0.75rem;color:var(--text-muted);">>>> str('hack') ➔ 'hack'</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Hiện tượng Số thực Kỳ lạ: 1.1 + 2.2 = 3.3000000000000003',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 11 / 38 – Trang 12 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Một khi bạn bắt đầu thực hành nghiêm túc với các con số trong Python, kết quả của một số biểu thức có thể trông hơi kỳ lạ trong lần đầu tiên bạn nhìn thấy chúng:</p>
        <pre class="code-block"><code>>>> 1.1 + 2.2
3.3000000000000003
>>> print(1.1 + 2.2)
3.3000000000000003</code></pre>
        <p>Toàn bộ câu chuyện đằng sau kết quả kỳ lạ này bắt nguồn từ <strong>những giới hạn của phần cứng dấu phẩy động</strong> và việc nó không có khả năng biểu diễn chính xác hoàn hảo một số giá trị trong một số lượng bit nhị phân hữu hạn (chuẩn IEEE 754 64-bit).</p>
        <p>Các số thực dấu phẩy động của Python ánh xạ trực tiếp tới các vi mạch bán dẫn bên dưới trên thiết bị của bạn và chỉ chính xác ở mức độ mà các con chip đó cho phép. Cả phần cứng lẫn Python đều không hề mắc lỗi ở đây. Để làm cho kết quả hiển thị thân thiện và gọn gàng, bạn có thể chủ động kiểm soát số lượng chữ số thập phân bằng các công cụ định dạng chuỗi.</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm soát hiển thị số thực bằng định dạng chuỗi',
          code: `>>> num = 1.1 + 2.2
>>> num                           # Tự động phản hồi (dạng repr)
3.3000000000000003
>>> '%e' % num                    # Biểu thức định dạng chuỗi khoa học
'3.300000e+00'
>>> '%.1f' % num                  # Định dạng rút gọn 1 chữ số thập phân
'3.3'
>>> f'{num:e}', f'{num:.1f}'      # F-string hiện đại
('3.300000e+00', '3.3')`,
          output: `3.3000000000000003
'3.300000e+00'
'3.3'
('3.300000e+00', '3.3')`,
          annotations: [
            { line: 2, text: 'Hiển thị mặc định phản ánh chính xác từng bit xấp xỉ trong bộ nhớ.' },
            { line: 4, text: 'Toán tử %e định dạng theo ký hiệu số mũ khoa học.' },
            { line: 6, text: '%.1f làm tròn hiển thị đến 1 chữ số sau dấu chấm: "3.3".' },
            { line: 8, text: 'Cú pháp f-string hiện đại cho phép định dạng trực tiếp bên trong biểu thức.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phân biệt Cơ chế Hiển thị: str và repr',
      content: `
        <p>Định dạng đầu ra mặc định của các phản hồi tương tác trong REPL và lệnh <code>print()</code> về mặt kỹ thuật lần lượt tương ứng với hai hàm dựng sẵn là <strong><code>repr()</code></strong> và <strong><code>str()</code></strong>:</p>
        <ul>
          <li><strong><code>repr(obj)</code> (và phản hồi REPL mặc định):</strong> Chuyển đổi đối tượng thành một chuỗi đại diện trông giống như mã lệnh hợp lệ của Python để tái tạo lại đối tượng đó. Rất hữu ích cho lập trình viên khi gỡ lỗi (debug).</li>
          <li><strong><code>str(obj)</code> (và thao tác <code>print()</code>):</strong> Chuyển đổi sang một định dạng thân thiện hơn với người dùng nếu có sẵn, thường loại bỏ các dấu nháy bao quanh chuỗi.</li>
        </ul>
        <p>Bên cạnh việc cung cấp chuỗi in ấn cho các đối tượng tùy ý, hàm dựng sẵn <code>str</code> cũng là tên của kiểu đối tượng chuỗi ký tự, có thể được gọi kèm tên bảng mã để giải mã một chuỗi Unicode từ một chuỗi byte (thay thế cho phương thức <code>bytes.decode</code>).</p>
      `,
      codeExamples: [
        {
          title: 'So sánh đầu ra của repr() và str()',
          code: `>>> repr('hack')   # Dùng cho phản hồi tương tác: dạng mã lệnh
"'hack'"
>>> str('hack')    # Dùng cho print: dạng thân thiện với người dùng
'hack'
>>> print(repr('hack'))
'hack'
>>> print(str('hack'))
hack`,
          output: `"'hack'"
'hack'
'hack'
hack`,
          annotations: [
            { line: 1, text: 'repr("hack") trả về chuỗi có chứa cả cặp dấu nháy đơn bên trong.' },
            { line: 3, text: 'str("hack") trả về văn bản sạch không có dấu nháy mã nguồn.' },
            { line: 7, text: 'Khi print(str(...)), văn bản được in thô ra màn hình không dấu nháy.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Định dạng chuỗi không thay đổi giá trị trong bộ nhớ',
        content: 'Hãy luôn nhớ rằng việc sử dụng <code>f"{num:.1f}"</code> chỉ sinh ra một đối tượng <strong>chuỗi ký tự (str)</strong> mới để phục vụ mục đích in ấn hoặc xuất báo cáo. Con số gốc <code>num</code> trong bộ nhớ vẫn giữ nguyên giá trị nhị phân đầy đủ <code>3.3000000000000003</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Định dạng tỷ lệ phần trăm với f-string',
      level: 'Dễ',
      problem: 'Cho biến <code>ty_le = 2 / 3</code>. Hãy in ra màn hình chuỗi hiển thị mặc định của <code>ty_le</code>, và chuỗi định dạng phần trăm lấy đúng 2 chữ số thập phân kèm ký hiệu <code>%</code> bằng f-string.',
      hint: 'Sử dụng đặc tả định dạng .2% trong f-string.',
      solutionCode: `ty_le = 2 / 3
print("Mặc định:", ty_le)
print("Định dạng phần trăm:", f"{ty_le:.2%}")`,
      solutionOutput: `Mặc định: 0.6666666666666666
Định dạng phần trăm: 66.67%`,
      explanation: 'Đặc tả <code>:.2%</code> trong f-string tự động nhân giá trị với 100, làm tròn đến 2 chữ số thập phân và gắn thêm ký hiệu <code>%</code> vào cuối chuỗi kết quả.'
    }
  ],

  quiz: [
    {
      question: 'Tại sao biểu thức 1.1 + 2.2 trong Python lại cho ra kết quả là 3.3000000000000003 thay vì 3.3?',
      options: [
        'Do trình thông dịch CPython bị lỗi tính toán số học.',
        'Do giới hạn phần cứng nhị phân không thể biểu diễn chính xác hoàn hảo một số số thực trong số bit hữu hạn.',
        'Do kiểu dữ liệu float trong Python chỉ hỗ trợ 16-bit.',
        'Do Python tự động cộng thêm số dư ngẫu nhiên vào cuối số thực.'
      ],
      correctIndex: 1,
      explanation: 'Đây là ràng buộc vật lý của phần cứng dấu phẩy động nhị phân (chuẩn IEEE 754) chung cho hầu hết các ngôn ngữ lập trình, không phải lỗi của Python.'
    },
    {
      question: 'Sự khác biệt cốt lõi giữa hai hàm dựng sẵn repr() và str() là gì?',
      options: [
        'repr() dùng cho số nguyên, còn str() dùng cho số thực.',
        'repr() tạo chuỗi dạng mã lệnh cho lập trình viên gỡ lỗi, còn str() tạo định dạng thân thiện cho người dùng.',
        'repr() làm tròn số thập phân, còn str() cắt bỏ phần thập phân.',
        'repr() là hàm cũ của Python 2, còn str() là hàm mới của Python 3.'
      ],
      correctIndex: 1,
      explanation: 'repr() tạo ra các chuỗi trông như thể chúng là mã lệnh (cho phản hồi REPL), trong khi str() chuyển đổi sang định dạng thân thiện hơn (dùng cho lệnh print).'
    }
  ],

  summary: [
    'Kết quả 1.1 + 2.2 = 3.3000000000000003 bắt nguồn từ giới hạn biểu diễn của phần cứng dấu phẩy động nhị phân IEEE 754.',
    'Có thể dùng toán tử %, phương thức format(), hoặc f-string để kiểm soát số chữ số hiển thị.',
    'Hàm repr() tạo chuỗi biểu diễn dạng mã lệnh, là định dạng hiển thị mặc định của REPL.',
    'Hàm str() tạo chuỗi biểu diễn thân thiện với người dùng, được lệnh print() sử dụng.',
    'Định dạng chuỗi chỉ tạo ra một chuỗi văn bản mới để hiển thị, không làm thay đổi giá trị của đối tượng số trong bộ nhớ.'
  ]
};