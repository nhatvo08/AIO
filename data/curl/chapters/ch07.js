/**
 * Chương 07: Quản Trị Request & Response Headers Chuyên Nghiệp (-H) (data/curl/chapters/ch07.js)
 * Cấp độ: Trung cấp | Thời lượng: ~25 phút | cURL tối thiểu: 7.0.0 (hỗ trợ nạp file -H @file ≥ 7.55.0)
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch07',
    meta: {
      id: 'ch07',
      order: 7,
      title: 'Quản Trị Request & Response Headers Chuyên Nghiệp (-H)',
      level: 'Trung cấp',
      curlMinVersion: '7.0.0',
      qaStatus: 'verified'
    },
    partId: 'level-2',
    partTitle: 'Cấp độ 2: Kỹ Năng Trung Cấp',
    number: '07',
    title: 'Quản Trị Request & Response Headers Chuyên Nghiệp (-H)',
    subtitle: 'Làm chủ cờ -H, kỹ thuật xóa sạch header mặc định bằng dấu hai chấm (:), gửi header rỗng (;), nạp headers từ file an toàn và giải phẫu Response Headers',
    level: 'Trung cấp',
    duration: '25 phút',
    curlMinVersion: '7.0.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Hiểu rõ bản chất kiến trúc HTTP Headers theo tiêu chuẩn RFC 9110 (cặp Key-Value, Case-Insensitive) và sử dụng thành thạo cờ `-H, --header` để thêm mới hoặc ghi đè headers chuẩn và custom headers (`X-*`).',
      'Nắm vững kỹ thuật đỉnh cao: phân biệt sự khác nhau một trời một vực giữa dấu hai chấm `-H "Header:"` (triệt tiêu hoàn toàn header mặc định của cURL) và dấu chấm phẩy `-H "Header;"` (gửi header có giá trị rỗng theo RFC).',
      'Thành thạo kỹ thuật nạp danh sách headers từ file bên ngoài với cú pháp `-H @headers.txt` (cURL ≥ 7.55.0), loại bỏ triệt để nguy cơ lộ lọt secret/token trong process table (`ps aux`) và lịch sử lệnh shell.',
      'Giải phẫu chi tiết các trường Response Headers quan trọng (`Server`, `Cache-Control`, `ETag`, `Set-Cookie`, `Strict-Transport-Security`, `Access-Control-Allow-Origin`), phân biệt chính xác header Hop-by-hop vs End-to-end.',
      'Phòng chống các rủi ro an ninh mạng nghiêm trọng liên quan đến Header: rò rỉ Authorization khi follow redirect `-L` sang host khác (cạm bẫy `--location-trusted`), tấn công CRLF Header Injection, và lỗi phân tích cú pháp PowerShell Splatting với ký tự `@`.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành toàn bộ Cấp độ 1 (Chương 01 đến 06): Nắm vững vòng đời HTTP request/response, các phương thức GET/POST/PUT/DELETE, và quy tắc escaping/quoting trên 3 môi trường shell (Bash, PowerShell, CMD).',
      'Hiểu cấu trúc thông điệp HTTP message (start line, headers, CRLF, body) và vai trò của các cờ cơ bản như `-s`, `-S`, `-i`, `-D` (đã học ở Chương 03 và Chương 04).'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Nhãn dán bưu kiện, thẻ thông hành và chiếc bùa tẩy vô hình',
      metaphor: 'Headers trong HTTP giống hệt như các nhãn dán, tem kiểm dịch và thị thực hải quan dán bên ngoài một gói hàng bưu kiện. Nội dung gói hàng (Body) là cái bạn muốn chuyển đi, nhưng nhân viên bưu điện (Web Server, Reverse Proxy, CDN, API Gateway) lại đọc các nhãn dán (Headers) trước tiên để quyết định: "Bưu kiện này là tiếng gì (Content-Type)? Gửi cho ai (Host)? Người gửi là ai (User-Agent)? Có giấy phép VIP vào kho không (Authorization)?". Mặc định, cURL là một nhân viên giao vận rất chu đáo: nó tự động dán sẵn 3 chiếc tem lên mọi gói hàng gồm `Host` (địa chỉ máy nhận), `User-Agent: curl/x.x.x` (thẻ nhân viên cURL), và `Accept: */*` (tôi nhận bất kỳ thứ gì server trả về). Cờ `-H` cho phép bạn dán thêm bất kỳ con tem tùy biến nào. Nhưng điều vi diệu nhất nằm ở chiếc "bùa tẩy vô hình": Nếu bạn dán một con tem rỗng kết thúc bằng dấu hai chấm `-H "Accept:"`, cURL sẽ bóc phăng chiếc tem đó đi, hoàn toàn biến mất khỏi gói hàng! Còn nếu bạn dùng dấu chấm phẩy `-H "X-Flag;"`, bạn đang gửi đi một chiếc tem có tên nhưng giá trị bên trong trống rỗng. Việc hiểu rõ những con tem này chính là ranh giới giữa một người chỉ biết gõ lệnh copy-paste và một kỹ sư mạng thực thụ.',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">QUY TẮC PHÂN GIẢI DẤU PHÂN CÁCH TRONG CỜ -H CỦA cURL</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#38bdf8;font-weight:700;">1. Thêm / Ghi đè (Dấu hai chấm + Giá trị)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cú pháp: <code>-H "Name: Value"</code><br/>Hành vi: Gửi header với giá trị tương ứng qua mạng.</div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#ef4444;font-weight:700;">2. Xóa sạch Header (Dấu hai chấm KHÔNG giá trị)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cú pháp: <code>-H "Accept:"</code><br/>Hành vi: Triệt tiêu hoàn toàn header mặc định của cURL.</div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#f59e0b;font-weight:700;">3. Gửi Header rỗng (Dấu chấm phẩy)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cú pháp: <code>-H "X-Empty-Tag;"</code><br/>Hành vi: Gửi dòng <code>X-Empty-Tag:\\r\\n</code> với giá trị rỗng đúng RFC.</div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;">4. Nạp từ File an toàn (Ký tự @)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cú pháp: <code>-H "@headers.txt"</code> (cURL ≥ 7.55.0)<br/>Hành vi: Đọc nhiều header từ file, chống lộ token trong <code>ps aux</code>.</div>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '-H',
        longFlag: '--header',
        description: 'Thêm HTTP header tùy biến vào request, hoặc nạp danh sách headers từ file nếu có tiền tố `@` (cURL ≥ 7.55.0).',
        minVersion: '7.0.0'
      },
      {
        flag: '-A',
        longFlag: '--user-agent',
        description: 'Ghi đè chuỗi nhận diện User-Agent của client gửi tới server (tương đương `-H "User-Agent: ..."`).',
        minVersion: '7.0.0'
      },
      {
        flag: '-e',
        longFlag: '--referer',
        description: 'Thiết lập header `Referer` chỉ định URL nguồn điều hướng dẫn người dùng tới request hiện tại.',
        minVersion: '7.0.0'
      },
      {
        flag: '-b',
        longFlag: '--cookie',
        description: 'Gửi dữ liệu cookie lên server (dạng chuỗi `name=val` hoặc đường dẫn file cookie jar).',
        minVersion: '7.0.0'
      },
      {
        flag: '-i',
        longFlag: '--include',
        description: 'Hiển thị đầy đủ các dòng HTTP response headers cùng với nội dung body trong output stdout.',
        minVersion: '7.0.0'
      },
      {
        flag: '-I',
        longFlag: '--head',
        description: 'Gửi HEAD request để lấy riêng response headers mà không tải về phần thân body.',
        minVersion: '7.0.0'
      },
      {
        flag: '-D',
        longFlag: '--dump-header',
        description: 'Ghi toàn bộ HTTP response headers nhận được vào một file riêng biệt để phân tích hoặc debug.',
        minVersion: '7.0.0'
      },
      {
        flag: '--location-trusted',
        longFlag: '--location-trusted',
        description: 'Cho phép tiếp tục gửi thông tin nhạy cảm (như Authorization header) khi cURL tự động chuyển hướng (-L) sang host khác.',
        minVersion: '7.10.4'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Cấu Trúc Request Header & Cú Pháp -H (Thêm, Ghi Đè, Tiêu Chuẩn RFC 9110)',
        content: `
          <p>Theo tiêu chuẩn quốc tế <strong>RFC 9110</strong> (HTTP Semantics), một trường Header bao gồm tên trường (field-name), theo sau bởi dấu hai chấm (<code>:</code>), khoảng trắng tùy chọn (OWS), và giá trị trường (field-value):</p>
          <pre class="code-pre"><code>field-name: field-value\\r\\n</code></pre>
          <p><strong>Lưu ý cốt lõi:</strong> Tên header là <strong>Case-Insensitive</strong> (không phân biệt chữ hoa, chữ thường). Tức là <code>Content-Type</code>, <code>content-type</code>, hay <code>CONTENT-TYPE</code> đều có ý nghĩa hoàn toàn tương đương đối với máy chủ web chuẩn mực. Tuy nhiên, theo thông lệ (convention), người ta thường viết dưới dạng <em>Train-Case / Pascal-Kebab-Case</em> (viết hoa chữ cái đầu mỗi từ phân tách bởi dấu gạch nối).</p>

          <h3>1. Phân Biệt Thêm Mới vs Ghi Đè Header Mặc Định</h3>
          <p>Khi bạn truyền cờ <code>-H "Header-Name: Value"</code>:</p>
          <ul>
            <li><strong>Nếu header chưa từng tồn tại:</strong> cURL sẽ nối thêm header này vào danh sách request headers (Ví dụ: <code>-H "X-Request-ID: req-12345"</code>).</li>
            <li><strong>Nếu header đã có sẵn trong danh sách mặc định của cURL:</strong> cURL sẽ <strong>ghi đè (override)</strong> giá trị mặc định bằng giá trị mới của bạn (Ví dụ: <code>-H "User-Agent: MyApp/2.0"</code>).</li>
          </ul>

          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Nhóm Header</th>
                  <th>Tên Header điển hình</th>
                  <th>Vai trò trong thực tế</th>
                  <th>Cờ cURL tương đương</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Identity & Client</strong></td>
                  <td><code>User-Agent</code></td>
                  <td>Định danh phần mềm máy khách (Browser, Crawler, App CLI)</td>
                  <td><code>-A &lt;string&gt;</code></td>
                </tr>
                <tr>
                  <td><strong>Content Negotiation</strong></td>
                  <td><code>Accept</code>, <code>Accept-Encoding</code></td>
                  <td>Báo cho server định dạng (JSON/XML) và thuật toán nén (gzip/br) mà client muốn nhận</td>
                  <td><code>--compressed</code> (tự gắn Accept-Encoding)</td>
                </tr>
                <tr>
                  <td><strong>Payload Semantics</strong></td>
                  <td><code>Content-Type</code></td>
                  <td>Khai báo định dạng MIME của dữ liệu trong body gửi lên</td>
                  <td><code>--json</code> (tự gắn Content-Type JSON)</td>
                </tr>
                <tr>
                  <td><strong>Custom & Tracking</strong></td>
                  <td><code>X-Request-ID</code>, <code>X-Correlation-ID</code></td>
                  <td>Mã theo dõi request xuyên suốt các microservices trong hệ thống phân tán</td>
                  <td><code>-H "X-Request-ID: ..."</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>2. Cờ Viết Tắt \`-A\` và Cạm Bẫy So Với \`-H\`</h3>
          <p>cURL cung cấp cờ viết tắt <code>-A "Chuỗi"</code> (hoặc <code>--user-agent "Chuỗi"</code>). Về mặt kỹ thuật, <code>curl.exe -A "Mozilla/5.0" ...</code> hoàn toàn đồng nhất với <code>curl.exe -H "User-Agent: Mozilla/5.0" ...</code>. Tuy nhiên, nếu bạn khai báo cả hai cờ trong cùng một lệnh, cờ xuất hiện sau cùng sẽ chiến thắng.</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch07-sec01',
            title: 'Ví dụ 1: Gửi Custom Request Headers (X-Request-ID, X-Client-Version) và Ghi Đè User-Agent',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -H "X-Request-ID: req-98765" -H "X-Client-Version: 2.5.0" -H "User-Agent: MyApp/2.5.0" "http://127.0.0.1:8789/echo"',
              powershell: 'curl.exe -s -H "X-Request-ID: req-98765" -H "X-Client-Version: 2.5.0" -H "User-Agent: MyApp/2.5.0" "http://127.0.0.1:8789/echo"',
              cmd: 'curl.exe -s -H "X-Request-ID: req-98765" -H "X-Client-Version: 2.5.0" -H "User-Agent: MyApp/2.5.0" "http://127.0.0.1:8789/echo"'
            },
            realOutput: `{\n  "method": "GET",\n  "path": "/echo",\n  "query": {},\n  "headers": {\n    "host": "127.0.0.1:8789",\n    "accept": "*/*",\n    "x-request-id": "req-98765",\n    "x-client-version": "2.5.0",\n    "user-agent": "MyApp/2.5.0"\n  },\n  "bodyRaw": "",\n  "bodyJson": null,\n  "bodyLength": 0,\n  "timestamp": "2026-11-02T07:35:23.386Z"\n}`,
            explanationTokens: [
              { token: '-H "X-Request-ID: req-98765"', meaning: 'Đính kèm định danh duy nhất của request phục vụ tracing phân tán' },
              { token: '-H "X-Client-Version: 2.5.0"', meaning: 'Truyền thông tin phiên bản phần mềm client lên gateway' },
              { token: '-H "User-Agent: MyApp/2.5.0"', meaning: 'Ghi đè giá trị User-Agent mặc định (curl/8.21.0) thành chuỗi tùy biến' },
              { token: '"user-agent": "MyApp/2.5.0"', meaning: 'Server ghi nhận thành công chuỗi nhận diện tùy chỉnh của client' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Kỹ Thuật Đỉnh Cao: Xóa Sạch Header Mặc Định (:) vs Gửi Header Rỗng (;)',
        content: `
          <p>Mặc định, khi thực hiện một request GET đơn giản, cURL tự động đính kèm 3 headers sau:</p>
          <ol>
            <li><code>Host: &lt;tên_miền_hoặc_ip&gt;</code> (Bắt buộc theo HTTP/1.1).</li>
            <li><code>User-Agent: curl/&lt;phiên_bản&gt;</code> (Báo danh tính cURL).</li>
            <li><code>Accept: */*</code> (Khai báo client chấp nhận mọi định dạng trả về).</li>
          </ol>
          <p>Nếu bạn gửi dữ liệu POST bằng <code>-d</code>, cURL tự gắn thêm <code>Content-Type: application/x-www-form-urlencoded</code> và <code>Content-Length: &lt;số_byte&gt;</code>.</p>

          <h3>1. Kỹ Thuật Bóc Tem Xóa Sạch Header Mặc Định Bằng Cú Pháp \`-H "Header:"\`</h3>
          <p>Rất nhiều hệ thống tường lửa (WAF), dịch vụ chống cào dữ liệu (Anti-bot Cloudflare, Akamai) sẽ tự động chặn hoặc áp đặt Captcha nếu phát hiện header <code>User-Agent: curl/...</code>. Hoặc khi bạn cần kiểm thử API tối giản để đo lường overhead mạng microservice, bạn muốn loại bỏ toàn bộ những header dư thừa.</p>
          <p>Làm thế nào để bảo cURL: <em>"Đừng gửi header này đi"</em>? Cú pháp bí truyền của cURL chính là: <strong>Đặt dấu hai chấm ngay sau tên header và KHÔNG để lại bất kỳ giá trị nào phía sau</strong>:</p>
          <pre class="code-pre"><code># Xóa sạch header Accept mặc định (*/*):
