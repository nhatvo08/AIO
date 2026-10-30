export default {
  id: 'lp-c6-12',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.12',
  title: 'Gợi ý Kiểu (Type Hinting): Cú pháp, __annotations__ & Bị phớt lờ khi Thực thi',
  subtitle: 'Khám phá tính năng gợi ý kiểu trong Python: cú pháp khai báo, cách thức lưu trữ trong hàm và sự vô hiệu hoàn toàn tại runtime',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cú pháp cơ bản của gợi ý kiểu (type hinting) trên biến, tập hợp generic (list[int]) và câu lệnh type trong Python 3.12+.',
    'Chứng minh bằng thực nghiệm: gợi ý kiểu a: int không hề tạo ra biến nếu thiếu phép gán (phát sinh NameError).',
    'Khám phá chú giải hàm (function annotations) và cách Python lưu trữ thông tin này trong thuộc tính __annotations__.',
    'Hiểu bản chất cốt lõi: trình thông dịch Python hoàn toàn phớt lờ và không ép buộc bất kỳ ràng buộc nào của gợi ý kiểu khi chạy chương trình.'
  ],

  intuition: {
    title: 'Những chiếc nhãn ghi chú bằng giấy dán Post-it',
    metaphor: 'Hãy tưởng tượng bạn dán một mẩu giấy Post-it màu vàng lên nắp chiếc bình thủy tinh trong bếp với dòng chữ nắn nót: "Chỉ đựng mật ong" (a: int). Tuy nhiên, chiếc bình này không hề có khóa nhận diện vân tay hay cảm biến quang học nào cả. Nếu một người khác tiện tay đổ nước mắm vào bình (a = "hack"), chiếc bình vẫn nhận và giữ nguyên vẹn nước mắm mà không hề phát ra tiếng còi báo động nào! Mẩu giấy Post-it chỉ có tác dụng nhắc nhở những người cùng làm bếp (hoặc người kiểm tra quy trình như mypy). Đối với bản thân chiếc bình (trình thông dịch Python khi chạy), mẩu giấy dán đó hoàn toàn vô hình.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢN CHẤT CỦA GỢI Ý KIỂU (TYPE HINTING) TẠI RUNTIME</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">1. Trên Giấy tờ (Cú pháp & Tool ngoài)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>def func(a: int, b: list[str]) -&gt; float:</code><br>
              • Trông giống như khai báo kiểu tĩnh khắt khe.<br>
              • Công cụ bên thứ ba (mypy, IDE) dùng để soi lỗi tĩnh.<br>
              • Lưu vào từ điển <code>func.__annotations__</code>.
            </div>
          </div>
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--danger);border-radius:8px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">2. Khi Thực thi Thực tế (Python Runtime)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>func('You', 'Want') ──► 'anythingYouWant'</code><br>
              • <strong style="color:var(--danger);">Python phớt lờ 100% gợi ý kiểu!</strong><br>
              • Không ném lỗi kiểu, không ép kiểu, không kiểm tra.<br>
              • Mã chạy hoàn toàn dựa trên cơ chế định kiểu động.
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Gợi ý Kiểu: Cú pháp và Module typing',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 13 / 17 – Trang 14 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Cuối cùng là một nút thắt cốt truyện đầy bất ngờ. Nếu bạn từng đọc các đoạn mã Python được viết trong những năm gần đây, có thể bạn đã vô tình bắt gặp một số cú pháp khai báo kiểu cho các tên biến trông giống như dưới đây—những cú pháp dường như rất kỳ lạ và lạc lõng đối với một ngôn ngữ định kiểu động như Python, thoạt nhìn còn mâu thuẫn với một số luận điểm vừa được khẳng định trong chương này:</p>
      `,
      codeExamples: [
        {
          title: 'Cú pháp gợi ý kiểu cho biến trong Python',
          code: `>>> a: int
