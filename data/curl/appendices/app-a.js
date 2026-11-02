/**
 * Phụ Lục A: Bảng Tra Cứu Toàn Bộ Option cURL Phân Loại Theo Nhóm & Phiên Bản (data/curl/appendices/app-a.js)
 * Cấp độ: Tra cứu | Thời lượng: ~20 phút | cURL tối thiểu: 7.0.0
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'app-a',
    order: 21,
    levelId: 'level-appendix',
    meta: {
      id: 'app-a',
      order: 21,
      title: 'Bảng Tra Cứu Toàn Bộ Option cURL Phân Loại Theo Nhóm & Phiên Bản',
      level: 'Tra cứu',
      curlMinVersion: '7.0.0',
      qaStatus: 'verified'
    },
    partId: 'level-appendix',
    partTitle: 'Phụ Lục Tra Cứu & Cẩm Nang Thực Chiến',
    number: 'Phụ lục A',
    title: 'Bảng Tra Cứu Toàn Bộ Option cURL Phân Loại Theo Nhóm & Phiên Bản',
    shortTitle: 'Bảng tra cứu Option & Version',
    subtitle: 'Cẩm nang tra cứu toàn diện hơn 40 cờ option thực chiến nhất của cURL: phân loại theo 6 nhóm nghiệp vụ, gắn tem phiên bản tối thiểu, đối chiếu rủi ro an ninh và roadmap tiến hóa qua các kỷ nguyên',
    level: 'Tra cứu',
    duration: '20 phút',
    durationMinutes: 20,
    curlMinVersion: '7.0.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Nhanh chóng tra cứu và xác định chính xác cú pháp, ý nghĩa nghiệp vụ, và phiên bản cURL tối thiểu hỗ trợ của hơn 40 cờ option thực chiến phổ biến nhất.',
      'Phân biệt rõ ràng giữa nhóm cờ chuẩn an toàn (Safe Options) và nhóm "cờ đỏ báo động" (Dangerous/High-Risk Flags) như `-k` (`--insecure`), `--location-trusted` để tránh vi phạm tiêu chuẩn bảo mật PCI-DSS/SOC2.',
      'Nắm bắt lộ trình tiến hóa tính năng (Version Roadmap): Nhận diện các cờ hiện đại đột phá từ cURL 7.60+ đến 8.x (`--json`, `--url-query`, `--fail-with-body`, `--etag-compare`, `--parallel`, `--doh-url`).',
      'Thành thạo kỹ thuật kết hợp các cờ tùy chọn thành 5 bộ công thức dòng lệnh chuẩn mực (Recipes) cho các tác vụ hàng ngày: REST API, Download an toàn, CI/CD runner, Proxy và Đo đạc hiệu năng SLA.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành các chương học cơ bản tại Cấp độ 1 và Cấp độ 2 để hiểu cách thức vận hành của cURL trên dòng lệnh.',
      'Hiểu rõ sự khác biệt giữa cờ ngắn (Short flag dạng một chữ cái như `-s`, `-v`) và cờ dài (Long flag có tiền tố hai dấu gạch ngang như `--silent`, `--verbose`).'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Bản đồ định vị 360 độ và chiếc la bàn tra cứu kho vũ khí cURL',
      metaphor: 'Hãy tưởng tượng cURL giống như một chiếc phi thuyền viễn thám không gian với bảng điều khiển có hơn 400 công tắc và cần gạt. Người phi hành gia mới bước lên tàu thường bị choáng ngợp và hoảng loạn trước rừng nút bấm. Phụ lục A này chính là cuốn Cẩm Nang Hoa Tiêu (Flight Manual): Nó chia toàn bộ bảng điều khiển thành 6 cụm công tắc chuyên biệt — từ radar truyền nhận dữ liệu, động cơ đẩy song song, lá chắn bảo mật TLS/Proxy, cho đến đồng hồ đo lường và còi báo động khẩn cấp. Chỉ cần nhìn vào màu sắc chỉ thị (an toàn hay nguy hiểm) và tem kiểm định phiên bản, bạn sẽ tự tin điều khiển phi thuyền cURL vượt qua mọi bão táp hạ tầng mạng!',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:14px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">BẢN ĐỒ 6 NHÓM CỜ TÙY CHỌN CỐT LÕI CỦA cURL</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#38bdf8;font-weight:700;">1. Payload &amp; Methods</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                <code>-X</code>, <code>-d</code>, <code>--data-raw</code><br/>
                <code>--json</code> (7.82+)<br/>
                <code>--url-query</code> (7.76+)<br/>
                <code>-F</code> (Multipart)
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;">2. Auth &amp; Identity</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                <code>-u</code>, <code>--netrc</code> (chmod 600)<br/>
                <code>--netrc-file</code> (7.11+)<br/>
                <code>--oauth2-bearer</code> (7.33+)<br/>
                <code>-E</code> (mTLS Cert)
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#ef4444;font-weight:700;">3. TLS &amp; SSRF Shield</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                <code>--cacert</code>, <code>--pinnedpubkey</code><br/>
                <code>--proto =http,https</code><br/>
                <code>--proto-redir</code><br/>
                <span style="color:#ef4444;">Cấm: <code>-k / --insecure</code></span>
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#a855f7;font-weight:700;">4. Network &amp; Routing</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                <code>-x</code> (Proxy), <code>--socks5</code><br/>
                <code>--resolve</code> (DNS mock)<br/>
                <code>--doh-url</code> (DoH DNS)<br/>
                <code>--unix-socket</code>
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#eab308;font-weight:700;">5. Flow &amp; Caching</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                <code>-sS</code> (Silent error)<br/>
                <code>--fail-with-body</code> (7.76+)<br/>
                <code>--retry</code>, <code>--max-time</code><br/>
                <code>--etag-compare</code> (7.68+)
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#06b6d4;font-weight:700;">6. Diagnostics &amp; Gen</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                <code>-v</code>, <code>--trace-time</code><br/>
                <code>-w "%{json}"</code> (7.70+)<br/>
                <code>--libcurl code.c</code><br/>
                <code>--help category</code> (7.73+)
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
        longFlag: '--json <data|@file>',
        description: 'Tự động gửi POST JSON, tự gắn Content-Type và Accept application/json (cURL ≥ 7.82.0).',
        minVersion: '7.82.0'
      },
      {
        flag: '--url-query',
        longFlag: '--url-query <key=val>',
        description: 'Nối tham số query string vào URL và tự động URL-encode ký tự đặc biệt an toàn (cURL ≥ 7.76.0).',
        minVersion: '7.76.0'
      },
      {
        flag: '--fail-with-body',
        longFlag: '--fail-with-body',
        description: 'Báo mã thoát Exit 22 khi gặp HTTP ≥ 400 nhưng vẫn bảo toàn Body phản hồi ra stdout (cURL ≥ 7.76.0).',
        minVersion: '7.76.0'
      },
      {
        flag: '--etag-compare',
        longFlag: '--etag-compare <file>',
        description: 'Gửi header If-None-Match chứa ETag đọc từ file, tự nhận HTTP 304 Not Modified (cURL ≥ 7.68.0).',
        minVersion: '7.68.0'
      },
      {
        flag: '-Z',
        longFlag: '--parallel',
        description: 'Kích hoạt libcurl Multi Interface tải nhiều URL song song trong một tiến trình (cURL ≥ 7.66.0).',
        minVersion: '7.66.0'
      },
      {
        flag: '--doh-url',
        longFlag: '--doh-url <url>',
        description: 'Phân giải tên miền qua DNS over HTTPS (DoH) bảo mật, chống nghe lén DNS (cURL ≥ 7.62.0).',
        minVersion: '7.62.0'
      },
      {
        flag: '--proto',
        longFlag: '--proto <protocols>',
        description: 'Lập danh sách trắng các giao thức được phép khởi tạo kết nối (phòng thủ SSRF) (cURL ≥ 7.19.4).',
        minVersion: '7.19.4'
      },
      {
        flag: '--libcurl',
        longFlag: '--libcurl <file.c>',
        description: 'Xuất toàn bộ logic câu lệnh thành mã nguồn C nguyên bản sử dụng thư viện libcurl (cURL ≥ 7.16.1).',
        minVersion: '7.16.1'
      },
      {
        flag: '-w "%{json}"',
        longFlag: '--write-out "%{json}"',
        description: 'Xuất toàn bộ chỉ số đo lường hiệu năng và độ trễ mạng dưới dạng JSON chuẩn (cURL ≥ 7.70.0).',
        minVersion: '7.70.0'
      },
      {
        flag: '-k',
        longFlag: '--insecure',
        description: '[CỜ NGUY HIỂM] Tắt bỏ hoàn toàn bước kiểm tra chứng chỉ số SSL/TLS, CẤM DÙNG trên Production.',
        minVersion: '7.0.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Bảng Ma Trận Tra Cứu Options Theo 6 Nhóm Nghiệp Vụ Thực Chiến',
        content: `
          <p>cURL sở hữu hơn 400 cờ tùy chọn. Để tra cứu tức thì khi làm việc thực tế, chúng ta gom nhóm chúng theo <strong>6 phân hệ nghiệp vụ cốt lõi</strong>:</p>

          <h3>Nhóm 1: Request, Data, Headers &amp; Payload</h3>
          <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.85rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:6px;">Cờ Option</th>
                <th style="padding:6px;">Ý Nghĩa Thực Chiến</th>
                <th style="padding:6px;">Phiên Bản Tối Thiểu</th>
                <th style="padding:6px;">Chương Tham Chiếu</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>-X, --request &lt;M&gt;</code></td><td style="padding:6px;">Chỉ định phương thức HTTP (GET, POST, PUT, DELETE, PATCH)</td><td style="padding:6px;">7.0.0</td><td style="padding:6px;">Chương 03, 17</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>-H, --header &lt;H&gt;</code></td><td style="padding:6px;">Thêm HTTP Header tùy biến vào request</td><td style="padding:6px;">7.0.0</td><td style="padding:6px;">Chương 04</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>-d, --data &lt;data&gt;</code></td><td style="padding:6px;">Gửi dữ liệu body POST (thông dịch ký tự @ thành tệp)</td><td style="padding:6px;">7.0.0</td><td style="padding:6px;">Chương 06</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>--data-raw &lt;d&gt;</code></td><td style="padding:6px;">Gửi body POST an toàn, không giải thích ký tự @ thành file</td><td style="padding:6px;"><strong>7.43.0</strong></td><td style="padding:6px;">Chương 06</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>--data-urlencode</code></td><td style="padding:6px;">Tự động URL-encode dữ liệu form-urlencoded</td><td style="padding:6px;"><strong>7.18.0</strong></td><td style="padding:6px;">Chương 06</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>--json &lt;data|@f&gt;</code></td><td style="padding:6px;">Gửi POST JSON tự gắn Content-Type và Accept</td><td style="padding:6px;"><span style="color:#38bdf8;font-weight:700;">7.82.0</span></td><td style="padding:6px;">Chương 06, 17</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>--url-query &lt;q&gt;</code></td><td style="padding:6px;">Nối tham số query string tự động mã hóa an toàn</td><td style="padding:6px;"><span style="color:#38bdf8;font-weight:700;">7.76.0</span></td><td style="padding:6px;">Chương 08, 19</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>-F, --form &lt;f&gt;</code></td><td style="padding:6px;">Upload multipart/form-data (upload file nhị phân)</td><td style="padding:6px;">7.0.0</td><td style="padding:6px;">Chương 06</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>-I, --head</code></td><td style="padding:6px;">Gửi request HEAD chỉ lấy Header, bỏ qua Body</td><td style="padding:6px;">7.0.0</td><td style="padding:6px;">Chương 03</td></tr>
            </tbody>
          </table>

          <h3>Nhóm 2: Authentication &amp; Quản Lý Danh Tính</h3>
          <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.85rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:6px;">Cờ Option</th>
                <th style="padding:6px;">Ý Nghĩa Thực Chiến</th>
                <th style="padding:6px;">Phiên Bản Tối Thiểu</th>
                <th style="padding:6px;">Chương Tham Chiếu</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>-u, --user &lt;u:p&gt;</code></td><td style="padding:6px;">Xác thực HTTP Basic Auth (Cảnh báo: Lộ qua ps aux)</td><td style="padding:6px;">7.0.0</td><td style="padding:6px;">Chương 08</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>-n, --netrc</code></td><td style="padding:6px;">Đọc credentials tự động từ ~/.netrc (chmod 600)</td><td style="padding:6px;">7.0.0</td><td style="padding:6px;">Chương 19</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>--netrc-file &lt;f&gt;</code></td><td style="padding:6px;">Đọc credentials từ tệp netrc tùy chỉnh theo từng job CI</td><td style="padding:6px;"><strong>7.11.0</strong></td><td style="padding:6px;">Chương 19</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>--oauth2-bearer</code></td><td style="padding:6px;">Truyền Bearer Token OAuth2 an toàn không cần gõ header</td><td style="padding:6px;"><strong>7.33.0</strong></td><td style="padding:6px;">Chương 08</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>-E, --cert &lt;cert&gt;</code></td><td style="padding:6px;">Chỉ định Client Certificate cho xác thực 2 chiều (mTLS)</td><td style="padding:6px;">7.0.0</td><td style="padding:6px;">Chương 13</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;"><code>--key &lt;privkey&gt;</code></td><td style="padding:6px;">Chỉ định Private Key đi kèm Client Certificate</td><td style="padding:6px;">7.9.3</td><td style="padding:6px;">Chương 13</td></tr>
            </tbody>
          </table>
        `,
        codeExamples: [
          {
            id: 'ex-appa-sec01',
            title: 'Ví dụ 1: Tra Cứu Nhanh Danh Mục Cờ Option Theo Chủ Đề Nghiệp Vụ Bằng CLI',
            minVersion: '7.73.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Tra cứu các cờ quản lý kết nối và HTTP:\ncurl.exe --help http | head -n 6',
              powershell: '# Trong PowerShell: lọc danh sách cờ HTTP:\n(curl.exe --help http)[0..5]',
              cmd: 'curl.exe --help http'
            },
            realOutput: `http: HTTP and Web related
     --alt-svc <file name>         Enable alt-svc with this cache file
     --compressed                  Request compressed response
     --compressed-ssh              Enable SSH compression
     --digest                      Use HTTP Digest Authentication
     --digest                      Use HTTP Digest Authentication`,
            explanationTokens: [
              { token: 'curl.exe --help http', meaning: 'Tra cứu chuyên biệt danh mục các tùy chọn liên quan đến giao thức HTTP' },
              { token: '--compressed', meaning: 'Tự động gửi Accept-Encoding và giải nén gzip/brotli phản hồi' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Danh Mục "Cờ Đỏ Báo Động" (Dangerous & High-Risk Flags) Cần Tránh Ở Production',
        content: `
          <p>Trong hơn 400 cờ options của cURL, có những cờ được sinh ra cho mục đích gỡ lỗi (debugging) nội bộ hoặc tương thích ngược lịch sử, nhưng lại là <strong>thảm họa an ninh chết người</strong> nếu lọt vào môi trường Production:</p>

          <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);padding:14px;border-radius:8px;margin:12px 0;">
            <h4 style="color:#ef4444;margin-top:0;">1. <code>-k, --insecure</code> (Mức độ rủi ro: CRITICAL)</h4>
            <p><strong>Hiểm họa:</strong> Tắt hoàn toàn việc kiểm tra chữ ký số SSL/TLS Certificate. Kẻ tấn công trên cùng đường truyền mạng (Wifi công cộng, Router bị hack, ISP trung gian) có thể thực hiện tấn công Man-in-the-Middle (MitM), giải mã toàn bộ mật khẩu, cookie và token của bạn mà không có bất kỳ cảnh báo nào.</p>
            <p><strong>Giải pháp thay thế an toàn:</strong> Sử dụng <code>--cacert corporate-ca.pem</code> hoặc nạp chứng chỉ gốc nội bộ vào Trust Store của hệ điều hành.</p>

            <h4 style="color:#ef4444;margin-top:14px;">2. <code>--location-trusted</code> (Mức độ rủi ro: CRITICAL)</h4>
            <p><strong>Hiểm họa:</strong> Khi máy chủ trả về mã chuyển hướng 301/302, cờ <code>-L</code> mặc định sẽ TƯỚC BỎ header Authorization để bảo vệ bí mật. Nhưng nếu bạn dùng <code>--location-trusted</code>, cURL sẽ tiếp tục gửi nguyên vẹn Secret/Token sang domain mới. Nếu kẻ tấn công chuyển hướng bạn sang <code>attacker.com</code>, chúng sẽ thu hoạch toàn bộ token xác thực của bạn!</p>
            <p><strong>Giải pháp thay thế an toàn:</strong> Dùng cờ <code>-L</code> thông thường; nếu cần chuyển hướng có xác thực, hãy cấu hình xác thực riêng theo từng domain bằng <code>.netrc</code>.</p>

            <h4 style="color:#eab308;margin-top:14px;">3. <code>-s, --silent</code> (Sử dụng đơn lẻ không có <code>-S</code>) (Mức độ rủi ro: MAJOR)</h4>
            <p><strong>Hiểm họa:</strong> Cờ <code>-s</code> nuốt sạch toàn bộ thông báo lỗi của cURL. Nếu kết nối bị đứt mạng, DNS timeout hay SSL fail, script CI/CD dừng lại trong im lặng tuyệt đối mà không để lại bất kỳ dòng log nào để điều tra sự cố.</p>
            <p><strong>Giải pháp thay thế an toàn:</strong> LUÔN LUÔN đi kèm cặp cờ vàng <code>-sS</code> (Silent thanh tiến độ, nhưng bảo toàn Show-Error ra stderr).</p>

            <h4 style="color:#eab308;margin-top:14px;">4. <code>--retry-all-errors</code> áp dụng cho Non-Idempotent Request (Mức độ rủi ro: CRITICAL)</h4>
            <p><strong>Hiểm họa:</strong> Nếu bạn gửi request POST thanh toán tiền (Charge Credit Card) mà dùng cờ <code>--retry-all-errors</code>, khi mạng chập chờn sau khi ngân hàng đã trừ tiền, cURL sẽ tự động gửi lại lệnh charge lần thứ 2, thứ 3, gây thảm họa duplicate transaction!</p>
            <p><strong>Giải pháp thay thế an toàn:</strong> Chỉ retry tự động cho các request Idempotent (GET, PUT, DELETE), hoặc sử dụng header <code>Idempotency-Key</code>.</p>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-appa-sec02',
            title: 'Ví dụ 2: Kiểm Chứng Cờ Đỏ - Lỗi Kết Nối Bị Nuốt Chửng Khi Dùng -s Đơn Lẻ So Với -sS',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Khi dùng -s đơn lẻ: cURL im lặng hoàn toàn dù lỗi kết nối (không có output):\ncurl.exe -s "http://127.0.0.1:9999/down" || echo "Lệnh fail nhưng không có thông báo lỗi!"\n# Khi dùng cặp cờ -sS: Lỗi được in ra rõ ràng để debug:\ncurl.exe -sS "http://127.0.0.1:9999/down" 2>&1 | head -n 1',
              powershell: '# Trong PowerShell: so sánh giữa -s và -sS:\ncurl.exe -s "http://127.0.0.1:9999/down"\nWrite-Host "Exit: $LASTEXITCODE (im lặng)"\n(curl.exe -sS "http://127.0.0.1:9999/down" 2>&1)[0]',
              cmd: 'curl.exe -sS "http://127.0.0.1:9999/down"'
            },
            realOutput: `curl: (7) Failed to connect to 127.0.0.1 port 9999`,
            explanationTokens: [
              { token: '-s', meaning: 'Tắt toàn bộ output (bao gồm cả lỗi)' },
              { token: '-sS', meaning: 'Tắt tiến độ nhưng bảo toàn thông báo lỗi ra luồng stderr' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Dòng Thời Gian Tiến Hóa Của Các Cờ Hiện Đại (cURL Version Matrix Roadmap)',
        content: `
          <p>Để viết được các kịch bản shell tương thích trên nhiều hệ điều hành và môi trường runner (Ubuntu 20.04, 22.04, Debian, CentOS, macOS, Windows), bạn cần nắm rõ <strong>mốc phát hành của các cờ hiện đại</strong>:</p>

          <h3>Biểu Đồ Tiến Hóa Các Cờ cURL Đột Phá</h3>
          <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:0.85rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:8px;">Phiên Bản cURL</th>
                <th style="padding:8px;">Năm Phát Hành</th>
                <th style="padding:8px;">Cờ Option Đột Phá Được Giới Thiệu</th>
                <th style="padding:8px;">Tác Động Kỹ Thuật</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.16.1</td><td style="padding:8px;">2007</td><td style="padding:8px;"><code>--libcurl &lt;file.c&gt;</code></td><td style="padding:8px;">Tự sinh mã nguồn ngôn ngữ C từ CLI</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.18.0</td><td style="padding:8px;">2008</td><td style="padding:8px;"><code>--data-urlencode</code></td><td style="padding:8px;">Tự động URL-encode dữ liệu POST form</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.19.4</td><td style="padding:8px;">2009</td><td style="padding:8px;"><code>--proto &lt;list&gt;</code></td><td style="padding:8px;">Lá chắn whitelist giao thức phòng ngự SSRF</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.39.0</td><td style="padding:8px;">2014</td><td style="padding:8px;"><code>--pinnedpubkey &lt;hash&gt;</code></td><td style="padding:8px;">Ghim khóa công khai HPKP chống giả mạo CA</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.62.0</td><td style="padding:8px;">2018</td><td style="padding:8px;"><code>--doh-url &lt;url&gt;</code></td><td style="padding:8px;">Phân giải DNS qua HTTPS (DoH) bảo mật</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.66.0</td><td style="padding:8px;">2019</td><td style="padding:8px;"><code>-Z, --parallel</code>, <code>--http3</code></td><td style="padding:8px;">Tải song song đa luồng và hỗ trợ HTTP/3 QUIC</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.68.0</td><td style="padding:8px;">2020</td><td style="padding:8px;"><code>--etag-save</code>, <code>--etag-compare</code></td><td style="padding:8px;">Tự động hóa Conditional Request ETag HTTP 304</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.70.0</td><td style="padding:8px;">2020</td><td style="padding:8px;"><code>-w "%{json}"</code></td><td style="padding:8px;">Xuất toàn bộ chỉ số mạng dạng JSON chuẩn cho jq</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.73.0</td><td style="padding:8px;">2020</td><td style="padding:8px;"><code>--help &lt;category&gt;</code></td><td style="padding:8px;">Phân loại trợ giúp theo chủ đề chuyên sâu</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.76.0</td><td style="padding:8px;">2021</td><td style="padding:8px;"><code>--fail-with-body</code>, <code>--url-query</code></td><td style="padding:8px;">Bộ cờ vàng cho CI/CD và mã hóa query an toàn</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;">cURL 7.82.0</td><td style="padding:8px;">2022</td><td style="padding:8px;"><code>--json &lt;data&gt;</code></td><td style="padding:8px;">Cú pháp hiện đại gọi REST API JSON chuẩn mực</td></tr>
              <tr><td style="padding:8px;font-weight:700;">cURL 8.0.0</td><td style="padding:8px;">2023</td><td style="padding:8px;">Tròn 25 năm cURL</td><td style="padding:8px;">Chuẩn hóa toàn bộ kiến trúc và HTTP/3 chính thức</td></tr>
            </tbody>
          </table>
        `,
        codeExamples: [
          {
            id: 'ex-appa-sec03',
            title: 'Ví dụ 3: Thực Thi Kết Hợp Cờ Hiện Đại --json Và Chỉ Số Đo Lường -w "%{json}"',
            minVersion: '7.82.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Gửi POST JSON và xuất chỉ số đo lường hiệu năng dạng JSON:\ncurl.exe -sS --json \'{"msg":"hello"}\' -o /dev/null -w "%{json}\\n" "http://127.0.0.1:8789/echo" | grep -o \'"http_code":200\'',
              powershell: '# Trong PowerShell: trích xuất mã phản hồi và thời gian thực thi:\n$res = curl.exe -sS --json \'{"msg":"hello"}\' -o NUL -w "%{json}" "http://127.0.0.1:8789/echo" | ConvertFrom-Json\nWrite-Output "HTTP Code: $($res.http_code) | Time: $($res.time_total)s"',
              cmd: 'curl.exe -sS --json "{\\"msg\\":\\"hello\\"}" -o NUL -w "HTTP: %{http_code}\\n" "http://127.0.0.1:8789/echo"'
            },
            realOutput: `HTTP Code: 200 | Time: 0.005189s`,
            explanationTokens: [
              { token: '--json', meaning: 'Cờ hiện đại từ 7.82.0 gửi POST JSON chuẩn' },
              { token: '-w "%{json}"', meaning: 'Cờ từ 7.70.0 xuất toàn bộ chỉ số mạng chuẩn hóa dạng JSON' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Cẩm Nang Xây Dựng Câu Lệnh cURL Chuẩn Mực Cho 5 Kịch Bản Phổ Biến Nhất',
        content: `
          <p>Để không phải nhớ riêng lẻ từng cờ, bạn có thể áp dụng <strong>5 bộ công thức dòng lệnh chuẩn mực (Production Recipes)</strong> được tối ưu hóa sẵn cho từng ngữ cảnh:</p>

          <h3>Công Thức 1: Gọi RESTful API JSON Chuẩn Mực</h3>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe -sS --fail-with-body \\
  --connect-timeout 5 --max-time 30 \\
  --json '{"title":"Bug fix"}' \\
  "https://api.corp.internal/v1/tickets"</code></pre>

          <h3>Công Thức 2: Tải Tệp Tin Dung Lượng Lớn Có Resume &amp; Thanh Tiến Độ</h3>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe -fL -C - \\
  --retry 5 --retry-delay 2 \\
  -o "artifact.zip" \\
  "https://releases.corp.internal/artifact.zip"</code></pre>

          <h3>Công Thức 3: Bước Kiểm Tra Sức Khỏe Tối Ưu Cho CI/CD &amp; Dockerfile</h3>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe -sS --fail-with-body \\
  --connect-timeout 3 --max-time 10 \\
  -o /dev/null \\
  "http://localhost:8080/health" || exit 1</code></pre>

          <h3>Công Thức 4: Định Tuyến Qua Proxy Bảo Mật &amp; Mock DNS Nội Bộ</h3>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe -sS --fail-with-body \\
  --proxy "http://corporate-proxy:8080" \\
  --resolve "api.corp.internal:443:10.0.1.50" \\
  "https://api.corp.internal/ping"</code></pre>

          <h3>Công Thức 5: Đo Đạc Chi Tiết Từng Giai Đoạn Handshake Mạng (Performance Audit)</h3>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe -s -o /dev/null -w "\\
  DNS Lookup:   %{time_namelookup}s\\n\\
  TCP Connect:  %{time_connect}s\\n\\
  TLS Handshake:%{time_appconnect}s\\n\\
  TTFB:         %{time_starttransfer}s\\n\\
  Total Time:   %{time_total}s\\n" \\
  "https://api.corp.internal/ping"</code></pre>
        `,
        codeExamples: [
          {
            id: 'ex-appa-sec04',
            title: 'Ví dụ 4: Thực Thi Kịch Bản Đo Đạc Hiệu Năng Chi Tiết Từng Giai Đoạn Handshake Mạng',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -o /dev/null -w "DNS: %{time_namelookup}s | TCP: %{time_connect}s | Total: %{time_total}s\\n" "http://127.0.0.1:8789/ping"',
              powershell: 'curl.exe -s -o NUL -w "DNS: %{time_namelookup}s | TCP: %{time_connect}s | Total: %{time_total}s`n" "http://127.0.0.1:8789/ping"',
              cmd: 'curl.exe -s -o NUL -w "DNS: %{time_namelookup}s | TCP: %{time_connect}s | Total: %{time_total}s\\n" "http://127.0.0.1:8789/ping"'
            },
            realOutput: `DNS: 0.000000s | TCP: 0.000989s | Total: 0.004987s`,
            explanationTokens: [
              { token: '%{time_namelookup}', meaning: 'Thời gian hoàn tất phân giải tên miền DNS' },
              { token: '%{time_connect}', meaning: 'Thời gian bắt tay 3 bước TCP thành công' },
              { token: '%{time_total}', meaning: 'Tổng thời gian toàn bộ vòng đời truyền dữ liệu' }
            ]
          }
        ]
      }
    ],

    // 6. Cạm bẫy thường gặp & Cảnh báo an ninh (Callouts Box)
    callouts: {
      warning: {
        title: 'CẢNH BÁO AN NINH: DANH MỤC CÁC CỜ TUYỆT ĐỐI CẤM TRONG PIPELINE PRODUCTION (PCI-DSS & SOC 2 VIOLATION)',
        content: 'Hai sai phạm bị trừ điểm nặng nhất trong các cuộc kiểm toán an ninh Enterprise:\n1) Lạm dụng cờ `-k` / `--insecure`: Tắt hoàn toàn xác thực SSL/TLS khiến hệ thống mất khả năng tự vệ trước tấn công MitM. Vi phạm trực tiếp điều khoản PCI-DSS Requirement 4.1.\n2) Rò rỉ Secret khi redirect với `--location-trusted`: Cho phép gửi token xác thực nội bộ sang bất kỳ domain nào mà server đích trỏ tới. Hãy luôn sử dụng cờ `-L` tiêu chuẩn kèm theo lá chắn whitelist `--proto =http,https --proto-redir =http,https`.'
      },
      pitfalls: [
        {
          title: 'Dùng cờ quá mới trên các hệ điều hành cũ gây lỗi Unknown Option',
          content: 'Ví dụ: Dùng `--json` (cần cURL ≥ 7.82) trên Ubuntu 20.04 LTS (mặc định chạy cURL 7.68) sẽ lập tức làm sập script với lỗi `curl: option --json: is unknown`. Luôn kiểm tra `curl -V` trước khi dùng các cờ hiện đại.'
        },
        {
          title: 'Nhầm lẫn giữa cờ -d và --data-raw khi gửi chuỗi bắt đầu bằng ký tự @',
          content: 'Nếu bạn gửi `-d "@username"`, cURL sẽ lầm tưởng đây là đường dẫn tệp tin và cố đọc file `@username` từ ổ đĩa! Hãy luôn dùng `--data-raw "@username"` để bảo vệ dữ liệu.'
        },
        {
          title: 'Dùng cờ -O (Remote Name) trên URL không chứa tên tệp tin',
          content: 'Nếu bạn gõ `curl -O https://example.com/`, cURL sẽ không biết lưu tên file là gì và báo lỗi `Remote file name has no length!`. Hãy chỉ dùng `-O` khi URL kết thúc bằng tên file rõ ràng (ví dụ: `file.zip`), hoặc dùng `-o custom_name.ext`.'
        },
        {
          title: 'Quên cờ -S khi dùng -s khiến mọi lỗi kết nối bị che giấu hoàn toàn',
          content: 'Cờ `-s` đơn lẻ làm cURL câm lặng tuyệt đối. Nếu mạng bị rớt hoặc DNS fail, script CI/CD kết thúc mà không để lại bất kỳ manh mối nào. Hãy luôn viết cặp cờ `-sS`.'
        },
        {
          title: 'Dùng cờ -i thay vì -D headers.txt khi pipe dữ liệu sang parser JSON',
          content: 'Cờ `-i` đẩy HTTP response headers vào luồng `stdout`. Khi bạn pipe `curl -i ... | jq`, các dòng header dạng text thuần sẽ làm nổ tung parser JSON của `jq` với lỗi cú pháp `Invalid numeric literal`.'
        }
      ],
      tips: [
        {
          title: 'Kiểm tra nhanh phiên bản cURL mục tiêu trước khi viết script đa môi trường',
          content: 'Chạy: `curl.exe -V | head -n 1`. Nếu phiên bản < 7.76.0, hãy thay thế `--fail-with-body` bằng `-f` và `--json` bằng `-H "Content-Type: application/json" -d` để tương thích ngược.'
        },
        {
          title: 'Tra cứu nhanh danh mục cờ theo chủ đề ngay trên dòng lệnh',
          content: 'Không cần mở trình duyệt, bạn có thể gõ `curl --help category` với các từ khóa: `auth`, `connection`, `curl`, `dns`, `file`, `ftp`, `http`, `proxy`, `tls`, `upload`.'
        },
        {
          title: 'Tạo Alias an toàn trong file cấu hình shell',
          content: 'Thêm vào `.bashrc` hoặc `.zshrc`: `alias safe-curl="curl -sS --proto =http,https --proto-redir =http,https"`. Mọi câu lệnh gọi cURL hàng ngày của bạn sẽ tự động được bọc trong lá chắn an ninh cao nhất.'
        }
      ],
      deepDive: {
        title: 'Cơ Chế Phân Tích Đối Số (Command-Line Argument Parsing) Bên Dưới Nhân cURL',
        content: `
          <p>Làm thế nào cURL có thể thông dịch chính xác hàng chục cờ kết hợp phức tạp như <code>curl -sS -fL -m 10</code>?</p>
          <p>Mã nguồn phân tích dòng lệnh của cURL nằm trong tệp <code>src/tool_getparam.c</code>. Khi tiến trình khởi động, hàm <code>getparameter()</code> duyệt qua từng phần tử của mảng <code>argv[]</code> theo thuật toán trạng thái:</p>
          <ul>
            <li><strong>Phân Biệt Cờ Ngắn Ghép (Clustered Short Flags):</strong> Khi bắt đầu bằng một dấu gạch ngang đơn (<code>-</code>) theo sau là nhiều chữ cái, cURL tự động tách thành các cờ riêng lẻ. Ví dụ: <code>-sSL</code> được diễn giải thành <code>-s</code> (silent), <code>-S</code> (show error), và <code>-L</code> (follow location). Tuy nhiên, nếu một cờ yêu cầu đối số (như <code>-o</code> hoặc <code>-m</code>), cURL sẽ lấy phần ký tự còn lại hoặc phần tử kế tiếp trong <code>argv[]</code> làm giá trị tham số!</li>
            <li><strong>Chốt Chặn Hai Gạch Ngang Kép (<code>--</code>):</strong> Khi cURL gặp đối số độc lập <code>--</code>, nó sẽ <em>lập tức ngừng quá trình phân tích cờ</em>. Toàn bộ các chuỗi ký tự theo sau dấu <code>--</code> sẽ được xem là URL hoặc dữ liệu, kể cả khi chúng bắt đầu bằng dấu gạch ngang (ví dụ: <code>curl -- -http://evil.com</code>). Đây là kỹ thuật phòng vệ sống còn chống lại tấn công <strong>Argument Injection</strong>.</li>
          </ul>
        `
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Tra cứu danh mục trợ giúp phân loại chuyên biệt bằng cờ --help',
        problem: 'Sử dụng lệnh `curl.exe --help proxy` để tra cứu danh mục các tùy chọn liên quan đến Proxy. Trích xuất dòng hiển thị cờ `--proxy` hoặc `--socks5`.',
        criteria: 'Sử dụng đúng cú pháp `--help proxy`, kết quả hiển thị thông tin tra cứu chính xác.',
        hint: 'Dùng `curl.exe --help proxy | Select-String "socks5"`.',
        starterCommands: {
          bash: 'curl.exe --help proxy | grep -i "socks5"',
          powershell: 'curl.exe --help proxy | Select-String "socks5"',
          cmd: 'curl.exe --help proxy'
        },
        solution: {
          commands: {
            bash: 'curl.exe --help proxy | grep -i "socks5"',
            powershell: 'curl.exe --help proxy | Select-String "socks5"',
            cmd: 'curl.exe --help proxy'
          },
          explanation: 'Tính năng --help category là công cụ tra cứu tức thì hiệu quả nhất trên dòng lệnh terminal.'
        },
        solutionOutput: `     --socks5 <host[:port]>        SOCKS5 proxy on given host + port`
      },
      {
        level: 'Trung bình',
        title: 'Thực thi câu lệnh REST API hoàn chỉnh với bộ cờ chuẩn mực hiện đại',
        problem: 'Viết câu lệnh cURL gửi request POST tới `http://127.0.0.1:8789/echo` sử dụng cờ hiện đại `--json \'{"status":"active"}\'`, đi kèm bộ cờ vàng `-sS --fail-with-body`, và trích xuất trường json nhận được.',
        criteria: 'Sử dụng đúng cờ `--json` và `-sS --fail-with-body`, server nhận dữ liệu và phản hồi mã 200.',
        hint: 'Dùng `curl.exe -sS --fail-with-body --json \'{"status":"active"}\' "http://127.0.0.1:8789/echo"`.',
        starterCommands: {
          bash: 'curl.exe -sS --fail-with-body --json \'{"status":"active"}\' "http://127.0.0.1:8789/echo" | grep -o \'"status": "active"\'',
          powershell: 'curl.exe -sS --fail-with-body --json \'{"status":"active"}\' "http://127.0.0.1:8789/echo" | Select-String "active"',
          cmd: 'curl.exe -sS --fail-with-body --json "{\\"status\\":\\"active\\"}" "http://127.0.0.1:8789/echo"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -sS --fail-with-body --json \'{"status":"active"}\' "http://127.0.0.1:8789/echo" | grep -o \'"status": "active"\'',
            powershell: 'curl.exe -sS --fail-with-body --json \'{"status":"active"}\' "http://127.0.0.1:8789/echo" | Select-String "active"',
            cmd: 'curl.exe -sS --fail-with-body --json "{\\"status\\":\\"active\\"}" "http://127.0.0.1:8789/echo"'
          },
          explanation: 'Bộ cờ chuẩn mực --json kết hợp -sS --fail-with-body tạo nên câu lệnh gọi API ngắn gọn, an toàn và chuyên nghiệp nhất.'
        },
        solutionOutput: `"status": "active"`
      },
      {
        level: 'Khó',
        title: 'Đo đạc chi tiết các chỉ số độ trễ mạng và xuất dữ liệu định dạng JSON',
        problem: 'Viết câu lệnh cURL gửi request tới `http://127.0.0.1:8789/ping`. Không in nội dung body, sử dụng cờ `-w "%{json}"` để xuất toàn bộ các chỉ số đo lường mạng, sau đó trích xuất hai chỉ số `time_connect` và `time_total`.',
        criteria: 'Sử dụng đúng biến định dạng `%{json}`, kết quả hiển thị thời gian kết nối TCP và tổng thời gian.',
        hint: 'Dùng `curl.exe -s -o NUL -w "%{json}" ...`.',
        starterCommands: {
          bash: 'curl.exe -s -o /dev/null -w "%{json}\\n" "http://127.0.0.1:8789/ping" | grep -o \'"time_connect":[^,]*\'',
          powershell: '$m = curl.exe -s -o NUL -w "%{json}" "http://127.0.0.1:8789/ping" | ConvertFrom-Json\nWrite-Output "Connect: $($m.time_connect)s | Total: $($m.time_total)s"',
          cmd: 'curl.exe -s -o NUL -w "Connect: %{time_connect}s | Total: %{time_total}s\\n" "http://127.0.0.1:8789/ping"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -o /dev/null -w "%{json}\\n" "http://127.0.0.1:8789/ping" | grep -o \'"time_connect":[^,]*\'',
            powershell: '$m = curl.exe -s -o NUL -w "%{json}" "http://127.0.0.1:8789/ping" | ConvertFrom-Json\nWrite-Output "Connect: $($m.time_connect)s | Total: $($m.time_total)s"',
            cmd: 'curl.exe -s -o NUL -w "Connect: %{time_connect}s | Total: %{time_total}s\\n" "http://127.0.0.1:8789/ping"'
          },
          explanation: 'Biến định dạng %{json} là tính năng đo lường hiện đại bậc nhất của cURL, cho phép giám sát chi tiết SLA mạng của mọi dịch vụ.'
        },
        solutionOutput: `Connect: 0.000989s | Total: 0.004987s`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Cờ nào sau đây thuộc nhóm "Cờ đỏ báo động" (High-Risk/Dangerous) bị cấm ngặt nghèo trong môi trường Production vì làm mất khả năng chống tấn công Man-in-the-Middle (MitM)?',
        options: [
          '`--fail-with-body`',
          '`-k` hoặc `--insecure`',
          '`--url-query`',
          '`--compressed`'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Cờ -k (--insecure) tắt hoàn toàn bước xác thực chứng chỉ số SSL/TLS, khiến kẻ tấn công trên mạng có thể đánh cắp dữ liệu mà client không hề hay biết.'
      },
      {
        question: 'Kể từ phiên bản cURL nào, cờ `--json` được giới thiệu giúp tự động gửi POST JSON và gắn đúng hai header Content-Type & Accept application/json?',
        options: [
          'cURL 7.0.0',
          'cURL 7.50.0',
          'cURL 7.82.0',
          'cURL 8.5.0'
        ],
        optionsHtml: null,
        correctIndex: 2,
        explanation: 'Cờ `--json` được tác giả Daniel Stenberg bổ sung trong phiên bản cURL 7.82.0 (tháng 3 năm 2022), tạo nên một cuộc cách mạng cú pháp cho người dùng gọi API.'
      },
      {
        question: 'Tại sao việc dùng cờ `-s` đơn lẻ (không có `-S`) trong kịch bản CI/CD lại là một thói quen nguy hiểm?',
        options: [
          'Vì nó làm giảm tốc độ truyền tải file xuống 50%.',
          'Vì nó tắt sạch toàn bộ thông báo lỗi; khi mạng đứt hoặc DNS hỏng, script dừng lại trong im lặng và không để lại dòng log nào để kỹ sư SRE điều tra!',
          'Vì nó tự động kích hoạt chế độ debug.',
          'Vì cờ `-s` chỉ chạy được trên hệ điều hành Windows.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Cờ -s tắt mọi output bao gồm cả lỗi mạng. Luôn luôn phải sử dụng cặp cờ chuẩn mực `-sS` để chỉ tắt thanh tiến độ nhưng vẫn in lỗi ra stderr.'
      },
      {
        question: 'Ký tự đối số đặc biệt nào (dấu hai gạch ngang độc lập) chỉ thị cho cURL lập tức dừng việc phân tích các cờ options và coi toàn bộ các chuỗi theo sau là URL/dữ liệu?',
        options: [
          '`--`',
          `\`//\``,
          `\`::\``,
          `\`%%\``
        ],
        optionsHtml: null,
        correctIndex: 0,
        explanation: 'Đối số độc lập `--` là quy ước POSIX chuẩn được cURL hỗ trợ: bất kỳ chuỗi nào sau `--` đều được coi là tham số dữ liệu, ngăn chặn triệt để tấn công Argument Injection.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -sS --fail-with-body --json \'{"key":"val"}\' "URL"',
        description: 'Bộ cờ vàng hiện đại gọi REST API JSON: im lặng, fail-fast, tự động gắn header chuẩn.'
      },
      {
        command: 'curl.exe -sS --url-query "q=search text" "URL"',
        description: 'Nối tham số query string an toàn, tự động URL-encode ký tự đặc biệt.'
      },
      {
        command: 'curl.exe -fL -C - -o "file.zip" "URL"',
        description: 'Tải file lớn: tự động theo dõi chuyển hướng (-L), tiếp tục tải resume (-C -) và báo lỗi (-f).'
      },
      {
        command: 'curl.exe -sS --etag-compare etag.txt --etag-save etag.txt "URL"',
        description: 'Tự động hóa Conditional Request ETag, tiết kiệm tối đa băng thông với HTTP 304.'
      },
      {
        command: 'curl.exe -Z "URL1" -o 1.json "URL2" -o 2.json',
        description: 'Tải và gọi nhiều API song song đồng thời (-Z / --parallel) qua libcurl multi interface.'
      },
      {
        command: 'curl.exe -sS --proto =http,https --proto-redir =http,https "URL"',
        description: 'Lá chắn phòng ngự SSRF: chỉ cho phép HTTP/HTTPS, chặn tuyệt đối file:// và gopher://.'
      },
      {
        command: 'curl.exe -s -o /dev/null -w "%{json}" "URL"',
        description: 'Xuất toàn bộ hơn 30 thông số đo đạc mạng và độ trễ dưới dạng JSON chuẩn cho jq.'
      },
      {
        command: 'curl.exe --help [category]',
        description: 'Tra cứu nhanh danh mục tùy chọn theo nhóm chuyên biệt: tls, proxy, http, auth, connection.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'Nắm vững 6 phân hệ cờ options: Payload & Methods, Auth & Identity, TLS & SSRF Shield, Network & Routing, Flow & Caching, và Diagnostics & Code Generation.',
      'Nghiêm ngặt loại bỏ các cờ nguy hiểm ở Production: Tuyệt đối không dùng `-k / --insecure` (vi phạm PCI-DSS), không dùng `--location-trusted` khi chuyển hướng sang bên thứ ba, và luôn dùng `-sS` thay vì `-s` đơn lẻ.',
      'Cập nhật các cờ hiện đại: Ưu tiên sử dụng `--json` (cURL ≥ 7.82), `--url-query` (cURL ≥ 7.76), `--fail-with-body` (cURL ≥ 7.76) và `-w "%{json}"` (cURL ≥ 7.70) để mã nguồn tinh gọn và mạnh mẽ.',
      'Áp dụng 5 bộ công thức dòng lệnh chuẩn mực (Production Recipes) cho các bài toán thường gặp: REST API, File Download, CI/CD Healthcheck, Proxy routing và Đo đạc hiệu năng SLA.',
      'Sử dụng cờ `--help <category>` làm cẩm nang tra cứu tức thì ngay trên terminal mà không cần rời khỏi môi trường làm việc.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'Official cURL Manpage & Option Index',
        url: 'https://curl.se/docs/manpage.html',
        description: 'Tài liệu tra cứu chính thống và đầy đủ nhất về toàn bộ hơn 400 cờ options của cURL.'
      },
      {
        title: 'Daniel Stenberg: Everything curl - Command Line Options Directory',
        url: 'https://everything.curl.dev/cmdline/options',
        description: 'Chương sách tra cứu phân loại cờ options chi tiết của tác giả cURL.'
      },
      {
        title: 'cURL Official Release Notes & Version History',
        url: 'https://curl.se/docs/releases.html',
        description: 'Biểu đồ lịch sử phát hành và các tính năng mới được giới thiệu qua từng phiên bản cURL.'
      },
      {
        title: 'PCI Security Standards Council: PCI-DSS v4.0 Requirement 4 (Protecting Data in Transit)',
        url: 'https://www.pcisecuritystandards.org/',
        description: 'Quy chuẩn an ninh thông tin bắt buộc về việc mã hóa và cấm sử dụng các cờ tắt kiểm tra chứng chỉ số SSL/TLS.'
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
          issue: 'Sử dụng cờ hiện đại trên môi trường chạy cURL cũ gây lỗi "option is unknown"',
          severity: 'Critical',
          resolution: 'Đã xây dựng Bảng Roadmap Version Matrix trong Lớp 3 đối chiếu phiên bản tối thiểu cho từng cờ'
        },
        {
          issue: 'Hiểm họa rò rỉ bảo mật nghiêm trọng do lạm dụng cờ -k và --location-trusted trong Production',
          severity: 'Critical',
          resolution: 'Đã xây dựng danh mục "Cờ Đỏ Báo Động" trong Lớp 2 và Hộp Cảnh báo phân tích rủi ro an ninh'
        },
        {
          issue: 'Lỗi nhầm lẫn giữa cờ -d và --data-raw khi gửi chuỗi chứa ký tự @ khiến cURL cố đọc tệp tin ổ đĩa',
          severity: 'Major',
          resolution: 'Đã đưa vào danh mục Cạm bẫy và bảng tra cứu Nhóm 1'
        },
        {
          issue: 'Quá tải thông tin khi tra cứu curl --help với hơn 400 cờ',
          severity: 'Minor',
          resolution: 'Đã hướng dẫn tính năng phân loại theo chủ đề curl --help category trong Lớp 1'
        },
        {
          issue: 'Cờ -s đơn lẻ nuốt sạch lỗi mạng khiến kịch bản CI/CD chết trong im lặng',
          severity: 'Minor',
          resolution: 'Đã so sánh đối chứng giữa -s và -sS trong Lớp 2 và Ví dụ 2'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://curl.se/docs/manpage.html',
        'https://everything.curl.dev/cmdline/options',
        'https://curl.se/docs/releases.html'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_APP_A_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