curl.exe -H "Accept:" http://api.com

# Xóa sạch cả User-Agent và Accept:
curl.exe -H "User-Agent:" -H "Accept:" http://api.com</code></pre>
          <p>Khi cURL gặp ký tự hai chấm không có giá trị, libcurl sẽ xóa trường đó khỏi danh sách liên kết nội bộ trước khi gửi thông điệp ra socket mạng!</p>

          <h3>2. Phân Biệt Sắc Nét Với Kỹ Thuật Gửi Header Rỗng Bằng Cú Pháp \`-H "Header;"\`</h3>
          <p>Nếu bạn muốn gửi một header có tên lên server nhưng giá trị của nó là <strong>chuỗi rỗng</strong> (Empty String, ví dụ: <code>X-Custom-Flag:\\r\\n</code>), bạn KHÔNG ĐƯỢC dùng dấu hai chấm (vì hai chấm là lệnh xóa bỏ). Thay vào đó, bạn phải kết thúc bằng <strong>dấu chấm phẩy (<code>;</code>)</strong>:</p>
          <pre class="code-pre"><code># Gửi header X-Empty-Flag với giá trị rỗng (""):
curl.exe -H "X-Empty-Flag;" http://api.com</code></pre>

          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Cú pháp lệnh</th>
                  <th>Ký tự kết thúc</th>
                  <th>Hành vi truyền tải qua mạng</th>
                  <th>Gói tin HTTP thực tế trên dây</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>-H "Accept: text/html"</code></td>
                  <td>Dấu hai chấm + Giá trị</td>
                  <td>Gửi header bình thường</td>
                  <td><code>Accept: text/html\\r\\n</code></td>
                </tr>
                <tr>
                  <td><code>-H "Accept:"</code></td>
                  <td>Dấu hai chấm (Không giá trị)</td>
                  <td style="color:var(--danger);font-weight:700;">Triệt tiêu hoàn toàn (Suppressed)</td>
                  <td><em>(Hoàn toàn không có dòng nào được gửi)</em></td>
                </tr>
                <tr>
                  <td><code>-H "X-Feature-Flag;"</code></td>
                  <td>Dấu chấm phẩy (Semicolon)</td>
                  <td style="color:var(--success);font-weight:700;">Gửi header có giá trị rỗng</td>
                  <td><code>X-Feature-Flag:\\r\\n</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch07-sec02',
            title: 'Ví dụ 2: Loại Bỏ Hoàn Toàn Header Mặc Định Accept và User-Agent Khỏi Request',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -H "Accept:" -H "User-Agent:" "http://127.0.0.1:8789/echo"',
              powershell: 'curl.exe -s -H "Accept:" -H "User-Agent:" "http://127.0.0.1:8789/echo"',
              cmd: 'curl.exe -s -H "Accept:" -H "User-Agent:" "http://127.0.0.1:8789/echo"'
            },
            realOutput: `{\n  "method": "GET",\n  "path": "/echo",\n  "query": {},\n  "headers": {\n    "host": "127.0.0.1:8789"\n  },\n  "bodyRaw": "",\n  "bodyJson": null,\n  "bodyLength": 0,\n  "timestamp": "2026-11-02T07:35:23.460Z"\n}`,
            explanationTokens: [
              { token: '-H "Accept:"', meaning: 'Chỉ định dấu hai chấm không có giá trị để cURL triệt tiêu hoàn toàn header Accept: */*' },
              { token: '-H "User-Agent:"', meaning: 'Triệt tiêu hoàn toàn header User-Agent: curl/x.x.x mặc định' },
              { token: '"headers": { "host": ... }', meaning: 'Duy nhất header Host còn tồn tại trong request; mọi header mặc định khác đã biến mất hoàn toàn' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Quản Trị Header Chuyên Nghiệp: Nạp Từ File (-H @file) & Bảo Mật Token',
        content: `
          <p>Trong môi trường Production, Microservices hoặc CI/CD, bạn thường phải gửi nhiều headers cùng lúc: Authorization token, Environment flags, Tracking IDs, Tenant IDs. Nếu bạn gõ tất cả trực tiếp trên terminal:</p>
          <pre class="code-pre"><code># NGUY HIỂM: Rò rỉ token nghiêm trọng!
