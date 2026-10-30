/**
 * Dữ liệu Giáo trình Linux Thực chiến & Nội bộ HĐH: CẤP 4 – CỰC KỲ CHUYÊN SÂU (KERNEL INTERNALS)
 * Thiết kế cho kỹ sư cấp cao, chuyên gia hệ thống, kiến trúc sư hạ tầng (SRE / Kernel Engineers)
 */

window.LX_LEVEL4_DATA = {
  "id": "part-lx-4",
  "number": "Cấp 4",
  "title": "Nội bộ Hệ điều hành & Kiến trúc Nhân",
  "level": "Cực kỳ chuyên sâu",
  "badge": "Chuyên sâu",
  "description": "Giải phẫu sâu bên dưới nắp ca-pô của Linux Kernel: kiến trúc Monolithic và cơ chế Syscall, giải phẫu 5 giai đoạn khởi động UEFI/GRUB/Initramfs, quản lý tiến trình và bộ lập lịch CPU CFS/EEVDF, quản lý bộ nhớ ảo (Paging, Page Cache, OOM Killer), VFS và Dirty Pages xả đĩa, hệ thống file ảo /proc và /sys (sysctl), ngăn xếp mạng TCP/Netfilter, nền tảng container (Namespaces, Cgroups v2, Capabilities, Seccomp) và tự dựng Mini Container bằng Shell primitives.",
  "lessons": [
    {
      "id": "lx-4-01",
      "number": "4.1",
      "title": "Kiến trúc Nhân Linux (Kernel Architecture) & Cơ chế Giao tiếp Syscall",
      "subtitle": "Khám phá bức tường ngăn cách giữa User Space và Kernel Space cùng cầu nối System Call",
      "level": "Cực kỳ chuyên sâu",
      "duration": "70 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Hiểu sâu kiến trúc Monolithic Modular của Linux Kernel và ranh giới bảo vệ đặc quyền phần cứng CPU Ring 0 vs Ring 3.",
        "Nắm vững chu trình thực thi của một System Call (Syscall): từ Wrapper Library (glibc) -> CPU Trap/Sysenter/Syscall Instruction -> Syscall Table -> Kernel Function -> Trả về User Space.",
        "Phân tích cơ chế tối ưu vDSO (virtual Dynamic Shared Object) và vsyscall giúp bypass context switch cho các cuộc gọi thời gian như gettimeofday.",
        "Sử dụng công cụ strace chuyên sâu để bóc tách hành vi cấp thấp của ứng dụng Python/C."
      ],
      "intuition": {
        "title": "Phòng giao dịch ngân hàng có kính chống đạn",
        "metaphor": "Hãy hình dung hệ điều hành như một ngân hàng lớn. Khách hàng thông thường (User Space - Ring 3) chỉ được đứng ngoài sảnh giao dịch và không được phép tự ý bước vào kho tiền (Phần cứng CPU, RAM, Ổ đĩa - Ring 0). Mỗi khi muốn gửi hay rút tiền (đọc/ghi file, gửi gói tin mạng), khách hàng phải đến quầy kính chống đạn, điền vào một phiếu yêu cầu chuẩn mực (System Call Arguments). Nhân viên giao dịch bên trong (Kernel Syscall Handler) kiểm tra căn cước và chữ ký (Quyền truy cập & Phân trang bộ nhớ), vào kho thực hiện thao tác rồi trao kết quả qua khe kính. Nếu khách hàng cố trèo qua tường kính, còi báo động lập tức vang lên và cảnh sát sẽ bắn hạ (Segmentation Fault / SIGSEGV).",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🏢</span>\n                    <span>USER SPACE</span>\n                    <span class=\"lx-vs-tag\">Ring 3 • App</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Phạm vi:</strong> Mọi ứng dụng thông thường (Nginx, Python script, Bash shell).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bộ nhớ:</strong> Chỉ thấy không gian địa chỉ ảo 128TB, không thể chạm RAM vật lý.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Quyền hạn:</strong> CPU cấm thực thi lệnh can thiệp phần cứng; bắt buộc gọi qua Syscall.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚡</span>\n                    <span>KERNEL SPACE</span>\n                    <span class=\"lx-vs-tag\">Ring 0 • Nhân</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Phạm vi:</strong> Nhân Linux (vmlinuz) và các Driver mô-đun phần cứng.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bộ nhớ:</strong> Toàn quyền đọc/ghi RAM vật lý và quản trị bảng phân trang CR3.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Điều phối:</strong> Tra cứu <code>sys_call_table</code>, thực thi tác vụ I/O và trả kết quả về Ring 3.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-kernel-rings",
          "title": "1. Phân định Không gian User Space (Ring 3) và Kernel Space (Ring 0)",
          "content": "<p>Kiến trúc vi xử lý x86-64 định nghĩa 4 mức đặc quyền bảo vệ phần cứng (Rings 0-3). Linux chỉ sử dụng hai mức:</p><ul><li><code>Ring 3 (User Space)</code>: Mọi ứng dụng thông thường (Nginx, Python script, Bash shell) chạy ở đây. Bộ nhớ ảo bị giới hạn, CPU cấm thực thi các chỉ lệnh đặc quyền như can thiệp bảng phân trang CR3, dừng CPU (hlt) hay truy cập trực tiếp cổng I/O.</li><li><code>Ring 0 (Kernel Space)</code>: Nhân Linux (Kernel) và các Driver phần cứng chạy ở đây. Có toàn quyền truy cập bộ nhớ vật lý và thực thi mọi chỉ lệnh vi xử lý.</li></ul><p>Sự phân chia này đảm bảo một ứng dụng người dùng bị sập (crash) hay dính mã độc không thể làm sập toàn bộ máy chủ vật lý.</p>"
        },
        {
          "id": "sec-syscall-lifecycle",
          "title": "2. Giải phẫu Vòng đời Một Cuộc gọi Hệ thống (Syscall Lifecycle)",
          "content": "<p>Khi mã nguồn Python gọi hàm <code>open('data.txt', 'r')</code>, chuỗi sự kiện diễn ra ở tầng vi mô:</p><ol><li><strong>Giao diện Wrapper:</strong> Python gọi thư viện C chuẩn (<code>glibc</code>) hàm <code>open()</code>.</li><li><strong>Nạp thanh ghi CPU:</strong> glibc chuyển số hiệu định danh syscall (ví dụ trên x86_64, <code>sys_openat</code> có mã <code>257</code>) vào thanh ghi <code>%rax</code>, các tham số đường dẫn và cờ nạp vào <code>%rdi</code>, <code>%rsi</code>, <code>%rdx</code>.</li><li><strong>Chuyển đổi ngữ cảnh (Context Switch):</strong> CPU thực thi chỉ lệnh <code>syscall</code> (hoặc <code>int 0x80</code> trên hệ 32-bit). CPU chuyển từ Ring 3 sang Ring 0, lưu con trỏ ngăn xếp người dùng (user stack) và nhảy đến hàm xử lý của kernel (<code>entry_SYSCALL_64</code>).</li><li><strong>Tra bảng Syscall Table:</strong> Kernel kiểm tra tính hợp lệ của số hiệu trong <code>sys_call_table</code> và gọi con trỏ hàm tương ứng (<code>sys_openat</code>).</li><li><strong>Thực thi & Trả về:</strong> Kernel thực hiện đọc VFS, trả mã descriptor file (hoặc mã lỗi âm như <code>-ENOENT</code>) vào thanh ghi <code>%rax</code>, sau đó thực thi lệnh <code>sysretq</code> để chuyển CPU trở lại Ring 3 tiếp tục ứng dụng.</li></ol><div class=\"callout-box note-box\"><div class=\"callout-title\">💡 Tối ưu hóa vDSO (virtual Dynamic Shared Object)</div><p>Việc chuyển đổi ngữ cảnh Ring 3 $\\rightarrow$ Ring 0 tốn hàng trăm chu kỳ CPU. Với các lệnh gọi thường xuyên chỉ để đọc thời gian như <code>gettimeofday()</code> hoặc <code>clock_gettime()</code>, Linux ánh xạ một trang nhớ kernel chứa sẵn giá trị thời gian vào thẳng bộ nhớ ảo của User Space dưới dạng một thư viện chia sẻ ảo (vDSO). Nhờ đó, ứng dụng đọc trực tiếp thời gian mà không cần chuyển Ring, tốc độ nhanh gấp hàng chục lần!</p></div>"
        },
        {
          "id": "sec-strace-syscall",
          "title": "3. Thực hành Soi Syscall của Ứng dụng Python bằng strace",
          "content": "<p>Sử dụng <code>strace</code> với các cờ đo lường thời gian trễ và thống kê cuộc gọi:</p><pre><code># Chạy và thống kê tần suất, thời gian tiêu tốn của từng syscall:\nstrace -c python3 -c \"import time; time.sleep(0.5); print('Done')\"\n\n# Bắt dấu vết chi tiết các thao tác I/O tập tin và mạng:\nstrace -e trace=openat,read,write,connect -s 128 python3 -c \"open('/etc/hosts').read()\"</code></pre><p><strong>Kết quả phân tích mẫu từ strace:</strong></p><pre><code>openat(AT_FDCWD, \"/etc/hosts\", O_RDONLY|O_CLOEXEC) = 3\nnewfstatat(3, \"\", {st_mode=S_IFREG|0644, st_size=250, ...}, AT_EMPTY_PATH) = 0\nread(3, \"127.0.0.1 localhost\\n::1 localhost\\n\", 251) = 250\nclose(3) = 0</code></pre><p>Qua đó ta thấy rõ: một lệnh đọc file ngắn gọn trong Python thực chất ánh xạ chính xác qua 4 syscall kernel: <code>openat</code> -> <code>newfstatat</code> -> <code>read</code> -> <code>close</code>.</p>"
        }
      ],
      "scenarios": [
        {
          "title": "Tình huống: Backend Python bị 'đóng băng' do chờ Syscall mạng",
          "problem": "Một dịch vụ web viết bằng Python (FastAPI/Gunicorn) đôi khi bị treo vài worker, CPU sử dụng 0% nhưng không đáp ứng thêm request mới.",
          "solution": "Dùng <code>lsof -p &lt;PID&gt;</code> để lấy danh sách socket đang mở, sau đó gắn <code>strace -p &lt;PID&gt;</code> vào worker đang treo. Nếu thấy worker đang bị chặn (blocking) ở syscall <code>connect()</code> hoặc <code>recvfrom()</code> tới một địa chỉ IP database bên ngoài mà không có timeout, ta đã bắt đúng nguyên nhân rò rỉ kết nối mạng không đặt cờ timeout."
        }
      ],
      "commonMistakes": [
        "Lầm tưởng mọi hàm thư viện C (như strlen, printf, malloc) đều là syscall. Thực tế, strlen chạy 100% trong User Space; printf dùng buffer trong User Space và chỉ gọi syscall write khi buffer đầy hoặc gặp ký tự xuống dòng; malloc gọi brk/mmap khi cần cấp phát thêm trang bộ nhớ mới."
      ],
      "exercises": [
        {
          "question": "Làm thế nào để đo thời gian tiêu tốn trong Kernel Space (Syscall time) so với User Space của một tiến trình đang chạy?",
          "command": "time python3 script.py\n# hoặc xem trực tiếp:\npidstat -u 1 5",
          "explanation": "Lệnh time trả về: 'real' (tổng thời gian đồng hồ thực tế), 'user' (thời gian CPU thực thi mã lệnh trong User Space), và 'sys' (thời gian CPU thực thi trong Kernel Space phục vụ các syscall của tiến trình đó). Nếu 'sys' chiếm tỷ lệ cao bất thường, chương trình đang bị nghẽn do gọi quá nhiều syscall I/O nhỏ giọt."
        }
      ],
      "summary": [
        "Linux chia cắt không gian nghiêm ngặt thành User Space (Ring 3) an toàn và Kernel Space (Ring 0) toàn quyền.",
        "System Call là cánh cổng hợp pháp duy nhất để ứng dụng User Space yêu cầu dịch vụ phần cứng từ Kernel.",
        "strace là kính hiển vi giúp kỹ sư DevOps/SRE soi rõ từng hành động cấp thấp của ứng dụng khi gặp sự cố."
      ]
    },
    {
      "id": "lx-4-02",
      "number": "4.2",
      "title": "Giải phẫu Quá trình Khởi động Hệ thống: UEFI/BIOS -> GRUB -> Initramfs -> Kernel -> systemd",
      "subtitle": "Hành trình từ mạch điện phần cứng vi mô tới khi hệ thống sẵn sàng tiếp nhận người dùng",
      "level": "Cực kỳ chuyên sâu",
      "duration": "75 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Hiểu trọn vẹn 5 giai đoạn khởi động của một máy chủ Linux hiện đại: Firmware (UEFI/BIOS) -> Bootloader (GRUB2) -> Kernel Space -> Initramfs -> User Space (systemd PID 1).",
        "Nắm vững vai trò sinh tử của Initramfs (Initial RAM Filesystem) trong việc nạp driver lưu trữ (RAID, LVM, NVMe, mã hóa LUKS) trước khi mount rootfs chính.",
        "Hiểu cơ chế chuyển giao quyền lực pivot_root / switch_root từ môi trường RAM tạm thời sang hệ thống file thực trên đĩa.",
        "Làm chủ kỹ năng cứu hộ máy chủ rơi vào lỗi GRUB Rescue hoặc Initramfs Emergency Shell."
      ],
      "intuition": {
        "title": "Tên lửa phóng vệ tinh nhiều tầng",
        "metaphor": "Quá trình khởi động Linux giống như một vụ phóng tên lửa đưa tàu vũ trụ vào quỹ đạo. Tầng đẩy 1 (UEFI Firmware) kích hoạt động cơ phần cứng và tìm vị trí bệ phóng. Tầng đẩy 2 (GRUB Bootloader) nạp mã điều khiển ban đầu và định vị tải trọng. Tầng đẩy 3 (Initramfs) là phi thuyền tạm thời trong không gian chứa các thiết bị đặc biệt (driver đĩa, chìa khóa giải mã LUKS) để tiếp cận trạm không gian chính. Khi trạm không gian chính (Root Filesystem) được kết nối thành công, phi thuyền tạm thời tách ra và tự hủy (switch_root), nhường quyền chỉ huy tối cao cho Tổng hành dinh vĩnh viễn (systemd PID 1).",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🚀</span>\n                    <span>TIỀN KHỞI ĐỘNG</span>\n                    <span class=\"lx-vs-tag\">Bước 1 → 3</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>1. UEFI/BIOS:</strong> POST kiểm tra phần cứng, nạp EFI Bootloader.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>2. GRUB2:</strong> Nạp file nén kernel <code>vmlinuz</code> và <code>initrd.img</code> vào RAM.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>3. Kernel Init:</strong> Tự giải nén, dò tìm CPU, thiết lập ngắt và bộ phân trang.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔄</span>\n                    <span>BÀN GIAO PID 1</span>\n                    <span class=\"lx-vs-tag\">Bước 4 → 5</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>4. Initramfs:</strong> Nạp driver đĩa, mở khóa LUKS/LVM, mount phân vùng gốc vào /sysroot.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>5. switch_root:</strong> Giải phóng RAM disk, biến systemd thành PID 1 duy nhất.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Cứu hộ GRUB:</strong> Dùng <code>init=/bin/bash</code> khi hệ thống không thể boot vào systemd.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-boot-stages",
          "title": "1. Sơ đồ 5 Giai đoạn Khởi động Máy chủ Linux",
          "content": "<p>Chuỗi mắt xích liên hoàn diễn ra ngay khi nhấn nút nguồn Power:</p><div class=\"lx-table-responsive\"><table class=\"lx-table\"><thead><tr><th>Giai đoạn</th><th>Thành phần chịu trách nhiệm</th><th>Nhiệm vụ cốt lõi</th></tr></thead><tbody><tr><td><strong>1. Firmware</strong></td><td>UEFI (hoặc Legacy BIOS)</td><td>Thực hiện kiểm tra phần cứng POST (Power-On Self-Test), đọc bảng phân vùng GPT/MBR và khởi chạy file thực thi EFI bootloader tại <code>/boot/efi/EFI/</code>.</td></tr><tr><td><strong>2. Bootloader</strong></td><td>GRUB2 (Grand Unified Bootloader)</td><td>Hiển thị menu chọn kernel, nạp file nén nhị phân kernel (<code>vmlinuz</code>) và tệp ổ đĩa RAM ảo (<code>initrd.img</code>) vào bộ nhớ RAM, sau đó trao quyền điều khiển cho Kernel.</td></tr><tr><td><strong>3. Kernel Init</strong></td><td>Linux Kernel (vmlinuz)</td><td>Tự giải nén, thiết lập bảng phân trang bộ nhớ, phát hiện CPU, khởi tạo bộ ngắt ngắt (interrupts) và chạy luồng khởi động đầu tiên.</td></tr><tr><td><strong>4. Initramfs</strong></td><td>initramfs cpio archive</td><td>Hệ thống file tạm thời trên RAM. Cung cấp các module hạt nhân (driver SCSI, NVMe, LVM, multipath) để nhận diện và gắn kết (mount) phân vùng gốc thực sự (<code>/</code>).</td></tr><tr><td><strong>5. User Space</strong></td><td>systemd (PID 1)</td><td>Kernel gọi lệnh <code>switch_root</code> chuyển sang rootfs thực, giải phóng initramfs và thực thi tiến trình người dùng đầu tiên <code>/sbin/init</code> (symlink tới systemd).</td></tr></tbody></table></div>"
        },
        {
          "id": "sec-initramfs-anatomy",
          "title": "2. Giải phẫu tệp Initramfs & Lệnh switch_root",
          "content": "<p>Tệp <code>/boot/initrd.img-$(uname -r)</code> thực chất là một kho lưu trữ nén dạng cpio. Ta có thể giải nén để xem cấu trúc bên trong:</p><pre><code># Tạo thư mục tạm và giải nén xem nội dung initramfs:\nmkdir /tmp/initramfs-inspect && cd /tmp/initramfs-inspect\nlsinitramfs /boot/initrd.img-$(uname -r) | grep -E '(lvm|ext4|nvme)' | head -n 10</code></pre><p><strong>Quy trình switch_root:</strong> Khi script <code>/init</code> trong initramfs hoàn tất việc mở khóa mã hóa đĩa và tìm thấy phân vùng root tại <code>/dev/mapper/vg-root</code>, nó mount phân vùng này vào thư mục <code>/sysroot</code>, sau đó chạy lệnh nguyên tử:</p><pre><code>exec switch_root /sysroot /lib/systemd/systemd</code></pre><p>Lệnh này giải phóng toàn bộ bộ nhớ RAM của initramfs, đổi gốc <code>/</code> sang <code>/sysroot</code> và biến systemd thành PID 1 duy nhất của hệ thống.</p>"
        },
        {
          "id": "sec-boot-troubleshooting",
          "title": "3. Kỹ năng Cứu hộ Máy chủ khi Bootloader hoặc fstab Hỏng",
          "content": "<p>Khi máy chủ không khởi động được bình thường, kỹ sư cần can thiệp tại menu GRUB:</p><ul><li>Nhấn phím <code>e</code> tại màn hình menu GRUB để chỉnh sửa dòng tham số kernel tạm thời.</li><li>Thêm tham số <code>init=/bin/bash</code> vào cuối dòng bắt đầu bằng <code>linux /vmlinuz...</code> để ra lệnh kernel bỏ qua systemd và đưa thẳng vào Shell Root khẩn cấp.</li><li>Khởi động bằng tổ hợp phím <code>Ctrl + X</code> hoặc <code>F10</code>.</li></ul><div class=\"callout-box warning-box\"><div class=\"callout-title\">⚠️ Remount Root phân vùng đọc-ghi trong chế độ cứu hộ</div><p>Khi rơi vào Emergency Shell hoặc init=/bin/bash, phân vùng gốc <code>/</code> mặc định được mount ở chế độ chỉ đọc (Read-Only) để bảo vệ dữ liệu. Muốn sửa lại file cấu hình lỗi (như fstab), bắt buộc phải gõ lệnh:</p><pre><code>mount -o remount,rw /</code></pre></div>"
        }
      ],
      "scenarios": [
        {
          "title": "Tình huống: Nâng cấp Kernel xong máy chủ Cloud bị 'Kernel Panic - not syncing: VFS: Unable to mount root fs'",
          "problem": "Sau khi cập nhật gói hạt nhân mới bằng apt hoặc yum, reboot máy chủ bị treo ở màn hình đen với lỗi Kernel Panic không mount được root fs.",
          "solution": "Nguyên nhân là do quá trình tạo initramfs (update-initramfs / dracut) bị gián đoạn (thường do đầy ổ đĩa /boot). Cách xử lý: Tại menu GRUB, chọn mục 'Advanced options for Ubuntu/Debian', chọn khởi động bằng phiên bản Kernel cũ còn hoạt động tốt. Sau khi vào được hệ thống, dọn dẹp các kernel cũ đầy ổ /boot và chạy lại lệnh <code>sudo update-initramfs -u -k all</code>."
        }
      ],
      "commonMistakes": [
        "Tự ý xóa các tệp /boot/vmlinuz-* và /boot/initrd.img-* bằng tay khi thấy ổ đĩa /boot đầy. Điều này sẽ khiến máy chủ không thể khởi động lại. Luôn dọn dẹp kernel cũ thông qua trình quản lý gói (apt autoremove hoặc dnf remove --oldinstallnodes)."
      ],
      "exercises": [
        {
          "question": "Làm thế nào để đo lường chính xác thời gian khởi động của từng tầng (Firmware, Loader, Kernel, User Space) và xác định service nào làm chậm quá trình boot?",
          "command": "systemd-analyze\nsystemd-analyze blame\nsystemd-analyze critical-chain",
          "explanation": "systemd-analyze in ra biểu đồ thời gian khởi động từng giai đoạn. systemd-analyze blame liệt kê chi tiết các service theo thứ tự tiêu tốn thời gian từ cao xuống thấp (ví dụ cloud-init, docker, network-wait-online)."
        }
      ],
      "summary": [
        "Quá trình boot là chuỗi chuyển giao quyền lực: UEFI -> GRUB2 -> Kernel -> Initramfs -> systemd PID 1.",
        "Initramfs đóng vai trò cầu nối sống còn, nạp driver ổ đĩa và mã hóa để mount phân vùng gốc thực tế.",
        "Nắm vững các tham số GRUB (init=/bin/bash, systemd.unit=emergency.target) là kỹ năng cứu sinh khi máy chủ từ xa gặp sự cố không thể boot."
      ]
    },
    {
      "id": "lx-4-03",
      "number": "4.3",
      "title": "Quản lý Tiến trình Nội bộ, Luồng & Bộ lập lịch CPU (CFS / EEVDF Scheduler)",
      "subtitle": "Giải mã task_struct, khác biệt Process vs Thread và thuật toán điều phối thời gian thực thi",
      "level": "Cực kỳ chuyên sâu",
      "duration": "75 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Hiểu cấu trúc dữ liệu trung tâm task_struct trong nhân Linux đại diện cho tiến trình và luồng.",
        "Nắm vững bản chất: Trong nhân Linux không có khái niệm Thread độc lập, mà chỉ có các Task chia sẻ chung không gian bộ nhớ qua cờ clone().",
        "Giải mã thuật toán bộ lập lịch CFS (Completely Fair Scheduler) với cây đỏ đen (Red-Black Tree) và biến vruntime, cùng bộ lập lịch thế hệ mới EEVDF (Earliest Eligible Virtual Deadline First) từ Linux 6.6+.",
        "Phân tích nguyên nhân và đo lường chi phí của Chuyển đổi ngữ cảnh (Context Switching: Voluntary vs Involuntary)."
      ],
      "intuition": {
        "title": "Bàn cờ vua và đồng hồ bấm giờ luân phiên",
        "metaphor": "Hãy tưởng tượng CPU như một đại kiện tướng cờ vua thi đấu đồng thời với 100 đấu thủ (các tiến trình). Thay vì chơi hết một ván với từng người, đại kiện tướng đi mỗi bàn một nước trong 2 giây rồi bước sang bàn kế tiếp. Đồng hồ của đại kiện tướng có một kim đặc biệt gọi là vruntime (thời gian ảo đã chạy). Đấu thủ nào ngồi đợi lâu nhất và có vruntime nhỏ nhất sẽ được đại kiện tướng đến chơi tiếp theo (CFS). Mỗi lần đổi bàn đấu, đại kiện tướng phải nhớ lại thế cờ của bàn đó và quên bàn trước đi (Context Switch). Nếu phải đổi bàn quá nhanh (hàng chục nghìn lần mỗi giây), đại kiện tướng chỉ tốn thời gian chạy qua chạy lại giữa các bàn mà không đi được nước cờ nào ra hồn (CPU Trashing do nghẽn Context Switch).",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🧬</span>\n                    <span>PROCESS vs THREAD</span>\n                    <span class=\"lx-vs-tag\">task_struct</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Không có thread riêng:</strong> Mọi luồng trong Linux thực chất chỉ là một <code>task_struct</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>clone():</strong> Luồng chia sẻ chung <code>CLONE_VM</code>, <code>CLONE_FILES</code>, <code>CLONE_FS</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>PID vs TGID:</strong> Mỗi thread có PID (TID) riêng; cùng tiến trình chia sẻ chung TGID.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚖️</span>\n                    <span>CFS &amp; EEVDF</span>\n                    <span class=\"lx-vs-tag\">CPU Scheduler</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>CFS:</strong> Sắp xếp task trên Cây Đỏ Đen; task có <code>vruntime</code> nhỏ nhất được chạy tiếp.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>EEVDF (Linux 6.6+):</strong> Bổ sung hạn mức deadline ảo, tối ưu triệt để độ trễ.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Context Switch:</strong> Đo bằng <code>pidstat -w</code>; quá nhiều CS làm sụp đổ CPU Cache.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-task-struct",
          "title": "1. Cấu trúc Cốt lõi task_struct và Bản chất Process vs Thread",
          "content": "<p>Mọi tiến trình và luồng trong Linux đều được đại diện bởi một cấu trúc C khổng lồ trong mã nguồn kernel tên là <code>struct task_struct</code> (chứa hàng trăm trường thông tin: PID, state, mm_struct bộ nhớ, files_struct mô tả tệp mở, signal_struct...).</p><p><strong>Bản chất Thread trong Linux:</strong> Linux không có cấu trúc dữ liệu 'luồng' riêng biệt. Luồng chỉ là một <code>task_struct</code> được tạo ra bằng lời gọi hệ thống <code>clone()</code> kèm theo các cờ chia sẻ tài nguyên:</p><pre><code>clone(CLONE_VM | CLONE_FS | CLONE_FILES | CLONE_SIGHAND, ...);</code></pre><ul><li><code>PID (Process ID)</code>: Trong kernel, mỗi task (kể cả thread) đều có một PID riêng biệt (còn gọi là TID - Thread ID).</li><li><code>TGID (Thread Group ID)</code>: Tất cả các luồng trong cùng một tiến trình chia sẻ chung một TGID. Khi bạn dùng lệnh <code>ps</code> hoặc <code>top</code>, con số bạn nhìn thấy là <strong>TGID</strong>.</li></ul>"
        },
        {
          "id": "sec-cfs-eevdf",
          "title": "2. Bộ Lập Lịch CFS và Thế Hệ Mới EEVDF",
          "content": "<p>Linux sử dụng bộ lập lịch cho các tác vụ thông thường (SCHED_NORMAL / SCHED_OTHER):</p><ul><li><strong>CFS (Completely Fair Scheduler):</strong> Quản lý các task bằng cấu trúc Cây Đỏ Đen (Red-Black Tree). Mỗi task có một biến <code>vruntime</code> (thời gian ảo đã chạy). Task nào có vruntime nhỏ nhất (nằm ở nhánh ngoài cùng bên trái của cây) sẽ được cấp phát CPU tiếp theo. Giá trị Nice (-20 đến +19) điều chỉnh trọng số: Nice càng thấp (ưu tiên cao), vruntime tăng càng chậm, do đó được chạy nhiều hơn.</li><li><strong>EEVDF (Earliest Eligible Virtual Deadline First):</strong> Thay thế CFS từ Linux Kernel 6.6. EEVDF bổ sung khái niệm <em>Lag</em> và <em>Virtual Deadline</em>, giải quyết triệt để nhược điểm của CFS trong việc ưu tiên các tác vụ đòi hỏi độ trễ cực thấp (như xử lý âm thanh thời gian thực hoặc network packet processing).</li></ul>"
        },
        {
          "id": "sec-context-switch",
          "title": "3. Chuyển đổi Ngữ cảnh: Voluntary vs Involuntary",
          "content": "<p>Khi CPU chuyển từ thực thi task A sang task B, Kernel phải thực hiện Context Switch:</p><ul><li><code>Voluntary Context Switch (Tự nguyện):</code> Xảy ra khi task tự chủ động nhường CPU vì đang phải chờ một sự kiện I/O (chờ đọc đĩa, chờ nhận gói tin socket mạng, gọi <code>sleep()</code>).</li><li><code>Involuntary Context Switch (Bắt buộc):</code> Xảy ra khi task đã chạy hết khoảng thời gian được cấp (time slice) hoặc bị một task khác có độ ưu tiên cao hơn cướp quyền (preemption).</li></ul><p><strong>Đo lường Context Switch của tiến trình:</strong></p><pre><code># Đo số lần context switch mỗi giây của tiến trình (ví dụ PID 1234):\npidstat -w -p 1234 1 5</code></pre><p>Nếu cột <code>nonvcltw/s</code> (involuntary) tăng vọt lên hàng nghìn, chứng tỏ hệ thống đang bị tranh chấp CPU gay gắt giữa quá nhiều luồng (Thread contention).</p>"
        }
      ],
      "scenarios": [
        {
          "title": "Tình huống: Ứng dụng tạo quá nhiều Thread dẫn tới sụp đổ hiệu năng",
          "problem": "Một ứng dụng backend tạo 2.000 thread đồng thời. Mặc dù CPU 100%, nhưng tốc độ xử lý request lại chậm đi gấp 10 lần so với khi chỉ chạy 16 worker.",
          "solution": "Dùng <code>vmstat 1</code> quan sát cột <code>cs</code> (context switches). Khi số cs chạm ngưỡng hàng trăm nghìn lần/giây, phần lớn thời gian CPU bị lãng phí cho việc lưu trữ/khôi phục thanh ghi và xóa sạch bộ nhớ đệm CPU Cache (L1/L2/L3 cache misses & TLB flushing). Khắc phục bằng cách áp dụng Thread Pool với số lượng worker tương đương số nhân CPU vật lý kết hợp kiến trúc bất đồng bộ (Async I/O / Event Loop)."
        }
      ],
      "commonMistakes": [
        "Lầm tưởng đặt độ ưu tiên Nice = -20 sẽ giúp chương trình luôn luôn chạy nhanh gấp nhiều lần. Nice chỉ có tác dụng khi CPU bị bão hòa (100% load); nếu máy chủ đang rảnh rỗi tài nguyên, tiến trình có Nice = 0 hay -20 đều chạy với tốc độ như nhau."
      ],
      "exercises": [
        {
          "question": "Làm thế nào để ghim cố định một tiến trình hoặc luồng vào một nhân CPU cụ thể (CPU Affinity) nhằm tránh bị chuyển nhân gây mất cache?",
          "command": "# Ghim tiến trình PID 4321 vào CPU core 2 và 3:\ntaskset -cp 2,3 4321\n# Chạy ứng dụng mới ghim vào core 0:\ntaskset -c 0 python3 heavy_computation.py",
          "explanation": "taskset can thiệp vào mặt nạ CPU affinity (sched_setaffinity syscall) của tiến trình, đảm bảo bộ lập lịch không bao giờ di chuyển task sang các core khác, tối ưu hóa triệt để CPU L1/L2 Cache hit."
        }
      ],
      "summary": [
        "Linux quản lý mọi luồng và tiến trình bằng cấu trúc chung task_struct; luồng chỉ là task chia sẻ chung bộ nhớ ảo.",
        "Bộ lập lịch CFS và EEVDF dùng vruntime và độ trễ ảo để phân bổ thời gian CPU công bằng và tối ưu.",
        "Context switch quá cao là kẻ thù số một của hiệu năng máy chủ vi dịch vụ; cần kiểm soát số lượng luồng qua Thread Pool."
      ]
    },
    {
      "id": "lx-4-04",
      "number": "4.4",
      "title": "Quản lý Bộ nhớ Nội bộ: Bộ nhớ ảo, Paging, Page Cache, Swap & Cơ chế OOM Killer",
      "subtitle": "Bản chất ánh xạ bộ nhớ ảo sang vật lý, Page Fault và cách giải cứu tiến trình trước họng súng OOM",
      "level": "Cực kỳ chuyên sâu",
      "duration": "80 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Hiểu kiến trúc Bộ nhớ Ảo (Virtual Memory): MMU phần cứng, Bảng phân trang nhiều cấp (4-level/5-level Page Tables) và Translation Lookaside Buffer (TLB).",
        "Phân biệt rạch ròi Minor Page Fault (trang đã nạp sẵn trong RAM) và Major Page Fault (phải đọc đĩa/swap tốn kém).",
        "Giải mã cơ chế 'Bộ nhớ đệm Trang' (Page Cache) và chính sách ghi lại (Writeback) giúp giải thích tại sao Linux luôn sử dụng gần 100% RAM.",
        "Nắm vững giải thuật tính điểm OOM Score và tinh chỉnh bảo vệ các tiến trình sống còn (Database/Nginx) khỏi bị nhân viên OOM Killer tiêu diệt."
      ],
      "intuition": {
        "title": "Cuốn sách bìa ảo và người thủ thư có siêu năng lực",
        "metaphor": "Mỗi chương trình chạy trên Linux đều được Kernel cấp cho một 'cuốn sách ảo' dày hàng nghìn trang (không gian địa chỉ ảo 128TB trên 64-bit), và chương trình đinh ninh rằng mình độc chiếm toàn bộ thế giới RAM. Thực tế, khi chương trình mới mở sách, các trang đều đang trắng tinh. Người thủ thư (MMU & Kernel) đứng bên cạnh. Khi chương trình chỉ bút vào trang số 45 muốn đọc (Page Fault), thủ thư lập tức lấy một tờ giấy thực tế từ ngăn kéo hữu hạn (RAM vật lý), chép dữ liệu từ kho đĩa cứng vào tờ giấy đó rồi kẹp vào trang 45 (Ánh xạ Page Table). Nếu ngăn kéo hết giấy, thủ thư sẽ gom các tờ giấy ít đọc nhất bỏ vào hòm khóa (Swap) hoặc vứt bỏ các trang đã lưu trên đĩa (Page Cache Reclamation). Nếu hết sạch mọi cách mà khách hàng vẫn đòi thêm giấy điên cuồng, một bảo vệ cầm súng (OOM Killer) sẽ bắn ngay vị khách gây náo loạn nhất để cứu thư viện khỏi sập.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📖</span>\n                    <span>BỘ NHỚ ẢO &amp; PAGING</span>\n                    <span class=\"lx-vs-tag\">Page Fault</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Page 4KB:</strong> Bảng phân trang nhiều cấp ánh xạ Virtual Address sang Physical Frame.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Minor Page Fault:</strong> Dữ liệu đã sẵn có trong RAM, cấp phát tức thời trong vài nano-giây.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Major Page Fault:</strong> Bắt buộc phải đọc từ đĩa hoặc Swap, tốn hàng mili-giây gây nghẽn.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🛡️</span>\n                    <span>PAGE CACHE &amp; OOM</span>\n                    <span class=\"lx-vs-tag\">Tối ưu RAM</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Page Cache:</strong> Kernel tận dụng RAM nhàn rỗi đệm file từ đĩa, thu hồi tức thì khi cần.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>OOM Score:</strong> Khi RAM cạn kiệt, OOM Killer gửi SIGKILL bắn tiến trình điểm cao nhất.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bảo vệ dịch vụ:</strong> Đặt <code>oom_score_adj = -1000</code> để bảo vệ an toàn cho DB / Nginx.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-virtual-memory",
          "title": "1. Bộ Nhớ Ảo, Phân Trang (Paging) & Cơ chế Page Fault",
          "content": "<p>Linux chia bộ nhớ thành các khối cố định gọi là <strong>Trang (Page)</strong>, kích thước mặc định là <strong>4 KB</strong> (trên kiến trúc x86-64 còn hỗ trợ HugePages 2 MB hoặc 1 GB).</p><ul><li><strong>Bảng phân trang (Page Table):</strong> Bảng ánh xạ địa chỉ ảo (Virtual Address) sang địa chỉ vật lý (Physical Address). Bộ điều khiển bộ nhớ phần cứng (MMU) dùng bộ nhớ đệm TLB để tăng tốc độ tra cứu bảng này.</li><li><strong>Minor Page Fault:</strong> Xảy ra khi địa chỉ ảo hợp lệ và dữ liệu thực tế đã nằm trong RAM (ví dụ một tiến trình khác đã nạp thư viện chia sẻ đó, hoặc trang vừa được cấp phát nhưng chưa gán frame vật lý). Xử lý cực nhanh trong vài nano-giây.</li><li><strong>Major Page Fault:</strong> Xảy ra khi dữ liệu bắt buộc phải được đọc từ ổ đĩa cứng (HDD/SSD) hoặc phân vùng Swap vào RAM. Tốn hàng micro-giây đến mili-giây, là thủ phạm chính gây tụt giảm hiệu năng nghiêm trọng.</li></ul>"
        },
        {
          "id": "sec-page-cache-swap",
          "title": "2. Sự Thật Về Page Cache & Tinh Chỉnh Swappiness",
          "content": "<p>Nhiều người mới dùng Linux hoảng hốt khi thấy lệnh <code>free -m</code> báo chỉ còn vài trăm MB trống (free), mặc dù không có ứng dụng nặng nào chạy. Đây là triết lý thiết kế tối ưu của Linux:</p><blockquote>'Bộ nhớ RAM để trống là bộ nhớ RAM bị lãng phí.'</blockquote><p>Kernel tự động dùng toàn bộ dung lượng RAM còn nhàn rỗi để làm <strong>Page Cache</strong> (lưu nội dung các file vừa đọc/ghi từ đĩa). Khi ứng dụng cần thêm RAM, Kernel sẽ tức khắc giải phóng phần Page Cache này trong chớp mắt mà không gây chậm trễ.</p><p><strong>Tham số vm.swappiness (0 - 100):</strong> Xác định mức độ ưu tiên của Kernel giữa việc giải phóng Page Cache hay đẩy dữ liệu của tiến trình vào Swap. Với các máy chủ cơ sở dữ liệu hoặc container, nên đặt giá trị thấp (ví dụ <code>vm.swappiness = 10</code>) để hạn chế swap các vùng nhớ quan trọng.</p>"
        },
        {
          "id": "sec-oom-killer",
          "title": "3. Giải mã OOM Killer và Tinh chỉnh Bảo vệ Tiến trình",
          "content": "<p>Khi bộ nhớ RAM vật lý và Swap đều cạn kiệt hoàn toàn, nhân Linux kích hoạt cơ chế <strong>Out-Of-Memory (OOM) Killer</strong> để giải cứu hệ thống khỏi bị treo cứng phần cứng.</p><p>Kernel duyệt qua toàn bộ tiến trình và tính điểm <code>oom_score</code> (dựa trên tỷ lệ RAM đang chiếm giữ và thời gian hoạt động). Tiến trình có điểm cao nhất sẽ bị nhận tín hiệu <code>SIGKILL (9)</code> ngay lập tức.</p><p><strong>Cách bảo vệ tiến trình tối quan trọng (như Nginx, PostgreSQL, Redis) không bao giờ bị OOM bắn:</strong></p><pre><code># Đọc điểm OOM hiện tại của tiến trình PID 1050:\ncat /proc/1050/oom_score\n\n# Thiết lập điểm điều chỉnh oom_score_adj về -1000 (miễn nhiễm tuyệt đối):\necho -1000 | sudo tee /proc/1050/oom_score_adj</code></pre><div class=\"callout-box danger-box\"><div class=\"callout-title\">🚨 CẢNH BÁO: Tắt Overcommit Memory bừa bãi</div><p>Một số người cấu hình <code>vm.overcommit_memory = 2</code> (nghiêm cấm cấp phát vượt mức RAM). Điều này có thể khiến lệnh <code>fork()</code> của các tiến trình lớn (như Redis background snapshot hoặc Python multiprocessing) lập tức thất bại với lỗi <em>Cannot allocate memory</em> mặc dù hệ thống thực tế vẫn còn dư RAM!</p><div class=\"lx-safe-alternative\"><strong>Khuyến nghị an toàn:</strong> Giữ nguyên mặc định <code>vm.overcommit_memory = 0</code> (heuristic) hoặc <code>1</code> đối với các máy chủ chuyên dụng chạy Redis / Database.</div></div>"
        }
      ],
      "scenarios": [
        {
          "title": "Tình huống: Database PostgreSQL đột ngột biến mất không để lại log lỗi",
          "problem": "Dịch vụ database PostgreSQL đang phục vụ thì bị sập đột ngột. Kiểm tra file log của postgres không thấy bất kỳ lỗi crash nào.",
          "solution": "Khi OOM Killer ra tay, nó gửi trực tiếp tín hiệu SIGKILL từ Kernel Space vào tiến trình, do đó ứng dụng không kịp bẫy exception hay ghi log. Cách điều tra: chạy lệnh <code>sudo dmesg -T | grep -i -E '(killed process|oom_reaper)'</code>. Bạn sẽ thấy log chi tiết của Kernel chỉ rõ thời điểm, lượng RAM và PID bị bắn kèm bảng thông số bộ nhớ tại thời khắc đó."
        }
      ],
      "commonMistakes": [
        "Chạy lệnh 'echo 3 > /proc/sys/vm/drop_caches' định kỳ qua Cron để dọn RAM. Đây là hành động sai lầm nghiêm trọng! Việc này xóa sạch Page Cache khiến ổ đĩa phải chịu tải đọc I/O khổng lồ ngay sau đó, làm toàn bộ hệ thống bị đơ lag."
      ],
      "exercises": [
        {
          "question": "Làm thế nào để xem chi tiết mức tiêu thụ RAM thực tế của một tiến trình bao gồm VSS (Virtual), RSS (Resident Set Size), PSS (Proportional Set Size) và USS (Unique Set Size)?",
          "command": "# Đọc file smaps_rollup trong thư mục /proc:\nsudo cat /proc/<PID>/smaps_rollup",
          "explanation": "smaps_rollup cung cấp chỉ số PSS (RAM thực tế chia đều các thư viện dùng chung) và USS (RAM chỉ riêng tiến trình này sở hữu). Đây là con số chính xác nhất để phát hiện memory leak thay vì chỉ nhìn vào VSZ trong ps."
        }
      ],
      "summary": [
        "Địa chỉ bộ nhớ trong User Space là địa chỉ ảo, được phần cứng MMU chuyển thành địa chỉ vật lý qua Page Tables.",
        "RAM được tận dụng triệt để làm Page Cache; hệ thống chỉ thực sự thiếu bộ nhớ khi Major Page Faults và Swap IO tăng cao liên tục.",
        "OOM Killer là chốt chặn cuối cùng bảo vệ Kernel; có thể điều chỉnh oom_score_adj (-1000 đến 1000) để bảo vệ các dịch vụ cốt lõi."
      ]
    },
    {
      "id": "lx-4-05",
      "number": "4.5",
      "title": "VFS (Virtual File System), Cấu trúc Inode/Dentry, Cơ chế Page I/O & Bộ đệm Ghi",
      "subtitle": "Khám phá tầng trừu tượng hóa hệ thống tập tin, Dirty Pages và chu trình ghi dữ liệu xuống đĩa cứng",
      "level": "Cực kỳ chuyên sâu",
      "duration": "75 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Hiểu kiến trúc lớp VFS (Virtual File System Switch) cho phép Linux tương thích liền mạch với hàng chục filesystem khác nhau (ext4, xfs, btrfs, nfs, procfs).",
        "Nắm vững 4 cấu trúc đối tượng cốt lõi của VFS: Superblock, Inode, Dentry (Directory Entry) và File Object.",
        "Giải mã chu trình ghi dữ liệu bất đồng bộ qua Bộ đệm Trang: Dirty Pages, tiến trình flush hạt nhân (kworker) và các lệnh đồng bộ sync, fsync, fdatasync.",
        "Hiểu vai trò của Tầng Khối (Block Layer) và các thuật toán lập lịch I/O (None, MQ-Deadline, BFQ, Kyber)."
      ],
      "intuition": {
        "title": "Người phiên dịch tài ba và khay đựng thư chưa gửi",
        "metaphor": "VFS giống như một đại sứ quán toàn cầu có thể giao dịch với đại biểu đến từ mọi quốc gia (ext4, xfs, nfs, btrfs) thông qua một ngôn ngữ ngoại giao duy nhất (open, read, write). Khi bạn viết một lá thư (ghi file), bạn không tự chạy ra bưu điện gửi ngay lập tức vì quá tốn công. Bạn chỉ thả lá thư vào 'khay thư đi' trên bàn làm việc (Dirty Pages trong Page Cache) và tiếp tục làm việc khác. Lệnh write() lập tức báo 'đã ghi thành công' chỉ trong vài micro-giây! Định kỳ, một nhân viên bưu tá chuyên trách (tiến trình nhân kworker) sẽ gom toàn bộ thư trong khay mang ra xe bưu chính chở đi (Flushing xuống đĩa). Nhưng hãy cẩn thận: nếu sét đánh mất điện đột ngột trước khi bưu tá đến gom, các lá thư nằm trong khay chưa kịp gửi sẽ vĩnh viễn biến mất, trừ phi bạn đã đóng dấu niêm phong bảo đảm khẩn cấp (hàm fsync).",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🗂️</span>\n                    <span>4 ĐỐI TƯỢNG VFS</span>\n                    <span class=\"lx-vs-tag\">Virtual FS</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Superblock:</strong> Quản trị filesystem đã mount (kích thước block, trạng thái).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Inode:</strong> Đại diện file/thư mục vật lý (metadata, permissions; KHÔNG chứa tên file).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Dentry:</strong> Cầu nối tên file với Inode, được lưu đệm trong RAM (dcache).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>File:</strong> Con trỏ đại diện file đang mở (offset f_pos, flags).</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>💾</span>\n                    <span>DIRTY PAGES</span>\n                    <span class=\"lx-vs-tag\">Writeback &amp; fsync</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>write():</strong> Chỉ ghi vào Page Cache (Dirty Pages) và báo thành công ngay.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>kworker/flush:</strong> Luồng nhân âm thầm xả đĩa theo <code>vm.dirty_background_ratio</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>fsync() / fdatasync():</strong> Ép xả dữ liệu xuống phiến đĩa vật lý bảo đảm ACID.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-vfs-architecture",
          "title": "1. Bốn Cấu Trúc Đối Tượng Cơ Bản của VFS",
          "content": "<p>VFS là một tầng trừu tượng hóa hướng đối tượng viết bằng ngôn ngữ C trong Kernel Linux:</p><ul><li><code>struct super_block</code>: Đại diện cho một hệ thống file đã được mount (chứa kích thước block, cờ trạng thái, con trỏ tới inode gốc).</li><li><code>struct inode</code>: Đại diện cho một tập tin hoặc thư mục vật lý cụ thể (chứa metadata: quyền hạn, kích thước, thời gian tạo, con trỏ trỏ tới các khối dữ liệu trên đĩa). Inode KHÔNG chứa tên file!</li><li><code>struct dentry (Directory Entry)</code>: Cầu nối gắn kết tên file (chuỗi ký tự) với Inode tương ứng. Dentry được lưu trong bộ đệm RAM nhanh gọi là <strong>dentry_cache (dcache)</strong> giúp tăng tốc độ tìm kiếm đường dẫn thư mục mà không cần quét đĩa.</li><li><code>struct file</code>: Đại diện cho một file đang được mở bởi một tiến trình (chứa offset vị trí đọc/ghi hiện tại <code>f_pos</code>, cờ truy cập <code>f_flags</code>).</li></ul>"
        },
        {
          "id": "sec-dirty-pages-flush",
          "title": "2. Cơ Chế Dirty Pages và Tiến Trình Ghi Đĩa kworker",
          "content": "<p>Khi một tiến trình gọi hàm <code>write()</code>, Kernel chỉ ghi dữ liệu vào các Page Cache trong RAM và đánh dấu trang đó là <strong>Dirty (bẩn)</strong>. Quá trình xả dữ liệu xuống đĩa (Flush/Writeback) được đảm nhiệm ngầm bởi các luồng hạt nhân <code>kworker/flush</code>.</p><p><strong>Các tham số tinh chỉnh xả đĩa trong sysctl:</strong></p><div class=\"lx-table-responsive\"><table class=\"lx-table\"><thead><tr><th>Tham số sysctl</th><th>Giá trị mặc định</th><th>Ý nghĩa</th></tr></thead><tbody><tr><td><code>vm.dirty_background_ratio</code></td><td>10 (%)</td><td>Khi dung lượng Dirty Pages đạt 10% bộ nhớ khả dụng, luồng kworker bắt đầu âm thầm ghi dữ liệu xuống đĩa ở chế độ nền.</td></tr><tr><td><code>vm.dirty_ratio</code></td><td>20 (%)</td><td>Nếu tốc độ ghi đĩa quá chậm khiến Dirty Pages chạm trần 20%, Kernel sẽ ép chính tiến trình đang gọi write() phải dừng lại để hỗ trợ xả đĩa (gây nghẽn ứng dụng).</td></tr><tr><td><code>vm.dirty_expire_centisecs</code></td><td>3000 (30 giây)</td><td>Dữ liệu bẩn tồn tại quá 30 giây bắt buộc phải được xả xuống đĩa để tránh nguy cơ mất mát khi mất điện.</td></tr></tbody></table></div>"
        },
        {
          "id": "sec-fsync-vs-sync",
          "title": "3. Sự Khác Biệt Giữa write(), fsync(), fdatasync() và O_DIRECT",
          "content": "<p>Trong phát triển cơ sở dữ liệu (MySQL, PostgreSQL, SQLite, Redis AOF), việc đảm bảo tính bền vững (Durability trong ACID) phụ thuộc hoàn toàn vào các hàm này:</p><ul><li><code>write()</code>: Chỉ ghi vào Page Cache. Tốc độ cao nhất, an toàn thấp nhất.</li><li><code>fdatasync(fd)</code>: Ép xả toàn bộ dữ liệu của file xuống đĩa, bỏ qua cập nhật metadata thời gian (mtime) nếu không cần thiết. Tối ưu hơn fsync.</li><li><code>fsync(fd)</code>: Ép xả cả dữ liệu lẫn toàn bộ metadata của file xuống bộ nhớ không khả biến của ổ cứng. Tiến trình bị chặn (blocking) cho tới khi ổ đĩa xác nhận đã hoàn tất.</li><li><code>Cờ O_DIRECT khi mở file:</code> Bỏ qua hoàn toàn tầng Page Cache của Kernel, đọc/ghi trực tiếp từ bộ đệm của ứng dụng xuống Block Device (thường dùng trong DBMS để tự quản lý cache riêng).</li></ul>"
        }
      ],
      "scenarios": [
        {
          "title": "Tình huống: Máy chủ bị đơ (I/O Freeze) 10-15 giây khi ghi file dung lượng lớn",
          "problem": "Khi chạy một tác vụ ghi file backup lớn (10 GB) hoặc xuất file zip khổng lồ, toàn bộ website Nginx và Database chạy cùng máy bị khựng lại, không phản hồi trong khoảng 15 giây.",
          "solution": "Nguyên nhân do <code>vm.dirty_ratio</code> tính theo phần trăm RAM. Trên máy chủ có 64 GB RAM, 20% là 12.8 GB! Khi xả một lượng dữ liệu bẩn khổng lồ 12.8 GB xuống đĩa HDD/SATA SSD cùng một lúc, hàng đợi I/O bị bão hòa hoàn toàn. Khắc phục bằng cách cấu hình xả đĩa theo dung lượng tuyệt đối cố định thay vì tỷ lệ phần trăm: <code>sudo sysctl -w vm.dirty_background_bytes=67108864</code> (64 MB) và <code>sudo sysctl -w vm.dirty_bytes=268435456</code> (256 MB)."
        }
      ],
      "commonMistakes": [
        "Lầm tưởng rút nguồn điện đột ngột trên ổ đĩa SSD hiện đại thì filesystem journal (ext4/xfs) sẽ luôn bảo vệ 100% dữ liệu ứng dụng. Journaling chỉ đảm bảo tính toàn vẹn của cấu trúc filesystem (không bị lỗi hỏng superblock/inode metadata), chứ không đảm bảo dữ liệu chưa fsync nằm trong Page Cache hoặc cache trên bo mạch SSD không bị biến mất."
      ],
      "exercises": [
        {
          "question": "Làm thế nào để kiểm tra ngay lập tức lượng bộ nhớ RAM hiện tại đang bị chiếm bởi Dirty Pages chưa kịp xả xuống đĩa?",
          "command": "cat /proc/meminfo | grep -i dirty",
          "explanation": "Cột 'Dirty' trong /proc/meminfo hiển thị chính xác số KB dữ liệu đang nằm chờ trong Page Cache chưa được đồng bộ xuống thiết bị lưu trữ vật lý."
        }
      ],
      "summary": [
        "VFS trừu tượng hóa mọi hệ thống file thông qua 4 thực thể: Superblock, Inode, Dentry và File struct.",
        "Lệnh write() chỉ ghi vào Page Cache; dữ liệu chỉ thực sự cập bến đĩa cứng an toàn khi được xả bởi kworker hoặc hàm fsync().",
        "Tinh chỉnh vm.dirty_bytes và dirty_background_bytes giúp ngăn ngừa hiện tượng nghẽn I/O đóng băng hệ thống khi ghi dữ liệu dung lượng lớn."
      ]
    },
    {
      "id": "lx-4-06",
      "number": "4.6",
      "title": "Hệ thống File Ảo /proc và /sys: Cửa sổ quan sát và can thiệp tham số hạt nhân (sysctl)",
      "subtitle": "Giải mã pseudo-filesystem, bóc tách tiến trình sống và tinh chỉnh kernel runtime không cần reboot",
      "level": "Cực kỳ chuyên sâu",
      "duration": "75 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Hiểu bản chất Pseudo-filesystem của /proc (procfs) và /sys (sysfs): Dữ liệu được sinh động trong RAM bởi Kernel khi có lệnh đọc, không hề chiếm dung lượng đĩa cứng.",
        "Làm chủ cấu trúc /proc/[PID]/: giải phẫu tiến trình sống qua cmdline, environ, fd/, maps, smaps, status và wchan.",
        "Nắm vững mô hình Kobject trong /sys/ và cách Kernel giao tiếp với thiết bị phần cứng, driver và Cgroups v2.",
        "Sử dụng sysctl để kiểm soát và tinh chỉnh các tham số hạt nhân (/proc/sys/) một cách an toàn và bền vững qua reboot."
      ],
      "intuition": {
        "title": "Bảng đồng hồ và các nút vặn trên buồng lái tàu ngầm",
        "metaphor": "Nhân Linux bên trong là một động cơ hạt nhân khổng lồ hoàn toàn vô hình. Để người điều khiển quan sát và tinh chỉnh mà không phải tháo rời động cơ ra (không phải biên dịch lại kernel hay khởi động lại máy), các kỹ sư tạo ra hai bảng đồng hồ ảo: /proc là màn hình telemetry thời gian thực hiển thị chỉ số nhịp tim của mọi cơ quan và hành khách (tiến trình); còn /sys là hệ thống các nút vặn và công tắc điện tử (sysfs/sysctl). Mỗi khi bạn gõ 'cat /proc/cpuinfo', nhân Linux không hề đọc ổ đĩa cứng mà tự mình thu thập trạng thái thanh ghi CPU tức thì và 'in' ra màn hình cho bạn xem như một file văn bản thông thường.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔍</span>\n                    <span>/proc/[PID]</span>\n                    <span class=\"lx-vs-tag\">Pháp y Tiến trình</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>/proc/[PID]/cmdline:</strong> Tham số khởi chạy ban đầu (phân tách bởi ký tự NUL).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>/proc/[PID]/fd/:</strong> Toàn bộ file descriptor đang mở (file, socket, pipe).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>/proc/[PID]/wchan:</strong> Tên hàm kernel mà tiến trình đang kẹt ngủ (D-state).</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Cứu file xóa nhầm:</strong> Phục hồi qua <code>cp /proc/[PID]/fd/X out</code>.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🎛️</span>\n                    <span>/sys &amp; SYSCTL</span>\n                    <span class=\"lx-vs-tag\">Runtime Tuning</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>/sys/block/, /sys/class/net/:</strong> Cây hướng đối tượng kobject quản trị phần cứng.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>/proc/sys/ -> sysctl:</strong> Cửa sổ can thiệp tham số hạt nhân lúc runtime.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Bền vững qua reboot:</strong> Lưu cấu hình vào <code>/etc/sysctl.d/99-custom.conf</code>.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-proc-pid-anatomy",
          "title": "1. Giải phẫu Tiến trình Sống qua Thư mục /proc/[PID]/",
          "content": "<p>Khi bạn cần điều tra một tiến trình đang chạy bí ẩn hoặc nghi ngờ mã độc, <code>/proc/[PID]/</code> là kho dữ liệu chính xác nhất:</p><div class=\"lx-table-responsive\"><table class=\"lx-table\"><thead><tr><th>Đường dẫn file</th><th>Ý nghĩa & Dữ liệu cung cấp</th><th>Ví dụ lệnh kiểm tra</th></tr></thead><tbody><tr><td><code>/proc/[PID]/cmdline</code></td><td>Toàn bộ lệnh và tham số dòng lệnh ban đầu dùng để khởi chạy tiến trình (phân tách bởi ký tự NUL \\0).</td><td><code>cat /proc/1234/cmdline | tr '\\0' ' '</code></td></tr><tr><td><code>/proc/[PID]/environ</code></td><td>Toàn bộ biến môi trường của tiến trình (kể cả API keys, Database passwords được nạp lúc chạy).</td><td><code>strings /proc/1234/environ</code></td></tr><tr><td><code>/proc/[PID]/exe</code></td><td>Symlink trỏ trực tiếp tới file nhị phân thực thi trên đĩa (cực kỳ hữu ích khi mã độc đổi tên tiến trình).</td><td><code>ls -l /proc/1234/exe</code></td></tr><tr><td><code>/proc/[PID]/fd/</code></td><td>Thư mục chứa symlink của toàn bộ file descriptor đang mở (tệp tin, socket mạng TCP/UDP, pipe).</td><td><code>ls -l /proc/1234/fd/</code></td></tr><tr><td><code>/proc/[PID]/wchan</code></td><td>Tên hàm trong kernel mà tiến trình đang bị chặn (blocking/sleeping) để chờ đợi.</td><td><code>cat /proc/1234/wchan</code></td></tr></tbody></table></div>"
        },
        {
          "id": "sec-sysfs-kobject",
          "title": "2. Cấu trúc /sys (sysfs) và Mô hình Kobject",
          "content": "<p>Được giới thiệu từ Linux 2.6, <code>/sys</code> cung cấp một cây phân cấp hướng đối tượng đại diện cho toàn bộ phần cứng, bus, driver và module của hệ thống:</p><ul><li><code>/sys/block/</code>: Danh sách các thiết bị lưu trữ dạng khối (sda, nvme0n1...) và hàng đợi I/O scheduler tương ứng.</li><li><code>/sys/class/net/</code>: Các card giao diện mạng (eth0, wlan0...) và thông số trạng thái vật lý (speed, duplex, MTU).</li><li><code>/sys/fs/cgroup/</code>: Điểm gắn kết của Cgroups v2 (điều khiển giới hạn tài nguyên CPU/RAM/IO).</li></ul>"
        },
        {
          "id": "sec-sysctl-tuning",
          "title": "3. Can thiệp Tham số Hạt nhân với sysctl",
          "content": "<p>Thư mục <code>/proc/sys/</code> cho phép thay đổi cấu hình kernel runtime. Mỗi tham số ánh xạ tương ứng giữa dấu chấm và dấu gạch chéo:</p><pre><code># /proc/sys/net/ipv4/ip_forward tương đương với: net.ipv4.ip_forward\n\n# Đọc giá trị hiện tại:\nsysctl net.ipv4.ip_forward\n\n# Bật tạm thời trong phiên làm việc:\nsudo sysctl -w net.ipv4.ip_forward=1\n# hoặc ghi trực tiếp vào /proc:\necho 1 | sudo tee /proc/sys/net/ipv4/ip_forward</code></pre><p><strong>Để cấu hình vĩnh viễn qua reboot:</strong> Lưu vào tệp <code>/etc/sysctl.d/99-custom.conf</code> và áp dụng ngay lập tức bằng lệnh:</p><pre><code>sudo sysctl -p /etc/sysctl.d/99-custom.conf</code></pre>"
        }
      ],
      "scenarios": [
        {
          "title": "Tình huống: Phục hồi một tệp tin vừa bị xóa nhầm nhưng vẫn đang được một tiến trình mở",
          "problem": "Một file log hoặc file cấu hình quan trọng dung lượng 500 MB bị ai đó lỡ gõ 'rm /var/log/app.log', nhưng ứng dụng backend Python vẫn đang tiếp tục ghi vào đó.",
          "solution": "Tìm PID của ứng dụng bằng <code>lsof | grep app.log</code> (ví dụ PID 2450, file descriptor số 4). Khi đó, dữ liệu trên đĩa vẫn được giữ nguyên nhờ con trỏ mở. Phục hồi ngay lập tức bằng cách sao chép từ file descriptor trong /proc: <code>cp /proc/2450/fd/4 /var/log/app.log.recovered</code>!"
        }
      ],
      "commonMistakes": [
        "Ghi trực tiếp vào các file trong /proc/sys/ mà không kiểm tra phạm vi giá trị hợp lệ. Nếu ghi nhầm giá trị ngoài giới hạn có thể dẫn tới lỗi Kernel Oops hoặc làm tê liệt card mạng."
      ],
      "exercises": [
        {
          "question": "Làm thế nào để tìm tất cả các tiến trình trên máy chủ đang ở trạng thái 'Uninterruptible Sleep' (D-state) và biết chính xác chúng đang chờ hàm kernel nào?",
          "command": "ps -eo pid,stat,wchan:25,cmd | grep ' D'",
          "explanation": "Cột stat có chữ 'D' thể hiện tiến trình đang ngủ sâu chờ I/O đĩa hoặc mạng. Cột wchan in ra tên hàm trong mã nguồn Linux kernel mà tiến trình đang kẹt (ví dụ: get_request, jbd2_journal_commit_transaction)."
        }
      ],
      "summary": [
        "/proc và /sys là các hệ thống file ảo trong RAM, là cánh cửa soi vào tâm trí và cấu trúc phần cứng của Linux.",
        "/proc/[PID] là công cụ điều tra sự cố và pháp y số (forensics) số một để bóc tách tiến trình sống.",
        "Mọi tham số tinh chỉnh kernel trong /proc/sys/ cần được cấu hình vào /etc/sysctl.d/ để bảo đảm tính bền vững qua reboot."
      ]
    },
    {
      "id": "lx-4-07",
      "number": "4.7",
      "title": "Ngăn xếp Mạng Kernel: Đường đi gói tin qua Netfilter, Socket Buffer & Tinh chỉnh TCP",
      "subtitle": "Hành trình từ xung điện trên card NIC đến socket ứng dụng và các tham số tối ưu thông lượng",
      "level": "Cực kỳ chuyên sâu",
      "duration": "80 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Hiểu trọn vẹn hành trình tiếp nhận gói tin (Packet Ingress): NIC -> DMA -> Ring Buffer -> Hard IRQ -> NAPI/SoftIRQ (ksoftirqd) -> sk_buff (Socket Buffer).",
        "Nắm vững 5 móc chặn Netfilter Hooks (PREROUTING, LOCAL_INPUT, FORWARD, LOCAL_OUTPUT, POSTROUTING) - nền tảng của iptables, nftables và Kubernetes kube-proxy.",
        "Giải mã cấu trúc hàng đợi Socket Listen Backlog: SYN Queue (nửa mở) vs Accept Queue (hoàn tất 3-way handshake).",
        "Làm chủ các tham số tinh chỉnh TCP hạt nhân nhằm chịu tải hàng triệu kết nối đồng thời (C10K / C1000K Problem)."
      ],
      "intuition": {
        "title": "Băng chuyền hành lý sân bay và trạm hải quan 5 cửa",
        "metaphor": "Gói tin mạng đến máy chủ giống như những kiện vali được dỡ từ máy bay xuống sân bay. Máy quét tia X đầu tiên (Card NIC) chuyển vali vào kho đệm tạm thời (Ring Buffer) qua đường hầm tự động (DMA). Một chiếc còi hú vang báo có hàng (Hard IRQ). Ngay lập tức, một đội công nhân chuyên trách (SoftIRQ / ksoftirqd) được điều đến bốc vali lên băng chuyền chính (sk_buff trong RAM). Trên đường băng chuyền di chuyển tới tay hành khách (ứng dụng Nginx/Python), kiện vali phải đi qua 5 cửa kiểm soát hải quan nghiêm ngặt (5 Netfilter Hooks). Nếu vi phạm luật (bị DROP/REJECT), vali bị ném vào lò thiêu. Nếu hợp lệ, vali được đưa vào sảnh đón (Socket Receive Queue). Khách hàng chỉ việc gọi hàm recv() để xách vali về nhà.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🌐</span>\n                    <span>INGRESS &amp; NAPI</span>\n                    <span class=\"lx-vs-tag\">Luồng gói tin</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>DMA -> Ring Buffer:</strong> Card NIC ghi thẳng gói tin vào RAM máy chủ.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>SoftIRQ / ksoftirqd:</strong> NAPI Polling bốc gói tin sang <code>sk_buff</code> tránh bão ngắt.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>5 Netfilter Hooks:</strong> PREROUTING -> LOCAL_IN -> FORWARD -> LOCAL_OUT -> POSTROUTING.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🚀</span>\n                    <span>BACKLOG &amp; TCP BBR</span>\n                    <span class=\"lx-vs-tag\">Thông lượng</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>SYN Queue vs Accept Queue:</strong> Tinh chỉnh <code>tcp_max_syn_backlog</code> và <code>somaxconn</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>SYN Cookies:</strong> Chống từ chối dịch vụ khi hàng đợi nửa mở bị tấn công tràn ngập.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>TCP BBR:</strong> Thuật toán chống nghẽn đo lường băng thông thực tế (Google BBR).</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-packet-ingress",
          "title": "1. Hành Trình Tiếp Nhận Gói Tin Tầng Vật Lý (Packet Ingress)",
          "content": "<p>Quy trình nhận gói tin siêu tốc của Kernel Linux:</p><ol><li><strong>Phần cứng:</strong> Khung mạng Ethernet cập bến card mạng vật lý (NIC). NIC kiểm tra mã checksum CRC.</li><li><strong>Direct Memory Access (DMA):</strong> NIC tự động ghi dữ liệu gói tin vào vùng đệm RAM định trước (gọi là <code>RX Ring Buffer</code>) mà không cần làm phiền CPU.</li><li><strong>Hard IRQ (Ngắt phần cứng):</strong> NIC gửi tín hiệu ngắt tới CPU. CPU dừng tạm thời tác vụ hiện tại, ghi nhận sự kiện và giao việc lại cho tầng phần mềm.</li><li><strong>SoftIRQ & NAPI (New API):</strong> Để tránh bị 'ngập lụt ngắt' (Interrupt Storm) khi có hàng triệu gói tin/giây, Linux dùng cơ chế NAPI: ngắt phần cứng bị tắt tạm thời, Kernel chuyển sang chế độ thăm dò định kỳ (Polling) thông qua luồng hạt nhân <code>ksoftirqd/x</code>.</li><li><strong>Cấu trúc sk_buff:</strong> Kernel đóng gói dữ liệu vào cấu trúc <code>struct sk_buff</code> (con trỏ quản lý gói tin xuyên suốt các tầng giao thức IP, TCP/UDP).</li></ol>"
        },
        {
          "id": "sec-netfilter-hooks",
          "title": "2. Năm Móc Chặn Netfilter Hooks",
          "content": "<p>Netfilter là khung kiến trúc bên trong nhân Linux cho phép can thiệp và lọc gói tin tại 5 vị trí chiến lược:</p><ul><li><code>NF_INET_PRE_ROUTING</code>: Ngay khi gói tin vừa được giải mã IP, trước khi Kernel quyết định đường đi (Routing Decision). Dùng cho Destination NAT (DNAT).</li><li><code>NF_INET_LOCAL_IN</code>: Gói tin có đích đến chính là máy chủ này. Nơi tường lửa kiểm tra luật INPUT.</li><li><code>NF_INET_FORWARD</code>: Gói tin đi ngang qua máy chủ này để sang một mạng khác (máy chủ đóng vai trò Router/Gateway).</li><li><code>NF_INET_LOCAL_OUT</code>: Gói tin do chính các tiến trình trên máy chủ này tạo ra và chuẩn bị gửi ra ngoài.</li><li><code>NF_INET_POST_ROUTING</code>: Gói tin chuẩn bị rời khỏi card mạng. Dùng cho Source NAT (SNAT / Masquerade).</li></ul>"
        },
        {
          "id": "sec-tcp-tuning-production",
          "title": "3. Tinh Chỉnh TCP Socket Backlog & Buffer cho Máy Chủ Chịu Tải Cao",
          "content": "<p>Khi máy chủ web bị quá tải kết nối, kết nối bị rớt ngầm do tràn hai hàng đợi socket:</p><ul><li><strong>SYN Queue (Hàng đợi kết nối nửa mở):</strong> Lưu các gói SYN đang chờ gói ACK cuối cùng từ client. Tinh chỉnh qua <code>net.ipv4.tcp_max_syn_backlog</code>. Bật <code>net.ipv4.tcp_syncookies = 1</code> để chống tấn công SYN Flood.</li><li><strong>Accept Queue (Hàng đợi đã hoàn tất bắt tay):</strong> Đang chờ ứng dụng gọi hàm <code>accept()</code>. Giới hạn bởi <code>net.core.somaxconn</code> (mặc định chỉ 128 hoặc 4096 trên một số distro, quá nhỏ cho máy chủ tải cao!).</li></ul><p><strong>Cấu hình sản xuất khuyến nghị (/etc/sysctl.d/60-network-tuning.conf):</strong></p><pre><code># Mở rộng hàng đợi kết nối:\nnet.core.somaxconn = 65535\nnet.ipv4.tcp_max_syn_backlog = 65535\n\n# Tối ưu bộ đệm TCP (min, default, max):\nnet.ipv4.tcp_rmem = 4096 87380 16777216\nnet.ipv4.tcp_wmem = 4096 65536 16777216\n\n# Thu hồi nhanh kết nối TIME_WAIT:\nnet.ipv4.tcp_tw_reuse = 1\n\n# Kích hoạt thuật toán chống nghẽn BBR của Google (Linux 4.9+):\nnet.core.default_qdisc = fq\nnet.ipv4.tcp_congestion_control = bbr</code></pre>"
        }
      ],
      "scenarios": [
        {
          "title": "Tình huống: Website bị 'Connection Refused' ngắt quãng khi có đợt Flash Sale",
          "problem": "CPU máy chủ chỉ 40%, RAM còn dư nhiều, nhưng khách hàng thường xuyên nhận lỗi Connection Refused hoặc Timeout khi bấm đặt hàng vào khung giờ vàng.",
          "solution": "Chạy lệnh <code>netstat -s | grep -i 'listen drops'</code> hoặc <code>ss -lnt '( sport = :443 )'</code>. Nếu thấy cột Send-Q chạm trần và ListenDrops tăng liên tục, nguyên nhân là hàng đợi <code>somaxconn</code> bị nghẽn (do Nginx đặt backlog lớn nhưng kernel somaxconn chỉ 128). Khắc phục ngay bằng cách tăng <code>sudo sysctl -w net.core.somaxconn=65535</code> và reload lại Nginx."
        }
      ],
      "commonMistakes": [
        "Bật tham số cũ 'net.ipv4.tcp_tw_recycle = 1'. Tham số này đã bị loại bỏ từ Linux Kernel 4.12 vì nó làm rớt kết nối của tất cả các khách hàng đứng sau cùng một địa chỉ IP NAT (do vi phạm nhãn thời gian TCP timestamp)."
      ],
      "exercises": [
        {
          "question": "Làm thế nào để kiểm tra xem thuật toán điều khiển tắc nghẽn TCP BBR (Bottleneck Bandwidth and RTT) đã thực sự được kích hoạt trên hệ thống hay chưa?",
          "command": "sysctl net.ipv4.tcp_congestion_control\nlsmod | grep bbr",
          "explanation": "Lệnh sysctl sẽ in ra 'net.ipv4.tcp_congestion_control = bbr'. Lệnh lsmod xác nhận module hạt nhân tcp_bbr đã được nạp thành công."
        }
      ],
      "summary": [
        "Gói tin mạng đi từ NIC qua DMA vào Ring Buffer, kích hoạt NAPI Polling thông qua SoftIRQ (ksoftirqd).",
        "Netfilter là trái tim của mạng Linux với 5 móc chặn (PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING).",
        "Mở rộng somaxconn và kích hoạt thuật toán TCP BBR là bí quyết vàng để tăng tốc độ và khả năng chịu tải của máy chủ web hiện đại."
      ]
    },
    {
      "id": "lx-4-08",
      "number": "4.8",
      "title": "Nền tảng Đóng gói Container Nội bộ: Namespaces, Cgroups v2, Capabilities & Seccomp",
      "subtitle": "Bản chất thực sự của Docker: Không có 'Container' vật lý, chỉ có các tiến trình bị cô lập",
      "level": "Cực kỳ chuyên sâu",
      "duration": "85 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Hiểu bản chất cốt lõi: Docker/Kubernetes không phải máy ảo hypervisor; 'Container' thực chất chỉ là một tiến trình Linux thông thường được bọc trong Namespaces (tầm nhìn) và Cgroups (hạn mức).",
        "Làm chủ 7 loại Linux Namespaces: PID, NET, MNT, IPC, UTS, USER và CGROUP.",
        "Nắm vững kiến trúc cây phân cấp thống nhất Cgroups v2 (Unified Hierarchy) kiểm soát trần tài nguyên CPU, Memory, I/O và số lượng tiến trình (pids.max).",
        "Phân rã đặc quyền tối cao của Root bằng Linux Capabilities và giới hạn bề mặt tấn công Syscall bằng Seccomp BPF filters."
      ],
      "intuition": {
        "title": "Căn phòng kính một chiều và hạn mức thẻ tín dụng",
        "metaphor": "Một Container giống như một vị khách được đưa vào một căn phòng lắp kính một chiều (Namespaces). Vị khách nhìn xung quanh chỉ thấy một mình mình (PID Namespace), có một đồng hồ riêng (UTS Namespace), một ngăn tủ riêng (Mount Namespace) và một dây điện thoại riêng (Network Namespace). Vị khách nghĩ rằng mình đang làm chủ cả một vũ trụ độc lập! Thực chất bên ngoài, người quản lý khách sạn (Host OS Kernel) nhìn xuyên qua kính và thấy rõ vị khách chỉ là một người bình thường. Người quản lý đặt một chiếc vòng giới hạn lên tay vị khách (Cgroups v2): nếu xài quá 500 MB RAM, vòng phát điện giật cảnh cáo hoặc loại bỏ (OOM); nếu tiêu quá 50% CPU, vòng sẽ tự động hãm tốc độ lại. Đồng thời, bảo vệ tịch thu súng và dao găm chỉ để lại chìa khóa cửa phòng (Capabilities & Seccomp) để đảm bảo vị khách không thể phá vỡ tòa nhà.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🧱</span>\n                    <span>7 NAMESPACES</span>\n                    <span class=\"lx-vs-tag\">Cô lập tầm nhìn</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>PID:</strong> Tiến trình đầu tiên bên trong container mang PID = 1.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>NET:</strong> Card mạng, IP, port và bảng routing hoàn toàn riêng biệt.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>MNT / UTS / IPC / USER / CGROUP:</strong> Cô lập mount point, hostname, uid/gid.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚙️</span>\n                    <span>CGROUPS V2</span>\n                    <span class=\"lx-vs-tag\">Hạn mức &amp; Seccomp</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Cgroups v2 (/sys/fs/cgroup):</strong> Khống chế <code>memory.max</code>, <code>cpu.max</code>, <code>pids.max</code>.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Linux Capabilities:</strong> Phân chia đặc quyền root thành 41 quyền nhỏ độc lập.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Seccomp BPF:</strong> Lọc và chặn đứng các syscall nguy hiểm tránh container escape.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-seven-namespaces",
          "title": "1. Bảy Trụ Cột Linux Namespaces (Cô Lập Tầm Nhìn)",
          "content": "<p>Namespace quyết định <strong>tiến trình được phép nhìn thấy những gì</strong> trên hệ thống:</p><div class=\"lx-table-responsive\"><table class=\"lx-table\"><thead><tr><th>Loại Namespace</th><th>Cờ clone / unshare</th><th>Tài nguyên được cô lập</th></tr></thead><tbody><tr><td><strong>PID</strong></td><td><code>CLONE_NEWPID</code></td><td>Cây tiến trình riêng biệt. Tiến trình đầu tiên bên trong có PID = 1.</td></tr><tr><td><strong>NET</strong></td><td><code>CLONE_NEWNET</code></td><td>Card mạng, địa chỉ IP, bảng định tuyến và cổng port riêng (không lo đụng độ cổng 80/443 của Host).</td></tr><tr><td><strong>MNT</strong></td><td><code>CLONE_NEWNS</code></td><td>Cây thư mục và danh sách mount point riêng (chroot / pivot_root thế hệ mới).</td></tr><tr><td><strong>UTS</strong></td><td><code>CLONE_NEWUTS</code></td><td>Tên máy chủ (Hostname) và tên miền (Domain name) riêng.</td></tr><tr><td><strong>IPC</strong></td><td><code>CLONE_NEWIPC</code></td><td>Bộ nhớ chia sẻ (Shared Memory) và hàng đợi thông điệp System V / POSIX message queues.</td></tr><tr><td><strong>USER</strong></td><td><code>CLONE_NEWUSER</code></td><td>Ánh xạ UID/GID (UID 0 bên trong container thực chất chỉ là UID 1000 bình thường trên máy chủ Host).</td></tr><tr><td><strong>CGROUP</strong></td><td><code>CLONE_NEWCGROUP</code></td><td>Góc nhìn ảo hóa về cây cgroup của chính tiến trình đó.</td></tr></tbody></table></div>"
        },
        {
          "id": "sec-cgroups-v2",
          "title": "2. Cgroups v2 (Control Groups) - Quản Trị Hạn Mức Tài Nguyên",
          "content": "<p>Cgroups v2 (mặc định trên Ubuntu 22.04+, RHEL 9+, Debian 11+) thay thế mô hình phân mảnh của v1 bằng cây phân cấp thống nhất gắn kết tại <code>/sys/fs/cgroup/</code>.</p><p><strong>Tạo thủ công một Cgroup giới hạn tài nguyên cho nhóm tiến trình:</strong></p><pre><code># Tạo nhóm cgroup mới tên là 'sandbox':\nsudo mkdir /sys/fs/cgroup/sandbox\n\n# Kích hoạt bộ điều khiển cpu và memory:\necho \"+cpu +memory +pids\" | sudo tee /sys/fs/cgroup/cgroup.subtree_control\n\n# Giới hạn tối đa 256MB RAM (vượt quá sẽ bị OOM trong cgroup):\necho \"268435456\" | sudo tee /sys/fs/cgroup/sandbox/memory.max\n\n# Giới hạn tối đa 50% của 1 CPU (50,000 microsecond trên mỗi chu kỳ 100,000 microsecond):\necho \"50000 100000\" | sudo tee /sys/fs/cgroup/sandbox/cpu.max\n\n# Giới hạn tối đa 30 tiến trình (chống Fork Bomb):\necho \"30\" | sudo tee /sys/fs/cgroup/sandbox/pids.max\n\n# Gán một tiến trình (PID 5678) vào nhóm này quản lý:\necho 5678 | sudo tee /sys/fs/cgroup/sandbox/cgroup.procs</code></pre>"
        },
        {
          "id": "sec-capabilities-seccomp",
          "title": "3. Phân Rã Quyền Lực Root bằng Capabilities & Seccomp BPF",
          "content": "<p>Trong Linux hiện đại, quyền tối thượng của tài khoản Root (UID 0) được chia nhỏ thành <strong>41 Capabilities</strong> độc lập:</p><ul><li><code>CAP_NET_BIND_SERVICE</code>: Quyền mở cổng mạng dưới 1024 (80, 443) mà không cần cấp full quyền root.</li><li><code>CAP_SYS_ADMIN</code>: Đặc quyền cực lớn (tương đương 90% root, cho phép mount, debug...). Cần tuyệt đối cấm trong container công cộng!</li><li><code>CAP_NET_RAW</code>: Quyền tạo gói tin IP thô (lệnh ping).</li></ul><p><strong>Cấp quyền mở cổng 80 cho Python mà không cần sudo:</strong></p><pre><code>sudo setcap 'cap_net_bind_service=+ep' /usr/bin/python3.12</code></pre><p><strong>Seccomp (Secure Computing Mode):</strong> Sử dụng bộ lọc Berkeley Packet Filter (BPF) để chặn đứng các syscall nguy hiểm (như reboot, swapon, kexec_load) ngay tại cổng vào của Kernel, ngăn chặn mã độc leo thang đặc quyền.</p>"
        }
      ],
      "scenarios": [
        {
          "title": "Tình huống: Container bị tấn công thoát quyền (Container Escape) do chạy cờ --privileged",
          "problem": "Một container Docker chạy với cờ '--privileged' bị tin tặc chiếm quyền điều khiển và ngay lập tức xâm nhập thành công vào toàn bộ hệ điều hành máy chủ vật lý.",
          "solution": "Cờ '--privileged' trao toàn bộ 41 Linux Capabilities, tắt Seccomp profile và cho phép truy cập trực tiếp mọi thiết bị /dev trên Host. Tin tặc chỉ cần mount /dev/sda1 vào container là đọc ghi được toàn bộ hệ thống file gốc của Host. Khắc phục: TUYỆT ĐỐI không dùng --privileged trong sản xuất. Chỉ cấp đúng capability tối thiểu cần thiết bằng cờ <code>--cap-drop=ALL --cap-add=NET_BIND_SERVICE</code>."
        }
      ],
      "commonMistakes": [
        "Lầm tưởng tiến trình chạy trong Container có hiệu năng CPU/RAM kém hơn chạy trên máy chủ thật (Bare-metal). Vì không qua tầng máy ảo hypervisor, tiến trình trong container thực thi trực tiếp trên CPU của máy chủ vật lý, tổn hao hiệu năng (overhead) gần như bằng 0%."
      ],
      "exercises": [
        {
          "question": "Làm thế nào để 'nhảy' vào Network Namespace của một Container đang chạy bằng các công cụ Linux thuần túy mà không dùng lệnh docker exec?",
          "command": "# Lấy PID trên Host của container (ví dụ PID 8912):\nsudo nsenter -t 8912 -n ip a",
          "explanation": "Lệnh nsenter (namespace enter) cho phép gắn shell hiện tại vào bất kỳ namespace nào (-n: network, -m: mount, -p: pid) của tiến trình mục tiêu. Đây là công cụ debug thần thánh của các kỹ sư SRE Kubernetes."
        }
      ],
      "summary": [
        "Container là sự kết hợp hoàn hảo giữa Namespaces (cô lập tầm nhìn) và Cgroups v2 (kiểm soát hạn mức tài nguyên).",
        "Cgroups v2 cung cấp cấu trúc cây thống nhất giúp kiểm soát triệt để CPU, RAM, IO và ngăn chặn Fork Bomb qua pids.max.",
        "Linux Capabilities và Seccomp BPF là hai chốt chặn an ninh sống còn để triệt tiêu nguy cơ container escape."
      ]
    },
    {
      "id": "lx-4-09",
      "number": "4.9",
      "title": "Dự án Thực hành Cấp 4: Tự dựng 'Mini Container' thuần túy bằng Shell Script & 3 Kịch bản Sự cố",
      "subtitle": "Hiện thực hóa Docker thu nhỏ chỉ bằng lệnh Linux thuần túy và diễn tập xử lý sự cố cấp độ Kernel",
      "level": "Cực kỳ chuyên sâu",
      "duration": "90 phút",
      "requiresRoot": true,
      "requiresVM": true,
      "objectives": [
        "Tự tay viết một script Shell hoàn chỉnh dựng 'Mini Container' từ con số 0 sử dụng unshare, cgroups v2, pivot_root và ip netns mà không cần cài đặt Docker.",
        "Hiểu trọn vẹn cách Docker tạo veth pair (cặp cáp mạng ảo) nối container với bridge ngoài Host.",
        "Diễn tập chẩn đoán và khắc phục 3 kịch bản sự cố kinh điển tầng nội bộ hệ điều hành: OOM Killer bắn nhầm tiến trình, Hàng đợi TCP backlog bão hòa và Nghẽn I/O dẫn tới Uninterruptible Sleep (D-state)."
      ],
      "intuition": {
        "title": "Tự đóng một cỗ xe hơi từ các linh kiện cơ khí rời",
        "metaphor": "Học Docker giống như bạn mua một chiếc xe hơi bóng bẩy về lái. Nhưng làm chủ Cấp 4 giống như việc bạn tự mình gom động cơ (Cgroups), vô lăng (Namespaces), kính chắn gió (Chroot/Pivot_root) và dây bugi (Veth network) để lắp ráp thành một chiếc xe tự chế chạy bon bon trên đường. Khi bạn đã tự tay lắp được chiếc xe đó, không một tiếng động lạ nào dưới nắp capo hay sự cố máy móc phức tạp nào trên đời có thể làm khó được bạn.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>📦</span>\n                    <span>MINI CONTAINER</span>\n                    <span class=\"lx-vs-tag\">Thuần Shell</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>unshare:</strong> Cô lập PID, MNT, UTS, IPC chỉ bằng một dòng lệnh.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Cgroups v2:</strong> Tạo thư mục /sys/fs/cgroup/mini-box khống chế 100MB RAM & 20 tiến trình.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Alpine rootfs:</strong> Tải minirootfs và dùng chroot chuyển đổi thư mục gốc.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>⚡</span>\n                    <span>3 SỰ CỐ KERNEL</span>\n                    <span class=\"lx-vs-tag\">Diễn tập SRE</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 1 (OOM Cgroup):</strong> Máy còn trống RAM nhưng container bị bắn do chạm memory.max.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 2 (Socket Drop):</strong> Rớt kết nối do somaxconn quá thấp khiến Accept Queue tràn.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Sự cố 3 (Soft Lockup):</strong> Luồng Ring 0 kẹt spinlock khiến CPU watchdog báo lỗi.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-mini-container-project",
          "title": "1. Dự án: Tự Dựng 'Mini Container' Bằng Shell Script Thuần Túy",
          "content": "<p>Script thực chiến xây dựng một container cô lập hoàn chỉnh (cần chạy trên máy ảo Linux có Cgroups v2):</p><pre><code>#!/usr/bin/env bash\n# mini-container.sh - Tự dựng container bằng Linux primitives\nset -euo pipefail\n\nROOTFS=\"/tmp/mini-rootfs\"\nmkdir -p \"$ROOTFS\"\n\n# 1. Tải hệ thống file Alpine Linux siêu nhẹ:\nif [ ! -f \"$ROOTFS/bin/sh\" ]; then\n    echo \"[*] Đang tải Alpine mini rootfs...\"\n    curl -sL https://dl-cdn.alpinelinux.org/alpine/v3.19/releases/x86_64/alpine-minirootfs-3.19.1-x86_64.tar.gz | tar -xz -C \"$ROOTFS\"\nfi\n\n# 2. Thiết lập Cgroup v2 khống chế tài nguyên:\nCG_DIR=\"/sys/fs/cgroup/mini-box\"\nsudo mkdir -p \"$CG_DIR\"\necho \"100000000\" | sudo tee \"$CG_DIR/memory.max\" # 100MB RAM\necho \"20\"        | sudo tee \"$CG_DIR/pids.max\"   # Tối đa 20 tiến trình\n\n# 3. Khởi chạy tiến trình cô lập với unshare (PID, Mount, UTS, IPC):\necho \"[*] Đang kích hoạt Mini Container...\"\nsudo unshare --mount --uts --ipc --pid --fork \\\n    sh -c \"\n        # Gán chính subshell này vào Cgroup:\n        echo \\$\\$ > $CG_DIR/cgroup.procs\n        \n        # Đổi hostname:\n        hostname mini-container\n        \n        # Mount proc riêng biệt để 'ps aux' chỉ thấy tiến trình bên trong:\n        mount -t proc none $ROOTFS/proc 2>/dev/null || true\n        \n        # Chuyển đổi rootfs an toàn:\n        chroot $ROOTFS /bin/sh\n    \"\n\necho \"[*] Container đã thoát. Dọn dẹp cgroup...\"\nsudo rmdir \"$CG_DIR\" || true</code></pre><p>Khi bước vào shell bên trong, gõ <code>ps aux</code> bạn sẽ thấy shell của bạn chính là <strong>PID 1</strong> và chỉ có duy nhất nó tồn tại. Gõ <code>hostname</code> sẽ ra <code>mini-container</code>. Bạn vừa tự mình tạo ra một container hoàn hảo!</p>"
        },
        {
          "id": "sec-veth-bridge",
          "title": "2. Cấu Trúc Mạng Của Container: Cặp Cáp Ảo Veth Pair & Bridge",
          "content": "<p>Làm thế nào để container có mạng riêng? Docker sử dụng cấu trúc Veth Pair (Virtual Ethernet):</p><pre><code># Tạo cặp cáp ảo: đầu veth-host cắm ở Host, đầu veth-guest cắm vào Container:\nsudo ip link add veth-host type veth peer name veth-guest\n\n# Đẩy đầu veth-guest vào Network Namespace của container (PID 1234):\nsudo ip link set veth-guest netns 1234\n\n# Ở phía container, đổi tên thành eth0 và đặt IP:\nsudo nsenter -t 1234 -n ip link set dev veth-guest name eth0\nsudo nsenter -t 1234 -n ip addr add 172.20.0.2/24 dev eth0\nsudo nsenter -t 1234 -n ip link set eth0 up</code></pre><p>Phía Host, đầu <code>veth-host</code> được cắm vào một Linux Bridge ảo (<code>docker0</code>) đóng vai trò như một chiếc Switch mạng thông thường.</p>"
        },
        {
          "id": "sec-troubleshooting-kernel-scenarios",
          "title": "3. Diễn Tập 3 Kịch Bản Sự Cố Kernel Chuyên Sâu",
          "content": "<p>Phần diễn tập thực chiến bên dưới mô phỏng chính xác các ca sự cố hóc búa nhất mà kỹ sư SRE/DevOps thường gặp phải trên hệ thống quy mô lớn.</p>"
        }
      ],
      "scenarios": [
        {
          "title": "Sự cố: CPU hiển thị 0% nhưng tiến trình bị treo cứng không thể kill bằng kill -9",
          "problem": "Một tiến trình Python hoặc Database bị treo cứng, gõ lệnh 'kill -9 <PID>' hoàn toàn vô tác dụng, tiến trình vẫn lù lù tồn tại trong danh sách ps.",
          "solution": "Tiến trình này đang ở trạng thái D-state (Uninterruptible Sleep). Khi một task đang ở D-state, Kernel bảo vệ nó không cho phép nhận bất kỳ tín hiệu (signal) nào (kể cả SIGKILL) để tránh làm hỏng cấu trúc dữ liệu của driver hoặc filesystem. Nguyên nhân luôn là do I/O phần cứng bị nghẽn (ổ cứng SSD bị mất kết nối, mount NFS từ xa bị đứt cáp mạng). Cách duy nhất để giải phóng là khôi phục kết nối lưu trữ I/O đó hoặc bắt buộc phải reboot hệ thống."
        }
      ],
      "commonMistakes": [
        "Cố gắng chạy lệnh 'kill -9' liên tục hàng trăm lần đối với một tiến trình ở trạng thái 'Z' (Zombie) hoặc 'D' (Uninterruptible Sleep). Zombie process thực chất đã chết và giải phóng toàn bộ RAM, nó chỉ còn là một dòng ghi chú trong bảng tiến trình chờ tiến trình cha đọc exit code qua wait(). Muốn xóa Zombie, phải khởi động lại tiến trình cha của nó!"
      ],
      "exercises": [
        {
          "question": "SỰ CỐ 1 (Kịch bản Kernel): Máy chủ có 16GB RAM, tiến trình Python chiếm 3GB RAM nhưng lại bị OOM Killer bắn chết trong khi hệ thống báo vẫn còn 10GB RAM trống. Nguyên nhân do đâu?",
          "command": "# Kiểm tra giới hạn memory cgroup của tiến trình:\ncat /sys/fs/cgroup/system.slice/myapp.service/memory.current\ncat /sys/fs/cgroup/system.slice/myapp.service/memory.max",
          "explanation": "NGUYÊN NHÂN: Tiến trình bị giới hạn bởi Cgroups v2 (Memory Cgroup Limit) của chính service đó (ví dụ cấu hình MemoryMax=2.5G trong systemd service unit), chứ không phải do thiếu RAM toàn máy chủ.\nCÁCH XỬ LÝ: Điều chỉnh lại thông số 'MemoryMax' trong tệp systemd service của ứng dụng lên mức phù hợp (ví dụ 4G), sau đó chạy 'sudo systemctl daemon-reload && sudo systemctl restart myapp'."
        },
        {
          "question": "SỰ CỐ 2 (Kịch bản Mạng): Một ứng dụng TCP server ghi nhận hàng ngàn kết nối bị từ chối trong giờ cao điểm. netstat -s báo 'times the listen queue of a socket overflowed' liên tục tăng. Cách chẩn đoán và khắc phục triệt để?",
          "command": "# Xem kích thước hàng đợi listen hiện tại của ứng dụng:\nss -lnt '( sport = :8080 )'\n# Tăng trần socket backlog kernel:\nsudo sysctl -w net.core.somaxconn=65535",
          "explanation": "NGUYÊN NHÂN: Accept Queue của socket bị tràn. Cột Send-Q trong lệnh ss -lnt hiển thị giới hạn backlog mà ứng dụng đăng ký trong hàm listen(sockfd, backlog). Nếu con số này nhỏ (ví dụ 128) hoặc kernel somaxconn chỉ 128, khi lưu lượng kết nối ùa về nhanh hơn tốc độ ứng dụng gọi accept(), kernel buộc phải vứt bỏ gói tin ACK.\nCÁCH XỬ LÝ: Tăng cả hai tầng: nâng 'net.core.somaxconn = 65535' trong sysctl và cấu hình tham số backlog của ứng dụng (trong Gunicorn: --backlog 65535, trong Nginx: backlog=65535)."
        },
        {
          "question": "SỰ CỐ 3 (Kịch bản CPU): Máy chủ báo lỗi 'watchdog: BUG: soft lockup - CPU#2 stuck for 26s!' trong dmesg. Hiện tượng này nghĩa là gì?",
          "command": "dmesg -T | grep -i 'soft lockup'\ncat /proc/sys/kernel/watchdog_thresh",
          "explanation": "NGUYÊN NHÂN: Một luồng trong Kernel Space chạy ở Ring 0 bị kẹt trong một vòng lặp vô tận (infinite loop) hoặc giữ Spinlock quá lâu mà không nhường CPU, khiến bộ đếm thời gian watchdog của kernel phát hiện CPU đó không phản hồi trong hơn 20-26 giây.\nCÁCH XỬ LÝ: Đọc stack trace ngay dưới dòng báo lỗi trong dmesg để xác định module hạt nhân nào gây ra (thường là driver phần cứng bên thứ ba, card đồ họa hoặc lỗi trong module iptables/filesystem). Cập nhật phiên bản Kernel hoặc gỡ bỏ driver có lỗi."
        }
      ],
      "summary": [
        "Mini Container hoàn toàn có thể tự dựng từ các lệnh Linux nguyên thủy: unshare, cgroups v2, chroot và veth.",
        "Container Network hoạt động dựa trên cặp cáp mạng ảo Veth Pair bắc cầu qua Linux Bridge.",
        "Làm chủ các kịch bản OOM Cgroup, Socket Overflow và Kernel Soft Lockup giúp kỹ sư làm chủ hạ tầng ở cấp độ sâu sắc nhất."
      ]
    },
    {
      "id": "lx-4-10",
      "number": "4.10",
      "title": "Bảng tra cứu Kiến trúc Nhân, Syscall & Thuật ngữ Chuyên sâu Cấp 4 (Cheat Sheet & Glossary)",
      "subtitle": "Cẩm nang tra cứu nhanh các System Calls, tham số Kernel Sysctl, file ảo /proc và từ điển hệ điều hành",
      "level": "Cực kỳ chuyên sâu",
      "duration": "60 phút",
      "requiresRoot": false,
      "requiresVM": false,
      "objectives": [
        "Tra cứu nhanh danh sách các System Call quan trọng nhất theo nhóm chức năng (File, Process, Network, Memory).",
        "Nắm trọn bảng tham số Kernel sysctl sản xuất tối ưu cho Web Server và Database.",
        "Sở hữu từ điển thuật ngữ chuyên sâu về Hệ điều hành và Nội bộ Nhân Linux."
      ],
      "intuition": {
        "title": "Bản đồ giải phẫu toàn diện cơ thể sống",
        "metaphor": "Nếu 3 cấp độ đầu giúp bạn học cách sử dụng các công cụ y tế và sơ cứu vết thương ngoài da, thì bảng tra cứu Cấp 4 chính là tấm bản đồ giải phẫu học chi tiết từng dây thần kinh (Syscalls), mạch máu (Ngăn xếp mạng), tế bào năng lượng (Bộ nhớ & Paging) và hệ miễn dịch (Seccomp & Capabilities) của toàn bộ sinh thể Linux.",
        "visualHtml": "<div class=\"lx-vs-grid\">\n                <div class=\"lx-vs-card kernel-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🗺️</span>\n                    <span>4 PHÂN HỆ KERNEL</span>\n                    <span class=\"lx-vs-tag\">Trụ cột Nhân</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Compute (CPU):</strong> task_struct, CFS/EEVDF Scheduler, Context Switches.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Memory:</strong> Virtual Address, Page Tables, Page Cache, OOM Killer.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Storage (I/O):</strong> VFS, Inode, Dentry, Block Layer, Dirty Pages, fsync.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>Network:</strong> DMA, Ring Buffer, SoftIRQ/NAPI, Netfilter Hooks, TCP Backlog.</li>\n                  </ul>\n                </div>\n                <div class=\"lx-vs-card distro-card\">\n                  <div class=\"lx-vs-title\">\n                    <span>🔬</span>\n                    <span>CHẨN ĐOÁN SÂU</span>\n                    <span class=\"lx-vs-tag\">eBPF &amp; perf</span>\n                  </div>\n                  <ul class=\"lx-vs-list\">\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>strace:</strong> Kính hiển vi soi từng syscall và độ trễ vào/ra của ứng dụng.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>perf & Flame Graph:</strong> Lấy mẫu CPU stack trace, vẽ biểu đồ lửa xác định điểm nóng.</li>\n                    <li><span class=\"lx-vs-bullet\">•</span> <strong>bpftrace (eBPF):</strong> Chương trình quan sát động trong kernel mà không gây suy giảm hiệu năng.</li>\n                  </ul>\n                </div>\n              </div>"
      },
      "sections": [
        {
          "id": "sec-syscall-cheatsheet",
          "title": "1. Bảng Tra Cứu Các Cuộc Gọi Hệ Thống (System Calls) Cốt Lõi",
          "content": "<div class=\"lx-table-responsive\"><table class=\"lx-table\"><thead><tr><th>Syscall</th><th>Nhóm chức năng</th><th>Mô tả hành vi cấp thấp</th><th>Thư viện / Lệnh sử dụng</th></tr></thead><tbody><tr><td><code>openat</code></td><td>Tập tin / VFS</td><td>Mở hoặc tạo file dựa trên đường dẫn tương đối từ thư mục mô tả fd.</td><td>open(), fopen(), cat, python open()</td></tr><tr><td><code>read / write</code></td><td>Tập tin / VFS</td><td>Đọc hoặc ghi luồng byte từ file descriptor vào buffer bộ nhớ.</td><td>read(), write(), echo, dd</td></tr><tr><td><code>fsync / fdatasync</code></td><td>Lưu trữ</td><td>Ép xả Dirty Pages trong Page Cache xuống thiết bị lưu trữ vật lý.</td><td>fsync(), postgresql WAL, sqlite commit</td></tr><tr><td><code>clone</code></td><td>Tiến trình / Luồng</td><td>Tạo task con mới với các cờ chia sẻ không gian địa chỉ, fd, IPC.</td><td>fork(), pthread_create, unshare</td></tr><tr><td><code>execve</code></td><td>Tiến trình</td><td>Thay thế toàn bộ mã lệnh, ngăn xếp và heap của tiến trình bằng một file thực thi mới.</td><td>exec(), bash khi chạy lệnh nhị phân</td></tr><tr><td><code>mmap / munmap</code></td><td>Bộ nhớ ảo</td><td>Ánh xạ file hoặc vùng nhớ ẩn danh (anonymous memory) vào không gian địa chỉ ảo.</td><td>malloc(), nạp thư viện .so, sqlite</td></tr><tr><td><code>brk / sbrk</code></td><td>Bộ nhớ ảo</td><td>Mở rộng hoặc thu hẹp đỉnh vùng nhớ Heap của tiến trình.</td><td>glibc malloc cho các khối nhớ nhỏ</td></tr><tr><td><code>socket / bind / listen / accept</code></td><td>Mạng</td><td>Thiết lập hạ tầng socket TCP lắng nghe và tiếp nhận kết nối mới.</td><td>Nginx, Python socket server, uvicorn</td></tr><tr><td><code>epoll_create / epoll_ctl / epoll_wait</code></td><td>I/O Đa kênh</td><td>Cơ chế I/O multiplexing hướng sự kiện tốc độ cao (O(1)) xử lý hàng vạn kết nối.</td><td>Node.js libuv, Nginx event loop, Python asyncio</td></tr><tr><td><code>unshare / setns</code></td><td>Container</td><td>Tách rời hoặc nhập tiến trình vào các Linux Namespaces khác nhau.</td><td>Docker run, unshare, nsenter</td></tr></tbody></table></div>"
        },
        {
          "id": "sec-kernel-sysctl-reference",
          "title": "2. Bảng Tham Số Kernel Tinh Chỉnh Sản Xuất (/etc/sysctl.conf)",
          "content": "<div class=\"lx-table-responsive\"><table class=\"lx-table\"><thead><tr><th>Tham số sysctl</th><th>Giá trị khuyến nghị</th><th>Mục đích tối ưu hóa</th></tr></thead><tbody><tr><td><code>vm.swappiness</code></td><td><code>10</code></td><td>Hạn chế swap dữ liệu ứng dụng ra đĩa khi RAM vật lý vẫn còn dồi dào.</td></tr><tr><td><code>vm.dirty_background_ratio</code></td><td><code>5</code></td><td>Kích hoạt kworker xả đĩa sớm khi dirty memory chạm 5% RAM, tránh dồn ứ I/O.</td></tr><tr><td><code>vm.dirty_ratio</code></td><td><code>10</code></td><td>Khống chế trần dirty memory không vượt quá 10% RAM để ngăn ngừa hiện tượng đóng băng I/O.</td></tr><tr><td><code>net.core.somaxconn</code></td><td><code>65535</code></td><td>Mở rộng hàng đợi kết nối hoàn tất (Accept Queue) tránh lỗi connection drop giờ cao điểm.</td></tr><tr><td><code>net.ipv4.tcp_max_syn_backlog</code></td><td><code>65535</code></td><td>Mở rộng hàng đợi kết nối nửa mở (SYN Queue) chống quá tải kết nối vào.</td></tr><tr><td><code>net.ipv4.tcp_syncookies</code></td><td><code>1</code></td><td>Kích hoạt cơ chế SYN Cookies phòng thủ tấn công từ chối dịch vụ SYN Flood.</td></tr><tr><td><code>net.ipv4.tcp_tw_reuse</code></td><td><code>1</code></td><td>Tái sử dụng an toàn các socket ở trạng thái TIME_WAIT cho kết nối đi mới.</td></tr><tr><td><code>fs.file-max</code></td><td><code>2097152</code></td><td>Nâng tổng giới hạn file descriptor mở toàn hệ thống lên 2 triệu.</td></tr></tbody></table></div>"
        },
        {
          "id": "sec-level4-glossary",
          "title": "3. Từ Điển Thuật Ngữ Nội Bộ Hệ Điều Hành (Glossary)",
          "content": "<div class=\"lx-table-responsive\"><table class=\"lx-table\"><thead><tr><th>Thuật ngữ</th><th>Tên tiếng Anh</th><th>Định nghĩa chuẩn xác</th></tr></thead><tbody><tr><td><strong>Ring 0 / Ring 3</strong></td><td>CPU Privilege Levels</td><td>Các chế độ phân quyền của CPU phần cứng: Ring 0 dành riêng cho Kernel có toàn quyền, Ring 3 dành cho ứng dụng người dùng bị giới hạn.</td></tr><tr><td><strong>Syscall</strong></td><td>System Call</td><td>Cơ chế chuyển đổi ngữ cảnh cho phép ứng dụng User Space yêu cầu dịch vụ từ Kernel Space.</td></tr><tr><td><strong>Initramfs</strong></td><td>Initial RAM Filesystem</td><td>Hệ thống file tạm nén trong RAM chứa driver lưu trữ cần thiết để nạp rootfs thực lúc boot.</td></tr><tr><td><strong>task_struct</strong></td><td>Process Descriptor</td><td>Cấu trúc dữ liệu trung tâm trong nhân Linux chứa toàn bộ trạng thái của một tiến trình/luồng.</td></tr><tr><td><strong>CFS / EEVDF</strong></td><td>Completely Fair Scheduler / EEVDF</td><td>Bộ lập lịch CPU của Linux phân bổ thời gian thực thi dựa trên thời gian ảo vruntime và deadline.</td></tr><tr><td><strong>Page Fault</strong></td><td>Ngắt trang bộ nhớ</td><td>Ngắt phần cứng khi tiến trình truy cập địa chỉ ảo chưa được ánh xạ frame vật lý trong RAM (Minor) hoặc đang nằm trên đĩa (Major).</td></tr><tr><td><strong>Page Cache</strong></td><td>Bộ nhớ đệm trang</td><td>Vùng nhớ RAM dùng để lưu đệm các khối dữ liệu file từ đĩa, giúp tăng tốc độ đọc I/O.</td></tr><tr><td><strong>OOM Killer</strong></td><td>Out-Of-Memory Killer</td><td>Cơ chế nhân tiêu diệt tiến trình chiếm nhiều RAM nhất khi toàn bộ bộ nhớ cạn kiệt.</td></tr><tr><td><strong>VFS</strong></td><td>Virtual File System</td><td>Tầng trừu tượng hóa cho phép Linux giao tiếp đồng nhất với mọi filesystem qua inode/dentry.</td></tr><tr><td><strong>Dirty Page</strong></td><td>Trang bộ nhớ bẩn</td><td>Trang trong Page Cache đã bị ứng dụng sửa đổi nhưng chưa kịp ghi xuống đĩa cứng.</td></tr><tr><td><strong>SoftIRQ / NAPI</strong></td><td>Phần mềm ngắt & Polling</td><td>Cơ chế xử lý gói tin mạng hiệu năng cao tránh bão ngắt phần cứng cho CPU.</td></tr><tr><td><strong>Netfilter Hooks</strong></td><td>Móc chặn gói tin</td><td>5 điểm chặn bên trong kernel để kiểm tra, sửa đổi hoặc loại bỏ gói tin IP (nền tảng của Firewall).</td></tr><tr><td><strong>Namespace</strong></td><td>Không gian định danh</td><td>Tính năng nhân cô lập tầm nhìn tài nguyên hệ thống (PID, NET, MNT...) của tiến trình (nền tảng Container).</td></tr><tr><td><strong>Cgroups v2</strong></td><td>Control Groups v2</td><td>Cây phân cấp thống nhất khống chế trần tài nguyên (CPU, Memory, I/O, PIDs) của nhóm tiến trình.</td></tr><tr><td><strong>Seccomp</strong></td><td>Secure Computing Mode</td><td>Bộ lọc BPF khống chế các syscall mà một tiến trình được phép gọi, thu hẹp bề mặt tấn công.</td></tr></tbody></table></div>"
        }
      ],
      "scenarios": [],
      "commonMistakes": [
        "Lầm tưởng học thuộc lòng tất cả số hiệu syscall là cần thiết. Trong thực tế, glibc và các thư viện ngôn ngữ bậc cao (Python, Go, Rust) tự động gói các syscall này; điều quan trọng nhất là bạn hiểu bản chất chi phí và hành vi cấp thấp phía sau mỗi hàm gọi."
      ],
      "exercises": [
        {
          "question": "Làm thế nào để tra cứu cú pháp, mã lỗi trả về và giải thích chi tiết của một syscall bất kỳ (ví dụ syscall epoll_wait) từ tài liệu chính thức của Linux?",
          "command": "man 2 epoll_wait",
          "explanation": "Trong hệ thống man pages: mục 1 dành cho lệnh người dùng (ls, cd), mục 2 dành cho System Calls của Kernel (open, fork, epoll_wait), mục 3 dành cho hàm thư viện C chuẩn (printf, malloc)."
        }
      ],
      "summary": [
        "Bảng tra cứu Syscalls và Sysctl là tài liệu gối đầu giường để tối ưu hóa và gỡ lỗi máy chủ cấp độ chuyên gia.",
        "Nắm vững các chỉ số trong /proc và /sys giúp bạn giải phẫu mọi hành vi bí ẩn của hệ thống.",
        "Chúc mừng bạn đã hoàn thành trọn vẹn cả 4 cấp độ Giáo trình Linux Thực chiến & Nội bộ Hệ điều hành!"
      ]
    }
  ]
};
