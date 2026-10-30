export default {
  id: 'lp-c4-03',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.3',
  title: 'Các kiểu đối tượng cốt lõi của Python',
  subtitle: 'Bảng 4-1 trọn vẹn 10 hàng, bản chất kiểu cốt lõi, cú pháp literal, định kiểu động và định kiểu mạnh',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Khảo sát trọn vẹn Bảng 4-1 gồm 10 nhóm đối tượng dựng sẵn cốt lõi của Python.',
    'Hiểu vì sao chúng được gọi là "kiểu đối tượng cốt lõi" và vai trò của cú pháp giá trị nguyên văn (literal expressions).',
    'Nhận biết rằng hàm, module, lớp và thậm chí mã biên dịch cũng đều là các đối tượng hạng nhất trong Python.',
    'Phân biệt rõ ràng hai khái niệm trụ cột: Định kiểu động (Dynamically Typed) và Định kiểu mạnh (Strongly Typed).'
  ],

  intuition: {
    title: 'Hộp đồ nghề vạn năng có sẵn trong xe cứu hộ',
    metaphor: 'Khi bạn mua một chiếc xe cứu hộ chuyên nghiệp, trong cốp xe đã gắn sẵn một bộ đồ nghề tiêu chuẩn: cờ-lê (Số), thước cuộn (Chuỗi), túi vải co giãn đựng đồ (Danh sách), bảng gắn nhãn các ngăn đồ (Từ điển), hộp niêm phong cố định (Tuple), đầu vòi hút nhiên liệu (Tệp) và rổ sàng lọc (Tập hợp). Bạn chỉ cần mở cốp ra bằng các ký hiệu quen thuộc như cặp ngoặc vuông hay dấu nháy là có ngay công cụ trong tay, không cần phải tự tiện ren hay gò hàn từng chiếc cờ-lê trước khi lên đường.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HAI TRỤ CỘT ĐỊNH KIỂU CỦA PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">1. ĐỊNH KIỂU ĐỘNG (Dynamically Typed)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.5;">
              • Không cần khai báo kiểu trước (như <code>int x;</code>).<br>
              • Kiểu dữ liệu gắn với <strong>đối tượng trong bộ nhớ</strong>, không gắn với tên biến.<br>
              • Python tự động theo dõi kiểu cho bạn khi chạy.
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--warning);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:6px;">2. ĐỊNH KIỂU MẠNH (Strongly Typed)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.5;">
              • Mỗi đối tượng gắn chặt tập thao tác hợp lệ của nó mãi mãi.<br>
              • Nghiêm cấm thao tác sai kiểu (ví dụ: không thể lấy chuỗi trừ số).<br>
              • Không tự động ép kiểu ngầm làm sai lệch logic.
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bảng 4-1: Các Đối tượng Dựng sẵn (Cốt lõi) của Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 3–5 / 38</strong>.</p>
          </div>
        </div>

        <p>Bảng 4-1 dưới đây điểm qua các đối tượng dựng sẵn của Python, cùng một số cú pháp được dùng để viết các giá trị cố định (literal) của chúng—nghĩa là các biểu thức sinh ra những đối tượng này trong chương trình:</p>

        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th style="width:32%;">Kiểu đối tượng</th>
                <th>Ví dụ về cú pháp literal / cách tạo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Numbers (Số)</strong></td>
                <td><code>1234</code>, <code>3.1415</code>, <code>0b111</code>, <code>1_234</code>, <code>3+4j</code>, <code>Decimal</code>, <code>Fraction</code></td>
              </tr>
              <tr>
                <td><strong>Strings (Chuỗi)</strong></td>
                <td><code>'code'</code>, <code>"app's"</code>, <code>b'a\\x01c'</code>, <code>'h\\u00c4ck'</code>, <code>'hÄck'</code></td>
              </tr>
              <tr>
                <td><strong>Lists (Danh sách)</strong></td>
                <td><code>[1, [2, 'three'], 4.5]</code>, <code>list(range(10))</code></td>
              </tr>
              <tr>
                <td><strong>Dictionaries (Từ điển)</strong></td>
                <td><code>{'job': 'dev', 'years': 40}</code>, <code>dict(hours=10)</code></td>
              </tr>
              <tr>
                <td><strong>Tuples (Bộ giá trị)</strong></td>
                <td><code>(1, 'app', 4, 'U')</code>, <code>tuple('hack')</code>, <code>namedtuple</code></td>
              </tr>
              <tr>
                <td><strong>Files (Tệp)</strong></td>
                <td><code>open('docs.txt')</code>, <code>open(r'C:\\data.bin', 'wb')</code></td>
              </tr>
              <tr>
                <td><strong>Sets (Tập hợp)</strong></td>
                <td><code>set('abc')</code>, <code>{'a', 'b', 'c'}</code></td>
              </tr>
              <tr>
                <td><strong>Other core objects (Đối tượng cốt lõi khác)</strong></td>
                <td><code>Booleans</code> (<code>True</code>, <code>False</code>), <code>types</code>, <code>None</code></td>
              </tr>
              <tr>
                <td><strong>Program-unit objects (Đối tượng đơn vị chương trình)</strong></td>
                <td>Hàm (Functions), module, lớp (classes) <em>(Sẽ học ở Phần IV, V và VI)</em></td>
              </tr>
              <tr>
                <td><strong>Implementation objects (Đối tượng hiện thực)</strong></td>
                <td>Mã đã biên dịch (compiled-code), vết ngăn xếp (tracebacks) <em>(Sẽ học ở Phần IV và VII)</em></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Như được chỉ ra trong Bảng 4-1:</p>
        <ul>
          <li><strong>Số và chuỗi ký tự</strong> lần lượt biểu diễn các giá trị số và văn bản.</li>
          <li><strong>Đối tượng tệp (file)</strong> cung cấp giao diện để xử lý các tệp thực tế được lưu trên máy tính của bạn.</li>
          <li><strong>Danh sách (list)</strong> cung cấp các tập hợp có thứ tự vị trí của những đối tượng khác.</li>
          <li><strong>Từ điển (dict)</strong> lưu trữ các đối tượng theo khóa (key) thay vì vị trí.</li>
          <li>Cả danh sách và từ điển đều đi kèm cơ chế quản lý bộ nhớ tự động, hỗ trợ lồng nhau tùy ý, có thể co giãn kích thước theo nhu cầu, và có thể chứa các đối tượng thuộc bất kỳ kiểu nào.</li>
        </ul>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Đơn vị Chương trình & Bảng 4-1 Chưa Hoàn toàn Đầy đủ',
      content: `
        <p>Các đơn vị chương trình như hàm, module và lớp cũng là các đối tượng thực thụ trong Python: chúng được tạo ra bằng các câu lệnh và biểu thức như <code>def</code>, <code>class</code>, <code>import</code>, và <code>lambda</code>. Chúng có thể được truyền tự do trong các tập lệnh như tham số, lưu trữ bên trong các danh sách hay từ điển, vân vân.</p>
        <p>Python cũng cung cấp một tập hợp các đối tượng liên quan đến việc hiện thực như các đối tượng mã đã biên dịch (compiled-code), vốn thường được các nhà xây dựng công cụ quan tâm hơn là các nhà phát triển ứng dụng thông thường.</p>
        <p>Bất chấp tiêu đề của nó, <strong>Bảng 4-1 thực sự chưa hoàn toàn đầy đủ bởi vì mọi thứ chúng ta xử lý trong các chương trình Python đều là một loại đối tượng</strong>:</p>
        <ul>
          <li>Khi chúng ta thực hiện so khớp mẫu văn bản, chúng ta tạo ra các <em>đối tượng mẫu (pattern)</em> trong module <code>re</code>.</li>
          <li>Khi chúng ta viết mã mạng, chúng ta sử dụng các <em>đối tượng socket</em> trong module <code>socket</code>.</li>
        </ul>
        <p>Các loại đối tượng khác này thường được tạo ra bằng cách nạp (<code>import</code>) và sử dụng các hàm trong thư viện chuẩn hoặc các module thư viện bổ sung của bên thứ ba.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Vì sao gọi là "Kiểu Đối tượng Cốt lõi"? Literal Expressions',
      content: `
        <p>Chúng ta gọi các đối tượng trong Bảng 4-1 là <strong>các kiểu đối tượng cốt lõi (core object types)</strong> bởi vì chúng được <strong>tích hợp hữu cơ vào chính ngôn ngữ Python</strong>—nghĩa là có cú pháp biểu thức chuyên biệt để sinh ra hầu hết chúng.</p>
        <p>Ví dụ, khi bạn chạy đoạn mã sau với các ký tự được bao quanh bởi dấu ngoặc trong REPL hoặc tệp chương trình:</p>
      `,
      codeExamples: [
        {
          title: 'Biểu thức giá trị nguyên văn (literal expression) sinh ra đối tượng',
          code: `>>> 'Python'`,
          output: `'Python'`,
          annotations: [
            { line: 1, text: 'Gõ literal chuỗi sinh ra ngay đối tượng str mà không cần gọi hàm hay khai báo.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Không Khai báo Kiểu, Định kiểu Động và Định kiểu Mạnh',
      content: `
        <p>Về mặt kỹ thuật, khi bạn gõ <code>'Python'</code>, bạn đang chạy một <strong>biểu thức giá trị nguyên văn (literal expression)</strong> nhằm tạo và trả về một đối tượng chuỗi ký tự mới. Có cú pháp ngôn ngữ Python dành riêng để tạo ra đối tượng này.</p>
        <p>Tương tự như vậy:</p>
        <ul>
          <li>Một biểu thức đặt trong dấu ngoặc vuông <code>[...]</code> tạo ra một danh sách <code>list</code>.</li>
          <li>Đặt trong dấu ngoặc nhọn <code>{...}</code> tạo ra một từ điển <code>dict</code> hoặc một tập hợp <code>set</code>.</li>
        </ul>
        <p><strong>Python không yêu cầu hay sử dụng các khai báo kiểu dữ liệu</strong> (như <code>int a;</code> hay <code>String s;</code> trong các ngôn ngữ tĩnh). Chính cú pháp của các biểu thức bạn thực thi sẽ quyết định kiểu của các đối tượng mà bạn tạo ra và sử dụng. Trên thực tế, các biểu thức tạo đối tượng giống như trong Bảng 4-1 thường là nơi khởi nguồn của các kiểu dữ liệu trong Python.</p>
        <p>Quan trọng không kém, một khi bạn đã tạo ra một đối tượng, <strong>bạn đã gắn chặt tập hợp thao tác của nó mãi mãi</strong>—bạn chỉ có thể thực hiện các thao tác chuỗi trên một chuỗi và các thao tác danh sách trên một danh sách. Nói theo thuật ngữ chuyên ngành:</p>
        <ul>
          <li><strong>Python được định kiểu động (dynamically typed):</strong> Một mô hình tự động theo dõi kiểu của đối tượng cho bạn khi chạy chương trình thay vì bắt buộc phải có mã khai báo tĩnh từ trước.</li>
          <li><strong>Python cũng là một ngôn ngữ định kiểu mạnh (strongly typed):</strong> Một ràng buộc quy định rằng bạn chỉ có thể thực hiện trên một đối tượng những thao tác hợp lệ đối với kiểu của nó. Nếu cố tình thực hiện thao tác phi lý (chẳng hạn lấy chuỗi trừ cho số), Python sẽ báo lỗi ngay lập tức thay vì âm thầm ép kiểu sai lệch.</li>
        </ul>
        <p style="margin-top:12px;padding:12px 14px;background:var(--bg-surface);border-left:3px solid var(--accent-primary);border-radius:6px;">
          <strong>Lời dặn của Mark Lutz:</strong> <em>"Chúng ta sẽ nghiên cứu toàn diện từng kiểu đối tượng trong Bảng 4-1 ở các bài học tiếp theo. Đừng kỳ vọng sẽ tìm thấy toàn bộ câu chuyện ở đây—mục tiêu của chương này chỉ là khơi dậy sự tò mò của bạn và giới thiệu một số ý niệm chủ chốt. Dẫu vậy, cách tốt nhất để bắt đầu là bắt tay vào làm ngay, vì vậy chúng ta hãy cùng nhảy thẳng vào một số dòng mã thao tác với đối tượng thực thụ ở bài tiếp theo!"</em>
        </p>
      `,
      codeExamples: [
        {
          title: 'Chứng minh định kiểu mạnh: Python từ chối thao tác không hợp lệ',
          code: `>>> s = 'Code'
