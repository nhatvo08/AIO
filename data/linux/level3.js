/**
 * Dữ liệu Giáo trình Linux Thực chiến & Nội bộ HĐH: CẤP 3 – NÂNG CAO (QUẢN TRỊ THỰC CHIẾN)
 * Thiết kế cho lập trình viên Python & kỹ sư vận hành hệ thống (DevOps/SysAdmin/SRE)
 */

window.LX_LEVEL3_DATA = {
  "id": "part-lx-3",
  "number": "Cấp 3",
  "title": "Quản trị Nâng cao & Hạ tầng Sản xuất",
  "level": "Nâng cao",
  "badge": "Nâng cao",
  "description": "Quản trị máy chủ sản xuất thực chiến: làm chủ systemd service/timer, phân tích log journalctl, lưu trữ LVM & RAID, mạng nâng cao & firewall nftables/ufw, gia cố phòng thủ SSH/Fail2ban/Auditd, kiểm soát truy cập bắt buộc SELinux/AppArmor, backup rsync qua SSH & snapshot, triển khai Nginx HTTPS & Docker, chẩn đoán hiệu năng với USE method và tự động hóa Ansible.",
  "lessons": [
    {
      "id": "lx-3-01",
      "number": "3.1",
      "title": "Quản trị Dịch vụ chuyên sâu với systemd: Viết Service Unit & Timer Unit thay thế Cron",
      "subtitle": "Chuyển đổi toàn diện sang kiến trúc quản lý dịch vụ hiện đại, tự khởi động lại khi crash, quản lý phụ thuộc và lập lịch chuẩn xác",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Viết tệp Service Unit hoàn chỉnh (/etc/systemd/system/myapp.service): cấu hình Type, ExecStart, Restart, User, EnvironmentFile.",
        "Làm chủ các cơ chế bảo mật sandbox tích hợp của systemd: ProtectSystem, ProtectHome, PrivateTmp, NoNewPrivileges để cô lập dịch vụ.",
        "Thiết lập Timer Unit (OnCalendar) thay thế toàn diện Cron với khả năng ghi log tập trung qua journald và cơ chế bù phiên lỡ (Persistent=true).",
        "Nắm vững các câu lệnh quản trị: systemctl daemon-reload, list-timers, edit, reset-failed."
      ],
      "intuition": {
        "title": "Quản gia trực chiến 24/7 và Đồng hồ báo thức lưu vết",
        "metaphor": "Chạy ứng dụng bằng cách gõ lệnh `python main.py &` trong terminal giống như thuê một người làm công nhật: hễ cúp điện hay người đó bị ngất (crash), công việc sẽ dừng vĩnh viễn cho đến khi bạn phát hiện ra. systemd giống như một người quản gia chuyên nghiệp túc trực 24/7: nếu ứng dụng Python bị lỗi sập, quản gia lập tức hồi sinh nó chỉ sau 3 giây (Restart=always). Timer Unit của systemd giống như chiếc đồng hồ có bộ nhớ: nếu máy chủ bị tắt vào đúng thời điểm 3h sáng đặt lịch, ngay khi máy bật lại vào sáng hôm sau, chiếc đồng hồ sẽ kiểm tra và lập tức bù lại phiên sao lưu đã bị lỡ (Persistent=true) — điều mà cron cổ điển hoàn toàn bất lực.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚙️</span>\n                    <span>CẤU TRÚC SERVICE</span>\n                    <span class=\"lx-vs-tag\">3 Khối chính</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>[Unit]:</strong> Mô tả dịch vụ, thứ tự khởi động (After=network.target) và điều kiện phụ thuộc (Wants/Requires).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>[Service]:</strong> Lệnh thực thi (ExecStart), tài khoản chạy (User/Group), chính sách phục hồi (Restart=always) và biến môi trường.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>[Install]:</strong> Điểm gắn kết (WantedBy=multi-user.target) để systemctl enable biết khi nào cần tự kích hoạt lúc khởi động máy.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⏱️</span>\n                    <span>TIMER vs CRONTAB</span>\n                    <span class=\"lx-vs-tag\">Ưu thế Timer</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Ghi log tập trung:</strong> Toàn bộ output của Timer tự động đẩy vào journalctl của Service tương ứng, không sợ mất log.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bù phiên lỡ (Persistent=true):</strong> Chạy bù tác vụ nếu thời điểm kích hoạt máy chủ đang tắt.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Quản lý phụ thuộc:</strong> Timer có thể chờ mạng sẵn sàng mới chạy tác vụ sao lưu qua mạng.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-1-service-file",
          "title": "1. Mẫu tệp Service Unit chuẩn công nghiệp cho ứng dụng Python FastAPI / Django",
          "content": "\n                  <p>Mọi tệp Service Unit tùy biến của quản trị viên bắt buộc phải đặt trong thư mục <code>/etc/systemd/system/</code> (không đặt trong <code>/lib/systemd/system/</code> vì thư mục đó do trình quản lý gói APT/DNF quản lý, có thể bị ghi đè khi cập nhật).</p>\n                  <p>Các chỉ thị quan trọng nhất trong khối <code>[Service]</code>:</p>\n                  <ul>\n                    <li><code>Type=simple</code>: Phù hợp nhất cho các ứng dụng Python (Uvicorn, Gunicorn, Celery) không tự fork tiến trình ngầm. Tiến trình được gọi bởi <code>ExecStart</code> chính là tiến trình dịch vụ chính.</li>\n                    <li><code>ExecStart</code>: Đường dẫn tuyệt đối tới file thực thi (ví dụ: <code>/opt/my_app/venv/bin/uvicorn main:app ...</code>). <strong>Không bao giờ dùng đường dẫn tương đối!</strong></li>\n                    <li><code>Restart=always</code>: Luôn tự động bật lại ứng dụng khi bị sập (dù crash do lỗi mã nguồn, do OOM Killer tiêu diệt hay do ngoại lệ không bắt được).</li>\n                    <li><code>RestartSec=3s</code>: Khoảng thời gian chờ 3 giây trước khi khởi động lại để tránh làm nghẽn CPU nếu ứng dụng bị crash-loop liên tục.</li>\n                    <li><code>EnvironmentFile</code>: Nạp các biến môi trường bí mật (SECRET_KEY, DATABASE_URL) từ một file riêng biệt có phân quyền <code>600</code>.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Ini",
              "title": "Tệp cấu hình /etc/systemd/system/fastapi_app.service chuẩn Production",
              "code": "[Unit]\nDescription=FastAPI Production Backend Application\nAfter=network.target postgresql.service\nWants=postgresql.service\n\n[Service]\nType=simple\nUser=www-data\nGroup=www-data\nWorkingDirectory=/opt/fastapi_app\nEnvironmentFile=/opt/fastapi_app/.env.production\nExecStart=/opt/fastapi_app/venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 4\nExecReload=/bin/kill -HUP $MAINPID\n\n# Cơ chế tự phục hồi\nRestart=always\nRestartSec=3s\nKillMode=mixed\nTimeoutStopSec=30s\n\n# Sandbox bảo mật cô lập\nProtectSystem=strict\nProtectHome=true\nPrivateTmp=true\nNoNewPrivileges=true\nReadWritePaths=/opt/fastapi_app/logs /opt/fastapi_app/media\n\n[Install]\nWantedBy=multi-user.target",
              "annotations": [
                {
                  "line": 3,
                  "part": "After=network.target postgresql.service",
                  "text": "Đảm bảo card mạng và dịch vụ Database PostgreSQL đã khởi động xong xuôi thì mới bật ứng dụng Python."
                },
                {
                  "line": 8,
                  "part": "User=www-data",
                  "text": "Nguyên tắc bảo mật: Không bao giờ chạy ứng dụng web dưới quyền root! Dùng tài khoản người dùng dịch vụ hạn chế quyền."
                },
                {
                  "line": 15,
                  "part": "Restart=always",
                  "text": "Tự động khởi động lại tiến trình ngay lập tức nếu bị sập bất kể lý do gì."
                },
                {
                  "line": 21,
                  "part": "ProtectSystem=strict",
                  "text": "Cơ chế bảo mật systemd: Khóa toàn bộ hệ thống file /usr, /boot, /etc thành chỉ đọc (Read-Only) đối với ứng dụng; chỉ cho phép ghi vào các thư mục khai báo trong ReadWritePaths."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-3-1-timer-unit",
          "title": "2. Viết Timer Unit thay thế toàn diện Cron truyền thống",
          "content": "\n                  <p>Để lập lịch tác vụ bằng systemd, bạn tạo một cặp gồm 2 tệp có cùng tên trong <code>/etc/systemd/system/</code>:</p>\n                  <ol>\n                    <li><code>backup_db.service</code>: Định nghĩa lệnh cần chạy (không cần khối <code>[Install]</code> vì Timer sẽ kích hoạt nó). Thường đặt <code>Type=oneshot</code>.</li>\n                    <li><code>backup_db.timer</code>: Định nghĩa mốc thời gian kích hoạt.</li>\n                  </ol>\n                  <p>Cú pháp lịch biểu <code>OnCalendar</code>: <code>DayOfWeek Year-Month-Day Hour:Minute:Second</code></p>\n                  <ul>\n                    <li><code>OnCalendar=*-*-* 03:00:00</code>: Chạy vào lúc 03:00:00 sáng mỗi ngày.</li>\n                    <li><code>OnCalendar=Mon *-*-* 01:00:00</code>: Chạy vào lúc 01:00:00 sáng mỗi thứ Hai.</li>\n                    <li><code>OnCalendar=*:0/15</code>: Chạy mỗi 15 phút một lần.</li>\n                    <li><code>Persistent=true</code>: <strong>Bù phiên lỡ sống còn</strong> — nếu máy chủ bị tắt nguồn vào đúng giờ hẹn, ngay khi khởi động lại, systemd sẽ kích hoạt chạy bù tác vụ ngay lập tức!</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Ini",
              "title": "Cặp tệp sao lưu tự động /etc/systemd/system/backup_db.{service,timer}",
              "code": "# Tệp 1: /etc/systemd/system/backup_db.service\n[Unit]\nDescription=Daily Database Backup Service\n\n[Service]\nType=oneshot\nUser=postgres\nExecStart=/opt/scripts/backup_postgres.sh\nStandardOutput=journal\nStandardError=journal\n\n---\n# Tệp 2: /etc/systemd/system/backup_db.timer\n[Unit]\nDescription=Daily Database Backup Timer (03:00 AM)\n\n[Timer]\nOnCalendar=*-*-* 03:00:00\nPersistent=true\nRandomizedDelaySec=300\n\n[Install]\nWantedBy=timers.target",
              "annotations": [
                {
                  "line": 6,
                  "part": "Type=oneshot",
                  "text": "Thích hợp cho tác vụ chạy một lần rồi thoát thay vì tiến trình chạy nền liên tục."
                },
                {
                  "line": 17,
                  "part": "OnCalendar=*-*-* 03:00:00",
                  "text": "Mốc thời gian kích hoạt: 3 giờ sáng mỗi ngày."
                },
                {
                  "line": 18,
                  "part": "Persistent=true",
                  "text": "Kích hoạt chạy bù phiên sao lưu nếu vào thời điểm 3h sáng máy chủ đang bảo trì hoặc tắt nguồn."
                },
                {
                  "line": 19,
                  "part": "RandomizedDelaySec=300",
                  "text": "Tạo độ trễ ngẫu nhiên từ 0-300 giây để các máy chủ trong cụm không đồng loạt sao lưu cùng 1 giây gây nghẽn mạng."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-3-1-cli-workflow",
          "title": "3. Quy trình vận hành và kiểm tra Timer/Service",
          "content": "\n                  <div class=\"callout-box warning-box\">\n                    <div class=\"callout-title\">⚠️ NGUYÊN TẮC BẮT BUỘC: systemctl daemon-reload</div>\n                    <p>Mỗi khi bạn tạo mới, chỉnh sửa nội dung hoặc xóa bất kỳ file <code>.service</code> hay <code>.timer</code> nào trong <code>/etc/systemd/system/</code>, systemd vẫn giữ cấu hình cũ trong RAM. Bạn <strong>BẮT BUỘC</strong> phải chạy lệnh <code>sudo systemctl daemon-reload</code> để systemd quét lại ổ đĩa và nạp cấu hình mới!</p>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Quy trình kích hoạt và kiểm tra danh sách Timer",
              "code": "# 1. Quét nạp lại cấu hình sau khi sửa file\nsudo systemctl daemon-reload\n\n# 2. Bật và kích hoạt Timer chạy cùng hệ thống\nsudo systemctl enable --now backup_db.timer\n\n# 3. Liệt kê danh sách tất cả các Timer đang hoạt động và thời điểm chạy tiếp theo\nsystemctl list-timers --all",
              "annotations": [
                {
                  "line": 5,
                  "part": "enable --now",
                  "text": "Cờ --now cực tiện lợi: vừa bật tự khởi động (enable) vừa kích hoạt chạy ngay lập tức (start)."
                },
                {
                  "line": 8,
                  "part": "list-timers",
                  "text": "Xem chính xác còn bao nhiêu tiếng/phút nữa thì tác vụ kế tiếp sẽ được kích hoạt (cột LEFT)."
                }
              ],
              "output": "NEXT                        LEFT          LAST PASSED UNIT                         ACTIVATES\nThu 2026-10-29 03:02:15 UTC 11h left      n/a  n/a    backup_db.timer              backup_db.service\nThu 2026-10-29 06:25:00 UTC 14h left      Wed 17h ago logrotate.timer              logrotate.service"
            }
          ]
        }
      ],
      "scenario": {
        "title": "Ứng dụng Python bị lỗi kết nối Database làm sập tiến trình vào ban đêm",
        "content": "\n              <p>Một ứng dụng Python xử lý hàng đợi background worker thỉnh thoảng bị lỗi rớt mạng sang database pool, dẫn tới ném ngoại lệ <code>OperationalError</code> và tiến trình bị sập. Nếu chạy bằng lệnh thông thường hoặc screen, ứng dụng sẽ chết ngắt và hàng ngàn đơn hàng bị ứ đọng suốt đêm.</p>\n              <p><strong>Giải pháp:</strong> Đóng gói ứng dụng vào systemd Service Unit với <code>Restart=always</code> và <code>RestartSec=5s</code>. Khi cơ sở dữ liệu bị ngắt trong 10 giây, worker bị thoát ra nhưng systemd kiên trì thử kết nối lại sau mỗi 5 giây. Ngay khi Database phục hồi, worker tự động sống lại và xử lý hết đơn hàng trong hàng đợi mà không cần bất kỳ sự can thiệp thủ công nào của con người!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi cấm dùng ký tự đại diện (* hay ~) trong ExecStart",
            "content": "systemd không chạy qua shell mặc định! Bạn không thể viết <code>ExecStart=python ~/app/main.py</code> (dấu ngã ~ sẽ không được mở rộng). Bắt buộc phải viết đường dẫn tuyệt đối đầy đủ: <code>ExecStart=/usr/bin/python3 /home/ubuntu/app/main.py</code>."
          }
        ],
        "tips": [
          {
            "title": "Dùng systemctl edit thay vì sửa trực tiếp file của hệ thống",
            "content": "Khi muốn tùy biến một dịch vụ có sẵn của hệ điều hành (như Nginx hay Docker), hãy dùng lệnh <code>sudo systemctl edit [service]</code>. systemd sẽ tạo một file drop-in override tại <code>/etc/systemd/system/[service].d/override.conf</code>, giúp cấu hình tùy biến của bạn không bao giờ bị ghi đè khi nâng cấp gói phần mềm."
          }
        ]
      },
      "exercises": [
        {
          "question": "Chỉ thị nào trong tệp systemd Service Unit đảm bảo dịch vụ tự động khởi động lại khi tiến trình bị kết thúc với mã lỗi khác 0?",
          "command": "Restart=on-failure",
          "explanation": "Restart=on-failure chỉ khởi động lại tiến trình khi nó bị crash hoặc thoát với mã lỗi khác 0 (nếu tiến trình thoát chủ động với mã 0 thì coi là hoàn thành và không khởi động lại)."
        }
      ],
      "summary": [
        "systemd Service Unit là chuẩn mực quản lý vòng đời ứng dụng trong sản xuất: hỗ trợ tự phục hồi khi crash và sandbox cô lập bảo mật.",
        "Timer Unit vượt trội hơn Cron nhờ khả năng bù phiên lỡ (Persistent=true) và tích hợp ghi log tập trung với journald.",
        "Luôn chạy sudo systemctl daemon-reload mỗi khi thay đổi bất kỳ tệp cấu hình .service hay .timer nào."
      ]
    },
    {
      "id": "lx-3-02",
      "number": "3.2",
      "title": "Quản lý Log tập trung, Phân tích sự cố với journalctl & Tối ưu Logrotate",
      "subtitle": "Kiểm soát vòng đời log hệ thống, truy vết nhanh lỗi theo mốc thời gian và chặn đứng nguy cơ tràn ổ cứng",
      "level": "Nâng cao",
      "duration": "50 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "Khai thác chuyên sâu journalctl để truy vết sự cố: lọc theo dịch vụ (-u), theo mức độ nghiêm trọng (-p err), theo khoảng thời gian chuẩn ISO, và theo dõi trực tiếp (-f).",
        "Cấu hình giới hạn trần dung lượng lưu trữ của journald trong /etc/systemd/journald.conf để không bao giờ chiếm quá 10% ổ đĩa.",
        "Viết tệp cấu hình logrotate chuyên nghiệp trong /etc/logrotate.d/ cho Nginx và ứng dụng web: nén gzip, xoay theo ngày, giữ n bản và gửi tín hiệu reload dịch vụ qua postrotate."
      ],
      "intuition": {
        "title": "Hộp đen ghi âm buồng lái và Máy nghiền tài liệu định kỳ",
        "metaphor": "journalctl giống như chiếc hộp đen ghi âm buồng lái máy bay: lưu trữ từng mili-giây mọi biến động, lời gọi lỗi và cảnh báo của toàn bộ hệ thống dưới định dạng nhị phân có index, cho phép bạn tua nhanh tới đúng thời điểm sự cố xảy ra để điều tra. Còn logrotate là nhân viên văn thư cần mẫn: mỗi đêm tự động lấy các tập nhật ký cũ đóng dấu ngày tháng, nén lại thành các file tí hon (.gz) cất vào kho, và tiêu hủy tài liệu cũ quá 14 ngày để ổ cứng máy chủ luôn luôn thông thoáng.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔍</span>\n                    <span>LỌC MỨC ĐỘ LOG</span>\n                    <span class=\"lx-vs-tag\">journalctl -p</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>0: emerg</code>, <code>1: alert</code>, <code>2: crit</code>: Thảm họa cấp hạt nhân.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>3: err</code>: Lỗi thực thi nghiêm trọng (kết nối DB chết, crash).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>4: warning</code>: Cảnh báo tài nguyên (bộ nhớ cao, query chậm).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>5: notice</code>, <code>6: info</code>, <code>7: debug</code>: Thông tin luồng hoạt động thông thường.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔄</span>\n                    <span>VÒNG ĐỜI LOGROTATE</span>\n                    <span class=\"lx-vs-tag\">Xoay &amp; Nén</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>app.log:</strong> File đang được ứng dụng ghi trực tiếp.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>app.log.1:</strong> Đổi tên vào đêm qua, chờ nén.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>app.log.2.gz:</strong> Đã nén gzip tiết kiệm 90% dung lượng.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> Bản sao lưu thứ 15 vượt quá chỉ thị <code>rotate 14</code> sẽ tự động bị xóa sổ!</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-2-journalctl-advanced",
          "title": "1. Tuyệt kỹ điều tra sự cố bằng journalctl",
          "content": "\n                  <p>Khi máy chủ gặp sự cố vào một mốc thời gian cụ thể (ví dụ 14:15 đến 14:30), <code>journalctl</code> cho phép bạn cô lập khoảng thời gian đó trong tích tắc:</p>\n                  <ul>\n                    <li><code>journalctl -u my_app --since \"2026-10-28 14:15:00\" --until \"2026-10-28 14:30:00\"</code></li>\n                    <li><code>journalctl -u my_app -p err..emerg</code>: Chỉ lấy log từ cấp độ Error (3) tới Emergency (0).</li>\n                    <li><code>journalctl -k -b</code>: Xem log của riêng nhân Linux (Kernel dmesg) kể từ lần khởi động gần nhất (bắt lỗi phần cứng, OOM Killer).</li>\n                    <li><code>journalctl --disk-usage</code>: Kiểm tra toàn bộ kho log của journald đang chiếm bao nhiêu dung lượng đĩa.</li>\n                    <li><code>sudo journalctl --vacuum-size=500M</code>: Dọn dẹp khẩn cấp, chỉ giữ lại 500MB log gần nhất.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Truy vết và dọn dẹp log hệ thống khẩn cấp",
              "code": "# 1. Kiểm tra dung lượng log nhị phân journald đang chiếm\njournalctl --disk-usage\n\n# 2. Thu dọn chỉ giữ lại tối đa 500MB log mới nhất\nsudo journalctl --vacuum-size=500M\n\n# 3. Lọc tìm các lần OOM Killer đã tiêu diệt tiến trình trong nhân kernel\njournalctl -k | grep -i 'killed process'",
              "annotations": [
                {
                  "line": 2,
                  "part": "--disk-usage",
                  "text": "Biết chính xác lượng dung lượng log đang lưu trong thư mục /var/log/journal/."
                },
                {
                  "line": 5,
                  "part": "--vacuum-size=500M",
                  "text": "Lập tức xóa bỏ các file journal cũ cho tới khi tổng dung lượng dưới 500MB."
                },
                {
                  "line": 8,
                  "part": "journalctl -k",
                  "text": "Truy vấn log tầng hạt nhân (kernel ring buffer) để phát hiện sự cố cấp phần cứng và bộ nhớ."
                }
              ],
              "output": "Archived and active journals take up 2.4G in the filesystem.\nVacuuming done, freed 1.9G of archived journals from /var/log/journal/.\n[ 8412.102] Out of memory: Killed process 4120 (python3) total-vm:420100kB, anon-rss:380100kB"
            }
          ]
        },
        {
          "id": "sec-3-2-logrotate-config",
          "title": "2. Cấu hình xoay vòng log chuẩn mực với Logrotate",
          "content": "\n                  <p>Mỗi đêm cron/timer kích hoạt <code>logrotate</code> quét các file cấu hình trong <code>/etc/logrotate.d/</code>. Dưới đây là tệp cấu hình mẫu chuẩn công nghiệp cho ứng dụng web:</p>\n                  <p>Giải nghĩa các chỉ thị cốt lõi:</p>\n                  <ul>\n                    <li><code>daily</code>: Xoay vòng file mỗi ngày một lần (có thể dùng <code>weekly</code> hoặc <code>size 100M</code>).</li>\n                    <li><code>rotate 14</code>: Giữ lại tối đa 14 bản sao lưu cũ (tương đương 2 tuần log). Bản thứ 15 sẽ bị xóa.</li>\n                    <li><code>compress</code>: Nén file log cũ bằng <code>gzip</code> (giảm dung lượng từ 1GB xuống còn khoảng 80MB).</li>\n                    <li><code>delaycompress</code>: Trì hoãn nén file của ngày hôm qua (chờ sang ngày hôm kia mới nén) để tránh làm nghẽn tiến trình đang ghi dở.</li>\n                    <li><code>missingok</code>: Nếu file log chưa được tạo ra thì bỏ qua trong yên lặng, không báo lỗi làm gián đoạn kịch bản.</li>\n                    <li><code>notifempty</code>: Nếu file log có kích thước 0 byte thì không thực hiện xoay vòng vô nghĩa.</li>\n                    <li><code>create 0640 www-data adm</code>: Tạo file log mới tinh với phân quyền và chủ sở hữu chỉ định.</li>\n                    <li><code>sharedscripts</code>: Chỉ chạy đoạn script trong <code>postrotate</code> một lần duy nhất sau khi đã xoay vòng xong toàn bộ danh sách file.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Text",
              "title": "Tệp cấu hình /etc/logrotate.d/fastapi_app",
              "code": "/var/log/fastapi_app/*.log {\n    daily\n    missingok\n    rotate 14\n    compress\n    delaycompress\n    notifempty\n    create 0640 www-data adm\n    sharedscripts\n    postrotate\n        # Gửi tín hiệu USR1 yêu cầu ứng dụng mở file log mới\n        systemctl kill -s HUP fastapi_app.service >/dev/null 2>&1 || true\n    endscript\n}",
              "annotations": [
                {
                  "line": 1,
                  "part": "/var/log/fastapi_app/*.log",
                  "text": "Áp dụng cho toàn bộ file đuôi .log trong thư mục log của ứng dụng."
                },
                {
                  "line": 5,
                  "part": "delaycompress",
                  "text": "File log.1 để nguyên text cho dễ đọc debug; các file từ log.2 trở đi mới nén .gz."
                },
                {
                  "line": 11,
                  "part": "postrotate ... endscript",
                  "text": "Đoạn lệnh shell chạy sau khi đổi tên file log để yêu cầu ứng dụng trỏ sang file log mới."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-3-2-test-logrotate",
          "title": "3. Kiểm thử cấu hình Logrotate với Dry-run",
          "content": "\n                  <p>Trước khi để logrotate tự động chạy vào ban đêm, bạn luôn phải chạy thử nghiệm với cờ <code>-d</code> (Dry-run - gỡ lỗi không thực sự đổi tên file) để đảm bảo không viết sai cú pháp:</p>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm thử tệp cấu hình logrotate an toàn",
              "code": "# 1. Chạy thử nghiệm chế độ Dry-run (chỉ in các bước sẽ làm, không sửa file thật)\nsudo logrotate -d /etc/logrotate.d/fastapi_app\n\n# 2. Ép buộc xoay vòng ngay lập tức để kiểm tra kết quả thực tế\nsudo logrotate -f /etc/logrotate.d/fastapi_app\n\n# 3. Kiểm tra danh sách file sau khi xoay vòng\nls -la /var/log/fastapi_app/",
              "annotations": [
                {
                  "line": 2,
                  "part": "-d (debug/dry-run)",
                  "text": "In ra toàn bộ phân tích cú pháp, ngày tháng và quyết định xem file có đủ điều kiện xoay hay không."
                },
                {
                  "line": 5,
                  "part": "-f (force)",
                  "text": "Cưỡng chế xoay vòng ngay lập tức bất kể điều kiện thời gian để test thực tế."
                }
              ],
              "output": "reading config file /etc/logrotate.d/fastapi_app\nAllocating hash table for state file, size 64 entries\nHandling 1 logs\nrotating pattern: /var/log/fastapi_app/*.log  forced from command line (14 rotations)\n-rw-r----- 1 www-data adm    0 Oct 28 16:00 app.log\n-rw-r----- 1 www-data adm 4.2M Oct 28 15:59 app.log.1"
            }
          ]
        }
      ],
      "scenario": {
        "title": "File log Nginx access.log phình to 40GB làm sập hệ thống do thiếu Logrotate",
        "content": "\n              <p>Một chiến dịch quảng cáo bùng nổ traffic mang về 5 triệu lượt truy cập mỗi ngày. Do file cấu hình logrotate của Nginx bị tắt nhầm, file <code>/var/log/nginx/access.log</code> tăng vọt từ vài trăm MB lên 42GB chỉ sau 4 ngày, nuốt chửng 100% dung lượng phân vùng gốc và làm treo cứng hệ điều hành.</p>\n              <p><strong>Khắc phục tức thì:</strong></p>\n              <p>1. Làm rỗng file an toàn bằng lệnh truncate: <code>sudo truncate -s 0 /var/log/nginx/access.log</code> (giải phóng ngay 42GB mà không cần tắt Nginx).</p>\n              <p>2. Kích hoạt cấu hình Logrotate với giới hạn kích thước khẩn cấp: <code>size 100M</code>, <code>rotate 7</code>, <code>compress</code> để đảm bảo hễ file chạm mốc 100MB là tự động nén xoay vòng ngay lập tức, triệt tiêu vĩnh viễn nguy cơ tràn đĩa!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Quên reload dịch vụ trong khối postrotate",
            "content": "Nếu không gửi tín hiệu <code>systemctl reload</code> hoặc <code>kill -HUP</code> cho tiến trình trong khối postrotate, dịch vụ sẽ tiếp tục ghi log vào inode của file cũ (file đã bị đổi tên thành app.log.1), khiến file app.log mới tạo luôn ở trạng thái 0 byte!"
          }
        ],
        "tips": [
          {
            "title": "Cấu hình giới hạn SystemMaxUse cho journald",
            "content": "Mở tệp <code>/etc/systemd/journald.conf</code> và đặt <code>SystemMaxUse=1G</code>, sau đó <code>sudo systemctl restart systemd-journald</code>. Journald sẽ không bao giờ sử dụng vượt quá 1GB ổ đĩa."
          }
        ]
      },
      "exercises": [
        {
          "question": "Chỉ thị nào trong tệp cấu hình logrotate giúp đảm bảo lệnh reload dịch vụ trong postrotate chỉ chạy một lần duy nhất cho toàn bộ danh sách file log được xoay?",
          "command": "sharedscripts",
          "explanation": "sharedscripts gom toàn bộ quá trình xoay vòng của các file khớp pattern lại và chỉ thực thi đoạn mã trong postrotate duy nhất 1 lần ở bước kết thúc."
        }
      ],
      "summary": [
        "journalctl là công cụ số 1 để truy vết sự cố hệ thống; dùng cờ -u, -p err và --since để khoanh vùng thời gian lỗi.",
        "Luôn cấu hình giới hạn dung lượng SystemMaxUse trong journald.conf để log không bao giờ ăn mòn ổ cứng.",
        "Logrotate kết hợp nén gzip và postrotate reload là tiêu chuẩn vàng kiểm soát vòng đời file log của mọi ứng dụng."
      ]
    },
    {
      "id": "lx-3-03",
      "number": "3.3",
      "title": "Quản lý Lưu trữ nâng cao: LVM (Logical Volume Manager), ext4/xfs/btrfs, fstab & RAID",
      "subtitle": "Mở rộng dung lượng phân vùng 'nóng' không cần tắt máy chủ, bảo toàn dữ liệu bằng RAID và gắn đĩa an toàn qua fstab",
      "level": "Nâng cao",
      "duration": "60 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Hiểu tường tận kiến trúc 3 lớp của LVM: Physical Volume (PV), Volume Group (VG), Logical Volume (LV).",
        "Thực hành mở rộng dung lượng phân vùng trực tiếp (Online Resizing) với lvextend và resize2fs (ext4) hoặc xfs_growfs (XFS) mà không làm gián đoạn dịch vụ.",
        "Cấu hình tệp /etc/fstab chuẩn xác bằng mã UUID. Cảnh báo đỏ: Phòng ngừa thảm họa sai fstab làm máy chủ rơi vào Emergency Mode không boot được.",
        "Nắm vững nguyên lý hoạt động của các cấp độ RAID lưu trữ (RAID 0, 1, 5, 10) và so sánh hệ thống file ext4 vs XFS vs Btrfs."
      ],
      "intuition": {
        "title": "Hồ chứa ghép khối LVM và Bản hợp đồng gắn đĩa fstab",
        "metaphor": "Phân vùng truyền thống (như sda1, sda2) giống như các bình chứa nước bằng bê tông đúc chết: khi nước đầy bình, cách duy nhất là đập đi đúc lại bình mới lớn hơn (phải tắt server, backup, phân vùng lại). LVM gom toàn bộ các ổ đĩa vật lý (PV) đổ chung vào một 'Hồ chứa nước khổng lồ' (Volume Group). Bạn có thể múc nước chia cho các phòng ban (Logical Volume) tùy ý. Khi một phòng ban sắp hết nước, bạn chỉ cần mở rộng vòi van (lvextend) và diện tích sàn (resize2fs) trong vòng 5 giây khi máy chủ vẫn đang phục vụ hàng triệu khách hàng mà không rớt một giọt nước nào!",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🗄️</span>\n                    <span>3 LỚP CỦA LVM</span>\n                    <span class=\"lx-vs-tag\">PV → VG → LV</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>PV (Physical Volume):</strong> Ổ đĩa vật lý thực tế (/dev/sdb, /dev/nvme0n1) được khởi tạo bằng <code>pvcreate</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>VG (Volume Group):</strong> Hồ chứa gộp chung nhiều PV lại bằng <code>vgcreate / vgextend</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>LV (Logical Volume):</strong> Phân vùng ảo cấp phát cho hệ điều hành định dạng filesystem bằng <code>lvcreate / lvextend</code>.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🛡️</span>\n                    <span>EXT4 vs XFS</span>\n                    <span class=\"lx-vs-tag\">Co giãn đĩa</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>ext4:</strong> Sau khi lvextend, dùng lệnh <code>resize2fs /dev/vg/lv</code> (hỗ trợ cả tăng và giảm kích thước).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>XFS:</strong> Sau khi lvextend, dùng lệnh <code>xfs_growfs [mountpoint]</code> (truyền vào thư mục mount, CHỈ CÓ THỂ TĂNG, KHÔNG THỂ GIẢM KÍCH THƯỚC!).</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-3-lvm-workflow",
          "title": "1. Quy trình mở rộng dung lượng phân vùng LVM trực tuyến (Zero-downtime)",
          "content": "\n                  <p>Giả sử bạn vừa gắn thêm một ổ cứng vật lý mới <code>/dev/sdb</code> (dung lượng 50GB) vào máy chủ và muốn mở rộng phân vùng <code>/dev/vg_data/lv_app</code> đang bị đầy.</p>\n                  <p><strong>Quy trình chuẩn 4 bước công nghiệp:</strong></p>\n                  <ol>\n                    <li>Khởi tạo Physical Volume: <code>sudo pvcreate /dev/sdb</code></li>\n                    <li>Mở rộng Volume Group: <code>sudo vgextend vg_data /dev/sdb</code></li>\n                    <li>Mở rộng Logical Volume: <code>sudo lvextend -L +30G /dev/vg_data/lv_app</code></li>\n                    <li>Mở rộng Hệ thống file (Filesystem) tương ứng:\n                      <ul>\n                        <li>Nếu là <strong>ext4</strong>: <code>sudo resize2fs /dev/vg_data/lv_app</code></li>\n                        <li>Nếu là <strong>XFS</strong>: <code>sudo xfs_growfs /var/www</code> (lưu ý: XFS nhận đường dẫn thư mục mount, không nhận file thiết bị!)</li>\n                      </ul>\n                    </li>\n                  </ol>\n                  <div class=\"callout-box info-box\">\n                    <div class=\"callout-title\">💡 Mẹo gom bước 3 và bước 4 bằng cờ -r</div>\n                    <p>Lệnh <code>lvextend -r -l +100%FREE /dev/vg_data/lv_app</code> có cờ <code>-r</code> (resizefs) sẽ tự động nhận diện ext4 hay XFS để tự co giãn filesystem trong MỘT LỆNH DUY NHẤT!</p>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Thực hiện mở rộng nóng phân vùng LVM cho ứng dụng",
              "code": "# 1. Khảo sát cấu trúc LVM hiện tại\nsudo vgs\nsudo lvs\n\n# 2. Mở rộng LV thêm 20GB và tự động co giãn filesystem trực tiếp\nsudo lvextend -r -L +20G /dev/vg_data/lv_app\n\n# 3. Kiểm tra kết quả dung lượng mới bằng df -h\ndf -h /var/www",
              "annotations": [
                {
                  "line": 2,
                  "part": "vgs / lvs",
                  "text": "Kiểm tra dung lượng còn trống trong Volume Group (VFree) trước khi mở rộng."
                },
                {
                  "line": 5,
                  "part": "-r -L +20G",
                  "text": "-L +20G tăng thêm 20GB; cờ -r tự động chạy resize2fs hoặc xfs_growfs an toàn tuyệt đối."
                },
                {
                  "line": 8,
                  "part": "df -h",
                  "text": "Xác nhận dung lượng phân vùng mount /var/www đã tăng thêm 20GB ngay tức thì."
                }
              ],
              "output": "  VG      #PV #LV #SN Attr   VSize   VFree \n  vg_data   2   1   0 wz--n- 100.00g 30.00g\n  Size of logical volume vg_data/lv_app changed from 50.00 GiB to 70.00 GiB.\n  Logical volume vg_data/lv_app successfully resized.\nFilesystem                 Size  Used Avail Use% Mounted on\n/dev/mapper/vg_data-lv_app  69G   48G   18G  73% /var/www"
            }
          ]
        },
        {
          "id": "sec-3-3-fstab-danger",
          "title": "2. Cấu hình gắn đĩa tự động trong /etc/fstab & Cảnh báo đỏ cứu boot",
          "content": "\n                  <div class=\"callout-box danger-box\">\n                    <div class=\"callout-title\">🚨 CẢNH BÁO ĐỎ: NGUY HIỂM CHÍ MẠNG KHI CHỈNH SỬA /etc/fstab</div>\n                    <p>Tệp <code>/etc/fstab</code> là danh sách các phân vùng hệ thống Linux sẽ đọc và gắn kết khi máy chủ khởi động. <strong>Chỉ cần gõ sai một dấu cách, sai tên UUID hoặc sai định dạng filesystem, máy chủ sẽ bị treo cứng ở màn hình Emergency Mode và không thể kết nối SSH từ xa!</strong></p>\n                    <div class=\"lx-safe-alternative\">\n                      <strong>Quy tắc sinh tồn bắt buộc cho kỹ sư hệ thống:</strong>\n                      <br>1. Luôn dùng <strong>UUID</strong> (lấy qua lệnh <code>sudo blkid</code>), không bao giờ dùng tên thiết bị như <code>/dev/sdb1</code> vì tên thiết bị có thể bị đảo lộn khi cắm thêm ổ đĩa.\n                      <br>2. Thêm cờ <code>nofail</code> cho các ổ đĩa dữ liệu phụ (nếu ổ đĩa bị mất kết nối, OS vẫn boot bình thường).\n                      <br>3. <strong>BƯỚC QUYẾT ĐỊNH:</strong> Sau khi sửa /etc/fstab, <strong>BẮT BUỘC CHẠY LỆNH: <code>sudo mount -a</code></strong>. Nếu lệnh này xuất hiện bất kỳ dòng lỗi nào, KHÔNG ĐƯỢC PHÉP REBOOT mà phải sửa lại file fstab ngay lập tức!\n                    </div>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Text",
              "title": "Cấu trúc 6 trường chuẩn xác trong tệp /etc/fstab",
              "code": "# <Thiết bị (UUID)>                   <Thư mục mount>   <Định dạng>   <Tùy chọn>              <dump>  <pass>\nUUID=7c3f8e52-1982-42bb-92b0-819284201824  /                 ext4          defaults                0       1\nUUID=4a1b8c9d-2345-67ef-89ab-cdef01234567  /var/data         ext4          defaults,nofail         0       2\n/dev/vg_data/lv_app                         /var/www          ext4          defaults                0       2",
              "annotations": [
                {
                  "line": 2,
                  "part": "UUID=...",
                  "text": "Định danh duy nhất toàn cầu của phân vùng, không sợ bị nhầm lẫn khi thay đổi phần cứng."
                },
                {
                  "line": 3,
                  "part": "defaults,nofail",
                  "text": "nofail: Cứu cánh sống còn — nếu ổ đĩa này bị hỏng cáp hoặc mất kết nối, server vẫn boot vào SSH bình thường!"
                },
                {
                  "line": 4,
                  "part": "<pass>: 0, 1, 2",
                  "text": "Thứ tự kiểm tra lỗi ổ đĩa fsck: 1 cho phân vùng root /, 2 cho các phân vùng khác, 0 là bỏ qua không kiểm tra."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-3-3-raid-concepts",
          "title": "3. So sánh các cấp độ RAID lưu trữ (RAID 0, 1, 5, 10)",
          "content": "\n                  <p>RAID (Redundant Array of Independent Disks) ghép nhiều ổ cứng vật lý thành một mảng lưu trữ để tăng tốc độ truy xuất hoặc chống mất mát dữ liệu khi hỏng ổ cứng:</p>\n                  <div class=\"table-container\">\n                    <table class=\"data-table\">\n                      <thead>\n                        <tr>\n                          <th>Cấp độ RAID</th>\n                          <th>Cơ chế hoạt động</th>\n                          <th>Khả năng chịu lỗi</th>\n                          <th>Hiệu năng đọc/ghi</th>\n                          <th>Dung lượng hữu dụng</th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td><strong>RAID 0</strong> (Striping)</td>\n                          <td>Cắt dữ liệu thành các lát ghi xen kẽ lên 2+ ổ</td>\n                          <td><strong>0%</strong> (Hỏng 1 ổ = Mất sạch toàn bộ dữ liệu)</td>\n                          <td>Gấp đôi tốc độ Đọc &amp; Ghi</td>\n                          <td>100% (Tổng dung lượng các ổ)</td>\n                        </tr>\n                        <tr>\n                          <td><strong>RAID 1</strong> (Mirroring)</td>\n                          <td>Nhân bản dữ liệu giống hệt nhau sang ổ thứ 2</td>\n                          <td>Chịu được hỏng 1 trong 2 ổ</td>\n                          <td>Đọc nhanh, Ghi bình thường</td>\n                          <td>50% (Chỉ bằng dung lượng 1 ổ)</td>\n                        </tr>\n                        <tr>\n                          <td><strong>RAID 5</strong> (Parity)</td>\n                          <td>Ghi dữ liệu kèm khối chẵn lẻ Parity trên 3+ ổ</td>\n                          <td>Chịu được hỏng 1 ổ bất kỳ</td>\n                          <td>Đọc rất nhanh, Ghi tốn CPU tính parity</td>\n                          <td>(N - 1) x Dung lượng ổ</td>\n                        </tr>\n                        <tr>\n                          <td><strong>RAID 10</strong> (1 + 0)</td>\n                          <td>Ghép Mirroring trước rồi Striping sau (Tối thiểu 4 ổ)</td>\n                          <td>Chịu được hỏng tới 2 ổ (khác cặp mirror)</td>\n                          <td><strong>Nhanh nhất &amp; An toàn nhất</strong> (Chuẩn Database)</td>\n                          <td>50% tổng dung lượng</td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </div>\n                "
        }
      ],
      "scenario": {
        "title": "Phân vùng cơ sở dữ liệu PostgreSQL tăng vọt chạm trần 98% lúc nửa đêm",
        "content": "\n              <p>Một đợt import dữ liệu lớn khiến phân vùng chứa dữ liệu PostgreSQL <code>/dev/vg_system/lv_postgres</code> (đang mount tại <code>/var/lib/postgresql</code>) chỉ còn đúng 800MB trống. Ứng dụng chuẩn bị crash vì không thể ghi thêm transaction log (WAL).</p>\n              <p><strong>Xử lý trong 60 giây không cần dừng Database:</strong></p>\n              <p>1. Bạn kiểm tra thấy Volume Group <code>vg_system</code> còn trống 50GB:</p>\n              <pre><code>sudo vgs</code></pre>\n              <p>2. Chạy lệnh mở rộng trực tiếp thêm 30GB kèm co giãn filesystem:</p>\n              <pre><code>sudo lvextend -r -L +30G /dev/vg_system/lv_postgres</code></pre>\n              <p>Hệ điều hành co giãn ext4 trực tuyến trong 3 giây. Database tiếp tục hoạt động trơn tru, không có bất kỳ khách hàng nào bị ngắt kết nối!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "XFS không thể thu nhỏ dung lượng",
            "content": "Hệ thống file XFS mặc định trên RHEL/CentOS/Rocky chỉ hỗ trợ <strong>tăng kích thước</strong> (xfs_growfs), hoàn toàn <strong>KHÔNG HỖ TRỢ thu nhỏ (shrink)</strong>! Nếu bạn lỡ cấp phát quá nhiều dung lượng cho một LV định dạng XFS, cách duy nhất để giảm là backup dữ liệu, xóa LV tạo lại và restore."
          }
        ],
        "tips": [
          {
            "title": "Luôn dùng tùy chọn nofail trong /etc/fstab cho ổ đĩa phụ",
            "content": "Tùy chọn <code>nofail</code> báo cho Linux biết đây là ổ đĩa phụ trợ (như ổ backup, ổ gắn thêm). Nếu ổ này bị mất kết nối lúc khởi động, hệ thống sẽ bỏ qua và tiếp tục boot bình thường, cho phép bạn vào SSH cứu hộ từ xa."
          }
        ]
      },
      "exercises": [
        {
          "question": "Lệnh nào sau đây dùng để kiểm tra tính hợp lệ của toàn bộ cấu hình trong tệp /etc/fstab mà không cần khởi động lại máy chủ?",
          "command": "sudo mount -a",
          "explanation": "mount -a thử gắn kết tất cả các hệ thống file được khai báo trong /etc/fstab. Nếu có bất kỳ dòng nào sai cú pháp hoặc sai UUID, lệnh sẽ lập tức báo lỗi ra màn hình."
        }
      ],
      "summary": [
        "LVM giải quyết bài toán cạn dung lượng ổ cứng linh hoạt; lvextend -r cho phép tăng dung lượng trực tuyến không gián đoạn dịch vụ.",
        "Luôn sử dụng UUID và chạy sudo mount -a sau khi chỉnh sửa tệp /etc/fstab để phòng ngừa thảm họa không boot được.",
        "RAID 10 là tiêu chuẩn vàng cho các máy chủ cơ sở dữ liệu đòi hỏi tốc độ đọc/ghi cao nhất kết hợp khả năng chịu lỗi phần cứng."
      ]
    },
    {
      "id": "lx-3-04",
      "number": "3.4",
      "title": "Quản trị Mạng nâng cao: Định tuyến tĩnh, Cấu hình Interface & Tường lửa Firewall (nftables/ufw)",
      "subtitle": "Xây dựng pháo đài bảo vệ server: cấu hình Netplan/NetworkManager và thiết lập quy tắc chặn lọc gói tin theo nguyên lý Least Privilege",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Cấu hình địa chỉ IP tĩnh, Gateway và máy chủ DNS bằng Netplan (họ Debian/Ubuntu) và NetworkManager / nmcli (họ RHEL/Rocky).",
        "Thiết lập pháo đài tường lửa với UFW áp dụng triệt để nguyên tắc Mặc định Chặn (Default DENY).",
        "Cảnh báo đỏ sống còn: Quy tắc bắt buộc phải mở cổng SSH trước khi kích hoạt tường lửa từ xa để không bị khóa quyền truy cập vĩnh viễn.",
        "Hiểu bản chất bảng luật hạ tầng của nftables và thiết lập quy tắc giới hạn tốc độ kết nối (Rate Limiting) chống quét cổng."
      ],
      "intuition": {
        "title": "Cổng thành kiên cố và Binh lính gác cổng nghiêm ngặt",
        "metaphor": "Máy chủ khi kết nối ra Internet giống như một thành trì đứng giữa chiến địa: hàng ngàn botnet và máy quét tự động liên tục rà soát từng ô cửa sổ để tìm lỗ hổng. Tường lửa hoạt động theo nguyên tắc quân sự tối cao: MẶC ĐỊNH ĐÓNG KÍN TẤT CẢ CÁC CỔNG (Default DENY Incoming). Chỉ những ai mang đúng thẻ bài hợp lệ (cổng 22 cho SSH từ IP chỉ định, cổng 80/443 cho khách web) mới được binh lính mở cửa cho bước qua cổng thành.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🛡️</span>\n                    <span>TƯỜNG LỬA UFW</span>\n                    <span class=\"lx-vs-tag\">Đơn giản hóa</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> Lớp bọc thân thiện bên trên iptables/nftables của Ubuntu/Debian.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> Cú pháp tiếng người: <code>ufw default deny incoming</code>, <code>ufw allow 22/tcp</code>.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚡</span>\n                    <span>NFTABLES</span>\n                    <span class=\"lx-vs-tag\">Chuẩn Kernel Mới</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> Thay thế toàn diện iptables, ip6tables, arptables, ebtables cũ.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> Xử lý gói tin bằng máy ảo bytecode trong nhân Linux, hiệu năng lọc gói tin cao gấp nhiều lần khi có hàng ngàn quy tắc.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-4-netplan-ip",
          "title": "1. Cấu hình địa chỉ IP tĩnh chuẩn mực với Netplan",
          "content": "\n                  <p>Trên các phiên bản Ubuntu Server hiện đại, cấu hình mạng được định nghĩa bằng tệp YAML trong thư mục <code>/etc/netplan/</code> (ví dụ: <code>01-netcfg.yaml</code>).</p>\n                  <p><strong>Lưu ý cú pháp YAML:</strong> Thụt lề bắt buộc phải dùng <strong>khoảng trắng (spaces)</strong>, tuyệt đối không dùng phím Tab!</p>\n                ",
          "codeExamples": [
            {
              "lang": "Yaml",
              "title": "Tệp cấu hình IP tĩnh /etc/netplan/01-netcfg.yaml",
              "code": "network:\n  version: 2\n  renderer: networkd\n  ethernets:\n    eth0:\n      dhcp4: no\n      addresses:\n        - 192.168.1.100/24\n      routes:\n        - to: default\n          via: 192.168.1.1\n      nameservers:\n        addresses:\n          - 1.1.1.1\n          - 8.8.8.8",
              "annotations": [
                {
                  "line": 6,
                  "part": "dhcp4: no",
                  "text": "Tắt tự động nhận IP động DHCP để thiết lập IP tĩnh."
                },
                {
                  "line": 8,
                  "part": "192.168.1.100/24",
                  "text": "Địa chỉ IP tĩnh kèm mặt nạ mạng Subnet mask CIDR /24 (tương đương 255.255.255.0)."
                },
                {
                  "line": 11,
                  "part": "via: 192.168.1.1",
                  "text": "Địa chỉ Default Gateway của router chuyển tiếp gói tin ra Internet."
                },
                {
                  "line": 14,
                  "part": "nameservers",
                  "text": "Máy chủ phân giải tên miền DNS (Cloudflare 1.1.1.1 và Google 8.8.8.8)."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-3-4-ufw-fortress",
          "title": "2. Thiết lập pháo đài UFW theo chuẩn Least Privilege",
          "content": "\n                  <div class=\"callout-box danger-box\">\n                    <div class=\"callout-title\">🚨 CẢNH BÁO ĐỎ: MỞ CỔNG SSH TRƯỚC KHI BẬT TƯỜNG LỬA TỪ XA</div>\n                    <p>Nếu bạn đang kết nối tới máy chủ qua SSH và gõ lệnh: <code>sudo ufw default deny incoming && sudo ufw enable</code> mà <strong>CHƯA CHO PHÉP CỔNG SSH</strong>, phiên làm việc hiện tại sẽ bị cắt đứt ngay lập tức và bạn sẽ bị khóa quyền truy cập vĩnh viễn ra khỏi máy chủ!</p>\n                    <div class=\"lx-safe-alternative\">\n                      <strong>Quy trình chuẩn 4 bước bất di bất dịch:</strong>\n                      <br>1. Thiết lập chính sách mặc định: <code>sudo ufw default deny incoming && sudo ufw default allow outgoing</code>\n                      <br>2. <strong>BƯỚC QUYẾT ĐỊNH:</strong> Mở cổng SSH: <code>sudo ufw allow 22/tcp</code> (hoặc cổng SSH tùy biến của bạn).\n                      <br>3. Mở các cổng dịch vụ web: <code>sudo ufw allow 80/tcp && sudo ufw allow 443/tcp</code>\n                      <br>4. Chỉ sau khi đã mở SSH mới kích hoạt tường lửa: <code>sudo ufw enable</code>\n                    </div>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Bộ lệnh thiết lập tường lửa UFW chuẩn Production",
              "code": "# 1. Áp dụng chính sách mặc định (Chặn toàn bộ chiều vào, Cho phép toàn bộ chiều ra)\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\n\n# 2. BẮT BUỘC: Mở cổng SSH và bật Rate Limiting chống Brute-force\nsudo ufw limit 22/tcp comment 'SSH with rate limit'\n\n# 3. Mở cổng web HTTP và HTTPS\nsudo ufw allow 80/tcp comment 'Nginx HTTP'\nsudo ufw allow 443/tcp comment 'Nginx HTTPS'\n\n# 4. Chỉ cho phép địa chỉ IP văn phòng công ty truy cập cổng quản trị cơ sở dữ liệu 5432\nsudo ufw allow from 203.0.113.85 to any port 5432 proto tcp comment 'Postgres office only'\n\n# 5. Kích hoạt tường lửa và kiểm tra trạng thái chi tiết\nsudo ufw --force enable\nsudo ufw status verbose",
              "annotations": [
                {
                  "line": 2,
                  "part": "default deny incoming",
                  "text": "Chính sách phòng thủ Least Privilege: Mọi cổng không được khai báo rõ ràng đều bị chặn đứng."
                },
                {
                  "line": 6,
                  "part": "ufw limit 22/tcp",
                  "text": "limit: Tính năng thông minh của UFW — nếu 1 IP thử kết nối SSH quá 6 lần trong 30 giây sẽ tự động bị chặn."
                },
                {
                  "line": 13,
                  "part": "allow from ... to port 5432",
                  "text": "Bảo vệ cổng Database: Chỉ cho phép IP công ty được kết nối, người ngoài Internet bị cấm tuyệt đối."
                }
              ],
              "output": "Status: active\nLogging: on (low)\nDefault: deny (incoming), allow (outgoing), disabled (routed)\n\nTo                         Action      From\n--                         ------      ----\n22/tcp                     LIMIT IN    Anywhere                   # SSH with rate limit\n80/tcp                     ALLOW IN    Anywhere                   # Nginx HTTP\n443/tcp                    ALLOW IN    Anywhere                   # Nginx HTTPS\n5432/tcp                   ALLOW IN    203.0.113.85               # Postgres office only"
            }
          ]
        },
        {
          "id": "sec-3-4-nftables-inspect",
          "title": "3. Khảo sát bảng luật hạ tầng của nftables",
          "content": "\n                  <p>Dù bạn sử dụng UFW hay FirewallD, ở tầng nhân Linux, các quy tắc đều được chuyển đổi thành bảng luật của <code>nftables</code>. Bạn có thể kiểm tra trực tiếp các chain và counter của gói tin:</p>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Xem toàn bộ bảng luật nftables thời gian thực",
              "code": "# Liệt kê toàn bộ bảng quy tắc đang được nhân Linux thực thi\nsudo nft list ruleset\n\n# Giám sát các gói tin đang bị tường lửa thả rơi (Drop) thời gian thực\nsudo dmesg -w | grep -i '[UFW BLOCK]'",
              "annotations": [
                {
                  "line": 2,
                  "part": "nft list ruleset",
                  "text": "In ra toàn bộ cấu trúc bảng (tables), chuỗi (chains) và bộ đếm gói tin (counters) của nhân Linux."
                },
                {
                  "line": 5,
                  "part": "grep '[UFW BLOCK]'",
                  "text": "Theo dõi các IP đang cố gắng quét các cổng đóng trên máy chủ của bạn."
                }
              ],
              "output": "table inet ufw {\n    chain ufw-user-input {\n        tcp dport 22 ct state new,untracked meter ufw-meter-ssh { ip saddr limit rate over 6/minute burst 6 packets } drop\n        tcp dport 80 accept\n        tcp dport 443 accept\n    }\n}"
            }
          ]
        }
      ],
      "scenario": {
        "title": "Cứu nguy kỹ sư cấu hình tường lửa chặn nhầm cổng SSH trên máy chủ Cloud",
        "content": "\n              <p>Một bạn kỹ sư thực tập đổi cổng SSH từ 22 sang 2222 trong <code>sshd_config</code>, sau đó gõ lệnh <code>sudo ufw enable</code> khi chưa mở cổng 2222. Ngay lập tức, bạn bị văng ra khỏi máy chủ và không thể đăng nhập lại.</p>\n              <p><strong>Kỹ năng xử lý:</strong> Đăng nhập vào bảng điều khiển Web Console (VNC/Serial Console) của nhà cung cấp đám mây (AWS EC2 Serial Console / DigitalOcean Recovery Console) — kết nối này đi qua cổng phần cứng ảo trực tiếp, không phụ thuộc vào mạng IP hay tường lửa. Sau khi vào được, bạn gõ <code>sudo ufw allow 2222/tcp</code> và kết nối SSH từ máy cá nhân phục hồi thành công!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Không bao giờ mở cổng Database ra toàn mạng (0.0.0.0/0)",
            "content": "Các cổng cơ sở dữ liệu như 3306 (MySQL), 5432 (Postgres), 6379 (Redis), 27017 (MongoDB) là mục tiêu hàng đầu của botnet tống tiền (Ransomware). Tuyệt đối KHÔNG mở công khai; chỉ cho phép kết nối nội bộ hoặc mở cho IP cố định của backend."
          }
        ],
        "tips": [
          {
            "title": "Dùng netplan try thay vì netplan apply",
            "content": "Khi sửa cấu hình mạng từ xa, hãy gõ <code>sudo netplan try</code>. Lệnh sẽ áp dụng cấu hình trong 120 giây và chờ bạn bấm Enter xác nhận. Nếu bạn bị mất kết nối mạng và không bấm xác nhận được, Netplan sẽ tự động rollback về cấu hình cũ, cứu bạn khỏi việc bị mất kết nối vĩnh viễn."
          }
        ]
      },
      "exercises": [
        {
          "question": "Lệnh UFW nào sau đây dùng để xóa bỏ một quy tắc đã thêm mà không làm ảnh hưởng các quy tắc khác?",
          "command": "sudo ufw status numbered\n# Sau đó xóa theo số thứ tự hiển thị:\nsudo ufw delete [số_thứ_tự]",
          "explanation": "ufw status numbered đánh số thứ tự 1, 2, 3... cho từng dòng quy tắc, sau đó ufw delete [số] giúp bạn xóa chính xác dòng cần bỏ mà không sợ gõ sai cú pháp."
        }
      ],
      "summary": [
        "Áp dụng triệt để chính sách Mặc định Chặn (Default DENY) cho toàn bộ lưu lượng mạng đi vào máy chủ.",
        "BẮT BUỘC mở cổng SSH trước khi kích hoạt tường lửa từ xa để phòng ngừa bị khóa quyền truy cập.",
        "Dùng ufw limit cho cổng SSH và chỉ mở cổng Database cho các địa chỉ IP nội bộ tin cậy."
      ]
    },
    {
      "id": "lx-3-05",
      "number": "3.5",
      "title": "Gia cố Bảo mật Máy chủ theo hướng Phòng thủ (sshd_config, Fail2ban, Auditd, Cập nhật bảo mật)",
      "subtitle": "Biến máy chủ thành pháo đài bất khả xâm phạm trước các đợt tấn công Brute-force, quét lỗ hổng và rà soát thay đổi trái phép",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Gia cố tệp cấu hình sshd_config theo chuẩn CIS Benchmark: cấm đăng nhập root, cấm xác thực mật khẩu (bắt buộc dùng SSH Key), đổi cổng và giới hạn số lần thử kết nối.",
        "Triển khai và cấu hình Fail2ban: tự động phân tích log và khóa IP của kẻ tấn công vào tường lửa khi có hành vi dò quét.",
        "Giám sát tính toàn vẹn của các tệp nhạy cảm (/etc/passwd, /etc/shadow, /etc/sudoers) bằng hệ thống kiểm toán auditd.",
        "Cấu hình tự động cập nhật bản vá bảo mật không gián đoạn với unattended-upgrades."
      ],
      "intuition": {
        "title": "Cửa bọc thép SSH, Cảnh sát Fail2ban và Camera Auditd",
        "metaphor": "Máy chủ mặc định giống như một ngôi nhà có ổ khóa cơ bình thường: bất kỳ ai cũng có thể đứng trước cửa gõ thử từng chiếc chìa khóa (tấn công Brute-force). Gia cố sshd_config giống như tháo bỏ ổ khóa cơ và thay bằng cửa thép vân tay sinh trắc học (SSH Key ed25519) — nếu không có chìa khóa riêng trong tay, hacker có thử hàng triệu lần cũng vô ích. Fail2ban là chú cảnh sát tuần tra: hễ thấy kẻ nào lảng vảng trước cửa thử chìa khóa quá 5 lần, chú cảnh sát lập tức còng tay tống vào danh sách đen của tường lửa trong 24 giờ. Còn Auditd là camera an ninh 4K ghi hình từng tích tắc bất kỳ ai chạm tay vào két sắt chứa tài liệu mật của cơ quan.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔐</span>\n                    <span>GIA CỐ CỔNG SSH</span>\n                    <span class=\"lx-vs-tag\">sshd_config</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>PermitRootLogin no</code>: Cấm tuyệt đối đăng nhập trực tiếp bằng tài khoản root.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>PasswordAuthentication no</code>: Tắt vĩnh viễn đăng nhập bằng mật khẩu, chỉ cho phép dùng SSH Key.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>MaxAuthTries 3</code>: Ngắt kết nối ngay sau 3 lần xác thực thất bại.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🚔</span>\n                    <span>CƠ CHẾ FAIL2BAN</span>\n                    <span class=\"lx-vs-tag\">Tự động chặn</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> Quét liên tục tệp log xác thực (<code>/var/log/auth.log</code>).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> Nếu phát hiện IP có 5 lần Failed Password trong vòng 10 phút...</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> Fail2ban tự động gọi UFW/nftables thêm luật <strong>DROP IP</strong> đó trong 24 giờ!</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-5-sshd-hardening",
          "title": "1. Gia cố cấu hình SSH Daemon (sshd_config) chuẩn CIS Benchmark",
          "content": "\n                  <p>File cấu hình chính của SSH Server nằm tại <code>/etc/ssh/sshd_config</code> (hoặc các file bổ sung trong thư mục <code>/etc/ssh/sshd_config.d/</code>).</p>\n                  <div class=\"callout-box warning-box\">\n                    <div class=\"callout-title\">⚠️ NGUYÊN TẮC AN TOÀN SỐNG CÒN KHI SỬA SSHD_CONFIG</div>\n                    <ol>\n                      <li>Trước khi chỉnh sửa: <strong>ĐẢM BẢO BẠN ĐÃ CÓ KHÓA SSH KEY ĐĂNG NHẬP THÀNH CÔNG VỚI MỘT USER CÓ QUYỀN SUDO</strong>.</li>\n                      <li>Sau khi sửa xong: Luôn chạy lệnh kiểm tra cú pháp: <code>sudo sshd -t</code>. Nếu lệnh không in ra lỗi gì thì mới được reload!</li>\n                      <li><strong>GIỮ NGUYÊN CỬA SỔ TERMINAL HIỆN TẠI</strong>, mở một cửa sổ terminal mới trên máy bạn và thử gõ <code>ssh username@server</code> để đăng nhập thử. Chỉ khi cửa sổ mới đăng nhập thành công bạn mới được đóng cửa sổ cũ!</li>\n                    </ol>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Text",
              "title": "Tệp gia cố /etc/ssh/sshd_config.d/99-security-hardening.conf",
              "code": "# 1. Cấm đăng nhập trực tiếp tài khoản root\nPermitRootLogin no\n\n# 2. Tắt hoàn toàn xác thực bằng mật khẩu (Bắt buộc dùng SSH Key)\nPasswordAuthentication no\nPubkeyAuthentication yes\n\n# 3. Giới hạn số lần thử xác thực\nMaxAuthTries 3\n\n# 4. Tắt cơ chế chứng thực rỗng và chuyển tiếp nguy hiểm\nPermitEmptyPasswords no\nX11Forwarding no\nAllowAgentForwarding no\n\n# 5. Tự động ngắt phiên nhàn rỗi sau 10 phút (ClientAliveInterval 300 x ClientAliveCountMax 2)\nClientAliveInterval 300\nClientAliveCountMax 2\n\n# 6. Chỉ cho phép các user chỉ định được phép SSH vào máy chủ\nAllowUsers ubuntu deployer",
              "annotations": [
                {
                  "line": 2,
                  "part": "PermitRootLogin no",
                  "text": "Buộc quản trị viên phải đăng nhập bằng tài khoản cá nhân rồi mới dùng sudo, giúp truy vết chính xác ai đã làm gì qua log."
                },
                {
                  "line": 5,
                  "part": "PasswordAuthentication no",
                  "text": "Triệt tiêu 100% nguy cơ bị tấn công brute-force dò mật khẩu tự động."
                },
                {
                  "line": 18,
                  "part": "AllowUsers",
                  "text": "Danh sách trắng (Whitelist): Dù kẻ tấn công có tạo được user khác thì SSH cũng từ chối kết nối."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-3-5-fail2ban-setup",
          "title": "2. Triển khai cảnh sát bảo vệ tự động Fail2ban",
          "content": "\n                  <p>Cài đặt Fail2ban: <code>sudo apt update && sudo apt install -y fail2ban</code></p>\n                  <p>Không bao giờ sửa trực tiếp file <code>jail.conf</code> vì nó sẽ bị ghi đè khi cập nhật gói. Luôn tạo file cấu hình đè: <code>/etc/fail2ban/jail.local</code>.</p>\n                ",
          "codeExamples": [
            {
              "lang": "Ini",
              "title": "Tệp cấu hình /etc/fail2ban/jail.local",
              "code": "[DEFAULT]\n# Thời gian khóa IP: 24 giờ (86400 giây)\nbantime = 86400\n\n# Khoảng thời gian quét log: 10 phút (600 giây)\nfindtime = 600\n\n# Số lần thử thất bại tối đa trước khi bị khóa\nmaxretry = 5\n\n# Danh sách IP nội bộ tin cậy không bao giờ bị khóa (Whitelist)\nignoreip = 127.0.0.1/8 ::1 203.0.113.85\n\n# Cấu hình bảo vệ dịch vụ SSH\n[sshd]\nenabled = true\nport = ssh\nlogpath = %(sshd_log)s\nbackend = systemd",
              "annotations": [
                {
                  "line": 3,
                  "part": "bantime = 86400",
                  "text": "Khóa IP kẻ tấn công trong 24 giờ để botnet nản lòng bỏ đi mục tiêu khác."
                },
                {
                  "line": 12,
                  "part": "ignoreip",
                  "text": "Danh sách IP văn phòng công ty và IP localhost để đảm bảo đồng nghiệp không bao giờ bị khóa nhầm."
                },
                {
                  "line": 18,
                  "part": "backend = systemd",
                  "text": "Đọc trực tiếp log từ journald của systemd thay vì đọc qua file tĩnh, tối ưu hiệu năng."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-3-5-fail2ban-cli",
          "title": "3. Kiểm tra trạng thái và Mở khóa IP với fail2ban-client",
          "content": "\n                  <p>Các lệnh tương tác với Fail2ban:</p>\n                  <ul>\n                    <li><code>sudo fail2ban-client status</code>: Xem danh sách các ngục (jails) đang hoạt động.</li>\n                    <li><code>sudo fail2ban-client status sshd</code>: Xem chi tiết số lượng IP đã bị tóm và danh sách các IP đang bị khóa.</li>\n                    <li><code>sudo fail2ban-client set sshd unbanip [IP_ADDRESS]</code>: Mở khóa thủ công cho một đồng nghiệp bị khóa nhầm do gõ sai mật khẩu nhiều lần.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra danh sách IP đang bị giam cầm bởi Fail2ban",
              "code": "# Xem trạng thái bảo vệ của ngục sshd\nsudo fail2ban-client status sshd\n\n# Mở khóa cho IP của đồng nghiệp\nsudo fail2ban-client set sshd unbanip 198.51.100.44",
              "annotations": [
                {
                  "line": 2,
                  "part": "status sshd",
                  "text": "Hiển thị tổng số lần phát hiện (Currently failed) và danh sách Banned IP list."
                },
                {
                  "line": 5,
                  "part": "unbanip",
                  "text": "Xóa lệnh chặn khỏi tường lửa UFW/nftables ngay lập tức."
                }
              ],
              "output": "Status for the jail: sshd\n|- Filter\n|  |- Currently failed: 2\n|  |- Total failed:     845\n`- Actions\n   |- Currently banned: 14\n   |- Total banned:     112\n   `- Banned IP list:   198.51.100.44 203.0.113.12 192.0.2.89\n198.51.100.44"
            }
          ]
        }
      ],
      "scenario": {
        "title": "Chặn đứng đợt tấn công Brute-force 40.000 request/giờ vào máy chủ công khai",
        "content": "\n              <p>Ngay sau khi gán IP tĩnh công khai cho máy chủ, tệp <code>/var/log/auth.log</code> ghi nhận hàng trăm lượt thử đăng nhập mỗi phút với các tài khoản phổ biến như <code>root</code>, <code>admin</code>, <code>test</code>, <code>user</code> từ các botnet khắp thế giới.</p>\n              <p><strong>Triển khai chiến dịch phòng thủ 3 bước:</strong></p>\n              <p>1. Bạn tắt hoàn toàn <code>PasswordAuthentication no</code> trong tệp <code>/etc/ssh/sshd_config.d/99-hardened.conf</code> và reload SSH daemon.</p>\n              <p>2. Cài đặt Fail2ban với <code>bantime = 86400</code> (24 giờ) và <code>maxretry = 3</code>.</p>\n              <p>3. Chỉ sau 2 tiếng, Fail2ban đã tự động tống hơn 420 địa chỉ IP độc hại vào ngục giam của tường lửa. Tải CPU do SSH xử lý giảm từ 35% về 0.1%, hệ thống an toàn tuyệt đối!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Khóa nhầm chính mình khi chưa thêm IP vào ignoreip",
            "content": "Luôn luôn thêm dải mạng nội bộ hoặc IP tĩnh của bạn vào dòng <code>ignoreip</code> trong <code>/etc/fail2ban/jail.local</code> trước khi kích hoạt, để tránh trường hợp bạn thử test lỗi và tự khóa chính mình ra khỏi máy chủ."
          }
        ],
        "tips": [
          {
            "title": "Bật cập nhật bảo mật tự động bằng unattended-upgrades",
            "content": "Chạy lệnh <code>sudo apt install -y unattended-upgrades && sudo dpkg-reconfigure -plow unattended-upgrades</code>. Hệ thống sẽ tự động tải và vá các lỗ hổng bảo mật cấp bách của nhân Linux và các gói phần mềm mỗi đêm mà không cần can thiệp thủ công."
          }
        ]
      },
      "exercises": [
        {
          "question": "Lệnh nào sau đây dùng để kiểm tra tính hợp lệ của toàn bộ cú pháp tệp cấu hình SSH daemon trước khi reload dịch vụ?",
          "command": "sudo sshd -t",
          "explanation": "sshd -t (test mode) kiểm tra toàn bộ cú pháp của tệp cấu hình sshd_config. Nếu có bất kỳ dòng nào sai, nó sẽ in số dòng lỗi ra màn hình mà không làm ảnh hưởng tới dịch vụ đang chạy."
        }
      ],
      "summary": [
        "Tắt PasswordAuthentication trong sshd_config và bắt buộc dùng SSH Key là biện pháp bảo mật số 1 trên mọi server Linux.",
        "Fail2ban là hệ thống phản ứng tự động xuất sắc: phát hiện hành vi quét cổng và tự động chặn IP qua tường lửa.",
        "Luôn kiểm tra sudo sshd -t và giữ một phiên SSH đang mở trước khi reload dịch vụ SSH để đảm bảo an toàn."
      ]
    },
    {
      "id": "lx-3-06",
      "number": "3.6",
      "title": "Cơ chế Bảo mật Kiểm soát Truy cập Bắt buộc: SELinux & AppArmor",
      "subtitle": "Hiểu rõ bản chất cơ chế MAC (Mandatory Access Control), gỡ bỏ nỗi sợ 'tắt SELinux' khi gặp lỗi phân quyền",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Phân biệt rạch ròi sự khác nhau giữa DAC (Discretionary Access Control - rwx truyền thống) và MAC (Mandatory Access Control).",
        "Nắm vững kiến trúc nhãn ngữ cảnh SELinux Context (user:role:type:level) và 3 chế độ hoạt động: Enforcing, Permissive, Disabled.",
        "Khắc phục triệt để sự cố Nginx/Python bị chặn truy cập file web bằng restorecon và semanage fcontext thay vì tắt SELinux.",
        "Quản lý các biến cờ SELinux Booleans (setsebool -P) và hiểu cơ chế bảo vệ Profile của AppArmor trên họ Debian/Ubuntu."
      ],
      "intuition": {
        "title": "Quy chế an ninh mật vụ vượt trên cả quyền trưởng phòng",
        "metaphor": "Hệ thống phân quyền truyền thống DAC (rwx) giống như một công ty tư nhân: trưởng phòng có toàn quyền quyết định cho bất kỳ ai đọc hay sửa tài liệu trong phòng của mình. Nếu kẻ trộm chiếm được tài khoản root, hắn có thể đọc toàn bộ bí mật công ty. SELinux/AppArmor là Quy chế an ninh mật vụ quốc gia (MAC): do chính phủ (Kernel Policy) đặt ra và KHÔNG MỘT AI (kể cả root) có thể phá vỡ! Dù hacker có cướp được quyền root của tiến trình Nginx, nhưng vì tiến trình Nginx bị dán nhãn `httpd_t`, nó chỉ được phép đọc các file có nhãn `httpd_sys_content_t`. Nếu hacker cố gắng đọc file thẻ tín dụng trong thư mục `/data/finance`, Kernel sẽ lập tức chặn đứng và bấm còi báo động ngay tức khắc!",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🛡️</span>\n                    <span>NHÃN SELINUX</span>\n                    <span class=\"lx-vs-tag\">Context -Z</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Type Enforcement (Quan trọng nhất):</strong> Quyết định tiến trình được phép làm gì. Tiến trình nhãn <code>httpd_t</code> (Nginx) chỉ được tương tác với file mang nhãn <code>httpd_sys_content_t</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> Lệnh xem nhãn bảo mật: thêm cờ <code>-Z</code> vào các lệnh quen thuộc (<code>ls -Z</code>, <code>ps -Z</code>, <code>id -Z</code>).</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚙️</span>\n                    <span>3 CHẾ ĐỘ SELINUX</span>\n                    <span class=\"lx-vs-tag\">sestatus</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Enforcing:</strong> Chế độ bảo vệ thực sự — kiên quyết chặn đứng hành vi trái phép và ghi log audit.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Permissive:</strong> Chế độ gỡ lỗi — KHÔNG CHẶN, chỉ ghi log cảnh báo (dùng để debug khi deploy).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Disabled:</strong> Tắt hoàn toàn (Cực kỳ nguy hiểm, mất sạch lớp phòng vệ thứ hai).</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-6-selinux-concepts",
          "title": "1. Giải mã nhãn ngữ cảnh SELinux Context và các lệnh xử lý",
          "content": "\n                  <p>Mỗi tiến trình, mỗi tệp tin, mỗi cổng mạng trên hệ điều hành có SELinux (RHEL, Rocky Linux, CentOS, Fedora) đều được gán một nhãn bảo mật dạng: <code>user:role:type:level</code>.</p>\n                  <p>Phần quan trọng nhất chiếm 99% công việc hàng ngày là <strong>Type</strong> (kiểu đối tượng):</p>\n                  <ul>\n                    <li>File mã nguồn web phục vụ bởi Nginx bắt buộc phải có type: <code>httpd_sys_content_t</code></li>\n                    <li>File mã nguồn có quyền ghi (upload/media): <code>httpd_sys_rw_content_t</code></li>\n                    <li>File cấu hình SSH: <code>etc_t</code>, file khóa SSH: <code>ssh_home_t</code></li>\n                  </ul>\n                  <p><strong>Bộ công cụ quản lý nhãn:</strong></p>\n                  <ul>\n                    <li><code>ls -lZ /var/www</code>: Hiển thị nhãn ngữ cảnh của các file.</li>\n                    <li><code>sudo restorecon -Rv /var/www</code>: Tự động khôi phục nhãn chuẩn mực theo chính sách mặc định của hệ thống.</li>\n                    <li><code>sudo semanage fcontext -a -t httpd_sys_content_t \"/custom/www(/.*)?\"</code>: Khai báo quy tắc nhãn vĩnh viễn cho một thư mục tùy biến.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra và gán nhãn SELinux đúng chuẩn cho thư mục web tùy biến",
              "code": "# 1. Xem trạng thái SELinux hiện tại\nsestatus\n\n# 2. Xem nhãn của thư mục web tùy biến /data/my_website\nls -ldZ /data/my_website\n\n# 3. Đăng ký quy tắc nhãn vĩnh viễn cho thư mục và toàn bộ file con\nsudo semanage fcontext -a -t httpd_sys_content_t \"/data/my_website(/.*)?\"\n\n# 4. Áp dụng nhãn mới lên toàn bộ cây thư mục\nsudo restorecon -Rv /data/my_website",
              "annotations": [
                {
                  "line": 2,
                  "part": "sestatus",
                  "text": "Hiển thị chế độ hoạt động (Current mode: enforcing) và tên policy (Targeted)."
                },
                {
                  "line": 5,
                  "part": "ls -ldZ",
                  "text": "Xem nhãn: nếu hiển thị default_t hoặc user_home_t thì Nginx sẽ bị chặn không đọc được."
                },
                {
                  "line": 8,
                  "part": "semanage fcontext",
                  "text": "Ghi quy tắc vào cơ sở dữ liệu chính sách của SELinux để nhãn không bị mất khi hệ thống relabel."
                },
                {
                  "line": 11,
                  "part": "restorecon -Rv",
                  "text": "Quét và gán lại nhãn thực tế trên đĩa theo đúng quy tắc vừa khai báo."
                }
              ],
              "output": "SELinux status:                 enabled\nCurrent mode:                   enforcing\nMode from config file:          enforcing\nRelabeled /data/my_website from unconfined_u:object_r:default_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0\nRelabeled /data/my_website/index.html from unconfined_u:object_r:default_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0"
            }
          ]
        },
        {
          "id": "sec-3-6-selinux-booleans",
          "title": "2. Quản lý SELinux Booleans & Bật kết nối mạng cho Nginx Proxy",
          "content": "\n                  <p>Mặc định, chính sách SELinux cấm tiến trình Nginx tạo kết nối mạng ra bên ngoài (để ngăn hacker lợi dụng Nginx làm bàn đạp tấn công mạng nội bộ). Do đó, khi bạn cấu hình Nginx làm <strong>Reverse Proxy</strong> trỏ tới ứng dụng Python chạy tại <code>127.0.0.1:8000</code>, Nginx sẽ bị SELinux chặn đứng và trả về lỗi <code>502 Bad Gateway</code>!</p>\n                  <p>Giải pháp chuẩn xác: Kích hoạt biến cờ <strong>SELinux Boolean</strong> <code>httpd_can_network_connect</code>:</p>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Bật quyền cho phép Nginx làm Reverse Proxy qua SELinux Boolean",
              "code": "# Kiểm tra trạng thái của boolean httpd_can_network_connect\ngetsebool httpd_can_network_connect\n\n# Bật cờ này vĩnh viễn (cờ -P: Persistent qua các lần reboot)\nsudo setsebool -P httpd_can_network_connect 1\n\n# Kiểm tra lại xác nhận trạng thái 'on'\ngetsebool httpd_can_network_connect",
              "annotations": [
                {
                  "line": 2,
                  "part": "getsebool",
                  "text": "Kiểm tra xem tính năng đang bật (on) hay tắt (off)."
                },
                {
                  "line": 5,
                  "part": "setsebool -P ... 1",
                  "text": "Cờ -P bắt buộc phải có để giá trị được lưu vào đĩa cứng, không bị mất khi reboot server."
                }
              ],
              "output": "httpd_can_network_connect --> off\nhttpd_can_network_connect --> on"
            }
          ]
        },
        {
          "id": "sec-3-6-apparmor-basics",
          "title": "3. Hệ thống bảo vệ AppArmor trên Debian / Ubuntu",
          "content": "\n                  <p>Trong khi họ Red Hat dùng SELinux, hệ điều hành Ubuntu và Debian sử dụng <strong>AppArmor</strong> làm cơ chế MAC mặc định. AppArmor hoạt động theo cơ chế <strong>đường dẫn file (Path-based Profiles)</strong> nằm trong <code>/etc/apparmor.d/</code>.</p>\n                  <p>3 chế độ của AppArmor Profile:</p>\n                  <ul>\n                    <li><code>Enforce</code>: Chặn đứng và ghi log mọi hành vi vượt quá quyền hạn khai báo trong profile.</li>\n                    <li><code>Complain</code>: Không chặn, chỉ ghi log cảnh báo vi phạm để quản trị viên theo dõi.</li>\n                    <li><code>Disable</code>: Vô hiệu hóa profile đối với ứng dụng đó.</li>\n                  </ul>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra và quản lý trạng thái bảo vệ của AppArmor",
              "code": "# Kiểm tra danh sách các dịch vụ đang được AppArmor bảo vệ\nsudo aa-status\n\n# Chuyển profile của Nginx sang chế độ theo dõi (Complain mode) để debug\nsudo aa-complain /etc/apparmor.d/usr.sbin.nginx\n\n# Khóa chặt lại chế độ Enforce sau khi đã hoàn tất cấu hình\nsudo aa-enforce /etc/apparmor.d/usr.sbin.nginx",
              "annotations": [
                {
                  "line": 2,
                  "part": "aa-status",
                  "text": "Hiển thị số lượng profile đang ở chế độ enforce và complain."
                },
                {
                  "line": 5,
                  "part": "aa-complain",
                  "text": "Cực kỳ hữu ích khi nâng cấp ứng dụng: ứng dụng chạy bình thường mà bạn vẫn thu thập đủ log vi phạm."
                }
              ],
              "output": "apparmor module is loaded.\n38 profiles are loaded.\n36 profiles are in enforce mode.\n   /usr/sbin/mysqld\n   /usr/sbin/nginx\n2 profiles are in complain mode."
            }
          ]
        }
      ],
      "scenario": {
        "title": "Lỗi 403 Forbidden bí ẩn trên Rocky Linux dù quyền đã chmod 777",
        "content": "\n              <p>Một lập trình viên chuyển thư mục mã nguồn web từ máy tính cá nhân lên máy chủ Rocky Linux tại <code>/var/www/my_site</code>. Khi truy cập trang web qua trình duyệt, Nginx lập tức trả về <code>403 Forbidden</code>. Lập trình viên thử gõ <code>chmod -R 777</code> và <code>chown -R nginx:nginx</code> nhưng website vẫn kiên quyết báo 403.</p>\n              <p><strong>Truy vết bản chất:</strong></p>\n              <p>1. Bạn kiểm tra log audit của hệ thống:</p>\n              <pre><code>sudo ausearch -m avc -ts recent</code></pre>\n              <p>Log chỉ rõ: <code>denied { read } ... scontext=...:httpd_t:s0 tcontext=...:user_home_t:s0</code>. Do file được copy từ thư mục home của user nên nó mang nhãn <code>user_home_t</code>, SELinux kiên quyết cấm Nginx đọc file của người dùng cá nhân!</p>\n              <p>2. Thay vì làm liều tắt SELinux, bạn chỉ cần gõ đúng một lệnh khôi phục nhãn chuẩn:</p>\n              <pre><code>sudo restorecon -Rv /var/www/my_site</code></pre>\n              <p>Website tải ngay lập tức, phân quyền được siết chặt an toàn chuẩn bảo mật quân đội!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Thói quen tai hại: Gõ setenforce 0 hoặc tắt SELinux trong file config",
            "content": "Tắt SELinux (<code>SELINUX=disabled</code>) làm mất đi lớp phòng vệ kiên cố nhất của hệ điều hành. Khi một ứng dụng web bị dính lỗ hổng Remote Code Execution (RCE), nếu có SELinux, hacker bị nhốt chặt trong sandbox; nếu tắt SELinux, hacker sẽ lập tức leo thang chiếm toàn bộ máy chủ."
          }
        ],
        "tips": [
          {
            "title": "Dùng công cụ audit2why để được giải thích bằng tiếng người",
            "content": "Cài đặt gói <code>policycoreutils-python-utils</code> và chạy lệnh: <code>sudo ausearch -m avc -ts recent | audit2why</code>. Công cụ sẽ phân tích log từ chối của SELinux và đưa ra gợi ý chính xác lệnh cần chạy (như cần đổi nhãn nào hay bật boolean nào) để giải quyết lỗi."
          }
        ]
      },
      "exercises": [
        {
          "question": "Lệnh nào sau đây dùng để tạm thời chuyển SELinux sang chế độ Permissive (không chặn, chỉ ghi log) để gỡ lỗi mà không cần khởi động lại máy chủ?",
          "command": "sudo setenforce 0",
          "explanation": "setenforce 0 chuyển SELinux sang chế độ Permissive ngay lập tức trong bộ nhớ RAM; để bật lại chế độ bảo vệ Enforcing, dùng lệnh: sudo setenforce 1."
        }
      ],
      "summary": [
        "SELinux và AppArmor là các cơ chế Mandatory Access Control (MAC) bảo vệ hệ thống ngay cả khi tài khoản root bị chiếm đoạt.",
        "Phần lớn lỗi Permission Denied trên họ Red Hat là do sai Type Context; xử lý bằng semanage fcontext và restorecon.",
        "Tuyệt đối không tắt SELinux trong sản xuất; dùng chế độ Permissive để chẩn đoán và khắc phục bằng các biến cờ Boolean."
      ]
    },
    {
      "id": "lx-3-07",
      "number": "3.7",
      "title": "Chiến lược Sao lưu, Đồng bộ với rsync qua SSH & Filesystem Snapshot",
      "subtitle": "Đồng bộ dữ liệu khác biệt thần tốc qua đường truyền mạng và tạo ảnh chụp nhanh hệ thống trong tích tắc",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "Làm chủ thuật toán delta-transfer của rsync: chỉ truyền tải các khối dữ liệu bị thay đổi, tiết kiệm tới 95% băng thông mạng.",
        "Nắm vững bộ cờ tiêu chuẩn vàng: rsync -avzP --delete qua cổng SSH tùy biến (-e 'ssh -p 2222').",
        "Cảnh báo đỏ sống còn: Nhận diện cạm bẫy dấu gạch chéo cuối (Trailing Slash) và nguy cơ xóa sạch dữ liệu của cờ --delete.",
        "Thực hành tạo ảnh chụp nhanh LVM Snapshot để sao lưu dữ liệu nhất quán điểm thời gian (Point-in-Time Consistency) cho database đang chạy zero-downtime."
      ],
      "intuition": {
        "title": "Chép phần khác biệt rsync và Gương đóng băng Snapshot",
        "metaphor": "Sao chép dữ liệu thông thường bằng `cp` hay `scp` giống như việc: mỗi lần bạn sửa một chữ trong cuốn bách khoa toàn thư dày 1.000 trang, bạn phải in và gửi lại toàn bộ cuốn sách qua bưu điện. rsync hoạt động như một máy photocopy thông minh: nó so sánh checksum giữa 2 máy và chỉ truyền đúng 1 dòng văn bản bị sửa, giúp bạn đồng bộ thư mục 500GB chỉ trong vài giây! Còn LVM Snapshot giống như việc bạn chụp một tấm ảnh phản chiếu đóng băng trạng thái của toàn bộ ổ đĩa trong 1 mili-giây: cơ sở dữ liệu cứ tiếp tục ghi dữ liệu mới lên ổ chính, trong khi bạn thong thả gắn chiếc gương snapshot vào để sao lưu mà dữ liệu không bao giờ bị xáo trộn.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚡</span>\n                    <span>CỜ VÀNG RSYNC</span>\n                    <span class=\"lx-vs-tag\">rsync -avzP</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>-a (Archive):</strong> Bảo toàn trọn vẹn thuộc tính file: phân quyền, chủ sở hữu, mốc thời gian và liên kết mềm (symlink).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>-v (Verbose):</strong> Hiển thị chi tiết từng file đang truyền.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>-z (Compress):</strong> Tự động nén dữ liệu trong lúc truyền qua mạng và giải nén ở máy đích.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>-P (Progress + Partial):</strong> Hiển thị thanh tiến độ thời gian thực và cho phép nối tiếp quá trình tải nếu bị đứt mạng giữa chừng.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚠️</span>\n                    <span>BẪY DẤU / CUỐI</span>\n                    <span class=\"lx-vs-tag\">Trailing Slash</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>rsync -a /src /dest</code>: Tạo ra thư mục con <code>/dest/src/</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>rsync -a /src/ /dest</code>: (CÓ dấu gạch chéo cuối): Chỉ chép NỘI DUNG bên trong của <code>/src</code> trực tiếp vào <code>/dest/</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> Chỉ một dấu <code>/</code> ở cuối đường dẫn nguồn làm thay đổi hoàn toàn cấu trúc cây thư mục đích!</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-7-rsync-syntax",
          "title": "1. Làm chủ rsync đồng bộ qua SSH và các cờ loại trừ",
          "content": "\n                  <p>Cú pháp tổng quát: <code>rsync [tùy_chọn] [nguồn] [đích]</code></p>\n                  <p>Khi đồng bộ giữa 2 máy chủ qua kết nối mạng, <code>rsync</code> mặc định sử dụng đường hầm SSH đã được mã hóa:</p>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Đồng bộ thư mục dự án lên máy chủ backup qua SSH",
              "code": "# Đồng bộ thư mục dự án sang máy chủ backup qua cổng SSH 2222\nrsync -avzP -e 'ssh -p 2222' \\\n    --exclude=\"*.pyc\" \\\n    --exclude=\"__pycache__\" \\\n    --exclude=\".git\" \\\n    /var/www/my_project/ backup_user@203.0.113.80:/var/backups/my_project/",
              "annotations": [
                {
                  "line": 2,
                  "part": "-e 'ssh -p 2222'",
                  "text": "Chỉ định tham số SSH tùy biến (như đổi cổng port hoặc dùng file key riêng với -i)."
                },
                {
                  "line": 3,
                  "part": "--exclude",
                  "text": "Loại trừ các file tạm rác để không tốn băng thông truyền tải qua Internet."
                },
                {
                  "line": 6,
                  "part": "/var/www/my_project/",
                  "text": "Có dấu gạch chéo cuối: chép toàn bộ nội dung bên trong vào thẳng thư mục đích."
                }
              ],
              "output": "sending incremental file list\n./\napp/main.py\n      14,250 100%    4.20MB/s    0:00:00 (xfr#1, to-chk=42/45)\nsent 4,520 bytes  received 120 bytes  3,093.33 bytes/sec\ntotal size is 45,820,120  speedup is 10,210.42"
            }
          ]
        },
        {
          "id": "sec-3-7-delete-danger",
          "title": "2. Cảnh báo đỏ sống còn với cờ --delete & Kỹ thuật Dry-run",
          "content": "\n                  <div class=\"callout-box danger-box\">\n                    <div class=\"callout-title\">🚨 CẢNH BÁO ĐỎ: CỜ --DELETE CÓ THỂ XÓA SẠCH DỮ LIỆU ĐÍCH</div>\n                    <p>Cờ <code>--delete</code> yêu cầu rsync xóa bất kỳ file nào ở thư mục ĐÍCH nếu file đó không tồn tại ở thư mục NGUỒN (tạo bản sao gương phản chiếu 1:1). Nếu bạn gõ nhầm đảo ngược vị trí nguồn và đích, hoặc thư mục nguồn vô tình bị rỗng, <strong>rsync sẽ xóa sạch toàn bộ kho dữ liệu sao lưu ở đích chỉ trong 3 giây!</strong></p>\n                    <div class=\"lx-safe-alternative\">\n                      <strong>Quy tắc phòng thủ bắt buộc cho kỹ sư hệ thống:</strong>\n                      <br>BẤT KỲ KHI NÀO sử dụng cờ <code>--delete</code>, <strong>BẮT BUỘC PHẢI CHẠY KÈM CỜ <code>-n</code> (hoặc <code>--dry-run</code>) TRƯỚC</strong>!\n                      <br>Lệnh sẽ chạy mô phỏng, in ra chính xác danh sách file nào sẽ bị xóa mà không đụng tới đĩa. Sau khi mắt bạn đã đọc và xác nhận danh sách xóa là chính xác, bạn mới được phép bỏ cờ <code>-n</code> để chạy thật!\n                    </div>\n                  </div>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Chạy mô phỏng an toàn với cờ --dry-run trước khi áp dụng --delete",
              "code": "# Bước 1: CHẠY MÔ PHỎNG KIỂM TRA (Dry-run: thêm cờ -n)\nrsync -avzPn --delete /var/www/html/ backup_user@backup.internal:/var/www/html/\n\n# Bước 2: Quan sát kỹ các dòng có chữ 'deleting ...'\n# Bước 3: Sau khi xác nhận an toàn 100%, mới bỏ cờ -n để chạy lệnh thật\nrsync -avzP --delete /var/www/html/ backup_user@backup.internal:/var/www/html/",
              "annotations": [
                {
                  "line": 2,
                  "part": "-avzPn",
                  "text": "Chữ 'n' ở cuối kích hoạt chế độ Dry-run: in ra danh sách file sẽ sửa/xóa mà không thay đổi bất kỳ byte nào trên đĩa."
                },
                {
                  "line": 6,
                  "part": "--delete",
                  "text": "Đồng bộ gương phản chiếu: xóa file rác bên đích đã bị xóa ở bên nguồn."
                }
              ],
              "output": "sending incremental file list\ndeleting old_backup_2025.tar.gz\napp/config.json\n\nsent 1,240 bytes  received 45 bytes  856.67 bytes/sec\ntotal size is 12,450,200  speedup is 9,688.87 (DRY RUN)"
            }
          ]
        },
        {
          "id": "sec-3-7-lvm-snapshot",
          "title": "3. Kỹ thuật tạo ảnh chụp nhanh LVM Snapshot sao lưu Database zero-downtime",
          "content": "\n                  <p>Khi sao lưu cơ sở dữ liệu đang chạy tải cao, nếu bạn dùng <code>tar</code> hay <code>cp</code> thông thường, quá trình sao lưu mất 10 phút. Trong 10 phút đó, dữ liệu bảng A được sao lưu ở phút thứ 1, còn bảng B liên kết với nó được sao lưu ở phút thứ 10. Dữ liệu sao lưu bị <strong>bất đồng nhất (Inconsistent Backup)</strong> và không thể khôi phục lại được.</p>\n                  <p><strong>LVM Snapshot</strong> giải quyết triệt để bài toán này nhờ cơ chế <strong>Copy-on-Write (CoW)</strong>:</p>\n                  <ol>\n                    <li>Tạo snapshot trong 1 giây: LVM đóng băng bảng con trỏ khối dữ liệu tại đúng thời điểm đó.</li>\n                    <li>Gắn mount phân vùng snapshot ở chế độ chỉ đọc (Read-Only).</li>\n                    <li>Thong thả dùng <code>rsync</code> hoặc <code>tar</code> để nén sao lưu từ thư mục snapshot mount.</li>\n                    <li>Xóa phân vùng snapshot sau khi sao lưu xong để giải phóng dung lượng Volume Group.</li>\n                  </ol>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Quy trình sao lưu Database nhất quán với LVM Snapshot",
              "code": "# 1. Tạo snapshot dung lượng 5GB tên là lv_db_snap từ volume gốc lv_database\nsudo lvcreate -L 5G -s -n lv_db_snap /dev/vg_data/lv_database\n\n# 2. Tạo thư mục và gắn kết snapshot ở chế độ chỉ đọc\nsudo mkdir -p /mnt/db_snapshot\nsudo mount -o ro /dev/vg_data/lv_db_snap /mnt/db_snapshot\n\n# 3. Đồng bộ dữ liệu nhất quán sang máy chủ sao lưu\nrsync -avzP /mnt/db_snapshot/ backup_user@backup.internal:/backups/db_consistent/\n\n# 4. Tháo mount và hủy bỏ snapshot sau khi hoàn thành\nsudo umount /mnt/db_snapshot\nsudo lvremove -y /dev/vg_data/lv_db_snap",
              "annotations": [
                {
                  "line": 2,
                  "part": "-L 5G -s",
                  "text": "Cờ -s kích hoạt tạo Snapshot. Dung lượng 5GB là vùng nhớ đệm lưu các block dữ liệu gốc bị thay đổi trong lúc snapshot đang mở."
                },
                {
                  "line": 6,
                  "part": "mount -o ro",
                  "text": "Gắn kết ở chế độ Read-Only để đảm bảo dữ liệu snapshot không bị bất kỳ tiến trình nào làm thay đổi."
                },
                {
                  "line": 13,
                  "part": "lvremove -y",
                  "text": "Hủy bỏ snapshot để trả lại dung lượng trống cho Volume Group, tránh tràn dung lượng CoW."
                }
              ],
              "output": "  Logical volume \"lv_db_snap\" created.\n  Logical volume \"lv_db_snap\" successfully removed."
            }
          ]
        }
      ],
      "scenario": {
        "title": "Đồng bộ kho tệp đính kèm 2TB giữa 2 miền Bắc - Nam mà không làm nghẽn đường truyền",
        "content": "\n              <p>Hệ thống có kho ảnh tải lên của người dùng nặng 2TB tại Hà Nội. Yêu cầu đặt ra: Mỗi đêm phải đồng bộ toàn bộ file mới sang trung tâm dữ liệu dự phòng tại TP.HCM qua đường truyền cáp quang Internet thông thường.</p>\n              <p>Nếu dùng FTP hoặc copy thông thường, bạn không thể hoàn thành trong đêm. Bằng cách sử dụng <code>rsync -avzP --delete</code>, mỗi đêm hệ thống chỉ cần truyền khoảng 15GB các file mới sinh ra và các file bị xóa, toàn bộ quá trình hoàn tất chỉ trong 35 phút với độ chính xác và nhất quán 100%!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Để quên LVM Snapshot quá lâu làm tràn vùng nhớ đệm CoW",
            "content": "LVM Snapshot sử dụng cơ chế Copy-on-Write: khi volume gốc bị sửa, block dữ liệu cũ được chép sang vùng snapshot. Nếu bạn tạo snapshot 5GB mà để quên suốt 3 ngày, khi dữ liệu ghi trên ổ chính vượt quá 5GB, snapshot sẽ bị <strong>tràn (Snapshot Invalidation)</strong> và rơi vào trạng thái lỗi không đọc được. Luôn nhớ xóa snapshot ngay sau khi sao lưu xong!"
          }
        ],
        "tips": [
          {
            "title": "Giới hạn băng thông mạng khi rsync vào giờ làm việc",
            "content": "Nếu bạn phải chạy rsync vào ban ngày và sợ làm nghẽn đường truyền của khách hàng, hãy thêm cờ giới hạn băng thông: <code>--bwlimit=5000</code> (giới hạn tối đa 5000 KB/s ~ 5 MB/s)."
          }
        ]
      },
      "exercises": [
        {
          "question": "Sự khác biệt giữa hai lệnh sau là gì: 'rsync -a /var/data /backup' và 'rsync -a /var/data/ /backup'?",
          "command": "# Lệnh 1 (không có dấu / cuối): tạo ra thư mục /backup/data/...\n# Lệnh 2 (có dấu / cuối): chép toàn bộ nội dung bên trong thẳng vào /backup/...",
          "explanation": "Dấu gạch chéo cuối (Trailing Slash) ở đường dẫn nguồn báo cho rsync biết chỉ sao chép nội dung bên trong thư mục chứ không tạo thêm thư mục vỏ bọc ở đích."
        }
      ],
      "summary": [
        "rsync là công cụ đồng bộ dữ liệu số 1 nhờ thuật toán delta-transfer chỉ gửi phần dữ liệu khác biệt qua mạng.",
        "Luôn kiểm tra bằng cờ -n (--dry-run) trước khi áp dụng cờ nguy hiểm --delete để tránh xóa nhầm dữ liệu ở đích.",
        "LVM Snapshot cho phép chụp ảnh đóng băng trạng thái ổ đĩa tức thì, giúp sao lưu cơ sở dữ liệu nhất quán zero-downtime."
      ]
    },
    {
      "id": "lx-3-08",
      "number": "3.8",
      "title": "Triển khai Dịch vụ Web Nginx Reverse Proxy, Tối ưu Hiệu năng & Chứng chỉ SSL HTTPS",
      "subtitle": "Đưa ứng dụng Python/Web ra thế giới thực với khả năng chịu tải cao, bộ đệm tĩnh, nén gzip, SSL Let's Encrypt và nhập môn Docker",
      "level": "Nâng cao",
      "duration": "60 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Cấu hình Nginx làm Reverse Proxy đứng trước backend Python (FastAPI/Django) qua TCP socket hoặc UNIX Domain Socket.",
        "Thiết lập chuẩn mực các header chuyển tiếp: Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto để ứng dụng backend nhận diện đúng client.",
        "Tối ưu phục vụ file tĩnh (static caching), nén dữ liệu gzip và giới hạn kích thước upload client_max_body_size.",
        "Tự động cấp phát và gia hạn chứng chỉ bảo mật SSL/TLS miễn phí chuẩn A+ từ Let's Encrypt bằng Certbot.",
        "Mở rộng Container căn bản: Đóng gói ứng dụng web vào Docker container và vận hành an toàn."
      ],
      "intuition": {
        "title": "Lễ tân 5 sao Nginx và Bếp trưởng backend Python",
        "metaphor": "Để một ứng dụng Python (như Uvicorn hay Gunicorn) tiếp xúc trực tiếp với Internet giống như việc bắt đầu bếp trưởng phải vừa nấu ăn vừa ra đứng trước cửa tiếp khách, bưng bê nước ngọt, tính tiền và đối phó với kẻ phá hoại. Nginx chính là cô lễ tân chuyên nghiệp tại tiền sảnh: tiếp đón hàng chục ngàn khách hàng cùng lúc, phục vụ bánh ngọt và menu (file tĩnh ảnh/css/js) ngay tại quầy trong 1 mili-giây, chặn đứng các vị khách say xỉn (tấn công DDOS/rate limit), kiểm tra mã hóa trang phục (SSL HTTPS); chỉ những món ăn phức tạp cần chế biến (API logic/database) mới được chuyển vào bếp trưởng Python xử lý trong yên tĩnh.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🌐</span>\n                    <span>NGINX PROXY</span>\n                    <span class=\"lx-vs-tag\">HTTPS → App</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Client (HTTPS:443):</strong> Giao tiếp qua Internet bảo mật mã hóa SSL.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Nginx:</strong> Giải mã SSL (SSL Termination), nén gzip, cache file tĩnh, rate limit.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Backend (127.0.0.1:8000 hoặc unix socket):</strong> Nhận request sạch từ Nginx và xử lý logic nhanh gọn.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🐳</span>\n                    <span>DOCKER CONTAINER</span>\n                    <span class=\"lx-vs-tag\">Đóng gói nhẹ</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> Đóng gói toàn bộ mã nguồn Python + dependencies (requirements.txt) vào 1 Image duy nhất.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> Chạy độc lập, không sợ xung đột phiên bản Python hay thư viện hệ thống với host.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-8-nginx-proxy-config",
          "title": "1. Cấu hình Nginx Reverse Proxy chuẩn Production cho ứng dụng Python",
          "content": "\n                  <p>Tạo file cấu hình tại <code>/etc/nginx/sites-available/fastapi_app.conf</code> và tạo liên kết mềm sang <code>sites-enabled/</code>:</p>\n                ",
          "codeExamples": [
            {
              "lang": "Nginx",
              "title": "Tệp cấu hình /etc/nginx/sites-available/fastapi_app.conf",
              "code": "upstream backend_python {\n    # Có thể dùng UNIX Domain Socket hoặc TCP socket\n    server 127.0.0.1:8000 fail_timeout=0;\n    keepalive 32;\n}\n\nserver {\n    listen 80;\n    server_name api.example.com;\n    client_max_body_size 50M;\n\n    # Phục vụ file tĩnh trực tiếp không làm phiền Python backend\n    location /static/ {\n        alias /opt/fastapi_app/static/;\n        expires 30d;\n        add_header Cache-Control \"public, no-transform\";\n        access_log off;\n    }\n\n    # Chuyển tiếp toàn bộ API requests vào Python backend\n    location / {\n        proxy_pass http://backend_python;\n        proxy_http_version 1.1;\n        proxy_set_header Connection \"\";\n        \n        # BẮT BUỘC: Truyền đúng IP thật và giao thức của client\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n        \n        # Tùy chọn timeout chống treo kết nối\n        proxy_connect_timeout 60s;\n        proxy_read_timeout 60s;\n    }\n}",
              "annotations": [
                {
                  "line": 1,
                  "part": "upstream backend_python",
                  "text": "Khai báo cụm máy chủ backend hỗ trợ cân bằng tải và keepalive socket tái sử dụng kết nối."
                },
                {
                  "line": 9,
                  "part": "client_max_body_size 50M",
                  "text": "Mặc định Nginx chỉ cho upload 1MB; tăng lên 50MB để người dùng upload được file ảnh/tài liệu."
                },
                {
                  "line": 12,
                  "part": "location /static/",
                  "text": "Nginx phục vụ file ảnh, CSS, JS trực tiếp từ đĩa cứng với tốc độ tối đa, không cần Python xử lý."
                },
                {
                  "line": 26,
                  "part": "X-Forwarded-For / Proto",
                  "text": "Bắt buộc phải có để ứng dụng Python biết chính xác địa chỉ IP người dùng thật và giao thức HTTPS."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-3-8-certbot-ssl",
          "title": "2. Tự động cấp phát và gia hạn SSL miễn phí với Certbot Let's Encrypt",
          "content": "\n                  <p>Cài đặt Certbot và plugin Nginx: <code>sudo apt update && sudo apt install -y certbot python3-certbot-nginx</code></p>\n                  <p>Chỉ với một dòng lệnh duy nhất, Certbot sẽ tự động kết nối với máy chủ Let's Encrypt để xác thực tên miền, tự sinh cặp khóa bảo mật TLS 1.3 và tự động chỉnh sửa file cấu hình Nginx để kích hoạt HTTPS:</p>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Quy trình kích hoạt HTTPS và kiểm tra tự động gia hạn",
              "code": "# 1. Kiểm tra tính hợp lệ của cấu hình Nginx trước khi kích hoạt\nsudo nginx -t\n\n# 2. Yêu cầu cấp chứng chỉ SSL và tự động cấu hình redirect HTTP sang HTTPS\nsudo certbot --nginx -d api.example.com\n\n# 3. Chạy thử nghiệm quy trình tự động gia hạn (Dry-run)\nsudo certbot renew --dry-run",
              "annotations": [
                {
                  "line": 2,
                  "part": "nginx -t",
                  "text": "Kiểm tra cú pháp cấu hình Nginx, không bao giờ reload nếu lệnh này báo lỗi."
                },
                {
                  "line": 5,
                  "part": "certbot --nginx",
                  "text": "Certbot tự động thêm khối listen 443 ssl và tự cấu hình chứng chỉ Let's Encrypt."
                },
                {
                  "line": 8,
                  "part": "renew --dry-run",
                  "text": "systemd timer của Certbot tự động chạy mỗi ngày 2 lần; dry-run đảm bảo gia hạn không bị lỗi khi hết hạn 90 ngày."
                }
              ],
              "output": "Saving debug log to /var/log/letsencrypt/letsencrypt.log\nRequesting a certificate for api.example.com\nSuccessfully received certificate.\nCertificate is saved at: /etc/letsencrypt/live/api.example.com/fullchain.pem\nKey is saved at:         /etc/letsencrypt/live/api.example.com/privkey.pem\nDeploying certificate to VirtualHost /etc/nginx/sites-enabled/fastapi_app.conf\nCongratulations! You have successfully enabled HTTPS on https://api.example.com"
            }
          ]
        },
        {
          "id": "sec-3-8-docker-basics",
          "title": "3. Mở rộng: Đóng gói ứng dụng web với Container Docker",
          "content": "\n                  <p>Thay vì cài đặt Python và các thư viện trực tiếp lên máy chủ host (dễ gây xung đột phiên bản), giải pháp hiện đại là đóng gói ứng dụng vào <strong>Docker Container</strong>:</p>\n                ",
          "codeExamples": [
            {
              "lang": "Dockerfile",
              "title": "Tệp Dockerfile tối ưu nhiều lớp cho ứng dụng Python FastAPI",
              "code": "# 1. Sử dụng image cơ sở Python phiên bản rút gọn (slim)\nFROM python:3.12-slim\n\nWORKDIR /app\n\n# 2. Cài đặt thư viện dependencies trước để tận dụng Docker layer cache\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# 3. Sao chép mã nguồn ứng dụng\nCOPY . .\n\n# 4. Chạy dưới quyền user không đặc quyền để bảo mật\nUSER nobody\n\nEXPOSE 8000\nCMD [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]",
              "annotations": [
                {
                  "line": 2,
                  "part": "python:3.12-slim",
                  "text": "Image siêu nhẹ (~150MB) chứa môi trường Python chuẩn không rác thừa."
                },
                {
                  "line": 8,
                  "part": "--no-cache-dir",
                  "text": "Không lưu cache pip để giảm tối đa kích thước image."
                },
                {
                  "line": 14,
                  "part": "USER nobody",
                  "text": "Nguyên tắc bảo mật: Không bao giờ chạy container dưới quyền root!"
                }
              ],
              "output": ""
            }
          ]
        }
      ],
      "scenario": {
        "title": "Đưa ứng dụng FastAPI ra Internet đạt điểm A+ bảo mật trên SSL Labs",
        "content": "\n              <p>Bạn vừa hoàn thành một API dịch vụ thanh toán bằng Python FastAPI. Yêu cầu của đối tác: API bắt buộc phải chạy trên tên miền HTTPS chính thức, mã hóa TLS 1.3, hỗ trợ HTTP/2 và đạt điểm A+ trên hệ thống kiểm thử bảo mật SSL Labs.</p>\n              <p><strong>Triển khai trọn gói:</strong></p>\n              <p>1. Cấu hình Nginx làm Reverse Proxy đứng trước Uvicorn backend, bật HTTP/2 trên cổng 443.</p>\n              <p>2. Chạy <code>certbot --nginx</code> để cấp chứng chỉ SSL miễn phí.</p>\n              <p>3. Bổ sung header bảo vệ HSTS: <code>add_header Strict-Transport-Security \"max-age=63072000; includeSubDomains; preload\" always;</code>.</p>\n              <p>Kiểm tra trên ssllabs.com: Điểm số đạt A+ hoàn hảo, tốc độ tải API tăng gấp 3 lần nhờ HTTP/2 multiplexing!</p>\n            "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi 502 Bad Gateway kinh điển",
            "content": "Lỗi 502 có nghĩa là Nginx đã sẵn sàng tiếp nhận request nhưng <strong>tiến trình backend Python phía sau đang bị chết hoặc chưa khởi động</strong>! Khi gặp lỗi 502, lập tức kiểm tra backend bằng: <code>systemctl status my_app</code> hoặc <code>curl http://127.0.0.1:8000</code>."
          }
        ],
        "tips": [
          {
            "title": "Luôn bật gzip trong Nginx để tiết kiệm 70% băng thông",
            "content": "Thêm chỉ thị <code>gzip on; gzip_types text/plain application/json text/css application/javascript;</code> vào khối http để Nginx tự động nén dữ liệu API trả về, giúp người dùng tải trang nhanh hơn đáng kể."
          }
        ]
      },
      "exercises": [
        {
          "question": "Chỉ thị nào trong tệp cấu hình Nginx dùng để truyền địa chỉ IP thật của người dùng vào ứng dụng backend Python?",
          "command": "proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;",
          "explanation": "Nếu thiếu header này, ứng dụng Python sẽ chỉ nhìn thấy địa chỉ IP của client là 127.0.0.1 (IP của Nginx), làm hỏng toàn bộ logic ghi log, xác thực người dùng và rate limiting theo IP."
        }
      ],
      "summary": [
        "Nginx đóng vai trò Reverse Proxy tiền sảnh: giải mã SSL, nén gzip, phục vụ file tĩnh và bảo vệ backend Python phía sau.",
        "Certbot tự động hóa hoàn toàn quy trình cấp phát và gia hạn chứng chỉ SSL Let's Encrypt chuẩn A+ miễn phí.",
        "Container Docker giúp đóng gói mã nguồn và dependencies vào một đơn vị độc lập, vận hành an toàn và dễ dàng mở rộng."
      ]
    },
    {
      "id": "lx-3-09",
      "number": "3.9",
      "title": "Chẩn đoán Hiệu năng (USE Method, vmstat, strace), Tự động hóa Ansible & Dự án Thực hành Cấp 3",
      "subtitle": "Phương pháp bắt bệnh hệ thống bài bản theo chuẩn USE Method, tự động hóa hạ tầng với Ansible và giải quyết 3 kịch bản sự cố máy chủ thực tế",
      "level": "Dự án",
      "duration": "75 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Làm chủ phương pháp chẩn đoán sự cố bài bản USE Method (Utilization, Saturation, Errors) của chuyên gia Brendan Gregg.",
        "Sử dụng thành thạo bộ công cụ phân tích hiệu năng: vmstat (CPU/RAM/IO), iostat (%util ổ đĩa), lsof (file descriptor), strace (soi syscall thời gian thực).",
        "Nhập môn tự động hóa hạ tầng với Ansible căn bản: viết Inventory và Playbook tự động cấu hình máy chủ Nginx/Python.",
        "Dự án Thực hành Cấp 3: Triển khai Cụm Máy chủ Web Production hoàn chỉnh và vượt qua 3 kịch bản sự cố thực tế kinh điển."
      ],
      "intuition": {
        "title": "Bác sĩ bắt bệnh theo phương pháp USE và Robot Ansible",
        "metaphor": "Khi máy chủ bị chậm hoặc nghẽn, một kỹ sư thiếu kinh nghiệm sẽ hoảng loạn gõ lung tung các lệnh khởi động lại. Một kỹ sư kỳ cựu hành xử như một bác sĩ chuyên khoa: áp dụng phương pháp USE kiểm tra từng cơ quan nội tạng (CPU, Bộ nhớ, Ổ đĩa, Mạng) để đo 3 chỉ số: Mức độ sử dụng (Utilization), Độ bão hòa xếp hàng (Saturation), và Lỗi phát sinh (Errors). Sau khi bắt đúng bệnh, bạn sử dụng Ansible như một cánh tay robot công nghiệp để tự động hóa việc triển khai và sửa đổi cấu hình trên hàng chục máy chủ cùng lúc chỉ bằng một dòng lệnh.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🩺</span>\n                    <span>PHƯƠNG PHÁP USE</span>\n                    <span class=\"lx-vs-tag\">Brendan Gregg</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Utilization (Sử dụng):</strong> Tài nguyên đang hoạt động bao nhiêu % công suất? (vmstat us/sy, iostat %util).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Saturation (Bão hòa):</strong> Có bao nhiêu tác vụ đang phải xếp hàng chờ đợi? (vmstat r/b, Load Average).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Errors (Lỗi):</strong> Có bao nhiêu gói tin hay khối dữ liệu bị lỗi, drop? (netstat -s, dmesg).</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🤖</span>\n                    <span>ANSIBLE AUTOMATION</span>\n                    <span class=\"lx-vs-tag\">Agentless</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Không cần cài Agent:</strong> Ansible giao tiếp qua cổng SSH có sẵn của Linux bằng Python.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Tính lũy đẳng (Idempotency):</strong> Chạy playbook 1 lần hay 100 lần kết quả vẫn nhất quán, không sợ lỗi trùng lặp.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-9-use-method-tools",
          "title": "1. Bộ công cụ chẩn đoán hiệu năng theo phương pháp USE: vmstat, iostat & strace",
          "content": "\n                  <p>Khi hệ thống bị chậm, hãy chạy bộ công cụ chẩn đoán theo thứ tự chuẩn:</p>\n                  <ol>\n                    <li><code>vmstat 1 5</code>: Chụp 5 lần thông số hệ thống mỗi giây một lần. Quan sát cột <code>r</code> (tiến trình chờ CPU), cột <code>b</code> (tiến trình bị nghẽn I/O - Uninterruptible Sleep), và cột <code>wa</code> (CPU chờ ổ đĩa). Nếu <code>wa > 20%</code>, thủ phạm là ổ cứng nghẽn!</li>\n                    <li><code>iostat -xz 1 3</code>: Đo lường chi tiết từng ổ đĩa. Cột <code>%util</code> thể hiện thời gian ổ đĩa bận rộn; nếu chạm mốc <code>100%</code>, ổ đĩa đã quá tải.</li>\n                    <li><code>strace -p [PID] -c</code>: Đếm và thống kê thời gian tiêu tốn vào các lời gọi hệ thống (Syscalls) của tiến trình đang bị chậm.</li>\n                  </ol>\n                ",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Chẩn đoán nghẽn cổ chai và soi lời gọi hệ thống với strace",
              "code": "# 1. Kiểm tra nhanh tài nguyên CPU và bộ nhớ đệm mỗi giây một lần\nvmstat 1 3\n\n# 2. Đo lường tỷ lệ bận rộn của các ổ đĩa\niostat -xz 1 2\n\n# 3. Theo dõi tiến trình Python đang bị treo xem nó đang dừng ở syscall nào\nsudo strace -p 4520 -T -e trace=network,file",
              "annotations": [
                {
                  "line": 2,
                  "part": "vmstat 1 3",
                  "text": "Số đầu tiên là chu kỳ (1 giây), số thứ hai là số lần đo (3 lần)."
                },
                {
                  "line": 5,
                  "part": "iostat -xz",
                  "text": "-x hiển thị thông số mở rộng (await, %util); -z bỏ qua các thiết bị không có hoạt động để dễ nhìn."
                },
                {
                  "line": 8,
                  "part": "strace -p ... -T",
                  "text": "-p theo dõi PID đang chạy; -T in ra thời gian tiêu tốn cho từng syscall tính bằng micro-giây."
                }
              ],
              "output": "procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n 4  1      0 420100  45200 850400    0    0   120   450 1200 2400 65 15 12  8  0\nDevice            r/s     w/s     rkB/s     wkB/s   await  %util\nsda             45.00  120.00   1800.00   4500.00    2.50  88.40"
            }
          ]
        },
        {
          "id": "sec-3-9-ansible-basics",
          "title": "2. Tự động hóa cấu hình máy chủ với Ansible căn bản",
          "content": "\n                  <p>Ansible cho phép bạn cấu hình và cài đặt hàng chục máy chủ Linux đồng thời chỉ bằng các tệp khai báo YAML (Playbook):</p>\n                ",
          "codeExamples": [
            {
              "lang": "Yaml",
              "title": "Playbook deploy_web.yml cài đặt và cấu hình Nginx tự động",
              "code": "---\n- name: Deploy Production Web Server\n  hosts: webservers\n  become: true\n  tasks:\n    - name: Cài đặt Nginx và UFW\n      apt:\n        name:\n          - nginx\n          - ufw\n        state: present\n        update_cache: true\n\n    - name: Sao chép file cấu hình Nginx vào sites-available\n      copy:\n        src: ./files/fastapi_app.conf\n        dest: /etc/nginx/sites-available/fastapi_app.conf\n        owner: root\n        group: root\n        mode: '0644'\n      notify: Restart Nginx\n\n    - name: Kích hoạt site Nginx qua symlink\n      file:\n        src: /etc/nginx/sites-available/fastapi_app.conf\n        dest: /etc/nginx/sites-enabled/fastapi_app.conf\n        state: link\n\n  handlers:\n    - name: Restart Nginx\n      systemd:\n        name: nginx\n        state: restarted",
              "annotations": [
                {
                  "line": 4,
                  "part": "become: true",
                  "text": "Tự động chuyển sang quyền sudo để thực thi các tác vụ quản trị hệ thống."
                },
                {
                  "line": 20,
                  "part": "notify: Restart Nginx",
                  "text": "Cơ chế Handler thông minh: chỉ khởi động lại Nginx nếu nội dung file cấu hình thực sự có sự thay đổi."
                },
                {
                  "line": 28,
                  "part": "handlers",
                  "text": "Khối tác vụ phản ứng chỉ chạy khi có tín hiệu notify từ các bước trên."
                }
              ],
              "output": ""
            }
          ]
        },
        {
          "id": "sec-3-9-troubleshoot-scenarios",
          "title": "3. Diễn tập 3 Kịch bản Sự cố Thực tế Cấp 3 (Troubleshooting Scenarios)",
          "content": "\n                  <p>Dưới đây là 3 bài toán sự cố thực chiến phức tạp thường gặp ở các hệ thống chịu tải cao. Hãy suy luận nguyên nhân và cách xử lý trước khi bấm mở xem lời giải!</p>\n                "
        }
      ],
      "exercises": [
        {
          "question": "SỰ CỐ 1: Khách hàng truy cập website gặp lỗi '502 Bad Gateway'. Kiểm tra Nginx vẫn đang active running. Lỗi do đâu và quy trình 3 bước xử lý dứt điểm?",
          "command": "# Bước 1: Kiểm tra log lỗi Nginx:\nsudo tail -n 20 /var/log/nginx/error.log\n# Bước 2: Kiểm tra backend Python:\nsudo systemctl status fastapi_app\n# Bước 3: Xem log crash của backend:\njournalctl -u fastapi_app -n 30 -p err",
          "explanation": "NGUYÊN NHÂN: Nginx là reverse proxy; lỗi 502 có nghĩa là nó không thể kết nối tới backend Python (Uvicorn/Gunicorn bị sập hoặc quá tải nghẽn queue).\nCÁCH XỬ LÝ: Đọc error.log của Nginx để biết địa chỉ/port backend từ chối kết nối (Connection Refused), sau đó kiểm tra trạng thái systemd của backend và dùng journalctl để đọc trace lỗi ngoại lệ Python làm sập ứng dụng."
        },
        {
          "question": "SỰ CỐ 2: Sau khi kỹ sư sửa file /etc/fstab để gắn ổ đĩa mới, máy chủ được khởi động lại nhưng không vào được SSH mà rơi vào 'Emergency Mode'. Cách cứu hộ từ xa là gì?",
          "command": "# Đăng nhập Web Console, remount root dạng đọc ghi:\nmount -o remount,rw /\n# Sửa lại file fstab bằng nano/vi:\nnano /etc/fstab\n# Kiểm tra lại:\nmount -a",
          "explanation": "NGUYÊN NHÂN: fstab bị sai UUID, sai cú pháp hoặc thiếu cờ 'nofail' trên ổ phụ khiến quá trình boot của systemd bị chặn đứng.\nCÁCH XỬ LÝ: Mở Web Console cứu hộ của nhà cung cấp Cloud, chạy 'mount -o remount,rw /' để cho phép ghi dữ liệu, mở /etc/fstab comment lại dòng bị lỗi hoặc thêm tùy chọn 'nofail', sau đó reboot lại máy."
        },
        {
          "question": "SỰ CỐ 3: Máy chủ web có CPU load trung bình tăng cao bất thường nhưng %CPU trong top chỉ 5%, trong khi cột 'wa' trong vmstat tăng vọt lên 65%. Điều này phản ánh bệnh gì?",
          "command": "sudo iostat -xz 1 5\nsudo iotop -o",
          "explanation": "NGUYÊN NHÂN: Hiện tượng nghẽn I/O (Disk I/O Bottleneck). CPU không bận tính toán logic mà đang phải rảnh rỗi chờ đợi ổ đĩa cứng đọc/ghi dữ liệu (iowait).\nCÁCH XỬ LÝ: Dùng 'iostat -xz 1' để xác định ổ đĩa nào có %util chạm 100%, sau đó dùng 'sudo iotop -o' để tìm chính xác tiến trình nào đang ghi đĩa điên cuồng (thường là query database thiếu index hoặc log quá lớn)."
        }
      ],
      "summary": [
        "Áp dụng phương pháp USE Method giúp bạn chẩn đoán sự cố máy chủ một cách khoa học, không phỏng đoán mơ hồ.",
        "Bộ công cụ vmstat, iostat, lsof và strace là kính hiển vi giúp kỹ sư soi thấu từng lời gọi hệ thống và điểm nghẽn tài nguyên.",
        "Ansible tự động hóa việc triển khai hạ tầng nhất quán, giúp bạn quản trị hàng trăm máy chủ nhẹ nhàng và không sai sót."
      ]
    },
    {
      "id": "lx-3-10",
      "number": "3.10",
      "title": "Bảng tra cứu Quản trị Thực chiến & Bảo mật Cấp 3 (Cheat Sheet & Glossary)",
      "subtitle": "Sổ tay tra cứu nhanh toàn diện cú pháp systemd, tường lửa UFW/nftables, LVM, Nginx, rsync, SSH hardening và chẩn đoán hiệu năng",
      "level": "Tra cứu",
      "duration": "25 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Tra cứu tức thì cú pháp các chỉ thị systemd Service Unit và Timer Unit.",
        "Bảng tổng hợp lệnh LVM (pvcreate, vgextend, lvextend) và phân quyền SELinux (semanage, restorecon).",
        "Bảng lệnh tường lửa UFW và các chỉ thị Reverse Proxy Nginx chuẩn mực.",
        "Hệ thống hóa từ điển thuật ngữ cốt lõi Cấp 3: MAC vs DAC, SELinux Context, LVM, Reverse Proxy, Trailing Slash, USE Method, File Descriptor."
      ],
      "intuition": {
        "title": "Cẩm nang quy chuẩn vận hành của đội ngũ SysAdmin & SRE",
        "metaphor": "Một kỹ sư trưởng (Lead SRE) không cần phải học vẹt từng thông số cấu hình; giá trị của bạn nằm ở việc nắm vững nguyên lý vận hành và có sẵn cuốn cẩm nang tra cứu chuẩn xác để chỉ đạo ứng cứu sự cố trong vài phút.",
        "visualHtml": "\n              <div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📑</span>\n                    <span>CHEAT SHEET CẤP 3</span>\n                    <span class=\"lx-vs-tag\">Tra cứu</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>systemctl daemon-reload</code>: Nạp lại cấu hình sau khi sửa service.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>lvextend -r -L +20G /dev/vg/lv</code>: Tăng dung lượng đĩa trực tuyến.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>ufw default deny incoming</code>: Chặn toàn bộ cổng vào mặc định.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <code>certbot --nginx -d domain</code>: Cấp SSL HTTPS tự động.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📚</span>\n                    <span>THUẬT NGỮ CẤP 3</span>\n                    <span class=\"lx-vs-tag\">Glossary</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>MAC:</strong> Kiểm soát truy cập bắt buộc cấp nhân, ngăn chặn cả root.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Idempotency:</strong> Tính lũy đẳng — chạy nhiều lần không gây lỗi.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>SSL Termination:</strong> Giải mã HTTPS tại Nginx giảm tải cho backend.</li>\n                  </ul>\n                </div>\n              </div>\n            "
      },
      "sections": [
        {
          "id": "sec-3-10-cheatsheet-systemd-lvm",
          "title": "1. Bảng tra cứu Lệnh systemd, LVM và Tường lửa",
          "content": "\n                  <div class=\"table-container\">\n                    <table class=\"data-table\">\n                      <thead>\n                        <tr>\n                          <th>Lệnh &amp; Cú pháp</th>\n                          <th>Ý nghĩa &amp; Chức năng</th>\n                          <th>Ghi chú quan trọng</th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td><code>systemctl daemon-reload</code></td>\n                          <td>Quét lại toàn bộ các file .service và .timer trong /etc</td>\n                          <td>Bắt buộc chạy sau khi sửa bất kỳ unit file nào</td>\n                        </tr>\n                        <tr>\n                          <td><code>systemctl list-timers</code></td>\n                          <td>Xem danh sách các timer đang lập lịch và thời gian chạy kế tiếp</td>\n                          <td>Kiểm tra xem timer có đang active hay không</td>\n                        </tr>\n                        <tr>\n                          <td><code>lvextend -r -L +10G /dev/vg/lv</code></td>\n                          <td>Mở rộng dung lượng Logical Volume và tự co giãn filesystem</td>\n                          <td>Cờ -r tự nhận diện ext4 hay XFS</td>\n                        </tr>\n                        <tr>\n                          <td><code>mount -a</code></td>\n                          <td>Thử gắn kết toàn bộ các phân vùng trong /etc/fstab</td>\n                          <td>Bắt buộc chạy trước khi reboot sau khi sửa fstab</td>\n                        </tr>\n                        <tr>\n                          <td><code>ufw limit 22/tcp</code></td>\n                          <td>Mở cổng SSH kèm cơ chế tự chặn IP thử quá 6 lần/30s</td>\n                          <td>Bảo vệ cổng SSH khỏi brute-force tự động</td>\n                        </tr>\n                        <tr>\n                          <td><code>fail2ban-client status sshd</code></td>\n                          <td>Xem danh sách các IP đang bị khóa bởi Fail2ban</td>\n                          <td>Dùng unbanip để mở khóa thủ công</td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </div>\n                "
        },
        {
          "id": "sec-3-10-cheatsheet-nginx-perf",
          "title": "2. Bảng tra cứu Nginx, SSL và Chẩn đoán Hiệu năng",
          "content": "\n                  <div class=\"table-container\">\n                    <table class=\"data-table\">\n                      <thead>\n                        <tr>\n                          <th>Lệnh &amp; Cú pháp</th>\n                          <th>Mục đích sử dụng</th>\n                          <th>Ghi chú vận hành</th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        <tr>\n                          <td><code>nginx -t</code></td>\n                          <td>Kiểm tra cú pháp toàn bộ các file cấu hình Nginx</td>\n                          <td>Không bao giờ reload nếu lệnh này báo lỗi</td>\n                        </tr>\n                        <tr>\n                          <td><code>certbot renew --dry-run</code></td>\n                          <td>Chạy thử nghiệm quy trình gia hạn chứng chỉ SSL</td>\n                          <td>Đảm bảo chứng chỉ sẽ tự động gia hạn an toàn</td>\n                        </tr>\n                        <tr>\n                          <td><code>vmstat 1 5</code></td>\n                          <td>Giám sát CPU, RAM, IO, số tiến trình chờ thời gian thực</td>\n                          <td>Cột 'wa' cao phản ánh nghẽn ổ đĩa</td>\n                        </tr>\n                        <tr>\n                          <td><code>iostat -xz 1</code></td>\n                          <td>Đo lường chi tiết tải đọc ghi của từng ổ cứng vật lý</td>\n                          <td>Cột '%util' chạm 100% là ổ cứng bị quá tải</td>\n                        </tr>\n                        <tr>\n                          <td><code>strace -p [PID] -c</code></td>\n                          <td>Thống kê thời gian tiêu tốn vào các lời gọi hệ thống</td>\n                          <td>Tìm nguyên nhân tiến trình bị chậm hoặc treo</td>\n                        </tr>\n                        <tr>\n                          <td><code>rsync -avzPn --delete src/ dest/</code></td>\n                          <td>Mô phỏng đồng bộ dữ liệu kèm xóa file thừa (Dry-run)</td>\n                          <td>Luôn kiểm tra với -n trước khi chạy lệnh thật</td>\n                        </tr>\n                      </tbody>\n                    </table>\n                  </div>\n                "
        },
        {
          "id": "sec-3-10-glossary",
          "title": "3. Từ điển Thuật ngữ Quản trị & Bảo mật Cấp 3 (Glossary)",
          "content": "\n                  <div class=\"lx-glossary-grid\">\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">MAC (Mandatory Access Control)</span>\n                        <span class=\"lx-glossary-cat\">Security</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Kiểm soát truy cập bắt buộc do hạt nhân hệ điều hành áp đặt. Mọi tiến trình và tài nguyên đều bị dán nhãn; ngay cả tài khoản root cũng không thể vượt qua chính sách MAC (ví dụ: SELinux, AppArmor).</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">LVM (Logical Volume Manager)</span>\n                        <span class=\"lx-glossary-cat\">Storage</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Hệ thống trừu tượng hóa lưu trữ cho phép gộp nhiều ổ đĩa vật lý thành nhóm và phân chia thành các phân vùng logic có thể co giãn kích thước trực tuyến mà không làm gián đoạn dịch vụ.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Reverse Proxy</span>\n                        <span class=\"lx-glossary-cat\">Networking</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Máy chủ đứng trung gian giữa client và backend: tiếp nhận request từ Internet, giải mã SSL, nén dữ liệu, cache file tĩnh và chuyển tiếp request an toàn tới các ứng dụng backend nội bộ.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">USE Method</span>\n                        <span class=\"lx-glossary-cat\">Performance</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Phương pháp chẩn đoán hiệu năng hệ thống của Brendan Gregg: kiểm tra mọi tài nguyên phần cứng theo 3 tiêu chí: Mức độ sử dụng (Utilization), Độ bão hòa xếp hàng (Saturation), và Lỗi (Errors).</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Trailing Slash</span>\n                        <span class=\"lx-glossary-cat\">rsync</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Dấu gạch chéo ở cuối đường dẫn thư mục trong rsync: 'dir/' biểu thị sao chép nội dung bên trong; 'dir' biểu thị sao chép toàn bộ thư mục kèm vỏ bọc bên ngoài.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">Idempotency (Lũy đẳng)</span>\n                        <span class=\"lx-glossary-cat\">Automation</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Thuộc tính trong tự động hóa hệ thống (Ansible): một tác vụ dù thực thi 1 lần hay 100 lần thì trạng thái cuối cùng của máy chủ vẫn hoàn toàn giống nhau, không sinh ra lỗi hay tạo bản sao trùng lặp.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">SSL Termination</span>\n                        <span class=\"lx-glossary-cat\">Security</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Quá trình giải mã lưu lượng HTTPS ngay tại lớp Nginx Reverse Proxy, giúp giảm tải gánh nặng tính toán mật mã cho các máy chủ backend phía sau.</p>\n                    </div>\n\n                    <div class=\"lx-glossary-card\">\n                      <div class=\"lx-glossary-header\">\n                        <span class=\"lx-glossary-term\">CoW (Copy-on-Write)</span>\n                        <span class=\"lx-glossary-cat\">Filesystem</span>\n                      </div>\n                      <p class=\"lx-glossary-def\">Cơ chế sao chép khi ghi: dữ liệu chỉ thực sự bị nhân bản khi có thao tác ghi đè lên block dữ liệu cũ. Là nền tảng của LVM Snapshot và các hệ thống file hiện đại Btrfs/ZFS.</p>\n                    </div>\n                  </div>\n                "
        }
      ],
      "exercises": [],
      "summary": [
        "Bảng tra cứu nhanh Cấp 3 giúp quản trị viên phản xạ tức thì các cú pháp systemd, LVM, UFW, Nginx và chẩn đoán hiệu năng.",
        "Nắm vững các thuật ngữ cốt lõi: MAC, LVM, Reverse Proxy, USE Method, Idempotency và Copy-on-Write.",
        "Tích hợp toàn diện các kỹ năng Cấp 3 để vận hành cụm máy chủ Production chịu tải cao, bảo mật vững chắc và tự động hóa cao."
      ]
    }
  ]
};