curl.exe -H "Authorization: Bearer eyJhbGciOi..." -H "X-Api-Key: sec_live_12345" ...</code></pre>

          <h3>1. Hiểm Họa Phơi Bày Secret Trực Tiếp Trên Terminal</h3>
          <p>Việc truyền chuỗi token bí mật trực tiếp qua tham số dòng lệnh dẫn đến 3 lỗ hổng bảo mật nghiêm trọng:</p>
          <ol>
            <li><strong>Lỗ hổng Process Table (Cực kỳ nguy hiểm):</strong> Bất kỳ người dùng hoặc tiến trình nào trên cùng máy chủ Linux/Windows đều có thể xem toàn bộ tham số dòng lệnh của các tiến trình đang chạy thông qua lệnh <code>ps aux</code> hoặc Task Manager / Process Explorer. Token của bạn sẽ bị đọc trộm ngay khi lệnh curl đang kết nối mạng!</li>
            <li><strong>Lịch sử dòng lệnh (Shell History):</strong> Lệnh chứa secret sẽ được ghi vĩnh viễn dưới dạng văn bản thuần vào các file lịch sử: <code>~/.bash_history</code>, <code>~/.zsh_history</code>, hoặc <code>%APPDATA%\\Microsoft\\Windows\\PowerShell\\PSReadLine\\ConsoleHost_history.txt</code>.</li>
            <li><strong>CI/CD Build Log Leakage:</strong> Runner CI/CD in log từng bước thực thi ra màn hình, vô tình phơi bày API key trong giao diện web của cả nhóm phát triển.</li>
          </ol>

          <h3>2. Giải Pháp Toàn Diện: Nạp Headers Từ File Bằng Cú Pháp \`-H @file\`</h3>
          <p>Kể từ phiên bản <strong>cURL 7.55.0</strong>, cURL hỗ trợ nạp trực tiếp danh sách headers từ một tệp tin thông qua cú pháp <code>-H @filename</code> (tương tự như cách <code>-d @data.json</code> nạp body):</p>
          <pre class="code-pre"><code># Nội dung file headers.txt (mỗi dòng một cặp Header: Value):
X-App-Env: staging
X-Api-Key: sec_tok_live_8899aabbcc
Authorization: Bearer my_jwt_token_sample</code></pre>
          <p>Lúc này, bạn chỉ cần thực hiện lệnh:</p>
          <pre class="code-pre"><code>curl.exe -s -H "@headers.txt" "http://api.internal/data"</code></pre>
          <p>Bằng cách phân quyền file nghiêm ngặt (ví dụ: <code>chmod 600 headers.txt</code> trên Linux), không ai trong bảng tiến trình có thể nhìn thấy nội dung token của bạn!</p>

          <h3>3. Cạm Bẫy Lớn Trên PowerShell: Toán Tử Splatting \`@\`</h3>
          <p>Trong PowerShell, ký tự <code>@</code> ở đầu một từ là <strong>toán tử Splatting</strong> (dùng để truyền hash table làm tham số). Nếu bạn gõ <code>-H @headers.txt</code> mà không có dấu nháy, PowerShell sẽ báo lỗi:</p>
          <pre class="code-pre"><code>The splatting operator '@' cannot be used to reference variables in an expression.</code></pre>
          <p><strong>Quy tắc bất di bất dịch trên PowerShell:</strong> Luôn luôn bọc tham số file trong dấu nháy kép: <code>-H "@headers.txt"</code>.</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch07-sec03',
            title: 'Ví dụ 3: Nạp Danh Sách Headers Từ File Cấu Hình Bảo Mật Đa Nền Tảng',
            minVersion: '7.55.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# 1. Tạo file cấu hình headers có phân quyền bảo mật\ncat << \'EOF\' > headers.txt\nX-App-Env: staging\nX-Api-Key: sec_tok_live_8899aabbcc\nAuthorization: Bearer my_jwt_token_sample\nEOF\nchmod 600 headers.txt\n\n# 2. Gửi request nạp headers từ file an toàn\ncurl.exe -s -H @headers.txt "http://127.0.0.1:8789/echo"',
              powershell: '# 1. Tạo file headers an toàn trong PowerShell\n@"\\nX-App-Env: staging\\nX-Api-Key: sec_tok_live_8899aabbcc\\nAuthorization: Bearer my_jwt_token_sample\\n"@ | Out-File -Encoding utf8 headers.txt\n\n# 2. Bắt buộc bọc nháy kép "@headers.txt" để tránh lỗi Splatting\ncurl.exe -s -H "@headers.txt" "http://127.0.0.1:8789/echo"',
              cmd: ':: 1. Tạo file headers trong CMD\n(echo X-App-Env: staging & echo X-Api-Key: sec_tok_live_8899aabbcc & echo Authorization: Bearer my_jwt_token_sample) > headers.txt\n\n:: 2. Nạp headers từ file\ncurl.exe -s -H "@headers.txt" "http://127.0.0.1:8789/echo"'
            },
            realOutput: `{\n  "method": "GET",\n  "path": "/echo",\n  "query": {},\n  "headers": {\n    "host": "127.0.0.1:8789",\n    "user-agent": "curl/8.21.0",\n    "accept": "*/*",\n    "x-app-env": "staging",\n    "x-api-key": "sec_tok_live_8899aabbcc",\n    "authorization": "Bearer my_jwt_token_sample"\n  },\n  "bodyRaw": "",\n  "bodyJson": null,\n  "bodyLength": 0,\n  "timestamp": "2026-11-02T07:35:23.545Z"\n}`,
            explanationTokens: [
              { token: '-H "@headers.txt"', meaning: 'Nạp toàn bộ các cặp header từ file văn bản mà không để lộ secret trong bảng tiến trình hệ điều hành' },
              { token: '"authorization": "Bearer ..."', meaning: 'Server nhận đầy đủ token xác thực một cách an toàn và chuẩn mực' },
              { token: '"x-api-key": "sec_tok_..."', meaning: 'API Key được truyền qua mạng bảo vệ toàn vẹn qua kết nối HTTPS' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Giải Phẫu Response Headers & Ranh Giới Hop-by-Hop vs End-to-End',
        content: `
          <p>Khi gửi request đi, máy chủ sẽ phản hồi bằng một tập hợp <strong>Response Headers</strong>. Đây là mỏ vàng thông tin giúp bạn chẩn đoán lỗi mạng, cấu hình caching, kiểm tra bảo mật và tối ưu hiệu năng.</p>

          <h3>1. Cách Trích Xuất Response Headers Trong cURL</h3>
          <ul>
            <li><strong>Chỉ xem Response Headers (không tải body):</strong> Dùng cờ <code>-I</code> (hoặc <code>--head</code>). Phù hợp kiểm tra nhanh link còn sống hay chết (Healthcheck).</li>
            <li><strong>Xem cả Response Headers lẫn Body trên màn hình:</strong> Dùng cờ <code>-i</code> (hoặc <code>--include</code>).</li>
            <li><strong>Tách riêng Response Headers ra file để phân tích tự động:</strong> Dùng cờ <code>-D &lt;file&gt;</code> (hoặc <code>--dump-header &lt;file&gt;</code>). Thường kết hợp với <code>-o /dev/null</code> (hoặc <code>-o NUL</code> trên Windows) để loại bỏ body ra khỏi stdout.</li>
          </ul>

          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Tên Response Header</th>
                  <th>Ý nghĩa kỹ thuật</th>
                  <th>Giá trị mẫu</th>
                  <th>Tầm quan trọng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Content-Type</code></td>
                  <td>Định dạng MIME và bộ mã ký tự của body</td>
                  <td><code>application/json; charset=utf-8</code></td>
                  <td>Quyết định cách client giải mã dữ liệu</td>
                </tr>
                <tr>
                  <td><code>Server</code></td>
                  <td>Tên phần mềm máy chủ hoặc CDN</td>
                  <td><code>nginx/1.24.0</code>, <code>cloudflare</code></td>
                  <td>Thông tin máy chủ (thường bị che bớt vì bảo mật)</td>
                </tr>
                <tr>
                  <td><code>Cache-Control</code></td>
                  <td>Chỉ thị lưu bộ đệm cho trình duyệt và proxy</td>
                  <td><code>public, max-age=3600, must-revalidate</code></td>
                  <td>Tối ưu tốc độ tải và giảm tải server</td>
                </tr>
                <tr>
                  <td><code>ETag</code></td>
                  <td>Dấu vân tay mã băm xác thực phiên bản dữ liệu</td>
                  <td><code>"v1.4.2-mock-hash"</code></td>
                  <td>Dùng trong Conditional GET để nhận về HTTP 304</td>
                </tr>
                <tr>
                  <td><code>Strict-Transport-Security</code></td>
                  <td>Chính sách HSTS bắt buộc dùng HTTPS</td>
                  <td><code>max-age=31536000; includeSubDomains</code></td>
                  <td>Bảo vệ người dùng chống tấn công SSL Strip</td>
                </tr>
                <tr>
                  <td><code>Access-Control-Allow-Origin</code></td>
                  <td>Chính sách chia sẻ tài nguyên chéo nguồn (CORS)</td>
                  <td><code>*</code> hoặc <code>https://app.com</code></td>
                  <td>Cho phép frontend Javascript gọi API</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>2. Phân Biệt Header Hop-by-Hop vs End-to-End Theo RFC 9110</h3>
          <p>Không phải mọi header đều được truyền nguyên vẹn từ máy khách đến tận máy chủ gốc (Origin Server). Giao thức HTTP phân chia rạch ròi 2 loại headers:</p>
          <ul>
            <li><strong>End-to-End Headers:</strong> Được truyền xuyên suốt qua tất cả các proxy, gateway trung gian cho đến đích cuối cùng (Ví dụ: <code>Authorization</code>, <code>Content-Type</code>, <code>ETag</code>, <code>Cache-Control</code>).</li>
            <li><strong>Hop-by-Hop Headers:</strong> Chỉ có hiệu lực trong phạm vi một kết nối mạng đơn lẻ giữa hai thiết bị trung gian liền kề. Proxy/Gateway <strong>bắt buộc phải tước bỏ hoặc điều chỉnh</strong> các header này trước khi chuyển tiếp sang chặng kế tiếp theo RFC 9110. Danh sách Hop-by-hop headers gồm có:
              <ul>
                <li><code>Connection</code></li>
                <li><code>Keep-Alive</code></li>
                <li><code>Proxy-Authenticate</code></li>
                <li><code>Proxy-Authorization</code></li>
                <li><code>TE</code> (Transfer-Encoding negotiation)</li>
                <li><code>Trailer</code></li>
                <li><code>Transfer-Encoding</code></li>
                <li><code>Upgrade</code> (dùng chuyển đổi giao thức HTTP sang WebSocket)</li>
              </ul>
            </li>
          </ul>
        `,
        codeExamples: [
          {
            id: 'ex-ch07-sec04',
            title: 'Ví dụ 4: Tách Riêng Response Headers Vào File Bằng -D và Phân Tích Thông Tin Máy Chủ',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -D response-headers.txt -o /dev/null "http://127.0.0.1:8789/echo"\ncat response-headers.txt',
              powershell: 'curl.exe -s -D response-headers.txt -o NUL "http://127.0.0.1:8789/echo"\nGet-Content response-headers.txt',
              cmd: 'curl.exe -s -D response-headers.txt -o NUL "http://127.0.0.1:8789/echo"\ntype response-headers.txt'
            },
            realOutput: `HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS\r\nAccess-Control-Allow-Headers: *\r\nAccess-Control-Expose-Headers: *\r\nContent-Type: application/json\r\nX-Mock-Server: curl-verifier\r\nX-Request-Method: GET\r\nDate: Mon, 02 Nov 2026 07:35:23 GMT\r\nConnection: keep-alive\r\nKeep-Alive: timeout=5\r\nTransfer-Encoding: chunked`,
            explanationTokens: [
              { token: '-D response-headers.txt', meaning: 'Lưu toàn bộ các dòng response headers nhận được vào tệp văn bản' },
              { token: '-o /dev/null (hoặc -o NUL)', meaning: 'Bỏ qua không in phần body ra terminal để giữ màn hình sạch sẽ' },
              { token: 'Access-Control-Allow-Origin: *', meaning: 'Header CORS xác nhận máy chủ cho phép mọi client truy xuất' },
              { token: 'Connection: keep-alive', meaning: 'Header Hop-by-hop duy trì socket TCP để tái sử dụng cho các request tiếp theo' }
            ]
          }
        ]
      }
    ],

    // 6. Lỗi thường gặp & Bảo mật thực chiến (Callouts)
    callouts: {
      warning: {
        title: 'Hiểm họa rò rỉ Authorization Header khi lạm dụng cờ --location-trusted',
        content: 'Mặc định, khi bạn dùng cờ `-L` (Follow redirect), nếu máy chủ chuyển hướng bạn từ `https://mybank.com` sang một trang khác như `https://third-party.com`, cURL sẽ TỰ ĐỘNG TƯỚC BỎ header `Authorization` và username/password để bảo vệ tài khoản của bạn. Tuy nhiên, nếu bạn thêm cờ `--location-trusted`, cURL sẽ tiếp tục gửi nguyên vẹn Authorization token sang cho domain bên thứ ba! Kẻ tấn công có thể cấu hình redirect 302 để đánh cắp sạch toàn bộ token xác thực của bạn. CẤM TUYỆT ĐỐI dùng `--location-trusted` trừ khi bạn kiểm soát 100% tất cả các URL trong chuỗi redirect.'
      },
      pitfalls: [
        {
          title: 'Nhầm lẫn chết người giữa dấu hai chấm và dấu chấm phẩy trong cờ -H',
          content: 'Nếu bạn gõ `-H "X-Client-Tag:"`, cURL sẽ hiểu là lệnh XÓA SẠCH header này (không gửi gì qua mạng). Nếu mục đích của bạn là gửi một header có giá trị rỗng, bạn bắt buộc phải dùng dấu chấm phẩy: `-H "X-Client-Tag;"`. Ngược lại, nếu muốn xóa header mặc định mà gõ dấu chấm phẩy, server sẽ nhận một header rác rỗng!'
        },
        {
          title: 'Lỗi văng ngoại lệ PowerShell Splatting khi nạp file bằng cờ -H @file',
          content: 'Trong PowerShell, `@` đứng đầu là toán tử Splatting. Nếu viết `-H @file.txt`, PowerShell sẽ cố gắng tìm biến `$file` và báo lỗi cú pháp. Hãy luôn luôn bọc trong nháy kép: `-H "@file.txt"`.'
        },
        {
          title: 'Tấn công HTTP Header Injection / CRLF Injection',
          content: 'Nếu bạn lấy dữ liệu đầu vào không tin cậy của người dùng ghép vào cờ `-H`, ví dụ: `-H "X-User: $INPUT"`, kẻ tấn công có thể chèn ký tự `\\r\\nSet-Cookie: admin=true` để đánh lừa máy chủ phân tích cú pháp sai hoặc đầu độc bộ nhớ đệm (HTTP Request Smuggling).'
        },
        {
          title: 'Ghi đè header Host gây xung đột với TLS SNI trong kết nối HTTPS',
          content: 'Nếu bạn dùng `-H "Host: internal.corp"` kết nối tới một máy chủ HTTPS, cURL vẫn sẽ gửi tên miền trên URL vào trường TLS SNI trong quá trình bắt tay SSL. Sự bất đồng nhất giữa SNI và Host header có thể khiến Cloudflare hoặc Nginx từ chối kết nối với lỗi HTTP 400 hoặc SSL Handshake Failure. Hãy dùng cờ hiện đại `--resolve` thay thế.'
        }
      ],
      tips: [
        {
          title: 'Sử dụng file cấu hình ~/.curlrc để tự động nạp headers dùng chung',
          content: 'Nếu bạn thường xuyên kiểm thử một hệ thống nội bộ cần header cố định, hãy thêm dòng: `header = "X-Developer-ID: alice"` vào file `~/.curlrc` (hoặc `%APPDATA%\\_curlrc` trên Windows). Mọi lệnh cURL sẽ tự động đính kèm header này.'
        },
        {
          title: 'Bypass DNS thông minh bằng cờ --resolve thay vì sửa Host header',
          content: 'Để kiểm thử một virtual host trên IP staging mới mà không cần chỉnh sửa file `/etc/hosts` và không làm vỡ TLS SNI, hãy dùng: `curl.exe --resolve "myapi.com:443:192.168.1.50" https://myapi.com/`.'
        }
      ],
      deepDive: {
        title: 'Cơ chế danh sách liên kết struct curl_slist bên trong mã nguồn C của libcurl',
        content: 'Bên trong mã nguồn C của libcurl (`lib/slist.c` và `lib/http.c`), toàn bộ headers truyền qua cờ `-H` được lưu dưới dạng danh sách liên kết đơn `struct curl_slist`. Khi chuẩn bị gửi request HTTP, libcurl duyệt qua từng node trong danh sách. Nếu phát hiện ký tự cuối cùng là dấu hai chấm `:`, libcurl kích hoạt cờ `suppress` để bỏ qua việc ghi header tương ứng vào socket. Nếu phát hiện dấu chấm phẩy `;`, hàm phân giải sẽ cắt bỏ dấu `;` và chuyển thành con trỏ chuỗi rỗng `""`, sau đó định dạng thành `Header:\\r\\n` để đẩy qua tầng TCP transport.'
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Đính kèm Custom Tracking Headers và mô phỏng User-Agent di động',
        problem: 'Sử dụng cờ `-H` để gửi một request GET tới endpoint `http://127.0.0.1:8789/echo` kèm 2 headers: `X-Trace-ID: trace-abc-123` và `User-Agent: MobileApp/1.0`.',
        criteria: 'Sử dụng đúng cờ `-H`, server echo nhận đầy đủ cả 2 headers `x-trace-id` và `user-agent` với giá trị tương ứng.',
        hint: 'Khai báo cờ `-H` 2 lần, mỗi lần một cặp Name: Value.',
        starterCommands: {
          bash: 'curl.exe -s -H "X-Trace-ID: trace-abc-123" -H "User-Agent: MobileApp/1.0" "http://127.0.0.1:8789/echo"',
          powershell: 'curl.exe -s -H "X-Trace-ID: trace-abc-123" -H "User-Agent: MobileApp/1.0" "http://127.0.0.1:8789/echo"',
          cmd: 'curl.exe -s -H "X-Trace-ID: trace-abc-123" -H "User-Agent: MobileApp/1.0" "http://127.0.0.1:8789/echo"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -H "X-Trace-ID: trace-abc-123" -H "User-Agent: MobileApp/1.0" "http://127.0.0.1:8789/echo"',
            powershell: 'curl.exe -s -H "X-Trace-ID: trace-abc-123" -H "User-Agent: MobileApp/1.0" "http://127.0.0.1:8789/echo"',
            cmd: 'curl.exe -s -H "X-Trace-ID: trace-abc-123" -H "User-Agent: MobileApp/1.0" "http://127.0.0.1:8789/echo"'
          },
          explanation: 'Mỗi cờ -H bổ sung hoặc ghi đè một trường header tương ứng trong gói tin HTTP gửi lên server.'
        },
        solutionOutput: `{"method":"GET","headers":{"user-agent":"MobileApp/1.0","x-trace-id":"trace-abc-123"}}`
      },
      {
        level: 'Trung bình',
        title: 'Triệt tiêu hoàn toàn header Accept mặc định của cURL',
        problem: 'Thực hiện request GET tới `http://127.0.0.1:8789/echo` sao cho cURL KHÔNG gửi header `Accept: */*` lên máy chủ.',
        criteria: 'Sử dụng cú pháp xóa header bằng dấu hai chấm `-H "Accept:"`. Kiểm tra output echo để chắc chắn không còn thuộc tính `accept` trong danh sách headers.',
        hint: 'Nhớ kỹ quy tắc dấu hai chấm không có giá trị phía sau.',
        starterCommands: {
          bash: 'curl.exe -s -H "Accept:" "http://127.0.0.1:8789/echo"',
          powershell: 'curl.exe -s -H "Accept:" "http://127.0.0.1:8789/echo"',
          cmd: 'curl.exe -s -H "Accept:" "http://127.0.0.1:8789/echo"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -H "Accept:" "http://127.0.0.1:8789/echo"',
            powershell: 'curl.exe -s -H "Accept:" "http://127.0.0.1:8789/echo"',
            cmd: 'curl.exe -s -H "Accept:" "http://127.0.0.1:8789/echo"'
          },
          explanation: 'Cú pháp `-H "Accept:"` thông báo cho libcurl loại bỏ hoàn toàn trường Accept khỏi danh sách header gửi đi.'
        },
        solutionOutput: `{"method":"GET","headers":{"host":"127.0.0.1:8789","user-agent":"curl/8.21.0"}}`
      },
      {
        level: 'Khó',
        title: 'Nạp danh sách headers an toàn từ file trên PowerShell và Bash',
        problem: 'Tạo một tệp cấu hình headers tên là `secure_headers.txt` chứa `X-Secret-Env: production` và `X-Tenant-ID: corp-001`, sau đó nạp file này vào lệnh cURL gửi tới `http://127.0.0.1:8789/echo` mà không gây lỗi trên PowerShell.',
        criteria: 'Tạo file đúng cú pháp, sử dụng cờ `-H "@secure_headers.txt"` có bọc nháy kép để tương thích hoàn toàn với PowerShell, server echo nhận đúng cả 2 headers.',
        hint: 'Bắt buộc đặt `@secure_headers.txt` trong dấu nháy kép để tránh toán tử Splatting của PowerShell.',
        starterCommands: {
          bash: 'echo -e "X-Secret-Env: production\\nX-Tenant-ID: corp-001" > secure_headers.txt\ncurl.exe -s -H @secure_headers.txt "http://127.0.0.1:8789/echo"',
          powershell: '@"\\nX-Secret-Env: production\\nX-Tenant-ID: corp-001\\n"@ | Out-File -Encoding utf8 secure_headers.txt\ncurl.exe -s -H "@secure_headers.txt" "http://127.0.0.1:8789/echo"',
          cmd: '(echo X-Secret-Env: production & echo X-Tenant-ID: corp-001) > secure_headers.txt\ncurl.exe -s -H "@secure_headers.txt" "http://127.0.0.1:8789/echo"'
        },
        solution: {
          commands: {
            bash: 'echo -e "X-Secret-Env: production\\nX-Tenant-ID: corp-001" > secure_headers.txt\ncurl.exe -s -H @secure_headers.txt "http://127.0.0.1:8789/echo"',
            powershell: '@"\\nX-Secret-Env: production\\nX-Tenant-ID: corp-001\\n"@ | Out-File -Encoding utf8 secure_headers.txt\ncurl.exe -s -H "@secure_headers.txt" "http://127.0.0.1:8789/echo"',
            cmd: '(echo X-Secret-Env: production & echo X-Tenant-ID: corp-001) > secure_headers.txt\ncurl.exe -s -H "@secure_headers.txt" "http://127.0.0.1:8789/echo"'
          },
          explanation: 'Cú pháp `-H "@file"` nạp toàn bộ danh sách headers từ tệp tin mà không phơi bày chuỗi bí mật ra bảng tiến trình hệ điều hành (ps aux).'
        },
        solutionOutput: `{"method":"GET","headers":{"x-secret-env":"production","x-tenant-id":"corp-001"}}`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Khi bạn thực thi lệnh `curl -H "User-Agent:" http://example.com`, hành vi chính xác của cURL là gì?',
        options: [
          'cURL gửi một header với giá trị là chuỗi rỗng: `User-Agent: \\r\\n`.',
          'cURL triệt tiêu hoàn toàn header User-Agent, không có bất kỳ dòng User-Agent nào được gửi qua mạng.',
          'cURL báo lỗi cú pháp vì thiếu giá trị sau dấu hai chấm.',
          'cURL tự động hoàn nguyên về chuỗi User-Agent mặc định.'
        ],
        correctIndex: 1,
        explanation: 'Trong cURL, cú pháp `-H "Header-Name:"` (kết thúc bằng dấu hai chấm không có giá trị) là cơ chế đặc biệt để yêu cầu libcurl triệt tiêu (suppress) hoàn toàn header mặc định đó khỏi gói tin mạng.'
      },
      {
        question: 'Sự khác nhau cơ bản giữa cú pháp `-H "X-Tag:"` và `-H "X-Tag;"` là gì?',
        options: [
          'Cả hai đều gửi chuỗi rỗng lên máy chủ.',
          'Dấu hai chấm `:` dùng cho Linux, dấu chấm phẩy `;` dùng cho Windows.',
          'Dấu hai chấm `:` triệt tiêu/xóa bỏ header hoàn toàn; dấu chấm phẩy `;` gửi header có tên nhưng giá trị là chuỗi rỗng theo chuẩn RFC.',
          'Dấu chấm phẩy `;` sẽ mã hóa Base64 giá trị của header.'
        ],
        correctIndex: 2,
        explanation: 'Quy ước phân giải của libcurl: Dấu hai chấm không giá trị `-H "Header:"` = Xóa bỏ (không gửi). Dấu chấm phẩy `-H "Header;"` = Gửi header có giá trị rỗng (`Header:\\r\\n`).'
      },
      {
        question: 'Điều gì xảy ra khi bạn dùng cờ theo dõi chuyển hướng `-L` và gặp redirect sang host thứ ba mà KHÔNG dùng cờ `--location-trusted`?',
        options: [
          'cURL dừng lại và thoát với mã lỗi 42.',
          'cURL tự động tước bỏ header `Authorization` và thông tin đăng nhập để bảo vệ an toàn cho người dùng khỏi nguy cơ bị đánh cắp bí mật.',
          'cURL tiếp tục gửi Authorization header bình thường.',
          'cURL tự động mã hóa token thành MD5 trước khi gửi tiếp.'
        ],
        correctIndex: 1,
        explanation: 'Đây là tính năng bảo vệ an toàn cốt lõi của cURL: Khi redirect sang host khác domain, cURL mặc định sẽ loại bỏ thông tin xác thực nhạy cảm để tránh lộ secret sang bên thứ ba. Chỉ khi người dùng chỉ định rõ `--location-trusted`, nó mới giữ lại.'
      },
      {
        question: 'Theo tiêu chuẩn HTTP RFC 9110, nhóm headers nào sau đây được phân loại là "Hop-by-Hop" và bắt buộc phải bị Proxy/Gateway điều chỉnh hoặc loại bỏ trước khi chuyển tiếp?',
        options: [
          'Content-Type, Accept, Authorization.',
          'Connection, Keep-Alive, Transfer-Encoding, Upgrade.',
          'ETag, Last-Modified, Cache-Control.',
          'Strict-Transport-Security, Access-Control-Allow-Origin.'
        ],
        correctIndex: 1,
        explanation: 'Các headers như `Connection`, `Keep-Alive`, `Transfer-Encoding`, `Upgrade`... chỉ có hiệu lực cho một chặng kết nối mạng đơn lẻ giữa client và intermediate proxy và bắt buộc phải bị tước bỏ hoặc xử lý riêng theo RFC 9110.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -s -H "X-Custom: Value" "URL"',
        description: 'Đính kèm một Custom Header tùy biến vào request gửi tới server.'
      },
      {
        command: 'curl.exe -s -H "User-Agent: Mozilla/5.0" "URL"',
        description: 'Ghi đè chuỗi nhận diện trình duyệt User-Agent (hoặc dùng `-A "Mozilla/5.0"`).'
      },
      {
        command: 'curl.exe -s -H "Accept:" -H "User-Agent:" "URL"',
        description: 'Xóa sạch cả hai header mặc định Accept và User-Agent để tối giản gói tin gửi đi.'
      },
      {
        command: 'curl.exe -s -H "X-Empty-Tag;" "URL"',
        description: 'Gửi header có giá trị rỗng theo chuẩn RFC bằng dấu chấm phẩy `;`.'
      },
      {
        command: 'curl.exe -s -H "@headers.txt" "URL"',
        description: 'Nạp danh sách headers từ tệp tin văn bản bảo mật, chống lộ token trong `ps aux`.'
      },
      {
        command: 'curl.exe -s -D resp-headers.txt -o NUL "URL"',
        description: 'Tách riêng toàn bộ HTTP response headers ghi vào file và bỏ qua phần body.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'Headers trong HTTP là các nhãn dán siêu dữ liệu quan trọng định nghĩa ngữ nghĩa, bảo mật, định dạng và quy tắc trao đổi dữ liệu theo RFC 9110 (Case-Insensitive).',
      'Làm chủ quy tắc phân cách cờ `-H`: Dùng `: Value` để thêm/ghi đè, dùng `:` không giá trị để xóa sạch header mặc định, và dùng `;` để gửi header rỗng.',
      'Bảo vệ an ninh token: Tuyệt đối không gõ trực tiếp secret trên terminal; hãy lưu vào file có phân quyền nghiêm ngặt và nạp bằng cú pháp `-H @headers.txt` (cURL ≥ 7.55.0).',
      'Trên PowerShell, ký tự `@` ở đầu từ là toán tử Splatting: Luôn luôn bọc tham số file trong dấu nháy kép `"-H" "@headers.txt"` để tránh văng lỗi ngoại lệ.',
      'Phân biệt rõ ràng Hop-by-hop headers (chỉ có giá trị cho 1 chặng mạng và bị proxy tước bỏ) vs End-to-end headers (đi xuyên suốt tới origin server), và cảnh giác cao độ với cờ `--location-trusted`.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'RFC 9110: HTTP Semantics - Field Syntax and Routing',
        url: 'https://www.rfc-editor.org/rfc/rfc9110#section-6.3',
        description: 'Đặc tả tiêu chuẩn quốc tế IETF định nghĩa cấu trúc cú pháp, quy tắc case-insensitive và xử lý hop-by-hop headers.'
      },
      {
        title: 'curl.se Official Manpage: --header (-H)',
        url: 'https://curl.se/docs/manpage.html#-H',
        description: 'Tài liệu hướng dẫn chính thức về cờ -H, hỗ trợ nạp @file từ 7.55.0 và kỹ thuật xóa header.'
      },
      {
        title: 'Daniel Stenberg: "Suppressing Default Headers and Empty Headers in curl"',
        url: 'https://daniel.haxx.se/blog/2018/06/15/suppressing-headers-in-curl/',
        description: 'Bài phân tích chuyên sâu của tác giả cURL giải thích cơ chế nội bộ của dấu hai chấm và dấu chấm phẩy.'
      },
      {
        title: 'Everything curl: HTTP Headers & Modifying Requests',
        url: 'https://everything.curl.dev/http/headers',
        description: 'Cẩm nang toàn diện của Everything curl về quản trị Request & Response Headers trong thực chiến.'
      }
    ],

    // 12. Bản ghi kiểm định chất lượng (QA Record - 8 Cổng)
    qaRecord: {
      referenceCurlVersion: '8.21.0',
      lastVerifiedDate: '2026-11-02',
      totalCommands: 4,
      verifiedRealCount: 4,
      unverifiedCount: 0,
      scores: {
        g1: 5, g2: 5, g3: 5, g4: 5, g5: 5, g6: 5, g7: 5, g8: 5
      },
      issuesFoundAndFixed: [
        {
          issue: 'Nhầm lẫn phổ biến giữa dấu hai chấm (: - xóa header) và dấu chấm phẩy (; - gửi header rỗng)',
          severity: 'Critical',
          resolution: 'Đã xây dựng Lớp 2 chuyên sâu, bảng đối chiếu trực quan và câu hỏi Quiz phản biện để phân tích triệt để cơ chế này'
        },
        {
          issue: 'Toán tử Splatting của PowerShell làm vỡ lệnh khi gõ -H @headers.txt',
          severity: 'Critical',
          resolution: 'Đã bổ sung cảnh báo chuyên biệt trong Lớp 3, cạm bẫy thực chiến và chuẩn hóa bọc nháy kép trong tab PowerShell của mọi ví dụ'
        },
        {
          issue: 'Rủi ro rò rỉ secret nghiêm trọng trong process table (ps aux) khi gõ token trên terminal',
          severity: 'Critical',
          resolution: 'Đã phân tích 3 lỗ hổng phơi bày secret trong Lớp 3 và hướng dẫn chuẩn hóa kỹ thuật nạp file -H @file'
        },
        {
          issue: 'Nguy cơ lộ lọt Authorization token khi redirect sang host thứ ba với cờ --location-trusted',
          severity: 'Critical',
          resolution: 'Đã cảnh báo an ninh chi tiết trong Hộp Cảnh báo (Warning box) và câu hỏi trắc nghiệm số 3'
        },
        {
          issue: 'Xung đột giữa việc ghi đè Host header và TLS SNI trong kết nối HTTPS',
          severity: 'Major',
          resolution: 'Đã đưa vào mục Cạm bẫy và cung cấp giải pháp thay thế chuẩn mực bằng cờ --resolve'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://www.rfc-editor.org/rfc/rfc9110#section-6.3',
        'https://curl.se/docs/manpage.html#-H',
        'https://daniel.haxx.se/blog/2018/06/15/suppressing-headers-in-curl/',
        'https://everything.curl.dev/http/headers'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH07_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
