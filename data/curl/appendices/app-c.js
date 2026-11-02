/**
 * Phụ Lục C: Bảng Mã Thoát cURL (Exit Codes 1-99) & Cách Bắt Lỗi Trong Script (data/curl/appendices/app-c.js)
 * Cấp độ: Tra cứu | Thời lượng: ~20 phút | cURL tối thiểu: 7.0.0
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'app-c',
    order: 23,
    levelId: 'level-appendix',
    meta: {
      id: 'app-c',
      order: 23,
      title: 'Bảng Mã Thoát cURL (Exit Codes 1-99) & Cách Bắt Lỗi Trong Script',
      level: 'Tra cứu',
      curlMinVersion: '7.0.0',
      qaStatus: 'verified'
    },
    partId: 'level-appendix',
    partTitle: 'Phụ Lục Tra Cứu & Cẩm Nang Thực Chiến',
    number: 'Phụ lục C',
    title: 'Bảng Mã Thoát cURL (Exit Codes 1-99) & Cách Bắt Lỗi Trong Script',
    shortTitle: 'Bảng cURL Exit Codes',
    subtitle: 'Giải mã toàn bộ các mã lỗi trả về của tiến trình curl.exe từ 0 đến 99, kỹ thuật bắt biến mã thoát đa shell ($? vs $LASTEXITCODE), và mẫu switch-case xử lý lỗi chuẩn mực trong CI/CD Production',
    level: 'Tra cứu',
    duration: '20 phút',
    durationMinutes: 20,
    curlMinVersion: '7.0.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Nắm vững danh mục toàn bộ các mã thoát lỗi (Exit Codes từ 0 đến 99) thường gặp nhất của cURL CLI và tương ứng với enum `CURLcode` trong thư viện `libcurl`.',
      'Phân biệt rõ ràng các họ lỗi mạng: Lỗi phân giải tên miền (Exit 5, 6), Lỗi kết nối TCP/Firewall (Exit 7), Lỗi quá hạn thời gian Timeout (Exit 28), Lỗi bảo mật SSL/TLS (Exit 35, 60, 77), và Lỗi nghiệp vụ HTTP (Exit 22).',
      'Thành thạo kỹ thuật bắt biến mã thoát đa nền tảng: `$?` trong Bash, `$LASTEXITCODE` trong PowerShell, và `%ERRORLEVEL%` trong Windows Command Prompt.',
      'Xây dựng cấu trúc `switch-case` hoàn chỉnh trong kịch bản shell để tự động phân loại lỗi, kích hoạt chiến lược thử lại (Retry with Backoff) hoặc báo động khẩn cấp tới đội ngũ SRE.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Hiểu rõ khái niệm mã thoát tiến trình (Process Exit Code / Return Code) trong hệ điều hành.',
      'Đã hoàn thành Chương 11 (Xử Lý Lỗi & Diagnostics), Chương 16 (Retry Tự Động) và Phụ Lục B (Mã Trạng Thái HTTP).'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Hộp đen máy bay cURL và chiếc máy giải mã điện tín Exit Code',
      metaphor: 'Hãy tưởng tượng mỗi lần bạn cử một điệp viên (cURL) ra chiến trường (Internet), anh ta luôn trở về kèm theo một chiếc thẻ bài đánh số (Exit Code):\n\n* Thẻ bài số 0 (Chiến thắng hoàn tất): Điệp viên đã hoàn thành nhiệm vụ và trở về an toàn.\n\n* Thẻ bài số 6 (Lạc đường trong sương mù DNS): Điệp viên không tìm thấy địa chỉ nhà của mục tiêu (DNS Server không phân giải được hostname).\n\n* Thẻ bài số 7 (Bị cổng sắt chặn đứng): Điệp viên tìm được đến nhà nhưng cửa đóng then cài hoặc lính gác firewall đuổi về (Connection Refused).\n\n* Thẻ bài số 28 (Đồng hồ cát hết cát): Điệp viên đứng chờ ngoài cửa quá lâu mà không thấy ai mở (Timeout quá hạn).\n\n* Thẻ bài số 60 (Giấy thông hành giả mạo): Điệp viên phát hiện con dấu của đối phương có dấu hiệu làm giả (Chứng chỉ số SSL/TLS không hợp lệ).\n\n* Thẻ bài số 22 (Đối phương từ chối tiếp đón): Điệp viên vào được nhà nhưng bị chủ nhà đuổi ra với cớ "Hết phòng" (HTTP 404/500 khi bật --fail-with-body).\n\nViết kịch bản tự động hóa chính là việc bạn trang bị cho sở chỉ huy chiếc máy giải mã: Thay vì hoảng loạn khi thấy thất bại chung chung, sở chỉ huy lập tức đọc thẻ số và đưa ra đối sách chuẩn xác: Thẻ 6 thì kiểm tra DNS 8.8.8.8, Thẻ 7 thì kiểm tra service port, Thẻ 28 thì thử lại sau 5 giây!',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:14px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">6 HỌ MÃ THOÁT CỐT LÕI CỦA TIẾN TRÌNH cURL</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;">Exit 0: Thành Công</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Tên: <code>CURLE_OK</code><br/>
                Ý nghĩa: Truyền tải mạng trọn vẹn.<br/>
                Hành động: Tiếp tục pipeline.
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#eab308;font-weight:700;">Exit 6: Lỗi DNS</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Tên: <code>COULDNT_RESOLVE_HOST</code><br/>
                Ý nghĩa: Không phân giải được hostname.<br/>
                Hành động: Kiểm tra DNS / Resolve.
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#f97316;font-weight:700;">Exit 7: Lỗi Kết Nối</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Tên: <code>COULDNT_CONNECT</code><br/>
                Ý nghĩa: Port đóng, Firewall chặn.<br/>
                Hành động: Kiểm tra service, Retry.
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#ef4444;font-weight:700;">Exit 22: Lỗi HTTP</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Tên: <code>HTTP_RETURNED_ERROR</code><br/>
                Ý nghĩa: HTTP status &ge; 400 (-f).<br/>
                Hành động: Đọc body JSON lỗi.
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#a855f7;font-weight:700;">Exit 28: Timeout</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Tên: <code>OPERATION_TIMEDOUT</code><br/>
                Ý nghĩa: Chạm giới hạn --max-time.<br/>
                Hành động: Tăng timeout hoặc Retry.
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#ec4899;font-weight:700;">Exit 60: Lỗi SSL</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Tên: <code>PEER_FAILED_VERIFICATION</code><br/>
                Ý nghĩa: Chứng chỉ số không tin cậy.<br/>
                Hành động: Thêm --cacert, CẤM retry.
              </div>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '--fail-with-body',
        longFlag: '--fail-with-body',
        description: 'Ép cURL thoát với mã lỗi Exit 22 khi gặp HTTP ≥ 400 nhưng bảo toàn Body ra stdout (cURL ≥ 7.76.0).',
        minVersion: '7.76.0'
      },
      {
        flag: '-f',
        longFlag: '--fail',
        description: 'Ép cURL thoát với mã lỗi Exit 22 khi gặp HTTP ≥ 400 và xóa sạch toàn bộ Message Body.',
        minVersion: '7.0.0'
      },
      {
        flag: '--connect-timeout',
        longFlag: '--connect-timeout <seconds>',
        description: 'Giới hạn thời gian kết nối TCP/TLS; nếu vượt quá sẽ kích hoạt mã thoát lỗi Exit 28.',
        minVersion: '7.7.0'
      },
      {
        flag: '-m',
        longFlag: '--max-time <seconds>',
        description: 'Giới hạn tổng thời gian thực thi; nếu vượt quá sẽ kích hoạt mã thoát lỗi Exit 28.',
        minVersion: '7.0.0'
      },
      {
        flag: '--proto',
        longFlag: '--proto <protocols>',
        description: 'Giới hạn danh sách giao thức mạng; nếu vi phạm sẽ kích hoạt mã thoát lỗi Exit 1.',
        minVersion: '7.19.4'
      },
      {
        flag: '--max-redirs',
        longFlag: '--max-redirs <num>',
        description: 'Giới hạn số lần chuyển hướng tối đa; nếu vượt quá sẽ kích hoạt mã thoát lỗi Exit 47.',
        minVersion: '7.5.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Bảng Tra Cứu Toàn Diện Các Mã Thoát cURL Thường Gặp Nhất (0 Đến 99)',
        content: `
          <p>Mỗi khi cURL hoàn tất một tác vụ (dù thành công hay thất bại), nó luôn trả về một số nguyên cho hệ điều hành, được gọi là <strong>Exit Code</strong> (hoặc Process Return Code). Dưới đây là bảng ma trận toàn diện các mã bạn sẽ đối mặt trong thực tế:</p>

          <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:0.85rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:8px;">Exit Code</th>
                <th style="padding:8px;">Hằng Số libcurl</th>
                <th style="padding:8px;">Ý Nghĩa Chi Tiết</th>
                <th style="padding:8px;">Hành Động Khắc Phục (Action)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#10b981;">0</td><td style="padding:8px;"><code>CURLE_OK</code></td><td style="padding:8px;">Thành công tuyệt đối, mọi byte dữ liệu đã được truyền tải hoàn tất.</td><td style="padding:8px;">Tiếp tục thực thi các bước tiếp theo của script.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#ef4444;">1</td><td style="padding:8px;"><code>CURLE_UNSUPPORTED_PROTOCOL</code></td><td style="padding:8px;">Giao thức không được hỗ trợ (hoặc bị cờ <code>--proto</code> chặn đứng).</td><td style="padding:8px;">Kiểm tra URL prefix hoặc thêm giao thức vào <code>--proto</code>.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#ef4444;">3</td><td style="padding:8px;"><code>CURLE_URL_MALFORMAT</code></td><td style="padding:8px;">Cú pháp URL sai định dạng nghiêm trọng (thiếu scheme, dính khoảng trắng).</td><td style="padding:8px;">Bọc nháy kép URL hoặc dùng <code>--url-query</code>.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#eab308;">6</td><td style="padding:8px;"><code>CURLE_COULDNT_RESOLVE_HOST</code></td><td style="padding:8px;">Không thể phân giải tên miền (DNS lookup failed). Hostname không tồn tại.</td><td style="padding:8px;">Kiểm tra DNS server, kết nối Internet hoặc dùng <code>--resolve</code>.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#f97316;">7</td><td style="padding:8px;"><code>CURLE_COULDNT_CONNECT</code></td><td style="padding:8px;">Không kết nối được tới host/port (Connection refused, server chưa bật, firewall chặn).</td><td style="padding:8px;">Kiểm tra dịch vụ backend đã khởi động chưa, dùng <code>--retry</code>.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#eab308;">18</td><td style="padding:8px;"><code>CURLE_PARTIAL_FILE</code></td><td style="padding:8px;">Đứt kết nối giữa chừng, số byte nhận về ít hơn Content-Length.</td><td style="padding:8px;">Tải lại với cờ resume <code>-C -</code>.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#ef4444;">22</td><td style="padding:8px;"><code>CURLE_HTTP_RETURNED_ERROR</code></td><td style="padding:8px;">Server trả về mã HTTP &ge; 400 (chỉ kích hoạt khi có <code>-f</code> hoặc <code>--fail-with-body</code>).</td><td style="padding:8px;">Đọc nội dung JSON body để xử lý mã lỗi ứng dụng.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#ef4444;">23</td><td style="padding:8px;"><code>CURLE_WRITE_ERROR</code></td><td style="padding:8px;">Lỗi ghi dữ liệu ra ổ đĩa cục bộ (hết dung lượng ổ đĩa hoặc pipe bị ngắt).</td><td style="padding:8px;">Kiểm tra dung lượng ổ đĩa hoặc quyền ghi thư mục.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#a855f7;">28</td><td style="padding:8px;"><code>CURLE_OPERATION_TIMEDOUT</code></td><td style="padding:8px;">Quá hạn thời gian tối đa (chạm <code>--connect-timeout</code> hoặc <code>--max-time</code>).</td><td style="padding:8px;">Kiểm tra độ trễ mạng hoặc tăng ngưỡng timeout.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#ec4899;">35</td><td style="padding:8px;"><code>CURLE_SSL_CONNECT_ERROR</code></td><td style="padding:8px;">Lỗi bắt tay SSL/TLS (không thương lượng được phiên bản cipher hoặc protocol).</td><td style="padding:8px;">Kiểm tra <code>--tls-max</code> hoặc cập nhật cURL lên bản mới.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#eab308;">47</td><td style="padding:8px;"><code>CURLE_TOO_MANY_REDIRECTS</code></td><td style="padding:8px;">Vòng lặp chuyển hướng vô tận (vượt quá ngưỡng <code>--max-redirs</code>).</td><td style="padding:8px;">Kiểm tra cấu hình Nginx/Cloudflare redirect loop.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#f97316;">52</td><td style="padding:8px;"><code>CURLE_GOT_NOTHING</code></td><td style="padding:8px;">Server đóng kết nối socket đột ngột mà không gửi lại bất kỳ byte nào.</td><td style="padding:8px;">Backend bị crash (Segfault, OOM Killer) ngay khi nhận request.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#ec4899;">60</td><td style="padding:8px;"><code>CURLE_PEER_FAILED_VERIFICATION</code></td><td style="padding:8px;">Chứng chỉ SSL/TLS không hợp lệ (hết hạn, self-signed, thiếu CA root bundle).</td><td style="padding:8px;">Cài đặt <code>ca-certificates</code> hoặc chỉ định <code>--cacert</code>.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;font-weight:700;color:#ec4899;">77</td><td style="padding:8px;"><code>CURLE_SSL_CACERT_BADFILE</code></td><td style="padding:8px;">File chứng chỉ CA bundle chỉ định không đọc được hoặc đường dẫn sai.</td><td style="padding:8px;">Kiểm tra đường dẫn file <code>--cacert</code> có tồn tại không.</td></tr>
              <tr><td style="padding:8px;font-weight:700;color:#a855f7;">92</td><td style="padding:8px;"><code>CURLE_HTTP2_STREAM</code></td><td style="padding:8px;">Lỗi luồng stream của giao thức HTTP/2 bị reset bởi server.</td><td style="padding:8px;">Thử chuyển sang <code>--http1.1</code> để cô lập nguyên nhân.</td></tr>
            </tbody>
          </table>
        `,
        codeExamples: [
          {
            id: 'ex-appc-sec01',
            title: 'Ví dụ 1: Mô Phỏng Bắt Lỗi Exit 6 (Lỗi DNS) Và Exit 7 (Từ Chối Kết Nối)',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Gọi tên miền không tồn tại (Exit 6):\ncurl.exe -sS "http://this-nonexistent-domain-xyz123.test" 2>&1 || echo "Mã lỗi: $?"\n# Gọi cổng đóng (Exit 7):\ncurl.exe -sS "http://127.0.0.1:9999" 2>&1 || echo "Mã lỗi: $?"',
              powershell: '# Trong PowerShell: kiểm tra mã lỗi $LASTEXITCODE:\ncurl.exe -sS "http://this-nonexistent-domain-xyz123.test"\nWrite-Output "Exit Code DNS: $LASTEXITCODE"\ncurl.exe -sS "http://127.0.0.1:9999"\nWrite-Output "Exit Code Connect: $LASTEXITCODE"',
              cmd: 'curl.exe -sS "http://this-nonexistent-domain-xyz123.test" || echo Exit Code: %ERRORLEVEL%'
            },
            realOutput: `curl: (6) Could not resolve host: this-nonexistent-domain-xyz123.test\nMã lỗi: 6\ncurl: (7) Failed to connect to 127.0.0.1:9999 after 2042 ms: Could not connect to server\nMã lỗi: 7`,
            explanationTokens: [
              { token: 'curl: (6)', meaning: 'Mã lỗi 6: Không thể phân giải DNS của hostname chỉ định' },
              { token: 'curl: (7)', meaning: 'Mã lỗi 7: Không thể kết nối TCP tới server (Connection Refused)' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Kỹ Thuật Bắt Exit Code Đa Nền Tảng: Bash vs PowerShell vs Windows CMD',
        content: `
          <p>Mỗi môi trường shell có cú pháp bắt mã thoát khác nhau. Nếu nhầm lẫn, script của bạn sẽ luôn hiểu sai kết quả thực thi của cURL:</p>

          <h3>1. Trong Linux / macOS (Bash / Zsh): Biến <code>$?</code></h3>
          <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);padding:12px;border-radius:6px;margin:8px 0;">
            <p>Biến <code>$?</code> lưu trữ mã thoát của lệnh vừa chạy gần nhất (từ 0 đến 255).</p>
            <p><strong>Cạm bẫy sống còn:</strong> Bất kỳ câu lệnh nào chạy sau cURL (kể cả lệnh <code>echo</code> hay <code>ls</code>) cũng sẽ <strong>LẬP TỨC GHI ĐÈ BIẾN <code>$?</code></strong>! Do đó, quy tắc vàng là: Luôn luôn lưu <code>$?</code> vào một biến tùy biến ở dòng tiếp theo:</p>
            <pre class="code-pre" style="background:var(--bg-code);padding:8px;border-radius:4px;"><code>curl.exe -sS --fail-with-body "http://api.corp/data"
EXIT_CODE=$?   # BẮT BUỘC: Lưu ngay trước khi làm bất kỳ việc gì khác!
echo "Mã thoát của cURL là: $EXIT_CODE"</code></pre>
          </div>

          <h3>2. Trong Windows PowerShell: Biến <code>$LASTEXITCODE</code> vs <code>$?</code></h3>
          <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);padding:12px;border-radius:6px;margin:8px 0;">
            <p><strong>CẢNH BÁO CỰC KỲ NGUY HIỂM:</strong> Trong PowerShell, biến <code>$?</code> <em>KHÔNG PHẢI LÀ CON SỐ</em> mà là một giá trị Boolean (<code>$True</code> nếu lệnh trước thành công, <code>$False</code> nếu có lỗi)!</p>
            <p>Để lấy chính xác con số mã thoát (0, 6, 7, 22, 28) của chương trình native như <code>curl.exe</code>, bạn <strong>BẮT BUỘC PHẢI DÙNG BIẾN <code>$LASTEXITCODE</code></strong>:</p>
            <pre class="code-pre" style="background:var(--bg-code);padding:8px;border-radius:4px;"><code>curl.exe -sS --fail-with-body "http://api.corp/data"
if ($LASTEXITCODE -ne 0) {
    Write-Error "cURL thất bại với mã lỗi: $LASTEXITCODE"
}</code></pre>
          </div>

          <h3>3. Trong Windows CMD (Command Prompt): Biến <code>%ERRORLEVEL%</code></h3>
          <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);padding:12px;border-radius:6px;margin:8px 0;">
            <pre class="code-pre" style="background:var(--bg-code);padding:8px;border-radius:4px;"><code>curl.exe -sS --fail-with-body "http://api.corp/data"
IF %ERRORLEVEL% NEQ 0 (
    echo cURL that bai voi ma loi: %ERRORLEVEL%
)</code></pre>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-appc-sec02',
            title: 'Ví dụ 2: Bắt Biến Mã Thoát Đa Nền Tảng An Toàn Ngay Sau Lệnh Thực Thi',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Bắt mã thoát bằng Bash an toàn:\ncurl.exe -sS "http://127.0.0.1:8789/ping" > /dev/null\nCODE=$?\necho "Exit Code bắt được: $CODE"',
              powershell: '# Bắt mã thoát chuẩn xác trong PowerShell bằng $LASTEXITCODE:\ncurl.exe -sS "http://127.0.0.1:8789/ping" -o NUL\n$code = $LASTEXITCODE\nWrite-Output "Exit Code bắt được: $code"',
              cmd: 'curl.exe -sS "http://127.0.0.1:8789/ping" > NUL && echo Exit Code bat duoc: %ERRORLEVEL%'
            },
            realOutput: `Exit Code bắt được: 0`,
            explanationTokens: [
              { token: 'CODE=$?', meaning: 'Lưu mã thoát của lệnh cURL vừa kết thúc vào biến shell trong Bash' },
              { token: '$code = $LASTEXITCODE', meaning: 'Lấy mã thoát số nguyên của tiến trình native trong PowerShell' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Cấu Trúc Switch-Case Bắt Lỗi Chuyên Nghiệp Trong Production Scripting',
        content: `
          <p>Thay vì chỉ kiểm tra <code>if [ $? -ne 0 ]</code> chung chung, một kịch bản DevOps chuẩn Enterprise sẽ sử dụng cấu trúc <strong>switch-case</strong> để phân nhánh hành động khắc phục tương ứng:</p>

          <h3>Mẫu Script Bash Hoàn Chỉnh:</h3>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>#!/usr/bin/env bash
set -uo pipefail

curl.exe -sS --fail-with-body --connect-timeout 5 --max-time 30 "https://api.corp.internal/health"
EXIT_CODE=$?

case "$EXIT_CODE" in
  0)
    echo "[SUCCESS] Service phản hồi bình thường!"
    exit 0
    ;;
  6)
    echo "[CRITICAL - DNS] Không tìm thấy hostname! Đang kiểm tra cấu hình DNS /etc/resolv.conf..."
    exit 1
    ;;
  7)
    echo "[WARNING - NETWORK] Không kết nối được tới server! Có thể service đang khởi động, kích hoạt retry..."
    exit 2
    ;;
  22)
    echo "[ERROR - APPLICATION] Server phản hồi lỗi HTTP >= 400! Đọc log body để điều tra."
    exit 3
    ;;
  28)
    echo "[WARNING - TIMEOUT] Kết nối bị quá hạn thời gian! Hệ thống có thể đang quá tải."
    exit 4
    ;;
  35|60|77)
    echo "[SECURITY ALERT - SSL] Lỗi chứng chỉ số hoặc TLS handshake! Báo động khẩn cấp tới Security Team!"
    exit 5
    ;;
  *)
    echo "[UNKNOWN] Sự cố không xác định với mã lỗi: $EXIT_CODE"
    exit 99
    ;;
esac</code></pre>
        `,
        codeExamples: [
          {
            id: 'ex-appc-sec03',
            title: 'Ví dụ 3: Mô Phỏng Cấu Trúc Switch-Case Phân Nhánh Lỗi Tự Động Trong PowerShell',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -sS "http://127.0.0.1:8789/ping" > /dev/null\ncase $? in\n  0) echo "Trạng thái: Hoàn hảo (0)" ;;\n  *) echo "Trạng thái: Lỗi" ;;\nesac',
              powershell: 'curl.exe -sS "http://127.0.0.1:8789/ping" -o NUL\nswitch ($LASTEXITCODE) {\n  0 { Write-Output "Trạng thái: Hoàn hảo (0)" }\n  6 { Write-Warning "Lỗi phân giải DNS" }\n  7 { Write-Warning "Lỗi kết nối cổng" }\n  default { Write-Error "Lỗi khác: $LASTEXITCODE" }\n}',
              cmd: 'curl.exe -sS "http://127.0.0.1:8789/ping" > NUL && echo Trang thai: Hoan hao (0)'
            },
            realOutput: `Trạng thái: Hoàn hảo (0)`,
            explanationTokens: [
              { token: 'switch ($LASTEXITCODE)', meaning: 'Cấu trúc rẽ nhánh đa trường hợp dựa trên mã thoát của cURL' },
              { token: 'case $? in', meaning: 'Cú pháp switch-case tương đương trong môi trường Bash' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Tự Động Hóa Phân Loại Lỗi Trong CI/CD Runner (GitHub Actions & GitLab CI)',
        content: `
          <p>Khi tích hợp cURL vào pipeline CI/CD, việc bóc tách mã lỗi giúp hệ thống tự động đưa ra quyết định thông minh thay vì chỉ đánh dấu step là "Failed":</p>

          <h3>Chiến Lược Phản Ứng Tự Động Trong CI/CD</h3>
          <ul>
            <li><strong>Nhóm Lỗi Tạm Thời (Transient Errors - Exit 7, 18, 28, 52):</strong> Kích hoạt cơ chế thử lại tự động (Auto-Retry) hoặc tăng thời gian chờ backoff. Runner không nên fail ngay mà thử lại tối đa 3 lần.</li>
            <li><strong>Nhóm Lỗi Cấu Hình Vĩnh Viễn (Fatal Errors - Exit 1, 3, 23, 77):</strong> Lập tức Fail-Fast pipeline, gửi thông báo cảnh báo lỗi cú pháp tới lập trình viên vừa tạo Pull Request.</li>
            <li><strong>Nhóm Lỗi Chứng Chỉ Số (Security Fatal - Exit 35, 60):</strong> Tuyệt đối KHÔNG thử lại (vì retry 1.000 lần chứng chỉ hết hạn vẫn sẽ hết hạn!). Gửi tin nhắn khẩn cấp tới kênh Slack/Teams của đội SRE để gia hạn chứng chỉ SSL.</li>
          </ul>

          <h3>Báo Cáo Trực Quan Vào GitHub Step Summary</h3>
          <p>Trong GitHub Actions, bạn có thể ghi trực tiếp kết quả phân tích mã lỗi vào biến môi trường <code>$GITHUB_STEP_SUMMARY</code> để hiển thị bảng Markdown báo cáo lỗi đẹp mắt trên giao diện web của GitHub.</p>
        `,
        codeExamples: [
          {
            id: 'ex-appc-sec04',
            title: 'Ví dụ 4: Xuất Báo Cáo Phân Tích Mã Thoát Dưới Dạng Cấu Trúc JSON Cho Log CI/CD',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -sS "http://127.0.0.1:8789/ping" > /dev/null\necho "{\\"exit_code\\": $?, \\"status\\": \\"healthy\\"}"',
              powershell: 'curl.exe -sS "http://127.0.0.1:8789/ping" -o NUL\n[PSCustomObject]@{ exit_code = $LASTEXITCODE; status = "healthy" } | ConvertTo-Json -Compress',
              cmd: 'curl.exe -sS "http://127.0.0.1:8789/ping" > NUL && echo {"exit_code": %ERRORLEVEL%, "status": "healthy"}'
            },
            realOutput: `{"exit_code":0,"status":"healthy"}`,
            explanationTokens: [
              { token: 'exit_code = $LASTEXITCODE', meaning: 'Đóng gói mã thoát thành trường dữ liệu có cấu trúc phục vụ giám sát tập trung' }
            ]
          }
        ]
      }
    ],

    // 6. Cạm bẫy thường gặp & Cảnh báo an ninh (Callouts Box)
    callouts: {
      warning: {
        title: 'CẢNH BÁO: BẪY BIẾN MÃ THOÁT TRONG SHELL SCRIPT ($? BỊ GHI ĐÈ VÀ SỰ KHÁC BIỆT GIỮA POWERSHELL $? VS $LASTEXITCODE)',
        content: 'Hai cạm bẫy lập trình kinh điển khiến hàng ngàn kịch bản tự động hóa phán đoán sai kết quả:\n1) Trong Bash: Biến `$?` chỉ phản ánh lệnh vừa chạy gần nhất. Nếu bạn chèn lệnh `echo "Đang kiểm tra..."` giữa cURL và câu lệnh `if`, biến `$?` sẽ là 0 (thành công của lệnh echo), xóa sạch mã lỗi thực sự của cURL! Luôn luôn gán `EXIT_CODE=$?` ngay lập tức.\n2) Trong PowerShell: Biến `$?` là kiểu Boolean (`$True`/`$False`), hoàn toàn KHÔNG PHẢI là con số! Bắt buộc phải dùng biến `$LASTEXITCODE` để lấy mã thoát 0, 6, 7, 22, 28 của chương trình `curl.exe`.'
      },
      pitfalls: [
        {
          title: 'Quên bật set -o pipefail trong Bash khiến lỗi cURL bị jq che giấu',
          content: 'Khi chạy `curl.exe ... | jq .`, nếu cURL trả về lỗi Exit 22 hoặc Exit 7 nhưng `jq` đọc chuỗi rỗng thành công (Exit 0), thì biến `$?` của cả đường ống sẽ là 0! Bắt buộc phải khai báo `set -euo pipefail` ở đầu file script.'
        },
        {
          title: 'Thử lại vô tận khi gặp lỗi Exit 60 (Lỗi chứng chỉ SSL)',
          content: 'Lỗi 60 xảy ra khi chứng chỉ số hết hạn, domain không khớp hoặc thiếu CA root bundle. Đây là lỗi cấu hình tĩnh: Thử lại 1.000 lần cũng không bao giờ thành công mà chỉ làm nghẽn runner. Hãy fail-fast ngay lập tức.'
        },
        {
          title: 'Nhầm lẫn giữa cURL Exit Code và HTTP Status Code',
          content: 'Exit Code là số nguyên từ 0 đến 99 do cURL trả về cho hệ điều hành. HTTP Status Code là mã 3 chữ số (200, 404, 500) do server gửi trong gói tin HTTP. Đừng nhầm Exit Code 22 với HTTP Status 200!'
        },
        {
          title: 'Dùng cờ -s mà quên -S khiến mã lỗi không có thông điệp giải thích',
          content: 'Khi gặp Exit 6 hoặc Exit 7 mà bạn dùng cờ `-s` đơn lẻ, cURL sẽ thoát trong im lặng hoàn toàn. Bạn chỉ biết có mã lỗi nhưng không biết hostname nào bị lỗi hay cổng nào bị từ chối.'
        },
        {
          title: 'Không kiểm tra mã thoát Exit 23 (Ghi file thất bại)',
          content: 'Khi tải file lớn với cờ `-o /var/data/big.iso`, nếu ổ đĩa bị đầy 100%, cURL sẽ thoát với Exit 23. Nếu script bỏ qua mã này và tiếp tục giải nén, toàn bộ hệ thống sẽ bị lỗi dữ liệu hỏng (Data Corruption).'
        }
      ],
      tips: [
        {
          title: 'Luôn gán biến mã thoát ở dòng đầu tiên sau lệnh gọi cURL',
          content: 'Quy tắc vàng: `curl.exe ...; EXIT_CODE=$?` (trong Bash) hoặc `$LASTEXITCODE` (trong PowerShell). Không chèn bất kỳ câu lệnh nào ở giữa.'
        },
        {
          title: 'Tra cứu nhanh ý nghĩa mã lỗi trực tiếp từ thư viện',
          content: 'Mã số Exit Code của cURL hoàn toàn trùng khớp với định nghĩa enum `CURLcode` trong tệp header `curl/curl.h`. Ví dụ: Mã 28 là `CURLE_OPERATION_TIMEDOUT`.'
        },
        {
          title: 'Kết hợp --fail-with-body để chuẩn hóa việc bắt lỗi HTTP',
          content: 'Nhờ cờ `--fail-with-body`, mọi lỗi HTTP 4xx và 5xx đều được quy về mã thoát thống nhất **Exit 22**, giúp khối switch-case dễ dàng phân loại lỗi nghiệp vụ.'
        }
      ],
      deepDive: {
        title: 'Mã Nguồn Nhân cURL: Cách Thức libcurl Ánh Xạ Enum CURLcode Thành Process Exit Code',
        content: `
          <p>Mã thoát của cURL từ đâu mà có?</p>
          <p>Bên trong thư viện <code>libcurl</code>, tệp tiêu đề <code>include/curl/curl.h</code> định nghĩa một cấu trúc enum khổng lồ có tên là <code>CURLcode</code>:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:8px;border-radius:4px;"><code>typedef enum {
  CURLE_OK = 0,
  CURLE_UNSUPPORTED_PROTOCOL = 1,
  CURLE_FAILED_INIT = 2,
  CURLE_URL_MALFORMAT = 3,
  CURLE_COULDNT_RESOLVE_HOST = 6,
  CURLE_COULDNT_CONNECT = 7,
  CURLE_HTTP_RETURNED_ERROR = 22,
  CURLE_OPERATION_TIMEDOUT = 28,
  CURLE_PEER_FAILED_VERIFICATION = 60,
  /* ... */
  CURL_LAST /* Hằng số kết thúc */
} CURLcode;</code></pre>
          <p>Trong tệp mã nguồn của công cụ dòng lệnh (<code>src/tool_operate.c</code>), hàm <code>operate()</code> gọi <code>res = curl_easy_perform(curl)</code>. Khi kết thúc chương trình, hàm <code>main()</code> thực thi dòng lệnh ngắn gọn:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:8px;border-radius:4px;"><code>return (int)res;</code></pre>
          <p>Hệ điều hành nhận giá trị <code>(int)res</code> này và đưa vào ngăn nhớ trạng thái của tiến trình con. Khi tiến trình cha (Bash, PowerShell) đọc giá trị này, nó phản ánh chính xác 100% mã định danh lỗi nội bộ của thư viện C!</p>
        `
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Bắt mã thoát lỗi DNS (Exit 6) khi gọi tên miền không tồn tại',
        problem: 'Sử dụng cURL gửi request tới một tên miền chắc chắn không tồn tại: `http://this-nonexistent-domain-xyz123.test`. Bắt mã thoát của lệnh và xác nhận mã thoát nhận được là 6.',
        criteria: 'Lệnh thoát với mã lỗi Exit 6, script bắt được mã và in ra màn hình.',
        hint: 'Trong PowerShell kiểm tra `$LASTEXITCODE`.',
        starterCommands: {
          bash: 'curl.exe -sS "http://this-nonexistent-domain-xyz123.test" 2>&1 || echo "Exit code: $?"',
          powershell: 'curl.exe -sS "http://this-nonexistent-domain-xyz123.test"\nWrite-Output "Exit Code: $LASTEXITCODE"',
          cmd: 'curl.exe -sS "http://this-nonexistent-domain-xyz123.test" || echo Exit Code: %ERRORLEVEL%'
        },
        solution: {
          commands: {
            bash: 'curl.exe -sS "http://this-nonexistent-domain-xyz123.test" 2>&1 || echo "Exit code: $?"',
            powershell: 'curl.exe -sS "http://this-nonexistent-domain-xyz123.test"\nWrite-Output "Exit Code: $LASTEXITCODE"',
            cmd: 'curl.exe -sS "http://this-nonexistent-domain-xyz123.test" || echo Exit Code: %ERRORLEVEL%'
          },
          explanation: 'Mã thoát 6 (CURLE_COULDNT_RESOLVE_HOST) là mã lỗi tiêu chuẩn khi máy tính không thể phân giải địa chỉ IP của tên miền từ DNS.'
        },
        solutionOutput: `Exit Code: 6`
      },
      {
        level: 'Trung bình',
        title: 'Bắt mã thoát lỗi kết nối cổng đóng (Exit 7) và đối chiếu với Exit 0',
        problem: 'Viết câu lệnh gửi request tới cổng chưa được mở `http://127.0.0.1:9999`. Bắt mã thoát của cURL và xác nhận mã nhận được là 7 (CURLE_COULDNT_CONNECT).',
        criteria: 'Bắt chính xác mã thoát 7 khi kết nối bị từ chối (Connection Refused).',
        hint: 'Dùng cú pháp bắt biến `$LASTEXITCODE` trong PowerShell hoặc `$?` trong Bash.',
        starterCommands: {
          bash: 'curl.exe -sS "http://127.0.0.1:9999" 2>&1 || echo "Exit code: $?"',
          powershell: 'curl.exe -sS "http://127.0.0.1:9999"\nWrite-Output "Exit Code: $LASTEXITCODE"',
          cmd: 'curl.exe -sS "http://127.0.0.1:9999" || echo Exit Code: %ERRORLEVEL%'
        },
        solution: {
          commands: {
            bash: 'curl.exe -sS "http://127.0.0.1:9999" 2>&1 || echo "Exit code: $?"',
            powershell: 'curl.exe -sS "http://127.0.0.1:9999"\nWrite-Output "Exit Code: $LASTEXITCODE"',
            cmd: 'curl.exe -sS "http://127.0.0.1:9999" || echo Exit Code: %ERRORLEVEL%'
          },
          explanation: 'Mã thoát 7 xuất hiện khi gói tin TCP SYN bị máy chủ từ chối bằng gói tin TCP RST, thường do cổng dịch vụ chưa khởi động hoặc bị firewall chặn.'
        },
        solutionOutput: `Exit Code: 7`
      },
      {
        level: 'Khó',
        title: 'Xây dựng khối switch-case xử lý mã lỗi cURL chuẩn mực',
        problem: 'Viết một đoạn script shell gọi endpoint `http://127.0.0.1:8789/ping`. Bắt mã thoát và sử dụng cấu trúc `switch-case` để phân loại: Nếu mã 0 in `Thành công (0)`. Nếu mã khác in ra thông báo lỗi tương ứng.',
        criteria: 'Sử dụng đúng cấu trúc `switch ($LASTEXITCODE)` trong PowerShell hoặc `case $? in` trong Bash.',
        hint: 'Dùng cấu trúc switch-case chuẩn mực đã học ở Lớp 3.',
        starterCommands: {
          bash: 'curl.exe -sS "http://127.0.0.1:8789/ping" > /dev/null\ncase $? in\n  0) echo "Thành công (0)" ;;\n  *) echo "Lỗi khác" ;;\nesac',
          powershell: 'curl.exe -sS "http://127.0.0.1:8789/ping" -o NUL\nswitch ($LASTEXITCODE) {\n  0 { Write-Output "Thành công (0)" }\n  default { Write-Warning "Lỗi" }\n}',
          cmd: 'curl.exe -sS "http://127.0.0.1:8789/ping" > NUL && echo Thanh cong (0)'
        },
        solution: {
          commands: {
            bash: 'curl.exe -sS "http://127.0.0.1:8789/ping" > /dev/null\ncase $? in\n  0) echo "Thành công (0)" ;;\n  *) echo "Lỗi khác" ;;\nesac',
            powershell: 'curl.exe -sS "http://127.0.0.1:8789/ping" -o NUL\nswitch ($LASTEXITCODE) {\n  0 { Write-Output "Thành công (0)" }\n  default { Write-Warning "Lỗi" }\n}',
            cmd: 'curl.exe -sS "http://127.0.0.1:8789/ping" > NUL && echo Thanh cong (0)'
          },
          explanation: 'Cấu trúc switch-case giúp phân tách rõ ràng các nhóm lỗi mạng, lỗi ứng dụng và lỗi cấu hình để tự động hóa xử lý trong CI/CD.'
        },
        solutionOutput: `Thành công (0)`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Trong môi trường Windows PowerShell, biến nào sau đây chứa MÃ THOÁT DẠNG SỐ NGUYÊN (0, 6, 7, 22, 28) của chương trình `curl.exe`?',
        options: [
          '`$?`',
          '`$LASTEXITCODE`',
          '`$ERRORLEVEL`',
          '`$CURL_CODE`'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Trong PowerShell, biến $? là kiểu Boolean ($True/$False). Bạn bắt buộc phải dùng biến `$LASTEXITCODE` để lấy mã thoát số nguyên của tiến trình native như curl.exe.'
      },
      {
        question: 'Mã thoát nào của cURL cho biết máy tính không thể phân giải tên miền từ hệ thống máy chủ DNS (Could not resolve host)?',
        options: [
          'Exit Code 6',
          'Exit Code 7',
          'Exit Code 28',
          'Exit Code 60'
        ],
        optionsHtml: null,
        correctIndex: 0,
        explanation: 'Exit Code 6 (CURLE_COULDNT_RESOLVE_HOST) là mã lỗi chuẩn khi cURL không thể tìm thấy địa chỉ IP tương ứng của hostname từ máy chủ DNS.'
      },
      {
        question: 'Mã thoát nào của cURL xuất hiện khi máy chủ trả về mã HTTP ≥ 400 (khi lệnh có cờ `-f` hoặc `--fail-with-body`)?',
        options: [
          'Exit Code 0',
          'Exit Code 7',
          'Exit Code 22',
          'Exit Code 404'
        ],
        optionsHtml: null,
        correctIndex: 2,
        explanation: 'Exit Code 22 (CURLE_HTTP_RETURNED_ERROR) là mã thoát của cURL khi gặp lỗi HTTP status >= 400 trong chế độ fail-fast.'
      },
      {
        question: 'Tại sao khi gặp lỗi Exit Code 60 (Lỗi xác thực chứng chỉ số SSL/TLS), kịch bản tự động hóa KHÔNG NÊN thực hiện thử lại (Retry)?',
        options: [
          'Vì cURL sẽ tự động bị khóa tài khoản.',
          'Vì lỗi 60 là lỗi cấu hình tĩnh (chứng chỉ hết hạn, self-signed hoặc thiếu CA bundle); nếu không sửa chứng chỉ thì thử lại bao nhiêu lần cũng sẽ thất bại!',
          'Vì máy chủ sẽ phát nổ.',
          'Vì giao thức TLS cấm gửi lại request.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Lỗi 60 là lỗi cấu hình xác thực (Fatal Certificate Error), không phải sự cố chập chờn mạng tạm thời. Retry không có tác dụng mà chỉ gây lãng phí tài nguyên.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe ...; echo $?',
        description: 'Bắt mã thoát cURL (0-99) ngay lập tức trong môi trường Linux/macOS Bash.'
      },
      {
        command: 'curl.exe ...; Write-Output $LASTEXITCODE',
        description: 'Bắt mã thoát cURL dạng số nguyên chính xác trong Windows PowerShell.'
      },
      {
        command: 'Exit 0: CURLE_OK',
        description: 'Thành công tuyệt đối, mọi byte truyền tải mạng đã hoàn tất.'
      },
      {
        command: 'Exit 6: CURLE_COULDNT_RESOLVE_HOST',
        description: 'Lỗi DNS: không tìm thấy địa chỉ IP của tên miền.'
      },
      {
        command: 'Exit 7: CURLE_COULDNT_CONNECT',
        description: 'Lỗi kết nối: Port đóng, host không phản hồi hoặc Firewall chặn.'
      },
      {
        command: 'Exit 22: CURLE_HTTP_RETURNED_ERROR',
        description: 'Lỗi HTTP status ≥ 400 khi sử dụng cờ -f hoặc --fail-with-body.'
      },
      {
        command: 'Exit 28: CURLE_OPERATION_TIMEDOUT',
        description: 'Quá hạn thời gian tối đa: chạm giới hạn --connect-timeout hoặc --max-time.'
      },
      {
        command: 'Exit 60: CURLE_PEER_FAILED_VERIFICATION',
        description: 'Lỗi chứng chỉ SSL: không tin cậy, hết hạn, hoặc thiếu CA root bundle.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'Nắm vững 6 mã thoát quan trọng nhất trong thực tế: Exit 0 (Thành công), Exit 6 (Lỗi DNS), Exit 7 (Cổng đóng / Firewall), Exit 22 (Lỗi HTTP với --fail-with-body), Exit 28 (Quá hạn timeout), và Exit 60 (Lỗi chứng chỉ SSL).',
      'Cẩn trọng với biến mã thoát: Luôn lưu `EXIT_CODE=$?` ngay dòng đầu tiên trong Bash, và luôn dùng `$LASTEXITCODE` trong PowerShell để không bị nhầm với boolean `$?`.',
      'Bảo vệ đường ống pipe trong Bash: Bắt buộc khai báo `set -euo pipefail` để mã lỗi của cURL không bị các lệnh phía sau đường ống che giấu.',
      'Phân loại hành động xử lý: Tự động Retry cho lỗi mạng tạm thời (Exit 7, 28), nhưng Fail-Fast ngay lập tức đối với lỗi chứng chỉ số (Exit 60, 77) hoặc lỗi cú pháp (Exit 1, 3).',
      'Áp dụng cấu trúc `switch-case` chuyên nghiệp để xây dựng kịch bản tự động hóa có khả năng tự phục hồi và gửi cảnh báo chính xác tới đội ngũ SRE.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'Official cURL Documentation: Exit Codes & Return Values',
        url: 'https://curl.se/docs/manpage.html#EXIT-CODES',
        description: 'Tài liệu tra cứu chính thống từ tác giả Daniel Stenberg liệt kê toàn bộ các mã thoát từ 1 đến 99.'
      },
      {
        title: 'libcurl C Source Code: include/curl/curl.h (CURLcode Enum)',
        url: 'https://github.com/curl/curl/blob/master/include/curl/curl.h',
        description: 'Mã nguồn C định nghĩa chi tiết enum hằng số của toàn bộ các mã lỗi trong lõi thư viện libcurl.'
      },
      {
        title: 'GNU Bash Reference Manual: Special Parameters ($?)',
        url: 'https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html',
        description: 'Quy chuẩn hành vi của biến trạng thái thoát $? trong môi trường dòng lệnh Linux.'
      },
      {
        title: 'Microsoft PowerShell Documentation: about_Automatic_Variables ($LASTEXITCODE)',
        url: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_automatic_variables',
        description: 'Tài liệu kỹ thuật của Microsoft về sự khác biệt giữa biến $? và $LASTEXITCODE trong PowerShell.'
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
          issue: 'Nhầm lẫn giữa biến $? (boolean) và $LASTEXITCODE (số nguyên) trong môi trường PowerShell',
          severity: 'Critical',
          resolution: 'Đã xây dựng Hộp Cảnh báo và phân tích sâu trong Lớp 2, hướng dẫn bắt buộc dùng $LASTEXITCODE'
        },
        {
          issue: 'Biến $? trong Bash bị ghi đè bởi các lệnh tiếp theo làm mất mã lỗi cURL gốc',
          severity: 'Critical',
          resolution: 'Đã đưa ra quy tắc vàng gán EXIT_CODE=$? ngay lập tức ở dòng kế tiếp trong Lớp 2'
        },
        {
          issue: 'Thực hiện retry vô tận khi gặp lỗi Exit 60 (Lỗi chứng chỉ SSL) gây nghẽn runner CI',
          severity: 'Major',
          resolution: 'Đã phân loại lỗi Fatal (không retry) vs Transient (được retry) trong Lớp 4 và Quiz trắc nghiệm'
        },
        {
          issue: 'Lỗi Exit 22 không được kích hoạt khi máy chủ trả về mã lỗi HTTP 404/500',
          severity: 'Major',
          resolution: 'Đã phân tích mối quan hệ giữa cờ --fail-with-body và mã thoát Exit 22 trong Lớp 1'
        },
        {
          issue: 'Mã lỗi cURL bị che giấu trong đường ống pipe (curl | jq) khiến CI job deploy mã hỏng',
          severity: 'Minor',
          resolution: 'Đã nhắc lại tầm quan trọng của chốt an toàn set -euo pipefail trong danh mục Cạm bẫy'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://curl.se/docs/manpage.html#EXIT-CODES',
        'https://github.com/curl/curl/blob/master/include/curl/curl.h',
        'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_automatic_variables'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_APP_C_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