>>> s + 10          # Lỗi! Không thể cộng chuỗi với số nguyên
TypeError: can only concatenate str (not "int") to str

>>> s + str(10)     # Đúng: Phải thực hiện thao tác hợp lệ giữa hai chuỗi
'Code10'`,
          output: `TypeError: can only concatenate str (not "int") to str
'Code10'`,
          annotations: [
            { line: 2, text: 'Định kiểu mạnh bảo vệ chương trình: từ chối ép kiểu bừa bãi như JavaScript.' },
            { line: 5, text: 'Thao tác ghép nối chỉ hợp lệ khi cả hai đều là chuỗi.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Đừng nhầm lẫn: Kiểu động KHÔNG có nghĩa là Kiểu yếu (Weakly Typed)',
        content: 'Một số người lầm tưởng vì Python không cần khai báo kiểu nên nó là "kiểu yếu". Hoàn toàn sai! JavaScript hay C mới có tính ép kiểu yếu (ví dụ trong JS: <code>"5" - 2</code> cho ra <code>3</code>, <code>"5" + 2</code> cho ra <code>"52"</code>). Python là <strong>định kiểu mạnh mẽ</strong>: nó sẽ chặn đứng thao tác <code>"5" - 2</code> bằng <code>TypeError</code> ngay lập tức.'
      }
    ],
    tips: [
      {
        title: 'Biểu thức literal là công cụ sinh đối tượng nhanh nhất',
        content: 'Viết <code>[]</code> luôn nhanh hơn gọi <code>list()</code>, viết <code>{}</code> luôn nhanh hơn gọi <code>dict()</code>, bởi vì cú pháp literal được bộ dịch mã nhận diện trực tiếp thành mã opcode chuyên biệt trong bytecode của CPython.'
      }
    ]
  },

  exercises: [
    {
      title: 'Nhận diện kiểu đối tượng từ cú pháp literal',
      level: 'Dễ',
      problem: 'Hãy cho biết kiểu đối tượng sinh ra từ các biểu thức literal sau:<br>1) <code>[1, 2, 3]</code><br>2) <code>{"a": 1, "b": 2}</code><br>3) <code>(1, 2, 3)</code><br>4) <code>{1, 2, 3}</code>',
      hint: 'Quan sát dấu ngoặc: vuông, nhọn có cặp key:value, tròn, và nhọn chỉ có phần tử rời rạc.',
      solutionCode: `print(type([1, 2, 3]))
