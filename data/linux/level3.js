// Dữ liệu Chuyên đề Linux Cấp 3: Quản trị Nâng cao & Hạ tầng Sản xuất
// Định dạng IIFE gán vào window để chạy mượt mà trên cả file:// và HTTP server

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
      "subtitle": "Làm chủ init system tiêu chuẩn của Linux: Đóng gói ứng dụng Python chuẩn production, cô lập sandbox bảo mật và tự động hóa tác vụ định kỳ",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "1. [Biết - Remember] Nắm vững cấu trúc 3 phần chuẩn của Service Unit ([Unit], [Service], [Install]) và cú pháp Timer Unit OnCalendar",
        "2. [Hiểu - Understand] Hiểu sâu cơ chế Sandbox bảo mật của systemd: ProtectSystem, ProtectHome, NoNewPrivileges, PrivateTmp",
        "3. [Vận dụng - Apply] Viết file Service Unit độc lập cho ứng dụng Python/Node.js và Timer Unit thay thế hoàn toàn Crontab",
        "4. [Phân tích - Analyze] Phân tích cây tiến trình cgroup (systemd-cgls), gỡ lỗi trạng thái failed và áp dụng Drop-in Override an toàn"
      ],
      "intuition": {
        "title": "Vệ sĩ điều phối đa năng systemd và Khối cách ly Sandbox",
        "overview": "systemd không đơn thuần là tiến trình init PID 1; nó là nền tảng quản trị dịch vụ toàn diện kiểm soát vòng đời tiến trình, tài nguyên cgroups, bảo mật sandbox và lập lịch chuẩn xác.",
        "realWorld": "Một ứng dụng thanh toán ngân hàng chạy ngầm bị hacker tấn công qua lỗ hổng RCE. Nhờ service unit được cấu hình ProtectSystem=strict và PrivateTmp=true, kẻ tấn công hoàn toàn không thể sửa đổi bất kỳ file nhị phân hệ thống nào hay xem trộm file tạm của ứng dụng khác.",
        "metaphor": "Nếu Cron là chiếc đồng hồ cơ gõ chuông một cách đơn độc không cần biết người nghe có đang ngủ hay không, thì Timer Unit là trợ lý thông minh: nó chờ dịch vụ phụ thuộc khởi động xong (network-online.target), theo dõi log tập trung và tự động kích hoạt bù nếu máy chủ vừa thức dậy sau sự cố mất điện.",
        "boundary": "systemd quản lý các unit ở tầng máy chủ hệ điều hành; khi dịch vụ được đóng gói thành container trong Kubernetes hoặc Docker Swarm, việc điều phối vòng đời sẽ do Container Engine đảm nhiệm.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">systemd không đơn thuần là tiến trình init PID 1; nó là nền tảng quản trị dịch vụ toàn diện kiểm soát vòng đời tiến trình, tài nguyên cgroups, bảo mật sandbox và lập lịch chuẩn xác.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>Type=simple/notify</code>:</strong> Khai báo kiểu khởi động của tiến trình dịch vụ</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>Restart=always</code>:</strong> Tự động phục hồi khi tiến trình gặp sự cố chết</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>ProtectSystem=strict</code>:</strong> Bật chế độ chỉ đọc (Read-Only) cho hệ thống file</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một ứng dụng thanh toán ngân hàng chạy ngầm bị hacker tấn công qua lỗ hổng RCE. Nhờ service unit được cấu hình ProtectSystem=strict và PrivateTmp=true, kẻ tấn công hoàn toàn không thể sửa đổi bất kỳ file nhị phân hệ thống nào hay xem trộm file tạm của ứng dụng khác.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Tệp Service Unit chuẩn công nghiệp &amp; Cơ chế Sandbox Bảo mật</li><li><span class=\"lx-vs-bullet\">•</span> Thay thế Cron toàn diện bằng Timer Unit (OnCalendar &amp; Persistent)</li><li><span class=\"lx-vs-bullet\">•</span> Quy trình Vận hành, Ghi đè (Drop-in Override) &amp; Xử lý Trạng thái Lỗi</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Quản trị systemd Unit",
          "content": "<p>Quản trị dịch vụ systemd chuẩn công nghiệp đòi hỏi hiểu rõ các chỉ thị khai báo và cơ chế kiểm soát tiến trình bằng cgroups:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Chỉ thị / Lệnh</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Ghi chú vận hành</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>Type=simple/notify</code></td>\n            <td>Khai báo kiểu khởi động của tiến trình dịch vụ</td>\n            <td><code>Type=notify</code></td>\n            <td><code>Type=exec</code></td>\n            <td><code>notify</code> gửi tín hiệu thông báo khi app đã sẵn sàng tiếp nhận request</td>\n          </tr>\n          <tr>\n            <td><code>Restart=always</code></td>\n            <td>Tự động phục hồi khi tiến trình gặp sự cố chết</td>\n            <td><code>Restart=on-failure</code></td>\n            <td><code>RestartSec=5s</code></td>\n            <td>Tránh Restart loops bằng cách kết hợp <code>StartLimitIntervalSec</code></td>\n          </tr>\n          <tr>\n            <td><code>ProtectSystem=strict</code></td>\n            <td>Bật chế độ chỉ đọc (Read-Only) cho hệ thống file</td>\n            <td><code>ProtectSystem=strict</code></td>\n            <td><code>ReadWritePaths=/var/log/app</code></td>\n            <td>Cách ly tuyệt đối <code>/usr</code>, <code>/boot</code>, <code>/etc</code> khỏi mã độc</td>\n          </tr>\n          <tr>\n            <td><code>systemctl edit</code></td>\n            <td>Tạo Drop-in Override ghi đè cấu hình an toàn</td>\n            <td><code>systemctl edit &lt;unit&gt;</code></td>\n            <td><code>sudo systemctl edit nginx</code></td>\n            <td>Không sửa trực tiếp file gốc trong <code>/lib/systemd/system/</code></td>\n          </tr>\n          <tr>\n            <td><code>systemctl list-timers</code></td>\n            <td>Liệt kê danh sách tất cả Timer Unit đang kích hoạt</td>\n            <td><code>systemctl list-timers --all</code></td>\n            <td><code>systemctl list-timers</code></td>\n            <td>Hiển thị mốc NEXT (thời gian tới) và LAST (lần chạy trước)</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-3-1-service-file",
          "title": "4.1 Tệp Service Unit chuẩn công nghiệp & Cơ chế Sandbox Bảo mật",
          "content": "\n        <p>Trong môi trường production, chạy ứng dụng Python qua <code>nohup python main.py &amp;</code> hoặc <code>screen/tmux</code> là điều cấm kỵ vì thiếu khả năng tự phục hồi khi crash, không có giới hạn tài nguyên và không thể kiểm soát vòng đời tiến trình. <strong>systemd</strong> (PID 1) là hệ thống init và quản lý dịch vụ chuẩn mực trên hầu hết các bản phân phối Linux hiện đại (Debian, Ubuntu, RHEL, CentOS, Rocky Linux, Fedora, Arch Linux).</p>\n        \n        <p>Vị trí các tệp Unit trong hệ thống được phân cấp theo độ ưu tiên rõ ràng:</p>\n        <ul>\n          <li><code>/lib/systemd/system/</code> hoặc <code>/usr/lib/systemd/system/</code>: Do các gói phần mềm cài đặt (apt, dnf) tạo ra. Không bao giờ sửa trực tiếp file trong thư mục này vì sẽ bị ghi đè khi cập nhật gói.</li>\n          <li><code>/run/systemd/system/</code>: Các Unit động sinh ra lúc runtime trong bộ nhớ RAM (mất khi reboot).</li>\n          <li><code>/etc/systemd/system/</code>: <strong>Nơi quản trị viên hệ thống đặt các file dịch vụ tự tạo hoặc ghi đè</strong>. Thư mục này có độ ưu tiên cao nhất!</li>\n        </ul>\n\n        <h3 class=\"lx-h3\">Bảng phân tích các chỉ thị cốt lõi trong Service Unit</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Chỉ thị</th>\n              <th>Khối (Section)</th>\n              <th>Mục đích</th>\n              <th>Giá trị khuyến nghị Production</th>\n              <th>Lưu ý an toàn</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>Description</code></td>\n              <td>[Unit]</td>\n              <td>Mô tả ngắn gọn mục đích dịch vụ</td>\n              <td><code>FastAPI Order Processing Service</code></td>\n              <td>Giúp nhận diện dịch vụ trong log và status.</td>\n            </tr>\n            <tr>\n              <td><code>After</code> / <code>Requires</code></td>\n              <td>[Unit]</td>\n              <td>Quy định thứ tự và phụ thuộc</td>\n              <td><code>After=network.target postgresql.service</code></td>\n              <td><code>Requires</code> làm dịch vụ sập nếu dịch vụ phụ thuộc sập; <code>Wants</code> an toàn hơn (chỉ cố gắng start).</td>\n            </tr>\n            <tr>\n              <td><code>Type</code></td>\n              <td>[Service]</td>\n              <td>Kiểu tiến trình dịch vụ</td>\n              <td><code>exec</code> (hoặc <code>simple</code> / <code>notify</code>)</td>\n              <td><code>exec</code> đợi tiến trình chính exec thành công mới báo active, tránh race condition.</td>\n            </tr>\n            <tr>\n              <td><code>User</code> / <code>Group</code></td>\n              <td>[Service]</td>\n              <td>Chạy dịch vụ dưới danh tính tối thiểu</td>\n              <td><code>appuser</code> / <code>appuser</code></td>\n              <td><strong>Cấm chạy dịch vụ web bằng quyền root!</strong> Tuân thủ CIS Linux Benchmark.</td>\n            </tr>\n            <tr>\n              <td><code>Restart</code></td>\n              <td>[Service]</td>\n              <td>Chính sách tự phục hồi khi chết</td>\n              <td><code>on-failure</code> hoặc <code>always</code></td>\n              <td><code>on-failure</code> chỉ restart khi thoát với mã lỗi khác 0 hoặc dính tín hiệu (SIGSEGV, SIGABRT).</td>\n            </tr>\n            <tr>\n              <td><code>ProtectSystem</code></td>\n              <td>[Service]</td>\n              <td>Sandbox bảo vệ hệ thống file</td>\n              <td><code>strict</code> hoặc <code>full</code></td>\n              <td><code>strict</code> biến toàn bộ hệ thống file thành Read-Only, chỉ cho phép ghi vào thư mục chỉ định qua <code>ReadWritePaths=</code>.</td>\n            </tr>\n            <tr>\n              <td><code>PrivateTmp</code></td>\n              <td>[Service]</td>\n              <td>Cô lập thư mục tạm /tmp</td>\n              <td><code>yes</code></td>\n              <td>Tạo một namespace /tmp riêng biệt, ngăn chặn tiến trình đọc trộm dữ liệu /tmp của dịch vụ khác.</td>\n            </tr>\n            <tr>\n              <td><code>NoNewPrivileges</code></td>\n              <td>[Service]</td>\n              <td>Chống leo thang đặc quyền</td>\n              <td><code>yes</code></td>\n              <td>Ngăn tiến trình con thực thi các file SUID/SGID để chiếm quyền root.</td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": [
            {
              "title": "Tệp Service Unit /etc/systemd/system/fastapi_app.service gia cố bảo mật",
              "lang": "ini",
              "code": "# /etc/systemd/system/fastapi_app.service\n[Unit]\nDescription=FastAPI Production Backend Service\nAfter=network.target\nWants=network.target\n\n[Service]\nType=exec\nUser=appuser\nGroup=appuser\nWorkingDirectory=/opt/fastapi_app\nEnvironmentFile=/opt/fastapi_app/.env\nExecStart=/opt/fastapi_app/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000 --workers 4\nExecReload=/bin/kill -s HUP $MAINPID\n\n# Chính sách tự phục hồi khi sập\nRestart=on-failure\nRestartSec=5s\nStartLimitIntervalSec=60s\nStartLimitBurst=3\n\n# Sandbox gia cố bảo mật chuẩn CIS Benchmark & NIST SP 800-53\nNoNewPrivileges=yes\nProtectSystem=strict\nProtectHome=yes\nPrivateTmp=yes\nReadWritePaths=/opt/fastapi_app/logs /opt/fastapi_app/media\nCapabilityBoundingSet=\nMemoryMax=1G\nCPUQuota=150%\n\n[Install]\nWantedBy=multi-user.target",
              "output": "# Kiểm tra cú pháp tệp unit bằng systemd-analyze:\n$ sudo systemd-analyze verify /etc/systemd/system/fastapi_app.service\n(Không có thông báo lỗi nào xuất hiện = Cú pháp chuẩn xác 100%)\n\n# Nạp lại cấu hình và khởi động:\n$ sudo systemctl daemon-reload\n$ sudo systemctl enable --now fastapi_app.service\nCreated symlink /etc/systemd/system/multi-user.target.wants/fastapi_app.service → /etc/systemd/system/fastapi_app.service.\n\n$ sudo systemctl status fastapi_app.service\n● fastapi_app.service - FastAPI Production Backend Service\n     Loaded: loaded (/etc/systemd/system/fastapi_app.service; enabled; preset: enabled)\n     Active: active (running) since Wed 2026-11-04 08:15:20 UTC; 4s ago\n   Main PID: 28415 (uvicorn)\n      Tasks: 5 (limit: 4614)\n     Memory: 84.2M (peak: 86.1M, max: 1.0G)\n        CPU: 420ms\n     CGroup: /system.slice/fastapi_app.service\n             ├─28415 /opt/fastapi_app/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000 --workers 4\n             ├─28417 /opt/fastapi_app/venv/bin/python3 -c from multiprocessing.resource_tracker import main...\n             ├─28418 /opt/fastapi_app/venv/bin/python3 -c from multiprocessing.spawn import spawn_main...\n             ├─28419 /opt/fastapi_app/venv/bin/python3 -c from multiprocessing.spawn import spawn_main...\n             └─28420 /opt/fastapi_app/venv/bin/python3 -c from multiprocessing.spawn import spawn_main...",
              "annotations": [
                {
                  "line": 13,
                  "text": "Type=exec đảm bảo systemd giám sát trực tiếp PID uvicorn và chỉ chuyển trạng thái active khi tiến trình đã sẵn sàng nhận kết nối."
                },
                {
                  "line": "19-21",
                  "text": "StartLimitBurst=3 ngăn chặn vòng lặp restart vô tận làm nghẽn CPU nếu code có lỗi cú pháp không thể khởi động được."
                },
                {
                  "line": "24-29",
                  "text": "ProtectSystem=strict kết hợp ReadWritePaths khóa chặt toàn bộ filesystem, hacker dù chèn mã độc vào app cũng không thể ghi đè file hệ thống."
                },
                {
                  "line": 30,
                  "text": "MemoryMax=1G áp dụng cgroups v2 để tự động ngắt tiến trình nếu bị rò rỉ bộ nhớ vượt trần 1GB, bảo vệ tài nguyên máy chủ."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-1-timer-unit",
          "title": "4.2 Thay thế Cron toàn diện bằng Timer Unit (OnCalendar & Persistent)",
          "content": "\n        <p>Mặc dù <code>cron</code> đã phục vụ thế giới Linux hàng chục năm, nhưng trong hạ tầng hiện đại, <strong>systemd Timer</strong> là sự thay thế vượt trội hoàn toàn nhờ 4 ưu điểm quyết định:</p>\n        <ol>\n          <li><strong>Bù phiên lỡ hẹn (<code>Persistent=true</code>):</strong> Nếu máy chủ bị tắt nguồn hoặc bảo trì đúng lúc cron job cần chạy (ví dụ 02:00 sáng), Cron sẽ bỏ qua vĩnh viễn phiên đó. Timer với <code>Persistent=true</code> sẽ nhận diện sự kiện bị lỡ và kích hoạt chạy ngay khi máy chủ khởi động lại!</li>\n          <li><strong>Ghi log tập trung có cấu trúc:</strong> Cron đẩy output qua mail cục bộ (thường bị bỏ quên) hoặc file log rời rạc. Timer gắn liền với Service Unit nên toàn bộ stdout/stderr được chuyển tự động vào <code>journald</code> kèm metadata thời gian chính xác tới microsecond.</li>\n          <li><strong>Quản lý độc lập và phụ thuộc:</strong> Bạn có thể kiểm tra trạng thái tiến trình chạy định kỳ bằng <code>systemctl status</code>, thiết lập giới hạn RAM/CPU, và chạy thử thủ công bất kỳ lúc nào bằng <code>systemctl start [service-name]</code>.</li>\n          <li><strong>Độ trễ ngẫu nhiên chống quá tải (<code>RandomizedDelaySec</code>):</strong> Khi có hàng trăm container/máy chủ cùng chạy backup vào 02:00, RandomizedDelaySec phân tán thời điểm kích hoạt ngẫu nhiên để tránh làm sập Storage Network.</li>\n        </ol>\n\n        <h3 class=\"lx-h3\">Cú pháp biểu thức OnCalendar chuẩn mực</h3>\n        <p>Cú pháp lịch biểu của systemd có dạng: <code>Thứ_trong_tuần Năm-Tháng-Ngày Giờ:Phút:Giây</code> (ví dụ: <code>Mon..Fri *-*-* 03:30:00</code> chạy 03:30 từ Thứ Hai đến Thứ Sáu). Bạn có thể kiểm tra tính hợp lệ của bất kỳ biểu thức lịch biểu nào bằng lệnh <code>systemd-analyze calendar \"cú_pháp\"</code>.</p>\n      ",
          "codeExamples": [
            {
              "title": "Cặp tệp sao lưu tự động /etc/systemd/system/backup_db.{service,timer}",
              "lang": "ini",
              "code": "# 1. Tệp Service thực thi: /etc/systemd/system/backup_db.service\n[Unit]\nDescription=Database Daily Backup Job\nAfter=network.target postgresql.service\n\n[Service]\nType=oneshot\nUser=postgres\nExecStart=/usr/local/bin/backup_postgres.sh\nStandardOutput=journal\nStandardError=journal\n\n---\n# 2. Tệp Timer điều phối thời gian: /etc/systemd/system/backup_db.timer\n[Unit]\nDescription=Trigger Database Daily Backup at 02:30 AM\nRequires=backup_db.service\n\n[Timer]\n# Chạy lúc 02:30 sáng mỗi ngày\nOnCalendar=*-*-* 02:30:00\n# Bù phiên chạy ngay lập tức nếu máy chủ bị tắt vào thời điểm 02:30\nPersistent=true\n# Độ chính xác kích hoạt trong vòng 1 giây\nAccuracySec=1s\n# Phân tán ngẫu nhiên tối đa 5 phút để tránh nghẽn I/O đồng loạt\nRandomizedDelaySec=5m\n\n[Install]\nWantedBy=timers.target",
              "output": "# Kiểm tra tính hợp lệ của biểu thức lịch biểu OnCalendar:\n$ systemd-analyze calendar \"*-*-* 02:30:00\"\n  Normalized form: *-*-* 02:30:00\n    Next elapse: Thu 2026-11-05 02:30:00 UTC\n       From now: 18h left\n\n# Kích hoạt và theo dõi Timer:\n$ sudo systemctl daemon-reload\n$ sudo systemctl enable --now backup_db.timer\nCreated symlink /etc/systemd/system/timers.target.wants/backup_db.timer → /etc/systemd/system/backup_db.timer.\n\n$ systemctl list-timers backup_db.timer\nNEXT                         LEFT          LAST PASSED UNIT             ACTIVATES\nThu 2026-11-05 02:33:14 UTC  18h left      n/a  n/a    backup_db.timer  backup_db.service\n\n1 timers listed.",
              "annotations": [
                {
                  "part": "Tệp Service có Type=oneshot",
                  "text": "Thích hợp cho các tiến trình chạy xong rồi thoát, systemd sẽ đợi tiến trình kết thúc hoàn toàn."
                },
                {
                  "part": "Tệp Timer KHÔNG cần khai báo ExecStart",
                  "text": "Nó tự động liên kết với tệp .service có cùng tên cơ sở (backup_db)."
                },
                {
                  "part": "Giải thích",
                  "text": "Lệnh systemctl list-timers hiển thị thời điểm chạy tiếp theo (NEXT), thời gian còn lại (LEFT) và tệp Service sẽ được kích hoạt."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-1-cli-workflow",
          "title": "4.3 Quy trình Vận hành, Ghi đè (Drop-in Override) & Xử lý Trạng thái Lỗi",
          "content": "\n        <p>Trong vận hành thực tế, khi cần thay đổi biến môi trường, tham số khởi động hoặc tài nguyên của một dịch vụ hệ thống (như Nginx, Docker, PostgreSQL), <strong>không bao giờ sửa trực tiếp tệp gốc trong <code>/lib/systemd/system/</code></strong> vì các bản cập nhật package từ nhà phát triển sẽ đè mất cấu hình của bạn.</p>\n\n        <p>Thay vào đó, chuẩn mực công nghiệp là sử dụng <strong>Drop-in Override Files</strong>. Lệnh <code>sudo systemctl edit [service-name]</code> sẽ tự động tạo thư mục <code>/etc/systemd/system/[service-name].service.d/override.conf</code>. systemd sẽ nạp file gốc trước, sau đó nạp file override đè lên, bảo toàn hoàn hảo các tùy biến của bạn qua mọi lần nâng cấp hệ điều hành.</p>\n\n        <h3 class=\"lx-h3\">Bảng lệnh vận hành systemd thiết yếu</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Lệnh</th>\n              <th>Mục đích</th>\n              <th>Khi nào nên dùng</th>\n              <th>Lưu ý an toàn</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>sudo systemctl daemon-reload</code></td>\n              <td>Tải lại cấu hình tất cả các file unit từ đĩa vào bộ nhớ</td>\n              <td>Bắt buộc sau MỌI thay đổi đối với tệp .service hoặc .timer</td>\n              <td>Không làm khởi động lại dịch vụ đang chạy; chỉ cập nhật định nghĩa trong RAM.</td>\n            </tr>\n            <tr>\n              <td><code>sudo systemctl edit [unit]</code></td>\n              <td>Tạo hoặc chỉnh sửa tệp drop-in override</td>\n              <td>Khi muốn tăng giới hạn file (LimitNOFILE), đổi biến môi trường</td>\n              <td>Để xóa một chỉ thị dạng danh sách (ví dụ ExecStart), cần gán giá trị rỗng trước: <code>ExecStart=</code> rồi mới ghi dòng mới.</td>\n            </tr>\n            <tr>\n              <td><code>systemctl cat [unit]</code></td>\n              <td>In toàn bộ nội dung tệp unit gốc kèm mọi file drop-in override</td>\n              <td>Khi cần điều tra cấu hình thực tế đang áp dụng của dịch vụ</td>\n              <td>Rất nhanh và an toàn, không cần quyền root.</td>\n            </tr>\n            <tr>\n              <td><code>sudo systemctl reset-failed [unit]</code></td>\n              <td>Xóa trạng thái lỗi (failed) của dịch vụ</td>\n              <td>Khi dịch vụ đã được sửa lỗi nhưng vẫn hiển thị trạng thái đỏ 'failed'</td>\n              <td>Không tự động khởi động dịch vụ, chỉ xóa bộ đếm thất bại để cho phép restart lại.</td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": [
            {
              "title": "Tùy biến tăng giới hạn File Descriptor cho Nginx bằng Drop-in Override",
              "lang": "bash",
              "code": "# Mở trình soạn thảo drop-in override cho Nginx:\n# (Lệnh này tự động tạo file /etc/systemd/system/nginx.service.d/override.conf)\n$ sudo systemctl edit nginx\n\n# Nhập nội dung sau vào giữa 2 dòng chú thích:\n### Editing /etc/systemd/system/nginx.service.d/override.conf\n[Service]\nLimitNOFILE=65535\n\n# Lưu và thoát. systemd tự động chạy daemon-reload.\n# Kiểm tra lại toàn bộ cấu hình đã được gộp:\n$ systemctl cat nginx | tail -n 8\n# /etc/systemd/system/nginx.service.d/override.conf\n[Service]\nLimitNOFILE=65535\n\n# Tải lại dịch vụ để áp dụng:\n$ sudo systemctl restart nginx\n$ cat /proc/$(pgrep -f \"nginx: master\")/limits | grep \"Max open files\"\nMax open files            65535                65535                files",
              "output": "Max open files            65535                65535                files",
              "annotations": [
                {
                  "part": "Giải thích",
                  "text": "systemctl edit tạo thư mục override.conf cô lập, giữ nguyên vẹn file gốc /lib/systemd/system/nginx.service."
                },
                {
                  "part": "Giải thích",
                  "text": "LimitNOFILE=65535 nâng trần số lượng kết nối đồng thời mà Nginx có thể xử lý, phá bỏ giới hạn mặc định 1024 file."
                },
                {
                  "part": "Giải thích",
                  "text": "Lệnh kiểm tra /proc/[PID]/limits chứng minh tiến trình worker thực sự đã thừa hưởng giới hạn mới."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Tạo Service Unit có Sandbox và Timer Unit thay thế Cron</h4>\n      <p>Giảng viên xây dựng service unit chạy ứng dụng API với phân quyền tối thiểu và sandbox nghiêm ngặt:</p>\n      <pre><code># /etc/systemd/system/myapp.service\n[Unit]\nDescription=Backend API Service\nAfter=network.target\n\n[Service]\nType=simple\nUser=appuser\nGroup=appuser\nWorkingDirectory=/opt/myapp\nExecStart=/usr/bin/python3 /opt/myapp/main.py\nRestart=always\nRestartSec=5s\n\n# Khối cách ly Sandbox bảo mật\nProtectSystem=strict\nProtectHome=true\nPrivateTmp=true\nNoNewPrivileges=true\nReadWritePaths=/var/log/myapp\n\n[Install]\nWantedBy=multi-user.target</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Chạy dịch vụ cẩu thả dưới quyền root</div>\n          <pre><code>[Unit]\nDescription=My App\n\n[Service]\n# Nguy hiểm: Chạy quyền root mặc định,\n# không có restart, không có sandbox\nExecStart=/usr/bin/python3 /home/ubuntu/app.py</code></pre>\n          <p class=\"lx-diff-desc\">Nếu ứng dụng dính lỗ hổng bảo mật, tin tặc chiếm trọn quyền root toàn bộ máy chủ; khi ứng dụng crash sẽ không thể tự hồi phục.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Chuẩn Production với User riêng & Sandbox</div>\n          <pre><code>[Service]\nUser=appuser\nDynamicUser=yes\nProtectSystem=strict\nProtectHome=true\nNoNewPrivileges=true\nRestart=on-failure\nRestartSec=3s\nExecStart=/usr/bin/python3 /opt/app/main.py</code></pre>\n          <p class=\"lx-diff-desc\">Chạy với người dùng động hoặc chuyên biệt, tự động hồi sinh khi crash, khóa cứng các phân vùng hệ thống ở chế độ chỉ đọc.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Đóng gói Service Unit & Lập lịch với Timer Unit",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.1</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Viết một script Python đơn giản, đóng gói thành systemd Service Unit có sandbox bảo vệ, sau đó tạo một Timer Unit kích hoạt định kỳ mỗi 10 phút thay thế crontab.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Linux có systemd và quyền sudo.</li>\n        <li>Tạo thư mục: <code>sudo mkdir -p /opt/systemd-lab && sudo chown $USER:$USER /opt/systemd-lab</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Tạo script kiểm tra sức khỏe hệ thống <code>/opt/systemd-lab/health.py</code>:\n          <pre><code>cat &lt;&lt; 'EOF' > /opt/systemd-lab/health.py\nimport datetime, os\nlog_line = f\"{datetime.datetime.now().isoformat()} - System Health Check OK (PID: {os.getpid()})\\n\"\nwith open(\"/tmp/systemd_health.log\", \"a\") as f:\n    f.write(log_line)\nprint(\"Health check completed successfully.\")\nEOF</code></pre>\n        </li>\n        <li>Tạo file Service Unit <code>/etc/systemd/system/health-check.service</code>:\n          <pre><code>sudo bash -c 'cat &lt;&lt; \"EOF\" > /etc/systemd/system/health-check.service\n[Unit]\nDescription=System Health Check Task\nAfter=network.target\n\n[Service]\nType=oneshot\nUser=nobody\nExecStart=/usr/bin/python3 /opt/systemd-lab/health.py\nNoNewPrivileges=true\nEOF'</code></pre>\n        </li>\n        <li>Tạo file Timer Unit <code>/etc/systemd/system/health-check.timer</code>:\n          <pre><code>sudo bash -c 'cat &lt;&lt; \"EOF\" > /etc/systemd/system/health-check.timer\n[Unit]\nDescription=Runs Health Check every 10 minutes\n\n[Timer]\nOnCalendar=*:0/10\nPersistent=true\n\n[Install]\nWantedBy=timers.target\nEOF'</code></pre>\n        </li>\n        <li>Kích hoạt và kiểm tra trạng thái timer:\n          <pre><code>sudo systemctl daemon-reload\nsudo systemctl enable --now health-check.timer\nsystemctl list-timers | grep health-check</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Lệnh <code>systemctl list-timers</code> hiển thị <code>health-check.timer</code> với mốc NEXT đếm ngược chuẩn xác; file <code>/tmp/systemd_health.log</code> được ghi dòng trạng thái sau khi timer kích hoạt.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Sử dụng <code>systemctl edit health-check.service</code> để tạo Drop-in Override bổ sung chỉ thị <code>Environment=\"ENV=production\"</code> và kiểm tra file ghi đè tại <code>/etc/systemd/system/health-check.service.d/override.conf</code>.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Luôn chạy <code>sudo systemctl daemon-reload</code> sau khi tạo hoặc sửa bất kỳ unit file nào. Nếu không, systemd sẽ tiếp tục dùng cấu hình cũ trong bộ nhớ cache và gây hành vi sai lệch!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Dịch vụ rơi vào trạng thái <code>CrashLoopBackOff</code> (Start-limit-hit)</strong></td><td>Dịch vụ bị lỗi crash liên tục nhiều lần trong khoảng thời gian ngắn (mặc định 5 lần trong 10 giây), systemd tự động ngắt không cho restart tiếp để tránh làm nghẽn CPU.</td><td>Đọc log chi tiết bằng <code>journalctl -u &lt;service&gt; -e --no-pager</code> để sửa lỗi code, sau đó reset trạng thái lỗi bằng <code>sudo systemctl reset-failed &lt;service&gt;</code>.</td></tr>\n          <tr><td><strong>Timer Unit không kích hoạt Service tương ứng</strong></td><td>Tên file Timer và Service không đồng bộ (ví dụ <code>backup.timer</code> sẽ tự động tìm <code>backup.service</code>). Nếu tên service khác biệt, phải khai báo chỉ thị <code>Unit=tên_khác.service</code> bên trong khối <code>[Timer]</code>.</td><td>Đặt tên file <code>.timer</code> trùng hoàn toàn với file <code>.service</code>.</td></tr>\n          <tr><td><strong>Ứng dụng báo <code>Permission denied</code> dù file thuộc quyền sở hữu của User service</strong></td><td>Cấu hình sandbox bảo mật <code>ProtectSystem=strict</code> hoặc <code>ProtectHome=true</code> đã khóa các thư mục đó ở chế độ Read-Only.</td><td>Thêm đường dẫn ghi hợp lệ vào danh sách ngoại lệ bằng chỉ thị: <code>ReadWritePaths=/duong/dan/can/ghi</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Luôn bật <code>NoNewPrivileges=true</code> cho mọi service:</strong> Chỉ thị này ngăn chặn hoàn toàn việc tiến trình con leo thang đặc quyền thông qua các binary có cờ SUID/SGID.</li>\n        <li><strong>Sử dụng <code>DynamicUser=yes</code> cho các microservice phi trạng thái:</strong> systemd sẽ tự động cấp một User/Group ID tạm thời trong lúc chạy và giải phóng ngay khi dịch vụ dừng, không để lại dấu vết tài khoản trong <code>/etc/passwd</code>.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>systemd.service Man Page:</strong> <code>man 5 systemd.service</code> - Tài liệu đặc tả kỹ thuật chi tiết.</li>\n      <li><strong>systemd.timer Reference:</strong> <a href=\"https://www.freedesktop.org/software/systemd/man/systemd.timer.html\" target=\"_blank\" rel=\"noopener\">Freedesktop systemd Timer Documentation</a>.</li>\n      <li><strong>Red Hat Enterprise Linux 9:</strong> Managing System Services with systemd.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Quy đổi Cú pháp Thời gian OnCalendar",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Biểu thức OnCalendar</th><th>Tương đương Cron</th><th>Diễn giải</th></tr></thead>\n        <tbody>\n          <tr><td><code>minutely</code></td><td><code>* * * * *</code></td><td>Chạy mỗi phút</td></tr>\n          <tr><td><code>hourly</code></td><td><code>0 * * * *</code></td><td>Chạy vào đầu mỗi giờ</td></tr>\n          <tr><td><code>daily</code></td><td><code>0 0 * * *</code></td><td>Chạy vào lúc 00:00 mỗi ngày</td></tr>\n          <tr><td><code>Mon..Fri *-*-* 09:00:00</code></td><td><code>0 9 * * 1-5</code></td><td>Lúc 9h sáng các ngày trong tuần</td></tr>\n          <tr><td><code>*-*-01 02:00:00</code></td><td><code>0 2 1 * *</code></td><td>Lúc 2h sáng ngày đầu tiên của tháng</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Ứng dụng Python Worker bị lỗi kết nối Database làm sập tiến trình liên tục vào ban đêm",
        "content": "\n      <p><strong>1. Triệu chứng sự cố:</strong> Vào lúc 03:15 sáng, hệ thống cảnh báo Prometheus gửi tin nhắn khẩn cấp: Hàng đợi xử lý đơn hàng (Celery / Python Worker) bị ứ đọng hoàn toàn. Kỹ sư trực ca đăng nhập SSH kiểm tra thì phát hiện tiến trình worker đã biến mất khỏi hệ thống. Khi chạy <code>systemctl status order-worker</code>, dịch vụ báo đỏ với trạng thái <code>failed (Result: exit-code)</code>.</p>\n      \n      <p><strong>2. Điều tra & Chẩn đoán:</strong></p>\n      <pre><code>$ journalctl -u order-worker.service --since \"03:10:00\" -p err\nNov 04 03:12:45 srv-prod order-worker[14201]: psycopg2.OperationalError: could not connect to server: Connection refused\nNov 04 03:12:45 srv-prod systemd[1]: order-worker.service: Main process exited, code=exited, status=1/FAILURE\nNov 04 03:12:45 srv-prod systemd[1]: order-worker.service: Failed with result 'exit-code'.</code></pre>\n      <p>Log hệ thống chỉ rõ cơ sở dữ liệu PostgreSQL thực hiện sao lưu định kỳ lúc 03:12 khiến kết nối bị ngắt tạm thời trong 15 giây. Ứng dụng Python gặp ngoại lệ không bắt được (unhandled exception) nên ném mã thoát 1 và chết ngắt.</p>\n      \n      <p><strong>3. Nguyên nhân gốc rễ:</strong> Tệp <code>order-worker.service</code> ban đầu do lập trình viên cấu hình thiếu chỉ thị <code>Restart=</code>. Mặc định của systemd là <code>Restart=no</code>, nghĩa là một khi tiến trình thoát ra ngoài (dù do lỗi mạng tạm thời), systemd sẽ không bao giờ tự động khởi động lại nó.</p>\n      \n      <p><strong>4. Biện pháp khắc phục:</strong> Chỉnh sửa cấu hình dịch vụ, bổ sung cơ chế tự phục hồi linh hoạt:</p>\n      <pre><code>$ sudo systemctl edit order-worker.service\n\n# Thêm nội dung cấu hình phục hồi:\n[Service]\nRestart=on-failure\nRestartSec=10s\nStartLimitIntervalSec=120s\nStartLimitBurst=5\n\n$ sudo systemctl daemon-reload\n$ sudo systemctl start order-worker.service</code></pre>\n      <p>Dịch vụ lập tức hồi sinh, kết nối thành công tới Database và dọn sạch hàng nghìn đơn hàng đang tồn đọng trong 3 phút.</p>\n      \n      <p><strong>5. Phòng ngừa lâu dài:</strong> Áp dụng chuẩn kiểm thử <code>systemd-analyze verify</code> và quy định mọi Service Unit chạy trong môi trường production đều bắt buộc phải có <code>Restart=on-failure</code> kèm <code>RestartSec</code> và ngưỡng <code>StartLimitBurst</code> để tự vượt qua các đợt đứt gãy mạng nhất thời.</p>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Cấm dùng ký tự đại diện (*, ~) và đường dẫn tương đối trong ExecStart",
            "content": "systemd KHÔNG thực thi lệnh thông qua Shell (Bash/Sh) mặc định! Nếu bạn viết <code>ExecStart=python ~/app/main.py</code> hoặc <code>ExecStart=source venv/bin/activate &amp;&amp; python main.py</code>, dịch vụ sẽ báo lỗi <em>'Failed to execute command: No such file or directory'</em>. Bắt buộc phải viết đường dẫn tuyệt đối đầy đủ tới trình thông dịch và tệp mã nguồn: <code>ExecStart=/opt/app/venv/bin/python /opt/app/main.py</code>. Nếu bắt buộc cần tính năng shell (như pipe | hay chuyển hướng >), phải gọi tường minh qua shell: <code>ExecStart=/bin/bash -c '...'</code>."
          },
          {
            "title": "Vòng lặp khởi động lại vô tận làm treo máy chủ (Start Loop Crashing)",
            "content": "Nếu mã nguồn ứng dụng bị lỗi cú pháp nghiêm trọng (SyntaxError) hoặc sai chuỗi kết nối Database, cấu hình <code>Restart=always</code> với <code>RestartSec=0</code> sẽ khiến systemd khởi động lại tiến trình hàng nghìn lần mỗi giây! Hậu quả là CPU chạm trần 100% và file log ngập tràn rác. Luôn luôn cấu hình <code>StartLimitIntervalSec=60s</code> và <code>StartLimitBurst=5</code> (nếu thử khởi động lại 5 lần trong 60 giây đều thất bại thì dừng lại và đánh dấu failed để bảo vệ CPU)."
          }
        ],
        "tips": [
          {
            "title": "Dùng systemctl edit thay vì sửa trực tiếp file gốc của hệ thống",
            "content": "Khi muốn tinh chỉnh bất kỳ dịch vụ nào do apt/dnf quản lý (như sshd, nginx, docker, redis), hãy chạy <code>sudo systemctl edit [service]</code>. systemd sẽ tạo tệp drop-in override tại <code>/etc/systemd/system/[service].service.d/override.conf</code>. Mọi chỉnh sửa của bạn được lưu trữ an toàn và không bao giờ bị mất đi khi nâng cấp gói phần mềm hệ điều hành."
          },
          {
            "title": "Chấm điểm rủi ro an ninh với systemd-analyze security",
            "content": "Linux cung cấp công cụ tự động kiểm định an ninh cực mạnh: <code>systemd-analyze security [service-name]</code>. Lệnh này sẽ chấm điểm độ an toàn từ 0 (cực kỳ an toàn) đến 10 (rất nguy hiểm) kèm danh sách khuyến nghị chi tiết (ví dụ thiếu <code>PrivateTmp</code>, <code>ProtectSystem</code>, hay <code>NoNewPrivileges</code>). Đây là vũ khí đắc lực để vượt qua các đợt kiểm toán bảo mật chuẩn CIS Benchmark."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Phân biệt hành vi Restart=on-failure và Restart=always trong systemd",
          "problem": "Phân biệt sự khác nhau giữa Restart=on-failure và Restart=always trong file cấu hình .service của systemd. Khi nào nên dùng loại nào cho ứng dụng Python/Node.js?",
          "hint": "Xem xét trường hợp tiến trình thoát với mã 0 (chủ động dừng) so với mã khác 0 (crash hoặc bị kill do lỗi).",
          "solutionCode": "# Trong khối [Service]:\nRestart=on-failure\nRestartSec=5s",
          "solutionOutput": "# Dịch vụ sẽ tự khởi động lại sau 5s khi bị crash (exit code != 0)\n# Không khởi động lại nếu quản trị viên chủ động chạy systemctl stop",
          "explanation": "Restart=on-failure chỉ khởi động lại khi tiến trình kết thúc bất thường (exit code != 0 hoặc bị signal kill). Restart=always khởi động lại trong mọi trường hợp, ngay cả khi quản trị viên chủ động dừng hoặc tiến trình hoàn tất thành công với mã 0.",
          "annotations": [
            {
              "part": "Restart=on-failure",
              "text": "Khuyến nghị hàng đầu cho ứng dụng web/API, tránh vòng lặp khởi động khi chủ động bảo trì."
            }
          ],
          "rubric": [
            {
              "criterion": "Phân tích cơ chế",
              "pass": "Phân biệt được exit code 0 và khác 0",
              "excellent": "Giải thích được tác động khi quản trị viên chạy systemctl stop",
              "weight": "50%"
            },
            {
              "criterion": "Thực tiễn sản xuất",
              "pass": "Nêu được khuyến nghị cho web service",
              "excellent": "Kết hợp thêm cấu hình RestartSec để tránh nghẽn CPU",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Xây dựng Timer Unit chạy định kỳ 15 phút với systemd",
          "problem": "Viết một Timer Unit có tên backup-db.timer kích hoạt backup-db.service mỗi 15 phút một lần, tính từ thời điểm máy chủ khởi động xong và giữa các phiên chạy liên tiếp.",
          "hint": "Sử dụng OnBootSec=5min và OnUnitActiveSec=15min trong khối [Timer].",
          "solutionCode": "# /etc/systemd/system/backup-db.timer\n[Unit]\nDescription=Run DB Backup every 15 minutes\n\n[Timer]\nOnBootSec=5min\nOnUnitActiveSec=15min\nPersistent=true\n\n[Install]\nWantedBy=timers.target",
          "solutionOutput": "# Kích hoạt timer:\nsudo systemctl daemon-reload\nsudo systemctl enable --now backup-db.timer\nsystemctl list-timers backup-db.timer",
          "explanation": "OnBootSec thiết lập độ trễ kích hoạt lần đầu sau khi hệ thống boot. OnUnitActiveSec kích hoạt định kỳ tính từ thời điểm lần chạy trước đó hoàn thành. Persistent=true đảm bảo tác vụ sẽ chạy ngay nếu máy chủ bị tắt trong thời gian lịch trình.",
          "annotations": [
            {
              "part": "OnUnitActiveSec=15min",
              "text": "Khoảng cách giữa các phiên chạy, tránh chồng chéo tác vụ nặng."
            },
            {
              "part": "Persistent=true",
              "text": "Kích hoạt ngay lần chạy bị bỏ lỡ khi máy chủ bật trở lại."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp Timer Unit",
              "pass": "Viết đúng khối [Timer]",
              "excellent": "Sử dụng đủ OnBootSec, OnUnitActiveSec và Persistent",
              "weight": "50%"
            },
            {
              "criterion": "Kích hoạt dịch vụ",
              "pass": "Nêu được lệnh enable/start",
              "excellent": "Biết dùng systemctl list-timers để xác minh thời gian kế tiếp",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Xử lý sự cố dịch vụ crash lặp vô tận (StartLimitBurst)",
          "problem": "Một dịch vụ Python bị crash liên tục và rơi vào trạng thái failed với thông báo start-limit-hit. Hãy phân tích nguyên nhân và viết cách cấu hình StartLimitIntervalSec, StartLimitBurst an toàn.",
          "hint": "systemd có cơ chế tự động bảo vệ hệ thống khỏi nghẽn CPU nếu một dịch vụ crash liên tiếp vượt ngưỡng trong một khoảng thời gian.",
          "solutionCode": "# Trong khối [Unit]:\nStartLimitIntervalSec=300\nStartLimitBurst=5\n\n# Trong khối [Service]:\nRestart=on-failure\nRestartSec=10s\n\n# Khi bị khóa, gỡ bằng lệnh:\nsudo systemctl reset-failed my-service.service\nsudo systemctl restart my-service.service",
          "solutionOutput": "# Dịch vụ được reset trạng thái lỗi và khởi động lại bình thường",
          "explanation": "systemd bảo vệ hệ thống bằng cách dừng thử lại nếu dịch vụ khởi động thất bại quá StartLimitBurst lần (mặc định 5 lần) trong StartLimitIntervalSec giây (mặc định 10s). Lệnh reset-failed xóa bỏ bộ đếm lỗi để cho phép thử lại.",
          "annotations": [
            {
              "part": "StartLimitIntervalSec / Burst",
              "text": "Cơ chế Rate Limiting chống vòng lặp crash làm cạn kiệt tài nguyên máy chủ."
            }
          ],
          "rubric": [
            {
              "criterion": "Phân tích lỗi",
              "pass": "Xác định được nguyên nhân start-limit-hit",
              "excellent": "Hiểu rõ cơ chế bảo vệ của systemd đối với CPU và I/O",
              "weight": "50%"
            },
            {
              "criterion": "Biện pháp khắc phục",
              "pass": "Dùng lệnh reset-failed",
              "excellent": "Điều chỉnh tham số Burst và Interval phù hợp với môi trường thực tế",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "systemd Service Unit gồm 3 phần chính: [Unit] (phụ thuộc), [Service] (lệnh chạy, quyền, sandbox), [Install] (target khởi động).",
        "Cơ chế Sandbox bảo mật của systemd (ProtectSystem=strict, ProtectHome=true, NoNewPrivileges=true) giúp cách ly dịch vụ ngay tại tầng init.",
        "Timer Unit là giải pháp thay thế Crontab vượt trội nhờ khả năng bám sát trạng thái mạng, ghi log tập trung và cơ chế Persistent bù giờ khi mất điện.",
        "Không bao giờ sửa trực tiếp file gốc trong /lib/systemd/system/; luôn dùng systemctl edit để tạo Drop-in Override an toàn.",
        "Khi dịch vụ bị treo hoặc crash liên tục, dùng systemctl reset-failed để xóa bộ đếm lỗi sau khi đã sửa xong mã nguồn."
      ],
      "generalInfo": {
        "duration": "55 phút",
        "targetAudience": "Senior Sysadmin, SRE, DevOps Engineer",
        "prerequisites": "Đã hoàn thành Cấp độ 2 (Bash script, cron, flock, quản lý tiến trình)",
        "environment": "Ubuntu 22.04 LTS / Debian 12 / Rocky Linux 9 (systemd v249+)",
        "materials": "Terminal Linux quyền sudo, trình soạn thảo vim/nano, kiến thức Linux cgroups"
      },
      "nextLessonPreview": "Trong Bài 3.2, chúng ta sẽ làm chủ công tác quản lý Log tập trung: cấu hình lưu trữ bền vững journald, truy vấn sự cố chuyên sâu và tối ưu hóa hệ thống xoay vòng logrotate.",
      "quiz": [
        {
          "question": "Chỉ thị nào trong khối [Service] của systemd Unit ngăn chặn tiến trình con tự ý nâng quyền thông qua SUID binary?",
          "options": [
            "NoNewPrivileges=true",
            "ProtectSystem=strict",
            "PrivateTmp=true",
            "DynamicUser=yes"
          ],
          "explanation": "NoNewPrivileges=true đảm bảo tiến trình và tất cả tiến trình con của nó không bao giờ có thể đạt được đặc quyền mới (như thông qua bit SUID).",
          "correctIndex": 0
        },
        {
          "question": "Khi tạo Timer Unit, chỉ thị 'Persistent=true' mang lại lợi ích gì?",
          "options": [
            "Làm timer chạy nhanh hơn",
            "Nếu máy chủ bị tắt nguồn vào đúng thời điểm hẹn giờ, timer sẽ tự động kích hoạt service ngay sau khi máy khởi động lại",
            "Giữ cho service chạy vĩnh viễn không bao giờ tắt",
            "Tự động lưu log vào cơ sở dữ liệu"
          ],
          "explanation": "Persistent=true lưu mốc thời gian kích hoạt cuối cùng xuống đĩa. Khi máy khởi động lại sau sự cố, systemd nhận biết lượt chạy bị lỡ và kích hoạt ngay lập tức.",
          "correctIndex": 1
        },
        {
          "question": "Khi chỉnh sửa nội dung của một tệp service tại `/etc/systemd/system/app.service`, lệnh nào bắt buộc phải thực thi trước khi gọi `systemctl restart app`?",
          "options": [
            "systemctl reboot",
            "systemctl daemon-reload",
            "systemctl flush-cache",
            "systemctl update-units"
          ],
          "correctIndex": 1,
          "explanation": "systemd lưu trữ sơ đồ phụ thuộc và định nghĩa unit trong RAM. Khi có bất kỳ tệp cấu hình nào trên đĩa thay đổi, bắt buộc phải chạy `systemctl daemon-reload` để systemd nạp lại cấu hình mới."
        }
      ],
      "reflectionQuestion": "Một kỹ sư bảo trì sửa đổi file `/lib/systemd/system/docker.service` để thêm cờ cấu hình mới. Sau khi hệ thống cập nhật gói `docker-ce` qua apt upgrade, toàn bộ cấu hình sửa đổi bị mất trắng và dịch vụ không thể khởi động. Hãy giải thích tại sao sự việc xảy ra và chỉ ra phương pháp chuẩn để cấu hình không bao giờ bị ghi đè.",
      "reflectionHint": "Gợi ý: Thư mục `/lib/systemd/system/` thuộc quyền quản lý của Package Manager, khi gói cập nhật nó sẽ ghi đè toàn bộ file. Phương pháp chuẩn: Sử dụng lệnh `sudo systemctl edit docker` để tạo file Drop-in Override tại `/etc/systemd/system/docker.service.d/override.conf`. Thư mục `/etc/` có độ ưu tiên cao hơn và không bao giờ bị package manager ghi đè."
    },
    {
      "id": "lx-3-02",
      "number": "3.2",
      "title": "Quản lý Log tập trung, Phân tích sự cố với journalctl & Tối ưu Logrotate",
      "subtitle": "Nắm vững kỹ thuật điều tra sự cố số 1 trên Linux: Truy vết nhật ký nhị phân journald, kiểm soát trần dung lượng và xoay vòng file log tự động",
      "level": "Nâng cao",
      "duration": "50 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nắm vững các cấp độ nghiêm trọng của Syslog (Emerg, Alert, Crit, Err, Warning, Notice, Info, Debug) và cấu trúc journald",
        "2. [Hiểu - Understand] Phân biệt rõ cơ chế log nhị phân dạng chỉ mục của journald vs log văn bản phẳng truyền thống",
        "3. [Vận dụng - Apply] Cấu hình lưu log bền vững (persistent storage) trong /etc/systemd/journald.conf và viết tệp cấu hình logrotate chuẩn",
        "4. [Phân tích - Analyze] Truy vấn vết sự cố nhanh chóng bằng các bộ lọc journalctl (--since, -p err, -u service, _UID, -k) và kiểm thử logrotate ở chế độ dry-run (-d)"
      ],
      "intuition": {
        "title": "Cuốn nhật ký chuyến bay số hóa journald và Người dọn rác logrotate",
        "overview": "Hệ thống nhật ký (Log) là nhân chứng duy nhất giúp bạn tái hiện hiện trường khi xảy ra sự cố. Bài học này làm chủ truy vấn log tốc độ cao với journalctl và xoay vòng bảo vệ đĩa với logrotate.",
        "realWorld": "Một máy chủ web bị quá tải vào lúc 03:15 sáng khiến toàn bộ dịch vụ ngưng trệ. Nhờ lệnh `journalctl -u nginx --since '03:10' --until '03:20' -p err`, kỹ sư chỉ mất 1 phút để phát hiện upstream backend timeout do cạn kiệt kết nối database pool.",
        "metaphor": "journald giống như một máy ghi dữ liệu hộp đen kỹ thuật số: mọi thông tin từ nhân kernel, tiến trình dịch vụ, quyền hạn người dùng đều được đánh chỉ mục thời gian siêu chính xác. Còn logrotate là nhân viên quản lý kho tài liệu: định kỳ gom sổ cũ đóng gói lại, nén nhỏ, và tiêu hủy hồ sơ quá hạn để kho không bị vỡ trận.",
        "boundary": "journald và logrotate quản trị log cục bộ trên từng máy chủ vật lý; trong các hệ thống phân tán quy mô lớn, log sẽ được đẩy về các trung tâm tập trung như Elasticsearch (ELK), Grafana Loki hoặc Datadog.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Hệ thống nhật ký (Log) là nhân chứng duy nhất giúp bạn tái hiện hiện trường khi xảy ra sự cố. Bài học này làm chủ truy vấn log tốc độ cao với journalctl và xoay vòng bảo vệ đĩa với logrotate.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>journalctl -u</code>:</strong> Lọc log theo Unit dịch vụ cụ thể</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>journalctl -p</code>:</strong> Lọc theo mức độ ưu tiên (Priority)</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>journalctl --vacuum-size</code>:</strong> Dọn dẹp log nhị phân để giải phóng đĩa</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một máy chủ web bị quá tải vào lúc 03:15 sáng khiến toàn bộ dịch vụ ngưng trệ. Nhờ lệnh <code>journalctl -u nginx --since '03:10' --until '03:20' -p err</code>, kỹ sư chỉ mất 1 phút để phát hiện upstream backend timeout do cạn kiệt kết nối database pool.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Tuyệt kỹ Điều tra Sự cố Bằng journalctl &amp; Cấu hình Bền vững journald</li><li><span class=\"lx-vs-bullet\">•</span> Cấu hình Xoay vòng Log chuẩn mực với Logrotate</li><li><span class=\"lx-vs-bullet\">•</span> Quy trình Kiểm thử Logrotate An toàn với Chế độ Dry-Run (-d)</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Quản trị Log",
          "content": "<p>Quản trị log hệ thống trên Linux hiện đại là sự phối hợp giữa <code>systemd-journald</code> và <code>logrotate</code>:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Lệnh / Cấu hình</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Ghi chú vận hành</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>journalctl -u</code></td>\n            <td>Lọc log theo Unit dịch vụ cụ thể</td>\n            <td><code>journalctl -u &lt;unit&gt; [-f] [-e]</code></td>\n            <td><code>journalctl -u nginx -f</code></td>\n            <td>Cờ <code>-f</code> (follow) bám sát log thời gian thực</td>\n          </tr>\n          <tr>\n            <td><code>journalctl -p</code></td>\n            <td>Lọc theo mức độ ưu tiên (Priority)</td>\n            <td><code>journalctl -p &lt;level&gt;</code></td>\n            <td><code>journalctl -p err..emerg</code></td>\n            <td>Lọc từ cấp độ Lỗi (3) đến Khẩn cấp (0)</td>\n          </tr>\n          <tr>\n            <td><code>journalctl --vacuum-size</code></td>\n            <td>Dọn dẹp log nhị phân để giải phóng đĩa</td>\n            <td><code>journalctl --vacuum-size=&lt;size&gt;</code></td>\n            <td><code>sudo journalctl --vacuum-size=500M</code></td>\n            <td>Giới hạn tổng dung lượng log journald trên đĩa</td>\n          </tr>\n          <tr>\n            <td><code>logrotate -d</code></td>\n            <td>Kiểm thử cú pháp cấu hình logrotate (Dry Run)</td>\n            <td><code>logrotate -d &lt;conf_file&gt;</code></td>\n            <td><code>sudo logrotate -d /etc/logrotate.d/nginx</code></td>\n            <td>Mô phỏng các bước xoay vòng mà không làm đổi file thật</td>\n          </tr>\n          <tr>\n            <td><code>postrotate</code></td>\n            <td>Chạy script sau khi đã xoay vòng xong log</td>\n            <td>Khối lệnh nằm giữa <code>postrotate ... endscript</code></td>\n            <td><code>systemctl reload nginx</code></td>\n            <td>Bắt buộc reload dịch vụ để mở lại file log mới</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-3-2-journalctl-advanced",
          "title": "4.1 Tuyệt kỹ Điều tra Sự cố Bằng journalctl & Cấu hình Bền vững journald",
          "content": "\n        <p><strong>journalctl</strong> là giao diện dòng lệnh mạnh mẽ để truy xuất dữ liệu từ nhật ký nhị phân của <code>systemd-journald</code>. Khác với các file log văn bản thuần túy (/var/log/syslog) dễ bị nghẽn I/O khi ghi khối lượng lớn, journald lập chỉ mục (indexing) theo thời gian, tiến trình PID, unit name và syslog priority, giúp việc tìm kiếm hàng triệu dòng log diễn ra chỉ trong vài phần trăm giây.</p>\n\n        <h3 class=\"lx-h3\">Bảng 8 mức độ ưu tiên (Log Priority) chuẩn RFC 5424 trong journald</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Cấp độ (Số)</th>\n              <th>Tên định danh</th>\n              <th>Ý nghĩa thực chiến</th>\n              <th>Ví dụ lệnh truy vết</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>0</strong> / <strong>1</strong></td>\n              <td><code>emerg</code> / <code>alert</code></td>\n              <td>Hệ thống không thể sử dụng được; cần can thiệp khẩn cấp tức thì (Kernel panic, hỏng phần cứng)</td>\n              <td><code>journalctl -p 0..1 -b</code></td>\n            </tr>\n            <tr>\n              <td><strong>2</strong> / <strong>3</strong></td>\n              <td><code>crit</code> / <code>err</code></td>\n              <td>Lỗi nghiêm trọng hoặc lỗi dịch vụ (Database crash, mất kết nối mạng, ném ngoại lệ)</td>\n              <td><code>journalctl -u fastapi_app -p err</code></td>\n            </tr>\n            <tr>\n              <td><strong>4</strong></td>\n              <td><code>warning</code></td>\n              <td>Cảnh báo tài nguyên sắp cạn kiệt, API deprecation, chứng chỉ SSL sắp hết hạn</td>\n              <td><code>journalctl -p warning --since yesterday</code></td>\n            </tr>\n            <tr>\n              <td><strong>5</strong> / <strong>6</strong></td>\n              <td><code>notice</code> / <code>info</code></td>\n              <td>Thông tin vận hành bình thường (Dịch vụ khởi động thành công, người dùng SSH login)</td>\n              <td><code>journalctl -u ssh.service -p info</code></td>\n            </tr>\n            <tr>\n              <td><strong>7</strong></td>\n              <td><code>debug</code></td>\n              <td>Thông tin gỡ lỗi chi tiết cho lập trình viên (rất tốn dung lượng nếu bật thường xuyên)</td>\n              <td><code>journalctl -u myapp -p debug</code></td>\n            </tr>\n          </tbody>\n        </table></div>\n\n        <h3 class=\"lx-h3\">Cấu hình Bền vững & Giới hạn Dung lượng trong /etc/systemd/journald.conf</h3>\n        <p>Mặc định trên một số bản phân phối, journald chỉ lưu log trên RAM (<code>/run/log/journal/</code>), nghĩa là khi reboot toàn bộ log lịch sử sẽ biến mất! Để lưu bền vững trên đĩa cứng và khống chế dung lượng không ăn mòn ổ đĩa, ta cần cấu hình tệp <code>/etc/systemd/journald.conf</code>:</p>\n        <ul>\n          <li><code>Storage=persistent</code>: Lưu log bền vững vào thư mục <code>/var/log/journal/</code>.</li>\n          <li><code>SystemMaxUse=1G</code>: Giới hạn tối đa journald chỉ được phép sử dụng 1GB trên ổ đĩa. Khi chạm trần, các bản ghi cũ nhất sẽ tự động bị xoay vòng và xóa bỏ.</li>\n          <li><code>SystemKeepFree=2G</code>: Đảm bảo journald luôn nhường lại ít nhất 2GB dung lượng trống cho hệ thống.</li>\n        </ul>\n      ",
          "codeExamples": [
            {
              "title": "Truy vết sự cố dịch vụ và Giới hạn dung lượng journald khẩn cấp",
              "lang": "bash",
              "code": "# 1. Xem dung lượng log journald hiện tại đang chiếm dụng trên đĩa:\n$ journalctl --disk-usage\nArchived and active journals take up 3.4G in the file system.\n\n# 2. Thu dọn khẩn cấp log cũ, chỉ giữ lại tối đa 500MB hoặc log trong 7 ngày gần nhất:\n$ sudo journalctl --vacuum-size=500M\nVacuuming done, freed 2.9G of archived journals from /var/log/journal/...\n\n# 3. Truy vết lỗi nghiêm trọng (-p err) của ứng dụng Python từ 02:00 sáng đến nay:\n$ journalctl -u fastapi_app.service -p err --since \"2026-11-04 02:00:00\" --no-pager\n\n# 4. Xem log của phiên boot hiện tại (-b) hoặc phiên boot trước đó (-b -1):\n$ journalctl -b -p err..emerg\n\n# 5. Theo dõi dòng log trực tiếp theo thời gian thực (-f) kết hợp định dạng JSON:\n$ journalctl -u fastapi_app.service -f -o json-pretty",
              "output": "Archived and active journals take up 3.4G in the file system.\nVacuuming done, freed 2.9G of archived journals from /var/log/journal/c9d09c31405b4853b0e3ec8ec494a87a.",
              "annotations": [
                {
                  "part": "journalctl --disk-usage",
                  "text": "Kiểm tra ngay tức thì dung lượng thực tế của nhật ký trên đĩa."
                },
                {
                  "part": "journalctl --vacuum-size=500M",
                  "text": "Lệnh cứu nguy cực kỳ hữu dụng khi phân vùng root (/) báo đầy 100%."
                },
                {
                  "part": "Giải thích",
                  "text": "Cờ -p err tương đương -p 3 (lọc toàn bộ log từ cấp độ 0 đến 3: emerg, alert, crit, err)."
                },
                {
                  "part": "Giải thích",
                  "text": "Cờ -b -1 giúp điều tra nguyên nhân tại sao máy chủ bị sập hoặc tự reboot ở lần khởi động trước đó."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-2-logrotate-config",
          "title": "4.2 Cấu hình Xoay vòng Log chuẩn mực với Logrotate",
          "content": "\n        <p>Các ứng dụng sinh log dạng tệp văn bản truyền thống (như Nginx tại <code>/var/log/nginx/access.log</code>, MySQL, PostgreSQL, hay ứng dụng Python ghi trực tiếp vào file) không tự động giới hạn kích thước file. Nếu không có cơ chế xoay vòng (rotation), chỉ sau vài tuần file log có thể phình to lên 50GB-100GB, làm tê liệt ổ đĩa hệ thống.</p>\n\n        <p><strong>Logrotate</strong> là tiện ích tiêu chuẩn quản lý vòng đời file log. Nó được kích hoạt định kỳ hàng ngày (thông qua <code>systemd timer: logrotate.timer</code> hoặc <code>/etc/cron.daily/logrotate</code>). Quản trị viên định cấu hình các chính sách xoay vòng bằng cách tạo tệp trong thư mục <code>/etc/logrotate.d/</code>.</p>\n\n        <h3 class=\"lx-h3\">So sánh Cơ chế: create + postrotate vs copytruncate</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Phương pháp</th>\n              <th>Nguyên lý hoạt động</th>\n              <th>Ưu điểm</th>\n              <th>Nhược điểm &amp; Rủi ro</th>\n              <th>Trường hợp áp dụng</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>create + postrotate</strong><br/><em>(Khuyên dùng số 1)</em></td>\n              <td>1. Đổi tên <code>app.log</code> thành <code>app.log.1</code>.<br/>2. Tạo file <code>app.log</code> mới với quyền sở hữu chỉ định.<br/>3. Chạy khối <code>postrotate</code> gửi tín hiệu reload (HUP/USR1) để ứng dụng mở lại file descriptor mới.</td>\n              <td><strong>Tuyệt đối không mất log.</strong> Hiệu năng đọc/ghi cao nhất vì không phải sao chép dữ liệu.</td>\n              <td>Yêu cầu ứng dụng phải hỗ trợ nhận tín hiệu reload (như Nginx, Apache, Syslog).</td>\n              <td>Tất cả các dịch vụ web server, database, daemon hệ thống tiêu chuẩn.</td>\n            </tr>\n            <tr>\n              <td><strong>copytruncate</strong></td>\n              <td>1. Sao chép nội dung <code>app.log</code> sang <code>app.log.1</code>.<br/>2. Cắt cụt (truncate) file gốc về kích thước 0 byte. Không cần reload ứng dụng.</td>\n              <td>Áp dụng được cho mọi phần mềm nguồn đóng hoặc ứng dụng không hỗ trợ tín hiệu reload log.</td>\n              <td><strong>Nguy cơ mất log (Race Condition):</strong> Mọi dòng log được ghi vào file giữa thời điểm hoàn thành copy và thời điểm truncate sẽ bị xóa sổ vĩnh viễn! File log lớn (10GB) copy rất chậm và tốn gấp đôi dung lượng tạm thời.</td>\n              <td>Chỉ dùng khi ứng dụng là phần mềm của bên thứ 3 không thể can thiệp code và không hỗ trợ reload file descriptor.</td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": [
            {
              "title": "Tệp cấu hình /etc/logrotate.d/fastapi_app chuẩn Production",
              "lang": "ini",
              "code": "# /etc/logrotate.d/fastapi_app\n/opt/fastapi_app/logs/*.log {\n    daily\n    missingok\n    rotate 14\n    compress\n    delaycompress\n    notifempty\n    create 0640 appuser appuser\n    sharedscripts\n    postrotate\n        # Gửi tín hiệu SIGHUP cho uvicorn master process để mở lại file log mới\n        systemctl reload fastapi_app.service > /dev/null 2>&1 || true\n    endscript\n}",
              "output": "# Ý nghĩa từng chỉ thị trong tệp cấu hình:\n# daily:         Xoay vòng file log mỗi ngày 1 lần vào lúc nửa đêm\n# missingok:     Nếu file log không tồn tại thì bỏ qua, không báo lỗi làm gián đoạn cron\n# rotate 14:     Lưu trữ tối đa 14 bản ghi lịch sử, bản thứ 15 sẽ tự động bị xóa vĩnh viễn\n# compress:      Nén các file log lịch sử bằng thuật toán gzip để tiết kiệm tới 90% dung lượng\n# delaycompress: Tạm thời không nén file vừa xoay ngày hôm qua (.1), chỉ nén từ ngày thứ 2 (.2)\n#                để tránh lỗi nếu có tiến trình phụ vẫn đang hoàn tất việc ghi\n# notifempty:    Nếu file log rỗng (0 byte) thì không thực hiện xoay vòng\n# create:        Tạo file log mới ngay lập tức với quyền 0640 thuộc user appuser\n# sharedscripts: Gom toàn bộ các file khớp pattern *.log lại và chỉ thực thi khối postrotate 1 lần duy nhất",
              "annotations": [
                {
                  "part": "Chỉ thị sharedscripts cực kỳ quan trọng",
                  "text": "Nếu có 5 file log trong thư mục, sharedscripts đảm bảo lệnh reload dịch vụ chỉ chạy 1 lần thay vì 5 lần."
                },
                {
                  "part": "create 0640 appuser appuser",
                  "text": "Đảm bảo file log mới sinh ra có đúng quyền hạn, tránh lỗi Permission Denied khiến ứng dụng sập."
                },
                {
                  "part": "Giải thích",
                  "text": "delaycompress là best practice bắt buộc khi ứng dụng vẫn giữ kết nối file cũ trong vài mili-giây sau khi reload."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-2-test-logrotate",
          "title": "4.3 Quy trình Kiểm thử Logrotate An toàn với Chế độ Dry-Run (-d)",
          "content": "\n        <p>Một lỗi cú pháp nhỏ trong tệp cấu hình logrotate có thể khiến toàn bộ các dịch vụ khác trên máy chủ bị đình trệ quá trình xoay log (vì logrotate xử lý tuần tự toàn bộ các file trong <code>/etc/logrotate.d/</code>). Do đó, nguyên tắc sống còn của kỹ sư hệ thống là: <strong>Luôn luôn chạy thử khô (Dry-run) trước khi áp dụng vào thực tế!</strong></p>\n\n        <h3 class=\"lx-h3\">Bảng cờ kiểm thử của lệnh logrotate</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Cờ (Flag)</th>\n              <th>Tên cờ</th>\n              <th>Mục đích</th>\n              <th>Lưu ý an toàn</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>-d</code></td>\n              <td><code>--debug</code> (Dry-run)</td>\n              <td>Kiểm tra cú pháp và in ra từng bước dự kiến sẽ thực hiện mà <strong>hoàn toàn không sửa đổi file thật trên đĩa</strong>.</td>\n              <td>Tuyệt đối an toàn. Chạy ở mọi thời điểm mà không sợ gián đoạn dịch vụ.</td>\n            </tr>\n            <tr>\n              <td><code>-f</code></td>\n              <td><code>--force</code></td>\n              <td>Bắt buộc xoay vòng log ngay lập tức, bất kể file chưa chạm mốc thời gian (daily) hay dung lượng (size).</td>\n              <td>Có tác động thực tế lên đĩa cứng. Dùng khi cần kiểm tra luồng nén và reload dịch vụ thực tế.</td>\n            </tr>\n            <tr>\n              <td><code>-v</code></td>\n              <td><code>--verbose</code></td>\n              <td>Hiển thị chi tiết từng quyết định của logrotate (tại sao file này được xoay, file kia bị bỏ qua).</td>\n              <td>Thường kết hợp với <code>-d</code> (ví dụ: <code>logrotate -d /etc/logrotate.d/myapp</code>).</td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": [
            {
              "title": "Quy trình kiểm thử tệp cấu hình logrotate an toàn bằng dry-run",
              "lang": "bash",
              "code": "# 1. Kiểm thử cú pháp và logic bằng cờ -d (debug / dry-run):\n$ sudo logrotate -d /etc/logrotate.d/fastapi_app\nreading config file /etc/logrotate.d/fastapi_app\nAllocating hash table for state file, size 64 entries\n\nHandling 1 logs\nrotating pattern: /opt/fastapi_app/logs/*.log  after 1 days (14 rotations)\nempty log files are not rotated, old logs are removed\nconsidering log /opt/fastapi_app/logs/access.log\n  log does not need rotating (log has been already rotated)\nconsidering log /opt/fastapi_app/logs/error.log\n  log needs rotating\nrotating log /opt/fastapi_app/logs/error.log, log->rotateCount is 14\nrenaming /opt/fastapi_app/logs/error.log to /opt/fastapi_app/logs/error.log.1\ncreating new /opt/fastapi_app/logs/error.log mode = 0640 uid = 1001 gid = 1001\nrunning shared postrotate script\nrunning script with arg /opt/fastapi_app/logs/*.log: \"\n        systemctl reload fastapi_app.service > /dev/null 2>&1 || true\n\"\n\n# 2. Ép xoay vòng thực tế 1 lần để nghiệm thu (Force run):\n$ sudo logrotate -f /etc/logrotate.d/fastapi_app\n\n# 3. Kiểm tra danh sách file đã được xoay thành công:\n$ ls -lh /opt/fastapi_app/logs/\ntotal 4.2M\n-rw-r----- 1 appuser appuser    0 Nov  4 08:30 access.log\n-rw-r----- 1 appuser appuser 2.8M Nov  4 08:29 access.log.1\n-rw-r----- 1 appuser appuser    0 Nov  4 08:30 error.log\n-rw-r----- 1 appuser appuser 1.4M Nov  4 08:29 error.log.1",
              "output": "Handling 1 logs\nrotating pattern: /opt/fastapi_app/logs/*.log  after 1 days (14 rotations)\nrenaming /opt/fastapi_app/logs/error.log to /opt/fastapi_app/logs/error.log.1\ncreating new /opt/fastapi_app/logs/error.log mode = 0640 uid = 1001 gid = 1001\nrunning shared postrotate script",
              "annotations": [
                {
                  "part": "Giải thích",
                  "text": "Đầu ra của logrotate -d chứng minh chi tiết từng bước: đổi tên file, tạo file rỗng mới với quyền 0640, và thực thi script postrotate."
                },
                {
                  "part": "Giải thích",
                  "text": "Cờ -d hoàn toàn không chạm vào file thật, giúp phát hiện sớm các lỗi sai cú pháp regex hoặc sai đường dẫn trước khi đưa vào sản xuất."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Truy vấn log sự cố và Thiết lập cấu hình xoay vòng logrotate chuẩn</h4>\n      <p>Giảng viên điều tra lỗi dịch vụ và tạo quy tắc xoay vòng log ứng dụng hàng ngày:</p>\n      <pre><code># 1. Truy vấn log lỗi của nhân Kernel từ lần khởi động gần nhất\njournalctl -k -b 0 -p err --no-pager\n\n# 2. Tạo file cấu hình xoay vòng log cho ứng dụng web /etc/logrotate.d/myapp\nsudo bash -c 'cat &lt;&lt; \"EOF\" > /etc/logrotate.d/myapp\n/var/log/myapp/*.log {\n    daily\n    missingok\n    rotate 14\n    compress\n    delaycompress\n    notifempty\n    create 0640 appuser appuser\n    sharedscripts\n    postrotate\n        systemctl reload myapp > /dev/null 2>&1 || true\n    endscript\n}\nEOF'\n\n# 3. Kiểm thử cú pháp an toàn với cờ -d\nsudo logrotate -d /etc/logrotate.d/myapp</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Xoay vòng log thiếu chỉ thị postrotate</div>\n          <pre><code>/var/log/app/*.log {\n    daily\n    rotate 7\n    compress\n    # Thiếu sharedscripts và postrotate!\n    # Thiếu copytruncate!\n}</code></pre>\n          <p class=\"lx-diff-desc\">Sau khi đổi tên file log, dịch vụ vẫn tiếp tục ghi vào file đã đổi tên (inode cũ). File log mới tạo ra trống rỗng và đĩa vẫn bị đầy!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Có postrotate reload hoặc copytruncate</div>\n          <pre><code>/var/log/app/*.log {\n    daily\n    rotate 7\n    compress\n    delaycompress\n    missingok\n    notifempty\n    sharedscripts\n    postrotate\n        /bin/kill -HUP `cat /var/run/app.pid 2>/dev/null` 2>/dev/null || true\n    endscript\n}</code></pre>\n          <p class=\"lx-diff-desc\">Thông báo cho dịch vụ xả bộ đệm và mở file mới thông qua tín hiệu SIGHUP hoặc reload an toàn.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Thiết lập Persistent Journald & Cấu hình Logrotate Thực chiến",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.2</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Cấu hình journald lưu log bền vững vào thư mục <code>/var/log/journal</code>, giới hạn dung lượng tối đa 200MB, và cấu hình xoay vòng log cho một dịch vụ mô phỏng.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Linux với systemd và logrotate.</li>\n        <li>Tạo thư mục log mẫu: <code>sudo mkdir -p /var/log/lab-service</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Cấu hình journald lưu trữ bền vững qua các lần reboot:\n          <pre><code>sudo mkdir -p /var/log/journal\nsudo systemd-tmpfiles --create --prefix /var/log/journal\nsudo sed -i 's/^#Storage=.*/Storage=persistent/' /etc/systemd/journald.conf\nsudo sed -i 's/^#SystemMaxUse=.*/SystemMaxUse=200M/' /etc/systemd/journald.conf\nsudo systemctl restart systemd-journald</code></pre>\n        </li>\n        <li>Tạo một file log giả lập có dung lượng lớn:\n          <pre><code>sudo dd if=/dev/zero of=/var/log/lab-service/app.log bs=1M count=10\nls -lh /var/log/lab-service/app.log</code></pre>\n        </li>\n        <li>Viết file cấu hình logrotate <code>/etc/logrotate.d/lab-service</code>:\n          <pre><code>sudo bash -c 'cat &lt;&lt; \"EOF\" > /etc/logrotate.d/lab-service\n/var/log/lab-service/*.log {\n    size 5M\n    rotate 5\n    compress\n    missingok\n    copytruncate\n}\nEOF'</code></pre>\n        </li>\n        <li>Kiểm thử với chế độ dry-run và cưỡng bức xoay vòng thật:\n          <pre><code>sudo logrotate -d /etc/logrotate.d/lab-service\nsudo logrotate -f /etc/logrotate.d/lab-service\nls -la /var/log/lab-service/</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Trong thư mục <code>/var/log/lab-service/</code> xuất hiện file <code>app.log.1</code> (hoặc <code>app.log.1.gz</code>), file <code>app.log</code> gốc được làm rỗng về 0 byte.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Truy vấn nhật ký journald của một người dùng cụ thể bằng cờ <code>journalctl _UID=1000 --since today</code> và giải thích ý nghĩa các trường siêu dữ liệu dạng khóa-giá trị của systemd.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Khi cưỡng bức xoay vòng bằng <code>logrotate -f</code> trên máy chủ Production, hãy cẩn thận vì nó sẽ xoay vòng ngay lập tức bất kể chu kỳ thời gian hay kích thước file, có thể gây tải nén I/O đột ngột nếu có nhiều file dung lượng hàng chục GB!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>journalctl mất sạch log cũ sau khi reboot máy tính</strong></td><td>Cấu hình <code>Storage</code> trong <code>/etc/systemd/journald.conf</code> đang để mặc định là <code>auto</code> hoặc <code>volatile</code>, và thư mục <code>/var/log/journal</code> chưa được tạo, khiến log chỉ lưu trên RAM (thư mục tạm <code>/run/log/journal</code>).</td><td>Tạo thư mục <code>sudo mkdir -p /var/log/journal</code> và bật <code>Storage=persistent</code> rồi restart journald.</td></tr>\n          <tr><td><strong>Logrotate báo lỗi <code>error: destination ... already exists</code></strong></td><td>Quá trình nén hoặc xoay vòng trước đó bị ngắt nửa chừng để lại file tạm trùng tên, hoặc cấu hình quyền truy cập không cho phép ghi đè.</td><td>Kiểm tra và xóa các file rác hỏng dạng <code>*.log.1.gz.tmp</code> trong thư mục log.</td></tr>\n          <tr><td><strong>Dịch vụ bị crash ngay sau khi logrotate thực hiện xoay vòng</strong></td><td>Script trong khối <code>postrotate</code> chạy lệnh reload với PID cũ đã chết hoặc câu lệnh gây mã lỗi khác 0, khiến logrotate bị hủy.</td><td>Luôn thêm <code>|| true</code> sau câu lệnh reload dịch vụ trong khối <code>postrotate</code> để bảo đảm an toàn.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Bảo vệ quyền riêng tư và tuân thủ GDPR/PCI-DSS:</strong> File log hệ thống và ứng dụng thường vô tình ghi lại token API, mật khẩu hoặc số thẻ tín dụng. Luôn cấu hình quyền tệp log tối đa <code>0640</code> và thuộc nhóm <code>adm</code> hoặc <code>systemd-journal</code>, không cho người dùng khác đọc.</li>\n        <li><strong>Bật tính năng ký số chống giả mạo FSS (Forward Secure Sealing) trên journald:</strong> Sử dụng <code>journalctl --setup-keys</code> để tạo khóa ký số mật mã học cho log. Nếu kẻ tấn công chiếm được quyền root và cố tình sửa log nhằm xóa dấu vết, tính năng xác thực <code>journalctl --verify</code> sẽ lập tức phát hiện vết sửa đổi.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>journalctl Official Documentation:</strong> <a href=\"https://www.freedesktop.org/software/systemd/man/journalctl.html\" target=\"_blank\" rel=\"noopener\">Freedesktop journalctl Reference</a>.</li>\n      <li><strong>Logrotate Man Page:</strong> <code>man 8 logrotate</code> - Đặc tả kỹ thuật đầy đủ về xoay vòng tệp.</li>\n      <li><strong>NIST Special Publication 800-92:</strong> Guide to Computer Security Log Management.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng 8 Cấp độ Ưu tiên Syslog Priority (RFC 5424)",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Mã số (Code)</th><th>Tên mức độ</th><th>Ý nghĩa</th><th>Ví dụ thực tế</th></tr></thead>\n        <tbody>\n          <tr><td>0</td><td>emerg (Emergency)</td><td>Hệ thống không thể sử dụng được</td><td>Kernel panic, hỏng phần cứng chính</td></tr>\n          <tr><td>1</td><td>alert (Alert)</td><td>Cần hành động can thiệp ngay lập tức</td><td>Cơ sở dữ liệu hỏng dữ liệu cấu trúc</td></tr>\n          <tr><td>2</td><td>crit (Critical)</td><td>Tình trạng nguy kịch nghiêm trọng</td><td>Hết tài nguyên hệ thống, hỏng ổ cứng RAID</td></tr>\n          <tr><td>3</td><td>err (Error)</td><td>Điều kiện lỗi phát sinh</td><td>Dịch vụ không thể kết nối tới cơ sở dữ liệu</td></tr>\n          <tr><td>4</td><td>warning (Warning)</td><td>Cảnh báo điều kiện bất thường</td><td>Dung lượng đĩa đạt 85%, chứng chỉ SSL sắp hết hạn</td></tr>\n          <tr><td>5</td><td>notice (Notice)</td><td>Tình trạng bình thường nhưng đáng chú ý</td><td>Dịch vụ khởi động lại theo yêu cầu người dùng</td></tr>\n          <tr><td>6</td><td>info (Informational)</td><td>Thông tin hoạt động tiêu chuẩn</td><td>Người dùng SSH đăng nhập thành công</td></tr>\n          <tr><td>7</td><td>debug (Debug)</td><td>Thông tin gỡ lỗi chi tiết cho lập trình viên</td><td>Dấu vết thực thi từng hàm nội bộ</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "File log Nginx access.log phình to 45GB làm cạn kiệt phân vùng root (/) và làm sập Database",
        "content": "\n      <p><strong>1. Triệu chứng sự cố:</strong> Lúc 04:00 sáng, hệ thống cảnh báo tin nhắn khẩn cấp: Website báo lỗi <code>502 Bad Gateway</code>. Khi kỹ sư đăng nhập SSH vào máy chủ thì không thể tạo file tạm hoặc lưu session, lệnh <code>df -h</code> báo phân vùng root <code>/</code> đã đầy <strong>100% (0 bytes free)</strong>. Cơ sở dữ liệu MySQL tự động tắt khẩn cấp để chống tham nhũng dữ liệu (panic shutdown).</p>\n      \n      <p><strong>2. Điều tra & Chẩn đoán:</strong></p>\n      <pre><code># Tìm các file có dung lượng lớn nhất trong hệ thống:\n$ sudo find / -xdev -type f -size +1G -exec ls -lh {} + 2>/dev/null\n-rw-r--r-- 1 www-data www-data 45G Nov 04 03:58 /var/log/nginx/access.log\n\n# Kỹ sư trực ca vội vàng chạy lệnh xóa file:\n$ sudo rm /var/log/nginx/access.log\n\n# Kiểm tra lại dung lượng ổ đĩa:\n$ df -h /\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   50G     0 100% /</code></pre>\n      <p>Dù đã chạy lệnh <code>rm</code> nhưng dung lượng khả dụng vẫn là 0 bytes! Tại sao ổ cứng không chịu nhả dung lượng?</p>\n      \n      <p><strong>3. Nguyên nhân gốc rễ:</strong> Trên Linux, lệnh <code>rm</code> chỉ xóa mục tham chiếu (dentry) của file trong thư mục. Tuy nhiên, tiến trình Nginx master/worker vẫn đang mở file descriptor trỏ vào Inode của file đó. Chừng nào tiến trình Nginx chưa giải phóng file descriptor thì hệ điều hành vẫn giữ nguyên khối dữ liệu 45GB trên đĩa cứng!</p>\n      \n      <p><strong>4. Biện pháp khắc phục:</strong></p>\n      <pre><code># Dùng lsof tìm tiến trình đang giữ file descriptor của file đã xóa:\n$ sudo lsof +L1 /var/log\nCOMMAND   PID     USER   FD   TYPE DEVICE  SIZE/OFF NLINK   NODE NAME\nnginx   12044 www-data    7w   REG    8,1 48318382080     0 262148 /var/log/nginx/access.log (deleted)\n\n# Giải pháp tức thời: Gửi tín hiệu reload để Nginx giải phóng descriptor mà không cần restart sập web:\n$ sudo systemctl reload nginx\n\n# Kiểm tra lại dung lượng ổ cứng ngay sau khi reload:\n$ df -h /\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G  5.2G   45G  11% /</code></pre>\n      <p>Dung lượng 45GB lập tức được giải phóng về hệ thống! Kỹ sư khởi động lại MySQL an toàn bằng <code>sudo systemctl start mysql</code> và website hồi phục hoàn toàn.</p>\n      \n      <p><strong>5. Phòng ngừa lâu dài:</strong></p>\n      <ul>\n        <li>Tạo ngay tệp <code>/etc/logrotate.d/nginx</code> với chính sách xoay vòng hàng ngày, nén gzip, giữ 14 ngày và cấu hình <code>postrotate</code> chạy lệnh <code>systemctl reload nginx</code>.</li>\n        <li>Cấu hình cảnh báo Prometheus khi phân vùng đĩa đạt ngưỡng 80% dung lượng để xử lý chủ động, không để chạm trần 100%.</li>\n        <li>Khi muốn làm rỗng nhanh một file log đang mở mà không muốn xóa file descriptor, dùng lệnh chuyển hướng rỗng thay vì rm: <code>sudo truncate -s 0 /var/log/nginx/access.log</code> hoặc <code>sudo : > /var/log/nginx/access.log</code>.</li>\n      </ul>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Dùng lệnh rm để xóa file log đang mở khiến ổ đĩa không nhả dung lượng",
            "content": "Sai lầm kinh điển của người mới là khi thấy file log 40GB làm đầy ổ đĩa liền chạy <code>sudo rm app.log</code>. Trên Linux, nếu một tiến trình vẫn đang giữ file descriptor mở tới Inode đó, dung lượng vật lý trên đĩa cứng KHÔNG ĐƯỢC GIẢI PHÓNG! Kết quả là <code>df -h</code> vẫn báo đầy 100%. Để làm rỗng file log đang được ghi một cách an toàn mà không làm mất file descriptor, hãy dùng lệnh truncate: <code>sudo truncate -s 0 /path/to/app.log</code>."
          },
          {
            "title": "Quên reload dịch vụ trong khối postrotate của logrotate",
            "content": "Nếu sử dụng cơ chế xoay vòng truyền thống (đổi tên file) mà quên cấu hình khối <code>postrotate</code> gửi tín hiệu reload (như <code>systemctl reload [service]</code> hoặc <code>kill -USR1 [PID]</code>), tiến trình ứng dụng sẽ tiếp tục ghi các dòng log mới vào Inode của file cũ (lúc này đã mang tên <code>app.log.1</code>)! Hậu quả là file <code>app.log</code> mới tạo luôn có kích thước 0 byte, còn file cũ bị nén gzip làm hỏng dòng log."
          }
        ],
        "tips": [
          {
            "title": "Cấu hình trần dung lượng SystemMaxUse cho journald ngay khi cài máy",
            "content": "Mặc định trên hệ thống ổ đĩa lớn, journald có thể chiếm dụng tới 10% tổng dung lượng hoặc tối đa 4GB. Hãy chủ động mở tệp <code>/etc/systemd/journald.conf</code>, bỏ comment và đặt <code>SystemMaxUse=1G</code>, <code>SystemKeepFree=2G</code> rồi chạy <code>sudo systemctl restart systemd-journald</code>. Hệ thống sẽ luôn giữ nhật ký gọn gàng và không bao giờ chiếm đoạt tài nguyên ổ cứng."
          },
          {
            "title": "Trích xuất log dạng JSON từ journalctl kết hợp với jq để điều tra nhanh",
            "content": "Để phân tích dữ liệu log phức tạp, hãy kết hợp <code>journalctl -u [service] -o json-pretty -n 1</code>. Bạn sẽ thấy hàng chục trường metadata ẩn cực kỳ hữu ích mà định dạng văn bản thông thường không hiển thị, bao gồm: <code>_PID</code>, <code>_UID</code>, <code>_SYSTEMD_CGROUP</code>, <code>_COMM</code>, và thời gian thực chuẩn microsecond."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Truy vết log hệ thống trong khoảng thời gian bằng journalctl",
          "problem": "Viết câu lệnh journalctl để trích xuất toàn bộ log của dịch vụ Nginx phát sinh từ 08:00 đến 10:00 sáng ngày hôm nay, chỉ lọc các thông báo có mức độ từ warning (cảnh báo) trở lên.",
          "hint": "Kết hợp cờ -u nginx, --since, --until và cờ mức độ ưu tiên -p err hoặc -p warning.",
          "solutionCode": "journalctl -u nginx --since \"today 08:00\" --until \"today 10:00\" -p warning",
          "solutionOutput": "-- Boot a1b2c3d4... --\nNov 04 08:15:22 server nginx[1234]: [warn] 1234#1234: *42 a client request body is buffered to a temporary file\nNov 04 09:30:10 server nginx[1234]: [error] 1234#1234: *99 connect() failed (111: Connection refused)",
          "explanation": "journalctl lưu trữ log dưới dạng nhị phân có đánh chỉ mục, cho phép lọc siêu tốc theo mốc thời gian (--since, --until), theo unit (-u) và theo độ nghiêm trọng (-p) theo chuẩn RFC 5424.",
          "annotations": [
            {
              "part": "-u nginx",
              "text": "Lọc riêng biệt luồng log phát sinh từ service Nginx."
            },
            {
              "part": "-p warning",
              "text": "Lọc log có mức độ ưu tiên từ warning, err, crit đến emerg."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp thời gian",
              "pass": "Dùng đúng --since và --until",
              "excellent": "Kết hợp từ khóa tương đối \"today\" linh hoạt",
              "weight": "50%"
            },
            {
              "criterion": "Lọc mức độ ưu tiên",
              "pass": "Dùng đúng -p warning",
              "excellent": "Lọc đúng unit và hiển thị log sạch sẽ",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Giải phóng dung lượng log journald khẩn cấp với --vacuum-size",
          "problem": "Phân vùng root (/) trên máy chủ bị đầy 100% do log journald chiếm dụng 20GB. Viết lệnh khẩn cấp để dọn dẹp và giới hạn log chỉ còn tối đa 500MB, đồng thời cấu hình vĩnh viễn SystemMaxUse.",
          "hint": "Dùng journalctl --vacuum-size=500M và sửa file /etc/systemd/journald.conf.",
          "solutionCode": "# 1. Giải phóng tức thì:\nsudo journalctl --vacuum-size=500M\n\n# 2. Cấu hình cố định trong /etc/systemd/journald.conf:\n# [Journal]\n# SystemMaxUse=500M\nsudo systemctl restart systemd-journald",
          "solutionOutput": "Vacuuming done, freed 19.5G of archived journals from /var/log/journal.",
          "explanation": "Cờ --vacuum-size xóa các file log cũ đã nén để đưa tổng dung lượng log về mức quy định. Cấu hình SystemMaxUse=500M trong journald.conf ngăn chặn tình trạng phình to log trong tương lai.",
          "annotations": [
            {
              "part": "--vacuum-size=500M",
              "text": "Xóa log cũ tự động cho đến khi tổng kích thước nhỏ hơn 500MB."
            }
          ],
          "rubric": [
            {
              "criterion": "Dọn dẹp khẩn cấp",
              "pass": "Dùng đúng journalctl --vacuum-size",
              "excellent": "Giải phóng tức thì dung lượng ổ đĩa",
              "weight": "50%"
            },
            {
              "criterion": "Cấu hình bền vững",
              "pass": "Biết chỉnh sửa SystemMaxUse",
              "excellent": "Khởi động lại systemd-journald áp dụng cấu hình vĩnh viễn",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Khôi phục dịch vụ ghi log sau khi lỡ tay xóa file syslog",
          "problem": "Một kỹ sư xóa nhầm file /var/log/syslog và nhận thấy sau đó hệ thống không còn ghi thêm bất kỳ dòng log nào vào file mới. Hãy phân tích nguyên nhân và viết kịch bản xử lý.",
          "hint": "Tiến trình rsyslogd vẫn đang giữ file descriptor tới inode cũ đã bị xóa. Cần thông báo cho tiến trình mở file descriptor mới.",
          "solutionCode": "# Nguyên nhân: rsyslogd đang giữ file descriptor tới Inode đã xóa.\n# Cách xử lý an toàn:\nsudo systemctl restart rsyslog\n# Hoặc gửi tín hiệu SIGHUP để reload:\nsudo kill -HUP $(pgrep rsyslogd)\n\n# Kiểm tra file mới được tự động tạo lại:\nls -lh /var/log/syslog",
          "solutionOutput": "-rw-r----- 1 syslog adm 1.2K Nov 4 10:15 /var/log/syslog",
          "explanation": "Lệnh rm chỉ hủy liên kết tên file trong thư mục, nhưng tiến trình rsyslogd vẫn tiếp tục ghi vào Inode cũ đã xóa trong bộ nhớ. Khởi động lại dịch vụ hoặc gửi tín hiệu SIGHUP buộc tiến trình đóng file descriptor cũ và tạo lại file mới.",
          "annotations": [
            {
              "part": "kill -HUP / restart",
              "text": "Buộc tiến trình đóng socket/file descriptor cũ và mở lại tệp mới trên đĩa."
            }
          ],
          "rubric": [
            {
              "criterion": "Bản chất Linux File System",
              "pass": "Hiểu nguyên nhân do file descriptor",
              "excellent": "Phân tích được cơ chế inode và dentry liên kết",
              "weight": "50%"
            },
            {
              "criterion": "Xử lý an toàn",
              "pass": "Khởi động lại rsyslog",
              "excellent": "Biết dùng tín hiệu SIGHUP reload mượt mà không rớt log",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "systemd-journald lưu trữ nhật ký nhị phân dạng chỉ mục, cho tốc độ lọc siêu nhanh theo thời gian, tiến trình, UID và cấp độ lỗi.",
        "Mặc định journald có thể lưu trên RAM; cần tạo thư mục /var/log/journal và đặt Storage=persistent để log tồn tại qua các lần reboot.",
        "Sử dụng journalctl với các bộ lọc chuẩn: -u (service), -p (priority), --since, --until, -k (kernel), -f (live follow).",
        "logrotate quản lý vòng đời tệp log văn bản phẳng: nén tệp cũ (compress), dọn tệp rỗng (notifempty), phân quyền (create) và xoay vòng định kỳ.",
        "Luôn kiểm thử cấu hình logrotate bằng cờ mô phỏng -d (dry-run) trước khi áp dụng vào môi trường sản xuất."
      ],
      "generalInfo": {
        "duration": "50 phút",
        "targetAudience": "Sysadmin, SRE, DevOps, Kỹ sư Điều tra Sự cố Hệ thống",
        "prerequisites": "Hiểu systemd cơ bản, phân vùng ổ đĩa và xử lý văn bản Linux",
        "environment": "Ubuntu/Debian hoặc CentOS/RHEL với systemd-journald và logrotate",
        "materials": "Terminal Linux, quyền sudo, thư mục log /var/log"
      },
      "nextLessonPreview": "Trong Bài 3.3, chúng ta sẽ bước sang lĩnh vực Quản lý Lưu trữ Nâng cao: làm chủ LVM, mở rộng phân vùng không downtime, định cấu hình /etc/fstab an toàn và công nghệ mảng đĩa RAID.",
      "quiz": [
        {
          "question": "Tùy chọn nào của lệnh logrotate dùng để mô phỏng quá trình xoay vòng và kiểm tra lỗi cú pháp mà KHÔNG làm thay đổi bất kỳ file log nào?",
          "options": [
            "-d (dry-run / debug)",
            "-f (force)",
            "-v (verbose)",
            "-s (state)"
          ],
          "explanation": "Cờ -d hiển thị chi tiết các bước logrotate sẽ thực hiện nhưng không đụng chạm hay thay đổi bất kỳ tệp tin nào trên đĩa.",
          "correctIndex": 0
        },
        {
          "question": "Lệnh journalctl nào sau đây hiển thị log của dịch vụ nginx từ 2 giờ trước đến nay với mức độ từ Error (3) trở lên khẩn cấp?",
          "options": [
            "journalctl -u nginx --since '-2h' -p err",
            "journalctl -u nginx -f -n 2",
            "journalctl nginx --priority low",
            "journalctl -e -u nginx --yesterday"
          ],
          "explanation": "-u nginx chỉ định dịch vụ, --since '-2h' lọc mốc thời gian 2 giờ qua, -p err lọc các sự cố từ cấp độ Error đến Emergency.",
          "correctIndex": 0
        },
        {
          "question": "Tùy chọn nào trong file cấu hình `/etc/logrotate.d/nginx` giúp gửi tín hiệu tải lại (reload) tới Nginx chỉ DUY NHẤT MỘT LẦN sau khi đã xoay vòng toàn bộ các file log?",
          "options": [
            "sharedscripts",
            "single-reload",
            "once-only",
            "postrotate-batch"
          ],
          "correctIndex": 0,
          "explanation": "Tùy chọn `sharedscripts` chỉ định rằng khối lệnh `postrotate ... endscript` sẽ chỉ chạy đúng 1 lần duy nhất sau khi tất cả các file log khớp mẫu đã được xoay vòng, tránh gửi reload hàng chục lần tới daemon."
        }
      ],
      "reflectionQuestion": "Một quản trị viên kiểm tra dung lượng ổ đĩa thấy thư mục `/var/log` chiếm tới 45GB đĩa cứng. Quản trị viên muốn giải phóng ngay 40GB mà không làm hỏng dữ liệu nhật ký của 7 ngày gần nhất. Hãy đề xuất chuỗi lệnh chính xác kết hợp giữa `journalctl` và `logrotate` để giải quyết an toàn.",
      "reflectionHint": "Gợi ý: Bước 1: Thu gọn log journald bằng lệnh `sudo journalctl --vacuum-time=7d` hoặc `sudo journalctl --vacuum-size=2G`. Bước 2: Kiểm tra cấu hình `/etc/logrotate.d/` xem các file log có bật cờ `compress` chưa. Bước 3: Dùng `logrotate -f` để cưỡng bức nén các file `.log.1` cũ sang dạng `.gz`. Bước 4: Xóa an toàn các file log cũ hơn 7 ngày bằng `find /var/log -name '*.gz' -mtime +7 -delete`."
    },
    {
      "id": "lx-3-03",
      "number": "3.3",
      "title": "Quản lý Lưu trữ nâng cao: LVM (Logical Volume Manager), ext4/xfs/btrfs, fstab & RAID",
      "subtitle": "Làm chủ hạ tầng lưu trữ doanh nghiệp: Mở rộng dung lượng phân vùng nóng không gián đoạn dịch vụ, phòng chống lỗi boot fstab và so sánh các cấp độ RAID",
      "level": "Nâng cao",
      "duration": "60 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "1. [Biết - Remember] Nắm vững kiến trúc 3 tầng phân cấp của LVM: Physical Volume (PV), Volume Group (VG), Logical Volume (LV)",
        "2. [Hiểu - Understand] Hiểu rõ sự khác biệt giữa các hệ thống file: ext4 (mở rộng/thu nhỏ linh hoạt) vs xfs (chỉ mở rộng, hiệu năng I/O song song cao)",
        "3. [Vận dụng - Apply] Thực hiện quy trình mở rộng Logical Volume và filesystem trực tuyến (online resize) không downtime",
        "4. [Phân tích - Analyze] Phân tích cấu trúc 6 trường trong /etc/fstab, sử dụng cờ nofail để phòng chống lỗi Emergency Boot Mode và so sánh các chuẩn RAID 0, 1, 5, 10"
      ],
      "intuition": {
        "title": "Bể nước co giãn LVM và Khối móng nhà kiến trúc fstab",
        "overview": "Lưu trữ truyền thống với phân vùng tĩnh giống như xây tường gạch kiên cố: một khi đã chia ổ đĩa thì việc thay đổi kích thước vô cùng nguy hiểm. LVM giải phóng giới hạn này bằng cách biến các ổ đĩa vật lý thành một bể chứa tài nguyên linh hoạt.",
        "realWorld": "Một cơ sở dữ liệu MySQL đặt tại `/var/lib/mysql` đang cạn sạch dung lượng vào đêm siêu sale Black Friday. Nhờ sử dụng LVM, kỹ sư gắn thêm một ổ SSD mới vào server, gộp vào Volume Group và mở rộng Logical Volume trong 15 giây mà không cần khởi động lại máy hay làm gián đoạn bất kỳ giao dịch nào của khách hàng.",
        "metaphor": "Physical Volume (PV) giống như từng thùng nước riêng lẻ. Volume Group (VG) giống như chiếc bể nước tổng gom tất cả các thùng lại. Còn Logical Volume (LV) giống như các vòi nước chia dòng theo nhu cầu; bạn có thể mở rộng hoặc thu hẹp dung lượng vòi nước tùy ý chỉ bằng một thao tác van khóa.",
        "boundary": "LVM giải quyết bài toán quản lý phân vùng đĩa cục bộ trên một máy chủ; khi cần chia sẻ vùng lưu trữ qua mạng cho nhiều máy chủ đồng thời ta phải dùng NFS, iSCSI hoặc giải pháp lưu trữ phân tán như Ceph/GlusterFS.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Lưu trữ truyền thống với phân vùng tĩnh giống như xây tường gạch kiên cố: một khi đã chia ổ đĩa thì việc thay đổi kích thước vô cùng nguy hiểm. LVM giải phóng giới hạn này bằng cách biến các ổ đĩa vật lý thành một bể chứa tài nguyên linh hoạt.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>pvcreate</code>:</strong> Khởi tạo đĩa vật lý thành Physical Volume</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>vgextend</code>:</strong> Mở rộng bể chứa Volume Group bằng PV mới</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>lvextend -r</code>:</strong> Mở rộng LV và tự động resize luôn Filesystem</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một cơ sở dữ liệu MySQL đặt tại <code>/var/lib/mysql</code> đang cạn sạch dung lượng vào đêm siêu sale Black Friday. Nhờ sử dụng LVM, kỹ sư gắn thêm một ổ SSD mới vào server, gộp vào Volume Group và mở rộng Logical Volume trong 15 giây mà không cần khởi động lại máy hay làm gián đoạn bất kỳ giao dịch nào của khách hàng.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Quy trình Mở rộng Phân vùng LVM Trực tuyến (Zero-Downtime Resizing)</li><li><span class=\"lx-vs-bullet\">•</span> Cấu hình Gắn đĩa Tự động /etc/fstab &amp; Cảnh báo Đỏ Cứu Boot</li><li><span class=\"lx-vs-bullet\">•</span> So sánh các Cấp độ RAID Lưu trữ &amp; Nguyên tắc Cốt tử về Backup</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Quản trị LVM & Lưu trữ",
          "content": "<p>Quản trị lưu trữ doanh nghiệp đòi hỏi sự thành thạo chuỗi lệnh 3 cấp độ PV-VG-LV và kỹ năng cấu hình mount tự động:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Lệnh / Cấu hình</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Ghi chú vận hành</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>pvcreate</code></td>\n            <td>Khởi tạo đĩa vật lý thành Physical Volume</td>\n            <td><code>pvcreate &lt;device&gt;</code></td>\n            <td><code>sudo pvcreate /dev/sdb</code></td>\n            <td>Xóa sạch nhãn phân vùng cũ trên đĩa</td>\n          </tr>\n          <tr>\n            <td><code>vgextend</code></td>\n            <td>Mở rộng bể chứa Volume Group bằng PV mới</td>\n            <td><code>vgextend &lt;vg_name&gt; &lt;pv_name&gt;</code></td>\n            <td><code>sudo vgextend vg_data /dev/sdb</code></td>\n            <td>Gia tăng dung lượng tự do cho toàn bộ nhóm</td>\n          </tr>\n          <tr>\n            <td><code>lvextend -r</code></td>\n            <td>Mở rộng LV và tự động resize luôn Filesystem</td>\n            <td><code>lvextend -r -L +&lt;size&gt; &lt;lv_path&gt;</code></td>\n            <td><code>sudo lvextend -r -L +10G /dev/vg_data/lv_app</code></td>\n            <td>Cờ <code>-r</code> (resizefs) cực kỳ quan trọng, chạy online</td>\n          </tr>\n          <tr>\n            <td><code>UUID trong fstab</code></td>\n            <td>Định danh phân vùng đĩa bền vững</td>\n            <td><code>UUID=&lt;uuid&gt; /mount ext4 defaults 0 2</code></td>\n            <td><code>UUID=... /data xfs defaults,nofail 0 2</code></td>\n            <td>Không dùng <code>/dev/sdb1</code> vì tên đĩa có thể bị tráo đổi</td>\n          </tr>\n          <tr>\n            <td><code>mount -a</code></td>\n            <td>Kiểm tra tính hợp lệ của tệp /etc/fstab</td>\n            <td><code>mount -a</code></td>\n            <td><code>sudo mount -a</code></td>\n            <td>Bắt buộc chạy trước khi reboot để tránh Emergency Mode</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-3-3-lvm-workflow",
          "title": "4.1 Quy trình Mở rộng Phân vùng LVM Trực tuyến (Zero-Downtime Resizing)",
          "content": "\n        <p>Trong các trung tâm dữ liệu hiện đại và đám mây (AWS, GCP, Azure, OpenStack), phân vùng lưu trữ gần như luôn được cấu hình trên nền <strong>LVM (Logical Volume Manager)</strong>. Ưu thế vượt trội của LVM là khả năng mở rộng dung lượng ổ đĩa trực tiếp khi dịch vụ đang chạy mà không cần phải unmount phân vùng và không mất một giây downtime nào.</p>\n\n        <h3 class=\"lx-h3\">Bảng lệnh cốt lõi của LVM qua 3 tầng kiến trúc</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Tầng kiến trúc</th>\n              <th>Lệnh quét / Tóm tắt</th>\n              <th>Lệnh hiển thị chi tiết</th>\n              <th>Lệnh khởi tạo</th>\n              <th>Lệnh mở rộng</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>Physical Volume (PV)</strong></td>\n              <td><code>pvs</code></td>\n              <td><code>pvdisplay</code></td>\n              <td><code>sudo pvcreate /dev/sdb</code></td>\n              <td><code>sudo pvresize /dev/sdb</code> (sau khi mở rộng đĩa ảo)</td>\n            </tr>\n            <tr>\n              <td><strong>Volume Group (VG)</strong></td>\n              <td><code>vgs</code></td>\n              <td><code>vgdisplay</code></td>\n              <td><code>sudo vgcreate vg_data /dev/sdb</code></td>\n              <td><code>sudo vgextend vg_data /dev/sdc</code></td>\n            </tr>\n            <tr>\n              <td><strong>Logical Volume (LV)</strong></td>\n              <td><code>lvs</code></td>\n              <td><code>lvdisplay</code></td>\n              <td><code>sudo lvcreate -L 50G -n lv_db vg_data</code></td>\n              <td><code>sudo lvextend -L +20G -r /dev/vg_data/lv_db</code></td>\n            </tr>\n          </tbody>\n        </table></div>\n\n        <h3 class=\"lx-h3\">So sánh Hệ thống File: ext4 vs XFS vs Btrfs</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Hệ thống File</th>\n              <th>Distro mặc định</th>\n              <th>Mở rộng dung lượng (Grow)</th>\n              <th>Thu nhỏ dung lượng (Shrink)</th>\n              <th>Tính năng nổi bật</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>ext4</strong></td>\n              <td>Debian, Ubuntu</td>\n              <td>Trực tuyến (Online) bằng <code>resize2fs</code></td>\n              <td><strong>Hỗ trợ Ngoại tuyến (Offline)</strong> (phải unmount và chạy e2fsck)</td>\n              <td>Cực kỳ ổn định, tương thích ngược tuyệt đối, dễ phục hồi dữ liệu khi gặp sự cố.</td>\n            </tr>\n            <tr>\n              <td><strong>XFS</strong></td>\n              <td>RHEL, CentOS, Rocky Linux, Oracle Linux</td>\n              <td>Trực tuyến (Online) bằng <code>xfs_growfs</code></td>\n              <td><strong>TUYỆT ĐỐI KHÔNG HỖ TRỢ!</strong> Không thể thu nhỏ dưới mọi hình thức.</td>\n              <td>Tối ưu xử lý file dung lượng cực lớn và đa luồng I/O song song (Allocation Groups).</td>\n            </tr>\n            <tr>\n              <td><strong>Btrfs</strong></td>\n              <td>Fedora, openSUSE</td>\n              <td>Trực tuyến bằng <code>btrfs filesystem resize</code></td>\n              <td>Trực tuyến (Online)</td>\n              <td>Hỗ trợ Copy-on-Write (CoW), tạo snapshot tức thì, tự phục hồi dữ liệu qua checksum.</td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": [
            {
              "title": "Thao tác mở rộng nóng Logical Volume thêm 20GB không gián đoạn dịch vụ",
              "lang": "bash",
              "code": "# Bước 1: Kiểm tra dung lượng còn trống trong Volume Group:\n$ sudo vgs\n  VG      #PV #LV #SN Attr   VSize   VFree\n  vg_data   1   1   0 wz--n- 100.00g 35.00g\n\n# Bước 2: Mở rộng Logical Volume lv_db thêm 20GB và tự động đồng bộ Filesystem:\n# (Cờ -r hoặc --resizefs cực kỳ quan trọng: nó tự gọi resize2fs cho ext4 hoặc xfs_growfs cho XFS)\n$ sudo lvextend -L +20G -r /dev/vg_data/lv_db\n\n# Bước 3: Xác minh kết quả tức thì mà không cần unmount hay reboot:\n$ sudo lvs /dev/vg_data/lv_db\n  LV    VG      Attr       LSize  Pool Origin Data% Meta% Move Log Cpy%Sync Convert\n  lv_db vg_data -wi-ao---- 70.00g\n\n$ df -h /var/lib/postgresql\nFilesystem                   Size  Used Avail Use% Mounted on\n/dev/mapper/vg_data-lv_db     69G   45G   21G  69% /var/lib/postgresql",
              "output": "  Size of logical volume vg_data/lv_db changed from 50.00 GiB (12800 extents) to 70.00 GiB (17920 extents).\n  Logical volume vg_data/lv_db successfully resized.\nresize2fs 1.46.5 (30-Dec-2021)\nFilesystem at /dev/mapper/vg_data-lv_db is mounted on /var/lib/postgresql; on-line resizing required\nold_desc_blocks = 7, new_desc_blocks = 9\nThe filesystem on /dev/mapper/vg_data-lv_db is now 18350080 (4k) blocks long.",
              "annotations": [
                {
                  "part": "Cờ -r (--resizefs)",
                  "text": "Tự động phát hiện loại filesystem bên trong LV và thực thi lệnh mở rộng filesystem tương ứng trong 1 thao tác duy nhất."
                },
                {
                  "part": "on-line resizing required",
                  "text": "Thông báo của kernel xác nhận hệ thống file được nới rộng trực tiếp khi ứng dụng database vẫn đang đọc ghi dữ liệu bình thường."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-3-fstab-danger",
          "title": "4.2 Cấu hình Gắn đĩa Tự động /etc/fstab & Cảnh báo Đỏ Cứu Boot",
          "content": "\n        <p>Tệp <code>/etc/fstab</code> (File Systems Table) chứa danh sách các phân vùng ổ đĩa sẽ được tự động gắn kết (mount) khi Linux khởi động. Mỗi dòng cấu hình bao gồm chính xác <strong>6 trường</strong> cách nhau bởi dấu cách hoặc phím Tab:</p>\n\n        <h3 class=\"lx-h3\">Cấu trúc 6 trường chuẩn mực trong tệp /etc/fstab</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Thứ tự</th>\n              <th>Tên trường</th>\n              <th>Ý nghĩa &amp; Giá trị mẫu</th>\n              <th>Quy tắc an toàn sống còn</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>1</td>\n              <td><strong>Thiết bị (Device)</strong></td>\n              <td><code>UUID=3a4b5c6d-...</code> hoặc <code>/dev/mapper/vg_data-lv_db</code></td>\n              <td><strong>Luôn dùng UUID (tra cứu bằng lệnh blkid)!</strong> Không dùng tên thiết bị truyền thống như <code>/dev/sdb1</code> vì thứ tự sdb/sdc có thể bị đảo lộn khi cắm thêm ổ cứng mới.</td>\n            </tr>\n            <tr>\n              <td>2</td>\n              <td><strong>Thư mục gắn (Mount Point)</strong></td>\n              <td><code>/var/lib/postgresql</code> hoặc <code>/mnt/backup</code></td>\n              <td>Thư mục đích bắt buộc phải tồn tại trên hệ thống trước khi mount.</td>\n            </tr>\n            <tr>\n              <td>3</td>\n              <td><strong>Loại hệ thống file (Type)</strong></td>\n              <td><code>ext4</code>, <code>xfs</code>, <code>btrfs</code>, <code>nfs</code></td>\n              <td>Phải khớp chính xác với định dạng thực tế của phân vùng khi format bằng mkfs.</td>\n            </tr>\n            <tr>\n              <td>4</td>\n              <td><strong>Tùy chọn gắn kết (Options)</strong></td>\n              <td><code>defaults,noatime,nofail</code></td>\n              <td><code>defaults</code> bao gồm: rw, suid, dev, exec, auto, nouser, async.<br/><strong>Đối với mọi ổ đĩa phụ trợ (ổ gắn ngoài, ổ backup, ổ data đám mây), LUÔN BỔ SUNG tùy chọn <code>nofail</code>!</strong></td>\n            </tr>\n            <tr>\n              <td>5</td>\n              <td><strong>Dump (Sao lưu dump)</strong></td>\n              <td><code>0</code> (hoặc 1)</td>\n              <td>Đặt là <code>0</code> (tiện ích dump cổ xưa hiện nay không còn được sử dụng).</td>\n            </tr>\n            <tr>\n              <td>6</td>\n              <td><strong>Thứ tự kiểm tra Fsck (Pass)</strong></td>\n              <td><code>1</code> cho phân vùng root (/), <code>2</code> cho các phân vùng khác, <code>0</code> cho XFS hoặc ổ đĩa mạng</td>\n              <td>XFS có cơ chế journaling riêng và không dùng fsck lúc boot, luôn đặt là <code>0</code>.</td>\n            </tr>\n          </tbody>\n        </table></div>\n\n        <div class=\"lx-callout-danger\">\n          <strong>⚠️ CẢNH BÁO ĐỎ CỨU BOOT:</strong> Nếu bạn sửa tệp <code>/etc/fstab</code> bị sai cú pháp, sai UUID hoặc chỉ định mount một ổ đĩa không tồn tại (mà thiếu cờ <code>nofail</code>), khi khởi động lại máy chủ systemd sẽ không thể hoàn tất target <code>local-fs.target</code> và máy chủ sẽ bị dừng khẩn cấp tại <strong>Emergency Mode</strong>! Nếu máy chủ nằm trên Cloud hoặc ở xa hàng nghìn cây số, bạn sẽ bị mất hoàn toàn kết nối SSH và phải vào console cứu hộ cực kỳ vất vả.<br/>\n          <strong>Quy tắc bất di bất dịch:</strong> Sau khi sửa <code>/etc/fstab</code>, KHÔNG BAO GIỜ REBOOT ngay! Luôn chạy lệnh kiểm tra: <code>sudo mount -a</code>. Nếu có lỗi, lệnh sẽ lập tức báo đỏ ra terminal để bạn sửa ngay!\n        </div>\n      ",
          "codeExamples": [
            {
              "title": "Quy trình thêm phân vùng vào /etc/fstab an toàn tuyệt đối",
              "lang": "bash",
              "code": "# Bước 1: Sao lưu tệp fstab trước khi chạm vào:\n$ sudo cp /etc/fstab /etc/fstab.bak.$(date +%F_%H%M%S)\n\n# Bước 2: Lấy mã UUID chuẩn của phân vùng bằng lệnh blkid:\n$ sudo blkid /dev/mapper/vg_data-lv_db\n/dev/mapper/vg_data-lv_db: UUID=\"e4d2a1b9-8c7e-4b3f-9a0d-123456789abc\" BLOCK_SIZE=\"4096\" TYPE=\"ext4\"\n\n# Bước 3: Thêm dòng cấu hình vào /etc/fstab với cờ nofail:\n$ sudo tee -a /etc/fstab << 'EOF'\nUUID=e4d2a1b9-8c7e-4b3f-9a0d-123456789abc  /var/lib/postgresql  ext4  defaults,noatime,nofail  0  2\nEOF\n\n# Bước 4: BẮT BUỘC - Kiểm tra tính hợp lệ của toàn bộ fstab:\n$ sudo mount -a\n# (Nếu lệnh kết thúc im lặng và trả về mã thoát 0 = Cấu hình an toàn 100%)\n$ echo $?\n0",
              "output": "0",
              "annotations": [
                {
                  "part": "Tùy chọn noatime",
                  "text": "Vô hiệu hóa việc ghi lại thời điểm truy cập file mỗi khi đọc, giúp tăng tốc độ đọc/ghi đĩa lên tới 15-20%."
                },
                {
                  "part": "Tùy chọn nofail",
                  "text": "Cực kỳ quan trọng! Nếu ổ cứng bị tháo ra hoặc đứt kết nối cáp, máy chủ vẫn boot bình thường và cho phép bạn SSH vào xử lý."
                },
                {
                  "part": "mount -a",
                  "text": "Thử nghiệm mount tất cả các điểm gắn kết khai báo trong fstab. Nếu sai cú pháp hoặc sai đường dẫn, lỗi sẽ hiện ra ngay lập tức."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-3-raid-concepts",
          "title": "4.3 So sánh các Cấp độ RAID Lưu trữ & Nguyên tắc Cốt tử về Backup",
          "content": "\n        <p><strong>RAID (Redundant Array of Independent Disks)</strong> là công nghệ kết hợp nhiều ổ đĩa vật lý thành một đơn vị lưu trữ logic nhằm tăng hiệu năng đọc/ghi, tăng dung lượng hoặc cung cấp khả năng chịu lỗi (fault tolerance) khi một hoặc nhiều ổ cứng vật lý bị hỏng.</p>\n\n        <h3 class=\"lx-h3\">Bảng so sánh 4 cấp độ RAID phổ biến nhất</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Cấp độ RAID</th>\n              <th>Cơ chế hoạt động</th>\n              <th>Số ổ đĩa tối thiểu</th>\n              <th>Dung lượng sử dụng</th>\n              <th>Khả năng chịu lỗi</th>\n              <th>Hiệu năng Đọc / Ghi</th>\n              <th>Trường hợp áp dụng thực tế</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>RAID 0</strong><br/><em>(Striping)</em></td>\n              <td>Dữ liệu được băm nhỏ và ghi rải đều lên tất cả các ổ đĩa.</td>\n              <td>2 ổ</td>\n              <td><strong>100%</strong> (Tổng dung lượng tất cả các ổ)</td>\n              <td><strong>0%</strong> (Chỉ cần 1 ổ hỏng là MẤT TRẮNG 100% dữ liệu)</td>\n              <td>Đọc: Rất nhanh<br/>Ghi: Rất nhanh</td>\n              <td>Bộ đệm tạm thời (Cache), render video, tính toán khoa học không đòi hỏi an toàn dữ liệu.</td>\n            </tr>\n            <tr>\n              <td><strong>RAID 1</strong><br/><em>(Mirroring)</em></td>\n              <td>Dữ liệu được sao chép nguyên bản (gương soi) giống hệt nhau sang ổ đĩa thứ hai.</td>\n              <td>2 ổ</td>\n              <td><strong>50%</strong> (Bằng dung lượng 1 ổ nhỏ nhất)</td>\n              <td>Chịu được hỏng 1 ổ đĩa (trong cặp 2 ổ)</td>\n              <td>Đọc: Nhanh<br/>Ghi: Trung bình (bằng 1 ổ đơn)</td>\n              <td>Phân vùng chứa hệ điều hành (/boot, /), máy chủ ứng dụng nhỏ cần an toàn.</td>\n            </tr>\n            <tr>\n              <td><strong>RAID 5</strong><br/><em>(Striping + Distributed Parity)</em></td>\n              <td>Dữ liệu ghi rải đều kết hợp khối chẵn lẻ (parity) phân tán trên tất cả các ổ.</td>\n              <td>3 ổ</td>\n              <td><strong>(N - 1)</strong> ổ (Ví dụ 4 ổ 2TB thì được 6TB)</td>\n              <td>Chịu được hỏng <strong>tối đa 1 ổ</strong> đĩa bất kỳ</td>\n              <td>Đọc: Nhanh<br/>Ghi: Chậm hơn (do phải tính toán Parity)</td>\n              <td>Máy chủ lưu trữ tệp (File Server), kho lưu trữ dữ liệu dung lượng lớn chi phí tiết kiệm.</td>\n            </tr>\n            <tr>\n              <td><strong>RAID 10</strong><br/><em>(RAID 1+0)</em></td>\n              <td>Kết hợp Mirroring (RAID 1) rồi Striping (RAID 0) lên trên.</td>\n              <td>4 ổ</td>\n              <td><strong>50%</strong> (N / 2)</td>\n              <td>Chịu được hỏng 1 ổ trên mỗi cặp gương soi (tối đa tới 2 ổ)</td>\n              <td>Đọc: <strong>Rất cao</strong><br/>Ghi: <strong>Rất cao</strong></td>\n              <td><strong>Tiêu chuẩn vàng cho Máy chủ Cơ sở dữ liệu (PostgreSQL, MySQL, Oracle) Production.</strong></td>\n            </tr>\n          </tbody>\n        </table></div>\n\n        <div class=\"lx-callout-danger\">\n          <strong>🚨 NGUYÊN TẮC CỐT TỬ: RAID KHÔNG PHẢI LÀ BACKUP (RAID IS NOT A BACKUP)!</strong><br/>\n          Rất nhiều kỹ sư nhầm tưởng rằng máy chủ đã cấu hình RAID 1 hoặc RAID 10 chịu lỗi phần cứng thì không cần sao lưu dữ liệu nữa. Đây là sai lầm chết người!\n          <ul>\n            <li>RAID chỉ bảo vệ chống lại sự cố <strong>hỏng hóc phần cứng vật lý</strong> của đĩa từ hoặc chip nhớ SSD.</li>\n            <li>Nếu lập trình viên lỡ tay chạy lệnh <code>DROP DATABASE production;</code> hoặc <code>rm -rf /var/data</code>, lệnh xóa sẽ được ghi đồng thời tức khắc sang cả 2 ổ đĩa gương soi! RAID không thể giúp bạn khôi phục lại dữ liệu bị xóa nhầm.</li>\n            <li>RAID không thể bảo vệ hệ thống trước tấn công mã hóa tống tiền (Ransomware), tham nhũng filesystem (Filesystem Corruption), hoặc cháy nổ trung tâm dữ liệu. Bắt buộc phải duy trì chiến lược sao lưu định kỳ độc lập theo quy tắc 3-2-1!</li>\n          </ul>\n        </div>\n      ",
          "codeExamples": [
            {
              "title": "Kiểm tra trạng thái RAID phần mềm (mdadm) trên Linux",
              "lang": "bash",
              "code": "# Xem trạng thái hoạt động của các mảng RAID phần mềm trong kernel:\n$ cat /proc/mdstat\nPersonalities : [raid1] [raid10] \nmd0 : active raid1 sdb1[1] sda1[0]\n      523712 blocks super 1.2 [2/2] [UU]\n\nmd1 : active raid10 sdc1[0] sdd1[1] sde1[2] sdf1[3]\n      419428352 blocks super 1.2 512K chunks 2 near-copies [4/4] [UUUU]\n\n# Ký hiệu [UU] và [UUUU] biểu thị tất cả các ổ đĩa đều đang hoạt động hoàn hảo (Up).\n# Nếu xuất hiện ký tự [U_], nghĩa là một ổ đĩa trong mảng đã bị hỏng hoặc mất kết nối!\n\n# Kiểm tra chi tiết mảng RAID md1:\n$ sudo mdadm --detail /dev/md1 | grep -E \"State|Active Devices|Working Devices|Failed Devices\"\n          State : clean \n Active Devices : 4\nWorking Devices : 4\n Failed Devices : 0",
              "output": "Personalities : [raid1] [raid10] \nmd1 : active raid10 sdc1[0] sdd1[1] sde1[2] sdf1[3]\n      419428352 blocks super 1.2 512K chunks 2 near-copies [4/4] [UUUU]",
              "annotations": [
                {
                  "part": "/proc/mdstat",
                  "text": "Cửa sổ quan sát trực tiếp trạng thái các mảng RAID phần mềm được kernel quản lý."
                },
                {
                  "part": "[UUUU]",
                  "text": "Mỗi chữ cái đại diện cho 1 ổ đĩa. 'U' là Up (bình thường), '_' là Degraded (bị lỗi cần thay thế ổ mới ngay lập tức)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Quy trình mở rộng phân vùng LVM trực tuyến không Downtime</h4>\n      <p>Giảng viên kiểm tra dung lượng VG và mở rộng thêm 5GB cho phân vùng <code>/dev/vg_data/lv_app</code>:</p>\n      <pre><code># 1. Kiểm tra dung lượng còn trống của Volume Group\nsudo vgs\n\n# 2. Mở rộng Logical Volume kèm tự động co giãn hệ thống file (ext4/xfs)\nsudo lvextend -r -L +5G /dev/vg_data/lv_app\n\n# 3. Xác thực dung lượng mới ngay lập tức\ndf -h /data</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Sửa fstab cẩu thả bằng tên thiết bị</div>\n          <pre><code># Nguy hiểm trong /etc/fstab:\n/dev/sdb1 /data ext4 defaults 0 0\n\n# Và reboot máy ngay mà không kiểm tra!</code></pre>\n          <p class=\"lx-diff-desc\">Khi cắm thêm ổ cứng mới hoặc thay đổi cổng cáp SATA/NVMe, <code>/dev/sdb1</code> có thể bị đổi thành <code>/dev/sdc1</code>, khiến máy tính rơi vào màn hình đen Emergency Boot Mode không thể khởi động!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Dùng UUID kèm cờ an toàn nofail</div>\n          <pre><code># Chuẩn công nghiệp:\nUUID=3f1b4a2c-... /data ext4 defaults,nofail 0 2\n\n# Và luôn kiểm tra trước khi reboot:\nsudo mount -a</code></pre>\n          <p class=\"lx-diff-desc\">UUID là định danh duy nhất bất biến; cờ <code>nofail</code> cho phép hệ điều hành tiếp tục boot bình thường ngay cả khi ổ đĩa phụ bị tháo rời.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Thiết lập Phân vùng LVM & Cấu hình Gắn đĩa Bền vững",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.3</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Tạo loop device giả lập 2 ổ đĩa phụ, khởi tạo LVM (PV -> VG -> LV), định dạng ext4, cấu hình mount tự động qua <code>/etc/fstab</code> với UUID và cờ <code>nofail</code>, sau đó thực hành mở rộng trực tuyến.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Linux với quyền sudo và gói lvm2.</li>\n        <li>Tạo thư mục lab: <code>mkdir -p ~/lvm-lab && cd ~/lvm-lab</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Tạo 2 file giả lập ổ cứng dung lượng 1GB bằng <code>truncate</code> và gắn vào loop device:\n          <pre><code>truncate -s 1G ~/lvm-lab/disk1.img\ntruncate -s 1G ~/lvm-lab/disk2.img\nsudo losetup -fP ~/lvm-lab/disk1.img\nsudo losetup -fP ~/lvm-lab/disk2.img\nlosetup -a</code></pre>\n        </li>\n        <li>Khởi tạo Physical Volume và Volume Group:\n          <pre><code>LOOP1=$(losetup -j ~/lvm-lab/disk1.img | cut -d: -f1)\nLOOP2=$(losetup -j ~/lvm-lab/disk2.img | cut -d: -f1)\nsudo pvcreate $LOOP1 $LOOP2\nsudo vgcreate vg_lab $LOOP1 $LOOP2\nsudo vgs</code></pre>\n        </li>\n        <li>Tạo Logical Volume 800MB và định dạng ext4:\n          <pre><code>sudo lvcreate -L 800M -n lv_test vg_lab\nsudo mkfs.ext4 /dev/vg_lab/lv_test\nsudo mkdir -p /mnt/lab_data\nsudo mount /dev/vg_lab/lv_test /mnt/lab_data\ndf -h /mnt/lab_data</code></pre>\n        </li>\n        <li>Mở rộng trực tuyến thêm 500MB mà không unmount:\n          <pre><code>sudo lvextend -r -L +500M /dev/vg_lab/lv_test\ndf -h /mnt/lab_data</code></pre>\n        </li>\n        <li>Dọn dẹp tài nguyên sau khi thực hành:\n          <pre><code>sudo umount /mnt/lab_data\nsudo lvremove -y /dev/vg_lab/lv_test\nsudo vgremove -y vg_lab\nsudo pvremove -y $LOOP1 $LOOP2\nsudo losetup -d $LOOP1 $LOOP2\nrm -f ~/lvm-lab/disk*.img</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Lệnh <code>df -h /mnt/lab_data</code> hiển thị dung lượng tăng từ ~800MB lên ~1.3GB mà không hề ngắt kết nối mount hay gây mất dữ liệu.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>So sánh hành vi mở rộng trên hệ thống file XFS (dùng <code>xfs_growfs</code>) so với ext4 (dùng <code>resize2fs</code>) và giải thích tại sao XFS không hỗ trợ thu nhỏ phân vùng (shrink).</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Trước khi gõ lệnh <code>pvcreate</code> hoặc <code>mkfs</code>, luôn chạy <code>lsblk</code> để kiểm tra chính xác tên thiết bị. Gõ nhầm vào ổ cứng chứa hệ điều hành (ví dụ <code>/dev/sda</code>) sẽ xóa sạch toàn bộ dữ liệu máy chủ!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Máy chủ rơi vào chế độ <code>Emergency Mode (You are in emergency mode. Enter root password)</code> khi khởi động</strong></td><td>Một dòng mount trong <code>/etc/fstab</code> bị sai UUID, sai cú pháp, hoặc trỏ tới một ổ đĩa không cắm vào máy mà không có cờ <code>nofail</code>.</td><td>Nhập mật khẩu root, remount phân vùng gốc ở chế độ ghi: <code>mount -o remount,rw /</code>, mở <code>nano /etc/fstab</code> comment dấu <code>#</code> vào dòng lỗi hoặc thêm cờ <code>nofail</code>, sau đó reboot.</td></tr>\n          <tr><td><strong>Chạy lvextend thành công nhưng df -h vẫn báo dung lượng ổ đĩa như cũ</strong></td><td>Người dùng quên cờ <code>-r</code> (resizefs), mới chỉ mở rộng dung lượng khối ở tầng Logical Volume nhưng chưa co giãn hệ thống file (filesystem) bên trên.</td><td>Chạy <code>resize2fs /dev/vg/lv</code> (nếu là ext4) hoặc <code>xfs_growfs /mountpoint</code> (nếu là xfs).</td></tr>\n          <tr><td><strong>Cố gắng thu nhỏ (shrink) phân vùng XFS dẫn đến hỏng toàn bộ dữ liệu</strong></td><td>Kiến trúc của hệ thống file XFS không được thiết kế để thu nhỏ trực tuyến hay ngoại tuyến. Mọi thao tác thu nhỏ trên XFS đều bị từ chối hoặc làm hỏng superblock.</td><td>Với XFS, giải pháp duy nhất để giảm dung lượng là backup dữ liệu, xóa LV, tạo lại LV nhỏ hơn và format lại từ đầu.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Bật các cờ mount bảo mật cho các phân vùng chia sẻ trong fstab:</strong> Luôn cấu hình <code>noexec,nosuid,nodev</code> cho phân vùng <code>/tmp</code> và <code>/dev/shm</code> để ngăn chặn tin tặc tải mã độc về thư mục tạm và thực thi binary leo thang đặc quyền.</li>\n        <li><strong>Luôn dự trữ ít nhất 15-20% dung lượng trống trong Volume Group:</strong> Không bao giờ cấp phát 100% dung lượng VG cho các Logical Volume. Phần dung lượng dự trữ này cực kỳ quan trọng để tạo LVM Snapshot phục vụ sao lưu cơ sở dữ liệu nhất quán mà không phải dừng dịch vụ.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Red Hat Enterprise Linux LVM Administrator Guide:</strong> <a href=\"https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/\" target=\"_blank\" rel=\"noopener\">RHEL 9 LVM Reference</a>.</li>\n      <li><strong>ArchWiki LVM:</strong> Hướng dẫn toàn diện và các tình huống thực chiến LVM.</li>\n      <li><strong>fstab(5) Linux Manual Page:</strong> <code>man 5 fstab</code> - Quy chuẩn cú pháp tập tin mount hệ thống.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng So sánh Các Cấp độ RAID Lưu trữ Phổ biến",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Cấp độ RAID</th><th>Số đĩa tối thiểu</th><th>Dung lượng khả dụng</th><th>Khả năng chịu lỗi</th><th>Trường hợp sử dụng</th></tr></thead>\n        <tbody>\n          <tr><td>RAID 0 (Striping)</td><td>2</td><td>100% tổng dung lượng</td><td>0 đĩa (Hỏng 1 đĩa là mất sạch)</td><td>Bộ đệm cache, dữ liệu tạm tốc độ cao</td></tr>\n          <tr><td>RAID 1 (Mirroring)</td><td>2</td><td>50% tổng dung lượng</td><td>Cho phép hỏng 1 đĩa</td><td>Ổ đĩa chứa Hệ điều hành (Boot OS)</td></tr>\n          <tr><td>RAID 5 (Parity)</td><td>3</td><td>(N - 1) * Dung lượng đĩa</td><td>Cho phép hỏng 1 đĩa</td><td>Lưu trữ tệp dung lượng lớn, cân bằng chi phí</td></tr>\n          <tr><td>RAID 6 (Dual Parity)</td><td>4</td><td>(N - 2) * Dung lượng đĩa</td><td>Cho phép hỏng 2 đĩa đồng thời</td><td>Hệ thống lưu trữ dự phòng cao</td></tr>\n          <tr><td>RAID 10 (1+0)</td><td>4</td><td>50% tổng dung lượng</td><td>Cho phép hỏng 1 đĩa mỗi cặp mirror</td><td>Cơ sở dữ liệu Database I/O cao chuẩn Enterprise</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Phân vùng cơ sở dữ liệu PostgreSQL tăng vọt chạm trần 98% lúc nửa đêm trên máy chủ sản xuất",
        "content": "\n      <p><strong>1. Triệu chứng sự cố:</strong> Vào lúc 01:45 sáng trong đợt flash-sale mua sắm, hệ thống giám sát Datadog báo động đỏ: Phân vùng chứa dữ liệu PostgreSQL <code>/var/lib/postgresql</code> (đang nằm trên Logical Volume <code>/dev/vg_prod/lv_postgres</code>) đã chạm ngưỡng <strong>98% dung lượng</strong>. Dự kiến chỉ còn 20 phút nữa đĩa sẽ đầy 100%, lúc đó Database sẽ tự động khóa ghi và toàn bộ giao dịch mua hàng sẽ sập đổ.</p>\n      \n      <p><strong>2. Điều tra & Chẩn đoán:</strong> Kỹ sư trực ca đăng nhập SSH kiểm tra tình trạng LVM:</p>\n      <pre><code>$ df -h /var/lib/postgresql\nFilesystem                   Size  Used Avail Use% Mounted on\n/dev/mapper/vg_prod-lv_postgres  100G   98G  2.0G  98% /var/lib/postgresql\n\n$ sudo vgs\n  VG      #PV #LV #SN Attr   VSize   VFree\n  vg_prod   1   1   0 wz--n- 500.00g 400.00g</code></pre>\n      <p>Rất may mắn, Volume Group <code>vg_prod</code> vẫn còn tới 400GB dung lượng chưa cấp phát (VFree)! Đây là thời điểm vàng để thực hiện mở rộng phân vùng nóng.</p>\n      \n      <p><strong>3. Nguyên nhân gốc rễ:</strong> Lưu lượng đơn hàng tăng đột biến làm phình to bảng lịch sử giao dịch và file Write-Ahead Logging (WAL) của PostgreSQL. Do phân vùng ban đầu chỉ được cấp phát 100GB nên nhanh chóng chạm trần cảnh báo.</p>\n      \n      <p><strong>4. Biện pháp khắc phục (Zero-Downtime):</strong></p>\n      <pre><code># Mở rộng Logical Volume thêm 100GB và tự động nới rộng hệ thống file:\n$ sudo lvextend -L +100G -r /dev/vg_prod/lv_postgres\n\n# Kiểm tra lại dung lượng tức thì:\n$ df -h /var/lib/postgresql\nFilesystem                   Size  Used Avail Use% Mounted on\n/dev/mapper/vg_prod-lv_postgres  200G   98G  102G  49% /var/lib/postgresql</code></pre>\n      <p>Toàn bộ thao tác chỉ mất <strong>1.5 giây</strong> để hoàn thành. Ứng dụng PostgreSQL không hề bị dừng hay mất bất kỳ kết nối nào. Tỷ lệ sử dụng dung lượng rơi thẳng từ 98% xuống 49% an toàn.</p>\n      \n      <p><strong>5. Phòng ngừa lâu dài:</strong></p>\n      <ul>\n        <li>Cấu hình cron job chạy <code>pg_vacuum</code> định kỳ để thu hồi các hàng dữ liệu chết (dead tuples).</li>\n        <li>Thiết lập chính sách tự động cảnh báo từ ngưỡng 75% để kỹ sư có đủ thời gian chuẩn bị ổ đĩa gắn thêm.</li>\n        <li>Khi dung lượng trống của Volume Group (VFree) rơi xuống dưới 50GB, lập tức gắn thêm đĩa ảo mới và chạy <code>vgextend</code> để nạp sẵn tài nguyên cho hồ chứa.</li>\n      </ul>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "XFS tuyệt đối không thể thu nhỏ (shrink) dung lượng",
            "content": "Hệ thống file XFS (mặc định trên RHEL, CentOS, Rocky Linux) chỉ hỗ trợ <strong>tăng dung lượng (grow)</strong> trực tuyến, hoàn toàn <strong>KHÔNG CÓ KHẢ NĂNG THU NHỎ (SHRINK)</strong>! Nếu bạn lỡ cấp phát quá nhiều dung lượng cho một Logical Volume định dạng XFS (ví dụ cấp 500GB nhưng chỉ dùng 50GB), bạn không thể dùng lệnh thu nhỏ. Cách duy nhất để lấy lại dung lượng là sao lưu dữ liệu sang nơi khác, xóa Logical Volume đó đi, tạo lại LV nhỏ hơn và khôi phục dữ liệu."
          },
          {
            "title": "Sửa /etc/fstab bị sai rồi reboot mà không chạy mount -a để kiểm tra",
            "content": "Đây là nguyên nhân số 1 khiến máy chủ Linux bị sập sau khi bảo trì. Nếu trong tệp <code>/etc/fstab</code> có một dòng sai tên thiết bị, sai UUID, sai định dạng filesystem hoặc sai chính tả trong options mà thiếu cờ <code>nofail</code>, quá trình boot của systemd sẽ dừng lại khẩn cấp tại <strong>Emergency Mode</strong> và ngắt toàn bộ mạng SSH! Luôn luôn chạy <code>sudo mount -a</code> ngay sau khi chỉnh sửa fstab. Nếu lệnh không in ra bất kỳ dòng lỗi nào thì mới được phép khởi động lại."
          }
        ],
        "tips": [
          {
            "title": "Luôn dùng cờ -r (--resizefs) khi chạy lvextend",
            "content": "Thay vì phải chạy 2 lệnh riêng biệt: <code>lvextend</code> để tăng kích thước phân vùng logic rồi mới chạy tiếp <code>resize2fs</code> (cho ext4) hoặc <code>xfs_growfs</code> (cho XFS), hãy luôn thêm cờ <code>-r</code> (ví dụ: <code>sudo lvextend -L +10G -r /dev/vg/lv</code>). LVM sẽ tự động phân tích định dạng hệ thống file và gọi công cụ mở rộng tương ứng một cách an toàn và chính xác tuyệt đối."
          },
          {
            "title": "Luôn thêm tùy chọn nofail trong /etc/fstab cho mọi ổ đĩa phụ trợ",
            "content": "Khi gắn các ổ đĩa phụ (như ổ backup, ổ lưu trữ dữ liệu ứng dụng, ổ đĩa mạng NFS), hãy luôn khai báo tùy chọn <code>nofail</code> trong cột thứ 4 của tệp <code>/etc/fstab</code> (ví dụ: <code>defaults,nofail</code>). Tùy chọn này chỉ thị cho systemd: Nếu ổ đĩa này bị tháo rời hoặc đứt kết nối cáp lúc boot, hãy bỏ qua và tiếp tục khởi động hệ thống bình thường, cho phép kỹ sư vẫn SSH vào máy chủ từ xa để xử lý."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Kiểm tra dung lượng Volume Group còn trống bằng vgs",
          "problem": "Lệnh nào sau đây cho phép kiểm tra chi tiết dung lượng còn trống (Free Space) của Volume Group (VG) có tên vg_data trước khi cấp phát thêm cho Logical Volume?",
          "hint": "Sử dụng lệnh vgs hoặc vgdisplay kèm tên Volume Group.",
          "solutionCode": "sudo vgs vg_data\n# Hoặc xem chi tiết Physical Extent:\nsudo vgdisplay vg_data",
          "solutionOutput": "VG      #PV #LV #SN Attr   VSize   VFree\nvg_data   2   3   0 wz--n- 200.00g 50.00g",
          "explanation": "Cột VFree trong lệnh vgs hiển thị chính xác dung lượng chưa cấp phát của Volume Group. Lệnh vgdisplay cung cấp thêm kích thước Physical Extent (PE) và số lượng PE còn trống.",
          "annotations": [
            {
              "part": "vgs vg_data",
              "text": "Hiển thị tóm tắt một dòng về số lượng PV, LV, tổng kích thước và dung lượng trống."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp lệnh LVM",
              "pass": "Dùng đúng vgs hoặc vgdisplay",
              "excellent": "Xác định chính xác giá trị tại cột VFree",
              "weight": "50%"
            },
            {
              "criterion": "Đọc hiểu PE",
              "pass": "Nắm được khái niệm VG",
              "excellent": "Hiểu cơ chế cấp phát Extent trong LVM",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Mở rộng trực tuyến Logical Volume và Filesystem ext4/xfs",
          "problem": "Một máy chủ có Logical Volume /dev/vg_data/lv_app đang bị đầy. Hãy viết câu lệnh mở rộng thêm 20GB dung lượng cho LV này và tự động mở rộng Filesystem bên trong trong 1 bước duy nhất.",
          "hint": "Sử dụng lệnh lvextend kết hợp cờ -L +20G và cờ mở rộng filesystem -r (resizefs).",
          "solutionCode": "sudo lvextend -L +20G -r /dev/vg_data/lv_app",
          "solutionOutput": "Logical volume vg_data/lv_app successfully resized from 50.00 GiB (12800 extents) to 70.00 GiB (17920 extents).\nresize2fs 1.47.0 (5-Feb-2023)\nFilesystem at /dev/mapper/vg_data-lv_app is mounted on /app; on-line resizing required\nold_desc_blocks = 7, new_desc_blocks = 9\nThe filesystem on /dev/mapper/vg_data-lv_app is now 18350080 (4k) blocks long.",
          "explanation": "Cờ -r (--resizefs) của lệnh lvextend tự động phát hiện định dạng filesystem bên dưới (ext4 với resize2fs, hoặc xfs với xfs_growfs) và mở rộng trực tuyến ngay khi volume được nới rộng, loại bỏ hoàn toàn nguy cơ quên bước mở rộng fs.",
          "annotations": [
            {
              "part": "-L +20G -r",
              "text": "Cờ -r là chốt chặn an toàn hàng đầu giúp đồng bộ kích thước Logical Volume và Filesystem."
            }
          ],
          "rubric": [
            {
              "criterion": "Mở rộng LVM",
              "pass": "Dùng lvextend -L +20G",
              "excellent": "Thêm cờ -r mở rộng trực tuyến cả filesystem an toàn",
              "weight": "50%"
            },
            {
              "criterion": "Vận hành không gián đoạn",
              "pass": "Thực hiện được online resize",
              "excellent": "Hiểu rõ sự khác biệt giữa kích thước block layer và filesystem layer",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Thêm ổ đĩa vật lý mới và mở rộng Volume Group không gián đoạn",
          "problem": "Một kỹ sư gắn thêm một ổ SSD mới /dev/sdc vào máy chủ. Hãy viết chuỗi lệnh LVM để khởi tạo Physical Volume, nạp vào Volume Group vg_data và kiểm tra lại trạng thái.",
          "hint": "Khởi tạo bằng pvcreate sau đó mở rộng bằng vgextend.",
          "solutionCode": "# 1. Khởi tạo Physical Volume:\nsudo pvcreate /dev/sdc\n\n# 2. Nạp thêm vào Volume Group hiện có:\nsudo vgextend vg_data /dev/sdc\n\n# 3. Kiểm tra dung lượng mới:\nsudo vgs vg_data",
          "solutionOutput": "Physical volume \"/dev/sdc\" successfully created.\nVolume group \"vg_data\" successfully extended\n  VG      #PV #LV #SN Attr   VSize   VFree\n  vg_data   3   3   0 wz--n- 500.00g 350.00g",
          "explanation": "pvcreate ghi nhãn LVM metadata lên ổ đĩa mới. vgextend kết nạp Physical Volume này vào pool tài nguyên chung của Volume Group mà không cần unmount bất kỳ phân vùng nào hay làm gián đoạn ứng dụng đang chạy.",
          "annotations": [
            {
              "part": "pvcreate -> vgextend",
              "text": "Quy trình chuẩn mở rộng kho tài nguyên lưu trữ của máy chủ sản xuất."
            }
          ],
          "rubric": [
            {
              "criterion": "Khởi tạo PV",
              "pass": "Dùng đúng pvcreate",
              "excellent": "Xác thực ổ đĩa trước khi khởi tạo metadata",
              "weight": "50%"
            },
            {
              "criterion": "Mở rộng VG",
              "pass": "Dùng đúng vgextend",
              "excellent": "Kiểm tra lại dung lượng VFree tăng lên tương ứng",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "LVM tách rời lưu trữ vật lý khỏi hệ điều hành thông qua 3 tầng: Physical Volume (PV), Volume Group (VG) và Logical Volume (LV).",
        "Mở rộng phân vùng LVM trực tuyến không downtime thực hiện dễ dàng bằng lệnh: lvextend -r -L +<size> <lv_path>.",
        "ext4 hỗ trợ cả mở rộng và thu nhỏ phân vùng; trong khi XFS chỉ hỗ trợ mở rộng, không bao giờ được phép thu nhỏ.",
        "Trong /etc/fstab, bắt buộc dùng UUID và cờ nofail cho các đĩa phụ để tránh thảm họa rơi vào Emergency Boot Mode khi thiếu đĩa.",
        "RAID cung cấp tính sẵn sàng cao về mặt phần cứng (chống hỏng đĩa vật lý), nhưng RAID KHÔNG PHẢI LÀ BACKUP."
      ],
      "generalInfo": {
        "duration": "60 phút",
        "targetAudience": "Senior Linux Administrator, Cloud Infrastructure Engineer, DBA",
        "prerequisites": "Hiểu phân vùng ổ đĩa cơ bản (Bài 2.8), quyền root và lệnh lsblk/df",
        "environment": "Máy ảo Linux có thêm 2 ổ đĩa phụ (ví dụ /dev/sdb, /dev/sdc 5GB mỗi ổ)",
        "materials": "Terminal Linux, quyền sudo, gói lvm2, xfsprogs, e2fsprogs"
      },
      "nextLessonPreview": "Trong Bài 3.4, chúng ta sẽ bước sang lĩnh vực Mạng Nâng cao: định tuyến tĩnh với Netplan/NetworkManager và thiết lập pháo đài tường lửa kiên cố với UFW và nftables.",
      "quiz": [
        {
          "question": "Tùy chọn nào trong lệnh 'lvextend -r -L +10G /dev/vg/lv' đảm bảo hệ thống file (filesystem) cũng được tự động mở rộng theo?",
          "options": [
            "-r (--resizefs)",
            "-f (--force)",
            "-n (--name)",
            "-v (--verbose)"
          ],
          "explanation": "Cờ -r tự động phát hiện loại hệ thống file bên dưới (ext4 hoặc xfs) và gọi công cụ tương ứng (resize2fs hoặc xfs_growfs) để co giãn trực tuyến.",
          "correctIndex": 0
        },
        {
          "question": "Cờ nào trong /etc/fstab giúp hệ điều hành vẫn tiếp tục khởi động bình thường nếu ổ cứng gắn thêm bị mất kết nối hoặc hỏng?",
          "options": [
            "nofail",
            "noexec",
            "ro",
            "sync"
          ],
          "explanation": "nofail chỉ thị cho systemd không chặn quá trình boot nếu thiết bị mount không tồn tại tại thời điểm khởi động.",
          "correctIndex": 0
        },
        {
          "question": "Đặc điểm khác biệt quan trọng nhất giữa hệ thống tệp XFS và ext4 khi thực hiện thao tác thay đổi dung lượng là gì?",
          "options": [
            "XFS chỉ có thể mở rộng (grow), không thể thu nhỏ (shrink); còn ext4 hỗ trợ cả mở rộng lẫn thu nhỏ ngoại tuyến",
            "ext4 không hỗ trợ mở rộng trực tuyến khi đang mount",
            "XFS không hỗ trợ journaling",
            "ext4 chỉ hỗ trợ dung lượng tối đa 100GB"
          ],
          "correctIndex": 0,
          "explanation": "XFS được thiết kế tối ưu cho hiệu năng và mở rộng quy mô lớn, do đó nó CHỈ cho phép mở rộng (growfs) và TUYỆT ĐỐI KHÔNG hỗ trợ thu nhỏ (shrink). Trong khi đó, ext4 có thể thu nhỏ nhưng bắt buộc phải unmount."
        }
      ],
      "reflectionQuestion": "Một kỹ sư thêm dòng sau vào `/etc/fstab`: `/dev/sdb1 /mnt/data ext4 defaults 0 0`. Sau khi khởi động lại máy chủ từ xa trên đám mây, máy chủ hoàn toàn mất kết nối SSH và bảng điều khiển đám mây báo lỗi 'systemd emergency mode'. Hãy phân tích 2 sai lầm nghiêm trọng trong dòng cấu hình trên và viết lại dòng fstab đạt tiêu chuẩn Production.",
      "reflectionHint": "Gợi ý: Sai lầm 1: Dùng tên thiết bị không ổn định `/dev/sdb1` thay vì `UUID=...`. Khi boot lại, thứ tự gán tên đĩa có thể thay đổi khiến kernel không tìm thấy. Sai lầm 2: Thiếu cờ `nofail`. Nếu ổ đĩa gặp trục trặc khi gắn, systemd lập tức ngắt quá trình khởi động để vào emergency mode. Dòng viết lại chuẩn: `UUID=<UUID_lay_tu_blkid> /mnt/data ext4 defaults,nofail 0 2`."
    },
    {
      "id": "lx-3-04",
      "number": "3.4",
      "title": "Quản trị Mạng nâng cao: Định tuyến tĩnh, Cấu hình Interface & Tường lửa Firewall (nftables/ufw)",
      "subtitle": "Xây dựng pháo đài mạng máy chủ: Cấu hình địa chỉ IP tĩnh chuẩn Netplan / NetworkManager, định tuyến kernel và thiết lập tường lửa Least Privilege",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "1. [Biết - Remember] Nắm vững cú pháp định cấu hình mạng hiện đại bằng YAML (Netplan) và kiến trúc bảng luật nftables",
        "2. [Hiểu - Understand] Hiểu nguyên tắc tường lửa phòng thủ nhiều lớp: Mặc định Chặn tất cả (Default Deny) và Kiểm tra trạng thái gói (Stateful Inspection)",
        "3. [Vận dụng - Apply] Cấu hình IP tĩnh, Gateway, DNS bằng Netplan và thiết lập pháo đài UFW theo quy tắc Least Privilege",
        "4. [Phân tích - Analyze] Phân tích bảng luật nftables trong Kernel (chains, hooks, rules) và gỡ lỗi sự cố chặn nhầm cổng dịch vụ"
      ],
      "intuition": {
        "title": "Tấm bản đồ giao thông Netplan và Pháo đài kiểm soát cổng Tường lửa",
        "overview": "Mạng là huyết mạch nhưng cũng là hướng tấn công chính của tin tặc. Cấu hình mạng tĩnh ổn định và dựng tường lửa nghiêm ngặt là lớp khiên bảo vệ đầu tiên của bất kỳ hệ thống sản xuất nào.",
        "realWorld": "Một máy chủ nội bộ bị quét cổng tự động từ Internet phát hiện cổng 3306 (MySQL) bị mở hớ hênh do docker tự ý chọc thủng iptables. Nhờ thiết lập tường lửa UFW với chính sách Default Deny và chỉ mở SSH qua IP VPN chỉ định, nguy cơ xâm nhập cơ sở dữ liệu đã bị dập tắt hoàn toàn.",
        "metaphor": "Netplan giống như cuốn sổ quy hoạch đường phố của một thành phố: nó chỉ định rõ xe cộ đi làn nào (interface), ra khỏi thành phố qua cổng nào (default gateway), và trạm hướng dẫn nằm ở đâu (DNS). Còn Tường lửa UFW/nftables là các trạm gác vũ trang tại các cửa ngõ: chỉ những ai có thẻ thông hành hợp lệ (allowed port/IP) mới được phép bước qua.",
        "boundary": "UFW là giao diện thân thiện bọc bên ngoài; trong khi nftables là hệ thống lọc gói tin trực tiếp trong nhân Kernel; đối với hạ tầng Cloud (AWS, Azure, GCP), tường lửa máy chủ cần kết hợp song song với Security Group / Network ACL bên ngoài.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Mạng là huyết mạch nhưng cũng là hướng tấn công chính của tin tặc. Cấu hình mạng tĩnh ổn định và dựng tường lửa nghiêm ngặt là lớp khiên bảo vệ đầu tiên của bất kỳ hệ thống sản xuất nào.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>netplan try</code>:</strong> Thử nghiệm cấu hình mạng có cơ chế tự hoàn tác</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>ufw default deny</code>:</strong> Đặt chính sách mặc định chặn toàn bộ kết nối đến</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>ufw allow proto</code>:</strong> Mở cổng dịch vụ theo giao thức chỉ định</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một máy chủ nội bộ bị quét cổng tự động từ Internet phát hiện cổng 3306 (MySQL) bị mở hớ hênh do docker tự ý chọc thủng iptables. Nhờ thiết lập tường lửa UFW với chính sách Default Deny và chỉ mở SSH qua IP VPN chỉ định, nguy cơ xâm nhập cơ sở dữ liệu đã bị dập tắt hoàn toàn.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Cấu hình Mạng Tĩnh Chuẩn mực: Netplan &amp; NetworkManager</li><li><span class=\"lx-vs-bullet\">•</span> Thiết lập Pháo đài Tường lửa UFW theo Chuẩn Least Privilege</li><li><span class=\"lx-vs-bullet\">•</span> Khảo sát Kiến trúc Bảng luật Hạ tầng của nftables trong Kernel</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Quản trị Mạng & Tường lửa",
          "content": "<p>Quản trị mạng hiện đại trên Linux xoay quanh cấu hình giao diện khai báo (Declarative YAML) và bộ lọc gói tin thế hệ mới:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Công cụ / Lệnh</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Ghi chú vận hành</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>netplan try</code></td>\n            <td>Thử nghiệm cấu hình mạng có cơ chế tự hoàn tác</td>\n            <td><code>sudo netplan try</code></td>\n            <td><code>sudo netplan try --timeout 30</code></td>\n            <td>Cứu nguy mất kết nối: tự rollback sau 30s nếu mất SSH</td>\n          </tr>\n          <tr>\n            <td><code>ufw default deny</code></td>\n            <td>Đặt chính sách mặc định chặn toàn bộ kết nối đến</td>\n            <td><code>ufw default deny incoming</code></td>\n            <td><code>sudo ufw default deny incoming</code></td>\n            <td>Nền tảng bảo mật của nguyên tắc Zero Trust</td>\n          </tr>\n          <tr>\n            <td><code>ufw allow proto</code></td>\n            <td>Mở cổng dịch vụ theo giao thức chỉ định</td>\n            <td><code>ufw allow &lt;port&gt;/&lt;proto&gt;</code></td>\n            <td><code>sudo ufw allow 22/tcp</code></td>\n            <td>Luôn mở cổng SSH trước khi bật kích hoạt UFW</td>\n          </tr>\n          <tr>\n            <td><code>ufw allow from</code></td>\n            <td>Giới hạn mở cổng cho một địa chỉ IP duy nhất</td>\n            <td><code>ufw allow from &lt;IP&gt; to any port &lt;port&gt;</code></td>\n            <td><code>sudo ufw allow from 203.0.113.5 to any port 22</code></td>\n            <td>Bảo vệ cổng quản trị SSH chỉ cho phép truy cập từ VPN</td>\n          </tr>\n          <tr>\n            <td><code>nft list ruleset</code></td>\n            <td>Xem toàn bộ cấu trúc bảng luật nftables trong Kernel</td>\n            <td><code>sudo nft list ruleset</code></td>\n            <td><code>sudo nft list ruleset</code></td>\n            <td>Thay thế hoàn toàn <code>iptables-save</code> cũ</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-3-4-netplan-ip",
          "title": "4.1 Cấu hình Mạng Tĩnh Chuẩn mực: Netplan & NetworkManager",
          "content": "\n        <p>Quản trị mạng trên Linux hiện đại đã dịch chuyển khỏi tệp <code>/etc/network/interfaces</code> cổ điển. Trên hệ điều hành họ <strong>Debian/Ubuntu</strong>, tiện ích trừu tượng hóa mạng là <strong>Netplan</strong> (sử dụng các tệp cấu hình YAML trong <code>/etc/netplan/</code>). Trên họ <strong>RHEL/CentOS/Rocky Linux</strong>, công cụ tiêu chuẩn là <strong>NetworkManager</strong> (điều khiển qua lệnh <code>nmcli</code>).</p>\n\n        <h3 class=\"lx-h3\">Quy tắc sinh tử khi chỉnh sửa tệp YAML của Netplan</h3>\n        <ul>\n          <li><strong>Thụt lề bắt buộc bằng 2 dấu cách:</strong> Tuyệt đối KHÔNG dùng phím Tab trong tệp YAML; vi phạm quy tắc này sẽ làm Netplan báo lỗi cú pháp và từ chối áp dụng mạng.</li>\n          <li><strong>Kiểm tra card mạng thực tế:</strong> Chạy lệnh <code>ip link show</code> để xác định chính xác tên interface (ví dụ: <code>eth0</code>, <code>ens3</code>, hoặc <code>enp0s3</code>) trước khi viết cấu hình.</li>\n          <li><strong>Luôn dùng netplan try thay vì netplan apply:</strong> Khi làm việc từ xa qua SSH, nếu cấu hình IP hoặc Gateway bị sai, <code>netplan apply</code> sẽ ngắt kết nối ngay lập tức và biến máy chủ thành cục gạch. Lệnh <code>sudo netplan try</code> sẽ áp dụng cấu hình tạm thời trong 120 giây và chờ bạn bấm Enter xác nhận; nếu bạn bị mất mạng và không bấm xác nhận được, Netplan sẽ tự động khôi phục cấu hình cũ!</li>\n        </ul>\n\n        <h3 class=\"lx-h3\">Bảng đối chiếu cấu hình mạng giữa Netplan và nmcli</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Hành động</th>\n              <th>Cấu hình Netplan (Debian/Ubuntu)</th>\n              <th>Lệnh NetworkManager (nmcli - RHEL/Rocky)</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Xem danh sách kết nối</td>\n              <td><code>cat /etc/netplan/*.yaml</code></td>\n              <td><code>nmcli connection show</code></td>\n            </tr>\n            <tr>\n              <td>Gán IP tĩnh &amp; Prefix</td>\n              <td>Dòng <code>addresses: [192.168.1.100/24]</code></td>\n              <td><code>sudo nmcli con mod eth0 ipv4.addresses 192.168.1.100/24</code></td>\n            </tr>\n            <tr>\n              <td>Gán Gateway mặc định</td>\n              <td>Dòng <code>routes: - to: default via: 192.168.1.1</code></td>\n              <td><code>sudo nmcli con mod eth0 ipv4.gateway 192.168.1.1</code></td>\n            </tr>\n            <tr>\n              <td>Gán DNS Server</td>\n              <td>Dòng <code>nameservers: addresses: [1.1.1.1, 8.8.8.8]</code></td>\n              <td><code>sudo nmcli con mod eth0 ipv4.dns \"1.1.1.1 8.8.8.8\"</code></td>\n            </tr>\n            <tr>\n              <td>Áp dụng cấu hình</td>\n              <td><code>sudo netplan try</code> (hoặc <code>apply</code>)</td>\n              <td><code>sudo nmcli con up eth0</code></td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": [
            {
              "title": "Tệp cấu hình IP tĩnh an toàn /etc/netplan/01-netcfg.yaml",
              "lang": "yaml",
              "code": "# /etc/netplan/01-netcfg.yaml\nnetwork:\n  version: 2\n  renderer: networkd\n  ethernets:\n    enp0s3:\n      dhcp4: no\n      addresses:\n        - 192.168.1.150/24\n      routes:\n        - to: default\n          via: 192.168.1.1\n        # Định tuyến tĩnh riêng cho dải mạng nội bộ Data Center:\n        - to: 10.10.0.0/16\n          via: 192.168.1.254\n      nameservers:\n        addresses:\n          - 1.1.1.1\n          - 8.8.8.8",
              "output": "# Kiểm thử tệp cấu hình mạng với cơ chế bảo hiểm tự phục hồi (120s timeout):\n$ sudo netplan try\nDo you want to keep these settings?\n\nPress ENTER before the timeout to accept the new configuration\nChanges will revert in 118 seconds\n\n# Sau khi bấm ENTER xác nhận:\nConfiguration accepted.\n\n# Kiểm tra địa chỉ IP và bảng định tuyến mới:\n$ ip -4 addr show enp0s3\n2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP\n    inet 192.168.1.150/24 brd 192.168.1.255 scope global enp0s3\n\n$ ip route show\ndefault via 192.168.1.1 dev enp0s3 proto static\n10.10.0.0/16 via 192.168.1.254 dev enp0s3 proto static\n192.168.1.0/24 dev enp0s3 proto kernel scope link src 192.168.1.150",
              "annotations": [
                {
                  "part": "netplan try",
                  "text": "Cơ chế phòng vệ số 1 khi thao tác mạng từ xa; tự động rollback nếu quản trị viên mất kết nối SSH."
                },
                {
                  "part": "routes - to",
                  "text": "default via: Thay thế cho chỉ thị gateway4 đã bị deprecate từ các bản Ubuntu gần đây."
                },
                {
                  "part": "ip route show",
                  "text": "Xác minh dòng định tuyến tĩnh đến mạng 10.10.0.0/16 đã được nạp trực tiếp vào kernel routing table."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-4-ufw-fortress",
          "title": "4.2 Thiết lập Pháo đài Tường lửa UFW theo Chuẩn Least Privilege",
          "content": "\n        <p><strong>UFW (Uncomplicated Firewall)</strong> là tiện ích giao diện quản lý tường lửa phổ biến nhất trên họ Ubuntu/Debian. Bản chất UFW là một wrapper thao tác trên nền <code>nftables</code> (hoặc <code>iptables</code>), giúp kỹ sư quản lý các quy tắc mở/đóng cổng dễ hiểu và tránh nhầm lẫn.</p>\n\n        <h3 class=\"lx-h3\">Nguyên tắc Mặc định Chặn (Default DENY) & Giới hạn Tốc độ (Rate Limiting)</h3>\n        <p>Theo chuẩn bảo mật CIS Linux Benchmark và NIST SP 800-123:</p>\n        <ul>\n          <li><strong>Mặc định chặn toàn bộ lưu lượng đi vào:</strong> <code>sudo ufw default deny incoming</code>. Bất kỳ cổng dịch vụ nào không được khai báo rõ ràng đều sẽ bị drop gói tin trong im lặng.</li>\n          <li><strong>Mặc định cho phép lưu lượng đi ra:</strong> <code>sudo ufw default allow outgoing</code> (để máy chủ có thể cập nhật bản vá hệ điều hành và kết nối ra ngoài).</li>\n          <li><strong>Giới hạn tốc độ cổng SSH:</strong> <code>sudo ufw limit 22/tcp</code>. Thay vì mở thông thoáng cổng SSH, <code>ufw limit</code> sẽ tự động từ chối kết nối nếu một địa chỉ IP cố tình thử kết nối quá 6 lần trong vòng 30 giây, dập tắt các đợt tấn công brute-force mật khẩu.</li>\n          <li><strong>Tuyệt đối không mở cổng Database ra toàn mạng (0.0.0.0/0):</strong> Các cổng như 3306 (MySQL), 5432 (Postgres), 6379 (Redis) chỉ được phép mở cho địa chỉ IP cố định của máy chủ ứng dụng nội bộ: <code>sudo ufw allow from 10.10.1.50 to any port 5432 proto tcp</code>.</li>\n        </ul>\n\n        <div class=\"lx-callout-danger\">\n          <strong>⚠️ CẢNH BÁO ĐỎ TỰ KHÓA SSH (SSH SELF-LOCKOUT):</strong><br/>\n          Nếu bạn kích hoạt tường lửa (<code>sudo ufw enable</code>) trên một máy chủ đám mây từ xa mà <strong>QUÊN chưa mở cổng SSH</strong>, phiên SSH hiện tại sẽ bị ngắt kết nối ngay lập tức và máy chủ sẽ từ chối mọi kết nối mới! Bạn sẽ bị khóa quyền truy cập hoàn toàn.<br/>\n          <strong>Quy tắc bảo hiểm bắt buộc:</strong> Trước khi bật tường lửa lần đầu hoặc thực hiện thay đổi lớn, hãy kích hoạt một bộ hẹn giờ khẩn cấp ở tác vụ nền:<br/>\n          <code>sudo nohup sh -c 'sleep 300 &amp;&amp; ufw disable' &gt; /dev/null 2&gt;&amp;1 &amp;</code><br/>\n          Nếu chẳng may bạn bị mất kết nối, sau đúng 5 phút bộ đếm sẽ tự động tắt UFW để bạn SSH lại vào cứu hộ!\n        </div>\n      ",
          "codeExamples": [
            {
              "title": "Quy trình thiết lập pháo đài UFW chuẩn Production từ A đến Z",
              "lang": "bash",
              "code": "# Bước 1: Đặt bộ hẹn giờ bảo hiểm 5 phút trước khi thao tác:\n$ sudo nohup sh -c 'sleep 300 && ufw disable' > /dev/null 2>&1 &\n\n# Bước 2: Thiết lập chính sách bảo mật gốc (Least Privilege):\n$ sudo ufw default deny incoming\n$ sudo ufw default allow outgoing\n\n# Bước 3: Mở cổng SSH trước tiên kết hợp giới hạn tốc độ chống brute-force:\n$ sudo ufw limit 22/tcp comment 'SSH Rate Limited'\n\n# Bước 4: Mở cổng Web công khai (HTTP/HTTPS):\n$ sudo ufw allow 80/tcp comment 'HTTP Web'\n$ sudo ufw allow 443/tcp comment 'HTTPS Web'\n\n# Bước 5: Chỉ mở cổng Database cho máy chủ ứng dụng nội bộ (Ví dụ: IP 10.10.1.50):\n$ sudo ufw allow from 10.10.1.50 to any port 5432 proto tcp comment 'PostgreSQL internal only'\n\n# Bước 6: Kích hoạt tường lửa an toàn:\n$ sudo ufw --force enable\n\n# Bước 7: Kiểm tra danh sách quy tắc có đánh số thứ tự:\n$ sudo ufw status numbered\nStatus: active\n\n     To                         Action      From\n     --                         ------      ----\n[ 1] 22/tcp                     LIMIT IN    Anywhere                   # SSH Rate Limited\n[ 2] 80/tcp                     ALLOW IN    Anywhere                   # HTTP Web\n[ 3] 443/tcp                    ALLOW IN    Anywhere                   # HTTPS Web\n[ 4] 5432/tcp                   ALLOW IN    10.10.1.50                 # PostgreSQL internal only\n[ 5] 22/tcp (v6)                LIMIT IN    Anywhere (v6)              # SSH Rate Limited\n[ 6] 80/tcp (v6)                ALLOW IN    Anywhere (v6)              # HTTP Web\n[ 7] 443/tcp (v6)               ALLOW IN    Anywhere (v6)              # HTTPS Web\n\n# Bước 8: Mọi thứ hoạt động hoàn hảo! Hủy bỏ tiến trình hẹn giờ bảo hiểm:\n$ sudo pkill -f 'sleep 300 && ufw disable'",
              "output": "Status: active\n\n     To                         Action      From\n     --                         ------      ----\n[ 1] 22/tcp                     LIMIT IN    Anywhere                   # SSH Rate Limited\n[ 2] 80/tcp                     ALLOW IN    Anywhere                   # HTTP Web\n[ 3] 443/tcp                    ALLOW IN    Anywhere                   # HTTPS Web\n[ 4] 5432/tcp                   ALLOW IN    10.10.1.50                 # PostgreSQL internal only",
              "annotations": [
                {
                  "part": "Bước 1",
                  "text": "Cơ chế bảo hiểm sleep 300 && ufw disable: Nếu lỡ tay khóa mình ra ngoài, tường lửa tự mở sau 5 phút."
                },
                {
                  "part": "Bước 3",
                  "text": "ufw limit 22/tcp tự động giám sát và chặn IP nếu có trên 6 kết nối bất thường trong 30 giây."
                },
                {
                  "part": "Bước 5",
                  "text": "ufw allow from 10.10.1.50 to any port 5432: Đảm bảo cổng Database không bao giờ bị lộ ra ngoài Internet công khai."
                },
                {
                  "part": "Bước 7",
                  "text": "ufw status numbered: Rất tiện lợi khi cần xóa quy tắc; chỉ cần chạy 'sudo ufw delete [số]'."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-4-nftables-inspect",
          "title": "4.3 Khảo sát Kiến trúc Bảng luật Hạ tầng của nftables trong Kernel",
          "content": "\n        <p>Từ nhân Linux kernel 3.13 và chính thức trở thành mặc định trên Debian 10, Ubuntu 20.04+, RHEL 8+, <strong>nftables</strong> đã thay thế hoàn toàn bộ công cụ <code>iptables</code>, <code>ip6tables</code>, <code>arptables</code>, và <code>ebtables</code>.</p>\n\n        <h3 class=\"lx-h3\">Vì sao Linux chuyển sang nftables?</h3>\n        <ul>\n          <li><strong>Cấu trúc dữ liệu thống nhất:</strong> Không còn sự phân mảnh giữa IPv4 và IPv6; nftables hỗ trợ họ <code>inet</code> dùng chung một bộ quy tắc cho cả 2 giao thức.</li>\n          <li><strong>Hiệu năng vượt trội:</strong> nftables sử dụng máy ảo nhẹ (JIT bytecode) trong kernel, hỗ trợ tra cứu tập hợp (Sets, Maps) với độ phức tạp $O(1)$ thay vì duyệt tuần tự từng dòng quy tắc như iptables.</li>\n          <li><strong>Cập nhật nguyên khối (Atomic Rule Updates):</strong> Khi nạp hàng ngàn quy tắc mới, nftables áp dụng toàn bộ trong một giao dịch nguyên khối (transaction), loại bỏ tình trạng trạng thái trung gian không nhất quán.</li>\n        </ul>\n      ",
          "codeExamples": [
            {
              "title": "Khảo sát bảng luật nftables thời gian thực và tra cứu Set",
              "lang": "bash",
              "code": "# Xem toàn bộ bảng luật nftables đang thực thi trong kernel:\n$ sudo nft list ruleset\n\n# Kiểm tra bảng lọc gói tin inet filter:\n$ sudo nft list table inet ufw\n\n# Tạo thủ công một tập hợp (Set) các IP độc hại và chặn toàn bộ trong 1 quy tắc:\n$ sudo nft add table inet my_filter\n$ sudo nft add set inet my_filter bad_ips { type ipv4_addr ; flags timeout ; }\n$ sudo nft add rule inet my_filter input ip saddr @bad_ips drop\n\n# Thêm IP vào danh sách đen tự động hết hạn sau 1 giờ:\n$ sudo nft add element inet my_filter bad_ips { 203.0.113.55 timeout 1h }",
              "output": "table inet ufw {\n\tchain ufw-before-logging-input {\n\t}\n\tchain ufw-user-input {\n\t\ttcp dport 22 ct state new,untracked limit rate 6/minute burst 3 packets accept\n\t\ttcp dport 80 accept\n\t\ttcp dport 443 accept\n\t\tip saddr 10.10.1.50 tcp dport 5432 accept\n\t}\n}",
              "annotations": [
                {
                  "part": "nft list ruleset",
                  "text": "Cho thấy tầng dưới của UFW thực chất được biên dịch thành các chain và table chuẩn của nftables."
                },
                {
                  "part": "Tập hợp (Set) trong nftables",
                  "text": "Cho phép chứa hàng trăm ngàn IP và lọc với tốc độ cực nhanh mà không làm chậm mạng."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Thiết lập pháo đài UFW theo chuẩn Least Privilege</h4>\n      <p>Giảng viên kích hoạt tường lửa an toàn mà không bao giờ bị khóa khỏi máy chủ từ xa:</p>\n      <pre><code># Bước 1: Mở cổng SSH trước tiên để không bị mất kết nối!\nsudo ufw allow 22/tcp comment 'Allow SSH Management'\n\n# Bước 2: Thiết lập chính sách mặc định: Chặn đến, Cho phép đi\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\n\n# Bước 3: Mở các cổng dịch vụ Web công khai\nsudo ufw allow 80/tcp comment 'HTTP Web'\nsudo ufw allow 443/tcp comment 'HTTPS Web'\n\n# Bước 4: Kích hoạt tường lửa và kiểm tra trạng thái\nsudo ufw --force enable\nsudo ufw status verbose</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Bật UFW khi chưa mở cổng SSH</div>\n          <pre><code># Tai họa kinh điển của người mới:\nsudo ufw default deny incoming\nsudo ufw enable\n\n# Kết quả: Phiên SSH bị ngắt ngay lập tức,\n# máy chủ bị cô lập hoàn toàn khỏi mạng!</code></pre>\n          <p class=\"lx-diff-desc\">Hành động này khóa chết bạn ở ngoài máy chủ vĩnh viễn nếu không có bảng điều khiển Out-of-band / VNC Console của nhà cung cấp VPS!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Mở cổng quản trị trước & Dùng netplan try</div>\n          <pre><code># Luôn kiểm tra cổng SSH trước:\nsudo ufw allow 22/tcp\nsudo ufw enable\n\n# Khi sửa cấu hình mạng, luôn dùng:\nsudo netplan try</code></pre>\n          <p class=\"lx-diff-desc\">Bảo đảm phiên điều khiển từ xa không bao giờ bị gián đoạn, tự phục hồi cấu hình cũ nếu gặp lỗi.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Cấu hình Pháo đài Tường lửa UFW & Giám sát Luật nftables",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.4</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thiết lập hoàn chỉnh chính sách bảo vệ máy chủ bằng UFW: chặn mọi kết nối đến, cho phép ra ngoài, mở cổng web 80/443, giới hạn cổng SSH 2222, và kiểm tra bảng luật thực thi bên dưới nhân Kernel bằng <code>nft</code>.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Ubuntu/Debian có cài sẵn ufw và nftables.</li>\n        <li>Terminal với quyền sudo.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Kiểm tra trạng thái ban đầu của tường lửa:\n          <pre><code>sudo ufw status</code></pre>\n        </li>\n        <li>Thiết lập chính sách cơ sở (Baseline Policy):\n          <pre><code>sudo ufw default deny incoming\nsudo ufw default allow outgoing</code></pre>\n        </li>\n        <li>Khai báo các luật dịch vụ rõ ràng kèm ghi chú:\n          <pre><code>sudo ufw allow 22/tcp comment 'SSH Port'\nsudo ufw allow 80/tcp comment 'HTTP Web'\nsudo ufw allow 443/tcp comment 'HTTPS Web'</code></pre>\n        </li>\n        <li>Bật tường lửa và kiểm tra danh sách luật có đánh số thứ tự:\n          <pre><code>sudo ufw --force enable\nsudo ufw status numbered</code></pre>\n        </li>\n        <li>Khảo sát bảng luật được biên dịch xuống Kernel bởi nftables:\n          <pre><code>sudo nft list table inet ufw | head -n 30</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Lệnh <code>sudo ufw status numbered</code> hiển thị rõ ràng 3 luật 22, 80, 443 ở trạng thái ALLOW; các cổng khác đều bị chặn ngầm định bởi chính sách deny incoming.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Thực hành xóa luật số 2 bằng lệnh <code>sudo ufw delete 2</code> và kiểm tra lại danh sách luật.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Khi làm việc trên máy chủ từ xa, nếu cổng SSH của bạn đã được đổi sang cổng khác (ví dụ cổng 2222), bạn bắt buộc phải gõ <code>sudo ufw allow 2222/tcp</code> thay vì 22 trước khi kích hoạt tường lửa!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Netplan báo <code>Invalid YAML at line ... column ...</code> khi chạy netplan apply</strong></td><td>Tập tin cấu hình YAML trong <code>/etc/netplan/</code> bị lẫn phím Tab hoặc thụt dòng không đồng nhất (YAML chỉ chấp nhận khoảng trắng Space).</td><td>Mở file bằng nano/vim, thay thế toàn bộ ký tự Tab bằng 2 dấu cách và căn chỉnh thẳng hàng các khối cấp bậc.</td></tr>\n          <tr><td><strong>Docker tự ý mở cổng ra Internet dù UFW đã chặn</strong></td><td>Mặc định Docker can thiệp trực tiếp vào bảng NAT của iptables trước khi gói tin đi qua chuỗi lọc của UFW (bỏ qua ufw incoming rules).</td><td>Cấu hình <code>{\"iptables\": false}</code> trong <code>/etc/docker/daemon.json</code> hoặc sử dụng giải pháp <code>ufw-docker</code> utility để đồng bộ luật bảo vệ.</td></tr>\n          <tr><td><strong>Khóa cứng máy chủ do gõ nhầm <code>netplan apply</code> sai thông số IP/Gateway</strong></td><td>Kỹ sư áp dụng cấu hình mạng sai trực tiếp bằng <code>netplan apply</code> khiến máy chủ rớt mạng và mất luôn phiên SSH.</td><td>Luôn luôn sử dụng <code>sudo netplan try</code>. Lệnh này sẽ chờ bạn nhấn Enter xác nhận trong 120 giây; nếu mất kết nối nó sẽ tự động hoàn tác về cấu hình mạng cũ.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Nguyên tắc Không tin tưởng mặc định (Default Deny):</strong> Tường lửa của máy chủ sản xuất phải luôn ở trạng thái <code>deny incoming</code>. Mọi cổng mở ra đều phải có lý do nghiệp vụ rõ ràng và được ghi chú bằng cờ <code>comment</code>.</li>\n        <li><strong>Giới hạn tốc độ kết nối SSH chống Brute Force (Rate Limiting):</strong> Sử dụng lệnh <code>sudo ufw limit 22/tcp</code>. Luật này tự động chặn các địa chỉ IP cố tình kết nối từ 6 lần trở lên trong vòng 30 giây, làm nản lòng các công cụ dò quét tự động.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Netplan Official Documentation:</strong> <a href=\"https://netplan.readthedocs.io/\" target=\"_blank\" rel=\"noopener\">Netplan Reference Manual</a>.</li>\n      <li><strong>Ubuntu UFW Guide:</strong> <a href=\"https://help.ubuntu.com/community/UFW\" target=\"_blank\" rel=\"noopener\">Uncomplicated Firewall Community Documentation</a>.</li>\n      <li><strong>Netfilter & nftables Wiki:</strong> <a href=\"https://wiki.nftables.org/\" target=\"_blank\" rel=\"noopener\">nftables HOWTO Documentation</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Cấu trúc Tệp Netplan YAML Mẫu",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Khóa cấu hình</th><th>Ý nghĩa</th><th>Ví dụ</th></tr></thead>\n        <tbody>\n          <tr><td><code>version: 2</code></td><td>Phiên bản chuẩn của Netplan</td><td>Bắt buộc</td></tr>\n          <tr><td><code>renderer: networkd</code></td><td>Bộ máy thực thi mạng ngầm</td><td><code>networkd</code> (Server) hoặc <code>NetworkManager</code> (Desktop)</td></tr>\n          <tr><td><code>ethernets: &lt;iface&gt;</code></td><td>Tên card mạng vật lý</td><td><code>eth0</code> hoặc <code>enp3s0</code></td></tr>\n          <tr><td><code>dhcp4: false</code></td><td>Tắt DHCP để đặt IP tĩnh</td><td><code>no</code> hoặc <code>false</code></td></tr>\n          <tr><td><code>addresses: [...]</code></td><td>Địa chỉ IP kèm subnet mask CIDR</td><td><code>[192.168.1.100/24]</code></td></tr>\n          <tr><td><code>routes: [{to: default, via: ...}]</code></td><td>Default Gateway định tuyến Internet</td><td><code>via: 192.168.1.1</code></td></tr>\n          <tr><td><code>nameservers: {addresses: [...]}</code></td><td>Địa chỉ máy chủ phân giải DNS</td><td><code>[1.1.1.1, 8.8.8.8]</code></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Kỹ sư kích hoạt tường lửa UFW trên máy chủ Cloud và bị cắt đứt kết nối SSH tức thì",
        "content": "\n      <p><strong>1. Triệu chứng sự cố:</strong> Một kỹ sư sơ cấp mới nhận bàn giao máy chủ Cloud tại Singapore. Để tăng cường bảo mật, kỹ sư gõ lệnh: <code>sudo ufw default deny incoming &amp;&amp; sudo ufw enable</code>. Ngay khi bấm phím Enter, toàn bộ cửa sổ terminal bị đơ cứng, không thể gõ được thêm lệnh nào. Sau 30 giây, kết nối SSH ném thông báo: <code>client_loop: send disconnect: Connection reset by peer</code>. Kỹ sư cố gắng mở terminal mới để SSH lại thì đều nhận được thông báo <code>Connection timed out</code>.</p>\n      \n      <p><strong>2. Điều tra & Chẩn đoán:</strong></p>\n      <p>Kỹ sư phải đăng nhập vào giao diện web điều khiển của nhà cung cấp Cloud (AWS Web Console / VNC Web Terminal). Tại đây, máy chủ vẫn đang chạy bình thường (CPU 2%, RAM ổn định), nhưng cổng 22 từ bên ngoài hoàn toàn bị tường lửa chặn lại.</p>\n      \n      <p><strong>3. Nguyên nhân gốc rễ:</strong> Kỹ sư đã thiết lập chính sách <code>default deny incoming</code> nhưng <strong>chưa hề thêm quy tắc cho phép cổng 22 (SSH)</strong> trước khi kích hoạt tường lửa! Do đó, UFW đã chặn ngay tức khắc chính phiên kết nối SSH mà kỹ sư đang thao tác.</p>\n      \n      <p><strong>4. Biện pháp khắc phục:</strong></p>\n      <pre><code># Từ Web Console cứu hộ, kỹ sư đăng nhập root và kiểm tra:\n# sudo ufw status\nStatus: active\n\n# Bổ sung ngay quy tắc mở cổng SSH:\n# sudo ufw allow 22/tcp comment 'SSH Recovery'\n\n# Hoặc nếu cần mở dải IP riêng:\n# sudo ufw allow from 1.2.3.4 to any port 22 proto tcp\n\n# Kiểm tra lại trạng thái:\n# sudo ufw status numbered</code></pre>\n      <p>Kỹ sư lập tức SSH lại được vào máy chủ bình thường từ máy tính cá nhân.</p>\n      \n      <p><strong>5. Phòng ngừa lâu dài:</strong></p>\n      <ul>\n        <li>Quy định bắt buộc trong checklist vận hành: <strong>Phải mở cổng SSH và kiểm tra kỹ bằng <code>ufw show added</code> trước khi chạy lệnh <code>ufw enable</code></strong>.</li>\n        <li>Luôn đặt cơ chế bảo hiểm tự phục hồi trước khi chạm vào tường lửa từ xa: <code>sudo nohup sh -c 'sleep 300 &amp;&amp; ufw disable' &gt; /dev/null 2&gt;&amp;1 &amp;</code>. Nếu thao tác thành công thì hủy tiến trình sleep; nếu gặp sự cố thì chỉ cần đợi 5 phút để vào lại cứu hộ mà không cần mở Web Console.</li>\n      </ul>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Mở cổng Database (3306, 5432, 6379) ra toàn mạng Internet (0.0.0.0/0)",
            "content": "Các cổng cơ sở dữ liệu như 3306 (MySQL), 5432 (Postgres), 6379 (Redis), 27017 (MongoDB) là mục tiêu săn đón hàng đầu của các mạng botnet tống tiền (Ransomware). Chúng liên tục quét dải IP toàn cầu để tấn công vét cạn mật khẩu hoặc khai thác lỗ hổng xác thực rỗng. Tuyệt đối KHÔNG chạy lệnh <code>ufw allow 5432</code> mà không có giới hạn nguồn! Bắt buộc phải chỉ định địa chỉ IP máy chủ backend: <code>sudo ufw allow from 10.10.1.50 to any port 5432 proto tcp</code>."
          },
          {
            "title": "Bật tường lửa từ xa mà quên mở cổng SSH và không có cơ chế hoàn tác",
            "content": "Đây là tai nạn kinh điển nhất của người quản trị Linux. Khi bạn chạy <code>ufw default deny incoming</code> và kích hoạt tường lửa mà quên mở cổng 22 (hoặc cổng SSH tùy biến), phiên SSH của bạn sẽ bị cắt đứt ngay tức thì và toàn bộ kết nối bên ngoài bị từ chối. Trên các máy chủ vật lý không có IPMI/KVM hoặc máy ảo cloud không có Web Console, sự cố này đồng nghĩa với việc bạn phải yêu cầu bộ phận kỹ thuật DC cắm màn hình trực tiếp để cứu hộ."
          }
        ],
        "tips": [
          {
            "title": "Dùng netplan try thay vì netplan apply khi chỉnh sửa mạng từ xa",
            "content": "Khi thay đổi IP, subnet mask, gateway hoặc định tuyến tĩnh trong tệp YAML của Netplan, hãy luôn sử dụng lệnh <code>sudo netplan try</code>. Lệnh này có cơ chế đếm ngược 120 giây: nếu bạn bị mất mạng và không bấm phím ENTER để xác nhận, Netplan sẽ tự động khôi phục (rollback) lại toàn bộ cấu hình mạng cũ, giúp bạn không bao giờ bị mất kết nối vĩnh viễn."
          },
          {
            "title": "Dùng ufw limit thay cho ufw allow đối với cổng SSH",
            "content": "Thay vì mở thông thoáng cổng SSH bằng <code>ufw allow 22/tcp</code>, hãy luôn sử dụng <code>sudo ufw limit 22/tcp</code>. UFW sẽ theo dõi lưu lượng và tự động chặn tạm thời bất kỳ địa chỉ IP nào khởi tạo quá 6 kết nối SSH trong vòng 30 giây, giúp dập tắt các đợt quét brute-force của botnet mà không làm ảnh hưởng đến người dùng quản trị hợp lệ."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Cấu hình tường lửa UFW phòng vệ cơ bản cho máy chủ web",
          "problem": "Viết các câu lệnh UFW để: (1) Đặt chính sách mặc định chặn toàn bộ kết nối đến, (2) Cho phép toàn bộ kết nối đi ra ngoài, (3) Mở cổng SSH (22) và (4) Mở cổng Web HTTP (80) & HTTPS (443).",
          "hint": "Sử dụng ufw default deny incoming, ufw default allow outgoing, ufw allow ssh, ufw allow http, ufw allow https và ufw enable.",
          "solutionCode": "sudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow OpenSSH\nsudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw enable",
          "solutionOutput": "Default incoming policy changed to \"deny\"\nDefault outgoing policy changed to \"allow\"\nRules updated\nFirewall is active and enabled on system startup",
          "explanation": "Nguyên tắc vàng của tường lửa là Default Deny (mặc định từ chối tất cả) và chỉ mở đúng các cổng dịch vụ công khai cần thiết. Luôn mở SSH trước khi kích hoạt ufw enable để tránh bị khóa ngoài máy chủ.",
          "annotations": [
            {
              "part": "default deny incoming",
              "text": "Chính sách phòng vệ cốt lõi, từ chối mọi kết nối không khai báo tường minh."
            }
          ],
          "rubric": [
            {
              "criterion": "Chính sách mặc định",
              "pass": "Đặt đúng deny incoming và allow outgoing",
              "excellent": "Áp dụng nguyên tắc Zero Trust / Least Privilege",
              "weight": "50%"
            },
            {
              "criterion": "Mở cổng dịch vụ",
              "pass": "Mở đúng 22, 80, 443",
              "excellent": "Mở SSH trước khi kích hoạt enable để đảm bảo an toàn truy cập",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Giới hạn IP nội bộ truy cập cổng SSH và cơ chế Rate Limiting",
          "problem": "Hãy viết chuỗi lệnh UFW để chỉ cho phép dải mạng nội bộ văn phòng (198.51.100.0/24) truy cập cổng SSH 22, đồng thời áp dụng rate limiting chống dò quét mật khẩu.",
          "hint": "Dùng ufw allow proto tcp from 198.51.100.0/24 to any port 22 hoặc ufw limit ssh.",
          "solutionCode": "# Chỉ cho phép mạng văn phòng truy cập SSH:\nsudo ufw allow from 198.51.100.0/24 to any port 22 proto tcp\n\n# Áp dụng cơ chế Rate Limiting chống Brute-force:\nsudo ufw limit ssh/tcp\n\nsudo ufw status verbose",
          "solutionOutput": "Status: active\nLogging: on (low)\nDefault: deny (incoming), allow (outgoing), disabled (routed)\n\nTo                         Action      From\n--                         ------      ----\n22/tcp                     ALLOW IN    198.51.100.0/24\n22/tcp                     LIMIT IN    Anywhere",
          "explanation": "Giới hạn IP truy cập SSH triệt tiêu hoàn toàn các cuộc tấn công dò quét từ Internet. Quy tắc limit sẽ chặn IP nếu có quá 6 lần kết nối thất bại trong vòng 30 giây.",
          "annotations": [
            {
              "part": "allow from ... to any port 22",
              "text": "Thu hẹp bề mặt tấn công của cổng quản trị hạ tầng."
            }
          ],
          "rubric": [
            {
              "criterion": "Phân quyền theo CIDR",
              "pass": "Dùng đúng from 198.51.100.0/24",
              "excellent": "Giới hạn giao thức tcp chuẩn xác",
              "weight": "50%"
            },
            {
              "criterion": "Chống Brute-force",
              "pass": "Dùng lệnh ufw limit",
              "excellent": "Kiểm tra lại bằng ufw status verbose hiển thị đúng quy tắc",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Chẩn đoán và mở cổng cho cụm dịch vụ giao tiếp đa máy chủ",
          "problem": "Máy chủ ứng dụng (10.0.1.50) không thể kết nối tới máy chủ cơ sở dữ liệu PostgreSQL (10.0.1.10) tại cổng 5432. Hãy viết lệnh kiểm tra cổng từ xa và lệnh cấu hình tường lửa tại máy chủ DB.",
          "hint": "Dùng nc -zv hoặc curl từ máy app để kiểm tra, và ufw allow from 10.0.1.50 to any port 5432 trên máy DB.",
          "solutionCode": "# 1. Tại máy App (10.0.1.50) - Kiểm tra kết nối socket:\nnc -zv 10.0.1.10 5432\n\n# 2. Tại máy Database (10.0.1.10) - Mở cổng riêng cho IP máy App:\nsudo ufw allow from 10.0.1.50 to any port 5432 proto tcp comment \"Allow App Server DB access\"\n\n# 3. Xác thực lại kết nối:\nnc -zv 10.0.1.10 5432",
          "solutionOutput": "Connection to 10.0.1.10 5432 port [tcp/postgresql] succeeded!",
          "explanation": "Tiện ích nc -zv kiểm tra bắt tay TCP 3 bước từ xa mà không cần cài đặt client PostgreSQL. Cấu hình tường lửa chỉ mở đúng cho IP máy App, không bao giờ mở cổng 5432 ra Internet.",
          "annotations": [
            {
              "part": "nc -zv",
              "text": "Công cụ chẩn đoán mở cổng TCP nhanh gọn và chính xác nhất."
            }
          ],
          "rubric": [
            {
              "criterion": "Chẩn đoán mạng",
              "pass": "Dùng đúng nc hoặc telnet/curl",
              "excellent": "Xác định chính xác trạng thái từ chối kết nối (Connection refused vs timed out)",
              "weight": "50%"
            },
            {
              "criterion": "Cấu hình bảo mật DB",
              "pass": "Mở đúng cổng 5432",
              "excellent": "Giới hạn nghiêm ngặt duy nhất IP máy App và có comment giải thích",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Netplan là lớp cấu hình mạng khai báo YAML chuẩn trên Ubuntu, tự động chuyển đổi thành cấu hình cho systemd-networkd hoặc NetworkManager.",
        "Luôn sử dụng lệnh sudo netplan try khi thay đổi thông số mạng để có cơ chế tự động hoàn tác sau timeout nếu mất kết nối.",
        "Chính sách bảo mật cốt lõi của tường lửa là Default Deny Incoming (chặn tất cả luồng vào) và chỉ mở các cổng dịch vụ thiết yếu.",
        "Tuyệt đối mở cổng SSH (sudo ufw allow 22/tcp) TRƯỚC KHI kích hoạt tường lửa để tránh bị khóa vĩnh viễn ở ngoài máy chủ.",
        "nftables là hệ thống lọc gói tin và tường lửa thế hệ mới trong nhân Linux Kernel, thay thế toàn bộ họ iptables/ip6tables/arptables/ebtables."
      ],
      "generalInfo": {
        "duration": "55 phút",
        "targetAudience": "Network Sysadmin, Cloud Infrastructure Engineer, SRE",
        "prerequisites": "Hiểu mô hình mạng IP/Port, lệnh ip và ss (Bài 2.7), quyền root",
        "environment": "Ubuntu 22.04 LTS (Netplan/UFW) hoặc Rocky Linux 9 (NetworkManager/nftables)",
        "materials": "Terminal Linux, quyền sudo, gói ufw, nftables, iproute2"
      },
      "nextLessonPreview": "Trong Bài 3.5, chúng ta sẽ bước lên cấp độ Gia cố Bảo mật Toàn diện: cấu hình sshd_config chuẩn CIS Benchmark, dựng hệ thống phòng vệ tự động Fail2ban và kiểm toán hệ thống với auditd.",
      "quiz": [
        {
          "question": "Tại sao kỹ sư quản trị hệ thống luôn được khuyến cáo dùng 'sudo netplan try' thay vì 'sudo netplan apply' khi cấu hình mạng từ xa?",
          "options": [
            "Để script chạy nhanh hơn",
            "Lệnh netplan try có đồng hồ đếm ngược; nếu cấu hình làm mất kết nối mạng và người dùng không nhấn Enter xác nhận, hệ thống sẽ tự động hoàn tác lại cấu hình cũ",
            "Để nạp cấu hình mà không cần quyền root",
            "Để tự động xin địa chỉ IP mới từ DHCP"
          ],
          "explanation": "netplan try là tính năng an toàn sống còn ngăn chặn nguy cơ cô lập máy chủ từ xa khi vô tình gõ sai subnet mask hoặc gateway.",
          "correctIndex": 1
        },
        {
          "question": "Lệnh UFW nào sau đây cấu hình giới hạn kết nối chống tấn công dò quét brute-force trên cổng SSH?",
          "options": [
            "sudo ufw limit 22/tcp",
            "sudo ufw deny 22/tcp",
            "sudo ufw reject 22/tcp",
            "sudo ufw disable 22/tcp"
          ],
          "explanation": "Cờ limit tự động áp dụng luật rate-limiting, chặn các IP cố gắng kết nối trên 6 lần trong vòng 30 giây.",
          "correctIndex": 0
        },
        {
          "question": "Khi một gói tin mạng đi vào máy chủ Linux, cơ chế xử lý tường lửa hiện đại trong nhân Linux (thay thế cho iptables cũ) là gì?",
          "options": [
            "nftables (Netfilter subsystem)",
            "ipchains",
            "ipfw",
            "route-filter"
          ],
          "correctIndex": 0,
          "explanation": "nftables là hệ thống lọc gói tin và dịch địa chỉ mạng (NAT) hiện đại của nhân Linux, thay thế cho toàn bộ các công cụ cũ như iptables, ip6tables, arptables và ebtables với hiệu năng cao hơn và cú pháp thống nhất."
        }
      ],
      "reflectionQuestion": "Một quản trị viên cài đặt Docker trên máy chủ Ubuntu và khởi động container Nginx bằng lệnh: `docker run -d -p 8080:80 nginx`. Trước đó, máy chủ đã bật UFW với chính sách chặn mọi kết nối đến ngoại trừ cổng 22. Quản trị viên ngạc nhiên khi thấy người ngoài Internet vẫn có thể truy cập thẳng vào `http://<IP>:8080`. Hãy giải thích cơ chế kỹ thuật tại sao Docker có thể vượt mặt UFW và đưa ra cách xử lý an toàn.",
      "reflectionHint": "Gợi ý: Cơ chế: Docker chèn các quy tắc `PREROUTING` và `DOCKER` trực tiếp vào bảng `nat` và `filter` của iptables trước các chuỗi kiểm tra của UFW, do đó gói tin được chuyển tiếp tới container trước khi UFW có cơ hội can thiệp. Cách xử lý: 1. Chỉ định rõ IP bind khi chạy Docker: `docker run -p 127.0.0.1:8080:80 nginx` để app chỉ lắng nghe localhost, sau đó đưa qua reverse proxy được UFW kiểm soát. 2. Hoặc sử dụng cấu hình iptables=false hoặc công cụ đồng bộ `ufw-docker`."
    },
    {
      "id": "lx-3-05",
      "number": "3.5",
      "title": "Gia cố Bảo mật Máy chủ theo hướng Phòng thủ (sshd_config, Fail2ban, Auditd, Cập nhật bảo mật)",
      "subtitle": "Xây dựng hệ thống phòng thủ đa lớp: Gia cố SSH chuẩn CIS Benchmark, tự động khóa IP kẻ tấn công với Fail2ban và giám sát thay đổi file với Auditd",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "1. [Biết - Remember] Nắm vững các chỉ thị gia cố cốt tử trong /etc/ssh/sshd_config theo tiêu chuẩn an ninh quốc tế CIS Benchmark",
        "2. [Hiểu - Understand] Hiểu rõ cơ chế hoạt động của Fail2ban: quét log dịch vụ bằng Regex (filter), phát hiện bất thường và kích hoạt luật chặn IP tại Tường lửa (action)",
        "3. [Vận dụng - Apply] Cài đặt, viết jail cấu hình bảo vệ SSH với fail2ban và thiết lập quy tắc giám sát tệp nhạy cảm với auditd",
        "4. [Phân tích - Analyze] Phân tích báo cáo kiểm toán auditd qua ausearch/aureport và xử lý tình huống máy chủ bị tấn công brute-force liên tục"
      ],
      "intuition": {
        "title": "Tấm khiên thép sshd và Đội đặc nhiệm phản ứng tự động Fail2ban",
        "overview": "Một máy chủ Linux mở cổng ra Internet sẽ bị hàng ngàn botnet tự động dò quét mật khẩu mỗi phút. Gia cố cấu hình phòng thủ và trang bị hệ thống phản ứng chủ động là tiêu chuẩn bắt buộc cho mọi máy chủ sản xuất.",
        "realWorld": "Một công ty tài chính bị hacker dùng botnet dò quét 100,000 mật khẩu mỗi ngày vào cổng SSH. Nhờ gia cố sshd_config chặn mật khẩu, đổi cổng và cấu hình Fail2ban khóa IP vĩnh viễn sau 3 lần gõ sai, số lượng yêu cầu tấn công giảm 99.9% và tài khoản máy chủ an toàn tuyệt đối.",
        "metaphor": "Gia cố sshd_config giống như thay chiếc khóa cửa gỗ bằng khóa vân tay bọc thép (chỉ dùng SSH key, cấm root). Còn Fail2ban là người bảo vệ camera thông minh: bất kỳ ai đứng trước cửa bấm thử chìa khóa sai 3 lần sẽ lập tức bị khóa còng tay và cấm bén mảng tới tòa nhà trong 24 giờ.",
        "boundary": "Fail2ban và Auditd là các giải pháp bảo vệ máy chủ đơn lẻ (Host-based IDS); để đối phó với các cuộc tấn công từ chối dịch vụ quy mô khổng lồ (DDoS), hệ thống cần lớp bảo vệ phân tán ở tầng mạng như Cloudflare Magic Transit hoặc AWS Shield.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Một máy chủ Linux mở cổng ra Internet sẽ bị hàng ngàn botnet tự động dò quét mật khẩu mỗi phút. Gia cố cấu hình phòng thủ và trang bị hệ thống phản ứng chủ động là tiêu chuẩn bắt buộc cho mọi máy chủ sản xuất.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>PermitRootLogin no</code>:</strong> Cấm hoàn toàn đăng nhập trực tiếp bằng tài khoản root</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>PasswordAuthentication no</code>:</strong> Cấm đăng nhập bằng mật khẩu, chỉ dùng khóa SSH</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>fail2ban-client status</code>:</strong> Kiểm tra danh sách các Jail và IP đang bị chặn</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một công ty tài chính bị hacker dùng botnet dò quét 100,000 mật khẩu mỗi ngày vào cổng SSH. Nhờ gia cố sshd_config chặn mật khẩu, đổi cổng và cấu hình Fail2ban khóa IP vĩnh viễn sau 3 lần gõ sai, số lượng yêu cầu tấn công giảm 99.9% và tài khoản máy chủ an toàn tuyệt đối.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Gia cố Cấu hình SSH Daemon (sshd_config) Chuẩn CIS Benchmark</li><li><span class=\"lx-vs-bullet\">•</span> Triển khai Cảnh sát Phản ứng Tự động với Fail2ban</li><li><span class=\"lx-vs-bullet\">•</span> Giám sát Tính Toàn vẹn Hệ thống với Auditd &amp; Tự động Vá lỗi</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Gia cố Bảo mật",
          "content": "<p>Gia cố máy chủ sản xuất tuân theo mô hình phòng thủ theo chiều sâu (Defense in Depth) gồm 3 lớp: cấu hình dịch vụ, phản ứng tự động và ghi nhận kiểm toán:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Công cụ / Chỉ thị</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Tiêu chuẩn CIS Benchmark</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>PermitRootLogin no</code></td>\n            <td>Cấm hoàn toàn đăng nhập trực tiếp bằng tài khoản root</td>\n            <td><code>PermitRootLogin no</code></td>\n            <td>Trong <code>/etc/ssh/sshd_config</code></td>\n            <td>Bắt buộc đăng nhập bằng user thường rồi mới dùng sudo</td>\n          </tr>\n          <tr>\n            <td><code>PasswordAuthentication no</code></td>\n            <td>Cấm đăng nhập bằng mật khẩu, chỉ dùng khóa SSH</td>\n            <td><code>PasswordAuthentication no</code></td>\n            <td>Trong <code>/etc/ssh/sshd_config</code></td>\n            <td>Triệt tiêu 100% nguy cơ bị tấn công brute-force mật khẩu</td>\n          </tr>\n          <tr>\n            <td><code>fail2ban-client status</code></td>\n            <td>Kiểm tra danh sách các Jail và IP đang bị chặn</td>\n            <td><code>sudo fail2ban-client status &lt;jail&gt;</code></td>\n            <td><code>sudo fail2ban-client status sshd</code></td>\n            <td>Hiển thị số lượng IP đang bị ban và tổng số lần tấn công</td>\n          </tr>\n          <tr>\n            <td><code>fail2ban-client unban</code></td>\n            <td>Mở khóa khẩn cấp cho một địa chỉ IP bị chặn nhầm</td>\n            <td><code>sudo fail2ban-client set &lt;jail&gt; unbanip &lt;IP&gt;</code></td>\n            <td><code>sudo fail2ban-client set sshd unbanip 192.168.1.50</code></td>\n            <td>Cứu nguy khi quản trị viên nhập sai mật khẩu bị khóa</td>\n          </tr>\n          <tr>\n            <td><code>auditctl -w</code></td>\n            <td>Đặt bẫy theo dõi truy cập vào tệp tin nhạy cảm</td>\n            <td><code>auditctl -w &lt;path&gt; -p &lt;perms&gt; -k &lt;key&gt;</code></td>\n            <td><code>sudo auditctl -w /etc/passwd -p wa -k passwd_changes</code></td>\n            <td>Ghi lại chi tiết ai đã sửa đổi tệp tin người dùng</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-3-5-sshd-hardening",
          "title": "4.1 Gia cố Cấu hình SSH Daemon (sshd_config) Chuẩn CIS Benchmark",
          "content": "\n        <p>Giao thức SSH là mục tiêu tấn công tự động số 1 trên Internet. Trung bình một máy chủ công khai nhận hàng nghìn lượt dò quét mỗi ngày từ các botnet. Do đó, việc cấu hình máy chủ SSH theo chuẩn <strong>CIS Linux Benchmark</strong> và <strong>NIST SP 800-123</strong> là yêu cầu bắt buộc đối với mọi hệ thống sản xuất.</p>\n\n        <p>Trên các bản phân phối Linux mới, tệp cấu hình chính <code>/etc/ssh/sshd_config</code> chứa dòng lệnh <code>Include /etc/ssh/sshd_config.d/*.conf</code>. Chuẩn mực quản trị là không sửa file chính, mà tạo một tệp riêng biệt ví dụ: <code>/etc/ssh/sshd_config.d/99-hardening.conf</code> để dễ quản lý và không bị ghi đè khi nâng cấp gói openssh-server.</p>\n\n        <h3 class=\"lx-h3\">Bảng chỉ thị gia cố SSH Daemon chuẩn CIS Benchmark</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Chỉ thị cấu hình</th>\n              <th>Giá trị CIS</th>\n              <th>Mục đích an ninh</th>\n              <th>Lưu ý an toàn sống còn</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>PermitRootLogin</code></td>\n              <td><code>no</code></td>\n              <td>Cấm tài khoản <code>root</code> đăng nhập SSH trực tiếp. Kẻ tấn công không thể nhắm vào tên người dùng mặc định.</td>\n              <td>Bắt buộc phải tạo sẵn một tài khoản thường có quyền <code>sudo</code> trước khi kích hoạt!</td>\n            </tr>\n            <tr>\n              <td><code>PasswordAuthentication</code></td>\n              <td><code>no</code></td>\n              <td>Vô hiệu hóa hoàn toàn xác thực bằng mật khẩu; bắt buộc dùng khóa mã hóa bất đối xứng SSH Key.</td>\n              <td><strong>CỰC KỲ NGUY HIỂM:</strong> Phải chắc chắn bạn đã copy SSH Public Key lên server và đăng nhập thử thành công bằng key!</td>\n            </tr>\n            <tr>\n              <td><code>PubkeyAuthentication</code></td>\n              <td><code>yes</code></td>\n              <td>Bật cơ chế xác thực bằng SSH Key cặp (khuyên dùng ed25519 hoặc rsa 4096-bit).</td>\n              <td>Tiêu chuẩn vàng về bảo mật truy cập từ xa.</td>\n            </tr>\n            <tr>\n              <td><code>MaxAuthTries</code></td>\n              <td><code>3</code></td>\n              <td>Chỉ cho phép thử sai tối đa 3 lần cho mỗi phiên kết nối trước khi ngắt phiên.</td>\n              <td>Làm chậm đáng kể tốc độ vét cạn mật mã của botnet.</td>\n            </tr>\n            <tr>\n              <td><code>X11Forwarding</code></td>\n              <td><code>no</code></td>\n              <td>Tắt tính năng chuyển tiếp giao diện đồ họa X11.</td>\n              <td>Ngăn chặn việc phần mềm độc hại can thiệp vào đồ họa từ xa.</td>\n            </tr>\n            <tr>\n              <td><code>ClientAliveInterval</code></td>\n              <td><code>300</code></td>\n              <td>Gửi gói tin kiểm tra kết nối sau mỗi 300 giây (5 phút).</td>\n              <td>Kết hợp với <code>ClientAliveCountMax 2</code> để tự ngắt các phiên SSH bị bỏ quên, giải phóng tài nguyên.</td>\n            </tr>\n          </tbody>\n        </table></div>\n\n        <div class=\"lx-callout-danger\">\n          <strong>⚠️ QUY TRÌNH THỰC THI AN TOÀN TUYỆT ĐỐI CHO SSH:</strong><br/>\n          1. Chạy lệnh kiểm tra cú pháp: <code>sudo sshd -t</code>. Nếu có lỗi, sshd sẽ chỉ rõ số dòng bị sai.<br/>\n          2. Sau khi chạy <code>sudo systemctl reload ssh</code>, <strong>TUYỆT ĐỐI KHÔNG ĐÓNG CỬA SỔ TERMINAL HIỆN TẠI!</strong><br/>\n          3. Mở một cửa sổ Terminal mới trên máy của bạn và chạy: <code>ssh username@server_ip</code> để kiểm tra đăng nhập.<br/>\n          4. Chỉ khi cửa sổ mới đăng nhập thành công vào server thì mới được phép đóng cửa sổ cũ. Nếu gặp sự cố, bạn vẫn còn cửa sổ cũ với quyền sudo để sửa lại cấu hình ngay lập tức!\n        </div>\n      ",
          "codeExamples": [
            {
              "title": "Tệp gia cố /etc/ssh/sshd_config.d/99-hardening.conf và quy trình reload an toàn",
              "lang": "ini",
              "code": "# /etc/ssh/sshd_config.d/99-hardening.conf\n# Gia cố SSH Daemon chuẩn CIS Benchmark & NIST SP 800-123\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nMaxAuthTries 3\nClientAliveInterval 300\nClientAliveCountMax 2\nX11Forwarding no\nMaxSessions 5\nAllowTcpForwarding no",
              "output": "# Bước 1: BẮT BUỘC - Kiểm tra tính hợp lệ của toàn bộ cấu hình:\n$ sudo sshd -t\n# (Không có thông báo lỗi = Cú pháp chuẩn xác 100%)\n\n# Bước 2: Tải lại dịch vụ (dùng reload, không dùng restart để không ngắt phiên cũ):\n$ sudo systemctl reload ssh\n# (Trên họ RHEL/Rocky, tên dịch vụ là sshd: sudo systemctl reload sshd)\n\n# Bước 3: Mở một terminal mới trên máy cá nhân để kiểm thử:\n$ ssh -i ~/.ssh/id_ed25519 devops@192.168.1.150\nWelcome to Ubuntu 24.04 LTS ...\ndevops@srv-prod:~$ ",
              "annotations": [
                {
                  "part": "sudo sshd -t",
                  "text": "Kiểm tra cú pháp toàn diện. Lỗi chính tả nhỏ như viết sai 'PasswordAuthenticaton' sẽ được báo ngay."
                },
                {
                  "part": "Dùng 'systemctl reload ssh' thay vì 'restart'",
                  "text": "Reload chỉ yêu cầu daemon đọc lại cấu hình mới cho các kết nối sau này, hoàn toàn không làm gián đoạn hay ngắt các phiên SSH đang chạy."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-5-fail2ban-setup",
          "title": "4.2 Triển khai Cảnh sát Phản ứng Tự động với Fail2ban",
          "content": "\n        <p><strong>Fail2ban</strong> là một dịch vụ bảo vệ máy chủ theo thời gian thực viết bằng Python. Cơ chế hoạt động của nó cực kỳ thông minh:</p>\n        <ol>\n          <li>Liên tục theo dõi các tệp nhật ký hệ thống (như <code>/var/log/auth.log</code> hoặc journald) bằng biểu thức chính quy (regex filter).</li>\n          <li>Đếm số lần thử đăng nhập thất bại của từng địa chỉ IP trong một khoảng thời gian quan sát (<code>findtime</code>).</li>\n          <li>Nếu số lần vi phạm vượt ngưỡng (<code>maxretry</code>), Fail2ban sẽ lập tức triệu hồi tường lửa (UFW hoặc nftables) để chèn một quy tắc chặn đứng địa chỉ IP đó trong thời gian phạt (<code>bantime</code>).</li>\n        </ol>\n\n        <h3 class=\"lx-h3\">Cấu hình chuẩn trong /etc/fail2ban/jail.local</h3>\n        <p>Không bao giờ chỉnh sửa tệp mặc định <code>jail.conf</code> vì nó sẽ bị ghi đè khi cập nhật phần mềm. Thay vào đó, hãy sao chép hoặc tạo tệp mới tại <code>/etc/fail2ban/jail.local</code>. Tệp này sẽ ghi đè các tham số cần thiết.</p>\n        <ul>\n          <li><code>ignoreip</code>: <strong>BẮT BUỘC KHAI BÁO!</strong> Danh sách các địa chỉ IP hoặc dải mạng nội bộ an toàn (ví dụ: IP tĩnh văn phòng, 127.0.0.1) mà Fail2ban <strong>tuyệt đối không bao giờ được phép chặn</strong>, phòng trường hợp chính bạn gõ nhầm mật khẩu nhiều lần.</li>\n          <li><code>bantime = 2h</code>: Thời gian khóa IP vi phạm (ví dụ 2 giờ hoặc 24 giờ).</li>\n          <li><code>findtime = 10m</code>: Cửa sổ quan sát thời gian (10 phút).</li>\n          <li><code>maxretry = 3</code>: Số lần thử sai tối đa trong khoảng findtime trước khi bị khóa.</li>\n        </ul>\n      ",
          "codeExamples": [
            {
              "title": "Tệp cấu hình /etc/fail2ban/jail.local và lệnh vận hành fail2ban-client",
              "lang": "ini",
              "code": "# /etc/fail2ban/jail.local\n[DEFAULT]\n# Danh sách IP an toàn không bao giờ bị chặn (Loopback & Mạng nội bộ):\nignoreip = 127.0.0.1/8 ::1 192.168.1.0/24 203.0.113.10\nbantime  = 2h\nfindtime = 10m\nmaxretry = 3\nbanaction = ufw\n\n[sshd]\nenabled = true\nport    = ssh\nlogpath = %(sshd_log)s\nbackend = systemd",
              "output": "# Khởi động và kiểm tra trạng thái của Jail sshd:\n$ sudo systemctl enable --now fail2ban\n$ sudo fail2ban-client status sshd\nStatus for the jail: sshd\n|- Filter\n|  |- Currently failed: 1\n|  |- Total failed:     28\n|  `- Journal matches:  _SYSTEMD_UNIT=ssh.service + _COMM=sshd\n`- Actions\n   |- Currently banned: 2\n   |- Total banned:     15\n   `- Banned IP list:   198.51.100.42 203.0.113.88\n\n# Mở khóa khẩn cấp một địa chỉ IP (Unban IP):\n$ sudo fail2ban-client set sshd unbanip 198.51.100.42\n1",
              "annotations": [
                {
                  "part": "ignoreip",
                  "text": "Phòng vệ sinh tử chống việc quản trị viên tự khóa chính mình ra khỏi máy chủ."
                },
                {
                  "part": "backend = systemd",
                  "text": "Cho phép Fail2ban đọc trực tiếp nhật ký nhị phân từ journald thay vì đọc file văn bản auth.log, giúp tăng tốc độ và độ tin cậy."
                },
                {
                  "part": "fail2ban-client set sshd unbanip [IP]",
                  "text": "Lệnh giải cứu tức thì một địa chỉ IP bị khóa nhầm."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-5-fail2ban-cli",
          "title": "4.3 Giám sát Tính Toàn vẹn Hệ thống với Auditd & Tự động Vá lỗi",
          "content": "\n        <p><strong>Auditd (Linux Audit Daemon)</strong> là hệ thống ghi nhật ký kiểm toán mức nhân kernel theo chuẩn CAPP (Controlled Access Protection Profile) và NIST SP 800-53 (Control AU-2 / AU-12). Nếu syslog và journald dùng cho việc vận hành thông thường, thì auditd được sinh ra dành riêng cho <strong>điều tra pháp y số và phát hiện xâm nhập (Forensics & Compliance)</strong>.</p>\n\n        <h3 class=\"lx-h3\">Cấu hình Quy tắc Giám sát File Nhạy cảm trong /etc/audit/rules.d/</h3>\n        <p>Cú pháp khai báo quy tắc theo dõi file: <code>-w &lt;đường_dẫn_file&gt; -p &lt;quyền_theo_dõi&gt; -k &lt;nhãn_key&gt;</code></p>\n        <ul>\n          <li><code>-w /etc/shadow</code>: Đường dẫn file cần canh gác (watch).</li>\n          <li><code>-p wa</code>: Theo dõi khi có hành động ghi (<code>w</code> - write) hoặc sửa thuộc tính (<code>a</code> - attribute change). Ngoài ra còn có <code>r</code> (read) và <code>x</code> (execute).</li>\n          <li><code>-k identity_changes</code>: Gán nhãn nhận diện (key) giúp việc truy vấn log sau này cực kỳ nhanh chóng bằng lệnh <code>ausearch -k identity_changes</code>.</li>\n        </ul>\n      ",
          "codeExamples": [
            {
              "title": "Thiết lập quy tắc giám sát tệp /etc/sudoers và truy vết vi phạm",
              "lang": "bash",
              "code": "# 1. Tạo tệp quy tắc kiểm toán: /etc/audit/rules.d/99-security.rules\n$ sudo tee /etc/audit/rules.d/99-security.rules << 'EOF'\n-w /etc/passwd -p wa -k identity_changes\n-w /etc/shadow -p wa -k identity_changes\n-w /etc/sudoers -p wa -k privilege_escalation\n-w /etc/sudoers.d/ -p wa -k privilege_escalation\nEOF\n\n# 2. Nạp lại quy tắc kiểm toán vào kernel:\n$ sudo augenrules --load\n$ sudo auditctl -l\n-w /etc/passwd -p wa -k identity_changes\n-w /etc/shadow -p wa -k identity_changes\n-w /etc/sudoers -p wa -k privilege_escalation\n\n# 3. Khi có kẻ gian can thiệp vào /etc/sudoers, điều tra tức thì bằng ausearch:\n$ sudo ausearch -k privilege_escalation --interpret\ntype=SYSCALL msg=audit(11/04/2026 08:45:10.120:412) : arch=x86_64 syscall=openat success=yes exit=3 a0=ffffff9c a1=7ffd3a a2=241 a3=1b6 items=2 ppid=1420 pid=2890 auid=1001 uid=0 gid=0 euid=0 comm=nano exe=/bin/nano key=\"privilege_escalation\"\ntype=PATH msg=audit(11/04/2026 08:45:10.120:412) : item=0 name=\"/etc/sudoers\" inode=131075 dev=08:01 mode=0100440 ouid=0 ogid=0",
              "output": "type=SYSCALL msg=audit(...) : arch=x86_64 syscall=openat success=yes items=2 ppid=1420 pid=2890 auid=1001 uid=0 gid=0 comm=nano exe=/bin/nano key=\"privilege_escalation\"\ntype=PATH msg=audit(...) : item=0 name=\"/etc/sudoers\" inode=131075 mode=0100440",
              "annotations": [
                {
                  "part": "auid=1001",
                  "text": "Audit UID nguyên bản của người dùng đăng nhập ban đầu trước khi sudo lên root. Đây là bằng chứng không thể chối cãi khi điều tra nội bộ!"
                },
                {
                  "part": "comm=nano",
                  "text": "Định danh chính xác chương trình đã được dùng để mở và sửa tệp."
                },
                {
                  "part": "augenrules --load",
                  "text": "Biên dịch các tệp trong rules.d thành cấu hình chuẩn nạp thẳng vào kernel."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Gia cố sshd_config và Cấu hình Jail Fail2ban chuyên nghiệp</h4>\n      <p>Giảng viên tạo cấu hình bảo vệ SSH và kiểm thử cú pháp trước khi nạp lại daemon:</p>\n      <pre><code># 1. Tạo file cấu hình ghi đè an toàn cho SSH daemon\nsudo bash -c 'cat &lt;&lt; \"EOF\" > /etc/ssh/sshd_config.d/99-hardening.conf\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nMaxAuthTries 3\nClientAliveInterval 300\nClientAliveCountMax 2\nX11Forwarding no\nEOF'\n\n# 2. Bắt buộc kiểm tra cú pháp trước khi reload!\nsudo sshd -t\n\n# 3. Nạp lại cấu hình dịch vụ\nsudo systemctl reload sshd\n\n# 4. Cấu hình Fail2ban local jail /etc/fail2ban/jail.local\nsudo bash -c 'cat &lt;&lt; \"EOF\" > /etc/fail2ban/jail.local\n[DEFAULT]\nbantime = 1h\nfindtime = 10m\nmaxretry = 3\nignoreip = 127.0.0.1/8 ::1 192.168.1.0/24\n\n[sshd]\nenabled = true\nport = ssh\nEOF'\nsudo systemctl restart fail2ban</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Sửa trực tiếp jail.conf</div>\n          <pre><code># Sai lầm phổ biến:\nsudo nano /etc/fail2ban/jail.conf\n\n# Sửa trực tiếp cấu hình gốc của package</code></pre>\n          <p class=\"lx-diff-desc\">Tệp <code>jail.conf</code> sẽ bị ghi đè hoàn toàn khi hệ thống cập nhật gói fail2ban qua apt/dnf, làm mất toàn bộ cấu hình bảo mật!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Tạo file jail.local độc lập</div>\n          <pre><code># Chuẩn Sysadmin:\nsudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local\n# Hoặc tạo jail.local chỉ chứa phần ghi đè</code></pre>\n          <p class=\"lx-diff-desc\">Tệp <code>.local</code> có độ ưu tiên cao nhất và được bảo vệ vĩnh viễn không bao giờ bị gói cập nhật ghi đè.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Triển khai Fail2ban & Giám sát Tệp Hệ thống với Auditd",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.5</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Cài đặt Fail2ban, kích hoạt jail bảo vệ SSH, kiểm tra trạng thái hoạt động bằng <code>fail2ban-client</code>, và thiết lập luật kiểm toán bằng <code>auditctl</code> để theo dõi mọi hành vi sửa đổi file <code>/etc/shadow</code>.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Linux Ubuntu/Debian có cài gói <code>fail2ban</code> và <code>auditd</code>.</li>\n        <li>Terminal với quyền sudo.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Cài đặt các gói phần mềm bảo mật thiết yếu:\n          <pre><code>sudo apt-get update && sudo apt-get install -y fail2ban auditd</code></pre>\n        </li>\n        <li>Kích hoạt dịch vụ fail2ban và kiểm tra trạng thái jail sshd:\n          <pre><code>sudo systemctl enable --now fail2ban\nsudo fail2ban-client status sshd</code></pre>\n        </li>\n        <li>Thiết lập luật theo dõi kiểm toán cho file <code>/etc/shadow</code> bằng <code>auditctl</code>:\n          <pre><code>sudo auditctl -w /etc/shadow -p wa -k shadow_access\nsudo auditctl -l</code></pre>\n        </li>\n        <li>Thực hiện một hành vi giả lập (chạy lệnh <code>sudo touch /etc/shadow</code>) để kích hoạt bẫy:\n          <pre><code>sudo touch /etc/shadow</code></pre>\n        </li>\n        <li>Truy vấn nhật ký kiểm toán bằng lệnh <code>ausearch</code>:\n          <pre><code>sudo ausearch -k shadow_access --raw | aureport -f -i</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Lệnh <code>aureport</code> hiển thị chính xác sự kiện truy cập file <code>/etc/shadow</code> kèm timestamp, mã định danh người dùng (UID, AUID) và lệnh đã chạy.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Thực hành tạo một jail tùy biến trong Fail2ban để bảo vệ web server Nginx khỏi các cuộc tấn công quét đường dẫn nhạy cảm (như <code>/wp-login.php</code> hoặc <code>/phpmyadmin</code>).</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Trước khi bật <code>PasswordAuthentication no</code> trong cấu hình SSH, BẮT BUỘC phải mở một tab terminal thứ 2 và thử đăng nhập bằng khóa SSH thành công. Tuyệt đối không đóng phiên SSH hiện tại cho đến khi đã kiểm thử xác thực xong!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Khóa cửa tự nhốt mình ở ngoài khi tắt PasswordAuthentication</strong></td><td>Người dùng tắt mật khẩu trong khi chưa kịp nạp SSH Public Key vào tệp <code>~/.ssh/authorized_keys</code> hoặc quyền của tệp authorized_keys bị sai.</td><td>Giữ nguyên phiên SSH hiện tại, kiểm tra lại quyền <code>chmod 600 ~/.ssh/authorized_keys</code> và kiểm thử kết nối từ một máy khách khác trước khi ngắt kết nối.</td></tr>\n          <tr><td><strong>Fail2ban không chặn bất kỳ IP nào dù log xuất hiện hàng ngàn lần gõ sai mật khẩu</strong></td><td>Trên các distro dùng systemd hiện đại (Ubuntu 22.04+, Debian 12), log SSH không ghi vào <code>/var/log/auth.log</code> nữa mà ghi vào <code>systemd journal</code>. Nếu Fail2ban chưa cấu hình <code>backend = systemd</code> thì nó sẽ quét vào file log rỗng.</td><td>Thêm chỉ thị <code>backend = systemd</code> vào khối <code>[DEFAULT]</code> trong <code>/etc/fail2ban/jail.local</code>.</td></tr>\n          <tr><td><strong>Quản trị viên vô tình gõ sai mật khẩu và bị Fail2ban khóa chính địa chỉ IP của mình</strong></td><td>Cấu hình <code>ignoreip</code> chưa khai báo dải mạng nội bộ hoặc IP cố định của đội ngũ kỹ thuật.</td><td>Đăng nhập qua console cứu hộ và chạy: <code>sudo fail2ban-client set sshd unbanip &lt;IP_cua_ban&gt;</code>, sau đó bổ sung IP đó vào mục <code>ignoreip</code> trong <code>jail.local</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Nguyên tắc Không tin tưởng tài khoản Root:</strong> Luôn đặt <code>PermitRootLogin no</code>. Mọi hành động quản trị phải đi qua tài khoản cá nhân có gắn tên định danh rõ ràng để bảo đảm tính giải trình (Accountability) khi xem nhật ký kiểm toán.</li>\n        <li><strong>Tự động cài đặt các bản vá bảo mật quan trọng:</strong> Cài đặt và kích hoạt gói <code>unattended-upgrades</code> trên Ubuntu/Debian để hệ thống tự động cập nhật các bản vá an ninh Kernel và thư viện mà không cần can thiệp thủ công.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Center for Internet Security (CIS) Linux Benchmarks:</strong> Tiêu chuẩn bảo mật máy chủ quốc tế hàng đầu: <a href=\"https://www.cisecurity.org/cis-benchmarks\" target=\"_blank\" rel=\"noopener\">CIS Benchmarks</a>.</li>\n      <li><strong>Fail2ban Official Manual:</strong> <a href=\"https://www.fail2ban.org/wiki/index.php/Main_Page\" target=\"_blank\" rel=\"noopener\">Fail2ban Configuration Documentation</a>.</li>\n      <li><strong>Linux Audit Daemon (auditd) Documentation:</strong> Hướng dẫn kiểm toán hệ thống chuẩn Red Hat Enterprise Linux.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Danh sách Kiểm tra (Checklist) Gia cố Máy chủ Chuẩn CIS",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Hạng mục kiểm tra</th><th>Thiết lập khuyến nghị</th><th>Độ ưu tiên</th></tr></thead>\n        <tbody>\n          <tr><td>SSH Root Login</td><td><code>PermitRootLogin no</code></td><td>Cực kỳ cao (Khẩn cấp)</td></tr>\n          <tr><td>SSH Password Login</td><td><code>PasswordAuthentication no</code></td><td>Cực kỳ cao (Khẩn cấp)</td></tr>\n          <tr><td>Số lần thử mật khẩu</td><td><code>MaxAuthTries 3</code></td><td>Cao</td></tr>\n          <tr><td>Thời gian rảnh tự ngắt</td><td><code>ClientAliveInterval 300</code></td><td>Trung bình</td></tr>\n          <tr><td>Phản ứng tự động</td><td>Cài đặt Fail2ban cho SSH</td><td>Cao</td></tr>\n          <tr><td>Giám sát tệp nhạy cảm</td><td>Bật auditd theo dõi <code>/etc/shadow</code></td><td>Cao</td></tr>\n          <tr><td>Tự động vá lỗi</td><td>Bật <code>unattended-upgrades</code></td><td>Cao</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Chặn đứng đợt tấn công Brute-force 45.000 request/giờ vào cổng SSH máy chủ công khai",
        "content": "\n      <p><strong>1. Triệu chứng sự cố:</strong> Hệ thống cảnh báo CPU của máy chủ web tăng vọt 60% dù lưu lượng người dùng truy cập web rất thấp. Khi kiểm tra log xác thực <code>journalctl -u ssh.service -n 50</code>, màn hình tràn ngập hàng chục nghìn thông báo: <code>Failed password for invalid user admin from 185.220.101.5 port 41200 ssh2</code>.</p>\n      \n      <p><strong>2. Điều tra & Chẩn đoán:</strong></p>\n      <pre><code># Đếm số lượng request thất bại trong 10 phút qua:\n$ sudo journalctl -u ssh.service --since \"10 minutes ago\" | grep \"Failed password\" | wc -l\n8420\n\n# Kiểm tra các IP gửi nhiều yêu cầu nhất:\n$ sudo journalctl -u ssh.service --since \"1 hour ago\" | awk '/Failed password/ {print $(NF-3)}' | sort | uniq -c | sort -nr | head -n 5\n  14200 185.220.101.5\n   9800 194.26.29.112\n   6500 45.154.255.89</code></pre>\n      <p>Một mạng lưới botnet đang sử dụng từ điển mật khẩu hàng triệu từ để vét cạn tài khoản máy chủ, gây quá tải tiến trình sshd và nghẽn tài nguyên CPU.</p>\n      \n      <p><strong>3. Nguyên nhân gốc rễ:</strong> Máy chủ mới dựng vẫn giữ cấu hình mặc định: cho phép xác thực mật khẩu (<code>PasswordAuthentication yes</code>) và chưa cài đặt dịch vụ phản ứng tự động Fail2ban.</p>\n      \n      <p><strong>4. Biện pháp khắc phục:</strong></p>\n      <pre><code># Bước 1: Khóa xác thực mật khẩu trong sshd_config.d/99-hardening.conf:\nPasswordAuthentication no\nPermitRootLogin no\n\n# Bước 2: Kiểm tra cú pháp và nạp lại daemon:\n$ sudo sshd -t && sudo systemctl reload ssh\n\n# Bước 3: Cài đặt và kích hoạt Fail2ban để tự động xử lý botnet:\n$ sudo apt install -y fail2ban\n$ sudo systemctl enable --now fail2ban\n$ sudo fail2ban-client status sshd</code></pre>\n      <p>Chỉ sau 2 phút, Fail2ban đã tóm gọn và tống giam toàn bộ các địa chỉ IP của botnet vào danh sách chặn của tường lửa UFW. Tỷ lệ CPU của máy chủ lập tức hạ nhiệt từ 60% xuống còn 1.5%.</p>\n      \n      <p><strong>5. Phòng ngừa lâu dài:</strong></p>\n      <ul>\n        <li>Quy định bắt buộc đối với mọi máy chủ kết nối Internet: Vô hiệu hóa hoàn toàn xác thực mật khẩu ngay từ thời điểm tạo máy ảo.</li>\n        <li>Triển khai <code>unattended-upgrades</code> để hệ thống tự động tải và cập nhật các bản vá lỗ hổng zero-day cho OpenSSH mà không cần can thiệp thủ công.</li>\n      </ul>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Tắt PasswordAuthentication khi chưa nạp SSH Key hoặc đóng phiên SSH hiện tại quá sớm",
            "content": "Sai lầm thảm họa số 1 của quản trị viên là đặt <code>PasswordAuthentication no</code> trong tệp cấu hình SSH, chạy lệnh restart rồi vội vàng đóng cửa sổ terminal hiện tại trong khi máy tính của bạn chưa hề nạp SSH Public Key vào tệp <code>~/.ssh/authorized_keys</code> của server! Kết quả là bạn bị khóa vĩnh viễn ở ngoài cửa. Luôn luôn kiểm tra cú pháp bằng <code>sudo sshd -t</code>, dùng <code>reload</code> thay vì restart, và mở một terminal thứ hai để đăng nhập thử thành công trước khi đóng phiên làm việc ban đầu."
          },
          {
            "title": "Quên khai báo ignoreip trong cấu hình Fail2ban",
            "content": "Nếu bạn không đưa địa chỉ IP tĩnh cá nhân hoặc dải mạng VPN của công ty vào dòng <code>ignoreip</code> trong <code>/etc/fail2ban/jail.local</code>, chỉ cần một công cụ tự động hoặc một lần bạn gõ sai thông số kết nối quá 3 lần, Fail2ban sẽ coi bạn là kẻ tấn công và thẳng tay chặn kết nối của chính bạn trong 2 giờ!"
          }
        ],
        "tips": [
          {
            "title": "Luôn kiểm tra tính hợp lệ bằng sshd -t trước khi nạp lại dịch vụ",
            "content": "Lệnh <code>sudo sshd -t</code> kiểm tra toàn diện cú pháp của toàn bộ các file trong <code>/etc/ssh/sshd_config</code> và thư mục <code>sshd_config.d/</code>. Nếu có bất kỳ dòng nào sai chính tả hoặc không được hỗ trợ, lệnh sẽ báo rõ số dòng lỗi để bạn khắc phục, giúp bạn không bao giờ làm sập dịch vụ SSH đang chạy."
          },
          {
            "title": "Bật cập nhật bản vá bảo mật tự động với unattended-upgrades",
            "content": "Trên Ubuntu/Debian, hãy cài đặt gói <code>unattended-upgrades</code> và kích hoạt nó. Hệ thống sẽ tự động quét kho lưu trữ của nhà phân phối mỗi đêm và âm thầm cài đặt các bản vá lỗ hổng bảo mật khẩn cấp (Security Updates) của kernel và các thư viện cốt lõi, bảo vệ máy chủ an toàn trước các cuộc tấn công khai thác lỗ hổng đã biết."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Rà soát cấu hình sshd_config theo khuyến nghị CIS Benchmark",
          "problem": "Lệnh nào sau đây cho phép kiểm tra cú pháp của tệp cấu hình OpenSSH Server (/etc/ssh/sshd_config) trước khi gọi lệnh reload để đảm bảo không bị mất kết nối?",
          "hint": "Sử dụng lệnh sshd với cờ kiểm tra -t.",
          "solutionCode": "sudo sshd -t",
          "solutionOutput": "# Lệnh thực thi im lặng không in gì ra tức cú pháp cấu hình SSH hoàn toàn hợp lệ",
          "explanation": "Cờ -t (test mode) kiểm tra toàn diện tính hợp lệ của cú pháp sshd_config và các khóa host key. Bất kỳ lỗi chính tả nào cũng sẽ được cảnh báo ngay mà không làm sập tiến trình SSH đang chạy.",
          "annotations": [
            {
              "part": "sshd -t",
              "text": "Thao tác sống còn của mọi kỹ sư hệ thống trước khi reload sshd."
            }
          ],
          "rubric": [
            {
              "criterion": "Kiểm tra cú pháp",
              "pass": "Dùng đúng sshd -t",
              "excellent": "Giải thích được rủi ro bị khóa ngoài (lockout) nếu sửa sai file cấu hình",
              "weight": "50%"
            },
            {
              "criterion": "Bảo mật SSH",
              "pass": "Biết cách reload dịch vụ",
              "excellent": "Sử dụng systemctl reload thay vì restart để giữ phiên kết nối hiện tại",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Cấu hình Fail2ban bảo vệ cổng SSH chống Brute-force",
          "problem": "Hãy viết tệp cấu hình /etc/fail2ban/jail.local để tự động cấm (ban) IP trong vòng 1 ngày nếu nhập sai mật khẩu SSH 5 lần trong vòng 10 phút.",
          "hint": "Cấu hình bantime = 1d, findtime = 10m, maxretry = 5 trong khối [sshd].",
          "solutionCode": "# /etc/fail2ban/jail.local\n[DEFAULT]\nbantime  = 1d\nfindtime = 10m\nmaxretry = 5\n\n[sshd]\nenabled = true\nport    = ssh\n\n# Kích hoạt dịch vụ:\nsudo systemctl restart fail2ban\nsudo fail2ban-client status sshd",
          "solutionOutput": "Status for the jail: sshd\n|- Filter\n|  |- Currently failed: 2\n|  |- Total failed:     45\n`- Actions\n   |- Currently banned: 3\n   |- Banned IP list:   198.51.100.22 203.0.113.88 192.0.2.14",
          "explanation": "Fail2ban theo dõi log /var/log/auth.log và tự động tạo các quy tắc iptables/nftables để chặn IP vi phạm. File jail.local ghi đè jail.conf để không bị mất cấu hình khi cập nhật gói.",
          "annotations": [
            {
              "part": "jail.local",
              "text": "Luôn tạo file .local để ghi đè, không bao giờ sửa trực tiếp file gốc .conf."
            }
          ],
          "rubric": [
            {
              "criterion": "Cấu hình Fail2ban",
              "pass": "Viết đúng bantime, findtime, maxretry",
              "excellent": "Tạo đúng file jail.local và kích hoạt jail sshd",
              "weight": "50%"
            },
            {
              "criterion": "Giám sát jail",
              "pass": "Dùng fail2ban-client status",
              "excellent": "Kiểm tra được danh sách các IP đang bị cấm",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Thiết lập quy tắc giám sát Auditd trên file cấu hình nhạy cảm",
          "problem": "Hãy viết một quy tắc kiểm toán cho auditd để theo dõi mọi hành vi chỉnh sửa hoặc thay đổi thuộc tính trên tệp /etc/passwd và gán key nhận diện là identity_watch.",
          "hint": "Dùng lệnh auditctl -w /etc/passwd -p wa -k identity_watch.",
          "solutionCode": "# 1. Kích hoạt quy tắc tạm thời:\nsudo auditctl -w /etc/passwd -p wa -k identity_watch\n\n# 2. Lưu cố định vào /etc/audit/rules.d/audit.rules:\necho \"-w /etc/passwd -p wa -k identity_watch\" | sudo tee -a /etc/audit/rules.d/audit.rules\n\n# 3. Tra cứu log khi có sự kiện:\nsudo ausearch -k identity_watch",
          "solutionOutput": "type=CONFIG_CHANGE msg=audit(1730700000.123:456): auid=1000 ses=2 op=updated_rules path=\"/etc/passwd\" key=\"identity_watch\" list=4 res=1",
          "explanation": "Cờ -w theo dõi đường dẫn file, -p wa bắt các thao tác ghi (write) và đổi thuộc tính (attribute change), -k identity_watch gán nhãn giúp lọc log cực nhanh bằng công cụ ausearch.",
          "annotations": [
            {
              "part": "-p wa -k identity_watch",
              "text": "Cơ chế audit mức kernel, ghi nhận chính xác UID của người dùng thực hiện sửa đổi."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp auditctl",
              "pass": "Dùng đúng auditctl -w và -k",
              "excellent": "Thiết lập cả quy tắc runtime lẫn quy tắc lưu cố định trong rules.d",
              "weight": "50%"
            },
            {
              "criterion": "Tra cứu kiểm toán",
              "pass": "Dùng đúng ausearch -k",
              "excellent": "Đọc hiểu được sự kiện bảo mật trong log audit.log",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Gia cố SSH daemon (sshd_config) là bước đầu tiên và quan trọng nhất: cấm root login và tắt hoàn toàn xác thực mật khẩu.",
        "Trước khi nạp lại dịch vụ sshd, bắt buộc phải kiểm tra cú pháp bằng lệnh sshd -t để tránh làm gãy daemon.",
        "Fail2ban phân tích nhật ký dịch vụ theo thời gian thực và tự động tạo luật tường lửa tạm thời hoặc vĩnh viễn để chặn IP độc hại.",
        "Không bao giờ sửa trực tiếp file jail.conf; luôn tạo file jail.local để tránh bị ghi đè khi cập nhật gói.",
        "auditd là hệ thống kiểm toán của nhân Linux, cho phép theo dõi và ghi lại bằng chứng không thể chối cãi khi các tệp nhạy cảm bị truy cập hoặc sửa đổi."
      ],
      "generalInfo": {
        "duration": "55 phút",
        "targetAudience": "Security Engineer, Senior Sysadmin, DevSecOps Specialist",
        "prerequisites": "Hiểu phân quyền Linux, SSH chuyên sâu (Bài 2.7) và Tường lửa (Bài 3.4)",
        "environment": "Ubuntu 22.04 LTS / Debian 12 / Rocky Linux 9",
        "materials": "Terminal Linux, quyền sudo, gói fail2ban, auditd, openssh-server"
      },
      "nextLessonPreview": "Trong Bài 3.6, chúng ta sẽ bước sâu vào các cơ chế Bảo mật Kiểm soát Truy cập Bắt buộc (MAC): làm chủ SELinux trên họ RHEL và AppArmor trên họ Debian/Ubuntu.",
      "quiz": [
        {
          "question": "Trước khi chạy 'systemctl reload sshd' sau khi chỉnh sửa file cấu hình sshd_config, lệnh nào sau đây dùng để kiểm tra tính hợp lệ của cú pháp?",
          "options": [
            "sudo sshd -t",
            "sudo sshd --check",
            "sudo systemctl test sshd",
            "sudo ssh-keygen -v"
          ],
          "explanation": "Cờ -t (test) của lệnh sshd kiểm tra cú pháp toàn bộ tệp cấu hình và hiển thị cảnh báo nếu có lỗi mà không khởi chạy tiến trình mới.",
          "correctIndex": 0
        },
        {
          "question": "Tại sao nên cấu hình 'backend = systemd' trong jail.local của Fail2ban trên các distro hiện đại như Ubuntu 22.04+?",
          "options": [
            "Để Fail2ban chạy nhanh hơn",
            "Vì trên hệ thống hiện đại, log xác thực SSH được ghi vào systemd journal thay vì tệp văn bản /var/log/auth.log cũ",
            "Để Fail2ban tự động restart khi gặp sự cố",
            "Để cấp quyền root cho Fail2ban"
          ],
          "explanation": "Nếu không chuyển sang backend systemd, Fail2ban sẽ theo dõi một tệp auth.log không còn được cập nhật và không thể phát hiện các cuộc tấn công.",
          "correctIndex": 1
        },
        {
          "question": "Tại sao việc thiết lập `PermitRootLogin no` trong tệp cấu hình OpenSSH Server lại được coi là nguyên tắc bảo mật bắt buộc theo CIS Benchmark?",
          "options": [
            "Vì buộc kẻ tấn công phải đoán trúng cả username lẫn mật khẩu/khóa, đồng thời mọi thao tác quản trị qua sudo đều được ghi nhận danh tính cá nhân rõ ràng trong audit log",
            "Vì tài khoản root không thể sử dụng khóa SSH Ed25519",
            "Vì Linux không cho phép đăng nhập từ xa qua mạng",
            "Vì lệnh ssh không hỗ trợ mã hóa cho user root"
          ],
          "correctIndex": 0,
          "explanation": "Vô hiệu hóa đăng nhập trực tiếp bằng tài khoản root buộc kỹ sư phải đăng nhập bằng tài khoản cá nhân có tên cụ thể trước, sau đó mới dùng `sudo`. Việc này tạo ra chuỗi kiểm toán trách nhiệm (accountability) rõ ràng, biết chính xác ai đã thực hiện thao tác gì."
        }
      ],
      "reflectionQuestion": "Một máy chủ sau khi gia cố bằng cách đặt `PasswordAuthentication no` và `PermitRootLogin no`. Hôm sau, một lập trình viên mới gia nhập đội ngũ không thể SSH vào server mặc dù đã gửi public key cho quản trị viên thêm vào `~/.ssh/authorized_keys`. Log SSH ghi nhận: `Authentication refused: bad ownership or modes for file /home/dev/.ssh/authorized_keys`. Hãy giải thích nguyên nhân và đưa ra câu lệnh phân quyền chính xác để khắc phục.",
      "reflectionHint": "Gợi ý: Nguyên nhân: SSH Daemon có cơ chế bảo vệ nghiêm ngặt `StrictModes yes` (mặc định bật). Nếu thư mục người dùng (`/home/dev`), thư mục SSH (`~/.ssh`), hoặc tệp `authorized_keys` có quyền ghi cho người dùng khác (Group hoặc Others có quyền write), SSH Daemon sẽ từ chối tải khóa để phòng ngừa rủi ro bị sửa đổi trộm. Khắc phục: `chmod 755 /home/dev && chmod 700 /home/dev/.ssh && chmod 600 /home/dev/.ssh/authorized_keys && chown -R dev:dev /home/dev/.ssh`."
    },
    {
      "id": "lx-3-06",
      "number": "3.6",
      "title": "Cơ chế Bảo mật Kiểm soát Truy cập Bắt buộc: SELinux & AppArmor",
      "subtitle": "Làm chủ cơ chế phòng thủ tối hậu của nhân Linux: Phân biệt DAC vs MAC, giải mã nhãn SELinux Context, điều khiển Booleans và hồ sơ bảo vệ AppArmor",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "1. [Biết - Remember] Phân biệt rõ sự khác nhau giữa Kiểm soát Quyền Tùy ý (DAC) và Kiểm soát Quyền Bắt buộc (MAC)",
        "2. [Hiểu - Understand] Hiểu cấu trúc nhãn ngữ cảnh SELinux Context (user:role:type:level) và các profile AppArmor (Enforce vs Complain)",
        "3. [Vận dụng - Apply] Sử dụng semanage fcontext, restorecon, setsebool để sửa lỗi chặn dịch vụ và aa-status để kiểm tra AppArmor",
        "4. [Phân tích - Analyze] Phân tích log AVC Denied trong audit.log bằng công cụ audit2why và audit2allow để giải quyết sự cố mà không tắt SELinux"
      ],
      "intuition": {
        "title": "Tấm thẻ an ninh sinh trắc học MAC và Người phán xử tối cao Kernel",
        "overview": "Trong mô hình Linux truyền thống (DAC), tài khoản root có quyền lực tuyệt đối để làm mọi thứ. Kiểm soát Truy cập Bắt buộc (MAC - SELinux/AppArmor) thiết lập luật chơi mới: ngay cả root cũng phải tuân thủ chính sách nghiêm ngặt của Kernel.",
        "realWorld": "Một hacker khai thác lỗ hổng Zero-Day của máy chủ web Nginx và chiếm được quyền thực thi mã độc dưới tài khoản root. Tuy nhiên, nhờ SELinux đang ở chế độ Enforcing với nhãn httpd_t, tiến trình Nginx bị Kernel chặn đứng ngay lập tức khi cố đọc tệp /etc/shadow hoặc kết nối ra cổng mạng lạ.",
        "metaphor": "DAC giống như chiếc chìa khóa vạn năng: ai cầm chìa (root) thì mở được mọi căn phòng trong tòa nhà. Còn MAC (SELinux) giống như hệ thống quét vân tay và phân cấp an ninh: dù bạn là Tổng giám đốc (root), bạn cũng không thể bước vào phòng máy chủ nếu hệ thống không gắn thẻ cấp quyền cho vai trò của bạn.",
        "boundary": "SELinux và AppArmor bảo vệ hệ thống trước sự cố rò rỉ phân quyền cục bộ; chúng không thay thế cho tường lửa mạng hoặc mã hóa dữ liệu trên đường truyền.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Trong mô hình Linux truyền thống (DAC), tài khoản root có quyền lực tuyệt đối để làm mọi thứ. Kiểm soát Truy cập Bắt buộc (MAC - SELinux/AppArmor) thiết lập luật chơi mới: ngay cả root cũng phải tuân thủ chính sách nghiêm ngặt của Kernel.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>getenforce / setenforce</code>:</strong> RHEL / CentOS / Rocky</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>restorecon -Rv</code>:</strong> RHEL / Rocky / Fedora</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>setsebool -P</code>:</strong> RHEL / Rocky / Fedora</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một hacker khai thác lỗ hổng Zero-Day của máy chủ web Nginx và chiếm được quyền thực thi mã độc dưới tài khoản root. Tuy nhiên, nhờ SELinux đang ở chế độ Enforcing với nhãn httpd_t, tiến trình Nginx bị Kernel chặn đứng ngay lập tức khi cố đọc tệp /etc/shadow hoặc kết nối ra cổng mạng lạ.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Kiến trúc Nhãn Ngữ cảnh SELinux Context &amp; 3 Chế độ Hoạt động</li><li><span class=\"lx-vs-bullet\">•</span> Quản lý Biến cờ SELinux Booleans &amp; Bộ công cụ Giải mã audit2why</li><li><span class=\"lx-vs-bullet\">•</span> Hệ thống Bảo vệ Hồ sơ AppArmor trên Debian / Ubuntu</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Cơ chế MAC (SELinux vs AppArmor)",
          "content": "<p>Hệ thống Kiểm soát Truy cập Bắt buộc (Mandatory Access Control - MAC) giới hạn quyền hạn của tiến trình dựa trên chính sách nạp trực tiếp vào nhân Linux Kernel:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Công cụ / Khái niệm</th>\n            <th>Hệ điều hành áp dụng</th>\n            <th>Mục đích cốt lõi</th>\n            <th>Cú pháp mẫu</th>\n            <th>Ghi chú quan trọng</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>getenforce / setenforce</code></td>\n            <td>RHEL / CentOS / Rocky</td>\n            <td>Xem và chuyển đổi trạng thái SELinux tạm thời</td>\n            <td><code>setenforce 0</code> (Permissive) / <code>1</code> (Enforcing)</td>\n            <td>Không chuyển đổi trạng thái Disabled bằng setenforce</td>\n          </tr>\n          <tr>\n            <td><code>restorecon -Rv</code></td>\n            <td>RHEL / Rocky / Fedora</td>\n            <td>Khôi phục nhãn ngữ cảnh mặc định cho thư mục</td>\n            <td><code>restorecon -Rv /var/www/html</code></td>\n            <td>Khắc phục lỗi khi copy file từ <code>/home</code> sang web root</td>\n          </tr>\n          <tr>\n            <td><code>setsebool -P</code></td>\n            <td>RHEL / Rocky / Fedora</td>\n            <td>Bật/tắt biến cờ chính sách SELinux vĩnh viễn</td>\n            <td><code>setsebool -P httpd_can_network_connect 1</code></td>\n            <td>Cờ <code>-P</code> (Persistent) lưu qua các lần reboot</td>\n          </tr>\n          <tr>\n            <td><code>audit2why</code></td>\n            <td>RHEL / Rocky / Fedora</td>\n            <td>Dịch log AVC Denied thành nguyên nhân dễ hiểu</td>\n            <td><code>ausearch -m avc -ts recent | audit2why</code></td>\n            <td>Chỉ dẫn chính xác lệnh cần chạy để cấp quyền chuẩn</td>\n          </tr>\n          <tr>\n            <td><code>aa-status / aa-enforce</code></td>\n            <td>Ubuntu / Debian / SUSE</td>\n            <td>Quản lý hồ sơ bảo vệ của AppArmor</td>\n            <td><code>sudo aa-status</code> / <code>sudo aa-enforce /path/profile</code></td>\n            <td>Dựa trên đường dẫn tệp thay vì gán nhãn Inode</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-3-6-selinux-concepts",
          "title": "4.1 Kiến trúc Nhãn Ngữ cảnh SELinux Context & 3 Chế độ Hoạt động",
          "content": "\n        <p><strong>SELinux (Security-Enhanced Linux)</strong> là một kiến trúc kiểm soát an ninh bắt buộc (MAC) được phát triển bởi Cơ quan An ninh Quốc gia Hoa Kỳ (NSA) kết hợp cùng cộng đồng Linux, được tích hợp mặc định trên các bản phân phối họ Red Hat (RHEL, CentOS Stream, Rocky Linux, AlmaLinux, Fedora).</p>\n\n        <h3 class=\"lx-h3\">3 Chế độ hoạt động của SELinux trong Kernel</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Chế độ (Mode)</th>\n              <th>Hành vi của Kernel</th>\n              <th>Khi nào nên dùng</th>\n              <th>Lưu ý an toàn</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>Enforcing</strong><br/><em>(Mặc định)</em></td>\n              <td>Chính sách an ninh được thực thi nghiêm ngặt: <strong>Chặn đứng mọi hành vi vi phạm</strong> và ghi nhật ký từ chối (AVC denial).</td>\n              <td>Môi trường Production tiêu chuẩn.</td>\n              <td>Cung cấp mức độ bảo vệ tối đa cho hệ thống.</td>\n            </tr>\n            <tr>\n              <td><strong>Permissive</strong></td>\n              <td><strong>Không chặn bất kỳ hành vi nào</strong>; chỉ ghi nhật ký cảnh báo vào file audit log nếu có vi phạm.</td>\n              <td>Gỡ lỗi sự cố dịch vụ; kiểm tra xem lỗi có phải do SELinux gây ra hay không.</td>\n              <td>Chuyển đổi tức thì trong RAM bằng lệnh <code>sudo setenforce 0</code> (không cần reboot).</td>\n            </tr>\n            <tr>\n              <td><strong>Disabled</strong></td>\n              <td>Tắt hoàn toàn module SELinux trong kernel. Hệ thống quay về chỉ dùng phân quyền DAC thông thường.</td>\n              <td><strong>TUYỆT ĐỐI KHÔNG KHUYÊN DÙNG!</strong></td>\n              <td>Khi bật lại từ disabled sang enforcing, máy chủ sẽ phải chạy quy trình relabel toàn bộ ổ đĩa rất lâu lúc boot.</td>\n            </tr>\n          </tbody>\n        </table></div>\n\n        <h3 class=\"lx-h3\">Giải phẫu Nhãn Ngữ cảnh (Security Context)</h3>\n        <p>Trong SELinux, mọi tiến trình, file, thư mục, socket và cổng mạng đều được gắn một nhãn an ninh gồm 4 thành phần cách nhau bởi dấu hai chấm: <code>user:role:type:level</code></p>\n        <p>Ví dụ: <code>system_u:object_r:httpd_sys_content_t:s0</code></p>\n        <ul>\n          <li><strong>User (<code>system_u</code>):</strong> Danh tính người dùng SELinux.</li>\n          <li><strong>Role (<code>object_r</code>):</strong> Vai trò của đối tượng.</li>\n          <li><strong>Type (<code>httpd_sys_content_t</code>):</strong> <strong>Thành phần quan trọng nhất (Type Enforcement)!</strong> Đây là loại nhãn quy định tiến trình web server (chạy dưới type <code>httpd_t</code>) chỉ được phép truy cập vào các file có type tương thích như <code>httpd_sys_content_t</code>.</li>\n          <li><strong>Level (<code>s0</code>):</strong> Mức độ bảo mật đa tầng (MLS/MCS).</li>\n        </ul>\n      ",
          "codeExamples": [
            {
              "title": "Kiểm tra và gán nhãn SELinux đúng chuẩn cho thư mục web tùy biến",
              "lang": "bash",
              "code": "# 1. Kiểm tra trạng thái và chế độ hoạt động của SELinux:\n$ sestatus\nSELinux status:                 enabled\nSELinuxfs mount:                /sys/fs/selinux\nSELinux root directory:         /etc/selinux\nLoaded policy name:             targeted\nCurrent mode:                   enforcing\nMode from config file:          enforcing\n\n# 2. Quan sát nhãn ngữ cảnh của file bằng cờ -Z:\n$ ls -lZ /var/www/html/\n-rw-r--r--. 1 root root system_u:object_r:httpd_sys_content_t:s0 index.html\n\n# 3. Sự cố: Quản trị viên chuyển web root sang thư mục /data/website/\n# Khi tạo mới, thư mục bị gán nhãn mặc định là default_t khiến Nginx bị chặn 403 Forbidden!\n$ ls -ldZ /data/website/\ndrwxr-xr-x. 2 root root unconfined_u:object_r:default_t:s0 /data/website/\n\n# 4. KHẮC PHỤC CHUẨN: Đăng ký quy tắc nhãn vĩnh viễn với semanage và nạp lại bằng restorecon:\n$ sudo semanage fcontext -a -t httpd_sys_content_t \"/data/website(/.*)?\"\n$ sudo restorecon -Rv /data/website/\nRelabeled /data/website from unconfined_u:object_r:default_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0",
              "output": "Relabeled /data/website from unconfined_u:object_r:default_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0",
              "annotations": [
                {
                  "part": "Lệnh ls -lZ",
                  "text": "Cờ -Z hiển thị nhãn an ninh SELinux của file và thư mục."
                },
                {
                  "part": "semanage fcontext",
                  "text": "Đăng ký quy tắc nhãn vĩnh viễn vào cơ sở dữ liệu chính sách SELinux của hệ điều hành."
                },
                {
                  "part": "restorecon -Rv",
                  "text": "Đọc cơ sở dữ liệu chính sách và quét đệ trình để áp đặt lại nhãn chuẩn cho toàn bộ cây thư mục."
                },
                {
                  "part": "Giải thích",
                  "text": "Tuyệt đối không dùng chcon vì chcon chỉ đổi nhãn tạm thời, sẽ bị mất sạch khi hệ thống relabel."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-6-selinux-booleans",
          "title": "4.2 Quản lý Biến cờ SELinux Booleans & Bộ công cụ Giải mã audit2why",
          "content": "\n        <p>Trong nhiều trường hợp, bạn không cần phải thay đổi nhãn của file mà chỉ cần bật tắt các tính năng nghiệp vụ đã được định nghĩa sẵn trong chính sách của SELinux. Các công tắc bật/tắt này được gọi là <strong>SELinux Booleans</strong>.</p>\n\n        <p>Ví dụ kinh điển: Mặc định, chính sách SELinux cấm tiến trình Web Server (Nginx, Apache) khởi tạo bất kỳ kết nối mạng nào ra ngoài (để ngăn chặn mã độc kết nối tới C2 Server). Do đó khi bạn cấu hình Nginx làm <strong>Reverse Proxy</strong> trỏ tới ứng dụng Python FastAPI chạy trên cổng 8000, Nginx sẽ bị kernel chặn đứng và ném lỗi <code>502 Bad Gateway</code> (Permission Denied)!</p>\n\n        <h3 class=\"lx-h3\">Bảng các biến cờ SELinux Booleans thiết yếu cho Web &amp; Python</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Tên Boolean</th>\n              <th>Mặc định</th>\n              <th>Ý nghĩa &amp; Khi nào cần bật</th>\n              <th>Lệnh kích hoạt vĩnh viễn</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>httpd_can_network_connect</code></td>\n              <td><code>off</code></td>\n              <td>Cho phép Nginx / Apache kết nối mạng tới các backend proxy (FastAPI, Gunicorn, Node.js).</td>\n              <td><code>sudo setsebool -P httpd_can_network_connect 1</code></td>\n            </tr>\n            <tr>\n              <td><code>httpd_can_network_connect_db</code></td>\n              <td><code>off</code></td>\n              <td>Cho phép ứng dụng web kết nối trực tiếp tới máy chủ cơ sở dữ liệu (PostgreSQL, MySQL).</td>\n              <td><code>sudo setsebool -P httpd_can_network_connect_db 1</code></td>\n            </tr>\n            <tr>\n              <td><code>httpd_enable_homedirs</code></td>\n              <td><code>off</code></td>\n              <td>Cho phép dịch vụ web đọc nội dung trang web đặt trong thư mục cá nhân của user (/home/user/public_html).</td>\n              <td><code>sudo setsebool -P httpd_enable_homedirs 1</code></td>\n            </tr>\n          </tbody>\n        </table></div>\n\n        <h3 class=\"lx-h3\">Vũ khí Giải mã Lỗi: audit2why</h3>\n        <p>Khi gặp sự cố từ chối truy cập bí ẩn, đừng đoán mò! Hãy cài đặt gói <code>policycoreutils-python-utils</code> và chạy công cụ điều tra tự động:</p>\n        <p><code>sudo ausearch -m avc -ts recent | audit2why</code></p>\n        <p>Công cụ sẽ phân tích dòng log nhị phân AVC phức tạp và đưa ra kết luận rõ ràng bằng tiếng Anh: <em>\"Was caused by: Missing type context\"</em> hoặc <em>\"You must tell SELinux about this by enabling the 'httpd_can_network_connect' boolean\"</em> kèm đúng câu lệnh bạn chỉ việc sao chép để giải quyết!</p>\n      ",
          "codeExamples": [
            {
              "title": "Giải mã lỗi Nginx 502 Bad Gateway bằng audit2why và bật cờ Boolean",
              "lang": "bash",
              "code": "# 1. Nginx báo lỗi 502 Bad Gateway khi proxy sang FastAPI port 8000.\n# Điều tra nhật ký từ chối truy cập (AVC denial) bằng ausearch:\n$ sudo ausearch -m avc -ts recent\ntype=AVC msg=audit(11/04/2026 09:12:30.412:501): avc:  denied  { name_connect } for  pid=12401 comm=\"nginx\" dest=8000 scontext=system_u:system_r:httpd_t:s0 tcontext=system_u:object_r:soundd_port_t:s0 tclass=tcp_socket permissive=0\n\n# 2. Dùng audit2why để phiên dịch nguyên nhân và giải pháp:\n$ sudo ausearch -m avc -ts recent | audit2why\nWas caused by:\n\tOne of the following booleans was not enabled to allow this access:\n\thttpd_can_network_connect\n\n\tThen execute:\n\t# setsebool -P httpd_can_network_connect 1\n\n# 3. Kích hoạt vĩnh viễn biến cờ (cờ -P đảm bảo không bị mất sau khi reboot):\n$ sudo setsebool -P httpd_can_network_connect 1\n\n# 4. Kiểm tra lại kết nối: Nginx lập tức chuyển tiếp lưu lượng thành công, trả về HTTP 200 OK!",
              "output": "Was caused by:\n\tOne of the following booleans was not enabled to allow this access:\n\thttpd_can_network_connect\n\n\tThen execute:\n\t# setsebool -P httpd_can_network_connect 1",
              "annotations": [
                {
                  "part": "cờ -ts recent",
                  "text": "Lọc các bản ghi AVC denial vừa mới xảy ra trong vài phút gần nhất."
                },
                {
                  "part": "setsebool -P",
                  "text": "Cờ -P (Persistent) cực kỳ quan trọng! Nếu thiếu cờ -P, cấu hình chỉ có hiệu lực tạm thời trong RAM và sẽ bị mất khi máy chủ khởi động lại."
                },
                {
                  "part": "Giải thích",
                  "text": "audit2why là trợ thủ số 1 của kỹ sư Linux, loại bỏ hoàn toàn việc phải đoán mò chính sách an ninh."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-6-apparmor-basics",
          "title": "4.3 Hệ thống Bảo vệ Hồ sơ AppArmor trên Debian / Ubuntu",
          "content": "\n        <p>Trong khi họ Red Hat lựa chọn SELinux thì các bản phân phối họ <strong>Debian và Ubuntu</strong> sử dụng <strong>AppArmor</strong> làm cơ chế Kiểm soát Truy cập Bắt buộc (MAC) mặc định. AppArmor được đánh giá là trực quan và dễ tiếp cận hơn cho lập trình viên nhờ cách tiếp cận dựa trên đường dẫn tệp (path-based).</p>\n\n        <h3 class=\"lx-h3\">Nguyên lý hoạt động theo Hồ sơ (Profiles) của AppArmor</h3>\n        <p>Mỗi chương trình được bảo vệ bởi một tệp hồ sơ lưu tại <code>/etc/apparmor.d/</code> (ví dụ: <code>/etc/apparmor.d/usr.sbin.mysqld</code> hoặc <code>/etc/apparmor.d/usr.sbin.tcpdump</code>). Một hồ sơ có thể hoạt động ở 1 trong 2 chế độ chính:</p>\n        <ul>\n          <li><strong>enforce (Bắt buộc):</strong> Áp đặt chính sách nghiêm ngặt, chặn đứng mọi hành vi đọc/ghi/thực thi ngoài phạm vi được phép và ghi nhật ký cảnh báo.</li>\n          <li><strong>complain (Phàn nàn / Quan sát):</strong> Không chặn hành vi, chỉ ghi lại nhật ký cảnh báo vi phạm. Rất hữu ích khi tạo hồ sơ mới hoặc kiểm thử ứng dụng trước khi đưa lên production.</li>\n        </ul>\n\n        <h3 class=\"lx-h3\">Bảng lệnh quản trị AppArmor thiết yếu</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Lệnh</th>\n              <th>Mục đích</th>\n              <th>Ví dụ thực tế</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>sudo aa-status</code></td>\n              <td>Xem tổng quan trạng thái AppArmor và danh sách tiến trình đang được bảo vệ</td>\n              <td><code>sudo aa-status</code></td>\n            </tr>\n            <tr>\n              <td><code>sudo aa-enforce &lt;profile&gt;</code></td>\n              <td>Chuyển hồ sơ sang chế độ bắt buộc chặn vi phạm</td>\n              <td><code>sudo aa-enforce /etc/apparmor.d/usr.sbin.nginx</code></td>\n            </tr>\n            <tr>\n              <td><code>sudo aa-complain &lt;profile&gt;</code></td>\n              <td>Chuyển hồ sơ sang chế độ quan sát không chặn để gỡ lỗi</td>\n              <td><code>sudo aa-complain /etc/apparmor.d/usr.sbin.nginx</code></td>\n            </tr>\n            <tr>\n              <td><code>sudo aa-logprof</code></td>\n              <td>Công cụ tương tác tự động đọc log vi phạm và hỏi quản trị viên để cập nhật hồ sơ</td>\n              <td><code>sudo aa-logprof</code></td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": [
            {
              "title": "Kiểm tra và quản lý trạng thái bảo vệ của AppArmor",
              "lang": "bash",
              "code": "# Kiểm tra trạng thái chi tiết của AppArmor trên Ubuntu:\n$ sudo aa-status\napparmor module is loaded.\n42 profiles are loaded.\n38 profiles are in enforce mode.\n   /usr/bin/evince\n   /usr/sbin/mysqld\n   /usr/sbin/tcpdump\n4 profiles are in complain mode.\n15 processes are in enforce mode.\n   /usr/sbin/mysqld (1420)\n\n# Chuyển hồ sơ mysql sang chế độ complain để thử nghiệm cấu hình phân vùng data mới:\n$ sudo aa-complain /usr/sbin/mysqld\nSetting /usr/sbin/mysqld to complain mode.\n\n# Sau khi kiểm tra ổn định, chuyển ngược lại chế độ enforce để kích hoạt bảo vệ:\n$ sudo aa-enforce /usr/sbin/mysqld\nSetting /usr/sbin/mysqld to enforce mode.",
              "output": "apparmor module is loaded.\n42 profiles are loaded.\n38 profiles are in enforce mode.",
              "annotations": [
                {
                  "part": "aa-status",
                  "text": "Cung cấp bức tranh toàn cảnh về số lượng profile và tiến trình đang được sandbox bảo vệ."
                },
                {
                  "part": "aa-complain",
                  "text": "Cho phép ứng dụng ghi dữ liệu vào các phân vùng lưu trữ mới mà không bị chặn, đồng thời ghi log mẫu để cập nhật profile."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Điều tra và giải quyết xung đột SELinux khi đổi thư mục Web Root</h4>\n      <p>Giảng viên cấu hình gán nhãn vĩnh viễn cho thư mục web tùy biến <code>/webdata</code>:</p>\n      <pre><code># 1. Khai báo quy tắc nhãn ngữ cảnh chuẩn cho thư mục mới trong database chính sách\nsudo semanage fcontext -a -t httpd_sys_content_t \"/webdata(/.*)?\"\n\n# 2. Áp dụng nhãn ngữ cảnh xuống các tệp và thư mục thực tế\nsudo restorecon -Rv /webdata\n\n# 3. Kiểm tra nhãn ngữ cảnh mới bằng ls -Z\nls -Zd /webdata</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Tắt SELinux khi gặp lỗi Permission Denied</div>\n          <pre><code># Thói quen cực kỳ nguy hiểm và thiếu chuyên nghiệp:\nsudo setenforce 0\nsudo sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config</code></pre>\n          <p class=\"lx-diff-desc\">Hành động này vứt bỏ toàn bộ tấm khiên bảo vệ của hệ thống, biến máy chủ thành mồi ngon cho các cuộc tấn công khai thác lỗ hổng dịch vụ!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Điều tra AVC Denied và gán đúng Context</div>\n          <pre><code># Điều tra nguyên nhân bằng audit2why:\nsudo ausearch -m avc -ts recent | audit2why\n\n# Gán đúng ngữ cảnh tệp hoặc bật cờ Boolean:\nsudo setsebool -P httpd_can_network_connect 1</code></pre>\n          <p class=\"lx-diff-desc\">Giữ nguyên chế độ Enforcing kiên cố, chỉ cấp đúng quyền mà dịch vụ cần theo nguyên tắc đặc quyền tối thiểu.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Gỡ lỗi AVC Denied với audit2why & Quản trị AppArmor",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.6</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thực hành tạo một tệp tin trong thư mục <code>/tmp</code>, di chuyển vào thư mục web, quan sát hiện tượng SELinux/AppArmor chặn truy cập, và sử dụng bộ công cụ phân tích để cấp quyền chuẩn xác.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Hệ điều hành Rocky Linux 9 (SELinux) hoặc Ubuntu 22.04 (AppArmor).</li>\n        <li>Terminal với quyền sudo.</li>\n      </ul>\n\n      <h4>Các bước thực hiện (trên hệ thống có SELinux)</h4>\n      <ol>\n        <li>Tạo một file HTML trong thư mục <code>/tmp</code> và di chuyển (<code>mv</code>) vào <code>/var/www/html/</code>:\n          <pre><code>echo \"&lt;h1&gt;Lab SELinux&lt;/h1&gt;\" > /tmp/test.html\nsudo mv /tmp/test.html /var/www/html/test.html\nls -Z /var/www/html/test.html</code></pre>\n          <em>Quan sát nhãn ngữ cảnh: file vẫn mang nhãn <code>user_tmp_t</code> thay vì <code>httpd_sys_content_t</code>!</em>\n        </li>\n        <li>Khôi phục lại nhãn chuẩn bằng lệnh <code>restorecon</code>:\n          <pre><code>sudo restorecon -v /var/www/html/test.html\nls -Z /var/www/html/test.html</code></pre>\n        </li>\n        <li>Điều tra các từ chối truy cập bằng <code>audit2why</code>:\n          <pre><code>sudo ausearch -m avc -ts recent | audit2why || echo \"Không có lỗi từ chối mới\"</code></pre>\n        </li>\n        <li>(Dành cho Ubuntu) Khảo sát trạng thái các profile AppArmor:\n          <pre><code>sudo aa-status</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Sau khi chạy <code>restorecon -v</code>, tệp tin được cập nhật nhãn <code>httpd_sys_content_t</code> và dịch vụ web đọc được nội dung bình thường.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Sử dụng lệnh <code>getsebool -a | grep httpd</code> để liệt kê toàn bộ các biến cờ Boolean của dịch vụ web và giải thích ý nghĩa cờ <code>httpd_enable_homedirs</code>.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không bao giờ chỉnh sửa <code>SELINUX=disabled</code> trong <code>/etc/selinux/config</code> rồi reboot trên máy chủ Enterprise. Nếu muốn bật lại sau đó, toàn bộ hệ thống file sẽ phải trải qua quá trình relabel cực kỳ lâu (hàng giờ) và có thể gây lỗi boot!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Nginx/Apache báo <code>403 Forbidden</code> dù file đã chmod 777</strong></td><td>Nhãn SELinux của file không thuộc loại <code>httpd_sys_content_t</code> (thường xảy ra khi dùng lệnh <code>mv</code> thay vì <code>cp</code>, vì mv giữ nguyên context cũ).</td><td>Chạy lệnh <code>sudo restorecon -Rv /var/www/html</code> để phục hồi ngữ cảnh đúng.</td></tr>\n          <tr><td><strong>Web server không thể kết nối tới cơ sở dữ liệu trên máy chủ khác</strong></td><td>SELinux mặc định cấm tiến trình web mở kết nối mạng ra ngoài (chặn cờ <code>httpd_can_network_connect</code>).</td><td>Bật cờ Boolean bằng lệnh: <code>sudo setsebool -P httpd_can_network_connect 1</code>.</td></tr>\n          <tr><td><strong>Nhãn SELinux bị mất sau khi hệ thống relabel</strong></td><td>Người dùng dùng lệnh <code>chcon</code> để gán nhãn tạm thời thay vì dùng <code>semanage fcontext</code> để ghi vào database chính sách.</td><td>Luôn dùng <code>semanage fcontext -a -t &lt;type&gt; \"path(/.*)?\"</code> kèm <code>restorecon</code> để nhãn tồn tại vĩnh viễn.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Nguyên tắc Không bao giờ tắt SELinux/AppArmor:</strong> Luôn duy trì hệ thống ở chế độ <code>Enforcing</code>. Khi gặp sự cố, tạm thời chuyển sang <code>Permissive</code> (bằng <code>setenforce 0</code>) để thu thập log phân tích, sau đó sửa đúng nhãn và chuyển ngay về <code>Enforcing</code>.</li>\n        <li><strong>Sử dụng chcon chỉ cho mục đích thử nghiệm nhanh:</strong> Trong môi trường sản xuất, mọi thay đổi nhãn phải được khai báo thông qua <code>semanage fcontext</code> để đảm bảo tính nhất quán qua các chu kỳ bảo trì và relabeling.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Red Hat Enterprise Linux 9: Using SELinux:</strong> <a href=\"https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/using_selinux/\" target=\"_blank\" rel=\"noopener\">RHEL 9 SELinux Official Guide</a>.</li>\n      <li><strong>Ubuntu AppArmor Documentation:</strong> <a href=\"https://ubuntu.com/server/docs/security-apparmor\" target=\"_blank\" rel=\"noopener\">Ubuntu Server AppArmor Guide</a>.</li>\n      <li><strong>SELinux Project Wiki:</strong> <a href=\"https://selinuxproject.org/\" target=\"_blank\" rel=\"noopener\">SELinux Project Community Resources</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Cấu trúc Nhãn Ngữ cảnh SELinux (SELinux Context)",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Trường</th><th>Tên trường</th><th>Ví dụ</th><th>Mục đích sử dụng</th></tr></thead>\n        <tbody>\n          <tr><td>1</td><td>SELinux User</td><td><code>system_u</code> / <code>unconfined_u</code></td><td>Định danh người dùng trong chính sách SELinux</td></tr>\n          <tr><td>2</td><td>SELinux Role</td><td><code>object_r</code> / <code>system_r</code></td><td>Xác định vai trò truy cập trong mô hình RBAC</td></tr>\n          <tr><td>3</td><td>SELinux Type (Domain)</td><td><code>httpd_t</code> / <code>httpd_sys_content_t</code></td><td>Trọng tâm của Type Enforcement (kiểm tra tiến trình có được chạm vào file không)</td></tr>\n          <tr><td>4</td><td>MLS / MCS Level</td><td><code>s0</code> / <code>s0:c0,c1023</code></td><td>Bảo mật đa cấp (Multi-Level Security) cho cơ quan quốc phòng và container</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Lỗi 403 Forbidden bí ẩn trên Rocky Linux dù quyền thư mục web đã cấp chmod 777",
        "content": "\n      <p><strong>1. Triệu chứng sự cố:</strong> Một lập trình viên triển khai ứng dụng web tĩnh trên máy chủ Rocky Linux 9. Lập trình viên tạo thư mục web tại <code>/webroot/site</code> và trỏ Nginx <code>root /webroot/site;</code>. Tuy nhiên khi truy cập từ trình duyệt, trang web luôn báo lỗi <code>403 Forbidden</code>. Lập trình viên bực tức chạy lệnh cấp toàn quyền: <code>sudo chmod -R 777 /webroot/site</code> và <code>sudo chown -R nginx:nginx /webroot/site</code> nhưng trang web vẫn trơ tráo báo lỗi 403 Forbidden!</p>\n      \n      <p><strong>2. Điều tra & Chẩn đoán:</strong> Kỹ sư hệ thống vào hỗ trợ và kiểm tra nhãn an ninh của thư mục:</p>\n      <pre><code># Kiểm tra nhãn SELinux Context của thư mục web:\n$ ls -ldZ /webroot/site\ndrwxrwxrwx. 2 nginx nginx unconfined_u:object_r:default_t:s0 /webroot/site\n\n# Kiểm tra log từ chối AVC của SELinux:\n$ sudo ausearch -m avc -ts recent | audit2why\nWas caused by:\n\tMissing type enforcement allow rule.\n\tYou can alter labeling of /webroot/site\n\tto match httpd_sys_content_t.</code></pre>\n      <p>Bản chất vấn đề lập tức sáng tỏ: Phân quyền DAC (chmod 777) đã cho phép tất cả mọi người truy cập, nhưng tầng bảo vệ thứ hai là SELinux (MAC) phát hiện thư mục đang mang nhãn <code>default_t</code>. Chính sách an ninh của kernel cấm tiến trình Nginx (type <code>httpd_t</code>) đọc các file mang nhãn <code>default_t</code> để chống rò rỉ dữ liệu hệ thống!</p>\n      \n      <p><strong>3. Nguyên nhân gốc rễ:</strong> Thư mục <code>/webroot/site</code> được tạo trực tiếp ở gốc <code>/</code>, nơi SELinux tự động gán nhãn loại trừ <code>default_t</code>. Do chưa được đăng ký trong danh mục nhãn ngữ cảnh web của hệ điều hành, Nginx bị kernel chặn đứng.</p>\n      \n      <p><strong>4. Biện pháp khắc phục chuẩn mực (Không tắt SELinux):</strong></p>\n      <pre><code># Bước 1: Thu hồi quyền 777 nguy hiểm về mức an toàn chuẩn:\n$ sudo chmod -R 755 /webroot/site\n\n# Bước 2: Đăng ký quy tắc nhãn web vĩnh viễn cho đường dẫn này:\n$ sudo semanage fcontext -a -t httpd_sys_content_t \"/webroot/site(/.*)?\"\n\n# Bước 3: Áp đặt lại nhãn an ninh trên hệ thống file:\n$ sudo restorecon -Rv /webroot/site\nRelabeled /webroot/site from unconfined_u:object_r:default_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0\n\n# Bước 4: Kiểm tra lại quyền:\n$ curl -I http://localhost\nHTTP/1.1 200 OK</code></pre>\n      <p>Trang web lập tức hoạt động trơn tru với mã HTTP 200 OK trong khi quyền thư mục vẫn được thắt chặt an toàn ở mức 755 và SELinux vẫn đang ở chế độ bảo vệ Enforcing!</p>\n      \n      <p><strong>5. Phòng ngừa lâu dài:</strong></p>\n      <ul>\n        <li>Tập huấn cho đội ngũ phát triển: Lỗi 403 Forbidden trên RHEL/Rocky Linux hầu như luôn liên quan tới nhãn SELinux, không phải do chmod thiếu quyền.</li>\n        <li>Tuyệt đối cấm hành vi gõ <code>setenforce 0</code> hoặc sửa file <code>/etc/selinux/config</code> để tắt SELinux. Khi gặp lỗi, luôn dùng bộ đôi <code>semanage fcontext</code> + <code>restorecon</code> hoặc công cụ <code>audit2why</code>.</li>\n      </ul>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Thói quen tai hại: Tắt vĩnh viễn SELinux khi gặp lỗi Permission Denied",
            "content": "Nhiều hướng dẫn trên mạng khuyến khích người mới gõ <code>SELINUX=disabled</code> trong <code>/etc/selinux/config</code> để 'cho nhanh'. Đây là sai lầm nghiêm trọng nhất về an ninh trên môi trường doanh nghiệp. Tắt SELinux tước bỏ lớp giáp phòng thủ tối hậu: Nếu ứng dụng web dính lỗ hổng thực thi mã từ xa (RCE) hoặc chiếm quyền tài khoản web, kẻ tấn công sẽ lập tức kiểm soát toàn bộ máy chủ. Ngược lại, nếu bật SELinux, kẻ tấn công bị giam chặt trong sandbox và không thể đọc trộm file nhạy cảm hay can thiệp hệ thống."
          },
          {
            "title": "Dùng lệnh chcon thay vì semanage fcontext",
            "content": "Lệnh <code>chcon -t httpd_sys_content_t /path</code> chỉ thay đổi nhãn an ninh tạm thời trên đĩa cứng. Khi máy chủ chạy lệnh <code>restorecon</code> hoặc hệ thống khởi động lại kích hoạt tiến trình kiểm tra relabel, toàn bộ nhãn do <code>chcon</code> thiết lập sẽ bị xóa sổ và ghi đè lại bởi nhãn mặc định, làm lỗi 403 Forbidden tái xuất hiện! Chuẩn mực duy nhất là dùng <code>semanage fcontext -a -t ...</code> kết hợp với <code>restorecon -Rv</code>."
          }
        ],
        "tips": [
          {
            "title": "Dùng công cụ audit2why để được gợi ý câu lệnh khắc phục bằng tiếng Anh rõ ràng",
            "content": "Cài đặt gói <code>policycoreutils-python-utils</code> và chạy lệnh: <code>sudo ausearch -m avc -ts recent | audit2why</code>. Công cụ sẽ đọc trực tiếp nhật ký từ chối của SELinux và đưa ra lý do chính xác kèm dòng lệnh bạn cần gõ (như bật boolean nào hoặc gán nhãn nào) để giải quyết triệt để sự cố mà không cần đoán mò."
          },
          {
            "title": "Tạm thời dùng Permissive Mode để chẩn đoán xem có phải do SELinux hay không",
            "content": "Trước khi nghi ngờ SELinux gây lỗi, hãy chạy <code>sudo setenforce 0</code> để chuyển sang chế độ Permissive (không chặn, chỉ ghi log). Nếu sau lệnh này dịch vụ vẫn lỗi, nguyên nhân 100% nằm ở code hoặc quyền DAC thông thường (chmod/chown). Nếu dịch vụ chạy được, hãy chạy <code>audit2why</code> để sửa đúng nhãn/boolean rồi bật lại chế độ bảo vệ ngay bằng <code>sudo setenforce 1</code>."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Phân biệt trạng thái Enforcing, Permissive và Disabled của SELinux",
          "problem": "Phân biệt sự khác nhau giữa chế độ Enforcing, Permissive và Disabled trong SELinux. Lệnh nào cho phép chuyển tạm thời từ Enforcing sang Permissive để kiểm tra lỗi?",
          "hint": "Enforcing chặn và log, Permissive chỉ log không chặn, Disabled tắt hoàn toàn. Dùng lệnh setenforce 0.",
          "solutionCode": "# Kiểm tra trạng thái hiện tại:\ngetenforce\n\n# Chuyển tạm thời sang Permissive (chỉ ghi log, không chặn):\nsudo setenforce 0\n\n# Kiểm tra lại:\ngetenforce",
          "solutionOutput": "Enforcing\nPermissive",
          "explanation": "Chế độ Permissive là công cụ chẩn đoán tuyệt vời: kernel vẫn nạp policy và ghi nhận các vi phạm (AVC denials) vào log nhưng không thực sự chặn thao tác, giúp xác định xem lỗi ứng dụng có thực sự do SELinux gây ra hay không.",
          "annotations": [
            {
              "part": "setenforce 0",
              "text": "Chuyển sang Permissive mode ngay lập tức trong phiên hiện tại mà không cần reboot."
            }
          ],
          "rubric": [
            {
              "criterion": "Khái niệm 3 chế độ",
              "pass": "Nêu rõ được Enforcing vs Permissive",
              "excellent": "Phân tích được tầm quan trọng của Permissive khi debug",
              "weight": "50%"
            },
            {
              "criterion": "Lệnh điều khiển",
              "pass": "Dùng getenforce và setenforce",
              "excellent": "Biết cách sửa /etc/selinux/config để áp dụng vĩnh viễn",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Gán nhãn bối cảnh bảo mật SELinux cho thư mục web tùy chỉnh",
          "problem": "Một kỹ sư lưu trữ mã nguồn web tại thư mục tùy chỉnh /data/www thay vì /var/www/html mặc định, khiến Nginx bị lỗi 403 Forbidden do SELinux chặn. Hãy viết lệnh gán nhãn đúng bối cảnh.",
          "hint": "Sử dụng lệnh semanage fcontext để khai báo mẫu đường dẫn và restorecon -Rv để áp dụng.",
          "solutionCode": "# 1. Khai báo bối cảnh httpd_sys_content_t vào chính sách hệ thống:\nsudo semanage fcontext -a -t httpd_sys_content_t \"/data/www(/.*)?\"\n\n# 2. Áp dụng nhãn bảo mật xuống toàn bộ tệp tin thực tế:\nsudo restorecon -Rv /data/www\n\n# 3. Kiểm tra nhãn bảo mật:\nls -Zd /data/www",
          "solutionOutput": "Relabeled /data/www from unconfined_u:object_r:default_t:s0 to unconfined_u:object_r:httpd_sys_content_t:s0\ndrwxr-xr-x. root root unconfined_u:object_r:httpd_sys_content_t:s0 /data/www",
          "explanation": "SELinux áp dụng mô hình kiểm soát truy cập bắt buộc (MAC) dựa trên nhãn (context). semanage fcontext lưu trữ quy tắc vào cơ sở dữ liệu chính sách, và restorecon ghi nhãn thực tế lên filesystem.",
          "annotations": [
            {
              "part": "semanage fcontext + restorecon",
              "text": "Quy trình chuẩn vĩnh viễn, không bị mất nhãn khi relabel toàn hệ thống."
            }
          ],
          "rubric": [
            {
              "criterion": "Gán nhãn đúng type",
              "pass": "Dùng httpd_sys_content_t",
              "excellent": "Sử dụng đúng regex đường dẫn (/.*)?",
              "weight": "50%"
            },
            {
              "criterion": "Áp dụng nhãn",
              "pass": "Dùng restorecon -Rv",
              "excellent": "Kiểm tra lại bằng ls -Z xác thực nhãn mới",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Sử dụng audit2why và audit2allow để gỡ lỗi AVC Denial",
          "problem": "Nginx được cấu hình để gửi thông báo qua cổng SMTP 2525 nhưng bị SELinux chặn kết nối mạng (AVC denial). Viết câu lệnh tra cứu nguyên nhân và bật boolean phù hợp.",
          "hint": "Dùng audit2why hoặc ausearch -m avc và kiểm tra boolean httpd_can_network_connect.",
          "solutionCode": "# 1. Phân tích nguyên nhân vi phạm SELinux:\nsudo ausearch -m avc -ts recent | audit2why\n\n# 2. Bật boolean cho phép dịch vụ web kết nối ra mạng ngoài:\nsudo setsebool -P httpd_can_network_connect 1\n\n# 3. Xác minh trạng thái boolean:\ngetsebool httpd_can_network_connect",
          "solutionOutput": "httpd_can_network_connect --> on\n# Nginx đã có thể kết nối ra socket mạng bên ngoài mà không cần tắt SELinux",
          "explanation": "Thay vì tạo policy tùy ý hay tắt hoàn toàn SELinux, các kỹ sư chuyên nghiệp luôn ưu tiên kích hoạt các boolean tích hợp sẵn như httpd_can_network_connect bằng cờ -P (persistent).",
          "annotations": [
            {
              "part": "setsebool -P",
              "text": "Cờ -P lưu vĩnh viễn giá trị boolean vào chính sách của kernel."
            }
          ],
          "rubric": [
            {
              "criterion": "Phân tích log AVC",
              "pass": "Dùng ausearch hoặc audit2why",
              "excellent": "Chỉ ra chính xác lý do kernel từ chối syscall connect()",
              "weight": "50%"
            },
            {
              "criterion": "Giải pháp đúng chuẩn",
              "pass": "Bật đúng boolean",
              "excellent": "Tuyệt đối không tắt SELinux, duy trì hàng rào phòng thủ",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Kiểm soát Truy cập Bắt buộc (MAC) thiết lập chính sách bảo mật do Kernel thực thi, vượt lên trên quyền hạn của tài khoản root.",
        "SELinux sử dụng mô hình gán nhãn ngữ cảnh Type Enforcement (user:role:type:level); trong khi AppArmor kiểm soát dựa trên đường dẫn tệp.",
        "3 chế độ hoạt động của SELinux: Enforcing (thực thi và chặn), Permissive (không chặn nhưng ghi log cảnh báo), và Disabled (tắt hoàn toàn).",
        "Sử dụng công cụ audit2why và audit2allow để giải mã các thông điệp AVC Denied trong audit.log thành giải pháp khắc phục chuẩn mực.",
        "Tuyệt đối không bao giờ tắt SELinux để sửa lỗi Permission Denied; luôn sử dụng restorecon hoặc setsebool để cấp quyền chính xác."
      ],
      "generalInfo": {
        "duration": "55 phút",
        "targetAudience": "Security Architect, Senior Sysadmin, DevSecOps Engineer",
        "prerequisites": "Hiểu phân quyền DAC (rwx, chmod, chown), tiến trình và log hệ thống",
        "environment": "Rocky Linux 9 / RHEL 9 (SELinux) và Ubuntu 22.04 LTS (AppArmor)",
        "materials": "Terminal Linux quyền root/sudo, gói policycoreutils-python-utils, apparmor-utils"
      },
      "nextLessonPreview": "Trong Bài 3.7, chúng ta sẽ bước sang Chiến lược Sao lưu Chuyên sâu: đồng bộ dữ liệu tốc độ cao qua SSH bằng rsync và chụp ảnh nhanh điểm thời gian (Point-in-Time) với LVM Snapshot.",
      "quiz": [
        {
          "question": "Lệnh nào sau đây dùng để chuyển SELinux sang chế độ Permissive tạm thời mà không cần khởi động lại máy chủ?",
          "options": [
            "setenforce 0",
            "setenforce 1",
            "selinux --disable",
            "systemctl stop selinux"
          ],
          "explanation": "setenforce 0 chuyển sang chế độ Permissive (ghi log mà không chặn), phục vụ điều tra lỗi; setenforce 1 bật lại chế độ Enforcing.",
          "correctIndex": 0
        },
        {
          "question": "Tại sao việc di chuyển file (mv) từ /tmp vào /var/www/html thường gây ra lỗi 403 Forbidden trên hệ thống có SELinux?",
          "options": [
            "Vì lệnh mv làm hỏng cấu trúc HTML",
            "Vì lệnh mv giữ nguyên nhãn ngữ cảnh cũ của file (user_tmp_t) thay vì áp dụng nhãn của thư mục đích (httpd_sys_content_t)",
            "Vì thư mục /tmp không cho phép di chuyển file ra ngoài",
            "Vì Nginx không có quyền đọc thư mục /tmp"
          ],
          "explanation": "Lệnh mv giữ nguyên Inode và nhãn context cũ; trong khi lệnh cp sẽ tạo file mới và tự động kế thừa nhãn của thư mục đích.",
          "correctIndex": 1
        },
        {
          "question": "Trong kiến trúc bảo mật của AppArmor (phổ biến trên Ubuntu/Debian), hai chế độ hoạt động của profile bảo mật là gì?",
          "options": [
            "Enforce (chặn và ghi log) và Complain (chỉ ghi log cảnh báo, không chặn)",
            "Active và Passive",
            "Strict và Moderate",
            "Root và User"
          ],
          "correctIndex": 0,
          "explanation": "Tương tự như Enforcing/Permissive của SELinux, AppArmor sử dụng hai chế độ: `Enforce` để thực thi việc ngăn chặn các hành vi trái phép theo profile, và `Complain` để học và ghi nhận các vi phạm mà không làm gián đoạn tiến trình."
        }
      ],
      "reflectionQuestion": "Một ứng dụng Python chạy trên Rocky Linux 9 cần kết nối ra cổng 5432 của máy chủ cơ sở dữ liệu PostgreSQL từ xa. Khi khởi động dịch vụ qua systemd, ứng dụng báo lỗi 'Permission denied (Socket connect failed)'. Khi quản trị viên thử gõ `setenforce 0` thì ứng dụng kết nối thành công ngay lập tức. Hãy giải thích nguyên nhân gốc rễ và đưa ra giải pháp chuẩn mực để ứng dụng hoạt động bình thường mà vẫn giữ nguyên chế độ `enforcing`.",
      "reflectionHint": "Gợi ý: Nguyên nhân: SELinux đang chặn tiến trình ứng dụng (chạy dưới domain dịch vụ) mở kết nối mạng socket ra ngoài. Giải pháp chuẩn: 1. Chạy `sudo ausearch -m avc -ts recent | audit2why` để kiểm tra cờ Boolean liên quan. 2. Nếu là dịch vụ web, bật cờ cho phép kết nối mạng: `sudo setsebool -P httpd_can_network_connect 1` hoặc `sudo setsebool -P nis_enabled 1` tùy thuộc vào chính sách cụ thể, hoặc tạo một chính sách module SELinux cục bộ bằng `audit2allow -M myapp_policy && semodule -i myapp_policy.pp`. 3. Chạy `sudo setenforce 1` để đưa hệ thống trở lại chế độ Enforcing."
    },
    {
      "id": "lx-3-07",
      "number": "3.7",
      "title": "Chiến lược Sao lưu, Đồng bộ với rsync qua SSH & Filesystem Snapshot",
      "subtitle": "Bảo vệ tài sản sống còn của doanh nghiệp: Thuật toán delta-transfer rsync, cảnh báo đỏ cờ --delete, và sao lưu điểm thời gian nhất quán với LVM Snapshot",
      "level": "Nâng cao",
      "duration": "55 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nắm vững các cờ lệnh tiêu chuẩn vàng của rsync: -a, -v, -z, -P, -H, -X, -A và cơ chế đồng bộ vi sai (delta-transfer)",
        "2. [Hiểu - Understand] Hiểu thấu đáo sự khác biệt sống còn của dấu gạch chéo cuối (trailing slash '/') trong đường dẫn nguồn của rsync",
        "3. [Vận dụng - Apply] Sử dụng cờ an toàn --dry-run trước khi dùng --delete và triển khai sao lưu nhất quán dữ liệu bằng LVM Snapshot",
        "4. [Phân tích - Analyze] Phân tích cơ chế Copy-on-Write (CoW) của LVM Snapshot và rủi ro Snapshot bị đầy (100% full) làm mất hiệu lực"
      ],
      "intuition": {
        "title": "Cỗ máy dịch chuyển vi sai rsync và Bức ảnh đóng băng thời gian LVM Snapshot",
        "overview": "Sao lưu qua mạng cần nhanh và tiết kiệm băng thông; sao lưu cơ sở dữ liệu đang chạy cần nhất quán tuyệt đối. rsync và LVM Snapshot là hai vũ khí tối thượng đáp ứng trọn vẹn cả hai yêu cầu khắt khe này.",
        "realWorld": "Một trang tin tức có 500GB hình ảnh; mỗi ngày chỉ có khoảng 2GB ảnh mới. Nếu dùng scp hoặc tar, hệ thống phải truyền lại toàn bộ 500GB qua mạng mất hàng giờ. Nhờ thuật toán delta của rsync, tiến trình đồng bộ chỉ mất 3 phút để quét và chuyển đúng 2GB dữ liệu thay đổi.",
        "metaphor": "rsync giống như một nhân viên chuyển phát thông minh: thay vì chở cả tủ sách đi, anh ta đối chiếu mục lục và chỉ mang đúng các trang sách mới được viết thêm. Còn LVM Snapshot giống như việc bấm nút chụp ảnh tức thì: mọi hành động sửa đổi sau đó được ghi sang một trang nháp riêng (Copy-on-Write), giữ nguyên hiện trường gốc tại đúng khoảnh khắc chụp ảnh.",
        "boundary": "LVM Snapshot ghi nhận điểm thời gian cục bộ trên một máy chủ; rsync đảm nhiệm việc vận chuyển dữ liệu đã đóng băng đó sang các máy chủ lưu trữ từ xa.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Sao lưu qua mạng cần nhanh và tiết kiệm băng thông; sao lưu cơ sở dữ liệu đang chạy cần nhất quán tuyệt đối. rsync và LVM Snapshot là hai vũ khí tối thượng đáp ứng trọn vẹn cả hai yêu cầu khắt khe này.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>rsync -avzP</code>:</strong> Bộ cờ tiêu chuẩn vàng đồng bộ dữ liệu</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>rsync --dry-run</code>:</strong> Mô phỏng đồng bộ để rà soát thay đổi</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>rsync -e 'ssh -p ...'</code>:</strong> Đồng bộ qua kênh SSH bảo mật tùy biến cổng</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một trang tin tức có 500GB hình ảnh; mỗi ngày chỉ có khoảng 2GB ảnh mới. Nếu dùng scp hoặc tar, hệ thống phải truyền lại toàn bộ 500GB qua mạng mất hàng giờ. Nhờ thuật toán delta của rsync, tiến trình đồng bộ chỉ mất 3 phút để quét và chuyển đúng 2GB dữ liệu thay đổi.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Làm chủ rsync Đồng bộ qua SSH &amp; Bộ Cờ Tiêu chuẩn Vàng</li><li><span class=\"lx-vs-bullet\">•</span> Cảnh báo Đỏ Sống còn: Trailing Slash &amp; Cờ Xóa --delete</li><li><span class=\"lx-vs-bullet\">•</span> Sao lưu Điểm Thời gian Nhất quán với LVM Snapshot (Point-in-Time)</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Công cụ Sao lưu rsync & LVM",
          "content": "<p>Chiến lược sao lưu hiện đại kết hợp tính nhất quán của Snapshot hệ thống file và tính hiệu quả của giao thức truyền tải vi sai rsync:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Lệnh / Cờ lệnh</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Ghi chú quan trọng</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>rsync -avzP</code></td>\n            <td>Bộ cờ tiêu chuẩn vàng đồng bộ dữ liệu</td>\n            <td><code>rsync -avzP &lt;src&gt; &lt;dest&gt;</code></td>\n            <td><code>rsync -avzP /data/ user@bk:/backup/</code></td>\n            <td><code>-a</code> (archive), <code>-v</code> (verbose), <code>-z</code> (compress), <code>-P</code> (progress/resume)</td>\n          </tr>\n          <tr>\n            <td><code>rsync --dry-run</code></td>\n            <td>Mô phỏng đồng bộ để rà soát thay đổi</td>\n            <td><code>rsync -avzP -n &lt;src&gt; &lt;dest&gt;</code></td>\n            <td><code>rsync -av --delete --dry-run /src/ /dest/</code></td>\n            <td>Bắt buộc chạy trước khi kết hợp với <code>--delete</code></td>\n          </tr>\n          <tr>\n            <td><code>rsync -e 'ssh -p ...'</code></td>\n            <td>Đồng bộ qua kênh SSH bảo mật tùy biến cổng</td>\n            <td><code>rsync -avz -e \"ssh -p &lt;port&gt;\" &lt;src&gt; &lt;host&gt;:&lt;dest&gt;</code></td>\n            <td><code>rsync -avz -e \"ssh -p 2222\" /data/ root@backup:/data/</code></td>\n            <td>Tận dụng mã hóa SSH bảo vệ dữ liệu trên đường truyền</td>\n          </tr>\n          <tr>\n            <td><code>lvcreate -s</code></td>\n            <td>Tạo bản chụp thời gian LVM Snapshot</td>\n            <td><code>lvcreate -s -L &lt;size&gt; -n &lt;snap_name&gt; &lt;origin_lv&gt;</code></td>\n            <td><code>sudo lvcreate -s -L 2G -n lv_db_snap /dev/vg/lv_db</code></td>\n            <td>Tạo tức thì trong mili-giây theo cơ chế Copy-on-Write</td>\n          </tr>\n          <tr>\n            <td><code>lvconvert --merge</code></td>\n            <td>Hoàn tác toàn bộ dữ liệu về thời điểm chụp snapshot</td>\n            <td><code>lvconvert --merge &lt;snap_path&gt;</code></td>\n            <td><code>sudo lvconvert --merge /dev/vg/lv_db_snap</code></td>\n            <td>Cứu nạn khẩn cấp khi hệ thống bị hỏng dữ liệu sau nâng cấp</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-3-7-rsync-syntax",
          "title": "4.1 Làm chủ rsync Đồng bộ qua SSH & Bộ Cờ Tiêu chuẩn Vàng",
          "content": "\n        <p><strong>rsync (Remote Sync)</strong> là công cụ đồng bộ tệp tin tiêu chuẩn số 1 trong thế giới Linux và DevOps. Khác với <code>scp</code> hay <code>sftp</code> (luôn truyền lại toàn bộ file từ đầu đến cuối), rsync sử dụng thuật toán <strong>rolling checksum</strong> và <strong>delta-transfer</strong>: nó băm nhỏ file thành các khối, so sánh mã băm giữa nguồn và đích, và chỉ truyền tải các khối thực sự có sự thay đổi. Khi đồng bộ các file dung lượng lớn (như file máy ảo, database dump), rsync giúp tiết kiệm tới 90-95% băng thông và thời gian truyền tải.</p>\n\n        <h3 class=\"lx-h3\">Bảng phân tích bộ cờ tiêu chuẩn vàng trong rsync</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Cờ (Flag)</th>\n              <th>Tên cờ</th>\n              <th>Ý nghĩa &amp; Chức năng</th>\n              <th>Tại sao bắt buộc phải dùng</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>-a</code></td>\n              <td><code>--archive</code></td>\n              <td>Chế độ lưu trữ tổng hợp: tương đương <code>-rlptgoD</code> (đệ quy thư mục, bảo toàn liên kết tượng trưng symlink, quyền hạn permissions, dấu thời gian timestamps, owner, group, và file thiết bị).</td>\n              <td>Đảm bảo file ở máy đích có trạng thái giống hệt 100% so với máy nguồn.</td>\n            </tr>\n            <tr>\n              <td><code>-v</code></td>\n              <td><code>--verbose</code></td>\n              <td>In chi tiết danh sách file đang được xử lý ra terminal.</td>\n              <td>Giúp theo dõi tiến độ công việc.</td>\n            </tr>\n            <tr>\n              <td><code>-z</code></td>\n              <td><code>--compress</code></td>\n              <td>Nén dữ liệu trong quá trình truyền qua mạng và tự giải nén ở đích.</td>\n              <td>Tiết kiệm băng thông đáng kể đối với file văn bản, mã nguồn, log và SQL dump.</td>\n            </tr>\n            <tr>\n              <td><code>-P</code></td>\n              <td><code>--partial --progress</code></td>\n              <td>Hiển thị thanh tiến độ truyền tải và cho phép <strong>truyền tiếp (resume)</strong> nếu mạng bị đứt giữa chừng.</td>\n              <td>Cứu nguy khi truyền các file lớn hàng chục GB qua kết nối mạng Internet chập chờn.</td>\n            </tr>\n            <tr>\n              <td><code>-e 'ssh'</code></td>\n              <td><code>--rsh</code></td>\n              <td>Chỉ định shell mã hóa từ xa; có thể tùy biến cổng hoặc file SSH key.</td>\n              <td>Ví dụ: <code>-e 'ssh -p 2222 -i /root/.ssh/backup_key'</code>.</td>\n            </tr>\n            <tr>\n              <td><code>--exclude</code></td>\n              <td><code>--exclude</code></td>\n              <td>Loại trừ các file hoặc thư mục không cần sao lưu.</td>\n              <td>Ví dụ: <code>--exclude='*.pyc' --exclude='node_modules' --exclude='.git'</code>.</td>\n            </tr>\n            <tr>\n              <td><code>--bwlimit</code></td>\n              <td><code>--bwlimit=KBytes</code></td>\n              <td>Giới hạn băng thông truyền tải tối đa (tính theo KB/s).</td>\n              <td>Ngăn rsync ngốn hết đường truyền Internet của khách hàng vào giờ cao điểm (ví dụ <code>--bwlimit=5000</code>).</td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": [
            {
              "title": "Đồng bộ thư mục mã nguồn sang máy chủ backup qua cổng SSH tùy biến",
              "lang": "bash",
              "code": "# Đồng bộ thư mục dự án lên máy chủ backup từ xa:\n$ rsync -avzP \\\n    -e 'ssh -p 2222 -i ~/.ssh/id_ed25519' \\\n    --exclude='*.log' \\\n    --exclude='__pycache__' \\\n    --exclude='.venv' \\\n    --bwlimit=10000 \\\n    /opt/fastapi_app/ \\\n    backup_user@192.168.1.200:/data/backups/fastapi_app/",
              "output": "sending incremental file list\n./\nmain.py\n          4,120 100%    3.93MB/s    0:00:00 (xfr#1, to-chk=12/15)\nconfig.py\n          2,048 100%    1.95MB/s    0:00:00 (xfr#2, to-chk=11/15)\nrouters/\nrouters/orders.py\n          8,192 100%    7.81MB/s    0:00:00 (xfr#3, to-chk=8/15)\n\nsent 6,420 bytes  received 92 bytes  4,341.33 bytes/sec\ntotal size is 14,360  speedup is 2.21",
              "annotations": [
                {
                  "part": "-e 'ssh -p 2222'",
                  "text": "Chỉ định rsync kết nối qua cổng SSH bảo mật không tiêu chuẩn 2222."
                },
                {
                  "part": "--exclude",
                  "text": "Bỏ qua rác không cần sao lưu như file bytecode __pycache__ và môi trường ảo .venv."
                },
                {
                  "part": "--bwlimit=10000",
                  "text": "Khống chế tốc độ truyền tải tối đa 10 MB/s để giữ mạng ổn định cho các dịch vụ khác."
                },
                {
                  "part": "speedup is 2.21",
                  "text": "Tỷ lệ tăng tốc nhờ thuật toán nén và delta-transfer."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-7-delete-danger",
          "title": "4.2 Cảnh báo Đỏ Sống còn: Trailing Slash & Cờ Xóa --delete",
          "content": "\n        <p>Trong quá trình sao lưu, để bản backup ở máy đích phản ánh chính xác trạng thái của máy nguồn (nghĩa là nếu một file ở máy nguồn đã bị xóa thì ở máy đích cũng phải bị xóa theo), ta sử dụng cờ <code>--delete</code>. Tuy nhiên, <strong>đây là cờ có sức hủy diệt dữ liệu lớn nhất trong các công cụ Linux</strong> nếu kết hợp với sai lầm về dấu gạch chéo cuối (Trailing Slash)!</p>\n\n        <h3 class=\"lx-h3\">Cạm bẫy Dấu gạch chéo cuối (Trailing Slash: /)</h3>\n        <p>Hành vi của rsync thay đổi hoàn toàn chỉ vì sự có mặt của đúng 1 ký tự <code>/</code> ở cuối đường dẫn nguồn:</p>\n        <ul>\n          <li><strong>Có dấu <code>/</code> ở cuối (<code>/data/src/</code>):</strong> rsync hiểu là <em>'Hãy sao chép NỘI DUNG BÊN TRONG của thư mục src sang thư mục đích'</em>. Kết quả: các file nằm trực tiếp dưới <code>/backup/</code>.</li>\n          <li><strong>KHÔNG có dấu <code>/</code> ở cuối (<code>/data/src</code>):</strong> rsync hiểu là <em>'Hãy sao chép CẢ THƯ MỤC src sang thư mục đích'</em>. Kết quả: rsync tạo ra thư mục <code>/backup/src/</code>.</li>\n        </ul>\n\n        <div class=\"lx-callout-danger\">\n          <strong>⚠️ THẢM HỌA XÓA TRẮNG DỮ LIỆU VỚI CỜ --delete:</strong><br/>\n          Giả sử bạn muốn đồng bộ một thư mục trống <code>/tmp/empty</code> sang <code>/backup/</code> với lệnh:<br/>\n          <code>rsync -av --delete /tmp/empty/ /backup/</code><br/>\n          Vì nguồn trống rỗng và bạn có cờ <code>--delete</code>, rsync sẽ coi tất cả các file đang có trong <code>/backup/</code> là 'thừa' và <strong>LẬP TỨC XÓA SẠCH TOÀN BỘ DỮ LIỆU TRONG /backup/ VĨNH VIỄN!</strong><br/>\n          <strong>Quy tắc an toàn bất di bất dịch:</strong> Trước khi chạy bất kỳ lệnh rsync nào có cờ <code>--delete</code>, BẮT BUỘC phải thêm cờ <code>-n</code> (hoặc <code>--dry-run</code>) để chạy thử nghiệm ảo! Quan sát kỹ danh sách các file có chữ <em>*deleting*</em>; chỉ khi chắc chắn danh sách đó là chính xác thì mới bỏ cờ <code>-n</code> để chạy thật.\n        </div>\n      ",
          "codeExamples": [
            {
              "title": "Quy trình chạy thử khô (Dry-Run) với cờ -n trước khi xóa thực tế",
              "lang": "bash",
              "code": "# Bước 1: BẮT BUỘC - Chạy thử khô với cờ -n (--dry-run):\n$ rsync -avzP -n --delete /opt/fastapi_app/ /data/backups/fastapi_app/\nsending incremental file list\n*deleting   old_unused_file.bak\n*deleting   test_data.csv\nrouters/new_module.py\n\nsent 420 bytes  received 35 bytes  910.00 bytes/sec\ntotal size is 14,360  speedup is 31.56 (DRY RUN)\n\n# Dòng chữ (DRY RUN) xác nhận: CHƯA CÓ BẤT KỲ FILE NÀO TRÊN ĐĨA BỊ XÓA!\n# Bạn kiểm tra thấy old_unused_file.bak và test_data.csv đúng là file rác cần xóa.\n\n# Bước 2: Tự tin bỏ cờ -n để thực hiện đồng bộ thật:\n$ rsync -avzP --delete /opt/fastapi_app/ /data/backups/fastapi_app/",
              "output": "sending incremental file list\ndeleting old_unused_file.bak\ndeleting test_data.csv\nrouters/new_module.py",
              "annotations": [
                {
                  "part": "-n (--dry-run)",
                  "text": "Mô phỏng toàn bộ quá trình truyền tải và xóa file mà không chạm vào một byte dữ liệu nào trên đĩa."
                },
                {
                  "part": "*deleting",
                  "text": "Dấu hiệu cảnh báo các file trên thư mục đích sẽ bị tiêu hủy vĩnh viễn khi chạy thật."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-7-lvm-snapshot",
          "title": "4.3 Sao lưu Điểm Thời gian Nhất quán với LVM Snapshot (Point-in-Time)",
          "content": "\n        <p>Khi sao lưu các hệ thống cơ sở dữ liệu đang chạy chịu tải cao (PostgreSQL, MySQL, SQLite), việc sao chép file trực tiếp bằng <code>cp</code> hay <code>rsync</code> trên thư mục dữ liệu sống (live data directory) là điều cấm kỵ. Do database liên tục ghi các trang dữ liệu vào đĩa lúc rsync đang đọc, file backup thu được sẽ rơi vào trạng thái <strong>tham nhũng xé rách (Torn Pages / Corrupted State)</strong> và không bao giờ phục hồi lại được.</p>\n\n        <p><strong>LVM Snapshot</strong> giải quyết bài toán này triệt để bằng cơ chế <strong>Copy-on-Write (CoW)</strong>:</p>\n        <ol>\n          <li>Tạo một ảnh chụp logic snapshot chỉ trong vài mili-giây.</li>\n          <li>Khi có một khối dữ liệu trên ổ chính bị thay đổi, LVM sẽ chép khối dữ liệu nguyên bản cũ sang vùng snapshot trước khi cho phép ghi đè lên ổ chính.</li>\n          <li>Phân vùng snapshot đóng băng trạng thái của dữ liệu đúng tại thời điểm chụp (Point-in-Time Consistency). Quản trị viên gắn kết (mount) snapshot dưới dạng chỉ đọc và thong thả sao lưu sang nơi khác mà không cần dừng Database dù chỉ 1 giây!</li>\n        </ol>\n\n        <div class=\"lx-callout-danger\">\n          <strong>⚠️ CẠNH BÁO TRÀN VÙNG ĐỆM SNAPSHOT (COW OVERFLOW):</strong><br/>\n          Vùng nhớ snapshot không chứa toàn bộ dữ liệu, mà chỉ chứa các khối bị thay đổi. Nếu bạn tạo snapshot 5GB mà để quên suốt 3 ngày, khi dữ liệu ghi mới trên ổ chính vượt quá 5GB dung lượng đệm, snapshot sẽ bị <strong>tràn (Snapshot Invalidation / 100% full)</strong> và bị kernel vô hiệu hóa ngay lập tức. Nguy hiểm hơn, việc duy trì snapshot lâu ngày sẽ làm suy giảm nghiêm trọng hiệu năng đọc/ghi của ổ chính. <strong>Quy tắc: Sau khi sao lưu xong, phải unmount và xóa bỏ snapshot ngay lập tức!</strong>\n        </div>\n      ",
          "codeExamples": [
            {
              "title": "Quy trình sao lưu cơ sở dữ liệu nhất quán với LVM Snapshot từ A đến Z",
              "lang": "bash",
              "code": "# Bước 1: Khóa nhẹ database hoặc flush bảng (đối với Postgres/MySQL) để đồng bộ cache xuống đĩa:\n# (Ví dụ: psql -c \"SELECT pg_backup_start('lvm_snap');\")\n\n# Bước 2: Tạo LVM Snapshot dung lượng 10GB từ Volume gốc lv_postgres:\n$ sudo lvcreate -s -L 10G -n snap_postgres /dev/vg_prod/lv_postgres\n\n# (Mở khóa database ngay lập tức: psql -c \"SELECT pg_backup_stop();\")\n# Tổng thời gian database bị giữ chỉ khoảng 0.2 giây!\n\n# Bước 3: Tạo thư mục và gắn kết Snapshot ở chế độ Chỉ đọc (Read-Only):\n# (Lưu ý: Với hệ thống file XFS, cần thêm tùy chọn nouuid vì XFS từ chối mount trùng UUID)\n$ sudo mkdir -p /mnt/snapshot_db\n$ sudo mount -o ro,nouuid /dev/vg_prod/snap_postgres /mnt/snapshot_db\n\n# Bước 4: Thong thả sao lưu dữ liệu nhất quán sang máy chủ lưu trữ từ xa:\n$ rsync -avz /mnt/snapshot_db/ backup_server:/backups/postgres_snapshot_$(date +%F)/\n\n# Bước 5: BẮT BUỘC - Unmount và Xóa bỏ Snapshot ngay sau khi xong việc:\n$ sudo umount /mnt/snapshot_db\n$ sudo lvremove -f /dev/vg_prod/snap_postgres\n  Logical volume \"snap_postgres\" successfully removed.",
              "output": "  Logical volume \"snap_postgres\" created.\n  Logical volume \"snap_postgres\" successfully removed.",
              "annotations": [
                {
                  "part": "lvcreate -s -L 10G",
                  "text": "Cờ -s chỉ định tạo Snapshot; dung lượng 10GB là không gian tối đa cho các khối dữ liệu bị thay đổi trong lúc sao lưu."
                },
                {
                  "part": "-o ro,nouuid",
                  "text": "Gắn kết an toàn chỉ đọc, cờ nouuid giúp XFS bỏ qua kiểm tra trùng UUID với phân vùng gốc đang chạy."
                },
                {
                  "part": "lvremove -f",
                  "text": "Xóa snapshot ngay lập tức, giải phóng tài nguyên và bảo toàn hiệu năng I/O cho máy chủ."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Phân biệt Trailing Slash ('/') và Quy trình kiểm thử cờ --delete an toàn</h4>\n      <p>Giảng viên kiểm tra tác động của dấu gạch chéo cuối trong câu lệnh rsync:</p>\n      <pre><code># Tình huống A: Có dấu '/' ở cuối nguồn\nrsync -av /var/www/html/ /backup/html/\n# Kết quả: Đồng bộ NỘI DUNG bên trong html vào /backup/html/\n\n# Tình huống B: Không có dấu '/' ở cuối nguồn\nrsync -av /var/www/html /backup/\n# Kết quả: Tạo thư mục 'html' bên trong /backup/</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Dùng --delete mà không có --dry-run</div>\n          <pre><code># Tai họa kinh hoàng:\nrsync -av --delete /empty_folder/ /production_data/\n\n# Kết quả: Toàn bộ dữ liệu trong /production_data/\n# bị XÓA SẠCH VĨNH VIỄN trong chớp mắt!</code></pre>\n          <p class=\"lx-diff-desc\">Cờ <code>--delete</code> xóa mọi tệp ở đích mà không tồn tại ở nguồn. Nếu nguồn bị rỗng hoặc gõ sai đường dẫn, toàn bộ dữ liệu đích sẽ bị xóa sổ!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Luôn kiểm tra với -n (--dry-run)</div>\n          <pre><code># Bước 1: Mô phỏng kiểm tra danh sách file sắp bị xóa\nrsync -av --delete --dry-run /source/ /dest/\n\n# Bước 2: Chỉ khi danh sách an toàn mới chạy lệnh thật\nrsync -av --delete /source/ /dest/</code></pre>\n          <p class=\"lx-diff-desc\">Ngăn chặn 100% rủi ro xóa nhầm dữ liệu sản xuất nhờ chế độ chạy thử nghiệm an toàn.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Đồng bộ Vi sai rsync & Tạo LVM Snapshot Sao lưu Cơ sở Dữ liệu",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.7</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thực hành đồng bộ 2 thư mục bằng rsync, quan sát tốc độ truyền vi sai, kiểm tra hành vi của cờ <code>--delete</code> với <code>--dry-run</code>, và thực hiện tạo LVM Snapshot để sao lưu dữ liệu nhất quán.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Linux có rsync.</li>\n        <li>Tạo thư mục làm việc: <code>mkdir -p ~/rsync-lab/{src,dest}</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Tạo dữ liệu mẫu trong thư mục <code>src</code>:\n          <pre><code>for i in {1..5}; do echo \"Dữ liệu ban đầu $i\" > ~/rsync-lab/src/doc$i.txt; done</code></pre>\n        </li>\n        <li>Đồng bộ lần đầu sang <code>dest</code>:\n          <pre><code>rsync -avzP ~/rsync-lab/src/ ~/rsync-lab/dest/\nls -la ~/rsync-lab/dest/</code></pre>\n        </li>\n        <li>Sửa đổi nội dung của 1 file và thêm 1 file mới:\n          <pre><code>echo \"Đã cập nhật thêm dòng mới\" >> ~/rsync-lab/src/doc1.txt\necho \"File mới số 6\" > ~/rsync-lab/src/doc6.txt</code></pre>\n        </li>\n        <li>Đồng bộ lần thứ 2 và quan sát log truyền tải:\n          <pre><code>rsync -avzP ~/rsync-lab/src/ ~/rsync-lab/dest/</code></pre>\n          <em>Chỉ có doc1.txt và doc6.txt được truyền đi, các file còn lại được bỏ qua tức thì!</em>\n        </li>\n        <li>Kiểm thử cờ <code>--delete</code> ở chế độ mô phỏng <code>--dry-run</code>:\n          <pre><code>rm -f ~/rsync-lab/src/doc2.txt\nrsync -av --delete --dry-run ~/rsync-lab/src/ ~/rsync-lab/dest/</code></pre>\n          <em>Quan sát thông báo: 'deleting doc2.txt' hiển thị trên màn hình mà file thật trong dest vẫn còn nguyên.</em>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>rsync chỉ truyền các khối dữ liệu thay đổi; lệnh dry-run liệt kê chính xác các file sẽ bị xóa mà không gây mất mát dữ liệu.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Sử dụng tùy chọn <code>--bwlimit=1000</code> để giới hạn băng thông đồng bộ ở mức 1MB/s nhằm tránh làm nghẽn đường truyền mạng văn phòng.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Khi sử dụng LVM Snapshot, dung lượng của Snapshot Volume phải được giám sát chặt chẽ. Nếu dung lượng các khối dữ liệu bị sửa đổi vượt quá kích thước cấp phát cho Snapshot (100% full), Snapshot sẽ bị hỏng hoàn toàn (Invalid Snapshot) và không thể mount hay merge được nữa!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>rsync tạo ra thư mục lồng nhau kiểu /backup/dest/src/src/...</strong></td><td>Thiếu dấu gạch chéo cuối (<code>/</code>) ở đường dẫn nguồn khiến rsync coi đó là việc sao chép cả thư mục thay vì chỉ sao chép nội dung bên trong.</td><td>Luôn kiểm tra kỹ đường dẫn nguồn: <code>rsync -a /source/ /dest/</code>.</td></tr>\n          <tr><td><strong>rsync báo <code>Permission denied (13)</code> khi đồng bộ các file hệ thống</strong></td><td>Người dùng chạy rsync bằng user thường không có quyền đọc các tệp cấu hình mật khẩu hoặc ghi vào thư mục đích.</td><td>Chạy với quyền <code>sudo</code> hoặc sử dụng cờ <code>--rsync-path=\"sudo rsync\"</code> khi đồng bộ qua SSH.</td></tr>\n          <tr><td><strong>LVM Snapshot bị crash và báo trạng thái <code>INACTIVE</code></strong></td><td>Phân vùng gốc ghi quá nhiều dữ liệu mới khiến không gian Copy-on-Write của Snapshot bị tràn (đạt 100% dung lượng).</td><td>Luôn cấp phát dung lượng Snapshot đủ lớn (ít nhất 20-30% phân vùng gốc) và xóa bỏ Snapshot ngay sau khi hoàn thành tiến trình backup tệp.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Sử dụng SSH Key chuyên biệt có giới hạn lệnh (Force Command) cho rsync:</strong> Khi thiết lập backup tự động qua SSH, cấu hình trong <code>authorized_keys</code> chỉ thị <code>command=\"rsync --server ...\",no-pty,no-port-forwarding</code> để nếu khóa backup có bị lộ, tin tặc cũng không thể mở shell tương tác vào máy chủ.</li>\n        <li><strong>Không lưu bản sao lưu trên cùng một mảng đĩa vật lý:</strong> LVM Snapshot chỉ bảo vệ bạn trước sự cố lỗi logic (xóa nhầm file, lỗi phần mềm). Nếu ổ cứng vật lý bị cháy hoặc controller bị hỏng, cả bản gốc và Snapshot đều biến mất. Bắt buộc phải rsync bản sao sang máy chủ vật lý độc lập.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>rsync Official Documentation:</strong> <a href=\"https://rsync.samba.org/documentation.html\" target=\"_blank\" rel=\"noopener\">Samba rsync Documentation & Algorithms</a>.</li>\n      <li><strong>Linux LVM Snapshot HowTo:</strong> Tài liệu hướng dẫn thiết lập Snapshot an toàn của The Linux Documentation Project.</li>\n      <li><strong>BorgBackup:</strong> Công cụ sao lưu hiện đại hỗ trợ khử trùng lặp (Deduplication) và mã hóa xác thực: <a href=\"https://www.borgbackup.org/\" target=\"_blank\" rel=\"noopener\">borgbackup.org</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Ý nghĩa Từng Ký tự trong Cờ Lưu trữ rsync -a",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Cờ tương đương</th><th>Tên tính năng</th><th>Tác dụng bảo tồn thuộc tính</th></tr></thead>\n        <tbody>\n          <tr><td><code>-r</code></td><td>Recursive</td><td>Đệ quy quét sâu vào toàn bộ thư mục con</td></tr>\n          <tr><td><code>-l</code></td><td>Links</td><td>Bảo tồn các liên kết mềm (Symbolic Links) dưới dạng link</td></tr>\n          <tr><td><code>-p</code></td><td>Permissions</td><td>Giữ nguyên phân quyền tệp (rwx) của bản gốc</td></tr>\n          <tr><td><code>-t</code></td><td>Times</td><td>Bảo tồn mốc thời gian sửa đổi (Modification Timestamp)</td></tr>\n          <tr><td><code>-g</code></td><td>Group</td><td>Giữ nguyên nhóm sở hữu (Group ownership)</td></tr>\n          <tr><td><code>-o</code></td><td>Owner</td><td>Giữ nguyên người sở hữu (User ownership - yêu cầu quyền root)</td></tr>\n          <tr><td><code>-D</code></td><td>Devices & Specials</td><td>Giữ nguyên các file thiết bị khối/ký tự (Block/Character devices)</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Đồng bộ kho tệp đính kèm 2TB giữa 2 miền Bắc - Nam mà không làm nghẽn đường truyền người dùng",
        "content": "\n      <p><strong>1. Triệu chứng & Thách thức:</strong> Doanh nghiệp có kho lưu trữ tài liệu người dùng <code>/var/data/uploads</code> dung lượng <strong>2.1 TB với hơn 4 triệu file nhỏ</strong> tại trung tâm dữ liệu Hà Nội. Nhiệm vụ đặt ra là phải đồng bộ sang trung tâm dữ liệu dự phòng tại TP.HCM mỗi đêm qua kênh truyền mạng WAN băng thông 100 Mbps. Lần đầu chạy thử lệnh <code>scp</code>, tiến trình mất tới 36 tiếng và làm nghẽn toàn bộ đường truyền khiến khách hàng không thể tải tài liệu trong giờ làm việc.</p>\n      \n      <p><strong>2. Điều tra & Thiết kế Giải pháp:</strong></p>\n      <ul>\n        <li>Khoảng 99% tài liệu là file tĩnh không thay đổi; mỗi ngày chỉ có khoảng 15 GB tài liệu mới hoặc chỉnh sửa.</li>\n        <li>Lệnh <code>scp</code> sao chép lại toàn bộ là hoàn toàn sai lầm. Công cụ tối ưu bắt buộc phải là <code>rsync</code> để tận dụng thuật toán delta-transfer.</li>\n        <li>Cần khống chế tốc độ truyền tải tối đa trong giờ hành chính để không ảnh hưởng đến đường truyền của người dùng.</li>\n      </ul>\n      \n      <p><strong>3. Nguyên nhân gốc rễ:</strong> Việc sử dụng công cụ truyền tải không tối ưu (scp) và thiếu chính sách khống chế băng thông (bandwidth throttle) gây nghẽn mạng WAN và kéo dài thời gian sao lưu vượt quá cửa sổ bảo trì ban đêm.</p>\n      \n      <p><strong>4. Biện pháp triển khai:</strong> Thiết lập quy trình rsync qua SSH kết hợp khóa quyền chuyên dụng và giới hạn băng thông:</p>\n      <pre><code># Tạo script /usr/local/bin/sync_storage.sh:\n#!/usr/bin/env bash\nset -euo pipefail\n\nLOG_FILE=\"/var/log/sync_storage.log\"\nSOURCE_DIR=\"/var/data/uploads/\"\nDEST_SERVER=\"backup-user@hcm-backup.internal\"\nDEST_DIR=\"/var/data/uploads/\"\n\n# Giới hạn 40 Mbps (~5 MB/s) để giữ 60% băng thông cho dịch vụ khách hàng:\nBW_LIMIT=5000\n\necho \"[$(date '+%Y-%m-%d %H:%M:%S')] Bắt đầu đồng bộ kho tài liệu...\" >> \"$LOG_FILE\"\n\nrsync -avzP \\\n    --delete \\\n    --bwlimit=\"$BW_LIMIT\" \\\n    -e 'ssh -i /root/.ssh/id_ed25519_backup -p 2222 -o StrictHostKeyChecking=accept-new' \\\n    \"$SOURCE_DIR\" \\\n    \"$DEST_SERVER\":\"$DEST_DIR\" >> \"$LOG_FILE\" 2>&1\n\necho \"[$(date '+%Y-%m-%d %H:%M:%S')] Hoàn tất đồng bộ thành công!\" >> \"$LOG_FILE\"</code></pre>\n      <p>Nhờ thuật toán delta-transfer, sau lần đồng bộ đầu tiên, mỗi đêm rsync chỉ mất <strong>22 phút</strong> để đồng bộ toàn bộ 15GB dữ liệu mới. Băng thông mạng luôn được giới hạn an toàn dưới 5MB/s, hoàn toàn không gây bất kỳ độ trễ nào cho khách hàng.</p>\n      \n      <p><strong>5. Phòng ngừa lâu dài:</strong></p>\n      <ul>\n        <li>Tích hợp script vào <code>systemd Timer</code> chạy lúc 01:30 sáng hàng ngày với chỉ thị <code>Persistent=true</code>.</li>\n        <li>Trên máy chủ backup phía TP.HCM, cấu hình tệp <code>authorized_keys</code> chỉ cho phép thực thi duy nhất lệnh rsync bằng tiền tố: <code>command=\"rsync --server ...\"</code> để hacker dù có đánh cắp được SSH key cũng không thể mở shell tương tác chiếm máy chủ.</li>\n      </ul>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Cạm bẫy dấu gạch chéo cuối (Trailing Slash) làm xáo trộn cấu trúc thư mục",
            "content": "Hãy ghi nhớ sự khác biệt sống còn: <code>rsync -a /src/ /dst/</code> (có dấu / cuối) sẽ chép các file con bên trong <code>src</code> đổ thẳng vào <code>dst</code>. Trong khi <code>rsync -a /src /dst/</code> (không có dấu / cuối) sẽ tạo ra một thư mục con mang tên <code>/dst/src/</code>. Nhầm lẫn dấu gạch chéo này kết hợp với cờ <code>--delete</code> có thể xóa nhầm hàng triệu file ở thư mục đích!"
          },
          {
            "title": "Bỏ quên LVM Snapshot quá lâu làm tràn vùng nhớ đệm CoW",
            "content": "LVM Snapshot sử dụng cơ chế Copy-on-Write: khi volume gốc bị sửa, block dữ liệu cũ được chép sang vùng snapshot. Nếu bạn tạo snapshot 5GB mà để quên suốt 3 ngày, khi dữ liệu ghi trên ổ chính vượt quá 5GB, snapshot sẽ bị <strong>tràn (Snapshot Invalidation / 100% full)</strong> và rơi vào trạng thái lỗi không đọc được. Luôn nhớ xóa snapshot ngay sau khi sao lưu xong!"
          }
        ],
        "tips": [
          {
            "title": "Luôn dùng cờ -n (--dry-run) trước khi áp dụng cờ --delete",
            "content": "Mỗi khi viết một lệnh rsync có chứa cờ hủy diệt <code>--delete</code>, hãy luôn chèn thêm cờ <code>-n</code> (dry-run). Lệnh sẽ chạy mô phỏng và in ra toàn bộ các tệp dự kiến sẽ bị xóa có tiền tố <code>*deleting</code>. Khi bạn đã kiểm tra và thấy danh sách đó hoàn toàn chính xác, hãy tự tin bỏ cờ <code>-n</code> để chạy thật."
          },
          {
            "title": "Giới hạn băng thông mạng khi rsync vào giờ làm việc bằng --bwlimit",
            "content": "Nếu bạn phải chạy rsync vào ban ngày và sợ làm nghẽn đường truyền mạng Internet của khách hàng, hãy thêm cờ giới hạn băng thông: <code>--bwlimit=5000</code> (giới hạn tối đa 5000 KB/s ~ 5 MB/s). rsync sẽ tự động điều tiết tốc độ đọc ghi gói tin mượt mà."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Phân biệt ý nghĩa dấu gạch chéo cuối đường dẫn nguồn trong rsync",
          "problem": "Phân biệt sự khác nhau về hành vi giữa hai lệnh sau: rsync -av /src/dir /dest/ và rsync -av /src/dir/ /dest/. Khi nào dùng lệnh nào?",
          "hint": "Dấu gạch chéo cuối /dir/ nghĩa là sao chép nội dung bên trong, không có dấu /dir nghĩa là sao chép cả thư mục.",
          "solutionCode": "# Cách 1: Tạo thư mục /dest/dir/ chứa các file con\nrsync -av /src/dir /dest/\n\n# Cách 2: Chép trực tiếp các file con vào ngay trong /dest/\nrsync -av /src/dir/ /dest/",
          "solutionOutput": "# Lệnh 1 tạo /dest/dir/file1.txt\n# Lệnh 2 tạo /dest/file1.txt",
          "explanation": "Quy tắc vàng của rsync: dấu gạch chéo cuối (trailing slash) trên thư mục nguồn có nghĩa là \"chép nội dung bên trong thư mục này\". Thiếu dấu gạch chéo có nghĩa là \"chép chính thư mục này vào trong thư mục đích\".",
          "annotations": [
            {
              "part": "trailing slash /",
              "text": "Khác biệt tinh tế nhưng có thể làm biến dạng cấu trúc thư mục sao lưu nếu gõ nhầm."
            }
          ],
          "rubric": [
            {
              "criterion": "Phân tích trailing slash",
              "pass": "Chỉ ra sự khác biệt về cấu trúc đích",
              "excellent": "Vẽ sơ đồ hoặc giải thích rõ hành vi tạo thư mục con",
              "weight": "50%"
            },
            {
              "criterion": "Độ an toàn thao tác",
              "pass": "Nêu được cách dùng phù hợp",
              "excellent": "Nhận thức được rủi ro lộn xộn file nếu thiếu /",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Đồng bộ dữ liệu tối ưu qua SSH với rsync -avz --delete",
          "problem": "Hãy viết một câu lệnh rsync hoàn chỉnh để đồng bộ thư mục /var/www/ lên máy chủ dự phòng (192.168.1.80:/backup/www/) qua cổng SSH 2222, xóa file đã bị xóa ở nguồn và hiển thị tiến độ.",
          "hint": "Dùng cờ -avz, --delete, -e \"ssh -p 2222\" và --info=progress2.",
          "solutionCode": "rsync -avz --delete --info=progress2 -e \"ssh -p 2222 -i ~/.ssh/backup_key\" /var/www/ backup_user@192.168.1.80:/backup/www/",
          "solutionOutput": "sending incremental file list\n          1.24G 100%   45.20MB/s    0:00:26 (xfr#3420, to-chk=0/4500)",
          "explanation": "Cờ -a (archive) bảo tồn nguyên vẹn quyền, thời gian, symlink. Cờ -z nén dữ liệu trên đường truyền. --delete đảm bảo thư mục đích là bản sao gương hoàn hảo của nguồn. Cờ -e chỉ định cổng và khóa SSH tùy chỉnh.",
          "annotations": [
            {
              "part": "--delete",
              "text": "Đồng bộ hóa 2 chiều một chiều: xóa bỏ các file ở đích nếu nguồn đã xóa."
            },
            {
              "part": "-e \"ssh -p 2222\"",
              "text": "Kênh truyền dẫn an toàn mã hóa qua cổng SSH phi tiêu chuẩn."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp rsync nâng cao",
              "pass": "Dùng đúng -avz và --delete",
              "excellent": "Kết hợp cổng SSH tùy chỉnh -e và hiển thị tiến độ progress2",
              "weight": "50%"
            },
            {
              "criterion": "Bảo toàn dữ liệu",
              "pass": "Giữ nguyên thuộc tính file (-a)",
              "excellent": "Giải thích được lợi ích của thuật toán Delta Transfer của rsync",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Chiến lược snapshot và backup cơ sở dữ liệu nhất quán",
          "problem": "Cơ sở dữ liệu đang hoạt động liên tục có thể bị hỏng nếu sao lưu tệp trực tiếp trong lúc đang ghi đĩa. Hãy mô tả quy trình kết hợp LVM Snapshot (hoặc pg_dump/mariabackup) để sao lưu nhất quán.",
          "hint": "Sử dụng lệnh snapshot LVM hoặc công cụ dump chuyên dụng có khóa bảng nguyên tử.",
          "solutionCode": "# 1. Tạo LVM snapshot dung lượng 5GB trong chớp mắt:\nsudo lvcreate -L 5G -s -n lv_db_snap /dev/vg_data/lv_database\n\n# 2. Gắn kết snapshot ở chế độ chỉ đọc:\nsudo mkdir -p /mnt/snapshot\nsudo mount -o ro /dev/vg_data/lv_db_snap /mnt/snapshot\n\n# 3. Đồng bộ dữ liệu an toàn ra máy chủ lưu trữ:\nrsync -av /mnt/snapshot/ backup-server:/backups/db/\n\n# 4. Dọn dẹp snapshot sau khi sao lưu xong:\nsudo umount /mnt/snapshot\nsudo lvremove -y /dev/vg_data/lv_db_snap",
          "solutionOutput": "Logical volume \"lv_db_snap\" created.\n[INFO] Sao lưu hoàn tất. Snapshot đã được giải phóng an toàn.",
          "explanation": "LVM Snapshot chụp lại trạng thái của hệ thống file tại một thời điểm gần như tức thì (vài mili-giây) theo cơ chế Copy-on-Write (CoW). Sau khi snapshot được tạo, ứng dụng tiếp tục ghi đĩa bình thường trong khi tiến trình sao lưu đọc từ bản snapshot bất biến.",
          "annotations": [
            {
              "part": "lvcreate -s",
              "text": "Tạo volume dạng snapshot CoW ghi nhận trạng thái khối tĩnh."
            }
          ],
          "rubric": [
            {
              "criterion": "Quy trình Snapshot",
              "pass": "Tạo và mount snapshot",
              "excellent": "Có bước unmount và xóa lvremove giải phóng tài nguyên",
              "weight": "50%"
            },
            {
              "criterion": "Tính nhất quán dữ liệu",
              "pass": "Hiểu rủi ro torn-write",
              "excellent": "Phân tích được cơ chế Copy-on-Write của snapshot",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "rsync là công cụ đồng bộ dữ liệu vi sai (delta-transfer) tiêu chuẩn công nghiệp: chỉ truyền các byte dữ liệu thực sự thay đổi.",
        "Bộ cờ tiêu chuẩn vàng rsync -avzP bảo toàn toàn bộ thuộc tính tệp (quyền, mtime, symlink) kèm nén dữ liệu và hiển thị tiến trình.",
        "Quy tắc dấu gạch chéo cuối (Trailing Slash): /src/ đồng bộ nội dung bên trong; /src đồng bộ chính thư mục đó.",
        "Cờ --delete đồng bộ trạng thái xóa ở đích; BẮT BUỘC phải chạy thử nghiệm với --dry-run trước để tránh thảm họa xóa nhầm dữ liệu.",
        "LVM Snapshot đóng băng trạng thái phân vùng tại một thời điểm tức thì bằng cơ chế Copy-on-Write, cho phép sao lưu cơ sở dữ liệu nhất quán 100% không cần dừng dịch vụ."
      ],
      "generalInfo": {
        "duration": "50 phút",
        "targetAudience": "Sysadmin, Storage Engineer, Disaster Recovery Specialist",
        "prerequisites": "Hiểu LVM (Bài 3.3), SSH và quản lý phân quyền tệp Linux",
        "environment": "Máy tính Linux có cài rsync, openssh-client và phân vùng LVM có dung lượng trống",
        "materials": "Terminal Linux, quyền sudo, thư mục nguồn và đích mô phỏng dữ liệu"
      },
      "nextLessonPreview": "Trong Bài 3.8, chúng ta sẽ bước sang triển khai Dịch vụ Web Doanh nghiệp: cấu hình Nginx Reverse Proxy chuẩn Production, tối ưu bộ đệm và tự động hóa chứng chỉ SSL/TLS miễn phí với Certbot.",
      "quiz": [
        {
          "question": "Sự khác biệt giữa hai lệnh sau là gì?\n(1) rsync -av /data/ /backup/\n(2) rsync -av /data /backup/",
          "options": [
            "Không có sự khác biệt nào",
            "Lệnh (1) đồng bộ các tệp bên trong /data vào thẳng /backup; lệnh (2) sẽ tạo một thư mục con /backup/data và đặt các tệp vào đó",
            "Lệnh (1) nén dữ liệu, lệnh (2) không nén",
            "Lệnh (1) xóa file cũ, lệnh (2) giữ nguyên file cũ"
          ],
          "explanation": "Dấu gạch chéo cuối (trailing slash) ở nguồn chỉ thị cho rsync chỉ lấy nội dung bên trong thư mục mà không tạo thêm cấp thư mục cha ở đích.",
          "correctIndex": 1
        },
        {
          "question": "Tại sao nên tạo LVM Snapshot trước khi thực hiện sao lưu tệp dữ liệu của một cơ sở dữ liệu (Database) đang hoạt động?",
          "options": [
            "Để sao lưu nhanh gấp 10 lần",
            "Để có được một bản sao dữ liệu nhất quán tại đúng một điểm thời gian (Point-in-Time Consistency) mà không phải tắt database",
            "Để tự động nén dữ liệu thành file .zip",
            "Để mã hóa dữ liệu cơ sở dữ liệu"
          ],
          "explanation": "Nếu copy trực tiếp khi database đang ghi, các bảng dữ liệu sẽ bị ghi lệch thời gian dẫn đến hỏng cấu trúc (inconsistent state). LVM Snapshot đóng băng dữ liệu tức thì giúp việc sao lưu hoàn toàn toàn vẹn.",
          "correctIndex": 1
        },
        {
          "question": "Khi sử dụng `rsync --delete`, điều gì sẽ xảy ra nếu bạn vô tình gõ sai đường dẫn thư mục nguồn thành một thư mục rỗng?",
          "options": [
            "Toàn bộ dữ liệu tại thư mục đích sẽ bị xóa sạch để khớp với trạng thái rỗng của nguồn",
            "rsync sẽ tự động dừng và báo lỗi",
            "rsync chỉ bỏ qua và không làm gì",
            "Thư mục đích sẽ tự động chuyển thành file zip"
          ],
          "correctIndex": 0,
          "explanation": "Đây là cạm bẫy kinh điển và cực kỳ nguy hiểm trong quản trị hệ thống. Khi bật `--delete`, rsync sẽ xóa mọi file ở đích không tồn tại ở nguồn. Nếu nguồn rỗng, rsync sẽ xóa sạch toàn bộ thư mục đích. Luôn kiểm tra kỹ bằng cờ dry-run `-n` trước khi thực hiện."
        }
      ],
      "reflectionQuestion": "Một kỹ sư thiết lập cron job chạy hàng đêm: `rsync -av --delete /var/www/html/ /backup/web/`. Một ngày nọ, một lập trình viên vô tình chạy lệnh xóa nhầm toàn bộ thư mục `/var/www/html/` vào lúc 23:00. Đến 02:00 sáng hôm sau cron job kích hoạt. Hãy phân tích chuyện gì đã xảy ra với bản backup trong `/backup/web/` và đề xuất giải pháp kiến trúc để ngăn chặn thảm họa này.",
      "reflectionHint": "Gợi ý: Thảm họa: Khi nguồn `/var/www/html/` bị rỗng, lệnh `rsync --delete` đã coi việc rỗng này là trạng thái chuẩn và xóa sạch toàn bộ bản backup trong `/backup/web/`, khiến toàn bộ dữ liệu bị mất vĩnh viễn không thể khôi phục! Giải pháp ngăn chặn: 1. Sử dụng cờ an toàn `--max-delete=N` để rsync từ chối xóa nếu số lượng file bị xóa vượt quá ngưỡng an toàn. 2. Kiểm tra tính hợp lệ của nguồn trước khi chạy: `[[ -f /var/www/html/index.php ]] && rsync ...`. 3. Áp dụng sao lưu nhiều phiên bản (Versioning) hoặc xoay vòng thư mục theo ngày thay vì đồng bộ đè trực tiếp."
    },
    {
      "id": "lx-3-08",
      "number": "3.8",
      "title": "Triển khai Dịch vụ Web Nginx Reverse Proxy, Tối ưu Hiệu năng & Chứng chỉ SSL HTTPS",
      "subtitle": "Đưa ứng dụng ra Internet an toàn: Cấu hình Nginx đứng trước Python FastAPI/Django, tối ưu bộ đệm, và tự động cấp phát SSL Let's Encrypt đạt điểm A+",
      "level": "Nâng cao",
      "duration": "60 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "1. [Biết - Remember] Nắm vững cấu trúc tệp cấu hình Nginx (events, http, server, location) và các chỉ thị proxy_pass, proxy_set_header",
        "2. [Hiểu - Understand] Hiểu rõ cơ chế xác thực chứng chỉ TLS/SSL qua giao thức ACME của Let's Encrypt và quy trình bắt tay HTTPS",
        "3. [Vận dụng - Apply] Cấu hình Nginx làm Reverse Proxy bảo vệ ứng dụng nội bộ, tối ưu nén Gzip và cài đặt SSL miễn phí với Certbot",
        "4. [Phân tích - Analyze] Phân tích và cấu hình các tiêu đề bảo mật nâng cao (HSTS, X-Frame-Options, CSP) để đạt điểm A+ trên SSL Labs"
      ],
      "intuition": {
        "title": "Lễ tân ngoại giao Nginx và Tấm hộ chiếu mã hóa SSL Let's Encrypt",
        "overview": "Đưa ứng dụng ra Internet trực tiếp mà không có cổng đón tiếp là cực kỳ nguy hiểm. Nginx đóng vai trò là người gác cổng tiếp nhận mọi yêu cầu, mã hóa dữ liệu HTTPS và chuyển tiếp an toàn vào các dịch vụ backend nội bộ.",
        "realWorld": "Một ứng dụng FastAPI viết bằng Python chạy bằng Uvicorn trên cổng 8000. Nếu mở trực tiếp cổng 8000 ra Internet, server rất dễ bị tấn công Slowloris và cạn kiệt tài nguyên xử lý SSL. Đặt Nginx làm Reverse Proxy phía trước giúp giải phóng tải mã hóa TLS, nén Gzip tĩnh và bảo vệ ứng dụng Python chỉ lắng nghe nội bộ 127.0.0.1.",
        "metaphor": "Nginx giống như quầy lễ tân sang trọng của một tập đoàn lớn: khách bên ngoài (trình duyệt) chỉ được tiếp xúc với nhân viên lễ tân có đồng phục chuyên nghiệp (chứng chỉ SSL). Lễ tân kiểm tra thẻ, phân loại yêu cầu và gọi điện chuyển tiếp vào phòng ban chuyên môn bên trong (backend microservices) mà không cho khách tùy tiện đi lại trong tòa nhà.",
        "boundary": "Nginx xử lý các yêu cầu ở tầng ứng dụng (L7 Reverse Proxy/Web Server); khi cần cân bằng tải hàng triệu kết nối đồng thời ở tầng truyền vận (L4 TCP/UDP), người ta thường kết hợp thêm HAProxy hoặc LVS.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Đưa ứng dụng ra Internet trực tiếp mà không có cổng đón tiếp là cực kỳ nguy hiểm. Nginx đóng vai trò là người gác cổng tiếp nhận mọi yêu cầu, mã hóa dữ liệu HTTPS và chuyển tiếp an toàn vào các dịch vụ backend nội bộ.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>proxy_pass</code>:</strong> Chuyển tiếp yêu cầu HTTP tới backend nội bộ</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>proxy_set_header</code>:</strong> Truyền IP thật của client và protocol tới backend</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>nginx -t</code>:</strong> Kiểm tra cú pháp cấu hình Nginx trước khi nạp</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một ứng dụng FastAPI viết bằng Python chạy bằng Uvicorn trên cổng 8000. Nếu mở trực tiếp cổng 8000 ra Internet, server rất dễ bị tấn công Slowloris và cạn kiệt tài nguyên xử lý SSL. Đặt Nginx làm Reverse Proxy phía trước giúp giải phóng tải mã hóa TLS, nén Gzip tĩnh và bảo vệ ứng dụng Python chỉ lắng nghe nội bộ 127.0.0.1.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Cấu hình Nginx Reverse Proxy Chuẩn Production cho Ứng dụng Python</li><li><span class=\"lx-vs-bullet\">•</span> Cấp phát &amp; Tự động Gia hạn SSL Miễn phí với Certbot Let's Encrypt</li><li><span class=\"lx-vs-bullet\">•</span> Tối ưu Bộ đệm Gzip &amp; Đóng gói Container Docker Chuẩn Mực</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Đối chiếu Cấu hình Nginx & SSL",
          "content": "<p>Triển khai dịch vụ web chuẩn sản xuất đòi hỏi cấu hình Reverse Proxy an toàn và quản lý chứng chỉ tự động hóa:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Chỉ thị / Lệnh</th>\n            <th>Mục đích</th>\n            <th>Cú pháp chuẩn</th>\n            <th>Ví dụ thực tế</th>\n            <th>Ghi chú vận hành</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>proxy_pass</code></td>\n            <td>Chuyển tiếp yêu cầu HTTP tới backend nội bộ</td>\n            <td><code>proxy_pass &lt;URL&gt;;</code></td>\n            <td><code>proxy_pass http://127.0.0.1:8000;</code></td>\n            <td>Dấu <code>/</code> ở cuối URL quyết định việc giữ hay cắt URI</td>\n          </tr>\n          <tr>\n            <td><code>proxy_set_header</code></td>\n            <td>Truyền IP thật của client và protocol tới backend</td>\n            <td><code>proxy_set_header X-Real-IP $remote_addr;</code></td>\n            <td><code>proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</code></td>\n            <td>Nếu thiếu, backend sẽ chỉ thấy IP của chính Nginx</td>\n          </tr>\n          <tr>\n            <td><code>nginx -t</code></td>\n            <td>Kiểm tra cú pháp cấu hình Nginx trước khi nạp</td>\n            <td><code>sudo nginx -t</code></td>\n            <td><code>sudo nginx -t</code></td>\n            <td>Bắt buộc chạy trước khi reload để tránh sập web</td>\n          </tr>\n          <tr>\n            <td><code>certbot --nginx</code></td>\n            <td>Xin và tự động cài đặt chứng chỉ SSL Let's Encrypt</td>\n            <td><code>sudo certbot --nginx -d &lt;domain&gt;</code></td>\n            <td><code>sudo certbot --nginx -d api.domain.com</code></td>\n            <td>Tự động sửa file cấu hình Nginx và cài lịch gia hạn</td>\n          </tr>\n          <tr>\n            <td><code>certbot renew --dry-run</code></td>\n            <td>Kiểm thử quá trình tự động gia hạn chứng chỉ SSL</td>\n            <td><code>sudo certbot renew --dry-run</code></td>\n            <td><code>sudo certbot renew --dry-run</code></td>\n            <td>Bảo đảm chứng chỉ không bị hết hạn đột ngột sau 90 ngày</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-3-8-nginx-proxy-config",
          "title": "4.1 Cấu hình Nginx Reverse Proxy Chuẩn Production cho Ứng dụng Python",
          "content": "\n        <p>Trong kiến trúc microservices và web hiện đại, các ứng dụng Python (viết bằng FastAPI, Django, Flask) chạy trên các ASGI/WSGI server như <strong>Uvicorn</strong> hoặc <strong>Gunicorn</strong>. Mặc dù các server này có thể xử lý HTTP, chúng <strong>không được thiết kế để mở trực tiếp ra Internet</strong> vì thiếu khả năng chống tấn công Slowloris, không tối ưu phục vụ file tĩnh và không hỗ trợ xử lý SSL hiệu năng cao.</p>\n\n        <p><strong>Nginx</strong> sử dụng kiến trúc bất đồng bộ hướng sự kiện (Asynchronous Event-Driven) dựa trên cơ chế <code>epoll</code> của nhân Linux, cho phép một tiến trình worker duy nhất duy trì hàng chục ngàn kết nối đồng thời với mức tiêu tốn RAM cực kỳ thấp.</p>\n\n        <h3 class=\"lx-h3\">Bảng phân tích 4 Header chuyển tiếp sống còn trong Reverse Proxy</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Chỉ thị Header</th>\n              <th>Giá trị cấu hình Nginx</th>\n              <th>Mục đích nghiệp vụ</th>\n              <th>Hậu quả nghiêm trọng nếu thiếu</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>Host</code></td>\n              <td><code>$host</code></td>\n              <td>Gửi tên miền gốc của trang web mà người dùng gõ trên trình duyệt vào backend.</td>\n              <td>Backend không biết mình đang phục vụ cho domain nào, làm hỏng routing đa tên miền.</td>\n            </tr>\n            <tr>\n              <td><code>X-Real-IP</code></td>\n              <td><code>$remote_addr</code></td>\n              <td>Gửi địa chỉ IP thật của máy khách hàng vào cho backend.</td>\n              <td><strong>Hệ thống log và bảo mật của Python ghi nhận 100% IP người dùng là 127.0.0.1!</strong> Không thể chặn brute-force hay định danh vị trí địa lý.</td>\n            </tr>\n            <tr>\n              <td><code>X-Forwarded-For</code></td>\n              <td><code>$proxy_add_x_forwarded_for</code></td>\n              <td>Danh sách chuỗi các IP proxy mà gói tin đã đi qua (Client, Proxy1, Proxy2...).</td>\n              <td>Mất dấu vết truy vết kiểm toán an ninh nguồn gốc yêu cầu.</td>\n            </tr>\n            <tr>\n              <td><code>X-Forwarded-Proto</code></td>\n              <td><code>$scheme</code> (hoặc <code>https</code>)</td>\n              <td>Báo cho ứng dụng backend biết kết nối ban đầu giữa client và Nginx là HTTP hay HTTPS.</td>\n              <td><strong>Lỗi vòng lặp chuyển hướng vô tận (Infinite Redirect Loop):</strong> Ứng dụng Python tưởng client đang truy cập HTTP nên ném mã chuyển hướng 301 sang HTTPS, Nginx nhận lại và lại chuyển tiếp, khiến trình duyệt báo lỗi <code>ERR_TOO_MANY_REDIRECTS</code>.</td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": [
            {
              "title": "Tệp cấu hình Nginx chuẩn /etc/nginx/sites-available/fastapi_app.conf",
              "lang": "nginx",
              "code": "# /etc/nginx/sites-available/fastapi_app.conf\n# Định nghĩa cụm backend server (Upstream)\nupstream fastapi_backend {\n    server 127.0.0.1:8000;\n    # Khuyên dùng UNIX socket khi cùng máy: server unix:/run/fastapi_app.sock;\n    keepalive 32;\n}\n\nserver {\n    listen 80;\n    server_name api.example.com;\n\n    # Giới hạn dung lượng tải lên tối đa (tránh lỗi 413 Request Entity Too Large):\n    client_max_body_size 50M;\n\n    # 1. Phục vụ file tĩnh trực tiếp kèm bộ nhớ đệm trình duyệt 30 ngày:\n    location /static/ {\n        alias /opt/fastapi_app/static/;\n        expires 30d;\n        add_header Cache-Control \"public, no-transform\";\n        access_log off;\n    }\n\n    # 2. Chuyển tiếp toàn bộ API requests vào backend Python:\n    location / {\n        proxy_pass http://fastapi_backend;\n        proxy_http_version 1.1;\n        proxy_set_header Connection \"\";\n\n        # 4 Headers chuyển tiếp bắt buộc:\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n\n        # Cấu hình thời gian chờ kết nối (Timeouts):\n        proxy_connect_timeout 60s;\n        proxy_send_timeout 60s;\n        proxy_read_timeout 60s;\n    }\n}",
              "output": "# Bước 1: Kích hoạt site bằng cách tạo symlink sang sites-enabled:\n$ sudo ln -s /etc/nginx/sites-available/fastapi_app.conf /etc/nginx/sites-enabled/\n\n# Bước 2: BẮT BUỘC - Kiểm tra cú pháp toàn bộ hệ thống Nginx:\n$ sudo nginx -t\nnginx: the configuration file /etc/nginx/nginx.conf syntax is ok\nnginx: configuration /etc/nginx/nginx.conf test is successful\n\n# Bước 3: Nạp lại cấu hình mượt mà không làm gián đoạn kết nối người dùng (Zero-Downtime):\n$ sudo systemctl reload nginx",
              "annotations": [
                {
                  "part": "client_max_body_size 50M",
                  "text": "Nâng trần dung lượng upload file (mặc định của Nginx chỉ là 1MB)."
                },
                {
                  "part": "location /static/",
                  "text": "Phục vụ file tĩnh trực tiếp từ đĩa với access_log off, giúp giảm tải tới 80% công việc cho Python."
                },
                {
                  "part": "nginx -t",
                  "text": "Nguyên tắc sống còn trước khi reload để không bao giờ làm sập các website khác trên máy chủ."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-8-certbot-ssl",
          "title": "4.2 Cấp phát & Tự động Gia hạn SSL Miễn phí với Certbot Let's Encrypt",
          "content": "\n        <p>Ngày nay, HTTPS là tiêu chuẩn bảo mật bắt buộc đối với mọi website và API. Giao thức HTTP thuần túy truyền tải thông tin ở dạng bản rõ (cleartext), dễ dàng bị nghe lén hoặc sửa đổi nội dung trên đường truyền (Man-in-the-Middle attack).</p>\n\n        <p><strong>Let's Encrypt</strong> là tổ chức cấp phát chứng chỉ số (CA) phi lợi nhuận toàn cầu, cung cấp chứng chỉ SSL/TLS hoàn toàn miễn phí thông qua giao thức tự động <strong>ACME</strong>. Công cụ chính thức để giao tiếp với Let's Encrypt trên Linux là <strong>Certbot</strong> do Electronic Frontier Foundation (EFF) phát triển.</p>\n\n        <h3 class=\"lx-h3\">Gia cố Bảo mật SSL Chuẩn Mozilla Intermediate</h3>\n        <p>Một cấu hình SSL đạt điểm A+ trên hệ thống kiểm định <strong>Qualys SSL Labs</strong> cần thỏa mãn các tiêu chuẩn:</p>\n        <ul>\n          <li><strong>Loại bỏ hoàn toàn các giao thức lỗi thời và mất an toàn:</strong> Khóa chặt SSLv2, SSLv3, TLSv1.0 và TLSv1.1 (vốn dính các lỗ hổng nghiêm trọng như POODLE, BEAST). <strong>Chỉ cho phép TLSv1.2 và TLSv1.3</strong>.</li>\n          <li><strong>Kích hoạt HTTP/2 (hoặc HTTP/3):</strong> Cho phép ghép kênh song song (multiplexing) nhiều yêu cầu trên cùng một kết nối TCP, tăng tốc tải trang web lên tới 40%.</li>\n          <li><strong>Bật tiêu đề HSTS (HTTP Strict Transport Security):</strong> Ra lệnh cho trình duyệt ghi nhớ và chỉ truy cập trang web bằng kết nối mã hóa HTTPS trong suốt 1 năm tới (<code>max-age=31536000; includeSubDomains</code>), ngăn chặn triệt để tấn công hạ cấp SSL Stripping.</li>\n        </ul>\n      ",
          "codeExamples": [
            {
              "title": "Quy trình kích hoạt HTTPS và Kiểm tra Tự động Gia hạn bằng Certbot",
              "lang": "bash",
              "code": "# Bước 1: Cài đặt Certbot và plugin Nginx chính thức qua snap hoặc apt:\n$ sudo apt install -y certbot python3-certbot-nginx\n\n# Bước 2: Tự động xin cấp phát chứng chỉ và cấu hình Nginx:\n# (Certbot sẽ tự động đọc server_name, xác thực tên miền qua ACME challenge, và chèn khối SSL vào file config)\n$ sudo certbot --nginx -d api.example.com --non-interactive --agree-tos -m admin@example.com --redirect\n\n# Bước 3: Kiểm tra tệp hẹn giờ tự động gia hạn của systemd:\n$ systemctl list-timers | grep certbot\nNEXT                         LEFT          LAST PASSED UNIT           ACTIVATES\nWed 2026-11-04 18:42:00 UTC  9h left       n/a  n/a    certbot.timer  certbot.service\n\n# Bước 4: BẮT BUỘC - Kiểm thử quy trình gia hạn giả lập (Dry-Run):\n$ sudo certbot renew --dry-run\nSaving debug log to /var/log/letencrypt/letsencrypt.log\nSimulating renewal of an existing certificate for api.example.com\nThe dry run was successful.",
              "output": "Simulating renewal of an existing certificate for api.example.com\nThe dry run was successful.",
              "annotations": [
                {
                  "part": "--nginx",
                  "text": "Plugin tự động cấu hình các khối listen 443 ssl và đường dẫn chứng chỉ trong Nginx mà không cần sửa tay."
                },
                {
                  "part": "--redirect",
                  "text": "Tự động tạo luật chuyển hướng toàn bộ lưu lượng HTTP (cổng 80) sang HTTPS (cổng 443) bằng mã 301."
                },
                {
                  "part": "certbot renew --dry-run",
                  "text": "Lệnh kiểm thử bắt buộc để bảo đảm hệ thống tự động gia hạn thành công trước khi chứng chỉ 90 ngày hết hạn."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-8-docker-basics",
          "title": "4.3 Tối ưu Bộ đệm Gzip & Đóng gói Container Docker Chuẩn Mực",
          "content": "\n        <p>Bên cạnh việc phân luồng lưu lượng, Nginx còn đảm nhận vai trò tối ưu hóa hiệu năng đường truyền bằng cách nén dữ liệu trước khi gửi cho người dùng. Kích hoạt module <code>gzip</code> có thể giảm kích thước các tệp văn bản (HTML, CSS, JavaScript, JSON phản hồi từ API) từ 60% đến 80%, giúp website tải nhanh hơn rõ rệt trên mạng di động.</p>\n\n        <h3 class=\"lx-h3\">Mở rộng: Đóng gói Ứng dụng Web với Docker</h3>\n        <p>Trong hạ tầng hiện đại, ứng dụng Python thường được đóng gói thành các <strong>Docker Container</strong> chạy dưới sự điều phối của Docker hoặc Kubernetes. Nguyên tắc an toàn cốt tử khi viết Dockerfile là: <strong>Cấm chạy ứng dụng bằng quyền root bên trong container!</strong> Luôn tạo một người dùng thường (non-root user) và áp dụng cơ chế đa tầng (Multi-stage build) để giảm kích thước image.</p>\n      ",
          "codeExamples": [
            {
              "title": "Dockerfile chuẩn Production cho ứng dụng FastAPI và cấu hình Gzip Nginx",
              "lang": "dockerfile",
              "code": "# 1. Tệp Dockerfile đa tầng bảo mật cho ứng dụng Python FastAPI\nFROM python:3.12-slim AS base\nWORKDIR /app\n\n# Thiết lập biến môi trường tối ưu Python:\nENV PYTHONDONTWRITEBYTECODE=1 \\\n    PYTHONUNBUFFERED=1\n\n# Cài đặt thư viện:\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Tạo tài khoản người dùng thường (Least Privilege):\nRUN groupadd -r appgroup && useradd -r -g appgroup -s /sbin/nologin appuser\nCOPY --chown=appuser:appgroup . .\n\n# Chuyển quyền thực thi sang user thường:\nUSER appuser\nEXPOSE 8000\n\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\", \"--workers\", \"4\"]\n\n---\n# 2. Cấu hình nén Gzip trong /etc/nginx/conf.d/gzip.conf\ngzip on;\ngzip_vary on;\ngzip_proxied any;\ngzip_comp_level 6;\ngzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml image/svg+xml;",
              "output": "# Kiểm tra tỷ lệ nén gzip bằng curl:\n$ curl -I -H \"Accept-Encoding: gzip\" https://api.example.com/api/v1/orders\nHTTP/2 200 \nserver: nginx\ncontent-type: application/json\ncontent-encoding: gzip\nstrict-transport-security: max-age=31536000; includeSubDomains",
              "annotations": [
                {
                  "part": "USER appuser",
                  "text": "Ngăn chặn mã độc leo thang quyền root trên máy chủ nếu ứng dụng bị dính lỗ hổng container breakout."
                },
                {
                  "part": "gzip_comp_level 6",
                  "text": "Mức nén cân bằng hoàn hảo giữa tỷ lệ nén dung lượng và tài nguyên tiêu tốn của CPU."
                },
                {
                  "part": "content-encoding",
                  "text": "gzip: Xác nhận phản hồi API JSON đã được nén mượt mà trước khi truyền qua mạng."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Tệp cấu hình Nginx Reverse Proxy Chuẩn Production</h4>\n      <p>Giảng viên xây dựng khối server block cho ứng dụng backend Python:</p>\n      <pre><code># /etc/nginx/sites-available/app.conf\nserver {\n    listen 80;\n    server_name api.example.com;\n\n    # Chuyển hướng toàn bộ sang HTTPS\n    return 301 https://$host$request_uri;\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name api.example.com;\n\n    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;\n\n    # Tiêu đề bảo mật chuẩn A+\n    add_header X-Frame-Options \"SAMEORIGIN\" always;\n    add_header X-XSS-Protection \"1; mode=block\" always;\n    add_header X-Content-Type-Options \"nosniff\" always;\n\n    location / {\n        proxy_pass http://127.0.0.1:8000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection \"upgrade\";\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n    }\n}</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: proxy_pass ngây thơ thiếu Header</div>\n          <pre><code>location / {\n    # Thiếu Host, thiếu IP gốc:\n    proxy_pass http://127.0.0.1:8000;\n}</code></pre>\n          <p class=\"lx-diff-desc\">Backend nhận mọi yêu cầu với IP nguồn là <code>127.0.0.1</code>, làm hỏng hệ thống ghi log, hệ thống chống gian lận và tính năng giới hạn tốc độ (Rate Limiting) của app!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Truyền đầy đủ Header định danh</div>\n          <pre><code>location / {\n    proxy_pass http://127.0.0.1:8000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    proxy_set_header X-Forwarded-Proto $scheme;\n}</code></pre>\n          <p class=\"lx-diff-desc\">Bảo toàn danh tính thật của khách truy cập và giao thức gốc để backend xử lý logic nghiệp vụ chuẩn xác.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Cài đặt Nginx Reverse Proxy & Kiểm thử Chứng chỉ SSL",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.8</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Cài đặt Nginx, tạo một backend Python mini lắng nghe tại cổng 8000, cấu hình Nginx chuyển tiếp yêu cầu, kiểm tra cú pháp với <code>nginx -t</code> và kiểm thử tự động gia hạn SSL với Certbot.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Ubuntu/Debian có cài Nginx và Python 3.</li>\n        <li>Terminal với quyền sudo.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Cài đặt Nginx và Certbot:\n          <pre><code>sudo apt-get update && sudo apt-get install -y nginx certbot python3-certbot-nginx</code></pre>\n        </li>\n        <li>Khởi chạy một backend giả lập trên localhost:8000:\n          <pre><code>python3 -m http.server 8000 --bind 127.0.0.1 > /dev/null 2>&1 &\nBACKEND_PID=$!\necho \"Backend PID: $BACKEND_PID\"</code></pre>\n        </li>\n        <li>Tạo cấu hình Reverse Proxy tại <code>/etc/nginx/sites-available/test-proxy.conf</code>:\n          <pre><code>sudo bash -c 'cat &lt;&lt; \"EOF\" > /etc/nginx/sites-available/test-proxy.conf\nserver {\n    listen 8088;\n    server_name localhost;\n\n    location / {\n        proxy_pass http://127.0.0.1:8000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n}\nEOF'</code></pre>\n        </li>\n        <li>Kích hoạt site bằng symbolic link và kiểm tra cú pháp:\n          <pre><code>sudo ln -sf /etc/nginx/sites-available/test-proxy.conf /etc/nginx/sites-enabled/\nsudo nginx -t\nsudo systemctl reload nginx</code></pre>\n        </li>\n        <li>Kiểm tra truy vấn qua cổng Nginx 8088:\n          <pre><code>curl -I http://127.0.0.1:8088</code></pre>\n        </li>\n        <li>Kiểm thử quy trình tự động gia hạn Certbot:\n          <pre><code>sudo certbot renew --dry-run || echo \"Kiểm tra cơ chế dry-run hoàn tất\"\nkill $BACKEND_PID</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Lệnh <code>sudo nginx -t</code> trả về <code>syntax is ok</code> và <code>test is successful</code>; lệnh <code>curl</code> trả về HTTP 200 từ backend thông qua cổng proxy.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Cấu hình thêm khối nén dữ liệu <code>gzip on;</code> với các loại MIME: text/plain, text/css, application/json và kiểm tra header <code>Content-Encoding: gzip</code> bằng curl.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không bao giờ chạy <code>systemctl restart nginx</code> khi chưa chạy <code>sudo nginx -t</code>. Nếu file cấu hình bị sai cú pháp (như thiếu dấu chấm phẩy), dịch vụ Nginx sẽ bị dừng đột ngột và toàn bộ website trên máy chủ sẽ sập!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong><code>502 Bad Gateway</code> khi truy cập qua Nginx</strong></td><td>Tiến trình backend nội bộ (Node.js/Python/PHP-FPM) bị tắt, chưa khởi động xong, hoặc cổng cấu hình trong <code>proxy_pass</code> không khớp.</td><td>Kiểm tra tiến trình backend bằng <code>ss -tulpn</code> và đọc log lỗi Nginx: <code>sudo tail -n 20 /var/log/nginx/error.log</code>.</td></tr>\n          <tr><td><strong><code>413 Request Entity Too Large</code> khi người dùng tải file lên web</strong></td><td>Mặc định Nginx giới hạn dung lượng tải lên tối đa của client là 1MB (chỉ thị <code>client_max_body_size 1M</code>).</td><td>Tăng giới hạn trong khối <code>http</code> hoặc <code>server</code>: <code>client_max_body_size 50M;</code> rồi reload Nginx.</td></tr>\n          <tr><td><strong>Certbot báo <code>Challenge failed for domain ... (Connection refused / Timeout)</code></strong></td><td>Tường lửa (UFW / Security Group) đang chặn cổng 80, hoặc bản ghi DNS chưa trỏ đúng về địa chỉ IP của máy chủ.</td><td>Mở cổng 80: <code>sudo ufw allow 80/tcp</code> để máy chủ Let's Encrypt có thể thực hiện kiểm tra ACME HTTP-01 challenge.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Ẩn thông tin phiên bản Nginx:</strong> Luôn thêm chỉ thị <code>server_tokens off;</code> vào khối <code>http</code> trong <code>/etc/nginx/nginx.conf</code> để ngăn chặn tin tặc thu thập phiên bản Nginx đang chạy nhằm tìm kiếm lỗ hổng đã biết (CVE).</li>\n        <li><strong>Bật giao thức HTTP Strict Transport Security (HSTS):</strong> Bổ sung tiêu đề <code>add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;</code> để buộc tất cả các trình duyệt chỉ được phép giao tiếp qua kết nối HTTPS mã hóa.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Nginx Official Documentation:</strong> <a href=\"https://nginx.org/en/docs/\" target=\"_blank\" rel=\"noopener\">NGINX Web Server Admin Guide</a>.</li>\n      <li><strong>Mozilla SSL Configuration Generator:</strong> Công cụ sinh cấu hình TLS tối ưu chuẩn bảo mật quốc tế: <a href=\"https://ssl-config.mozilla.org/\" target=\"_blank\" rel=\"noopener\">Mozilla SSL Config Generator</a>.</li>\n      <li><strong>Certbot Let's Encrypt Instructions:</strong> <a href=\"https://certbot.eff.org/\" target=\"_blank\" rel=\"noopener\">Electronic Frontier Foundation Certbot Guide</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Mã Lỗi HTTP Phổ Biến của Reverse Proxy",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Mã lỗi</th><th>Tên mã</th><th>Ý nghĩa kỹ thuật</th><th>Nơi cần kiểm tra</th></tr></thead>\n        <tbody>\n          <tr><td>502</td><td>Bad Gateway</td><td>Nginx không thể kết nối hoặc nhận phản hồi từ backend</td><td>Tiến trình app backend (Python, Node)</td></tr>\n          <tr><td>504</td><td>Gateway Timeout</td><td>Backend mất quá nhiều thời gian xử lý và vượt quá timeout</td><td>Cơ sở dữ liệu bị khóa hoặc truy vấn chậm</td></tr>\n          <tr><td>500</td><td>Internal Server Error</td><td>Lỗi logic phát sinh bên trong mã nguồn backend</td><td>File log của ứng dụng</td></tr>\n          <tr><td>404</td><td>Not Found</td><td>Đường dẫn (URI) không khớp với bất kỳ location nào</td><td>Cấu hình khối <code>location</code></td></tr>\n          <tr><td>413</td><td>Payload Too Large</td><td>Dung lượng tải lên vượt quá <code>client_max_body_size</code></td><td>File <code>nginx.conf</code></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Đưa ứng dụng FastAPI ra Internet đạt điểm A+ bảo mật trên Qualys SSL Labs",
        "content": "\n      <p><strong>1. Triệu chứng & Yêu cầu:</strong> Khách hàng doanh nghiệp yêu cầu hệ thống cổng thanh toán trực tuyến chạy FastAPI phải đạt <strong>chứng chỉ bảo mật hạng A+ trên Qualys SSL Labs</strong> trước khi ký hợp đồng dịch vụ. Hiện tại máy chủ đang mở thẳng cổng 8000 của Uvicorn ra mạng Internet và chưa có tên miền chính thức.</p>\n      \n      <p><strong>2. Điều tra & Thiết kế Kiến trúc:</strong></p>\n      <ul>\n        <li>Uvicorn không hỗ trợ HTTP/2 và không có khả năng tự động gia hạn chứng chỉ Let's Encrypt.</li>\n        <li>Cần dựng <code>Nginx</code> làm cổng tiền tuyến (Reverse Proxy &amp; SSL Termination) tại cổng 80/443, khóa cổng 8000 trong tường lửa chỉ cho phép kết nối từ localhost (127.0.0.1).</li>\n        <li>Áp dụng bộ cấu hình mã hóa hiện đại Mozilla Intermediate TLS Configuration, bật HTTP/2 và tiêu đề HSTS.</li>\n      </ul>\n      \n      <p><strong>3. Nguyên nhân gốc rễ:</strong> Việc thiếu lớp đệm Proxy kiên cố và cấu hình mã hóa yếu (hỗ trợ TLS 1.0/1.1 hoặc thuật toán mã hóa lỗi thời) khiến hệ thống bị đánh trượt trong các bài kiểm tra bảo mật độc lập.</p>\n      \n      <p><strong>4. Biện pháp triển khai:</strong></p>\n      <pre><code># Bước 1: Khóa cổng 8000 trong tường lửa UFW:\n$ sudo ufw delete allow 8000/tcp\n$ sudo ufw allow 80/tcp && sudo ufw allow 443/tcp\n\n# Bước 2: Thiết lập Nginx Proxy và cấp phát SSL:\n$ sudo certbot --nginx -d api.mycorp.com --agree-tos -m devops@mycorp.com\n\n# Bước 3: Gia cố tiêu đề HSTS trong khối server 443:\nadd_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;\nadd_header X-Frame-Options \"SAMEORIGIN\" always;\nadd_header X-Content-Type-Options \"nosniff\" always;\n\n# Bước 4: Kiểm tra cú pháp và nạp lại dịch vụ:\n$ sudo nginx -t && sudo systemctl reload nginx</code></pre>\n      <p>Chạy công cụ kiểm định bảo mật SSL Labs, máy chủ đạt <strong>điểm số A+ tuyệt đối</strong> với 100% chứng chỉ hợp lệ, giao thức bảo mật cao cấp và cấu hình HSTS vững chắc.</p>\n      \n      <p><strong>5. Phòng ngừa lâu dài:</strong></p>\n      <ul>\n        <li>Kiểm tra định kỳ trạng thái của <code>certbot.timer</code> bằng lệnh <code>systemctl list-timers</code> để bảo đảm chứng chỉ luôn được gia hạn trước ngày thứ 60.</li>\n        <li>Tích hợp công cụ tự động quét lỗ hổng SSL vào pipeline CI/CD để phát hiện sớm nếu có ai vô tình hạ cấp cấu hình mã hóa.</li>\n      </ul>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Reload Nginx mà quên chạy lệnh kiểm tra cú pháp nginx -t",
            "content": "Nginx quản lý tập trung toàn bộ các website trên máy chủ. Nếu bạn sửa một tệp site mới bị sai một dấu chấm phẩy (;) hoặc sai đường dẫn file rồi vội vàng chạy <code>sudo systemctl reload nginx</code>, Nginx có thể từ chối nạp cấu hình mới hoặc nếu chạy <code>restart</code> thì toàn bộ Nginx sẽ bị sập, làm chết tất cả các website khác đang hoạt động! Luôn luôn gõ <code>sudo nginx -t</code> trước; khi thấy báo test is successful thì mới được reload."
          },
          {
            "title": "Thiếu header X-Forwarded-Proto gây lỗi vòng lặp chuyển hướng vô tận",
            "content": "Khi Nginx đã giải mã SSL (HTTPS) và chuyển tiếp yêu cầu HTTP bình thường vào backend Python, nếu thiếu dòng <code>proxy_set_header X-Forwarded-Proto $scheme;</code>, ứng dụng Python sẽ tưởng rằng người dùng đang truy cập bằng giao thức HTTP không bảo mật! Nếu code Python có logic tự động ép chuyển hướng sang HTTPS, trình duyệt sẽ nhận mã chuyển hướng liên tục và báo lỗi sập: <code>ERR_TOO_MANY_REDIRECTS</code>."
          }
        ],
        "tips": [
          {
            "title": "Dùng UNIX Domain Socket thay vì TCP Loopback khi cùng máy",
            "content": "Nếu Nginx và tiến trình Python (Uvicorn / Gunicorn) cùng chạy trên một máy chủ vật lý, hãy cấu hình chúng giao tiếp qua UNIX Socket (ví dụ: <code>server unix:/run/app.sock;</code>). Giao thức UNIX Socket bỏ qua toàn bộ ngăn xếp mạng TCP/IP, không tốn tài nguyên cổng mạng và tăng thông lượng truyền dữ liệu lên tới 20-30%."
          },
          {
            "title": "Kiểm tra gia hạn Certbot bằng cờ --dry-run ngay sau khi cài",
            "content": "Chứng chỉ SSL của Let's Encrypt chỉ có giá trị trong 90 ngày. Đừng đợi tới ngày thứ 89 mới phát hiện cron job gia hạn bị lỗi! Ngay sau khi cấp chứng chỉ, hãy chạy lệnh: <code>sudo certbot renew --dry-run</code>. Nếu kết quả in ra 'The dry run was successful', bạn hoàn toàn có thể yên tâm ngủ ngon."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Kiểm tra cú pháp cấu hình Nginx bằng nginx -t",
          "problem": "Lệnh nào sau đây dùng để kiểm tra tính hợp lệ về cú pháp của toàn bộ cấu hình Nginx trước khi nạp lại dịch vụ để tránh downtime?",
          "hint": "Sử dụng lệnh sudo nginx -t.",
          "solutionCode": "sudo nginx -t",
          "solutionOutput": "nginx: the configuration file /etc/nginx/nginx.conf syntax is ok\nnginx: configuration file /etc/nginx/nginx.conf test is successful",
          "explanation": "Lệnh nginx -t phân tích toàn bộ cây file cấu hình bao gồm các file include trong conf.d/ và sites-enabled/. Chỉ khi nhận được thông báo \"syntax is ok\" và \"test is successful\" mới được phép gọi systemctl reload nginx.",
          "annotations": [
            {
              "part": "nginx -t",
              "text": "Thói quen bắt buộc không bao giờ được bỏ qua trước khi reload web server."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp lệnh",
              "pass": "Dùng đúng nginx -t",
              "excellent": "Phân tích được ý nghĩa hai dòng thông báo thành công",
              "weight": "50%"
            },
            {
              "criterion": "Quy trình vận hành",
              "pass": "Biết cách reload",
              "excellent": "Áp dụng systemctl reload thay vì restart để duy trì kết nối người dùng",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Cấu hình Reverse Proxy Nginx chuyển tiếp tới backend Python/Gunicorn",
          "problem": "Hãy viết một khối cấu hình location / trong Nginx để chuyển tiếp (reverse proxy) các request đến ứng dụng Python chạy tại http://127.0.0.1:8000, truyền đầy đủ các header X-Forwarded-For, X-Real-IP và Host.",
          "hint": "Dùng proxy_pass http://127.0.0.1:8000 và các chỉ thị proxy_set_header.",
          "solutionCode": "location / {\n    proxy_pass http://127.0.0.1:8000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    proxy_set_header X-Forwarded-Proto $scheme;\n    proxy_connect_timeout 60s;\n    proxy_read_timeout 60s;\n}",
          "solutionOutput": "# Nginx chuyển tiếp mượt mà toàn bộ lưu lượng tới backend Gunicorn/FastAPI",
          "explanation": "Nginx đóng vai trò Reverse Proxy nhận lưu lượng từ Internet và chuyển tiếp nội bộ tới backend. Việc truyền đủ các header X-Forwarded-* giúp ứng dụng backend nhận diện chính xác IP thực của người dùng và giao thức HTTPS.",
          "annotations": [
            {
              "part": "proxy_set_header X-Real-IP",
              "text": "Chuyển địa chỉ IP gốc của client cho backend xử lý rate-limiting và logging."
            }
          ],
          "rubric": [
            {
              "criterion": "Chỉ thị proxy_pass",
              "pass": "Chỉ định đúng URL backend",
              "excellent": "Thiết lập đầy đủ 4 header chuyển tiếp chuẩn RFC",
              "weight": "50%"
            },
            {
              "criterion": "Tối ưu timeout",
              "pass": "Có timeout hợp lý",
              "excellent": "Ngăn ngừa treo worker khi backend phản hồi chậm",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Xử lý lỗi 502 Bad Gateway và phân tích lỗi upstream timeout",
          "problem": "Sau khi cấu hình Nginx làm reverse proxy cho ứng dụng web, người dùng nhận thông báo lỗi 502 Bad Gateway. Hãy viết kịch bản các bước kiểm tra log và chẩn đoán dịch vụ backend.",
          "hint": "Kiểm tra log lỗi Nginx tại /var/log/nginx/error.log và dùng ss kiểm tra backend 127.0.0.1:8000 có đang LISTEN không.",
          "solutionCode": "# 1. Đọc ngay log lỗi của Nginx:\nsudo tail -n 20 /var/log/nginx/error.log\n\n# 2. Kiểm tra xem backend Python có đang lắng nghe cổng 8000 không:\nsudo ss -tulpn | grep 8000\n\n# 3. Kiểm tra trạng thái dịch vụ backend qua systemd:\nsudo systemctl status my-backend.service",
          "solutionOutput": "2026/11/04 10:20:15 [error] 1234#1234: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 203.0.113.195, server: api.example.com, request: \"GET /api/v1/users HTTP/1.1\", upstream: \"http://127.0.0.1:8000/api/v1/users\"",
          "explanation": "Lỗi 502 Bad Gateway nghĩa là Nginx hoạt động bình thường nhưng không thể kết nối tới server backend (upstream). Nguyên nhân phổ biến: dịch vụ backend bị crash, chưa bật, sai cổng hoặc bị tường lửa nội bộ chặn.",
          "annotations": [
            {
              "part": "111: Connection refused",
              "text": "Thông báo rõ ràng chứng minh backend không mở cổng hoặc đã bị sập."
            }
          ],
          "rubric": [
            {
              "criterion": "Phân tích log lỗi",
              "pass": "Xem đúng /var/log/nginx/error.log",
              "excellent": "Phân biệt chính xác giữa lỗi 502 (backend sập) và 504 (backend timeout)",
              "weight": "50%"
            },
            {
              "criterion": "Chẩn đoán upstream",
              "pass": "Kiểm tra cổng bằng ss hoặc curl",
              "excellent": "Xác định nhanh chóng trạng thái service qua systemctl",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Nginx hoạt động như một Reverse Proxy tiếp nhận lưu lượng từ Internet, xử lý mã hóa SSL/TLS và chuyển tiếp an toàn vào các backend nội bộ.",
        "Chỉ thị proxy_set_header bảo toàn thông tin gốc của người dùng (Host, Client IP, Protocol) cho ứng dụng backend xử lý.",
        "Bắt buộc kiểm tra tính hợp lệ của cấu hình bằng sudo nginx -t trước khi thực hiện reload dịch vụ.",
        "Certbot tự động hóa 100% quy trình cấp phát và gia hạn chứng chỉ SSL miễn phí từ tổ chức chứng thực Let's Encrypt thông qua ACME.",
        "Gia cố bảo mật web bằng các tiêu đề an ninh (HSTS, X-Frame-Options, X-Content-Type-Options) và tắt server_tokens để che giấu phiên bản."
      ],
      "generalInfo": {
        "duration": "60 phút",
        "targetAudience": "Web Sysadmin, Backend/DevOps Developer, SRE",
        "prerequisites": "Hiểu mô hình mạng HTTP/HTTPS (Bài 2.7, 3.4), DNS và dịch vụ systemd",
        "environment": "Ubuntu 22.04 LTS / Debian 12 có cài Nginx, Certbot và Docker",
        "materials": "Terminal Linux, quyền sudo, tên miền trỏ về IP máy chủ (hoặc cấu hình /etc/hosts giả lập)"
      },
      "nextLessonPreview": "Trong Bài 3.9, chúng ta sẽ bước vào giai đoạn Chẩn đoán Hiệu năng Đỉnh cao: làm chủ Phương pháp USE của Brendan Gregg, đọc hiểu vmstat/strace và triển khai Dự án Thực hành Cấp 3.",
      "quiz": [
        {
          "question": "Trước khi reload dịch vụ Nginx sau khi chỉnh sửa file cấu hình, câu lệnh nào sau đây dùng để kiểm tra lỗi cú pháp?",
          "options": [
            "sudo nginx -t",
            "sudo nginx --verify",
            "sudo systemctl test nginx",
            "sudo nginx -c"
          ],
          "explanation": "Cờ -t (test) kiểm tra toàn bộ tệp cấu hình, báo cáo cú pháp hợp lệ hay chỉ ra số dòng bị lỗi mà không làm gián đoạn dịch vụ.",
          "correctIndex": 0
        },
        {
          "question": "Khi người dùng truy cập web và nhận được mã lỗi HTTP '502 Bad Gateway' từ Nginx, nguyên nhân phổ biến nhất là gì?",
          "options": [
            "File cấu hình Nginx bị lỗi cú pháp",
            "Tiến trình dịch vụ backend nội bộ (ví dụ Python FastAPI, Node.js) đang bị tắt hoặc không lắng nghe trên cổng đã chỉ định trong proxy_pass",
            "Ổ cứng máy chủ bị đầy 100%",
            "Chứng chỉ SSL bị hết hạn"
          ],
          "explanation": "502 Bad Gateway xảy ra khi Nginx đóng vai trò proxy cố gắng bắt tay kết nối tới backend nhưng backend từ chối kết nối (Connection refused) do chưa chạy.",
          "correctIndex": 1
        },
        {
          "question": "Khi triển khai chứng chỉ SSL miễn phí bằng công cụ Certbot cho Nginx, lệnh nào sau đây tự động cài đặt chứng chỉ và cấu hình tự động gia hạn (Auto-renewal)?",
          "options": [
            "sudo certbot --nginx",
            "sudo certbot certonly --standalone",
            "sudo certbot renew --force",
            "sudo certbot install --all"
          ],
          "correctIndex": 0,
          "explanation": "Lệnh `sudo certbot --nginx` sử dụng plugin Nginx để tự động phân tích cấu hình domain, thực hiện xác thực HTTP-01 challenge, nạp chứng chỉ SSL và tự động cấu hình systemd timer/cron để gia hạn trước ngày hết hạn."
        }
      ],
      "reflectionQuestion": "Một kỹ sư cấu hình Nginx làm reverse proxy cho ứng dụng web Django. Lập trình viên phản ánh rằng tính năng ghi nhận nhật ký của ứng dụng hiển thị 100% người dùng truy cập đều đến từ địa chỉ IP `127.0.0.1`, khiến hệ thống chống tấn công dò mật khẩu của Django bị tê liệt. Hãy giải thích tại sao và chỉ ra các dòng cấu hình Nginx cần thêm vào để khắc phục.",
      "reflectionHint": "Gợi ý: Nguyên nhân: Khi Nginx chuyển tiếp request tới backend, kết nối TCP thực tế được thiết lập giữa Nginx (127.0.0.1) và Django, nên nếu Nginx không chủ động gửi IP thật của khách trong HTTP Header thì Django chỉ nhìn thấy IP của Nginx. Khắc phục: Trong khối `location /` của Nginx, thêm các dòng: `proxy_set_header X-Real-IP $remote_addr;` và `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`, đồng thời cấu hình Django tin cậy header `HTTP_X_FORWARDED_FOR`."
    },
    {
      "id": "lx-3-09",
      "number": "3.9",
      "title": "Chẩn đoán Hiệu năng (USE Method, vmstat, strace), Tự động hóa Ansible & Dự án Thực hành Cấp 3",
      "subtitle": "Nghệ thuật chẩn đoán sự cố đỉnh cao: Phương pháp luận USE của Brendan Gregg, giải phẫu nút thắt cổ chai I/O, và tự động hóa hạ tầng với Ansible Idempotency",
      "level": "Nâng cao",
      "duration": "75 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "1. [Biết - Remember] Nắm vững Phương pháp chẩn đoán hiệu năng chuẩn quốc tế USE (Utilization, Saturation, Errors) của Brendan Gregg",
        "2. [Hiểu - Understand] Hiểu rõ các chỉ số cốt lõi trong vmstat (r, b, si, so, us, sy, id, wa) và nguyên lý kiểm tra lời gọi hệ thống bằng strace",
        "3. [Vận dụng - Apply] Sử dụng vmstat, iostat, strace để định vị nhanh điểm nghẽn cổ chai (Bottleneck) về CPU, Bộ nhớ hoặc Đĩa I/O",
        "4. [Phân tích - Analyze] Phân tích và giải quyết 3 kịch bản sự cố phức tạp: Trạng thái D-state nghẽn I/O, cạn kiệt Inode và lỗi phân quyền SELinux/Nginx"
      ],
      "intuition": {
        "title": "Kính hiển vi chẩn đoán USE Method và Bàn tay tự động hóa Ansible",
        "overview": "Khi hệ thống chậm chạp, đoán mò là cách nhanh nhất để làm mọi thứ tồi tệ hơn. Phương pháp USE cung cấp một quy trình khoa học để bắt đúng bệnh trong vài phút, còn Ansible giúp bạn tự động hóa việc triển khai và cứu hộ đồng loạt trên hàng trăm máy chủ.",
        "realWorld": "Một máy chủ thanh toán trực tuyến bị nghẽn và thời gian phản hồi tăng từ 50ms lên 5 giây. Thay vì khởi động lại server trong vô vọng, kỹ sư chạy vmstat và phát hiện cột `wa` (iowait) tăng vọt 65% và cột `b` (blocked processes) là 18. Dùng tiếp `iotop` và `strace`, kỹ sư phát hiện một tiến trình backup đang ghi dữ liệu đè lên cùng phân vùng database, giải quyết sự cố trong 5 phút.",
        "metaphor": "Phương pháp USE giống như quy trình cấp cứu y khoa của bác sĩ: đo huyết áp (Utilization), kiểm tra nhịp thở (Saturation) và xét nghiệm máu (Errors) cho từng cơ quan (CPU, RAM, Đĩa, Mạng) để tìm đúng nguồn gốc bệnh tật mà không phỏng đoán.",
        "boundary": "Các công cụ dòng lệnh vmstat, strace dùng để chẩn đoán chuyên sâu tại một thời điểm trên một máy chủ; để theo dõi dài hạn và cảnh báo diện rộng, hệ thống cần các bộ giám sát như Prometheus, Grafana và node_exporter.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Khi hệ thống chậm chạp, đoán mò là cách nhanh nhất để làm mọi thứ tồi tệ hơn. Phương pháp USE cung cấp một quy trình khoa học để bắt đúng bệnh trong vài phút, còn Ansible giúp bạn tự động hóa việc triển khai và cứu hộ đồng loạt trên hàng trăm máy chủ.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><strong>CPU</strong>:</strong> %usr, %sys qua <code>mpstat</code>/<code>top</code></li><li><span class=\"lx-vs-bullet\">•</span> <strong><strong>Memory (RAM)</strong>:</strong> % đã dùng trong <code>free -m</code></li><li><span class=\"lx-vs-bullet\">•</span> <strong><strong>Lưu trữ (Disk)</strong>:</strong> %util trong <code>iostat -xz 1</code></li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Một máy chủ thanh toán trực tuyến bị nghẽn và thời gian phản hồi tăng từ 50ms lên 5 giây. Thay vì khởi động lại server trong vô vọng, kỹ sư chạy vmstat và phát hiện cột <code>wa</code> (iowait) tăng vọt 65% và cột <code>b</code> (blocked processes) là 18. Dùng tiếp <code>iotop</code> và <code>strace</code>, kỹ sư phát hiện một tiến trình backup đang ghi dữ liệu đè lên cùng phân vùng database, giải quyết sự cố trong 5 phút.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Bộ Công cụ Chẩn đoán Hiệu năng theo Phương pháp USE: vmstat, iostat &amp; strace</li><li><span class=\"lx-vs-bullet\">•</span> Tự động hóa Hạ tầng với Ansible &amp; Nguyên lý Idempotency</li><li><span class=\"lx-vs-bullet\">•</span> Diễn tập 3 Kịch bản Sự cố Sản xuất Toàn diện Cấp 3 (Troubleshooting Labs)</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Phương pháp USE Chẩn đoán Hiệu năng",
          "content": "<p>Phương pháp USE (Utilization - Saturation - Errors) do chuyên gia hiệu năng Brendan Gregg (Netflix/Sun) đề xuất, yêu cầu kiểm tra 3 chỉ số cho mọi tài nguyên phần cứng:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Tài nguyên</th>\n            <th>Mức sử dụng (Utilization)</th>\n            <th>Mức bão hòa (Saturation)</th>\n            <th>Lỗi phát sinh (Errors)</th>\n            <th>Công cụ chẩn đoán</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>CPU</strong></td>\n            <td>%usr, %sys qua <code>mpstat</code>/<code>top</code></td>\n            <td>Load Average, cột <code>r</code> trong <code>vmstat</code></td>\n            <td>Lỗi phần cứng CPU (Machine Check Exception)</td>\n            <td><code>vmstat 1</code>, <code>uptime</code>, <code>top</code></td>\n          </tr>\n          <tr>\n            <td><strong>Memory (RAM)</strong></td>\n            <td>% đã dùng trong <code>free -m</code></td>\n            <td>Cột <code>si</code>/<code>so</code> (Swap In/Out) trong <code>vmstat</code></td>\n            <td>OOM Killer kích hoạt trong <code>dmesg</code></td>\n            <td><code>free -h</code>, <code>vmstat 1</code>, <code>dmesg -T</code></td>\n          </tr>\n          <tr>\n            <td><strong>Lưu trữ (Disk)</strong></td>\n            <td>%util trong <code>iostat -xz 1</code></td>\n            <td>Cột <code>b</code> (Uninterruptible Sleep / D-state)</td>\n            <td>I/O Errors trong <code>dmesg</code></td>\n            <td><code>iostat -xz 1</code>, <code>vmstat 1</code></td>\n          </tr>\n          <tr>\n            <td><strong>Mạng (Network)</strong></td>\n            <td>RX/TX bytes/sec qua <code>sar -n DEV</code></td>\n            <td>Hàng đợi backlog tràn, gói tin bị drop</td>\n            <td>RX/TX drop/err trong <code>ip -s link</code></td>\n            <td><code>ip -s link</code>, <code>ss -s</code>, <code>nload</code></td>\n          </tr>\n          <tr>\n            <td><strong>Tiến trình (Syscalls)</strong></td>\n            <td>Tần suất gọi hệ thống</td>\n            <td>Thời gian chờ I/O của lời gọi</td>\n            <td>Mã lỗi trả về (EACCES, ENOENT)</td>\n            <td><code>strace -c -p &lt;PID&gt;</code></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-3-9-use-method-tools",
          "title": "4.1 Bộ Công cụ Chẩn đoán Hiệu năng theo Phương pháp USE: vmstat, iostat & strace",
          "content": "\n        <p>Phương pháp luận <strong>USE Method</strong> (do Brendan Gregg, chuyên gia hiệu năng tại Netflix và Intel khởi xướng) quy định: Đối với mọi tài nguyên phần cứng (CPU, Memory, Storage, Network), kỹ sư cần phân tích 3 yếu tố:</p>\n        <ol>\n          <li><strong>Utilization (Mức sử dụng):</strong> Tỷ lệ phần trăm thời gian tài nguyên đang bận xử lý công việc.</li>\n          <li><strong>Saturation (Độ bão hòa):</strong> Mức độ công việc bị ứ đọng, xếp hàng chờ đợi do tài nguyên đã hết công suất.</li>\n          <li><strong>Errors (Lỗi):</strong> Số lượng sự kiện lỗi hoặc gói tin bị loại bỏ.</li>\n        </ol>\n\n        <h3 class=\"lx-h3\">Bảng phân giải các cột chỉ số sống còn trong vmstat 1</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Nhóm</th>\n              <th>Cột</th>\n              <th>Ý nghĩa thực chiến</th>\n              <th>Dấu hiệu cảnh báo nguy hiểm</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>procs</strong></td>\n              <td><code>r</code></td>\n              <td>Số lượng tiến trình đang chạy hoặc đang xếp hàng chờ CPU (Run Queue).</td>\n              <td>Nếu <code>r &gt; số_lõi_CPU</code> liên tục trong thời gian dài: CPU bị nghẽn (CPU Saturation)!</td>\n            </tr>\n            <tr>\n              <td><strong>procs</strong></td>\n              <td><code>b</code></td>\n              <td>Số lượng tiến trình bị chặn (Blocked) trong giấc ngủ không ngắt được (D state), thường là chờ I/O đĩa.</td>\n              <td>Nếu <code>b &gt; 0</code> kéo dài: Ổ đĩa cứng hoặc kết nối mạng đang bị treo.</td>\n            </tr>\n            <tr>\n              <td><strong>memory</strong></td>\n              <td><code>si</code> / <code>so</code></td>\n              <td>Dung lượng dữ liệu đọc từ Swap vào RAM (Swap In) và ghi từ RAM ra Swap (Swap Out) mỗi giây.</td>\n              <td><strong>Chỉ số cảnh báo số 1 về cạn RAM!</strong> Nếu <code>si/so &gt; 0</code> liên tục, máy chủ đang bị hiện tượng tráo trang dữ liệu (Thrashing), hiệu năng sẽ tụt dốc thảm hại.</td>\n            </tr>\n            <tr>\n              <td><strong>cpu</strong></td>\n              <td><code>us</code> / <code>sy</code></td>\n              <td>Tỷ lệ phần trăm thời gian CPU dành cho không gian người dùng (User) và nhân kernel (System).</td>\n              <td>Nếu <code>sy &gt; 30%</code>: Tiến trình đang thực hiện quá nhiều system call hoặc bị tranh chấp lock.</td>\n            </tr>\n            <tr>\n              <td><strong>cpu</strong></td>\n              <td><code>wa</code></td>\n              <td>Tỷ lệ phần trăm thời gian CPU nhàn rỗi nhưng phải chờ đợi đĩa cứng hoàn thành thao tác I/O (iowait).</td>\n              <td>Nếu <code>wa &gt; 20%</code>: Máy chủ bị nghẽn đĩa cứng trầm trọng (Disk I/O Bottleneck), không phải do thuật toán CPU.</td>\n            </tr>\n          </tbody>\n        </table></div>\n\n        <div class=\"lx-callout-danger\">\n          <strong>⚠️ CẢNH BÁO ĐỎ KHI DÙNG STRACE TRÊN MÁY CHỦ SẢN XUẤT:</strong><br/>\n          Lệnh <code>strace</code> là công cụ thần thánh giúp soi thấu từng lời gọi hệ thống (system call) của tiến trình. Tuy nhiên, cơ chế <code>ptrace</code> bên dưới sẽ chặn và tạm dừng tiến trình đích ở MỖI LẦN gọi system call để đọc dữ liệu! Điều này làm <strong>tiến trình bị chậm đi từ 10 lần đến 100 lần (10x-100x overhead)</strong>.<br/>\n          Nếu bạn gắn <code>strace</code> vào một tiến trình Nginx hay Database đang chịu tải hàng nghìn kết nối/giây trên Production, bạn sẽ làm hàng đợi bị nghẽn tức thì và đánh sập toàn bộ dịch vụ!<br/>\n          <strong>Quy tắc an toàn:</strong> Khi cần điều tra trên Production, chỉ dùng cờ thống kê nhẹ <code>strace -c -p &lt;PID&gt;</code> trong 5-10 giây rồi bấm Ctrl+C; hoặc chỉ lọc chính xác một syscall cụ thể: <code>strace -e trace=openat -p &lt;PID&gt;</code>.\n        </div>\n      ",
          "codeExamples": [
            {
              "title": "Chẩn đoán nghẽn đĩa với iostat và thống kê system call an toàn với strace -c",
              "lang": "bash",
              "code": "# 1. Khảo sát hoạt động đĩa chi tiết sau mỗi 1 giây (lọc bỏ thiết bị nhàn rỗi):\n$ sudo iostat -xz 1 3\nDevice            r/s     w/s     rkB/s     wkB/s   await  r_await  w_await  %util\nsda              2.00  450.00     16.00  18400.00   45.20     2.10    45.40  98.50%\n\n# Nhận xét: %util chạm 98.5% và thời gian chờ w_await lên tới 45.4ms (rất cao)!\n# Đĩa cứng sda đang bị quá tải ghi dữ liệu nghiêm trọng.\n\n# 2. Dùng iotop truy tìm chính xác tiến trình nào đang ghi đĩa:\n$ sudo iotop -b -n 1 -o | head -n 8\nTotal DISK READ: 0.00 B/s | Total DISK WRITE: 18.20 M/s\n  TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN      IO    COMMAND\n14201 be/4  postgres    0.00 B/s   18.20 M/s  0.00 %  94.10 %  postgres: walwriter\n\n# 3. Thống kê chi phí thời gian system call của tiến trình Python bằng strace -c (an toàn):\n$ sudo timeout 5 strace -c -p 28415\n% time     seconds  usecs/call     calls    errors syscall\n------ ----------- ----------- --------- --------- ----------------\n 82.40    0.045210          45      1004           epoll_wait\n 11.20    0.006140           6      1020           read\n  6.40    0.003510           3      1020           write\n------ ----------- ----------- --------- --------- ----------------\n100.00    0.054860                  3044           total",
              "output": "Device            r/s     w/s     rkB/s     wkB/s   await  r_await  w_await  %util\nsda              2.00  450.00     16.00  18400.00   45.20     2.10    45.40  98.50%",
              "annotations": [
                {
                  "part": "iostat -xz 1",
                  "text": "Cờ -x hiển thị thống kê mở rộng (await, %util); cờ -z tự động ẩn các ổ đĩa không có hoạt động I/O."
                },
                {
                  "part": "%util = 98.5%",
                  "text": "Thiết bị phần cứng đã chạm ngưỡng bão hòa hoàn toàn."
                },
                {
                  "part": "strace -c",
                  "text": "Thu thập và tổng kết bảng thống kê thời gian tiêu tốn cho từng syscall mà không in hàng triệu dòng log làm đơ terminal."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-9-ansible-basics",
          "title": "4.2 Tự động hóa Hạ tầng với Ansible & Nguyên lý Idempotency",
          "content": "\n        <p>Quản trị máy chủ thủ công bằng cách gõ từng dòng lệnh SSH (như cài đặt gói, sửa file cấu hình) chỉ phù hợp khi học tập hoặc quản lý 1-2 máy ảo nhỏ. Trong doanh nghiệp với quy mô hàng chục đến hàng trăm máy chủ, kỹ sư sử dụng công cụ <strong>Infrastructure as Code (IaC)</strong> như <strong>Ansible</strong>.</p>\n\n        <h3 class=\"lx-h3\">Tính chất Lũy thừa (Idempotency) - Linh hồn của Tự động hóa</h3>\n        <p>Một tác vụ được gọi là <strong>Idempotent (Bất biến lũy thừa)</strong> nếu bạn chạy nó 1 lần, 10 lần hay 100 lần thì kết quả cuối cùng trên hệ thống vẫn hoàn toàn giống nhau, và nếu hệ thống đã đạt trạng thái mong muốn thì các lần chạy sau sẽ <strong>không làm thay đổi bất kỳ điều gì</strong>.</p>\n        <ul>\n          <li><strong>Script Bash thông thường (Không idempotent):</strong> Nếu bạn viết <code>echo \"192.168.1.1 master\" &gt;&gt; /etc/hosts</code> trong script, mỗi lần chạy script tệp hosts sẽ bị chèn thêm 1 dòng thừa thãi!</li>\n          <li><strong>Ansible Module (Idempotent):</strong> Module <code>lineinfile</code> kiểm tra xem dòng đó đã có trong file chưa. Nếu chưa có nó mới thêm (trạng thái <code>changed</code>); nếu đã có rồi nó sẽ bỏ qua và báo trạng thái <code>ok</code>.</li>\n        </ul>\n      ",
          "codeExamples": [
            {
              "title": "Playbook Ansible deploy_web.yml chuẩn Idempotent",
              "lang": "yaml",
              "code": "# deploy_web.yml\n- name: Deploy Production Nginx & Hardening\n  hosts: webservers\n  become: yes\n  tasks:\n    - name: Ensure Nginx is installed at latest version\n      ansible.builtin.apt:\n        name: nginx\n        state: present\n        update_cache: yes\n        cache_valid_time: 3600\n\n    - name: Deploy custom Nginx configuration template\n      ansible.builtin.template:\n        src: templates/nginx.conf.j2\n        dest: /etc/nginx/nginx.conf\n        owner: root\n        group: root\n        mode: '0644'\n        validate: '/usr/sbin/nginx -t -c %s'\n      notify: Reload Nginx\n\n    - name: Ensure Nginx service is running and enabled at boot\n      ansible.builtin.systemd:\n        name: nginx\n        state: started\n        enabled: yes\n\n  handlers:\n    - name: Reload Nginx\n      ansible.builtin.systemd:\n        name: nginx\n        state: reloaded",
              "output": "# Kiểm thử Playbook bằng chế độ Dry-run và so sánh khác biệt:\n$ ansible-playbook -i inventory.ini deploy_web.yml --check --diff\n\nPLAY [Deploy Production Nginx & Hardening] *************************************\nTASK [Ensure Nginx is installed at latest version] *****************************\nok: [web-prod-01]\nTASK [Deploy custom Nginx configuration template] ******************************\n--- before: /etc/nginx/nginx.conf\n+++ after: /root/.ansible/tmp/ansible-tmp-1234/source\n@@ -12,3 +12,4 @@\n+    client_max_body_size 50M;\nchanged: [web-prod-01]\n\nPLAY RECAP *********************************************************************\nweb-prod-01                : ok=2    changed=1    unreachable=0    failed=0",
              "annotations": [
                {
                  "part": "validate",
                  "text": "'/usr/sbin/nginx -t -c %s': Tự động kiểm tra cú pháp file cấu hình trước khi chép đè vào /etc/nginx/."
                },
                {
                  "part": "--check --diff",
                  "text": "Chạy mô phỏng xem trước các dòng nội dung sẽ thay đổi mà không áp dụng thật."
                },
                {
                  "part": "handlers",
                  "text": "Chỉ kích hoạt reload Nginx duy nhất 1 lần nếu tệp cấu hình thực sự có sự thay đổi."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3-9-troubleshoot-scenarios",
          "title": "4.3 Diễn tập 3 Kịch bản Sự cố Sản xuất Toàn diện Cấp 3 (Troubleshooting Labs)",
          "content": "\n        <p>Dưới đây là 3 tình huống sự cố điển hình thường xuyên xuất hiện trong các bài phỏng vấn vị trí Senior Linux Systems Engineer / DevOps / SRE:</p>\n\n        <h3 class=\"lx-h3\">Kịch bản 1: Lỗi 502 Bad Gateway Nginx khi Backend Python bị Sập</h3>\n        <ul>\n          <li><strong>Hiện tượng:</strong> Khách hàng truy cập website gặp trang trắng thông báo <code>502 Bad Gateway</code>. Nginx vẫn đang active running.</li>\n          <li><strong>Quy trình xử lý:</strong>\n            <ol>\n              <li>Đọc file log lỗi của Nginx: <code>sudo tail -n 20 /var/log/nginx/error.log</code>. Thấy dòng thông báo: <em>connect() to 127.0.0.1:8000 failed (111: Connection refused)</em>.</li>\n              <li>Kiểm tra dịch vụ backend: <code>sudo systemctl status fastapi_app.service</code>. Dịch vụ hiển thị trạng thái <code>failed</code>.</li>\n              <li>Đọc vết ngoại lệ Python bằng journald: <code>journalctl -u fastapi_app.service -n 30 -p err</code>.</li>\n              <li>Khắc phục nguyên nhân (ví dụ biến môi trường trong file <code>.env</code> bị thiếu) và khởi động lại backend: <code>sudo systemctl restart fastapi_app</code>.</li>\n            </ol>\n          </li>\n        </ul>\n\n        <h3 class=\"lx-h3\">Kịch bản 2: Máy chủ bị Kẹt tại Emergency Mode do Lỗi /etc/fstab</h3>\n        <ul>\n          <li><strong>Hiện tượng:</strong> Kỹ sư thêm một ổ đĩa gắn ngoài vào fstab rồi reboot máy. Máy chủ không vào được SSH mà dừng lại ở màn hình console khẩn cấp với thông báo: <em>You are in emergency mode. After logging in, type 'journalctl -xb' to view system logs</em>.</li>\n          <li><strong>Quy trình cứu hộ:</strong>\n            <ol>\n              <li>Đăng nhập tài khoản root tại giao diện console.</li>\n              <li>Gắn lại phân vùng root ở chế độ đọc ghi (vì mặc định Emergency mode mount root là Read-Only): <code>mount -o remount,rw /</code>.</li>\n              <li>Mở tệp fstab: <code>nano /etc/fstab</code>. Comment dòng ổ đĩa bị lỗi hoặc thêm tùy chọn <code>nofail</code> vào cột thứ 4.</li>\n              <li>Kiểm tra lại toàn bộ: <code>mount -a</code>. Khi không còn lỗi nào, gõ <code>reboot</code> để máy khởi động lại bình thường.</li>\n            </ol>\n          </li>\n        </ul>\n\n        <h3 class=\"lx-h3\">Kịch bản 3: Load Average Tăng Vọt nhưng %CPU Chỉ 5% (Hiện tượng Nghẽn I/O)</h3>\n        <ul>\n          <li><strong>Hiện tượng:</strong> Lệnh <code>uptime</code> báo tải hệ thống cực cao: <code>load average: 38.5, 35.2, 30.1</code> trên máy chủ chỉ có 4 lõi CPU. Tuy nhiên khi mở <code>top</code>, tỷ lệ CPU người dùng <code>%us</code> chỉ có 4-5%!</li>\n          <li><strong>Bản chất:</strong> Load Average trên Linux phản ánh tổng số tiến trình ở trạng thái chạy (R) <strong>cộng với các tiến trình ở trạng thái ngủ không ngắt được (D - Uninterruptible Sleep)</strong>. Khi ổ cứng bị nghẽn hoặc quá tải, hàng chục tiến trình bị treo cứng chờ đọc ghi đĩa, làm chỉ số Load Average tăng vọt.</li>\n          <li><strong>Quy trình xử lý:</strong> Chạy <code>vmstat 1</code> thấy cột <code>wa</code> tăng vọt 70%. Chạy <code>sudo iostat -xz 1</code> xác định ổ đĩa có <code>%util = 100%</code>. Dùng <code>sudo iotop -o</code> phát hiện một câu lệnh sao chép dữ liệu khổng lồ đang chạy không kiểm soát.</li>\n        </ul>\n      ",
          "codeExamples": [
            {
              "title": "Bộ lệnh cứu hộ sự cố khẩn cấp trên Production",
              "lang": "bash",
              "code": "# Kiểm tra nhanh 3 nguyên nhân cốt lõi gây sập dịch vụ:\n# 1. Kiểm tra dung lượng đĩa có bị đầy 100%:\n$ df -h / /var/log\n\n# 2. Kiểm tra bộ nhớ RAM và swap:\n$ free -h\n\n# 3. Xem 15 dòng lỗi gần nhất trong nhật ký hệ thống:\n$ journalctl -p err -n 15 --no-pager",
              "output": "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   12G   36G  25% /\n               total        used        free      shared  buff/cache   available\nMem:           7.7Gi       2.1Gi       3.8Gi       120Mi       1.8Gi       5.3Gi\nSwap:          2.0Gi          0B       2.0Gi",
              "annotations": [
                {
                  "part": "Quy trình kiểm tra 3 bước phản xạ",
                  "text": "Đĩa (df -h) ➔ RAM (free -h) ➔ Log lỗi (journalctl -p err) giúp giải quyết 80% sự cố production trong 60 giây đầu tiên."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Bắt bệnh hệ thống trong 60 giây bằng vmstat và strace</h4>\n      <p>Giảng viên thực hiện quy trình kiểm tra sức khỏe hệ thống theo thời gian thực:</p>\n      <pre><code># 1. Chạy vmstat hiển thị mỗi 1 giây một dòng\nvmstat 1 5\n\n# Đọc hiểu các cột sống còn:\n# r: Số tiến trình đang chạy hoặc chờ CPU (> số lõi CPU = quá tải CPU)\n# b: Số tiến trình đang ngủ sâu chờ I/O (D-state) (> 0 = nghẽn đĩa)\n# si/so: Swap In / Swap Out (> 0 = cạn kiệt RAM vật lý nghiêm trọng)\n# wa: % thời gian CPU phải ngồi rảnh chờ I/O đĩa xong\n\n# 2. Bắt dấu vết lời gọi hệ thống của một tiến trình đang bị treo\nsudo strace -p &lt;PID&gt; -e trace=file,network -T</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Khởi động lại máy mò mẫm</div>\n          <pre><code># Phản ứng nghiệp dư khi hệ thống chậm:\nsudo reboot\n\n# Kết quả: Mất toàn bộ dấu vết hiện trường,\n# 10 phút sau sự cố tái diễn và không rõ lý do!</code></pre>\n          <p class=\"lx-diff-desc\">Reboot không giải quyết được nguyên nhân gốc rễ (Root Cause); nó chỉ xóa sạch dữ liệu đệm và làm gián đoạn người dùng.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Áp dụng USE Method thu thập bằng chứng</div>\n          <pre><code># 1. Đo lường tải & bão hòa:\nvmstat 1 5\n# 2. Rà quét nhật ký nhân:\nsudo dmesg -T --level=err,warn\n# 3. Định vị tiến trình nghẽn:\npidstat -d 1 3</code></pre>\n          <p class=\"lx-diff-desc\">Tìm ra chính xác tiến trình gây nghẽn tài nguyên và xử lý triệt để nguyên nhân gốc rễ.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Tái hiện Nghẽn I/O Đĩa & Chẩn đoán Bằng vmstat/strace",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.9</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Tạo tải giả lập ghi đĩa với <code>dd</code>, sử dụng <code>vmstat</code> để quan sát biến động của cột <code>b</code> và <code>wa</code>, sau đó dùng <code>strace</code> để thống kê thời gian tiêu tốn vào các lời gọi hệ thống.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Linux có các công cụ: <code>vmstat</code>, <code>strace</code>, <code>dd</code>.</li>\n        <li>Tạo thư mục làm việc: <code>mkdir -p ~/perf-lab && cd ~/perf-lab</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Quan sát trạng thái nền (baseline) của hệ thống khi không có tải:\n          <pre><code>vmstat 1 3</code></pre>\n        </li>\n        <li>Kích hoạt một tiến trình ghi đĩa nặng ở chế độ nền (chạy đồng bộ direct I/O):\n          <pre><code>dd if=/dev/zero of=~/perf-lab/test.img bs=1M count=2000 oflag=direct &\nDD_PID=$!\necho \"dd PID: $DD_PID\"</code></pre>\n        </li>\n        <li>Chạy <code>vmstat</code> để quan sát cột <code>b</code> và <code>wa</code>:\n          <pre><code>vmstat 1 5</code></pre>\n          <em>Quan sát: cột wa tăng vọt và cột b xuất hiện các tiến trình chờ I/O!</em>\n        </li>\n        <li>Gắn <code>strace</code> để đếm tần suất và thời gian các lời gọi hệ thống của tiến trình <code>dd</code>:\n          <pre><code>sudo strace -c -p $DD_PID &\nsleep 3\nsudo kill -INT $(pgrep -n strace)</code></pre>\n        </li>\n        <li>Dọn dẹp tệp thử nghiệm sau khi hoàn tất:\n          <pre><code>wait $DD_PID 2>/dev/null || true\nrm -f ~/perf-lab/test.img</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Bảng thống kê của <code>strace -c</code> hiển thị chi tiết phần trăm thời gian tiêu tốn vào system call <code>write</code>.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Sử dụng công cụ <code>pidstat -d 1 5</code> để hiển thị tốc độ đọc/ghi (kB_rd/s, kB_wr/s) của từng tiến trình riêng biệt.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Lệnh <code>strace</code> làm chậm tiến trình được gắn theo dõi từ 10 đến 100 lần do overhead của việc intercept từng system call. Tuyệt đối không gắn <code>strace</code> vào các tiến trình dịch vụ có lưu lượng truy cập cực cao trên Production trong thời gian dài!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Tiến trình rơi vào trạng thái <code>D-state (Uninterruptible Sleep)</code> không thể kill</strong></td><td>Tiến trình đang chờ đợi phần cứng trả về dữ liệu I/O (ví dụ đĩa cứng bị bad sector hoặc mount point NFS bị mất mạng). Kernel khóa tiến trình ở trạng thái D để bảo toàn cấu trúc dữ liệu, do đó <code>kill -9</code> hoàn toàn không có tác dụng.</td><td>Khôi phục lại kết nối mạng của mount point NFS, hoặc khởi động lại hệ thống nếu ổ đĩa vật lý bị treo cứng.</td></tr>\n          <tr><td><strong>Load Average tăng vọt nhưng % CPU sử dụng lại rất thấp</strong></td><td>Trên Linux, Load Average đo cả số tiến trình chờ CPU VÀ số tiến trình bị kẹt trong hàng đợi I/O đĩa (D-state). Khi đĩa bị nghẽn I/O, Load Average tăng cao dù CPU vẫn rảnh rỗi.</td><td>Kiểm tra cột <code>wa</code> trong <code>vmstat</code> và dùng <code>iostat -xz 1</code> để xác định phân vùng đĩa bị nghẽn.</td></tr>\n          <tr><td><strong>Máy chủ bất ngờ tắt ngấm ứng dụng Java/Python mà không có log lỗi trong file app</strong></td><td>Hệ thống cạn kiệt RAM, cơ chế Out-Of-Memory (OOM) Killer của Linux Kernel đã can thiệp và cưỡng bức tiêu diệt tiến trình ngốn nhiều bộ nhớ nhất.</td><td>Kiểm tra nhật ký OOM bằng <code>sudo dmesg -T | grep -i oom</code> để xác nhận PID và tên tiến trình bị tiêu diệt.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Giới hạn tài nguyên bằng cgroups/systemd để chống DoS tài nguyên:</strong> Luôn cấu hình các chỉ thị <code>MemoryMax=2G</code> và <code>CPUQuota=150%</code> trong Service Unit để một dịch vụ bị rò rỉ bộ nhớ (Memory Leak) không thể làm sập toàn bộ máy chủ.</li>\n        <li><strong>Nguyên tắc Idempotency trong Tự động hóa Ansible:</strong> Mọi Playbook tự động hóa phải có tính lũy thừa (Idempotent): chạy 1 lần hay 100 lần đều đem lại cùng một trạng thái hệ thống nhất quán, không làm phát sinh lỗi hay ghi đè cấu hình trùng lặp.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Brendan Gregg: The USE Method:</strong> <a href=\"https://www.brendangregg.com/usemethod.html\" target=\"_blank\" rel=\"noopener\">The USE Method - Utilization, Saturation, and Errors</a>.</li>\n      <li><strong>Systems Performance: Enterprise and the Cloud (2nd Edition):</strong> Cuốn sách gối đầu giường của mọi kỹ sư SRE.</li>\n      <li><strong>Ansible Official Documentation:</strong> <a href=\"https://docs.ansible.com/\" target=\"_blank\" rel=\"noopener\">Ansible Community Documentation</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Đối chiếu Ý nghĩa Các Cột Lệnh vmstat",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Nhóm</th><th>Cột</th><th>Ý nghĩa</th><th>Ngưỡng cảnh báo bình thường</th></tr></thead>\n        <tbody>\n          <tr><td>procs</td><td><code>r</code></td><td>Số tiến trình đang chạy hoặc chờ CPU</td><td>Nhỏ hơn hoặc bằng tổng số lõi CPU (Cores)</td></tr>\n          <tr><td>procs</td><td><code>b</code></td><td>Số tiến trình ngủ sâu chờ I/O (D-state)</td><td>Nên bằng 0; nếu > 0 liên tục là bị nghẽn đĩa</td></tr>\n          <tr><td>memory</td><td><code>swpd</code></td><td>Dung lượng bộ nhớ ảo swap đã dùng</td><td>Chấp nhận được nếu ổn định và si/so bằng 0</td></tr>\n          <tr><td>swap</td><td><code>si / so</code></td><td>Tốc độ đọc/ghi Swap từ đĩa (KB/s)</td><td>Bắt buộc phải xấp xỉ 0; nếu > 0 là thiếu RAM nghiêm trọng</td></tr>\n          <tr><td>cpu</td><td><code>us / sy</code></td><td>% thời gian CPU cho User space / Kernel space</td><td>Tổng không nên vượt quá 85-90% kéo dài</td></tr>\n          <tr><td>cpu</td><td><code>wa</code></td><td>% thời gian CPU chờ I/O đĩa</td><td>Nên &lt; 5%; nếu > 20% là hệ thống lưu trữ bị nghẽn</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Hệ thống Black Friday chịu tải 100.000 user/phút bất ngờ bị đơ lag và quy trình hồi sinh bằng USE Method",
        "content": "\n      <p><strong>1. Triệu chứng sự cố:</strong> Đúng 12:00 trưa ngày hội mua sắm Black Friday, lượng người dùng ùa vào mua hàng vượt mốc 100.000 user/phút. Máy chủ phản hồi chậm chạp, khách hàng kêu ca không thể thanh toán đơn hàng. Giám sát báo động Load Average tăng vọt từ 2.0 lên <strong>42.0</strong> trên máy chủ 8 CPU.</p>\n      \n      <p><strong>2. Điều tra theo Phương pháp USE Method:</strong></p>\n      <pre><code># Bước 1: Kiểm tra CPU và Bộ nhớ với vmstat:\n$ vmstat 1 3\nprocs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n 2 38      0 120540  14200 450120    0    0    12 48500 2400 3100  8  6 12 74  0</code></pre>\n      <p>Bảng phân tích chỉ rõ:</p>\n      <ul>\n        <li>Cột <code>r</code> chỉ có 2 (CPU hoàn toàn rảnh rỗi, <code>us=8%</code>).</li>\n        <li>Cột <code>b = 38</code> (có tới 38 tiến trình đang bị khóa cứng chờ đợi I/O).</li>\n        <li>Cột <code>wa = 74%</code> (CPU dành tới 74% thời gian chỉ để ngồi chờ đĩa cứng phản hồi!).</li>\n        <li>Cột <code>bo = 48500</code> (khối lượng ghi ra đĩa cực lớn).</li>\n      </ul>\n      \n      <p><strong>3. Nguyên nhân gốc rễ:</strong> Dùng <code>sudo iotop -o</code> phát hiện dịch vụ Nginx và FastAPI đang ghi log truy cập ở mức độ Verbose Debug xuống cùng một phân vùng ổ đĩa chứa cơ sở dữ liệu. Ổ đĩa cứng SSD bị bão hòa I/O 100% (I/O Bottleneck), khiến các truy vấn ghi đơn hàng của PostgreSQL bị nghẽn hàng đợi.</p>\n      \n      <p><strong>4. Biện pháp khắc phục khẩn cấp:</strong></p>\n      <pre><code># Tắt ngay lập tức log ghi file tĩnh của Nginx và hạ log level FastAPI về WARNING:\n$ sudo sed -i 's/access_log on;/access_log off;/' /etc/nginx/sites-available/fastapi_app.conf\n$ sudo nginx -t && sudo systemctl reload nginx\n\n# Đổi log level của ứng dụng Python sang WARNING trong file .env:\n$ sudo sed -i 's/LOG_LEVEL=DEBUG/LOG_LEVEL=WARNING/' /opt/fastapi_app/.env\n$ sudo systemctl restart fastapi_app</code></pre>\n      <p>Chỉ sau 30 giây, cột <code>wa</code> trong vmstat rơi thẳng từ 74% xuống còn 2%, cột <code>b</code> về 0. Tốc độ ghi đĩa hạ nhiệt 95%, cơ sở dữ liệu xử lý trơn tru và toàn bộ đơn hàng được giải phóng tức thì.</p>\n      \n      <p><strong>5. Phòng ngừa lâu dài:</strong></p>\n      <ul>\n        <li>Tách riêng phân vùng ổ đĩa chứa dữ liệu Database (trên Logical Volume riêng biệt tốc độ cao) tách rời khỏi phân vùng chứa tệp nhật ký <code>/var/log</code>.</li>\n        <li>Quy định nghiêm ngặt: Trong môi trường sản xuất, tuyệt đối không để mức log DEBUG cho ứng dụng web.</li>\n      </ul>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lạm dụng strace trên tiến trình đang chịu tải cao trong môi trường Production",
            "content": "Lệnh <code>strace</code> can thiệp ở mức nhân kernel thông qua cơ chế <code>ptrace</code>, làm chậm tiến trình đích từ 10 lần đến 100 lần! Nếu bạn chạy lệnh <code>sudo strace -p $(pgrep nginx)</code> trên một máy chủ web đang phục vụ hàng nghìn khách hàng, Nginx sẽ bị treo cứng và toàn bộ kết nối người dùng sẽ bị timeout. Chỉ dùng <code>strace -c</code> trong vài giây để lấy mẫu thống kê hoặc tái hiện sự cố trên môi trường Staging/Lab."
          },
          {
            "title": "Hiểu sai chỉ số CPU Load Average",
            "content": "Nhiều người lầm tưởng rằng Load Average cao đồng nghĩa với việc CPU bị quá tải và vội vàng nâng cấp CPU máy chủ. Trên Linux, Load Average đo cả các tiến trình ở trạng thái Uninterruptible Sleep (chờ I/O đĩa cứng). Nếu cột <code>wa</code> trong <code>vmstat</code> cao, nâng cấp CPU hoàn toàn vô tác dụng; thủ phạm thực sự là ổ đĩa bị nghẽn hoặc database thiếu index."
          }
        ],
        "tips": [
          {
            "title": "Luôn dùng bộ cờ -xz 1 khi kiểm tra bằng iostat",
            "content": "Lệnh <code>sudo iostat -xz 1</code> là vũ khí hàng đầu để phát hiện nghẽn ổ đĩa. Cờ <code>-x</code> hiển thị các thông số mở rộng sống còn như <code>await</code> (độ trễ phản hồi đĩa tính bằng ms) và <code>%util</code> (mức độ bận của ổ cứng); còn cờ <code>-z</code> sẽ ẩn toàn bộ các phân vùng không có hoạt động, giúp màn hình cực kỳ gọn gàng và dễ quan sát."
          },
          {
            "title": "Kiểm tra Playbook Ansible an toàn với --check và --diff",
            "content": "Trước khi bấm chạy một Playbook Ansible lên hàng chục máy chủ production, hãy luôn thêm cờ: <code>ansible-playbook site.yml --check --diff</code>. Cờ <code>--check</code> thực thi ở chế độ Dry-run (không sửa thật trên server), còn <code>--diff</code> hiển thị chi tiết từng dòng cấu hình sẽ bị thay đổi theo định dạng diff trực quan."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Phân tích các chỉ số tài nguyên trọng yếu trong đầu ra vmstat",
          "problem": "Trong đầu ra của lệnh vmstat 1 5, các cột r, b, si, so, wa mang ý nghĩa sống còn gì khi chẩn đoán hệ thống đang bị nghẽn?",
          "hint": "r là tiến trình chờ CPU, b là tiến trình chờ I/O, si/so là swap, wa là I/O wait.",
          "solutionCode": "vmstat 1 5",
          "solutionOutput": "procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n 3  0      0 452100 120400 854200    0    0     5    20  250  450 15  5 80  0  0\n 8  2      0 451800 120400 854200    0    0   120  4500 1200 2400 65 25  5  5  0",
          "explanation": "r > số nhân CPU cho thấy nghẽn hàng đợi xử lý. b > 0 kèm wa cao (>20%) báo hiệu nghẽn ổ đĩa I/O nghiêm trọng. si/so > 0 cho thấy hệ thống thiếu RAM trầm trọng và đang phải tráo đổi bộ nhớ ảo liên tục.",
          "annotations": [
            {
              "part": "r (running queue)",
              "text": "Số tiến trình đang chạy hoặc đang chờ CPU phân phối thời gian."
            },
            {
              "part": "wa (iowait)",
              "text": "Phần trăm thời gian CPU nhàn rỗi nhưng phải đứng chờ ổ đĩa phản hồi."
            }
          ],
          "rubric": [
            {
              "criterion": "Đọc hiểu cột vmstat",
              "pass": "Nêu đúng ý nghĩa các cột",
              "excellent": "Phân tích được mối tương quan giữa b và wa",
              "weight": "50%"
            },
            {
              "criterion": "Phát hiện điểm nghẽn",
              "pass": "Nhận diện được nghẽn CPU vs I/O",
              "excellent": "Đánh giá được tác hại của swap activity (si/so)",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Lần vết lời gọi hệ thống (Syscall) của tiến trình bằng strace",
          "problem": "Hãy viết câu lệnh sử dụng strace để bám vết (trace) theo một tiến trình Python đang chạy có PID 3456, thống kê tổng thời gian tiêu tốn cho từng System Call.",
          "hint": "Sử dụng lệnh strace -c -p 3456.",
          "solutionCode": "sudo strace -c -p 3456",
          "solutionOutput": "% time     seconds  usecs/call     calls    errors syscall\n------ ----------- ----------- --------- --------- ----------------\n 65.40    0.452100          15     30140           read\n 20.15    0.139400          22      6330           write\n 10.20    0.070500          10      7050      120  openat\n  4.25    0.029400           8      3675           futex\n------ ----------- ----------- --------- --------- ----------------\n100.00    0.691400                 47195       120 total",
          "explanation": "Cờ -c (count) của strace thống kê bảng tổng hợp tỷ lệ phần trăm thời gian, số lần gọi và số lỗi của từng syscall (read, write, openat, futex) thay vì in hàng triệu dòng log thô ra terminal.",
          "annotations": [
            {
              "part": "strace -c -p PID",
              "text": "Chế độ profile syscall cực kỳ hữu ích để tìm chính xác điểm nghẽn của mã nguồn."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp strace",
              "pass": "Dùng đúng cờ -p và -c",
              "excellent": "Hiểu được rủi ro giảm hiệu năng khi dùng strace trên production",
              "weight": "50%"
            },
            {
              "criterion": "Phân tích kết quả",
              "pass": "Đọc hiểu bảng thống kê",
              "excellent": "Nhận diện được syscall chiếm nhiều thời gian nhất",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Chẩn đoán hiện tượng I/O Wait cao và nghẽn hàng đợi tiến trình",
          "problem": "Máy chủ ứng dụng ghi nhận CPU Load Average tăng vọt lên 25 (trong khi máy chỉ có 4 nhân CPU), nhưng %CPU sử dụng của các tiến trình lại rất thấp. Hãy phân tích nguyên nhân và viết chuỗi lệnh chẩn đoán.",
          "hint": "Load Average trên Linux tính cả tiến trình ở trạng thái R (running) và D (Uninterruptible Sleep - thường là chờ I/O đĩa hoặc NFS). Dùng iostat -x và ps -eo state.",
          "solutionCode": "# 1. Kiểm tra thống kê mở rộng của ổ đĩa (I/O Bottleneck):\niostat -xz 1 3\n\n# 2. Liệt kê các tiến trình đang rơi vào trạng thái D (chờ I/O đĩa):\nps -eo pid,user,stat,comm | grep \"^[ 0-9]*[A-Za-z0-9_-]* *D\"\n\n# 3. Kiểm tra thông số await và %util của ổ đĩa:\n# Nếu %util đạt 100% hoặc await > 50ms tức ổ cứng là thủ phạm.",
          "solutionOutput": "Device   r/s     w/s     rkB/s     wkB/s   rrqm/s  wrqm/s  %rrqm  %wrqm   r_await   w_await   aqu-sz  rareq-sz  wareq-sz  svctm  %util\nsda     5.00  450.00     20.00  45000.00     0.00   50.00   0.00  10.00      2.10    125.40    18.50      4.00    100.00   2.15  99.80",
          "explanation": "Trên Linux, trạng thái D (Uninterruptible Sleep) đại diện cho các tiến trình đang chờ tài nguyên phần cứng (chủ yếu là đĩa hoặc mạng chia sẻ NFS). Khi ổ cứng quá tải (%util xấp xỉ 100%, w_await cao), các tiến trình bị dồn ứ làm tăng Load Average dù CPU không bận tính toán.",
          "annotations": [
            {
              "part": "iostat -xz",
              "text": "Cờ -x hiển thị thông số mở rộng (await, %util), cờ -z bỏ qua thiết bị không có I/O."
            }
          ],
          "rubric": [
            {
              "criterion": "Bản chất Load Average",
              "pass": "Hiểu trạng thái D State",
              "excellent": "Phân tích được sự khác biệt giữa Linux Load Avg và CPU utilization",
              "weight": "50%"
            },
            {
              "criterion": "Kỹ năng chẩn đoán iostat",
              "pass": "Dùng đúng iostat -x",
              "excellent": "Đánh giá chuẩn xác thông số %util và await để kết luận",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Phương pháp USE kiểm tra tuần tự 3 chỉ số cho từng tài nguyên phần cứng: Mức sử dụng (Utilization), Độ bão hòa (Saturation) và Lỗi (Errors).",
        "vmstat cung cấp bức tranh toàn cảnh sức khỏe hệ thống: cột r (quá tải CPU), cột b (nghẽn đĩa), cột si/so (cạn RAM) và cột wa (chờ I/O).",
        "Load Average trên Linux bao gồm cả tiến trình chờ CPU và tiến trình nghẽn I/O ở trạng thái D-state (Uninterruptible Sleep).",
        "strace cho phép soi từng lời gọi hệ thống và thời gian tiêu tốn, nhưng tạo overhead lớn nên không chạy lâu trên Production.",
        "Tự động hóa với Ansible tuân thủ nguyên lý Idempotency, cho phép thực thi kịch bản nhiều lần mà không làm thay đổi trạng thái nếu đã đạt chuẩn."
      ],
      "generalInfo": {
        "duration": "65 phút",
        "targetAudience": "Senior SRE, Performance Engineer, Infrastructure Automation Lead",
        "prerequisites": "Đã hoàn thành toàn bộ kiến thức Cấp 3 (systemd, lưu trữ, mạng, bảo mật, Nginx)",
        "environment": "Máy chủ Linux hoặc máy ảo có cài đặt vmstat, iostat, strace, ansible",
        "materials": "Terminal Linux quyền sudo, kịch bản tạo tải CPU/Disk để thực hành đo đạc"
      },
      "nextLessonPreview": "Trong Bài 3.10, chúng ta sẽ khép lại Cấp độ 3 với Bảng Tra cứu Quản trị Thực chiến & An toàn Thông tin Toàn diện (Cheat Sheet & Glossary) trước khi bước sang Cấp độ 4: Tầng sâu Nhân Linux & Container Internals.",
      "quiz": [
        {
          "question": "Trong đầu ra của lệnh 'vmstat 1', chỉ số nào cho thấy hệ thống đang bị cạn kiệt bộ nhớ RAM vật lý nghiêm trọng và phải liên tục hoán đổi dữ liệu với đĩa?",
          "options": [
            "si (Swap In) và so (Swap Out) liên tục lớn hơn 0",
            "Cột free hiển thị dung lượng",
            "Cột id (CPU idle) bằng 100",
            "Cột us (User CPU) lớn hơn 50"
          ],
          "explanation": "Khi si và so liên tục khác 0, kernel đang phải liên tục đọc/ghi dữ liệu từ đĩa swap vào RAM do thiếu RAM vật lý, dẫn đến hiện tượng tráo trang (Thrashing) làm máy cực kỳ chậm.",
          "correctIndex": 0
        },
        {
          "question": "Tại sao tiến trình ở trạng thái 'D' (Uninterruptible Sleep) không thể bị tiêu diệt bởi lệnh 'kill -9'?",
          "options": [
            "Vì tiến trình đó có quyền root",
            "Vì tiến trình đang nằm trong nhân Kernel chờ hoàn tất một thao tác phần cứng I/O, Kernel bảo vệ tiến trình để tránh làm hỏng cấu trúc dữ liệu hệ thống",
            "Vì lệnh kill bị lỗi cú pháp",
            "Vì tiến trình đó đã chết từ trước"
          ],
          "explanation": "D-state là trạng thái ngủ không ngắt được trong khi chờ I/O đĩa hoặc mạng. Kernel không phân phối tín hiệu (signal) cho tiến trình ở trạng thái này cho đến khi thao tác I/O hoàn tất.",
          "correctIndex": 1
        },
        {
          "question": "Trong phương pháp chẩn đoán hiệu năng USE Method do chuyên gia Brendan Gregg đề xuất, ba chữ cái U-S-E đại diện cho điều gì đối với mọi tài nguyên hệ thống?",
          "options": [
            "Utilization (Độ sử dụng), Saturation (Độ bão hòa/Hàng đợi), Errors (Số lượng lỗi)",
            "User, System, Environment",
            "Upload, Storage, Ethernet",
            "Unit, Service, Execution"
          ],
          "correctIndex": 0,
          "explanation": "Phương pháp USE Method là chuẩn mực quốc tế khi điều tra sự cố hiệu năng: Đối với từng tài nguyên (CPU, RAM, Đĩa, Mạng), hãy kiểm tra lần lượt: Utilization (% thời gian bận), Saturation (hàng đợi công việc bị ứ đọng), và Errors (số lượng lỗi phát sinh)."
        }
      ],
      "reflectionQuestion": "Một máy chủ cơ sở dữ liệu có thông số `uptime` báo: `load average: 25.50, 24.10, 20.00` trong khi máy chủ chỉ có 4 lõi CPU. Quản trị viên mở lệnh `top` thấy `%Cpu(s): 2.1 us, 1.5 sy, 0.0 ni, 12.3 id, 84.1 wa`. Hãy phân tích chi tiết tình trạng máy chủ đang gặp phải và đề xuất 3 bước điều tra kỹ thuật để xác định chính xác nguyên nhân.",
      "reflectionHint": "Gợi ý: Phân tích: Tải trung bình 25 trên máy 4 core là rất cao, nhưng CPU User và System đều rất thấp (tổng ~3.6%), trong khi `wa` (iowait) lên tới 84.1%. Điều này chứng minh CPU hoàn toàn rảnh rỗi nhưng bị kẹt hàng loạt tiến trình chờ thao tác I/O đĩa cứng (D-state). 3 bước điều tra: 1. Chạy `iostat -xz 1 5` để xem phân vùng đĩa nào có `%util` đạt 100% hoặc `await` (thời gian phản hồi I/O) cao bất thường. 2. Chạy `iotop -o` hoặc `pidstat -d 1 5` để tìm chính xác PID và tên tiến trình đang đọc/ghi đĩa dữ dội nhất. 3. Kiểm tra log nhân `sudo dmesg -T --level=err,warn` để xem có cảnh báo lỗi phần cứng bad sector đĩa hoặc controller I/O bị nghẽn không."
    },
    {
      "id": "lx-3-10",
      "number": "3.10",
      "title": "Bảng tra cứu Quản trị Thực chiến & Bảo mật Cấp 3 (Cheat Sheet & Glossary)",
      "subtitle": "Sổ tay cứu nguy toàn diện của kỹ sư hệ thống: Ma trận lệnh quản trị có đánh giá mức độ rủi ro, quy trình hoàn tác và từ điển thuật ngữ chuyên sâu Cấp 3",
      "level": "Nâng cao",
      "duration": "25 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Ghi nhớ toàn bộ các lệnh và công cụ nâng cao của Cấp độ 3: systemctl, journalctl, lvm, fstab, ufw, nftables, fail2ban, selinux, rsync, nginx, vmstat",
        "2. [Hiểu - Understand] Hiểu sâu sự phối hợp giữa các tầng: Dịch vụ (systemd) - Lưu trữ (LVM) - Mạng/Bảo vệ (UFW/SELinux) - Ứng dụng (Nginx)",
        "3. [Vận dụng - Apply] Tra cứu và áp dụng nhanh cú pháp khắc phục sự cố nghiêm trọng trên máy chủ sản xuất",
        "4. [Phân tích - Analyze] Phân tích và đối chiếu các giải pháp kiến trúc để đưa ra quyết định tối ưu cho hệ thống sản xuất lớn"
      ],
      "intuition": {
        "title": "Bản đồ điều phối tác chiến hạ tầng và Từ điển thuật ngữ Enterprise",
        "overview": "Cấp độ 3 đưa bạn từ một người dùng Linux thông thường trở thành một kỹ sư quản trị hệ thống và hạ tầng thực thụ. Bài học tổng kết này cô đọng toàn bộ tinh hoa công nghệ thành cẩm nang hành động sẵn sàng cho mọi tình huống khẩn cấp.",
        "realWorld": "Trong ca trực On-call đêm giao thừa, một cảnh báo đỏ P1 kích hoạt do dịch vụ web chính bị tê liệt. Với cẩm nang tra cứu và sơ đồ xử lý nhanh của Cấp độ 3 trong tay, bạn có thể tự tin cô lập lỗi, khôi phục dịch vụ và báo cáo nguyên nhân cho ban giám đốc một cách khoa học.",
        "metaphor": "Nếu Cấp độ 1 và 2 là việc học cách lái và bảo trì một chiếc ô tô, thì Cấp độ 3 là việc điều hành cả một đoàn tàu vận tải công nghiệp xuyên quốc gia. Cheat Sheet & Glossary này là cuốn sổ tay quy trình vận hành tiêu chuẩn (SOP) giúp cả đoàn tàu luôn chạy an toàn đúng giờ.",
        "boundary": "Cấp độ 3 hoàn thiện năng lực quản trị hệ thống và vận hành dịch vụ; để thấu hiểu sâu sắc đến từng byte bộ nhớ ảo, cơ chế điều phối nhân và công nghệ Container nội tại, chúng ta sẽ bước lên đỉnh cao Cấp độ 4: Tầng sâu Nhân Linux & Container Internals.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>TRỌNG TÂM KỸ THUẬT</span><span class=\"lx-vs-tag\">Core Mechanics</span></div><p class=\"lx-vs-desc\">Cấp độ 3 đưa bạn từ một người dùng Linux thông thường trở thành một kỹ sư quản trị hệ thống và hạ tầng thực thụ. Bài học tổng kết này cô đọng toàn bộ tinh hoa công nghệ thành cẩm nang hành động sẵn sàng cho mọi tình huống khẩn cấp.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><strong>Dịch vụ</strong>:</strong> <code>systemctl edit</code></li><li><span class=\"lx-vs-bullet\">•</span> <strong><strong>Nhật ký</strong>:</strong> <code>journalctl -u -p</code></li><li><span class=\"lx-vs-bullet\">•</span> <strong><strong>Lưu trữ</strong>:</strong> <code>lvextend -r</code></li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>BỐI CẢNH VẬN HÀNH THỰC TẾ</span><span class=\"lx-vs-tag\">Production Case</span></div><p class=\"lx-vs-desc\">Trong ca trực On-call đêm giao thừa, một cảnh báo đỏ P1 kích hoạt do dịch vụ web chính bị tê liệt. Với cẩm nang tra cứu và sơ đồ xử lý nhanh của Cấp độ 3 trong tay, bạn có thể tự tin cô lập lỗi, khôi phục dịch vụ và báo cáo nguyên nhân cho ban giám đốc một cách khoa học.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Bảng Tra cứu Lệnh systemd, LVM, Mạng Netplan &amp; Tường lửa UFW</li><li><span class=\"lx-vs-bullet\">•</span> Bảng Tra cứu Nginx, SSL Let's Encrypt, SELinux &amp; Chẩn đoán Hiệu năng</li><li><span class=\"lx-vs-bullet\">•</span> Từ điển Thuật ngữ Quản trị Hệ thống &amp; An toàn Thông tin Cấp 3 (Glossary)</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Ma trận Lệnh Quản trị Nâng cao & Hạ tầng Sản xuất Cấp độ 3",
          "content": "<p>Bảng tổng hợp nhanh các lệnh cốt tử phân chia theo từng lĩnh vực chuyên môn hạ tầng:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr>\n            <th>Lĩnh vực</th>\n            <th>Lệnh cốt lõi</th>\n            <th>Mục đích sử dụng</th>\n            <th>Cú pháp thực chiến</th>\n            <th>Lưu ý an toàn</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><strong>Dịch vụ</strong></td>\n            <td><code>systemctl edit</code></td>\n            <td>Tạo Drop-in Override an toàn</td>\n            <td><code>sudo systemctl edit &lt;service&gt;</code></td>\n            <td>Không sửa file gốc trong <code>/lib/systemd/system/</code></td>\n          </tr>\n          <tr>\n            <td><strong>Nhật ký</strong></td>\n            <td><code>journalctl -u -p</code></td>\n            <td>Truy vấn log lỗi dịch vụ</td>\n            <td><code>journalctl -u nginx -p err --since today</code></td>\n            <td>Dùng cờ <code>--no-pager</code> khi xuất ra file</td>\n          </tr>\n          <tr>\n            <td><strong>Lưu trữ</strong></td>\n            <td><code>lvextend -r</code></td>\n            <td>Mở rộng LV và FS trực tuyến</td>\n            <td><code>sudo lvextend -r -L +10G /dev/vg/lv</code></td>\n            <td>Cờ <code>-r</code> tự động nhận diện ext4/xfs</td>\n          </tr>\n          <tr>\n            <td><strong>Mạng</strong></td>\n            <td><code>netplan try</code></td>\n            <td>Áp dụng mạng có cơ chế rollback</td>\n            <td><code>sudo netplan try</code></td>\n            <td>Tự động hoàn tác nếu mất kết nối SSH</td>\n          </tr>\n          <tr>\n            <td><strong>Tường lửa</strong></td>\n            <td><code>ufw default deny</code></td>\n            <td>Chính sách mặc định chặn toàn bộ</td>\n            <td><code>sudo ufw default deny incoming</code></td>\n            <td>Bắt buộc mở cổng SSH trước khi bật UFW</td>\n          </tr>\n          <tr>\n            <td><strong>Phòng thủ</strong></td>\n            <td><code>sshd -t</code></td>\n            <td>Kiểm tra cú pháp cấu hình SSH</td>\n            <td><code>sudo sshd -t</code></td>\n            <td>Không bao giờ reload khi sshd -t báo lỗi</td>\n          </tr>\n          <tr>\n            <td><strong>Đồng bộ</strong></td>\n            <td><code>rsync -avzP</code></td>\n            <td>Đồng bộ vi sai qua mạng</td>\n            <td><code>rsync -avzP --dry-run /src/ /dest/</code></td>\n            <td>Luôn dùng dry-run trước khi dùng <code>--delete</code></td>\n          </tr>\n          <tr>\n            <td><strong>Hiệu năng</strong></td>\n            <td><code>vmstat 1</code></td>\n            <td>Đo lường CPU, RAM, Disk I/O</td>\n            <td><code>vmstat 1 5</code></td>\n            <td>Chú ý cột <code>r</code>, <code>b</code>, <code>wa</code>, <code>si/so</code></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>",
          "codeExamples": [
            {
              "lang": "CLI",
              "title": "Kiểm tra trạng thái dịch vụ và log gần nhất bằng systemctl",
              "code": "systemctl status nginx --no-pager -l",
              "output": "● nginx.service - A high performance web server and a reverse proxy server\n     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)\n     Active: active (running) since Mon 2026-11-04 08:00:12 UTC; 2h 30min ago\n   Main PID: 1234 (nginx)\n      Tasks: 3 (limit: 4613)\n     Memory: 28.5M\n        CPU: 1.250s\n     CGroup: /system.slice/nginx.service\n             ├─1234 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;\n             └─1235 nginx: worker process",
              "explanation": "Cờ --no-pager và -l giúp hiển thị đầy đủ dòng log không bị cắt ngắn (truncated) và không bị khóa trong trình xem less."
            }
          ]
        },
        {
          "id": "sec-3-10-cheatsheet-systemd-lvm",
          "title": "4.1 Bảng Tra cứu Lệnh systemd, LVM, Mạng Netplan & Tường lửa UFW",
          "content": "\n        <h3 class=\"lx-h3\">Ma trận lệnh Quản trị Hạ tầng kèm Mức rủi ro &amp; Quy trình Hoàn tác</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Công cụ / Lệnh</th>\n              <th>Mục đích thực chiến</th>\n              <th>Mức rủi ro</th>\n              <th>Lưu ý an toàn &amp; Quy trình Hoàn tác (Rollback)</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>sudo systemctl daemon-reload</code></td>\n              <td>Tải lại định nghĩa unit files từ đĩa vào RAM</td>\n              <td>Thấp</td>\n              <td>Bắt buộc chạy sau mỗi lần sửa file <code>.service</code> hoặc <code>.timer</code>.</td>\n            </tr>\n            <tr>\n              <td><code>sudo systemctl edit &lt;unit&gt;</code></td>\n              <td>Tạo file drop-in override tùy biến dịch vụ</td>\n              <td>Thấp</td>\n              <td>An toàn tuyệt đối; để hoàn tác chỉ cần xóa thư mục trong <code>/etc/systemd/system/&lt;unit&gt;.d/</code>.</td>\n            </tr>\n            <tr>\n              <td><code>sudo lvextend -L +10G -r &lt;LV&gt;</code></td>\n              <td>Mở rộng nóng phân vùng Logical Volume và Filesystem</td>\n              <td>Trung bình</td>\n              <td>Cờ <code>-r</code> tự động mở rộng hệ thống file. <strong>Lưu ý: Nếu định dạng XFS thì không thể thu nhỏ ngược lại!</strong></td>\n            </tr>\n            <tr>\n              <td><code>sudo mount -a</code></td>\n              <td>Kiểm tra tính hợp lệ của toàn bộ tệp <code>/etc/fstab</code></td>\n              <td>An toàn</td>\n              <td><strong>BẮT BUỘC CHẠY sau khi sửa fstab trước khi reboot</strong> để phòng chống lỗi Emergency Mode.</td>\n            </tr>\n            <tr>\n              <td><code>sudo netplan try</code></td>\n              <td>Áp dụng cấu hình mạng có bộ đếm tự phục hồi 120s</td>\n              <td>Thấp</td>\n              <td>Nếu mất kết nối SSH, Netplan tự động hoàn tác cấu hình cũ sau 120 giây.</td>\n            </tr>\n            <tr>\n              <td><code>sudo ufw default deny incoming</code></td>\n              <td>Đặt chính sách mặc định chặn toàn bộ lưu lượng vào</td>\n              <td><strong>RẤT CAO</strong></td>\n              <td><strong>CẢNH BÁO: Phải mở cổng SSH trước (<code>ufw limit 22/tcp</code>)!</strong> Nên đặt hẹn giờ cứu sinh: <code>nohup sh -c 'sleep 300 &amp;&amp; ufw disable' &amp;</code>.</td>\n            </tr>\n            <tr>\n              <td><code>sudo ufw status numbered</code></td>\n              <td>Hiển thị danh sách quy tắc tường lửa có đánh số</td>\n              <td>An toàn</td>\n              <td>Dùng để tìm số thứ tự trước khi xóa quy tắc bằng <code>sudo ufw delete &lt;số&gt;</code>.</td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-3-10-cheatsheet-nginx-perf",
          "title": "4.2 Bảng Tra cứu Nginx, SSL Let's Encrypt, SELinux & Chẩn đoán Hiệu năng",
          "content": "\n        <h3 class=\"lx-h3\">Ma trận lệnh Web Proxy, An ninh &amp; Chẩn đoán Hiệu năng</h3>\n        <div class=\"table-responsive\"><table class=\"lesson-table\">\n          <thead>\n            <tr>\n              <th>Công cụ / Lệnh</th>\n              <th>Mục đích thực chiến</th>\n              <th>Mức rủi ro</th>\n              <th>Lưu ý an toàn &amp; Quy trình Hoàn tác</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>sudo nginx -t</code></td>\n              <td>Kiểm tra cú pháp toàn bộ cấu hình Nginx</td>\n              <td>An toàn</td>\n              <td>Bắt buộc chạy trước khi <code>systemctl reload nginx</code> để không làm sập các website đang chạy.</td>\n            </tr>\n            <tr>\n              <td><code>sudo certbot renew --dry-run</code></td>\n              <td>Mô phỏng quy trình tự động gia hạn chứng chỉ SSL</td>\n              <td>An toàn</td>\n              <td>Chạy thử nghiệm an toàn; không tác động vào chứng chỉ thực tế.</td>\n            </tr>\n            <tr>\n              <td><code>sudo setenforce 0 / 1</code></td>\n              <td>Chuyển đổi chế độ SELinux Permissive / Enforcing</td>\n              <td>Trung bình</td>\n              <td>Chỉ dùng Permissive (0) để gỡ lỗi trong RAM; sau khi sửa nhãn/boolean phải bật lại Enforcing (1) ngay.</td>\n            </tr>\n            <tr>\n              <td><code>sudo semanage fcontext ... &amp;&amp; restorecon</code></td>\n              <td>Đăng ký và áp đặt nhãn ngữ cảnh SELinux vĩnh viễn</td>\n              <td>Thấp</td>\n              <td>Chuẩn mực gán nhãn bền vững qua mọi lần reboot; không dùng <code>chcon</code>.</td>\n            </tr>\n            <tr>\n              <td><code>rsync -avzP -n --delete ...</code></td>\n              <td>Chạy thử nghiệm mô phỏng đồng bộ rsync có xóa file</td>\n              <td>An toàn</td>\n              <td>Cờ <code>-n</code> (dry-run) giúp kiểm tra danh sách <code>*deleting</code> trước khi bỏ cờ <code>-n</code> để chạy thật.</td>\n            </tr>\n            <tr>\n              <td><code>vmstat 1 5</code></td>\n              <td>Khảo sát chỉ số CPU queue (r), blocked (b), swap, iowait</td>\n              <td>An toàn</td>\n              <td>Công cụ chẩn đoán nhanh số 1; không gây suy hao tài nguyên hệ thống.</td>\n            </tr>\n            <tr>\n              <td><code>sudo iostat -xz 1 5</code></td>\n              <td>Khảo sát chi tiết hiệu năng và độ trễ ổ đĩa (%util, await)</td>\n              <td>An toàn</td>\n              <td>Ẩn các thiết bị nhàn rỗi (-z); xác định nhanh ổ đĩa bị thắt nút cổ chai I/O.</td>\n            </tr>\n            <tr>\n              <td><code>sudo timeout 5 strace -c -p &lt;PID&gt;</code></td>\n              <td>Thống kê tổng hợp thời gian tiêu tốn cho các syscall</td>\n              <td><strong>RỦI RO CAO</strong></td>\n              <td><strong>CẢNH BÁO: Làm chậm tiến trình 10x-100x!</strong> Chỉ gắn trong 5 giây bằng timeout và dùng cờ -c trên Production.</td>\n            </tr>\n          </tbody>\n        </table></div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-3-10-glossary",
          "title": "4.3 Từ điển Thuật ngữ Quản trị Hệ thống & An toàn Thông tin Cấp 3 (Glossary)",
          "content": "\n        <div class=\"lx-glossary-grid\">\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">MAC vs DAC</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\"><strong>Discretionary Access Control (DAC):</strong> Kiểm soát tùy ý dựa trên chủ sở hữu file và quyền rwx truyền thống. <strong>Mandatory Access Control (MAC):</strong> Kiểm soát bắt buộc do nhân kernel thực thi dựa trên nhãn an ninh (SELinux / AppArmor), vượt trên cả đặc quyền của tài khoản root.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">SELinux Context</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Nhãn an ninh 4 thành phần <code>user:role:type:level</code> gắn vào mọi tiến trình và Inode trên hệ thống. Trọng tâm là <strong>Type Enforcement (TE)</strong> quy định loại tiến trình nào được phép tương tác với loại dữ liệu nào.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">SELinux Booleans</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Các công tắc bật/tắt (on/off) các chính sách an ninh được biên dịch sẵn trong nhân, cho phép quản trị viên thay đổi hành vi (ví dụ: cho phép web server kết nối mạng <code>httpd_can_network_connect</code>) mà không cần viết lại policy.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">LVM (PV, VG, LV, PE)</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\"><strong>Physical Volume (PV):</strong> Ổ đĩa thô. <strong>Volume Group (VG):</strong> Hồ chứa tài nguyên chung. <strong>Logical Volume (LV):</strong> Phân vùng logic linh hoạt. <strong>Physical Extent (PE):</strong> Khối đơn vị cấp phát nhỏ nhất trong LVM (mặc định 4MB).</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">Online Resizing</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Khả năng mở rộng kích thước phân vùng logic và hệ thống file trực tiếp khi dịch vụ vẫn đang hoạt động bình thường mà không cần unmount ổ đĩa hay tắt máy chủ (Zero-Downtime).</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">Reverse Proxy</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Máy chủ trung gian đứng trước các backend application servers để tiếp nhận yêu cầu từ client, xử lý SSL/TLS, cân bằng tải, nén dữ liệu và chuyển tiếp yêu cầu nội bộ an toàn.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">Epoll</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Cơ chế thông báo sự kiện I/O bất đồng bộ có khả năng mở rộng cao trong Linux kernel ($O(1)$), cho phép Nginx xử lý đồng thời hàng chục ngàn kết nối mạng mà không bị nghẽn CPU như hàm <code>select</code> hay <code>poll</code> cũ.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">Idempotency (Tính Lũy thừa)</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Nguyên lý cốt lõi của Tự động hóa hạ tầng (Ansible): Dù một tác vụ được thực thi lặp lại bao nhiêu lần, trạng thái cuối cùng của hệ thống vẫn không thay đổi và chỉ thực hiện can thiệp khi hệ thống chưa đạt trạng thái mong muốn.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">Copy-on-Write (CoW)</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Chiến lược tối ưu hóa lưu trữ: Khối dữ liệu chỉ được sao chép thực sự khi có yêu cầu ghi sửa đổi. Đây là nền tảng của LVM Snapshot và các hệ thống file hiện đại như Btrfs và ZFS.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">Inode / File Descriptor Leak</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Hiện tượng tệp tin đã bị xóa bằng lệnh <code>rm</code> nhưng dung lượng đĩa cứng vẫn không được giải phóng do tiến trình ứng dụng vẫn đang giữ mở kết nối File Descriptor tới Inode đó (phát hiện bằng <code>lsof +L1</code>).</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">Trailing Slash</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Dấu gạch chéo cuối cùng trong đường dẫn rsync: <code>/src/</code> (có dấu /) nghĩa là chỉ sao chép nội dung bên trong; <code>/src</code> (không có dấu /) nghĩa là sao chép cả thư mục vỏ bọc.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">USE Method</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Phương pháp luận chẩn đoán hiệu năng hệ thống của Brendan Gregg: Kiểm tra lần lượt <strong>Utilization</strong> (Mức sử dụng), <strong>Saturation</strong> (Độ bão hòa/Hàng đợi), và <strong>Errors</strong> (Lỗi) cho mọi tài nguyên phần cứng.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">File Descriptor (FD)</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Một số nguyên không âm do kernel cấp phát để đại diện cho một tệp tin, socket mạng hoặc đường ống I/O đang được mở bởi một tiến trình (quản lý trần bằng <code>LimitNOFILE</code>).</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">ACME Protocol</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Giao thức Quản lý Môi trường Chứng chỉ Tự động (Automated Certificate Management Environment), cho phép Certbot giao tiếp với Let's Encrypt để xin cấp và gia hạn SSL tự động.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">AVC Denials</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Nhật ký từ chối kiểm soát truy cập (Access Vector Cache) do kernel ghi nhận khi SELinux chặn một hành vi vi phạm chính sách, lưu trữ tại <code>/var/log/audit/audit.log</code> và giải mã bằng <code>audit2why</code>.</p>\n          </div>\n          <div class=\"lx-glossary-card\">\n            <div class=\"lx-glossary-header\"><span class=\"lx-glossary-term\">Auditd AUID (Audit UID)</span><span class=\"lx-glossary-cat\">SysAdmin</span></div><p class=\"lx-glossary-def\">Định danh người dùng đăng nhập ban đầu được kernel lưu giữ bất biến suốt phiên làm việc. Dù người dùng có dùng <code>sudo su</code> để đổi sang root thì AUID vẫn phản ánh tài khoản cá nhân ban đầu.</p>\n          </div>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <h4>Demo 1: Quy trình 3 bước xử lý sự cố khẩn cấp của kỹ sư SRE</h4>\n      <p>Kỹ năng ứng phó sự cố sản xuất có phương pháp:</p>\n      <pre><code># Bước 1: Xác định phạm vi ảnh hưởng (Khảo sát dịch vụ & log)\nsudo systemctl status nginx\njournalctl -u nginx -n 20 --no-pager\n\n# Bước 2: Đo lường tài nguyên hệ thống theo phương pháp USE\nvmstat 1 3\ndf -h\ndf -i\n\n# Bước 3: Can thiệp an toàn có kiểm soát cú pháp\nsudo nginx -t && sudo systemctl reload nginx</code></pre>\n\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Sai: Can thiệp hoảng loạn thiếu kiểm chứng</div>\n          <pre><code># Rất nguy hiểm:\nsudo killall -9 nginx\nsudo rm -rf /etc/nginx/sites-enabled/*\nsudo reboot</code></pre>\n          <p class=\"lx-diff-desc\">Làm hỏng dữ liệu, mất cấu hình và kéo dài thời gian ngừng hoạt động (Downtime) của doanh nghiệp.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Đúng: Tác chiến bài bản theo quy trình SOP</div>\n          <pre><code># Sao lưu cấu hình trước khi sửa:\nsudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak\n# Kiểm thử cú pháp:\nsudo nginx -t\n# Nạp lại nhẹ nhàng:\nsudo systemctl reload nginx</code></pre>\n          <p class=\"lx-diff-desc\">Bảo đảm tính sẵn sàng cao, không gây gián đoạn các kết nối đang xử lý của người dùng.</p>\n        </div>\n      </div>\n    </div>",
          "codeExamples": [
            {
              "lang": "CLI",
              "title": "Tra cứu chứng chỉ SSL và ngày hết hạn bằng OpenSSL",
              "code": "echo | openssl s_client -servername example.com -connect example.com:443 2>/dev/null | openssl x509 -noout -dates",
              "output": "notBefore=Oct 15 00:00:00 2026 GMT\nnotAfter=Jan 13 23:59:59 2027 GMT",
              "explanation": "Đường ống kết nối trực tiếp cổng 443 và trích xuất chính xác ngày bắt đầu (notBefore) cùng ngày hết hạn (notAfter) của chứng chỉ SSL từ xa."
            }
          ]
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Thử thách Vận hành Toàn diện Cấp độ 3",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 3.10</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Vận dụng toàn bộ kiến thức Cấp độ 3 để thực hiện một chuỗi thao tác quản trị hoàn chỉnh: viết service unit, kiểm tra log qua journalctl, thiết lập tường lửa UFW và đo lường hiệu năng bằng vmstat.</p>\n\n      <h4>Môi trường & Dữ liệu chuẩn bị</h4>\n      <ul>\n        <li>Máy tính Linux với quyền sudo.</li>\n        <li>Tạo thư mục: <code>mkdir -p ~/capstone-lab && cd ~/capstone-lab</code>.</li>\n      </ul>\n\n      <h4>Các bước thực hiện</h4>\n      <ol>\n        <li>Tạo một script tác vụ định kỳ <code>~/capstone-lab/task.sh</code>:\n          <pre><code>cat &lt;&lt; 'EOF' > ~/capstone-lab/task.sh\n#!/bin/bash\necho \"$(date) - Capstone Task Completed\" >> ~/capstone-lab/task.log\nEOF\nchmod +x ~/capstone-lab/task.sh</code></pre>\n        </li>\n        <li>Chạy thử và đo lường tài nguyên hệ thống:\n          <pre><code>bash ~/capstone-lab/task.sh\nvmstat 1 3</code></pre>\n        </li>\n        <li>Kiểm tra trạng thái các cổng mạng bằng <code>ss</code> và tường lửa bằng <code>ufw</code>:\n          <pre><code>ss -tulpn\nsudo ufw status</code></pre>\n        </li>\n      </ol>\n\n      <h4>Kết quả mong đợi & Cách kiểm tra</h4>\n      <p>Các lệnh thực thi chuẩn xác, log được ghi nhận đầy đủ và học viên giải thích được ý nghĩa từng chỉ số hiển thị.</p>\n\n      <h4>Bài tập mở rộng</h4>\n      <p>Thiết lập một Timer Unit tự động gọi script trên mỗi 15 phút và kiểm tra bằng <code>systemctl list-timers</code>.</p>\n\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Trong mọi tình huống bảo trì sản xuất, luôn tuân thủ nguyên tắc: Tạo bản sao lưu trước khi sửa, kiểm thử cú pháp trước khi nạp lại, và reload thay vì restart bất cứ khi nào có thể!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống / Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Dùng systemctl restart thay vì systemctl reload trên dịch vụ có kết nối dài</strong></td><td>Lệnh restart sẽ ngắt cưỡng bức toàn bộ các kết nối TCP đang diễn ra của người dùng (ví dụ tải file, WebSocket, thanh toán), trong khi reload nạp lại cấu hình mượt mà không rớt kết nối.</td><td>Luôn ưu tiên dùng <code>systemctl reload &lt;service&gt;</code> cho Nginx, Apache, sshd.</td></tr>\n          <tr><td><strong>Cấu hình /etc/fstab sai làm máy chủ từ xa bị treo ở màn hình cứu hộ</strong></td><td>Máy chủ không thể boot vào OS bình thường sau khi reboot.</td><td>Luôn luôn thêm cờ <code>nofail</code> cho các phân vùng phụ và chạy <code>sudo mount -a</code> để kiểm tra trước khi reboot.</td></tr>\n          <tr><td><strong>Tắt SELinux/AppArmor để gỡ lỗi rồi quên bật lại</strong></td><td>Máy chủ bị phơi bày toàn bộ lỗ hổng dịch vụ ra môi trường Internet.</td><td>Chỉ dùng chế độ Permissive tạm thời bằng <code>setenforce 0</code> và bật lại <code>setenforce 1</code> ngay sau khi xác định xong nguyên nhân.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Nguyên tắc Phòng thủ theo Chiều sâu (Defense in Depth):</strong> Không bao giờ dựa dẫm vào một lớp bảo vệ duy nhất. Kết hợp đồng thời Tường lửa (UFW) + Kiểm soát Bắt buộc (SELinux/AppArmor) + Phản ứng Tự động (Fail2ban) + Kiểm toán (Auditd).</li>\n        <li><strong>Nguyên tắc Không tin tưởng Mặc định (Zero Trust & Least Privilege):</strong> Mọi tiến trình dịch vụ chỉ được cấp đúng các quyền tối thiểu để hoàn thành nhiệm vụ, chạy dưới tài khoản non-root chuyên biệt và bị cô lập bằng sandbox.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Linux Professional Institute LPIC-2 Exam Objectives:</strong> <a href=\"https://www.lpi.org/our-certifications/lpic-2-overview/\" target=\"_blank\" rel=\"noopener\">LPIC-2 201 & 202 Exam Objectives</a>.</li>\n      <li><strong>Red Hat Certified Engineer (RHCE) Exam:</strong> <a href=\"https://www.redhat.com/en/services/certification/rhce\" target=\"_blank\" rel=\"noopener\">RHCE Enterprise Automation Guide</a>.</li>\n      <li><strong>The Practice of Cloud System Administration:</strong> Tài liệu vận hành hạ tầng đám mây hiện đại.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Danh sách Kiểm tra Vận hành Khẩn cấp (Emergency SOP Checklist)",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Bước</th><th>Hành động</th><th>Lệnh thực hiện</th><th>Mục đích</th></tr></thead>\n        <tbody>\n          <tr><td>1</td><td>Kiểm tra đĩa cứng</td><td><code>df -h && df -i</code></td><td>Xác nhận đĩa không bị tràn 100% Blocks hay Inodes</td></tr>\n          <tr><td>2</td><td>Kiểm tra tải hệ thống</td><td><code>uptime && vmstat 1 3</code></td><td>Xác định nghẽn CPU, RAM hay Đĩa I/O</td></tr>\n          <tr><td>3</td><td>Kiểm tra dịch vụ chết</td><td><code>systemctl --failed</code></td><td>Liệt kê nhanh các service đang bị crash</td></tr>\n          <tr><td>4</td><td>Kiểm tra cổng lắng nghe</td><td><code>ss -tulpn</code></td><td>Xác nhận dịch vụ có đang lắng nghe đúng cổng/IP</td></tr>\n          <tr><td>5</td><td>Đọc nhật ký lỗi</td><td><code>journalctl -p err -b 0 -n 50</code></td><td>Tìm nguyên nhân gốc rễ trong log kernel/app</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Kiểm tra và chuẩn hóa máy chủ Linux trước thềm bàn giao Go-Live Production",
        "content": "\n      <p><strong>1. Bối cảnh & Yêu cầu:</strong> Bạn là Kỹ sư Trưởng hệ thống (Lead SysAdmin). Đội ngũ phát triển vừa hoàn thành cài đặt một máy chủ Cloud chạy dịch vụ lõi và yêu cầu bàn giao để Go-Live phục vụ khách hàng. Nhiệm vụ của bạn là thực hiện quy trình kiểm định độc lập theo Checklist 5 bước chuẩn quốc tế.</p>\n      \n      <p><strong>2. Quy trình Kiểm định Độc lập:</strong></p>\n      <pre><code># Kiểm tra 1: systemd Service & Timer Unit\n$ sudo systemd-analyze verify /etc/systemd/system/*.service\n$ systemctl list-timers --all\n\n# Kiểm tra 2: Hệ thống file và cấu hình tự động mount\n$ sudo mount -a\n$ grep -E \"defaults.*nofail\" /etc/fstab\n\n# Kiểm tra 3: Tường lửa và trạng thái mở cổng mạng\n$ sudo ufw status numbered\n$ ss -tulpn\n\n# Kiểm tra 4: Gia cố an ninh SSH Daemon\n$ sudo sshd -t\n$ grep -E \"^PasswordAuthentication no|^PermitRootLogin no\" /etc/ssh/sshd_config.d/*.conf\n\n# Kiểm tra 5: Cấu hình Web Proxy và SSL Auto-renewal\n$ sudo nginx -t\n$ sudo certbot renew --dry-run</code></pre>\n      \n      <p><strong>3. Phát hiện lỗi nghiêm trọng:</strong></p>\n      <ul>\n        <li>Trong <code>/etc/fstab</code>: Ổ đĩa phụ <code>/data</code> được gắn bằng tên thiết bị <code>/dev/sdb1</code> thay vì UUID và thiếu cờ <code>nofail</code>. Nếu nhà cung cấp Cloud đổi thứ tự đĩa, máy chủ sẽ bị kẹt tại Emergency Mode.</li>\n        <li>Tường lửa UFW chưa cấu hình giới hạn tốc độ (<code>ufw limit</code>) cho cổng SSH, khiến log ngập tràn các đợt rà quét brute-force.</li>\n        <li>Tệp cấu hình Nginx chưa khai báo chỉ thị <code>client_max_body_size</code>, khiến khách hàng tải file ảnh đại diện trên 1MB sẽ bị lỗi 413 Request Entity Too Large.</li>\n      </ul>\n      \n      <p><strong>4. Biện pháp chuẩn hóa dứt điểm:</strong></p>\n      <pre><code># Sửa fstab sang UUID và thêm cờ nofail:\n$ UUID_VAL=$(sudo blkid -s UUID -o value /dev/sdb1)\n# Sửa dòng cấu hình thành: UUID=$UUID_VAL /data ext4 defaults,nofail 0 2\n$ sudo mount -a\n\n# Bổ sung ufw limit:\n$ sudo ufw limit 22/tcp\n\n# Bổ sung client_max_body_size 25M vào Nginx:\n$ sudo nginx -t && sudo systemctl reload nginx</code></pre>\n      \n      <p><strong>5. Kết quả nghiệm thu:</strong> Máy chủ vượt qua 100% các tiêu chí an ninh, đạt chuẩn kiểm định quốc tế CIS Benchmark và sẵn sàng chịu tải hàng triệu lượt truy cập ổn định.</p>\n    "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Bảo trì Production mà không chuẩn bị sẵn Kế hoạch Hoàn tác (Rollback Plan)",
            "content": "Nguyên tắc chuyên nghiệp số 1 của kỹ sư vận hành: Không có bất kỳ thay đổi nào là an toàn 100%. Trước khi chỉnh sửa bất kỳ dịch vụ nào (fstab, sshd, nginx, iptables), bạn phải luôn tự hỏi: 'Nếu lệnh này làm sập hệ thống, mình sẽ khôi phục lại trạng thái cũ bằng lệnh gì và mất bao nhiêu giây?'. Luôn sao lưu file cấu hình gốc có gắn dấu thời gian (ví dụ: <code>cp nginx.conf nginx.conf.bak.$(date +%F)</code>) trước khi gõ lệnh sửa."
          },
          {
            "title": "Bỏ qua bước kiểm tra cú pháp (dry-run) trước khi nạp lại các daemon hệ thống",
            "content": "Nhiều sự cố sập hệ thống nghiêm trọng xảy ra chỉ vì một lỗi chính tả nhỏ (thiếu dấu chấm phẩy, thừa một dấu cách trong YAML). Hãy biến việc chạy các lệnh kiểm tra cú pháp thành phản xạ vô điều kiện: <code>nginx -t</code> cho Nginx, <code>sshd -t</code> cho SSH, <code>mount -a</code> cho fstab, <code>netplan try</code> cho mạng, và <code>systemd-analyze verify</code> cho systemd."
          }
        ],
        "tips": [
          {
            "title": "Tạo các Alias kiểm tra cú pháp nhanh trong ~/.bashrc",
            "content": "Hãy thêm vào tệp <code>~/.bashrc</code> của bạn các alias tiện ích: <code>alias ngtest='sudo nginx -t && sudo systemctl reload nginx'</code> và <code>alias sshtest='sudo sshd -t && sudo systemctl reload ssh'</code>. Điều này giúp bạn vừa tiết kiệm thời gian gõ phím vừa đảm bảo quy trình kiểm tra cú pháp luôn được tự động thực thi trước khi tải lại dịch vụ."
          },
          {
            "title": "Ghi nhật ký thay đổi cấu hình hệ thống kèm mã Ticket",
            "content": "Trong môi trường doanh nghiệp, hãy duy trì thói quen tạo một dòng chú thích ở đầu mỗi tệp cấu hình bạn chỉnh sửa: <code># Modified by [Your Name] on [Date] - Ticket: SEC-1042 - Hardening SSH</code>. Điều này giúp đồng đội và các kỹ sư trực ca sau dễ dàng đối soát lịch sử thay đổi khi điều tra sự cố."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Bộ 4 lệnh vàng kiểm tra sức khỏe hệ thống cấp tốc",
          "problem": "Hãy liệt kê 4 câu lệnh kiểm tra sức khỏe hệ thống cấp 3 mà một kỹ sư SRE luôn gõ đầu tiên khi nhận được thông báo sự cố máy chủ chậm.",
          "hint": "uptime (xem load), free -h (xem RAM/Swap), df -h (xem đĩa) và vmstat 1 3 (xem luồng CPU/I/O).",
          "solutionCode": "uptime\nfree -h\ndf -h\nvmstat 1 3",
          "solutionOutput": " 10:30:15 up 45 days,  2:10,  2 users,  load average: 0.15, 0.22, 0.18\n              total        used        free      shared  buff/cache   available\nMem:           15Gi       4.2Gi       8.1Gi       210Mi       3.2Gi        11Gi\nSwap:         2.0Gi          0B       2.0Gi\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        98G   32G   62G  35% /\nprocs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n 0  0      0 8490000 120400 3350000    0    0     1    10   50  120  2  1 97  0  0",
          "explanation": "Bộ 4 lệnh vàng này cung cấp bức tranh toàn cảnh 360 độ trong vòng 5 giây: uptime đánh giá độ tải, free -h phát hiện cạn RAM hoặc tràn swap, df -h kiểm tra đĩa đầy 100%, và vmstat phát hiện nghẽn I/O wait.",
          "annotations": [
            {
              "part": "uptime + free + df + vmstat",
              "text": "Quy trình kiểm tra sơ bộ phản xạ tự nhiên của mọi kỹ sư vận hành hệ thống."
            }
          ],
          "rubric": [
            {
              "criterion": "Bộ lệnh chẩn đoán",
              "pass": "Nêu đủ 4 lệnh cơ bản",
              "excellent": "Giải thích được thông số then chốt cần quan sát ở từng lệnh",
              "weight": "50%"
            },
            {
              "criterion": "Phản xạ xử lý sự cố",
              "pass": "Biết cách đọc đầu ra",
              "excellent": "Xác định được nguyên nhân gốc trong vòng dưới 1 phút",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Quy trình chuẩn mở rộng phân vùng đĩa LVM trực tuyến",
          "problem": "Phân vùng root (/) trên hệ thống sử dụng LVM đang cạn dung lượng. Viết chuỗi lệnh an toàn để nới rộng Logical Volume root thêm 10GB từ Volume Group ubuntu-vg.",
          "hint": "Sử dụng lvextend -L +10G -r /dev/ubuntu-vg/ubuntu-lv.",
          "solutionCode": "# 1. Kiểm tra VG còn dung lượng trống không:\nsudo vgs ubuntu-vg\n\n# 2. Mở rộng Logical Volume và tự động mở rộng Filesystem:\nsudo lvextend -L +10G -r /dev/ubuntu-vg/ubuntu-lv\n\n# 3. Xác nhận lại dung lượng mới:\ndf -h /",
          "solutionOutput": "Logical volume ubuntu-vg/ubuntu-lv successfully resized\nFilesystem at /dev/mapper/ubuntu--vg-ubuntu--lv is mounted on /; on-line resizing required\nFilesystem size successfully increased to 45GB",
          "explanation": "Thao tác mở rộng LVM với cờ -r diễn ra trực tuyến (online), hoàn toàn không làm gián đoạn các dịch vụ đang chạy trên máy chủ sản xuất.",
          "annotations": [
            {
              "part": "lvextend -L +10G -r",
              "text": "Cờ -r xử lý đồng bộ cả block device lẫn filesystem trong một bước nguyên tử."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp lvextend",
              "pass": "Dùng đúng lvextend và cờ -r",
              "excellent": "Kiểm tra vgs trước và df -h sau khi thực hiện",
              "weight": "50%"
            },
            {
              "criterion": "Thực tiễn vận hành",
              "pass": "Không unmount hệ thống",
              "excellent": "Đảm bảo thời gian uptime 100% cho dịch vụ",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Quy trình ứng phó và ngăn chặn tấn công dò quét cổng mạng",
          "problem": "Một kẻ tấn công đang gửi hàng triệu gói tin SYN flood vào cổng 80 của máy chủ. Viết lệnh kiểm tra số lượng kết nối đang dồn ứ và lệnh chặn khẩn cấp IP thủ phạm bằng iptables/ufw.",
          "hint": "Dùng ss -s hoặc ss -tan | grep SYN-RECV để phát hiện, và ufw insert 1 deny from <IP>.",
          "solutionCode": "# 1. Khảo sát số lượng socket đang ở trạng thái SYN_RECV:\nss -tan state syn-recv | wc -l\n\n# 2. Tìm IP nguồn gửi nhiều kết nối SYN nhất:\nss -tan state syn-recv | awk '{print $4}' | cut -d: -f1 | sort | uniq -c | sort -nr | head -n 5\n\n# 3. Chèn quy tắc chặn khẩn cấp lên đầu bảng tường lửa (vị trí số 1):\nsudo ufw insert 1 deny from 203.0.113.195 to any comment \"Block DoS Attacker\"",
          "solutionOutput": "Rule inserted\n# Ngay lập tức toàn bộ gói tin từ 203.0.113.195 bị nhân Linux loại bỏ tại tầng mạng",
          "explanation": "Lệnh ufw insert 1 đặt quy tắc chặn lên đầu danh sách để gói tin bị drop ngay lập tức trước khi được xử lý bởi các quy tắc allow bên dưới, cứu máy chủ khỏi cạn kiệt tài nguyên TCP connection table.",
          "annotations": [
            {
              "part": "ufw insert 1 deny",
              "text": "Vị trí số 1 đảm bảo độ ưu tiên cao nhất, vượt qua mọi quy tắc cho phép phía sau."
            }
          ],
          "rubric": [
            {
              "criterion": "Chẩn đoán tấn công",
              "pass": "Dùng đúng ss lọc trạng thái syn-recv",
              "excellent": "Trích xuất chính xác IP thủ phạm bằng pipeline awk | sort | uniq",
              "weight": "50%"
            },
            {
              "criterion": "Biện pháp ngăn chặn",
              "pass": "Chặn IP thành công",
              "excellent": "Sử dụng ufw insert 1 ưu tiên hàng đầu ngăn nghẽn CPU",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Cấp độ 3 hoàn thiện bộ kỹ năng quản trị hạ tầng nâng cao: Quản trị dịch vụ chuyên sâu với systemd (Service, Timer, Sandbox, Drop-in Override).",
        "Quản lý log tập trung với journald bền vững và tối ưu xoay vòng log với logrotate.",
        "Lưu trữ linh hoạt không downtime với LVM (PV, VG, LV), phân vùng tự động fstab chuẩn UUID và công nghệ mảng đĩa RAID.",
        "Mạng hiện đại với Netplan YAML và thiết lập pháo đài tường lửa UFW/nftables theo chuẩn Default Deny.",
        "Gia cố bảo mật toàn diện: sshd CIS Benchmark, phản ứng tự động Fail2ban, kiểm soát bắt buộc SELinux/AppArmor, đồng bộ rsync, proxy Nginx SSL và chẩn đoán hiệu năng USE Method."
      ],
      "generalInfo": {
        "duration": "45 phút",
        "targetAudience": "Tất cả học viên Cấp độ 3, Kỹ sư chuẩn bị thi LPIC-2, LFCS, Red Hat RHCSA/RHCE",
        "prerequisites": "Đã hoàn thành các bài học từ 3.1 đến 3.9",
        "environment": "Bất kỳ môi trường Linux nào (Terminal, Server, VM)",
        "materials": "Bảng tra cứu nhanh Cheat Sheet Cấp 3 và Từ điển thuật ngữ Hạ tầng"
      },
      "nextLessonPreview": "Xin nhiệt liệt chúc mừng! Bạn đã hoàn thành xuất sắc toàn bộ Cấp độ 3. Chuẩn bị tinh thần bước vào Cấp độ 4: Tầng sâu Nhân Linux & Container Internals - nơi chúng ta sẽ khám phá Syscalls, CFS Scheduler, Virtual Memory, VFS, Namespaces và Cgroups v2!",
      "quiz": [
        {
          "question": "Quy tắc vàng nào sau đây giúp kỹ sư quản trị hệ thống không bao giờ làm gián đoạn các kết nối đang xử lý của người dùng khi cập nhật cấu hình Nginx?",
          "options": [
            "Chạy lệnh sudo nginx -t trước, sau đó dùng sudo systemctl reload nginx thay vì restart",
            "Khởi động lại máy chủ ngay lập tức",
            "Chạy lệnh kill -9 vào tiến trình Nginx",
            "Xóa tệp access.log"
          ],
          "explanation": "reload cho phép Nginx khởi động các worker process mới với cấu hình mới trong khi để các worker cũ hoàn tất nốt các kết nối hiện tại rồi mới tắt một cách nhẹ nhàng (graceful).",
          "correctIndex": 0
        },
        {
          "question": "Trong quy trình kiểm tra sức khỏe hệ thống theo phương pháp USE, khi thấy cột 'wa' trong vmstat cao bất thường (>30%), kết luận nào sau đây là chính xác nhất?",
          "options": [
            "Hệ thống đang bị tấn công DDoS mạng",
            "Hệ thống đang bị nghẽn cổ chai ở tầng lưu trữ I/O đĩa cứng; CPU phải chờ đợi phần cứng đĩa hoàn tất thao tác đọc/ghi",
            "CPU bị quá tải do thuật toán tính toán nặng",
            "Bộ nhớ RAM bị lỗi phần cứng"
          ],
          "explanation": "wa (iowait) phản ánh phần trăm thời gian CPU nhàn rỗi nhưng không thể xử lý tiếp tác vụ vì phải đợi hệ thống lưu trữ đĩa hoàn thành thao tác đọc/ghi.",
          "correctIndex": 1
        },
        {
          "question": "Khi hệ thống gặp sự cố Kernel Panic hoặc CPU bị treo cứng (hang) không thể gõ lệnh trên terminal, cơ chế khẩn cấp nào của nhân Linux cho phép đồng bộ dữ liệu đĩa và khởi động lại an toàn qua bàn phím?",
          "options": [
            "Magic SysRq Key (tổ hợp lệnh Alt + SysRq + R-E-I-S-U-B)",
            "Bấm giữ nút nguồn 10 giây",
            "Rút dây nguồn máy chủ",
            "Gõ Ctrl + Alt + Delete 10 lần"
          ],
          "correctIndex": 0,
          "explanation": "Magic SysRq là cơ chế phần cứng/kernel cực kỳ mạnh mẽ. Chuỗi thần thánh R-E-I-S-U-B lần lượt: lấy lại bàn phím (unRaw), gửi SIGTERM (tErminate), gửi SIGKILL (kIll), đồng bộ đĩa (Sync), gắn lại read-only (Unmount), và khởi động lại an toàn (reBoot)."
        }
      ],
      "reflectionQuestion": "Một ứng viên phỏng vấn vị trí Principal SRE được đặt câu hỏi: 'Hãy thiết kế một quy trình bảo trì (Maintenance Workflow) chuẩn để nâng cấp phiên bản cho một cụm máy chủ web Nginx + ứng dụng Python chạy trên máy ảo Linux sản xuất sao cho đảm bảo Zero-Downtime, không bị mất log, và có thể hoàn tác (Rollback) ngay lập tức nếu gặp sự cố nghiêm trọng'. Hãy trình bày câu trả lời của bạn.",
      "reflectionHint": "Gợi ý: Trình bày quy trình 5 giai đoạn: 1. Giai đoạn Chuẩn bị & Bản sao: Tạo LVM Snapshot phân vùng đĩa trước khi nâng cấp; sao lưu file cấu hình Nginx và service unit. 2. Giai đoạn Triển khai Song song (Blue/Green hoặc Canary): Khởi chạy phiên bản ứng dụng mới trên một cổng nội bộ khác (ví dụ 8001), chạy kiểm thử cục bộ bằng `curl http://127.0.0.1:8001/health`. 3. Giai đoạn Chuyển đổi Lưu lượng: Cập nhật `proxy_pass` trong Nginx trỏ sang cổng mới, chạy `sudo nginx -t` kiểm tra cú pháp, sau đó thực hiện `sudo systemctl reload nginx` để chuyển tiếp luồng truy cập mượt mà không rớt kết nối. 4. Giai đoạn Giám sát: Bám sát log thời gian thực bằng `journalctl -u app -f` và `vmstat 1` để theo dõi độ trễ và tỷ lệ lỗi HTTP 5xx. 5. Kịch bản Hoàn tác (Rollback Plan): Nếu tỷ lệ lỗi tăng vọt, chỉ cần đổi lại proxy_pass về cổng cũ và reload Nginx trong 2 giây; nếu hệ thống bị hỏng sâu ở tầng OS/thư viện, kích hoạt hoàn tác tức thì bằng `sudo lvconvert --merge` từ LVM Snapshot đã tạo ở bước 1."
    }
  ]
};
