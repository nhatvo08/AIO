export default {
  id: 'lp-c6-07',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.7',
  title: 'Tham chiếu Chia sẻ & Các Thay đổi Tại chỗ trên Kiểu Khả biến',
  subtitle: 'Giải mã hiện tượng tác động lan truyền bí hiểm: khi thay đổi một phần tử danh sách làm biến đổi ngầm các biến khác',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nhận diện các kiểu đối tượng khả biến (mutable types) chủ đạo trong Python: list, dict, set.',
    'Phân biệt rạch ròi giữa việc gán lại biến (L1 = 24) và thao tác thay đổi tại chỗ trên đối tượng (L1[0] = 24).',
    'Thấu suốt cơ chế tác động lan truyền (side effect): vì sao thay đổi qua biến L1 lại bất ngờ làm đổi giá trị hiển thị của L2.',
    'Hiểu tầm quan trọng của việc kiểm soát tham chiếu chia sẻ khi truyền cấu trúc dữ liệu qua các hàm trong dự án.'
  ],

  intuition: {
    title: 'Viết thêm chữ lên cùng một cuốn sổ tay dùng chung',
    metaphor: 'Nếu như đối tượng bất biến (như số nguyên 3) giống như một bức tranh khắc đá nguyên khối không ai có thể sửa đổi nét khắc, thì đối tượng khả biến (như danh sách list) lại giống như một cuốn sổ tay có thể mở ra để tẩy xóa và viết thêm chữ bất kỳ lúc nào. Khi bạn thực hiện L1 = [2, 3, 4] và L2 = L1, cả L1 và L2 đều cùng cầm trong tay địa chỉ của cuốn sổ tay duy nhất đó trên bàn. Nếu người cầm chìa khóa L1 mở trang đầu của cuốn sổ ra và gạch số 2 đi để viết đè số 24 vào (L1[0] = 24), cuốn sổ thực chất đã bị thay đổi tại chỗ. Tới lượt người cầm chìa khóa L2 mở cuốn sổ ra xem, họ sẽ lập tức nhìn thấy số 24! Người thứ hai không hề viết gì lên sổ, nhưng nội dung họ nhìn thấy đã bị thay đổi do người thứ nhất tạo ra trên cùng một cuốn sổ dùng chung.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ THAY ĐỔI TẠI CHỖ (IN-PLACE CHANGE) TRÊN ĐỐI TƯỢNG LIST CHIA SẺ</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:24px;padding:16px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
          <!-- Cột Biến -->
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div style="padding:6px 14px;background:#bae6fd;border:1px solid #0284c7;border-radius:12px;color:#0369a1;font-weight:700;">L1</div>
            <div style="padding:6px 14px;background:#bae6fd;border:1px solid #0284c7;border-radius:12px;color:#0369a1;font-weight:700;">L2</div>
          </div>
          <!-- Mũi tên con trỏ -->
          <div style="display:flex;flex-direction:column;gap:16px;color:var(--accent-primary);">
            <div>──────►</div>
            <div>──────►</div>
          </div>
          <!-- Đối tượng Danh sách chung -->
          <div style="padding:14px 20px;background:#fef3c7;border:2px solid #d97706;border-radius:12px;">
            <div style="font-weight:700;color:#b45309;margin-bottom:6px;font-size:0.82rem;">Đối tượng List chung trong RAM</div>
            <div style="display:flex;gap:8px;font-family:var(--font-mono);font-size:1.1rem;font-weight:700;">
              <span style="padding:4px 10px;background:#fee2e2;color:#b91c1c;border:1px solid #ef4444;border-radius:6px;" title="Vừa bị L1[0] = 24 ghi đè tại chỗ!">24</span>
              <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">3</span>
              <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">4</span>
            </div>
            <div style="font-size:0.75rem;color:var(--danger);font-weight:700;margin-top:8px;">L1[0] = 24 ghi đè trực tiếp ô nhớ phần tử đầu!</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--text-muted);">
          <em>Cả L1 và L2 đều in ra [24, 3, 4] vì cùng trỏ tới một vùng nhớ danh sách vừa bị sửa đổi nội dung.</em>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Thay đổi Tại chỗ (In-Place Changes)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 9 / 17 – Trang 10 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Như bạn sẽ tìm hiểu kỹ hơn trong các chương sắp tới của Phần II, một số thao tác trong Python quả thực có khả năng làm <strong>biến đổi đối tượng ngay tại chỗ (in-place)</strong>, nhưng chúng chỉ được hỗ trợ bởi các <strong>kiểu dữ liệu khả biến (mutable types)</strong>—bao gồm danh sách (<code>list</code>), từ điển (<code>dict</code>) và tập hợp (<code>set</code>). Chẳng hạn, một phép gán giá trị vào một vị trí chỉ mục (offset) trong danh sách <code>list</code> sẽ thực sự làm biến đổi chính đối tượng danh sách đó tại chỗ, thay vì tạo ra một đối tượng danh sách mới hoàn toàn.</p>

        <p>Mặc dù ở thời điểm này bạn có thể phải tạm chấp nhận nó như một nguyên lý, nhưng sự phân biệt này lại đóng vai trò cực kỳ hệ trọng trong mọi chương trình Python của bạn. Đối với những đối tượng hỗ trợ các thay đổi tại chỗ như vậy, bạn cần phải <strong>hết sức lưu tâm tới các tham chiếu chia sẻ</strong>, bởi vì một thay đổi được thực hiện qua một tên biến có thể tác động trực tiếp tới các biến khác. Nếu không hiểu rõ bản chất, các đối tượng của bạn dường như sẽ bị thay đổi một cách bí hiểm mà không rõ nguyên nhân.</p>

        <p>Do tất cả các phép gán trong Python đều dựa trên cơ chế tham chiếu (kể cả việc truyền tham số đối số vào hàm), đây là một hiện tượng phổ biến và hiện diện khắp mọi nơi trong mã nguồn Python.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Thí nghiệm So sánh: Gán lại Biến vs Gán vào Chỉ mục Phần tử',
      content: `
        <p>Để minh họa, chúng ta hãy xem lại các đối tượng danh sách <code>list</code>. Hãy nhớ lại rằng danh sách list, vốn có hỗ trợ các phép gán tại chỗ theo vị trí chỉ mục, chỉ đơn thuần là tập hợp chứa các liên kết tới đối tượng khác, được viết trong cặp ngoặc vuông:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo hai biến cùng tham chiếu tới một danh sách list',
          code: `>>> L1 = [2, 3, 4]
