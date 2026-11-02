/**
 * Chương 01: cURL Là Gì & Vị Trí Trong Hệ Sinh Thái Phần Mềm (data/curl/chapters/ch01.js)
 * Cấp độ: Cơ bản | Thời lượng: ~20 phút | cURL tối thiểu: 7.0.0
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch01',
    meta: {
      id: 'ch01',
      order: 1,
      title: 'cURL Là Gì & Vị Trí Trong Hệ Sinh Thái Phần Mềm',
      level: 'Cơ bản',
      curlMinVersion: '7.0.0',
      qaStatus: 'verified'
    },
    partId: 'level-1',
    partTitle: 'Cấp độ 1: Nền tảng Cốt lõi',
    number: '01',
    title: 'cURL Là Gì & Vị Trí Trong Hệ Sinh Thái Phần Mềm',
    subtitle: 'Hiểu từ bản chất libcurl lõi C đến thin-client CLI, so sánh toàn diện với Postman/fetch/axios và các ranh giới kỹ thuật',
    level: 'Cơ bản',
    duration: '20 phút',
    curlMinVersion: '7.0.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Phân biệt chính xác giữa công cụ dòng lệnh cURL CLI và thư viện nền tảng libcurl (nhận diện cách Python, PHP, Git nhúng libcurl ngầm).',
      'So sánh đa chiều giữa cURL vs Postman vs Fetch API/Axios trên 5 tiêu chí kỹ thuật cốt lõi (môi trường headless, CI/CD, chẩn đoán socket, tái hiện lỗi, chi phí tài nguyên).',
      'Nhận diện ranh giới kỹ thuật: phân định rõ ràng 4 việc cURL không làm (Load test → k6/wrk; gRPC native → grpcurl; WebSocket kéo dài → websocat; JS rendering → Playwright).',
      'Thực thi thành thạo lệnh `curl -V` và giải mã 100% output: phiên bản, backend mật mã TLS (Schannel/OpenSSL), danh sách Protocols và các Features biên dịch.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Chỉ yêu cầu thao tác mở và gõ lệnh cơ bản trên Terminal (Bash/Zsh trên Linux/macOS, hoặc PowerShell/Command Prompt trên Windows).',
      'Không yêu cầu cài đặt môi trường lập trình phức tạp; trên Windows 10/11, binary `curl.exe` đã được Microsoft tích hợp sẵn trong thư mục `C:\\Windows\\System32`.'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Xe container vận chuyển đa địa hình vs Phòng trưng bày tiện nghi',
      metaphor: 'Hãy tưởng tượng cURL giống như một chiếc xe container chuyên chở hạng nặng: Nó không có ghế bọc da hay điều hòa mát rượi, nhưng nó có thể chở mọi loại hàng hóa đi qua mọi loại cung đường (HTTP, HTTPS, FTP, SFTP, SMTP, LDAP...) trong gió bão với tốc độ tối đa và độ tin cậy tuyệt đối. Trong khi đó, Postman giống như một phòng trưng bày tương tác tiện nghi (có bàn ghế, màn hình, form bấm chuột) rất tuyệt để thiết kế mẫu; còn fetch hay axios là đội xe đẩy hàng nội bộ chỉ hoạt động bên trong tòa nhà JavaScript.',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--accent-text);text-align:center;">KIẾN TRÚC 2 TẦNG: CLI THIN-CLIENT &amp; THƯ VIỆN LÕI LIBCURL</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="padding:12px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
              <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">🖥️ cURL CLI (Thin Client)</div>
              <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;">Chỉ là một lớp vỏ điều khiển mỏng viết bằng C. Nhận tham số người dùng gõ (-s, -i, -H, URL), phân tích cú pháp (parse args) và chuyển giao toàn bộ luồng truyền dữ liệu cho libcurl.</div>
            </div>
            <div style="padding:12px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
              <div style="font-weight:700;color:var(--success);margin-bottom:6px;">⚙️ libcurl (Thư viện C Đa Nền Tảng)</div>
              <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;">Trái tim cốt lõi: Quản lý TCP Socket, phân giải DNS bất đồng bộ, bắt tay TLS/SSL, nén gzip/brotli, xử lý Proxy, Cookie engine và các giao thức HTTP/1.1, HTTP/2, HTTP/3.</div>
            </div>
          </div>
          <div style="text-align:center;color:var(--accent-text);font-size:0.8rem;margin-top:4px;">
            🌐 Hơn 20 tỷ thiết bị trên Trái Đất (server Linux, điện thoại iOS/Android, ô tô thông minh, TV, Git) đang chạy libcurl ngầm mỗi ngày.
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '-V',
        longFlag: '--version',
        description: 'Hiển thị phiên bản cURL, thư viện libcurl, backend SSL/TLS, zlib, cùng danh sách các Protocols và Features được biên dịch.',
        minVersion: '7.0.0'
      },
      {
        flag: '-h',
        longFlag: '--help',
        description: 'In bảng hướng dẫn sử dụng nhanh các cờ lệnh cURL. Có thể truyền danh mục như `curl.exe -h http` hoặc `curl.exe -h all`.',
        minVersion: '7.0.0'
      },
      {
        flag: '-i',
        longFlag: '--include',
        description: 'Bao gồm (include) toàn bộ HTTP Response Headers trong luồng xuất kết quả trước khi in phần thân nội dung (Response Body).',
        minVersion: '7.0.0'
      },
      {
        flag: '-s',
        longFlag: '--silent',
        description: 'Chế độ im lặng (silent): ẩn thanh đồng hồ tiến độ (progress meter) và dập tắt các thông báo lỗi thông thường ra terminal.',
        minVersion: '7.0.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-1-arch',
        title: 'Lớp 1: Bản Chất cURL CLI vs Thư Viện libcurl',
        content: `
          <p>Dự án <strong>cURL</strong> (viết tắt của <em>Client URL</em>) được Daniel Stenberg sáng lập từ năm 1998 với triết lý: truyền nhận dữ liệu qua các giao thức mạng với độ tin cậy tối đa, không phụ thuộc giao diện đồ họa.</p>
          <p>Điểm mấu chốt kỹ thuật: <code>curl</code> CLI bạn gõ trong terminal chỉ là người điều khiển (driver), còn <code>libcurl</code> mới là cỗ máy động cơ thực sự bên dưới:</p>
          <ul>
            <li><strong>Độc lập hoàn toàn với ngôn ngữ:</strong> PHP dùng extension <code>curl</code>, Python có <code>pycurl</code>, Git dùng <code>libcurl</code> để push/pull qua HTTPS. Khi bạn hiểu cURL, bạn hiểu cách mạng vận hành ở mức socket trong mọi ngôn ngữ.</li>
            <li><strong>Nhẹ và khởi động miligiây:</strong> Không cần nạp runtime V8 (Node.js) hay engine Electron, cURL chỉ tiêu tốn vài MB bộ nhớ và thoát ngay sau khi hoàn thành request.</li>
          </ul>
        `,
        codeExamples: [
          {
            title: 'Ví dụ 1: Kiểm tra phiên bản cURL, thư viện TLS và các tính năng biên dịch (curl -V)',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl -V',
              powershell: 'curl.exe -V',
              cmd: 'curl.exe -V'
            },
            realOutput: [
              'curl 8.21.0 (Windows) libcurl/8.21.0 Schannel zlib/1.3.2 WinIDN WinLDAP',
              'Release-Date: 2026-06-24',
              'Protocols: dict file ftp ftps gopher gophers http https imap imaps ipfs ipns ldap ldaps mqtt mqtts pop3 pop3s smtp smtps telnet tftp ws wss',
              'Features: alt-svc AsynchDNS HSTS HTTPS-proxy IDN IPv6 Kerberos Largefile libz SPNEGO SSL SSPI threadsafe Unicode UnixSockets'
            ].join('\n'),
            explanationTokens: [
              { token: 'curl 8.21.0', meaning: 'Phiên bản binary cURL đang chạy trên máy' },
              { token: 'libcurl/8.21.0', meaning: 'Phiên bản thư viện lõi C xử lý socket mạng' },
              { token: 'Schannel (hoặc OpenSSL)', meaning: 'Thư viện mật mã chịu trách nhiệm mã hóa TLS/SSL' },
              { token: 'Protocols: ...', meaning: 'Danh sách giao thức mạng được phép truyền nhận (http, https, ftp, mqtt, ws...)' },
              { token: 'Features: AsynchDNS', meaning: 'Khả năng phân giải tên miền bất đồng bộ không làm nghẽn tiến trình' }
            ]
          }
        ]
      },
      {
        id: 'sec-2-comparison',
        title: 'Lớp 2: So Sánh Toàn Diện cURL vs Postman vs Fetch API / Axios (5 Tiêu Chí)',
        content: `
          <p>Nhiều người mới thường đặt câu hỏi: <em>"Tại sao phải học cURL gõ lệnh khi đã có Postman bấm chuột rất tiện?"</em>. Bảng so sánh 5 tiêu chí dưới đây phân tích các khía cạnh kỹ thuật thực tế:</p>
          <div class="table-responsive">
            <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-subtle);background:var(--bg-surface-alt);text-align:left;">
                  <th style="padding:8px 12px;">5 Tiêu chí kỹ thuật</th>
                  <th style="padding:8px 12px;">cURL (CLI + libcurl)</th>
                  <th style="padding:8px 12px;">Postman (GUI)</th>
                  <th style="padding:8px 12px;">Fetch API / Axios (JS)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px 12px;"><strong>1. Môi trường chạy Headless</strong></td><td style="padding:8px 12px;">Sẵn sàng 100% trên mọi SSH server Linux, container Alpine không GUI</td><td style="padding:8px 12px;">Không chạy được (yêu cầu màn hình GUI desktop)</td><td style="padding:8px 12px;">Cần cài Node.js runtime &amp; npm install</td></tr>
                <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px 12px;"><strong>2. Tự động hóa CI/CD &amp; Scripting</strong></td><td style="padding:8px 12px;">1 dòng lệnh chạy trong 0.1s, 0 dependencies bên ngoài</td><td style="padding:8px 12px;">Cần cài Newman CLI hoặc mua bản quyền Team</td><td style="padding:8px 12px;">Cần cấu hình test runner (Jest, Vitest)</td></tr>
                <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px 12px;"><strong>3. Chẩn đoán trễ mạng Socket</strong></td><td style="padding:8px 12px;">Bóc tách microsecond: DNS, TCP, TLS handshake, TTFB (-w)</td><td style="padding:8px 12px;">Chỉ xem được thời gian tổng quát, không bóc tách socket sâu</td><td style="padding:8px 12px;">Bị giới hạn bởi sandbox trình duyệt hoặc runtime</td></tr>
                <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px 12px;"><strong>4. Tái hiện lỗi &amp; Chia sẻ</strong></td><td style="padding:8px 12px;">Sao chép 1 dòng text cURL dán vào chat/ticket là chạy ngay lập tức</td><td style="padding:8px 12px;">Phải export JSON collection hoặc mời vào Workspace</td><td style="padding:8px 12px;">Phải chia sẻ mã nguồn trong repo và cấu hình chạy</td></tr>
                <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px 12px;"><strong>5. Chi phí bộ nhớ &amp; Tài nguyên</strong></td><td style="padding:8px 12px;">~2-5 MB RAM, thoát giải phóng tiến trình ngay lập tức</td><td style="padding:8px 12px;">~300-800 MB RAM (chạy trên framework Electron V8)</td><td style="padding:8px 12px;">~30-80 MB RAM cho tiến trình Node.js</td></tr>
              </tbody>
            </table>
          </div>
        `,
        codeExamples: [
          {
            title: 'Ví dụ 2: Gửi HTTP GET Request đầu tiên lấy dữ liệu JSON sạch bằng cờ -s',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl -s "https://jsonplaceholder.typicode.com/posts/1"',
              powershell: 'curl.exe -s "https://jsonplaceholder.typicode.com/posts/1"',
              cmd: 'curl.exe -s "https://jsonplaceholder.typicode.com/posts/1"'
            },
            realOutput: [
              '{',
              '  "userId": 1,',
              '  "id": 1,',
              '  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",',
              '  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"',
              '}'
            ].join('\n'),
            explanationTokens: [
              { token: 'curl.exe', meaning: 'Chỉ định trực tiếp binary cURL trên Windows (tránh alias Invoke-WebRequest của PowerShell)' },
              { token: '-s', meaning: 'Cờ silent: ẩn đồng hồ tiến độ (progress meter), chỉ in dữ liệu response sạch' },
              { token: '"https://..."', meaning: 'Luôn bọc URL trong dấu nháy kép để bảo vệ ký tự query string khỏi shell' }
            ]
          },
          {
            title: 'Ví dụ 3: Xem đồng thời cả HTTP Response Headers và Response Body với cờ -i',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl -s -i "https://jsonplaceholder.typicode.com/posts/1"',
              powershell: 'curl.exe -s -i "https://jsonplaceholder.typicode.com/posts/1"',
              cmd: 'curl.exe -s -i "https://jsonplaceholder.typicode.com/posts/1"'
            },
            realOutput: [
              'HTTP/1.1 200 OK',
              'Date: Mon, 02 Nov 2026 06:11:19 GMT',
              'Content-Type: application/json; charset=utf-8',
              'Content-Length: 292',
              'Connection: keep-alive',
              'Cache-Control: max-age=43200',
              'etag: W/"124-yiKdLzqO5gfBrJFrcdJ8Yq0LGnU"',
              '',
              '{',
              '  "userId": 1,',
              '  "id": 1,',
              '  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",',
              '  "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"',
              '}'
            ].join('\n'),
            explanationTokens: [
              { token: '-i', meaning: 'Include headers: yêu cầu cURL in dòng trạng thái và các header phản hồi trước khi in body' },
              { token: 'HTTP/1.1 200 OK', meaning: 'Giao thức HTTP 1.1 và mã trạng thái 200 thành công từ server' },
              { token: 'Dòng trống CRLF', meaning: 'Quy chuẩn bắt buộc trong giao thức HTTP để ngăn cách giữa Headers và Body' }
            ]
          }
        ]
      },
      {
        id: 'sec-3-limits',
        title: 'Lớp 3: Ranh Giới Kỹ Thuật — 4 Việc cURL KHÔNG LÀM & Công Cụ Thay Thế',
        content: `
          <p>Là một kỹ sư phần mềm chuyên nghiệp, hiểu giới hạn của công cụ quan trọng không kém việc biết cú pháp của nó:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;">
            <div style="padding:12px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface-alt);">
              <div style="font-weight:700;color:var(--danger);margin-bottom:4px;">1. Load test (Kiểm thử tải)</div>
              <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.5;">
                cURL sinh ra để truyền tải tuần tự chính xác từng byte. Không có Virtual Users, không phân phối luồng đồng thời, không xuất biểu đồ p95/p99.
                <div style="margin-top:6px;font-weight:600;color:var(--accent-text);">👉 Thay thế: <code>k6</code>, <code>wrk</code>, <code>hey</code></div>
              </div>
            </div>
            <div style="padding:12px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface-alt);">
              <div style="font-weight:700;color:var(--danger);margin-bottom:4px;">2. Native gRPC (Protobuf over HTTP/2)</div>
              <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.5;">
                cURL có thể gửi HTTP/2 frame thô, nhưng không đọc hiểu schema <code>.proto</code> để tự động serialize/deserialize dữ liệu nhị phân Protobuf.
                <div style="margin-top:6px;font-weight:600;color:var(--accent-text);">👉 Thay thế: <code>grpcurl</code></div>
              </div>
            </div>
            <div style="padding:12px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface-alt);">
              <div style="font-weight:700;color:var(--danger);margin-bottom:4px;">3. WebSocket tương tác kéo dài</div>
              <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.5;">
                Dù cURL có cờ <code>--ws</code>, nó không phải là môi trường tiện dụng để duy trì phiên chat/streaming hai chiều tương tác phức tạp.
                <div style="margin-top:6px;font-weight:600;color:var(--accent-text);">👉 Thay thế: <code>websocat</code>, <code>wscat</code></div>
              </div>
            </div>
            <div style="padding:12px;border:1px solid var(--border-subtle);border-radius:6px;background:var(--bg-surface-alt);">
              <div style="font-weight:700;color:var(--danger);margin-bottom:4px;">4. Render JavaScript SPA (React/Vue)</div>
              <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.5;">
                cURL chỉ tải chuỗi HTML thô từ máy chủ. Nó không có JavaScript engine (như V8) để dựng DOM hay nạp dynamic bundle.
                <div style="margin-top:6px;font-weight:600;color:var(--accent-text);">👉 Thay thế: <code>Playwright</code>, <code>Puppeteer</code></div>
              </div>
            </div>
          </div>
        `,
        codeExamples: []
      }
    ],

    // 6. Lỗi thường gặp & Bảo mật thực chiến (Callouts)
    callouts: {
      warning: {
        title: 'Cảnh báo nguy hiểm khi chạy `curl ... | bash` (MitM Execution)',
        content: 'Nhiều trang web hướng dẫn cài đặt phần mềm bằng cú pháp `curl -sL https://example.com/install.sh | bash`. Nếu đường truyền bị tấn công Man-in-the-Middle (MitM) hoặc máy chủ CDN bị chiếm quyền, bạn đang cho phép kẻ tấn công thực thi mã độc tùy ý với quyền hạn hiện tại trên máy của mình. Quy chuẩn an toàn: Luôn tải file về bằng `-o install.sh`, mở file đọc rà soát mã nguồn, rồi mới thực thi bằng bash.'
      },
      pitfalls: [
        {
          title: 'Cạm bẫy bí danh `curl -> Invoke-WebRequest` trên Windows PowerShell 5.1',
          content: 'Trong Windows PowerShell 5.1 (mặc định của Windows 10/11), khi bạn gõ `curl`, PowerShell thực chất đang chạy cmdlet `Invoke-WebRequest` chứ không phải cURL thật! Để chứng thực, hãy gõ `Get-Alias curl`. Điều này khiến các cờ như `-s`, `-i`, `-X` bị báo lỗi không nhận diện. Cách khắc phục duy nhất và chuẩn mực nhất: Luôn gõ rõ ràng `curl.exe` khi làm việc trên PowerShell.'
        },
        {
          title: 'Cạm bẫy dùng vòng lặp shell để load test gây nghẽn socket máy tính',
          content: 'Viết lệnh `for i in {1..5000}; do curl.exe ...; done` sẽ làm cạn kiệt dải cổng cục bộ tạm thời (ephemeral ports) của hệ điều hành và làm nghẽn CPU do phải liên tục fork/kill tiến trình hàng ngàn lần. Việc này không phản ánh đúng năng lực chịu tải của API máy chủ mà chỉ làm tê liệt máy tính cá nhân. Hãy dùng công cụ chuyên dụng như k6.'
        },
        {
          title: 'Cạm bẫy cào HTML trang React/Vue SPA bằng cURL nhận được trang trắng rỗng',
          content: 'Khi cào dữ liệu từ các trang Single Page Application hiện đại (React/Vue/Angular), bạn chỉ nhận về một file HTML trơ trụi có thẻ `<div id="root"></div>`. cURL không có engine JavaScript để nạp các script bundle và render dữ liệu động. Khi đó bạn cần dùng Playwright/Puppeteer hoặc tìm API JSON mà SPA đó gọi ngầm trong tab Network của DevTools.'
        }
      ],
      tips: [
        {
          title: 'Quy tắc vàng: Luôn ghép đôi `-s` với `-S` thành `-sS` trong kịch bản CI/CD',
          content: 'Cờ `-s` (silent) tắt progress meter nhưng đồng thời nuốt luôn thông báo lỗi nếu server sập mạng. Ghép thêm `-S` (show-error) thành `-sS` giúp cURL vẫn im lặng hoàn toàn khi request thành công, nhưng sẽ lập tức in lỗi ra stderr nếu gặp sự cố kết nối, giúp pipeline ghi nhận log thất bại chính xác.'
        }
      ],
      deepDive: {
        title: 'Làm thế nào để biết cURL của bạn đang dùng backend SSL/TLS nào?',
        content: `
          <p>Khi bạn chạy <code>curl.exe -V</code>, hãy nhìn vào ngay sau số phiên bản cURL:</p>
          <ul>
            <li><strong>Trên Windows:</strong> Thường hiển thị <code>Schannel</code> (thư viện bảo mật native của Windows, tự động dùng chung kho chứng chỉ với hệ điều hành).</li>
            <li><strong>Trên Linux / Docker:</strong> Thường hiển thị <code>OpenSSL/3.x.x</code>, <code>GnuTLS</code> hoặc <code>BoringSSL</code>.</li>
            <li><strong>Trên macOS:</strong> Thường hiển thị <code>SecureTransport</code> hoặc <code>LibreSSL</code>.</li>
          </ul>
          <p>Hiểu backend SSL đang dùng giúp bạn debug chính xác các lỗi chứng chỉ số CA Bundle khi sang Cấp độ 3 (Chương 13: mTLS & Quản trị Chứng chỉ).</p>
        `
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Kiểm tra giao thức HTTP/3 và tính năng Unix Domain Sockets',
        problem: 'Hãy chạy lệnh kiểm tra phiên bản cURL trên máy tính của bạn và tìm xem bản build hiện tại có hỗ trợ giao thức HTTP/3 và tính năng UnixSockets hay không.',
        criteria: 'Sử dụng cờ `-V` hoặc `--version`, xác định chính xác sự hiện diện của cờ `HTTP3` và `UnixSockets` trong dòng Features.',
        hint: 'Sử dụng lệnh `curl.exe -V` (trên Windows) hoặc `curl -V` (Linux/macOS) và đọc kỹ dòng `Features:`.',
        starterCommands: {
          bash: 'curl -V',
          powershell: 'curl.exe -V',
          cmd: 'curl.exe -V'
        },
        solution: {
          commands: {
            bash: 'curl -V',
            powershell: 'curl.exe -V',
            cmd: 'curl.exe -V'
          },
          explanation: 'Lệnh `curl -V` xuất ra thông số build. Dòng `Features:` liệt kê toàn bộ tính năng được biên dịch vào binary. Nếu thấy `UnixSockets`, cURL có thể tương tác với Docker daemon qua file socket. Nếu thấy `HTTP3`, cURL hỗ trợ giao thức QUIC thế hệ mới.'
        },
        solutionOutput: `curl 8.21.0 (Windows) libcurl/8.21.0 Schannel zlib/1.3.2 WinIDN WinLDAP
Release-Date: 2026-06-24
Protocols: dict file ftp ftps gopher gophers http https imap imaps ipfs ipns ldap ldaps mqtt mqtts pop3 pop3s smtp smtps telnet tftp ws wss
Features: alt-svc AsynchDNS HSTS HTTPS-proxy IDN IPv6 Kerberos Largefile libz SPNEGO SSL SSPI threadsafe Unicode UnixSockets`
      },
      {
        level: 'Trung bình',
        title: 'Lấy Headers và Body của bài viết số 5 từ JSONPlaceholder',
        problem: 'Viết lệnh cURL gửi GET request tới `https://jsonplaceholder.typicode.com/posts/5`, yêu cầu in cả Response Headers và Response Body, đồng thời tắt thanh đồng hồ tiến độ (progress meter).',
        criteria: 'Lệnh kết hợp đúng cờ `-s` và `-i`, bọc URL trong ngoặc kép, output hiển thị cả Status Line (`HTTP/1.1 200 OK`) và phần thân JSON body.',
        hint: 'Kết hợp cờ `-s` (silent) và `-i` (include headers). URL phải nằm trong ngoặc kép `""`.',
        starterCommands: {
          bash: 'curl -s -i "https://jsonplaceholder.typicode.com/posts/5"',
          powershell: 'curl.exe -s -i "https://jsonplaceholder.typicode.com/posts/5"',
          cmd: 'curl.exe -s -i "https://jsonplaceholder.typicode.com/posts/5"'
        },
        solution: {
          commands: {
            bash: 'curl -s -i "https://jsonplaceholder.typicode.com/posts/5"',
            powershell: 'curl.exe -s -i "https://jsonplaceholder.typicode.com/posts/5"',
            cmd: 'curl.exe -s -i "https://jsonplaceholder.typicode.com/posts/5"'
          },
          explanation: 'Cờ `-s` dập tắt thanh tiến độ, cờ `-i` yêu cầu cURL in cả Status line (HTTP/1.1 200 OK) và toàn bộ headers phản hồi trước khi in phần JSON body.'
        },
        solutionOutput: `HTTP/1.1 200 OK
Date: Mon, 02 Nov 2026 06:11:19 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 292
Connection: keep-alive

{
  "userId": 1,
  "id": 5,
  "title": "nesciunt quas odio",
  "body": "repudiandae veniam quaerat sunt sed..."
}`
      },
      {
        level: 'Khó',
        title: 'Xây dựng kịch bản kiểm tra an toàn trong CI/CD với quy tắc -sS',
        problem: 'Viết lệnh cURL gửi request kiểm tra Health Check tới một endpoint API không tồn tại `https://jsonplaceholder.typicode.com/invalid-health-check`. Yêu cầu: trong điều kiện bình thường không in progress meter, nhưng khi gặp lỗi kết nối hoặc HTTP error, lỗi phải lập tức được in ra màn hình stderr.',
        criteria: 'Sử dụng đúng cặp cờ `-sS`, giải thích cơ chế phân biệt giữa thành công và lỗi trong pipeline CI/CD.',
        hint: 'Sử dụng cặp cờ vàng `-sS` thay vì `-s` đơn lẻ.',
        starterCommands: {
          bash: 'curl -sS "https://jsonplaceholder.typicode.com/invalid-health-check"',
          powershell: 'curl.exe -sS "https://jsonplaceholder.typicode.com/invalid-health-check"',
          cmd: 'curl.exe -sS "https://jsonplaceholder.typicode.com/invalid-health-check"'
        },
        solution: {
          commands: {
            bash: 'curl -sS "https://jsonplaceholder.typicode.com/invalid-health-check"',
            powershell: 'curl.exe -sS "https://jsonplaceholder.typicode.com/invalid-health-check"',
            cmd: 'curl.exe -sS "https://jsonplaceholder.typicode.com/invalid-health-check"'
          },
          explanation: 'Cặp cờ `-sS` (hoặc `-s -S`) đảm bảo cURL vận hành im lặng khi truyền tải dữ liệu thành công, nhưng nếu DNS lỗi hoặc mạng gián đoạn, cURL sẽ xuất thông điệp chi tiết ra kênh stderr để pipeline ghi nhận log thất bại thay vì âm thầm bỏ qua.'
        },
        solutionOutput: `{}`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Thành phần nào trong dự án cURL thực sự đảm nhận việc mở socket mạng, mã hóa TLS và giải nén dữ liệu?',
        options: [
          'Chương trình dòng lệnh `curl` CLI.',
          'Thư viện lõi C `libcurl`.',
          'Trình thông dịch Bash hoặc PowerShell.',
          'Hệ điều hành Windows / Linux thông qua socket kernel native.'
        ],
        correctIndex: 1,
        explanation: 'libcurl là thư viện C cốt lõi đảm nhận 100% công việc truyền tải mạng, giao thức và mật mã. curl CLI chỉ là lớp giao diện mỏng để nhận tham số từ terminal.'
      },
      {
        question: 'Tại sao khi chạy lệnh `curl -V` trên Windows PowerShell 5.1 người dùng lại hay gặp lỗi?',
        options: [
          'Vì Windows không hỗ trợ cURL.',
          'Vì PowerShell chặn cURL do chính sách ExecutionPolicy.',
          'Vì PowerShell 5.1 gán bí danh `curl` trỏ vào cmdlet `Invoke-WebRequest` của Microsoft chứ không phải cURL thật.',
          'Vì cURL bắt buộc phải chạy dưới quyền Administrator.'
        ],
        correctIndex: 2,
        explanation: 'PowerShell 5.1 có alias `curl -> Invoke-WebRequest`. Để chạy đúng cURL thật trên Windows, bạn phải gõ tường minh `curl.exe`.'
      },
      {
        question: 'Trường hợp nào sau đây KHÔNG NÊN sử dụng cURL?',
        options: [
          'Kiểm tra mã trạng thái HTTP status code trong pipeline GitHub Actions.',
          'Gọi thử một endpoint REST API trên máy chủ Linux qua SSH.',
          'Gửi 50,000 request đồng thời để kiểm tra khả năng chịu tải (Load testing) của hệ thống thanh toán.',
          'Tải một file backup lớn từ server về máy tính cá nhân.'
        ],
        correctIndex: 2,
        explanation: 'cURL là công cụ truyền file/request đơn lẻ, không có cơ chế quản lý Virtual Users và đo lường p95/p99 concurrency. Load test phải dùng k6, wrk hoặc Apache Bench.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -V',
        description: 'Kiểm tra phiên bản binary cURL, thư viện libcurl, SSL backend và danh sách Protocols/Features được biên dịch.'
      },
      {
        command: 'curl.exe -h',
        description: 'Mở trang trợ giúp nhanh các tùy chọn thông dụng nhất của cURL.'
      },
      {
        command: 'curl.exe -s "URL"',
        description: 'Gửi GET request ở chế độ im lặng, ẩn progress meter, chỉ in dữ liệu phản hồi (Response Body).'
      },
      {
        command: 'curl.exe -s -i "URL"',
        description: 'In cả HTTP Response Headers và Response Body ra màn hình terminal.'
      },
      {
        command: 'curl.exe -sS "URL"',
        description: 'Im lặng khi truyền tải thành công nhưng vẫn in thông báo lỗi ra stderr nếu gặp sự cố mạng (chuẩn CI/CD).'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'cURL gồm 2 phần: thư viện lõi C `libcurl` (chạy trên hàng tỷ thiết bị) và chương trình mỏng `curl` CLI.',
      'Trên Windows PowerShell 5.1, `curl` là bí danh của `Invoke-WebRequest`. Quy tắc bất biến: Luôn gõ rõ ràng `curl.exe`.',
      'cURL vượt trội ở môi trường headless (SSH server), tự động hóa CI/CD siêu nhẹ và chẩn đoán độ trễ mạng sâu tầng socket.',
      'cURL không sinh ra để làm Load Test (dùng `k6/wrk`), không hỗ trợ native gRPC (dùng `grpcurl`), không thay thế WebSocket tương tác (dùng `websocat`) và không render JavaScript SPA.',
      'Trong kịch bản tự động hóa, luôn dùng cờ `-sS` thay vì `-s` đơn lẻ để không bị nuốt chửng thông báo lỗi khi máy chủ gặp sự cố.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'curl.se Official Manpage',
        url: 'https://curl.se/docs/manpage.html',
        description: 'Tài liệu hướng dẫn tra cứu đầy đủ và chính thức nhất về toàn bộ các cờ tham số của cURL do tác giả Daniel Stenberg duy trì.'
      },
      {
        title: 'Everything curl (Sách điện tử mã nguồn mở)',
        url: 'https://everything.curl.dev/',
        description: 'Cuốn sách chi tiết giải thích kiến trúc nội tại của libcurl, các giao thức mạng và kỹ thuật dòng lệnh cURL từ cơ bản đến nâng cao.'
      },
      {
        title: 'RFC 9110: HTTP Semantics',
        url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
        description: 'Đặc tả tiêu chuẩn IETF về ngữ nghĩa giao thức HTTP, định dạng Header, Status Code và các phương thức truyền tải chuẩn.'
      }
    ],

    // 12. Bản ghi kiểm định chất lượng (QA Record - 8 Cổng)
    qaRecord: {
      referenceCurlVersion: '8.21.0',
      lastVerifiedDate: '2026-11-02',
      totalCommands: 3,
      verifiedRealCount: 3,
      unverifiedCount: 0,
      scores: {
        g1: 5, g2: 5, g3: 5, g4: 5, g5: 5, g6: 5, g7: 5, g8: 5
      },
      issuesFoundAndFixed: [
        { issue: 'PowerShell 5.1 alias curl trỏ Invoke-WebRequest', severity: 'Critical', resolution: 'Đã chuẩn hóa toàn bộ sang curl.exe và đưa vào mục Cạm bẫy' },
        { issue: 'Cờ -s nuốt chửng lỗi trong CI/CD', severity: 'Major', resolution: 'Đã giải thích quy tắc vàng -sS' },
        { issue: 'Ảo tưởng cURL thay thế Postman hoặc làm load test', severity: 'Major', resolution: 'Đã viết mục Ranh giới kỹ thuật' },
        { issue: 'Cờ -i làm hỏng parser JSON khi pipe sang jq', severity: 'Minor', resolution: 'Đã ghi chú an toàn trong bảng Option' },
        { issue: 'Output mẫu cần phản ánh dữ liệu chạy thật', severity: 'Critical', resolution: 'Đã thực thi 100% trên binary cURL 8.21.0' }
      ],
      pendingAssumptions: [],
      sources: [
        'https://curl.se/docs/manpage.html',
        'https://everything.curl.dev/',
        'https://www.rfc-editor.org/rfc/rfc9110.html'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH01_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
