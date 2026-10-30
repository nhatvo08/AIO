export default {
  id: 'lp-c7-12',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.12',
  title: 'Phân tách văn bản: Slicing trích cột vs split() & Phương thức thông dụng',
  subtitle: 'Phân tách văn bản độ lệch cố định qua slice, phân tách theo dấu phân cách qua split(), định dạng CSV, rstrip/upper/isalpha/endswith, và so sánh với module re',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt hai kỹ thuật phân tách văn bản (text parsing) căn bản: cắt lát theo vị trí cố định và phân tách bằng phương thức split().',
    'Thành thạo phương thức split(sep, maxsplit): phân tách mặc định theo nhóm khoảng trắng và phân tách theo dấu phẩy (CSV) hoặc chuỗi tùy ý.',
    'Sử dụng các phương thức chuỗi chuyên dụng thông dụng: rstrip(), upper(), isalpha(), startswith(), endswith().',
    'Hiểu các kỹ thuật biểu thức tương đương (toán tử in, slice âm) và ưu thế tốc độ vượt trội của phương thức chuỗi so với module re.'
  ],

  intuition: {
    title: 'Thước đo cố định và nhát cắt theo ký hiệu phân giới',
    metaphor: 'Khi bạn cầm một tờ phiếu thanh toán hoặc một bản ghi cơ sở dữ liệu trên tay, làm thế nào để trích xuất từng mẩu thông tin? Nếu văn bản được in theo các cột thẳng tắp (chẳng hạn 10 ký tự đầu là mã sản phẩm, 8 ký tự tiếp theo là đơn giá), bạn chỉ cần dùng một chiếc thước đo cố định (phép cắt lát slice: line[:10] và line[10:18]). Nhưng nếu văn bản có độ dài bất định và được ngăn cách bởi các dấu phẩy hay khoảng trắng (như tệp CSV), bạn cần một chiếc kéo thông minh (phương thức split): cứ gặp dấu phẩy là nó cắt một nhát, chặt nhỏ cả dòng văn bản thành một danh sách các chuỗi con sạch sẽ chỉ trong một thao tác duy nhất!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HAI KỸ THUẬT PHÂN TÁCH VĂN BẢN (TEXT PARSING) CỐT LÕI</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">1. Cắt Lát Độ Lệch Cố Định (Slice)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              Văn bản: <code>'aaa bbb ccc'</code><br>
              <code>col1 = line[:3]</code> ➔ <code>'aaa'</code><br>
              <code>col2 = line[4:8]</code> ➔ <code>'bbb '</code><br>
              <span style="color:var(--accent-primary);">Áp dụng khi biết trước tọa độ cột</span>
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">2. Tách Theo Dấu Phân Cách (split)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              Văn bản: <code>'Python,3.12,33'</code><br>
              <code>line.split(',')</code><br>
              ➔ <code>['Python', '3.12', '33']</code><br>
              <span style="color:var(--success);">Tự động phân tách dù độ dài tùy ý</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phân Tách Văn Bản Cố Định: Kỹ Thuật Cắt Lát (Slicing)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 27 / 52 – Trang 29 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Một vai trò phổ biến khác của các phương thức chuỗi là đóng vai trò như một hình thức <strong>phân tách văn bản (text parsing)</strong> đơn giản—tức là phân tích cấu trúc cú pháp và trích xuất các chuỗi con mong muốn.</p>

        <p>Để trích xuất các chuỗi con tại các <strong>độ lệch vị trí cố định</strong>, chúng ta có thể áp dụng trực tiếp kỹ thuật cắt lát (slice):</p>
      `,
      codeExamples: [
        {
          title: 'Trích xuất các cột dữ liệu theo vị trí cố định bằng slice',
          code: `line = 'aaa bbb ccc'

col1 = line[:3]
col2 = line[4:8]
col3 = line[-3:]

print("col1:", repr(col1))
print("col2:", repr(col2))
print("col3:", repr(col3))
print("Bộ ba cột:", (col1, col2, col3))`,
          output: `col1: 'aaa'
col2: 'bbb '
col3: 'ccc'
Bộ ba cột: ('aaa', 'bbb ', 'ccc')`,
          annotations: [
            { line: 3, text: 'line[:3] trích xuất 3 ký tự đầu tiên (\'aaa\').' },
            { line: 4, text: 'line[4:8] trích xuất cột thứ hai (từ offset 4 đến 7).' },
            { line: 5, text: 'line[-3:] trích xuất 3 ký tự cuối cùng (\'ccc\').' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phân Tách Theo Dấu Phân Cách: Phương Thức split()',
      content: `
        <p>Kỹ thuật cắt lát hoạt động rất tốt khi các thành phần dữ liệu có vị trí cột đã biết trước cố định. Trái lại, nếu dữ liệu có kích thước biến động và được phân chia bởi một loại ký tự phân tách nào đó (như khoảng trắng, dấu phẩy, dấu gạch nối), bạn có thể trích xuất các thành phần của nó bằng <strong>phương thức <code>split()</code></strong>.</p>

        <p>Phương thức <code>split([sep [, maxsplit]])</code> chặt nhỏ một chuỗi thành một <strong>danh sách các chuỗi con</strong>:</p>
        <ul>
          <li><strong>Nếu không truyền ký tự phân tách (mặc định <code>None</code>):</strong> Chuỗi được tách tại các nhóm gồm một hoặc nhiều khoảng trắng liên tiếp (bao gồm dấu cách, dấu tab, và dòng mới <code>\\n</code>). Các khoảng trắng thừa ở đầu và cuối chuỗi cũng tự động được tước bỏ.</li>
          <li><strong>Khi truyền ký tự phân tách cụ thể:</strong> Ví dụ <code>line.split(',')</code> sẽ tách chính xác tại từng dấu phẩy (rất phổ biến trong việc xử lý tệp dữ liệu CSV). Ký tự phân tách cũng có thể dài hơn một ký tự (ví dụ <code>line.split('PY')</code>):</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Phân tách chuỗi với split() mặc định và dấu phân cách tùy ý',
          code: `line = 'aaa   bbb\\t\\n  ccc'

# 1. Tách theo khoảng trắng mặc định (gom nhiều dấu cách/tab/newline)
cols = line.split()
print("split() mặc định:", cols)

# 2. Tách theo dấu phẩy (định dạng CSV)
csv_line = 'Python,3.12,scripting,33'
fields = csv_line.split(',')
print("split(',') CSV:", fields)

# 3. Ký tự phân tách gồm nhiều chữ cái
multi_sep = 'youPYarePYaPYstringPYcoder'
tokens = multi_sep.split('PY')
print("split('PY'):", tokens)`,
          output: `split() mặc định: ['aaa', 'bbb', 'ccc']
split(',') CSV: ['Python', '3.12', 'scripting', '33']
split('PY'): ['you', 'are', 'a', 'string', 'coder']`,
          annotations: [
            { line: 4, text: 'split() tự động gom các dấu cách, tab, newline liên tiếp thành một điểm tách.' },
            { line: 9, text: 'split(\',\') chia nhỏ bản ghi CSV thành 4 chuỗi con gọn gàng.' },
            { line: 14, text: 'Ký tự phân tách chuỗi con có thể là bất kỳ xâu ký tự nào (ở đây là \'PY\').' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Các Phương Thức Chuỗi Chuyên Dụng Thông Dụng Khác',
      content: `
        <p>Các phương thức chuỗi khác có mục đích xử lý chuyên biệt hơn rất thường xuyên được sử dụng trong lập trình:</p>
        <ul>
          <li><strong><code>S.rstrip([chars])</code>:</strong> Tước bỏ khoảng trắng (hoặc ký tự chỉ định) ở phía bên phải / cuối chuỗi (đặc biệt hữu dụng để xóa <code>\\n</code> khi đọc tệp).</li>
          <li><strong><code>S.upper()</code> / <code>S.lower()</code>:</strong> Chuyển đổi toàn bộ chuỗi sang chữ in HOA hoặc chữ thường.</li>
          <li><strong><code>S.isalpha()</code>:</strong> Kiểm tra xem toàn bộ các ký tự trong chuỗi có phải là chữ cái hay không (trả về <code>True</code>/<code>False</code>).</li>
          <li><strong><code>S.startswith(prefix)</code>:</strong> Kiểm tra chuỗi có bắt đầu bằng tiền tố <code>prefix</code> hay không.</li>
          <li><strong><code>S.endswith(suffix)</code>:</strong> Kiểm tra chuỗi có kết thúc bằng hậu tố <code>suffix</code> hay không.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Minh họa các phương thức rstrip, upper, isalpha, startswith, endswith',
          code: `line = "Python's strings are awesome!\\n"

# Tước bỏ dòng mới ở cuối
clean_line = line.rstrip()
print("line.rstrip():", repr(clean_line))

# Chuyển thành chữ hoa
print("line.upper():", repr(line.upper()))

# Kiểm tra nội dung chữ cái
print("clean_line.isalpha():", clean_line.isalpha())

# Kiểm tra tiền tố và hậu tố
print("line.startswith('Python'):", line.startswith('Python'))
print("line.endswith('awesome!\\n'):", line.endswith('awesome!\\n'))`,
          output: `line.rstrip(): "Python's strings are awesome!"
line.upper(): "PYTHON'S STRINGS ARE AWESOME!\\n"
clean_line.isalpha(): False
line.startswith('Python'): True
line.endswith('awesome!\\n'): True`,
          annotations: [
            { line: 4, text: 'rstrip() loại bỏ ký tự ngắt dòng \\n ở cuối chuỗi.' },
            { line: 11, text: 'clean_line.isalpha() trả về False vì chuỗi chứa dấu cách, dấu nháy đơn và chấm than.' },
            { line: 14, text: 'startswith kiểm tra chính xác tiền tố mở đầu.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Biểu Thức Thay Thế Tương Đương & Ưu Thế Tốc Độ so với re',
      content: `
        <p>Các kỹ thuật biểu thức đôi khi cũng có thể được dùng để đạt được kết quả tương tự như các phương thức chuỗi:</p>
        <ul>
          <li>Thay vì dùng <code>line.find('awesome') != -1</code>, toán tử biểu thức <strong><code>'awesome' in line</code></strong> ngắn gọn và tự nhiên hơn rất nhiều.</li>
          <li>Thay vì gọi <code>line.endswith(sub)</code>, ta có thể so sánh lát cắt âm: <strong><code>line[-len(sub):] == sub</code></strong>.</li>
        </ul>

        <p>Lưu ý quan trọng của Mark Lutz: <strong>không có bất kỳ phương thức chuỗi nào chấp nhận các mẫu biểu thức chính quy (regex patterns)</strong>. Đối với việc xử lý văn bản dựa trên mẫu phức tạp, bạn phải sử dụng module thư viện chuẩn <code>re</code> (sẽ giới thiệu ở Chương 37). Tuy nhiên, chính vì giới hạn ở so sánh chuỗi nguyên nghĩa, <strong>các phương thức chuỗi có tốc độ thực thi nhanh hơn đáng kể so với module <code>re</code></strong>.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh phương thức chuỗi với biểu thức tương đương',
          code: `line = "Python's strings are awesome!\\n"
sub = 'awesome!\\n'

# 1. Tìm kiếm chuỗi con: find() vs in
print("line.find('awesome') != -1:", line.find('awesome') != -1)
print("'awesome' in line:", 'awesome' in line)

# 2. Kiểm tra hậu tố: endswith() vs slice âm
print("line.endswith(sub):", line.endswith(sub))
print("line[-len(sub):] == sub:", line[-len(sub):] == sub)`,
          output: `line.find('awesome') != -1: True
'awesome' in line: True
line.endswith(sub): True
line[-len(sub):] == sub: True`,
          annotations: [
            { line: 6, text: '\'awesome\' in line mang tính trực quan và tối ưu cho điều kiện kiểm tra if.' },
            { line: 10, text: 'Cắt lát âm [-len(sub):] lấy đúng số ký tự cuối bằng độ dài hậu tố để so sánh ==.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Ưu tiên phương thức chuỗi trước khi viện đến module re',
        content: `Một lời khuyên thực tế của các chuyên gia Python: nếu một tác vụ trích xuất văn bản có thể giải quyết bằng <code>split()</code>, <code>slice</code> hay <code>replace()</code>, hãy luôn ưu tiên dùng chúng thay vì module <code>re</code>. Phương thức chuỗi chạy bằng mã C thuần túy trong CPython, có tốc độ xử lý nhanh hơn từ 5 đến 10 lần và dễ đọc hơn rất nhiều.`
      }
    ],
    pitfalls: [
      {
        title: 'Sự khác biệt giữa split() không đối số và split(\' \')',
        content: `Cần chú ý: <code>s.split()</code> (không truyền đối số) sẽ tự động gom nhiều khoảng trắng liên tiếp và bỏ qua khoảng trắng ở hai đầu; trong khi <code>s.split(' ')</code> sẽ tạo ra các phần tử chuỗi rỗng <code>''</code> nếu có hai dấu cách đứng cạnh nhau. Hãy dùng <code>s.split()</code> để phân tích cú pháp các từ phân cách bởi khoảng trắng.`
      }
    ]
  },

  exercises: [
    {
      title: 'Phân tách và chuẩn hóa dữ liệu dòng người dùng từ tệp tin',
      level: 'Vừa',
      problem: 'Cho một dòng dữ liệu thô đọc từ tệp tin: raw_data = "  pat, 2024 , Python Developer \\n". Hãy viết mã: (1) Tước bỏ khoảng trắng và dòng mới ở hai đầu; (2) Tách thành 3 trường; (3) Tước bỏ khoảng trắng dư thừa của từng trường để thu được danh sách sạch [\'pat\', \'2024\', \'Python Developer\'].',
      hint: 'Dùng raw_data.strip(), sau đó split(\',\'), và dùng list comprehension với field.strip().',
      solutionCode: `raw_data = "  pat, 2024 , Python Developer \\n"

# Bước 1: Dọn dẹp khoảng trắng và newline ở hai đầu
stripped_data = raw_data.strip()

# Bước 2: Tách theo dấu phẩy
raw_fields = stripped_data.split(',')

# Bước 3: Dọn dẹp khoảng trắng thừa cho từng phần tử
clean_fields = [f.strip() for f in raw_fields]

print("Dữ liệu thô ban đầu:", repr(raw_data))
print("Danh sách trường sạch:", clean_fields)`,
      solutionOutput: `Dữ liệu thô ban đầu: '  pat, 2024 , Python Developer \\n'
Danh sách trường sạch: ['pat', '2024', 'Python Developer']`,
      explanation: 'Sự kết hợp giữa strip() và split(\',\') cùng list comprehension tạo nên một quy trình chuẩn để phân tích các tệp dữ liệu CSV đơn giản một cách cực kỳ hiệu quả.'
    }
  ],

  quiz: [
    {
      question: 'Khi gọi phương thức S.split() mà không truyền bất kỳ đối số nào, Python sẽ phân tách chuỗi dựa trên tiêu chí gì?',
      options: [
        'Mỗi chữ cái đơn lẻ sẽ trở thành một phần tử của danh sách kết quả.',
        'Tách tại mọi nhóm chứa một hoặc nhiều khoảng trắng (gồm dấu cách, tab, dòng mới), đồng thời tự bỏ khoảng trắng ở hai đầu.',
        'Chỉ tách riêng tại ký tự dòng mới \\n.',
        'Báo lỗi TypeError vì phương thức split bắt buộc phải có đối số phân tách.'
      ],
      correctIndex: 1,
      explanation: 'split() không đối số mặc định phân tách theo nhóm khoảng trắng bất kỳ và tự động tước bỏ khoảng trắng dư thừa ở hai đầu chuỗi.'
    },
    {
      question: 'Tại sao các phương thức chuỗi như find(), split(), replace() lại được khuyến khích sử dụng hơn module re khi xử lý văn bản đơn giản?',
      options: [
        'Vì module re không hỗ trợ văn bản tiếng Việt.',
        'Vì các phương thức chuỗi chạy nhanh hơn đáng kể và mã nguồn đơn giản, dễ bảo trì hơn.',
        'Vì module re đã bị loại bỏ trong Python 3.12.',
        'Vì phương thức chuỗi có thể sửa đổi chuỗi tại chỗ.'
      ],
      correctIndex: 1,
      explanation: 'Các phương thức chuỗi được tối ưu hóa cao độ trong CPython, có tốc độ vượt trội so với việc phải biên dịch và khớp mẫu biểu thức chính quy trong module re.'
    }
  ],

  summary: [
    'Phân tách vị trí cố định bằng slice (line[:3], line[4:8]) áp dụng khi dữ liệu có tọa độ cột biết trước.',
    'Phân tách theo ký tự ngăn cách bằng split(): mặc định gom mọi khoảng trắng, hoặc tách theo dấu phẩy (CSV).',
    'Các phương thức chuyên dụng thông dụng: rstrip() xóa ký tự cuối dòng, upper() chuyển chữ hoa, isalpha() kiểm tra chữ cái, startswith()/endswith() kiểm tra tiền tố/hậu tố.',
    'Toán tử biểu thức in mang lại giải pháp thay thế tự nhiên và ngắn gọn cho find() != -1.',
    'Phương thức chuỗi không hỗ trợ mẫu regex nhưng chạy nhanh vượt trội so với module re.'
  ]
};
