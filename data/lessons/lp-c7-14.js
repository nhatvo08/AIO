export default {
  id: 'lp-c7-14',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.14',
  title: 'Biểu thức định dạng chuỗi (%): Cú pháp, Bảng 7-4 mã kiểu & Ví dụ nâng cao',
  subtitle: 'Toán tử nhị phân %, mục tiêu chuyển đổi %[(keyname)][flags][width][.precision]typecode, bảng mã kiểu s/r/a/c/d/i/o/x/X/e/E/f/F/g/G/%%, và độ rộng/độ chính xác động với dấu *',
  level: 'Cơ bản',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng toán tử nhị phân % để định dạng chuỗi theo khuôn mẫu, phân biệt với phép chia lấy dư trên số học.',
    'Nắm vững quy tắc cấu tạo biểu thức: chuỗi định dạng bên trái, giá trị đơn lẻ hoặc tuple bên phải.',
    'Tra cứu và sử dụng toàn bộ các mã kiểu trong Bảng 7-4 (s, r, a, c, d, i, u, o, x, X, e, E, f, F, g, G, %).',
    'Thành thạo cấu trúc mục tiêu đầy đủ: %[(keyname)][flags][width][.precision]typecode, bao gồm căn lề, đệm 0, dấu số học, và tham số động với ký tự *.'
  ],

  intuition: {
    title: 'Khuôn đúc ký tự và chiếc phễu đa năng',
    metaphor: 'Hãy hình dung biểu thức định dạng % giống như một khuôn đúc thạch cao có khoét sẵn các lỗ trống (%d, %s, %f). Phía bên phải của toán tử % là các túi nguyên liệu bạn đổ vào khuôn. Nếu chỉ có một lỗ trống duy nhất, bạn có thể đổ một túi lẻ. Nhưng hễ có từ hai lỗ trống trở lên, ban tổ chức yêu cầu bạn phải xếp tất cả các túi vào trong một chiếc khay đậy nắp cẩn thận (tức là tuple dạng (val1, val2)). Chiếc khuôn sẽ tự động nắn chỉnh kích thước, thêm khoảng trắng đệm hoặc cắt bớt số lẻ thập phân theo đúng chỉ dẫn khắc trên từng lỗ trống!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CẤU TRÚC MỤC TIÊU CHUYỂN ĐỔI BIỂU THỨC %</div>
        <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;">
          <span style="font-size:1.15rem;font-weight:700;color:var(--accent-primary);">%</span>
          <span style="color:var(--warning);">[(keyname)]</span>
          <span style="color:var(--accent-secondary);">[flags]</span>
          <span style="color:var(--success);">[width]</span>
          <span style="color:#e06c75;">[.precision]</span>
          <span style="font-size:1.15rem;font-weight:700;color:var(--text-primary);">typecode</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:8px;font-size:0.78rem;">
          <div style="padding:8px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--warning);">
            <strong>keyname:</strong> Tên khóa từ điển
          </div>
          <div style="padding:8px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--accent-secondary);">
            <strong>flags:</strong> <code>-</code> (trái), <code>+</code> (dấu), <code>0</code> (đệm 0), <code> </code> (cách)
          </div>
          <div style="padding:8px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--success);">
            <strong>width:</strong> Độ rộng tối thiểu (hoặc <code>*</code> động)
          </div>
          <div style="padding:8px;background:var(--bg-surface);border-radius:6px;border-left:3px solid #e06c75;">
            <strong>precision:</strong> Số lẻ thập phân (hoặc <code>*</code> động)
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Những Điều Cơ Bản Về Biểu Thức Định Dạng Chuỗi (%)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 31 / 52 – Trang 33 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Vì biểu thức định dạng chuỗi là công cụ nguyên bản trong lĩnh vực này, chúng ta sẽ bắt đầu tìm hiểu từ chúng. Python định nghĩa toán tử nhị phân <code>%</code> để hoạt động trên chuỗi. Bạn có thể nhớ lại từ Chương 5 rằng đây cũng là toán tử chia lấy phần dư (modulus) cho các số học. Khi áp dụng cho chuỗi, toán tử <code>%</code> cung cấp một cách đơn giản để định dạng các giá trị thành chuỗi theo một định nghĩa khuôn mẫu.</p>

        <p>Để định dạng chuỗi bằng một biểu thức:</p>
        <ol>
          <li><strong>Ở bên trái toán tử <code>%</code>:</strong> Hãy cung cấp một chuỗi định dạng chứa một hoặc nhiều <strong>mục tiêu chuyển đổi (conversion target)</strong> được nhúng bên trong, mỗi mục tiêu bắt đầu bằng ký tự <code>%</code> (ví dụ: <code>%d</code>, <code>%s</code>).</li>
          <li><strong>Ở bên phải toán tử <code>%</code>:</strong> Hãy cung cấp đối tượng mà bạn muốn Python chèn vào chuỗi định dạng bên trái tại vị trí của mục tiêu; đối với nhiều mục tiêu, hãy cung cấp nhiều đối tượng được gom trong một <strong>tuple</strong>.</li>
        </ol>

        <p>Quy tắc về tuple bên phải là một điểm cốt lõi cần lưu ý:</p>
        <ul>
          <li>Nếu chỉ có <strong>một mục tiêu thay thế duy nhất</strong>, bạn có thể truyền trực tiếp một phần tử đơn lẻ không phải tuple (ví dụ: <code>'Hello %s' % 'World'</code>).</li>
          <li>Nếu có <strong>từ hai mục tiêu trở lên</strong>, bạn <strong>bắt buộc phải nhóm chúng trong một tuple</strong> có dấu ngoặc đơn (ví dụ: <code>'%d %s' % (1, 'item')</code>). Nếu không bọc trong tuple, Python sẽ báo lỗi <code>TypeError</code>.</li>
        </ul>

        <div class="callout-box callout-tip" style="border-left:4px solid var(--accent-primary);margin-top:14px;">
          <div class="callout-header">
            <span>💡</span>
            <span><strong>Mã chuyển đổi vạn năng <code>%s</code>:</strong></span>
          </div>
          <div class="callout-body">
            <p>Mã chuyển đổi <code>%s</code> đại diện cho việc chuyển đổi thành chuỗi in bằng cách gọi hàm dựng sẵn <code>str()</code>. Vì mọi kiểu đối tượng trong Python (từ số, list, dict đến các hàm, lớp) đều có thể chuyển đổi thành chuỗi, <strong>mọi kiểu đối tượng đều hoạt động được với %s</strong>. Do đó, trừ khi bạn cần định dạng đặc biệt (như số chữ số thập phân hoặc đệm số 0), <code>%s</code> thường là mã duy nhất bạn cần ghi nhớ!</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Các ví dụ mở đầu về biểu thức định dạng %',
          code: `# 1. Biểu thức với hai mục tiêu: số nguyên %d và chuỗi %s
res = 'There are %d ways to %s!' % (3, 'format')
print(res)

# 2. Thay thế chuỗi đơn lẻ (không bắt buộc tuple)
option = 'expression'
print('Meet the formatting %s!' % option)

# 3. Thay thế đặc thù theo kiểu: %d (int), %s (str), %g (float)
print('%d %s %g you' % (1, 'formatter', 4.0))

# 4. Tính vạn năng của %s: int, float, list đều khớp với %s
print('%s -- %s -- %s' % (42, 3.14159, [1, 2, 3]))`,
          output: `There are 3 ways to format!
Meet the formatting expression!
1 formatter 4 you
42 -- 3.14159 -- [1, 2, 3]`,
          annotations: [
            { line: 2, text: 'Số 3 thế chỗ %d, chuỗi \'format\' thế chỗ %s.' },
            { line: 6, text: 'Chỉ có 1 mục tiêu %s, truyền thẳng chuỗi \'expression\' không cần tuple.' },
            { line: 12, text: 'List [1, 2, 3] tự động chuyển thành chuỗi \'[1, 2, 3]\' khi ghép vào %s.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bảng 7-4: Toàn Bộ Các Mã Kiểu Trong Biểu Thức Định Dạng',
      content: `
        <p>Bảng sau đây tổng hợp toàn bộ các ký tự mã kiểu hợp lệ xuất hiện sau ký hiệu <code>%</code> trong chuỗi định dạng bên trái. Các lập trình viên C sẽ nhận ra hầu hết những mã này vì chúng dựa trên <code>printf</code>:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:0.88rem;line-height:1.6;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:15%;color:var(--accent-primary);">Mã kiểu (Code)</th>
                <th style="padding:10px 12px;color:var(--text-primary);">Ý nghĩa (Meaning) &amp; Chi tiết chuyển đổi</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">s</td>
                <td style="padding:8px 12px;">Chuỗi ký tự (hoặc chuỗi biểu diễn <code>str(X)</code> của bất kỳ đối tượng nào)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">r</td>
                <td style="padding:8px 12px;">Tương tự như <code>s</code>, nhưng dùng chuỗi biểu diễn của <code>repr(X)</code> thay vì <code>str</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">a</td>
                <td style="padding:8px 12px;">Tương tự như <code>s</code>, nhưng dùng chuỗi thoát mã ASCII của <code>ascii(X)</code></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">c</td>
                <td style="padding:8px 12px;">Ký tự đơn (chấp nhận mã số nguyên Unicode/ASCII hoặc chuỗi ký tự đơn lẻ)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">d</td>
                <td style="padding:8px 12px;">Số nguyên thập phân có dấu (cơ số 10)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">i</td>
                <td style="padding:8px 12px;">Số nguyên (hoàn toàn tương đương với <code>d</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">u</td>
                <td style="padding:8px 12px;">Tương tự như <code>d</code> (đã lỗi thời: không còn mang nghĩa không dấu trong Python 3)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">o</td>
                <td style="padding:8px 12px;">Số nguyên bát phân (octal - cơ số 8)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">x</td>
                <td style="padding:8px 12px;">Số nguyên thập lục phân (hexadecimal - cơ số 16 chữ thường)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">X</td>
                <td style="padding:8px 12px;">Số nguyên thập lục phân (hexadecimal - chữ hoa: A-F)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">e</td>
                <td style="padding:8px 12px;">Số thực dấu phẩy động dạng số mũ chữ thường (ví dụ: <code>1.234568e+00</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">E</td>
                <td style="padding:8px 12px;">Số thực dấu phẩy động dạng số mũ chữ hoa (ví dụ: <code>1.234568E+00</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">f / F</td>
                <td style="padding:8px 12px;">Số thực dấu phẩy động dạng thập phân tiêu chuẩn</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);">
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">g / G</td>
                <td style="padding:8px 12px;">Số thực tự động chọn dạng <code>e/f</code> (hoặc <code>E/F</code>) tùy theo độ lớn của số</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);">%</td>
                <td style="padding:8px 12px;">Ký tự <code>%</code> nguyên nghĩa (được viết mã là <code>%%</code> trong chuỗi)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Cú Pháp Đầy Đủ Của Mục Tiêu Chuyển Đổi & Các Ví Dụ Nâng Cao',
      content: `
        <p>Cấu trúc chính thức của một mục tiêu chuyển đổi hoàn chỉnh bên trong chuỗi định dạng là:</p>
        <pre style="margin:12px 0;padding:12px;background:var(--bg-surface-alt);border-radius:6px;font-family:var(--font-mono);font-size:0.92rem;color:var(--accent-primary);">%[(keyname)][flags][width][.precision]typecode</pre>

        <p>Giữa ký tự <code>%</code> và <code>typecode</code>, bạn có thể thiết lập các tùy chọn sau:</p>
        <ul>
          <li><strong><code>(keyname)</code>:</strong> Tên khóa từ điển để tra cứu giá trị (sẽ học chuyên sâu ở bài C7.15).</li>
          <li><strong><code>flags</code> (cờ điều khiển):</strong>
            <ul>
              <li><code>-</code>: Căn lề trái trong trường độ rộng (mặc định là căn phải).</li>
              <li><code>+</code>: Luôn hiển thị dấu số học (dấu <code>+</code> cho số dương, <code>-</code> cho số âm).</li>
              <li><code>0</code>: Đệm số không (zero-padding) ở phía trước số cho đủ độ rộng. Lưu ý: cờ <code>-</code> căn trái sẽ ghi đè và vô hiệu hóa cờ <code>0</code>.</li>
              <li><code> </code> (dấu cách): Chèn một khoảng trắng trước số dương và dấu <code>-</code> trước số âm. Cờ <code>+</code> sẽ ghi đè dấu cách.</li>
            </ul>
          </li>
          <li><strong><code>width</code> (độ rộng):</strong> Tổng số ký tự tối thiểu của trường hiển thị.</li>
          <li><strong><code>.precision</code> (độ chính xác):</strong> Số lượng chữ số cần hiển thị sau dấu phẩy thập phân đối với số thực dấu phẩy động; hoặc độ dài cắt ngắn tối đa đối với chuỗi.</li>
        </ul>

        <p><strong>Độ rộng và độ chính xác động bằng dấu <code>*</code>:</strong> Khi độ rộng hoặc số chữ số thập phân chưa được biết trước lúc viết mã mà phụ thuộc vào thời gian chạy, bạn có thể thay thế bằng dấu <code>*</code>. Python sẽ tự động lấy giá trị số nguyên từ phần tử tiếp theo trong tuple bên phải để làm tham số!</p>
      `,
      codeExamples: [
        {
          title: 'Định dạng số nguyên: Mặc định, căn lề trái và đệm số 0',
          code: `x = 1234
# Trường mặc định, trường rộng 6 căn trái, trường rộng 6 đệm 0
res = 'integers: ...%d...%-6d...%06d' % (x, x, x)
print(res)`,
          output: `integers: ...1234...1234  ...001234`,
          annotations: [
            { line: 3, text: '%-6d căn lề trái trong độ rộng 6, phần dư lấp bằng 2 dấu cách.' },
            { line: 3, text: '%06d đệm hai số không phía trước để đạt tổng cộng 6 chữ số.' }
          ]
        },
        {
          title: 'Định dạng số thực float: Số mũ %e, thập phân %f, và tự động %g',
          code: `x = 1.23456789

print('%e | %f | %g' % (x, x, x))
print('%E' % x)
print('%-6.2f | %05.2f | %+06.1f' % (x, x, x))

# So sánh giữa %s và str():
print('%s' % x, str(x))`,
          output: `1.234568e+00 | 1.234568 | 1.23457
1.234568E+00
1.23   | 01.23 | +001.2
1.23456789 1.23456789`,
          annotations: [
            { line: 3, text: '%e làm tròn đến 6 số lẻ mũ; %g tự chọn thập phân vì số không quá lớn/nhỏ.' },
            { line: 5, text: '%-6.2f căn trái 2 số lẻ; %+06.1f đệm 0 và giữ dấu +.' }
          ]
        },
        {
          title: 'Độ rộng và độ chính xác tính toán động bằng ký tự *',
          code: `# Tham số động: %.*f nhận giá trị 4 làm số chữ số thập phân
val = 1 / 3.0
res = '%f, %.2f, %.*f' % (val, val, 4, val)

print(res)`,
          output: `0.333333, 0.33, 0.3333`,
          annotations: [
            { line: 3, text: 'Số 4 trong tuple cung cấp giá trị precision cho mục tiêu %.*f tiếp theo.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Ký Tự Phần Trăm Nguyên Nghĩa %%',
      content: `Khi muốn in ra một dấu phần trăm thật sự trong chuỗi định dạng (ví dụ: "Tỷ lệ lỗi: 5%"), bạn phải viết đúp hai dấu phần trăm: "Tỷ lệ lỗi: %d%%" % 5. Dấu %% đầu tiên sẽ thoát dấu % thứ hai để Python không coi đó là một mục tiêu chuyển đổi.`
      }
    ],
    pitfalls: [
      {
      title: 'Bẫy TypeError Quên Tuple Cho Nhiều Đối Số',
      content: `Lỗi kinh điển của người mới học là viết: "%s %s" % "a", "b". Biểu thức này bị phân tích cú pháp thành ("%s %s" % "a"), "b" vì toán tử % có độ ưu tiên cao hơn dấu phẩy, dẫn tới kết quả là một tuple gồm ('a %s', 'b') thay vì một chuỗi hoàn chỉnh! Hãy luôn bọc các đối số bên phải trong ngoặc đơn: ("a", "b").`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Định dạng bảng hóa đơn với biểu thức %',
      question: 'Cho tên mặt hàng item = "Sách", số lượng qty = 5, đơn giá price = 125000.75. Hãy dùng biểu thức % để in ra dòng hóa đơn: "Sách      | 0005 | +125000.8 VNĐ" (tên sách căn lề trái độ rộng 10, số lượng độ rộng 4 đệm 0, đơn giá có dấu + và 1 số lẻ thập phân).',
      starterCode: `item = "Sách"
qty = 5
price = 125000.75

# Viết biểu thức định dạng % ở đây:
# format_str = ...
# print(format_str % (...))
`,
      solution: `item = "Sách"
qty = 5
price = 125000.75

format_str = "%-10s | %04d | %+0.1f VNĐ"
print(format_str % (item, qty, price))`,
      hints: [
        'Dùng %-10s để căn lề trái độ rộng 10.',
        'Dùng %04d để đệm số 0 cho số nguyên trong độ rộng 4.',
        'Dùng %+0.1f hoặc %+.1f để hiển thị dấu số học và làm tròn 1 chữ số thập phân.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Khi chuỗi định dạng bên trái có từ 2 mục tiêu chuyển đổi trở lên, cấu trúc dữ liệu bắt buộc ở bên phải toán tử % là gì?',
      options: [
        'Một danh sách (list).',
        'Một tuple (hoặc một từ điển nếu các mục tiêu có tên khóa).',
        'Một tập hợp (set).',
        'Một chuỗi ký tự nối bằng dấu phẩy.'
      ],
      correctIndex: 1,
      explanation: 'Phía bên phải của toán tử % bắt buộc mong đợi một tuple khi có nhiều mục tiêu chuyển đổi (hoặc một từ điển nếu dùng tham chiếu theo tên khóa %(name)s).'
    },
    {
      question: 'Cú pháp nào sau đây chỉ định độ chính xác số lẻ thập phân lấy động từ tuple đầu vào tại thời gian chạy?',
      options: [
        '%.?f',
        '%.*f',
        '%.$f',
        '%.auto_f'
      ],
      correctIndex: 1,
      explanation: 'Ký tự dấu hoa thị * trong cú pháp %.*f hoặc %*.*f báo hiệu cho Python lấy giá trị độ rộng hoặc độ chính xác từ phần tử tiếp theo trong tuple đầu vào.'
    }
  ],

  summary: {
    takeaways: [
      'Toán tử nhị phân % nhận chuỗi định dạng bên trái và giá trị đơn hoặc tuple chứa nhiều giá trị bên phải.',
      'Mã %s là mã vạn năng có thể chuyển đổi bất kỳ đối tượng Python nào thành chuỗi văn bản.',
      'Bảng 7-4 cung cấp toàn bộ các mã kiểu tiêu chuẩn từ C printf: số nguyên (d, i, o, x, X), số thực (e, E, f, g), ký tự (c), và chuỗi (s, r, a).',
      'Cú pháp mục tiêu %[(keyname)][flags][width][.precision]typecode hỗ trợ kiểm soát căn lề, đệm 0, dấu số học và tham số động bằng ký tự *.'
    ],
    nextSteps: 'Trong bài tiếp theo (C7.15), chúng ta sẽ tìm hiểu kỹ thuật nâng cao: định dạng dựa trên Từ điển (dictionary) với %(key)s và hàm vars() để tạo mẫu bản mẫu tự động.'
  }
};
