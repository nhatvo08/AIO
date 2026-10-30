export default {
  id: 'lp-c4-00',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.0',
  title: 'Mở đầu: Giới thiệu các đối tượng Python',
  subtitle: 'Làm những "việc" tác động lên các "đối tượng", bản chất vùng bộ nhớ và nguyên lý "mọi thứ đều là đối tượng"',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu cách nhìn cốt lõi của Python: chương trình gồm những "việc" (thao tác) tác động lên các "đối tượng" (thực thể).',
    'Nắm vững bản chất kỹ thuật: đối tượng là những vùng bộ nhớ mang giá trị cùng các thao tác được hỗ trợ.',
    'Nhận biết nguyên lý nền tảng: mọi thứ trong script Python đều là đối tượng, kể cả những con số đơn giản nhất.',
    'Xác định rõ vai trò của Chương 4: chuyến du ngoạn tổng quan mở màn trước khi đi vào chi tiết chuyên sâu ở các chương sau.'
  ],

  intuition: {
    title: 'Thợ kim hoàn và những viên đá quý',
    metaphor: 'Hãy tưởng tượng việc lập trình Python giống như công việc của một người thợ kim hoàn. "Đối tượng" (stuff) là những khối vật liệu thực thể cụ thể — viên kim cương, thanh vàng, chiếc dây chuyền hay một viên ngọc thô. "Thao tác" (things) là những việc người thợ làm với chúng — cắt gọt, đánh bóng, ghép nối hai mảnh vàng lại với nhau, hoặc đính ngọc vào nhẫn. Bạn không thể "cắt gọt" một khái niệm trừu tượng, bạn chỉ có thể thao tác lên một đối tượng cụ thể đang nằm trên bàn làm việc (vùng nhớ). Trong Python, mọi dữ liệu bạn xử lý đều là một vật thể hữu hình như vậy.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH CỐT LÕI: THAO TÁC (THINGS) TÁC ĐỘNG LÊN ĐỐI TƯỢNG (STUFF)</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">NHỮNG VIỆC TA LÀM (THINGS)</div>
            <div style="font-weight:700;color:var(--warning);">CÁC THAO TÁC</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:6px;">Phép cộng (+), ghép nối, cắt lát, gọi hàm, tìm kiếm...</div>
          </div>
          <div style="font-size:1.5rem;color:var(--accent-primary);text-align:center;">── tác động lên ──►</div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">THỰC THỂ CHỊU TÁC ĐỘNG (STUFF)</div>
            <div style="font-weight:700;color:var(--success);">CÁC ĐỐI TƯỢNG (OBJECTS)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:6px;">Vùng nhớ chứa giá trị: <code>99</code>, <code>'Code'</code>, <code>[1, 2]</code>, hàm, lớp...</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Thao tác (Things) và Đối tượng (Stuff)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác (Objects and Operations) • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 1 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Theo một cách nói nôm na và trực quan nhất của Mark Lutz, trong ngôn ngữ Python chúng ta làm những <strong>"việc" (things)</strong> tác động lên các <strong>"đối tượng" (stuff)</strong>:</p>
        <ul>
          <li><strong>"Những việc"</strong> ở đây mang hình thức của các thao tác cụ thể, chẳng hạn như phép cộng số học, phép ghép nối văn bản, việc trích xuất một phần tử, hoặc việc gọi một phương thức.</li>
          <li><strong>"Các đối tượng"</strong> dùng để chỉ những thực thể cụ thể trong bộ nhớ mà chúng ta áp dụng các thao tác đó lên.</li>
        </ul>
        <p>Trong toàn bộ Phần II của cuốn sách, trọng tâm nghiên cứu của chúng ta chính là các đối tượng đó, cùng những việc mà chương trình của chúng ta có thể thực hiện với chúng.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bản chất Kỹ thuật: Vùng Bộ nhớ, Giá trị và Thao tác',
      content: `
        <p>Nói một cách chính quy và chặt chẽ hơn về mặt khoa học máy tính: trong Python, <strong>dữ liệu tồn tại dưới dạng các đối tượng (objects)</strong>.</p>
        <p>Các đối tượng này có thể chia thành hai nguồn gốc lớn:</p>
        <ol>
          <li><strong>Đối tượng dựng sẵn (built-in objects):</strong> Do chính ngôn ngữ Python cung cấp sẵn trong nhân, chẳng hạn như số, chuỗi ký tự (<code>str</code>), danh sách (<code>list</code>), từ điển (<code>dict</code>), bộ giá trị (<code>tuple</code>), tệp (<code>file</code>)...</li>
          <li><strong>Đối tượng bổ sung:</strong> Do lập trình viên tự tạo ra bằng cách sử dụng các lớp (<code>class</code>) Python, hoặc các công cụ mở rộng được viết bằng các ngôn ngữ bên ngoài như C hoặc C++.</li>
        </ol>
        <p>Về bản chất phần cứng bên dưới, các đối tượng này chính là <strong>những vùng bộ nhớ (memory blocks)</strong> được cấp phát, mang trong mình một giá trị cụ thể và gắn liền với một tập hợp các thao tác hợp lệ được định nghĩa sẵn.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Nguyên lý Cốt lõi: Mọi thứ trong Script đều là Đối tượng',
      content: `
        <p>Một trong những đặc điểm khác biệt và nhất quán nhất của Python so với các ngôn ngữ như C, C++ hay Java là: <strong>mọi thứ trong một tập lệnh (script) Python đều là đối tượng</strong>.</p>
        <p>Ngay cả những con số đơn giản nhất cũng hoàn toàn thỏa mãn điều này. Một số nguyên như <code>99</code> không phải là một kiểu nguyên thủy trần trụi (primitive type), mà là một đối tượng đầy đủ: nó có một vùng nhớ riêng, mang giá trị <code>99</code>, và hỗ trợ tập hợp các thao tác số học như <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>**</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Con số đơn giản 99 là một đối tượng mang giá trị và thao tác',
          code: `>>> 99 + 1          # Thao tác cộng tác động lên đối tượng 99
100
>>> 99 - 9          # Thao tác trừ
90
>>> (99).bit_length() # Gọi phương thức trực tiếp trên đối tượng số nguyên
7`,
          output: `100
90
7`,
          annotations: [
            { line: 1, text: 'Thao tác + tác động lên đối tượng số nguyên 99 và 1 để sinh đối tượng mới 100.' },
            { line: 5, text: 'Số nguyên 99 có thuộc tính và phương thức như mọi đối tượng hạng nhất trong Python.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Vai trò của Chương 4 trong Toàn bộ Giáo trình',
      content: `
        <p>Bởi vì đối tượng là khái niệm nền tảng cốt lõi nhất trong lập trình Python, Chương 4 đóng vai trò là một <strong>chuyến khảo sát mở màn nhanh gọn</strong> điểm qua toàn bộ các kiểu đối tượng dựng sẵn.</p>
        <p>Tác giả Mark Lutz đặc biệt dặn dò: <em>các chương tiếp theo trong phần này sẽ thực hiện một lượt rà soát thứ hai nhằm bổ sung các chi tiết chuyên sâu mà chúng ta tạm thời lướt qua ở khảo sát ban đầu</em>. Mục tiêu của chúng ta ở chương này không phải là ghi nhớ cặn kẽ từng tham số hay ngóc ngách, mà là:</p>
        <ul>
          <li>Làm quen với các khái niệm và thuật ngữ nền móng.</li>
          <li>Xây dựng trực giác đúng đắn về cách dữ liệu vận hành trong Python.</li>
          <li>Khơi gợi sự tò mò để sẵn sàng cho các chương đào sâu phía sau.</li>
        </ul>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tư duy đúng ngay từ đầu: Nhìn mọi dữ liệu là Đối tượng',
        content: 'Khi đọc mã nguồn hoặc tư duy thuật toán trong Python, hãy luôn tự hỏi: <em>"Dữ liệu này thuộc kiểu đối tượng nào, nó nằm ở đâu trong bộ nhớ, và nó cho phép những thao tác nào tác động lên nó?"</em>. Thói quen này sẽ giúp bạn tránh được hầu hết các lỗi phổ biến về kiểu dữ liệu sau này.'
      }
    ]
  },

  exercises: [
    {
      title: 'Phân biệt "việc làm" và "đối tượng"',
      level: 'Dễ',
      problem: 'Trong biểu thức Python sau: <code>"Hello" + " World"</code>, hãy chỉ ra đâu là các "đối tượng" và đâu là "việc" (thao tác)?',
      hint: 'Hãy nhớ lại định nghĩa: đối tượng là thực thể mang giá trị trong bộ nhớ, thao tác là hành động tác động lên chúng.',
      solutionCode: `# Phân tích biểu thức: "Hello" + " World"
s1 = "Hello"        # Đối tượng chuỗi thứ nhất
s2 = " World"       # Đối tượng chuỗi thứ hai
ket_qua = s1 + s2   # Thao tác ghép nối (+) tác động lên s1 và s2
print(ket_qua)`,
      solutionOutput: `Hello World`,
      explanation: 'Trong biểu thức này, <code>"Hello"</code> và <code>" World"</code> là hai đối tượng chuỗi ký tự (chứa giá trị văn bản trong bộ nhớ). Dấu cộng <code>+</code> là thao tác (việc ghép nối hai chuỗi lại với nhau) để tạo ra đối tượng chuỗi kết quả mới.'
    },
    {
      title: 'Kiểm chứng tính chất đối tượng của số nguyên',
      level: 'Vừa',
      problem: 'Làm thế nào để chứng minh rằng số nguyên <code>99</code> trong Python thực sự là một đối tượng có kiểu và định danh vùng nhớ riêng biệt?',
      hint: 'Sử dụng các hàm tích hợp sẵn như <code>type()</code> và <code>id()</code>.',
      solutionCode: `x = 99
print("Kiểu của x:", type(x))
print("Địa chỉ vùng nhớ (id) của x:", hex(id(x)))
print("x có phải là một đối tượng không?", isinstance(x, object))`,
      solutionOutput: `Kiểu của x: <class 'int'>
Địa chỉ vùng nhớ (id) của x: 0x...
x có phải là một đối tượng không? True`,
      explanation: 'Hàm <code>type()</code> chứng minh 99 thuộc lớp <code>int</code>, <code>id()</code> cho thấy nó chiếm một vùng nhớ cụ thể, và <code>isinstance(99, object)</code> trả về <code>True</code> khẳng định 99 kế thừa từ lớp đối tượng gốc.'
    }
  ],

  quiz: [
    {
      question: 'Theo cách diễn đạt của Mark Lutz ở đầu Chương 4, chương trình Python vận hành dựa trên nguyên lý nào?',
      options: [
        'Các cấu trúc lệnh điều khiển tuần tự, rẽ nhánh và lặp lại.',
        'Những "việc" (thao tác) tác động lên các "đối tượng" (thực thể mang giá trị và hành vi).',
        'Các hàm toán học thuần túy không lưu giữ trạng thái trong bộ nhớ.',
        'Các con trỏ bộ nhớ cấp thấp do lập trình viên trực tiếp quản lý.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz nhấn mạnh: trong Python chúng ta làm những "việc" (thao tác như phép cộng, ghép nối) tác động lên các "đối tượng" (thực thể mang giá trị trong bộ nhớ).'
    },
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về số nguyên đơn giản (ví dụ: 99) trong Python?',
      options: [
        'Nó là một kiểu dữ liệu nguyên thủy (primitive) không có thuộc tính hay phương thức.',
        'Nó chỉ là một chuỗi bit trần trụi trong thanh ghi CPU, không phải đối tượng.',
        'Nó là một đối tượng thực thụ, có vùng bộ nhớ, mang giá trị và gắn với các thao tác được hỗ trợ.',
        'Nó chỉ trở thành đối tượng khi được ép kiểu rõ ràng sang lớp Object.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python, mọi thứ trong script đều là đối tượng, kể cả những con số đơn giản như 99: mang giá trị trong bộ nhớ và hỗ trợ các thao tác như +, -, *, v.v.'
    },
    {
      question: 'Mục tiêu chính của Chương 4 trong cuốn sách "Learning Python" là gì?',
      options: [
        'Trình bày chi tiết, toàn diện đến từng ngóc ngách của tất cả các kiểu dữ liệu.',
        'Cung cấp một chuyến khảo sát mở màn nhanh gọn để làm quen với các khái niệm đối tượng cốt lõi.',
        'Yêu cầu người học phải ghi nhớ cặn kẽ toàn bộ bảng mã ký tự Unicode.',
        'Hướng dẫn người học cách lập trình C mở rộng để thay thế đối tượng dựng sẵn.'
      ],
      correctIndex: 1,
      explanation: 'Chương 4 là chuyến du ngoạn tổng quan mở màn để làm quen với các khái niệm cơ bản. Các chương tiếp theo trong Phần II sẽ rà soát lần hai để bổ sung đầy đủ chi tiết.'
    }
  ],

  summary: [
    'Dữ liệu trong Python luôn tồn tại dưới dạng các đối tượng (vùng bộ nhớ mang giá trị và các thao tác liên quan).',
    'Chương trình Python thực hiện các thao tác (things) tác động lên các đối tượng (stuff).',
    'Mọi thứ trong một script Python đều là đối tượng, kể cả những con số đơn giản như 99.',
    'Đối tượng dựng sẵn (built-in objects) là nền móng cốt lõi nhất mà mọi chương trình và lớp tự định nghĩa đều xây dựng dựa trên đó.',
    'Ý chính: Đối tượng và những việc có thể làm với chúng là nguyên lý thống nhất mạnh mẽ xuyên suốt toàn bộ ngôn ngữ Python.'
  ]
};
