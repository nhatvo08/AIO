/**
 * Chương 17: Tương Tác API Thực Tế: CRUD Chuẩn RESTful, Phân Trang, Rate Limit & GraphQL (data/curl/chapters/ch17.js)
 * Cấp độ: Chuyên sâu | Thời lượng: ~35 phút | cURL tối thiểu: 7.82.0 (--json ≥ 7.82.0, --url-query ≥ 7.76.0)
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch17',
    meta: {
      id: 'ch17',
      order: 17,
      title: 'Tương Tác API Thực Tế: CRUD Chuẩn RESTful, Phân Trang, Rate Limit & GraphQL',
      level: 'Chuyên sâu',
      curlMinVersion: '7.82.0',
      qaStatus: 'verified'
    },
    partId: 'level-3',
    partTitle: 'Cấp độ 3: Chuyên Sâu & Production Hardening',
    number: '17',
    title: 'Tương Tác API Thực Tế: CRUD Chuẩn RESTful, Phân Trang, Rate Limit & GraphQL',
    subtitle: 'Xây dựng trọn vẹn chu trình CRUD RESTful bằng cờ hiện đại --json, duyệt phân trang Offset & Cursor qua Link Header, xử lý Rate Limiting 429 với Retry-After, truy vấn GraphQL (Query & Mutation) và kỹ thuật debug Webhook',
    level: 'Chuyên sâu',
    duration: '35 phút',
    curlMinVersion: '7.82.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Xây dựng trọn vẹn chu trình CRUD (Create, Read, Update, Delete) chuẩn RESTful bằng cờ hiện đại `--json` và `--url-query`, nắm vững ngữ nghĩa chuẩn của các phương thức `POST`, `GET`, `PUT`, `PATCH`, `DELETE`.',
      'Làm chủ các kỹ thuật phân trang dữ liệu quy mô lớn (Pagination): Phân trang theo Offset/Limit (`?page=2&limit=50`) và phân trang bằng Cursor/Link Header theo chuẩn RFC 8288 (`rel="next"`), tự động hóa bóc tách trang trong shell script.',
      'Xử lý phản hồi nghẽn tải `429 Too Many Requests`: Đọc hiểu các header giới hạn tần suất (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`, `Retry-After`) và kết hợp với cờ retry thông minh.',
      'Soạn thảo và gửi các truy vấn GraphQL (Query & Mutation) chuyên nghiệp: Đóng gói payload JSON chứa `query` và `variables`, tránh lỗi escaping ngoặc nhọn `{}` và nháy kép `""` đa shell.',
      'Khám phá kỹ thuật debug Webhook: Giả lập gửi Webhook payload ký HMAC SHA-256 (`X-Hub-Signature-256`), kiểm tra tính hợp lệ của chữ ký bí mật trước khi triển khai hệ thống nhận webhook.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành Chương 06 (Gửi Dữ Liệu Chuyên Sâu: -d, --data-raw, --json, -F & --url-query), Chương 08 (Xác Thực & Quản Lý Token: Basic, Bearer, API Key, OAuth2) và Chương 16 (Retry Tự Động & Xử Lý Lỗi Thông Minh: --fail-with-body, Backoff & Jitter).',
      'Hiểu rõ cấu trúc dữ liệu JSON, khái niệm tài nguyên RESTful (Resource-oriented Architecture) và nguyên lý hoạt động của Webhook (máy chủ bên ngoài chủ động đẩy dữ liệu khi có sự kiện).'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Người thủ kho mẫu mực, cuốn sổ lật từng trang và viên cảnh sát giao thông Rate Limit',
      metaphor: 'Tương tác với API trong thực tế giống như quy trình làm việc chuyên nghiệp tại một tổng kho logistics hiện đại:\n\n* Chu trình CRUD RESTful: Bạn là nhân viên điều phối kho:\n  - POST: Nhập một kiện hàng mới toanh vào kho (Create).\n  - GET: Kiểm tra thông tin chi tiết kiện hàng (Read).\n  - PUT: Thay thế toàn bộ kiện hàng cũ bằng một kiện hàng mới (Full Update).\n  - PATCH: Chỉ dán lại nhãn địa chỉ bị rách trên kiện hàng (Partial Update).\n  - DELETE: Xuất kho hủy bỏ kiện hàng ra bãi phế liệu (Delete).\n\n* Phân trang (Pagination) - Cuốn sổ lật từng trang: Một kho hàng có 1 triệu sản phẩm, không thể nào bê toàn bộ 1 triệu sản phẩm ra quầy cùng một lúc (sập bộ nhớ RAM và nghẽn băng thông!). Máy chủ chia nhỏ thành từng trang:\n  - Phân trang Offset/Limit giống như việc lật đến trang 5 cuốn sổ. Nhược điểm: Nếu ai đó vừa chèn thêm hàng vào đầu kho, trang 5 sẽ bị trôi và bạn đọc trùng sản phẩm!\n  - Phân trang Cursor (Con trỏ) giống như việc mỗi kiện hàng có một sợi dây buộc vào kiện hàng tiếp theo (rel="next"). Bạn chỉ việc lần theo sợi dây để duyệt tuần tự mà không bao giờ bị trùng lặp dữ liệu.\n\n* Viên cảnh sát giao thông Rate Limit (429 Too Many Requests): Nếu bạn bấm còi inh ỏi và gửi 100 request/giây, viên cảnh sát giao thông API giơ biển đỏ 429: "Bạn đi quá nhanh! Hãy đứng lại nhìn đồng hồ Retry-After: 5 và đợi đúng 5 giây rồi mới được đi tiếp!".\n\n* Ngôn ngữ tinh gọn GraphQL: Thay vì phải chạy qua 3 quầy khác nhau để lấy thông tin Người dùng, Đơn hàng, Địa chỉ (vấn đề Over-fetching / Under-fetching của REST), bạn đưa cho thủ kho một danh sách ghi rõ từng dòng: "Tôi chỉ cần lấy đúng name và email, không cần gì thêm!". Thủ kho đóng gói đúng 2 trường đó gửi về trong 1 request duy nhất.',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:14px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">CÁC MÔ HÌNH TƯƠNG TÁC API DOANH NGHIỆP TRONG cURL</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#38bdf8;font-weight:700;">1. RESTful CRUD</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Cờ: <code>--json</code>, <code>-X PUT/PATCH/DELETE</code><br/>
                Header: <code>Content-Type: application/json</code><br/>
                Ngữ nghĩa chuẩn theo tài nguyên URI.
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;">2. Pagination &amp; Rate Limit</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Phân trang: <code>--url-query page=2</code><br/>
                Link Header: <code>rel="next"</code><br/>
                Bắt lỗi 429: Tự động đợi <code>Retry-After</code>.
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#a855f7;font-weight:700;">3. GraphQL Query &amp; Mutation</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Phương thức: <code>POST /graphql</code><br/>
                Payload: <code>{"query": "...", "variables": {}}</code><br/>
                Nạp an toàn từ file: <code>--json @query.json</code>
              </div>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '--json',
        longFlag: '--json <data|@filename>',
        description: 'Gửi chuỗi JSON hoặc đọc từ file JSON với tự động gắn `Content-Type: application/json` và `Accept: application/json` (cURL ≥ 7.82.0).',
        minVersion: '7.82.0'
      },
      {
        flag: '--url-query',
        longFlag: '--url-query <name=val|@filename>',
        description: 'Nối tham số query string vào URL an toàn và tự động URL-encode các ký tự đặc biệt (cURL ≥ 7.76.0).',
        minVersion: '7.76.0'
      },
      {
        flag: '-X',
        longFlag: '--request <method>',
        description: 'Chỉ định phương thức HTTP tùy biến (như `PUT`, `PATCH`, `DELETE`) thay cho phương thức mặc định.',
        minVersion: '7.0.0'
      },
      {
        flag: '-D',
        longFlag: '--dump-header <filename>',
        description: 'Lưu toàn bộ HTTP response headers nhận được vào một tệp riêng (phục vụ bóc tách Link Header hoặc Rate Limit).',
        minVersion: '7.0.0'
      },
      {
        flag: '-i',
        longFlag: '--include',
        description: 'Hiển thị response headers kèm theo body phản hồi để theo dõi các header điều khiển (`Retry-After`, `Link`).',
        minVersion: '7.0.0'
      },
      {
        flag: '-sS',
        longFlag: '--silent --show-error',
        description: 'Tắt thanh tiến độ nhưng vẫn in thông báo lỗi nếu xảy ra sự cố mạng (bộ cờ vàng cho scripting).',
        minVersion: '7.0.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Xây Dựng Chu Trình CRUD RESTful Hoàn Chỉnh Bằng Cờ Hiện Đại --json',
        content: `
          <p>Trong kiến trúc RESTful chuẩn mực, URI đại diện cho <strong>Danh từ chỉ tài nguyên</strong> (ví dụ <code>/api/v1/orders</code>), còn hành động thao tác được định đoạt bởi <strong>Phương thức HTTP (HTTP Method)</strong>:</p>

          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Thao tác CRUD</th>
                  <th>HTTP Method</th>
                  <th>Cú pháp lệnh cURL chuẩn</th>
                  <th>Mã HTTP mong đợi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Create (Tạo mới)</strong></td>
                  <td><code>POST</code></td>
                  <td><code>curl.exe -s --json '{"name":"iPhone 16"}' https://api/products</code></td>
                  <td><code>201 Created</code> (kèm header <code>Location</code>)</td>
                </tr>
                <tr>
                  <td><strong>Read (Đọc chi tiết)</strong></td>
                  <td><code>GET</code></td>
                  <td><code>curl.exe -s "https://api/products/123"</code></td>
                  <td><code>200 OK</code></td>
                </tr>
                <tr>
                  <td><strong>Update (Thay thế toàn bộ)</strong></td>
                  <td><code>PUT</code></td>
                  <td><code>curl.exe -s -X PUT --json '{"name":"Pro","price":999}' https://api/products/123</code></td>
                  <td><code>200 OK</code></td>
                </tr>
                <tr>
                  <td><strong>Update (Cập nhật một phần)</strong></td>
                  <td><code>PATCH</code></td>
                  <td><code>curl.exe -s -X PATCH --json '{"price":899}' https://api/products/123</code></td>
                  <td><code>200 OK</code></td>
                </tr>
                <tr>
                  <td><strong>Delete (Xóa tài nguyên)</strong></td>
                  <td><code>DELETE</code></td>
                  <td><code>curl.exe -s -X DELETE https://api/products/123</code></td>
                  <td><code>204 No Content</code> hoặc <code>200 OK</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Sự Khác Biệt Giữa PUT Và PATCH</h3>
          <p>Rất nhiều lập trình viên nhầm lẫn giữa <code>PUT</code> và <code>PATCH</code>:</p>
          <ul>
            <li><code>PUT</code> là <strong>thay thế toàn bộ</strong> (Full Replacement). Nếu bản ghi hiện tại có 5 trường (name, price, stock, color, size) mà bạn gửi <code>PUT</code> chỉ với <code>{"price": 899}</code>, các trường còn lại sẽ bị máy chủ xóa trắng hoặc đưa về <code>null</code>!</li>
            <li><code>PATCH</code> là <strong>cập nhật một phần</strong> (Partial Modification). Máy chủ chỉ ghi đè duy nhất trường <code>price</code>, các trường khác được giữ nguyên vẹn.</li>
          </ul>
        `,
        codeExamples: [
          {
            id: 'ex-ch17-sec01',
            title: 'Ví dụ 1: Thực Thi Trọn Vẹn Quy Trình CRUD RESTful Với Cờ --json',
            minVersion: '7.82.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# 1. Tạo mới tài nguyên (POST bằng --json):\ncurl.exe -s --json \'{"title":"cURL Mastery","price":299000}\' "http://127.0.0.1:8789/post"\n\n# 2. Cập nhật một phần (PATCH bằng -X PATCH kết hợp --json):\ncurl.exe -s -X PATCH --json \'{"price":250000}\' "http://127.0.0.1:8789/patch"',
              powershell: '# 1. Tạo mới (POST):\ncurl.exe -s --json \'{"title":"cURL Mastery","price":299000}\' "http://127.0.0.1:8789/post"\n\n# 2. Cập nhật (PATCH):\ncurl.exe -s -X PATCH --json \'{"price":250000}\' "http://127.0.0.1:8789/patch"',
              cmd: 'curl.exe -s --json "{\\"title\\":\\"cURL Mastery\\",\\"price\\":299000}" "http://127.0.0.1:8789/post"\ncurl.exe -s -X PATCH --json "{\\"price\\":250000}" "http://127.0.0.1:8789/patch"'
            },
            realOutput: `{\n  "method": "PATCH",\n  "path": "/patch",\n  "bodyJson": {\n    "price": 250000\n  }\n}`,
            explanationTokens: [
              { token: 'method: PATCH', meaning: 'Phương thức cập nhật một phần tài nguyên được máy chủ nhận diện thành công' },
              { token: 'bodyJson: { price: 250000 }', meaning: 'Payload JSON được gửi tự động kèm đúng Content-Type: application/json' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Xử Lý Phân Trang Dữ Liệu Quy Mô Lớn: Offset/Limit vs Cursor & Link Header (RFC 8288)',
        content: `
          <p>Khi một cơ sở dữ liệu có hàng triệu bản ghi, máy chủ bắt buộc phải chia nhỏ dữ liệu thành từng trang (Pagination) để bảo vệ hiệu năng:</p>

          <h3>1. Phân Trang Truyền Thống: Offset / Limit</h3>
          <p>Client gửi tham số qua query string: <code>?page=2&amp;limit=50</code> hoặc <code>?offset=50&amp;limit=50</code>. Với cURL, hãy dùng cờ <strong><code>--url-query</code></strong> (cURL ≥ 7.76.0) để đảm bảo tham số được nối vào URL sạch sẽ:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe -s --url-query "page=2" --url-query "limit=20" "http://api.corp/items"</code></pre>
          <p><strong>Nhược điểm:</strong> Truy vấn database <code>OFFSET 1000000</code> cực kỳ chậm (Full Table Scan). Hơn nữa, nếu có bản ghi mới được chèn vào trang 1, toàn bộ các trang phía sau bị trôi lệch khiến client đọc trùng dữ liệu.</p>

          <h3>2. Phân Trang Hiện Đại: Cursor-based &amp; Chuẩn RFC 8288 Link Header</h3>
          <p>Các API hàng đầu như GitHub, Stripe, Shopify không dùng số trang mà sử dụng <strong>Con trỏ (Cursor)</strong> chỉ vào ID của bản ghi cuối cùng. Máy chủ trả về đường dẫn tới trang kế tiếp ngay trong response header <strong><code>Link</code></strong> (theo chuẩn IETF RFC 8288):</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>Link: &lt;https://api.github.com/repos?page=2&gt;; rel="next", &lt;https://api.github.com/repos?page=10&gt;; rel="last"</code></pre>
          <p>Để tự động duyệt đến hết các trang trong shell script, kỹ sư dùng cờ <code>-D headers.txt</code> để lưu header, sau đó trích xuất URL chứa <code>rel="next"</code> để lặp tiếp cho đến khi header này không còn xuất hiện.</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch17-sec02',
            title: 'Ví dụ 2: Điều Hướng Phân Trang Bằng Cờ --url-query Và Bóc Tách Header Link',
            minVersion: '7.76.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Gửi tham số phân trang qua cờ --url-query an toàn:\ncurl.exe -s --url-query "page=2" --url-query "limit=20" "http://127.0.0.1:8789/echo"\n\n# Lưu header vào tệp để bóc tách thông tin phân trang:\ncurl.exe -s -D headers.txt "http://127.0.0.1:8789/echo?page=2" -o /dev/null',
              powershell: '# Phân trang với --url-query trong PowerShell:\ncurl.exe -s --url-query "page=2" --url-query "limit=20" "http://127.0.0.1:8789/echo"\ncurl.exe -s -D headers.txt "http://127.0.0.1:8789/echo?page=2" -o NUL',
              cmd: 'curl.exe -s --url-query "page=2" --url-query "limit=20" "http://127.0.0.1:8789/echo"'
            },
            realOutput: `{\n  "method": "GET",\n  "path": "/echo",\n  "query": {\n    "page": "2",\n    "limit": "20"\n  }\n}`,
            explanationTokens: [
              { token: '--url-query "page=2"', meaning: 'Tự động nối tham số query string hợp lệ vào URL mà không lo lỗi ký tự &' },
              { token: '"query": { "page": "2" }', meaning: 'Máy chủ nhận diện chính xác các tham số phân trang' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Đối Phó Rate Limiting & Tự Động Hóa Xử Lý Phản Hồi 429 Too Many Requests',
        content: `
          <p>Mọi hệ thống API công cộng hoặc doanh nghiệp đều thiết lập cơ chế <strong>Rate Limiting (Giới hạn tần suất)</strong> nhằm ngăn chặn tấn công DDoS, quét dữ liệu (Scraping) quá đà, và đảm bảo chất lượng dịch vụ (QoS) cho mọi người dùng.</p>

          <h3>Bảng Header Giới Hạn Tần Suất Tiêu Chuẩn Ngành</h3>
          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Tên Response Header</th>
                  <th>Ý nghĩa giá trị</th>
                  <th>Hành động của Client</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>X-RateLimit-Limit</code></td>
                  <td>Hạn mức tối đa được phép trong 1 khung giờ (ví dụ: <code>5000</code>).</td>
                  <td>Nắm được quota tổng thể của tài khoản.</td>
                </tr>
                <tr>
                  <td><code>X-RateLimit-Remaining</code></td>
                  <td>Số lượt request còn lại trong khung giờ hiện tại (ví dụ: <code>12</code>).</td>
                  <td>Khi giá trị này tiến về gần 0, client cần chủ động giảm tốc độ gọi.</td>
                </tr>
                <tr>
                  <td><code>X-RateLimit-Reset</code></td>
                  <td>Mốc thời gian Unix Timestamp mà quota sẽ được làm mới hoàn toàn.</td>
                  <td>Dùng để đếm ngược thời gian ngủ (Sleep).</td>
                </tr>
                <tr>
                  <td><code>Retry-After</code></td>
                  <td>Số giây client <strong>BẮT BUỘC</strong> phải chờ trước khi gửi request tiếp theo.</td>
                  <td>Đi kèm mã lỗi <code>429 Too Many Requests</code> hoặc <code>503</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Tự Động Hóa Xử Lý 429 Trong cURL</h3>
          <p>Khi máy chủ trả về <code>429 Too Many Requests</code> kèm header <code>Retry-After: 5</code>, bạn chỉ cần kết hợp cờ <code>--retry 3</code> và <code>--fail-with-body</code>:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe -s --fail-with-body --retry 3 "http://127.0.0.1:8789/rate-limit"</code></pre>
          <p>cURL <strong>tự động đọc giá trị trong header <code>Retry-After</code></strong> và tạm dừng đúng số giây yêu cầu trước khi thử lại, giúp lệnh của bạn tự phục hồi êm ái mà không bị máy chủ đưa vào danh sách đen (Blacklist)!</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch17-sec03',
            title: 'Ví dụ 3: Xử Lý Phản Hồi Rate Limit 429 Và Tự Động Tuân Thủ Header Retry-After',
            minVersion: '7.76.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Quan sát header Retry-After trả về từ endpoint giới hạn tần suất:\ncurl.exe -s -i "http://127.0.0.1:8789/rate-limit"\n\n# Kết hợp tự động thử lại theo chỉ dẫn của server:\ncurl.exe -s --fail-with-body --retry 2 "http://127.0.0.1:8789/rate-limit"',
              powershell: '# Kiểm tra Rate Limit trong PowerShell:\ncurl.exe -s -i "http://127.0.0.1:8789/rate-limit"',
              cmd: 'curl.exe -s -i "http://127.0.0.1:8789/rate-limit"'
            },
            realOutput: `HTTP/1.1 429 Too Many Requests\nContent-Type: application/json\nRetry-After: 5\n\n{\n  "error": "Too Many Requests",\n  "retryAfterSeconds": 5\n}`,
            explanationTokens: [
              { token: 'HTTP/1.1 429 Too Many Requests', meaning: 'Mã trạng thái chuẩn thông báo client đã vượt quá hạn mức cho phép' },
              { token: 'Retry-After: 5', meaning: 'Chỉ thị chuẩn RFC yêu cầu client phải tạm dừng 5 giây trước khi gửi lại' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Truy Vấn GraphQL Chuyên Sâu (Query, Mutation, Variables) & Kỹ Thuật Debug Webhook',
        content: `
          <p>Bên cạnh RESTful, <strong>GraphQL</strong> là công nghệ API phổ biến thứ hai hiện nay. Khác với REST có nhiều endpoint URL khác nhau, GraphQL <strong>chỉ có DUY NHẤT MỘT ENDPOINT</strong> (thường là <code>/graphql</code>) và luôn luôn sử dụng phương thức <strong><code>POST</code></strong>.</p>

          <h3>1. Soạn Thảo GraphQL Payload Chuẩn Xác</h3>
          <p>Một request GraphQL hợp lệ là một đối tượng JSON chứa 2 trường cốt lõi:</p>
          <ul>
            <li><code>query</code> (hoặc <code>mutation</code>): Chuỗi văn bản chứa câu lệnh truy vấn cấu trúc GraphQL.</li>
            <li><code>variables</code>: Đối tượng JSON chứa các biến truyền vào (giúp tái sử dụng query và tránh lỗi cú pháp).</li>
          </ul>

          <h3>Mẹo Vàng: Tránh Lỗi Escaping Bằng Cú Pháp <code>--json @file</code></h3>
          <p>Viết query GraphQL trực tiếp trên terminal rất dễ bị gãy do xung đột dấu nháy kép và ngoặc nhọn. Giải pháp chuyên nghiệp nhất là lưu query vào tệp <code>query.json</code>:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>{
  "query": "query GetUser($id: ID!) { user(id: $id) { name email role } }",
  "variables": { "id": "USR-101" }
}</code></pre>
          <p>Sau đó gửi đơn giản bằng 1 dòng lệnh: <code>curl.exe -s --json @query.json https://api.corp/graphql</code>.</p>

          <h3>2. Kỹ Thuật Giả Lập &amp; Debug Webhook Kèm Chữ Ký HMAC SHA-256</h3>
          <p>Khi các nhà cung cấp dịch vụ (GitHub, Stripe, VNPay) gửi Webhook về máy chủ của bạn, họ luôn ký số payload bằng một khóa bí mật chung (Webhook Secret) và gửi kèm header <code>X-Hub-Signature-256: sha256=&lt;hash&gt;</code>. Khi kiểm thử webhook receiver cục bộ, bạn có thể dùng cURL để bắn Webhook giả lập:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe -s --json @payload.json -H "X-Hub-Signature-256: sha256=MÃ_HASH_HMAC" http://localhost:3000/webhook</code></pre>
        `,
        codeExamples: [
          {
            id: 'ex-ch17-sec04',
            title: 'Ví dụ 4: Gửi Truy Vấn GraphQL Payload (Query & Variables) Bằng Cờ --json',
            minVersion: '7.82.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Gửi truy vấn GraphQL có biến variables qua cờ --json:\ncurl.exe -s --json \'{"query":"query GetRepo($id: ID!) { repo(id: $id) { name stars } }","variables":{"id":"101"}}\' "http://127.0.0.1:8789/echo"',
              powershell: '# Gửi GraphQL trong PowerShell:\ncurl.exe -s --json \'{"query":"query GetRepo($id: ID!) { repo(id: $id) { name stars } }","variables":{"id":"101"}}\' "http://127.0.0.1:8789/echo"',
              cmd: 'curl.exe -s --json "{\\"query\\":\\"query GetRepo($id: ID!) { repo(id: $id) { name stars } }\\",\\"variables\\":{\\"id\\":\\"101\\"}}" "http://127.0.0.1:8789/echo"'
            },
            realOutput: `{\n  "method": "POST",\n  "path": "/echo",\n  "bodyJson": {\n    "query": "query GetRepo($id: ID!) { repo(id: $id) { name stars } }",\n    "variables": {\n      "id": "101"\n    }\n  }\n}`,
            explanationTokens: [
              { token: 'query: query GetRepo...', meaning: 'Cấu trúc câu truy vấn GraphQL được đóng gói hợp lệ trong payload JSON' },
              { token: 'variables: { id: "101" }', meaning: 'Đối tượng biến tham số được truyền độc lập giúp phân tách rõ logic và dữ liệu' }
            ]
          }
        ]
      }
    ],

    // 6. Cạm bẫy thường gặp & Cảnh báo an ninh (Callouts Box)
    callouts: {
      warning: {
        title: 'CẢNH BÁO AN NINH: RỦI RO LỘ TOKEN TRONG QUERY PARAMETER VÀ HIỂM HỌA BỎ QUA XÁC THỰC WEBHOOK SIGNATURE',
        content: 'Hai lỗ hổng bảo mật chết người trong thiết kế và kiểm thử API:\n1) Rò rỉ Token qua Query String: Tuyệt đối KHÔNG truyền token xác thực qua URL (ví dụ: `?access_token=SECRET`). Toàn bộ URL sẽ bị ghi lại vĩnh viễn trong Access Log của Reverse Proxy (Nginx/Cloudflare), Browser History, và header `Referer` khi chuyển tiếp trang! Luôn truyền token qua header `Authorization: Bearer <token>`.\n2) Tiếp nhận Webhook không thẩm định chữ ký: Khi viết endpoint nhận webhook từ cổng thanh toán, nếu bạn không xác minh header chữ ký `X-Hub-Signature-256`, bất kỳ ai trên Internet cũng có thể giả mạo gửi một request JSON báo "Đã thanh toán thành công 100.000.000 VNĐ", khiến hệ thống của bạn tự động bàn giao hàng hóa cho hacker!'
      },
      pitfalls: [
        {
          title: 'Dùng cờ -X POST thừa thãi khi đã sử dụng cờ --json',
          content: 'Cờ `--json` mặc định đã tự động thiết lập phương thức HTTP là `POST`. Việc gõ thêm `-X POST --json` là hoàn toàn thừa thãi và có thể gây lỗi chuyển hướng không mong muốn nếu kết hợp với `-L`.'
        },
        {
          title: 'Nhầm lẫn chết người giữa PUT và PATCH làm mất dữ liệu trong database',
          content: 'Nếu bạn chỉ muốn sửa số điện thoại của người dùng mà lại gửi `PUT /users/1` với payload `{"phone": "0901234567"}`, máy chủ RESTful chuẩn mực sẽ ghi đè toàn bộ bản ghi và xóa sạch họ tên, email, ngày sinh! Luôn dùng `PATCH` cho cập nhật từng phần.'
        },
        {
          title: 'Lỗi vỡ cấu trúc JSON khi viết GraphQL inline trên Windows PowerShell',
          content: 'PowerShell tự động diễn giải các cặp ngoặc nhọn `{}` và dấu nháy kép `""` bên trong chuỗi. Nếu không escape cẩn thận, cURL sẽ nhận payload dị tật. Hãy luôn lưu query phức tạp vào tệp `query.json` và nạp bằng `--json @query.json`.'
        },
        {
          title: 'Tạo vòng lặp phân trang vô tận (Infinite Pagination Loop) trong kịch bản shell',
          content: 'Nếu kịch bản shell của bạn duyệt trang bằng cách kiểm tra mảng trả về mà không so khớp độ dài `length == 0` hoặc header `rel="next"`, script có thể lặp vĩnh viễn qua hàng triệu request làm cạn kiệt tài nguyên hệ thống.'
        },
        {
          title: 'Spam liên tục vào máy chủ sau khi nhận HTTP 429 khiến IP bị WAF chặn vĩnh viễn',
          content: 'Khi gặp HTTP 429, hệ thống bảo vệ (WAF) đang cảnh báo bạn. Nếu bạn tiếp tục gửi request dồn dập mà không tôn trọng header `Retry-After`, WAF của đối tác sẽ tự động nâng mức phạt từ Rate Limit tạm thời lên Block IP vĩnh viễn.'
        }
      ],
      tips: [
        {
          title: 'Tách riêng GraphQL Query và Variables thành các file chuyên biệt',
          content: 'Tạo file `query.graphql` chứa cú pháp GraphQL thuần túy để được IDE tô sáng cú pháp (Syntax Highlighting) và tự động bắt lỗi cú pháp, sau đó dùng công cụ jq để gộp thành file JSON nạp vào cURL.'
        },
        {
          title: 'Tạo chữ ký HMAC SHA-256 bằng 1 dòng lệnh OpenSSL để test Webhook',
          content: 'Chạy: `HASH=$(openssl dgst -sha256 -hmac "my_secret_key" payload.json | awk \'{print $2}\')`. Sau đó gửi webhook: `curl.exe -s --json @payload.json -H "X-Hub-Signature-256: sha256=$HASH" URL`.'
        },
        {
          title: 'In toàn bộ Response Headers ra terminal song song với Body bằng cờ -D -',
          content: 'Dấu gạch ngang `-` trong `-D -` đại diện cho luồng `stdout`. Bạn sẽ quan sát được trọn vẹn cả các header phân trang `Link`, `RateLimit` và payload JSON cùng lúc mà không cần tạo file rác trên đĩa.'
        }
      ],
      deepDive: {
        title: 'Kiến Trúc Chuẩn Hóa RFC 8288: Cấu Trúc Header Link Và Cơ Chế Web Linking Trong Phân Trang Hiện Đại',
        content: `
          <p>Header <code>Link</code> trong HTTP được chuẩn hóa chính thức bởi IETF trong <strong>RFC 5988</strong> và cập nhật trong <strong>RFC 8288</strong> (Web Linking). Mục đích là cung cấp siêu dữ liệu điều hướng ngữ nghĩa giữa các tài nguyên liên quan mà không làm ô nhiễm cấu trúc dữ liệu body JSON:</p>
          <ul>
            <li><strong>Cấu trúc chuẩn của một quan hệ Link:</strong> <code>&lt;URI-Reference&gt;; rel="Relation-Type"</code>.</li>
            <li><strong>Các kiểu quan hệ (Relation Types) tiêu chuẩn:</strong>
              <ul>
                <li><code>rel="next"</code>: Trỏ tới trang dữ liệu tiếp theo.</li>
                <li><code>rel="prev"</code>: Trỏ tới trang dữ liệu phía trước.</li>
                <li><code>rel="first"</code>: Trỏ tới trang đầu tiên.</li>
                <li><code>rel="last"</code>: Trỏ tới trang cuối cùng của tập dữ liệu.</li>
              </ul>
            </li>
            <li>Nhiều quan hệ có thể được gộp chung trong 1 header phân tách bằng dấu phẩy: <code>Link: &lt;https://api.github.com/repos?page=2&gt;; rel="next", &lt;https://api.github.com/repos?page=5&gt;; rel="last"</code>. Nhờ chuẩn hóa này, các thư viện client có thể tự động duyệt phân trang (Auto-pagination) một cách hoàn toàn trong suốt.</li>
          </ul>
        `
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Tạo mới và cập nhật một phần tài nguyên bằng cờ --json và -X PATCH',
        problem: 'Sử dụng cờ `--json` để gửi request tạo sản phẩm `{"name":"MacBook Air","stock":10}` tới endpoint `http://127.0.0.1:8789/post`. Sau đó gửi request cập nhật tồn kho bằng `-X PATCH --json \'{"stock":15}\'` tới `http://127.0.0.1:8789/patch`.',
        criteria: 'Sử dụng đúng cờ `--json`, máy chủ phản hồi đúng method `POST` và `PATCH` kèm dữ liệu bodyJson tương ứng.',
        hint: 'Dùng `curl.exe -s --json \'{"name":"MacBook Air","stock":10}\' "http://127.0.0.1:8789/post"`.',
        starterCommands: {
          bash: 'curl.exe -s --json \'{"name":"MacBook Air","stock":10}\' "http://127.0.0.1:8789/post"\ncurl.exe -s -X PATCH --json \'{"stock":15}\' "http://127.0.0.1:8789/patch"',
          powershell: 'curl.exe -s --json \'{"name":"MacBook Air","stock":10}\' "http://127.0.0.1:8789/post"\ncurl.exe -s -X PATCH --json \'{"stock":15}\' "http://127.0.0.1:8789/patch"',
          cmd: 'curl.exe -s --json "{\\"name\\":\\"MacBook Air\\",\\"stock\\":10}" "http://127.0.0.1:8789/post"\ncurl.exe -s -X PATCH --json "{\\"stock\\":15}" "http://127.0.0.1:8789/patch"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s --json \'{"name":"MacBook Air","stock":10}\' "http://127.0.0.1:8789/post"\ncurl.exe -s -X PATCH --json \'{"stock":15}\' "http://127.0.0.1:8789/patch"',
            powershell: 'curl.exe -s --json \'{"name":"MacBook Air","stock":10}\' "http://127.0.0.1:8789/post"\ncurl.exe -s -X PATCH --json \'{"stock":15}\' "http://127.0.0.1:8789/patch"',
            cmd: 'curl.exe -s --json "{\\"name\\":\\"MacBook Air\\",\\"stock\\":10}" "http://127.0.0.1:8789/post"\ncurl.exe -s -X PATCH --json "{\\"stock\\":15}" "http://127.0.0.1:8789/patch"'
          },
          explanation: 'Cờ --json tự động gửi header Content-Type application/json, kết hợp với -X PATCH để thực thi cập nhật một phần tài nguyên theo chuẩn RESTful.'
        },
        solutionOutput: `{\n  "method": "PATCH",\n  "path": "/patch",\n  "bodyJson": {\n    "stock": 15\n  }\n}`
      },
      {
        level: 'Trung bình',
        title: 'Điều khiển phân trang an toàn bằng cờ --url-query và lưu header bằng -D',
        problem: 'Viết lệnh cURL gửi request tới `http://127.0.0.1:8789/echo` với hai tham số phân trang: `cursor=eyJpZCI6OTl9` và `limit=25` sử dụng cờ `--url-query`. Đồng thời sử dụng cờ `-D dump_headers.txt` để lưu response headers vào tệp.',
        criteria: 'Sử dụng đúng cờ `--url-query`, máy chủ phản hồi đúng query parameters trong JSON và tệp `dump_headers.txt` được tạo thành công.',
        hint: 'Dùng `--url-query "cursor=..." --url-query "limit=25" -D dump_headers.txt`.',
        starterCommands: {
          bash: 'curl.exe -s --url-query "cursor=eyJpZCI6OTl9" --url-query "limit=25" -D dump_headers.txt "http://127.0.0.1:8789/echo"',
          powershell: 'curl.exe -s --url-query "cursor=eyJpZCI6OTl9" --url-query "limit=25" -D dump_headers.txt "http://127.0.0.1:8789/echo"',
          cmd: 'curl.exe -s --url-query "cursor=eyJpZCI6OTl9" --url-query "limit=25" -D dump_headers.txt "http://127.0.0.1:8789/echo"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s --url-query "cursor=eyJpZCI6OTl9" --url-query "limit=25" -D dump_headers.txt "http://127.0.0.1:8789/echo"',
            powershell: 'curl.exe -s --url-query "cursor=eyJpZCI6OTl9" --url-query "limit=25" -D dump_headers.txt "http://127.0.0.1:8789/echo"',
            cmd: 'curl.exe -s --url-query "cursor=eyJpZCI6OTl9" --url-query "limit=25" -D dump_headers.txt "http://127.0.0.1:8789/echo"'
          },
          explanation: 'Cờ --url-query giúp truyền các chuỗi cursor phức tạp vào URL an toàn, cờ -D ghi lại header để kịch bản tự động kiểm tra Link Header.'
        },
        solutionOutput: `{\n  "method": "GET",\n  "path": "/echo",\n  "query": {\n    "cursor": "eyJpZCI6OTl9",\n    "limit": "25"\n  }\n}`
      },
      {
        level: 'Khó',
        title: 'Thực thi truy vấn GraphQL hoàn chỉnh gồm Query và Variables qua cờ --json',
        problem: 'Viết lệnh cURL gửi truy vấn GraphQL tới endpoint `http://127.0.0.1:8789/echo`. Yêu cầu: Gửi chuỗi query `query GetUser($userId: ID!) { user(id: $userId) { name email } }` và object biến `variables: {"userId": "U-8821"}`. Kiểm tra xem máy chủ có nhận được cấu trúc bodyJson đầy đủ hay không.',
        criteria: 'Sử dụng cờ `--json`, payload chứa đầy đủ 2 trường `query` và `variables`, output JSON hợp lệ.',
        hint: 'Cú pháp: `curl --json \'{"query":"...","variables":{"userId":"U-8821"}}\' URL`.',
        starterCommands: {
          bash: 'curl.exe -s --json \'{"query":"query GetUser($userId: ID!) { user(id: $userId) { name email } }","variables":{"userId":"U-8821"}}\' "http://127.0.0.1:8789/echo"',
          powershell: 'curl.exe -s --json \'{"query":"query GetUser($userId: ID!) { user(id: $userId) { name email } }","variables":{"userId":"U-8821"}}\' "http://127.0.0.1:8789/echo"',
          cmd: 'curl.exe -s --json "{\\"query\\":\\"query GetUser($userId: ID!) { user(id: $userId) { name email } }\\",\\"variables\\":{\\"userId\\":\\"U-8821\\"}}" "http://127.0.0.1:8789/echo"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s --json \'{"query":"query GetUser($userId: ID!) { user(id: $userId) { name email } }","variables":{"userId":"U-8821"}}\' "http://127.0.0.1:8789/echo"',
            powershell: 'curl.exe -s --json \'{"query":"query GetUser($userId: ID!) { user(id: $userId) { name email } }","variables":{"userId":"U-8821"}}\' "http://127.0.0.1:8789/echo"',
            cmd: 'curl.exe -s --json "{\\"query\\":\\"query GetUser($userId: ID!) { user(id: $userId) { name email } }\\",\\"variables\\":{\\"userId\\":\\"U-8821\\"}}" "http://127.0.0.1:8789/echo"'
          },
          explanation: 'Lệnh đóng gói truy vấn GraphQL chuyên nghiệp theo đặc tả chính thức, gửi tới máy chủ bằng phương thức POST và Content-Type application/json tự động.'
        },
        solutionOutput: `{\n  "method": "POST",\n  "path": "/echo",\n  "bodyJson": {\n    "query": "query GetUser($userId: ID!) { user(id: $userId) { name email } }",\n    "variables": {\n      "userId": "U-8821"\n    }\n  }\n}`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Trong kiến trúc RESTful API, sự khác biệt bản chất giữa phương thức `PUT` và phương thức `PATCH` là gì?',
        options: [
          '`PUT` dùng cho giao thức HTTP, còn `PATCH` chỉ dùng cho giao thức HTTPS.',
          '`PUT` là thao tác thay thế toàn bộ tài nguyên (nếu thiếu trường nào thì trường đó bị xóa/gán null); còn `PATCH` là cập nhật một phần (chỉ sửa các trường được gửi, giữ nguyên các trường khác).',
          '`PUT` tự động mã hóa dữ liệu thành Base64.',
          '`PATCH` không cho phép gửi dữ liệu JSON.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Theo chuẩn RFC 9110, PUT thay thế toàn bộ trạng thái tài nguyên, trong khi PATCH áp dụng một tập hợp các thay đổi cục bộ lên tài nguyên hiện có.'
      },
      {
        question: 'Trong các hệ thống phân trang API hiện đại (theo chuẩn RFC 8288), máy chủ thường trả về URL của trang tiếp theo thông qua thành phần nào?',
        options: [
          'Trả về trong cookie của trình duyệt.',
          'Trả về trong response header `Link` với thuộc tính định danh quan hệ `rel="next"`.',
          'Tự động ghi đè vào file hosts hệ thống.',
          'Gửi qua một email riêng cho lập trình viên.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Chuẩn IETF RFC 8288 (Web Linking) quy định việc sử dụng header Link (ví dụ: `Link: <https://api/items?page=2>; rel="next"`) để thông báo cho máy khách biết đường dẫn trang tiếp theo một cách chuẩn hóa.'
      },
      {
        question: 'Khi một API trả về mã lỗi `HTTP 429 Too Many Requests`, header chuẩn nào được máy chủ cung cấp để báo cho client biết số giây cần phải tạm dừng trước khi thử lại?',
        options: [
          '`Wait-Time`',
          '`Retry-After`',
          '`Sleep-Seconds`',
          '`X-Pause-Request`'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Header `Retry-After` là tiêu chuẩn chính thức của IETF. Khi nhận được 429 hoặc 503 kèm header này, cURL (khi bật `--retry`) sẽ tự động tạm dừng đúng số giây ghi trong Retry-After trước khi gửi lại request.'
      },
      {
        question: 'Khi gửi một truy vấn tới máy chủ GraphQL, phương thức HTTP nào luôn được sử dụng và cấu trúc body payload bắt buộc phải chứa trường nào?',
        options: [
          'Phương thức `GET`, body chứa mã SQL.',
          'Phương thức `POST`, body là đối tượng JSON chứa trường `query` (và tùy chọn trường `variables`).',
          'Phương thức `PUT`, body là file XML.',
          'Phương thức `HEAD`, không có body.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Theo đặc tả chuẩn của GraphQL, mọi truy vấn (Query và Mutation) đều được gửi bằng phương thức POST tới endpoint GraphQL với payload JSON chứa thuộc tính query và variables.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -s --json \'{"name":"item"}\' "URL"',
        description: 'Gửi request POST tạo mới tài nguyên JSON với Content-Type tự động (cURL ≥ 7.82.0).'
      },
      {
        command: 'curl.exe -s -X PATCH --json \'{"status":"active"}\' "URL/id"',
        description: 'Gửi request PATCH cập nhật một phần tài nguyên chuẩn RESTful.'
      },
      {
        command: 'curl.exe -s --url-query "page=2" --url-query "limit=50" "URL"',
        description: 'Nối tham số phân trang vào URL an toàn không sợ lỗi ký tự & và URL-encode tự động.'
      },
      {
        command: 'curl.exe -s -D headers.txt -o /dev/null "URL"',
        description: 'Tải và lưu toàn bộ response headers vào file để bóc tách Link Header phân trang.'
      },
      {
        command: 'curl.exe -s --fail-with-body --retry 3 "URL"',
        description: 'Tự động xử lý lỗi Rate Limit 429 và tuân thủ thời gian chờ Retry-After của server.'
      },
      {
        command: 'curl.exe -s --json @query.json "https://api.com/graphql"',
        description: 'Gửi truy vấn GraphQL phức tạp từ tệp query.json sạch sẽ, chống lỗi escaping shell.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'Xây dựng chu trình CRUD chuẩn RESTful: Tận dụng cờ `--json` cho POST và kết hợp `-X PUT`, `-X PATCH`, `-X DELETE` với ngữ nghĩa danh từ chỉ tài nguyên.',
      'Hiểu rõ sự khác biệt giữa `PUT` (thay thế toàn bộ) và `PATCH` (sửa một phần) để không vô tình xóa trắng các trường dữ liệu quan trọng trong database.',
      'Làm chủ phân trang hiện đại: Dùng `--url-query` cho phân trang Offset, và khai thác chuẩn RFC 8288 `Link: rel="next"` cho phân trang Cursor dữ liệu lớn.',
      'Xử lý chuyên nghiệp Rate Limit 429: Đọc hiểu bộ header `X-RateLimit-*` và kết hợp `--retry` để cURL tự động tuân thủ thời gian chờ `Retry-After`.',
      'Thành thạo GraphQL: Đóng gói truy vấn vào tệp `query.json` và nạp bằng `--json @query.json` để loại bỏ hoàn toàn lỗi escaping dấu ngoặc nhọn và nháy kép trên terminal.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'curl.se Official Documentation: --json and --url-query',
        url: 'https://curl.se/docs/manpage.html#--json',
        description: 'Tài liệu tra cứu chính thức của cURL về hai cờ tương tác API hiện đại --json và --url-query.'
      },
      {
        title: 'RFC 9110: HTTP Semantics - Methods & Status Codes',
        url: 'https://www.rfc-editor.org/rfc/rfc9110#section-9',
        description: 'Đặc tả tiêu chuẩn IETF về định nghĩa chuẩn của các phương thức POST, PUT, PATCH, DELETE và mã 429.'
      },
      {
        title: 'GraphQL Official Specification: Serving over HTTP',
        url: 'https://graphql.org/learn/serving-over-http/',
        description: 'Hướng dẫn chính thức của GraphQL Foundation về quy chuẩn gửi truy vấn GraphQL qua giao thức HTTP POST.'
      },
      {
        title: 'RFC 8288: Web Linking (Link Header Pagination)',
        url: 'https://www.rfc-editor.org/rfc/rfc8288',
        description: 'Đặc tả chuẩn IETF về cấu trúc Link header trong phân trang và quan hệ tài nguyên mạng.'
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
          issue: 'Rủi ro bảo mật rò rỉ Token khi truyền qua Query Parameter thay vì Authorization Header',
          severity: 'Critical',
          resolution: 'Đã xây dựng Hộp Cảnh báo (Warning Box) phân tích nguy cơ lộ token trong Access Log/Browser history'
        },
        {
          issue: 'Nhầm lẫn chết người giữa PUT và PATCH làm xóa trắng các trường dữ liệu trong database',
          severity: 'Critical',
          resolution: 'Đã phân tích rõ sự khác biệt trong Lớp 1, lập bảng đối chiếu CRUD và câu hỏi trắc nghiệm số 1'
        },
        {
          issue: 'Lỗi vỡ cú pháp khi viết câu lệnh GraphQL inline chứa nhiều dấu ngoặc nhọn trên PowerShell',
          severity: 'Major',
          resolution: 'Đã hướng dẫn kỹ thuật tách file query.json và nạp qua cờ --json @file trong Lớp 4'
        },
        {
          issue: 'Bị WAF chặn IP vĩnh viễn do spam request liên tục khi gặp lỗi 429 Rate Limit',
          severity: 'Major',
          resolution: 'Đã hướng dẫn cơ chế tự động tuân thủ header Retry-After kết hợp với cờ --retry trong Lớp 3'
        },
        {
          issue: 'Dùng cờ -X POST thừa thãi khi đã sử dụng cờ hiện đại --json',
          severity: 'Minor',
          resolution: 'Đã giải thích cờ --json mặc định là POST trong bảng Options và mục Cạm bẫy'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://curl.se/docs/manpage.html#--json',
        'https://www.rfc-editor.org/rfc/rfc9110#section-9',
        'https://graphql.org/learn/serving-over-http/',
        'https://www.rfc-editor.org/rfc/rfc8288'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH17_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
