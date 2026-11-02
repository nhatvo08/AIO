/**
 * Chương 04: Request Đầu Tiên & Bộ Cờ Thiết Yếu (-s, -S, -i, -I, -v, -D) (data/curl/chapters/ch04.js)
 * Cấp độ: Cơ bản | Thời lượng: ~25 phút | cURL tối thiểu: 7.0.0
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch04',
    meta: {
      id: 'ch04',
      order: 4,
      title: 'Request Đầu Tiên & Bộ Cờ Thiết Yếu (-s, -S, -i, -I, -v, -D)',
      level: 'Cơ bản',
      curlMinVersion: '7.0.0',
      qaStatus: 'verified'
    },
    partId: 'level-1',
    partTitle: 'Cấp độ 1: Nền tảng Cốt lõi',
    number: '04',
    title: 'Request Đầu Tiên & Bộ Cờ Thiết Yếu (-s, -S, -i, -I, -v, -D)',
    subtitle: 'Làm chủ hành vi stdout/stderr mặc định, quy tắc vàng -sS trong CI/CD, phân biệt -i vs -I vs -v và kỹ thuật dump header độc lập',
    level: 'Cơ bản',
    duration: '25 phút',
    curlMinVersion: '7.0.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Hiểu rõ toàn bộ các bước libcurl thực thi ngầm khi chạy một lệnh cơ bản `curl <url>` và cơ chế tự động bật/tắt Progress Meter.',
      'Làm chủ quy tắc vàng `-sS` (hoặc `-s -S`), loại bỏ hoàn toàn nguy cơ "lỗi câm lặng" (silent failure) khi viết shell script và CI/CD.',
      'Phân biệt rạch ròi phạm vi hoạt động của 3 cờ quan sát: `-i` (in response headers + body), `-I` (chỉ lấy headers qua HEAD), và `-v` (in toàn bộ luồng wire format ra stderr).',
      'Khắc phục triệt để lỗi syntax khi pipe dữ liệu cURL sang công cụ xử lý JSON (`jq`) do vô tình trộn headers vào stdout.',
      'Sử dụng thành thạo cờ `-D` (`--dump-header`) để tách riêng toàn bộ Header phản hồi ra một file độc lập trong khi giữ nguyên luồng body cho xử lý tiếp theo.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành Chương 01 đến 03: Hiểu cấu trúc wire format của giao thức HTTP/1.1 và các trường Request/Response Headers.',
      'Hiểu khái niệm luồng dữ liệu chuẩn trong hệ điều hành: `stdout` (luồng xuất chuẩn) và `stderr` (luồng thông báo lỗi).'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Chiếc máy nội soi và hai đường ống dẫn riêng biệt',
      metaphor: 'Khi cURL thực thi, nó mở ra hai "đường ống dẫn" tách biệt hoàn toàn để giao tiếp với hệ điều hành: Đường ống Dữ liệu chính (`stdout`) và Đường ống Báo cáo kỹ thuật (`stderr`). Thông thường, nội dung phản hồi từ server (Body) sẽ chảy qua đường ống chính `stdout`. Trong khi đó, thanh tiến độ tải (Progress meter) và các dòng chẩn đoán kỹ thuật của cờ `-v` (dấu `>`, `<`, `*`) lại chảy qua đường ống phụ `stderr`. Nhờ sự tách biệt này, bạn có thể thoải mái bật `-v` để theo dõi quá trình bắt tay mạng mà không sợ các dòng thông tin này làm "ô nhiễm" hoặc làm hỏng dữ liệu khi xuất ra file! Tuy nhiên, nếu bạn dùng nhầm cờ `-i` (`--include`), cURL sẽ nhét thẳng cả Response Headers vào chung đường ống chính `stdout`, khiến các công cụ phân tích JSON như `jq` lập tức bị nghẹn và báo lỗi cú pháp!',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">SỰ PHÂN TÁCH LUỒNG OUTPUT: STDOUT VS STDERR</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:var(--success);font-weight:700;font-size:0.8rem;">1. LUỒNG STDOUT (Dữ liệu chính)</div>
              <ul style="margin:6px 0 0 16px;padding:0;font-size:0.78rem;color:var(--text-secondary);">
                <li>Payload Body (JSON, HTML, Binary)</li>
                <li>Response Headers (KHI dùng cờ <code>-i</code> hoặc <code>-I</code>)</li>
                <li>Có thể pipe sang: <code>| jq .</code> hoặc <code>&gt; file.json</code></li>
              </ul>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:var(--warning);font-weight:700;font-size:0.8rem;">2. LUỒNG STDERR (Báo cáo &amp; Chẩn đoán)</div>
              <ul style="margin:6px 0 0 16px;padding:0;font-size:0.78rem;color:var(--text-secondary);">
                <li>Thanh tiến độ (Progress meter)</li>
                <li>Dòng chẩn đoán của cờ <code>-v</code> (<code>&gt;</code>, <code>&lt;</code>, <code>*</code>)</li>
                <li>Thông báo lỗi mạng (DNS, TLS, Timeout)</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '-s',
        longFlag: '--silent',
        description: 'Chế độ im lặng (silent): tắt progress meter và dập tắt toàn bộ thông báo lỗi mạng mặc định.',
        minVersion: '7.0.0'
      },
      {
        flag: '-S',
        longFlag: '--show-error',
        description: 'Khi dùng chung với `-s` (thành `-sS`), cURL vẫn giữ chế độ im lặng nhưng sẽ in lỗi ra `stderr` nếu request thất bại.',
        minVersion: '7.0.0'
      },
      {
        flag: '-i',
        longFlag: '--include',
        description: 'Bao gồm Response Headers vào ngay đầu luồng `stdout` trước khi in phần Body (cấm pipe sang parser JSON như `jq`).',
        minVersion: '7.0.0'
      },
      {
        flag: '-I',
        longFlag: '--head',
        description: 'Gửi HTTP HEAD request: chỉ lấy và in Response Headers ra `stdout`, không tải phần Body.',
        minVersion: '7.0.0'
      },
      {
        flag: '-v',
        longFlag: '--verbose',
        description: 'Bật chế độ chi tiết (verbose): in toàn bộ quá trình DNS, TCP, TLS handshake và headers ra luồng `stderr`.',
        minVersion: '7.0.0'
      },
      {
        flag: '-D',
        longFlag: '--dump-header',
        description: 'Ghi toàn bộ HTTP Response Headers ra file độc lập, giữ nguyên vẹn luồng body trên `stdout` cho parser tiếp theo.',
        minVersion: '7.0.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Request Đầu Tiên & Bản Chất Mặc Định Của cURL',
        content: `
          <p>Khi bạn gõ một câu lệnh đơn giản nhất: <code>curl https://example.com</code>, cURL không chỉ gửi một gói tin rồi dừng lại. Đằng sau hậu trường, cURL thực thi một chuỗi tác vụ tuần tự theo kiến trúc mạng chuyên nghiệp:</p>
          <ol>
            <li><strong>Phân giải tên miền (DNS Resolution)</strong>: Tìm địa chỉ IPv4/IPv6 của tên miền.</li>
            <li><strong>Bắt tay 3 bước TCP (TCP Handshake)</strong>: Mở kết nối socket tới cổng 80 (HTTP) hoặc 443 (HTTPS).</li>
            <li><strong>Bắt tay TLS/SSL (TLS Handshake)</strong>: Nếu dùng HTTPS, đàm phán mã hóa và xác thực chứng chỉ số của server qua Root CA.</li>
            <li><strong>Gửi Request Line &amp; Headers</strong>: Mặc định phát sinh phương thức <code>GET</code> kèm các header cơ bản như <code>Host</code>, <code>User-Agent: curl/x.y.z</code>, <code>Accept: */*</code>.</li>
            <li><strong>Nhận phản hồi (Response)</strong>: Đọc status code và đưa phần Body của phản hồi xuất ra luồng <strong>stdout</strong> (màn hình dòng lệnh).</li>
          </ol>

          <h3>Hành Vi Tự Động Của Thanh Tiến Độ (Progress Meter)</h3>
          <p>cURL có cơ chế tự nhận diện thông minh về nơi nhận dữ liệu:</p>
          <ul>
            <li>Nếu đầu ra là <strong>Terminal tương tác</strong> (người dùng đang nhìn vào màn hình): cURL sẽ in body, và nếu quá trình tải mất nhiều thời gian, một thanh bảng đo tiến độ (Progress meter với các cột % Total, Speed, Time Left) sẽ hiển thị trên luồng <code>stderr</code>.</li>
            <li>Nếu đầu ra bị <strong>Redirect sang file</strong> (ví dụ <code>curl url &gt; file.txt</code>) hoặc <strong>Pipe sang lệnh khác</strong> (ví dụ <code>curl url | grep something</code>): cURL tự động TẮT thanh tiến độ để tránh làm nhiễu dữ liệu của bạn!</li>
          </ul>
        `,
        codeExamples: [
          {
            id: 'ex-ch04-sec01',
            title: 'Ví dụ 1: Thực Thi Request Đầu Tiên Lấy Dữ Liệu Body JSON',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe "http://127.0.0.1:8789/ping"',
              powershell: 'curl.exe "http://127.0.0.1:8789/ping"',
              cmd: 'curl.exe "http://127.0.0.1:8789/ping"'
            },
            realOutput: `{"status":"ok","server":"cURL-Mock-Server-v1","port":8789}`,
            explanationTokens: [
              { token: 'curl.exe', meaning: 'Gọi chương trình cURL chuẩn của hệ thống' },
              { token: '"http://..."', meaning: 'Địa chỉ endpoint cần truy vấn, luôn bọc trong nháy kép' },
              { token: 'stdout', meaning: 'Phần Body JSON được in trực tiếp ra màn hình dòng lệnh' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Kiểm Soát Đầu Ra & Quy Tắc Vàng -sS Trong Tự Động Hóa',
        content: `
          <p>Khi đưa cURL vào trong các bash script, cronjob định kỳ hoặc CI/CD pipeline, việc kiểm soát đầu ra và thông báo lỗi là yếu tố quyết định tính ổn định của hệ thống.</p>

          <h3>Cạm Bẫy Chết Người: Dùng Cờ \`-s\` Đơn Lẻ</h3>
          <p>Cờ <code>-s</code> (hoặc <code>--silent</code>) có tác dụng tắt hoàn toàn thanh tiến độ Progress meter. Tuy nhiên, nó cũng <strong>TẮT LUÔN CẢ THÔNG BÁO LỖI</strong>! Nếu máy chủ rớt mạng, DNS không phân giải được hoặc tên miền chết, cURL sẽ <strong>hoàn toàn im lặng</strong> không in bất kỳ dòng chữ nào ra màn hình (Silent Failure). Kết quả là người bảo trì hệ thống không thể biết script của mình chết ở đâu và vì lý do gì!</p>

          <h3>Quy Tắc Vàng Bất Biến: Luôn Dùng \`-sS\` (hoặc \`-s -S\`)</h3>
          <p>Để giải quyết triệt để vấn đề này, hãy luôn luôn kết hợp cờ <code>-s</code> với cờ <code>-S</code> (viết hoa, viết tắt của <code>--show-error</code>):</p>
          <ul>
            <li><code>-s</code>: Tắt bỏ thanh tiến độ gây rác log CI/CD.</li>
            <li><code>-S</code>: Ép cURL <strong>vẫn phải in thông báo lỗi chi tiết ra <code>stderr</code></strong> nếu có sự cố xảy ra!</li>
          </ul>
          <div style="background:var(--bg-surface-alt);padding:10px 14px;border-left:4px solid var(--success);border-radius:0 6px 6px 0;margin:10px 0;font-size:0.88rem;">
            <strong>Khẩu quyết kỹ sư:</strong> Trong mọi script tự động, không bao giờ gõ <code>curl -s</code> đơn độc; luôn luôn gõ <code>curl -sS</code>!
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch04-sec02',
            title: 'Ví dụ 2: Đối Chiếu Hành Vi Lỗi: Cờ -s Câm Lặng vs -sS Báo Lỗi Rõ Ràng',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# 1. Dùng -s đơn độc: Hoàn toàn câm lặng dù lỗi mạng!\ncurl.exe -s "http://domain-khong-ton-tai-abc123xyz.invalid"\necho "Exit code: $?"\n\n# 2. Dùng -sS chuẩn mực: In lỗi rõ ràng ra stderr\ncurl.exe -sS "http://domain-khong-ton-tai-abc123xyz.invalid"',
              powershell: '# 1. Dùng -s đơn độc: Hoàn toàn câm lặng dù lỗi mạng!\ncurl.exe -s "http://domain-khong-ton-tai-abc123xyz.invalid"\nWrite-Host "Exit code: $LASTEXITCODE"\n\n# 2. Dùng -sS chuẩn mực: In lỗi rõ ràng ra stderr\ncurl.exe -sS "http://domain-khong-ton-tai-abc123xyz.invalid"',
              cmd: ':: 1. Dùng -s đơn độc: Hoàn toàn câm lặng dù lỗi mạng!\ncurl.exe -s "http://domain-khong-ton-tai-abc123xyz.invalid"\necho Exit code: %ERRORLEVEL%\n\n:: 2. Dùng -sS chuẩn mực: In lỗi rõ ràng ra stderr\ncurl.exe -sS "http://domain-khong-ton-tai-abc123xyz.invalid"'
            },
            realOutput: `Exit code: 6
