export default {
  id: 'lp-c7-21',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.21',
  title: 'Phân loại kiểu dữ liệu tổng quát (Số, Dãy, Ánh xạ) & Ràng buộc Khả biến / Bất biến',
  subtitle: 'Ba phân loại kiểu dữ liệu cốt lõi (Số, Dãy tuần tự, Ánh xạ), tính đa hình qua tập thao tác chung (+, *, chỉ mục), và ranh giới bất biến (chuỗi, số, tuple) vs khả biến (list, dict, set)',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững ba phân loại kiểu dữ liệu (type categories) cốt lõi của Python: Số (Numbers), Dãy tuần tự (Sequences), và Ánh xạ (Mappings).',
    'Hiểu nguyên lý chia sẻ tập hợp thao tác: mọi dãy tuần tự (chuỗi, list, tuple) đều đáp ứng cùng các thao tác +, *, len(), chỉ mục, cắt lát và phép lặp.',
    'Nhận biết tính đa hình (polymorphism): kiểu của toán hạng quyết định kiểu của kết quả trả về (nối chuỗi ra chuỗi mới, nối list ra list mới).',
    'Phân định ranh giới then chốt giữa Kiểu Khả Biến (thay đổi tại chỗ) và Kiểu Bất Biến (bảo đảm toàn vẹn tham chiếu chia sẻ).'
  ],

  intuition: {
    title: 'Ba họ gia tộc và quy tắc bất di bất dịch của vật liệu',
    metaphor: 'Trong vương quốc Python, hàng chục kiểu dữ liệu thoạt nhìn có vẻ xa lạ nhưng thực chất đều thuộc về ba "đại gia tộc": Gia tộc Số (chuyên tính toán số học), Gia tộc Dãy tuần tự (chuyên xếp hàng trật tự từ trước ra sau), và Gia tộc Ánh xạ (chuyên tra cứu theo bảng nhãn tên). Nếu bạn đã học cách cắt lát hay đếm độ dài một chuỗi ký tự, bạn đã tự động làm chủ luôn kỹ năng đó cho danh sách và tuple! Nhưng hãy cẩn thận với tính chất vật liệu: kiểu bất biến giống như đá tạc vĩnh cửu — muốn đổi bạn phải tạc bức tượng mới; còn kiểu khả biến giống như đất nặn — bạn có thể nắn bóp, thêm bớt chi tiết trực tiếp tại chỗ mà không cần đổi viên đất khác!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢN ĐỒ PHÂN LOẠI KIỂU DỮ LIỆU TỔNG QUÁT TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:4px;">1. Số (Numbers)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              • int, float, decimal, fraction<br>
              • Thao tác: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>**</code><br>
              • Đặc tính: Bất biến (Immutable)
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">2. Dãy Tuần Tự (Sequences)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              • str, list, tuple, bytes<br>
              • Thao tác: <code>+</code>, <code>*</code>, <code>[i]</code>, <code>[:]</code>, <code>len</code><br>
              • Bất biến: str, tuple, bytes<br>
              • Khả biến: list
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:4px;">3. Ánh Xạ (Mappings)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              • dict (từ điển)<br>
              • Thao tác: <code>[key]</code>, <code>keys()</code>, <code>items()</code><br>
              • Đặc tính: Khả biến (Mutable)
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Các Kiểu Dữ Liệu Chia Sẻ Tập Hợp Thao Tác Theo Phân Loại',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 49 / 52 – Trang 50 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Giờ đây khi chúng ta đã khám phá đối tượng tập hợp đầu tiên của Python là chuỗi, chúng ta hãy khép lại chương này bằng việc định nghĩa một vài <strong>khái niệm kiểu dữ liệu tổng quát</strong> sẽ áp dụng cho hầu hết các kiểu mà chúng ta tìm hiểu từ đây trở đi.</p>

        <p>Đối với các kiểu dữ liệu dựng sẵn, hóa ra các thao tác hoạt động hoàn toàn giống nhau cho tất cả các kiểu trong cùng một phân loại, vì vậy chúng ta sẽ chỉ cần định nghĩa hầu hết những ý niệm này <strong>một lần duy nhất</strong>. Có ba phân loại kiểu dữ liệu chính trong Python:</p>
        <ol>
          <li><strong>Số (Numbers):</strong> Gồm <code>int</code>, <code>float</code>, <code>decimal</code>, <code>fraction</code>... Hỗ trợ phép cộng, phép nhân, làm tròn, v.v.</li>
          <li><strong>Dãy tuần tự (Sequences):</strong> Gồm <code>str</code>, <code>list</code>, <code>tuple</code>, <code>bytes</code>... Là các tập hợp có thứ tự theo vị trí được truy cập bằng độ lệch vị trí. Hỗ trợ chỉ mục, cắt lát slice, phép nối, phép lặp, kiểm tra quan hệ thành viên <code>in</code>.</li>
          <li><strong>Ánh xạ (Mappings):</strong> Gồm <code>dict</code> (từ điển)... Không sắp xếp theo vị trí số nguyên mà lưu trữ các cặp khóa-giá trị, hỗ trợ truy cập bằng khóa.</li>
        </ol>

        <p><em>(Ghi chú: Tập hợp <code>set</code> là phân loại riêng biệt; chuỗi byte nằm dưới nhãn "chuỗi" chung).</em></p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bản Chất Đa Hình Của Thao Tác Dãy Tuần Tự',
      content: `
        <p>Tất cả các dãy tuần tự mà chúng ta sẽ học đều đáp ứng cùng các thao tác được trình bày trong chương này khi áp dụng cho chuỗi. Chẳng hạn, đối với bất kỳ đối tượng dãy tuần tự <code>X</code> và <code>Y</code> nào:</p>
        <ul>
          <li><strong><code>X + Y</code>:</strong> Luôn tạo ra một <em>đối tượng dãy tuần tự mới</em> với nội dung của cả hai toán hạng được ghép nối lại.</li>
          <li><strong><code>X * N</code>:</strong> Luôn tạo ra một <em>đối tượng dãy tuần tự mới</em> lặp lại <code>N</code> lần toán hạng <code>X</code>.</li>
          <li><strong><code>X[i]</code> và <code>X[i:j]</code>:</strong> Luôn trích xuất phần tử tại vị trí <code>i</code> hoặc một phân đoạn tuần tự từ <code>i</code> đến <code>j-1</code>.</li>
        </ul>

        <p><strong>Tính đa hình (Polymorphism):</strong> Sự khác biệt duy nhất là <em>đối tượng kết quả mới mà bạn nhận lại luôn có cùng kiểu với các toán hạng <code>X</code> và <code>Y</code></em>. Nếu bạn nối hai chuỗi, bạn nhận lại một chuỗi mới; nếu bạn nối hai danh sách (list), bạn nhận lại một danh sách mới; nếu bạn cắt lát một tuple, bạn nhận lại một tuple mới!</p>
      `,
      codeExamples: [
        {
          title: 'Tính đa hình của toán tử + và * trên các dãy tuần tự khác nhau',
          code: `# 1. Phép toán trên chuỗi str (chuỗi ra chuỗi mới)
s1, s2 = 'abc', 'def'
print("str +:", s1 + s2, type(s1 + s2))
print("str *:", s1 * 2, type(s1 * 2))

# 2. Phép toán trên danh sách list (list ra list mới)
l1, l2 = [1, 2], [3, 4]
print("list +:", l1 + l2, type(l1 + l2))
print("list *:", l1 * 2, type(l1 * 2))

# 3. Phép toán trên tuple (tuple ra tuple mới)
t1, t2 = (10,), (20, 30)
print("tuple +:", t1 + t2, type(t1 + t2))
print("tuple *:", t1 * 2, type(t1 * 2))`,
          output: `str +: abcdef <class 'str'>
str *: abcabc <class 'str'>
list +: [1, 2, 3, 4] <class 'list'>
list *: [1, 2, 1, 2] <class 'list'>
tuple +: (10, 20, 30) <class 'tuple'>
tuple *: (10, 20, 30, 10, 20, 30) <class 'tuple'>`,
          annotations: [
            { line: 3, text: 'Phép nối trên str trả về đối tượng chuỗi mới.' },
            { line: 8, text: 'Phép nối trên list trả về đối tượng list mới.' },
            { line: 13, text: 'Phép lặp trên tuple trả về đối tượng tuple mới.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ranh Giới Then Chốt: Kiểu Bất Biến vs Kiểu Khả Biến',
      content: `
        <p>Việc phân loại chuỗi là <strong>bất biến (immutable)</strong> là một ràng buộc quan trọng cần phải lưu ý, nhưng nó thường khiến những người dùng mới bỡ ngỡ. Các kiểu dữ liệu cốt lõi chính trong Python được phân chia rạch ròi thành hai nhóm:</p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:16px 0;">
          <div style="padding:14px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Các Kiểu Bất Biến (Immutable)</div>
            <div style="font-size:0.86rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Bao gồm:</strong> Số (int, float), Chuỗi (str), Tuple, Frozenset, Bytes.<br><br>
              Không hỗ trợ thay đổi tại chỗ. Mọi thay đổi đều bắt buộc phải chạy biểu thức để tạo ra một đối tượng mới hoàn toàn.<br>
              <em style="color:var(--accent-primary);">Lợi ích: Đảm bảo tính toàn vẹn tuyệt đối, an toàn trước các tham chiếu chia sẻ (Chương 6).</em>
            </div>
          </div>
          <div style="padding:14px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Các Kiểu Khả Biến (Mutable)</div>
            <div style="font-size:0.86rem;color:var(--text-secondary);line-height:1.6;">
              <strong>Bao gồm:</strong> Danh sách (list), Từ điển (dict), Tập hợp (set), Bytearray.<br><br>
              Luôn có thể thay đổi tại chỗ bằng các phương thức như <code>append()</code>, <code>extend()</code>, gán chỉ mục <code>L[0] = ...</code> mà không tạo đối tượng mới.<br>
              <em style="color:var(--success);">Lợi ích: Hiệu năng cao khi cập nhật tập dữ liệu lớn, tránh sao chép lãng phí bộ nhớ.</em>
            </div>
          </div>
        </div>

        <p>Hiểu sâu sắc sự phân đôi này chính là chìa khóa để bạn bước sang Chương 8 tìm hiểu hai cấu trúc tập hợp tổng quát nhất: <strong>Danh sách (list)</strong> và <strong>Từ điển (dict)</strong>.</p>
      `,
      codeExamples: [
        {
          title: 'Đối chiếu hành vi gán chỉ mục: Bất biến (báo lỗi) vs Khả biến (đổi tại chỗ)',
          code: `# 1. Chuỗi (bất biến): Gán chỉ mục trực tiếp bị cấm tuyệt đối
s = 'spam'
try:
    s[0] = 'x'
except TypeError as err:
    print("Lỗi chuỗi bất biến:", err)

# 2. Danh sách (khả biến): Gán chỉ mục trực tiếp thay đổi tại chỗ
L = ['s', 'p', 'a', 'm']
L[0] = 'x'
print("Danh sách sau khi sửa tại chỗ:", L)`,
          output: `Lỗi chuỗi bất biến: 'str' object does not support item assignment
Danh sách sau khi sửa tại chỗ: ['x', 'p', 'a', 'm']`,
          annotations: [
            { line: 4, text: 's[0] = \'x\' ném TypeError vì str là immutable.' },
            { line: 10, text: 'L[0] = \'x\' cập nhật trực tiếp ô nhớ của phần tử đầu tiên mà không tạo list mới.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Bất Biến Bảo Vệ Khóa Từ Điển',
      content: `Tại sao chuỗi lại là kiểu khóa từ điển phổ biến nhất trong Python? Bởi vì tính bất biến đảm bảo rằng giá trị băm (hash) của chuỗi sẽ không bao giờ bị thay đổi ngầm sau khi đã được chèn vào từ điển. Nếu cho phép dùng một đối tượng khả biến như list làm khóa, từ điển sẽ bị hỏng bảng băm ngay khi list đó bị sửa!`
      }
    ],
    pitfalls: [
      {
      title: 'Nhầm Lẫn Giữa Gán Biến Mới Và Sửa Đối Tượng',
      content: `Khi bạn viết s = 'spam'; s = s + '!', bạn không hề sửa đổi chuỗi 'spam'. Bạn vừa tạo ra chuỗi mới 'spam!' và chuyển con trỏ biến s sang đối tượng mới này. Chuỗi gốc 'spam' trong bộ nhớ hoàn toàn không đổi (và có thể bị thu gom rác nếu không còn ai tham chiếu).`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Phân loại tính khả biến và kiểm chứng tính đa hình',
      question: 'Cho ba đối tượng: a = "code", b = [1, 2, 3], c = (4, 5). Hãy viết mã để kiểm tra kiểu dữ liệu của kết quả khi áp dụng toán tử lặp * 2 trên cả ba đối tượng. Đối tượng nào trong ba đối tượng trên cho phép gán trực tiếp phần tử thứ 0?',
      starterCode: `a = "code"
b = [1, 2, 3]
c = (4, 5)

# Kiểm tra kiểu của a * 2, b * 2, c * 2:
# ...

# Xác định đối tượng khả biến và thực hiện sửa phần tử thứ 0:
# ...
`,
      solution: `a = "code"
b = [1, 2, 3]
c = (4, 5)

print("Kiểu của a * 2:", type(a * 2))
print("Kiểu của b * 2:", type(b * 2))
print("Kiểu của c * 2:", type(c * 2))

# Chỉ có b (list) là khả biến:
b[0] = 99
print("b sau khi gán b[0] = 99:", b)`,
      hints: [
        'Dùng type(x * 2) để in kiểu kết quả.',
        'Chỉ có list là kiểu khả biến (mutable), hỗ trợ gán b[0] = 99.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Phân loại nào sau đây KHÔNG thuộc ba phân loại kiểu dữ liệu chính trong Python?',
      options: [
        'Số (Numbers)',
        'Dãy tuần tự (Sequences)',
        'Ánh xạ (Mappings)',
        'Con trỏ thủ công (Pointers)'
      ],
      correctIndex: 3,
      explanation: 'Python có ba phân loại kiểu chính: Số, Dãy tuần tự, và Ánh xạ. Python không có kiểu con trỏ thủ công cấp thấp.'
    },
    {
      question: 'Tập hợp các kiểu dữ liệu nào dưới đây đều thuộc phân loại BẤT BIẾN (Immutable)?',
      options: [
        'int, str, tuple, frozenset',
        'int, list, dict',
        'str, list, bytearray',
        'set, dict, tuple'
      ],
      correctIndex: 0,
      explanation: 'int, str, tuple và frozenset đều là các kiểu bất biến — không hỗ trợ bất kỳ thao tác sửa đổi nội dung tại chỗ nào.'
    }
  ],

  summary: {
    takeaways: [
      'Python tổ chức các kiểu dữ liệu vào ba phân loại lớn: Số (Numbers), Dãy tuần tự (Sequences), và Ánh xạ (Mappings).',
      'Các thao tác trên dãy tuần tự (+, *, len, slice, in) có tính đa hình: hoạt động giống nhau trên str, list, tuple và trả về kết quả cùng kiểu.',
      'Kiểu bất biến (int, float, str, tuple, bytes) đảm bảo toàn vẹn dữ liệu, chống lại rủi ro tham chiếu chia sẻ.',
      'Kiểu khả biến (list, dict, set, bytearray) cho phép cập nhật trực tiếp tại chỗ, tối ưu cho xử lý dữ liệu động.'
    ],
    nextSteps: 'Trong bài học cuối cùng của Chương 7 (C7.22), chúng ta sẽ tóm tắt lại toàn bộ chương học và vượt qua Bộ 7 Câu hỏi Ôn tập kiểm tra kiến thức kinh điển kèm lời giải chi tiết từ Mark Lutz.'
  }
};