>>> L2 = L1`,
          output: ``,
          annotations: [
            { line: 1, text: 'Tạo đối tượng danh sách chứa 3 đối tượng số nguyên 2, 3, 4.' },
            { line: 2, text: 'L2 cùng tham chiếu tới đối tượng danh sách được chia sẻ này.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phép gán Ghi đè Toàn bộ Biến: L1 = 24',
      content: `
        <p>Nếu bây giờ chúng ta thực hiện phép gán:</p>
      `,
      codeExamples: [
        {
          title: 'Gán đè toàn bộ biến L1 sang đối tượng số nguyên 24',
          code: `>>> L1 = 24
>>> L1
24
>>> L2
[2, 3, 4]`,
          output: `24
[2, 3, 4]`,
          annotations: [
            { line: 1, text: 'Phép gán này chỉ đơn thuần chuyển con trỏ của L1 sang trỏ tới số 24.' },
            { line: 4, text: 'Biến L2 vẫn tiếp tục trỏ tới danh sách [2, 3, 4] ban đầu mà không bị đổi.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Phép gán Thay đổi Tại chỗ: L1[0] = 24 & Hiệu ứng Lan truyền sang L2',
      content: `
        <p>Tuy nhiên, nếu chúng ta thay đổi cú pháp của câu lệnh này đôi chút—thay vì gán lại biến <code>L1</code>, ta gán vào phần tử chỉ mục <code>L1[0]</code>—tác động của nó sẽ thay đổi một cách căn bản và đáng kinh ngạc:</p>
      `,
      codeExamples: [
        {
          title: 'Thay đổi tại chỗ phần tử đầu tiên của danh sách: L1[0] = 24',
          code: `>>> L1 = [2, 3, 4]    # Một đối tượng khả biến
>>> L2 = L1          # Tạo tham chiếu tới cùng đối tượng
>>> L1[0] = 24       # Thay đổi tại chỗ!
>>> L1               # L1 đã khác
[24, 3, 4]
>>> L2               # Nhưng L2 cũng vậy!
[24, 3, 4]`,
          output: `[24, 3, 4]