>>> b: int = 0
>>> c: list[int] = [1, 2, 3]`,
          output: ``,
          annotations: [
            { line: 1, text: 'Gợi ý kiểu đơn thuần cho biến a là int mà không gán giá trị.' },
            { line: 2, text: 'Gợi ý kiểu int kèm phép gán khởi tạo b = 0.' },
            { line: 3, text: 'Gợi ý kiểu generic: c là một danh sách chứa các số nguyên int.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bí danh Kiểu (Type Aliases) và Câu lệnh type từ Python 3.12',
      content: `
        <p>Cơ chế này được gọi là <strong>gợi ý kiểu (type hinting)</strong>. Về mặt cú pháp, nó có dạng một dấu hai chấm kèm theo kiểu đối tượng nằm giữa tên biến và phép gán tùy chọn. Kiểu đối tượng có thể là một tên kiểu đơn lẻ hoặc một biểu thức biểu thị các tập hợp phần tử (như <code>list[int]</code> nghĩa là một danh sách chứa các số nguyên) và có thể sử dụng các tên được định nghĩa sẵn trong module <code>typing</code> thuộc thư viện chuẩn (chẳng hạn như <code>Iterable</code>, <code>Union</code>, và <code>Any</code>) để diễn đạt các kiểu dữ liệu phong phú hơn theo lý thuyết định kiểu phức tạp.</p>

        <p>Kể từ phiên bản <strong>Python 3.12 (PEP 695)</strong>, một câu lệnh <code>type</code> mới thậm chí còn cho phép định nghĩa các bí danh kiểu (type aliases) để dùng trong các gợi ý kiểu, mặc dù các phép gán đơn giản trước đó cũng có thể làm được điều này:</p>
      `,
      codeExamples: [
        {
          title: 'Định nghĩa Type Alias bằng câu lệnh type mới trong Python 3.12+',
          code: `>>> type Data = list[float]  # Cú pháp câu lệnh type mới từ Python 3.12
