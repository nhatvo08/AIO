export default {
  id: 'lp-c4-05-5',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.5.5',
  title: 'Chuỗi ký tự: Nhận sự trợ giúp (dir & help)',
  subtitle: 'Khám phá 81 thuộc tính của chuỗi bằng dir(), nạp chồng toán tử với __add__, và trích xuất tài liệu Pydoc qua help()',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng hàm dựng sẵn dir() để liệt kê tất cả các thuộc tính và phương thức có thể gọi của đối tượng.',
    'Phân biệt phương thức thông thường với các thuộc tính gạch dưới kép __ (nạp chồng toán tử / dunder methods).',
    'Hiểu cách toán tử + ngầm ánh xạ tới phương thức __add__() bên dưới hậu trường của Python.',
    'Sử dụng hàm help() để trích xuất tài liệu Pydoc cho phương thức cụ thể trong môi trường REPL tương tác.'
  ],

  intuition: {
    title: 'Bảng danh mục phụ tùng và cuốn cẩm nang hướng dẫn',
    metaphor: 'Khi bạn mua một cỗ máy phức tạp, hàm dir() giống như việc bạn mở nắp ca-pô ra để nhìn thấy danh mục tên của toàn bộ 81 chi tiết và nút bấm gắn trên máy. Nhưng nhìn tên thì chưa chắc đã biết nút đó xoay như thế nào; lúc này hàm help() đóng vai trò như cuốn sổ cẩm nang hướng dẫn sử dụng chi tiết: bạn chỉ cần chỉ tay vào nút đó (help(str.replace)), cuốn cẩm nang sẽ mở đúng trang giải thích công dụng, các tham số và giá trị trả về của nút đó cho bạn.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HAI CẤP ĐỘ KHÁM PHÁ TRONG REPL</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:6px;">🔍 dir(S) ── "Có những gì?"</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              • Trả về danh sách tên thuộc tính.<br>
              • Nhanh gọn, quét tổng quan.<br>
              • Chuỗi có tới 81 thuộc tính khác nhau!
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">📖 help(S.method) ── "Dùng ra sao?"</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              • Trích xuất tài liệu Pydoc chuẩn.<br>
              • Hiển thị chữ ký hàm (tham số).<br>
              • Nhấn phím Q để thoát trợ giúp.
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khám phá Thuộc tính Đối tượng bằng hàm dir()',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 12–13 / 38</strong>.</p>
          </div>
        </div>

        <p>Cuốn sách này không liệt kê cặn kẽ từng phương thức của đối tượng, nhưng để biết thêm chi tiết, bạn luôn có thể gọi hàm dựng sẵn <code>dir()</code>:</p>
        <ul>
          <li>Hàm này liệt kê các biến được gán trong phạm vi của nơi gọi khi được gọi mà không có đối số.</li>
          <li>Hữu ích hơn, <strong>nó trả về một danh sách tất cả các thuộc tính có sẵn của bất kỳ đối tượng nào được truyền vào cho nó</strong>. Vì các phương thức là những thuộc tính có thể gọi được (callable attributes), chúng sẽ xuất hiện trong danh sách này.</li>
        </ul>
        <p>Giả sử <code>S</code> vẫn là chuỗi <code>'Code'</code>, đây là danh sách các thuộc tính của nó (chuỗi ký tự ngày nay có tới <strong>81 thuộc tính</strong>!):</p>
      `,
      codeExamples: [
        {
          title: 'Gọi dir(S) để xem danh sách thuộc tính của chuỗi',
          code: `>>> dir(S)
['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__',
'__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', 
…etc…
'rindex', 'rjust', 'rpartition', 'rsplit', 'rstrip', 'split', 'splitlines',
'startswith', 'strip', 'swapcase', 'title', 'translate', 'upper', 'zfill']`,
          output: `['__add__', '__class__', '__contains__', ... …etc… ... 'upper', 'zfill']`,
          annotations: [
            { line: 2, text: 'Nửa đầu danh sách gồm các tên có gạch dưới kép dunder __.' },
            { line: 4, text: 'Phần giữa được cắt bớt bằng …etc… để tiết kiệm không gian (tổng cộng 81 thuộc tính).' },
            { line: 5, text: 'Nửa sau không có gạch dưới chính là các phương thức gọi được của chuỗi.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Nạp chồng Toán tử (Operator Overloading) và Phương thức __add__',
      content: `
        <p>Các tên có dấu gạch dưới kép (thường gọi là <em>dunder methods</em>) sẽ chưa quan trọng cho đến các phần sau của cuốn sách, khi chúng ta nghiên cứu về <strong>nạp chồng toán tử (operator overloading)</strong> trong các lớp.</p>
        <p>Tóm lại, chúng đại diện cho <strong>phần hiện thực bên dưới của đối tượng chuỗi và hỗ trợ tùy biến</strong>. Phương thức <code>__add__</code> của chuỗi chẳng hạn, chính là cách mà phép ghép nối chuỗi thực sự vận hành:</p>
        <ul>
          <li>Khi bạn viết biểu thức: <code>S + 'head!'</code></li>
          <li>Python ngầm ánh xạ câu lệnh đó sang câu lệnh thứ hai bên dưới hậu trường: <code>S.__add__('head!')</code></li>
        </ul>
        <p>Tuy nhiên, thông thường bạn <strong>không nên tự mình dùng dạng thứ hai</strong> (nó kém trực quan hơn, dài dòng hơn, và thậm chí có thể chạy chậm hơn do tốn thêm bước tra cứu thuộc tính thủ công).</p>
      `,
      codeExamples: [
        {
          title: 'So sánh toán tử + và phương thức __add__ bên dưới hậu trường',
          code: `>>> S + 'head!'
'Codehead!'
>>> S.__add__('head!')
'Codehead!'`,
          output: `'Codehead!'
'Codehead!'`,
          annotations: [
            { line: 1, text: 'Cú pháp thông thường: ngắn gọn, tự nhiên, được tối ưu hóa tốt nhất.' },
            { line: 3, text: 'Hiện thực dunder bên dưới: phương thức thực sự thi hành phép ghép nối.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Tra cứu Tài liệu bằng hàm help() và Hệ thống Pydoc',
      content: `
        <p>Hàm <code>dir()</code> chỉ đơn thuần cung cấp tên các phương thức. Để hỏi xem chúng làm gì, nhận đối số nào, bạn có thể truyền chúng vào hàm <code>help()</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Gọi help() để xem tài liệu chi tiết của phương thức replace',
          code: `>>> help(S.replace)                  # Hoặc help(str.replace)
Help on built-in function replace:
replace(old, new, count=-1, /) method of builtins.str instance
    Return a copy with all occurrences of substring old replaced by new.
…etc…`,
          output: `Help on built-in function replace:
replace(old, new, count=-1, /) method of builtins.str instance
    Return a copy with all occurrences of substring old replaced by new.`,
          annotations: [
            { line: 1, text: 'Truyền tên phương thức vào help() mà không có dấu ngoặc () gọi hàm.' },
            { line: 3, text: 'Chữ ký hàm cho thấy tham số count mặc định là -1 (thay thế tất cả).' },
            { line: 4, text: 'Nhấn phím Q trong terminal để thoát khỏi màn hình trợ giúp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Mẹo gọi help(str) thay vì help(S)',
      content: `
        <p>Bạn cũng có thể yêu cầu trợ giúp cho toàn bộ một chuỗi bằng lệnh <code>help(S)</code>, nhưng điều đó có thể không mang lại kết quả như ý: giá trị của chuỗi được sử dụng thay vì chính bản thân kiểu chuỗi, trừ khi chuỗi đó rỗng.</p>
        <p>Để làm tốt hơn, bạn cần biết tên của kiểu chuỗi, hoặc biết rằng hàm dựng sẵn <code>type()</code> trả về kiểu của bất kỳ đối tượng nào dưới dạng một đối tượng khác: cả <code>help(str)</code> và <code>help(type(S))</code> đều cung cấp trợ giúp cho toàn bộ kiểu chuỗi.</p>
        <p>Tuy nhiên, bởi vì chúng mô tả mọi phương thức nên sẽ rất dài—<strong>hàm help phát huy tác dụng tốt nhất khi dùng cho các phương thức cụ thể</strong>. <code>dir</code> và <code>help</code> là cấp tài liệu đầu tiên trong Python, đặc biệt là khi làm việc trong một REPL tương tác. Hãy sớm thử nghiệm chúng trên một đối tượng gần bạn!</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mẹo thoát khỏi màn hình trợ giúp Pydoc',
        content: 'Khi gọi <code>help()</code> trên các đối tượng lớn trong terminal, Pydoc sẽ mở trình phân trang (pager tương tự lệnh <code>less</code> trên Linux). Hãy nhấn phím <strong>Q</strong> để thoát ra và quay lại dấu nhắc lệnh <code>>>></code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Lọc danh sách các phương thức public của chuỗi',
      level: 'Dễ',
      problem: 'Dùng hàm <code>dir(str)</code> và list comprehension để lọc ra chỉ những tên phương thức thông thường (không bắt đầu bằng dấu gạch dưới <code>_</code>).',
      hint: 'Dùng điều kiện <code>if not name.startswith(\'_\')</code> bên trong list comprehension.',
      solutionCode: `public_methods = [m for m in dir(str) if not m.startswith('_')]
print("Số phương thức public của str:", len(public_methods))
print("5 phương thức đầu tiên:", public_methods[:5])`,
      solutionOutput: `Số phương thức public của str: 47
5 phương thức đầu tiên: ['capitalize', 'casefold', 'center', 'count', 'encode']`,
      explanation: 'List comprehension lọc bỏ các thuộc tính dunder, để lại trọn bộ 47 phương thức public thông dụng của kiểu chuỗi.'
    },
    {
      title: 'Tra cứu chữ ký hàm qua help()',
      level: 'Vừa',
      problem: 'Hãy giải thích ý nghĩa tham số <code>count</code> trong chữ ký hàm <code>replace(old, new, count=-1, /)</code> tra cứu từ <code>help(str.replace)</code>.',
      hint: 'Khi count mang giá trị mặc định -1, nó có hành vi gì? Nếu truyền count=1 thì sao?',
      solutionCode: `s = "aa bb aa cc aa"
# count=-1 (mặc định): Thay thế tất cả
print("Thay thế tất cả:", s.replace("aa", "XX"))

# count=1: Chỉ thay thế lần xuất hiện đầu tiên
print("Chỉ thay thế 1 lần:", s.replace("aa", "XX", 1))`,
      solutionOutput: `Thay thế tất cả: XX bb XX cc XX
Chỉ thay thế 1 lần: XX bb aa cc aa`,
      explanation: 'Tham số <code>count</code> giới hạn số lần thay thế tối đa. Mặc định <code>-1</code> nghĩa là thay thế tất cả mọi lần xuất hiện.'
    }
  ],

  quiz: [
    {
      question: 'Hàm dựng sẵn dir(obj) trong Python có công dụng chính là gì?',
      options: [
        'Xóa bỏ đối tượng obj khỏi bộ nhớ RAM.',
        'Liệt kê danh sách tất cả các tên thuộc tính và phương thức có sẵn gắn liền với đối tượng obj.',
        'Tạo ra một bản sao mức sâu (deep copy) của đối tượng obj.',
        'Chuyển đổi đối tượng obj thành mã nhị phân bytecode.'
      ],
      correctIndex: 1,
      explanation: 'dir(obj) là công cụ nội soi (introspection) giúp liệt kê toàn bộ thuộc tính và phương thức có trên đối tượng.'
    },
    {
      question: 'Các thuộc tính có tên bắt đầu và kết thúc bằng dấu gạch dưới kép (như __add__) đại diện cho điều gì?',
      options: [
        'Các biến bị hỏng hoặc bị cấm sử dụng trong Python.',
        'Phần hiện thực bên dưới hỗ trợ nạp chồng toán tử (operator overloading) của đối tượng.',
        'Các module được nạp từ thư viện C bên ngoài.',
        'Các hằng số không bao giờ thay đổi.'
      ],
      correctIndex: 1,
      explanation: 'Các phương thức dunder __ thể hiện cơ chế nạp chồng toán tử, định nghĩa cách các toán tử biểu thức (như +) vận hành bên dưới.'
    },
    {
      question: 'Để xem tài liệu hướng dẫn nhanh cho phương thức find của chuỗi trong REPL, cách viết nào sau đây là TỐT NHẤT?',
      options: [
        'help(str.find())',
        'help(str.find)',
        'dir(str.find)',
        'find.help()'
      ],
      correctIndex: 1,
      explanation: 'Truyền tên phương thức không có ngoặc đơn vào help(): help(str.find) hoặc help(S.find).'
    }
  ],

  summary: [
    'Hàm dir() là công cụ khám phá hàng đầu: liệt kê toàn bộ thuộc tính/phương thức của đối tượng (chuỗi có 81 thuộc tính).',
    'Các tên có gạch dưới kép dunder __ đại diện cho phần hiện thực nạp chồng toán tử (ví dụ: __add__ là lõi của toán tử +).',
    'Hàm help() trích xuất tài liệu Pydoc chi tiết và chữ ký hàm cho từng phương thức.',
    'Dùng phím Q để thoát khỏi trình xem trợ giúp Pydoc trong terminal.',
    'Ý chính: dir và help là hệ thống tài liệu sống động, luôn có sẵn ngay trong tầm tay ở mọi phiên REPL.'
  ]
};
