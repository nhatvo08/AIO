export default {
  id: 'lp-c7-17',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.17',
  title: 'Định dạng tùy chỉnh của Phương thức: Ngữ pháp formatspec, Dấu phân cách & Lồng nhau',
  subtitle: 'Cú pháp mục tiêu {[fieldname][component][!conversionflag][:formatspec]}, formatspec [[fill]align][sign][z][#][0][width][grouping][.precision][typecode], phân tách hàng nghìn (,), nhị phân (b), và mục tiêu lồng nhau',
  level: 'Nâng cao',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo cấu trúc tổng quát của mục tiêu thay thế: {[fieldname][component][!conversionflag][:formatspec]} và cách thoát ngoặc nhọn qua {{ và }}.',
    'Giải mã ngữ pháp formatspec đầy đủ: ký tự đệm fill, 4 kiểu căn lề align (<, >, =, ^), dấu số học sign (+, -, cách), dấu phân cách nhóm grouping (, và _).',
    'Sử dụng các mã kiểu chuyên biệt bổ sung của phương thức: b (nhị phân), % (tỷ lệ phần trăm).',
    'Ứng dụng cơ chế formatspec lồng nhau ({0:.{1}f}) để tính toán động mọi thông số định dạng từ đối số tại thời gian chạy.'
  ],

  intuition: {
    title: 'Hệ tọa độ vi chỉnh của kiến trúc sư giao diện',
    metaphor: 'Nếu coi mỗi chuỗi hiển thị là một ô trên bảng đồng hồ điều khiển, thì formatspec là chiếc thước panme cơ khí có độ chính xác tuyệt đối. Nó không chỉ hỏi bạn muốn đưa con số nào vào ô ({0}), mà còn cho phép bạn quyết định: căn lề bên nào (<, >, ^), nếu còn thừa chỗ thì lấy ký tự gì lấp vào (dấu sao *, dấu chấm ., hay số 0), có muốn nhóm các hàng nghìn bằng dấu phẩy ngân hàng (,) hay không, và giữ lại đúng bao nhiêu số lẻ sau dấu phẩy (.2f). Hơn thế nữa, nếu kích thước ô chưa biết trước, bạn có thể lồng một chiếc thước phụ ({1}) vào bên trong để kích thước tự co giãn theo thời gian chạy!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">GIẢI MÃ CẤU TRÚC FORMATSPEC ĐẦY ĐỦ</div>
        <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;font-size:1.05rem;">
          <code>{[fieldname][!flags]:<span style="color:var(--warning);">[fill][align]</span><span style="color:var(--accent-secondary);">[sign]</span><span style="color:#e06c75;">[#]</span><span style="color:#d19a66;">[0]</span><span style="color:var(--success);">[width]</span><span style="color:#98c379;">[grouping]</span><span style="color:#61afef;">[.precision]</span><span style="color:var(--accent-primary);">[type]</span>}</code>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:8px;font-size:0.78rem;">
          <div style="padding:6px 10px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--warning);">
            <strong>fill + align:</strong> <code>*&gt;10</code> (căn phải đệm <code>*</code>), <code>^10</code> (căn giữa)
          </div>
          <div style="padding:6px 10px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--accent-secondary);">
            <strong>sign:</strong> <code>+</code> (luôn ghi dấu), <code>-</code> (âm), <code> </code> (cách)
          </div>
          <div style="padding:6px 10px;background:var(--bg-surface);border-radius:6px;border-left:3px solid #98c379;">
            <strong>grouping:</strong> <code>,</code> (phẩy ngân hàng), <code>_</code> (gạch dưới)
          </div>
          <div style="padding:6px 10px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--accent-primary);">
            <strong>type:</strong> <code>b</code> (nhị phân), <code>X</code> (hex), <code>f</code>, <code>%</code> (phần trăm)
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cấu Trúc Đầy Đủ Của Mục Tiêu Thay Thế & Thoát Dấu Ngoặc Nhọn',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 39 / 52 – Trang 41 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Đối với phương thức định dạng, chúng ta dùng dấu hai chấm <code>:</code> sau phần định danh mục tiêu thay thế, theo sau là <strong>bộ chỉ định định dạng (format specifier)</strong> để quy định kích thước trường, cách căn lề, dấu phân cách và mã kiểu cụ thể.</p>

        <p>Cấu trúc chính thức của một mục tiêu thay thế hoàn chỉnh bên trong chuỗi định dạng là:</p>
        <pre style="margin:12px 0;padding:12px;background:var(--bg-surface-alt);border-radius:6px;font-family:var(--font-mono);font-size:0.92rem;color:var(--accent-primary);">{[fieldname][component][!conversionflag][:formatspec]}</pre>

        <p>Các thành phần bên trong mục tiêu bao gồm:</p>
        <ul>
          <li><strong><code>fieldname</code> (tên trường):</strong> Số thứ tự đối số vị trí hoặc tên đối số từ khóa (có thể để trống để tự động đánh số).</li>
          <li><strong><code>component</code> (thành phần con):</strong> Chuỗi gồm không hoặc nhiều <code>.attribute</code> hoặc <code>[index]</code> để truy xuất thuộc tính hoặc khóa/chỉ mục.</li>
          <li><strong><code>!conversionflag</code> (cờ chuyển đổi):</strong> Bắt đầu bằng <code>!</code> theo sau bởi <code>s</code> (gọi <code>str()</code>), <code>r</code> (gọi <code>repr()</code>), hoặc <code>a</code> (gọi <code>ascii()</code>). Cờ này có tác dụng ghi đè và bỏ qua định dạng mặc định của đối tượng.</li>
          <li><strong><code>:formatspec</code> (đặc tả định dạng):</strong> Bắt đầu bằng dấu hai chấm <code>:</code>, quy định chi tiết cách trình bày văn bản hiển thị.</li>
        </ul>

        <p><strong>Thoát dấu ngoặc nhọn:</strong> Văn bản nằm ngoài mục tiêu thay thế được hiểu nguyên văn. Để in ra một dấu ngoặc nhọn thực sự trong chuỗi kết quả, bạn dùng cặp dấu ngoặc kép: <code>{{</code> sẽ tạo ra <code>{</code> và <code>}}</code> sẽ tạo ra <code>}</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Thoát dấu ngoặc nhọn kép {{ và }} trong chuỗi định dạng',
          code: `# Cặp dấu {{ }} được giải mã thành một dấu ngoặc nhọn đơn { }
template = 'Tập hợp bao gồm: {{{0}, {1}}}'
print(template.format('alpha', 'beta'))`,
          output: `Tập hợp bao gồm: {alpha, beta}`,
          annotations: [
            { line: 2, text: '{{{0} giải mã thành { theo sau bởi giá trị đối số 0.' },
            { line: 2, text: '{1}}} giải mã thành giá trị đối số 1 theo sau bởi }.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Ngữ Pháp format spec: Ký Tự Đệm, Căn Lề, Dấu Số Học & Nhóm Phân Cách',
      content: `
        <p>Thành phần <code>formatspec</code> đứng sau dấu hai chấm có ngữ pháp vô cùng phong phú và sau này được f-string kế thừa trọn vẹn 100%:</p>
        <pre style="margin:12px 0;padding:12px;background:var(--bg-surface-alt);border-radius:6px;font-family:var(--font-mono);font-size:0.92rem;color:var(--accent-primary);">[[fill]align][sign][z][#][0][width][grouping][.precision][typecode]</pre>

        <p>Các thành phần cốt lõi bao gồm:</p>
        <ul>
          <li><strong><code>fill</code> và <code>align</code> (đệm và căn lề):</strong> Ký tự đệm <code>fill</code> có thể là bất kỳ ký tự nào ngoại trừ <code>{</code> hoặc <code>}</code>. Ký tự căn lề <code>align</code> gồm:
            <ul>
              <li><code>&lt;</code>: Căn lề trái (mặc định cho chuỗi).</li>
              <li><code>&gt;</code>: Căn lề phải (mặc định cho số).</li>
              <li><code>^</code>: Căn lề giữa (cân đối hai bên).</li>
              <li><code>=</code>: Đệm ký tự vào giữa dấu số học và các chữ số (ví dụ: <code>+000123</code>).</li>
            </ul>
          </li>
          <li><strong><code>sign</code> (dấu số học):</strong> <code>+</code> (luôn ghi dấu cho cả số dương và âm), <code>-</code> (chỉ ghi dấu cho số âm), hoặc dấu cách (chèn khoảng trắng trước số dương).</li>
          <li><strong><code>#</code> (dạng thay thế):</strong> Tự động thêm tiền tố <code>0b</code> cho nhị phân, <code>0o</code> cho bát phân, <code>0x</code> hoặc <code>0X</code> cho thập lục phân.</li>
          <li><strong><code>grouping</code> (dấu phân cách nhóm số):</strong>
            <ul>
              <li><code>,</code> (dấu phẩy): Thêm dấu phẩy phân cách hàng nghìn cho số thập phân (chuẩn định dạng tiền tệ quốc tế).</li>
              <li><code>_</code> (dấu gạch dưới): Hỗ trợ cho cả số thập phân và nhóm 4 chữ số trong định dạng nhị phân, bát phân, thập lục phân.</li>
            </ul>
          </li>
          <li><strong><code>typecode</code> bổ sung mới:</strong> Phương thức định dạng hỗ trợ mã <code>b</code> cho số nhị phân (rất giống hàm <code>bin()</code>), mã <code>%</code> để tự động nhân 100 và thêm ký hiệu phần trăm, và chỉ dùng <code>d</code> cho số nguyên cơ số 10 (không dùng <code>i</code>, <code>u</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Căn lề trái, căn lề phải, căn lề giữa và đệm ký tự tùy ý',
          code: `import sys

# Căn lề mặc định và căn lề tường minh
print('{0:10} = {1:10}'.format('text', 123.4567))
print('{0:>10} = {1:<10}'.format('text', 123.4567))

# Căn lề giữa ^ và truy xuất khóa/thuộc tính
print('{1[kind]:^10} = {0.platform:^10}'.format(sys, dict(kind='laptop')))`,
          output: `text       =   123.4567
      text = 123.4567  
  laptop   =   win32   `,
          annotations: [
            { line: 4, text: '{0:10} chuỗi căn trái, {1:10} số căn phải trong độ rộng 10.' },
            { line: 5, text: '{0:>10} ép chuỗi căn phải, {1:<10} ép số căn trái.' },
            { line: 8, text: ':^10 căn lề chính giữa không gian 10 ký tự.' }
          ]
        },
        {
          title: 'Định dạng số: Nhị phân (b), hex (X), và dấu phân cách hàng nghìn (, và _)',
          code: `# Thập lục phân, bát phân và nhị phân
print('{:X}, {:o}, {:b}'.format(255, 255, 255))

# Dấu phân cách hàng nghìn bằng dấu phẩy
print('{:,.2f}'.format(12345.678))

# Dấu phân cách gạch dưới _ cho số mũ và nhóm 4 chữ số hex/bin
print('{0:,}  {0:_}  {1:_x}  {1:_b}'.format(2 ** 32, 0x1FFFF))`,
          output: `FF, 377, 11111111
12,345.68
4,294,967,296  4_294_967_296  1_ffff  1_1111_1111_1111_1111`,
          annotations: [
            { line: 2, text: '{:b} định dạng nhị phân nguyên thủy (tương tự bin() nhưng không có tiền tố 0b).' },
            { line: 5, text: '{:,.2f} phân cách hàng nghìn 12,345 và làm tròn 2 số lẻ thập phân.' },
            { line: 8, text: '{1:_b} chia nhóm 4 bit nhị phân bằng dấu gạch dưới cực kỳ dễ đọc.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Formatspec Lồng Nhau: Động Hóa Tham Số Tại Thời Gian Chạy',
      content: `
        <p>Thành phần <code>formatspec</code> của phương thức định dạng cũng có thể chứa các <strong>mục tiêu thay thế <code>{}</code> lồng nhau</strong> cho bất kỳ phần nào của nó, để sử dụng các giá trị trong danh sách đối số một cách hoàn toàn động (rất giống với cú pháp <code>*</code> trong các biểu thức định dạng <code>%</code>).</p>

        <p>Các <code>{}</code> lồng nhau này dùng <code>fieldname</code> để định danh đối số mà từ đó giá trị được rút ra, và kết quả định dạng của chúng được dùng tại chính vị trí của cặp <code>{}</code> lồng nhau đó. Việc lồng nhau chỉ có thể <strong>sâu tối đa một cấp</strong>.</p>

        <p>Trên thực tế, phương thức <code>format</code> cho phép <em>bất kỳ thành phần nào của một chuỗi formatspec được lấy từ các đối số tại thời gian chạy</em> thay vì bị viết cứng tại thời điểm lập trình (điều này mang tính tổng quát hơn nhiều so với toán tử <code>%</code>):</p>
      `,
      codeExamples: [
        {
          title: 'Độ chính xác và độ rộng lấy động từ đối số qua {} lồng nhau',
          code: `# Tham số viết cứng:
print('{:.4f}'.format(1 / 3.0))

# Lấy số chữ số thập phân động từ đối số thứ hai {1}:
print('{0:.{1}f}'.format(1 / 3.0, 4))

# Động hóa toàn bộ mọi thành phần của formatspec:
# Cấu trúc: 0:fill, 1:align, 2:sign, 3:width, 4:grouping, 5:precision, 6:type
num = 1234.564
res = '{0:{1}{2}{3}{4}{5}.{6}{7}}!'.format(num, 0, '<', '+', 12, ',', 2, 'f')
print("Động hóa toàn diện:", res)`,
          output: `0.3333
0.3333
Động hóa toàn diện: +1,234.56000!`,
          annotations: [
            { line: 5, text: '{0:.{1}f} nhúng giá trị của đối số 1 (là số 4) vào vị trí precision.' },
            { line: 11, text: 'Tất cả các tham số đệm 0, căn lề <, dấu +, độ rộng 12 đều truyền động qua đối số.' }
          ]
        },
        {
          title: 'Hàm dựng sẵn format(object, formatspec) cho một đối tượng đơn lẻ',
          code: `# Hàm dựng sẵn format() kích hoạt chạy phương thức __format__ của đối tượng
print('{:.2f}'.format(1.2345))      # Phương thức chuỗi
print(format(1.2345, '.2f'))        # Hàm dựng sẵn format()
print('%.2f' % 1.2345)              # Biểu thức định dạng %
print(f'{1.2345:.2f}')              # Xem trước: F-string`,
          output: `1.23
1.23
1.23
1.23`,
          annotations: [
            { line: 3, text: 'format(val, spec) tương đương với val.__format__(spec).' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Mã Tỷ Lệ Phần Trăm % Tự Nhân 100',
      content: `Khi muốn hiển thị tỷ lệ phần trăm, hãy dùng mã kiểu % trong formatspec: "{:.1%}".format(0.856). Python sẽ tự động nhân 0.856 với 100 và thêm ký hiệu % ở cuối: "85.6%". Không cần phải tự viết phép nhân bằng tay!`
      }
    ],
    pitfalls: [
      {
      title: 'Giới Hạn Lồng Nhau 1 Cấp Duy Nhất',
      content: `Bạn chỉ có thể lồng {} một cấp bên trong formatspec (ví dụ: {0:{1}}). Nếu cố gắng lồng hai cấp (như {0:{1:{2}}}), Python sẽ báo lỗi ValueError: Max specifier nesting depth exceeded.`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Định dạng bảng tỷ giá tiền tệ quốc tế',
      question: 'Cho giá trị balance = 12500000.456 và tỷ lệ tăng trưởng growth = 0.1275. Hãy dùng phương thức .format() để tạo ra chuỗi hiển thị: "Số dư: +12,500,000.46 VNĐ | Tăng trưởng: 12.8%" (số dư luôn có dấu số học, phân cách hàng nghìn bằng dấu phẩy và làm tròn 2 số lẻ; tăng trưởng hiển thị theo tỷ lệ phần trăm với 1 số lẻ).',
      starterCode: `balance = 12500000.456
growth = 0.1275

# Viết lệnh format() ở đây:
# report = ...
# print(report)
`,
      solution: `balance = 12500000.456
growth = 0.1275

report = "Số dư: {:+,.2f} VNĐ | Tăng trưởng: {:.1%}".format(balance, growth)
print(report)`,
      hints: [
        'Dùng :+,.2f để kết hợp cờ dấu +, dấu phân cách phẩy , và 2 chữ số thập phân f.',
        'Dùng :.1% để chuyển đổi số thực thành tỷ lệ phần trăm với 1 chữ số sau dấu phẩy.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Ký hiệu nào sau đây trong formatspec biểu thị việc căn lề chính giữa văn bản trong trường hiển thị?',
      options: [
        '|',
        '^',
        '=',
        '~'
      ],
      answer: 1,
      explanation: 'Trong ngữ pháp formatspec của Python, dấu ^ đại diện cho việc căn lề chính giữa (center alignment) trong trường độ rộng quy định.'
    },
    {
      question: 'Để in ra một dấu ngoặc nhọn mở "{" nguyên văn trong chuỗi của phương thức str.format(), bạn phải viết như thế nào?',
      options: [
        '\\{',
        '{{',
        '%{',
        '[[]]'
      ],
      answer: 1,
      explanation: 'Trong chuỗi định dạng của format(), bạn thoát dấu ngoặc nhọn bằng cách viết đúp: {{ sinh ra { và }} sinh ra }.'
    }
  ],

  summary: {
    takeaways: [
      'Cấu trúc mục tiêu thay thế: {[fieldname][component][!conversionflag][:formatspec]}.',
      'Thoát dấu ngoặc nhọn nguyên văn bằng cách viết đúp: {{ và }}.',
      'Cú pháp formatspec cho phép điều khiển ký tự đệm (fill), căn lề (<, >, =, ^), dấu số học (+, -), dấu phân cách hàng nghìn (, và _), và mã kiểu (b, %, X, f).',
      'Đặc tả định dạng lồng nhau {0:.{1}f} cho phép tính toán động toàn bộ kích thước và định dạng tại thời gian chạy.'
    ],
    nextSteps: 'Trong bài tiếp theo (C7.18), chúng ta sẽ bước sang ứng viên thứ ba: Hằng chuỗi định dạng F-String (bổ sung từ Python 3.6), phép nội suy chuỗi và những cú pháp đột phá mới trong Python 3.12+.'
  }
};
