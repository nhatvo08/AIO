export default {
  id: 'lp-c6-14',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.14',
  title: 'Khung chuyên đề Nâng cao: Tham chiếu Yếu & Module weakref',
  subtitle: 'Công cụ quản lý bộ nhớ chuyên sâu: tham chiếu không cản trở thu gom rác và ứng dụng xây dựng bộ đệm thông minh',
  level: 'Nâng cao',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu định nghĩa và bản chất của "Tham chiếu yếu" (Weak Reference) trong Python: không phải sự kém cỏi mà là công cụ chuyên sâu.',
    'Nắm vững cơ chế vận hành của module weakref: cho phép tham chiếu tới đối tượng mà không làm tăng bộ đếm tham chiếu giữ đối tượng tồn tại.',
    'Phân tích ứng dụng kinh điển của weakref trong các hệ thống bộ nhớ đệm (cache) không thiết yếu và cơ chế callback.',
    'Nhận biết các kiểu đối tượng có thể tạo tham chiếu yếu và khả năng mở rộng thông qua lập trình hướng đối tượng (OOP).'
  ],

  intuition: {
    title: 'Sợi dây chỉ mỏng manh so với sợi dây thừng',
    metaphor: 'Nếu như một tham chiếu thông thường giống như một sợi dây thừng chắc chắn buộc chặt chiếc thuyền vào bến cảng (ngăn cản không cho chiếc thuyền bị nước cuốn trôi - ngăn cản thu gom rác), thì một "tham chiếu yếu" (weak reference) giống như một sợi chỉ tơ mỏng manh chỉ dùng để báo vị trí của chiếc thuyền. Miễn là chiếc thuyền còn đang được buộc bởi ít nhất một sợi dây thừng chính ở nơi khác, bạn có thể nhìn theo sợi chỉ tơ để biết thuyền đang neo ở đâu. Nhưng ngay khi người ta tháo sợi dây thừng chính cuối cùng ra, chiếc thuyền lập tức trôi đi và biến mất khỏi cảng. Sợi chỉ tơ sẽ tự động đứt lìa (trả về None), báo cho bạn biết chiếc thuyền không còn ở đó nữa mà không hề gây cản trở chiếc thuyền rời đi.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH: THAM CHIẾU MẠNH (STRONG) VS THAM CHIẾU YẾU (WEAK)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <!-- Tham chiếu Mạnh -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--text-primary);margin-bottom:6px;">1. Tham chiếu Mạnh (Strong Reference)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>b = a</code><br>
              • Tăng <code>ob_refcnt</code> lên 1.<br>
              • Giữ đối tượng tồn tại trong RAM.<br>
              • Đối tượng không thể bị thu gom rác chừng nào tham chiếu này còn tồn tại.
            </div>
          </div>
          <!-- Tham chiếu Yếu -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">2. Tham chiếu Yếu (Weak Reference)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>r = weakref.ref(a)</code><br>
              • <strong style="color:var(--success);">Không tăng refcount!</strong><br>
              • Khi hết tham chiếu mạnh, đối tượng bị giải phóng ngay.<br>
              • Lúc này gọi <code>r()</code> sẽ trả về <code>None</code>.
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Tham chiếu Yếu (Weak Reference) là gì?',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 17 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Đôi khi bạn có thể bắt gặp thuật ngữ <strong>"tham chiếu yếu" (weak reference)</strong> trong thế giới Python. Không, thuật ngữ này hoàn toàn không phải là một đánh giá mang tính hạ thấp về sự kém cỏi. Nó dùng để chỉ một công cụ nâng cao và có phần hơi chuyên sâu, vốn có mối liên hệ mật thiết với mô hình tham chiếu mà chúng ta vừa khám phá ở đây, và cũng giống như toán tử <code>is</code>, ta không thể nào thực sự hiểu thấu được nó nếu thiếu đi nền tảng mô hình này.</p>

        <p>Tóm lại, một tham chiếu yếu, được hiện thực hóa thông qua <strong>module thư viện chuẩn <code>weakref</code></strong>, là một tham chiếu trỏ tới đối tượng mà <strong>bản thân nó không hề ngăn cản đối tượng đó bị bộ thu gom rác giải phóng bộ nhớ</strong>.</p>

        <p>Nếu tất cả các tham chiếu còn lại trỏ tới đối tượng chỉ toàn là các tham chiếu yếu, đối tượng đó hoàn toàn có thể bị thu hồi ngay lập tức. Khi điều này diễn ra, các tham chiếu yếu trỏ tới nó sẽ nhận được thông báo rằng đối tượng không còn tồn tại nữa (khi gọi giải tham chiếu sẽ trả về <code>None</code>) và có thể phản hồi tương ứng tùy theo nhu cầu.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Ứng dụng Thực tế: Xây dựng Bộ nhớ Đệm (Cache) Không Rò rỉ',
      content: `
        <p>Để lấy một ví dụ điển hình về tính hữu dụng của nó: <strong>tham chiếu yếu rất có giá trị trong các bộ nhớ đệm (cache) không thiết yếu chứa các đối tượng lớn</strong> vốn được sử dụng chủ yếu ở những nơi khác trong chương trình.</p>

        <p>Hãy phân tích bài toán này:</p>
        <ul>
          <li>Nếu một bộ đệm như vậy sử dụng các <em>tham chiếu thông thường (tham chiếu mạnh)</em>, thì chỉ riêng các tham chiếu của bộ đệm thôi cũng đủ giữ cho các đối tượng lớn đó tồn tại vĩnh viễn trong bộ nhớ RAM và không bao giờ được giải phóng, gây lãng phí tài nguyên nghiêm trọng!</li>
          <li>Bằng cách sử dụng <em>tham chiếu yếu</em>, không gian bộ nhớ của đối tượng có thể được thu hồi tự động ngay khi nó không còn cần thiết cho vai trò chính của mình nữa (khi các biến xử lý nghiệp vụ chính bị xóa).</li>
          <li>Đồng thời, bộ đệm sẽ được thông báo về sự kết thúc của đối tượng, hoặc ở lần truy xuất tiếp theo hoặc thông qua một <strong>hàm gọi lại (callback)</strong> đăng ký trước.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm cơ chế hoạt động của module weakref',
          code: `import weakref

class DuLieuLon:
    def __init__(self, ten):
        self.ten = ten

# 1. Tạo đối tượng và giữ bằng một tham chiếu mạnh
obj = DuLieuLon("Bản đồ đồ thị 500MB")

# 2. Tạo một tham chiếu yếu trỏ tới đối tượng đó
ref_yeu = weakref.ref(obj)

print("Khi còn tham chiếu mạnh:", ref_yeu())
print("Tên đối tượng qua tham chiếu yếu:", ref_yeu().ten)

# 3. Xóa tham chiếu mạnh duy nhất
del obj

# 4. Kiểm tra lại qua tham chiếu yếu
print("Sau khi tham chiếu mạnh bị xóa:", ref_yeu())`,
          output: `Khi còn tham chiếu mạnh: <__main__.DuLieuLon object at 0x...>
Tên đối tượng qua tham chiếu yếu: Bản đồ đồ thị 500MB
Sau khi tham chiếu mạnh bị xóa: None`,
          annotations: [
            { line: 7, text: 'Tạo đối tượng với tham chiếu mạnh qua biến obj.' },
            { line: 10, text: 'weakref.ref(obj) tạo tham chiếu yếu; refcount của đối tượng không hề bị tăng.' },
            { line: 16, text: 'Lệnh del obj làm refcount giảm về 0 -> đối tượng bị thu hồi khỏi RAM ngay lập tức!' },
            { line: 19, text: 'Gọi ref_yeu() trả về None xác nhận đối tượng đã bị giải phóng an toàn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Đối tượng Hỗ trợ và Khả năng Mở rộng qua OOP',
      content: `
        <p>Không phải mọi kiểu đối tượng dựng sẵn đều có thể được tạo tham chiếu yếu (chẳng hạn các kiểu nguyên thủy cơ bản như <code>int</code>, <code>str</code>, <code>list</code> và <code>dict</code> mặc định không hỗ trợ trực tiếp <code>weakref</code> vì lý do tối ưu hóa cấu trúc C bên dưới).</p>

        <p>Dẫu vậy, khả năng hỗ trợ có thể được bổ sung cho các đối tượng thông qua <strong>các kỹ thuật lập trình hướng đối tượng (OOP)</strong> bằng câu lệnh <code>class</code> mà chúng ta sẽ tìm hiểu ở phần sau của cuốn sách (các lớp do người dùng tự định nghĩa mặc định đều hỗ trợ tham chiếu yếu trừ khi hạn chế bằng <code>__slots__</code>).</p>

        <p>Như vậy, đây thực chất chỉ là một phần mở rộng trường hợp đặc biệt cho mô hình tham chiếu mà chúng ta đã làm quen xuyên suốt chương này. Để biết thêm thông tin chi tiết về tham chiếu yếu, hãy tham khảo phần tài liệu hướng dẫn thư viện của Python về module <code>weakref</code>—một công cụ rất hữu ích, dù mang một cái tên có phần hơi "kém may mắn"!</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    deepDive: [
      {
        title: 'Lớp tiện ích weakref.WeakValueDictionary',
        content: 'Thư viện chuẩn Python cung cấp sẵn lớp <code>weakref.WeakValueDictionary</code>. Đây là một cuốn từ điển đặc biệt: khi một đối tượng giá trị không còn bất kỳ tham chiếu mạnh nào khác trong toàn bộ chương trình, khóa và giá trị tương ứng sẽ tự động biến mất khỏi từ điển mà không cần bạn phải viết mã dọn dẹp thủ công.'
      }
    ]
  },

  exercises: [
    {
      level: 'Khó',
      title: 'Sử dụng callback trong weakref để nhận thông báo hủy đối tượng',
      problem: 'Hãy sử dụng cú pháp <code>weakref.ref(obj, callback)</code> để đăng ký một hàm callback in ra thông báo khi đối tượng <code>obj</code> bị bộ thu gom rác giải phóng.',
      hint: 'Hàm callback nhận tham số duy nhất chính là đối tượng weak reference vừa hết hạn.',
      solutionCode: `import weakref

class TaiNguyen:
    def __init__(self, ma_so):
        self.ma_so = ma_so

def thong_bao_huy(ref):
    print(f"--> [HỆ THỐNG]: Đối tượng đã bị thu hồi bộ nhớ hoàn toàn!")

# Khởi tạo đối tượng và đăng ký callback
res = TaiNguyen("RES_001")
w_ref = weakref.ref(res, thong_bao_huy)

print("Đang giữ tài nguyên...")
del res  # Xóa tham chiếu mạnh, kích hoạt callback ngay tức khắc!`,
      solutionOutput: `Đang giữ tài nguyên...
--> [HỆ THỐNG]: Đối tượng đã bị thu hồi bộ nhớ hoàn toàn!`,
      explanation: 'Khi biến res bị xóa bằng lệnh del, số đếm tham chiếu mạnh giảm về 0, kích hoạt thu gom rác tức thì và gọi hàm callback thong_bao_huy để hệ thống biết tài nguyên đã được giải phóng.'
    }
  ],

  quiz: [
    {
      question: 'Đặc điểm then chốt nhất của một "tham chiếu yếu" (weak reference) trong Python là gì?',
      options: [
        'Chỉ có thể tồn tại trong vòng 5 giây trước khi bị hệ điều hành xóa.',
        'Không cản trở việc bộ thu gom rác tự động giải phóng đối tượng khi không còn tham chiếu mạnh nào.',
        'Chỉ có thể trỏ vào các tệp tin lưu trên đĩa cứng.',
        'Luôn luôn trả về số nguyên 0 khi truy cập giá trị.'
      ],
      correctIndex: 1,
      explanation: 'Điểm cốt tử của tham chiếu yếu là nó không làm tăng bộ đếm tham chiếu giữ đối tượng; nếu chỉ còn tham chiếu yếu trỏ tới, đối tượng vẫn được thu hồi bình thường và tham chiếu yếu sẽ tự động trả về None.'
    },
    {
      question: 'Ứng dụng thực tế phổ biến nhất của module weakref là gì?',
      options: [
        'Dùng để mã hóa mật khẩu người dùng.',
        'Xây dựng các bộ nhớ đệm (cache) không thiết yếu để tránh gây rò rỉ bộ nhớ.',
        'Dùng để kết nối Internet với máy chủ từ xa.',
        'Tăng tốc độ thực hiện phép toán cộng trừ số nguyên.'
      ],
      correctIndex: 1,
      explanation: 'Tham chiếu yếu được sử dụng phổ biến nhất để xây dựng các bộ nhớ đệm (cache): khi ứng dụng chính không còn dùng đối tượng lớn, cache sẽ tự động giải phóng đối tượng thay vì giữ nó tồn tại vĩnh viễn trong RAM.'
    }
  ],

  summary: [
    'Tham chiếu yếu (weak reference) được hiện thực hóa qua module thư viện chuẩn weakref.',
    'Bản thân tham chiếu yếu không ngăn cản bộ thu gom rác giải phóng đối tượng.',
    'Khi đối tượng bị giải phóng, gọi tham chiếu yếu sẽ an toàn trả về giá trị None.',
    'Ứng dụng then chốt trong xây dựng bộ đệm (cache) tự dọn dẹp và cơ chế thông báo callback.',
    'Các lớp hướng đối tượng do người dùng tự định nghĩa mặc định hỗ trợ tạo tham chiếu yếu.'
  ]
};
