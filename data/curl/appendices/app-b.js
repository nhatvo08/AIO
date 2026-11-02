/**
 * Phụ Lục B: Bảng Mã Trạng Thái HTTP (Status Codes) & Ý Nghĩa Đối Với cURL (data/curl/appendices/app-b.js)
 * Cấp độ: Tra cứu | Thời lượng: ~15 phút | cURL tối thiểu: 7.0.0 (--fail-with-body ≥ 7.76.0)
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'app-b',
    order: 22,
    levelId: 'level-appendix',
    meta: {
      id: 'app-b',
      order: 22,
      title: 'Bảng Mã Trạng Thái HTTP (Status Codes) & Ý Nghĩa Đối Với cURL',
      level: 'Tra cứu',
      curlMinVersion: '7.0.0',
      qaStatus: 'verified'
    },
    partId: 'level-appendix',
    partTitle: 'Phụ Lục Tra Cứu & Cẩm Nang Thực Chiến',
    number: 'Phụ lục B',
    title: 'Bảng Mã Trạng Thái HTTP (Status Codes) & Ý Nghĩa Đối Với cURL',
    shortTitle: 'Bảng mã HTTP Status Codes',
    subtitle: 'Giải mã toàn diện 5 dải mã phản hồi HTTP (1xx đến 5xx) theo chuẩn RFC 9110, cơ chế thoát lỗi Exit 0 vs Exit 22 của cURL, nghệ thuật theo dõi redirect 3xx và chiến lược xử lý tự động trong Production',
    level: 'Tra cứu',
    duration: '15 phút',
    durationMinutes: 15,
    curlMinVersion: '7.0.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Phân loại và nắm vững ý nghĩa vận hành của toàn bộ 5 nhóm mã trạng thái HTTP (1xx, 2xx, 3xx, 4xx, 5xx) theo chuẩn chuẩn mực RFC 9110.',
      'Hiểu sâu cơ chế xử lý mã lỗi của cURL: Tại sao cURL mặc định coi HTTP 404/500 là thành công (Exit Code 0), và cách khắc phục triệt để bằng `-f` (`--fail`) vs `--fail-with-body` (Exit Code 22).',
      'Làm chủ nghệ thuật chuyển hướng Redirect: Phân biệt rõ sự khác nhau giữa 301, 302, 303, 307, 308 và cạm bẫy cURL tự ý đổi phương thức POST thành GET khi đi kèm cờ `-L`.',
      'Xây dựng kịch bản shell tự động phân nhánh logic dựa trên mã HTTP phản hồi: Bóc tách mã bằng `-w "%{http_code}"`, tự động nghỉ khi gặp 429 Too Many Requests, và nhận diện tài nguyên không đổi với 304 Not Modified.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Hiểu rõ mô hình giao tiếp Client - Server và cấu trúc một phiên trao đổi HTTP (Request - Response).',
      'Đã hoàn thành Chương 11 (Xử Lý Lỗi & Diagnostics), Chương 15 (Caching & ETag 304) và Chương 16 (Retry & --fail-with-body).'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Bảng mã đèn tín hiệu giao thông mạng và người phiên dịch viên cURL',
      metaphor: 'Hãy tưởng tượng các mã HTTP Status Code giống như hệ thống cờ hiệu và đèn tín hiệu điều hướng không lưu quốc tế:\n\n* Đèn xanh thông suốt (2xx Success): Chuyến bay hạ cánh an toàn. cURL nhận trọn vẹn kiện hàng (Body) và trao lại cho người dùng.\n\n* Biển báo chuyển hướng luồng (3xx Redirection): Trạm kiểm soát báo: "Đường băng đã dời sang vị trí mới!". Nếu cURL không bật cờ -L, anh ta đứng im tại chỗ và không chịu bay tiếp. Khi bật -L, cURL tự động bay sang sân bay mới. Nhưng chú ý: Với 301/302 cổ điển, anh ta có thể tự ý đổi kiện hàng nặng (POST) thành hàng nhẹ (GET); chỉ có 307/308 hiện đại mới bảo toàn tuyệt đối kiện hàng của bạn!\n\n* Cờ vàng cảnh báo khách (4xx Client Error): Lỗi do người gửi: thiếu vé vào cổng (401), đi nhầm cửa cấm (403), địa chỉ không tồn tại (404), hoặc gửi yêu cầu dồn dập bị phạt tốc độ (429). Mặc định cURL vẫn vui vẻ: "Tôi đã nói chuyện xong với trạm kiểm soát!" (Exit 0). Chỉ khi bạn đưa cho anh ta chiếc roi kỷ luật --fail-with-body, anh ta mới gióng chuông báo động (Exit 22)!\n\n* Còi báo động sập trạm (5xx Server Error): Máy chủ nội bộ bốc khói (500), trạm trung chuyển mất kết nối (502 Gateway), hoặc trạm quá tải cần bảo trì (503). Đây là lúc kịch bản tự động hóa phải kích hoạt cơ chế thử lại (Retry) với độ trễ giãn cách an toàn.',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:14px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">5 DẢI MÃ PHẢN HỒI HTTP VÀ PHẢN ỨNG MẶC ĐỊNH CỦA cURL</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#06b6d4;font-weight:700;">1xx: Thông Tin</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Ví dụ: 100 Continue<br/>
                cURL: Đợi tiếp response<br/>
                Exit code: 0
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;">2xx: Thành Công</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Ví dụ: 200 OK, 201 Created<br/>
                cURL: In body ra stdout<br/>
                Exit code: 0
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#eab308;font-weight:700;">3xx: Chuyển Hướng</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Ví dụ: 301, 302, 304, 307<br/>
                cURL: Cần cờ <code>-L</code> để đi tiếp<br/>
                Exit code: 0
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#f97316;font-weight:700;">4xx: Lỗi Phía Client</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Ví dụ: 400, 401, 404, 429<br/>
                cURL: Vẫn thoát 0 (Mặc định)<br/>
                Cần: <code>--fail-with-body</code> &rarr; Exit 22
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#ef4444;font-weight:700;">5xx: Lỗi Server</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Ví dụ: 500, 502, 503, 504<br/>
                cURL: Vẫn thoát 0 (Mặc định)<br/>
                Cần: Retry hoặc Fail-fast
              </div>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '-w "%{http_code}"',
        longFlag: '--write-out "%{http_code}"',
        description: 'Trích xuất trực tiếp mã trạng thái phản hồi HTTP 3 chữ số vào biến shell hoặc terminal.',
        minVersion: '7.0.0'
      },
      {
        flag: '--fail-with-body',
        longFlag: '--fail-with-body',
        description: 'Thoát với mã lỗi Exit 22 khi gặp HTTP ≥ 400 nhưng VẪN in ra Message Body nhận được để debug (cURL ≥ 7.76.0).',
        minVersion: '7.76.0'
      },
      {
        flag: '-f',
        longFlag: '--fail',
        description: 'Thoát với mã lỗi Exit 22 khi HTTP ≥ 400 nhưng NUỐT MẤT toàn bộ Message Body phản hồi.',
        minVersion: '7.0.0'
      },
      {
        flag: '-L',
        longFlag: '--location',
        description: 'Tự động theo dõi chuyển hướng khi máy chủ trả về mã HTTP 3xx (301, 302, 303, 307, 308).',
        minVersion: '7.0.0'
      },
      {
        flag: '--post301',
        longFlag: '--post301',
        description: 'Chỉ thị cho cURL giữ nguyên phương thức POST sau khi nhận redirect 301 thay vì tự ý đổi thành GET.',
        minVersion: '7.17.1'
      },
      {
        flag: '--post302',
        longFlag: '--post302',
        description: 'Chỉ thị cho cURL giữ nguyên phương thức POST sau khi nhận redirect 302 thay vì tự ý đổi thành GET.',
        minVersion: '7.19.1'
      },
      {
        flag: '-I',
        longFlag: '--head',
        description: 'Gửi request HEAD chỉ lấy dòng trạng thái HTTP và headers phản hồi, bỏ qua Message Body.',
        minVersion: '7.0.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Bảng Tra Cứu Toàn Diện Các Mã HTTP 1xx, 2xx, 3xx, 4xx, 5xx Phổ Biến Nhất',
        content: `
          <p>Mỗi mã trạng thái HTTP là một số nguyên có 3 chữ số, được chuẩn hóa bởi tổ chức IETF trong đặc tả <strong>RFC 9110</strong>. Dưới đây là bảng phân loại chi tiết các mã bạn sẽ gặp hàng ngày:</p>

          <h3>1. Nhóm 2xx: Thành Công (Success)</h3>
          <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.85rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:6px;">Mã</th>
                <th style="padding:6px;">Tên Chuẩn</th>
                <th style="padding:6px;">Ý Nghĩa Thực Chiến</th>
                <th style="padding:6px;">Hành Vi Của cURL</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#10b981;">200</td><td style="padding:6px;">OK</td><td style="padding:6px;">Yêu cầu thành công, server trả về dữ liệu chuẩn.</td><td style="padding:6px;">In body ra stdout, Exit 0.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#10b981;">201</td><td style="padding:6px;">Created</td><td style="padding:6px;">Tạo mới tài nguyên thành công (thường gặp sau POST).</td><td style="padding:6px;">In body ra stdout, Exit 0.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#10b981;">204</td><td style="padding:6px;">No Content</td><td style="padding:6px;">Thành công nhưng không có body (thường gặp sau DELETE).</td><td style="padding:6px;">Không in gì, Exit 0.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#10b981;">206</td><td style="padding:6px;">Partial Content</td><td style="padding:6px;">Server trả về một phần dữ liệu (tải resume với cờ <code>-C -</code>).</td><td style="padding:6px;">Nối tiếp vào file, Exit 0.</td></tr>
            </tbody>
          </table>

          <h3>2. Nhóm 3xx: Chuyển Hướng (Redirection)</h3>
          <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.85rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:6px;">Mã</th>
                <th style="padding:6px;">Tên Chuẩn</th>
                <th style="padding:6px;">Ý Nghĩa Thực Chiến</th>
                <th style="padding:6px;">Hành Vi Của cURL</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#eab308;">301</td><td style="padding:6px;">Moved Permanently</td><td style="padding:6px;">URL đã chuyển vĩnh viễn sang địa chỉ mới.</td><td style="padding:6px;">Cần <code>-L</code> để đi tiếp (có thể đổi POST &rarr; GET).</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#eab308;">302</td><td style="padding:6px;">Found</td><td style="padding:6px;">Chuyển hướng tạm thời sang URL mới.</td><td style="padding:6px;">Cần <code>-L</code> để đi tiếp (có thể đổi POST &rarr; GET).</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#eab308;">304</td><td style="padding:6px;">Not Modified</td><td style="padding:6px;">Tài nguyên không đổi so với ETag/If-Modified-Since.</td><td style="padding:6px;">Không tải lại body, Exit 0 (tiết kiệm băng thông).</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#eab308;">307</td><td style="padding:6px;">Temporary Redirect</td><td style="padding:6px;">Chuyển hướng tạm thời nhưng BẮT BUỘC giữ nguyên method.</td><td style="padding:6px;">Cần <code>-L</code> (POST vẫn giữ nguyên POST).</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#eab308;">308</td><td style="padding:6px;">Permanent Redirect</td><td style="padding:6px;">Chuyển hướng vĩnh viễn nhưng BẮT BUỘC giữ nguyên method.</td><td style="padding:6px;">Cần <code>-L</code> (POST vẫn giữ nguyên POST).</td></tr>
            </tbody>
          </table>

          <h3>3. Nhóm 4xx: Lỗi Phía Client (Client Error)</h3>
          <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.85rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:6px;">Mã</th>
                <th style="padding:6px;">Tên Chuẩn</th>
                <th style="padding:6px;">Ý Nghĩa Thực Chiến</th>
                <th style="padding:6px;">Hành Vi Của cURL</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#f97316;">400</td><td style="padding:6px;">Bad Request</td><td style="padding:6px;">Payload JSON sai cú pháp hoặc thiếu tham số bắt buộc.</td><td style="padding:6px;">Mặc định Exit 0; dùng <code>--fail-with-body</code> &rarr; Exit 22.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#f97316;">401</td><td style="padding:6px;">Unauthorized</td><td style="padding:6px;">Chưa đăng nhập, thiếu hoặc sai Token xác thực.</td><td style="padding:6px;">Server kèm header WWW-Authenticate.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#f97316;">403</td><td style="padding:6px;">Forbidden</td><td style="padding:6px;">Đã đăng nhập nhưng không có quyền hạn truy cập tài nguyên.</td><td style="padding:6px;">Mặc định Exit 0; dùng <code>--fail-with-body</code> &rarr; Exit 22.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#f97316;">404</td><td style="padding:6px;">Not Found</td><td style="padding:6px;">Đường dẫn endpoint không tồn tại trên máy chủ.</td><td style="padding:6px;">Mặc định Exit 0; dùng <code>--fail-with-body</code> &rarr; Exit 22.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#f97316;">405</td><td style="padding:6px;">Method Not Allowed</td><td style="padding:6px;">Endpoint không hỗ trợ HTTP method này (ví dụ: POST vào chỗ chỉ nhận GET).</td><td style="padding:6px;">Server kèm header Allow.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#f97316;">429</td><td style="padding:6px;">Too Many Requests</td><td style="padding:6px;">Client bị bóp băng thông do gọi API quá nhanh (Rate Limit).</td><td style="padding:6px;">Server thường kèm header <code>Retry-After</code>.</td></tr>
            </tbody>
          </table>

          <h3>4. Nhóm 5xx: Lỗi Phía Server (Server Error)</h3>
          <table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.85rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:6px;">Mã</th>
                <th style="padding:6px;">Tên Chuẩn</th>
                <th style="padding:6px;">Ý Nghĩa Thực Chiến</th>
                <th style="padding:6px;">Hành Vi Của cURL</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#ef4444;">500</td><td style="padding:6px;">Internal Server Error</td><td style="padding:6px;">Ứng dụng backend gặp Exception chưa được xử lý (sập mã).</td><td style="padding:6px;">Mặc định Exit 0; dùng <code>--fail-with-body</code> &rarr; Exit 22.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#ef4444;">502</td><td style="padding:6px;">Bad Gateway</td><td style="padding:6px;">Reverse Proxy (Nginx, ALB) không kết nối được upstream service.</td><td style="padding:6px;">Nên retry với cờ <code>--retry</code>.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#ef4444;">503</td><td style="padding:6px;">Service Unavailable</td><td style="padding:6px;">Server quá tải tạm thời hoặc đang bảo trì.</td><td style="padding:6px;">Nên tuân thủ <code>Retry-After</code>.</td></tr>
              <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:6px;font-weight:700;color:#ef4444;">504</td><td style="padding:6px;">Gateway Timeout</td><td style="padding:6px;">Reverse Proxy chờ upstream phản hồi quá thời gian quy định.</td><td style="padding:6px;">Nên kiểm tra tải của database backend.</td></tr>
            </tbody>
          </table>
        `,
        codeExamples: [
          {
            id: 'ex-appb-sec01',
            title: 'Ví dụ 1: Trích Xuất Mã HTTP Status Code Trực Tiếp Bằng Cờ -w "%{http_code}"',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Gửi request và chỉ in mã HTTP status code ra terminal:\ncurl.exe -s -o /dev/null -w "%{http_code}\\n" "http://127.0.0.1:8789/status/404"',
              powershell: '# Trong PowerShell: lưu mã HTTP status vào biến để kiểm tra điều kiện:\n$code = curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/status/404"\nWrite-Output "HTTP Code nhận được: $code"',
              cmd: 'curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/status/404"'
            },
            realOutput: `404`,
            explanationTokens: [
              { token: '-o /dev/null', meaning: 'Chuyển hướng phần Message Body vào hư vô để màn hình không bị rác' },
              { token: '-w "%{http_code}"', meaning: 'Biến định dạng trích xuất trực tiếp mã trạng thái phản hồi của server' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Cơ Chế Bắt Lỗi HTTP Của cURL: Mặc Định Exit 0 vs Sự Khác Biệt Giữa -f Và --fail-with-body',
        content: `
          <p>Một trong những nghịch lý lớn nhất khiến người mới dùng cURL phát điên là:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe https://api.corp/status/500
echo $?   # Trên Linux in ra: 0 (Thành công!)
echo $LASTEXITCODE # Trên PowerShell in ra: 0</code></pre>

          <h3>Tại Sao cURL Coi Lỗi 500 Là "Thành Công" (Exit 0)?</h3>
          <p>Bởi vì cURL là một công cụ truyền tải mạng ở tầng giao vận: Nhiệm vụ của cURL là phân giải DNS, bắt tay TCP/TLS, gửi request và nhận response. Khi máy chủ trả về mã <code>500 Internal Server Error</code>, <strong>phiên truyền tải mạng đã hoàn tất trọn vẹn không hề đứt cáp hay timeout</strong>. Do đó cURL coi nhiệm vụ của nó đã thành công mỹ mãn!</p>

          <h3>Giải Pháp: So Sánh Đối Đầu Giữa <code>-f</code> Và <code>--fail-with-body</code></h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0;">
            <div style="background:var(--bg-surface);border:1px solid #ef4444;padding:12px;border-radius:6px;">
              <h4 style="color:#ef4444;margin-top:0;">Cờ Truyền Thống: -f, --fail</h4>
              <p style="font-size:0.8rem;">Ra đời từ cURL 7.0.0. Khi gặp HTTP $\ge$ 400, cURL thoát với <strong>Exit Code 22</strong>.</p>
              <p style="font-size:0.8rem;color:#ef4444;"><strong>NHƯỢC ĐIỂM CHẾT NGƯỜI:</strong> cURL nuốt sạch toàn bộ Message Body! Màn hình terminal hoàn toàn trống rỗng hoặc chỉ có dòng chữ chung chung. Bạn không thể biết server báo lỗi gì!</p>
            </div>
            <div style="background:var(--bg-surface);border:1px solid #10b981;padding:12px;border-radius:6px;">
              <h4 style="color:#10b981;margin-top:0;">Cờ Hiện Đại: --fail-with-body</h4>
              <p style="font-size:0.8rem;">Bổ sung từ cURL 7.76.0. Khi gặp HTTP $\ge$ 400, cURL <strong>VẪN THOÁT EXIT CODE 22</strong> (bảo vệ CI/CD fail-fast).</p>
              <p style="font-size:0.8rem;color:#10b981;"><strong>ƯU ĐIỂM VƯỢT TRỘI:</strong> cURL bảo toàn nguyên vẹn Message Body JSON ra stdout để ghi log debug hoặc pipe sang <code>jq</code> phân tích mã lỗi!</p>
            </div>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-appb-sec02',
            title: 'Ví dụ 2: Bắt Lỗi HTTP 500 Bằng --fail-with-body Vừa Báo Lỗi Vừa Giữ Nguyên Body',
            minVersion: '7.76.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Chạy với --fail-with-body: lệnh thoát với mã 22 nhưng JSON lỗi vẫn được in ra:\ncurl.exe -sS --fail-with-body "http://127.0.0.1:8789/status/500" || echo "Mã thoát lỗi: $?"',
              powershell: '# Trong PowerShell: kiểm tra mã lỗi $LASTEXITCODE sau khi nhận JSON:\ncurl.exe -sS --fail-with-body "http://127.0.0.1:8789/status/500"\nWrite-Output "Exit Code bắt được: $LASTEXITCODE"',
              cmd: 'curl.exe -sS --fail-with-body "http://127.0.0.1:8789/status/500" || echo Exit Code: %ERRORLEVEL%'
            },
            realOutput: `{\n  "code": 500,\n  "message": "Simulated HTTP status 500",\n  "timestamp": "2026-11-02T16:16:29.083Z"\n}\nExit Code bắt được: 22`,
            explanationTokens: [
              { token: '--fail-with-body', meaning: 'Chỉ thị cho cURL thoát với mã 22 khi gặp HTTP status >= 400 nhưng không xóa body' },
              { token: 'Exit Code: 22', meaning: 'Mã lỗi chuẩn của cURL (CURLE_HTTP_RETURNED_ERROR)' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Nghệ Thuật Chuyển Hướng 3xx: So Sánh 301 vs 302 vs 307 vs 308 Và Cạm Bẫy Đổi Method',
        content: `
          <p>Khi bạn gửi request tới một URL và server phản hồi mã chuyển hướng <code>3xx</code> kèm theo header <code>Location: https://new-site.com</code>:</p>
          <ul>
            <li><strong>Nếu không có cờ <code>-L</code>:</strong> cURL dừng lại ngay lập tức và in ra thông báo redirect HTML của server. Nó KHÔNG tự động chuyển hướng!</li>
            <li><strong>Khi thêm cờ <code>-L</code> (<code>--location</code>):</strong> cURL sẽ tự động đọc header <code>Location</code> và gửi request tiếp theo tới URL mới.</li>
          </ul>

          <h3>Cạm Bẫy Lịch Sử: Tự Ý Chuyển Đổi POST Thành GET!</h3>
          <p>Trong quá khứ, các trình duyệt web và cURL phiên bản cũ khi nhận mã <code>301 Moved Permanently</code> hoặc <code>302 Found</code> thường <strong>tự động chuyển đổi phương thức tiếp theo thành GET</strong> và vứt bỏ toàn bộ payload dữ liệu POST! Điều này gây ra lỗi nghiêm trọng khi bạn gửi form thanh toán hoặc tạo mới tài nguyên.</p>

          <h3>Giải Pháp Hiện Đại: 307 &amp; 308 (Strict Method Preservation)</h3>
          <p>Tổ chức IETF đã ban hành hai mã chuyển hướng hiện đại để giải quyết dứt điểm vấn đề này:</p>
          <ul>
            <li><strong>307 Temporary Redirect:</strong> Chuyển hướng tạm thời, <em>bắt buộc client phải giữ nguyên 100% phương thức gốc</em> (POST vẫn phải là POST).</li>
            <li><strong>308 Permanent Redirect:</strong> Chuyển hướng vĩnh viễn, <em>bắt buộc giữ nguyên phương thức gốc</em>.</li>
          </ul>
          <p>Nếu server cũ của bạn chỉ trả về 301 hoặc 302 mà bạn bắt buộc phải giữ nguyên phương thức POST, hãy trang bị thêm các cờ can thiệp: <strong><code>--post301</code></strong>, <strong><code>--post302</code></strong>, <strong><code>--post303</code></strong>.</p>
        `,
        codeExamples: [
          {
            id: 'ex-appb-sec03',
            title: 'Ví dụ 3: Kiểm Tra Chuỗi Chuyển Hướng Redirect Đầy Đủ Bằng cờ -IL',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Gửi HEAD request và theo dõi toàn bộ chuỗi chuyển hướng:\ncurl.exe -s -IL "http://127.0.0.1:8789/ping" | grep "HTTP/"',
              powershell: '# Trong PowerShell: xem toàn bộ các dòng HTTP status line:\ncurl.exe -s -IL "http://127.0.0.1:8789/ping" | Select-String "HTTP/"',
              cmd: 'curl.exe -s -IL "http://127.0.0.1:8789/ping"'
            },
            realOutput: `HTTP/1.1 200 OK`,
            explanationTokens: [
              { token: '-I', meaning: 'Chỉ lấy Header phản hồi' },
              { token: '-L', meaning: 'Tự động theo dõi header Location nếu server trả về mã chuyển hướng 3xx' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Xử Lý Tự Động Các Mã Đặc Biệt: 304 ETag Caching, 401 Auth Challenge & 429 Rate Limit',
        content: `
          <p>Trong môi trường Production, có 3 mã trạng thái đặc biệt mà mọi kỹ sư DevOps / Backend cần phải xử lý tự động trong kịch bản shell:</p>

          <h3>1. Mã 304 Not Modified (Conditional Caching)</h3>
          <p>Khi bạn gửi kèm header <code>If-None-Match: "etag_hash"</code> (hoặc dùng cờ hiện đại <code>--etag-compare etag.txt</code>), nếu tài nguyên trên máy chủ không có gì thay đổi, server sẽ phản hồi <code>304 Not Modified</code>.</p>
          <p>Server <strong>không gửi bất kỳ byte nội dung nào</strong>, cURL thoát với Exit Code 0 và ứng dụng tái sử dụng ngay bản cache cục bộ, giúp tiết kiệm 95% băng thông và thời gian mạng.</p>

          <h3>2. Mã 401 Unauthorized (Auth Challenge)</h3>
          <p>Khi client chưa cung cấp credentials, server trả về <code>401 Unauthorized</code> kèm header thách thức: <code>WWW-Authenticate: Basic realm="..."</code> hoặc <code>Bearer error="..."</code>.</p>
          <p>Nếu bạn truyền cờ <code>-u user:pass</code>, cURL có thể tự động thực hiện bắt tay gửi header <code>Authorization: Basic ...</code> trong lần request kế tiếp.</p>

          <h3>3. Mã 429 Too Many Requests (Rate Limiting)</h3>
          <p>Khi bạn gọi API vượt quá định mức cho phép (ví dụ: tối đa 60 req/phút), server sẽ chặn đứng với mã <code>429 Too Many Requests</code> và thường kèm theo header <code>Retry-After: 30</code> (yêu cầu chờ 30 giây).</p>
          <p>Nếu bạn tiếp tục spam request, server sẽ nâng mức phạt thành chặn IP (403 Forbidden). Khi kết hợp cờ <code>--retry 3</code>, cURL sẽ <strong>tự động nhận diện header <code>Retry-After</code></strong> và tạm dừng đúng số giây quy định trước khi thử lại!</p>
        `,
        codeExamples: [
          {
            id: 'ex-appb-sec04',
            title: 'Ví dụ 4: Kịch Bản Shell Phân Nhánh Xử Lý Logic Dựa Trên Mã Phản Hồi HTTP',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Phân nhánh hành động theo mã HTTP nhận được bằng Bash:\nCODE=$(curl.exe -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:8789/ping")\nif [ "$CODE" -eq 200 ]; then\n  echo "Dịch vụ hoạt động bình thường (HTTP 200)"\nelse\n  echo "Cảnh báo sự cố: HTTP $CODE"\nfi',
              powershell: '# Phân nhánh logic trong PowerShell:\n$code = curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"\nif ($code -eq "200") {\n  Write-Output "Dịch vụ hoạt động bình thường (HTTP 200)"\n} else {\n  Write-Warning "Cảnh báo sự cố: HTTP $code"\n}',
              cmd: 'curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"'
            },
            realOutput: `Dịch vụ hoạt động bình thường (HTTP 200)`,
            explanationTokens: [
              { token: 'CODE=$(curl ... -w "%{http_code}")', meaning: 'Gán trực tiếp mã trạng thái HTTP vào biến shell để phân nhánh if/else' },
              { token: '[ "$CODE" -eq 200 ]', meaning: 'Kiểm tra điều kiện thành công trước khi thực thi bước deploy tiếp theo' }
            ]
          }
        ]
      }
    ],

    // 6. Cạm bẫy thường gặp & Cảnh báo an ninh (Callouts Box)
    callouts: {
      warning: {
        title: 'CẢNH BÁO: HIỂM HỌA THÀNH CÔNG GIẢ TẠO KHI cURL THOÁT EXIT CODE 0 TRÊN CÁC MÃ LỖI HTTP 4XX/5XX',
        content: 'Sai lầm phổ biến nhất trong kịch bản CI/CD:\nKhi endpoint trả về `404 Not Found` hoặc `500 Internal Server Error`, lệnh `curl https://api.corp/deploy` vẫn thoát với Exit Code 0! Pipeline GitHub Actions coi bước đó là "Passed" và tiếp tục phát hành phiên bản hỏng lên Production.\nBẮT BUỘC: Luôn luôn khai báo cờ `--fail-with-body` trong mọi kịch bản tự động hóa để cURL lập tức báo mã lỗi Exit 22 khi gặp bất kỳ mã HTTP nào $\\ge$ 400!'
      },
      pitfalls: [
        {
          title: 'Nhầm lẫn giữa cờ -f truyền thống và --fail-with-body hiện đại',
          content: 'Khi bạn dùng cờ `-f`, cURL sẽ xóa sạch toàn bộ Message Body trả về từ server. Bạn chỉ nhận được thông báo lỗi chung chung và mất hoàn toàn thông tin chi tiết (ví dụ mã lỗi nghiệp vụ của JSON). Hãy luôn dùng `--fail-with-body` (cURL ≥ 7.76.0).'
        },
        {
          title: 'Bị mất dữ liệu POST khi theo dõi redirect 301/302',
          content: 'Khi nhận redirect 301/302, cURL mặc định sẽ chuyển method thành GET và vứt bỏ payload. Nếu cần giữ nguyên POST, hãy sử dụng cờ `--post301` hoặc yêu cầu backend nâng cấp lên mã chuẩn `307 Temporary Redirect`.'
        },
        {
          title: 'Spam request liên tục khi gặp lỗi 429 Too Many Requests',
          content: 'Khi gặp lỗi 429, nếu bạn dùng vòng lặp thử lại ngay lập tức mà không có khoảng nghỉ (backoff), WAF của server sẽ tự động nâng mức phạt và khóa vĩnh viễn IP của bạn. Hãy đọc header `Retry-After` và tạm dừng thích hợp.'
        },
        {
          title: 'Nhầm lẫn giữa mã lỗi 401 Unauthorized và 403 Forbidden',
          content: 'Mã 401 có nghĩa là "Tôi không biết bạn là ai" (thiếu hoặc sai token xác thực). Mã 403 có nghĩa là "Tôi biết bạn là ai, nhưng bạn không có quyền hạn truy cập tài nguyên này". Gửi lại credentials với 403 sẽ không có tác dụng.'
        },
        {
          title: 'Tưởng rằng mã 304 Not Modified là một lỗi',
          content: 'Mã 304 không phải là lỗi mà là một tín hiệu tối ưu hóa tuyệt vời: Tài nguyên trên server hoàn toàn trùng khớp với bản cache cục bộ của bạn, giúp tiết kiệm 100% dung lượng tải body.'
        }
      ],
      tips: [
        {
          title: 'Trích xuất đồng thời cả HTTP Code và Body chỉ trong 1 câu lệnh',
          content: 'Chạy: `HTTP_CODE=$(curl.exe -s -o response.json -w "%{http_code}" "URL")`. Dữ liệu body được lưu sạch sẽ vào tệp `response.json`, còn biến `$HTTP_CODE` chứa mã trạng thái để bạn phân nhánh logic!'
        },
        {
          title: 'Khám phá URL cuối cùng sau chuỗi chuyển hướng redirect',
          content: 'Dùng: `curl.exe -Ls -o /dev/null -w "%{url_effective}\\n" "URL"`. Biến `%{url_effective}` sẽ in ra chính xác địa chỉ URL đích cuối cùng mà cURL dừng chân.'
        },
        {
          title: 'Tự động kiểm tra HTTP 200 nhanh trong 1 dòng lệnh Bash',
          content: '`[ "$(curl -s -o /dev/null -w "%{http_code}" URL)" -eq 200 ] && echo "OK" || echo "FAIL"`. Rất hữu ích cho các lệnh healthcheck ngắn gọn.'
        }
      ],
      deepDive: {
        title: 'Kiến Trúc Phân Tầng OSI: Tại Sao cURL Coi HTTP 500 Là Thành Công Ở Tầng Transport?',
        content: `
          <p>Tại sao một chương trình truyền tải mạng như cURL lại không xem <code>HTTP 500 Server Error</code> là một lỗi?</p>
          <p>Câu trả lời nằm ở <strong>Mô hình phân tầng mạng (OSI 7 Layers / TCP-IP Model)</strong>:</p>
          <ul>
            <li><strong>Tầng Giao Vận (Layer 4 - Transport Layer):</strong> cURL đã thiết lập socket TCP thành công, bắt tay TLS an toàn và gửi đi gói tin HTTP Request. Máy chủ đích đã nhận được và gửi trả về một gói tin TCP chứa HTTP Response hoàn chỉnh. Về mặt vật lý và mạng, <em>phiên truyền thông đã thành công trọn vẹn 100%</em>. Do đó, mã thoát của tiến trình (Process Exit Code) mặc định là <code>0</code>!</li>
            <li><strong>Tầng Ứng Dụng (Layer 7 - Application Layer):</strong> Bên trong gói tin phản hồi, ứng dụng web (Node.js, Java, Python) gặp sự cố cơ sở dữ liệu và tự chèn con số <code>500</code> vào dòng Status Line đầu tiên (<code>HTTP/1.1 500 Internal Server Error</code>). Con số này là ngữ nghĩa nghiệp vụ của tầng ứng dụng (Application Semantics), không phải lỗi của giao thức mạng!</li>
          </ul>
          <p>Vì cURL là công cụ trung lập tầng mạng, nó không tự ý phán xét nội dung phản hồi trừ khi người dùng ra lệnh rõ ràng bằng các cờ can thiệp tầng ứng dụng như <code>-f</code> hoặc <code>--fail-with-body</code>.</p>
        `
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Trích xuất mã HTTP Status Code và kiểm tra trạng thái dịch vụ',
        problem: 'Viết câu lệnh cURL gửi request tới endpoint `http://127.0.0.1:8789/ping`, không in body ra terminal, sử dụng cờ `-w "%{http_code}"` để xuất mã phản hồi. Xác nhận mã nhận được là 200.',
        criteria: 'Sử dụng đúng cú pháp `-o NUL -w "%{http_code}"`, kết quả in ra là chuỗi 200.',
        hint: 'Dùng `curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"`.',
        starterCommands: {
          bash: 'curl.exe -s -o /dev/null -w "%{http_code}\\n" "http://127.0.0.1:8789/ping"',
          powershell: 'curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"',
          cmd: 'curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -o /dev/null -w "%{http_code}\\n" "http://127.0.0.1:8789/ping"',
            powershell: 'curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"',
            cmd: 'curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"'
          },
          explanation: 'Biến định dạng %{http_code} giúp bóc tách mã phản hồi nhanh chóng mà không cần qua công cụ phân tích văn bản.'
        },
        solutionOutput: `200`
      },
      {
        level: 'Trung bình',
        title: 'Bắt mã lỗi HTTP 500 bằng --fail-with-body và xác nhận Exit Code 22',
        problem: 'Gửi request tới endpoint mô phỏng lỗi `http://127.0.0.1:8789/status/500`. Yêu cầu sử dụng cờ `--fail-with-body` để cURL thoát với mã lỗi Exit 22, đồng thời xác nhận Message Body chứa thông điệp lỗi vẫn được in ra.',
        criteria: 'Lệnh sử dụng cờ `--fail-with-body`, bắt được mã thoát Exit 22 và hiển thị nội dung JSON phản hồi.',
        hint: 'Trong PowerShell kiểm tra `$LASTEXITCODE` sau khi chạy.',
        starterCommands: {
          bash: 'curl.exe -sS --fail-with-body "http://127.0.0.1:8789/status/500" || echo "Exit code: $?"',
          powershell: 'curl.exe -sS --fail-with-body "http://127.0.0.1:8789/status/500"\nWrite-Output "Exit Code: $LASTEXITCODE"',
          cmd: 'curl.exe -sS --fail-with-body "http://127.0.0.1:8789/status/500" || echo Exit Code: %ERRORLEVEL%'
        },
        solution: {
          commands: {
            bash: 'curl.exe -sS --fail-with-body "http://127.0.0.1:8789/status/500" || echo "Exit code: $?"',
            powershell: 'curl.exe -sS --fail-with-body "http://127.0.0.1:8789/status/500"\nWrite-Output "Exit Code: $LASTEXITCODE"',
            cmd: 'curl.exe -sS --fail-with-body "http://127.0.0.1:8789/status/500" || echo Exit Code: %ERRORLEVEL%'
          },
          explanation: 'Cờ --fail-with-body là giải pháp hoàn hảo kết hợp giữa fail-fast tự động hóa và bảo toàn thông tin debug.'
        },
        solutionOutput: `Exit Code: 22`
      },
      {
        level: 'Khó',
        title: 'Xây dựng kịch bản shell phân nhánh logic tự động theo mã HTTP phản hồi',
        problem: 'Viết kịch bản shell kiểm tra endpoint `http://127.0.0.1:8789/ping`. Bóc tách mã HTTP vào biến. Nếu mã là 200, in thông báo `Service hoạt động bình thường`. Nếu mã khác, in cảnh báo lỗi.',
        criteria: 'Sử dụng cấu trúc câu lệnh điều kiện if/else của shell, kiểm tra chính xác giá trị của biến mã HTTP.',
        hint: 'Dùng cú pháp `$code = curl.exe -s -o NUL -w "%{http_code}" ...`.',
        starterCommands: {
          bash: 'CODE=$(curl.exe -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:8789/ping")\nif [ "$CODE" -eq 200 ]; then echo "Service hoạt động bình thường"; fi',
          powershell: '$code = curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"\nif ($code -eq "200") { Write-Output "Service hoạt động bình thường" }',
          cmd: 'curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"'
        },
        solution: {
          commands: {
            bash: 'CODE=$(curl.exe -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:8789/ping")\nif [ "$CODE" -eq 200 ]; then echo "Service hoạt động bình thường"; fi',
            powershell: '$code = curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"\nif ($code -eq "200") { Write-Output "Service hoạt động bình thường" }',
            cmd: 'curl.exe -s -o NUL -w "%{http_code}" "http://127.0.0.1:8789/ping"'
          },
          explanation: 'Kỹ thuật phân nhánh theo mã HTTP status code là nền tảng cho mọi kịch bản Healthcheck Polling và Smoke Test trong CI/CD.'
        },
        solutionOutput: `Service hoạt động bình thường`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Tại sao khi gửi request tới một URL bị lỗi `HTTP 500 Internal Server Error`, câu lệnh `curl.exe URL` mặc định vẫn kết thúc với Exit Code 0 (Thành công)?',
        options: [
          'Vì cURL bị lỗi phần mềm.',
          'Vì cURL hoạt động ở tầng giao vận mạng; khi máy chủ gửi về một HTTP response hoàn chỉnh (dù là mã 500), phiên truyền tải dữ liệu TCP đã thành công trọn vẹn!',
          'Vì mã 500 được xem là thành công trong giao thức HTTP.',
          'Vì cURL tự động sửa lỗi cho máy chủ.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Mã thoát của tiến trình (Exit Code) phản ánh sự toàn vẹn của kết nối mạng. Muốn cURL báo lỗi theo mã HTTP của tầng ứng dụng, bạn bắt buộc phải dùng cờ `--fail-with-body` hoặc `-f`.'
      },
      {
        question: 'Cờ nào của cURL cho phép bạn báo lỗi (Exit Code 22) khi gặp HTTP status ≥ 400 nhưng VẪN in ra Message Body JSON để gỡ lỗi?',
        options: [
          '`--fail` hoặc `-f`',
          '`--fail-with-body`',
          '`--error-body`',
          '`--show-all`'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Cờ `--fail-with-body` (bổ sung từ cURL 7.76.0) vừa giúp script bắt lỗi Exit 22 vừa bảo toàn Message Body, khắc phục nhược điểm nuốt sạch dữ liệu của cờ `-f` truyền thống.'
      },
      {
        question: 'Khi nhận mã chuyển hướng nào sau đây, client BẮT BUỘC phải giữ nguyên phương thức HTTP gốc (POST vẫn là POST) mà không được phép tự ý đổi thành GET?',
        options: [
          '301 Moved Permanently',
          '302 Found',
          '303 See Other',
          '307 Temporary Redirect và 308 Permanent Redirect'
        ],
        optionsHtml: null,
        correctIndex: 3,
        explanation: 'Chuẩn RFC 9110 quy định 307 và 308 là các mã chuyển hướng nghiêm ngặt, cấm client tự ý thay đổi HTTP method như thói quen chuyển thành GET của 301/302.'
      },
      {
        question: 'Khi nhận mã phản hồi `304 Not Modified`, điều gì sẽ diễn ra trong phiên trao đổi dữ liệu của cURL?',
        options: [
          'cURL báo lỗi Exit Code 1.',
          'Server không gửi lại nội dung Message Body; cURL kết thúc thành công (Exit 0) và ứng dụng tái sử dụng bản cache cục bộ, giúp tiết kiệm tối đa băng thông.',
          'cURL tự động xóa file trên đĩa cứng.',
          'cURL tự động chuyển sang giao thức FTP.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Mã 304 là cơ chế Conditional Request thành công: Server xác nhận tài nguyên không đổi so với ETag client gửi lên, không truyền lại body giúp tối ưu hóa mạng.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -s -o /dev/null -w "%{http_code}" "URL"',
        description: 'Trích xuất trực tiếp mã trạng thái HTTP 3 chữ số vào biến shell.'
      },
      {
        command: 'curl.exe -sS --fail-with-body "URL"',
        description: 'Báo lỗi Exit 22 khi gặp HTTP ≥ 400 nhưng bảo toàn nội dung JSON để debug.'
      },
      {
        command: 'curl.exe -L "URL"',
        description: 'Tự động theo dõi chuyển hướng khi server phản hồi mã 3xx (301, 302, 307, 308).'
      },
      {
        command: 'curl.exe -IL "URL"',
        description: 'Kiểm tra toàn bộ chuỗi Header và Status Line qua các bước chuyển hướng redirect.'
      },
      {
        command: 'curl.exe -sS --retry 3 "URL"',
        description: 'Tự động thử lại khi gặp lỗi mạng hoặc 5xx, tự tuân thủ header Retry-After khi gặp 429.'
      },
      {
        command: 'curl.exe --post301 -L -d "data" "URL"',
        description: 'Buộc cURL giữ nguyên phương thức POST sau khi nhận redirect 301 thay vì đổi thành GET.'
      },
      {
        command: 'curl.exe -sS --etag-compare etag.txt "URL"',
        description: 'Gửi conditional request If-None-Match nhận HTTP 304 Not Modified tiết kiệm dữ liệu.'
      },
      {
        command: 'HTTP_CODE=$(curl.exe -s -o body.json -w "%{http_code}" "URL")',
        description: 'Lưu body ra file và trích xuất mã HTTP vào biến shell chỉ trong 1 câu lệnh duy nhất.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'Phân biệt 5 dải mã HTTP: 1xx (Thông tin), 2xx (Thành công), 3xx (Chuyển hướng), 4xx (Lỗi client), 5xx (Lỗi server).',
      'Hiểu rõ sự khác biệt giữa Exit Code mạng và HTTP Status: cURL mặc định thoát Exit 0 khi nhận phản hồi hoàn tất; LUÔN dùng cờ `--fail-with-body` trong CI/CD để bắt lỗi Exit 22.',
      'Làm chủ cơ chế chuyển hướng: Dùng cờ `-L` để theo dõi redirect, ưu tiên chuẩn 307/308 để bảo toàn phương thức POST, hoặc dùng `--post301/302` khi làm việc với hệ thống cũ.',
      'Tối ưu hóa tài nguyên với 304 Not Modified: Khai thác Conditional Request ETag để giảm 95% thời gian và dung lượng truyền dữ liệu.',
      'Tự động hóa thông minh với 429 Rate Limit: Tuân thủ header `Retry-After` và sử dụng cờ `--retry` để tránh bị WAF khóa địa chỉ IP.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'RFC 9110: HTTP Semantics - Status Codes Registry',
        url: 'https://www.rfc-editor.org/rfc/rfc9110#section-15',
        description: 'Đặc tả kỹ thuật chính thức và toàn diện nhất của tổ chức IETF về toàn bộ các mã trạng thái HTTP.'
      },
      {
        title: 'MDN Web Docs: HTTP Response Status Codes',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
        description: 'Tài liệu hướng dẫn trực quan, chi tiết và chuẩn mực của Mozilla về ý nghĩa từng mã phản hồi HTTP.'
      },
      {
        title: 'Daniel Stenberg: Everything curl - Returns & Exit Status',
        url: 'https://everything.curl.dev/usingcurl/returns',
        description: 'Chương sách phân tích chi tiết mối quan hệ giữa mã thoát của cURL CLI và mã phản hồi HTTP của server.'
      },
      {
        title: 'IANA: Hypertext Transfer Protocol (HTTP) Status Code Registry',
        url: 'https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml',
        description: 'Bảng danh mục chính thức của IANA liệt kê toàn bộ các mã trạng thái HTTP được công nhận toàn cầu.'
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
          issue: 'Hiểm họa thành công giả tạo khi cURL thoát Exit 0 trên các mã lỗi HTTP 4xx và 5xx trong CI/CD',
          severity: 'Critical',
          resolution: 'Đã xây dựng Hộp Cảnh báo và phân tích sâu trong Lớp 2, hướng dẫn bắt buộc dùng --fail-with-body'
        },
        {
          issue: 'Cờ -f truyền thống nuốt sạch Message Body JSON khiến kỹ sư không thể debug nguyên nhân lỗi',
          severity: 'Major',
          resolution: 'Đã phân tích đối chiếu giữa -f và --fail-with-body trong Lớp 2 và Ví dụ 2'
        },
        {
          issue: 'Mất payload dữ liệu POST khi redirect 301/302 do cURL tự động chuyển đổi thành GET',
          severity: 'Major',
          resolution: 'Đã phân tích chuẩn 307/308 và hướng dẫn các cờ can thiệp --post301/302 trong Lớp 3'
        },
        {
          issue: 'Bị WAF chặn IP vĩnh viễn do spam request liên tục khi gặp lỗi 429 Too Many Requests',
          severity: 'Major',
          resolution: 'Đã hướng dẫn cơ chế tuân thủ header Retry-After kết hợp với cờ --retry trong Lớp 4'
        },
        {
          issue: 'Hiểu nhầm mã 304 Not Modified là một lỗi khiến kịch bản shell dừng đột ngột',
          severity: 'Minor',
          resolution: 'Đã phân tích bản chất Conditional Caching của mã 304 trong danh mục Cạm bẫy và Lớp 4'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://www.rfc-editor.org/rfc/rfc9110#section-15',
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
        'https://everything.curl.dev/usingcurl/returns'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_APP_B_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