print(type({'a': 1, 'b': 2}))
print(type((1, 2, 3)))
print(type({1, 2, 3}))`,
      solutionOutput: `<class 'list'>
<class 'dict'>
<class 'tuple'>
<class 'set'>`,
      explanation: 'Ngoặc vuông sinh ra List; ngoặc nhọn có hai chấm sinh ra Dictionary; ngoặc tròn sinh ra Tuple; ngoặc nhọn không có hai chấm sinh ra Set.'
    },
    {
      title: 'Kiểm chứng tính chất "Hàm cũng là đối tượng"',
      level: 'Vừa',
      problem: 'Bảng 4-1 chỉ ra rằng hàm là một đối tượng thuộc đơn vị chương trình. Hãy viết mã để gán một hàm tích hợp sẵn (ví dụ <code>len</code>) vào một tên biến mới và truyền nó vào một hàm khác.',
      hint: 'Trong Python, tên hàm không có dấu ngoặc đơn () chính là tham chiếu tới đối tượng hàm.',
      solutionCode: `# Gán hàm len cho một tên biến tiếng Việt:
dem_phan_tu = len

# Gọi hàm thông qua tên biến mới:
chuoi = "Learning Python"
print("Độ dài chuỗi:", dem_phan_tu(chuoi))

# Lưu đối tượng hàm vào danh sách:
cac_ham = [len, str.upper, str.strip]
print("Hàm đầu tiên trong list:", cac_ham[0](chuoi))`,
      solutionOutput: `Độ dài chuỗi: 15
