export default {
  id: 'lp-c7-15',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.15',
  title: 'Biểu thức định dạng dựa trên Từ điển (dict) & Hàm vars()',
  subtitle: 'Cú pháp %(keyname)typecode, từ điển làm kho dữ liệu mẫu bản mẫu HTML/XML, hàm vars() tham chiếu biến cục bộ, và khả năng tái sử dụng giá trị nhiều lần',
  level: 'Trung bình',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo cú pháp định dạng dựa trên từ điển %(keyname)typecode với từ điển bên phải toán tử %.',
    'Áp dụng biểu thức định dạng như một công cụ bản mẫu (template engine) cơ bản để sinh văn bản HTML/XML từ tệp hoặc chuỗi nháy ba.',
    'Sử dụng hàm dựng sẵn vars() để chuỗi định dạng tự động tham chiếu đến các biến theo tên.',
    'Hiểu cách giải quyết hạn chế dựa trên vị trí của tuple bằng khả năng tái sử dụng cùng một giá trị nhiều lần.'
  ],

  intuition: {
    title: 'Hòm thư gán nhãn và cuốn sổ địa chỉ vars()',
    metaphor: 'Thay vì xếp hàng điểm danh theo số thứ tự vị trí (người thứ 1, người thứ 2) như trong tuple, phương thức dựa trên từ điển giống như việc dán nhãn tên lên từng ngăn tủ thư (% (name)s, % (year)s). Bất kể bạn gửi các lá thư vào tủ theo thứ tự nào, người nhận chỉ cần mở đúng ngăn có nhãn tên tương ứng để lấy thư. Thậm chí, hàm vars() giống như một người thủ thư mẫn cán: chỉ cần hô một tiếng vars(), người đó sẽ gom toàn bộ các biến đang nằm trên bàn làm việc của bạn vào một cuốn sổ tay để chuỗi định dạng tha hồ tra cứu theo tên!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ ÁNH XẠ KHÓA: %(keyname)s ➔ DICT HOẶC vars()</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:4px;">Chuỗi Bản Mẫu (Template)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.6;">
              <code>'%(name)s from %(year)s'</code><br>
              • Gọi khóa <code>name</code><br>
              • Gọi khóa <code>year</code>
            </div>
          </div>
          <div style="font-size:1.5rem;color:var(--accent-primary);font-weight:700;">%</div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">Từ Điển Dữ Liệu / vars()</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.6;">
              <code>{'name': 'Pat', 'year': 2024}</code><br>
              hoặc gọi trực tiếp <code>vars()</code><br>
              ➔ Tự động khớp theo tên!
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cú Pháp Định Dạng Dựa Trên Từ Điển: %(keyname)typecode',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 35 / 52 – Trang 36 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Là một phần mở rộng nâng cao và rất mạnh mẽ, định dạng chuỗi với toán tử <code>%</code> còn cho phép các mục tiêu chuyển đổi bên trái <strong>tham chiếu tới các khóa trong một từ điển (dictionary)</strong> được viết mã ở bên phải và sử dụng các giá trị tương ứng.</p>

        <p>Về mặt cú pháp:</p>
        <ul>
          <li><strong>Bên trái toán tử <code>%</code>:</strong> Tên khóa được đặt trong cặp dấu ngoặc đơn <code>()</code> ngay sau ký tự <code>%</code>, theo sau bởi mã kiểu chuyển đổi (ví dụ: <code>%(qty)s</code>, <code>%(tool)s</code>).</li>
          <li><strong>Bên phải toán tử <code>%</code>:</strong> Cung cấp một từ điển đơn lẻ (hoặc một đối tượng ánh xạ khác) chứa các cặp <code>'khóa': giá_trị</code> tương ứng.</li>
        </ul>

        <p>Về mặt chức năng, kỹ thuật này biến chuỗi định dạng thành một <strong>công cụ bản mẫu (template engine)</strong> cơ bản cực kỳ linh hoạt. Bạn không cần phải nhớ thứ tự vị trí của các phần tử như khi dùng tuple!</p>
      `,
      codeExamples: [
        {
          title: 'Định dạng chuỗi thông qua tham chiếu khóa từ điển',
          code: `# Tham chiếu khóa %(qty)s và %(tool)s từ hằng từ điển bên phải
res = '%(qty)s more %(tool)s' % {'qty': 1, 'tool': 'formatter'}
print(res)`,
          output: `1 more formatter`,
          annotations: [
            { line: 2, text: 'Khóa \'qty\' lấy giá trị 1, khóa \'tool\' lấy chuỗi \'formatter\'.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Ứng Dụng Làm Bản Mẫu Sinh Văn Bản HTML / XML & Tái Sử Dụng Giá Trị',
      content: `
        <p>Các chương trình tạo văn bản cấu trúc như HTML, XML, JSON hoặc sinh tệp cấu hình máy chủ thường xuyên tận dụng cú pháp này:</p>
        <ol>
          <li>Xây dựng một chuỗi bản mẫu nhiều dòng bằng hằng chuỗi nháy ba <code>"""..."""</code> (hoặc nạp nội dung bản mẫu từ một tệp văn bản bên ngoài).</li>
          <li>Tập hợp các tham số xử lý vào một từ điển <code>values</code>.</li>
          <li>Thực hiện toàn bộ các phép thay thế chỉ bằng một biểu thức định dạng duy nhất <code>reply % values</code>!</li>
        </ol>

        <p><strong>Khả năng tái sử dụng giá trị nhiều lần:</strong> Mặc dù các biểu thức định dạng dùng tuple có bản chất dựa trên vị trí (mỗi mục tiêu tiêu thụ một phần tử theo thứ tự), việc dùng từ điển cho phép <strong>cùng một khóa được tham chiếu lặp lại bao nhiêu lần tùy thích</strong> trong chuỗi định dạng mà không cần phải nhân bản dữ liệu ở bên phải!</p>
      `,
      codeExamples: [
        {
          title: 'Bản mẫu chuỗi nháy ba kết hợp từ điển sinh văn bản',
          code: `# Bản mẫu với các mục tiêu thay thế theo tên khóa
reply = """
Hello %(name)s!
Welcome to %(year)s
"""

# Tạo từ điển chứa các giá trị cần thay thế
values = {'name': 'Pat', 'year': 2024}

# Thực hiện toàn bộ phép thay thế một lần
print(reply % values)`,
          output: `Hello Pat!
Welcome to 2024`,
          annotations: [
            { line: 2, text: 'Chuỗi nháy ba bảo toàn thụt lề và dấu ngắt dòng làm template lý tưởng.' },
            { line: 11, text: 'print() hiển thị chuỗi kết quả hoàn chỉnh sau khi điền dữ liệu.' }
          ]
        },
        {
          title: 'Tái sử dụng cùng một giá trị nhiều lần với các định dạng khác nhau',
          code: `# Khóa 'value' được tham chiếu 3 lần với 3 đặc tả số thực khác nhau
template = '%(value)f, %(value).2f, %(value).f'
res = template % ({'value': 1 / 3.0})

print(res)`,
          output: `0.333333, 0.33, 0`,
          annotations: [
            { line: 2, text: '%(value)f lấy 6 số lẻ mặc định; %(value).2f lấy 2 số lẻ; %(value).f làm tròn về số nguyên.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Kỹ Thuật Tự Động Hóa Với Hàm Dựng Sẵn vars()',
      content: `
        <p>Mẹo định dạng bằng từ điển đôi khi còn được kết hợp tinh tế với hàm dựng sẵn <strong><code>vars()</code></strong> của Python. Khi được gọi mà không có đối số, hàm <code>vars()</code> trả về một từ điển chứa <em>tất cả các biến hiện đang tồn tại trong phạm vi cục bộ</em> tại nơi nó được thực thi:</p>

        <pre style="margin:12px 0;padding:12px;background:var(--bg-surface-alt);border-radius:6px;font-family:var(--font-mono);font-size:0.88rem;color:var(--text-secondary);"><span style="color:var(--accent-primary);">name</span> = 'Pat'
<span style="color:var(--accent-primary);">year</span> = 2024
<span style="color:var(--success);">vars()</span>  <span style="color:var(--text-muted);"># {'name': 'Pat', 'year': 2024, ...các tên dựng sẵn khác...}</span></pre>

        <p>Khi được sử dụng ở bên phải của một thao tác định dạng <code>%</code>, điều này cho phép chuỗi định dạng <strong>tham chiếu trực tiếp tới các biến cục bộ theo đúng tên của chúng</strong> mà bạn không cần phải tốn công tự tay nhặt từng biến để đóng gói vào từ điển!</p>

        <p>Kỹ thuật này chính là tiền thân tinh thần của cơ chế nội suy chuỗi mà sau này f-string đã hoàn thiện ở Python 3.6.</p>
      `,
      codeExamples: [
        {
          title: 'Kết hợp chuỗi định dạng %(name)s với hàm vars()',
          code: `name = 'Pat'
year = 2024

# Biến name và year tự động trở thành các khóa bên trong vars()
result = '%(name)s from %(year)s' % vars()

print("Kết quả:", result)
print("Kiểu của vars():", type(vars()))`,
          output: `Kết quả: Pat from 2024
Kiểu của vars(): <class 'dict'>`,
          annotations: [
            { line: 5, text: '%(name)s tự động tìm thấy biến name thông qua từ điển vars().' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Ứng Dụng Trong Hệ Thống Ghi Nhật Ký (Logging)',
      content: `Thư viện chuẩn logging của Python vẫn ưu tiên cú pháp biểu thức % với từ điển vì tính lười (lazy evaluation): chuỗi chỉ được thực sự định dạng khi cấp độ log đủ điều kiện để ghi, giúp tối ưu hiệu năng vượt trội so với việc nối chuỗi trước.`
      }
    ],
    pitfalls: [
      {
      title: 'Lỗi KeyError Khi Khóa Không Tồn Tại',
      content: `Nếu trong chuỗi định dạng bạn viết %(username)s nhưng trong từ điển bên phải không có khóa 'username', Python sẽ ném ra ngoại lệ KeyError ngay lập tức. Hãy đảm bảo từ điển cung cấp đủ tất cả các khóa được chuỗi bản mẫu yêu cầu.`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Sinh thẻ HTML sinh viên bằng bản mẫu từ điển và vars()',
      question: 'Khai báo hai biến: student = "Lê Văn A" và score = 9.5. Hãy sử dụng hàm vars() cùng biểu thức định dạng để in ra một đoạn thẻ HTML: "<div class=\\"card\\"><h3>Học viên: Lê Văn A</h3><p>Điểm số: 09.50</p></div>" (điểm số có độ rộng 5, đệm số 0 và có 2 chữ số thập phân).',
      starterCode: `student = "Lê Văn A"
score = 9.5

# Viết mã tạo chuỗi HTML với %(...) và vars() ở đây:
# html_template = ...
# result = ...
`,
      solution: `student = "Lê Văn A"
score = 9.5

html_template = '<div class="card"><h3>Học viên: %(student)s</h3><p>Điểm số: %(score)05.2f</p></div>'
result = html_template % vars()

print(result)`,
      hints: [
        'Dùng %(student)s để trích xuất tên học viên.',
        'Dùng %(score)05.2f để định dạng điểm số với cờ đệm 0, độ rộng 5 và 2 chữ số sau dấu phẩy.',
        'Truyền trực tiếp vars() vào bên phải toán tử %.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Khi sử dụng biểu thức định dạng chuỗi dựa trên từ điển, cú pháp của mục tiêu chuyển đổi bên trái được viết như thế nào?',
      options: [
        '%[keyname]s',
        '%(keyname)s',
        '%{keyname}s',
        '%$keyname$s'
      ],
      correctIndex: 1,
      explanation: 'Cú pháp chuẩn xác của mục tiêu chuyển đổi theo từ điển là %(keyname)typecode với tên khóa được đặt trong cặp dấu ngoặc đơn ().'
    },
    {
      question: 'Hàm dựng sẵn vars() trả về đối tượng gì khi được gọi không có đối số?',
      options: [
        'Một danh sách (list) chứa tên các biến.',
        'Một tuple chứa tất cả giá trị của các biến.',
        'Một từ điển (dictionary) chứa tất cả các biến đang tồn tại trong phạm vi hiện tại.',
        'Một chuỗi văn bản chứa mã nguồn.'
      ],
      correctIndex: 2,
      explanation: 'vars() trả về một dictionary ánh xạ từ tên biến (chuỗi) sang giá trị hiện tại của biến đó trong phạm vi thực thi.'
    }
  ],

  summary: {
    takeaways: [
      'Cú pháp % (keyname)typecode cho phép chuỗi định dạng ánh xạ trực tiếp đến các khóa của một từ điển.',
      'Định dạng dựa trên từ điển hoạt động như một công cụ bản mẫu (template engine) lý tưởng cho văn bản nhiều dòng và sinh mã HTML/XML.',
      'Cùng một khóa từ điển có thể được tái sử dụng nhiều lần trong chuỗi với các đặc tả định dạng khác nhau.',
      'Hàm dựng sẵn vars() cung cấp từ điển biến cục bộ, giúp chuỗi định dạng tự động đọc giá trị của các biến theo tên.'
    ],
    nextSteps: 'Trong bài học tiếp theo (C7.16), chúng ta sẽ khám phá phương thức định dạng chuỗi: str.format() ra đời từ Python 3.0, cú pháp dấu ngoặc nhọn {}, truy xuất thuộc tính đối tượng và các ràng buộc chỉ mục.'
  }
};
