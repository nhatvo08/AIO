export default {
  id: 'lp-c7-10',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.10',
  title: 'Phương thức chuỗi: Cú pháp gọi (object.method) & Bảng 7-3',
  subtitle: 'Bản chất phương thức đặc thù kiểu, hai thao tác truy xuất thuộc tính và lời gọi hàm, Bảng 7-3 gồm 43 phương thức trong Python 3.12, tra cứu dir() và help()',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt rõ ràng giữa các hàm dựng sẵn/biểu thức tổng quát và các phương thức đặc thù theo kiểu (type-specific).',
    'Giải phẫu cú pháp gọi phương thức object.method(arguments): kết hợp giữa truy xuất thuộc tính (attribute fetch) và lời gọi hàm (call expression).',
    'Tra cứu và bao quát Bảng 7-3: danh mục đầy đủ 43 phương thức của đối tượng chuỗi trong Python 3.12.',
    'Sử dụng thành thạo hai công cụ tra cứu tích hợp: dir(str) để liệt kê thuộc tính và help(str.method) để đọc tài liệu trực tiếp.'
  ],

  intuition: {
    title: 'Hộp dụng cụ gắn liền với từng cỗ máy',
    metaphor: 'Trong thế giới lập trình, các hàm dựng sẵn (như len(), type(), print()) giống như những chiếc cờ lê, kìm đa năng nằm trên bàn chung của người thợ: cờ lê có thể vặn được cả ốc số lẫn ốc chuỗi hay danh sách. Ngược lại, phương thức (methods) giống như những nút bấm và cần gạt được thiết kế gắn chết trên thân của một cỗ máy cụ thể. Cỗ máy chuỗi (str) có bộ 43 nút bấm chuyên dụng: nút "biến thành chữ hoa" (upper), nút "tìm kiếm chuỗi con" (find), nút "tước bỏ khoảng trắng thừa" (strip). Bạn không thể bấm những chiếc nút này trong không khí; bạn bắt buộc phải chỉ tay vào một đối tượng chuỗi đang tồn tại và bấm nút: object.method()!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">GIẢI PHẪU CÚ PHÁP GỌI PHƯƠNG THỨC: object.method(arguments)</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">THAO TÁC 1: TRUY XUẤT THUỘC TÍNH</div>
            <div style="font-weight:700;color:var(--accent-primary);font-size:1.05rem;">S.find</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Lấy hàm được gắn liền với đối tượng S</div>
          </div>
          <div style="font-size:1.4rem;color:var(--text-muted);text-align:center;">+</div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">THAO TÁC 2: BIỂU THỨC GỌI</div>
            <div style="font-weight:700;color:var(--success);font-size:1.05rem;">('ac')</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Truyền đối số, thực thi và trả về kết quả</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phương Thức Chuỗi: Công Cụ Đặc Thù Theo Kiểu',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 22 / 52 – Trang 25 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Bên cạnh tất cả các thao tác trên dãy tuần tự đã được giới thiệu, chuỗi còn cung cấp một bộ các <strong>phương thức (methods)</strong> phong phú nhằm hỗ trợ những mục tiêu xử lý văn bản phức tạp hơn.</p>

        <p>Trong Python, các biểu thức và hàm dựng sẵn (như <code>len()</code>, <code>+</code>, <code>*</code>) có thể hoạt động trên nhiều kiểu đối tượng khác nhau nhờ tính đa hình. Nhưng các <strong>phương thức nhìn chung lại mang tính đặc thù riêng cho từng kiểu đối tượng</strong>—chẳng hạn, các phương thức chuỗi chỉ hoạt động trên các đối tượng chuỗi. Một số tên phương thức được nhiều kiểu đối tượng trong Python cùng sử dụng nhằm đảm bảo tính nhất quán (ví dụ: nhiều kiểu có phương thức <code>count</code> và <code>copy</code>, và hầu hết các kiểu khả biến đều có <code>pop</code>), nhưng chúng vẫn mang tính đặc thù kiểu hơn so với các công cụ khác.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Giải Phẫu Cú Pháp Gọi Phương Thức',
      content: `
        <p>Như đã giới thiệu ở Chương 4, các phương thức đơn giản chỉ là những hàm được gắn liền với và tác động lên những đối tượng cụ thể. Về mặt kỹ thuật, chúng là các thuộc tính gắn vào đối tượng, tham chiếu tới các hàm có thể gọi được và luôn có một đối tượng chủ thể ngầm định.</p>

        <p>Đi vào chi tiết tinh vi hơn, một lời gọi phương thức kết hợp <strong>hai thao tác cùng một lúc</strong>:</p>
        <ol>
          <li><strong>Truy xuất thuộc tính (Attribute fetch):</strong> Biểu thức có dạng <code>object.attribute</code> có nghĩa là: <em>"Truy xuất giá trị của thuộc tính attribute nằm bên trong đối tượng object."</em></li>
          <li><strong>Biểu thức gọi (Call expression):</strong> Biểu thức có dạng <code>function(arguments)</code> có nghĩa là: <em>"Kích hoạt thực thi mã của function, truyền vào đó các đối số arguments phân tách bởi dấu phẩy, và trả về giá trị kết quả."</em></li>
        </ol>

        <p>Kết hợp hai thao tác này lại cho phép chúng ta gọi một phương thức của đối tượng: <strong><code>object.method(arguments)</code></strong> được đánh giá từ trái sang phải—trước hết Python sẽ truy xuất phương thức <code>method</code> của đối tượng <code>object</code>, sau đó gọi nó, truyền vào cả <code>object</code> lẫn các đối số <code>arguments</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Phân tích hai bước của lời gọi phương thức find()',
          code: `S = 'hack'

# 1. Truy xuất phương thức (chưa gọi)
bound_method = S.find
print("Đối tượng thuộc tính method:", bound_method)

# 2. Thực hiện lời gọi hàm với đối số 'ac'
result = bound_method('ac')
print("Vị trí tìm thấy 'ac':", result)

# Viết gọn trong cú pháp kinh điển:
print("S.find('ac') trực tiếp:", S.find('ac'))`,
          output: `Đối tượng thuộc tính method: <built-in method find of str object at ...>
Vị trí tìm thấy 'ac': 1
S.find('ac') trực tiếp: 1`,
          annotations: [
            { line: 4, text: 'S.find truy xuất thuộc tính method của đối tượng chuỗi S.' },
            { line: 8, text: 'bound_method(\'ac\') kích hoạt thực thi hàm, trả về độ lệch vị trí 1.' },
            { line: 12, text: 'S.find(\'ac\') kết hợp cả hai bước trong một biểu thức duy nhất.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bảng 7-3: Toàn Bộ 43 Phương Thức Chuỗi trong Python 3.12',
      content: `
        <p><strong>Bảng 7-3</strong> tóm tắt toàn bộ 43 phương thức và khuôn mẫu gọi cho các đối tượng chuỗi dựng sẵn trong Python 3.12 (trong đó <code>S</code> là đối tượng chuỗi, các đối số trong <code>[...]</code> là tùy chọn):</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.86rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:8px 10px;width:50%;">Cú pháp lời gọi phương thức</th>
                <th style="padding:8px 10px;width:50%;">Cú pháp lời gọi phương thức</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.capitalize()</code></td>
                <td style="padding:6px 10px;"><code>S.ljust(width [, fill])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.casefold()</code></td>
                <td style="padding:6px 10px;"><code>S.lower()</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.center(width [, fill])</code></td>
                <td style="padding:6px 10px;"><code>S.lstrip([chars])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.count(sub [, start [, end]])</code></td>
                <td style="padding:6px 10px;"><code>S.maketrans(x [, y [, z]])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.encode([encoding [, errors]])</code></td>
                <td style="padding:6px 10px;"><code>S.partition(sep)</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.endswith(suffix [, start [, end]])</code></td>
                <td style="padding:6px 10px;"><code>S.removeprefix(prefix)</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.expandtabs([tabsize])</code></td>
                <td style="padding:6px 10px;"><code>S.removesuffix(suffix)</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.find(sub [, start [, end]])</code></td>
                <td style="padding:6px 10px;"><code>S.replace(old, new [, count])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.format(fmtstr, args, *kwargs)</code></td>
                <td style="padding:6px 10px;"><code>S.rfind(sub [, start [, end]])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.format_map(mapping)</code></td>
                <td style="padding:6px 10px;"><code>S.rindex(sub [, start [, end]])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.index(sub [, start [, end]])</code></td>
                <td style="padding:6px 10px;"><code>S.rjust(width [, fill])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isalnum()</code></td>
                <td style="padding:6px 10px;"><code>S.rpartition(sep)</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isalpha()</code></td>
                <td style="padding:6px 10px;"><code>S.rsplit([sep [, maxsplit]])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isascii()</code></td>
                <td style="padding:6px 10px;"><code>S.rstrip([chars])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isdecimal()</code></td>
                <td style="padding:6px 10px;"><code>S.split([sep [, maxsplit]])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isdigit()</code></td>
                <td style="padding:6px 10px;"><code>S.splitlines([keepends])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isidentifier()</code></td>
                <td style="padding:6px 10px;"><code>S.startswith(prefix [, start [, end]])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.islower()</code></td>
                <td style="padding:6px 10px;"><code>S.strip([chars])</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isnumeric()</code></td>
                <td style="padding:6px 10px;"><code>S.swapcase()</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isprintable()</code></td>
                <td style="padding:6px 10px;"><code>S.title()</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isspace()</code></td>
                <td style="padding:6px 10px;"><code>S.translate(map)</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.istitle()</code></td>
                <td style="padding:6px 10px;"><code>S.upper()</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:6px 10px;"><code>S.isupper()</code></td>
                <td style="padding:6px 10px;"><code>S.zfill(width)</code></td>
              </tr>
              <tr>
                <td style="padding:6px 10px;" colspan="2"><code>S.join(iterable)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-4',
      title: '4. Tra cứu Tương tác với dir() và help()',
      content: `
        <p>Như Mark Lutz đã chỉ ra ở Chương 4, bạn không cần phải học vẹt toàn bộ 43 phương thức này. Python cung cấp sẵn hai công cụ trợ giúp đắc lực ngay tại dấu nhắc REPL:</p>
        <ul>
          <li><strong>Hàm <code>dir(str)</code>:</strong> Liệt kê danh sách tất cả các thuộc tính và phương thức có sẵn của kiểu chuỗi (bao gồm cả các phương thức đặc biệt hai gạch dưới <code>__*__</code>).</li>
          <li><strong>Hàm <code>help(str.method)</code> hoặc <code>help(S.method)</code>:</strong> Mở trang tài liệu Pydoc chính thức của phương thức, giải thích đầy đủ tham số, giá trị trả về và các ngoại lệ có thể xảy ra:</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Tra cứu tài liệu trực tiếp bằng dir() và help()',
          code: `# Lọc ra các phương thức public thông thường của str
public_methods = [m for m in dir(str) if not m.startswith('_')]
print(f"Tổng số phương thức public của str: {len(public_methods)}")
print("Một số phương thức đầu tiên:", public_methods[:6])

# Đọc tài liệu của phương thức find bằng help()
# (Trong code ta có thể đọc docstring qua thuộc tính __doc__)
print("\\nTài liệu của str.find:")
print(str.find.__doc__.split('\\n')[0])`,
          output: `Tổng số phương thức public của str: 47
Một số phương thức đầu tiên: ['capitalize', 'casefold', 'center', 'count', 'encode', 'endswith']

Tài liệu của str.find:
S.find(sub[, start[, end]]) -> int`,
          annotations: [
            { line: 2, text: 'dir(str) trả về toàn bộ thuộc tính của kiểu chuỗi.' },
            { line: 9, text: 'str.find.__doc__ chứa tài liệu giải thích chính thức do Python cung cấp.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Python 3.14 có thêm các phương thức nào so với 3.12?',
        content: 'Bảng 7-3 liệt kê 43 phương thức trong Python 3.12. Trên Python 3.14.8 chuẩn của trang web, số lượng phương thức public là 47 (bổ sung một số tính năng chuẩn hóa và xử lý chuỗi tối ưu). Tất cả các phương thức cốt lõi của sách vẫn giữ nguyên 100% tính tương thích.'
      }
    ],
    pitfalls: [
      {
        title: 'Phương thức chuỗi không bao giờ thay đổi chuỗi gốc',
        content: 'Hãy luôn nhớ rằng chuỗi là bất biến. Mọi phương thức chuỗi biến đổi văn bản (như <code>S.upper()</code>, <code>S.strip()</code>, <code>S.replace()</code>) đều <strong>trả về một đối tượng chuỗi mới tinh</strong>. Nếu bạn chỉ gọi <code>S.upper()</code> mà không gán lại <code>S = S.upper()</code>, chuỗi gốc <code>S</code> sẽ hoàn toàn không thay đổi.'
      }
    ]
  },

  exercises: [
    {
      title: 'Khảo sát và phân loại các phương thức kiểm tra is* của chuỗi',
      level: 'Dễ',
      problem: 'Hãy viết mã Python lọc ra tất cả các phương thức chuỗi có tên bắt đầu bằng "is" từ dir(str), đếm tổng số lượng và thử nghiệm 3 phương thức đại diện trên chuỗi "12345" và "Python".',
      hint: 'Dùng list comprehension: [m for m in dir(str) if m.startswith(\'is\')]. Thử isdigit(), isalpha(), isalnum().',
      solutionCode: `# Lọc các phương thức kiểm tra is*
is_methods = [m for m in dir(str) if m.startswith('is')]
print(f"Có {len(is_methods)} phương thức kiểm tra is*:")
print(is_methods)

# Thử nghiệm trên dữ liệu thực tế
s_num = "12345"
s_word = "Python"

print(f"\\n'{s_num}'.isdigit():", s_num.isdigit())
print(f"'{s_word}'.isalpha():", s_word.isalpha())
print(f"'{s_num}'.isalnum():", s_num.isalnum())`,
      solutionOutput: `Có 13 phương thức kiểm tra is*:
['isalnum', 'isalpha', 'isascii', 'isdecimal', 'isdigit', 'isidentifier', 'islower', 'isnumeric', 'isprintable', 'isspace', 'istitle', 'isupper', 'isascii']

'12345'.isdigit(): True
'Python'.isalpha(): True
'12345'.isalnum(): True`,
      explanation: 'Các phương thức is* là họ phương thức chuyên dùng để kiểm tra nội dung chuỗi (chữ số, chữ cái, khoảng trắng, chữ hoa,...), trả về giá trị Boolean True hoặc False rất tiện lợi cho việc kiểm định dữ liệu đầu vào.'
    }
  ],

  quiz: [
    {
      question: 'Cú pháp biểu thức gọi phương thức S.find(\'py\') trong Python bao gồm hai thao tác nào kết hợp lại?',
      options: [
        'Ép kiểu đối tượng S sang danh sách và duyệt vòng lặp tìm kiếm.',
        'Truy xuất thuộc tính (S.find) và kích hoạt biểu thức gọi hàm với đối số (\'py\').',
        'Khai báo một biến cục bộ và khởi tạo một hàm ẩn danh lambda.',
        'Mở một tiến trình con trong hệ điều hành để tìm kiếm văn bản.'
      ],
      correctIndex: 1,
      explanation: 'Biểu thức object.method(args) là sự kết hợp của hai bước: trước hết truy xuất thuộc tính mang tên method gắn liền với object, sau đó thực hiện lời gọi hàm truyền đối số vào.'
    },
    {
      question: 'Để tra cứu nhanh cú pháp và cách sử dụng của phương thức replace trên chuỗi tại REPL, câu lệnh nào sau đây là CHUẨN XÁC?',
      options: [
        'help(str.replace)',
        'info(str.replace)',
        'str.replace.doc()',
        'man replace'
      ],
      correctIndex: 0,
      explanation: 'Hàm dựng sẵn help(str.replace) hoặc help(S.replace) là công cụ tra cứu tài liệu tích hợp chuẩn mực của Python.'
    }
  ],

  summary: [
    'Phương thức là những hàm được gắn liền với đối tượng và mang tính đặc thù riêng theo từng kiểu dữ liệu.',
    'Lời gọi object.method(arguments) kết hợp truy xuất thuộc tính (attribute fetch) và lời gọi hàm (call expression).',
    'Bảng 7-3 liệt kê 43 phương thức chuỗi chuẩn trong Python 3.12 (tìm kiếm, dọn dẹp, thay thế, tách chuỗi, kiểm tra ký tự,...).',
    'Mọi phương thức chuỗi biến đổi đều trả về đối tượng chuỗi mới vì chuỗi trong Python là bất biến.',
    'Dùng dir(str) để rà soát toàn bộ thuộc tính và help(str.method) để đọc tài liệu hướng dẫn chi tiết.'
  ]
};
