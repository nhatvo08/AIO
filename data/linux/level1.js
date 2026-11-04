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
      "duration": "40 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Phân biệt chính xác giữa Nhân Linux (Kernel) và Bản phân phối (Distro), hiểu rõ ranh giới giữa Không gian Nhân (Kernel Space) và Không gian Người dùng (User Space).",
        "Nắm vững đặc trưng và phạm vi ứng dụng của 3 họ Distro lớn trong sản xuất: Debian/Ubuntu, RHEL/Rocky/Fedora và Arch Linux.",
        "Phân tích kiến trúc, ưu nhược điểm và ranh giới cô lập của 3 môi trường thực hành: Máy ảo (VM), WSL2 trên Windows và Docker Container.",
        "Thực hiện thành thạo các lệnh kiểm tra thông số hệ điều hành (uname, /etc/os-release, hostnamectl, systemd-detect-virt) để nhận biết chính xác môi trường đang vận hành."
      ],
      "intuition": {
        "title": "Khung gầm động cơ xe hơi và Các hãng xe hoàn chỉnh",
        "metaphor": "Hãy tưởng tượng \"Linux Kernel\" giống như một khối động cơ ô tô siêu mạnh mẽ do kỹ sư Linus Torvalds khởi xướng từ năm 1991. Bản thân khối động cơ không thể tự lăn bánh chở người trên đường. Để tạo thành chiếc xe hoàn chỉnh, các hãng sản xuất xe (tương ứng với các Distro) lấy khối động cơ đó về, tích hợp thêm hệ thống lái và khung gầm (GNU Coreutils, thư viện C), hộp số và bảng điều khiển (systemd, Shell Bash), bình xăng và trạm tiếp nhiên liệu (trình quản lý gói apt, dnf, pacman). Canonical tạo ra chiếc xe sedan tiện nghi Ubuntu; Red Hat tạo ra dòng xe tải vận tải bọc thép RHEL dành cho doanh nghiệp lớn; còn Arch Linux là bộ linh kiện rời để kỹ sư tự tay siết từng con ốc tùy biến tối đa.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>LINUX KERNEL (NHÂN)</span><span class=\"lx-vs-tag\">Ring 0 / Kernel Space</span></div><p class=\"lx-vs-desc\">Lõi điều phối trung tâm giữa phần cứng và phần mềm, phát hành chính thức tại kernel.org.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Đặc quyền Ring 0:</strong> Trực tiếp quản lý CPU, phân bổ bộ nhớ RAM, điều khiển thiết bị I/O và ngắt phần cứng.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Cổng giao tiếp Syscalls:</strong> Cung cấp ~450 lời gọi hệ thống chuẩn POSIX để tiến trình người dùng yêu cầu tài nguyên an toàn.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bản chất:</strong> Chỉ là một file binary tĩnh duy nhất (ví dụ: <code>/boot/vmlinuz-*</code>) kèm các module tải động (<code>.ko</code>).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>📦</span><span>LINUX DISTRIBUTION (DISTRO)</span><span class=\"lx-vs-tag\">Ring 3 / User Space</span></div><p class=\"lx-vs-desc\">Hệ điều hành hoàn chỉnh sẵn sàng phục vụ người dùng và triển khai ứng dụng sản xuất.</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Phần mềm GNU &amp; Thư viện:</strong> GNU C Library (glibc), Bash shell, coreutils (ls, cp, rm, grep).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Hệ thống Init &amp; Quản lý gói:</strong> systemd (quản lý dịch vụ) kết hợp kho phần mềm quản lý qua <code>apt</code>, <code>dnf</code>, hoặc <code>pacman</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Định hướng mục tiêu:</strong> Đóng gói tối ưu hóa cho máy chủ Cloud, máy trạm kỹ thuật, thiết bị IoT hoặc bảo mật chuyên sâu.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Bản chất cốt lõi: Phân định Kernel vs Distro và Không gian Thực thi",
          "content": "<p>Trong giới kỹ thuật, thuật ngữ \"hệ điều hành Linux\" thường được dùng theo thói quen để chỉ toàn bộ hệ thống. Tuy nhiên, theo chuẩn kiến trúc hệ thống và mục tiêu chứng chỉ (Linux Essentials / LPIC-1 Topic 101), chúng ta cần phân biệt rạch ròi hai thành phần:</p><ul><li><strong>Linux Kernel:</strong> Là phần mềm trung tâm chạy ở mức đặc quyền cao nhất của CPU (<strong>Ring 0 - Supervisor Mode</strong>). Kernel chịu trách nhiệm độc quyền: lập lịch tiến trình (Process Scheduling), quản lý bộ nhớ ảo (Virtual Memory Management), điều khiển trình điều khiển thiết bị (Device Drivers) và ngăn xếp mạng (Network Stack). Tiến trình thông thường không được phép truy cập trực tiếp vào phần cứng mà bắt buộc phải thông qua <strong>Lời gọi hệ thống (System Calls - Syscalls)</strong> như <code>open()</code>, <code>read()</code>, <code>write()</code>, <code>fork()</code>.</li><li><strong>Bản phân phối (Distribution - Distro):</strong> Là giải pháp đóng gói toàn diện đưa Kernel vào sử dụng thực tế. Một Distro tiêu chuẩn tích hợp: Nhân Linux + Thư viện hệ thống C (GNU C Library <code>glibc</code> hoặc <code>musl</code>) + Bộ công cụ dòng lệnh GNU (Coreutils) + Trình quản lý tiến trình khởi động (<code>systemd</code>) + Trình quản lý gói phần mềm + Cấu hình bảo mật mặc định.</li></ul><p>Hiện nay thế giới Linux máy chủ và đám mây được định hình bởi 3 họ bản phân phối nền tảng:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Họ Distro</th><th>Đại diện tiêu biểu</th><th>Trình quản lý gói</th><th>Mô hình phát hành</th><th>Mục đích sử dụng chính</th></tr></thead><tbody><tr><td><strong>Debian</strong></td><td>Debian, Ubuntu Server, Linux Mint</td><td><code>dpkg</code> / <code>apt</code> (gói <code>.deb</code>)</td><td>Định kỳ ổn định (LTS 2 năm / Ubuntu)</td><td>Mặc định phổ biến nhất trên Cloud VPS, Web Services, AI/ML containers</td></tr><tr><td><strong>RHEL</strong></td><td>Red Hat Enterprise Linux, Rocky Linux, AlmaLinux, Fedora</td><td><code>rpm</code> / <code>dnf</code> (trước đây là <code>yum</code>)</td><td>Chu kỳ doanh nghiệp 10 năm</td><td>Tiêu chuẩn vàng trong hệ thống ngân hàng, chính phủ, doanh nghiệp lớn</td></tr><tr><td><strong>Arch</strong></td><td>Arch Linux, Manjaro</td><td><code>pacman</code> (gói <code>.pkg.tar.zst</code>)</td><td>Rolling Release (cập nhật liên tục)</td><td>Máy trạm nghiên cứu, môi trường cần đón đầu công nghệ và kernel mới nhất</td></tr></tbody></table></div>",
          "codeExamples": [
            {
              "title": "Kiểm tra thông tin nhân Kernel và kiến trúc phần cứng với uname",
              "lang": "Bash",
              "code": "# 1. Xem đầy đủ thông số định danh hệ thống\nuname -a\n\n# 2. Chỉ trích xuất phiên bản nhân đang nạp trong RAM\nuname -r\n\n# 3. Xem kiến trúc phần cứng CPU (x86_64, aarch64/ARM64)\nuname -m\n\n# 4. Xem ngày giờ biên dịch nhân và phiên bản bản dựng\nuname -v",
              "output": "Linux prod-srv01 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC Fri Sep  6 12:00:00 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux\n6.8.0-45-generic\nx86_64\n#45-Ubuntu SMP PREEMPT_DYNAMIC Fri Sep  6 12:00:00 UTC 2024",
              "annotations": [
                {
                  "part": "uname",
                  "text": "Unix Name: lệnh chuẩn POSIX truy vấn cấu trúc dữ liệu utsname do kernel lưu trữ."
                },
                {
                  "part": "-a",
                  "text": "Cờ --all: in lần lượt kernel-name, nodename, kernel-release, kernel-version, machine, operating-system."
                },
                {
                  "part": "-r",
                  "text": "Cờ --kernel-release: chuỗi mã phiên bản nhân (ví dụ: 6.8.0-45-generic)."
                },
                {
                  "part": "x86_64",
                  "text": "Kiến trúc 64-bit chuẩn của Intel/AMD (nếu trên Raspberry Pi hoặc Apple Silicon sẽ là aarch64)."
                }
              ]
            },
            {
              "title": "Xác định danh tính Distro qua /etc/os-release và hostnamectl",
              "lang": "Bash",
              "code": "# Cách 1: Đọc tệp tiêu chuẩn quy định định danh distro (áp dụng mọi distro hiện đại)\ncat /etc/os-release\n\n# Cách 2: Dùng công cụ quản lý máy chủ của systemd (cho thông tin chi tiết cả Kernel, Distro, Kiến trúc)\nhostnamectl",
              "output": "NAME=\"Ubuntu\"\nVERSION=\"24.04.1 LTS (Noble Numbat)\"\nID=ubuntu\nID_LIKE=debian\nPRETTY_NAME=\"Ubuntu 24.04.1 LTS\"\nVERSION_ID=\"24.04\"\nHOME_URL=\"https://www.ubuntu.com/\"\n\n Static hostname: prod-srv01\n       Icon name: computer-vm\n         Chassis: vm 🖴\n      Machine ID: d41d8cd98f00b204e9800998ecf8427e\n         Boot ID: 7b2d56a3e14f481c856321447a112233\nOperating System: Ubuntu 24.04.1 LTS\n          Kernel: Linux 6.8.0-45-generic\n    Architecture: x86-64",
              "annotations": [
                {
                  "part": "/etc/os-release",
                  "text": "Tệp cấu hình tiêu chuẩn định dạng khóa=giá trị theo quy chuẩn freedesktop.org."
                },
                {
                  "part": "ID_LIKE=debian",
                  "text": "Cho biết hệ điều hành này kế thừa từ Debian, giúp script tự động hóa quyết định dùng cú pháp gói nào."
                },
                {
                  "part": "hostnamectl",
                  "text": "Lệnh của systemd cung cấp cái nhìn tổng hợp nhanh chóng về tình trạng host và môi trường ảo hóa."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Phân tích kiến trúc 3 môi trường thực hành: VM, WSL2 và Container",
          "content": "<p>Khi học và vận hành Linux, việc lựa chọn môi trường thực hành quyết định trực tiếp khả năng nắm bắt bản chất của bạn. Lập trình viên thường ngộ nhận rằng gõ lệnh trên Docker hay WSL2 đều \"như nhau\". Về mặt kiến trúc hệ điều hành, đây là 3 cấp độ cô lập hoàn toàn khác biệt:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Đặc tính kiến trúc</th><th>Máy ảo (VM - VirtualBox, VMware, KVM)</th><th>WSL2 (Windows Subsystem for Linux 2)</th><th>Container (Docker, Podman)</th></tr></thead><tbody><tr><td><strong>Bản chất Kernel</strong></td><td>Chạy Kernel Linux độc lập riêng biệt bên trong môi trường ảo hóa phần cứng (Type-2 hoặc Type-1 Hypervisor).</td><td>Chạy Kernel Linux tùy biến riêng do Microsoft biên dịch (dựa trên nhân LTS), chạy trên tiện ích ảo hóa Hyper-V.</td><td><strong>Không có Kernel riêng!</strong> Dùng chung trực tiếp Kernel của máy chủ Host thông qua cgroups và namespaces.</td></tr><tr><td><strong>Tiến trình PID 1 (Init)</strong></td><td>Chạy <code>systemd</code> đầy đủ nguyên bản ngay từ khi bật máy ảo.</td><td>Trước cuối năm 2022 mặc định không có systemd; các bản WSL hiện đại (WSL 0.67.6+ phát hành cuối 2022) hỗ trợ bật systemd qua <code>/etc/wsl.conf</code>.</td><td>Mặc định <strong>không chạy systemd</strong>. PID 1 là chính lệnh ứng dụng (như <code>python app.py</code> hoặc <code>/bin/sh</code>).</td></tr><tr><td><strong>Quyền can thiệp sâu</strong></td><td>Toàn quyền: Nạp/hủy module nhân (<code>modprobe</code>), phân vùng ổ đĩa thô, cấu hình mạng bridge, sửa bootloader GRUB.</td><td>Bị giới hạn: Không có bootloader chuẩn, hạn chế nạp module phần cứng ngoài cây mã nguồn Microsoft, mạng qua NAT ảo.</td><td>Bị khóa chặt: Không thể can thiệp kernel, không phân vùng đĩa thật, trừ khi mở cờ nguy hiểm <code>--privileged</code>.</td></tr><tr><td><strong>Khôi phục sự cố</strong></td><td><strong>Chụp ảnh nhanh (Snapshot)</strong> trong 1 giây. Hỏng hệ thống bấm khôi phục nguyên trạng ngay lập tức.</td><td>Phải xuất/nhập tệp (<code>wsl --export</code> / <code>--import</code>), không có cơ chế snapshot tức thời dạng nút bấm.</td><td>Chỉ cần hủy container cũ và khởi tạo container mới (Stateless) từ Image gốc.</td></tr><tr><td><strong>Mục đích khuyên dùng</strong></td><td><strong>Bắt buộc</strong> cho học viên từ Cấp 2, 3 và 4 (Quản trị hệ thống, Mạng, Tường lửa, LVM, Kernel Internals).</td><td>Rất tiện lợi cho Cấp 1 (Lệnh cơ bản, xử lý văn bản, lập trình Python, Git) trên máy tính chạy Windows.</td><td>Thích hợp đóng gói ứng dụng đưa lên production hoặc thử nghiệm cô lập nhanh một gói phần mềm.</td></tr></tbody></table></div>",
          "codeExamples": [
            {
              "title": "Nhận diện môi trường ảo hóa và tiến trình Init PID 1",
              "lang": "Bash",
              "code": "# 1. Kiểm tra công nghệ ảo hóa đang thực thi (kết quả có thể là: kvm, vmware, oracle, wsl, docker, none)\nsystemd-detect-virt\n\n# 2. Kiểm tra tên tiến trình đang giữ PID 1 (tiến trình cha của mọi tiến trình)\nps -p 1 -o comm=\n\n# 3. Phân tích chuỗi build kernel để nhận diện nhân của Microsoft WSL hay Linux tiêu chuẩn\ncat /proc/version",
              "output": "wsl\nsystemd\nLinux version 5.15.153.1-microsoft-standard-WSL2 (oe-user@oe-host) (gcc (GCC) 11.2.0, GNU ld (GNU Binutils) 2.37) #1 SMP Fri Mar 29 23:14:13 UTC 2024",
              "annotations": [
                {
                  "part": "systemd-detect-virt",
                  "text": "Lệnh chuyên dụng phát hiện tầng ảo hóa: trả về 'wsl' nếu chạy trong WSL2, 'docker' nếu trong container, hoặc 'oracle'/'kvm' nếu là VM."
                },
                {
                  "part": "ps -p 1 -o comm=",
                  "text": "In tên chương trình PID 1. Nếu in ra 'systemd' nghĩa là hệ thống có cơ chế quản lý dịch vụ nền chuẩn mực."
                },
                {
                  "part": "microsoft-standard-WSL2",
                  "text": "Dấu hiệu rõ ràng cho thấy đây là kernel chuyên biệt do Microsoft tối ưu cho WSL2, không phải kernel gốc của distro."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Thiết lập Môi trường Thực hành An toàn và Nguyên tắc Phòng ngừa Rủi ro",
          "content": "<p>Học quản trị Linux đòi hỏi bạn phải liên tục thử nghiệm các lệnh can thiệp sâu vào tệp hệ thống, quản lý quyền và phân vùng đĩa. Nếu thao tác thiếu kiểm soát trên máy chủ thật hoặc máy tính cá nhân, bạn có thể gây mất dữ liệu không thể hoàn tác.</p><p>Một kỹ sư chuyên nghiệp luôn tuân thủ <strong>3 nguyên tắc sinh tồn</strong> sau:</p><ol><li><strong>Quy tắc Snapshot trước thao tác mạo hiểm:</strong> Trước khi thực hiện bài tập có gắn cờ <code>requiresVM: true</code> hoặc can thiệp vào bảng phân vùng, cấu hình mạng, hãy tắt VM hoặc bấm nút <strong>Take Snapshot</strong>. Nếu gặp lỗi khóa máy hoặc hỏng file hệ thống, bạn chỉ mất 2 giây để quay về trạng thái hoàn hảo.</li><li><strong>Nguyên tắc Đặc quyền Tối thiểu (Principle of Least Privilege):</strong> Tuyệt đối không đăng nhập trực tiếp bằng tài khoản <code>root</code> cho các công việc hàng ngày. Luôn sử dụng tài khoản người dùng thông thường (dấu nhắc <code>$</code>) và chỉ dùng tiền tố <code>sudo</code> (dấu nhắc <code>#</code>) khi thực hiện tác vụ hành chính cần thiết. Điều này tạo một \"khoảng dừng suy nghĩ\" giúp bạn không vô tình gõ lệnh phá hủy.</li><li><strong>Cảnh báo an toàn với Container:</strong> Tuyệt đối không khắc phục lỗi quyền truy cập trong Docker bằng cách cấp cờ <code>--privileged</code> hoặc mount toàn bộ thư mục gốc <code>-v /:/host</code>. Cờ này cấp cho container gần như toàn bộ quyền của nhân máy chủ, biến lỗ hổng trong container thành cửa sau chiếm quyền toàn bộ máy thật (Container Breakout).</li></ol>",
          "codeExamples": [
            {
              "title": "Kiểm tra danh tính người dùng và xác thực quyền hạn quản trị với sudo",
              "lang": "Bash",
              "code": "# 1. Xem danh tính, User ID (UID), Group ID (GID) và các nhóm người dùng đang tham gia\nid\n\n# 2. Kiểm tra xem tài khoản hiện tại có quyền thực thi quyền quản trị (sudo) hay không\nsudo -v\n\n# 3. Liệt kê danh sách các lệnh được phép chạy dưới quyền root\nsudo -l",
              "output": "uid=1000(devops) gid=1000(devops) groups=1000(devops),4(adm),24(cdrom),27(sudo),110(lxd)\n[sudo] password for devops: \nMatching Defaults entries for devops on prod-srv01:\n    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin\n\nUser devops may run the following commands on prod-srv01:\n    (ALL : ALL) ALL",
              "annotations": [
                {
                  "part": "uid=1000",
                  "text": "UID >= 1000 trên hầu hết các distro biểu thị người dùng thông thường; UID 0 luôn là đặc quyền của root."
                },
                {
                  "part": "groups=...27(sudo)",
                  "text": "Trên Debian/Ubuntu người dùng thuộc nhóm 'sudo' (trên RHEL là nhóm 'wheel') mới có thể leo thang đặc quyền."
                },
                {
                  "part": "sudo -v",
                  "text": "Cờ --validate: làm mới hoặc kiểm tra phiên xác thực sudo mà không cần chạy lệnh thực thi nào."
                },
                {
                  "part": "sudo -l",
                  "text": "Cờ --list: in ra các quyền hạn và chỉ thị cụ thể trong tệp /etc/sudoers áp dụng cho tài khoản này."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "Linux về bản chất là một Nhân (Kernel) điều phối tài nguyên phần cứng tại Ring 0; Distro là hệ điều hành hoàn chỉnh đóng gói Kernel cùng GNU tools, systemd và trình quản lý gói.",
        "Ba họ Distro chủ lực bao gồm: Debian/Ubuntu (ổn định, phổ biến Cloud), RHEL/Rocky (chuẩn mực doanh nghiệp khắt khe) và Arch Linux (rolling release, tối tân).",
        "Môi trường thực hành có sự phân hóa rõ rệt: Máy ảo (VM) có kernel riêng và hỗ trợ snapshot an toàn tuyệt đối; WSL2 tiện lợi cho lập trình cơ bản; Container Docker chia sẻ kernel host và không phù hợp cho các bài thực hành can thiệp phần cứng/kernel.",
        "Các công cụ tiêu chuẩn để kiểm tra định danh hệ điều hành gồm: uname (thông số kernel và kiến trúc CPU), /etc/os-release (thông tin bản phân phối) và systemd-detect-virt (nhận diện môi trường ảo hóa).",
        "Luôn tuân thủ nguyên tắc đặc quyền tối thiểu: làm việc với tài khoản người dùng thông thường và chỉ nâng quyền qua sudo khi thật sự cần thiết."
      ]
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
        "Giải thích triết lý cây thư mục duy nhất gốc `/` (Single Hierarchy) thay cho mô hình ổ đĩa phân mảnh C:, D: trên Windows.",
        "Nắm vững Tiêu chuẩn Phân cấp Hệ thống File (Filesystem Hierarchy Standard - FHS 3.0) và phân loại dữ liệu theo 2 chiều: Tĩnh/Biến đổi (Static/Variable) và Có thể chia sẻ/Không thể chia sẻ (Shareable/Unshareable).",
        "Phân tích hiện tượng UsrMerge trên các bản phân phối Linux hiện đại và hiểu cơ chế liên kết tượng trưng (symlink) giữa `/bin`, `/sbin`, `/lib` với `/usr`.",
        "Khảo sát bản chất các hệ thống file ảo trong RAM (`/proc`, `/sys`) và áp dụng đúng quy chuẩn lưu trữ mã nguồn, cấu hình và log cho ứng dụng Python sản xuất."
      ],
      "intuition": {
        "title": "Tòa cao ốc một lối vào duy nhất và Các phòng chức năng chuẩn hóa",
        "metaphor": "Trên Windows, hệ thống giống như một dãy nhà phố có nhiều cửa vào độc lập: cửa ổ C, cửa ổ D, cửa ổ E. Mỗi khi cắm thêm một USB, lại mọc thêm một cánh cửa ổ F. Trên Linux thì khác: toàn bộ thế giới là một tòa tháp cao ốc chọc trời chỉ có duy nhất MỘT sảnh chính ở tầng trệt ký hiệu là `/` (Root directory). Bất kỳ ổ đĩa cứng, phân vùng SSD, USB hay ổ đĩa mạng NAS nào muốn xuất hiện đều phải được \"gắn kết\" (mount) vào làm một căn phòng con bên trong tòa tháp đó. Mọi phòng ban đều có quy định nghiêm ngặt theo chuẩn FHS: phòng hành chính `/etc` chỉ giữ hồ sơ văn bản cấu hình; kho lưu trữ biến động `/var` chứa nhật ký log và dữ liệu website; phòng thiết bị `/dev` đại diện cho các cổng ngoại vi; còn phòng nghiên cứu `/proc` không hề có tủ gỗ chứa đồ thật mà là màn hình hiển thị trực tiếp trạng thái nhịp tim của CPU và RAM.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📁</span><span>CÁC THƯ MỤC CỐT LÕI HỆ THỐNG</span><span class=\"lx-vs-tag\">Root Partition /</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/</code> (Root):</strong> Gốc của toàn bộ hệ thống file. Mọi đường dẫn tuyệt đối đều bắt đầu từ đây.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/etc</code> (Host-specific Config):</strong> Chứa toàn bộ tệp cấu hình toàn hệ thống (nginx, ssh, passwd). Chỉ là văn bản plain text, không chứa file thực thi binary.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/var</code> (Variable Data):</strong> Chứa dữ liệu thay đổi liên tục: nhật ký log (<code>/var/log</code>), hàng đợi email (<code>/var/spool</code>), cơ sở dữ liệu (<code>/var/lib</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/home</code> &amp; <code>/root</code>:</strong> Thư mục cá nhân của người dùng thường (<code>/home/username</code>) và thư mục riêng của quản trị viên tối cao (<code>/root</code>).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>⚙️</span><span>PHẦN MỀM &amp; HỆ THỐNG FILE ẢO</span><span class=\"lx-vs-tag\">Virtual &amp; User /usr</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/usr</code> (User System Resources):</strong> Chứa hầu hết phần mềm người dùng, thư viện chia sẻ (<code>/usr/lib</code>) và tài liệu sổ tay (<code>/usr/share/man</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/opt</code> &amp; <code>/usr/local</code>:</strong> Nơi cài đặt ứng dụng bên thứ ba độc lập (Google Chrome, Docker) và phần mềm do kỹ sư tự biên dịch thủ công.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/tmp</code> (Temporary Files):</strong> Chứa file tạm thời, tự động dọn sạch khi khởi động lại máy hoặc theo chu kỳ thời gian.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/proc</code> &amp; <code>/sys</code>:</strong> Pseudo-filesystems nằm trên RAM, cửa sổ phản ánh tham số của nhân Linux và thông số tiến trình.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Tiêu chuẩn Phân cấp Hệ thống File (FHS) và Ma trận Phân loại Dữ liệu",
          "content": "<p>Không giống như các hệ điều hành tự do cho phép phần mềm cài đặt rải rác ở bất kỳ đâu, Linux tuân thủ nghiêm ngặt <strong>Tiêu chuẩn Phân cấp Hệ thống File (Filesystem Hierarchy Standard - FHS)</strong> do Linux Foundation duy trì. FHS phân loại mọi dữ liệu trên máy tính dựa trên 2 tiêu chí cốt lõi:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Tiêu chí Phân loại</th><th>Có thể chia sẻ (Shareable - qua NFS/Mạng)</th><th>Không thể chia sẻ (Unshareable - Gắn chặt máy chủ này)</th></tr></thead><tbody><tr><td><strong>Tĩnh (Static - Chỉ thay đổi khi nâng cấp hệ thống)</strong></td><td><code>/usr</code> (chương trình, thư viện), <code>/opt</code> (gói bên thứ ba)</td><td><code>/etc</code> (cấu hình máy), <code>/boot</code> (nhân kernel và bộ khởi động)</td></tr><tr><td><strong>Biến đổi (Variable - Thay đổi liên tục khi chạy)</strong></td><td><code>/var/mail</code> (hòm thư người dùng), <code>/var/spool/news</code></td><td><code>/var/run</code> hoặc <code>/run</code> (PID tiến trình), <code>/var/log</code> (nhật ký)</td></tr></tbody></table></div><p>Ý nghĩa kiến trúc của bảng phân loại này là: Các thư mục <em>Shareable/Static</em> (như <code>/usr</code>) có thể được mount dưới chế độ chỉ đọc (Read-Only) từ một máy chủ mạng dùng chung cho hàng trăm máy trạm, trong khi các thư mục <em>Unshareable/Variable</em> (như <code>/etc</code>, <code>/var/log</code>) bắt buộc phải nằm riêng trên từng máy tính cục bộ.</p>",
          "codeExamples": [
            {
              "title": "Khảo sát danh sách thư mục tại gốc / và phân tích thuộc tính",
              "lang": "Bash",
              "code": "# 1. Liệt kê toàn bộ các thư mục tại gốc / kèm quyền hạn và kích thước\nls -ld /*\n\n# 2. Tra cứu tài liệu bách khoa chuẩn mực về cấu trúc phân cấp FHS\nman 7 hier",
              "output": "drwxr-xr-x   2 root root 4096 Apr 22 10:00 /bin -> usr/bin\ndrwxr-xr-x   4 root root 4096 Sep  6 12:05 /boot\ndrwxr-xr-x  19 root root 4240 Oct 28 10:00 /dev\ndrwxr-xr-x  98 root root 4096 Oct 28 10:05 /etc\ndrwxr-xr-x   3 root root 4096 Sep  6 12:01 /home\ndrwxr-xr-x  14 root root 4096 Apr 22 10:00 /usr\ndrwxr-xr-x  14 root root 4096 Sep  6 12:00 /var",
              "annotations": [
                {
                  "part": "ls -ld /*",
                  "text": "Cờ -d chỉ in thông tin chính thư mục đó thay vì liệt kê nội dung bên trong nó; /* mở rộng tất cả mục ở gốc /."
                },
                {
                  "part": "man 7 hier",
                  "text": "Trang sổ tay section 7 (Miscellaneous) mô tả chuẩn phân cấp cây thư mục Linux (filesystem hierarchy)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Thực tế trên Distro Hiện đại: Kiến trúc UsrMerge (/bin, /sbin, /lib)",
          "content": "<p>Trong lịch sử phát triển Unix cách đây 40 năm, dung lượng ổ cứng rất nhỏ bé (khoảng vài chục Megabytes). Các kỹ sư buộc phải chia đôi phần mềm:</p><ul><li>Các lệnh sống còn tối thiểu để cứu hộ hệ thống lúc chưa kịp mount ổ đĩa ngoài được đặt ở <code>/bin</code> (như <code>sh</code>, <code>ls</code>, <code>cp</code>) và <code>/sbin</code> (lệnh của root như <code>reboot</code>, <code>fdisk</code>).</li><li>Các phần mềm bổ sung cho người dùng hàng ngày được đặt ở <code>/usr/bin</code> và <code>/usr/sbin</code>.</li></ul><p>Ngày nay, ổ cứng máy chủ đã lên tới hàng Terabytes và tốc độ khởi động rất nhanh. Phân chia này trở nên dư thừa và gây khó khăn cho việc quản lý gói phần mềm. Do đó, tất cả các bản phân phối Linux hiện đại (Debian 12+, Ubuntu 20.04+, RHEL 9+, Arch Linux) đều triển khai tiêu chuẩn <strong>UsrMerge</strong>:</p><blockquote>Toàn bộ <code>/bin</code>, <code>/sbin</code>, <code>/lib</code>, <code>/lib64</code> ở thư mục gốc thực chất chỉ là các <strong>liên kết tượng trưng (symbolic links - symlinks)</strong> trỏ vào thư mục con tương ứng bên trong <code>/usr</code>.</blockquote>",
          "codeExamples": [
            {
              "title": "Kiểm chứng kiến trúc UsrMerge trên hệ thống thực tế",
              "lang": "Bash",
              "code": "# Kiểm tra đích đến của các thư mục binary và library tại gốc /\nls -ld /bin /sbin /lib /lib64",
              "output": "lrwxrwxrwx 1 root root 7 Apr 22 10:00 /bin -> usr/bin\nlrwxrwxrwx 1 root root 8 Apr 22 10:00 /lib -> usr/lib\nlrwxrwxrwx 1 root root 9 Apr 22 10:00 /lib64 -> usr/lib64\nlrwxrwxrwx 1 root root 8 Apr 22 10:00 /sbin -> usr/sbin",
              "annotations": [
                {
                  "part": "lrwxrwxrwx",
                  "text": "Chữ cái đầu tiên là 'l' (link) xác nhận đây là symbolic link, không phải thư mục vật lý độc lập ('d')."
                },
                {
                  "part": "-> usr/bin",
                  "text": "Mọi lệnh bạn gõ dù gọi /bin/ls hay /usr/bin/ls đều thực thi cùng một tệp binary duy nhất."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Hệ thống File Ảo (/proc, /sys) và Cơ chế Tự dọn dẹp của /tmp",
          "content": "<p>Một trong những triết lý kiến trúc vĩ đại nhất của Unix và Linux là: <strong>\"Everything is a file\" (Mọi thứ đều là file)</strong>. Để cung cấp thông tin phần cứng và tiến trình cho lập trình viên, Linux không tạo ra các hàm API phức tạp mà biểu diễn chúng dưới dạng các tệp văn bản thông thường nằm trong hai hệ thống file ảo (Pseudo-Filesystem):</p><ul><li><strong><code>/proc</code> (Process Information Pseudo-fs):</strong> Được kernel tạo ra trực tiếp trong RAM. Mỗi tiến trình đang chạy được gán một thư mục mang tên chính là PID của nó (ví dụ: <code>/proc/1</code>, <code>/proc/$$</code>). Các tệp như <code>/proc/cpuinfo</code>, <code>/proc/meminfo</code> phản ánh tài nguyên phần cứng thời gian thực.</li><li><strong><code>/sys</code> (Sysfs):</strong> Cấu trúc phân cấp thiết bị phần cứng, bus truyền dữ liệu, driver và tham số kernel theo dạng cây đối tượng.</li><li><strong><code>/tmp</code> và cơ chế Sticky Bit:</strong> Thư mục <code>/tmp</code> cho phép mọi người dùng ghi tệp tạm thời. Thư mục này có quyền đặc biệt <code>drwxrwxrwt</code> (chữ <code>t</code> ở cuối là <strong>Sticky Bit</strong>): Mọi người đều có quyền tạo tệp tại đây, nhưng chỉ người tạo ra tệp (hoặc root) mới có quyền xóa tệp của mình, ngăn chặn người dùng này xóa trộm file của người dùng khác. Trên hầu hết distro hiện đại, <code>/tmp</code> được mount bằng <code>tmpfs</code> (bộ nhớ RAM) và sẽ biến mất khi tắt máy.</li></ul>",
          "codeExamples": [
            {
              "title": "Khảo sát hệ thống file ảo trong RAM và Sticky Bit trên /tmp",
              "lang": "Bash",
              "code": "# 1. Xem dung lượng RAM vật lý và RAM còn trống từ hệ thống file ảo /proc\ngrep -E '^(MemTotal|MemAvailable):' /proc/meminfo\n\n# 2. Khảo sát quyền đặc biệt Sticky Bit trên thư mục /tmp\nls -ld /tmp\n\n# 3. Kiểm tra kiểu filesystem mount của /tmp (thường là tmpfs trong RAM)\nfindmnt /tmp",
              "output": "MemTotal:       16384256 kB\nMemAvailable:   12450120 kB\ndrwxrwxrwt 12 root root 4096 Oct 28 10:10 /tmp\nTARGET SOURCE FSTYPE OPTIONS\n/tmp   tmpfs  tmpfs  rw,nosuid,nodev,nr_inodes=1048576",
              "annotations": [
                {
                  "part": "/proc/meminfo",
                  "text": "Kernel cập nhật liên tục các số liệu bộ nhớ vào tệp ảo này; dung lượng trên đĩa luôn hiển thị 0 byte."
                },
                {
                  "part": "drwxrwxrwt",
                  "text": "Chữ 't' đại diện cho Sticky bit (bảo vệ quyền sở hữu tệp chia sẻ)."
                },
                {
                  "part": "FSTYPE tmpfs",
                  "text": "tmpfs lưu trữ dữ liệu trực tiếp trong RAM ảo, tự động dọn sạch khi khởi động lại."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-4",
          "title": "4. Best Practices: Quy chuẩn Vị trí Triển khai Ứng dụng & An toàn Dữ liệu",
          "content": "<p>Dưới góc nhìn của Kỹ sư Vận hành Sản xuất (Production DevOps), việc đặt sai vị trí mã nguồn hoặc file dữ liệu có thể dẫn đến thảm họa mất dữ liệu hoặc gián đoạn dịch vụ:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Thành phần Ứng dụng</th><th>Vị trí Chuẩn FHS</th><th>Vị trí Tuyệt đối Tránh</th><th>Lý do Kỹ thuật</th></tr></thead><tbody><tr><td><strong>Mã nguồn Web / Backend</strong></td><td><code>/var/www/my-app</code> hoặc <code>/opt/my-app</code></td><td><code>/tmp/my-app</code> hoặc <code>/root/my-app</code></td><td><code>/tmp</code> bị xóa sạch khi reboot; <code>/root</code> bị chặn quyền đối với user dịch vụ (<code>www-data</code>).</td></tr><tr><td><strong>Tệp Cấu hình (.env, .conf)</strong></td><td><code>/etc/my-app/</code> hoặc thư mục riêng của app</td><td><code>/home/user/Desktop</code></td><td>File cấu hình toàn hệ thống phải được bảo vệ tập trung và sao lưu định kỳ.</td></tr><tr><td><strong>Nhật ký ghi nhận (Logs)</strong></td><td><code>/var/log/my-app/</code></td><td>Thư mục gốc mã nguồn <code>./logs</code></td><td>Ghi log tràn đĩa mã nguồn có thể làm tê liệt phân vùng hệ điều hành nếu không cấu hình xoay vòng log.</td></tr><tr><td><strong>Dữ liệu tĩnh tải lên (Media/Uploads)</strong></td><td><code>/var/lib/my-app/</code> hoặc gắn ổ đĩa riêng tại <code>/mnt</code>, <code>/srv</code></td><td>Phân vùng gốc <code>/</code></td><td>Tránh nguy cơ người dùng tải file dung lượng lớn làm đầy phân vùng root <code>/</code> khiến OS sụp đổ.</td></tr></tbody></table></div>",
          "codeExamples": [
            {
              "title": "Kiểm tra mức sử dụng dung lượng các phân vùng mount tại gốc /",
              "lang": "Bash",
              "code": "# Kiểm tra dung lượng và điểm mount của các phân vùng đĩa (dạng đọc được cho người: -h)\ndf -h /\n\n# Tìm 5 thư mục con ngốn dung lượng nhất trong /var\nsudo du -sh /var/* 2>/dev/null | sort -rh | head -n 5",
              "output": "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   14G   34G  30% /\n\n3.2G\t/var/log\n1.8G\t/var/lib\n420M\t/var/cache\n12M\t/var/backups\n4.0K\t/var/mail",
              "annotations": [
                {
                  "part": "df -h /",
                  "text": "Disk Free: hiển thị tổng dung lượng, đã dùng và còn trống trên phân vùng chứa thư mục gốc /."
                },
                {
                  "part": "du -sh /var/*",
                  "text": "Disk Usage: tính tổng kích thước (-s) theo đơn vị dễ đọc (-h) của từng thư mục con."
                },
                {
                  "part": "sort -rh",
                  "text": "Sắp xếp giảm dần (-r) theo kích thước dung lượng con người (-h: K, M, G)."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "Toàn bộ cây thư mục Linux xuất phát từ một gốc duy nhất là `/` (Root directory); mọi ổ cứng, phân vùng hay thiết bị đều phải mount vào cây này.",
        "Tiêu chuẩn FHS 3.0 phân loại dữ liệu theo 2 trục: Tĩnh vs Biến đổi (Static/Variable) và Có thể chia sẻ vs Không thể chia sẻ (Shareable/Unshareable).",
        "Kiến trúc UsrMerge trên các distro hiện đại gộp `/bin`, `/sbin`, `/lib` thành các symlink trỏ vào `/usr`, chuẩn hóa toàn bộ file nhị phân hệ thống.",
        "Hệ thống file ảo `/proc` và `/sys` nằm trong RAM, hiện thực hóa triết lý 'Everything is a file' giúp lập trình viên và quản trị viên khảo sát trực tiếp tham số kernel và tiến trình.",
        "Quy chuẩn triển khai ứng dụng: Đặt cấu hình tại `/etc`, lưu mã nguồn tại `/var/www` hoặc `/opt`, ghi nhật ký tại `/var/log` và tuyệt đối không lưu dữ liệu vĩnh viễn trong `/tmp`."
      ]
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
        "Phân biệt chính xác giữa 3 tầng: Bộ giả lập thiết bị đầu cuối (Terminal Emulator), Trình thông dịch dòng lệnh (Shell) và Câu lệnh (Command).",
        "Phân tích giải phẫu một câu lệnh Linux tiêu chuẩn: Tên lệnh (Command) + Cờ tùy chọn (Options/Flags) + Đối số (Arguments).",
        "Làm chủ hệ thống sổ tay điện tử `man` qua các phân vùng trọng yếu (Section 1: Lệnh người dùng, Section 5: Định dạng file cấu hình, Section 8: Lệnh quản trị hệ thống) và lệnh `apropos` / `man -k`.",
        "Phân định bản chất giữa Lệnh tích hợp trong Shell (Shell Builtin) và Chương trình thực thi độc lập (External Binary) bằng `type -a` và `which`."
      ],
      "intuition": {
        "title": "Người thông dịch viên và Cuốn bách khoa toàn thư nội bộ",
        "metaphor": "Cửa sổ đen xì bạn nhìn thấy trên màn hình (Terminal Emulator - như Alacritty, GNOME Terminal hay Windows Terminal) giống như chiếc ống nghe điện thoại kết nối vào phòng điều khiển máy chủ. Khi bạn nói vào ống nghe, người lắng nghe và dịch từng câu lệnh của bạn sang chỉ thị hệ thống chính là Shell (thông dịch viên Bash/Zsh). Mỗi câu lệnh bạn gõ là một câu hoàn chỉnh: Lệnh là động từ ('xem'), Cờ là trạng từ ('xem chi tiết, xem file ẩn'), và Đối số là danh từ bổ ngữ ('ở thư mục /etc'). Quan trọng nhất: nếu bạn bị cô lập trên một máy chủ không có mạng Internet, Linux luôn mang sẵn cuốn Bách khoa toàn thư đồ sộ `man` (manual pages) ngay trong máy. Chỉ cần biết cách tra cứu `man`, bạn có thể tự giải cứu mình trước mọi sự cố.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🧭</span><span>GIẢI PHẪU CÂU LỆNH CHUẨN</span><span class=\"lx-vs-tag\">POSIX Syntax</span></div><p class=\"lx-vs-desc\">Cấu trúc 3 thành phần thống nhất trong môi trường Unix/Linux:</p><div style=\"padding:8px 12px;background:var(--bg-code);border-radius:6px;color:#f1f5f9;font-family:var(--font-mono);font-size:0.85rem;margin:6px 0;\"><span style=\"color:#f87171;font-weight:700;\">ls</span> <span style=\"color:#60a5fa;\">-la --sort=time</span> <span style=\"color:#34d399;\">/var/log</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Command (Lệnh):</strong> Hành động cần làm (<code>ls</code>, <code>grep</code>, <code>rm</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Options (Cờ tùy chọn):</strong> Cờ ngắn (<code>-l</code>, <code>-a</code>) hoặc cờ dài GNU (<code>--sort=time</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Arguments (Đối số):</strong> Đối tượng chịu tác động (tệp, thư mục, chuỗi).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>📚</span><span>PHÂN VÙNG SỔ TAY MAN-PAGES</span><span class=\"lx-vs-tag\">Offline Docs</span></div><p class=\"lx-vs-desc\">Các phân vùng (Sections) sống còn của lệnh <code>man</code>:</p><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Section 1:</strong> Lệnh người dùng thông thường (<code>ls</code>, <code>cat</code>, <code>passwd</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Section 2:</strong> Lời gọi hệ thống Kernel (<code>open</code>, <code>read</code>, <code>fork</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Section 5:</strong> Cú pháp tệp cấu hình (<code>/etc/passwd</code>, <code>crontab</code>, <code>hosts</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Section 8:</strong> Lệnh quản trị hệ thống của root (<code>fdisk</code>, <code>useradd</code>, <code>iptables</code>).</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Phân biệt Terminal vs Shell và Giải phẫu Cấu trúc Lệnh",
          "content": "<p>Người mới bắt đầu thường gộp chung Terminal và Shell làm một. Dưới góc độ khoa học máy tính và mục tiêu chứng chỉ (Linux Essentials Topic 2 / LPIC-1 103.1), đây là các thành phần tách bạch:</p><ul><li><strong>Terminal Emulator (Bộ giả lập thiết bị đầu cuối):</strong> Là ứng dụng đồ họa hiển thị cửa sổ nhập liệu và nhận diện bàn phím (ví dụ: Windows Terminal, GNOME Terminal, iTerm2, Alacritty). Nó chỉ có chức năng truyền ký tự bạn gõ vào Shell và vẽ các ký tự Shell trả về lên màn hình.</li><li><strong>Shell (Trình thông dịch dòng lệnh):</strong> Là một chương trình thực thi (thường là <code>/bin/bash</code> hoặc <code>/bin/zsh</code>) chờ đợi câu lệnh của người dùng, phân tách các từ, giải mã các biến môi trường, thực hiện globbing và yêu cầu kernel sinh tiến trình thực thi lệnh đó.</li><li><strong>Cú pháp lệnh chuẩn:</strong> Gồm <code>Lệnh [Cờ_ngắn hoặc --Cờ_dài] [Đối_số_1] [Đối_số_2]</code>. Cờ ngắn bắt đầu bằng một dấu gạch ngang (như <code>-l</code>, <code>-a</code>) và có thể gộp chung lại thành <code>-la</code>. Cờ dài bắt đầu bằng hai dấu gạch ngang (như <code>--all</code>, <code>--human-readable</code>) giúp câu lệnh tường minh và tự tài liệu hóa.</li></ul>",
          "codeExamples": [
            {
              "title": "Kiểm tra Shell hiện tại và danh sách shell hỗ trợ",
              "lang": "Bash",
              "code": "# 1. Xem trình thông dịch shell đang chạy trong phiên làm việc hiện tại\necho $SHELL\n\n# 2. Xem danh sách các shell hợp lệ đã cài đặt trên hệ thống\ncat /etc/shells",
              "output": "/bin/bash\n# /etc/shells: valid login shells\n/bin/sh\n/bin/bash\n/usr/bin/bash\n/bin/rbash\n/usr/bin/rbash\n/bin/dash\n/usr/bin/dash",
              "annotations": [
                {
                  "part": "$SHELL",
                  "text": "Biến môi trường lưu đường dẫn tới shell mặc định của người dùng đang đăng nhập."
                },
                {
                  "part": "/etc/shells",
                  "text": "Tệp cấu hình quy định các shell an toàn được phép gán cho tài khoản hệ thống."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Làm chủ Hệ thống Sổ tay man (Sections 1, 5, 8) và Tra cứu với apropos",
          "content": "<p>Hệ thống <code>man</code> (Manual Pages) là tài liệu kỹ thuật chuẩn xác và đáng tin cậy nhất trong thế giới Unix/Linux. Mỗi trang sổ tay được đánh số theo <strong>Section (Phân vùng)</strong>:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Mã Section</th><th>Thể loại Tài liệu</th><th>Ví dụ Điển hình</th><th>Mục đích Sử dụng</th></tr></thead><tbody><tr><td><strong>Section 1</strong></td><td>Lệnh người dùng thực thi</td><td><code>man 1 ls</code>, <code>man 1 grep</code>, <code>man 1 passwd</code></td><td>Tìm hiểu cú pháp cờ và ví dụ chạy lệnh</td></tr><tr><td><strong>Section 2</strong></td><td>Lời gọi hệ thống của Kernel</td><td><code>man 2 open</code>, <code>man 2 fork</code>, <code>man 2 kill</code></td><td>Dành cho lập trình viên C/Python lập trình hệ thống</td></tr><tr><td><strong>Section 5</strong></td><td>Định dạng tệp cấu hình và quy ước</td><td><code>man 5 passwd</code>, <code>man 5 crontab</code>, <code>man 5 hosts</code></td><td>Tra cứu cú pháp từng dòng của file cấu hình trong <code>/etc</code></td></tr><tr><td><strong>Section 8</strong></td><td>Lệnh quản trị hệ thống và daemon</td><td><code>man 8 useradd</code>, <code>man 8 fdisk</code>, <code>man 8 iptables</code></td><td>Lệnh vận hành chỉ dành riêng cho quyền root</td></tr></tbody></table></div><p>Khi bạn không nhớ chính xác tên lệnh mà chỉ nhớ tính năng mình cần làm, hãy dùng lệnh <code>apropos &lt;từ_khóa&gt;</code> (hoặc <code>man -k &lt;từ_khóa&gt;</code>) để tìm kiếm trên toàn bộ cơ sở dữ liệu tóm tắt của sổ tay.</p>",
          "codeExamples": [
            {
              "title": "Phân biệt tra cứu Section 1 vs Section 5 và tìm kiếm từ khóa với apropos",
              "lang": "Bash",
              "code": "# 1. Tra cứu lệnh đổi mật khẩu người dùng (Section 1)\nman 1 passwd\n\n# 2. Tra cứu cấu trúc tệp dữ liệu tài khoản /etc/passwd (Section 5)\nman 5 passwd\n\n# 3. Tìm kiếm toàn bộ các lệnh liên quan đến nén file (compression)\napropos compression | head -n 5",
              "output": "PASSWD(1)                User Commands               PASSWD(1)\nNAME\n       passwd - change user password\n\nPASSWD(5)                File Formats                PASSWD(5)\nNAME\n       passwd - the password file\nDESCRIPTION\n       /etc/passwd contains one line for each user account...\n\nbzip2 (1)            - a block-sorting file compressor, v1.0.8\ngzip (1)             - compress or expand files\nlzma (1)             - Compress or decompress .xz and .lzma files\nxz (1)               - Compress or decompress .xz and .lzma files\nzip (1)              - package and compress (archive) files",
              "annotations": [
                {
                  "part": "man 1 passwd",
                  "text": "Mở sổ tay hướng dẫn cách gõ lệnh đổi mật khẩu (Section 1: User Commands)."
                },
                {
                  "part": "man 5 passwd",
                  "text": "Mở sổ tay giải thích ý nghĩa 7 trường trong tệp cấu hình /etc/passwd (Section 5: File Formats)."
                },
                {
                  "part": "apropos compression",
                  "text": "Quét qua cơ sở dữ liệu whatis để tìm tất cả các trang man có chứa từ khóa 'compression' trong mô tả ngắn."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Phân định Lệnh Tích hợp (Shell Builtin) vs Lệnh Ngoài (External Binary)",
          "content": "<p>Khi bạn gõ một lệnh trên terminal, không phải lúc nào hệ điều hành cũng nạp một file từ ổ cứng lên RAM. Linux chia lệnh làm 2 nhóm bản chất:</p><ul><li><strong>Shell Builtin (Lệnh tích hợp sẵn):</strong> Là các hàm được biên dịch sẵn ngay bên trong mã nguồn của Shell Bash. Ví dụ: <code>cd</code>, <code>pwd</code>, <code>echo</code>, <code>exit</code>, <code>history</code>, <code>alias</code>. Khi chạy builtin, shell trực tiếp thực thi mà không cần sinh tiến trình con (fork/exec), giúp tốc độ chạy cực nhanh. Đặc biệt: lệnh <code>cd</code> <em>bắt buộc phải là builtin</em> vì tiến trình con không thể thay đổi thư mục làm việc của tiến trình cha!</li><li><strong>External Binary (File thực thi độc lập):</strong> Là các file nhị phân (ELF) hoặc script nằm thực tế trên ổ cứng (như trong <code>/usr/bin/grep</code>, <code>/usr/bin/ls</code>, <code>/usr/bin/python3</code>). Shell phải tra cứu biến môi trường <code>$PATH</code>, sinh tiến trình con và nạp file từ đĩa.</li></ul><p>Lệnh <code>type -a &lt;tên_lệnh&gt;</code> là công cụ tối thượng để xác định chính xác lệnh bạn đang gọi là loại nào và có bị ghi đè bởi alias hay không.</p>",
          "codeExamples": [
            {
              "title": "Khảo sát bản chất câu lệnh với type -a, which và help",
              "lang": "Bash",
              "code": "# 1. Kiểm tra bản chất của lệnh cd\ntype -a cd\n\n# 2. Kiểm tra bản chất của lệnh echo (vừa là builtin, vừa có file binary ngoài)\ntype -a echo\n\n# 3. Tra cứu trợ giúp nhanh cho các lệnh builtin bằng lệnh help\nhelp cd | head -n 6\n\n# 4. Xác định vị trí file thực thi của lệnh ngoài grep\nwhich grep",
              "output": "cd is a shell builtin\n\necho is a shell builtin\necho is /usr/bin/echo\n\ncd: cd [-L|[-P [-e]] [-@]] [dir]\n    Change the shell working directory.\n    \n    Change the current directory to DIR.  The default DIR is the value of the\n    HOME shell variable.\n\n/usr/bin/grep",
              "annotations": [
                {
                  "part": "type -a cd",
                  "text": "Xác nhận 'cd' là hàm nội bộ tích hợp trong Bash; lệnh này không có file binary riêng trên đĩa."
                },
                {
                  "part": "type -a echo",
                  "text": "Cho thấy 'echo' có 2 bản thể: Bash sẽ ưu tiên chạy bản builtin trước, trừ khi bạn chỉ định rõ /usr/bin/echo."
                },
                {
                  "part": "help cd",
                  "text": "Lệnh 'help' dành riêng để đọc sổ tay cho các lệnh builtin (thay vì dùng 'man cd' vốn mở sổ tay chung của bash)."
                },
                {
                  "part": "which grep",
                  "text": "Tìm kiếm file thực thi của grep trong danh sách các thư mục khai báo trong biến $PATH."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-4",
          "title": "4. Best Practices & Kỹ năng Tự giải quyết Vấn đề (Self-Reliance)",
          "content": "<p>Sự khác biệt giữa một thợ gõ lệnh (script kiddie) và một Kỹ sư Hệ thống Chuyên nghiệp nằm ở <strong>khả năng tự tra cứu tài liệu kỹ thuật</strong> mà không bị phụ thuộc vào các bài blog trôi nổi trên Internet:</p><ol><li><strong>Quy tắc tra cứu 3 bước khi gặp lệnh lạ:</strong><br><em>Bước 1:</em> Gõ <code>type &lt;lệnh&gt;</code> để biết là builtin hay binary ngoài.<br><em>Bước 2:</em> Nếu là builtin, dùng <code>help &lt;lệnh&gt;</code>. Nếu là binary, thử cờ <code>&lt;lệnh&gt; --help</code> hoặc <code>-h</code> để đọc cú pháp tóm tắt.<br><em>Bước 3:</em> Nếu cần tra cứu chi tiết từng cờ và trường hợp biên, mở <code>man &lt;lệnh&gt;</code>.</li><li><strong>Kỹ năng điều hướng trong man (bộ xem less):</strong><br>Bấm phím <code>/&lt;từ_khóa&gt;</code> và Enter để tìm kiếm; bấm <code>n</code> để nhảy tới vị trí tiếp theo; bấm <code>N</code> để lùi lại; bấm <code>q</code> để thoát lập tức về màn hình terminal.</li><li><strong>Cài đặt công cụ tldr (Too Long; Didn't Read):</strong><br>Trang man rất đầy đủ nhưng dài hàng chục trang. Bộ công cụ mã nguồn mở <code>tldr</code> cung cấp 5 ví dụ thực chiến phổ biến nhất của mỗi lệnh, giúp bạn nắm bắt cú pháp trong 5 giây.</li></ol>",
          "codeExamples": [
            {
              "title": "Sử dụng cờ --help và tìm kiếm cờ cụ thể trong man page",
              "lang": "Bash",
              "code": "# 1. Xem trợ giúp ngắn gọn chuẩn GNU của lệnh ls\nls --help | grep -E '^  -h,' -A 1\n\n# 2. Tra cứu giải thích của một cờ cụ thể trong man bằng lệnh col và grep\nman ls | col -b | grep -E '^\\s+-h,' -A 2",
              "output": "  -h, --human-readable\n                         with -l and -s, print sizes like 1K 234M 2G etc.\n\n       -h, --human-readable\n              with -l and -s, print sizes like 1K 234M 2G etc.",
              "annotations": [
                {
                  "part": "ls --help",
                  "text": "Cờ --help chuẩn của các công cụ GNU in nhanh danh sách tùy chọn trực tiếp ra stdout."
                },
                {
                  "part": "col -b",
                  "text": "Lọc bỏ các ký tự backspace ẩn trong output của man page giúp lệnh grep bắt chính xác chuỗi văn bản."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "Terminal là cửa sổ giao diện người dùng; Shell (Bash/Zsh) là trình thông dịch xử lý cú pháp; Command là chương trình thực hiện nhiệm vụ cụ thể.",
        "Cú pháp lệnh chuẩn gồm: Tên lệnh + Cờ tùy chọn (Options) bổ nghĩa + Đối số (Arguments) là đối tượng xử lý.",
        "Hệ thống sổ tay `man` phân chia thành 8 sections: Section 1 cho lệnh người dùng, Section 5 cho định dạng tệp cấu hình và Section 8 cho lệnh quản trị.",
        "Dùng `apropos` hoặc `man -k` khi chỉ nhớ từ khóa chức năng; dùng `help` cho lệnh builtin và dùng `man` cho chương trình độc lập.",
        "Lệnh `type -a` giúp nhận diện rạch ròi giữa Shell Builtin (chạy siêu nhanh trong bộ nhớ shell) và External Binary (nạp file từ ổ cứng qua $PATH)."
      ]
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
        "Phân biệt chính xác giữa Đường dẫn tuyệt đối (bắt đầu từ gốc `/`) và Đường dẫn tương đối (bắt đầu từ vị trí hiện tại `pwd`).",
        "Sử dụng thành thạo các ký tự định hướng không gian: `.` (thư mục hiện tại), `..` (thư mục cha), `~` (thư mục nhà), `-` (chuyển đổi nhanh về thư mục trước).",
        "Thực hiện thành thạo các thao tác quản lý tệp: tạo cây thư mục sâu (`mkdir -p`), sao chép bảo toàn thuộc tính (`cp -a`), di chuyển và đổi tên tệp an toàn (`mv -i`).",
        "Phân biệt bản chất ở mức hệ điều hành giữa Liên kết cứng (Hard Link) và Liên kết mềm (Symbolic Link) dựa trên chỉ số Inode.",
        "Áp dụng quy tắc phòng ngừa rủi ro dữ liệu khi làm việc với lệnh xóa `rm`: kiểm tra trước bằng `ls`, trích dẫn (quoting) khoảng trắng, và thiết lập môi trường thử nghiệm cô lập."
      ],
      "intuition": {
        "title": "Tọa độ GPS toàn cầu, Biển chỉ đường và Cỗ máy nghiền rác vĩnh viễn",
        "metaphor": "Đường dẫn tuyệt đối giống như tọa độ GPS cố định trên Trái Đất (\"Tòa nhà Landmark 81, TP. Hồ Chí Minh\"): dù bạn đang đứng ở đâu, người ta cũng tìm tới đúng địa chỉ đó vì nó luôn bắt đầu từ tâm điểm `/`. Đường dẫn tương đối giống như lời chỉ đường miệng (\"Đi thẳng 100m rồi rẽ trái\"): nó phụ thuộc hoàn toàn vào vị trí bạn đang đứng (`pwd`). Còn liên kết mềm (`ln -s`) giống như một tấm biển chỉ đường bằng gỗ: tấm biển chỉ tay viết \"Kho dữ liệu ở phòng 102\"; nếu bạn tháo dỡ tấm biển gỗ, căn phòng 102 cùng hàng hóa bên trong vẫn còn nguyên. Ngược lại, liên kết cứng (`ln`) giống như việc cấp thêm một chìa khóa chính vào cùng một ổ khóa Inode. Và điều sống còn nhất: lệnh `rm` trên Linux là một cỗ máy nghiền rác một chiều — một khi bạn ấn nút, không có 'Thùng rác Recycle Bin' để nhấn nút Hoàn tác!",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🧭</span><span>QUY TẮC ĐƯỜNG DẪN</span><span class=\"lx-vs-tag\">Absolute vs Relative</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Tuyệt đối (Bắt đầu bằng /):</strong> Xuất phát từ gốc <code>/</code> (ví dụ: <code>/var/log/nginx/access.log</code>). Bất biến ở mọi vị trí làm việc.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Tương đối (Không có / ở đầu):</strong> Tính từ vị trí <code>pwd</code> hiện tại (ví dụ: <code>./app.py</code> hoặc <code>../models/config.json</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Ký tự định hướng:</strong> <code>.</code> (thư mục này), <code>..</code> (thư mục cha), <code>~</code> (thư mục nhà <code>$HOME</code>), <code>-</code> (thư mục vừa đứng trước đó).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🔗</span><span>BẢN CHẤT LIÊN KẾT (LINKS)</span><span class=\"lx-vs-tag\">Inode Indexing</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Hard Link (ln file link):</strong> Tạo thêm một tên file cùng trỏ vào 1 số Inode vật lý trên cùng filesystem. Xóa file gốc thì dữ liệu vẫn còn nguyên!</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Soft Link (ln -s file link):</strong> Tạo một file đặc biệt lưu chuỗi đường dẫn tới file đích. Xóa file gốc thì link trở thành liên kết gãy (Broken symlink).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Giới hạn:</strong> Hard link không thể liên kết thư mục và không thể xuyên qua 2 phân vùng đĩa khác nhau.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Không gian Làm việc & Điều hướng Dòng lệnh Thành thạo",
          "content": "<p>Khi làm việc trong terminal, bạn luôn ở trong một <strong>Thư mục làm việc hiện tại (Current Working Directory)</strong>. Lệnh <code>pwd</code> sẽ in ra tọa độ chính xác của bạn.</p><p>Bảng tổng hợp các thao tác điều hướng cốt lõi mà kỹ sư sử dụng hàng ngày:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Lệnh / Cú pháp</th><th>Mục đích</th><th>Ví dụ</th><th>Ghi chú Kỹ thuật</th></tr></thead><tbody><tr><td><code>pwd</code></td><td>In đường dẫn hiện tại</td><td><code>pwd</code></td><td>Trả về đường dẫn tuyệt đối đầy đủ (Print Working Directory)</td></tr><tr><td><code>cd /path/to/dir</code></td><td>Chuyển thư mục tuyệt đối</td><td><code>cd /etc/nginx/sites-available</code></td><td>Bắt đầu bằng <code>/</code>, hoạt động ở mọi ngữ cảnh</td></tr><tr><td><code>cd relative/path</code></td><td>Chuyển thư mục tương đối</td><td><code>cd ../logs</code></td><td>Tính từ vị trí thư mục hiện tại</td></tr><tr><td><code>cd ~</code> hoặc <code>cd</code></td><td>Về thư mục nhà (Home)</td><td><code>cd</code></td><td>Tương đương <code>cd $HOME</code> (thường là <code>/home/username</code>)</td></tr><tr><td><code>cd -</code></td><td>Quay lại thư mục trước</td><td><code>cd -</code></td><td>Hoán đổi cực nhanh giữa 2 thư mục làm việc vừa đứng</td></tr><tr><td><code>ls -lah</code></td><td>Liệt kê chi tiết file</td><td><code>ls -lah /var/log</code></td><td><code>-l</code> (chi tiết), <code>-a</code> (cả file ẩn), <code>-h</code> (đơn vị K, M, G)</td></tr></tbody></table></div>",
          "codeExamples": [
            {
              "title": "Thực hành điều hướng không gian làm việc với cd và pwd",
              "lang": "Bash",
              "code": "# 1. Xem thư mục hiện tại\npwd\n\n# 2. Chuyển vào thư mục cấu hình Nginx (tuyệt đối)\ncd /etc/nginx\n\n# 3. Lùi về thư mục cha (/etc) dùng đường dẫn tương đối\ncd ..\npwd\n\n# 4. Nhảy về thư mục cá nhân\ncd ~\n\n# 5. Đổi nhanh về thư mục vừa đứng (/etc) bằng dấu gạch ngang\ncd -",
              "output": "/home/devops\n/etc\n/home/devops\n/etc",
              "annotations": [
                {
                  "part": "pwd",
                  "text": "Lệnh chuẩn in ra đường dẫn tuyệt đối bắt đầu từ gốc /."
                },
                {
                  "part": "cd ..",
                  "text": "Dấu .. đại diện cho thư mục cấp cha ngay bên trên thư mục hiện tại."
                },
                {
                  "part": "cd -",
                  "text": "Đọc giá trị từ biến môi trường $OLDPWD để chuyển ngược lại thư mục trước đó."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Thao tác File & Thư mục Chuẩn xác: mkdir, touch, cp, mv",
          "content": "<p>Khi tự động hóa triển khai ứng dụng, bạn cần tuân thủ các quy tắc an toàn sau để không làm gián đoạn dịch vụ:</p><ul><li><strong>Tạo cấu trúc thư mục lồng nhau với <code>mkdir -p</code>:</strong> Cờ <code>-p</code> (parents) giúp tạo chuỗi thư mục cha nếu chưa có và không gây lỗi nếu thư mục đích đã tồn tại (tính chất <em>Idempotent</em> - lũy thừa trong DevOps).</li><li><strong>Sao lưu nguyên vẹn thuộc tính với <code>cp -a</code>:</strong> Cờ <code>-a</code> (archive) tương đương <code>-dR --preserve=all</code>. Khi sao lưu mã nguồn web hoặc cấu hình, <code>cp -a</code> bảo toàn nguyên vẹn quyền sở hữu (owner), phân quyền (rwx), thời gian sửa đổi (timestamps) và các liên kết tượng trưng (symlinks). Dùng <code>cp -r</code> thông thường sẽ khiến file sao lưu biến thành sở hữu của user đang gõ lệnh, làm hỏng quyền của dịch vụ (như <code>www-data</code>).</li><li><strong>Di chuyển và đổi tên an toàn với <code>mv -i</code>:</strong> Lệnh <code>mv</code> mặc định sẽ ghi đè không cảnh báo nếu file đích đã tồn tại. Cờ <code>-i</code> (interactive) yêu cầu xác nhận trước khi ghi đè, tránh làm mất file dữ liệu trùng tên.</li></ul>",
          "codeExamples": [
            {
              "title": "Tạo cấu trúc dự án Python và sao lưu bảo toàn thuộc tính với cp -a",
              "lang": "Bash",
              "code": "# 1. Tạo cây thư mục dự án sâu trong 1 lệnh duy nhất\nmkdir -p myproject/{app/api,app/models,tests,config,logs}\n\n# 2. Tạo file cấu hình rỗng\ntouch myproject/config/settings.env\n\n# 3. Sao chép bảo toàn toàn bộ thuộc tính sang thư mục backup\ncp -a myproject/ myproject.backup/\n\n# 4. Kiểm tra cấu trúc thư mục vừa tạo bằng ls\nls -R myproject/config",
              "output": "myproject/config:\nsettings.env",
              "annotations": [
                {
                  "part": "mkdir -p",
                  "text": "Cờ --parents tự động sinh toàn bộ cây thư mục lồng nhau mà không báo lỗi."
                },
                {
                  "part": "myproject/{...}",
                  "text": "Tính năng Brace Expansion của Shell: mở rộng chuỗi giúp tạo hàng loạt thư mục nhanh chóng."
                },
                {
                  "part": "cp -a",
                  "text": "Chế độ Archive: giữ nguyên ownership, permissions, timestamps và symlinks."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Phân định Bản chất Inode: Hard Link vs Symbolic Link (ln vs ln -s)",
          "content": "<p>Trong hệ thống file Linux, một tệp tin gồm 2 phần tách biệt: (1) <strong>Dữ liệu nội dung</strong> nằm trên các khối đĩa (Data Blocks), và (2) <strong>Cấu trúc quản lý Inode</strong> chứa metadata (kích thước, chủ sở hữu, thời gian, con trỏ tới data blocks). Tên file mà bạn nhìn thấy chỉ là một mục trong bảng thư mục ánh xạ tới một số hiệu Inode (Inode Number).</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Đặc tính Kỹ thuật</th><th>Hard Link (Liên kết cứng: <code>ln file link</code>)</th><th>Symbolic Link (Liên kết mềm: <code>ln -s file link</code>)</th></tr></thead><tbody><tr><td><strong>Bản chất Inode</strong></td><td>Chung một số Inode với file gốc. Cùng trỏ tới Data Blocks vật lý.</td><td>Có số Inode riêng biệt. Data Block của link chỉ chứa chuỗi đường dẫn file gốc.</td></tr><tr><td><strong>Khi xóa file gốc</strong></td><td><strong>Dữ liệu vẫn còn nguyên vẹn!</strong> Số lượng link count giảm đi 1, chỉ khi link count về 0 thì block mới giải phóng.</td><td><strong>Link bị gãy (Broken symlink)!</strong> Mở file link sẽ báo lỗi <em>No such file or directory</em>.</td></tr><tr><td><strong>Xuyên phân vùng đĩa</strong></td><td><strong>Không thể.</strong> Chỉ áp dụng trong cùng 1 phân vùng filesystem.</td><td><strong>Hoàn toàn được.</strong> Có thể liên kết xuyên qua mọi ổ đĩa, NFS, phân vùng khác.</td></tr><tr><td><strong>Liên kết thư mục</strong></td><td><strong>Không được phép</strong> (để tránh tạo vòng lặp vô tận trong filesystem).</td><td><strong>Được phép.</strong> Rất phổ biến khi liên kết phiên bản ứng dụng (ví dụ <code>current -&gt; release_v2</code>).</td></tr></tbody></table></div>",
          "codeExamples": [
            {
              "title": "Kiểm chứng bản chất Inode của Hard Link và Soft Link",
              "lang": "Bash",
              "code": "# 1. Tạo file gốc và kiểm tra số Inode của file\necho \"Dữ liệu quan trọng\" > original.txt\nls -li original.txt\n\n# 2. Tạo Hard Link và kiểm tra số Inode\nln original.txt hardlink.txt\nls -li original.txt hardlink.txt\n\n# 3. Tạo Soft Link (Symlink) và kiểm tra số Inode\nln -s original.txt softlink.txt\nls -li original.txt softlink.txt",
              "output": "1441852 -rw-r--r-- 1 devops devops 24 Oct 28 10:20 original.txt\n1441852 -rw-r--r-- 2 devops devops 24 Oct 28 10:20 hardlink.txt\n1441852 -rw-r--r-- 2 devops devops 24 Oct 28 10:20 original.txt\n1441853 lrwxrwxrwx 1 devops devops 12 Oct 28 10:21 softlink.txt -> original.txt\n1441852 -rw-r--r-- 2 devops devops 24 Oct 28 10:20 original.txt",
              "annotations": [
                {
                  "part": "ls -li",
                  "text": "Cờ -i (inode): in số hiệu Inode ở cột đầu tiên (1441852)."
                },
                {
                  "part": "2 devops devops",
                  "text": "Cột thứ 3 là Link Count tăng từ 1 lên 2 khi có Hard link cùng trỏ vào Inode 1441852."
                },
                {
                  "part": "1441853 lrwxrwxrwx",
                  "text": "Soft link có số Inode riêng (1441853), chữ cái đầu 'l' biểu thị symlink."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-4",
          "title": "4. Cảnh báo Đỏ An toàn Thao tác: Kỷ luật Sinh tử với lệnh rm",
          "content": "<p>Khác với môi trường Windows hay macOS có 'Thùng rác' (Recycle Bin), lệnh <code>rm</code> trên Linux thực hiện lệnh gọi hệ thống <code>unlink()</code> xóa bỏ liên kết tệp khỏi bảng chỉ mục filesystem. Không có nút Undo!</p><div class=\"callout-box callout-danger lx-danger-strong\"><div class=\"callout-header\"><span class=\"lx-badge-danger\">CẢNH BÁO ĐỎ TỐI NGUY HIỂM</span><span>Thảm họa xóa nhầm toàn bộ hệ thống với <code>rm -rf</code>!</span></div><div class=\"callout-body\"><p>Lệnh kinh điển <code>rm -rf /</code> hoặc chỉ một sơ suất dấu cách định mệnh <code>rm -rf / tmp/cache</code> (do gõ cách giữa <code>/</code> và <code>tmp</code>) sẽ <strong>ngay lập tức xóa sạch toàn bộ hệ điều hành và cơ sở dữ liệu trên máy chủ!</strong></p><div class=\"lx-safe-alternative\"><span class=\"lx-badge-safe\">4 NGUYÊN TẮC VÀNG SINH TỒN KHI XÓA DỮ LIỆU</span><div style=\"margin-top:6px;\">1. <strong>Quy tắc Xem trước bằng <code>ls</code>:</strong> Trước khi chạy <code>rm -rf /path/to/target/*</code>, hãy thay <code>rm -rf</code> bằng <code>ls -d /path/to/target/*</code> để kiểm tra chính xác danh sách mục sắp bị xóa.</div><div>2. <strong>Luôn trích dẫn (Quote) đường dẫn có khoảng trắng:</strong> Nếu thư mục tên là <code>My Data</code>, gõ <code>rm -rf \"My Data\"</code> hoặc <code>rm -rf My\\ Data</code>. Không bao giờ gõ <code>rm -rf My Data</code> vì lệnh sẽ xóa cả thư mục <code>My</code> và thư mục <code>Data</code>!</div><div>3. <strong>Bảo vệ biến môi trường rỗng:</strong> Tuyệt đối không viết trong script <code>rm -rf $APP_DIR/*</code> mà không kiểm tra biến rỗng (nếu <code>APP_DIR=\"\"</code>, lệnh biến thành <code>rm -rf /*</code>!). Luôn dùng cú pháp phòng thủ: <code>rm -rf \"${APP_DIR:?Thieu_duong_dan}/*\"</code>.</div><div>4. <strong>Sử dụng cờ xác nhận <code>rm -i</code>:</strong> Khi thao tác thủ công trên dữ liệu quan trọng, dùng <code>rm -i</code> để hệ thống hỏi xác nhận từng tệp trước khi xóa.</div></div></div></div>",
          "codeExamples": [
            {
              "title": "Kỹ thuật kiểm tra xem trước (Dry-run) an toàn trước khi xóa bằng rm",
              "lang": "Bash",
              "code": "# Bước 1 (Dry-run): Dùng ls để xem trước danh sách file log sẽ bị xóa\nls -d /tmp/app-logs/*.log\n\n# Bước 2: Dùng rm an toàn với cờ xác nhận tương tác -i nếu chỉ có vài file\nrm -i /tmp/app-logs/test.log\n\n# Bước 3: Di chuyển vào thùng rác tạm thời thay vì xóa vĩnh viễn (Best Practice)\nmkdir -p ~/.trash && mv /tmp/app-logs/*.log ~/.trash/",
              "output": "/tmp/app-logs/error.log  /tmp/app-logs/test.log\nrm: remove regular file '/tmp/app-logs/test.log'? y",
              "annotations": [
                {
                  "part": "ls -d",
                  "text": "Kiểm tra bằng mắt thường danh sách chính xác các file khớp mẫu trước khi xóa."
                },
                {
                  "part": "rm -i",
                  "text": "Yêu cầu người dùng gõ y (yes) hoặc n (no) trước khi xóa từng file."
                },
                {
                  "part": "mv ... ~/.trash/",
                  "text": "Chiến lược 'Soft Delete': chuyển file vào thư mục rác tạm thời để có thể khôi phục khi cần."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "Đường dẫn tuyệt đối luôn bắt đầu từ `/` và trỏ cố định đến một vị trí; đường dẫn tương đối tính từ thư mục hiện tại `pwd`.",
        "Bốn ký tự định hướng cốt lõi: `.` (thư mục này), `..` (thư mục cha), `~` (thư mục nhà) và `-` (thư mục vừa đứng trước đó).",
        "Luôn dùng `mkdir -p` để tạo cây thư mục lồng nhau an toàn và dùng `cp -a` để bảo toàn quyền sở hữu, timestamps và symlinks.",
        "Hard link trỏ chung số Inode vật lý và bảo toàn dữ liệu khi xóa file gốc; Soft link (symlink) lưu chuỗi đường dẫn và sẽ bị gãy nếu file đích bị xóa.",
        "Lệnh `rm` xóa vĩnh viễn không thể hoàn tác: luôn kiểm tra trước bằng `ls`, trích dẫn khoảng trắng và áp dụng phương pháp Soft Delete vào thư mục rác tạm thời."
      ]
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
        "Lựa chọn chính xác công cụ đọc tệp phù hợp với dung lượng: dùng `cat` cho tệp nhỏ cấu hình, dùng `less` làm tiêu chuẩn vàng cho tệp lớn để chống cạn kiệt RAM.",
        "Trích xuất nhanh các dòng đầu (`head`) và các dòng cuối (`tail`) của tệp nhật ký.",
        "Phân biệt bản chất kỹ thuật giữa `tail -f` (theo dõi File Descriptor) và `tail -F` (theo dõi Tên tệp, tự động bám đuôi khi file log bị xoay vòng bởi logrotate).",
        "Thực hiện thành thạo các thao tác chỉnh sửa cấu hình khẩn cấp bằng `nano` và sinh tồn trong `vim` (chuyển đổi 3 chế độ, lưu file, thoát hiểm khi bị kẹt)."
      ],
      "intuition": {
        "title": "Ống kính hiển vi, Cuộn phim chiếu bóng và Chiếc hộp giải cứu Vim",
        "metaphor": "Dùng lệnh `cat` đọc một file log 20GB giống như việc bạn cố nhét một con voi khổng lồ qua khe cửa sổ bé xíu: toàn bộ văn bản ùa ra ào ạt làm tràn bộ nhớ đệm terminal và treo cứng phiên làm việc SSH. Ngược lại, trình đọc `less` giống như một cuộn phim chiếu bóng thông minh: nó chỉ mở ra đúng một trang màn hình vừa đủ cho mắt bạn đọc và tải tiếp theo từng bước cuộn chuột mà không tốn thêm một byte RAM nào. Còn trình soạn thảo `vim` giống như chiếc phi thuyền điều khiển bằng bàn phím cơ: người mới bước vào bấm loạn xạ sẽ thấy nó 'đơ cứng' vì phi thuyền đang ở chế độ Điều khiển (Normal Mode). Chỉ cần nhớ đúng mật mã thoát hiểm `:q!`, bạn sẽ luôn an toàn tiếp đất.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📖</span><span>CHIẾN LƯỢC XEM TỆP</span><span class=\"lx-vs-tag\">RAM Optimization</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>cat</code> (Concatenate):</strong> Đổ toàn bộ nội dung ra stdout. Chỉ dùng cho file cấu hình nhỏ (&lt; 100 dòng).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>less</code> (Pager chuẩn):</strong> Tải tệp theo từng trang hiển thị, không nạp cả file vào RAM. Tiêu chuẩn vàng đọc file lớn.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>head -n / tail -n</code>:</strong> Chỉ xem N dòng đầu hoặc N dòng cuối. Tiết kiệm 99% thời gian tra cứu.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>⚡</span><span>GIÁM SÁT LOG REALTIME</span><span class=\"lx-vs-tag\">tail -f vs tail -F</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>tail -f</code> (follow descriptor):</strong> Theo dõi con trỏ tệp hiện tại. Khi file log bị đổi tên bởi <code>logrotate</code>, lệnh bị mất dấu và ngừng in log mới!</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>tail -F</code> (follow name + retry):</strong> Theo dõi theo tên file. Khi logrotate tạo file mới cùng tên, lệnh tự động bám đuôi file mới ngay lập tức.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Khuyên dùng:</strong> Luôn dùng <code>tail -F</code> (F hoa) trong môi trường sản xuất!</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Khảo sát Tệp Văn bản: cat, less và Nguy cơ Treo Terminal",
          "content": "<p>Đọc file là thao tác phổ biến nhất nhưng cũng tiềm ẩn rủi ro nếu chọn sai công cụ:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Lệnh</th><th>Cơ chế Hoạt động</th><th>Khi nào nên dùng</th><th>Cảnh báo Nguy cơ</th></tr></thead><tbody><tr><td><code>cat file</code></td><td>In toàn bộ file ra terminal từ dòng đầu đến dòng cuối</td><td>File cấu hình nhỏ, script ngắn (&lt; 2MB)</td><td><strong>Tuyệt đối tránh với file lớn!</strong> Gây tràn bộ nhớ đệm terminal, nghẽn băng thông mạng SSH.</td></tr><tr><td><code>cat -n file</code></td><td>In nội dung kèm số thứ tự dòng</td><td>Xem code cần đối chiếu dòng lỗi</td><td>Chỉ dùng khi file ngắn.</td></tr><tr><td><code>less file</code></td><td>Trình phân trang (Terminal Pager) nạp nội dung theo nhu cầu</td><td>Mọi file văn bản lớn, file log hàng chục GB</td><td><strong>Tiêu chuẩn vàng!</strong> Hỗ trợ tìm kiếm, cuộn trang mượt mà không tốn RAM.</td></tr></tbody></table></div><p>Các phím tắt sinh tồn trong <code>less</code>:</p><ul><li><code>Phím cách</code> hoặc <code>f</code>: Tiến tới 1 trang màn hình; <code>b</code>: Lùi lại 1 trang.</li><li><code>G</code> (Shift+G): Nhảy thẳng xuống dòng cuối cùng của file; <code>1G</code> hoặc <code>g</code>: Nhảy lên dòng đầu tiên.</li><li><code>/từ_khóa</code> và Enter: Tìm kiếm xuôi từ trên xuống; <code>n</code>: Xem kết quả kế tiếp; <code>N</code>: Quay lại kết quả trước.</li><li><code>q</code>: Thoát khỏi trình xem ngay lập tức.</li></ul>",
          "codeExamples": [
            {
              "title": "Đọc file cấu hình an toàn với cat -n và less",
              "lang": "Bash",
              "code": "# 1. Xem nội dung file cấu hình nhỏ kèm số dòng\ncat -n /etc/issue\n\n# 2. Mở file log dung lượng lớn an toàn bằng less\nless /var/log/syslog",
              "output": "     1\tUbuntu 24.04.1 LTS \\n \\l\n     2\t\n\n[Màn hình chuyển sang giao diện less cuộn mượt mà]",
              "annotations": [
                {
                  "part": "cat -n",
                  "text": "Cờ -n đánh số thứ tự từng dòng (number all output lines)."
                },
                {
                  "part": "less",
                  "text": "Chỉ đọc một lượng nhỏ dữ liệu đủ lấp đầy chiều cao cửa sổ terminal, không làm chậm máy chủ."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Trích xuất Đầu/Đuôi & Giám sát Log Thời gian Thực (tail -F)",
          "content": "<p>Khi điều tra sự cố ứng dụng, bạn thường chỉ quan tâm đến 10 dòng lỗi mới xuất hiện ở cuối file hoặc vài dòng cấu hình header ở đầu file:</p><ul><li><strong><code>head -n [K] file</code>:</strong> Trích xuất chính xác <code>K</code> dòng đầu tiên của file (mặc định là 10 dòng nếu không truyền <code>-n</code>).</li><li><strong><code>tail -n [K] file</code>:</strong> Trích xuất chính xác <code>K</code> dòng cuối cùng của file.</li><li><strong>Giám sát trực tiếp (Realtime Log Streaming):</strong> Lệnh <code>tail -f /var/log/my-app.log</code> giữ phiên terminal mở và in ra dòng mới mỗi khi có request gửi tới ứng dụng.</li></ul><p><strong>Khác biệt sinh tử giữa <code>tail -f</code> và <code>tail -F</code>:</strong></p><blockquote>Trên production, tiến trình <code>logrotate</code> định kỳ xoay vòng file log (ví dụ đổi <code>access.log</code> thành <code>access.log.1</code> và tạo file <code>access.log</code> mới rỗng). Nếu bạn dùng <code>tail -f</code>, lệnh sẽ tiếp tục bám theo file descriptor cũ (file <code>access.log.1</code> đã ngừng ghi) và bạn sẽ không nhìn thấy bất kỳ log mới nào! Ngược lại, <code>tail -F</code> (viết hoa) theo dõi theo Tên Tệp và tự động tái thử nghiệm mở lại file mới ngay khi <code>logrotate</code> tạo ra nó.</blockquote>",
          "codeExamples": [
            {
              "title": "Trích xuất dòng và theo dõi log thời gian thực với tail -F",
              "lang": "Bash",
              "code": "# 1. Xem 5 dòng đầu tiên của danh sách tài khoản hệ thống\nhead -n 5 /etc/passwd\n\n# 2. Xem 3 dòng log mới nhất\ntail -n 3 /var/log/dpkg.log\n\n# 3. Theo dõi log ứng dụng thời gian thực chuẩn sản xuất (chống xoay vòng logrotate)\ntail -n 20 -F /var/log/nginx/access.log",
              "output": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsync:x:4:65534:sync:/bin:/bin/sync\n\n2024-10-28 10:00:01 status installed python3.12:amd64 3.12.3-1\n2024-10-28 10:00:02 status installed python3-pip:all 24.0+dfsg-1ubuntu1\n2024-10-28 10:00:03 status installed nginx:amd64 1.24.0-2ubuntu7",
              "annotations": [
                {
                  "part": "head -n 5",
                  "text": "Chỉ lấy 5 dòng đầu tiên từ đỉnh tệp."
                },
                {
                  "part": "tail -n 20 -F",
                  "text": "In 20 dòng cuối hiện tại (-n 20) và duy trì bám đuôi theo tên tệp (-F) chống xoay vòng."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Soạn thảo Cấu hình Khẩn cấp: nano Trực quan vs vim Sinh tồn",
          "content": "<p>Khi đăng nhập vào máy chủ từ xa qua SSH, bạn không có các trình soạn thảo đồ họa như VS Code. Bạn bắt buộc phải thành thạo ít nhất một trình soạn thảo trên dòng lệnh:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Đặc tính</th><th>Trình soạn thảo nano</th><th>Trình soạn thảo vim</th></tr></thead><tbody><tr><td><strong>Mức độ học tập</strong></td><td>Rất trực quan, thanh menu phím tắt hiển thị sẵn ở đáy màn hình.</td><td>Cần học thuộc các chế độ (Modes), tốc độ chỉnh sửa cực nhanh cho chuyên gia.</td></tr><tr><td><strong>Môi trường mặc định</strong></td><td>Thường có sẵn trên Ubuntu/Debian, có thể thiếu trên CentOS/RHEL minimal.</td><td>Hầu như luôn có mặt trên mọi bản phân phối Linux và máy chủ cứu hộ.</td></tr><tr><td><strong>Phím tắt thoát</strong></td><td><code>Ctrl + O</code> (Lưu file) và <code>Ctrl + X</code> (Thoát)</td><td><code>:wq</code> (Lưu và thoát) hoặc <code>:q!</code> (Thoát không lưu)</td></tr></tbody></table></div><p><strong>Cẩm nang sinh tồn tối thiểu trong Vim:</strong></p><ul><li>Khi vừa mở file bằng <code>vim file.txt</code>, bạn đang ở <strong>Normal Mode (Chế độ lệnh)</strong>. Gõ phím chữ sẽ không chèn văn bản mà được hiểu là lệnh.</li><li>Bấm phím <code>i</code> (Insert): Chuyển sang <strong>Insert Mode</strong> để bắt đầu gõ mã nguồn như trình soạn thảo bình thường.</li><li>Bấm phím <code>Esc</code>: Quay lại <strong>Normal Mode</strong>.</li><li>Gõ <code>:w</code> và Enter: Lưu file (Write).</li><li>Gõ <code>:wq</code> và Enter: Lưu và thoát (Write &amp; Quit).</li><li>Gõ <code>:q!</code> và Enter: <strong>Thoát hiểm khẩn cấp</strong> không lưu bất kỳ thay đổi nào (Force Quit).</li><li>Trong Normal Mode, gõ <code>/từ_cần_tìm</code> rồi Enter để tìm kiếm, bấm <code>dd</code> để xóa nguyên một dòng, bấm <code>u</code> để Hoàn tác (Undo).</li></ul>",
          "codeExamples": [
            {
              "title": "Quy trình chỉnh sửa file cấu hình bằng nano và vim",
              "lang": "Bash",
              "code": "# 1. Mở file cấu hình biến môi trường bằng nano trực quan\nnano /tmp/app.env\n\n# 2. Mở file cấu hình bằng vim với con trỏ nhảy sẵn tới dòng 10\nvim +10 /tmp/app.env",
              "output": "[Giao diện dòng lệnh nano: dưới đáy hiển thị ^O WriteOut  ^X Exit]\n[Giao diện vim: hiển thị con trỏ tại dòng 10]",
              "annotations": [
                {
                  "part": "nano",
                  "text": "Ký hiệu ^ tương đương phím Ctrl (ví dụ: ^X nghĩa là nhấn tổ hợp Ctrl+X)."
                },
                {
                  "part": "vim +10",
                  "text": "Mở tệp và nhảy ngay tới dòng số 10 (cực kỳ tiện khi log báo lỗi ở dòng 10)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-4",
          "title": "4. Best Practices & Kỷ luật Bảo vệ Máy chủ khi Xem/Sửa File",
          "content": "<p>Nhiều sự cố sập server bắt nguồn từ những thói quen xem file bất cẩn của lập trình viên:</p><ol><li><strong>Tuyệt đối không dùng <code>cat</code> với file Binary hoặc file Log nén (.gz):</strong> Nếu gõ <code>cat app.tar.gz</code> hoặc <code>cat /usr/bin/python3</code>, terminal sẽ nhận hàng ngàn mã điều khiển nhị phân, phát ra tiếng bíp liên tục và làm loạn bảng mã hiển thị. Nếu lỡ tay gõ nhầm, hãy gõ lệnh <code>reset</code> rồi Enter để khôi phục lại terminal.</li><li><strong>Xem file log nén mà không cần giải nén bằng <code>zless</code> / <code>zcat</code>:</strong> Khi file log cũ đã được nén thành <code>syslog.2.gz</code>, không cần giải nén ra đĩa! Dùng lệnh <code>zless /var/log/syslog.2.gz</code> để đọc trực tiếp luồng giải nén trong bộ nhớ.</li><li><strong>Luôn sao lưu trước khi sửa file cấu hình:</strong> Trước khi gõ <code>vim /etc/nginx/nginx.conf</code>, luôn tạo bản sao: <code>sudo cp -a /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak-$(date +%F)</code>.</li></ol>",
          "codeExamples": [
            {
              "title": "Kiểm tra định dạng file bằng file và đọc log nén với zcat",
              "lang": "Bash",
              "code": "# 1. Kiểm tra bản chất tệp trước khi đọc (văn bản hay nhị phân)\nfile /var/log/dpkg.log\nfile /usr/bin/python3\n\n# 2. Đọc 3 dòng đầu của file log đã bị nén gzip mà không cần giải nén ra đĩa\nzcat /var/log/dpkg.log.1.gz 2>/dev/null | head -n 3",
              "output": "/var/log/dpkg.log: UTF-8 Unicode text\n/usr/bin/python3:   ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV)\n\n2024-09-01 06:25:10 status installed python3-minimal:amd64 3.12.3-0ubuntu1\n2024-09-01 06:25:11 status installed libpython3-stdlib:amd64 3.12.3-0ubuntu1\n2024-09-01 06:25:12 status installed python3:amd64 3.12.3-0ubuntu1",
              "annotations": [
                {
                  "part": "file /var/log/dpkg.log",
                  "text": "Kiểm tra magic bytes để xác nhận tệp là văn bản thuần (Unicode text) có thể đọc an toàn."
                },
                {
                  "part": "ELF 64-bit ... executable",
                  "text": "Báo hiệu tệp thực thi nhị phân, tuyệt đối không được mở bằng cat."
                },
                {
                  "part": "zcat",
                  "text": "Giải nén luồng trực tiếp ra stdout, tiết kiệm dung lượng đĩa và thời gian."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "Dùng `cat` cho tệp nhỏ cấu hình; dùng `less` làm tiêu chuẩn vàng cho tệp lớn để không bao giờ bị nghẽn RAM hay đơ terminal.",
        "Trích xuất nhanh bằng `head -n` (dòng đầu) và `tail -n` (dòng cuối) giúp tiết kiệm 95% thời gian tìm kiếm.",
        "Luôn dùng `tail -F` (F hoa) thay vì `tail -f` khi giám sát thời gian thực để chống mất dấu vết khi `logrotate` xoay vòng tệp nhật ký.",
        "Khắc cốt ghi tâm cơ chế 3 chế độ của Vim: bấm `Esc` để về Normal Mode, dùng `:wq` để lưu thoát và dùng `:q!` để thoát hiểm không lưu.",
        "Kiểm tra định dạng file bằng `file` trước khi mở và dùng `zcat`/`zless` để đọc trực tiếp file log nén `.gz` mà không cần giải nén ra đĩa."
      ]
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
        "Giải mã chính xác chuỗi quyền 10 ký tự trong `ls -l` cho 3 đối tượng: Chủ sở hữu (User), Nhóm sở hữu (Group) và Người khác (Others).",
        "Phân biệt rõ ràng sự khác biệt về ngữ nghĩa của các quyền `r`, `w`, `x` khi áp dụng trên Tệp tin (File) so với Thư mục (Directory).",
        "Tính toán và chuyển đổi thành thạo giữa Ký pháp Bát phân (Octal 4-2-1) và Ký hiệu Chữ (`u+x`, `go-w`) trong lệnh `chmod`.",
        "Thay đổi chủ sở hữu và nhóm bằng `chown` và `chgrp`, hiểu nguyên tắc hoạt động của `umask` (mặt nạ tạo quyền mặc định).",
        "Áp dụng nguyên tắc đặc quyền tối thiểu (Least Privilege) với `sudo`, giải thích vì sao bắt buộc phải dùng `visudo` để chỉnh sửa file phân quyền."
      ],
      "intuition": {
        "title": "Thẻ từ ra vào tòa nhà, Chìa khóa căn phòng và Sổ ủy quyền pháp lý",
        "metaphor": "Hệ thống quyền Linux giống như cơ chế an ninh thẻ từ của một tòa cao ốc văn phòng. Mỗi căn phòng (thư mục) và tài liệu (file) đều gắn một bảng phân quyền cho 3 nhóm người: Chủ sở hữu (User/Owner - người trực tiếp quản lý), Đồng nghiệp trong phòng ban (Group), và Khách vãng lai bên ngoài (Others). Quyền đọc `r` đối với file là được mở ra đọc chữ; nhưng đối với thư mục, `r` chỉ là được nhìn vào danh sách tên các phòng bên trong. Đặc biệt, quyền thực thi `x` đối với thư mục chính là 'chiếc chìa khóa mở cửa' — nếu không có quyền `x`, bạn nhìn thấy căn phòng đó nhưng không tài nào bước chân vào trong (`cd`) được! Còn lệnh `sudo` giống như một tờ giấy ủy quyền có chữ ký của Giám đốc (root): chỉ cho phép nhân viên thực hiện đúng việc được chỉ định mà không giao luôn con dấu tối cao của công ty.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🛡️</span><span>GIẢI MÃ CHUỖI QUYỀN 10 KÝ TỰ</span><span class=\"lx-vs-tag\">ls -l Matrix</span></div><div style=\"padding:8px 12px;background:var(--bg-code);border-radius:6px;color:#f1f5f9;font-family:var(--font-mono);font-size:0.9rem;margin:6px 0;letter-spacing:2px;\"><span style=\"color:#f87171;\">-</span><span style=\"color:#60a5fa;\">rwx</span><span style=\"color:#34d399;\">r-x</span><span style=\"color:#fbbf24;\">r--</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Ký tự 1:</strong> Định dạng (<code>-</code> là file thường, <code>d</code> là thư mục, <code>l</code> là symlink).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Ký tự 2-4:</strong> Quyền của Chủ sở hữu (<strong>User/Owner</strong>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Ký tự 5-7:</strong> Quyền của Nhóm quản lý (<strong>Group</strong>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Ký tự 8-10:</strong> Quyền của Người dùng khác (<strong>Others</strong>).</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🔢</span><span>QUY ĐỔI BÁT PHÂN (OCTAL)</span><span class=\"lx-vs-tag\">Weight 4-2-1</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>r</code> (Read):</strong> Giá trị <strong>4</strong> (Nhị phân 100). Đọc nội dung file / Liệt kê thư mục.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>w</code> (Write):</strong> Giá trị <strong>2</strong> (Nhị phân 010). Sửa file / Tạo và xóa file trong thư mục.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>x</code> (Execute):</strong> Giá trị <strong>1</strong> (Nhị phân 001). Chạy file / Bước chân vào thư mục (<code>cd</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Ví dụ:</strong> <code>rwx</code> = 4+2+1 = <strong>7</strong> | <code>r-x</code> = 4+0+1 = <strong>5</strong> | <code>r--</code> = 4+0+0 = <strong>4</strong>.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Ma trận Quyền hạn: Sự Khác biệt Lớn giữa File và Thư mục",
          "content": "<p>Sai lầm phổ biến nhất của người học là nghĩ rằng <code>rwx</code> trên Thư mục cũng giống hệt như trên File. Bảng đối chiếu kỹ thuật dưới đây là kiến thức cốt lõi bắt buộc trong các kỳ thi LPIC-1 và RHCSA:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Quyền Hạn</th><th>Ý nghĩa đối với TỆP TIN (File)</th><th>Ý nghĩa đối với THƯ MỤC (Directory)</th></tr></thead><tbody><tr><td><strong><code>r</code> (Read - Đọc)</strong></td><td>Xem, đọc nội dung bên trong file (dùng <code>cat</code>, <code>less</code>)</td><td>Xem danh sách tên các tệp có trong thư mục (dùng <code>ls</code>)</td></tr><tr><td><strong><code>w</code> (Write - Ghi)</strong></td><td>Chỉnh sửa, ghi đè, thêm bớt dữ liệu vào file (dùng <code>nano</code>, <code>vim</code>)</td><td><strong>Tạo mới, đổi tên hoặc XÓA</strong> tệp con nằm trong thư mục (dù tệp con đó của người khác!)</td></tr><tr><td><strong><code>x</code> (Execute - Thực thi)</strong></td><td>Chạy tệp như một chương trình nhị phân hoặc shell script</td><td><strong>Bước chân vào thư mục (<code>cd</code>)</strong> và truy vấn metadata Inode của tệp bên trong</td></tr></tbody></table></div><div class=\"callout-box warning-box\"><div class=\"callout-title\">⚠️ Cạm bẫy 'Permission denied' kinh điển</div><p>Nếu một thư mục có quyền <code>r--</code> nhưng thiếu quyền <code>x</code> (ví dụ quyền 444): Bạn có thể gõ <code>ls</code> để nhìn thấy tên các file, nhưng bạn <strong>KHÔNG THỂ <code>cd</code> vào thư mục</strong> và cũng <strong>KHÔNG THỂ đọc nội dung của bất kỳ file nào</strong> bên trong, vì quyền <code>x</code> là chiếc chìa khóa bắt buộc để hệ thống giải mã đường dẫn Inode!</p></div>",
          "codeExamples": [
            {
              "title": "Khảo sát chi tiết quyền truy cập tệp và thư mục",
              "lang": "Bash",
              "code": "# 1. Xem quyền chi tiết của thư mục hiện tại và file con\nls -ld /var/www /var/www/html/index.nginx-debian.html",
              "output": "drwxr-xr-x 3 root root 4096 Oct 15 10:00 /var/www\n-rw-r--r-- 1 root root  612 Oct 15 10:00 /var/www/html/index.nginx-debian.html",
              "annotations": [
                {
                  "part": "drwxr-xr-x",
                  "text": "Thư mục /var/www: Owner (root) có toàn quyền rwx; Group và Others có quyền r-x (xem và đi vào được)."
                },
                {
                  "part": "-rw-r--r--",
                  "text": "File index: Owner có quyền rw-; Group và Others chỉ có quyền đọc r-- (an toàn cho web public)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Thiết lập Quyền với chmod: Ký pháp Bát phân vs Ký hiệu Chữ",
          "content": "<p>Lệnh <code>chmod</code> (Change Mode) cho phép quản trị viên thay đổi quyền theo hai phương thức:</p><ul><li><strong>Ký pháp Bát phân (Octal Mode):</strong> Biểu diễn bằng 3 con số (ví dụ <code>755</code>, <code>644</code>). Con số thứ nhất cho User, số thứ hai cho Group, số thứ ba cho Others. Tính bằng tổng trọng số: <code>r=4</code>, <code>w=2</code>, <code>x=1</code>.</li><li><strong>Ký hiệu Chữ (Symbolic Mode):</strong> Thao tác trực tiếp trên từng nhóm: Đối tượng (<code>u</code>: user, <code>g</code>: group, <code>o</code>: others, <code>a</code>: all) kết hợp với Toán tử (<code>+</code>: thêm quyền, <code>-</code>: tước quyền, <code>=</code>: gán chính xác quyền). Ví dụ: <code>chmod u+x script.sh</code> (chỉ cấp quyền thực thi cho chủ nhân).</li></ul><div class=\"callout-box callout-danger lx-danger-strong\"><div class=\"callout-header\"><span class=\"lx-badge-danger\">CẢNH BÁO BẢO MẬT CIS BENCHMARK</span><span>Tội đồ bảo mật: Tại sao tuyệt đối tránh <code>chmod 777</code>?</span></div><div class=\"callout-body\"><p>Lập trình viên khi gặp lỗi <em>Permission denied</em> thường có thói quen lười biếng: gõ <code>chmod 777 -R du_an/</code>. Lệnh này cấp toàn quyền Đọc, Ghi và Thực thi cho <strong>BẤT KỲ AI TRÊN INTERNET</strong>. Kẻ tấn công chỉ cần tải một con webshell hoặc script độc hại lên thư mục upload và kích hoạt thực thi từ xa (Remote Code Execution - RCE) để chiếm quyền hoàn toàn máy chủ!</p><div class=\"lx-safe-alternative\"><span class=\"lx-badge-safe\">QUY TẮC PHÂN QUYỀN CHUẨN SẢN XUẤT</span><div>• <strong>File văn bản / mã nguồn:</strong> Cấp <code>644</code> (<code>rw-r--r--</code>) — chủ nhân sửa, mọi người chỉ đọc.</div><div>• <strong>File thực thi / Script Bash:</strong> Cấp <code>755</code> (<code>rwxr-xr-x</code>) — chủ nhân sửa, mọi người chạy được.</div><div>• <strong>File nhạy cảm (.env, mật khẩu, private key SSH):</strong> Cấp <code>600</code> (<code>rw-------</code>) hoặc <code>400</code> — chỉ duy nhất chủ nhân đọc/sửa.</div><div>• <strong>Thư mục thông thường:</strong> Cấp <code>755</code> (<code>rwxr-xr-x</code>) — mở cửa cho mọi người truy cập.</div></div></div></div>",
          "codeExamples": [
            {
              "title": "Thực hành thay đổi quyền bằng cả 2 ký pháp",
              "lang": "Bash",
              "code": "# 1. Cấp quyền chạy script cho chủ sở hữu bằng ký hiệu chữ\nchmod u+x deploy.sh\n\n# 2. Thiết lập quyền chuẩn cho file cấu hình nhạy cảm .env (chỉ chủ nhân được đọc/sửa)\nchmod 600 .env\n\n# 3. Phân quyền chuẩn cho thư mục web (755) và file bên trong (644)\nfind /var/www/my-app -type d -exec chmod 755 {} +\nfind /var/www/my-app -type f -exec chmod 644 {} +",
              "output": "# Quyền sau khi đổi:\n-rwxrw-r-- 1 devops devops  120 Oct 28 10:35 deploy.sh\n-rw------- 1 devops devops   85 Oct 28 10:36 .env",
              "annotations": [
                {
                  "part": "chmod u+x",
                  "text": "Chỉ thêm cờ execute (x) cho User (u) mà không làm ảnh hưởng đến Group hay Others."
                },
                {
                  "part": "chmod 600",
                  "text": "6 (4+2 = rw) cho User; 0 (không quyền) cho Group và Others. Bảo mật tối đa cho private key và .env."
                },
                {
                  "part": "find ... -type d / -type f",
                  "text": "Kỹ thuật chuẩn tách bạch quyền thư mục (755 cần x) và file dữ liệu (644 không cần x)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Đổi Sở hữu (chown, chgrp) và Quản trị Leo quyền An toàn với visudo",
          "content": "<p>Một tệp luôn thuộc về một <strong>User sở hữu (Owner)</strong> và một <strong>Group sở hữu</strong>. Lệnh <code>chown</code> (Change Owner) dùng để chuyển giao quyền sở hữu này:</p><ul><li>Cú pháp đổi cả user và group: <code>sudo chown username:groupname /path/to/target</code>.</li><li>Cú pháp đổi đệ quy cả thư mục con: <code>sudo chown -R www-data:www-data /var/www/my-app</code>.</li></ul><p><strong>Quản trị Leo quyền với lệnh sudo và visudo:</strong></p><blockquote>Không bao giờ chia sẻ mật khẩu của tài khoản <code>root</code> cho nhiều người. Thay vào đó, cấp quyền <code>sudo</code> (SuperUser DO) cho từng tài khoản cá nhân. Khi cần chỉnh sửa file phân quyền <code>/etc/sudoers</code>, <strong>BẮT BUỘC dùng lệnh <code>sudo visudo</code></strong>. Lệnh <code>visudo</code> sẽ tự động khóa file chống ghi đè đồng thời và kiểm tra cú pháp (Syntax Validation) trước khi lưu. Nếu bạn sửa trực tiếp bằng <code>nano /etc/sudoers</code> và gõ sai chỉ một dấu phẩy, toàn bộ lệnh <code>sudo</code> trên server sẽ bị tê liệt và bạn sẽ bị khóa quyền vĩnh viễn khỏi máy chủ!</blockquote>",
          "codeExamples": [
            {
              "title": "Bàn giao quyền sở hữu web server và kiểm tra cú pháp sudoers",
              "lang": "Bash",
              "code": "# 1. Bàn giao quyền sở hữu thư mục web cho user dịch vụ Nginx (www-data)\nsudo chown -R www-data:www-data /var/www/my-app\n\n# 2. Kiểm tra tính toàn vẹn cú pháp của tệp sudoers\nsudo visudo -c",
              "output": "/etc/sudoers: parsed OK\n/etc/sudoers.d/README: parsed OK\n/etc/sudoers.d/90-cloud-init-users: parsed OK",
              "annotations": [
                {
                  "part": "chown -R www-data:www-data",
                  "text": "Cờ -R (recursive) áp dụng đổi owner:group cho toàn bộ các file và thư mục con."
                },
                {
                  "part": "visudo -c",
                  "text": "Cờ --check: xác thực cú pháp của toàn bộ file sudoers mà không cần mở trình soạn thảo."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-4",
          "title": "4. Mặt nạ Tạo quyền Mặc định (umask) & Nguyên tắc Đặc quyền Tối thiểu",
          "content": "<p>Khi bạn dùng <code>touch file.txt</code> hoặc <code>mkdir mydir</code>, hệ thống quyết định quyền mặc định ban đầu dựa vào giá trị <strong><code>umask</code> (User Mask)</strong>:</p><ul><li>Quyền tối đa lý thuyết: File là <code>666</code> (<code>rw-rw-rw-</code>), Thư mục là <code>777</code> (<code>rwxrwxrwx</code>).</li><li>Giá trị <code>umask</code> mặc định trên Linux thường là <code>0022</code> (hoặc <code>0002</code>).</li><li>Công thức tính quyền tạo mới: <code>Quyền thực tế = Quyền tối đa &amp; ~umask</code> (về trực quan là phép trừ các bit quyền).<br>Với <code>umask 022</code>: File mới sẽ là <code>666 - 022 = 644</code> (<code>rw-r--r--</code>); Thư mục mới sẽ là <code>777 - 022 = 755</code> (<code>rwxr-xr-x</code>).</li></ul><p><strong>Nguyên tắc Đặc quyền Tối thiểu (Principle of Least Privilege):</strong> Chỉ cấp cho tiến trình hoặc người dùng đúng những quyền hạn tối thiểu cần thiết để hoàn thành công việc. Không chạy script backup bằng user root nếu user thường có thể đọc được file cần backup.</p>",
          "codeExamples": [
            {
              "title": "Khảo sát và thay đổi umask tạm thời",
              "lang": "Bash",
              "code": "# 1. Xem giá trị umask hiện tại của shell\numask\n\n# 2. Đặt umask nghiêm ngặt hơn (0077: chỉ chủ nhân có quyền, khóa sạch group và others)\numask 0077\n\n# 3. Tạo thử file mới và kiểm tra quyền được sinh ra\ntouch /tmp/private.txt\nls -l /tmp/private.txt",
              "output": "0022\n-rw------- 1 devops devops 0 Oct 28 10:40 /tmp/private.txt",
              "annotations": [
                {
                  "part": "umask 0077",
                  "text": "Trừ bỏ toàn bộ quyền của Group (7) và Others (7); file mới tạo ra có quyền 600 (666 - 077 = 600)."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "Chuỗi quyền 10 ký tự phân định rõ ràng 3 cấp độ: Chủ sở hữu (User), Nhóm quản lý (Group) và Người ngoài (Others).",
        "Quyền `rwx` trên Thư mục khác biệt sâu sắc với File: quyền `x` trên thư mục là điều kiện tiên quyết để được `cd` vào trong và truy cập tệp con.",
        "Tuyệt đối không dùng `chmod 777`: luôn tuân thủ chuẩn `755` cho thư mục, `644` cho file dữ liệu và `600` cho tài liệu bí mật.",
        "Dùng `chown` để bàn giao quyền sở hữu tệp cho đúng người dùng dịch vụ (`www-data`, `postgres`).",
        "Luôn dùng `visudo` khi sửa đổi quyền quản trị sudo để cơ chế kiểm tra cú pháp bảo vệ bạn khỏi thảm họa tự khóa mình khỏi máy chủ."
      ]
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
        "Đối chiếu chính xác cú pháp quản lý gói phần mềm giữa 3 họ Distro: Debian/Ubuntu (`apt`), RHEL/Rocky (`dnf`), và Arch Linux (`pacman`).",
        "Phân biệt rõ ràng sự khác biệt kỹ thuật giữa `apt update` (đồng bộ danh mục gói) và `apt upgrade` (tải và nâng cấp gói thực tế).",
        "Nhận diện rủi ro vỡ hệ thống khi thực hiện nâng cấp từng phần (Partial Upgrade) trên Arch Linux (`pacman -Sy`).",
        "Hiểu rõ bản chất lỗi 'externally-managed-environment' theo chuẩn PEP 668 trên Ubuntu 23.04+ / Debian 12+ và áp dụng giải pháp cô lập đúng chuẩn với `python3 -m venv` và `pipx`."
      ],
      "intuition": {
        "title": "Kho ứng dụng App Store, Cuốn danh bạ nhà sách và Bức tường bảo vệ Python",
        "metaphor": "Trình quản lý gói trên Linux giống như một siêu thị App Store tập trung của hệ điều hành. Thay vì phải lên mạng tải file `.exe` cài đặt trôi nổi tiềm ẩn mã độc, trình quản lý gói (`apt`, `dnf`, `pacman`) sẽ tự động tải các gói phần mềm đã được các kỹ sư Linux kiểm duyệt kỹ lưỡng và ký chữ ký số mật mã. Lệnh `apt update` giống như việc bạn gọi điện đến nhà sách yêu cầu gửi về cuốn Danh mục sách mới nhất; còn `apt upgrade` mới là lúc bạn thật sự bỏ tiền mua các cuốn sách mới đó về nhà. Và đặc biệt, từ năm 2023, chuẩn PEP 668 dựng lên một 'bức tường kính' bảo vệ: ngăn chặn lập trình viên dùng `sudo pip install` làm rối loạn các thư viện Python sống còn mà chính hệ điều hành đang dựa vào để vận hành.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📦</span><span>BẢNG ĐỐI CHIẾU 3 HỌ DISTRO</span><span class=\"lx-vs-tag\">Package Managers</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Debian / Ubuntu:</strong> Dùng <code>apt</code> quản lý gói định dạng <code>.deb</code>. Kho gói cực kỳ phong phú và ổn định.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>RHEL / Rocky / Fedora:</strong> Dùng <code>dnf</code> (trước đây là <code>yum</code>) quản lý gói <code>.rpm</code>. Chuẩn mực doanh nghiệp khắt khe.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Arch Linux:</strong> Dùng <code>pacman</code> quản lý gói <code>.pkg.tar.zst</code>. Rolling release luôn có bản cập nhật mới nhất.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🐍</span><span>CHUẨN BẢO VỆ PEP 668</span><span class=\"lx-vs-tag\">Externally Managed</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Nguyên nhân:</strong> Nhiều công cụ hệ thống Linux (như chính <code>apt</code>, <code>cloud-init</code>) được viết bằng Python. Dùng <code>sudo pip install</code> sẽ ghi đè thư viện hệ thống gây sập OS!</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Cơ chế PEP 668:</strong> Tệp <code>EXTERNALLY-MANAGED</code> chặn lệnh pip toàn cục.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Giải pháp chuẩn:</strong> Dùng <code>python3 -m venv</code> cho dự án hoặc <code>pipx</code> cho công cụ CLI độc lập.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Ma trận Lệnh Quản lý Gói: Debian vs RHEL vs Arch Linux",
          "content": "<p>Một Kỹ sư DevOps đa năng cần thành thạo cú pháp tương đương giữa 3 họ bản phân phối lớn:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Tác vụ Vận hành</th><th>Họ Debian / Ubuntu (<code>apt</code>)</th><th>Họ RHEL / Rocky / Fedora (<code>dnf</code>)</th><th>Họ Arch Linux (<code>pacman</code>)</th></tr></thead><tbody><tr><td><strong>Cập nhật danh mục gói</strong></td><td><code>sudo apt update</code></td><td><code>sudo dnf check-update</code></td><td><code>sudo pacman -Sy</code></td></tr><tr><td><strong>Nâng cấp toàn bộ hệ thống</strong></td><td><code>sudo apt upgrade -y</code></td><td><code>sudo dnf upgrade -y</code></td><td><code>sudo pacman -Syu</code></td></tr><tr><td><strong>Cài đặt gói mới</strong></td><td><code>sudo apt install -y pkg</code></td><td><code>sudo dnf install -y pkg</code></td><td><code>sudo pacman -S pkg</code></td></tr><tr><td><strong>Gỡ bỏ gói (giữ cấu hình)</strong></td><td><code>sudo apt remove pkg</code></td><td><code>sudo dnf remove pkg</code></td><td><code>sudo pacman -R pkg</code></td></tr><tr><td><strong>Gỡ sạch gói + tệp cấu hình</strong></td><td><code>sudo apt purge pkg</code></td><td><code>sudo dnf remove pkg</code></td><td><code>sudo pacman -Rns pkg</code></td></tr><tr><td><strong>Tìm kiếm gói trong kho</strong></td><td><code>apt search pkg</code></td><td><code>dnf search pkg</code></td><td><code>pacman -Ss pkg</code></td></tr><tr><td><strong>Xem thông tin chi tiết gói</strong></td><td><code>apt show pkg</code></td><td><code>dnf info pkg</code></td><td><code>pacman -Si pkg</code></td></tr><tr><td><strong>Dọn dẹp gói phụ thuộc thừa</strong></td><td><code>sudo apt autoremove -y</code></td><td><code>sudo dnf autoremove -y</code></td><td><code>sudo pacman -Qtdq | pacman -Rns -</code></td></tr></tbody></table></div><div class=\"callout-box warning-box\"><div class=\"callout-title\">⚠️ Cảnh báo chết người trên Arch Linux: Rủi ro Partial Upgrade</div><p>Trên Arch Linux, tuyệt đối không bao giờ chạy lệnh <code>pacman -Sy pkg</code> (cập nhật danh mục rồi cài một gói riêng lẻ). Arch là bản phân phối <em>Rolling Release</em>, nếu thư viện mới yêu cầu glibc mới mà các phần mềm cũ chưa nâng cấp, hệ điều hành sẽ bị rơi vào trạng thái 'Partial Upgrade' làm đứt gãy phụ thuộc và không thể khởi động lại máy! Luôn nâng cấp toàn diện bằng: <code>sudo pacman -Syu</code>.</p></div>",
          "codeExamples": [
            {
              "title": "Quy trình tìm kiếm, kiểm tra và cài đặt Nginx trên Ubuntu",
              "lang": "Bash",
              "code": "# 1. Đồng bộ danh mục gói mới nhất từ các máy chủ kho lưu trữ (Mirrors)\nsudo apt update\n\n# 2. Tìm kiếm gói web server Nginx\napt search nginx | grep -E '^nginx/' -A 1\n\n# 3. Xem thông tin chi tiết và phiên bản của gói trước khi quyết định cài\napt show nginx | grep -E '^(Version|Installed-Size):'",
              "output": "All packages are up to date.\nnginx/noble-updates,noble-security 1.24.0-2ubuntu7.1 amd64\n  small, powerful, scalable web/proxy server\nVersion: 1.24.0-2ubuntu7.1\nInstalled-Size: 1,320 kB",
              "annotations": [
                {
                  "part": "apt update",
                  "text": "Chỉ tải danh sách metadata và chỉ mục phiên bản tệp, KHÔNG cài hay thay đổi bất kỳ gói nào trên máy."
                },
                {
                  "part": "apt show nginx",
                  "text": "Kiểm tra phiên bản, kích thước cài đặt và các thư viện phụ thuộc của gói."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Phân biệt Bản chất: apt update vs apt upgrade",
          "content": "<p>Nhiều người mới bắt đầu nhầm lẫn giữa hai lệnh này:</p><ul><li><strong><code>sudo apt update</code>:</strong> Truy cập vào các kho lưu trữ trực tuyến (được khai báo trong <code>/etc/apt/sources.list</code> và <code>/etc/apt/sources.list.d/</code>) để tải về danh sách các gói phần mềm mới nhất và so sánh với phiên bản đang có trên máy bạn. Lệnh này <em>không nâng cấp bất kỳ file nào trên ổ cứng</em>.</li><li><strong><code>sudo apt upgrade</code>:</strong> Đọc bảng phân tích của <code>apt update</code> và thực sự tải các gói <code>.deb</code> mới về, sau đó giải nén, ghi đè và nâng cấp các phần mềm trên hệ điều hành.</li><li><strong><code>sudo apt dist-upgrade</code> (hoặc <code>full-upgrade</code>):</strong> Nâng cấp thông minh hơn: sẵn sàng cài đặt thêm các gói phụ thuộc mới hoặc tự động gỡ bỏ các gói cũ lỗi thời để giải quyết xung đột khi chuyển phiên bản lớn.</li></ul>",
          "codeExamples": [
            {
              "title": "Kiểm tra danh sách các gói có bản nâng cấp mới",
              "lang": "Bash",
              "code": "# 1. Cập nhật chỉ mục kho lưu trữ\nsudo apt update\n\n# 2. Liệt kê chính xác những gói nào có bản cập nhật mới\napt list --upgradable",
              "output": "Listing... Done\ncurl/noble-updates 8.5.0-2ubuntu10.4 amd64 [upgradable from: 8.5.0-2ubuntu10.1]\nlibcurl4t64/noble-updates 8.5.0-2ubuntu10.4 amd64 [upgradable from: 8.5.0-2ubuntu10.1]",
              "annotations": [
                {
                  "part": "apt list --upgradable",
                  "text": "Hiển thị chi tiết phiên bản hiện tại và phiên bản mới sắp được nâng cấp."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Chuẩn PEP 668 & Giải pháp Cô lập Môi trường Python An toàn",
          "content": "<p>Khi bạn dùng Ubuntu 23.04+, Debian 12+, hoặc Fedora 38+ và thử gõ: <code>pip install requests</code>, hệ thống sẽ chặn đứng và ném ra lỗi đỏ:</p><pre><code>error: externally-managed-environment\n× This environment is externally managed\n╰─&gt; To install Python packages system-wide, try apt install\n    python3-xyz, where xyz is the package you are trying to install.</code></pre><p><strong>Tại sao cộng đồng Python và Linux tạo ra chuẩn PEP 668?</strong></p><blockquote>Hàng loạt công cụ quản trị cốt lõi của Linux (như <code>software-properties-common</code>, tường lửa <code>ufw</code>, daemon đám mây <code>cloud-init</code>) được viết bằng Python và sử dụng các thư viện nằm ở <code>/usr/lib/python3/dist-packages/</code>. Nếu lập trình viên gõ <code>sudo pip install urllib3</code> hoặc nâng cấp bừa bãi một thư viện, phiên bản mới có thể phá vỡ tính tương thích ngược, khiến toàn bộ công cụ quản lý hệ thống của Linux bị tê liệt!</blockquote><p><strong>3 Cách giải quyết đúng chuẩn kiến trúc:</strong></p><ol><li><strong>Dành cho Dự án Ứng dụng (Best Practice):</strong> Tạo môi trường ảo riêng biệt: <code>python3 -m venv .venv && source .venv/bin/activate</code>. Mọi thư viện cài đặt qua pip sẽ nằm cô lập bên trong thư mục dự án.</li><li><strong>Dành cho Công cụ CLI toàn cục (như black, flake8, httpie, ansible):</strong> Dùng công cụ <code>pipx</code>: <code>pipx install httpie</code>. Lệnh này tự động tạo một venv riêng cho công cụ và tạo symlink vào <code>~/.local/bin</code> để bạn gõ lệnh ở mọi nơi mà không chạm vào Python hệ thống.</li><li><strong>Dành cho Gói hệ thống ổn định:</strong> Cài đặt trực tiếp qua kho gói Linux: <code>sudo apt install python3-requests python3-numpy</code>.</li></ol>",
          "codeExamples": [
            {
              "title": "Khởi tạo môi trường ảo Python venv và cài đặt gói an toàn",
              "lang": "Bash",
              "code": "# 1. Cài đặt gói hỗ trợ venv từ kho gói hệ thống nếu chưa có\nsudo apt install -y python3-venv\n\n# 2. Khởi tạo môi trường ảo độc lập cho dự án FastAPI\npython3 -m venv ~/my-api/.venv\n\n# 3. Kích hoạt môi trường ảo và kiểm tra đường dẫn pip\nsource ~/my-api/.venv/bin/activate\nwhich pip\n\n# 4. Cài đặt thư viện an toàn mà không làm ảnh hưởng tới hệ điều hành\npip install fastapi uvicorn",
              "output": "/home/devops/my-api/.venv/bin/pip\nSuccessfully installed fastapi-0.115.0 uvicorn-0.32.0",
              "annotations": [
                {
                  "part": "python3 -m venv",
                  "text": "Module chuẩn của Python tạo môi trường ảo độc lập có thư mục lib/ và bin/ riêng."
                },
                {
                  "part": "source .../activate",
                  "text": "Nạp file script thay đổi biến $PATH ưu tiên trỏ vào thư mục .venv/bin."
                },
                {
                  "part": "which pip",
                  "text": "Xác nhận pip đang trỏ vào .venv, hoàn toàn không chạm vào /usr/bin/pip của hệ thống."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-4",
          "title": "4. Best Practices & An toàn: Vệ sinh Máy chủ và Quản lý Kho lưu trữ",
          "content": "<p>Một máy chủ hoạt động lâu năm sẽ tích tụ hàng gigabytes file cài đặt cũ gây đầy đĩa nếu không được dọn dẹp định kỳ:</p><ul><li><strong>Dọn bộ nhớ đệm gói:</strong> Khi chạy <code>apt install</code>, hệ điều hành lưu bản sao các file <code>.deb</code> trong <code>/var/cache/apt/archives/</code>. Dùng <code>sudo apt clean</code> để giải phóng toàn bộ dung lượng này sau khi cài đặt xong.</li><li><strong>Gỡ bỏ các thư viện mồ côi (Orphan dependencies):</strong> Khi bạn gỡ một phần mềm, các thư viện phụ thuộc đi kèm phần mềm đó có thể vẫn nằm lại. Lệnh <code>sudo apt autoremove -y</code> sẽ quét và dọn sạch các thư viện không còn ai sử dụng.</li><li><strong>Bảo mật Kho lưu trữ (Repositories):</strong> Chỉ thêm PPA hoặc Repo của bên thứ ba uy tín. Mỗi repo phải có khóa công khai GPG lưu tại <code>/etc/apt/keyrings/</code> theo chuẩn bảo mật hiện đại (không dùng lệnh cũ <code>apt-key add</code> vốn đã bị khai tử vì rủi ro an ninh).</li></ul>",
          "codeExamples": [
            {
              "title": "Vệ sinh dung lượng ổ cứng và dọn dẹp các gói mồ côi",
              "lang": "Bash",
              "code": "# 1. Dọn sạch toàn bộ cache file cài đặt trong /var/cache/apt/archives/\nsudo apt clean\n\n# 2. Gỡ bỏ tự động các thư viện phụ thuộc không còn được sử dụng\nsudo apt autoremove -y",
              "output": "Reading package lists... Done\nBuilding dependency tree... Done\n0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.",
              "annotations": [
                {
                  "part": "apt clean",
                  "text": "Xóa toàn bộ các tệp .deb lưu tạm, giải phóng hàng trăm Megabytes đĩa."
                },
                {
                  "part": "apt autoremove",
                  "text": "Phân tích cây phụ thuộc để gỡ bỏ an toàn các gói mồ côi không còn phần mềm nào dùng tới."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "Hệ sinh thái Linux phân chia thành 3 họ quản lý gói lớn: Debian/Ubuntu (`apt`), RHEL/Rocky (`dnf`), và Arch Linux (`pacman`).",
        "`apt update` chỉ đồng bộ danh mục chỉ mục từ máy chủ; `apt upgrade` mới thực sự tải và cài đặt các phiên bản phần mềm mới.",
        "Trên Arch Linux, tuyệt đối tránh 'Partial Upgrade' (`pacman -Sy pkg`) để ngăn ngừa lỗi vỡ liên kết động của hệ thống.",
        "Chuẩn PEP 668 bảo vệ các thư viện Python cốt lõi của hệ điều hành: luôn sử dụng `python3 -m venv` cho dự án ứng dụng và dùng `pipx` cho các công cụ CLI.",
        "Định kỳ dọn dẹp hệ thống bằng `apt autoremove` (gỡ gói mồ côi) và `apt clean` (xóa cache gói) để giải phóng dung lượng ổ đĩa."
      ]
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
        "Giải thích bản chất 3 luồng dữ liệu chuẩn (Standard Streams) và File Descriptors: 0 (stdin), 1 (stdout), 2 (stderr).",
        "Thực hiện thành thạo các toán tử chuyển hướng I/O: `>`, `>>`, `<`, `2>`, `2>&1`, `&>`, `/dev/null` và lệnh chia luồng `tee`.",
        "Kết nối các tiến trình độc lập qua đường ống Pipe (`|`) theo triết lý 'kết hợp các công cụ nhỏ để giải quyết bài toán lớn' của Unix.",
        "Phân biệt rạch ròi giữa Quoting trong Shell (dấu nháy đơn `'...'` vs nháy kép `\"...\"`) và cơ chế mở rộng ký tự đại diện (Globbing `*`, `?`, `[]`).",
        "Hiểu sâu cơ chế kế thừa biến môi trường của tiến trình con, biến `$PATH` và thiết lập cấu hình biến môi trường bền vững trong `~/.bashrc`."
      ],
      "intuition": {
        "title": "Mạng lưới đường ống nước, Các van chuyển hướng và Bộ nhớ di truyền",
        "metaphor": "Mỗi tiến trình Linux khi sinh ra đều được trang bị sẵn 3 'đường ống dẫn nước': ống nước vào (stdin - số 0), ống nước sạch chảy ra (stdout - số 1), và ống nước thải chứa cặn bẩn báo lỗi (stderr - số 2). Bình thường cả 2 ống số 1 và 2 đều cùng xả ra màn hình terminal của bạn. Toán tử chuyển hướng giống như các van chuyển dòng: bạn có thể bẻ cong ống số 1 vào bể chứa file (`> file.log`), hoặc tống khứ toàn bộ nước thải lỗi số 2 vào 'hố đen vũ trụ' (`2> /dev/null`). Còn đường ống Pipe (`|`) là một khớp nối diệu kỳ: nó nối trực tiếp ống xả nước sạch của phòng này vào ống hút nước vào của phòng kế tiếp. Và biến môi trường giống như bộ gen di truyền: chỉ khi bạn 'export' một biến, gen đó mới được truyền lại cho các tiến trình con sinh ra sau nó.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🚰</span><span>3 LUỒNG DỮ LIỆU CHUẨN</span><span class=\"lx-vs-tag\">File Descriptors (FD)</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>FD 0 (stdin):</strong> Luồng nhập dữ liệu chuẩn (mặc định nhận từ bàn phím hoặc toán tử <code>&lt;</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>FD 1 (stdout):</strong> Luồng xuất kết quả thành công (toán tử <code>&gt;</code> ghi đè, <code>&gt;&gt;</code> ghi nối tiếp).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>FD 2 (stderr):</strong> Luồng thông báo lỗi độc lập (toán tử <code>2&gt;</code>, hoặc <code>2&gt;&amp;1</code> gộp vào stdout).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>/dev/null</code>:</strong> Hố đen rác ảo của hệ điều hành, nuốt trọn mọi dữ liệu chuyển vào mà không tốn dung lượng.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🔄</span><span>PIPE &amp; KẾ THỪA BIẾN MÔI TRƯỜNG</span><span class=\"lx-vs-tag\">Pipe &amp; Export</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Đường ống Pipe (<code>|</code>):</strong> Nối stdout của lệnh trước thành stdin của lệnh sau (<code>cmd1 | cmd2</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Lệnh <code>tee</code>:</strong> Ngã ba chữ T: vừa in ra màn hình terminal, vừa lưu vào file đĩa (<code>cmd | tee -a log.txt</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>export VAR=val</code>:</strong> Đưa biến vào bảng môi trường để các tiến trình con thừa kế. Lưu bền vững trong <code>~/.bashrc</code>.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Ba Luồng Dữ liệu Chuẩn (I/O) & Kỹ thuật Điều phối Luồng Lỗi",
          "content": "<p>Trong nhân Linux, mọi tệp hoặc kênh giao tiếp mở đều được định danh bằng một số nguyên không âm gọi là <strong>File Descriptor (Bộ mô tả tệp - FD)</strong>. Mọi chương trình C/Python/Bash khi khởi chạy đều mặc định mở 3 luồng:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Cú pháp Chuyển hướng</th><th>Mô tả Kỹ thuật</th><th>Trường hợp Sử dụng Thực tế</th></tr></thead><tbody><tr><td><code>command > file</code></td><td>Chuyển stdout vào file (GHI ĐÈ nội dung cũ)</td><td>Xuất cấu hình mới hoặc tạo file sạch</td></tr><tr><td><code>command >> file</code></td><td>Chuyển stdout vào file (GHI NỐI TIẾP vào cuối file)</td><td>Ghi nhật ký log ứng dụng liên tục</td></tr><tr><td><code>command 2> file</code></td><td>Chuyển riêng luồng lỗi stderr vào file</td><td>Gom riêng thông báo lỗi để điều tra sự cố</td></tr><tr><td><code>command 2>&1</code></td><td>Hợp nhất luồng lỗi stderr vào luồng stdout</td><td>Bắt trọn cả thông báo thành công lẫn lỗi vào cùng 1 file log</td></tr><tr><td><code>command &> file</code></td><td>Cú pháp viết tắt của Bash cho <code>> file 2>&1</code></td><td>Ghi toàn bộ mọi output vào file</td></tr><tr><td><code>command 2> /dev/null</code></td><td>Vứt bỏ toàn bộ thông báo lỗi không cần thiết</td><td>Ẩn các cảnh báo Permission denied khi tìm file</td></tr><tr><td><code>command < file</code></td><td>Nạp nội dung file vào stdin của chương trình</td><td>Bơm dữ liệu SQL dump vào lệnh <code>mysql < db.sql</code></td></tr></tbody></table></div><div class=\"callout-box warning-box\"><div class=\"callout-title\">⚠️ Thứ tự chuyển hướng quan trọng: Tại sao <code>> file 2>&1</code> đúng mà <code>2>&1 > file</code> lại sai?</div><p>Shell đọc các toán tử chuyển hướng từ trái sang phải: Với <code>> file 2>&1</code>, đầu tiên stdout được trỏ vào <code>file</code>, sau đó stderr được trỏ vào cùng đích với stdout (tức là <code>file</code>). Ngược lại, nếu viết <code>2>&1 > file</code>, đầu tiên stderr trỏ vào stdout (lúc này vẫn là màn hình terminal), sau đó chỉ có stdout được trỏ vào file; kết quả là thông báo lỗi vẫn bắn ra terminal!</p></div>",
          "codeExamples": [
            {
              "title": "Tách biệt stdout và stderr khi chạy lệnh tìm kiếm",
              "lang": "Bash",
              "code": "# 1. Tìm tất cả file .conf trong /etc: kết quả đúng ghi vào found.txt, lỗi vứt vào /dev/null\nfind /etc -name \"*.conf\" > /tmp/found.txt 2>/dev/null\n\n# 2. Chạy ứng dụng Python và bắt toàn bộ output + error vào cùng 1 file log\npython3 -c 'import sys; print(\"Chay tot\"); sys.stderr.write(\"Canh bao loi\\n\")' >> /tmp/app.log 2>&1\n\n# 3. Kiểm tra nội dung file log\ncat /tmp/app.log",
              "output": "Chay tot\nCanh bao loi",
              "annotations": [
                {
                  "part": "2>/dev/null",
                  "text": "Nuốt sạch mọi thông báo Permission denied do không có quyền đọc một số thư mục bí mật."
                },
                {
                  "part": ">> /tmp/app.log 2>&1",
                  "text": "Ghi nối tiếp cả stdout và stderr vào file app.log theo đúng thứ tự thời gian."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Đường ống Pipe (|), Bộ chia luồng tee & Phân biệt Quoting vs Globbing",
          "content": "<p>Đường ống <strong>Pipe (<code>|</code>)</strong> chuyển luồng stdout của chương trình bên trái thành stdin của chương trình bên phải mà không cần lưu tạm ra đĩa cứng:</p><ul><li><strong>Lệnh chia luồng <code>tee</code>:</strong> Giống như khớp nối chữ T của đường ống nước: <code>command | tee output.txt</code> vừa đẩy dữ liệu ra màn hình cho người theo dõi, vừa đồng thời ghi một bản sao vào tệp. Dùng <code>tee -a</code> để ghi nối tiếp.</li><li><strong>Phân biệt Quoting (Nháy) vs Globbing (Ký tự đại diện):</strong><ul><li><em>Dấu nháy đơn <code>'...'</code> (Strong Quoting):</em> Giữ nguyên giá trị thô của mọi ký tự. Dấu <code>$</code>, <code>*</code>, <code>\\</code> bên trong nháy đơn hoàn toàn mất ý nghĩa đặc biệt.</li><li><em>Dấu nháy kép <code>\"...\"</code> (Weak Quoting):</em> Cho phép giải mã biến <code>$VAR</code> và command substitution <code>$(cmd)</code>, nhưng ngăn chặn việc chia tách từ (Word Splitting) và vô hiệu hóa globbing.</li><li><em>Ký tự đại diện Globbing:</em> <code>*</code> (khớp chuỗi bất kỳ), <code>?</code> (khớp đúng 1 ký tự), <code>[abc]</code> (khớp 1 trong các ký tự). <strong>Lưu ý: Globbing do chính Shell thực hiện trước khi câu lệnh được chạy!</strong></li></ul></li></ul>",
          "codeExamples": [
            {
              "title": "Sử dụng pipe, tee và phân biệt nháy đơn vs nháy kép",
              "lang": "Bash",
              "code": "# 1. Vừa xem danh sách tiến trình vừa lưu vào file đĩa bằng tee\nps aux | grep python | tee /tmp/python_processes.txt | wc -l\n\n# 2. So sánh nháy đơn vs nháy kép trong Shell\nNAME=\"Linux\"\necho \"Hello $NAME, thu muc hien tai la $(pwd)\"\necho 'Hello $NAME, thu muc hien tai la $(pwd)'",
              "output": "3\nHello Linux, thu muc hien tai la /home/devops\nHello $NAME, thu muc hien tai la $(pwd)",
              "annotations": [
                {
                  "part": "tee /tmp/python_processes.txt",
                  "text": "Lưu kết quả trung gian vào file và tiếp tục đẩy dữ liệu qua pipe cho lệnh wc -l."
                },
                {
                  "part": "\"Hello $NAME...\"",
                  "text": "Nháy kép giải mã biến $NAME và chạy lệnh pwd."
                },
                {
                  "part": "'Hello $NAME...'",
                  "text": "Nháy đơn in nguyên bản ký tự $ và $(pwd)."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Biến Môi trường, Biến $PATH & Cấu hình Bền vững (~/.bashrc)",
          "content": "<p>Khi bạn gõ <code>VAR=123</code> trong terminal, biến này chỉ là <strong>Biến cục bộ của Shell (Local Shell Variable)</strong>. Nếu bạn chạy một script Python hoặc một lệnh mới, tiến trình con đó sẽ KHÔNG NHÌN THẤY biến này!</p><blockquote>Lệnh <code>export VAR=123</code> yêu cầu Shell đưa biến vào Bảng Môi trường (Environment Block). Mọi tiến trình con được sinh ra từ shell này sẽ thừa kế bản sao của biến đó. Tuy nhiên, lệnh export chỉ có hiệu lực trong phiên làm việc hiện tại; khi bạn đóng cửa sổ terminal, biến sẽ biến mất vĩnh viễn!</blockquote><p><strong>Cơ chế hoạt động của biến <code>$PATH</code>:</strong> Khi bạn gõ <code>python3</code>, Shell không lục lọi toàn bộ ổ cứng mà duyệt tuần tự qua các thư mục được liệt kê trong biến <code>$PATH</code> (ngăn cách bởi dấu hai chấm <code>:</code>). Thư mục nào đứng trước sẽ được ưu tiên tìm kiếm trước.</p><p><strong>Để biến tồn tại bền vững sau khi khởi động lại:</strong> Thêm dòng export vào tệp <code>~/.bashrc</code> (dành cho shell tương tác của người dùng) hoặc <code>/etc/environment</code> (dành cho toàn bộ hệ thống).</p>",
          "codeExamples": [
            {
              "title": "Kiểm tra biến $PATH và thêm thư mục chứa script cá nhân bền vững",
              "lang": "Bash",
              "code": "# 1. In danh sách các thư mục tìm kiếm trong $PATH\necho $PATH\n\n# 2. Thêm thư mục ~/.local/bin vào biến $PATH bền vững trong ~/.bashrc\necho 'export PATH=\"$HOME/.local/bin:$PATH\"' >> ~/.bashrc\n\n# 3. Nạp lại cấu hình ngay lập tức mà không cần đăng xuất\nsource ~/.bashrc",
              "output": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n[Cấu hình ~/.bashrc được nạp lại thành công]",
              "annotations": [
                {
                  "part": "echo $PATH",
                  "text": "Chuỗi các thư mục chứa file thực thi, phân cách bằng dấu hai chấm."
                },
                {
                  "part": "PATH=\"$HOME/.local/bin:$PATH\"",
                  "text": "Đặt thư mục cá nhân lên đầu danh sách để ưu tiên chạy các công cụ do user tự cài (như pipx)."
                },
                {
                  "part": "source ~/.bashrc",
                  "text": "Lệnh nội bộ thực thi trực tiếp các dòng trong file ~/.bashrc vào phiên shell hiện tại."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-4",
          "title": "4. Best Practices: Shebang Chuẩn xác & Logging Sản xuất",
          "content": "<p>Các nguyên tắc thiết kế kịch bản tự động hóa chuyên nghiệp:</p><ol><li><strong>Sử dụng Shebang linh hoạt:</strong> Dòng đầu tiên của script luôn bắt đầu bằng <code>#!/usr/bin/env bash</code> hoặc <code>#!/usr/bin/env python3</code> thay vì hard-code <code>#!/bin/bash</code>. Lệnh <code>/usr/bin/env</code> sẽ tự động tìm kiếm phiên bản interpreter chuẩn nằm trong biến <code>$PATH</code> của môi trường (tương thích tuyệt đối trên cả Ubuntu, RHEL, macOS và FreeBSD).</li><li><strong>Quy tắc vàng ghi log trong Cron / Systemd:</strong> Mọi tác vụ chạy ngầm định kỳ luôn phải chuyển hướng cả hai luồng: <code>/path/to/script.sh >> /var/log/my-job.log 2>&1</code>. Thiếu <code>2>&1</code>, nếu script gặp lỗi, thông báo lỗi sẽ biến mất không dấu vết hoặc làm tràn hàng đợi mail hệ thống.</li></ol>",
          "codeExamples": [
            {
              "title": "Tạo script chuẩn có shebang và ghi log hai luồng",
              "lang": "Bash",
              "code": "# 1. Viết script kiểm tra hệ thống với shebang chuẩn\ncat << 'EOF' > /tmp/check_disk.sh\n#!/usr/bin/env bash\necho \"=== Kiem tra luc $(date) ===\"\ndf -h /\nEOF\n\n# 2. Cấp quyền thực thi và chạy thử có chuyển hướng log\nchmod +x /tmp/check_disk.sh\n/tmp/check_disk.sh >> /tmp/disk.log 2>&1\ncat /tmp/disk.log",
              "output": "=== Kiem tra luc Mon Oct 28 10:55:00 UTC 2024 ===\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   14G   34G  30% /",
              "annotations": [
                {
                  "part": "#!/usr/bin/env bash",
                  "text": "Shebang độc lập môi trường, tự tìm bash qua PATH."
                },
                {
                  "part": ">> /tmp/disk.log 2>&1",
                  "text": "Chuẩn ghi log an toàn: bảo toàn dữ liệu cũ và gom cả stderr."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "Linux quản lý 3 luồng chuẩn qua File Descriptors: 0 (stdin), 1 (stdout), 2 (stderr).",
        "Toán tử `>` ghi đè, `>>` ghi nối tiếp; luôn chuyển hướng cả hai luồng bằng `>> file.log 2>&1` khi chạy tác vụ nền.",
        "Đường ống Pipe (`|`) nối đầu ra lệnh này vào đầu vào lệnh kia; `tee -a` là khớp nối chữ T vừa in màn hình vừa lưu đĩa.",
        "Phân biệt rõ ràng: Nháy đơn `'...'` giữ nguyên chuỗi thô, Nháy kép `\"...\"` giải mã biến nhưng chống tách từ; Globbing do shell mở rộng trước khi chạy lệnh.",
        "Lệnh `export` chỉ cấp biến cho tiến trình con trong phiên hiện tại; muốn bền vững phải lưu vào `~/.bashrc`."
      ]
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
        "Phân biệt rõ ràng bản chất giữa Đóng gói tập trung (Archiving - `tar`) và Thuật toán nén dữ liệu (Compression - `gzip`, `xz`, `bzip2`).",
        "Làm chủ các cờ tùy chọn sống còn của lệnh `tar`: tạo gói (`-c`), giải nén (`-x`), xem trước nội dung (`-t`), chỉ định file (`-f`), gọi gzip (`-z`), gọi xz (`-J`), và giải nén tới thư mục đích (`-C`).",
        "Đánh giá sự đánh đổi (trade-off) giữa tốc độ nén và tỉ lệ nén: chọn `gzip` cho backup định kỳ nhanh vs chọn `xz` cho lưu trữ lâu dài tiết kiệm băng thông.",
        "Tạo và xác thực mã băm mật mã an toàn bằng `sha256sum` để đảm bảo gói phần mềm không bị can thiệp hoặc lỗi truyền tải.",
        "Nhận diện và phòng ngừa các rủi ro bảo mật khi giải nén file từ Internet: lỗ hổng Directory Traversal (Zip Slip) và ghi đè file hệ thống."
      ],
      "intuition": {
        "title": "Chiếc thùng các-tông đóng hàng, Máy hút chân không và Con dấu niêm phong",
        "metaphor": "Trong thế giới Windows, lệnh 'nén zip' làm gộp cả hai việc: vừa gom các file lại vừa nén nhỏ. Trên Linux, hai công việc này được tách bạch theo đúng triết lý Unix: Lệnh `tar` (Tape Archive) giống như việc bạn lấy một chiếc thùng các-tông lớn để gom hàng trăm cuốn sách, tài liệu rải rác lại vào một thùng duy nhất (kích thước thùng bằng đúng tổng dung lượng các cuốn sách). Sau khi đã đóng gói thành một file `.tar`, bạn mới đưa chiếc thùng đó vào máy hút chân không: dùng máy `gzip` (nén nhanh, tốn ít CPU) hoặc máy `xz` (hút kiệt không khí, kích thước siêu nhỏ nhưng tốn thời gian hơn). Và trước khi gửi thùng hàng qua bưu điện, bạn dùng sáp đóng một con dấu mật mã `sha256sum` độc nhất: nếu ai đó mở trộm thùng hàng hay thay đổi dù chỉ một dấu chấm, con dấu niêm phong sẽ lập tức bị vỡ báo động.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>📦</span><span>ĐÓNG GÓI vs NÉN THUẬT TOÁN</span><span class=\"lx-vs-tag\">tar vs Compression</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong><code>tar</code> (Tape Archive):</strong> Chỉ GOM NHIỀU FILE THÀNH 1 FILE duy nhất, bảo toàn permissions, owner, timestamps. Dung lượng KHÔNG giảm.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>gzip</code> (cờ <code>-z</code>, đuôi <code>.tar.gz</code>):</strong> Tốc độ nén cực nhanh, ngốn ít CPU. Chuẩn mực cho backup hàng ngày và web assets.</li><li><span class=\"lx-vs-bullet\">•</span> <strong><code>xz</code> (cờ <code>-J</code>, đuôi <code>.tar.xz</code>):</strong> Tỉ lệ nén cực cao (nhỏ hơn gzip 30-50%), tốn nhiều RAM/CPU. Chuẩn phát hành nhân Linux Kernel.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🔒</span><span>BẢO MẬT &amp; TOÀN VẸN CHECKSUM</span><span class=\"lx-vs-tag\">sha256sum</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Mã băm SHA-256:</strong> Chuỗi 64 ký tự hex đại diện cho dấu vân tay dữ liệu. Chỉ cần đổi 1 bit, mã hash thay đổi hoàn toàn (Avalanche effect).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Quy tắc Xem trước <code>tar -t</code>:</strong> Luôn đọc danh sách file bên trong tệp nén lạ trước khi giải nén ra đĩa để tránh bị Tar-bomb.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Giải nén an toàn:</strong> Luôn chỉ định thư mục đích riêng biệt bằng cờ <code>-C /path/to/dest</code>.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-1",
          "title": "1. Làm chủ Lệnh tar: Ma trận Cờ Tùy chọn & Quy tắc Cờ -f",
          "content": "<p>Lệnh <code>tar</code> là công cụ đóng gói tiêu chuẩn trong mọi hệ thống Linux. Để không bị nhầm lẫn giữa hàng chục cờ, hãy nhớ công thức cơ bản:</p><p style=\"text-align:center;font-family:var(--font-mono);font-size:0.95rem;font-weight:700;color:var(--accent-text);\">tar [HÀNH_ĐỘNG] [THUẬT_TOÁN_NÉN] [v] -f [TÊN_FILE_NÉN] [MỤC_CẦN_NÉN]</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Nhóm Cờ</th><th>Cờ Tùy chọn</th><th>Ý nghĩa Kỹ thuật</th><th>Ví dụ Cú pháp</th></tr></thead><tbody><tr><td><strong>Hành động chính (Bắt buộc chọn 1)</strong></td><td><code>-c</code> (Create)<br><code>-x</code> (Extract)<br><code>-t</code> (List / Test)</td><td>Tạo tệp lưu trữ mới<br>Giải nén tệp lưu trữ ra đĩa<br>Xem danh sách tệp bên trong mà không giải nén</td><td><code>tar -czvf app.tar.gz ./app</code><br><code>tar -xzvf app.tar.gz</code><br><code>tar -tzvf app.tar.gz</code></td></tr><tr><td><strong>Thuật toán nén (Tùy chọn)</strong></td><td><code>-z</code> (gzip)<br><code>-J</code> (xz)<br><code>-j</code> (bzip2)</td><td>Nén bằng gzip (đuôi <code>.tar.gz</code> hoặc <code>.tgz</code>)<br>Nén bằng xz (đuôi <code>.tar.xz</code>)<br>Nén bằng bzip2 (đuôi <code>.tar.bz2</code>)</td><td>Tốc độ nhanh<br>Dung lượng nhỏ nhất<br>Tỉ lệ nén trung bình</td></tr><tr><td><strong>Tùy chọn bổ trợ</strong></td><td><code>-v</code> (Verbose)<br><code>-f</code> (File)<br><code>-C</code> (Directory)</td><td>In chi tiết từng file đang xử lý<br><strong>Chỉ định tên file đích (BẮT BUỘC ĐỨNG CUỐI)</strong><br>Chuyển thư mục làm việc đích trước khi giải nén</td><td>Hiển thị tiến trình<br><code>-f archive.tar</code><br><code>tar -xf pkg.tar -C /opt</code></td></tr></tbody></table></div><div class=\"callout-box warning-box\"><div class=\"callout-title\">⚠️ Cạm bẫy vị trí của cờ -f trong lệnh tar</div><p>Cờ <code>-f</code> yêu cầu đối số ngay liền sau nó BẮT BUỘC phải là Tên File Lưu Trữ. Nếu bạn gõ <code>tar -cfz backup.tar.gz ./data</code>, lệnh sẽ coi chữ cái <code>z</code> là tên file lưu trữ và bỏ qua việc nén gzip! <strong>Quy tắc an toàn:</strong> Luôn đặt cờ <code>f</code> ở vị trí cuối cùng trong cụm cờ ngắn: <code>tar -czvf ...</code> hoặc <code>tar -xJvf ...</code>.</p></div>",
          "codeExamples": [
            {
              "title": "Quy trình tạo gói nén gzip và xz cho dự án Python",
              "lang": "Bash",
              "code": "# 1. Tạo thư mục mẫu\nmkdir -p /tmp/demo_project && echo \"CODE V1\" > /tmp/demo_project/main.py\n\n# 2. Đóng gói và nén bằng gzip (cực nhanh, chuẩn phổ thông)\ntar -czvf /tmp/demo.tar.gz -C /tmp demo_project\n\n# 3. Đóng gói và nén bằng xz (tối ưu dung lượng lưu trữ)\ntar -cJvf /tmp/demo.tar.xz -C /tmp demo_project\n\n# 4. So sánh kích thước file nén\nls -lh /tmp/demo.tar.gz /tmp/demo.tar.xz",
              "output": "demo_project/\ndemo_project/main.py\ndemo_project/\ndemo_project/main.py\n-rw-r--r-- 1 devops devops 148 Oct 28 11:00 /tmp/demo.tar.gz\n-rw-r--r-- 1 devops devops 172 Oct 28 11:00 /tmp/demo.tar.xz",
              "annotations": [
                {
                  "part": "tar -czvf",
                  "text": "c (create), z (gzip), v (verbose), f (file archive)."
                },
                {
                  "part": "-C /tmp demo_project",
                  "text": "Cờ -C chuyển vào /tmp trước khi nén, giúp file nén không bị dính đường dẫn tuyệt đối dài dòng."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-2",
          "title": "2. Xem Trước An toàn (tar -t) & Giải nén Chỉ định Thư mục (-C)",
          "content": "<p>Khi tải một file nén từ Internet hoặc từ đối tác, bạn không bao giờ được phép gõ ngay <code>tar -xvf package.tar.gz</code> tại thư mục làm việc hiện tại!</p><ul><li><strong>Mối nguy hiểm Tar-Bomb:</strong> Tệp nén có thể chứa hàng nghìn file rác không nằm trong bất kỳ thư mục cha nào, hoặc chứa mã độc ghi đè lên các file hiện có trong thư mục hiện tại.</li><li><strong>Quy tắc Xem trước với cờ <code>-t</code>:</strong> Lệnh <code>tar -tzf package.tar.gz</code> đọc trực tiếp bảng mục lục lưu trữ và in ra cấu trúc tệp bên trong mà KHÔNG ghi bất kỳ byte nào ra đĩa cứng. Bạn có thể kiểm tra xem file có chứa thư mục bọc ngoài an toàn hay không.</li><li><strong>Giải nén an toàn với cờ <code>-C</code>:</strong> Luôn tạo một thư mục trống và giải nén chỉ định đích: <code>mkdir -p /opt/extracted && tar -xzvf package.tar.gz -C /opt/extracted</code>.</li></ul>",
          "codeExamples": [
            {
              "title": "Kiểm tra danh mục tệp và giải nén vào thư mục riêng biệt",
              "lang": "Bash",
              "code": "# 1. Xem trước danh sách file trong gói nén mà không giải nén ra đĩa\ntar -tzf /tmp/demo.tar.gz\n\n# 2. Tạo thư mục đích riêng và giải nén có kiểm soát bằng cờ -C\nmkdir -p /tmp/sandbox_dest\ntar -xzvf /tmp/demo.tar.gz -C /tmp/sandbox_dest\n\n# 3. Kiểm tra kết quả trong thư mục đích\nls -la /tmp/sandbox_dest",
              "output": "demo_project/\ndemo_project/main.py\ndemo_project/\ndemo_project/main.py\ntotal 12\ndrwxr-xr-x 3 devops devops 4096 Oct 28 11:05 .\ndrwxrwxrwt 9 root   root   4096 Oct 28 11:05 ..\ndrwxr-xr-x 2 devops devops 4096 Oct 28 11:00 demo_project",
              "annotations": [
                {
                  "part": "tar -tzf",
                  "text": "Cờ -t (list/test) xem mục lục an toàn, không sinh file rác ra đĩa."
                },
                {
                  "part": "-C /tmp/sandbox_dest",
                  "text": "Bảo đảm toàn bộ dữ liệu giải nén được cô lập bên trong thư mục chỉ định."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-3",
          "title": "3. Xác thực Tính Toàn vẹn & Chống Giả mạo với sha256sum",
          "content": "<p>Khi bạn tải một bản cài đặt Python, file ISO Linux hoặc gói phần mềm từ máy chủ từ xa, làm sao bạn biết chắc rằng:</p><ol><li>File tải về không bị lỗi đường truyền mạng làm hỏng hóc dữ liệu (Data Corruption)?</li><li>File tải về không bị tin tặc tấn công Man-In-The-Middle (MITM) tráo đổi bằng mã độc?</li></ol><p>Cộng đồng phần mềm toàn cầu sử dụng <strong>Mã băm mật mã học (Cryptographic Hash)</strong> SHA-256. Hàm băm nhận đầu vào là toàn bộ các byte dữ liệu của file và trả về một chuỗi 64 ký tự thập lục phân (Hexadecimal). Tính chất sống còn: <strong>Hiệu ứng tuyết lở (Avalanche Effect)</strong> — chỉ cần thay đổi 1 bit duy nhất trong file nặng 10GB, toàn bộ chuỗi mã hash SHA-256 sẽ biến đổi hoàn toàn!</p>",
          "codeExamples": [
            {
              "title": "Tạo và kiểm tra mã checksum tự động với sha256sum",
              "lang": "Bash",
              "code": "# 1. Tạo chuỗi mã hash SHA-256 cho tệp nén\nsha256sum /tmp/demo.tar.gz > /tmp/demo.tar.gz.sha256\ncat /tmp/demo.tar.gz.sha256\n\n# 2. Tự động kiểm tra tính toàn vẹn bằng cờ --check\nsha256sum -c /tmp/demo.tar.gz.sha256",
              "output": "a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0  /tmp/demo.tar.gz\n/tmp/demo.tar.gz: OK",
              "annotations": [
                {
                  "part": "sha256sum",
                  "text": "Thuật toán băm an toàn 256-bit chuẩn của NIST."
                },
                {
                  "part": "sha256sum -c",
                  "text": "Cờ --check tự động đọc file đối chiếu, tính toán lại hash thực tế và in thông báo 'OK' nếu khớp."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-4",
          "title": "4. Best Practices: Phòng ngừa Lỗ hổng Zip Slip & Đánh đổi Thuật toán",
          "content": "<p>Kinh nghiệm quản trị hệ thống và bảo mật dữ liệu lưu trữ:</p><ul><li><strong>Cảnh báo lỗ hổng Directory Traversal (Zip Slip):</strong> Một số tệp nén độc hại có thể chứa các đường dẫn tương đối nguy hiểm như <code>../../../../etc/shadow</code> hoặc đường dẫn tuyệt đối <code>/etc/sudoers</code>. Lệnh <code>tar</code> của GNU trên các distro hiện đại mặc định có cơ chế bảo vệ: tự động cắt bỏ dấu gạch chéo <code>/</code> ở đầu (strip leading '/') và cảnh báo người dùng. Tuy nhiên khi dùng lệnh <code>unzip</code> hoặc thư viện giải nén trong Python (<code>tarfile</code>, <code>zipfile</code>), bạn bắt buộc phải kiểm tra đường dẫn an toàn để không bị ghi đè tệp hệ thống.</li><li><strong>Bảng đánh đổi lựa chọn công cụ nén:</strong><ul><li><strong><code>gzip</code>:</strong> Tốc độ nhanh nhất, ngốn ít CPU nhất. Phù hợp: sao lưu log hàng ngày, nén luồng HTTP Nginx.</li><li><strong><code>xz</code>:</strong> Nén nhỏ nhất (tiết kiệm 30-50% dung lượng đĩa so với gzip). Phù hợp: bản phát hành phần mềm, lưu trữ lâu dài trên Cloud S3/Glacier.</li><li><strong><code>zip</code> / <code>unzip</code>:</strong> Khả năng tương thích tốt nhất với người dùng Windows và macOS. Dùng khi gửi file cho người dùng văn phòng.</li></ul></li></ul>",
          "codeExamples": [
            {
              "title": "Làm việc với file nén ZIP đa nền tảng",
              "lang": "Bash",
              "code": "# 1. Cài đặt tiện ích zip/unzip nếu chưa có\nsudo apt install -y zip unzip >/dev/null 2>&1\n\n# 2. Tạo file zip tương thích Windows\nzip -r /tmp/project.zip /tmp/demo_project >/dev/null\n\n# 3. Xem danh mục file trong file zip\nunzip -l /tmp/project.zip",
              "output": "Archive:  /tmp/project.zip\n  Length      Date    Time    Name\n---------  ---------- -----   ----\n        0  2024-10-28 11:00   tmp/demo_project/\n        8  2024-10-28 11:00   tmp/demo_project/main.py\n---------                     -------\n        8                     2 files",
              "annotations": [
                {
                  "part": "zip -r",
                  "text": "Cờ -r (recursive) đóng gói toàn bộ thư mục con theo chuẩn ZIP tương thích Windows."
                },
                {
                  "part": "unzip -l",
                  "text": "Liệt kê danh sách (list) tệp trong file zip mà không giải nén."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "`tar` là công cụ đóng gói nhiều file thành một; thuật toán nén (`gzip`, `xz`) là công đoạn thu nhỏ dung lượng độc lập.",
        "Thuật toán `gzip` nén cực nhanh phù hợp cho backup hàng ngày; `xz` nén chặt nhất tiết kiệm dung lượng cho lưu trữ lâu dài.",
        "Cờ `-f` trong lệnh `tar` bắt buộc phải đứng cuối cùng ngay trước tên file lưu trữ (`tar -czvf file.tar.gz`).",
        "Luôn dùng `tar -tzf` để xem trước nội dung file nén và luôn dùng cờ `-C /path` để giải nén vào thư mục cách ly.",
        "Mã băm mật mã `sha256sum` là công cụ chuẩn mực để kiểm định tính toàn vẹn dữ liệu và phòng chống tấn công giả mạo file."
      ]
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
        "Vận dụng tổng hợp toàn bộ kiến thức từ Bài 1.1 đến 1.9 để thiết lập một hạ tầng máy chủ Linux hoàn chỉnh cho ứng dụng Python.",
        "Quy hoạch cây thư mục theo đúng tiêu chuẩn FHS (`/opt`, `/var/log`, `/etc`), phân quyền bảo mật đặc quyền tối thiểu (600/755) và cô lập môi trường ảo venv tuân thủ PEP 668.",
        "Thiết lập kịch bản triển khai tự động hóa có kiểm tra mã thoát (exit code), ghi nhật ký 2 luồng (`2>&1`) và xác thực toàn vẹn bằng `sha256sum`.",
        "Tự chẩn đoán và khắc phục thành thạo 3 chuỗi sự cố kinh điển: Permission denied, command not found và xung đột thư viện hệ thống."
      ],
      "intuition": {
        "title": "Buổi diễn tập tổng kết giai đoạn tân binh",
        "metaphor": "Học từng lệnh rời rạc giống như tập từng thế võ độc lập. Dự án cuối cấp này là trận đấu thực chiến đầu tiên: bạn sẽ nhận bàn giao một máy chủ Linux vừa cài trắng tinh, tự tay quy hoạch cây thư mục chuẩn FHS, bảo vệ file mật khẩu cơ sở dữ liệu ở chế độ 600, khởi tạo môi trường ảo Python venv độc lập, kiểm tra đường ống xử lý dữ liệu qua pipe và đóng gói thành phẩm có chứng thực con dấu SHA-256.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>🏗️</span><span>QUY TRÌNH 5 BƯỚC TRIỂN KHAI</span><span class=\"lx-vs-tag\">Production Ready</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 1 (Bài 1.2 &amp; 1.7):</strong> Khảo sát distro, cài đặt gói phụ trợ và quy hoạch thư mục chuẩn FHS tại <code>/opt/data-service</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 2 (Bài 1.7):</strong> Tạo môi trường ảo <code>.venv</code> tuân thủ chuẩn PEP 668, nâng cấp pip nội bộ.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 3 (Bài 1.6):</strong> Phân quyền nghiêm ngặt: code thực thi <code>755</code>, file mật khẩu cấu hình <code>600</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 4 (Bài 1.8):</strong> Vận hành luồng I/O: nạp dữ liệu qua pipe <code>|</code>, chuyển hướng log <code>&gt;&gt; error.log 2&gt;&amp;1</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Bước 5 (Bài 1.9):</strong> Đóng gói sản phẩm sạch bằng <code>tar -czvf</code> và sinh con dấu <code>sha256sum</code>.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>🎯</span><span>3 CHUỖI SỰ CỐ THỰC CHIẾN</span><span class=\"lx-vs-tag\">Troubleshooting</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 1 (Xem lại Bài 1.6):</strong> Lỗi <em>Permission denied</em> khi chạy script Python (thiếu cờ <code>+x</code> và shebang).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 2 (Xem lại Bài 1.8):</strong> Lệnh cài đặt báo <em>command not found</em> (thiếu đường dẫn trong biến <code>$PATH</code>).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 3 (Xem lại Bài 1.7):</strong> Lỗi <em>externally-managed-environment</em> (xử lý chuẩn bằng venv thay vì pip root).</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-project-specs",
          "title": "1. Đặc tả Kỹ thuật Dự án: Hạ tầng Máy chủ Dịch vụ Dữ liệu Python",
          "content": "<p>Bạn được giao bàn giao một máy chủ Linux cho đội ngũ phát triển với các yêu cầu kỹ thuật đo lường được:</p><ol><li><strong>Quy hoạch thư mục FHS:</strong> Ứng dụng đặt tại <code>/opt/data-service/</code>, nhật ký lưu tại <code>/var/log/data-service/</code>, và bản phát hành đặt tại <code>/opt/data-service/dist/</code> (liên hệ <em>Bài 1.2</em>).</li><li><strong>Bảo mật phân quyền:</strong> Thư mục ứng dụng có quyền <code>755</code>; tệp cấu hình chứa khóa bí mật <code>config/db.env</code> phải có quyền nghiêm ngặt <code>600</code> (chỉ chủ sở hữu được đọc/sửa - liên hệ <em>Bài 1.6</em>).</li><li><strong>Môi trường thực thi:</strong> Tạo môi trường ảo độc lập <code>.venv</code>, không cài gói đè vào Python hệ thống tuân thủ PEP 668 (liên hệ <em>Bài 1.7</em>).</li><li><strong>Xử lý luồng I/O:</strong> Script <code>src/process.py</code> có shebang chuẩn <code>#!/usr/bin/env python3</code>, nhận dữ liệu qua <code>stdin</code>, lọc các dòng lỗi và xuất ra <code>stdout</code> (liên hệ <em>Bài 1.8</em>).</li><li><strong>Đóng gói &amp; Toàn vẹn:</strong> Đóng gói tệp nén <code>tar.gz</code> loại trừ thư mục <code>.venv</code> và <code>logs/</code>, sinh mã băm <code>sha256sum</code> kiểm định (liên hệ <em>Bài 1.9</em>).</li></ol>",
          "codeExamples": [
            {
              "title": "Script triển khai tự động hóa hoàn chỉnh toàn bộ Dự án Cấp 1",
              "lang": "Bash",
              "code": "#!/usr/bin/env bash\n# Script triển khai dự án tự động hóa Cấp 1\nset -euo pipefail\n\necho \"[1/5] Cai dat goi he thong...\"\nsudo apt update >/dev/null 2>&1\nsudo apt install -y python3 python3-venv >/dev/null 2>&1\n\necho \"[2/5] Tao quy hoach thu muc FHS...\"\nsudo mkdir -p /opt/data-service/{src,config,dist}\nsudo mkdir -p /var/log/data-service\nsudo chown -R $USER:$USER /opt/data-service /var/log/data-service\n\necho \"[3/5] Thiet lap moi truong ao venv...\"\npython3 -m venv /opt/data-service/.venv\n\necho \"[4/5] Tao file cau hinh va khoa quyen 600...\"\necho \"DB_SECRET_KEY=SecretProductionKey2026\" > /opt/data-service/config/db.env\nchmod 600 /opt/data-service/config/db.env\n\necho \"[5/5] Tao script xu ly luong I/O va thu nghiem...\"\ncat << 'EOF' > /opt/data-service/src/process.py\n#!/usr/bin/env python3\nimport sys\nfor line in sys.stdin:\n    if \"ERROR\" in line:\n        sys.stdout.write(f\"[DETECTED] {line}\")\nEOF\nchmod +x /opt/data-service/src/process.py\n\n# Thu nghiem luong pipe va chuyen huong log\nprintf \"INFO: App started\\nERROR: Connection timed out\\nDEBUG: Retrying\\n\" | \\\n  /opt/data-service/src/process.py >> /var/log/data-service/error.log 2>&1\n\n# Dong goi phat hanh kem ma bam SHA-256\ntar --exclude='.venv' -czvf /opt/data-service/dist/data-service-v1.0.tar.gz -C /opt data-service >/dev/null\nsha256sum /opt/data-service/dist/data-service-v1.0.tar.gz > /opt/data-service/dist/data-service-v1.0.tar.gz.sha256\n\necho \"[HOAN TAT] He thong san sang!\"",
              "output": "[1/5] Cai dat goi he thong...\n[2/5] Tao quy hoach thu muc FHS...\n[3/5] Thiet lap moi truong ao venv...\n[4/5] Tao file cau hinh va khoa quyen 600...\n[5/5] Tao script xu ly luong I/O va thu nghiem...\n[HOAN TAT] He thong san sang!",
              "annotations": [
                {
                  "part": "set -euo pipefail",
                  "text": "Kỷ luật shell script: dừng ngay lập tức nếu có lệnh gặp lỗi hoặc biến chưa khai báo."
                },
                {
                  "part": "chmod 600 .../db.env",
                  "text": "Bảo vệ file cấu hình chứa khóa bí mật theo chuẩn CIS Benchmark."
                },
                {
                  "part": "sha256sum ... > ...sha256",
                  "text": "Tạo con dấu xác thực toàn vẹn phục vụ bàn giao kiểm định."
                }
              ]
            }
          ]
        },
        {
          "id": "sec-project-rubric",
          "title": "2. Checklist Tự Chấm Điểm Dự án theo Tiêu chuẩn Quốc tế (100 Điểm)",
          "content": "<p>Để đảm bảo sản phẩm đạt chuẩn một bài thi thực hành chứng chỉ Linux (tương đương cấp độ LFCS / LPIC-1), học viên tự đối chiếu kết quả theo bảng tiêu chí sau:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Hạng mục Đánh giá</th><th>Tiêu chí Đo lường Được</th><th>Điểm</th><th>Bài tham chiếu</th></tr></thead><tbody><tr><td><strong>1. Cây thư mục FHS</strong></td><td>Thư mục nằm tại <code>/opt/data-service</code>, log nằm tại <code>/var/log/data-service</code>, cấu trúc rõ ràng</td><td>20 điểm</td><td>Xem lại <em>Bài 1.2</em></td></tr><tr><td><strong>2. An toàn Phân quyền</strong></td><td>File <code>db.env</code> có đúng quyền <code>600</code> (<code>-rw-------</code>); script có cờ <code>+x</code> (<code>755</code>)</td><td>20 điểm</td><td>Xem lại <em>Bài 1.6</em></td></tr><tr><td><strong>3. Cô lập Môi trường</strong></td><td>Thư mục <code>.venv</code> tồn tại, <code>which python</code> trong venv trỏ đúng thư mục cục bộ</td><td>20 điểm</td><td>Xem lại <em>Bài 1.7</em></td></tr><tr><td><strong>4. Xử lý Luồng I/O</strong></td><td>Script xử lý từ <code>stdin</code>, file <code>error.log</code> ghi nhận đúng dòng lỗi, chuyển hướng <code>2>&1</code> chuẩn</td><td>20 điểm</td><td>Xem lại <em>Bài 1.8</em></td></tr><tr><td><strong>5. Đóng gói &amp; Checksum</strong></td><td>Gói <code>tar.gz</code> không chứa <code>.venv</code> thừa, file <code>.sha256</code> khớp 100% khi chạy <code>sha256sum -c</code></td><td>20 điểm</td><td>Xem lại <em>Bài 1.9</em></td></tr></tbody></table></div>",
          "codeExamples": [
            {
              "title": "Lệnh tự động chấm điểm và kiểm tra toàn vẹn dự án",
              "lang": "Bash",
              "code": "# Kiểm tra nhanh quyền 600 của file cấu hình và tính toàn vẹn của mã SHA-256\nls -l /opt/data-service/config/db.env\nsha256sum -c /opt/data-service/dist/data-service-v1.0.tar.gz.sha256\ncat /var/log/data-service/error.log",
              "output": "-rw------- 1 devops devops 38 Oct 28 11:30 /opt/data-service/config/db.env\n/opt/data-service/dist/data-service-v1.0.tar.gz: OK\n[DETECTED] ERROR: Connection timed out",
              "annotations": [
                {
                  "part": "-rw-------",
                  "text": "Xác nhận file cấu hình đạt chuẩn bảo mật 600."
                },
                {
                  "part": "OK",
                  "text": "Con dấu SHA-256 khớp tuyệt đối."
                }
              ]
            }
          ]
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
          ]
        }
      ],
      "summary": [
        "Dự án Cấp 1 tích hợp toàn diện kỹ năng tổ chức FHS, bảo mật phân quyền 600/755, môi trường ảo venv, chuyển hướng I/O và đóng gói checksum.",
        "Luôn tách bạch giữa mã nguồn (`/opt`), nhật ký (`/var/log`) và cấu hình (`/etc` hoặc `config/`).",
        "Lỗi `Permission denied` khắc phục bằng cách cấp quyền `chmod +x` và bổ sung dòng shebang chuẩn `#!/usr/bin/env python3`.",
        "Lỗi `command not found` của các công cụ mới cài xử lý bằng cách khai báo đường dẫn trong biến `$PATH` tại `~/.bashrc`.",
        "Xác thực con dấu SHA-256 trước khi giải nén là bước bảo mật bắt buộc trong quy trình vận hành sản xuất hiện đại."
      ]
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
        "Tra cứu nhanh chóng 100% cú pháp lệnh cốt lõi của Cấp 1 được phân loại theo nhóm nghiệp vụ trong 5 giây.",
        "Nhận biết ngay lập tức các cờ tùy chọn có độ nguy hiểm cao thông qua cột Cảnh báo Rủi ro & Thao tác An toàn.",
        "Nắm vững định nghĩa chuẩn quốc tế của 16 thuật ngữ nền tảng hệ điều hành kèm liên kết đối chiếu ngược về các bài học tương ứng.",
        "Hoàn thành các bài tự kiểm tra nhanh để củng cố phản xạ xử lý dòng lệnh trước khi bước lên Cấp 2."
      ],
      "intuition": {
        "title": "Chiếc cờ-lê đa năng và Cuốn sổ tay bỏ túi của Kỹ sư Vận hành",
        "metaphor": "Một người thợ cơ khí lành nghề không cố ghi nhớ kích thước của hàng ngàn con ốc trong đầu, mà luôn mang theo bên mình một chiếc thước kẹp chính xác và cuốn sổ tay thông số kỹ thuật bỏ túi. Bài học này chính là cuốn sổ tay tra cứu nhanh của bạn: mỗi khi quên một cờ lệnh nén tar, phân vân giữa > và >>, hay gặp một thuật ngữ như Inode, UsrMerge, PEP 668, bạn chỉ cần mở trang này để tra cứu tức thì cùng các chỉ dẫn an toàn sinh tử.",
        "visualHtml": "<div class=\"lx-vs-grid\"><div class=\"lx-vs-card kernel-card\"><div class=\"lx-vs-title\"><span>⚡</span><span>NHÓM TÁC VỤ CỐT LÕI</span><span class=\"lx-vs-tag\">Quick Reference</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> <strong>Điều hướng &amp; Tệp:</strong> <code>pwd</code>, <code>cd</code>, <code>ls -lah</code>, <code>mkdir -p</code>, <code>cp -a</code>, <code>mv -i</code>, <code>rm -i</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Xem &amp; Soạn thảo:</strong> <code>less</code>, <code>head -n</code>, <code>tail -F</code>, <code>cat -n</code>, <code>nano</code>, <code>vim</code> (:wq, :q!).</li><li><span class=\"lx-vs-bullet\">•</span> <strong>Quyền &amp; Quản trị:</strong> <code>chmod 755/644/600</code>, <code>chown user:group</code>, <code>sudo</code>, <code>visudo</code>, <code>umask</code>.</li><li><span class=\"lx-vs-bullet\">•</span> <strong>I/O &amp; Đóng gói:</strong> <code>&gt;</code>, <code>&gt;&gt;</code>, <code>2&gt;&amp;1</code>, <code>|</code>, <code>tee</code>, <code>tar -czvf</code>, <code>tar -xzvf -C</code>, <code>sha256sum</code>.</li></ul></div><div class=\"lx-vs-card distro-card\"><div class=\"lx-vs-title\"><span>📖</span><span>TỪ ĐIỂN ĐỐI CHIẾU THUẬT NGỮ</span><span class=\"lx-vs-tag\">Concepts Map</span></div><ul class=\"lx-vs-list\"><li><span class=\"lx-vs-bullet\">•</span> Mỗi thuật ngữ đều có định nghĩa ngắn gọn, giải thích bản chất kỹ thuật.</li><li><span class=\"lx-vs-bullet\">•</span> Đính kèm chỉ mục tham chiếu cụ thể tới từng bài học (ví dụ: <em>Xem lại Bài 1.4</em>).</li><li><span class=\"lx-vs-bullet\">•</span> Cột cảnh báo đỏ cho các lệnh phá hủy dữ liệu một chiều không thể hoàn tác.</li></ul></div></div>"
      },
      "sections": [
        {
          "id": "sec-cheat-sheet",
          "title": "1. Bảng Tra cứu Cú pháp Lệnh theo Nhóm Nghiệp vụ & Cảnh báo An toàn",
          "content": "<p>Bảng tổng hợp toàn bộ các câu lệnh quan trọng nhất của Cấp 1 kèm cột <strong>Cẩn thận / Lưu ý Rủi ro</strong>:</p><div class=\"table-responsive\"><table class=\"lesson-table\"><thead><tr><th>Nhóm Lệnh</th><th>Lệnh &amp; Cú pháp Chuẩn</th><th>Ý nghĩa Vận hành</th><th>Cẩn thận / Lưu ý An toàn</th><th>Bài học</th></tr></thead><tbody><tr><td><strong>Hệ thống</strong></td><td><code>uname -srm</code><br><code>cat /etc/os-release</code><br><code>systemd-detect-virt</code></td><td>Xem kernel, kiến trúc<br>Xem tên distro<br>Nhận diện VM/WSL/Container</td><td>An toàn (chỉ đọc)<br>An toàn (chỉ đọc)<br>Cần cho script môi trường</td><td>Bài 1.1<br>Bài 1.1<br>Bài 1.1</td></tr><tr><td><strong>Tra cứu</strong></td><td><code>man 1 cmd</code> / <code>man 5 file</code><br><code>apropos keyword</code><br><code>type -a cmd</code></td><td>Xem sổ tay theo section<br>Tìm lệnh theo từ khóa<br>Phân biệt builtin vs binary</td><td>Nhớ phím <code>q</code> để thoát<br>Cần cập nhật <code>mandb</code><br>Giúp debug lệnh bị đè</td><td>Bài 1.3<br>Bài 1.3<br>Bài 1.3</td></tr><tr><td><strong>Tệp &amp; Thư mục</strong></td><td><code>mkdir -p dir/sub</code><br><code>cp -a src/ dst/</code><br><code>mv -i src dst</code><br><code>rm -rf path/</code><br><code>ln -s target link</code></td><td>Tạo cây thư mục sâu<br>Sao chép bảo toàn thuộc tính<br>Di chuyển/đổi tên có hỏi<br>Xóa vĩnh viễn đệ quy<br>Tạo liên kết mềm symlink</td><td>An toàn (idempotent)<br>Tránh dùng <code>cp -r</code> thường<br>Cờ <code>-i</code> chống ghi đè<br><strong>CỰC KỲ NGUY HIỂM! Không có Undo</strong><br>Dùng đường dẫn tuyệt đối</td><td>Bài 1.4<br>Bài 1.4<br>Bài 1.4<br>Bài 1.4<br>Bài 1.4</td></tr><tr><td><strong>Xem &amp; Soạn thảo</strong></td><td><code>less file</code><br><code>tail -n 20 -F file.log</code><br><code>head -n 10 file</code><br><code>vim file</code> (<code>:q!</code>, <code>:wq</code>)</td><td>Xem trang mượt mà<br>Bám đuôi log chống xoay vòng<br>Xem 10 dòng đầu<br>Soạn thảo dòng lệnh sinh tồn</td><td><strong>Tuyệt đối tránh cat file lớn</strong><br>Dùng F hoa thay vì f thường<br>An toàn<br>Nhấn Esc về Normal mode</td><td>Bài 1.5<br>Bài 1.5<br>Bài 1.5<br>Bài 1.5</td></tr><tr><td><strong>Phân quyền</strong></td><td><code>chmod 755/644/600 file</code><br><code>chown -R user:group dir</code><br><code>sudo visudo</code><br><code>umask 022</code></td><td>Đổi quyền bát phân<br>Bàn giao quyền sở hữu<br>Sửa file phân quyền an toàn<br>Mặt nạ tạo quyền mặc định</td><td><strong>CẤM chmod 777 bừa bãi</strong><br>Cần quyền root (sudo)<br>Không sửa thẳng bằng nano<br>Kiểm tra quyền file sinh ra</td><td>Bài 1.6<br>Bài 1.6<br>Bài 1.6<br>Bài 1.6</td></tr><tr><td><strong>Quản lý Gói</strong></td><td><code>sudo apt update && apt upgrade</code><br><code>python3 -m venv .venv</code><br><code>sudo apt autoremove</code></td><td>Đồng bộ và nâng cấp gói<br>Tạo môi trường ảo cách ly<br>Dọn dẹp thư viện mồ côi</td><td>Tránh <code>pacman -Sy</code> từng phần<br>Tuân thủ chuẩn PEP 668<br>Xem danh sách trước khi xóa</td><td>Bài 1.7<br>Bài 1.7<br>Bài 1.7</td></tr><tr><td><strong>I/O &amp; Pipe</strong></td><td><code>cmd &gt;&gt; log 2&gt;&amp;1</code><br><code>cmd1 | cmd2</code><br><code>cmd | tee -a file</code><br><code>export PATH=\"...:$PATH\"</code></td><td>Ghi nối tiếp cả 2 luồng<br>Nối output thành input<br>Vừa in vừa lưu đĩa<br>Khai báo biến môi trường</td><td>Tránh nhầm <code>&gt;</code> làm mất log<br>Dữ liệu truyền qua RAM<br>An toàn<br>Lưu vào <code>~/.bashrc</code> để bền</td><td>Bài 1.8<br>Bài 1.8<br>Bài 1.8<br>Bài 1.8</td></tr><tr><td><strong>Nén &amp; Checksum</strong></td><td><code>tar -czvf pkg.tar.gz dir</code><br><code>tar -xzvf pkg.tar.gz -C dst</code><br><code>tar -tzf pkg.tar.gz</code><br><code>sha256sum -c sum.txt</code></td><td>Tạo file nén gzip<br>Giải nén vào thư mục đích<br>Xem trước mục lục nén<br>Xác thực mã băm toàn vẹn</td><td>Cờ <code>-f</code> phải đứng cuối<br>Tránh Tar-bomb bung rác<br>Kiểm tra trước khi giải nén<br>Bảo vệ chống file giả mạo</td><td>Bài 1.9<br>Bài 1.9<br>Bài 1.9<br>Bài 1.9</td></tr></tbody></table></div>",
          "codeExamples": []
        },
        {
          "id": "sec-glossary",
          "title": "2. Từ điển Thuật ngữ Cốt lõi Cấp 1 (Glossary & Cross-References)",
          "content": "<p>Danh mục 16 thuật ngữ nền tảng được chuẩn hóa định nghĩa kèm bài học tham chiếu:</p><div class=\"lx-glossary-grid\"><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Kernel (Nhân)</span><span class=\"lx-glossary-cat\">Core</span></div><div class=\"lx-glossary-def\">Lõi trung tâm của hệ điều hành chạy tại Ring 0, trực tiếp điều khiển phần cứng CPU, RAM, ổ đĩa và cung cấp Syscalls. (<em>Xem lại Bài 1.1</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Distribution (Distro)</span><span class=\"lx-glossary-cat\">OS</span></div><div class=\"lx-glossary-def\">Bản phân phối hoàn chỉnh đóng gói Kernel cùng GNU Coreutils, systemd, trình quản lý gói (apt/dnf/pacman). (<em>Xem lại Bài 1.1</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>FHS (Filesystem Hierarchy)</span><span class=\"lx-glossary-cat\">Filesystem</span></div><div class=\"lx-glossary-def\">Tiêu chuẩn quy định vai trò từng thư mục: /etc (cấu hình), /var (log/dữ liệu biến đổi), /usr (phần mềm). (<em>Xem lại Bài 1.2</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>UsrMerge</span><span class=\"lx-glossary-cat\">Architecture</span></div><div class=\"lx-glossary-def\">Cơ chế trên distro hiện đại gộp /bin, /sbin, /lib thành các symlink trỏ vào /usr/bin, /usr/lib. (<em>Xem lại Bài 1.2</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Shell Builtin</span><span class=\"lx-glossary-cat\">Shell</span></div><div class=\"lx-glossary-def\">Lệnh nội bộ được biên dịch sẵn trong nhân của Bash (cd, pwd, echo), chạy siêu nhanh trong RAM. (<em>Xem lại Bài 1.3</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Man Section</span><span class=\"lx-glossary-cat\">Documentation</span></div><div class=\"lx-glossary-def\">Phân vùng sổ tay điện tử: Section 1 (lệnh user), Section 5 (cú pháp file cấu hình), Section 8 (lệnh quản trị root). (<em>Xem lại Bài 1.3</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Inode</span><span class=\"lx-glossary-cat\">Storage</span></div><div class=\"lx-glossary-def\">Cấu trúc dữ liệu trên đĩa lưu metadata của tệp (kích thước, quyền, timestamps, con trỏ data blocks). (<em>Xem lại Bài 1.4</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Symbolic Link (Symlink)</span><span class=\"lx-glossary-cat\">Filesystem</span></div><div class=\"lx-glossary-def\">Tệp liên kết tượng trưng lưu chuỗi đường dẫn tới tệp đích, hoạt động như shortcut xuyên phân vùng. (<em>Xem lại Bài 1.4</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Terminal Pager</span><span class=\"lx-glossary-cat\">CLI Tools</span></div><div class=\"lx-glossary-def\">Trình xem tệp phân trang (như less) chỉ nạp từng trang màn hình vào RAM, bảo vệ máy chủ khi xem file lớn. (<em>Xem lại Bài 1.5</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Octal Permissions (4-2-1)</span><span class=\"lx-glossary-cat\">Security</span></div><div class=\"lx-glossary-def\">Hệ thống phân quyền bát phân tính bằng tổng trọng số: Read=4, Write=2, Execute=1 cho User, Group, Others. (<em>Xem lại Bài 1.6</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Least Privilege</span><span class=\"lx-glossary-cat\">Security</span></div><div class=\"lx-glossary-def\">Nguyên tắc an ninh: chỉ cấp cho tài khoản hoặc tiến trình đúng quyền hạn tối thiểu cần thiết để làm việc. (<em>Xem lại Bài 1.6</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>visudo</span><span class=\"lx-glossary-cat\">Administration</span></div><div class=\"lx-glossary-def\">Lệnh chuyên dụng chỉnh sửa file /etc/sudoers có cơ chế khóa file và kiểm tra cú pháp chống tự khóa mình. (<em>Xem lại Bài 1.6</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>PEP 668</span><span class=\"lx-glossary-cat\">Python/Linux</span></div><div class=\"lx-glossary-def\">Chuẩn an toàn bảo vệ môi trường Python hệ thống khỏi bị ghi đè bởi pip, yêu cầu dùng venv hoặc pipx. (<em>Xem lại Bài 1.7</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>File Descriptor (FD)</span><span class=\"lx-glossary-cat\">Kernel/IO</span></div><div class=\"lx-glossary-def\">Chỉ số nguyên định danh luồng I/O: 0 (stdin - nhập), 1 (stdout - xuất kết quả), 2 (stderr - báo lỗi). (<em>Xem lại Bài 1.8</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>Pipe (|)</span><span class=\"lx-glossary-cat\">Architecture</span></div><div class=\"lx-glossary-def\">Đường ống Unix chuyển trực tiếp luồng stdout của lệnh đứng trước thành stdin của lệnh đứng sau trong RAM. (<em>Xem lại Bài 1.8</em>)</div></div><div class=\"lx-glossary-card\"><div class=\"lx-glossary-term\"><span>SHA-256 Checksum</span><span class=\"lx-glossary-cat\">Cryptography</span></div><div class=\"lx-glossary-def\">Chuỗi mã băm mật mã 64 ký tự dùng để xác thực tính toàn vẹn và chống giả mạo cho gói phần mềm. (<em>Xem lại Bài 1.9</em>)</div></div></div>",
          "codeExamples": []
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
          ]
        }
      ],
      "summary": [
        "Bảng tra cứu lệnh phân loại theo 8 nhóm tác vụ giúp tra cứu cú pháp và cờ lệnh an toàn trong 5 giây.",
        "Khắc sâu các lệnh nguy cơ cao: `rm -rf`, `chmod 777`, `>` (ghi đè log), và `cat` trên file dung lượng lớn.",
        "Từ điển 16 thuật ngữ cốt lõi gắn liền với các bài học cụ thể từ 1.1 đến 1.9.",
        "Luôn ưu tiên các giải pháp an toàn chuẩn quốc tế: `cp -a`, `tail -F`, `visudo`, `venv`, `tee -a` và `sha256sum`.",
        "Hoàn thành Cấp 1 là nền tảng vững chắc để tự tin bước sang Cấp 2: Quản trị Trung cấp & Vận hành Dịch vụ."
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
      }
    }
  ]
};