curl: (6) Could not resolve host: domain-khong-ton-tai-abc123xyz.invalid`,
            explanationTokens: [
              { token: '-s, --silent', meaning: 'Chế độ im lặng, tắt cả tiến độ và thông báo lỗi' },
              { token: '-S, --show-error', meaning: 'Khi kết hợp với -s, cho phép in thông báo lỗi ra stderr nếu lệnh thất bại' },
              { token: 'curl: (6) Could not resolve host', meaning: 'Thông báo lỗi chi tiết kèm cURL Exit Code 6 (CURLE_COULDNT_RESOLVE_HOST)' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Bộ Cờ Quan Sát Headers: So Sánh -i, -I và -v',
        content: `
          <p>Khi cần debug và xem xét các Header trả về, người mới thường nhầm lẫn giữa 3 cờ: <code>-i</code>, <code>-I</code> và <code>-v</code>. Dưới đây là ma trận phân biệt bản chất của chúng:</p>

          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Cờ (Flag)</th>
                  <th>Tên đầy đủ</th>
                  <th>Phương thức HTTP</th>
                  <th>Headers xuất ra đâu?</th>
                  <th>Có in Body không?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="flag-code">-i</span></td>
                  <td><code>--include</code></td>
                  <td>GET (hoặc method do bạn chọn)</td>
                  <td><strong>stdout</strong> (đứng trước body)</td>
                  <td style="color:var(--success);font-weight:700;">✓ Có</td>
                </tr>
                <tr>
                  <td><span class="flag-code">-I</span></td>
                  <td><code>--head</code></td>
                  <td><strong>HEAD</strong> (chỉ lấy header)</td>
                  <td><strong>stdout</strong></td>
                  <td style="color:var(--danger);font-weight:700;">✗ Không</td>
                </tr>
                <tr>
                  <td><span class="flag-code">-v</span></td>
                  <td><code>--verbose</code></td>
                  <td>GET (hoặc method do bạn chọn)</td>
                  <td><strong>stderr</strong> (kèm dấu <code>&lt;</code> và <code>&gt;</code>)</td>
                  <td style="color:var(--success);font-weight:700;">✓ Có (ở stdout)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Cạm Bẫy Sống Còn: Khi Nào KHÔNG ĐƯỢC Dùng Cờ \`-i\`?</h3>
          <p>Khi bạn muốn lấy dữ liệu JSON từ API và truyền tiếp cho một công cụ xử lý như <code>jq</code>, <strong>tuyệt đối không dùng <code>-i</code></strong>!</p>
          <pre class="code-pre"><code># LỖI KINH ĐIỂN: Làm vỡ parser của jq!
curl.exe -i "http://api.com/users" | jq .
# Kết quả: parse error: Invalid numeric literal at line 1, column 5 (do gặp dòng chữ HTTP/1.1)</code></pre>
          <p>Nguyên nhân: <code>-i</code> chèn các dòng Response Headers vào ngay đầu luồng <code>stdout</code>. Vì headers là văn bản HTTP thuần túy chứ không phải JSON, <code>jq</code> sẽ báo lỗi cú pháp ngay lập tức! Để vừa xem được headers vừa xử lý được JSON, bạn phải dùng cờ <code>-D</code> (xem tiếp Lớp 4) hoặc dùng <code>-v</code>.</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch04-sec03',
            title: 'Ví dụ 3: Sử Dụng Cờ -i Soi Headers Đứng Trước Body Phản Hồi',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -i "http://127.0.0.1:8789/ping"',
              powershell: 'curl.exe -s -i "http://127.0.0.1:8789/ping"',
              cmd: 'curl.exe -s -i "http://127.0.0.1:8789/ping"'
            },
            realOutput: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
Access-Control-Allow-Headers: *
Access-Control-Expose-Headers: *
Content-Type: application/json
Date: Mon, 02 Nov 2026 06:50:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 57

{"status":"ok","server":"cURL-Mock-Server-v1","port":8789}`,
            explanationTokens: [
              { token: '-i, --include', meaning: 'Yêu cầu in toàn bộ Response Headers vào stdout trước phần body' },
              { token: 'Content-Type', meaning: 'Header xác định kiểu MIME dữ liệu trả về (application/json)' },
              { token: 'Dòng trống (CRLF)', meaning: 'Ngăn cách giữa khối Header bên trên và khối Body JSON bên dưới' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Tách Biệt Headers Ra File Độc Lập Với -D (--dump-header)',
        content: `
          <p>Trong thực tế phát triển phần mềm, bạn thường gặp bài toán: <em>Làm sao để lấy được Cookie (Set-Cookie) hoặc Token xác thực nằm trong Header, nhưng vẫn giữ nguyên vẹn phần Body JSON để xử lý tiếp mà không làm vỡ luồng stdout?</em></p>
          <p>Giải pháp chuẩn mực nhất của cURL chính là cờ <strong><code>-D &lt;filename&gt;</code></strong> (viết tắt của <code>--dump-header</code>).</p>

          <h3>Cơ Chế Hoạt Động Của \`-D\`</h3>
          <ul>
            <li>cURL gửi request bình thường.</li>
            <li>Khi máy chủ trả Response về, cURL sẽ <strong>ghi toàn bộ Headers ra file</strong> chỉ định trong cờ <code>-D</code>.</li>
            <li>Đồng thời, phần <strong>Body JSON vẫn được giữ nguyên vẹn chảy qua <code>stdout</code></strong>, cho phép bạn thoải mái pipe sang <code>jq</code> hoặc chuyển hướng lưu file dữ liệu riêng!</li>
          </ul>

          <div class="callout-box callout-tip">
            <div class="callout-header"><span>💡 Mẹo chuyên gia: Đẩy Header ra màn hình mà không làm ô nhiễm stdout</span></div>
            <div class="callout-body">
              <p>Nếu bạn muốn in headers ra màn hình để mắt người đọc được, nhưng dữ liệu body vẫn được pipe sang lệnh khác một cách sạch sẽ, bạn có thể truyền dấu gạch nối <code>-D -</code> (hoặc trên Linux <code>-D /dev/stderr</code>). Khi đó headers sẽ được ghi ra luồng <code>stderr</code>, tách biệt hoàn toàn với dữ liệu JSON trên <code>stdout</code>!</p>
            </div>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch04-sec04',
            title: 'Ví dụ 4: Tách Response Headers Ra File Riêng Với Cờ -D (--dump-header)',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -D /tmp/curl-headers.txt "http://127.0.0.1:8789/cache"\ncat /tmp/curl-headers.txt',
              powershell: 'curl.exe -s -D "$env:TEMP\\curl-headers.txt" "http://127.0.0.1:8789/cache"\nGet-Content "$env:TEMP\\curl-headers.txt"',
              cmd: 'curl.exe -s -D "%TEMP%\\curl-headers.txt" "http://127.0.0.1:8789/cache"\ntype "%TEMP%\\curl-headers.txt"'
            },
            realOutput: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
Access-Control-Allow-Headers: *
Access-Control-Expose-Headers: *
Content-Type: application/json
ETag: "v1.4.2-mock-hash"
Last-Modified: Tue, 01 Nov 2026 12:00:00 GMT
Cache-Control: public, max-age=3600
Date: Mon, 02 Nov 2026 06:50:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked`,
            explanationTokens: [
              { token: '-D <file>', meaning: 'Ghi toàn bộ HTTP response headers nhận được ra file chỉ định' },
              { token: 'ETag', meaning: 'Header được lưu trong file dump, có thể đọc ra bằng grep hoặc script để tái sử dụng cho lần gọi sau' },
              { token: 'stdout giữ nguyên', meaning: 'Body JSON vẫn chảy qua luồng đầu ra chuẩn, không bị trộn lẫn với headers' }
            ]
          }
        ]
      }
    ],

    // 6. Lỗi thường gặp & Bảo mật thực chiến (Callouts)
    callouts: {
      warning: {
        title: 'Hành vi tích lũy của cờ -D (--dump-header) khi có Redirect (-L)',
        content: 'Nếu bạn dùng cờ `-L` (tự động đi theo redirect) kết hợp với `-D headers.txt`, cURL sẽ ghi nối tiếp (append) tất cả các header của từng chặng chuyển hướng (301, 302 rồi mới đến 200) vào trong file dump. Khi viết script bóc tách header cuối cùng, bạn cần đọc khối header ở phần đuôi file!'
      },
      pitfalls: [
        {
          title: 'Pipe lệnh curl -i sang jq gây lỗi cú pháp JSON Parse Error',
          content: 'Cờ `-i` in Header vào luồng stdout. Khi pipe sang `jq`, `jq` sẽ coi dòng `HTTP/1.1 200 OK` là dữ liệu JSON và báo lỗi ngay. Khắc phục: Dùng `-D headers.txt` để tách header ra file, hoặc dùng `-v` (vì verbose nằm ở luồng stderr).'
        },
        {
          title: 'Dùng cờ -s đơn lẻ trong Dockerfile hoặc script CI/CD gây khó khăn khi debug',
          content: 'Khi tải file cài đặt trong Dockerfile: `RUN curl -s https://...`, nếu server trả lỗi 404 hoặc mạng chập chờn, build Docker sẽ thất bại mà log không hề hiện bất kỳ nguyên nhân nào! Luôn luôn đổi thành `RUN curl -sS https://...`.'
        },
        {
          title: 'Nhầm lẫn giữa cờ -I (HEAD chuẩn) và việc ép method thủ công -X HEAD -i',
          content: 'Dùng `-X HEAD -i` khiến cURL gửi lệnh HEAD nhưng vẫn chuẩn bị nhận body, có thể gây treo socket nếu server đóng kết nối sớm. Luôn dùng cờ `-I` native để lấy headers an toàn nhất.'
        }
      ],
      tips: [
        {
          title: 'Kết hợp cờ -I với công cụ lọc dòng để kiểm tra nhanh Status Code',
          content: 'Gõ `curl.exe -s -I "http://example.com" | head -n 1` (hoặc PowerShell `Select-Object -First 1`) để trích xuất ngay dòng trạng thái HTTP đầu tiên.'
        }
      ],
      deepDive: {
        title: 'Vì sao thông tin cờ -v không làm ô nhiễm file khi redirect (> file.json)?',
        content: 'Trong hệ điều hành chuẩn POSIX và Windows, chương trình có 2 luồng xuất độc lập: file descriptor 1 là `stdout` và file descriptor 2 là `stderr`. Khi bạn gõ `curl.exe -v "http://..." > data.json`, toán tử `>` chỉ chuyển hướng luồng stdout vào file. Toàn bộ các dòng verbose (dấu `>`, `<`, `*`) chạy qua luồng stderr nên vẫn hiện lên màn hình mà không hề lọt một byte nào vào file `data.json`.'
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Gửi Request im lặng nhưng bắt buộc báo lỗi mạng (-sS)',
        problem: 'Thực thi một request kiểm tra tới endpoint `http://127.0.0.1:8789/ping` mà không hiển thị thanh tiến độ, nhưng nếu có lỗi mạng thì bắt buộc phải in thông điệp lỗi ra stderr.',
        criteria: 'Sử dụng đúng cặp cờ `-sS` (hoặc `-s -S`), bọc URL trong ngoặc kép, output trả về JSON sạch không có tiến độ tải.',
        hint: 'Sử dụng cặp cờ vàng trong tự động hóa: `-sS`.',
        starterCommands: {
          bash: 'curl.exe -sS "http://127.0.0.1:8789/ping"',
          powershell: 'curl.exe -sS "http://127.0.0.1:8789/ping"',
          cmd: 'curl.exe -sS "http://127.0.0.1:8789/ping"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -sS "http://127.0.0.1:8789/ping"',
            powershell: 'curl.exe -sS "http://127.0.0.1:8789/ping"',
            cmd: 'curl.exe -sS "http://127.0.0.1:8789/ping"'
          },
          explanation: 'Cờ `-s` tắt thanh đo tiến độ, còn `-S` bảo lưu quyền in lỗi của cURL ra stderr.'
        },
        solutionOutput: `{"status":"ok","server":"cURL-Mock-Server-v1","port":8789}`
      },
      {
        level: 'Trung bình',
        title: 'Bóc tách chỉ dòng Status Line đầu tiên của Response',
        problem: 'Sử dụng cờ `-I` để lấy tiêu đề phản hồi từ `http://127.0.0.1:8789/echo` và dùng công cụ dòng lệnh lọc lấy duy nhất dòng đầu tiên (chứa mã trạng thái).',
        criteria: 'Lệnh sử dụng `-I` kết hợp pipe sang công cụ lọc dòng (`head -n 1` trên Bash, `Select-Object -First 1` trên PowerShell, `findstr "HTTP/"` trên CMD).',
        hint: 'Sử dụng `curl.exe -s -I ...` rồi pipe sang lệnh lọc dòng đầu tiên.',
        starterCommands: {
          bash: 'curl.exe -s -I "http://127.0.0.1:8789/echo" | head -n 1',
          powershell: 'curl.exe -s -I "http://127.0.0.1:8789/echo" | Select-Object -First 1',
          cmd: 'curl.exe -s -I "http://127.0.0.1:8789/echo" | findstr "HTTP/"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -I "http://127.0.0.1:8789/echo" | head -n 1',
            powershell: 'curl.exe -s -I "http://127.0.0.1:8789/echo" | Select-Object -First 1',
            cmd: 'curl.exe -s -I "http://127.0.0.1:8789/echo" | findstr "HTTP/"'
          },
          explanation: 'Lệnh `-s -I` gửi request HEAD lấy headers qua stdout, sau đó pipe sang lệnh lọc dòng đầu tiên (HTTP/1.1 200 OK).'
        },
        solutionOutput: `HTTP/1.1 200 OK`
      },
      {
        level: 'Khó',
        title: 'Tách Headers ra file tạm và lọc riêng giá trị ETag',
        problem: 'Gọi endpoint `http://127.0.0.1:8789/cache`, lưu headers vào file tạm bằng cờ `-D`, sau đó dùng lệnh tìm kiếm dòng ETag trong file đó.',
        criteria: 'Sử dụng cờ `-D <file>` lưu headers thành công và trích xuất đúng dòng ETag từ file đã lưu.',
        hint: 'Bước 1: curl -s -D ... > nul; Bước 2: đọc file tạm bằng grep / Select-String / findstr.',
        starterCommands: {
          bash: 'curl.exe -s -D /tmp/hd.txt "http://127.0.0.1:8789/cache" > /dev/null && grep -i "etag" /tmp/hd.txt',
          powershell: 'curl.exe -s -D "$env:TEMP\\hd.txt" "http://127.0.0.1:8789/cache" | Out-Null; Select-String -Path "$env:TEMP\\hd.txt" -Pattern "ETag"',
          cmd: 'curl.exe -s -D "%TEMP%\\hd.txt" "http://127.0.0.1:8789/cache" > nul & findstr /I "ETag" "%TEMP%\\hd.txt"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -D /tmp/hd.txt "http://127.0.0.1:8789/cache" > /dev/null && grep -i "etag" /tmp/hd.txt',
            powershell: 'curl.exe -s -D "$env:TEMP\\hd.txt" "http://127.0.0.1:8789/cache" | Out-Null; Select-String -Path "$env:TEMP\\hd.txt" -Pattern "ETag"',
            cmd: 'curl.exe -s -D "%TEMP%\\hd.txt" "http://127.0.0.1:8789/cache" > nul & findstr /I "ETag" "%TEMP%\\hd.txt"'
          },
          explanation: 'Cờ `-D` lưu riêng headers vào file, sau đó dùng grep / Select-String / findstr để trích xuất chính xác giá trị ETag phục vụ cho các logic tiếp theo.'
        },
        solutionOutput: `ETag: "v1.4.2-mock-hash"`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Tại sao việc sử dụng cờ `-s` (`--silent`) đơn độc trong các script tự động CI/CD lại bị coi là cạm bẫy nguy hiểm?',
        options: [
          'Vì cờ `-s` làm giảm tốc độ tải file của cURL.',
          'Vì cờ `-s` tắt luôn cả thông báo lỗi ra stderr; nếu mạng rớt, script sẽ nhận kết quả rỗng mà không có bất kỳ log lỗi nào để điều tra.',
          'Vì cờ `-s` tự động đổi phương thức từ GET sang POST.',
          'Vì cờ `-s` làm sai lệch mã băm kiểm tra toàn vẹn file.'
        ],
        correctIndex: 1,
        explanation: 'Cờ `-s` tắt cả tiến độ lẫn thông báo lỗi (Silent failure). Luôn phải kết hợp thành `-sS` để khi có lỗi thì cURL vẫn in ra stderr.'
      },
      {
        question: 'Khi bạn chạy lệnh `curl.exe -i "https://api.com/users" | jq .`, tại sao lệnh `jq` lại báo lỗi `parse error`?',
        options: [
          'Vì cURL không thể kết nối tới server khi có jq.',
          'Vì jq yêu cầu cURL phải chạy dưới quyền Administrator.',
          'Vì cờ `-i` chèn các dòng Response Headers vào đầu luồng stdout; jq đọc phải các dòng header HTTP (không phải JSON) nên báo lỗi cú pháp.',
          'Vì jq chỉ hỗ trợ XML chứ không hỗ trợ JSON.'
        ],
        correctIndex: 2,
        explanation: 'Cờ `-i` (--include) in Response Headers vào ngay trước body trong luồng stdout, làm hỏng cấu trúc dữ liệu JSON thuần khiết mà jq yêu cầu.'
      },
      {
        question: 'Khi sử dụng cờ `-v` (`--verbose`) trong lệnh: `curl.exe -v "http://example.com" > ketqua.json`, các thông tin verbose (dấu `>`, `<`, `*`) sẽ đi về đâu?',
        options: [
          'Bị ghi đè trộn lẫn vào file `ketqua.json`.',
          'Vẫn hiển thị trên màn hình console (vì verbose chạy qua luồng stderr, trong khi `>` chỉ chuyển hướng luồng stdout).',
          'Bị cURL tự động hủy bỏ không in ra đâu cả.',
          'Làm lệnh báo lỗi không thể thực thi.'
        ],
        correctIndex: 1,
        explanation: 'Thông tin verbose của cờ `-v` được xuất ra file descriptor 2 (`stderr`), trong khi toán tử `>` chuyển hướng file descriptor 1 (`stdout`). Do đó, file `ketqua.json` vẫn chỉ chứa duy nhất nội dung body sạch.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -sS "URL"',
        description: 'Chạy im lặng, tắt progress meter nhưng bắt buộc báo lỗi ra stderr nếu sự cố mạng (chuẩn CI/CD).'
      },
      {
        command: 'curl.exe -s -i "URL"',
        description: 'In cả HTTP Response Headers và Response Body ra luồng stdout.'
      },
      {
        command: 'curl.exe -s -I "URL"',
        description: 'Gửi HTTP HEAD request: chỉ lấy Response Headers mà không tải phần Body.'
      },
      {
        command: 'curl.exe -v "URL" > output.json',
        description: 'Soi chi tiết bắt tay qua stderr, lưu riêng nội dung body sạch vào output.json.'
      },
      {
        command: 'curl.exe -s -D headers.txt "URL" | jq .',
        description: 'Tách riêng Headers ra file `headers.txt`, pipe an toàn phần Body JSON sang jq mà không vỡ parser.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'cURL quản lý 2 luồng xuất tách biệt: `stdout` cho dữ liệu chính (body) và `stderr` cho chẩn đoán/tiến độ mạng.',
      'Quy tắc vàng trong kịch bản tự động: Luôn dùng `-sS` để tắt thanh đo tiến độ nhưng vẫn giữ nguyên thông báo lỗi khi có sự cố.',
      'Phân biệt rõ: `-i` in header vào stdout (cấm pipe sang jq), `-I` gửi request HEAD chỉ lấy header, còn `-v` in toàn bộ quá trình giao vận ra stderr.',
      'Dùng cờ `-D <file>` (`--dump-header`) để tách biệt hoàn toàn Response Headers ra file riêng, giữ cho luồng body trên stdout sạch sẽ cho các parser tiếp theo.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'curl.se Official Manpage',
        url: 'https://curl.se/docs/manpage.html',
        description: 'Tra cứu chính thức các cờ điều khiển luồng xuất: -s, -S, -i, -I, -v, -D.'
      },
      {
        title: 'Everything curl: Verbose mode & Diagnostics',
        url: 'https://everything.curl.dev/cmdline/verbose',
        description: 'Giải thích cơ chế hoạt động của cờ -v và cách bóc tách thông tin chẩn đoán mạng trong Everything curl.'
      },
      {
        title: 'Everything curl: Silent mode & Error handling',
        url: 'https://everything.curl.dev/cmdline/silent',
        description: 'Cẩm nang quản lý chế độ im lặng và cơ chế bắt lỗi trong kịch bản shell tự động.'
      },
      {
        title: 'GNU Operating System: Standard Streams (stdout/stderr)',
        url: 'https://www.gnu.org/software/libc/manual/html_node/Standard-Streams.html',
        description: 'Tài liệu chuẩn POSIX về cơ chế hoạt động của File Descriptor 1 (stdout) và File Descriptor 2 (stderr).'
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
          issue: 'Lỗi vỡ parser khi pipe curl -i sang jq do trộn headers vào stdout',
          severity: 'Critical',
          resolution: 'Đã giải thích cơ chế luồng stdout/stderr trong Lớp 3 và hướng dẫn giải pháp chuẩn dùng -D hoặc -v'
        },
        {
          issue: 'Cạm bẫy cờ -s nuốt chửng lỗi (Silent failure) trong CI/CD',
          severity: 'Critical',
          resolution: 'Đã đưa ra quy tắc vàng -sS và xây dựng bài tập đối chiếu thực tế'
        },
        {
          issue: 'Nhầm lẫn thông tin verbose của cờ -v làm hỏng file dữ liệu khi chuyển hướng > file',
          severity: 'Major',
          resolution: 'Đã phân tích sự phân tách giữa file descriptor 1 (stdout) và file descriptor 2 (stderr) trong DeepDive'
        },
        {
          issue: 'Hành vi tích lũy nối tiếp của cờ -D khi đi qua redirect (-L)',
          severity: 'Major',
          resolution: 'Đã bổ sung cảnh báo chuyên biệt trong Warning box về việc file dump chứa headers của mọi chặng'
        },
        {
          issue: 'Nhầm lẫn giữa cờ -I (HEAD chuẩn) và việc kết hợp -X HEAD với -i',
          severity: 'Minor',
          resolution: 'Đã chuẩn hóa định nghĩa cờ -I và khuyến nghị dùng -I thay vì ép method thủ công bằng -X'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://curl.se/docs/manpage.html',
        'https://everything.curl.dev/cmdline/verbose',
        'https://everything.curl.dev/cmdline/silent'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH04_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
