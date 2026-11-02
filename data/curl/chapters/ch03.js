/**
 * Chương 03: Kiến Thức HTTP Cần Có Để Làm Chủ cURL (data/curl/chapters/ch03.js)
 * Cấp độ: Cơ bản | Thời lượng: ~30 phút | cURL tối thiểu: 7.0.0
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch03',
    meta: {
      id: 'ch03',
      order: 3,
      title: 'Kiến Thức HTTP Cần Có Để Làm Chủ cURL',
      level: 'Cơ bản',
      curlMinVersion: '7.0.0',
      qaStatus: 'verified'
    },
    partId: 'level-1',
    partTitle: 'Cấp độ 1: Nền tảng Cốt lõi',
    number: '03',
    title: 'Kiến Thức HTTP Cần Có Để Làm Chủ cURL',
    subtitle: 'Giải phẫu URL, vòng đời Request/Response wire format, tính chất Safe & Idempotent, HTTP Caching và Content Negotiation',
    level: 'Cơ bản',
    duration: '30 phút',
    curlMinVersion: '7.0.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Giải phẫu toàn diện 7 thành phần của một URL (Scheme, UserInfo, Host, Port, Path, Query, Fragment) và hiểu lý do cURL loại bỏ Fragment trước khi gửi đi.',
      'Đọc hiểu cấu trúc raw byte của bản tin HTTP/1.1 trên đường truyền (Request Line, Status Line, Headers, CRLF `\\r\\n`, Payload Body).',
      'Phân biệt rõ ràng 2 tính chất sống còn của HTTP Methods: An toàn (Safe) và Cố định (Idempotent) để ra quyết định retry tự động an toàn trong CI/CD.',
      'Nắm vững ma trận mã trạng thái HTTP (2xx, 3xx, 4xx, 5xx) và nhận thức được rằng cURL mặc định coi 4xx/5xx là Exit Code 0 (thành công giao vận).',
      'Làm chủ cơ chế HTTP Caching nền tảng (`ETag` / `If-None-Match`, `Last-Modified`, `Cache-Control`) và Content Negotiation (`Accept`, `Accept-Encoding`).'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành Chương 01 và 02: Nắm vững kiến trúc libcurl và thành thạo kỹ thuật quoting, line continuation đa shell.',
      'Hiểu khái niệm địa chỉ IP, tên miền (Domain Name) và cổng mạng (Port) ở mức người dùng cơ bản.'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Lá thư bưu điện và cỗ xe chuyển phát cURL',
      metaphor: 'Hãy hình dung cURL như một nhân viên chuyển phát nhanh chuyên nghiệp, còn giao thức HTTP chính là quy chuẩn đóng gói một lá thư gửi qua bưu điện. URL là địa chỉ chi tiết ghi ngoài phong bì (gửi đến tòa nhà nào, tầng mấy, gặp ai). Request Headers là các ghi chú dán ngoài bì thư ("hàng dễ vỡ", "giao trong giờ hành chính", "chỉ nhận tiếng Việt"). Khoảng trống Empty Line (`\\r\\n\\r\\n`) chính là lớp băng dính niêm phong ngăn cách vỏ phong bì với ruột thư bên trong (Body Payload). Khi nhân viên cURL trao lá thư cho máy chủ, anh ta chỉ quan tâm lá thư có đến tay người nhận và nhận lại được giấy ký nhận (Status Code) hay không. Ngay cả khi người nhận trả lời "Tôi từ chối nhận thư này!" (HTTP 403 Forbidden), nhân viên cURL vẫn đã hoàn thành xuất sắc nhiệm vụ giao nhận của mình và báo về: Đã hoàn tất (Exit code 0)!',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">CẤU TRÚC 1 BẢN TIN HTTP REQUEST TRÊN ĐƯỜNG TRUYỀN (WIRE FORMAT)</div>
          <div style="background:var(--bg-code,#090d16);color:#f8fafc;padding:14px;border-radius:8px;line-height:1.6;border:1px solid var(--border-subtle);">
            <div><span style="color:#ff7b72;font-weight:700;">GET</span> <span style="color:#79c0ff;">/api/v1/users?limit=10</span> <span style="color:#d2a8ff;">HTTP/1.1</span> <span style="color:var(--text-muted);font-size:0.75rem;">← 1. REQUEST LINE (Method + Path + Query + Version)</span></div>
            <div><span style="color:#7ee787;">Host:</span> api.example.com <span style="color:var(--text-muted);font-size:0.75rem;">← 2. HEADERS (Key-Value cách nhau bởi dấu :)</span></div>
            <div><span style="color:#7ee787;">User-Agent:</span> curl/8.21.0</div>
            <div><span style="color:#7ee787;">Accept:</span> application/json</div>
            <div style="color:var(--text-muted);background:rgba(255,255,255,0.06);padding:2px 6px;margin:4px 0;border-radius:4px;font-style:italic;">[Dòng trống bắt buộc \\r\\n\\r\\n - Ngăn cách Header và Body] ← 3. EMPTY LINE</div>
            <div style="color:#a5d6ff;">{"note": "Payload Body nếu có, đi sau dòng trống"} <span style="color:var(--text-muted);font-size:0.75rem;">← 4. PAYLOAD BODY</span></div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '-v',
        longFlag: '--verbose',
        description: 'Bật chế độ chi tiết (verbose) in toàn bộ quá trình bắt tay kết nối, Request headers (`>`) và Response headers (`<`).',
        minVersion: '7.0.0'
      },
      {
        flag: '-I',
        longFlag: '--head',
        description: 'Gửi HTTP HEAD request: chỉ lấy và in ra HTTP Response Headers mà không tải phần thân dữ liệu (Response Body).',
        minVersion: '7.0.0'
      },
      {
        flag: '-f',
        longFlag: '--fail',
        description: 'Chế độ dập tắt lỗi (fail fast): trả về Exit Code 22 khi server phản hồi mã lỗi HTTP >= 400 (nhưng nuốt mất body lỗi).',
        minVersion: '7.0.0'
      },
      {
        flag: '--fail-with-body',
        longFlag: '--fail-with-body',
        description: 'Trả về Exit Code 22 khi gặp mã lỗi HTTP >= 400 nhưng VẪN in đầy đủ nội dung lỗi (JSON/HTML) ra màn hình terminal.',
        minVersion: '7.76.0'
      },
      {
        flag: '--compressed',
        longFlag: '--compressed',
        description: 'Tự động gửi header `Accept-Encoding: gzip, deflate, br, zstd` và tự động giải nén dữ liệu trong suốt trước khi in.',
        minVersion: '7.21.6'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Giải Phẫu URL & Request/Response Wire Format',
        content: `
          <p>Mỗi khi bạn thực thi lệnh <code>curl &lt;URL&gt;</code>, bước đầu tiên cURL thực hiện là bóc tách chuỗi URL thành các cấu phần chuẩn theo đặc tả <strong>RFC 3986</strong>. Một URL hoàn chỉnh gồm 7 thành phần:</p>
          <div style="background:var(--bg-surface-alt);padding:12px;border-radius:8px;margin:12px 0;font-family:var(--font-mono);font-size:0.85rem;overflow-x:auto;">
            <span style="color:#38bdf8;font-weight:700;">https://</span><span style="color:#f59e0b;">admin:secret@</span><span style="color:#10b981;font-weight:700;">api.example.com</span><span style="color:#a78bfa;">:8443</span><span style="color:#ec4899;">/v2/reports/annual</span><span style="color:#eab308;">?year=2026&amp;format=pdf</span><span style="color:#94a3b8;">#summary</span>
          </div>
          <ul>
            <li><strong>Scheme (Giao thức)</strong>: <code>https://</code> hoặc <code>http://</code>. Xác định cách thức mã hóa và bắt tay kết nối mạng.</li>
            <li><strong>UserInfo (Thông tin xác thực)</strong>: <code>admin:secret@</code>. Chứa user và password. cURL sẽ tự động bóc phần này và chuyển hóa thành header <code>Authorization: Basic ...</code>.</li>
            <li><strong>Host (Tên miền hoặc IP)</strong>: <code>api.example.com</code>. Được DNS phân giải thành địa chỉ IP.</li>
            <li><strong>Port (Cổng kết nối)</strong>: <code>:8443</code>. Mặc định là 80 cho HTTP và 443 cho HTTPS nếu không ghi rõ.</li>
            <li><strong>Path (Đường dẫn tài nguyên)</strong>: <code>/v2/reports/annual</code>. Vị trí endpoint trên máy chủ.</li>
            <li><strong>Query String (Truy vấn)</strong>: <code>?year=2026&amp;format=pdf</code>. Các cặp khóa-giá trị lọc tài nguyên. <em>Lưu ý: Ký tự <code>&amp;</code> là cạm bẫy trên terminal shell nếu không bọc trong nháy kép!</em></li>
            <li><strong>Fragment (Neo phần tử)</strong>: <code>#summary</code>. <strong>Tuyệt đối không gửi lên server!</strong> Fragment là khái niệm nội bộ của trình duyệt để cuộn trang DOM. cURL sẽ tự động loại bỏ phần này trước khi gửi gói tin HTTP qua socket.</li>
          </ul>

          <h3>Bản Tin HTTP Trên Đường Truyền (Wire Format)</h3>
          <p>HTTP/1.1 là giao thức dạng văn bản thuần (Text-based). Khi chạy <code>curl -v</code> (verbose), bạn sẽ nhìn thấy chính xác các byte được truyền đi và nhận về:</p>
          <ul>
            <li>Các dòng bắt đầu bằng <code>&gt;</code> biểu thị dữ liệu cURL gửi lên server (Request).</li>
            <li>Các dòng bắt đầu bằng <code>&lt;</code> biểu thị dữ liệu server gửi về cho cURL (Response).</li>
            <li>Các dòng bắt đầu bằng <code>*</code> biểu thị thông tin nội bộ của libcurl (Bắt tay TCP, TLS handshake, phân giải DNS).</li>
          </ul>
        `,
        codeExamples: [
          {
            id: 'ex-ch03-sec01',
            title: 'Ví dụ 1: Soi Bản Tin Wire Format Của Request & Response Với cURL',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -v "http://127.0.0.1:8789/echo?course=curl&ch=03" > /dev/null',
              powershell: 'curl.exe -s -v "http://127.0.0.1:8789/echo?course=curl&ch=03" | Out-Null',
              cmd: 'curl.exe -s -v "http://127.0.0.1:8789/echo?course=curl&ch=03" > nul'
            },
            realOutput: `*   Trying 127.0.0.1:8789...
* Connected to 127.0.0.1 (127.0.0.1) port 8789
> GET /echo?course=curl&ch=03 HTTP/1.1
> Host: 127.0.0.1:8789
> User-Agent: curl/8.21.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< Access-Control-Allow-Origin: *
< Content-Type: application/json
< X-Mock-Server: curl-verifier
< X-Request-Method: GET
< Date: Mon, 02 Nov 2026 06:45:00 GMT
< Connection: keep-alive
< Content-Length: 320
< `,
            explanationTokens: [
              { token: '-v', meaning: 'Bật chế độ Verbose để in toàn bộ Request/Response headers và quá trình bắt tay kết nối' },
              { token: 'GET /echo?... HTTP/1.1', meaning: 'Dòng Request Line chứa phương thức, URI kèm query và phiên bản giao thức' },
              { token: 'User-Agent', meaning: 'Header định danh client, cURL tự động gửi phiên bản hiện tại (ví dụ curl/8.21.0)' },
              { token: 'Accept: */*', meaning: 'Mặc định cURL chấp nhận mọi định dạng trả về từ máy chủ nếu không chỉ định' },
              { token: 'HTTP/1.1 200 OK', meaning: 'Dòng Status Line từ server xác nhận mã 200 kèm lý do OK' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Hệ Thống Method & Tính Chất Safe / Idempotent',
        content: `
          <p>Mỗi HTTP Method không chỉ là một cái tên, mà nó mang <strong>ngữ nghĩa giao thức</strong> rất nghiêm ngặt. Hai thuộc tính quan trọng nhất mà kỹ sư backend và DevOps bắt buộc phải nắm vững là <strong>Safe (An toàn)</strong> và <strong>Idempotent (Cố định/Bất biến trạng thái)</strong>.</p>

          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Mục đích nghiệp vụ</th>
                  <th style="text-align:center;">Safe?</th>
                  <th style="text-align:center;">Idempotent?</th>
                  <th>Có gửi Body?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="flag-code">GET</span></td>
                  <td>Đọc/truy vấn dữ liệu tài nguyên</td>
                  <td style="text-align:center;color:var(--success);font-weight:700;">✓ Có</td>
                  <td style="text-align:center;color:var(--success);font-weight:700;">✓ Có</td>
                  <td>Không khuyến nghị</td>
                </tr>
                <tr>
                  <td><span class="flag-code">HEAD</span></td>
                  <td>Lấy headers y hệt GET nhưng không lấy body</td>
                  <td style="text-align:center;color:var(--success);font-weight:700;">✓ Có</td>
                  <td style="text-align:center;color:var(--success);font-weight:700;">✓ Có</td>
                  <td>Không</td>
                </tr>
                <tr>
                  <td><span class="flag-code">OPTIONS</span></td>
                  <td>Hỏi máy chủ các method và chính sách CORS hỗ trợ</td>
                  <td style="text-align:center;color:var(--success);font-weight:700;">✓ Có</td>
                  <td style="text-align:center;color:var(--success);font-weight:700;">✓ Có</td>
                  <td>Không</td>
                </tr>
                <tr>
                  <td><span class="flag-code">PUT</span></td>
                  <td>Tạo mới hoặc ghi đè toàn bộ tài nguyên (Idempotent)</td>
                  <td style="text-align:center;color:var(--danger);font-weight:700;">✗ Không</td>
                  <td style="text-align:center;color:var(--success);font-weight:700;">✓ Có</td>
                  <td>Bắt buộc có</td>
                </tr>
                <tr>
                  <td><span class="flag-code">DELETE</span></td>
                  <td>Xóa tài nguyên theo định danh URI</td>
                  <td style="text-align:center;color:var(--danger);font-weight:700;">✗ Không</td>
                  <td style="text-align:center;color:var(--success);font-weight:700;">✓ Có</td>
                  <td>Tùy chọn</td>
                </tr>
                <tr>
                  <td><span class="flag-code">POST</span></td>
                  <td>Tạo bản ghi mới hoặc thực thi tác vụ xử lý</td>
                  <td style="text-align:center;color:var(--danger);font-weight:700;">✗ Không</td>
                  <td style="text-align:center;color:var(--danger);font-weight:700;">✗ Không</td>
                  <td>Bắt buộc có</td>
                </tr>
                <tr>
                  <td><span class="flag-code">PATCH</span></td>
                  <td>Cập nhật một phần thuộc tính của tài nguyên</td>
                  <td style="text-align:center;color:var(--danger);font-weight:700;">✗ Không</td>
                  <td style="text-align:center;color:var(--warning);font-weight:700;">⚠ Thường không</td>
                  <td>Bắt buộc có</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Sự Khác Biệt Sống Còn: Safe vs Idempotent</h3>
          <ul>
            <li><strong>Safe (An toàn)</strong>: Thực thi request không được làm thay đổi trạng thái dữ liệu trên máy chủ (chỉ đọc). GET, HEAD, OPTIONS là Safe. Máy chủ cho phép crawler, robot tìm kiếm hoặc prefetch trình duyệt thoải mái gọi các endpoint này.</li>
            <li><strong>Idempotent (Cố định)</strong>: Gọi lệnh 1 lần hay gọi 10 lần liên tiếp đều dẫn đến <strong>cùng một trạng thái máy chủ cuối cùng</strong>.
              <br/><em>Ví dụ thực tế:</em> Lệnh <code>PUT /users/42</code> với payload <code>{"name": "Alice"}</code> gọi 10 lần thì tên của user 42 vẫn là Alice (Idempotent). Nhưng lệnh <code>POST /orders/checkout</code> gọi 2 lần sẽ tạo ra <strong>2 đơn hàng khác nhau và trừ tiền 2 lần</strong> (Non-idempotent)!
            </li>
          </ul>
        `,
        codeExamples: [
          {
            id: 'ex-ch03-sec02',
            title: 'Ví dụ 2: Kiểm Tra Tiêu Đề Response Bằng HEAD Request (-I)',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -I "http://127.0.0.1:8789/cache"',
              powershell: 'curl.exe -I "http://127.0.0.1:8789/cache"',
              cmd: 'curl.exe -I "http://127.0.0.1:8789/cache"'
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
Date: Mon, 02 Nov 2026 06:45:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked`,
            explanationTokens: [
              { token: '-I, --head', meaning: 'Yêu cầu cURL gửi HTTP HEAD request, chỉ nhận và in header, bỏ qua phần body' },
              { token: 'ETag', meaning: 'Dấu vân tay băm đại diện cho phiên bản tài nguyên hiện tại trên server' },
              { token: 'Cache-Control: max-age=3600', meaning: 'Chỉ thị cho client và proxy được phép cache tài nguyên trong 3600 giây (1 giờ)' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Ma Trận Status Code & Cơ Chế Xử Lý Lỗi Của cURL',
        content: `
          <p>Mã trạng thái HTTP là số nguyên 3 chữ số do máy chủ trả về, được chia thành 5 nhóm tiêu chuẩn:</p>
          <ul>
            <li><strong>2xx (Thành công)</strong>:
              <ul>
                <li><code>200 OK</code>: Request thành công, dữ liệu đi kèm trong body.</li>
                <li><code>201 Created</code>: Tạo mới tài nguyên thành công (thường đi kèm header <code>Location</code> trỏ tới ID mới).</li>
                <li><code>204 No Content</code>: Xử lý thành công nhưng không có nội dung body trả về (thường gặp ở DELETE hoặc PUT).</li>
              </ul>
            </li>
            <li><strong>3xx (Chuyển hướng - Redirection)</strong>:
              <ul>
                <li><code>301 Moved Permanently</code>: Tài nguyên đã đổi URI vĩnh viễn (cURL cần <code>-L</code> để tự động đi theo).</li>
                <li><code>304 Not Modified</code>: Dữ liệu chưa hề thay đổi so với bản cache của client (tiết kiệm băng thông, không có body).</li>
                <li><code>307 Temporary Redirect</code> &amp; <code>308 Permanent Redirect</code>: Chuyển hướng giữ nguyên method ban đầu (không bị đổi POST thành GET như 301/302).</li>
              </ul>
            </li>
            <li><strong>4xx (Lỗi phía Client)</strong>:
              <ul>
                <li><code>400 Bad Request</code>: Cú pháp gửi lên sai (JSON hỏng, thiếu tham số).</li>
                <li><code>401 Unauthorized</code>: Chưa xác thực danh tính (thiếu Token hoặc sai User/Pass).</li>
                <li><code>403 Forbidden</code>: Đã xác thực nhưng không có quyền hạn truy cập tài nguyên.</li>
                <li><code>404 Not Found</code>: Không tìm thấy đường dẫn URI này.</li>
                <li><code>429 Too Many Requests</code>: Bị chặn do vượt quá tần suất (Rate limit), thường kèm header <code>Retry-After</code>.</li>
              </ul>
            </li>
            <li><strong>5xx (Lỗi phía Server)</strong>:
              <ul>
                <li><code>500 Internal Server Error</code>: Ứng dụng backend bị exception/crash sập mã nguồn.</li>
                <li><code>502 Bad Gateway</code>: Reverse Proxy (Nginx/Cloudflare) không kết nối được upstream backend.</li>
                <li><code>503 Service Unavailable</code>: Server đang bảo trì hoặc quá tải tạm thời.</li>
                <li><code>504 Gateway Timeout</code>: Proxy chờ backend phản hồi quá lâu dẫn đến hết hạn thời gian.</li>
              </ul>
            </li>
          </ul>

          <div class="callout-box callout-warning">
            <div class="callout-header"><span>🛡️ Cạm bẫy sống còn số 1: cURL coi HTTP 404/500 là Exit Code 0!</span></div>
            <div class="callout-body">
              <p>Mặc định cURL là một công cụ vận chuyển giao thức. Nếu cURL kết nối thành công tới IP server, gửi request và nhận được phản hồi HTTP hợp lệ (dù là 404 Not Found hay 500 Internal Server Error), cURL vẫn xem là <strong>nhiệm vụ giao nhận đã hoàn tất thành công</strong> và trả về mã thoát hệ điều hành <strong>Exit Code = 0</strong>!</p>
              <p>Nếu trong CI/CD pipeline bạn viết <code>curl https://api.com/deploy</code> rồi kiểm tra <code>$?</code>, script của bạn sẽ tưởng nhầm là deploy thành công dù server báo lỗi 500! Để cURL trả về exit code khác 0 khi gặp 4xx/5xx, bạn bắt buộc phải dùng cờ <code>-f</code> (hoặc cờ <code>--fail-with-body</code> từ cURL 7.76.0+).</p>
            </div>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch03-sec03',
            title: 'Ví dụ 3: Minh Chứng Exit Code Khi Gặp HTTP 404: Mặc Định vs --fail-with-body',
            minVersion: '7.76.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s "http://127.0.0.1:8789/status/404"; echo "Exit code mac dinh: $?"\ncurl.exe -s --fail-with-body "http://127.0.0.1:8789/status/404"; echo "Exit code voi fail: $?"',
              powershell: 'curl.exe -s "http://127.0.0.1:8789/status/404"; Write-Host "Exit code mac dinh: $LASTEXITCODE"\ncurl.exe -s --fail-with-body "http://127.0.0.1:8789/status/404"; Write-Host "Exit code voi fail: $LASTEXITCODE"',
              cmd: 'curl.exe -s "http://127.0.0.1:8789/status/404" & echo Exit code mac dinh: %ERRORLEVEL%\ncurl.exe -s --fail-with-body "http://127.0.0.1:8789/status/404" & echo Exit code voi fail: %ERRORLEVEL%'
            },
            realOutput: `{"code":404,"message":"Simulated HTTP status 404","timestamp":"2026-11-02T06:45:00.000Z"}
Exit code mac dinh: 0
{"code":404,"message":"Simulated HTTP status 404","timestamp":"2026-11-02T06:45:00.000Z"}
Exit code voi fail: 22`,
            explanationTokens: [
              { token: 'Exit code 0', meaning: 'Trạng thái mặc định: cURL coi việc nhận được trang 404 là kết nối thành công' },
              { token: '--fail-with-body', meaning: 'Yêu cầu cURL trả về Exit Code 22 nếu gặp HTTP >= 400 nhưng VẪN in nội dung lỗi body ra màn hình' },
              { token: 'Exit code 22', meaning: 'Mã lỗi chuẩn của cURL: CURLE_HTTP_RETURNED_ERROR (HTTP response error)' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: HTTP Caching & Content Negotiation Nền Tảng',
        content: `
          <p>Hai cơ chế giúp tối ưu hóa hiệu năng và băng thông mạng quan trọng nhất trong HTTP là <strong>Conditional Request (Caching)</strong> và <strong>Content Negotiation (Thỏa thuận nội dung)</strong>.</p>

          <h3>1. Cơ Chế Conditional Request Với ETag</h3>
          <p>Khi tải một tài nguyên, server thường kèm theo header <code>ETag: "v1.4.2-mock-hash"</code>. Ở lần gọi sau, client không cần tải lại toàn bộ nội dung mà chỉ cần gửi kèm header:</p>
          <pre class="code-pre"><code>If-None-Match: "v1.4.2-mock-hash"</code></pre>
          <p>Nếu tài nguyên trên server chưa hề thay đổi, server lập tức phản hồi mã <strong>HTTP 304 Not Modified</strong> với phần body hoàn toàn rỗng. Máy tính của bạn sẽ dùng lại bản cache cũ, tiết kiệm tới 99% băng thông mạng!</p>

          <h3>2. Content Negotiation (Thỏa Thuận Định Dạng)</h3>
          <p>Cùng một đường dẫn URI <code>/api/users</code>, các client khác nhau có thể yêu cầu định dạng dữ liệu khác nhau thông qua các header yêu cầu:</p>
          <ul>
            <li><code>Accept: application/json</code>: Client báo cho server "Hãy trả về định dạng JSON".</li>
            <li><code>Accept: text/xml</code>: Client báo cho server "Hãy trả về định dạng XML".</li>
            <li><code>Accept-Encoding: gzip, br, zstd</code>: Client báo "Tôi có thể giải nén dữ liệu nén dạng gzip hoặc brotli, hãy nén body lại để truyền nhanh hơn". Trong cURL, bạn chỉ cần bật cờ <code>--compressed</code>, cURL sẽ tự động đàm phán nén và giải nén trong suốt.</li>
          </ul>
        `,
        codeExamples: [
          {
            id: 'ex-ch03-sec04',
            title: 'Ví dụ 4: Thực Hiện Conditional Request Nhận Mã 304 Not Modified',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -i -s -H \'If-None-Match: "v1.4.2-mock-hash"\' "http://127.0.0.1:8789/cache"',
              powershell: 'curl.exe -i -s -H \'If-None-Match: "v1.4.2-mock-hash"\' "http://127.0.0.1:8789/cache"',
              cmd: 'curl.exe -i -s -H "If-None-Match: \\"v1.4.2-mock-hash\\"" "http://127.0.0.1:8789/cache"'
            },
            realOutput: `HTTP/1.1 304 Not Modified
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
Access-Control-Allow-Headers: *
Access-Control-Expose-Headers: *
ETag: "v1.4.2-mock-hash"
Last-Modified: Tue, 01 Nov 2026 12:00:00 GMT
Date: Mon, 02 Nov 2026 06:45:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5`,
            explanationTokens: [
              { token: '-i', meaning: 'In cả headers của response cùng với body (nếu có)' },
              { token: 'If-None-Match', meaning: 'Header điều kiện gửi kèm ETag để hỏi server xem file có thay đổi hay không' },
              { token: '304 Not Modified', meaning: 'Mã xác nhận dữ liệu chưa đổi, không có body trả về giúp tối ưu đường truyền tối đa' }
            ]
          }
        ]
      }
    ],

    // 6. Lỗi thường gặp & Bảo mật thực chiến (Callouts)
    callouts: {
      warning: {
        title: 'Cạm bẫy Retry tự động trên các HTTP Method không an toàn (Non-idempotent)',
        content: 'Không bao giờ được tự ý cấu hình cơ chế tự động thử lại (Retry) trên các request POST hoặc PATCH mà không có cơ chế Khóa Idempotency (Idempotency Key). Nếu kết nối mạng bị rớt đúng lúc server đã trừ tiền hoặc tạo bản ghi nhưng chưa kịp gửi response về, việc tự động gửi lại lệnh POST sẽ tạo giao dịch trùng lặp!'
      },
      pitfalls: [
        {
          title: 'Ký tự & trong Query String làm lệnh bị đẩy vào chạy nền (Background process)',
          content: 'Khi gõ `curl http://api.com?a=1&b=2` trên Bash, ký tự `&` được shell diễn giải là toán tử chạy nền! Shell sẽ thực thi `curl http://api.com?a=1` trong background và cố chạy tiếp câu lệnh `b=2`. Giải pháp: Luôn luôn bọc toàn bộ URL trong cặp dấu ngoặc kép `"http://..."`.'
        },
        {
          title: 'Hiểu sai chỉ thị Cache-Control: no-cache vs no-store',
          content: 'Rất nhiều developer nghĩ `no-cache` nghĩa là không lưu dữ liệu. Thực tế `no-cache` VẪN LƯU cache, nhưng bắt buộc client phải gửi request lên server để xác thực lại (revalidate) trước khi dùng. Muốn cấm hoàn toàn việc ghi dữ liệu vào ổ cứng hoặc bộ nhớ, directive bắt buộc phải là `no-store`.'
        },
        {
          title: 'Cạm bẫy nuốt chửng thông báo lỗi của cờ `-f` truyền thống',
          content: 'Khi dùng cờ `-f` (hoặc `--fail`), nếu server trả về mã 404 hoặc 500 kèm theo JSON giải thích chi tiết (`{"error": "User not found"}`), cURL sẽ dập tắt và không in bất kỳ byte nào của body ra terminal. Hãy dùng cờ hiện đại `--fail-with-body` (từ cURL 7.76.0+) để vừa có Exit Code 22 vừa đọc được thông báo lỗi.'
        }
      ],
      tips: [
        {
          title: 'Dùng cờ -I để kiểm tra nhanh web server còn sống mà không tốn băng thông',
          content: 'Lệnh `curl -I https://example.com` chỉ yêu cầu lấy Header mà không kéo nội dung HTML/hình ảnh về, cực kỳ thích hợp cho các script kiểm tra trạng thái sức khỏe định kỳ (Health Check).'
        }
      ],
      deepDive: {
        title: 'Vì sao cURL không bao giờ gửi URL Fragment (#) lên máy chủ?',
        content: 'Theo đặc tả chuẩn RFC 3986 Mục 3.5, ký tự `#` (fragment identifier) được định nghĩa là thông tin hướng dẫn chỉ dành riêng cho trình tác tử người dùng (User Agent/Browser) để định vị một thành phần bên trong tài nguyên đã tải về (ví dụ nhảy tới thẻ `<div id="summary">`). Giao thức HTTP ở tầng ứng dụng không có bất kỳ cấu trúc nào trong Request Line để chứa Fragment. Vì vậy, cURL sẽ tự động cắt bỏ từ dấu `#` trở về sau trước khi tạo Request Line.'
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Gửi Request HEAD và trích xuất Content-Type của API',
        problem: 'Sử dụng cURL gửi một request kiểm tra headers tới endpoint `http://127.0.0.1:8789/ping` mà không tải nội dung body về.',
        criteria: 'Sử dụng cờ `-I` hoặc `--head`, URL bọc trong ngoặc kép, output chỉ hiển thị Response Headers mà không có JSON body.',
        hint: 'Sử dụng cờ `-I` (viết hoa).',
        starterCommands: {
          bash: 'curl.exe -I "http://127.0.0.1:8789/ping"',
          powershell: 'curl.exe -I "http://127.0.0.1:8789/ping"',
          cmd: 'curl.exe -I "http://127.0.0.1:8789/ping"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -I "http://127.0.0.1:8789/ping"',
            powershell: 'curl.exe -I "http://127.0.0.1:8789/ping"',
            cmd: 'curl.exe -I "http://127.0.0.1:8789/ping"'
          },
          explanation: 'Cờ `-I` (hoặc `--head`) cấu hình cURL phát sinh HTTP method HEAD, server chỉ trả về status line và headers rồi đóng kết nối.'
        },
        solutionOutput: `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Connection: keep-alive`
      },
      {
        level: 'Trung bình',
        title: 'Bắt lỗi HTTP 404 và làm gãy lệnh với Exit Code 22',
        problem: 'Gọi endpoint mô phỏng lỗi 404 tại `http://127.0.0.1:8789/status/404` sao cho cURL in được nội dung lỗi ra màn hình nhưng hệ điều hành vẫn ghi nhận mã thoát lỗi (Exit code khác 0).',
        criteria: 'Sử dụng cờ `--fail-with-body`, cURL trả về Exit Code 22, nội dung phản hồi JSON từ server vẫn hiển thị trên terminal.',
        hint: 'Sử dụng cờ `--fail-with-body` kết hợp với `-s`.',
        starterCommands: {
          bash: 'curl.exe -s --fail-with-body "http://127.0.0.1:8789/status/404"',
          powershell: 'curl.exe -s --fail-with-body "http://127.0.0.1:8789/status/404"',
          cmd: 'curl.exe -s --fail-with-body "http://127.0.0.1:8789/status/404"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s --fail-with-body "http://127.0.0.1:8789/status/404"',
            powershell: 'curl.exe -s --fail-with-body "http://127.0.0.1:8789/status/404"',
            cmd: 'curl.exe -s --fail-with-body "http://127.0.0.1:8789/status/404"'
          },
          explanation: 'Cờ `--fail-with-body` (từ cURL 7.76.0+) giúp trả về exit code 22 khi gặp mã lỗi >= 400 trong khi vẫn hiển thị thông điệp lỗi JSON của server, khắc phục nhược điểm nuốt body của cờ `-f` truyền thống.'
        },
        solutionOutput: `{"code":404,"message":"Simulated HTTP status 404","timestamp":"2026-11-02T06:45:00.000Z"}`
      },
      {
        level: 'Khó',
        title: 'Mô phỏng Conditional Request với ETag và kiểm tra mã 304',
        problem: 'Thực hiện 2 request liên tiếp tới `http://127.0.0.1:8789/cache`: Lần 1 lấy ETag header; Lần 2 gửi lại ETag đó qua header `If-None-Match` để xác thực phản hồi 304 Not Modified.',
        criteria: 'Request thứ 2 gửi kèm header `If-None-Match` với đúng chuỗi ETag, nhận về mã trạng thái HTTP/1.1 304 Not Modified và body rỗng.',
        hint: 'Lần 1 dùng `curl -i`, quan sát dòng ETag. Lần 2 thêm `-H "If-None-Match: ..."`',
        starterCommands: {
          bash: 'curl.exe -s -i "http://127.0.0.1:8789/cache"\ncurl.exe -s -i -H \'If-None-Match: "v1.4.2-mock-hash"\' "http://127.0.0.1:8789/cache"',
          powershell: 'curl.exe -s -i "http://127.0.0.1:8789/cache"\ncurl.exe -s -i -H \'If-None-Match: "v1.4.2-mock-hash"\' "http://127.0.0.1:8789/cache"',
          cmd: 'curl.exe -s -i "http://127.0.0.1:8789/cache"\ncurl.exe -s -i -H "If-None-Match: \\"v1.4.2-mock-hash\\"" "http://127.0.0.1:8789/cache"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -i "http://127.0.0.1:8789/cache"\ncurl.exe -s -i -H \'If-None-Match: "v1.4.2-mock-hash"\' "http://127.0.0.1:8789/cache"',
            powershell: 'curl.exe -s -i "http://127.0.0.1:8789/cache"\ncurl.exe -s -i -H \'If-None-Match: "v1.4.2-mock-hash"\' "http://127.0.0.1:8789/cache"',
            cmd: 'curl.exe -s -i "http://127.0.0.1:8789/cache"\ncurl.exe -s -i -H "If-None-Match: \\"v1.4.2-mock-hash\\"" "http://127.0.0.1:8789/cache"'
          },
          explanation: 'Lần 1 server trả về `ETag: "v1.4.2-mock-hash"` kèm mã 200 và dữ liệu. Lần 2 gửi kèm `If-None-Match`, server nhận biết tài nguyên không đổi và chỉ trả về mã 304 Not Modified không kèm body.'
        },
        solutionOutput: `HTTP/1.1 304 Not Modified
ETag: "v1.4.2-mock-hash"
Connection: keep-alive`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Khi bạn thực thi lệnh `curl.exe https://api.example.com/users#profile-section`, điều gì sẽ xảy ra với phần `#profile-section`?',
        options: [
          'cURL gửi `#profile-section` lên server trong Request Line.',
          'cURL báo lỗi cú pháp URL không hợp lệ.',
          'cURL tự động cắt bỏ `#profile-section` trước khi gửi request qua socket mạng.',
          'cURL chuyển `#profile-section` thành query string `?section=profile`.'
        ],
        correctIndex: 2,
        explanation: 'Theo chuẩn RFC 3986, fragment `#` là neo vị trí nội bộ cho User Agent (trình duyệt) và không bao giờ được gửi qua đường truyền HTTP. cURL tuân thủ nghiêm ngặt điều này.'
      },
      {
        question: 'Nếu máy chủ trả về mã HTTP 500 Internal Server Error, mã thoát (Exit Code) mặc định của chương trình dòng lệnh cURL trả về cho hệ điều hành là bao nhiêu?',
        options: [
          'Mã 500',
          'Mã 1 (General Error)',
          'Mã 22 (HTTP Error)',
          'Mã 0 (Thành công)'
        ],
        correctIndex: 3,
        explanation: 'Mặc định cURL chỉ coi các lỗi mạng (DNS không phân giải được, rớt socket, hết timeout) là lỗi exit code. Việc nhận được mã HTTP 500 từ server chứng minh quá trình truyền tải giao thức đã thành công, nên exit code mặc định vẫn là 0!'
      },
      {
        question: 'Tại sao việc tự động Retry một request HTTP POST khi bị timeout mạng lại tiềm ẩn rủi ro nghiêm trọng hơn so với HTTP PUT?',
        options: [
          'Vì POST dùng nhiều băng thông hơn PUT.',
          'Vì POST là phương thức Non-idempotent; nếu request đầu tiên đã đến server và tạo đơn hàng/trừ tiền thành công, request retry thứ 2 sẽ thực hiện hành động trừ tiền thêm một lần nữa.',
          'Vì POST không hỗ trợ mã hóa TLS.',
          'Vì POST bắt buộc phải có chứng chỉ client certificate.'
        ],
        correctIndex: 1,
        explanation: 'PUT là Idempotent (thực hiện nhiều lần vẫn ra cùng kết quả trạng thái), trong khi POST là Non-idempotent. Tự động retry POST khi timeout mạng có nguy cơ tạo ra các giao dịch trùng lặp.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -v "URL"',
        description: 'Bật verbose mode: in chi tiết quá trình bắt tay kết nối, Request Line, Headers gửi đi (>) và nhận về (<).'
      },
      {
        command: 'curl.exe -I "URL"',
        description: 'Gửi HTTP HEAD request: kiểm tra nhanh Status Code và Headers phản hồi mà không tải Response Body.'
      },
      {
        command: 'curl.exe --fail-with-body "URL"',
        description: 'Bắt lỗi HTTP >= 400 trả về Exit Code 22 cho hệ điều hành nhưng vẫn in toàn bộ nội dung lỗi ra màn hình.'
      },
      {
        command: 'curl.exe -i -H \'If-None-Match: "etag"\' "URL"',
        description: 'Gửi conditional request với ETag để kiểm tra mã 304 Not Modified, tiết kiệm băng thông tối đa.'
      },
      {
        command: 'curl.exe --compressed "URL"',
        description: 'Tự động yêu cầu nén dữ liệu (gzip/brotli) và giải nén tự động trước khi hiển thị.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'URL gồm 7 thành phần; trong đó Fragment (`#`) chỉ phục vụ nội bộ client và không bao giờ được gửi lên mạng.',
      'Bản tin HTTP/1.1 dạng văn bản rõ ràng: Request/Status line, Headers, dòng trống phân cách `\\r\\n\\r\\n` và Body payload.',
      'Phân biệt rõ ràng Safe (không làm đổi trạng thái server) và Idempotent (gọi N lần cho cùng một kết quả trạng thái). Tuyệt đối thận trọng khi retry request POST.',
      'cURL mặc định trả về Exit Code 0 khi nhận mã lỗi 4xx/5xx. Luôn dùng `--fail-with-body` (hoặc `-f`) trong shell script và CI/CD để bắt lỗi chính xác.',
      'Tận dụng Conditional Request (`ETag` / `If-None-Match`) để nhận phản hồi `304 Not Modified`, tiết kiệm tối đa băng thông truyền dẫn.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'RFC 9110: HTTP Semantics (IETF)',
        url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
        description: 'Tài liệu chuẩn mực IETF quy định toàn bộ ngữ nghĩa HTTP, định dạng Header, Status Code và đặc tính Safe/Idempotent.'
      },
      {
        title: 'RFC 3986: Uniform Resource Identifier (URI) Generic Syntax',
        url: 'https://www.rfc-editor.org/rfc/rfc3986',
        description: 'Đặc tả tiêu chuẩn quốc tế phân rã cấu trúc URL và vai trò của Fragment identifier.'
      },
      {
        title: 'MDN Web Docs: HTTP Caching',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching',
        description: 'Hướng dẫn toàn diện về cơ chế lưu bộ đệm HTTP, xác thực ETag, Last-Modified và Cache-Control directives.'
      },
      {
        title: 'Everything curl: HTTP Protocol Basics',
        url: 'https://everything.curl.dev/http',
        description: 'Chuyên mục hướng dẫn cURL tương tác với giao thức HTTP trong sách Everything curl.'
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
          issue: 'Cạm bẫy Exit Code 0 khi gặp lỗi HTTP 404/500 khiến script CI/CD tưởng nhầm là thành công',
          severity: 'Critical',
          resolution: 'Đã xây dựng mục cảnh báo nổi bật tại Lớp 3 và đưa ví dụ đối chiếu giữa mặc định (Exit 0) và --fail-with-body (Exit 22)'
        },
        {
          issue: 'Ký tự & trong Query String bị Bash hiểu nhầm thành toán tử chạy nền (Background job)',
          severity: 'Critical',
          resolution: 'Đã đưa vào hộp Pitfall và nhấn mạnh quy tắc luôn bọc URL trong cặp ngoặc kép'
        },
        {
          issue: 'Hiểu sai giữa hai chỉ thị bộ nhớ đệm Cache-Control: no-cache và no-store',
          severity: 'Major',
          resolution: 'Đã phân tích rõ no-cache vẫn lưu bản ghi và revalidate, còn no-store mới là cấm lưu trữ'
        },
        {
          issue: 'Nguy cơ trùng lặp giao dịch khi tự động Retry request Non-idempotent (POST/PATCH)',
          severity: 'Critical',
          resolution: 'Đã lập bảng ma trận Safe/Idempotent chi tiết trong Lớp 2 và đưa vào Warning bảo mật'
        },
        {
          issue: 'Thắc mắc của học viên vì sao Fragment (#) trong URL không bao giờ đến được máy chủ',
          severity: 'Minor',
          resolution: 'Đã bổ sung giải thích chuyên sâu DeepDive chiếu theo đặc tả RFC 3986 Mục 3.5'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://curl.se/docs/manpage.html',
        'https://everything.curl.dev/http',
        'https://www.rfc-editor.org/rfc/rfc3986',
        'https://developer.mozilla.org/en-US/docs/Web/HTTP'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH03_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
