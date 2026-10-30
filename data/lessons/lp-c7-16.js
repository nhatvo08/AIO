export default {
  id: 'lp-c7-16',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.16',
  title: 'Phương thức định dạng chuỗi (.format): Cú pháp, Thuộc tính & Ràng buộc chỉ mục',
  subtitle: 'Cú pháp gọi hàm str.format(), dấu ngoặc nhọn vị trí tương đối ({}), vị trí tuyệt đối ({0}), từ khóa ({key}), truy xuất thuộc tính (.attr), khóa từ điển ([key]), và giới hạn độ lệch âm',
  level: 'Trung bình',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cú pháp gọi phương thức str.format() bổ sung từ Python 3.0, phân biệt với cú pháp biểu thức %.',
    'Thành thạo ba kỹ thuật tham chiếu đối số: vị trí tương đối ({}), vị trí tuyệt đối ({0}), và tham chiếu theo từ khóa ({key}).',
    'Truy xuất thuộc tính đối tượng bằng dấu chấm (.attr) và khóa từ điển bằng cặp dấu ngoặc vuông ([key]) trực tiếp bên trong mục tiêu thay thế.',
    'Hiểu rõ các ràng buộc cú pháp của phương thức: chỉ chấp nhận một độ lệch dương duy nhất trong ngoặc vuông, không hỗ trợ chỉ mục âm [-1] hay biểu thức cắt lát (phải tính toán bên ngoài).'
  ],

  intuition: {
    title: 'Những chiếc phích cắm đa năng và bảng ổ điện có đánh số',
    metaphor: 'Nếu biểu thức % giống như việc cắm các chấu theo thứ tự hàng dọc của một thanh cắm đơn sơ, thì phương thức .format() giống như một bảng điện thông minh. Mỗi ổ cắm có thể để trống ({}) để tự động bắt dây nối tiếp; có thể đánh số thứ tự ({0}, {1}) để một nguồn điện cung cấp cho nhiều ổ; hoặc dán nhãn từ khóa ({server}, {port}). Thậm chí ổ cắm còn có thể luồn dây sâu vào bên trong để chạm tới công tắc con ({0.platform}) hoặc ngăn tủ con ({config[timeout]}). Tuy nhiên, bộ điều khiển này có một quy định ngặt nghèo: nó chỉ cho phép chạm vào ngăn số nguyên dương, tuyệt đối không chấp nhận các lệnh phức tạp như lùi ngược [-1] hay cắt xén [1:3]!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BA CÁCH THAM CHIẾU ĐỐI SỐ TRONG PHƯƠNG THỨC str.format()</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:4px;">1. Vị Trí Tương Đối</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              <code>'{}, {}'.format(A, B)</code><br>
              • Tự động khớp từ trái sang phải<br>
              • Tiện lợi, ngắn gọn<br>
              • Khó kiểm soát khi chuỗi dài
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:4px;">2. Vị Trí Tuyệt Đối</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              <code>'{0}, {1}, {0}'.format(A, B)</code><br>
              • Đánh số chỉ mục đối số từ 0<br>
              • Tái sử dụng đối số tùy ý<br>
              • Đảo lộn thứ tự tùy ý
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:4px;">3. Tên Từ Khóa</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              <code>'{k}: {v}'.format(k=A, v=B)</code><br>
              • Tham chiếu rõ ràng theo tên<br>
              • Độc lập với thứ tự truyền vào<br>
              • Tự ghi chú mã nguồn xuất sắc
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phương Thức str.format() Trong Python 3: Ý Tưởng & Cú Pháp Cơ Bản',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 36 / 52 – Trang 38 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Như đã lưu ý, Python 3.0 đã bổ sung cách thứ hai để định dạng chuỗi mà một số người coi là mang đậm phong cách Python (Pythonic) hơn. Không giống như các biểu thức định dạng, phương thức định dạng không dựa quá chặt chẽ vào mô hình <code>printf</code> của ngôn ngữ C; đôi khi thể hiện ý định tường minh hơn; và <strong>tránh được điểm kỳ quặc "giá trị đơn hay tuple" của toán tử %</strong>: các giá trị được thay thế chỉ đơn giản là các đối số truyền vào hàm, dù là một hay nhiều.</p>

        <p>Cụ thể, phương thức <code>format</code> sử dụng chuỗi chủ thể của lời gọi làm bản mẫu và nhận số lượng đối số tùy ý đại diện cho các giá trị cần thay thế. Bên trong chuỗi bản mẫu, các cặp dấu ngoặc nhọn <code>{}</code> chỉ định các mục tiêu thay thế theo ba hình thức:</p>
        <ol>
          <li><strong>Vị trí tương đối (<code>{}</code>):</strong> Các đối số được lần lượt nhặt theo thứ tự xuất hiện từ trái qua phải.</li>
          <li><strong>Vị trí tuyệt đối (<code>{0}</code>, <code>{1}</code>, <code>{2}</code>):</strong> Các số nguyên chỉ định chỉ mục của đối số trong danh sách tham số (bắt đầu từ 0). Cách này cho phép đảo thứ tự hoặc tái sử dụng cùng một đối số nhiều lần.</li>
          <li><strong>Tên từ khóa (<code>{name}</code>):</strong> Khớp với đối số có tên được truyền theo dạng <code>name=value</code>.</li>
        </ol>

        <p>Cũng giống như biểu thức <code>%</code> và các phương thức chuỗi khác, phương thức <code>format</code> luôn tạo và trả về một <strong>đối tượng chuỗi mới</strong> (do chuỗi có tính bất biến).</p>
      `,
      codeExamples: [
        {
          title: 'Các hình thức gọi phương thức format: Tương đối, tuyệt đối và từ khóa',
          code: `# 1. Vị trí tương đối
t1 = '{}, {}, and {}'
print(t1.format('expr', 'method', 'fstring'))

# 2. Vị trí tuyệt đối theo số thứ tự
t2 = '{0}, {1}, and {2}'
print(t2.format('expr', 'method', 'fstring'))

# 3. Theo tên đối số từ khóa
t3 = '{first}, {second}, and {third}'
print(t3.format(first='expr', second='method', third='fstring'))

# 4. Kết hợp cả đối số vị trí và đối số từ khóa
t4 = '{first}, {0}, and {third}'
print(t4.format('method', first='expr', third='fstring'))`,
          output: `expr, method, and fstring
expr, method, and fstring
expr, method, and fstring
expr, method, and fstring`,
          annotations: [
            { line: 3, text: '{} lấy lần lượt các đối số vị trí từ trái sang phải.' },
            { line: 7, text: '{0}, {1}, {2} chỉ định chính xác vị trí đối số.' },
            { line: 15, text: '{0} lấy \'method\', {first} và {third} lấy từ các tham số từ khóa.' }
          ]
        },
        {
          title: 'Chuỗi trả về từ format tiếp tục tham gia vào các phương thức khác',
          code: `# Kết quả của format là chuỗi thông thường, có thể split hoặc replace
X = '{pi}, {} and {years}'.format(62, pi=3.14, years=[1995, 2024])
print("X:", X)

print("Tách danh sách:", X.split(' and '))

Y = X.replace('and', 'but under no circumstances')
print("Y:", Y)`,
          output: `X: 3.14, 62 and [1995, 2024]
Tách danh sách: ['3.14, 62', '[1995, 2024]']
Y: 3.14, 62 but under no circumstances [1995, 2024]`,
          annotations: [
            { line: 2, text: 'Mục tiêu {} để trống tự động khớp với đối số vị trí 62.' },
            { line: 5, text: 'X.split() tách chuỗi mới tạo thành danh sách.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bổ Sung Khóa Từ Điển và Thuộc Tính Đối Tượng',
      content: `
        <p>Giống như các biểu thức định dạng <code>%</code>, các lời gọi <code>format</code> có thể trở nên mạnh mẽ hơn để hỗ trợ những tình huống sử dụng cấu trúc dữ liệu phức tạp. Cụ thể, các chuỗi định dạng có thể gọi tên trực tiếp:</p>
        <ul>
          <li><strong>Thuộc tính của đối tượng:</strong> Sử dụng cú pháp dấu chấm <code>.attribute</code> (ví dụ: <code>{0.platform}</code>, <code>{sys.platform}</code>).</li>
          <li><strong>Khóa của từ điển:</strong> Sử dụng cặp dấu ngoặc vuông <code>[key]</code> bên trong dấu ngoặc nhọn (ví dụ: <code>{1[kind]}</code>, <code>{map[kind]}</code>).</li>
        </ul>

        <p>Ví dụ đầu tiên bên dưới đánh chỉ mục một từ điển theo khóa <code>kind</code> rồi sau đó truy xuất thuộc tính <code>platform</code> từ đối tượng module <code>sys</code> đã nạp vào. Ví dụ thứ hai làm điều tương tự nhưng gọi tên các đối tượng theo từ khóa:</p>
      `,
      codeExamples: [
        {
          title: 'Truy xuất thuộc tính đối tượng và khóa từ điển trong format',
          code: `import sys

# 1. Truy xuất theo vị trí đối số {0} và {1}
res1 = 'This {1[kind]} runs {0.platform}'.format(sys, {'kind': 'laptop'})
print(res1)

# 2. Truy xuất theo tên đối số từ khóa
res2 = 'This {map[kind]} runs {sys.platform}'.format(sys=sys, map={'kind': 'phone'})
print(res2)`,
          output: `This laptop runs win32
This phone runs win32`,
          annotations: [
            { line: 4, text: '{1[kind]} truy xuất khóa \'kind\' của đối số thứ hai.' },
            { line: 4, text: '{0.platform} truy xuất thuộc tính sys.platform của đối số đầu tiên.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ràng Buộc Cú Pháp: Giới Hạn Chỉ Mục Trong Phương Thức format()',
      content: `
        <p>Mặc dù cặp dấu ngoặc vuông trong chuỗi định dạng cho phép chỉ định các độ lệch để đánh chỉ mục danh sách (và các dãy tuần tự khác), tính năng này <strong>không mang tính tổng quát như nhiều người lầm tưởng</strong>:</p>

        <div class="callout-box callout-warning" style="border-left:4px solid var(--danger);margin:14px 0;">
          <div class="callout-header">
            <span>⚠️</span>
            <span><strong>Quy tắc ràng buộc của cú pháp [] trong format():</strong></span>
          </div>
          <div class="callout-body">
            <ul>
              <li>Chỉ có <strong>một độ lệch số nguyên dương duy nhất</strong> hoạt động được bên trong mỗi cặp <code>[]</code> (ví dụ: <code>{0[0]}</code>, <code>{0[2]}</code>).</li>
              <li><strong>Không hỗ trợ chỉ mục âm:</strong> Viết <code>{0[-1]}</code> sẽ gây lỗi cú pháp <code>IndexError</code> hoặc <code>KeyError</code> (nó sẽ coi <code>'-1'</code> là một khóa từ điển dạng chuỗi!).</li>
              <li><strong>Không hỗ trợ cắt lát slice:</strong> Viết <code>{0[1:3]}</code> sẽ báo lỗi cú pháp.</li>
              <li><strong>Không hỗ trợ biểu thức:</strong> Không thể thực hiện các phép cộng trừ hoặc gọi hàm bên trong <code>[]</code>.</li>
            </ul>
          </div>
        </div>

        <p>Để tham chiếu các độ lệch âm, biểu thức slice, hoặc kết quả của các biểu thức tùy ý, bạn <strong>bắt buộc phải chạy các biểu thức đó ở bên ngoài</strong> chuỗi định dạng (rồi truyền kết quả vào dưới dạng đối số, có thể kết hợp với toán tử giải nén <code>*parts</code>), tương tự như những gì chúng ta làm với biểu thức <code>%</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Chỉ mục dương hợp lệ và kỹ thuật giải nén *parts cho slice bên ngoài',
          code: `somelist = list('HACK')
print("somelist:", somelist)

# Chỉ mục dương duy nhất: hợp lệ
print('zero={0[0]}, two={0[2]}'.format(somelist))

# Chỉ mục âm: phải tính ở bên ngoài đối số
print('first={}, last={}'.format(somelist[0], somelist[-1]))

# Cắt lát slice: đóng gói tuple rồi giải nén bằng toán tử *parts
parts = (somelist[0], somelist[-1], somelist[1:3])
print('first={}, last={}, middle={}'.format(*parts))`,
          output: `somelist: ['H', 'A', 'C', 'K']
zero=H, two=C
first=H, last=K
first=H, last=K, middle=['A', 'C']`,
          annotations: [
            { line: 5, text: '{0[0]} và {0[2]} trích xuất phần tử tại index 0 và index 2 của somelist.' },
            { line: 8, text: 'somelist[-1] bắt buộc phải tính ở ngoài hàm format().' },
            { line: 12, text: '*parts giải nén 3 phần tử thành 3 đối số độc lập truyền vào format().' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Tái Sử Dụng Đối Số Tiết Kiệm Bộ Nhớ',
      content: `Trong khi biểu thức % đòi hỏi phải truyền một tuple dài đúng bằng số lượng mục tiêu (hoặc phải dùng từ điển), phương thức format cho phép bạn dùng {0} lặp lại bao nhiêu lần tùy ý: "{0} x {0} = {1}".format(5, 25).`
      }
    ],
    pitfalls: [
      {
      title: 'Cấm Kỵ Trộn Lẫn {} Để Trống Và {0} Đánh Số Tự Động',
      content: `Trong Python 3.1+, bạn có thể dùng hoàn toàn {} tự động hoặc hoàn toàn {0}, {1} thủ công. Nhưng nếu trộn lẫn cả hai trong cùng một chuỗi (ví dụ: "{} và {1}"), Python sẽ ném lỗi ValueError: cannot switch from automatic field numbering to manual field specification.`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Định dạng thông tin cấu hình máy chủ với str.format()',
      question: 'Cho cấu hình server = {"host": "127.0.0.1", "port": 8080} và module platform = "Windows". Hãy dùng phương thức .format() (với cả truy xuất khóa từ điển và đối số từ khóa) để in ra dòng thông báo: "Máy chủ đang chạy tại địa chỉ http://127.0.0.1:8080 trên hệ điều hành Windows".',
      starterCode: `server = {"host": "127.0.0.1", "port": 8080}
os_name = "Windows"

# Viết lệnh gọi format() ở đây:
# message = ...
# print(message)
`,
      solution: `server = {"host": "127.0.0.1", "port": 8080}
os_name = "Windows"

message = "Máy chủ đang chạy tại địa chỉ http://{cfg[host]}:{cfg[port]} trên hệ điều hành {os}".format(cfg=server, os=os_name)
print(message)`,
      hints: [
        'Truyền server dưới dạng đối số từ khóa cfg=server và os_name dưới dạng os=os_name.',
        'Bên trong chuỗi, dùng {cfg[host]} và {cfg[port]} để trích xuất khóa từ điển.',
        'Dùng {os} để trích xuất tên hệ điều hành.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về việc sử dụng chỉ mục trong cặp dấu ngoặc vuông bên trong phương thức format()?',
      options: [
        'Cặp dấu [] hỗ trợ đầy đủ các biểu thức slice như {0[1:3]} và chỉ mục âm như {0[-1]}.',
        'Cặp dấu [] chỉ hỗ trợ một độ lệch số nguyên dương duy nhất; chỉ mục âm hoặc cắt lát bắt buộc phải thực hiện ở bên ngoài lời gọi format.',
        'Cặp dấu [] chỉ dùng cho chuỗi, không thể dùng để truy xuất khóa từ điển.',
        'Cặp dấu [] bắt buộc phải có dấu nháy đơn bao quanh tên khóa, ví dụ {0[\'name\']}.'
      ],
      answer: 1,
      explanation: 'Về mặt cú pháp trong str.format(), dấu ngoặc vuông [] chỉ chấp nhận một độ lệch số nguyên dương duy nhất hoặc tên khóa không có nháy. Các biểu thức âm [-1] hay slice [:] không được hỗ trợ nội tuyến.'
    },
    {
      question: 'Lệnh gọi nào sau đây sẽ gây ra ngoại lệ ValueError trong Python?',
      options: [
        '"{}, {}".format(1, 2)',
        '"{0}, {1}, {0}".format(1, 2)',
        '"{}, {1}".format(1, 2)',
        '"{first}, {0}".format(1, first=2)'
      ],
      answer: 2,
      explanation: 'Python cấm trộn lẫn việc đánh số tự động {} và đánh số thủ công {1} trong cùng một chuỗi định dạng (ValueError: cannot switch from automatic field numbering to manual field specification).'
    }
  ],

  summary: {
    takeaways: [
      'str.format() là phương thức hướng đối tượng bổ sung từ Python 3.0, nhận các đối số vị trí và đối số từ khóa linh hoạt.',
      'Ba cách tham chiếu đối số: vị trí tương đối ({}), vị trí tuyệt đối ({0}), và tên từ khóa ({name}).',
      'Hỗ trợ truy xuất trực tiếp thuộc tính đối tượng qua dấu chấm (.attr) và khóa từ điển qua ngoặc vuông ([key]).',
      'Giới hạn cú pháp: trong ngoặc vuông [] chỉ hỗ trợ một chỉ mục dương duy nhất; không hỗ trợ chỉ mục âm, slice hay biểu thức lồng phức tạp.'
    ],
    nextSteps: 'Trong bài tiếp theo (C7.17), chúng ta sẽ nghiên cứu cú pháp đặc tả formatspec chuyên sâu của phương thức: cấu trúc [[fill]align][sign][z][#][0][width][grouping][.precision][typecode], dấu phân cách hàng nghìn, và {} lồng nhau động.'
  }
};
