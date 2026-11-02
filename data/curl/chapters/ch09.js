/**
 * Chương 09: Download, Upload File Lớn, Streaming SSE & Giới Hạn WebSocket (data/curl/chapters/ch09.js)
 * Cấp độ: Trung cấp | Thời lượng: ~35 phút | cURL tối thiểu: 7.0.0 (cờ --output-dir ≥ 7.73.0, --parallel ≥ 7.66.0)
 * Định dạng chuẩn hóa 11 mục bắt buộc theo quy chuẩn sư phạm chuyên sâu
 */

(function () {
  'use strict';

  var CHAPTER_DATA = {
    id: 'ch09',
    meta: {
      id: 'ch09',
      order: 9,
      title: 'Download, Upload File Lớn, Streaming SSE & Giới Hạn WebSocket',
      level: 'Trung cấp',
      curlMinVersion: '7.73.0',
      qaStatus: 'verified'
    },
    partId: 'level-2',
    partTitle: 'Cấp độ 2: Kỹ Năng Trung Cấp',
    number: '09',
    title: 'Download, Upload File Lớn, Streaming SSE & Giới Hạn WebSocket',
    subtitle: 'Làm chủ các chiến lược tải file chuyên nghiệp (-o, -O, -J, --output-dir), kỹ thuật Resume tải dở (-C -), giới hạn băng thông (--limit-rate), đọc stream thời gian thực (-N) và ranh giới với WebSocket',
    level: 'Trung cấp',
    duration: '35 phút',
    curlMinVersion: '7.73.0',
    shells: ['bash', 'powershell', 'cmd'],

    // 1. Mục tiêu bài học (Objectives Box)
    objectives: [
      'Thành thạo toàn bộ các chiến lược lưu file tải về: Đổi tên theo ý muốn (`-o`), lấy tên từ URL (`-O`), lấy tên từ header máy chủ (`-O -J`), bảo lưu timestamp gốc (`-R, --remote-time`), và cờ hiện đại tổ chức thư mục `--output-dir` kết hợp `--create-dirs` (cURL ≥ 7.73.0).',
      'Làm chủ kỹ thuật tải theo phân đoạn Byte Range (`-r`) và cơ chế tiếp tục tải file dở dang (Resume Download `-C -`), hiểu rõ mã trạng thái `206 Partial Content` và header `Content-Range`.',
      'Kiểm soát băng thông mạng trong môi trường sản xuất bằng cờ giới hạn tốc độ `--limit-rate` (chống nghẽn đường truyền mạng văn phòng hoặc server).',
      'Xử lý luồng dữ liệu thời gian thực Server-Sent Events (SSE) và Streaming API (OpenAI/LLM) bằng cờ vô hiệu hóa bộ đệm dòng `--no-buffer` (`-N`).',
      'Hiểu rõ ranh giới kỹ thuật và giới hạn thực tế của cURL với giao thức WebSocket (RFC 6455): cURL hỗ trợ kết nối WebSocket thử nghiệm (từ 7.86.0) nhưng không phải là công cụ chat/full-duplex client hoàn chỉnh, và biết cách chọn đúng công cụ (`websocat`, `wscat`).'
    ],

    // 2. Kiến thức tiên quyết (Prerequisites Box)
    prerequisites: [
      'Đã hoàn thành Chương 04 (Request đầu tiên & Flags `-i`, `-I`, `-sS`, `-D`) và Chương 06 (Gửi dữ liệu với `-F` multipart upload).',
      'Nắm vững kiến thức HTTP Headers cơ bản: `Content-Length`, `Content-Type`, `Content-Disposition`, `Range`, `Accept-Ranges`.'
    ],

    // 3. Khái niệm cốt lõi & Hộp Trực giác (Intuition Box)
    intuition: {
      title: 'Vòi nước cứu hỏa, chiếc thước đo từng byte và dòng suối chảy liên tục',
      metaphor: 'Việc truyền tải dữ liệu qua cURL giống như việc bạn hứng nước từ một nguồn cấp: Tải file thông thường giống như bạn mở vòi nước chảy đầy một chiếc xô (`-o file.zip`). Nếu vòi nước bị cúp giữa chừng, bạn không cần phải đổ xô nước đi và hứng lại từ đầu; cờ `-C -` giống như một chiếc thước đo nhúng vào xô: cURL đo xem nước đã đầy đến vạch nào (bao nhiêu byte trên đĩa), rồi gọi điện bảo nhà máy nước "Hãy bơm tiếp từ vạch byte thứ 524,288 trở đi!" (header `Range: bytes=524288-`). Khi tải file qua đường truyền chung trong công ty, nếu bạn mở hết công suất vòi nước cứu hỏa, toàn bộ đồng nghiệp xung quanh sẽ bị mất nước (nghẽn mạng). Cờ `--limit-rate 500k` chính là chiếc van điều áp, ép vòi chỉ được chảy tối đa 500 KB/giây. Còn khi làm việc với AI Streaming (ChatGPT/Gemini) hoặc Server-Sent Events (SSE), dữ liệu không phải là một chiếc xô đóng gói hoàn chỉnh, mà là một dòng suối chảy liên tục từng giọt từng chữ. Mặc định, cURL và hệ điều hành sẽ cố gắng đợi cho đầy một gáo nước (bộ đệm 4KB hoặc 8KB) mới hắt ra màn hình, khiến bạn thấy màn hình đơ một lúc rồi phụt ra cả đoạn văn. Cờ `--no-buffer` (`-N`) chính là việc gỡ bỏ hoàn toàn chiếc gáo này: giọt nước nào vừa rỏ xuống là lập tức chảy thẳng ra mắt bạn trong thời gian thực (Zero Latency)!',
      visualHtml: `
        <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
          <div style="font-weight:700;color:var(--topic-curl,#38bdf8);text-align:center;">CƠ CHẾ RESUME DOWNLOAD VÀ STREAMING BUFFERING TRONG cURL</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#38bdf8;font-weight:700;">1. Resume File Tải Dở</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cờ: <code>-C -</code><br/>Header: <code>Range: bytes=39-</code><br/>Phản hồi: <code>HTTP 206 Partial Content</code></div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#10b981;font-weight:700;">2. Streaming Không Buffer</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cờ: <code>-N, --no-buffer</code><br/>Loại bỏ đệm 4KB/8KB, in SSE / LLM token ra màn hình ngay lập tức.</div>
            </div>
            <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;">
              <div style="color:#f59e0b;font-weight:700;">3. Tổ Chức Thư Mục Hiện Đại</div>
              <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Cờ: <code>--create-dirs --output-dir</code><br/>Tự tạo thư mục cha và lưu file gọn gàng (cURL ≥ 7.73.0).</div>
            </div>
          </div>
        </div>
      `
    },

    // 4. Bảng tra cứu Options trong bài (Options Table)
    optionsTable: [
      {
        flag: '-o',
        longFlag: '--output',
        description: 'Ghi nội dung tải về vào một file xác định theo đường dẫn tự chọn trên ổ đĩa.',
        minVersion: '7.0.0'
      },
      {
        flag: '-O',
        longFlag: '--remote-name',
        description: 'Tự động lấy tên file lưu trữ từ phần cuối cùng của đường dẫn URL máy chủ.',
        minVersion: '7.0.0'
      },
      {
        flag: '-J',
        longFlag: '--remote-header-name',
        description: 'Kết hợp cùng `-O` để lấy tên file từ header `Content-Disposition` do server trả về.',
        minVersion: '7.20.0'
      },
      {
        flag: '-R',
        longFlag: '--remote-time',
        description: 'Đồng bộ thời gian sửa đổi (timestamp Last-Modified) của file tải về khớp với file trên server.',
        minVersion: '7.0.0'
      },
      {
        flag: '--output-dir',
        longFlag: '--output-dir',
        description: 'Chỉ định thư mục gốc để lưu các file output (rất tiện khi kết hợp với `-O` hoặc tải nhiều URL).',
        minVersion: '7.73.0'
      },
      {
        flag: '--create-dirs',
        longFlag: '--create-dirs',
        description: 'Tự động tạo các thư mục cha cục bộ cần thiết nếu chúng chưa tồn tại trên máy tính.',
        minVersion: '7.10.3'
      },
      {
        flag: '-C',
        longFlag: '--continue-at',
        description: 'Tiếp tục tải file tải dở (Resume) từ vị trí byte chỉ định; dùng `-C -` để cURL tự động đo kích thước file trên đĩa.',
        minVersion: '7.0.0'
      },
      {
        flag: '-r',
        longFlag: '--range',
        description: 'Chỉ tải một phân đoạn byte cụ thể của tài nguyên HTTP (ví dụ `-r 0-499` hoặc `-r 1000-`).',
        minVersion: '7.0.0'
      },
      {
        flag: '--limit-rate',
        longFlag: '--limit-rate',
        description: 'Giới hạn tốc độ tải xuống hoặc tải lên tối đa (hỗ trợ hậu tố `k`, `m`, `g`, ví dụ: `500k`, `2m`).',
        minVersion: '7.10.0'
      },
      {
        flag: '-N',
        longFlag: '--no-buffer',
        description: 'Vô hiệu hóa bộ đệm output (Line Buffering), in dữ liệu streaming (SSE / AI LLM) ra stdout ngay lập tức.',
        minVersion: '7.0.0'
      }
    ],

    // 5. Các lớp giải thích (Sections) & Ví dụ thực hành Đa Shell
    sections: [
      {
        id: 'sec-01',
        title: 'Lớp 1: Chiến Lược Lưu File Chuyên Nghiệp: -o, -O, -J, --remote-time & --output-dir (cURL ≥ 7.73.0)',
        content: `
          <p>Khi tải tệp tin từ Internet bằng cURL, bạn có 3 chiến lược đặt tên file cơ bản:</p>
          <ol>
            <li><strong>Chỉ định tên file đích cụ thể (<code>-o filename</code>):</strong> Toàn quyền kiểm soát tên và vị trí lưu file (ví dụ: <code>curl -o setup.exe https://site.com/get</code>).</li>
            <li><strong>Lấy tên từ URL (<code>-O</code>):</strong> cURL bóc tách chuỗi sau dấu gạch chéo cuối cùng của URL làm tên file cục bộ (ví dụ: <code>curl -O https://site.com/archive.zip</code> -> lưu thành <code>archive.zip</code>).</li>
            <li><strong>Lấy tên theo Server chỉ định (<code>-O -J</code>):</strong> Khi URL là một API động không có đuôi file (ví dụ: <code>https://site.com/export?id=88</code>), cờ <code>-J</code> bảo cURL đọc header <code>Content-Disposition: attachment; filename="report-2026.pdf"</code> để đặt tên chuẩn.</li>
          </ol>

          <h3>1. Đột Phá Tổ Chức Thư Mục: Cờ \`--output-dir\` (cURL ≥ 7.73.0) Kết Hợp \`--create-dirs\`</h3>
          <p>Trước cURL 7.73.0, nếu muốn lưu file tải về vào một thư mục con, bạn phải viết đường dẫn đầy đủ trong <code>-o</code> hoặc phải <code>cd</code> vào thư mục đó trước. Kể từ cURL <strong>7.73.0</strong>, bạn có thể chỉ định cờ <strong><code>--output-dir &lt;path&gt;</code></strong>:</p>
          <pre class="code-pre"><code># Tự động tạo thư mục downloads/2026 nếu chưa có và lưu file vào đó:
curl.exe -s --create-dirs --output-dir "downloads/2026" -O "https://site.com/data.tar.gz"</code></pre>

          <h3>2. Đồng Bộ Dấu Mốc Thời Gian Bằng Cờ \`-R, --remote-time\`</h3>
          <p>Mặc định, file tải về sẽ mang timestamp là thời điểm bạn chạy lệnh curl trên máy tính. Nếu bạn muốn file giữ nguyên ngày giờ chỉnh sửa ban đầu của tác giả (Last-Modified trên server), hãy thêm cờ <code>-R</code>. Điều này cực kỳ quan trọng đối với các hệ thống sao lưu dự phòng (Backup/Mirroring).</p>
        `,
        codeExamples: [
          {
            id: 'ex-ch09-sec01',
            title: 'Ví dụ 1: Tải File Tự Động Tạo Thư Mục Với --create-dirs và --output-dir (cURL ≥ 7.73.0)',
            minVersion: '7.73.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s --create-dirs --output-dir "temp_downloads" -o "downloaded_ping.json" "http://127.0.0.1:8789/ping"\ncat temp_downloads/downloaded_ping.json',
              powershell: 'curl.exe -s --create-dirs --output-dir "temp_downloads" -o "downloaded_ping.json" "http://127.0.0.1:8789/ping"\nGet-Content temp_downloads/downloaded_ping.json',
              cmd: 'curl.exe -s --create-dirs --output-dir "temp_downloads" -o "downloaded_ping.json" "http://127.0.0.1:8789/ping"\ntype temp_downloads\\downloaded_ping.json'
            },
            realOutput: `{"status":"ok","server":"cURL-Mock-Server-v1","port":8789}`,
            explanationTokens: [
              { token: '--create-dirs', meaning: 'Tự động tạo thư mục temp_downloads nếu thư mục này chưa tồn tại trên ổ đĩa' },
              { token: '--output-dir "temp_downloads"', meaning: 'Cờ đột phá của cURL 7.73.0+ chỉ định vị trí thư mục lưu trữ tập trung' },
              { token: '-o "downloaded_ping.json"', meaning: 'Đặt tên tệp đích bên trong thư mục đầu ra đã chọn' }
            ]
          }
        ]
      },
      {
        id: 'sec-02',
        title: 'Lớp 2: Tiếp Tục Tải Dở (Resume -C -) & Kỹ Thuật Tải Theo Khối Byte Range (-r)',
        content: `
          <p>Khi tải các tệp tin có dung lượng lớn (ISO hệ điều hành, video HD, mô hình AI checkpoint hàng chục GB), việc đứt kết nối mạng giữa chừng là điều khó tránh khỏi. Nếu phải tải lại từ byte 0, bạn sẽ lãng phí hàng giờ đồng hồ và lượng lớn băng thông.</p>

          <h3>1. Phép Màu Cờ \`-C -\` (Resume Tự Động)</h3>
          <p>Cú pháp huyền thoại của cURL để tiếp tục tải một file đang dở là: <strong><code>-C -</code></strong> (cờ <code>-C</code> theo sau bởi một dấu gạch ngang):</p>
          <pre class="code-pre"><code># Tải tiếp file video.mp4 đang dở dang trên đĩa:
curl.exe -C - -O "https://cdn.example.com/video.mp4"</code></pre>
          <p><strong>Cơ chế hoạt động bên dưới của libcurl:</strong></p>
          <ol>
            <li>cURL thực hiện system call <code>stat()</code> để đo kích thước hiện có của file trên đĩa (ví dụ: file đã tải được <code>39</code> bytes).</li>
            <li>cURL tự động gửi kèm header yêu cầu trong request tiếp theo:
              <pre class="code-pre"><code>Range: bytes=39-</code></pre>
            </li>
            <li>Nếu máy chủ hỗ trợ (có header <code>Accept-Ranges: bytes</code>), máy chủ sẽ phản hồi mã trạng thái <strong><code>HTTP/1.1 206 Partial Content</code></strong> kèm header <code>Content-Range: bytes 39-88/89</code> và chỉ bơm nốt 50 bytes còn lại.</li>
            <li>cURL mở file ở chế độ <em>Append (nối tiếp)</em> và ghi tiếp dữ liệu vào đuôi file một cách hoàn hảo!</li>
          </ol>

          <h3>2. Tải Một Phân Đoạn Byte Xác Định Bằng Cờ \`-r, --range\`</h3>
          <p>Nếu bạn chỉ muốn xem phần đầu (header) của file âm thanh/video hoặc muốn tải song song nhiều luồng, bạn có thể chủ động chỉ định dải byte:</p>
          <ul>
            <li><code>-r 0-499</code>: Tải đúng 500 byte đầu tiên (từ byte 0 đến byte 499).</li>
            <li><code>-r 500-999</code>: Tải 500 byte tiếp theo.</li>
            <li><code>-r -500</code>: Tải 500 byte cuối cùng của tệp (rất hữu ích khi đọc trailer tệp ZIP hoặc metadata MP4).</li>
          </ul>
        `,
        codeExamples: [
          {
            id: 'ex-ch09-sec02',
            title: 'Ví dụ 2: Tải Phân Đoạn Byte Range (-r 0-38) Và Tiếp Tục Resume File Bằng Cờ -C -',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: '# 1. Tải phân đoạn 39 byte đầu tiên của file với cờ -r 0-38\ncurl.exe -s -i -r 0-38 "http://127.0.0.1:8789/download/sample.txt"\n\n# 2. Tạo file dở dang và dùng cờ -C - để tự động tải phần còn lại\necho -n "cURL File Transfer & Streaming Mastery " > sample.txt\ncurl.exe -s -C - -o sample.txt "http://127.0.0.1:8789/download/sample.txt"\ncat sample.txt',
              powershell: '# 1. Tải phân đoạn 39 byte đầu tiên của file với cờ -r 0-38\ncurl.exe -s -i -r 0-38 "http://127.0.0.1:8789/download/sample.txt"\n\n# 2. Tạo file dở dang và dùng cờ -C - để tự động tải phần còn lại\n[System.IO.File]::WriteAllText("sample.txt", "cURL File Transfer & Streaming Mastery ")\ncurl.exe -s -C - -o sample.txt "http://127.0.0.1:8789/download/sample.txt"\nGet-Content sample.txt',
              cmd: ':: 1. Tải phân đoạn 39 byte đầu tiên của file với cờ -r 0-38\ncurl.exe -s -i -r 0-38 "http://127.0.0.1:8789/download/sample.txt"\n\n:: 2. Tải resume với -C -\ncurl.exe -s -C - -o sample.txt "http://127.0.0.1:8789/download/sample.txt"\ntype sample.txt'
            },
            realOutput: `HTTP/1.1 206 Partial Content\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS\r\nAccess-Control-Allow-Headers: *\r\nAccess-Control-Expose-Headers: *\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Range: bytes 0-38/89\r\nContent-Length: 39\r\nAccept-Ranges: bytes\r\nDate: Mon, 02 Nov 2026 07:53:13 GMT\r\nConnection: keep-alive\r\nKeep-Alive: timeout=5\r\n\r\ncURL File Transfer & Streaming Mastery \ncURL File Transfer & Streaming Mastery 2026 - Chunk 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
            explanationTokens: [
              { token: 'HTTP/1.1 206 Partial Content', meaning: 'Mã trạng thái chuẩn xác nhận máy chủ hỗ trợ và phục vụ phân đoạn byte yêu cầu' },
              { token: 'Content-Range: bytes 0-38/89', meaning: 'Phản hồi chỉ ra dải byte được trả về và tổng kích thước toàn bộ tệp là 89 bytes' },
              { token: '-C -', meaning: 'cURL tự đo kích thước file hiện tại (39 bytes) và tự động yêu cầu dải byte Range: bytes=39- để hoàn thiện tệp' }
            ]
          }
        ]
      },
      {
        id: 'sec-03',
        title: 'Lớp 3: Kiểm Soát Băng Thông Với --limit-rate & Tải Song Song (--parallel)',
        content: `
          <p>Khi thực hiện tải xuống các file lớn trong môi trường Production hoặc mạng văn phòng chia sẻ, việc cURL chiếm dụng 100% băng thông mạng có thể làm nghẽn các dịch vụ trọng yếu khác.</p>

          <h3>1. Giới Hạn Tốc Độ Bằng Cờ \`--limit-rate\`</h3>
          <p>cURL cung cấp cờ <strong><code>--limit-rate &lt;tốc_độ&gt;</code></strong> để giới hạn tốc độ truyền dữ liệu tối đa. Đơn vị mặc định là byte/giây, nhưng bạn có thể thêm các hậu tố tiện lợi:</p>
          <ul>
            <li><code>k</code> hoặc <code>K</code>: Kilobyte (ví dụ: <code>--limit-rate 500k</code> = 500 KB/s).</li>
            <li><code>m</code> hoặc <code>M</code>: Megabyte (ví dụ: <code>--limit-rate 5m</code> = 5 MB/s).</li>
            <li><code>g</code> hoặc <code>G</code>: Gigabyte (ví dụ: <code>--limit-rate 1g</code> = 1 GB/s).</li>
          </ul>

          <h3>2. Tải Song Song Hàng Loạt URL Bằng Cờ \`--parallel\` (cURL ≥ 7.66.0)</h3>
          <p>Mặc định, khi bạn truyền nhiều URL vào cURL, nó sẽ tải tuần tự từng file một. Kể từ cURL <strong>7.66.0</strong>, bạn có thể thêm cờ <strong><code>-Z, --parallel</code></strong> để tải đồng thời tất cả các URL cùng lúc:</p>
          <pre class="code-pre"><code># Tải song song 3 file cùng lúc với tối đa 3 kết nối đồng thời:
curl.exe -Z --parallel-max 3 -O "https://cdn.com/f1.zip" -O "https://cdn.com/f2.zip" -O "https://cdn.com/f3.zip"</code></pre>
        `,
        codeExamples: [
          {
            id: 'ex-ch09-sec03',
            title: 'Ví dụ 3: Giới Hạn Tốc Độ Tải Bằng Cờ --limit-rate Tránh Nghẽn Băng Thông',
            minVersion: '7.10.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s --limit-rate 100k "http://127.0.0.1:8789/ping"',
              powershell: 'curl.exe -s --limit-rate 100k "http://127.0.0.1:8789/ping"',
              cmd: 'curl.exe -s --limit-rate 100k "http://127.0.0.1:8789/ping"'
            },
            realOutput: `{"status":"ok","server":"cURL-Mock-Server-v1","port":8789}`,
            explanationTokens: [
              { token: '--limit-rate 100k', meaning: 'Hạn chế tốc độ truyền tải tối đa không vượt quá 100 Kilobytes trên mỗi giây' },
              { token: '{"status":"ok",...}', meaning: 'Dữ liệu được truyền tải trơn tru trong giới hạn kiểm soát băng thông đã định' }
            ]
          }
        ]
      },
      {
        id: 'sec-04',
        title: 'Lớp 4: Đọc Stream Thời Gian Thực Server-Sent Events (SSE), AI LLM (-N) & Ranh Giới WebSocket',
        content: `
          <p>Trong kỷ nguyên AI tạo sinh (Generative AI), hầu hết các API hiện đại như OpenAI, Anthropic Claude, Google Gemini đều sử dụng kỹ thuật <strong>Streaming</strong> thông qua giao thức <strong>Server-Sent Events (SSE - <code>text/event-stream</code>)</strong> để trả về từng từ (token) ngay khi mô hình suy luận xong.</p>

          <h3>1. Hiểm Họa Bộ Đệm Dòng (Buffering) Và Giải Pháp Cờ \`-N, --no-buffer\`</h3>
          <p>Theo mặc định trong ngôn ngữ C và hệ điều hành, luồng <code>stdout</code> được áp dụng cơ chế <em>Block Buffering</em> (tích trữ đủ 4KB hoặc 8KB dữ liệu mới xả ra màn hình một lần). Nếu bạn gọi một API Streaming mà không có cờ đặc biệt, bạn sẽ thấy terminal đứng im vài giây, rồi bất thình lình phụt ra một đoạn văn dài. Trải nghiệm thời gian thực bị phá vỡ hoàn toàn!</p>
          <p><strong>Giải pháp thiết yếu:</strong> Luôn luôn thêm cờ <strong><code>-N</code> (hoặc <code>--no-buffer</code>)</strong>. Cờ này ra lệnh cho cURL gọi <code>fflush()</code> xả ngay lập tức từng byte dữ liệu nhận được từ kết nối mạng ra màn hình terminal.</p>

          <h3>2. Ranh Giới Kỹ Thuật: cURL Và Giao Thức WebSocket (RFC 6455)</h3>
          <p>Rất nhiều lập trình viên thắc mắc: <em>"cURL có dùng để chat WebSocket được không?"</em>. Câu trả lời chuẩn mực về mặt kỹ thuật:</p>
          <ul>
            <li><strong>Về mặt lý thuyết:</strong> Từ phiên bản <strong>7.86.0</strong> (cuối năm 2022), cURL bổ sung tính năng thử nghiệm (experimental) hỗ trợ giao thức WebSocket thông qua cờ <code>--ws</code>. Bạn có thể gửi frame text hoặc frame nhị phân lên server WebSocket.</li>
            <li><strong>Về mặt thực tế:</strong> Triết lý thiết kế của cURL là công cụ truyền tải dữ liệu theo dòng lệnh (Command-line URL transfer). WebSocket là giao thức song công hai chiều toàn phần (Full-Duplex Interactive), đòi hỏi một vòng lặp sự kiện (Event Loop) tương tác liên tục vừa gõ tin nhắn vừa lắng nghe. cURL <strong>KHÔNG PHẢI</strong> là một client WebSocket tương tác như Postman hay terminal UI.</li>
            <li><strong>Khuyến nghị chuyên nghiệp:</strong> Dùng cURL để kiểm tra bắt tay HTTP 101 Switching Protocols. Khi cần kiểm thử WebSocket tương tác hai chiều thực tế, hãy dùng công cụ chuyên dụng như <strong><code>websocat</code></strong> hoặc <strong><code>wscat</code></strong>.</li>
          </ul>
        `,
        codeExamples: [
          {
            id: 'ex-ch09-sec04',
            title: 'Ví dụ 4: Đọc Luồng Dữ Liệu Thời Gian Thực Server-Sent Events (SSE) Với Cờ -N (--no-buffer)',
            minVersion: '7.0.0',
            verificationStatus: 'verified_real',
            commands: {
              bash: 'curl.exe -s -N "http://127.0.0.1:8789/stream"',
              powershell: 'curl.exe -s -N "http://127.0.0.1:8789/stream"',
              cmd: 'curl.exe -s -N "http://127.0.0.1:8789/stream"'
            },
            realOutput: `data: {"event":"ping","count":1}\n\ndata: {"event":"ping","count":2}\n\ndata: {"event":"ping","count":3}\n\n`,
            explanationTokens: [
              { token: '-N, --no-buffer', meaning: 'Vô hiệu hóa toàn bộ bộ đệm nội bộ, in dữ liệu SSE ra terminal ngay trong thời gian thực khi server bắn event' },
              { token: 'data: {"event":"ping",...}', meaning: 'Các frame Server-Sent Events (SSE) tiêu chuẩn được hiển thị mượt mà không độ trễ' }
            ]
          }
        ]
      }
    ],

    // 6. Lỗi thường gặp & Bảo mật thực chiến (Callouts)
    callouts: {
      warning: {
        title: 'Cảnh giác lỗ hổng Path Traversal khi dùng cờ -J (--remote-header-name)',
        content: 'Khi sử dụng cờ `-J`, cURL sẽ tin tưởng tên file trong header `Content-Disposition` do máy chủ gửi về. Trong quá khứ (CVE-2020-8177), nếu máy chủ độc hại trả về `filename="../../../etc/cron.d/evil"`, file có thể bị ghi đè vào thư mục nhạy cảm của hệ điều hành. Mặc dù cURL phiên bản mới đã tự động loại bỏ các ký tự phân tách thư mục (`/`, `\\`), bạn vẫn nên luôn chỉ định rõ thư mục lưu an toàn bằng cờ `--output-dir` khi tải file từ nguồn không hoàn toàn tin cậy.'
      },
      pitfalls: [
        {
          title: 'Dùng cờ -O đơn thuần trên URL chứa Query String tham số',
          content: 'Nếu bạn chạy `curl -O "https://api.com/download?file_id=123"`, cURL sẽ bóc phần cuối URL và lưu thành file có tên quái đản là `download?file_id=123`. Hãy luôn dùng `-o filename.ext` hoặc `-O -J` trong trường hợp này.'
        },
        {
          title: 'Hiểu lầm cờ -C - tự động hoạt động được trên mọi máy chủ Web',
          content: 'Cơ chế Resume chỉ hoạt động nếu máy chủ hỗ trợ Byte Range (trả về header `Accept-Ranges: bytes`). Nếu máy chủ không hỗ trợ, nó sẽ trả về HTTP 200 và cURL sẽ tải lại file từ đầu hoặc ghi đè nội dung. Luôn kiểm tra trước bằng `curl -I <URL>`.'
        },
        {
          title: 'Quên cờ -N khi kết nối tới OpenAI / LLM Streaming API',
          content: 'Khi gọi API AI dạng stream mà thiếu cờ `-N`, bạn sẽ không nhìn thấy hiệu ứng gõ chữ từng từ mượt mà (Typewriter Effect) do cơ chế đệm dòng của hệ điều hành giữ lại các byte dữ liệu.'
        },
        {
          title: 'Lầm tưởng cURL là một WebSocket chat client tương tác hai chiều',
          content: 'cURL CLI không được thiết kế cho việc chat hai chiều giữ kết nối lâu dài qua WebSocket. Dùng công cụ chuyên biệt như `websocat` hoặc `wscat` để kiểm thử giao tiếp WebSocket.'
        }
      ],
      tips: [
        {
          title: 'Bộ ba quyền lực khi viết script tải file: --create-dirs --output-dir và -O',
          content: 'Kết hợp: `curl.exe -s --create-dirs --output-dir "/path/to/dir" -O "URL"`. Câu lệnh này giúp kịch bản của bạn không bao giờ bị lỗi thiếu thư mục và tổ chức mã nguồn cực kỳ sạch sẽ.'
        },
        {
          title: 'Kiểm tra nhanh máy chủ có hỗ trợ Resume trước khi tải file lớn',
          content: 'Chạy `curl.exe -s -I "URL" | grep -i "Accept-Ranges"` (hoặc Select-String trong PowerShell). Nếu xuất hiện `Accept-Ranges: bytes`, bạn hoàn toàn yên tâm có thể dùng `-C -`.'
        }
      ],
      deepDive: {
        title: 'Cơ chế bộ đệm I/O trong hàm Curl_client_write và cờ CURLOPT_BUFFERSIZE',
        content: 'Bên trong lõi libcurl (`lib/sendf.c`), kích thước bộ đệm mặc định được cấp phát bởi hằng số `CURL_MAX_WRITE_SIZE` (16 Kilobytes) nhằm tối ưu hóa số lượng system calls `write()`. Khi cờ `-N` (`CURLOPT_BUFFERSIZE = 1`) được kích hoạt, cURL buộc con trỏ luồng gọi trực tiếp hàm xả đệm, giúp loại bỏ hoàn toàn độ trễ tích lũy hàng đợi mạng.'
      }
    },

    // 7. Bài tập thực hành (Exercises - 3 Mức độ)
    exercises: [
      {
        level: 'Dễ',
        title: 'Tải file và tự động tạo thư mục bằng --create-dirs',
        problem: 'Sử dụng cờ `--create-dirs` kết hợp `--output-dir "backup_data"` và `-o "server_ping.json"` để tải endpoint `http://127.0.0.1:8789/ping` lưu vào thư mục `backup_data`.',
        criteria: 'Thư mục `backup_data` được tự động tạo nếu chưa có, file `server_ping.json` chứa nội dung hợp lệ từ endpoint ping.',
        hint: 'Dùng cờ `--create-dirs` kết hợp `--output-dir` và `-o`.',
        starterCommands: {
          bash: 'curl.exe -s --create-dirs --output-dir "backup_data" -o "server_ping.json" "http://127.0.0.1:8789/ping"',
          powershell: 'curl.exe -s --create-dirs --output-dir "backup_data" -o "server_ping.json" "http://127.0.0.1:8789/ping"',
          cmd: 'curl.exe -s --create-dirs --output-dir "backup_data" -o "server_ping.json" "http://127.0.0.1:8789/ping"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s --create-dirs --output-dir "backup_data" -o "server_ping.json" "http://127.0.0.1:8789/ping"',
            powershell: 'curl.exe -s --create-dirs --output-dir "backup_data" -o "server_ping.json" "http://127.0.0.1:8789/ping"',
            cmd: 'curl.exe -s --create-dirs --output-dir "backup_data" -o "server_ping.json" "http://127.0.0.1:8789/ping"'
          },
          explanation: 'cURL tự động tạo thư mục cha và lưu file chính xác vào thư mục đích chỉ định.'
        },
        solutionOutput: `{"status":"ok","server":"cURL-Mock-Server-v1","port":8789}`
      },
      {
        level: 'Trung bình',
        title: 'Đọc luồng dữ liệu thời gian thực SSE bằng cờ vô hiệu hóa bộ đệm -N',
        problem: 'Kết nối tới endpoint streaming `http://127.0.0.1:8789/stream` và sử dụng cờ `-N` để in các sự kiện Server-Sent Events ra terminal ngay khi máy chủ bắn dữ liệu mà không bị đệm trễ.',
        criteria: 'Sử dụng cờ `-N` (hoặc `--no-buffer`), các dòng `data: {"event":"ping",...}` hiển thị mượt mà ra stdout.',
        hint: 'Sử dụng cờ `-N` để vô hiệu hóa line buffering.',
        starterCommands: {
          bash: 'curl.exe -s -N "http://127.0.0.1:8789/stream"',
          powershell: 'curl.exe -s -N "http://127.0.0.1:8789/stream"',
          cmd: 'curl.exe -s -N "http://127.0.0.1:8789/stream"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -N "http://127.0.0.1:8789/stream"',
            powershell: 'curl.exe -s -N "http://127.0.0.1:8789/stream"',
            cmd: 'curl.exe -s -N "http://127.0.0.1:8789/stream"'
          },
          explanation: 'Cờ `-N` loại bỏ việc tích trữ buffer, xả dữ liệu streaming ra màn hình ngay lập tức.'
        },
        solutionOutput: `data: {"event":"ping","count":1}\n\ndata: {"event":"ping","count":2}\n\ndata: {"event":"ping","count":3}\n\n`
      },
      {
        level: 'Khó',
        title: 'Tải phân đoạn Byte Range và sử dụng Resume -C - hoàn tất file dở dang',
        problem: 'Sử dụng cờ `-r 0-38` để lấy 39 byte đầu của tệp `http://127.0.0.1:8789/download/sample.txt` lưu vào `my_sample.txt`, sau đó sử dụng cờ `-C -` để tiếp tục tải nốt phần còn lại của tệp.',
        criteria: 'Kiểm tra mã phản hồi HTTP 206 Partial Content ở bước 1, và file hoàn chỉnh chứa đầy đủ toàn bộ 89 byte sau bước Resume `-C -`.',
        hint: 'Kết hợp cờ `-r 0-38` tải phân đoạn đầu, sau đó dùng `-C -` để cURL tự đo và gửi Range tiếp nối.',
        starterCommands: {
          bash: 'curl.exe -s -r 0-38 -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"\ncurl.exe -s -C - -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"',
          powershell: 'curl.exe -s -r 0-38 -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"\ncurl.exe -s -C - -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"',
          cmd: 'curl.exe -s -r 0-38 -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"\ncurl.exe -s -C - -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"'
        },
        solution: {
          commands: {
            bash: 'curl.exe -s -r 0-38 -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"\ncurl.exe -s -C - -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"',
            powershell: 'curl.exe -s -r 0-38 -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"\ncurl.exe -s -C - -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"',
            cmd: 'curl.exe -s -r 0-38 -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"\ncurl.exe -s -C - -o "my_sample.txt" "http://127.0.0.1:8789/download/sample.txt"'
          },
          explanation: 'cURL đo kích thước 39 byte có sẵn trên đĩa và gửi header Range: bytes=39- để tải phần còn lại.'
        },
        solutionOutput: `cURL File Transfer & Streaming Mastery 2026 - Chunk 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ`
      }
    ],

    // 8. Quiz trắc nghiệm tương tác
    quiz: [
      {
        question: 'Cờ `-N` (`--no-buffer`) đóng vai trò then chốt gì khi bạn thực hiện request tới Server-Sent Events (SSE) hoặc AI Streaming API?',
        options: [
          'Tăng tốc độ đường truyền mạng lên 200%.',
          'Vô hiệu hóa bộ đệm dòng (Line Buffering), in dữ liệu ngay lập tức ra terminal khi nhận được gói tin thay vì đợi đầy 4KB/8KB.',
          'Ngăn chặn server ngắt kết nối keep-alive.',
          'Mã hóa luồng dữ liệu streaming để tránh bị nghe lén.'
        ],
        correctIndex: 1,
        explanation: 'Mặc định các ứng dụng C áp dụng bộ đệm (buffering) trước khi in ra stdout. Cờ `-N` yêu cầu cURL xả đệm ngay lập tức (flush) để hiển thị mượt mà trong thời gian thực.'
      },
      {
        question: 'Khi bạn chạy lệnh `curl -C - -O <URL>` để tiếp tục tải một tệp tải dở, cURL xác định vị trí byte cần tải tiếp bằng cách nào?',
        options: [
          'Hỏi server xem lần trước đã tải đến đâu.',
          'Kiểm tra file log ẩn `.curl_progress` trên máy tính.',
          'Thực hiện lệnh kiểm tra kích thước (file size) của tệp tin hiện có trên đĩa cục bộ, rồi gửi header `Range: bytes=<size>-`.',
          'Tự động tải lại 10MB cuối cùng để ghép nối.'
        ],
        correctIndex: 2,
        explanation: 'Ký tự gạch ngang `-` trong `-C -` ra lệnh cho cURL tự động đọc kích thước của tệp cục bộ trên đĩa và thiết lập header `Range: bytes=<kích_thước>-` gửi lên server.'
      },
      {
        question: 'Khi máy chủ hỗ trợ yêu cầu tải theo Byte Range hoặc Resume tải dở, mã trạng thái HTTP nào bắt buộc phải được trả về?',
        options: [
          '`200 OK`',
          '`206 Partial Content`',
          '`304 Not Modified`',
          '`204 No Content`'
        ],
        correctIndex: 1,
        explanation: 'Theo tiêu chuẩn RFC 9110, khi máy chủ phục vụ một dải byte cụ thể theo yêu cầu của header `Range`, máy chủ bắt buộc phải phản hồi mã `206 Partial Content` kèm header `Content-Range`.'
      },
      {
        question: 'Tại sao việc dùng cờ `-O` đơn thuần trên URL dạng `https://api.com/download?file_id=123` lại gây ra vấn đề phiền toái?',
        options: [
          'cURL từ chối tải và báo lỗi Exit code 3.',
          'cURL sẽ lấy phần cuối URL làm tên file, lưu thành `download?file_id=123` rất xấu và làm mất đuôi mở rộng của tệp.',
          'cURL tự động xóa sạch nội dung ổ cứng.',
          'cURL chỉ tải được tối đa 1KB dữ liệu.'
        ],
        correctIndex: 1,
        explanation: 'Cờ `-O` chỉ bóc tách chuỗi ký tự sau dấu gạch chéo cuối cùng của URL. Nếu URL có query parameters, tên file lưu lại sẽ chứa toàn bộ query string và mất phần mở rộng (như .pdf, .zip).'
      }
    ],

    // 9. Cheat Sheet tra cứu nhanh
    cheatSheet: [
      {
        command: 'curl.exe -s -O -J -R "URL"',
        description: 'Tải file tự động lấy tên chuẩn từ header `Content-Disposition` (`-J`) và bảo lưu ngày giờ gốc của server (`-R`).'
      },
      {
        command: 'curl.exe -s --create-dirs --output-dir "./downloads" -O "URL"',
        description: 'Tự động tạo cây thư mục cha và tải file lưu vào thư mục đích chỉ định (cURL ≥ 7.73.0).'
      },
      {
        command: 'curl.exe -s -C - -O "URL"',
        description: 'Tiếp tục tải file tải dở (Resume) tự động dựa trên dung lượng byte file hiện có trên ổ đĩa.'
      },
      {
        command: 'curl.exe -s -r 0-1048575 -o "chunk1MB.bin" "URL"',
        description: 'Tải phân đoạn Byte Range cụ thể từ máy chủ (ví dụ 1 MB đầu tiên hoặc dùng `-r -500` để đọc 500 byte cuối tệp).'
      },
      {
        command: 'curl.exe -s --limit-rate 500k -O "URL"',
        description: 'Giới hạn tốc độ truyền tải tối đa 500 KB/s để không gây nghẽn băng thông mạng nội bộ.'
      },
      {
        command: 'curl.exe -s -N "URL"',
        description: 'Vô hiệu hóa bộ đệm dòng (`--no-buffer`), hiển thị trực tiếp luồng Server-Sent Events (SSE) và AI LLM Streaming không độ trễ.'
      },
      {
        command: 'curl.exe -s -Z -O "URL1" -O "URL2" -O "URL3"',
        description: 'Tải song song hàng loạt file đồng thời bằng cờ `--parallel` tận dụng tối đa đường truyền mạng (cURL ≥ 7.66.0).'
      }
    ],

    // 10. Tóm tắt bài học (Summary Box)
    summary: [
      'Lựa chọn chiến lược lưu file phù hợp: Dùng `-o` khi cần tên tùy ý, `-O` khi URL có tên file sạch sẽ, `-O -J` khi cần tên từ `Content-Disposition`, và `--create-dirs --output-dir` để tổ chức thư mục hiện đại (cURL ≥ 7.73.0).',
      'Kỹ thuật Resume tải dở bằng cờ `-C -` giúp tiết kiệm thời gian và băng thông khi tải file lớn dựa trên cơ chế HTTP `Range` và mã phản hồi `206 Partial Content`.',
      'Dùng cờ `--limit-rate` để kiểm soát băng thông mạng trong các kịch bản DevOps và tự động hóa sao lưu dữ liệu ban đêm.',
      'Bắt buộc dùng cờ `-N, --no-buffer` khi tương tác với Server-Sent Events (SSE) và AI LLM Streaming API để hiển thị từng từ (token) mượt mà trong thời gian thực.',
      'Hiểu rõ ranh giới: cURL là công cụ truyền tải dữ liệu dòng lệnh; khi cần giao tiếp WebSocket tương tác hai chiều liên tục, hãy sử dụng các công cụ chuyên dụng như `websocat` hoặc `wscat`.'
    ],

    // 11. Tài liệu tham khảo chính thức (References Box)
    references: [
      {
        title: 'RFC 9110: HTTP Semantics - Range Requests',
        url: 'https://www.rfc-editor.org/rfc/rfc9110#section-14',
        description: 'Đặc tả tiêu chuẩn IETF về cơ chế phân đoạn byte Range, Content-Range và mã trạng thái 206 Partial Content.'
      },
      {
        title: 'curl.se Official Manpage: File Transfer & Output Options',
        url: 'https://curl.se/docs/manpage.html#-o',
        description: 'Tài liệu hướng dẫn chính thức về các cờ -o, -O, -J, -C, -r, --limit-rate, --output-dir, -N.'
      },
      {
        title: 'Everything curl: Download & File Transfers',
        url: 'https://everything.curl.dev/cmdline/downloads',
        description: 'Cẩm nang toàn diện về kỹ thuật tải file, resume và tối ưu hóa hiệu năng trong Everything curl.'
      },
      {
        title: 'W3C: Server-Sent Events (SSE) Specification',
        url: 'https://html.spec.whatwg.org/multipage/server-sent-events.html',
        description: 'Chuẩn web định nghĩa định dạng text/event-stream và cơ chế streaming sự kiện một chiều từ server.'
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
          issue: 'Cạm bẫy dùng cờ -O trên URL có query string làm hỏng tên file và mất extension',
          severity: 'Critical',
          resolution: 'Đã phân tích sự khác nhau giữa -o, -O và -O -J trong Lớp 1 và đưa vào câu hỏi trắc nghiệm số 4'
        },
        {
          issue: 'Ngộ nhận cờ -C - tự động resume được trên mọi server web mà không kiểm tra Accept-Ranges',
          severity: 'Major',
          resolution: 'Đã phân tích cơ chế 206 Partial Content trong Lớp 2 và hướng dẫn dùng curl -I kiểm tra trước'
        },
        {
          issue: 'Trải nghiệm xem AI Streaming / SSE bị trễ giật cục do quên cờ vô hiệu hóa bộ đệm -N',
          severity: 'Critical',
          resolution: 'Đã xây dựng Lớp 4 chi tiết về cơ chế Line Buffering của libc và thiết kế bài tập thực hành số 2'
        },
        {
          issue: 'Nguy cơ bảo mật Path Traversal (CVE-2020-8177) khi dùng cờ -J với server không tin cậy',
          severity: 'Critical',
          resolution: 'Đã đưa vào Hộp Cảnh báo (Warning Box) và khuyến nghị dùng cờ an toàn --output-dir'
        },
        {
          issue: 'Hiểu lầm cURL có thể thay thế hoàn toàn WebSocket client tương tác hai chiều',
          severity: 'Major',
          resolution: 'Đã phân tích ranh giới kỹ thuật trong Lớp 4 và hướng dẫn sử dụng công cụ chuyên dụng websocat/wscat'
        }
      ],
      pendingAssumptions: [],
      sources: [
        'https://www.rfc-editor.org/rfc/rfc9110#section-14',
        'https://curl.se/docs/manpage.html#-o',
        'https://everything.curl.dev/cmdline/downloads',
        'https://html.spec.whatwg.org/multipage/server-sent-events.html'
      ],
      verdict: 'PASS'
    }
  };

  if (typeof window !== 'undefined') {
    window.CURL_CHAPTER_CH09_DATA = CHAPTER_DATA;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CHAPTER_DATA;
  }
})();
