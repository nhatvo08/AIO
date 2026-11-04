// Dữ liệu Chuyên đề Linux Cấp 2: Quản trị Trung cấp & Vận hành Dịch vụ
// Định dạng IIFE gán vào window để chạy mượt mà trên cả file:// và HTTP server

window.LX_LEVEL2_DATA = {
  "id": "part-lx-2",
  "number": "Cấp 2",
  "title": "Quản trị Trung cấp & Vận hành Dịch vụ",
  "level": "Trung cấp",
  "badge": "Trung cấp",
  "description": "Làm chủ xử lý văn bản chuyên sâu (grep, sed, awk), truy tìm file nâng cao (find, xargs), quản lý tiến trình & jobs, phân quyền nâng cao (umask, SUID/SGID, ACL), lập trình Shell Script thực chiến với set -euo pipefail, lập lịch cron (flock), mạng & SSH Key ed25519 và quản lý đĩa Inode.",
  "lessons": [
    {
      "id": "lx-2-01",
      "number": "2.1",
      "title": "Xử lý văn bản & Biểu thức chính quy (grep, sed, awk cơ bản, sort, uniq, cut, tr, wc)",
      "subtitle": "Khai phá sức mạnh phân tích log Nginx/Python và trích xuất dữ liệu dòng lệnh thần tốc",
      "level": "Trung cấp",
      "duration": "50 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ cú pháp và các cờ chủ lực của bộ 3 công cụ xử lý văn bản Unix: `grep` (-E, -i, -v, -n, -c), `sed` (s/find/replace/g, -i, -E), `awk` (NR, NF, $1, -F).",
        "2. [Hiểu - Understand] Giải thích sự khác biệt cơ bản giữa Regular Expressions cơ bản (BRE) và mở rộng (ERE), cơ chế xử lý theo từng dòng (Stream Processing) của sed và awk.",
        "3. [Vận dụng - Apply] Ghép nối các chuỗi lệnh trích xuất dữ liệu nâng cao (`cut`, `tr`, `sort -k`, `uniq -c`) để phân tích tệp log web, đếm mã lỗi HTTP và trích xuất cột dữ liệu CSV.",
        "4. [Phân tích - Analyze] Đánh giá hiệu năng và độ an toàn khi thay thế trực tiếp trên đĩa với `sed -i`, ngăn ngừa lỗi xóa trắng file khi quên tạo backup."
      ],
      "intuition": {
        "title": "Bộ ba Thần thánh Xử lý Văn bản: Kính lúp (grep), Dao mổ (sed) và Dây chuyền Lắp ráp (awk)",
        "metaphor": "Trong thế giới Unix, dữ liệu là dòng chảy văn bản (Text Streams). Hãy tưởng tượng bạn đang đối mặt với một kho tài liệu 10 triệu trang: `grep` giống như một chiếc kính lúp thông minh có radar: nó rà quét với tốc độ ánh sáng để tìm ra đúng những trang có chứa từ khóa hoặc mẫu regex bạn cần. `sed` (Stream Editor) giống như một con dao mổ tự động: nó đi qua từng dòng, cắt bỏ những đoạn thừa và thay thế từ ngữ cũ bằng từ mới cực kỳ chuẩn xác. Còn `awk` không chỉ là một công cụ, nó là một ngôn ngữ lập trình mini hoàn chỉnh: nó nhìn trang giấy dưới dạng bảng biểu có cột, có hàng, biết tính tổng tiền, tính trung bình cộng và định dạng báo cáo thống kê phức tạp mà không cần mở bất kỳ phần mềm Excel nào.",
        "boundary": "Với các tệp JSON hoặc YAML có cấu trúc phân tầng sâu lồng nhau, việc dùng sed/awk để parse có thể gặp lỗi khi chuỗi bị ngắt dòng hoặc chứa ký tự escape phức tạp; trong trường hợp đó nên ưu tiên dùng công cụ chuyên dụng như `jq` hoặc script Python.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🔍</span><span>BỘ BA CÔNG CỤ HUYỀN THOẠI</span><span class=\"lx-vs-tag\">Text Powerhouses</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>grep</code>:</strong> Lọc dòng khớp mẫu Regex (Globally search for RE and Print).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>sed</code>:</strong> Chỉnh sửa, biến đổi, thay thế luồng văn bản (Stream Editor).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>awk</code>:</strong> Xử lý dữ liệu dạng cột, lập trình tính toán và định dạng báo cáo.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🛠️</span><span>CÔNG CỤ BỔ TRỢ ĐƯỜNG ỐNG</span><span class=\"lx-vs-tag\">Pipeline Utilities</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>sort</code> &amp; <code>uniq -c</code>:</strong> Sắp xếp dữ liệu và đếm tần suất xuất hiện duy nhất.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>cut</code> &amp; <code>tr</code>:</strong> Cắt cột theo ký tự phân cách (delimiter) và biến đổi ký tự (uppercase/delete).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>wc -l</code>:</strong> Đếm nhanh tổng số dòng dữ liệu.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Xử lý Văn bản Stream & Biểu thức Chính quy",
          "content": "<p>Trong vận hành thực chiến, file log và tệp cấu hình có thể lên tới hàng triệu dòng. Biết cách sử dụng thành thạo grep, sed, awk giúp kỹ sư giải quyết vấn đề điều tra sự cố trong 30 giây thay vì viết script mất hàng giờ.</p>\n    <p><strong>Cơ chế phân tách trường của awk:</strong> Mặc định <code>awk</code> coi khoảng trắng hoặc tab là ký tự phân cách trường (delimiter). Biến <code>$0</code> đại diện cho toàn bộ dòng; <code>$1</code> là cột đầu tiên; <code>$NF</code> là cột cuối cùng của dòng. Cờ <code>-F','</code> cho phép định nghĩa ký tự phân cách tùy biến cho file CSV.</p>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Tình huống khuyên dùng</th></tr></thead>\n    <tbody>\n      <tr><td><code>grep</code></td><td>Tìm kiếm dòng khớp biểu thức chính quy</td><td><code>grep [cờ] 'mẫu' &lt;tệp&gt;</code></td><td><code>grep -Ei 'error|fatal' app.log</code></td><td><code>-E</code> bật ERE, <code>-i</code> không phân biệt hoa thường, <code>-v</code> đảo ngược.</td></tr>\n      <tr><td><code>sed</code></td><td>Thay thế hoặc xóa dòng trên luồng text</td><td><code>sed 's/tìm/thay/g' &lt;tệp&gt;</code></td><td><code>sed -i.bak 's/DEBUG=True/DEBUG=False/g' config.env</code></td><td><code>-i.bak</code> ghi đè an toàn kèm tạo file sao lưu <code>.bak</code> dự phòng.</td></tr>\n      <tr><td><code>awk</code></td><td>Xử lý theo cột và tính toán thống kê</td><td><code>awk -F':' '{print $1, $3}' &lt;tệp&gt;</code></td><td><code>awk '{sum += $10} END {print sum/1024/1024 \" MB\"}' access.log</code></td><td><code>$1, $2...</code> là các cột; <code>NR</code> số thứ tự dòng; <code>NF</code> số lượng cột.</td></tr>\n      <tr><td><code>sort</code></td><td>Sắp xếp dòng dữ liệu</td><td><code>sort [cờ] &lt;tệp&gt;</code></td><td><code>sort -k2,2nr data.txt</code></td><td><code>-n</code> số học, <code>-r</code> giảm dần, <code>-k</code> chỉ định cột làm khóa.</td></tr>\n      <tr><td><code>uniq -c</code></td><td>Gộp và đếm các dòng trùng lặp</td><td><code>uniq -c</code></td><td><code>sort access.log | uniq -c | sort -nr</code></td><td><strong>Bắt buộc:</strong> Dữ liệu phải được <code>sort</code> trước khi đưa vào <code>uniq</code>.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Phân tích top 5 IP truy cập nhiều nhất từ file log Nginx bằng awk và pipe",
              "lang": "Bash",
              "code": "# 1. Trích xuất cột IP (cột 1), đếm tần suất và in top 5\nawk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 5\n\n# 2. Thay thế cấu hình an toàn bằng sed có tạo file sao lưu\nsed -i.bak 's/port: 8080/port: 9000/g' /etc/myapp/config.yaml",
              "output": "   1420 192.168.1.50\n    890 10.0.0.12\n    450 172.16.0.4\n    120 192.168.1.100\n     45 10.0.0.99",
              "annotations": [
                {
                  "line": 2,
                  "text": "awk '{print $1}': Trích xuất địa chỉ IP ở cột số 1 của log web Nginx."
                },
                {
                  "line": 5,
                  "text": "sed -i.bak: Tự động tạo tệp config.yaml.bak trước khi thay đổi giá trị cổng."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-1-grep-ere",
          "title": "4.1 Lọc Mẫu Tốc độ Cao với grep & Biểu thức Chính quy Mở rộng (ERE -E)",
          "content": "<p>Mặc định, <code>grep</code> hoạt động ở chế độ <strong>BRE (Basic Regular Expressions)</strong> — nơi các ký tự như <code>+</code>, <code>?</code>, <code>|</code>, <code>()</code> bị coi là chữ thường trừ khi thêm dấu gạch chéo ngược <code>\\</code> gây rối mắt. Trong thực tế vận hành hiện đại, kỹ sư luôn bật cờ <strong><code>grep -E</code> (Extended Regular Expressions)</strong> để viết biểu thức sạch sẽ, trực quan:</p>\n    <ul>\n      <li><strong>Ký tự neo vị trí (Anchors):</strong> <code>^</code> khớp đầu dòng (ví dụ <code>^ERROR</code>), <code>$</code> khớp cuối dòng (<code>500$</code>), và <code>\\b</code> khớp ranh giới từ độc lập (ví dụ <code>grep -E '\\b404\\b'</code> chỉ bắt đúng số <code>404</code> đứng riêng chứ không bắt nhầm số <code>14049</code>!).</li>\n      <li><strong>Bộ cờ điều tra sự cố thiết yếu:</strong> <code>-i</code> (không phân biệt hoa/thường), <code>-v</code> (đảo ngược: loại bỏ dòng comment <code>grep -Ev '^(#|$)'</code> để đọc tệp cấu hình siêu sạch!), <code>-n</code> (in kèm số dòng), <code>-c</code> (chỉ đếm tổng số dòng khớp), và <code>-C 3</code> / <code>-A 3</code> / <code>-B 3</code> (in kèm 3 dòng ngữ cảnh xung quanh dòng lỗi để đọc trọn vẹn Python Traceback!).</li>\n      <li><strong>Tăng tốc gấp 5–10 lần với <code>grep -F</code>:</strong> Khi bạn chỉ tìm kiếm một chuỗi cố định (ví dụ địa chỉ IP <code>10.24.0.15</code> mà dấu chấm <code>.</code> không phải là ký tự đại diện regex), cờ <code>-F</code> (Fixed strings) tắt bộ máy biên dịch regex để dùng thuật toán so khớp chuỗi Aho-Corasick cực nhanh trên tệp log hàng chục GB.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Lọc sạch toàn bộ dòng chú thích (#) và dòng trống trong tệp cấu hình hệ thống",
              "code": "# Lọc bỏ mọi dòng bắt đầu bằng # (kể cả có khoảng trắng đầu dòng) và dòng rỗng để chỉ xem chỉ thị thực sự đang có hiệu lực\ngrep -Ev '^\\s*(#|$)' /etc/login.defs | head -n 6",
              "output": "MAIL_DIR\t/var/mail\nFAILLOG_ENAB\t\tyes\nLOG_UNKFAIL_ENAB\tno\nLOG_OK_LOGINS\t\tno\nSYSLOG_SU_ENAB\t\tyes\nSYSLOG_SG_ENAB\t\tyes",
              "annotations": [
                {
                  "line": 2,
                  "part": "-Ev '^\\s*(#|$)'",
                  "text": "-v đảo ngược kết quả; ^\\s*# bắt dòng comment có thụt lề, ^\\s*$ bắt dòng trống chỉ toàn dấu cách/tab."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-1-sed-stream",
          "title": "4.2 Biến đổi Luồng Văn bản bằng sed: Thay thế Có Sao lưu (-i.bak) & Chọn lọc Dòng",
          "content": "<p><strong><code>sed</code> (Stream Editor)</strong> đọc luồng văn bản từng dòng một vào bộ đệm (Pattern Space), thực thi tập lệnh biến đổi rồi đẩy ra đầu ra mà không cần mở trình soạn thảo tương tác. Ba kỹ thuật <code>sed</code> quan trọng nhất mà mọi kỹ sư DevOps phải nằm lòng:</p>\n    <ul>\n      <li><strong>Đổi ký tự phân cách linh hoạt khi xử lý đường dẫn:</strong> Bạn không hề bị ép phải dùng dấu gạch chéo <code>s/cũ/mới/g</code>! Khi cần thay thế đường dẫn chứa nhiều dấu <code>/</code> (như đổi <code>/var/www/html</code> thành <code>/srv/webapp/public</code>), hãy dùng ký tự <code>|</code> hoặc <code>#</code> làm dấu phân cách: <code>sed 's|/var/www/html|/srv/webapp/public|g'</code> để tránh \"rừng gậy nghiêng\" <code>\\/var\\/www\\/...</code> dễ sai sót.</li>\n      <li><strong>Ghi đè an toàn tại chỗ với <code>sed -i.bak</code>:</strong> Tuyệt đối hạn chế chạy <code>sed -i</code> trần trên tệp cấu hình production vì một regex viết nhầm có thể làm hỏng cả tệp không khôi phục được. Viết liền <code>sed -i.bak '...' app.conf</code> sẽ tự động giữ nguyên tệp gốc thành <code>app.conf.bak</code> trước khi ghi tệp mới (cơ chế tạo Inode mới rồi đổi tên nguyên tử).</li>\n      <li><strong>Trích xuất hoặc xóa theo địa chỉ dòng:</strong> <code>sed -n '100,150p' app.log</code> chỉ in đúng các dòng từ 100 đến 150 cực nhanh; <code>sed '/DEBUG/d'</code> xóa sạch mọi dòng chứa chữ DEBUG.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Thay thế đường dẫn bằng dấu phân cách | và kiểm tra chênh lệch với bản sao lưu .bak",
              "code": "# 1. Tạo tệp cấu hình mẫu và cập nhật đường dẫn an toàn kèm hậu tố sao lưu -i.bak\ncat << 'EOF' > /tmp/nginx_site.conf\nserver_name api.example.com;\nroot /var/www/legacy_html;\nEOF\n\nsed -i.bak 's|/var/www/legacy_html|/opt/webapp/dist|g' /tmp/nginx_site.conf\n\n# 2. Đối chiếu thay đổi giữa bản sao lưu và bản mới bằng lệnh diff -u\ndiff -u /tmp/nginx_site.conf.bak /tmp/nginx_site.conf || true\nrm -f /tmp/nginx_site.conf /tmp/nginx_site.conf.bak",
              "output": "--- /tmp/nginx_site.conf.bak\t2026-11-04 10:20:00.000000000 +0000\n+++ /tmp/nginx_site.conf\t2026-11-04 10:20:00.010000000 +0000\n@@ -1,2 +1,2 @@\n server_name api.example.com;\n-root /var/www/legacy_html;\n+root /opt/webapp/dist;",
              "annotations": [
                {
                  "line": 7,
                  "part": "s|...|...|g",
                  "text": "Sử dụng dấu gạch đứng | ngay sau chữ s giúp biểu thức đường dẫn Linux rõ ràng tuyệt đối, không cần escape \\/."
                },
                {
                  "line": 10,
                  "part": "diff -u",
                  "text": "Hiển thị bản vá dạng Unified Diff (dòng dấu trừ - là cũ, dấu cộng + là mới) giống hệt git diff để kiểm chứng an toàn."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-1-awk-pipeline",
          "title": "4.3 Trích xuất Cột & Thống kê Dữ liệu với awk, kết hợp sort, uniq -c, cut, tr",
          "content": "<p>Nếu <code>grep</code> mạnh về lọc dòng và <code>sed</code> mạnh về sửa chuỗi, thì <strong><code>awk</code></strong> là một ngôn ngữ xử lý dữ liệu dạng bảng hoàn chỉnh ngay trên dòng lệnh. Cấu trúc chuẩn của một chương trình <code>awk</code> gồm 3 khối: <code>BEGIN { khởi_tạo } điều_kiện { xử_lý_từng_dòng } END { tổng_kết }</code>.</p>\n    <ul>\n      <li><strong>Các biến nội tại đắc lực của <code>awk</code>:</strong> <code>$1, $2...</code> (giá trị từng cột), <code>$NF</code> (cột cuối cùng của dòng), <code>$0</code> (toàn bộ dòng), <code>NR</code> (số thứ tự dòng hiện tại — dùng <code>NR &gt; 1</code> để bỏ qua dòng tiêu đề CSV!), <code>-F':'</code> (đặt dấu phân tách cột).</li>\n      <li><strong>Tại sao <code>uniq</code> bắt buộc phải đi sau <code>sort</code>?</strong> Lệnh <code>uniq</code> hoạt động dạng luồng chỉ so sánh <em>2 dòng nằm kề sát nhau</em> để tiết kiệm RAM. Nếu tệp có thứ tự <code>A, B, A</code>, gọi thẳng <code>uniq</code> sẽ giữ nguyên cả 3 dòng! Quy trình thống kê tần suất kinh điển trong Linux luôn là: <code>trích_xuất_cột | sort | uniq -c | sort -nr | head -n 10</code>. (Hoặc dùng mảng kết hợp băm trực tiếp trong <code>awk '{count[$1]++} END {for (k in count) print count[k], k}'</code> để đỡ bước sort đầu tiên khi tệp cực lớn!).</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Phân tích log truy cập: Lọc mã lỗi 5xx và tính tổng băng thông bằng awk",
              "code": "# Tạo log mẫu định dạng chuẩn: IP - Status_Code - Response_Bytes\ncat << 'EOF' > /tmp/api_access.log\n10.0.0.5 GET /orders 200 1024\n10.0.0.8 POST /pay 502 512\n10.0.0.5 GET /users 200 2048\n10.0.0.8 POST /pay 500 256\n10.0.0.9 GET /health 200 128\nEOF\n\n# Dùng awk vừa đếm số request lỗi (>=500) vừa cộng dồn tổng dung lượng phản hồi\nawk '{ total_bytes += $5; if ($4 >= 500) err_count++ } END { printf \"Total Bytes: %d | 5xx Errors: %d\\n\", total_bytes, err_count }' /tmp/api_access.log\nrm -f /tmp/api_access.log",
              "output": "Total Bytes: 3968 | 5xx Errors: 2",
              "annotations": [
                {
                  "line": 10,
                  "part": "total_bytes += $5; if ($4 >= 500)...",
                  "text": "Quét qua tệp chỉ trong 1 lượt duy nhất (O(N)), tự động ép kiểu số học cho cột thứ 4 (HTTP status) và cột thứ 5 (Bytes)."
                },
                {
                  "line": 10,
                  "part": "END { printf ... }",
                  "text": "Khối END chỉ thực thi đúng 1 lần sau khi đã đọc hết dòng cuối cùng để in báo cáo tổng hợp."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Phân tích file log sự cố và xử lý dữ liệu người dùng.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Tìm tất cả các dòng chứa mã lỗi 500 hoặc 502 bằng Regex: <code>grep -E ' (500|502) ' /var/log/nginx/access.log</code>.</li>\n        <li><strong>Bước 2:</strong> Dùng <code>awk</code> tính tổng dung lượng byte truyền tải (cột 10) của các request lỗi.</li>\n        <li><strong>Bước 3:</strong> Dùng <code>sed</code> ẩn các thông tin thẻ tín dụng hoặc token nhạy cảm trước khi gửi log ra ngoài.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lỗi Thường Gặp Khi Dùng sed -i</div>\n          <p>Chạy <code>sed -i 's/foo/bar/' file.txt</code> trên môi trường production mà không có hậu tố sao lưu.</p>\n          <p><strong>Hậu quả:</strong> Nếu viết sai biểu thức regex, toàn bộ nội dung file sẽ bị thay đổi sai hoặc bị xóa trắng mà không có cách nào hoàn tác!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Thao Tác An Toàn Tiêu Chuẩn</div>\n          <p>Luôn test thử nghiệm trên màn hình trước (không có <code>-i</code>), hoặc thêm hậu tố <code>-i.bak</code>:</p>\n          <p><code>sed -E 's/foo/bar/g' file.txt | head -n 5</code> &rarr; Kiểm tra đúng mới chạy: <code>sed -i.bak 's/foo/bar/g' file.txt</code>.</p>\n          <p><strong>Ưu điểm:</strong> Luôn có tệp <code>file.txt.bak</code> nguyên vẹn để phục hồi trong 1 giây.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Phân tích Nhật ký Máy chủ Web & Trích xuất Dữ liệu",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.1</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Sử dụng kết hợp bộ 3 grep, sed, awk để điều tra lưu lượng truy cập web, phát hiện các IP tấn công brute-force và tạo báo cáo.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>File log giả lập tại <code>/tmp/access.log</code>.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Tạo tệp log giả lập: <code>echo '192.168.1.10 - - [28/Oct/2026:10:00:00] \"POST /login HTTP/1.1\" 401 230' > /tmp/access.log</code>.</li>\n        <li><strong>Bước 2:</strong> Lọc các dòng truy cập thất bại (mã HTTP 401): <code>grep ' 401 ' /tmp/access.log</code>.</li>\n        <li><strong>Bước 3:</strong> Dùng awk trích xuất IP và phương thức HTTP: <code>awk '{print $1, $6}' /tmp/access.log | tr -d '\"'</code>.</li>\n        <li><strong>Bước 4:</strong> Dùng sed thay thế địa chỉ IP nội bộ thành [MASKED]: <code>sed 's/192.168.[0-9]+.[0-9]+/[MASKED]/g' /tmp/access.log</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">[MASKED] - - [28/Oct/2026:10:00:00] \"POST /login HTTP/1.1\" 401 230\n-> Dữ liệu IP nhạy cảm được che giấu chuẩn xác bằng Regex.</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Viết lệnh awk tính tổng số byte truyền tải (cột 10) của toàn bộ file log.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không chạy <code>sed -i</code> đệ quy trên toàn bộ thư mục <code>/etc</code>. Luôn kiểm tra kết quả stdout trước khi áp dụng cờ ghi đè <code>-i</code>.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>uniq -c</code> không đếm gộp các dòng giống nhau</td><td>Các dòng giống nhau nằm rải rác không liền kề nhau trong tệp.</td><td>Bắt buộc phải sắp xếp tệp bằng <code>sort</code> trước khi đẩy qua <code>uniq -c</code>.</td></tr>\n          <tr><td>Biểu thức regex <code>grep</code> không nhận diện toán tử <code>+</code> hoặc <code>|</code></td><td>Đang dùng grep mặc định (Basic Regular Expressions - BRE).</td><td>Thêm cờ <code>-E</code> (Extended Regular Expressions) hoặc dùng lệnh <code>egrep</code>.</td></tr>\n          <tr><td>awk in sai cột dữ liệu</td><td>Tệp phân tách bằng dấu phẩy (CSV) hoặc tab, nhưng awk mặc định phân tách bằng khoảng trắng.</td><td>Chỉ định cờ phân cách rõ ràng: <code>awk -F',' '{print $1}'</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Che giấu dữ liệu PII trong log trước khi gửi tới bên thứ 3:</strong> Dùng <code>sed</code> để thay thế số thẻ tín dụng, API Key, mật khẩu người dùng thành chuỗi <code>***MASKED***</code> trước khi đưa vào hệ thống phân tích tập trung (Elasticsearch/Datadog).</li>\n        <li><strong>Kiểm soát tài nguyên khi chạy awk trên file khổng lồ:</strong> Khi parse file log hàng chục gigabyte, tránh dùng mảng kết hợp không giới hạn kích thước trong awk để tránh làm cạn kiệt RAM server.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>GNU Awk User's Guide:</strong> <a href=\"https://www.gnu.org/software/gawk/manual/\" target=\"_blank\" rel=\"noopener\">The GNU Awk User's Guide (gawk)</a> — Cuốn sách toàn diện về ngôn ngữ awk.</li>\n      <li><strong>Sed & Awk Book:</strong> Cuốn sách O'Reilly kinh điển 'sed & awk' của Dale Dougherty.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Cheat Sheet Biểu thức Chính quy (Regex) trong grep/sed",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Ký tự Regex</th><th>Ý nghĩa</th><th>Ví dụ</th></tr></thead>\n        <tbody>\n          <tr><td><code>^</code> / <code>$</code></td><td>Neo đầu dòng / Neo cuối dòng</td><td><code>^ERROR</code> (dòng bắt đầu bằng ERROR)</td></tr>\n          <tr><td><code>.</code></td><td>Khớp bất kỳ ký tự đơn nào</td><td><code>a.c</code> (khớp abc, a1c)</td></tr>\n          <tr><td><code>*</code></td><td>Khớp 0 hoặc nhiều lần ký tự trước</td><td><code>go*gle</code> (khớp ggle, gogle, google)</td></tr>\n          <tr><td><code>+</code> (ERE)</td><td>Khớp 1 hoặc nhiều lần ký tự trước</td><td><code>go+gle</code> (khớp gogle, google)</td></tr>\n          <tr><td><code>[0-9]</code></td><td>Khớp bất kỳ chữ số nào từ 0 đến 9</td><td><code>192.168.[0-9]+</code></td></tr>\n          <tr><td><code>(A|B)</code> (ERE)</td><td>Toán tử logic HOẶC (OR)</td><td><code>(GET|POST|DELETE)</code></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Bắt sóng đợt tấn công dò quét lỗ hổng WordPress vào server Python FastAPI",
        "content": "\n              <p>Hệ thống giám sát gửi tin nhắn khẩn cấp: CPU máy chủ web tăng vọt 95%, người dùng phản ánh trang web tải chậm. Bạn đăng nhập vào server qua SSH và cần xác minh ngay nguồn gốc sự cố.</p>\n              <p><strong>Bước 1:</strong> Bạn chạy đường ống kiểm tra các URL bị request nhiều nhất nhưng trả về mã lỗi 404:</p>\n              <pre><code>awk '$9 == 404 {print $7}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 5</code></pre>\n              <p>Kết quả hiện ra hàng chục ngàn request tới <code>/wp-login.php</code>, <code>/xmlrpc.php</code>, <code>/.env</code>. Rõ ràng một botnet đang quét các điểm yếu WordPress trên một server vốn chỉ chạy ứng dụng Python FastAPI!</p>\n              <p><strong>Bước 2:</strong> Bạn lập tức trích xuất địa chỉ IP đang gửi các request độc hại này:</p>\n              <pre><code>grep \"wp-login.php\" /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 1</code></pre>\n              <p>Phát hiện IP <code>203.0.113.195</code> đã gửi hơn 14.000 request trong 10 phút. Bạn chuyển địa chỉ IP này cho tường lửa UFW để chặn đứng cuộc tấn công ngay lập tức!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Quên thoát ký tự đặc biệt trong biểu thức Regex của grep",
            "content": "Dấu chấm <code>.</code> trong regex khớp với BẤT KỲ ký tự nào! Khi tìm kiếm địa chỉ IP như <code>192.168.1.1</code>, nếu không dùng <code>grep -F</code> (tìm chuỗi thô) hoặc escape <code>192\\.168\\.1\\.1</code>, grep sẽ khớp cả <code>192X168Y1Z1</code>."
          },
          {
            "title": "Cạm bẫy sed -i không tạo bản sao lưu trên file cấu hình sản xuất",
            "content": "Khi dùng <code>sed -i 's/.../' file.conf</code>, nếu biểu thức regex bị sai, toàn bộ nội dung file sẽ bị ghi đè vĩnh viễn không thể khôi phục. Luôn truyền đuôi file sao lưu: <code>sed -i.bak 's/...' file.conf</code> để hệ thống tự động sinh ra tệp <code>file.conf.bak</code> nguyên bản trước khi sửa."
          }
        ],
        "tips": [
          {
            "title": "Tăng tốc độ sort và grep gấp 10 lần với biến LC_ALL=C",
            "content": "Mặc định lệnh <code>sort</code> và <code>grep</code> sắp xếp theo bảng mã ngôn ngữ địa phương (UTF-8 Collation) tốn rất nhiều CPU. Khi xử lý file log khổng lồ hàng Gigabytes, hãy thêm tiền tố: <code>LC_ALL=C sort file.log</code> để hệ thống so sánh trực tiếp theo byte nhị phân, tốc độ tăng gấp 5 đến 10 lần."
          },
          {
            "title": "Khai thác biến $NF trong awk để lấy cột cuối cùng",
            "content": "Trong file log web có số lượng cột thay đổi tùy theo User-Agent, cột cuối cùng (như thời gian phản hồi response time) luôn được truy xuất chính xác bằng <code>$NF</code> (Number of Fields) thay vì phải đếm thủ công số thứ tự cột."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Đếm số lượng request HTTP 500 bằng grep -c",
          "problem": "Viết câu lệnh kết hợp grep để đếm số lượng request bị lỗi HTTP 500 trong file /var/log/nginx/access.log mà không in toàn bộ nội dung ra terminal.",
          "hint": "Sử dụng cờ -c (count) của grep kết hợp chuỗi tìm kiếm mã lỗi HTTP có dấu cách bao quanh để tránh bắt nhầm IP hay timestamp.",
          "solutionCode": "grep -c ' 500 ' /var/log/nginx/access.log",
          "solutionOutput": "1428",
          "explanation": "Cờ -c (count) yêu cầu grep chỉ đếm và in ra tổng số dòng khớp mẫu thay vì in từng dòng ra terminal, giúp tiết kiệm bộ nhớ và băng thông. Cách làm sai phổ biến: dùng 'grep ... | wc -l' vừa tốn thêm một tiến trình vừa chậm hơn.",
          "annotations": [
            {
              "part": "grep -c",
              "text": "Cờ -c đếm trực tiếp trong luồng grep, tối ưu hiệu năng I/O tối đa."
            },
            {
              "part": "' 500 '",
              "text": "Dấu cách trước và sau đảm bảo bắt đúng mã trạng thái HTTP status code 500."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp lệnh",
              "pass": "Dùng đúng grep -c",
              "excellent": "Sử dụng pattern có dấu cách tránh false positive",
              "weight": "50%"
            },
            {
              "criterion": "Hiệu năng",
              "pass": "Không dùng đường ống thừa",
              "excellent": "Tối ưu luồng đếm trực tiếp trong một tiến trình duy nhất",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Thay đổi cổng cấu hình và tạo backup bằng sed -i.bak",
          "problem": "Sử dụng sed an toàn để thay đổi cổng dịch vụ trong file .env từ PORT=8000 thành PORT=8080, đồng thời tự động tạo file dự phòng .env.bak.",
          "hint": "Sử dụng cú pháp sed -i.bak kèm lệnh thay thế s/old/new/g và kiểm tra lại bằng lệnh diff.",
          "solutionCode": "sed -i.bak 's/PORT=8000/PORT=8080/g' .env\n# Tự kiểm tra kết quả:\ndiff .env .env.bak",
          "solutionOutput": "1c1\n< PORT=8080\n---\n> PORT=8000",
          "explanation": "Cờ -i.bak thực hiện chỉnh sửa trực tiếp (in-place) và lưu bản gốc vào .env.bak. Dùng lệnh 'diff .env .env.bak' giúp kỹ sư kiểm tra trực quan sự khác biệt giữa hai bản trước khi triển khai tiếp.",
          "annotations": [
            {
              "part": "-i.bak",
              "text": "Tạo bản sao lưu nguyên bản .env.bak trước khi thực hiện bất kỳ sửa đổi nào."
            },
            {
              "part": "diff .env .env.bak",
              "text": "So sánh trực quan hai phiên bản file để xác minh thay đổi."
            }
          ],
          "rubric": [
            {
              "criterion": "Chỉnh sửa an toàn",
              "pass": "Dùng đúng cờ -i.bak",
              "excellent": "Tạo bản sao lưu và kiểm tra lại với lệnh diff",
              "weight": "50%"
            },
            {
              "criterion": "Biểu thức sed",
              "pass": "Đúng mẫu thay thế s///g",
              "excellent": "Thay thế chính xác cổng không làm biến dạng các biến môi trường khác",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Trích xuất Top 5 IP truy cập nhiều nhất bằng awk, sort và uniq",
          "problem": "Viết đường ống phân tích log Nginx để tìm ra Top 5 địa chỉ IP gửi nhiều request nhất đến máy chủ, hiển thị số lượng và IP theo thứ tự giảm dần.",
          "hint": "Kết hợp LC_ALL=C awk lấy cột 1, sort gom nhóm, uniq -c đếm số lần, sort -nr xếp giảm dần và head -n 5 lấy kết quả đầu.",
          "solutionCode": "LC_ALL=C awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 5",
          "solutionOutput": "14250 203.0.113.195\n 8920 198.51.100.44\n 3410 192.0.2.10\n 1250 198.51.100.22\n  980 203.0.113.50",
          "explanation": "Bước 1: awk '{print $1}' lấy cột IP. Bước 2: sort gom các IP giống nhau đứng cạnh nhau. Bước 3: uniq -c đếm số lần xuất hiện. Bước 4: sort -nr sắp xếp theo số lượng giảm dần. Bước 5: head -n 5 lấy 5 kết quả đầu. Tiền tố LC_ALL=C tăng tốc độ sắp xếp tối đa.",
          "annotations": [
            {
              "part": "LC_ALL=C",
              "text": "Thiết lập bảng mã byte thô, tăng tốc độ phân tích và sort lên gấp 5-10 lần."
            },
            {
              "part": "sort | uniq -c | sort -nr",
              "text": "Mẫu đường ống kinh điển trong phân tích dữ liệu Unix."
            }
          ],
          "rubric": [
            {
              "criterion": "Cấu trúc đường ống",
              "pass": "Kết hợp đúng awk, sort, uniq, head",
              "excellent": "Thêm LC_ALL=C tối ưu tốc độ phân tích file log lớn",
              "weight": "50%"
            },
            {
              "criterion": "Kết quả đầu ra",
              "pass": "Trích xuất đúng IP và số lượng",
              "excellent": "Sắp xếp chính xác theo thứ tự giảm dần số request",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Bộ 3 công cụ xử lý văn bản kinh điển của Unix: grep (tìm kiếm), sed (chỉnh sửa/thay thế), awk (trích xuất cột và tính toán dữ liệu).",
        "Luôn bật cờ -E khi dùng grep/sed để hỗ trợ biểu thức chính quy mở rộng (ERE: +, ?, |, nhóm ngoặc tròn).",
        "Khi sử dụng uniq -c để đếm tần suất xuất hiện, bắt buộc phải sắp xếp dữ liệu bằng sort trước đó.",
        "Tuyệt đối không chạy sed -i trực tiếp trên file cấu hình sản xuất nếu không có cờ sao lưu an toàn (sed -i.bak).",
        "awk là vũ khí tối thượng để phân tích tệp log web, hỗ trợ biến đếm NR (số dòng), NF (số cột) và các khối lệnh BEGIN / END."
      ],
      "generalInfo": {
        "duration": "50 phút",
        "targetAudience": "Lập trình viên Backend, Kỹ sư Dữ liệu, DevOps, SRE",
        "prerequisites": "Đã hoàn thành Cấp 1, nắm vững đường ống Pipe (`|`) và chuyển hướng I/O",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2)",
        "materials": "Terminal, các công cụ GNU `grep`, `sed`, `gawk`, file log Nginx mẫu"
      },
      "nextLessonPreview": "Trong bài tiếp theo (2.2), chúng ta sẽ làm chủ Kỹ thuật Truy tìm file & Điều phối đối số nâng cao (`find`, `xargs`, `find -exec` vs `xargs -0`) để xử lý hàng triệu file mà không lo tràn bộ đệm đối số.",
      "quiz": [
        {
          "question": "Tại sao lệnh `uniq -c file.txt` lại không đếm gộp chính xác các dòng có nội dung giống nhau nằm rải rác trong tệp?",
          "options": [
            "Vì uniq bị lỗi phần mềm.",
            "Vì thuật toán của uniq chỉ so sánh các dòng nằm LIỀN KỀ nhau; các dòng giống nhau nhưng nằm xa nhau sẽ bị coi là các nhóm riêng biệt. Do đó bắt buộc phải chạy `sort file.txt | uniq -c`.",
            "Vì uniq chỉ đếm được tối đa 10 dòng.",
            "Vì lệnh uniq chỉ chạy được trên tệp nhị phân."
          ],
          "correctIndex": 1,
          "explanation": "uniq yêu cầu dữ liệu đầu vào phải được sắp xếp liền kề (sorted). Chuỗi lệnh kinh điển luôn là: `sort | uniq -c | sort -nr`."
        },
        {
          "question": "Tùy chọn nào sau đây của lệnh `sed` cho phép thay đổi trực tiếp nội dung tệp tin trên đĩa MÀ VẪN TỰ ĐỘNG TẠO bản sao lưu an toàn mang đuôi `.bak`?",
          "options": [
            "sed -w file.txt",
            "sed -i.bak 's/old/new/g' file.txt",
            "sed --force file.txt",
            "sed -c file.txt"
          ],
          "correctIndex": 1,
          "explanation": "Cờ -i kèm theo phần mở rộng (như -i.bak) sẽ tự động tạo file sao lưu gốc trước khi ghi đè, đây là chốt chặn an toàn sống còn."
        },
        {
          "question": "Trong ngôn ngữ xử lý văn bản `awk`, biến đặc biệt nào đại diện cho TỔNG SỐ CỘT (Number of Fields) của dòng hiện tại?",
          "options": [
            "$0",
            "NR",
            "NF",
            "FS"
          ],
          "correctIndex": 2,
          "explanation": "NF (Number of Fields) là số lượng cột của dòng hiện tại; còn NR (Number of Records) là số thứ tự của dòng trong tệp."
        }
      ],
      "reflectionQuestion": "Một kỹ sư chạy lệnh `cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 10` để xem top 10 IP truy cập. Đồng nghiệp nhận xét: 'Dùng `cat` ở đầu là dư thừa (Useless Use of Cat)'. Hãy giải thích tại sao và viết lại câu lệnh tối ưu hơn.",
      "reflectionHint": "Gợi ý: Lệnh `awk` có khả năng trực tiếp mở và đọc file mà không cần `cat` chuyển tiếp qua Pipe. Viết lại tối ưu: `awk '{print $1}' access.log | sort | uniq -c | sort -nr | head -n 10` để tiết kiệm một tiến trình fork và một bộ đệm pipe."
    },
    {
      "id": "lx-2-02",
      "number": "2.2",
      "title": "Truy tìm file & Điều phối đối số nâng cao (find, xargs, find -exec vs xargs -0)",
      "subtitle": "Tìm kiếm thần tốc mọi ngóc ngách ổ đĩa và xử lý an toàn hàng loạt file có khoảng trắng",
      "level": "Trung cấp",
      "duration": "45 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ cú pháp của lệnh `find` theo các tiêu chí: tên (`-name`, `-iname`), loại (`-type f/d/l`), thời gian (`-mtime`, `-mmin`), kích thước (`-size`) và quyền hạn (`-perm`).",
        "2. [Hiểu - Understand] Giải thích sự khác biệt cơ bản về hiệu năng và cơ chế sinh tiến trình giữa `find -exec ... {} +` và `find ... | xargs`.",
        "3. [Vận dụng - Apply] Thực thi quy chuẩn an toàn quốc tế sử dụng ký tự phân cách null `find -print0 | xargs -0` để xử lý các tệp có chứa dấu cách hoặc ký tự đặc biệt.",
        "4. [Phân tích - Analyze] Đánh giá nguyên nhân lỗi `Argument list too long` khi xử lý hàng trăm ngàn tệp, so sánh cơ chế dọn dẹp an toàn chống tràn đối số."
      ],
      "intuition": {
        "title": "Đội Chó Săn Tìm Kiếm (find) và Chiếc Xe Tải Gom Hàng (xargs)",
        "metaphor": "Khi bạn cần dọn dẹp 100.000 file log rác nằm rải rác trong hàng ngàn thư mục con, việc dùng các ký tự đại diện như `rm *.log` sẽ lập tức bị hệ điều hành từ chối với lỗi 'Argument list too long' (danh sách đối số quá dài làm tràn bộ nhớ kernel). `find` giống như một đội chó săn chuyên nghiệp: bạn giao cho nó bất kỳ tiêu chí nào (tìm file tạo cách đây 7 ngày, nặng trên 100MB, thuộc sở hữu của user www-data), nó sẽ lùng sục từng ngóc ngách của ổ cứng để đánh dấu đúng các file đó. `xargs` giống như một chiếc xe tải gom hàng thông minh: thay vì gọi lệnh `rm` 100.000 lần (làm đơ CPU máy chủ), `xargs` sẽ xếp các file vào từng thùng hàng (ví dụ 1.000 file một chuyến) và chỉ gọi lệnh `rm` vài chục lần, giúp xử lý khối lượng dữ liệu khổng lồ trong chớp mắt.",
        "boundary": "Nếu tên file chứa dấu cách (spaces) hoặc dấu xuống dòng (newlines), `xargs` mặc định sẽ hiểu nhầm dấu cách là dấu phân tách giữa 2 file khác nhau, dẫn tới việc xóa nhầm tệp! Để khắc phục triệt để, chuẩn quốc tế bắt buộc phải dùng cặp bài trùng: `find -print0 | xargs -0` (dùng ký tự null byte `\\0` làm dấu phân cách).",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🔍</span><span>TIÊU CHÍ TÌM KIẾM CỦA FIND</span><span class=\"lx-vs-tag\">Query Engine</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Theo tên:</strong> <code>-name \"*.log\"</code> (phân biệt hoa thường) hoặc <code>-iname</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Theo loại:</strong> <code>-type f</code> (file thường), <code>-type d</code> (thư mục), <code>-type l</code> (symlink).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Theo kích thước:</strong> <code>-size +100M</code> (lớn hơn 100 Megabytes).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Theo thời gian:</strong> <code>-mtime +7</code> (sửa đổi cách đây hơn 7 ngày).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>⚡</span><span>ĐIỀU PHỐI ĐỐI SỐ XARGS</span><span class=\"lx-vs-tag\">Batch Dispatcher</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Chuyển luồng danh sách stdin thành đối số dòng lệnh cho lệnh tiếp theo.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Chuẩn an toàn số 1:</strong> <code>find ... -print0 | xargs -0 ...</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Thực thi song song:</strong> Cờ <code>-P 4</code> (Parallel) tận dụng tối đa đa nhân CPU.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Công cụ Tìm kiếm find & Kỹ thuật Điều phối xargs",
          "content": "<p>Trong hệ điều hành Linux, việc quét cây thư mục lớn đòi hỏi sự am hiểu về chi phí I/O đĩa cứng. <code>find</code> không chỉ tìm kiếm theo tên mà là một công cụ lọc metadata mạnh nhất hệ thống.</p>\n    <p><strong>So sánh hiệu năng giữa <code>-exec {} \\;</code> và <code>-exec {} +</code>:</strong></p>\n    <ul>\n      <li><code>-exec rm {} \\;</code>: Với mỗi file tìm thấy, hệ thống sẽ thực hiện một lời gọi hệ thống <code>fork()</code> và <code>exec()</code> tạo ra một tiến trình <code>rm</code> mới. Nếu có 10.000 file, kernel phải tạo và hủy 10.000 tiến trình riêng lẻ &rarr; Rất chậm và ngốn CPU.</li>\n      <li><code>-exec rm {} +</code> (hoặc <code>xargs</code>): Kernel gom hàng trăm file vào một dòng lệnh duy nhất (ví dụ: <code>rm file1 file2 file3...</code>) và chỉ khởi tạo tiến trình một vài lần &rarr; Tốc độ nhanh hơn 50 đến 100 lần.</li>\n    </ul>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Lệnh / Cú pháp</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Tối ưu hiệu năng</th></tr></thead>\n    <tbody>\n      <tr><td><code>find -name</code></td><td>Tìm file theo mẫu tên</td><td><code>find &lt;thư_mục&gt; -name \"mẫu\"</code></td><td><code>find /var/log -name \"*.log\"</code></td><td>Luôn bọc mẫu trong dấu ngoặc kép <code>\"*\"</code> để tránh shell globbing sớm.</td></tr>\n      <tr><td><code>find -size</code></td><td>Tìm file theo dung lượng</td><td><code>find &lt;thư_mục&gt; -size [+/-]&lt;đơn_vị&gt;</code></td><td><code>find /var -size +50M</code></td><td><code>k</code> (KiB), <code>M</code> (MiB), <code>G</code> (GiB). Dấu <code>+</code> lớn hơn, <code>-</code> nhỏ hơn.</td></tr>\n      <tr><td><code>find -mtime</code></td><td>Tìm file theo thời gian sửa đổi (ngày)</td><td><code>find &lt;thư_mục&gt; -mtime [+/-]&lt;N&gt;</code></td><td><code>find /tmp -mtime +3 -delete</code></td><td><code>+3</code> cũ hơn 3 ngày; cờ <code>-delete</code> xóa trực tiếp tối ưu I/O.</td></tr>\n      <tr><td><code>find -exec {} +</code></td><td>Gom đối số thực thi lệnh</td><td><code>find ... -exec lệnh {} +</code></td><td><code>find /opt -name \"*.py\" -exec grep -H \"DEBUG\" {} +</code></td><td>Dấu <code>+</code> gom nhiều file vào 1 lệnh (nhanh gấp 100 lần so với <code>{} \\;</code>).</td></tr>\n      <tr><td><code>xargs -0</code></td><td>Đọc đối số phân tách bằng ký tự null</td><td><code>find ... -print0 | xargs -0 lệnh</code></td><td><code>find . -name \"*.bak\" -print0 | xargs -0 rm -f</code></td><td>Chuẩn an toàn bắt buộc chống lỗi file chứa dấu cách.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Tìm kiếm các file log lớn hơn 100MB và xóa an toàn bằng xargs -0",
              "lang": "Bash",
              "code": "# 1. Tìm các tệp thường nặng hơn 100MB trong /var/log\nfind /var/log -type f -size +100M -exec ls -lh {} +\n\n# 2. Xóa các tệp tạm thời tạo cách đây hơn 30 ngày an toàn với xargs -0\nfind /tmp -type f -name \"*.tmp\" -mtime +30 -print0 | xargs -0 rm -f",
              "output": "-rw-r----- 1 root adm 142M Oct 28 10:00 /var/log/syslog.1\n-rw-r----- 1 root adm 210M Oct 28 10:00 /var/log/nginx/error.log.1",
              "annotations": [
                {
                  "line": 2,
                  "text": "-size +100M: Lọc các file có kích thước vượt quá 100 Megabytes."
                },
                {
                  "line": 5,
                  "text": "-print0 và xargs -0: Khóa chặt chuẩn null byte, an toàn 100% với file có tên chứa dấu cách."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-2-find-predicates",
          "title": "4.1 Lọc Đa Tiêu chí trong find: Thời gian (-mtime/-mmin), Dung lượng, Quyền & Toán tử Logic",
          "content": "<p>Khác với lệnh <code>locate</code> tra cứu cơ sở dữ liệu tĩnh lập sẵn, <strong><code>find</code></strong> duyệt trực tiếp cây thư mục thời gian thực và kiểm tra siêu dữ liệu Inode bằng hệ thống biểu thức vị từ (Predicates) kết hợp toán tử logic:</p>\n    <ul>\n      <li><strong>Toán tử Thời gian chính xác (Ngày vs Phút):</strong> <code>-mtime +7</code> (sửa đổi cách đây hơn 7×24 giờ — dùng dọn bản sao lưu cũ), <code>-mtime -1</code> (sửa đổi trong vòng 24 giờ qua), và đặc biệt hữu ích khi điều tra sự cố nóng là <strong><code>-mmin -15</code></strong> (tìm mọi tệp vừa bị kẻ tấn công hoặc tiến trình sửa đổi trong 15 phút vừa qua!).</li>\n      <li><strong>Kết hợp Logic AND, OR (<code>-o</code>), NOT (<code>!</code>) &amp; Cắt tỉa nhánh (<code>-prune</code>):</strong> Mặc định các cờ viết liền nhau mang nghĩa <strong>AND</strong>. Khi dùng <strong>OR (<code>-o</code>)</strong>, bắt buộc gom nhóm bằng ngoặc đơn có escape <code>\\( -name \"*.py\" -o -name \"*.sh\" \\)</code> vì phép AND có độ ưu tiên cao hơn OR! Khi quét dự án lớn, dùng <code>-path \"*/.git\" -prune -o</code> giúp <code>find</code> bỏ qua hẳn cả nhánh thư mục <code>.git</code> hay <code>node_modules</code> mà không tốn hàng vạn IOPS đọc đĩa vô ích.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kết hợp nhóm ngoặc logic OR và cắt tỉa nhánh (-prune) tối ưu I/O đĩa cứng",
              "code": "# Tạo cây dự án có chứa thư mục .git và .venv cần bỏ qua khi quét mã nguồn\nmkdir -p /tmp/find_lab/{.git,.venv,src} && touch /tmp/find_lab/.venv/ignore.py /tmp/find_lab/src/{app.py,run.sh,readme.md}\n\n# Bỏ qua .git và .venv bằng -prune, chỉ tìm tệp .py hoặc .sh trong phần còn lại\nfind /tmp/find_lab \\( -name \".git\" -o -name \".venv\" \\) -prune -o -type f \\( -name \"*.py\" -o -name \"*.sh\" \\) -print\nrm -rf /tmp/find_lab",
              "output": "/tmp/find_lab/src/app.py\n/tmp/find_lab/src/run.sh",
              "annotations": [
                {
                  "line": 5,
                  "part": "\\( ... \\) -prune -o",
                  "text": "Nếu gặp thư mục tên .git hoặc .venv thì cắt bỏ không đi sâu vào bên trong (-prune), ngược lại (-o) mới xét tiếp vế phải."
                },
                {
                  "line": 5,
                  "part": "-print",
                  "text": "Khi dùng kết hợp với -prune, bắt buộc ghi rõ hành động -print ở vế phải để không in kèm tên thư mục bị cắt tỉa."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-2-exec-batching",
          "title": "4.2 Giải phẫu Hiệu năng Hệ thống: find -exec {} \\; vs find -exec {} + và Cờ -delete",
          "content": "<p>Hiểu rõ cơ chế gọi hệ thống bên dưới các hành động của <code>find</code> là thước đo phân biệt kỹ sư quản trị hệ thống dày dạn kinh nghiệm:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Phương thức thực thi</th><th>Số lần gọi <code>fork() + execve()</code> cho 10.000 tệp</th><th>Tốc độ &amp; Tình huống sử dụng</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><code>-exec cmd {} \\;</code></td><td><strong>10.000 tiến trình riêng biệt</strong> (1 file = 1 tiến trình)</td><td>Chậm nhất; chỉ dùng khi lệnh đích bắt buộc nhận đúng 1 tệp mỗi lần (như <code>cp {} {}.bak</code>)</td></tr>\n          <tr><td><code>-exec cmd {} +</code></td><td><strong>Chỉ 1–2 tiến trình</strong> (gom tối đa danh sách đối số <code>ARG_MAX</code> ~2MB)</td><td><strong>Nhanh gấp 50–100 lần!</strong> Khuyên dùng cho <code>chmod</code>, <code>chown</code>, <code>grep</code>, <code>rm</code></td></tr>\n          <tr><td><code>-delete</code></td><td><strong>0 tiến trình phụ!</strong> (<code>find</code> gọi thẳng syscall <code>unlinkat()</code> nội bộ)</td><td><strong>Nhanh tuyệt đối</strong> khi xóa hàng triệu tệp nhỏ (session/cache rác)</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <p><strong>Cảnh báo sinh tử với cờ <code>-delete</code>:</strong> Vì <code>find</code> đánh giá các vị từ từ trái qua phải, nếu bạn viết nhầm <code>find /var/log -delete -name \"*.tmp\"</code>, nó sẽ <strong>xóa sạch toàn bộ <code>/var/log</code> trước khi kịp kiểm tra điều kiện <code>-name</code>!</strong> Luôn luôn kiểm tra bằng <code>ls</code>/<code>-print</code> trước và chỉ gắn <code>-delete</code> ở <strong>vị trí cuối cùng tuyệt đối</strong> của câu lệnh!</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Chứng minh sự khác biệt số lần khởi tạo tiến trình giữa {} \\; và {} +",
              "code": "# Tạo 4 tệp mẫu và quan sát cách echo được gọi từng lần (\\;) so với gom 1 lô duy nhất (+)\nmkdir -p /tmp/batch_demo && touch /tmp/batch_demo/f{1..4}.log\n\necho \"--- Che do tung file (;): ---\"\nfind /tmp/batch_demo -type f -exec echo \"Process PID runs on:\" {} \\;\n\necho \"--- Che do gom lo (+): ---\"\nfind /tmp/batch_demo -type f -exec echo \"Single batch call:\" {} +\nrm -rf /tmp/batch_demo",
              "output": "--- Che do tung file (;): ---\nProcess PID runs on: /tmp/batch_demo/f1.log\nProcess PID runs on: /tmp/batch_demo/f2.log\nProcess PID runs on: /tmp/batch_demo/f3.log\nProcess PID runs on: /tmp/batch_demo/f4.log\n--- Che do gom lo (+): ---\nSingle batch call: /tmp/batch_demo/f1.log /tmp/batch_demo/f2.log /tmp/batch_demo/f3.log /tmp/batch_demo/f4.log",
              "annotations": [
                {
                  "line": 5,
                  "part": "{} \\;",
                  "text": "In ra 4 dòng riêng lẻ tương ứng với 4 lần Kernel phải khởi tạo tiến trình con."
                },
                {
                  "line": 8,
                  "part": "{} +",
                  "text": "Gom cả 4 đường dẫn truyền vào 1 lần gọi duy nhất, giảm tải tối đa cho CPU trên hệ thống nhiều file."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-2-xargs-null-parallel",
          "title": "4.3 Điều phối Lô An toàn Tuyệt đối với find -print0 | xargs -0 & Xử lý Song song (-P)",
          "content": "<p>Khi cần điều phối đầu ra của <code>find</code> (hoặc bất kỳ nguồn danh sách nào) sang các câu lệnh phức tạp, <strong><code>xargs</code></strong> vượt trội hơn <code>find -exec</code> nhờ hai siêu năng lực: <strong>Kiểm soát vị trí chèn đối số (<code>-I {}</code>)</strong> và <strong>Thực thi đa luồng song song (<code>-P N</code>)</strong>.</p>\n    <ul>\n      <li><strong>Tại sao cặp bài trùng <code>-print0 | xargs -0</code> là bắt buộc trong Production?</strong> Mặc định, <code>xargs</code> tách đối số theo khoảng trắng và dấu xuống dòng. Nếu người dùng tải lên một tệp có tên <code>bao cao 2026.pdf</code> (hoặc tệp độc hại cố tình đặt tên <code>dummy /etc/passwd</code>), <code>xargs</code> thường sẽ cắt thành các tệp rời gây lỗi hoặc xóa nhầm! Trong hệ thống file Linux, ký tự duy nhất bị cấm xuất hiện trong tên tệp (ngoài <code>/</code>) là <strong>Null byte (<code>\\0</code>)</strong>. Cờ <code>find -print0</code> xuất danh sách ngăn cách bằng <code>\\0</code> và <code>xargs -0</code> đọc đúng theo <code>\\0</code>, triệt tiêu 100% rủi ro khoảng trắng hay ký tự lạ.</li>\n      <li><strong>Cờ phòng vệ <code>xargs -r</code> (<code>--no-run-if-empty</code>):</strong> Trên GNU Linux, nếu <code>find</code> không tìm thấy tệp nào (đầu ra rỗng), mặc định <code>xargs</code> vẫn cố chạy lệnh đích 1 lần không có đối số (khiến <code>rm</code> hoặc <code>chmod</code> báo lỗi cú pháp!). Luôn viết <code>xargs -0r</code> để nếu danh sách trống thì <code>xargs</code> tự thoát êm ái.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Xử lý an toàn tệp chứa khoảng trắng và tăng tốc tính hash song song 4 nhân CPU bằng xargs -P",
              "code": "# 1. Tạo các tệp có tên chứa khoảng trắng và ký tự ngoặc đặc biệt\nmkdir -p /tmp/xargs_lab\necho \"data1\" > \"/tmp/xargs_lab/Bao cao Q1 (Final).txt\"\necho \"data2\" > \"/tmp/xargs_lab/Hop dong 2026.txt\"\n\n# 2. Tính mã băm SHA-256 song song trên 2 tiến trình (-P 2) an toàn tuyệt đối với -print0 | xargs -0r\nfind /tmp/xargs_lab -type f -print0 | xargs -0r -n 1 -P 2 sha256sum\nrm -rf /tmp/xargs_lab",
              "output": "5b41362bc82b7f3d56edc5a306db22105707d01ff4819e26fa39724a2d406c96  /tmp/xargs_lab/Bao cao Q1 (Final).txt\nd98c53f67a32f9b117761c22f521f22e95d1e5b27f7510a28268b25623d13558  /tmp/xargs_lab/Hop dong 2026.txt",
              "annotations": [
                {
                  "line": 7,
                  "part": "-0r -n 1 -P 2",
                  "text": "-0 đọc phân cách null; -r không chạy nếu rỗng; -n 1 giao mỗi tệp cho 1 worker; -P 2 chạy song song 2 tiến trình cùng lúc (cực nhanh khi nén ảnh/video hoặc tính checksum hàng loạt)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Xử lý danh sách tệp có chứa khoảng trắng nguy hiểm bằng xargs.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Tạo tệp có tên chứa dấu cách: <code>touch \"user report 2026.docx\"</code>.</li>\n        <li><strong>Bước 2:</strong> Trình diễn lỗi của <code>xargs</code> thông thường khi cắt sai tên file thành 4 từ riêng biệt.</li>\n        <li><strong>Bước 3:</strong> Sửa lại bằng chuẩn mực <code>find -print0 | xargs -0</code> xử lý hoàn hảo.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lệnh Cực Kỳ Nguy Hiểm Với xargs Thường</div>\n          <p>Chạy <code>find . -name \"*.txt\" | xargs rm</code> khi thư mục có file tên <code>important data.txt</code>.</p>\n          <p><strong>Hậu quả:</strong> <code>xargs</code> tách khoảng trắng thành 2 file: <code>rm important</code> và <code>rm data.txt</code>. Lệnh sẽ xóa nhầm file hoặc báo lỗi kỳ quặc!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Chuẩn Mực Bắt Buộc: Cặp Bài Trùng -print0 & -0</div>\n          <p>Luôn sử dụng cờ null byte khi nối <code>find</code> sang <code>xargs</code>:</p>\n          <p><code>find . -name \"*.txt\" -print0 | xargs -0 rm -f</code></p>\n          <p><strong>Ưu điểm:</strong> Null byte (<code>\\0</code>) là ký tự duy nhất trong chuẩn POSIX không bao giờ xuất hiện trong tên file, đảm bảo an toàn tuyệt đối.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Tự Động Hóa Dọn Dẹp File & Tìm Kiếm File Cấu Hình Phức Tạp",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.2</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thành thạo sử dụng <code>find</code> đa điều kiện (thời gian, kích thước, phần mở rộng) và điều phối đối số bằng <code>xargs -0</code>.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Thư mục thực hành <code>~/lab2_2</code>.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Tạo cấu trúc tệp thử nghiệm: <code>mkdir -p ~/lab2_2 && touch ~/lab2_2/\"daily report 01.log\" ~/lab2_2/\"daily report 02.log\"</code>.</li>\n        <li><strong>Bước 2:</strong> Tìm tất cả các file có đuôi <code>.log</code> sửa đổi trong vòng 60 phút qua: <code>find ~/lab2_2 -type f -name \"*.log\" -mmin -60</code>.</li>\n        <li><strong>Bước 3:</strong> Nén toàn bộ các file tìm thấy thành một file backup duy nhất bằng <code>xargs</code>: <code>find ~/lab2_2 -type f -name \"*.log\" -print0 | xargs -0 tar -czvf ~/lab2_2/logs_bundle.tar.gz</code>.</li>\n        <li><strong>Bước 4:</strong> Kiểm tra nội dung bên trong file nén bằng <code>tar -tf ~/lab2_2/logs_bundle.tar.gz</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">tar -tf ~/lab2_2/logs_bundle.tar.gz\n-> Chứa đầy đủ các file có khoảng trắng mà không bị ngắt quãng.</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Tìm tất cả các file trong <code>/etc</code> có quyền bát phân là <code>777</code> (nếu có) bằng cờ <code>-perm</code>.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Khi sử dụng cờ <code>-delete</code> trong lệnh <code>find</code>, LUÔN LUÔN chạy lệnh tìm kiếm in ra màn hình trước để thẩm định danh sách file sẽ bị xóa. Cờ <code>-delete</code> sẽ xóa file ngay lập tức không có bước hỏi xác nhận!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>bash: /usr/bin/rm: Argument list too long</code></td><td>Mẫu wildcard <code>rm *</code> mở rộng ra quá nhiều đối số làm vượt quá giới hạn <code>ARG_MAX</code> của Kernel.</td><td>Thay thế bằng <code>find . -type f -delete</code> hoặc <code>find . -type f -print0 | xargs -0 rm -f</code>.</td></tr>\n          <tr><td>find in ra kết quả sai hoặc bỏ sót file</td><td>Quên bọc mẫu tìm kiếm trong dấu ngoặc kép (như <code>find . -name *.log</code>), khiến Shell tự mở rộng wildcard trước khi lệnh find chạy.</td><td>Luôn bọc tên mẫu trong dấu ngoặc kép: <code>find . -name \"*.log\"</code>.</td></tr>\n          <tr><td>Lỗi Permission denied khi find quét ổ đĩa</td><td>find quét qua các thư mục của root (như <code>/root</code>, <code>/var/spool/cron</code>) mà tài khoản thường không có quyền đọc.</td><td>Chuyển hướng luồng lỗi vào thùng rác: <code>find / -name \"nginx.conf\" 2>/dev/null</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Định kỳ rà quét các tệp SUID nguy hiểm:</strong> Chạy <code>find / -perm -4000 -type f 2>/dev/null</code> để phát hiện các file có cờ SUID leo thang đặc quyền bất thường do mã độc để lại.</li>\n        <li><strong>Luôn dùng cờ an toàn <code>-maxdepth</code> khi quét:</strong> Hạn chế độ sâu quét bằng <code>find /var/log -maxdepth 2</code> để tránh việc find quét lạc vào các mount point mạng NFS làm nghẽn băng thông hệ thống.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>GNU Findutils Manual:</strong> <a href=\"https://www.gnu.org/software/findutils/manual/\" target=\"_blank\" rel=\"noopener\">GNU Findutils Documentation (find, xargs, locate)</a>.</li>\n      <li><strong>POSIX find Utility Specification:</strong> The Open Group Shell & Utilities.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Tra cứu Tiêu chí Lệnh find",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tiêu chí Lọc</th><th>Cờ lệnh</th><th>Ví dụ thực tế</th></tr></thead>\n        <tbody>\n          <tr><td>Theo tên (không phân biệt hoa thường)</td><td><code>-iname \"mẫu\"</code></td><td><code>find . -iname \"readme*\"</code></td></tr>\n          <tr><td>Chỉ tìm File / Chỉ tìm Thư mục</td><td><code>-type f</code> / <code>-type d</code></td><td><code>find /opt -type d</code></td></tr>\n          <tr><td>Theo thời gian truy cập / sửa đổi</td><td><code>-atime</code> / <code>-mtime</code> / <code>-mmin</code></td><td><code>find /var/log -mmin -30</code></td></tr>\n          <tr><td>Theo dung lượng file</td><td><code>-size [+/-]K/M/G</code></td><td><code>find /home -size +1G</code></td></tr>\n          <tr><td>Theo chủ sở hữu</td><td><code>-user &lt;tên_user&gt;</code></td><td><code>find /tmp -user www-data</code></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Giải cứu ổ cứng khỏi hàng ngàn file upload tạm thời của người dùng",
        "content": "\n              <p>Thư mục <code>/var/uploads/temp/</code> của website bị phình to bất thường, chứa hơn 50.000 tệp tin do người dùng tải lên trong lúc xử lý ảnh. Nhiều file do người dùng đặt tên có dấu cách như <code>Báo cáo tài chính quý 1.pdf</code>, <code>ảnh chụp màn hình (1).png</code>.</p>\n              <p><strong>Bước 1:</strong> Nếu bạn chạy lệnh đơn giản <code>rm /var/uploads/temp/*</code>, shell sẽ báo lỗi kinh điển: <code>bash: /bin/rm: Argument list too long</code> (Danh sách đối số vượt quá bộ đệm ARG_MAX của nhân Linux).</p>\n              <p><strong>Bước 2:</strong> Bạn sử dụng cặp bài trùng <code>find -print0 | xargs -0</code> để xóa an toàn các file tạm cũ hơn 24 giờ:</p>\n              <pre><code>find /var/uploads/temp -type f -mmin +1440 -print0 | xargs -0 -r rm -f</code></pre>\n              <p>Lệnh chạy êm ru, giải phóng ngay 18GB dung lượng đĩa mà không hề gặp lỗi ngắt quãng hay hiểu nhầm khoảng trắng trong tên file!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Không dùng -print0 khi truyền danh sách file cho xargs",
            "content": "Mặc định <code>xargs</code> coi khoảng trắng và dấu xuống dòng là ký tự phân tách đối số. Nếu một file có tên là <code>Bao cao quy 1.pdf</code>, lệnh <code>find . -name '*.pdf' | xargs rm</code> sẽ phân tách thành 4 đối số riêng biệt: <code>Bao</code>, <code>cao</code>, <code>quy</code>, <code>1.pdf</code> dẫn đến xóa nhầm file khác! Luôn dùng cặp bài trùng: <code>find ... -print0 | xargs -0 ...</code>."
          },
          {
            "title": "Nhầm lẫn giữa cú pháp -mtime +7 và -mtime -7",
            "content": "Trong lệnh find: <code>-mtime +7</code> nghĩa là tệp được sửa đổi cách đây <strong>HƠN 7 ngày</strong> (từ ngày thứ 8 trở về trước - phù hợp để xóa log cũ); còn <code>-mtime -7</code> nghĩa là tệp được sửa đổi trong vòng <strong>ÍT HƠN 7 ngày</strong> qua. Dùng nhầm dấu trừ <code>-7</code> khi xóa log sẽ xóa sạch toàn bộ log mới của tuần hiện tại!"
          }
        ],
        "tips": [
          {
            "title": "Ưu tiên dùng -exec command {} + thay vì \\;",
            "content": "Cú pháp <code>-exec cmd {} \\;</code> sẽ gọi tiến trình <code>cmd</code> hàng ngàn lần (mỗi file một tiến trình), làm CPU quá tải. Cú pháp <code>-exec cmd {} +</code> sẽ gom hàng trăm file vào một dòng lệnh duy nhất để chạy một lần, nhanh hơn gấp 50 lần."
          },
          {
            "title": "Luôn chạy dry-run với -ls trước khi dùng -delete",
            "content": "Cờ <code>-delete</code> của lệnh find sẽ xóa ngay lập tức không hỏi lại. Hãy luôn thay thế <code>-delete</code> bằng <code>-ls</code> hoặc <code>-print</code> trước để mắt bạn kiểm tra danh sách chính xác các file sắp bị xóa."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Tìm kiếm file log lớn hơn 100MB trong /var/log",
          "problem": "Viết lệnh tìm tất cả các file log (.log) trong thư mục /var/log có kích thước lớn hơn 100MB để chuẩn bị nén xoay vòng.",
          "hint": "Sử dụng lệnh find với các điều kiện -type f, -name \"*.log\" và cờ kích thước -size +100M.",
          "solutionCode": "find /var/log -type f -name \"*.log\" -size +100M",
          "solutionOutput": "/var/log/nginx/access.log\n/var/log/syslog.1",
          "explanation": "Cờ -type f chỉ lọc file thông thường (bỏ qua thư mục), -name lọc theo tên và -size +100M tìm file lớn hơn 100 Megabytes.",
          "annotations": [
            {
              "part": "-type f",
              "text": "Chỉ tìm kiếm tệp tin thông thường, bỏ qua thư mục, socket hay block device."
            },
            {
              "part": "-size +100M",
              "text": "Dấu + đại diện cho điều kiện lớn hơn, M là đơn vị Megabytes."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp find",
              "pass": "Dùng đúng -type f và -name",
              "excellent": "Lọc đúng kích thước bằng -size +100M",
              "weight": "50%"
            },
            {
              "criterion": "Độ an toàn",
              "pass": "Chỉ tra cứu không phá hủy dữ liệu",
              "excellent": "Giới hạn chính xác phạm vi tìm kiếm trong /var/log",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Dọn dẹp file tạm an toàn với find -print0 và xargs -0",
          "problem": "Viết câu lệnh an toàn để tìm và xóa toàn bộ các file tạm trong /tmp/app/ có đuôi .tmp được tạo cách đây hơn 7 ngày, đảm bảo chạy an toàn ngay cả khi tên file chứa khoảng trắng.",
          "hint": "Luôn kết hợp find -print0 với xargs -0 rm -f để ngăn chặn lỗi phân tách đối số khi tên file chứa khoảng trắng.",
          "solutionCode": "# Bước 1 (Dry-run xem trước):\nfind /tmp/app -type f -name \"*.tmp\" -mtime +7 -print0 | xargs -0 -r ls -l\n\n# Bước 2 (Xóa an toàn):\nfind /tmp/app -type f -name \"*.tmp\" -mtime +7 -print0 | xargs -0 -r rm -f",
          "solutionOutput": "# Đã dọn dẹp an toàn các file tạm cũ hơn 7 ngày không gây lỗi tách chuỗi",
          "explanation": "Cặp cờ -print0 và -0 sử dụng ký tự null byte (\\0) làm phân cách thay vì khoảng trắng, bảo vệ an toàn tuyệt đối trước các file có tên chứa dấu cách hay ký tự lạ.",
          "annotations": [
            {
              "part": "-print0 | xargs -0",
              "text": "Kỹ thuật tiêu chuẩn bắt buộc trong quản trị hệ thống để chống lỗi Argument List."
            },
            {
              "part": "-r",
              "text": "Cờ --no-run-if-empty của xargs tránh chạy rm nếu đầu vào rỗng."
            }
          ],
          "rubric": [
            {
              "criterion": "An toàn null-byte",
              "pass": "Dùng -print0 và xargs -0",
              "excellent": "Có bước dry-run kiểm tra trước khi thực thi lệnh rm",
              "weight": "50%"
            },
            {
              "criterion": "Điều kiện thời gian",
              "pass": "Dùng đúng -mtime +7",
              "excellent": "Thêm cờ -r ngăn xargs chạy khi không có file khớp",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Sao lưu hàng loạt file Python sửa đổi gần nhất",
          "problem": "Tìm tất cả các file mã nguồn Python (.py) trong dự án /home/user/myproject được sửa đổi trong vòng 24 giờ qua và sao chép chúng sang thư mục /tmp/backup_recent/.",
          "hint": "Sử dụng find với điều kiện -mtime -1 kết hợp xargs -I {} cp {} /tmp/backup_recent/.",
          "solutionCode": "mkdir -p /tmp/backup_recent\nfind /home/user/myproject -type f -name \"*.py\" -mtime -1 -print0 | xargs -0 -I {} cp {} /tmp/backup_recent/",
          "solutionOutput": "# Đã sao lưu 12 file .py sửa đổi trong 24h qua sang /tmp/backup_recent/",
          "explanation": "Cờ -mtime -1 lọc các file có mtime trong vòng 1 ngày qua. xargs -I {} thay thế từng placeholder {} bằng đường dẫn file tương ứng để sao chép chuẩn xác.",
          "annotations": [
            {
              "part": "-mtime -1",
              "text": "Dấu trừ biểu thị thời gian nhỏ hơn 1 ngày (24 giờ qua)."
            },
            {
              "part": "xargs -I {}",
              "text": "Placeholder {} đại diện cho từng đối số truyền vào câu lệnh đích."
            }
          ],
          "rubric": [
            {
              "criterion": "Lọc thời gian",
              "pass": "Dùng đúng -mtime -1",
              "excellent": "Tạo thư mục đích an toàn trước khi sao chép",
              "weight": "50%"
            },
            {
              "criterion": "Sao chép đối số",
              "pass": "Sao chép được file tìm thấy",
              "excellent": "Sử dụng placeholder xargs -I chuẩn xác",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "find là công cụ quét cây thư mục mạnh mẽ nhất của Linux, hỗ trợ lọc đa điều kiện theo tên, kích thước, thời gian và quyền hạn.",
        "Để tránh lỗi 'Argument list too long' khi xử lý hàng ngàn file, luôn sử dụng find kết hợp xargs thay vì dùng ký tự wildcard (*).",
        "Quy chuẩn an toàn bắt buộc khi kết hợp find và xargs là sử dụng ký tự phân cách null byte: `find ... -print0 | xargs -0 ...`.",
        "Dấu `+` trong `find -exec ... {} +` gom nhiều đối số lại thành một lời gọi lệnh duy nhất, nhanh gấp 50-100 lần so với `{} \\;`.",
        "Cờ `-delete` của find giúp xóa tệp nhanh và an toàn; tuy nhiên luôn phải chạy thử lệnh in danh sách file trước khi gắn cờ xóa."
      ],
      "generalInfo": {
        "duration": "45 phút",
        "targetAudience": "Lập trình viên, DevOps, Kỹ sư Quản trị Hệ thống",
        "prerequisites": "Đã hoàn thành Bài 2.1, hiểu Inode và phân cấp thư mục FHS",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2)",
        "materials": "Terminal, các tiện ích `find`, `xargs`, thư mục dữ liệu nhiều tệp giả lập"
      },
      "nextLessonPreview": "Trong bài tiếp theo (2.3), chúng ta sẽ làm chủ Quản lý Tiến trình & Tác vụ Nền (`ps`, `top`/`htop`, `kill`, signal 15 vs 9, `jobs`, `fg`/`bg`, `nohup`) để kiểm soát tài nguyên và xử lý tiến trình treo.",
      "quiz": [
        {
          "question": "Tại sao khi kết hợp lệnh `find` và `xargs` để xử lý danh sách file, chuẩn quốc tế luôn bắt buộc phải sử dụng cặp cờ `-print0` và `-0`?",
          "options": [
            "Để nén dữ liệu trong lúc truyền qua pipe.",
            "Vì null byte (\\0) là ký tự duy nhất không bao giờ được phép xuất hiện trong tên file, giúp xargs không bị nhầm lẫn khi file chứa dấu cách hoặc ký tự xuống dòng.",
            "Vì cờ -0 giúp xargs chạy với quyền root.",
            "Vì cờ -print0 chỉ in ra các file có dung lượng bằng 0."
          ],
          "correctIndex": 1,
          "explanation": "-print0 và xargs -0 sử dụng ký tự phân cách ASCII NUL (\\0), bảo đảm an toàn tuyệt đối 100% trước bất kỳ tên tệp kỳ quặc nào chứa dấu cách hay tab."
        },
        {
          "question": "Điểm khác biệt cốt lõi về hiệu năng giữa `find . -name \"*.log\" -exec rm {} \\;` và `find . -name \"*.log\" -exec rm {} +` là gì?",
          "options": [
            "Cú pháp với dấu `+` sẽ gom nhiều file vào MỘT câu lệnh rm duy nhất, giảm số lần fork tiến trình và tăng tốc độ lên hàng chục lần.",
            "Cú pháp với dấu `\\;` chạy song song trên nhiều CPU.",
            "Dấu `+` chỉ xóa file có dung lượng dương.",
            "Hai cú pháp này chạy hoàn toàn giống nhau không có khác biệt."
          ],
          "correctIndex": 0,
          "explanation": "Dấu `+` chỉ thị cho find gom đối số (tương tự như xargs), hạn chế tối đa việc tạo tiến trình con lặp đi lặp lại."
        },
        {
          "question": "Khi bạn gặp thông báo lỗi `bash: /usr/bin/rm: Argument list too long`, nguyên nhân gốc rễ là gì?",
          "options": [
            "Tệp bạn muốn xóa có tên quá dài vượt quá 255 ký tự.",
            "Ký tự đại diện wildcard (*) mở rộng ra quá nhiều tệp, làm vượt quá giới hạn bộ nhớ đối số dòng lệnh (ARG_MAX) của nhân Linux Kernel.",
            "Bạn chưa cài đặt lệnh rm.",
            "Ổ cứng bị mất điện."
          ],
          "correctIndex": 1,
          "explanation": "ARG_MAX là giới hạn bộ đệm đối số của hệ điều hành. Khắc phục bằng cách dùng `find ... -print0 | xargs -0 rm` để chia nhỏ thành từng đợt đối số."
        }
      ],
      "reflectionQuestion": "Một đồng nghiệp trong ca trực phát hiện thư mục `/var/spool/client_queue/` đang chứa 800.000 file rác. Đồng nghiệp này gõ `rm -f /var/spool/client_queue/*` và bị báo lỗi `Argument list too long`. Hãy đề xuất 2 giải pháp dòng lệnh khác nhau để xóa sạch 800.000 file này an toàn mà không làm sập máy chủ.",
      "reflectionHint": "Gợi ý: (1) Sử dụng `find /var/spool/client_queue/ -type f -delete` (cách nhanh nhất do thực thi trực tiếp ở tầng kernel syscall unlink mà không fork tiến trình ngoài); (2) Sử dụng `find /var/spool/client_queue/ -type f -print0 | xargs -0 -P 4 rm -f` (chia nhỏ thành các batch đối số và chạy song song 4 luồng)."
    },
    {
      "id": "lx-2-03",
      "number": "2.3",
      "title": "Quản lý tiến trình & Tác vụ nền (ps, top/htop, kill, signal 15 vs 9, jobs, fg/bg, nohup)",
      "subtitle": "Kiểm soát vòng đời tiến trình, giải phóng CPU/RAM và duy trì dịch vụ chạy ngầm bền bỉ",
      "level": "Trung cấp",
      "duration": "50 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ cú pháp của các lệnh giám sát và điều khiển tiến trình: `ps aux`, `ps -ef`, `top`, `htop`, `kill`, `pkill`, `jobs`, `fg`, `bg`, `nohup`.",
        "2. [Hiểu - Understand] Giải thích sự khác biệt cốt lõi giữa Tín hiệu đóng an toàn SIGTERM (15 - cho phép dọn dẹp kết nối) và Tín hiệu cưỡng chế SIGKILL (9 - lập tức giải phóng bởi Kernel).",
        "3. [Vận dụng - Apply] Thực thi quy trình điều tra tiến trình ngốn CPU/RAM, đẩy tiến trình chạy nền độc lập bằng `nohup ... &` và gửi tín hiệu định tuyến chính xác.",
        "4. [Phân tích - Analyze] Đánh giá vòng đời tiến trình Linux (Fork & Exec), phân biệt rạch ròi giữa Tiến trình Mồ côi (Orphan Process) và Tiến trình Thây ma (Zombie Process - Defunct)."
      ],
      "intuition": {
        "title": "Bảng Điều khiển Chuyến bay và Hai Cách Tắt Động cơ (SIGTERM vs SIGKILL)",
        "metaphor": "Mỗi chương trình đang chạy trên Linux là một 'Chuyến bay' mang số hiệu định danh duy nhất PID (Process ID). Bảng đồng hồ `ps` hoặc `top` giống như màn hình Radar của Trạm Kiểm soát Không lưu: cho bạn biết độ cao (mức ngốn CPU), lượng nhiên liệu tiêu thụ (dung lượng RAM) và ai là cơ trưởng (User sở hữu). Khi bạn cần dừng một chuyến bay, bạn có 2 cách gửi tín hiệu: (1) `SIGTERM (Signal 15)` giống như việc bạn gọi bộ đàm báo: 'Cơ trưởng ơi, hãy hạ cánh an toàn!': Tiến trình sẽ có thời gian lưu lại các tệp đang viết dở, đóng kết nối cơ sở dữ liệu và dọn dẹp bộ nhớ trước khi tắt hẳn. (2) `SIGKILL (Signal 9)` giống như một cú sét đánh ngang tai: Kernel lập tức cắt nguồn điện của tiến trình trong 1 phần triệu giây; tiến trình không kịp trăn trối hay lưu bất kỳ dữ liệu nào, dễ dẫn đến lỗi hỏng file (corrupted data).",
        "boundary": "SIGKILL (9) và SIGSTOP (19) là hai tín hiệu đặc biệt duy nhất mà tiến trình KHÔNG THỂ bắt (catch), không thể chặn (block) và không thể phớt lờ (ignore); chúng được Kernel xử lý trực tiếp.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📡</span><span>CÁC TÍN HIỆU (SIGNALS) CỐT LÕI</span><span class=\"lx-vs-tag\">IPC Signals</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>SIGTERM (15):</strong> Yêu cầu kết thúc lịch sự (Graceful Shutdown) — Lựa chọn số 1.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>SIGKILL (9):</strong> Cưỡng chế tiêu diệt tức thì bởi Kernel — Chỉ dùng khi tiến trình treo cứng.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>SIGHUP (1):</strong> Treo máy / Tín hiệu yêu cầu nạp lại file cấu hình (Reload config).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>SIGINT (2):</strong> Ngắt từ bàn phím khi ấn <code>Ctrl + C</code>.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🧟</span><span>TRẠNG THÁI TIẾN TRÌNH ĐẶC BIỆT</span><span class=\"lx-vs-tag\">Process States</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Zombie (Z / Defunct):</strong> Tiến trình con đã chết nhưng cha chưa đọc exit code; không ngốn RAM nhưng tốn slot trong Process Table.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Orphan (Mồ côi):</strong> Tiến trình cha chết trước con; tự động được <code>systemd (PID 1)</code> nhận nuôi và dọn dẹp.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Vòng đời Tiến trình, Quản lý Tín hiệu & Tác vụ Nền",
          "content": "<p>Mọi hoạt động trên máy chủ Linux đều là các tiến trình được sinh ra từ tiến trình gốc PID 1 (systemd) thông qua cơ chế <code>fork()</code> và <code>execve()</code>. Nắm vững tiến trình là kỹ năng sống còn của kỹ sư vận hành.</p>\n    <p><strong>Quy trình xử lý tiến trình treo chuẩn mực:</strong></p>\n    <ol>\n      <li><strong>Bước 1:</strong> Xác định PID và mức ngốn tài nguyên bằng <code>ps aux | grep &lt;app&gt;</code> hoặc <code>htop</code>.</li>\n      <li><strong>Bước 2:</strong> Gửi tín hiệu lịch sự <code>kill -15 &lt;PID&gt;</code> để tiến trình tự giải phóng tài nguyên.</li>\n      <li><strong>Bước 3:</strong> Chờ 5–10 giây. Nếu tiến trình vẫn bị treo cứng (vòng lặp vô tận hoặc lỗi I/O không phản hồi), lúc này mới thực thi <code>kill -9 &lt;PID&gt;</code>.</li>\n    </ol>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Cảnh báo</th></tr></thead>\n    <tbody>\n      <tr><td><code>ps aux</code></td><td>Chụp ảnh nhanh trạng thái mọi tiến trình</td><td><code>ps aux | grep &lt;tên&gt;</code></td><td><code>ps aux | grep python3</code></td><td>Phong cách BSD: hiển thị User, PID, %CPU, %MEM, VSZ, RSS, STAT, TIME, COMMAND.</td></tr>\n      <tr><td><code>top</code> / <code>htop</code></td><td>Giám sát tài nguyên thời gian thực tương tác</td><td><code>top</code> / <code>htop</code></td><td><code>htop</code></td><td>Phím <code>P</code> sắp xếp theo CPU, <code>M</code> theo RAM, <code>k</code> để kill tiến trình.</td></tr>\n      <tr><td><code>kill</code></td><td>Gửi tín hiệu dừng tiến trình theo PID</td><td><code>kill -&lt;signal&gt; &lt;PID&gt;</code></td><td><code>kill -15 1337</code></td><td>Mặc định gửi SIGTERM (15); chỉ dùng <code>kill -9</code> khi SIGTERM không hiệu lực sau 10s.</td></tr>\n      <tr><td><code>pkill</code> / <code>killall</code></td><td>Gửi tín hiệu theo tên tiến trình</td><td><code>pkill [cờ] &lt;tên_tiến_trình&gt;</code></td><td><code>pkill -f \"gunicorn worker\"</code></td><td><code>-f</code> khớp theo toàn bộ dòng lệnh khởi động. Cực kỳ cẩn thận tránh kill nhầm!</td></tr>\n      <tr><td><code>nohup ... &</code></td><td>Chạy tiến trình nền không chết khi ngắt SSH</td><td><code>nohup lệnh &gt; out.log 2&gt;&amp;1 &</code></td><td><code>nohup python3 app.py &gt; app.log 2&gt;&amp;1 &</code></td><td>Bỏ qua tín hiệu SIGHUP khi đóng cửa sổ terminal hoặc rớt mạng.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Điều tra tiến trình ngốn tài nguyên và điều khiển tác vụ nền jobs/fg/bg",
              "lang": "Bash",
              "code": "# 1. Xem top 5 tiến trình ngốn RAM nhiều nhất\nps aux --sort=-%mem | head -n 6\n\n# 2. Đưa một lệnh đang chạy vào nền bằng Ctrl+Z và kích hoạt bg\n# Nhấn Ctrl + Z -> Hệ thống in: [1]+ Stopped sleep 100\nbg %1\njobs -l",
              "output": "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\npostgres  1120  0.2 12.5 450120 204500 ?       S    10:00   0:15 /usr/lib/postgresql\nredis     1080  0.1  8.2 210000 134200 ?       S    10:00   0:08 /usr/bin/redis-server\n[1]+ 15420 Running                 sleep 100 &",
              "annotations": [
                {
                  "line": 2,
                  "text": "ps aux --sort=-%mem: Sắp xếp danh sách tiến trình giảm dần theo tỷ lệ sử dụng RAM."
                },
                {
                  "line": 6,
                  "text": "bg %1: Tiếp tục cho tiến trình số 1 chạy tiếp ở chế độ nền (background)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-3-process-states",
          "title": "4.1 Giải phẫu Trạng thái Tiến trình (R, S, D, Z, T) qua ps và top/htop",
          "content": "<p>Khi máy chủ có dấu hiệu chậm bất thường hoặc Load Average tăng vọt dù %CPU thấp, việc đọc đúng cột <strong><code>STAT</code></strong> trong <code>ps aux</code> / <code>top</code> sẽ chỉ ra ngay nguyên nhân gốc rễ:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Mã <code>STAT</code></th><th>Tên Trạng thái Kernel</th><th>Bản chất Hoạt động &amp; Cách Xử lý Sự cố</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><strong><code>R</code></strong></td><td>Running / Runnable</td><td>Đang thực thi trên nhân CPU hoặc nằm trong hàng đợi sẵn sàng chạy ngay</td></tr>\n          <tr><td><strong><code>S</code></strong></td><td>Interruptible Sleep</td><td>Đang ngủ chờ sự kiện (chờ request mạng, chờ gõ phím); chiếm 95% số tiến trình bình thường, phản hồi ngay với tín hiệu</td></tr>\n          <tr><td><strong><code>D</code></strong></td><td><strong>Uninterruptible Sleep</strong></td><td>Đang kẹt trong syscall đọc/ghi phần cứng đĩa hoặc ổ mạng NFS bị đứt. <strong>Ngay cả <code>kill -9</code> cũng KHÔNG giết được ngay</strong> cho tới khi I/O trả về hoặc khôi phục kết nối đĩa!</td></tr>\n          <tr><td><strong><code>Z</code></strong></td><td><strong>Zombie (Defunct)</strong></td><td>Tiến trình <strong>đã chết và giải phóng sạch RAM/CPU</strong>, chỉ còn giữ 1 dòng mã thoát trong bảng tiến trình chờ tiến trình cha gọi <code>wait()</code> thu dọn. Không thể kill zombie; phải sửa hoặc khởi động lại tiến trình cha (<code>PPID</code>)!</td></tr>\n          <tr><td><strong><code>T</code></strong></td><td>Stopped / Traced</td><td>Đang bị tạm đóng băng bởi phím <code>Ctrl+Z</code> (<code>SIGTSTP</code>) hoặc đang bị trình gỡ lỗi <code>strace</code>/<code>gdb</code> giữ lại</td></tr>\n        </tbody>\n      </table>\n    </div>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Liệt kê Top 5 tiến trình ngốn bộ nhớ RAM thực tế (RSS) cao nhất bằng ps chuẩn định dạng",
              "code": "# Truy vấn tùy chỉnh các cột PID, PPID, STAT, %CPU, %MEM, RSS (KB) và sắp xếp giảm dần theo bộ nhớ vật lý RSS\nps -eo pid,ppid,stat,%cpu,%mem,rss,comm --sort=-rss | head -n 6",
              "output": "    PID    PPID STAT %CPU %MEM    RSS COMMAND\n   1420       1 Ssl   1.2  4.8 394216 python3\n    982       1 Ss    0.1  1.5 124800 postgres\n    612       1 Ssl   0.3  0.9  76420 containerd\n    415       1 Ss    0.0  0.4  34120 systemd-journal\n   1120       1 Ss    0.0  0.1   9240 nginx",
              "annotations": [
                {
                  "line": 2,
                  "part": "-eo ... --sort=-rss",
                  "text": "Dấu trừ trước -rss sắp xếp giảm dần theo Resident Set Size (lượng RAM vật lý thật sự đang chiếm giữ). Chữ 'l' nhỏ trong 'Ssl' báo hiệu tiến trình đa luồng (multi-threaded)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-3-signals-graceful",
          "title": "4.2 Cơ chế Tín hiệu Kernel (Signals): SIGTERM (15), SIGHUP (1), SIGINT (2) vs SIGKILL (9)",
          "content": "<p>Lệnh <code>kill</code> mang tên hơi gây hiểu lầm — thực chất chức năng của nó là <strong>gửi một thông điệp tín hiệu bất đồng bộ (Signal)</strong> tới tiến trình, không nhất thiết là để giết tiến trình! Bốn mã tín hiệu quan trọng nhất trong vận hành dịch vụ:</p>\n    <ul>\n      <li><strong><code>SIGHUP</code> (Mã <code>1</code> — Hangup):</strong> Khi phiên terminal đóng lại, các tiến trình gắn với nó sẽ nhận <code>SIGHUP</code>. Đối với các dịch vụ nền (Daemon như Nginx, Gunicorn, SSHD), lập trình viên thiết kế lại <code>SIGHUP</code> thành lệnh <strong>\"Nạp lại tệp cấu hình nóng (Graceful Reload) mà không làm rớt bất kỳ kết nối nào của khách hàng\"</strong> (<code>kill -HUP &lt;PID&gt;</code>)!</li>\n      <li><strong><code>SIGINT</code> (Mã <code>2</code> — Interrupt):</strong> Phát ra khi bạn nhấn tổ hợp phím <code>Ctrl+C</code> trên bàn phím (trong Python sinh ra ngoại lệ <code>KeyboardInterrupt</code>).</li>\n      <li><strong><code>SIGTERM</code> (Mã <code>15</code> — Terminate, <em>mặc định khi gõ <code>kill &lt;PID&gt;</code></em>):</strong> Yêu cầu dừng có trật tự (Graceful Shutdown). Ứng dụng bắt được tín hiệu này để ngừng nhận request mới, hoàn tất nốt giao dịch SQL đang dở, flush bộ đệm ghi đĩa rồi mới tự thoát sạch sẽ.</li>\n      <li><strong><code>SIGKILL</code> (Mã <code>9</code> — Force Kill):</strong> Tiến trình hoàn toàn <em>không được phép bắt hay từ chối</em>; Kernel rút phích cắm thu hồi vùng nhớ ngay lập tức. Dùng <code>kill -9</code> bừa bãi lên Database (PostgreSQL, MySQL) đang ghi dở sẽ gây hỏng trang dữ liệu buộc phải chạy Crash Recovery rất lâu khi bật lại!</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm chứng tiến trình bắt tín hiệu SIGTERM (15) để dọn dẹp an toàn trước khi dừng",
              "code": "# Khởi chạy tiến trình nền có cài bẫy tín hiệu SIGTERM để lưu trạng thái trước khi thoát\nbash -c 'trap \"echo [Graceful] Dang dong ket noi DB an toan...; exit 0\" TERM; while true; do sleep 1; done' &\nWORKER_PID=$!\nsleep 0.3\n\n# Gửi tín hiệu chuẩn SIGTERM (15) và chờ tiến trình dọn dẹp hoàn tất\nkill -15 \"$WORKER_PID\"\nwait \"$WORKER_PID\" 2>/dev/null || true",
              "output": "[Graceful] Dang dong ket noi DB an toan...",
              "annotations": [
                {
                  "line": 3,
                  "part": "WORKER_PID=$!",
                  "text": "Biến đặc biệt $! lưu giữ ngay số PID của tiến trình nền vừa được phóng ra gần nhất."
                },
                {
                  "line": 7,
                  "part": "kill -15 \"$WORKER_PID\"",
                  "text": "Cho phép hàm trap bên trong worker thực thi trọn vẹn bước đóng kết nối an toàn (nếu dùng kill -9 dòng chữ dọn dẹp này sẽ không bao giờ chạy được!)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-3-job-control-tmux",
          "title": "4.3 Điều khiển Tác vụ Phiên làm việc (jobs, bg, fg, nohup, disown) & Giới hạn trước systemd",
          "content": "<p>Giả sử bạn lỡ gõ chạy một lệnh nén hoặc di chuyển dữ liệu mất 40 phút ngay trên cửa sổ SSH hiện tại mà quên thêm dấu <code>&amp;</code> ở cuối — làm sao giải phóng con trỏ để làm việc khác và về nhà tắt laptop mà tiến trình trên server không bị chết theo?</p>\n    <ol>\n      <li>Nhấn <strong><code>Ctrl+Z</code></strong>: Gửi <code>SIGTSTP</code> tạm dừng tiến trình và trả lại dấu nhắc Shell (trạng thái <code>Stopped</code> trong <code>jobs -l</code>).</li>\n      <li>Gõ <strong><code>bg %1</code></strong>: Đánh thức công việc số 1 tiếp tục chạy ngầm dưới nền (tương đương như đã gõ <code>&amp;</code> từ đầu).</li>\n      <li>Gõ <strong><code>disown -h %1</code></strong>: Gỡ bỏ tác vụ khỏi bảng quản lý của Shell hiện tại để khi bạn thoát SSH, Shell không bắn tín hiệu <code>SIGHUP</code> làm chết tiến trình!</li>\n    </ol>\n    <p><strong>Phân định đúng công cụ theo bối cảnh:</strong> Nếu biết trước tác vụ chạy lâu một lần, dùng <code>nohup cmd &gt; run.log 2&gt;&amp;1 &amp;</code> hoặc tốt hơn nữa là mở phiên <strong><code>tmux</code></strong> (giữ nguyên toàn bộ màn hình tương tác kể cả khi đứt mạng Wi-Fi). Tuy nhiên với các <em>dịch vụ chạy thường trực 24/7</em> (Web API, Celery Worker), tuyệt đối không dùng <code>nohup</code> mà phải đóng gói thành <strong><code>systemd</code> service</strong> (sẽ học ngay tại Bài 2.6) để tự khởi động lại khi crash hoặc reboot máy chủ.</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Khởi chạy tác vụ nền chống đứt kết nối SSH bằng nohup và kiểm tra danh sách jobs",
              "code": "# Phóng tác vụ chạy ngầm miễn nhiễm với tín hiệu SIGHUP, gom cả stdout và stderr vào tệp log\nnohup sleep 2 > /tmp/job_out.log 2>&1 &\nBG_PID=$!\n\n# Kiểm tra trạng thái tiến trình qua ps trước khi kết thúc\nps -p \"$BG_PID\" -o pid,stat,comm\nwait \"$BG_PID\"\nrm -f /tmp/job_out.log",
              "output": "    PID STAT COMMAND\n  18492 S    sleep",
              "annotations": [
                {
                  "line": 2,
                  "part": "nohup ... > /tmp/job_out.log 2>&1 &",
                  "text": "Nếu không chuyển hướng tường minh '>', nohup sẽ tự tạo file nohup.out ngay tại thư mục đang đứng."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Khởi chạy script Python chạy nền sống sót qua phiên SSH và dọn dẹp an toàn.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Chạy script nền: <code>nohup python3 -m http.server 8080 > server.log 2>&1 &</code>.</li>\n        <li><strong>Bước 2:</strong> Xem PID đang chạy nền: <code>echo $!</code> hoặc dùng <code>jobs -l</code>.</li>\n        <li><strong>Bước 3:</strong> Thử đóng terminal và mở cửa sổ mới: Dịch vụ web vẫn đang phản hồi bình thường!</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lạm Dụng Nguy Hiểm: kill -9</div>\n          <p>Mỗi khi ứng dụng chậm hoặc đơ, lập tức gõ <code>kill -9 &lt;PID&gt;</code> hoặc <code>killall -9 python</code>.</p>\n          <p><strong>Hậu quả:</strong> Database connection pool không được đóng, tệp cache/session ghi dở bị corrupt, file khóa lockfile không được giải phóng khiến ứng dụng không thể khởi động lại!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Quy Trình Chuẩn Mực: Graceful Shutdown</div>\n          <p>Luôn ưu tiên gửi tín hiệu SIGTERM (15) trước:</p>\n          <p><code>kill -15 &lt;PID&gt; && sleep 3 && kill -0 &lt;PID&gt; 2>/dev/null || kill -9 &lt;PID&gt;</code></p>\n          <p><strong>Ưu điểm:</strong> Cho ứng dụng cơ hội dọn dẹp sạch sẽ, bảo vệ toàn vẹn dữ liệu.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Quản lý Vòng đời Tiến trình & Giải cứu Server Bị Chiếm Dụng CPU",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.3</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thành thạo điều tra tiến trình ăn CPU bằng top/ps, đưa tác vụ vào nền và xử lý tiến trình bằng tín hiệu phù hợp.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Máy ảo Linux.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Giả lập một tiến trình tính toán ngốn CPU chạy ngầm: <code>nohup python3 -c \"while True: pass\" > /dev/null 2>&1 &</code>.</li>\n        <li><strong>Bước 2:</strong> Tìm PID của tiến trình vừa tạo bằng <code>ps aux | grep \"while True\"</code>.</li>\n        <li><strong>Bước 3:</strong> Mở <code>top</code> hoặc <code>htop</code> để quan sát tiến trình chiếm ~100% của 1 core CPU.</li>\n        <li><strong>Bước 4:</strong> Gửi tín hiệu dừng an toàn SIGTERM (15): <code>kill -15 &lt;PID&gt;</code>.</li>\n        <li><strong>Bước 5:</strong> Kiểm tra lại bằng <code>ps -p &lt;PID&gt;</code> để đảm bảo tiến trình đã được giải phóng hoàn toàn.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">ps -p <PID>\n-> Báo không tìm thấy tiến trình (tiến trình đã dừng sạch sẽ và giải phóng CPU về 0%).</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Tìm hiểu cách dùng lệnh <code>nice</code> và <code>renice</code> để hạ mức độ ưu tiên CPU của một tiến trình nặng.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không dùng <code>kill -9 1</code> hoặc cố gắng tiêu diệt các tiến trình hạt nhân (kernel threads hiển thị trong ngoặc vuông <code>[kthreadd]</code>); điều này có thể dẫn tới Kernel Panic lập tức.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo / Triệu chứng</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td>Đóng cửa sổ SSH là ứng dụng web bị tắt theo</td><td>Tiến trình nhận tín hiệu <code>SIGHUP (1)</code> khi phiên đăng nhập PTS kết thúc.</td><td>Chạy ứng dụng qua <code>nohup &lt;cmd&gt; &</code> hoặc chuyển sang quản lý qua <code>systemd service</code> hoặc <code>tmux</code>.</td></tr>\n          <tr><td>Xuất hiện tiến trình có trạng thái <code>&lt;defunct&gt;</code> (Zombie)</td><td>Tiến trình con đã chết nhưng tiến trình cha không gọi hàm <code>wait()</code> để thu nhận exit code.</td><td>Không thể kill Zombie trực tiếp bằng kill -9! Hãy gửi tín hiệu <code>kill -15 &lt;PID_cha&gt;</code> để tiến trình cha giải phóng slot.</td></tr>\n          <tr><td><code>kill: (PID) - Operation not permitted</code></td><td>Cố gắng kill một tiến trình thuộc quyền sở hữu của user khác hoặc của root.</td><td>Thêm tiền tố <code>sudo</code> nếu bạn có quyền quản trị: <code>sudo kill -15 &lt;PID&gt;</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Luôn kiểm tra dòng lệnh đầy đủ trước khi dùng pkill:</strong> Chạy <code>pgrep -a &lt;tên&gt;</code> để xem danh sách tiến trình sẽ bị ảnh hưởng trước khi gõ <code>pkill</code> để tránh kill nhầm các tiến trình hệ thống quan trọng.</li>\n        <li><strong>Giới hạn tài nguyên tiến trình bằng cgroups hoặc limits.conf:</strong> Cấu hình <code>/etc/security/limits.conf</code> giới hạn số lượng tiến trình tối đa (<code>nproc</code>) cho từng user để phòng ngừa mã độc Fork Bomb.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Linux Signal Standards:</strong> <code>man 7 signal</code> — Bảng danh mục 32 tín hiệu POSIX chuẩn của nhân Linux.</li>\n      <li><strong>HTOP Official:</strong> <a href=\"https://htop.dev/\" target=\"_blank\" rel=\"noopener\">htop - an interactive process viewer</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Mã Tín hiệu (Signals) Thường Dùng",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Số hiệu</th><th>Tên Tín hiệu</th><th>Hành vi mặc định</th><th>Có thể chặn (Catch) được không?</th></tr></thead>\n        <tbody>\n          <tr><td><code>1</code></td><td>SIGHUP</td><td>Dừng tiến trình khi mất kết nối / Nạp lại cấu hình</td><td>Có</td></tr>\n          <tr><td><code>2</code></td><td>SIGINT</td><td>Ngắt từ bàn phím (Ctrl + C)</td><td>Có</td></tr>\n          <tr><td><code>9</code></td><td>SIGKILL</td><td>Kernel lập tức tiêu diệt cưỡng chế</td><td><strong>KHÔNG (Bất khả kháng)</strong></td></tr>\n          <tr><td><code>15</code></td><td>SIGTERM</td><td>Yêu cầu kết thúc lịch sự (Graceful stop)</td><td>Có (Khuyên dùng mặc định)</td></tr>\n          <tr><td><code>19</code></td><td>SIGSTOP</td><td>Kernel tạm dừng tiến trình (Ctrl + Z gửi SIGTSTP)</td><td><strong>KHÔNG (Bất khả kháng)</strong></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Khống chế tiến trình Celery Worker bị Memory Leak ăn sạch 16GB RAM",
        "content": "\n              <p>Một Celery worker xử lý tác vụ convert video bằng Python bị rò rỉ bộ nhớ (Memory Leak). Chỉ sau 4 tiếng, lượng RAM thực tế (RES) của tiến trình tăng từ 200MB lên 14GB, bắt đầu đẩy hệ thống vào tình trạng tráo đổi bộ nhớ đĩa (Swap Thrashing) khiến toàn bộ website bị treo cứng.</p>\n              <p><strong>Bước 1:</strong> Bạn mở terminal và xác định chính xác PID của tiến trình tội đồ:</p>\n              <pre><code>ps aux --sort=-%mem | head -n 3</code></pre>\n              <p>Phát hiện tiến trình có PID <code>8412</code> đang chiếm tới 89.4% RAM hệ thống.</p>\n              <p><strong>Bước 2:</strong> Không hấp tấp gõ <code>kill -9</code> vì worker đang xử lý dở dữ liệu của khách hàng. Bạn gửi tín hiệu <code>SIGTERM (15)</code> để ứng dụng hoàn tất tác vụ hiện tại rồi tự hủy:</p>\n              <pre><code>kill -15 8412</code></pre>\n              <p><strong>Bước 3:</strong> Tiến trình thoát êm đẹp sau 8 giây, giải phóng ngay 14GB RAM mà không làm mất mát bất kỳ bản ghi nào trong database!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Thói quen lười biếng: Gõ ngay kill -9 thay vì thử SIGTERM trước",
            "content": "Tín hiệu <code>SIGKILL (9)</code> không thể bị tiến trình chặn hoặc bắt (cannot be caught or ignored). Nhân Linux sẽ bắn hạ tiến trình ngay lập tức mà không cho nó cơ hội đóng kết nối database, giải phóng file lock hoặc hoàn tất ghi bộ đệm đĩa. Hậu quả là database bị hỏng tệp dữ liệu (Data Corruption) hoặc file tạm bị kẹt. Luôn luôn gửi <code>kill -15 (SIGTERM)</code> trước, đợi 5-10 giây, chỉ khi tiến trình bị treo cứng không phản hồi mới dùng <code>kill -9</code>."
          },
          {
            "title": "Quên cờ python -u khi chạy script nền khiến file log không hiện dữ liệu",
            "content": "Mặc định khi Python xuất dữ liệu ra một file trên đĩa (thay vì terminal), nó sẽ tự động bật chế độ đệm khối (Block Buffering - tích đủ 4KB hoặc 8KB mới ghi đĩa 1 lần). Nếu bạn chạy <code>nohup python3 app.py &gt; app.log &amp;</code>, bạn sẽ thấy file <code>app.log</code> trống rỗng trong nhiều phút! Luôn thêm cờ <code>-u</code> (Unbuffered): <code>nohup python3 -u app.py &gt; app.log 2&gt;&amp;1 &amp;</code>."
          }
        ],
        "tips": [
          {
            "title": "Nạp lại cấu hình dịch vụ không gián đoạn bằng tín hiệu SIGHUP (1)",
            "content": "Nhiều dịch vụ sản xuất như Nginx, Gunicorn hay PostgreSQL hỗ trợ nạp lại cấu hình mới mà không làm rớt kết nối của khách hàng khi nhận tín hiệu SIGHUP: <code>sudo kill -HUP $(cat /var/run/nginx.pid)</code> hoặc <code>sudo systemctl reload nginx</code>."
          },
          {
            "title": "Tra cứu nhanh tiến trình bằng pgrep thay vì grep qua ps aux",
            "content": "Thay vì gõ đường ống dài dòng <code>ps aux | grep python | grep -v grep</code>, hãy dùng lệnh chuyên dụng: <code>pgrep -fl python</code>. Lệnh sẽ in trực tiếp PID và dòng lệnh khởi động mà không bị lẫn chính tiến trình grep."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Tra cứu PID và tham số khởi chạy của tiến trình Python",
          "problem": "Viết câu lệnh tra cứu tất cả các tiến trình đang chạy thuộc về ứng dụng Python, hiển thị cả PID và tham số dòng lệnh khởi chạy.",
          "hint": "Sử dụng lệnh pgrep -a -l python để liệt kê danh sách tiến trình kèm thông số.",
          "solutionCode": "pgrep -a -l python",
          "solutionOutput": "1245 python3 /opt/api/server.py --port 8000\n1890 celery worker -A tasks --loglevel=info",
          "explanation": "pgrep -a hiển thị đầy đủ dòng lệnh thực thi, còn -l in tên tiến trình. Nhanh và chính xác hơn nhiều so với việc gõ ps aux | grep python rồi phải lọc bỏ tiến trình grep phụ.",
          "annotations": [
            {
              "part": "pgrep -a -l",
              "text": "Hiển thị danh sách tiến trình sạch sẽ, không bị lẫn chính tiến trình grep."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp pgrep",
              "pass": "Dùng đúng pgrep python",
              "excellent": "Thêm cờ -a hiển thị trọn vẹn tham số dòng lệnh",
              "weight": "50%"
            },
            {
              "criterion": "Hiệu quả",
              "pass": "Tìm được PID",
              "excellent": "Không dùng đường ống ps | grep thừa thãi",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Quy trình kết thúc tiến trình an toàn: SIGTERM trước, SIGKILL sau",
          "problem": "Một tiến trình có PID 4567 bị treo. Viết kịch bản lệnh để yêu cầu tiến trình tự dọn dẹp và kết thúc an toàn bằng SIGTERM, chờ 5 giây, nếu vẫn không tắt thì mới cưỡng chế bằng SIGKILL.",
          "hint": "Gửi kill -15 trước, sleep 5 giây, dùng kill -0 kiểm tra xem tiến trình còn sống không, nếu còn thì mới gửi kill -9.",
          "solutionCode": "kill -15 4567\nsleep 5\nkill -0 4567 2>/dev/null && kill -9 4567",
          "solutionOutput": "# Tiến trình 4567 đã kết thúc an toàn qua SIGTERM",
          "explanation": "SIGTERM (15) cho phép tiến trình đóng file, hoàn tất transaction database và giải phóng socket. SIGKILL (9) là biện pháp cưỡng chế cuối cùng khi tiến trình không còn phản hồi.",
          "annotations": [
            {
              "part": "kill -15",
              "text": "Gửi tín hiệu SIGTERM lịch sự, cho phép tiến trình tự dọn dẹp bộ nhớ."
            },
            {
              "part": "kill -0",
              "text": "Thăm dò sự tồn tại của tiến trình mà không làm gián đoạn nó."
            }
          ],
          "rubric": [
            {
              "criterion": "Nguyên lý tín hiệu",
              "pass": "Gửi tín hiệu 15 trước khi dùng 9",
              "excellent": "Có bước kiểm tra kill -0 trước khi dùng SIGKILL",
              "weight": "50%"
            },
            {
              "criterion": "An toàn dữ liệu",
              "pass": "Bảo vệ tính toàn vẹn của ứng dụng",
              "excellent": "Ngăn chặn mất mát dữ liệu do lạm dụng SIGKILL bừa bãi",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Khởi chạy tác vụ Python nền độc lập với nohup",
          "problem": "Khởi chạy một script Python nền độc lập không bị tắt khi đăng xuất khỏi phiên SSH, ghi toàn bộ log đầu ra chuẩn và lỗi vào file /var/log/my-app/worker.log.",
          "hint": "Sử dụng nohup kèm cờ python3 -u (unbuffered output) và chuyển hướng > /path/worker.log 2>&1 &.",
          "solutionCode": "nohup python3 -u /opt/my-app/worker.py > /var/log/my-app/worker.log 2>&1 &",
          "solutionOutput": "[1] 19872\n# Script đang chạy ngầm độc lập với phiên SSH",
          "explanation": "nohup phớt lờ tín hiệu SIGHUP khi đóng terminal. Cờ -u của Python vô hiệu hóa bộ đệm I/O giúp log được ghi tức thì vào file thay vì bị trễ.",
          "annotations": [
            {
              "part": "python3 -u",
              "text": "Vô hiệu hóa buffer stdout, giúp log xuất hiện ngay lập tức trong file."
            },
            {
              "part": "> log 2>&1 &",
              "text": "Chuyển hướng cả stdout và stderr vào file log, đưa tiến trình vào chạy nền."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp nohup",
              "pass": "Chạy nền với & và nohup",
              "excellent": "Thêm cờ -u của Python và gom 2>&1 chính xác",
              "weight": "50%"
            },
            {
              "criterion": "Quản trị log",
              "pass": "Ghi log ra file",
              "excellent": "Đảm bảo tiến trình sống độc lập khi đóng kết nối SSH",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Mọi chương trình đang chạy trên Linux đều được định danh bằng số PID duy nhất và phân cấp từ tiến trình gốc systemd (PID 1).",
        "Luôn tuân thủ quy tắc ứng xử văn minh: Gửi SIGTERM (15) để ứng dụng có thời gian đóng kết nối an toàn; chỉ dùng SIGKILL (9) khi tiến trình đã treo cứng.",
        "Để ứng dụng chạy bền bỉ không bị tắt khi ngắt phiên SSH, sử dụng lệnh `nohup ... &` hoặc chuyển sang quản lý qua systemd.",
        "Tiến trình Zombie (<defunct>) không ngốn RAM nhưng tốn slot trong Process Table; muốn dọn Zombie phải kill tiến trình cha của nó.",
        "Dùng `ps aux --sort=-%cpu` hoặc `htop` để nhanh chóng khoanh vùng tiến trình ngốn tài nguyên hệ thống."
      ],
      "generalInfo": {
        "duration": "50 phút",
        "targetAudience": "Lập trình viên Backend, DevOps, Kỹ sư Vận hành SRE",
        "prerequisites": "Đã hoàn thành Bài 2.2, hiểu cơ chế I/O và dòng lệnh Linux",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2)",
        "materials": "Terminal, các tiện ích `ps`, `top`, `htop`, `kill`, `killall`"
      },
      "nextLessonPreview": "Trong bài tiếp theo (2.4), chúng ta sẽ tiến sâu vào Bảo mật Đặc quyền: Phân quyền Nâng cao, umask, SUID/SGID/Sticky Bit & Danh sách Kiểm soát Truy cập ACL (`getfacl`/`setfacl`).",
      "quiz": [
        {
          "question": "Tín hiệu (Signal) nào sau đây là lựa chọn CHUẨN MỰC số 1 được khuyến nghị khi bạn muốn tắt một tiến trình dịch vụ đang chạy bình thường?",
          "options": [
            "SIGKILL (Signal 9)",
            "SIGTERM (Signal 15)",
            "SIGSTOP (Signal 19)",
            "SIGHUP (Signal 1)"
          ],
          "correctIndex": 1,
          "explanation": "SIGTERM (15) gửi yêu cầu đóng lịch sự, cho phép tiến trình dọn dẹp bộ nhớ và đóng kết nối cơ sở dữ liệu trước khi thoát."
        },
        {
          "question": "Một tiến trình có trạng thái là `Z` (Zombie hoặc <defunct>). Bạn chạy lệnh `sudo kill -9 <PID_Zombie>` nhưng tiến trình đó vẫn không biến mất. Tại sao?",
          "options": [
            "Vì Zombie process thực chất ĐÃ CHẾT RỒI và không còn mã code nào trong RAM để nhận tín hiệu kill. Nó chỉ còn một dòng ghi chú trong Process Table chờ tiến trình cha đọc exit code.",
            "Vì bạn chưa đăng nhập tài khoản root thật.",
            "Vì tiến trình Zombie có quyền cao hơn cả nhân Kernel.",
            "Vì máy tính bị nhiễm virus."
          ],
          "correctIndex": 0,
          "explanation": "Zombie là tiến trình đã kết thúc nhưng cha của nó chưa gọi wait(). Muốn dọn Zombie, bạn phải kích hoạt tiến trình cha hoặc kill tiến trình cha để init (PID 1) nhận nuôi và dọn dẹp."
        },
        {
          "question": "Để chạy một script Python nền mà khi bạn đăng xuất khỏi phiên SSH, script đó VẪN TIẾP TỤC CHẠY không bị tắt, bạn dùng cú pháp nào?",
          "options": [
            "python3 script.py",
            "nohup python3 script.py > out.log 2>&1 &",
            "exit && python3 script.py",
            "kill -15 script.py"
          ],
          "correctIndex": 1,
          "explanation": "nohup bỏ qua tín hiệu SIGHUP gửi tới khi phiên terminal bị đóng, và dấu & ở cuối đưa tiến trình chạy ngầm vào background."
        }
      ],
      "reflectionQuestion": "Một lập trình viên triển khai ứng dụng web Node.js/Python bằng lệnh `nohup python3 app.py &`. Sau 3 ngày, ứng dụng đột ngột biến mất không để lại dấu vết. Khi kiểm tra nhật ký hệ thống `journalctl -xe` hoặc `dmesg`, quản trị viên thấy dòng chữ: `Out of memory: Kill process (python3) score...`. Hãy giải thích cơ chế Kernel OOM Killer và tại sao nohup không bảo vệ được ứng dụng trong tình huống này.",
      "reflectionHint": "Gợi ý: `nohup` chỉ bảo vệ tiến trình khỏi tín hiệu ngắt kết nối `SIGHUP` từ terminal. Khi máy chủ cạn kiệt bộ nhớ RAM và Swap, cơ chế Out-Of-Memory (OOM) Killer của nhân Linux Kernel sẽ tự động chấm điểm (oom_score) và gửi trực tiếp tín hiệu `SIGKILL (9)` để hạ sát tiến trình ngốn nhiều RAM nhất nhằm cứu vãn hệ điều hành."
    },
    {
      "id": "lx-2-04",
      "number": "2.4",
      "title": "Phân quyền nâng cao, umask, Đặc quyền & ACL (umask, SUID/SGID/sticky bit, getfacl/setfacl)",
      "subtitle": "Kiểm soát truy cập đa tầng vượt ra khỏi giới hạn rwx truyền thống của owner/group/other",
      "level": "Trung cấp",
      "duration": "50 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ ý nghĩa và vị trí bit của 3 quyền đặc biệt (Special Permissions): SUID (4xxx), SGID (2xxx), Sticky Bit (1xxx) và cú pháp lệnh ACL (`getfacl`, `setfacl`).",
        "2. [Hiểu - Understand] Giải thích cơ chế leo thang quyền hạn tạm thời của SUID (ví dụ lệnh `/usr/bin/passwd`), cơ chế kế thừa nhóm sở hữu của SGID trên thư mục dự án dùng chung.",
        "3. [Vận dụng - Apply] Cấu hình thư mục chia sẻ nhóm dùng chung (Group Collaboration Directory) sử dụng SGID kết hợp Default ACL để mọi file tạo mới tự động thuộc về nhóm chung.",
        "4. [Phân tích - Analyze] Đánh giá mối nguy hiểm bảo mật khi tệp script hoặc binary tùy biến bị gán nhầm SUID của root, rà soát hệ thống bằng `find -perm -4000`."
      ],
      "intuition": {
        "title": "Hòm thư Góp ý Khóa Mã (Sticky), Chiếc Áo Blouse Bác sĩ (SUID) và Tủ Hồ sơ Phòng ban (SGID)",
        "metaphor": "Trong mô hình bảo mật nâng cao của Linux: (1) `Sticky Bit` (1xxx / chữ `t`) giống như chiếc hòm thư góp ý ở sảnh cơ quan: ai cũng có thể nhét thư vào hòm, nhưng chỉ có người viết lá thư đó (hoặc ban giám đốc) mới có chìa khóa lấy ra hoặc xé đi, người khác không thể xé trộm thư của bạn. (2) `SUID (Set User ID)` (4xxx / chữ `s`) giống như chiếc áo blouse của bác sĩ trưởng khoa: khi bạn mặc chiếc áo này vào (chạy lệnh `passwd`), bạn tạm thời mang quyền hạn của bác sĩ trưởng khoa (root) để ghi thông tin vào hồ sơ mật (`/etc/shadow`), và ngay khi cởi áo ra, bạn quay trở lại thành người thường. (3) `SGID (Set Group ID)` (2xxx) trên thư mục giống như một chiếc Tủ Hồ sơ của Phòng Kế toán: bất kỳ nhân viên nào tạo tài liệu mới nhét vào tủ này, tài liệu đó sẽ tự động được dán nhãn 'Thuộc quyền sở hữu của Phòng Kế toán' thay vì cá nhân nhân viên đó.",
        "boundary": "Nhân Linux Kernel hiện đại vì lý do an toàn tuyệt đối sẽ BỎ QUA cờ SUID trên các file kịch bản Shell Script (như file `.sh`); SUID chỉ có hiệu lực trên các tệp nhị phân đã biên dịch (compiled binaries như mã nguồn C/Go).",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⭐</span><span>3 QUYỀN ĐẶC BIỆT (SPECIAL BITS)</span><span class=\"lx-vs-tag\">4-2-1 Octal</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>SUID (4xxx / <code>rwsr-xr-x</code>):</strong> Chạy với quyền hạn của Chủ sở hữu tệp (thường là root).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>SGID (2xxx / <code>rwxrwsr-x</code>):</strong> Trên thư mục: Mọi file mới sinh ra tự động thừa kế nhóm của thư mục cha.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Sticky Bit (1xxx / <code>rwxrwxrwt</code>):</strong> Trên thư mục: Ngăn người dùng xóa/đổi tên file của nhau.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>📜</span><span>ACCESS CONTROL LISTS (ACL)</span><span class=\"lx-vs-tag\">Granular Permissions</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Vượt qua giới hạn 1 User - 1 Group của POSIX truyền thống.</li><li><span class=\"lx-vs-bullet\">•</span> Cấp quyền đọc/ghi riêng cho một người dùng cụ thể: <code>setfacl -m u:alice:rw file</code>.</li><li><span class=\"lx-vs-bullet\">•</span> Đặt quyền mặc định cho thư mục: <code>setfacl -d -m g:devs:rwx dir</code>.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: SUID, SGID, Sticky Bit & Mở rộng ACL",
          "content": "<p>Trong môi trường doanh nghiệp có hàng chục kỹ sư và nhiều nhóm nghiệp vụ cùng làm việc, mô hình phân quyền cổ điển <code>User - Group - Others</code> không đáp ứng được các yêu cầu phân quyền phức tạp. Đó là lúc chúng ta cần đến Special Permissions và ACL.</p>\n    <p><strong>Cơ chế thừa kế nhóm của SGID (Set Group ID):</strong> Khi bạn bật cờ SGID trên một thư mục bằng <code>chmod g+s /data/collab</code>, bất kỳ tệp nào được tạo ra bên trong thư mục này bởi bất kỳ ai (dù là user alice hay bob) đều sẽ tự động mang <strong>Group ID của thư mục cha</strong>, giúp các thành viên trong nhóm luôn có thể đọc và sửa đổi tài liệu của nhau mà không cần chạy lệnh <code>chown</code> thủ công.</p>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Quyền / Lệnh</th><th>Ý nghĩa</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Rủi ro bảo mật</th></tr></thead>\n    <tbody>\n      <tr><td><code>chmod 4755</code> (SUID)</td><td>Chạy binary dưới quyền của Chủ sở hữu</td><td><code>chmod u+s &lt;binary&gt;</code></td><td><code>chmod 4755 /usr/bin/custom_tool</code></td><td><strong>Rủi ro tối cao:</strong> Lỗ hổng trong binary SUID root sẽ dẫn đến chiếm quyền server.</td></tr>\n      <tr><td><code>chmod 2775</code> (SGID)</td><td>Thừa kế nhóm sở hữu trên thư mục</td><td><code>chmod g+s &lt;thư_mục&gt;</code></td><td><code>chmod 2775 /var/www/shared</code></td><td>Cực kỳ hữu ích cho thư mục làm việc chung của nhóm developers.</td></tr>\n      <tr><td><code>chmod 1777</code> (Sticky)</td><td>Ngăn xóa trộm file trong thư mục chung</td><td><code>chmod +t &lt;thư_mục&gt;</code></td><td><code>chmod 1777 /tmp</code></td><td>Ký tự <code>t</code> chữ thường nếu có quyền x, <code>T</code> chữ hoa nếu thiếu quyền x.</td></tr>\n      <tr><td><code>setfacl</code></td><td>Thiết lập danh sách kiểm soát quyền chi tiết</td><td><code>setfacl -m &lt;quy tắc&gt; &lt;tệp&gt;</code></td><td><code>setfacl -m u:intern:r-- database.sql</code></td><td>Cấp quyền cho user intern mà không cần thêm vào group của file.</td></tr>\n      <tr><td><code>getfacl</code></td><td>Xem chi tiết bảng phân quyền ACL của tệp</td><td><code>getfacl &lt;tệp&gt;</code></td><td><code>getfacl /var/www/shared</code></td><td>Dấu <code>+</code> ở cuối quyền hạn trong lệnh <code>ls -l</code> báo hiệu tệp có cấu hình ACL.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Thiết lập thư mục cộng tác nhóm SGID và phân quyền ACL chi tiết",
              "lang": "Bash",
              "code": "# 1. Tạo thư mục nhóm và bật cờ SGID (2775)\nsudo mkdir -p /var/shared_projects\nsudo chown root:developers /var/shared_projects\nsudo chmod 2775 /var/shared_projects\n\n# 2. Cấp quyền đọc riêng cho kiểm toán viên (auditor) bằng ACL\nsudo setfacl -m u:auditor:rx /var/shared_projects\n\n# 3. Xem danh sách quyền hạn chi tiết mở rộng\ngetfacl /var/shared_projects",
              "output": "# file: var/shared_projects\n# owner: root\n# group: developers\n# flags: -s-\nuser::rwx\nuser:auditor:r-x\ngroup::rwx\nmask::rwx\nother::r-x",
              "annotations": [
                {
                  "line": 4,
                  "text": "chmod 2775: Số 2 ở đầu kích hoạt SGID; thư mục hiển thị drwxrwsr-x."
                },
                {
                  "line": 7,
                  "text": "setfacl -m u:auditor:rx: Cấp quyền riêng cho user auditor mà không chạm vào cấu hình group."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-4-suid-sgid-sticky",
          "title": "4.1 Giải phẫu 3 Bit Đặc quyền (4000 SUID, 2000 SGID, 1000 Sticky Bit) & Kiểm toán An ninh",
          "content": "<p>Bên cạnh 9 bit quyền cơ bản <code>rwxrwxrwx</code> (3 chữ số bát phân cuối), Inode của Linux còn có <strong>chữ số bát phân đầu tiên ở hàng nghìn</strong> đại diện cho 3 cơ chế đặc quyền mức nhân:</p>\n    <ul>\n      <li><strong><code>SUID</code> (Giá trị <code>4</code> — ví dụ <code>4755</code>, hiện chữ <code>s</code> ở ô thực thi của User: <code>-rwsr-xr-x</code>):</strong> Khi người dùng thường chạy tệp nhị phân có SUID (tiêu biểu là <code>/usr/bin/passwd</code>), tiến trình được cấp tạm thời quyền <strong>Effective UID của chủ sở hữu tệp (thường là <code>root</code>)</strong> để sửa mật khẩu của chính họ trong <code>/etc/shadow</code>. <em>Lưu ý Linux:</em> Kernel bỏ qua hoàn toàn cờ SUID trên các tệp Shell/Python script để ngăn chặn lỗ hổng leo thang đặc quyền!</li>\n      <li><strong><code>SGID</code> (Giá trị <code>2</code> — ví dụ <code>2775</code>, hiện chữ <code>s</code> ở ô thực thi của Group: <code>drwxrwsr-x</code>):</strong> Đặt trên thư mục dùng chung của dự án giúp mọi tệp và thư mục con mới tạo bên trong <strong>tự động kế thừa Group của thư mục cha</strong> (thay vì lấy nhóm cá nhân của người tạo).</li>\n      <li><strong><code>Sticky Bit</code> (Giá trị <code>1</code> — ví dụ <code>1777</code>, hiện chữ <code>t</code> ở ô cuối cùng của Others: <code>drwxrwxrwt</code>):</strong> Áp dụng mặc định trên <code>/tmp</code> và <code>/var/tmp</code>: ai cũng được tạo tệp mới trong đó, nhưng <strong>chỉ chủ sở hữu của tệp (hoặc <code>root</code>) mới có quyền xóa hoặc đổi tên tệp của mình</strong>.</li>\n    </ul>\n    <p><em>Mẹo đọc nhanh chữ hoa vs chữ thường:</em> Nếu thấy chữ hoa <code>S</code> hoặc <code>T</code> (ví dụ <code>rwSr--r--</code>), điều đó báo hiệu bit đặc biệt đã bật nhưng <strong>thiếu bit thực thi <code>x</code> cơ sở bên dưới</strong> (thường là cấu hình nhầm!).</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm chứng thực tế SUID trên /usr/bin/passwd và Sticky Bit trên thư mục /tmp",
              "code": "# 1. Quan sát chữ 's' (SUID 4755) trên lệnh passwd và chữ 't' (Sticky 1777) trên /tmp\nstat -c '%A (%a) %U:%G %n' /usr/bin/passwd /tmp\n\n# 2. Câu lệnh rà quét kiểm toán an ninh: Tìm các binary gắn cờ SUID trong /usr/bin\nfind /usr/bin -perm -4000 -type f 2>/dev/null | head -n 5",
              "output": "-rwsr-xr-x (4755) root:root /usr/bin/passwd\ndrwxrwxrwt (1777) root:root /tmp\n/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/chsh\n/usr/bin/gpasswd\n/usr/bin/newgrp",
              "annotations": [
                {
                  "line": 2,
                  "part": "-rwsr-xr-x (4755) / drwxrwxrwt (1777)",
                  "text": "4755 = 4 (SUID) + 755; 1777 = 1 (Sticky Bit) + 777."
                },
                {
                  "line": 5,
                  "part": "find ... -perm -4000",
                  "text": "Dấu gạch ngang trước -4000 tìm mọi tệp có bật bit SUID bất kể 3 chữ số quyền phía sau là gì — bước kiểm tra bắt buộc khi rà quét backdoor."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-4-posix-acl",
          "title": "4.2 Vượt giới hạn UGO với Danh sách Kiểm soát Truy cập POSIX ACL (getfacl & setfacl)",
          "content": "<p>Mô hình <code>User - Group - Others</code> cổ điển chỉ cho phép gắn đúng <strong>1 chủ sở hữu và 1 nhóm duy nhất</strong> cho mỗi tệp. Hãy xét bài toán thực tế: Thư mục <code>/srv/finance</code> thuộc sở hữu <code>admin:accounting</code> (quyền <code>770</code>, người ngoài bị chặn hoàn toàn). Nay ban giám đốc yêu cầu: cấp thêm quyền <em>chỉ đọc</em> cho tài khoản kiểm toán <code>auditor1</code> VÀ cấp quyền <em>đọc/ghi</em> cho nhóm <code>devops</code> mà không được mở quyền cho Others hay nhét kiểm toán viên vào nhóm kế toán!</p>\n    <p><strong>POSIX ACL (Access Control Lists)</strong> giải quyết bài toán này một cách thanh lịch với 2 loại quy tắc:</p>\n    <ul>\n      <li><strong>Access ACL (<code>setfacl -m</code>):</strong> Áp dụng quyền trực tiếp ngay lập tức lên tệp hoặc thư mục hiện tại (ví dụ: <code>setfacl -m u:auditor1:r-x,g:devops:rwx /srv/finance</code>). Khi một tệp có ACL mở rộng, lệnh <code>ls -l</code> sẽ xuất hiện thêm dấu cộng <strong><code>+</code></strong> ở cuối chuỗi quyền (<code>drwxrwx---+</code>).</li>\n      <li><strong>Default ACL (<code>setfacl -d -m</code> — Chỉ đặt trên thư mục):</strong> Đóng vai trò khuôn mẫu thừa kế tự động — mọi tệp và thư mục con sinh ra bên trong về sau sẽ tự động mang sẵn danh sách quyền ACL này mà không cần chạy lại lệnh!</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Thiết lập Access ACL kết hợp Default ACL kế thừa tự động và đọc bảng quyền bằng getfacl",
              "code": "# 1. Tạo thư mục dự án đóng kín đối với Others (750)\nmkdir -p /tmp/acl_project && chmod 750 /tmp/acl_project\n\n# 2. Cấp quyền đọc + đi qua (r-x) riêng cho user 'nobody' trên cả thư mục hiện tại (-m) và các tệp tương lai (-d -m)\nsetfacl -m u:nobody:r-x /tmp/acl_project\nsetfacl -d -m u:nobody:r-x /tmp/acl_project\n\n# 3. Kiểm tra dấu '+' trong ls -ld và xem bảng phân rã chi tiết bằng getfacl\nls -ld /tmp/acl_project\ngetfacl -c /tmp/acl_project\nrm -rf /tmp/acl_project",
              "output": "drwxr-x---+ 2 devops devops 4096 Nov  4 10:40 /tmp/acl_project\nuser::rwx\nuser:nobody:r-x\ngroup::r-x\nmask::r-x\nother::---\ndefault:user::rwx\ndefault:user:nobody:r-x\ndefault:group::r-x\ndefault:mask::r-x\ndefault:other::---",
              "annotations": [
                {
                  "line": 9,
                  "part": "drwxr-x---+",
                  "text": "Dấu '+' ở vị trí thứ 11 là tín hiệu nhận biết quan trọng nhất nhắc quản trị viên phải chạy getfacl để xem toàn bộ quyền ẩn bên trong."
                },
                {
                  "line": 10,
                  "part": "default:user:nobody:r-x",
                  "text": "Đảm bảo mọi thư mục/tệp mới được tạo bên trong /tmp/acl_project đều tự động cho phép tài khoản nobody đọc mà không cần can thiệp tay."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-4-acl-mask-trap",
          "title": "4.3 Cạm bẫy Trần Quyền ACL mask khi Chạy chmod & Quy trình Thu hồi Quyền Sạch sẽ",
          "content": "<p>Một chi tiết kỹ thuật cực kỳ tinh tế khiến nhiều Sysadmin bối rối khi vận hành ACL: <strong>Mối liên hệ sống còn giữa trường <code>mask::</code> của ACL và nhóm bit Group của lệnh <code>chmod</code>!</strong></p>\n    <ul>\n      <li>Khi một tệp đã được gắn ACL mở rộng, 3 bit ở giữa của lệnh <code>ls -l</code> (vốn là quyền của Group sở hữu) <strong>không còn hiển thị quyền Group đơn thuần nữa mà hiển thị giá trị <code>ACL mask</code></strong> — tức <em>mức trần quyền tối đa</em> cho tất cả các user phụ và group phụ trong bảng ACL!</li>\n      <li><strong>Cạm bẫy thực tế:</strong> Giả sử bạn vừa cấp <code>setfacl -m u:alice:rwx report.xlsx</code>. Ngay sau đó, một đồng nghiệp quen tay chạy <code>chmod 640 report.xlsx</code> (đặt phần giữa bằng <code>4</code> tức <code>r--</code>). Lệnh <code>chmod</code> này sẽ hạ trần <code>mask::</code> xuống còn <code>r--</code>, khiến quyền thực tế của <code>alice</code> bị bóp nghẹt thành <code>#effective:r--</code> (mất quyền ghi dù dòng <code>user:alice:rwx</code> vẫn còn đó!).</li>\n      <li><strong>Thu hồi quyền chuẩn xác:</strong> Để xóa riêng quy tắc của một cá nhân dùng <code>setfacl -x u:alice &lt;file&gt;</code>; để gỡ bỏ sạch sẽ toàn bộ mọi cấu hình ACL quay về chuẩn POSIX thuần túy (mất dấu <code>+</code>), dùng <code>setfacl -b &lt;file&gt;</code>.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Quan sát hiện tượng chmod bóp nghẹt trần ACL mask (#effective) và thu hồi bằng setfacl -b",
              "code": "touch /tmp/mask_trap.txt && chmod 660 /tmp/mask_trap.txt\nsetfacl -m u:nobody:rw- /tmp/mask_trap.txt\n\n# Khi vô tình chạy chmod 640 -> mask bị hạ xuống r--, làm quyền thực tế của nobody bị bóp còn r--!\nchmod 640 /tmp/mask_trap.txt\ngetfacl -c /tmp/mask_trap.txt\n\n# Xóa sạch toàn bộ ACL mở rộng về trạng thái nguyên bản bằng cờ -b\nsetfacl -b /tmp/mask_trap.txt && ls -l /tmp/mask_trap.txt\nrm -f /tmp/mask_trap.txt",
              "output": "user::rw-\nuser:nobody:rw-\t\t\t#effective:r--\ngroup::rw-\t\t\t#effective:r--\nmask::r--\nother::---\n-rw-r----- 1 devops devops 0 Nov  4 10:45 /tmp/mask_trap.txt",
              "annotations": [
                {
                  "line": 6,
                  "part": "#effective:r--",
                  "text": "getfacl cảnh báo rất rõ: dù cấu hình ghi rw-, nhưng do trần mask::r-- bị hạ xuống bởi lệnh chmod 640 nên quyền hiệu lực thực tế chỉ còn r--!"
                },
                {
                  "line": 9,
                  "part": "setfacl -b",
                  "text": "Gỡ sạch toàn bộ ACL mở rộng, dấu '+' cuối quyền biến mất hoàn toàn."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Khảo sát cơ chế hoạt động của SUID trên tệp <code>/usr/bin/passwd</code> và kiểm tra dấu hiệu ACL.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Khảo sát lệnh đổi mật khẩu: <code>ls -l /usr/bin/passwd</code> &rarr; Thấy cờ <code>-rwsr-xr-x</code> (SUID của root).</li>\n        <li><strong>Bước 2:</strong> Giải thích tại sao người dùng thường có thể ghi mật khẩu mới vào tệp bí mật <code>/etc/shadow</code> mà không bị báo Permission denied.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lỗ Hổng Bảo Mật Chết Người: SUID Trên Shell Script</div>\n          <p>Gán quyền <code>chmod u+s backup.sh</code> và đặt owner là root để cho user thường chạy script sao lưu.</p>\n          <p><strong>Hiểm họa:</strong> Linux kernel sẽ phớt lờ SUID trên script shell; nhưng nếu dùng công cụ bọc binary lỏng lẻo, kẻ tấn công có thể chèn biến <code>$PATH</code> độc hại để chiếm quyền root toàn bộ máy chủ!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Giải Pháp Chuẩn Mực Doanh Nghiệp: sudoers</div>\n          <p>Không bao giờ lạm dụng SUID; hãy cấu hình quyền cụ thể qua <code>sudo visudo</code>:</p>\n          <p><code>username ALL=(root) NOPASSWD: /usr/local/bin/backup.sh</code></p>\n          <p><strong>Ưu điểm:</strong> Kiểm soát chặt chẽ danh tính, ghi log kiểm toán đầy đủ trong <code>/var/log/auth.log</code>.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Xây dựng Thư mục Cộng tác Nhóm Chuẩn SGID & Phân quyền ACL",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.4</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thiết lập môi trường làm việc nhóm đa người dùng: file tạo ra tự động kế thừa nhóm qua SGID và phân quyền riêng qua ACL.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Máy ảo Linux, quyền sudo, thư mục <code>/opt/team_collab</code>.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Tạo nhóm dùng chung: <code>sudo groupadd devteam || true</code>.</li>\n        <li><strong>Bước 2:</strong> Tạo thư mục và gán SGID: <code>sudo mkdir -p /opt/team_collab && sudo chown :devteam /opt/team_collab && sudo chmod 2775 /opt/team_collab</code>.</li>\n        <li><strong>Bước 3:</strong> Tạo một file bên trong thư mục và kiểm tra nhóm sở hữu: <code>touch /opt/team_collab/doc.txt && ls -l /opt/team_collab/doc.txt</code> &rarr; Xác nhận file tự động thuộc nhóm <code>devteam</code>.</li>\n        <li><strong>Bước 4:</strong> Cấu hình Default ACL để mọi file mới tự động có quyền đọc cho nhóm: <code>sudo setfacl -d -m g:devteam:rwx /opt/team_collab</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">ls -ld /opt/team_collab\n-> drwxrwsr-x+ 2 root devteam 4096 Oct 28 10:45 /opt/team_collab (Có cờ 's' SGID và dấu '+' ACL).</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Sử dụng <code>setfacl -b</code> để xóa bỏ toàn bộ cấu hình ACL mở rộng khỏi một tệp.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Định kỳ quét các tệp có SUID trên toàn hệ thống bằng <code>find / -perm -4000 -type f</code>; bất kỳ file nhị phân lạ nào có SUID trong <code>/tmp</code> hoặc <code>/home</code> đều là dấu hiệu bị cắm backdoor!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>setfacl: Operation not supported</code></td><td>Phân vùng đĩa chưa được kích hoạt tính năng hỗ trợ ACL (thường trên hệ thống file cũ hoặc mount thiếu cờ <code>acl</code>).</td><td>Thêm tùy chọn <code>acl</code> vào file <code>/etc/fstab</code> và mount lại: <code>sudo mount -o remount,acl /</code>.</td></tr>\n          <tr><td>Quyền đặc biệt hiển thị chữ <code>S</code> hoặc <code>T</code> hoa</td><td>Thiếu quyền thực thi cơ bản <code>x</code> tại vị trí đó (ví dụ: gán SUID nhưng thiếu quyền execute của user).</td><td>Thêm quyền <code>+x</code> để chữ hoa chuyển thành chữ thường: <code>chmod u+x &lt;file&gt;</code>.</td></tr>\n          <tr><td>Nhóm không tự động thừa kế trong thư mục con</td><td>Quên bật Default ACL (cờ <code>-d</code>) cho thư mục cha.</td><td>Chạy lệnh: <code>setfacl -d -m g:&lt;group&gt;:rwx &lt;thư_mục&gt;</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Nguyên tắc Tối thiểu hóa Tệp SUID (SUID Minimization):</strong> Chỉ các công cụ thật sự cần thiết của hệ điều hành (như <code>passwd</code>, <code>sudo</code>, <code>su</code>) mới được giữ SUID. Gỡ bỏ SUID khỏi các lệnh mạng nguy hiểm như <code>ping</code> trên container bằng <code>chmod u-s /bin/ping</code>.</li>\n        <li><strong>Mount phân vùng người dùng với cờ <code>nosuid</code>:</strong> Trong <code>/etc/fstab</code>, luôn thêm tùy chọn <code>nosuid,nodev</code> cho các phân vùng <code>/tmp</code> và <code>/home</code> để ngăn chặn triệt để kỹ thuật leo thang đặc quyền từ tệp SUID do người dùng tự tạo.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>POSIX Access Control Lists on Linux:</strong> <a href=\"https://www.usenix.org/legacy/publications/library/proceedings/als03/tech/full_papers/gruenbacher/gruenbacher_html/\" target=\"_blank\" rel=\"noopener\">USENIX Paper on Linux ACLs (Andreas Gruenbacher)</a>.</li>\n      <li><strong>ACL Manual:</strong> <code>man 5 acl</code> — Access Control Lists format and inheritance rules.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Đối chiếu Quyền Đặc biệt 4 Ký tự Bát phân",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Số bát phân đầu</th><th>Tên quyền</th><th>Ký hiệu chuỗi</th><th>Vị trí ảnh hưởng</th></tr></thead>\n        <tbody>\n          <tr><td><code>4xxx</code></td><td>SUID (Set User ID)</td><td><code>rwsr-xr-x</code></td><td>Vị trí <code>x</code> của User (Chạy bằng danh tính Owner).</td></tr>\n          <tr><td><code>2xxx</code></td><td>SGID (Set Group ID)</td><td><code>rwxrwsr-x</code></td><td>Vị trí <code>x</code> của Group (Thừa kế Group của thư mục).</td></tr>\n          <tr><td><code>1xxx</code></td><td>Sticky Bit</td><td><code>rwxrwxrwt</code></td><td>Vị trí <code>x</code> của Others (Chống xóa trộm file).</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Tổ chức kho mã nguồn chung giữa nhóm Dev và Tester trên máy chủ staging",
        "content": "\n              <p>Công ty có 2 nhóm cùng làm việc trên thư mục <code>/opt/staging_app</code>: Nhóm <code>devteam</code> cần quyền đọc-ghi-thực thi; Nhóm <code>qateam</code> chỉ được phép đọc và chạy thử nghiệm (không được sửa mã nguồn); User <code>github_bot</code> cần quyền deploy ghi đè khi có commit mới.</p>\n              <p><strong>Giải pháp chuẩn mực:</strong></p>\n              <p>1. Gán quyền nhóm cơ bản cho devteam và bật SGID để các file mới tạo luôn thuộc group devteam:</p>\n              <pre><code>sudo chown -R root:devteam /opt/staging_app\nsudo chmod -R 2770 /opt/staging_app</code></pre>\n              <p>2. Dùng ACL cấp quyền chỉ đọc cho qateam và quyền toàn phần cho github_bot:</p>\n              <pre><code>sudo setfacl -R -m g:qateam:rx /opt/staging_app\nsudo setfacl -R -m u:github_bot:rwx /opt/staging_app</code></pre>\n              <p>3. Thiết lập Default ACL để các file mới do lập trình viên tạo ra cũng tự động áp dụng đúng các quyền trên:</p>\n              <pre><code>sudo setfacl -R -d -m g:qateam:rx /opt/staging_app\nsudo setfacl -R -d -m u:github_bot:rwx /opt/staging_app</code></pre>\n              <p>Hệ thống vận hành trơn tru, không bao giờ bị lỗi 'Permission Denied' khi deploy hay test!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Ngộ nhận gán SUID cho Shell Script có thể cấp quyền root",
            "content": "Vì lý do an ninh, nhân Linux hiện đại tự động BỎ QUA cờ SUID trên các file kịch bản có Shebang (như Bash, Python, Perl) để phòng ngừa tấn công chiếm quyền Shell. SUID chỉ có tác dụng trên các file thực thi nhị phân ELF đã biên dịch (như <code>/usr/bin/passwd</code>)."
          },
          {
            "title": "Bối rối trước dấu cộng (+) ở cuối chuỗi quyền trong ls -l",
            "content": "Khi một tệp có cấu hình ACL mở rộng, lệnh <code>ls -l</code> sẽ hiển thị dấu cộng ở cuối chuỗi quyền: <code>-rw-r--r--+</code>. Lúc này, chuỗi quyền hiển thị ở cột Group thực chất là <strong>ACL Mask</strong> (mức quyền tối đa cho phép) chứ không còn là quyền thực tế của Group! Hãy dùng <code>getfacl file</code> để xem quyền chính xác."
          }
        ],
        "tips": [
          {
            "title": "Sao lưu và phục hồi toàn bộ bảng quyền ACL bằng getfacl",
            "content": "Khi di chuyển dữ liệu có cấu hình ACL phức tạp, hãy sao lưu bảng quyền ra file: <code>getfacl -R /data > permissions.acl</code> và khôi phục lại bất kỳ lúc nào bằng lệnh: <code>setfacl --restore=permissions.acl</code>."
          },
          {
            "title": "Rà soát định kỳ các file SUID bất thường theo chuẩn CIS Benchmark",
            "content": "Kẻ tấn công sau khi xâm nhập thường tạo một backdoor bằng cách gán SUID cho <code>/bin/bash</code>. Luôn định kỳ chạy lệnh quét kiểm tra: <code>find / -perm -4000 -type f 2>/dev/null</code> để phát hiện sớm các file lạ."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Tạo thư mục chia sẻ nhóm tự động kế thừa Group (SGID)",
          "problem": "Thiết lập thư mục chia sẻ cộng tác nhóm /opt/team_shared sao cho mọi file và thư mục con được tạo bên trong tự động kế thừa nhóm developers.",
          "hint": "Sử dụng lệnh chown đổi group và chmod g+s (hoặc 2775) để kích hoạt bit SGID.",
          "solutionCode": "sudo chown :developers /opt/team_shared\nsudo chmod 2775 /opt/team_shared\nls -ld /opt/team_shared",
          "solutionOutput": "drwxrwsr-x 2 root developers 4096 Nov 4 10:00 /opt/team_shared",
          "explanation": "Bit SGID (Set Group ID) đặt trên thư mục khiến các file con tạo ra tự động mang group ownership của thư mục cha thay vì group chính của người dùng tạo file.",
          "annotations": [
            {
              "part": "chmod 2775",
              "text": "Chữ số 2 ở đầu biểu thị kích hoạt bit SGID (g+s)."
            }
          ],
          "rubric": [
            {
              "criterion": "SGID trên thư mục",
              "pass": "Gán đúng quyền g+s hoặc 2775",
              "excellent": "Kiểm tra trạng thái hiển thị chữ s trong chuỗi quyền",
              "weight": "50%"
            },
            {
              "criterion": "Nhóm sở hữu",
              "pass": "Đổi group sang developers",
              "excellent": "Đảm bảo quyền ghi nhóm cho các thành viên",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Cấp quyền truy cập riêng lẻ bằng Access Control List (ACL)",
          "problem": "Cấp quyền Đọc và Ghi (rw) cho riêng lập trình viên developer1 trên file cấu hình /opt/app/production.env mà không cần đổi chủ sở hữu gốc của file.",
          "hint": "Sử dụng tiện ích setfacl với cú pháp -m u:username:permissions.",
          "solutionCode": "setfacl -m u:developer1:rw- /opt/app/production.env\ngetfacl /opt/app/production.env",
          "solutionOutput": "# file: /opt/app/production.env\n# owner: root\n# group: root\nuser::rw-\nuser:developer1:rw-\ngroup::r--\nmask::rw-\nother::---",
          "explanation": "POSIX ACL cho phép gán quyền hạn chi tiết cho từng người dùng hoặc nhóm ngoài phạm vi phân quyền truyền thống Owner/Group/Others.",
          "annotations": [
            {
              "part": "setfacl -m u:...:rw-",
              "text": "Cờ -m (modify) thêm hoặc cập nhật quy tắc ACL cho người dùng cụ thể."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp setfacl",
              "pass": "Dùng đúng setfacl -m",
              "excellent": "Kiểm tra lại bằng getfacl hiển thị mask và quyền",
              "weight": "50%"
            },
            {
              "criterion": "Bảo mật file",
              "pass": "Cấp đúng quyền cho developer1",
              "excellent": "Giữ nguyên chủ sở hữu gốc và quyền nhóm mặc định",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Rà soát toàn bộ file SUID có nguy cơ leo thang đặc quyền",
          "problem": "Viết câu lệnh rà soát toàn bộ các file trên hệ thống có gắn cờ SUID thuộc sở hữu của root để phục vụ đánh giá an ninh định kỳ.",
          "hint": "Dùng find / với -perm -4000 và -user root, chuyển hướng lỗi 2>/dev/null.",
          "solutionCode": "find / -perm -4000 -user root -type f 2>/dev/null",
          "solutionOutput": "/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/pkexec\n/usr/bin/chfn\n/usr/bin/newgrp",
          "explanation": "File SUID chạy với quyền hạn của chủ sở hữu (root) thay vì người gọi. Rà soát file SUID định kỳ giúp phát hiện kịp thời các backdoor hay binary lạ bị cài cắm.",
          "annotations": [
            {
              "part": "-perm -4000",
              "text": "Giá trị 4000 đại diện cho bit SUID trong hệ bát phân."
            },
            {
              "part": "2>/dev/null",
              "text": "Bỏ qua các thông báo lỗi truy cập từ chối ở các thư mục nhạy cảm."
            }
          ],
          "rubric": [
            {
              "criterion": "Tìm kiếm quyền đặc biệt",
              "pass": "Dùng find với -perm -4000",
              "excellent": "Lọc đúng chủ sở hữu root và triệt tiêu lỗi stderr",
              "weight": "50%"
            },
            {
              "criterion": "Kiến thức an ninh",
              "pass": "Hiểu được rủi ro của file SUID",
              "excellent": "Giải thích được cơ chế thực thi tiến trình với quyền hạn root",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Ba quyền đặc biệt của Linux: SUID (4xxx - chạy với quyền chủ sở hữu), SGID (2xxx - thừa kế nhóm trên thư mục), Sticky Bit (1xxx - chống xóa trộm trong thư mục chia sẻ).",
        "SUID là con dao hai lưỡi: rất hữu ích cho các tiện ích hệ điều hành (như passwd) nhưng là nguy cơ bảo mật số 1 nếu bị lạm dụng trên binary tự tạo.",
        "Để xây dựng thư mục làm việc chung cho nhóm kỹ sư, công thức chuẩn mực là: `chown :group dir && chmod 2775 dir`.",
        "Access Control Lists (ACL) cho phép phân quyền chi tiết tới từng cá nhân người dùng hoặc nhóm mà không bị trói buộc bởi giới hạn 1 User - 1 Group của POSIX.",
        "Dấu `+` ở cuối chuỗi quyền trong `ls -l` báo hiệu tệp đang được cấu hình quyền mở rộng bằng ACL."
      ],
      "generalInfo": {
        "duration": "50 phút",
        "targetAudience": "Kỹ sư Hệ thống, DevOps, Security Engineer",
        "prerequisites": "Đã hoàn thành Bài 1.6, nắm vững quyền hạn cơ bản rwx và bát phân",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo với quyền sudo)",
        "materials": "Terminal, các tiện ích `chmod`, `getfacl`, `setfacl`, tài khoản user phụ"
      },
      "nextLessonPreview": "Trong bài tiếp theo (2.5), chúng ta sẽ bước vào thế giới Tự Động Hóa: Lập trình Shell Script (Bash) Thực chiến & Phân tích Sâu chế độ sinh tồn `set -euo pipefail`.",
      "quiz": [
        {
          "question": "Tùy chọn quyền hạn nào sau đây được áp dụng lên một thư mục để MỌI TỆP TIN MỚI tạo ra bên trong nó tự động thừa kế nhóm sở hữu của thư mục cha?",
          "options": [
            "SUID (chmod u+s)",
            "SGID (chmod g+s / 2775)",
            "Sticky Bit (chmod +t)",
            "Chế độ umask 000"
          ],
          "correctIndex": 1,
          "explanation": "Cờ SGID (Set Group ID - 2xxx) khi đặt trên thư mục sẽ ép mọi file con sinh ra bên trong kế thừa GID của thư mục cha, cực kỳ hữu ích cho môi trường làm việc nhóm."
        },
        {
          "question": "Tại sao lệnh `passwd` (/usr/bin/passwd) lại cần có cờ SUID của root (`-rwsr-xr-x`)?",
          "options": [
            "Để ngăn người dùng thường chạy lệnh này.",
            "Vì khi người dùng thường đổi mật khẩu của mình, lệnh passwd cần có quyền root tạm thời để ghi dữ liệu băm mật khẩu vào tệp tuyệt mật `/etc/shadow` mà người dùng thường không có quyền ghi.",
            "Vì lệnh passwd viết bằng ngôn ngữ Java.",
            "Vì tệp này chỉ chạy được trên CPU 64-bit."
          ],
          "correctIndex": 1,
          "explanation": "SUID cho phép tiến trình mượn quyền của root user trong lúc thực thi để cập nhật tệp mật mã /etc/shadow một cách có kiểm soát."
        },
        {
          "question": "Dấu cộng `+` xuất hiện ở cuối chuỗi quyền hạn khi gõ lệnh `ls -l /data/project` (`drwxrwxr-x+`) có ý nghĩa gì?",
          "options": [
            "Thư mục đó bị nhiễm virus.",
            "Thư mục đó có cấu hình Danh sách Kiểm soát Truy cập Mở rộng (Access Control List - ACL) quản lý qua lệnh getfacl/setfacl.",
            "Thư mục đó có dung lượng lớn hơn 1GB.",
            "Thư mục đó được liên kết qua mạng Internet."
          ],
          "correctIndex": 1,
          "explanation": "Dấu '+' trong kết quả ls -l là chỉ báo tiêu chuẩn của Linux/UNIX thông báo rằng tệp tin có gắn thuộc tính quyền mở rộng ACL."
        }
      ],
      "reflectionQuestion": "Một quản trị viên phát hiện trong thư mục `/tmp` có một tệp nhị phân lạ mang tên `myshell` có quyền `-rwsr-xr-x 1 root root`. Tại sao phát hiện này là một TÌNH TRẠNG BÁO ĐỘNG ĐỎ khẩn cấp về an ninh mạng? Quản trị viên cần làm gì ngay lập tức?",
      "reflectionHint": "Gợi ý: Đây là dấu hiệu kinh điển của việc máy chủ đã bị xâm nhập và hacker để lại một backdoor SUID root (SUID Shell). Bất kỳ ai chạy `./myshell` sẽ lập tức có một root shell mà không cần mật khẩu. Hành động tức thì: (1) Hủy ngay cờ SUID: `chmod u-s /tmp/myshell`, (2) Cách ly máy chủ khỏi mạng để điều tra mã độc, (3) Kiểm tra mount options của `/tmp` và kích hoạt cờ `nosuid` trong `/etc/fstab`."
    },
    {
      "id": "lx-2-05",
      "number": "2.5",
      "title": "Lập trình Shell Script (Bash) thực chiến & Phân tích sâu set -euo pipefail",
      "subtitle": "Xây dựng kịch bản tự động hóa chuẩn phòng thủ công nghiệp, chặn đứng thảm họa rm -rf ngoài ý muốn",
      "level": "Trung cấp",
      "duration": "50 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ cú pháp shebang chuẩn mực (`#!/usr/bin/env bash`), cấu trúc hàm, câu lệnh điều kiện `if/elif/else`, vòng lặp `for/while` và các biến đặc biệt (`$0`, `$#`, `$@`, `$?`).",
        "2. [Hiểu - Understand] Giải thích chi tiết cơ chế hoạt động của 'Bộ tứ sinh tồn' `set -euo pipefail` (chế độ Strict Mode của Bash) và tại sao thiếu nó script tự động sẽ gây thảm họa xóa nhầm dữ liệu.",
        "3. [Vận dụng - Apply] Viết các script Bash tự động hóa hoàn chỉnh: kiểm tra tham số đầu vào, kiểm tra mã thoát lệnh (exit code), sử dụng cơ chế dọn dẹp bẫy tín hiệu `trap` khi script bị ngắt.",
        "4. [Phân tích - Analyze] Đánh giá các lỗi cú pháp kinh điển: quên bọc dấu ngoặc kép biến `\"$VAR\"` (Word Splitting / Globbing), lỗi dấu cách trong khối kiểm tra `[[ ... ]]`."
      ],
      "intuition": {
        "title": "Đoàn Tàu Cao Tốc Không Phanh và Hệ Thống Phanh Tự Động (set -euo pipefail)",
        "metaphor": "Mặc định, một kịch bản Bash script giống như một 'Đoàn tàu cao tốc mất phanh': khi gặp chướng ngại vật hay lệnh bị lỗi ở toa số 2, đoàn tàu KHÔNG DỪNG LẠI mà vẫn lao vút về phía trước để chạy tiếp các lệnh ở toa số 3 và số 4! Thảm họa kinh điển xảy ra khi biến thư mục `$DIR` bị rỗng: lệnh `rm -rf $DIR/` sẽ biến thành lệnh `rm -rf /` xóa sạch toàn bộ hệ điều hành! Câu lệnh `set -euo pipefail` chính là 'Hệ thống Phanh An toàn Tự động': (1) `set -e` giật phanh dừng tàu ngay khi có một lệnh bị lỗi; (2) `set -u` dừng tàu ngay nếu bạn vô tình gọi một biến chưa được định nghĩa; (3) `set -o pipefail` bắt lỗi ngay cả khi lệnh lỗi nằm khuất ở đầu đường ống Pipe.",
        "boundary": "Với `set -e`, một số lệnh vốn dĩ trả về exit code khác 0 khi không tìm thấy kết quả (như `grep \"string\" file` trả về 1 nếu không thấy) sẽ khiến script dừng đột ngột; trong trường hợp đó, bạn phải bọc lệnh bằng `grep \"string\" file || true`.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🛡️</span><span>BỘ TỨ PHANH AN TOÀN BASH</span><span class=\"lx-vs-tag\">Strict Mode</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>set -e</code>:</strong> Dừng script ngay lập tức nếu có bất kỳ lệnh nào trả về mã thoát khác 0.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>set -u</code>:</strong> Báo lỗi và dừng script nếu sử dụng biến chưa khai báo (chống rỗng biến).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>set -o pipefail</code>:</strong> Nếu lệnh trong Pipe bị lỗi, toàn bộ đường ống sẽ trả về mã lỗi đó.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>trap 'cleanup' EXIT</code>:</strong> Luôn chạy hàm dọn dẹp file tạm dù script thoát bình thường hay bị crash.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🔢</span><span>CÁC BIẾN ĐẶC BIỆT CỐT LÕI</span><span class=\"lx-vs-tag\">Special Variables</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>$?</code>:</strong> Mã thoát (Exit code) của lệnh vừa thực thi xong (0 = Thành công).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>$#</code>:</strong> Tổng số lượng tham số truyền vào script.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>$@</code>:</strong> Danh sách toàn bộ tham số (luôn bọc <code>\"$@\"</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>$0</code>:</strong> Tên của chính file script đang chạy.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Cấu trúc Shell Script Sản xuất & Phân tích Sâu set -euo pipefail",
          "content": "<p>Viết Bash script tự động hóa là một trong những kỹ năng giá trị nhất của kỹ sư DevOps. Một script nghiệp dư chạy được lúc demo nhưng sẽ gây thảm họa mất dữ liệu trên production nếu thiếu cơ chế bẫy lỗi.</p>\n    <p><strong>Giải phẫu chi tiết Bộ tứ sinh tồn:</strong></p>\n    <ul>\n      <li><code>set -e</code> (errexit): Thoát ngay nếu một câu lệnh trả về exit code khác 0. Loại bỏ thói quen nguy hiểm gõ lệnh kế tiếp bất chấp lệnh trước thất bại.</li>\n      <li><code>set -u</code> (nounset): Coi việc truy cập biến chưa được gán giá trị là một lỗi nghiêm trọng. Ngăn chặn triệt để thảm họa <code>TARGET_DIR=\"\" && rm -rf $TARGET_DIR/</code>!</li>\n      <li><code>set -o pipefail</code>: Mặc định Bash chỉ lấy exit code của lệnh CUỐI CÙNG trong pipe. Với <code>pipefail</code>, nếu lệnh đầu tiên bị lỗi (ví dụ <code>mysqldump</code> hỏng), cả chuỗi pipe sẽ báo lỗi ngay cả khi <code>gzip</code> phía sau chạy thành công.</li>\n    </ul>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Cú pháp / Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Cảnh báo</th></tr></thead>\n    <tbody>\n      <tr><td><code>set -euo pipefail</code></td><td>Kích hoạt chế độ kiểm soát lỗi nghiêm ngặt</td><td>Đặt ở đầu mọi file script</td><td><code>set -euo pipefail</code></td><td>Tiêu chuẩn vàng bắt buộc cho script doanh nghiệp.</td></tr>\n      <tr><td><code>[[ ... ]]</code></td><td>Khối kiểm tra điều kiện nâng cao của Bash</td><td><code>if [[ &lt;biểu_thức&gt; ]]; then</code></td><td><code>if [[ -f \"$FILE\" && -s \"$FILE\" ]]; then</code></td><td><code>-f</code> tồn tại file thường, <code>-s</code> dung lượng > 0, <code>-d</code> thư mục.</td></tr>\n      <tr><td><code>trap</code></td><td>Bắt tín hiệu và dọn dẹp khi script thoát</td><td><code>trap '&lt;hàm_dọn_dẹp&gt;' EXIT INT TERM</code></td><td><code>trap 'rm -rf \"$TMP_DIR\"' EXIT</code></td><td>Bảo đảm không để lại file rác tạm thời khi script bị hủy.</td></tr>\n      <tr><td><code>$?</code></td><td>Kiểm tra mã thoát (Exit status) của lệnh trước</td><td><code>echo $?</code></td><td><code>if [[ $? -ne 0 ]]; then exit 1; fi</code></td><td><code>0</code> là thành công; từ <code>1-255</code> là có lỗi.</td></tr>\n      <tr><td><code>\"$@\"</code></td><td>Mở rộng toàn bộ tham số bảo toàn khoảng trắng</td><td><code>for arg in \"$@\"; do</code></td><td><code>for file in \"$@\"; do echo \"$file\"; done</code></td><td>Luôn bọc trong dấu ngoặc kép để không bị tách từ (Word Splitting).</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Khuôn mẫu Shell Script chuẩn sản xuất đầy đủ phanh an toàn và hàm dọn dẹp trap",
              "lang": "Bash",
              "code": "#!/usr/bin/env bash\n# =============================================================================\n# Script Sao lưu Hạ tầng Tự động - Chuẩn mực Production\n# =============================================================================\nset -euo pipefail\n\n# Khởi tạo thư mục tạm an toàn và bẫy dọn dẹp khi thoát\nreadonly TMP_DIR=\"$(mktemp -d /tmp/backup_job.XXXXXX)\"\ntrap 'rm -rf \"$TMP_DIR\"; echo \"[CLEANUP] Da giai phong thu muc tam.\"' EXIT INT TERM\n\n# Kiểm tra đối số đầu vào\nif [[ $# -lt 1 ]]; then\n  echo \"Cách dùng: $0 <thư_mục_cần_sao_lưu>\"\n  exit 1\nfi\n\nreadonly SRC_DIR=\"$1\"\nif [[ ! -d \"$SRC_DIR\" ]]; then\n  echo \"[ERROR] Thư mục '$SRC_DIR' không tồn tại!\"\n  exit 2\nfi\n\necho \"[INFO] Đang đóng gói dữ liệu từ: $SRC_DIR...\"\ntar -czf \"$TMP_DIR/archive.tar.gz\" -C \"$SRC_DIR\" .\necho \"[SUCCESS] Sao lưu hoàn tất an toàn!\"",
              "output": "[INFO] Đang đóng gói dữ liệu từ: /etc/nginx...\n[SUCCESS] Sao lưu hoàn tất an toàn!\n[CLEANUP] Da giai phong thu muc tam.",
              "annotations": [
                {
                  "line": 5,
                  "text": "set -euo pipefail: Kích hoạt chế độ phòng thủ tối đa cho script."
                },
                {
                  "line": 8,
                  "text": "mktemp -d: Tạo thư mục tạm ngẫu nhiên duy nhất chống xung đột và tấn công symlink."
                },
                {
                  "line": 9,
                  "text": "trap EXIT: Bất kể script thành công hay bị lỗi giữa chừng, thư mục tạm luôn được xóa sạch."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-5-strict-mode-traps",
          "title": "4.1 Giải phẫu Chế độ Nghiêm ngặt set -euo pipefail & Những Ngoại lệ Cần Biết",
          "content": "<p>Mặc định, Bash được thiết kế cho chế độ gõ tương tác nên rất \"khoan dung\": một dòng lệnh gõ sai hay biến viết nhầm tên không làm đóng cửa sổ terminal, mà tiếp tục chạy dòng kế tiếp. Nhưng khi đưa hành vi đó vào <strong>Script tự động hóa vận hành (Deployment, Backup, Cleanup)</strong>, sự khoan dung đó biến thành quả bom nổ chậm! Bật <code>set -euo pipefail</code> ngay dưới dòng Shebang thiết lập 3 lớp khiên thép:</p>\n    <ul>\n      <li><strong>Xử lý lệnh chủ đích trả về khác 0 dưới <code>set -e</code>:</strong> Một tình huống thực tế rất hay gặp: lệnh <code>grep \"ERROR\" app.log</code> trả về mã thoát <code>1</code> khi <em>không có dòng lỗi nào</em>! Dưới chế độ <code>set -e</code>, mã thoát <code>1</code> này sẽ làm dừng oan cả script! Để xử lý tinh tế: nếu đặt lệnh bên trong điều kiện <code>if grep -q \"ERROR\" app.log; then ...</code> thì <code>set -e</code> tự hiểu bạn đang kiểm tra nên không dừng; hoặc nếu gán biến đếm, hãy nối thêm <code>COUNT=$(grep -c \"ERROR\" app.log || true)</code>.</li>\n      <li><strong>Gán giá trị mặc định an toàn dưới <code>set -u</code>:</strong> Thay vì đọc trần <code>$1</code> (sẽ nổ lỗi <code>unbound variable</code> nếu người chạy không truyền tham số), hãy dùng cú pháp mở rộng chuẩn <code>ENV_NAME=\"${1:-staging}\"</code> (nếu thiếu <code>$1</code> thì tự lấy <code>staging</code>).</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Đối chứng hành vi nuốt lỗi nguy hiểm của Pipe mặc định so với khi bật set -o pipefail",
              "code": "# 1. Mặc định KHÔNG có pipefail: lệnh đầu bị lỗi nhưng wc -l thành công -> $? vẫn báo 0 (Thành công giả!)\nbash -c 'ls /thu_muc_khong_ton_tai 2>/dev/null | wc -l >/dev/null; echo \"Without pipefail exit code: $?\"'\n\n# 2. CÓ bật set -o pipefail: phát hiện ngay chặng đầu thất bại -> trả về đúng mã lỗi 2!\nbash -c 'set -o pipefail; ls /thu_muc_khong_ton_tai 2>/dev/null | wc -l >/dev/null; echo \"With pipefail exit code:    $?\"' || true",
              "output": "Without pipefail exit code: 0\nWith pipefail exit code:    2",
              "annotations": [
                {
                  "line": 2,
                  "part": "Without pipefail -> 0",
                  "text": "Nguy cơ chí mạng trong sao lưu: 'mysqldump db_loi | gzip > backup.sql.gz' tạo ra file nén rỗng 20 byte nhưng vẫn báo backup thành công!"
                },
                {
                  "line": 5,
                  "part": "set -o pipefail -> 2",
                  "text": "Bắt giữ mã thoát khác 0 của bất kỳ mắt xích nào bị gãy trong toàn bộ đường ống."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-5-quoting-arrays-test",
          "title": "4.2 Phòng chống Lỗi Tách từ (Word Splitting): Dấu Ngoặc Kép \"$VAR\", Mảng Bash & [[ ... ]]",
          "content": "<p>Nếu kiểm tra mã nguồn bằng công cụ phân tích tĩnh tiêu chuẩn ngành <strong>ShellCheck</strong>, lỗi bị cảnh báo nhiều số 1 trong các script Bash là quên bọc biến trong dấu ngoặc kép (<code>SC2086: Double quote to prevent globbing and word splitting</code>):</p>\n    <ul>\n      <li><strong>Luôn viết <code>\"$FILE\"</code> thay vì <code>$FILE</code>:</strong> Khi viết trần không ngoặc kép, Bash cắt nát giá trị biến tại mọi dấu cách/tab/xuống dòng (theo biến <code>$IFS</code>) VÀ bung mọi ký tự <code>*</code> thành tên tệp trong thư mục hiện tại!</li>\n      <li><strong>Ưu tiên khối kiểm tra hiện đại <code>[[ ... ]]</code> hơn <code>[ ... ]</code> cổ điển:</strong> Trong Bash (<code>#!/usr/bin/env bash</code>), <code>[[ ... ]]</code> là từ khóa cú pháp của ngôn ngữ chứ không phải lệnh thường, nên nó miễn nhiễm hoàn toàn với lỗi tách từ khi biến rỗng, hỗ trợ trực tiếp toán tử <code>&amp;&amp;</code>, <code>||</code>, so khớp mẫu wildcard <code>[[ \"$NAME\" == prod-* ]]</code> và so khớp biểu thức chính quy <code>[[ \"$IP\" =~ ^[0-9]+\\.[0-9]+\\. ]]</code>.</li>\n      <li><strong>Cô lập phạm vi biến trong hàm bằng <code>local</code>:</strong> Mọi biến khai báo trong hàm Bash mặc định đều là <em>biến toàn cục (Global)</em>! Luôn khai báo <code>local target_file=\"$1\"</code> ở đầu hàm để không vô tình ghi đè biến trùng tên của chương trình chính.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Sử dụng mảng Bash (Arrays), biến cục bộ local và so khớp Regex trong [[ =~ ]]",
              "code": "validate_and_process() {\n  local version=\"$1\"\n  if [[ ! \"$version\" =~ ^v[0-9]+\\.[0-9]+\\.[0-9]+$ ]]; then\n    echo \"[ERROR] Sai dinh dang SemVer: $version\" >&2\n    return 1\n  fi\n  echo \"[OK] Phien ban hop le: $version\"\n}\n\nRELEASES=(\"v1.2.0\" \"beta-2\")\nfor rel in \"${RELEASES[@]}\"; do\n  validate_and_process \"$rel\" || true\ndone",
              "output": "[OK] Phien ban hop le: v1.2.0\n[ERROR] Sai dinh dang SemVer: beta-2",
              "annotations": [
                {
                  "line": 2,
                  "part": "local version=\"$1\"",
                  "text": "Từ khóa local khóa chặt biến version chỉ sống bên trong hàm validate_and_process."
                },
                {
                  "line": 3,
                  "part": "[[ ! \"$version\" =~ ^v... ]]",
                  "text": "Toán tử =~ kiểm tra biểu thức chính quy trực tiếp trong Bash không cần tốn chi phí gọi tiến trình grep hay sed bên ngoài."
                },
                {
                  "line": 11,
                  "part": "\"${RELEASES[@]}\"",
                  "text": "Cú pháp chuẩn mực duy nhất để duyệt mảng Bash bảo toàn nguyên vẹn các phần tử chứa khoảng trắng."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2-5-trap-cleanup-logging",
          "title": "4.3 Dọn dẹp Nguyên tử với trap ... EXIT INT TERM & Chuẩn hóa Hàm Ghi Log Có Mã Thoát",
          "content": "<p>Một kịch bản tự động hóa chạy trên máy chủ thường tạo ra thư mục làm việc tạm thời (giải nén gói tải về, xuất tệp SQL trung gian trước khi mã hóa) hoặc tệp khóa (lockfile). Nếu giữa chừng mạng đứt, đĩa đầy làm <code>set -e</code> ngắt ngang, hoặc quản trị viên bấm <code>Ctrl+C</code>, các câu lệnh <code>rm -rf</code> đặt ở cuối file sẽ <strong>không bao giờ được chạy tới</strong> — tích tụ hàng chục GB rác nhạy cảm trong <code>/tmp</code>!</p>\n    <p>Cơ chế <strong><code>trap cleanup EXIT</code></strong> trong Bash hoạt động giống hệt khối <code>try ... finally</code> trong Python/Java: hàm <code>cleanup</code> đã đăng ký với tín hiệu giả <code>EXIT</code> được đảm bảo thực thi 100% trước khi tiến trình Bash kết thúc, dù script hoàn thành bình thường, bị thoát sớm bởi <code>exit 1</code>, dính lỗi <code>set -e</code> hay nhận tín hiệu <code>SIGINT</code>/<code>SIGTERM</code>!</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Khuôn mẫu mktemp -d kết hợp trap cleanup tự động thu dọn kể cả khi Script gặp lỗi giữa chừng",
              "code": "bash -c '\n  set -euo pipefail\n  WORK_DIR=$(mktemp -d -t deploy_work.XXXXXX)\n  cleanup() {\n    local exit_code=$?\n    rm -rf \"$WORK_DIR\"\n    echo \"[FINALLY] Da don sach thu muc tam $WORK_DIR (Exit code: $exit_code)\"\n  }\n  trap cleanup EXIT\n\n  echo \"[INFO] Dang xu ly du lieu trong $WORK_DIR...\"\n  touch \"$WORK_DIR/secret_dump.sql\"\n  # Giả lập lỗi bất ngờ xảy ra ở giữa script:\n  false\n' || true",
              "output": "[INFO] Dang xu ly du lieu trong /tmp/deploy_work.a8Kp2Q...\n[FINALLY] Da don sach thu muc tam /tmp/deploy_work.a8Kp2Q (Exit code: 1)",
              "annotations": [
                {
                  "line": 3,
                  "part": "mktemp -d -t ...",
                  "text": "Tạo thư mục tạm có hậu tố ngẫu nhiên chống đoán tên và tự động gán quyền khóa chặt 0700 chỉ chủ sở hữu đọc được."
                },
                {
                  "line": 5,
                  "part": "local exit_code=$?",
                  "text": "Chụp lại mã thoát ngay dòng đầu tiên của hàm cleanup để biết script kết thúc thành công (0) hay bị sập do lỗi (1)."
                },
                {
                  "line": 9,
                  "part": "trap cleanup EXIT",
                  "text": "Dù dòng lệnh 'false' ở dưới kích hoạt set -e làm dừng script đột ngột, hàm cleanup vẫn tự động chạy dọn sạch secret_dump.sql!"
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Chứng minh thảm họa thiếu <code>set -u</code> và cách bọc biến chống Word Splitting.</p>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lỗi Nghiệp Dư: Thiếu Dấu Ngoặc Kép & Không Bẫy Lỗi</div>\n          <p>Viết <code>rm -rf $BACKUP_PATH/</code> khi biến <code>BACKUP_PATH</code> bị gõ sai chính tả hoặc rỗng.</p>\n          <p><strong>Thảm họa:</strong> Bash mở rộng biến rỗng thành chuỗi trống, câu lệnh trở thành <code>rm -rf /</code> và xóa sạch toàn bộ máy chủ!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Chuẩn Mực Phòng Thủ Toàn Diện</div>\n          <p>Luôn có <code>set -u</code> ở đầu script và bọc biến trong dấu ngoặc kép:</p>\n          <p><code>set -u && rm -rf \"${BACKUP_PATH:?Biến chưa định nghĩa}/\"</code></p>\n          <p><strong>Ưu điểm:</strong> Script lập tức dừng ngay và in thông báo lỗi trước khi lệnh rm kịp thực thi.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Viết Script Tự Động Thu Thập Hồ Sơ Hệ Thống & Gửi Báo Cáo",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.5</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Viết một script Bash hoàn chỉnh tuân thủ 100% chuẩn Strict Mode, thu thập thông số CPU, RAM, Disk và đóng gói vào tệp báo cáo.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Tệp script <code>~/sys_report.sh</code>.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Tạo tệp script: <code>cat << 'EOF' > ~/sys_report.sh\n#!/usr/bin/env bash\nset -euo pipefail\nreadonly REPORT=\"$HOME/system_summary.txt\"\necho \"=== HE THONG BAO CAO $(date) ===\" > \"$REPORT\"\necho \"1. Kernel: $(uname -sr)\" >> \"$REPORT\"\necho \"2. Dung luong dia: $(df -h / | awk 'NR==2 {print $4}') con trong\" >> \"$REPORT\"\necho \"[OK] Da tao bao cao tai: $REPORT\"\nEOF</code>.</li>\n        <li><strong>Bước 2:</strong> Cấp quyền thực thi an toàn cho script: <code>chmod u+x ~/sys_report.sh</code>.</li>\n        <li><strong>Bước 3:</strong> Chạy thử script: <code>~/sys_report.sh</code>.</li>\n        <li><strong>Bước 4:</strong> Kiểm tra nội dung báo cáo tự sinh: <code>cat ~/system_summary.txt</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">cat ~/system_summary.txt\n=== HE THONG BAO CAO ... ===\n1. Kernel: Linux 6.8.0...\n2. Dung luong dia: 34G con trong</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Bổ sung cấu trúc kiểm tra điều kiện: Nếu dung lượng đĩa còn trống dưới 5GB thì in cảnh báo <code>[CRITICAL]</code> ra màn hình.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Luôn sử dụng công cụ kiểm tra tĩnh <a href=\"https://www.shellcheck.net/\" target=\"_blank\" rel=\"noopener\">ShellCheck</a> (hoặc lệnh <code>shellcheck script.sh</code>) để rà quét toàn bộ lỗi tiềm ẩn trước khi đưa script vào cron job tự động.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>syntax error near unexpected token fi</code></td><td>Quên đặt dấu cách bên trong khối ngoặc kiểm tra điều kiện (ví dụ: gõ <code>if [[$a==$b]]</code> thay vì <code>if [[ $a == $b ]]</code>).</td><td>Bắt buộc phải có dấu cách phân cách giữa dấu ngoặc vuông và biểu thức: <code>[[ $a == $b ]]</code>.</td></tr>\n          <tr><td><code>script dừng đột ngột tại dòng lệnh grep</code></td><td>Chế độ <code>set -e</code> làm dừng script vì <code>grep</code> trả về exit code 1 khi không tìm thấy kết quả khớp.</td><td>Bọc lệnh bằng toán tử cho phép bỏ qua: <code>grep \"keyword\" file || true</code>.</td></tr>\n          <tr><td><code>bad interpreter: No such file</code></td><td>Tệp script được soạn thảo trên Windows chứa ký tự kết thúc dòng CRLF (<code>\\r\\n</code>).</td><td>Chuyển sang chuẩn Unix: <code>sed -i 's/\\r$//' script.sh</code> hoặc <code>dos2unix script.sh</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Luôn bọc biến trong dấu ngoặc kép (Double Quote Your Variables):</strong> Viết <code>rm \"$file\"</code> thay vì <code>rm $file</code> để bảo vệ script khỏi lỗi tách từ khi tên file có dấu cách.</li>\n        <li><strong>Không bao giờ dùng <code>eval</code> trên dữ liệu đầu vào người dùng:</strong> Lệnh <code>eval</code> rất dễ bị tấn công Command Injection cho phép kẻ xấu thực thi mã tùy ý.</li>\n        <li><strong>Sử dụng biến hằng số (readonly):</strong> Khai báo các đường dẫn cấu hình bằng <code>readonly CONFIG_PATH=\"/etc/app.conf\"</code> để ngăn các hàm vô tình sửa đổi giá trị.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Google Shell Style Guide:</strong> <a href=\"https://google.github.io/styleguide/shellguide.html\" target=\"_blank\" rel=\"noopener\">Google's Official Shell Script Coding Standards</a>.</li>\n      <li><strong>ShellCheck Linter:</strong> <a href=\"https://www.shellcheck.net/\" target=\"_blank\" rel=\"noopener\">ShellCheck — static analysis tool for shell scripts</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Biến Đặc Biệt & Toán Tử Điều Kiện trong Bash",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Ký hiệu</th><th>Ý nghĩa</th><th>Ví dụ sử dụng</th></tr></thead>\n        <tbody>\n          <tr><td><code>$0</code></td><td>Tên của script đang thực thi</td><td><code>echo \"Dang chay: $0\"</code></td></tr>\n          <tr><td><code>$1, $2...</code></td><td>Tham số truyền vào thứ 1, thứ 2</td><td><code>TARGET=\"$1\"</code></td></tr>\n          <tr><td><code>$#</code></td><td>Số lượng tham số được truyền vào</td><td><code>if [[ $# -eq 0 ]]; then</code></td></tr>\n          <tr><td><code>$?</code></td><td>Exit status của câu lệnh gần nhất (0=OK)</td><td><code>if [[ $? -ne 0 ]]; then</code></td></tr>\n          <tr><td><code>$$</code></td><td>PID của chính tiến trình shell hiện tại</td><td><code>TMP_FILE=\"/tmp/app_$$.tmp\"</code></td></tr>\n          <tr><td><code>-f</code> / <code>-d</code></td><td>Kiểm tra tệp tồn tại / Thư mục tồn tại</td><td><code>[[ -f \"$FILE\" ]]</code></td></tr>\n          <tr><td><code>-z</code> / <code>-n</code></td><td>Kiểm tra chuỗi rỗng / Chuỗi có độ dài > 0</td><td><code>[[ -z \"$VAR\" ]]</code></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Xây dựng script tự động deploy ứng dụng Python an toàn với cơ chế rollback",
        "content": "\n              <p>Mỗi lần cập nhật ứng dụng lên server, bạn phải thực hiện một chuỗi thao tác lặp lại: Pull git, kích hoạt virtualenv, cài thư viện mới qua pip, chạy migrate cơ sở dữ liệu và restart dịch vụ. Nếu bước migrate database bị lỗi nhưng script vẫn chạy tiếp bước restart, ứng dụng sẽ bị crash ngay lập tức.</p>\n              <p><strong>Giải pháp:</strong> Viết kịch bản <code>deploy.sh</code> áp dụng <code>set -euo pipefail</code> và bẫy <code>trap ERR</code>. Khi bất kỳ lệnh pip hay migrate nào thất bại, script lập tức dừng lại, hoàn tác git commit cũ (<code>git reset --hard HEAD@{1}</code>) và gửi thông báo lỗi về Telegram mà không làm sập dịch vụ đang chạy.</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Bẫy dừng script bất ngờ của set -e khi dùng với grep hoặc test",
            "content": "Cờ <code>set -e</code> dừng script khi một lệnh trả về exit code khác 0. Tuy nhiên, lệnh <code>grep</code> trả về mã 1 khi KHÔNG tìm thấy dòng nào (điều này hoàn toàn bình thường trong logic nghiệp vụ). Nếu viết <code>grep 'pattern' file.txt</code> trong script bật <code>set -e</code>, script sẽ lập tức bị bắn hạ! Cách phòng vệ: <code>grep 'pattern' file.txt || true</code>."
          },
          {
            "title": "Quên nháy kép biến khi dùng lệnh kiểm tra POSIX [ ... ]",
            "content": "Nếu bạn dùng lệnh cổ điển <code>[ $VAR = \"hello\" ]</code>: khi biến <code>$VAR</code> rỗng, lệnh biến thành <code>[ = \"hello\" ]</code> và ném lỗi cú pháp <em>unary operator expected</em>. Hãy luôn dùng cú pháp hiện đại của Bash: <code>[[ \"$VAR\" == \"hello\" ]]</code>."
          }
        ],
        "tips": [
          {
            "title": "Tích hợp ShellCheck vào quy trình kiểm thử trước khi commit code",
            "content": "Cài đặt công cụ phân tích tĩnh: <code>sudo apt install shellcheck</code> và chạy <code>shellcheck my_script.sh</code>. ShellCheck sẽ chỉ ra chính xác từng dòng thiếu quoting, cạm bẫy logic và hướng dẫn cách sửa theo chuẩn POSIX/Bash."
          },
          {
            "title": "Bật chế độ debug dòng lệnh linh hoạt với cờ -x",
            "content": "Khi script gặp lỗi khó hiểu, hãy chạy script với cờ <code>bash -x my_script.sh</code> hoặc thêm <code>set -x</code> vào đoạn code cần soi. Bash sẽ in ra từng lệnh kèm các giá trị biến đã được giải mã trước khi thực thi."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Xây dựng khung kịch bản Bash chuẩn an toàn",
          "problem": "Viết khung sườn (boilerplate) phòng vệ tiêu chuẩn cho script Bash bao gồm shebang, cờ an toàn và hàm trap dọn dẹp file tạm khi thoát.",
          "hint": "Sử dụng shebang #!/usr/bin/env bash, kích hoạt set -euo pipefail và gắn lệnh trap cleanup EXIT.",
          "solutionCode": "#!/usr/bin/env bash\nset -euo pipefail\n\nTMP_DIR=$(mktemp -d)\ncleanup() {\n  rm -rf \"$TMP_DIR\"\n  echo \"[INFO] Đã dọn dẹp tài nguyên tạm thành công.\"\n}\ntrap cleanup EXIT\n\necho \"[INFO] Bắt đầu thực thi script an toàn...\"",
          "solutionOutput": "[INFO] Bắt đầu thực thi script an toàn...\n[INFO] Đã dọn dẹp tài nguyên tạm thành công.",
          "explanation": "set -euo pipefail ngăn chặn 3 lỗi nghiêm trọng: tiếp tục chạy khi có lệnh lỗi (-e), sử dụng biến chưa khởi tạo (-u), và nuốt lỗi trong đường ống pipe (-o pipefail). trap EXIT đảm bảo tài nguyên tạm luôn được giải phóng.",
          "annotations": [
            {
              "part": "set -euo pipefail",
              "text": "Cài đặt bắt buộc cho mọi script production trong môi trường DevOps."
            },
            {
              "part": "trap cleanup EXIT",
              "text": "Bắt mọi kịch bản thoát bình thường hoặc bất thường để dọn dẹp."
            }
          ],
          "rubric": [
            {
              "criterion": "Thiết lập an toàn",
              "pass": "Có set -euo pipefail",
              "excellent": "Kết hợp trap cleanup EXIT và mktemp -d",
              "weight": "50%"
            },
            {
              "criterion": "Cấu trúc kịch bản",
              "pass": "Đúng chuẩn shebang",
              "excellent": "Mã nguồn sạch, có log thông báo rõ ràng",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Kiểm tra phiên bản bằng biểu thức chính quy trong Bash",
          "problem": "Sử dụng cú pháp so sánh hiện đại [[ ... ]] để kiểm tra xem biến VERSION có tuân theo định dạng chuẩn vX.Y.Z hay không.",
          "hint": "Dùng toán tử khớp biểu thức chính quy =~ bên trong cặp ngoặc kép [[ ... ]].",
          "solutionCode": "VERSION=\"v1.4.2\"\nif [[ \"$VERSION\" =~ ^v[0-9]+\\.[0-9]+\\.[0-9]+$ ]]; then\n  echo \"Phiên bản hợp lệ chuẩn SemVer: $VERSION\"\nelse\n  echo \"Định dạng phiên bản không hợp lệ!\" >&2\n  exit 1\nfi",
          "solutionOutput": "Phiên bản hợp lệ chuẩn SemVer: v1.4.2",
          "explanation": "Toán tử =~ trong [[ ... ]] hỗ trợ regex chuẩn POSIX ERE mà không cần gọi tiến trình con grep ngoài, tăng tốc độ xử lý trong kịch bản.",
          "annotations": [
            {
              "part": "[[ \"$VERSION\" =~ ... ]]",
              "text": "Cú pháp regex tích hợp sẵn của Bash, xử lý trực tiếp trong bộ nhớ shell."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp regex Bash",
              "pass": "Dùng đúng [[ =~ ]]",
              "excellent": "Biểu thức chính quy neo đầu ^ và đuôi $ chuẩn xác",
              "weight": "50%"
            },
            {
              "criterion": "Xử lý lỗi",
              "pass": "In thông báo khi sai",
              "excellent": "Xuất lỗi ra stderr và trả về exit code 1 chuẩn mực",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Kỹ thuật phòng vệ cho lệnh grep trong chế độ set -e",
          "problem": "Viết câu lệnh phòng vệ cho lệnh grep bên trong script đang bật set -e, sao cho khi grep không tìm thấy kết quả (trả về exit code 1) thì script không bị sập.",
          "hint": "Sử dụng toán tử logic || true hoặc cấu trúc if grep -q ... then.",
          "solutionCode": "# Kỹ thuật phòng vệ dùng || true hoặc kiểm tra if:\nMATCHED_LINES=$(grep \"CRITICAL_ERROR\" /var/log/app.log || true)\n\nif [[ -n \"$MATCHED_LINES\" ]]; then\n  echo \"Phát hiện lỗi nghiêm trọng:\"\n  echo \"$MATCHED_LINES\"\nelse\n  echo \"Hệ thống an toàn, không có lỗi CRITICAL.\"\nfi",
          "solutionOutput": "Hệ thống an toàn, không có lỗi CRITICAL.",
          "explanation": "Lệnh grep trả về exit code 1 khi không tìm thấy kết quả. Khi bật cờ set -e, hành vi này sẽ lập tức làm sập script. Thêm || true bắt exit code và trả về 0 cho shell.",
          "annotations": [
            {
              "part": "|| true",
              "text": "Bảo vệ lệnh có thể trả về mã khác 0 có chủ đích khỏi cơ chế dừng của set -e."
            }
          ],
          "rubric": [
            {
              "criterion": "Phòng vệ set -e",
              "pass": "Dùng || true hoặc if",
              "excellent": "Giải thích rõ tại sao grep exit code 1 kích hoạt set -e",
              "weight": "50%"
            },
            {
              "criterion": "Logic xử lý",
              "pass": "Kiểm tra biến kết quả",
              "excellent": "Tách bạch rõ ràng trường hợp có lỗi và không có lỗi",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Luôn đặt Shebang chuẩn `#!/usr/bin/env bash` và bộ tứ phanh an toàn `set -euo pipefail` ở đầu mọi script tự động hóa.",
        "`set -e` dừng script khi có lỗi; `set -u` chặn biến rỗng; `set -o pipefail` bắt lỗi xuyên qua đường ống pipe.",
        "Sử dụng cơ chế `trap 'cleanup' EXIT` để đảm bảo tài nguyên và file tạm thời luôn được dọn dẹp sạch sẽ trong mọi tình huống.",
        "Luôn bọc biến trong dấu ngoặc kép `\"$VAR\"` để ngăn ngừa lỗi Word Splitting khi tên file chứa dấu cách.",
        "Sử dụng công cụ kiểm tra tĩnh ShellCheck trước khi đưa bất kỳ script nào vào vận hành trên hệ thống sản xuất."
      ],
      "generalInfo": {
        "duration": "55 phút",
        "targetAudience": "Lập trình viên, Kỹ sư DevOps, Automation Engineer",
        "prerequisites": "Đã hoàn thành Bài 2.1 đến 2.4, hiểu biến môi trường và luồng I/O",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2)",
        "materials": "Terminal, Shell Bash 5.x, trình soạn thảo Vim/nano"
      },
      "nextLessonPreview": "Trong bài tiếp theo (2.6), chúng ta sẽ bước sang Tự Động Hóa Tác Vụ Định Kỳ với `cron` (`flock` chống chạy đè) & Quản trị Dịch vụ Cơ bản với `systemd` (`systemctl`, `journalctl`).",
      "quiz": [
        {
          "question": "Tùy chọn nào trong lệnh `set -euo pipefail` có nhiệm vụ BẢO VỆ bạn khỏi thảm họa biến chưa định nghĩa (ví dụ: `DIR=\"\" && rm -rf $DIR/` bị chặn đứng)?",
          "options": [
            "set -e",
            "set -u (nounset)",
            "set -o pipefail",
            "set -x"
          ],
          "correctIndex": 1,
          "explanation": "set -u (nounset) chỉ thị cho Bash coi việc sử dụng biến chưa được gán giá trị (hoặc rỗng) là một lỗi nghiêm trọng và lập tức dừng script ngay."
        },
        {
          "question": "Tại sao trong một chuỗi lệnh Pipe phức tạp (ví dụ `mysqldump mydb | gzip > db.sql.gz`), tùy chọn `set -o pipefail` lại cực kỳ quan trọng?",
          "options": [
            "Để nén file nhanh hơn gấp đôi.",
            "Vì nếu không có pipefail, Bash chỉ lấy exit code của lệnh cuối cùng (gzip); nếu mysqldump bị lỗi mất dữ liệu nhưng gzip vẫn tạo file rỗng thành công, script sẽ tưởng nhầm là sao lưu thành công!",
            "Để script không cần quyền root.",
            "Để tự động xóa file nếu bị lỗi."
          ],
          "correctIndex": 1,
          "explanation": "Mặc định Bash trả về exit code của lệnh cuối cùng trong pipe. set -o pipefail bảo đảm nếu bất kỳ lệnh nào trong pipe thất bại, cả đường ống sẽ báo lỗi."
        },
        {
          "question": "Lệnh nào sau đây dùng để bắt tín hiệu thoát và tự động dọn dẹp thư mục tạm dù script kết thúc bình thường hay bị ngắt giữa chừng bởi Ctrl+C?",
          "options": [
            "clean -r /tmp/dir",
            "trap 'rm -rf \"$TMP_DIR\"' EXIT INT TERM",
            "rm -rf /tmp/dir &",
            "exit 0"
          ],
          "correctIndex": 1,
          "explanation": "trap bắt các tín hiệu EXIT, SIGINT (2), SIGTERM (15) và bảo đảm khối lệnh dọn dẹp luôn được thực thi tin cậy trước khi tiến trình kết thúc."
        }
      ],
      "reflectionQuestion": "Một kỹ sư viết đoạn script: `cd /var/log/my-app && rm -rf *`. Một ngày nọ, thư mục `/var/log/my-app` bị ai đó đổi tên, khiến lệnh `cd` thất bại. Hãy phân tích chuyện gì đã xảy ra ngay sau đó và giải thích cách viết lại script an toàn tuyệt đối.",
      "reflectionHint": "Gợi ý: Lệnh `cd` thất bại nên terminal vẫn đứng ở thư mục trước đó (ví dụ `/` hoặc thư mục gốc). Lệnh kế tiếp `rm -rf *` thực thi ngay tại thư mục hiện tại đó và xóa sạch dữ liệu! Cách sửa chuẩn: (1) Luôn có `set -e` ở đầu script để dừng ngay khi `cd` thất bại; (2) Hoặc nối bằng toán tử `cd /var/log/my-app && rm -rf ./*`; (3) Hoặc dùng lệnh an toàn: `rm -rf /var/log/my-app/*` (đường dẫn tuyệt đối tường minh)."
    },
    {
      "id": "lx-2-06",
      "number": "2.6",
      "title": "Tự động hóa tác vụ định kỳ với cron (flock) & systemd cơ bản (systemctl, journalctl)",
      "subtitle": "Lập lịch chạy tác vụ tự động hằng đêm và quản lý trạng thái các dịch vụ cốt lõi của hệ điều hành",
      "level": "Trung cấp",
      "duration": "50 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nắm vững cú pháp 5 trường thời gian của crontab và các tùy chọn systemctl, journalctl",
        "2. [Hiểu - Understand] Hiểu rõ sự khác biệt giữa cron environment vs login shell và nguy cơ trùng lặp tác vụ",
        "3. [Vận dụng - Apply] Sử dụng flock để chống chồng chéo tiến trình cron và cấu hình kiểm soát trạng thái dịch vụ với systemctl",
        "4. [Phân tích - Analyze] Phân tích log dịch vụ thời gian thực bằng journalctl và điều tra nguyên nhân cron job không thực thi"
      ],
      "intuition": {
        "title": "Chuông báo thức tự động và Người quản gia systemd",
        "overview": "Lập lịch định kỳ và kiểm soát tiến trình nền là trái tim của quản trị hệ thống tự động. Bài học này làm chủ cron an toàn với flock và làm chủ systemctl/journalctl.",
        "realWorld": "Một cron job chạy backup cơ sở dữ liệu hàng đêm lúc 2:00 AM. Nếu dữ liệu lớn khiến backup chạy mất 70 phút trong khi cron lặp mỗi 60 phút, hai tiến trình cùng chạy sẽ gây nghẽn đĩa và hỏng dữ liệu. Khóa flock giải quyết triệt để vấn đề này.",
        "metaphor": "Cron giống như chuông báo thức lặp lại mỗi ngày, còn systemd là người quản gia chuyên nghiệp luôn túc trực kiểm tra xem ứng dụng có sống không để lập tức hồi sinh khi gặp sự cố.",
        "boundary": "Cron chỉ phù hợp với các tác vụ chạy theo lịch rồi tắt (batch jobs). Với các tiến trình cần duy trì liên tục 24/7 (web server, worker), ta phải dùng systemd Service.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Lập lịch định kỳ và kiểm soát tiến trình nền là trái tim của quản trị hệ thống tự động. Bài học này làm chủ cron an toàn với flock và làm chủ systemctl/journalctl.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>crontab -e</code>:</strong> Sửa crontab của user hiện tại</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>flock</code>:</strong> Khóa file chống chạy trùng lặp</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>systemctl</code>:</strong> Kiểm soát dịch vụ hệ thống</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một cron job chạy backup cơ sở dữ liệu hàng đêm lúc 2:00 AM. Nếu dữ liệu lớn khiến backup chạy mất 70 phút trong khi cron lặp mỗi 60 phút, hai tiến trình cùng chạy sẽ gây nghẽn đĩa và hỏng dữ liệu. Khóa flock giải quyết triệt để vấn đề này.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Cấu hình lập lịch crontab và giải quyết bẫy môi trường PATH</li><li><span class=\"lx-vs-bullet\">•</span> Quản lý trạng thái dịch vụ hệ thống với systemctl</li><li><span class=\"lx-vs-bullet\">•</span> Truy vấn log hệ thống tập trung bằng journalctl</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Lập lịch / Dịch vụ",
          "content": "<p>Quản lý tác vụ định kỳ và dịch vụ hệ thống xoay quanh hai công cụ nền tảng: <strong>cron</strong> (chạy tác vụ theo mốc thời gian) và <strong>systemd</strong> (hệ thống init và quản lý tiến trình dịch vụ).</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Lệnh / Cú pháp</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Ghi chú vận hành</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>crontab -e</code></td>\n            <td>Sửa crontab của user hiện tại</td>\n            <td><code>crontab -e</code></td>\n            <td><code>crontab -e</code></td>\n            <td>Không dùng <code>crontab -r</code> kẻo xóa sạch lịch</td>\n          </tr>\n          <tr>\n            <td><code>flock</code></td>\n            <td>Khóa file chống chạy trùng lặp</td>\n            <td><code>flock -n /path/to/lock -c 'command'</code></td>\n            <td><code>flock -n /var/lock/bk.lock -c '/opt/bk.sh'</code></td>\n            <td>Cờ <code>-n</code> (non-blocking) thoát ngay nếu đang bận</td>\n          </tr>\n          <tr>\n            <td><code>systemctl</code></td>\n            <td>Kiểm soát dịch vụ hệ thống</td>\n            <td><code>systemctl [start|stop|restart|status] &lt;unit&gt;</code></td>\n            <td><code>systemctl status nginx</code></td>\n            <td>Dùng <code>enable --now</code> để vừa bật khởi động vừa chạy ngay</td>\n          </tr>\n          <tr>\n            <td><code>journalctl</code></td>\n            <td>Truy vấn log tập trung của systemd</td>\n            <td><code>journalctl -u &lt;unit&gt; -f -n 100</code></td>\n            <td><code>journalctl -u nginx -e --no-pager</code></td>\n            <td>Log được gom từ kernel, stdout/stderr của mọi service</td>\n          </tr>\n          <tr>\n            <td><code>systemctl daemon-reload</code></td>\n            <td>Tải lại định nghĩa unit sau khi sửa file</td>\n            <td><code>systemctl daemon-reload</code></td>\n            <td><code>sudo systemctl daemon-reload</code></td>\n            <td>Bắt buộc chạy sau khi sửa bất kỳ file <code>.service</code> nào</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-2-6-crontab-syntax",
          "title": "4.1 Cấu hình lập lịch crontab và giải quyết bẫy môi trường PATH",
          "content": "\n                  <p>Để quản lý lịch trình cá nhân của người dùng, dùng lệnh: <code>crontab -e</code> (sửa lịch), <code>crontab -l</code> (xem lịch), <code>crontab -r</code> (xóa lịch).</p>\n                  <p><strong>Cạm bẫy sống còn số 1 của cron: MÔI TRƯỜNG THIẾU THỐNG NHẤT (Minimal PATH)</strong></p>\n                  <p>Khi bạn gõ lệnh trên terminal, shell nạp đầy đủ PATH từ <code>~/.bashrc</code> (bao gồm <code>/usr/local/bin</code>, <code>~/.local/bin</code>, môi trường Python venv). Nhưng cron khởi chạy với một môi trường vô cùng tối giản, thường chỉ có <code>/usr/bin:/bin</code>!</p>\n                  <p>Kết quả là: script chạy tay từ terminal rất mượt mà, nhưng đặt vào cron lại lăn ra chết với lỗi: <code>command not found</code>!</p>\n                  <div class=\"callout-box callout-tip\"><div class=\"callout-header\"><span>💡 Ghi nhớ hữu ích:</span> <span>2 Giải pháp triệt để cho vấn đề PATH trong cron</span></div><div class=\"callout-body\">\n                    <ol>\n                      <li>Khai báo dòng <code>PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin</code> ngay dòng đầu tiên của file crontab.</li>\n                      <li>Luôn luôn sử dụng đường dẫn tuyệt đối cho toàn bộ câu lệnh và tệp thực thi (ví dụ: dùng <code>/usr/bin/python3</code> thay vì <code>python3</code>).</li>\n                    </ol>\n                  </div></div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Ví dụ cấu hình crontab chuẩn mực",
              "code": "# Khai báo PATH và SHELL ở đầu file crontab (crontab -e)\nSHELL=/bin/bash\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin\n\n# Chạy script sao lưu database lúc 02:30 sáng hằng ngày\n30 2 * * * /usr/bin/flock -n /tmp/db_backup.lock /opt/scripts/backup_db.sh >> /var/log/backup.log 2>&1\n\n# Chạy tác vụ dọn dẹp file cache vào mỗi 15 phút một lần\n*/15 * * * * /usr/bin/python3 /opt/app/clean_cache.py >> /var/log/cache_clean.log 2>&1",
              "annotations": [
                {
                  "line": 5,
                  "part": "30 2 * * *",
                  "text": "Phút 30, Giờ 2 (tức 02:30 AM), chạy mỗi ngày."
                },
                {
                  "line": 5,
                  "part": "/usr/bin/flock -n ...",
                  "text": "Khóa chống chạy đè: nếu lần chạy trước bị nghẽn, lần chạy này sẽ hủy bỏ ngay lập tức."
                },
                {
                  "line": 5,
                  "part": ">> ... 2>&1",
                  "text": "Chuyển cả output chuẩn (stdout) và lỗi (stderr) vào file log để tiện điều tra."
                },
                {
                  "line": 8,
                  "part": "*/15 * * * *",
                  "text": "Cú pháp bước nhảy: cứ mỗi 15 phút chạy một lần."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-2-6-systemd-basics",
          "title": "4.2 Quản lý trạng thái dịch vụ hệ thống với systemctl",
          "content": "\n                  <p><code>systemd</code> là hệ thống quản lý dịch vụ và khởi tạo tiến trình đầu tiên (PID 1) trên hầu hết các bản phân phối Linux hiện đại (Ubuntu, Debian, RHEL, CentOS, Rocky, Fedora, Arch).</p>\n                  <p>Lệnh <code>systemctl</code> dùng để giao tiếp với systemd daemon:</p>\n                  <ul>\n                    <li><code>sudo systemctl status [service]</code>: Xem trạng thái chi tiết, PID chính, mức RAM tiêu thụ và vài dòng log gần nhất.</li>\n                    <li><code>sudo systemctl start [service]</code>: Bật dịch vụ ngay lập tức.</li>\n                    <li><code>sudo systemctl stop [service]</code>: Dừng dịch vụ.</li>\n                    <li><code>sudo systemctl restart [service]</code>: Khởi động lại dịch vụ (dừng hẳn rồi bật lại).</li>\n                    <li><code>sudo systemctl reload [service]</code>: Nạp lại cấu hình mà không ngắt kết nối (zero-downtime).</li>\n                    <li><code>sudo systemctl enable [service]</code>: Cấu hình cho dịch vụ <strong>tự động bật lên khi máy chủ khởi động</strong>.</li>\n                    <li><code>sudo systemctl disable [service]</code>: Tắt tự khởi động cùng hệ thống.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra và kích hoạt dịch vụ web Nginx",
              "code": "# Kiểm tra trạng thái chi tiết của Nginx\nsystemctl status nginx\n\n# Bật tự khởi động cùng hệ điều hành cho Nginx\nsudo systemctl enable nginx\n\n# Kiểm tra nhanh xem dịch vụ có đang thực sự hoạt động hay không (thích hợp viết trong script)\nsystemctl is-active --quiet nginx && echo \"Nginx đang chạy bình thường\"",
              "annotations": [
                {
                  "line": 2,
                  "part": "systemctl status",
                  "text": "Hiển thị màu xanh lá (active/running) hoặc màu đỏ/xám khi dịch vụ bị chết."
                },
                {
                  "line": 5,
                  "part": "systemctl enable",
                  "text": "Tạo một symlink mềm trong thư mục /etc/systemd/system/multi-user.target.wants/ để boot cùng OS."
                },
                {
                  "line": 8,
                  "part": "is-active --quiet",
                  "text": "Trả về exit code 0 nếu service đang chạy, 3 nếu service đã dừng (không in chữ thừa)."
                }
              ],
              "output": "● nginx.service - A high performance web server and a reverse proxy server\n     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)\n     Active: active (running) since Wed 2026-10-28 10:00:00 UTC; 5h ago\n   Main PID: 1120 (nginx)\n      Tasks: 5 (limit: 4615)\n     Memory: 8.5M\nNginx đang chạy bình thường"
            }
          ]
        },
        {
          "id": "sec-2-6-journalctl-query",
          "title": "4.3 Truy vấn log hệ thống tập trung bằng journalctl",
          "content": "\n                  <p>Trước đây mỗi dịch vụ tự ghi log vào một file riêng trong <code>/var/log</code>. systemd giới thiệu <code>journald</code> — cơ chế ghi log tập trung dạng nhị phân, cho phép lọc log cực nhanh theo thời gian, theo service hoặc theo PID.</p>\n                  <p>Các cờ truy vấn journalctl phổ biến nhất:</p>\n                  <ul>\n                    <li><code>journalctl -u [service]</code>: Chỉ xem log của một dịch vụ cụ thể (ví dụ: <code>journalctl -u nginx</code>).</li>\n                    <li><code>journalctl -f</code>: Theo dõi log thời gian thực giống như <code>tail -f</code>.</li>\n                    <li><code>journalctl -n 50</code>: Chỉ lấy 50 dòng log gần nhất.</li>\n                    <li><code>journalctl -p err</code>: Chỉ lọc ra các log có mức độ nghiêm trọng từ Error trở lên (bỏ qua thông báo Info/Debug).</li>\n                    <li><code>journalctl --since \"1 hour ago\"</code>: Lọc log phát sinh trong vòng 1 giờ qua.</li>\n                    <li><code>journalctl -b</code>: Chỉ xem log từ lần khởi động máy chủ gần nhất (boot hiện tại).</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Truy vết nguyên nhân dịch vụ bị crash bằng journalctl",
              "code": "# Xem 20 dòng log lỗi gần nhất của dịch vụ backend my_app\njournalctl -u my_app -p err -n 20 --no-pager\n\n# Theo dõi trực tiếp log đăng nhập SSH để bắt các đợt tấn công brute-force\njournalctl -u ssh -f",
              "annotations": [
                {
                  "line": 2,
                  "part": "-p err --no-pager",
                  "text": "-p err lọc log cấp độ lỗi; --no-pager xuất thẳng ra terminal không bị phân trang bởi less."
                },
                {
                  "line": 5,
                  "part": "-u ssh -f",
                  "text": "Theo dõi trực tiếp (follow) các phiên đăng nhập SSH thành công và thất bại."
                }
              ],
              "output": "Oct 28 15:40:12 srv1 my_app[4510]: sqlalchemy.exc.OperationalError: Unable to connect to PostgreSQL at 10.0.0.5:5432\nOct 28 15:40:12 srv1 systemd[1]: my_app.service: Main process exited, code=exited, status=1/FAILURE"
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Lập lịch cron kèm biến môi trường và flock an toàn</h4>\n      <p>Giảng viên kiểm tra crontab hiện tại và tạo tác vụ định kỳ bảo đảm không bị nuốt lỗi:</p>\n      <pre><code># Mở crontab để chỉnh sửa\ncrontab -e\n\n# Khai báo PATH rõ ràng ở đầu crontab\nSHELL=/bin/bash\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n\n# Tác vụ chạy mỗi 30 phút, có khóa flock và ghi log rõ ràng\n*/30 * * * * /usr/bin/flock -n /tmp/sync.lock /usr/local/bin/sync_data.sh >> /var/log/sync.log 2>&1</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Viết lệnh cron cẩu thả</div>\n          <pre><code># Nguy hiểm: Không khai báo PATH,\n# không dùng đường dẫn tuyệt đối,\n# không khóa flock, nuốt log\n*/5 * * * * python script.py > /dev/null 2>&1</code></pre>\n          <p class=\"lx-diff-desc\">Lệnh <code>python</code> sẽ thất bại do cron có PATH tối giản không chứa pyenv/conda; không có flock sẽ bị chồng chéo khi script chạy quá 5 phút; nuốt log khiến không thể gỡ lỗi.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Chuẩn Production</div>\n          <pre><code># An toàn: PATH tuyệt đối, khóa flock,\n# ghi nhật ký đầy đủ ra file log\n*/5 * * * * /usr/bin/flock -n /var/lock/app.lock   /usr/bin/python3 /opt/app/script.py >> /var/log/app.log 2>&1</code></pre>\n          <p class=\"lx-diff-desc\">Chỉ rõ binary tuyệt đối, ngăn chặn race condition bằng flock non-blocking và giữ nguyên log chẩn đoán sự cố.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Thiết lập Cron Job Giám sát & Quản trị Dịch vụ systemd",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.6</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Tạo một shell script giám sát dung lượng đĩa, lập lịch chạy mỗi 5 phút bằng cron với khóa flock, sau đó kiểm tra và quản lý trạng thái dịch vụ cron bằng systemctl.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Hệ điều hành: Linux (Ubuntu/Debian/CentOS).</li>\n        <li>Tạo thư mục làm việc: <code>mkdir -p ~/cron-lab && cd ~/cron-lab</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Tạo script cảnh báo đĩa <code>monitor_disk.sh</code>:\n          <pre><code>cat &lt;&lt; 'EOF' > ~/cron-lab/monitor_disk.sh\n#!/bin/bash\nset -euo pipefail\nUSAGE=$(df / | awk 'NR==2 {print $5}' | tr -d '%')\necho \"$(date '+%Y-%m-%d %H:%M:%S') - Root disk usage: ${USAGE}%\" >> ~/cron-lab/disk.log\nif [ \"$USAGE\" -gt 80 ]; then\n  echo \"CẢNH BÁO: Dung lượng đĩa vượt 80%!\" >> ~/cron-lab/disk.log\nfi\nEOF\nchmod +x ~/cron-lab/monitor_disk.sh</code></pre>\n        </li>\n        <li>Thiết lập crontab tự động với flock:\n          <pre><code>(crontab -l 2>/dev/null; echo \"*/5 * * * * /usr/bin/flock -n /tmp/disk_mon.lock $HOME/cron-lab/monitor_disk.sh\") | crontab -</code></pre>\n        </li>\n        <li>Kiểm tra trạng thái dịch vụ cron và đọc log chạy:\n          <pre><code>sudo systemctl status cron || sudo systemctl status crond\njournalctl -u cron -n 20 --no-pager</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Sau 5 phút, kiểm tra file <code>~/cron-lab/disk.log</code> sẽ thấy dòng log ghi nhận mức phần trăm dung lượng đĩa kèm timestamp chuẩn xác.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Thử nghiệm giả lập tiến trình chạy lâu bằng <code>sleep 60</code> bên trong script, sau đó kích hoạt thủ công script lần thứ hai song song với lệnh <code>flock -n</code> để quan sát cơ chế bỏ qua an toàn.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Khi dùng <code>crontab -e</code>, tuyệt đối không gõ nhầm <code>crontab -r</code> vì cờ <code>-r</code> sẽ xóa toàn bộ crontab của bạn ngay lập tức mà không có hộp thoại hỏi lại!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Script chạy thủ công thì thành công nhưng trong crontab thì báo <code>command not found</code></strong></td><td>Môi trường của cron cực kỳ tinh giản, biến <code>PATH</code> mặc định chỉ có <code>/usr/bin:/bin</code>, không kế thừa <code>~/.bashrc</code> hay <code>/usr/local/bin</code>.</td><td>Luôn khai báo biến <code>PATH</code> rõ ràng ở đầu crontab hoặc dùng đường dẫn tuyệt đối cho tất cả lệnh thực thi.</td></tr>\n          <tr><td><strong>Ký tự <code>%</code> trong crontab làm hỏng câu lệnh date</strong></td><td>Trong crontab, ký tự <code>%</code> được xem là dấu xuống dòng (newline), khiến câu lệnh <code>date +%Y%m%d</code> bị cắt ngang.</td><td>Luôn escape dấu phần trăm: <code>date +\\%Y\\%m\\%d</code> hoặc gom toàn bộ lệnh vào một file script <code>.sh</code> độc lập.</td></tr>\n          <tr><td><strong>Dịch vụ systemd báo trạng thái <code>Failed (Result: exit-code)</code> khi start</strong></td><td>Cấu hình file service sai cú pháp, đường dẫn ExecStart không tồn tại, hoặc phân quyền thư mục WorkingDirectory không hợp lệ.</td><td>Kiểm tra chi tiết nguyên nhân chết với <code>journalctl -u &lt;service&gt; -e --no-pager</code> và <code>systemctl status &lt;service&gt;</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Không bao giờ đặt lịch cron chạy quyền root nếu không bắt buộc:</strong> Chỉ chạy cron bằng user dịch vụ chuyên biệt (ví dụ <code>deploy</code>, <code>www-data</code>) tuân theo nguyên tắc đặc quyền tối thiểu.</li>\n        <li><strong>Bảo vệ tệp crontab và script thực thi:</strong> Script được gọi trong crontab của root phải có quyền <code>chmod 700</code> hoặc <code>chmod 750</code> thuộc sở hữu root; nếu script bị người dùng khác sửa đổi được, họ có thể leo thang đặc quyền root dễ dàng.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Crontab Guru:</strong> Công cụ kiểm tra biểu thức cron tương tác trực quan: <a href=\"https://crontab.guru\" target=\"_blank\" rel=\"noopener\">crontab.guru</a>.</li>\n      <li><strong>Systemd Official Documentation:</strong> <a href=\"https://systemd.io/\" target=\"_blank\" rel=\"noopener\">systemd.io System and Service Manager</a>.</li>\n      <li><strong>Flock Man Page:</strong> <code>man 1 flock</code> - Quản lý khóa tệp tin trong shell script.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Tra cứu Cú pháp Crontab & Systemctl",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Ký tự</th><th>Ý nghĩa</th><th>Ví dụ</th></tr></thead>\n        <tbody>\n          <tr><td><code>*</code></td><td>Mọi giá trị</td><td><code>* * * * *</code>: chạy mỗi phút</td></tr>\n          <tr><td><code>*/n</code></td><td>Mỗi chu kỳ n đơn vị</td><td><code>*/15 * * * *</code>: mỗi 15 phút</td></tr>\n          <tr><td><code>,</code></td><td>Danh sách các mốc</td><td><code>0 8,14 * * *</code>: lúc 8h00 và 14h00</td></tr>\n          <tr><td><code>-</code></td><td>Khoảng thời gian liên tục</td><td><code>0 9 * * 1-5</code>: lúc 9h00 từ Thứ 2 đến Thứ 6</td></tr>\n          <tr><td><code>@reboot</code></td><td>Chạy một lần khi máy tính khởi động xong</td><td><code>@reboot /opt/init.sh</code></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Khắc phục sự cố script đồng bộ dữ liệu chạy đè làm nghẽn I/O ổ đĩa lúc nửa đêm",
        "content": "\n              <p>Mỗi đêm lúc 01:00 AM, cron kích hoạt một script rsync đồng bộ 500GB dữ liệu sang server dự phòng. Bình thường script chạy mất 45 phút. Một đêm nọ, đường truyền cáp quang biển bị suy hao, tốc độ mạng giảm xuống 1/10. Script rsync của ngày hôm trước chạy tới 28 tiếng vẫn chưa xong.</p>\n              <p>Hậu quả: 01:00 AM đêm tiếp theo, cron tiếp tục khởi chạy thêm một tiến trình rsync thứ hai; rồi đêm tiếp theo lại thêm một tiến trình thứ ba! Ba tiến trình rsync cùng đọc một ổ cứng đồng thời khiến IOPS đạt trần 100%, làm sập luôn toàn bộ cơ sở dữ liệu trên server.</p>\n              <p><strong>Giải pháp tức thì:</strong> Bọc lệnh cron bằng <code>flock -n /var/lock/rsync_backup.lock</code>. Kể từ đó, nếu tác vụ hôm trước còn đang chạy, tác vụ mới sẽ nhẹ nhàng bỏ qua phiên chạy mà không bao giờ gây nghẽn đĩa!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Thảm họa Job Overlapping khi tác vụ cron chạy kéo dài quá chu kỳ",
            "content": "Nếu bạn đặt một cron job sao lưu database chạy mỗi 10 phút, nhưng một ngày nọ dữ liệu lớn khiến tác vụ chạy mất 25 phút: cron sẽ liên tục sinh ra các tiến trình sao lưu mới đè lên tiến trình cũ. Hàng chục tiến trình tranh chấp CPU và RAM sẽ kéo sập hoàn toàn máy chủ! <strong>Giải pháp bắt buộc:</strong> Bọc lệnh trong <code>flock -n /var/lock/backup.lock ...</code> để ngăn chặn chạy trùng lặp."
          },
          {
            "title": "Quên rằng môi trường của Cron không hề có các biến môi trường của bạn",
            "content": "Khi chạy trên terminal cá nhân, lệnh <code>python3</code> hay <code>aws</code> chạy tốt vì bạn đã nạp biến trong <code>~/.bashrc</code>. Nhưng Cron chạy dưới một subshell tối giản với biến <code>PATH=/usr/bin:/bin</code>. Gọi lệnh ngoài PATH mà không dùng đường dẫn tuyệt đối sẽ thất bại âm thầm. Luôn khai báo <code>PATH=...</code> ở đầu file crontab."
          }
        ],
        "tips": [
          {
            "title": "Kiểm tra tính hợp lệ của lịch định kỳ bằng systemd-analyze calendar",
            "content": "Để biết chắc chắn lịch thời gian của bạn có chạy đúng vào thời điểm mong đợi hay không, hãy dùng lệnh: <code>systemd-analyze calendar 'Mon,Fri *-*-* 03:00:00'</code>. Hệ thống sẽ in ra thời điểm kích hoạt tiếp theo và độ trễ chính xác tới từng giây."
          },
          {
            "title": "Thử nghiệm script trong môi trường sạch như Cron bằng env -i",
            "content": "Trước khi đưa script vào crontab, hãy chạy thử lệnh: <code>env -i /path/to/script.sh</code>. Lệnh này sẽ xóa sạch toàn bộ các biến môi trường đang có, giả lập chính xác 100% môi trường khắc nghiệt của Cron daemon."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Thiết lập lịch sao lưu crontab lúc 02:00 sáng hàng ngày",
          "problem": "Viết dòng cấu hình crontab hoàn chỉnh cho tác vụ sao lưu chạy vào lúc 02:00 sáng mỗi ngày, ghi đè biến PATH và chuyển hướng toàn bộ log.",
          "hint": "Khai báo biến PATH ở đầu crontab và cấu hình 5 trường thời gian 0 2 * * *.",
          "solutionCode": "# Khai báo trong crontab (crontab -e):\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n0 2 * * * /usr/bin/python3 /opt/scripts/backup.py >> /var/log/backup.log 2>&1",
          "solutionOutput": "# Đã cập nhật crontab thành công cho tác vụ 02:00 sáng",
          "explanation": "Crontab chạy trong môi trường non-interactive với biến PATH tối thiểu. Luôn khai báo biến PATH tường minh và dùng đường dẫn tuyệt đối cho binary.",
          "annotations": [
            {
              "part": "0 2 * * *",
              "text": "Phút 0, Giờ 2, mọi ngày trong tháng, mọi tháng, mọi ngày trong tuần."
            },
            {
              "part": ">> /var/log/backup.log 2>&1",
              "text": "Gom cả stdout và stderr vào file log để tiện chẩn đoán."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp crontab",
              "pass": "Đúng 5 trường thời gian",
              "excellent": "Thiết lập biến PATH tường minh ở đầu file crontab",
              "weight": "50%"
            },
            {
              "criterion": "Chuyển hướng log",
              "pass": "Ghi log ra file",
              "excellent": "Gom cả kênh stdout và stderr với 2>&1",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Chống chạy trùng lặp tác vụ cron bằng tiện ích flock",
          "problem": "Sử dụng lệnh flock để bảo vệ một script đồng bộ dữ liệu chạy mỗi 5 phút trong crontab, tránh trường hợp phiên trước chưa xong phiên sau đã kích hoạt.",
          "hint": "Dùng /usr/bin/flock kèm cờ -n (non-blocking) và đường dẫn file khóa /var/lock/.",
          "solutionCode": "*/5 * * * * /usr/bin/flock -n /var/lock/sync.lock /usr/bin/python3 /opt/sync/run.py >> /var/log/sync.log 2>&1",
          "solutionOutput": "# flock ngăn chặn phiên mới nếu sync.lock đang bị giữ",
          "explanation": "Cờ -n khiến flock thoát ngay với mã khác 0 nếu file khóa đang bị chiếm dụng bởi phiên chạy trước, giải quyết triệt để tình trạng nghẽn CPU và tranh chấp tài nguyên.",
          "annotations": [
            {
              "part": "flock -n",
              "text": "Cờ non-blocking: nếu bị khóa thì bỏ qua ngay, không xếp hàng chờ đợi."
            }
          ],
          "rubric": [
            {
              "criterion": "Sử dụng flock",
              "pass": "Dùng đúng flock với file lock",
              "excellent": "Đặt cờ -n ngăn chặn xếp hàng tài nguyên chồng chéo",
              "weight": "50%"
            },
            {
              "criterion": "Tích hợp crontab",
              "pass": "Đặt đúng vị trí trước câu lệnh",
              "excellent": "Đường dẫn tuyệt đối chuẩn xác cho môi trường tự động",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Xác thực biểu thức thời gian systemd-calendar",
          "problem": "Kiểm tra xem lịch chạy định kỳ mỗi 2 tiếng vào các ngày Thứ 2 và Thứ 6 có cú pháp chuẩn xác trong systemd calendar hay không.",
          "hint": "Sử dụng lệnh systemd-analyze calendar để phân tích và kiểm tra các mốc kích hoạt tiếp theo.",
          "solutionCode": "systemd-analyze calendar 'Mon,Fri *-*-* 00/2:00:00'",
          "solutionOutput": "Normalized form: Mon,Fri *-*-* 00,02,04,06,08,10,12,14,16,18,20,22:00:00\nNext elapse: Fri 2026-11-06 00:00:00 UTC",
          "explanation": "Lệnh systemd-analyze calendar giúp kỹ sư xác thực tính hợp lệ của biểu thức OnCalendar trước khi cấu hình vào file .timer, loại bỏ hoàn toàn phỏng đoán.",
          "annotations": [
            {
              "part": "systemd-analyze calendar",
              "text": "Tiện ích phân tích và mô phỏng lịch trình thời gian của systemd."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp OnCalendar",
              "pass": "Viết đúng định dạng thời gian",
              "excellent": "Sử dụng systemd-analyze calendar để kiểm tra mốc kích hoạt",
              "weight": "50%"
            },
            {
              "criterion": "Hiểu cơ chế timer",
              "pass": "Biết cách so sánh với cron",
              "excellent": "Nắm vững ưu điểm logging và phụ thuộc dịch vụ của timer",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Cú pháp Crontab gồm 5 trường thời gian: Phút (0-59), Giờ (0-23), Ngày trong tháng (1-31), Tháng (1-12), Ngày trong tuần (0-7).",
        "Cron environment cực kỳ hạn chế: không nạp file cấu hình shell cá nhân, do đó phải khai báo PATH tường minh và dùng đường dẫn tuyệt đối.",
        "Sử dụng công cụ flock với cờ -n để thiết lập khóa file độc quyền, giải quyết triệt để vấn đề chồng chéo tác vụ định kỳ.",
        "systemctl là công cụ kiểm soát vòng đời của systemd Unit (start, stop, restart, reload, status, enable, disable).",
        "journalctl cung cấp khả năng lọc và truy vấn nhật ký dịch vụ tập trung mạnh mẽ (cờ -u, -f, -n, -p, --since)."
      ],
      "generalInfo": {
        "duration": "45 phút",
        "targetAudience": "Sysadmin, DevOps, Kỹ sư Vận hành Máy chủ",
        "prerequisites": "Đã hoàn thành Bài 2.5 (Shell script), hiểu luồng I/O redirection và quản lý tiến trình",
        "environment": "Ubuntu 22.04 LTS / Debian 12 / Rocky Linux 9 (systemd init)",
        "materials": "Terminal bash, quyền sudo để quản lý dịch vụ systemd và cron"
      },
      "nextLessonPreview": "Trong Bài 2.7, chúng ta sẽ mở rộng năng lực quản trị sang không gian mạng: khảo sát giao diện mạng, cổng kết nối với ip/ss và làm chủ xác thực SSH nâng cao.",
      "quiz": [
        {
          "question": "Biểu thức crontab nào sau đây kích hoạt lệnh vào lúc 03:30 sáng vào các ngày Thứ 2 đến Thứ 6?",
          "options": [
            "30 3 * * 1-5",
            "3 30 * * 1-5",
            "30 3 1-5 * *",
            "* 3 30 * 1-5"
          ],
          "explanation": "Thứ tự 5 trường là: Phút (30), Giờ (3), Ngày trong tháng (*), Tháng (*), Ngày trong tuần (1-5 tương ứng Thứ 2 đến Thứ 6).",
          "correctIndex": 0
        },
        {
          "question": "Tại sao nên dùng 'flock -n /var/lock/backup.lock -c backup.sh' trong tác vụ cron định kỳ?",
          "options": [
            "Để script chạy nhanh gấp đôi",
            "Để ngăn chặn lần chạy mới nếu phiên chạy trước đó chưa hoàn thành, tránh chồng chéo tài nguyên",
            "Để tự động khởi động lại script nếu bị lỗi",
            "Để cấp quyền root cho script chạy mà không cần sudo"
          ],
          "explanation": "Cờ -n (non-blocking) giúp kiểm tra xem khóa có bị giữ bởi tiến trình trước không. Nếu có, nó sẽ lập tức dừng phiên mới thay vì xếp hàng chờ, bảo vệ hệ thống khỏi nghẽn.",
          "correctIndex": 1
        },
        {
          "question": "Lệnh nào sau đây dùng để xem chi tiết log của dịch vụ Nginx quản lý bởi systemd theo thời gian thực?",
          "options": [
            "cat /var/log/nginx.log",
            "journalctl -u nginx -f",
            "systemctl log nginx",
            "tail -f /systemd/nginx"
          ],
          "correctIndex": 1,
          "explanation": "Lệnh `journalctl -u nginx -f` lọc log của unit nginx (-u) và theo dõi luồng log thời gian thực (-f / follow) tương tự như tail -F."
        }
      ],
      "reflectionQuestion": "Một cron job chạy lệnh `0 * * * * python3 /opt/fetch.py` báo trong log rằng lệnh `python3: command not found` mặc dù kỹ sư chạy lệnh trực tiếp ngoài terminal vẫn bình thường. Hãy giải thích cơ chế môi trường của cron và đưa ra giải pháp sửa chữa triệt để.",
      "reflectionHint": "Gợi ý: Do cron không nạp `.bashrc` nên biến `PATH` mặc định không có thư mục chứa python3. Giải pháp: thêm `PATH=/usr/local/bin:/usr/bin:/bin` ở đầu crontab hoặc ghi rõ đường dẫn tuyệt đối như `/usr/bin/python3`."
    },
    {
      "id": "lx-2-07",
      "number": "2.7",
      "title": "Mạng cơ bản, Khảo sát cổng & SSH Chuyên sâu (ip, ss, ping, curl, ssh ed25519, ~/.ssh/config)",
      "subtitle": "Chẩn đoán kết nối mạng, kiểm tra socket lắng nghe và thiết lập chìa khóa SSH mã hóa chuẩn ed25519",
      "level": "Trung cấp",
      "duration": "50 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Liệt kê và giải thích các lệnh mạng hiện đại thay thế net-tools cũ: ip thay ifconfig, ss thay netstat",
        "2. [Hiểu - Understand] Hiểu nguyên lý mã hóa bất đối xứng của SSH và lợi thế vượt trội của thuật toán ed25519 so với rsa cũ",
        "3. [Vận dụng - Apply] Sử dụng ss để rà quét các cổng mạng đang lắng nghe (listening ports) và cấu hình tệp ~/.ssh/config",
        "4. [Phân tích - Analyze] Phân tích tình huống không kết nối được dịch vụ mạng (tắc nghẽn port, firewall, bind sai IP)"
      ],
      "intuition": {
        "title": "Địa chỉ nhà (IP) và Số phòng đón khách (Port)",
        "overview": "Mạng máy tính là cầu nối giữa server và thế giới. Khảo sát cổng, theo dõi kết nối và bảo mật truy cập từ xa qua SSH là kỹ năng sinh tồn của mọi kỹ sư vận hành.",
        "realWorld": "Một ứng dụng web Node.js khởi động thành công và log ghi 'Listening on 3000', nhưng client bên ngoài không thể truy cập. Bằng lệnh ss -tulpn, kỹ sư phát hiện app chỉ bind vào 127.0.0.1 (localhost) thay vì 0.0.0.0, giúp khắc phục sự cố trong 30 giây.",
        "metaphor": "Địa chỉ IP giống như số nhà của tòa nhà, còn Port (cổng) giống như số phòng của từng văn phòng bên trong. Lệnh ss là người bảo vệ có sổ kiểm tra xem phòng nào đang mở cửa đón khách.",
        "boundary": "Các lệnh ip, ss, ping, curl dùng để khảo sát kết nối và gỡ lỗi từ góc độ máy chủ nội bộ; để kiểm soát gói tin tường lửa ta phải dùng iptables, nftables hoặc ufw.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Mạng máy tính là cầu nối giữa server và thế giới. Khảo sát cổng, theo dõi kết nối và bảo mật truy cập từ xa qua SSH là kỹ năng sinh tồn của mọi kỹ sư vận hành.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>ip addr</code>:</strong> Hiển thị IP và interface mạng</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>ss</code>:</strong> Khảo sát socket và cổng lắng nghe</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>ssh-keygen</code>:</strong> Tạo cặp khóa SSH bất đối xứng</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một ứng dụng web Node.js khởi động thành công và log ghi 'Listening on 3000', nhưng client bên ngoài không thể truy cập. Bằng lệnh ss -tulpn, kỹ sư phát hiện app chỉ bind vào 127.0.0.1 (localhost) thay vì 0.0.0.0, giúp khắc phục sự cố trong 30 giây.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Khảo sát mạng hiện đại với ip và ss</li><li><span class=\"lx-vs-bullet\">•</span> Thiết lập khóa SSH ed25519 thế hệ mới và copy khóa an toàn</li><li><span class=\"lx-vs-bullet\">•</span> Làm chủ tệp cấu hình ~/.ssh/config</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Công cụ Mạng Hiện đại",
          "content": "<p>Bộ công cụ <code>iproute2</code> đã chính thức thay thế toàn bộ <code>net-tools</code> lỗi thời. Bảng sau tổng hợp các lệnh mạng và SSH chuẩn công nghiệp:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Lệnh / Cú pháp</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Ghi chú vận hành</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>ip addr</code></td>\n            <td>Hiển thị IP và interface mạng</td>\n            <td><code>ip [-c] addr show [dev &lt;iface&gt;]</code></td>\n            <td><code>ip -c a</code></td>\n            <td>Thay thế hoàn toàn <code>ifconfig</code> cũ; cờ <code>-c</code> tô màu</td>\n          </tr>\n          <tr>\n            <td><code>ss</code></td>\n            <td>Khảo sát socket và cổng lắng nghe</td>\n            <td><code>ss -tulpn</code></td>\n            <td><code>sudo ss -tulpn | grep :80</code></td>\n            <td>Nhanh hơn <code>netstat</code> gấp nhiều lần khi có hàng chục ngàn kết nối</td>\n          </tr>\n          <tr>\n            <td><code>ssh-keygen</code></td>\n            <td>Tạo cặp khóa SSH bất đối xứng</td>\n            <td><code>ssh-keygen -t &lt;type&gt; -C &lt;comment&gt;</code></td>\n            <td><code>ssh-keygen -t ed25519 -C \"admin@prod\"</code></td>\n            <td>Khuyến nghị dùng <code>ed25519</code> thay thế cho RSA</td>\n          </tr>\n          <tr>\n            <td><code>ssh-copy-id</code></td>\n            <td>Cài đặt public key lên máy chủ từ xa</td>\n            <td><code>ssh-copy-id -i &lt;key.pub&gt; user@host</code></td>\n            <td><code>ssh-copy-id -i ~/.ssh/id_ed25519.pub dev@192.168.1.50</code></td>\n            <td>Tự động phân quyền chuẩn <code>700</code> cho <code>~/.ssh</code> và <code>600</code> cho authorized_keys</td>\n          </tr>\n          <tr>\n            <td><code>curl</code></td>\n            <td>Truy vấn HTTP/HTTPS qua dòng lệnh</td>\n            <td><code>curl -I -s -L &lt;URL&gt;</code></td>\n            <td><code>curl -svo /dev/null https://api.site.com</code></td>\n            <td>Cờ <code>-I</code> lấy header, <code>-v</code> hiển thị quá trình bắt tay TLS</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-2-7-ip-ss",
          "title": "4.1 Khảo sát mạng hiện đại với ip và ss",
          "content": "\n                  <p>Các lệnh cũ như <code>ifconfig</code>, <code>netstat</code>, <code>route</code> thuộc gói <code>net-tools</code> đã lỗi thời và không còn được cài mặc định. Chuẩn mực hiện đại trên Linux là bộ công cụ <code>iproute2</code>:</p>\n                  <ul>\n                    <li><code>ip addr show</code> (hoặc <code>ip a</code>): Xem địa chỉ IP và card mạng (Interface).</li>\n                    <li><code>ip route show</code> (hoặc <code>ip r</code>): Xem bảng định tuyến và Gateway mặc định.</li>\n                    <li><code>ss -tulpn</code>: Khảo sát các cổng mạng đang LẮNG NGHE (Listening Ports):\n                      <ul>\n                        <li><code>-t</code>: Giao thức TCP.</li>\n                        <li><code>-u</code>: Giao thức UDP.</li>\n                        <li><code>-l</code>: Chỉ hiển thị các socket đang lắng nghe (Listening).</li>\n                        <li><code>-p</code>: Hiển thị tên tiến trình (Process) và PID đang giữ port.</li>\n                        <li><code>-n</code>: Hiển thị cổng dạng số (Numeric) thay vì dịch sang tên dịch vụ (ví dụ: hiển thị 80 thay vì http).</li>\n                      </ul>\n                    </li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra IP máy chủ và các cổng dịch vụ đang mở",
              "code": "# Xem IP v4 của các card mạng đang hoạt động\nip -4 addr show\n\n# Kiểm tra cổng nào đang mở trên server và do dịch vụ nào quản lý (cần sudo để xem tên tiến trình)\nsudo ss -tulpn | grep -E ':(80|443|22|5432)'",
              "annotations": [
                {
                  "line": 2,
                  "part": "ip -4 addr show",
                  "text": "Chỉ lọc địa chỉ IPv4, bỏ qua IPv6 để màn hình gọn gàng dễ đọc."
                },
                {
                  "line": 5,
                  "part": "ss -tulpn",
                  "text": "Bộ cờ tiêu chuẩn vàng khảo sát socket: TCP, UDP, Listening, Process, Numeric."
                },
                {
                  "line": 5,
                  "part": "grep -E",
                  "text": "Lọc nhanh các cổng phổ biến: HTTP (80), HTTPS (443), SSH (22), Postgres (5432)."
                }
              ],
              "output": "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500\n    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0\ntcp   LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:((\"sshd\",pid=850,fd=3))\ntcp   LISTEN 0      511          0.0.0.0:80        0.0.0.0:*    users:((\"nginx\",pid=1120,fd=6))"
            }
          ]
        },
        {
          "id": "sec-2-7-ssh-ed25519",
          "title": "4.2 Thiết lập khóa SSH ed25519 thế hệ mới và copy khóa an toàn",
          "content": "\n                  <p>Mô hình khóa bất đối xứng SSH bao gồm 2 chìa:</p>\n                  <ul>\n                    <li><strong>Khóa riêng (Private Key - <code>id_ed25519</code>):</strong> Nằm bí mật trên máy cá nhân của bạn, tuyệt đối KHÔNG BAO GIỜ chia sẻ cho ai.</li>\n                    <li><strong>Khóa công khai (Public Key - <code>id_ed25519.pub</code>):</strong> Đưa lên máy chủ từ xa, lưu vào file <code>~/.ssh/authorized_keys</code>.</li>\n                  </ul>\n                  <p><strong>Quy trình thiết lập chuẩn 3 bước:</strong></p>\n                  <ol>\n                    <li>Tạo cặp khóa mới: <code>ssh-keygen -t ed25519 -C \"email@example.com\"</code></li>\n                    <li>Copy khóa công khai lên server từ xa: <code>ssh-copy-id -i ~/.ssh/id_ed25519.pub username@server_ip</code></li>\n                    <li>Đăng nhập kiểm tra không cần gõ mật khẩu: <code>ssh username@server_ip</code></li>\n                  </ol>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Tạo khóa ed25519 và copy lên máy chủ từ xa",
              "code": "# Bước 1: Tạo khóa ed25519 trên máy tính của bạn\nssh-keygen -t ed25519 -C \"admin@mycompany.com\" -f ~/.ssh/id_ed25519_prod\n\n# Bước 2: Tự động copy public key vào ~/.ssh/authorized_keys trên máy chủ\nssh-copy-id -i ~/.ssh/id_ed25519_prod.pub ubuntu@203.0.113.50\n\n# Bước 3: Đăng nhập an toàn bằng khóa riêng\nssh -i ~/.ssh/id_ed25519_prod ubuntu@203.0.113.50",
              "annotations": [
                {
                  "line": 2,
                  "part": "-t ed25519",
                  "text": "Chỉ định thuật toán elliptic curve ed25519 hiện đại nhất."
                },
                {
                  "line": 5,
                  "part": "ssh-copy-id",
                  "text": "Tự động tạo thư mục ~/.ssh và phân quyền chuẩn 700 cho thư mục, 600 cho file authorized_keys trên server."
                },
                {
                  "line": 8,
                  "part": "-i",
                  "text": "Chỉ định file khóa riêng dùng để xác thực phiên SSH."
                }
              ],
              "output": "Generating public/private ed25519 key pair.\nYour identification has been saved in /home/user/.ssh/id_ed25519_prod\nNumber of key(s) added: 1\nWelcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-generic x86_64)"
            }
          ]
        },
        {
          "id": "sec-2-7-ssh-config",
          "title": "4.3 Làm chủ tệp cấu hình ~/.ssh/config",
          "content": "\n                  <p>Thay vì mỗi lần kết nối bạn phải gõ dòng lệnh dài dòng khó nhớ: <code>ssh -i ~/.ssh/prod_key.pem -p 2222 deployer@203.0.113.85</code>, bạn có thể định nghĩa tệp <code>~/.ssh/config</code> trên máy cá nhân.</p>\n                  <p>Sau khi cấu hình, bạn chỉ cần gõ duy nhất: <code>ssh prod</code>!</p>\n                  <p>Các chỉ thị quan trọng trong <code>~/.ssh/config</code>:</p>\n                  <ul>\n                    <li><code>Host [alias]</code>: Tên gợi nhớ ngắn gọn để gõ lệnh.</li>\n                    <li><code>HostName [IP hoặc Domain]</code>: Địa chỉ máy chủ thực tế.</li>\n                    <li><code>User [username]</code>: Tên tài khoản đăng nhập.</li>\n                    <li><code>Port [cổng]</code>: Cổng SSH (nếu server đổi cổng khác 22).</li>\n                    <li><code>IdentityFile [đường_dẫn_key]</code>: Khóa riêng dùng riêng cho server đó.</li>\n                    <li><code>ServerAliveInterval 60</code>: Gửi tín hiệu giữ kết nối mỗi 60 giây, chống bị ngắt kết nối khi nhàn rỗi.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Text",
              "title": "Mẫu tệp cấu hình ~/.ssh/config chuẩn quản trị đa cụm máy chủ",
              "code": "# Cấu hình mặc định cho tất cả các máy chủ\nHost *\n    ServerAliveInterval 60\n    ServerAliveCountMax 3\n    AddKeysToAgent yes\n\n# Máy chủ phát triển (Dev Server)\nHost dev\n    HostName dev.example.com\n    User ubuntu\n    IdentityFile ~/.ssh/id_ed25519_dev\n\n# Máy chủ Production (Đổi cổng 2222 để tránh scan)\nHost prod\n    HostName 203.0.113.50\n    User deployer\n    Port 2222\n    IdentityFile ~/.ssh/id_ed25519_prod",
              "annotations": [
                {
                  "line": 2,
                  "part": "Host *",
                  "text": "Quy tắc chung áp dụng cho mọi kết nối SSH."
                },
                {
                  "line": 3,
                  "part": "ServerAliveInterval 60",
                  "text": "Giữ kết nối SSH luôn sống động, không bị nhà mạng hay router tự ngắt khi để máy nhàn rỗi."
                },
                {
                  "line": 13,
                  "part": "Host prod",
                  "text": "Định nghĩa alias 'prod'. Chỉ cần gõ 'ssh prod' là tự động nối vào deployer@203.0.113.50:2222."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Khảo sát dịch vụ mạng và cấu hình Alias SSH tiện lợi</h4>\n      <p>Giảng viên kiểm tra cổng mở và thiết lập kết nối nhanh với <code>~/.ssh/config</code>:</p>\n      <pre><code># 1. Quét cổng TCP đang lắng nghe kèm PID tiến trình\nsudo ss -tulpn | grep LISTEN\n\n# 2. Tạo khóa ed25519 thế hệ mới bảo mật cao\nssh-keygen -t ed25519 -C \"ops@server\" -f ~/.ssh/id_ed25519\n\n# 3. Định nghĩa cấu hình trong ~/.ssh/config để gõ 'ssh prod' là kết nối ngay\ncat &lt;&lt; 'EOF' >> ~/.ssh/config\nHost prod\n    HostName 198.51.100.25\n    User ubuntu\n    Port 2222\n    IdentityFile ~/.ssh/id_ed25519\n    ServerAliveInterval 60\nEOF\nchmod 600 ~/.ssh/config</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Dùng công cụ lỗi thời & gõ lệnh thủ công</div>\n          <pre><code># Lỗi thời từ hơn 10 năm trước:\nnetstat -ant | grep LISTEN\nifconfig eth0\n\n# Đăng nhập thủ công dài dòng mỗi lần kết nối:\nssh -i /path/to/my_key.pem -p 2222 root@198.51.100.25</code></pre>\n          <p class=\"lx-diff-desc\"><code>netstat</code> và <code>ifconfig</code> đã bị gỡ bỏ trên hầu hết distro hiện đại. Không dùng SSH config khiến thao tác chậm và dễ lộ IP/Port trên lịch sử bash.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Dùng công cụ hiện đại & SSH config</div>\n          <pre><code># Chuẩn hiện đại:\nss -tulpn\nip -c a\n\n# Chỉ cần gõ ngắn gọn:\nssh prod</code></pre>\n          <p class=\"lx-diff-desc\">Dùng <code>ss</code> và <code>ip</code> chuẩn POSIX hiện đại, quản lý host tập trung qua <code>~/.ssh/config</code> chuyên nghiệp và an toàn.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Rà soát Cổng Mạng, Giả lập Web Server & Cấu hình Khóa SSH",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.7</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Tạo một web server mini bằng Python, sử dụng lệnh <code>ss</code> để điều tra cổng lắng nghe, kiểm tra truy vấn HTTP bằng <code>curl</code>, và tạo cặp khóa <code>ed25519</code> chuẩn.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Hệ điều hành Linux hoặc WSL 2 có cài sẵn Python 3.</li>\n        <li>Tạo thư mục: <code>mkdir -p ~/net-lab && cd ~/net-lab</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Khởi động web server mini trên cổng 8080 ở chế độ nền:\n          <pre><code>python3 -m http.server 8080 --bind 127.0.0.1 > ~/net-lab/server.log 2>&1 &\nSERVER_PID=$!\necho \"Server đang chạy với PID: $SERVER_PID\"</code></pre>\n        </li>\n        <li>Khảo sát cổng lắng nghe với <code>ss</code>:\n          <pre><code>ss -tulpn | grep 8080</code></pre>\n          Quan sát cột <em>Local Address:Port</em> xem có đúng là <code>127.0.0.1:8080</code> không.\n        </li>\n        <li>Gửi yêu cầu HTTP kiểm tra bằng <code>curl</code>:\n          <pre><code>curl -I http://127.0.0.1:8080</code></pre>\n        </li>\n        <li>Tạo cặp khóa SSH ed25519 không mật khẩu phục vụ tự động hóa:\n          <pre><code>ssh-keygen -t ed25519 -N \"\" -f ~/net-lab/test_key -C \"lab-test\"\nls -la ~/net-lab/test_key*</code></pre>\n        </li>\n        <li>Dọn dẹp tiến trình server sau khi hoàn thành:\n          <pre><code>kill $SERVER_PID</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Lệnh <code>ss</code> hiển thị trạng thái <code>LISTEN</code> trên <code>127.0.0.1:8080</code> kèm tên tiến trình python3; lệnh <code>curl -I</code> trả về <code>HTTP/1.0 200 OK</code>.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Thử khởi động server gắn vào <code>0.0.0.0:8080</code> và giải thích sự khác biệt về phạm vi lắng nghe so với <code>127.0.0.1</code>.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không bao giờ chia sẻ tệp private key (ví dụ <code>id_ed25519</code> không có đuôi <code>.pub</code>) lên GitHub hoặc gửi qua chat. Chỉ chia sẻ tệp public key (<code>.pub</code>)!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>SSH báo <code>WARNING: UNPROTECTED PRIVATE KEY FILE! Permissions 0644 for id_ed25519 are too open</code></strong></td><td>SSH Client từ chối sử dụng private key nếu tệp này có quyền quá rộng (nhóm khác có thể đọc).</td><td>Cấp lại quyền chuẩn chỉ định cho chủ sở hữu: <code>chmod 600 ~/.ssh/id_ed25519</code> và <code>chmod 700 ~/.ssh</code>.</td></tr>\n          <tr><td><strong>Cổng dịch vụ đã LISTEN nhưng máy khách bên ngoài không ping/curl tới được</strong></td><td>(1) Ứng dụng chỉ lắng nghe trên <code>127.0.0.1</code> (localhost) thay vì <code>0.0.0.0</code>; hoặc (2) Tường lửa (UFW / iptables / AWS Security Group) đang chặn cổng đó.</td><td>Kiểm tra lại cột địa chỉ lắng nghe bằng <code>ss -tulpn</code> và mở port trên tường lửa: <code>sudo ufw allow &lt;port&gt;</code>.</td></tr>\n          <tr><td><strong>SSH báo <code>Host key verification failed</code></strong></td><td>Máy chủ từ xa đã được cài lại hệ điều hành hoặc đổi IP, khiến khóa host trong <code>~/.ssh/known_hosts</code> không còn khớp với bản lưu cũ.</td><td>Xóa bản ghi cũ an toàn bằng lệnh: <code>ssh-keygen -R &lt;tên_host_hoặc_IP&gt;</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Vô hiệu hóa đăng nhập SSH bằng mật khẩu trên Production:</strong> Luôn đặt <code>PasswordAuthentication no</code> và <code>PermitRootLogin no</code> trong <code>/etc/ssh/sshd_config</code> để chặn triệt để tấn công dò quét brute-force.</li>\n        <li><strong>Sử dụng thuật toán Ed25519 làm tiêu chuẩn:</strong> Ed25519 cho tốc độ tạo khóa và bắt tay cực nhanh, độ dài khóa ngắn (256-bit) nhưng mức độ kháng bẻ khóa tương đương RSA 3072-bit và không bị ảnh hưởng bởi lỗ hổng ngẫu nhiên như ECDSA.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Linux iproute2 Documentation:</strong> <a href=\"https://wiki.linuxfoundation.org/networking/iproute2\" target=\"_blank\" rel=\"noopener\">Linux Foundation iproute2 Wiki</a>.</li>\n      <li><strong>OpenSSH Manual:</strong> <a href=\"https://www.openssh.com/manual.html\" target=\"_blank\" rel=\"noopener\">OpenSSH Official Manuals & ssh_config Reference</a>.</li>\n      <li><strong>RFC 8709:</strong> Ed25519 and Ed448 Public Key Algorithms for the Secure Shell (SSH) Protocol.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Đối chiếu Lệnh Cũ (net-tools) vs Mới (iproute2)",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tính năng</th><th>Lệnh Cũ (Bị loại bỏ)</th><th>Lệnh Mới (Chuẩn Quốc tế)</th></tr></thead>\n        <tbody>\n          <tr><td>Xem địa chỉ IP</td><td><code>ifconfig</code></td><td><code>ip addr</code> (hoặc <code>ip a</code>)</td></tr>\n          <tr><td>Bật/tắt card mạng</td><td><code>ifconfig eth0 up/down</code></td><td><code>ip link set eth0 up/down</code></td></tr>\n          <tr><td>Xem bảng định tuyến</td><td><code>route -n</code> hoặc <code>netstat -r</code></td><td><code>ip route</code> (hoặc <code>ip r</code>)</td></tr>\n          <tr><td>Xem cổng lắng nghe</td><td><code>netstat -tulpn</code></td><td><code>ss -tulpn</code></td></tr>\n          <tr><td>Xem bảng ARP</td><td><code>arp -n</code></td><td><code>ip neigh</code></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Truy cập an toàn vào cụm máy chủ Private Database thông qua Bastion Jump Host",
        "content": "\n              <p>Trong kiến trúc bảo mật đám mây (AWS/GCP/Private Cloud), máy chủ chứa Database (IP nội bộ <code>10.0.1.50</code>) không có IP công khai ra internet. Mọi truy cập quản trị bắt buộc phải nhảy qua một máy chủ pháo đài trung gian gọi là Bastion Host (IP công khai <code>203.0.113.10</code>).</p>\n              <p>Thay vì phải SSH 2 lần thủ công, bạn sử dụng chỉ thị <code>ProxyJump</code> trong file <code>~/.ssh/config</code>:</p>\n              <pre><code>Host bastion\n    HostName 203.0.113.10\n    User jump_user\n    IdentityFile ~/.ssh/id_ed25519_bastion\n\nHost db-prod\n    HostName 10.0.1.50\n    User dbadmin\n    IdentityFile ~/.ssh/id_ed25519_db\n    ProxyJump bastion</code></pre>\n              <p>Bây giờ chỉ cần gõ: <code>ssh db-prod</code>, máy tính của bạn sẽ tự động thiết lập đường hầm SSH xuyên qua Bastion Host để vào thẳng Database trong tích tắc, vừa an toàn tuyệt đối vừa cực kỳ tiện lợi!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Phân quyền thư mục ~/.ssh và file authorized_keys quá lỏng lẻo",
            "content": "SSH daemon có cơ chế phòng thủ <code>StrictModes</code>: nếu thư mục <code>~/.ssh</code> có quyền ghi cho người ngoài (như 777 hay 755), hoặc file <code>authorized_keys</code> có quyền ghi cho group/others (như 664 hay 666), SSH daemon sẽ TỰ ĐỘNG TỪ CHỐI đăng nhập bằng khóa công khai vì nghi ngờ tài khoản bị can thiệp! Chuẩn bắt buộc: <code>chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys</code>."
          },
          {
            "title": "Xóa bừa dòng trong known_hosts khi nhận cảnh báo Host Key Changed",
            "content": "Khi thấy thông báo đỏ <code>WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED</code>, đừng vội vàng xóa dòng cảnh báo! Nếu bạn không hề cài lại máy chủ mà khóa máy chủ đột ngột thay đổi, có thể bạn đang bị tin tặc tấn công nghe lén Man-In-The-Middle (MITM). Hãy xác minh với kỹ sư hạ tầng trước khi dùng <code>ssh-keygen -R &lt;ip&gt;</code>."
          }
        ],
        "tips": [
          {
            "title": "Cấu hình ~/.ssh/config để đăng nhập máy chủ trong 1 giây",
            "content": "Thay vì phải gõ <code>ssh -i ~/.ssh/my_key.pem -p 2222 ubuntu@198.51.100.44</code>, hãy khai báo trong <code>~/.ssh/config</code>: <code>Host prod\\n  HostName 198.51.100.44\\n  User ubuntu\\n  Port 2222\\n  IdentityFile ~/.ssh/my_key.pem</code>. Sau đó bạn chỉ cần gõ: <code>ssh prod</code>!"
          },
          {
            "title": "Bật chế độ Verbose để gỡ lỗi đăng nhập SSH",
            "content": "Khi SSH bị treo hoặc từ chối kết nối không rõ lý do, hãy thêm cờ <code>-v</code> hoặc <code>-vvv</code> (ví dụ: <code>ssh -vvv user@host</code>). SSH client sẽ in chi tiết từng bước trao đổi thuật toán mật mã và đường dẫn file key đang thử nghiệm."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Khảo sát các cổng mạng đang lắng nghe bằng ss",
          "problem": "Viết câu lệnh kiểm tra xem trên máy chủ hiện tại, những tiến trình nào đang lắng nghe cổng mạng TCP và UDP, hiển thị chi tiết số cổng và PID.",
          "hint": "Sử dụng lệnh ss với tổ hợp các cờ -tulpn.",
          "solutionCode": "sudo ss -tulpn",
          "solutionOutput": "Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process\ntcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*     users:((\"sshd\",pid=890,fd=3))\ntcp   LISTEN 0      511          0.0.0.0:80         0.0.0.0:*     users:((\"nginx\",pid=1230,fd=6))",
          "explanation": "Tổ hợp cờ -tulpn gồm: -t (TCP), -u (UDP), -l (Listening), -p (Process/PID), -n (Numeric port). Thay thế hoàn hảo cho lệnh netstat đã lỗi thời.",
          "annotations": [
            {
              "part": "ss -tulpn",
              "text": "Lệnh tra cứu socket hiện đại truy xuất trực tiếp từ kernel socket buffer."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp ss",
              "pass": "Dùng đúng lệnh ss",
              "excellent": "Kết hợp đủ tổ hợp cờ -tulpn hiển thị cả PID và số cổng",
              "weight": "50%"
            },
            {
              "criterion": "Đọc hiểu đầu ra",
              "pass": "Nhận diện được cổng đang mở",
              "excellent": "Phân biệt được socket TCP và UDP",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Tạo cặp khóa SSH Ed25519 hiện đại và gán quyền thư mục",
          "problem": "Tạo một cặp khóa SSH mới sử dụng thuật toán hiện đại Ed25519 với bình luận email devops@company.com và thiết lập quyền hạn an toàn cho ~/.ssh.",
          "hint": "Dùng ssh-keygen -t ed25519 -C \"...\" và gán chmod 700 ~/.ssh, chmod 600 ~/.ssh/authorized_keys.",
          "solutionCode": "ssh-keygen -t ed25519 -C \"devops@company.com\" -f ~/.ssh/id_ed25519\nchmod 700 ~/.ssh\nchmod 600 ~/.ssh/authorized_keys 2>/dev/null || true",
          "solutionOutput": "Your identification has been saved in /home/user/.ssh/id_ed25519\nYour public key has been saved in /home/user/.ssh/id_ed25519.pub",
          "explanation": "Thuật toán Ed25519 cung cấp độ an toàn cao hơn RSA với kích thước khóa nhỏ gọn hơn và tốc độ xác thực nhanh vượt trội.",
          "annotations": [
            {
              "part": "-t ed25519",
              "text": "Chuẩn mã hóa đường cong elliptic khuyến nghị hàng đầu hiện nay."
            }
          ],
          "rubric": [
            {
              "criterion": "Sinh khóa SSH",
              "pass": "Dùng ssh-keygen -t ed25519",
              "excellent": "Gắn comment nhận diện và thiết lập đúng quyền thư mục ~/.ssh",
              "weight": "50%"
            },
            {
              "criterion": "Bảo mật khóa",
              "pass": "Phân biệt private và public key",
              "excellent": "Hiểu lý do SSH từ chối xác thực nếu quyền thư mục quá mở",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Xử lý lỗi xung đột Host Key SSH khi cài đặt lại máy chủ",
          "problem": "Máy chủ tại địa chỉ 192.168.1.100 vừa được cài đặt lại hệ điều hành khiến SSH cảnh báo lỗi REMOTE HOST IDENTIFICATION HAS CHANGED. Viết lệnh xử lý triệt để.",
          "hint": "Dùng lệnh ssh-keygen -R 192.168.1.100 để xóa bỏ fingerprint cũ khỏi ~/.ssh/known_hosts.",
          "solutionCode": "ssh-keygen -R 192.168.1.100\n# Sau đó kết nối lại bình thường:\nssh user@192.168.1.100",
          "solutionOutput": "# Host 192.168.1.100 found: line 12\n/home/user/.ssh/known_hosts updated.\nOriginal contents retained as /home/user/.ssh/known_hosts.old",
          "explanation": "Lệnh ssh-keygen -R tự động tìm và xóa đúng dòng chứa fingerprint cũ trong known_hosts, đồng thời tạo file backup .old mà không làm hỏng các host khác.",
          "annotations": [
            {
              "part": "ssh-keygen -R",
              "text": "Cờ Reset fingerprint an toàn, không cần mở file xóa thủ công bằng tay."
            }
          ],
          "rubric": [
            {
              "criterion": "Xử lý known_hosts",
              "pass": "Dùng đúng ssh-keygen -R",
              "excellent": "Giải thích được lý do SSH cảnh báo chống tấn công Man-in-the-Middle",
              "weight": "50%"
            },
            {
              "criterion": "Khôi phục kết nối",
              "pass": "Kết nối lại thành công",
              "excellent": "Kiểm tra fingerprint mới trước khi xác nhận yes",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "iproute2 (ip, ss) đã thay thế hoàn toàn bộ công cụ net-tools (ifconfig, netstat, arp) lỗi thời trên Linux hiện đại.",
        "ss -tulpn là lệnh khảo sát cổng kết nối TCP/UDP đang lắng nghe với hiệu năng vượt trội và hiển thị chi tiết tên tiến trình.",
        "Thuật toán Ed25519 (ssh-keygen -t ed25519) là chuẩn vàng cho SSH hiện nay nhờ tính an toàn cao và độ dài khóa gọn gàng.",
        "ssh-copy-id hỗ trợ thiết lập public key lên máy chủ từ xa an toàn, tự động cấu hình quyền thư mục 700 và file 600.",
        "Tệp ~/.ssh/config giúp rút ngắn cú pháp kết nối, quản lý tập trung nhiều máy chủ với các cổng, user và private key khác nhau."
      ],
      "generalInfo": {
        "duration": "50 phút",
        "targetAudience": "Sysadmin, Network Engineer, Backend/DevOps Developer",
        "prerequisites": "Hiểu mô hình mạng TCP/IP cơ bản, cổng dịch vụ (port) và thao tác dòng lệnh Linux",
        "environment": "Máy chủ Linux có kết nối mạng, cài đặt gói iproute2, openssh-client, curl",
        "materials": "Terminal Linux kết nối được internet hoặc máy ảo thứ 2 để thực hành SSH"
      },
      "nextLessonPreview": "Trong Bài 2.8, chúng ta sẽ đi sâu vào cấu trúc lưu trữ: giám sát phân vùng ổ đĩa, xử lý cạn kiệt dung lượng và cơn ác mộng cạn kiệt Inode.",
      "quiz": [
        {
          "question": "Tùy chọn nào của lệnh ss dùng để hiển thị danh sách tất cả các cổng TCP và UDP đang ở trạng thái LISTEN kèm thông tin tiến trình sở hữu?",
          "options": [
            "-tulpn",
            "-xzvf",
            "-rf",
            "-aux"
          ],
          "explanation": "-t (TCP), -u (UDP), -l (Listening), -p (Process/PID), -n (Numeric ports không phân giải DNS).",
          "correctIndex": 0
        },
        {
          "question": "Tại sao private key SSH (ví dụ ~/.ssh/id_ed25519) bắt buộc phải có quyền 600 (rw-------)?",
          "options": [
            "Để tăng tốc độ đọc của hệ điều hành",
            "Để ngăn chặn người dùng khác trên cùng máy tính có thể đọc trộm khóa bí mật của bạn; nếu quyền mở hơn SSH Client sẽ từ chối kết nối",
            "Để SSH Server nhận biết được khóa",
            "Để cho phép nhóm quản trị viên cùng sử dụng chung khóa"
          ],
          "explanation": "SSH Client kiểm tra nghiêm ngặt quyền tệp tin; nếu quyền bị hở (như 644 hoặc 777), client sẽ từ chối tải khóa để bảo vệ tài khoản khỏi rủi ro rò rỉ bảo mật.",
          "correctIndex": 1
        },
        {
          "question": "Trong tệp cấu hình SSH Client `~/.ssh/config`, khối nào sau đây cho phép rút gọn lệnh `ssh user@192.168.1.50 -p 2222 -i ~/.ssh/my_key` thành `ssh prod`?",
          "options": [
            "Host prod\\n  HostName 192.168.1.50\\n  User user\\n  Port 2222\\n  IdentityFile ~/.ssh/my_key",
            "Alias prod = 192.168.1.50:2222",
            "Server prod\\n  IP 192.168.1.50",
            "Route prod { 192.168.1.50:2222 }"
          ],
          "correctIndex": 0,
          "explanation": "Cấu hình `~/.ssh/config` với khối `Host prod` cho phép định nghĩa sẵn HostName, User, Port và IdentityFile, giúp thao tác kết nối cực kỳ thuận tiện và chuyên nghiệp."
        }
      ],
      "reflectionQuestion": "Một kỹ sư cấu hình ứng dụng web chạy trên máy chủ đám mây, terminal hiển thị ứng dụng đã khởi động tại cổng 8080. Kỹ sư chạy `curl http://localhost:8080` trên máy chủ thì nhận được dữ liệu, nhưng người dùng từ Internet truy cập `http://<IP_Server>:8080` thì bị 'Connection refused' hoặc 'Timeout'. Hãy liệt kê quy trình từng bước dùng lệnh Linux để xác định nguyên nhân.",
      "reflectionHint": "Gợi ý: Bước 1: Chạy `ss -tulpn | grep 8080` xem ứng dụng bind vào `127.0.0.1` hay `0.0.0.0`. Nếu là 127.0.0.1 thì client ngoài không thể vào. Bước 2: Nếu đã bind `0.0.0.0`, kiểm tra tường lửa `sudo ufw status` hoặc iptables xem cổng 8080 có bị DROP/REJECT không. Bước 3: Kiểm tra Security Group phía nhà cung cấp đám mây."
    },
    {
      "id": "lx-2-08",
      "number": "2.8",
      "title": "Quản lý đĩa, Dung lượng & Hệ thống file cơ bản (df, du, mount, lsblk, xử lý cạn Inode)",
      "subtitle": "Chẩn đoán ổ đĩa đầy, giải quyết sự cố hiểm hóc đĩa báo đầy 100% nhưng df còn trống dung lượng",
      "level": "Trung cấp",
      "duration": "50 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Phân biệt rõ sự khác nhau giữa dung lượng lưu trữ (Blocks) và siêu dữ liệu tệp tin (Inodes)",
        "2. [Hiểu - Understand] Hiểu nguyên lý file bị xóa nhưng tiến trình vẫn giữ mở (open file descriptors) khiến đĩa không giải phóng dung lượng",
        "3. [Vận dụng - Apply] Sử dụng df -h, du -sh, lsblk để định vị file chiếm dung lượng lớn và giải phóng đĩa an toàn",
        "4. [Phân tích - Analyze] Phân tích và xử lý triệt để hai sự cố kinh điển: 'No space left on device do cạn Inode' và 'Xóa file dung lượng lớn nhưng df vẫn báo 100% full'"
      ],
      "intuition": {
        "title": "Diện tích kho hàng (Blocks) và Thẻ kho ghi mục (Inodes)",
        "overview": "Ổ cứng đầy là nguyên nhân hàng đầu khiến cơ sở dữ liệu ngưng hoạt động, hệ điều hành treo và website sập. Làm chủ df, du và Inode giúp bạn cứu vãn thảm họa chỉ trong vài phút.",
        "realWorld": "Hệ thống ghi nhận đĩa còn trống 80 GB nhưng ứng dụng bất ngờ dừng hoạt động và báo lỗi 'No space left on device'. Nhờ kiểm tra df -i, kỹ sư phát hiện Inode đã đạt 100% do hàng triệu tệp cache session kích thước 0 byte sinh ra bởi mã lỗi PHP.",
        "metaphor": "Dung lượng đĩa (Blocks) giống như diện tích kho chứa hàng, còn Inode giống như số thẻ kho để đánh số từng món đồ. Nếu hết thẻ kho, dù kho còn rộng mênh mông bạn cũng không thể nhập thêm bất kỳ món hàng nào.",
        "boundary": "Các lệnh df, du dùng để giám sát và dọn dẹp dung lượng; để phân vùng ổ đĩa và định dạng hệ thống file mới ta sẽ học sâu hơn với fdisk, mkfs và LVM ở Cấp độ 3.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Ổ cứng đầy là nguyên nhân hàng đầu khiến cơ sở dữ liệu ngưng hoạt động, hệ điều hành treo và website sập. Làm chủ df, du và Inode giúp bạn cứu vãn thảm họa chỉ trong vài phút.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>lsblk</code>:</strong> Xem cấu trúc cây phân vùng đĩa vật lý</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>df</code>:</strong> Báo cáo dung lượng phân vùng (Blocks & Inodes)</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>du</code>:</strong> Đo lường dung lượng thực tế của từng thư mục</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Hệ thống ghi nhận đĩa còn trống 80 GB nhưng ứng dụng bất ngờ dừng hoạt động và báo lỗi 'No space left on device'. Nhờ kiểm tra df -i, kỹ sư phát hiện Inode đã đạt 100% do hàng triệu tệp cache session kích thước 0 byte sinh ra bởi mã lỗi PHP.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Khảo sát phân vùng và dung lượng ổ cứng với lsblk, df và du</li><li><span class=\"lx-vs-bullet\">•</span> Cơn ác mộng cạn kiệt Inode và cách điều tra</li><li><span class=\"lx-vs-bullet\">•</span> Xử lý sự cố 'Đã xóa file nhưng ổ đĩa không giải phóng dung lượng'</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Quản trị Dung lượng Đĩa",
          "content": "<p>Quản lý dung lượng đĩa hiệu quả đòi hỏi sự kết hợp nhịp nhàng giữa khảo sát phân vùng vật lý, mức tiêu thụ thư mục và tình trạng Inode:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Lệnh / Cú pháp</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Ghi chú vận hành</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>lsblk</code></td>\n            <td>Xem cấu trúc cây phân vùng đĩa vật lý</td>\n            <td><code>lsblk [-f]</code></td>\n            <td><code>lsblk -f</code></td>\n            <td>Cờ <code>-f</code> hiển thị thêm Filesystem UUID và Mountpoint</td>\n          </tr>\n          <tr>\n            <td><code>df</code></td>\n            <td>Báo cáo dung lượng phân vùng (Blocks & Inodes)</td>\n            <td><code>df -h [hoặc df -i]</code></td>\n            <td><code>df -h /</code></td>\n            <td>Dùng <code>df -i</code> để kiểm tra phần trăm Inode đã dùng</td>\n          </tr>\n          <tr>\n            <td><code>du</code></td>\n            <td>Đo lường dung lượng thực tế của từng thư mục</td>\n            <td><code>du -sh &lt;path&gt;</code></td>\n            <td><code>du -ah --max-depth=1 /var/log | sort -hr</code></td>\n            <td>Luôn giới hạn <code>--max-depth=1</code> để không bị tràn màn hình</td>\n          </tr>\n          <tr>\n            <td><code>lsof</code></td>\n            <td>Tìm các file đã bị xóa nhưng process vẫn giữ mở</td>\n            <td><code>lsof +L1</code> (hoặc <code>grep deleted</code>)</td>\n            <td><code>lsof | grep '(deleted)'</code></td>\n            <td>Chỉ khi process đóng file descriptor thì đĩa mới giải phóng</td>\n          </tr>\n          <tr>\n            <td><code>truncate</code></td>\n            <td>Cắt ngắn kích thước file về 0 byte mà không xóa file</td>\n            <td><code>truncate -s 0 &lt;file&gt;</code></td>\n            <td><code>truncate -s 0 /var/log/app.log</code></td>\n            <td>Cứu nguy đĩa khẩn cấp khi file log đang bị ghi đè bởi app</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-2-8-lsblk-df-du",
          "title": "4.1 Khảo sát phân vùng và dung lượng ổ cứng với lsblk, df và du",
          "content": "\n                  <p>Bộ 3 câu lệnh kiểm tra ổ đĩa hàng ngày của kỹ sư hệ thống:</p>\n                  <ul>\n                    <li><code>lsblk</code>: Hiển thị danh sách thiết bị lưu trữ dạng cây phân cấp (ổ cứng vật lý <code>sda</code>, các phân vùng <code>sda1</code>, <code>sda2</code>, điểm gắn kết Mountpoint).</li>\n                    <li><code>df -h</code>: Hiển thị dung lượng tổng thể của từng phân vùng ở định dạng dễ đọc (Human-readable: G, M).</li>\n                    <li><code>du -sh [thư_mục]/* | sort -h</code>: Đo lường kích thước thực tế của từng thư mục con bên trong và sắp xếp tăng dần để tìm ra kẻ chiếm dụng dung lượng lớn nhất.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Truy tìm thư mục đang ngốn nhiều dung lượng nhất trên máy chủ",
              "code": "# Xem sơ đồ các ổ đĩa và phân vùng\nlsblk -f\n\n# Kiểm tra dung lượng phân vùng gốc /\ndf -h /\n\n# Tìm top 5 thư mục ngốn nhiều dung lượng nhất trong /var\nsudo du -sh /var/* 2>/dev/null | sort -h | tail -n 5",
              "annotations": [
                {
                  "line": 2,
                  "part": "lsblk -f",
                  "text": "Hiển thị cả định dạng filesystem (ext4, xfs) và mã định danh UUID của từng phân vùng."
                },
                {
                  "line": 5,
                  "part": "df -h /",
                  "text": "Xem phần trăm sử dụng (Use%) của phân vùng gốc hệ điều hành."
                },
                {
                  "line": 8,
                  "part": "du -sh ... sort -h",
                  "text": "-s tính tổng từng mục, -h hiển thị dạng Gigabyte, sort -h sắp xếp dung lượng từ nhỏ tới lớn."
                }
              ],
              "output": "NAME   FSTYPE FSVER LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINTS\nsda                                                                           \n├─sda1 vfat   FAT32       B1A4-09E2                             480M     5% /boot/efi\n└─sda2 ext4   1.0         7c3f8e52-1982-42bb-92b0-819284201824   18.5G    78% /\n4.2G\t/var/lib\n8.5G\t/var/log"
            }
          ]
        },
        {
          "id": "sec-2-8-inode-exhaustion",
          "title": "4.2 Cơn ác mộng cạn kiệt Inode và cách điều tra",
          "content": "\n                  <p>Một ngày đẹp trời, ứng dụng Python của bạn báo lỗi: <code>OSError: [Errno 28] No space left on device</code>. Bạn vội vã chạy lệnh <code>df -h</code> và thấy ổ cứng vẫn còn trống tận 50GB!</p>\n                  <p><strong>Nguyên nhân:</strong> Ổ đĩa bị <strong>CẠN INODE</strong> (Inode Exhaustion)! Các ứng dụng web thường sinh ra hàng triệu file session PHP, file cache Python, hoặc thư mục mail spool tí hon. Mỗi file dù chỉ 10 bytes cũng ngốn mất 1 Inode.</p>\n                  <p>Kiểm tra ngay bằng lệnh: <code>df -i</code></p>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Điều tra và tìm thư mục chứa hàng triệu file rác gây cạn Inode",
              "code": "# Kiểm tra tỷ lệ sử dụng Inode của các phân vùng\ndf -i /\n\n# Lệnh tìm thư mục chứa số lượng file lớn nhất trong /var\nsudo find /var -xdev -printf '%h\\n' | sort | uniq -c | sort -k1 -nr | head -n 5",
              "annotations": [
                {
                  "line": 2,
                  "part": "df -i",
                  "text": "Nếu cột IUse% đạt 100%, hệ thống sẽ từ chối tạo thêm bất kỳ file mới nào."
                },
                {
                  "line": 5,
                  "part": "find ... -printf '%h\\n'",
                  "text": "Trích xuất tên thư mục chứa của từng file, sau đó gom nhóm đếm số lượng file trong mỗi thư mục."
                }
              ],
              "output": "Filesystem      Inodes   IUsed   IFree IUse% Mounted on\n/dev/sda2      3276800 3276800       0  100% /\n1450200 /var/lib/php/sessions\n 850400 /var/spool/postfix/maildrop"
            }
          ]
        },
        {
          "id": "sec-2-8-deleted-files",
          "title": "4.3 Xử lý sự cố 'Đã xóa file nhưng ổ đĩa không giải phóng dung lượng'",
          "content": "\n                  <p>Đây là một trong những tình huống kinh điển nhất của người quản trị Linux: File log <code>access.log</code> nặng 40GB làm đầy ổ đĩa. Bạn nhanh tay gõ <code>rm /var/log/nginx/access.log</code>. Kiểm tra lại bằng <code>df -h</code>, dung lượng đã dùng vẫn là 100%!</p>\n                  <p><strong>Bản chất hoạt động của Linux Kernel:</strong></p>\n                  <p>Lệnh <code>rm</code> thực chất chỉ xóa đi tên file (Unlink dentry). Chừng nào tiến trình Nginx vẫn đang mở file đó (Open File Descriptor), Kernel vẫn phải giữ lại các khối dữ liệu trên đĩa để tiến trình tiếp tục ghi. Ổ cứng chỉ được giải phóng khi tiến trình đóng file hoặc tiến trình kết thúc.</p>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Tìm các file đã bị xóa nhưng vẫn bị tiến trình giữ dung lượng",
              "code": "# Liệt kê các file đã xóa nhưng vẫn đang bị tiến trình mở giữ bộ nhớ\nsudo lsof +L1\n\n# Cách 1: Yêu cầu tiến trình nạp lại file mới (Reload Nginx)\nsudo systemctl reload nginx\n\n# Cách 2: Làm rỗng nội dung file trực tiếp mà không cần xóa file (Truncate)\n# Kỹ thuật an toàn: ghi đè file bằng /dev/null\n: > /var/log/nginx/access.log",
              "annotations": [
                {
                  "line": 2,
                  "part": "lsof +L1",
                  "text": "Lọc các file có link count nhỏ hơn 1 (tức đã bị rm xóa) nhưng vẫn có tiến trình mở giữ."
                },
                {
                  "line": 5,
                  "part": "systemctl reload",
                  "text": "Nginx mở file log mới và đóng file log cũ, Kernel giải phóng ngay lập tức dung lượng đĩa."
                },
                {
                  "line": 9,
                  "part": ": > file",
                  "text": "Cú pháp truncate file về 0 bytes cực nhanh mà không làm hỏng file descriptor của ứng dụng đang chạy."
                }
              ],
              "output": "COMMAND   PID     USER   FD   TYPE DEVICE SIZE/OFF NLINK NODE NAME\nnginx    1120 www-data    6w   REG    8,2 41943040000     0 1528 /var/log/nginx/access.log (deleted)"
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Truy tìm Top 10 thư mục ngốn nhiều đĩa nhất và xử lý file rác an toàn</h4>\n      <p>Giảng viên thực hiện định vị các thư mục dung lượng lớn trên phân vùng <code>/var</code>:</p>\n      <pre><code># 1. Kiểm tra tổng quan dung lượng các phân vùng\ndf -h\n\n# 2. Truy tìm top 10 thư mục con lớn nhất trong /var/log\nsudo du -ah --max-depth=1 /var/log | sort -hr | head -n 10\n\n# 3. Làm rỗng file log khổng lồ mà không làm gãy file descriptor của ứng dụng\nsudo truncate -s 0 /var/log/huge_app.log</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Dùng rm xóa file log đang chạy</div>\n          <pre><code># Nguy hiểm khi app đang ghi log liên tục:\nsudo rm -f /var/log/huge_app.log\n\n# Kết quả tai hại:\n# Lệnh rm chỉ gỡ bỏ tên file khỏi thư mục,\n# nhưng ứng dụng vẫn giữ con trỏ mở (file descriptor).\n# Dung lượng ổ cứng KHÔNG ĐƯỢC GIẢI PHÓNG!</code></pre>\n          <p class=\"lx-diff-desc\">File biến mất khỏi <code>ls</code> nhưng <code>df -h</code> vẫn báo 100% full. Ứng dụng tiếp tục ghi vào hư vô và đĩa không được thu hồi.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Thu nhỏ file về 0 hoặc giải phóng fd</div>\n          <pre><code># Cách 1: Làm rỗng nội dung ngay tức khắc\nsudo truncate -s 0 /var/log/huge_app.log\n# (Hoặc: sudo : > /var/log/huge_app.log)\n\n# Cách 2: Nếu đã lỡ rm, dùng lsof để tìm PID rồi reload service\nsudo lsof | grep deleted\nsudo systemctl reload my_service</code></pre>\n          <p class=\"lx-diff-desc\">Giải phóng ngay lập tức dung lượng đĩa mà không làm gián đoạn hay hỏng luồng ghi dữ liệu của tiến trình dịch vụ.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Tái hiện Cạn Inode & Xử lý File Bị Xóa nhưng Đĩa Không Giảm",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.8</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thực hành tạo hàng ngàn file nhỏ để quan sát biến động Inode, sau đó tạo một tiến trình giữ mở file lớn, thực hiện xóa file bằng <code>rm</code> và dùng <code>lsof</code> để điều tra và thu hồi dung lượng.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Linux với quyền thực thi shell.</li>\n        <li>Tạo thư mục lab riêng biệt: <code>mkdir -p ~/disk-lab && cd ~/disk-lab</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Quan sát thông số đĩa và Inode trước khi tạo file:\n          <pre><code>df -h .\ndf -i .</code></pre>\n        </li>\n        <li>Tạo một file rác 100MB bằng <code>fallocate</code>:\n          <pre><code>fallocate -l 100M ~/disk-lab/test_large.dat\nls -lh ~/disk-lab/test_large.dat</code></pre>\n        </li>\n        <li>Chạy một tiến trình nền giữ file này mở (dùng lệnh <code>tail -f</code> hoặc <code>sleep</code>):\n          <pre><code>tail -f ~/disk-lab/test_large.dat > /dev/null 2>&1 &\nHOLD_PID=$!\necho \"Tiến trình giữ file PID: $HOLD_PID\"</code></pre>\n        </li>\n        <li>Dùng <code>rm</code> xóa file và quan sát hiện tượng:\n          <pre><code>rm -f ~/disk-lab/test_large.dat\nls -l ~/disk-lab/test_large.dat 2>/dev/null || echo \"File đã không còn trong thư mục!\"\ndf -h .</code></pre>\n          <em>Dung lượng đĩa vẫn chưa được giải phóng!</em>\n        </li>\n        <li>Dùng <code>lsof</code> để điều tra con trỏ file bị giữ và ngắt tiến trình:\n          <pre><code>lsof | grep test_large.dat | grep deleted\nkill $HOLD_PID\ndf -h .</code></pre>\n          <em>Dung lượng 100MB đã lập tức được hoàn trả về hệ thống!</em>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Sau khi lệnh <code>kill $HOLD_PID</code> thực thi, lệnh <code>df -h .</code> cho thấy dung lượng Available tăng lên đúng 100MB.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Viết một câu lệnh kết hợp <code>find</code>, <code>awk</code> và <code>xargs</code> để tự động tìm và xóa các file rác cũ hơn 30 ngày trong <code>/tmp</code>.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không chạy lệnh <code>du /</code> mà không có cờ <code>-x</code> (one-file-system) trên hệ thống lớn vì lệnh sẽ quét qua các mount point mạng NFS và thư mục ảo <code>/proc</code>, làm quá tải I/O đĩa.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong><code>No space left on device</code> dù df -h báo đĩa chỉ mới dùng 40%</strong></td><td>Hệ thống file đã cạn kiệt Inode (chỉ mục file). Thường do các ứng dụng sinh hàng triệu tệp nhỏ (email queue, cache session, temp files).</td><td>Kiểm tra bằng <code>df -i</code>. Dùng lệnh tìm thư mục chứa nhiều file nhất: <code>find / -xdev -printf '%h\\n' | sort | uniq -c | sort -k 1 -n | tail -n 10</code> và xóa dọn các file rác.</td></tr>\n          <tr><td><strong>Xóa file dung lượng lớn bằng rm nhưng df không tăng dung lượng trống</strong></td><td>Một tiến trình đang chạy vẫn giữ file descriptor mở tới file đó (trạng thái <code>deleted</code>).</td><td>Chạy <code>lsof | grep '(deleted)'</code> để lấy PID của tiến trình, sau đó reload dịch vụ bằng <code>systemctl reload &lt;service&gt;</code> để giải phóng con trỏ.</td></tr>\n          <tr><td><strong>Lệnh du và df cho hai con số dung lượng chênh lệch nhau rất lớn</strong></td><td><code>df</code> đọc thông số trực tiếp từ superblock của filesystem (tính cả file deleted đang mở và reserved blocks của root), còn <code>du</code> duyệt cây thư mục từ user-space.</td><td>Điều tra các tiến trình giữ file deleted bằng <code>lsof</code> và kiểm tra tỉ lệ dung lượng dành riêng cho root (reserved space) bằng <code>tune2fs -l &lt;partition&gt;</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Tách riêng phân vùng cho các thư mục nhạy cảm:</strong> Luôn phân chia các phân vùng riêng biệt cho <code>/var</code>, <code>/home</code>, <code>/tmp</code>. Nếu người dùng hoặc log ứng dụng làm đầy <code>/var</code>, phân vùng gốc <code>/</code> vẫn an toàn, bảo vệ hệ điều hành không bị crash.</li>\n        <li><strong>Bảo vệ dung lượng dành riêng cho root:</strong> Mặc định ext4 dành 5% dung lượng phân vùng cho tài khoản root (reserved blocks). Không hạ tỉ lệ này về 0% trên phân vùng hệ thống để đảm bảo root vẫn có thể đăng nhập cứu hộ khi đĩa của user bị tràn.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>GNU Coreutils: df & du invocation:</strong> <a href=\"https://www.gnu.org/software/coreutils/manual/\" target=\"_blank\" rel=\"noopener\">Coreutils Manual - Disk Usage Analysis</a>.</li>\n      <li><strong>Linux Filesystem Hierarchy Standard (FHS):</strong> <a href=\"https://refspecs.linuxfoundation.org/fhs.shtml\" target=\"_blank\" rel=\"noopener\">FHS 3.0 Specification</a>.</li>\n      <li><strong>Troubleshooting Linux Inode Exhaustion:</strong> Tài liệu vận hành sysadmin chuẩn Red Hat & Debian.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Tra cứu Các Cờ Lệnh df & du Thường Dùng",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Lệnh & Cờ</th><th>Ý nghĩa</th><th>Trường hợp áp dụng</th></tr></thead>\n        <tbody>\n          <tr><td><code>df -h</code></td><td>Hiển thị dung lượng dạng đọc được (GB, MB)</td><td>Kiểm tra nhanh toàn bộ phân vùng</td></tr>\n          <tr><td><code>df -i</code></td><td>Hiển thị số lượng Inodes (đã dùng, còn trống, %)</td><td>Điều tra sự cố 'No space left on device' bí ẩn</td></tr>\n          <tr><td><code>df -T</code></td><td>Hiển thị loại hệ thống file (ext4, xfs, btrfs)</td><td>Xác định định dạng phân vùng trước khi cấu hình</td></tr>\n          <tr><td><code>du -sh *</code></td><td>Tổng dung lượng từng mục trong thư mục hiện tại</td><td>Xác định thư mục con nào đang phình to</td></tr>\n          <tr><td><code>du -h -x --max-depth=1</code></td><td>Đo dung lượng không vượt qua mount point khác</td><td>An toàn khi quét trên hệ thống có gắn đĩa mạng</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Cứu nguy máy chủ database bị sập lúc 3h sáng do cạn Inode vì thư mục session",
        "content": "\n              <p>Một ứng dụng web cũ sinh ra file session người dùng nhưng cron dọn dẹp bị hỏng. Sau 6 tháng, thư mục <code>/var/lib/php/sessions/</code> tích tụ hơn 3 triệu tệp tin rác. Ổ cứng 500GB mới chỉ dùng 40GB dung lượng, nhưng phân vùng <code>/</code> chạm mốc 100% Inode khiến cơ sở dữ liệu MySQL không thể tạo file khóa <code>.lock</code> và sập hoàn toàn.</p>\n              <p><strong>Bước 1:</strong> Bạn gõ lệnh <code>rm /var/lib/php/sessions/*</code> và bị lỗi <code>Argument list too long</code>.</p>\n              <p><strong>Bước 2:</strong> Bạn bình tĩnh sử dụng <code>find</code> kết hợp <code>-delete</code> để xóa trực tiếp từng Inode:</p>\n              <pre><code>sudo find /var/lib/php/sessions -type f -name \"sess_*\" -delete</code></pre>\n              <p>Chỉ sau 2 phút, 3 triệu file rác bị quét sạch, Inode giảm từ 100% xuống 12%, MySQL khởi động lại thành công rực rỡ!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Thảm họa khởi động máy chủ (Emergency Mode) do sửa ẩu file /etc/fstab",
            "content": "Tệp <code>/etc/fstab</code> được hệ điều hành đọc ngay khi khởi động để mount các ổ đĩa. Nếu bạn viết sai cú pháp, nhầm UUID hoặc ổ đĩa mạng chưa sẵn sàng, hệ thống sẽ BỊ TREO và rơi vào màn hình đen cứu hộ Emergency Mode. <strong>Quy tắc sống còn:</strong> Luôn dùng cờ <code>nofail</code> cho các ổ đĩa phụ và BẮT BUỘC chạy <code>sudo mount -a</code> trước khi khởi động lại máy! Nếu <code>mount -a</code> không báo lỗi, bạn mới được phép reboot."
          },
          {
            "title": "Xóa file log bằng rm nhưng ổ cứng vẫn báo đầy 100%",
            "content": "Khi một tiến trình (như Nginx hay Python) đang mở một file log để ghi, nếu bạn gõ <code>rm access.log</code>, Linux chỉ xóa tên file khỏi thư mục chứ CHƯA GIẢI PHÓNG các khối đĩa chừng nào tiến trình đó chưa đóng File Descriptor! Lệnh <code>df -h</code> vẫn sẽ báo đầy. Hãy dùng lệnh <code>truncate -s 0 access.log</code> hoặc reload lại dịch vụ."
          }
        ],
        "tips": [
          {
            "title": "Lấy mã định danh UUID chuẩn của ổ đĩa bằng lsblk -f",
            "content": "Tuyệt đối không dùng tên thiết bị như <code>/dev/sdb1</code> trong <code>/etc/fstab</code> vì thứ tự ổ đĩa có thể bị tráo đổi khi cắm thêm ổ cứng mới. Luôn dùng lệnh: <code>lsblk -f</code> hoặc <code>blkid</code> để lấy chuỗi UUID cố định của phân vùng."
          },
          {
            "title": "Làm rỗng file log đang bị tiến trình giữ mà không cần restart",
            "content": "Thay vì xóa file log đang chạy, hãy làm rỗng nội dung của nó ngay lập tức bằng lệnh chuyển hướng: <code>: &gt; /var/log/my-app.log</code> hoặc <code>truncate -s 0 /var/log/my-app.log</code>. Dung lượng đĩa sẽ được giải phóng ngay trong tích tắc!"
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Kiểm tra tỷ lệ sử dụng dung lượng và Inode của phân vùng đĩa",
          "problem": "Kiểm tra tỉ lệ sử dụng Inode trên toàn bộ các phân vùng đĩa của hệ thống để phát hiện nguy cơ cạn Inode dù dung lượng còn trống.",
          "hint": "Sử dụng lệnh df -i -h để hiển thị số lượng và phần trăm Inode dưới dạng dễ đọc.",
          "solutionCode": "df -i -h /",
          "solutionOutput": "Filesystem      Inodes  IUsed   IFree IUse% Mounted on\n/dev/sda1      3276800 450120 2826680   14% /",
          "explanation": "Khi một thư mục chứa hàng triệu file rác siêu nhỏ (như cache/session), Inode sẽ bị cạn kiệt (IUse% đạt 100%) khiến hệ thống không thể tạo thêm file dù đĩa còn hàng chục GB trống.",
          "annotations": [
            {
              "part": "df -i -h",
              "text": "Cờ -i kiểm tra thông số Inode, cờ -h hiển thị đơn vị con người dễ đọc."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp df",
              "pass": "Dùng đúng df -i",
              "excellent": "Kết hợp cờ -h và phân tích được chỉ số IUse%",
              "weight": "50%"
            },
            {
              "criterion": "Hiểu biết Inode",
              "pass": "Nhận thức được hiện tượng cạn Inode",
              "excellent": "Phân biệt rạch ròi giữa cạn dung lượng byte và cạn Inode",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Truy tìm và giải phóng dung lượng file deleted bị tiến trình giữ",
          "problem": "Truy tìm các file đã bị xóa (deleted) nhưng tiến trình vẫn đang mở và giữ chặt Inode, khiến dung lượng đĩa không được giải phóng.",
          "hint": "Sử dụng lệnh sudo lsof +L1 hoặc sudo lsof | grep deleted.",
          "solutionCode": "sudo lsof +L1\n# Hoặc lệnh tương đương:\nsudo lsof | grep \"(deleted)\"",
          "solutionOutput": "COMMAND   PID USER   FD   TYPE DEVICE   SIZE/OFF NODE NAME\npython3  2341 root    3u   REG    8,1 52428800000 1234 /var/log/app.log (deleted)",
          "explanation": "Trên Linux, lệnh rm chỉ xóa liên kết dentry. Nếu một tiến trình vẫn đang giữ file descriptor mở, kernel sẽ không giải phóng dung lượng đĩa cho đến khi tiến trình đó đóng file hoặc khởi động lại.",
          "annotations": [
            {
              "part": "lsof +L1",
              "text": "Tìm các file mở có số lượng link nhỏ hơn 1 (tức file đã bị xóa trên filesystem)."
            }
          ],
          "rubric": [
            {
              "criterion": "Dùng lsof",
              "pass": "Dùng đúng lsof +L1 hoặc grep deleted",
              "excellent": "Xác định được PID của tiến trình đang chiếm dụng dung lượng",
              "weight": "50%"
            },
            {
              "criterion": "Biện pháp xử lý",
              "pass": "Biết cách giải phóng tài nguyên",
              "excellent": "Áp dụng reload dịch vụ hoặc làm rỗng file descriptor an toàn",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Cấu hình gắn phân vùng tự động an toàn trong /etc/fstab bằng UUID",
          "problem": "Viết dòng cấu hình an toàn trong /etc/fstab để tự động gắn kết phân vùng ổ đĩa dữ liệu định dạng ext4 vào thư mục /data mỗi khi khởi động.",
          "hint": "Luôn sử dụng UUID thay cho tên thiết bị /dev/sdX và thêm tùy chọn nofail.",
          "solutionCode": "# Lấy UUID:\nsudo blkid /dev/sdb1\n\n# Dòng cấu hình thêm vào /etc/fstab:\nUUID=3a4b5c6d-7e8f-9012-3456-7890abcdef12 /data ext4 defaults,nofail 0 2\n\n# Kiểm tra trước khi khởi động lại:\nsudo mount -a",
          "solutionOutput": "# mount -a không báo lỗi tức cấu hình fstab hoàn toàn an toàn",
          "explanation": "Tên thiết bị (/dev/sdb1) có thể bị tráo đổi vị trí khi cắm thêm ổ cứng. UUID là định danh bất biến. Cờ nofail đảm bảo máy chủ không bị rơi vào Emergency Mode nếu ổ đĩa phụ bị lỗi.",
          "annotations": [
            {
              "part": "defaults,nofail",
              "text": "Tùy chọn nofail sống còn giúp máy chủ vẫn khởi động bình thường nếu ổ đĩa bị tháo."
            },
            {
              "part": "sudo mount -a",
              "text": "Lệnh kiểm tra bắt buộc trước khi khởi động lại máy chủ."
            }
          ],
          "rubric": [
            {
              "criterion": "Cấu hình fstab",
              "pass": "Dùng UUID và 6 trường fstab",
              "excellent": "Có cờ nofail và bước kiểm tra bắt buộc mount -a",
              "weight": "50%"
            },
            {
              "criterion": "An toàn hệ thống",
              "pass": "Tránh dùng tên thiết bị tĩnh",
              "excellent": "Hiểu nguyên nhân gây lỗi boot hung khi cấu hình sai fstab",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "lsblk hiển thị sơ đồ phân vùng phần cứng, df đo lường dung lượng phân vùng và du tính toán mức tiêu thụ của thư mục cụ thể.",
        "Dung lượng lưu trữ (Blocks) và Siêu dữ liệu (Inodes) là hai đại lượng độc lập; cạn kiệt một trong hai đều dẫn tới lỗi 'No space left on device'.",
        "Khi một file bị xóa bằng rm trong khi tiến trình vẫn giữ mở file descriptor, dung lượng đĩa sẽ không được thu hồi cho đến khi tiến trình dừng hoặc reload.",
        "Sử dụng truncate -s 0 file hoặc ghi đè rỗng : > file để giải phóng dung lượng log tức thì mà không phá vỡ con trỏ file của dịch vụ.",
        "Thiết lập phân vùng riêng cho /var và /tmp là biện pháp kiến trúc quan trọng ngăn chặn nguy cơ sập toàn bộ hệ điều hành khi đĩa bị tràn."
      ],
      "generalInfo": {
        "duration": "50 phút",
        "targetAudience": "Sysadmin, Database Administrator (DBA), DevOps Engineer",
        "prerequisites": "Hiểu hệ thống file FHS (Bài 1.2), quyền truy cập và phân vùng ổ cứng",
        "environment": "Máy chủ Linux hoặc máy ảo có ít nhất 1 phân vùng đĩa",
        "materials": "Terminal Linux, quyền sudo để chạy mount và kiểm tra lsof"
      },
      "nextLessonPreview": "Trong Bài 2.9, chúng ta sẽ bước vào Dự án Thực hành Tổng hợp Cấp 2: Tự tay xây dựng một Shell Script sao lưu dữ liệu tự động xoay vòng 7 ngày và diễn tập giải quyết 3 kịch bản sự cố thực tế.",
      "quiz": [
        {
          "question": "Lệnh nào sau đây kiểm tra phần trăm số lượng Inode đã sử dụng trên các phân vùng đĩa?",
          "options": [
            "df -i",
            "du -sh",
            "lsblk -i",
            "fdisk -l"
          ],
          "explanation": "Cờ -i (inodes) của lệnh df cho biết tổng số lượng Inode, số đã dùng và tỉ lệ phần trăm còn trống trên mỗi phân vùng.",
          "correctIndex": 0
        },
        {
          "question": "Một file dung lượng 50GB đang được ghi bởi dịch vụ database. Để giải phóng đĩa khẩn cấp mà không làm sập tiến trình database, giải pháp nào đúng đắn nhất?",
          "options": [
            "Chạy rm -rf /var/log/db.log",
            "Chạy truncate -s 0 /var/log/db.log",
            "Chạy kill -9 PID của database",
            "Format lại phân vùng đĩa"
          ],
          "explanation": "truncate -s 0 giảm kích thước file về 0 ngay lập tức tại chỗ, giúp hệ thống file thu hồi block đĩa mà không làm gãy file descriptor của tiến trình đang mở file.",
          "correctIndex": 1
        },
        {
          "question": "Sau khi chỉnh sửa tệp cấu hình gắn phân vùng `/etc/fstab`, lệnh nào BẮT BUỘC phải chạy để kiểm tra cú pháp trước khi khởi động lại hệ thống?",
          "options": [
            "reboot -f",
            "sudo mount -a",
            "systemctl restart fstab",
            "fsck -y /"
          ],
          "correctIndex": 1,
          "explanation": "Lệnh `sudo mount -a` sẽ thử gắn toàn bộ các phân vùng khai báo trong fstab. Nếu có lỗi cú pháp hoặc sai UUID, nó sẽ lập tức báo lỗi ngay trong phiên hiện tại, cứu máy chủ khỏi nguy cơ rơi vào Emergency Mode khi reboot."
        }
      ],
      "reflectionQuestion": "Một máy chủ web gửi cảnh báo ổ cứng phân vùng `/` đã đầy 100%. Quản trị viên SSH vào máy và gõ lệnh `rm -f /var/log/access.log` (file này dung lượng 40GB). Tuy nhiên sau khi gõ xong, lệnh `df -h` vẫn báo phân vùng `/` đầy 100%. Hãy giải thích nguyên nhân kỹ thuật và đưa ra 2 cách xử lý để ổ cứng lập tức giải phóng dung lượng.",
      "reflectionHint": "Gợi ý: Nguyên nhân do web server (Nginx/Apache) vẫn đang giữ con trỏ mở (open file descriptor) tới `access.log`. Cách 1: Chạy `systemctl reload nginx` (hoặc restart) để web server đóng và mở lại file log mới, giải phóng block cũ. Cách 2: Tìm PID và file descriptor qua `lsof | grep '(deleted)'` rồi ghi đè con trỏ: `> /proc/<PID>/fd/<FD_NUM>`."
    },
    {
      "id": "lx-2-09",
      "number": "2.9",
      "title": "Dự án Thực hành Cấp 2: Script sao lưu tự động xoay vòng 7 ngày & 3 Kịch bản Sự cố",
      "subtitle": "Tích hợp toàn diện shell script, cron, find, tar và quản lý tiến trình vào một hệ thống bảo vệ dữ liệu tự động",
      "level": "Dự án",
      "duration": "60 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ cấu trúc chuẩn của một Shell Script công nghiệp: set -euo pipefail, trap, log function, cấu hình biến",
        "2. [Hiểu - Understand] Hiểu sâu cơ chế xoay vòng dữ liệu (rotation retention) dựa trên mtime và tính toàn vẹn SHA256",
        "3. [Vận dụng - Apply] Viết và triển khai script auto_backup.sh tự động nén, đặt lịch cron với flock và xoay vòng 7 ngày",
        "4. [Phân tích - Analyze] Phân tích và xử lý 3 kịch bản sự cố thực chiến: đĩa đầy giữa chừng, mất nguồn dữ liệu và race condition cron"
      ],
      "intuition": {
        "title": "Hộp đen hàng không và Quy trình hạ cánh khẩn cấp",
        "overview": "Dự án tổng hợp này tích hợp toàn bộ kiến thức Cấp độ 2 thành một sản phẩm thực tế: một hệ thống tự động sao lưu dữ liệu chuẩn công nghiệp có cơ chế chống lỗi, xoay vòng lưu trữ và phòng ngừa sự cố.",
        "realWorld": "Một công ty thương mại điện tử bị mất toàn bộ đơn hàng sau một sự cố sập đĩa vì bản sao lưu của họ bị hỏng ngầm trong 3 tháng mà không ai biết do script cũ không có kiểm tra mã lỗi và checksum. Dự án này sẽ đảm bảo bạn không bao giờ rơi vào thảm kịch đó.",
        "metaphor": "Một kịch bản sao lưu chuẩn công nghiệp giống như một chuyến bay thương mại: luôn có danh sách kiểm tra trước khi cất cánh (set -euo pipefail), có hộp đen ghi nhật ký (log function), và có quy trình hạ cánh khẩn cấp khi gặp sự cố (trap cleanup).",
        "boundary": "Dự án này tập trung vào sao lưu cục bộ và xoay vòng tệp nén; ở Cấp độ 3 chúng ta sẽ nâng cấp bài toán này lên sao lưu phân tán qua mạng với rsync, SSH mã hóa và snapshot Btrfs/ZFS.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Dự án tổng hợp này tích hợp toàn bộ kiến thức Cấp độ 2 thành một sản phẩm thực tế: một hệ thống tự động sao lưu dữ liệu chuẩn công nghiệp có cơ chế chống lỗi, xoay vòng lưu trữ và phòng ngừa sự cố.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Phòng thủ lỗi:</strong> <code>set -euo pipefail</code></li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bẫy tín hiệu dọn dẹp:</strong> <code>trap cleanup EXIT INT TERM</code></li><li><span class=\"lx-vs-bullet\">•</span> <strong>Kiểm tra toàn vẹn:</strong> <code>sha256sum</code></li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một công ty thương mại điện tử bị mất toàn bộ đơn hàng sau một sự cố sập đĩa vì bản sao lưu của họ bị hỏng ngầm trong 3 tháng mà không ai biết do script cũ không có kiểm tra mã lỗi và checksum. Dự án này sẽ đảm bảo bạn không bao giờ rơi vào thảm kịch đó.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Mã nguồn hoàn chỉnh Script sao lưu dự án công nghiệp: auto_backup.sh</li><li><span class=\"lx-vs-bullet\">•</span> Đặt lịch Cron định kỳ với khóa chốt an toàn flock</li><li><span class=\"lx-vs-bullet\">•</span> Diễn tập 3 Kịch bản Sự cố Tự chẩn đoán (Troubleshooting Scenarios)</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Kiến trúc Script Chuẩn Công nghiệp",
          "content": "<p>Một script sao lưu đạt tiêu chuẩn Production đòi hỏi 5 khối cấu trúc cốt lõi:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Thành phần Cốt lõi</th>\n            <th>Kỹ thuật Áp dụng</th>\n            <th>Cú pháp mẫu</th>\n            <th>Ví dụ thực tế</th>\n            <th>Mục đích an toàn</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Phòng thủ lỗi</td>\n            <td><code>set -euo pipefail</code></td>\n            <td><code>set -euo pipefail</code></td>\n            <td>Đặt ngay dòng thứ 2 sau Shebang</td>\n            <td>Dừng script ngay khi có biến rỗng, lệnh lỗi hoặc gãy pipe</td>\n          </tr>\n          <tr>\n            <td>Bẫy tín hiệu dọn dẹp</td>\n            <td><code>trap cleanup EXIT INT TERM</code></td>\n            <td><code>trap 'rm -f \"$TMP_FILE\"' EXIT</code></td>\n            <td>Tự động dọn file tạm khi script kết thúc hoặc bị ngắt</td>\n            <td>Không để lại file rác làm đầy ổ đĩa</td>\n          </tr>\n          <tr>\n            <td>Kiểm tra toàn vẹn</td>\n            <td><code>sha256sum</code></td>\n            <td><code>sha256sum &lt;file&gt; > &lt;file&gt;.sha256</code></td>\n            <td><code>sha256sum -c backup.tar.gz.sha256</code></td>\n            <td>Phát hiện tệp backup bị hỏng hoặc ghi thiếu dữ liệu</td>\n          </tr>\n          <tr>\n            <td>Xoay vòng lưu trữ</td>\n            <td><code>find -mtime +7 -delete</code></td>\n            <td><code>find \"$BACKUP_DIR\" -name \"*.tar.gz\" -mtime +7 -delete</code></td>\n            <td>Xóa các bản sao lưu cũ hơn 7 ngày</td>\n            <td>Giữ dung lượng đĩa luôn trong ngưỡng an toàn</td>\n          </tr>\n          <tr>\n            <td>Khóa chống trùng lặp</td>\n            <td><code>flock</code></td>\n            <td><code>flock -n /var/lock/backup.lock $SCRIPT</code></td>\n            <td>Cấu hình trong crontab</td>\n            <td>Không cho phép 2 tiến trình backup cùng chạy đè nhau</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-2-9-script-code",
          "title": "4.1 Mã nguồn hoàn chỉnh Script sao lưu dự án công nghiệp: auto_backup.sh",
          "content": "\n                  <p>Dưới đây là mã nguồn hoàn chỉnh của kịch bản sao lưu tự động. Hãy tạo file <code>/opt/scripts/auto_backup.sh</code> và cấp quyền thực thi <code>chmod +x</code>.</p>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Toàn văn kịch bản auto_backup.sh với đầy đủ cơ chế phòng vệ",
              "code": "#!/usr/bin/env bash\n# ==============================================================================\n# auto_backup.sh — Script sao lưu dự án tự động chuẩn công nghiệp\n# ==============================================================================\nset -euo pipefail\n\n# Khai báo cấu hình\nreadonly SOURCE_DIR=\"/var/www/my_project\"\nreadonly BACKUP_DIR=\"/var/backups/my_project\"\nreadonly LOG_FILE=\"/var/log/my_project_backup.log\"\nreadonly RETENTION_DAYS=7\nreadonly TIMESTAMP=\"$(date +'%Y-%m-%d_%H%M%S')\"\nreadonly ARCHIVE_NAME=\"backup_${TIMESTAMP}.tar.gz\"\nreadonly DISK_THRESHOLD_PCT=90\n\nlog() {\n    local level=\"$1\"\n    shift\n    echo \"[$(date +'%Y-%m-%d %H:%M:%S')] [${level}] $*\" | tee -a \"$LOG_FILE\"\n}\n\ncleanup_on_error() {\n    log \"ERROR\" \"Sao lưu thất bại tại dòng $1! Đang dọn dẹp file tạm...\"\n    rm -f \"${BACKUP_DIR}/${ARCHIVE_NAME}\" || true\n    exit 1\n}\ntrap 'cleanup_on_error $LINENO' ERR\n\n# 1. Kiểm tra môi trường thư mục\nmkdir -p \"$BACKUP_DIR\"\ntouch \"$LOG_FILE\"\n\nlog \"INFO\" \"--- BẮT ĐẦU PHIÊN SAO LƯU: ${TIMESTAMP} ---\"\n\n# 2. Kiểm tra dung lượng đĩa trước khi ghi file nén\ncurrent_usage=$(df \"$BACKUP_DIR\" | awk 'NR==2 {print $5}' | tr -d '%')\nif [[ \"$current_usage\" -ge \"$DISK_THRESHOLD_PCT\" ]]; then\n    log \"ERROR\" \"Ổ đĩa lưu trữ đã dùng ${current_usage}% (>= ${DISK_THRESHOLD_PCT}%). Hủy bỏ sao lưu!\"\n    exit 1\nfi\n\n# 3. Tiến hành đóng gói và nén dữ liệu\nlog \"INFO\" \"Đang nén ${SOURCE_DIR} thành ${ARCHIVE_NAME}...\"\ntar -czf \"${BACKUP_DIR}/${ARCHIVE_NAME}\" \\\n    --exclude=\"*.pyc\" \\\n    --exclude=\"__pycache__\" \\\n    --exclude=\"venv\" \\\n    --exclude=\".git\" \\\n    -C \"$(dirname \"$SOURCE_DIR\")\" \"$(basename \"$SOURCE_DIR\")\"\n\narchive_size=$(du -h \"${BACKUP_DIR}/${ARCHIVE_NAME}\" | cut -f1)\nlog \"INFO\" \"Nén thành công! Dung lượng file: ${archive_size}\"\n\n# 4. Xoay vòng bản sao lưu: Tự động xóa các file cũ hơn 7 ngày\nlog \"INFO\" \"Đang dọn dẹp các bản sao lưu cũ hơn ${RETENTION_DAYS} ngày...\"\nfind \"$BACKUP_DIR\" -type f -name \"backup_*.tar.gz\" -mtime +\"$RETENTION_DAYS\" -delete\n\nlog \"INFO\" \"--- HOÀN THÀNH SAO LƯU THÀNH CÔNG ---\"",
              "annotations": [
                {
                  "line": 6,
                  "part": "set -euo pipefail",
                  "text": "Đảm bảo script dừng ngay lập tức nếu bất kỳ câu lệnh nào thất bại."
                },
                {
                  "line": 23,
                  "part": "trap ... ERR",
                  "text": "Tự động dọn dẹp file nén bị dở dang nếu quá trình nén gặp sự cố đứt gánh giữa đường."
                },
                {
                  "line": 39,
                  "part": "--exclude",
                  "text": "Loại trừ các file rác cache, môi trường ảo venv và git history để tối ưu tốc độ nén."
                },
                {
                  "line": 48,
                  "part": "find ... -delete",
                  "text": "Tự động xóa các file backup cũ hơn RETENTION_DAYS ngày, giữ ổ đĩa luôn ổn định."
                }
              ],
              "output": "[2026-10-28 02:30:00] [INFO] --- BẮT ĐẦU PHIÊN SAO LƯU: 2026-10-28_023000 ---\n[2026-10-28 02:30:00] [INFO] Đang nén /var/www/my_project thành backup_2026-10-28_023000.tar.gz...\n[2026-10-28 02:30:45] [INFO] Nén thành công! Dung lượng file: 142M\n[2026-10-28 02:30:45] [INFO] Đang dọn dẹp các bản sao lưu cũ hơn 7 ngày...\n[2026-10-28 02:30:46] [INFO] --- HOÀN THÀNH SAO LƯU THÀNH CÔNG ---"
            }
          ]
        },
        {
          "id": "sec-2-9-cron-lock",
          "title": "4.2 Đặt lịch Cron định kỳ với khóa chốt an toàn flock",
          "content": "\n                  <p>Sau khi test script chạy tay thành công, mở crontab bằng lệnh <code>sudo crontab -e</code> và đặt lịch chạy tự động vào lúc 02:30 AM mỗi ngày:</p>\n                  <pre><code>SHELL=/bin/bash\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin\n\n# Chạy backup dự án mỗi 02:30 sáng, chống chạy đè bằng flock\n30 2 * * * /usr/bin/flock -n /var/lock/auto_backup.lock /opt/scripts/auto_backup.sh</code></pre>\n                "
        },
        {
          "id": "sec-2-9-troubleshoot-scenarios",
          "title": "4.3 Diễn tập 3 Kịch bản Sự cố Tự chẩn đoán (Troubleshooting Scenarios)",
          "content": "\n                  <p>Hãy thử tài suy luận của bạn với 3 bài toán sự cố thực tế dưới đây trước khi bấm mở xem lời giải!</p>\n                "
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Khung sườn Script Sao lưu Tự động Chuẩn Production</h4>\n      <p>Giảng viên xây dựng hàm ghi nhật ký có màu và timestamp chuẩn ISO:</p>\n      <pre><code>#!/usr/bin/env bash\nset -euo pipefail\n\n# Khai báo biến đường dẫn\nBACKUP_SRC=\"/var/www/html\"\nBACKUP_DEST=\"/backup/daily\"\nTIMESTAMP=$(date '+%Y%m%d_%H%M%S')\nARCHIVE_NAME=\"backup_${TIMESTAMP}.tar.gz\"\n\nlog() {\n  echo \"[$(date '+%Y-%m-%d %H:%M:%S')] [$1] $2\"\n}\n\nlog \"INFO\" \"Bắt đầu tiến trình sao lưu thư mục: ${BACKUP_SRC}\"</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Script sao lưu ngây thơ</div>\n          <pre><code>#!/bin/bash\n# Không có set -e, không kiểm tra thư mục tồn tại\ntar -czf /backup/data.tar.gz /var/www/html\nrm -rf /backup/old_*\necho \"Xong\"</code></pre>\n          <p class=\"lx-diff-desc\">Nếu lệnh tar thất bại do đĩa đầy, lệnh rm vẫn chạy xóa sạch bản cũ; không có mã hash xác thực tính toàn vẹn; không xoay vòng theo ngày.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Script sao lưu tự động xoay vòng an toàn</div>\n          <pre><code>#!/usr/bin/env bash\nset -euo pipefail\ntrap 'echo \"Lỗi bất ngờ xảy ra!\" >&2' ERR\n\n# Kiểm tra thư mục nguồn trước khi nén\n[[ -d \"$BACKUP_SRC\" ]] || { echo \"Nguồn không tồn tại!\"; exit 1; }\n\n# Nén dữ liệu và sinh mã băm SHA256\ntar -czf \"${BACKUP_DEST}/${ARCHIVE_NAME}\" -C \"$BACKUP_SRC\" .\nsha256sum \"${BACKUP_DEST}/${ARCHIVE_NAME}\" > \"${BACKUP_DEST}/${ARCHIVE_NAME}.sha256\"\n\n# Xoay vòng xóa file cũ hơn 7 ngày\nfind \"$BACKUP_DEST\" -name \"backup_*.tar.gz\" -mtime +7 -delete</code></pre>\n          <p class=\"lx-diff-desc\">Kiểm tra điều kiện nghiêm ngặt, bẫy lỗi tự động, tạo mã kiểm tra toàn vẹn và xoay vòng lưu trữ tự động an toàn.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Triển khai Hệ thống Backup và Giả lập 3 Kịch bản Sự cố",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.9</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Cài đặt hoàn chỉnh script <code>auto_backup.sh</code>, cấu hình crontab với khóa <code>flock</code> và thực hành xử lý 3 sự cố thực tế: thư mục nguồn bị xóa, đĩa đích bị đầy, và hai tiến trình kích hoạt cùng lúc.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Hệ điều hành Linux có bash 4.0+.</li>\n        <li>Tạo cấu trúc giả lập: <code>mkdir -p ~/project-lab/{src,dest,logs}</code>.</li>\n        <li>Tạo dữ liệu mẫu: <code>for i in {1..5}; do echo \"Dữ liệu file $i\" > ~/project-lab/src/file$i.txt; done</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Tạo tệp script <code>~/project-lab/auto_backup.sh</code> với nội dung đầy đủ ở Mục 1 và cấp quyền <code>chmod 700</code>.</li>\n        <li>Chạy thử nghiệm lần đầu và kiểm tra tệp nén + mã SHA256 sinh ra trong thư mục <code>dest</code>:\n          <pre><code>bash ~/project-lab/auto_backup.sh\nls -lh ~/project-lab/dest/\nsha256sum -c ~/project-lab/dest/*.sha256</code></pre>\n        </li>\n        <li>Diễn tập Kịch bản 1: Giả lập thư mục nguồn biến mất:\n          <pre><code>mv ~/project-lab/src ~/project-lab/src_bak\nbash ~/project-lab/auto_backup.sh || echo \"Script dừng đúng như thiết kế với exit code != 0\"\nmv ~/project-lab/src_bak ~/project-lab/src</code></pre>\n        </li>\n        <li>Diễn tập Kịch bản 2: Kiểm tra cơ chế flock chống chạy trùng:\n          <pre><code>flock -n /tmp/test_backup.lock sleep 15 &\nflock -n /tmp/test_backup.lock echo \"Lần 2 chạy ngay\" || echo \"Flock đã chặn thành công phiên thứ 2!\"</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Mã băm SHA256 báo <code>OK</code> khi xác thực; script từ chối chạy và thoát ngay khi nguồn không tồn tại; cơ chế flock từ chối phiên thứ 2 nếu phiên 1 đang chạy.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Bổ sung tính năng gửi thông báo qua Webhook Discord/Telegram hoặc ghi log vào syslog hệ thống qua lệnh <code>logger</code>.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Khi thử nghiệm lệnh xoay vòng <code>find ... -delete</code>, luôn chạy trước với lệnh <code>find ... -print</code> để rà soát danh sách file sắp bị xóa, tránh việc biến đường dẫn bị rỗng dẫn đến xóa nhầm toàn bộ hệ thống!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Bản backup tạo ra có dung lượng 0 byte nhưng script vẫn báo thành công</strong></td><td>Script không bật <code>set -e</code> và không kiểm tra exit code của lệnh <code>tar</code>; khi ổ cứng đầy giữa chừng, tar trả về mã lỗi 1 hoặc 2 nhưng script vẫn lờ đi và chạy tiếp.</td><td>Bắt buộc có <code>set -euo pipefail</code> ở đầu script và bẫy tín hiệu <code>ERR</code> để xóa bỏ file rác hỏng.</td></tr>\n          <tr><td><strong>Lệnh xoay vòng find ... -delete xóa nhầm toàn bộ thư mục cha</strong></td><td>Biến <code>BACKUP_DEST</code> bị rỗng (unbound variable) do lỗi chính tả, khiến lệnh trở thành <code>find \"\" -name \"*.tar.gz\" -delete</code> hoặc quét từ thư mục hiện tại.</td><td>Cờ <code>set -u</code> sẽ chặn đứng lỗi này ngay lập tức vì nó không cho phép sử dụng biến chưa khởi tạo.</td></tr>\n          <tr><td><strong><code>Device or resource busy</code> khi xoay vòng hoặc xóa tệp</strong></td><td>File backup đang được sao chép qua mạng hoặc một tiến trình khác đang mở tệp để quét virus/checksum.</td><td>Kiểm tra tiến trình bằng <code>lsof &lt;tệp&gt;</code> trước khi thực hiện xóa.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Nguyên tắc phân quyền nghiêm ngặt 700 cho thư mục Backup:</strong> Thư mục chứa bản sao lưu chứa toàn bộ mã nguồn và cơ sở dữ liệu nhạy cảm. Phải đảm bảo chỉ có user chuyên trách sở hữu với quyền <code>chmod 700</code>, không cho người dùng khác xem trộm.</li>\n        <li><strong>Mã hóa bản sao lưu trước khi lưu trữ hoặc chuyển qua mạng:</strong> Luôn mã hóa tệp nén bằng GPG hoặc OpenSSL (ví dụ: <code>openssl enc -aes-256-cbc -salt</code>) để đề phòng trường hợp ổ cứng backup bị đánh cắp vật lý.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Bash Hackers Wiki:</strong> <a href=\"https://wiki.bash-hackers.org/\" target=\"_blank\" rel=\"noopener\">Bash Hackers Robust Scripting Guide</a>.</li>\n      <li><strong>Google Shell Style Guide:</strong> Quy chuẩn viết shell script của kỹ sư Google: <a href=\"https://google.github.io/styleguide/shellguide.html\" target=\"_blank\" rel=\"noopener\">Google Shell Guide</a>.</li>\n      <li><strong>3-2-1 Backup Strategy:</strong> Tiêu chuẩn sao lưu dữ liệu quốc tế của CISA/US-CERT.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Danh sách Kiểm tra (Checklist) Triển khai Script Production",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Hạng mục</th><th>Tiêu chí kiểm tra</th><th>Trạng thái</th></tr></thead>\n        <tbody>\n          <tr><td>Shebang & Cờ an toàn</td><td>Có <code>#!/usr/bin/env bash</code> và <code>set -euo pipefail</code></td><td>Bắt buộc</td></tr>\n          <tr><td>Trap Cleanup</td><td>Có bẫy tín hiệu tự động dọn tệp tạm khi gặp lỗi hoặc thoát</td><td>Bắt buộc</td></tr>\n          <tr><td>Xác thực nguồn/đích</td><td>Kiểm tra <code>[[ -d \"$SRC\" ]]</code> và <code>[[ -d \"$DEST\" ]]</code> trước khi chạy</td><td>Bắt buộc</td></tr>\n          <tr><td>Bảo toàn toàn vẹn</td><td>Tạo mã băm SHA256 đi kèm mỗi tệp lưu trữ</td><td>Khuyến nghị</td></tr>\n          <tr><td>Khóa độc quyền</td><td>Tác vụ cron được bọc bởi <code>flock -n</code></td><td>Bắt buộc</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "exercises": [
        {
          "level": "Dễ",
          "title": "Tìm và xóa tự động các gói sao lưu cũ hơn 7 ngày",
          "problem": "Viết đoạn lệnh Bash sử dụng find để tự động tìm và xóa toàn bộ các tệp sao lưu (.tar.gz) trong /var/backups/ đã tạo cách đây hơn 7 ngày.",
          "hint": "Dùng find /var/backups -type f -name \"backup-*.tar.gz\" -mtime +7 kết hợp cờ -delete sau khi dry-run.",
          "solutionCode": "# Bước 1 (Dry-run xem trước danh sách file sẽ bị xóa):\nfind /var/backups -type f -name \"backup-*.tar.gz\" -mtime +7\n\n# Bước 2 (Thực hiện xóa an toàn):\nfind /var/backups -type f -name \"backup-*.tar.gz\" -mtime +7 -delete",
          "solutionOutput": "# Đã dọn dẹp các tệp sao lưu cũ hơn 7 ngày thành công",
          "explanation": "Cờ -mtime +7 tìm các tệp có thời gian sửa đổi cách đây hơn 7 ngày (7x24 giờ). -delete thực hiện xóa trực tiếp mà không cần gọi lệnh rm ngoài.",
          "annotations": [
            {
              "part": "-mtime +7",
              "text": "Dấu + lọc các file cũ hơn 7 ngày."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp find",
              "pass": "Dùng đúng -mtime +7",
              "excellent": "Có bước dry-run kiểm tra trước khi xóa dữ liệu thật",
              "weight": "50%"
            },
            {
              "criterion": "An toàn dữ liệu",
              "pass": "Không xóa nhầm file mới",
              "excellent": "Dùng -delete hoặc xargs an toàn",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Cơ chế tự khóa flock chống chạy đồng thời trong kịch bản Bash",
          "problem": "Viết đoạn mã lồng lệnh flock bên trong chính script sao lưu để đảm bảo chỉ có duy nhất một phiên bản script được phép chạy tại một thời điểm.",
          "hint": "Dùng exec 200>$LOCKFILE và flock -n 200 || exit 1.",
          "solutionCode": "#!/usr/bin/env bash\nset -euo pipefail\nLOCKFILE=\"/var/lock/backup_runner.lock\"\nexec 200>\"$LOCKFILE\"\nflock -n 200 || {\n  echo \"[ERROR] Một phiên sao lưu khác đang chạy. Dừng phiên mới.\" >&2\n  exit 1\n}\necho \"[INFO] Đã chiếm khóa thành công. Bắt đầu sao lưu...\"",
          "solutionOutput": "[INFO] Đã chiếm khóa thành công. Bắt đầu sao lưu...",
          "explanation": "Kỹ thuật gán file descriptor số 200 tới file lock và gọi flock -n 200 giúp script tự quản lý khóa nguyên tử ngay từ dòng đầu tiên mà không phụ thuộc crontab ngoài.",
          "annotations": [
            {
              "part": "exec 200>\"$LOCKFILE\"",
              "text": "Mở file descriptor số 200 gắn với file khóa."
            }
          ],
          "rubric": [
            {
              "criterion": "Cơ chế tự khóa",
              "pass": "Dùng flock bên trong script",
              "excellent": "Sử dụng file descriptor riêng 200 sạch sẽ và chuẩn mực",
              "weight": "50%"
            },
            {
              "criterion": "Bắt lỗi tranh chấp",
              "pass": "Thoát khi bị khóa",
              "excellent": "Xuất log lỗi ra stderr với exit code 1 chuẩn",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Kiểm thử khôi phục và xác thực mã băm SHA-256 tự động",
          "problem": "Viết kịch bản kiểm thử khôi phục tự động (Recovery Test) bằng cách lấy bản backup mới nhất, kiểm tra file mã băm .sha256 và giải nén thử nghiệm.",
          "hint": "Dùng sha256sum -c và giải nén thử vào thư mục tạm mktemp -d.",
          "solutionCode": "LATEST_PKG=$(ls -t /var/backups/backup-*.tar.gz | head -n 1)\nsha256sum -c \"${LATEST_PKG}.sha256\"\nTEST_DIR=$(mktemp -d)\ntar -tzf \"$LATEST_PKG\" > /dev/null\nrm -rf \"$TEST_DIR\"\necho \"[SUCCESS] Gói sao lưu $LATEST_PKG hoàn toàn nguyên vẹn.\"",
          "solutionOutput": "backup-2026-11-04.tar.gz: OK\n[SUCCESS] Gói sao lưu /var/backups/backup-2026-11-04.tar.gz hoàn toàn nguyên vẹn.",
          "explanation": "Bản sao lưu mà không được kiểm tra khôi phục định kỳ được coi là chưa tồn tại. Lệnh sha256sum -c xác nhận tính toàn vẹn và cờ -t của tar kiểm tra cấu trúc nén không bị hỏng.",
          "annotations": [
            {
              "part": "sha256sum -c",
              "text": "Đối chiếu mã băm tự động với tệp checksum lưu kèm."
            }
          ],
          "rubric": [
            {
              "criterion": "Kiểm thử khôi phục",
              "pass": "Kiểm tra file nén và sha256",
              "excellent": "Sử dụng mktemp -d và tar -tzf kiểm tra cấu trúc tệp",
              "weight": "50%"
            },
            {
              "criterion": "Tư duy Disaster Recovery",
              "pass": "Hiểu tầm quan trọng của kiểm thử",
              "excellent": "Xây dựng quy trình tự động hóa kiểm tra tính toàn vẹn",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Script sao lưu chuẩn công nghiệp bắt buộc phải có set -euo pipefail và trap cleanup để phòng vệ lỗi toàn diện.",
        "Mọi thao tác sao lưu phải đi kèm kiểm tra tính toàn vẹn dữ liệu bằng mã băm SHA256 (sha256sum).",
        "Cơ chế xoay vòng dữ liệu dựa trên mtime (find -mtime +7 -delete) giúp tự động cân bằng dung lượng đĩa lưu trữ.",
        "Luôn bọc lệnh chạy cron bằng flock -n để loại trừ triệt để nguy cơ hai tác vụ sao lưu chạy đè lên nhau gây nghẽn đĩa.",
        "Tuân thủ nguyên tắc 3-2-1: 3 bản sao chép, 2 loại phương tiện lưu trữ khác nhau, và 1 bản lưu ngoài hiện trường (offsite)."
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Chỉ sao lưu mà không bao giờ kiểm thử khôi phục (Restore Drill)",
            "content": "Nguyên lý bất biến của Kỹ sư Vận hành: <em>'Một bản sao lưu chưa từng được khôi phục thử nghiệm thì không được coi là bản sao lưu!'</em> Rất nhiều doanh nghiệp chỉ phát hiện bản backup bị lỗi mã hóa hoặc thiếu file khi thảm họa xảy ra. Luôn tự động hóa bước giải nén kiểm tra định kỳ."
          },
          {
            "title": "Lưu file backup trên cùng một ổ đĩa vật lý với dữ liệu gốc",
            "content": "Nếu ổ đĩa cứng của máy chủ bị cháy phần cứng (Hardware Failure), việc lưu file backup tại <code>/backup/</code> trên cùng ổ đĩa đó sẽ khiến cả dữ liệu gốc lẫn dữ liệu sao lưu mất sạch. Backup chuẩn phải được đẩy sang một ổ đĩa mạng NAS, S3 hoặc server độc lập khác."
          }
        ],
        "tips": [
          {
            "title": "Đặt tên file backup theo chuẩn thời gian ISO 8601",
            "content": "Luôn định dạng tên tệp theo cú pháp: <code>backup-$(date +%Y%m%d_%H%M%S).tar.gz</code>. Cách đặt tên này giúp các lệnh <code>ls</code> và <code>sort</code> tự động sắp xếp bản sao lưu theo đúng trình tự thời gian tuyệt đối."
          },
          {
            "title": "Tách bạch log sao lưu thành tệp riêng",
            "content": "Ghi toàn bộ lịch sử sao lưu vào <code>/var/log/backup_service.log</code> kèm dấu mốc thời gian để dễ dàng tích hợp vào hệ thống giám sát cảnh báo Prometheus/Zabbix."
          }
        ]
      },
      "generalInfo": {
        "duration": "60 phút",
        "targetAudience": "Sysadmin, DevOps Engineer, Lập trình viên Vận hành Hệ thống",
        "prerequisites": "Đã hoàn thành toàn bộ các bài 2.1 đến 2.8 (Bash scripting, cron, flock, SSH, quản lý đĩa)",
        "environment": "Máy chủ Linux hoặc máy ảo Ubuntu/Debian có cài tar, gzip, openssl, cron",
        "materials": "Terminal bash, quyền thực thi script, thư mục mô phỏng dữ liệu nguồn và đích"
      },
      "nextLessonPreview": "Trong Bài 2.10, chúng ta sẽ đúc kết toàn bộ hành trình Cấp độ 2 với Bảng Tra cứu Siêu tốc (Cheat Sheet) và Từ điển Thuật ngữ Quản trị Hệ thống Cốt lõi.",
      "quiz": [
        {
          "question": "Tổ hợp cờ 'set -euo pipefail' có tác dụng bảo vệ gì cho shell script sao lưu?",
          "options": [
            "Tăng tốc độ nén dữ liệu lên 2 lần",
            "Thoát ngay khi có lệnh lỗi (-e), khi dùng biến chưa khai báo (-u), và khi bất kỳ lệnh nào trong pipe gặp lỗi (pipefail)",
            "Tự động chạy script dưới quyền root",
            "Ngăn chặn người dùng đọc mã nguồn của script"
          ],
          "explanation": "Đây là 'chế độ nghiêm ngặt' (strict mode) của Bash, ngăn chặn script tiếp tục thực thi các bước nguy hiểm khi các bước trước đó đã thất bại ngầm.",
          "correctIndex": 1
        },
        {
          "question": "Tại sao nên lưu kèm một file .sha256 bên cạnh mỗi file nén .tar.gz trong thư mục backup?",
          "options": [
            "Để giải nén nhanh hơn",
            "Để sau này có thể kiểm tra tính toàn vẹn của tệp sao lưu, bảo đảm dữ liệu không bị hỏng do lỗi đĩa hay ghi thiếu",
            "Để tự động mã hóa tệp sao lưu",
            "Để phân loại file theo ngày tháng"
          ],
          "explanation": "sha256sum cho phép xác minh tính toàn vẹn từng bit dữ liệu. Nếu file backup bị hỏng một block trên đĩa, lệnh sha256sum -c sẽ lập tức cảnh báo FAILED.",
          "correctIndex": 1
        },
        {
          "question": "Trong kiến trúc sao lưu dữ liệu hạ tầng, nguyên tắc vàng 3-2-1 quy định điều gì?",
          "options": [
            "3 bản sao dữ liệu, trên 2 loại phương tiện lưu trữ khác nhau, với ít nhất 1 bản lưu tại địa điểm độc lập (Off-site / Cloud)",
            "3 ổ cứng, 2 máy chủ, 1 phần mềm sao lưu",
            "Sao lưu trong 3 giờ, lưu giữ trong 2 tuần, kiểm tra 1 lần mỗi tháng",
            "3 người quản trị nắm giữ 2 mật khẩu và 1 chìa khóa USB"
          ],
          "correctIndex": 0,
          "explanation": "Nguyên tắc 3-2-1 là tiêu chuẩn vàng quốc tế trong bảo vệ dữ liệu: ít nhất 3 bản sao, trên 2 loại thiết bị lưu trữ khác nhau, và 1 bản phải nằm tách biệt ngoài văn phòng/cloud."
        }
      ],
      "reflectionQuestion": "Một quản trị viên viết script sao lưu và đặt lịch cron chạy vào 01:00 AM mỗi ngày. Sau một tuần, dung lượng đĩa phân vùng `/backup` tăng vọt từ 20% lên 98% và hệ thống ngừng hoạt động. Khi kiểm tra, quản trị viên thấy lệnh `find /backup -name '*.tar.gz' -mtime +7 -delete` không xóa bất kỳ file nào mặc dù các file đã tạo từ 8 ngày trước. Hãy giải thích các nguyên nhân kỹ thuật có thể xảy ra với lệnh `find` trong trường hợp này.",
      "reflectionHint": "Gợi ý: Nguyên nhân 1: `mtime +7` trong `find` nghĩa là 'nghiêm ngặt lớn hơn 7 * 24 giờ' (tức là từ ngày thứ 8 hoặc 9 trở đi tùy thời điểm chạy lệnh). Nguyên nhân 2: File backup bị truy cập hoặc sửa đổi thuộc tính khiến mtime bị cập nhật lại. Nguyên nhân 3: Cú pháp tên file không khớp mẫu (ví dụ tên file có đuôi `.tgz` thay vì `.tar.gz`)."
    },
    {
      "id": "lx-2-10",
      "number": "2.10",
      "title": "Bảng tra cứu Lệnh & Thuật ngữ Cấp 2 (Cheat Sheet & Glossary)",
      "subtitle": "Sổ tay tra cứu nhanh toàn diện các lệnh xử lý văn bản, shell script, quản lý tiến trình, mạng và lưu trữ",
      "level": "Tra cứu",
      "duration": "30 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Ghi nhớ toàn bộ các lệnh trọng tâm của Cấp độ 2: grep, sed, awk, find, xargs, ps, kill, umask, ACL, cron, systemctl, ip, ss, df, du",
        "2. [Hiểu - Understand] Hiểu rõ sự liên kết kiến trúc giữa tiến trình, phân quyền, lập lịch và giám sát mạng",
        "3. [Vận dụng - Apply] Tra cứu và áp dụng nhanh cú pháp lệnh giải quyết các vấn đề vận hành khẩn cấp trong thực tế",
        "4. [Phân tích - Analyze] Phân tích và đối chiếu các cặp công cụ tương đương để chọn đúng công cụ tối ưu cho từng bài toán"
      ],
      "intuition": {
        "title": "Bản đồ quy hoạch tổng thể và Cẩm nang tác chiến SRE",
        "overview": "Bài học tổng kết này là cẩm nang bỏ túi tối thượng chứa toàn bộ lệnh thực chiến, mẫu regex kinh điển, bảng đối chiếu và từ điển thuật ngữ cốt lõi của Cấp độ 2.",
        "realWorld": "Trong các buổi phỏng vấn vị trí DevOps/SRE hoặc khi trực On-call giải quyết sự cố Production vào ban đêm, việc tra cứu nhanh cú pháp chuẩn và hiểu chính xác bản chất thuật ngữ giúp bạn khắc phục vấn đề trong thời gian ngắn nhất.",
        "metaphor": "Nếu các bài học trước là từng khối gạch xây dựng kiến thức, thì Cheat Sheet & Glossary là bản đồ quy hoạch tổng thể giúp bạn nhìn thấy toàn cảnh thành phố quản trị hệ thống.",
        "boundary": "Bài này đóng vai trò tra cứu và củng cố kiến thức Cấp độ 2; để tiếp tục tiến sâu vào tầng Kernel, tối ưu nhân và quản trị dịch vụ doanh nghiệp, học viên sẽ bước sang Cấp độ 3.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Bài học tổng kết này là cẩm nang bỏ túi tối thượng chứa toàn bộ lệnh thực chiến, mẫu regex kinh điển, bảng đối chiếu và từ điển thuật ngữ cốt lõi của Cấp độ 2.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>grep -E</code>:</strong> Lọc văn bản bằng Regex mở rộng</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>awk</code>:</strong> Trích xuất cột và xử lý dữ liệu bảng</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>find + xargs</code>:</strong> Tìm kiếm file và truyền đối số an toàn</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Trong các buổi phỏng vấn vị trí DevOps/SRE hoặc khi trực On-call giải quyết sự cố Production vào ban đêm, việc tra cứu nhanh cú pháp chuẩn và hiểu chính xác bản chất thuật ngữ giúp bạn khắc phục vấn đề trong thời gian ngắn nhất.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Bảng tra cứu Lệnh Xử lý Văn bản &amp; Regex</li><li><span class=\"lx-vs-bullet\">•</span> Bảng tra cứu Quản lý Tiến trình, Mạng &amp; Lưu trữ</li><li><span class=\"lx-vs-bullet\">•</span> Từ điển Thuật ngữ Quản trị Cốt lõi Cấp 2 (Glossary)</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Tổng hợp Lệnh Vận hành Trọng tâm Cấp độ 2",
          "content": "<p>Dưới đây là ma trận tra cứu nhanh các lệnh quản trị trung cấp thường dùng nhất trong thực tế vận hành:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Lệnh / Nhóm</th>\n            <th>Mục đích cốt lõi</th>\n            <th>Cú pháp phổ biến nhất</th>\n            <th>Ví dụ thực tế</th>\n            <th>Lưu ý quan trọng</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>grep -E</code></td>\n            <td>Lọc văn bản bằng Regex mở rộng</td>\n            <td><code>grep -E 'pattern' file</code></td>\n            <td><code>grep -E '50[0-4]' access.log</code></td>\n            <td>Nhanh hơn egrep cũ, hỗ trợ <code>+</code>, <code>?</code>, <code>|</code></td>\n          </tr>\n          <tr>\n            <td><code>awk</code></td>\n            <td>Trích xuất cột và xử lý dữ liệu bảng</td>\n            <td><code>awk '{print $col}' file</code></td>\n            <td><code>awk '{print $1, $9}' access.log</code></td>\n            <td>Mặc định phân tách cột bằng khoảng trắng</td>\n          </tr>\n          <tr>\n            <td><code>find + xargs</code></td>\n            <td>Tìm kiếm file và truyền đối số an toàn</td>\n            <td><code>find &lt;path&gt; -print0 | xargs -0 &lt;cmd&gt;</code></td>\n            <td><code>find /tmp -type f -name '*.tmp' -print0 | xargs -0 rm -f</code></td>\n            <td>Bắt buộc có <code>-print0</code> và <code>-0</code> để chống lỗi dấu cách</td>\n          </tr>\n          <tr>\n            <td><code>kill</code></td>\n            <td>Gửi tín hiệu điều khiển tiến trình</td>\n            <td><code>kill -&lt;SIGNAL&gt; &lt;PID&gt;</code></td>\n            <td><code>kill -15 1234</code></td>\n            <td>Luôn ưu tiên SIGTERM (15), chỉ dùng SIGKILL (9) khi bất khả kháng</td>\n          </tr>\n          <tr>\n            <td><code>ss</code></td>\n            <td>Khảo sát socket và cổng lắng nghe</td>\n            <td><code>ss -tulpn</code></td>\n            <td><code>sudo ss -tulpn | grep :443</code></td>\n            <td>Thay thế hoàn toàn <code>netstat</code> trên mọi distro hiện đại</td>\n          </tr>\n          <tr>\n            <td><code>df & du</code></td>\n            <td>Kiểm tra dung lượng đĩa và Inode</td>\n            <td><code>df -h</code> / <code>df -i</code></td>\n            <td><code>df -h /var</code></td>\n            <td>Nhớ kiểm tra cả Inode khi đĩa còn trống nhưng báo lỗi ghi</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>",
          "codeExamples": [
            {
              "lang": "CLI",
              "title": "Đường ống lọc log và đếm địa chỉ IP duy nhất",
              "code": "LC_ALL=C awk '{print $1}' /var/log/nginx/access.log | sort -u | wc -l",
              "output": "4218",
              "explanation": "Đường ống kết hợp awk lấy cột 1, sort -u chỉ giữ lại các địa chỉ IP duy nhất và wc -l đếm tổng số lượng khách truy cập riêng biệt."
            }
          ]
        },
        {
          "id": "sec-2-10-cheatsheet-text",
          "title": "4.1 Bảng tra cứu Lệnh Xử lý Văn bản & Regex",
          "content": "\n                  <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n                      <thead>\n                        <tr>\n                          <th>Lệnh &amp; Cú pháp</th>\n                          <th>Ý nghĩa &amp; Chức năng</th>\n                          <th>Ví dụ thực tế</th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td><code>grep -E \"p1|p2\" file</code></td>\n                          <td>Lọc dòng chứa pattern mở rộng (ERE)</td>\n                          <td><code>grep -E \"(ERROR|WARN)\" app.log</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>grep -rn --include=\"*.py\" str</code></td>\n                          <td>Tìm đệ quy trong file Python, in số dòng</td>\n                          <td><code>grep -rn --include=\"*.py\" \"secret\" .</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>sed -i.bak 's/old/new/g' file</code></td>\n                          <td>Thay thế chuỗi trực tiếp, tạo file backup</td>\n                          <td><code>sed -i.bak 's/DEBUG=True/DEBUG=False/' .env</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>awk '{print $1, $NF}' file</code></td>\n                          <td>In cột đầu tiên và cột cuối cùng của mỗi dòng</td>\n                          <td><code>awk '{print $1, $NF}' access.log</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>sort | uniq -c | sort -nr</code></td>\n                          <td>Đường ống đếm tần suất xuất hiện giảm dần</td>\n                          <td><code>awk '{print $1}' access.log | sort | uniq -c | sort -nr</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>cut -d':' -f1,7 /etc/passwd</code></td>\n                          <td>Cắt cột theo ký tự phân cách</td>\n                          <td>Lấy danh sách user và shell đăng nhập</td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </div>\n                "
        },
        {
          "id": "sec-2-10-cheatsheet-process",
          "title": "4.2 Bảng tra cứu Quản lý Tiến trình, Mạng & Lưu trữ",
          "content": "\n                  <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n                      <thead>\n                        <tr>\n                          <th>Lệnh &amp; Cú pháp</th>\n                          <th>Mục đích sử dụng</th>\n                          <th>Ghi chú quan trọng</th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td><code>ps aux --sort=-%cpu</code></td>\n                          <td>Tìm các tiến trình đang chiếm nhiều CPU nhất</td>\n                          <td>Xem cột STAT để biết tiến trình R hay D</td>\n                        </tr>\n                        <tr>\n                          <td><code>kill -15 [PID]</code></td>\n                          <td>Gửi tín hiệu SIGTERM yêu cầu kết thúc an toàn</td>\n                          <td>Luôn ưu tiên dùng trước khi kill -9</td>\n                        </tr>\n                        <tr>\n                          <td><code>nohup cmd > out.log 2>&1 &</code></td>\n                          <td>Chạy lệnh nền, không bị ngắt khi đóng SSH</td>\n                          <td>Nhớ thêm python3 -u nếu chạy script Python</td>\n                        </tr>\n                        <tr>\n                          <td><code>ss -tulpn</code></td>\n                          <td>Kiểm tra tất cả các cổng mạng đang mở</td>\n                          <td>Thêm grep :port để kiểm tra một cổng cụ thể</td>\n                        </tr>\n                        <tr>\n                          <td><code>df -h / &amp;&amp; df -i /</code></td>\n                          <td>Kiểm tra dung lượng đĩa và số lượng Inode</td>\n                          <td>Cạn Inode (100%) cũng gây lỗi đĩa đầy</td>\n                        </tr>\n                        <tr>\n                          <td><code>sudo lsof +L1</code></td>\n                          <td>Tìm các file đã bị xóa nhưng vẫn bị mở giữ</td>\n                          <td>Giải thích tại sao rm rồi mà đĩa không tăng</td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </div>\n                "
        },
        {
          "id": "sec-2-10-glossary",
          "title": "4.3 Từ điển Thuật ngữ Quản trị Cốt lõi Cấp 2 (Glossary)",
          "content": "\n                  <div class=\"lx-glossary-grid\">\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Inode (Index Node)</span>\n                        <span class=\"lx-glossary-cat\">Filesystem</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Cấu trúc dữ liệu của hệ thống file lưu trữ toàn bộ metadata của một tệp tin (phân quyền, chủ sở hữu, mốc thời gian, vị trí con trỏ trỏ tới các khối dữ liệu thực tế trên đĩa). Tên file không nằm trong inode mà nằm trong dentry.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">umask</span>\n                        <span class=\"lx-glossary-cat\">Security</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Mặt nạ nhị phân quy định các quyền hạn bị loại bỏ mặc định khi một file (666 - umask) hoặc thư mục (777 - umask) mới được tạo ra trên hệ thống.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">ACL (Access Control Lists)</span>\n                        <span class=\"lx-glossary-cat\">Security</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Cơ chế phân quyền nâng cao vượt qua giới hạn 3 lớp Owner/Group/Other của chuẩn POSIX, cho phép gán quyền đọc/ghi/thực thi chi tiết cho từng người dùng hoặc nhóm cụ thể.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Graceful Shutdown</span>\n                        <span class=\"lx-glossary-cat\">Process</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Quy trình kết thúc tiến trình êm đẹp khi nhận tín hiệu SIGTERM (15): ứng dụng hoàn thành nốt các request dở dang, đóng kết nối database, giải phóng socket mạng rồi mới thoát, ngăn chặn hỏng dữ liệu.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">flock (File Lock)</span>\n                        <span class=\"lx-glossary-cat\">Automation</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Cơ chế khóa tệp ở cấp độ hệ điều hành dùng để đồng bộ hóa, đảm bảo tại một thời điểm chỉ có duy nhất một tiến trình được phép chạy, ngăn chặn tác vụ cron định kỳ bị chồng chéo nhau.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Zombie Process</span>\n                        <span class=\"lx-glossary-cat\">Kernel</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Tiến trình con đã kết thúc thực thi nhưng tiến trình cha chưa gọi hàm wait() để giải phóng cấu trúc task_struct khỏi bảng tiến trình của Kernel. Ký hiệu trạng thái là Z.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">RES vs VIRT</span>\n                        <span class=\"lx-glossary-cat\">Memory</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">VIRT (Virtual Memory) là tổng không gian địa chỉ ảo tiến trình đăng ký; RES (Resident Set Size) là dung lượng bộ nhớ RAM vật lý thực tế mà tiến trình đang chiếm giữ trong chip nhớ.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Open File Descriptor</span>\n                        <span class=\"lx-glossary-cat\">Kernel I/O</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Mã số nguyên do Kernel cấp phát khi một tiến trình mở tệp. Nếu tệp bị xóa bằng rm nhưng file descriptor vẫn mở, Kernel sẽ giữ nguyên dữ liệu trên đĩa cho tới khi tiến trình đóng file.</p>\n                    </div>\n                  </div>\n                "
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Kết hợp chuỗi lệnh Cấp 2 xử lý sự cố máy chủ nghẽn CPU</h4>\n      <p>Quy trình chẩn đoán 3 bước nhanh của kỹ sư SRE:</p>\n      <pre><code># Bước 1: Tìm ngay top 5 tiến trình ăn nhiều CPU nhất\nps -eo pid,ppid,cmd,%cpu,%mem --sort=-%cpu | head -n 6\n\n# Bước 2: Kiểm tra tiến trình đó đang mở các cổng mạng nào\nsudo ss -tulpn | grep &lt;PID&gt;\n\n# Bước 3: Gửi tín hiệu dừng an toàn SIGTERM (15)\nkill -15 &lt;PID&gt;</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Dập tắt tiến trình cẩu thả</div>\n          <pre><code># Nguy hiểm:\nkill -9 $(pgrep mysql)</code></pre>\n          <p class=\"lx-diff-desc\">SIGKILL (9) cưỡng bức tiến trình chết ngay lập tức, khiến MySQL không kịp xả bộ nhớ đệm (buffer pool) xuống đĩa, làm hỏng bảng dữ liệu InnoDB!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Dừng tiến trình chuẩn mực</div>\n          <pre><code># An toàn:\nsudo systemctl stop mysql\n# Hoặc nếu tiến trình độc lập:\nkill -15 &lt;PID&gt;</code></pre>\n          <p class=\"lx-diff-desc\">Cho phép tiến trình dọn dẹp kết nối, ghi tệp trạng thái và đóng an toàn trước khi dừng hẳn.</p>\n        </div>\n      </div>\n    </div>",
          "codeExamples": [
            {
              "lang": "CLI",
              "title": "Khảo sát tiến trình chiếm nhiều RAM nhất hệ thống",
              "code": "ps aux --sort=-%mem | head -n 6",
              "output": "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\npostgres  1120  0.5 12.4 845210 256100 ?       Ss   08:00   1:15 /usr/lib/postgresql/16/bin/postgres\nredis     1040  0.2  6.8 320140 140200 ?       Ssl  08:00   0:30 /usr/bin/redis-server\nnginx     1240  0.1  2.1 125400  43200 ?       S    08:00   0:12 nginx: worker process",
              "explanation": "Lệnh ps aux với cờ sắp xếp --sort=-%mem liệt kê chính xác các tiến trình đang chiếm dụng bộ nhớ RAM theo thứ tự giảm dần."
            }
          ]
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Thử thách Tra cứu & Giải đố Tình huống Cấp độ 2",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 2.10</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Vận dụng bảng Cheat Sheet để giải quyết nhanh 3 yêu cầu quản trị thực tế mà không cần tìm kiếm trên Google.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Terminal Linux bất kỳ.</li>\n        <li>Tạo thư mục làm việc: <code>mkdir -p ~/review-lab && cd ~/review-lab</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Yêu cầu 1: Tìm tất cả các file có phần mở rộng <code>.log</code> trong <code>/var/log</code> được sửa đổi trong vòng 60 phút qua và có dung lượng lớn hơn 1MB:\n          <pre><code>sudo find /var/log -type f -name \"*.log\" -mmin -60 -size +1M</code></pre>\n        </li>\n        <li>Yêu cầu 2: Xem địa chỉ IP của card mạng chính ở dạng màu sắc sinh động:\n          <pre><code>ip -c a</code></pre>\n        </li>\n        <li>Yêu cầu 3: Tìm xem tiến trình nào đang chiếm giữ cổng 22 (SSH):\n          <pre><code>sudo ss -tulpn | grep :22</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Cả 3 lệnh thực thi nhanh chóng, trả về kết quả chính xác theo đúng cú pháp chuẩn mà không gặp lỗi cú pháp.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Tự viết một tệp alias trong <code>~/.bashrc</code> cho các tổ hợp lệnh thường dùng như <code>ps-top</code>, <code>ports</code>, <code>disk-free</code>.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Khi sử dụng các lệnh tra cứu với quyền <code>sudo</code>, luôn kiểm tra kỹ cú pháp trước khi nhấn Enter để tránh chạy nhầm lệnh phá hủy hệ thống.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Nhầm lẫn giữa tín hiệu SIGKILL (9) và SIGTERM (15)</strong></td><td>Lạm dụng <code>kill -9</code> dẫn đến hỏng cấu trúc tệp dữ liệu, để lại socket mồ côi và lock file chưa được giải phóng.</td><td>Luôn luôn gửi <code>kill -15</code> trước, chờ 10-15 giây, nếu tiến trình bị treo cứng (uninterruptible sleep) mới cân nhắc dùng <code>kill -9</code>.</td></tr>\n          <tr><td><strong>Quên dấu ngoặc kép khi truyền biến chứa khoảng trắng vào lệnh Bash</strong></td><td>Word splitting làm biến bị phân rã thành nhiều tham số riêng biệt, dẫn đến lỗi cú pháp hoặc xóa nhầm file ngoài ý muốn.</td><td>Luôn bao bọc biến trong ngoặc kép kép: <code>\"$MY_VAR\"</code>.</td></tr>\n          <tr><td><strong>Sửa file cấu hình hệ thống (/etc/fstab, /etc/sudoers) bằng text editor thông thường mà không kiểm tra cú pháp</strong></td><td>Hệ thống không thể boot vào OS hoặc mất hoàn toàn quyền sudo.</td><td>Luôn dùng các công cụ kiểm tra chuyên dụng như <code>visudo</code> cho sudoers và <code>mount -a</code> trước khi reboot khi sửa fstab.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Nguyên tắc đặc quyền tối thiểu (Least Privilege):</strong> Không đăng nhập và làm việc trực tiếp bằng tài khoản <code>root</code>. Luôn sử dụng tài khoản cá nhân có quyền <code>sudo</code> và chỉ dùng sudo khi thực sự cần thay đổi cấu hình hệ thống.</li>\n        <li><strong>Sao lưu trước khi chỉnh sửa bất kỳ tệp cấu hình nào:</strong> Quy tắc vàng của Sysadmin: Luôn tạo bản sao lưu với đuôi <code>.bak.$(date +%F)</code> trước khi mở vim/nano sửa đổi bất kỳ tệp nào trong <code>/etc/</code>.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Linux Foundation Certified System Administrator (LFCS):</strong> <a href=\"https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/\" target=\"_blank\" rel=\"noopener\">LFCS Certification Exam Guide</a>.</li>\n      <li><strong>Linux Professional Institute LPIC-1:</strong> <a href=\"https://www.lpi.org/our-certifications/lpic-1-overview/\" target=\"_blank\" rel=\"noopener\">LPIC-1 Exam Objectives</a>.</li>\n      <li><strong>ExplainShell:</strong> Giải thích chi tiết từng cờ lệnh Linux trực quan: <a href=\"https://explainshell.com\" target=\"_blank\" rel=\"noopener\">explainshell.com</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Mã Tín hiệu Linux Signals Phổ biến",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Số tín hiệu</th><th>Tên tín hiệu</th><th>Hành vi mặc định</th><th>Phím tắt Terminal</th></tr></thead>\n        <tbody>\n          <tr><td>1</td><td>SIGHUP</td><td>Tải lại cấu hình (Reload) mà không tắt app</td><td>-</td></tr>\n          <tr><td>2</td><td>SIGINT</td><td>Ngắt tiến trình an toàn từ bàn phím</td><td>Ctrl + C</td></tr>\n          <tr><td>3</td><td>SIGQUIT</td><td>Thoát tiến trình và tạo core dump</td><td>Ctrl + \\</td></tr>\n          <tr><td>9</td><td>SIGKILL</td><td>Cưỡng bức tiêu diệt tiến trình lập tức (Không thể chặn)</td><td>-</td></tr>\n          <tr><td>15</td><td>SIGTERM</td><td>Yêu cầu kết thúc lịch sự (Graceful Shutdown)</td><td>-</td></tr>\n          <tr><td>19</td><td>SIGSTOP</td><td>Tạm dừng tiến trình tức thì (Không thể chặn)</td><td>Ctrl + Z (SIGTSTP)</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "exercises": [
        {
          "level": "Dễ",
          "title": "Tra cứu danh sách file log lớn hơn 50MB và sắp xếp theo dung lượng",
          "problem": "Khi cần dọn dẹp dung lượng đĩa, hãy viết câu lệnh một dòng để tìm tất cả các file có đuôi .log trong /var/log/ có kích thước trên 50MB và sắp xếp theo dung lượng giảm dần.",
          "hint": "Sử dụng find /var/log -type f -name \"*.log\" -size +50M kết hợp xargs ls -lhS.",
          "solutionCode": "find /var/log -type f -name \"*.log\" -size +50M -print0 | xargs -0 ls -lhS",
          "solutionOutput": "-rw-r----- 1 root adm 185M Nov 4 08:30 /var/log/nginx/access.log\n-rw-r----- 1 root adm  72M Nov 3 23:59 /var/log/syslog.1",
          "explanation": "Cờ ls -lhS sắp xếp danh sách file theo thứ tự kích thước giảm dần với dung lượng hiển thị dưới dạng con người dễ đọc (MB, GB).",
          "annotations": [
            {
              "part": "ls -lhS",
              "text": "Cờ S (viết hoa) sắp xếp theo kích thước từ lớn đến nhỏ."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp lệnh",
              "pass": "Dùng find lọc theo kích thước",
              "excellent": "Kết hợp xargs ls -lhS hiển thị trực quan",
              "weight": "50%"
            },
            {
              "criterion": "An toàn null-byte",
              "pass": "Dùng -print0 và -0",
              "excellent": "Không bị lỗi ngắt dòng khi đường dẫn có khoảng trắng",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Kiểm tra quyền hạn ACL chi tiết của tệp cấu hình bảo mật",
          "problem": "Lệnh nào sau đây dùng để kiểm tra xem một tệp cấu hình có gắn thêm các quyền mở rộng ACL cho người dùng hoặc nhóm nào hay không?",
          "hint": "Sử dụng lệnh getfacl để xem toàn bộ danh sách điều khiển truy cập của tệp.",
          "solutionCode": "getfacl /etc/app.conf",
          "solutionOutput": "# file: /etc/app.conf\n# owner: root\n# group: admin\nuser::rw-\nuser:deploy:r--\ngroup::r--\nmask::r--\nother::---",
          "explanation": "Lệnh getfacl hiển thị chi tiết mọi quyền bổ sung ngoài bộ quyền tiêu chuẩn POSIX. Dấu cộng (+) ở cuối chuỗi quyền khi gõ ls -l là dấu hiệu nhận biết tệp có gắn ACL.",
          "annotations": [
            {
              "part": "getfacl",
              "text": "Tiện ích tra cứu danh sách POSIX Access Control List của tệp."
            }
          ],
          "rubric": [
            {
              "criterion": "Tra cứu ACL",
              "pass": "Dùng đúng getfacl",
              "excellent": "Phân tích được ý nghĩa dòng mask:: trong đầu ra",
              "weight": "50%"
            },
            {
              "criterion": "Phát hiện quyền",
              "pass": "Biết cách nhận diện dấu +",
              "excellent": "So sánh được quyền hạn của các user bổ sung",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Tính tổng dung lượng thư mục log bằng lệnh kết hợp awk",
          "problem": "Viết câu lệnh một dòng kết hợp awk để tính tổng dung lượng (tính bằng byte và MB) của tất cả các file thông thường nằm trực tiếp trong thư mục /var/log.",
          "hint": "Dùng ls -l bỏ dòng tiêu đề NR > 1 và cộng dồn cột thứ 5 vào biến sum.",
          "solutionCode": "ls -l /var/log | awk 'NR > 1 && !/^d/ {sum += $5} END {printf \"Tổng dung lượng: %.2f MB (%.0f bytes)\\n\", sum/1024/1024, sum}'",
          "solutionOutput": "Tổng dung lượng: 245.82 MB (257762304 bytes)",
          "explanation": "Biến $5 trong ls -l đại diện cho kích thước tệp tính theo byte. Điều kiện !/^d/ lọc bỏ các thư mục con để chỉ tính đúng dung lượng của các tệp tin.",
          "annotations": [
            {
              "part": "NR > 1 && !/^d/",
              "text": "Bỏ qua dòng total đầu tiên và lọc bỏ các thư mục bắt đầu bằng d."
            }
          ],
          "rubric": [
            {
              "criterion": "Xử lý awk",
              "pass": "Cộng dồn đúng cột $5",
              "excellent": "Định dạng đầu ra với printf thành đơn vị MB trực quan",
              "weight": "50%"
            },
            {
              "criterion": "Lọc dữ liệu",
              "pass": "Bỏ qua dòng tiêu đề",
              "excellent": "Loại trừ thư mục con bằng regex không bắt đầu bằng d",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Cấp độ 2 trang bị toàn diện kỹ năng quản trị trung cấp: Xử lý văn bản dữ liệu (grep, sed, awk), điều phối file (find, xargs), kiểm soát tiến trình (ps, kill, signal).",
        "Lập trình Bash thực chiến đòi hỏi tuân thủ nghiêm ngặt cờ phòng vệ set -euo pipefail và cơ chế trap dọn dẹp.",
        "Tự động hóa tác vụ định kỳ phải kết hợp crontab với khóa flock -n để loại bỏ xung đột dữ liệu.",
        "Mạng hiện đại được kiểm soát bởi bộ công cụ iproute2 (ip, ss) và bảo mật kết nối với SSH Ed25519.",
        "Quản lý lưu trữ đòi hỏi sự hiểu biết sâu sắc về cả hai phương diện: dung lượng khối lưu trữ (Blocks) và chỉ mục tệp tin (Inodes)."
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Chạy sed -i trên file symlink làm biến liên kết thành file thường",
            "content": "Mặc định <code>sed -i</code> sẽ xóa file symlink và tạo ra một file vật lý mới độc lập cùng tên! Điều này làm đứt gãy kiến trúc liên kết symlink trong hệ thống. Luôn truyền thêm cờ <code>--follow-symlinks</code> nếu bạn muốn sửa trực tiếp file đích thông qua symlink."
          },
          {
            "title": "Khởi động lại máy chủ ngay sau khi sửa file /etc/fstab",
            "content": "Không bao giờ được phép reboot máy chủ khi vừa sửa fstab mà chưa chạy lệnh <code>sudo mount -a</code>. Một lỗi cú pháp nhỏ sẽ khiến máy chủ không thể khởi động lại qua mạng và bạn sẽ mất quyền truy cập SSH."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng tldr để tra cứu nhanh cờ lệnh xargs, find, awk",
            "content": "Khi quên cú pháp phức tạp của awk hay xargs, gõ <code>tldr xargs</code> hoặc <code>tldr find</code> để nhận ngay các ví dụ thực chiến thông dụng nhất."
          },
          {
            "title": "Tạo snapshot VM trước khi bước sang Cấp 3",
            "content": "Kết thúc Cấp 2, bạn đã nắm vững quản trị hệ thống và shell scripting. Hãy tạo một Snapshot VM mang tên 'Cap2-Completed' để chuẩn bị cho Cấp 3 học về LVM, Tường lửa nftables và SELinux/AppArmor."
          }
        ]
      },
      "generalInfo": {
        "duration": "40 phút",
        "targetAudience": "Tất cả học viên Cấp độ 2, Kỹ sư chuẩn bị thi chứng chỉ LPIC-1/LFCS",
        "prerequisites": "Đã hoàn thành các bài học từ 2.1 đến 2.9",
        "environment": "Bất kỳ môi trường Linux nào (Terminal, WSL, Server)",
        "materials": "Tài liệu tra cứu nhanh, bảng lệnh Cheat Sheet và Từ điển thuật ngữ"
      },
      "nextLessonPreview": "Xin chúc mừng! Bạn đã hoàn thành xuất sắc Cấp độ 2. Ở Cấp độ 3: Quản trị Nâng cao & Tối ưu Hiệu năng, chúng ta sẽ làm chủ systemd chuyên sâu, LVM, RAID, nftables, tường lửa nâng cao và chuẩn đoán hiệu năng hệ thống với USE Method.",
      "quiz": [
        {
          "question": "Tín hiệu Linux nào sau đây không thể bị tiến trình bỏ qua (ignored) hoặc bắt giữ (caught) bằng code?",
          "options": [
            "SIGKILL (9) và SIGSTOP (19)",
            "SIGTERM (15) và SIGINT (2)",
            "SIGHUP (1) và SIGQUIT (3)",
            "SIGUSR1 và SIGUSR2"
          ],
          "explanation": "Kernel xử lý trực tiếp SIGKILL (9) và SIGSTOP (19); tiến trình không có cơ hội chặn, xử lý hay bỏ qua hai tín hiệu này.",
          "correctIndex": 0
        },
        {
          "question": "Tùy chọn nào của lệnh find kết hợp hoàn hảo nhất với 'xargs -0' để xử lý các tên tệp có chứa dấu cách hoặc ký tự đặc biệt?",
          "options": [
            "-print0",
            "-print",
            "-name",
            "-type"
          ],
          "explanation": "-print0 sử dụng ký tự byte rỗng (null byte \\0) làm dấu phân cách tệp tin, tương ứng chính xác với cờ -0 của xargs.",
          "correctIndex": 0
        },
        {
          "question": "Sự khác biệt cốt lõi giữa tín hiệu SIGTERM (15) và SIGKILL (9) trong Linux là gì?",
          "options": [
            "SIGTERM yêu cầu tiến trình tự dọn dẹp tài nguyên và tắt an toàn (có thể bắt được), còn SIGKILL do kernel trực tiếp hủy tiến trình lập tức (không thể bắt hay bỏ qua)",
            "SIGTERM chỉ dành cho tiến trình root, SIGKILL dành cho người dùng thông thường",
            "SIGKILL an toàn hơn SIGTERM vì không bao giờ làm hỏng database",
            "Hai tín hiệu này hoàn toàn giống nhau, chỉ khác mã số"
          ],
          "correctIndex": 0,
          "explanation": "SIGTERM (15) cho phép tiến trình dọn dẹp và kết thúc có trật tự. SIGKILL (9) là phán quyết tối hậu của kernel, tiến trình bị triệt tiêu ngay lập tức mà không có cơ hội lưu trữ hay đóng file."
        }
      ],
      "reflectionQuestion": "Một ứng viên phỏng vấn vị trí Senior DevOps được hỏi: 'Tại sao trong các script tự động hóa production, các kỹ sư luôn dùng `find ... -print0 | xargs -0 ...` thay vì dùng vòng lặp `for file in $(find ...)` thông thường?'. Hãy trả lời câu hỏi này dưới góc độ kỹ thuật sâu sắc nhất.",
      "reflectionHint": "Gợi ý: Trả lời theo 3 luận điểm: 1. Khoảng trắng và ký tự đặc biệt: Vòng lặp `for in $(...)` bị ảnh hưởng bởi biến IFS (mặc định ngắt theo khoảng trắng/newline), nếu tên file có dấu cách sẽ bị tách thành nhiều file hỏng; trong khi `\\0` là ký tự duy nhất không bao giờ xuất hiện trong tên file Linux. 2. Giới hạn đối số (ARG_MAX): Nếu thư mục có hàng trăm ngàn file, `$(...)` sẽ làm tràn bộ nhớ shell hoặc báo lỗi 'Argument list too long', còn `xargs` tự động phân mảnh danh sách đối số thành nhiều đợt an toàn. 3. Hiệu năng fork: `xargs` thực thi theo lô (batch), giảm số lượng process fork so với vòng lặp từng file."
    }
  ]
};
