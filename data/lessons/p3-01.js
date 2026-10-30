export default {
  id: 'p3-01',
  partId: 'part-3',
  partTitle: 'Phần 3 – Định dạng chuỗi (Trung cấp → Nâng cao)',
  number: '3.1',
  title: 'Bốn thế hệ định dạng chuỗi: %, str.format(), f-string và t-string',
  subtitle: 'Hiểu trọn lịch sử tiến hóa 35 năm của định dạng văn bản trong Python và ma trận quyết định chọn công cụ chuẩn xác trong Python 3.14.8',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: true,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cú pháp và cơ chế hoạt động của cả 4 phương pháp định dạng chuỗi trong Python 3.14: toán tử %, str.format(), f-string (PEP 498/701) và t-string (PEP 750).',
    'Hiểu vì sao toán tử % vẫn giữ vị trí quan trọng trong hệ thống logging nhờ cơ chế trì hoãn tính toán (lazy evaluation).',
    'Biết khi nào nên dùng str.format() cho các mẫu cấu hình động lưu trong cơ sở dữ liệu hoặc file ngôn ngữ (i18n).',
    'Phân biệt rõ ranh giới bảo mật giữa f-string (nội suy trực tiếp thành str) và t-string (trả về đối tượng Template để kiểm duyệt chống SQL Injection / XSS).'
  ],

  intuition: {
    title: 'Bốn chiếc khuôn đúc văn bản qua từng thời kỳ',
    metaphor: 'Hãy tưởng tượng việc ghép dữ liệu vào chuỗi giống như in ấn. Toán tử `%` giống máy in chữ chì kiểu C cổ điển: nhanh gọn nhưng dễ lệch khuôn nếu truyền tuple. `str.format()` là dây chuyền đóng khuôn đánh số công nghiệp: khuôn (chuỗi mẫu) có thể cất trong kho (file config) rồi đem ra đổ dữ liệu sau. `f-string` là máy in laser trực tiếp: nhìn thấy biến nào là in ngay lập tức với tốc độ nhanh nhất. Nhưng khi in hóa đơn ngân hàng hay lệnh SQL, in trực tiếp rất nguy hiểm nếu khách hàng chèn mã độc — đó là lúc `t-string` (Python 3.14) xuất hiện như một khay kiểm duyệt an ninh: giữ nguyên khuôn và dữ liệu tách rời để bộ phận an ninh kiểm tra trước khi xuất bản.',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin-top:12px;font-family:system-ui,sans-serif;">
        <div style="padding:14px;border-radius:10px;background:rgba(148,163,184,0.12);border:1px solid rgba(148,163,184,0.3);">
          <div style="font-size:12px;text-transform:uppercase;color:#94a3b8;font-weight:700;">1991 • Thế hệ 1</div>
          <div style="font-size:16px;font-weight:700;margin:4px 0;color:#e2e8f0;">Toán tử <code>%</code> (Printf-style)</div>
          <div style="font-size:13px;color:#cbd5e1;"><code>"Xin chào %s" % name</code></div>
          <div style="margin-top:8px;font-size:12px;color:#38bdf8;">✔ Chuẩn mực cho <code>logging</code> (lazy evaluation)</div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.3);">
          <div style="font-size:12px;text-transform:uppercase;color:#38bdf8;font-weight:700;">2008 • Thế hệ 2 (Python 2.6/3.0)</div>
          <div style="font-size:16px;font-weight:700;margin:4px 0;color:#e2e8f0;"><code>str.format()</code></div>
          <div style="font-size:13px;color:#cbd5e1;"><code>"Xin chào {name}".format(...)</code></div>
          <div style="margin-top:8px;font-size:12px;color:#38bdf8;">✔ Chuỗi mẫu tĩnh từ file config / DB</div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);">
          <div style="font-size:12px;text-transform:uppercase;color:#4ade80;font-weight:700;">2016 • Thế hệ 3 (Python 3.6 / 3.12)</div>
          <div style="font-size:16px;font-weight:700;margin:4px 0;color:#e2e8f0;"><code>f-string</code> (PEP 498 &amp; 701)</div>
          <div style="font-size:13px;color:#cbd5e1;"><code>f"Xin chào {name}"</code></div>
          <div style="margin-top:8px;font-size:12px;color:#4ade80;">✔ Nhanh nhất, gọn nhất cho code hàng ngày</div>
        </div>
        <div style="padding:14px;border-radius:10px;background:rgba(168,85,247,0.14);border:1px solid rgba(168,85,247,0.4);">
          <div style="font-size:12px;text-transform:uppercase;color:#c084fc;font-weight:700;">2025 • Thế hệ 4 (Python 3.14)</div>
          <div style="font-size:16px;font-weight:700;margin:4px 0;color:#e2e8f0;"><code>t-string</code> (PEP 750)</div>
          <div style="font-size:13px;color:#cbd5e1;"><code>t"SELECT * WHERE id={uid}"</code></div>
          <div style="margin-top:8px;font-size:12px;color:#c084fc;">✔ Trả về <code>Template</code> chống Injection</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Toán tử % (Printf-style) và bí mật trong module logging',
      badge: null,
      content: `
        <p>Kế thừa từ hàm <code>printf()</code> của ngôn ngữ C, toán tử <code>%</code> dùng các ký hiệu giữ chỗ như <code>%s</code> (chuỗi thông qua <code>str()</code>), <code>%r</code> (chuỗi qua <code>repr()</code>), <code>%d</code> (số nguyên hệ 10), <code>%f</code> (số thực dấu phẩy động) và <code>%x</code> (hệ thập lục phân). Bạn có thể truyền một giá trị đơn, một <code>tuple</code> theo vị trí, hoặc một <code>dict</code> với cú pháp <code>%(key)s</code>.</p>
        <p>Dù đã ra đời từ phiên bản đầu tiên của Python, <strong>cú pháp <code>%</code> tuyệt đối không bị khai tử</strong>. Trong các hệ thống lớn, <code>logging.debug("User %s từ IP %s", user, ip)</code> là cách viết tiêu chuẩn. Lý do: nếu hệ thống đang chạy ở mức <code>INFO</code>, module <code>logging</code> sẽ <strong>bỏ qua hoàn toàn bước ghép chuỗi</strong> (lazy evaluation), giúp tiết kiệm hàng triệu chu kỳ CPU so với việc tính toán <code>f-string</code> trước khi gọi hàm.</p>
      `,
      codeExamples: [
        {
          title: 'Định dạng % cơ bản và cơ chế Lazy Logging',
          code: `import logging

# 1. Định dạng theo tuple và theo dict
msg_tuple = "Máy chủ %s phản hồi trong %.2f ms (mã %d)" % ("api-01", 12.3456, 200)
msg_dict = "Tài khoản %(user)s còn %(balance).1f USD" % {"user": "an_nguyen", "balance": 150.75}
print(msg_tuple)
print(msg_dict)

# 2. Cạm bẫy kinh điển khi giá trị cần in chính là một tuple
items = (10, 20)
# "Tọa độ: %s" % items  --> TypeError: not all arguments converted during string formatting
print("Tọa độ an toàn: %s" % (items,))

# 3. Chuẩn mực trong logging: truyền mẫu % và đối số tách rời
logging.basicConfig(level=logging.WARNING, format="%(levelname)s: %(message)s")
# Dòng dưới KHÔNG hề tốn CPU nối chuỗi vì mức DEBUG đang tắt:
logging.debug("Chi tiết gói tin: %s - %d bytes", items, 1024)
logging.warning("Cảnh báo tải CPU đạt %.1f%% tại node %s", 92.5, "worker-03")`,
          output: `Máy chủ api-01 phản hồi trong 12.35 ms (mã 200)
Tài khoản an_nguyen còn 150.8 USD
Tọa độ an toàn: (10, 20)
WARNING: Cảnh báo tải CPU đạt 92.5% tại node worker-03`,
          annotations: [
            { line: 4, text: '%.2f làm tròn số thực đến 2 chữ số thập phân; %d ép về số nguyên.' },
            { line: 5, text: '%(key)s cho phép đọc giá trị từ dict theo tên khóa thay vì nhớ thứ tự.' },
            { line: 12, text: 'Luôn bọc (items,) trong tuple 1 phần tử nếu đối tượng cần in có thể là tuple.' },
            { line: 18, text: 'Dùng %% để hiển thị ký tự phần trăm thật sự khi chuỗi có dùng toán tử %.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Phương thức str.format() — Vũ khí cho chuỗi mẫu tách rời',
      badge: null,
      content: `
        <p>Ra mắt ở Python 2.6 / 3.0 (PEP 3101), <code>str.format()</code> thay thế ký hiệu <code>%</code> bằng cặp ngoặc nhọn <code>{}</code> và giới thiệu <strong>Format Specification Mini-Language</strong> sau dấu hai chấm <code>:</code>. Khác với <code>f-string</code> (đòi hỏi các biến phải tồn tại ngay tại dòng khai báo chuỗi), một chuỗi dùng cho <code>.format()</code> chỉ là một đối tượng <code>str</code> bình thường.</p>
        <p>Nhờ đặc tính này, <code>str.format()</code> là lựa chọn lý tưởng khi <strong>chuỗi mẫu được định nghĩa trước</strong> (ở đầu file, trong file JSON đa ngôn ngữ i18n, hoặc đọc từ cấu hình hệ thống) và dữ liệu chỉ xuất hiện sau đó trong vòng lặp hoặc hàm xử lý.</p>
      `,
      codeExamples: [
        {
          title: 'Tái sử dụng mẫu cấu hình tĩnh với str.format() và str.format_map()',
          code: `# Chuỗi mẫu có thể lưu trong file cấu hình hoặc hằng số toàn cục
EMAIL_TEMPLATE = (
    "Kính gửi {customer[name]},\\n"
    "Đơn hàng #{order_id:06d} của quý khách trị giá {total:,.0f} VNĐ đã được xác nhận.\\n"
    "Mã tham chiếu: #{order_id:06d} (Trạng thái: {status})"
)

# Đổ dữ liệu vào mẫu ở thời điểm bất kỳ sau này
rendered = EMAIL_TEMPLATE.format(
    customer={"name": "Trần Minh"},
    order_id=482,
    total=1850000,
    status="Đang giao"
)
print(rendered)

# format_map() nhận trực tiếp một mapping mà không cần giải nén **dict (tiết kiệm bộ nhớ)
row_template = "| {sku:<10} | {qty:>5d} | {price:>10,.2f} |"
product = {"sku": "KB-MECH", "qty": 12, "price": 129.5}
print(row_template.format_map(product))`,
          output: `Kính gửi Trần Minh,
Đơn hàng #000482 của quý khách trị giá 1,850,000 VNĐ đã được xác nhận.
Mã tham chiếu: #000482 (Trạng thái: Đang giao)
| KB-MECH    |    12 |     129.50 |`,
          annotations: [
            { line: 3, text: 'Truy cập phần tử dict bên trong chuỗi mẫu bằng cú pháp {customer[name]} (không có dấu nháy quanh key).' },
            { line: 5, text: 'Có thể tái sử dụng cùng một tham số {order_id:06d} nhiều lần mà không cần truyền lại.' },
            { line: 19, text: 'format_map(dict_obj) truyền trực tiếp đối tượng mapping mà không tạo bản sao kwargs như .format(**dict_obj).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: f-string — Tốc độ bytecode và sự tiện lợi hàng ngày',
      badge: null,
      content: `
        <p>Từ Python 3.6 (PEP 498) và được nâng cấp mạnh mẽ ở Python 3.12 (PEP 701), <strong>Formatted String Literals (f-strings)</strong> đã trở thành cách định dạng mặc định cho hơn 85% tác vụ ghép chuỗi trực tiếp trong code. Khi biên dịch, Python phân tích <code>f"..."</code> thành các chỉ thị bytecode chuyên biệt (<code>FORMAT_SIMPLE</code> / <code>FORMAT_WITH_SPEC</code> và <code>BUILD_STRING</code>), giúp tốc độ nhanh hơn cả <code>%</code> lẫn <code>str.format()</code> vì không tốn chi phí gọi phương thức hay phân tích chuỗi mẫu lúc chạy (runtime).</p>
        <p>Tuy nhiên, chính vì f-string thực thi biểu thức ngay lập tức và trả về một chuỗi phẳng <code>str</code>, mọi ranh giới giữa <em>văn bản gốc của lập trình viên</em> và <em>dữ liệu bên ngoài của người dùng</em> đều bị xóa nhòa ngay sau khi tạo xong.</p>
      `,
      codeExamples: [
        {
          title: 'Sức mạnh biểu thức trực tiếp và hiệu năng của f-string',
          code: `items = [("Táo", 3, 25000), ("Cam", 5, 18000)]

for name, qty, unit_price in items:
    # Tính toán biểu thức trực tiếp ngay trong ngoặc nhọn {}
    print(f"Mặt hàng: {name:<6} | SL: {qty:2d} | Thành tiền: {qty * unit_price:>10,d} đ")

# Cú pháp tự gỡ lỗi {biến=} cực nhanh khi kiểm tra giá trị
discount_rate = 0.15
subtotal = 165000
print(f"Kiểm tra nhanh: {subtotal=:,d}, {discount_rate=:.0%}, {subtotal * (1 - discount_rate)=:,.0f}")`,
          output: `Mặt hàng: Táo    | SL:  3 | Thành tiền:     75,000 đ
Mặt hàng: Cam    | SL:  5 | Thành tiền:     90,000 đ
Kiểm tra nhanh: subtotal=165,000, discount_rate=15%, subtotal * (1 - discount_rate)=140,250`,
          annotations: [
            { line: 5, text: 'Biểu thức qty * unit_price được tính toán trực tiếp ở tốc độ bytecode rồi định dạng ngay.' },
            { line: 10, text: 'Dấu = cuối biểu thức vừa in tên biểu thức gốc vừa áp dụng format spec phía sau dấu hai chấm.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: t-string (Template Strings) và Ma trận lựa chọn trong Python 3.14',
      badge: 'Mới trong 3.14',
      content: `
        <p>Python 3.14 chính thức bổ sung mảnh ghép thứ tư: <strong>Template Strings (<code>t"..."</code> — PEP 750)</strong>. Nhìn bề ngoài, <code>t"Xin chào {name}"</code> có cú pháp giống hệt <code>f"Xin chào {name}"</code>. Điểm khác biệt cốt lõi nằm ở kiểu trả về: <strong><code>t"..."</code> KHÔNG trả về <code>str</code></strong> mà trả về một đối tượng <code>string.templatelib.Template</code>.</p>
        <p>Đối tượng <code>Template</code> này giữ nguyên phần khung văn bản tĩnh (<code>.strings</code>) và các vùng dữ liệu động (<code>.interpolations</code>) tách biệt nhau. Nhờ đó, các thư viện HTML, SQL, Shell hay Logging có thể tự động kiểm tra, lọc mã độc (escape) hoặc tham số hóa từng giá trị trước khi ghép thành chuỗi cuối cùng.</p>
        <div class="table-responsive">
          <table class="lesson-table">
          <thead>
            <tr style="background:rgba(148,163,184,0.15);text-align:left;">
              <th style="padding:8px;border:1px solid rgba(148,163,184,0.3);">Tiêu chí</th>
              <th style="padding:8px;border:1px solid rgba(148,163,184,0.3);">Toán tử <code>%</code></th>
              <th style="padding:8px;border:1px solid rgba(148,163,184,0.3);"><code>str.format()</code></th>
              <th style="padding:8px;border:1px solid rgba(148,163,184,0.3);"><code>f-string</code></th>
              <th style="padding:8px;border:1px solid rgba(148,163,184,0.3);"><code>t-string</code> (3.14+)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><strong>Kiểu kết quả</strong></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><code>str</code></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><code>str</code></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><code>str</code></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><code>Template</code></td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><strong>Thời điểm nạp biến</strong></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">Trì hoãn được</td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">Trì hoãn được</td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">Ngay lập tức</td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">Biểu thức tính ngay, kết xuất chuỗi trì hoãn</td>
            </tr>
            <tr>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);"><strong>Khi nào dùng?</strong></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">Ghi log với <code>logging</code></td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">Mẫu i18n, config tĩnh</td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">Hiển thị &amp; ghép chuỗi nội bộ</td>
              <td style="padding:8px;border:1px solid rgba(148,163,184,0.25);">HTML, SQL, Shell, Structured Log</td>
            </tr>
          </tbody>
        </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh trực diện 4 thế hệ định dạng chuỗi trong Python 3.14',
          code: `from string.templatelib import Template, Interpolation

user_input = "<script>alert(1)</script>"
score = 98.6

# 1. Toán tử %
s1 = "User %s đạt %.1f điểm" % (user_input, score)

# 2. str.format()
s2 = "User {u} đạt {s:.1f} điểm".format(u=user_input, s=score)

# 3. f-string
s3 = f"User {user_input} đạt {score:.1f} điểm"

# Cả 3 cách trên đều tạo ra đúng một chuỗi str giống hệt nhau (mã độc đã hòa lẫn vào chuỗi):
print("s1 == s2 == s3:", s1 == s2 == s3)
print("Kiểu của f-string:", type(s3).__name__)

# 4. t-string (Python 3.14): Giữ nguyên ranh giới giữa phần tĩnh và dữ liệu động!
tmpl = t"User {user_input} đạt {score:.1f} điểm"
print("Kiểu của t-string:", type(tmpl).__name__, "| isinstance str:", isinstance(tmpl, str))
print("Phần văn bản tĩnh (.strings):", tmpl.strings)
print("Giá trị nội suy (.values):", tmpl.values)`,
          output: `s1 == s2 == s3: True
Kiểu của f-string: str
Kiểu của t-string: Template | isinstance str: False
Phần văn bản tĩnh (.strings): ('User ', ' đạt ', ' điểm')
Giá trị nội suy (.values): ('<script>alert(1)</script>', 98.6)`,
          annotations: [
            { line: 16, text: 'Với %, .format() và f-string, kết quả cuối cùng đều là một str không thể phân biệt đâu là dữ liệu ngoại lai.' },
            { line: 20, text: 't"..." tạo đối tượng Template, tách bạch phần khung tĩnh (.strings) và các giá trị (.values).' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Dùng f-string bên trong logging làm giảm hiệu năng hệ thống',
        content: 'Viết `logger.debug(f"Data: {expensive_serialize(data)}")` khiến hàm `expensive_serialize(data)` và phép nối chuỗi LUÔN LUÔN bị chạy ngay cả khi mức log đang là `WARNING` hay `ERROR`. Hãy dùng `logger.debug("Data: %s", data)` hoặc t-string với handler chuyên dụng.'
      },
      {
        title: 'Gọi .format() trực tiếp trên chuỗi do người dùng nhập vào',
        content: 'Nếu bạn cho phép người dùng tự nhập chuỗi mẫu rồi gọi `user_template.format(event=event_obj)`, kẻ tấn công có thể nhập `{event.__init__.__globals__}` để đọc biến môi trường và khóa bí mật của ứng dụng (Format String Vulnerability).'
      }
    ],
    tips: [
      {
        title: 'Quy tắc ngón tay cái chọn công cụ định dạng trong Python 3.14',
        content: '1) Nội suy chuỗi thông thường trong code → `f-string`.\n2) Ghi log qua module `logging` chuẩn → `%`.\n3) Mẫu câu lưu trong DB / JSON cấu hình → `str.format()` hoặc `string.Template`.\n4) Ghép dữ liệu vào HTML, SQL, câu lệnh hệ thống → `t-string`.'
      }
    ],
    deepDive: {
      title: 'Bên dưới tầng Bytecode: Vì sao f-string nhanh hơn str.format()?',
      content: '<p>Khi bạn gọi <code>"Val: {}".format(x)</code>, Python phải thực hiện tra cứu thuộc tính <code>LOAD_ATTR (format)</code> lúc chạy, tạo frame gọi hàm C, và quét từng ký tự của chuỗi <code>"Val: {}"</code> để tìm dấu <code>{}</code> mỗi lần dòng code đó lặp lại. Ngược lại, với <code>f"Val: {x}"</code>, trình biên dịch Python tách sẵn hằng chuỗi <code>"Val: "</code> ngay lúc biên dịch (compile time) và phát ra chỉ thị bytecode <code>FORMAT_SIMPLE</code> cùng <code>BUILD_STRING</code>. Không có bất kỳ lời gọi hàm hay bước phân tích cú pháp chuỗi mẫu nào xảy ra ở runtime!</p>'
    },
    newIn314: {
      title: 'Sự xuất hiện của t-string (PEP 750) hoàn thiện bộ tứ định dạng',
      content: 'Trước Python 3.14, lập trình viên buộc phải đánh đổi giữa sự tiện lợi của f-string và tính an toàn của chuỗi tham số hóa. Với `t"..."`, bạn vừa viết biểu thức nội suy tự nhiên như f-string, vừa nhận được đối tượng `string.templatelib.Template` an toàn để truyền vào các hàm xử lý.'
    }
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Chuyển đổi câu lệnh Logging sang Lazy Evaluation',
      problem: 'Cho thông tin kết nối gồm `host = "db.internal"`, `port = 5432`, `latency_ms = 4.876`. Hãy tạo một tuple `log_args` gồm `(chuỗi_mẫu_%, host, port, latency_ms)` sao cho khi ghép bằng toán tử `chuỗi_mẫu_% % (host, port, latency_ms)` sẽ cho ra chính xác chuỗi: `"Kết nối tới db.internal:5432 thành công (4.88 ms)"`. In kết quả kiểm tra.',
      hint: 'Sử dụng %s cho chuỗi, %d cho cổng số nguyên và %.2f cho thời gian trễ làm tròn 2 chữ số thập phân.',
      solutionCode: `host = "db.internal"
port = 5432
latency_ms = 4.876

log_pattern = "Kết nối tới %s:%d thành công (%.2f ms)"
log_args = (log_pattern, host, port, latency_ms)

# Kiểm tra kết quả định dạng như cách module logging thực hiện nội bộ
formatted_message = log_args[0] % log_args[1:]
print(formatted_message)`,
      solutionOutput: `Kết nối tới db.internal:5432 thành công (4.88 ms)`,
      explanation: 'Trong module `logging`, khi bạn gọi `logger.info(log_pattern, host, port, latency_ms)`, module chỉ thực hiện phép toán `msg % args` khi mức log hiện tại cho phép bản tin được xuất ra.'
    },
    {
      level: 'Vừa',
      title: 'Hệ thống thông báo đa ngôn ngữ với str.format_map()',
      problem: 'Cho từ điển mẫu đa ngôn ngữ `TEMPLATES` và danh sách sự kiện `events`. Hãy dùng `.format_map()` để in thông báo tương ứng với ngôn ngữ `lang` của từng sự kiện.',
      hint: 'Lấy chuỗi mẫu bằng TEMPLATES[ev["lang"]] rồi gọi .format_map(ev).',
      solutionCode: `TEMPLATES = {
    "vi": "Xin chào {user}, bạn có {unread:d} tin nhắn mới từ hệ thống {system}.",
    "en": "Hello {user}, you have {unread:d} new messages from {system}."
}

events = [
    {"lang": "vi", "user": "Lan", "unread": 5, "system": "CoreERP"},
    {"lang": "en", "user": "Alex", "unread": 12, "system": "CoreERP"}
]

for ev in events:
    template_str = TEMPLATES[ev["lang"]]
    print(template_str.format_map(ev))`,
      solutionOutput: `Xin chào Lan, bạn có 5 tin nhắn mới từ hệ thống CoreERP.
Hello Alex, you have 12 new messages from CoreERP.`,
      explanation: 'Khi chuỗi mẫu được chọn động từ cấu trúc dữ liệu (như từ điển đa ngôn ngữ), `f-string` không thể dùng được vì f-string phải là hằng chuỗi viết cố định trong mã nguồn. `str.format_map()` giải quyết bài toán này gọn gàng và hiệu quả.'
    },
    {
      level: 'Khó',
      title: 'Bộ kiểm tra an toàn định dạng (Phân biệt str và Template 3.14)',
      problem: 'Viết hàm `render_safe_badge(content)` trong Python 3.14 chỉ chấp nhận đầu vào là một đối tượng `Template` (tạo từ `t"..."`). Nếu người dùng truyền nhầm một `str` (ví dụ do dùng `f"..."`), hàm phải ném `TypeError("Chỉ chấp nhận t-string Template để chống XSS")`. Nếu là `Template`, hãy ghép chuỗi nhưng thay thế mọi ký tự `<` và `>` trong các giá trị nội suy thành `&lt;` và `&gt;`.',
      hint: 'Kiểm tra isinstance(content, Template). Duyệt qua từng phần tử hoặc kết hợp content.strings và content.interpolations.',
      solutionCode: `from string.templatelib import Template, Interpolation

def render_safe_badge(content: Template) -> str:
    if not isinstance(content, Template):
        raise TypeError("Chỉ chấp nhận t-string Template để chống XSS")
    
    parts = []
    for item in content:
        if isinstance(item, str):
            parts.append(item)
        elif isinstance(item, Interpolation):
            safe_val = str(item.value).replace("<", "&lt;").replace(">", "&gt;")
            parts.append(safe_val)
    return "".join(parts)

username = "<b>Admin</b>"
# 1. Truyền t-string hợp lệ:
print(render_safe_badge(t"<span class='user'>{username}</span>"))

# 2. Truyền nhầm f-string sẽ bị chặn ngay lập tức:
try:
    render_safe_badge(f"<span class='user'>{username}</span>")
except TypeError as e:
    print("Đã chặn:", e)`,
      solutionOutput: `<span class='user'>&lt;b&gt;Admin&lt;/b&gt;</span>
Đã chặn: Chỉ chấp nhận t-string Template để chống XSS`,
      explanation: 'Nhờ `isinstance(content, Template)`, API trong Python 3.14 có thể ép buộc lập trình viên phải truyền `t"..."` thay vì `f"..."`, từ đó giữ nguyên các thẻ `<span class=\'user\'>` hợp lệ ở phần tĩnh nhưng tự động làm sạch biến `username`.'
    }
  ],

  quiz: [
    {
      question: 'Vì sao cú pháp định dạng bằng toán tử `%` vẫn được khuyến nghị khi gọi `logging.debug("User %s", username)`?',
      options: [
        'Vì toán tử % nhanh hơn f-string trong mọi trường hợp',
        'Vì module logging trì hoãn việc ghép chuỗi và chỉ định dạng khi mức log DEBUG thực sự được bật',
        'Vì f-string không thể dùng bên trong các hàm của thư viện chuẩn',
        'Vì toán tử % tự động mã hóa chống SQL Injection'
      ],
      correctIndex: 1,
      explanation: 'Khi truyền chuỗi mẫu và các tham số riêng rẽ cho `logging.debug(pattern, arg1, arg2)`, nếu mức log hiện tại cao hơn DEBUG (như INFO hoặc WARNING), module logging sẽ bỏ qua hoàn toàn phép định dạng chuỗi, giúp tiết kiệm CPU.'
    },
    {
      question: 'Khi chạy đoạn mã `val = (1, 2); print("Tọa độ: %s" % val)` trong Python, điều gì sẽ xảy ra?',
      options: [
        'In ra "Tọa độ: (1, 2)" bình thường',
        'In ra "Tọa độ: 1"',
        'Phát sinh lỗi TypeError: not all arguments converted during string formatting',
        'Phát sinh lỗi ValueError'
      ],
      correctIndex: 2,
      explanation: 'Toán tử `%` coi vế phải là danh sách các đối số nếu nó là một `tuple`. Vì chuỗi mẫu chỉ có 1 vị trí `%s` nhưng tuple `val` có 2 phần tử nên Python báo thừa đối số. Để in một tuple, phải bọc nó thành `(val,)`.'
    },
    {
      question: 'Trong trường hợp nào sau đây `str.format()` (hoặc `str.format_map()`) phù hợp hơn `f-string`?',
      options: [
        'Khi cần nối hai biến cục bộ ngay trong một hàm tính toán',
        'Khi chuỗi mẫu được tải động từ file cấu hình JSON hoặc cơ sở dữ liệu lúc chương trình đang chạy',
        'Khi cần tốc độ thực thi nhanh nhất có thể trong vòng lặp',
        'Khi muốn in kèm tên biến để gỡ lỗi nhanh với dấu `=`'
      ],
      correctIndex: 1,
      explanation: '`f-string` là cú pháp literal được biên dịch tĩnh cùng mã nguồn nên không thể áp dụng cho một chuỗi đọc từ file hay DB ở runtime. Khi đó `template_str.format(...)` là công cụ phù hợp.'
    },
    {
      question: 'Trong Python 3.14, biểu thức `type(t"Xin chào {name}")` trả về kiểu dữ liệu nào?',
      options: [
        'str',
        'string.Template',
        'string.templatelib.Template',
        'bytes'
      ],
      correctIndex: 2,
      explanation: 'Theo PEP 750 trong Python 3.14, cú pháp `t"..."` tạo ra một đối tượng thuộc lớp `string.templatelib.Template` (không phải `str` và cũng không phải lớp `string.Template` kiểu `$name` cũ).'
    }
  ],

  summary: [
    'Python 3.14 cung cấp 4 cơ chế định dạng chuỗi bổ trợ cho nhau: `%`, `str.format()`, `f-string` và `t-string`.',
    'Dùng toán tử `%` trong các lời gọi `logging.debug/info(...)` để tận dụng cơ chế trì hoãn tính toán (lazy evaluation).',
    'Dùng `str.format()` hoặc `str.format_map()` khi chuỗi mẫu cần lưu trữ tách rời mã nguồn (file cấu hình, đa ngôn ngữ i18n) nhưng tuyệt đối không chạy `.format()` trên chuỗi mẫu do người dùng không tin cậy nhập vào.',
    'Dùng `f-string` cho các tác vụ nội suy chuỗi trực tiếp hàng ngày để đạt tốc độ cao nhất và mã nguồn ngắn gọn nhất.',
    'Dùng `t-string` (`t"..."`, mới trong Python 3.14) khi ghép dữ liệu vào các ngữ cảnh nhạy cảm (HTML, SQL, lệnh hệ thống) cần kiểm duyệt các giá trị nội suy trước khi xuất ra chuỗi.'
  ]
};