[24, 3, 4]`,
          annotations: [
            { line: 3, text: 'L1[0] = 24 không đổi biến L1; nó ghi đè trực tiếp ô nhớ phần tử đầu của đối tượng danh sách.' },
            { line: 6, text: 'L2 cũng tham chiếu tới cùng đối tượng danh sách này, nên L2 lập tức phản chiếu sự thay đổi!' }
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      title: '5. Phân tích Nguyên lý: Tại sao L2 Lại Bị Ảnh hưởng?',
      content: `
        <p>Thực chất, ở dòng thứ ba <code>L1[0] = 24</code>, chúng ta <strong>không hề thay đổi bản thân biến <code>L1</code></strong>; chúng ta đã thay đổi một thành phần bên trong đối tượng mà <code>L1</code> đang tham chiếu tới. Kiểu biến đổi này ghi đè trực tiếp lên một phần giá trị của đối tượng danh sách tại chỗ trong bộ nhớ RAM.</p>

        <p>Tuy nhiên, bởi vì đối tượng danh sách này đang được <strong>chia sẻ (được tham chiếu đồng thời) từ biến <code>L2</code></strong>, nên một thay đổi tại chỗ như thế này sẽ không chỉ ảnh hưởng riêng tới <code>L1</code>—bạn phải luôn ý thức rằng khi bạn thực hiện những thay đổi như vậy, chúng có thể tác động lan sang các phần khác trong chương trình của bạn.</p>

        <p>Trong ví dụ này, hiệu ứng thay đổi cũng xuất hiện ở <code>L2</code> bởi vì nó cùng tham chiếu tới đúng đối tượng đó với <code>L1</code>. Xin nhắc lại, chúng ta cũng không hề trực tiếp thay đổi <code>L2</code>, nhưng giá trị của nó hiển thị khác đi là bởi vì <strong>nó đang trỏ tới một đối tượng vừa bị ghi đè nội dung tại chỗ</strong>.</p>

        <p>Hành vi này chỉ xảy ra đối với các đối tượng khả biến có hỗ trợ thay đổi tại chỗ và thông thường đó chính là điều bạn mong muốn (ví dụ truyền danh sách vào hàm để hàm cập nhật dữ liệu). Nhưng bạn bắt buộc phải nắm vững cơ chế hoạt động của nó để luôn lường trước được kết quả và tránh những lỗi ngầm khó phát hiện.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy ngộ nhận tham chiếu chia sẻ khi truyền tham số vào hàm',
        content: 'Khi bạn truyền một danh sách <code>L</code> vào một hàm và bên trong hàm gọi lệnh sửa đổi như <code>L.append(item)</code> hoặc <code>L[0] = val</code>, bạn đang trực tiếp làm thay đổi danh sách ở bên ngoài hàm! Nếu bạn không muốn hàm làm thay đổi dữ liệu gốc của caller, bạn bắt buộc phải tạo một bản sao độc lập trước khi thao tác.'
      }
    ]
  },

  exercises: [
    {
      level: 'Trung bình',
      title: 'Nhận diện tác động của phương thức append() trên tham chiếu chia sẻ',
      problem: 'Hãy dự đoán kết quả in ra của a và b sau đoạn mã sau:\n\n```python\na = [1, 2]\nb = a\na.append(3)\nprint("a =", a)\nprint("b =", b)\n```',
      hint: 'Phương thức append() làm thay đổi đối tượng danh sách tại chỗ hay tạo ra danh sách mới?',
      solutionCode: `a = [1, 2]
b = a
a.append(3)

print("a =", a)
print("b =", b)
print("a is b?", a is b)`,
      solutionOutput: `a = [1, 2, 3]
b = [1, 2, 3]
a is b? True`,
      explanation: 'Phương thức a.append(3) làm biến đổi chính đối tượng danh sách ban đầu tại chỗ mà không sinh ra đối tượng mới. Do b cùng tham chiếu tới danh sách này, nên giá trị hiển thị của b cũng là [1, 2, 3].'
    }
  ],

  quiz: [
    {
      question: 'Trong ví dụ L1 = [2, 3, 4]; L2 = L1; L1[0] = 24, tại sao giá trị của L2 cũng hiển thị là [24, 3, 4]?',
      options: [
        'Vì Python có tính năng đồng bộ hóa hai biến bằng socket mạng ngầm.',
        'Vì L1[0] = 24 làm thay đổi trực tiếp nội dung bên trong đối tượng danh sách chung mà cả L1 và L2 cùng trỏ tới.',
        'Vì biến L2 là bản sao tự động của biến L1.',
        'Vì toán tử gán dấu bằng luôn luôn xóa biến cũ và gán lại biến mới.'
      ],
      correctIndex: 1,
      explanation: 'Danh sách là đối tượng khả biến (mutable); phép gán L1[0] = 24 sửa đổi thành phần bên trong của chính đối tượng danh sách được chia sẻ, khiến mọi biến đang cùng trỏ vào đối tượng này (bao gồm L2) đều nhìn thấy giá trị mới.'
    },
    {
      question: 'Nhóm kiểu dữ liệu nào sau đây trong Python hỗ trợ các thao tác thay đổi tại chỗ (in-place changes)?',
      options: [
        'int, float, complex',
        'str, tuple, frozenset',
        'list, dict, set',
        'bool, None, bytes'
      ],
      correctIndex: 2,
      explanation: 'Trong Python, nhóm kiểu dữ liệu cốt lõi khả biến (mutable) hỗ trợ thay đổi nội dung tại chỗ bao gồm: danh sách (list), từ điển (dict) và tập hợp (set).'
    }
  ],

  summary: [
    'Đối tượng khả biến (list, dict, set) cho phép chỉnh sửa nội dung bên trong trực tiếp tại chỗ.',
    'Phép gán L1 = 24 chuyển hướng con trỏ biến, không ảnh hưởng tới đối tượng cũ hay các biến khác.',
    'Phép gán L1[0] = 24 thay đổi thành phần bên trong đối tượng được chia sẻ trong bộ nhớ RAM.',
    'Mọi biến cùng tham chiếu tới đối tượng khả biến đó sẽ lập tức nhìn thấy sự thay đổi tại chỗ.',
    'Hiện tượng tác động lan truyền (side effects) là cơ chế mặc định cốt lõi cần phải kiểm soát trong Python.'
  ]
};
