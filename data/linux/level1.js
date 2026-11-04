// Dữ liệu Chuyên đề Linux Cấp 1: Nền tảng Dòng lệnh & Sinh tồn trên Linux
// Định dạng gán vào window để chạy mượt mà trên cả file:// và HTTP server

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
      "duration": "40 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhận diện và liệt kê các thành phần cốt lõi của Linux Kernel tại Ring 0 và phân biệt ranh giới với các Distro tại Ring 3.",
        "2. [Hiểu - Understand] Giải thích sự khác biệt kiến trúc giữa 3 họ Distro chủ lực (Debian/Ubuntu, RHEL/Rocky, Arch) và 3 mô hình thực hành (VM, WSL2, Docker).",
        "3. [Vận dụng - Apply] Thực thi các câu lệnh tra cứu thông số hệ thống (`uname`, `cat /etc/os-release`, `hostnamectl`, `systemd-detect-virt`) để nhận diện chính xác môi trường vận hành.",
        "4. [Phân tích - Analyze] Đánh giá mức độ rủi ro an toàn khi thao tác dòng lệnh, so sánh cơ chế cách ly của Container vs Máy ảo và xử lý sự cố nạp module kernel thất bại."
      ],
      "intuition": {
        "title": "Khung gầm động cơ xe hơi và Các hãng xe hoàn chỉnh",
        "metaphor": "Hãy tưởng tượng \"Linux Kernel\" giống như một khối động cơ ô tô siêu mạnh mẽ do kỹ sư Linus Torvalds khởi xướng từ năm 1991. Bản thân khối động cơ không thể tự lăn bánh chở người trên đường. Để tạo thành chiếc xe hoàn chỉnh, các hãng sản xuất xe (tương ứng với các Distro) lấy khối động cơ đó về, tích hợp thêm hệ thống lái và khung gầm (GNU Coreutils, thư viện C), hộp số và bảng điều khiển (systemd, Shell Bash), bình xăng và trạm tiếp nhiên liệu (trình quản lý gói apt, dnf, pacman). Canonical tạo ra chiếc xe sedan tiện nghi Ubuntu; Red Hat tạo ra dòng xe tải vận tải bọc thép RHEL dành cho doanh nghiệp lớn; còn Arch Linux là bộ linh kiện rời để kỹ sư tự tay siết từng con ốc tùy biến tối đa.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>LINUX KERNEL (NHÂN)</span><span class=\"lx-vs-tag\">Ring 0 / Kernel Space</span></div><p class=\"lx-vs-desc\">Lõi điều phối trung tâm giữa phần cứng và phần mềm, phát hành chính thức tại kernel.org.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Đặc quyền Ring 0:</strong> Trực tiếp quản lý CPU, phân bổ bộ nhớ RAM, điều khiển thiết bị I/O và ngắt phần cứng.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Cổng giao tiếp Syscalls:</strong> Cung cấp ~450 lời gọi hệ thống chuẩn POSIX để tiến trình người dùng yêu cầu tài nguyên an toàn.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bản chất:</strong> Chỉ là một file binary tĩnh duy nhất (ví dụ: <code>/boot/vmlinuz-*</code>) kèm các module tải động (<code>.ko</code>).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>📦</span><span>LINUX DISTRIBUTION (DISTRO)</span><span class=\"lx-vs-tag\">Ring 3 / User Space</span></div><p class=\"lx-vs-desc\">Hệ điều hành hoàn chỉnh sẵn sàng phục vụ người dùng và triển khai ứng dụng sản xuất.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Phần mềm GNU &amp; Thư viện:</strong> GNU C Library (glibc), Bash shell, coreutils (ls, cp, rm, grep).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Hệ thống Init &amp; Quản lý gói:</strong> systemd (quản lý dịch vụ) kết hợp kho phần mềm quản lý qua <code>apt</code>, <code>dnf</code>, hoặc <code>pacman</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Định hướng mục tiêu:</strong> Đóng gói tối ưu hóa cho máy chủ Cloud, máy trạm kỹ thuật, thiết bị IoT hoặc bảo mật chuyên sâu.</li></ul></div></div>",
        "boundary": "Phép ví dụ động cơ dừng lại ở cấu trúc vật lý. Trong hệ điều hành máy tính, Kernel không chỉ cung cấp sức mạnh tính toán mà còn là 'người gác cổng tối cao' tại Ring 0, độc quyền kiểm soát lời gọi hệ thống (Syscalls) và bộ nhớ ảo, trong khi các ứng dụng người dùng chạy ở Ring 3 hoàn toàn không thể chạm trực tiếp vào phần cứng."
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Kernel vs Distro & Hệ thống Lệnh Tra cứu",
          "content": "<p>Trong kỹ thuật hệ thống, thuật ngữ \"hệ điều hành Linux\" thường bị hiểu nhầm là một khối thống nhất. Chuẩn kiến trúc quốc tế (LPIC-1 Topic 101, CompTIA Linux+) phân định rõ:</p>\n    <ul>\n      <li><strong>Linux Kernel (Nhân):</strong> Phần mềm lõi chạy tại <strong>Ring 0 (Supervisor Mode)</strong>, quản lý độc quyền phần cứng: CPU scheduler, Virtual Memory, Device Drivers, Network Stack. Ứng dụng người dùng chỉ được tương tác với phần cứng thông qua <strong>System Calls (Syscalls)</strong>.</li>\n      <li><strong>Linux Distribution (Distro):</strong> Bộ sản phẩm hoàn chỉnh bao gồm Kernel + GNU Coreutils + Glibc + systemd + Trình quản lý gói.</li>\n    </ul>\n    <p><strong>Khi nào nên dùng từng họ Distro:</strong></p>\n    <ul>\n      <li><strong>Debian/Ubuntu:</strong> Lựa chọn số 1 cho Cloud VPS, Web Backend Python/NodeJS, AI/ML Server nhờ tính ổn định và cộng đồng khổng lồ.</li>\n      <li><strong>RHEL/Rocky/AlmaLinux:</strong> Lựa chọn số 1 cho khối Tài chính, Ngân hàng, Doanh nghiệp lớn yêu cầu vòng đời hỗ trợ ổn định 10 năm.</li>\n      <li><strong>Arch Linux:</strong> Dành cho nghiên cứu chuyên sâu, máy trạm kỹ thuật cần cập nhật kernel mới nhất (Rolling Release). <em>Không dùng cho production quan trọng nếu chưa có đội ngũ bảo trì giàu kinh nghiệm</em>.</li>\n    </ul>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table lx-command-table\">\n        <thead>\n          <tr><th>Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Cảnh báo</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><code>uname</code></td><td>Tra cứu thông số hạt nhân Kernel & Kiến trúc</td><td><code>uname [tùy_chọn]</code></td><td><code>uname -srm</code></td><td><code>-r</code> in phiên bản kernel, <code>-m</code> in kiến trúc CPU (x86_64, aarch64).</td></tr>\n          <tr><td><code>cat /etc/os-release</code></td><td>Xem thông tin định danh Bản phân phối (Distro)</td><td><code>cat /etc/os-release</code></td><td><code>grep PRETTY_NAME /etc/os-release</code></td><td>Chuẩn chung của freedesktop.org, có mặt trên 99% distro hiện đại.</td></tr>\n          <tr><td><code>hostnamectl</code></td><td>Xem tổng quan máy chủ & thông tin ảo hóa (systemd)</td><td><code>hostnamectl [status]</code></td><td><code>hostnamectl</code></td><td>Hiển thị cả Kernel, OS, Architecture và Chassis/Virtualization.</td></tr>\n          <tr><td><code>systemd-detect-virt</code></td><td>Phát hiện công nghệ ảo hóa đang thực thi</td><td><code>systemd-detect-virt [tùy_chọn]</code></td><td><code>systemd-detect-virt</code></td><td>Trả về <code>wsl</code>, <code>docker</code>, <code>kvm</code>, <code>oracle</code> hoặc <code>none</code> nếu là bare-metal.</td></tr>\n          <tr><td><code>sudo -v</code></td><td>Làm mới phiên xác thực đặc quyền sudo</td><td><code>sudo -v</code></td><td><code>sudo -v</code></td><td>Kiểm tra xem user có quyền sudo mà không cần chạy lệnh nguy hiểm nào.</td></tr>\n        </tbody>\n      </table>\n    </div>",
          "codeExamples": [
            {
              "title": "Kiểm tra thông số nhân Kernel và kiến trúc phần cứng với uname",
              "lang": "Bash",
              "code": "# 1. Xem đầy đủ thông số định danh hệ thống\nuname -a\n\n# 2. Chỉ trích xuất phiên bản nhân đang nạp trong RAM\nuname -r\n\n# 3. Xem kiến trúc phần cứng CPU (x86_64, aarch64/ARM64)\nuname -m",
              "output": "Linux prod-srv01 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC Fri Sep  6 12:00:00 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux\n6.8.0-45-generic\nx86_64",
              "annotations": [
                {
                  "line": 2,
                  "text": "uname -a: Cờ --all in toàn bộ thông số nhân, tên máy chủ, bản build và kiến trúc."
                },
                {
                  "line": 5,
                  "text": "uname -r: In chuỗi mã phiên bản kernel (ví dụ: 6.8.0-45-generic)."
                },
                {
                  "line": 8,
                  "text": "uname -m: In kiến trúc máy tính. x86_64 là Intel/AMD 64-bit; aarch64 là ARM 64-bit."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-1-rings-syscall",
          "title": "4.1 Ranh giới Đặc quyền Ring 0 vs Ring 3 & Cổng giao tiếp Syscall",
          "content": "<p>Bộ vi xử lý hiện đại (x86_64, ARM64) thực thi cơ chế bảo vệ phần cứng phân tầng mang tên <strong>Protection Rings</strong>. Hệ điều hành Linux sử dụng hai mức đặc quyền cốt lõi để ngăn chặn ứng dụng lỗi làm sập toàn bộ máy chủ:</p>\n    <ul>\n      <li><strong>Ring 0 (Kernel Space / Supervisor Mode):</strong> Vùng đặc quyền tối cao dành riêng cho nhân Linux (<code>/boot/vmlinuz-*</code>) và các module nhân tải động (<code>.ko</code>). Chỉ mã lệnh tại Ring 0 mới được phép thực thi tập lệnh CPU đặc quyền để điều khiển trực tiếp thanh ghi phần cứng, bảng phân trang bộ nhớ ảo (MMU) và ngắt I/O.</li>\n      <li><strong>Ring 3 (User Space / Unprivileged Mode):</strong> Môi trường bị giới hạn của mọi tiến trình người dùng — từ trình duyệt, Web Server Nginx, ứng dụng Python cho tới chính Bash shell bạn đang gõ lệnh. Nếu một tiến trình tại Ring 3 cố truy cập thẳng vào địa chỉ RAM của tiến trình khác, CPU lập tức kích hoạt ngoại lệ phần cứng và Kernel tiêu diệt tiến trình đó bằng lỗi <code>Segmentation fault (SIGSEGV)</code> mà hệ điều hành vẫn chạy ổn định.</li>\n    </ul>\n    <p>Khi ứng dụng Python gọi hàm <code>open(\"data.txt\")</code> hay <code>print(\"Hello\")</code>, nó không thể tự đọc đĩa hay ghi ra màn hình. Thay vào đó, thư viện chuẩn C (<code>glibc</code>) sẽ đóng gói yêu cầu và phát lệnh chuyển ngữ cảnh sang Ring 0 thông qua giao diện <strong>System Call (Syscall)</strong> (như <code>openat()</code>, <code>write()</code>). Kernel kiểm tra quyền hạn hợp lệ, thực hiện thao tác phần cứng thay cho ứng dụng, rồi trả kết quả về lại Ring 3.</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Khảo sát tệp nhị phân Kernel thực tế trên đĩa và danh sách Module Ring 0",
              "code": "# 1. Quan sát tệp ảnh nhân Linux (vmlinuz) lưu trong thư mục /boot\nls -lh /boot/vmlinuz-$(uname -r)\n\n# 2. Đọc chuỗi biên dịch chi tiết của Kernel trực tiếp từ RAM ảo\ncat /proc/version\n\n# 3. Liệt kê 5 module nhân (Kernel Modules) đang được nạp động trong Ring 0\nlsmod | head -n 6",
              "output": "-rw------- 1 root root 14M Sep  6 12:00 /boot/vmlinuz-6.8.0-45-generic\nLinux version 6.8.0-45-generic (buildd@lcy02-amd64-032) (x86_64-linux-gnu-gcc-13 (Ubuntu 13.2.0-23ubuntu4) 13.2.0, GNU ld (GNU Binutils for Ubuntu) 2.42) #45-Ubuntu SMP PREEMPT_DYNAMIC\nModule                  Size  Used by\ntls                   151552  0\nbinfmt_misc            24576  1\nnls_iso8859_1          12288  1\next4                 1142784  2\nmbcache                16384  1 ext4",
              "annotations": [
                {
                  "line": 2,
                  "part": "/boot/vmlinuz-...",
                  "text": "Tệp thực thi nén của Linux Kernel được Bootloader nạp vào bộ nhớ RAM ngay khi bật máy."
                },
                {
                  "line": 5,
                  "part": "/proc/version",
                  "text": "Tiết lộ phiên bản Kernel, trình biên dịch GCC đã dùng để build nhân và thời điểm đóng gói."
                },
                {
                  "line": 8,
                  "part": "lsmod",
                  "text": "Hiển thị các trình điều khiển thiết bị/hệ thống file (như ext4, tls) đang gắn trực tiếp vào không gian nhân Ring 0."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-1-distro-anatomy",
          "title": "4.2 Giải phẫu 3 Họ Distro Chủ lực (Debian, RHEL, Arch) & Chu kỳ Hỗ trợ LTS",
          "content": "<p>Vì mã nguồn Linux Kernel và bộ công cụ GNU đều là phần mềm nguồn mở, hàng trăm tổ chức đã đóng gói chúng theo triết lý kỹ thuật riêng để tạo thành các <strong>Bản phân phối (Distributions)</strong>. Trong thực tế tuyển dụng và vận hành hạ tầng toàn cầu, 95% máy chủ thuộc về 3 gia đình gốc:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Tiêu chí Kỹ thuật</th><th>Họ Debian / Ubuntu</th><th>Họ RHEL / Rocky / AlmaLinux</th><th>Họ Arch Linux</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><strong>Định dạng gói &amp; Công cụ</strong></td><td><code>.deb</code> (<code>dpkg</code> / <code>apt</code>)</td><td><code>.rpm</code> (<code>rpm</code> / <code>dnf</code>)</td><td><code>.pkg.tar.zst</code> (<code>pacman</code>)</td></tr>\n          <tr><td><strong>Mô hình phát hành</strong></td><td>Chu kỳ cố định (Ubuntu LTS mỗi 2 năm, hỗ trợ 5–12 năm)</td><td>Chu kỳ siêu ổn định doanh nghiệp (vòng đời hỗ trợ 10 năm)</td><td>Phát hành cuốn chiếu liên tục (Rolling Release)</td></tr>\n          <tr><td><strong>Cơ chế MAC mặc định</strong></td><td>AppArmor (kiểm soát theo đường dẫn)</td><td>SELinux (kiểm soát theo nhãn bảo mật nghiêm ngặt)</td><td>Tùy chọn người dùng tự cấu hình</td></tr>\n          <tr><td><strong>Môi trường áp dụng chuẩn</strong></td><td>Cloud AWS/GCP, AI/ML, Web Backend Python/Node.js</td><td>Ngân hàng, Viễn thông, Chính phủ, Hệ thống ERP lõi</td><td>Máy trạm nghiên cứu Kernel, Desktop tối ưu hóa</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <p>Mặc dù khác biệt về công cụ cài gói, cả 3 họ Distro đều tuân thủ chuẩn định danh <code>/etc/os-release</code> của freedesktop.org. Khi viết kịch bản tự động hóa đa nền tảng, kỹ sư luôn đọc các biến <code>ID</code> và <code>ID_LIKE</code> trong tệp này để nhánh hóa câu lệnh chính xác.</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Đọc chuẩn định danh /etc/os-release và thông số tổng thể từ hostnamectl",
              "code": "# 1. Xem các trường định danh chuẩn hóa của bản phân phối\ncat /etc/os-release | grep -E '^(NAME|VERSION|ID|ID_LIKE)='\n\n# 2. Tổng hợp hồ sơ phần cứng, OS, Kernel và ảo hóa bằng systemd\nhostnamectl",
              "output": "NAME=\"Ubuntu\"\nVERSION=\"24.04.1 LTS (Noble Numbat)\"\nID=ubuntu\nID_LIKE=debian\n Static hostname: prod-web-01\n       Icon name: computer-vm\n         Chassis: vm 🖴\n      Machine ID: 9f8a7d6c5b4a3e2f1a0b9c8d7e6f5a4b\n         Boot ID: 3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f\n  Virtualization: kvm\nOperating System: Ubuntu 24.04.1 LTS\n          Kernel: Linux 6.8.0-45-generic\n    Architecture: x86-64\n Hardware Vendor: QEMU\n  Hardware Model: Standard PC (Q35 + ICH9, 2009)",
              "annotations": [
                {
                  "line": 2,
                  "part": "ID_LIKE=debian",
                  "text": "Cho biết distro này kế thừa kiến trúc từ họ Debian (ví dụ Ubuntu, Linux Mint, Pop!_OS đều có ID_LIKE=debian)."
                },
                {
                  "line": 5,
                  "part": "hostnamectl",
                  "text": "Tiện ích của systemd gom toàn bộ thông tin tên máy chủ, loại khung máy (Chassis: vm), công nghệ ảo hóa (kvm) và phiên bản Kernel trong một màn hình."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-1-virt-isolation",
          "title": "4.3 Kiến trúc 3 Môi trường Thực hành: Máy ảo (VM) vs WSL2 vs Container",
          "content": "<p>Hiểu rõ kiến trúc bên dưới của môi trường thực hành giúp bạn tránh được lỗi kinh điển: cố chạy các tác vụ quản trị nhân trên một môi trường không sở hữu Kernel độc lập.</p>\n    <ul>\n      <li><strong>Máy ảo đầy đủ (VM — KVM, VirtualBox, VMware, Multipass):</strong> Trình giám sát máy ảo (Hypervisor) giả lập toàn bộ phần cứng ảo (CPU, RAM, đĩa khối <code>/dev/sda</code>, card mạng). Máy ảo khởi động Bootloader riêng, chạy <strong>Kernel riêng biệt 100%</strong> và có tiến trình <code>systemd</code> giữ PID 1. Đây là môi trường chuẩn mực nhất để thực hành phân vùng đĩa LVM, tường lửa nftables, nạp module nhân và tính năng Snapshot khôi phục tức thì.</li>\n      <li><strong>WSL2 (Windows Subsystem for Linux 2):</strong> Chạy một nhân Linux thật do Microsoft biên dịch bên trong một máy ảo Hyper-V siêu nhẹ tự động co giãn RAM. Rất mượt cho lập trình Python, thao tác file, viết Bash script; nhưng hạn chế khi thực hành quy trình khởi động GRUB, quản lý thiết bị phần cứng vật lý hoặc mạng cầu nối (Bridged Networking) phức tạp.</li>\n      <li><strong>Container (Docker, Podman, LXC):</strong> <em>Không phải máy ảo</em>. Container chỉ là các tiến trình bình thường chạy trên máy Host, dùng chung trực tiếp Kernel của Host nhưng bị giới hạn tầm nhìn bởi <strong>Namespaces</strong> và giới hạn tài nguyên bởi <strong>cgroups</strong>. Mặc định container không chạy <code>systemd</code> ở PID 1 và bị tước các quyền đặc biệt (Linux Capabilities) để bảo vệ Host.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra nhanh công nghệ ảo hóa, tiến trình PID 1 và kiến trúc CPU",
              "code": "# 1. Nhận diện tự động lớp ảo hóa hoặc container hiện tại\nsystemd-detect-virt\n\n# 2. Xác minh tiến trình gốc giữ PID 1 (Init system)\nps -p 1 -o pid,user,comm,args\n\n# 3. Kiểm tra thông số CPU và cờ Hypervisor\nlscpu | grep -E 'Architecture|CPU\\(s\\)|Hypervisor'",
              "output": "kvm\n    PID USER     COMMAND         COMMAND\n      1 root     systemd         /sbin/init splash\nArchitecture:             x86_64\nCPU(s):                   4\nHypervisor vendor:        KVM",
              "annotations": [
                {
                  "line": 2,
                  "part": "systemd-detect-virt",
                  "text": "In ra kvm/vmware/oracle (Máy ảo), wsl (WSL2), docker/podman (Container) hoặc none (Máy vật lý Bare-metal)."
                },
                {
                  "line": 5,
                  "part": "ps -p 1 ...",
                  "text": "Trên VM chuẩn, PID 1 là systemd (/sbin/init). Trong Docker container, PID 1 thường chỉ là bash hoặc python."
                },
                {
                  "line": 8,
                  "part": "lscpu",
                  "text": "Trích xuất kiến trúc tập lệnh và nhà cung cấp tầng ảo hóa phần cứng từ CPUID."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Tiếp nhận phiên SSH máy chủ mới và thẩm tra môi trường vận hành.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Gõ <code>systemd-detect-virt</code> để xem máy chủ là máy ảo thật, container hay WSL.</li>\n        <li><strong>Bước 2:</strong> Kiểm tra tiến trình PID 1 bằng <code>ps -p 1 -o comm=</code> để đảm bảo dịch vụ systemd đang quản lý OS.</li>\n        <li><strong>Bước 3:</strong> Đọc <code>/etc/os-release</code> để nhận diện họ Distro và quyết định dùng lệnh <code>apt</code> hay <code>dnf</code>.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lệnh Sai / Sai Lầm Thường Gặp</div>\n          <p><code>modprobe wireguard</code> bên trong Docker container mặc định.</p>\n          <p><strong>Kết quả:</strong> <code>FATAL: Module wireguard not found in directory /lib/modules/...</code></p>\n          <p><strong>Nguyên nhân:</strong> Container không có nhân riêng, không thể nạp module vào kernel máy chủ host nếu thiếu quyền CAP_SYS_MODULE.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Lệnh Đúng / Chuẩn Kỹ Thuật</div>\n          <p><code>systemd-detect-virt</code> phát hiện ảo hóa trước; nếu cần can thiệp kernel, thực thi lệnh trên Máy ảo (VM) có kernel riêng:</p>\n          <p><code>sudo modprobe wireguard && lsmod | grep wireguard</code></p>\n          <p><strong>Kết quả:</strong> Module được nạp an toàn vào kernel không gian Ring 0 của VM.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Khảo sát và Xác thực Tính sẵn sàng của Hạ tầng Linux",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.1</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thu thập hồ sơ định danh phần cứng, hệ điều hành và quyền hạn quản trị để nghiệm thu máy chủ ảo mới bàn giao.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Một máy ảo Ubuntu 22.04/24.04 LTS hoặc phiên làm việc WSL2 với tài khoản user thông thường có quyền sudo.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Mở Terminal, thực thi lệnh kiểm tra tên nhân và phiên bản: <code>uname -sr</code>.</li>\n        <li><strong>Bước 2:</strong> Trích xuất tên đầy đủ của bản phân phối: <code>grep '^PRETTY_NAME=' /etc/os-release</code>.</li>\n        <li><strong>Bước 3:</strong> Xác minh công nghệ ảo hóa: <code>systemd-detect-virt</code>.</li>\n        <li><strong>Bước 4:</strong> Kiểm tra danh sách lệnh được cấp quyền quản trị: <code>sudo -l</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh (Verification)</h4>\n      <pre class=\"output-pre\">Linux 6.8.0-45-generic\nPRETTY_NAME=\"Ubuntu 24.04.1 LTS\"\nkvm (hoặc wsl, oracle)\nUser devops may run the following commands on host: (ALL : ALL) ALL</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Viết một dòng lệnh shell kết hợp toán tử logic để kiểm tra: nếu hệ thống đang chạy trên WSL thì in ra cảnh báo <code>[WARN] Moi truong WSL2 khong dung cho Lab Systemd sau</code>, ngược lại in <code>[OK] Moi truong hoan hao</code>.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không đăng nhập trực tiếp tài khoản <code>root</code>. Luôn tạo snapshot máy ảo trước khi học các bài can thiệp mạng hoặc phân vùng ổ cứng.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ (Root Cause)</th><th>Quy trình chẩn đoán & Khắc phục triệt để</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><code>sudo: command not found</code></td><td>Gói <code>sudo</code> chưa được cài đặt (thường gặp trên các image Docker hoặc Debian minimal).</td><td>Đăng nhập bằng <code>su -</code> (chuyển sang root), chạy <code>apt update && apt install -y sudo</code>, sau đó thêm user vào nhóm: <code>usermod -aG sudo $USER</code>.</td></tr>\n          <tr><td><code>systemd-detect-virt: command not found</code></td><td>Hệ thống không cài đặt <code>systemd</code> hoặc biến <code>$PATH</code> không chứa <code>/usr/bin</code>.</td><td>Kiểm tra biến môi trường: <code>echo $PATH</code>. Thay thế bằng cách đọc tệp hệ thống: <code>cat /proc/version</code> và <code>cat /proc/1/comm</code>.</td></tr>\n          <tr><td><code>[username] is not in the sudoers file</code></td><td>Tài khoản người dùng chưa được cấp quyền leo thang đặc quyền trong <code>/etc/sudoers</code>.</td><td>Đăng nhập bằng quyền root, dùng lệnh chuẩn <code>visudo</code> hoặc thêm user vào nhóm <code>sudo</code> (Debian/Ubuntu) hoặc nhóm <code>wheel</code> (RHEL/CentOS).</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Nguyên tắc Đặc quyền Tối thiểu (Least Privilege):</strong> 99% thời gian làm việc phải ở tài khoản user thường (dấu nhắc <code>$</code>). Chỉ dùng <code>sudo</code> cho từng câu lệnh cụ thể; tránh tuyệt đối thói quen gõ <code>sudo su</code> hoặc <code>sudo -i</code> để treo shell root.</li>\n        <li><strong>Không lưu dữ liệu mã nguồn trong phân vùng Windows trên WSL2:</strong> Đường dẫn <code>/mnt/c/...</code> trên WSL2 có tốc độ I/O đọc ghi chậm hơn 5–10 lần so với thư mục gốc Linux <code>/home/username/...</code> do phải dịch lời gọi hàm qua tầng 9P protocol.</li>\n        <li><strong>Kiểm tra định danh trước khi paste lệnh từ Internet:</strong> Kiểm tra xem lệnh copy trên mạng dành cho <code>apt</code> hay <code>dnf</code> bằng cách chạy <code>cat /etc/os-release</code> để tránh cài đặt nhầm kho repository không tương thích.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Tài liệu Kernel chính thức:</strong> <a href=\"https://www.kernel.org/doc/html/latest/\" target=\"_blank\" rel=\"noopener\">The Linux Kernel documentation (kernel.org)</a> — Nguồn sự thật duy nhất về nhân Linux.</li>\n      <li><strong>Chuẩn định danh freedesktop:</strong> <a href=\"https://www.freedesktop.org/software/systemd/man/os-release.html\" target=\"_blank\" rel=\"noopener\">os-release specification</a> — Quy chuẩn tệp <code>/etc/os-release</code> trên toàn bộ các distro hiện đại.</li>\n      <li><strong>Mục tiêu chứng chỉ quốc tế:</strong> Linux Professional Institute <a href=\"https://www.lpi.org/our-certifications/lpic-1-overview\" target=\"_blank\" rel=\"noopener\">LPIC-1 Exam 101 Topic 101: System Architecture</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Cheat Sheet & Bảng Đối chiếu Thuật ngữ Quốc tế",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thuật ngữ Tiếng Anh</th><th>Nghĩa Tiếng Việt Chuẩn</th><th>Định nghĩa Kỹ thuật ngắn gọn</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Kernel Space (Ring 0)</strong></td><td>Không gian Nhân</td><td>Vùng nhớ và mức đặc quyền cao nhất của CPU, chỉ dành riêng cho Kernel thực thi.</td></tr>\n          <tr><td><strong>User Space (Ring 3)</strong></td><td>Không gian Người dùng</td><td>Vùng nhớ bảo vệ dành cho tiến trình người dùng, bị chặn truy cập phần cứng trực tiếp.</td></tr>\n          <tr><td><strong>System Call (Syscall)</strong></td><td>Lời gọi Hệ thống</td><td>Giao diện lập trình chuẩn (API) cho phép ứng dụng User Space yêu cầu dịch vụ từ Kernel.</td></tr>\n          <tr><td><strong>Distribution (Distro)</strong></td><td>Bản phân phối</td><td>Hệ điều hành đóng gói hoàn chỉnh gồm Kernel, thư viện C, systemd và các tiện ích GNU.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố: Bài lab nạp Module Kernel thất bại trên môi trường Container / WSL2 mặc định",
        "content": "<p>Một lập trình viên Backend chuyển sang học Linux nâng cao. Khi thực hiện bài thực hành yêu cầu nạp module hỗ trợ hệ thống file hoặc tinh chỉnh tham số mạng bằng lệnh <code>modprobe iptable_nat</code>, hệ thống lập tức báo lỗi: <code>modprobe: FATAL: Module iptable_nat not found in directory /lib/modules/...</code></p><ol><li><strong>Triệu chứng:</strong> Lệnh quản lý module nhân (<code>lsmod</code>, <code>modprobe</code>) báo lỗi thiếu thư mục hoặc từ chối thao tác dù đã thực hiện với quyền <code>sudo</code>.</li><li><strong>Chẩn đoán:</strong> Kiểm tra bằng lệnh <code>systemd-detect-virt</code> và <code>uname -r</code>. Kết quả phát hiện lập trình viên đang chạy bên trong một Docker Container trên máy tính cá nhân. Thư mục <code>/lib/modules/$(uname -r)</code> hoàn toàn không tồn tại vì Container chỉ sử dụng chung nhân với máy chủ và không có quyền nạp module trực tiếp vào kernel của host.</li><li><strong>Nguyên nhân gốc:</strong> Container chia sẻ nhân và bị cô lập thông qua Linux Capabilities; tiến trình không có quyền <code>CAP_SYS_MODULE</code> để can thiệp vào nhân hệ điều hành.</li><li><strong>Khắc phục:</strong> Đối với các bài học quản trị mạng sâu, nạp module hoặc định cấu hình lưu trữ, chuyển ngay sang thực hành trên <strong>Máy ảo độc lập (VirtualBox/VMware/Multipass)</strong> chạy một bản phân phối chuẩn (Ubuntu Server hoặc Rocky Linux) có nhân Linux đầy đủ.</li><li><strong>Phòng ngừa:</strong> Trước mỗi bài học, kỹ sư cần kiểm tra yêu cầu <code>requiresVM</code> trong giáo trình để chuẩn bị đúng môi trường phù hợp, tránh mất thời gian gỡ lỗi những giới hạn phần cứng không đáng có.</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Ngộ nhận \"Docker Container là một máy ảo siêu nhẹ\"",
            "content": "Đây là sai lầm kỹ thuật phổ biến nhất của lập trình viên. Container chỉ là một tập hợp các tiến trình thông thường trên máy chủ được bao bọc bởi Linux Namespaces (cô lập tầm nhìn về PID, mạng, ổ đĩa) và cgroups (giới hạn CPU, RAM). Container hoàn toàn không có nhân riêng. Nếu nhân của máy Host gặp sự cố mã lỗi nghiêm trọng (Kernel Panic), toàn bộ các Container trên máy đó sẽ lập tức sụp đổ."
          },
          {
            "title": "Lầm tưởng WSL2 mặc định tương thích 100% với máy chủ Linux thật",
            "content": "Dù WSL2 sử dụng nhân Linux thật chạy qua Hyper-V, Microsoft đã tùy biến cấu hình nhân này để ưu tiên tích hợp với Windows. Trên các phiên bản WSL cũ hơn cuối năm 2022, tiến trình PID 1 không phải là systemd mà là một dịch vụ chuyển tiếp của Microsoft. Ngoài ra, việc lưu trữ mã nguồn tại các ổ đĩa của Windows (đường dẫn <code>/mnt/c/...</code>) sẽ khiến tốc độ đọc ghi I/O giảm sút rõ rệt do phải chuyển dịch qua giao thức 9P; luôn lưu trữ dự án thực hành bên trong thư mục gốc của Linux (như <code>/home/username/...</code>)."
          }
        ],
        "tips": [
          {
            "title": "Tạo bản Snapshot dự phòng ngay sau khi cài xong máy ảo Linux",
            "content": "Ngay khi vừa hoàn tất cài đặt bản phân phối Linux trong máy ảo (VirtualBox / VMware), hãy đặt tên snapshot là 'Clean-Install-Base'. Bất cứ khi nào bạn thử nghiệm sai một lệnh cấu hình mạng hoặc phân quyền nhầm khiến hệ điều hành không thể khởi động, bạn chỉ cần bấm nút khôi phục (Restore Snapshot) để đưa môi trường về trạng thái ban đầu chỉ trong 2 giây mà không cần mất công cài đặt lại từ đầu."
          },
          {
            "title": "Nguồn tham chiếu tiêu chuẩn quốc tế cho Kernel và Distro",
            "content": "Để tra cứu tài liệu kỹ thuật chính thống không phụ thuộc vào blog cá nhân, hãy tham khảo: (1) Tài liệu Kernel chính thức tại https://www.kernel.org/doc/html/latest/, (2) Chuẩn định danh hệ điều hành os-release tại https://www.freedesktop.org/software/systemd/man/os-release.html, (3) Mục tiêu kỳ thi Linux Essentials & LPIC-1 tại trang chủ Linux Professional Institute (lpi.org)."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Thu thập thông số hệ thống bàn giao hạ tầng",
          "problem": "Bạn vừa tiếp nhận một máy chủ từ nhà cung cấp điện toán đám mây. Hãy viết các câu lệnh để in ra màn hình: (1) Tên nhân hệ điều hành, (2) Phiên bản phát hành của nhân, (3) Kiến trúc phần cứng máy tính và (4) Tên thương mại đầy đủ kèm phiên bản của bản phân phối.",
          "hint": "Sử dụng lệnh uname với tổ hợp 3 cờ viết tắt và lọc thông tin dòng PRETTY_NAME từ tệp định danh distro trong /etc/.",
          "solutionCode": "# 1. Hiển thị tên nhân, release và kiến trúc phần cứng\nuname -srm\n\n# 2. Trích xuất tên đầy đủ của bản phân phối\ngrep '^PRETTY_NAME=' /etc/os-release",
          "solutionOutput": "Linux 6.8.0-45-generic x86_64\nPRETTY_NAME=\"Ubuntu 24.04.1 LTS\"",
          "explanation": "Lệnh uname -srm kết hợp 3 cờ: -s (kernel name: Linux), -r (kernel release: 6.8.0-45-generic), -m (machine architecture: x86_64). Lệnh grep '^PRETTY_NAME=' trích xuất chính xác dòng định danh thân thiện với con người từ /etc/os-release theo chuẩn freedesktop.",
          "annotations": [
            {
              "part": "uname -srm",
              "text": "Lệnh chuẩn POSIX, chạy được trên mọi hệ thống Unix-like từ Linux, FreeBSD đến macOS."
            },
            {
              "part": "grep '^PRETTY_NAME='",
              "text": "Ký tự ^ neo ở đầu dòng, đảm bảo chỉ bắt đúng biến PRETTY_NAME mà không bị lẫn các trường khác."
            }
          ],
          "rubric": [
            {
              "criterion": "Đúng cú pháp lệnh chuẩn POSIX",
              "pass": "Sử dụng đúng uname với cờ -srm và grep /etc/os-release",
              "excellent": "Kết hợp cờ súc tích, lọc chính xác dòng PRETTY_NAME bằng regex neo ^",
              "weight": "40%"
            },
            {
              "criterion": "Kết quả đầu ra chính xác",
              "pass": "In được tên nhân, phiên bản và tên distro",
              "excellent": "Đầu ra sạch sẽ, không thừa thông tin rác",
              "weight": "30%"
            },
            {
              "criterion": "Giải thích cơ chế hệ thống",
              "pass": "Giải thích được ý nghĩa từng cờ",
              "excellent": "Phân tích được cấu trúc utsname do kernel lưu trữ",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Điều tra môi trường thực thi và kiểm tra tiến trình Init",
          "problem": "Khi nhận bàn giao một phiên làm việc SSH từ xa, bạn nghi ngờ đây không phải là máy ảo độc lập mà là một container hoặc môi trường ảo hóa nhẹ. Hãy dùng công cụ tiêu chuẩn để kiểm tra: (1) Môi trường ảo hóa là gì, (2) Tiến trình đang giữ PID 1 có phải là systemd hay không?",
          "hint": "Sử dụng công cụ systemd-detect-virt và lệnh ps tra cứu tiến trình số 1 với định dạng in tên lệnh.",
          "solutionCode": "# 1. Phát hiện loại ảo hóa của hệ thống\nsystemd-detect-virt\n\n# 2. Kiểm tra tên tiến trình đang giữ PID 1\nps -p 1 -o comm=",
          "solutionOutput": "wsl\nsystemd",
          "explanation": "Lệnh systemd-detect-virt kiểm tra các chữ ký DMI, hypervisor CPUID và cgroup để trả về tên công nghệ ảo hóa (wsl, docker, kvm, vmware, hoặc 'none' nếu là bare-metal). Lệnh ps -p 1 -o comm= trích xuất riêng tên lệnh (command name) của tiến trình số 1 mà không in dòng tiêu đề, cho phép xác nhận ngay hệ thống có đang chạy systemd thật sự hay không.",
          "annotations": [
            {
              "part": "systemd-detect-virt",
              "text": "Công cụ trả về mã thoát exit code 0 nếu phát hiện ảo hóa, và exit code khác 0 nếu là máy chủ vật lý."
            },
            {
              "part": "ps -p 1 -o comm=",
              "text": "Cờ -p 1 chọn lọc PID 1, cờ -o comm= định dạng cột hiển thị tên lệnh và dấu = ở cuối giúp ẩn tiêu đề cột."
            }
          ],
          "rubric": [
            {
              "criterion": "Nhận diện công nghệ ảo hóa",
              "pass": "Chạy đúng lệnh systemd-detect-virt để xác định loại môi trường thực thi",
              "excellent": "Hiểu rõ ý nghĩa giá trị trả về (none, kvm, wsl, docker) và mã thoát exit code của lệnh",
              "weight": "50%"
            },
            {
              "criterion": "Truy vấn chính xác tiến trình PID 1",
              "pass": "Kiểm tra được tên tiến trình số 1 bằng lệnh ps -p 1",
              "excellent": "Sử dụng cờ định dạng -o comm= súc tích để ẩn dòng tiêu đề thừa, thuận tiện cho tự động hóa",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Kiểm tra tính sẵn sàng của môi trường cho lab Quản trị Hệ thống",
          "problem": "Hãy viết một câu lệnh đơn hoặc chuỗi lệnh bash (sử dụng toán tử logic &&) để kiểm tra xem môi trường hiện tại có đáp ứng 2 điều kiện tiên quyết cho các bài lab quản trị nâng cao hay không: (1) Kiến trúc máy tính phải là 64-bit (x86_64 hoặc aarch64), và (2) Tiến trình PID 1 bắt buộc phải là systemd. Nếu đạt cả hai điều kiện, in ra thông báo '[OK] Moi truong san sang'; nếu không đạt, in ra '[FAIL] Yeu cau kiem tra lai'.",
          "hint": "Kết hợp kiểm tra uname -m và ps -p 1 -o comm= bên trong khối lệnh điều kiện test [ ... ] hoặc nối bằng toán tử && và ||.",
          "solutionCode": "if [ \"$(uname -m)\" = \"x86_64\" -o \"$(uname -m)\" = \"aarch64\" ] && [ \"$(ps -p 1 -o comm=)\" = \"systemd\" ]; then echo \"[OK] Moi truong san sang\"; else echo \"[FAIL] Yeu cau kiem tra lai\"; fi",
          "solutionOutput": "[OK] Moi truong san sang",
          "explanation": "Đoạn mã sử dụng câu lệnh điều kiện shell tiêu chuẩn: Kiểm tra kiến trúc CPU thông qua $(uname -m) có khớp với x86_64 hoặc aarch64 hay không, kết hợp kiểm tra $(ps -p 1 -o comm=) có đúng bằng chuỗi 'systemd' hay không. Đây là kiểm tra bắt buộc trước khi triển khai các bài học về systemd service, quản lý cgroups và phân vùng đĩa ảo.",
          "annotations": [
            {
              "part": "$(uname -m)",
              "text": "Command substitution: thực thi lệnh uname -m và chèn kết quả chuỗi đầu ra vào biểu thức so sánh."
            },
            {
              "part": "$(ps -p 1 -o comm=)",
              "text": "Lấy tên của tiến trình PID 1 để đảm bảo hệ thống có init system hoàn chỉnh."
            },
            {
              "part": "-o",
              "text": "Toán tử logic OR trong khối kiểm tra [ ... ] của POSIX shell."
            }
          ],
          "rubric": [
            {
              "criterion": "Biểu thức điều kiện kiểm tra kiến trúc 64-bit",
              "pass": "Kiểm tra được đầu ra của $(uname -m) với chuỗi x86_64",
              "excellent": "Bao phủ đầy đủ cả hai kiến trúc 64-bit phổ biến trên cloud hiện đại là x86_64 và aarch64 (ARM64)",
              "weight": "40%"
            },
            {
              "criterion": "Kết hợp logic xác thực Init System",
              "pass": "Ghép nối đúng điều kiện kiểm tra PID 1 là systemd bằng toán tử logic &&",
              "excellent": "Bọc biến command substitution trong dấu ngoặc kép an toàn chống lỗi khoảng trắng trong khối [ ... ]",
              "weight": "35%"
            },
            {
              "criterion": "Thông báo trạng thái chuẩn mực",
              "pass": "In đúng chuỗi [OK] khi đạt và [FAIL] khi không đạt yêu cầu",
              "excellent": "Cấu trúc câu lệnh if/then/else/fi rõ ràng, chạy ổn định trên mọi POSIX shell",
              "weight": "25%"
            }
          ]
        }
      ],
      "summary": [
        "Linux về bản chất là một Nhân (Kernel) điều phối tài nguyên phần cứng tại Ring 0; Distro là hệ điều hành hoàn chỉnh đóng gói Kernel cùng GNU tools, systemd và trình quản lý gói.",
        "Ba họ Distro chủ lực bao gồm: Debian/Ubuntu (ổn định, phổ biến Cloud), RHEL/Rocky (chuẩn mực doanh nghiệp khắt khe) và Arch Linux (rolling release, tối tân).",
        "Môi trường thực hành có sự phân hóa rõ rệt: Máy ảo (VM) có kernel riêng và hỗ trợ snapshot an toàn tuyệt đối; WSL2 tiện lợi cho lập trình cơ bản; Container Docker chia sẻ kernel host và không phù hợp cho các bài thực hành can thiệp phần cứng/kernel.",
        "Các công cụ tiêu chuẩn để kiểm tra định danh hệ điều hành gồm: uname (thông số kernel và kiến trúc CPU), /etc/os-release (thông tin bản phân phối) và systemd-detect-virt (nhận diện môi trường ảo hóa).",
        "Luôn tuân thủ nguyên tắc đặc quyền tối thiểu: làm việc với tài khoản người dùng thông thường và chỉ nâng quyền qua sudo khi thật sự cần thiết."
      ],
      "generalInfo": {
        "duration": "45 phút",
        "targetAudience": "Lập trình viên, Kỹ sư DevOps, Quản trị viên hệ thống bắt đầu với Linux",
        "prerequisites": "Kiến thức máy tính căn bản, thao tác bàn phím và giao diện dòng lệnh cơ bản",
        "environment": "Ubuntu 22.04 / 24.04 LTS trên Máy ảo (VM - VirtualBox/VMware/UTM) hoặc WSL2",
        "materials": "Terminal emulator, quyền sudo máy ảo, snapshot máy ảo sạch (Clean snapshot)"
      },
      "nextLessonPreview": "Trong bài tiếp theo (1.2), chúng ta sẽ khám phá giải phẫu Cây Thư mục Linux Chuẩn FHS: Giải mã triết lý 'Mọi thứ đều là file' và vị trí lưu trữ an toàn của cấu hình, log, dữ liệu người dùng.",
      "quiz": [
        {
          "question": "Sự khác biệt căn bản nhất giữa Linux Kernel và một Bản phân phối Linux (Distro) là gì?",
          "options": [
            "Kernel chứa toàn bộ trình duyệt web và giao diện đồ họa, còn Distro chỉ là tên thương hiệu.",
            "Kernel là lõi phần mềm Ring 0 quản lý phần cứng và cung cấp syscalls; Distro đóng gói Kernel kèm thư viện GNU, systemd và trình quản lý gói thành OS hoàn chỉnh.",
            "Distro chạy độc lập không cần Kernel, còn Kernel chỉ dùng cho máy chủ siêu máy tính.",
            "Kernel và Distro là hai từ đồng nghĩa hoàn toàn trong chuẩn POSIX."
          ],
          "correctIndex": 1,
          "explanation": "Kernel là hạt nhân tại Ring 0; Distro đưa Kernel vào sử dụng thực tế bằng cách tích hợp thêm glibc, coreutils, systemd và bộ quản lý gói (apt/dnf/pacman)."
        },
        {
          "question": "Tại sao Docker Container mặc định không thể thực thi lệnh nạp module kernel như `modprobe iptable_nat`?",
          "options": [
            "Vì Docker chỉ hỗ trợ ngôn ngữ Python, không hỗ trợ ngôn ngữ C của nhân Linux.",
            "Vì Docker Container chia sẻ chung nhân Kernel của máy chủ Host và mặc định bị tước quyền CAP_SYS_MODULE để bảo vệ an toàn cho máy chủ.",
            "Vì Docker luôn chạy trên hệ điều hành Windows nên không có khái niệm module.",
            "Vì lệnh modprobe chỉ chạy được trên CPU 32-bit."
          ],
          "correctIndex": 1,
          "explanation": "Container không có nhân riêng mà chạy chung nhân với host. Linux Namespaces và Capabilities chặn container can thiệp vào kernel để ngăn chặn rủi ro Container Breakout."
        },
        {
          "question": "Lệnh nào sau đây là chuẩn POSIX để kiểm tra phiên bản phát hành của nhân Linux đang chạy trong bộ nhớ RAM?",
          "options": [
            "uname -r",
            "cat /etc/version",
            "kernel --version",
            "os-release -k"
          ],
          "correctIndex": 0,
          "explanation": "uname -r (cờ --kernel-release) là lệnh chuẩn POSIX có mặt trên mọi hệ điều hành Unix/Linux để in phiên bản nhân đang nạp."
        }
      ],
      "reflectionQuestion": "Một đồng nghiệp nói: 'Tôi vừa chạy Ubuntu bên trong Docker trên máy Mac chạy chip Apple Silicon M3, nên tôi đang có một máy ảo Ubuntu x86_64 hoàn chỉnh để test hệ thống'. Hãy dùng kiến trúc Kernel vs Distro và ảo hóa để chỉ ra 2 sai lầm kỹ thuật nghiêm trọng trong phát biểu trên.",
      "reflectionHint": "Gợi ý: (1) Docker trên macOS chạy qua máy ảo Linux ảo hóa nhẹ, container bên trong chia sẻ nhân Linux của VM đó; (2) Chip Apple M3 là kiến trúc aarch64 (ARM64), không phải x86_64 trừ khi bật chế độ giả lập Rosetta 2 vốn làm suy giảm hiệu năng và sai lệch cấu trúc binary."
    },
    {
      "id": "lx-1-02",
      "number": "1.2",
      "title": "Giải phẫu Cây Thư mục Linux Chuẩn FHS (`/`, `/etc`, `/var`, `/home`, `/usr`, `/tmp`, `/proc`...)",
      "subtitle": "Nắm vững triết lý \"Mọi thứ đều là file\" và quy tắc sắp đặt dữ liệu của Tiêu chuẩn Phân cấp Hệ thống File",
      "level": "Cơ bản",
      "duration": "40 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Liệt kê và định nghĩa chức năng của 10 thư mục cấp 1 theo chuẩn FHS 3.0 (`/`, `/etc`, `/var`, `/home`, `/usr`, `/tmp`, `/proc`, `/sys`, `/opt`, `/dev`).",
        "2. [Hiểu - Understand] Giải thích cơ chế UsrMerge và phân loại dữ liệu theo 2 chiều: Tĩnh/Biến đổi (Static/Variable) và Có thể chia sẻ/Không chia sẻ (Shareable/Unshareable).",
        "3. [Vận dụng - Apply] Thực hiện thành thạo các lệnh khảo sát dung lượng và điều tra tệp (`df -h`, `du -sh`, `man 7 hier`) để định vị chính xác vị trí lưu trữ cấu hình, mã nguồn và log.",
        "4. [Phân tích - Analyze] Điều tra nguyên nhân gốc rễ sự cố tràn phân vùng đĩa cứng (`/` 100% full) và truy vết tiến trình ngầm qua thư mục ảo `/proc/<PID>`."
      ],
      "intuition": {
        "title": "Tòa cao ốc một lối vào duy nhất và Các phòng chức năng chuẩn hóa",
        "metaphor": "Trên Windows, hệ thống giống như một dãy nhà phố có nhiều cửa vào độc lập: cửa ổ C, cửa ổ D, cửa ổ E. Mỗi khi cắm thêm một USB, lại mọc thêm một cánh cửa ổ F. Trên Linux thì khác: toàn bộ thế giới là một tòa tháp cao ốc chọc trời chỉ có duy nhất MỘT sảnh chính ở tầng trệt ký hiệu là `/` (Root directory). Bất kỳ ổ đĩa cứng, phân vùng SSD, USB hay ổ đĩa mạng NAS nào muốn xuất hiện đều phải được \"gắn kết\" (mount) vào làm một căn phòng con bên trong tòa tháp đó. Mọi phòng ban đều có quy định nghiêm ngặt theo chuẩn FHS: phòng hành chính `/etc` chỉ giữ hồ sơ văn bản cấu hình; kho lưu trữ biến động `/var` chứa nhật ký log và dữ liệu website; phòng thiết bị `/dev` đại diện cho các cổng ngoại vi; còn phòng nghiên cứu `/proc` không hề có tủ gỗ chứa đồ thật mà là màn hình hiển thị trực tiếp trạng thái nhịp tim của CPU và RAM.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📁</span><span>CÁC THƯ MỤC CỐT LÕI HỆ THỐNG</span><span class=\"lx-vs-tag\">Root Partition /</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/</code> (Root):</strong> Gốc của toàn bộ hệ thống file. Mọi đường dẫn tuyệt đối đều bắt đầu từ đây.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/etc</code> (Host-specific Config):</strong> Chứa toàn bộ tệp cấu hình toàn hệ thống (nginx, ssh, passwd). Chỉ là văn bản plain text, không chứa file thực thi binary.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/var</code> (Variable Data):</strong> Chứa dữ liệu thay đổi liên tục: nhật ký log (<code>/var/log</code>), hàng đợi email (<code>/var/spool</code>), cơ sở dữ liệu (<code>/var/lib</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/home</code> &amp; <code>/root</code>:</strong> Thư mục cá nhân của người dùng thường (<code>/home/username</code>) và thư mục riêng của quản trị viên tối cao (<code>/root</code>).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>PHẦN MỀM &amp; HỆ THỐNG FILE ẢO</span><span class=\"lx-vs-tag\">Virtual &amp; User /usr</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/usr</code> (User System Resources):</strong> Chứa hầu hết phần mềm người dùng, thư viện chia sẻ (<code>/usr/lib</code>) và tài liệu sổ tay (<code>/usr/share/man</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/opt</code> &amp; <code>/usr/local</code>:</strong> Nơi cài đặt ứng dụng bên thứ ba độc lập (Google Chrome, Docker) và phần mềm do kỹ sư tự biên dịch thủ công.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/tmp</code> (Temporary Files):</strong> Chứa file tạm thời, tự động dọn sạch khi khởi động lại máy hoặc theo chu kỳ thời gian.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/proc</code> &amp; <code>/sys</code>:</strong> Pseudo-filesystems nằm trên RAM, cửa sổ phản ánh tham số của nhân Linux và thông số tiến trình.</li></ul></div></div>",
        "boundary": "Khác với các phòng ốc vật lý thật, các thư mục như `/proc` và `/sys` không hề tốn một byte dung lượng nào trên đĩa cứng; chúng là các filesystem ảo (pseudo-fs) do Kernel tạo ra và duy trì trực tiếp trong bộ nhớ RAM."
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Chuẩn FHS 3.0, UsrMerge & Hệ thống File Ảo",
          "content": "<p>Hệ điều hành Linux tổ chức toàn bộ dữ liệu dưới dạng một cây phân cấp duy nhất bắt đầu từ gốc <code>/</code> (Root). Tiêu chuẩn <strong>FHS (Filesystem Hierarchy Standard 3.0)</strong> phân loại mọi dữ liệu hệ thống theo ma trận 2 chiều:</p>\n    <ul>\n      <li><strong>Tĩnh vs Biến đổi:</strong> <code>/usr</code> (tĩnh, chỉ đổi khi cập nhật gói) vs <code>/var</code> (biến đổi liên tục theo thời gian thực).</li>\n      <li><strong>Chia sẻ vs Không chia sẻ:</strong> <code>/usr/share</code> (có thể mount qua mạng NFS dùng chung cho nhiều máy) vs <code>/etc</code> (gắn chặt với cấu hình cục bộ của từng máy).</li>\n    </ul>\n    <p><strong>Kiến trúc UsrMerge hiện đại:</strong> Trên Ubuntu 20.04+, Debian 12+, RHEL 9+, các thư mục <code>/bin</code>, <code>/sbin</code>, <code>/lib</code> tại gốc thực chất là <strong>symbolic link</strong> trỏ vào <code>/usr/bin</code>, <code>/usr/sbin</code>, <code>/usr/lib</code>, giúp đơn giản hóa việc quản lý gói và snapshot hệ thống.</p>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Lệnh / Đường dẫn</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Quy chuẩn FHS 3.0</th></tr></thead>\n    <tbody>\n      <tr><td><code>/etc/</code></td><td>Thư mục chứa toàn bộ tệp cấu hình toàn hệ thống</td><td><code>/etc/&lt;dich-vu&gt;/</code></td><td><code>cat /etc/nginx/nginx.conf</code></td><td>Chỉ chứa plain text, không chứa file thực thi nhị phân.</td></tr>\n      <tr><td><code>/var/log/</code></td><td>Thư mục ghi nhận nhật ký hệ thống và ứng dụng</td><td><code>/var/log/&lt;app&gt;/</code></td><td><code>tail -f /var/log/syslog</code></td><td>Dữ liệu biến đổi liên tục; cần cấu hình xoay vòng <code>logrotate</code>.</td></tr>\n      <tr><td><code>/proc/</code></td><td>Hệ thống file ảo phản ánh thông số nhân và tiến trình</td><td><code>/proc/&lt;PID&gt;/</code></td><td><code>cat /proc/meminfo</code></td><td>Nằm hoàn toàn trong RAM; dung lượng trên đĩa luôn bằng 0.</td></tr>\n      <tr><td><code>df -h</code></td><td>Báo cáo dung lượng và tỷ lệ sử dụng các phân vùng</td><td><code>df [tùy_chọn] [đường_dẫn]</code></td><td><code>df -h /</code></td><td><code>-h</code> hiển thị đơn vị GB, MB dễ đọc cho con người.</td></tr>\n      <tr><td><code>du -sh</code></td><td>Tính toán tổng kích thước thư mục hoặc file</td><td><code>du -sh &lt;đường_dẫn&gt;</code></td><td><code>sudo du -sh /var/log</code></td><td><code>-s</code> gom tổng dung lượng, <code>-h</code> hiển thị dạng human-readable.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Kiểm tra kiến trúc UsrMerge và kiểm tra dung lượng phân vùng gốc",
              "lang": "Bash",
              "code": "# 1. Xác minh UsrMerge qua liên kết symlink\nls -ld /bin /sbin /lib\n\n# 2. Khảo sát dung lượng phân vùng gốc /\ndf -h /",
              "output": "lrwxrwxrwx 1 root root 7 Apr 22 10:00 /bin -> usr/bin\nlrwxrwxrwx 1 root root 8 Apr 22 10:00 /lib -> usr/lib\nlrwxrwxrwx 1 root root 8 Apr 22 10:00 /sbin -> usr/sbin\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   14G   34G  30% /",
              "annotations": [
                {
                  "line": 2,
                  "text": "Chữ cái đầu 'l' xác nhận đây là liên kết tượng trưng (symlink), trỏ vào bên trong /usr."
                },
                {
                  "line": 5,
                  "text": "df -h /: Kiểm tra kích thước tổng thể, dung lượng đã dùng và còn trống của phân vùng /."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-2-fhs-matrix",
          "title": "4.1 Ma trận Phân loại FHS 3.0 & Bản chất Kiến trúc UsrMerge",
          "content": "<p>Khác với Windows phân chia dữ liệu theo ký tự ổ đĩa vật lý (<code>C:\\</code>, <code>D:\\</code>), Linux gắn kết (mount) mọi ổ cứng, phân vùng mạng và thiết bị ảo vào một cây thư mục hợp nhất bắt đầu từ gốc <code>/</code>. Tiêu chuẩn <strong>Filesystem Hierarchy Standard (FHS 3.0)</strong> do Linux Foundation ban hành quy định nghiêm ngặt vị trí đặt từng loại tệp để quản trị viên và phần mềm không bao giờ giẫm chân lên nhau:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Thư mục gốc</th><th>Vai trò chuẩn FHS 3.0</th><th>Ví dụ thực tế trong vận hành</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><code>/etc</code></td><td>Cấu hình tĩnh toàn cục của hệ thống và dịch vụ (chỉ chứa văn bản, cấm đặt binary)</td><td><code>/etc/ssh/sshd_config</code>, <code>/etc/fstab</code>, <code>/etc/nginx/</code></td></tr>\n          <tr><td><code>/usr</code></td><td>Tài nguyên hệ thống chỉ đọc (Read-only userland): lệnh nhị phân, thư viện, tài liệu</td><td><code>/usr/bin/python3</code>, <code>/usr/lib/</code>, <code>/usr/share/man/</code></td></tr>\n          <tr><td><code>/usr/local</code></td><td>Phần mềm do quản trị viên tự biên dịch từ mã nguồn (không bị <code>apt</code>/<code>dnf</code> ghi đè)</td><td><code>/usr/local/bin/custom-cli</code></td></tr>\n          <tr><td><code>/opt</code></td><td>Các gói ứng dụng độc lập của bên thứ ba hoặc ứng dụng nội bộ doanh nghiệp tự đóng gói</td><td><code>/opt/fastapi-service/</code>, <code>/opt/google/chrome/</code></td></tr>\n          <tr><td><code>/srv</code></td><td>Dữ liệu trực tiếp do dịch vụ máy chủ cung cấp ra bên ngoài (Web, FTP, Git)</td><td><code>/srv/www/</code>, <code>/srv/git/</code></td></tr>\n          <tr><td><code>/home</code> &amp; <code>/root</code></td><td>Thư mục cá nhân của người dùng thường (<code>/home/&lt;user&gt;</code>) và riêng quản trị viên tối cao (<code>/root</code>)</td><td><code>/home/devops/.ssh/</code>, <code>/root/</code></td></tr>\n        </tbody>\n      </table>\n    </div>\n    <p><strong>Tại sao các Distro hiện đại áp dụng UsrMerge?</strong> Trong lịch sử thập niên 1970, đĩa gốc <code>/</code> rất nhỏ nên các lệnh cứu hộ tối thiểu nằm ở <code>/bin</code>, còn phần mềm mở rộng nằm ở <code>/usr/bin</code> trên ổ đĩa thứ hai. Ngày nay, việc tách đôi này gây phức tạp khi tạo ảnh hệ điều hành bất biến (Immutable OS) và Container. Với <strong>UsrMerge</strong>, toàn bộ tệp thực thi quy tụ về <code>/usr/bin</code> và <code>/usr/sbin</code>, còn <code>/bin</code>, <code>/sbin</code>, <code>/lib</code> chỉ là các liên kết mềm (symlinks) giữ tính tương thích ngược 100% cho các script cũ dùng <code>#!/bin/sh</code>.</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm chứng liên kết UsrMerge và khám phá cấu trúc tầng cao nhất tại /",
              "code": "# 1. Kiểm tra bản chất symlink của /bin, /sbin, /lib trên hệ điều hành hiện đại\nls -ld /bin /sbin /lib /usr/bin\n\n# 2. Xác định đường dẫn vật lý thật sự của trình thông dịch sh và bash\nreadlink -f /bin/sh /bin/bash",
              "output": "lrwxrwxrwx 1 root root     7 Apr 22 09:00 /bin -> usr/bin\nlrwxrwxrwx 1 root root     7 Apr 22 09:00 /lib -> usr/lib\nlrwxrwxrwx 1 root root     8 Apr 22 09:00 /sbin -> usr/sbin\ndrwxr-xr-x 2 root root 69632 Oct 15 14:20 /usr/bin\n/usr/bin/dash\n/usr/bin/bash",
              "annotations": [
                {
                  "line": 2,
                  "part": "ls -ld",
                  "text": "Cờ -d xem thuộc tính của bản thân thư mục/symlink thay vì liệt kê hàng nghìn file bên trong nó."
                },
                {
                  "line": 5,
                  "part": "readlink -f",
                  "text": "Truy xuất chuỗi liên kết mềm đến tận tệp đích vật lý cuối cùng (/bin/sh trên Ubuntu trỏ tới trình shell siêu nhẹ /usr/bin/dash)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-2-var-tmp-run",
          "title": "4.2 Quản trị Phân vùng Biến đổi (/var, /tmp, /run) & Phòng chống Đầy ổ Đĩa",
          "content": "<p>Trên máy chủ sản xuất chạy liên tục nhiều năm, 90% sự cố sập dịch vụ do cạn kiệt dung lượng đĩa (<code>No space left on device</code>) xuất phát từ việc hiểu sai vòng đời của 3 thư mục chứa dữ liệu động:</p>\n    <ul>\n      <li><strong><code>/var</code> (Variable Data):</strong> Nơi lưu trữ dữ liệu phình to liên tục theo hoạt động của dịch vụ, bao gồm nhật ký <code>/var/log</code>, dữ liệu gốc của Database/Docker tại <code>/var/lib/postgresql</code>, <code>/var/lib/docker</code>, hàng đợi mail/in ấn tại <code>/var/spool</code> và bộ đệm gói tải về <code>/var/cache</code>. <em>Thực tiễn kiến trúc:</em> Trên server chuẩn CIS Benchmark, <code>/var</code> và <code>/var/log</code> luôn được tách thành phân vùng LVM riêng biệt để nếu ứng dụng bị lỗi ghi log điên cuồng cũng không làm đầy phân vùng gốc <code>/</code> gây treo hệ điều hành.</li>\n      <li><strong><code>/tmp</code> vs <code>/var/tmp</code> (Temporary Files):</strong> Cả hai đều cho phép mọi người dùng tạo tệp tạm (nhờ Sticky Bit <code>1777</code>), nhưng khác nhau hoàn toàn về vòng đời! Dữ liệu trong <code>/tmp</code> bị xóa sạch mỗi khi khởi động lại máy (hoặc sau 10 ngày bởi <code>systemd-tmpfiles</code>), thậm chí nhiều distro gắn <code>/tmp</code> trực tiếp lên RAM (<code>tmpfs</code>). Ngược lại, <code>/var/tmp</code> nằm trên đĩa cứng vật lý và được bảo toàn qua các lần reboot (thường giữ 30 ngày).</li>\n      <li><strong><code>/run</code> (Runtime Data):</strong> Luôn luôn là hệ thống file trên RAM (<code>tmpfs</code>), chứa các tệp PID (<code>nginx.pid</code>), Unix Domain Socket (<code>/run/mysqld/mysqld.sock</code>, <code>/run/docker.sock</code>) phản ánh trạng thái sống của dịch vụ từ lúc boot. Mọi dữ liệu trong <code>/run</code> biến mất ngay lập tức khi tắt nguồn.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Phân tích kiểu hệ thống file của /, /run, /tmp và rà soát dung lượng /var",
              "code": "# 1. Kiểm tra loại filesystem (ext4/xfs trên đĩa vs tmpfs trên RAM) bằng df -Th\ndf -Th / /run /tmp\n\n# 2. Liệt kê top 5 thư mục con chiếm nhiều dung lượng đĩa nhất bên trong /var\nsudo du -sh /var/* 2>/dev/null | sort -rh | head -n 5",
              "output": "Filesystem     Type   Size  Used Avail Use% Mounted on\n/dev/sda2      ext4    50G   12G   36G  25% /\ntmpfs          tmpfs  792M  1.6M  791M   1% /run\n/dev/sda2      ext4    50G   12G   36G  25% /\n4.2G\t/var/lib\n1.8G\t/var/log\n540M\t/var/cache\n12M\t/var/backups\n4.0K\t/var/tmp",
              "annotations": [
                {
                  "line": 2,
                  "part": "df -Th",
                  "text": "Cờ -T hiển thị cột Type giúp phân biệt ngay phân vùng lưu trữ bền vững (ext4/xfs) với phân vùng RAM tạm thời (tmpfs)."
                },
                {
                  "line": 5,
                  "part": "sort -rh",
                  "text": "Cờ -h (human-numeric-sort) hiểu đúng thứ tự đơn vị G > M > K (không bị lỗi xếp 540M lớn hơn 4.2G như sort chữ thông thường)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-2-proc-sys-vfs",
          "title": "4.3 Hệ thống File Ảo /proc, /sys, /dev & Triết lý \"Mọi thứ đều là File\"",
          "content": "<p>Triết lý thiết kế vĩ đại nhất của Unix/Linux là <strong>\"Everything is a file\"</strong> (Mọi thực thể đều được trừu tượng hóa qua giao diện tệp tin). Thay vì bắt lập trình viên học hàng trăm API độc quyền để đọc nhiệt độ CPU, thông số RAM hay ổ cứng, Kernel phơi bày toàn bộ trạng thái nội bộ thành các tệp văn bản và tệp thiết bị:</p>\n    <ul>\n      <li><strong><code>/proc</code> (procfs):</strong> Cửa sổ trực tiếp nhìn vào không gian nhân và từng tiến trình đang sống trong RAM. Các tệp như <code>/proc/cpuinfo</code>, <code>/proc/meminfo</code>, <code>/proc/loadavg</code> có kích thước hiển thị là <code>0 byte</code> trên đĩa cứng vì dữ liệu chỉ được Kernel sinh ra tức thời ngay khoảnh khắc bạn gọi lệnh <code>cat</code> đọc chúng! Mỗi tiến trình có một thư mục riêng mang số hiệu <code>/proc/&lt;PID&gt;/</code>.</li>\n      <li><strong><code>/sys</code> (sysfs):</strong> Cấu trúc phân cấp có trật tự của các thiết bị phần cứng, bus PCI/USB, ổ đĩa khối (<code>/sys/block/</code>) và cấu hình module nhân.</li>\n      <li><strong><code>/dev</code> (devtmpfs):</strong> Chứa các tệp thiết bị đặc biệt đóng vai trò cầu nối tới trình điều khiển (driver) trong Kernel:\n        <ul>\n          <li><em>Block Devices (ký hiệu <code>b</code> đầu dòng <code>ls -l</code>):</em> Đọc ghi theo khối dữ liệu có bộ đệm như ổ cứng <code>/dev/sda</code>, <code>/dev/nvme0n1</code>.</li>\n          <li><em>Character Devices (ký hiệu <code>c</code>):</em> Truyền luồng từng ký tự không đệm như terminal <code>/dev/pts/0</code>, hố đen hủy dữ liệu <code>/dev/null</code>, bộ sinh số ngẫu nhiên mật mã <code>/dev/urandom</code>.</li>\n        </ul>\n      </li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Khám phá tệp ảo 0-byte trong /proc và các thiết bị đặc biệt trong /dev",
              "code": "# 1. Chứng minh tệp /proc/meminfo có kích thước 0 byte nhưng vẫn chứa dữ liệu sống\nls -lh /proc/meminfo\nhead -n 4 /proc/meminfo\n\n# 2. Phân biệt Block device (b) và Character device (c) trong /dev\nls -l /dev/null /dev/urandom /dev/zero",
              "output": "-r--r--r-- 1 root root 0 Nov  4 09:15 /proc/meminfo\nMemTotal:        8105432 kB\nMemFree:         2418920 kB\nMemAvailable:    5120488 kB\nBuffers:          184320 kB\ncrw-rw-rw- 1 root root 1, 3 Nov  4 08:00 /dev/null\ncrw-rw-rw- 1 root root 1, 9 Nov  4 08:00 /dev/urandom\ncrw-rw-rw- 1 root root 1, 5 Nov  4 08:00 /dev/zero",
              "annotations": [
                {
                  "line": 2,
                  "part": "0 Nov 4 ... /proc/meminfo",
                  "text": "Kích thước bằng 0 chứng tỏ file không tốn 1 byte ổ cứng nào; Kernel tạo chuỗi văn bản trực tiếp từ bộ nhớ RAM khi đọc."
                },
                {
                  "line": 6,
                  "part": "crw-rw-rw- ... 1, 3",
                  "text": "Chữ 'c' ở đầu biểu thị Character Device; cặp số '1, 3' là Major và Minor number để Kernel định tuyến tới đúng driver."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Truy tìm nguyên nhân gây cạn kiệt dung lượng đĩa trên máy chủ và xác định vị trí file đúng chuẩn.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Kiểm tra mức độ sử dụng đĩa: <code>df -h /</code>.</li>\n        <li><strong>Bước 2:</strong> Quét các thư mục con nặng nhất trong <code>/var</code>: <code>sudo du -sh /var/* 2>/dev/null | sort -rh | head -n 5</code>.</li>\n        <li><strong>Bước 3:</strong> Tra cứu tài liệu phân cấp chính thức: <code>man 7 hier</code>.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lệnh / Vị trí Sai Lầm</div>\n          <p>Lưu trữ database SQLite hoặc file upload của khách hàng tại <code>/tmp/app.db</code> hoặc <code>/tmp/uploads/</code>.</p>\n          <p><strong>Hậu quả:</strong> <code>/tmp</code> chạy trên RAM (tmpfs) và bị dọn sạch định kỳ hoặc khi máy chủ reboot, dẫn đến mất 100% dữ liệu sản xuất.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Lệnh / Vị trí Chuẩn FHS</div>\n          <p>Lưu dữ liệu bền vững của ứng dụng tại <code>/var/lib/my-app/</code> và cấu hình tại <code>/etc/my-app/</code>:</p>\n          <p><code>sudo mkdir -p /var/lib/my-app /var/log/my-app</code></p>\n          <p><strong>Ưu điểm:</strong> Dữ liệu bền vững an toàn, dễ cấu hình phân vùng riêng và sao lưu tự động.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Giải phẫu Cây Thư mục & Định vị Dữ liệu Ứng dụng",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.2</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thực hành khảo sát toàn diện cây thư mục FHS, phân tích dung lượng và thiết lập vị trí lưu trữ chuẩn cho một dịch vụ backend.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Máy ảo Linux với quyền sudo, thư mục gốc đang hoạt động bình thường.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Đọc sổ tay phân cấp thư mục hệ thống: <code>man 7 hier</code> (nhấn <code>q</code> để thoát).</li>\n        <li><strong>Bước 2:</strong> Kiểm tra các thư mục symlink của UsrMerge: <code>ls -ld /bin /sbin /lib</code>.</li>\n        <li><strong>Bước 3:</strong> Khảo sát thông số RAM từ hệ thống file ảo: <code>cat /proc/meminfo | head -n 5</code>.</li>\n        <li><strong>Bước 4:</strong> Tạo cấu trúc thư mục chuẩn FHS cho ứng dụng Python: <code>sudo mkdir -p /opt/pyapp /etc/pyapp /var/log/pyapp /var/lib/pyapp</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">ls -ld /opt/pyapp /etc/pyapp /var/log/pyapp /var/lib/pyapp\n-> 4 thư mục được khởi tạo thành công với cấu trúc phân cấp chuẩn FHS.</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Sử dụng lệnh <code>findmnt</code> để tìm xem có bao nhiêu hệ thống file loại <code>tmpfs</code> hoặc <code>proc</code> đang được mount trên máy chủ.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không xóa bất kỳ thư mục con nào tại gốc <code>/</code> (như <code>/etc</code>, <code>/usr</code>, <code>/var</code>). Lệnh <code>rm -rf /</code> hoặc <code>rm -rf /etc</code> sẽ phá hủy máy chủ ngay lập tức.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Hiện tượng / Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>No space left on device</code> dù ổ cứng còn trống</td><td>Cạn kiệt chỉ số Inode (do có hàng triệu file rác kích thước 0 byte trong <code>/tmp</code> hoặc <code>/var/spool</code>).</td><td>Kiểm tra bảng Inode: <code>df -i /</code>. Dùng lệnh <code>find /var/spool -type f -delete</code> để giải phóng inode.</td></tr>\n          <tr><td>Dữ liệu trong <code>/tmp</code> biến mất sau khi reboot</td><td><code>/tmp</code> được mount dạng <code>tmpfs</code> trong RAM hoặc bị <code>systemd-tmpfiles-clean</code> tự động dọn sạch.</td><td>Chuyển vị trí lưu file sang <code>/var/tmp</code> (tồn tại qua reboot) hoặc thư mục riêng tại <code>/var/lib/</code>.</td></tr>\n          <tr><td>Nhầm lẫn giữa <code>/</code> và <code>/root</code></td><td>Gõ nhầm đường dẫn thư mục gốc và thư mục cá nhân của root user.</td><td>Quy ước rõ: <code>/</code> là Root Directory; <code>/root</code> là Home của Root User; <code>/home/user</code> là Home của người dùng thường.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Tách riêng phân vùng ổ đĩa cho <code>/var</code> và <code>/home</code>:</strong> Trong môi trường sản xuất, luôn cấu hình <code>/var</code> (chứa log) trên một phân vùng (partition/LVM) riêng biệt để khi log phình to không làm sụp đổ phân vùng hệ điều hành gốc <code>/</code>.</li>\n        <li><strong>Không bao giờ cấp quyền 777 cho thư mục ứng dụng:</strong> Đặt quyền đúng chuẩn FHS: mã nguồn thuộc sở hữu của user dịch vụ (ví dụ <code>deploy:www-data</code>), quyền <code>750</code> cho thư mục và <code>640</code> cho tệp tin.</li>\n        <li><strong>Tận dụng Sticky Bit:</strong> Các thư mục chia sẻ chung cho nhiều người dùng phải luôn được kích hoạt Sticky Bit (quyền <code>1777</code>) để ngăn người dùng xóa trộm tệp của nhau.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Chuẩn FHS chính thức:</strong> <a href=\"https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.html\" target=\"_blank\" rel=\"noopener\">Filesystem Hierarchy Standard (FHS 3.0) - The Linux Foundation</a>.</li>\n      <li><strong>Tài liệu sổ tay hệ thống:</strong> <code>man 7 hier</code> — Description of the filesystem hierarchy.</li>\n      <li><strong>Kiến trúc UsrMerge:</strong> <a href=\"https://www.freedesktop.org/wiki/Software/systemd/TheCaseForTheUsrMerge/\" target=\"_blank\" rel=\"noopener\">The Case for the /usr Merge (freedesktop.org)</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Cheat Sheet & Bảng Đối chiếu Thuật ngữ Quốc tế",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Đường dẫn FHS</th><th>Tên đầy đủ</th><th>Nội dung lưu trữ chuẩn</th></tr></thead>\n        <tbody>\n          <tr><td><code>/etc</code></td><td>Editable Text Configuration</td><td>Tệp cấu hình máy chủ và dịch vụ (nginx, sshd, hosts).</td></tr>\n          <tr><td><code>/var</code></td><td>Variable Data</td><td>Dữ liệu biến động: logs, cơ sở dữ liệu, hàng đợi spool.</td></tr>\n          <tr><td><code>/usr</code></td><td>User System Resources</td><td>Phần mềm người dùng, thư viện chia sẻ, tài liệu hướng dẫn man.</td></tr>\n          <tr><td><code>/opt</code></td><td>Optional Software Packages</td><td>Phần mềm bên thứ ba độc lập kèm trọn bộ thư viện riêng.</td></tr>\n          <tr><td><code>/tmp</code></td><td>Temporary Directory</td><td>Tệp tạm thời, có Sticky Bit, tự động xóa khi khởi động lại.</td></tr>\n          <tr><td><code>/proc</code></td><td>Process Pseudo-filesystem</td><td>Hệ thống file ảo trong RAM phản ánh trạng thái Kernel và PID.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố: Dịch vụ Python FastAPI đột ngột mất dữ liệu tải lên và làm tê liệt máy chủ",
        "content": "<p>Một đội ngũ lập trình viên triển khai ứng dụng Python FastAPI xử lý ảnh người dùng. Sau 3 tuần chạy êm đềm, máy chủ đột ngột không thể đăng nhập qua SSH và toàn bộ dữ liệu ảnh tải lên của khách hàng trong ngày hôm trước bị mất sạch.</p><ol><li><strong>Triệu chứng:</strong> Dịch vụ web báo lỗi 500 'No space left on device', SSH báo lỗi không thể cấp phát bộ nhớ ảo, toàn bộ tệp tạm xử lý dở dang biến mất sau khi quản trị viên khởi động lại máy chủ.</li><li><strong>Chẩn đoán:</strong> Dùng lệnh cứu hộ kiểm tra phân vùng: <code>df -h /</code> báo <code>Use% 100%</code>. Kiểm tra mã nguồn Python phát hiện: (1) Lập trình viên lưu file ảnh tải lên trực tiếp vào <code>/tmp/uploads/</code>, (2) File log của Python được ghi trực tiếp vào thư mục gốc của code mà không giới hạn dung lượng, khiến file log phình to lên 35GB lấp đầy toàn bộ ổ đĩa <code>/</code>.</li><li><strong>Nguyên nhân gốc rễ:</strong> Vi phạm quy tắc FHS: (1) Lưu trữ dữ liệu lâu dài vào <code>/tmp</code> (thư mục chạy trên <code>tmpfs</code> RAM và tự động xóa khi reboot), (2) Không tách riêng phân vùng hoặc hạn ngạch lưu trữ cho thư mục nhật ký <code>/var/log</code>.</li><li><strong>Khắc phục:</strong> (1) Dọn sạch các file log rác quá hạn để khôi phục dung lượng cho <code>/</code>, (2) Cấu hình lại mã nguồn Python chuyển đường dẫn lưu trữ upload sang <code>/var/lib/fastapi-app/uploads/</code>, (3) Chuyển toàn bộ log ứng dụng về <code>/var/log/fastapi-app/</code> và thiết lập <code>logrotate</code> xoay vòng tệp nhật ký.</li><li><strong>Phòng ngừa:</strong> Khi thiết kế máy chủ sản xuất, luôn cấu hình phân vùng đĩa cứng riêng biệt cho <code>/var</code> hoặc <code>/var/log</code> để khi log bị tràn, phân vùng hệ thống <code>/</code> và các dịch vụ cốt lõi không bị tê liệt.</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Nhầm lẫn nguy hiểm giữa thư mục gốc / và thư mục /root",
            "content": "Dấu gạch chéo đơn độc <code>/</code> là Thư mục Gốc (Root directory) — tổ tiên của mọi file trên hệ thống. Trong khi đó, <code>/root</code> là Thư mục Nhà (Home directory) dành riêng cho siêu người dùng quản trị viên (root user), tương tự như <code>/home/ubuntu</code> của người dùng thường. Nhầm lẫn hai khái niệm này khi chạy lệnh như <code>rm -rf /root</code> hay <code>rm -rf /</code> có thể dẫn đến thảm họa phá hủy toàn bộ hệ điều hành."
          },
          {
            "title": "Lưu trữ dữ liệu ứng dụng vào /tmp dẫn đến mất dữ liệu không thể phục hồi",
            "content": "Nhiều người mới bắt đầu chọn <code>/tmp</code> làm nơi lưu database SQLite hoặc file upload vì thư mục này có quyền ghi tự do (777). Tuy nhiên, trên hầu hết bản phân phối Linux hiện đại, <code>/tmp</code> được mount bằng <code>tmpfs</code> (bộ nhớ RAM) hoặc được dọn sạch tự động bởi dịch vụ <code>systemd-tmpfiles-clean.timer</code>. Khi máy chủ khởi động lại hoặc sau 10-30 ngày, toàn bộ dữ liệu trong <code>/tmp</code> sẽ biến mất vĩnh viễn."
          }
        ],
        "tips": [
          {
            "title": "Tra cứu cấu trúc cây thư mục nhanh chóng ngay trên terminal",
            "content": "Khi quên mất chức năng của một thư mục trong hệ thống, hãy gõ ngay lệnh: <code>man 7 hier</code>. Sổ tay phân cấp hệ thống file sẽ giải thích tường tận mục đích thiết kế của từng thư mục từ <code>/bin</code>, <code>/etc</code>, <code>/srv</code> cho đến <code>/var/cache</code>."
          },
          {
            "title": "Quy chuẩn quốc tế FHS 3.0 cho phần mềm doanh nghiệp",
            "content": "Nếu bạn đóng gói ứng dụng doanh nghiệp có sẵn toàn bộ thư viện phụ thuộc (Self-contained software package) không dùng thư viện hệ thống, hãy cài đặt ứng dụng vào thư mục <code>/opt/&lt;ten-ung-dung&gt;</code> theo đúng tiêu chuẩn FHS 3.0 của The Linux Foundation."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Điều tra thư mục cấu hình hệ thống /etc",
          "problem": "Là một kỹ sư mới tiếp nhận máy chủ, hãy thực hiện các lệnh an toàn (chỉ đọc, không dùng quyền root) để: (1) Kiểm tra xem trên hệ thống có thư mục cấu hình của web server Nginx hay không, và (2) Liệt kê danh sách các tệp cấu hình kết thúc bằng đuôi '.conf' trong /etc/ mà không làm thay đổi bất kỳ tệp nào.",
          "hint": "Sử dụng lệnh ls với tùy chọn đường dẫn và ký tự đại diện globbing *.conf trong /etc/.",
          "solutionCode": "# 1. Kiểm tra sự tồn tại của thư mục cấu hình Nginx\nls -ld /etc/nginx\n\n# 2. Liệt kê các tệp cấu hình .conf trong /etc/ (lấy tối đa 5 tệp đầu tiên)\nls -l /etc/*.conf 2>/dev/null | head -n 5",
          "solutionOutput": "drwxr-xr-x 8 root root 4096 Oct 15 14:20 /etc/nginx\n-rw-r--r-- 1 root root  684 Apr  8  2024 /etc/adduser.conf\n-rw-r--r-- 1 root root 2995 Jan 25  2024 /etc/debconf.conf\n-rw-r--r-- 1 root root  604 Feb 18  2024 /etc/deluser.conf\n-rw-r--r-- 1 root root 1260 Apr 16  2024 /etc/gai.conf\n-rw-r--r-- 1 root root 2584 Mar 31  2024 /etc/hdparm.conf",
          "explanation": "Thư mục /etc là trung tâm lưu trữ toàn bộ cấu hình hệ điều hành. Mọi tệp tại đây đều có thể đọc được bằng tài khoản thường (trừ các tệp mật mã nhạy cảm như /etc/shadow). Kỹ sư luôn bắt đầu khảo sát một máy chủ mới từ thư mục /etc.",
          "annotations": [
            {
              "part": "ls -ld /etc/nginx",
              "text": "Kiểm tra nhanh xem Nginx đã được cài đặt trên hệ thống hay chưa thông qua sự hiện diện của thư mục cấu hình."
            },
            {
              "part": "2>/dev/null",
              "text": "Chuyển hướng thông báo lỗi (nếu có thư mục con không có quyền đọc) vào thùng rác ảo /dev/null."
            }
          ],
          "rubric": [
            {
              "criterion": "Đúng cú pháp lệnh và đường dẫn",
              "pass": "Sử dụng đúng ls với /etc/ và đuôi *.conf",
              "excellent": "Kết hợp cờ lọc -ld và chuyển hướng lỗi 2>/dev/null",
              "weight": "40%"
            },
            {
              "criterion": "Kết quả điều tra chính xác",
              "pass": "Liệt kê được danh sách file .conf",
              "excellent": "Giới hạn kết quả gọn gàng bằng head",
              "weight": "30%"
            },
            {
              "criterion": "Giải thích quy chuẩn FHS",
              "pass": "Hiểu được vai trò của /etc",
              "excellent": "Phân biệt được cấu hình tĩnh và dữ liệu biến đổi",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Truy tìm điểm nóng dung lượng trong thư mục biến đổi /var",
          "problem": "Máy chủ gửi cảnh báo phân vùng lưu trữ bắt đầu cạn kiệt. Hãy viết lệnh để điều tra xem trong thư mục /var, 3 thư mục con nào đang chiếm dụng dung lượng đĩa lớn nhất, sắp xếp theo thứ tự từ lớn nhất xuống nhỏ nhất và hiển thị ở định dạng dễ đọc (GB, MB).",
          "hint": "Kết hợp lệnh du với các cờ -s (summary), -h (human-readable) và đường ống pipe chuyển sang lệnh sort -rh.",
          "solutionCode": "# Điều tra top 3 thư mục nặng nhất trong /var\nsudo du -sh /var/* 2>/dev/null | sort -rh | head -n 3",
          "solutionOutput": "4.2G\t/var/log\n2.1G\t/var/lib\n512M\t/var/cache",
          "explanation": "Lệnh du -sh /var/* tính toán dung lượng tổng cộng của từng mục con trực tiếp dưới /var. Đường ống sort -rh sắp xếp theo thứ tự giảm dần (-r) dựa trên giá trị dung lượng thực tế (-h). Đây là kỹ năng sinh tồn đầu tiên khi xử lý sự cố tràn đĩa máy chủ.",
          "annotations": [
            {
              "part": "du -sh /var/*",
              "text": "Cờ -s gom tổng dung lượng của thư mục, cờ -h hiển thị đơn vị M, G."
            },
            {
              "part": "sort -rh",
              "text": "Cờ -h của sort cho phép nhận biết thông minh các tiền tố đơn vị K, M, G để so sánh chính xác."
            }
          ],
          "rubric": [
            {
              "criterion": "Tính toán và lọc dung lượng chính xác",
              "pass": "Sử dụng đúng lệnh du -sh /var/* để gom tổng dung lượng từng thư mục con",
              "excellent": "Chuyển hướng sạch thông báo lỗi quyền truy cập bằng 2>/dev/null để không làm bẩn luồng dữ liệu",
              "weight": "40%"
            },
            {
              "criterion": "Sắp xếp theo đơn vị dung lượng con người",
              "pass": "Sắp xếp giảm dần và trích xuất đúng 3 dòng đầu bằng head -n 3",
              "excellent": "Sử dụng chuẩn xác cờ sort -rh (human-numeric) để phân biệt đúng thứ tự GiB > MiB > KiB",
              "weight": "60%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Điều tra nguồn gốc tiến trình ngầm thông qua thư mục ảo /proc",
          "problem": "Hệ thống giám sát phát hiện một tiến trình lạ đang chiếm CPU cao mang PID là 1337. Không dùng các công cụ giám sát cao cấp, hãy chỉ dùng hệ thống file ảo /proc để trả lời 3 câu hỏi điều tra: (1) File thực thi nhị phân gốc của tiến trình nằm ở đâu trên ổ cứng? (2) Thư mục làm việc hiện tại (Current Working Directory) của tiến trình là gì? (3) Toàn bộ dòng lệnh khởi động chính xác của tiến trình là gì?",
          "hint": "Khảo sát các tệp liên kết đặc biệt exe, cwd và tệp cmdline bên trong thư mục ảo /proc/1337/.",
          "solutionCode": "# 1. Xác định đường dẫn file thực thi gốc trên đĩa\nls -l /proc/1337/exe\n\n# 2. Xác định thư mục làm việc hiện tại của tiến trình\nls -l /proc/1337/cwd\n\n# 3. Đọc toàn bộ chuỗi lệnh khởi động (các tham số phân tách bằng ký tự null, dùng tr để đổi sang dấu cách)\ntr '\\0' ' ' < /proc/1337/cmdline; echo",
          "solutionOutput": "lrwxrwxrwx 1 devops devops 0 Oct 28 10:15 /proc/1337/exe -> /usr/bin/python3.12\nlrwxrwxrwx 1 devops devops 0 Oct 28 10:15 /proc/1337/cwd -> /var/www/my-app\n/usr/bin/python3.12 -m uvicorn app.main:app --host 0.0.0.0 --port 8000",
          "explanation": "Trong /proc, mỗi tiến trình có thư mục mang tên PID của nó. Kernel cung cấp các symlink kỳ diệu: /proc/<PID>/exe trỏ thẳng vào file binary trên đĩa (dù file trên đĩa đã bị xóa hay đổi tên), /proc/<PID>/cwd trỏ vào thư mục làm việc, và cmdline chứa toàn bộ tham số khởi tạo tiến trình. Đây là kỹ thuật điều tra pháp chứng số (Digital Forensics) và xử lý sự cố nâng cao chuẩn LPIC-1/LPIC-2.",
          "annotations": [
            {
              "part": "/proc/1337/exe",
              "text": "Symlink ảo do kernel duy trì, giải mã chính xác binary thực thi đang nạp trong RAM."
            },
            {
              "part": "tr '\\0' ' '",
              "text": "Tệp /proc/<PID>/cmdline phân cách các tham số bằng ký tự null (\\0), tr thay thế thành khoảng trắng để terminal in rõ ràng."
            }
          ],
          "rubric": [
            {
              "criterion": "Truy vết tệp thực thi và thư mục làm việc qua symlink /proc",
              "pass": "Đọc được thông tin từ /proc/1337/exe và /proc/1337/cwd",
              "excellent": "Dùng ls -l hoặc readlink -f để giải mã chính xác đường dẫn đích trên ổ đĩa ngay cả khi binary gốc đã bị xóa",
              "weight": "45%"
            },
            {
              "criterion": "Giải mã chuỗi tham số khởi động phân tách bằng Null byte",
              "pass": "Đọc được nội dung từ tệp ảo /proc/1337/cmdline",
              "excellent": "Sử dụng lệnh tr '\\0' ' ' để chuyển đổi ký tự null byte thành khoảng trắng dễ đọc kèm xuống dòng sạch sẽ",
              "weight": "35%"
            },
            {
              "criterion": "Tư duy điều tra sự cố không phụ thuộc công cụ ngoài",
              "pass": "Hoàn thành cả 3 yêu cầu mà không dùng htop/pstree/lsof",
              "excellent": "Giải thích được bản chất procfs phản ánh trực tiếp bảng tiến trình trong RAM của Kernel",
              "weight": "20%"
            }
          ]
        }
      ],
      "summary": [
        "Toàn bộ cây thư mục Linux xuất phát từ một gốc duy nhất là `/` (Root directory); mọi ổ cứng, phân vùng hay thiết bị đều phải mount vào cây này.",
        "Tiêu chuẩn FHS 3.0 phân loại dữ liệu theo 2 trục: Tĩnh vs Biến đổi (Static/Variable) và Có thể chia sẻ vs Không thể chia sẻ (Shareable/Unshareable).",
        "Kiến trúc UsrMerge trên các distro hiện đại gộp `/bin`, `/sbin`, `/lib` thành các symlink trỏ vào `/usr`, chuẩn hóa toàn bộ file nhị phân hệ thống.",
        "Hệ thống file ảo `/proc` và `/sys` nằm trong RAM, hiện thực hóa triết lý 'Everything is a file' giúp lập trình viên và quản trị viên khảo sát trực tiếp tham số kernel và tiến trình.",
        "Quy chuẩn triển khai ứng dụng: Đặt cấu hình tại `/etc`, lưu mã nguồn tại `/var/www` hoặc `/opt`, ghi nhật ký tại `/var/log` và tuyệt đối không lưu dữ liệu vĩnh viễn trong `/tmp`."
      ],
      "generalInfo": {
        "duration": "45 phút",
        "targetAudience": "Lập trình viên Backend, Kỹ sư Hệ thống, DevOps",
        "prerequisites": "Đã hoàn thành Bài 1.1, nắm rõ khái niệm User Space và Terminal",
        "environment": "Máy ảo Linux Ubuntu 22.04/24.04 LTS hoặc WSL2",
        "materials": "Terminal, quyền sudo, gói tiện ích `tree` (tùy chọn)"
      },
      "nextLessonPreview": "Trong bài tiếp theo (1.3), chúng ta sẽ làm chủ Shell, Terminal và Bộ kỹ năng Tự tra cứu Sinh tồn (`man`, `--help`, `type`, `which`, `apropos`) để không bao giờ bị bế tắc khi đối mặt với bất kỳ lệnh lạ nào.",
      "quiz": [
        {
          "question": "Theo Tiêu chuẩn Phân cấp Hệ thống File (FHS 3.0), thư mục `/etc` được thiết kế để chứa loại dữ liệu nào?",
          "options": [
            "Các tệp thực thi nhị phân (binaries) của người dùng.",
            "Toàn bộ tệp cấu hình toàn hệ thống dạng văn bản (plain text) đặc thù cho máy chủ này.",
            "Nhật ký log hoạt động của các dịch vụ mạng.",
            "Tệp tạm thời bị xóa sau khi khởi động lại máy."
          ],
          "correctIndex": 1,
          "explanation": "/etc (Editable Text Configuration) là nơi chứa các file cấu hình toàn hệ thống dạng plain text như /etc/passwd, /etc/fstab, /etc/ssh/sshd_config."
        },
        {
          "question": "Hiện tượng UsrMerge trên các bản phân phối Linux hiện đại (Ubuntu 20.04+, Debian 12+, RHEL 9+) có nghĩa là gì?",
          "options": [
            "Thư mục /usr bị xóa bỏ hoàn toàn để tiết kiệm dung lượng đĩa.",
            "Các thư mục /bin, /sbin, /lib tại gốc thực chất là các symbolic link trỏ vào /usr/bin, /usr/sbin, /usr/lib.",
            "Tất cả người dùng đều có quyền root trong /usr.",
            "Chỉ cho phép chạy phần mềm viết bằng ngôn ngữ C."
          ],
          "correctIndex": 1,
          "explanation": "UsrMerge hợp nhất các thư mục nhị phân và thư viện vào bên trong /usr, để lại các symlink tại gốc / để tương thích ngược với các script Unix cổ điển."
        },
        {
          "question": "Tại sao không nên lưu trữ cơ sở dữ liệu hoặc tệp upload của ứng dụng web trong thư mục `/tmp`?",
          "options": [
            "Vì /tmp chỉ cho phép lưu file đuôi .txt.",
            "Vì /tmp thường chạy trên RAM (tmpfs) và tự động bị xóa sạch khi máy chủ reboot hoặc theo chu kỳ dọn dẹp.",
            "Vì /tmp không cho phép người dùng thường ghi file.",
            "Vì /tmp chỉ dành riêng cho tiến trình của Kernel."
          ],
          "correctIndex": 1,
          "explanation": "/tmp là thư mục tệp tạm; dữ liệu bền vững của ứng dụng phải được lưu tại /var/lib/ hoặc /var/www/."
        }
      ],
      "reflectionQuestion": "Khi kiểm tra một máy chủ đang hoạt động, bạn thấy lệnh `df -h /` báo còn trống 40GB, nhưng bất kỳ lệnh tạo file nào (`touch test.txt`) đều lập tức báo lỗi: `No space left on device`. Dựa vào cấu trúc hệ thống file Linux, hãy giải thích nguyên nhân gốc rễ và đưa ra câu lệnh chẩn đoán chính xác.",
      "reflectionHint": "Gợi ý: Hệ thống file Linux quản lý đĩa bằng 2 yếu tố: Khối dữ liệu (Data Blocks) và Chỉ số Inode (quản lý metadata của file). Dùng lệnh `df -i /` để kiểm tra tỷ lệ sử dụng Inode. Nếu Inode đạt 100% (do hàng triệu file rác 0 byte tạo ra trong /tmp hoặc /var/spool), hệ thống sẽ không thể tạo thêm bất kỳ file mới nào dù dung lượng gigabyte vẫn còn trống."
    },
    {
      "id": "lx-1-03",
      "number": "1.3",
      "title": "Shell, Terminal và Kỹ năng Tự tra cứu Sinh tồn (`man`, `--help`, `type`, `which`, `apropos`)",
      "subtitle": "Thấu hiểu cấu trúc dòng lệnh và kỹ năng tự tìm câu trả lời mà không cần phụ thuộc vào mạng Internet",
      "level": "Cơ bản",
      "duration": "40 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhận diện 8 phân vùng (Sections) của sổ tay hướng dẫn chuẩn mực `man` và phân loại 4 loại lệnh trong Linux (`type -a`).",
        "2. [Hiểu - Understand] Giải thích sự khác biệt bản chất giữa Shell Built-in (tích hợp trong shell) và External Binary (tệp nhị phân trên đĩa), cơ chế tra cứu của biến `$PATH`.",
        "3. [Vận dụng - Apply] Thực thi thành thạo các công cụ tra cứu sinh tồn (`man`, `--help`, `type`, `which`, `apropos`, `whatis`) để tự giải mã bất kỳ lệnh lạ nào.",
        "4. [Phân tích - Analyze] Điều tra nguyên nhân lỗi `command not found`, xử lý xung đột Alias nguy hiểm và tìm kiếm trang hướng dẫn khi quên tên lệnh."
      ],
      "intuition": {
        "title": "Thư viện Quốc gia và 8 Tủ sách Tra cứu Chuyên ngành",
        "metaphor": "Khi gõ lệnh trên Linux, bạn không bao giờ phải làm việc đơn độc hay học vẹt. Toàn bộ hệ điều hành mang theo một 'Thư viện Quốc gia' tích hợp sẵn có tên là `man` (Manual Pages). Thư viện này chia thành 8 tủ sách chuyên biệt: Tủ 1 dành cho lệnh người dùng thường (`ls`, `cp`); Tủ 2 dành cho lời gọi hệ thống Syscalls (`open`, `fork`); Tủ 5 dành cho định dạng tệp cấu hình (`/etc/passwd`); Tủ 8 dành cho lệnh của quản trị viên tối cao (`fdisk`, `iptables`). Lệnh `type` giống như việc hỏi thủ thư: 'Món này là đồ có sẵn trong túi áo (Builtin) hay phải chạy ra kho lấy về (Binary)?', giúp bạn không bao giờ bị bối rối trước những câu lệnh kỳ lạ.",
        "boundary": "Sổ tay `man` phản ánh chính xác phiên bản phần mềm đang cài đặt trên máy bạn, nhưng không tự giải thích các trường hợp 'best practice' kinh doanh. Lệnh `apropos` yêu cầu cơ sở dữ liệu chỉ mục mandb phải được cập nhật định kỳ (`sudo mandb`).",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📖</span><span>MAN SECTIONS CỐT LÕI</span><span class=\"lx-vs-tag\">Standard Docs</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Section 1:</strong> Lệnh người dùng thông thường (ls, cp, grep, python).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Section 2:</strong> Lời gọi hệ thống Kernel (open, read, fork, clone).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Section 5:</strong> Cấu trúc &amp; Định dạng file cấu hình (/etc/passwd, fstab).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Section 8:</strong> Lệnh quản trị hệ thống của root (useradd, systemctl, iptables).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🔍</span><span>4 LOẠI CÂU LỆNH LINUX</span><span class=\"lx-vs-tag\">Command Types</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Shell Builtin:</strong> Lệnh tích hợp sẵn trong RAM của shell (cd, pwd, echo, exit).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Executable Binary:</strong> Tệp nhị phân trên đĩa (/usr/bin/ls, /usr/bin/find).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Alias:</strong> Tên viết tắt tùy biến do người dùng đặt (ll='ls -la').</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Function:</strong> Hàm lập trình shell được nạp trong bộ nhớ phiên làm việc.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: 4 Loại Lệnh & Kỹ năng Đọc Sổ tay man",
          "content": "<p>Một trong những khác biệt lớn nhất giữa kỹ sư làm chủ Linux và người mới là khả năng tự sinh tồn. Thay vì tra cứu blog trôi nổi trên mạng, Linux cung cấp tài liệu chính thống tích hợp ngay trên đĩa cứng.</p>\n    <p><strong>Bản chất 4 loại lệnh:</strong> Khi bạn gõ một từ vào terminal, Shell sẽ tìm kiếm theo thứ tự ưu tiên: <strong>Alias &rarr; Keyword &rarr; Function &rarr; Builtin &rarr; Executable Binary trong $PATH</strong>. Nếu là lệnh tích hợp (Built-in) như <code>cd</code>, hệ thống không tạo tiến trình con mới (fork); nếu là External Binary như <code>ls</code>, kernel sẽ nạp tệp từ đĩa vào RAM và tạo tiến trình con.</p>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Cảnh báo</th></tr></thead>\n    <tbody>\n      <tr><td><code>man</code></td><td>Mở sổ tay tài liệu chính thống chi tiết</td><td><code>man [phân_vùng] &lt;tên_lệnh&gt;</code></td><td><code>man 5 passwd</code></td><td>Mặc định tìm phân vùng nhỏ nhất; chỉ định section để xem đúng tệp cấu hình.</td></tr>\n      <tr><td><code>type</code></td><td>Xác định bản chất cốt lõi của câu lệnh</td><td><code>type -a &lt;tên_lệnh&gt;</code></td><td><code>type -a cd</code></td><td>Cờ <code>-a</code> in toàn bộ các dạng (alias, builtin, binary) theo thứ tự ưu tiên.</td></tr>\n      <tr><td><code>which</code></td><td>Tìm đường dẫn tệp thực thi trong biến $PATH</td><td><code>which &lt;tên_lệnh&gt;</code></td><td><code>which python3</code></td><td>Chỉ tìm kiếm binary trên đĩa; trả về rỗng nếu là shell builtin như <code>cd</code>.</td></tr>\n      <tr><td><code>apropos</code></td><td>Tìm kiếm lệnh theo từ khóa mô tả chức năng</td><td><code>apropos &lt;từ_khóa&gt;</code></td><td><code>apropos \"compress files\"</code></td><td>Tương đương <code>man -k</code>; quét qua cơ sở dữ liệu mandb.</td></tr>\n      <tr><td><code>--help</code></td><td>Xem hướng dẫn tóm tắt cú pháp nhanh</td><td><code>&lt;lệnh&gt; --help</code></td><td><code>grep --help</code></td><td>Rất nhanh, phù hợp khi chỉ cần nhớ lại danh sách cờ tùy chọn.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Khảo sát bản chất câu lệnh với type và tra cứu sổ tay theo phân vùng",
              "lang": "Bash",
              "code": "# 1. Nhận diện bản chất của lệnh cd, ls và python3\ntype cd\ntype ls\ntype python3\n\n# 2. Xem trang sổ tay của lệnh passwd (user command) vs tệp /etc/passwd (file format)\nman 1 passwd\nman 5 passwd",
              "output": "cd is a shell builtin\nls is aliased to `ls --color=auto'\npython3 is /usr/bin/python3\n\nPASSWD(1)                User Commands               PASSWD(1)\nPASSWD(5)          File Formats Manual               PASSWD(5)",
              "annotations": [
                {
                  "line": 2,
                  "text": "cd là builtin: chạy trực tiếp trong shell hiện tại để đổi thư mục làm việc."
                },
                {
                  "line": 3,
                  "text": "ls là alias: được bọc thêm cờ màu sắc tự động."
                },
                {
                  "line": 7,
                  "text": "man 5 passwd: mở tài liệu giải thích cấu trúc từng trường dữ liệu trong /etc/passwd."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-3-tty-pty-shell",
          "title": "4.1 Phân biệt Terminal Emulator, Pseudo-Terminal (PTY) & Shell Interpreter",
          "content": "<p>Người mới học thường gọi chung cửa sổ màn hình đen là \"Terminal\" hay \"Bash\", nhưng thực chất khi bạn gõ một phím trên bàn phím, dữ liệu đi qua 3 thành phần tách biệt rõ ràng:</p>\n    <ol>\n      <li><strong>Terminal Emulator (Trình mô phỏng thiết bị đầu cuối):</strong> Ứng dụng đồ họa hiển thị chữ, màu sắc, con trỏ và nhận sự kiện bàn phím (ví dụ: Windows Terminal, iTerm2, GNOME Terminal, hoặc trình khách SSH). Bản thân Terminal không hề hiểu lệnh <code>ls</code> hay <code>cd</code> là gì!</li>\n      <li><strong>Pseudo-Terminal (PTY — <code>/dev/pts/N</code>):</strong> Cặp thiết bị ký tự ảo nằm trong Kernel đóng vai trò đường ống hai chiều nối Terminal Emulator (Master) với chương trình Shell bên dưới (Slave), xử lý các tín hiệu điều khiển dòng như khi bạn bấm <code>Ctrl+C</code> (gửi tín hiệu ngắt <code>SIGINT</code>).</li>\n      <li><strong>Shell (Trình thông dịch lệnh — <code>bash</code>, <code>zsh</code>, <code>dash</code>, <code>sh</code>):</strong> Tiến trình không gian người dùng đọc chuỗi văn bản từ PTY, phân tích cú pháp (tách biến, globbing, chuyển hướng I/O), sau đó yêu cầu Kernel khởi chạy chương trình tương ứng và trả kết quả ngược lại màn hình.</li>\n    </ol>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Xác định thiết bị PTY hiện tại và tiến trình Shell đang phục vụ phiên làm việc",
              "code": "# 1. Xem tệp thiết bị đầu cuối ảo (PTY) gắn với cửa sổ hiện tại\ntty\n\n# 2. Kiểm tra Shell mặc định của tài khoản và tiến trình Shell hiện hành ($$)\necho \"Default Shell: $SHELL\"\nps -p $$ -o pid,tty,comm,args",
              "output": "/dev/pts/0\nDefault Shell: /bin/bash\n    PID TT       COMMAND         COMMAND\n   4128 pts/0    bash            -bash",
              "annotations": [
                {
                  "line": 2,
                  "part": "/dev/pts/0",
                  "text": "Mỗi cửa sổ SSH hoặc tab Terminal mở thêm sẽ được Kernel cấp phát một số hiệu mới (/dev/pts/1, /dev/pts/2...)."
                },
                {
                  "line": 6,
                  "part": "$$",
                  "text": "Biến đặc biệt lưu giữ chính xác số PID của tiến trình Shell đang trực tiếp đọc lệnh của bạn (dấu '-' trước -bash báo hiệu đây là Login Shell)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-3-cmd-resolution",
          "title": "4.2 Thứ tự Ưu tiên Giải phân Câu lệnh: Alias, Function, Builtin & Binary",
          "content": "<p>Khi bạn gõ một tên lệnh (ví dụ <code>ls</code> hoặc <code>cd</code>) và nhấn Enter, Bash <strong>không</strong> chạy đi quét ổ đĩa ngay lập tức. Nó tra cứu theo 5 tầng ưu tiên nghiêm ngặt từ trong bộ nhớ RAM ra tới đĩa cứng:</p>\n    <p><strong>1. Alias (Biệt danh) &rarr; 2. Shell Keyword (<code>if</code>, <code>for</code>, <code>while</code>) &rarr; 3. Shell Function &rarr; 4. Shell Builtin (<code>cd</code>, <code>pwd</code>, <code>echo</code>, <code>export</code>) &rarr; 5. External Binary trong <code>$PATH</code> (<code>/usr/bin/ls</code>).</strong></p>\n    <ul>\n      <li><strong>Tại sao <code>cd</code> bắt buộc phải là Shell Builtin?</strong> Mỗi tiến trình có thư mục làm việc riêng biệt. Nếu <code>cd</code> là một file thực thi rời ngoài đĩa (<code>/usr/bin/cd</code>), Shell sẽ đẻ ra một tiến trình con, tiến trình con đổi thư mục của riêng nó rồi kết thúc ngay lập tức — còn Shell cha của bạn vẫn đứng yên tại chỗ cũ! Do đó mọi lệnh thay đổi trạng thái nội tại của Shell (<code>cd</code>, <code>export</code>, <code>alias</code>, <code>ulimit</code>, <code>umask</code>) đều phải tích hợp sẵn bên trong tiến trình Shell.</li>\n      <li><strong>Cạm bẫy của lệnh <code>which</code>:</strong> Lệnh <code>which</code> là một chương trình bên ngoài chỉ quét các thư mục trong <code>$PATH</code>, nên nó thường bị đánh lừa bởi Alias và báo rỗng với Builtin. Chuẩn POSIX và Bash hiện đại khuyên dùng <code>type -a</code> hoặc <code>command -v</code> để nhìn thấu toàn bộ 5 tầng ưu tiên.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Phân tích toàn bộ các tầng định nghĩa của một câu lệnh bằng type -a",
              "code": "# 1. Xem vì sao lệnh ls tự động có màu sắc (nhờ tầng Alias đè lên Binary)\ntype -a ls\n\n# 2. Phát hiện các lệnh vừa là Shell Builtin vừa có bản Binary độc lập trên đĩa\ntype -a echo pwd\n\n# 3. Bỏ qua tạm thời tầng Alias để chạy trực tiếp file Binary gốc\ncommand ls -l /etc/hostname",
              "output": "ls is aliased to `ls --color=auto'\nls is /usr/bin/ls\necho is a shell builtin\necho is /usr/bin/echo\npwd is a shell builtin\npwd is /usr/bin/pwd\n-rw-r--r-- 1 root root 12 Oct 10 08:00 /etc/hostname",
              "annotations": [
                {
                  "line": 2,
                  "part": "type -a ls",
                  "text": "Liệt kê theo đúng thứ tự thực thi: Bash sẽ chạy alias 'ls --color=auto' trước thay vì gọi thẳng /usr/bin/ls."
                },
                {
                  "line": 5,
                  "part": "echo / pwd",
                  "text": "Có bản /usr/bin/pwd dự phòng cho các công cụ như xargs/find -exec (vì xargs không thể gọi trực tiếp builtin của Bash)."
                },
                {
                  "line": 8,
                  "part": "command ls",
                  "text": "Từ khóa 'command' (hoặc thêm dấu \\ trước tên lệnh như \\ls) giúp bỏ qua Alias/Function để gọi thẳng Binary chuẩn."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-3-man-sections",
          "title": "4.3 Giải phẫu 8 Phân vùng Sổ tay man & Kỹ năng Đọc Cú pháp Chuẩn POSIX",
          "content": "<p>Hệ thống sổ tay điện tử <code>man</code> (Manual Pages) được chia thành các phân vùng đánh số từ 1 đến 8 để tránh xung đột tên gọi (ví dụ: vừa có câu lệnh <code>passwd</code> ở phân vùng 1, vừa có tệp cấu hình <code>/etc/passwd</code> ở phân vùng 5, vừa có hàm C hay lệnh quản trị):</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Section</th><th>Nội dung chuyên biệt</th><th>Ví dụ tra cứu thực tế</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><strong>1</strong></td><td>Các câu lệnh người dùng thực thi từ Shell (User Commands)</td><td><code>man 1 ls</code>, <code>man 1 passwd</code>, <code>man 1 tar</code></td></tr>\n          <tr><td><strong>2</strong></td><td>Lời gọi hệ thống của nhân Linux (System Calls)</td><td><code>man 2 open</code>, <code>man 2 fork</code>, <code>man 2 chmod</code></td></tr>\n          <tr><td><strong>3</strong></td><td>Các hàm thư viện chuẩn ngôn ngữ C (Library Functions)</td><td><code>man 3 printf</code>, <code>man 3 malloc</code></td></tr>\n          <tr><td><strong>4</strong></td><td>Các tệp thiết bị đặc biệt trong <code>/dev</code> và trình điều khiển</td><td><code>man 4 null</code>, <code>man 4 random</code></td></tr>\n          <tr><td><strong>5</strong></td><td>Định dạng tệp cấu hình hệ thống &amp; cấu trúc dữ liệu (File Formats)</td><td><code>man 5 passwd</code>, <code>man 5 fstab</code>, <code>man 5 crontab</code></td></tr>\n          <tr><td><strong>8</strong></td><td>Lệnh quản trị hệ thống &amp; Daemon yêu cầu quyền root (Sysadmin)</td><td><code>man 8 mount</code>, <code>man 8 iptables</code>, <code>man 8 useradd</code></td></tr>\n        </tbody>\n      </table>\n    </div>\n    <p><strong>Quy ước đọc mục SYNOPSIS trong mọi trang man:</strong> Thành phần nằm trong ngoặc vuông <code>[TÙY_CHỌN]</code> là không bắt buộc; thành phần không có ngoặc vuông hoặc bọc trong <code>&lt;ĐỐI_SỐ&gt;</code> là bắt buộc; ký hiệu gạch đứng <code>-a | -b</code> nghĩa là chỉ được chọn một trong hai; dấu ba chấm <code>FILE...</code> nghĩa là có thể truyền một hoặc nhiều tệp liên tiếp.</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Đối chiếu cùng một từ khóa trên nhiều phân vùng man với whatis và man -f",
              "code": "# 1. Liệt kê tất cả các phân vùng sổ tay đang có tài liệu cho từ khóa 'passwd' và 'crontab'\nwhatis passwd crontab\n\n# 2. Tìm kiếm công cụ theo mô tả chức năng bằng apropos (tương đương man -k)\napropos -s 1,8 \"disk space\" | head -n 4",
              "output": "passwd (1)           - change user password\npasswd (1ssl)        - compute password hashes\npasswd (5)           - the password file\ncrontab (1)          - maintain crontab files for individual users\ncrontab (5)          - tables for driving cron\ndf (1)               - report file system disk space usage",
              "annotations": [
                {
                  "line": 2,
                  "part": "whatis",
                  "text": "Cho thấy ngay nếu gõ 'man passwd' không kèm số, man sẽ mở Section 1 (lệnh đổi mật khẩu), muốn xem cấu trúc file /etc/passwd phải gõ 'man 5 passwd'."
                },
                {
                  "line": 5,
                  "part": "apropos -s 1,8",
                  "text": "Quét cơ sở dữ liệu mô tả mandb nhưng giới hạn chỉ tìm trong nhóm lệnh người dùng (1) và lệnh quản trị viên (8)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Tiếp nhận một máy chủ có lệnh lạ hoặc không rõ đường dẫn tệp cấu hình.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Gõ <code>type -a python</code> để xem python đang trỏ vào binary nào hay là alias.</li>\n        <li><strong>Bước 2:</strong> Quên cú pháp lệnh nén tar, gõ <code>tar --help | head -n 15</code> hoặc dùng <code>man tar</code>.</li>\n        <li><strong>Bước 3:</strong> Điều hướng trong <code>man</code>: phím <code>/pattern</code> để tìm kiếm, <code>n</code> để tới kết quả tiếp theo, <code>q</code> để thoát.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lỗi Thường Gặp / Tra Cứu Sai</div>\n          <p>Gõ <code>which cd</code> và kết luận rằng \"hệ thống bị lỗi mất lệnh cd\".</p>\n          <p><strong>Lý do:</strong> <code>which</code> chỉ tìm file thực thi trên ổ đĩa. Vì <code>cd</code> là shell builtin nằm sẵn trong RAM, <code>which</code> không thể tìm thấy file binary độc lập.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Cách Làm Đúng Chuẩn Kỹ Thuật</div>\n          <p>Luôn sử dụng lệnh <code>type -a &lt;lệnh&gt;</code> để kiểm tra toàn diện:</p>\n          <p><code>type -a cd</code> &rarr; Trả về: <code>cd is a shell builtin</code>.</p>\n          <p><strong>Ưu điểm:</strong> Xác định chính xác bản chất và thứ tự thực thi của câu lệnh.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Tự Tra cứu và Khai phá Sổ tay Hệ thống",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.3</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Làm chủ kỹ năng tra cứu sổ tay đa phân vùng, tìm lệnh giải quyết bài toán mã hóa/nén và nhận diện bản chất lệnh.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Terminal Linux tiêu chuẩn, gói <code>man-pages</code> đã được cài đặt.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Tra cứu xem có những lệnh nào liên quan đến từ khóa 'checksum': <code>apropos checksum</code>.</li>\n        <li><strong>Bước 2:</strong> Mở trang sổ tay của <code>sha256sum</code> và tìm cờ kiểm tra tự động: <code>man sha256sum</code> (gõ <code>/--check</code> và ấn Enter).</li>\n        <li><strong>Bước 3:</strong> Khảo sát định dạng file <code>/etc/hosts</code>: <code>man 5 hosts</code>.</li>\n        <li><strong>Bước 4:</strong> Dùng <code>type -a</code> để kiểm tra bản chất của <code>echo</code>, <code>pwd</code>, <code>ll</code>, <code>grep</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">type -a echo\necho is a shell builtin\necho is /usr/bin/echo\n-> Nhận biết echo vừa có bản builtin vừa có file binary trên đĩa.</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Cập nhật lại toàn bộ cơ sở dữ liệu chỉ mục của hệ thống sổ tay bằng lệnh quản trị: <code>sudo mandb</code>.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Đọc sổ tay bằng <code>man</code> hoàn toàn an toàn (Read-Only). Tránh dùng các trang web chuyển đổi tài liệu lạ từ nguồn không chính thống.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Cách khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>No manual entry for...</code></td><td>Gói tài liệu của phần mềm đó chưa cài đặt (thường thấy trên Docker/Ubuntu Minimal).</td><td>Cài đặt gói tài liệu: <code>sudo apt install -y man-db manpages manpages-posix</code> hoặc bỏ cờ unminimize.</td></tr>\n          <tr><td><code>nothing appropriate</code> khi chạy <code>apropos</code></td><td>Cơ sở dữ liệu chỉ mục mandb chưa được khởi tạo sau khi cài đặt OS mới.</td><td>Chạy lệnh làm mới chỉ mục bằng quyền sudo: <code>sudo mandb</code>.</td></tr>\n          <tr><td><code>bash: command not found</code></td><td>Lệnh chưa cài đặt hoặc đường dẫn thư mục binary chưa có trong biến môi trường <code>$PATH</code>.</td><td>Dùng <code>echo $PATH</code> để kiểm tra danh sách đường dẫn, hoặc cài đặt gói chứa lệnh đó.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Cảnh giác với Alias giả mạo (Trojan Alias):</strong> Kẻ tấn công hoặc script độc hại có thể định nghĩa <code>alias sudo='...'</code> để thu thập mật khẩu. Luôn dùng <code>type &lt;lệnh&gt;</code> hoặc tiền tố dấu gạch chéo ngược <code>\\sudo</code> để bỏ qua alias khi chạy lệnh đặc quyền.</li>\n        <li><strong>Ưu tiên tài liệu nội bộ trên máy hơn Google:</strong> Phiên bản phần mềm trên server của bạn (ví dụ Nginx 1.18 trên Ubuntu 20.04) có thể khác với bản mới nhất trên mạng; <code>man</code> phản ánh chính xác 100% cú pháp của phiên bản đang cài.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Linux Man Pages Online:</strong> <a href=\"https://man7.org/linux/man-pages/\" target=\"_blank\" rel=\"noopener\">Michael Kerrisk's man7.org</a> — Kho sổ tay chuẩn mực của tác giả cuốn sách kinh điển 'The Linux Programming Interface'.</li>\n      <li><strong>TLDR Pages:</strong> <a href=\"https://tldr.sh/\" target=\"_blank\" rel=\"noopener\">tldr.sh</a> — Dự án tóm tắt ví dụ câu lệnh cộng đồng cực kỳ hữu ích cho lập trình viên.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Cheat Sheet Phím Tắt Sổ tay man",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Phím bấm trong man</th><th>Hành động thực thi</th></tr></thead>\n        <tbody>\n          <tr><td><code>/&lt;từ_khóa&gt;</code></td><td>Tìm kiếm xuôi theo từ khóa</td></tr>\n          <tr><td><code>n</code> / <code>N</code></td><td>Đến kết quả khớp tiếp theo / quay lại kết quả trước</td></tr>\n          <tr><td><code>Space</code> / <code>b</code></td><td>Cuộn xuống 1 trang màn hình / cuộn lên 1 trang</td></tr>\n          <tr><td><code>g</code> / <code>G</code></td><td>Nhảy về dòng đầu tiên / nhảy xuống dòng cuối cùng</td></tr>\n          <tr><td><code>q</code></td><td>Thoát khỏi sổ tay man ngay lập tức</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố: Script Python deploy thất bại do xung đột giữa Shell Builtin và File Binary ngoài",
        "content": "<p>Một kỹ sư DevOps viết script triển khai ứng dụng bằng Bash shell trên server Ubuntu. Trong script có dòng lệnh: <code>kill -l</code> để lấy danh sách mã tín hiệu và gửi tín hiệu dừng tới ứng dụng Python. Tuy nhiên khi chuyển script sang chạy trong môi trường Alpine Linux (dùng Shell Dash/Ash tối giản), script báo lỗi cú pháp và không dừng được tiến trình.</p><ol><li><strong>Triệu chứng:</strong> Lệnh <code>kill -l 9</code> chạy bình thường trên máy tính cá nhân (Bash) nhưng báo lỗi không nhận diện tham số trên server container tối giản.</li><li><strong>Chẩn đoán:</strong> Kiểm tra bằng lệnh <code>type -a kill</code> trên cả 2 môi trường. Phát hiện trên Bash: <code>kill</code> là một shell builtin hỗ trợ các cờ mở rộng. Nhưng trên Dash/POSIX sh của Alpine: <code>kill</code> là file binary độc lập <code>/bin/kill</code> vốn tuân thủ chuẩn POSIX khắt khe hơn và không hỗ trợ cú pháp mở rộng của Bash.</li><li><strong>Nguyên nhân gốc rễ:</strong> Kỹ sư phụ thuộc vào tính năng riêng của Shell Builtin trong Bash mà không biết rằng hành vi của lệnh có thể khác biệt hoàn toàn khi gọi file binary ngoài hoặc khi chạy trên shell khác.</li><li><strong>Khắc phục:</strong> Tra cứu tài liệu chuẩn bằng lệnh <code>man 1 kill</code> và chuyển đổi cú pháp script sang chuẩn POSIX tương thích đa môi trường (hoặc chỉ định rõ shebang <code>#!/bin/bash</code> ở đầu script).</li><li><strong>Phòng ngừa:</strong> Luôn dùng <code>type -a</code> để kiểm tra xem lệnh mình đang dùng là Builtin hay Binary độc lập khi viết script tự động hóa hạ tầng.</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Bối rối khi gõ man cd bị chuyển hướng sang trang sổ tay khổng lồ của Bash",
            "content": "Vì <code>cd</code> là một shell builtin chứ không phải chương trình độc lập, nên trên nhiều hệ thống Linux không có trang sổ tay riêng <code>man cd</code>. Hệ thống sẽ mở toàn bộ trang man dài hàng nghìn dòng của <code>bash</code> khiến bạn bị ngợp. Với bất kỳ lệnh builtin nào (như <code>cd</code>, <code>pwd</code>, <code>export</code>, <code>alias</code>), hãy dùng lệnh: <code>help &lt;tên_lệnh&gt;</code>."
          },
          {
            "title": "Nhầm lẫn giữa cú pháp cờ ngắn đơn lẻ và cờ kết hợp",
            "content": "Trong chuẩn POSIX, <code>-la</code> tương đương với <code>-l -a</code>. Tuy nhiên, nếu một cờ yêu cầu tham số đi kèm (ví dụ <code>tar -f archive.tar</code>), cờ đó bắt buộc phải đứng ở cuối cụm: <code>tar -czvf archive.tar.gz</code> (cờ <code>f</code> đứng cuối cùng để nhận giá trị file theo sau). Đặt sai thứ tự thành <code>tar -cfzv archive.tar.gz</code> sẽ khiến lệnh coi 'z' là tên file lưu trữ và gây lỗi!"
          }
        ],
        "tips": [
          {
            "title": "Đọc man page nhanh chóng bằng phím tắt / (tìm kiếm)",
            "content": "Đừng cuộn chuột từ đầu đến cuối một trang man dài 50 trang! Khi vừa mở <code>man ls</code>, gõ ngay <code>/--sort</code> rồi bấm Enter để nhảy thẳng tới phần giải thích cờ sắp xếp. Bấm <code>n</code> (next) để xem kết quả tiếp theo và bấm <code>q</code> (quit) để thoát."
          },
          {
            "title": "Cài đặt và sử dụng công cụ tldr (Too Long; Didn't Read)",
            "content": "Nếu bạn chỉ cần một ví dụ lệnh chạy được ngay mà không muốn đọc tài liệu lý thuyết dài dòng, hãy cài đặt tldr: <code>sudo apt install tldr</code> (hoặc <code>pip install tldr</code>) rồi gõ <code>tldr tar</code>. Bạn sẽ nhận được 5 trường hợp dùng thực tế thông dụng nhất kèm chú thích rõ ràng."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Truy tìm lệnh từ mô tả với apropos và định vị file thực thi",
          "problem": "Bạn cần tìm một công cụ dòng lệnh để nén hoặc giải nén file theo chuẩn bzip2 nhưng không nhớ rõ tên lệnh. Hãy: (1) Dùng công cụ tìm kiếm sổ tay để tìm các lệnh có mô tả liên quan đến 'bzip2', và (2) Dùng lệnh which để in ra đường dẫn tuyệt đối của chương trình thực thi đó trên ổ cứng.",
          "hint": "Sử dụng lệnh apropos bzip2 và sau đó áp dụng which với tên lệnh tìm được.",
          "solutionCode": "# 1. Tìm kiếm lệnh liên quan đến bzip2 trong cơ sở dữ liệu sổ tay\napropos bzip2\n\n# 2. Xác định đường dẫn file binary trên hệ thống\nwhich bzip2",
          "solutionOutput": "bzip2 (1)            - a block-sorting file compressor, v1.0.8\nbzmore (1)           - file perusal filter for crt viewing of bzip2 compressed text\n/usr/bin/bzip2",
          "explanation": "Lệnh apropos quét qua cơ sở dữ liệu tóm tắt của man-pages để trả về các lệnh khớp từ khóa. Lệnh which bzip2 tìm kiếm trong biến $PATH và trả về /usr/bin/bzip2.",
          "annotations": [
            {
              "part": "apropos bzip2",
              "text": "Lệnh tương đương với man -k bzip2."
            },
            {
              "part": "which bzip2",
              "text": "In ra đường dẫn file thực thi trên ổ đĩa nếu lệnh tồn tại trong biến $PATH."
            }
          ],
          "rubric": [
            {
              "criterion": "Đúng cú pháp tra cứu",
              "pass": "Sử dụng đúng type -a và man với phân vùng",
              "excellent": "Kết hợp nhuần nhuyễn apropos và cờ lọc",
              "weight": "40%"
            },
            {
              "criterion": "Kết quả chính xác",
              "pass": "Xác định đúng bản chất lệnh và section",
              "excellent": "Trích xuất đúng dòng định nghĩa không thừa rác",
              "weight": "30%"
            },
            {
              "criterion": "Hiểu cơ chế",
              "pass": "Giải thích được sự khác nhau giữa builtin và binary",
              "excellent": "Phân tích được thứ tự tìm kiếm của Shell",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Phân loại câu lệnh: Shell Builtin vs External Executable",
          "problem": "Hãy viết các lệnh để kiểm tra bản chất thực thi của 3 câu lệnh sau: (1) `pwd`, (2) `which`, và (3) `type`. Xác định rõ lệnh nào là Shell Builtin, lệnh nào là File Binary độc lập trên ổ đĩa.",
          "hint": "Sử dụng lệnh type kèm cờ -a để hiển thị toàn bộ các phiên bản của lệnh.",
          "solutionCode": "# Kiểm tra nguồn gốc của từng lệnh\ntype -a pwd\ntype -a which\ntype -a type",
          "solutionOutput": "pwd is a shell builtin\npwd is /usr/bin/pwd\nwhich is /usr/bin/which\ntype is a shell builtin",
          "explanation": "Lệnh pwd vừa có bản builtin trong Bash vừa có file binary /usr/bin/pwd trên đĩa. Lệnh which là file binary độc lập /usr/bin/which. Lệnh type là shell builtin thuần túy (không thể viết type dưới dạng file ngoài vì nó cần truy cập nội tại cấu trúc của shell).",
          "annotations": [
            {
              "part": "type -a",
              "text": "Cờ -a (all) yêu cầu in tất cả các vị trí chứa lệnh: alias, builtin, và các file trong $PATH."
            }
          ],
          "rubric": [
            {
              "criterion": "Sử dụng công cụ phân loại lệnh chuẩn xác",
              "pass": "Dùng lệnh type để kiểm tra từng lệnh pwd, which, type",
              "excellent": "Sử dụng cờ type -a để bóc tách trọn vẹn cả bản Shell Builtin lẫn bản External Binary dự phòng trên ổ đĩa (như với pwd)",
              "weight": "50%"
            },
            {
              "criterion": "Giải thích bản chất thực thi hệ thống",
              "pass": "Phân loại đúng type là Builtin thuần túy, which là Binary rời, pwd có cả hai",
              "excellent": "Nêu rõ sự khác biệt về chi phí tạo tiến trình con (fork/exec) giữa Builtin trong RAM và Binary trên đĩa",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Tra cứu cú pháp tệp cấu hình phức tạp trong Section 5",
          "problem": "Bạn cần viết một tác vụ định kỳ tự động hóa trong tệp /etc/crontab nhưng không nhớ thứ tự 5 cột thời gian (phút, giờ, ngày trong tháng, tháng, ngày trong tuần). Không truy cập Internet, hãy: (1) Mở đúng trang sổ tay định dạng file cấu hình crontab (Section 5) và (2) Dùng một câu lệnh kết hợp chuyển hướng để trích xuất đoạn văn bản mô tả 5 trường thời gian ra màn hình terminal.",
          "hint": "Tra cứu man 5 crontab và kết hợp với col -b và grep -A để trích xuất khối văn bản mô tả các trường thời gian.",
          "solutionCode": "# Trích xuất phần giải thích các trường thời gian từ sổ tay định dạng crontab Section 5\nman 5 crontab | col -b | grep -E -A 8 'field\\s+allowed values'",
          "solutionOutput": "field          allowed values\n-----          --------------\nminute         0-59\nhour           0-23\nday of month   1-31\nmonth          1-12 (or names, see below)\nday of week    0-7 (0 or 7 is Sunday, or use names)\n",
          "explanation": "Nếu gõ 'man crontab', hệ thống sẽ mở Section 1 (hướng dẫn dùng lệnh crontab -e). Để tra cứu cú pháp của file cấu hình /etc/crontab, bắt buộc phải chỉ định rõ Section 5: 'man 5 crontab'. Lệnh col -b loại bỏ các mã định dạng trang in để grep -A trích xuất 8 dòng tiếp theo sau dòng tiêu đề bảng thời gian.",
          "annotations": [
            {
              "part": "man 5 crontab",
              "text": "Chỉ định rõ ràng Section 5 (File Formats), đây là kỹ năng phân biệt đẳng cấp của SysAdmin."
            },
            {
              "part": "grep -E -A 8",
              "text": "Cờ -A 8 (After): in thêm 8 dòng văn bản nằm ngay sau dòng khớp mẫu."
            }
          ],
          "rubric": [
            {
              "criterion": "Chỉ định đúng phân vùng sổ tay cấu hình",
              "pass": "Truy cập chính xác trang sổ tay man 5 crontab thay vì mặc định Section 1",
              "excellent": "Hiểu rõ vai trò của Section 5 dành riêng cho đặc tả định dạng tệp cấu hình hệ thống",
              "weight": "40%"
            },
            {
              "criterion": "Kỹ thuật làm sạch ký tự điều khiển và lọc dòng",
              "pass": "Dùng đường ống kết hợp grep để trích xuất bảng giải thích 5 trường thời gian",
              "excellent": "Đưa luồng qua bộ lọc col -b (hoặc MANPAGER=cat) để khử ký tự định dạng backspace của troff trước khi grep -E -A",
              "weight": "60%"
            }
          ]
        }
      ],
      "summary": [
        "Terminal là cửa sổ giao diện người dùng; Shell (Bash/Zsh) là trình thông dịch xử lý cú pháp; Command là chương trình thực hiện nhiệm vụ cụ thể.",
        "Cú pháp lệnh chuẩn gồm: Tên lệnh + Cờ tùy chọn (Options) bổ nghĩa + Đối số (Arguments) là đối tượng xử lý.",
        "Hệ thống sổ tay `man` phân chia thành 8 sections: Section 1 cho lệnh người dùng, Section 5 cho định dạng tệp cấu hình và Section 8 cho lệnh quản trị.",
        "Dùng `apropos` hoặc `man -k` khi chỉ nhớ từ khóa chức năng; dùng `help` cho lệnh builtin và dùng `man` cho chương trình độc lập.",
        "Lệnh `type -a` giúp nhận diện rạch ròi giữa Shell Builtin (chạy siêu nhanh trong bộ nhớ shell) và External Binary (nạp file từ ổ cứng qua $PATH)."
      ],
      "generalInfo": {
        "duration": "40 phút",
        "targetAudience": "Lập trình viên, Kỹ sư Hệ thống, DevOps",
        "prerequisites": "Đã hoàn thành Bài 1.1 và 1.2, hiểu cây thư mục Linux",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2)",
        "materials": "Terminal emulator, gói `man-db`, `tldr` (tùy chọn)"
      },
      "nextLessonPreview": "Trong bài tiếp theo (1.4), chúng ta sẽ thực hành Điều hướng và Thao tác File/Thư mục An toàn (`pwd`, `ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`, `ln`), phân tích bản chất Inode và các cờ an toàn chống xóa nhầm.",
      "quiz": [
        {
          "question": "Để xem tài liệu về định dạng tệp cấu hình `/etc/passwd` thay vì tài liệu về lệnh đổi mật khẩu `passwd`, bạn dùng lệnh nào?",
          "options": [
            "man 1 passwd",
            "man 5 passwd",
            "man 8 passwd",
            "man -f passwd"
          ],
          "correctIndex": 1,
          "explanation": "Section 5 trong sổ tay man chuyên dành cho định dạng tệp cấu hình (File Formats). Section 1 là lệnh người dùng thông thường."
        },
        {
          "question": "Lệnh `type -a cd` trả về kết quả `cd is a shell builtin`. Điều này có ý nghĩa kỹ thuật gì?",
          "options": [
            "Lệnh cd là một file binary nằm trên ổ cứng tại /usr/bin/cd.",
            "Lệnh cd là một mã độc hại do hacker cài vào.",
            "Lệnh cd được tích hợp sẵn bên trong chính tiến trình Shell đang chạy, không cần tạo tiến trình con mới (fork) từ đĩa.",
            "Lệnh cd chỉ chạy được khi có quyền root."
          ],
          "correctIndex": 2,
          "explanation": "Shell builtin chạy trực tiếp trong không gian bộ nhớ của shell hiện tại, giúp chuyển đổi thư mục làm việc mà không tốn chi phí fork tiến trình mới."
        },
        {
          "question": "Khi bạn quên tên chính xác của câu lệnh nhưng nhớ từ khóa chức năng là 'network interface', lệnh nào giúp tìm kiếm các trang sổ tay liên quan?",
          "options": [
            "which \"network interface\"",
            "type \"network interface\"",
            "apropos \"network interface\"",
            "find \"network interface\""
          ],
          "correctIndex": 2,
          "explanation": "apropos (tương đương man -k) tìm kiếm từ khóa trong chuỗi mô tả ngắn (short description) của toàn bộ cơ sở dữ liệu man pages."
        }
      ],
      "reflectionQuestion": "Một kỹ sư viết script tự động và gọi lệnh `which cd` để kiểm tra sự tồn tại của lệnh cd trước khi chạy, nhưng script luôn báo lỗi `cd not found`. Hãy giải thích vì sao đoạn script trên bị sai logic và đề xuất cách sửa chuẩn mực nhất.",
      "reflectionHint": "Gợi ý: `which` chỉ quét qua danh sách thư mục trong biến `$PATH` để tìm file thực thi nhị phân. Vì `cd` là shell builtin nên không có tệp nhị phân nào tên là cd trong $PATH. Hãy dùng lệnh `command -v cd` hoặc `type cd` để kiểm tra chuẩn POSIX."
    },
    {
      "id": "lx-1-04",
      "number": "1.4",
      "title": "Điều hướng và Thao tác File/Thư mục An toàn (`pwd`, `ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`, `ln`)",
      "subtitle": "Nắm vững quy tắc đường dẫn, liên kết Inode và thiết lập phản xạ phòng ngừa thảm họa với lệnh rm -rf",
      "level": "Cơ bản",
      "duration": "45 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ cú pháp và các cờ bảo vệ sinh tồn của bộ lệnh thao tác tệp: `pwd`, `ls` (-la, -lh, -i), `cd`, `mkdir` (-p), `cp` (-a, -i), `mv` (-i), `rm` (-i, -I), `ln` (-s).",
        "2. [Hiểu - Understand] Giải thích bản chất Inode của hệ thống file, phân biệt rạch ròi giữa Liên kết cứng (Hard Link) và Liên kết mềm (Symbolic Link).",
        "3. [Vận dụng - Apply] Thực hiện thành thạo thao tác sao lưu nguyên vẹn thuộc tính (`cp -a`), tạo cây thư mục lồng nhau (`mkdir -p`) và di chuyển tệp an toàn.",
        "4. [Phân tích - Analyze] Đánh giá hậu quả của lệnh xóa đệ quy `rm -rf`, nhận diện cạm bẫy đường dẫn tương đối vs tuyệt đối và thiết lập cơ chế bảo vệ chống xóa nhầm."
      ],
      "intuition": {
        "title": "Tấm biển chỉ đường (Symlink) vs Hai chìa khóa mở chung một két sắt (Hard Link)",
        "metaphor": "Khi tạo một tệp trên Linux, dữ liệu thật nằm ở các khối nhớ (Data blocks) và được đại diện bởi một mã số định danh duy nhất gọi là Inode. Một 'Hard link' giống như việc bạn làm thêm một chiếc chìa khóa y hệt để mở cùng một chiếc két sắt: dù bạn vứt chiếc chìa khóa ban đầu đi (xóa tên file cũ), chiếc chìa khóa thứ hai vẫn mở được két sắt và dữ liệu không hề mất. Ngược lại, một 'Symbolic link' (Soft link) chỉ là một tấm biển chỉ đường bằng bìa các-tông cắm trên đất ghi dòng chữ: 'Hãy đi tới két sắt A'. Nếu két sắt A bị xóa hoặc dời đi, tấm biển chỉ đường sẽ trở thành 'liên kết gãy' (Broken symlink) trỏ vào hư vô.",
        "boundary": "Hard link có giới hạn vật lý nghiêm ngặt: không bao giờ tạo được Hard link xuyên qua hai phân vùng ổ đĩa khác nhau (Cross-filesystem) và không thể tạo Hard link cho thư mục (để tránh tạo thành vòng lặp vô tận trong cấu trúc cây file).",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🔗</span><span>HARD LINK (LIÊN KẾT CỨNG)</span><span class=\"lx-vs-tag\">Same Inode</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Dùng chung 1 số hiệu Inode với tệp gốc trên cùng một phân vùng đĩa.</li><li><span class=\"lx-vs-bullet\">•</span> Xóa file gốc thì dữ liệu vẫn còn nguyên vẹn qua hard link.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Hạn chế:</strong> Không liên kết xuyên phân vùng, không áp dụng cho thư mục.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>📍</span><span>SYMBOLIC LINK (LIÊN KẾT MỀM)</span><span class=\"lx-vs-tag\">New Inode / Pointer</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Là file độc lập chứa chuỗi đường dẫn văn bản trỏ tới đích (<code>ln -s</code>).</li><li><span class=\"lx-vs-bullet\">•</span> Xóa file gốc thì symlink bị hỏng (Broken link).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Lợi thế:</strong> Liên kết xuyên phân vùng, liên kết thư mục dễ dàng.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Thao tác Tệp & Giải phẫu Inode",
          "content": "<p>Mọi kỹ sư hệ thống Linux đều phải thao tác hàng ngàn lần với các lệnh tệp tin. Tuy nhiên, sai lầm về đường dẫn tương đối/tuyệt đối hoặc cờ xóa đệ quy có thể trả giá bằng việc mất toàn bộ dữ liệu máy chủ.</p>\n    <p><strong>Bản chất Inode:</strong> Inode là cấu trúc dữ liệu của hệ điều hành lưu trữ: Loại tệp, Quyền truy cập (permissions), Chủ sở hữu (UID/GID), Kích thước, Thời gian (atime, mtime, ctime) và Con trỏ tới khối dữ liệu đĩa. Tên tệp không được lưu trong Inode mà lưu trong bảng ghi của thư mục cha.</p>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Cờ an toàn bắt buộc</th></tr></thead>\n    <tbody>\n      <tr><td><code>pwd</code></td><td>In thư mục làm việc hiện tại</td><td><code>pwd [-P|-L]</code></td><td><code>pwd -P</code></td><td><code>-P</code> giải mã đường dẫn vật lý thực tế nếu đang đứng ở symlink.</td></tr>\n      <tr><td><code>ls</code></td><td>Liệt kê tệp và thư mục</td><td><code>ls [tùy_chọn] [đường_dẫn]</code></td><td><code>ls -lah -i</code></td><td><code>-a</code> hiện file ẩn, <code>-l</code> chi tiết, <code>-h</code> dễ đọc, <code>-i</code> hiện số Inode.</td></tr>\n      <tr><td><code>mkdir -p</code></td><td>Tạo thư mục đa cấp cha con</td><td><code>mkdir -p &lt;đường_dẫn&gt;</code></td><td><code>mkdir -p /var/log/my-app/2026/11</code></td><td><code>-p</code> tự tạo các thư mục cha nếu chưa có và không báo lỗi nếu đã tồn tại.</td></tr>\n      <tr><td><code>cp -a</code></td><td>Sao chép lưu trữ bảo toàn thuộc tính</td><td><code>cp -a &lt;nguồn&gt; &lt;đích&gt;</code></td><td><code>cp -a /etc/nginx /etc/nginx.bak</code></td><td><code>-a</code> (archive) bảo toàn quyền, timestamps, symlink và đệ quy.</td></tr>\n      <tr><td><code>rm -i</code></td><td>Xóa tệp có xác nhận tương tác an toàn</td><td><code>rm -i &lt;tệp&gt;</code></td><td><code>rm -I *.log</code></td><td><code>-I</code> chỉ hỏi xác nhận 1 lần nếu xóa trên 3 file hoặc xóa đệ quy.</td></tr>\n      <tr><td><code>ln -s</code></td><td>Tạo liên kết mềm (symbolic link)</td><td><code>ln -s &lt;đích_thật&gt; &lt;tên_link&gt;</code></td><td><code>ln -s /opt/pyapp/app.py /usr/local/bin/pyapp</code></td><td>Luôn dùng đường dẫn tuyệt đối cho đích thật để tránh symlink gãy.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Kiểm tra số hiệu Inode và phân biệt Hard link vs Symbolic link",
              "lang": "Bash",
              "code": "# 1. Tạo file gốc và kiểm tra số Inode\necho 'Production Data' > master.txt\nls -li master.txt\n\n# 2. Tạo Hard link và kiểm tra sự trùng khớp Inode\nln master.txt hardlink.txt\nls -li master.txt hardlink.txt\n\n# 3. Tạo Symbolic link và kiểm tra Inode riêng biệt\nln -s master.txt symlink.txt\nls -li master.txt symlink.txt",
              "output": "1052341 -rw-r--r-- 1 devops devops 16 Oct 28 10:20 master.txt\n1052341 -rw-r--r-- 2 devops devops 16 Oct 28 10:20 hardlink.txt\n1052341 -rw-r--r-- 2 devops devops 16 Oct 28 10:20 master.txt\n1052342 lrwxrwxrwx 1 devops devops 10 Oct 28 10:21 symlink.txt -> master.txt",
              "annotations": [
                {
                  "line": 2,
                  "text": "master.txt và hardlink.txt có cùng số Inode 1052341 và link count tăng lên 2."
                },
                {
                  "line": 10,
                  "text": "symlink.txt có số Inode mới 1052342 và cờ loại tệp là 'l'."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-4-paths-navigation",
          "title": "4.1 Đường dẫn Tuyệt đối vs Tương đối & Điều hướng Tốc độ Cao (cd -, pushd/popd)",
          "content": "<p>Sự chính xác khi xác định đường dẫn là ranh giới giữa một thao tác bảo trì thành công và một thảm họa xóa nhầm thư mục:</p>\n    <ul>\n      <li><strong>Đường dẫn Tuyệt đối (Absolute Path):</strong> Luôn bắt đầu bằng ký tự gốc <code>/</code> (ví dụ: <code>/var/log/nginx/error.log</code>). Ý nghĩa của nó cố định tuyệt đối bất kể hiện tại bạn đang đứng ở thư mục nào. <em>Quy tắc vàng:</em> Trong mọi Shell script tự động hóa, Crontab và systemd unit, bắt buộc dùng đường dẫn tuyệt đối 100%.</li>\n      <li><strong>Đường dẫn Tương đối (Relative Path):</strong> Không bắt đầu bằng <code>/</code>, được tính toán xuất phát từ thư mục hiện tại (<code>PWD</code>). Sử dụng các ký hiệu định vị đặc biệt: <code>.</code> (thư mục hiện tại), <code>..</code> (thư mục cha trực tiếp), <code>~</code> (thư mục Home của user hiện tại, tức biến <code>$HOME</code>).</li>\n      <li><strong>Tăng tốc điều hướng chuyên nghiệp:</strong> Thay vì gõ lại đường dẫn dài nhiều lần, kỹ sư Linux sử dụng <code>cd -</code> (nhảy qua lại tức thì giữa thư mục vừa đứng trước đó thông qua biến <code>$OLDPWD</code>) hoặc ngăn xếp thư mục <code>pushd</code> / <code>popd</code> khi cần làm việc xoay vòng trên 3–4 thư mục cùng lúc.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Điều hướng linh hoạt với cd -, pwd -P và ngăn xếp thư mục pushd/popd",
              "code": "# 1. Di chuyển từ thư mục cấu hình sang thư mục log rồi bật ngược lại tức thì bằng cd -\ncd /etc/ssh\ncd /var/log\ncd -\n\n# 2. Phân biệt đường dẫn logic (pwd -L) và đường dẫn vật lý thật (pwd -P) khi đứng trong symlink\ncd /bin && pwd -L && pwd -P",
              "output": "/etc/ssh\n/bin\n/usr/bin",
              "annotations": [
                {
                  "line": 4,
                  "part": "cd -",
                  "text": "Đọc biến $OLDPWD để đưa bạn quay về ngay /etc/ssh đồng thời in đường dẫn đó ra màn hình xác nhận."
                },
                {
                  "line": 7,
                  "part": "pwd -L vs pwd -P",
                  "text": "-L hiển thị đường dẫn theo tên symlink (/bin), còn -P giải mã tới tận vị trí vật lý thật trên ổ đĩa (/usr/bin)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-4-inode-links",
          "title": "4.2 Giải phẫu Cấu trúc Inode, Dentry & Sự khác biệt Bản chất Hard Link vs Soft Link",
          "content": "<p>Để hiểu tận gốc cách Linux sao chép, đổi tên và xóa tệp, bạn cần nắm vững kiến trúc tách đôi giữa <strong>Dentry (Directory Entry)</strong> và <strong>Inode (Index Node)</strong>:</p>\n    <ul>\n      <li>Bản thân mỗi tệp trên hệ thống file (ext4, XFS) được định danh bởi một con số nguyên duy nhất gọi là <strong>Inode Number</strong>. Inode chứa toàn bộ siêu dữ liệu (UID/GID, quyền <code>rwx</code>, kích thước, dấu thời gian <code>mtime</code>/<code>ctime</code>, bộ đếm liên kết <code>Links</code> và con trỏ tới các khối dữ liệu vật lý trên đĩa) — <strong>nhưng Inode KHÔNG lưu tên file!</strong></li>\n      <li>Tên file thực chất chỉ là một dòng ánh xạ <code>Tên_File &rarr; Số_Inode</code> nằm bên trong bảng thư mục (Dentry).</li>\n    </ul>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Đặc tính Kỹ thuật</th><th>Hard Link (<code>ln nguồn đích</code>)</th><th>Symbolic / Soft Link (<code>ln -s nguồn đích</code>)</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><strong>Bản chất Inode</strong></td><td>Tạo thêm một tên mới trỏ chung vào <strong>cùng số Inode</strong> với tệp gốc (tăng bộ đếm <code>Links</code> lên +1)</td><td>Tạo một tệp mới hoàn toàn có <strong>số Inode riêng</strong>, nội dung chỉ lưu chuỗi đường dẫn văn bản tới tệp đích</td></tr>\n          <tr><td><strong>Khi xóa tệp gốc ban đầu</strong></td><td><strong>Dữ liệu còn nguyên vẹn 100%!</strong> Khối đĩa chỉ giải phóng khi bộ đếm Hard Link giảm về 0</td><td>Liên kết bị gãy (<strong>Dangling/Broken Symlink</strong>), truy cập báo lỗi <code>No such file or directory</code></td></tr>\n          <tr><td><strong>Giới hạn phân vùng &amp; Thư mục</strong></td><td>Không thể vượt qua ranh giới phân vùng khác và không cho phép tạo trên thư mục (tránh vòng lặp)</td><td>Trỏ xuyên qua mọi phân vùng ổ đĩa, ổ mạng NFS và trỏ vào thư mục thoải mái (cực hợp cho Zero-Downtime Deploy)</td></tr>\n        </tbody>\n      </table>\n    </div>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Soi bảng thông số Inode chi tiết bằng lệnh stat và ls -li",
              "code": "# Khảo sát chi tiết cấu trúc Inode, số lượng Hard Links và mốc thời gian của /etc/hosts\nstat /etc/hosts\nls -li /etc/hosts",
              "output": "  File: /etc/hosts\n  Size: 221       \tBlocks: 8          IO Block: 4096   regular file\nDevice: 8,2\tInode: 131089      Links: 1\nAccess: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)\nModify: 2026-10-01 08:12:00.000000000 +0000\nChange: 2026-10-01 08:12:00.000000000 +0000\n131089 -rw-r--r-- 1 root root 221 Oct  1 08:12 /etc/hosts",
              "annotations": [
                {
                  "line": 2,
                  "part": "stat /etc/hosts",
                  "text": "Hiển thị đầy đủ số Inode (131089), số khối đĩa cấp phát (Blocks: 8), bộ đếm Hard Links (Links: 1) và 3 mốc thời gian Access/Modify/Change."
                },
                {
                  "line": 3,
                  "part": "ls -li",
                  "text": "Cờ -i in cột số hiệu Inode ở đầu dòng để dễ dàng đối chiếu hai file có dùng chung một Inode hay không."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-4-safe-file-ops",
          "title": "4.3 Nguyên tắc An toàn Sống còn khi Sao chép, Đổi tên & Xóa (cp -a, mv -n, rm -I)",
          "content": "<p>Trên Linux CLI không có \"Thùng rác (Recycle Bin)\" mặc định — khi lời gọi hệ thống <code>unlink()</code> của lệnh <code>rm</code> thực thi xong, mục Dentry bị gỡ bỏ ngay lập tức. Vì vậy, kỹ sư chuyên nghiệp luôn tuân thủ các cờ bảo vệ an toàn sau:</p>\n    <ul>\n      <li><strong>Sao chép bảo toàn nguyên trạng với <code>cp -a</code> (Archive):</strong> Nếu bạn sao lưu thư mục bằng <code>cp -r</code> thông thường, mọi tệp đích sẽ bị đổi chủ sở hữu sang người đang gõ lệnh, dấu thời gian bị reset về hiện tại và các symlink có nguy cơ bị nhân bản thành file thật. Cờ <code>-a</code> (tương đương <code>-dR --preserve=all</code>) giữ nguyên 100% quyền hạn, chủ sở hữu, timestamps và cấu trúc symlink.</li>\n      <li><strong>Di chuyển nguyên tử với <code>mv</code>:</strong> Khi di chuyển tệp <em>trong cùng một phân vùng đĩa</em>, lệnh <code>mv</code> hoàn thành trong 0.001 giây bất kể tệp nặng 1KB hay 500GB vì nó chỉ cập nhật lại tên trong Dentry mà không chạm tới dữ liệu vật lý! Kết hợp cờ <code>mv -n</code> (no-clobber) hoặc <code>mv -i</code> để tránh vô tình đè mất tệp đích đang tồn tại.</li>\n      <li><strong>Phòng vệ khi xóa với <code>rm -I</code> và kiểm tra trước bằng <code>ls</code>:</strong> Trước khi chạy bất kỳ lệnh <code>rm</code> nào chứa ký tự đại diện <code>*</code>, hãy gõ <code>ls</code> với đúng biểu thức đó trước để mắt nhìn xác nhận danh sách tệp, sau đó dùng <code>rm -I</code> (chỉ hỏi xác nhận 1 lần duy nhất nếu xóa từ 4 tệp trở lên hoặc xóa đệ quy — vừa an toàn vừa không gây tê liệt thao tác như <code>rm -i</code> hỏi từng file một).</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Quy trình sao lưu cấu hình bảo toàn thuộc tính với cp -a và xóa có kiểm soát",
              "code": "# 1. Tạo thư mục phân cấp chuẩn và tệp cấu hình mẫu\nmkdir -p /tmp/safe_ops/conf\necho \"PORT=8080\" > /tmp/safe_ops/conf/app.ini\n\n# 2. Sao lưu bảo toàn nguyên vẹn dấu thời gian và quyền hạn bằng cp -a\ncp -a /tmp/safe_ops/conf /tmp/safe_ops/conf.bak\nls -la --full-time /tmp/safe_ops/conf/app.ini /tmp/safe_ops/conf.bak/app.ini\n\n# 3. Xóa thư mục thử nghiệm an toàn kèm cờ hiển thị chi tiết -v\nrm -rfv /tmp/safe_ops",
              "output": "-rw-r--r-- 1 devops devops 10 2026-11-04 09:30:12.451820100 +0000 /tmp/safe_ops/conf/app.ini\n-rw-r--r-- 1 devops devops 10 2026-11-04 09:30:12.451820100 +0000 /tmp/safe_ops/conf.bak/app.ini\nremoved '/tmp/safe_ops/conf/app.ini'\nremoved directory '/tmp/safe_ops/conf'\nremoved '/tmp/safe_ops/conf.bak/app.ini'\nremoved directory '/tmp/safe_ops/conf.bak'\nremoved directory '/tmp/safe_ops'",
              "annotations": [
                {
                  "line": 6,
                  "part": "cp -a",
                  "text": "Quan sát dấu thời gian chính xác tới nanosecond giữa bản gốc và bản .bak hoàn toàn trùng khớp nhau."
                },
                {
                  "line": 10,
                  "part": "rm -rfv",
                  "text": "Cờ -v (verbose) in rõ từng đường dẫn đang bị gỡ bỏ để lưu vết kiểm chứng trong phiên làm việc."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Sao lưu thư mục cấu hình và triển khai liên kết tượng trưng an toàn.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Sao lưu toàn diện thư mục cấu hình: <code>cp -a /etc/myapp /etc/myapp.bak.$(date +%F)</code>.</li>\n        <li><strong>Bước 2:</strong> Tạo symlink kích hoạt cấu hình web: <code>ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/app</code>.</li>\n        <li><strong>Bước 3:</strong> Dùng <code>readlink -f /etc/nginx/sites-enabled/app</code> để kiểm tra đích đến thực tế.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lệnh Cực Kỳ Nguy Hiểm</div>\n          <p>Chạy lệnh xóa dọn dẹp bằng ký tự đại diện: <code>rm -rf / tmp/log/*</code> hoặc <code>rm -rf .*</code>.</p>\n          <p><strong>Thảm họa:</strong> Dấu cách thừa giữa <code>/</code> và <code>tmp</code> sẽ biến lệnh thành xóa toàn bộ thư mục gốc <code>/</code>! <code>.*</code> mở rộng cả <code>..</code> (thư mục cha) dẫn tới xóa sạch thư mục cha.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Thao Tác An Toàn Tiêu Chuẩn</div>\n          <p>Luôn dùng đường dẫn tuyệt đối tường minh và cờ bảo vệ:</p>\n          <p><code>rm -rf /tmp/log/*</code> (không có dấu cách thừa) hoặc dùng <code>find /tmp/log -type f -delete</code>.</p>\n          <p><strong>Ưu điểm:</strong> An toàn tuyệt đối, tránh lỗi cú pháp dấu cách gây thảm họa.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Tổ chức Cấu trúc Thư mục Dự án & Quản lý Liên kết",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.4</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Xây dựng cây thư mục phát triển phần mềm chuẩn FHS, thực hiện sao chép bảo toàn quyền và tạo symlink không bị gãy.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Thư mục <code>/home/$USER/lab1_4</code>.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Tạo cấu trúc cây thư mục đa cấp: <code>mkdir -p ~/lab1_4/project/{src,tests,docs,logs}</code>.</li>\n        <li><strong>Bước 2:</strong> Tạo tệp cấu hình mẫu: <code>echo 'PORT=8000' > ~/lab1_4/project/src/config.env</code>.</li>\n        <li><strong>Bước 3:</strong> Tạo bản sao lưu bảo toàn: <code>cp -a ~/lab1_4/project ~/lab1_4/project.bak</code>.</li>\n        <li><strong>Bước 4:</strong> Tạo symlink trỏ đến file cấu hình: <code>ln -s $(pwd)/project/src/config.env ~/lab1_4/current_config.env</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">ls -l ~/lab1_4/current_config.env\n-> current_config.env -> /home/.../config.env (liên kết màu xanh hợp lệ, không bị gãy đỏ).</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Xóa file gốc <code>config.env</code> và quan sát màu sắc của symlink trong terminal, sau đó khôi phục lại từ <code>project.bak</code>.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Thiết lập alias bảo vệ trong <code>~/.bashrc</code>: <code>alias rm='rm -i'</code> và <code>alias cp='cp -i'</code> để luôn được hỏi xác nhận trước khi ghi đè hoặc xóa.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Cách khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>Invalid cross-device link</code></td><td>Cố gắng tạo Hard link xuyên qua 2 phân vùng đĩa cứng hoặc hệ thống file khác nhau.</td><td>Chuyển sang dùng Symbolic link: <code>ln -s &lt;nguồn&gt; &lt;đích&gt;</code>.</td></tr>\n          <tr><td>Symlink nhấp nháy màu đỏ (Broken Symlink)</td><td>File đích trỏ tới đã bị xóa, bị đổi tên hoặc tạo symlink bằng đường dẫn tương đối sai.</td><td>Xóa symlink hỏng và tạo lại với đường dẫn tuyệt đối đầy đủ bắt đầu từ <code>/</code>.</td></tr>\n          <tr><td><code>mkdir: cannot create directory: No such file</code></td><td>Thư mục cha chưa tồn tại khi cố gắng tạo thư mục con lồng nhau.</td><td>Thêm cờ <code>-p</code> (parent): <code>mkdir -p dir1/dir2/dir3</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Không bao giờ dùng dấu cách trong tên file trên Linux:</strong> Dùng dấu gạch dưới <code>_</code> hoặc gạch ngang <code>-</code> (ví dụ: <code>server_backup.tar.gz</code>). Dấu cách trong tên file rất dễ gây lỗi trong các bash script tự động hóa.</li>\n        <li><strong>Luôn sao lưu có đuôi thời gian trước khi sửa:</strong> Chạy <code>sudo cp -a /etc/nginx/nginx.conf /etc/nginx/nginx.conf.$(date +%F_%T).bak</code> trước khi chạm vào bất kỳ file cấu hình sản xuất nào.</li>\n        <li><strong>Cẩn trọng tối đa với <code>rm -rf</code>:</strong> Tập thói quen dùng <code>ls</code> kiểm tra danh sách file khớp mẫu trước khi đổi <code>ls</code> thành <code>rm</code>.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>POSIX File System Specifications:</strong> <a href=\"https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html\" target=\"_blank\" rel=\"noopener\">The Open Group Base Specifications Issue 7 - File Systems</a>.</li>\n      <li><strong>Tài liệu Inode nội bộ:</strong> <code>man 2 stat</code> — Xem cấu trúc struct stat của nhân Linux.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng So sánh Hard Link vs Symbolic Link",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Đặc điểm So sánh</th><th>Hard Link (Liên kết cứng)</th><th>Symbolic Link (Liên kết mềm)</th></tr></thead>\n        <tbody>\n          <tr><td>Số hiệu Inode</td><td>Trùng khớp 100% với tệp gốc</td><td>Số hiệu Inode mới hoàn toàn</td></tr>\n          <tr><td>Xuyên phân vùng đĩa?</td><td>Không (Báo lỗi cross-device link)</td><td>Có (Thoải mái xuyên mount point)</td></tr>\n          <tr><td>Áp dụng cho thư mục?</td><td>Không (Bị kernel chặn)</td><td>Có</td></tr>\n          <tr><td>Khi file gốc bị xóa?</td><td>Dữ liệu vẫn còn nguyên vẹn</td><td>Link bị gãy (Broken link)</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố: Lỗi xóa nhầm thư mục mã nguồn production do biến đường dẫn rỗng",
        "content": "<p>Một kỹ sư mới viết script Bash tự động hóa việc dọn dẹp các bản dựng cũ của ứng dụng Python FastAPI. Script có đoạn: <code>rm -rf $BUILD_DIR/*</code>. Khi chạy thử trên server staging, toàn bộ dữ liệu máy chủ biến mất và hệ thống ngừng hoạt động.</p><ol><li><strong>Triệu chứng:</strong> Mọi lệnh hệ thống sau đó đều báo <code>command not found</code>, SSH ngắt kết nối và không thể khởi động lại máy chủ.</li><li><strong>Chẩn đoán:</strong> Khi thực thi script, biến môi trường <code>BUILD_DIR</code> chưa được định nghĩa trước đó (giá trị rỗng <code>\"\"</code>). Câu lệnh <code>rm -rf $BUILD_DIR/*</code> được shell giải mã thành <code>rm -rf /*</code> dưới quyền <code>root</code>. Lệnh đã xóa sạch toàn bộ các tệp thực thi trong <code>/bin</code>, <code>/usr</code>, <code>/etc</code>.</li><li><strong>Nguyên nhân gốc rễ:</strong> Không sử dụng cơ chế kiểm tra biến bắt buộc trong Shell và không trích dẫn biến trong dấu ngoặc kép.</li><li><strong>Khắc phục:</strong> Vì không có cơ chế hoàn tác cho <code>rm</code>, hệ thống chỉ có thể phục hồi bằng cách khôi phục bản ảnh chụp <strong>Snapshot</strong> của máy ảo tạo trước đó.</li><li><strong>Phòng ngừa:</strong> Thiết lập quy tắc lập trình phòng thủ: (1) Bật cờ <code>set -u</code> (báo lỗi dừng ngay nếu biến chưa khai báo), (2) Sử dụng cú pháp mở rộng an toàn <code>rm -rf \"${BUILD_DIR:?Bien_chua_duoc_dat}/*\"</code>, (3) Tuyệt đối không chạy script xóa file dưới quyền root mà không có kiểm thử khô (dry-run).</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi khoảng trắng chết người khi xóa bằng ký tự đại diện (*)",
            "content": "Nếu bạn định xóa tất cả file có đuôi <code>.log</code>, cú pháp đúng là <code>rm *.log</code>. Nếu vô tình ấn thêm dấu cách thành <code>rm * .log</code>, Shell sẽ coi dấu sao <code>*</code> là đối số thứ nhất và xóa SẠCH MỌI FILE trong thư mục hiện tại trước, rồi mới tìm file tên <code>.log</code> để xóa tiếp!"
          },
          {
            "title": "Dùng cp -r thay vì cp -a làm hỏng quyền sở hữu của dịch vụ",
            "content": "Khi sao chép thư mục mã nguồn <code>/var/www/html</code> vốn thuộc sở hữu của user <code>www-data</code>, nếu dùng lệnh <code>sudo cp -r</code>, toàn bộ file sao lưu sẽ bị đổi chủ sở hữu sang <code>root:root</code>. Nginx hoặc Apache sẽ không còn quyền đọc file và ném lỗi 403 Forbidden. Luôn dùng <code>cp -a</code> để bảo toàn thuộc tính gốc."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng trash-cli để tạo thùng rác hoàn tác trên dòng lệnh",
            "content": "Để tránh thảm họa xóa nhầm, hãy cài đặt gói <code>trash-cli</code> (bằng lệnh <code>sudo apt install trash-cli</code>). Khi cần xóa file, gõ <code>trash-put file.txt</code>. Nếu muốn khôi phục, chỉ cần gõ <code>trash-restore</code> và chọn số thứ tự tệp cần lấy lại."
          },
          {
            "title": "Tạo alias bảo vệ cho lệnh rm",
            "content": "Thêm dòng <code>alias rm='rm -I'</code> vào file <code>~/.bashrc</code>. Cờ <code>-I</code> (chữ I hoa) sẽ chỉ hỏi xác nhận một lần duy nhất nếu bạn xóa nhiều hơn 3 file hoặc xóa đệ quy thư mục, vừa an toàn vừa không gây phiền toái."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Điều hướng không gian và tạo cây thư mục dự án",
          "problem": "Từ thư mục cá nhân của bạn, hãy viết các lệnh để: (1) Tạo cấu trúc thư mục dự án gồm 3 thư mục con: `project/src`, `project/tests`, `project/docs` trong 1 câu lệnh duy nhất; (2) Chuyển vào thư mục `src`; (3) Kiểm tra đường dẫn tuyệt đối tại đó bằng `pwd` và sau đó nhảy ngược lại thư mục cá nhân bằng 1 lệnh ngắn nhất.",
          "hint": "Sử dụng mkdir -p với cú pháp mở rộng ngoặc nhọn {src,tests,docs} và cd - hoặc cd ~.",
          "solutionCode": "# 1. Tạo cây thư mục dự án trong 1 lệnh\nmkdir -p ~/project/{src,tests,docs}\n\n# 2. Chuyển vào thư mục src\ncd ~/project/src\n\n# 3. In đường dẫn tuyệt đối\npwd\n\n# 4. Trở về thư mục nhà ngắn gọn nhất\ncd",
          "solutionOutput": "/home/devops/project/src",
          "explanation": "Lệnh mkdir -p ~/project/{src,tests,docs} tự động mở rộng và tạo cả 3 thư mục con an toàn. Lệnh cd không có tham số mặc định chuyển người dùng về thẳng $HOME.",
          "annotations": [
            {
              "part": "mkdir -p ~/project/{src,tests,docs}",
              "text": "Cú pháp mở rộng ngoặc nhọn kết hợp cờ -p tạo hàng loạt thư mục chỉ trong một câu lệnh."
            },
            {
              "part": "cd",
              "text": "Lệnh cd đứng một mình luôn dẫn về thư mục nhà (~)."
            }
          ],
          "rubric": [
            {
              "criterion": "Đúng cú pháp lệnh và cờ",
              "pass": "Sử dụng đúng cp -a, mkdir -p và ln -s",
              "excellent": "Dùng đường dẫn tuyệt đối chuẩn xác cho symlink",
              "weight": "40%"
            },
            {
              "criterion": "Kết quả chính xác",
              "pass": "Tạo cây thư mục thành công, liên kết hợp lệ",
              "excellent": "Bảo toàn nguyên vẹn thuộc tính thời gian và quyền",
              "weight": "30%"
            },
            {
              "criterion": "Hiểu cơ chế Inode",
              "pass": "Phân biệt được hardlink và symlink",
              "excellent": "Giải thích được cơ chế link count của Inode",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Tạo liên kết tượng trưng (Symlink) triển khai dịch vụ Zero-Downtime",
          "problem": "Trong kiến trúc triển khai ứng dụng thực tế, người ta thường dùng symlink `current` để trỏ vào phiên bản phát hành mới nhất. Hãy: (1) Tạo thư mục `/tmp/releases/v1.0` và một file `app.py` bên trong có nội dung `VERSION=1.0`; (2) Tạo một liên kết mềm tên `/tmp/releases/current` trỏ vào `v1.0`; (3) Đọc nội dung file thông qua liên kết `current/app.py` để xác nhận liên kết hoạt động hoàn hảo.",
          "hint": "Dùng mkdir -p, echo, ln -s với đường dẫn tuyệt đối và cat để kiểm tra.",
          "solutionCode": "# 1. Tạo thư mục bản phát hành v1.0 và file app.py\nmkdir -p /tmp/releases/v1.0\necho 'VERSION=1.0' > /tmp/releases/v1.0/app.py\n\n# 2. Tạo liên kết mềm current trỏ tới v1.0\nln -s /tmp/releases/v1.0 /tmp/releases/current\n\n# 3. Đọc dữ liệu xuyên qua symlink\ncat /tmp/releases/current/app.py\nls -l /tmp/releases/current",
          "solutionOutput": "VERSION=1.0\nlrwxrwxrwx 1 devops devops 19 Oct 28 10:25 /tmp/releases/current -> /tmp/releases/v1.0",
          "explanation": "Khi có phiên bản mới v2.0, kỹ sư chỉ cần đổi symlink current trỏ sang v2.0 bằng lệnh 'ln -sfn /tmp/releases/v2.0 /tmp/releases/current'. Web server Nginx luôn đọc qua đường dẫn /tmp/releases/current mà không cần khởi động lại dịch vụ.",
          "annotations": [
            {
              "part": "ln -s",
              "text": "Tạo Symbolic link trỏ tới đường dẫn thư mục v1.0."
            },
            {
              "part": "/tmp/releases/current/app.py",
              "text": "Hệ điều hành tự động giải mã symlink current thành /tmp/releases/v1.0."
            }
          ],
          "rubric": [
            {
              "criterion": "Khởi tạo cấu trúc phát hành và Symlink chuẩn xác",
              "pass": "Tạo đúng thư mục /tmp/releases/v1.0, tệp app.py và tạo được symlink current",
              "excellent": "Sử dụng đường dẫn tuyệt đối khi gõ ln -s /tmp/releases/v1.0 /tmp/releases/current để tránh lỗi symlink gãy tương đối",
              "weight": "55%"
            },
            {
              "criterion": "Xác minh truy cập xuyên qua liên kết mềm",
              "pass": "Đọc đúng chuỗi VERSION=1.0 qua đường dẫn /tmp/releases/current/app.py",
              "excellent": "Kiểm tra kèm ls -l để xác nhận mũi tên trỏ đích và hiểu cách hoán đổi phiên bản bằng ln -sfn khi nâng cấp lên v2.0",
              "weight": "45%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Thực hành An toàn Dữ liệu: Phân biệt Hard Link vs Soft Link khi xóa file",
          "problem": "Hãy thực hiện một thí nghiệm kiểm chứng cơ chế bảo vệ Inode của Linux trong thư mục `/tmp/lab_link`: (1) Tạo file `data.txt` chứa chuỗi 'Bí mật'; (2) Tạo một Hard Link `hl.txt` và một Soft Link `sl.txt` trỏ tới `data.txt`; (3) Xóa file gốc `data.txt`; (4) Dùng lệnh `cat` để đọc nội dung của cả `hl.txt` và `sl.txt`. Giải thích kết quả đầu ra dựa trên cấu trúc Inode.",
          "hint": "Sử dụng lệnh ln, ln -s, rm và quan sát lỗi của Soft link và thành công của Hard link.",
          "solutionCode": "# 1. Thiết lập môi trường thí nghiệm\nmkdir -p /tmp/lab_link && cd /tmp/lab_link\necho 'Bí mật' > data.txt\n\n# 2. Tạo Hard link và Soft link\nln data.txt hl.txt\nln -s data.txt sl.txt\n\n# 3. Xóa file gốc data.txt\nrm data.txt\n\n# 4. Kiểm tra khả năng đọc dữ liệu từ 2 liên kết\ncat hl.txt\ncat sl.txt 2>&1",
          "solutionOutput": "Bí mật\ncat: sl.txt: No such file or directory",
          "explanation": "Khi xóa data.txt, kernel chỉ giảm Link Count của Inode đi 1 (từ 2 về 1). Vì hl.txt vẫn trỏ vào Inode đó nên dữ liệu không bị xóa khỏi đĩa và hl.txt vẫn đọc được bình thường. Ngược lại, sl.txt chỉ lưu chuỗi ký tự 'data.txt'. Khi data.txt bị xóa, sl.txt trở thành 'broken symlink' và báo lỗi No such file or directory.",
          "annotations": [
            {
              "part": "ln data.txt hl.txt",
              "text": "Hard link giữ nguyên vẹn dữ liệu ngay cả khi file ban đầu bị xóa."
            },
            {
              "part": "cat sl.txt 2>&1",
              "text": "Soft link bị gãy khi file đích không còn tồn tại trên đường dẫn chỉ định."
            }
          ],
          "rubric": [
            {
              "criterion": "Thiết lập thí nghiệm đối chứng Hard Link và Soft Link",
              "pass": "Tạo đúng tệp gốc data.txt, liên kết cứng hl.txt (ln) và liên kết mềm sl.txt (ln -s) rồi xóa data.txt",
              "excellent": "Thực hiện quy trình sạch sẽ trong thư mục cô lập /tmp/lab_link và thu giữ cả luồng lỗi stderr khi đọc sl.txt",
              "weight": "45%"
            },
            {
              "criterion": "Giải thích cơ chế tham chiếu Inode",
              "pass": "Chỉ ra hl.txt vẫn đọc được 'Bí mật' còn sl.txt báo lỗi No such file or directory",
              "excellent": "Giải thích sâu bằng bộ đếm liên kết (Reference Count) của Inode: xóa data.txt chỉ giảm Links từ 2 xuống 1 nên khối dữ liệu vật lý chưa bị giải phóng",
              "weight": "55%"
            }
          ]
        }
      ],
      "summary": [
        "Đường dẫn tuyệt đối luôn bắt đầu từ `/` và trỏ cố định đến một vị trí; đường dẫn tương đối tính từ thư mục hiện tại `pwd`.",
        "Bốn ký tự định hướng cốt lõi: `.` (thư mục này), `..` (thư mục cha), `~` (thư mục nhà) và `-` (thư mục vừa đứng trước đó).",
        "Luôn dùng `mkdir -p` để tạo cây thư mục lồng nhau an toàn và dùng `cp -a` để bảo toàn quyền sở hữu, timestamps và symlinks.",
        "Hard link trỏ chung số Inode vật lý và bảo toàn dữ liệu khi xóa file gốc; Soft link (symlink) lưu chuỗi đường dẫn và sẽ bị gãy nếu file đích bị xóa.",
        "Lệnh `rm` xóa vĩnh viễn không thể hoàn tác: luôn kiểm tra trước bằng `ls`, trích dẫn khoảng trắng và áp dụng phương pháp Soft Delete vào thư mục rác tạm thời."
      ],
      "generalInfo": {
        "duration": "45 phút",
        "targetAudience": "Lập trình viên, Kỹ sư Hệ thống, DevOps",
        "prerequisites": "Đã hoàn thành Bài 1.2 và 1.3, hiểu cấu trúc FHS",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2)",
        "materials": "Terminal, quyền user thường, thư mục lab giả lập"
      },
      "nextLessonPreview": "Trong bài tiếp theo (1.5), chúng ta sẽ làm chủ Kỹ năng Xem Nội dung File & Soạn thảo Sinh tồn (`cat`, `less`, `head`, `tail`, `tail -F`, `nano`, `vim`) để theo dõi log trực tiếp và sửa file cấu hình tự tin.",
      "quiz": [
        {
          "question": "Lệnh nào sau đây sao chép toàn bộ thư mục kèm theo việc BẢO TOÀN toàn bộ quyền hạn, mốc thời gian và liên kết tượng trưng?",
          "options": [
            "cp -r nguồn đích",
            "cp -a nguồn đích",
            "cp -f nguồn đích",
            "cp -u nguồn đích"
          ],
          "correctIndex": 1,
          "explanation": "Cờ -a (archive) tương đương với tổ hợp -dR --preserve=all, giúp bảo lưu trọn vẹn thuộc tính file, permissions và symlink."
        },
        {
          "question": "Điều gì xảy ra với dữ liệu trên đĩa cứng khi bạn xóa một tệp tin đang có 2 Hard links trỏ vào nó?",
          "options": [
            "Toàn bộ dữ liệu bị xóa sạch ngay lập tức và hard link thứ hai bị hỏng.",
            "Hệ thống từ chối xóa và báo lỗi Permission denied.",
            "Chỉ có tên tệp bạn vừa xóa bị gỡ khỏi thư mục cha; số liên kết Inode giảm từ 2 xuống 1 và dữ liệu vẫn còn nguyên vẹn qua hard link còn lại.",
            "Hệ thống tự động khởi động lại."
          ],
          "correctIndex": 2,
          "explanation": "Dữ liệu chỉ thực sự bị thu hồi khi link count của Inode giảm về 0 VÀ không còn tiến trình nào đang mở file đó."
        },
        {
          "question": "Tại sao không thể tạo một Hard link trỏ từ phân vùng `/home` sang một tệp nằm ở phân vùng `/var`?",
          "options": [
            "Vì /var chỉ cho phép lưu file log.",
            "Vì mỗi phân vùng đĩa cứng (filesystem) quản lý một bảng số hiệu Inode độc lập riêng; số Inode không có giá trị duy nhất xuyên qua các phân vùng khác nhau.",
            "Vì người dùng thường không có quyền truy cập /home.",
            "Vì lệnh ln không hỗ trợ đường dẫn dài."
          ],
          "correctIndex": 1,
          "explanation": "Hard link gắn chặt với số hiệu Inode của một hệ thống file cụ thể. Không thể có hard link cross-filesystem; trong trường hợp này bắt buộc phải dùng Symbolic link (ln -s)."
        }
      ],
      "reflectionQuestion": "Một quản trị viên thực hiện xóa một file log dung lượng 50GB bằng lệnh `rm /var/log/app.log`. Tuy nhiên, khi kiểm tra lại bằng lệnh `df -h /`, dung lượng ổ cứng vẫn không hề tăng lên một gigabyte nào. Dựa vào kiến trúc Inode và File Descriptor của Linux, hãy giải thích nguyên nhân và đưa ra cách xử lý triệt để.",
      "reflectionHint": "Gợi ý: Lệnh `rm` chỉ gỡ bỏ tên file khỏi thư mục (unlink). Nếu tiến trình ứng dụng vẫn đang mở file log đó (giữ File Descriptor mở), Kernel sẽ chưa giải phóng các khối dữ liệu trên đĩa. Dùng lệnh `lsof +L1` để tìm tiến trình đang giữ file đã xóa (deleted), sau đó khởi động lại tiến trình hoặc truncate file (`: > /proc/<PID>/fd/<FD>`)."
    },
    {
      "id": "lx-1-05",
      "number": "1.5",
      "title": "Xem Nội dung File & Soạn thảo Sinh tồn (`cat`, `less`, `head`, `tail`, `tail -F`, `nano`, `vim`)",
      "subtitle": "Khai thác công cụ đọc file tối ưu theo dung lượng, bám đuôi log thời gian thực và làm chủ kỹ năng thoát hiểm trong Vim",
      "level": "Cơ bản",
      "duration": "45 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Liệt kê và phân biệt chức năng các lệnh xem tệp: `cat`, `less`, `head`, `tail` và 3 chế độ hoạt động cơ bản của trình soạn thảo Vim.",
        "2. [Hiểu - Understand] Giải thích cơ chế luân chuyển tệp log (Log Rotation) và phân biệt sự khác biệt sống còn giữa `tail -f` (theo dõi theo File Descriptor) và `tail -F` (theo dõi theo Tên tệp qua chu kỳ xoay vòng log).",
        "3. [Vận dụng - Apply] Sử dụng thành thạo `less` để điều hướng và tìm kiếm từ khóa trong tệp cấu hình lớn; chỉnh sửa và lưu tệp an toàn bằng `nano` và `vim` (Normal, Insert, Command mode, `:wq!`).",
        "4. [Phân tích - Analyze] Đánh giá rủi ro tê liệt terminal khi dùng `cat` trên file log hàng gigabyte hoặc file nhị phân, phục hồi terminal bằng `reset`."
      ],
      "intuition": {
        "title": "Chiếc kính lúp xem từng đoạn (less) vs Đổ cả xe tải cát vào cửa sổ (cat)",
        "metaphor": "Hãy tưởng tượng nội dung tệp giống như một bãi cát khổng lồ. Dùng lệnh `cat` giống như việc bạn mở toang cửa sổ và trút nguyên một chiếc xe ben chở 10 tấn cát vào căn phòng: màn hình terminal của bạn sẽ bị cát tràn ngập với tốc độ chóng mặt, chữ cuộn vèo vèo không thể đọc kịp và bộ nhớ RAM bị quá tải. Ngược lại, lệnh `less` giống như việc bạn cầm một chiếc kính lúp thông minh: bạn chỉ đưa vào phòng đúng một khung nhìn vừa vặn với kích thước màn hình, cho phép bạn lật từng trang, đi lùi, phóng tới, tìm kiếm từ khóa mà không bao giờ làm tràn bộ nhớ hay nghẽn terminal.",
        "boundary": "Lệnh `cat` vẫn rất hữu ích khi bạn cần nối nhiều file nhỏ (concatenate) hoặc in nhanh file chỉ có 3–5 dòng; nhưng với bất kỳ file nào không rõ kích thước, `less` luôn là người bạn sinh tồn số 1.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📄</span><span>CÔNG CỤ XEM DỮ LIỆU</span><span class=\"lx-vs-tag\">Viewers</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>cat</code> (Concatenate):</strong> Đổ toàn bộ file ra stdout; chỉ dùng cho file ngắn.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>less</code> (Pager):</strong> Xem phân trang, cuộn mượt mà, tìm kiếm với <code>/</code>, không ngốn RAM.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>head</code> / <code>tail</code>:</strong> Trích xuất N dòng đầu / N dòng cuối.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>tail -F</code>:</strong> Theo dõi log trực tiếp, tự bám theo file mới khi bị xoay vòng logrotate.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>📝</span><span>SOẠN THẢO SINH TỒN</span><span class=\"lx-vs-tag\">Editors</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>nano</code>:</strong> Thân thiện người mới, hiển thị phím tắt ở đáy màn hình (<code>Ctrl+O</code> lưu, <code>Ctrl+X</code> thoát).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>vim</code>:</strong> Chuẩn mực mọi máy chủ Unix. 3 mode: Normal (điều hướng), Insert (nhập liệu bằng <code>i</code>), Command (lưu/thoát bằng <code>:wq</code>).</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Công cụ Đọc File & Trình Soạn thảo Sinh tồn",
          "content": "<p>Trên máy chủ Linux không có giao diện đồ họa (GUI), việc đọc log và chỉnh sửa cấu hình diễn ra hoàn toàn trên dòng lệnh. Hiểu rõ công cụ giúp bạn không bao giờ làm sập terminal.</p>\n    <p><strong>So sánh sống còn giữa <code>tail -f</code> và <code>tail -F</code>:</strong> Lệnh <code>tail -f</code> (chữ thường) bám theo chỉ số <em>File Descriptor (Inode)</em> của tệp ban đầu. Khi dịch vụ <code>logrotate</code> hoạt động (nén file cũ thành <code>app.log.1</code> và tạo file <code>app.log</code> mới), <code>tail -f</code> sẽ tiếp tục bám theo file cũ và ngừng in log mới! Ngược lại, <code>tail -F</code> (chữ hoa) bám theo <em>Tên tệp (Filename)</em>, khi phát hiện file bị đổi tên, nó tự động mở lại file mới tạo để tiếp tục in log mà không bị gián đoạn.</p>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Tình huống khuyên dùng</th></tr></thead>\n    <tbody>\n      <tr><td><code>less</code></td><td>Xem nội dung phân trang thông minh</td><td><code>less &lt;tệp&gt;</code></td><td><code>less /var/log/syslog</code></td><td>Không nạp toàn bộ file vào RAM; phím <code>/</code> tìm kiếm, <code>q</code> thoát.</td></tr>\n      <tr><td><code>tail -F</code></td><td>Theo dõi log trực tiếp thời gian thực</td><td><code>tail -F &lt;file_log&gt;</code></td><td><code>tail -F /var/log/nginx/access.log</code></td><td><code>-F</code> (chữ hoa) tự động bám theo file mới sau khi logrotate đổi tên file.</td></tr>\n      <tr><td><code>head</code></td><td>Trích xuất N dòng đầu tiên</td><td><code>head -n &lt;số_dòng&gt; &lt;tệp&gt;</code></td><td><code>head -n 20 /etc/passwd</code></td><td>Mặc định lấy 10 dòng đầu nếu không chỉ định <code>-n</code>.</td></tr>\n      <tr><td><code>nano</code></td><td>Trình soạn thảo trực quan cơ bản</td><td><code>nano &lt;tệp&gt;</code></td><td><code>sudo nano /etc/hosts</code></td><td>Dễ dùng; phím tắt hiển thị dưới đáy màn hình (dấu <code>^</code> là Ctrl).</td></tr>\n      <tr><td><code>vim</code></td><td>Trình soạn thảo chuẩn mực mạnh mẽ</td><td><code>vim &lt;tệp&gt;</code></td><td><code>sudo vim /etc/nginx/nginx.conf</code></td><td>Có mặt trên 100% server; cần nhớ <code>Esc :wq!</code> để lưu và thoát sinh tồn.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Theo dõi log thời gian thực và thoát Vim an toàn",
              "lang": "Bash",
              "code": "# 1. Xem 10 dòng cuối của file log hệ thống\ntail -n 10 /var/log/dpkg.log\n\n# 2. Theo dõi log liên tục có khả năng bám theo logrotate\ntail -F /var/log/syslog\n\n# 3. Phím tắt sinh tồn trong Vim khi bị kẹt:\n# Nhấn phím Esc -> Gõ :wq! -> Nhấn Enter để lưu và thoát bắt buộc\n# Hoặc nhấn Esc -> Gõ :q! -> Nhấn Enter để thoát không lưu thay đổi",
              "output": "2024-10-28 10:00:00 status installed python3:amd64 3.12.3-0ubuntu1\n2024-10-28 10:00:01 status installed nginx:amd64 1.24.0-2ubuntu7",
              "annotations": [
                {
                  "line": 2,
                  "text": "tail -n 10: Chỉ in 10 dòng cuối cùng của tệp."
                },
                {
                  "line": 5,
                  "text": "tail -F: Cờ -F viết hoa bảo đảm không bị mất dấu log khi file bị xoay vòng."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-5-pager-vs-cat",
          "title": "4.1 Đọc Tệp Lớn An toàn: Cơ chế Phân trang Lười (Lazy Loading) của less vs cat",
          "content": "<p>Sai lầm phổ biến của người mới khi lên server production là gõ <code>cat /var/log/nginx/access.log</code> trên một tệp nhật ký nặng 8GB. Lệnh <code>cat</code> (concatenate) được thiết kế để <em>đổ cạn toàn bộ luồng dữ liệu từ đầu đến cuối ra màn hình</em> không điểm dừng, làm treo cứng băng thông SSH và ngốn CPU Terminal Emulator.</p>\n    <p>Ngược lại, <strong><code>less</code></strong> hoạt động theo cơ chế <strong>Lazy Paging</strong>: nó chỉ đọc đúng 1 trang màn hình (~40 dòng) vào bộ nhớ RAM tại một thời điểm, nên mở tệp 50MB hay 50GB đều mất chưa tới 0.01 giây! Bộ tổ hợp phím điều khiển trong <code>less</code> dùng chung triết lý với trình đọc <code>man</code> và <code>vim</code>:</p>\n    <ul>\n      <li><code>Space</code> / <code>b</code>: Lật xuống 1 trang / Lật ngược lên 1 trang.</li>\n      <li><code>G</code> (Shift+g) / <code>g</code>: Nhảy thẳng xuống dòng cuối cùng của file log (mới nhất) / Nhảy về dòng đầu tiên.</li>\n      <li><code>/từ_khóa</code> hoặc <code>?từ_khóa</code>: Tìm kiếm xuôi xuống dưới hoặc tìm ngược từ đáy lên trên; nhấn <code>n</code> / <code>N</code> để nhảy qua các kết quả khớp.</li>\n      <li><code>less -S</code> (Chop long lines): Không tự động bẻ gãy dòng dài (như JSON log hay bảng SQL rộng), cho phép dùng phím mũi tên Trái/Phải trượt ngang cực kỳ rõ ràng.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Trích xuất lát cắt dòng cụ thể bằng kết hợp head, tail và nl đánh số dòng",
              "code": "# 1. Xem 5 dòng đầu tiên kèm số thứ tự dòng của tệp /etc/passwd\nnl -ba /etc/passwd | head -n 5\n\n# 2. Kỹ thuật cắt chính xác từ dòng thứ 6 đến dòng thứ 10 của một tệp lớn\nnl -ba /etc/passwd | head -n 10 | tail -n 5",
              "output": "     1\troot:x:0:0:root:/root:/bin/bash\n     2\tdaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\n     3\tbin:x:2:2:bin:/bin:/usr/sbin/nologin\n     4\tsys:x:3:3:sys:/dev:/usr/sbin/nologin\n     5\tsync:x:4:65534:sync:/bin:/bin/sync\n     6\tgames:x:5:60:games:/usr/games:/usr/sbin/nologin\n     7\tman:x:6:12:man:/var/cache/man:/usr/sbin/nologin\n     8\tlp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin\n     9\tmail:x:8:8:mail:/var/mail:/usr/sbin/nologin\n    10\tnews:x:9:9:news:/var/spool/news:/usr/sbin/nologin",
              "annotations": [
                {
                  "line": 2,
                  "part": "nl -ba",
                  "text": "Đánh số thứ tự cho toàn bộ các dòng (kể cả dòng trống) để dễ dàng đối chiếu vị trí."
                },
                {
                  "line": 5,
                  "part": "head -n 10 | tail -n 5",
                  "text": "Lấy 10 dòng đầu rồi giữ lại 5 dòng cuối của cụm đó -> thu được chính xác lát cắt dòng [6..10]."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-5-tail-logrotate",
          "title": "4.2 Giám sát Nhật ký Thời gian thực: Giải phẫu tail -f (Inode) vs tail -F (Filename)",
          "content": "<p>Khi trực chiến xử lý lỗi (live debugging), bạn cần mở một cửa sổ theo dõi các dòng log mới sinh ra theo từng mili-giây. Hiểu sâu sự khác biệt giữa <code>-f</code> và <code>-F</code> giúp bạn không bị \"mù thông tin\" đúng lúc nửa đêm:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Tùy chọn</th><th>Cú pháp đầy đủ tương đương</th><th>Đối tượng theo dõi</th><th>Hành vi khi Logrotate xoay vòng tệp lúc 00:00</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><code>tail -f</code></td><td><code>--follow=descriptor</code></td><td>Bám cứng theo số <strong>Inode / File Descriptor</strong> đang mở</td><td>Khi <code>app.log</code> bị đổi tên thành <code>app.log.1</code> và tạo tệp <code>app.log</code> mới (Inode mới), <code>tail -f</code> bị kẹt ở tệp cũ đã ngừng ghi!</td></tr>\n          <tr><td><code>tail -F</code></td><td><code>--follow=name --retry</code></td><td>Bám theo <strong>Đường dẫn tên tệp</strong> và tự động mở lại</td><td>Phát hiện tệp bị xoay vòng hoặc chưa kịp tạo ra, tự động đóng Inode cũ và kết nối ngay sang Inode mới của <code>app.log</code> không gián đoạn!</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <p><strong>Mẹo kết hợp đường ống thời gian thực:</strong> Khi nối <code>tail -F</code> qua nhiều chặng <code>grep</code>, bộ đệm chuẩn của thư viện C (4KB block buffering) có thể làm dòng log bị giữ lại chưa hiện ngay. Hãy thêm cờ <code>grep --line-buffered</code> để ép xuất từng dòng ngay lập tức khi xuất hiện lỗi.</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Mô phỏng hiện tượng xoay vòng log và kiểm chứng sức mạnh của tail -F",
              "code": "# 1. Xem 3 dòng cuối của nhiều tệp log cùng lúc trong một màn hình duy nhất\ntail -n 3 /etc/hostname /etc/hosts\n\n# 2. Cú pháp chuẩn giám sát trực tiếp luồng sự kiện kèm chống nghẽn bộ đệm dòng\n# (Trong thực tế chạy liên tục; ở đây dùng timeout 1s để minh họa an toàn)\ntimeout 1s tail -F /var/log/dpkg.log 2>/dev/null | grep --line-buffered 'status' | tail -n 2 || true",
              "output": "==> /etc/hostname <==\nprod-srv01\n\n==> /etc/hosts <==\n127.0.0.1\tlocalhost\n127.0.1.1\tprod-srv01\n::1     ip6-localhost ip6-loopback\n2026-11-04 08:10:22 status installed curl:amd64 8.5.0-2ubuntu10\n2026-11-04 08:15:04 status installed htop:amd64 3.3.0-4build1",
              "annotations": [
                {
                  "line": 2,
                  "part": "tail -n 3 file1 file2",
                  "text": "Khi truyền nhiều tệp cho tail (hoặc tail -F /var/log/nginx/*.log), lệnh tự động in tiêu đề phân tách ==> tên_file <== rất trực quan."
                },
                {
                  "line": 6,
                  "part": "--line-buffered",
                  "text": "Đảm bảo mỗi dòng log khớp điều kiện được đẩy qua pipe tức khắc theo thời gian thực mà không đợi gom đầy bộ đệm 4KB."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-5-vim-modal-survival",
          "title": "4.3 Tư duy Soạn thảo Đa chế độ (Modal Editing) trong Vim & Cứu hộ Cấu hình Khẩn cấp",
          "content": "<p>Trên các bản cài đặt máy chủ tối giản (Minimal Ubuntu, Alpine container, hệ thống cứu hộ initramfs), <code>nano</code> thường không tồn tại mà chỉ có <code>vi</code> / <code>vim</code>. Lý do người mới bị \"mắc kẹt không thoát được Vim\" là vì Vim không mở ở chế độ gõ văn bản ngay như Notepad, mà vận hành qua <strong>3 chế độ tách biệt</strong>:</p>\n    <ul>\n      <li><strong>Normal Mode (Chế độ điều hướng &amp; thao tác lệnh — Mặc định khi mở):</strong> Mọi phím chữ cái đều là phím chức năng: <code>j/k</code> (lên/xuống), <code>gg/G</code> (đầu/cuối file), <code>dd</code> (xóa cả dòng hiện tại), <code>u</code> (Undo hoàn tác), <code>yy</code> &amp; <code>p</code> (sao chép và dán dòng), <code>ciw</code> (xóa từ đang đứng và chuyển ngay sang gõ từ mới). <em>Bất cứ khi nào bối rối, chỉ cần bấm <code>Esc</code> 2 lần là chắc chắn quay về Normal Mode!</em></li>\n      <li><strong>Insert Mode (Chế độ nhập liệu):</strong> Bấm <code>i</code> (chèn tại con trỏ), <code>a</code> (chèn sau con trỏ) hoặc <code>o</code> (mở dòng mới bên dưới) để gõ nội dung bình thường. Đáy màn hình sẽ hiện chữ <code>-- INSERT --</code>.</li>\n      <li><strong>Command-Line Mode (Chế độ lưu/thoát/tìm kiếm nâng cao):</strong> Từ Normal Mode bấm dấu hai chấm <code>:</code> rồi gõ: <code>:w</code> (lưu), <code>:wq</code> (lưu và thoát), <code>:q!</code> (<strong>hủy bỏ mọi sửa đổi nhầm và thoát khẩn cấp</strong>), <code>:set nu</code> (hiện số dòng), hoặc <code>:%s/cũ/mới/g</code> (thay thế toàn bộ tệp).</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Mở Vim nhảy thẳng tới dòng lỗi hoặc thực thi chỉnh sửa tự động không tương tác",
              "code": "# 1. Mở tệp tại đúng dòng số 42 (cực hữu ích khi trình biên dịch/Nginx báo lỗi ở line 42)\n# Cú pháp: vim +42 /etc/nginx/nginx.conf\n\n# 2. Thực thi chuỗi lệnh Ex-mode của Vim tự động từ CLI và kiểm tra kết quả\ncp /etc/hosts /tmp/hosts_demo\nvim -es -c '%s/localhost/local-dev/g' -c 'wq' /tmp/hosts_demo\nhead -n 2 /tmp/hosts_demo && rm -f /tmp/hosts_demo",
              "output": "127.0.0.1\tlocal-dev\n127.0.1.1\tprod-srv01",
              "annotations": [
                {
                  "line": 2,
                  "part": "vim +42 ...",
                  "text": "Hoặc dùng vim +/'từ_khóa' tên_file để con trỏ đáp trúng ngay dòng cấu hình cần sửa khi vừa mở tệp."
                },
                {
                  "line": 6,
                  "part": "-c '%s/.../.../g' -c 'wq'",
                  "text": "Minh họa chính xác các lệnh Command-Line Mode bên trong Vim: thay thế toàn cục (%s) rồi ghi đĩa và thoát (wq)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Điều tra file log Nginx dung lượng 10GB và mở tệp cấu hình bằng Vim.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Dùng <code>less /var/log/nginx/access.log</code> để mở log mà không tốn RAM.</li>\n        <li><strong>Bước 2:</strong> Tìm kiếm lỗi 500 bằng cách gõ <code>/HTTP/1.1\" 500</code> và nhấn Enter, dùng <code>n</code> để nhảy đến lỗi tiếp theo.</li>\n        <li><strong>Bước 3:</strong> Mở file cấu hình bằng Vim: <code>sudo vim /etc/nginx/nginx.conf</code>, bấm <code>i</code> để sửa, bấm <code>Esc</code> rồi gõ <code>:wq</code> để lưu.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lệnh Sai Lầm Gây Treo Terminal</div>\n          <p>Gõ <code>cat /var/log/large_app.log</code> hoặc đọc file binary <code>cat /usr/bin/python3</code>.</p>\n          <p><strong>Hậu quả:</strong> Hàng triệu dòng text đổ dồn vào buffer terminal làm đơ máy, ký tự nhị phân làm hỏng font hiển thị của terminal.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Lệnh Đúng Chuẩn Sinh Tồn</div>\n          <p>Luôn xem file lớn bằng <code>less</code> hoặc trích xuất bằng <code>tail -n 50</code>:</p>\n          <p><code>less /var/log/large_app.log</code></p>\n          <p><strong>Khắc phục khi terminal bị lỗi ký tự:</strong> Gõ lệnh mù <code>reset</code> rồi ấn Enter để khôi phục terminal.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Giám sát Log Trực tiếp & Soạn thảo File Cấu hình",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.5</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thành thạo kỹ năng điều hướng trong <code>less</code>, theo dõi log bằng <code>tail -F</code> và chỉnh sửa file cấu hình bằng Vim.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Máy ảo Linux, file <code>/etc/hosts</code>.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Mở file cấu hình mạng bằng less: <code>less /etc/hosts</code>, thử tìm kiếm chuỗi <code>localhost</code> bằng <code>/localhost</code>.</li>\n        <li><strong>Bước 2:</strong> Mở một cửa sổ terminal phụ, chạy <code>tail -F /var/log/auth.log</code> để trực tiếp xem các sự kiện đăng nhập.</li>\n        <li><strong>Bước 3:</strong> Tạo file ghi chú bằng Vim: <code>vim ~/notes.txt</code>. Nhấn <code>i</code> để vào Insert mode, gõ <code>Linux Survival Skills 2026</code>. Nhấn <code>Esc</code>, gõ <code>:wq</code> và ấn Enter.</li>\n        <li><strong>Bước 4:</strong> Kiểm tra nội dung vừa tạo bằng <code>cat ~/notes.txt</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">cat ~/notes.txt\n-> Linux Survival Skills 2026 (tệp được lưu hoàn hảo qua Vim).</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Trong Vim, học cách nhảy thẳng đến dòng thứ 50 bằng cú pháp <code>:50</code> và xóa cả dòng bằng phím <code>dd</code>.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Luôn sao lưu file cấu hình gốc trước khi sửa bằng Vim/nano (ví dụ: <code>sudo cp -a /etc/hosts /etc/hosts.bak</code>).\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống Sự cố</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục tức thì</th></tr></thead>\n        <tbody>\n          <tr><td>Bị kẹt trong Vim không biết thoát ra sao</td><td>Vim đang ở chế độ Insert hoặc chế độ khác và không nhận lệnh gõ tắt.</td><td>Bấm phím <code>Esc</code> 3 lần liên tiếp, gõ <code>:q!</code> rồi ấn Enter để thoát không lưu.</td></tr>\n          <tr><td>Terminal bị vỡ font, hiển thị ký tự rác</td><td>Vô tình dùng lệnh <code>cat</code> đọc file binary (nhị phân) chứa các mã điều khiển ANSI escape.</td><td>Gõ mù lệnh: <code>reset</code> (ấn Enter), terminal sẽ khởi động lại chế độ hiển thị sạch.</td></tr>\n          <tr><td>File log bị đứng yên không in log mới dù app đang chạy</td><td>Dùng <code>tail -f</code> (thường) và tệp log vừa bị <code>logrotate</code> đổi tên sang file nén.</td><td>Đổi sang dùng <code>tail -F</code> (hoa) để tự động bắt file mới.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Cảnh giác với tệp log chứa mã độc (Terminal Injection):</strong> Đọc log người dùng nhập bằng <code>cat</code> có thể kích hoạt các mã escape độc hại làm đổi tiêu đề terminal hoặc thực thi lệnh ẩn. Luôn dùng <code>less</code> để xem an toàn.</li>\n        <li><strong>Không để lại file swap rác của Vim trên production:</strong> Khi Vim bị tắt đột ngột, nó để lại tệp ẩn <code>.filename.swp</code>. Hãy kiểm tra bằng <code>ls -a</code> và xóa file <code>.swp</code> sau khi đã khôi phục xong để tránh thông báo cảnh báo 'Swap file already exists'.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Vim Adventures:</strong> <a href=\"https://vim-adventures.com/\" target=\"_blank\" rel=\"noopener\">Interactive Vim Game</a> — Trò chơi trực quan luyện phản xạ phím bấm Vim.</li>\n      <li><strong>GNU Coreutils manual:</strong> <a href=\"https://www.gnu.org/software/coreutils/manual/\" target=\"_blank\" rel=\"noopener\">Official GNU Text Utilities</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Phím Tắt Sống Còn của Vim",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Phím bấm (ở Normal Mode)</th><th>Hành động thực thi</th></tr></thead>\n        <tbody>\n          <tr><td><code>i</code></td><td>Chuyển sang Insert Mode để gõ nội dung văn bản</td></tr>\n          <tr><td><code>Esc</code></td><td>Quay trở lại Normal Mode từ bất kỳ chế độ nào</td></tr>\n          <tr><td><code>:w</code> / <code>:wq</code></td><td>Lưu tệp / Lưu tệp và thoát ra terminal</td></tr>\n          <tr><td><code>:q!</code></td><td>Thoát ngay lập tức và hủy bỏ mọi thay đổi chưa lưu</td></tr>\n          <tr><td><code>dd</code> / <code>u</code></td><td>Xóa cả dòng hiện tại / Undo (hoàn tác thao tác vừa làm)</td></tr>\n          <tr><td><code>/&lt;từ_khóa&gt;</code></td><td>Tìm kiếm từ khóa trong file (nhấn <code>n</code> để sang kết quả kế tiếp)</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố: Phiên SSH bị treo cứng do lệnh cat và mất dấu vết sự cố vì tail -f",
        "content": "<p>Trong một đợt cao điểm khuyến mãi, khách hàng báo lỗi thanh toán đơn hàng. Hai kỹ sư mới vào ca cùng xử lý sự cố và liên tiếp gặp lỗi vận hành dòng lệnh:</p><ol><li><strong>Triệu chứng 1:</strong> Kỹ sư A đăng nhập vào server và gõ <code>cat /var/log/nginx/access.log</code> (file log nặng 18GB). Ngay lập tức, cửa sổ SSH của kỹ sư A bị đơ hoàn toàn, bàn phím không nhận phím <code>Ctrl+C</code>, CPU client tăng vọt do phải vẽ hàng triệu ký tự.</li><li><strong>Triệu chứng 2:</strong> Kỹ sư B mở một phiên SSH khác và gõ <code>tail -f /var/log/nginx/error.log</code> để canh lỗi. Sau nửa đêm, dịch vụ vẫn báo lỗi nhưng terminal của kỹ sư B hoàn toàn không xuất hiện thêm dòng log nào.</li><li><strong>Chẩn đoán:</strong> (1) Với Kỹ sư A: <code>cat</code> cố gắng đọc tuần tự 18GB từ đĩa và đẩy qua kết nối mạng SSH làm tắc nghẽn hoàn toàn đường truyền. (2) Với Kỹ sư B: Đúng 00:00, dịch vụ <code>logrotate</code> của hệ điều hành đã xoay vòng file <code>error.log</code>. Lệnh <code>tail -f</code> vẫn giữ File Descriptor của file cũ (lúc này đã bị đổi tên và không còn tiến trình nào ghi vào).</li><li><strong>Khắc phục:</strong> (1) Đóng phiên SSH bị đơ của Kỹ sư A, kết nối lại và dùng lệnh <code>less /var/log/nginx/access.log</code>; bấm phím <code>G</code> để nhảy thẳng tới cuối file xem giao dịch gần nhất. (2) Chuyển lệnh của Kỹ sư B sang <code>tail -F /var/log/nginx/error.log</code> (F hoa) để tự động bám theo file mới sau khi xoay vòng.</li><li><strong>Phòng ngừa:</strong> Thiết lập quy định vận hành: Nghiêm cấm dùng <code>cat</code> trên mọi file trong <code>/var/log</code>; luôn dùng <code>less</code> để tra cứu tĩnh và dùng <code>tail -F</code> để giám sát thời gian thực.</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Kẹt trong trình soạn thảo Vim không biết cách thoát",
            "content": "Đây là trải nghiệm gây hoang mang hàng đầu cho người mới: gõ phím chữ thì máy phát tiếng kêu, bấm chuột không có tác dụng, bấm <code>Ctrl+C</code> hiện thông báo đỏ 'Type :quit<Enter> to exit Vim'. Cách thoát hiểm duy nhất: Bấm phím <code>Esc</code> 2 lần để chắc chắn về Normal Mode, gõ chính xác <code>:q!</code> và bấm <code>Enter</code>."
          },
          {
            "title": "Mở file log dung lượng nhiều GB bằng nano gây cạn kiệt RAM máy chủ",
            "content": "Khác với <code>less</code> chỉ đọc từng phần, <code>nano</code> sẽ nạp toàn bộ nội dung tệp vào bộ nhớ RAM trước khi hiển thị. Mở một file log 8GB trên một Cloud VPS chỉ có 2GB RAM sẽ kích hoạt cơ chế OOM Killer (Out Of Memory) của nhân Linux và tự động bắn hạ tiến trình nano hoặc dịch vụ database đang chạy!"
          }
        ],
        "tips": [
          {
            "title": "Tìm kiếm ngược từ dưới lên trên trong less bằng phím ?",
            "content": "Với file log, lỗi thường nằm ở cuối file. Sau khi mở <code>less /var/log/app.log</code> và bấm <code>G</code> xuống đáy, hãy gõ <code>?ERROR</code> rồi bấm Enter. Phím <code>?</code> sẽ tìm kiếm ngược từ dưới lên trên (ngược lại với phím <code>/</code> tìm kiếm xuôi)."
          },
          {
            "title": "Khôi phục terminal bị vỡ giao diện sau khi lỡ cat file binary",
            "content": "Nếu bạn lỡ tay <code>cat</code> một file nhị phân khiến chữ trên terminal bị biến thành các ký tự hình thoi kỳ dị, đừng vội tắt cửa sổ! Hãy gõ một cách mù quáng chữ: <code>reset</code> rồi bấm Enter. Hệ thống sẽ khởi tạo lại bảng mã hiển thị terminal sạch sẽ."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Xem đầu và đuôi tệp cấu hình tài khoản",
          "problem": "Hãy thực hiện các lệnh để: (1) In ra màn hình 3 dòng đầu tiên của tệp `/etc/passwd` và (2) In ra màn hình 4 dòng cuối cùng của tệp `/etc/group`.",
          "hint": "Sử dụng lệnh head -n và tail -n với số dòng tương ứng.",
          "solutionCode": "# 1. Xem 3 dòng đầu của /etc/passwd\nhead -n 3 /etc/passwd\n\n# 2. Xem 4 dòng cuối của /etc/group\ntail -n 4 /etc/group",
          "solutionOutput": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\n\nubuntu:x:1000:\n_ssh:x:110:\ndocker:x:1001:ubuntu\nnetdev:x:111:ubuntu",
          "explanation": "Lệnh head -n 3 trích xuất chính xác 3 dòng từ đầu tệp; tail -n 4 lấy 4 dòng từ đáy tệp. Đây là cách nhanh nhất để kiểm tra tài khoản hệ thống mới thêm vào.",
          "annotations": [
            {
              "part": "head -n 3",
              "text": "Chỉ đọc và xuất 3 dòng đầu tiên."
            },
            {
              "part": "tail -n 4",
              "text": "Chỉ đọc và xuất 4 dòng cuối cùng."
            }
          ],
          "rubric": [
            {
              "criterion": "Đúng công cụ xem file",
              "pass": "Sử dụng đúng less và tail -F cho log",
              "excellent": "Thực hiện tìm kiếm mượt mà với /keyword",
              "weight": "40%"
            },
            {
              "criterion": "Thao tác soạn thảo chuẩn",
              "pass": "Chỉnh sửa tệp bằng nano hoặc vim thành công",
              "excellent": "Thoát an toàn không để lại file swap rác",
              "weight": "30%"
            },
            {
              "criterion": "Hiểu cơ chế",
              "pass": "Giải thích được cơ chế hoạt động của tail -F và pager",
              "excellent": "Phân tích được rủi ro của cat trên file lớn",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Giám sát luồng log Nginx có lọc từ khóa lỗi thời gian thực",
          "problem": "Bạn đang chạy kiểm thử API trên máy chủ và muốn theo dõi trực tiếp các request bị lỗi mã HTTP 404 hoặc 500 từ tệp `/var/log/nginx/access.log`. Hãy viết câu lệnh kết hợp đường ống giữa `tail` và `grep` sao cho: (1) Bám đuôi tệp liên tục kể cả khi xoay vòng log, và (2) Chỉ in các dòng có chứa mã lỗi '404' hoặc '500'.",
          "hint": "Kết hợp tail -F với grep -E và sử dụng cờ lọc không đệm --line-buffered.",
          "solutionCode": "# Theo dõi log trực tiếp có lọc mã lỗi 404 và 500\ntail -F /var/log/nginx/access.log 2>/dev/null | grep --line-buffered -E ' (404|500) '",
          "solutionOutput": "192.168.1.10 - - [28/Oct/2024:10:30:15 +0000] \"GET /api/v1/missing HTTP/1.1\" 404 153\n192.168.1.55 - - [28/Oct/2024:10:30:18 +0000] \"POST /api/v1/checkout HTTP/1.1\" 500 248",
          "explanation": "Cờ tail -F đảm bảo phiên theo dõi không bị đứt đoạn khi logrotate xoay vòng file. Cờ --line-buffered của grep yêu cầu in kết quả ngay khi dòng xuất hiện mà không chờ lấp đầy bộ đệm buffer.",
          "annotations": [
            {
              "part": "tail -F",
              "text": "Theo dõi tệp nhật ký theo tên, tự động thử mở lại khi tệp bị xoay vòng."
            },
            {
              "part": "grep --line-buffered",
              "text": "Đẩy ngay dòng văn bản ra màn hình ngay khi khớp, không gây trễ hiển thị."
            }
          ],
          "rubric": [
            {
              "criterion": "Theo dõi log bền vững qua chu kỳ xoay vòng",
              "pass": "Sử dụng lệnh tail theo dõi tệp /var/log/nginx/access.log kết hợp đường ống grep",
              "excellent": "Dùng đúng cờ chữ hoa tail -F (thay vì -f) và bổ sung --line-buffered cho grep để log hiển thị tức thời",
              "weight": "55%"
            },
            {
              "criterion": "Biểu thức chính quy lọc mã trạng thái HTTP",
              "pass": "Lọc được các dòng chứa chuỗi 404 hoặc 500 bằng grep -E",
              "excellent": "Thêm khoảng trắng bao quanh mẫu ' (404|500) ' để tránh bắt nhầm kích thước byte hoặc ID đường dẫn URL có chứa số 404/500",
              "weight": "45%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Kịch bản Sinh tồn trong Vim: Chỉnh sửa cấu hình khẩn cấp",
          "problem": "Bạn đăng nhập vào một máy chủ chỉ có sẵn Vim và không có nano. Hãy mô tả trình tự các thao tác phím chuẩn xác nhất để thực hiện nhiệm vụ: (1) Mở file cấu hình `/tmp/config.py` và nhảy thẳng đến dòng có chuỗi `DEBUG = True`; (2) Đổi giá trị thành `DEBUG = False`; (3) Lưu thay đổi và thoát an toàn về terminal.",
          "hint": "Mở vim kèm cờ tìm kiếm +/ hoặc dùng phím / trong Normal Mode, sau đó dùng lệnh đổi chuỗi hoặc sang Insert Mode để sửa và lưu bằng :wq.",
          "solutionCode": "# Bước 1: Mở vim và nhảy thẳng tới vị trí chuỗi cần sửa\nvim +/\"DEBUG = True\" /tmp/config.py\n\n# Thao tác bàn phím trong Vim:\n# Nhấn 'ciw' trên chữ True để xóa chữ True và vào Insert mode\n# Gõ: False\n# Bấm phím: Esc (quay về Normal Mode)\n# Gõ: :wq và bấm Enter (Lưu và Thoát)",
          "solutionOutput": "[Vim mở file, con trỏ đặt ngay tại chữ DEBUG = True]\n[Sau khi gõ :wq, tệp được lưu và terminal quay lại bình thường]",
          "explanation": "Lệnh 'vim +/chuoi' là kỹ thuật chuyên nghiệp giúp mở file và định vị tức thì điểm cần sửa mà không mất công cuộn tìm. Thao tác 'ciw' (change inner word) hoặc chuyển Insert mode rồi bấm :wq hoàn tất việc chỉnh sửa an toàn trong vài giây.",
          "annotations": [
            {
              "part": "vim +/\"DEBUG = True\"",
              "text": "Mở tệp và tìm kiếm ngay lập tức vị trí khớp chuỗi chỉ định."
            },
            {
              "part": ":wq",
              "text": "Write & Quit: ghi dữ liệu xuống đĩa và thoát khỏi tiến trình Vim."
            }
          ],
          "rubric": [
            {
              "criterion": "Định vị nhanh dòng cấu hình mục tiêu",
              "pass": "Mở tệp bằng vim và dùng lệnh tìm kiếm /DEBUG = True để nhảy tới đúng vị trí",
              "excellent": "Kết hợp cờ khởi động nhanh vim +/\"DEBUG = True\" /tmp/config.py ngay từ dòng lệnh",
              "weight": "35%"
            },
            {
              "criterion": "Chuyển đổi chế độ và thao tác chỉnh sửa chuẩn xác",
              "pass": "Vào Insert mode sửa True thành False, nhấn Esc quay về Normal mode",
              "excellent": "Sử dụng thao tác biên tập từ nguyên tử ciw (change inner word) nhanh gọn không làm xô lệch khoảng trắng xung quanh",
              "weight": "35%"
            },
            {
              "criterion": "Lưu trữ và thoát an toàn",
              "pass": "Thực hiện đúng tổ hợp :wq (hoặc ZZ) để ghi xuống đĩa và thoát sạch về Shell",
              "excellent": "Nêu rõ phương án dự phòng :q! nếu phát hiện gõ nhầm cấu hình trong quá trình thao tác",
              "weight": "30%"
            }
          ]
        }
      ],
      "summary": [
        "Dùng `cat` cho tệp nhỏ cấu hình; dùng `less` làm tiêu chuẩn vàng cho tệp lớn để không bao giờ bị nghẽn RAM hay đơ terminal.",
        "Trích xuất nhanh bằng `head -n` (dòng đầu) và `tail -n` (dòng cuối) giúp tiết kiệm 95% thời gian tìm kiếm.",
        "Luôn dùng `tail -F` (F hoa) thay vì `tail -f` khi giám sát thời gian thực để chống mất dấu vết khi `logrotate` xoay vòng tệp nhật ký.",
        "Khắc cốt ghi tâm cơ chế 3 chế độ của Vim: bấm `Esc` để về Normal Mode, dùng `:wq` để lưu thoát và dùng `:q!` để thoát hiểm không lưu.",
        "Kiểm tra định dạng file bằng `file` trước khi mở và dùng `zcat`/`zless` để đọc trực tiếp file log nén `.gz` mà không cần giải nén ra đĩa."
      ],
      "generalInfo": {
        "duration": "45 phút",
        "targetAudience": "Lập trình viên, Kỹ sư Vận hành, DevOps",
        "prerequisites": "Đã hoàn thành Bài 1.4, biết thao tác tệp cơ bản",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2)",
        "materials": "Terminal, các tệp log mẫu trong `/var/log`"
      },
      "nextLessonPreview": "Trong bài tiếp theo (1.6), chúng ta sẽ bước vào chuyên đề Bảo mật Sống còn: Phân quyền Truy cập Cơ bản (`rwx`, `chmod`, `chown`, `chgrp`, `sudo`, `visudo`, `umask`) để làm chủ cơ chế kiểm soát đặc quyền máy chủ.",
      "quiz": [
        {
          "question": "Điểm khác biệt kỹ thuật quan trọng nhất giữa `tail -f` và `tail -F` khi giám sát tệp nhật ký sản xuất là gì?",
          "options": [
            "tail -F in chữ hoa, còn tail -f in chữ thường.",
            "tail -f bám theo số hiệu Inode của file cũ; khi logrotate đổi tên file, tail -f sẽ dừng in log mới. Trong khi đó, tail -F bám theo tên tệp và tự động mở lại file mới tạo.",
            "tail -f chỉ chạy được trên Ubuntu, tail -F chỉ chạy được trên CentOS.",
            "Hai lệnh này hoàn toàn giống nhau không có bất kỳ khác biệt nào."
          ],
          "correctIndex": 1,
          "explanation": "tail -F (chữ hoa) theo dõi theo Filename và tự động retry khi file bị đổi tên hoặc cắt xoay vòng bởi logrotate, rất cần thiết cho production monitoring."
        },
        {
          "question": "Khi bạn đang ở trong trình soạn thảo Vim và không biết làm cách nào để thoát ra ngoài mà không lưu các thay đổi sai lầm, tổ hợp phím nào là đúng?",
          "options": [
            "Ctrl + C rồi gõ exit",
            "Bấm Esc, gõ :q! rồi nhấn Enter",
            "Bấm Ctrl + Z rồi tắt máy tính",
            "Bấm Esc, gõ :write rồi nhấn Enter"
          ],
          "correctIndex": 1,
          "explanation": "Esc đưa Vim về Normal mode, :q! (quit with force) chỉ thị thoát ngay lập tức và từ chối ghi bất kỳ thay đổi nào vào đĩa."
        },
        {
          "question": "Tại sao không nên dùng lệnh `cat` để xem một file log có dung lượng 20GB?",
          "options": [
            "Vì cat sẽ ném toàn bộ dữ liệu ra terminal, làm cạn kiệt bộ nhớ đệm màn hình và làm tê liệt phiên làm việc terminal của bạn.",
            "Vì lệnh cat chỉ cho phép đọc file dưới 1MB.",
            "Vì lệnh cat sẽ tự động xóa file sau khi đọc xong.",
            "Vì lệnh cat yêu cầu quyền root tối cao mới đọc được."
          ],
          "correctIndex": 0,
          "explanation": "cat không có cơ chế phân trang; nó sẽ xả toàn bộ hàng triệu dòng text ra stdout khiến terminal bị đơ. Hãy dùng `less` hoặc `tail`."
        }
      ],
      "reflectionQuestion": "Một kỹ sư trực ca báo cáo: 'Tôi đang chạy lệnh `tail -f /var/log/nginx/access.log` để theo dõi lưu lượng truy cập, nhưng đúng nửa đêm 00:00 thì màn hình dừng hẳn không in thêm dòng nào nữa, mặc dù website vẫn đang có hàng ngàn khách truy cập bình thường'. Hãy giải thích hiện tượng này và đưa ra câu lệnh sửa lỗi.",
      "reflectionHint": "Gợi ý: Đúng 00:00 hàng ngày, dịch vụ `logrotate` kích hoạt: file `access.log` cũ được đổi tên thành `access.log.1` và một file rỗng mới được tạo ra. Lệnh `tail -f` (thường) bám theo Inode cũ nên bị kẹt ở file cũ đã ngừng ghi. Hãy đổi sang lệnh `tail -F /var/log/nginx/access.log` (F hoa) để tự động bám theo file mới."
    },
    {
      "id": "lx-1-06",
      "number": "1.6",
      "title": "Phân quyền Truy cập Cơ bản (`rwx`, `chmod`, `chown`, `chgrp`, `sudo`, `visudo`, `umask`)",
      "subtitle": "Giải mã ma trận bảo mật 3 nhóm quyền, cơ chế visudo và triệt tiêu lỗ hổng nguy hiểm từ sai lầm chmod 777",
      "level": "Cơ bản",
      "duration": "45 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ ý nghĩa của 3 loại quyền (`r`, `w`, `x`) áp dụng cho 3 đối tượng (`User`, `Group`, `Others`) và giá trị bát phân tương ứng (4, 2, 1).",
        "2. [Hiểu - Understand] Giải thích sự khác biệt cốt lõi của quyền thực thi (`x`) giữa File (chạy chương trình) và Thư mục (quyền mở cửa `cd` vào bên trong), cơ chế mặt nạ `umask`.",
        "3. [Vận dụng - Apply] Thực thi chuẩn xác các lệnh quản lý quyền và sở hữu: `chmod` (ký tự & bát phân), `chown`, `chgrp`, `sudo`, `visudo` để thiết lập an toàn cho thư mục dự án.",
        "4. [Phân tích - Analyze] Đánh giá lỗ hổng bảo mật nghiêm trọng của quyền 777 (`chmod -R 777`), chẩn đoán lỗi `Permission denied` và xử lý an toàn cấu hình sudoers."
      ],
      "intuition": {
        "title": "Tấm thẻ từ ra vào tòa nhà và 3 Ổ khóa Bảo mật (r-w-x)",
        "metaphor": "Hãy tưởng tượng mỗi tệp tin và thư mục trên Linux là một căn phòng bí mật được bảo vệ bởi 3 lớp khóa từ: Lớp 1 dành cho Chủ nhân (User/Owner); Lớp 2 dành cho Phòng ban nội bộ (Group); Lớp 3 dành cho Khách vãng lai ngoài đường (Others). Mỗi ổ khóa có 3 lẫy cơ học: Lẫy Đọc (Read - giá trị 4 điểm) cho phép nhìn vào trong phòng; Lẫy Ghi (Write - giá trị 2 điểm) cho phép sửa đổi hoặc xáo trộn đồ đạc; Lẫy Thực thi (eXecute - giá trị 1 điểm). Với một file chương trình, `x` cho phép chạy nó; nhưng với một Thư mục, `x` chính là 'chìa khóa mở cửa' — nếu không có quyền `x` trên thư mục, bạn nhìn thấy tên thư mục nhưng tuyệt đối không thể bước chân (lệnh `cd`) vào bên trong!",
        "boundary": "Quyền root (UID 0) là chìa khóa vạn năng vượt qua mọi rào cản rwx thông thường. Tuy nhiên, nếu file không có bất kỳ quyền `x` nào từ bất kỳ ai, ngay cả root cũng không thể thực thi file đó dưới dạng binary độc lập mà không dùng trình thông dịch.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🔒</span><span>CẤU TRÚC 9 KÝ TỰ QUYỀN HẠN</span><span class=\"lx-vs-tag\">Permissions String</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>3 ký tự đầu (User/Owner):</strong> Quyền của chính chủ sở hữu file.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>3 ký tự giữa (Group):</strong> Quyền của các thành viên trong nhóm sở hữu.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>3 ký tự cuối (Others):</strong> Quyền của toàn bộ những người dùng còn lại trên máy tính.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bát phân (Octal):</strong> <code>r=4</code>, <code>w=2</code>, <code>x=1</code>. Ví dụ: <code>rwxr-xr--</code> = <code>754</code>.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>📁</span><span>Ý NGHĨA QUYỀN TRÊN THƯ MỤC</span><span class=\"lx-vs-tag\">Directories Quirks</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Read (r):</strong> Được phép liệt kê danh sách tệp bên trong thư mục (lệnh <code>ls</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Write (w):</strong> Được phép tạo mới hoặc xóa tệp bên trong thư mục.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Execute (x):</strong> Được phép bước vào thư mục (lệnh <code>cd</code>) và truy cập Inode của các file con.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Ma trận Phân quyền & Quản trị Đặc quyền sudo",
          "content": "<p>Mô hình bảo mật đa người dùng (Multi-user Security) của Linux được xây dựng trên nền tảng quyền truy cập chuẩn POSIX. Hiểu đúng bản chất bát phân và umask giúp ngăn ngừa 90% nguy cơ rò rỉ dữ liệu máy chủ.</p>\n    <p><strong>Cơ chế tính toán umask:</strong> Khi một file hoặc thư mục được tạo ra:</p>\n    <ul>\n      <li>Quyền cơ sở tối đa của File là <code>666</code> (rw-rw-rw-) và Thư mục là <code>777</code> (rwxrwxrwx).</li>\n      <li>Với <code>umask 022</code> mặc định: File mới sẽ có quyền <code>666 - 022 = 644</code> (rw-r--r--); Thư mục mới có quyền <code>777 - 022 = 755</code> (rwxr-xr-x).</li>\n      <li>Với <code>umask 027</code> chuẩn bảo mật cao: File mới sẽ có quyền <code>640</code> (rw-r-----); người ngoài (others) hoàn toàn không có quyền đọc hay mở.</li>\n    </ul>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Cảnh báo bảo mật</th></tr></thead>\n    <tbody>\n      <tr><td><code>chmod</code></td><td>Thay đổi quyền truy cập tệp/thư mục</td><td><code>chmod &lt;mode&gt; &lt;đường_dẫn&gt;</code></td><td><code>chmod 750 /var/www/app</code></td><td>Dùng số bát phân (750, 644) hoặc ký tự (<code>u+x</code>, <code>go-w</code>).</td></tr>\n      <tr><td><code>chown</code></td><td>Thay đổi chủ sở hữu và nhóm sở hữu</td><td><code>chown &lt;user&gt;[:&lt;group&gt;] &lt;đường_dẫn&gt;</code></td><td><code>sudo chown -R deploy:www-data /var/www</code></td><td>Chỉ tài khoản root mới có quyền chuyển giao quyền sở hữu file cho người khác.</td></tr>\n      <tr><td><code>chgrp</code></td><td>Chỉ thay đổi nhóm sở hữu của tệp</td><td><code>chgrp &lt;group&gt; &lt;đường_dẫn&gt;</code></td><td><code>chgrp developers script.sh</code></td><td>User phải là thành viên của nhóm đích mới gán được.</td></tr>\n      <tr><td><code>umask</code></td><td>Xem hoặc đặt mặt nạ quyền mặc định</td><td><code>umask [giá_trị_bát_phân]</code></td><td><code>umask 027</code></td><td>Quyền tệp mới = 666 - umask; Thư mục mới = 777 - umask.</td></tr>\n      <tr><td><code>visudo</code></td><td>Chỉnh sửa tệp cấu hình đặc quyền /etc/sudoers</td><td><code>sudo visudo</code></td><td><code>sudo visudo -f /etc/sudoers.d/devops</code></td><td>Bắt buộc dùng visudo: tự kiểm tra cú pháp trước khi lưu, tránh khóa cứng quyền root.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Thiết lập phân quyền bảo mật và cấp quyền sudo an toàn",
              "lang": "Bash",
              "code": "# 1. Cấp quyền thực thi an toàn chỉ cho chủ sở hữu\nchmod u+x run_worker.sh\nls -l run_worker.sh\n\n# 2. Đổi chủ sở hữu cho dịch vụ web\nsudo chown deploy:www-data /var/www/my-app\n\n# 3. Phân quyền chuẩn FHS: Thư mục 750, Tệp mã nguồn 640\nsudo chmod 750 /var/www/my-app\nsudo chmod 640 /var/www/my-app/.env",
              "output": "-rwxr--r-- 1 devops devops 120 Oct 28 10:30 run_worker.sh\ndrwxr-x--- 2 deploy www-data 4096 Oct 28 10:31 /var/www/my-app\n-rw-r----- 1 deploy www-data  450 Oct 28 10:32 /var/www/my-app/.env",
              "annotations": [
                {
                  "line": 2,
                  "text": "chmod u+x: Chỉ thêm cờ execute cho User (chủ nhân), không mở cho group và others."
                },
                {
                  "line": 9,
                  "text": "chmod 640 .env: File chứa mật khẩu nhạy cảm chỉ chủ sở hữu được sửa, nhóm được đọc, cấm người ngoài."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-6-rwx-file-vs-dir",
          "title": "4.1 Khác biệt Sống còn của Quyền r, w, x trên File so với trên Thư mục",
          "content": "<p>Một trong những bẫy bảo mật gây bất ngờ nhất trong các kỳ thi chứng chỉ quốc tế (LPIC-1, RHCSA) là: <strong>Ý nghĩa của 3 bit quyền <code>r</code> (4), <code>w</code> (2), <code>x</code> (1) trên Thư mục hoàn toàn khác với trên Tệp tin thông thường!</strong></p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Bit Quyền</th><th>Ý nghĩa áp dụng trên Tệp tin (File)</th><th>Ý nghĩa áp dụng trên Thư mục (Directory)</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><strong><code>r</code> (Read = 4)</strong></td><td>Được đọc nội dung bên trong tệp (<code>cat</code>, <code>less</code>, <code>cp</code>)</td><td>Được liệt kê danh sách tên các tệp bên trong thư mục (<code>ls</code>)</td></tr>\n          <tr><td><strong><code>w</code> (Write = 2)</strong></td><td>Được sửa đổi hoặc xóa trắng nội dung bên trong tệp (<code>vim</code>, <code>&gt;</code>)</td><td><strong>Được tạo mới, đổi tên hoặc XÓA BỎ tệp bất kỳ nằm trong thư mục đó!</strong> (Cần đi kèm quyền <code>x</code>)</td></tr>\n          <tr><td><strong><code>x</code> (Execute = 1)</strong></td><td>Được Kernel nạp chạy như một chương trình hoặc script thực thi (<code>./app.sh</code>)</td><td><strong>Quyền đi xuyên qua (Traverse):</strong> Được phép <code>cd</code> vào thư mục và truy cập metadata Inode của tệp bên trong</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <p><strong>Hệ quả thực chiến cực kỳ quan trọng:</strong> Vì tên tệp nằm trong bảng Dentry của thư mục cha (chứ không nằm trong tệp), nếu một thư mục có quyền <code>777</code> (mọi người có quyền <code>w</code>+<code>x</code> trên thư mục), một người dùng thường có thể chạy <code>rm -f</code> xóa mất một tệp thuộc sở hữu của <code>root:root</code> có quyền khóa chặt <code>0400</code> nằm bên trong thư mục đó!</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Đọc hiểu chuỗi 10 ký tự phân quyền và kiểm chứng quyền x trên thư mục",
              "code": "# 1. Thiết lập thư mục dự án chuẩn: Chủ sở hữu toàn quyền (7), Nhóm vào đọc (5), Người ngoài cấm tuyệt đối (0)\nmkdir -p /tmp/perm_demo && chmod 750 /tmp/perm_demo\necho 'DB_PASS=secret123' > /tmp/perm_demo/.env && chmod 600 /tmp/perm_demo/.env\n\n# 2. Kiểm tra chuỗi ký hiệu chữ và số bát phân tương ứng bằng stat\nstat -c '%A (%a) %U:%G %n' /tmp/perm_demo /tmp/perm_demo/.env\nrm -rf /tmp/perm_demo",
              "output": "drwxr-x--- (750) devops:devops /tmp/perm_demo\n-rw------- (600) devops:devops /tmp/perm_demo/.env",
              "annotations": [
                {
                  "line": 2,
                  "part": "chmod 750",
                  "text": "drwxr-x---: User (rwx=7), Group (r-x=5: được cd vào và đọc danh sách nhưng cấm tạo/xóa file), Others (---=0: chặn đứng hoàn toàn)."
                },
                {
                  "line": 6,
                  "part": "stat -c '%A (%a)...'",
                  "text": "Định dạng tùy chỉnh của stat in song song cả ký hiệu chữ (%A) lẫn mã bát phân (%a) cực kỳ tường minh."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-6-octal-umask",
          "title": "4.2 Hệ Bát phân (Octal Mode), Ký hiệu Chữ (u/g/o) & Toán học Bitwise của umask",
          "content": "<p>Mỗi khi một tiến trình tạo tệp mới (syscall <code>open(..., O_CREAT, 0666)</code>) hoặc tạo thư mục mới (<code>mkdir(..., 0777)</code>), Kernel không áp thẳng quyền tối đa đó mà lọc qua mặt nạ <strong><code>umask</code> (User File-Creation Mode Mask)</strong> theo phép toán logic bitwise: <code>Quyền_Thực_Tế = Quyền_Gốc &amp; (~umask)</code>.</p>\n    <ul>\n      <li><strong>Vì sao tệp mới tạo không bao giờ tự có quyền thực thi <code>x</code>?</strong> Vì quyền cơ sở mặc định cho tệp văn bản/dữ liệu chỉ là <code>0666</code> (<code>rw-rw-rw-</code>). Đây là hàng rào an ninh tự nhiên ngăn chặn tệp tải từ mạng về tự biến thành mã thực thi độc hại. Muốn tệp chạy được, quản trị viên phải chủ động đóng dấu <code>chmod +x</code>.</li>\n      <li><strong>Khi nào dùng Số bát phân (<code>chmod 640</code>) vs Ký hiệu chữ (<code>chmod g+w,o-rwx</code>)?</strong> Số bát phân thiết lập lại tuyệt đối cả 3 nhóm cùng lúc (rất rõ ràng cho tệp đơn lẻ). Trong khi đó, ký hiệu chữ đặc biệt hữu dụng khi đệ quy trên cả cây thư mục lớn: ví dụ <code>chmod -R u=rwX,g=rX,o= /opt/app</code> (chữ <strong><code>X</code> viết hoa</strong> thông minh chỉ bật quyền thực thi cho các thư mục mà không làm hỏng các tệp cấu hình <code>.conf</code>/<code>.py</code> bên trong!).</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Thực nghiệm thay đổi umask 027 bảo mật cao trong phiên làm việc",
              "code": "# 1. Chạy trong subshell cô lập (...) để thử nghiệm umask 027 chuẩn CIS Benchmark\n(\n  umask 027\n  mkdir -p /tmp/umask_test/dir_a\n  touch /tmp/umask_test/file_a.txt\n  stat -c '%A (%a) %n' /tmp/umask_test/dir_a /tmp/umask_test/file_a.txt\n)\nrm -rf /tmp/umask_test",
              "output": "drwxr-x--- (750) /tmp/umask_test/dir_a\n-rw-r----- (640) /tmp/umask_test/file_a.txt",
              "annotations": [
                {
                  "line": 3,
                  "part": "umask 027",
                  "text": "Mặt nạ 027 tước quyền ghi (2) của Group và tước sạch mọi quyền rwx (7) của Others ngay từ lúc khai sinh tệp/thư mục."
                },
                {
                  "line": 6,
                  "part": "750 và 640",
                  "text": "Thư mục nhận 777 - 027 = 750; tệp nhận 666 - 027 = 640 (lưu ý phép toán thật sự là AND NOT theo từng bit)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-6-sudo-visudo",
          "title": "4.3 Kiến trúc Ủy quyền sudo, Rủi ro sudo su & Quy trình An toàn với visudo",
          "content": "<p>Trên máy chủ doanh nghiệp có nhiều kỹ sư cùng vận hành, chia sẻ chung mật khẩu tài khoản <code>root</code> là vi phạm nghiêm trọng tiêu chuẩn kiểm toán an ninh (ISO 27001, SOC2, PCI-DSS) vì không thể truy vết ai là người đã gõ lệnh xóa dữ liệu. Cơ chế <strong><code>sudo</code></strong> giải quyết triệt để bài toán này:</p>\n    <ul>\n      <li><strong>Xác thực bằng mật khẩu của chính người gõ &amp; Lưu vết toàn diện:</strong> Mỗi lệnh chạy qua <code>sudo</code> đều được ghi nhật ký chi tiết vào <code>/var/log/auth.log</code> (hoặc <code>journalctl -t sudo</code>) gồm: Tài khoản thực hiện, thiết bị TTY, thư mục đứng, tài khoản đích và toàn bộ chuỗi tham số lệnh.</li>\n      <li><strong>Cấm chỉnh sửa <code>/etc/sudoers</code> bằng <code>vim</code>/<code>nano</code> thường:</strong> Nếu bạn gõ sai một dấu phẩy trong <code>/etc/sudoers</code> và lưu trực tiếp, <code>sudo</code> lập tức vô hiệu hóa toàn bộ hệ thống khiến bạn tự khóa trái cửa quyền quản trị! Lệnh <strong><code>sudo visudo</code></strong> mở tệp trên bản nháp có khóa chống sửa đồng thời, kiểm tra cú pháp tự động khi đóng và từ chối ghi đè nếu phát hiện lỗi.</li>\n      <li><strong>Chuẩn mực Modular Drop-in (<code>/etc/sudoers.d/</code>):</strong> Thay vì sửa tệp gốc của OS, luôn tách cấu hình từng nhóm/nhân sự thành tệp riêng tại <code>/etc/sudoers.d/&lt;tên_quy_tắc&gt;</code> với quyền bắt buộc <code>0440</code> và kiểm định bằng <code>sudo visudo -cf &lt;file&gt;</code>.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra danh sách đặc quyền hiện tại và thẩm định cú pháp hệ thống sudoers",
              "code": "# 1. Liệt kê các quyền hạn sudo mà tài khoản hiện tại được cấp phép\nsudo -l\n\n# 2. Kiểm định tính hợp lệ cú pháp của toàn bộ /etc/sudoers và thư mục /etc/sudoers.d/\nsudo visudo -c",
              "output": "Matching Defaults entries for devops on prod-srv01:\n    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin\n\nUser devops may run the following commands on prod-srv01:\n    (ALL : ALL) ALL\n/etc/sudoers: parsed OK\n/etc/sudoers.d/README: parsed OK",
              "annotations": [
                {
                  "line": 2,
                  "part": "sudo -l",
                  "text": "Cho thấy cả cơ chế bảo mật secure_path (sudo tự ép lại biến PATH sạch để chống kẻ gian cài mã độc trùng tên lệnh hệ thống)."
                },
                {
                  "line": 5,
                  "part": "visudo -c",
                  "text": "Chế độ check-only (-c) quét toàn bộ cấu hình và xác nhận 'parsed OK' với mã thoát 0, rất lý tưởng cho CI/CD hoặc Ansible."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Phân quyền thư mục triển khai ứng dụng Python và khắc phục lỗi Permission denied.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Tạo user dịch vụ không đặc quyền: <code>sudo useradd -r -s /usr/sbin/nologin pyrunner</code>.</li>\n        <li><strong>Bước 2:</strong> Gán quyền sở hữu thư mục app: <code>sudo chown -R pyrunner:pyrunner /opt/pyapp</code>.</li>\n        <li><strong>Bước 3:</strong> Dùng <code>sudo -u pyrunner ls -la /opt/pyapp</code> để thẩm tra quyền thực tế dưới danh tính user đó.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Thói Quen Cực Kỳ Độc Hại: chmod 777</div>\n          <p>Chạy lệnh <code>chmod -R 777 /var/www/app</code> khi gặp lỗi không ghi được file.</p>\n          <p><strong>Hiểm họa:</strong> Mở toang cửa cho bất kỳ ai trên máy chủ (kể cả hacker khai thác qua tiến trình bị xâm nhập) quyền sửa đổi, chèn webshell, xóa sạch dữ liệu sản xuất.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Xử Lý Chuẩn Kỹ Thuật Bảo Mật</div>\n          <p>Xác định đúng nhóm người dùng và chỉ cấp quyền ghi cho nhóm đó:</p>\n          <p><code>sudo chown -R www-data:www-data /var/www/app/storage && sudo chmod -R 775 /var/www/app/storage</code></p>\n          <p><strong>Ưu điểm:</strong> Đúng người đúng việc, tuân thủ nguyên tắc Least Privilege.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Thiết lập Phân quyền Bảo mật Dự án & Cấu hình sudoers",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.6</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Phân quyền bảo vệ tệp bí mật <code>.env</code>, cấu hình phân quyền cho nhóm lập trình viên và thiết lập quyền sudo không cần mật khẩu cho 1 lệnh an toàn.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Máy ảo Linux, quyền sudo, thư mục <code>/opt/secure-app</code>.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Tạo thư mục dự án và file cấu hình: <code>sudo mkdir -p /opt/secure-app && sudo touch /opt/secure-app/.env</code>.</li>\n        <li><strong>Bước 2:</strong> Thiết lập quyền chỉ cho root đọc/ghi: <code>sudo chmod 600 /opt/secure-app/.env</code>.</li>\n        <li><strong>Bước 3:</strong> Thử đọc file bằng tài khoản thường: <code>cat /opt/secure-app/.env</code> &rarr; Xác nhận nhận lỗi <code>Permission denied</code>.</li>\n        <li><strong>Bước 4:</strong> Dùng <code>sudo visudo -f /etc/sudoers.d/mylab</code> để cấu hình cho user chạy lệnh <code>systemctl restart nginx</code> mà không cần nhập mật khẩu.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">ls -l /opt/secure-app/.env\n-> -rw------- 1 root root 0 Oct 28 10:35 /opt/secure-app/.env (Quyền 600 bảo vệ tối đa).</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Tạo một thư mục có quyền <code>chmod 644 mydir</code> (thiếu cờ <code>x</code>). Thử gõ <code>cd mydir</code> và quan sát lỗi của hệ điều hành.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> TUYỆT ĐỐI KHÔNG DÙNG <code>nano /etc/sudoers</code>. Luôn sử dụng lệnh <code>sudo visudo</code> để sửa tệp sudoers; nếu viết sai một dấu phẩy trong sudoers, bạn sẽ bị khóa vĩnh viễn quyền sudo trên toàn bộ máy chủ!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>Permission denied</code> khi chạy file script <code>./deploy.sh</code></td><td>Tệp script chưa được gắn cờ thực thi (Execute bit <code>x</code>).</td><td>Thêm cờ thực thi cho chủ sở hữu: <code>chmod +x deploy.sh</code> hoặc chạy qua trình thông dịch: <code>bash deploy.sh</code>.</td></tr>\n          <tr><td><code>Permission denied</code> khi gõ lệnh <code>cd /data/folder</code></td><td>Thư mục đích thiếu quyền thực thi <code>x</code> đối với tài khoản đang đăng nhập.</td><td>Cấp quyền thực thi cho thư mục: <code>chmod +x /data/folder</code> (trên thư mục, quyền x có nghĩa là quyền tra cứu/bước vào).</td></tr>\n          <tr><td>Khóa quyền sudo do lỗi cú pháp trong <code>/etc/sudoers</code></td><td>Sửa tay tệp sudoers mà không qua trình kiểm tra <code>visudo</code>.</td><td>Khởi động lại máy ảo vào chế độ cứu hộ Recovery Mode (root shell) và chạy lệnh <code>visudo -c</code> để sửa lỗi cú pháp.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Quy tắc vàng phân quyền Web Server:</strong> Mã nguồn và tệp tĩnh: <code>chmod 644</code> cho file và <code>chmod 755</code> cho thư mục. Tệp cấu hình nhạy cảm chứa DB Password (.env): <code>chmod 600</code> hoặc <code>640</code>. Thư mục upload tạm: <code>chmod 775</code> thuộc nhóm <code>www-data</code>.</li>\n        <li><strong>Không bao giờ gán quyền sudo ALL không cần mật khẩu (NOPASSWD: ALL):</strong> Chỉ cấp NOPASSWD cho các câu lệnh script cụ thể được kiểm duyệt chặt chẽ.</li>\n        <li><strong>Thiết lập umask 027 cho tài khoản sản xuất:</strong> Thêm <code>umask 027</code> vào <code>/etc/profile</code> hoặc <code>~/.bashrc</code> của user ứng dụng để mặc định mọi file tạo ra đều không bị lộ cho người ngoài.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Linux Permissions Standard:</strong> <a href=\"https://wiki.archlinux.org/title/File_permissions_and_attributes\" target=\"_blank\" rel=\"noopener\">ArchWiki File Permissions and Attributes</a>.</li>\n      <li><strong>Sudoers Manual:</strong> <code>man 5 sudoers</code> — Tài liệu chính thức về cú pháp chỉ thị trong /etc/sudoers.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Tính Nhanh Bát Phân (Octal Permission Matrix)",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Giá trị số</th><th>Ký hiệu</th><th>Quyền tương ứng</th><th>Ý nghĩa thực tế</th></tr></thead>\n        <tbody>\n          <tr><td><code>7</code></td><td><code>rwx</code></td><td>Đọc + Ghi + Thực thi</td><td>Toàn quyền (Dành cho chủ sở hữu thư mục).</td></tr>\n          <tr><td><code>6</code></td><td><code>rw-</code></td><td>Đọc + Ghi</td><td>Đọc và sửa nội dung (Dành cho tệp mã nguồn của owner).</td></tr>\n          <tr><td><code>5</code></td><td><code>r-x</code></td><td>Đọc + Thực thi</td><td>Đọc và chạy chương trình / Đọc và mở thư mục con.</td></tr>\n          <tr><td><code>4</code></td><td><code>r--</code></td><td>Chỉ đọc (Read-only)</td><td>Chỉ xem nội dung, không được sửa hay chạy.</td></tr>\n          <tr><td><code>0</code></td><td><code>---</code></td><td>Không có quyền nào</td><td>Bị khóa hoàn toàn, không thể đọc, ghi hay thực thi.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố: Lỗi Nginx 403 Forbidden và Hậu quả Nghiêm trọng khi sửa bừa bằng chmod 777",
        "content": "<p>Một lập trình viên triển khai website tĩnh lên đường dẫn <code>/var/www/mysite</code>. Khi mở trình duyệt truy cập website, Nginx lập tức trả về lỗi: <code>403 Forbidden - Access Denied</code>.</p><ol><li><strong>Triệu chứng:</strong> File <code>/var/www/mysite/index.html</code> có tồn tại nhưng trình duyệt báo 403 Forbidden. File log Nginx ghi nhận: <code>open() \"/var/www/mysite/index.html\" failed (13: Permission denied)</code>.</li><li><strong>Chẩn đoán:</strong> Kiểm tra phân quyền: <code>ls -ld /var/www/mysite</code>. Phát hiện thư mục cha có quyền <code>drw-r--r--</code> (thiếu cờ thực thi <code>x</code> đối với nhóm others/www-data). Dù file <code>index.html</code> bên trong có quyền đọc, tiến trình Nginx (chạy bằng user <code>www-data</code>) không thể bước chân qua cánh cửa thư mục cha để chạm tới file.</li><li><strong>Hành vi sai lầm:</strong> Lập trình viên nóng vội chạy lệnh: <code>sudo chmod 777 -R /var/www/mysite</code>. Lỗi 403 biến mất, nhưng 2 ngày sau máy chủ bị hacker lợi dụng lỗ hổng form upload để ghi đè file nhị phân độc hại vào thẳng thư mục gốc web.</li><li><strong>Khắc phục chuẩn:</strong> Khôi phục lại quyền an toàn chuẩn: (1) Cấp quyền <code>755</code> cho thư mục cha và <code>644</code> cho file web: <code>sudo chmod 755 /var/www/mysite && sudo chmod 644 /var/www/mysite/index.html</code>, (2) Chuyển quyền sở hữu cho người dùng dịch vụ: <code>sudo chown -R www-data:www-data /var/www/mysite</code>.</li><li><strong>Phòng ngừa:</strong> Khắc sâu nguyên lý: Lỗi 403 phần lớn do THIẾU QUYỀN <code>x</code> TRÊN THƯ MỤC CHA; giải quyết đúng gốc rễ bằng <code>chmod 755</code>, tuyệt đối không bao giờ dùng <code>777</code> trên máy chủ thật.</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Ngộ nhận có quyền ghi (w) trên file là có thể xóa file",
            "content": "Đây là ngộ nhận kỹ thuật tinh vi! Quyền XÓA hoặc ĐỔI TÊN một file không phụ thuộc vào quyền của chính file đó, mà phụ thuộc hoàn toàn vào QUYỀN GHI (w) CỦA THƯ MỤC MẸ chứa nó! Dù file có quyền <code>-r--r--r--</code> (chỉ đọc), nhưng nếu thư mục mẹ có quyền ghi <code>w</code>, bất kỳ ai cũng có thể xóa phăng file đó bằng lệnh <code>rm -f</code>."
          },
          {
            "title": "Sửa trực tiếp file /etc/sudoers bằng trình soạn thảo thường",
            "content": "Nếu bạn dùng lệnh <code>sudo nano /etc/sudoers</code> hoặc <code>sudo vim /etc/sudoers</code> và gõ nhầm cú pháp (ví dụ thiếu dấu hai chấm), bạn sẽ không thể chạy lại lệnh <code>sudo</code> để sửa sai nữa! Bạn sẽ bị kẹt vĩnh viễn bên ngoài quyền quản trị và phải khởi động lại máy ảo vào chế độ cứu hộ Recovery Mode. Luôn dùng <code>sudo visudo</code>!"
          }
        ],
        "tips": [
          {
            "title": "Thiết lập cấu hình sudo riêng biệt trong /etc/sudoers.d/",
            "content": "Thay vì can thiệp vào file gốc <code>/etc/sudoers</code>, hãy tạo một file riêng trong thư mục <code>/etc/sudoers.d/99-devops</code> bằng lệnh <code>sudo visudo -f /etc/sudoers.d/99-devops</code>. Cách này giúp bạn quản lý phân quyền theo từng dự án mà không lo xung đột khi nâng cấp hệ điều hành."
          },
          {
            "title": "Công thức nhẩm nhanh quyền bát phân chuẩn",
            "content": "Quy tắc 3 số kinh điển của Kỹ sư Linux: <code>755</code> cho thư mục và script (ai cũng vào được, chỉ chủ nhân sửa); <code>644</code> cho tài liệu văn bản công khai (ai cũng đọc được, chỉ chủ nhân sửa); <code>600</code> cho bí mật bảo mật (chỉ chủ nhân đọc sửa, cấm tiệt tất cả mọi người khác)."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Tính toán và chuyển đổi ma trận quyền Bát phân sang Ký hiệu chữ",
          "problem": "Hãy tính toán giá trị bát phân và viết chuỗi quyền ký hiệu chữ (dạng 9 ký tự rwx) tương ứng cho 2 trường hợp sau: (1) Chủ sở hữu có toàn quyền (rwx), nhóm chỉ có quyền đọc và chạy (r-x), người khác không có bất kỳ quyền nào; (2) File bí mật chỉ có chủ sở hữu đọc và ghi (rw-), nhóm và người khác không có quyền.",
          "hint": "Cộng trọng số r=4, w=2, x=1 cho từng nhóm User, Group, Others.",
          "solutionCode": "# Trường hợp 1: User rwx (4+2+1=7), Group r-x (4+0+1=5), Others --- (0+0+0=0)\n# Mã bát phân: 750 | Chuỗi ký hiệu: rwxr-x---\n\n# Trường hợp 2: User rw- (4+2+0=6), Group --- (0), Others --- (0)\n# Mã bát phân: 600 | Chuỗi ký hiệu: rw-------",
          "solutionOutput": "750 -> rwxr-x---\n600 -> rw-------",
          "explanation": "Quy đổi trọng số: Nhóm 1 có User=7, Group=5, Others=0 tạo thành mã chmod 750. Nhóm 2 có User=6, Group=0, Others=0 tạo thành mã chmod 600 thường dùng cho SSH Private Key.",
          "annotations": [
            {
              "part": "750",
              "text": "Thường dùng cho các thư mục nội bộ dự án chỉ chia sẻ trong team dev."
            },
            {
              "part": "600",
              "text": "Bắt buộc cho các tệp nhạy cảm như ~/.ssh/id_ed25519."
            }
          ],
          "rubric": [
            {
              "criterion": "Đúng cú pháp phân quyền",
              "pass": "Sử dụng đúng chmod 600 và chown",
              "excellent": "Cấu hình sudoers chính xác bằng visudo",
              "weight": "40%"
            },
            {
              "criterion": "Kết quả an toàn tuyệt đối",
              "pass": "File nhạy cảm được bảo vệ, user khác bị chặn",
              "excellent": "Không xảy ra lỗi khóa quyền sudo",
              "weight": "30%"
            },
            {
              "criterion": "Hiểu cơ chế bảo mật",
              "pass": "Giải thích được cơ chế bát phân và umask",
              "excellent": "Phân tích được rủi ro của chmod 777",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Chẩn đoán và khắc phục lỗi Permission Denied cho Web Server",
          "problem": "Một ứng dụng Python ghi log vào thư mục `/var/log/my-app/app.log`. File log thuộc sở hữu của user `root:root` với quyền `644`. Tiến trình ứng dụng chạy dưới quyền user không đặc quyền `devops`. Hãy viết các lệnh để: (1) Bàn giao quyền sở hữu file log và thư mục chứa nó cho user `devops`; (2) Thiết lập quyền sao cho user `devops` có thể ghi log, nhưng nhóm và người khác chỉ có quyền đọc.",
          "hint": "Dùng lệnh sudo chown để đổi owner:group và chmod 644/755 tương ứng.",
          "solutionCode": "# 1. Bàn giao quyền sở hữu thư mục và file cho user devops\nsudo chown -R devops:devops /var/log/my-app\n\n# 2. Thiết lập quyền chuẩn cho thư mục (755) và file log (644)\nsudo chmod 755 /var/log/my-app\nsudo chmod 644 /var/log/my-app/app.log\n\n# 3. Kiểm tra lại kết quả sau khi sửa\nls -ld /var/log/my-app /var/log/my-app/app.log",
          "solutionOutput": "drwxr-xr-x 2 devops devops 4096 Oct 28 10:45 /var/log/my-app\n-rw-r--r-- 1 devops devops    0 Oct 28 10:45 /var/log/my-app/app.log",
          "explanation": "Sau khi đổi quyền sở hữu bằng chown, tiến trình chạy dưới tài khoản devops trở thành Owner của file và có quyền ghi (w trong rw-). Thư mục mẹ có quyền 755 đảm bảo devops có thể tạo thêm file log xoay vòng.",
          "annotations": [
            {
              "part": "chown -R devops:devops",
              "text": "Đổi đồng thời cả user sở hữu và group sở hữu thành devops."
            },
            {
              "part": "chmod 644",
              "text": "Cấp quyền ghi cho owner devops, ngăn chặn người khác sửa file log."
            }
          ],
          "rubric": [
            {
              "criterion": "Chuyển giao quyền sở hữu đúng chủ thể dịch vụ",
              "pass": "Sử dụng sudo chown devops:devops cho thư mục /var/log/my-app và tệp app.log",
              "excellent": "Sử dụng cờ đệ quy chown -R devops:devops /var/log/my-app kết hợp kiểm tra kết quả sau sửa bằng ls -ld",
              "weight": "50%"
            },
            {
              "criterion": "Thiết lập ma trận quyền hợp lý cho Thư mục và Tệp log",
              "pass": "Đặt đúng quyền 644 (rw-r--r--) cho tệp app.log để chủ sở hữu ghi và người khác chỉ đọc",
              "excellent": "Phân biệt rõ thư mục cha cần quyền 755 (bắt buộc có bit x để tiến trình đi xuyên qua mở file bên trong)",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Cấu hình sudoers an toàn và kiểm tra cú pháp tự động",
          "problem": "Bạn cần cấp quyền cho lập trình viên `developer1` chỉ được phép khởi động lại dịch vụ Nginx bằng lệnh `sudo systemctl restart nginx` mà không được phép chạy bất kỳ lệnh root nào khác và không cần hỏi mật khẩu. Hãy viết dòng chỉ thị cấu hình chuẩn xác và câu lệnh kiểm tra tính toàn vẹn cú pháp trước khi áp dụng.",
          "hint": "Cú pháp sudoers: username HOST=(RUNAS) NOPASSWD: /path/to/command và kiểm tra bằng visudo -c.",
          "solutionCode": "# 1. Tạo file cấu hình an toàn trong thư mục /etc/sudoers.d/\necho 'developer1 ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx' | sudo tee /etc/sudoers.d/developer1-nginx\n\n# 2. Thiết lập quyền nghiêm ngặt 440 cho file sudoers theo chuẩn an toàn bắt buộc\nsudo chmod 0440 /etc/sudoers.d/developer1-nginx\n\n# 3. Kiểm tra tính toàn vẹn cú pháp của toàn bộ hệ thống sudoers\nsudo visudo -c",
          "solutionOutput": "/etc/sudoers.d/developer1-nginx: parsed OK\n/etc/sudoers: parsed OK",
          "explanation": "Chỉ định rõ đường dẫn tuyệt đối /usr/bin/systemctl restart nginx ngăn chặn developer1 leo quyền chạy các lệnh nguy hiểm khác. Cấp quyền 0440 là yêu cầu bắt buộc của sudoers; nếu file có quyền ghi tự do, hệ thống sudo sẽ từ chối nạp file vì lý do an ninh.",
          "annotations": [
            {
              "part": "NOPASSWD: /usr/bin/systemctl ...",
              "text": "Nguyên tắc đặc quyền tối thiểu: chỉ mở đúng 1 hành vi restart Nginx, không mở shell root."
            },
            {
              "part": "chmod 0440",
              "text": "Quy tắc bảo mật khắt khe: file cấu hình sudoers bắt buộc phải ở chế độ chỉ đọc (Read-only: 440)."
            }
          ],
          "rubric": [
            {
              "criterion": "Cú pháp chỉ thị Ủy quyền Tối thiểu (Least Privilege)",
              "pass": "Viết đúng cấu trúc developer1 ALL=(ALL) NOPASSWD: kèm lệnh khởi động lại nginx",
              "excellent": "Chỉ định đường dẫn tuyệt đối đầy đủ /usr/bin/systemctl restart nginx (sudoers từ chối lệnh không có đường dẫn tuyệt đối) và tách tệp riêng trong /etc/sudoers.d/",
              "weight": "45%"
            },
            {
              "criterion": "Khóa quyền tệp cấu hình và Kiểm định cú pháp tự động",
              "pass": "Chạy lệnh kiểm tra cú pháp sudo visudo -c để đảm bảo không làm hỏng hệ thống sudo",
              "excellent": "Thiết lập nghiêm ngặt chmod 0440 trên tệp cấu hình trong /etc/sudoers.d/ theo đúng quy chuẩn an ninh của sudo",
              "weight": "55%"
            }
          ]
        }
      ],
      "summary": [
        "Chuỗi quyền 10 ký tự phân định rõ ràng 3 cấp độ: Chủ sở hữu (User), Nhóm quản lý (Group) và Người ngoài (Others).",
        "Quyền `rwx` trên Thư mục khác biệt sâu sắc với File: quyền `x` trên thư mục là điều kiện tiên quyết để được `cd` vào trong và truy cập tệp con.",
        "Tuyệt đối không dùng `chmod 777`: luôn tuân thủ chuẩn `755` cho thư mục, `644` cho file dữ liệu và `600` cho tài liệu bí mật.",
        "Dùng `chown` để bàn giao quyền sở hữu tệp cho đúng người dùng dịch vụ (`www-data`, `postgres`).",
        "Luôn dùng `visudo` khi sửa đổi quyền quản trị sudo để cơ chế kiểm tra cú pháp bảo vệ bạn khỏi thảm họa tự khóa mình khỏi máy chủ."
      ],
      "generalInfo": {
        "duration": "50 phút",
        "targetAudience": "Lập trình viên, Kỹ sư Hệ thống, DevOps, Security",
        "prerequisites": "Đã hoàn thành Bài 1.4 và 1.5, nắm vững cấu trúc cây thư mục FHS",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo với quyền sudo)",
        "materials": "Terminal, quyền sudo, tài khoản user phụ để thử nghiệm phân quyền"
      },
      "nextLessonPreview": "Trong bài tiếp theo (1.7), chúng ta sẽ làm chủ Trình Quản lý Gói (apt, dnf, pacman): Bảng Đối chiếu 3 Họ Distro & Chuẩn PEP 668 để cài đặt môi trường phát triển Python an toàn không phá vỡ hệ thống.",
      "quiz": [
        {
          "question": "Một thư mục có quyền `drwxr--r--` (chỉ có User có quyền x, Group và Others chỉ có quyền r). Một người dùng thuộc Others có thể dùng lệnh `cd` để bước vào thư mục này không?",
          "options": [
            "Có thể, vì người dùng đó có quyền đọc (r).",
            "Không thể, vì trên thư mục, quyền thực thi (x) là điều kiện bắt buộc để hệ điều hành cho phép mở cửa (traverse/cd) vào bên trong.",
            "Có thể, nếu người dùng đó biết đường dẫn tuyệt đối.",
            "Có thể, nếu thư mục đó không chứa file ẩn."
          ],
          "correctIndex": 1,
          "explanation": "Quyền 'x' trên thư mục đại diện cho quyền duyệt qua (traversal). Thiếu quyền 'x', người dùng không thể cd vào thư mục dù có quyền 'r'."
        },
        {
          "question": "Với giá trị `umask 027`, một tệp tin thông thường (không phải thư mục) khi vừa được tạo mới bằng lệnh `touch` sẽ có quyền hạn bát phân là bao nhiêu?",
          "options": [
            "640 (-rw-r-----)",
            "750 (-rwxr-x---)",
            "644 (-rw-r--r--)",
            "666 (-rw-rw-rw-)"
          ],
          "correctIndex": 0,
          "explanation": "Quyền cơ sở của file là 666 (rw-rw-rw-). Khi áp dụng umask 027: 666 AND (NOT 027) = 640 (rw-r-----)."
        },
        {
          "question": "Tại sao quản trị viên luôn bắt buộc phải sử dụng lệnh `sudo visudo` khi sửa cấu hình phân quyền thay vì mở trực tiếp bằng `nano /etc/sudoers`?",
          "options": [
            "Vì nano không hỗ trợ mở file hệ thống.",
            "Vì visudo tự động khóa file chống xung đột đồng thời và kiểm tra cú pháp (syntax check) trước khi ghi; nếu có lỗi cú pháp, nó ngăn lưu file để tránh làm mất quyền sudo toàn bộ hệ thống.",
            "Vì visudo tự động mã hóa mật khẩu người dùng.",
            "Vì lệnh nano chỉ dùng được cho lập trình viên Python."
          ],
          "correctIndex": 1,
          "explanation": "visudo là công cụ an toàn tối thượng: nó kiểm tra cú pháp nghiêm ngặt trước khi ghi đè để bảo vệ bạn khỏi thảm họa mất quyền sudo."
        }
      ],
      "reflectionQuestion": "Một lập trình viên triển khai ứng dụng web PHP/Python và gặp lỗi không tải được ảnh đại diện lên thư mục `/var/www/uploads`. Kỹ sư này khắc phục bằng lệnh `sudo chmod -R 777 /var/www/uploads` và tự hào vì hệ thống đã chạy tốt. Dưới góc độ Kỹ sư Bảo mật (DevSecOps), hãy phân tích 2 rủi ro nghiêm trọng của giải pháp trên và đưa ra phương án xử lý chuẩn mực.",
      "reflectionHint": "Gợi ý: (1) Quyền 777 cho phép bất kỳ tiến trình nào trên máy chủ (kể cả tiến trình bị tấn công) ghi đè hoặc thực thi mã độc. Kẻ tấn công có thể upload file webshell `.php` hoặc script bash rồi kích hoạt thực thi để chiếm quyền kiểm soát máy chủ; (2) Phương án chuẩn mực: Chỉ cấp quyền sở hữu thư mục uploads cho user dịch vụ web (`chown -R www-data:www-data /var/www/uploads`) và phân quyền `chmod 750` hoặc `770` (kết hợp chặn thực thi script trong web server configuration)."
    },
    {
      "id": "lx-1-07",
      "number": "1.7",
      "title": "Trình Quản lý Gói (apt, dnf, pacman): Bảng Đối chiếu 3 Họ Distro & Chuẩn PEP 668",
      "subtitle": "Làm chủ cài đặt phần mềm trên 3 hệ sinh thái Linux lớn nhất và bảo vệ môi trường Python hệ thống",
      "level": "Cơ bản",
      "duration": "45 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Liệt kê và đối chiếu các câu lệnh quản lý gói tương đương trên 3 họ Distro: Debian/Ubuntu (`apt`), RHEL/Rocky (`dnf`), Arch Linux (`pacman`).",
        "2. [Hiểu - Understand] Giải thích bản chất chuẩn PEP 668 (`externally-managed-environment`) và lý do các bản phân phối Linux hiện đại chặn đứng `pip install` ở cấp toàn hệ thống.",
        "3. [Vận dụng - Apply] Thực thi quy trình chuẩn: cập nhật kho gói, cài đặt gói hệ điều hành, khởi tạo môi trường ảo Python cô lập (`python3 -m venv`) và cài đặt thư viện an toàn.",
        "4. [Phân tích - Analyze] Đánh giá hậu quả của cờ phá hoại `--break-system-packages`, xử lý sự cố kẹt khóa cơ sở dữ liệu khóa gói (`dpkg lock-frontend`) khi tiến trình khác đang chạy."
      ],
      "intuition": {
        "title": "Cửa hàng Dược phẩm Quốc gia (Apt/Dnf) vs Người bán thảo mộc rong (Pip Global)",
        "metaphor": "Hãy tưởng tượng hệ điều hành Linux của bạn là một cơ thể người hoàn chỉnh. Trình quản lý gói của hệ điều hành (`apt`, `dnf`, `pacman`) giống như 'Cơ quan Quản lý Dược phẩm Quốc gia': mỗi viên thuốc (gói phần mềm) đưa vào cơ thể đều được kiểm tra tính tương thích nghiêm ngặt, đảm bảo không có phản ứng phụ làm tê liệt hệ thần kinh (các dịch vụ hệ thống). Lệnh `pip install` cấp toàn hệ thống (Global) giống như việc bạn mua thuốc rong từ người bán dạo về uống: thư viện Python mới có thể vô tình ghi đè lên thư viện `urllib3` hay `requests` mà chính công cụ hệ thống `apt` hoặc tường lửa `ufw` đang phụ thuộc, làm 'gãy vụn' hệ điều hành. Chuẩn PEP 668 sinh ra như một tấm khiên cảnh báo: 'Hãy uống thuốc riêng trong phòng cách ly ảo (Virtualenv), không được tiêm trực tiếp vào mạch máu toàn hệ thống!'.",
        "boundary": "Môi trường ảo `venv` cô lập các gói Python ứng dụng, nhưng nếu ứng dụng cần các thư viện biên dịch C (như `libpq-dev` cho PostgreSQL hoặc `gcc`), bạn vẫn bắt buộc phải dùng trình quản lý gói của OS (`apt`) để cài đặt các thư viện hệ thống này trước.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📦</span><span>BẢNG ĐỐI CHIẾU 3 HỌ DISTRO</span><span class=\"lx-vs-tag\">Package Managers</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Debian/Ubuntu:</strong> <code>apt update</code>, <code>apt install &lt;pkg&gt;</code>, <code>apt remove &lt;pkg&gt;</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>RHEL/Rocky:</strong> <code>dnf check-update</code>, <code>dnf install &lt;pkg&gt;</code>, <code>dnf remove &lt;pkg&gt;</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Arch Linux:</strong> <code>pacman -Syu</code>, <code>pacman -S &lt;pkg&gt;</code>, <code>pacman -R &lt;pkg&gt;</code>.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🐍</span><span>CHUẨN BẢO MẬT PEP 668</span><span class=\"lx-vs-tag\">Python Isolation</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Nguyên nhân:</strong> Ngăn pip ghi đè các gói Python hệ thống trong <code>/usr/lib/python3/dist-packages/</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Giải pháp chuẩn mực:</strong> <code>python3 -m venv .venv && source .venv/bin/activate</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Cấm tuyệt đối:</strong> Dùng <code>sudo pip install</code> hoặc <code>--break-system-packages</code> trên server sản xuất.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Đối chiếu Quản lý Gói & Chuẩn PEP 668",
          "content": "<p>Mỗi họ bản phân phối Linux xây dựng một hệ thống quản lý gói tối ưu riêng cho đối tượng người dùng của mình. Hiểu được bảng đối chiếu giúp kỹ sư làm việc linh hoạt trên bất kỳ máy chủ nào.</p>\n    <p><strong>Giải mã cảnh báo PEP 668 (externally-managed-environment):</strong> Trên Ubuntu 23.04+, Debian 12+, Fedora 38+, khi bạn gõ <code>pip install requests</code>, hệ thống lập tức chặn lại kèm thông báo lỗi. Đây không phải là lỗi hỏng, mà là một tính năng bảo vệ hệ thống của Python Software Foundation và các nhà phát hành Linux:</p>\n    <ul>\n      <li>Các công cụ hệ thống của Linux (như <code>software-properties-common</code>, <code>ufw</code>) được viết bằng Python và dựa vào các thư viện cụ thể trong <code>/usr/lib/python3/dist-packages/</code>.</li>\n      <li>Nếu bạn dùng <code>pip install</code> nâng cấp một thư viện lên bản mới nhất, các công cụ hệ điều hành có thể sụp đổ ngay lập tức do không tương thích ngược (API breaking change).</li>\n    </ul>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Thao tác Quản lý Gói</th><th>Họ Debian / Ubuntu</th><th>Họ RHEL / Rocky / Fedora</th><th>Họ Arch Linux</th><th>Mục đích Kỹ thuật</th></tr></thead>\n    <tbody>\n      <tr><td>Cập nhật chỉ mục kho gói</td><td><code>sudo apt update</code></td><td><code>sudo dnf check-update</code></td><td><code>sudo pacman -Sy</code></td><td>Tải danh sách phiên bản gói mới nhất về RAM/Disk cục bộ.</td></tr>\n      <tr><td>Cài đặt gói mới</td><td><code>sudo apt install -y &lt;pkg&gt;</code></td><td><code>sudo dnf install -y &lt;pkg&gt;</code></td><td><code>sudo pacman -S &lt;pkg&gt;</code></td><td>Tải file binary, giải nén và cấu hình dịch vụ tự động.</td></tr>\n      <tr><td>Gỡ bỏ gói phần mềm</td><td><code>sudo apt remove &lt;pkg&gt;</code></td><td><code>sudo dnf remove &lt;pkg&gt;</code></td><td><code>sudo pacman -R &lt;pkg&gt;</code></td><td>Gỡ bỏ binary nhưng giữ lại tệp cấu hình người dùng.</td></tr>\n      <tr><td>Gỡ triệt để kèm file cấu hình</td><td><code>sudo apt purge &lt;pkg&gt;</code></td><td>(Tự động với dnf)</td><td><code>sudo pacman -Rns &lt;pkg&gt;</code></td><td>Dọn sạch hoàn toàn không để lại vết tệp cấu hình cũ.</td></tr>\n      <tr><td>Tìm kiếm gói trong kho</td><td><code>apt search &lt;từ_khóa&gt;</code></td><td><code>dnf search &lt;từ_khóa&gt;</code></td><td><code>pacman -Ss &lt;từ_khóa&gt;</code></td><td>Tra cứu tên chính xác của gói trước khi quyết định cài.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Quy trình thiết lập môi trường Python chuẩn mực không vi phạm PEP 668",
              "lang": "Bash",
              "code": "# 1. Cài đặt công cụ tạo môi trường ảo từ kho gói hệ thống\nsudo apt update && sudo apt install -y python3-venv python3-pip\n\n# 2. Tạo môi trường ảo riêng biệt cho dự án tại thư mục làm việc\npython3 -m venv ~/my-project/.venv\n\n# 3. Kích hoạt môi trường ảo và cài đặt thư viện tự do an toàn\nsource ~/my-project/.venv/bin/activate\npip install fastapi uvicorn",
              "output": "Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease\nReading package lists... Done\nBuilding dependency tree... Done\nInstalling collected packages: fastapi, uvicorn\nSuccessfully installed fastapi-0.115.0 uvicorn-0.31.0",
              "annotations": [
                {
                  "line": 2,
                  "text": "Cài đặt python3-venv từ apt: cung cấp module chuẩn để tạo venv."
                },
                {
                  "line": 5,
                  "text": "python3 -m venv: Khởi tạo môi trường cô lập, chứa binary python và thư mục site-packages riêng."
                },
                {
                  "line": 8,
                  "text": "source activate: Thay đổi biến $PATH ưu tiên trỏ vào .venv/bin, pip chạy hoàn toàn an toàn."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-7-repo-gpg-trust",
          "title": "4.1 Kiến trúc Kho Gói (Repository), Chữ ký Số GPG & Giải quyết Phụ thuộc Tự động",
          "content": "<p>Trước khi có các trình quản lý gói bậc cao như <code>apt</code>, <code>dnf</code> hay <code>pacman</code>, quản trị viên phải tải thủ công từng tệp nhị phân rời (<code>.deb</code> hoặc <code>.rpm</code>) và tự giải quyết cơn ác mộng mang tên <strong>\"Dependency Hell\"</strong> (Gói A đòi thư viện B phiên bản &ge; 2.4, thư viện B lại đòi thư viện C...). Hệ thống quản lý gói hiện đại giải quyết bài toán này qua 2 tầng kiến trúc:</p>\n    <ul>\n      <li><strong>Tầng Hạ tầng Cài đặt Cục bộ (<code>dpkg</code> trên Debian/Ubuntu, <code>rpm</code> trên RHEL):</strong> Trực tiếp bung nén tệp gói vào cây thư mục FHS, lưu cơ sở dữ liệu danh sách mọi tệp thuộc về gói nào tại <code>/var/lib/dpkg/</code> (hoặc <code>/var/lib/rpm/</code>) và chạy script cấu hình hậu cài đặt. Tuy nhiên tầng này <em>không</em> biết tự tải gói qua mạng.</li>\n      <li><strong>Tầng Điều phối Kho Mạng &amp; Đồ thị Phụ thuộc (<code>apt</code>, <code>dnf</code>, <code>pacman</code>):</strong> Đọc danh sách kho máy chủ gương (Mirrors) cấu hình tại <code>/etc/apt/sources.list.d/</code> (hoặc <code>/etc/yum.repos.d/</code>), xây dựng đồ thị phụ thuộc có hướng (DAG) để tải đồng loạt mọi thư viện cần thiết, đồng thời <strong>kiểm tra chữ ký mật mã GPG</strong> (lưu tại <code>/etc/apt/keyrings/</code>) nhằm đảm bảo gói phần mềm không bị tin tặc đánh tráo trên đường truyền!</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Tra cứu nguồn gốc kho gói, phiên bản ứng viên và truy ngược tệp thuộc về gói nào",
              "code": "# 1. Kiểm tra phiên bản đang cài và kho cung cấp của gói curl bằng apt-cache policy\napt-cache policy curl\n\n# 2. Truy tìm xem một tệp thực thi bất kỳ trên đĩa do gói phần mềm nào sinh ra\ndpkg -S /usr/bin/ss",
              "output": "curl:\n  Installed: 8.5.0-2ubuntu10.4\n  Candidate: 8.5.0-2ubuntu10.4\n  Version table:\n *** 8.5.0-2ubuntu10.4 500\n        500 http://archive.ubuntu.com/ubuntu noble-updates/main amd64 Packages\n        500 http://security.ubuntu.com/ubuntu noble-security/main amd64 Packages\niproute2: /usr/bin/ss",
              "annotations": [
                {
                  "line": 2,
                  "part": "apt-cache policy",
                  "text": "Cho biết rõ gói đã cài hay chưa, phiên bản mới nhất trên kho (Candidate) và tải từ kho bảo mật chính thống nào."
                },
                {
                  "line": 5,
                  "part": "dpkg -S /usr/bin/ss",
                  "text": "Cực kỳ hữu ích khi bạn thấy lệnh 'ss' trên máy mẫu và muốn biết cần cài gói tên gì ('iproute2') trên máy mới (trên RHEL dùng: rpm -qf /usr/sbin/ss)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-7-pkg-lifecycle",
          "title": "4.2 Vòng đời Quản trị Gói trên 3 Họ Distro: Cài đặt, Nâng cấp, Gỡ sạch & Dọn Cache",
          "content": "<p>Trên máy chủ vận hành dài hạn, việc cài và gỡ phần mềm không đúng quy trình sẽ để lại hàng trăm tệp cấu hình rác (trạng thái <code>rc</code> trong <code>dpkg -l</code>) và làm đầy phân vùng <code>/var/cache</code>. Dưới đây là những nguyên tắc vàng khi thao tác vòng đời gói:</p>\n    <ul>\n      <li><strong>Luôn làm mới chỉ mục trước khi cài (<code>apt update</code>):</strong> Trên container mới khởi tạo hoặc VM vừa cài đặt, bộ nhớ chỉ mục cục bộ <code>/var/lib/apt/lists/</code> thường trống rỗng. Gõ thẳng <code>apt install</code> mà quên <code>apt update</code> sẽ gặp ngay lỗi <code>Unable to locate package</code>.</li>\n      <li><strong>Phân biệt rạch ròi <code>remove</code> và <code>purge</code>:</strong> Lệnh <code>apt remove nginx</code> chỉ xóa tệp thực thi nhị phân nhưng cố tình <em>giữ lại toàn bộ tệp cấu hình</em> trong <code>/etc/nginx</code> để phòng trường hợp bạn cài lại sau. Nếu cấu hình đó đang bị viết sai cú pháp và bạn muốn xóa trắng làm lại từ đầu, bắt buộc phải dùng <code>apt purge nginx nginx-common</code>.</li>\n      <li><strong>Thu dọn thư viện mồ côi &amp; kho lưu trữ tạm:</strong> Kết hợp định kỳ <code>sudo apt autoremove -y</code> (gỡ các gói phụ thuộc tự động cài theo trước kia nay không còn ai dùng) và <code>sudo apt clean</code> (dọn sạch các tệp <code>.deb</code> lưu tạm trong <code>/var/cache/apt/archives/</code>).</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra thông tin gói chi tiết và rà soát dung lượng bộ đệm gói đã tải",
              "code": "# 1. Xem mô tả chức năng, dung lượng giải nén và danh sách phụ thuộc trước khi cài\napt show htop 2>/dev/null | grep -E '^(Package|Version|Installed-Size|Depends|Description):'\n\n# 2. Kiểm tra dung lượng bộ nhớ đệm apt hiện tại trên ổ đĩa\ndu -sh /var/cache/apt/archives/",
              "output": "Package: htop\nVersion: 3.3.0-4build1\nInstalled-Size: 432 kB\nDepends: libc6 (>= 2.38), libncursesw6 (>= 6), libnl-3-200 (>= 3.2.7), libnl-genl-3-200 (>= 3.2.7), libtinfo6 (>= 6)\nDescription: interactive processes viewer\n84M\t/var/cache/apt/archives/",
              "annotations": [
                {
                  "line": 2,
                  "part": "apt show",
                  "text": "Thói quen chuyên nghiệp: kiểm tra Installed-Size và Depends trước khi quyết định cài gói lạ lên server sản xuất."
                },
                {
                  "line": 5,
                  "part": "/var/cache/apt/archives/",
                  "text": "Khi xây dựng Dockerfile, các kỹ sư luôn chạy 'apt-get clean && rm -rf /var/lib/apt/lists/*' để giảm hàng trăm MB kích thước image."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-7-pep668-venv",
          "title": "4.3 Bản chất Chuẩn PEP 668 (EXTERNALLY-MANAGED) & Cô lập Môi trường Python venv",
          "content": "<p>Trên các bản phân phối Linux thế hệ mới (Ubuntu 24.04, Debian 12, Fedora 38+, Arch), nhà phát hành đặt tệp đánh dấu <code>/usr/lib/python3.*/EXTERNALLY-MANAGED</code> theo đặc tả <strong>PEP 668</strong>. Nhờ đó, hành động nguy hiểm <code>pip install</code> hay <code>sudo pip install</code> vào Python toàn cục lập tức bị chặn lại trước khi kịp phá hỏng các công cụ sống còn của hệ điều hành (như <code>cloud-init</code>, <code>ufw</code>, <code>netplan</code>, <code>dnf</code>).</p>\n    <p><strong>Ma trận 3 phương pháp cài thư viện/công cụ Python chuẩn mực trên Linux hiện đại:</strong></p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Nhu cầu thực tế</th><th>Công cụ Chuẩn mực</th><th>Ví dụ thực thi an toàn</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><strong>Thư viện cho dự án phần mềm riêng</strong> (FastAPI, Pandas, PyTorch)</td><td><code>python3 -m venv</code> (hoặc <code>uv venv</code>)</td><td><code>python3 -m venv .venv &amp;&amp; .venv/bin/pip install fastapi</code></td></tr>\n          <tr><td><strong>Công cụ CLI độc lập viết bằng Python</strong> (Ansible, Black, Poetry, HTTPie)</td><td><code>pipx</code> (tự tạo venv riêng cho từng CLI rồi nối vào <code>~/.local/bin</code>)</td><td><code>sudo apt install pipx &amp;&amp; pipx install httpie</code></td></tr>\n          <tr><td><strong>Thư viện Python cấp hệ thống phục vụ script OS</strong></td><td>Trình quản lý gói của Distro (<code>apt</code> / <code>dnf</code>)</td><td><code>sudo apt install python3-requests python3-yaml</code></td></tr>\n        </tbody>\n      </table>\n    </div>\n    <p><em>Cảnh báo đỏ:</em> Tuyệt đối <strong>không bao giờ</strong> dùng cờ <code>--break-system-packages</code> trên máy chủ trừ bên trong container dùng một lần (ephemeral Docker container)!</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Chứng minh cơ chế cô lập đường dẫn của Virtualenv khi kích hoạt",
              "code": "# 1. Quan sát tệp đánh dấu chuẩn PEP 668 của hệ điều hành\nls -l /usr/lib/python3.*/EXTERNALLY-MANAGED 2>/dev/null | head -n 1\n\n# 2. Khởi tạo môi trường ảo .venv và đối chiếu đường dẫn which python3 trước/sau khi kích hoạt\npython3 -m venv /tmp/pep668_demo\necho \"System Python: $(which python3)\"\nsource /tmp/pep668_demo/bin/activate && echo \"Venv Python:   $(which python3)\" && deactivate\nrm -rf /tmp/pep668_demo",
              "output": "-rw-r--r-- 1 root root 648 Apr 10 12:00 /usr/lib/python3.12/EXTERNALLY-MANAGED\nSystem Python: /usr/bin/python3\nVenv Python:   /tmp/pep668_demo/bin/python3",
              "annotations": [
                {
                  "line": 2,
                  "part": "EXTERNALLY-MANAGED",
                  "text": "Sự hiện diện của tệp này báo cho pip biết khu vực /usr/lib/python3.x thuộc quyền quản lý độc quyền của dpkg/apt."
                },
                {
                  "line": 7,
                  "part": "source .../activate",
                  "text": "Thao tác activate thực chất chèn thư mục /tmp/pep668_demo/bin lên đầu biến $PATH, hướng mọi lệnh python3 và pip vào không gian cô lập."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Tiếp nhận cảnh báo lỗi PEP 668 và triển khai quy trình khắc phục chuẩn mực.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Trình diễn lỗi khi gõ <code>pip install flask</code> ở cấp hệ thống.</li>\n        <li><strong>Bước 2:</strong> Tạo thư mục dự án và khởi tạo môi trường ảo: <code>python3 -m venv .venv</code>.</li>\n        <li><strong>Bước 3:</strong> Kích hoạt <code>source .venv/bin/activate</code> và chạy lại <code>pip install flask</code> thành công rực rỡ.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lệnh Cực Kỳ Nguy Hiểm Trên Server</div>\n          <p>Dùng cờ ép buộc: <code>pip install flask --break-system-packages</code> hoặc dùng <code>sudo pip install flask</code>.</p>\n          <p><strong>Hậu quả:</strong> Ghi đè trực tiếp vào tệp hệ điều hành. Khi chạy <code>apt upgrade</code> trong tương lai, hệ thống sẽ gặp lỗi xung đột tệp không thể giải quyết.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Quy Trình Chuẩn Mực Doanh Nghiệp</div>\n          <p>Sử dụng Virtual Environment hoặc công cụ quản lý container/pipx:</p>\n          <p><code>python3 -m venv .venv && source .venv/bin/activate && pip install flask</code></p>\n          <p><strong>Ưu điểm:</strong> Cô lập hoàn toàn, dễ dàng đóng gói <code>requirements.txt</code>, không chạm vào hệ điều hành.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Quản lý Gói Đa Nền tảng & Thiết lập Môi trường Python",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.7</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Cập nhật kho gói hệ điều hành, cài đặt gói tiện ích mạng và thiết lập môi trường ảo Python hoàn chỉnh cho ứng dụng API.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Máy ảo Linux có kết nối mạng Internet, tài khoản có quyền sudo.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Cập nhật chỉ mục kho gói: <code>sudo apt update</code>.</li>\n        <li><strong>Bước 2:</strong> Cài đặt tiện ích giám sát mạng <code>net-tools</code> và <code>curl</code>: <code>sudo apt install -y net-tools curl</code>.</li>\n        <li><strong>Bước 3:</strong> Khởi tạo thư mục lab: <code>mkdir -p ~/pylab && cd ~/pylab</code>.</li>\n        <li><strong>Bước 4:</strong> Tạo và kích hoạt môi trường ảo: <code>python3 -m venv .venv && source .venv/bin/activate</code>.</li>\n        <li><strong>Bước 5:</strong> Cài đặt thư viện kiểm tra: <code>pip install requests && python3 -c \"import requests; print(requests.__version__)\"</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">which python3\n-> /home/.../pylab/.venv/bin/python3 (Đang trỏ chính xác vào môi trường ảo cô lập).</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Xuất danh sách thư viện đã cài ra tệp <code>requirements.txt</code> bằng lệnh <code>pip freeze > requirements.txt</code> và kiểm tra nội dung.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không xóa tệp <code>/usr/lib/python3.*/EXTERNALLY-MANAGED</code> để tắt cảnh báo PEP 668. Tệp này là chốt chặn bảo vệ tính toàn vẹn của máy chủ Linux.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>E: Could not get lock /var/lib/dpkg/lock-frontend</code></td><td>Có tiến trình cập nhật tự động chạy ngầm (như <code>unattended-upgrades</code>) hoặc cửa sổ apt khác đang chạy.</td><td>Kiểm tra tiến trình đang giữ khóa: <code>sudo lsof /var/lib/dpkg/lock-frontend</code>. Chờ tiến trình chạy xong hoặc kill tiến trình nếu bị treo.</td></tr>\n          <tr><td><code>error: externally-managed-environment</code></td><td>Cố gắng chạy <code>pip install</code> ngoài môi trường ảo trên các bản phân phối tuân thủ chuẩn PEP 668.</td><td>Khởi tạo virtualenv bằng <code>python3 -m venv .venv</code>, kích hoạt bằng <code>source .venv/bin/activate</code> rồi chạy lại pip.</td></tr>\n          <tr><td><code>Unable to locate package &lt;name&gt;</code></td><td>Chưa chạy <code>apt update</code> sau khi thêm repo mới hoặc gõ sai tên gói phần mềm.</td><td>Chạy <code>sudo apt update</code> và dùng <code>apt search &lt;từ_khóa&gt;</code> để tìm tên gói chính xác.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Luôn chạy <code>apt update</code> trước khi <code>apt install</code>:</strong> Danh sách địa chỉ tải gói trên CDN có thể thay đổi; update giúp tránh lỗi tải 404 Not Found.</li>\n        <li><strong>Dọn sạch bộ đệm gói định kỳ:</strong> Chạy <code>sudo apt clean && sudo apt autoremove -y</code> để thu hồi hàng gigabyte tệp cài đặt <code>.deb</code> đã tải về trong <code>/var/cache/apt/archives/</code>.</li>\n        <li><strong>Cô lập từng ứng dụng bằng virtualenv riêng:</strong> Không bao giờ dùng chung một virtualenv cho nhiều dự án khác nhau để tránh xung đột phiên bản phụ thuộc (Dependency Hell).</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Chuẩn PEP 668:</strong> <a href=\"https://peps.python.org/pep-0668/\" target=\"_blank\" rel=\"noopener\">PEP 668 – Marking Python base environments as “externally managed”</a>.</li>\n      <li><strong>Debian Package Management:</strong> <a href=\"https://www.debian.org/doc/manuals/debian-reference/ch02.en.html\" target=\"_blank\" rel=\"noopener\">Debian Reference Chapter 2: Package Management</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Cheat Sheet Đối chiếu Lệnh Quản lý Gói 3 Họ Distro",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tác vụ Vận hành</th><th>Ubuntu/Debian (apt)</th><th>RHEL/Rocky (dnf)</th><th>Arch Linux (pacman)</th></tr></thead>\n        <tbody>\n          <tr><td>Cập nhật toàn bộ OS</td><td><code>sudo apt update && sudo apt upgrade -y</code></td><td><code>sudo dnf upgrade -y</code></td><td><code>sudo pacman -Syu</code></td></tr>\n          <tr><td>Xóa gói tự sinh không dùng</td><td><code>sudo apt autoremove -y</code></td><td><code>sudo dnf autoremove -y</code></td><td><code>sudo pacman -Rns $(pacman -Qtdq)</code></td></tr>\n          <tr><td>Xem thông tin chi tiết gói</td><td><code>apt show &lt;pkg&gt;</code></td><td><code>dnf info &lt;pkg&gt;</code></td><td><code>pacman -Si &lt;pkg&gt;</code></td></tr>\n          <tr><td>Kiểm tra file thuộc về gói nào</td><td><code>dpkg -S /path/to/file</code></td><td><code>rpm -qf /path/to/file</code></td><td><code>pacman -Qo /path/to/file</code></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố: Máy chủ sập lệnh quản lý gói apt sau khi chạy sudo pip install --break-system-packages",
        "content": "<p>Một lập trình viên cần phiên bản mới nhất của thư viện `requests` để gọi API. Khi bị chuẩn PEP 668 chặn, lập trình viên đã tìm trên mạng và gõ lệnh: <code>sudo pip install --break-system-packages requests</code>. Ba ngày sau, toàn bộ lệnh <code>apt</code> và <code>cloud-init</code> trên server báo lỗi Python traceback và không thể cài đặt bất kỳ phần mềm nào.</p><ol><li><strong>Triệu chứng:</strong> Gõ <code>sudo apt update</code> hoặc <code>sudo apt install</code> báo lỗi: <code>ImportError: cannot import name 'urllib3' from 'requests'</code>. Các dịch vụ hệ thống phụ thuộc Python không thể khởi động.</li><li><strong>Chẩn đoán:</strong> Lệnh <code>pip</code> với cờ <code>--break-system-packages</code> đã chèn đè phiên bản <code>requests</code> mới vào <code>/usr/local/lib/python3.12/dist-packages/</code>. Khi <code>apt</code> gọi module hệ thống, Python ưu tiên nạp thư viện mới trong <code>/usr/local</code> vốn không tương thích với phiên bản <code>urllib3</code> do hệ điều hành Debian/Ubuntu đóng gói.</li><li><strong>Nguyên nhân gốc rễ:</strong> Phá vỡ ranh giới cô lập giữa Trình quản lý gói hệ điều hành (APT) và Trình quản lý gói ngôn ngữ (PIP).</li><li><strong>Khắc phục:</strong> (1) Xóa bỏ các gói cài đè độc hại khỏi <code>/usr/local/lib/python3.*/dist-packages/</code>, (2) Chạy <code>sudo apt install --reinstall python3-requests python3-urllib3</code> để khôi phục các gói chuẩn của hệ điều hành.</li><li><strong>Phòng ngừa:</strong> Tuyệt đối không bao giờ dùng cờ <code>--break-system-packages</code> trên máy chủ thật; luôn cô lập dự án bằng <code>python3 -m venv</code>.</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Lạm dụng cờ --break-system-packages",
            "content": "Cờ <code>--break-system-packages</code> được đặt tên có chủ ý là 'phá hoại gói hệ thống' để cảnh báo lập trình viên. Chỉ dùng cờ này trong các container Docker dùng một lần (Disposable containers) được xây dựng cho mục đích duy nhất, tuyệt đối không bao giờ gõ trên máy chủ sản xuất hoặc máy tính cá nhân."
          },
          {
            "title": "Chạy pacman -Sy trên Arch Linux gây lỗi vỡ hệ thống",
            "content": "Đây là cạm bẫy kinh điển nhất của người mới dùng Arch. Lệnh <code>pacman -Sy package</code> chỉ cập nhật chỉ mục kho gói mà không nâng cấp các thư viện đang chạy. Nếu gói mới đòi hỏi thư viện glibc mới hơn, các phần mềm cũ trên máy sẽ lập tức bị đổ vỡ liên kết động."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng pipx cho các công cụ dòng lệnh viết bằng Python",
            "content": "Nếu bạn muốn dùng các công cụ như <code>black</code> (format code), <code>ansible</code> hay <code>poetry</code>, hãy cài đặt qua <code>pipx</code>: <code>sudo apt install pipx && pipx install black</code>. Công cụ sẽ có mặt toàn hệ thống nhưng được cô lập trong môi trường ảo riêng biệt."
          },
          {
            "title": "Kiểm tra xem một file thuộc về gói phần mềm nào với dpkg -S",
            "content": "Khi thấy một file lạ trong hệ thống như <code>/etc/nginx/nginx.conf</code>, bạn có thể kiểm tra xem gói nào đã tạo ra nó bằng lệnh: <code>dpkg -S /etc/nginx/nginx.conf</code> (trên RHEL là <code>rpm -qf &lt;file&gt;</code>)."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Truy vấn thông tin gói phần mềm trước khi cài đặt",
          "problem": "Hãy viết các lệnh trên hệ thống Debian/Ubuntu để: (1) Cập nhật danh mục gói phần mềm từ kho lưu trữ; (2) Tìm kiếm các gói có chứa từ khóa 'htop'; (3) In ra thông tin chi tiết (mô tả, kích thước, phiên bản) của gói `htop` mà không thực hiện cài đặt nó.",
          "hint": "Sử dụng sudo apt update, apt search và apt show.",
          "solutionCode": "# 1. Cập nhật chỉ mục kho gói\nsudo apt update\n\n# 2. Tìm kiếm gói htop\napt search htop\n\n# 3. Xem thông tin chi tiết của gói htop\napt show htop",
          "solutionOutput": "Package: htop\nVersion: 3.3.0-4build1\nPriority: optional\nSection: utils\nInstalled-Size: 425 kB\nDescription: interactive processes viewer",
          "explanation": "Lệnh apt show truy vấn cơ sở dữ liệu metadata cục bộ vừa tải về từ apt update để hiển thị đầy đủ thông tin tóm tắt và kích thước chiếm dụng của gói.",
          "annotations": [
            {
              "part": "apt show htop",
              "text": "Kiểm tra phiên bản và mô tả của gói mà không cần quyền sudo."
            }
          ],
          "rubric": [
            {
              "criterion": "Đúng quy trình quản lý gói",
              "pass": "Chạy apt update trước khi install, cài đúng gói venv",
              "excellent": "Cài đặt chính xác không dùng cờ cưỡng ép nguy hiểm",
              "weight": "40%"
            },
            {
              "criterion": "Khởi tạo venv chuẩn xác",
              "pass": "Tạo và kích hoạt môi trường ảo thành công",
              "excellent": "Cài đặt thư viện qua pip trong venv chuẩn",
              "weight": "30%"
            },
            {
              "criterion": "Hiểu cơ chế PEP 668",
              "pass": "Giải thích được lý do chặn pip toàn hệ thống",
              "excellent": "Phân tích được cấu trúc phân cấp dist-packages vs site-packages",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Dọn dẹp triệt để gói phần mềm và tệp cấu hình thừa",
          "problem": "Bạn đã cài thử web server Nginx nhưng không dùng nữa. Hãy: (1) Gỡ bỏ hoàn toàn Nginx cùng TOÀN BỘ CÁC TỆP CẤU HÌNH trong `/etc/nginx`; (2) Tự động dọn dẹp các thư viện phụ thuộc mồ côi đi kèm Nginx; (3) Làm sạch bộ nhớ đệm cache các file `.deb` đã tải về để giải phóng dung lượng đĩa.",
          "hint": "Sử dụng lệnh apt purge, apt autoremove và apt clean.",
          "solutionCode": "# 1. Gỡ bỏ triệt để Nginx và xóa sạch tệp cấu hình liên quan\nsudo apt purge -y nginx nginx-common\n\n# 2. Dọn sạch các thư viện phụ thuộc mồ côi\nsudo apt autoremove -y\n\n# 3. Xóa sạch bộ đệm gói trong /var/cache/apt/archives/\nsudo apt clean",
          "solutionOutput": "Removing nginx-common (1.24.0-2ubuntu7.1) ...\nPurging configuration files for nginx-common ...\n0 upgraded, 0 newly installed, 0 to remove.",
          "explanation": "Lệnh 'apt remove' chỉ xóa file binary và giữ lại tệp cấu hình trong /etc. Lệnh 'apt purge' sẽ dọn sạch cả binary lẫn toàn bộ cấu hình, kết hợp autoremove và clean giúp hệ thống sạch sẽ nguyên bản.",
          "annotations": [
            {
              "part": "apt purge",
              "text": "Xóa triệt để cấu hình trong /etc, ngăn ngừa xung đột khi cài đặt lại sau này."
            },
            {
              "part": "apt clean",
              "text": "Xóa các tệp .deb lưu tạm trong cache để lấy lại dung lượng trống."
            }
          ],
          "rubric": [
            {
              "criterion": "Gỡ bỏ triệt để gói và tệp cấu hình (Purge)",
              "pass": "Sử dụng đúng sudo apt purge (thay vì apt remove) đối với gói nginx",
              "excellent": "Bao quát cả gói phụ thuộc cấu hình chung nginx-common và thêm cờ -y không chặn luồng tự động",
              "weight": "40%"
            },
            {
              "criterion": "Thu hồi thư viện mồ côi và giải phóng Cache đĩa",
              "pass": "Thực thi đầy đủ hai bước apt autoremove và apt clean",
              "excellent": "Giải thích rõ sự khác biệt: autoremove gỡ thư viện thừa khỏi hệ thống, còn clean xóa tệp nén .deb lưu tạm trong /var/cache/apt/archives/",
              "weight": "60%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Thiết lập Môi trường Dự án Python Cô lập Tuân thủ Chuẩn PEP 668",
          "problem": "Hãy viết chuỗi lệnh Bash hoàn chỉnh để triển khai một môi trường làm việc chuẩn cho dự án Python tại `/tmp/demo-api`: (1) Kiểm tra xem hệ thống có cài sẵn `python3-venv` hay chưa, nếu chưa thì tự cài đặt; (2) Tạo môi trường ảo mang tên `.venv`; (3) Kích hoạt môi trường ảo và nâng cấp `pip` lên bản mới nhất bên trong venv; (4) Cài đặt gói `fastapi`; (5) Xuất danh sách các gói đã cài vào file `requirements.txt`.",
          "hint": "Sử dụng dpkg -s kiểm tra gói, python3 -m venv, source .venv/bin/activate và pip freeze.",
          "solutionCode": "# 1. Tạo thư mục dự án và kiểm tra/cài đặt python3-venv\nmkdir -p /tmp/demo-api && cd /tmp/demo-api\ndpkg -s python3-venv >/dev/null 2>&1 || sudo apt install -y python3-venv\n\n# 2. Tạo môi trường ảo độc lập\npython3 -m venv .venv\n\n# 3. Kích hoạt môi trường ảo\nsource .venv/bin/activate\n\n# 4. Nâng cấp pip và cài đặt thư viện bên trong venv an toàn\npip install --upgrade pip\npip install fastapi\n\n# 5. Đóng băng danh sách gói phụ thuộc ra tệp requirements.txt\npip freeze > requirements.txt\ncat requirements.txt",
          "solutionOutput": "fastapi==0.115.0\npydantic==2.9.2\nstarlette==0.38.6\ntyping_extensions==4.12.2",
          "explanation": "Toàn bộ thư viện được cài đặt an toàn bên trong /tmp/demo-api/.venv/lib/ mà không kích hoạt cảnh báo PEP 668 và hoàn toàn không đụng chạm tới các thư viện Python của hệ điều hành.",
          "annotations": [
            {
              "part": "dpkg -s python3-venv",
              "text": "Kiểm tra trạng thái cài đặt của gói trong cơ sở dữ liệu dpkg."
            },
            {
              "part": "pip freeze > requirements.txt",
              "text": "Trích xuất phiên bản chính xác để tái tạo môi trường trên máy chủ khác."
            }
          ],
          "rubric": [
            {
              "criterion": "Kiểm tra điều kiện tiên quyết tính bất biến (Idempotency)",
              "pass": "Tạo thư mục /tmp/demo-api và cài đặt gói hệ thống python3-venv",
              "excellent": "Kiểm tra trước bằng dpkg -s python3-venv >/dev/null 2>&1 || sudo apt install -y python3-venv để không gọi apt thừa nếu gói đã có sẵn",
              "weight": "35%"
            },
            {
              "criterion": "Cô lập môi trường tuân thủ chuẩn PEP 668",
              "pass": "Tạo thành công .venv, kích hoạt bằng source và cài đặt fastapi không lỗi",
              "excellent": "Thực hiện nâng cấp pip bên trong venv trước khi cài gói ứng dụng mà không dùng sudo hay --break-system-packages",
              "weight": "35%"
            },
            {
              "criterion": "Đóng băng phiên bản phụ thuộc phục vụ tái lập",
              "pass": "Xuất danh sách thư viện ra tệp requirements.txt bằng pip freeze",
              "excellent": "Kiểm chứng lại nội dung tệp requirements.txt đảm bảo ghi nhận chính xác phiên bản cố định (==) của fastapi và starlette/pydantic",
              "weight": "30%"
            }
          ]
        }
      ],
      "summary": [
        "Hệ sinh thái Linux phân chia thành 3 họ quản lý gói lớn: Debian/Ubuntu (`apt`), RHEL/Rocky (`dnf`), và Arch Linux (`pacman`).",
        "`apt update` chỉ đồng bộ danh mục chỉ mục từ máy chủ; `apt upgrade` mới thực sự tải và cài đặt các phiên bản phần mềm mới.",
        "Trên Arch Linux, tuyệt đối tránh 'Partial Upgrade' (`pacman -Sy pkg`) để ngăn ngừa lỗi vỡ liên kết động của hệ thống.",
        "Chuẩn PEP 668 bảo vệ các thư viện Python cốt lõi của hệ điều hành: luôn sử dụng `python3 -m venv` cho dự án ứng dụng và dùng `pipx` cho các công cụ CLI.",
        "Định kỳ dọn dẹp hệ thống bằng `apt autoremove` (gỡ gói mồ côi) và `apt clean` (xóa cache gói) để giải phóng dung lượng ổ đĩa."
      ],
      "generalInfo": {
        "duration": "45 phút",
        "targetAudience": "Lập trình viên Python, Kỹ sư DevOps, Quản trị viên hệ thống",
        "prerequisites": "Đã hoàn thành Bài 1.6, hiểu quyền hạn sudo và phân cấp cây thư mục",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2 có Internet)",
        "materials": "Terminal, quyền sudo, gói `python3-venv`"
      },
      "nextLessonPreview": "Trong bài tiếp theo (1.8), chúng ta sẽ làm chủ Sức mạnh Dòng lệnh Unix: Chuyển hướng I/O, Pipe (`|`), Globbing & Biến Môi trường (`PATH`, `.bashrc`) để lắp ráp các đường ống xử lý dữ liệu phức tạp chỉ bằng một dòng lệnh.",
      "quiz": [
        {
          "question": "Tại sao các bản phân phối Linux hiện đại (Ubuntu 24.04, Debian 12) lại chặn lệnh `pip install` ở phạm vi toàn hệ thống kèm lỗi `externally-managed-environment`?",
          "options": [
            "Vì Linux không còn hỗ trợ ngôn ngữ lập trình Python nữa.",
            "Vì việc cài đè gói qua pip có thể làm hỏng hoặc xung đột phiên bản với các thư viện Python cốt lõi của hệ thống mà các công cụ OS (như apt, ufw) đang phụ thuộc.",
            "Vì pip yêu cầu phải trả phí bản quyền cho Canonical.",
            "Vì pip chỉ chạy được trên hệ điều hành Windows."
          ],
          "correctIndex": 1,
          "explanation": "PEP 668 bảo vệ hệ điều hành khỏi nguy cơ hỏng gói hệ thống do pip cài đè các phiên bản không tương thích vào /usr/lib/python3/dist-packages."
        },
        {
          "question": "Lệnh nào sau đây là lệnh chuẩn mực trên họ Red Hat Enterprise Linux (RHEL/Rocky Linux) tương đương với lệnh `sudo apt update && sudo apt install nginx` trên Ubuntu?",
          "options": [
            "sudo pacman -S nginx",
            "sudo dnf install nginx",
            "sudo brew install nginx",
            "sudo zypper get nginx"
          ],
          "correctIndex": 1,
          "explanation": "Trên RHEL/Rocky/Fedora, trình quản lý gói hiện đại là `dnf` (kế thừa từ `yum`). dnf tự động kiểm tra cập nhật kho gói khi cài đặt."
        },
        {
          "question": "Giải pháp chuẩn mực được khuyến nghị quốc tế khi bạn muốn cài đặt thư viện Python cho dự án trên máy chủ Linux là gì?",
          "options": [
            "Xóa tệp EXTERNALLY-MANAGED của hệ điều hành.",
            "Chạy lệnh với cờ --break-system-packages.",
            "Khởi tạo môi trường ảo độc lập bằng `python3 -m venv .venv` và kích hoạt bằng `source .venv/bin/activate` trước khi dùng pip.",
            "Đăng nhập bằng tài khoản root và chạy pip install."
          ],
          "correctIndex": 2,
          "explanation": "Sử dụng môi trường ảo cô lập (virtualenv) là chuẩn mực kỹ thuật duy nhất đảm bảo an toàn tuyệt đối cho hệ điều hành và tính tái lập của dự án."
        }
      ],
      "reflectionQuestion": "Một kỹ sư mới đăng đàn hỏi trên diễn đàn: 'Khi tôi chạy `pip install numpy` trên Ubuntu 24.04 thì bị báo lỗi externally-managed-environment. Tôi đọc trên mạng thấy người ta bảo gõ thêm cờ `--break-system-packages` là chạy được ngay. Tôi có nên làm theo không?'. Hãy đóng vai trò Trưởng nhóm Kỹ thuật (Tech Lead) viết câu trả lời phân tích lý do kỹ thuật và hướng dẫn giải pháp đúng chuẩn.",
      "reflectionHint": "Gợi ý: Cảnh báo mạnh mẽ KHÔNG ĐƯỢC dùng `--break-system-packages` trên môi trường sản xuất. Giải thích rõ nguy cơ ghi đè thư viện C/Python của hệ thống dẫn đến hỏng `apt` hoặc các daemon của Linux. Hướng dẫn giải pháp chuẩn: (1) Sử dụng `python3 -m venv .venv && source .venv/bin/activate`, hoặc (2) Nếu là công cụ CLI chạy độc lập thì dùng `pipx install <tool>`."
    },
    {
      "id": "lx-1-08",
      "number": "1.8",
      "title": "Chuyển hướng I/O, Pipe (`|`), Globbing & Biến Môi trường (`PATH`, `.bashrc`)",
      "subtitle": "Làm chủ 3 luồng dữ liệu chuẩn, kỹ thuật đường ống Unix và cơ chế kế thừa biến môi trường",
      "level": "Cơ bản",
      "duration": "45 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhận diện 3 luồng I/O tiêu chuẩn (stdin-0, stdout-1, stderr-2) và các toán tử chuyển hướng (`>`, `>>`, `2>`, `2>&1`, `&>`).",
        "2. [Hiểu - Understand] Giải thích cơ chế truyền dữ liệu trong RAM của đường ống Pipe (`|`) và vai trò của các biến môi trường (`$PATH`, `$HOME`, `$USER`, `.bashrc`).",
        "3. [Vận dụng - Apply] Ghép nối các chuỗi lệnh phức tạp với Pipe để lọc dữ liệu log (`grep`, `sort`, `uniq -c`, `head`) và cấu hình biến môi trường vĩnh viễn trong `~/.bashrc`.",
        "4. [Phân tích - Analyze] Đánh giá nguy cơ mất trắng dữ liệu khi nhầm lẫn `>` (ghi đè) với `>>` (nối tiếp), áp dụng cơ chế bảo vệ `set -o noclobber`."
      ],
      "intuition": {
        "title": "Hệ thống Đường ống Nước kết nối các Bồn Lọc Thông minh",
        "metaphor": "Hãy tưởng tượng dữ liệu trong máy tính giống như một dòng nước chảy qua 3 đường ống chính: Ống nước vào (stdin - số 0), Ống nước sạch xả ra (stdout - số 1) và Ống nước thải cảnh báo sự cố (stderr - số 2). Thay vì để nước xả tràn ra sàn nhà (màn hình terminal), bạn có thể dùng các khớp nối chuyển hướng (`>`, `>>`) để dẫn dòng nước sạch vào các bể chứa (file dữ liệu). Sức mạnh phi thường của Unix nằm ở dấu gạch đứng Pipe (`|`): nó cho phép bạn nối trực tiếp ống nước xả của chiếc máy số 1 vào làm đầu vào của chiếc máy số 2, rồi sang máy số 3, tạo thành một dây chuyền lọc nước tự động siêu tốc mà không cần đổ ra xô chậu trung gian.",
        "boundary": "Đường ống Pipe (`|`) chỉ chuyển tiếp luồng dữ liệu chuẩn (stdout), mặc định KHÔNG chuyển tiếp luồng lỗi (stderr). Nếu muốn chuyển cả lỗi qua Pipe, bạn phải dùng toán tử kết hợp `2>&1 |` hoặc `|&` trong Bash hiện đại.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🔄</span><span>3 FILE DESCRIPTORS TIÊU CHUẨN</span><span class=\"lx-vs-tag\">Standard Streams</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>FD 0 (stdin):</strong> Luồng nhập dữ liệu chuẩn (bàn phím hoặc chuyển hướng <code>&lt;</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>FD 1 (stdout):</strong> Luồng xuất chuẩn chứa kết quả thành công (chuyển hướng <code>&gt;</code> hoặc <code>&gt;&gt;</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>FD 2 (stderr):</strong> Luồng thông báo lỗi độc lập (chuyển hướng <code>2&gt;</code>).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>⚡</span><span>ĐƯỜNG ỐNG PIPE &amp; BIẾN MÔI TRƯỜNG</span><span class=\"lx-vs-tag\">Pipes &amp; Env</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Toán tử Pipe (<code>|</code>):</strong> Nối stdout của lệnh trước vào stdin của lệnh sau qua RAM buffer (64KB).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Biến <code>$PATH</code>:</strong> Danh sách thư mục shell sẽ quét để tìm file binary thực thi.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Tệp <code>~/.bashrc</code>:</strong> Kịch bản nạp tự động mỗi khi mở terminal mới để lưu alias và export biến.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Cơ chế 3 Luồng I/O, Pipe & Biến Môi trường",
          "content": "<p>Triết lý thiết kế của Unix đặt ra: <em>\"Mỗi chương trình chỉ làm một việc thật tốt, và có khả năng ghép nối với nhau thông qua luồng văn bản\"</em>. Mọi tiến trình Linux khi sinh ra đều tự động mở 3 file descriptor (0, 1, 2).</p>\n    <p><strong>Cơ chế hoạt động của Pipe:</strong> Khi chạy <code>cmd1 | cmd2</code>, Kernel tạo một bộ đệm vòng (Ring Buffer) 64KB trong RAM. <code>cmd1</code> ghi dữ liệu vào đầu vào của buffer, và <code>cmd2</code> đọc ngay từ đầu ra của buffer mà không cần ghi xuống ổ cứng. Điều này mang lại hiệu năng xử lý dữ liệu hàng triệu dòng mỗi giây.</p>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Toán tử / Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Hành vi luồng</th></tr></thead>\n    <tbody>\n      <tr><td><code>&gt;</code></td><td>Chuyển hướng stdout, GHI ĐÈ tệp đích</td><td><code>lệnh &gt; file.txt</code></td><td><code>echo \"v1.0\" &gt; version.txt</code></td><td><strong>Nguy hiểm:</strong> Xóa sạch nội dung cũ nếu file đã tồn tại.</td></tr>\n      <tr><td><code>&gt;&gt;</code></td><td>Chuyển hướng stdout, NỐI TIẾP vào cuối tệp</td><td><code>lệnh &gt;&gt; file.txt</code></td><td><code>echo \"[OK] Run success\" &gt;&gt; app.log</code></td><td>An toàn; giữ nguyên nội dung cũ và bổ sung dòng mới vào đáy.</td></tr>\n      <tr><td><code>2&gt;</code></td><td>Chỉ chuyển hướng luồng lỗi (stderr)</td><td><code>lệnh 2&gt; error.log</code></td><td><code>find / -name \"*.conf\" 2&gt;/dev/null</code></td><td>Đẩy các thông báo lỗi hoặc Permission denied vào thùng rác ảo.</td></tr>\n      <tr><td><code>&amp;&gt;</code></td><td>Chuyển hướng CẢ stdout và stderr vào một tệp</td><td><code>lệnh &amp;&gt; all_output.log</code></td><td><code>python3 worker.py &amp;&gt; run.log</code></td><td>Tương đương cú pháp POSIX cổ điển <code>&gt; run.log 2&gt;&amp;1</code>.</td></tr>\n      <tr><td><code>|</code></td><td>Đường ống nối stdout lệnh 1 vào stdin lệnh 2</td><td><code>lệnh1 | lệnh2</code></td><td><code>cat /var/log/syslog | grep -i error</code></td><td>Truyền dữ liệu trực tiếp trong bộ nhớ RAM, tốc độ cực nhanh.</td></tr>\n      <tr><td><code>export</code></td><td>Khai báo biến môi trường cho các tiến trình con</td><td><code>export BIEN=gia_tri</code></td><td><code>export PORT=8080</code></td><td>Nếu không có export, biến chỉ tồn tại trong shell hiện tại.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Xử lý luồng log với Pipe và xuất biến môi trường an toàn",
              "lang": "Bash",
              "code": "# 1. Lọc và đếm số lượng lỗi duy nhất từ file log\ngrep 'ERROR' /var/log/app.log 2>/dev/null | sort | uniq -c | sort -nr | head -n 5\n\n# 2. Xuất biến môi trường và nạp vĩnh viễn vào ~/.bashrc\necho 'export ENVIRONMENT=\"production\"' >> ~/.bashrc\nsource ~/.bashrc\necho $ENVIRONMENT",
              "output": "   142 ERROR: Database connection timeout\n    58 ERROR: Invalid token authentication\n    12 ERROR: Out of disk space\nproduction",
              "annotations": [
                {
                  "line": 2,
                  "text": "Chuỗi pipe 4 công đoạn: grep lọc -> sort sắp xếp -> uniq đếm xuất hiện -> head lấy top 5."
                },
                {
                  "line": 6,
                  "text": "echo >> ~/.bashrc: Nối tiếp vào file cấu hình shell để biến tự nạp ở các phiên terminal sau."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-8-fd-redirection",
          "title": "4.1 Giải phẫu 3 File Descriptor Tiêu chuẩn (0, 1, 2) & Thứ tự Chuyển hướng 2>&1",
          "content": "<p>Trong nhân Linux, mọi tiến trình ngay khi chào đời đều được cấp sẵn một bảng tham chiếu tệp mở (File Descriptor Table) tại <code>/proc/&lt;PID&gt;/fd/</code> với 3 kênh đánh số cố định:</p>\n    <ul>\n      <li><strong>FD <code>0</code> (<code>stdin</code> — Standard Input):</strong> Đầu vào tiêu chuẩn (mặc định nối với bàn phím qua PTY). Toán tử chuyển hướng đọc từ tệp: <code>&lt; input.txt</code>.</li>\n      <li><strong>FD <code>1</code> (<code>stdout</code> — Standard Output):</strong> Đầu ra kết quả bình thường (mặc định in ra màn hình). Toán tử: <code>&gt;</code> (ghi đè cắt cụt file về 0 byte ngay lập tức!) hoặc <code>&gt;&gt;</code> (ghi nối tiếp an toàn vào cuối file).</li>\n      <li><strong>FD <code>2</code> (<code>stderr</code> — Standard Error):</strong> Kênh báo lỗi tách rời hoàn toàn khỏi <code>stdout</code> để thông báo lỗi không bị trộn lẫn làm hỏng dữ liệu kết quả. Toán tử: <code>2&gt; error.log</code> hoặc ném vào hố đen <code>2&gt;/dev/null</code>.</li>\n    </ul>\n    <p><strong>Tại sao thứ tự <code>&gt; app.log 2&gt;&amp;1</code> đúng, còn <code>2&gt;&amp;1 &gt; app.log</code> lại SAI?</strong> Shell xử lý toán tử chuyển hướng nghiêm ngặt <em>từ trái sang phải</em>! Với <code>&gt; app.log 2&gt;&amp;1</code>: bước 1 bẻ kênh <code>1</code> trỏ vào tệp <code>app.log</code>, bước 2 sao chép điểm đích hiện tại của kênh <code>1</code> cho kênh <code>2</code> &rarr; cả hai cùng vào tệp. Nếu viết ngược <code>2&gt;&amp;1 &gt; app.log</code>: bước 1 trỏ kênh <code>2</code> vào màn hình (vì lúc đó kênh <code>1</code> vẫn đang ở màn hình!), rồi bước 2 mới đổi kênh <code>1</code> vào tệp &rarr; lỗi vẫn tràn ra màn hình!</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Tách riêng luồng kết quả chuẩn (FD 1) và luồng báo lỗi (FD 2) vào 2 tệp độc lập",
              "code": "# Liệt kê đồng thời 1 đường dẫn tồn tại (/etc/hostname) và 1 đường dẫn không tồn tại (/khong_co)\nls -l /etc/hostname /khong_co > /tmp/ok.log 2> /tmp/err.log || true\n\necho \"=== Noi dung stdout (FD 1) ===\" && cat /tmp/ok.log\necho \"=== Noi dung stderr (FD 2) ===\" && cat /tmp/err.log\nrm -f /tmp/ok.log /tmp/err.log",
              "output": "=== Noi dung stdout (FD 1) ===\n-rw-r--r-- 1 root root 12 Oct 10 08:00 /etc/hostname\n=== Noi dung stderr (FD 2) ===\nls: cannot access '/khong_co': No such file or directory",
              "annotations": [
                {
                  "line": 2,
                  "part": "> /tmp/ok.log 2> /tmp/err.log",
                  "text": "Kênh 1 nhận dữ liệu hợp lệ để xử lý tiếp; kênh 2 bắt riêng thông báo lỗi phục vụ cảnh báo giám sát."
                },
                {
                  "line": 2,
                  "part": "|| true",
                  "text": "Vì một trong các đường dẫn không tồn tại nên ls trả về mã thoát 2; thêm || true để dòng minh họa tiếp tục in kết quả bên dưới."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-8-pipe-tee-glob",
          "title": "4.2 Đường ống Kernel Pipe Buffer, Bộ chia chữ T (tee) & Shell Globbing (*, ?, {})",
          "content": "<p>Sức mạnh lắp ghép của dòng lệnh Linux đến từ sự kết hợp giữa <strong>Đường ống (Pipeline)</strong> và cơ chế <strong>Khai triển ký tự đại diện (Shell Expansion)</strong>:</p>\n    <ul>\n      <li><strong>Pipe <code>|</code> và Bộ chia luồng <code>tee</code>:</strong> Toán tử <code>cmd1 | cmd2</code> nối trực tiếp <code>stdout</code> (FD 1) của <code>cmd1</code> sang <code>stdin</code> (FD 0) của <code>cmd2</code> thông qua bộ đệm vòng 64KB trong RAM, hai tiến trình chạy <strong>song song đồng thời</strong> chứ không phải đợi <code>cmd1</code> xong hết mới chạy <code>cmd2</code>! Khi cần vừa lưu dữ liệu trung gian ra tệp trên đĩa vừa đẩy tiếp sang lệnh sau (như <code>wc -l</code> hoặc <code>grep</code>), hãy cắm ống chữ T bằng <code>tee output.log</code> (thêm <code>tee -a</code> nếu muốn ghi nối tiếp).</li>\n      <li><strong>Globbing vs Brace Expansion (Do Shell thực hiện TRƯỚC khi gọi lệnh):</strong>\n        <ul>\n          <li><em>Globbing (<code>*</code>, <code>?</code>, <code>[a-z]</code>):</em> Quét đĩa cứng hiện tại tìm các tệp khớp mẫu để điền vào đối số lệnh.</li>\n          <li><em>Brace Expansion (<code>{a,b,c}</code>, <code>{01..05}</code>):</em> Sinh tổ hợp chuỗi thuần túy trong bộ nhớ mà không cần tệp tồn tại trên đĩa — cực mạnh để tạo hàng loạt thư mục như <code>mkdir -p /opt/app/{bin,conf,logs,data}</code> hoặc sao lưu nhanh <code>cp nginx.conf{,.bak}</code>!</li>\n        </ul>\n      </li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Ứng dụng Brace Expansion tạo nhanh cấu trúc dự án và chia luồng bằng tee",
              "code": "# 1. Cú pháp rút gọn siêu tốc của DevOps: tạo bản sao lưu ngay tại chỗ bằng {,.bak}\ntouch /tmp/service.conf\ncp -v /tmp/service.conf{,.bak}\n\n# 2. Dùng tee vừa lưu danh sách 3 tài khoản đầu tiên vào file, vừa đếm số dòng trong 1 lượt đọc\nhead -n 3 /etc/passwd | tee /tmp/top3_users.txt | wc -l\nrm -f /tmp/service.conf /tmp/service.conf.bak /tmp/top3_users.txt",
              "output": "'/tmp/service.conf' -> '/tmp/service.conf.bak'\n3",
              "annotations": [
                {
                  "line": 3,
                  "part": "/tmp/service.conf{,.bak}",
                  "text": "Bash tự động bung biểu thức này thành 2 đối số: 'cp -v /tmp/service.conf /tmp/service.conf.bak' trước khi gọi lệnh cp!"
                },
                {
                  "line": 6,
                  "part": "| tee ... | wc -l",
                  "text": "Dữ liệu đi qua tee được nhân làm đôi: một nhánh ghi xuống /tmp/top3_users.txt, nhánh kia chảy tiếp sang wc -l in ra số 3."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-8-env-startup-files",
          "title": "4.3 Biến Shell vs Biến Môi trường (export) & Ma trận Nạp .bashrc vs .profile",
          "content": "<p>Rất nhiều kỹ sư gặp tình huống kỳ lạ: cấu hình biến <code>PATH</code> hay <code>DATABASE_URL</code> chạy ngon lành trên cửa sổ SSH, nhưng khi chạy qua <code>cron</code> hoặc <code>ssh user@host 'lenh'</code> thì biến lại biến mất hoàn toàn! Nguyên nhân nằm ở hai cơ chế cốt lõi:</p>\n    <ul>\n      <li><strong>Biến Cục bộ Shell vs Biến Môi trường (<code>export</code>):</strong> Gõ <code>PORT=8000</code> chỉ tạo biến nội bộ cho riêng tiến trình Bash hiện tại; khi bạn gọi <code>python3 app.py</code>, tiến trình con Python hoàn toàn <em>không nhìn thấy</em> biến này. Phải đóng dấu <code>export PORT=8000</code> thì biến mới được sao chép vào vùng nhớ môi trường (Environment Block) kế thừa cho mọi tiến trình con.</li>\n      <li><strong>Phân biệt tệp khởi động theo loại phiên Shell:</strong>\n        <ul>\n          <li><strong>Login Shell</strong> (khi đăng nhập qua SSH hoặc console): Bash đọc <code>/etc/profile</code> rồi đọc <code>~/.bash_profile</code> / <code>~/.profile</code> (mặc định trên Ubuntu <code>~/.profile</code> sẽ gọi tiếp <code>~/.bashrc</code>).</li>\n          <li><strong>Interactive Non-Login Shell</strong> (mở tab terminal mới trên giao diện đồ họa hoặc gõ <code>bash</code>): Chỉ đọc <code>~/.bashrc</code>.</li>\n          <li><strong>Non-Interactive Shell</strong> (chạy script, <code>cron</code>, <code>systemd</code>): Mặc định <strong>KHÔNG tự đọc <code>~/.bashrc</code>!</strong> Vì vậy với dịch vụ production, biến môi trường phải khai báo tường minh trong <code>EnvironmentFile=</code> của systemd hoặc đầu file crontab.</li>\n        </ul>\n      </li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Đối chứng sự kế thừa biến vào tiến trình con Python khi có và không có export",
              "code": "# 1. Biến cục bộ KHÔNG có export -> Tiến trình con Python không đọc được (trả về None)\nLOCAL_SECRET=\"abc\"\npython3 -c 'import os; print(\"Without export:\", os.getenv(\"LOCAL_SECRET\"))'\n\n# 2. Biến môi trường CÓ export -> Tiến trình con kế thừa thành công\nexport ENV_SECRET=\"xyz_prod\"\npython3 -c 'import os; print(\"With export:   \", os.getenv(\"ENV_SECRET\"))'",
              "output": "Without export: None\nWith export:    xyz_prod",
              "annotations": [
                {
                  "line": 3,
                  "part": "os.getenv(\"LOCAL_SECRET\")",
                  "text": "Chứng minh rõ ràng tiến trình con python3 tách rời vùng nhớ biến cục bộ với tiến trình cha bash."
                },
                {
                  "line": 6,
                  "part": "export ENV_SECRET",
                  "text": "Đưa biến vào bảng Environment của tiến trình (có thể kiểm chứng qua lệnh env hoặc tệp /proc/PID/environ)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Lọc dữ liệu tệp người dùng và tách riêng luồng dữ liệu đúng và luồng lỗi.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Tìm tất cả các file cấu hình Nginx mà không bị tràn màn hình bởi thông báo Permission denied: <code>find / -name \"nginx.conf\" 2>/dev/null</code>.</li>\n        <li><strong>Bước 2:</strong> Vừa xem kết quả trên terminal vừa lưu vào file bằng lệnh <code>tee</code>: <code>ls -la /var/log | tee ~/log_inventory.txt</code>.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Tai Họa Nhầm Lẫn Giữa > Và >></div>\n          <p>Gõ nhầm <code>echo \"alias ll='ls -la'\" > ~/.bashrc</code> thay vì <code>>></code>.</p>\n          <p><strong>Thảm họa:</strong> Toán tử <code>></code> xóa sạch toàn bộ 150 dòng cấu hình gốc của <code>~/.bashrc</code> (mất PATH, mất màu terminal, mất cấu hình SSH)!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Thao Tác An Toàn Tiêu Chuẩn</div>\n          <p>Luôn dùng <code>>></code> để nối tiếp cấu hình và bật chế độ chống ghi đè:</p>\n          <p><code>set -o noclobber && echo \"alias ll='ls -la'\" >> ~/.bashrc</code></p>\n          <p><strong>Ưu điểm:</strong> <code>noclobber</code> sẽ chặn đứng lệnh nếu bạn vô tình gõ <code>></code> vào một file đã tồn tại.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Xây dựng Đường ống Phân tích Dữ liệu Log & Tối ưu Shell",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.8</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thành thạo ghép nối Pipe xử lý log, điều hướng luồng lỗi vào <code>/dev/null</code> và thiết lập biến môi trường dự án.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Máy ảo Linux, file <code>/etc/passwd</code>.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Trích xuất danh sách tất cả người dùng có shell là <code>/bin/bash</code>: <code>grep '/bin/bash$' /etc/passwd | cut -d: -f1 | sort</code>.</li>\n        <li><strong>Bước 2:</strong> Điều hướng kết quả vào file kết quả: <code>grep '/bin/bash$' /etc/passwd | cut -d: -f1 > ~/bash_users.txt</code>.</li>\n        <li><strong>Bước 3:</strong> Bổ sung một thư mục tự viết vào biến <code>$PATH</code>: <code>export PATH=\"$HOME/bin:$PATH\"</code>.</li>\n        <li><strong>Bước 4:</strong> Kiểm tra xem <code>$PATH</code> mới có được nhận diện hay không: <code>echo $PATH | tr ':' '\n'</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">head -n 2 ~/bash_users.txt\n-> root\n-> devops (Danh sách user có shell bash được trích xuất hoàn hảo).</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Viết lệnh đếm số dòng trong <code>/var/log</code> không thể đọc được do thiếu quyền (đếm số dòng lỗi Permission denied).</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không chỉnh sửa file cấu hình môi trường toàn hệ thống <code>/etc/environment</code> nếu chưa sao lưu; sai cú pháp biến <code>PATH</code> tại đây sẽ khiến mọi lệnh cơ bản như <code>ls</code>, <code>sudo</code> đều báo <code>command not found</code> sau khi reboot!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Hiện tượng Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td>Biến môi trường biến mất sau khi tắt terminal</td><td>Chỉ dùng lệnh <code>export VAR=value</code> trên terminal tạm thời mà không ghi vào <code>~/.bashrc</code>.</td><td>Thêm dòng export vào cuối tệp <code>~/.bashrc</code> và chạy <code>source ~/.bashrc</code>.</td></tr>\n          <tr><td>Pipe không lọc được thông báo lỗi</td><td>Toán tử Pipe <code>|</code> chỉ chuyển tiếp luồng stdout (FD 1), bỏ sót luồng stderr (FD 2).</td><td>Dùng cú pháp gộp luồng: <code>lệnh 2>&1 | grep \"lỗi\"</code> hoặc <code>lệnh |& grep \"lỗi\"</code>.</td></tr>\n          <tr><td><code>cannot overwrite existing file</code> khi dùng <code>></code></td><td>Shell đang bật chế độ bảo vệ chống ghi đè <code>noclobber</code>.</td><td>Dùng toán tử cưỡng chế <code>>|</code> hoặc tắt chế độ bằng <code>set +o noclobber</code> nếu thật sự muốn ghi đè.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Không bao giờ thêm thư mục hiện tại (<code>.</code>) vào biến <code>$PATH</code>:</strong> Nếu <code>$PATH</code> chứa <code>.:/usr/bin</code>, kẻ tấn công có thể tạo một file mã độc tên là <code>ls</code> trong thư mục <code>/tmp</code>. Khi bạn gõ <code>ls</code>, mã độc sẽ được chạy trước binary thật của hệ điều hành!</li>\n        <li><strong>Bảo vệ biến môi trường chứa Secret/API Key:</strong> Không commit file <code>.env</code> lên Git. Phân quyền file môi trường <code>chmod 600 .env</code> để ngăn các tài khoản khác trên máy đọc trộm.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>GNU Bash Reference Manual:</strong> <a href=\"https://www.gnu.org/software/bash/manual/html_node/Redirections.html\" target=\"_blank\" rel=\"noopener\">Redirections and Pipeline Specifications</a>.</li>\n      <li><strong>POSIX Shell Environment:</strong> <code>man 1 bash</code> — Section: REDIRECTION and PARAMETERS.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Cheat Sheet Toán tử Chuyển hướng Dòng lệnh",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Toán tử</th><th>Ký hiệu chuẩn</th><th>Ý nghĩa tóm tắt</th></tr></thead>\n        <tbody>\n          <tr><td><code>&gt;</code></td><td>Ghi đè stdout</td><td>Chuyển kết quả vào file, xóa nội dung cũ nếu có.</td></tr>\n          <tr><td><code>&gt;&gt;</code></td><td>Nối tiếp stdout</td><td>Bổ sung kết quả vào cuối file, bảo vệ nội dung cũ.</td></tr>\n          <tr><td><code>2&gt;</code></td><td>Chuyển stderr</td><td>Tách riêng thông báo lỗi ra file khác hoặc vào /dev/null.</td></tr>\n          <tr><td><code>2&gt;&amp;1</code></td><td>Gộp stderr vào stdout</td><td>Biến luồng lỗi thành luồng xuất để đẩy qua Pipe.</td></tr>\n          <tr><td><code>&lt;</code></td><td>Chuyển stdin</td><td>Đọc dữ liệu đầu vào từ một file thay vì bàn phím.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố: Cron Job chạy script Python thất bại âm thầm (Silent Failure) do thiếu biến PATH",
        "content": "<p>Một lập trình viên thiết lập tác vụ cron chạy định kỳ mỗi 5 phút một script Python: <code>*/5 * * * * /home/devops/sync_data.sh</code>. Khi chạy thủ công trên terminal thì script hoạt động hoàn hảo, nhưng khi chạy qua cron thì dữ liệu không được đồng bộ và không có bất kỳ thông báo lỗi nào xuất hiện.</p><ol><li><strong>Triệu chứng:</strong> Dữ liệu trên database không được cập nhật; bảng log hoàn toàn trống rỗng; kiểm tra <code>syslog</code> chỉ thấy cron có gọi script nhưng không rõ tại sao kết thúc lập tức.</li><li><strong>Chẩn đoán:</strong> Thêm chuyển hướng bắt lỗi vào cấu hình cron: <code>*/5 * * * * /home/devops/sync_data.sh >> /var/log/sync.log 2>&1</code>. Năm phút sau, đọc tệp <code>/var/log/sync.log</code> phát hiện dòng lỗi: <code>/home/devops/sync_data.sh: line 4: uvicorn: command not found</code>.</li><li><strong>Nguyên nhân gốc rễ:</strong> Môi trường thực thi của Cron là môi trường tối giản (Non-interactive & Non-login shell). Biến <code>$PATH</code> mặc định của cron chỉ là <code>/usr/bin:/bin</code>, hoàn toàn không có <code>/home/devops/.local/bin</code> hay môi trường ảo nơi cài đặt lệnh <code>uvicorn</code>.</li><li><strong>Khắc phục:</strong> (1) Khai báo rõ đường dẫn tuyệt đối tới tệp thực thi bên trong môi trường ảo trong script: <code>/home/devops/my-api/.venv/bin/uvicorn ...</code>, (2) Khai báo rõ ràng biến <code>PATH</code> ở dòng đầu tiên của crontab.</li><li><strong>Phòng ngừa:</strong> Luôn sử dụng đường dẫn tuyệt đối cho mọi câu lệnh chạy trong script cron và luôn kết thúc dòng cron bằng <code>>> /var/log/app.log 2>&1</code>.</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Gõ nhầm toán tử > (ghi đè) thay vì >> (ghi nối tiếp)",
            "content": "Đây là lỗi bất cẩn gây mất dữ liệu lịch sử cực kỳ nghiêm trọng. Khi bạn muốn lưu thêm log vào cuối file <code>audit.log</code>, nếu vô tình gõ <code>command > audit.log</code>, toàn bộ dữ liệu nhật ký của nhiều tháng trước đó sẽ bị xóa trắng ngay lập tức! Luôn kiểm tra kỹ cú pháp <code>>></code> khi làm việc với log."
          },
          {
            "title": "Quên bọc biến trong dấu nháy kép dẫn đến lỗi Word Splitting",
            "content": "Nếu biến <code>FILE=\"My Document.pdf\"</code>, khi bạn chạy <code>rm $FILE</code>, shell sẽ phân tách chuỗi thành 2 đối số độc lập: <code>rm My Document.pdf</code>, dẫn đến xóa nhầm file <code>My</code> và file <code>Document.pdf</code>. Luôn bọc biến trong dấu nháy kép: <code>rm \"$FILE\"</code>."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng lệnh env hoặc printenv để kiểm tra toàn bộ biến môi trường",
            "content": "Gõ lệnh <code>printenv | sort</code> để xem danh sách toàn bộ các biến môi trường mà phiên shell hiện tại đang sở hữu. Bạn có thể tra cứu nhanh một biến cụ thể bằng: <code>printenv USER</code> hoặc <code>echo $USER</code>."
          },
          {
            "title": "Tận dụng /dev/null làm thùng rác điện tử",
            "content": "Khi bạn chạy một lệnh benchmark hoặc kiểm tra kết nối mạng (như <code>curl -s http://example.com > /dev/null</code>), chuyển hướng vào <code>/dev/null</code> giúp bạn kiểm tra mã phản hồi HTTP mà không làm tràn ngập màn hình bằng mã nguồn HTML."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Lọc danh sách cấu hình và loại bỏ toàn bộ lỗi truy cập",
          "problem": "Hãy viết câu lệnh tìm kiếm tất cả các tệp có đuôi `.conf` trong thư mục `/etc` sao cho: (1) Toàn bộ kết quả tìm thấy được lưu vào tệp `/tmp/configs.txt`; (2) Toàn bộ các thông báo lỗi truy cập (Permission denied) bị loại bỏ hoàn toàn vào thùng rác `/dev/null` mà không in ra màn hình terminal.",
          "hint": "Sử dụng find /etc -name '*.conf' kết hợp toán tử > và 2>/dev/null.",
          "solutionCode": "# Tìm kiếm file .conf và chuyển hướng luồng thành công và lỗi riêng biệt\nfind /etc -name \"*.conf\" > /tmp/configs.txt 2>/dev/null\n\n# Đếm số lượng file tìm thấy\nwc -l /tmp/configs.txt",
          "solutionOutput": "142 /tmp/configs.txt",
          "explanation": "Toán tử > chuyển hướng luồng stdout (FD 1) vào /tmp/configs.txt, còn 2>/dev/null chuyển luồng stderr (FD 2) vào hố đen /dev/null, giúp kết quả màn hình sạch sẽ.",
          "annotations": [
            {
              "part": "> /tmp/configs.txt",
              "text": "Ghi đè danh sách file tìm thấy vào tệp đích."
            },
            {
              "part": "2>/dev/null",
              "text": "Bỏ qua toàn bộ lỗi quyền hạn không đủ."
            }
          ],
          "rubric": [
            {
              "criterion": "Đúng toán tử chuyển hướng",
              "pass": "Sử dụng đúng pipe |, >> và 2>/dev/null",
              "excellent": "Gộp luồng 2>&1 chính xác không lỗi",
              "weight": "40%"
            },
            {
              "criterion": "Kết quả lọc dữ liệu",
              "pass": "Trích xuất đúng thông tin không thừa dòng lỗi",
              "excellent": "Lưu trữ tệp cấu hình không bị ghi đè mất dữ liệu",
              "weight": "30%"
            },
            {
              "criterion": "Hiểu cơ chế FD",
              "pass": "Giải thích được sự khác nhau giữa stdout và stderr",
              "excellent": "Phân tích được cơ chế truyền dữ liệu qua RAM buffer",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Sử dụng tee để vừa ghi log vừa đếm số dòng qua pipeline",
          "problem": "Từ file nhật ký `/var/log/dpkg.log` (hoặc syslog), hãy viết một chuỗi đường ống thực hiện đồng thời 3 việc: (1) Lọc ra các dòng có chứa từ khóa 'status installed'; (2) Lưu các dòng này vào tệp `/tmp/installed_packages.txt`; (3) Đồng thời đếm và in ra màn hình tổng số lượng gói đã được cài đặt mà không phải đọc file lần thứ hai.",
          "hint": "Kết hợp grep, lệnh chia luồng tee và wc -l qua đường ống pipe.",
          "solutionCode": "# Đường ống vừa trích xuất ghi file vừa đếm số lượng\ngrep \"status installed\" /var/log/dpkg.log | tee /tmp/installed_packages.txt | wc -l",
          "solutionOutput": "87",
          "explanation": "Lệnh tee hoạt động như một ngã ba dữ liệu: vừa ghi luồng văn bản vào tệp /tmp/installed_packages.txt vừa đẩy tiếp luồng văn bản đó qua pipe cho lệnh wc -l đếm số dòng.",
          "annotations": [
            {
              "part": "tee /tmp/installed_packages.txt",
              "text": "Ghi bản sao dữ liệu ra file mà không chặn dòng chảy pipeline."
            },
            {
              "part": "wc -l",
              "text": "Đếm số dòng (lines) nhận được từ đầu ra của tee."
            }
          ],
          "rubric": [
            {
              "criterion": "Thiết kế đường ống đọc một lượt (Single-pass Pipeline)",
              "pass": "Kết hợp đúng grep lọc từ khóa 'status installed' và đếm dòng bằng wc -l",
              "excellent": "Đặt lệnh tee /tmp/installed_packages.txt chính xác ở chặng giữa để vừa lưu tệp vừa truyền tiếp luồng sang wc -l mà không phải quét đĩa 2 lần",
              "weight": "60%"
            },
            {
              "criterion": "Tính chính xác của dữ liệu đầu ra",
              "pass": "Tệp /tmp/installed_packages.txt chứa đúng các dòng khớp và màn hình chỉ hiện con số tổng",
              "excellent": "Không dùng lệnh cat thừa ở đầu chuỗi (tránh anti-pattern Useless Use of Cat, truyền thẳng tên tệp cho grep)",
              "weight": "40%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Thiết lập Biến Môi trường Sản xuất Bền vững và Kiểm thử Non-login Shell",
          "problem": "Bạn cần cấu hình cho ứng dụng Python trên server 2 biến môi trường bền vững: (1) `APP_ENV=\"production\"`, và (2) Thêm thư mục `/opt/my-app/bin` vào biến `$PATH`. Hãy viết các câu lệnh để: thêm cấu hình vào `~/.bashrc`, nạp cấu hình vào shell hiện tại, và viết một câu lệnh kiểm tra (assertion) đảm bảo biến `$APP_ENV` có giá trị chính xác là 'production' khi chạy một subshell không tương tác (non-interactive bash -c).",
          "hint": "Ghi vào ~/.bashrc với >>, dùng source ~/.bashrc và kiểm thử bằng bash -c 'echo $APP_ENV'.",
          "solutionCode": "# 1. Ghi cấu hình biến môi trường vào ~/.bashrc nếu chưa có\ngrep -q 'APP_ENV=' ~/.bashrc || echo 'export APP_ENV=\"production\"' >> ~/.bashrc\ngrep -q '/opt/my-app/bin' ~/.bashrc || echo 'export PATH=\"/opt/my-app/bin:$PATH\"' >> ~/.bashrc\n\n# 2. Nạp cấu hình vào phiên hiện tại\nsource ~/.bashrc\n\n# 3. Kiểm thử tính khả dụng trong subshell mới\nbash -c 'if [ \"$APP_ENV\" = \"production\" ]; then echo \"[OK] Bien moi truong hoat dong\"; else echo \"[FAIL]\"; fi'",
          "solutionOutput": "[OK] Bien moi truong hoat dong",
          "explanation": "Kiểm tra bằng grep -q trước khi ghi vào ~/.bashrc đảm bảo tính idempotent (không bị lặp dòng khi chạy script nhiều lần). Lệnh export đưa biến vào environment block để mọi subshell sinh ra đều thừa kế biến.",
          "annotations": [
            {
              "part": "grep -q ... || echo",
              "text": "Kỹ thuật phòng thủ: chỉ ghi thêm dòng cấu hình nếu chuỗi chưa từng xuất hiện."
            },
            {
              "part": "source ~/.bashrc",
              "text": "Áp dụng ngay lập tức cấu hình mới cho shell hiện tại."
            }
          ],
          "rubric": [
            {
              "criterion": "Ghi cấu hình bền vững và chống trùng lặp (Idempotent)",
              "pass": "Ghi nối tiếp (>>) lệnh export APP_ENV và export PATH vào cuối tệp ~/.bashrc",
              "excellent": "Dùng grep -q kiểm tra trước khi ghi (tránh nhân bản dòng cấu hình nhiều lần) và giữ nguyên $PATH gốc qua cú pháp /opt/my-app/bin:$PATH",
              "weight": "45%"
            },
            {
              "criterion": "Nạp cấu hình và kiểm định trong tiến trình con",
              "pass": "Nạp lại tệp bằng source ~/.bashrc và kiểm tra giá trị biến APP_ENV",
              "excellent": "Thực thi kiểm chứng tự động qua subshell mới bash -c '...' chứng minh từ khóa export đã truyền biến thành công sang tiến trình con",
              "weight": "55%"
            }
          ]
        }
      ],
      "summary": [
        "Linux quản lý 3 luồng chuẩn qua File Descriptors: 0 (stdin), 1 (stdout), 2 (stderr).",
        "Toán tử `>` ghi đè, `>>` ghi nối tiếp; luôn chuyển hướng cả hai luồng bằng `>> file.log 2>&1` khi chạy tác vụ nền.",
        "Đường ống Pipe (`|`) nối đầu ra lệnh này vào đầu vào lệnh kia; `tee -a` là khớp nối chữ T vừa in màn hình vừa lưu đĩa.",
        "Phân biệt rõ ràng: Nháy đơn `'...'` giữ nguyên chuỗi thô, Nháy kép `\"...\"` giải mã biến nhưng chống tách từ; Globbing do shell mở rộng trước khi chạy lệnh.",
        "Lệnh `export` chỉ cấp biến cho tiến trình con trong phiên hiện tại; muốn bền vững phải lưu vào `~/.bashrc`."
      ],
      "generalInfo": {
        "duration": "50 phút",
        "targetAudience": "Lập trình viên, Kỹ sư DevOps, Automation Engineer",
        "prerequisites": "Đã hoàn thành Bài 1.7, hiểu cơ bản về terminal và thực thi lệnh",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2)",
        "materials": "Terminal, Shell Bash, tệp log giả lập"
      },
      "nextLessonPreview": "Trong bài tiếp theo (1.9), chúng ta sẽ làm chủ Kỹ thuật Nén, Lưu trữ và Đóng gói Dữ liệu (`tar`, `gzip`, `xz`, `zip`, `sha256sum`) để tạo bản sao lưu máy chủ và kiểm tra toàn vẹn mã nguồn.",
      "quiz": [
        {
          "question": "Toán tử nào sau đây chuyển cả luồng xuất tiêu chuẩn (stdout) VÀ luồng thông báo lỗi (stderr) vào cùng một tệp nhật ký?",
          "options": [
            "lệnh > file.log",
            "lệnh 2> file.log",
            "lệnh &> file.log (hoặc lệnh > file.log 2>&1)",
            "lệnh | file.log"
          ],
          "correctIndex": 2,
          "explanation": "&> (hoặc > file.log 2>&1) chỉ thị gộp cả File Descriptor 1 và 2 vào cùng một đích ghi dữ liệu."
        },
        {
          "question": "Tại sao lệnh `find / -name \"*.log\" | grep \"error\"` đôi khi vẫn in các dòng chữ đỏ 'Permission denied' ra màn hình mà không bị grep lọc?",
          "options": [
            "Vì grep bị lỗi.",
            "Vì thông báo 'Permission denied' được gửi ra luồng stderr (FD 2), trong khi dấu Pipe (|) mặc định chỉ chuyển tiếp luồng stdout (FD 1).",
            "Vì find không hỗ trợ Pipe.",
            "Vì lệnh grep chỉ tìm được chữ viết hoa."
          ],
          "correctIndex": 1,
          "explanation": "Pipe chỉ bắt stdout. Để chuyển cả lỗi qua grep, phải dùng `find / -name \"*.log\" 2>&1 | grep \"error\"` hoặc dọn lỗi qua `/dev/null`."
        },
        {
          "question": "Để một biến môi trường (ví dụ `API_KEY=xyz`) tồn tại vĩnh viễn và tự động có sẵn mỗi khi bạn mở một cửa sổ terminal mới, bạn phải khai báo lệnh ở đâu?",
          "options": [
            "Trong tệp /tmp/env.txt",
            "Trong tệp ~/.bashrc (hoặc ~/.bash_profile)",
            "Trong tệp /proc/environment",
            "Chỉ cần gõ một lần trên terminal rồi tắt máy"
          ],
          "correctIndex": 1,
          "explanation": "~/.bashrc là script khởi tạo môi trường người dùng, tự động thực thi mỗi khi một non-login interactive bash shell được mở."
        }
      ],
      "reflectionQuestion": "Một kỹ sư viết script sao lưu cơ sở dữ liệu hàng đêm: `mysqldump mydb > /backup/db.sql && echo 'Backup success' > /var/log/backup.log`. Sáng hôm sau kiểm tra, file `/var/log/backup.log` chỉ có duy nhất MỘT dòng của ngày hôm trước, toàn bộ lịch sử 30 ngày trước đó biến mất hoàn toàn. Hãy chỉ ra lỗi cú pháp ngớ ngẩn và sửa lại cho đúng.",
      "reflectionHint": "Gợi ý: Lập trình viên đã dùng toán tử ghi đè `>` cho file log thay vì toán tử nối tiếp `>>`. Hãy đổi thành `echo \"[$(date)] Backup success\" >> /var/log/backup.log`."
    },
    {
      "id": "lx-1-09",
      "number": "1.9",
      "title": "Nén, Lưu trữ và Đóng gói Dữ liệu (`tar`, `gzip`, `xz`, `zip`, `sha256sum`)",
      "subtitle": "Phân biệt đóng gói và nén thuật toán, làm chủ cờ tùy chọn tar và xác thực toàn vẹn bằng checksum",
      "level": "Cơ bản",
      "duration": "45 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ cú pháp lệnh `tar` với 4 cờ kinh điển (`-c` tạo, `-x` giải nén, `-v` tường minh, `-f` file) và các cờ nén (`-z` gzip, `-j` bzip2, `-J` xz).",
        "2. [Hiểu - Understand] Giải thích sự khác biệt bản chất giữa Đóng gói lưu trữ (Archiving) và Nén dữ liệu (Compression), so sánh tỷ lệ nén và tốc độ giữa gzip vs xz vs zstd.",
        "3. [Vận dụng - Apply] Thực hiện thành thạo quy trình đóng gói thư mục mã nguồn, giải nén an toàn vào thư mục chỉ định (`-C`) và xác thực toàn vẹn bằng `sha256sum -c`.",
        "4. [Phân tích - Analyze] Đánh giá rủi ro tệp nén 'bom giải nén' (Zip Bomb / Tar Slip), xử lý thông báo cảnh báo `tar: Removing leading '/' from member names`."
      ],
      "intuition": {
        "title": "Xếp đồ vào vali các-tông (tar) vs Dùng máy hút chân không ép nhỏ (gzip/xz)",
        "metaphor": "Trong thế giới Linux, 'Đóng gói' và 'Nén' là hai khái niệm hoàn toàn tách biệt. Lệnh `tar` (Tape Archive) giống như việc bạn lấy một chiếc hộp các-tông lớn và xếp 100 món đồ đạc rời rạc (nhiều tệp và thư mục con) vào trong hộp rồi dán băng dính lại. Chiếc hộp chỉ giúp gom các món đồ thành MỘT khối duy nhất để dễ vận chuyển, nhưng tổng thể tích (dung lượng) không hề giảm đi một byte nào! Sau khi có chiếc hộp `tar`, bạn mới đưa nó vào 'Máy hút chân không' (các thuật toán nén như `gzip`, `xz`, `zstd`) để ép bẹp thể tích chiếc hộp lại xuống chỉ còn 20–30% kích thước ban đầu. Đó là lý do tệp sau khi nén có phần mở rộng kép: `.tar.gz` (hoặc `.tar.xz`).",
        "boundary": "Các tệp đa phương tiện đã được nén sẵn từ trước (như ảnh .jpg, video .mp4, gói .zip) sẽ không thể giảm thêm dung lượng khi nén bằng `gzip`; việc cố nén chúng chỉ làm tốn CPU và lãng phí thời gian.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📦</span><span>ĐÓNG GÓI (ARCHIVE)</span><span class=\"lx-vs-tag\">tar</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Gom hàng ngàn tệp/thư mục thành 1 file duy nhất (<code>.tar</code>).</li><li><span class=\"lx-vs-bullet\">•</span> Giữ nguyên vẹn toàn bộ Inode permissions, owner, timestamps.</li><li><span class=\"lx-vs-bullet\">•</span> Không làm giảm dung lượng dữ liệu.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🗜️</span><span>NÉN DỮ LIỆU (COMPRESSION)</span><span class=\"lx-vs-tag\">gzip / xz / zstd</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>gzip (<code>-z</code> / <code>.tar.gz</code>):</strong> Nén/giải nén cực nhanh, chuẩn mặc định phổ biến nhất.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>xz (<code>-J</code> / <code>.tar.xz</code>):</strong> Tỷ lệ nén cao nhất, dung lượng nhỏ nhất, nén chậm.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>sha256sum:</strong> Băm mật mã học kiểm tra toàn vẹn gói chống lỗi truyền dẫn.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Cơ chế Đóng gói tar & Thuật toán Nén",
          "content": "<p>Trong vận hành hệ thống, việc sao lưu (backup) và chuyển giao phần mềm (deployment) đòi hỏi kỹ năng đóng gói chính xác. <code>tar</code> là công cụ chuẩn POSIX lưu giữ trọn vẹn thuộc tính bảo mật của tệp.</p>\n    <p><strong>Cơ chế bảo vệ của tar với đường dẫn tuyệt đối:</strong> Khi bạn đóng gói một thư mục bằng đường dẫn tuyệt đối như <code>tar -czvf backup.tar.gz /etc/nginx</code>, <code>tar</code> sẽ in thông báo: <em>tar: Removing leading '/' from member names</em>. Đây là một tính năng bảo mật sống còn: Nó tự động xóa dấu <code>/</code> ở đầu để biến thành đường dẫn tương đối <code>etc/nginx</code>. Nhờ đó, khi một kỹ sư khác giải nén file trên máy tính của họ, file sẽ không tự động ghi đè lên thư mục <code>/etc/nginx</code> thật của máy họ!</p>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Lệnh</th><th>Mục đích</th><th>Cú pháp chuẩn</th><th>Ví dụ thực tế</th><th>Ghi chú & Tình huống khuyên dùng</th></tr></thead>\n    <tbody>\n      <tr><td><code>tar -czvf</code></td><td>Đóng gói và nén bằng gzip</td><td><code>tar -czvf &lt;file.tar.gz&gt; &lt;nguồn&gt;</code></td><td><code>tar -czvf backup.tar.gz /var/www</code></td><td>Nhanh, phổ biến nhất; dùng cho sao lưu định kỳ hàng ngày.</td></tr>\n      <tr><td><code>tar -xzvf</code></td><td>Giải nén tệp tar.gz</td><td><code>tar -xzvf &lt;file.tar.gz&gt; [-C &lt;đích&gt;]</code></td><td><code>tar -xzvf backup.tar.gz -C /opt</code></td><td><code>-C</code> giải nén sang thư mục đích chỉ định mà không bung bừa bãi.</td></tr>\n      <tr><td><code>tar -cJvf</code></td><td>Đóng gói và nén bằng xz</td><td><code>tar -cJvf &lt;file.tar.xz&gt; &lt;nguồn&gt;</code></td><td><code>tar -cJvf release.tar.xz ./build</code></td><td>Tỷ lệ nén tối đa; phù hợp đóng gói bản phân phối phát hành.</td></tr>\n      <tr><td><code>tar -tf</code></td><td>Xem danh sách file bên trong tệp nén</td><td><code>tar -tf &lt;file.tar.gz&gt;</code></td><td><code>tar -tf release.tar.gz | head -n 10</code></td><td>Kiểm tra nội dung trước khi bung để tránh bị ghi đè tệp.</td></tr>\n      <tr><td><code>sha256sum</code></td><td>Tạo hoặc kiểm tra mã băm xác thực</td><td><code>sha256sum [-c] &lt;tệp&gt;</code></td><td><code>sha256sum -c release.tar.gz.sha256</code></td><td>Đảm bảo tệp tải về không bị lỗi đường truyền hoặc bị can thiệp.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Quy trình đóng gói sao lưu và tạo tệp checksum xác thực",
              "lang": "Bash",
              "code": "# 1. Đóng gói và nén thư mục cấu hình\ntar -czvf nginx_backup_$(date +%F).tar.gz /etc/nginx 2>/dev/null\n\n# 2. Tạo mã băm SHA-256 xác thực toàn vẹn\nsha256sum nginx_backup_*.tar.gz > nginx_backup.sha256\n\n# 3. Kiểm tra tự động tính toàn vẹn của tệp sao lưu\nsha256sum -c nginx_backup.sha256",
              "output": "nginx_backup_2024-10-28.tar.gz: OK",
              "annotations": [
                {
                  "line": 2,
                  "text": "tar -czvf: Cờ -c tạo mới, -z nén gzip, -v in chi tiết, -f tên tệp nén."
                },
                {
                  "line": 8,
                  "text": "sha256sum -c: Cờ --check đọc mã băm và tự động so khớp, trả về OK nếu toàn vẹn 100%."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-9-archive-vs-compress",
          "title": "4.1 Phân biệt Gom tệp (Archiving tar) vs Nén thuật toán (gzip, bzip2, xz, zstd)",
          "content": "<p>Trên Windows, định dạng <code>.zip</code> gộp chung cả việc gom nhiều tệp lẫn nén dung lượng làm một. Ngược lại, triết lý Unix tách bạch hoàn toàn hai công đoạn này để đạt độ linh hoạt tối đa:</p>\n    <ol>\n      <li><strong>Gom tệp lưu trữ (Archiving — <code>tar</code> / Tape Archive):</strong> Ghép hàng nghìn tệp và cây thư mục thành một luồng tệp nối tiếp duy nhất (<code>.tar</code> — tarball) mà <em>không hề giảm kích thước</em>. Giá trị cốt lõi nhất của <code>tar</code> là <strong>bảo toàn nguyên vẹn 100% thuộc tính hệ thống Linux</strong>: phân quyền <code>rwx</code>, chủ sở hữu <code>UID/GID</code>, liên kết mềm symlink và dấu thời gian microsecond (điều mà định dạng <code>.zip</code> thường làm rơi rớt!).</li>\n      <li><strong>Thuật toán Nén luồng (Compression):</strong> Lệnh <code>tar</code> chuyển tiếp luồng dữ liệu qua bộ nén được chọn tùy theo bài toán đánh đổi giữa <em>Tốc độ CPU</em> và <em>Tỷ lệ nén</em>:</li>\n    </ol>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Đuôi mở rộng</th><th>Cờ trong <code>tar</code></th><th>Tốc độ Nén</th><th>Tỷ lệ Nén</th><th>Tình huống áp dụng thực tế</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><code>.tar.gz</code> / <code>.tgz</code></td><td><code>-z</code> (gzip)</td><td>Nhanh</td><td>Khá tốt</td><td>Tiêu chuẩn phổ biến nhất cho gói mã nguồn và sao lưu hàng ngày</td></tr>\n          <tr><td><code>.tar.xz</code></td><td><code>-J</code> (xz / LZMA2)</td><td>Rất chậm (tốn CPU)</td><td><strong>Nén chặt tối đa</strong></td><td>Phát hành mã nguồn Kernel (kernel.org), image OS tải qua mạng hàng triệu lượt</td></tr>\n          <tr><td><code>.tar.zst</code></td><td><code>--zstd</code> (Zstandard)</td><td><strong>Siêu tốc (gần tốc độ RAM)</strong></td><td>Tốt tương đương/hơn gzip</td><td>Chuẩn công nghiệp mới cho sao lưu Database TB lớn, gói Arch Linux &amp; Container</td></tr>\n        </tbody>\n      </table>\n    </div>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "So sánh kích thước thực tế khi đóng gói thuần (.tar) với nén gzip (.tar.gz) và xz (.tar.xz)",
              "code": "# Đóng gói các tệp cấu hình văn bản trong /etc/pam.d theo 3 chế độ để đối chiếu dung lượng\ntar -cf /tmp/test.tar -C /etc pam.d\ntar -czf /tmp/test.tar.gz -C /etc pam.d\ntar -cJf /tmp/test.tar.xz -C /etc pam.d\n\nls -lh /tmp/test.tar*\nrm -f /tmp/test.tar*",
              "output": "-rw-r--r-- 1 devops devops 60K Nov  4 10:00 /tmp/test.tar\n-rw-r--r-- 1 devops devops 9.4K Nov  4 10:00 /tmp/test.tar.gz\n-rw-r--r-- 1 devops devops 7.1K Nov  4 10:00 /tmp/test.tar.xz",
              "annotations": [
                {
                  "line": 2,
                  "part": "-C /etc pam.d",
                  "text": "Di chuyển vào /etc trước khi đóng gói thư mục pam.d giúp đường dẫn bên trong gọn đẹp ('pam.d/...'), không dính tiền tố thư mục cha."
                },
                {
                  "line": 6,
                  "part": "60K -> 9.4K -> 7.1K",
                  "text": "Dữ liệu văn bản giảm hơn 85% dung lượng; xz cho kích thước nhỏ nhất còn gzip hoàn thành nhanh nhất."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-9-safe-tar-extract",
          "title": "4.2 Kiểm duyệt Gói nén, Phòng chống Tarbomb & Giải nén Cô lập bằng Cờ -C",
          "content": "<p>Trong an ninh vận hành, không bao giờ nhắm mắt gõ <code>tar -xf unknown.tar.gz</code> ngay tại thư mục làm việc hiện tại vì 2 mối đe dọa thực tế:</p>\n    <ul>\n      <li><strong>Hiện tượng \"Tarbomb\" (Bom xả rác tệp):</strong> Thay vì gom toàn bộ tệp vào 1 thư mục gốc duy nhất (<code>project-v1/...</code>), người đóng gói bất cẩn nén thẳng 5.000 tệp rời ở cấp ngoài cùng. Giải nén trực tiếp vào <code>/home/devops</code> hoặc <code>/etc</code> sẽ làm hàng nghìn tệp lạ trộn lẫn không thể nhặt ra nổi, thậm chí ghi đè lên tệp <code>.bashrc</code> hoặc cấu hình hiện có!</li>\n      <li><strong>Loại trừ thư mục rác khi đóng gói bằng <code>--exclude</code>:</strong> Khi đóng gói mã nguồn Python hay Node.js trên server, luôn loại bỏ <code>.venv</code>, <code>__pycache__</code>, <code>.git</code> và <code>*.log</code> bằng cờ <code>--exclude</code> (lưu ý đặt <code>--exclude</code> <em>trước</em> đường dẫn thư mục nguồn) để giảm dung lượng bản sao lưu từ hàng GB xuống chỉ còn vài trăm KB.</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Đóng gói sạch có loại trừ file rác (--exclude) và kiểm duyệt an toàn trước khi bung (-tvf)",
              "code": "# 1. Tạo cây dự án giả lập có chứa thư mục môi trường ảo và cache rác\nmkdir -p /tmp/myapp/{src,__pycache__} && echo 'print(1)' > /tmp/myapp/src/main.py && touch /tmp/myapp/__pycache__/main.pyc\n\n# 2. Đóng gói có chọn lọc (bỏ qua __pycache__) và kiểm duyệt nội dung bằng tar -tzvf\ntar --exclude='__pycache__' -czf /tmp/myapp_clean.tar.gz -C /tmp myapp\ntar -tzvf /tmp/myapp_clean.tar.gz\nrm -rf /tmp/myapp /tmp/myapp_clean.tar.gz",
              "output": "drwxr-xr-x devops/devops     0 2026-11-04 10:05 myapp/\ndrwxr-xr-x devops/devops     0 2026-11-04 10:05 myapp/src/\n-rw-r--r-- devops/devops     9 2026-11-04 10:05 myapp/src/main.py",
              "annotations": [
                {
                  "line": 5,
                  "part": "--exclude='__pycache__'",
                  "text": "Đặt cờ --exclude đứng trước tên nguồn 'myapp' để tương thích chuẩn trên mọi phiên bản GNU tar và BSD tar."
                },
                {
                  "line": 6,
                  "part": "tar -tzvf",
                  "text": "Cờ -t (list) kết hợp -v cho phép soi trước toàn bộ cây đường dẫn và phân quyền bên trong gói nén mà không ghi bất kỳ byte nào ra đĩa."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-9-sha256-integrity",
          "title": "4.3 Xác thực Toàn vẹn Dữ liệu & Chống Giả mạo Gói Phát hành với sha256sum",
          "content": "<p>Khi tải một bản cài đặt phần mềm, tệp ảnh ISO hệ điều hành hay khôi phục bản sao lưu Database qua mạng, làm sao bạn dám chắc tệp không bị hỏng 1 bit do rớt gói mạng hoặc bị tấn công Man-in-the-Middle cài cắm mã độc (Supply Chain Attack)?</p>\n    <p>Hàm băm mật mã học một chiều <strong>SHA-256 (<code>sha256sum</code>)</strong> tính toán toàn bộ nội dung tệp để sinh ra một chuỗi dấu vân tay hệ thập lục phân dài đúng 64 ký tự (256 bit). Nhờ <strong>Hiệu ứng Tuyết lở (Avalanche Effect)</strong>, chỉ cần 1 bit duy nhất trong tệp nén 10GB bị thay đổi, chuỗi mã băm đầu ra sẽ biến đổi hoàn toàn khác biệt! Các bản thuật toán cũ như <code>md5sum</code> và <code>sha1sum</code> hiện nay đã bị chứng minh có lỗ hổng va chạm (collision) nên chuẩn an ninh hiện đại bắt buộc sử dụng tối thiểu <code>sha256sum</code> hoặc <code>sha512sum</code>.</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Chứng minh Hiệu ứng Tuyết lở của SHA-256 khi tệp bị sửa đổi chỉ 1 ký tự",
              "code": "# 1. Tạo tệp dữ liệu gốc và lưu dấu vân tay chuẩn vào file .sha256\necho \"TRANSFER_AMOUNT=1000\" > /tmp/tx.dat\nsha256sum /tmp/tx.dat | tee /tmp/tx.dat.sha256\n\n# 2. Xác thực lần 1 (nguyên vẹn) -> Sau đó giả lập kẻ gian sửa 1000 thành 9000 và xác thực lại\nsha256sum -c /tmp/tx.dat.sha256\necho \"TRANSFER_AMOUNT=9000\" > /tmp/tx.dat\nsha256sum -c /tmp/tx.dat.sha256 || echo \"[PHAT HIEN GIA MAO] Ma bam khong khop!\"\nrm -f /tmp/tx.dat /tmp/tx.dat.sha256",
              "output": "8b4e9c1a2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f  /tmp/tx.dat\n/tmp/tx.dat: OK\n/tmp/tx.dat: FAILED\nsha256sum: WARNING: 1 computed checksum did NOT match\n[PHAT HIEN GIA MAO] Ma bam khong khop!",
              "annotations": [
                {
                  "line": 6,
                  "part": "sha256sum -c",
                  "text": "Đọc đường dẫn tệp bên trong file .sha256, tự tính toán lại hash hiện tại và đối chiếu: khớp trả về exit code 0 (OK), lệch trả về exit code 1 (FAILED)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Tiếp nhận gói mã nguồn nén và giải nén có kiểm soát an toàn.</p>\n      <ol>\n        <li><strong>Bước 1:</strong> Thẩm tra danh sách file trước khi bung: <code>tar -tf release.tar.gz | head -n 5</code>.</li>\n        <li><strong>Bước 2:</strong> Tạo thư mục đích riêng: <code>mkdir -p /opt/app-v1 && tar -xzvf release.tar.gz -C /opt/app-v1</code>.</li>\n        <li><strong>Bước 3:</strong> Xác nhận quyền hạn file giải nén được bảo tồn nguyên vẹn.</li>\n      </ol>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Thói Quen Bung Nén Nguy Hiểm</div>\n          <p>Gõ <code>tar -xzvf archive.tar.gz</code> ngay tại thư mục <code>/home/user</code> mà không kiểm tra cấu trúc bên trong.</p>\n          <p><strong>Hậu quả:</strong> Nếu file nén không bọc trong một thư mục cha (Tar Bomb), hàng ngàn file rác sẽ bung tràn lan đè lên các file hiện tại trong thư mục home!</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Thao Tác An Toàn Tiêu Chuẩn</div>\n          <p>Luôn dùng cờ <code>-C</code> trỏ vào một thư mục cách ly hoặc tạo thư mục trước:</p>\n          <p><code>mkdir -p target_dir && tar -xzvf archive.tar.gz -C target_dir</code></p>\n          <p><strong>Ưu điểm:</strong> Kiểm soát 100% vị trí bung file, dễ dọn dẹp nếu gói nén bị lỗi.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Đóng gói Bản Sao lưu Ứng dụng & Xác thực Mã băm",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.9</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Tạo bản sao lưu nén định dạng <code>.tar.gz</code> cho thư mục cấu hình, tạo mã băm SHA256 và thử nghiệm kịch bản phát hiện tệp bị can thiệp.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Thư mục <code>~/lab1_9</code>.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Chuẩn bị thư mục dữ liệu: <code>mkdir -p ~/lab1_9/data && echo \"v1\" > ~/lab1_9/data/file.txt</code>.</li>\n        <li><strong>Bước 2:</strong> Đóng gói nén thư mục <code>data</code>: <code>cd ~/lab1_9 && tar -czvf data_backup.tar.gz data</code>.</li>\n        <li><strong>Bước 3:</strong> Tạo file checksum: <code>sha256sum data_backup.tar.gz > data_backup.sha256</code>.</li>\n        <li><strong>Bước 4:</strong> Xác thực thành công: <code>sha256sum -c data_backup.sha256</code> &rarr; Kết quả in <code>OK</code>.</li>\n        <li><strong>Bước 5:</strong> Thử can thiệp tệp nén: <code>echo \"hacked\" >> data_backup.tar.gz</code> và chạy lại <code>sha256sum -c data_backup.sha256</code> để chứng kiến cảnh báo FAILED.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">data_backup.tar.gz: FAILED\nsha256sum: WARNING: 1 computed checksum did NOT match\n-> Hệ thống phát hiện tức thì tệp bị hỏng hoặc bị sửa đổi.</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Đóng gói thư mục bằng thuật toán nén hiện đại nhất <code>xz</code> với cờ <code>-cJvf</code> và so sánh kích thước với bản nén <code>gzip</code>.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Tuyệt đối không dùng cờ <code>-P</code> (preserve leading slash) khi giải nén các tệp tar từ Internet tải về; cờ này sẽ ghi đè trực tiếp vào thư mục gốc của hệ điều hành!\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thông báo Lỗi</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục triệt để</th></tr></thead>\n        <tbody>\n          <tr><td><code>gzip: stdin: not in gzip format</code></td><td>Dùng cờ <code>-z</code> giải nén một tệp thực chất là định dạng khác (như xz, bzip2 hoặc zip).</td><td>Dùng lệnh <code>file archive_name</code> để kiểm tra định dạng thật của tệp trước khi chọn cờ giải nén.</td></tr>\n          <tr><td><code>tar: Removing leading '/' from member names</code></td><td>Thông báo cảnh báo bảo mật bình thường của tar khi nén đường dẫn tuyệt đối.</td><td>Không phải lỗi; đây là tính năng bảo vệ giúp file có thể bung an toàn ở bất kỳ thư mục nào.</td></tr>\n          <tr><td><code>sha256sum: WARNING: computed checksum did NOT match</code></td><td>Tệp bị đứt quãng trong quá trình tải mạng hoặc đã bị phần mềm độc hại sửa đổi nội dung.</td><td>Xóa tệp bị hỏng và tải lại từ nguồn uy tín.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Luôn kiểm tra mã băm SHA256 khi tải gói cài đặt từ Internet:</strong> So khớp chuỗi sha256 do nhà phát triển công bố trên trang chủ với chuỗi tính từ máy bạn để đảm bảo không bị tấn công Man-in-the-Middle (MitM).</li>\n        <li><strong>Không bao giờ nén các tệp socket hoặc pipe ảo trong /dev hoặc /run:</strong> Thêm cờ <code>--exclude</code> để loại bỏ các socket file hoặc thư mục tạm không cần thiết.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>GNU Tar Manual:</strong> <a href=\"https://www.gnu.org/software/tar/manual/\" target=\"_blank\" rel=\"noopener\">GNU tar documentation</a> — Toàn bộ tài liệu chính thức về công cụ sao lưu lưu trữ.</li>\n      <li><strong>NIST Cryptographic Standards:</strong> <a href=\"https://csrc.nist.gov/projects/hash-functions\" target=\"_blank\" rel=\"noopener\">Secure Hash Standard (FIPS 180-4)</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Đối chiếu Tùy chọn Lệnh tar",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Cờ tùy chọn</th><th>Ý nghĩa</th><th>Ví dụ sử dụng</th></tr></thead>\n        <tbody>\n          <tr><td><code>-c</code> / <code>-x</code></td><td>Create (Tạo mới) / eXtract (Giải nén)</td><td><code>tar -cf</code> / <code>tar -xf</code></td></tr>\n          <tr><td><code>-z</code> / <code>-j</code> / <code>-J</code></td><td>Nén gzip (.gz) / bzip2 (.bz2) / xz (.xz)</td><td><code>tar -czf</code> / <code>tar -cJf</code></td></tr>\n          <tr><td><code>-v</code></td><td>Verbose (In chi tiết tiến trình các file)</td><td><code>tar -cvf</code></td></tr>\n          <tr><td><code>-f</code></td><td>File (Chỉ định tên tệp lưu trữ)</td><td><code>tar -cvf backup.tar</code></td></tr>\n          <tr><td><code>-C</code></td><td>Change directory (Giải nén sang thư mục khác)</td><td><code>tar -xf app.tar -C /opt</code></td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố: Giải nén bản mã nguồn từ bên thứ ba làm tê liệt cấu hình Nginx do dính Zip-Bomb",
        "content": "<p>Một kỹ sư tải gói mã nguồn giao diện web từ nhà cung cấp bên ngoài dưới dạng file <code>theme.tar.gz</code>. Kỹ sư đứng tại thư mục <code>/var/www/html</code> và gõ lệnh: <code>sudo tar -xzvf theme.tar.gz</code>. Ngay lập tức, hàng vạn tệp rác bung ra tràn ngập thư mục web và ghi đè làm mất sạch các file cấu hình Nginx đang chạy.</p><ol><li><strong>Triệu chứng:</strong> Dịch vụ web sập, thư mục <code>/var/www/html</code> bị lẫn lộn giữa hàng ngàn file rác và mã nguồn chính, không thể phân biệt đâu là file cần giữ để dọn dẹp.</li><li><strong>Chẩn đoán:</strong> Gói <code>theme.tar.gz</code> được đóng gói ẩu (Tar-bomb): người tạo không bọc các file bên trong một thư mục cha mà để các file trần trụi ở gốc tệp nén. Khi giải nén không dùng cờ <code>-C</code>, toàn bộ các file đã bung thẳng vào thư mục làm việc hiện tại và ghi đè các file trùng tên.</li><li><strong>Nguyên nhân gốc rễ:</strong> Không tuân thủ quy tắc kiểm tra xem trước (<code>tar -t</code>) và không giải nén vào một thư mục cô lập riêng biệt.</li><li><strong>Khắc phục:</strong> (1) Khôi phục thư mục web từ bản backup snapshot gần nhất, (2) Tạo thư mục riêng: <code>mkdir -p /tmp/theme_sandbox</code>, (3) Giải nén có kiểm soát: <code>tar -xzvf theme.tar.gz -C /tmp/theme_sandbox</code> để kiểm tra và di chuyển đúng những gì cần thiết.</li><li><strong>Phòng ngừa:</strong> Tuyệt đối không giải nén file từ Internet trực tiếp vào các thư mục sản xuất (<code>/var/www</code>, <code>/etc</code>); luôn xem trước bằng <code>tar -tf</code> và giải nén trong thư mục cách ly.</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Nhầm lẫn giữa cờ tạo gói (-c) và giải nén (-x)",
            "content": "Nếu bạn muốn giải nén file <code>data.tar.gz</code> nhưng vô tình gõ <code>tar -czvf data.tar.gz</code>, lệnh sẽ hiểu là bạn muốn TẠO MỚI một file tên là <code>data.tar.gz</code> và ngay lập tức ghi đè làm mất trắng toàn bộ dữ liệu lưu trữ ban đầu! Luôn kiểm tra: <code>-c</code> là Create (Tạo), <code>-x</code> là eXtract (Giải nén)."
          },
          {
            "title": "Quên cờ nén thuật toán khi giải nén",
            "content": "Mặc dù các phiên bản GNU tar hiện đại có thể tự nhận diện định dạng nén dựa trên magic bytes, nhưng việc chỉ định rõ ràng <code>-z</code> (cho gzip) hoặc <code>-J</code> (cho xz) giúp câu lệnh tường minh và chạy ổn định trên mọi hệ thống Unix cổ điển."
          }
        ],
        "tips": [
          {
            "title": "Loại trừ thư mục không cần thiết khi sao lưu bằng cờ --exclude",
            "content": "Khi đóng gói dự án Python, bạn không nên nén cả thư mục môi trường ảo hoặc cache. Hãy dùng cờ: <code>tar -czvf project.tar.gz --exclude='.venv' --exclude='__pycache__' ./project</code> để giảm 90% dung lượng file nén."
          },
          {
            "title": "Kiểm tra nhanh tính toàn vẹn của file ISO bằng sha256sum",
            "content": "Các nhà phân phối Linux luôn cung cấp file <code>SHA256SUMS</code> đi kèm file <code>.iso</code>. Sau khi tải xong, chỉ cần gõ <code>sha256sum -c SHA256SUMS --ignore-missing</code> để xác nhận file cài đặt đạt chuẩn 100% trước khi cài vào máy chủ."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Đóng gói sao lưu thư mục cấu hình Nginx với gzip",
          "problem": "Hãy viết câu lệnh để: (1) Đóng gói và nén toàn bộ thư mục cấu hình `/etc/nginx` thành một tệp lưu trữ tên `/tmp/nginx_backup.tar.gz`; (2) In chi tiết từng file trong quá trình nén ra màn hình terminal.",
          "hint": "Sử dụng tar với tổ hợp cờ -czvf.",
          "solutionCode": "# Đóng gói và nén thư mục cấu hình Nginx\nsudo tar -czvf /tmp/nginx_backup.tar.gz /etc/nginx\n\n# Kiểm tra kích thước file nén vừa sinh ra\nls -lh /tmp/nginx_backup.tar.gz",
          "solutionOutput": "/etc/nginx/\n/etc/nginx/nginx.conf\n/etc/nginx/sites-available/\n/etc/nginx/sites-enabled/\n-rw-r--r-- 1 root root 8.5K Oct 28 11:10 /tmp/nginx_backup.tar.gz",
          "explanation": "Tổ hợp cờ -czvf thực hiện: c (tạo gói), z (nén gzip), v (hiển thị chi tiết), f (ghi ra file /tmp/nginx_backup.tar.gz). Toàn bộ cây thư mục cấu hình được gom nhỏ gọn trong một file duy nhất.",
          "annotations": [
            {
              "part": "tar -czvf",
              "text": "Cú pháp kinh điển sao lưu cấu hình hệ thống Linux."
            }
          ],
          "rubric": [
            {
              "criterion": "Đúng cú pháp nén và giải nén",
              "pass": "Sử dụng đúng tar với các cờ -czvf và -C",
              "excellent": "Đóng gói đường dẫn an toàn không bị lỗi",
              "weight": "40%"
            },
            {
              "criterion": "Tạo và xác thực checksum",
              "pass": "Tạo file sha256 chuẩn và kiểm tra với cờ -c",
              "excellent": "Phát hiện chính xác tệp bị can thiệp lỗi",
              "weight": "30%"
            },
            {
              "criterion": "Hiểu bản chất",
              "pass": "Phân biệt được đóng gói archive vs nén dữ liệu",
              "excellent": "Giải thích được cơ chế loại bỏ dấu gạch chéo đầu",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Giải nén có kiểm soát vào thư mục đích cách ly bằng cờ -C",
          "problem": "Bạn nhận được file sao lưu `/tmp/nginx_backup.tar.gz`. Hãy thực hiện các lệnh an toàn để: (1) Xem trước danh mục các tệp bên trong mà không giải nén; (2) Tạo thư mục khôi phục `/tmp/restore_nginx` và (3) Giải nén toàn bộ nội dung file nén vào đúng thư mục khôi phục đó bằng cờ `-C`.",
          "hint": "Sử dụng tar -tzf để xem trước và tar -xzvf ... -C /path để giải nén đích.",
          "solutionCode": "# 1. Xem trước danh mục tệp bên trong gói nén\ntar -tzf /tmp/nginx_backup.tar.gz | head -n 5\n\n# 2. Tạo thư mục đích cách ly\nmkdir -p /tmp/restore_nginx\n\n# 3. Giải nén có kiểm soát vào thư mục đích\nsudo tar -xzvf /tmp/nginx_backup.tar.gz -C /tmp/restore_nginx\n\n# 4. Kiểm tra cấu trúc trong thư mục đích\nls -la /tmp/restore_nginx",
          "solutionOutput": "etc/nginx/\netc/nginx/nginx.conf\netc/nginx/sites-available/\ntotal 12\ndrwxr-xr-x 3 root root 4096 Oct 28 11:15 .\ndrwxrwxrwt 9 root root 4096 Oct 28 11:15 ..\ndrwxr-xr-x 3 root root 4096 Oct 28 11:10 etc",
          "explanation": "Cờ -tzf giúp người quản trị đọc trước cấu trúc gói nén. Cờ -C /tmp/restore_nginx đảm bảo dữ liệu được giải nén cô lập trong thư mục đích mà không làm xáo trộn thư mục hiện tại.",
          "annotations": [
            {
              "part": "tar -tzf",
              "text": "Kiểm tra an toàn cấu trúc thư mục trước khi thực hiện bung nén."
            },
            {
              "part": "-C /tmp/restore_nginx",
              "text": "Chỉ định điểm giải nén đích độc lập."
            }
          ],
          "rubric": [
            {
              "criterion": "Kiểm duyệt an toàn trước khi giải nén",
              "pass": "Liệt kê trước danh sách tệp bên trong bằng lệnh tar -tf hoặc tar -tzf",
              "excellent": "Kết hợp giới hạn đầu ra bằng head để kiểm tra nhanh cấu trúc thư mục gốc chống rủi ro Tarbomb",
              "weight": "40%"
            },
            {
              "criterion": "Giải nén cô lập vào đúng thư mục đích",
              "pass": "Tạo thư mục /tmp/restore_nginx bằng mkdir -p và giải nén thành công",
              "excellent": "Sử dụng chuẩn xác cờ -C /tmp/restore_nginx (chữ C hoa) để định hướng vị trí bung nén an toàn mà không cần cd thủ công",
              "weight": "60%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Quy trình Kiểm định Toàn vẹn Tự động hóa bằng SHA-256",
          "problem": "Hãy viết một script ngắn hoặc chuỗi lệnh Bash thực hiện quy trình kiểm định phát hành phần mềm: (1) Tạo file nén `/tmp/release.tar.gz` từ một thư mục dữ liệu; (2) Tạo file mã băm checksum tương ứng mang tên `/tmp/release.tar.gz.sha256`; (3) Viết lệnh kiểm tra tự động bằng `sha256sum -c`: Nếu mã hash trùng khớp 100%, in ra '[OK] Ban phat hanh toan ven'; nếu file bị thay đổi (giả lập bằng cách sửa 1 byte), in ra thông báo '[CANH BAO] File bi sua doi'.",
          "hint": "Dùng sha256sum, sha256sum -c --status và toán tử điều kiện if/then/else.",
          "solutionCode": "# 1. Tạo dữ liệu mẫu và gói nén phát hành\nmkdir -p /tmp/pkg_source && echo 'v1.0.0-PROD' > /tmp/pkg_source/version.txt\ntar -czf /tmp/release.tar.gz -C /tmp pkg_source\n\n# 2. Sinh mã băm SHA-256\nsha256sum /tmp/release.tar.gz > /tmp/release.tar.gz.sha256\n\n# 3. Kịch bản kiểm tra toàn vẹn tự động\nif sha256sum -c --status /tmp/release.tar.gz.sha256; then\n  echo \"[OK] Ban phat hanh toan ven\"\nelse\n  echo \"[CANH BAO] File bi sua doi\"\nfi",
          "solutionOutput": "[OK] Ban phat hanh toan ven",
          "explanation": "Cờ --status của sha256sum không in thông báo rườm rà ra màn hình mà chỉ trả về exit code: 0 nếu mã hash khớp tuyệt đối, và khác 0 nếu có bất kỳ sự thay đổi nào. Đây là kỹ thuật cốt lõi trong đường ống CI/CD và xác thực bảo mật chuẩn NIST.",
          "annotations": [
            {
              "part": "sha256sum ... > ...sha256",
              "text": "Tạo tệp đối chiếu tiêu chuẩn gồm chuỗi mã hash 64 ký tự và tên tệp."
            },
            {
              "part": "sha256sum -c --status",
              "text": "Chế độ yên lặng chỉ trả về mã thoát exit code phục vụ script tự động hóa."
            }
          ],
          "rubric": [
            {
              "criterion": "Đóng gói phát hành và sinh tệp Checksum chuẩn",
              "pass": "Tạo đúng tệp nén /tmp/release.tar.gz và ghi kết quả sha256sum ra tệp .sha256",
              "excellent": "Sử dụng cờ -C khi đóng gói để giữ đường dẫn sạch và định dạng tệp .sha256 tương thích chuẩn đầu vào của cờ -c",
              "weight": "45%"
            },
            {
              "criterion": "Tự động hóa nhánh kiểm tra toàn vẹn bằng Exit Code",
              "pass": "Dùng lệnh sha256sum -c trong câu lệnh điều kiện if/else để in thông báo tương ứng",
              "excellent": "Bổ sung cờ --status (hoặc --quiet) cho sha256sum -c để ẩn output mặc định, chỉ xuất thông báo chuẩn của kịch bản tự động hóa",
              "weight": "55%"
            }
          ]
        }
      ],
      "summary": [
        "`tar` là công cụ đóng gói nhiều file thành một; thuật toán nén (`gzip`, `xz`) là công đoạn thu nhỏ dung lượng độc lập.",
        "Thuật toán `gzip` nén cực nhanh phù hợp cho backup hàng ngày; `xz` nén chặt nhất tiết kiệm dung lượng cho lưu trữ lâu dài.",
        "Cờ `-f` trong lệnh `tar` bắt buộc phải đứng cuối cùng ngay trước tên file lưu trữ (`tar -czvf file.tar.gz`).",
        "Luôn dùng `tar -tzf` để xem trước nội dung file nén và luôn dùng cờ `-C /path` để giải nén vào thư mục cách ly.",
        "Mã băm mật mã `sha256sum` là công cụ chuẩn mực để kiểm định tính toàn vẹn dữ liệu và phòng chống tấn công giả mạo file."
      ],
      "generalInfo": {
        "duration": "45 phút",
        "targetAudience": "Lập trình viên, Kỹ sư Vận hành, DevOps",
        "prerequisites": "Đã hoàn thành Bài 1.4 và 1.8, hiểu thao tác tệp và I/O",
        "environment": "Ubuntu 22.04/24.04 LTS (Máy ảo hoặc WSL2)",
        "materials": "Terminal, các gói `tar`, `gzip`, `xz-utils`, `zip`"
      },
      "nextLessonPreview": "Trong bài tiếp theo (1.10), chúng ta sẽ bước vào Dự án Thực hành Cuối Cấp 1: Thiết lập Máy chủ Python Chuẩn Production & Xử lý 3 Kịch bản Sự cố Thực chiến — bài kiểm tra tổng hợp kiến thức sinh tồn Cấp 1.",
      "quiz": [
        {
          "question": "Lệnh nào sau đây dùng để xem danh sách các tệp bên trong một file nén `backup.tar.gz` MÀ KHÔNG CẦN giải nén dữ liệu ra ổ đĩa?",
          "options": [
            "tar -xzvf backup.tar.gz",
            "tar -tf backup.tar.gz",
            "cat backup.tar.gz",
            "unzip backup.tar.gz"
          ],
          "correctIndex": 1,
          "explanation": "Cờ -t (table of contents / list) cho phép liệt kê toàn bộ danh sách file và thư mục bên trong archive mà không ghi đè bất kỳ file nào lên đĩa."
        },
        {
          "question": "Tại sao lệnh `tar` tự động in cảnh báo `tar: Removing leading '/' from member names` khi bạn đóng gói một đường dẫn tuyệt đối như `/var/log`?",
          "options": [
            "Vì tar bị lỗi phần mềm.",
            "Vì đây là cơ chế an toàn: chuyển đường dẫn tuyệt đối thành tương đối để khi người khác giải nén, file sẽ không vô tình ghi đè lên thư mục hệ thống /var/log của máy họ.",
            "Vì Linux không cho phép đóng gói thư mục /var.",
            "Vì file tar chỉ chạy được trên đĩa mềm."
          ],
          "correctIndex": 1,
          "explanation": "Loại bỏ dấu gạch chéo đầu là chốt chặn bảo mật kinh điển của Unix để ngăn chặn hiểm họa Tar Slip (ghi đè file hệ thống ngoài ý muốn)."
        },
        {
          "question": "Công cụ nào được khuyến nghị chuẩn quốc tế để xác thực xem một tệp gói phần mềm 5GB tải về từ máy chủ có bị hỏng hay bị sửa đổi trong quá trình truyền mạng hay không?",
          "options": [
            "ls -l",
            "sha256sum -c",
            "wc -c",
            "file"
          ],
          "correctIndex": 1,
          "explanation": "sha256sum sử dụng hàm băm mật mã học SHA-256 để kiểm tra tính toàn vẹn 100% của tệp tin so với mã băm chuẩn của nhà phát hành."
        }
      ],
      "reflectionQuestion": "Một kỹ sư tải về tệp mã nguồn `my-app.tar.gz` từ một đường link lạ trên mạng. Thay vì giải nén ngay, kỹ sư này cần thực hiện 2 bước kiểm tra an toàn sinh tồn nào trên dòng lệnh trước khi quyết định đưa tệp này vào máy chủ sản xuất?",
      "reflectionHint": "Gợi ý: (1) Kiểm tra mã băm: chạy `sha256sum my-app.tar.gz` và đối chiếu với mã băm tác giả công bố trên kênh chính thức; (2) Kiểm tra cấu trúc archive: chạy `tar -tf my-app.tar.gz` để xem danh sách file bên trong, kiểm tra xem có chứa tệp mã độc nguy hiểm hoặc đường dẫn tuyệt đối lừa đảo hay không."
    },
    {
      "id": "lx-1-10",
      "number": "1.10",
      "title": "Dự án Thực hành Cuối Cấp 1: Thiết lập Máy chủ Python Chuẩn Production & Xử lý Sự cố",
      "subtitle": "Tích hợp toàn diện kỹ năng Cấp 1 vào dự án chuẩn bị server sạch cho ứng dụng Python và xử lý sự cố thực chiến",
      "level": "Cơ bản",
      "duration": "60 phút",
      "requiresRoot": true,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ quy trình 6 bước chuẩn hóa hạ tầng triển khai dịch vụ Python trên Linux theo chuẩn FHS và CIS Benchmark.",
        "2. [Hiểu - Understand] Giải thích sự phối hợp nhịp nhàng giữa User dịch vụ không đặc quyền (`pyrunner`), Cây thư mục FHS, Môi trường ảo venv, Nhật ký log và Biến môi trường.",
        "3. [Vận dụng - Apply] Tổng hợp hơn 25 câu lệnh cốt lõi của Cấp 1 để triển khai hoàn chỉnh một ứng dụng Python FastAPI chạy nền, thiết lập log xoay vòng và cấu hình phân quyền bảo mật 640/750.",
        "4. [Phân tích - Analyze] Độc lập chẩn đoán và khắc phục 3 kịch bản sự cố thực tế: Lỗi quyền 403 Forbidden, Lỗi cổng mạng bị chiếm dụng và Lỗi sập hệ thống do tràn file log."
      ],
      "intuition": {
        "title": "Tổng diễn tập Bàn giao Trạm Viễn thông Độc lập Ngoài Đảo xa",
        "metaphor": "9 bài học vừa qua là từng bài tập rèn luyện thể lực: bạn đã biết kiểm tra động cơ (1.1), sơ đồ trạm (1.2), đọc sổ tay (1.3), xếp dọn phòng (1.4), ghi nhật ký (1.5), khóa cửa bảo mật (1.6), tiếp tế lương thực (1.7), dẫn ống nước (1.8) và đóng thùng niêm phong (1.9). Bài 1.10 này là chuyến bay đưa bạn ra hòn đảo xa để tự tay xây dựng một 'Trạm Viễn thông Dịch vụ Python' hoàn chỉnh từ bãi đất trống. Một trạm chuẩn mực phải tự đứng vững: có phòng ở riêng (thư mục FHS), nhân sự chuyên trách (user dịch vụ), lương thực đóng gói (venv), sổ nhật ký độc lập (log) và hàng rào bảo vệ vững chắc.",
        "boundary": "Dự án Cấp 1 tập trung hoàn thiện tầng Dòng lệnh & Hạ tầng Hệ thống cơ bản. Việc quản lý tiến trình bằng systemd service unit và thiết lập tường lửa nâng cao sẽ được nâng tầm ở Cấp 2 và Cấp 3.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🚀</span><span>QUY TRÌNH 6 BƯỚC DỰ ÁN</span><span class=\"lx-vs-tag\">Standard Workflow</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 1:</strong> Thẩm tra môi trường VM &amp; Tạo user dịch vụ không shell <code>pyrunner</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 2:</strong> Thiết lập cây thư mục FHS chuẩn (<code>/opt/pyapp</code>, <code>/etc/pyapp</code>, <code>/var/log/pyapp</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 3:</strong> Khởi tạo môi trường ảo venv &amp; Cài đặt thư viện FastAPI/Uvicorn.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 4:</strong> Triển khai mã nguồn ứng dụng &amp; Cấu hình biến môi trường <code>.env</code> (chmod 600).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 5:</strong> Khởi chạy dịch vụ chạy nền &amp; Chuyển hướng log kép.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 6:</strong> Đóng gói sao lưu tự động &amp; Tạo tệp băm xác thực SHA256.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Kiến trúc Triển khai Dịch vụ Chuẩn Doanh nghiệp",
          "content": "<p>Triển khai ứng dụng sản xuất trên Linux không đơn thuần là gõ lệnh chạy code, mà là thiết lập một môi trường vận hành an toàn, có khả năng cô lập lỗi và dễ dàng bảo trì.</p>\n    <p><strong>Nguyên tắc bàn giao hạ tầng sản xuất:</strong></p>\n    <ul>\n      <li>Không bao giờ chạy ứng dụng dưới quyền tài khoản cá nhân hoặc tài khoản root.</li>\n      <li>Mã nguồn đặt tại <code>/opt/&lt;app&gt;</code>; Tệp cấu hình nhạy cảm đặt tại <code>/etc/&lt;app&gt;</code> (quyền 600/640); Nhật ký log đặt tại <code>/var/log/&lt;app&gt;</code>.</li>\n      <li>Toàn bộ thư viện phụ thuộc được đóng gói độc lập trong Virtualenv.</li>\n    </ul>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Giai đoạn Triển khai</th><th>Lệnh thực thi</th><th>Mục đích Kỹ thuật</th><th>Tiêu chí Nghiệm thu</th></tr></thead>\n    <tbody>\n      <tr><td>1. Khởi tạo User</td><td><code>sudo useradd -r -s /usr/sbin/nologin pyrunner</code></td><td>User dịch vụ không có shell đăng nhập</td><td>Khóa cửa xâm nhập trực tiếp từ bàn phím.</td></tr>\n      <tr><td>2. Cấu trúc FHS</td><td><code>sudo mkdir -p /opt/pyapp /etc/pyapp /var/log/pyapp</code></td><td>Tách rời mã nguồn, cấu hình và nhật ký</td><td>Tuân thủ 100% chuẩn phân cấp FHS 3.0.</td></tr>\n      <tr><td>3. Virtualenv</td><td><code>python3 -m venv /opt/pyapp/.venv</code></td><td>Cô lập thư viện ứng dụng tuân thủ PEP 668</td><td>Không vi phạm externally-managed-environment.</td></tr>\n      <tr><td>4. Phân quyền</td><td><code>sudo chmod 750 /opt/pyapp && sudo chmod 640 /etc/pyapp/.env</code></td><td>Áp dụng đặc quyền tối thiểu (Least Privilege)</td><td>Chặn người ngoài đọc mật khẩu kết nối.</td></tr>\n      <tr><td>5. Sao lưu</td><td><code>tar -czvf /backup/app_$(date +%F).tar.gz /opt/pyapp</code></td><td>Đóng gói snapshot sao lưu dự phòng</td><td>Có file checksum sha256 đi kèm.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Script tự động hóa thiết lập hạ tầng dịch vụ Python chuẩn FHS",
              "lang": "Bash",
              "code": "#!/usr/bin/env bash\nset -euo pipefail\n\n# 1. Tạo user dịch vụ\nsudo useradd -r -s /usr/sbin/nologin pyrunner || true\n\n# 2. Tạo cây thư mục\nsudo mkdir -p /opt/pyapp /etc/pyapp /var/log/pyapp\n\n# 3. Phân quyền sở hữu\nsudo chown -R pyrunner:pyrunner /opt/pyapp /var/log/pyapp\nsudo chown -R root:pyrunner /etc/pyapp\nsudo chmod 750 /opt/pyapp /var/log/pyapp\n\necho '[OK] Ha tang Python Server da san sang!'",
              "output": "[OK] Ha tang Python Server da san sang!",
              "annotations": [
                {
                  "line": 2,
                  "text": "set -euo pipefail: Chế độ an toàn của Bash, dừng script ngay khi gặp bất kỳ lỗi nào."
                },
                {
                  "line": 5,
                  "text": "-r tạo system user, -s /usr/sbin/nologin ngăn chặn đăng nhập shell tương tác."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-10-service-account-fhs",
          "title": "4.1 Thiết kế Tài khoản Dịch vụ (nologin) & Quy hoạch Cây Thư mục Chuẩn FHS",
          "content": "<p>Trong bài Dự án Tốt nghiệp Cấp 1 này, chúng ta kết nối toàn bộ kiến thức rời rạc từ Bài 1.1 đến 1.9 thành một quy trình chuẩn hóa máy chủ ứng dụng thực tế tại doanh nghiệp. Bước đầu tiên khi dựng server mới không bao giờ là tải code về thư mục <code>/root</code> hay <code>/home/ubuntu</code>, mà là <strong>cô lập danh tính và không gian lưu trữ</strong>:</p>\n    <ul>\n      <li><strong>Tài khoản Hệ thống Phi đăng nhập (Service Account):</strong> Khi tạo tài khoản riêng cho ứng dụng (như <code>pyrunner</code>, <code>www-data</code>, <code>postgres</code>), ta luôn dùng cờ <code>useradd -r -s /usr/sbin/nologin</code>. Cờ <code>-r</code> cấp UID hệ thống (&lt; 1000) và không tạo thư mục <code>/home</code> thừa; shell <code>/usr/sbin/nologin</code> đảm bảo dù kẻ tấn công có đánh cắp được thông tin tài khoản này cũng không thể mở phiên đăng nhập SSH tương tác vào máy chủ!</li>\n      <li><strong>Bố cục 3 vùng tách biệt theo FHS 3.0:</strong>\n        <ul>\n          <li><code>/opt/pyapp/</code>: Chứa mã nguồn chỉ đọc và môi trường <code>.venv</code> (quyền <code>750</code>, sở hữu <code>root:pyrunner</code> — ứng dụng được đọc và chạy code nhưng <em>không được tự sửa code của chính mình</em> nếu dính lỗi RCE!).</li>\n          <li><code>/etc/pyapp/</code>: Chứa tệp biến môi trường nhạy cảm <code>.env</code> (quyền <code>640</code>, sở hữu <code>root:pyrunner</code>).</li>\n          <li><code>/var/log/pyapp/</code>: Khu vực duy nhất tiến trình <code>pyrunner</code> được cấp quyền ghi (<code>750</code>, sở hữu <code>pyrunner:pyrunner</code>) để xuất nhật ký vận hành.</li>\n        </ul>\n      </li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Kiểm tra các tài khoản dịch vụ chuẩn có sẵn trong /etc/passwd",
              "code": "# Quan sát cách các dịch vụ hệ thống (daemon, www-data, sshd) khóa shell bằng /usr/sbin/nologin\ngrep -E '^(root|daemon|www-data|nobody):' /etc/passwd",
              "output": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin",
              "annotations": [
                {
                  "line": 2,
                  "part": "/usr/sbin/nologin",
                  "text": "Trường thứ 7 cuối cùng trong /etc/passwd quy định Login Shell: chỉ root dùng /bin/bash, các tài khoản dịch vụ đều khóa cứng bằng nologin."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-10-secrets-venv-deploy",
          "title": "4.2 Triển khai Môi trường Ảo .venv, Khóa chặt Biến Nhạy cảm .env & Shebang",
          "content": "<p>Giai đoạn thứ hai của dự án tập trung vào việc đóng gói môi trường thực thi Python sao cho ổn định, độc lập hoàn toàn với biến <code>$PATH</code> cá nhân của người quản trị:</p>\n    <ul>\n      <li><strong>Gọi trực tiếp Binary trong <code>.venv/bin/</code>:</strong> Trong các kịch bản khởi chạy dịch vụ thực tế, thay vì phải gọi <code>source /opt/pyapp/.venv/bin/activate</code> (vốn là lệnh của shell tương tác), kỹ sư chuyên nghiệp gọi thẳng đường dẫn tuyệt đối <code>/opt/pyapp/.venv/bin/python /opt/pyapp/main.py</code>. Python sẽ tự động nhận diện tệp <code>pyvenv.cfg</code> cạnh nó và nạp đúng toàn bộ thư viện cô lập trong <code>.venv</code>!</li>\n      <li><strong>Cơ chế dòng <code>#!</code> (Shebang) ở đầu tệp Script:</strong> Khi bạn cấp quyền <code>chmod +x script.py</code> và gõ <code>./script.py</code>, chính <strong>Linux Kernel</strong> (chứ không phải Bash) đọc 2 byte ma thuật <code>#!</code> (<code>0x23 0x21</code>) ở đầu tệp để biết phải gọi trình thông dịch nào. Dùng <code>#!/usr/bin/env python3</code> linh hoạt hơn <code>#!/usr/bin/python3</code> vì lệnh <code>env</code> sẽ tự động tìm bản <code>python3</code> đầu tiên trong <code>$PATH</code> (kể cả bản trong <code>.venv</code> đang kích hoạt).</li>\n    </ul>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Tạo script thực thi có Shebang chuẩn và kiểm chứng quyền đọc tệp mật khẩu .env",
              "code": "# 1. Tạo script Python có dòng Shebang chuẩn và bật bit thực thi x\ncat << 'EOF' > /tmp/check_env.py\n#!/usr/bin/env python3\nimport sys\nprint(f\"Interpreter: {sys.executable} | Python {sys.version.split()[0]}\")\nEOF\nchmod 750 /tmp/check_env.py\n\n# 2. Thực thi trực tiếp tệp như một lệnh nhị phân độc lập\n/tmp/check_env.py\nrm -f /tmp/check_env.py",
              "output": "Interpreter: /usr/bin/python3 | Python 3.12.3",
              "annotations": [
                {
                  "line": 2,
                  "part": "cat << 'EOF' > ...",
                  "text": "Kỹ thuật Here-Document với 'EOF' đặt trong nháy đơn giúp ghi tệp nhiều dòng từ CLI mà không bị Bash biến đổi các ký tự $ bên trong."
                },
                {
                  "line": 7,
                  "part": "chmod 750",
                  "text": "Vừa bật bit thực thi (x) cho chủ sở hữu và nhóm để Kernel cho phép chạy trực tiếp, vừa chặn người ngoài xem mã nguồn."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-10-backup-triage-sop",
          "title": "4.3 Quy trình Đóng gói Phát hành Có Kiểm định Hash & Phác đồ Chẩn đoán Sự cố 4 Bước",
          "content": "<p>Khi một dịch vụ mới triển khai gặp lỗi không chạy được trên máy chủ Linux, thay vì đoán mò hoặc sửa quyền <code>chmod 777</code> trong hoảng loạn, hãy áp dụng <strong>Phác đồ Chẩn đoán Sự cố 4 Bước (4-Step Triage SOP)</strong>:</p>\n    <ol>\n      <li><strong>Đọc chính xác thông báo lỗi trên <code>stderr</code> &amp; Mã thoát (<code>echo $?</code>):</strong> Mã thoát <code>127</code> là <em>Command not found</em> (sai tên lệnh hoặc thiếu trong <code>$PATH</code>); mã thoát <code>126</code> là <em>Permission denied / Not executable</em> (thiếu quyền <code>x</code> hoặc phân vùng gắn cờ <code>noexec</code>); mã thoát <code>1</code> hoặc <code>2</code> là lỗi nội tại của ứng dụng/tham số.</li>\n      <li><strong>Kiểm tra chuỗi quyền hạn từ gốc tới ngọn bằng <code>namei -l</code>:</strong> Rất nhiều trường hợp tệp <code>/opt/app/sub/run.py</code> có quyền <code>755</code> đầy đủ, nhưng thư mục cha <code>/opt/app</code> lại đang để <code>700</code> thuộc <code>root:root</code> khiến user dịch vụ bị chặn ngay từ cửa ngoài! Lệnh <code>namei -l &lt;đường_dẫn&gt;</code> soi quyền của toàn bộ các tầng thư mục cha chỉ trong 1 dòng lệnh.</li>\n      <li><strong>Kiểm tra dung lượng đĩa, Inode và định dạng dòng CRLF:</strong> Script soạn trên Windows rồi chép lên Linux thường dính ký tự <code>\\r</code> cuối dòng khiến Kernel báo lỗi kỳ quặc <code>/usr/bin/env: 'python3\\r': No such file or directory</code> (khắc phục bằng <code>sed -i 's/\\r$//' script.py</code>).</li>\n      <li><strong>Xác thực tính toàn vẹn gói triển khai:</strong> Luôn kiểm tra <code>sha256sum -c</code> trước khi bung nén gói phát hành vào thư mục đích bằng <code>tar -xzf ... -C ...</code>.</li>\n    </ol>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Soi xuyên thấu phân quyền của toàn bộ chuỗi thư mục cha bằng lệnh namei -l",
              "code": "# Kiểm tra quyền hạn từng mắt xích từ gốc / đến tận tệp /var/log/dpkg.log\nnamei -l /var/log/dpkg.log",
              "output": "f: /var/log/dpkg.log\ndrwxr-xr-x root root /\ndrwxr-xr-x root root var\ndrwxrwxr-x root syslog log\n-rw-r--r-- root adm dpkg.log",
              "annotations": [
                {
                  "line": 2,
                  "part": "namei -l",
                  "text": "Vũ khí bí mật của Sysadmin: chỉ cần 1 tầng thư mục cha thiếu bit 'x' đối với user chạy app, bạn sẽ phát hiện điểm nghẽn Permission denied trong 1 giây!"
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Kịch bản demo của Giảng viên:</strong> Walkthrough toàn diện từ tạo thư mục, gán quyền, test quyền user dịch vụ đến kích hoạt ứng dụng.</p>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Cách Triển Khai Nghiệp Dư Thảm Họa</div>\n          <p>Kéo code về <code>/home/ubuntu/Desktop</code>, chạy <code>sudo pip install -r requirements.txt</code>, gõ <code>sudo python3 app.py</code> và để cửa sổ terminal mở.</p>\n          <p><strong>Hiểm họa:</strong> App chạy dưới quyền root, tắt cửa sổ terminal là app chết, xung đột gói hệ điều hành, rò rỉ mã nguồn.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Cách Triển Khai Chuyên Nghiệp Chuẩn FHS</div>\n          <p>Triển khai tại <code>/opt/pyapp</code>, chạy bằng user <code>pyrunner</code> không đặc quyền, chạy qua virtualenv cô lập, chuyển hướng log vào <code>/var/log/pyapp/app.log</code>.</p>\n          <p><strong>Ưu điểm:</strong> Bền bỉ, an toàn, chuẩn chỉ theo khuyến nghị bảo mật quốc tế.</p>\n        </div>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Dự án Tốt nghiệp Cấp 1 — Dựng Máy chủ Python & Xử lý 3 Sự cố",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🏆 Capstone Lab Cấp 1</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Tự tay dựng trọn vẹn hạ tầng máy chủ Python chuẩn mực, vận hành ứng dụng API và xử lý thành công 3 kịch bản sự cố do giảng viên giả lập.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Máy ảo Ubuntu 22.04 LTS sạch (đã chụp snapshot).</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Nhiệm vụ 1:</strong> Tạo user hệ thống <code>pyrunner</code> và cây thư mục FHS.</li>\n        <li><strong>Nhiệm vụ 2:</strong> Tạo file mã nguồn <code>/opt/pyapp/main.py</code> trả về JSON <code>{\"status\": \"healthy\"}</code>.</li>\n        <li><strong>Nhiệm vụ 3:</strong> Khởi tạo venv tại <code>/opt/pyapp/.venv</code>, cài đặt <code>fastapi</code> và <code>uvicorn</code>.</li>\n        <li><strong>Nhiệm vụ 4:</strong> Cấu hình file bí mật <code>/etc/pyapp/.env</code> quyền <code>640</code>.</li>\n        <li><strong>Nhiệm vụ 5:</strong> Đóng gói mã nguồn ra tệp <code>/backup/pyapp_release.tar.gz</code> kèm file checksum sha256.</li>\n      </ol>\n      <h4>3 Kịch bản Sự cố Cần Khắc phục (Troubleshooting)</h4>\n      <ul>\n        <li><strong>Sự cố A (Lỗi Quyền):</strong> Dịch vụ báo <code>Permission denied: /var/log/pyapp/app.log</code> &rarr; Sửa lại quyền sở hữu <code>chown pyrunner:pyrunner</code>.</li>\n        <li><strong>Sự cố B (Tràn Đĩa 100%):</strong> Ổ cứng bị đầy do file log rác trong <code>/tmp</code> &rarr; Dùng <code>du -sh</code> và <code>df -h</code> truy tìm và xóa file rác.</li>\n        <li><strong>Sự cố C (Xung đột Gói):</strong> Chạy nhầm pip global bị báo lỗi PEP 668 &rarr; Chuyển sang kích hoạt đúng venv.</li>\n      </ul>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Đảm bảo đã Take Snapshot máy ảo trước khi bắt đầu bài thi tốt nghiệp Cấp 1.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Tình huống Sự cố</th><th>Nguyên nhân gốc rễ</th><th>Giải pháp khắc phục tức thì</th></tr></thead>\n        <tbody>\n          <tr><td>App không khởi động được do thiếu quyền đọc <code>.env</code></td><td>File <code>.env</code> thuộc root nhưng user <code>pyrunner</code> không nằm trong nhóm có quyền đọc.</td><td>Gán quyền nhóm: <code>sudo chown root:pyrunner /etc/pyapp/.env && sudo chmod 640 /etc/pyapp/.env</code>.</td></tr>\n          <tr><td>Lỗi <code>address already in use :8000</code></td><td>Có tiến trình cũ đang chiếm dụng cổng mạng 8000.</td><td>Tìm PID đang chiếm cổng: <code>ss -tulpn | grep 8000</code> hoặc <code>lsof -i :8000</code>, sau đó dừng tiến trình đó.</td></tr>\n          <tr><td>Lệnh trong script chạy báo <code>No such file or directory</code></td><td>Script viết trên Windows chứa ký tự kết thúc dòng Windows CRLF (\\r\\n).</td><td>Chuyển sang chuẩn Unix LF: dùng lệnh <code>dos2unix &lt;file&gt;</code> hoặc <code>tr -d '\\r' &lt; file_win.sh &gt; file_unix.sh</code>.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Áp dụng Bộ quy chuẩn CIS Linux Benchmark Cấp 1:</strong> Khóa shell đăng nhập của mọi tài khoản dịch vụ (set shell <code>/usr/sbin/nologin</code>).</li>\n        <li><strong>Tách riêng nhật ký truy cập và nhật ký lỗi:</strong> Điều hướng stdout vào <code>access.log</code> và stderr vào <code>error.log</code> để dễ dàng cấu hình cảnh báo giám sát.</li>\n        <li><strong>Tự động hóa kiểm tra tính toàn vẹn:</strong> Định kỳ chạy <code>sha256sum -c</code> trên các gói sao lưu để sớm phát hiện hỏng hóc phần cứng lưu trữ.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Center for Internet Security:</strong> <a href=\"https://www.cisecurity.org/benchmark/ubuntu_linux\" target=\"_blank\" rel=\"noopener\">CIS Ubuntu Linux Benchmark Guide</a>.</li>\n      <li><strong>FastAPI Deployment Standards:</strong> <a href=\"https://fastapi.tiangolo.com/deployment/\" target=\"_blank\" rel=\"noopener\">Official FastAPI Deployment Concepts</a>.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Bảng Rubric Nghiệm thu Dự án Capstone Cấp 1",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table lx-rubric-table\">\n        <thead><tr><th>Hạng mục Nghiệm thu</th><th>Mức Đạt (Pass)</th><th>Mức Xuất sắc (Mastery)</th><th>Trọng số</th></tr></thead>\n        <tbody>\n          <tr><td>Cấu trúc cây thư mục FHS</td><td>Tạo đủ 3 thư mục /opt, /etc, /var/log</td><td>Tách biệt rõ ràng, phân quyền 750/640 chuẩn xác</td><td>30%</td></tr>\n          <tr><td>Môi trường Python & User</td><td>Tạo đúng venv và user không shell nologin</td><td>Chạy dịch vụ hoàn toàn dưới quyền pyrunner không đặc quyền</td><td>35%</td></tr>\n          <tr><td>Xử lý sự cố & Sao lưu</td><td>Khắc phục được 2/3 kịch bản sự cố</td><td>Xử lý hoàn hảo 3/3 sự cố, tạo file checksum sha256 tự động</td><td>35%</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "scenario": {
        "title": "Sự cố Bàn giao: Máy chủ Staging từ chối chạy do thiếu biến PATH và quyền sở hữu",
        "content": "<p>Khi bàn giao máy chủ cho đội kiểm thử QA, các kỹ sư QA báo cáo: (1) Không thể ghi log vào <code>/var/log/data-service</code>, (2) Chạy script báo <code>Permission denied</code>, và (3) Gói phát hành giải nén ra bị dính thư mục <code>.venv</code> nặng tới 300MB.</p><ol><li><strong>Triệu chứng:</strong> User QA gặp lỗi <em>Permission denied</em> khi khởi chạy dịch vụ; file nén phình to gấp 30 lần dung lượng thực tế.</li><li><strong>Chẩn đoán:</strong> (1) Thư mục <code>/var/log/data-service</code> khi tạo bằng <code>sudo mkdir</code> đã để mặc định quyền sở hữu <code>root:root</code> khiến user thường không ghi được; (2) Lệnh đóng gói <code>tar</code> ban đầu quên cờ <code>--exclude='.venv'</code> khiến hàng nghìn file nhị phân của venv bị nén vào.</li><li><strong>Nguyên nhân gốc rễ:</strong> Thiếu bước bàn giao quyền sở hữu bằng <code>chown</code> và thiếu kiểm tra xem trước nội dung file nén bằng <code>tar -tf</code>.</li><li><strong>Khắc phục:</strong> (1) Chạy <code>sudo chown -R qa:qa /var/log/data-service</code>, (2) Đóng gói lại có loại trừ: <code>tar --exclude='.venv' -czvf ...</code>.</li><li><strong>Phòng ngừa:</strong> Luôn đưa checklist tự chấm điểm vào quy trình CI/CD trước khi bàn giao hệ thống.</li></ol>"
      },
      "callouts": {
        "pitfalls": [
          {
            "title": "Hard-code đường dẫn thư mục nhà /home/ubuntu",
            "content": "Không nên hard-code <code>/home/ubuntu</code> trong script triển khai nếu máy chủ có thể dùng user tên khác (như <code>ec2-user</code>, <code>debian</code> hay <code>devops</code>). Luôn sử dụng biến <code>$HOME</code> hoặc đặt tại thư mục chuẩn toàn hệ thống <code>/opt/</code>."
          },
          {
            "title": "Đóng gói cả thư mục .venv vào file phát hành",
            "content": "Môi trường ảo <code>.venv</code> chứa các symlink và file thực thi nhị phân phụ thuộc chặt chẽ vào phiên bản Python và đường dẫn tuyệt đối của máy chủ hiện tại. Đóng gói <code>.venv</code> sang máy chủ khác sẽ khiến ứng dụng bị đổ vỡ đường dẫn. Luôn loại trừ <code>.venv</code> và chỉ xuất file <code>requirements.txt</code>."
          }
        ],
        "tips": [
          {
            "title": "Thiết lập biến PATH ưu tiên cho dự án trong file .env",
            "content": "Trong script khởi động ứng dụng, bạn có thể tự động thêm môi trường ảo vào đầu PATH bằng dòng lệnh: <code>export PATH=\"/opt/data-service/.venv/bin:$PATH\"</code> để gọi trực tiếp các lệnh như <code>pytest</code>, <code>uvicorn</code> mà không cần gọi <code>source activate</code>."
          },
          {
            "title": "Tạo snapshot VM ngay sau khi hoàn thành dự án",
            "content": "Bấm Take Snapshot trên VirtualBox/VMware với tên 'Cap1-Project-Passed'. Đây sẽ là môi trường nền tảng sạch để bạn bước sang Cấp 2 học về quản trị tiến trình và Shell Scripting."
          }
        ]
      },
      "exercises": [
        {
          "level": "Dễ",
          "title": "Xác thực phân quyền và cấu trúc thư mục dự án",
          "problem": "Hãy viết các lệnh để kiểm tra xem trên máy chủ: (1) Thư mục `/opt/data-service` có đầy đủ 3 thư mục con `src`, `config`, `dist` hay không; (2) File `config/db.env` có chính xác quyền hạn `600` hay không.",
          "hint": "Sử dụng ls -ld và stat -c '%a' để kiểm tra quyền số bát phân.",
          "solutionCode": "# 1. Kiểm tra cấu trúc thư mục\nls -d /opt/data-service/{src,config,dist}\n\n# 2. Kiểm tra quyền bát phân của file cấu hình\nstat -c '%a %n' /opt/data-service/config/db.env",
          "solutionOutput": "/opt/data-service/src  /opt/data-service/config  /opt/data-service/dist\n600 /opt/data-service/config/db.env",
          "explanation": "Lệnh stat -c '%a' trích xuất chính xác mã bát phân (600) của tệp, giúp kịch bản tự động hóa xác thực tiêu chuẩn an ninh một cách chính xác tuyệt đối.",
          "annotations": [
            {
              "part": "stat -c '%a'",
              "text": "In ra quyền hạn tệp dưới dạng số bát phân 3 chữ số."
            }
          ],
          "rubric": [
            {
              "criterion": "Thiết lập hạ tầng FHS chuẩn",
              "pass": "Tạo cây thư mục /opt, /etc, /var/log đúng FHS",
              "excellent": "Phân quyền 750/640 và gán user pyrunner chính xác",
              "weight": "40%"
            },
            {
              "criterion": "Môi trường Python venv",
              "pass": "Cài đặt venv và thư viện không dùng --break-system-packages",
              "excellent": "Chạy dịch vụ ngầm với log redirection stdout/stderr",
              "weight": "30%"
            },
            {
              "criterion": "Khắc phục sự cố",
              "pass": "Chẩn đoán đúng nguyên nhân lỗi quyền và cổng mạng",
              "excellent": "Xử lý triệt để không làm ảnh hưởng các dịch vụ khác",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Xử lý sự cố: Script Python báo 'Permission denied' khi chạy",
          "problem": "Lập trình viên tạo script `/tmp/run_task.py`, gõ `./run_task.py` thì bị báo lỗi `bash: ./run_task.py: Permission denied`. Tuy nhiên khi gõ `python3 /tmp/run_task.py` thì chương trình chạy được bình thường. Hãy: (1) Giải thích tại sao có sự khác biệt này; (2) Đưa ra 2 câu lệnh khắc phục triệt để để người dùng có thể chạy trực tiếp `./run_task.py`.",
          "hint": "Xem lại Bài 1.6 về cờ execute và Bài 1.8 về dòng shebang.",
          "solutionCode": "# 1. Kiểm tra dòng đầu tiên xem có shebang chưa, nếu chưa có thì thêm vào\nhead -n 1 /tmp/run_task.py | grep -q '^#!' || sed -i '1i #!/usr/bin/env python3' /tmp/run_task.py\n\n# 2. Cấp quyền thực thi trực tiếp cho tệp\nchmod +x /tmp/run_task.py\n\n# 3. Chạy thử nghiệm trực tiếp\n/tmp/run_task.py",
          "solutionOutput": "-rwxr-xr-x 1 devops devops 125 Oct 28 11:35 /tmp/run_task.py",
          "explanation": "Khi gõ ./run_task.py, shell trực tiếp yêu cầu kernel thực thi tệp, đòi hỏi tệp phải có cờ x và shebang hợp lệ. Khi gõ python3 run_task.py, tệp binary /usr/bin/python3 mới là đối tượng thực thi, còn run_task.py chỉ là file dữ liệu đầu vào nên chỉ cần quyền đọc r.",
          "annotations": [
            {
              "part": "chmod +x",
              "text": "Bổ sung cờ thực thi bắt buộc cho tệp script."
            },
            {
              "part": "#!/usr/bin/env python3",
              "text": "Chỉ định trình thông dịch Python để kernel nhận diện."
            }
          ],
          "rubric": [
            {
              "criterion": "Giải thích đúng bản chất cơ chế nạp tiến trình của Kernel",
              "pass": "Phân biệt được chạy trực tiếp ./run_task.py cần quyền thực thi x, còn gọi python3 run_task.py thì python3 chỉ cần quyền đọc r",
              "excellent": "Phân tích rõ vai trò của dòng Shebang (#!/usr/bin/env python3) giúp Kernel biết trình thông dịch nào cần gọi trong syscall execve()",
              "weight": "50%"
            },
            {
              "criterion": "Câu lệnh khắc phục triệt để và tự động",
              "pass": "Cấp quyền chmod +x (hoặc 755/750) và bổ sung dòng shebang đầu tệp",
              "excellent": "Kiểm tra idempotent xem tệp đã có #! chưa trước khi chèn tự động bằng sed -i '1i #!/usr/bin/env python3'",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Tự động hóa kiểm tra tính toàn vẹn và triển khai gói nén",
          "problem": "Hãy viết một script shell ngắn tại `/tmp/deploy.sh` nhận đường dẫn file nén và file checksum làm tham số ($1 và $2). Script phải: (1) Kiểm tra mã băm SHA-256; (2) Nếu hợp lệ, giải nén vào thư mục `/opt/production_deploy` bằng cờ `-C` và in '[OK] Trien khai thanh cong'; (3) Nếu mã hash không khớp, hủy tiến trình lập tức, xóa file lỗi và in ra '[LỖI AN NINH] Ma hash khong khop'.",
          "hint": "Kết hợp sha256sum -c --status, tar -xzf ... -C và khối if/else.",
          "solutionCode": "#!/usr/bin/env bash\nPKG=\"${1:-/opt/data-service/dist/data-service-v1.0.tar.gz}\"\nSUM=\"${2:-/opt/data-service/dist/data-service-v1.0.tar.gz.sha256}\"\n\nif sha256sum -c --status \"$SUM\"; then\n  mkdir -p /opt/production_deploy\n  tar -xzf \"$PKG\" -C /opt/production_deploy\n  echo \"[OK] Trien khai thanh cong\"\nelse\n  echo \"[LOI AN NINH] Ma hash khong khop, huy bo!\" >&2\n  exit 1\nfi",
          "solutionOutput": "[OK] Trien khai thanh cong",
          "explanation": "Đây là mẫu kịch bản triển khai an toàn trong đường ống CI/CD: bảo vệ máy chủ sản xuất khỏi các bản dựng lỗi hoặc bị giả mạo trước khi bung nén vào hệ thống.",
          "annotations": [
            {
              "part": "sha256sum -c --status",
              "text": "Xác thực mã băm yên lặng phục vụ logic điều kiện rẽ nhánh."
            },
            {
              "part": "exit 1",
              "text": "Trả về mã lỗi thoát khác 0 để thông báo thất bại cho hệ thống CI/CD."
            }
          ],
          "rubric": [
            {
              "criterion": "Chốt chặn an ninh xác thực mã băm SHA-256 trước khi bung nén",
              "pass": "Kiểm tra điều kiện sha256sum -c thành công mới tiến hành chạy lệnh tar giải nén",
              "excellent": "Sử dụng sha256sum -c --status kết hợp nhận tham số động $1, $2 có giá trị mặc định an toàn",
              "weight": "50%"
            },
            {
              "criterion": "Xử lý nhánh lỗi chuẩn Unix (stderr & Exit Code)",
              "pass": "Giải nén đúng vào /opt/production_deploy bằng cờ -C và chặn giải nén khi sai hash",
              "excellent": "Khi phát hiện sai mã hash, xuất cảnh báo ra đúng kênh lỗi chuẩn (>&2) và kết thúc script với mã thoát khác 0 (exit 1) để chặn pipeline CI/CD",
              "weight": "50%"
            }
          ]
        }
      ],
      "summary": [
        "Triển khai ứng dụng sản xuất trên Linux đòi hỏi tuân thủ nghiêm ngặt chuẩn phân cấp FHS: Mã nguồn tại /opt, Cấu hình tại /etc, Nhật ký tại /var/log.",
        "Không bao giờ chạy ứng dụng dưới quyền root; luôn tạo tài khoản dịch vụ chuyên dụng bị khóa shell tương tác (/usr/sbin/nologin).",
        "Cô lập toàn bộ thư viện bằng Python Virtualenv (venv) để tuân thủ chuẩn PEP 668 và bảo vệ các thành phần cốt lõi của hệ điều hành.",
        "Phân quyền bảo mật theo nguyên tắc đặc quyền tối thiểu: Thư mục 750, Tệp mã nguồn 640, Tệp bí mật .env quyền 600.",
        "Luôn thiết lập quy trình sao lưu nén tự động (.tar.gz) đi kèm mã băm SHA256 để nghiệm thu và phục hồi thảm họa."
      ],
      "generalInfo": {
        "duration": "60 phút",
        "targetAudience": "Lập trình viên Python, Kỹ sư Hệ thống, DevOps",
        "prerequisites": "Đã hoàn thành toàn bộ bài 1.1 đến 1.9 của Cấp 1",
        "environment": "Ubuntu 22.04 LTS trên Máy ảo VM độc lập (có quyền sudo)",
        "materials": "Terminal, quyền sudo, snapshot máy ảo mang tên 'Pre-Project-1.10'"
      },
      "nextLessonPreview": "Trong bài học tổng kết cuối cùng của Cấp 1 (1.11), chúng ta sẽ trang bị Bảng Tra cứu Nhanh 50 Lệnh Sinh tồn & Từ điển Thuật ngữ Linux cốt lõi — chiếc la bàn bỏ túi sẵn sàng cùng bạn tiến lên Cấp 2.",
      "quiz": [
        {
          "question": "Tại sao tài khoản dịch vụ ứng dụng web (ví dụ `pyrunner`) nên được tạo với tùy chọn `-s /usr/sbin/nologin`?",
          "options": [
            "Để ngăn chặn việc đăng nhập vào hệ điều hành bằng mật khẩu từ bàn phím hoặc SSH, khóa chặt cửa xâm nhập nếu ứng dụng bị hack.",
            "Vì tài khoản này không được phép dùng Internet.",
            "Vì Linux giới hạn chỉ có 1 tài khoản được có shell.",
            "Vì lệnh nologin giúp ứng dụng chạy nhanh hơn gấp đôi."
          ],
          "correctIndex": 0,
          "explanation": "Khóa shell đăng nhập (/usr/sbin/nologin) là tiêu chuẩn vàng của CIS Benchmark để ngăn chặn kẻ tấn công leo thang từ lỗ hổng ứng dụng ra shell hệ điều hành."
        },
        {
          "question": "Vị trí nào sau đây là chuẩn mực FHS 3.0 để lưu trữ tệp cấu hình chứa chuỗi kết nối cơ sở dữ liệu (`.env`) của ứng dụng chạy trên máy chủ?",
          "options": [
            "/tmp/.env",
            "/etc/pyapp/.env (phân quyền 640 hoặc 600)",
            "/root/.env",
            "/usr/bin/.env"
          ],
          "correctIndex": 1,
          "explanation": "/etc/<app> là nơi lưu cấu hình toàn hệ thống chuẩn FHS; phân quyền 600/640 đảm bảo chỉ owner hoặc nhóm dịch vụ mới đọc được mật khẩu."
        },
        {
          "question": "Khi ứng dụng FastAPI gặp lỗi `Address already in use :8000`, lệnh nào giúp bạn tìm ra chính xác PID của tiến trình đang chiếm cổng?",
          "options": [
            "ls -la :8000",
            "ss -tulpn | grep 8000 (hoặc lsof -i :8000)",
            "cat /proc/8000",
            "uname -p 8000"
          ],
          "correctIndex": 1,
          "explanation": "ss (Socket Statistics) với cờ -tulpn hoặc lsof -i :8000 hiển thị danh sách socket mạng đang lắng nghe kèm PID và tên tiến trình sở hữu."
        }
      ],
      "reflectionQuestion": "Sau khi triển khai xong dự án, sếp của bạn yêu cầu: 'Hãy cấp quyền cho tôi đăng nhập SSH trực tiếp vào máy chủ bằng tài khoản `pyrunner` để tôi vào chỉnh sửa file code cho tiện'. Bạn sẽ phản hồi ra sao dưới góc độ Kỹ sư Vận hành & Bảo mật?",
      "reflectionHint": "Gợi ý: Từ chối khéo léo và giải thích rủi ro bảo mật: `pyrunner` là tài khoản dịch vụ bị khóa shell tương tác để tuân thủ CIS Benchmark; việc đăng nhập trực tiếp sẽ xóa bỏ ranh giới trách nhiệm kiểm toán (Audit trail). Đề xuất giải pháp chuẩn: Sếp nên đăng nhập bằng tài khoản cá nhân có gắn SSH Key riêng, và triển khai quy trình CI/CD hoặc dùng `sudo` được cấu hình kiểm soát qua `visudo` để chỉnh sửa file."
    },
    {
      "id": "lx-1-11",
      "number": "1.11",
      "title": "Bảng Tra cứu Nhanh Lệnh & Từ điển Thuật ngữ Linux (Cấp 1 Cheat Sheet & Glossary)",
      "subtitle": "Cẩm nang tra cứu cú pháp chuẩn mực, cột cảnh báo an toàn và từ điển thuật ngữ đối chiếu bài học",
      "level": "Tra cứu",
      "duration": "30 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "1. [Biết - Remember] Nhớ bảng tra cứu nhanh 50 câu lệnh sinh tồn Cấp 1 phân theo 6 nhóm nghiệp vụ: Tra cứu, Điều hướng, Thao tác tệp, Phân quyền, Quản lý gói, I/O & Nén.",
        "2. [Hiểu - Understand] Giải thích tường tận 20 thuật ngữ cốt lõi chuẩn quốc tế (Kernel, Ring 0/3, Syscall, FHS, Inode, Symlink, UsrMerge, PEP 668, umask, File Descriptor).",
        "3. [Vận dụng - Apply] Vận dụng bảng ánh xạ câu lệnh tương đương giữa 3 họ Distro (Debian, RHEL, Arch) để thao tác mượt mà trên bất kỳ hạ tầng đám mây nào.",
        "4. [Phân tích - Analyze] Đánh giá bảng danh mục 10 lệnh cấm tuyệt đối trên môi trường sản xuất (Dangerous Commands) và thiết lập thói quen làm việc an toàn chuẩn quốc tế."
      ],
      "intuition": {
        "title": "Chiếc La bàn Bỏ túi của Thuyền trưởng Vượt Biển Lớn",
        "metaphor": "Khi kết thúc Cấp 1, bạn đã nắm vững toàn bộ kiến thức sinh tồn cơ bản trên hệ điều hành Linux. Bài 1.11 này chính là chiếc 'La bàn Sinh tồn Bỏ túi': tóm tắt toàn bộ 50 câu lệnh quan trọng nhất thành một trang tra cứu nhanh duy nhất, kèm bảng từ điển giải nghĩa các thuật ngữ kỹ thuật quốc tế chuẩn xác. Bất cứ khi nào bạn bế tắc, quên cú pháp hay gặp thông báo lỗi lạ trên server, hãy mở bài học này như một cẩm nang cứu cánh tức thì.",
        "boundary": "Bảng tra cứu tóm tắt cú pháp cốt lõi thường dùng nhất trong thực tế (80/20); để xem toàn bộ 100+ cờ tùy chọn chuyên sâu của từng lệnh, hãy luôn kết hợp với lệnh `man <tên_lệnh>`.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🧭</span><span>CẨM NANG BỎ TÚI CẤP 1</span><span class=\"lx-vs-tag\">Quick Reference</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>50 Lệnh cốt lõi:</strong> Tra cứu, file, thư mục, quyền, gói, luồng I/O, nén.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bảng thuật ngữ:</strong> Giải thích chuẩn xác nghĩa Anh - Việt.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bảng chống tai họa:</strong> 10 lệnh cấm kỵ trên máy chủ sản xuất.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🎓</span><span>CHỨNG CHỈ QUỐC TẾ</span><span class=\"lx-vs-tag\">LPIC-1 &amp; LFCS</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Bao phủ trọn vẹn Topic 101, 102, 103 của kỳ thi LPI LPIC-1.</li><li><span class=\"lx-vs-bullet\">•</span> Nền tảng vững chắc để tự tin bước sang Cấp 2: Quản trị Trung cấp &amp; Vận hành Dịch vụ.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-theory",
          "title": "4. Nội dung Lý thuyết Trọng tâm: Bảng Tra cứu 50 Lệnh Sinh tồn & Ma trận Thuật ngữ",
          "content": "<p>Chúc mừng bạn đã hoàn thành hành trình 10 bài học của Cấp 1! Bảng tra cứu dưới đây là tài sản kiến thức tổng hợp sẵn sàng phục vụ công việc hàng ngày của bạn.</p>\n    \n<div class=\"table-responsive\">\n  <table class=\"lesson-table lx-command-table\">\n    <thead><tr><th>Nhóm Nghiệp vụ</th><th>Các lệnh Cốt lõi Cần nhớ</th><th>Cú pháp Thực chiến Tiêu biểu</th><th>Tình huống Sử dụng</th></tr></thead>\n    <tbody>\n      <tr><td>Tra cứu & Trợ giúp</td><td><code>man</code>, <code>type</code>, <code>which</code>, <code>apropos</code>, <code>--help</code></td><td><code>type -a &lt;cmd&gt;</code>; <code>man 5 passwd</code></td><td>Giải mã bản chất lệnh và tra cứu cấu trúc file cấu hình.</td></tr>\n      <tr><td>Thao tác Tệp & Thư mục</td><td><code>pwd</code>, <code>ls</code>, <code>cd</code>, <code>mkdir</code>, <code>cp</code>, <code>mv</code>, <code>rm</code>, <code>ln</code></td><td><code>mkdir -p</code>; <code>cp -a</code>; <code>ln -s</code>; <code>ls -lah -i</code></td><td>Điều hướng, sao lưu giữ nguyên quyền và quản lý liên kết Inode.</td></tr>\n      <tr><td>Xem & Soạn thảo</td><td><code>cat</code>, <code>less</code>, <code>head</code>, <code>tail</code>, <code>nano</code>, <code>vim</code></td><td><code>less &lt;file&gt;</code>; <code>tail -F &lt;log&gt;</code>; <code>vim (:wq!)</code></td><td>Theo dõi log trực tiếp không nghẽn RAM, sửa cấu hình sinh tồn.</td></tr>\n      <tr><td>Phân quyền & Đặc quyền</td><td><code>chmod</code>, <code>chown</code>, <code>chgrp</code>, <code>umask</code>, <code>sudo</code>, <code>visudo</code></td><td><code>chmod 750</code>; <code>chmod 640</code>; <code>sudo visudo</code></td><td>Bảo vệ thư mục ứng dụng, quản lý quyền root an toàn.</td></tr>\n      <tr><td>Quản lý Gói 3 Họ</td><td><code>apt</code>, <code>dnf</code>, <code>pacman</code>, <code>python3 -m venv</code></td><td><code>apt update && apt install</code>; <code>source .venv/bin/activate</code></td><td>Cài đặt tiện ích OS và cô lập thư viện tuân thủ PEP 668.</td></tr>\n      <tr><td>I/O, Pipe & Biến môi trường</td><td><code>&gt;</code>, <code>&gt;&gt;</code>, <code>2&gt;</code>, <code>|</code>, <code>export</code>, <code>env</code></td><td><code>lệnh 2&gt;/dev/null | grep</code>; <code>echo &gt;&gt; ~/.bashrc</code></td><td>Lắp ráp đường ống lọc dữ liệu và lưu cấu hình shell vĩnh viễn.</td></tr>\n      <tr><td>Nén & Kiểm tra toàn vẹn</td><td><code>tar</code>, <code>gzip</code>, <code>xz</code>, <code>sha256sum</code></td><td><code>tar -czvf</code>; <code>tar -xzvf -C</code>; <code>sha256sum -c</code></td><td>Đóng gói bản sao lưu và xác thực tệp chống lỗi truyền mạng.</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "codeExamples": [
            {
              "title": "Quy trình 3 bước xử lý nhanh bất kỳ sự cố dòng lệnh nào trên máy chủ",
              "lang": "Bash",
              "code": "# Bước 1: Xác định bản chất lệnh và môi trường hiện tại\ntype -a <lenh>\nsystemd-detect-virt\n\n# Bước 2: Kiểm tra dung lượng phân vùng và Inode còn trống\ndf -h /\ndf -i /\n\n# Bước 3: Tra cứu tài liệu chuẩn và quyền hạn thực thi\nman 1 <lenh> 2>/dev/null || man 5 <lenh>\nsudo -l",
              "output": "-> Quy trình chẩn đoán chuẩn mực 100% giúp kỹ sư luôn làm chủ tình hình.",
              "annotations": [
                {
                  "line": 2,
                  "text": "type -a giúp loại bỏ nghi ngờ về alias giả mạo hoặc xung đột binary."
                },
                {
                  "line": 6,
                  "text": "df -h và df -i loại bỏ 80% nguyên nhân sự cố do đầy đĩa hoặc cạn Inode."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-11-cheatsheet-fs-perm",
          "title": "4.1 Bảng Tra cứu Tốc độ Cao: Điều hướng FHS, Thao tác Inode & Ma trận Phân quyền",
          "content": "<p>Để phục vụ tra cứu tức thời trước giờ phỏng vấn kỹ thuật, kỳ thi chứng chỉ quốc tế (LPIC-1 / LFCS) hoặc ca trực vận hành máy chủ, tiểu mục này chắt lọc các tổ hợp cờ \"chuẩn vàng\" cho nhóm thao tác Tệp tin, Inode và Phân quyền:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Tác vụ Thực chiến</th><th>Câu lệnh Chuẩn mực Khuyên dùng</th><th>Ý nghĩa Kỹ thuật Cốt lõi</th></tr>\n        </thead>\n        <tbody>\n          <tr><td>Xem danh sách tệp kèm file ẩn &amp; số Inode</td><td><code>ls -lahi</code></td><td><code>-l</code> chi tiết, <code>-a</code> file ẩn, <code>-h</code> đơn vị KB/MB/GB, <code>-i</code> số hiệu Inode</td></tr>\n          <tr><td>Sao lưu cấu hình bảo toàn 100% metadata</td><td><code>sudo cp -a /etc/nginx /etc/nginx.bak</code></td><td>Giữ nguyên quyền <code>rwx</code>, chủ sở hữu, timestamps và không phá vỡ symlink</td></tr>\n          <tr><td>Cập nhật Symlink phiên bản mới nguyên tử</td><td><code>ln -sfn /opt/releases/v2 /opt/current</code></td><td><code>-n</code> ngăn chui vào trong thư mục đích cũ, hoán đổi con trỏ tức thời</td></tr>\n          <tr><td>Phân quyền chuẩn cho Thư mục &amp; Tệp dự án</td><td><code>chmod 750 &lt;dir&gt; &amp;&amp; chmod 640 &lt;.env&gt;</code></td><td>Chủ toàn quyền, nhóm cùng dự án chỉ đọc/vào, người ngoài bị chặn 100%</td></tr>\n          <tr><td>Soi đứt gãy quyền xuyên suốt cây thư mục</td><td><code>namei -l /var/www/app/index.html</code></td><td>Kiểm tra từng mắt xích thư mục cha từ <code>/</code> xem tầng nào thiếu bit <code>x</code></td></tr>\n          <tr><td>Cấp quyền sudo an toàn theo module rời</td><td><code>sudo visudo -f /etc/sudoers.d/appadmin</code></td><td>Kiểm tra cú pháp tự động trước khi lưu, tránh tai nạn mất quyền root</td></tr>\n        </tbody>\n      </table>\n    </div>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Tổ hợp lệnh kiểm toán nhanh phân quyền và định danh máy chủ trong 5 giây",
              "code": "# One-liner thu thập hồ sơ nhanh khi vừa đăng nhập vào một máy chủ bất kỳ\necho \"[OS]     $(grep '^PRETTY_NAME=' /etc/os-release | cut -d= -f2)\"\necho \"[KERNEL] $(uname -srm) | Virt: $(systemd-detect-virt || true)\"\necho \"[DISK /] $(df -h / | awk 'NR==2 {print $3 \"/\" $2 \" (\" $5 \")\"}')\"",
              "output": "[OS]     \"Ubuntu 24.04.1 LTS\"\n[KERNEL] Linux 6.8.0-45-generic x86_64 | Virt: kvm\n[DISK /] 12G/50G (25%)",
              "annotations": [
                {
                  "line": 2,
                  "part": "cut -d= -f2",
                  "text": "Tách dòng PRETTY_NAME=\"Ubuntu...\" theo dấu '=' và lấy phần giá trị ở cột thứ 2."
                },
                {
                  "line": 4,
                  "part": "df -h / | awk ...",
                  "text": "Tóm tắt gọn dung lượng Đã dùng / Tổng dung lượng và Phần trăm chiếm dụng của phân vùng gốc /."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-11-cheatsheet-io-pkg",
          "title": "4.2 Bảng Tra cứu Luồng I/O, Đường ống Pipe, Quản lý Gói Đa Distro & Đóng gói Nén",
          "content": "<p>Bảng đối chiếu ngang dưới đây giúp bạn chuyển đổi phản xạ tức thì giữa 3 họ bản phân phối Linux lớn nhất cũng như nắm chắc cú pháp điều hướng luồng I/O:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>Nghiệp vụ Hệ thống</th><th>Debian / Ubuntu</th><th>RHEL / Rocky / Fedora</th><th>Arch Linux</th></tr>\n        </thead>\n        <tbody>\n          <tr><td><strong>Đồng bộ &amp; Nâng cấp hệ thống</strong></td><td><code>sudo apt update &amp;&amp; sudo apt upgrade</code></td><td><code>sudo dnf upgrade</code></td><td><code>sudo pacman -Syu</code></td></tr>\n          <tr><td><strong>Cài đặt gói mới</strong></td><td><code>sudo apt install &lt;pkg&gt;</code></td><td><code>sudo dnf install &lt;pkg&gt;</code></td><td><code>sudo pacman -S &lt;pkg&gt;</code></td></tr>\n          <tr><td><strong>Gỡ sạch kèm cấu hình &amp; mồ côi</strong></td><td><code>sudo apt purge &lt;pkg&gt; &amp;&amp; sudo apt autoremove</code></td><td><code>sudo dnf remove &lt;pkg&gt; &amp;&amp; sudo dnf autoremove</code></td><td><code>sudo pacman -Rns &lt;pkg&gt;</code></td></tr>\n          <tr><td><strong>Truy vấn tệp thuộc về gói nào</strong></td><td><code>dpkg -S /path/to/file</code></td><td><code>rpm -qf /path/to/file</code></td><td><code>pacman -Qo /path/to/file</code></td></tr>\n          <tr><td><strong>Liệt kê toàn bộ gói đã cài</strong></td><td><code>apt list --installed</code></td><td><code>dnf list installed</code></td><td><code>pacman -Q</code></td></tr>\n        </tbody>\n      </table>\n    </div>\n    <p><strong>Công thức Đường ống &amp; Lưu trữ nằm lòng:</strong> Gộp cả chuẩn và lỗi vào log: <code>cmd &gt; run.log 2&gt;&amp;1</code>; vừa lưu file vừa xem/đếm trực tiếp: <code>cmd | tee out.log</code>; đóng gói nén sạch: <code>tar -czf backup.tar.gz -C /nguon thu_muc</code>; kiểm tra rồi mới bung vào đích cô lập: <code>tar -tzf backup.tar.gz &amp;&amp; tar -xzf backup.tar.gz -C /dich</code>.</p>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Mẫu tự động nhận diện họ Distro để gọi đúng trình quản lý gói trong Script đa nền tảng",
              "code": "# Đọc biến ID và ID_LIKE từ /etc/os-release để chọn lệnh quản lý gói tương thích\n. /etc/os-release\nif [[ \"$ID\" == \"ubuntu\" || \"$ID_LIKE\" == *\"debian\"* ]]; then\n  echo \"Detected Debian/Ubuntu family -> Package manager: apt\"\nelif [[ \"$ID\" == \"rhel\" || \"$ID_LIKE\" == *\"rhel\"* || \"$ID\" == \"fedora\" ]]; then\n  echo \"Detected RHEL/Fedora family -> Package manager: dnf\"\nelif [[ \"$ID\" == \"arch\" || \"$ID_LIKE\" == *\"arch\"* ]]; then\n  echo \"Detected Arch family -> Package manager: pacman\"\nfi",
              "output": "Detected Debian/Ubuntu family -> Package manager: apt",
              "annotations": [
                {
                  "line": 2,
                  "part": ". /etc/os-release",
                  "text": "Dấu chấm '.' (tương đương lệnh source) nạp trực tiếp các cặp khóa=giá_trị trong /etc/os-release thành biến Shell."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-1-11-antipatterns-checklist",
          "title": "4.3 Danh mục 7 Đại Kỵ Dòng lệnh (\"Linux Anti-Patterns\") & Giải pháp Thay thế An toàn",
          "content": "<p>Trước khi bước sang Cấp 2 (Quản trị Trung cấp &amp; Tự động hóa), hãy khắc cốt ghi tâm bảng đối chiếu <strong>7 thói quen nguy hiểm cần loại bỏ vĩnh viễn</strong> khỏi phản xạ gõ phím của bạn:</p>\n    <div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead>\n          <tr><th>#</th><th>Thói quen Nguy hiểm (Anti-Pattern)</th><th>Hậu quả Thực tế trên Server</th><th>Chuẩn Thực hành An toàn (Best Practice)</th></tr>\n        </thead>\n        <tbody>\n          <tr><td>1</td><td><code>chmod -R 777 /var/www</code></td><td>Mọi tiến trình bị chiếm quyền đều xóa/cài mã độc được vào web root; SSH từ chối khóa</td><td>Thư mục <code>750</code>/<code>755</code>, tệp <code>640</code>/<code>644</code>, sửa đúng chủ sở hữu bằng <code>chown</code></td></tr>\n          <tr><td>2</td><td><code>rm -rf $TARGET/*</code></td><td>Nếu biến <code>$TARGET</code> rỗng chưa gán, lệnh biến thành <code>rm -rf /*</code> xóa sổ hệ thống!</td><td>Luôn chặn biến rỗng bằng <code>rm -rf \"${TARGET:?Chua khai bao}/*\"</code></td></tr>\n          <tr><td>3</td><td><code>sudo pip install &lt;pkg&gt;</code></td><td>Ghi đè thư viện Python của OS, làm hỏng <code>ufw</code>, <code>apt</code>, vi phạm PEP 668</td><td>Luôn dùng <code>python3 -m venv .venv</code> hoặc <code>pipx</code> cho CLI</td></tr>\n          <tr><td>4</td><td><code>cat huge_access.log</code></td><td>Đổ hàng chục GB chữ làm treo phiên SSH và tràn bộ nhớ Terminal</td><td>Dùng <code>less -S</code>, <code>head</code>, hoặc <code>tail -F</code></td></tr>\n          <tr><td>5</td><td><code>sudo vim /etc/sudoers</code></td><td>Lưu nhầm 1 lỗi cú pháp làm khóa chết quyền <code>sudo</code> toàn máy chủ</td><td>Bắt buộc dùng <code>sudo visudo</code> hoặc tách tệp <code>/etc/sudoers.d/</code></td></tr>\n          <tr><td>6</td><td><code>tail -f /var/log/app.log</code></td><td>Mất dấu log mới ngay sau thời điểm <code>logrotate</code> xoay vòng tệp lúc nửa đêm</td><td>Luôn dùng <code>tail -F</code> (chữ F hoa bám theo tên tệp và tự mở lại)</td></tr>\n          <tr><td>7</td><td><code>tar -xzf unknown.tar.gz</code></td><td>Dính Tarbomb bung hàng nghìn tệp rác hoặc đè mất tệp ở thư mục hiện tại</td><td>Soi trước bằng <code>tar -tzf</code> và giải nén cô lập kèm cờ <code>-C /thu_muc_dich</code></td></tr>\n        </tbody>\n      </table>\n    </div>",
          "codeExamples": [
            {
              "lang": "Bash",
              "title": "Chứng minh cơ chế bảo vệ sinh mệnh của toán tử ${VAR:?thong_bao_loi} chống biến rỗng",
              "code": "# Giả lập biến DIR bị rỗng do lỗi gõ nhầm tên biến -> Bash lập tức phanh gấp không chạy lệnh echo/rm!\n(\n  DIR=\"\"\n  echo \"Xoa thu muc: ${DIR:?LOI NGHIEM TRONG - Bien DIR dang rong, huy lenh ngay!}/*\"\n) 2>&1 || true",
              "output": "bash: line 3: DIR: LOI NGHIEM TRONG - Bien DIR dang rong, huy lenh ngay!",
              "annotations": [
                {
                  "line": 4,
                  "part": "${DIR:?...}",
                  "text": "Cú pháp chuẩn POSIX: nếu biến DIR chưa khai báo hoặc bằng chuỗi rỗng \"\", Shell lập tức dừng lệnh hiện tại và in thông báo lỗi ra stderr!"
                }
              ]
            }
          ]
        },
        {
          "id": "sec-demo",
          "title": "5. Demo Thao tác Mẫu trên Terminal & So sánh Lệnh Đúng vs Sai",
          "content": "<div class=\"lx-demo-card\">\n      <p><strong>Demo Giảng viên:</strong> Quy trình thẩm định an toàn trước khi thực thi lệnh đặc quyền.</p>\n      <div class=\"lx-diff-grid\">\n        <div class=\"lx-diff-col wrong\">\n          <div class=\"lx-diff-title\">❌ Lệnh Cực Kỳ Nguy Hiểm Trên Server</div>\n          <p>Chạy <code>chmod -R 777 /</code> hoặc <code>rm -rf /tmp/ *</code> (dấu cách giữa /tmp/ và *).</p>\n          <p><strong>Hậu quả:</strong> Làm tê liệt toàn bộ phân quyền bảo mật, xóa sạch toàn bộ hệ điều hành trong vài giây.</p>\n        </div>\n        <div class=\"lx-diff-col correct\">\n          <div class=\"lx-diff-title\">✅ Lệnh Đúng Chuẩn Quốc Tế</div>\n          <p>Luôn dùng đường dẫn tuyệt đối tường minh và cờ bảo vệ:</p>\n          <p><code>chmod 750 /var/www/app && rm -i /tmp/test.log</code></p>\n          <p><strong>Ưu điểm:</strong> Tuân thủ đặc quyền tối thiểu, có chốt chặn xác nhận trước khi xóa.</p>\n        </div>\n      </div>\n      <h3>⚠️ Danh Mục 5 Lệnh Cấm Tuyệt Đối Trên Máy Chủ Sản Xuất</h3>\n      <div class=\"table-responsive\">\n        <table class=\"lesson-table\">\n          <thead><tr><th>Lệnh Cực Kỳ Nguy Hiểm</th><th>Hậu quả Huỷ diệt</th><th>Cách thay thế An toàn</th></tr></thead>\n          <tbody>\n            <tr><td><code>rm -rf /</code> hoặc <code>rm -rf /*</code></td><td>Xóa sạch toàn bộ hệ điều hành trong vài giây.</td><td>Dùng đường dẫn cụ thể, kiểm tra trước bằng <code>ls</code>.</td></tr>\n            <tr><td><code>chmod -R 777 /</code></td><td>Xóa bỏ toàn bộ rào cản bảo mật, làm tê liệt <code>sudo</code> và SSH.</td><td>Chỉ cấp quyền tối thiểu cần thiết cho đúng user/group.</td></tr>\n            <tr><td><code>:(){ :|:& };:</code> (Fork Bomb)</td><td>Tự nhân bản vô tận tiến trình làm cạn kiệt bảng process table, treo cứng máy.</td><td>Cấu hình giới hạn <code>nproc</code> trong <code>/etc/security/limits.conf</code>.</td></tr>\n            <tr><td><code>mkfs.ext4 /dev/sda</code></td><td>Định dạng lại ổ đĩa thô, xóa sạch bảng phân vùng.</td><td>Kiểm tra kỹ bằng <code>lsblk</code> trước khi can thiệp ổ cứng.</td></tr>\n            <tr><td><code>mv /etc /tmp</code></td><td>Di chuyển thư mục cấu hình cốt lõi khiến OS không thể chạy tiếp.</td><td>Chỉ sao chép tệp đơn lẻ có chỉ định rõ ràng.</td></tr>\n          </tbody>\n        </table>\n      </div>\n    </div>"
        },
        {
          "id": "sec-lab",
          "title": "6. Thực hành Lab: Thử thách Tra cứu Tốc độ Cao & Giải mã Lỗi Hệ thống",
          "content": "<div class=\"lx-lab-box\">\n      <div class=\"lx-lab-badge\">🧪 Hands-on Lab 1.11</div>\n      <h3>Mục tiêu Lab</h3>\n      <p>Thực hiện bài kiểm tra phản xạ tra cứu: tìm nhanh lệnh giải quyết bài toán và giải mã lỗi trong thời gian ngắn nhất.</p>\n      <h4>Môi trường & Dữ liệu đầu vào</h4>\n      <p>Bất kỳ terminal Linux nào.</p>\n      <h4>Các bước thực hiện có hướng dẫn</h4>\n      <ol>\n        <li><strong>Bước 1:</strong> Tìm lệnh hiển thị cây thư mục trực quan: <code>apropos \"directory tree\"</code> &rarr; phát hiện lệnh <code>tree</code>.</li>\n        <li><strong>Bước 2:</strong> Kiểm tra xem <code>tree</code> đã cài chưa: <code>which tree || echo \"Chua cai dat\"</code>.</li>\n        <li><strong>Bước 3:</strong> Tra cứu nhanh cách giới hạn độ sâu 2 cấp của <code>tree</code>: <code>tree --help | grep -i depth</code> &rarr; tìm thấy cờ <code>-L 2</code>.</li>\n      </ol>\n      <h4>Kết quả mong đợi & Lệnh xác minh</h4>\n      <pre class=\"output-pre\">tree -L 2 /etc/nginx\n-> Cây thư mục hiển thị đẹp mắt đúng 2 cấp độ sâu.</pre>\n      <h4>Bài tập mở rộng (Challenge)</h4>\n      <p>Viết một dòng lệnh kết hợp <code>grep</code>, <code>cut</code> và <code>sort</code> để trích xuất toàn bộ tên người dùng có UID >= 1000 trong <code>/etc/passwd</code>.</p>\n      <div class=\"lx-safety-notice\">\n        <strong>⚠️ Lưu ý an toàn hệ thống:</strong> Giữ gìn thói quen gõ lệnh chậm rãi, kiểm tra kỹ đường dẫn trước khi nhấn phím Enter.\n      </div>\n    </div>"
        },
        {
          "id": "sec-troubleshoot",
          "title": "7. Lỗi Thường Gặp & Quy trình Chẩn đoán Khắc phục",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Dạng Lỗi Điển hình</th><th>Nguyên nhân cốt lõi</th><th>Biện pháp khắc phục nhanh</th></tr></thead>\n        <tbody>\n          <tr><td>Gõ sai cú pháp cờ tùy chọn</td><td>Nhầm lẫn giữa cờ ngắn 1 dấu gạch ngang (<code>-a</code>) và cờ dài 2 dấu gạch ngang (<code>--all</code>).</td><td>Kiểm tra nhanh bằng <code>&lt;cmd&gt; --help | head -n 20</code>.</td></tr>\n          <tr><td>Lỗi biến môi trường không nhận</td><td>Quên chạy lệnh <code>source ~/.bashrc</code> sau khi sửa file cấu hình.</td><td>Chạy <code>source ~/.bashrc</code> hoặc mở phiên terminal mới.</td></tr>\n          <tr><td>Kẹt phiên làm việc không thoát được</td><td>Tiến trình đang chạy ở chế độ foreground (tiền cảnh).</td><td>Nhấn <code>Ctrl + C</code> để hủy tiến trình hoặc <code>Ctrl + Z</code> để đẩy vào background.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        },
        {
          "id": "sec-security",
          "title": "8. Best Practices & Nguyên tắc Bảo mật Hệ thống Vận hành",
          "content": "<div class=\"lx-security-box\">\n      <ul>\n        <li><strong>Bộ 3 Thói quen Sinh tồn của SysAdmin:</strong> (1) Tạo snapshot VM trước việc lớn; (2) Dùng <code>cp -a file file.bak</code> trước khi sửa; (3) Luôn gõ <code>pwd</code> và <code>whoami</code> để biết mình là ai và đang đứng ở đâu trước khi chạy lệnh phá hủy.</li>\n        <li><strong>Tập thói quen dùng đường dẫn tuyệt đối trong script tự động:</strong> Không dựa dẫm vào đường dẫn tương đối khi viết cron job hoặc systemd service.</li>\n      </ul>\n    </div>"
        },
        {
          "id": "sec-resources",
          "title": "11. Tài nguyên Mở rộng & Đọc thêm Chuẩn Quốc tế",
          "content": "<ul>\n      <li><strong>Linux Journey:</strong> <a href=\"https://linuxjourney.com/\" target=\"_blank\" rel=\"noopener\">Linux Journey (Free & Open Source Learning)</a>.</li>\n      <li><strong>OverTheWire Bandit Wargame:</strong> <a href=\"https://overthewire.org/wargames/bandit/\" target=\"_blank\" rel=\"noopener\">OverTheWire Bandit</a> — Đấu trường thực hành dòng lệnh Linux qua các level bảo mật cực kỳ cuốn hút.</li>\n    </ul>"
        },
        {
          "id": "sec-appendix",
          "title": "12. Phụ lục: Từ điển 20 Thuật ngữ Linux Cốt lõi (Glossary A-Z)",
          "content": "<div class=\"table-responsive\">\n      <table class=\"lesson-table\">\n        <thead><tr><th>Thuật ngữ Tiếng Anh</th><th>Định nghĩa Kỹ thuật Chuẩn Quốc tế</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Bash (Bourne Again Shell)</strong></td><td>Trình thông dịch dòng lệnh mặc định phổ biến nhất trên Linux.</td></tr>\n          <tr><td><strong>Distro (Distribution)</strong></td><td>Hệ điều hành hoàn chỉnh đóng gói Kernel cùng GNU tools và bộ quản lý gói.</td></tr>\n          <tr><td><strong>FHS (Filesystem Hierarchy Standard)</strong></td><td>Quy chuẩn quốc tế về phân cấp và vị trí lưu trữ file trên Linux.</td></tr>\n          <tr><td><strong>File Descriptor (FD)</strong></td><td>Mã số nguyên không âm đại diện cho một luồng tệp mở (0: stdin, 1: stdout, 2: stderr).</td></tr>\n          <tr><td><strong>Inode (Index Node)</strong></td><td>Cấu trúc dữ liệu lưu metadata của tệp tin trên hệ thống file đĩa cứng.</td></tr>\n          <tr><td><strong>Kernel</strong></td><td>Nhân hệ điều hành chạy tại Ring 0, độc quyền điều khiển phần cứng.</td></tr>\n          <tr><td><strong>PEP 668</strong></td><td>Chuẩn bảo vệ môi trường Python của hệ điều hành khỏi sự can thiệp của pip global.</td></tr>\n          <tr><td><strong>Pipe (<code>|</code>)</strong></td><td>Cơ chế truyền luồng dữ liệu stdout sang stdin qua bộ đệm RAM.</td></tr>\n          <tr><td><strong>Root (<code>/</code> vs <code>root user</code>)</strong></td><td><code>/</code> là thư mục gốc cao nhất; <code>root</code> là siêu người dùng quản trị tối cao (UID 0).</td></tr>\n          <tr><td><strong>Sticky Bit (<code>t</code>)</strong></td><td>Cờ đặc quyền trên thư mục chia sẻ (như /tmp), chỉ owner mới được xóa tệp của mình.</td></tr>\n          <tr><td><strong>Symlink (Symbolic Link)</strong></td><td>Tệp liên kết mềm chứa đường dẫn trỏ tới tệp hoặc thư mục khác.</td></tr>\n          <tr><td><strong>Umask</strong></td><td>Mặt nạ nhị phân quy định quyền truy cập mặc định khi tệp/thư mục vừa được tạo.</td></tr>\n          <tr><td><strong>UsrMerge</strong></td><td>Chuẩn hiện đại hợp nhất /bin, /sbin, /lib vào bên trong /usr thông qua symlink.</td></tr>\n          <tr><td><strong>Virtualenv (venv)</strong></td><td>Môi trường ảo cô lập thư viện Python độc lập theo từng dự án.</td></tr>\n        </tbody>\n      </table>\n    </div>"
        }
      ],
      "exercises": [
        {
          "level": "Dễ",
          "title": "Tra cứu nhanh lệnh và phân vùng man",
          "problem": "Khi bạn cần tra cứu cú pháp của tệp cấu hình `/etc/hosts`, câu lệnh nào sau đây là chuẩn xác nhất để mở đúng sổ tay định dạng file thay vì mở lệnh người dùng?",
          "hint": "Xem lại Section 5 trong bảng phân vùng man.",
          "solutionCode": "man 5 hosts",
          "solutionOutput": "HOSTS(5)                 File Formats Manual                HOSTS(5)",
          "explanation": "Section 5 là phân vùng dành riêng cho File Formats (định dạng tệp cấu hình). Gõ 'man 5 hosts' giúp mở thẳng hướng dẫn cú pháp của file /etc/hosts.",
          "annotations": [
            {
              "part": "man 5 hosts",
              "text": "Chỉ định rõ Section 5 để tra cứu cú pháp file."
            }
          ],
          "rubric": [
            {
              "criterion": "Tra cứu tốc độ cao",
              "pass": "Tìm đúng lệnh và cờ trong sổ tay hệ thống",
              "excellent": "Trích xuất thông tin nhanh không cần tìm kiếm trên web",
              "weight": "40%"
            },
            {
              "criterion": "Độ chính xác kỹ thuật",
              "pass": "Giải thích đúng 100% các thuật ngữ FHS, Inode, umask",
              "excellent": "Phân tích được rủi ro của các lệnh nguy hiểm",
              "weight": "30%"
            },
            {
              "criterion": "Tư duy vận hành an toàn",
              "pass": "Nắm vững bộ 3 thói quen sinh tồn",
              "excellent": "Sẵn sàng áp dụng cho các bài lab dịch vụ Cấp 2",
              "weight": "30%"
            }
          ]
        },
        {
          "level": "Trung bình",
          "title": "Nhận diện lệnh nguy hiểm và giải pháp thay thế an toàn",
          "problem": "Trong các câu lệnh sau, lệnh nào tiềm ẩn nguy cơ bảo mật nghiêm trọng hoặc phá hủy dữ liệu, và lệnh thay thế chuẩn DevOps là gì: (1) `chmod 777 /var/www`, (2) `rm -rf $DIR/*` khi $DIR rỗng, (3) `cat /var/log/syslog`?",
          "hint": "Đối chiếu với cột Cẩn thận trong Bảng Tra cứu Cú pháp.",
          "solutionCode": "# 1. chmod 777 nguy hiểm -> Thay bằng: chmod 755 cho thư mục, 644 cho file\nfind /var/www -type d -exec chmod 755 {} +\n\n# 2. rm -rf $DIR/* nguy hiểm khi biến rỗng -> Thay bằng cú pháp phòng vệ:\nrm -rf \"${DIR:?Bien chua khai bao}/*\"\n\n# 3. cat file log lớn gây tràn buffer -> Thay bằng: less hoặc tail -F\nless /var/log/syslog",
          "solutionOutput": "[Các giải pháp an toàn chuẩn DevOps]",
          "explanation": "Quy tắc an ninh: 777 mở cửa cho mọi tin tặc, biến rỗng trong rm -rf biến thành xóa toàn hệ thống, và cat file lớn làm treo cứng terminal.",
          "annotations": [
            {
              "part": "chmod 755",
              "text": "Quyền an toàn cho thư mục public."
            },
            {
              "part": "less",
              "text": "Trình đọc tệp an toàn không chiếm dụng RAM."
            }
          ],
          "rubric": [
            {
              "criterion": "Phân tích đúng rủi ro của cả 3 câu lệnh nguy hiểm",
              "pass": "Chỉ ra được lỗ hổng bảo mật của chmod 777, thảm họa biến rỗng trong rm -rf $DIR/* và nghẽn terminal khi cat file lớn",
              "excellent": "Giải thích rõ hậu quả thực tế: rm -rf \"/*\" khi $DIR rỗng và sự khác biệt quyền thực thi giữa thư mục (755) với tệp dữ liệu (644)",
              "weight": "50%"
            },
            {
              "criterion": "Giải pháp thay thế chuẩn DevOps sản xuất",
              "pass": "Đưa ra đúng 3 câu lệnh thay thế an toàn cho từng tình huống",
              "excellent": "Sử dụng cú pháp bảo vệ biến ${DIR:?...}, phân quyền tách biệt directory/file và dùng less hoặc tail -F để đọc log lớn",
              "weight": "50%"
            }
          ]
        },
        {
          "level": "Khó",
          "title": "Tổng hợp đường ống: Trích xuất, đếm và lưu vết",
          "problem": "Hãy viết một câu lệnh duy nhất kết hợp đường ống pipe `|`, lệnh chia luồng `tee` và chuyển hướng lỗi sao cho: Tìm tất cả các file cấu hình `.conf` trong `/etc`, vừa đếm tổng số lượng file in ra màn hình, vừa lưu danh sách file tìm được vào `/tmp/conf_list.txt`, đồng thời vứt bỏ toàn bộ thông báo lỗi quyền hạn vào `/dev/null`.",
          "hint": "Kết hợp find /etc, 2>/dev/null, tee và wc -l.",
          "solutionCode": "find /etc -name \"*.conf\" 2>/dev/null | tee /tmp/conf_list.txt | wc -l",
          "solutionOutput": "142",
          "explanation": "find xuất danh sách file qua stdout, 2>/dev/null loại bỏ lỗi quyền hạn; pipe đưa dữ liệu vào tee để ghi file /tmp/conf_list.txt; pipe tiếp theo đẩy dữ liệu cho wc -l đếm tổng số dòng in ra màn hình.",
          "annotations": [
            {
              "part": "find /etc ... 2>/dev/null",
              "text": "Lọc sạch lỗi trước khi đưa vào pipeline."
            },
            {
              "part": "tee ... | wc -l",
              "text": "Mô hình pipeline Unix kinh điển vừa lưu trữ vừa phân tích dữ liệu."
            }
          ],
          "rubric": [
            {
              "criterion": "Tìm kiếm chính xác và xử lý sạch luồng lỗi quyền hạn",
              "pass": "Sử dụng find /etc -name \"*.conf\" và chuyển hướng lỗi 2>/dev/null",
              "excellent": "Bọc mẫu \"*.conf\" trong dấu ngoặc kép để tránh Shell globbing mở rộng sớm tại thư mục hiện tại",
              "weight": "45%"
            },
            {
              "criterion": "Chia luồng đồng thời bằng tee và đếm số lượng",
              "pass": "Kết nối chính xác đường ống qua tee /tmp/conf_list.txt rồi tới wc -l trong một dòng lệnh duy nhất",
              "excellent": "Đảm bảo luồng lỗi stderr đã được lọc sạch ở chặng đầu nên không làm sai lệch số đếm dòng của wc -l hay nội dung tệp lưu vết",
              "weight": "55%"
            }
          ]
        }
      ],
      "summary": [
        "Cấp 1 đã trang bị trọn vẹn bộ công cụ sinh tồn: Nhận diện kiến trúc Kernel/Distro, làm chủ cây thư mục FHS và kỹ năng tự tra cứu qua man/type/which.",
        "Mọi thao tác tệp tin đều gắn liền với Inode: Nắm vững sự khác biệt giữa Hard Link (chung inode) và Symbolic Link (con trỏ đường dẫn).",
        "Kỹ năng xem file và theo dõi log thực chiến đòi hỏi phân biệt rõ less (pager thông minh) và tail -F (bám theo logrotate).",
        "Bảo mật quyền hạn dựa trên ma trận bát phân rwx (4-2-1), umask an toàn và nguyên tắc bắt buộc dùng visudo khi sửa cấu hình đặc quyền.",
        "Làm chủ dòng lệnh hiện đại với đường ống Pipe (|), chuyển hướng luồng I/O và thiết lập môi trường ảo Python cô lập chuẩn PEP 668.",
        "Chúc mừng bạn đã hoàn thành xuất sắc Cấp 1! Bạn đã sẵn sàng 100% để bước sang Cấp 2: Quản trị Trung cấp & Vận hành Dịch vụ."
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Nhầm lẫn cú pháp giữa GNU Coreutils (Linux) và BSD Coreutils (macOS)",
            "content": "Nhiều cờ lệnh trong cheat sheet Linux (như `sed -i`, `grep -P`, `tar -czvf`) hoạt động mượt mà trên Ubuntu/Debian/RHEL nhưng khi chạy trên terminal macOS (gốc BSD) sẽ báo lỗi cú pháp do BSD đòi hỏi tham số khác (ví dụ `sed -i '' 's/.../'`). Luôn xác định môi trường bằng `uname -s` trước khi chạy."
          },
          {
            "title": "Sao chép mù quáng lệnh có tiền tố sudo từ bảng tra cứu trên mạng",
            "content": "Nhiều người có thói quen copy nguyên khối lệnh kèm `sudo` mà không đọc kỹ từng tham số. Một lệnh đơn giản như `sudo rm -rf` hoặc `sudo chmod` gõ sai đường dẫn có thể làm sập toàn bộ dịch vụ máy chủ. Luôn kiểm tra đối số trước khi Enter."
          }
        ],
        "tips": [
          {
            "title": "Thiết lập bí danh (Alias) rút ngắn lệnh trong ~/.bashrc",
            "content": "Thêm các bí danh phổ biến vào `~/.bashrc`: `alias ll='ls -lah'`, `alias ..='cd ..'`, `alias rm='rm -I'`. Sau đó chạy `source ~/.bashrc` để tăng 50% tốc độ gõ lệnh hàng ngày."
          },
          {
            "title": "Trang tra cứu Sổ tay Linux Trực tuyến chuẩn mực nhất",
            "content": "Khi bạn đang dùng máy tính bảng hoặc chưa bật terminal, hãy tra cứu sổ tay Linux chuẩn tại: https://man7.org/linux/man-pages/ (do Michael Kerrisk, tác giả sách The Linux Programming Interface duy trì)."
          }
        ]
      },
      "generalInfo": {
        "duration": "40 phút",
        "targetAudience": "Toàn bộ học viên Cấp 1, Lập trình viên chuẩn bị thi LPIC-1",
        "prerequisites": "Đã hoàn thành toàn bộ 10 bài học của Cấp 1",
        "environment": "Bất kỳ môi trường Linux nào (Ubuntu, RHEL, Arch, WSL2, Docker)",
        "materials": "Sổ tay ghi chép cá nhân, terminal tra cứu"
      },
      "nextLessonPreview": "CHÀO ĐÓN BƯỚC SANG CẤP 2 (Quản trị Trung cấp & Vận hành Dịch vụ): Bài 2.1 sẽ mở màn với Bộ công cụ Xử lý Văn bản Thần thánh (grep, sed, awk cơ bản, sort, uniq, cut, tr, wc) — vũ khí tối thượng của mọi kỹ sư DevOps.",
      "quiz": [
        {
          "question": "Tập hợp 3 thói quen sinh tồn nào sau đây được các chuyên gia quản trị Linux quốc tế khuyến nghị hàng đầu trước khi thực hiện thao tác mạo hiểm trên máy chủ?",
          "options": [
            "Tắt màn hình máy tính, rút dây mạng, gõ lệnh thật nhanh.",
            "Tạo Snapshot máy ảo dự phòng; Sao lưu file cấu hình gốc (cp -a file file.bak); Dùng pwd và whoami để xác nhận vị trí và quyền hạn trước khi Enter.",
            "Luôn đăng nhập bằng tài khoản root và chạy chmod 777.",
            "Tải script từ diễn đàn về chạy trực tiếp bằng sudo bash."
          ],
          "correctIndex": 1,
          "explanation": "Snapshot + Sao lưu file gốc + Xác định danh tính/vị trí là 'Bộ ba nguyên tắc sinh tồn' bất biến của mọi kỹ sư hệ thống chuyên nghiệp."
        },
        {
          "question": "Thuật ngữ `UsrMerge` trên các bản phân phối Linux hiện đại (Ubuntu 20.04+, Debian 12+, RHEL 9+) chỉ hiện tượng kiến trúc nào?",
          "options": [
            "Tất cả user trên hệ thống bị gộp chung thành một tài khoản.",
            "Các thư mục nhị phân và thư viện tại gốc (/bin, /sbin, /lib) thực chất là các symbolic link trỏ vào /usr/bin, /usr/sbin, /usr/lib.",
            "Thư mục /usr bị xóa bỏ hoàn toàn.",
            "Mọi phần mềm đều được cài đặt vào /tmp."
          ],
          "correctIndex": 1,
          "explanation": "UsrMerge hợp nhất cây thư mục nhị phân vào /usr để đơn giản hóa việc quản lý gói và tạo snapshot hệ điều hành nguyên khối."
        },
        {
          "question": "Khi bạn cần tìm lại cú pháp nhanh của một lệnh đã học trong Cấp 1 (ví dụ lệnh tar hoặc chmod), tài liệu nào sẵn có trên máy giúp bạn tra cứu nhanh nhất?",
          "options": [
            "Khởi động lại máy tính.",
            "Dùng lệnh `<tên_lệnh> --help` hoặc xem trang sổ tay `man <tên_lệnh>`.",
            "Cài đặt lại hệ điều hành.",
            "Hỏi đồng nghiệp qua điện thoại."
          ],
          "correctIndex": 1,
          "explanation": "--help và man pages là tài liệu chính thống tích hợp sẵn trên đĩa cứng, phản ánh chính xác 100% phiên bản đang cài đặt."
        }
      ],
      "reflectionQuestion": "Hãy tự đánh giá: Sau khi hoàn thành 11 bài học của Cấp 1, hãy chọn ra 3 kỹ năng bạn cảm thấy tự tin nhất và 1 cạm bẫy kỹ thuật bạn từng mắc phải nhưng nay đã hiểu rõ bản chất để không bao giờ tái phạm.",
      "reflectionHint": "Gợi ý: Suy ngẫm về các bài học cốt lõi: Phân biệt Kernel vs Distro (1.1), Cây thư mục FHS & Inode (1.2, 1.4), Sức mạnh của Pipe & Redirection (1.8), Phân quyền an toàn tránh 777 (1.6) và Quy chuẩn PEP 668 trong Python (1.7)."
    }
  ]
};
