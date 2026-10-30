/**
 * Dữ liệu Giáo trình Linux Thực chiến & Nội bộ HĐH: CẤP 1 – CƠ BẢN
 * Thiết kế cho lập trình viên Python & kỹ sư phần mềm
 */

window.LX_LEVEL1_DATA = {
  "id": "part-lx-1",
  "number": "Cấp 1",
  "title": "Nền tảng Dòng lệnh & Sinh tồn trên Linux",
  "level": "Cơ bản",
  "badge": "Cơ bản",
  "description": "Hiểu rõ bản chất Kernel vs Distro, làm chủ cây thư mục FHS, thao tác file an toàn, quyền truy cập rwx, sudo, quản lý gói 3 họ distro (Debian/RHEL/Arch), đường ống pipe, biến môi trường PATH, nén dữ liệu và dự án thực hành chuẩn bị server Python.",
  "lessons": [
    {
      "id": "lx-1-01",
      "number": "1.1",
      "title": "Linux là gì? Phân biệt rạch ròi Kernel vs Distro & Thiết lập Môi trường Thực hành An toàn",
      "subtitle": "Xóa bỏ hiểu lầm \"Linux là một hệ điều hành đơn lẻ\" và lựa chọn đúng môi trường thực hành bảo vệ máy thật",
      "level": "Cơ bản",
      "duration": "30 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Phân biệt chính xác giữa Nhân Linux (Kernel) và Bản phân phối (Distro).",
        "Nắm vững 3 họ Distro lớn nhất hiện nay: Debian/Ubuntu, RHEL/Rocky/Fedora và Arch Linux.",
        "Hiểu ưu nhược điểm của 3 môi trường thực hành: Máy ảo (VM), WSL2 trên Windows và Container Docker.",
        "Biết rõ các giới hạn của WSL2 và Container để không bị bỡ ngỡ khi bước lên cấp quản trị hệ thống."
      ],
      "intuition": {
        "title": "Khung gầm động cơ xe hơi và Các hãng xe hoàn chỉnh",
        "metaphor": "Hãy tưởng tượng \"Linux Kernel\" giống như một khối động cơ ô tô siêu mạnh mẽ do kỹ sư Linus Torvalds chế tạo. Bản thân khối động cơ này tự nó không thể lăn bánh chở người được. Để có một chiếc xe hoàn chỉnh chạy trên đường, các hãng xe (tương ứng với các Distro) sẽ lấy khối động cơ đó về, lắp thêm khung vỏ, vô lăng, ghế ngồi, phanh điện tử, điều hòa và hệ thống quản lý nhiên liệu (trình quản lý gói apt, dnf, systemd). Canonical tạo ra chiếc xe gia đình tiện nghi Ubuntu; Red Hat tạo ra dòng xe tải vận tải thương mại bọc thép RHEL; còn Arch Linux giống như một bộ linh kiện rời để bạn tự tay siết từng con ốc thành chiếc xe đua của riêng mình.",
        "visualHtml": "\n          <div class=\"lx-vs-grid\">\n            <div class=\"lx-vs-card kernel-card\">\n              <div class=\"lx-vs-title\">\n                <span>⚙️</span>\n                <span>LINUX KERNEL</span>\n                <span class=\"lx-vs-tag\">Core Engine</span>\n              </div>\n              <p class=\"lx-vs-desc\">Động cơ điều phối tài nguyên máy tính do Linus Torvalds viết từ năm 1991.</p>\n              <ul class=\"lx-vs-list\">\n                <li><span class=\"lx-vs-bullet\">•</span> Quản lý cấp phát RAM, lập lịch CPU, giao tiếp ổ đĩa và card mạng.</li>\n                <li><span class=\"lx-vs-bullet\">•</span> Cung cấp lớp Lời gọi hệ thống (Syscalls) cho các phần mềm như Python, Nginx gọi xuống phần cứng.</li>\n                <li><span class=\"lx-vs-bullet\">•</span> Phát hành chính thức tại kernel.org dưới dạng mã nguồn mở C và Assembly.</li>\n              </ul>\n            </div>\n            <div class=\"lx-vs-card distro-card\">\n              <div class=\"lx-vs-title\">\n                <span>📦</span>\n                <span>LINUX DISTRO</span>\n                <span class=\"lx-vs-tag\">Complete OS</span>\n              </div>\n              <p class=\"lx-vs-desc\">Hệ điều hành hoàn chỉnh gồm Kernel + Thư viện GNU C + Trình quản lý gói + Dịch vụ nền.</p>\n              <ul class=\"lx-vs-list\">\n                <li><span class=\"lx-vs-bullet\">•</span> <strong>Debian / Ubuntu:</strong> Kho gói <code>.deb</code>, lệnh <code>apt</code>, phổ biến nhất trên Cloud VPS.</li>\n                <li><span class=\"lx-vs-bullet\">•</span> <strong>RHEL / Rocky / Fedora:</strong> Kho gói <code>.rpm</code>, lệnh <code>dnf</code>, chuẩn mực doanh nghiệp tài chính.</li>\n                <li><span class=\"lx-vs-bullet\">•</span> <strong>Arch Linux:</strong> Kho gói <code>pacman</code>, rolling release cập nhật mới nhất từng ngày.</li>\n              </ul>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Kiểm tra thông tin Kernel và Distro trên hệ thống đang chạy",
          "content": "\n            <p>Khi đăng nhập vào một máy chủ Linux bất kỳ, thao tác đầu tiên của một kỹ sư là xác định: <em>Hệ thống này đang chạy nhân phiên bản nào, kiến trúc CPU gì và thuộc bản phân phối nào?</em></p>\n            <p>Lệnh <code>uname</code> (viết tắt của <em>unix name</em>) dùng để in thông tin nhân hệ điều hành. Trong khi đó, tệp <code>/etc/os-release</code> là tiêu chuẩn của systemd chứa tên và phiên bản của distro.</p>\n          ",
          "codeExamples": [
            {
              "title": "Xem thông tin phiên bản Kernel và kiến trúc máy tính",
              "lang": "Bash",
              "code": "# Xem toàn bộ thông tin nhân Linux đang chạy\nuname -a\n\n# Chỉ xem phiên bản nhân (Release)\nuname -r\n\n# Xem kiến trúc phần cứng (x86_64, aarch64/ARM)\nuname -m",
              "output": "Linux server-prod 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC Fri Sep  6 12:00:00 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux\n6.8.0-45-generic\nx86_64",
              "annotations": [
                {
                  "part": "uname",
                  "text": "Lệnh hiển thị thông tin hệ thống của nhân Linux."
                },
                {
                  "part": "-a",
                  "text": "Cờ --all: in toàn bộ thông tin (tên máy chủ, phiên bản nhân, ngày biên dịch, kiến trúc)."
                },
                {
                  "part": "-r",
                  "text": "Cờ --kernel-release: chỉ in mã phiên bản nhân (ví dụ: 6.8.0)."
                },
                {
                  "part": "x86_64",
                  "text": "Kiến trúc CPU 64-bit tiêu chuẩn của Intel/AMD."
                }
              ]
            },
            {
              "title": "Đọc thông tin bản phân phối (Distro) từ /etc/os-release",
              "lang": "Bash",
              "code": "# Đọc tệp định danh distro chuẩn trên mọi bản phân phối hiện đại\ncat /etc/os-release",
              "output": "PRETTY_NAME=\"Ubuntu 24.04.1 LTS\"\nNAME=\"Ubuntu\"\nVERSION_ID=\"24.04\"\nVERSION=\"24.04.1 LTS (Noble Numbat)\"\nVERSION_CODENAME=noble\nID=ubuntu\nID_LIKE=debian\nHOME_URL=\"https://www.ubuntu.com/\"",
              "annotations": [
                {
                  "part": "cat",
                  "text": "Lệnh in nội dung tệp văn bản ra màn hình terminal."
                },
                {
                  "part": "/etc/os-release",
                  "text": "Đường dẫn tệp chuẩn quy định thông tin distro, hỗ trợ cả Ubuntu, Debian, RHEL, Rocky, Fedora, Arch."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Lựa chọn môi trường thực hành an toàn cho lập trình viên",
          "content": "\n            <p>Khi học Linux đến mức độ quản trị và nội bộ hệ điều hành, bạn sẽ thao tác với quyền root, can thiệp phân vùng ổ đĩa, tinh chỉnh tường lửa và nạp module nhân. Nếu gõ nhầm trên máy tính thật, bạn có thể làm mất dữ liệu cá nhân.</p>\n            <p>Dưới đây là 3 môi trường thực hành an toàn và mức độ phù hợp:</p>\n            <ul>\n              <li><strong>Máy ảo (VirtualBox, VMware, UTM, Multipass):</strong> <em>Khuyên dùng số 1!</em> Máy ảo chạy một nhân Linux cô lập hoàn toàn trong file ổ cứng ảo. Bạn có thể chụp ảnh trạng thái (Snapshot) trước khi thử lệnh nguy hiểm; nếu hỏng, chỉ cần bấm khôi phục lại trong 2 giây.</li>\n              <li><strong>WSL2 (Windows Subsystem for Linux 2):</strong> Rất tốt và nhanh cho <strong>Cấp 1 &amp; Cấp 2</strong> (thao tác file, viết code Python, bash script). Tuy nhiên, nhân của WSL2 là bản custom của Microsoft, thiếu một số tính năng khởi động bootloader, LVM ổ đĩa thô hoặc một số module nhân ở Cấp 3 &amp; 4.</li>\n              <li><strong>Container Docker:</strong> Rất tiện để thử nghiệm các lệnh cài gói, nhưng container dùng chung nhân với máy chủ, không có tiến trình PID 1 systemd đầy đủ theo mặc định.</li>\n            </ul>\n          ",
          "codeExamples": []
        }
      ],
      "scenario": {
        "title": "Xác định thông số máy chủ đám mây trước khi triển khai ứng dụng Python 3.14",
        "content": "\n          <p>Khi bạn vừa thuê một máy chủ ảo (VPS) từ các nhà cung cấp như AWS, DigitalOcean hoặc Linode để chạy dịch vụ Python, bước đầu tiên là kiểm tra phiên bản nhân và distro:</p>\n          <ol>\n            <li>Gõ <code>uname -r</code>: Nếu nhân thấp hơn <code>5.8</code>, một số cơ chế theo dõi eBPF hiện đại hoặc tính năng cgroup v2 sẽ không được hỗ trợ đầy đủ.</li>\n            <li>Gõ <code>cat /etc/os-release</code>: Kiểm tra xem server đang dùng Ubuntu 24.04, Debian 12 hay Rocky Linux 9 để biết nên dùng lệnh <code>apt</code> hay <code>dnf</code> để cài đặt gói <code>python3-venv</code> tương ứng.</li>\n          </ol>\n        "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Ngộ nhận \"WSL2 và Máy ảo thật là giống nhau 100%\"",
            "content": "WSL2 là giải pháp tuyệt vời cho lập trình hàng ngày, nhưng nó chạy trên mạng ảo NAT đặc biệt và dùng nhân do Microsoft tinh chỉnh. Khi học các bài về nạp module nhân, chỉnh sửa fstab gắn ổ đĩa thô, cấu hình mạng bridge hay systemd timer sâu, bạn nên chuẩn bị sẵn một máy ảo Ubuntu Server trên VirtualBox hoặc Multipass."
          }
        ],
        "tips": [
          {
            "title": "Nguồn tài liệu chuẩn mực chính thống",
            "content": "Khi cần tra cứu sâu bản chất cấu trúc nhân Linux, hãy tham khảo tài liệu chính thức của cộng đồng tại: https://www.kernel.org/doc/html/latest/"
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Khảo sát hệ thống Linux bạn đang sử dụng",
          "problem": "Mở terminal trên máy ảo, WSL2 hoặc server Linux của bạn. Hãy in ra thông tin phiên bản Kernel, kiến trúc CPU và mã định danh của bản phân phối.",
          "hint": "Dùng lệnh uname kết hợp cờ thích hợp và xem nội dung tệp trong thư mục /etc/.",
          "solutionCode": "uname -srm\ngrep -E '^(NAME|VERSION)=' /etc/os-release",
          "solutionOutput": "Linux 6.8.0-45-generic x86_64\nNAME=\"Ubuntu\"\nVERSION=\"24.04.1 LTS (Noble Numbat)\"",
          "explanation": "Lệnh uname -srm in tên kernel, mã release và kiến trúc phần cứng. Lệnh grep lọc ra đúng 2 dòng tên và phiên bản của distro.",
          "annotations": [
            {
              "part": "uname -srm",
              "text": "Kết hợp cờ -s (kernel name), -r (kernel release), -m (machine hardware architecture)."
            }
          ]
        }
      ],
      "summary": [
        "Linux thực chất là tên của Nhân (Kernel) điều phối phần cứng; Distro là hệ điều hành hoàn chỉnh xây dựng quanh nhân đó.",
        "Ba họ Distro lớn nhất gồm Debian/Ubuntu (apt), RHEL/Rocky/Fedora (dnf) và Arch Linux (pacman).",
        "Máy ảo độc lập (VM) là môi trường an toàn nhất để học từ cơ bản đến chuyên sâu mà không lo hỏng máy tính cá nhân."
      ]
    },
    {
      "id": "lx-1-02",
      "number": "1.2",
      "title": "Giải phẫu Cây Thư mục Linux Chuẩn FHS (`/`, `/etc`, `/var`, `/home`, `/usr`, `/tmp`, `/proc`...)",
      "subtitle": "Nắm vững triết lý \"Mọi thứ đều là file\" và quy tắc sắp đặt dữ liệu của Tiêu chuẩn Phân cấp Hệ thống File",
      "level": "Cơ bản",
      "duration": "35 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Hiểu triết lý cây thư mục duy nhất gốc `/` thay cho mô hình ổ đĩa phân mảnh C:, D: trên Windows.",
        "Nắm rõ Tiêu chuẩn Phân cấp Hệ thống File (Filesystem Hierarchy Standard - FHS).",
        "Phân định chính xác vai trò của từng thư mục: đặt file cấu hình ở `/etc`, đặt log ở `/var`, đặt code ở `/home` hoặc `/opt`.",
        "Hiểu bản chất của các hệ thống file ảo `/proc` (bộ nhớ tiến trình) và `/dev` (thiết bị)."
      ],
      "intuition": {
        "title": "Tòa cao ốc một lối vào duy nhất và Các phòng chức năng",
        "metaphor": "Trên Windows, ngôi nhà của bạn có nhiều cánh cửa vào độc lập: cửa ổ C, cửa ổ D, cửa ổ E. Nếu bạn cắm thêm ổ USB, nó lại mọc thêm một cánh cửa ổ F. Trên Linux thì khác: toàn bộ hệ thống là một tòa tháp cao ốc khổng lồ chỉ có đúng MỘT sảnh chính ở tầng trệt ký hiệu là `/` (Root directory). Bất kỳ ổ đĩa cứng, USB hay ổ mạng nào muốn xuất hiện đều phải được \"gắn kết\" (mount) vào làm một căn phòng con bên trong tòa tháp đó. Mọi phòng ban đều có quy định nghiêm ngặt: phòng hành chính `/etc` chỉ giữ sổ sách giấy tờ cấu hình; kho lưu trữ biến động `/var` chứa nhật ký log và dữ liệu website; còn phòng nghiên cứu `/proc` không hề có tủ gỗ chứa đồ thật mà là một màn hình hiển thị tình trạng nhịp tim của từng tiến trình trong RAM.",
        "visualHtml": "\n          <div style=\"padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-sans);font-size:0.84rem;\">\n            <div style=\"text-align:center;font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);margin-bottom:12px;\">BẢN ĐỒ CÂY THƯ MỤC LINUX CHUẨN FHS</div>\n            <div style=\"display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 190px), 1fr));gap:10px;\">\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;\">\n                <div style=\"font-family:var(--font-mono);font-weight:700;color:#ea580c;white-space:nowrap;\">/ (Root)</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:3px;line-height:1.45;\">Gốc của toàn bộ hệ thống. Mọi file và thư mục đều bắt đầu từ đây.</div>\n              </div>\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;\">\n                <div style=\"font-family:var(--font-mono);font-weight:700;color:var(--accent-primary);white-space:nowrap;\">/etc</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:3px;line-height:1.45;\">Chứa file cấu hình hệ thống (nginx, ssh, passwd). Không chứa binary.</div>\n              </div>\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;\">\n                <div style=\"font-family:var(--font-mono);font-weight:700;color:var(--success);white-space:nowrap;\">/var</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:3px;line-height:1.45;\">Dữ liệu biến đổi liên tục: nhật ký log (<code>/var/log</code>), cơ sở dữ liệu.</div>\n              </div>\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;\">\n                <div style=\"font-family:var(--font-mono);font-weight:700;color:#0284c7;white-space:nowrap;\">/home</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:3px;line-height:1.45;\">Thư mục cá nhân của người dùng thường (<code>/home/ubuntu</code>).</div>\n              </div>\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;\">\n                <div style=\"font-family:var(--font-mono);font-weight:700;color:#8b5cf6;white-space:nowrap;\">/usr</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:3px;line-height:1.45;\">Chứa phần mềm người dùng (<code>/usr/bin</code>) và thư viện (<code>/usr/lib</code>).</div>\n              </div>\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;\">\n                <div style=\"font-family:var(--font-mono);font-weight:700;color:#d97706;white-space:nowrap;\">/tmp</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:3px;line-height:1.45;\">Chứa file tạm thời. Thường tự động dọn sạch khi khởi động lại máy.</div>\n              </div>\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;\">\n                <div style=\"font-family:var(--font-mono);font-weight:700;color:#dc2626;white-space:nowrap;\">/proc &amp; /dev</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:3px;line-height:1.45;\">Hệ thống file ảo trong RAM (tiến trình/nhân) và các tệp thiết bị.</div>\n              </div>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Khám phá các thư mục trọng yếu dưới góc nhìn Kỹ sư Quản trị",
          "content": "\n            <p>Mỗi thư mục trong cây Linux đều có một mục đích duy nhất được chuẩn hóa:</p>\n            <ul>\n              <li><strong><code>/etc</code> (Editable Text Configuration):</strong> Nơi chứa mọi tệp cấu hình toàn hệ thống. Ví dụ: cấu hình web server Nginx nằm tại <code>/etc/nginx/nginx.conf</code>, danh sách người dùng tại <code>/etc/passwd</code>. Tất cả đều là văn bản thuần túy (plain text), có thể chỉnh sửa bằng <code>vim</code> hoặc <code>nano</code>.</li>\n              <li><strong><code>/var/log</code>:</strong> Nơi tập trung toàn bộ nhật ký của hệ điều hành và các phần mềm (log của Python, Nginx, PostgreSQL, xác thực SSH). Khi server gặp sự cố, đây là nơi đầu tiên bạn cần tới.</li>\n              <li><strong><code>/opt</code> và <code>/usr/local</code>:</strong> Nơi cài đặt các phần mềm phụ trợ độc lập của bên thứ ba không đi qua kho gói chính của distro (ví dụ: các ứng dụng doanh nghiệp đóng gói riêng).</li>\n              <li><strong><code>/proc</code> và <code>/sys</code>:</strong> Không chiếm bất kỳ byte nào trên ổ cứng! Đây là các hệ thống file ảo (pseudo-filesystem) do kernel tạo ra trên RAM để phản ánh trạng thái nội bộ của phần cứng và từng tiến trình đang chạy.</li>\n            </ul>\n          ",
          "codeExamples": [
            {
              "title": "Liệt kê các thư mục ở gốc hệ thống /",
              "lang": "Bash",
              "code": "# Liệt kê danh sách thư mục tại gốc /\nls -la /",
              "output": "total 68\ndrwxr-xr-x  19 root root  4096 Sep  6 12:00 .\ndrwxr-xr-x  19 root root  4096 Sep  6 12:00 ..\nlrwxrwxrwx   1 root root     7 Apr 22 10:00 bin -> usr/bin\ndrwxr-xr-x   4 root root  4096 Sep  6 12:05 boot\ndrwxr-xr-x  19 root root  4240 Oct 28 10:00 dev\ndrwxr-xr-x  98 root root  4096 Oct 28 10:05 etc\ndrwxr-xr-x   3 root root  4096 Sep  6 12:01 home\ndrwxr-xr-x   2 root root  4096 Sep  6 12:00 opt\ndr-xr-xr-x 210 root root     0 Oct 28 10:00 proc\ndrwx------   5 root root  4096 Oct 28 10:00 root\ndrwxrwxrwt  12 root root  4096 Oct 28 10:10 tmp\ndrwxr-xr-x  14 root root  4096 Apr 22 10:00 usr\ndrwxr-xr-x  14 root root  4096 Sep  6 12:00 var",
              "annotations": [
                {
                  "part": "ls -la /",
                  "text": "Liệt kê chi tiết (-l) toàn bộ cả file ẩn (-a) của thư mục gốc /."
                },
                {
                  "part": "bin -> usr/bin",
                  "text": "Trên các distro hiện đại, /bin là liên kết tượng trưng (symlink) trỏ vào /usr/bin theo cơ chế UsrMerge."
                },
                {
                  "part": "drwxrwxrwt",
                  "text": "Chữ t ở cuối là Sticky bit trên /tmp: cho phép mọi người ghi file nhưng chỉ chủ sở hữu mới có quyền xóa file của mình."
                }
              ]
            }
          ]
        }
      ],
      "scenario": {
        "title": "Chọn đúng nơi lưu trữ mã nguồn và nhật ký khi chạy ứng dụng Python trên Linux",
        "content": "\n          <p>Nhiều người mới bắt đầu thường vứt bừa mã nguồn Python vào <code>/root</code> hoặc <code>/tmp</code>. Đây là sai lầm nguy hiểm:</p>\n          <ul>\n            <li>Đặt vào <code>/tmp</code>: Khi máy chủ khởi động lại hoặc chạy script dọn dẹp hệ thống, toàn bộ code sẽ bị xóa sạch!</li>\n            <li>Đặt vào <code>/root</code>: Các dịch vụ web chạy bằng user không đặc quyền (như <code>www-data</code>) sẽ không thể đọc được code vì quyền hạn bị chặn.</li>\n            <li><strong>Quy chuẩn đúng:</strong> Đặt mã nguồn ứng dụng vào <code>/var/www/ten-du-an</code> hoặc <code>/opt/ten-du-an</code> (hoặc <code>/home/deploy/ten-du-an</code>), và ghi log vào <code>/var/log/ten-du-an/</code>.</li>\n          </ul>\n        "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Nhầm lẫn giữa / (thư mục gốc) và /root (thư mục cá nhân của tài khoản root)",
            "content": "Dấu `/` là thư mục gốc của toàn bộ cây hệ thống. Còn `/root` là thư mục nhà (home directory) riêng của người dùng quản trị viên tối cao root. Đừng nhầm lẫn giữa hai khái niệm này!"
          }
        ],
        "tips": [
          {
            "title": "Tiêu chuẩn quốc tế FHS",
            "content": "Cấu trúc thư mục Linux được quy định chặt chẽ bởi tổ chức Linux Foundation trong tài liệu FHS. Bạn có thể tra cứu nhanh bằng lệnh: man hier"
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Khám phá file ảo đại diện CPU trong /proc",
          "problem": "Hãy dùng lệnh xem nội dung tệp /proc/cpuinfo để đếm xem máy tính của bạn có bao nhiêu nhân (processor) và tên model của CPU là gì.",
          "hint": "Dùng lệnh grep để lọc từ khóa model name và processor trong /proc/cpuinfo.",
          "solutionCode": "grep -E '^(model name|processor)' /proc/cpuinfo | head -n 4",
          "solutionOutput": "processor\t: 0\nmodel name\t: Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz\nprocessor\t: 1\nmodel name\t: Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz",
          "explanation": "Tệp /proc/cpuinfo là một tệp ảo do kernel sinh ra trên RAM cung cấp thông tin chi tiết về phần cứng vi xử lý.",
          "annotations": [
            {
              "part": "/proc/cpuinfo",
              "text": "Tệp ảo trong /proc chứa toàn bộ thông số phần cứng CPU."
            }
          ]
        }
      ],
      "summary": [
        "Toàn bộ cây thư mục Linux xuất phát từ một gốc duy nhất là `/`.",
        "Mỗi thư mục có vai trò chuyên biệt: cấu hình để ở `/etc`, dữ liệu biến đổi/log để ở `/var`, phần mềm để ở `/usr`.",
        "Thư mục `/proc` và `/dev` là hiện thân của triết lý \"mọi thứ đều là file\", ánh xạ trực tiếp cấu trúc dữ liệu của nhân Linux."
      ]
    },
    {
      "id": "lx-1-03",
      "number": "1.3",
      "title": "Shell, Terminal và Kỹ năng Tự tra cứu Sinh tồn (`man`, `--help`, `type`, `which`, `apropos`)",
      "subtitle": "Thấu hiểu cấu trúc dòng lệnh và kỹ năng tự tìm câu trả lời mà không cần phụ thuộc vào mạng Internet",
      "level": "Cơ bản",
      "duration": "30 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Phân biệt rõ ràng giữa Terminal Emulator, Shell (Bash/Zsh) và Câu lệnh.",
        "Hiểu giải phẫu một câu lệnh: Tên lệnh + Cờ (Options) + Đối số (Arguments).",
        "Sử dụng thành thạo hệ thống sổ tay điện tử `man` theo từng phân vùng (Section 1, 5, 8).",
        "Phân biệt lệnh tích hợp trong shell (builtin) vs chương trình thực thi độc lập bằng lệnh `type`."
      ],
      "intuition": {
        "title": "Người thông dịch viên và Cuốn từ điển bách khoa nội bộ",
        "metaphor": "Cửa sổ đen xì bạn nhìn thấy (Terminal) giống như chiếc điện thoại bàn kết nối vào phòng điều khiển. Khi bạn nhấc máy lên và nói, người ngồi ở đầu dây bên kia lắng nghe và giải thích câu nói của bạn cho hệ điều hành chính là Shell (thông dịch viên Bash). Khi bạn gõ một câu lệnh, nó giống như một câu có đủ chủ ngữ, vị ngữ và bổ ngữ. Và quan trọng nhất: khi bạn không hiểu một từ nào đó hoạt động ra sao, Linux luôn đính kèm một bộ bách khoa toàn thư đồ sộ mang tên `man` (manual pages) ngay trong máy. Dù bạn bị đứt cáp quang rơi vào hòn đảo hoang, chỉ cần gõ `man <tên-lệnh>`, toàn bộ bí mật kỹ thuật sẽ mở ra trước mắt.",
        "visualHtml": "\n          <div style=\"padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-sans);font-size:0.84rem;\">\n            <div style=\"font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:10px;\">CẤU TRÚC 3 THÀNH PHẦN CỦA MỘT CÂU LỆNH LINUX</div>\n            <div style=\"display:flex;gap:14px;justify-content:center;align-items:center;flex-wrap:nowrap;white-space:nowrap;overflow-x:auto;padding:12px 16px;background:var(--bg-code);border-radius:8px;color:#f1f5f9;font-family:var(--font-mono);\">\n              <span style=\"color:#ff7b72;font-weight:700;font-size:1.05rem;\">ls</span>\n              <span style=\"color:#79c0ff;font-weight:700;font-size:1.05rem;\">-la --sort=time</span>\n              <span style=\"color:#a5d6ff;font-weight:700;font-size:1.05rem;\">/var/log</span>\n            </div>\n            <div style=\"display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 170px), 1fr));gap:10px;text-align:center;margin-top:10px;\">\n              <div style=\"padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;\"><strong style=\"color:#dc2626;font-family:var(--font-mono);white-space:nowrap;\">1. Command</strong><div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:2px;\">Hành động cần thực hiện</div></div>\n              <div style=\"padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;\"><strong style=\"color:var(--accent-primary);font-family:var(--font-mono);white-space:nowrap;\">2. Options / Flags</strong><div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:2px;\">Cách thực hiện (<code>-l</code>, <code>--sort</code>)</div></div>\n              <div style=\"padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;\"><strong style=\"color:#0284c7;font-family:var(--font-mono);white-space:nowrap;\">3. Arguments</strong><div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:2px;\">Đối tượng chịu tác động</div></div>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Kỹ năng tra cứu với man pages và các Section quan trọng",
          "content": "\n            <p>Hệ thống sổ tay <code>man</code> được chia thành 8 phân vùng (Sections). Trong đó 3 phân vùng kỹ sư bắt buộc phải biết:</p>\n            <ul>\n              <li><strong>Section 1:</strong> Các lệnh thông thường của người dùng (ví dụ: <code>man 1 ls</code>, <code>man 1 python3</code>).</li>\n              <li><strong>Section 5:</strong> Định dạng các tệp cấu hình (ví dụ: <code>man 5 crontab</code>, <code>man 5 fstab</code>, <code>man 5 systemd.service</code> — giải thích từng dòng trong file cấu hình).</li>\n              <li><strong>Section 8:</strong> Các lệnh dành riêng cho quản trị viên hệ thống (ví dụ: <code>man 8 ip</code>, <code>man 8 nginx</code>, <code>man 8 sshd</code>).</li>\n            </ul>\n            <p>Khi đọc tài liệu kỹ thuật quốc tế thấy ghi <code>fstab(5)</code> hay <code>sshd(8)</code>, con số trong ngoặc chính là số hiệu Section của cuốn sổ tay tương ứng.</p>\n          ",
          "codeExamples": [
            {
              "title": "Tra cứu nhanh và tìm kiếm lệnh theo từ khóa",
              "lang": "Bash",
              "code": "# Đọc hướng dẫn chi tiết của lệnh ls\nman ls\n\n# Xem cú pháp nhanh gọn qua cờ --help\npython3 --help | head -n 10\n\n# Tìm kiếm lệnh liên quan khi quên tên (tìm kiếm full-text trong mô tả)\napropos \"compress files\"",
              "output": "LS(1)                            User Commands                           LS(1)\n\nNAME\n       ls - list directory contents\n\nSYNOPSIS\n       ls [OPTION]... [FILE]...",
              "annotations": [
                {
                  "part": "man ls",
                  "text": "Mở trang hướng dẫn của lệnh ls trong trình xem less (bấm q để thoát)."
                },
                {
                  "part": "apropos",
                  "text": "Tìm kiếm tất cả các trang man có chứa từ khóa được cung cấp (tương đương man -k)."
                }
              ]
            },
            {
              "title": "Phân biệt lệnh Built-in vs File thực thi ngoài bằng lệnh type",
              "lang": "Bash",
              "code": "# Kiểm tra xem lệnh 'cd' là gì\ntype cd\n\n# Kiểm tra xem lệnh 'ls' là gì\ntype ls\n\n# Tìm đường dẫn file thực thi thực tế của Python\nwhich python3",
              "output": "cd is a shell builtin\nls is aliased to 'ls --color=auto'\n/usr/bin/python3",
              "annotations": [
                {
                  "part": "type cd",
                  "text": "cd là lệnh tích hợp sẵn trong Bash (shell builtin), không có file /bin/cd độc lập."
                },
                {
                  "part": "which python3",
                  "text": "which in ra đường dẫn tuyệt đối của chương trình thực thi được tìm thấy trong biến PATH."
                }
              ]
            }
          ]
        }
      ],
      "scenario": {
        "title": "Tra cứu cú pháp tệp cấu hình crontab khi không có mạng Internet",
        "content": "\n          <p>Bạn đang ngồi trực tiếp tại phòng máy chủ (hoặc qua console cô lập không có mạng) để sửa lịch chạy tác vụ backup. Bạn quên mất thứ tự 5 cột thời gian của crontab:</p>\n          <p>Thay vì đoán mò hoặc tra Google, bạn chỉ cần gõ <code>man 5 crontab</code>. Linux sẽ hiển thị đầy đủ sơ đồ: <em>phút, giờ, ngày trong tháng, tháng, ngày trong tuần</em> và các ví dụ cấu hình chuẩn chỉ trong 3 giây.</p>\n        "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Kẹt lại trong màn hình man page không biết cách thoát",
            "content": "Nhiều người mới mở `man` lên bị kẹt không gõ được lệnh tiếp theo. Trình đọc man mặc định dùng `less`. Để thoát về dòng lệnh, bạn chỉ cần nhấn phím `q`. Để tìm kiếm từ khóa bên trong trang man, gõ `/tu-khoa` rồi bấm Enter, nhấn `n` để tìm tiếp."
          }
        ],
        "tips": [
          {
            "title": "Phím tắt tăng tốc dòng lệnh thần thánh",
            "content": "Luôn dùng phím `Tab` để tự động hoàn thành tên lệnh và đường dẫn file. Dùng `Ctrl + C` để ngắt lệnh đang chạy; `Ctrl + L` để xóa sạch màn hình terminal."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Tra cứu ý nghĩa Section 5 của tệp passwd",
          "problem": "Hãy dùng lệnh man để xem giải thích cấu trúc các trường trong tệp /etc/passwd.",
          "hint": "Gõ man kèm số hiệu section 5 trước tên tệp.",
          "solutionCode": "man 5 passwd",
          "solutionOutput": "PASSWD(5)                        File Formats Manual                       PASSWD(5)\n\nNAME\n       passwd - the password file\n\nDESCRIPTION\n       /etc/passwd contains one line for each user account, with seven fields...",
          "explanation": "Section 5 giải thích chi tiết ý nghĩa của 7 trường trong tệp /etc/passwd (username, mật khẩu x, UID, GID, comment, home directory, shell).",
          "annotations": [
            {
              "part": "man 5 passwd",
              "text": "Chỉ định rõ tra cứu Section 5 (File formats), tránh nhầm với lệnh passwd(1) đổi mật khẩu."
            }
          ]
        }
      ],
      "summary": [
        "Một câu lệnh Linux gồm: Lệnh (Command) + Cờ tùy chọn (Options) + Đối số (Arguments).",
        "Hệ thống `man` là thư viện tài liệu ngoại tuyến hoàn chỉnh nhất, chia theo các Section 1 (lệnh), 5 (file cấu hình), 8 (quản trị).",
        "Dùng `type` để phân biệt lệnh tích hợp trong shell (builtin) và chương trình binary độc lập."
      ]
    },
    {
      "id": "lx-1-04",
      "number": "1.4",
      "title": "Điều hướng và Thao tác File/Thư mục An toàn (`pwd`, `ls`, `cd`, `mkdir`, `touch`, `cp`, `mv`, `rm`, `ln`)",
      "subtitle": "Nắm vững quy tắc đường dẫn, bảo toàn thuộc tính và cảnh báo an toàn sinh tử với lệnh rm -rf",
      "level": "Cơ bản",
      "duration": "40 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Phân biệt tuyệt đối giữa đường dẫn tuyệt đối (bắt đầu bằng `/`) và tương đối.",
        "Sử dụng thành thạo các ký tự định hướng: `.` (hiện tại), `..` (thư mục cha), `~` (thư mục nhà), `-` (thư mục vừa đứng).",
        "Sao chép (`cp -a`), di chuyển/đổi tên (`mv`), tạo cây thư mục sâu (`mkdir -p`).",
        "Phân biệt liên kết cứng (Hard link) vs liên kết mềm (Symlink `ln -s`).",
        "Nhận thức sâu sắc mối nguy hiểm của `rm -rf` và thiết lập thói quen thao tác an toàn."
      ],
      "intuition": {
        "title": "Tọa độ GPS, Ngôi nhà thân quen và Bản sao hợp đồng",
        "metaphor": "Đường dẫn tuyệt đối giống như tọa độ GPS chính xác trên bản đồ thế giới (\"Tầng 3, Tòa nhà Landmark, Hà Nội\"): dù bạn đang đứng ở đâu, người ta cũng tìm tới đúng địa chỉ đó vì nó bắt đầu từ gốc `/`. Đường dẫn tương đối giống như câu chỉ đường miệng (\"Đi thẳng 2 dãy nhà rồi rẽ trái\"): nó phụ thuộc hoàn toàn vào vị trí bạn đang đứng (`pwd`). Còn liên kết mềm (`ln -s`) giống như một tấm biển chỉ đường bằng gỗ: tấm biển chỉ tay viết \"Tài liệu mật nằm ở phòng 102\"; nếu bạn gỡ bỏ tấm biển, căn phòng 102 vẫn còn nguyên. Ngược lại, lệnh `rm` trên Linux là một cỗ máy nghiền rác vĩnh viễn: một khi đã bấm nút, không có \"Thùng rác Recycle Bin\" để bạn nhấn Hoàn tác.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🧭</span>\n                    <span>ĐƯỜNG DẪN</span>\n                    <span class=\"lx-vs-tag\">Gốc / vs Hiện tại</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Tuyệt đối (Bắt đầu bằng /):</strong> Đi từ gốc cây thư mục (ví dụ <code>/var/log/nginx/access.log</code>). Luôn trỏ đúng đích dù bạn đang đứng ở đâu.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Tương đối (Không bắt đầu bằng /):</strong> Tính từ vị trí thư mục hiện tại (ví dụ <code>./app.py</code> hoặc <code>../config.json</code>).</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔗</span>\n                    <span>HARD vs SOFT LINK</span>\n                    <span class=\"lx-vs-tag\">Liên kết tệp</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Hard Link (ln file link):</strong> Trỏ chung vào cùng một Inode vật lý. Xóa file gốc thì link vẫn còn nguyên dữ liệu!</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Soft Link (ln -s file link):</strong> Shortcut trỏ vào tên đường dẫn. Xóa file gốc thì symlink bị gãy (Broken link).</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Điều hướng không gian và làm việc với đường dẫn",
          "content": "\n            <p>Bốn ký tự định hướng bạn sẽ dùng hàng trăm lần mỗi ngày:</p>\n            <ul>\n              <li><code>.</code> : Đại diện cho chính thư mục hiện tại bạn đang đứng.</li>\n              <li><code>..</code> : Đại diện cho thư mục cha ngay bên trên một cấp.</li>\n              <li><code>~</code> : Phím tắt dẫn thẳng về thư mục cá nhân của người dùng hiện tại (ví dụ: <code>/home/ubuntu</code>).</li>\n              <li><code>-</code> : Dẫn về thư mục bạn vừa đứng trước đó (như nút <em>Back</em> trên trình duyệt).</li>\n            </ul>\n          ",
          "codeExamples": [
            {
              "title": "Các thao tác điều hướng cơ bản hàng ngày",
              "lang": "Bash",
              "code": "# Xem đường dẫn đầy đủ của thư mục hiện tại\npwd\n\n# Chuyển vào thư mục cấu hình hệ thống (đường dẫn tuyệt đối)\ncd /etc/nginx\n\n# Lùi về thư mục cha /etc\ncd ..\n\n# Chuyển về thư mục nhà của bạn\ncd ~\n\n# Nhảy lại thư mục vừa đứng trước đó (/etc)\ncd -",
              "output": "/home/ubuntu\n/etc/nginx\n/etc\n/home/ubuntu\n/etc",
              "annotations": [
                {
                  "part": "pwd",
                  "text": "Print Working Directory: in ra đường dẫn tuyệt đối nơi bạn đang đứng."
                },
                {
                  "part": "cd -",
                  "text": "Chuyển đổi qua lại cực nhanh giữa hai thư mục vừa làm việc."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Thao tác tạo, sao chép, đổi tên và Liên kết (Links)",
          "content": "\n            <p><strong>Tạo thư mục nhiều cấp:</strong> Sử dụng <code>mkdir -p du-an/src/models</code>. Cờ <code>-p</code> (parents) tự động tạo các thư mục cha nếu chưa tồn tại mà không báo lỗi.</p>\n            <p><strong>Sao chép bảo toàn thuộc tính:</strong> Luôn dùng <code>cp -a</code> (archive) khi sao lưu mã nguồn hoặc dữ liệu. Cờ <code>-a</code> tương đương <code>-dR --preserve=all</code>, giúp giữ nguyên quyền sở hữu, thời gian sửa đổi và liên kết mềm.</p>\n            <p><strong>Liên kết mềm (Symlink):</strong> Cú pháp: <code>ln -s &lt;đích-thực-tế&gt; &lt;tên-link-mới&gt;</code>. Luôn dùng đường dẫn tuyệt đối cho đích để liên kết không bị hỏng khi di chuyển.</p>\n          ",
          "codeExamples": [
            {
              "title": "Tạo cấu trúc dự án và tạo liên kết mềm (Symlink)",
              "lang": "Bash",
              "code": "# Tạo cây thư mục dự án Python hoàn chỉnh trong 1 lệnh\nmkdir -p myproject/{app,tests,logs,config}\n\n# Tạo file rỗng hoặc cập nhật mốc thời gian\ntouch myproject/config/settings.env\n\n# Tạo liên kết mềm từ file cấu hình ra thư mục làm việc chính\nln -s /home/ubuntu/myproject/config/settings.env ./current_env\n\n# Kiểm tra liên kết mềm vừa tạo\nls -l ./current_env",
              "output": "lrwxrwxrwx 1 ubuntu ubuntu 43 Oct 28 10:15 ./current_env -> /home/ubuntu/myproject/config/settings.env",
              "annotations": [
                {
                  "part": "mkdir -p",
                  "text": "Tạo hàng loạt thư mục lồng nhau an toàn."
                },
                {
                  "part": "ln -s",
                  "text": "Tạo liên kết tượng trưng (Symbolic Link). Chữ l ở đầu dòng đầu ra biểu thị đây là một symlink."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Cảnh báo Đỏ: Lệnh xóa vĩnh viễn và Quy tắc an toàn với rm",
          "content": "\n            <p>Trên Linux, lệnh <code>rm</code> xóa file trực tiếp khỏi chỉ mục hệ thống (unlink). Không có thùng rác để khôi phục.</p>\n            <div class=\"callout-box callout-danger lx-danger-strong\">\n              <div class=\"callout-header\">\n                <span class=\"lx-badge-danger\">CẢNH BÁO ĐỎ TỐI NGUY HIỂM</span>\n                <span>Thảm họa xóa sạch hệ thống với <code>rm -rf</code>!</span>\n              </div>\n              <div class=\"callout-body\">\n                <p>Cờ <code>-r</code> (recursive) xóa đệ quy toàn bộ thư mục con; cờ <code>-f</code> (force) bỏ qua mọi thông báo xác nhận và lỗi. Lệnh kinh điển <code>rm -rf /</code> hoặc một sơ suất có dấu cách như <code>rm -rf / tmp/trash</code> (thay vì <code>/tmp/trash</code>) sẽ <strong>ngay lập tức xóa sạch toàn bộ hệ điều hành và dữ liệu trên ổ cứng!</strong></p>\n                <div class=\"lx-safe-alternative\">\n                  <span class=\"lx-badge-safe\">4 QUY TẮC AN TOÀN SINH TỬ</span>\n                  <div style=\"margin-top:6px;\">1. <strong>Kiểm tra trước bằng ls:</strong> Trước khi gõ <code>rm -rf dir/*</code>, hãy gõ <code>ls dir/*</code> để mắt bạn nhìn thấy chính xác những file sắp bị xóa.</div>\n                  <div>2. <strong>Luôn dùng đường dẫn cụ thể:</strong> Tuyệt đối không dùng biến môi trường chưa kiểm tra rỗng (như <code>rm -rf $DIR/*</code>: nếu biến <code>$DIR</code> rỗng, lệnh sẽ thành <code>rm -rf /*</code>!).</div>\n                  <div>3. <strong>Sử dụng cờ -i khi chưa chắc chắn:</strong> Dùng <code>rm -i</code> để hệ thống hỏi xác nhận từng file.</div>\n                  <div>4. <strong>Tạo thư mục rác tạm thời:</strong> Tập thói quen dùng <code>mv file /tmp/</code> thay vì <code>rm</code> ngay lập tức.</div>\n                </div>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        }
      ],
      "scenario": {
        "title": "Sao lưu an toàn mã nguồn dự án trước khi nâng cấp phiên bản",
        "content": "\n          <p>Trước khi kéo code mới từ Git hoặc chạy bản nâng cấp cơ sở dữ liệu trên máy chủ, một kỹ sư luôn tạo bản sao lưu nguyên vẹn bằng lệnh <code>cp -a</code>:</p>\n          <p><code>cp -a /var/www/my-api /var/www/my-api.backup-$(date +%Y%m%d)</code></p>\n          <p>Lệnh này bảo toàn 100% quyền truy cập của user <code>www-data</code>, giữ nguyên các liên kết mềm và mốc thời gian của từng tệp mã nguồn Python.</p>\n        "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi gõ thừa dấu cách khi xóa file với wildcard (*)",
            "content": "Nếu bạn định xóa tất cả các file có đuôi `.log` trong thư mục hiện tại: gõ đúng là `rm *.log`. Nếu bạn lỡ tay ấn cách thành `rm * .log`, hệ thống sẽ xóa TẤT CẢ mọi file trong thư mục trước, rồi mới tìm file `.log` để xóa tiếp!"
          }
        ],
        "tips": [
          {
            "title": "Sử dụng lệnh trash-cli nếu muốn có thùng rác",
            "content": "Trên môi trường máy trạm, bạn có thể cài gói `trash-cli` để có lệnh `trash-put`. File bị xóa sẽ được đưa vào thùng rác chuẩn và có thể khôi phục lại khi cần."
          }
        ]
      },
      "exercises": [
        {
          "level": "Vừa",
          "title": "Thực hành tạo cấu trúc và tạo symlink an toàn",
          "problem": "Trong thư mục cá nhân, tạo thư mục `du-an-python` chứa file `main.py`. Sau đó tạo một symlink tên `app_link` nằm ngoài thư mục nhà trỏ vào file `main.py` đó.",
          "hint": "Dùng mkdir, touch và `ln -s` với đường dẫn tuyệt đối.",
          "solutionCode": "mkdir -p ~/du-an-python\necho \"print('Hello Linux')\" > ~/du-an-python/main.py\nln -s ~/du-an-python/main.py ~/app_link\npython3 ~/app_link",
          "solutionOutput": "Hello Linux",
          "explanation": "Chạy Python qua symlink app_link sẽ thực thi chính xác file nguồn main.py trong thư mục du-an-python.",
          "annotations": [
            {
              "part": "ln -s",
              "text": "Tạo liên kết mềm trỏ tới tệp đích."
            }
          ]
        }
      ],
      "summary": [
        "Đường dẫn tuyệt đối bắt đầu từ `/`; đường dẫn tương đối bắt đầu từ vị trí `pwd`.",
        "Luôn dùng `mkdir -p` để tạo cây thư mục an toàn và `cp -a` để sao chép bảo toàn quyền hạn.",
        "Lệnh `rm` xóa vĩnh viễn không qua thùng rác; tuyệt đối cẩn trọng với `rm -rf` và thói quen kiểm tra trước bằng `ls`."
      ]
    },
    {
      "id": "lx-1-05",
      "number": "1.5",
      "title": "Xem Nội dung File (`cat`, `less`, `head`, `tail -f`) & Trình Soạn thảo Dòng lệnh (`nano`, `vim` cơ bản)",
      "subtitle": "Xử lý file log dung lượng khổng lồ không làm sập RAM và kỹ năng sinh tồn vững vàng trong Vim",
      "level": "Cơ bản",
      "duration": "40 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Biết rõ khi nào nên dùng `cat` và vì sao tuyệt đối không dùng `cat` trên file log hàng Gigabyte.",
        "Sử dụng thành thạo `less` để duyệt văn bản lớn mà không ngốn bộ nhớ RAM.",
        "Theo dõi luồng log thời gian thực với `tail -f` và `tail -F`.",
        "Soạn thảo nhanh file cấu hình bằng `nano`.",
        "Nắm vững 3 chế độ của `vim` (Normal, Insert, Command), các lệnh sinh tồn: di chuyển, tìm kiếm, lưu `:wq` và thoát an toàn `:q!`."
      ],
      "intuition": {
        "title": "Cuộn phim chiếu bóng less và Bàn phím đa chế độ Vim",
        "metaphor": "Lệnh `cat` giống như bạn cầm xô hắt toàn bộ nước trong thùng ra sàn nhà: nếu tệp chỉ có 5 dòng, mọi thứ rất nhanh; nhưng nếu tệp log nặng 5GB, nó sẽ xối xả làm đơ toàn bộ cửa sổ terminal và tràn bộ nhớ đệm. Trong khi đó, `less` giống như một cuộn phim chiếu bóng: nó chỉ đọc đúng 50 dòng tương ứng với kích thước màn hình của bạn; bạn cuộn đến đâu nó mới đọc đĩa tới đó, dù tệp nặng 100GB cũng mở lên trong 0.01 giây. Còn `vim` giống như một nhạc cụ chuyên nghiệp: bình thường các phím bấm là các nốt nhạc điều khiển (chế độ Normal); chỉ khi bạn nhấn phím `i`, các phím mới biến thành chữ cái để bạn gõ văn bản (chế độ Insert).",
        "visualHtml": "\n          <div style=\"padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-sans);font-size:0.84rem;\">\n            <div style=\"font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:12px;\">TAM GIÁC CHẾ ĐỘ SINH TỒN TRONG TRÌNH SOẠN THẢO VIM</div>\n            <div style=\"display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 185px), 1fr));gap:10px;text-align:center;\">\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;\">\n                <div style=\"font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-primary);white-space:nowrap;\">1. NORMAL MODE</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:4px;line-height:1.45;\">Mặc định khi mở. Dùng di chuyển, xóa dòng (<code>dd</code>), sao chép (<code>yy</code>). Bấm <code>Esc</code> để về đây.</div>\n              </div>\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:2px solid var(--success);border-radius:8px;\">\n                <div style=\"font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--success);white-space:nowrap;\">2. INSERT MODE</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:4px;line-height:1.45;\">Bấm phím <code>i</code> từ Normal Mode. Dưới góc hiện <code>-- INSERT --</code> để gõ chữ bình thường.</div>\n              </div>\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:2px solid #ea580c;border-radius:8px;\">\n                <div style=\"font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:#ea580c;white-space:nowrap;\">3. COMMAND MODE</div>\n                <div style=\"font-size:0.78rem;color:var(--text-secondary);margin-top:4px;line-height:1.45;\">Từ Normal gõ dấu <code>:</code> để lưu (<code>:w</code>), thoát (<code>:q</code>), lưu thoát (<code>:wq</code>) hoặc hủy (<code>:q!</code>).</div>\n              </div>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Xem file thông minh: cat vs less vs head vs tail",
          "content": "\n            <p>Quy tắc vàng khi mở file trên Linux:</p>\n            <ul>\n              <li><strong><code>cat</code> (concatenate):</strong> Chỉ dùng cho các file ngắn dưới 50 dòng (file cấu hình nhỏ, script ngắn).</li>\n              <li><strong><code>less</code>:</strong> Luôn dùng cho file dài. Các phím tắt trong <code>less</code>: phím cách (xuống 1 trang), <code>b</code> (lên 1 trang), <code>/tu_khoa</code> (tìm kiếm xuôi), <code>?tu_khoa</code> (tìm ngược), <code>g</code> (về đầu file), <code>G</code> (xuống cuối file), <code>q</code> (thoát ra).</li>\n              <li><strong><code>head -n 20</code>:</strong> Xem nhanh 20 dòng đầu tiên của file.</li>\n              <li><strong><code>tail -n 20</code>:</strong> Xem nhanh 20 dòng cuối cùng.</li>\n              <li><strong><code>tail -f /var/log/app.log</code>:</strong> Bám sát (follow) luồng ghi log theo thời gian thực. Bấm <code>Ctrl + C</code> để dừng.</li>\n            </ul>\n          ",
          "codeExamples": [
            {
              "title": "Xem và theo dõi log ứng dụng",
              "lang": "Bash",
              "code": "# Xem 5 dòng đầu tiên của file cấu hình\nhead -n 5 /etc/passwd\n\n# Theo dõi luồng log hệ thống trực tiếp\ntail -f /var/log/syslog",
              "output": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsync:x:4:65534:sync:/bin:/bin/sync",
              "annotations": [
                {
                  "part": "head -n 5",
                  "text": "Chỉ đọc đúng 5 dòng đầu tiên rồi dừng."
                },
                {
                  "part": "tail -f",
                  "text": "Cờ -f (follow): giữ kết nối mở và in ra ngay lập tức khi có dòng log mới được ghi vào file."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Kỹ năng sinh tồn trong Vim & Soạn thảo với Nano",
          "content": "\n            <p><strong>Trình soạn thảo Nano:</strong> Rất thân thiện cho người mới bắt đầu. Gõ <code>nano file.txt</code>, gõ chữ bình thường. Dưới đáy màn hình có sẵn hướng dẫn: <code>Ctrl + O</code> rồi Enter để lưu (WriteOut), <code>Ctrl + X</code> để thoát.</p>\n            <p><strong>Trình soạn thảo Vim:</strong> Được cài sẵn trên 100% server Linux và các container cứu hộ tối thiểu. Dưới đây là quy trình sinh tồn bất bại trong Vim:</p>\n            <ol>\n              <li>Mở file: <code>vim settings.py</code> (mặc định vào Normal Mode).</li>\n              <li>Chuyển sang chế độ gõ: Nhấn phím <code>i</code> (Insert). Nhìn xuống góc trái thấy chữ <code>-- INSERT --</code> thì bắt đầu gõ mã nguồn.</li>\n              <li>Gõ xong, muốn lưu: Nhấn phím <code>Esc</code> (trở về Normal Mode) → Gõ <code>:wq</code> rồi nhấn <code>Enter</code> (write and quit).</li>\n              <li>Nếu lỡ tay sửa bậy muốn thoát mà KHÔNG lưu: Nhấn <code>Esc</code> → Gõ <code>:q!</code> rồi nhấn <code>Enter</code>.</li>\n            </ol>\n          ",
          "codeExamples": [
            {
              "title": "Các lệnh thao tác nhanh cực hay trong Vim Normal Mode",
              "lang": "Vim commands",
              "code": "# Nhấn 'dd' : Xóa (cắt) toàn bộ dòng hiện tại\n# Nhấn 'yy' : Sao chép (copy) dòng hiện tại\n# Nhấn 'p'  : Dán (paste) dòng vừa copy xuống dưới\n# Nhấn 'u'  : Hoàn tác (Undo) lại thao tác vừa làm\n# Nhấn '/'  : Tìm kiếm từ khóa (nhấn 'n' để nhảy tới kết quả tiếp theo)",
              "output": "(Các phím tắt nhấn trực tiếp trong Normal Mode của Vim, không cần gõ dấu hai chấm)",
              "annotations": [
                {
                  "part": "dd",
                  "text": "Thao tác xóa nhanh một dòng mà không cần bôi đen."
                },
                {
                  "part": "u",
                  "text": "Cứu cánh thần kỳ khi lỡ tay xóa nhầm nội dung trong Vim."
                }
              ]
            }
          ]
        }
      ],
      "scenario": {
        "title": "Soi lỗi trực tiếp từ log của ứng dụng web Python đang chạy production",
        "content": "\n          <p>Khách hàng báo ứng dụng web Python thỉnh thoảng bị lỗi 500 khi bấm nút thanh toán. Bạn mở terminal kết nối vào server:</p>\n          <ol>\n            <li>Chạy <code>tail -f /var/log/my-app/error.log</code>.</li>\n            <li>Yêu cầu đồng nghiệp bấm lại nút thanh toán trên web để tái hiện lỗi.</li>\n            <li>Ngay lập tức, màn hình terminal sẽ nhảy ra toàn bộ khối mã vết lỗi (Python Traceback) chỉ điểm chính xác dòng mã nguồn và biến gây lỗi <code>KeyError</code> hoặc <code>ZeroDivisionError</code>.</li>\n          </ol>\n        "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi kẹt trong Vim không biết cách thoát",
            "content": "Đây là tình huống kinh điển nhất của mọi lập trình viên khi mới học Linux. Nếu bạn lỡ mở Vim mà không biết cách thoát: hãy bấm phím `Esc` liên tục 3 lần, gõ `:q!` rồi bấm `Enter`. Bạn sẽ trở về dòng lệnh an toàn mà không làm hỏng file."
          }
        ],
        "tips": [
          {
            "title": "Luyện tập Vim tương tác trong 15 phút với vimtutor",
            "content": "Mọi bản cài đặt Vim đều đi kèm công cụ dạy học tương tác miễn phí. Hãy gõ lệnh `vimtutor` trên terminal để học toàn bộ thao tác Vim qua bài tập thực tế."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Tạo và chỉnh sửa file kịch bản Python bằng Nano hoặc Vim",
          "problem": "Tạo một file tên `hello.py` bằng trình soạn thảo dòng lệnh, ghi vào dòng mã `print(\"Python on Linux\")`, lưu lại và chạy bằng lệnh `python3 hello.py`.",
          "hint": "Dùng nano hello.py hoặc vim hello.py.",
          "solutionCode": "cat << 'EOF' > hello.py\nprint(\"Python on Linux\")\nEOF\npython3 hello.py",
          "solutionOutput": "Python on Linux",
          "explanation": "File hello.py được tạo và chạy thành công trên môi trường dòng lệnh.",
          "annotations": [
            {
              "part": "python3 hello.py",
              "text": "Thực thi file kịch bản bằng trình thông dịch Python."
            }
          ]
        }
      ],
      "summary": [
        "Dùng `cat` cho file ngắn, luôn dùng `less` cho file dài để không ngốn RAM máy chủ.",
        "Theo dõi log thời gian thực với `tail -f`.",
        "Thuộc lòng quy tắc sinh tồn trong Vim: phím `i` để gõ, `Esc` để chuyển chế độ, `:wq` để lưu và `:q!` để thoát an toàn."
      ]
    },
    {
      "id": "lx-1-06",
      "number": "1.6",
      "title": "Quyền Truy cập Cơ bản (`rwx`, `chmod`, `chown`) & Người dùng và `sudo`",
      "subtitle": "Hiểu cặn kẽ 3 nhóm đối tượng, cơ chế bát phân và cảnh báo an toàn tối cao khi cấp quyền 777",
      "level": "Cơ bản",
      "duration": "45 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "Đọc vanh vách chuỗi 10 ký tự quyền hạn `-rwxr-xr--` trong lệnh `ls -l`.",
        "Phân biệt rõ 3 đối tượng sở hữu: User (chủ sở hữu), Group (nhóm) và Others (người khác).",
        "Hiểu sự khác biệt sống còn của quyền Thực thi `x` trên File vs trên Thư mục.",
        "Tính toán thành thạo hệ bát phân (Octal): r=4, w=2, x=1 và các bộ quyền kinh điển: 755, 644, 600.",
        "Sử dụng `chmod` và `chown` chuẩn xác; hiểu nguyên tắc đặc quyền tối thiểu của `sudo`."
      ],
      "intuition": {
        "title": "Chiếc chìa khóa 3 nấc và Huy hiệu bảo vệ tòa nhà",
        "metaphor": "Mỗi file trên Linux giống như một chiếc két sắt có 3 ổ khóa riêng biệt: Ổ 1 dành cho Chủ nhân (User); Ổ 2 dành cho Người nhà/Đồng nghiệp cùng phòng (Group); Ổ 3 dành cho Khách vãng lai ngoài đường (Others). Mỗi ổ khóa có đúng 3 công tắc bật tắt: Đọc (Read - nhìn thấy ruột), Ghi (Write - sửa đổi hoặc xóa) và Thực thi (Execute). Với một tệp file, \"Thực thi\" nghĩa là chạy nó như một phần mềm; nhưng với một cánh cửa thư mục, \"Thực thi\" chính là quyền được bước chân qua cánh cửa đó (cd vào trong). Nếu một thư mục có quyền đọc r mà không có quyền x, bạn chỉ có thể nhìn qua khe cửa thấy danh sách tên file nhưng tuyệt đối không thể mở bất kỳ file nào bên trong!",
        "visualHtml": "\n          <div style=\"padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-sans);font-size:0.84rem;\">\n            <div style=\"font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:12px;\">GIẢI MÃ CHUỖI 10 KÝ TỰ PHÂN QUYỀN TRÊN LINUX</div>\n            <div style=\"display:flex;gap:14px;justify-content:center;font-family:var(--font-mono);font-size:1.15rem;font-weight:800;white-space:nowrap;overflow-x:auto;padding:12px;background:var(--bg-code);border-radius:8px;\">\n              <span style=\"color:#ff7b72;\" title=\"Loại file: - (file thường), d (thư mục), l (symlink)\">-</span>\n              <span style=\"color:#79c0ff;\" title=\"Quyền của Chủ sở hữu (User)\">r w x</span>\n              <span style=\"color:#56d364;\" title=\"Quyền của Nhóm (Group)\">r - x</span>\n              <span style=\"color:#d2a8ff;\" title=\"Quyền của Người khác (Others)\">r - -</span>\n            </div>\n            <div style=\"display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 135px), 1fr));gap:8px;text-align:center;margin-top:10px;\">\n              <div style=\"padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;\"><strong style=\"color:#dc2626;font-family:var(--font-mono);font-size:0.8rem;white-space:nowrap;\">Loại file</strong><div style=\"font-size:0.76rem;color:var(--text-secondary);margin-top:2px;white-space:nowrap;\"><code>-</code> File, <code>d</code> Thư mục</div></div>\n              <div style=\"padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;\"><strong style=\"color:var(--accent-primary);font-family:var(--font-mono);font-size:0.8rem;white-space:nowrap;\">User (u) = 7</strong><div style=\"font-size:0.76rem;color:var(--text-secondary);margin-top:2px;white-space:nowrap;\">r(4) + w(2) + x(1)</div></div>\n              <div style=\"padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;\"><strong style=\"color:var(--success);font-family:var(--font-mono);font-size:0.8rem;white-space:nowrap;\">Group (g) = 5</strong><div style=\"font-size:0.76rem;color:var(--text-secondary);margin-top:2px;white-space:nowrap;\">r(4) + -(0) + x(1)</div></div>\n              <div style=\"padding:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;\"><strong style=\"color:#8b5cf6;font-family:var(--font-mono);font-size:0.8rem;white-space:nowrap;\">Others (o) = 4</strong><div style=\"font-size:0.76rem;color:var(--text-secondary);margin-top:2px;white-space:nowrap;\">r(4) + -(0) + -(0)</div></div>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Hệ bát phân và các bộ quyền chuẩn mực trong quản trị",
          "content": "\n            <p>Mỗi quyền hạn được gán một giá trị nhị phân tương ứng:</p>\n            <ul>\n              <li><strong><code>r</code> (Read):</strong> Giá trị <strong>4</strong>.</li>\n              <li><strong><code>w</code> (Write):</strong> Giá trị <strong>2</strong>.</li>\n              <li><strong><code>x</code> (Execute):</strong> Giá trị <strong>1</strong>.</li>\n              <li><strong><code>-</code> (Không có quyền):</strong> Giá trị <strong>0</strong>.</li>\n            </ul>\n            <p>Bằng cách cộng các số này lại, ta có 3 con số bát phân đại diện cho quyền:</p>\n            <ul>\n              <li><code>755</code> (<code>rwxr-xr-x</code>): Chuẩn mực cho <strong>thư mục</strong> và các <strong>file script/chương trình thực thi</strong> (chủ nhân toàn quyền, mọi người được đọc và thực thi).</li>\n              <li><code>644</code> (<code>rw-r--r--</code>): Chuẩn mực cho các <strong>file tài liệu, mã nguồn thông thường</strong> (chủ nhân đọc ghi, mọi người chỉ được đọc).</li>\n              <li><code>600</code> (<code>rw-------</code>): Chuẩn mực bắt buộc cho <strong>file chứa bí mật</strong> (SSH private key, mật khẩu database, file <code>.env</code> — chỉ duy nhất chủ nhân được đọc ghi, cấm toàn bộ người khác).</li>\n              <li><code>700</code> (<code>rwx------</code>): Chuẩn mực cho thư mục bí mật (thư mục <code>~/.ssh</code>).</li>\n            </ul>\n          ",
          "codeExamples": [
            {
              "title": "Thay đổi quyền hạn file bằng lệnh chmod",
              "lang": "Bash",
              "code": "# Tạo file script Python\ntouch deploy.sh\n\n# Cấp quyền thực thi cho chủ sở hữu\nchmod +x deploy.sh\n\n# Đặt quyền bí mật 600 cho file chứa mật khẩu môi trường\nchmod 600 .env\n\n# Đặt quyền chuẩn 755 cho toàn bộ thư mục chứa code\nchmod 755 /var/www/myproject",
              "output": "(Lệnh thực thi âm thầm thành công không báo lỗi)",
              "annotations": [
                {
                  "part": "chmod +x",
                  "text": "Dạng ký hiệu: thêm quyền execute (x) cho file."
                },
                {
                  "part": "chmod 600 .env",
                  "text": "Dạng bát phân: khóa chặt file chỉ riêng chủ sở hữu được đọc/ghi."
                }
              ]
            },
            {
              "title": "Đổi chủ sở hữu và nhóm với lệnh chown",
              "lang": "Bash",
              "code": "# Xem chủ sở hữu hiện tại\nls -l app.py\n\n# Đổi chủ sở hữu sang user 'www-data' và nhóm 'www-data' (cần sudo)\nsudo chown www-data:www-data app.py\n\n# Đổi đệ quy toàn bộ thư mục dự án\nsudo chown -R www-data:www-data /var/www/myproject",
              "output": "-rw-r--r-- 1 ubuntu   ubuntu   120 Oct 28 10:20 app.py\n(Sau khi chạy chown)\n-rw-r--r-- 1 www-data www-data 120 Oct 28 10:20 app.py",
              "annotations": [
                {
                  "part": "sudo chown",
                  "text": "Change Owner: chỉ tài khoản root mới có quyền sang tên đổi chủ của file/thư mục."
                },
                {
                  "part": "user:group",
                  "text": "Cú pháp quy định đồng thời cả tên user sở hữu và tên group sở hữu."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Cảnh báo Đỏ: Lỗ hổng bảo mật chết người với chmod -R 777",
          "content": "\n            <p>Nhiều lập trình viên khi gặp lỗi <code>Permission denied</code> thường vội vã lên mạng tìm kiếm và copy lệnh: <code>chmod -R 777 ...</code>.</p>\n            <div class=\"callout-box callout-danger lx-danger-strong\">\n              <div class=\"callout-header\">\n                <span class=\"lx-badge-danger\">CẢNH BÁO NGUY CƠ BẢO MẬT</span>\n                <span>Tuyệt đối không dùng <code>chmod -R 777</code> trên môi trường Server!</span>\n              </div>\n              <div class=\"callout-body\">\n                <p>Quyền <code>777</code> nghĩa là <code>rwxrwxrwx</code>: <strong>BẤT KỲ AI trên thế giới</strong> cũng có toàn quyền đọc, ghi đè, xóa hoặc thực thi mã độc vào file của bạn. Nếu bạn gán 777 cho thư mục web, hacker chỉ cần tải lên một file script PHP/Python nhỏ là có thể chiếm toàn bộ quyền kiểm soát máy chủ!</p>\n                <div class=\"lx-safe-alternative\">\n                  <span class=\"lx-badge-safe\">CÁCH LÀM CHUẨN MỰC CHUYÊN NGHIỆP</span>\n                  <div style=\"margin-top:6px;\">1. <strong>Đúng chủ sở hữu:</strong> Chuyển quyền sở hữu cho đúng user dịch vụ bằng <code>chown user:group</code> thay vì mở toang quyền 777.</div>\n                  <div>2. <strong>Quyền tối thiểu cho file:</strong> Dùng <code>chmod 644</code> cho file mã nguồn và <code>chmod 600</code> cho file cấu hình nhạy cảm.</div>\n                  <div>3. <strong>Quyền tối thiểu cho thư mục:</strong> Dùng <code>chmod 755</code> cho thư mục để dịch vụ có thể duyệt file bên trong.</div>\n                </div>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        }
      ],
      "scenario": {
        "title": "Bảo vệ khóa SSH và file .env của dự án Python trước khi chạy dịch vụ",
        "content": "\n          <p>Khi bạn tạo file cấu hình <code>.env</code> chứa khóa API bí mật của dịch vụ OpenAI hoặc thông tin đăng nhập Database:</p>\n          <ol>\n            <li>Nếu để quyền mặc định <code>644</code>, bất kỳ người dùng nào khác có tài khoản trên máy chủ cũng có thể mở ra đọc trộm token.</li>\n            <li>Chạy ngay lệnh: <code>chmod 600 .env</code>.</li>\n            <li>Lúc này, chỉ có bạn và tiến trình Python chạy dưới quyền của bạn mới có thể đọc file. Các tài khoản khác khi cố đọc sẽ bị Linux chặn ngay lập tức với lỗi <code>Permission denied</code>.</li>\n          </ol>\n        "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lệnh SSH từ chối kết nối nếu file khóa private key không được bảo vệ 600",
            "content": "Client SSH của OpenSSH có cơ chế an ninh tích hợp: nếu file private key của bạn (ví dụ: `id_ed25519`) có quyền quá thoáng (như 644 hoặc 777), SSH sẽ lập tức từ chối hoạt động và báo lỗi: `Permissions 0644 for id_ed25519 are too open. It is REQUIRED that your private key files are NOT accessible by others.` Hãy chạy `chmod 600 ~/.ssh/id_ed25519` để khắc phục."
          }
        ],
        "tips": [
          {
            "title": "Chỉ định quyền khác nhau cho thư mục và file trong 1 lệnh duy nhất",
            "content": "Để đặt 755 cho mọi thư mục và 644 cho mọi file bên trong một dự án: `find /path -type d -exec chmod 755 {} +` và `find /path -type f -exec chmod 644 {} +`."
          }
        ]
      },
      "exercises": [
        {
          "level": "Vừa",
          "title": "Khóa chặt bảo mật file cấu hình nhạy cảm",
          "problem": "Tạo một file tên `database.secrets`. Đặt quyền cho file này sao cho chỉ có chủ nhân được đọc và ghi, nhóm và người ngoài không có bất kỳ quyền nào. Kiểm tra lại bằng lệnh ls -l.",
          "hint": "Dùng lệnh chmod với giá trị bát phân thích hợp.",
          "solutionCode": "touch database.secrets\nchmod 600 database.secrets\nls -l database.secrets",
          "solutionOutput": "-rw------- 1 ubuntu ubuntu 0 Oct 28 10:25 database.secrets",
          "explanation": "Chuỗi quyền hiển thị chính xác là -rw------- tương ứng với mã bát phân 600.",
          "annotations": [
            {
              "part": "chmod 600",
              "text": "Thiết lập quyền rw------- tuyệt đối an toàn cho file nhạy cảm."
            }
          ]
        }
      ],
      "summary": [
        "Quyền trên Linux gồm 3 nhóm: User (u), Group (g), Others (o) với 3 quyền cơ bản: Read (4), Write (2), Execute (1).",
        "Bộ quyền chuẩn: 755 cho thư mục/script, 644 cho file thường, 600 cho file bí mật.",
        "Tuyệt đối cấm dùng `chmod -R 777`; giải quyết tận gốc lỗi Permission Denied bằng cách sửa đúng quyền sở hữu với `chown`."
      ]
    },
    {
      "id": "lx-1-07",
      "number": "1.7",
      "title": "Trình Quản lý Gói (`apt`, `dnf`, `pacman`): Bảng So sánh 3 Họ Distro & Môi trường Python (PEP 668)",
      "subtitle": "Hiểu rõ triết lý quản lý gói của các hệ điều hành và gỡ bỏ rào cản externally-managed-environment",
      "level": "Cơ bản",
      "duration": "40 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "Hiểu bản chất Kho lưu trữ gói (Repository), Gói phần mềm nhị phân và Cây phụ thuộc (Dependencies).",
        "Nắm vững bảng quy đổi lệnh thao tác giữa 3 họ: Debian/Ubuntu (`apt`), RHEL/Fedora (`dnf`) và Arch (`pacman`).",
        "Hiểu lý do vì sao không bao giờ được gỡ Python hệ thống.",
        "Hiểu bản chất chuẩn PEP 668 (`externally-managed-environment`) trên Linux hiện đại và cách dùng `venv` chuẩn chỉ."
      ],
      "intuition": {
        "title": "Kho ứng dụng xác thực và Hộp cầu chì Python hệ thống",
        "metaphor": "Trình quản lý gói trên Linux giống như App Store chính chủ trên điện thoại. Thay vì bạn phải lên Google tìm file exe trôi nổi tiềm ẩn virus, distro cung cấp một kho phần mềm khổng lồ đã được các kỹ sư kiểm thử bảo mật và ký số xác thực. Khi bạn muốn cài Nginx, bạn chỉ cần gõ 1 lệnh; trình quản lý gói sẽ tự động đi tìm tất cả các thư viện liên quan (dependencies) tải về và lắp ráp hoàn hảo. Còn việc bảo vệ Python hệ thống giống như chiếc hộp cầu chì của tòa nhà: Linux dùng Python để chạy các công cụ quản trị cốt lõi; nếu bạn chạy pip bừa bãi đè file vào đó, toàn bộ hệ thống điều khiển có thể bị chập cháy tê liệt.",
        "visualHtml": "\n          <div style=\"padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-sans);font-size:0.83rem;\">\n            <div style=\"font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:10px;\">BẢNG QUY ĐỔI LỆNH QUẢN LÝ GÓI GIỮA 3 HỌ DISTRO</div>\n            <div class=\"table-responsive\" style=\"margin:0;\">\n              <table class=\"lesson-table\" style=\"margin:0;\">\n                <thead>\n                  <tr>\n                    <th>Tác vụ</th>\n                    <th>Debian / Ubuntu</th>\n                    <th>RHEL / Rocky / Fedora</th>\n                    <th>Arch Linux</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Cập nhật chỉ mục</strong></td>\n                    <td><code>sudo apt update</code></td>\n                    <td><code>sudo dnf check-update</code></td>\n                    <td><code>sudo pacman -Sy</code></td>\n                  </tr>\n                  <tr>\n                    <td><strong>Nâng cấp hệ thống</strong></td>\n                    <td><code>sudo apt upgrade -y</code></td>\n                    <td><code>sudo dnf upgrade -y</code></td>\n                    <td><code>sudo pacman -Syu</code></td>\n                  </tr>\n                  <tr>\n                    <td><strong>Cài đặt gói mới</strong></td>\n                    <td><code>sudo apt install &lt;pkg&gt;</code></td>\n                    <td><code>sudo dnf install &lt;pkg&gt;</code></td>\n                    <td><code>sudo pacman -S &lt;pkg&gt;</code></td>\n                  </tr>\n                  <tr>\n                    <td><strong>Gỡ bỏ gói</strong></td>\n                    <td><code>sudo apt remove &lt;pkg&gt;</code></td>\n                    <td><code>sudo dnf remove &lt;pkg&gt;</code></td>\n                    <td><code>sudo pacman -R &lt;pkg&gt;</code></td>\n                  </tr>\n                  <tr>\n                    <td><strong>Tìm kiếm gói</strong></td>\n                    <td><code>apt search &lt;key&gt;</code></td>\n                    <td><code>dnf search &lt;key&gt;</code></td>\n                    <td><code>pacman -Ss &lt;key&gt;</code></td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Chu trình quản lý gói phần mềm chuẩn mực",
          "content": "\n            <p>Trên họ Debian/Ubuntu, bạn luôn cần chạy hai bước phân biệt:</p>\n            <ol>\n              <li><code>sudo apt update</code>: Tải danh sách thông tin phiên bản mới nhất từ các máy chủ repository về máy (chưa nâng cấp phần mềm nào).</li>\n              <li><code>sudo apt upgrade -y</code>: So sánh danh sách vừa tải với phiên bản đang cài trên máy để tiến hành tải bản vá và nâng cấp thực tế.</li>\n            </ol>\n            <p>Dọn dẹp các thư viện phụ thuộc thừa thãi không còn ai sử dụng bằng lệnh <code>sudo apt autoremove</code> để giải phóng dung lượng ổ cứng.</p>\n          ",
          "codeExamples": [
            {
              "title": "Cài đặt các gói phụ trợ cần thiết cho lập trình Python trên Ubuntu",
              "lang": "Bash",
              "code": "# 1. Cập nhật chỉ mục kho gói\nsudo apt update\n\n# 2. Cài đặt Python 3, module venv và công cụ biên dịch\nsudo apt install -y python3 python3-pip python3-venv build-essential\n\n# 3. Dọn dẹp các gói thừa\nsudo apt autoremove -y",
              "output": "Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease\nGet:2 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]\nFetched 126 kB in 1s (145 kB/s)\nReading package lists... Done\npython3-venv is already the newest version.\n0 upgraded, 0 newly installed, 0 to remove.",
              "annotations": [
                {
                  "part": "sudo apt update",
                  "text": "Cập nhật danh mục gói từ máy chủ phần mềm."
                },
                {
                  "part": "-y",
                  "text": "Tự động đồng ý (Yes) với các câu hỏi xác nhận dung lượng đĩa khi cài."
                },
                {
                  "part": "build-essential",
                  "text": "Gói meta chứa trình biên dịch GCC, make cần thiết khi cài thư viện Python viết bằng C (như numpy, cryptography)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Bản chất PEP 668: Xử lý lỗi externally-managed-environment",
          "content": "\n            <p>Kể từ Ubuntu 23.04+, Debian 12+ và Fedora mới, khi bạn gõ <code>pip install &lt;thư-viện&gt;</code>, hệ thống sẽ chặn đứng và báo lỗi:</p>\n            <p><code>error: externally-managed-environment</code></p>\n            <p><strong>Lý do:</strong> Python trên Linux là một phần của hệ điều hành. Nếu bạn dùng <code>pip</code> cài đè thư viện toàn cục vào <code>/usr/lib/python3/dist-packages/</code>, nó có thể xung đột phiên bản với các công cụ hệ thống (như trình quản lý mạng, tường lửa) khiến máy chủ bị hỏng.</p>\n            <p><strong>Giải pháp chuẩn chỉ 100%:</strong> Luôn tạo môi trường ảo (virtual environment) riêng cho từng dự án bằng module <code>venv</code>:</p>\n          ",
          "codeExamples": [
            {
              "title": "Quy trình khởi tạo môi trường ảo Python venv chuẩn mực",
              "lang": "Bash",
              "code": "# 1. Cài đặt gói python3-venv của hệ điều hành (chỉ làm 1 lần)\nsudo apt install -y python3-venv\n\n# 2. Đi vào thư mục dự án và tạo môi trường ảo tên .venv\nmkdir -p my-api && cd my-api\npython3 -m venv .venv\n\n# 3. Kích hoạt môi trường ảo\nsource .venv/bin/activate\n\n# 4. Lúc này đầu dòng sẽ có (.venv). Bạn thoải mái dùng pip cài thư viện an toàn!\npip install requests flask",
              "output": "(.venv) ubuntu@server:~/my-api$ pip install requests flask\nCollecting requests\n  Downloading requests-2.32.3-py3-none-any.whl (64 kB)\nSuccessfully installed certifi-2024.8.30 charset-normalizer-3.4.0 flask-3.0.3 idna-3.10 requests-2.32.3 urllib3-2.2.3",
              "annotations": [
                {
                  "part": "python3 -m venv .venv",
                  "text": "Tạo thư mục .venv độc lập chứa bản sao nhị phân Python và thư mục site-packages riêng."
                },
                {
                  "part": "source .venv/bin/activate",
                  "text": "Kích hoạt môi trường ảo, đưa đường dẫn .venv/bin lên đầu biến PATH."
                }
              ]
            }
          ]
        }
      ],
      "scenario": {
        "title": "Thiết lập server mới chạy ứng dụng Python FastAPI sạch sẽ và an toàn",
        "content": "\n          <p>Khi bàn giao máy chủ mới, quy trình chuẩn của kỹ sư DevOps:</p>\n          <ol>\n            <li>Chạy <code>sudo apt update &amp;&amp; sudo apt upgrade -y</code> để vá các lỗ hổng nhân mới nhất.</li>\n            <li>Cài <code>python3-venv</code> và <code>git</code>.</li>\n            <li>Tạo user riêng, clone code về và khởi tạo <code>python3 -m venv .venv</code>.</li>\n            <li>Cài đặt phụ thuộc qua <code>pip install -r requirements.txt</code> trong môi trường ảo mà không đụng chạm một file nào vào hệ điều hành gốc.</li>\n          </ol>\n        "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Tuyệt đối không dùng cờ --break-system-packages để chống chế",
            "content": "Khi gặp lỗi PEP 668, một số hướng dẫn trên mạng xúi giục gõ `pip install --break-system-packages`. Đúng như tên gọi của cờ này, nó sẽ phá vỡ tính toàn vẹn của các gói hệ thống và có thể làm tê liệt trình quản lý gói apt của bạn!"
          }
        ],
        "tips": [
          {
            "title": "Tìm gói chứa file bị thiếu với apt-file hoặc dnf provides",
            "content": "Nếu một lệnh báo thiếu file thư viện `libpq.so`: trên Ubuntu bạn có thể cài `apt-file` và gõ `apt-file search libpq.so` để biết chính xác cần cài gói nào."
          }
        ]
      },
      "exercises": [
        {
          "level": "Vừa",
          "title": "Khởi tạo môi trường ảo và kiểm tra đường dẫn binary Python",
          "problem": "Tạo thư mục dự án `kiem-tra-env`. Dùng python3 tạo môi trường ảo `.venv`, kích hoạt nó và dùng lệnh `which python3` để chứng minh rằng hệ thống đang gọi Python từ thư mục ảo thay vì từ /usr/bin/python3.",
          "hint": "Dùng lệnh source để kích hoạt file activate.",
          "solutionCode": "mkdir -p kiem-tra-env && cd kiem-tra-env\npython3 -m venv .venv\nsource .venv/bin/activate\nwhich python3",
          "solutionOutput": "/home/ubuntu/kiem-tra-env/.venv/bin/python3",
          "explanation": "Lệnh which python3 cho thấy đường dẫn đã trỏ chính xác vào thư mục .venv/bin/ của dự án.",
          "annotations": [
            {
              "part": "which python3",
              "text": "Xác nhận Python đang được thực thi từ môi trường ảo cô lập."
            }
          ]
        }
      ],
      "summary": [
        "Mỗi họ distro có trình quản lý gói riêng: Debian/Ubuntu (apt), RHEL/Fedora (dnf), Arch (pacman).",
        "Python là thành phần cốt lõi của Linux; tuyệt đối không gỡ bỏ Python hệ thống.",
        "Tuân thủ chuẩn PEP 668: luôn tạo môi trường ảo `python3 -m venv .venv` cho mọi dự án."
      ]
    },
    {
      "id": "lx-1-08",
      "number": "1.8",
      "title": "Chuyển hướng I/O, Pipe (`|`), Globbing & Biến Môi trường (`PATH`, `export`, Shebang)",
      "subtitle": "Lắp ghép sức mạnh đường ống Unix, lọc ký tự đại diện và nguyên lý tìm kiếm lệnh của biến PATH",
      "level": "Cơ bản",
      "duration": "45 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Làm chủ 3 luồng chuẩn: Nhập chuẩn `stdin (0)`, Xuất chuẩn `stdout (1)` và Báo lỗi chuẩn `stderr (2)`.",
        "Sử dụng các toán tử chuyển hướng `>`, `>>`, `2>`, `2>&1` và `/dev/null`.",
        "Hiểu bản chất của Đường ống Pipe (`|`) kết nối đầu ra lệnh này thành đầu vào lệnh kia.",
        "Phân biệt Ký tự đại diện Shell Globbing (`*`, `?`, `[...]`) với Biểu thức chính quy (Regex).",
        "Hiểu cơ chế biến môi trường `export`, cấu trúc biến `$PATH` và dòng shebang `#!/usr/bin/env python3`."
      ],
      "intuition": {
        "title": "Đường ống dẫn nước và Băng chuyền nhà máy tự động",
        "metaphor": "Triết lý Unix dạy rằng: \"Mỗi chương trình chỉ làm tốt một việc duy nhất, và đầu ra của chương trình này có thể làm đầu vào cho chương trình khác\". Hãy tưởng tượng các lệnh như các công nhân trên một băng chuyền. Lệnh `cat` đổ dữ liệu lên băng chuyền; chiếc đường ống `|` đưa dòng dữ liệu đó qua bàn của công nhân `grep` để nhặt ra các hạt đậu hỏng; rồi lại nối đường ống sang công nhân `wc` để đếm số hạt. Ba luồng dữ liệu giống như 3 đường ống nước riêng biệt: ống nước vào xanh lá (`stdin`), ống nước ra sạch (`stdout`) và ống thoát nước thải riêng biệt (`stderr`). Nhờ tách riêng ống nước thải, khi một chương trình bị lỗi, thông báo đỏ không bao giờ làm bẩn dòng dữ liệu chính của bạn.",
        "visualHtml": "\n          <div style=\"padding:14px 16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-sans);font-size:0.83rem;\">\n            <div style=\"font-family:var(--font-mono);font-size:0.82rem;font-weight:700;color:var(--accent-text);text-align:center;margin-bottom:12px;\">MÔ HÌNH 3 LUỒNG I/O CHUẨN VÀ ĐƯỜNG ỐNG PIPE</div>\n            <div style=\"display:flex;justify-content:center;align-items:center;flex-wrap:nowrap;gap:10px;overflow-x:auto;padding-bottom:2px;\">\n              <div style=\"padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;white-space:nowrap;flex-shrink:0;\">\n                <div style=\"color:var(--text-muted);font-size:0.74rem;font-family:var(--font-mono);\">FD 0</div>\n                <div style=\"font-weight:700;color:var(--success);font-family:var(--font-mono);\">stdin (Nhập)</div>\n                <div style=\"font-size:0.76rem;color:var(--text-secondary);\">Bàn phím / File <code>&lt;</code></div>\n              </div>\n              <div style=\"font-size:1.25rem;color:var(--accent-primary);flex-shrink:0;\">➔</div>\n              <div style=\"padding:10px 14px;background:var(--accent-soft);border:1px solid var(--accent-soft-border);border-radius:6px;text-align:center;white-space:nowrap;flex-shrink:0;\">\n                <div style=\"color:var(--accent-text);font-size:0.74rem;\">Tiến trình xử lý</div>\n                <div style=\"font-weight:700;color:var(--accent-primary);font-family:var(--font-mono);\">Command</div>\n                <div style=\"font-size:0.76rem;color:var(--text-secondary);\">Process</div>\n              </div>\n              <div style=\"font-size:1.25rem;color:var(--accent-primary);flex-shrink:0;\">➔</div>\n              <div style=\"display:flex;flex-direction:column;gap:6px;flex-shrink:0;\">\n                <div style=\"padding:7px 12px;background:var(--bg-surface);border:1px solid var(--success-border);border-radius:6px;white-space:nowrap;\">\n                  <span style=\"color:var(--success);font-weight:700;font-family:var(--font-mono);\">stdout (1):</span> Xuất kết quả <code>&gt;</code> hoặc <code>|</code>\n                </div>\n                <div style=\"padding:7px 12px;background:var(--danger-bg);border:1px solid var(--danger-border);border-radius:6px;white-space:nowrap;\">\n                  <span style=\"color:var(--danger);font-weight:700;font-family:var(--font-mono);\">stderr (2):</span> Báo lỗi riêng <code>2&gt;</code>\n                </div>\n              </div>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Chuyển hướng dữ liệu và \"Hố đen vũ trụ\" /dev/null",
          "content": "\n            <p>Các toán tử chuyển hướng cơ bản:</p>\n            <ul>\n              <li><code>&gt; file.txt</code>: Chuyển hướng <code>stdout</code> vào file (<strong>ghi đè toàn bộ nội dung cũ</strong>).</li>\n              <li><code>&gt;&gt; file.txt</code>: Chuyển hướng <code>stdout</code> vào file (<strong>ghi nối tiếp vào cuối file</strong>).</li>\n              <li><code>2&gt; error.log</code>: Chỉ chuyển hướng luồng lỗi <code>stderr</code> vào file.</li>\n              <li><code>&gt; output.log 2&gt;&amp;1</code> hoặc cú pháp ngắn <code>&amp;&gt; output.log</code>: Gom cả luồng kết quả và luồng lỗi vào chung một file.</li>\n              <li><code>2&gt; /dev/null</code>: Vứt bỏ toàn bộ thông báo lỗi vào \"hố đen\" của hệ thống để màn hình terminal sạch sẽ.</li>\n            </ul>\n            <div class=\"callout-box callout-danger lx-danger-strong\">\n              <div class=\"callout-header\">\n                <span class=\"lx-badge-danger\">CẢNH BÁO MẤT DỮ LIỆU</span>\n                <span>Cẩn trọng tuyệt đối khi dùng toán tử ghi đè <code>&gt;</code>!</span>\n              </div>\n              <div class=\"callout-body\">\n                <p>Toán tử <code>&gt;</code> sẽ ngay lập tức cắt cụt (truncate) file về kích thước 0 byte trước khi câu lệnh bắt đầu chạy. Nếu bạn gõ <code>cat file.txt &gt; file.txt</code> với ý định lọc file, file đó sẽ biến thành rỗng ngay lập tức và mất sạch dữ liệu! Luôn dùng <code>&gt;&gt;</code> để ghi nối tiếp hoặc ghi ra một file tạm mới.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": [
            {
              "title": "Thực hành tách riêng luồng kết quả và luồng lỗi",
              "lang": "Bash",
              "code": "# Chạy lệnh tìm kiếm, tách kết quả tìm thấy vào ketqua.txt và vứt lỗi Permission denied vào /dev/null\nfind /etc -name \"*.conf\" > ketqua.txt 2> /dev/null\n\n# Xem 3 kết quả đầu tiên tìm được\nhead -n 3 ketqua.txt",
              "output": "/etc/resolv.conf\n/etc/logrotate.conf\n/etc/sysctl.conf",
              "annotations": [
                {
                  "part": "> ketqua.txt",
                  "text": "Chỉ ghi luồng xuất chuẩn (stdout) vào file."
                },
                {
                  "part": "2> /dev/null",
                  "text": "Triệt tiêu toàn bộ các dòng báo lỗi quyền hạn vào thiết bị ảo /dev/null."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Đường ống Pipe (|) và Biến môi trường PATH",
          "content": "\n            <p><strong>Pipe (<code>|</code>):</strong> Nối trực tiếp <code>stdout</code> của chương trình bên trái thành <code>stdin</code> của chương trình bên phải mà không cần lưu qua file trung gian trên ổ cứng.</p>\n            <p><strong>Biến môi trường <code>PATH</code>:</strong> Khi bạn gõ lệnh <code>python3</code>, làm sao Linux biết file đó nằm ở đâu để chạy? Linux không quét toàn bộ ổ cứng mà sẽ duyệt lần lượt qua danh sách các thư mục được khai báo trong biến <code>$PATH</code> (ngăn cách nhau bởi dấu hai chấm <code>:</code>). Nếu tìm thấy file thực thi đầu tiên, nó sẽ chạy ngay lập tức.</p>\n            <p><strong>Dòng Shebang:</strong> Dòng đầu tiên trong script: <code>#!/usr/bin/env python3</code> chỉ dẫn cho shell biết phải dùng trình thông dịch Python được tìm thấy trong biến <code>$PATH</code> để chạy tệp này.</p>\n          ",
          "codeExamples": [
            {
              "title": "Ghép nối đường ống Pipe và Khảo sát biến PATH",
              "lang": "Bash",
              "code": "# Lấy danh sách kết nối mạng, lọc cổng 80 và đếm số dòng\nss -tulpn | grep \":80\" | wc -l\n\n# In danh sách các thư mục tìm kiếm trong biến PATH\necho $PATH",
              "output": "0\n/home/ubuntu/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
              "annotations": [
                {
                  "part": "ss -tulpn | grep",
                  "text": "Pipe chuyển danh sách socket của ss sang cho grep lọc dữ liệu."
                },
                {
                  "part": "echo $PATH",
                  "text": "In ra danh sách các thư mục chứa lệnh được ưu tiên từ trái qua phải."
                }
              ]
            }
          ]
        }
      ],
      "scenario": {
        "title": "Chạy script Python dưới dạng lệnh hệ thống có thể gõ từ bất kỳ đâu",
        "content": "\n          <p>Bạn viết một công cụ dọn dẹp hệ thống bằng Python tên là <code>cleanup.py</code>:</p>\n          <ol>\n            <li>Thêm dòng shebang ở đầu file: <code>#!/usr/bin/env python3</code>.</li>\n            <li>Cấp quyền thực thi: <code>chmod +x cleanup.py</code>.</li>\n            <li>Di chuyển file vào thư mục người dùng: <code>mv cleanup.py ~/.local/bin/cleanup</code>.</li>\n            <li>Vì <code>~/.local/bin</code> nằm trong <code>$PATH</code> của bạn, giờ đây từ bất kỳ thư mục nào trên server, bạn chỉ cần gõ <code>cleanup</code> là chương trình Python sẽ tự động chạy!</li>\n          </ol>\n        "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi ghi đè làm mất sạch biến PATH khi export",
            "content": "Khi muốn thêm thư mục mới vào PATH, cú pháp chuẩn là: `export PATH=\"$HOME/.local/bin:$PATH\"`. Nếu bạn gõ thiếu `$PATH` ở đuôi thành `export PATH=\"$HOME/.local/bin\"`, toàn bộ các lệnh cơ bản như `ls`, `cp`, `mv` sẽ lập tức báo `command not found` vì đường dẫn cũ đã bị xóa sạch!"
          }
        ],
        "tips": [
          {
            "title": "Ghi log đồng thời vừa ra màn hình vừa vào file với tee",
            "content": "Dùng lệnh `tee`: `python3 app.py | tee -a app.log`. Dữ liệu vừa được in trực tiếp ra terminal cho bạn xem, vừa được ghi nối tiếp vào file `app.log`."
          }
        ]
      },
      "exercises": [
        {
          "level": "Vừa",
          "title": "Đếm số lượng tài khoản người dùng có shell đăng nhập",
          "problem": "Dùng đường ống pipe kết hợp lệnh cat, grep và wc để đếm xem trong file /etc/passwd có bao nhiêu tài khoản có shell kết thúc bằng /bin/bash.",
          "hint": "Dùng grep \"/bin/bash\" và nối sang wc -l.",
          "solutionCode": "grep -c \"/bin/bash\" /etc/passwd",
          "solutionOutput": "2",
          "explanation": "Lệnh grep với cờ -c tự động đếm số dòng khớp mẫu, hoặc có thể dùng grep \"/bin/bash\" /etc/passwd | wc -l.",
          "annotations": [
            {
              "part": "grep -c",
              "text": "Đếm số dòng khớp tiêu chí."
            }
          ]
        }
      ],
      "summary": [
        "Ba luồng I/O chuẩn: stdin (0), stdout (1) và stderr (2). Dùng `>` để ghi đè và `>>` để ghi nối tiếp.",
        "Đường ống `|` kết nối đầu ra lệnh trước làm đầu vào lệnh sau, tạo nên sức mạnh tự động hóa của Unix.",
        "Biến `$PATH` quy định các thư mục tìm kiếm file thực thi; dòng shebang `#!/usr/bin/env python3` giúp script tự tìm đúng trình thông dịch."
      ]
    },
    {
      "id": "lx-1-09",
      "number": "1.9",
      "title": "Nén, Lưu trữ và Đóng gói Dữ liệu (`tar`, `gzip`, `xz`, `zip`)",
      "subtitle": "Phân định rõ lưu trữ vs nén dung lượng, giải mã các cờ lệnh tar và kỹ thuật đóng gói bản phát hành Python",
      "level": "Cơ bản",
      "duration": "35 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Hiểu lý do vì sao Linux tách biệt giữa \"Đóng gói lưu trữ\" (`tar`) và \"Nén dung lượng\" (`gzip`, `xz`).",
        "Giải mã ý nghĩa từng cờ của lệnh tar: `-c`, `-x`, `-t`, `-v`, `-f`, `-z`, `-J`, `-C`.",
        "So sánh thuật toán nén `gzip` (nhanh, phổ biến) vs `xz` (tỷ lệ nén cực cao cho bản phát hành).",
        "Đóng gói mã nguồn dự án Python loại bỏ các thư mục rác `__pycache__` và `.venv`."
      ],
      "intuition": {
        "title": "Thùng carton xếp đồ và Máy hút chân không",
        "metaphor": "Trên Windows, tệp `.zip` làm cả hai việc cùng lúc: vừa gom nhiều file thành một, vừa nén nhỏ lại. Trên Linux, hai việc này được tách bạch theo triết lý module hóa: `tar` (Tape Archive - ra đời từ thời lưu băng từ) là chiếc thùng carton dùng để gom 1.000 file/thư mục lại thành MỘT file duy nhất nhưng chưa nén (kích thước vẫn bằng tổng các file). Sau đó, bạn đưa chiếc thùng đó qua máy hút chân không `gzip` (biến thành `.tar.gz`) hoặc máy hút siêu áp lực `xz` (biến thành `.tar.xz`) để ép chặt dung lượng xuống nhỏ nhất có thể.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📦</span>\n                    <span>ĐÓNG GÓI (tar)</span>\n                    <span class=\"lx-vs-tag\">Tape Archive</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bản chất:</strong> Gom hàng trăm file/thư mục lẻ thành 1 tệp duy nhất <code>.tar</code> nhưng KHÔNG hề nén dung lượng.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bảo toàn metadata:</strong> Giữ nguyên vẹn quyền truy cập (rwx), user sở hữu và mtime của file.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Quy tắc an toàn:</strong> Luôn kiểm tra nội dung gói bằng <code>tar -tvf</code> trước khi giải nén.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🗜️</span>\n                    <span>NÉN DUNG LƯỢNG</span>\n                    <span class=\"lx-vs-tag\">gzip / xz</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bản chất:</strong> Áp dụng thuật toán toán học (Deflate, LZMA) để rút gọn kích thước byte.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>gzip (-z):</strong> Nén rất nhanh, tỷ lệ nén tốt, phổ biến nhất trên Internet (<code>.tar.gz</code>).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>xz (-J):</strong> Nén cực chặt, tiết kiệm dung lượng đĩa tối đa nhưng tốn nhiều CPU hơn.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Giải mã cú pháp và các cờ lệnh của tar",
          "content": "\n            <p>Bốn thao tác kinh điển với <code>tar</code> bạn cần thuộc lòng:</p>\n            <ul>\n              <li><strong>Tạo gói nén gzip:</strong> <code>tar -czvf &lt;ten-file.tar.gz&gt; &lt;thu-muc-nguon&gt;</code>.</li>\n              <li><strong>Xem danh sách nội dung bên trong mà không giải nén:</strong> <code>tar -tvf &lt;ten-file.tar.gz&gt;</code>.</li>\n              <li><strong>Giải nén tại chỗ:</strong> <code>tar -xzvf &lt;ten-file.tar.gz&gt;</code>.</li>\n              <li><strong>Giải nén vào một thư mục đích cụ thể:</strong> <code>tar -xzvf &lt;ten-file.tar.gz&gt; -C /duong/dan/dich</code>.</li>\n            </ul>\n            <p>Giải nghĩa các cờ lệnh:</p>\n            <ul>\n              <li><code>-c</code> (create): Tạo gói lưu trữ mới.</li>\n              <li><code>-x</code> (extract): Giải nén gói lưu trữ.</li>\n              <li><code>-t</code> (list): Liệt kê mục lục bên trong gói.</li>\n              <li><code>-v</code> (verbose): In chi tiết tên từng file đang được xử lý.</li>\n              <li><code>-f</code> (file): Chỉ định tên file lưu trữ (<strong>cờ này luôn phải đứng ngay trước tên file!</strong>).</li>\n              <li><code>-z</code>: Dùng thuật toán nén <code>gzip</code> (.tar.gz).</li>\n              <li><code>-J</code>: Dùng thuật toán nén <code>xz</code> (.tar.xz - nén chặt nhất).</li>\n            </ul>\n          ",
          "codeExamples": [
            {
              "title": "Đóng gói mã nguồn và giải nén an toàn",
              "lang": "Bash",
              "code": "# 1. Đóng gói thư mục myproject thành file nén .tar.gz\ntar -czvf myproject-backup.tar.gz myproject/\n\n# 2. Xem nhanh dung lượng gói nén\nls -lh myproject-backup.tar.gz\n\n# 3. Xem danh sách file bên trong trước khi giải nén\ntar -tvf myproject-backup.tar.gz | head -n 5\n\n# 4. Giải nén vào thư mục tạm /tmp/restore\nmkdir -p /tmp/restore\ntar -xzvf myproject-backup.tar.gz -C /tmp/restore",
              "output": "myproject/\nmyproject/app/\nmyproject/app/main.py\nmyproject/config/\nmyproject/config/settings.env\n-rw-r--r-- 1 ubuntu ubuntu 45K Oct 28 10:30 myproject-backup.tar.gz",
              "annotations": [
                {
                  "part": "-czvf",
                  "text": "Tạo gói mới (c), nén gzip (z), in tiến độ (v), tên file (f)."
                },
                {
                  "part": "-C /tmp/restore",
                  "text": "Cờ -C thay đổi thư mục đích giải nén, tránh làm xáo trộn thư mục hiện tại."
                }
              ]
            }
          ]
        }
      ],
      "scenario": {
        "title": "Đóng gói mã nguồn ứng dụng Python sạch sẽ để phát hành (Release)",
        "content": "\n          <p>Khi đóng gói mã nguồn Python gửi cho khách hàng hoặc đưa lên máy chủ triển khai, bạn không bao giờ được nhét thư mục môi trường ảo <code>.venv</code> (nặng hàng trăm MB) hoặc các file bytecode rác <code>__pycache__</code>:</p>\n          <p>Sử dụng cờ <code>--exclude</code> của lệnh tar:</p>\n          <p><code>tar --exclude='.venv' --exclude='__pycache__' --exclude='.git' -czvf release-v1.0.tar.gz myproject/</code></p>\n          <p>Gói nén tạo ra sẽ cực kỳ nhỏ gọn (chỉ vài trăm KB), sạch sẽ và mang tính chuyên nghiệp cao.</p>\n        "
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Tránh lỗi \"Tarbomb\" khi tạo file nén",
            "content": "Tarbomb là tình trạng một file nén khi giải nén ra lại bung hàng trăm file vụn vặt tràn ngập thư mục hiện tại thay vì nằm trong một thư mục bọc ngoài. Luôn luôn đứng ở thư mục cha và đóng gói cả thư mục (`tar -czvf pkg.tar.gz my-dir/`), không nên `cd` vào trong rồi `tar -czvf pkg.tar.gz *`."
          }
        ],
        "tips": [
          {
            "title": "Dùng tar với xz cho bản phân phối tải về",
            "content": "Nếu dự án của bạn cần tối ưu băng thông tải về cho người dùng khắp thế giới, hãy dùng cờ `-J` (`.tar.xz`). Thuật toán LZMA2 của xz thường nén nhỏ hơn gzip từ 15% đến 30%."
          }
        ]
      },
      "exercises": [
        {
          "level": "Vừa",
          "title": "Đóng gói loại trừ file tạm",
          "problem": "Tạo thư mục `app_src` chứa 2 file: `app.py` và `debug.log`. Hãy dùng tar đóng gói thư mục này thành `app.tar.gz` nhưng loại trừ hoàn toàn các file có đuôi `.log`.",
          "hint": "Dùng cờ --exclude=\"*.log\".",
          "solutionCode": "mkdir -p app_src && touch app_src/app.py app_src/debug.log\ntar --exclude=\"*.log\" -czvf app.tar.gz app_src/\ntar -tvf app.tar.gz",
          "solutionOutput": "drwxr-xr-x ubuntu/ubuntu     0 2026-10-28 10:35 app_src/\n-rw-r--r-- ubuntu/ubuntu     0 2026-10-28 10:35 app_src/app.py",
          "explanation": "Kết quả kiểm tra tar -tvf xác nhận file debug.log đã được loại trừ thành công, chỉ còn app.py trong gói.",
          "annotations": [
            {
              "part": "--exclude=\"*.log\"",
              "text": "Loại bỏ các file khớp mẫu khỏi gói nén."
            }
          ]
        }
      ],
      "summary": [
        "`tar` đóng gói nhiều file thành một; `gzip` (`-z`) hoặc `xz` (`-J`) nén nhỏ dung lượng.",
        "Bốn cờ cốt lõi: `-c` (tạo), `-x` (giải nén), `-t` (xem trước), `-f` (chỉ định file).",
        "Luôn dùng cờ `--exclude` để loại bỏ các thư mục rác `.venv` và `__pycache__` khi đóng gói mã nguồn Python."
      ]
    },
    {
      "id": "lx-1-10",
      "number": "1.10",
      "title": "Dự án Thực hành Cuối Cấp 1 & Kịch bản Sự cố Tự Chẩn đoán",
      "subtitle": "Tích hợp toàn diện kỹ năng Cấp 1 vào dự án chuẩn bị server sạch cho ứng dụng Python 3.14",
      "level": "Cơ bản",
      "duration": "45 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "Vận dụng toàn bộ kiến thức Cấp 1 để thiết lập một môi trường chạy ứng dụng Python 3.14 hoàn chỉnh trên Linux.",
        "Tổ chức cây thư mục chuẩn FHS, phân quyền bảo mật 600/755, sử dụng môi trường ảo venv.",
        "Tự chẩn đoán và khắc phục 3 kịch bản sự cố kinh điển của người mới bắt đầu."
      ],
      "intuition": {
        "title": "Buổi diễn tập tổng kết giai đoạn tân binh",
        "metaphor": "Học từng lệnh rời rạc giống như tập từng đòn thế võ thuật. Dự án cuối cấp này là trận đấu thực chiến đầu tiên: bạn sẽ nhận một máy chủ Linux vừa cài trắng tinh, tự tay quy hoạch cây thư mục, bảo vệ file mật khẩu, chạy ứng dụng xử lý dữ liệu qua đường ống pipe và đóng gói thành phẩm chuyên nghiệp.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🏗️</span>\n                    <span>DỰ ÁN CUỐI CẤP 1</span>\n                    <span class=\"lx-vs-tag\">5 Bước chuẩn</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 1:</strong> Tạo cấu trúc thư mục ứng dụng và môi trường ảo venv độc lập.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 2:</strong> Phân quyền nghiêm ngặt: code thực thi <code>755</code>, file cấu hình nhạy cảm <code>600</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 3:</strong> Vận hành luồng I/O: nạp dữ liệu qua pipe <code>|</code>, tách riêng log lỗi ra file stderr.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🎯</span>\n                    <span>3 KỊCH BẢN SỰ CỐ</span>\n                    <span class=\"lx-vs-tag\">Tự chẩn đoán</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 1:</strong> Lỗi <em>Permission denied</em> khi chạy script Python (thiếu cờ <code>+x</code>).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 2:</strong> Cài CLI xong gõ báo <em>command not found</em> (thiếu đường dẫn trong <code>PATH</code>).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 3:</strong> Lỗi <em>externally-managed-environment</em> (xử lý chuẩn với venv thay vì pip global).</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-project",
          "title": "Đề bài Dự án Thực hành: Chuẩn bị Server cho Ứng dụng Xử lý Dữ liệu Python",
          "content": "\n            <p><strong>Yêu cầu nghiệp vụ:</strong> Bạn được giao nhiệm vụ chuẩn bị môi trường chạy cho một ứng dụng Python 3.14 trên máy chủ Linux:</p>\n            <ol>\n              <li>Cài đặt các gói hệ thống cần thiết (<code>python3</code>, <code>python3-venv</code>).</li>\n              <li>Tạo cấu trúc thư mục dự án tại <code>/home/ubuntu/data-service</code> gồm các nhánh: <code>src/</code>, <code>config/</code>, <code>logs/</code>, <code>dist/</code>.</li>\n              <li>Tạo môi trường ảo <code>.venv</code> bên trong dự án.</li>\n              <li>Tạo file cấu hình bí mật <code>config/db.env</code> và khóa chặt quyền hạn ở mức <code>600</code>.</li>\n              <li>Viết một script Python <code>src/process.py</code> đọc dữ liệu từ <code>stdin</code>, lọc các dòng có chữ \"ERROR\" và ghi ra <code>stdout</code>.</li>\n              <li>Chạy thử nghiệm nối dữ liệu qua pipe: đưa nội dung mẫu vào script và chuyển hướng kết quả vào <code>logs/error_report.log</code>.</li>\n              <li>Đóng gói toàn bộ mã nguồn sạch (loại trừ <code>.venv</code> và <code>logs</code>) thành tệp <code>dist/data-service-v1.0.tar.gz</code>.</li>\n            </ol>\n          ",
          "codeExamples": [
            {
              "title": "Kịch bản lệnh hoàn chỉnh thực thi toàn bộ Dự án Cấp 1",
              "lang": "Bash",
              "code": "# 1. Cài đặt các gói phụ trợ\nsudo apt update && sudo apt install -y python3 python3-venv\n\n# 2. Tạo cây thư mục dự án\nmkdir -p ~/data-service/{src,config,logs,dist}\ncd ~/data-service\n\n# 3. Tạo môi trường ảo\npython3 -m venv .venv\n\n# 4. Tạo file cấu hình và phân quyền 600\necho \"DB_PASSWORD=<MAT_KHAU_CUA_BAN>\" > config/db.env\nchmod 600 config/db.env\n\n# 5. Viết script Python xử lý luồng stdin\ncat << 'EOF' > src/process.py\n#!/usr/bin/env python3\nimport sys\n\nfor line in sys.stdin:\n    if \"ERROR\" in line:\n        sys.stdout.write(f\"[DETECTED] {line}\")\nEOF\nchmod +x src/process.py\n\n# 6. Thử nghiệm đường ống pipe và chuyển hướng I/O\nprintf \"INFO: App start\nERROR: Connection timeout\nDEBUG: Retrying\n\" | ./src/process.py > logs/error_report.log\n\n# 7. Đóng gói sản phẩm phát hành\ntar --exclude='.venv' --exclude='logs' -czvf dist/data-service-v1.0.tar.gz .",
              "output": "[DETECTED] ERROR: Connection timeout\ndist/data-service-v1.0.tar.gz created successfully.",
              "annotations": [
                {
                  "part": "chmod 600 config/db.env",
                  "text": "Bảo vệ an toàn file mật khẩu."
                },
                {
                  "part": "printf ... | ./src/process.py",
                  "text": "Đường ống pipe truyền dữ liệu từ printf vào stdin của script Python."
                }
              ]
            }
          ]
        }
      ],
      "exercises": [
        {
          "level": "Vừa",
          "title": "Kịch bản Sự cố 1: Lỗi \"Permission denied\" khi chạy script Python",
          "problem": "Bạn tạo file script `run.py`, gõ `./run.py` thì terminal báo lỗi: `bash: ./run.py: Permission denied`. Tuy nhiên khi gõ `python3 run.py` thì chương trình lại chạy bình thường. Hãy giải thích nguyên nhân và đưa ra câu lệnh khắc phục chuẩn xác.",
          "hint": "Xem xét quyền thực thi x và dòng shebang.",
          "solutionCode": "ls -l run.py\nchmod +x run.py\nhead -n 1 run.py",
          "solutionOutput": "-rw-r--r-- 1 ubuntu ubuntu 45 Oct 28 10:40 run.py\n(Sau khi chmod +x)\n-rwxr-xr-x 1 ubuntu ubuntu 45 Oct 28 10:40 run.py",
          "explanation": "Khi chạy trực tiếp `./run.py`, hệ điều hành kiểm tra cờ thực thi `x` của file. Vì file chỉ có quyền 644 (`rw-r--r--`) nên bị từ chối. Khi gõ `python3 run.py`, tiến trình thực thi là file binary `python3` (đã có sẵn quyền x), còn `run.py` chỉ đóng vai trò là tham số đọc (read) nên vẫn chạy được. Cách sửa: cấp quyền `chmod +x run.py` và đảm bảo dòng đầu file có shebang `#!/usr/bin/env python3`.",
          "annotations": [
            {
              "part": "chmod +x run.py",
              "text": "Cấp quyền thực thi trực tiếp cho script."
            }
          ]
        },
        {
          "level": "Vừa",
          "title": "Kịch bản Sự cố 2: Lệnh cài qua pip báo \"command not found\"",
          "problem": "Bạn dùng pip cài một công cụ dòng lệnh (ví dụ: `flake8` hoặc `black`) vào thư mục cá nhân. Quá trình cài báo thành công, nhưng khi gõ `black --version` thì shell báo lỗi: `bash: black: command not found`. Hãy tìm nguyên nhân và khắc phục vĩnh viễn.",
          "hint": "Kiểm tra xem thư mục ~/.local/bin có nằm trong biến PATH không.",
          "solutionCode": "which black || ls -l ~/.local/bin/black\necho 'export PATH=\"$HOME/.local/bin:$PATH\"' >> ~/.bashrc\nsource ~/.bashrc\nwhich black",
          "solutionOutput": "/home/ubuntu/.local/bin/black",
          "explanation": "Khi cài đặt gói không có sudo, binary được đặt vào `~/.local/bin`. Nếu thư mục này chưa được thêm vào biến môi trường `$PATH`, shell sẽ không tìm thấy. Khắc phục bằng cách thêm dòng `export PATH=\"$HOME/.local/bin:$PATH\"` vào file `~/.bashrc` và nạp lại bằng lệnh `source ~/.bashrc`.",
          "annotations": [
            {
              "part": "echo ... >> ~/.bashrc",
              "text": "Lưu cấu hình PATH vĩnh viễn vào file khởi động của Bash shell."
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Kịch bản Sự cố 3: Lỗi \"externally-managed-environment\" khi cài thư viện",
          "problem": "Trên máy chủ Ubuntu 24.04 mới cài, bạn gõ `pip install requests` và bị chặn đứng bởi lỗi: `error: externally-managed-environment`. Một người bạn khuyên bạn nên gõ `sudo rm /usr/lib/python3.*/EXTERNALLY-MANAGED`. Hãy phân tích tại sao lời khuyên đó là nguy hiểm và đưa ra cách xử lý chuẩn mực.",
          "hint": "Áp dụng chuẩn PEP 668 và module venv.",
          "solutionCode": "sudo apt install -y python3-venv\npython3 -m venv myenv\nsource myenv/bin/activate\npip install requests",
          "solutionOutput": "Successfully installed requests-2.32.3",
          "explanation": "Xóa tệp EXTERNALLY-MANAGED sẽ phá vỡ cơ chế an toàn của Linux, khiến các bản cài đặt pip đè lên thư viện hệ thống gây lỗi apt sau này. Cách xử lý chuẩn là tạo môi trường ảo bằng `python3 -m venv` và kích hoạt trước khi cài đặt thư viện.",
          "annotations": [
            {
              "part": "python3 -m venv",
              "text": "Giải pháp chuẩn mực quốc tế tuân thủ PEP 668."
            }
          ]
        }
      ],
      "summary": [
        "Dự án Cấp 1 chứng minh khả năng thiết lập môi trường server an toàn, chuẩn chỉ cho ứng dụng Python.",
        "Lỗi `Permission denied` giải quyết bằng `chmod +x` và dòng shebang.",
        "Lỗi `command not found` của các công cụ mới cài xử lý bằng cách cập nhật biến `$PATH` trong `~/.bashrc`.",
        "Lỗi `externally-managed-environment` xử lý chuẩn mực bằng môi trường ảo `venv`."
      ]
    },
    {
      "id": "lx-1-11",
      "number": "1.11",
      "title": "Bảng Tra cứu Nhanh Lệnh & Từ điển Thuật ngữ Linux (Cấp 1 Cheat Sheet & Glossary)",
      "subtitle": "Cẩm nang tra cứu cú pháp chuẩn mực, quyền root yêu cầu và bảng giải nghĩa thuật ngữ nền tảng",
      "level": "Tra cứu",
      "duration": "25 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Tra cứu nhanh 100% cú pháp lệnh của Cấp 1 trong 5 giây.",
        "Nhận biết ngay cờ lệnh nào nguy hiểm và lệnh nào bắt buộc quyền root/sudo.",
        "Nắm vững từ điển giải nghĩa hơn 15 thuật ngữ cốt lõi của hệ thống Linux."
      ],
      "intuition": {
        "title": "Bảng mã tra cứu sinh tồn bên bàn làm việc",
        "metaphor": "Không ai cần phải thuộc lòng từng cờ lệnh trong đầu. Bảng tra cứu này được thiết kế để bạn mở sẵn bên cạnh màn hình: khi cần đóng gói tar, đổi quyền chmod hay chuyển hướng I/O, bạn chỉ cần liếc mắt 2 giây là gõ được ngay câu lệnh chuẩn xác và an toàn.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🧰</span>\n                    <span>4 NHÓM LỆNH CẤP 1</span>\n                    <span class=\"lx-vs-tag\">Nền tảng</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Điều hướng & Tra cứu:</strong> pwd, cd, ls -la, man, --help, which, type.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Thao tác Tập tin:</strong> mkdir -p, touch, cp -a, mv, rm -i, ln -s, cat, less, tail -f.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Quyền hạn & Danh tính:</strong> chmod, chown, id, whoami, sudo, umask.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Quản lý Gói & Lưu trữ:</strong> apt / dnf / pacman, tar -czvf, tar -xzvf.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚠️</span>\n                    <span>KỶ LUẬT AN TOÀN</span>\n                    <span class=\"lx-vs-tag\">Sinh tử</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Không gõ mù quáng:</strong> Luôn kiểm tra <code>pwd</code> trước khi thực hiện lệnh xóa rm.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Không chmod 777:</strong> Không bao giờ cấp quyền 777 bừa bãi để né lỗi quyền.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Cẩn trọng với dấu >:</strong> Luôn kiểm tra đích đến tránh ghi đè làm trống tệp quan trọng.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-cheatsheet",
          "title": "Bảng tra cứu cú pháp lệnh Cấp 1 theo nhóm tác vụ",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"lesson-table\">\n                <thead>\n                  <tr>\n                    <th>Nhóm tác vụ</th>\n                    <th>Câu lệnh mẫu</th>\n                    <th>Giải thích chức năng</th>\n                    <th>Quyền / Mức an toàn</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td rowspan=\"3\"><strong>1. Hệ thống &amp; Tra cứu</strong></td>\n                    <td><code>uname -a</code></td>\n                    <td>Xem phiên bản nhân Kernel và kiến trúc máy tính</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>cat /etc/os-release</code></td>\n                    <td>Xem tên và phiên bản của bản phân phối Distro</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>man &lt;lệnh&gt;</code> / <code>man 5 &lt;file&gt;</code></td>\n                    <td>Mở sổ tay tra cứu ngoại tuyến (bấm q để thoát)</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n\n                  <tr>\n                    <td rowspan=\"5\"><strong>2. File &amp; Thư mục</strong></td>\n                    <td><code>pwd</code></td>\n                    <td>In đường dẫn thư mục hiện tại đang đứng</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>ls -la</code></td>\n                    <td>Liệt kê chi tiết toàn bộ file và thư mục ẩn</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>mkdir -p a/b/c</code></td>\n                    <td>Tạo cây thư mục sâu nhiều cấp an toàn</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>cp -a nguon/ dich/</code></td>\n                    <td>Sao chép bảo toàn 100% thuộc tính và liên kết</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>rm -rf &lt;muc-tieu&gt;</code></td>\n                    <td>Xóa đệ quy cưỡng bức vĩnh viễn (kiểm tra kỹ!)</td>\n                    <td><span class=\"lx-badge-danger\">⚠️ NGUY HIỂM</span></td>\n                  </tr>\n\n                  <tr>\n                    <td rowspan=\"4\"><strong>3. Xem &amp; Soạn thảo</strong></td>\n                    <td><code>cat &lt;file&gt;</code></td>\n                    <td>In nội dung file ngắn ra terminal</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>less &lt;file&gt;</code></td>\n                    <td>Xem file dung lượng lớn không ngốn RAM (phím q thoát)</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>tail -f &lt;file.log&gt;</code></td>\n                    <td>Theo dõi luồng ghi log trực tiếp theo thời gian thực</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>nano</code> / <code>vim</code></td>\n                    <td>Trình soạn thảo dòng lệnh (Vim: i gõ, :wq lưu)</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n\n                  <tr>\n                    <td rowspan=\"4\"><strong>4. Phân quyền &amp; Sudo</strong></td>\n                    <td><code>chmod 755 &lt;file&gt;</code></td>\n                    <td>Cấp quyền rwxr-xr-x (chuẩn cho thư mục/script)</td>\n                    <td><span class=\"lx-badge-safe\">Chủ sở hữu</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>chmod 600 &lt;file&gt;</code></td>\n                    <td>Khóa chặt bí mật rw------- (cho .env, SSH key)</td>\n                    <td><span class=\"lx-badge-safe\">Chủ sở hữu</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>sudo chown u:g &lt;file&gt;</code></td>\n                    <td>Đổi chủ sở hữu user và group</td>\n                    <td><span class=\"lx-meta-pill lx-meta-root\">🔑 Cần sudo</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>chmod -R 777 ...</code></td>\n                    <td>Mở toang toàn bộ quyền (tuyệt đối không dùng)</td>\n                    <td><span class=\"lx-badge-danger\">⚠️ CẤM DÙNG</span></td>\n                  </tr>\n\n                  <tr>\n                    <td rowspan=\"4\"><strong>5. Gói phần mềm (apt)</strong></td>\n                    <td><code>sudo apt update</code></td>\n                    <td>Cập nhật danh mục gói phần mềm từ máy chủ</td>\n                    <td><span class=\"lx-meta-pill lx-meta-root\">🔑 Cần sudo</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>sudo apt upgrade -y</code></td>\n                    <td>Tải và cài đặt các bản vá bảo mật mới nhất</td>\n                    <td><span class=\"lx-meta-pill lx-meta-root\">🔑 Cần sudo</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>sudo apt install -y &lt;pkg&gt;</code></td>\n                    <td>Cài đặt gói mới kèm phụ thuộc</td>\n                    <td><span class=\"lx-meta-pill lx-meta-root\">🔑 Cần sudo</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>python3 -m venv .venv</code></td>\n                    <td>Tạo môi trường ảo chuẩn PEP 668 cho Python</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n\n                  <tr>\n                    <td rowspan=\"4\"><strong>6. I/O, Pipe &amp; Nén</strong></td>\n                    <td><code>cmd &gt; file</code> / <code>cmd &gt;&gt; file</code></td>\n                    <td>Chuyển hướng xuất chuẩn (ghi đè / ghi nối tiếp)</td>\n                    <td><span class=\"lx-badge-safe\">Chú ý ghi đè</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>cmd 2&gt; /dev/null</code></td>\n                    <td>Triệt tiêu thông báo lỗi vào hố đen hệ thống</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>cmd1 | cmd2</code></td>\n                    <td>Đường ống nối output lệnh 1 làm input lệnh 2</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                  <tr>\n                    <td><code>tar -czvf pkg.tar.gz dir/</code></td>\n                    <td>Đóng gói và nén thư mục bằng gzip</td>\n                    <td><span class=\"lx-badge-safe\">User thường</span></td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-glossary",
          "title": "Từ điển giải nghĩa hơn 15 thuật ngữ cốt lõi Cấp 1",
          "content": "\n            <div class=\"lx-glossary-grid\">\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Kernel (Nhân)</span>\n                  <span class=\"lx-glossary-cat\">Cốt lõi</span>\n                </div>\n                <div class=\"lx-glossary-def\">Phần mềm trung tâm điều phối trực tiếp tài nguyên phần cứng (CPU, RAM, Đĩa, Mạng) và cung cấp giao diện lời gọi hệ thống (Syscalls).</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Distro (Bản phân phối)</span>\n                  <span class=\"lx-glossary-cat\">Cốt lõi</span>\n                </div>\n                <div class=\"lx-glossary-def\">Hệ điều hành hoàn chỉnh xây dựng quanh nhân Linux, tích hợp thêm trình quản lý gói (apt/dnf/pacman), GNU C library và các dịch vụ nền.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>FHS</span>\n                  <span class=\"lx-glossary-cat\">Lưu trữ</span>\n                </div>\n                <div class=\"lx-glossary-def\">Filesystem Hierarchy Standard: Tiêu chuẩn quốc tế quy định vị trí và mục đích sử dụng của từng thư mục trong cây Linux (gốc /, /etc, /var, /usr...).</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Root Directory (/)</span>\n                  <span class=\"lx-glossary-cat\">Lưu trữ</span>\n                </div>\n                <div class=\"lx-glossary-def\">Gốc cao nhất của toàn bộ hệ thống file. Mọi ổ đĩa và thư mục con đều bắt nguồn từ đây. Khác với thư mục nhà của quản trị viên là /root.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Shell &amp; Terminal</span>\n                  <span class=\"lx-glossary-cat\">Giao diện</span>\n                </div>\n                <div class=\"lx-glossary-def\">Terminal là cửa sổ hiển thị đồ họa; Shell (Bash/Zsh) là chương trình thông dịch dòng lệnh nhận lệnh của người dùng và chuyển thành yêu cầu tới kernel.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Man Pages</span>\n                  <span class=\"lx-glossary-cat\">Tài liệu</span>\n                </div>\n                <div class=\"lx-glossary-def\">Sổ tay hướng dẫn kỹ thuật ngoại tuyến cài sẵn trong Linux, chia thành các phân vùng Section 1 (lệnh người dùng), Section 5 (cấu hình), Section 8 (quản trị).</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Symlink (Liên kết mềm)</span>\n                  <span class=\"lx-glossary-cat\">Thao tác</span>\n                </div>\n                <div class=\"lx-glossary-def\">Một tệp đặc biệt đóng vai trò như biển chỉ đường trỏ tới một file hoặc thư mục đích khác (tạo bằng lệnh <code>ln -s</code>).</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Permissions (rwx)</span>\n                  <span class=\"lx-glossary-cat\">Bảo mật</span>\n                </div>\n                <div class=\"lx-glossary-def\">Quyền truy cập trên Linux: Read (4), Write (2), Execute (1). Được chia thành 3 nhóm đối tượng: Chủ sở hữu (User), Nhóm (Group) và Người khác (Others).</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>sudo</span>\n                  <span class=\"lx-glossary-cat\">Bảo mật</span>\n                </div>\n                <div class=\"lx-glossary-def\">Superuser Do: Cho phép người dùng được ủy quyền thực thi một câu lệnh cụ thể dưới đặc quyền quản trị viên tối cao root một cách an toàn và có lưu vết log.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Repository (Repo)</span>\n                  <span class=\"lx-glossary-cat\">Gói phần mềm</span>\n                </div>\n                <div class=\"lx-glossary-def\">Kho máy chủ lưu trữ các gói phần mềm nhị phân chính thức đã được kiểm thử bảo mật và ký số của nhà phát triển bản phân phối.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>PEP 668</span>\n                  <span class=\"lx-glossary-cat\">Python/Linux</span>\n                </div>\n                <div class=\"lx-glossary-def\">Quy chuẩn bảo vệ môi trường Python hệ thống trên Linux hiện đại, yêu cầu lập trình viên phải dùng môi trường ảo venv thay vì chạy pip cài đè toàn cục.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Pipe (|)</span>\n                  <span class=\"lx-glossary-cat\">Đường ống I/O</span>\n                </div>\n                <div class=\"lx-glossary-def\">Cơ chế giao tiếp liên tiến trình của Unix cho phép nối trực tiếp luồng xuất chuẩn (stdout) của lệnh trước làm luồng nhập chuẩn (stdin) của lệnh sau.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>/dev/null</span>\n                  <span class=\"lx-glossary-cat\">Thiết bị ảo</span>\n                </div>\n                <div class=\"lx-glossary-def\">File thiết bị đặc biệt đóng vai trò như \"hố đen\": bất kỳ dữ liệu nào ghi vào đây đều biến mất vĩnh viễn không để lại dấu vết.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>PATH</span>\n                  <span class=\"lx-glossary-cat\">Môi trường</span>\n                </div>\n                <div class=\"lx-glossary-def\">Biến môi trường toàn cục chứa danh sách các thư mục mà shell sẽ duyệt qua để tìm file thực thi khi người dùng gõ một tên lệnh bất kỳ.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Shebang (#!)</span>\n                  <span class=\"lx-glossary-cat\">Kịch bản</span>\n                </div>\n                <div class=\"lx-glossary-def\">Dòng mở đầu đặc biệt ở đầu tệp script (như <code>#!/usr/bin/env python3</code>) chỉ dẫn cho nhân Linux biết chương trình thông dịch nào cần được nạp để chạy file này.</div>\n              </div>\n\n              <div class=\"lx-glossary-card\">\n                <div class=\"lx-glossary-term\">\n                  <span>Tarball (.tar.gz)</span>\n                  <span class=\"lx-glossary-cat\">Lưu trữ</span>\n                </div>\n                <div class=\"lx-glossary-def\">Tệp đóng gói gồm nhiều file/thư mục được gom lại bằng tiện ích tar và nén nhỏ dung lượng bằng thuật toán gzip. Định dạng phân phối mã nguồn tiêu chuẩn trên Linux.</div>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "tips": [
          {
            "title": "Lưu giữ cẩm nang tra cứu",
            "content": "Bạn có thể đánh dấu trang bài 1.11 này vào trình duyệt để mở nhanh mỗi khi cần tra cứu nhanh cú pháp lệnh Linux trong công việc hàng ngày."
          }
        ]
      },
      "exercises": [],
      "summary": [
        "Bảng tra cứu lệnh tóm tắt đầy đủ cú pháp của Cấp 1 phân nhóm theo 6 nghiệp vụ thực tế.",
        "Hơn 15 thuật ngữ nền tảng giúp bạn hiểu sâu bản chất kỹ thuật của hệ điều hành Linux và tự tin giao tiếp trong môi trường kỹ thuật quốc tế."
      ]
    }
  ]
};
