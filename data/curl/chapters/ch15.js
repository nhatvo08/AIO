/**
 * Chương 15: Caching Nâng Cao: ETag, --etag-save, --etag-compare & Tiết Kiệm Băng Thông (data/curl/chapters/ch15.js)
 * Cấp độ: Chuyên sâu | Thời lượng: ~30 phút | cURL tối thiểu: 7.68.0 (--etag-save/--etag-compare ≥ 7.68.0, --compressed ≥ 7.10.0)
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch15',
    meta: {
      id: 'ch15',
      order: 15,
      title: 'Caching Nâng Cao: ETag, --etag-save, --etag-compare & Tiết Kiệm Băng Thông',
      level: 'Chuyên sâu',
      curlMinVersion: '7.68.0',
      qaStatus: 'verified'
    },
    partId: 'level-3',
    partTitle: 'Cấp độ 3: Chuyên Sâu & Production Hardening',
    number: '15',
    title: 'Caching Nâng Cao: ETag, --etag-save, --etag-compare & Tiết Kiệm Băng Thông',
    subtitle: 'Làm chủ cơ chế Conditional Requests (ETag, Last-Modified), tự động hóa quản lý cache bằng --etag-save & --etag-compare (cURL ≥ 7.68.0), nén dữ liệu với --compressed và tối ưu 90% chi phí băng thông',
    level: 'Chuyên sâu',
    duration: '30 phút',
    curlMinVersion: '7.68.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Nắm vững kiến trúc Conditional Request (RFC 9110 / RFC 9111), hiểu sâu vòng đời của các header điều khiển cache (`Cache-Control`, `ETag`, `Last-Modified`) và ngữ nghĩa của phản hồi `304 Not Modified`.',
      'Phân biệt sự khác biệt kỹ thuật giữa Strong ETag (`"hash123"`) và Weak ETag (`W/"hash123"`), đồng thời hiểu lý do tại sao ETag vượt trội hơn `Last-Modified` (loại bỏ vấn đề sai lệch đồng hồ và độ phân giải 1 giây).',
      'Tự động hóa lưu trữ và so khớp ETag bằng hai cờ hiện đại `--etag-save <file>` và `--etag-compare <file>` (cURL ≥ 7.68.0), loại bỏ hoàn toàn việc bóc tách chuỗi header thủ công phức tạp.',
      'Khai thác tính năng nén dữ liệu trong suốt với cờ `--compressed` (hỗ trợ Gzip, Deflate, Brotli, Zstandard), hiểu cơ chế đàm phán `Accept-Encoding` và tự động giải nén dữ liệu an toàn về máy khách.',
      'Phòng tránh cạm bẫy chết người: Ghi đè file dữ liệu thành 0 bytes rỗng khi nhận phản hồi HTTP 304 kết hợp cờ `-o`, và xây dựng workflow đồng bộ dữ liệu thông minh trong CI/CD tiết kiệm 90% băng thông.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành Chương 03 (Kiến Thức HTTP Cần Có Để Làm Chủ cURL: Message, Headers, Status Codes) và Chương 09 (Download, Upload File Lớn, Streaming SSE & Giới Hạn WebSocket).',
      'Hiểu rõ cơ chế hoạt động của Web Cache: Phân biệt giữa Cache lưu trữ cục bộ tại máy khách (Client Cache) và Cache trung gian (Reverse Proxy, CDN, Edge Server).'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Vân tay kỹ thuật số, con dấu ngày tháng và chiếc hộp nén chân không',
      metaphor: 'Hãy hình dung bạn là một nhà nghiên cứu cần đọc cuốn bách khoa toàn thư tại thư viện quốc gia mỗi sáng:\n\n* Cách ngây thơ (Không dùng Cache): Mỗi sáng bạn đều bắt thủ thư photocopy lại toàn bộ 1.000 trang sách và mang về nhà, dù hôm qua và hôm nay cuốn sách không đổi lấy một chữ! Điều này làm hao tốn giấy mực của thư viện (tài nguyên CPU/Database server) và bạn phải xách một ba lô nặng trĩu (băng thông mạng).\n\n* Xác thực theo ngày tháng (If-Modified-Since / Last-Modified): Bạn hỏi: "Sách có sửa gì sau 5 giờ chiều hôm qua không?". Thủ thư nhìn con dấu ngày tháng. Cách này tốt, nhưng đồng hồ có thể bị sai lệch múi giờ, hoặc ai đó vô tình bấm Save lại file mà nội dung không đổi (False Invalidation).\n\n* Vân tay kỹ thuật số ETag (If-None-Match): Mỗi khi nội dung thay đổi, thủ thư tính ra một mã "dấu vân tay" duy nhất (Hash MD5 hoặc SHA) dán lên gáy sách. Sáng nay bạn chỉ cần giơ tấm thẻ ghi mã hôm qua: "Tôi đang giữ bản \'v1.4.2\', bên trong có đổi không?". Nếu vân tay trùng khớp, thủ thư chỉ cần gật đầu: 304 Not Modified - không tốn một tờ giấy nào, bạn an tâm dùng lại cuốn sách ở nhà!\n\n* Cặp cờ tự động hóa --etag-save & --etag-compare (cURL ≥ 7.68.0): Trước đây, bạn phải tự lấy kính lúp soi header để chép mã ETag vào sổ tay. Giờ đây, cURL tự động ghi vân tay vào tệp etag.txt và lần sau tự động rút thẻ ra so khớp. Bạn chỉ việc gọi đúng 1 dòng lệnh duy nhất!\n\n* Hộp nén chân không --compressed: Nếu sách thực sự có nội dung mới, thủ thư hút chân không cuốn sách (nén Gzip/Brotli) để kích thước thu nhỏ chỉ còn 20%, truyền qua đường dây mạng trong chớp mắt và cURL tự động bung ra nguyên vẹn khi về tới ổ cứng.',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:14px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">VÒNG ĐỜI CONDITIONAL REQUEST &amp; TIẾT KIỆM BĂNG THÔNG</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#38bdf8;font-weight:700;margin-bottom:4px;">1. Lần đầu: Tải đầy đủ (Cold Request)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.5;">
                Client &rarr; GET /data.json<br/>
                Server &rarr; <span style="color:#10b981;font-weight:600;">HTTP 200 OK</span><br/>
                Header: <code>ETag: "hash-99a"</code><br/>
                Body: 100 KB payload tải về máy.<br/>
                cURL: Lưu ETag vào <code>etag.txt</code>.
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid rgba(16,185,129,0.3);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;margin-bottom:4px;">2. Lần sau: So khớp ETag (Conditional)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.5;">
                Client &rarr; GET /data.json + <code>If-None-Match: "hash-99a"</code><br/>
                Server &rarr; <span style="color:#38bdf8;font-weight:600;">HTTP 304 Not Modified</span><br/>
                Body: <strong style="color:#10b981;">0 BYTES (Không truyền body)</strong><br/>
                &check; Tiết kiệm 100% băng thông tải!
              </div>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '--etag-save',
        longFlag: '--etag-save <file>',
        description: 'Trích xuất header ETag từ HTTP response và lưu vào tệp chỉ định (cURL ≥ 7.68.0).',
        minVersion: '7.68.0'
      },
      {
        flag: '--etag-compare',
        longFlag: '--etag-compare <file>',
        description: 'Đọc ETag từ tệp và tự động gắn header `If-None-Match: <etag>` vào request kế tiếp (cURL ≥ 7.68.0).',
        minVersion: '7.68.0'
      },
      {
        flag: '-z',
        longFlag: '--time-cond <time|file>',
        description: 'Gửi request có điều kiện theo thời gian sửa đổi (tự động thêm header `If-Modified-Since` hoặc so sánh với mtime của file cục bộ).',
        minVersion: '7.1.0'
      },
      {
        flag: '--compressed',
        longFlag: '--compressed',
        description: 'Yêu cầu máy chủ nén response (`Accept-Encoding: deflate, gzip, br, zstd`) và tự động giải nén trong suốt về máy khách.',
        minVersion: '7.10.0'
      },
      {
        flag: '-i',
        longFlag: '--include',
        description: 'In cả các dòng HTTP response headers kèm theo body để quan sát các header cache (`ETag`, `Cache-Control`, `Age`).',
        minVersion: '7.0.0'
      },
      {
        flag: '-H',
        longFlag: '--header "If-None-Match: <etag>"',
        description: 'Gắn thủ công header kiểm tra ETag trong trường hợp sử dụng các phiên bản cURL cũ (< 7.68.0).',
        minVersion: '7.0.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Bản Chất Conditional Request: HTTP 304 Not Modified & Cặp Header If-None-Match / ETag',
        content: `
          <p>Trong giao thức HTTP (RFC 9110 và RFC 9111), <strong>Conditional Request</strong> (Yêu cầu có điều kiện) là cơ chế cho phép máy khách hỏi máy chủ: <em>"Dữ liệu này tôi đã có một bản copy rồi, liệu nó có bị thay đổi kể từ lần cuối tôi lấy không?"</em></p>

          <h3>Mã Phản Hồi HTTP 304 Not Modified Hoạt Động Ra Sao?</h3>
          <p>Khi máy chủ nhận được một conditional request và xác định rằng tài nguyên trên máy chủ không có gì thay đổi:</p>
          <ul>
            <li>Máy chủ trả về mã trạng thái <strong><code>HTTP/1.1 304 Not Modified</code></strong>.</li>
            <li>Theo đặc tả RFC, phản hồi 304 <strong>TUYỆT ĐỐI KHÔNG CÓ MESSAGE BODY</strong> (Content-Length = 0 hoặc bị bỏ qua).</li>
            <li>Client nhận được tín hiệu này sẽ hiểu ngay rằng bản cache trên đĩa cứng cục bộ vẫn hoàn toàn tươi mới (Fresh) và tái sử dụng nó, giúp tiết kiệm 100% dung lượng payload truyền qua dây mạng!</li>
          </ul>

          <h3>Phân Biệt Strong ETag vs Weak ETag</h3>
          <p>Header <code>ETag</code> (Entity Tag) là một chuỗi định danh duy nhất đại diện cho trạng thái nội dung của tài nguyên:</p>
          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Loại ETag</th>
                  <th>Cú pháp hiển thị</th>
                  <th>Bản chất kỹ thuật</th>
                  <th>Trường hợp áp dụng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Strong ETag</strong></td>
                  <td><code>"v1.4.2-mock-hash"</code></td>
                  <td>Đảm bảo từng byte nhị phân của tài nguyên giống nhau 100%. Thường là mã băm MD5 hoặc SHA-256 của nội dung file.</td>
                  <td>Bắt buộc khi tải file nhị phân, resume file dở với Range request.</td>
                </tr>
                <tr>
                  <td><strong>Weak ETag</strong></td>
                  <td><code>W/"6ae110f4-1f6"</code></td>
                  <td>Bắt đầu bằng tiền tố <code>W/</code>. Chỉ đảm bảo hai bản ghi tương đương nhau về mặt ngữ nghĩa (Semantically equivalent), có thể khác biệt nhỏ về định dạng hoặc nén.</td>
                  <td>Thích hợp cho các trang HTML động, feed JSON/XML.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch15-sec01',
            title: 'Ví dụ 1: Gửi Conditional Request Thủ Công Nhận Về HTTP 304 Not Modified',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Gửi header If-None-Match đối chiếu ETag với mock server:\ncurl.exe -s -i -H \'If-None-Match: "v1.4.2-mock-hash"\' "http://127.0.0.1:8789/cache"',
              powershell: '# Trong PowerShell, escape dấu nháy kép bên trong giá trị header:\ncurl.exe -s -i -H \'If-None-Match: \"v1.4.2-mock-hash\"\' "http://127.0.0.1:8789/cache"',
              cmd: 'REM Trên Windows CMD:\ncurl.exe -s -i -H "If-None-Match: \\"v1.4.2-mock-hash\\"" "http://127.0.0.1:8789/cache"'
            },
            realOutput: `HTTP/1.1 304 Not Modified\nETag: "v1.4.2-mock-hash"\nLast-Modified: Tue, 01 Nov 2026 12:00:00 GMT\nConnection: keep-alive\nKeep-Alive: timeout=5`,
            explanationTokens: [
              { token: 'HTTP/1.1 304 Not Modified', meaning: 'Máy chủ xác nhận nội dung không thay đổi so với ETag mà client cung cấp' },
              { token: 'If-None-Match: "v1.4.2-mock-hash"', meaning: 'Header điều kiện gửi kèm dấu vân tay tài nguyên hiện có ở máy khách' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Tự Động Hóa Quản Lý Cache Với Cờ Đột Phá --etag-save & --etag-compare (cURL ≥ 7.68.0)',
        content: `
          <p>Trước phiên bản cURL 7.68.0, việc quản lý ETag bằng dòng lệnh vô cùng cực nhọc: Bạn phải chạy <code>curl -I</code>, dùng lệnh <code>grep</code> hoặc <code>sed</code> để cắt chuỗi ETag, lưu vào biến môi trường, rồi truyền lại bằng <code>-H "If-None-Match: ..."</code>. Quy trình này dễ gãy và phụ thuộc vào hệ điều hành.</p>

          <h3>Bộ Đôi Cờ Hiện Đại: <code>--etag-save</code> &amp; <code>--etag-compare</code></h3>
          <p>Kể từ phiên bản <strong>7.68.0</strong> (Tháng 1/2020), cURL bổ sung hai cờ chuyên biệt giúp tự động hóa 100% vòng đời của ETag:</p>
          <ol>
            <li><strong>Lần request đầu tiên:</strong> Thêm cờ <code>--etag-save &lt;file&gt;</code>.<br/>
              <code>curl.exe -s --etag-save etag.txt "http://api.corp/data" -o data.json</code><br/>
              cURL nhận response, tự động bóc tách header <code>ETag</code> từ phản hồi của server và ghi giá trị sạch sẽ vào tệp <code>etag.txt</code>.</li>
            <li><strong>Các lần request kế tiếp:</strong> Kết hợp cả <code>--etag-compare &lt;file&gt;</code> và <code>--etag-save &lt;file&gt;</code>.<br/>
              <code>curl.exe -s --etag-compare etag.txt --etag-save etag.txt "http://api.corp/data"</code><br/>
              cURL đọc giá trị từ <code>etag.txt</code>, tự động gắn header <code>If-None-Match</code> gửi lên server.
              <ul>
                <li>Nếu server trả về <strong>304 Not Modified</strong>: cURL dừng lại ngay, không tải body, bảo toàn dữ liệu cũ!</li>
                <li>Nếu dữ liệu trên server có cập nhật mới (<strong>HTTP 200 OK</strong>): cURL tải payload mới về và tự động ghi đè mã ETag mới nhất vào <code>etag.txt</code>!</li>
              </ul>
            </li>
          </ol>
        `,
        codeExamples: [
          {
            id: 'ex-ch15-sec02',
            title: 'Ví dụ 2: Quy Trình Cache Hai Chiều Tự Động Với --etag-save Và --etag-compare',
            minVersion: '7.68.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Bước 1: Request đầu tiên lưu ETag vào etag.txt:\ncurl.exe -s --etag-save etag.txt "http://127.0.0.1:8789/cache" -o data.json\n\n# Bước 2: Request kế tiếp tự động so khớp ETag (nhận về 304):\ncurl.exe -s -i --etag-compare etag.txt --etag-save etag.txt "http://127.0.0.1:8789/cache"',
              powershell: '# Bước 1: Lưu ETag vào file:\ncurl.exe -s --etag-save etag.txt "http://127.0.0.1:8789/cache" -o data.json\n\n# Bước 2: So khớp ETag tự động bằng PowerShell:\ncurl.exe -s -i --etag-compare etag.txt --etag-save etag.txt "http://127.0.0.1:8789/cache"',
              cmd: 'REM Quy trình lưu và so khớp ETag tự động trên Windows:\ncurl.exe -s --etag-save etag.txt "http://127.0.0.1:8789/cache" -o data.json\ncurl.exe -s -i --etag-compare etag.txt --etag-save etag.txt "http://127.0.0.1:8789/cache"'
            },
            realOutput: `HTTP/1.1 304 Not Modified\nETag: "v1.4.2-mock-hash"\nLast-Modified: Tue, 01 Nov 2026 12:00:00 GMT\nConnection: keep-alive`,
            explanationTokens: [
              { token: '--etag-save etag.txt', meaning: 'Tự động trích xuất và lưu ETag nhận được vào tệp etag.txt' },
              { token: '--etag-compare etag.txt', meaning: 'Đọc ETag từ tệp và tự động gắn header If-None-Match mà không cần gõ -H' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Điều Kiện Theo Thời Gian Với Cờ -z (--time-cond) & Cạm Bẫy So Sánh Timestamp',
        content: `
          <p>Ngoài cơ chế kiểm tra theo mã băm ETag, cURL cung cấp cờ cổ điển <strong><code>-z</code> (hoặc <code>--time-cond</code>)</strong> để gửi conditional request dựa trên mốc thời gian sửa đổi (Header <code>Last-Modified</code> và <code>If-Modified-Since</code>).</p>

          <h3>Hai Cách Dùng Phổ Biến Của Cờ <code>-z</code></h3>
          <ol>
            <li><strong>Truyền chuỗi ngày tháng trực tiếp:</strong><br/>
              <code>curl.exe -z "Tue, 01 Nov 2026 12:00:00 GMT" "http://api.corp/report.pdf" -o report.pdf</code><br/>
              cURL chỉ tải file nếu trên máy chủ có bản cập nhật mới hơn mốc thời gian này.</li>
            <li><strong>Truyền tệp tin đối chiếu (File-based Comparison):</strong><br/>
              <code>curl.exe -z local_report.pdf "http://api.corp/report.pdf" -o local_report.pdf</code><br/>
              cURL tự động đọc thuộc tính ngày giờ sửa đổi (mtime - Modified Time) của file <code>local_report.pdf</code> trên đĩa cứng và gắn vào header <code>If-Modified-Since</code>. Nếu server chưa có file mới hơn, cURL không tải lại!</li>
          </ol>

          <h3>Tại Sao ETag Luôn Vượt Trội Hơn So Với <code>-z</code>?</h3>
          <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);padding:12px;border-radius:6px;margin:10px 0;">
            <ul>
              <li><strong>Giới hạn độ phân giải 1 giây (1-second resolution):</strong> Timestamp HTTP chỉ lưu đến hàng giây. Nếu một tài nguyên thay đổi 3 lần trong cùng 1 giây (như microservice xử lý luồng giao dịch), <code>If-Modified-Since</code> hoàn toàn bất lực!</li>
              <li><strong>Lệch đồng hồ (Clock Skew):</strong> Nếu máy chủ client và server lệch nhau vài giây do chưa đồng bộ NTP, việc so sánh ngày tháng sẽ dẫn đến phán đoán sai lầm.</li>
              <li><strong>Triển khai lại (Re-deployment Invalidation):</strong> Khi bạn chạy lại pipeline CI/CD hoặc <code>git clone</code>, timestamp của file bị đổi mới dù nội dung không đổi một byte. ETag dựa trên hàm băm nội dung (Content Hash) nên miễn nhiễm hoàn toàn với vấn đề này.</li>
            </ul>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch15-sec03',
            title: 'Ví dụ 3: Chỉ Tải File Khi Máy Chủ Có Cập Nhật Mới Bằng Cờ Đối Chiếu Thời Gian -z',
            minVersion: '7.1.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Gửi yêu cầu kiểm tra thời gian sửa đổi với cờ -z:\ncurl.exe -s -i -z "Tue, 01 Nov 2026 12:00:00 GMT" "http://127.0.0.1:8789/cache"',
              powershell: '# Kiểm tra conditional timestamp trong PowerShell:\ncurl.exe -s -i -z "Tue, 01 Nov 2026 12:00:00 GMT" "http://127.0.0.1:8789/cache"',
              cmd: 'REM Kiểm tra thời gian trên Windows CMD:\ncurl.exe -s -i -z "Tue, 01 Nov 2026 12:00:00 GMT" "http://127.0.0.1:8789/cache"'
            },
            realOutput: `HTTP/1.1 304 Not Modified\nETag: "v1.4.2-mock-hash"\nLast-Modified: Tue, 01 Nov 2026 12:00:00 GMT\nConnection: keep-alive`,
            explanationTokens: [
              { token: '-z "Tue, 01 Nov 2026..."', meaning: 'Chỉ thị cho cURL gắn header If-Modified-Since với thời điểm chỉ định' },
              { token: 'HTTP/1.1 304 Not Modified', meaning: 'Máy chủ thông báo tệp tin không có thay đổi nào kể từ thời điểm trên' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Tối Ưu Tối Thượng Với --compressed: Nén Dữ Liệu Trong Suốt (Gzip, Brotli, Zstandard)',
        content: `
          <p>Khi dữ liệu trên máy chủ thực sự có thay đổi và bắt buộc phải tải về (HTTP 200), làm sao để tối ưu chi phí truyền tải đến mức tối đa? Câu trả lời là <strong>Nén Dữ Liệu Trong Suốt (Transparent HTTP Compression)</strong>.</p>

          <h3>Cờ Ma Thuật <code>--compressed</code></h3>
          <p>Khi bạn thêm cờ <code>--compressed</code> vào lệnh cURL:</p>
          <ol>
            <li>cURL tự động đính kèm header <code>Accept-Encoding: deflate, gzip, br, zstd</code> (tùy thuộc vào các thuật toán nén được hỗ trợ trong bản build libcurl của bạn).</li>
            <li>Máy chủ web phát hiện client hỗ trợ nén, sẽ nén toàn bộ body trước khi truyền qua mạng (ví dụ nén Gzip giảm 70%, Brotli giảm tới 85% dung lượng đối với JSON/HTML/CSS).</li>
            <li>Khi các byte nhị phân nén về tới máy, <strong>cURL tự động giải nén trong bộ nhớ</strong> và trả về dữ liệu văn bản thuần ban đầu cho terminal hoặc file xuất ra. Bạn không cần phải chạy thêm lệnh <code>gunzip</code> hay bất kỳ công cụ ngoài nào!</li>
          </ol>

          <h3>Cạm Bẫy Khi Tự Gõ Thủ Công <code>-H "Accept-Encoding: gzip"</code></h3>
          <div style="background:var(--bg-surface);border-left:4px solid #ef4444;padding:12px;margin:12px 0;border-radius:0 6px 6px 0;">
            <p><strong>CẢNH BÁO SAI LẦM PHỔ BIẾN:</strong> Nhiều lập trình viên tự gõ <code>curl -H "Accept-Encoding: gzip" https://api.com/data.json</code>.</p>
            <p>Hậu quả: Máy chủ gửi về stream nhị phân nén Gzip. Nhưng vì bạn không dùng cờ <code>--compressed</code>, cURL <strong>không hề biết bạn muốn giải nén</strong>! cURL in thẳng toàn bộ chuỗi byte nhị phân rác ra màn hình terminal, làm đơ giao diện điều khiển hoặc làm hỏng lệnh pipe sang <code>jq</code>. Hãy LUÔN dùng cờ chuẩn <strong><code>--compressed</code></strong> thay vì tự gõ header!</p>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch15-sec04',
            title: 'Ví dụ 4: Nén Dữ Liệu Trong Suốt Bằng Cờ --compressed Giảm 80% Kích Thước Truyền',
            minVersion: '7.10.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Yêu cầu nén trong suốt và tự động giải nén:\ncurl.exe -s --compressed "http://127.0.0.1:8789/gzip"\n\n# Quan sát header Content-Encoding bằng cờ -i:\ncurl.exe -s -i --compressed "http://127.0.0.1:8789/gzip"',
              powershell: '# Kiểm tra nén dữ liệu trong suốt trong PowerShell:\ncurl.exe -s --compressed "http://127.0.0.1:8789/gzip"\ncurl.exe -s -i --compressed "http://127.0.0.1:8789/gzip"',
              cmd: 'REM Kiểm tra nén trong suốt trên Windows CMD:\ncurl.exe -s --compressed "http://127.0.0.1:8789/gzip"'
            },
            realOutput: `HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Encoding: gzip\nVary: Accept-Encoding\nConnection: keep-alive\n\n{\n  "message": "This is a compressed payload with gzip",\n  "size": 1024\n}`,
            explanationTokens: [
              { token: '--compressed', meaning: 'Tự động gửi Accept-Encoding và giải nén dữ liệu trong suốt về dạng văn bản thuần' },
              { token: 'Content-Encoding: gzip', meaning: 'Máy chủ xác nhận nội dung payload đã được nén trước khi truyền tải qua mạng' }
            ]
          }
        ]
      }
    ],

    // 6. Cạm bẫy thường gặp & Cảnh báo an ninh (Callouts Box)
    callouts: {
      warning: {
        title: 'CẢNH BÁO AN NINH & TÍNH TOÀN VẸN: CẠM BẪY GHI ĐÈ FILE RỖNG KHI NHẬN HTTP 304',
        content: 'Một cạm bẫy phá hoại dữ liệu cực kỳ nguy hiểm trong script tự động hóa:\nNếu bạn viết lệnh: `curl.exe -s -H "If-None-Match: ..." https://api.com/data.json -o data.json`.\nKhi dữ liệu không đổi, server trả về mã `HTTP 304 Not Modified` với BODY HOÀN TOÀN RỖNG (0 byte). Lệnh cURL với cờ `-o` sẽ mở tệp `data.json` và GHI ĐÈ FILE HIỆN CÓ THÀNH TỆP RỖNG 0 BYTE!\nToàn bộ dữ liệu bạn đã dày công lưu trữ trước đó sẽ biến mất hoàn toàn. Khắc phục: Sử dụng cờ hiện đại `--etag-compare` kết hợp `--etag-save` của cURL ≥ 7.68.0 (cURL sẽ tự động bảo toàn file cũ khi gặp 304), hoặc kiểm tra mã HTTP status bằng `-w "%{http_code}"` trước khi ghi file.'
      },
      pitfalls: [
        {
          title: 'Tự thêm header -H "Accept-Encoding: gzip" mà quên cờ --compressed',
          content: 'Nếu bạn tự thêm header mà không dùng cờ `--compressed`, cURL sẽ coi phản hồi là một luồng nhị phân thông thường và không giải nén, khiến terminal bị tràn ngập ký tự rác hoặc parser JSON bị sập ngay lập tức.'
        },
        {
          title: 'Thoát dấu nháy kép của ETag sai cách trên PowerShell hoặc CMD',
          content: 'Giá trị ETag chuẩn HTTP luôn nằm trong cặp ngoặc kép (ví dụ: `"v1.4.2"`). Khi truyền thủ công trên PowerShell, nếu bạn viết `-H \'If-None-Match: "v1.4.2"\'`, PowerShell có thể nuốt mất dấu nháy kép bên trong. Cần viết chuẩn: `-H \'If-None-Match: \\"v1.4.2\\"\'`.'
        },
        {
          title: 'Hiểu sai ý nghĩa của chỉ thị Cache-Control: no-cache',
          content: 'Rất nhiều người hiểu nhầm `no-cache` là cấm lưu trữ cache. Thực tế, `no-cache` vẫn cho phép lưu cache, nhưng bắt buộc client phải gửi conditional request (revalidate bằng ETag hoặc Last-Modified) trước khi sử dụng. Nếu muốn cấm hoàn toàn không lưu cache, máy chủ phải trả về `Cache-Control: no-store`.'
        },
        {
          title: 'Nhầm lẫn giữa Weak ETag và Strong ETag khi thực hiện Byte-Range requests',
          content: 'Chuẩn HTTP quy định rằng bạn không thể sử dụng Weak ETag (bắt đầu bằng `W/`) cho các request tải dở dứt đoạn (Byte-Range với cờ `-r` hoặc `-C`). Range requests bắt buộc phải có Strong ETag để đảm bảo từng byte tải về khớp chuẩn xác.'
        },
        {
          title: 'Quên đường dẫn tương đối khi lưu và đọc tệp etag.txt trong Cronjob',
          content: 'Khi chạy cURL qua Cronjob hoặc CI/CD runner, thư mục làm việc (working directory) có thể khác với thư mục chứa script. Hãy luôn chỉ định đường dẫn tuyệt đối cho cờ `--etag-save /tmp/api_etag.txt` để tránh lỗi không tìm thấy file cache.'
        }
      ],
      tips: [
        {
          title: 'Kiểm tra nhanh xem website có hỗ trợ nén Brotli (br) siêu tốc hay không',
          content: 'Chạy lệnh: `curl.exe -s -i --compressed "https://cloudflare.com" | grep -i "content-encoding"`. Nếu kết quả là `content-encoding: br`, máy chủ hỗ trợ thuật toán Brotli tiên tiến của Google, giúp nén tốt hơn Gzip 20-30%.'
        },
        {
          title: 'Xây dựng script đồng bộ dữ liệu thông minh trong Bash/PowerShell',
          content: 'Kết hợp cờ `-w "%{http_code}"` để chỉ thực hiện tác vụ nặng khi có dữ liệu mới: `CODE=$(curl -s -o /tmp/temp.json -w "%{http_code}" --etag-compare etag.txt --etag-save etag.txt URL); if [ "$CODE" = "200" ]; then mv /tmp/temp.json data.json; fi`.'
        },
        {
          title: 'Tự động dọn dẹp file ETag cũ khi cần làm mới toàn bộ bộ nhớ đệm',
          content: 'Khi muốn ép cURL tải lại dữ liệu mới bất kể trạng thái cache, chỉ cần xóa file `etag.txt` trước khi chạy lệnh. cURL sẽ không gửi `If-None-Match` và thực hiện một Cold Request tải trọn vẹn dữ liệu.'
        }
      ],
      deepDive: {
        title: 'Kiến Trúc Thuật Toán ETag: Cách Nginx, Apache Và Cloudflare Sinh ETag Dưới Tầng Cốt Lõi',
        content: `
          <p>Có bao giờ bạn tự hỏi một chuỗi ETag bí ẩn như <code>"6ae110f4-1f6"</code> thực chất được sinh ra từ đâu?</p>
          <ul>
            <li><strong>Thuật toán ETag mặc định của Nginx:</strong> Nginx không đọc toàn bộ file để tính mã băm MD5 (vì sẽ gây nghẽn I/O ổ cứng với file lớn). Thay vào đó, Nginx sinh ETag bằng cách ghép hai số Hexadecimal: <code>&lt;Last-Modified-Time-Hex&gt;-&lt;Content-Length-Hex&gt;</code>. Ví dụ: thời gian sửa đổi hex là <code>6ae110f4</code> và kích thước file hex là <code>1f6</code> (502 bytes) &rarr; ETag sẽ là <code>"6ae110f4-1f6"</code>.</li>
            <li><strong>Vấn đề ETag khi chạy cụm Multi-Server (Load Balancer):</strong> Nếu hai máy chủ web Nginx cùng phục vụ một website nhưng có mtime của file lệch nhau vài mili-giây (do rsync hoặc git clone khác thời điểm), chúng sẽ sinh ra <strong>hai mã ETag khác nhau cho cùng một file</strong>! Khi client gửi conditional request qua Load Balancer, nếu request chạm vào server khác, server đó sẽ tưởng file đã đổi và trả về 200 OK thay vì 304 Not Modified.</li>
            <li><strong>Giải pháp của các hệ thống CDN hiện đại (Cloudflare/Fastly):</strong> Các CDN hiện đại ghi đè ETag thành mã băm mật mã học (Cryptographic Hash) dựa trên chính xác nội dung dữ liệu (Content-based Hash), đảm bảo mọi node trên toàn cầu đều trả về cùng một ETag nhất quán.</li>
          </ul>
        `
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Gửi Conditional Request bằng cờ -H đối chiếu ETag nhận về HTTP 304',
        problem: 'Viết lệnh cURL gửi request tới endpoint `http://127.0.0.1:8789/cache`, gửi kèm header `If-None-Match` với giá trị `"v1.4.2-mock-hash"`. Yêu cầu: Sử dụng cờ `-i` để in ra mã trạng thái phản hồi `HTTP/1.1 304 Not Modified`.',
        criteria: 'Sử dụng đúng header `If-None-Match`, escape dấu nháy kép chính xác trên từng shell, nhận được mã 304 từ mock server.',
        hint: 'Dùng `curl.exe -s -i -H "If-None-Match: \\"v1.4.2-mock-hash\\"" "http://127.0.0.1:8789/cache"`.',
        starterCommands: {
          bash: 'curl.exe -s -i -H \'If-None-Match: "v1.4.2-mock-hash"\' "http://127.0.0.1:8789/cache"',
          powershell: 'curl.exe -s -i -H \'If-None-Match: \"v1.4.2-mock-hash\"\' "http://127.0.0.1:8789/cache"',
          cmd: 'curl.exe -s -i -H "If-None-Match: \\"v1.4.2-mock-hash\\"" "http://127.0.0.1:8789/cache"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -i -H \'If-None-Match: "v1.4.2-mock-hash"\' "http://127.0.0.1:8789/cache"',
            powershell: 'curl.exe -s -i -H \'If-None-Match: \"v1.4.2-mock-hash\"\' "http://127.0.0.1:8789/cache"',
            cmd: 'curl.exe -s -i -H "If-None-Match: \\"v1.4.2-mock-hash\\"" "http://127.0.0.1:8789/cache"'
          },
          explanation: 'Header If-None-Match báo cho máy chủ biết client đã có bản ghi v1.4.2-mock-hash. Máy chủ đối chiếu thấy khớp nên trả về 304 Not Modified mà không gửi kèm message body.'
        },
        solutionOutput: `HTTP/1.1 304 Not Modified\nETag: "v1.4.2-mock-hash"\nLast-Modified: Tue, 01 Nov 2026 12:00:00 GMT`
      },
      {
        level: 'Trung bình',
        title: 'Nén dữ liệu trong suốt và tự động giải nén bằng cờ --compressed',
        problem: 'Gửi request tới endpoint nén Gzip `http://127.0.0.1:8789/gzip`. Yêu cầu: Sử dụng cờ `--compressed` kết hợp cờ `-i` để vừa quan sát được header `Content-Encoding: gzip`, vừa nhận được nội dung JSON đã được tự động giải nén hoàn chỉnh.',
        criteria: 'Sử dụng đúng cờ `--compressed`, không để lộ ký tự rác nhị phân, body JSON hiển thị rõ ràng trên terminal.',
        hint: 'Dùng `curl.exe -s -i --compressed "http://127.0.0.1:8789/gzip"`.',
        starterCommands: {
          bash: 'curl.exe -s -i --compressed "http://127.0.0.1:8789/gzip"',
          powershell: 'curl.exe -s -i --compressed "http://127.0.0.1:8789/gzip"',
          cmd: 'curl.exe -s -i --compressed "http://127.0.0.1:8789/gzip"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -i --compressed "http://127.0.0.1:8789/gzip"',
            powershell: 'curl.exe -s -i --compressed "http://127.0.0.1:8789/gzip"',
            cmd: 'curl.exe -s -i --compressed "http://127.0.0.1:8789/gzip"'
          },
          explanation: 'Cờ --compressed đính kèm header Accept-Encoding và tự động giải nén trong suốt stream dữ liệu gzip nhận về từ máy chủ.'
        },
        solutionOutput: `HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Encoding: gzip\n\n{\n  "message": "This is a compressed payload with gzip",\n  "size": 1024\n}`
      },
      {
        level: 'Khó',
        title: 'Xây dựng quy trình tự động hóa ETag bằng bộ đôi --etag-save và --etag-compare',
        problem: 'Viết kịch bản 2 bước: Bước 1 thực hiện request đầu tiên tới `http://127.0.0.1:8789/cache` lưu ETag vào file `cache_etag.txt` và lưu body vào `cache_body.json`. Bước 2 sử dụng cờ `--etag-compare cache_etag.txt` để gửi lại request và in ra mã trạng thái HTTP nhận được.',
        criteria: 'Sử dụng đúng cặp cờ `--etag-save` và `--etag-compare` (cURL ≥ 7.68.0), bước 2 nhận về mã HTTP 304.',
        hint: 'Bước 1: `--etag-save cache_etag.txt -o cache_body.json`. Bước 2: `-i --etag-compare cache_etag.txt`.',
        starterCommands: {
          bash: 'curl.exe -s --etag-save cache_etag.txt "http://127.0.0.1:8789/cache" -o cache_body.json\ncurl.exe -s -i --etag-compare cache_etag.txt "http://127.0.0.1:8789/cache"',
          powershell: 'curl.exe -s --etag-save cache_etag.txt "http://127.0.0.1:8789/cache" -o cache_body.json\ncurl.exe -s -i --etag-compare cache_etag.txt "http://127.0.0.1:8789/cache"',
          cmd: 'curl.exe -s --etag-save cache_etag.txt "http://127.0.0.1:8789/cache" -o cache_body.json\ncurl.exe -s -i --etag-compare cache_etag.txt "http://127.0.0.1:8789/cache"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s --etag-save cache_etag.txt "http://127.0.0.1:8789/cache" -o cache_body.json\ncurl.exe -s -i --etag-compare cache_etag.txt "http://127.0.0.1:8789/cache"',
            powershell: 'curl.exe -s --etag-save cache_etag.txt "http://127.0.0.1:8789/cache" -o cache_body.json\ncurl.exe -s -i --etag-compare cache_etag.txt "http://127.0.0.1:8789/cache"',
            cmd: 'curl.exe -s --etag-save cache_etag.txt "http://127.0.0.1:8789/cache" -o cache_body.json\ncurl.exe -s -i --etag-compare cache_etag.txt "http://127.0.0.1:8789/cache"'
          },
          explanation: 'Quy trình khai thác tính năng tự động hóa ETag của cURL hiện đại, không cần bất kỳ công cụ xử lý văn bản nào để bóc tách header.'
        },
        solutionOutput: `HTTP/1.1 304 Not Modified\nETag: "v1.4.2-mock-hash"\nLast-Modified: Tue, 01 Nov 2026 12:00:00 GMT`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Khi nhận được phản hồi HTTP có mã trạng thái `304 Not Modified`, cURL và máy chủ web tuân thủ hành vi nào sau đây theo chuẩn RFC 9110?',
        options: [
          'Máy chủ gửi lại toàn bộ nội dung file nhưng nén bằng thuật toán Zip.',
          'Máy chủ tuyệt đối KHÔNG gửi kèm Message Body (dung lượng payload bằng 0), và máy khách tái sử dụng dữ liệu đã lưu cache trước đó.',
          'cURL tự động xóa toàn bộ các tệp tin trong thư mục tải về.',
          'Máy chủ yêu cầu người dùng nhập lại mật khẩu xác thực.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Mã 304 Not Modified thông báo cho client rằng tài nguyên không có gì thay đổi so với điều kiện trong If-None-Match hoặc If-Modified-Since. Phản hồi 304 không chứa body, tiết kiệm tối đa băng thông mạng.'
      },
      {
        question: 'Điều gì sẽ xảy ra nếu bạn tự gõ thủ công `-H "Accept-Encoding: gzip"` nhưng lại KHÔNG sử dụng cờ `--compressed`?',
        options: [
          'cURL sẽ tự động nhận diện và giải nén như bình thường.',
          'Máy chủ gửi về luồng dữ liệu nhị phân đã nén gzip, nhưng cURL không giải nén mà in thẳng byte rác ra màn hình hoặc ghi file nén làm hỏng lệnh xử lý tiếp theo.',
          'Lệnh cURL sẽ bị từ chối với mã lỗi 403 Forbidden.',
          'Máy chủ sẽ chuyển đổi request sang giao thức FTP.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Header -H chỉ đơn thuần gửi chuỗi văn bản cho server. Máy chủ gửi về file gzip nhưng libcurl không được kích hoạt module giải nén (vốn chỉ bật khi có cờ --compressed), dẫn đến việc in dữ liệu nhị phân rác ra terminal.'
      },
      {
        question: 'Cạm bẫy phá hoại dữ liệu nghiêm trọng nhất khi chạy lệnh `curl -s -H "If-None-Match: ..." URL -o data.json` là gì?',
        options: [
          'File data.json sẽ bị khóa không thể đọc được.',
          'Khi máy chủ trả về mã HTTP 304 (body rỗng 0 bytes), cờ `-o` sẽ mở và GHI ĐÈ file data.json hiện có thành FILE RỖNG 0 BYTE, làm mất sạch dữ liệu cũ.',
          'cURL sẽ tự động đổi tên file thành data.bak.',
          'Máy chủ sẽ gửi cảnh báo vi phạm bảo mật tới quản trị viên.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Cờ -o luôn mở file để ghi dữ liệu nhận được. Khi gặp 304, body rỗng nên cURL ghi đè file hiện có thành 0 bytes rỗng. Đây là lý do nên dùng cặp cờ hiện đại --etag-compare / --etag-save hoặc kiểm tra status code trước.'
      },
      {
        question: 'Bộ đôi cờ `--etag-save <file>` và `--etag-compare <file>` (ra đời từ cURL 7.68.0) mang lại lợi ích gì cho script tự động hóa?',
        options: [
          'Nó tự động mã hóa AES-256 cho toàn bộ ổ đĩa cứng.',
          'Nó tự động trích xuất header ETag từ response lưu vào file và tự động đọc file để gửi kèm If-None-Match trong request tiếp theo mà không cần viết script regex/parse phức tạp.',
          'Nó chỉ hỗ trợ giao thức HTTP/1.0 cổ điển.',
          'Nó bắt buộc máy chủ phải sử dụng cơ sở dữ liệu MongoDB.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Daniel Stenberg bổ sung --etag-save và --etag-compare trong cURL 7.68.0 nhằm giúp người dùng quản lý bộ nhớ đệm HTTP ETag hoàn toàn tự động chỉ với dòng lệnh đơn giản.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -s --compressed "URL"',
        description: 'Tự động gửi Accept-Encoding và giải nén dữ liệu trong suốt (Gzip/Brotli), giảm tới 80% dung lượng.'
      },
      {
        command: 'curl.exe -s -i -H \'If-None-Match: "hash"\' "URL"',
        description: 'Gửi conditional request thủ công với ETag để nhận phản hồi HTTP 304 Not Modified.'
      },
      {
        command: 'curl.exe -s --etag-save etag.txt -o data.json "URL"',
        description: 'Lần 1: Tải dữ liệu và tự động trích xuất lưu ETag vào tệp etag.txt (cURL ≥ 7.68.0).'
      },
      {
        command: 'curl.exe -s -i --etag-compare etag.txt --etag-save etag.txt "URL"',
        description: 'Lần 2+: Tự động so khớp ETag từ file, nhận về 304 nếu không đổi hoặc tự cập nhật ETag nếu có bản mới.'
      },
      {
        command: 'curl.exe -s -i -z local_file.pdf "URL" -o local_file.pdf',
        description: 'Chỉ tải file nếu phiên bản trên máy chủ mới hơn thời gian sửa đổi (mtime) của file cục bộ.'
      },
      {
        command: 'curl.exe -s -o /dev/null -w "%{http_code}\\n" -H \'If-None-Match: "hash"\' "URL"',
        description: 'Kiểm tra nhanh xem tài nguyên có thay đổi hay không (in ra 304 hoặc 200) mà không tải body.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'Nắm vững nguyên lý Conditional Request: Tận dụng mã phản hồi `HTTP 304 Not Modified` để tiết kiệm 100% dung lượng body khi dữ liệu trên máy chủ không có thay đổi.',
      'Sử dụng Strong ETag thay vì `Last-Modified`: Loại bỏ hoàn toàn giới hạn độ phân giải 1 giây và rủi ro lệch đồng hồ hệ thống (Clock Skew).',
      'Làm chủ cặp cờ đột phá `--etag-save` và `--etag-compare` (cURL ≥ 7.68.0) để tự động hóa trích xuất và so khớp ETag mà không cần bóc tách chuỗi thủ công.',
      'LUÔN dùng cờ `--compressed` khi muốn nhận dữ liệu nén (Gzip/Brotli) để cURL tự động giải nén trong suốt, tuyệt đối không tự gõ header `Accept-Encoding` chay.',
      'Cảnh giác cạm bẫy ghi đè file rỗng: Tuyệt đối không kết hợp `-o <file>` với `If-None-Match` thủ công mà không kiểm tra status code hoặc chưa dùng `--etag-compare` an toàn.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'curl.se Official Documentation: Conditional Requests & ETag',
        url: 'https://curl.se/docs/manpage.html#--etag-compare',
        description: 'Tài liệu tra cứu chính thức của cURL về hai cờ --etag-save và --etag-compare.'
      },
      {
        title: 'RFC 9110: HTTP Semantics - Conditional Requests',
        url: 'https://www.rfc-editor.org/rfc/rfc9110#section-13',
        description: 'Đặc tả tiêu chuẩn IETF về cơ chế yêu cầu có điều kiện và các header ETag, If-None-Match, If-Modified-Since.'
      },
      {
        title: 'MDN Web Docs: HTTP Caching & ETag',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag',
        description: 'Cẩm nang toàn diện của Mozilla về nguyên lý hoạt động của ETag, Strong/Weak validator và tối ưu web cache.'
      },
      {
        title: 'Daniel Stenberg: Everything curl - Caching and Compression',
        url: 'https://everything.curl.dev/usingcurl/downloads/etag',
        description: 'Chương sách của tác giả cURL giải thích chi tiết động cơ ra đời của tính năng tự động hóa ETag.'
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
          issue: 'Cạm bẫy ghi đè file hiện có thành 0 bytes rỗng khi nhận phản hồi HTTP 304 kết hợp cờ -o',
          severity: 'Critical',
          resolution: 'Đã xây dựng Hộp Cảnh báo (Warning Box) phân tích nguyên nhân và hướng dẫn giải pháp an toàn với --etag-compare'
        },
        {
          issue: 'Lỗi in chuỗi byte nhị phân rác ra terminal khi người dùng tự thêm header Accept-Encoding: gzip thủ công',
          severity: 'Major',
          resolution: 'Đã phân tích rõ sự khác biệt giữa header thủ công và cờ --compressed trong Lớp 4 và câu hỏi trắc nghiệm số 2'
        },
        {
          issue: 'Nhầm lẫn cú pháp thoát dấu nháy kép cho giá trị ETag trên PowerShell và CMD',
          severity: 'Major',
          resolution: 'Đã chuẩn hóa các tab lệnh shell đa môi trường (bash, powershell, cmd) trong tất cả các ví dụ và bài tập'
        },
        {
          issue: 'Khó khăn khi quản lý ETag bằng script shell thủ công (grep/sed/awk) trên các phiên bản cURL cũ',
          severity: 'Minor',
          resolution: 'Đã giới thiệu bộ đôi cờ hiện đại --etag-save và --etag-compare (cURL ≥ 7.68.0) trong Lớp 2'
        },
        {
          issue: 'Hiểu sai về chỉ thị Cache-Control: no-cache dẫn tới việc cấu hình sai logic kiểm định cache',
          severity: 'Minor',
          resolution: 'Đã giải thích rõ ràng sự khác biệt giữa no-cache (bắt buộc revalidate) và no-store (cấm lưu trữ) trong mục Cạm bẫy'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://curl.se/docs/manpage.html#--etag-compare',
        'https://www.rfc-editor.org/rfc/rfc9110#section-13',
        'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag',
        'https://everything.curl.dev/usingcurl/downloads/etag'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH15_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