Hàm đầu tiên trong list: 15`,
      explanation: 'Hàm trong Python là đối tượng hạng nhất (first-class object): có thể gán cho biến, lưu trong danh sách/từ điển và truyền làm đối số như bất kỳ con số hay chuỗi nào.'
    }
  ],

  quiz: [
    {
      question: 'Tại sao các đối tượng trong Bảng 4-1 lại được gọi là các kiểu đối tượng "cốt lõi" (core object types)?',
      options: [
        'Vì chúng bắt buộc phải nạp bằng câu lệnh import từ thư viện ngoài.',
        'Vì chúng được tích hợp hữu cơ vào chính ngôn ngữ Python và hầu hết đều có cú pháp biểu thức riêng (literal) để sinh ra.',
        'Vì chúng là những kiểu duy nhất được phép lưu trữ trong bộ nhớ RAM máy tính.',
        'Vì chúng không thể bị kế thừa hay mô phỏng bởi các lớp lập trình viên tự tạo.'
      ],
      correctIndex: 1,
      explanation: 'Chúng là kiểu cốt lõi vì được tích hợp trực tiếp vào cú pháp ngôn ngữ, có literal biểu thức riêng để sinh ra (như \'Python\', [1, 2], {a: 1}).'
    },
    {
      question: 'Khẳng định nào sau đây mô tả chính xác nhất bản chất "Định kiểu động" (Dynamically typed) của Python?',
      options: [
        'Lập trình viên phải khai báo kiểu dữ liệu cho biến trước khi sử dụng.',
        'Kiểu dữ liệu có thể tự do thay đổi bất hợp lý trong quá trình chạy mà không có quy tắc nào.',
        'Python tự động theo dõi kiểu của đối tượng cho bạn khi chạy mà không bắt buộc phải có mã khai báo tĩnh từ trước.',
        'Tất cả các biến đều tự động bị ép về kiểu chuỗi ký tự.'
      ],
      correctIndex: 2,
      explanation: 'Định kiểu động nghĩa là Python tự động theo dõi kiểu của đối tượng gắn với vùng nhớ mà không bắt buộc phải có câu lệnh khai báo kiểu từ trước.'
    },
    {
      question: 'Khẳng định nào sau đây mô tả chính xác nhất bản chất "Định kiểu mạnh" (Strongly typed) của Python?',
      options: [
        'Python cho phép thực hiện bất kỳ thao tác nào lên đối tượng, kể cả trừ chuỗi cho số.',
        'Python chỉ thực hiện trên một đối tượng những thao tác hợp lệ đối với kiểu của nó, và sẽ báo lỗi nếu thao tác sai kiểu.',
        'Python bắt buộc máy tính phải có cấu hình phần cứng cực mạnh mới chạy được.',
        'Mọi kiểu dữ liệu trong Python đều có kích thước cố định không thể mở rộng.'
      ],
      correctIndex: 1,
      explanation: 'Định kiểu mạnh là ràng buộc bảo vệ: Python chỉ thực hiện các thao tác hợp lệ với kiểu của đối tượng, không ép kiểu ngầm nguy hiểm.'
    }
  ],

  summary: [
    'Bảng 4-1 bao gồm 10 nhóm đối tượng dựng sẵn cốt lõi của Python từ kiểu dữ liệu số, văn bản, tập hợp đến đơn vị chương trình.',
    'Các kiểu cốt lõi được tích hợp hữu cơ vào cú pháp ngôn ngữ với biểu thức literal riêng biệt để sinh ra.',
    'Hàm, module, lớp cũng là những đối tượng hạng nhất trong Python.',
    'Python là ngôn ngữ Định kiểu động (tự theo dõi kiểu không cần khai báo) và Định kiểu mạnh (chỉ thực hiện thao tác hợp lệ với kiểu).',
    'Ý chính: Kiểu của đối tượng quyết định các thao tác hợp lệ; nắm vững các kiểu cốt lõi là chìa khóa để làm chủ toàn bộ ngôn ngữ Python.'
  ]
};
