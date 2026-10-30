/**
 * Dữ liệu Giáo trình Linux Thực chiến & Nội bộ HĐH: CẤP 2 – TRUNG CẤP
 * Thiết kế cho lập trình viên Python & kỹ sư vận hành hệ thống (DevOps/SysAdmin)
 */

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
        "Làm chủ grep với regex mở rộng (-E, -i, -v, -n, -c, -o, -l) để bóc tách log lỗi chính xác.",
        "Nắm vững nguyên lý chỉnh sửa dòng lệnh một chiều của sed (thay thế chuỗi, in chọn lọc, chỉnh sửa file an toàn với cờ sao lưu).",
        "Hiểu mô hình Record/Field của awk và cấu trúc BEGIN { } { } END { } để tính toán dữ liệu dạng cột.",
        "Kết hợp chuỗi đường ống pipe: cut, tr, sort, uniq, wc để thống kê tần suất truy cập máy chủ trong vài giây."
      ],
      "intuition": {
        "title": "Nhà máy lọc dầu và Dây chuyền chiết tách tạp chất",
        "metaphor": "Hãy tưởng tượng một file log máy chủ nặng vài GB giống như một thùng dầu thô chứa đầy tạp chất hỗn độn. Các công cụ xử lý văn bản Linux là những trạm lọc trên dây chuyền công nghiệp: grep giống như lưới lọc chỉ giữ lại những giọt dầu mang nhãn ERROR; cut và awk giống như lưỡi dao chính xác gọt bỏ phần thừa, chỉ lấy đúng cột địa chỉ IP và mã trạng thái HTTP; sort sắp xếp các hạt phân tử theo thứ tự số lượng; và uniq đếm xem mỗi địa chỉ IP xuất hiện bao nhiêu lần. Dữ liệu đi vào thô ráp nhưng sau một đường ống pipe duy nhất, kết quả đầu ra là một bản báo cáo tinh chế hoàn hảo.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔍</span>\n                    <span>GREP • SED • AWK</span>\n                    <span class=\"lx-vs-tag\">Xử lý dòng</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>grep:</strong> Chuyên LỌC DÒNG (Line Filtering) theo mẫu khớp Regex.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>sed:</strong> Chuyên BIẾN ĐỔI CHUỖI (Stream Editing) và thay thế từ ngữ theo quy tắc.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>awk:</strong> Chuyên XỬ LÝ CỘT & BÁO CÁO (Columnar Processing) với đầy đủ biến và logic tính toán.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚡</span>\n                    <span>CUT • SORT • UNIQ</span>\n                    <span class=\"lx-vs-tag\">Thống kê</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>cut:</strong> Bổ tách chuỗi theo ký tự phân tách (Delimiter -d).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>sort:</strong> Sắp xếp dữ liệu (chữ cái hoặc số thực -n, đảo ngược -r).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>uniq -c:</strong> Gom các dòng GIỐNG NHAU ĐỨNG CẠNH NHAU và đếm số lượng.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-1-grep",
          "title": "1. Khai phá sức mạnh grep & Biểu thức chính quy (Regex)",
          "content": "\n                  <p><code>grep</code> (Global Regular Expression Print) là lệnh tìm kiếm dòng văn bản dựa trên mẫu khớp. Trên môi trường thực tế, log hệ thống có thể lên tới hàng triệu dòng, việc cuộn chuột tìm bằng mắt là bất khả thi.</p>\n                  <p>Các cờ tùy chọn sống còn của <code>grep</code>:</p>\n                  <ul>\n                    <li><code>-i</code>: Không phân biệt chữ hoa chữ thường (case-insensitive).</li>\n                    <li><code>-v</code>: Đảo ngược kết quả — chỉ in những dòng <strong>KHÔNG</strong> khớp mẫu.</li>\n                    <li><code>-n</code>: Hiển thị kèm số thứ tự dòng trong file để tiện mở trình soạn thảo.</li>\n                    <li><code>-c</code>: Chỉ đếm số dòng khớp thay vì in toàn bộ nội dung.</li>\n                    <li><code>-E</code>: Bật biểu thức chính quy mở rộng (ERE) hỗ trợ các toán tử <code>|</code>, <code>+</code>, <code>?</code>, <code>()</code>.</li>\n                    <li><code>-r</code> hoặc <code>-R</code>: Tìm kiếm đệ quy xuyên qua mọi thư mục con.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Lọc log lỗi ứng dụng Python và Nginx",
              "code": "# Tìm các dòng có chữ ERROR hoặc CRITICAL trong file log ứng dụng Python\ngrep -E \"(ERROR|CRITICAL)\" /var/log/my_app.log\n\n# Tìm tất cả file Python trong dự án có gọi hàm eval (nguy cơ bảo mật)\ngrep -rn --include=\"*.py\" \"eval(\" ./src/\n\n# Đếm số lượng request bị lỗi 500 trong file access.log\ngrep -c \" 500 \" /var/log/nginx/access.log",
              "annotations": [
                {
                  "line": 2,
                  "part": "-E",
                  "text": "Kích hoạt Extended Regex để sử dụng toán tử hoặc (|) giữa ERROR và CRITICAL."
                },
                {
                  "line": 5,
                  "part": "-rn",
                  "text": "Tìm đệ quy (-r) và in kèm số dòng (-n); cờ --include chỉ quét các file có đuôi .py."
                },
                {
                  "line": 8,
                  "part": "-c",
                  "text": "Đếm số lần xuất hiện mã HTTP 500 thay vì in ra màn hình làm ngợp terminal."
                }
              ],
              "output": "./src/auth.py:42:    user_data = eval(request.body)\n./src/utils.py:108:   res = eval(f\"{op}({val})\")\n328"
            }
          ]
        },
        {
          "id": "sec-2-1-sed",
          "title": "2. Biên tập luồng văn bản với sed (Stream Editor)",
          "content": "\n                  <p><code>sed</code> là trình biên tập luồng dữ liệu đọc từng dòng từ stdin hoặc file, áp dụng các lệnh biến đổi, rồi xuất kết quả ra stdout mà không cần mở file tương tác như nano hay vim.</p>\n                  <p>Cú pháp thay thế kinh điển: <code>sed 's/tìm_gì/thay_bằng_gì/g' file.txt</code> (trong đó <code>s</code> là substitute, <code>g</code> là global - thay thế mọi vị trí trên cùng một dòng).</p>\n                  <div class=\"callout-box info-box\">\n                    <div class=\"callout-title\">💡 Mẹo an toàn khi sửa file trực tiếp bằng sed -i</div>\n                    <p>Khi dùng cờ <code>-i</code> (in-place) để sửa trực tiếp file, nếu viết nhầm regex bạn có thể làm hỏng toàn bộ tệp cấu hình. Luôn luôn truyền đuôi sao lưu, ví dụ: <code>sed -i.bak 's/...' config.env</code>. Lệnh sẽ tự động tạo một file <code>config.env.bak</code> nguyên bản trước khi ghi đè!</p>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Thay thế cấu hình cổng kết nối và xóa dòng comment",
              "code": "# Thay thế chuỗi PORT=8000 thành PORT=8080 trong file cấu hình .env (kèm backup)\nsed -i.bak 's/PORT=8000/PORT=8080/g' .env\n\n# Lọc bỏ các dòng comment bắt đầu bằng dấu # và các dòng trống\nsed -e '/^#/d' -e '/^$/d' /etc/nginx/nginx.conf\n\n# Trích xuất chính xác từ dòng 10 đến dòng 20 của file log\nsed -n '10,20p' /var/log/syslog",
              "annotations": [
                {
                  "line": 2,
                  "part": "-i.bak",
                  "text": "Sửa trực tiếp file .env và tự động tạo file dự phòng .env.bak."
                },
                {
                  "line": 5,
                  "part": "/^#/d",
                  "text": "Mẫu regex: dòng bắt đầu bằng dấu # (^) thì xóa (d = delete); /^$/d xóa dòng hoàn toàn trống."
                },
                {
                  "line": 8,
                  "part": "-n '10,20p'",
                  "text": "Cờ -n tắt tự động in mọi dòng, chỉ in (p = print) các dòng từ 10 đến 20."
                }
              ],
              "output": "server {\n    listen 80;\n    server_name example.com;\n}"
            }
          ]
        },
        {
          "id": "sec-2-1-awk",
          "title": "3. Xử lý dữ liệu dạng cột và tính toán với awk",
          "content": "\n                  <p><code>awk</code> là một ngôn ngữ lập trình hoàn chỉnh chuyên dụng để xử lý văn bản theo dạng bảng cột. Mặc định <code>awk</code> coi khoảng trắng hoặc tab là ký tự phân tách cột.</p>\n                  <p>Các biến đặc biệt trong <code>awk</code>:</p>\n                  <ul>\n                    <li><code>$0</code>: Đại diện cho toàn bộ dòng hiện tại.</li>\n                    <li><code>$1, $2, ... $N</code>: Đại diện cho cột thứ nhất, thứ hai, thứ N trên dòng.</li>\n                    <li><code>$NF</code>: Cột cuối cùng của dòng (Number of Fields - cực kỳ hữu ích khi số lượng cột thay đổi).</li>\n                    <li><code>NR</code>: Số thứ tự dòng hiện tại (Number of Records).</li>\n                    <li><code>FS</code>: Ký tự phân cách cột đầu vào (Field Separator, đổi bằng cờ <code>-F</code>).</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Trích xuất cột và tính toán dung lượng với awk",
              "code": "# Lấy danh sách tên người dùng và shell đăng nhập từ file /etc/passwd (ngăn cách bằng dấu :)\nawk -F: '{print $1 \" -> \" $7}' /etc/passwd\n\n# Lọc các dòng trong access.log có mã HTTP phản hồi là 404 (cột thứ 9 trong log Nginx chuẩn)\nawk '$9 == 404 {print $1, $7, $9}' /var/log/nginx/access.log\n\n# Tính tổng dung lượng các file log trong thư mục (cột thứ 5 của lệnh ls -l)\nls -l /var/log | awk 'NR > 1 {sum += $5} END {print \"Tổng dung lượng: \" sum / (1024*1024) \" MB\"}'",
              "annotations": [
                {
                  "line": 2,
                  "part": "-F:",
                  "text": "Khai báo ký tự phân cách cột là dấu hai chấm thay vì khoảng trắng mặc định."
                },
                {
                  "line": 5,
                  "part": "$9 == 404",
                  "text": "Điều kiện logic kiểm tra giá trị cột thứ 9 (HTTP status code) bằng đúng 404."
                },
                {
                  "line": 8,
                  "part": "BEGIN/END",
                  "text": "NR > 1 bỏ qua dòng header đầu tiên; khối END được chạy 1 lần duy nhất sau khi duyệt hết mọi dòng để in tổng kết."
                }
              ],
              "output": "root -> /bin/bash\nwww-data -> /usr/sbin/nologin\n192.168.1.50 /api/v1/users 404\nTổng dung lượng: 45.2 MB"
            }
          ]
        },
        {
          "id": "sec-2-1-pipeline",
          "title": "4. Tuyệt kỹ đường ống: sort, uniq, cut, tr & wc",
          "content": "\n                  <p>Sức mạnh thực sự của Linux bùng nổ khi bạn kết nối các lệnh nhỏ lại với nhau qua đường ống <code>|</code> (pipe). Dữ liệu xuất ra của lệnh này trở thành dữ liệu nạp vào của lệnh kế tiếp.</p>\n                  <div class=\"callout-box warning-box\">\n                    <div class=\"callout-title\">⚠️ Cạm bẫy kinh điển với lệnh uniq</div>\n                    <p>Lệnh <code>uniq</code> chỉ có thể lọc các dòng trùng lặp nếu chúng <strong>NẰM LIỀN KỀ NHAU</strong>! Nếu file có dòng 'abc' ở dòng 1 và 'abc' ở dòng 50, <code>uniq</code> sẽ không phát hiện ra. Vì vậy, quy tắc bất thành văn trong Linux là: <strong>LUÔN DÙNG sort TRƯỚC KHI DÙNG uniq</strong> (<code>sort | uniq -c</code>).</p>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Truy tìm Top 10 địa chỉ IP gửi request nhiều nhất đến server",
              "code": "# Bước 1: awk lấy cột IP đầu tiên ($1)\n# Bước 2: sort sắp xếp theo thứ tự bảng chữ cái\n# Bước 3: uniq -c đếm số lần xuất hiện của từng IP\n# Bước 4: sort -nr sắp xếp theo số lượng đếm giảm dần (numeric reverse)\n# Bước 5: head -n 10 lấy đúng 10 địa chỉ đứng đầu\nawk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 10",
              "annotations": [
                {
                  "line": 6,
                  "part": "awk '{print $1}'",
                  "text": "Bóc tách địa chỉ IP client ở cột 1 của log Nginx."
                },
                {
                  "line": 6,
                  "part": "sort | uniq -c",
                  "text": "Sắp xếp để các IP giống nhau nằm cạnh nhau, sau đó uniq -c đếm số lượng truy cập."
                },
                {
                  "line": 6,
                  "part": "sort -nr",
                  "text": "Sắp xếp lại theo cột số đếm (-n) từ lớn xuống bé (-r) để IP tấn công nổi lên đầu."
                },
                {
                  "line": 6,
                  "part": "head -n 10",
                  "text": "Chỉ lấy 10 IP có tần suất request cao nhất."
                }
              ],
              "output": "  14250 203.0.113.195\n   8920 198.51.100.44\n   3410 192.0.2.10\n    850 172.16.0.4\n    420 10.0.0.1"
            }
          ]
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
            "title": "Lệnh tr không nhận chuỗi dài nhiều ký tự",
            "content": "Lệnh <code>tr</code> chỉ dùng để dịch hoặc xóa TỪNG KÝ TỰ ĐƠN LẺ (1-to-1 character translation). Không dùng <code>tr 'word1' 'word2'</code> để đổi từ; với bài toán đổi từ, bắt buộc dùng <code>sed 's/word1/word2/g'</code>."
          }
        ],
        "tips": [
          {
            "title": "Dùng grep --color=auto để tô màu kết quả nổi bật",
            "content": "Thêm alias <code>alias grep='grep --color=auto'</code> vào file <code>~/.bashrc</code> giúp bạn dễ dàng nhận diện từ khóa cần tìm trong màn hình terminal."
          },
          {
            "title": "Dùng cut cho định dạng ngăn cách rõ ràng, dùng awk cho khoảng trắng bất quy tắc",
            "content": "Với file CSV hay /etc/passwd ngăn cách bằng 1 ký tự cố định, <code>cut -d',' -f2</code> chạy rất nhanh. Nhưng với output của lệnh <code>ps aux</code> hay <code>ls -l</code> có nhiều khoảng trắng liền nhau, <code>awk '{print $2}'</code> xử lý chuẩn xác hơn nhiều."
          }
        ]
      },
      "exercises": [
        {
          "question": "Lệnh nào sau đây dùng để đếm tổng số dòng mã nguồn trong tất cả các file .py của thư mục hiện tại (không tính thư mục con)?",
          "command": "cat *.py | wc -l",
          "explanation": "cat nối nội dung tất cả các file có đuôi .py rồi chuyển qua wc -l để đếm tổng số dòng. Nếu muốn tính đệ quy cả thư mục con, ta kết hợp find: find . -name '*.py' | xargs wc -l."
        },
        {
          "question": "Làm thế nào để đổi toàn bộ chữ hoa thành chữ thường trong một file text bằng lệnh tr?",
          "command": "cat data.txt | tr '[:upper:]' '[:lower:]' > data_lower.txt",
          "explanation": "tr '[:upper:]' '[:lower:]' dùng POSIX character classes để chuyển đổi chuẩn xác mọi ký tự in hoa thành chữ thường mà không bị ảnh hưởng bởi bảng mã cục bộ."
        }
      ],
      "summary": [
        "grep là công cụ lọc dòng văn bản theo mẫu Regex; luôn nhớ cờ -E cho regex mở rộng và -v để loại trừ dòng rác.",
        "sed là máy biến đổi chuỗi cực nhanh; luôn dùng -i.bak khi sửa file trực tiếp để đảm bảo an toàn tuyệt đối.",
        "awk chuyên trị dữ liệu dạng cột; kết hợp awk với sort và uniq -c tạo thành bộ ba phân tích log server vô địch."
      ]
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
        "Làm chủ cú pháp lệnh find theo tên (-name, -iname), kích thước (-size), thời gian (-mtime, -mmin), phân quyền (-perm) và loại file (-type).",
        "Hiểu bản chất khác biệt về hiệu năng và tài nguyên giữa find -exec ... {} + và find -exec ... {} \\;.",
        "Nắm vững cơ chế gom đối số của xargs và giải quyết triệt để lỗi kinh điển với ký tự phân cách NULL: find -print0 | xargs -0.",
        "Quy tắc an toàn sống còn: Cách phòng ngừa thảm họa xóa nhầm dữ liệu khi kết hợp find với lệnh xóa."
      ],
      "intuition": {
        "title": "Chó săn đánh hơi và Xe tải vận chuyển hàng loạt",
        "metaphor": "find giống như một chú chó nghiệp vụ sở hữu khứu giác cực nhạy: bạn đưa cho nó tiêu chí (tìm file đuôi .log, nặng hơn 100MB, không đụng tới trong 30 ngày), nó sẽ lùng sục từng ngóc ngách ổ đĩa để tìm ra. Nhưng find không có thùng xe lớn để chở hàng. xargs chính là chiếc xe tải gom toàn bộ danh sách tìm được lên boong xe và chở đến lệnh xử lý (như gzip hay rm) trong MỘT CHUYẾN DUY NHẤT, thay vì phải chạy đi chạy lại hàng ngàn chuyến tốn cạn kiệt tài nguyên CPU.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚡</span>\n                    <span>EXEC {} \\; vs {} +</span>\n                    <span class=\"lx-vs-tag\">Hiệu năng</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>{} \\;</strong>: Khởi tạo một tiến trình con mới (fork process) cho TỪNG FILE tìm thấy. Tìm 1.000 file = fork 1.000 lần (rất chậm).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>{} +</strong>: Gom toàn bộ danh sách file thành đối số truyền vào một lần duy nhất (nhanh gấp hàng chục lần).</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🛡️</span>\n                    <span>-print0 &amp; xargs -0</span>\n                    <span class=\"lx-vs-tag\">Null Byte</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Vấn đề:</strong> Tên file có chứa dấu cách (My Report.pdf) làm xargs hiểu nhầm là 2 file riêng biệt: \"My\" và \"Report.pdf\".</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Giải pháp:</strong> find -print0 dùng byte \\0 (NULL) làm dấu ngăn cách; xargs -0 đọc chính xác từng tên file.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-2-find-criteria",
          "title": "1. Các tiêu chí truy tìm file cốt lõi của lệnh find",
          "content": "\n                  <p>Cú pháp tổng quát: <code>find [thư_mục_bắt_đầu] [tiêu_chí] [hành_động]</code></p>\n                  <p>Các bộ lọc thông dụng nhất trong thực tế quản trị:</p>\n                  <ul>\n                    <li><code>-name \"*.log\"</code>: Tìm theo tên file chính xác; dùng <code>-iname</code> nếu muốn bỏ qua hoa thường.</li>\n                    <li><code>-type f</code>: Chỉ tìm file thường (regular file); <code>-type d</code>: Chỉ tìm thư mục (directory); <code>-type l</code>: Tìm liên kết mềm (symlink).</li>\n                    <li><code>-size +100M</code>: Tìm file lớn hơn 100 Megabytes (dùng <code>-size -10k</code> cho nhỏ hơn 10 Kilobytes, <code>+1G</code> cho lớn hơn 1 Gigabyte).</li>\n                    <li><code>-mtime -7</code>: Tìm file được sửa đổi nội dung trong vòng 7 ngày qua (dùng <code>+30</code> cho các file cũ hơn 30 ngày).</li>\n                    <li><code>-mmin -60</code>: Tìm file vừa được sửa đổi trong vòng 60 phút gần nhất (cực kỳ hữu hiệu khi điều tra xem hacker vừa sửa file nào).</li>\n                    <li><code>-perm 0777</code>: Tìm các file đang bị thả lỏng toàn bộ quyền đọc-ghi-thực thi (nguy cơ bảo mật).</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Tìm kiếm file log lớn và file mã nguồn sửa đổi gần đây",
              "code": "# Tìm các file log có dung lượng lớn hơn 50MB trong /var/log\nfind /var/log -type f -name \"*.log\" -size +50M\n\n# Tìm tất cả file Python vừa được sửa đổi trong 30 phút qua trong thư mục dự án\nfind ./my_project -type f -name \"*.py\" -mmin -30\n\n# Tìm tất cả các file có quyền 777 nguy hiểm trong thư mục web /var/www\nfind /var/www -type f -perm 0777",
              "annotations": [
                {
                  "line": 2,
                  "part": "-type f -size +50M",
                  "text": "Chỉ lấy file (không lấy thư mục) và dung lượng phải trên 50 Megabytes."
                },
                {
                  "line": 5,
                  "part": "-mmin -30",
                  "text": "Dấu trừ (-) biểu thị thời gian nhỏ hơn hoặc bằng 30 phút tính từ thời điểm hiện tại."
                },
                {
                  "line": 8,
                  "part": "-perm 0777",
                  "text": "Lọc chính xác các file ai cũng có quyền ghi đè và thực thi."
                }
              ],
              "output": "/var/log/nginx/access.log\n/var/log/journal/system.journal\n./my_project/app/routers/auth.py"
            }
          ]
        },
        {
          "id": "sec-2-2-exec-vs-xargs",
          "title": "2. find -exec vs xargs: Cơ chế thực thi và bẫy hiệu năng",
          "content": "\n                  <p>Khi tìm thấy danh sách file, bạn thường muốn làm gì đó với chúng (nén lại, chuyển thư mục, kiểm tra phân quyền, xóa bỏ).</p>\n                  <p>Có 3 cách thực thi chính:</p>\n                  <ol>\n                    <li><code>find ... -exec ls -l {} \\;</code>: Chậm nhất. <code>{}</code> đại diện cho từng file. Với mỗi file tìm thấy, Linux phải fork một process mới để chạy lệnh <code>ls</code>.</li>\n                    <li><code>find ... -exec ls -l {} +</code>: Nhanh. Gom nhiều file lại thành một dòng tham số <code>ls -l file1 file2 file3...</code>.</li>\n                    <li><code>find ... | xargs ls -l</code>: Mạnh mẽ và linh hoạt nhất. Cho phép kết hợp với các đường ống pipe xử lý dữ liệu phức tạp.</li>\n                  </ol>\n                  <div class=\"callout-box danger-box\">\n                    <div class=\"callout-title\">🚨 CẢNH BÁO ĐỎ: NGUY HIỂM CHẾT NGƯỜI KHI DÙNG find KÈM LỆNH XÓA</div>\n                    <p>Nếu bạn gõ: <code>find /tmp/my_dir -name *.tmp -delete</code> (thiếu dấu ngoặc kép quanh <code>*.tmp</code>), shell sẽ tự động bung <code>*.tmp</code> trong thư mục HIỆN TẠI trước khi chuyển cho find! Nếu thư mục hiện tại không có file .tmp nào, find có thể xóa nhầm toàn bộ thư mục <code>/tmp/my_dir</code>!</p>\n                    <div class=\"lx-safe-alternative\">\n                      <strong>Quy tắc phòng thủ bắt buộc:</strong> Luôn bọc mẫu tên trong dấu ngoặc kép <code>\"*.tmp\"</code> và CHẠY THỬ LỆNH FIND KHÔNG CÓ CỜ XÓA trước để kiểm tra danh sách file!\n                    </div>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Dọn dẹp cache Python __pycache__ an toàn bằng find -exec",
              "code": "# Bước 1: Liệt kê kiểm tra danh sách thư mục cache trước khi xóa\nfind . -type d -name \"__pycache__\"\n\n# Bước 2: Thực thi xóa hàng loạt thư mục cache bằng -exec rm -rf {} +\nfind . -type d -name \"__pycache__\" -exec rm -rf {} +",
              "annotations": [
                {
                  "line": 2,
                  "part": "-type d",
                  "text": "Chỉ nhắm mục tiêu vào thư mục (directories) mang tên __pycache__."
                },
                {
                  "line": 5,
                  "part": "-exec rm -rf {} +",
                  "text": "Dấu + gom toàn bộ danh sách thư mục lại xóa trong một lệnh rm duy nhất, cực kỳ tiết kiệm CPU."
                }
              ],
              "output": "./app/__pycache__\n./app/models/__pycache__\n./tests/__pycache__"
            }
          ]
        },
        {
          "id": "sec-2-2-null-byte",
          "title": "3. Cặp bài trùng hoàn hảo: find -print0 | xargs -0",
          "content": "\n                  <p>Trong hệ thống Linux, ký tự duy nhất KHÔNG THỂ xuất hiện trong tên file là <strong>ký tự NULL</strong> (mã ASCII <code>\\0</code>) và dấu gạch chéo <code>/</code> (ký tự phân cấp thư mục). Mọi ký tự khác, bao gồm dấu cách, dấu xuống dòng, tab, dấu nháy đơn, nháy kép... đều có thể nằm trong tên file.</p>\n                  <p>Mặc định <code>xargs</code> dùng khoảng trắng và dấu xuống dòng để phân tách đối số. Khi gặp file tên <code>Backup 2026.tar.gz</code>, xargs sẽ chia làm 2 file: <code>Backup</code> và <code>2026.tar.gz</code>! Điều này dẫn tới lỗi file không tồn tại hoặc tệ hơn là xóa nhầm file khác.</p>\n                  <p><strong>Cơ chế xử lý chuẩn mực công nghiệp:</strong></p>\n                  <ul>\n                    <li><code>find ... -print0</code>: Xuất danh sách file ngăn cách nhau bằng ký tự byte NULL (<code>\\0</code>).</li>\n                    <li><code>xargs -0 ...</code>: Đọc luồng dữ liệu vào và chỉ cắt đối số khi gặp byte NULL (<code>\\0</code>).</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Tính tổng dung lượng và nén file an toàn tuyệt đối với ký tự NULL",
              "code": "# Tìm tất cả các file log cũ hơn 30 ngày và nén lại thành định dạng .gz\nfind /var/log/app -type f -name \"*.log\" -mtime +30 -print0 | xargs -0 gzip\n\n# Tính tổng số dòng code của toàn bộ file Python trong dự án\nfind . -type f -name \"*.py\" -print0 | xargs -0 wc -l",
              "annotations": [
                {
                  "line": 2,
                  "part": "-print0",
                  "text": "In tên file kết thúc bằng byte NULL \\0 thay vì dấu xuống dòng \\n."
                },
                {
                  "line": 2,
                  "part": "xargs -0 gzip",
                  "text": "xargs -0 đọc đúng từng tên file kể cả khi tên có khoảng trắng hoặc ký tự đặc biệt rồi gọi gzip nén file."
                }
              ],
              "output": "   142 ./app/main.py\n    85 ./app/auth.py\n   320 ./app/db.py\n   547 total"
            }
          ]
        }
      ],
      "scenario": {
        "title": "Giải cứu ổ cứng khỏi hàng ngàn file upload tạm thời của người dùng",
        "content": "\n              <p>Thư mục <code>/var/uploads/temp/</code> của website bị phình to bất thường, chứa hơn 50.000 tệp tin do người dùng tải lên trong lúc xử lý ảnh. Nhiều file do người dùng đặt tên có dấu cách như <code>Báo cáo tài chính quý 1.pdf</code>, <code>ảnh chụp màn hình (1).png</code>.</p>\n              <p><strong>Bước 1:</strong> Nếu bạn chạy lệnh đơn giản <code>rm /var/uploads/temp/*</code>, shell sẽ báo lỗi kinh điển: <code>bash: /bin/rm: Argument list too long</code> (Danh sách đối số vượt quá bộ đệm ARG_MAX của nhân Linux).</p>\n              <p><strong>Bước 2:</strong> Bạn sử dụng cặp bài trùng <code>find -print0 | xargs -0</code> để xóa an toàn các file tạm cũ hơn 24 giờ:</p>\n              <pre><code>find /var/uploads/temp -type f -mmin +1440 -print0 | xargs -0 -r rm -f</code></pre>\n              <p>Lệnh chạy êm ru, giải phóng ngay 18GB dung lượng đĩa mà không hề gặp lỗi ngắt quãng hay hiểu nhầm khoảng trắng trong tên file!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi cờ -delete phải đặt ở cuối cùng của lệnh find",
            "content": "Nếu bạn đặt <code>find /data -delete -name \"*.tmp\"</code>, find thực thi từ trái sang phải! Nó sẽ xóa toàn bộ nội dung trong /data TRƯỚC KHI kịp kiểm tra điều kiện tên file! Luôn luôn đặt <code>-delete</code> ở vị trí CUỐI CÙNG của biểu thức."
          },
          {
            "title": "Thiếu cờ -r trong xargs khi đầu vào rỗng",
            "content": "Khi find không tìm thấy file nào, xargs mặc định vẫn có thể gọi lệnh một lần với đối số rỗng. Thêm cờ <code>xargs -r</code> (no-run-if-empty) để xargs tự động dừng lại nếu không có dữ liệu đầu vào."
          }
        ],
        "tips": [
          {
            "title": "Dùng -maxdepth để kiểm soát độ sâu quét",
            "content": "Khi chỉ muốn tìm kiếm trong thư mục hiện tại mà không muốn find quét sâu vào hàng ngàn thư mục con bên dưới, hãy dùng <code>find . -maxdepth 1 -name \"*.py\"</code> để tăng tốc độ tìm kiếm."
          }
        ]
      },
      "exercises": [
        {
          "question": "Lệnh nào sau đây dùng để tìm tất cả các file rỗng (kích thước 0 byte) trong thư mục /tmp và xóa chúng an toàn?",
          "command": "find /tmp -type f -empty -print0 | xargs -0 -r rm -f",
          "explanation": "Cờ -empty của find tự động lọc ra các file có kích thước bằng 0; kết hợp -print0 và xargs -0 -r rm -f giúp xóa an toàn không sợ lỗi file có dấu cách."
        }
      ],
      "summary": [
        "find là công cụ tìm kiếm mạnh mẽ nhất hệ thống với các bộ lọc kích thước, thời gian, loại file và phân quyền.",
        "Luôn bọc mẫu tên trong dấu ngoặc kép \"*.log\" để ngăn shell bung file ngoài ý muốn trước khi find thực thi.",
        "find -print0 kết hợp xargs -0 là chuẩn mực an toàn bất biến để xử lý file có khoảng trắng và ký tự đặc biệt."
      ]
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
        "Hiểu tường tận 5 trạng thái tiến trình: Running (R), Interruptible Sleep (S), Uninterruptible Sleep (D), Zombie (Z), Stopped (T).",
        "Đọc vị các thông số quan trọng của lệnh ps aux và bảng theo dõi thời gian thực top/htop: Load Average, VIRT vs RES.",
        "Làm chủ các tín hiệu UNIX: SIGTERM (15), SIGKILL (9), SIGHUP (1), SIGINT (2) và nguyên lý Graceful Shutdown.",
        "Điều khiển tác vụ chạy nền: toán tử &, nohup, jobs, fg, bg, disown để tiến trình không bị ngắt khi ngắt kết nối SSH."
      ],
      "intuition": {
        "title": "Quản đốc phân xưởng và Giấy triệu hồi công nhân",
        "metaphor": "Hệ điều hành quản lý hàng trăm tiến trình như một xưởng sản xuất lớn. ps và top là bảng chấm công: cho bạn biết công nhân nào đang miệt mài làm việc (Running), ai đang tạm nghỉ chờ hàng (Sleeping), và ai đã qua đời nhưng tên chưa bị gạch khỏi sổ chấm công (Zombie). Khi một công nhân phát điên chiếm hết máy móc (ngốn 100% CPU), gửi tín hiệu SIGTERM (15) là lịch sự gõ cửa yêu cầu thu dọn đồ đạc, đóng kết nối cơ sở dữ liệu rồi ra về trong trật tự. Nếu công nhân đó bị đơ cứng hoàn toàn không phản hồi, SIGKILL (9) là bảo vệ xông vào ngắt cầu dao điện cưỡng chế ngay lập tức.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🛑</span>\n                    <span>SIGTERM vs SIGKILL</span>\n                    <span class=\"lx-vs-tag\">15 vs 9</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>SIGTERM (15):</strong> Yêu cầu kết thúc lịch sự (Graceful). Tiến trình có thể bắt (catch) tín hiệu này để lưu dữ liệu, đóng socket mạng và giải phóng bộ nhớ.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>SIGKILL (9):</strong> Tiêu diệt tức thì ở tầng nhân (Kernel). Tiến trình KHÔNG THỂ bắt hay phớt lờ; có nguy cơ làm hỏng file đang ghi dở.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📊</span>\n                    <span>VIRT vs RES</span>\n                    <span class=\"lx-vs-tag\">Đo RAM thực</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>VIRT (Virtual):</strong> Tổng bộ nhớ ảo mà tiến trình xin cấp phát (bao gồm cả thư viện chia sẻ và phần chưa dùng).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>RES (Resident):</strong> Dung lượng RAM vật lý THỰC SỰ đang bị tiến trình chiếm giữ. Luôn nhìn vào RES để biết tiến trình ngốn bao nhiêu RAM!</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-3-process-status",
          "title": "1. Khảo sát tiến trình với ps aux và các trạng thái tiến trình",
          "content": "\n                  <p>Mỗi chương trình khi được nạp vào bộ nhớ và thực thi sẽ trở thành một hoặc nhiều <strong>tiến trình</strong> (Process), được định danh bởi một mã số nguyên dương duy nhất gọi là <strong>PID</strong> (Process ID). Tiến trình sinh ra nó được gọi là tiến trình cha (<strong>PPID</strong>).</p>\n                  <p>Lệnh kinh điển nhất để chụp ảnh nhanh toàn bộ tiến trình hệ thống là: <code>ps aux</code></p>\n                  <ul>\n                    <li><code>USER</code>: Tài khoản người dùng sở hữu tiến trình.</li>\n                    <li><code>PID</code>: Mã định danh tiến trình.</li>\n                    <li><code>%CPU</code> & <code>%MEM</code>: Phần trăm CPU và RAM vật lý đang chiếm dụng.</li>\n                    <li><code>STAT</code>: Trạng thái tiến trình (<code>R</code>: đang chạy; <code>S</code>: ngủ chờ I/O; <code>D</code>: ngủ không thể đánh thức do chờ ổ đĩa/phần cứng; <code>Z</code>: Zombie; <code>T</code>: bị tạm dừng).</li>\n                    <li><code>COMMAND</code>: Câu lệnh chính xác đã khởi động tiến trình.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Lọc tìm tiến trình Python và kiểm tra cây phả hệ",
              "code": "# Tìm kiếm các tiến trình Python đang chạy (mẹo dùng [p]ython để không grep chính lệnh grep)\nps aux | grep '[p]ython'\n\n# Hiển thị cây tiến trình phân cấp cha-con trực quan\npstree -p -s $(pgrep -f 'my_app')\n\n# Tìm Top 5 tiến trình đang chiếm dụng nhiều RAM nhất\nps aux --sort=-%mem | head -n 6",
              "annotations": [
                {
                  "line": 2,
                  "part": "grep '[p]ython'",
                  "text": "Kỹ thuật chuyên nghiệp: [p]ython khớp với chuỗi 'python' nhưng trong danh sách tiến trình, chuỗi lệnh là 'grep [p]ython' nên lệnh grep tự động loại trừ chính mình."
                },
                {
                  "line": 5,
                  "part": "pstree -p -s",
                  "text": "In cây tiến trình kèm mã PID (-p) và lần ngược lên tiến trình tổ tiên (-s)."
                },
                {
                  "line": 8,
                  "part": "--sort=-%mem",
                  "text": "Sắp xếp danh sách giảm dần theo mức độ tiêu thụ bộ nhớ RAM."
                }
              ],
              "output": "root       1240  0.2  2.1 428120 43500 ?        Sl   10:00   0:15 /usr/bin/python3 main.py\nwww-data   1580  1.5  4.8 612400 98200 ?        Sl   10:05   1:02 uwsgi --ini uwsgi.ini"
            }
          ]
        },
        {
          "id": "sec-2-3-top-htop",
          "title": "2. Theo dõi thời gian thực với top/htop & Giải mã Load Average",
          "content": "\n                  <p>Khi máy chủ có dấu hiệu đơ giật, <code>top</code> (hoặc <code>htop</code> nếu đã cài) là công cụ giám sát đầu tiên cần mở lên.</p>\n                  <p><strong>Hiểu đúng về Load Average (3 con số: 1 phút, 5 phút, 15 phút):</strong></p>\n                  <p>Load Average đo lường số lượng tiến trình trung bình đang sử dụng CPU hoặc đang nằm trong hàng đợi chờ CPU/chờ ổ đĩa (R + D state).</p>\n                  <div class=\"callout-box info-box\">\n                    <div class=\"callout-title\">💡 Công thức tính ngưỡng an toàn của Load Average</div>\n                    <p>Lấy số Load Average chia cho <strong>Số lượng lõi CPU (CPU Cores)</strong>:</p>\n                    <ul>\n                      <li>Nếu <code>Load / Cores &lt; 0.7</code>: Hệ thống hoàn toàn thông thoáng, tài nguyên dồi dào.</li>\n                      <li>Nếu <code>Load / Cores = 1.0</code>: Hệ thống vừa tròn 100% công suất tải.</li>\n                      <li>Nếu <code>Load / Cores &gt; 2.0</code>: Hệ thống đang bị nghẽn cổ chai nghiêm trọng, các yêu cầu xử lý phải xếp hàng chờ đợi!</li>\n                    </ul>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra số lõi CPU và xem nhanh chỉ số tải",
              "code": "# Kiểm tra máy chủ có bao nhiêu lõi CPU vật lý/logic\nnproc\n\n# Xem thông tin tải và thời gian hoạt động của máy chủ\nuptime",
              "annotations": [
                {
                  "line": 2,
                  "part": "nproc",
                  "text": "Trả về tổng số lõi xử lý có thể lập lịch tác vụ (ví dụ: 4 cores)."
                },
                {
                  "line": 5,
                  "part": "uptime",
                  "text": "Hiển thị thời gian server đã chạy liên tục, số user và 3 chỉ số Load Average."
                }
              ],
              "output": "4\n 14:32:05 up 42 days,  3:18,  2 users,  load average: 0.85, 1.12, 0.94"
            }
          ]
        },
        {
          "id": "sec-2-3-signals-kill",
          "title": "3. Tín hiệu UNIX & Tiêu diệt tiến trình an toàn",
          "content": "\n                  <p>Lệnh <code>kill</code> không đơn thuần là 'giết' tiến trình; thực chất nó là công cụ <strong>gửi tín hiệu (Signal)</strong> từ hệ điều hành đến một tiến trình.</p>\n                  <p>Bảng các tín hiệu quan trọng nhất:</p>\n                  <ul>\n                    <li><code>SIGTERM (15)</code>: Tín hiệu mặc định khi gõ <code>kill [PID]</code>. Yêu cầu tiến trình tự dọn dẹp và kết thúc an toàn.</li>\n                    <li><code>SIGKILL (9)</code>: Tín hiệu cưỡng chế chấm dứt ngay lập tức (<code>kill -9 [PID]</code>). Chỉ dùng khi tiến trình bị treo cứng không phản hồi SIGTERM.</li>\n                    <li><code>SIGHUP (1)</code>: Tín hiệu gác máy (Hangup). Các dịch vụ web (Nginx, Apache) thường quy ước tín hiệu này để <strong>Reload lại file cấu hình</strong> mà không cần restart gián đoạn kết nối.</li>\n                    <li><code>SIGINT (2)</code>: Tín hiệu ngắt từ bàn phím khi bạn bấm <code>Ctrl + C</code> trong terminal.</li>\n                  </ul>\n                  <div class=\"callout-box warning-box\">\n                    <div class=\"callout-title\">⚠️ Bí ẩn Tiến trình Zombie (Z state)</div>\n                    <p>Tiến trình Zombie là tiến trình con đã chạy xong (đã chết) nhưng tiến trình cha chưa gọi hàm <code>wait()</code> để đọc mã thoát và dọn dẹp mục nhập trong bảng tiến trình của Kernel. <strong>Bạn KHÔNG THỂ dùng kill -9 để giết Zombie</strong> (vì nó đã chết rồi!). Cách xử lý duy nhất là gửi tín hiệu yêu cầu tiến trình cha đọc kết quả, hoặc khởi động lại tiến trình cha.</p>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Gửi tín hiệu kết thúc an toàn và reload cấu hình dịch vụ",
              "code": "# Gửi tín hiệu kết thúc nhẹ nhàng SIGTERM cho tiến trình có PID 2480\nkill -15 2480\n\n# Kiểm tra nếu sau 10 giây tiến trình vẫn chưa thoát thì mới dùng cờ cưỡng chế SIGKILL\nkill -0 2480 2>/dev/null && kill -9 2480\n\n# Yêu cầu Nginx nạp lại cấu hình mới mà không làm rớt kết nối của người dùng\nkill -HUP $(cat /var/run/nginx.pid)",
              "annotations": [
                {
                  "line": 2,
                  "part": "kill -15",
                  "text": "SIGTERM giúp ứng dụng hoàn thành nốt các truy vấn dở dang vào database."
                },
                {
                  "line": 5,
                  "part": "kill -0",
                  "text": "Kỹ thuật kiểm tra xem tiến trình còn sống hay không mà không gửi tín hiệu thực sự."
                },
                {
                  "line": 8,
                  "part": "kill -HUP",
                  "text": "Gửi tín hiệu SIGHUP (1) để reload config mà zero-downtime."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-2-3-background-jobs",
          "title": "4. Chạy tác vụ nền: nohup, &, jobs, fg, bg & disown",
          "content": "\n                  <p>Khi bạn kết nối máy chủ từ xa qua SSH, nếu kết nối mạng bị đứt hoặc bạn đóng cửa sổ terminal, shell sẽ gửi tín hiệu <code>SIGHUP</code> tới toàn bộ tiến trình con, làm cho script đang chạy bị sập theo.</p>\n                  <p>Để chạy các tác vụ tốn thời gian (như huấn luyện mô hình Python, nén backup lớn):</p>\n                  <ul>\n                    <li><code>lệnh &</code>: Đẩy tiến trình chạy ngầm dưới background ngay từ khi gõ lệnh.</li>\n                    <li><code>nohup lệnh &</code>: Bỏ qua tín hiệu SIGHUP, tiến trình sẽ tiếp tục chạy bền bỉ kể cả khi bạn đăng xuất SSH. Output mặc định được ghi vào file <code>nohup.out</code>.</li>\n                    <li><code>Ctrl + Z</code>: Tạm dừng (freeze) tiến trình đang chạy ở foreground.</li>\n                    <li><code>bg %1</code>: Cho phép tiến trình vừa tạm dừng tiếp tục chạy ngầm ở background.</li>\n                    <li><code>fg %1</code>: Kéo tiến trình ngầm quay trở lại tương tác ở foreground.</li>\n                    <li><code>disown -h %1</code>: Tách một tiến trình đang chạy ra khỏi danh sách quản lý của shell hiện tại.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Chạy script Python huấn luyện ngầm không sợ mất kết nối SSH",
              "code": "# Chạy script train.py ngầm, bỏ qua SIGHUP, chuyển toàn bộ log vào train.log\nnohup python3 -u train.py > train.log 2>&1 &\n\n# Kiểm tra danh sách các job ngầm do shell hiện tại khởi tạo\njobs -l\n\n# Theo dõi tiến độ huấn luyện thời gian thực qua file log\ntail -f train.log",
              "annotations": [
                {
                  "line": 2,
                  "part": "python3 -u",
                  "text": "Tắt cơ chế buffer stdout của Python để log được ghi ngay lập tức vào file."
                },
                {
                  "line": 2,
                  "part": "> train.log 2>&1 &",
                  "text": "Chuyển cả stdout (1) và stderr (2) vào train.log, dấu & cuối cùng đẩy tác vụ chạy ngầm."
                },
                {
                  "line": 5,
                  "part": "jobs -l",
                  "text": "Liệt kê số thứ tự job [1], trạng thái Running và PID của tác vụ ngầm."
                }
              ],
              "output": "[1] 18450\n[1]+ 18450 Running                 nohup python3 -u train.py > train.log 2>&1 &\nEpoch 1/100 - Loss: 0.652 - Acc: 78.4%"
            }
          ]
        }
      ],
      "scenario": {
        "title": "Khống chế tiến trình Celery Worker bị Memory Leak ăn sạch 16GB RAM",
        "content": "\n              <p>Một Celery worker xử lý tác vụ convert video bằng Python bị rò rỉ bộ nhớ (Memory Leak). Chỉ sau 4 tiếng, lượng RAM thực tế (RES) của tiến trình tăng từ 200MB lên 14GB, bắt đầu đẩy hệ thống vào tình trạng tráo đổi bộ nhớ đĩa (Swap Thrashing) khiến toàn bộ website bị treo cứng.</p>\n              <p><strong>Bước 1:</strong> Bạn mở terminal và xác định chính xác PID của tiến trình tội đồ:</p>\n              <pre><code>ps aux --sort=-%mem | head -n 3</code></pre>\n              <p>Phát hiện tiến trình có PID <code>8412</code> đang chiếm tới 89.4% RAM hệ thống.</p>\n              <p><strong>Bước 2:</strong> Không hấp tấp gõ <code>kill -9</code> vì worker đang xử lý dở dữ liệu của khách hàng. Bạn gửi tín hiệu <code>SIGTERM (15)</code> để ứng dụng hoàn tất tác vụ hiện tại rồi tự hủy:</p>\n              <pre><code>kill -15 8412</code></pre>\n              <p><strong>Bước 3:</strong> Tiến trình thoát êm đẹp sau 8 giây, giải phóng ngay 14GB RAM mà không làm mất mát bất kỳ bản ghi nào trong database!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Thói quen tai hại: Hơi tí là gõ kill -9",
            "content": "<code>kill -9</code> không cho tiến trình bất kỳ cơ hội nào để đóng file hay hoàn tất transaction database. Với các dịch vụ như MySQL hay PostgreSQL, kill -9 có thể dẫn tới hỏng cấu trúc dữ liệu table (Corrupted Data) và mất hàng giờ để recovery."
          },
          {
            "title": "Quên cờ -u trong python khi chạy ngầm bằng nohup",
            "content": "Mặc định Python sẽ giữ lại output trong RAM buffer khi không nối với terminal TTY. Nếu thiếu cờ <code>python -u</code>, bạn mở file log sẽ thấy trắng trơn và lầm tưởng script chưa chạy."
          }
        ],
        "tips": [
          {
            "title": "Dùng htop thay cho top",
            "content": "Cài đặt <code>htop</code> bằng <code>sudo apt install htop</code>: giao diện màu trực quan, hiển thị chi tiết từng lõi CPU, hỗ trợ cuộn chuột và tìm kiếm phím F3, lọc tiến trình F4 cực kỳ tiện lợi."
          }
        ]
      },
      "exercises": [
        {
          "question": "Làm thế nào để tìm tất cả các tiến trình có tên chứa 'gunicorn' và gửi tín hiệu reload SIGHUP cho chúng cùng một lúc?",
          "command": "pkill -HUP -f gunicorn",
          "explanation": "pkill tìm kiếm theo tên hoặc toàn bộ dòng lệnh (-f) và gửi tín hiệu chỉ định (-HUP) tới tất cả các tiến trình khớp mẫu."
        }
      ],
      "summary": [
        "ps aux và top/htop là hai công cụ giám sát tiến trình căn bản; luôn đối chiếu Load Average với số lõi CPU.",
        "Luôn ưu tiên gửi tín hiệu SIGTERM (15) trước để tiến trình dọn dẹp an toàn; chỉ dùng SIGKILL (9) khi tiến trình đơ cứng hoàn toàn.",
        "Dùng nohup command > file.log 2>&1 & để chạy tác vụ nền an toàn, không bị ngắt quãng khi ngắt phiên SSH."
      ]
    },
    {
      "id": "lx-2-04",
      "number": "2.4",
      "title": "Phân quyền nâng cao, umask, Đặc quyền & ACL (umask, SUID/SGID/sticky bit, getfacl/setfacl)",
      "subtitle": "Kiểm soát truy cập đa tầng vượt ra khỏi giới hạn rwx truyền thống của owner/group/other",
      "level": "Trung cấp",
      "duration": "45 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "Hiểu bản chất phép trừ bit nhị phân của umask quyết định quyền mặc định khi file/thư mục mới sinh ra.",
        "Làm chủ 3 quyền đặc biệt (Special Permissions): SUID (4xxx), SGID (2xxx), Sticky Bit (1xxx) và phân tích rủi ro bảo mật.",
        "Ứng dụng SGID trên thư mục để tự động đồng bộ nhóm sở hữu cho mọi file mới tạo trong dự án nhóm.",
        "Khai phá Access Control Lists (ACL) với getfacl và setfacl để phân quyền chi tiết cho từng người dùng riêng lẻ."
      ],
      "intuition": {
        "title": "Khu chung cư cao cấp và Thẻ từ phân tầng thang máy",
        "metaphor": "Hệ thống quyền rwx truyền thống giống như ổ khóa cơ đơn giản: chỉ phân biệt được 3 đối tượng (Chủ căn hộ, Người cùng nhà, và Người ngoài đường). Khi dự án có nhiều bên tham gia (Kỹ sư Dev được sửa, Thực tập sinh chỉ được đọc, Robot CI/CD chỉ được ghi log), ổ khóa cơ hoàn toàn bất lực. ACL chính là hệ thống thẻ từ phân tầng thang máy thông minh: bạn có thể cấp quyền tùy biến tới từng người riêng lẻ mà không cần phải nhồi nhét họ vào các group chung làm rối loạn hệ thống.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔑</span>\n                    <span>3 QUYỀN ĐẶC BIỆT</span>\n                    <span class=\"lx-vs-tag\">Bit 4 • 2 • 1</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>SUID (4xxx - rwsr-xr-x):</strong> Thực thi với quyền của OWNER file (thường là root, ví dụ /usr/bin/passwd).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>SGID (2xxx - rwxr-sr-x):</strong> Trên file: chạy với quyền group; Trên thư mục: mọi file mới sinh ra TỰ ĐỘNG THỪA KẾ group của thư mục mẹ.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sticky Bit (1xxx - rwxrwxrwt):</strong> Trên thư mục chung (/tmp): AI CŨNG TẠO ĐƯỢC FILE, NHƯNG CHỈ CHỦ SỞ HỮU HOẶC ROOT MỚI ĐƯỢC XÓA FILE ĐÓ.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📋</span>\n                    <span>PHÂN QUYỀN ACL</span>\n                    <span class=\"lx-vs-tag\">setfacl</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> Nhận diện file có ACL: Dấu cộng <code>+</code> xuất hiện cuối chuỗi quyền (<code>-rw-r--r--+</code>).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>setfacl -m u:alice:rwx file:</strong> Cấp quyền rwx riêng cho user alice mà không thay đổi owner của file.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>getfacl file:</strong> Xem danh sách chi tiết toàn bộ các quyền cá nhân được cấp phát.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-4-umask",
          "title": "1. Bản chất umask: Quyền mặc định của file và thư mục mới sinh ra",
          "content": "\n                  <p>Khi một chương trình tạo ra file hoặc thư mục mới, hệ thống Linux áp dụng công thức trừ mặt nạ <strong>umask</strong>:</p>\n                  <ul>\n                    <li>Quyền tối đa mặc định cho <strong>thư mục</strong> là <code>0777</code> (rwxrwxrwx).</li>\n                    <li>Quyền tối đa mặc định cho <strong>tệp tin (file)</strong> là <code>0666</code> (rw-rw-rw-). File mới sinh ra mặc định KHÔNG BAO GIỜ có cờ thực thi (x) vì lý do an toàn.</li>\n                  </ul>\n                  <p><strong>Công thức tính quyền:</strong> <code>Quyền thực tế = Quyền tối đa - umask</code></p>\n                  <p>Ví dụ trên máy chủ Ubuntu thông thường, umask mặc định là <code>0022</code>:</p>\n                  <ul>\n                    <li>Thư mục mới = <code>0777 - 0022 = 0755</code> (rwxr-xr-x: Chủ sở hữu toàn quyền, người khác chỉ đọc/vào).</li>\n                    <li>File mới = <code>0666 - 0022 = 0644</code> (rw-r--r--: Chủ sở hữu đọc ghi, người khác chỉ đọc).</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra và siết chặt umask trong môi trường máy chủ bảo mật",
              "code": "# Xem giá trị umask hiện tại của phiên làm việc\numask\n\n# Thiết lập umask nghiêm ngặt 027 (người ngoài không có bất kỳ quyền gì)\numask 027\n\n# Tạo thử file và thư mục để kiểm tra quyền thực tế\ntouch secret.env\nmkdir secret_dir\nls -ld secret.env secret_dir",
              "annotations": [
                {
                  "line": 2,
                  "part": "umask",
                  "text": "In ra giá trị mặt nạ hiện tại dạng số bát phân (octal)."
                },
                {
                  "line": 5,
                  "part": "umask 027",
                  "text": "File: 666 - 027 = 640 (rw-r-----); Thư mục: 777 - 027 = 750 (rwxr-x---). User other bị cấm tuyệt đối."
                },
                {
                  "line": 9,
                  "part": "ls -ld",
                  "text": "Hiển thị phân quyền chi tiết của cả file và thư mục mới tạo."
                }
              ],
              "output": "0022\n-rw-r----- 1 ubuntu ubuntu 0 Oct 28 15:00 secret.env\ndrwxr-x--- 2 ubuntu ubuntu 4096 Oct 28 15:00 secret_dir"
            }
          ]
        },
        {
          "id": "sec-2-4-special-bits",
          "title": "2. Ba quyền đặc biệt: SUID, SGID và Sticky Bit",
          "content": "\n                  <p>Bên cạnh 3 chữ số quyền thông thường (rwx), Linux còn có chữ số thứ tư đứng đầu đại diện cho các quyền đặc biệt:</p>\n                  <ol>\n                    <li><strong>SUID (Set User ID - 4xxx):</strong> Khi một file thực thi có quyền SUID, bất kỳ ai chạy file này cũng sẽ tạm thời được trao quyền hạn của <strong>chủ sở hữu file</strong> (owner). Ví dụ: lệnh <code>/usr/bin/passwd</code> có quyền SUID root để người dùng thường có thể tự ghi mật khẩu mới vào file <code>/etc/shadow</code>.</li>\n                    <li><strong>SGID (Set Group ID - 2xxx):</strong>\n                      <ul>\n                        <li>Trên file: Chạy với quyền của Group sở hữu.</li>\n                        <li>Trên thư mục: <strong>Mọi file/thư mục con được tạo bên trong sẽ tự động kế thừa Group của thư mục cha</strong>, bất kể người tạo thuộc group chính nào.</li>\n                      </ul>\n                    </li>\n                    <li><strong>Sticky Bit (1xxx):</strong> Thường gán cho các thư mục dùng chung như <code>/tmp</code>. Khi được bật, <strong>chỉ có chủ sở hữu file hoặc root mới có quyền xóa hoặc đổi tên file đó</strong>, ngăn chặn người dùng này xóa file của người dùng khác.</li>\n                  </ol>\n                  <div class=\"callout-box danger-box\">\n                    <div class=\"callout-title\">🚨 CẢNH BÁO BẢO MẬT: NGUY CƠ LEO THANG ĐẶC QUYỀN (SUID ROOT)</div>\n                    <p>Hacker khi xâm nhập vào máy chủ luôn quét tìm các file có quyền SUID thuộc sở hữu của root (<code>find / -perm -4000 -user root</code>). Nếu một file script hoặc nhị phân nguy hiểm (như bash, vim, nmap) bị gán nhầm SUID root, kẻ tấn công có thể dễ dàng cướp toàn quyền điều khiển hệ thống!</p>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Thiết lập thư mục chia sẻ nhóm dùng SGID và Sticky Bit",
              "code": "# 1. Tạo thư mục làm việc chung cho nhóm devteam\nsudo mkdir /var/shared_projects\nsudo chown root:devteam /var/shared_projects\n\n# 2. Gán quyền 2775 (SGID: 2, User: 7, Group: 7, Other: 5)\nsudo chmod 2775 /var/shared_projects\n\n# 3. Gán Sticky bit cho thư mục chia sẻ công cộng (1777)\nsudo chmod 1777 /var/public_uploads\n\n# Kiểm tra kết quả phân quyền đặc biệt\nls -ld /var/shared_projects /var/public_uploads",
              "annotations": [
                {
                  "line": 6,
                  "part": "2775",
                  "text": "Số 2 ở đầu kích hoạt SGID; ký tự hiển thị quyền sẽ là drwxrwsr-x (chữ s ở vị trí group)."
                },
                {
                  "line": 9,
                  "part": "1777",
                  "text": "Số 1 ở đầu kích hoạt Sticky Bit; ký tự hiển thị quyền sẽ là drwxrwxrwt (chữ t ở vị trí other)."
                }
              ],
              "output": "drwxrwsr-x 2 root devteam 4096 Oct 28 15:10 /var/shared_projects\ndrwxrwxrwt 2 root root    4096 Oct 28 15:10 /var/public_uploads"
            }
          ]
        },
        {
          "id": "sec-2-4-acl",
          "title": "3. Phân quyền chi tiết với Access Control Lists (ACL)",
          "content": "\n                  <p>Khi quyền chuẩn POSIX (Owner/Group/Other) không đáp ứng nổi bài toán thực tế, ta sử dụng <strong>ACL</strong>.</p>\n                  <p>Các lệnh thao tác với ACL:</p>\n                  <ul>\n                    <li><code>getfacl file_name</code>: Xem danh sách quyền ACL chi tiết của file.</li>\n                    <li><code>setfacl -m u:tên_user:rwx file_name</code>: Thêm hoặc sửa (modify) quyền cho một người dùng cụ thể.</li>\n                    <li><code>setfacl -m g:tên_group:rx file_name</code>: Thêm hoặc sửa quyền cho một nhóm cụ thể.</li>\n                    <li><code>setfacl -x u:tên_user file_name</code>: Xóa bỏ quyền ACL của người dùng khỏi file.</li>\n                    <li><code>setfacl -b file_name</code>: Xóa toàn bộ cấu hình ACL mở rộng, trả file về quyền chuẩn ban đầu.</li>\n                    <li><code>setfacl -d -m g:devs:rwx dir_name</code>: Thiết lập <strong>Default ACL</strong> trên thư mục — mọi file mới sinh ra bên trong sẽ tự động nhận quyền này.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Cấp quyền truy cập cho user deployer mà không đổi chủ sở hữu file",
              "code": "# Xem quyền ACL ban đầu của file cấu hình database\ngetfacl config.json\n\n# Cấp quyền đọc và ghi cho riêng user deployer\nsetfacl -m u:deployer:rw config.json\n\n# Kiểm tra lại: nhận biết dấu + ở cuối chuỗi quyền khi ls -l\nls -l config.json\ngetfacl config.json",
              "annotations": [
                {
                  "line": 5,
                  "part": "setfacl -m u:deployer:rw",
                  "text": "Cấp quyền rw riêng cho deployer mà không cần add deployer vào group sở hữu file."
                },
                {
                  "line": 8,
                  "part": "dấu +",
                  "text": "File có ACL sẽ hiển thị dạng: -rw-rw-r--+ (dấu cộng chỉ báo có quy tắc ACL mở rộng)."
                }
              ],
              "output": "# file: config.json\n# owner: root\n# group: root\nuser::rw-\nuser:deployer:rw-\ngroup::r--\nmask::rw-\nother::r--\n-rw-rw-r--+ 1 root root 512 Oct 28 15:20 config.json"
            }
          ]
        }
      ],
      "scenario": {
        "title": "Tổ chức kho mã nguồn chung giữa nhóm Dev và Tester trên máy chủ staging",
        "content": "\n              <p>Công ty có 2 nhóm cùng làm việc trên thư mục <code>/opt/staging_app</code>: Nhóm <code>devteam</code> cần quyền đọc-ghi-thực thi; Nhóm <code>qateam</code> chỉ được phép đọc và chạy thử nghiệm (không được sửa mã nguồn); User <code>github_bot</code> cần quyền deploy ghi đè khi có commit mới.</p>\n              <p><strong>Giải pháp chuẩn mực:</strong></p>\n              <p>1. Gán quyền nhóm cơ bản cho devteam và bật SGID để các file mới tạo luôn thuộc group devteam:</p>\n              <pre><code>sudo chown -R root:devteam /opt/staging_app\nsudo chmod -R 2770 /opt/staging_app</code></pre>\n              <p>2. Dùng ACL cấp quyền chỉ đọc cho qateam và quyền toàn phần cho github_bot:</p>\n              <pre><code>sudo setfacl -R -m g:qateam:rx /opt/staging_app\nsudo setfacl -R -m u:github_bot:rwx /opt/staging_app</code></pre>\n              <p>3. Thiết lập Default ACL để các file mới do lập trình viên tạo ra cũng tự động áp dụng đúng các quyền trên:</p>\n              <pre><code>sudo setfacl -R -d -m g:qateam:rx /opt/staging_app\nsudo setfacl -R -d -m u:github_bot:rwx /opt/staging_app</code></pre>\n              <p>Hệ thống vận hành trơn tru, không bao giờ bị lỗi 'Permission Denied' khi deploy hay test!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Hiểu nhầm ý nghĩa của cờ Mask trong ACL",
            "content": "Trong kết quả của <code>getfacl</code>, dòng <code>mask</code> quy định <strong>mức trần quyền hạn tối đa</strong> mà các user/group mở rộng có thể nhận được. Nếu mask là <code>r--</code> thì dù bạn setfacl <code>rwx</code>, người đó thực tế cũng chỉ có quyền đọc (effective: r)."
          }
        ],
        "tips": [
          {
            "title": "Dùng getfacl để sao lưu và khôi phục phân quyền hàng loạt",
            "content": "Bạn có thể sao lưu toàn bộ phân quyền của một cây thư mục bằng: <code>getfacl -R /var/www > perms.bak</code> và khôi phục chính xác từng file bằng: <code>setfacl --restore=perms.bak</code>."
          }
        ]
      },
      "exercises": [
        {
          "question": "Lệnh nào sau đây dùng để thiết lập quyền Sticky Bit trên thư mục /shared_cache?",
          "command": "chmod +t /shared_cache",
          "explanation": "chmod +t (hoặc chmod 1777) kích hoạt cờ Sticky Bit, đảm bảo chỉ có người tạo ra file hoặc root mới được phép xóa file đó trong thư mục chung."
        }
      ],
      "summary": [
        "umask quyết định phân quyền mặc định của file (666 - umask) và thư mục (777 - umask) khi vừa sinh ra.",
        "SGID trên thư mục giúp mọi file mới tạo tự động đồng bộ Group; Sticky Bit bảo vệ file trong thư mục dùng chung khỏi bị người khác xóa nhầm.",
        "ACL vượt qua giới hạn 3 lớp quyền truyền thống, cho phép cấp quyền tùy biến tới từng người dùng và nhóm riêng lẻ."
      ]
    },
    {
      "id": "lx-2-05",
      "number": "2.5",
      "title": "Lập trình Shell Script (Bash) thực chiến & Phân tích sâu set -euo pipefail",
      "subtitle": "Xây dựng kịch bản tự động hóa chuẩn phòng thủ công nghiệp, chặn đứng thảm họa rm -rf ngoài ý muốn",
      "level": "Trung cấp",
      "duration": "55 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Nắm vững cấu trúc chuẩn của một Bash script chuyên nghiệp: Shebang, biến môi trường, tham số vị trí, câu lệnh điều kiện [[ ]] và vòng lặp.",
        "Làm chủ hàm (functions), phạm vi biến cục bộ (local) và cơ chế mã thoát exit code (0 vs non-zero).",
        "Mổ xẻ bản chất từng cờ trong 'bùa hộ mệnh' phòng thủ: set -euo pipefail và kỹ thuật bẫy lỗi tự động trap ERR.",
        "Quy tắc cảnh báo đỏ sống còn: Mối nguy từ việc chạy script trực tiếp từ internet bằng curl | bash và quy tắc kiểm thử an toàn."
      ],
      "intuition": {
        "title": "Dây đai an toàn và Cầu dao tự ngắt Aptomat trong nhà máy",
        "metaphor": "Mặc định Bash là một thông dịch viên rất 'vô tư' nhưng vô cùng nguy hiểm: khi một dòng lệnh gặp lỗi, nó vẫn phớt lờ và thản nhiên chạy tiếp các dòng tiếp theo! Giả sử bạn có lệnh `cd /tmp/project_cache` bị thất bại vì gõ sai tên thư mục, dòng tiếp theo `rm -rf *` sẽ xóa sạch thư mục hiện tại mà bạn đang đứng! Bật `set -euo pipefail` giống như gắn aptomat chống giật tự ngắt trong nhà xưởng: hễ biến chưa khai báo (-u), một lệnh thất bại (-e), hay bất kỳ khâu nào trong đường ống bị đứt (-o pipefail), script lập tức ngắt cầu dao dừng lại ngay tức khắc.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🛡️</span>\n                    <span>set -euo pipefail</span>\n                    <span class=\"lx-vs-tag\">Phòng thủ</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>set -e (errexit):</strong> Dừng script ngay khi một câu lệnh trả về exit code khác 0.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>set -u (nounset):</strong> Báo lỗi và dừng script nếu bạn truy cập một biến chưa được gán giá trị (tránh rm -rf \"$DIR/*\" khi DIR rỗng).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>set -o pipefail:</strong> Mặc định pipe trả về mã thoát của lệnh CUỐI CÙNG. Cờ này ép pipe trả về mã lỗi nếu BẤT KỲ lệnh nào trong đường ống bị fail.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚠️</span>\n                    <span>BẪY LỆNH set -e</span>\n                    <span class=\"lx-vs-tag\">Ngoại lệ</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> Lệnh <code>grep \"search\" file</code> trả về mã 1 khi không tìm thấy dòng nào. Với <code>set -e</code>, script sẽ tự sát ngay lập tức!</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Cách khắc phục:</strong> Thêm <code>|| true</code> đằng sau lệnh được phép thất bại (<code>grep \"pattern\" file || true</code>) hoặc bọc trong câu điều kiện <code>if grep ...; then</code>.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-5-syntax-basics",
          "title": "1. Khung sườn cấu trúc chuẩn của một Bash script chuyên nghiệp",
          "content": "\n                  <p>Một file shell script đạt chuẩn sản xuất (production-ready) bắt buộc phải có:</p>\n                  <ul>\n                    <li><strong>Dòng Shebang:</strong> <code>#!/usr/bin/env bash</code> (tính tương thích cao hơn đường dẫn cứng <code>#!/bin/bash</code>).</li>\n                    <li><strong>Cấu hình an toàn:</strong> <code>set -euo pipefail</code> ngay dưới shebang.</li>\n                    <li><strong>Biến và hằng số:</strong> Tên hằng viết hoa (<code>readonly APP_DIR=\"/opt/app\"</code>), tên biến thường viết thường.</li>\n                    <li><strong>Bọc ngoặc kép:</strong> Luôn bọc biến trong dấu ngoặc kép <code>\"$my_var\"</code> để tránh lỗi khi giá trị có khoảng trắng.</li>\n                    <li><strong>Kiểm tra điều kiện:</strong> Luôn dùng dấu ngoặc vuông kép <code>[[ ... ]]</code> (hỗ trợ regex, toán tử logic &&, || chuẩn hơn <code>[ ... ]</code> cũ).</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Mẫu script Bash chuẩn phòng thủ chuyên nghiệp",
              "code": "#!/usr/bin/env bash\nset -euo pipefail\n\n# Khai báo hằng số bảo vệ không thể bị ghi đè\nreadonly SCRIPT_DIR=\"$(cd \"$(dirname \"${BASH_SOURCE[0]}\")\" && pwd)\"\nreadonly TARGET_ENV=\"${1:-development}\"  # Lấy tham số $1, nếu rỗng mặc định là development\n\nlog_info() {\n    echo \"[$(date +'%Y-%m-%d %H:%M:%S')] [INFO] $*\"\n}\n\nlog_error() {\n    echo \"[$(date +'%Y-%m-%d %H:%M:%S')] [ERROR] $*\" >&2\n}\n\n# Bẫy tín hiệu lỗi tự động để in thông báo dòng bị sập\ntrap 'log_error \"Script gặp lỗi tại dòng $LINENO. Thoát khẩn cấp!\"; exit 1' ERR\n\nlog_info \"Bắt đầu khởi chạy kịch bản trên môi trường: $TARGET_ENV\"\nlog_info \"Đường dẫn script: $SCRIPT_DIR\"",
              "annotations": [
                {
                  "line": 2,
                  "part": "set -euo pipefail",
                  "text": "Kích hoạt toàn bộ các cơ chế tự dừng khi lỗi hoặc biến rỗng."
                },
                {
                  "line": 5,
                  "part": "${BASH_SOURCE[0]}",
                  "text": "Cách lấy đường dẫn thực tế của script chính xác 100% kể cả khi được gọi từ thư mục khác."
                },
                {
                  "line": 6,
                  "part": "${1:-development}",
                  "text": "Cú pháp Parameter Expansion: nếu tham số $1 chưa truyền thì nhận giá trị mặc định 'development'."
                },
                {
                  "line": 17,
                  "part": "trap ... ERR",
                  "text": "Tự động bắt lỗi: bất kỳ dòng nào fail sẽ in ra số dòng $LINENO trước khi thoát."
                }
              ],
              "output": "[2026-10-28 15:30:00] [INFO] Bắt đầu khởi chạy kịch bản trên môi trường: development\n[2026-10-28 15:30:00] [INFO] Đường dẫn script: /home/ubuntu/scripts"
            }
          ]
        },
        {
          "id": "sec-2-5-control-flow",
          "title": "2. Cấu trúc rẽ nhánh, Vòng lặp và Hàm (Functions)",
          "content": "\n                  <p>Các toán tử kiểm tra file và chuỗi cốt lõi trong <code>[[ ... ]]</code>:</p>\n                  <ul>\n                    <li><code>-f \"$file\"</code>: Kiểm tra xem tệp tin có tồn tại và là file thông thường.</li>\n                    <li><code>-d \"$dir\"</code>: Kiểm tra xem thư mục có tồn tại.</li>\n                    <li><code>-z \"$str\"</code>: Kiểm tra chuỗi có RỖNG (độ dài bằng 0) hay không.</li>\n                    <li><code>-n \"$str\"</code>: Kiểm tra chuỗi KHÔNG RỖNG.</li>\n                    <li><code>-eq, -ne, -lt, -gt</code>: So sánh số nguyên (bằng, khác, bé hơn, lớn hơn).</li>\n                    <li><code>==, !=</code>: So sánh chuỗi ký tự.</li>\n                  </ul>\n                  <p><strong>Quy tắc viết hàm:</strong> Luôn sử dụng từ khóa <code>local</code> cho các biến bên trong thân hàm để tránh làm ô nhiễm phạm vi biến toàn cục.</p>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Viết hàm kiểm tra trạng thái và vòng lặp duyệt danh sách",
              "code": "#!/usr/bin/env bash\nset -euo pipefail\n\n# Hàm kiểm tra dung lượng ổ đĩa\ncheck_disk_space() {\n    local threshold=90\n    local usage\n    usage=$(df / | awk 'NR==2 {print $5}' | tr -d '%')\n    \n    if [[ \"$usage\" -ge \"$threshold\" ]]; then\n        echo \"CẢNH BÁO: Ổ đĩa đã đầy ${usage}% (Vượt ngưỡng ${threshold}%)\" >&2\n        return 1\n    fi\n    echo \"Ổ đĩa an toàn: ${usage}%\"\n    return 0\n}\n\n# Vòng lặp kiểm tra các file dịch vụ cấu hình\nfor conf_file in /etc/nginx/sites-available/*.conf; do\n    if [[ -f \"$conf_file\" ]]; then\n        echo \"Đang kiểm tra: $(basename \"$conf_file\")\"\n    fi\ndone",
              "annotations": [
                {
                  "line": 5,
                  "part": "local threshold=90",
                  "text": "Biến local chỉ tồn tại bên trong hàm check_disk_space, không làm đè biến ngoài script."
                },
                {
                  "line": 9,
                  "part": "-ge",
                  "text": "Toán tử Greater or Equal (lớn hơn hoặc bằng) dành riêng cho so sánh số nguyên trong Bash."
                },
                {
                  "line": 17,
                  "part": "for ... in *.conf",
                  "text": "Vòng lặp duyệt an toàn qua danh sách file khớp pattern."
                }
              ],
              "output": "Ổ đĩa an toàn: 42%\nĐang kiểm tra: default.conf\nĐang kiểm tra: api.conf"
            }
          ]
        },
        {
          "id": "sec-2-5-curl-pipe-bash",
          "title": "3. Cảnh báo đỏ: Sự nguy hiểm chết người của curl ... | bash",
          "content": "\n                  <div class=\"callout-box danger-box\">\n                    <div class=\"callout-title\">🚨 CẢNH BÁO ĐỎ: TUYỆT ĐỐI KHÔNG CHẠY curl | bash TRÊN SERVER PRODUCTION</div>\n                    <p>Nhiều hướng dẫn trên mạng thường bảo bạn gõ lệnh: <code>curl -fsSL https://example.com/install.sh | bash</code>.</p>\n                    <p><strong>Các hiểm họa chí tử:</strong></p>\n                    <ol>\n                      <li><strong>Nguy cơ Man-in-the-Middle hoặc máy chủ bị hack:</strong> Kẻ tấn công có thể chèn mã độc vào script để cướp quyền root hoặc cài botnet đào tiền ảo.</li>\n                      <li><strong>Đứt kết nối mạng giữa chừng (Truncated Script Execution):</strong> Nếu kết nối mạng bị rớt khi curl mới tải được 50% nội dung, Bash vẫn sẽ thực thi nửa đầu của script! Nếu đoạn bị cắt nằm đúng giữa lệnh <code>rm -rf /tmp/build/$SUBDIR</code> thành <code>rm -rf /tmp/build/</code> hoặc <code>rm -rf /</code>, hệ thống sẽ bị phá hủy hoàn toàn!</li>\n                    </ol>\n                    <div class=\"lx-safe-alternative\">\n                      <strong>Quy trình thực thi chuẩn an toàn 3 bước:</strong>\n                      <br>1. Tải script về file cục bộ: <code>curl -fsSL https://example.com/install.sh -o install.sh</code>\n                      <br>2. Mở file ra đọc và kiểm tra mã nguồn (hoặc kiểm tra mã băm sha256 checksum): <code>less install.sh</code>\n                      <br>3. Chỉ sau khi chắc chắn script an toàn mới thực thi: <code>bash install.sh</code>\n                    </div>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Quy trình kiểm tra mã băm SHA256 an toàn trước khi chạy script cài đặt",
              "code": "# Bước 1: Tải file cài đặt về ổ đĩa\ncurl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh -o install_nvm.sh\n\n# Bước 2: Kiểm tra nội dung mã nguồn\nhead -n 20 install_nvm.sh\n\n# Bước 3: Tính toán mã băm SHA256\nsha256sum install_nvm.sh\n\n# Bước 4: Thực thi sau khi xác nhận tính toàn vẹn\nbash install_nvm.sh",
              "annotations": [
                {
                  "line": 2,
                  "part": "-o install_nvm.sh",
                  "text": "Lưu trực tiếp thành file tĩnh trên đĩa, không bao giờ pipe trực tiếp sang bash."
                },
                {
                  "line": 8,
                  "part": "sha256sum",
                  "text": "So khớp mã băm với thông báo phát hành chính thức của tác giả để chống giả mạo."
                }
              ],
              "output": "=> Downloading nvm as script to '/home/ubuntu/.nvm'\n=> Appending nvm source string to /home/ubuntu/.bashrc\n=> Close and reopen your terminal to start using nvm"
            }
          ]
        }
      ],
      "scenario": {
        "title": "Xây dựng script tự động deploy ứng dụng Python an toàn với cơ chế rollback",
        "content": "\n              <p>Mỗi lần cập nhật ứng dụng lên server, bạn phải thực hiện một chuỗi thao tác lặp lại: Pull git, kích hoạt virtualenv, cài thư viện mới qua pip, chạy migrate cơ sở dữ liệu và restart dịch vụ. Nếu bước migrate database bị lỗi nhưng script vẫn chạy tiếp bước restart, ứng dụng sẽ bị crash ngay lập tức.</p>\n              <p><strong>Giải pháp:</strong> Viết kịch bản <code>deploy.sh</code> áp dụng <code>set -euo pipefail</code> và bẫy <code>trap ERR</code>. Khi bất kỳ lệnh pip hay migrate nào thất bại, script lập tức dừng lại, hoàn tác git commit cũ (<code>git reset --hard HEAD@{1}</code>) và gửi thông báo lỗi về Telegram mà không làm sập dịch vụ đang chạy.</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Quên khai báo readonly cho các biến hằng số cấu hình",
            "content": "Nếu một biến quan trọng như <code>APP_PATH=\"/var/www/app\"</code> vô tình bị gán lại trong một vòng lặp thành rỗng, các lệnh xóa dữ liệu sau đó có thể gây hậu quả thảm khốc."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng công cụ shellcheck để kiểm tra lỗi cú pháp",
            "content": "Cài đặt <code>shellcheck</code> (<code>sudo apt install shellcheck</code>) và chạy <code>shellcheck myscript.sh</code> trước khi đưa script lên server để phát hiện sớm các bẫy lỗi tiềm ẩn."
          }
        ]
      },
      "exercises": [
        {
          "question": "Trong Bash script có set -e, tại sao lệnh grep không tìm thấy dòng lại làm sập script và cách xử lý an toàn là gì?",
          "command": "grep 'pattern' file.txt || true",
          "explanation": "Khi grep không tìm thấy kết quả, nó trả về exit code 1. set -e hiểu đây là lỗi và tự ngắt script. Thêm || true ép giá trị biểu thức luôn trả về 0 (thành công) để script tiếp tục chạy."
        }
      ],
      "summary": [
        "Luôn mở đầu mọi kịch bản Bash bằng #!/usr/bin/env bash và set -euo pipefail.",
        "Bọc mọi biến trong dấu ngoặc kép \"$VAR\" và dùng ngoặc vuông kép [[ ]] để kiểm tra điều kiện an toàn.",
        "Tuyệt đối không chạy curl | bash trực tiếp; luôn tải về đĩa, xem xét mã nguồn và kiểm tra checksum trước khi thực thi."
      ]
    },
    {
      "id": "lx-2-06",
      "number": "2.6",
      "title": "Tự động hóa tác vụ định kỳ với cron (flock) & systemd cơ bản (systemctl, journalctl)",
      "subtitle": "Lập lịch chạy tác vụ tự động hằng đêm và quản lý trạng thái các dịch vụ cốt lõi của hệ điều hành",
      "level": "Trung cấp",
      "duration": "45 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "Làm chủ cú pháp 5 trường thời gian của crontab (phút, giờ, ngày trong tháng, tháng, ngày trong tuần).",
        "Nhận diện và hóa giải 2 cạm bẫy lớn nhất của cron: thiếu biến môi trường PATH và nguy cơ chạy đè tiến trình (khắc phục bằng flock).",
        "Làm quen với systemd: kiến trúc PID 1 và các lệnh systemctl kiểm soát trạng thái dịch vụ (start, stop, restart, enable, status).",
        "Truy vấn và giám sát log dịch vụ thời gian thực với journalctl."
      ],
      "intuition": {
        "title": "Đồng hồ báo thức cơ khí và Khóa chốt an toàn flock",
        "metaphor": "cron giống như chiếc đồng hồ báo thức cơ khí: đúng 2 giờ sáng là reng chuông gọi việc. Nhưng chiếc đồng hồ này rất 'ngờ nghệch': nếu công việc sao lưu hôm trước bị nghẽn mạng kéo dài hơn 24 giờ, đúng 2 giờ sáng hôm sau cron vẫn vô tư gọi thêm một tiến trình sao lưu thứ hai đè lên tiến trình thứ nhất, làm nghẽn ổ đĩa và treo cứng server! Lệnh flock hoạt động như chiếc chốt cửa: tiến trình mới đến thấy cửa đang chốt (file lock đang bị giữ) sẽ tự động rút lui trong trật tự mà không gây xung đột.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⏰</span>\n                    <span>5 TRƯỜNG CRONTAB</span>\n                    <span class=\"lx-vs-tag\">* * * * *</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Trường 1 (0-59):</strong> Phút.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Trường 2 (0-23):</strong> Giờ trong ngày.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Trường 3 (1-31):</strong> Ngày trong tháng.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Trường 4 (1-12):</strong> Tháng trong năm.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Trường 5 (0-7):</strong> Thứ trong tuần (0 hoặc 7 = Chủ nhật).</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔒</span>\n                    <span>KHÓA VỚI FLOCK</span>\n                    <span class=\"lx-vs-tag\">Chống đè</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>flock -n /var/lock/backup.lock</code>: Cờ <code>-n</code> (non-blocking) cố gắng lấy khóa. Nếu tiến trình cũ chưa xong, nó lập tức thoát với mã khác 0 thay vì xếp hàng chờ.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> Bảo vệ tuyệt đối cho các tác vụ nặng: sao lưu dữ liệu, đồng bộ thư mục qua mạng rsync.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-6-crontab-syntax",
          "title": "1. Cấu hình lập lịch crontab và giải quyết bẫy môi trường PATH",
          "content": "\n                  <p>Để quản lý lịch trình cá nhân của người dùng, dùng lệnh: <code>crontab -e</code> (sửa lịch), <code>crontab -l</code> (xem lịch), <code>crontab -r</code> (xóa lịch).</p>\n                  <p><strong>Cạm bẫy sống còn số 1 của cron: MÔI TRƯỜNG THIẾU THỐNG NHẤT (Minimal PATH)</strong></p>\n                  <p>Khi bạn gõ lệnh trên terminal, shell nạp đầy đủ PATH từ <code>~/.bashrc</code> (bao gồm <code>/usr/local/bin</code>, <code>~/.local/bin</code>, môi trường Python venv). Nhưng cron khởi chạy với một môi trường vô cùng tối giản, thường chỉ có <code>/usr/bin:/bin</code>!</p>\n                  <p>Kết quả là: script chạy tay từ terminal rất mượt mà, nhưng đặt vào cron lại lăn ra chết với lỗi: <code>command not found</code>!</p>\n                  <div class=\"callout-box info-box\">\n                    <div class=\"callout-title\">💡 2 Giải pháp triệt để cho vấn đề PATH trong cron</div>\n                    <ol>\n                      <li>Khai báo dòng <code>PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin</code> ngay dòng đầu tiên của file crontab.</li>\n                      <li>Luôn luôn sử dụng đường dẫn tuyệt đối cho toàn bộ câu lệnh và tệp thực thi (ví dụ: dùng <code>/usr/bin/python3</code> thay vì <code>python3</code>).</li>\n                    </ol>\n                  </div>\n                ",
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
          "title": "2. Quản lý trạng thái dịch vụ hệ thống với systemctl",
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
          "title": "3. Truy vấn log hệ thống tập trung bằng journalctl",
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
        }
      ],
      "scenario": {
        "title": "Khắc phục sự cố script đồng bộ dữ liệu chạy đè làm nghẽn I/O ổ đĩa lúc nửa đêm",
        "content": "\n              <p>Mỗi đêm lúc 01:00 AM, cron kích hoạt một script rsync đồng bộ 500GB dữ liệu sang server dự phòng. Bình thường script chạy mất 45 phút. Một đêm nọ, đường truyền cáp quang biển bị suy hao, tốc độ mạng giảm xuống 1/10. Script rsync của ngày hôm trước chạy tới 28 tiếng vẫn chưa xong.</p>\n              <p>Hậu quả: 01:00 AM đêm tiếp theo, cron tiếp tục khởi chạy thêm một tiến trình rsync thứ hai; rồi đêm tiếp theo lại thêm một tiến trình thứ ba! Ba tiến trình rsync cùng đọc một ổ cứng đồng thời khiến IOPS đạt trần 100%, làm sập luôn toàn bộ cơ sở dữ liệu trên server.</p>\n              <p><strong>Giải pháp tức thì:</strong> Bọc lệnh cron bằng <code>flock -n /var/lock/rsync_backup.lock</code>. Kể từ đó, nếu tác vụ hôm trước còn đang chạy, tác vụ mới sẽ nhẹ nhàng bỏ qua phiên chạy mà không bao giờ gây nghẽn đĩa!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Quên dòng xuống dòng trống ở cuối file crontab",
            "content": "Một số phiên bản cron kinh điển (Vixie Cron) yêu cầu ký tự xuống dòng (Newline) ở cuối tệp. Nếu bạn viết dòng cron ở dòng cuối cùng mà không nhấn Enter xuống dòng, cron daemon có thể bỏ qua không chạy dòng đó mà không hề báo lỗi!"
          }
        ],
        "tips": [
          {
            "title": "Kiểm tra cú pháp cron trực quan bằng crontab.guru",
            "content": "Nếu bạn không chắc chắn biểu thức `0 3 * * 1-5` chạy vào thời điểm nào, hãy tra cứu nhanh trên trang web crontab.guru để xác nhận mô tả bằng tiếng người trước khi lưu vào server."
          }
        ]
      },
      "exercises": [
        {
          "question": "Biểu thức crontab nào sau đây sẽ chạy script vào lúc 04:00 sáng ngày mùng 1 hàng tháng?",
          "command": "0 4 1 * * /path/to/script.sh",
          "explanation": "Trường 1 (phút) = 0, Trường 2 (giờ) = 4, Trường 3 (ngày trong tháng) = 1, Trường 4 và 5 để dấu sao (*) tức chạy vào mỗi tháng và bất kể thứ mấy."
        }
      ],
      "summary": [
        "cron là công cụ lập lịch tác vụ định kỳ kinh điển; luôn khai báo PATH rõ ràng và dùng flock để chống chạy đè tiến trình.",
        "systemd là kiến trúc quản lý dịch vụ hiện đại; systemctl start/stop/restart/enable kiểm soát vòng đời ứng dụng.",
        "journalctl gom toàn bộ log hệ thống vào một mối; dùng -u và -f để điều tra sự cố dịch vụ thời gian thực."
      ]
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
        "Thay thế hoàn toàn các công cụ mạng cũ: dùng ip addr/ip route thay cho ifconfig/route, dùng ss thay cho netstat.",
        "Sử dụng thành thạo bộ công cụ chẩn đoán: ping kiểm tra độ trễ, curl -I khảo sát HTTP header, traceroute kiểm tra nút mạng, dig/nslookup tra cứu DNS.",
        "Khởi tạo và quản lý SSH Key thế hệ mới theo thuật toán mã hóa đường cong elip ed25519 (an toàn và nhẹ hơn RSA 2048 cũ).",
        "Làm chủ tệp ~/.ssh/config để kết nối máy chủ phức tạp (đổi port, user, key, proxy jump) chỉ bằng một từ khóa ngắn gọn."
      ],
      "intuition": {
        "title": "Cổng hải quan sân bay và Hộ chiếu sinh trắc học",
        "metaphor": "Mỗi cổng mạng (port) trên server giống như một cửa khẩu hải quan: port 22 dành cho nhân viên quản trị (SSH), port 80/443 dành cho khách tham quan website (HTTP/HTTPS), port 5432 dành cho phòng thủ quỹ (PostgreSQL). Lệnh ss -tulpn là bảng điện tử cho bạn biết cửa khẩu nào đang mở và đơn vị nào đang túc trực. Đăng nhập bằng mật khẩu truyền thống giống như dùng chìa khóa cơ dễ bị trộm bẻ khóa tự động (brute-force); SSH Key ed25519 giống như hộ chiếu sinh trắc học không thể làm giả, cho phép đăng nhập tức thì mà bảo mật tuyệt đối.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔌</span>\n                    <span>NETSTAT vs SS</span>\n                    <span class=\"lx-vs-tag\">Khảo sát Socket</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>netstat</code> đọc chậm qua file ảo /proc/net, đã bị khai tử khỏi chuẩn Linux chính thức.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>ss -tulpn</code> (Socket Statistics) giao tiếp trực tiếp với Kernel Netlink, trả về kết quả tức thì ngay cả khi có hàng chục ngàn kết nối.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔐</span>\n                    <span>RSA vs ED25519</span>\n                    <span class=\"lx-vs-tag\">Khóa SSH</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>RSA (2048/4096-bit):</strong> Thuật toán cũ, khóa dài cồng kềnh, tốc độ ký chậm hơn.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>ED25519 (256-bit):</strong> Đường cong elip thế hệ mới, khóa cực ngắn, tốc độ xác thực siêu nhanh và độ bảo mật tương đương RSA 3072-bit!</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-7-ip-ss",
          "title": "1. Khảo sát mạng hiện đại với ip và ss",
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
          "title": "2. Thiết lập khóa SSH ed25519 thế hệ mới và copy khóa an toàn",
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
          "title": "3. Làm chủ tệp cấu hình ~/.ssh/config",
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
        }
      ],
      "scenario": {
        "title": "Truy cập an toàn vào cụm máy chủ Private Database thông qua Bastion Jump Host",
        "content": "\n              <p>Trong kiến trúc bảo mật đám mây (AWS/GCP/Private Cloud), máy chủ chứa Database (IP nội bộ <code>10.0.1.50</code>) không có IP công khai ra internet. Mọi truy cập quản trị bắt buộc phải nhảy qua một máy chủ pháo đài trung gian gọi là Bastion Host (IP công khai <code>203.0.113.10</code>).</p>\n              <p>Thay vì phải SSH 2 lần thủ công, bạn sử dụng chỉ thị <code>ProxyJump</code> trong file <code>~/.ssh/config</code>:</p>\n              <pre><code>Host bastion\n    HostName 203.0.113.10\n    User jump_user\n    IdentityFile ~/.ssh/id_ed25519_bastion\n\nHost db-prod\n    HostName 10.0.1.50\n    User dbadmin\n    IdentityFile ~/.ssh/id_ed25519_db\n    ProxyJump bastion</code></pre>\n              <p>Bây giờ chỉ cần gõ: <code>ssh db-prod</code>, máy tính của bạn sẽ tự động thiết lập đường hầm SSH xuyên qua Bastion Host để vào thẳng Database trong tích tắc, vừa an toàn tuyệt đối vừa cực kỳ tiện lợi!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi phân quyền quá lỏng lẻo trên thư mục ~/.ssh",
            "content": "SSH client rất nghiêm ngặt về bảo mật. Nếu thư mục <code>~/.ssh</code> hoặc file khóa riêng <code>id_ed25519</code> có quyền lớn hơn <code>600</code> (ví dụ: bị chmod 777), SSH sẽ lập tức từ chối kết nối với lỗi: <code>Permissions 0777 for 'id_ed25519' are too open</code>. Luôn nhớ: <code>chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_*</code>."
          }
        ],
        "tips": [
          {
            "title": "Tùy biến alias tiện dụng trong file ~/.bashrc",
            "content": "Thêm các alias thông minh sau vào <code>~/.bashrc</code> để tăng năng suất làm việc: <code>alias ports='sudo ss -tulpn'</code>, <code>alias myip='curl -s ifconfig.me'</code>, <code>alias ll='ls -la --color=auto'</code>."
          }
        ]
      },
      "exercises": [
        {
          "question": "Lệnh nào sau đây kiểm tra xem dịch vụ SSH trên máy chủ từ xa có đang mở cổng 22 và phản hồi hay không mà không cần đăng nhập?",
          "command": "nc -zv 203.0.113.50 22",
          "explanation": "Lệnh netcat (nc -zv) kiểm tra kết nối TCP tới cổng chỉ định với chế độ zero-I/O (-z) và in chi tiết (-v) để biết port có đang mở hay bị tường lửa chặn."
        }
      ],
      "summary": [
        "Dùng ip addr/route và ss -tulpn thay thế hoàn toàn cho ifconfig và netstat đã lỗi thời.",
        "Khóa SSH ed25519 là chuẩn mực mã hóa hiện đại hàng đầu: nhẹ, nhanh và an toàn vượt trội.",
        "Làm chủ ~/.ssh/config giúp rút gọn thao tác đăng nhập SSH vào cụm nhiều máy chủ chỉ bằng một từ khóa ngắn."
      ]
    },
    {
      "id": "lx-2-08",
      "number": "2.8",
      "title": "Quản lý đĩa, Dung lượng & Hệ thống file cơ bản (df, du, mount, lsblk, xử lý cạn Inode)",
      "subtitle": "Chẩn đoán ổ đĩa đầy, giải quyết sự cố hiểm hóc đĩa báo đầy 100% nhưng df còn trống dung lượng",
      "level": "Trung cấp",
      "duration": "45 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "Khảo sát cấu trúc phân vùng ổ cứng với lsblk và kiểm tra UUID bằng blkid.",
        "Phân tích dung lượng trống với df -h và truy tìm các thư mục khổng lồ với du -sh * | sort -h.",
        "Hiểu bản chất bảng Inode: giải quyết triệt để sự cố đĩa còn hàng trăm GB nhưng không thể ghi thêm file do cạn Inode (df -i).",
        "Nắm vững kỹ thuật mount/umount và phát hiện sự cố file đã xóa nhưng tiến trình vẫn giữ file descriptor (lsof | grep deleted)."
      ],
      "intuition": {
        "title": "Bãi đỗ xe và Cuốn sổ ghi vé kiểm soát",
        "metaphor": "Hệ thống file giống như một bãi đỗ xe rộng lớn: dung lượng gigabyte là diện tích mặt đất của bãi xe, còn bảng Inode là cuốn sổ ghi vé xe để kiểm soát từng chiếc xe vào bãi. Mỗi tệp tin sinh ra bắt buộc phải tiêu tốn 1 Inode trong cuốn sổ. Nếu bạn cho hàng triệu chiếc xe đạp mini (hàng triệu file session/cache siêu nhỏ) vào gửi, cuốn sổ vé xe có thể bị hết trang sạch bóng (100% Inode) trong khi mặt bãi đất vẫn còn trống hàng trăm Gigabyte! Lúc này, hệ thống sẽ kiên quyết từ chối ghi thêm bất kỳ file nào.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>💾</span>\n                    <span>df -h vs df -i</span>\n                    <span class=\"lx-vs-tag\">Đĩa vs Inode</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>df -h (Disk Space):</strong> Đo lường số Gigabytes/Megabytes còn lại trên phân vùng.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>df -i (Inodes Count):</strong> Đo lường số lượng tệp tin tối đa còn có thể tạo mới. Một trong hai con số này đạt 100% đều làm tê liệt ổ đĩa!</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>👻</span>\n                    <span>FILE MA TRÊN ĐĨA</span>\n                    <span class=\"lx-vs-tag\">Deleted Open</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Hiện tượng:</strong> Bạn dùng lệnh <code>rm access.log</code> để xóa file log 20GB, nhưng <code>df -h</code> vẫn báo ổ cứng đầy 100%!</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bản chất:</strong> Nginx vẫn đang mở tệp tin đó (Open File Descriptor). Linux chỉ giải phóng block dữ liệu khi tiến trình đóng file hoặc reload!</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-8-lsblk-df-du",
          "title": "1. Khảo sát phân vùng và dung lượng ổ cứng với lsblk, df và du",
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
          "title": "2. Cơn ác mộng cạn kiệt Inode và cách điều tra",
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
          "title": "3. Xử lý sự cố 'Đã xóa file nhưng ổ đĩa không giải phóng dung lượng'",
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
        }
      ],
      "scenario": {
        "title": "Cứu nguy máy chủ database bị sập lúc 3h sáng do cạn Inode vì thư mục session",
        "content": "\n              <p>Một ứng dụng web cũ sinh ra file session người dùng nhưng cron dọn dẹp bị hỏng. Sau 6 tháng, thư mục <code>/var/lib/php/sessions/</code> tích tụ hơn 3 triệu tệp tin rác. Ổ cứng 500GB mới chỉ dùng 40GB dung lượng, nhưng phân vùng <code>/</code> chạm mốc 100% Inode khiến cơ sở dữ liệu MySQL không thể tạo file khóa <code>.lock</code> và sập hoàn toàn.</p>\n              <p><strong>Bước 1:</strong> Bạn gõ lệnh <code>rm /var/lib/php/sessions/*</code> và bị lỗi <code>Argument list too long</code>.</p>\n              <p><strong>Bước 2:</strong> Bạn bình tĩnh sử dụng <code>find</code> kết hợp <code>-delete</code> để xóa trực tiếp từng Inode:</p>\n              <pre><code>sudo find /var/lib/php/sessions -type f -name \"sess_*\" -delete</code></pre>\n              <p>Chỉ sau 2 phút, 3 triệu file rác bị quét sạch, Inode giảm từ 100% xuống 12%, MySQL khởi động lại thành công rực rỡ!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Không bao giờ dùng lệnh rm để dọn file log đang ghi trực tiếp",
            "content": "Thay vì <code>rm big_log.log</code>, hãy dùng lệnh làm rỗng an toàn: <code>truncate -s 0 big_log.log</code> hoặc <code>> big_log.log</code>. Dung lượng sẽ được giải phóng ngay lập tức mà không gây hiện tượng file ma (deleted file lock)."
          }
        ],
        "tips": [
          {
            "title": "Luôn kiểm tra cả df -h và df -i trong kịch bản cảnh báo",
            "content": "Một script giám sát đĩa chuyên nghiệp phải luôn kiểm tra song song cả hai chỉ số: nếu dung lượng > 90% HOẶC Inode > 90% thì đều phải kích hoạt thông báo khẩn cấp."
          }
        ]
      },
      "exercises": [
        {
          "question": "Lệnh nào sau đây dùng để hiển thị dung lượng đĩa của phân vùng hiện tại ở dạng Megabyte và Gigabyte dễ đọc?",
          "command": "df -h .",
          "explanation": "df -h . kiểm tra phân vùng gắn kết tại thư mục hiện tại và định dạng kết quả theo đơn vị K, M, G dễ đọc."
        }
      ],
      "summary": [
        "Kiểm tra ổ đĩa toàn diện bằng bộ ba lsblk, df -h (dung lượng) và df -i (số lượng Inode).",
        "Cạn Inode khiến hệ thống không thể tạo thêm file mới dù ổ đĩa vẫn còn trống hàng chục Gigabyte.",
        "Xóa file bằng rm khi tiến trình đang mở sẽ không giải phóng đĩa; dùng lsof +L1 để tìm và truncate hoặc reload dịch vụ."
      ]
    },
    {
      "id": "lx-2-09",
      "number": "2.9",
      "title": "Dự án Thực hành Cấp 2: Script sao lưu tự động xoay vòng 7 ngày & 3 Kịch bản Sự cố",
      "subtitle": "Tích hợp toàn diện shell script, cron, find, tar và quản lý tiến trình vào một hệ thống bảo vệ dữ liệu tự động",
      "level": "Dự án",
      "duration": "70 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "Xây dựng script sao lưu dự án công nghiệp: kiểm tra dung lượng ổ đĩa, nén tar.gz gắn mác ngày giờ, ghi log chuẩn mực và tự dọn dẹp bản sao lưu cũ.",
        "Tự động hóa kịch bản chạy hằng đêm bằng cron kết hợp khóa chống chạy đè flock.",
        "Tự tay chẩn đoán và khắc phục 3 kịch bản sự cố vận hành thực tế thường gặp nhất của các kỹ sư hệ thống."
      ],
      "intuition": {
        "title": "Hộp đen cứu nạn và Diễn tập phòng cháy chữa cháy",
        "metaphor": "Một kỹ sư vận hành giỏi không phải là người cầu nguyện hệ thống không bao giờ gặp lỗi, mà là người đã chuẩn bị sẵn hệ thống sao lưu tự động vững chắc để khôi phục mọi thứ trong vài phút khi thảm họa xảy ra. Các kịch bản sự cố ở phần cuối bài học chính là các bài diễn tập thực chiến giúp bạn rèn luyện sự bình tĩnh và phản xạ chẩn đoán chính xác.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📦</span>\n                    <span>SCRIPT SAO LƯU</span>\n                    <span class=\"lx-vs-tag\">Backup Engine</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Phòng thủ:</strong> set -euo pipefail + trap ERR ghi nhận lỗi chính xác.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Kiểm tra đĩa:</strong> Hủy bỏ an toàn nếu phân vùng backup còn dưới 10% dung lượng trống.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Nén tar.gz:</strong> Đóng gói mã nguồn và file cấu hình với nhãn thời gian YYYY-MM-DD_HHMMSS.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Xoay vòng (Retention):</strong> Tự động xóa các bản sao lưu cũ hơn 7 ngày bằng find -mtime +7.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔥</span>\n                    <span>3 KỊCH BẢN SỰ CỐ</span>\n                    <span class=\"lx-vs-tag\">Chẩn đoán</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 1:</strong> Ổ cứng báo đầy 100% nhưng du không tìm thấy file lớn (Open File Descriptor).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 2:</strong> Script chạy tay thành công nhưng cron chạy thất bại (Lỗi môi trường PATH).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 3:</strong> Ứng dụng web Python không thể khởi động vì cổng 8000 bị chiếm dụng.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-9-script-code",
          "title": "1. Mã nguồn hoàn chỉnh Script sao lưu dự án công nghiệp: auto_backup.sh",
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
          "title": "2. Đặt lịch Cron định kỳ với khóa chốt an toàn flock",
          "content": "\n                  <p>Sau khi test script chạy tay thành công, mở crontab bằng lệnh <code>sudo crontab -e</code> và đặt lịch chạy tự động vào lúc 02:30 AM mỗi ngày:</p>\n                  <pre><code>SHELL=/bin/bash\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin\n\n# Chạy backup dự án mỗi 02:30 sáng, chống chạy đè bằng flock\n30 2 * * * /usr/bin/flock -n /var/lock/auto_backup.lock /opt/scripts/auto_backup.sh</code></pre>\n                "
        },
        {
          "id": "sec-2-9-troubleshoot-scenarios",
          "title": "3. Diễn tập 3 Kịch bản Sự cố Tự chẩn đoán (Troubleshooting Scenarios)",
          "content": "\n                  <p>Hãy thử tài suy luận của bạn với 3 bài toán sự cố thực tế dưới đây trước khi bấm mở xem lời giải!</p>\n                "
        }
      ],
      "exercises": [
        {
          "question": "SỰ CỐ 1: Phân vùng /var báo đầy 100% dung lượng nhưng lệnh du -sh /var/* cộng lại chỉ thấy dùng 5GB trên tổng số 100GB. Nguyên nhân là gì và cách xử lý dứt điểm?",
          "command": "sudo lsof +L1 /var | grep '(deleted)'",
          "explanation": "NGUYÊN NHÂN: Một file log lớn đã bị xóa bằng lệnh rm nhưng tiến trình dịch vụ (như Nginx, Gunicorn) vẫn đang mở giữ file descriptor, khiến Kernel chưa thể giải phóng các block đĩa.\nCÁCH XỬ LÝ: Chạy lệnh 'sudo lsof +L1 /var' để tìm PID của tiến trình đang giữ file ma, sau đó reload dịch vụ (sudo systemctl reload nginx) hoặc làm rỗng file trực tiếp qua proc (/proc/[PID]/fd/[FD])."
        },
        {
          "question": "SỰ CỐ 2: Script sao lưu chạy trực tiếp từ dòng lệnh terminal thì thành công mỹ mãn, nhưng khi để cron chạy tự động hằng đêm thì file log báo lỗi: 'python3: command not found'. Tại sao?",
          "command": "which python3",
          "explanation": "NGUYÊN NHÂN: cron khởi chạy với biến môi trường PATH cực kỳ tối giản (chỉ có /usr/bin:/bin), không có đường dẫn tới thư mục chứa python3 của bạn (ví dụ /usr/local/bin hoặc môi trường ảo pyenv).\nCÁCH XỬ LÝ: Khai báo dòng PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin ở đầu file crontab, hoặc sử dụng đường dẫn tuyệt đối /usr/local/bin/python3 trong script."
        },
        {
          "question": "SỰ CỐ 3: Ứng dụng web Python khởi động báo lỗi 'OSError: [Errno 98] Address already in use: 0.0.0.0:8000'. Làm sao tìm và giải phóng cổng 8000 ngay lập tức?",
          "command": "sudo ss -tulpn | grep ':8000'\n# Lấy PID tìm được và tắt tiến trình:\nsudo kill -15 [PID]",
          "explanation": "NGUYÊN NHÂN: Một phiên bản tiến trình cũ của ứng dụng chưa được tắt hẳn và vẫn đang chiếm dụng socket cổng 8000.\nCÁCH XỬ LÝ: Dùng 'sudo ss -tulpn | grep :8000' để tìm chính xác PID đang chiếm cổng, sau đó gửi tín hiệu 'sudo kill -15 [PID]'. Nếu sau 5 giây vẫn không nhả port mới dùng 'sudo kill -9 [PID]'."
        }
      ],
      "summary": [
        "Dự án sao lưu tự động tích hợp trọn vẹn set -euo pipefail, trap ERR, nén tar.gz và xoay vòng 7 ngày bằng find.",
        "Luôn bảo vệ các tác vụ cron định kỳ bằng khóa flock để loại trừ nguy cơ chồng chéo tiến trình làm treo server.",
        "Luyện tập kỹ năng bắt bệnh sự cố thực tế với lsof +L1, phân tích môi trường PATH và giải phóng cổng mạng bằng ss."
      ]
    },
    {
      "id": "lx-2-10",
      "number": "2.10",
      "title": "Bảng tra cứu Lệnh & Thuật ngữ Cấp 2 (Cheat Sheet & Glossary)",
      "subtitle": "Sổ tay tra cứu nhanh toàn diện các lệnh xử lý văn bản, shell script, quản lý tiến trình, mạng và lưu trữ",
      "level": "Tra cứu",
      "duration": "25 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Tra cứu tức thì cú pháp và cờ thông dụng của bộ công cụ xử lý văn bản (grep, sed, awk, sort, uniq, cut, tr, wc).",
        "Nắm vững bảng lệnh quản lý tiến trình, tín hiệu UNIX, lập lịch cron và quản lý dịch vụ systemctl/journalctl.",
        "Tra cứu bảng phím tắt quản trị mạng, SSH và hệ thống file Inode.",
        "Hệ thống hóa từ điển thuật ngữ cốt lõi của Cấp 2: Inode, umask, ACL, SUID, SGID, Sticky Bit, Graceful Shutdown, flock."
      ],
      "intuition": {
        "title": "Túi đồ nghề cứu hộ của kỹ sư hệ thống",
        "metaphor": "Một kỹ sư thực chiến không cần phải nhồi nhét ghi nhớ từng cờ lệnh trong đầu; điều quan trọng nhất là bạn hiểu bản chất công cụ nào sinh ra để giải quyết bài toán nào và tra cứu chính xác cú pháp từ bảng tổng kết này khi tác chiến trên máy chủ.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📑</span>\n                    <span>CHEAT SHEET CẤP 2</span>\n                    <span class=\"lx-vs-tag\">Tra cứu</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>grep -rnE \"pattern\" dir/</code>: Lọc đệ quy regex kèm số dòng.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>find -print0</code> + <code>xargs -0 rm</code>: Xóa file an toàn.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>ps aux --sort=-%mem | head</code>: Tìm tiến trình ngốn RAM.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>ss -tulpn</code>: Xem các port đang mở.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📚</span>\n                    <span>THUẬT NGỮ CẤP 2</span>\n                    <span class=\"lx-vs-tag\">Glossary</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Inode:</strong> Cấu trúc dữ liệu lưu metadata của file (quyền, kích thước, vị trí block trên đĩa).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Graceful Shutdown:</strong> Thoát ứng dụng trật tự sau khi đóng hết kết nối dữ liệu.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>flock:</strong> Khóa chốt ngăn ngừa 2 tiến trình chạy đè lên nhau.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-2-10-cheatsheet-text",
          "title": "1. Bảng tra cứu Lệnh Xử lý Văn bản & Regex",
          "content": "\n                  <div class=\"table-container\">\n                    <table class=\"data-table\">\n                      <thead>\n                        <tr>\n                          <th>Lệnh &amp; Cú pháp</th>\n                          <th>Ý nghĩa &amp; Chức năng</th>\n                          <th>Ví dụ thực tế</th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td><code>grep -E \"p1|p2\" file</code></td>\n                          <td>Lọc dòng chứa pattern mở rộng (ERE)</td>\n                          <td><code>grep -E \"(ERROR|WARN)\" app.log</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>grep -rn --include=\"*.py\" str</code></td>\n                          <td>Tìm đệ quy trong file Python, in số dòng</td>\n                          <td><code>grep -rn --include=\"*.py\" \"secret\" .</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>sed -i.bak 's/old/new/g' file</code></td>\n                          <td>Thay thế chuỗi trực tiếp, tạo file backup</td>\n                          <td><code>sed -i.bak 's/DEBUG=True/DEBUG=False/' .env</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>awk '{print $1, $NF}' file</code></td>\n                          <td>In cột đầu tiên và cột cuối cùng của mỗi dòng</td>\n                          <td><code>awk '{print $1, $NF}' access.log</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>sort | uniq -c | sort -nr</code></td>\n                          <td>Đường ống đếm tần suất xuất hiện giảm dần</td>\n                          <td><code>awk '{print $1}' access.log | sort | uniq -c | sort -nr</code></td>\n                        </tr>\n                        <tr>\n                          <td><code>cut -d':' -f1,7 /etc/passwd</code></td>\n                          <td>Cắt cột theo ký tự phân cách</td>\n                          <td>Lấy danh sách user và shell đăng nhập</td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </div>\n                "
        },
        {
          "id": "sec-2-10-cheatsheet-process",
          "title": "2. Bảng tra cứu Quản lý Tiến trình, Mạng & Lưu trữ",
          "content": "\n                  <div class=\"table-container\">\n                    <table class=\"data-table\">\n                      <thead>\n                        <tr>\n                          <th>Lệnh &amp; Cú pháp</th>\n                          <th>Mục đích sử dụng</th>\n                          <th>Ghi chú quan trọng</th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td><code>ps aux --sort=-%cpu</code></td>\n                          <td>Tìm các tiến trình đang chiếm nhiều CPU nhất</td>\n                          <td>Xem cột STAT để biết tiến trình R hay D</td>\n                        </tr>\n                        <tr>\n                          <td><code>kill -15 [PID]</code></td>\n                          <td>Gửi tín hiệu SIGTERM yêu cầu kết thúc an toàn</td>\n                          <td>Luôn ưu tiên dùng trước khi kill -9</td>\n                        </tr>\n                        <tr>\n                          <td><code>nohup cmd > out.log 2>&1 &</code></td>\n                          <td>Chạy lệnh nền, không bị ngắt khi đóng SSH</td>\n                          <td>Nhớ thêm python3 -u nếu chạy script Python</td>\n                        </tr>\n                        <tr>\n                          <td><code>ss -tulpn</code></td>\n                          <td>Kiểm tra tất cả các cổng mạng đang mở</td>\n                          <td>Thêm grep :port để kiểm tra một cổng cụ thể</td>\n                        </tr>\n                        <tr>\n                          <td><code>df -h / &amp;&amp; df -i /</code></td>\n                          <td>Kiểm tra dung lượng đĩa và số lượng Inode</td>\n                          <td>Cạn Inode (100%) cũng gây lỗi đĩa đầy</td>\n                        </tr>\n                        <tr>\n                          <td><code>sudo lsof +L1</code></td>\n                          <td>Tìm các file đã bị xóa nhưng vẫn bị mở giữ</td>\n                          <td>Giải thích tại sao rm rồi mà đĩa không tăng</td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </div>\n                "
        },
        {
          "id": "sec-2-10-glossary",
          "title": "3. Từ điển Thuật ngữ Quản trị Cốt lõi Cấp 2 (Glossary)",
          "content": "\n                  <div class=\"lx-glossary-grid\">\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Inode (Index Node)</span>\n                        <span class=\"lx-glossary-cat\">Filesystem</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Cấu trúc dữ liệu của hệ thống file lưu trữ toàn bộ metadata của một tệp tin (phân quyền, chủ sở hữu, mốc thời gian, vị trí con trỏ trỏ tới các khối dữ liệu thực tế trên đĩa). Tên file không nằm trong inode mà nằm trong dentry.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">umask</span>\n                        <span class=\"lx-glossary-cat\">Security</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Mặt nạ nhị phân quy định các quyền hạn bị loại bỏ mặc định khi một file (666 - umask) hoặc thư mục (777 - umask) mới được tạo ra trên hệ thống.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">ACL (Access Control Lists)</span>\n                        <span class=\"lx-glossary-cat\">Security</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Cơ chế phân quyền nâng cao vượt qua giới hạn 3 lớp Owner/Group/Other của chuẩn POSIX, cho phép gán quyền đọc/ghi/thực thi chi tiết cho từng người dùng hoặc nhóm cụ thể.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Graceful Shutdown</span>\n                        <span class=\"lx-glossary-cat\">Process</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Quy trình kết thúc tiến trình êm đẹp khi nhận tín hiệu SIGTERM (15): ứng dụng hoàn thành nốt các request dở dang, đóng kết nối database, giải phóng socket mạng rồi mới thoát, ngăn chặn hỏng dữ liệu.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">flock (File Lock)</span>\n                        <span class=\"lx-glossary-cat\">Automation</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Cơ chế khóa tệp ở cấp độ hệ điều hành dùng để đồng bộ hóa, đảm bảo tại một thời điểm chỉ có duy nhất một tiến trình được phép chạy, ngăn chặn tác vụ cron định kỳ bị chồng chéo nhau.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Zombie Process</span>\n                        <span class=\"lx-glossary-cat\">Kernel</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Tiến trình con đã kết thúc thực thi nhưng tiến trình cha chưa gọi hàm wait() để giải phóng cấu trúc task_struct khỏi bảng tiến trình của Kernel. Ký hiệu trạng thái là Z.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">RES vs VIRT</span>\n                        <span class=\"lx-glossary-cat\">Memory</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">VIRT (Virtual Memory) là tổng không gian địa chỉ ảo tiến trình đăng ký; RES (Resident Set Size) là dung lượng bộ nhớ RAM vật lý thực tế mà tiến trình đang chiếm giữ trong chip nhớ.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Open File Descriptor</span>\n                        <span class=\"lx-glossary-cat\">Kernel I/O</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Mã số nguyên do Kernel cấp phát khi một tiến trình mở tệp. Nếu tệp bị xóa bằng rm nhưng file descriptor vẫn mở, Kernel sẽ giữ nguyên dữ liệu trên đĩa cho tới khi tiến trình đóng file.</p>\n                    </div>\n                  </div>\n                "
        }
      ],
      "exercises": [],
      "summary": [
        "Bảng tra cứu nhanh Cấp 2 giúp kỹ sư hệ thống tra cứu thần tốc cú pháp regex, đường ống pipe và lệnh socket.",
        "Nắm vững các thuật ngữ cốt lõi: Inode, umask, ACL, SUID/SGID, Graceful Shutdown và Open File Descriptor.",
        "Tích hợp các kỹ năng Cấp 2 để vận hành dịch vụ máy chủ ổn định, an toàn và tự động hóa cao."
      ]
    }
  ]
};
