/**
 * Chương 10: Quản Lý Cookie & Phiên Làm Việc (Cookie Jar -b, -c) (data/curl/chapters/ch10.js)
 * Cấp độ: Trung cấp | Thời lượng: ~25 phút | cURL tối thiểu: 7.0.0 (cờ -b "" ≥ 7.9.0, -j ≥ 7.9.7)
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch10',
    meta: {
      id: 'ch10',
      order: 10,
      title: 'Quản Lý Cookie & Phiên Làm Việc (Cookie Jar -b, -c)',
      level: 'Trung cấp',
      curlMinVersion: '7.0.0',
      qaStatus: 'verified'
    },
    partId: 'level-2',
    partTitle: 'Cấp độ 2: Kỹ Năng Trung Cấp',
    number: '10',
    title: 'Quản Lý Cookie & Phiên Làm Việc (Cookie Jar -b, -c)',
    subtitle: 'Thành thạo cờ lưu cookie (-c) và đọc cookie (-b), giải mã định dạng Netscape 7 cột, kỹ thuật duy trì phiên liên tục, và bí quyết kích hoạt Cookie Engine trong RAM bằng cờ -b ""',
    level: 'Trung cấp',
    duration: '25 phút',
    curlMinVersion: '7.0.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Nắm vững vòng đời và kiến trúc Cookie theo tiêu chuẩn RFC 6265 (`Set-Cookie` của máy chủ -> lưu trữ phía client -> gửi lại qua header `Cookie`).',
      'Phân biệt rõ ràng vai trò của hai cờ cốt lõi: `-c, --cookie-jar` (ghi cookie ra file sau khi hoàn thành request) và `-b, --cookie` (nạp cookie từ file hoặc truyền chuỗi cookie trực tiếp).',
      'Đọc hiểu chi tiết 7 trường trong định dạng tệp Netscape Cookie File (`domain`, `subdomain_flag`, `path`, `secure`, `expiration`, `name`, `value`) và tiền tố đặc biệt `#HttpOnly_`.',
      'Làm chủ kỹ thuật duy trì phiên làm việc liên tục (Session Maintenance) bằng cặp cờ song hành `-b cookies.txt -c cookies.txt` và kỹ thuật kích hoạt Cookie Engine trong RAM không cần ghi đĩa bằng `-b ""`.',
      'Phòng tránh các rủi ro bảo mật Cookie nghiêm trọng: phân quyền bảo mật file cookie (`chmod 600`), thuộc tính `HttpOnly` và `Secure`, nguy cơ lộ cookie khi redirect `-L` sang bên thứ ba.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành Chương 07 (Quản trị Header `-H`) và Chương 08 (Xác thực & Quản lý Token).',
      'Hiểu cấu trúc của hai HTTP Headers quan trọng: Response Header `Set-Cookie` và Request Header `Cookie`.'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Tủ gửi đồ siêu thị, chiếc vòng tay đeo số và cỗ máy trí nhớ của cURL',
      metaphor: 'Giao thức HTTP về bản chất là một kẻ "mất trí nhớ" (Stateless Protocol). Mỗi lần bạn gửi request lên server, server đều nhìn bạn như một người xa lạ lần đầu gặp mặt. Cookie giống như chiếc vòng tay có gắn mã số tủ đồ mà nhân viên siêu thị phát cho bạn khi gửi túi xách (`Set-Cookie: session_id=12345`). Lần sau quay lại lấy đồ, bạn chỉ cần chìa chiếc vòng tay ra (`Cookie: session_id=12345`) là nhân viên biết ngay bạn là ai mà không cần bắt bạn khai lại họ tên, căn cước. Mặc định, cURL cũng là một kẻ "không có trí nhớ": nó tải trang xong là quên sạch sẽ mọi chiếc vòng tay vừa nhận. Cờ `-c cookies.txt` (Cookie Jar) giống như việc bạn bảo cURL: "Sau khi giao dịch xong, hãy cất chiếc vòng tay này vào chiếc hộp trên bàn!". Cờ `-b cookies.txt` giống như việc bạn bảo: "Trước khi đi siêu thị, hãy mở chiếc hộp đó ra và đeo sẵn chiếc vòng tay vào người!". Nhưng điều kỳ diệu nhất là nếu bạn vừa muốn cất cái cũ VÀ vừa muốn ghi nhận cái mới đổi: bạn phải dùng cả hai cờ `-b cookies.txt -c cookies.txt`. Còn nếu bạn chỉ muốn cURL tự nhớ trong đầu (bộ nhớ RAM) xuyên suốt một chuyến đi nhiều chặng (Follow Redirect `-L`) mà không cần ghi file rác ra đĩa: chiếc bùa bí mật `-b ""` (chuỗi rỗng) sẽ kích hoạt cỗ máy trí nhớ (Cookie Engine) của cURL ngay lập tức!',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">VÒNG ĐỜI QUẢN LÝ COOKIE & PHIÊN LÀM VIỆC TRONG cURL</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#38bdf8;font-weight:700;">1. Bước Đăng Nhập (Login)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cờ: <code>-c cookies.txt</code><br/>Nhận <code>Set-Cookie</code> và ghi vào file Netscape Cookie Jar sau khi xong.</div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;">2. Duy Trì Phiên (Maintenance)</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cờ: <code>-b cookies.txt -c cookies.txt</code><br/>Đọc cookie cũ để xác thực VÀ ghi nhận cookie mới nếu server cập nhật.</div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#f59e0b;font-weight:700;">3. Kích Hoạt Trong RAM (-b "")</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cờ: <code>-b "" -L</code><br/>Tự động lưu và gửi cookie qua các chặng redirect mà không ghi file rác ra đĩa.</div>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '-c',
        longFlag: '--cookie-jar',
        description: 'Chỉ định tệp tin để lưu toàn bộ các cookies nhận được từ server (định dạng chuẩn Netscape format) sau khi request hoàn tất.',
        minVersion: '7.0.0'
      },
      {
        flag: '-b',
        longFlag: '--cookie',
        description: 'Nạp cookie từ file Netscape format HOẶC truyền trực tiếp chuỗi cookie (dạng `name=value; name2=val2`). Bật Cookie Engine của cURL.',
        minVersion: '7.0.0'
      },
      {
        flag: '-b ""',
        longFlag: '--cookie ""',
        description: 'Kích hoạt Cookie Engine trong bộ nhớ RAM; cURL tự động nhận và chuyển tiếp cookie giữa các chặng chuyển hướng (-L) mà không ghi ra đĩa.',
        minVersion: '7.9.0'
      },
      {
        flag: '-j',
        longFlag: '--junk-session-cookies',
        description: 'Khi đọc cookie từ file bằng `-b`, cURL sẽ loại bỏ (bỏ qua) tất cả các session cookies (cookie không có ngày hết hạn Expires/Max-Age).',
        minVersion: '7.9.7'
      },
      {
        flag: '-L',
        longFlag: '--location',
        description: 'Tự động theo dõi chuyển hướng HTTP (3xx); khi kết hợp với `-b` hoặc `-b ""`, cURL tự động đính kèm cookie phù hợp cho các chặng kế tiếp.',
        minVersion: '7.0.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Vòng Đời Cookie HTTP & Phân Biệt Sắc Nét Giữa Cờ -c và -b',
        content: `
          <p>Giao thức HTTP được thiết kế theo mô hình <strong>Stateless</strong>: máy chủ không lưu giữ bất kỳ trạng thái nào giữa hai request độc lập. Để tạo ra trải nghiệm "đăng nhập một lần và duy trì phiên", tiêu chuẩn <strong>RFC 6265</strong> định nghĩa cơ chế Cookie:</p>
          <ol>
            <li>Khi client đăng nhập thành công, máy chủ trả về header:
              <pre class="code-pre"><code>Set-Cookie: session_id=sess_cookie_998877; Path=/; HttpOnly</code></pre>
            </li>
            <li>Client lưu trữ cookie này vào bộ nhớ hoặc ổ cứng.</li>
            <li>Trong các request tiếp theo tới cùng Domain/Path, client tự động đính kèm:
              <pre class="code-pre"><code>Cookie: session_id=sess_cookie_998877</code></pre>
            </li>
          </ol>

          <h3>1. Phân Biệt Tuyệt Đối Giữa Cờ \`-c\` (Write) và \`-b\` (Read)</h3>
          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Tiêu chí</th>
                  <th>Cờ <code>-c, --cookie-jar &lt;file&gt;</code></th>
                  <th>Cờ <code>-b, --cookie &lt;file|data&gt;</code></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Ý nghĩa chính</strong></td>
                  <td><strong>GHI COOKIE (Write):</strong> Hứng các header <code>Set-Cookie</code> và ghi vào file sau khi xong lệnh.</td>
                  <td><strong>ĐỌC COOKIE (Read):</strong> Nạp cookie từ file hoặc truyền chuỗi cookie trực tiếp gửi lên server.</td>
                </tr>
                <tr>
                  <td><strong>Thời điểm tác động</strong></td>
                  <td>Ghi ra đĩa ở cuối tiến trình (khi libcurl đóng phiên).</td>
                  <td>Đọc ngay từ đầu tiến trình trước khi gửi request ra mạng.</td>
                </tr>
                <tr>
                  <td><strong>Truyền chuỗi trực tiếp?</strong></td>
                  <td>Không (chỉ nhận đường dẫn file).</td>
                  <td>Có thể nhận đường dẫn file HOẶC chuỗi trực tiếp: <code>-b "a=1; b=2"</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch10-sec01',
            title: 'Ví dụ 1: Đăng Nhập Nhận Set-Cookie Và Lưu Vào File Cookie Jar Bằng Cờ -c',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -c cookies.txt "http://127.0.0.1:8789/cookie/login"\ncat cookies.txt',
              powershell: 'curl.exe -s -c cookies.txt "http://127.0.0.1:8789/cookie/login"\nGet-Content cookies.txt',
              cmd: 'curl.exe -s -c cookies.txt "http://127.0.0.1:8789/cookie/login"\ntype cookies.txt'
            },
            realOutput: `{"loggedIn":true,"user":"alice","message":"Session cookie issued"}\n# Netscape HTTP Cookie File\n# https://curl.se/docs/http-cookies.html\n# This file was generated by libcurl! Edit at your own risk.\n\n127.0.0.1\tFALSE\t/\tFALSE\t1793692709\ttheme\tdark\n#HttpOnly_127.0.0.1\tFALSE\t/\tFALSE\t0\tsession_id\tsess_cookie_998877`,
            explanationTokens: [
              { token: '-c cookies.txt', meaning: 'Chỉ định cURL hứng các header Set-Cookie và ghi vào tệp văn bản cookies.txt' },
              { token: '{"loggedIn":true,...}', meaning: 'Máy chủ xác thực đăng nhập thành công và cấp phát session cookie' },
              { token: '# Netscape HTTP Cookie File', meaning: 'Định dạng tệp cookie chuẩn mực lưu trữ trên đĩa được cURL tự động sinh' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Giải Mã Cấu Trúc 7 Cột Của Netscape Cookie File',
        content: `
          <p>Khi mở file <code>cookies.txt</code> được cURL sinh ra, bạn sẽ thấy các dòng dữ liệu chứa chính xác <strong>7 cột</strong> ngăn cách nhau bởi <strong>ký tự Tab (<code>\\t</code>)</strong>:</p>
          <pre class="code-pre"><code># Cấu trúc 7 cột Netscape Cookie File:
# 1.Domain         2.Subdomains  3.Path  4.Secure  5.Expires     6.Name        7.Value
127.0.0.1          FALSE         /       FALSE     1793692709    theme         dark
#HttpOnly_127.0.0.1 FALSE        /       FALSE     0             session_id    sess_cookie_998877</code></pre>

          <div class="options-table-wrapper">
            <table class="options-table">
              <thead>
                <tr>
                  <th>Cột số</th>
                  <th>Tên trường</th>
                  <th>Ý nghĩa kỹ thuật</th>
                  <th>Ví dụ giá trị</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><strong>Domain</strong></td>
                  <td>Tên miền máy chủ sở hữu cookie (bắt đầu bằng dấu chấm nếu áp dụng cho subdomain)</td>
                  <td><code>example.com</code> hoặc <code>.github.com</code></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><strong>Include Subdomains</strong></td>
                  <td><code>TRUE</code> nếu cookie có giá trị cho mọi subdomain con (<code>*.example.com</code>); <code>FALSE</code> nếu chỉ đúng host này</td>
                  <td><code>TRUE</code> / <code>FALSE</code></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><strong>Path</strong></td>
                  <td>Đường dẫn URL hợp lệ mà cURL được phép gửi cookie này lên</td>
                  <td><code>/</code> hoặc <code>/api/v1</code></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td><strong>Secure</strong></td>
                  <td><code>TRUE</code> nếu cookie chỉ được truyền qua kết nối mã hóa HTTPS; cURL sẽ chặn gửi qua HTTP</td>
                  <td><code>TRUE</code> / <code>FALSE</code></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td><strong>Expiration Timestamp</strong></td>
                  <td>Thời điểm hết hạn tính bằng số giây Unix Epoch. Nếu bằng <code>0</code>, đây là <strong>Session Cookie</strong> (hết hạn khi đóng ứng dụng)</td>
                  <td><code>1793692709</code> hoặc <code>0</code></td>
                </tr>
                <tr>
                  <td>6</td>
                  <td><strong>Name</strong></td>
                  <td>Tên biến cookie</td>
                  <td><code>session_id</code>, <code>auth_token</code></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td><strong>Value</strong></td>
                  <td>Giá trị dữ liệu của cookie</td>
                  <td><code>sess_cookie_998877</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Tiền Tố Bí Mật: \`#HttpOnly_\`</h3>
          <p>Theo tiêu chuẩn Netscape ban đầu, không có khái niệm <code>HttpOnly</code>. Để duy trì tính tương thích với các công cụ cũ mà vẫn hỗ trợ cờ bảo mật này, cURL thêm tiền tố <code>#HttpOnly_</code> vào trước tên domain. Các công cụ cũ sẽ coi dòng này là chú thích (bắt đầu bằng <code>#</code>), trong khi các phiên bản cURL hiện đại sẽ tự hiểu đây là cookie có cờ <code>HttpOnly</code>!</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch10-sec02',
            title: 'Ví dụ 2: Đọc Và Sử Dụng File Cookie Jar Bằng Cờ -b Truy Cập Endpoint Được Bảo Vệ',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -b cookies.txt "http://127.0.0.1:8789/cookie/profile"',
              powershell: 'curl.exe -s -b cookies.txt "http://127.0.0.1:8789/cookie/profile"',
              cmd: 'curl.exe -s -b cookies.txt "http://127.0.0.1:8789/cookie/profile"'
            },
            realOutput: `{"authorized":true,"user":"alice","activeSession":true,"cookieString":"session_id=sess_cookie_998877; theme=dark"}`,
            explanationTokens: [
              { token: '-b cookies.txt', meaning: 'Nạp file Netscape cookies.txt, cURL tự động so khớp Domain và Path để gắn header Cookie' },
              { token: '"authorized":true', meaning: 'Máy chủ kiểm tra session_id thành công và cho phép truy cập tài nguyên bảo mật' },
              { token: '"cookieString": "session_id=...; theme=dark"', meaning: 'Cả hai cookie (session và theme) đều được gửi đầy đủ lên máy chủ' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Kỹ Thuật Duy Trì Phiên Liên Tục & Phép Màu Cờ -b "" Trong RAM',
        content: `
          <p>Trong các kịch bản thực tế (như kiểm thử luồng mua hàng E-commerce hoặc web scraping nhiều trang), phiên làm việc đòi hỏi gọi liên tiếp nhiều request:</p>

          <h3>1. Quy Tắc Vàng: Cặp Cờ Song Hành \`-b file -c file\`</h3>
          <p>Nhiều lập trình viên thắc mắc: <em>"Tại sao lệnh thứ 2 trong kịch bản lại phải truyền cả hai cờ <code>-b cookies.txt -c cookies.txt</code>?"</em></p>
          <ul>
            <li>Nếu bạn chỉ dùng <code>-b cookies.txt</code>: cURL nạp cookie cũ để xác thực, nhưng nếu máy chủ gửi lại <code>Set-Cookie</code> mới (cơ chế xoay vòng Session Rotation để chống tấn công Session Fixation), cURL sẽ <strong>KHÔNG GHI LẠI</strong> cookie mới ra đĩa! Lệnh thứ 3 sẽ dùng cookie cũ đã bị hủy và bị văng ra ngoài.</li>
            <li>Nếu bạn chỉ dùng <code>-c cookies.txt</code>: cURL ghi cookie mới nhưng <strong>KHÔNG GỬI</strong> cookie cũ lên máy chủ!</li>
            <li><strong>Quy tắc bất di bất dịch:</strong> Luôn luôn dùng đồng thời:
              <pre class="code-pre"><code>curl.exe -s -b cookies.txt -c cookies.txt https://api.com/checkout</code></pre>
            </li>
          </ul>

          <h3>2. Phép Màu Cờ \`-b ""\` (Kích Hoạt Cookie Engine Trong RAM)</h3>
          <p>Khi bạn cần kiểm thử một chuỗi chuyển hướng (Redirect <code>-L</code>) hoặc một chuỗi request tạm thời mà không muốn xả rác file <code>cookies.txt</code> ra ổ cứng, hãy dùng cú pháp đặc biệt: <strong><code>-b ""</code></strong> (truyền một chuỗi rỗng vào cờ <code>-b</code>):</p>
          <pre class="code-pre"><code># Kích hoạt Cookie Engine trong RAM, tự động theo dõi cookie qua các chặng redirect:
curl.exe -s -b "" -L "https://example.com/login-and-redirect"</code></pre>
          <p>Cú pháp này báo cho libcurl: <em>"Hãy bật bộ máy Cookie Engine trong bộ nhớ RAM, tự động lưu mọi Set-Cookie và tự động chuyển tiếp qua các chặng kế tiếp, rồi tự hủy sạch sẽ khi lệnh kết thúc!"</em></p>
        `,
        codeExamples: [
          {
            id: 'ex-ch10-sec03',
            title: 'Ví dụ 3: Gửi Trực Tiếp Chuỗi Cookie Dạng Inline Bằng Cờ -b Không Cần File',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -b "session_id=sess_cookie_998877" "http://127.0.0.1:8789/cookie/profile"',
              powershell: 'curl.exe -s -b "session_id=sess_cookie_998877" "http://127.0.0.1:8789/cookie/profile"',
              cmd: 'curl.exe -s -b "session_id=sess_cookie_998877" "http://127.0.0.1:8789/cookie/profile"'
            },
            realOutput: `{"authorized":true,"user":"alice","activeSession":true,"cookieString":"session_id=sess_cookie_998877"}`,
            explanationTokens: [
              { token: '-b "session_id=sess_cookie_998877"', meaning: 'Truyền chuỗi cookie trực tiếp vào cờ -b; cURL tự động tạo header Cookie: session_id=... gửi lên server' },
              { token: '"authorized":true', meaning: 'Xác thực phiên thành công mà không cần tạo file cookie jar trên đĩa' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Cẩm Nang An Toàn Cookie: Phân Quyền chmod 600, Thuộc Tính Secure & Chống Rò Rỉ',
        content: `
          <p>Cookie đóng vai trò như chiếc chìa khóa định danh phiên làm việc của bạn. Quản trị an toàn cookie đòi hỏi tuân thủ các nguyên tắc sau:</p>

          <h3>1. Hiểm Họa Plaintext Session Hijacking</h3>
          <p>File <code>cookies.txt</code> lưu trữ toàn bộ session token dưới dạng văn bản thuần không mã hóa. Bất kỳ người dùng nào trên cùng máy chủ hoặc mã độc nào có quyền đọc file đều có thể chiếm quyền điều khiển tài khoản của bạn. <strong>Bắt buộc:</strong> Hãy luôn phân quyền file ngay sau khi tạo:</p>
          <pre class="code-pre"><code># Phân quyền nghiêm ngặt chỉ chủ sở hữu được đọc/ghi:
chmod 600 cookies.txt</code></pre>

          <h3>2. Thuộc Tính \`Secure\` Và Cơ Chế Bảo Vệ Của cURL</h3>
          <p>Nếu cookie có cờ <code>Secure</code> (cột thứ 4 là <code>TRUE</code> trong file Netscape), cURL sẽ <strong>TỪ CHỐI GỬI</strong> cookie này nếu bạn thực hiện request tới URL <code>http://</code> (kết nối không mã hóa). Điều này ngăn chặn việc kẻ tấn công trung gian (Man-in-the-Middle) lừa client gửi cookie qua kênh không an toàn.</p>

          <h3>3. Bỏ Qua Session Cookie Bằng Cờ \`-j, --junk-session-cookies\`</h3>
          <p>Khi bạn muốn mô phỏng hành vi <em>"Tắt trình duyệt và mở lại một phiên mới"</em> mà vẫn giữ nguyên các cookie lưu dài hạn (như cookie tùy chọn giao diện, ngôn ngữ), hãy dùng cờ <code>-j</code>:</p>
          <pre class="code-pre"><code># Bỏ qua toàn bộ session cookie cũ (cột Expires = 0):
curl.exe -s -j -b cookies.txt https://api.com/app</code></pre>
        `,
        codeExamples: [
          {
            id: 'ex-ch10-sec04',
            title: 'Ví dụ 4: Đối Chiếu Phản Hồi 401 Unauthorized Khi Không Có Cookie Hợp Lệ',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -i "http://127.0.0.1:8789/cookie/profile"',
              powershell: 'curl.exe -s -i "http://127.0.0.1:8789/cookie/profile"',
              cmd: 'curl.exe -s -i "http://127.0.0.1:8789/cookie/profile"'
            },
            realOutput: `HTTP/1.1 401 Unauthorized\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS\r\nAccess-Control-Allow-Headers: *\r\nAccess-Control-Expose-Headers: *\r\nContent-Type: application/json\r\nDate: Mon, 02 Nov 2026 07:58:29 GMT\r\nConnection: keep-alive\r\nKeep-Alive: timeout=5\r\nTransfer-Encoding: chunked\r\n\r\n{"authorized":false,"error":"Missing or expired session cookie"}`,
            explanationTokens: [
              { token: 'HTTP/1.1 401 Unauthorized', meaning: 'Máy chủ từ chối yêu cầu do không nhận được session cookie hợp lệ' },
              { token: '"error":"Missing or expired session cookie"', meaning: 'Thông báo lỗi xác nhận phiên không tồn tại khi thiếu cờ -b' }
            ]
          }
        ]
      }
    ],

    // 6. Lỗi thường gặp & Bảo mật thực chiến (Callouts)
    callouts: {
      warning: {
        title: 'File Cookie Jar lưu trữ toàn bộ phiên đăng nhập dưới dạng văn bản thuần (Session Hijacking)',
        content: 'Bất kỳ ai có quyền đọc file `cookies.txt` đều có thể sao chép chuỗi `session_id` và mạo danh hoàn toàn danh tính tài khoản của bạn mà không cần biết mật khẩu gốc. Tuyệt đối KHÔNG commit file cookie jar vào Git repository, không chia sẻ file cookie trong báo cáo lỗi, và luôn luôn chạy lệnh `chmod 600 cookies.txt` ngay khi tạo file trên hệ điều hành Linux/macOS.'
      },
      pitfalls: [
        {
          title: 'Chỉ dùng cờ -b mà quên -c khiến phiên làm việc bị đứt gãy giữa chừng',
          content: 'Nếu máy chủ thực hiện cơ chế Session Rotation (đổi session ID mới sau mỗi thao tác thanh toán/đổi trang), việc chỉ dùng `-b cookies.txt` sẽ khiến cURL không ghi lại cookie mới, dẫn đến các request sau bị server từ chối vì dùng session cũ đã bị thu hồi. Luôn dùng cặp `-b file -c file`.'
        },
        {
          title: 'Cờ -c chỉ ghi dữ liệu ra đĩa khi tiến trình cURL kết thúc thành công',
          content: 'libcurl chỉ thực hiện ghi file cookie jar trong bước dọn dẹp kết thúc (cleanup). Nếu bạn nhấn `Ctrl+C` ép ngắt lệnh giữa chừng hoặc tiến trình bị crash, file cookie trên đĩa sẽ không được cập nhật.'
        },
        {
          title: 'Cố tình gửi cookie có thuộc tính Secure qua kết nối HTTP không mã hóa',
          content: 'Nếu cookie có cờ Secure (cột thứ 4 là TRUE), cURL sẽ tuân thủ nghiêm ngặt chuẩn RFC 6265 và âm thầm loại bỏ cookie này nếu URL bạn gọi là `http://`. Bạn sẽ gặp lỗi 401 Unauthorized khó hiểu nếu không chú ý giao thức.'
        },
        {
          title: 'Lầm tưởng cờ -b "name=val" sẽ tự động lưu cookie mới nhận được',
          content: 'Khi truyền chuỗi cookie trực tiếp vào cờ `-b`, cURL chỉ gắn header `Cookie:` cho request đó và KHÔNG hề kích hoạt cơ chế ghi nhận `Set-Cookie` mới trừ khi bạn cung cấp thêm cờ `-c <file>`.'
        }
      ],
      tips: [
        {
          title: 'Kích hoạt Cookie Engine trong RAM bằng cờ -b "" để chống rác ổ đĩa',
          content: 'Khi cào dữ liệu hoặc theo dõi chuyển hướng nhiều bước `-L`, chỉ cần thêm `-b ""` vào lệnh. cURL sẽ tự động duy trì toàn bộ cookie giữa các chặng redirect trong bộ nhớ RAM mà không sinh ra bất kỳ file rác nào trên ổ cứng.'
        },
        {
          title: 'Dọn dẹp file cookie tự động trong Bash script bằng lệnh trap',
          content: 'Thêm dòng `COOKIE_FILE=$(mktemp) && trap "rm -f $COOKIE_FILE" EXIT` ở đầu kịch bản Bash. File cookie tạm thời sẽ tự động bị xóa sổ ngay khi script kết thúc hoặc gặp lỗi.'
        }
      ],
      deepDive: {
        title: 'Cấu trúc dữ liệu struct Cookie và thuật toán so khớp Domain/Path trong libcurl',
        content: 'Bên trong mã nguồn C của libcurl (`lib/cookie.c`), danh sách cookie được lưu trữ bằng cấu trúc liên kết `struct CookieInfo`. Khi chuẩn bị gửi request, hàm `Curl_cookie_getlist` duyệt qua danh sách và áp dụng thuật toán Tail-matching (so khớp đuôi) cho tên miền: ví dụ cookie của `.example.com` sẽ được gửi cho `api.example.com`, nhưng cookie của `api.example.com` tuyệt đối không được gửi sang `admin.example.com`. Đồng thời, cURL kiểm tra tiền tố Path để bảo đảm tính cô lập dữ liệu theo RFC 6265.'
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Gửi Cookie trực tiếp bằng chuỗi inline qua cờ -b',
        problem: 'Sử dụng cờ `-b` truyền trực tiếp chuỗi cookie `session_id=sess_cookie_998877` tới endpoint `http://127.0.0.1:8789/cookie/profile` mà không cần tạo file.',
        criteria: 'Sử dụng đúng cờ `-b "session_id=sess_cookie_998877"`, máy chủ phản hồi mã 200 kèm JSON `authorized: true`.',
        hint: 'Truyền chuỗi trực tiếp vào cờ `-b "name=val"`.',
        starterCommands: {
          bash: 'curl.exe -s -b "session_id=sess_cookie_998877" "http://127.0.0.1:8789/cookie/profile"',
          powershell: 'curl.exe -s -b "session_id=sess_cookie_998877" "http://127.0.0.1:8789/cookie/profile"',
          cmd: 'curl.exe -s -b "session_id=sess_cookie_998877" "http://127.0.0.1:8789/cookie/profile"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -b "session_id=sess_cookie_998877" "http://127.0.0.1:8789/cookie/profile"',
            powershell: 'curl.exe -s -b "session_id=sess_cookie_998877" "http://127.0.0.1:8789/cookie/profile"',
            cmd: 'curl.exe -s -b "session_id=sess_cookie_998877" "http://127.0.0.1:8789/cookie/profile"'
          },
          explanation: 'cURL tự động chuyển chuỗi sau cờ -b thành header Cookie: session_id=sess_cookie_998877 gửi lên server.'
        },
        solutionOutput: `{"authorized":true,"user":"alice","activeSession":true,"cookieString":"session_id=sess_cookie_998877"}`
      },
      {
        level: 'Trung bình',
        title: 'Đăng nhập lưu Cookie Jar bằng cờ -c',
        problem: 'Thực hiện request GET tới `http://127.0.0.1:8789/cookie/login` và lưu toàn bộ cookie nhận được vào file `my_cookies.txt` bằng cờ `-c`.',
        criteria: 'Sử dụng cờ `-c my_cookies.txt`, tệp tin được sinh ra theo định dạng chuẩn Netscape chứa cả hai cookie `theme` và `session_id`.',
        hint: 'Sử dụng cờ `-c <filename>`.',
        starterCommands: {
          bash: 'curl.exe -s -c "my_cookies.txt" "http://127.0.0.1:8789/cookie/login"',
          powershell: 'curl.exe -s -c "my_cookies.txt" "http://127.0.0.1:8789/cookie/login"',
          cmd: 'curl.exe -s -c "my_cookies.txt" "http://127.0.0.1:8789/cookie/login"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -c "my_cookies.txt" "http://127.0.0.1:8789/cookie/login"',
            powershell: 'curl.exe -s -c "my_cookies.txt" "http://127.0.0.1:8789/cookie/login"',
            cmd: 'curl.exe -s -c "my_cookies.txt" "http://127.0.0.1:8789/cookie/login"'
          },
          explanation: 'cURL lắng nghe header Set-Cookie từ máy chủ và ghi lại vào tệp tin chỉ định ở định dạng Netscape Cookie File.'
        },
        solutionOutput: `{"loggedIn":true,"user":"alice","message":"Session cookie issued"}`
      },
      {
        level: 'Khó',
        title: 'Hoàn thành chu kỳ phiên làm việc 2 bước (Login và truy cập Profile bảo vệ)',
        problem: 'Viết chuỗi 2 lệnh cURL: Lệnh 1 đăng nhập endpoint `http://127.0.0.1:8789/cookie/login` lưu cookie vào `session.jar`, Lệnh 2 dùng cookie đó qua cờ `-b session.jar` truy cập `http://127.0.0.1:8789/cookie/profile`.',
        criteria: 'Cả hai lệnh thực thi trơn tru, lệnh 2 nhận được mã phản hồi 200 kèm `authorized: true` và chuỗi cookie đầy đủ.',
        hint: 'Bước 1 dùng `-c session.jar`, bước 2 dùng `-b session.jar`.',
        starterCommands: {
          bash: 'curl.exe -s -c session.jar "http://127.0.0.1:8789/cookie/login"\ncurl.exe -s -b session.jar "http://127.0.0.1:8789/cookie/profile"',
          powershell: 'curl.exe -s -c session.jar "http://127.0.0.1:8789/cookie/login"\ncurl.exe -s -b session.jar "http://127.0.0.1:8789/cookie/profile"',
          cmd: 'curl.exe -s -c session.jar "http://127.0.0.1:8789/cookie/login"\ncurl.exe -s -b session.jar "http://127.0.0.1:8789/cookie/profile"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -c session.jar "http://127.0.0.1:8789/cookie/login"\ncurl.exe -s -b session.jar "http://127.0.0.1:8789/cookie/profile"',
            powershell: 'curl.exe -s -c session.jar "http://127.0.0.1:8789/cookie/login"\ncurl.exe -s -b session.jar "http://127.0.0.1:8789/cookie/profile"',
            cmd: 'curl.exe -s -c session.jar "http://127.0.0.1:8789/cookie/login"\ncurl.exe -s -b session.jar "http://127.0.0.1:8789/cookie/profile"'
          },
          explanation: 'Lệnh 1 lưu session cookie vào file session.jar, lệnh 2 nạp cookie từ file để xác thực phiên thành công.'
        },
        solutionOutput: `{"authorized":true,"user":"alice","activeSession":true,"cookieString":"session_id=sess_cookie_998877; theme=dark"}`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Để cURL vừa nạp các cookie cũ đã có VÀ vừa ghi nhận các cookie mới do máy chủ cập nhật (Session Rotation) trong cùng một lệnh, bạn cần chỉ định cờ nào?',
        options: [
          'Chỉ cần dùng `-b cookies.txt`.',
          'Chỉ cần dùng `-c cookies.txt`.',
          'Bắt buộc dùng đồng thời cả hai cờ: `-b cookies.txt -c cookies.txt`.',
          'Dùng cờ `--cookie-sync`.'
        ],
        correctIndex: 2,
        explanation: 'Cờ `-b` chỉ đọc cookie ban đầu, còn cờ `-c` chỉ ghi cookie ra đĩa khi kết thúc. Để duy trì trạng thái hai chiều liên tục, bạn bắt buộc phải dùng đồng thời cả hai cờ: `-b cookies.txt -c cookies.txt`.'
      },
      {
        question: 'Tác dụng của cú pháp đặc biệt `-b ""` (truyền chuỗi rỗng vào cờ `-b`) trong cURL là gì?',
        options: [
          'Xóa sạch toàn bộ cookie trên máy tính.',
          'Kích hoạt Cookie Engine trong bộ nhớ RAM, tự động lưu và chuyển tiếp cookie giữa các chặng chuyển hướng (-L) mà không cần ghi file rác ra đĩa.',
          'Báo lỗi cú pháp vì chuỗi cookie bị rỗng.',
          'Chặn đứng mọi cookie từ máy chủ.'
        ],
        correctIndex: 1,
        explanation: 'Cú pháp `-b ""` là mẹo kinh điển trong cURL để bật Cookie Engine hoàn toàn trong bộ nhớ RAM, tự động theo dõi cookie xuyên suốt chuỗi redirect mà không sinh ra file rác trên ổ cứng.'
      },
      {
        question: 'Tiền tố `#HttpOnly_` ở đầu dòng domain trong tệp Netscape Cookie File có ý nghĩa gì?',
        options: [
          'Dòng này bị lỗi cú pháp và sẽ bị bỏ qua hoàn toàn.',
          'Cookie này chỉ dùng cho giao thức HTTP/1.0 cổ điển.',
          'Cách cURL đánh dấu cookie có thuộc tính HttpOnly mà vẫn giữ tính tương thích với các trình đọc định dạng Netscape cũ.',
          'Cookie này bị cấm gửi qua mạng.'
        ],
        correctIndex: 2,
        explanation: 'Do định dạng Netscape ban đầu không có trường HttpOnly, cURL dùng tiền tố `#HttpOnly_` để vừa đánh dấu cờ bảo mật này cho libcurl hiểu, vừa giúp các parser Netscape cũ coi dòng đó là comment hợp lệ.'
      },
      {
        question: 'Khi một cookie trong file có thuộc tính `Secure` (cột thứ 4 là `TRUE`), cURL sẽ cư xử như thế nào nếu request kế tiếp được gửi tới một URL `http://` (không có mã hóa TLS)?',
        options: [
          'cURL vẫn gửi cookie bình thường.',
          'cURL tự động nâng cấp URL lên https://.',
          'cURL tuân thủ nghiêm ngặt RFC 6265 và từ chối gửi cookie này qua kết nối HTTP không an toàn.',
          'cURL crash và thoát với mã lỗi 43.'
        ],
        correctIndex: 2,
        explanation: 'Theo đặc tả RFC 6265, cookie mang cờ Secure tuyệt đối không được phép truyền qua kết nối không mã hóa. cURL sẽ âm thầm tước bỏ cookie này để bảo vệ người dùng.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -s -c cookies.txt "URL"',
        description: 'Hứng và lưu toàn bộ cookie nhận được vào file Netscape Cookie Jar.'
      },
      {
        command: 'curl.exe -s -b cookies.txt "URL"',
        description: 'Nạp danh sách cookie từ file để gửi kèm vào request tiếp theo.'
      },
      {
        command: 'curl.exe -s -b cookies.txt -c cookies.txt "URL"',
        description: 'Duy trì phiên hai chiều hoàn hảo: vừa nạp cookie cũ vừa cập nhật cookie mới.'
      },
      {
        command: 'curl.exe -s -b "k1=v1; k2=v2" "URL"',
        description: 'Gửi nhanh chuỗi cookie trực tiếp dạng inline mà không cần tạo file.'
      },
      {
        command: 'curl.exe -s -b "" -L "URL"',
        description: 'Kích hoạt Cookie Engine trong RAM để theo dõi cookie qua chuỗi redirect.'
      },
      {
        command: 'curl.exe -s -b cookies.txt -j "URL"',
        description: 'Bỏ qua toàn bộ session cookies cũ (Expires=0), chỉ giữ lại cookie lâu dài.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'Cookie là cơ chế giải quyết tính chất vô trạng thái (Stateless) của giao thức HTTP theo chuẩn RFC 6265, cho phép định danh phiên làm việc của người dùng.',
      'Phân biệt rõ ràng: Cờ `-c` dùng để GHI cookie ra file (sau khi kết thúc request), còn cờ `-b` dùng để ĐỌC cookie từ file hoặc truyền chuỗi inline.',
      'Quy tắc vàng duy trì phiên: Luôn kết hợp cả hai cờ song hành `-b cookies.txt -c cookies.txt` để hỗ trợ cơ chế Session Rotation của máy chủ hiện đại.',
      'Tận dụng cú pháp `-b ""` để bật Cookie Engine hoàn toàn trong bộ nhớ RAM, rất hữu ích khi kiểm thử kịch bản chuyển hướng `-L` mà không muốn sinh file rác trên ổ đĩa.',
      'Bảo vệ an ninh tuyệt đối: File `cookies.txt` lưu trữ session token dưới dạng văn bản thuần; luôn luôn phân quyền `chmod 600` và không bao giờ commit vào Git.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'RFC 6265: HTTP State Management Mechanism',
        url: 'https://www.rfc-editor.org/rfc/rfc6265',
        description: 'Tiêu chuẩn quốc tế IETF định nghĩa cấu trúc Set-Cookie, Cookie header và thuật toán Domain/Path matching.'
      },
      {
        title: 'curl.se Official Manpage: Cookie Options',
        url: 'https://curl.se/docs/manpage.html#-b',
        description: 'Tài liệu hướng dẫn chính thức về các cờ -b, -c, -j và cơ chế Cookie Engine của cURL.'
      },
      {
        title: 'Daniel Stenberg: "HTTP cookies with curl"',
        url: 'https://daniel.haxx.se/blog/2011/04/28/http-cookies-with-curl/',
        description: 'Bài viết kinh điển của tác giả cURL giải thích chi tiết cách cURL xử lý cookie và định dạng Netscape.'
      },
      {
        title: 'Everything curl: Managing HTTP Cookies',
        url: 'https://everything.curl.dev/http/cookies',
        description: 'Cẩm nang toàn diện của Everything curl về quản trị cookie, session và bảo mật trong thực tế.'
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
          issue: 'Nhầm lẫn chết người giữa việc chỉ dùng -b mà quên -c khiến phiên làm việc bị đứt gãy khi server xoay vòng session token',
          severity: 'Critical',
          resolution: 'Đã xây dựng Lớp 3 chi tiết về quy tắc vàng -b file -c file và câu hỏi trắc nghiệm số 1'
        },
        {
          issue: 'Rủi ro bảo mật phơi bày session token dạng plaintext trong file cookies.txt',
          severity: 'Critical',
          resolution: 'Đã đưa ra cảnh báo Session Hijacking trong Hộp Cảnh báo và hướng dẫn phân quyền bắt buộc chmod 600'
        },
        {
          issue: 'Hiểu lầm cờ -c ghi dữ liệu ngay lập tức trong quá trình chạy (thực tế chỉ ghi khi kết thúc lệnh)',
          severity: 'Major',
          resolution: 'Đã giải thích cơ chế cleanup của libcurl trong Lớp 1 và mục Cạm bẫy'
        },
        {
          issue: 'Khó hiểu về tiền tố lạ #HttpOnly_ trong file Netscape Cookie',
          severity: 'Minor',
          resolution: 'Đã giải thích chi tiết nguồn gốc lịch sử và cách cURL duy trì tính tương thích ngược trong Lớp 2'
        },
        {
          issue: 'Lãng phí tài nguyên và tạo file rác trên ổ cứng khi chỉ cần theo dõi cookie qua redirect -L',
          severity: 'Major',
          resolution: 'Đã giới thiệu bí quyết kỹ thuật cờ -b "" kích hoạt Cookie Engine trong RAM trong Lớp 3'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://www.rfc-editor.org/rfc/rfc6265',
        'https://curl.se/docs/manpage.html#-b',
        'https://daniel.haxx.se/blog/2011/04/28/http-cookies-with-curl/',
        'https://everything.curl.dev/http/cookies'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH10_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
