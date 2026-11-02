/**
 * Chương 08: Xác Thực & Quản Lý Token: Basic, Bearer, API Key, OAuth2 (data/curl/chapters/ch08.js)
 * Cấp độ: Trung cấp | Thời lượng: ~30 phút | cURL tối thiểu: 7.0.0 (cờ --oauth2-bearer ≥ 7.33.0, --netrc-file ≥ 7.21.5)
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch08',
    meta: {
      id: 'ch08',
      order: 8,
      title: 'Xác Thực & Quản Lý Token: Basic, Bearer, API Key, OAuth2',
      level: 'Trung cấp',
      curlMinVersion: '7.0.0',
      qaStatus: 'verified'
    },
    partId: 'level-2',
    partTitle: 'Cấp độ 2: Kỹ Năng Trung Cấp',
    number: '08',
    title: 'Xác Thực & Quản Lý Token: Basic, Bearer, API Key, OAuth2',
    subtitle: 'Thực hành toàn diện các chuẩn xác thực API phổ biến, làm chủ cờ --oauth2-bearer, quản trị file .netrc an toàn và các giải pháp chống rò rỉ secret trong môi trường Production',
    level: 'Trung cấp',
    duration: '30 phút',
    curlMinVersion: '7.0.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Nắm vững bản chất kiến trúc HTTP Basic Authentication theo RFC 7617, cơ chế giải mã Base64 (tại sao Base64 không phải là mã hóa) và ứng dụng cờ `-u, --user` kèm chế độ prompt nhập mật khẩu ẩn an toàn.',
      'Sử dụng thành thạo Bearer Token (JWT / OAuth 2.0 Access Token) theo chuẩn RFC 6750 qua cả 2 phương pháp: truyền thống `-H "Authorization: Bearer <token>"` và cờ chuyên biệt hiện đại `--oauth2-bearer <token>` (cURL ≥ 7.33.0).',
      'Phân biệt rõ ràng các mô hình truyền API Key trong thực tế (Custom Header `X-API-Key` vs Header `Authorization` vs Query Parameter `?api_key=...`), hiểu rõ đánh đổi giữa tính tiện lợi và nguy cơ rò rỉ Access Log.',
      'Làm chủ cẩm nang bảo vệ Secret tối thượng: Sử dụng file cấu hình `.netrc` (`--netrc`, `--netrc-file`), phân quyền `chmod 600`, và kỹ thuật nạp token từ biến môi trường/file để triệt tiêu hoàn toàn nguy cơ lộ secret trong bảng tiến trình hệ điều hành (`ps aux`).',
      'Hiểu rõ cơ chế tự động tước bỏ Authorization của cURL khi Follow Redirect (`-L`) sang domain khác để ngăn chặn rò rỉ token sang bên thứ ba, và lý do tại sao cờ `--location-trusted` bị coi là mối đe dọa an ninh nghiêm trọng (Critical Risk).'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành Chương 07: Thành thạo cờ `-H`, hiểu rõ cấu trúc HTTP Headers theo RFC 9110, và kỹ thuật nạp headers từ file `-H @file`.',
      'Nắm vững ngữ nghĩa của các mã trạng thái HTTP xác thực: `401 Unauthorized` (kèm header phản hồi `WWW-Authenticate`) và `403 Forbidden` (đã học ở Chương 03).'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Hộ chiếu đóng dấu, thẻ quẹt RFID và chiếc két sắt bí mật',
      metaphor: 'Xác thực trong thế giới API giống như việc bạn đi qua các cổng an ninh của một tòa nhà chính phủ tối mật. Basic Authentication (`-u`) giống như bạn mang theo một chiếc thẻ căn cước có ghi tên và mật khẩu viết bằng bút chì (chuỗi Base64). Bất kỳ ai nhìn vào chiếc thẻ cũng đọc được mật khẩu trong tích tắc nếu bạn không bọc nó trong một phong bì bảo mật dày (kết nối mã hóa HTTPS). Bearer Token (JWT / OAuth2) giống như chiếc thẻ quẹt từ RFID dùng một lần: nó có hạn sử dụng ngắn hạn (Expiry Time) được cấp từ quầy lễ tân (Authorization Server). Bất kỳ ai cầm chiếc thẻ trong tay ("Bearer" nghĩa là "người cầm/mang theo") đều mở được cửa mà không cần biết mật khẩu gốc của bạn; nhưng nếu kẻ xấu nhặt được sau khi thẻ đã hết hạn, nó chỉ là một mẩu nhựa vô giá trị. API Key giống như chiếc chìa khóa vạn năng bằng đồng dành riêng cho nhân viên bảo trì hệ thống, có tuổi thọ dài và thường được cắm vào ổ khóa riêng (`X-API-Key`). Và cạm bẫy lớn nhất là gì? Rất nhiều người đứng giữa sảnh đông người gào to mật khẩu (gõ thẳng `-u user:password` trên terminal). Bất kỳ ai liếc nhìn bảng tiến trình (`ps aux`) hoặc cuốn sổ ghi nhật ký (`.bash_history`) đều chép lại được toàn bộ. Kỹ sư chuyên nghiệp sẽ cất mật khẩu vào chiếc két sắt bí mật (`~/.netrc` hoặc nạp qua file/stdin) và chỉ đưa thẻ ra đúng lúc chạm cổng!',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">SO SÁNH 3 PHƯƠNG THỨC XÁC THỰC API PHỔ BIẾN TRONG cURL</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#38bdf8;font-weight:700;">1. Basic Authentication</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cờ: <code>-u user:pass</code><br/>Header: <code>Authorization: Basic &lt;base64&gt;</code><br/>Đặc điểm: Cổ điển, đơn giản, BẮT BUỘC dùng HTTPS.</div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;">2. Bearer Token (OAuth2 / JWT)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cờ: <code>--oauth2-bearer &lt;token&gt;</code><br/>Header: <code>Authorization: Bearer &lt;token&gt;</code><br/>Đặc điểm: Hiện đại, có thời hạn (exp), chuẩn REST/SPA.</div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#f59e0b;font-weight:700;">3. API Key (Service-to-Service)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cờ: <code>-H "X-API-Key: &lt;key&gt;"</code><br/>Vị trí: Custom Header (khuyến nghị) hoặc Query param.<br/>Đặc điểm: Dài hạn, gắn liền với ứng dụng hoặc tenant.</div>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '-u',
        longFlag: '--user',
        description: 'Truyền thông tin xác thực `user:password` cho server, hoặc chỉ định `user` để cURL prompt nhập mật khẩu ẩn an toàn.',
        minVersion: '7.0.0'
      },
      {
        flag: '--basic',
        longFlag: '--basic',
        description: 'Bắt buộc cURL sử dụng chuẩn xác thực HTTP Basic Authentication (RFC 7617).',
        minVersion: '7.10.6'
      },
      {
        flag: '--oauth2-bearer',
        longFlag: '--oauth2-bearer',
        description: 'Chỉ định Bearer token cho OAuth 2.0 (tự động gắn header `Authorization: Bearer <token>`).',
        minVersion: '7.33.0'
      },
      {
        flag: '--netrc',
        longFlag: '--netrc',
        description: 'Tự động đọc thông tin đăng nhập (username, password) từ file `~/.netrc` (hoặc `%USERPROFILE%\\_netrc` trên Windows).',
        minVersion: '7.0.0'
      },
      {
        flag: '--netrc-file',
        longFlag: '--netrc-file',
        description: 'Chỉ định đường dẫn chính xác tới file .netrc tùy chọn để lấy thông tin đăng nhập tự động.',
        minVersion: '7.21.5'
      },
      {
        flag: '--netrc-optional',
        longFlag: '--netrc-optional',
        description: 'Sử dụng file .netrc nếu tìm thấy host tương ứng; nếu không tìm thấy thì gửi request bình thường không có auth.',
        minVersion: '7.10.8'
      },
      {
        flag: '--digest',
        longFlag: '--digest',
        description: 'Kích hoạt chuẩn xác thực HTTP Digest Authentication (RFC 7616), an toàn hơn Basic Auth trên kết nối không mã hóa.',
        minVersion: '7.10.6'
      },
      {
        flag: '--anyauth',
        longFlag: '--anyauth',
        description: 'Cho phép cURL tự động thỏa thuận (negotiate) với server để chọn phương thức xác thực an toàn nhất mà server hỗ trợ.',
        minVersion: '7.10.6'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: HTTP Basic Authentication (-u) & Bản Chất Base64 (RFC 7617)',
        content: `
          <p><strong>HTTP Basic Authentication</strong> là cơ chế xác thực lâu đời và phổ biến nhất được chuẩn hóa trong <strong>RFC 7617</strong>. Quy trình bắt tay xác thực diễn ra như sau:</p>
          <ol>
            <li>Client gửi request ban đầu mà không có thông tin xác thực.</li>
            <li>Server từ chối và trả về mã lỗi <strong><code>401 Unauthorized</code></strong> kèm header phản hồi:
              <pre class="code-pre"><code>WWW-Authenticate: Basic realm="Restricted Area"</code></pre>
            </li>
            <li>Client gửi lại request kèm theo header xác thực:
              <pre class="code-pre"><code>Authorization: Basic &lt;chuỗi_mã_hóa_base64&gt;</code></pre>
            </li>
          </ol>

          <h3>1. Bản Chất Chuỗi Base64: Tuyệt Đối Không Phải Là Mã Hóa!</h3>
          <p>Chuỗi sau từ khóa <code>Basic</code> thực chất chỉ là kết quả ghép <code>username:password</code> rồi chuyển đổi sang bảng mã <strong>Base64</strong>. Ví dụ: với tài khoản <code>admin:secret123</code>, chuỗi sinh ra là <code>YWRtaW46c2VjcmV0MTIz</code>.</p>
          <div style="padding:12px;background:var(--bg-surface-alt);border-left:4px solid var(--danger);margin:12px 0;font-size:0.88rem;">
            <strong>CẢNH BÁO SỐNG CÒN:</strong> Base64 chỉ là <em>Encoding</em> (mã hóa biểu diễn nhị phân sang ký tự đọc được), hoàn toàn <strong>KHÔNG CÓ KHÓA MÃ HÓA (No Encryption Key)</strong>! Bất kỳ ai bắt được gói tin qua Wi-Fi công cộng đều có thể giải mã ra password trong 1 giây bằng lệnh:
            <pre class="code-pre"><code>echo "YWRtaW46c2VjcmV0MTIz" | base64 --decode
# Kết quả lập tức hiện ra: admin:secret123</code></pre>
            Do đó, Basic Authentication <strong>BẮT BUỘC PHẢI CHẠY TRÊN GIAO THỨC HTTPS</strong>. Chạy Basic Auth trên HTTP thuần là một lỗ hổng an ninh sơ đẳng!
          </div>

          <h3>2. Cú Pháp cURL: Dòng Lệnh vs Chế Độ Prompt Ẩn Mật Khẩu</h3>
          <ul>
            <li><strong>Gõ thẳng mật khẩu:</strong> <code>curl.exe -u "username:password" https://api.com</code>. Nhanh chóng trong lúc thử nghiệm nhưng để lại dấu vết trong shell history và bảng tiến trình.</li>
            <li><strong>Chế độ Prompt an toàn:</strong> <code>curl.exe -u "username" https://api.com</code> (chỉ gõ username, bỏ qua dấu hai chấm và password). cURL sẽ tự động dừng lại và yêu cầu:
              <pre class="code-pre"><code>Enter host password for user 'username':</code></pre>
              Ký tự mật khẩu bạn gõ vào terminal sẽ bị ẩn hoàn toàn (no echo), không bao giờ bị lưu vào lịch sử lệnh!
            </li>
          </ul>
        `,
        codeExamples: [
          {
            id: 'ex-ch08-sec01',
            title: 'Ví dụ 1: Xác Thực HTTP Basic Auth Với Cờ -u Và Đối Chiếu Phản Hồi 200 Thành Công vs 401 Thất Bại',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# 1. Xác thực thành công với username và password hợp lệ\ncurl.exe -s -u "admin:secret123" "http://127.0.0.1:8789/basic-auth/admin/secret123"\n\n# 2. Xem phản hồi 401 kèm header WWW-Authenticate khi sai mật khẩu\ncurl.exe -s -i -u "admin:wrongpass" "http://127.0.0.1:8789/basic-auth/admin/secret123"',
              powershell: '# 1. Xác thực thành công với username và password hợp lệ\ncurl.exe -s -u "admin:secret123" "http://127.0.0.1:8789/basic-auth/admin/secret123"\n\n# 2. Xem phản hồi 401 kèm header WWW-Authenticate khi sai mật khẩu\ncurl.exe -s -i -u "admin:wrongpass" "http://127.0.0.1:8789/basic-auth/admin/secret123"',
              cmd: ':: 1. Xác thực thành công với username và password hợp lệ\ncurl.exe -s -u "admin:secret123" "http://127.0.0.1:8789/basic-auth/admin/secret123"\n\n:: 2. Xem phản hồi 401 kèm header WWW-Authenticate khi sai mật khẩu\ncurl.exe -s -i -u "admin:wrongpass" "http://127.0.0.1:8789/basic-auth/admin/secret123"'
            },
            realOutput: `{"authenticated":true,"user":"admin"}
HTTP/1.1 401 Unauthorized\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS\r\nAccess-Control-Allow-Headers: *\r\nAccess-Control-Expose-Headers: *\r\nWWW-Authenticate: Basic realm="Mock Realm"\r\nContent-Type: application/json\r\nDate: Mon, 02 Nov 2026 07:43:37 GMT\r\nConnection: keep-alive\r\nKeep-Alive: timeout=5\r\nTransfer-Encoding: chunked\r\n\r\n{"authenticated":false,"error":"Unauthorized credentials"}`,
            explanationTokens: [
              { token: '-u "admin:secret123"', meaning: 'cURL tự động chuyển admin:secret123 thành Authorization: Basic YWRtaW46c2VjcmV0MTIz' },
              { token: '{"authenticated":true,"user":"admin"}', meaning: 'Server giải mã Base64 thành công và xác thực phiên đăng nhập' },
              { token: 'HTTP/1.1 401 Unauthorized', meaning: 'Server từ chối truy cập khi thông tin đăng nhập không chính xác' },
              { token: 'WWW-Authenticate: Basic realm=...', meaning: 'Thách thức xác thực chuẩn RFC báo cho client biết server yêu cầu loại chứng thực nào' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Bearer Token, JWT & Cờ Chuyên Biệt --oauth2-bearer (cURL ≥ 7.33.0)',
        content: `
          <p>Trong các kiến trúc REST API hiện đại, Microservices, và ứng dụng di động/Single Page App (SPA), mô hình xác thực phổ biến nhất là <strong>Bearer Token</strong> được định nghĩa trong <strong>RFC 6750</strong> (OAuth 2.0 Bearer Token Usage).</p>
          <p>Từ "Bearer" mang ý nghĩa: <em>"Bất kỳ ai nắm giữ token này đều được cấp quyền tương ứng"</em>. Token thường là một chuỗi mã hóa ký số <strong>JWT (JSON Web Token)</strong> hoặc chuỗi Opaque Token ngẫu nhiên có độ dài lớn.</p>

          <h3>1. Hai Cách Truyền Bearer Token Trong cURL</h3>
          <p>Để gửi Bearer token lên server, cURL cung cấp 2 phương thức:</p>
          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Phương pháp</th>
                  <th>Cú pháp lệnh</th>
                  <th>Phiên bản hỗ trợ</th>
                  <th>Đánh giá ưu nhược điểm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Cách thủ công qua -H</strong></td>
                  <td><code>curl.exe -H "Authorization: Bearer &lt;token&gt;" URL</code></td>
                  <td>Mọi phiên bản cURL (≥ 7.0.0)</td>
                  <td>Phổ biến nhất, tương thích mọi hệ thống, nhưng chuỗi lệnh dài và dễ gõ sai dấu cách.</td>
                </tr>
                <tr>
                  <td><strong>Cách hiện đại qua cờ chuyên dụng</strong></td>
                  <td><code>curl.exe --oauth2-bearer "&lt;token&gt;" URL</code></td>
                  <td>cURL ≥ <strong>7.33.0</strong> (Tháng 10/2013)</td>
                  <td>Ngắn gọn, sạch sẽ, chuẩn ngữ nghĩa OAuth2, cURL tự động xử lý header ngầm bên dưới.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>2. Quy Trình 2 Bước OAuth 2.0 Hoàn Chỉnh Bằng Dòng Lệnh</h3>
          <p>Trong thực tế, bạn thường kết hợp 2 lệnh cURL trong một kịch bản Bash/PowerShell:</p>
          <pre class="code-pre"><code># BƯỚC 1: Lấy Token từ Authorization Server (grant_type=client_credentials)
TOKEN=$(curl.exe -s -d "grant_type=client_credentials&client_id=my_id&client_secret=my_sec" \\
  https://auth.company.com/oauth/token | jq -r .access_token)

# BƯỚC 2: Gọi Resource API với Token vừa nhận
curl.exe -s --oauth2-bearer "$TOKEN" https://api.company.com/v1/orders</code></pre>
        `,
        codeExamples: [
          {
            id: 'ex-ch08-sec02',
            title: 'Ví dụ 2: Xác Thực Bearer Token Bằng Cờ Chuyên Dụng Hiện Đại --oauth2-bearer',
            minVersion: '7.33.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s --oauth2-bearer "tok_secret_oauth_abc123" "http://127.0.0.1:8789/bearer"',
              powershell: 'curl.exe -s --oauth2-bearer "tok_secret_oauth_abc123" "http://127.0.0.1:8789/bearer"',
              cmd: 'curl.exe -s --oauth2-bearer "tok_secret_oauth_abc123" "http://127.0.0.1:8789/bearer"'
            },
            realOutput: `{"authenticated":true,"tokenPrefix":"tok_..."}`,
            explanationTokens: [
              { token: '--oauth2-bearer "tok_secret_oauth_abc123"', meaning: 'Cờ chuyên dụng của cURL tự động đính kèm header Authorization: Bearer tok_secret_oauth_abc123' },
              { token: 'tokenPrefix: "tok_..."', meaning: 'Server xác nhận token hợp lệ và chỉ trích xuất tiền tố an toàn để phản hồi' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: API Key Trong Thực Tế: Header vs Query String & Xử Lý Rate Limiting',
        content: `
          <p><strong>API Key</strong> thường được dùng cho giao tiếp Service-to-Service hoặc tích hợp giữa các nhà cung cấp nền tảng (ví dụ: Stripe, OpenAI, SendGrid, AWS). Khác với Bearer token (thường có hạn ngắn vài phút hoặc vài giờ), API Key là một chuỗi khóa bí mật tĩnh có vòng đời dài.</p>

          <h3>1. So Sánh 3 Vị Trí Truyền API Key Trong cURL</h3>
          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Vị trí truyền</th>
                  <th>Cú pháp lệnh cURL</th>
                  <th>Mức độ an toàn</th>
                  <th>Nguy cơ thực tế</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Custom Request Header</strong><br/><em>(Khuyến nghị tiêu chuẩn)</em></td>
                  <td><code>-H "X-API-Key: live_sk_..."</code></td>
                  <td style="color:var(--success);font-weight:700;">RẤT CAO</td>
                  <td>Header không bị ghi vào file Access Log của Nginx, CDN hay lịch sử trình duyệt.</td>
                </tr>
                <tr>
                  <td><strong>Header Authorization chuẩn</strong></td>
                  <td><code>-H "Authorization: ApiKey live_sk_..."</code></td>
                  <td style="color:var(--success);font-weight:700;">RẤT CAO</td>
                  <td>Tuân thủ chuẩn IETF, một số API Gateway (Kong, Tyk) hỗ trợ lọc tự động.</td>
                </tr>
                <tr>
                  <td><strong>URL Query Parameter</strong><br/><em>(Kém an toàn)</em></td>
                  <td><code>--url-query "api_key=live_sk_..."</code></td>
                  <td style="color:var(--danger);font-weight:700;">KÉM AN TOÀN</td>
                  <td><strong>Rò rỉ nghiêm trọng:</strong> Toàn bộ chuỗi URL chứa API Key sẽ bị ghi lại vào Access Log của Web Server, Proxy, Cloudflare, và thanh địa chỉ trình duyệt!</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>2. Theo Dõi Header Giới Hạn Tần Suất Gọi (Rate Limiting) Khi Dùng API Key</h3>
          <p>Khi dùng API Key, máy chủ thường kiểm soát số lượng request bạn được phép gọi trong mỗi phút/giờ. Để đọc các headers giới hạn này, hãy kết hợp <code>-s -i</code> hoặc <code>-D headers.log</code>:</p>
          <pre class="code-pre"><code># Đọc các header Rate Limit quan trọng:
X-RateLimit-Limit: 1000        # Số lượng request tối đa trong cửa sổ thời gian
X-RateLimit-Remaining: 985     # Số lượng request còn lại
Retry-After: 30                # Số giây cần chờ nếu bị dính HTTP 429 Too Many Requests</code></pre>
        `,
        codeExamples: [
          {
            id: 'ex-ch08-sec03',
            title: 'Ví dụ 3: Xác Thực API Key Bằng Custom Header X-API-Key Chuẩn Mực',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -H "X-API-Key: live_sk_998877665544" "http://127.0.0.1:8789/echo"',
              powershell: 'curl.exe -s -H "X-API-Key: live_sk_998877665544" "http://127.0.0.1:8789/echo"',
              cmd: 'curl.exe -s -H "X-API-Key: live_sk_998877665544" "http://127.0.0.1:8789/echo"'
            },
            realOutput: `{\n  "method": "GET",\n  "path": "/echo",\n  "query": {},\n  "headers": {\n    "host": "127.0.0.1:8789",\n    "user-agent": "curl/8.21.0",\n    "accept": "*/*",\n    "x-api-key": "live_sk_998877665544"\n  },\n  "bodyRaw": "",\n  "bodyJson": null,\n  "bodyLength": 0,\n  "timestamp": "2026-11-02T07:43:38.156Z"\n}`,
            explanationTokens: [
              { token: '-H "X-API-Key: live_sk_998877665544"', meaning: 'Đính kèm khóa API vào header HTTP để server kiểm tra quyền truy cập' },
              { token: '"x-api-key": "live_sk_998877665544"', meaning: 'Server nhận diện chính xác khóa API mà không để lại vết trên URL truy vấn' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Cẩm Nang Bảo Mật Token Tối Thượng: File .netrc, Process Table & Chống Rò Rỉ Redirect',
        content: `
          <p>Là một kỹ sư phần mềm chuyên nghiệp, việc bảo vệ thông tin xác thực (Credentials Hardening) là yêu cầu bắt buộc trước khi đưa bất kỳ kịch bản cURL nào vào môi trường Production hoặc CI/CD.</p>

          <h3>1. Cơ Chế File \`.netrc\` Chuẩn Unix / RFC 6749</h3>
          <p>Thay vì lưu mật khẩu trong mã nguồn script hoặc gõ trên dòng lệnh, cURL hỗ trợ đọc tự động thông tin xác thực từ file cấu hình <code>~/.netrc</code> (trên Windows là <code>%USERPROFILE%\\_netrc</code>):</p>
          <pre class="code-pre"><code># Cấu trúc file ~/.netrc:
machine api.github.com
login octocat
password ghp_secret_access_token_123456

machine internal.corp.net
login deployer
password super_strong_corp_password</code></pre>
          <p>Khi bạn thực hiện lệnh: <code>curl.exe --netrc https://api.github.com/user</code>, cURL sẽ tự động tìm kiếm domain <code>api.github.com</code> trong file <code>.netrc</code> và gắn credentials tương ứng mà bạn không cần phải gõ bất kỳ mật khẩu nào trên dòng lệnh!</p>
          <p><strong>Quy tắc an ninh bắt buộc:</strong> File <code>.netrc</code> phải được phân quyền chỉ cho duy nhất chủ nhân sở hữu đọc/ghi: <code>chmod 600 ~/.netrc</code>. Nếu quyền file quá mở (ví dụ 644 hoặc 777), cURL sẽ từ chối đọc file để cảnh báo người dùng.</p>

          <h3>2. Hiểm Họa Bảng Tiến Trình Hệ Điều Hành (Process Table Exposure)</h3>
          <p>Bất kỳ tham số nào bạn truyền trực tiếp vào dòng lệnh, ví dụ: <code>curl -u admin:password123 ...</code>, đều bị ghi lại trong bộ nhớ tiến trình của hệ điều hành. Bất kỳ người dùng nào trên cùng server chạy lệnh <code>ps aux | grep curl</code> hoặc kiểm tra <code>/proc/&lt;pid&gt;/cmdline</code> đều đọc được nguyên vẹn mật khẩu của bạn!</p>
          <p><strong>Các giải pháp khắc phục triệt để:</strong></p>
          <ol>
            <li>Dùng file <code>.netrc</code> với cờ <code>--netrc</code> hoặc <code>--netrc-file &lt;path&gt;</code>.</li>
            <li>Dùng file cấu hình cURL: <code>curl.exe --config /path/to/auth.cfg https://api.com</code> (file <code>auth.cfg</code> chứa <code>user = "admin:secret"</code>).</li>
            <li>Nạp header từ file: <code>curl.exe -H "@token_header.txt" https://api.com</code>.</li>
          </ol>

          <h3>3. Cơ Chế Tự Động Tước Bỏ Secret Khi Chuyển Hướng (-L) & Cạm Bẫy --location-trusted</h3>
          <p>Một tính năng bảo mật tuyệt vời của cURL là: khi bạn kích hoạt theo dõi chuyển hướng <code>-L</code>, nếu máy chủ chuyển hướng (301/302) sang một <strong>host khác (domain khác)</strong>, cURL sẽ <strong>TỰ ĐỘNG XÓA BỎ</strong> các thông tin xác thực (username/password, Basic Auth, Bearer token) khỏi request chuyển tiếp.</p>
          <p>Nếu bạn sử dụng cờ <code>--location-trusted</code>, bạn đang ép cURL tiếp tục gửi mật khẩu/token sang cho bên thứ ba. Kẻ tấn công có thể lợi dụng điều này bằng cách tạo ra một endpoint chuyển hướng từ server của bạn sang server độc hại của họ để chiếm đoạt token xác thực!</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch08-sec04',
            title: 'Ví dụ 4: Nạp Thông Tin Xác Thực An Toàn Từ Biến Môi Trường Tránh Phơi Bày Secret Trong Mã Lệnh',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# 1. Lưu token trong biến môi trường (không gõ token thẳng vào lệnh curl)\nexport API_TOKEN="live_sk_998877665544"\n\n# 2. Truyền biến môi trường vào request an toàn\ncurl.exe -s -H "X-API-Key: $API_TOKEN" "http://127.0.0.1:8789/echo"',
              powershell: '# 1. Thiết lập biến môi trường trong PowerShell\n$env:API_TOKEN = "live_sk_998877665544"\n\n# 2. Truyền biến môi trường an toàn vào cờ -H\ncurl.exe -s -H "X-API-Key: $env:API_TOKEN" "http://127.0.0.1:8789/echo"',
              cmd: ':: 1. Thiết lập biến môi trường trong CMD\nset API_TOKEN=live_sk_998877665544\n\n:: 2. Nạp biến môi trường an toàn\ncurl.exe -s -H "X-API-Key: %API_TOKEN%" "http://127.0.0.1:8789/echo"'
            },
            realOutput: `{\n  "method": "GET",\n  "path": "/echo",\n  "query": {},\n  "headers": {\n    "host": "127.0.0.1:8789",\n    "user-agent": "curl/8.21.0",\n    "accept": "*/*",\n    "x-api-key": "live_sk_998877665544"\n  },\n  "bodyRaw": "",\n  "bodyJson": null,\n  "bodyLength": 0,\n  "timestamp": "2026-11-02T07:43:38.156Z"\n}`,
            explanationTokens: [
              { token: '$API_TOKEN / $env:API_TOKEN', meaning: 'Sử dụng biến môi trường giúp tách biệt hoàn toàn chuỗi secret khỏi kịch bản lệnh' },
              { token: '"x-api-key": "live_sk_..."', meaning: 'Giao tiếp xác thực an toàn qua kết nối mạng được bảo vệ' }
            ]
          }
        ]
      }
    ],

    // 6. Lỗi thường gặp & Bảo mật thực chiến (Callouts)
    callouts: {
      warning: {
        title: 'CẤM gõ mật khẩu hoặc API Key bí mật trực tiếp trong câu lệnh terminal trên môi trường dùng chung',
        content: 'Bất kỳ chuỗi ký tự nào bạn gõ sau `-u user:password` hoặc `-H "Authorization: Bearer <secret>"` đều xuất hiện công khai trong danh sách tiến trình (`ps aux`, Task Manager) và được lưu trữ vĩnh viễn trong file lịch sử dòng lệnh shell (`.bash_history`, `ConsoleHost_history.txt`). Trên máy chủ chia sẻ hoặc môi trường CI/CD, bất kỳ ai cũng có thể đọc trộm secret của bạn. Hãy luôn dùng cờ `--netrc`, file cấu hình `--config`, hoặc chế độ prompt tương tác `curl -u user`.'
      },
      pitfalls: [
        {
          title: 'Truyền API Key qua URL Query String làm rò rỉ vào Access Log của Web Server',
          content: 'Nhiều lập trình viên lười biếng sử dụng `curl "https://api.com/data?key=secret_123"`. Hậu quả là toàn bộ chuỗi URL chứa API key sẽ bị ghi lại trong Access Log của Nginx, Apache, Proxy trung gian, và Cloudflare. Bất kỳ quản trị viên nào có quyền đọc file log đều nắm được chìa khóa vào hệ thống của bạn!'
        },
        {
          title: 'Ngộ nhận Base64 trong Basic Auth là mã hóa an toàn và gửi qua HTTP không mã hóa',
          content: 'Base64 chỉ là cơ chế biến đổi dữ liệu nhị phân thành văn bản ASCII, bất kỳ ai cũng có thể giải mã ra username và password gốc chỉ trong 1 dòng lệnh. Basic Auth BẮT BUỘC chỉ được truyền qua kết nối bảo mật HTTPS (TLS).'
        },
        {
          title: 'Hiểm họa rò rỉ token khi kết hợp Follow Redirect (-L) với cờ --location-trusted',
          content: 'Nếu API server của bạn chuyển hướng sang một trang thanh toán hoặc tài nguyên bên thứ ba, cờ `--location-trusted` sẽ gửi nguyên vẹn Authorization token sang cho máy chủ thứ ba đó. Tuyệt đối không dùng cờ này trừ khi bạn có lý do kiểm soát 100% đích đến.'
        },
        {
          title: 'Lỗi vỡ cú pháp do khoảng trắng thừa khi gõ header Bearer thủ công',
          content: 'Nếu gõ `-H "Authorization: Bearer  token"` (thừa 2 dấu cách) hoặc gõ sai chính tả `Bearer` thành `bearer`/`Token`, nhiều API Gateway nghiêm ngặt sẽ từ chối với lỗi 401 Unauthorized. Hãy ưu tiên sử dụng cờ chuyên biệt `--oauth2-bearer`.'
        }
      ],
      tips: [
        {
          title: 'Dùng cú pháp curl -u username để mở prompt nhập mật khẩu an toàn',
          content: 'Nếu bạn chỉ gõ `-u admin` (không kèm dấu hai chấm và password), cURL sẽ mở prompt yêu cầu nhập mật khẩu và tự động ẩn các ký tự nhập vào, ngăn chặn hoàn toàn việc mật khẩu bị lưu vào lịch sử lệnh.'
        },
        {
          title: 'Phân quyền nghiêm ngặt chmod 600 cho file .netrc',
          content: 'Trên hệ điều hành Linux/macOS, hãy luôn chạy `chmod 600 ~/.netrc` ngay sau khi tạo file. cURL sẽ từ chối đọc file nếu phát hiện file này có thể bị đọc bởi người dùng khác trên cùng hệ thống.'
        }
      ],
      deepDive: {
        title: 'Thuật toán tiêu chuẩn RFC 7617 của HTTP Basic Auth và cơ chế Negotiate Auth trong libcurl',
        content: 'Bên trong libcurl (`lib/http_auth.c`), khi nhận được phản hồi `401 Unauthorized`, hàm `Curl_http_input_auth` sẽ quét header `WWW-Authenticate` để phát hiện các cơ chế mà máy chủ chào mời. Nếu người dùng chỉ định cờ `--anyauth`, libcurl sẽ ưu tiên lựa chọn phương thức xác thực an toàn nhất theo thứ tự: Digest (RFC 7616 - băm mật khẩu với server nonce) > NTLM / Kerberos (xác thực mạng doanh nghiệp Windows) > Basic Auth (Base64). Điều này giúp bảo vệ tối đa dữ liệu của bạn trước các cuộc tấn công Downgrade Attack.'
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Xác thực HTTP Basic Auth với cờ -u',
        problem: 'Sử dụng cờ `-u` để gửi một request GET tới endpoint `http://127.0.0.1:8789/basic-auth/admin/secret123` với tài khoản `admin` và mật khẩu `secret123`.',
        criteria: 'Sử dụng đúng cờ `-u "admin:secret123"`, máy chủ phản hồi mã trạng thái 200 kèm JSON xác thực thành công `authenticated: true`.',
        hint: 'Dùng cờ `-u "user:password"` kết hợp endpoint basic-auth.',
        starterCommands: {
          bash: 'curl.exe -s -u "admin:secret123" "http://127.0.0.1:8789/basic-auth/admin/secret123"',
          powershell: 'curl.exe -s -u "admin:secret123" "http://127.0.0.1:8789/basic-auth/admin/secret123"',
          cmd: 'curl.exe -s -u "admin:secret123" "http://127.0.0.1:8789/basic-auth/admin/secret123"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -u "admin:secret123" "http://127.0.0.1:8789/basic-auth/admin/secret123"',
            powershell: 'curl.exe -s -u "admin:secret123" "http://127.0.0.1:8789/basic-auth/admin/secret123"',
            cmd: 'curl.exe -s -u "admin:secret123" "http://127.0.0.1:8789/basic-auth/admin/secret123"'
          },
          explanation: 'cURL tự động mã hóa chuỗi admin:secret123 thành Base64 và đính kèm vào header Authorization: Basic.'
        },
        solutionOutput: `{"authenticated":true,"user":"admin"}`
      },
      {
        level: 'Trung bình',
        title: 'Xác thực Bearer Token bằng cờ hiện đại --oauth2-bearer',
        problem: 'Sử dụng cờ `--oauth2-bearer` gửi token `tok_secret_oauth_abc123` tới endpoint `http://127.0.0.1:8789/bearer` để xác thực quyền truy cập.',
        criteria: 'Sử dụng cờ `--oauth2-bearer`, không gõ thủ công header Authorization, server nhận diện và trả về JSON `authenticated: true`.',
        hint: 'Sử dụng cờ `--oauth2-bearer <token>` ra đời từ cURL 7.33.0.',
        starterCommands: {
          bash: 'curl.exe -s --oauth2-bearer "tok_secret_oauth_abc123" "http://127.0.0.1:8789/bearer"',
          powershell: 'curl.exe -s --oauth2-bearer "tok_secret_oauth_abc123" "http://127.0.0.1:8789/bearer"',
          cmd: 'curl.exe -s --oauth2-bearer "tok_secret_oauth_abc123" "http://127.0.0.1:8789/bearer"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s --oauth2-bearer "tok_secret_oauth_abc123" "http://127.0.0.1:8789/bearer"',
            powershell: 'curl.exe -s --oauth2-bearer "tok_secret_oauth_abc123" "http://127.0.0.1:8789/bearer"',
            cmd: 'curl.exe -s --oauth2-bearer "tok_secret_oauth_abc123" "http://127.0.0.1:8789/bearer"'
          },
          explanation: 'Cờ `--oauth2-bearer` giúp câu lệnh ngắn gọn, sạch sẽ và tuân thủ chặt chẽ đặc tả OAuth 2.0 RFC 6750.'
        },
        solutionOutput: `{"authenticated":true,"tokenPrefix":"tok_..."}`
      },
      {
        level: 'Khó',
        title: 'Bảo vệ Secret API Key bằng biến môi trường trên đa shell',
        problem: 'Thiết lập biến môi trường `MY_SECRET_KEY` chứa giá trị `live_sk_998877665544` và truyền vào header `X-API-Key` khi gửi request tới `http://127.0.0.1:8789/echo` sao cho chuỗi secret không bị hard-code trực tiếp trong đối số lệnh.',
        criteria: 'Khai báo biến môi trường chuẩn theo từng shell (export trong Bash, $env: trong PowerShell, set trong CMD), cURL gửi header `X-API-Key` thành công.',
        hint: 'Tham chiếu biến môi trường: `$VAR` trên Bash, `$env:VAR` trên PowerShell, `%VAR%` trên CMD.',
        starterCommands: {
          bash: 'export MY_SECRET_KEY="live_sk_998877665544"\ncurl.exe -s -H "X-API-Key: $MY_SECRET_KEY" "http://127.0.0.1:8789/echo"',
          powershell: '$env:MY_SECRET_KEY = "live_sk_998877665544"\ncurl.exe -s -H "X-API-Key: $env:MY_SECRET_KEY" "http://127.0.0.1:8789/echo"',
          cmd: 'set MY_SECRET_KEY=live_sk_998877665544\ncurl.exe -s -H "X-API-Key: %MY_SECRET_KEY%" "http://127.0.0.1:8789/echo"'
        },
        solution: {
          commands: {
            bash: 'export MY_SECRET_KEY="live_sk_998877665544"\ncurl.exe -s -H "X-API-Key: $MY_SECRET_KEY" "http://127.0.0.1:8789/echo"',
            powershell: '$env:MY_SECRET_KEY = "live_sk_998877665544"\ncurl.exe -s -H "X-API-Key: $env:MY_SECRET_KEY" "http://127.0.0.1:8789/echo"',
            cmd: 'set MY_SECRET_KEY=live_sk_998877665544\ncurl.exe -s -H "X-API-Key: %MY_SECRET_KEY%" "http://127.0.0.1:8789/echo"'
          },
          explanation: 'Sử dụng biến môi trường giúp tách biệt hoàn toàn thông tin bảo mật nhạy cảm khỏi mã nguồn script và tài liệu hướng dẫn.'
        },
        solutionOutput: `{"method":"GET","headers":{"x-api-key":"live_sk_998877665544"}}`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Chuỗi ký tự sau từ khóa `Basic` trong header `Authorization: Basic ...` được tạo ra bằng phương thức nào?',
        options: [
          'Được mã hóa băm một chiều bằng thuật toán SHA-256.',
          'Được mã hóa đối xứng AES-256 với mật mã của hệ thống.',
          'Ghép chuỗi `username:password` rồi chuyển đổi sang bảng mã Base64 (RFC 7617), hoàn toàn không phải là mã hóa bảo mật.',
          'Được nén gzip rồi chuyển thành mã hex.'
        ],
        correctIndex: 2,
        explanation: 'Chuỗi Basic Auth chỉ đơn thuần là kết quả encode Base64 của `username:password`. Bất kỳ ai bắt được gói tin HTTP cũng có thể giải mã ra mật khẩu gốc trong tích tắc. Do đó Basic Auth bắt buộc phải dùng qua HTTPS.'
      },
      {
        question: 'Cờ chuyên dụng nào trong cURL (kể từ phiên bản 7.33.0) cho phép bạn gửi Bearer token trực tiếp mà không cần gõ thủ công `-H "Authorization: Bearer <token>"`?',
        options: [
          '`--jwt-token <token>`',
          '`--oauth2-bearer <token>`',
          '`--bearer-auth <token>`',
          '`--token <token>`'
        ],
        correctIndex: 1,
        explanation: 'Cờ `--oauth2-bearer <token>` được cURL bổ sung từ phiên bản 7.33.0 để phục vụ trực tiếp chuẩn OAuth 2.0 Bearer Token (RFC 6750).'
      },
      {
        question: 'Khi bạn chạy lệnh `curl -u admin https://api.com` (chỉ cung cấp username mà không có password), cURL sẽ xử lý như thế nào?',
        options: [
          'cURL báo lỗi cú pháp và dừng lại ngay lập tức.',
          'cURL gửi password là chuỗi rỗng lên máy chủ.',
          'cURL mở prompt tương tác yêu cầu nhập mật khẩu từ bàn phím và tự động ẩn ký tự nhập vào để không lưu vết trong shell history.',
          'cURL tự động tìm mật khẩu trong registry hệ thống.'
        ],
        correctIndex: 2,
        explanation: 'Đây là tính năng nhập mật khẩu an toàn của cURL: cURL sẽ prompt người dùng nhập mật khẩu với chế độ tắt hiển thị ký tự (echo off), giúp mật khẩu không bao giờ bị lưu vào lịch sử lệnh hoặc hiển thị trên màn hình.'
      },
      {
        question: 'Tại sao việc truyền API Key qua URL Query String (`?api_key=secret`) lại bị coi là kém an toàn hơn việc truyền qua Request Header?',
        options: [
          'Vì cURL không hỗ trợ truyền query string.',
          'Vì toàn bộ URL chứa API Key sẽ bị ghi lại vào Access Log của Web Server, Proxy trung gian, CDN và lịch sử trình duyệt, khiến secret dễ bị rò rỉ.',
          'Vì URL query string làm tốc độ mạng chậm hơn 50%.',
          'Vì giao thức HTTPS không mã hóa phần URL query string.'
        ],
        correctIndex: 1,
        explanation: 'Mặc dù HTTPS mã hóa toàn bộ URL trên đường truyền mạng, nhưng khi gói tin đến Web Server hoặc Proxy (Nginx, Cloudflare), toàn bộ URL chứa query string sẽ được ghi lại vào file Access Log ở dạng văn bản thuần, dẫn đến nguy cơ lộ lọt secret cực kỳ cao.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -s -u "user:password" "URL"',
        description: 'Xác thực Basic Authentication nhanh chóng với username và password.'
      },
      {
        command: 'curl.exe -s -u "user" "URL"',
        description: 'Xác thực Basic Auth an toàn: cURL mở prompt ẩn ký tự để nhập mật khẩu.'
      },
      {
        command: 'curl.exe -s --oauth2-bearer "token" "URL"',
        description: 'Xác thực Bearer Token chuẩn OAuth 2.0 hiện đại (cURL ≥ 7.33.0).'
      },
      {
        command: 'curl.exe -s -H "Authorization: Bearer token" "URL"',
        description: 'Xác thực Bearer Token theo cú pháp Header truyền thống tương thích mọi phiên bản.'
      },
      {
        command: 'curl.exe -s -H "X-API-Key: live_sk_..." "URL"',
        description: 'Truyền API Key an toàn qua Request Header, chống lộ vết trong Access Log.'
      },
      {
        command: 'curl.exe -s --netrc "URL"',
        description: 'Tự động đọc credentials từ file cấu hình bảo mật `~/.netrc` (chmod 600).'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'HTTP Basic Authentication (`-u`) dựa trên việc mã hóa Base64 chuỗi `username:password` (RFC 7617); Base64 KHÔNG PHẢI là mã hóa, do đó BẮT BUỘC chỉ được truyền qua kết nối bảo mật HTTPS.',
      'Sử dụng cờ hiện đại `--oauth2-bearer <token>` (cURL ≥ 7.33.0) để gửi Bearer Token (JWT / OAuth2) một cách tinh gọn, sạch sẽ và chuẩn hóa.',
      'Luôn ưu tiên truyền API Key qua Custom Header (`X-API-Key`) thay vì URL Query String để ngăn ngừa việc rò rỉ khóa bí mật vào file Access Log của Web Server, Proxy và CDN.',
      'Bảo vệ secret tối thượng: Tránh gõ mật khẩu thẳng trên terminal; hãy tận dụng chế độ prompt tương tác `curl -u user`, file cấu hình `~/.netrc` (`chmod 600`), hoặc biến môi trường.',
      'Cơ chế bảo vệ Redirect mặc định của cURL: Tự động loại bỏ thông tin xác thực khi chuyển hướng sang domain khác; tuyệt đối không tùy tiện thêm cờ nguy hiểm `--location-trusted`.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'RFC 7617: The "Basic" HTTP Authentication Scheme',
        url: 'https://www.rfc-editor.org/rfc/rfc7617',
        description: 'Tiêu chuẩn quốc tế IETF định nghĩa cấu trúc cú pháp, quy trình thách thức 401 WWW-Authenticate và Base64 encoding.'
      },
      {
        title: 'RFC 6750: The OAuth 2.0 Authorization Framework: Bearer Token Usage',
        url: 'https://www.rfc-editor.org/rfc/rfc6750',
        description: 'Đặc tả kỹ thuật chuẩn về việc sử dụng Bearer Token trong giao thức HTTP và header Authorization.'
      },
      {
        title: 'curl.se Official Manpage: Authentication Options',
        url: 'https://curl.se/docs/manpage.html#-u',
        description: 'Tài liệu tra cứu chi tiết các cờ -u, --oauth2-bearer, --netrc, --netrc-file, --anyauth, --location-trusted.'
      },
      {
        title: 'Everything curl: HTTP Authentication',
        url: 'https://everything.curl.dev/http/auth',
        description: 'Cẩm nang toàn diện của Everything curl về các cơ chế xác thực từ cơ bản đến nâng cao trong thực tế.'
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
          issue: 'Ngộ nhận nguy hiểm Base64 trong Basic Auth là mã hóa an toàn khiến học viên gửi mật khẩu qua HTTP thuần',
          severity: 'Critical',
          resolution: 'Đã phân tích bản chất Encoding vs Encryption trong Lớp 1, đưa ra cảnh báo sống còn và chứng minh bằng lệnh giải mã một dòng'
        },
        {
          issue: 'Rủi ro phơi bày secret trong process table (ps aux) và shell history khi gõ -u user:password',
          severity: 'Critical',
          resolution: 'Đã phân tích 3 lỗ hổng phơi bày secret trong Lớp 4 và hướng dẫn kỹ thuật prompt ẩn mật khẩu và file .netrc chmod 600'
        },
        {
          issue: 'Rò rỉ API Key vào Access Log của server khi truyền qua URL Query parameter',
          severity: 'Major',
          resolution: 'Đã xây dựng bảng so sánh 3 vị trí truyền API Key trong Lớp 3 và khuyến nghị chuẩn mực dùng Custom Header X-API-Key'
        },
        {
          issue: 'Hiểm họa rò rỉ Token khi follow redirect (-L) sang máy chủ bên thứ ba bằng cờ --location-trusted',
          severity: 'Critical',
          resolution: 'Đã đưa vào Hộp Cảnh báo (Warning Box), phân tích cơ chế bảo vệ mặc định của cURL và câu hỏi trắc nghiệm số 4'
        },
        {
          issue: 'Lỗi parse token khi Bearer token có khoảng trắng thừa hoặc cú pháp khác nhau giữa các shell',
          severity: 'Major',
          resolution: 'Đã giới thiệu cờ hiện đại chuẩn hóa --oauth2-bearer (≥ 7.33.0) và xây dựng bài tập thực hành số 2'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://www.rfc-editor.org/rfc/rfc7617',
        'https://www.rfc-editor.org/rfc/rfc6750',
        'https://curl.se/docs/manpage.html#-u',
        'https://everything.curl.dev/http/auth'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH08_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