>>> Data = list[float]       # Cách làm truyền thống bằng phép gán thông thường`,
          output: ``,
          annotations: [
            { line: 1, text: 'Câu lệnh type tạo ra một TypeAliasType trong module typing.' },
            { line: 2, text: 'Phép gán biến thông thường cũng đạt được kết quả tương đương.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bản chất Thực tế: Không Bắt buộc, Không Dùng khi Chạy',
      content: `
        <p>Tuy nhiên, như Mark Lutz lưu ý sâu sắc: <strong>gợi ý kiểu là tính năng hoàn toàn mang tính tùy chọn, không được sử dụng khi thực thi, và phần lớn mang tính học thuật</strong>. Bản thân Python không hề bắt buộc phải có chúng, hoàn toàn không sử dụng chúng theo bất kỳ hình thức nào khi chạy chương trình và cũng không có ý định làm như vậy trong tương lai.</p>

        <p>Chúng chỉ được thiết kế dành riêng cho các công cụ bên thứ ba như <strong>trình kiểm tra kiểu tĩnh (type checker như <code>mypy</code>)</strong>, và đóng vai trò như một hình thức tài liệu hóa thay thế cho các dòng chú thích trong mã nguồn. Bạn hoàn toàn có thể diễn đạt những điều tương tự một cách giản dị hơn nhiều thông qua các dòng chú thích <code>#</code> hoặc các chuỗi tài liệu (<code>docstring</code>).</p>

        <h3>Thực nghiệm: Gợi ý kiểu không ràng buộc dữ liệu</h3>
        <p>Ngay cả khi được sử dụng, gợi ý kiểu cũng <strong>không hề áp đặt bất kỳ ràng buộc nào lên kiểu dữ liệu trong mã nguồn của bạn</strong>. Chẳng hạn, gợi ý kiểu <code>a: int</code> phía trên dành cho <code>a</code> hoàn toàn không tạo ra tên biến <code>a</code> (chỉ có phép gán mới tạo ra biến), còn các gợi ý kiểu của <code>b</code> và <code>c</code> thì tuyệt nhiên không bị bắt buộc thực thi:</p>
      `,
      codeExamples: [
        {
          title: 'Gợi ý kiểu không tạo ra biến và không ngăn cản gán sai kiểu',
          code: `>>> a: int
>>> a
NameError: name 'a' is not defined

>>> b: int = 0
>>> c: list[int] = [1, 2, 3]
>>> b = 'hack'    # Gán chuỗi vào biến có hint 'int' -> Hoàn toàn hợp lệ!
>>> c = 'code'    # Gán chuỗi vào biến có hint 'list[int]' -> Không hề lỗi!
>>> b, c
('hack', 'code')`,
          output: `('hack', 'code')`,
          annotations: [
            { line: 3, text: 'Truy cập a phát sinh NameError vì khai báo a: int không phải là phép gán!' },
            { line: 6, text: 'Gán chuỗi \'hack\' vào b: int chạy trơn tru, Python không ném TypeError.' },
            { line: 9, text: 'Kết quả in ra là tuple 2 chuỗi, hoàn toàn đi ngược lại type hint khai báo trước đó.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Gợi ý Kiểu trong Hàm và Thuộc tính __annotations__',
      content: `
        <p>Gợi ý kiểu cũng có thể xuất hiện trong định nghĩa của các hàm (và các phương thức của lớp) để làm tài liệu mô tả kiểu của tham số và kết quả trả về, trưng dụng lại một tính năng trước đây gọi là <strong>chú giải hàm (function annotations)</strong>.</p>

        <p>Những thông tin bổ sung phụ trợ này sẽ xuất hiện trong từ điển <code>__annotations__</code> của đối tượng hàm sở tại:</p>
      `,
      codeExamples: [
        {
          title: 'Chú giải hàm và việc Python phớt lờ hoàn toàn tại runtime',
          code: `>>> def func(a: int, b: list[str]) -> float:
...     return 'anything' + a + b
...
>>> func.__annotations__
{'a': <class 'int'>, 'b': list[str], 'return': <class 'float'>}

>>> func('You', 'Want')
'anythingYouWant'`,
          output: `{'a': <class 'int'>, 'b': list[str], 'return': <class 'float'>}
'anythingYouWant'`,
          annotations: [
            { line: 1, text: 'Hàm khai báo gợi ý tham số a là int, b là list[str], trả về float.' },
            { line: 5, text: 'Thông tin chú giải được lưu thụ động trong từ điển __annotations__.' },
            { line: 7, text: 'Gọi func(\'You\', \'Want\'): truyền hai chuỗi vào và trả về chuỗi \'anythingYouWant\'!' }
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      title: '5. Phân tích Sư phạm: Python Phớt lờ Type Hinting',
      content: `
        <p>Quan sát ví dụ trên, hàm gợi ý rằng nó nhận vào một số nguyên cùng một danh sách chuỗi và trả về một số thực float. Tuy nhiên, cũng giống như đối với các biến đơn giản, <strong>những gợi ý này hoàn toàn không được sử dụng khi chạy</strong>, và bất cứ kiểu dữ liệu nào cũng đều được chấp nhận khi hàm thực sự được gọi.</p>

        <p>Chẳng hạn, truyền vào hai chuỗi ký tự <code>'You'</code> và <code>'Want'</code> vẫn hoạt động trơn tru cho cả dữ liệu đầu vào lẫn đầu ra, bất chấp các gợi ý kiểu trông có vẻ rất khắt khe kia!</p>

        <p>Nói cách khác, gợi ý kiểu là một công cụ mang nặng tính khái niệm được du nhập vào Python nhưng <strong>hoàn toàn bị chính Python phớt lờ khi chạy mã</strong>. Xét trong bản thân Python, nó giỏi lắm cũng chỉ đóng vai trò như một hình thức tài liệu hóa khác, dù là một hình thức đi kèm với những quy tắc vô cùng phức tạp. Các công cụ bên ngoài có thể dựa vào gợi ý kiểu để kiểm tra sự không tương thích về kiểu (ví dụ: <code>mypy</code>) hoặc hỗ trợ tăng tốc hiệu năng, nhưng các công cụ đó cũng hoàn toàn là tùy chọn, không phổ biến đối với số đông và hoàn toàn tách biệt khỏi ngôn ngữ Python.</p>

        <p>Hơn nữa, các chương trình viết bằng bất kỳ ngôn ngữ nào cũng đều bắt buộc phải trải qua quá trình <strong>kiểm thử trong thời gian chạy (runtime testing)</strong>, và các bản phân phối Python tối ưu hóa được giới thiệu trong Chương 2 hiện nay không hề tận dụng gợi ý kiểu, thậm chí trong một số trường hợp còn không thể làm điều đó (hãy xem trường hợp của PyPy).</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mục đích duy nhất của từ điển __annotations__',
        content: 'Thuộc tính <code>__annotations__</code> của hàm thực chất chỉ là một từ điển Python bình thường lưu trữ chuỗi hoặc kiểu đối tượng phục vụ việc soi mã của IDE và các công cụ kiểm tra tự động bên ngoài. Bản thân nhân CPython không bao giờ đọc từ điển này để ép kiểu tham số khi chạy hàm.'
      }
    ]
  },

  exercises: [
    {
      level: 'Trung bình',
      title: 'Kiểm tra nội dung từ điển __annotations__ của một hàm',
      problem: 'Hãy viết một hàm <code>tinh_tong(x: int, y: int) -> int</code> trả về <code>x + y</code>. Sau đó in ra nội dung của <code>tinh_tong.__annotations__</code> và gọi hàm với hai chuỗi để chứng minh tính không ràng buộc tại runtime.',
      hint: 'Truy cập thuộc tính __annotations__ của hàm như một thuộc tính đối tượng thông thường.',
      solutionCode: `def tinh_tong(x: int, y: int) -> int:
    return x + y

print("Từ điển __annotations__:", tinh_tong.__annotations__)

# Gọi với chuỗi ký tự bất chấp gợi ý kiểu int
ket_qua = tinh_tong("Học ", "Python")
print("Kết quả khi truyền chuỗi:", ket_qua)
print("Kiểu của kết quả:", type(ket_qua))`,
      solutionOutput: `Từ điển __annotations__: {'x': <class 'int'>, 'y': <class 'int'>, 'return': <class 'int'>}
Kết quả khi truyền chuỗi: Học Python
Kiểu của kết quả: <class 'str'>`,
      explanation: 'Dù khai báo x: int, y: int -> int, khi truyền hai chuỗi vào hàm tinh_tong, Python vẫn thực thi phép cộng chuỗi bình thường và trả về chuỗi str, chứng minh rằng type hint hoàn toàn bị phớt lờ tại runtime.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn viết câu lệnh khai báo x: int trong Python mà không có phép gán giá trị, điều gì sẽ xảy ra nếu ngay sau đó bạn gọi print(x)?',
      options: [
        'Python in ra giá trị 0 vì int có giá trị mặc định là 0.',
        'Python in ra giá trị None.',
        'Phát sinh lỗi NameError: name \'x\' is not defined vì khai báo kiểu không tự động tạo ra biến.',
        'Python tự động yêu cầu người dùng nhập giá trị cho x từ bàn phím.'
      ],
      correctIndex: 2,
      explanation: 'Chỉ có phép gán mới tạo ra biến trong bảng tên hệ thống. Cú pháp x: int chỉ lưu trữ chú giải kiểu chứ không hề tạo ra biến x trong không gian tên, dẫn đến NameError khi truy cập.'
    },
    {
      question: 'Bản thân trình thông dịch Python (CPython) sử dụng gợi ý kiểu (type hints) khi thực thi mã nguồn như thế nào?',
      options: [
        'Bắt buộc ép kiểu và ném lỗi TypeError ngay lập tức nếu dữ liệu truyền vào sai kiểu.',
        'Hoàn toàn phớt lờ và không sử dụng chúng theo bất kỳ hình thức nào khi chạy chương trình.',
        'Dùng chúng để tự động chuyển mã Python sang ngôn ngữ máy nhị phân Assembly.',
        'Gửi thông tin kiểu dữ liệu lên máy chủ đám mây của Python Software Foundation.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz nhấn mạnh: Bản thân Python hoàn toàn không sử dụng gợi ý kiểu theo bất kỳ hình thức nào khi chạy chương trình; chúng hoàn toàn bị phớt lờ tại runtime và chỉ dành cho các công cụ kiểm tra tĩnh bên ngoài.'
    }
  ],

  summary: [
    'Gợi ý kiểu (type hinting) sử dụng cú pháp dấu hai chấm và module typing (hoặc cú pháp type từ Python 3.12).',
    'Khai báo kiểu đơn thuần (a: int) không hề tạo ra biến nếu không có phép gán giá trị đi kèm.',
    'Thông tin gợi ý kiểu trong hàm được lưu trữ thụ động trong từ điển __annotations__ của hàm.',
    'Python phớt lờ 100% gợi ý kiểu khi thực thi; không có cơ chế ép kiểu hay kiểm tra kiểu runtime.',
    'Các công cụ kiểm tra kiểu tĩnh như mypy hoàn toàn là tùy chọn bên ngoài và tách biệt khỏi ngôn ngữ Python.'
  ]
};
