export default {
  id: 'lp-c6-09',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.9',
  title: 'So sánh Bằng (==) vs So sánh Định danh (is) & Cơ chế Cache Số nguyên Nhỏ',
  subtitle: 'Phân định rạch ròi giữa so sánh giá trị và so sánh địa chỉ đối tượng, cùng bí mật lưu đệm số nguyên trong CPython',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt rõ ràng hai phương pháp kiểm tra bằng nhau trong Python: toán tử giá trị (==) và toán tử định danh (is).',
    'Thực nghiệm hành vi của == và is trên đối tượng danh sách khi chia sẻ tham chiếu và khi tạo mới độc lập.',
    'Khám phá cơ chế lưu bộ nhớ đệm (caching) số nguyên nhỏ và chuỗi ngắn của CPython.',
    'Giải mã hiện tượng X = 99; Y = 99 khiến X is Y trả về True dù được tạo từ hai biểu thức hằng riêng biệt.'
  ],

  intuition: {
    title: 'Hai cuốn sách song sinh hay một cuốn sách duy nhất?',
    metaphor: 'Hãy tưởng tượng bạn bước vào nhà sách và nhìn thấy hai cuốn sách giáo trình "Learning Python" mới tinh đặt cạnh nhau trên giá. Nếu bạn hỏi: "Hai cuốn sách này có nội dung giống nhau không?" — Câu trả lời là CÓ (toán tử == trả về True, vì chữ, trang, bìa đều giống hệt nhau từng milimet). Nhưng nếu bạn hỏi: "Hai cuốn sách này có phải là CÙNG MỘT cuốn sách vật lý duy nhất không?" — Câu trả lời là KHÔNG (toán tử is trả về False, vì bạn đang cầm hai quyển sách vật lý riêng biệt chiếm hai vị trí không gian khác nhau). Toán tử == kiểm tra nội dung bên trong; còn toán tử is kiểm tra xem có phải bạn đang chỉ tay vào đúng một vật thể vật lý duy nhất trong không gian hay không.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN BIỆT TOÁN TỬ == (GIÁ TRỊ) VÀ TOÁN TỬ IS (ĐỊNH DANH ĐỐI TƯỢNG)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <!-- TH1: L và M trỏ cùng đối tượng -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">L = [1, 2, 3]; M = L</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              • Cùng nội dung: <code>L == M</code> ──► <strong style="color:var(--success);">True</strong><br>
              • Cùng đối tượng: <code>L is M</code> ──► <strong style="color:var(--success);">True</strong><br>
              <em>(Cả hai cùng trỏ chung một địa chỉ RAM)</em>
            </div>
          </div>
          <!-- TH2: L và M trỏ 2 đối tượng riêng -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:6px;">L = [1, 2, 3]; M = [1, 2, 3]</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              • Cùng nội dung: <code>L == M</code> ──► <strong style="color:var(--success);">True</strong><br>
              • Cùng đối tượng: <code>L is M</code> ──► <strong style="color:var(--danger);">False</strong><br>
              <em>(Hai vùng nhớ độc lập có nội dung tương đương)</em>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bản chất Thực tế của Thu gom Rác & Bộ nhớ Đệm CPython',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 11 / 17 – Trang 12 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Để làm sáng tỏ vấn đề một cách tường minh và trung thực nhất, cần phải chỉ ra rằng hành vi thu gom rác tự động được mô tả ở phần trước có thể mang tính chất khái niệm nhiều hơn là diễn ra theo đúng nghĩa đen đối với một số kiểu dữ liệu nhất định. Hãy xem xét các câu lệnh sau:</p>
      `,
      codeExamples: [
        {
          title: 'Câu hỏi về số phận của số 99',
          code: `>>> x = 99
>>> x = 'Python'   # Thu hồi 99 ngay bây giờ?`,
          output: ``,
          annotations: [
            { line: 2, text: 'Về mặt khái niệm, refcount của 99 giảm về 0. Nhưng liệu nó có bị giải phóng khỏi RAM ngay không?' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Cơ chế Lưu Đệm (Cache) Số nguyên Nhỏ và Chuỗi Ngắn',
      content: `
        <p>Bởi vì Python lưu trữ <strong>bộ nhớ đệm (cache) và tái sử dụng các số nguyên nhỏ và các chuỗi ký tự ngắn</strong>, đối tượng <code>99</code> ở đây trên thực tế nhiều khả năng <em>không bị thu hồi bộ nhớ theo nghĩa đen</em>; thay vào đó, nó rất có thể vẫn được lưu giữ lại trong một bảng hệ thống nội bộ để sẵn sàng tái sử dụng cho lần tiếp theo mã nguồn của bạn sinh ra số <code>99</code>.</p>

        <p>Tuy nhiên, phần lớn các loại đối tượng (như list, dict, object lớn) đều được thu hồi ngay lập tức khi không còn ai tham chiếu tới chúng; đối với những đối tượng không bị thu hồi lập tức, cơ chế lưu đệm này <strong>hoàn toàn trong suốt và không gây ảnh hưởng gì tới ngữ nghĩa mã nguồn của bạn</strong>—trừ phi bạn sử dụng những công cụ kiểm tra không điển hình như toán tử <code>is</code>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Phân biệt Toán tử == và Toán tử is',
      content: `
        <p>Xuất phát từ mô hình tham chiếu của Python, có <strong>hai cách thức phân biệt để kiểm tra tính bằng nhau</strong> trong một chương trình Python. Chúng ta hãy tạo một tham chiếu chia sẻ để chứng minh:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh == và is khi hai biến cùng tham chiếu chia sẻ',
          code: `>>> L = [1, 2, 3]
>>> M = L         # Cho M và L cùng tham chiếu tới một đối tượng
>>> L == M        # Cùng giá trị
True
>>> L is M        # Cùng đối tượng
True`,
          output: `True
True`,
          annotations: [
            { line: 3, text: 'Toán tử == kiểm tra hai đối tượng có cùng giá trị nội dung không.' },
            { line: 5, text: 'Toán tử is kiểm tra hai biến có cùng trỏ tới chính xác một đối tượng duy nhất không.' }
          ]
        },
        {
          title: 'So sánh == và is khi tạo hai đối tượng riêng biệt',
          code: `>>> L = [1, 2, 3]
>>> M = [1, 2, 3] # Hai biểu thức literal độc lập
>>> L == M        # Cùng giá trị
True
>>> L is M        # Đối tượng khác nhau!
False`,
          output: `True
False`,
          annotations: [
            { line: 3, text: 'Hai danh sách có cùng giá trị [1, 2, 3] nên == trả về True.' },
            { line: 5, text: 'Chúng nằm ở hai vùng RAM khác nhau (hai đối tượng riêng), nên is trả về False.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Hiện tượng Tái sử dụng Đối tượng với Số nguyên Nhỏ',
      content: `
        <p>Kỹ thuật đầu tiên ở đây, toán tử <code>==</code>, kiểm tra xem hai đối tượng được tham chiếu tới có chứa cùng giá trị hay không; đây là phương pháp hầu như luôn luôn được sử dụng cho các phép kiểm tra bằng nhau trong Python.</p>

        <p>Phương pháp thứ hai, toán tử <code>is</code>, thay vào đó kiểm tra <strong>định danh đối tượng (object identity)</strong>—nó chỉ trả về <code>True</code> nếu cả hai tên biến cùng trỏ tới chính xác một đối tượng duy nhất, do đó đây là một dạng kiểm tra tính tương đương mạnh hơn rất nhiều và hiếm khi được áp dụng trong hầu hết các chương trình (ngoại trừ các đối tượng đơn bản – <em>single-instance objects / singletons</em> – như <code>None</code>, <code>True</code> và <code>False</code>).</p>

        <p>Thực chất, <code>is</code> chỉ đơn giản so sánh các con trỏ hiện thực hóa tham chiếu, và nó đóng vai trò như một phương tiện giúp phát hiện các tham chiếu chia sẻ trong mã nguồn của bạn khi cần.</p>

        <p>Nhưng bây giờ, hãy quan sát điều gì sẽ xảy ra khi chúng ta thực hiện các phép toán tương tự trên một đối tượng bất biến như số nguyên:</p>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm toán tử is trên số nguyên nhỏ 99',
          code: `>>> X = 99
>>> Y = 99        # Lẽ ra là hai biểu thức hằng riêng biệt
>>> X == Y
True
>>> X is Y        # Vẫn cùng đối tượng: cơ chế lưu bộ đệm hoạt động!
True`,
          output: `True
True`,
          annotations: [
            { line: 3, text: 'X == Y đương nhiên là True vì cùng bằng 99.' },
            { line: 5, text: 'X is Y cũng trả về True! CPython tái sử dụng đối tượng số 99 đã lưu trong bảng cache!' }
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      title: '5. Tại sao Cơ chế Cache Không Làm Sai Lệch Mã nguồn?',
      content: `
        <p>Trong phiên tương tác trên, <code>X</code> và <code>Y</code> đáng lẽ ra phải bằng nhau theo <code>==</code> (cùng giá trị), nhưng không bằng nhau theo <code>is</code> (cùng đối tượng) vì chúng ta đã thực thi hai biểu thức hằng giá trị (literals) riêng biệt (cùng gõ số 99). Tuy nhiên, do một số số nguyên (trong CPython truyền thống là từ <code>-5</code> đến <code>256</code>) và chuỗi ngắn được lưu đệm và tái sử dụng, toán tử <code>is</code> lại báo cho chúng ta biết rằng chúng cùng tham chiếu tới một đối tượng duy nhất.</p>

        <p>Cơ chế lưu bộ đệm và tái sử dụng đối tượng này <strong>hoàn toàn không làm thay đổi ngữ nghĩa mã nguồn của bạn</strong> (trừ phi bạn chạy lệnh kiểm tra <code>is</code>!). Do bạn không thể thay đổi các con số hay chuỗi bất biến tại chỗ, nên việc có bao nhiêu tham chiếu cùng trỏ tới một đối tượng hoàn toàn không thành vấn đề—mọi tham chiếu sẽ luôn nhìn thấy cùng một giá trị bất biến như nhau cho dù tất cả chúng đều cùng trỏ vào một đối tượng được lưu đệm.</p>

        <p>Dẫu vậy, hành vi này phản ánh một trong nhiều giải pháp tinh tế mà Python áp dụng để tối ưu hóa mô hình nhằm tăng tốc độ thực thi và tiết kiệm bộ nhớ RAM.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Tuyệt đối không dùng toán tử is để so sánh giá trị số hoặc chuỗi',
        content: 'Bởi vì cơ chế lưu đệm số nguyên và chuỗi phụ thuộc vào bản phân phối và ngưỡng tối ưu của trình thông dịch, việc viết <code>if x is 1000:</code> có thể trả về <code>False</code> dù <code>x</code> mang giá trị 1000! Hãy luôn luôn dùng toán tử <code>==</code> cho các so sánh giá trị thông thường, và chỉ dành riêng toán tử <code>is</code> cho việc kiểm tra đơn bản như <code>if x is None:</code>.'
      }
    ]
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Dự đoán kết quả của == và is trên danh sách rỗng',
      problem: 'Cho hai câu lệnh: <code>a = []; b = []</code>. Hãy cho biết giá trị của <code>a == b</code> và <code>a is b</code> là gì và giải thích lý do.',
      hint: 'Mỗi lần viết cặp ngoặc vuông [] là một lần yêu cầu Python tạo ra một danh sách mới độc lập.',
      solutionCode: `a = []
b = []

print("a == b:", a == b)
print("a is b:", a is b)`,
      solutionOutput: `a == b: True
a is b: False`,
      explanation: 'Toán tử == trả về True vì cả hai danh sách đều rỗng (có cùng nội dung). Toán tử is trả về False vì mỗi biểu thức [] tạo ra một đối tượng danh sách độc lập mới tại một địa chỉ bộ nhớ riêng biệt (danh sách khả biến không bao giờ được tự động cache chia sẻ như số nguyên nhỏ).'
    }
  ],

  quiz: [
    {
      question: 'Sự khác biệt căn bản nhất giữa toán tử == và toán tử is trong Python là gì?',
      options: [
        'Toán tử == so sánh kiểu dữ liệu, toán tử is so sánh độ dài chuỗi.',
        'Toán tử == kiểm tra hai đối tượng có cùng giá trị không; toán tử is kiểm tra định danh xem hai biến có cùng trỏ tới đúng một đối tượng duy nhất trong bộ nhớ không.',
        'Toán tử == chỉ dùng cho số, toán tử is chỉ dùng cho danh sách.',
        'Toán tử is chạy chậm hơn toán tử == mười lần.'
      ],
      correctIndex: 1,
      explanation: 'Toán tử == kiểm tra tính bằng nhau về mặt giá trị/nội dung (value equality), trong khi toán tử is kiểm tra tính bằng nhau về mặt định danh đối tượng (object identity - cùng địa chỉ bộ nhớ).'
    },
    {
      question: 'Tại sao khi chạy X = 99; Y = 99, biểu thức X is Y lại trả về True trong CPython?',
      options: [
        'Vì trình thông dịch CPython lưu bộ nhớ đệm (cache) và tái sử dụng các đối tượng số nguyên nhỏ.',
        'Vì biến X và biến Y có cùng tên chữ cái in hoa.',
        'Vì số 99 là số lẻ nên Python tự động gộp bộ nhớ.',
        'Vì hệ điều hành Windows bắt buộc các biến số nguyên phải gộp chung.'
      ],
      correctIndex: 0,
      explanation: 'CPython tối ưu hóa hiệu năng bằng cách lưu bộ đệm (cache) sẵn các đối tượng số nguyên nhỏ (từ -5 đến 256) và các chuỗi ngắn, tái sử dụng cùng một đối tượng duy nhất thay vì cấp phát mới mỗi lần xuất hiện.'
    }
  ],

  summary: [
    'Toán tử == so sánh giá trị nội dung của hai đối tượng (hầu như luôn được sử dụng).',
    'Toán tử is so sánh định danh đối tượng (kiểm tra xem có cùng trỏ vào một địa chỉ RAM không).',
    'Chỉ nên dùng toán tử is cho các đối tượng đơn bản (singleton) như None, True, False.',
    'CPython duy trì cơ chế lưu đệm (cache) cho các số nguyên nhỏ và chuỗi ngắn để tối ưu hiệu năng.',
    'Cơ chế cache không làm thay đổi ngữ nghĩa mã nguồn vì các đối tượng được cache đều là kiểu bất biến.'
  ]
};
