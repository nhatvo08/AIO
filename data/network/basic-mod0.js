/**
 * Chuyên đề Mạng máy tính (Networking)
 * HỌC PHẦN I: NETWORKING CƠ BẢN (Dành cho người mới bắt đầu)
 * MODULE 0: Mạng máy tính là gì? Vì sao cần? Tổng quan Internet
 */

window.NET_BASIC_MOD0_DATA = {
  courseId: "course-net-hp1",
  courseNumber: "Học phần I",
  courseTitle: "Networking Cơ Bản",
  id: "part-net-b-0",
  number: "Module 0",
  title: "Bản chất Mạng & Internet",
  level: "Cơ bản",
  badge: "Mod 0",
  icon: "🌐",
  description: "Bản chất mạng máy tính: từ hai thiết bị nối dây, mô hình Client-Server, chuyển mạch gói đến các giao thức mạng chuẩn hóa.",
  lessons: [
    /* =========================================================================
       BÀI 0.1: MẠNG MÁY TÍNH LÀ GÌ?
       ========================================================================= */
    {
      id: "net-b-0-01",
      number: "0.1",
      title: "Mạng máy tính là gì? Từ hai máy tính nối dây đến Internet toàn cầu",
      subtitle: "Hiểu bản chất việc kết nối, 3 thành phần vật lý, môi trường truyền dẫn, các mô hình Topo mạng, hiệu năng mạng (Bandwidth, Latency) và bản chất Internet",
      level: "Cơ bản",
      duration: "50 phút",
      objectives: [
        "Định nghĩa được mạng máy tính (Computer Network) theo bản chất kết nối và chia sẻ tài nguyên số.",
        "Phân biệt rạch ròi 3 thành phần cốt lõi: Thiết bị đầu cuối (End Devices), Thiết bị trung gian (Intermediary Devices), và Môi trường truyền dẫn (Transmission Media).",
        "Nắm vững các môi trường truyền dẫn (Cáp đồng xoắn đôi UTP/STP, Cáp sợi quang, Sóng vô tuyến) và 3 chế độ truyền thông (Simplex, Half-Duplex, Full-Duplex).",
        "Nhận diện và so sánh được 5 mô hình Topo mạng kinh điển: Bus, Star, Ring, Mesh và Hybrid.",
        "Phân tích được 5 chỉ số hiệu năng mạng cốt lõi: Băng thông (Bandwidth), Thông lượng (Throughput), Độ trễ (Latency/RTT), Jitter và Tỷ lệ rớt gói (Packet Loss).",
        "Tự tay dùng lệnh ping trên Windows/Linux để kiểm tra thông mạng, đọc hiểu chính xác các chỉ số: latency (RTT), TTL và packet loss."
      ],
      intuition: {
        title: "Chiếc Ống Bơ Nối Dây Chỉ & Bản Chất Của Sự Kết Nối",
        metaphor: "Hãy nhớ lại trò chơi tuổi thơ: bạn và người bạn hàng xóm lấy hai chiếc vỏ lon sữa bò, đục lỗ ở đáy, luồn sợi chỉ dù kéo căng qua hai ban công nhà. Khi bạn nói vào miệng lon, sóng âm làm màng đáy lon rung lên, truyền dao động cơ học dọc theo sợi chỉ sang chiếc lon bên kia, làm màng đáy rung và tái tạo lại âm thanh cho bạn nghe. Đó chính là mô hình mạng máy tính sơ khai nhất! Hai chiếc lon là thiết bị đầu cuối (End Devices); sợi chỉ căng là môi trường truyền dẫn (Transmission Medium); và quy ước 'khi tôi nói xong tôi bảo 'hết' thì bạn mới được nói' chính là một giao thức mạng (Protocol).",
        boundary: "Điểm phép ẩn dụ này không còn đúng: Sợi chỉ dù chỉ truyền sóng dao động cơ học tương tự (analog) liên tục giữa đúng 2 người và không thể tự phân nhánh. Mạng máy tính hiện đại chuyển mọi âm thanh, hình ảnh và văn bản thành chuỗi số nhị phân 0 và 1 (digital), cắt nhỏ thành từng 'gói tin' (packet) và dùng các thiết bị định tuyến thông minh (Router, Switch) để chia sẻ cùng một đường truyền cho hàng tỷ người trên toàn cầu cùng một lúc.",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">🌐</span>
              <span class="net-arch-title">KIẾN TRÚC MẠNG TỔNG QUAN: TỪ THIẾT BỊ GIA ĐÌNH ĐẾN MÁY CHỦ TOÀN CẦU</span>
            </div>
            <div class="net-arch-layers">
              <!-- Tầng 1: Thiết bị người dùng -->
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">💻 1. Tầng Người Dùng &amp; Thiết Bị Đầu Cuối (End Devices / Hosts)</span>
                  <span class="net-arch-layer-badge">Nơi Phát Sinh Dữ Liệu</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Laptop cá nhân:</strong> Mở trình duyệt Chrome gõ <code>google.com</code></div>
                  <div class="net-arch-node"><strong>Điện thoại Smartphone:</strong> Truyền phát luồng video qua Wi-Fi</div>
                  <div class="net-arch-node"><strong>Máy in mạng LAN:</strong> Chờ lệnh in tài liệu từ phòng kế toán</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Cáp mạng đồng xoắn đôi RJ45 (xung điện) &amp; Sóng Wi-Fi (sóng vô tuyến)</div>

              <!-- Tầng 2: Mạng cục bộ Switch -->
              <div class="net-arch-layer layer-vfs">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🔀 2. Mạng Cục Bộ (LAN) &amp; Thiết Bị Chuyển Mạch (Switch)</span>
                  <span class="net-arch-layer-badge">Nội Bộ Gia Đình / Cơ Quan</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Switch 8-Port:</strong> Phân phối gói tin chính xác theo địa chỉ vật lý MAC</div>
                  <div class="net-arch-node"><strong>Access Point (AP):</strong> Cầu nối biến sóng Wi-Fi thành tín hiệu cáp có dây</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Cáp Uplink chuyển tiếp tới Cổng mặc định (Default Gateway)</div>

              <!-- Tầng 3: Thiết bị biên Router & NAT -->
              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🧭 3. Tầng Biên Mạng (Edge Router) &amp; Cửa Ngõ Ra Internet</span>
                  <span class="net-arch-layer-badge">Cầu Nối LAN ➔ WAN</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Router &amp; NAT:</strong> Chuyển đổi IP riêng trong nhà thành IP công cộng duy nhất</div>
                  <div class="net-arch-node"><strong>Modem Quang (ONT):</strong> Biến xung điện thành chớp xung ánh sáng laser</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Cáp sợi quang ngầm biển (Submarine Fiber) &amp; Mạng lõi ISP toàn cầu</div>

              <!-- Tầng 4: Internet & Server Farm -->
              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🌍 4. Mạng Diện Rộng Toàn Cầu (Internet / WAN) &amp; Máy Chủ Đích</span>
                  <span class="net-arch-layer-badge">Đích Đến Cuối Cùng</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>DNS Server (8.8.8.8):</strong> Danh bạ tra cứu địa chỉ IP cho tên miền</div>
                  <div class="net-arch-node"><strong>Web Server Farm (Google):</strong> Cụm máy chủ tiếp nhận và phản hồi nội dung</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-def-components",
          title: "1. Mạng máy tính là gì? Ba thành phần vật lý bắt buộc",
          content: `
            <p>Một <strong>Mạng máy tính (Computer Network)</strong> là hệ thống kết nối từ hai hay nhiều thiết bị tính toán với nhau thông qua đường truyền có dây hoặc không dây, cho phép chúng trao đổi dữ liệu số và chia sẻ tài nguyên dùng chung (tệp tin, máy in, kết nối Internet, cơ sở dữ liệu).</p>
            <p>Dù là mạng gia đình nhỏ bé hay mạng lưới viễn thông quốc tế, mọi hệ thống mạng đều được xây dựng từ <strong>3 thành phần cốt lõi</strong> sau đây:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>💻</span> 1. Thiết Bị Đầu Cuối</h4>
                  <span class="net-concept-badge">End Devices / Hosts</span>
                </div>
                <div class="net-concept-body">
                  <p>Là điểm khởi đầu sinh ra dữ liệu hoặc là điểm đích tiếp nhận và tiêu thụ dữ liệu. Bất kỳ thiết bị nào có địa chỉ mạng đều được gọi là một <strong>Host</strong>.</p>
                  <p><strong>Bao gồm:</strong> Máy tính để bàn PC, Laptop, Smartphone, Máy in mạng, Camera an ninh IP, Smart TV, Cảm biến IoT, Máy chủ Server.</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🔀</span> 2. Thiết Bị Trung Gian</h4>
                  <span class="net-concept-badge">Intermediary Devices</span>
                </div>
                <div class="net-concept-body">
                  <p>Nằm trên đường truyền giữa các Host. Chúng không tự sinh dữ liệu người dùng mà có nhiệm vụ kết nối các thiết bị, khuếch đại tín hiệu, định tuyến đường đi và bảo mật thông tin.</p>
                  <p><strong>Bao gồm:</strong> Bộ chuyển mạch (<strong>Switch</strong>), Bộ định tuyến (<strong>Router</strong>), Điểm truy cập không dây (<strong>Access Point</strong>), Tường lửa phần cứng (<strong>Firewall</strong>).</p>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🔌</span> 3. Môi Trường Truyền Dẫn</h4>
                  <span class="net-concept-badge">Transmission Media</span>
                </div>
                <div class="net-concept-body">
                  <p>Kênh dẫn vật lý mang các bit nhị phân 0 và 1 di chuyển qua không gian không gian địa lý, chia thành 2 nhóm chính: <em>Có dây (Guided Media)</em> và <em>Không dây (Unguided Media)</em>.</p>
                </div>
              </div>
            </div>

            <p style="margin-top:16px;">Để hiểu sâu về môi trường truyền dẫn, chúng ta cùng phân tích 3 công nghệ cáp và sóng phổ biến nhất trong hạ tầng mạng hiện đại:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🧵</span> Cáp Xoắn Đôi (Twisted Pair - UTP / STP)</h4>
                  <span class="net-concept-badge">Đồng RJ45 • &le; 100 mét</span>
                </div>
                <div class="net-concept-body">
                  <p>Gồm 4 cặp dây đồng xoắn chặt vào nhau để tự triệt tiêu hiện tượng nhiễu điện từ (crosstalk). Sử dụng đầu nối chuẩn <strong>RJ45</strong> với chuẩn bấm cáp T568A hoặc T568B.</p>
                  <p><strong>Phân cấp:</strong> <code>Cat5e</code> (1 Gbps / 100MHz), <code>Cat6</code> (1-10 Gbps / 250MHz), <code>Cat6a</code> (10 Gbps lên tới 100m / 500MHz). Giới hạn vật lý tối đa: <strong>100 mét</strong>.</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>💡</span> Cáp Sợi Quang (Fiber Optic Cable)</h4>
                  <span class="net-concept-badge">Laser / LED • Hàng trăm km</span>
                </div>
                <div class="net-concept-body">
                  <p>Lõi làm bằng thủy tinh tinh khiết siêu mỏng, truyền dữ liệu bằng nguyên lý <strong>phản xạ toàn phần của ánh sáng</strong>. Hoàn toàn miễn nhiễm với sấm sét và nhiễu từ trường.</p>
                  <p><strong>Hai loại chính:</strong></p>
                  <ul style="margin:4px 0 0;padding-left:16px;line-height:1.6;">
                    <li><strong>Single-mode (Lõi 9µm):</strong> Dùng nguồn Laser, đi xa hàng chục đến hàng trăm km (cáp viễn thông, cáp biển).</li>
                    <li><strong>Multi-mode (Lõi 50/62.5µm):</strong> Dùng nguồn LED, đi dưới 500m (nội bộ Data Center).</li>
                  </ul>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>📡</span> Sóng Vô Tuyến Không Dây (Wireless)</h4>
                  <span class="net-concept-badge">RF • Không khí</span>
                </div>
                <div class="net-concept-body">
                  <p>Dùng sóng điện từ (Radio Frequency) lan truyền trong không khí, mang lại tính linh động tối đa cho thiết bị di động.</p>
                  <p><strong>Băng tần Wi-Fi phổ biến:</strong></p>
                  <ul style="margin:4px 0 0;padding-left:16px;line-height:1.6;">
                    <li><code>2.4 GHz</code>: Tầm phủ sóng rộng, đâm xuyên tường tốt, nhưng tốc độ thấp và dễ nghẽn (do trùng sóng lò vi sóng, bluetooth).</li>
                    <li><code>5 GHz</code>: Băng thông rộng, tốc độ cao, nhưng suy hao nhanh khi gặp vật cản.</li>
                    <li><code>6 GHz (Wi-Fi 6E/7)</code>: Kênh truyền cực rộng, độ trễ siêu thấp (&lt; 2ms).</li>
                  </ul>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-transmission-modes",
          title: "2. Chế độ truyền thông: Đơn công, Bán song công & Song công toàn phần",
          content: `
            <p>Trước khi các bit dữ liệu được đưa lên đường truyền, hai thiết bị phải thống nhất phương thức luân chuyển chiều dữ liệu. Có 3 <strong>Chế độ truyền thông (Transmission Modes)</strong> cơ bản:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>📻</span> 1. Đơn Công (Simplex)</h4>
                  <span class="net-concept-badge">Một chiều duy nhất</span>
                </div>
                <div class="net-concept-body">
                  <p>Dữ liệu <strong>chỉ có thể truyền theo một chiều duy nhất</strong> từ bên gửi sang bên nhận. Bên nhận hoàn toàn không có khả năng gửi dữ liệu ngược lại.</p>
                  <p><strong>Ví dụ thực tế:</strong> Đài phát thanh FM/AM, Truyền hình kỹ thuật số mặt đất, Bàn phím/Chuột máy tính gửi tín hiệu vào thùng máy CPU.</p>
                </div>
              </div>

              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>📻</span> 2. Bán Song Công (Half-Duplex)</h4>
                  <span class="net-concept-badge">Hai chiều nhưng luân phiên</span>
                </div>
                <div class="net-concept-body">
                  <p>Dữ liệu có thể truyền theo cả hai chiều, nhưng <strong>tại một thời điểm chỉ một bên được phép truyền</strong>. Nếu hai bên cùng nói một lúc sẽ xảy ra va chạm tín hiệu (Collision).</p>
                  <p><strong>Ví dụ thực tế:</strong> Bộ đàm cảnh sát (nhấn nút nói, buông nút nghe, kết thúc bằng từ "Over"), Mạng Wi-Fi truyền thống (chia sẻ chung kênh sóng), Thiết bị chia mạng cổ Hub.</p>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>📞</span> 3. Song Công Toàn Phần (Full-Duplex)</h4>
                  <span class="net-concept-badge">Hai chiều đồng thời</span>
                </div>
                <div class="net-concept-body">
                  <p>Dữ liệu có thể <strong>truyền và nhận đồng thời ở cả hai chiều tại cùng một thời điểm</strong> nhờ có các kênh vật lý tách biệt (dây truyền Tx và dây nhận Rx riêng).</p>
                  <p><strong>Ví dụ thực tế:</strong> Cuộc gọi điện thoại di động (hai người có thể nói cùng lúc), Mạng cáp quang viễn thông, Mạng LAN cắm vào Switch chuẩn Ethernet hiện đại.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-topologies",
          title: "3. Các mô hình Topo mạng (Network Topologies): Kiến trúc bố trí vật lý và logic",
          content: `
            <p><strong>Topo mạng (Network Topology)</strong> là cách thức bố trí, sắp xếp hình học của các thiết bị và các đường dây liên kết trong mạng máy tính. Topo quyết định trực tiếp tới chi phí thi công, độ phức tạp khi mở rộng và khả năng chống chịu sự cố của hệ thống.</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🚌</span> 1. Topo Tuyến Tính (Bus Topology)</h4>
                  <span class="net-concept-badge">Cổ điển • 1 Dây trục chính</span>
                </div>
                <div class="net-concept-body">
                  <p>Tất cả các máy tính nối vào một đường cáp trục chung (Backbone cable). Hai đầu cáp phải có điện trở kết thúc (Terminator) để hấp thụ tín hiệu, tránh hiện tượng phản xạ sóng.</p>
                  <p><strong>Ưu điểm:</strong> Rất tiết kiệm dây cáp, dễ lắp đặt cho mạng nhỏ.</p>
                  <p><strong>Nhược điểm chí tử:</strong> Nếu sợi dây trục chính bị đứt ở bất kỳ điểm nào, <strong>toàn bộ mạng sẽ tê liệt hoàn toàn</strong>. Khó dò tìm điểm đứt cáp.</p>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>⭐</span> 2. Topo Hình Sao (Star Topology)</h4>
                  <span class="net-concept-badge">Tiêu chuẩn vàng LAN</span>
                </div>
                <div class="net-concept-body">
                  <p>Mỗi máy tính nối trực tiếp bằng một sợi dây cáp riêng về một thiết bị tập trung ở giữa (<strong>Switch</strong> hoặc <strong>Hub</strong>).</p>
                  <p><strong>Ưu điểm vượt trội:</strong> Đứt dây của một máy thì chỉ riêng máy đó mất mạng, các máy khác vẫn hoạt động 100% bình thường. Rất dễ thêm bớt máy mới và quản lý sự cố.</p>
                  <p><strong>Nhược điểm:</strong> Tốn nhiều dây cáp hơn Bus; nếu thiết bị trung tâm (Switch) bị hỏng thì cả mạng sụp đổ (Điểm nghẽn lỗi đơn - SPOF).</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>💍</span> 3. Topo Vòng Khép Kín (Ring Topology)</h4>
                  <span class="net-concept-badge">Token Ring • Vòng tròn</span>
                </div>
                <div class="net-concept-body">
                  <p>Mỗi thiết bị nối với đúng hai thiết bị liền kề tạo thành một vòng tròn khép kín. Dữ liệu truyền tuần tự theo một chiều duy nhất thông qua một thẻ bài ảo gọi là <strong>Token</strong>.</p>
                  <p><strong>Ưu điểm:</strong> Không xảy ra va chạm dữ liệu (Zero collisions); hoạt động ổn định khi tải cao.</p>
                  <p><strong>Nhược điểm:</strong> Một máy tính bị tắt hoặc một đoạn cáp bị đứt có thể làm hỏng cả vòng Ring (trừ khi dùng công nghệ vòng kép FDDI có cơ chế tự vá).</p>
                </div>
              </div>

              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🕸️</span> 4. Topo Dạng Lưới (Mesh Topology)</h4>
                  <span class="net-concept-badge">Độ tin cậy tối thượng</span>
                </div>
                <div class="net-concept-body">
                  <p>Mỗi thiết bị đều có đường truyền trực tiếp kết nối tới tất cả các thiết bị còn lại trong mạng (Full Mesh) hoặc tới nhiều thiết bị quan trọng (Partial Mesh).</p>
                  <p><strong>Ưu điểm:</strong> Độ sẵn sàng cực cao; nếu đứt 1, 2 thậm chí 3 đường truyền thì dữ liệu vẫn tự tìm đường vòng để tới đích. Đây là kiến trúc của <strong>Mạng lõi Internet toàn cầu</strong>.</p>
                  <p><strong>Nhược điểm:</strong> Số lượng cổng cắm và dây cáp bùng nổ theo cấp số nhân ($O(n^2)$), chi phí cực kỳ đắt đỏ.</p>
                </div>
              </div>

              <div class="net-concept-card accent-rose">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🌳</span> 5. Topo Phân Cấp / Hình Cây (Tree / Hybrid)</h4>
                  <span class="net-concept-badge">Mạng doanh nghiệp lớn</span>
                </div>
                <div class="net-concept-body">
                  <p>Kết hợp nhiều topo hình sao lại với nhau theo cấu trúc hình cây phân tầng (Core Switch $\rightarrow$ Distribution Switch $\rightarrow$ Access Switch).</p>
                  <p><strong>Ưu điểm:</strong> Khả năng mở rộng không giới hạn cho các tòa nhà chọc trời, trường đại học hay khu công nghiệp lớn.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-lan-wan-internet",
          title: "4. Phân loại theo phạm vi: LAN, WAN và bản chất của Internet",
          content: `
            <p>Dựa trên quy mô không gian và phạm vi địa lý, mạng máy tính được phân định rõ ràng thành hai phân cấp nền tảng:</p>

            <div class="net-compare-grid">
              <div class="net-compare-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>🏠</span> Mạng Cục Bộ (LAN)</h4>
                  <span class="net-concept-badge">Local Area Network</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">📍 Không gian hoạt động</span>
                    <span class="net-spec-val">Phạm vi nhỏ hẹp: trong một phòng, ngôi nhà, trường học hay tòa văn phòng.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">👤 Quyền sở hữu &amp; Quản trị</span>
                    <span class="net-spec-val">Thuộc sở hữu riêng của một cá nhân, hộ gia đình hoặc một doanh nghiệp.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">⚡ Tốc độ truyền tải</span>
                    <span class="net-spec-val"><strong>Rất cao:</strong> phổ biến từ <code>1 Gbps</code> đến <code>10 Gbps</code>.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">⏱️ Độ trễ khứ hồi (RTT)</span>
                    <span class="net-spec-val"><strong>Cực thấp:</strong> thường dưới 1 mili-giây (<code>&lt; 1ms</code>).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔌 Thiết bị cốt lõi</span>
                    <span class="net-spec-val">Cáp xoắn đôi RJ45, Bộ chuyển mạch Switch, Điểm phát Wi-Fi (AP).</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Bản chất: Kết nối tốc độ cao nội bộ, chia sẻ máy in và tệp tin trong không gian gần.</p>
              </div>

              <div class="net-compare-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>🌍</span> Mạng Diện Rộng (WAN)</h4>
                  <span class="net-concept-badge">Wide Area Network</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">📍 Không gian hoạt động</span>
                    <span class="net-spec-val">Phạm vi rộng lớn: liên tỉnh, xuyên biên giới quốc gia, phủ sóng toàn cầu.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">👤 Quyền sở hữu &amp; Quản trị</span>
                    <span class="net-spec-val">Do các nhà cung cấp dịch vụ viễn thông (ISP: Viettel, VNPT, FPT...) vận hành.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">⚡ Tốc độ truyền tải</span>
                    <span class="net-spec-val">Thấp hơn LAN, phụ thuộc vào gói cước viễn thông và khoảng cách địa lý.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">⏱️ Độ trễ khứ hồi (RTT)</span>
                    <span class="net-spec-val"><strong>Cao hơn:</strong> từ <code>15ms</code> (trong nước) đến <code>200ms+</code> (vượt đại dương).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔌 Thiết bị cốt lõi</span>
                    <span class="net-spec-val">Bộ định tuyến Router viễn thông, Cáp quang biển, Trạm thông tin vệ tinh.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Bản chất: Hạ tầng viễn thông khổng lồ bắc cầu liên kết các mạng LAN độc lập lại với nhau.</p>
              </div>
            </div>

            <div class="net-topo-box" style="margin-top:16px;">
              <div class="net-topo-title">🌐 BẢN CHẤT INTERNET: LIÊN MẠNG CỦA CÁC MẠNG ĐỘC LẬP</div>
              <p style="margin:0;line-height:1.65;">Từ <em>Internet</em> là từ viết tắt của <strong>Inter-network</strong> (liên kết giữa các mạng). Không có một chiếc máy chủ đơn độc nào mang tên 'Internet'. Thay vào đó, <strong>Internet là mạng lưới toàn cầu khổng lồ kết nối hàng triệu mạng LAN độc lập lại với nhau</strong> thông qua hạ tầng WAN của các nhà mạng viễn thông, dùng chung một bộ ngôn ngữ quy tắc thống nhất: <strong>Bộ giao thức TCP/IP</strong>.</p>
            </div>
          `
        },
        {
          id: "sec-network-metrics",
          title: "5. Năm chỉ số hiệu năng mạng cốt lõi: Băng thông, Độ trễ, Thông lượng, Jitter & Rớt gói",
          content: `
            <p>Để đánh giá một đường truyền mạng nhanh hay chậm, ổn định hay chập chờn, kỹ sư mạng không dùng cảm tính mà dựa vào <strong>5 chỉ số kỹ thuật định lượng</strong> sau đây:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🏎️</span> 1. Băng Thông (Bandwidth)</h4>
                  <span class="net-concept-badge">Dung tích ống nước</span>
                </div>
                <div class="net-concept-body">
                  <p>Số lượng bit dữ liệu tối đa mà đường truyền có thể mang đi trong 1 giây trên lý thuyết. Đơn vị tính: <code>bps</code> (bit/s), <code>Mbps</code>, <code>Gbps</code>.</p>
                  <p><em>Ví dụ:</em> Gói cước cáp quang gia đình <code>300 Mbps</code> nghĩa là mỗi giây đường truyền có thể đẩy tối đa 300 triệu bit.</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>⏱️</span> 2. Độ Trễ (Latency &amp; RTT)</h4>
                  <span class="net-concept-badge">Thời gian di chuyển</span>
                </div>
                <div class="net-concept-body">
                  <p>Thời gian cần thiết để một gói tin di chuyển từ máy gửi đến máy nhận (One-way Delay) hoặc thời gian đi rồi quay về (<strong>Round-Trip Time - RTT</strong>). Đơn vị tính: <strong>mili-giây (ms)</strong>.</p>
                  <p><em>Ý nghĩa:</em> Chơi game online hoặc gọi video thoại đòi hỏi độ trễ cực thấp (dưới <code>30ms</code>); độ trễ cao sẽ gây hiện tượng giật lag.</p>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🚚</span> 3. Thông Lượng (Throughput)</h4>
                  <span class="net-concept-badge">Tốc độ thực tế nhận được</span>
                </div>
                <div class="net-concept-body">
                  <p>Tốc độ truyền dữ liệu <strong>thực tế đo được</strong> tại một thời điểm, luôn nhỏ hơn hoặc bằng Băng thông do bị ảnh hưởng bởi nghẽn mạng, chi phí tiêu đề (Overhead) và lỗi truyền dẫn.</p>
                  <p><em>Phân biệt:</em> Băng thông là biển báo tốc độ tối đa cho phép của đường cao tốc (120 km/h); Thông lượng là tốc độ xe bạn đang chạy thực tế giữa dòng xe đông đúc (60 km/h).</p>
                </div>
              </div>

              <div class="net-concept-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>〰️</span> 4. Độ Biến Động Trễ (Jitter)</h4>
                  <span class="net-concept-badge">Sự chập chờn của RTT</span>
                </div>
                <div class="net-concept-body">
                  <p>Sự sai lệch, dao động về thời gian đến của các gói tin kế tiếp nhau. Ví dụ: gói 1 trễ 20ms, gói 2 trễ 80ms, gói 3 trễ 25ms $\rightarrow$ Jitter cao.</p>
                  <p><em>Ảnh hưởng:</em> Jitter cao là kẻ thù số 1 của các cuộc gọi âm thanh VoIP và Livestream, làm tiếng nói bị giật cục hoặc đứt quãng.</p>
                </div>
              </div>

              <div class="net-concept-card accent-rose">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>📉</span> 5. Tỷ Lệ Mất Gói (Packet Loss)</h4>
                  <span class="net-concept-badge">Phần trăm rơi rụng</span>
                </div>
                <div class="net-concept-body">
                  <p>Tỷ lệ phần trăm gói tin bị mất trên đường truyền do nghẽn hàng đợi tại Router (Buffer Overflow) hoặc do nhiễu sóng vật lý.</p>
                  <p><em>Tiêu chuẩn:</em> Mạng tốt phải có tỷ lệ mất gói <code>0%</code>. Chỉ cần mất gói $1 - 2\\%$ là trải nghiệm xem video hay chơi game đã bị suy giảm rõ rệt.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-worked-example",
          title: "6. Ví dụ có lời giải (Worked Example): Phân tích số lượng cáp Topo Mesh vs. Star",
          content: `
            <p><strong>Bài toán thiết kế hạ tầng:</strong> Một công ty kiến trúc có $n = 6$ chiếc máy trạm đồ họa cần kết nối mạng để truyền các bản vẽ 3D nặng hàng trăm Megabyte. Hãy cùng phân tích chi phí phần cứng và số lượng dây cáp giữa hai phương án thi công:</p>

            <div class="net-calc-box">
              <div class="net-calc-header">
                <h4 class="net-calc-title">🧮 Lời giải phân tích chi phí thi công Topo Mesh vs. Star</h4>
                <span class="net-calc-badge">Worked Example</span>
              </div>
              <div class="net-calc-body">
                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 1: Tính toán số cáp và cổng mạng với Phương án 1 — Lưới toàn phần (Full Mesh Topology)</div>
                  <pre class="net-calc-formula">Trong mô hình Mesh toàn phần, mỗi máy tính phải có một đường truyền trực tiếp tới tất cả (n - 1) máy còn lại:
- Công thức tính số cạnh của đồ thị liên thông đầy đủ:
  $$N_{\\text{mesh}} = \\frac{n(n - 1)}{2} = \\frac{6 \\times (6 - 1)}{2} = \\frac{30}{2} = 15\\text{ sợi cáp.}$$
- Số cổng mạng (NIC) mỗi máy trạm cần trang bị:
  $$\\text{Số cổng/máy} = n - 1 = 6 - 1 = 5\\text{ cổng mạng RJ45 riêng biệt!}$$</pre>
                </div>

                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 2: Tính toán số cáp và cổng mạng với Phương án 2 — Mô hình hình sao dùng Switch (Star Topology)</div>
                  <pre class="net-calc-formula">Trong mô hình hình sao, tất cả các máy trạm chỉ cần kéo một sợi cáp duy nhất về bộ chuyển mạch trung tâm (Switch 8-Port):
- Số cáp cần sử dụng:
  $$N_{\\text{star}} = n = 6\\text{ sợi cáp.}$$
- Số cổng mạng mỗi máy trạm cần trang bị:
  $$\\text{Số cổng/máy} = 1\\text{ cổng duy nhất (có sẵn trên bo mạch chủ).}$$</pre>
                </div>

                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 3: Đánh giá khả năng mở rộng khi công ty phát triển lên 50 máy ($n = 50$)</div>
                  <pre class="net-calc-formula">- Nếu dùng Topo Mesh:
  $$N_{\\text{mesh}} = \\frac{50 \\times 49}{2} = 1225\\text{ sợi cáp!}$$
  Mỗi máy tính phải cắm tới 49 sợi dây cáp $\\rightarrow$ Điều không tưởng trong thực tế!
- Nếu dùng Topo Star:
  $$N_{\\text{star}} = 50\\text{ sợi cáp (chỉ cần dùng một chiếc Switch 48-52 cổng).}$$</pre>
                </div>

                <div class="net-calc-result">
                  ✓ Kết luận thực tiễn: Topo hình sao (Star Topology) thông qua bộ chuyển mạch Switch giúp giảm độ phức tạp nối dây từ cấp số nhân $O(n^2)$ xuống tuyến tính $O(n)$, tiết kiệm hơn $60\\%$ chi phí dây cáp cho văn phòng nhỏ và là kiến trúc thống trị tuyệt đối trong toàn bộ các mạng LAN trên thế giới.
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-lab",
          title: "7. Thực hành (Lab 0.1): Kiểm tra thông mạng bằng lệnh ping",
          content: `
            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Mở Terminal và phát lệnh kiểm tra đường truyền</h4>
              </div>
              <p class="net-step-desc">Lệnh <code>ping</code> hoạt động tương tự như sóng siêu âm dò tìm của tàu ngầm: phát một gói tin thăm dò (ICMP Echo Request) tới đích và đo thời gian chờ gói phản hồi (ICMP Echo Reply) quay trở về.</p>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Quan sát dòng thống kê cuối cùng hiện <code>0% loss</code> (Windows) hoặc <code>0% packet loss</code> (Linux) và thời gian phản hồi <code>time</code> nằm trong khoảng <code>15ms - 60ms</code>.</span>
              </div>
            </div>
          `,
          codeExamples: [
            {
              title: "Thực hành trên Windows (CMD hoặc PowerShell)",
              lang: "cmd",
              code: "ping 8.8.8.8",
              output: `Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=23ms TTL=117
Reply from 8.8.8.8: bytes=32 time=24ms TTL=117
Reply from 8.8.8.8: bytes=32 time=22ms TTL=117
Reply from 8.8.8.8: bytes=32 time=25ms TTL=117

Ping statistics for 8.8.8.8:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 22ms, Maximum = 25ms, Average = 23ms`,
              annotations: [
                { line: 1, text: "Gửi gói tin thăm dò tới IP 8.8.8.8 (máy chủ DNS công cộng của Google trên Internet)." },
                { line: 2, text: "bytes=32: Dung lượng dữ liệu thử nghiệm trong mỗi gói tin là 32 byte." },
                { line: 3, text: "time=23ms: Độ trễ khứ hồi (RTT) mất 23 phần nghìn giây để tín hiệu đi và về." },
                { line: 4, text: "TTL=117: Time To Live - số bước nhảy (hop) gói tin còn được phép đi qua trước khi tự hủy." },
                { line: 8, text: "Lost = 0 (0% loss): Đủ 4/4 gói quay về nguyên vẹn, đường truyền ổn định 100%." }
              ]
            },
            {
              title: "Thực hành trên Linux / macOS / WSL (Bash Terminal)",
              lang: "bash",
              code: "# Trên Linux cần thêm cờ -c 4 để giới hạn gửi đúng 4 gói tin\nping -c 4 8.8.8.8",
              output: `PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=22.8 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=23.1 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=22.4 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=117 time=24.0 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 22.418/23.082/24.015/0.583 ms`,
              annotations: [
                { line: 2, text: "Cờ -c 4 giúp lệnh tự động dừng sau đúng 4 gói tin thay vì chạy mãi mãi." },
                { line: 9, text: "0% packet loss xác nhận đường truyền từ card mạng của bạn ra Internet hoàn toàn thông suốt." }
              ]
            }
          ]
        },
        {
          id: "sec-incident-study",
          title: "8. Góc sự cố thực tế: Ảo giác Wi-Fi đầy vạch",
          content: `
            <div class="net-incident-card">
              <div class="net-incident-header">
                <span>🚨</span>
                <span>CASE STUDY: 'SÓNG WI-FI CĂNG ĐÉT NHƯNG KHÔNG VÀO ĐƯỢC INTERNET'</span>
              </div>
              <div class="net-incident-body">
                <p><strong>Hiện tượng:</strong> Sáng thứ Hai, toàn bộ nhân viên một công ty phàn nàn không gửi được email và không vào được trang web công ty. Tuy nhiên, góc dưới màn hình laptop của ai cũng hiển thị 4 vạch sóng Wi-Fi căng tràn.</p>
                <p><strong>Khám nghiệm bản chất:</strong> Sóng Wi-Fi chỉ là sợi dây vô hình kết nối giữa laptop của bạn tới cục phát Access Point gắn trên trần nhà. Khi máy xúc đào đường ngoài ngõ vô tình làm đứt sợi cáp quang của nhà mạng ISP dẫn vào tòa nhà:</p>
                <div class="net-verify-box">
                  <span class="net-verify-icon">✓</span>
                  <span><strong>Kết luận chẩn đoán:</strong> Liên kết không dây LAN (Laptop ➔ AP) vẫn hoạt động hoàn hảo nên máy báo đầy sóng. Nhưng liên kết WAN (Router ➔ ISP) đã bị đứt lìa. Vì vậy, sóng Wi-Fi đầy vạch hoàn toàn KHÔNG đồng nghĩa với việc đã thông ra Internet!</span>
                </div>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Đồng nhất 'Internet' với 'Web' (World Wide Web)",
            content: "Nhiều người nghĩ 'vào mạng' tức là 'lướt web'. Thực tế: Internet là cơ sở hạ tầng giao thông (đường ray, nhà ga, biển báo); còn Web (các trang mạng mở bằng trình duyệt qua giao thức HTTP/HTTPS) chỉ là một chiếc tàu hỏa chạy trên đường ray đó. Ngoài Web, hạ tầng Internet còn chở rất nhiều loại phương tiện khác: ứng dụng gửi nhận Email (SMTP/IMAP), gọi điện thoại mạng (VoIP), nhắn tin trò chuyện Zalo/Telegram, tải tệp BitTorrent, dịch vụ đồng bộ giờ giấc (NTP)."
          },
          {
            title: "Bắt được sóng Wi-Fi là chắc chắn vào được Internet",
            content: "Sóng Wi-Fi chỉ đơn thuần là sợi dây vô hình kết nối giữa điện thoại/laptop của bạn tới chiếc Access Point (cục Router Wi-Fi) trong nhà bạn. Nếu cáp quang của nhà mạng từ cột điện ngoài đường vào nhà bạn bị đứt, hoặc nhà mạng cắt dịch vụ do chưa đóng cước: máy tính của bạn vẫn bắt sóng Wi-Fi căng đét, nhưng biểu tượng mạng sẽ hiện dấu chấm than tam giác vàng kèm thông báo 'No Internet Access'!"
          },
          {
            title: "Nghĩ rằng Internet hoạt động chủ yếu qua vệ tinh không gian",
            content: "Thực tế hơn 95% lưu lượng dữ liệu xuyên đại lục trên toàn cầu được truyền tải qua các đường cáp sợi quang đặt chìm dưới đáy biển (Submarine Communications Cables). Vệ tinh (như Starlink hay địa tĩnh) chỉ đóng vai trò phủ sóng ở vùng sâu, vùng xa, hải đảo hoặc trên máy bay/sa mạc do chi phí đắt đỏ và độ trễ cao."
          }
        ],
        tips: [
          {
            title: "Mẹo chẩn đoán siêu tốc khi mất mạng",
            content: "Khi không mở được trang web, đừng vội gọi tổng đài nhà mạng! Hãy mở Terminal và gõ 'ping 8.8.8.8'. Nếu có phản hồi (Reply): card mạng, cáp LAN và đường truyền Internet đều tốt, vấn đề chỉ nằm ở máy chủ phân giải tên miền (DNS) của bạn. Chúng ta sẽ làm chủ kỹ năng này ở Module 7 & 10."
          }
        ]
      },
      exercises: [
        {
          id: "ex-01-1",
          level: "Dễ",
          title: "Bài 1: Nhận diện và phân loại thiết bị",
          problem: "Hãy phân loại 6 thiết bị sau vào hai nhóm: **Thiết bị đầu cuối (End Device)** và **Thiết bị trung gian (Intermediary Device)**:\n\n1. Điện thoại iPhone\n2. Bộ chuyển mạch Cisco Switch\n3. Máy in hóa đơn bán hàng\n4. Bộ định tuyến Router Wi-Fi\n5. Máy chủ cơ sở dữ liệu (Database Server)\n6. Thiết bị tường lửa Firewall",
          hint: "Hãy tự hỏi: Thiết bị này có trực tiếp tạo ra hoặc đọc nội dung dữ liệu cho người dùng không, hay nó chỉ chuyển tiếp dòng dữ liệu của thiết bị khác?",
          solutionCode: `# THIẾT BỊ ĐẦU CUỐI (End Devices - nơi sinh/nhận dữ liệu):
- (1) Điện thoại iPhone
- (3) Máy in hóa đơn bán hàng
- (5) Máy chủ cơ sở dữ liệu (Database Server)

# THIẾT BỊ TRUNG GIAN (Intermediary Devices - điều phối/chuyển tiếp):
- (2) Bộ chuyển mạch Cisco Switch
- (4) Bộ định tuyến Router Wi-Fi
- (6) Thiết bị tường lửa Firewall`,
          explanation: "Thiết bị đầu cuối (Host/End Device) là nơi bắt đầu hoặc đích đến của dữ liệu. Thiết bị trung gian (Intermediary Device) nằm trên đường truyền để tái tạo tín hiệu và dẫn hướng gói tin."
        },
        {
          id: "ex-01-2",
          level: "Vừa",
          title: "Bài 2: Tính toán số lượng đường dây nối mạng",
          problem: "Một phòng thí nghiệm trường đại học có 8 máy tính ($n = 8$).\n\na) Nếu kết nối theo dạng lưới (Mesh Topology - nối trực tiếp từng cặp máy bằng dây cáp riêng), cần bao nhiêu sợi cáp?\nb) Nếu chuyển sang dùng mô hình hình sao (Star Topology) kết nối qua 1 bộ Switch trung tâm thì cần bao nhiêu sợi cáp và tiết kiệm được bao nhiêu phần trăm số dây cáp?",
          hint: "Sử dụng công thức tính số cạnh của đồ thị đầy đủ N = n(n - 1) / 2 và so sánh với mô hình Switch (mỗi máy 1 dây).",
          solutionCode: `# a) Tính số cáp theo mô hình lưới (Mesh Topology):
N_mesh = (n * (n - 1)) / 2 = (8 * 7) / 2 = 28 sợi cáp

# b) Tính số cáp theo mô hình hình sao (Star Topology qua Switch):
N_star = n = 8 sợi cáp

# Số cáp tiết kiệm được:
N_saved = 28 - 8 = 20 sợi cáp
Tiết kiệm: (20 / 28) * 100% ≈ 71.4%`,
          explanation: "Mô hình Switch giúp giảm độ phức tạp từ O(n^2) xuống O(n), mỗi máy chỉ cần đúng 1 card mạng và 1 sợi dây nối về bộ chuyển mạch trung tâm."
        },
        {
          id: "ex-01-3",
          level: "Khó",
          title: "Bài 3: Đọc hiểu và phân tích kết quả lệnh ping",
          problem: "Người dùng gõ lệnh `ping 8.8.8.8` và nhận được thông báo `Request timed out` cho cả 4 gói tin gửi đi (Lost = 4, 100% loss).\n\nĐiều này nói lên điều gì về trạng thái kết nối mạng của máy tính đó? Hãy nêu ít nhất 3 nguyên nhân kỹ thuật phổ biến nhất.",
          hint: "Request timed out nghĩa là máy gửi đã phát yêu cầu đi nhưng quá thời hạn chờ quy định mà không nhận được tín hiệu trả lời nào.",
          solutionCode: `# KẾT LUẬN: Mất kết nối hoàn toàn từ máy tính ra Internet ngoài (100% Packet Loss)

# 3 NGUYÊN NHÂN PHỔ BIẾN NHẤT:
1. Mất kết nối vật lý: Tuột dây cáp LAN, Router mất nguồn, đứt cáp quang ISP.
2. Sai cấu hình mạng: Mất cổng mặc định (Default Gateway) hoặc chưa nhận được địa chỉ IP hợp lệ.
3. Tường lửa chặn: Firewall nội bộ chặn toàn bộ các gói tin giao thức ICMP Echo.`,
          explanation: "Khi 100% gói tin bị timeout, tín hiệu không thể hoàn thành hành trình khứ hồi. Cần kiểm tra theo quy trình từ tầng vật lý (dây cáp, đèn router) lên đến cấu hình IP và tường lửa."
        }
      ],
      summary: [
        "1. Mạng máy tính là hệ thống kết nối từ hai hay nhiều thiết bị tính toán để trao đổi dữ liệu số và chia sẻ tài nguyên dùng chung.",
        "2. Mọi hệ thống mạng đều được cấu thành từ 3 thành phần vật lý: Thiết bị đầu cuối (Host), Thiết bị trung gian (Switch/Router) và Môi trường truyền dẫn (Cáp UTP, Cáp quang, Sóng vô tuyến).",
        "3. Chế độ truyền thông gồm 3 loại: Đơn công (Simplex - 1 chiều), Bán song công (Half-Duplex - 2 chiều luân phiên), và Song công toàn phần (Full-Duplex - 2 chiều đồng thời).",
        "4. Topo hình sao (Star Topology) dùng Switch là kiến trúc thống trị trong mạng LAN hiện đại nhờ tính độc lập và khả năng cô lập sự cố vượt trội so với Bus hay Mesh.",
        "5. Năm chỉ số đo lường hiệu năng mạng sống còn: Băng thông (Bandwidth), Độ trễ (Latency/RTT), Thông lượng (Throughput), Độ biến động trễ (Jitter) và Tỷ lệ mất gói (Packet Loss)."
      ],
      selfReviewQuestions: [
        "1. Nếu cơ quan bạn có 10 chiếc máy tính và 2 máy in mạng, bạn sẽ chọn kết nối trực tiếp từng cặp máy (Mesh) hay dùng Switch? Tại sao?",
        "2. Biểu tượng Wi-Fi trên laptop báo đầy vạch nhưng trình duyệt không mở được trang báo nào, nguyên nhân do đâu?",
        "3. Phân biệt sự khác nhau giữa Băng thông (Bandwidth) và Thông lượng (Throughput) bằng một ví dụ đời thường?",
        "4. Khi lệnh ping báo '0% packet loss' với thời gian 25ms, điều đó chứng minh được những điều gì?"
      ],
      reflectionQuestion: "Nếu bạn gõ lệnh `ping 127.0.0.1` trên máy tính (ngay cả khi đã rút dây mạng và tắt hoàn toàn Wi-Fi) thì tín hiệu có bay ra ngoài không khí không? Tại sao thời gian phản hồi luôn là `< 1ms`?",
      reflectionHint: "`127.0.0.1` là địa chỉ Loopback (Localhost), đại diện cho chính cỗ máy tính của bạn. Gói tin không hề rời khỏi máy; nó được hệ điều hành gửi vào ngăn xếp giao thức mạng (TCP/IP Stack) trong RAM rồi quay đầu ngay lập tức. Vì chạy hoàn toàn trong bộ nhớ với tốc độ điện tử nên độ trễ gần như bằng 0 (`< 1ms`). Lệnh này là 'chiếc nhiệt kế' kiểm tra xem phần mềm mạng của hệ điều hành có đang khỏe mạnh hay không!",
      nextLessonPreview: "Bài 0.2: Mô hình Client - Server và Peer-to-Peer (P2P) — Khám phá cách hai máy tính phân định vai trò: Ai là người phục vụ (Server) và ai là người yêu cầu (Client)?"
    },

    /* =========================================================================
       BÀI 0.2: MÔ HÌNH CLIENT - SERVER VÀ PEER-TO-PEER (P2P)
       ========================================================================= */
    {
      id: "net-b-0-02",
      number: "0.2",
      title: "Mô hình Client - Server và Peer-to-Peer (P2P): Ai phục vụ ai?",
      subtitle: "Giải phẫu kiến trúc phần mềm mạng: Khách - Chủ tập trung vs. Ngang hàng phi tập trung, kiến trúc đa tầng (3-tier), bài toán phân phối tệp dung lượng lớn và cân bằng tải",
      level: "Cơ bản",
      duration: "45 phút",
      objectives: [
        "Định nghĩa được bản chất cốt lõi của Client (tiến trình yêu cầu) và Server (tiến trình phục vụ) dưới góc độ phần mềm.",
        "Nắm vững kiến trúc phần mềm đa tầng: 2-Tier, 3-Tier (Client ➔ App Server ➔ Database Server) và vai trò của Cân bằng tải (Load Balancer).",
        "So sánh được ưu điểm và nhược điểm giữa hai kiến trúc mạng kinh điển: Client - Server (Tập trung) và Peer-to-Peer (Ngang hàng/Phân tán).",
        "Giải thích được hiện tượng Điểm nghẽn lỗi đơn (Single Point of Failure - SPOF) và cách BitTorrent / P2P giải quyết bài toán phân phối dữ liệu khổng lồ.",
        "Tự tay khởi chạy một Web Server bằng lệnh Python có sẵn, dùng Client gửi yêu cầu HTTP Request và đọc luồng phản hồi HTTP Response thực tế."
      ],
      intuition: {
        title: "Bữa Ăn Tại Nhà Hàng Sang Trọng vs. Buổi Tiệc Ngọt Góp Món (Potluck Party)",
        metaphor: "Hãy tưởng tượng hai cách tổ chức một bữa tiệc ăn uống: (1) Mô hình Khách - Chủ (Client-Server) giống như bạn bước vào một nhà hàng: Bạn là Khách (Client), ngồi vào bàn xem thực đơn rồi chủ động vẫy bồi bàn gọi món (gửi Request). Người đầu bếp trong bếp là Chủ (Server), nhận phiếu gọi món, nấu nướng rồi bưng đồ ăn ra cho bạn (trả Response). Người đầu bếp không bao giờ tự tiện đến nhà bạn để giao đồ ăn nếu bạn chưa gọi. Nhưng nếu nhà hàng chỉ có 1 đầu bếp duy nhất mà có 500 thực khách ùa vào cùng một lúc, nhà bếp sẽ sập nguồn (Server Overload/Crash)! (2) Mô hình Ngang hàng (Peer-to-Peer - P2P) giống như một buổi tiệc ngọt tự phát (Potluck): Mỗi người tham gia tự mang theo một món ăn hoặc thức uống. Bạn chia sẻ bánh ngọt cho người bên cạnh, người đó lại rót nước ngọt cho bạn. Không có ai làm 'ông chủ duy nhất', tất cả mọi người đều vừa là người thưởng thức, vừa là người phục vụ. Càng đông người đến dự tiệc thì lượng đồ ăn càng dồi dào, không lo bị quá tải!",
        boundary: "Điểm phép ẩn dụ này không còn đúng: Trong đời sống, người đầu bếp và thực khách là hai con người hoàn toàn khác nhau với vai trò cố định suốt buổi. Nhưng trong mạng máy tính, 'Client' và 'Server' không phải là chiếc máy tính vật lý; chúng là VAI TRÒ CỦA CÁC TIẾN TRÌNH PHẦN MỀM (Software Processes). Chiếc máy tính của bạn khi mở Chrome xem tin tức thì đóng vai trò Client, nhưng chỉ cần chạy 1 dòng lệnh mở dịch vụ chia sẻ file, chính cỗ máy đó ngay lập tức biến thành Server phục vụ cả văn phòng!",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">⚖️</span>
              <span class="net-arch-title">ĐỐI CHIẾU KIẾN TRÚC: CLIENT - SERVER TẬP TRUNG VS. P2P PHÂN TÁN</span>
            </div>
            <div class="net-arch-layers">
              <!-- Nhánh 1: Client Server -->
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🏛️ Mô hình 1: Client - Server (Kiến trúc tập trung - Centralized)</span>
                  <span class="net-arch-layer-badge">Phổ biến 90% Web &amp; App</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Client (Chủ động):</strong> Gửi <code>HTTP Request: GET /index.html</code></div>
                  <div class="net-arch-node"><strong>Server (Thụ động):</strong> Lắng nghe cổng 80/443, trả <code>HTTP Response: 200 OK</code></div>
                  <div class="net-arch-node"><strong>Nhược điểm:</strong> Server là Điểm nghẽn lỗi đơn (SPOF - Single Point of Failure)</div>
                </div>
              </div>

              <div class="net-arch-arrow">VS. SỰ KHÁC BIỆT VỀ DÒNG CHẢY DỮ LIỆU</div>

              <!-- Nhánh 2: Peer to Peer -->
              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🕸️ Mô hình 2: Peer-to-Peer (Kiến trúc phân tán ngang hàng - Decentralized)</span>
                  <span class="net-arch-layer-badge">BitTorrent &amp; Blockchain</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Mỗi nút là một Peer:</strong> Đóng đồng thời cả 2 vai trò Client (Leecher) + Server (Seeder)</div>
                  <div class="net-arch-node"><strong>Dòng chảy phân tán:</strong> Tải các mảnh file (chunks) chéo nhau giữa các máy tham gia</div>
                  <div class="net-arch-node"><strong>Ưu điểm:</strong> Càng nhiều người tham gia mạng, tốc độ tải càng nhanh, không sợ sập server</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-core-concept",
          title: "1. Bản chất cốt lõi: Client và Server là Phần Mềm, không phải Phần Cứng!",
          content: `
            <p>Rất nhiều người mới học mạng thường lầm tưởng rằng: <em>'Server là chiếc máy tính to đùng hình chữ nhật đặt trong phòng lạnh, còn Client là chiếc laptop cá nhân ở nhà'</em>. <strong>Đây là một hiểu lầm kinh điển!</strong></p>
            <p>Trong khoa học mạng máy tính, <strong>Client</strong> và <strong>Server</strong> là định danh dành cho <strong>Tiến trình phần mềm (Software Process)</strong> và mối quan hệ vai trò giữa chúng:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>👤</span> 1. Tiến Trình Client</h4>
                  <span class="net-concept-badge">Bên Yêu Cầu (Active)</span>
                </div>
                <div class="net-concept-body">
                  <p>Là phần mềm <strong>luôn chủ động khởi xướng kết nối</strong> trước. Nó soạn một bức thông điệp yêu cầu (<strong>Request</strong>), gửi tới Server và kiên nhẫn chờ nhận kết quả phản hồi.</p>
                  <p><strong>Ví dụ:</strong> Trình duyệt web Google Chrome, Ứng dụng xem phim Netflix, Phần mềm gửi thư điện tử Outlook, Game online client.</p>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🖥️</span> 2. Tiến Trình Server</h4>
                  <span class="net-concept-badge">Bên Phục Vụ (Passive)</span>
                </div>
                <div class="net-concept-body">
                  <p>Là phần mềm <strong>ở trạng thái thụ động lắng nghe</strong> (Listen) liên tục 24/7 trên một số hiệu cổng mạng (Port) xác định, chờ đợi yêu cầu từ các Client gửi đến, xử lý logic và gửi trả lời (<strong>Response</strong>).</p>
                  <p><strong>Ví dụ:</strong> Web Server Nginx/Apache (Port 80/443), Database Server MySQL (Port 3306), Mail Server Postfix (Port 25/587), DNS Server BIND (Port 53).</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🔄</span> 3. Nút Ngang Hàng Peer</h4>
                  <span class="net-concept-badge">Servent = Server + Client</span>
                </div>
                <div class="net-concept-body">
                  <p>Trong mô hình P2P, mỗi máy tính tham gia mạng (Node) không bị bó buộc vào 1 vai trò duy nhất. Nó vừa đóng vai trò <strong>Client</strong> (khi kéo các mẩu file từ máy bạn bè về) vừa đóng vai trò <strong>Server</strong> (khi bắn các mẩu file mình có cho người khác).</p>
                  <p><strong>Ví dụ:</strong> BitTorrent Client, Nút mạng Bitcoin / Ethereum, Windows Update Delivery Optimization.</p>
                </div>
              </div>
            </div>

            <p style="margin-top:14px;"><strong>Quy tắc bất biến:</strong> Server không bao giờ tự ý 'gọi điện' cho Client nếu Client chưa hề gửi yêu cầu hoặc thiết lập kết nối trước. Mọi giao dịch Client-Server đều bắt đầu từ phía Client!</p>
          `
        },
        {
          id: "sec-tier-architecture",
          title: "2. Kiến trúc đa tầng (Tier Architecture): Từ 2-Tier đến 3-Tier trong Thực tế",
          content: `
            <p>Trong các ứng dụng quy mô thực tế ngày nay, mô hình Client-Server hiếm khi chỉ gồm đúng 1 Client nói chuyện với 1 Server đơn độc. Để đảm bảo an toàn dữ liệu và khả năng chịu tải hàng triệu người dùng, hệ thống được phân thành các tầng kiến trúc (Tier Architecture):</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🏛️</span> 1. Kiến Trúc 2 Tầng (2-Tier)</h4>
                  <span class="net-concept-badge">Client ➔ Database</span>
                </div>
                <div class="net-concept-body">
                  <p>Client cài đặt trên máy người dùng (thường là phần mềm viết bằng C# / Java) trực tiếp kết nối qua mạng vào Database Server để truy vấn dữ liệu.</p>
                  <p><strong>Rủi ro:</strong> Thông tin đăng nhập tài khoản Database bị lộ ngay trên máy Client; khó nâng cấp logic nghiệp vụ khi có hàng nghìn máy trạm.</p>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🥞</span> 2. Kiến Trúc 3 Tầng Chuẩn Mực (3-Tier)</h4>
                  <span class="net-concept-badge">Client ➔ App ➔ DB</span>
                </div>
                <div class="net-concept-body">
                  <p>Mô hình thống trị toàn bộ thế giới Web và Ứng dụng di động hiện đại:</p>
                  <ul style="margin:4px 0 0;padding-left:16px;line-height:1.6;">
                    <li><strong>Tầng 1 (Presentation):</strong> Trình duyệt hoặc Mobile App hiển thị giao diện.</li>
                    <li><strong>Tầng 2 (Application / Business):</strong> Máy chủ Node.js/Java/Python xử lý tính toán, phân quyền và kiểm tra hợp lệ.</li>
                    <li><strong>Tầng 3 (Data Layer):</strong> Cụm Database (PostgreSQL, MySQL) đặt sau tường lửa kín, chỉ chấp nhận kết nối từ Application Server.</li>
                  </ul>
                </div>
              </div>

              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>⚖️</span> 3. Bộ Cân Bằng Tải (Load Balancer)</h4>
                  <span class="net-concept-badge">Phân phối lưu lượng</span>
                </div>
                <div class="net-concept-body">
                  <p>Khi có 100.000 người cùng truy cập, một máy chủ sẽ quá tải. Người ta đặt một <strong>Load Balancer (HAProxy, Nginx)</strong> ở cửa ngõ để chia đều yêu cầu cho hàng chục máy chủ phía sau theo các thuật toán (Round Robin, Least Connections).</p>
                  <p><em>Lợi ích:</em> Triệt tiêu hoàn toàn Điểm nghẽn lỗi đơn (SPOF); nếu 1 máy chủ bị cháy thì các máy chủ còn lại vẫn gánh tải bình thường.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-matrix-comparison",
          title: "3. Ma trận so sánh: Kiến trúc Client - Server vs. Peer-to-Peer (P2P)",
          content: `
            <p>Để hiểu rõ khi nào nên áp dụng mô hình nào trong thực tế kỹ thuật, hãy cùng phân tích 5 tiêu chí then chốt đặt lên bàn cân:</p>

            <div class="net-compare-grid">
              <div class="net-compare-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>🏛️</span> Mô hình Khách - Chủ (Client - Server)</h4>
                  <span class="net-concept-badge">Centralized</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">🏗️ Kiến trúc dữ liệu</span>
                    <span class="net-spec-val"><strong>Tập trung:</strong> Mọi dữ liệu và quyền kiểm soát đặt tại một hoặc vài cụm máy chủ trung tâm.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">⚠️ Điểm nghẽn lỗi đơn (SPOF)</span>
                    <span class="net-spec-val"><strong>Rất nguy hiểm:</strong> Nếu cụm máy chủ sập hoặc mất mạng, hàng triệu Client lập tức bị tê liệt dịch vụ.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">📈 Năng lực mở rộng (Scalability)</span>
                    <span class="net-spec-val">Kém hơn khi tải cao: Càng nhiều Client truy cập, Server càng nghẽn băng thông và có nguy cơ quá tải.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">💰 Chi phí vận hành</span>
                    <span class="net-spec-val">Rất đắt: Thuê cụm máy chủ cấu hình lớn, mua băng thông đắt đỏ và duy trì đội ngũ trực hệ thống 24/7.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🛡️ Bảo mật &amp; Quản trị</span>
                    <span class="net-spec-val"><strong>Ưu thế vượt trội:</strong> Người quản trị dễ dàng phân quyền truy cập, sao lưu dữ liệu và kiểm duyệt nội dung.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Thích hợp nhất: 90% dịch vụ Web, thương mại điện tử, ứng dụng ngân hàng và mạng xã hội.</p>
              </div>

              <div class="net-compare-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>🕸️</span> Mô hình Ngang Hàng (Peer-to-Peer / P2P)</h4>
                  <span class="net-concept-badge">Decentralized</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">🏗️ Kiến trúc dữ liệu</span>
                    <span class="net-spec-val"><strong>Phi tập trung:</strong> Dữ liệu băm nhỏ thành nhiều mảnh phân tán đều trên tất cả các nút thành viên.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🛡️ Điểm nghẽn lỗi đơn (SPOF)</span>
                    <span class="net-spec-val"><strong>Miễn nhiễm hoàn toàn:</strong> Không có máy chủ trung tâm. Một vài máy tắt thì mạng vẫn chạy bình thường.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🚀 Năng lực mở rộng (Scalability)</span>
                    <span class="net-spec-val"><strong>Càng đông càng mạnh:</strong> Mỗi Client mới tham gia đồng thời mang theo băng thông tải lên để chia sẻ cho cả mạng.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">💰 Chi phí vận hành</span>
                    <span class="net-spec-val"><strong>Gần như bằng 0:</strong> Tận dụng chính phần cứng, dung lượng đĩa và băng thông nhàn rỗi của người dùng.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">⚠️ Bảo mật &amp; Quản trị</span>
                    <span class="net-spec-val">Rất phức tạp: Cực kỳ khó kiểm duyệt nội dung độc hại hay bảo vệ bản quyền số do mạng không ai làm chủ.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Thích hợp nhất: Phân phối tệp dung lượng khủng (BitTorrent), blockchain và cập nhật phần mềm mạng LAN.</p>
              </div>
            </div>
          `
        },
        {
          id: "sec-worked-example",
          title: "4. Ví dụ có lời giải (Worked Example): Bài toán phân phối tệp 10GB cho 1.000 máy",
          content: `
            <p><strong>Bài toán kinh điển (Kurose &amp; Ross):</strong> Một công ty game phát hành bản cài đặt nặng $F = 10\\text{ GB}$ ($80\\text{ Gb}$) cho $N = 1000$ game thủ. Giả sử tốc độ tải lên của máy chủ phát hành là $u_s = 1\\text{ Gbps}$, tốc độ tải xuống của mỗi game thủ là $d_i = 100\\text{ Mbps}$, và tốc độ tải lên của mỗi game thủ là $u_i = 10\\text{ Mbps}$. Hãy tính thời gian phân phối tối thiểu giữa hai kiến trúc:</p>

            <div class="net-calc-box">
              <div class="net-calc-header">
                <h4 class="net-calc-title">🧮 Lời giải tính toán thời gian phân phối tệp: Client-Server vs. P2P</h4>
                <span class="net-calc-badge">Worked Example</span>
              </div>
              <div class="net-calc-body">
                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 1: Tính thời gian phân phối với Kiến trúc Client-Server truyền thống ($D_{\\text{CS}}$)</div>
                  <pre class="net-calc-formula">Trong mô hình Client-Server, máy chủ phải gửi tệp F tới từng client (tổng NF bit), và mỗi client cần thời gian tối thiểu F / d_i:
$$D_{\\text{CS}} \\ge \\max\\left( \\frac{NF}{u_s}, \\frac{F}{d_{\\min}} \\right)$$
- Thời gian máy chủ tải lên 1000 bản sao:
  $$\\frac{NF}{u_s} = \\frac{1000 \\times 80\\text{ Gb}}{1\\text{ Gbps}} = 80000\\text{ giây} \\approx 22.22\\text{ giờ!}$$
- Thời gian 1 client tải xuống:
  $$\\frac{F}{d_{\\min}} = \\frac{80\\text{ Gb}}{0.1\\text{ Gbps}} = 800\\text{ giây} \\approx 13.3\\text{ phút.}$$
$$\\rightarrow D_{\\text{CS}} \\ge \\max(80000, 800) = 80000\\text{ giây} \\approx 22.2\\text{ giờ.}$$</pre>
                </div>

                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 2: Tính thời gian phân phối với Kiến trúc Ngang hàng P2P ($D_{\\text{P2P}}$)</div>
                  <pre class="net-calc-formula">Trong mô hình P2P, tổng băng thông tải lên của toàn hệ thống được cộng dồn từ cả máy chủ và tất cả các peer:
$$D_{\\text{P2P}} \\ge \\max\\left( \\frac{F}{u_s}, \\frac{F}{d_{\\min}}, \\frac{NF}{u_s + \\sum_{i=1}^N u_i} \\right)$$
- Máy chủ chỉ cần tải lên ít nhất 1 bản sao ban đầu:
  $$\\frac{F}{u_s} = \\frac{80\\text{ Gb}}{1\\text{ Gbps}} = 80\\text{ giây.}$$
- Tổng băng thông tải lên của toàn bộ hệ thống:
  $$u_{\\text{total}} = u_s + N \\times u = 1\\text{ Gbps} + 1000 \\times 0.01\\text{ Gbps} = 1 + 10 = 11\\text{ Gbps!}$$
- Thời gian cả mạng P2P hoàn tất tải:
  $$\\frac{NF}{u_{\\text{total}}} = \\frac{1000 \\times 80\\text{ Gb}}{11\\text{ Gbps}} = \\frac{80000}{11} \\approx 7272.7\\text{ giây} \\approx 2.02\\text{ giờ!}$$</pre>
                </div>

                <div class="net-calc-result">
                  ✓ Kết luận quan trọng: Nhờ huy động băng thông upload nhàn rỗi của 1.000 người dùng, mạng P2P giảm thời gian phân phối từ 22.2 giờ xuống chỉ còn 2 giờ (nhanh hơn gấp 11 lần!), đồng thời hoàn toàn giải phóng máy chủ khỏi nguy cơ bị nghẽn băng thông và sập nguồn!
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-lab",
          title: "5. Thực hành (Lab 0.2): Tự tay dựng Web Server và gửi Request trong 5 giây",
          content: `
            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Biến máy tính của bạn thành một Web Server thực thụ</h4>
              </div>
              <p class="net-step-desc">Không cần cài đặt phần mềm máy chủ phức tạp. Hệ điều hành nào có cài Python đều tích hợp sẵn một module Web Server mini. Mở Terminal 1 để lắng nghe cổng <code>8080</code>, sau đó mở Terminal 2 đóng vai Client gửi yêu cầu kiểm chứng:</p>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Cửa sổ Terminal 2 nhận được dòng phản hồi <code>HTTP/1.0 200 OK</code>, đồng thời cửa sổ Terminal 1 tự động in ra dòng nhật ký truy cập <code>"HEAD / HTTP/1.1" 200 -</code>. Sau khi thử xong, nhấn <code>Ctrl + C</code> ở Terminal 1 để tắt Server.</span>
              </div>
            </div>
          `,
          codeExamples: [
            {
              title: "Khởi động Server lắng nghe trên cổng 8080 (Windows / Linux / macOS)",
              lang: "bash",
              code: "# Chạy module máy chủ HTTP của Python trên cổng 8080\npython -m http.server 8080",
              output: "Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...",
              annotations: [
                { line: 2, text: "python -m http.server 8080: Lệnh này kích hoạt một tiến trình Server thực sự, chiếm giữ số hiệu cổng 8080 và bắt đầu lắng nghe." },
                { line: 3, text: "0.0.0.0 nghĩa là Server sẵn sàng tiếp nhận yêu cầu từ bất kỳ card mạng nào trên máy." }
              ]
            },
            {
              title: "Đóng vai trò Client gửi yêu cầu HTTP Request (Terminal 2)",
              lang: "bash",
              code: "# Mở một cửa sổ Terminal thứ 2, dùng công cụ curl gửi yêu cầu lấy thông tin\ncurl -I http://127.0.0.1:8080",
              output: `HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.14.8
Date: Sat, 31 Oct 2026 09:20:00 GMT
Content-type: text/html; charset=utf-8
Content-Length: 742`,
              annotations: [
                { line: 2, text: "curl -I: Đóng vai Client gửi bức điện HTTP HEAD Request tới Server tại địa chỉ Loopback 127.0.0.1 cổng 8080." },
                { line: 3, text: "HTTP/1.0 200 OK: Server trả lời '200 OK' (Mọi thứ hoàn hảo, tôi đã nhận được yêu cầu của bạn!)." },
                { line: 4, text: "Server thông báo danh tính phiên bản phần mềm phục vụ." }
              ]
            }
          ]
        },
        {
          id: "sec-incident-study",
          title: "6. Góc sự cố thực tế: Cơn ác mộng ngày mở cổng đăng ký tín chỉ",
          content: `
            <div class="net-incident-card">
              <div class="net-incident-header">
                <span>🚨</span>
                <span>CASE STUDY: HỆ THỐNG ĐĂNG KÝ TÍN CHỈ ĐẠI HỌC SẬP NGUỒN VÀO 8H00 SÁNG</span>
              </div>
              <div class="net-incident-body">
                <p><strong>Hiện tượng:</strong> Đúng 8h00 sáng ngày mở cổng đăng ký môn học, 20.000 sinh viên đồng loạt truy cập vào cổng thông tin đào tạo của trường. Chỉ sau 30 giây, trang web quay vòng tròn vô tận và hiện mã lỗi <code>504 Gateway Timeout</code> hoặc <code>500 Internal Server Error</code>.</p>
                <p><strong>Khám nghiệm bản chất kiến trúc:</strong> Nhà trường triển khai theo mô hình Client-Server tập trung nguyên khối với đúng 1 máy chủ Web và 1 Database đơn độc:</p>
                <div class="net-verify-box">
                  <span class="net-verify-icon">✓</span>
                  <span><strong>Bài học kiến trúc:</strong> Máy chủ bị cạn kiệt Connection Pool và tắc nghẽn CPU/RAM do hiệu ứng nghẽn cổ chai (Bottleneck). Giải pháp đúng chuẩn doanh nghiệp: Đặt Load Balancer phía trước, tách tầng Ứng dụng thành nhiều máy ảo co giãn tự động (Auto-scaling), đưa dữ liệu tĩnh lên CDN và sử dụng hàng đợi thông điệp (Message Queue) để tiếp nhận yêu cầu đăng ký theo thứ tự thay vì để 20.000 kết nối dồn thẳng vào Database!</span>
                </div>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Nghĩ rằng máy tính cá nhân ở nhà không thể làm Server",
            content: "Bất kỳ chiếc máy tính nào, kể cả chiếc Raspberry Pi giá vài trăm nghìn đồng hay điện thoại Android, chỉ cần cài phần mềm máy chủ (Nginx, Python, Apache) và lắng nghe một cổng mạng là đã trở thành một Server thực thụ. Điểm khác biệt duy nhất giữa máy tính ở nhà và máy chủ trong Data Center là: máy chủ doanh nghiệp có phần cứng bền bỉ hơn, nguồn điện dự phòng UPS và kết nối đường truyền Internet cáp quang có địa chỉ IP tĩnh không đổi."
          },
          {
            title: "Đồng nhất công nghệ P2P với việc chia sẻ phim lậu",
            content: "Giao thức P2P là một thành tựu kiến trúc mạng vĩ đại và hoàn toàn hợp pháp. Các tập đoàn công nghệ khổng lồ đều dựa vào P2P: Microsoft dùng P2P để hàng trăm triệu máy tính Windows tự chia sẻ gói cập nhật Windows Update cho nhau; các hệ thống blockchain và mạng chia sẻ dữ liệu khoa học giữa các đài thiên văn đều vận hành trên nền tảng P2P."
          }
        ],
        tips: [
          {
            title: "Mẹo phân biệt nhanh ai là Client, ai là Server",
            content: "Hãy nhớ quy tắc: Bên nào là người MỞ LỜI TRƯỚC (chủ động gửi bức điện đầu tiên) thì bên đó là Client. Bên nào luôn NGỒI ĐỢI SẴN và chỉ trả lời khi được hỏi thì bên đó là Server."
          }
        ]
      },
      exercises: [
        {
          id: "ex-02-1",
          level: "Dễ",
          title: "Bài 1: Nhận diện vai trò Client và Server",
          problem: "Khi bạn mở ứng dụng nghe nhạc Spotify trên điện thoại để tìm kiếm bài hát 'Tiến Quân Ca':\n\na) Đâu là tiến trình Client và đâu là tiến trình Server?\nb) Thông điệp gửi đi từ điện thoại đến máy chủ Spotify được gọi là gì, và thông điệp trả về danh sách bài hát được gọi là gì?",
          hint: "Ứng dụng trên điện thoại chủ động bấm tìm kiếm; máy chủ Spotify ở phòng máy chủ phản hồi kết quả.",
          solutionCode: `a) Phân định vai trò:
- Ứng dụng Spotify cài trên điện thoại đóng vai trò là TIẾN TRÌNH CLIENT (chủ động gửi yêu cầu tìm kiếm).
- Cụm máy chủ đám mây của Spotify đặt tại trung tâm dữ liệu đóng vai trò là TIẾN TRÌNH SERVER (lắng nghe, tra cứu cơ sở dữ liệu và trả kết quả).

b) Tên gọi thông điệp kỹ thuật:
- Bức điện từ điện thoại gửi lên máy chủ là: REQUEST (Yêu cầu).
- Bức điện máy chủ trả về cho điện thoại là: RESPONSE (Phản hồi / Trả lời).`,
          explanation: "Mối quan hệ Client-Server được định nghĩa bởi hành vi: Client chủ động phát Request, Server thụ động lắng nghe và hồi đáp lời bằng Response."
        },
        {
          id: "ex-02-2",
          level: "Vừa",
          title: "Bài 2: Tính toán năng lực phục vụ của Web Server",
          problem: "Một máy chủ Web có đường truyền tải lên (Upload) với băng thông $100\\text{ Mbps}$. Mỗi lượt khách truy cập trang chủ tải về tổng dung lượng hình ảnh và mã HTML là $2\\text{ MB}$ ($16\\text{ Mb}$).\n\na) Trong điều kiện lý thuyết tốt nhất, máy chủ này có thể phục vụ tối đa bao nhiêu lượt khách truy cập hoàn tất trong 1 giây?\nb) Nếu vào giờ cao điểm có 50 khách truy cập đồng thời trong cùng 1 giây, điều gì sẽ xảy ra với thời gian tải trang của người dùng?",
          hint: "Đổi 2 MB sang Megabit: 2 * 8 = 16 Mb. Số lượt khách tối đa trong 1 giây = Băng thông / Dung lượng mỗi lượt. Khi số khách vượt quá năng lực, thời gian tải trang sẽ bị kéo dài.",
          solutionCode: `a) Tính số lượt khách phục vụ tối đa trong 1 giây:
- Băng thông tải lên của Server: B = 100 Mbps
- Dung lượng một trang chủ: S = 2 MB = 2 * 8 = 16 Mb
- Số lượt phục vụ tối đa trong 1 giây:
  N = B / S = 100 / 16 = 6.25 lượt/giây.

b) Khi có 50 khách truy cập đồng thời trong 1 giây:
- Nhu cầu băng thông tức thời: 50 * 16 Mb = 800 Mb.
- Băng thông thực tế chỉ có 100 Mbps, do đó đường truyền bị nghẽn gấp 8 lần.
- Thời gian tải trang của mỗi người dùng sẽ bị kéo dài từ 0.16 giây lên:
  T = 800 Mb / 100 Mbps = 8 giây (hoặc người dùng bị báo lỗi Connection Timeout).`,
          explanation: "Băng thông đường truyền tải lên của Server là giới hạn vật lý quyết định số lượng yêu cầu có thể phục vụ đồng thời trong kiến trúc Client-Server tập trung."
        },
        {
          id: "ex-02-3",
          level: "Khó",
          title: "Bài 3: Tư duy thiết kế hệ thống chống sập mạng (High Availability)",
          problem: "Một công ty thương mại điện tử chuẩn bị chạy chiến dịch 'Flash Sale 11/11' với dự kiến lượng truy cập tăng gấp 20 lần ngày thường. Hiện tại họ chỉ có một máy chủ Web duy nhất chạy Nginx kết nối vào một máy chủ cơ sở dữ liệu MySQL. Dựa trên kiến trúc 3-Tier và các khái niệm đã học, hãy đề xuất 3 giải pháp kỹ thuật cụ thể để hệ thống không bị sập nguồn.",
          hint: "Nghĩ về Điểm nghẽn lỗi đơn (SPOF), bộ cân bằng tải (Load Balancer), và cơ chế lưu tạm dữ liệu (Cache).",
          solutionCode: `3 GIẢI PHÁP THIẾT KẾ HỆ THỐNG SẴN SÀNG CAO (HIGH AVAILABILITY):

1. Triển khai Bộ Cân Bằng Tải (Load Balancer) & Cụm Web Server:
- Thay vì 1 máy chủ, triển khai cụm 5 - 10 máy chủ Web chạy song song phía sau bộ Load Balancer (Nginx/HAProxy hoặc AWS ALB).
- Triệt tiêu hoàn toàn Điểm nghẽn lỗi đơn (SPOF): nếu 1 máy chủ web bị quá tải hoặc hỏng, Load Balancer tự động chuyển hướng khách sang các máy khác.

2. Sử dụng Mạng Phân Phối Nội Dung (CDN - Content Delivery Network):
- Đẩy toàn bộ hình ảnh sản phẩm, file CSS, JavaScript lên các máy chủ biên CDN (Cloudflare, CloudFront).
- Giảm hơn 70% lượng tải băng thông đánh trực tiếp vào máy chủ gốc, giúp máy chủ gốc chỉ tập trung xử lý giao dịch mua hàng.

3. Áp dụng Bộ Nhớ Đệm Caching (Redis / Memcached) cho Tầng Cơ Sở Dữ Liệu:
- Lưu các thông tin đọc nhiều (giá sản phẩm, danh mục hàng) vào RAM với Redis thay vì để hàng vạn khách truy vấn thẳng vào đĩa cứng của MySQL.
- Tách Database thành mô hình Master-Slave (Master ghi đơn hàng, Slave đọc dữ liệu).`,
          explanation: "Kiến trúc sẵn sàng cao (High Availability) là sự kết hợp giữa phân tán tải (Load Balancing), bộ nhớ đệm (Caching/CDN) và loại bỏ điểm nghẽn lỗi đơn (No SPOF)."
        }
      ],
      summary: [
        "1. Client và Server là định danh dành cho tiến trình phần mềm (Software Process): Client chủ động gửi Request, Server thụ động lắng nghe và hồi đáp Response.",
        "2. Kiến trúc 3 tầng (Presentation ➔ Application ➔ Data) là tiêu chuẩn vàng của ứng dụng hiện đại, giúp cô lập bảo mật cơ sở dữ liệu và dễ dàng mở rộng.",
        "3. Mô hình Client-Server dễ quản trị và bảo mật nhưng có nhược điểm chí tử là Điểm nghẽn lỗi đơn (SPOF) và nguy cơ quá tải khi số lượng người dùng tăng vọt.",
        "4. Mô hình P2P phi tập trung có khả năng mở rộng tự nhiên: mỗi người tham gia đồng thời đóng góp băng thông tải lên, biến hệ thống thành 'càng đông càng mạnh'.",
        "5. Trong thực tế, các hệ thống lớn luôn kết hợp cả hai mô hình và sử dụng Bộ cân bằng tải (Load Balancer) để phân phối lưu lượng truy cập mượt mà."
      ],
      selfReviewQuestions: [
        "1. Vì sao nói 'Server là chiếc máy tính to đùng đặt trong phòng lạnh' là một quan niệm sai lầm?",
        "2. Điểm nghẽn lỗi đơn (Single Point of Failure - SPOF) là gì và vì sao mô hình P2P thuần túy lại miễn nhiễm với hiện tượng này?",
        "3. Tại sao các công ty game hay các trang chia sẻ tệp lớn lại thích dùng giao thức P2P/BitTorrent hơn là đặt một Web Server truyền thống?",
        "4. Trong kiến trúc 3 tầng, tại sao người ta không để Client kết nối thẳng vào Database mà phải đi qua Application Server?"
      ],
      reflectionQuestion: "Nếu máy tính của bạn bị nhiễm một phần mềm độc hại (Malware) biến máy bạn thành một thây ma trong mạng botnet chuyên đi tấn công từ chối dịch vụ (DDoS) vào máy chủ khác, thì trong tình huống đó máy tính của bạn đang đóng vai trò là Client hay Server?",
      reflectionHint: "Nó đang đóng vai trò là một CLIENT độc hại! Vì phần mềm mã độc trên máy bạn đang CHỦ ĐỘNG liên tục gửi hàng triệu bản tin HTTP Request hoặc SYN Packet giả mạo tới máy chủ nạn nhân nhằm làm cạn kiệt tài nguyên của họ!",
      nextLessonPreview: "Bài 0.3: Gói tin (Packet) và Chuyển mạch gói (Packet Switching) — Khám phá trái tim vận hành của Internet: Dữ liệu thực sự được xé nhỏ, dán nhãn địa chỉ và bay qua các bộ định tuyến như thế nào?"
    },

    /* =========================================================================
       BÀI 0.3: GÓI TIN & CHUYỂN MẠCH GÓI
       ========================================================================= */
    {
      id: "net-b-0-03",
      number: "0.3",
      title: "Gói tin (Packet) và Chuyển mạch gói (Packet Switching): Dữ liệu đi trên dây như thế nào?",
      subtitle: "Giải phẫu phân mảnh dữ liệu: Phong bì Header, Thân Payload, Giới hạn MTU, 4 nguồn gây trễ kinh điển (Nodal Delay) và Lưới định tuyến Internet",
      level: "Cơ bản",
      duration: "50 phút",
      objectives: [
        "Hiểu được lý do cốt tử tại sao Internet không gửi tệp nguyên khối mà phải chia nhỏ thành các gói tin (Packets).",
        "Nắm vững cấu trúc giải phẫu của một gói tin: Phần đầu (Header) mang thông tin điều khiển và Phần tải (Payload) mang dữ liệu thực.",
        "Phân biệt bản chất kỹ thuật giữa Chuyển mạch kênh (Circuit Switching) và Chuyển mạch gói (Packet Switching).",
        "Hiểu thấu đáo 4 nguồn gây trễ gói tin kinh điển: Trễ xử lý (Processing), Trễ hàng đợi (Queueing), Trễ truyền dẫn (Transmission) và Trễ lan truyền (Propagation).",
        "Nắm được khái niệm MTU (1500 Bytes), MSS (1460 Bytes) và nguyên lý Store-and-Forward trong Router.",
        "Tự tay sử dụng lệnh tracert (Windows) hoặc traceroute (Linux) để theo dấu từng bước nhảy của gói tin xuyên qua các trạm Router."
      ],
      intuition: {
        title: "Tòa Lâu Đài Lego 10.000 Mảnh & Bản Chất Chuyển Mạch Gói",
        metaphor: "Hãy tưởng tượng bạn muốn vận chuyển một tòa lâu đài đồ chơi Lego khổng lồ gồm 10.000 mảnh ghép từ Hà Nội vào TP. Hồ Chí Minh. Nếu dùng 'Chuyển mạch kênh' (mạng điện thoại cổ), bạn phải thuê bao trọn một đoàn tàu hỏa chạy thẳng, khóa chặt đường ray không cho ai đi chung cho đến khi tàu tới ga đích. Nếu đường ray bị sạt lở ở miền Trung, toàn bộ chuyến đi bị tê liệt. Ngược lại, 'Chuyển mạch gói' (Internet) sẽ tháo rời lâu đài thành 10.000 mảnh, đóng vào 100 hộp nhỏ. Trên mỗi hộp đều dán nhãn: Người gửi, Người nhận, Số thứ tự (ví dụ: Hộp 15/100). 100 hộp này được đưa lên mạng lưới bưu cục chuyển phát nhanh. Hộp 1 đi máy bay, hộp 2 đi tàu hỏa, hộp 3 đi xe tải tránh bão. Chúng có thể đến đích vào các thời điểm khác nhau và không theo thứ tự. Người nhận ở TP. Hồ Chí Minh chỉ việc nhìn vào nhãn số thứ tự trên từng hộp để sắp xếp và lắp ghép lại thành tòa lâu đài nguyên vẹn y như ban đầu.",
        boundary: "Điểm phép ẩn dụ này không còn đúng: Trong đời sống, các kiện hàng Lego có thể mất vài ngày mới tới nơi và có nguy cơ bị rơi mất trên đường mà không ai biết ngay. Trong mạng máy tính, việc chia nhỏ dữ liệu (Packetization), dán nhãn địa chỉ (IP Header), truyền đi trên cáp quang với tốc độ ánh sáng (hàng triệu gói mỗi giây), kiểm tra tính toàn vẹn (Checksum) và tái lắp ráp (Reassembly) diễn ra hoàn toàn tự động chỉ trong vài mili-giây. Nếu thiếu dù chỉ 1 gói nhỏ, giao thức mạng sẽ phát hiện tức thì và yêu cầu gửi lại chỉ riêng gói đó mà không cần truyền lại toàn bộ tệp.",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">📦</span>
              <span class="net-arch-title">HÀNH TRÌNH CHUYỂN MẠCH GÓI: TỪ PHÂN MẢNH ĐẾN TÁI LẮP RÁP</span>
            </div>
            <div class="net-arch-layers">
              <!-- Tầng 1: Phân mảnh tại nguồn -->
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">💻 1. Phân Mảnh Tại Nguồn (Packetization - Host A)</span>
                  <span class="net-arch-layer-badge">Cắt nhỏ tệp 5 MB</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Dữ liệu ảnh:</strong> Cắt thành 3,592 mảnh nhỏ (Payload tối đa 1460 Bytes/gói)</div>
                  <div class="net-arch-node"><strong>Dán phong bì Header:</strong> Ghi rõ IP Nguồn (192.168.1.5), IP Đích (8.8.8.8), Số thứ tự (#1, #2... #3592)</div>
                  <div class="net-arch-node"><strong>Thiết lập TTL:</strong> Gán TTL = 64 (số chặng tối đa gói được phép sống)</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Đẩy gói tin vào Card mạng (NIC) &amp; Xếp hàng truyền dẫn</div>

              <!-- Tầng 2: Mạng truy cập & Hàng đợi Router -->
              <div class="net-arch-layer layer-vfs">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🔀 2. Xếp Hàng Đệm &amp; Chia Sẻ Đường Truyền (Statistical Multiplexing)</span>
                  <span class="net-arch-layer-badge">Hàng đợi FIFO / Buffer</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Hàng đợi Router nhà mạng:</strong> [Gói 1 ảnh] - [Gói chat zalo] - [Gói 2 ảnh] - [Gói video call]</div>
                  <div class="net-arch-node"><strong>Không chiếm dụng độc quyền:</strong> Các ứng dụng cùng luân phiên truyền trên sợi cáp quang</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Định tuyến qua Lưới Mesh Router Viễn Thông Toàn Cầu</div>

              <!-- Tầng 3: Lưới định tuyến Mesh -->
              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🧭 3. Định Tuyến Động Độc Lập (Dynamic Routing Mesh)</span>
                  <span class="net-arch-layer-badge">Store-and-Forward</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Gói 1, Gói 3:</strong> Đi theo Tuyến cáp quang chính qua Hà Nội ➔ Đà Nẵng (Độ trễ thấp)</div>
                  <div class="net-arch-node"><strong>Gói 2:</strong> Tuyến chính nghẽn ➔ Router bẻ lái sang tuyến cáp phụ trên bộ (Độ trễ cao hơn)</div>
                  <div class="net-arch-node"><strong>Tránh điểm chết:</strong> Đứt một sợi cáp không làm chết cả tệp dữ liệu!</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Cập bến Máy chủ Đích (Host B)</div>

              <!-- Tầng 4: Tái lắp ráp tại đích -->
              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🌍 4. Thu Nhận &amp; Tái Lắp Ráp Dữ Liệu (Reassembly - Host B)</span>
                  <span class="net-arch-layer-badge">Khôi phục tệp 100%</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Nhận lộn xộn:</strong> Gói 1 đến trước, Gói 3 đến nhì, Gói 2 đến sau cùng</div>
                  <div class="net-arch-node"><strong>Xếp lại theo Sequence #:</strong> Khớp nối các mảnh 1, 2, 3... theo đúng vị trí ban đầu</div>
                  <div class="net-arch-node"><strong>Kiểm tra Checksum:</strong> Xác nhận 0 lỗi ➔ Khôi phục bức ảnh 5 MB nguyên vẹn!</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-why-packets",
          title: "1. Tại sao không gửi dữ liệu nguyên khối? Cội nguồn của Chuyển mạch gói",
          content: `
            <p>Hãy hình dung một kịch bản: Nếu Internet hoạt động bằng cách truyền nguyên khối từng tệp tin từ đầu đến cuối mà không chia nhỏ, điều gì sẽ xảy ra khi một người dùng hàng xóm bắt đầu tải một bộ phim 4K dung lượng 50 GB?</p>

            <div class="net-compare-grid">
              <div class="net-compare-card accent-rose">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>❌</span> Kịch bản 1: Truyền Nguyên Khối (Monolithic Stream)</h4>
                  <span class="net-concept-badge">Độc chiếm đường truyền</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">⛔ Tắc nghẽn mạng</span>
                    <span class="net-spec-val">Người tải phim 50 GB chiếm trọn 100% băng thông; người gửi tin nhắn chat 1 KB phải đứng chờ vài giờ!</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">💥 Nhạy cảm với lỗi</span>
                    <span class="net-spec-val">Nếu bị sai đúng 1 bit ở byte thứ 49.999.999.999, toàn bộ 50 GB phải bị hủy và truyền lại từ đầu!</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔒 Cứng nhắc</span>
                    <span class="net-spec-val">Đường truyền bị khóa cứng từ nguồn đến đích; đứt 1 sợi cáp trung gian là đứt kết nối hoàn toàn.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Không thể tạo ra một mạng lưới phục vụ hàng tỷ người cùng lúc.</p>
              </div>

              <div class="net-compare-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>✅</span> Kịch bản 2: Chuyển Mạch Gói (Packet Switching)</h4>
                  <span class="net-concept-badge">Trái tim của Internet</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">🤝 Chia sẻ công bằng</span>
                    <span class="net-spec-val">Gói tin của phim, tin nhắn chat và cuộc gọi thoại đan xen nhau chạy trên cùng một sợi cáp quang (Statistical Multiplexing).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">⚡ Sửa lỗi cục bộ</span>
                    <span class="net-spec-val">Nhiễu sóng hỏng gói nào, máy chỉ cần gửi lại duy nhất gói nhỏ 1.500 bytes đó, không ảnh hưởng tệp gốc!</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🧭 Định tuyến động</span>
                    <span class="net-spec-val">Mỗi gói tự tìm đường đi vòng tránh các điểm nghẽn hoặc tuyến cáp biển bị đứt.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Nền tảng kiến trúc giúp Internet trường tồn và mở rộng không giới hạn suốt nửa thế kỷ.</p>
              </div>
            </div>
          `
        },
        {
          id: "sec-packet-anatomy",
          title: "2. Cấu trúc giải phẫu của một Gói tin (Packet Anatomy)",
          content: `
            <p>Một gói tin không chỉ đơn thuần là dữ liệu thô. Để một gói tin có thể tự tìm đường đi qua nửa vòng Trái Đất, nó bắt buộc phải được đóng gói kèm một 'phong bì' mang đầy đủ siêu dữ liệu điều khiển.</p>

            <div class="net-packet-strip">
              <div class="net-packet-seg seg-ip">
                <div class="seg-tag-row">
                  <span class="seg-tag">L3 HEADER</span>
                  <span class="seg-size">20 - 60 Bytes</span>
                </div>
                <div class="seg-desc">IP Header: Địa chỉ IP Nguồn &amp; Đích, TTL, Checksum, Version</div>
              </div>
              <div class="net-packet-seg seg-tcp">
                <div class="seg-tag-row">
                  <span class="seg-tag">L4 HEADER</span>
                  <span class="seg-size">20 - 60 Bytes</span>
                </div>
                <div class="seg-desc">TCP Header: Source Port, Dest Port, Sequence Number, Flags</div>
              </div>
              <div class="net-packet-seg seg-payload">
                <div class="seg-tag-row">
                  <span class="seg-tag">DATA PAYLOAD</span>
                  <span class="seg-size">Tối đa 1460 Bytes (MSS)</span>
                </div>
                <div class="seg-desc">Dữ liệu người dùng thực tế: Nội dung HTML, ảnh JPEG, âm thanh MP3</div>
              </div>
            </div>

            <p style="margin-top:16px;">Hai quy chuẩn dung lượng sống còn mà mọi kỹ sư mạng phải khắc cốt ghi tâm:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>📏</span> MTU (Maximum Transmission Unit)</h4>
                  <span class="net-concept-badge">Chuẩn 1500 Bytes</span>
                </div>
                <div class="net-concept-body">
                  <p>Kích thước gói tin lớn nhất mà một giao diện mạng (card mạng, router) có thể truyền đi mà không bị phân mảnh. Chuẩn Ethernet quốc tế quy định MTU là <strong>1500 Bytes</strong>.</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>📦</span> MSS (Maximum Segment Size)</h4>
                  <span class="net-concept-badge">Chuẩn 1460 Bytes</span>
                </div>
                <div class="net-concept-body">
                  <p>Phần tải trọng dữ liệu thực sự lớn nhất mà giao thức TCP có thể chứa trong một gói tin: <code>MSS = MTU (1500) - IP Header (20) - TCP Header (20) = 1460 Bytes</code>.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-circuit-vs-packet",
          title: "3. Chuyển mạch kênh (Circuit Switching) vs. Chuyển mạch gói (Packet Switching)",
          content: `
            <p>Trước khi Internet ra đời, thế giới viễn thông được thống trị bởi mạng điện thoại cố định (PSTN) sử dụng công nghệ <strong>Chuyển mạch kênh (Circuit Switching)</strong>. Dưới đây là bộ thẻ đối chiếu bản chất kỹ thuật:</p>

            <div class="net-compare-grid">
              <div class="net-compare-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>📞</span> Chuyển Mạch Kênh (Circuit Switching)</h4>
                  <span class="net-concept-badge">Mạng Điện Thoại Cổ</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔌 Thiết lập kênh truyền</span>
                    <span class="net-spec-val"><strong>Bắt buộc:</strong> Phải thiết lập một đường dây vật lý chuyên dụng riêng biệt trước khi bắt đầu nói chuyện.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔒 Chiếm dụng tài nguyên</span>
                    <span class="net-spec-val"><strong>Độc quyền:</strong> Băng thông bị khóa chặt cho cuộc gọi đó, kể cả khi hai bên im lặng không nói gì thì người khác cũng không thể dùng ké.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">⏱️ Độ trễ truyền dẫn</span>
                    <span class="net-spec-val"><strong>Cố định &amp; Ổn định:</strong> Dữ liệu truyền đi liên tục không cần xếp hàng, không lo bị biến động trễ (Jitter = 0).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">💥 Khi sự cố đứt đường</span>
                    <span class="net-spec-val"><strong>Mất liên lạc ngay lập tức:</strong> Cuộc gọi bị ngắt, phải bấm số quay lại từ đầu để tổng đài tìm tuyến khác.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Thích hợp cho thoại tương tự truyền thống, nhưng cực kỳ lãng phí băng thông với dữ liệu máy tính.</p>
              </div>

              <div class="net-compare-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>🌐</span> Chuyển Mạch Gói (Packet Switching)</h4>
                  <span class="net-concept-badge">Hạ Tầng Internet Hiện Đại</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔌 Thiết lập kênh truyền</span>
                    <span class="net-spec-val"><strong>Không cần:</strong> Dữ liệu cắt thành gói tin và bắn ngay vào mạng; không cần đặt chỗ trước (Connectionless at L3).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔒 Chiếm dụng tài nguyên</span>
                    <span class="net-spec-val"><strong>Dùng chung động:</strong> Băng thông được chia sẻ linh hoạt theo nhu cầu thực tế (Statistical Multiplexing).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">⏱️ Độ trễ truyền dẫn</span>
                    <span class="net-spec-val"><strong>Biến thiên:</strong> Phụ thuộc vào độ dài hàng đợi tại các Router trung gian trên đường đi.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">💥 Khi sự cố đứt đường</span>
                    <span class="net-spec-val"><strong>Tự động định tuyến lại:</strong> Các gói tin tiếp theo tự động rẽ sang ngã khác mà không làm gián đoạn phiên làm việc.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Khả năng phục hồi kỳ diệu, tối ưu hóa 100% tài nguyên băng thông, nền tảng của nền kinh tế số.</p>
              </div>
            </div>
          `
        },
        {
          id: "sec-4-delays",
          title: "4. Bốn nguồn gây trễ gói tin kinh điển: Nodal Processing, Queueing, Transmission & Propagation",
          content: `
            <p>Tại sao bạn gõ lệnh ping lại thấy con số độ trễ 25ms hay 150ms? Con số đó đến từ đâu? Giáo sư James Kurose và Keith Ross đã chứng minh rằng: <strong>Tổng độ trễ tại một nút mạng (Total Nodal Delay)</strong> được cấu thành từ đúng <strong>4 thành phần vật lý và toán học độc lập</strong>:</p>
            $$\\text{Total Delay} = d_{\\text{proc}} + d_{\\text{queue}} + d_{\\text{trans}} + d_{\\text{prop}}$$

            <div class="net-concept-grid">
              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🧠</span> 1. Trễ Xử Lý (Processing Delay — $d_{\\text{proc}}$)</h4>
                  <span class="net-concept-badge">Micro-giây (&mu;s)</span>
                </div>
                <div class="net-concept-body">
                  <p>Thời gian CPU/Chip ASIC của Router đọc phần đầu Header của gói tin, kiểm tra mã lỗi Checksum và tra cứu bảng định tuyến (Routing Table) để quyết định đẩy gói tin ra cổng mạng nào.</p>
                  <p><em>Thường rất nhỏ:</em> Dưới 1 phần triệu giây (&lt; 10 &mu;s) trên các Router hiện đại.</p>
                </div>
              </div>

              <div class="net-concept-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>⏳</span> 2. Trễ Hàng Đợi (Queueing Delay — $d_{\\text{queue}}$)</h4>
                  <span class="net-concept-badge">Mili-giây (ms) • Biến thiên</span>
                </div>
                <div class="net-concept-body">
                  <p>Thời gian gói tin phải nằm chờ trong bộ nhớ đệm (Buffer) của cổng xuất trong khi đường truyền đang bận phục vụ các gói tin đến trước. Nếu hàng đợi đầy, gói tin sẽ bị vứt bỏ (<strong>Packet Drop</strong>)!</p>
                  <p><em>Thành phần bí ẩn nhất:</em> Có thể bằng 0 nếu mạng vắng, nhưng có thể lên tới hàng trăm mili-giây nếu mạng bị nghẽn (Bufferbloat).</p>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🚚</span> 3. Trễ Truyền Dẫn (Transmission Delay — $d_{\\text{trans}}$)</h4>
                  <span class="net-concept-badge">$d_{\\text{trans}} = L / R$</span>
                </div>
                <div class="net-concept-body">
                  <p>Thời gian cần thiết để card mạng hoặc router đẩy toàn bộ $L$ bit của gói tin lên đường truyền có tốc độ phát sóng $R$ (Băng thông):</p>
                  $$d_{\\text{trans}} = \\frac{L}{R}$$
                  <p><em>Ví dụ:</em> Đẩy gói 1500 Bytes ($12.000\\text{ bits}$) lên cáp 100 Mbps mất: $\\frac{12000}{100 \\times 10^6} = 0.12\\text{ ms}$.</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🚀</span> 4. Trễ Lan Truyền (Propagation Delay — $d_{\\text{prop}}$)</h4>
                  <span class="net-concept-badge">$d_{\\text{prop}} = d / s$</span>
                </div>
                <div class="net-concept-body">
                  <p>Thời gian 1 bit sóng điện từ hoặc xung ánh sáng bay xuyên qua môi trường vật lý (khoảng cách $d$) với vận tốc ánh sáng trong cáp quang ($s \\approx 2 \\times 10^8\\text{ m/s}$):</p>
                  $$d_{\\text{prop}} = \\frac{d}{s}$$
                  <p><em>Ví dụ:</em> Tín hiệu từ Hà Nội vào TP.HCM ($d \\approx 1700\\text{ km}$) mất tối thiểu: $\\frac{1.700.000}{2 \\times 10^8} = 8.5\\text{ ms}$.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-worked-example",
          title: "5. Ví dụ có lời giải (Worked Example): Tính tổng thời gian chuyển tiếp Store-and-Forward",
          content: `
            <p><strong>Bài toán định lượng chuyển mạch gói:</strong> Một gói tin có kích thước $L = 1500\\text{ Bytes}$ ($12000\\text{ bits}$) được truyền từ Host A đến Host B đi qua $N = 2$ chiếc Router trung gian (tổng cộng 3 chặng liên kết mạng - hops). Mỗi chặng liên kết có tốc độ truyền dẫn $R = 100\\text{ Mbps}$ ($10^8\\text{ bps}$), chiều dài $d = 200\\text{ km}$, và vận tốc truyền sóng trong cáp quang là $s = 2 \\times 10^8\\text{ m/s}$. Bỏ qua thời gian xử lý và hàng đợi ($d_{\\text{proc}} = 0, d_{\\text{queue}} = 0$). Hãy tính tổng thời gian để gói tin đến được đích:</p>

            <div class="net-calc-box">
              <div class="net-calc-header">
                <h4 class="net-calc-title">🧮 Lời giải tính toán trễ chuyển tiếp Store-and-Forward qua 3 chặng liên kết</h4>
                <span class="net-calc-badge">Worked Example</span>
              </div>
              <div class="net-calc-body">
                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 1: Tính Trễ Truyền Dẫn (Transmission Delay) trên mỗi chặng liên kết</div>
                  <pre class="net-calc-formula">$$d_{\\text{trans}} = \\frac{L}{R} = \\frac{1500 \\times 8\\text{ bits}}{100 \\times 10^6\\text{ bps}} = \\frac{12000}{10^8} = 0.00012\\text{ giây} = 0.12\\text{ ms}$$</pre>
                </div>

                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 2: Tính Trễ Lan Truyền (Propagation Delay) trên mỗi chặng cáp quang</div>
                  <pre class="net-calc-formula">$$d_{\\text{prop}} = \\frac{d}{s} = \\frac{200\\text{ km}}{200.000\\text{ km/s}} = \\frac{200}{200000} = 0.001\\text{ giây} = 1.0\\text{ ms}$$</pre>
                </div>

                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 3: Tính tổng thời gian chuyển tiếp qua 3 chặng theo nguyên lý Store-and-Forward</div>
                  <pre class="net-calc-formula">Router phải nhận đủ 100% gói tin (Store) rồi mới được đẩy ra chặng tiếp theo (Forward). Do đó gói tin phải trải qua 3 lần phát sóng và 3 lần bay trên cáp:
$$\\text{Tổng thời gian} = 3 \\times (d_{\\text{trans}} + d_{\\text{prop}}) = 3 \\times (0.12\\text{ ms} + 1.0\\text{ ms}) = 3 \\times 1.12\\text{ ms} = 3.36\\text{ ms}$$</pre>
                </div>

                <div class="net-calc-result">
                  ✓ Kết luận thực tiễn: Tổng thời gian một gói tin đến đích là $3.36\\text{ ms}$. Trong đó, độ trễ lan truyền ánh sáng trên cáp ($3.0\\text{ ms}$) chiếm tới gần $90\\%$ tổng thời gian! Đây là minh chứng vì sao các công ty công nghệ lớn phải đặt cụm máy chủ (Edge Cache) gần người dùng nhất có thể để giảm thiểu độ trễ lan truyền vật lý.
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-lab",
          title: "6. Thực hành (Lab 0.3): Theo dấu gói tin xuyên qua các Router bằng tracert / traceroute",
          content: `
            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Thám hiểm từng bước nhảy (Hop) của gói tin trên Internet</h4>
              </div>
              <p class="net-step-desc">
                Lệnh <code>tracert</code> (Windows) hoặc <code>traceroute</code> (Linux) là công cụ kỳ diệu cho phép bạn 'nhìn thấy' từng chiếc Router trung gian mà gói tin của bạn ghé qua trên đường tới Google. Lệnh này hoạt động bằng cách gửi các gói tin có giá trị TTL tăng dần từ 1, 2, 3...
              </p>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Bạn sẽ thấy danh sách từ 8 đến 15 dòng (mỗi dòng tương ứng 1 Router). Chặng 1 luôn là Router Wi-Fi nhà bạn (ví dụ: <code>192.168.1.1</code>), các chặng giữa là Router nhà mạng ISP, và chặng cuối cùng là máy chủ đích của Google.</span>
              </div>
            </div>
          `,
          codeExamples: [
            {
              title: "Thực hành trên Windows (CMD hoặc PowerShell)",
              lang: "cmd",
              code: "# Cờ -d giúp bỏ qua phân giải tên miền để kết quả hiện ra nhanh gấp 5 lần\ntracert -d 8.8.8.8",
              output: `Tracing route to 8.8.8.8 over a maximum of 30 hops:

  1    <1 ms    <1 ms    <1 ms  192.168.1.1
  2     2 ms     2 ms     2 ms  10.50.0.1
  3    15 ms    14 ms    15 ms  14.161.45.12
  4    22 ms    23 ms    22 ms  72.14.212.18
  5    23 ms    22 ms    23 ms  8.8.8.8

Trace complete.`,
              annotations: [
                { line: 4, text: "Chặng 1 (192.168.1.1): Router Wi-Fi tại nhà bạn. Thời gian < 1ms vì ở khoảng cách mạng LAN." },
                { line: 5, text: "Chặng 2: Trạm OLT/Router phân phối đầu ngõ của nhà mạng ISP." },
                { line: 6, text: "Chặng 3: Router Gateway mạng lõi viễn thông quốc gia (độ trễ nhảy lên 15ms)." },
                { line: 7, text: "Chặng 4: Router biên quốc tế của Google đặt tại trạm trung chuyển dữ liệu." },
                { line: 8, text: "Chặng 5: Đích đến cuối cùng máy chủ DNS Google 8.8.8.8." }
              ]
            },
            {
              title: "Thực hành trên Linux / macOS (Bash Terminal)",
              lang: "bash",
              code: "# Cờ -n giúp không phân giải DNS để hiện ngay IP số\ntraceroute -n 8.8.8.8",
              output: `traceroute to 8.8.8.8 (8.8.8.8), 30 hops max, 60 byte packets
 1  192.168.1.1  0.842 ms  0.721 ms  0.680 ms
 2  10.50.0.1  2.115 ms  2.042 ms  1.988 ms
 3  14.161.45.12  14.821 ms  14.712 ms  14.655 ms
 4  72.14.212.18  22.104 ms  22.045 ms  21.992 ms
 5  8.8.8.8  22.450 ms  22.380 ms  22.412 ms`,
              annotations: [
                { line: 2, text: "Gói tin được phóng đi với TTL=1, chạm tới 192.168.1.1 thì hết hạn (TTL Expired), Router gửi báo ICMP về." },
                { line: 6, text: "Chặng 5 hoàn tất hành trình chuyển mạch gói với thời gian khứ hồi RTT 22.4 ms." }
              ]
            }
          ]
        },
        {
          id: "sec-incident-study",
          title: "7. Góc sự cố thực tế: Cáp quang biển bị đứt & Cơn ác mộng rớt gói",
          content: `
            <div class="net-incident-card">
              <div class="net-incident-header">
                <span>🚨</span>
                <span>CASE STUDY: TUYẾN CÁP QUANG BIỂN AAG BỊ ĐỨT TẠI VỊ TRÍ CÁCH BỜ 150 KM</span>
              </div>
              <div class="net-incident-body">
                <p><strong>Bối cảnh &amp; Triệu chứng:</strong> Tối thứ Bảy, người dùng Internet toàn quốc phản ánh mạng bị chậm chập chờn khi xem phim Netflix hoặc chơi game quốc tế. Lệnh ping tới máy chủ Singapore tăng vọt từ <code>30ms</code> lên <code>180ms</code>, kèm theo tỷ lệ rớt gói <code>Packet Loss: 8%</code>.</p>
                <p><strong>Khám nghiệm bản chất chuyển mạch gói:</strong> Tuyến cáp quang biển chính AAG bị đứt hoàn toàn. Tuy nhiên, nhờ vào cơ chế định tuyến động của chuyển mạch gói, Internet Việt Nam KHÔNG bị ngắt kết nối hoàn toàn:</p>
                <div class="net-verify-box">
                  <span class="net-verify-icon">✓</span>
                  <span><strong>Bài học chẩn đoán:</strong> Các Router của nhà mạng tự động bẻ hướng hàng triệu gói tin sang tuyến cáp phụ trên bộ (đi vòng qua Trung Quốc hoặc cáp APG). Vì tuyến cáp vòng dài hơn hàng nghìn kilomet nên độ trễ lan truyền ($d_{\\text{prop}}$) tăng vọt; đồng thời lưu lượng dồn ứ làm tràn bộ đệm Router (Buffer Overflow) gây ra hiện tượng rớt gói ($8\\%$). Chuyển mạch gói đã cứu mạng Internet khỏi sự sụp đổ toàn diện!</span>
                </div>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Tưởng rằng mọi gói tin của một tệp đều đi chung một con đường duy nhất",
            content: "Trong chuyển mạch gói (đặc biệt là mạng IP), mỗi gói tin là một thực thể độc lập (Datagram). Gói số 1 có thể đi qua cáp biển AAG, nhưng 1 giây sau cáp nghẽn, Router tự động đẩy gói số 2 đi qua cáp APG hoặc cáp đất liền. Các gói tin có thể đến đích theo thứ tự lộn xộn (gói 3 đến trước gói 2), và giao thức TCP ở máy nhận sẽ có nhiệm vụ sắp xếp lại theo đúng số thứ tự."
          },
          {
            title: "Nhầm lẫn giữa Trễ truyền dẫn (Transmission) và Trễ lan truyền (Propagation)",
            content: "Trễ truyền dẫn ($L/R$) là thời gian card mạng ĐẨY các bit ra khỏi cổng (phụ thuộc vào băng thông). Trễ lan truyền ($d/s$) là thời gian bit đó BAY trên sợi cáp quang (phụ thuộc vào khoảng cách địa lý và vận tốc ánh sáng). Tăng băng thông từ 100 Mbps lên 1 Gbps chỉ làm giảm trễ truyền dẫn, KHÔNG làm tăng vận tốc ánh sáng trong sợi cáp quang!"
          }
        ],
        tips: [
          {
            title: "Cách dùng tracert để xác định vị trí đứt mạng",
            content: "Khi chạy lệnh tracert, hãy nhìn vào dấu sao (* * * Request timed out). Nếu dấu sao xuất hiện ngay ở chặng số 1 hoặc 2: lỗi nằm ở dây cáp hoặc Router nhà bạn. Nếu chặng 1, 2, 3 đều tốt mà dấu sao xuất hiện từ chặng số 5 trở đi: sự cố nằm ở mạng lõi ISP hoặc đường truyền quốc tế."
          }
        ]
      },
      exercises: [
        {
          id: "ex-03-1",
          level: "Dễ",
          title: "Bài 1: Phân biệt Header và Payload",
          problem: "Một gói tin IP mang một thông điệp văn bản 'Hello World'.\n\na) Đâu là Header và đâu là Payload của gói tin này?\nb) Nếu một gói tin bị mất phần Header trên đường truyền thì điều gì sẽ xảy ra?",
          hint: "Header mang thông tin địa chỉ điều khiển; Payload mang nội dung người dùng.",
          solutionCode: `a) Phân định thành phần:
- Chuỗi ký tự "Hello World" là PAYLOAD (Phần tải / Nội dung thực sự của người dùng).
- Các thông tin địa chỉ IP nguồn, IP đích, số thứ tự, cờ điều khiển đi kèm là HEADER.

b) Khi gói tin bị mất hoặc hỏng phần Header:
- Router trung gian không thể đọc được địa chỉ IP đích để biết gói tin cần gửi đi đâu.
- Checksum kiểm tra lỗi sẽ báo sai, Router lập tức vứt bỏ (DROP) gói tin vào thùng rác mà không chuyển tiếp.`,
          explanation: "Header là phong bì mang thông tin dẫn đường; nếu hỏng phong bì thì gói tin sẽ lập tức bị hủy bỏ trên mạng."
        },
        {
          id: "ex-03-2",
          level: "Vừa",
          title: "Bài 2: Tính toán Trễ Truyền Dẫn (Transmission Delay)",
          problem: "Một chiếc máy tính phát đi một bức ảnh dung lượng $L = 2\\text{ MB}$ ($16\\text{ Mb}$). Hãy tính thời gian truyền dẫn (Transmission Delay):\n\na) Khi cắm vào đường truyền cáp đồng cũ có tốc độ $R_1 = 10\\text{ Mbps}$.\nb) Khi cắm vào đường truyền cáp quang mới có tốc độ $R_2 = 1\\text{ Gbps}$ ($1000\\text{ Mbps}$).",
          hint: "Đổi 2 MB = 2 * 8 = 16 Mb. Công thức d_trans = L / R.",
          solutionCode: `Đổi dung lượng: L = 2 MB = 2 * 8 = 16 Megabits (Mb).

a) Với đường truyền R1 = 10 Mbps:
- d_trans1 = L / R1 = 16 Mb / 10 Mbps = 1.6 giây.

b) Với đường truyền R2 = 1 Gbps = 1000 Mbps:
- d_trans2 = L / R2 = 16 Mb / 1000 Mbps = 0.016 giây = 16 mili-giây.

=> Nhận xét: Nâng cấp băng thông từ 10 Mbps lên 1 Gbps giúp thời gian đẩy dữ liệu ra card mạng nhanh hơn gấp 100 lần!`,
          explanation: "Trễ truyền dẫn tỷ lệ nghịch với băng thông đường truyền (d_trans = L/R)."
        },
        {
          id: "ex-03-3",
          level: "Khó",
          title: "Bài 3: Phân tích hiện tượng phân mảnh MTU (MTU Fragmentation)",
          problem: "Một máy chủ gửi một gói tin IP có kích thước $L = 3000\\text{ Bytes}$ đi qua một Router. Tuy nhiên, cổng mạng xuất của Router này có giới hạn MTU là $1500\\text{ Bytes}$. Giả sử phần tiêu đề IP Header luôn là $20\\text{ Bytes}$.\n\na) Router có chuyển tiếp gói tin 3000 Bytes này nguyên vẹn được không? Nó phải làm gì?\nb) Hãy tính số lượng mảnh (fragments) được tạo ra và kích thước cụ thể của từng mảnh.",
          hint: "Dữ liệu payload thực tế cần gửi = 3000 - 20 = 2980 Bytes. Mỗi mảnh có MTU tối đa 1500 Bytes (chứa 20B Header + tối đa 1480B Payload chia hết cho 8).",
          solutionCode: `a) Xử lý của Router:
- Router KHÔNG THỂ gửi nguyên vẹn gói 3000 Bytes vì vượt quá giới hạn vật lý MTU 1500 Bytes.
- Router bắt buộc phải thực hiện kỹ thuật PHÂN MẢNH IP (IP Fragmentation): cắt gói tin gốc thành nhiều mảnh nhỏ hơn hoặc bằng 1500 Bytes và dán IP Header riêng cho từng mảnh.

b) Tính toán kích thước các mảnh:
- Tổng dung lượng Payload cần truyền: 3000 - 20 = 2980 Bytes.
- Tải trọng tối đa mỗi mảnh có thể mang (phải chia hết cho 8): 1500 - 20 = 1480 Bytes.

- Mảnh 1: Mang 1480 Bytes dữ liệu + 20 Bytes IP Header = 1500 Bytes (Cờ More Fragments = 1, Offset = 0).
- Mảnh 2: Mang 1480 Bytes dữ liệu + 20 Bytes IP Header = 1500 Bytes (Cờ More Fragments = 1, Offset = 185).
- Mảnh 3: Mang phần còn lại: 2980 - (1480 * 2) = 20 Bytes dữ liệu + 20 Bytes IP Header = 40 Bytes (Cờ More Fragments = 0, Offset = 370).

=> Tổng cộng tạo ra 3 mảnh được truyền độc lập qua mạng!`,
          explanation: "Phân mảnh IP là cơ chế thích ứng khi gói tin đi qua các đoạn mạng có MTU khác nhau, nhưng gây hao tốn CPU của Router nên ngày nay các hệ điều hành thường dùng cơ chế Path MTU Discovery để tránh phân mảnh."
        }
      ],
      summary: [
        "1. Chuyển mạch gói (Packet Switching) chia nhỏ dữ liệu thành các gói tin mang địa chỉ độc lập, giải quyết triệt để vấn đề nghẽn mạng và sửa lỗi cục bộ.",
        "2. Cấu trúc gói tin gồm Header (phong bì siêu dữ liệu ~ 20-40 Bytes) và Payload (nội dung người dùng thực tế tối đa 1460 Bytes MSS).",
        "3. Chuyển mạch kênh độc chiếm đường truyền cứng nhắc; Chuyển mạch gói chia sẻ tài nguyên động (Statistical Multiplexing) và tự định tuyến lại khi đứt cáp.",
        "4. Tổng độ trễ một nút gồm 4 thành phần: Trễ xử lý (d_proc), Trễ hàng đợi (d_queue), Trễ truyền dẫn (d_trans = L/R) và Trễ lan truyền ánh sáng (d_prop = d/s).",
        "5. Lệnh tracert / traceroute sử dụng cơ chế tăng dần TTL để thám hiểm chính xác từng bước nhảy Router của gói tin trên đường đi."
      ],
      selfReviewQuestions: [
        "1. Tại sao nói chuyển mạch gói là kiến trúc cứu mạng Internet khi cáp quang biển bị đứt?",
        "2. Nêu sự khác nhau cốt tử giữa MTU (Maximum Transmission Unit) và MSS (Maximum Segment Size)?",
        "3. Tại sao tăng băng thông gói cước từ 100 Mbps lên 1 Gbps lại không làm giảm thời gian tín hiệu bay từ Việt Nam sang Mỹ?",
        "4. Cơ chế hoạt động của lệnh tracert dựa trên trường thông tin nào trong Header gói tin?"
      ],
      reflectionQuestion: "Nếu một phi thuyền không gian thám hiểm Sao Hỏa gửi một gói tin về Trái Đất (khoảng cách 225 triệu kilomet), theo bạn thành phần nào trong 4 nguồn gây trễ sẽ chiếm tới 99.9% tổng thời gian truyền tín hiệu?",
      reflectionHint: "Đó chính là TRỄ LAN TRUYỀN (Propagation Delay — $d_{\\text{prop}} = d / s$)! Dù bạn có trang bị thiết bị phát sóng mạnh cỡ nào đi nữa thì sóng vô tuyến bay với vận tốc ánh sáng ($300.000\\text{ km/s}$) cũng phải mất từ 12 đến 20 PHÚT mới vượt qua được quãng đường 225 triệu kilomet trong không gian vũ trụ!",
      nextLessonPreview: "Bài 0.4: Giao thức mạng (Protocol) là gì? — Khám phá ngôn ngữ chung của thế giới số: Cú pháp, Ngữ nghĩa, Định thời và Đế chế tiêu chuẩn mở RFC của IETF."
    },

    /* =========================================================================
       BÀI 0.4: GIAO THỨC MẠNG (PROTOCOL) LÀ GÌ?
       ========================================================================= */
    {
      id: "net-b-0-04",
      number: "0.4",
      title: "Giao thức mạng (Protocol) là gì? Ngôn ngữ chung của thế giới số",
      subtitle: "Giải mã bộ khế ước truyền thông: Cú pháp (Syntax), Ngữ nghĩa (Semantics), Định thời (Timing), Chuẩn mở RFC và giải phẫu bức điện HTTP thực tế",
      level: "Cơ bản",
      duration: "45 phút",
      objectives: [
        "Hiểu được bản chất của Giao thức mạng (Network Protocol): Là tài liệu quy chuẩn kỹ thuật xác định cách các thiết bị trao đổi dữ liệu.",
        "Phân tích và nhận diện 3 yếu tố trụ cột của mọi giao thức mạng: Cú pháp (Syntax), Ngữ nghĩa (Semantics) và Định thời (Timing).",
        "Phân biệt rạch ròi giữa Giao thức chuẩn mở (Open RFC Standards) và Giao thức độc quyền (Proprietary Protocols).",
        "Đọc hiểu cấu trúc một bức điện HTTP Request và HTTP Response thực tế theo từng byte và dòng lệnh.",
        "Nắm vững các nhóm mã trạng thái HTTP (HTTP Status Codes: 2xx, 3xx, 4xx, 5xx) thường gặp khi lướt web.",
        "Sử dụng công cụ cURL trên dòng lệnh để trực tiếp gửi yêu cầu và phân tích các thông điệp phản hồi chuẩn của giao thức HTTP."
      ],
      intuition: {
        title: "Nghi Thức Phi Công Hàng Không & Bản Khế Ước Giao Tiếp Số",
        metaphor: "Hãy tưởng tượng bạn là một phi công của hãng Vietnam Airlines đang điều khiển chiếc máy bay Boeing 787 chuẩn bị hạ cánh xuống sân bay quốc tế Charles de Gaulle (Paris, Pháp). Người trực đài kiểm soát không lưu bên dưới là một người Pháp. Hai người không hề biết tiếng mẹ đẻ của nhau. Làm thế nào máy bay có thể hạ cánh an toàn tuyệt đối giữa bầu trời sương mù dày đặc mà không va chạm với phi cơ khác? Tổ chức Hàng không Dân dụng Quốc tế (ICAO) đã đặt ra một 'Giao thức Hàng không chung': (1) Về Cú pháp: Hai bên bắt buộc phải dùng các mẫu câu tiếng Anh ngắn gọn, cố định: [Số hiệu máy bay] + [Vị trí/Độ cao] + [Yêu cầu]. (2) Về Ngữ nghĩa: Từ 'ROGER' có nghĩa là 'Đã nhận và hiểu lệnh', từ 'MAYDAY' có nghĩa là 'Khẩn cấp đe dọa sinh mạng'. (3) Về Định thời: Mỗi lần chỉ một bên được bấm nút phát thanh và kết thúc bằng từ 'OVER' để nhường quyền nói; bên kia phải chờ xong mới được trả lời, nếu quá 5 giây không thấy phản hồi thì phải phát lại.",
        boundary: "Điểm phép ẩn dụ này không còn đúng: Con người khi giao tiếp có thể dùng ánh mắt, nụ cười, cử chỉ tay chân hoặc dựa vào ngữ cảnh xung quanh để 'đoán ý' nếu đối phương phát âm sai một vài từ. Nhưng máy tính là các mạch vi xử lý vô hồn, chỉ làm việc với hai mức điện áp đại diện cho bit 0 và 1. Máy tính hoàn toàn KHÔNG THỂ ĐOÁN Ý! Nếu một trình duyệt gửi thông điệp giao thức HTTP mà quên một dấu cách, hoặc thiếu cặp ký tự xuống dòng '\\r\\n' (CRLF), máy chủ sẽ ngay lập tức từ chối và báo lỗi cú pháp '400 Bad Request' mà không một chút nhân nhượng.",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">🤝</span>
              <span class="net-arch-title">HÀNH TRÌNH ĐỐI THOẠI GIAO THỨC: TỪ TRÌNH DUYỆT ĐẾN MÁY CHỦ</span>
            </div>
            <div class="net-arch-layers">
              <!-- Tầng 1: Client iOS/Chrome -->
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">📱 1. Khách Hàng (Client - iPhone / Chrome)</span>
                  <span class="net-arch-layer-badge">Khởi tạo yêu cầu</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Cú pháp chuẩn RFC 9110:</strong> <code>GET /index.html HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n</code></div>
                  <div class="net-arch-node"><strong>Ngữ nghĩa:</strong> Yêu cầu tải nội dung trang chủ, không sửa đổi dữ liệu</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Bắt tay 3 bước TCP (SYN ➔ SYN-ACK ➔ ACK) &amp; Định thời Timeout</div>

              <!-- Tầng 2: Giao vận & Bắt tay -->
              <div class="net-arch-layer layer-vfs">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🤝 2. Tầng Giao Vận &amp; Định Thời (Transport TCP)</span>
                  <span class="net-arch-layer-badge">Phiên tin cậy</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Thiết lập phiên:</strong> Hai bên thống nhất số Sequence # khởi tạo</div>
                  <div class="net-arch-node"><strong>Định thời:</strong> Bộ đếm Retransmission Timeout (RTO) sẵn sàng gửi lại nếu rớt gói</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Chuyển đổi thành Xung Ánh Sáng Laser / Sóng Vô Tuyến</div>

              <!-- Tầng 3: Tín hiệu vật lý -->
              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">⚡ 3. Tầng Truyền Dẫn Tín Hiệu (Physical Media)</span>
                  <span class="net-arch-layer-badge">Dòng Bit 0/1</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Mã hóa bit:</strong> Chuỗi ký tự ASCII biến thành các xung điện và ánh sáng</div>
                  <div class="net-arch-node"><strong>Xuyên biên giới:</strong> Bay qua các Router viễn thông quốc tế trong 15ms</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Cập bến Máy chủ Web Linux</div>

              <!-- Tầng 4: Máy chủ Web Linux/Nginx -->
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🖥️ 4. Máy Chủ Phục Vụ (Server - Ubuntu / Nginx)</span>
                  <span class="net-arch-layer-badge">Hồi đáp kết quả</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Soi cú pháp:</strong> Kiểm tra đủ dấu cách đơn và dòng kết thúc CRLF</div>
                  <div class="net-arch-node"><strong>Phản hồi ngữ nghĩa:</strong> Trả về mã <code>HTTP/1.1 200 OK</code> kèm <code>Content-Length: 1256</code></div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-protocol-def",
          title: "1. Giao thức mạng là gì? Bản khế ước của thế giới số",
          content: `
            <p>Trong thế giới thực tế, bạn có thể dùng một chiếc điện thoại iPhone chạy hệ điều hành <strong>iOS</strong> của hãng Apple, truy cập vào một trang web được đặt trên máy chủ đám mây chạy hệ điều hành <strong>Ubuntu Linux</strong>, đi qua các thiết bị router của hãng <strong>Cisco</strong> và card mạng của hãng <strong>Intel</strong>.</p>
            <p>Làm thế nào hàng chục phần cứng và phần mềm do các công ty đối thủ cạnh tranh gay gắt sản xuất lại có thể phối hợp nhịp nhàng và hiểu nhau đến từng bit dữ liệu? Bí mật nằm ở hai chữ: <strong>GIAO THỨC MẠNG (NETWORK PROTOCOL)</strong>.</p>

            <div class="net-topo-box">
              <div class="net-topo-title">🌐 GIAO THỨC LÀ 'CẦU NỐI NGÔN NGỮ' GIỮA CÁC HỆ SINH THÁI KHÁC BIỆT</div>
              <pre class="net-topo-pre">+---------------------+                                       +---------------------+
|   IPHONE (Apple)    |                                       |   SERVER (Linux)    |
| Hệ điều hành: iOS   |                                       | Hệ điều hành: Ubuntu|
| Phần cứng: Chip ARM |                                       | Phần cứng: Intel x86|
+----------+----------+                                       +----------+----------+
           |                                                             ^
           |  1. Đóng gói thông điệp theo chuẩn HTTP/TCP/IP              |
           |     (Gửi các byte theo đúng tài liệu RFC 9110)              |
           v                                                             |
   +---------------+                                             +---------------+
   | Cáp quang ngầm| ===== [ 01000111 01000101 01010100 ... ] ===&gt;| Đọc từng byte |
   +---------------+   Gói tin bay qua Router Cisco &amp; Juniper    +---------------+
                                                                         |
                                2. Máy chủ Linux đọc Header, ------------+
                                   nhận diện chính xác 100% cú pháp,
                                   trả về mã trạng thái '200 OK'.</pre>
              <p style="margin:10px 0 0;font-size:0.86rem;color:var(--text-secondary);">💡 <strong>Bản chất:</strong> Giao thức mạng không phải là phần cứng hay phần mềm; Giao thức là <strong>bộ quy tắc chuẩn mực được tài liệu hóa</strong> để phần mềm các bên cùng tuân theo.</p>
            </div>

            <p style="margin-top:14px;"><strong>Định nghĩa kỹ thuật:</strong> Giao thức mạng (Network Protocol) là tập hợp các quy tắc, chuẩn mực và định dạng kỹ thuật đã được thống nhất từ trước, quy định cách các thiết bị trên mạng máy tính khởi tạo kết nối, cấu trúc thông điệp, truyền tải dữ liệu và kết thúc liên lạc.</p>
          `
        },
        {
          id: "sec-3-pillars",
          title: "2. Ba trụ cột cấu thành mọi Giao thức: Cú pháp, Ngữ nghĩa và Định thời",
          content: `
            <p>Dù là một giao thức cổ xưa hay giao thức mạng hiện đại nhất ngày nay, tất cả đều được xây dựng dựa trên 3 thành tố nền tảng bất biến:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>📐</span> 1. Cú Pháp (Syntax)</h4>
                  <span class="net-concept-badge">Định dạng &amp; Cấu trúc</span>
                </div>
                <div class="net-concept-body">
                  <p>Quy định <strong>cấu trúc và định dạng</strong> của dữ liệu. Bit nào đứng trước, bit nào đứng sau? Trường địa chỉ dài bao nhiêu bit? Dấu phân cách giữa các dòng là gì (CRLF <code>\\r\\n</code>)?</p>
                  <p><em>Ví dụ:</em> Trong HTTP, dòng đầu tiên bắt buộc phải có cấu trúc: <code>[METHOD] + [DẤU CÁCH] + [URI] + [DẤU CÁCH] + [VERSION] + [\\r\\n]</code>.</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🧠</span> 2. Ngữ Nghĩa (Semantics)</h4>
                  <span class="net-concept-badge">Ý nghĩa &amp; Hành động</span>
                </div>
                <div class="net-concept-body">
                  <p>Quy định <strong>ý nghĩa cụ thể của từng phần dữ liệu</strong> và hành động tương ứng mà bên nhận phải thực hiện khi đọc được thông tin đó.</p>
                  <p><em>Ví dụ:</em> Lệnh <code>GET</code> có nghĩa là 'chỉ đọc dữ liệu'; lệnh <code>POST</code> có nghĩa là 'lưu dữ liệu mới'; mã <code>404</code> có nghĩa là 'không tìm thấy trang'.</p>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>⏱️</span> 3. Định Thời (Timing)</h4>
                  <span class="net-concept-badge">Trình tự &amp; Tốc độ</span>
                </div>
                <div class="net-concept-body">
                  <p>Quy định <strong>thời điểm và tốc độ gửi dữ liệu</strong>. Khi nào gửi? Bên nào nói trước? Nếu gửi đi mà quá thời gian chờ (Timeout) không thấy trả lời thì phải làm gì?</p>
                  <p><em>Ví dụ:</em> Kiểm soát luồng (Flow Control) ngăn máy gửi bắn dữ liệu quá nhanh làm tràn RAM máy nhận; Bắt tay 3 bước TCP thiết lập phiên.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-open-vs-proprietary",
          title: "3. Chuẩn mở RFC vs. Giao thức Độc quyền (Open Standards vs. Proprietary)",
          content: `
            <p>Lý do duy nhất giúp Internet trở thành mạng lưới toàn cầu phục vụ toàn nhân loại là nhờ triết lý <strong>Chuẩn mở (Open Standards)</strong> thay vì độc quyền:</p>

            <div class="net-compare-grid">
              <div class="net-compare-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>🌐</span> Giao Thức Chuẩn Mở (Open Standards - RFC)</h4>
                  <span class="net-concept-badge">IETF / IEEE / ISO</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">📖 Tài liệu đặc tả</span>
                    <span class="net-spec-val">Công khai 100% miễn phí trên Internet qua các tài liệu <strong>RFC (Request for Comments)</strong> của tổ chức IETF.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🤝 Khả năng tương thích</span>
                    <span class="net-spec-val">Bất kỳ cá nhân hay công ty nào (Apple, Microsoft, Google, cá nhân lập trình viên) đều có thể tự viết code tương thích.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">💡 Các đại diện kinh điển</span>
                    <span class="net-spec-val"><code>HTTP/HTTPS</code> (Web), <code>TCP/IP</code> (Mạng Internet), <code>DNS</code>, <code>SSH</code>, <code>Wi-Fi (IEEE 802.11)</code>.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Cội nguồn sinh lực tạo nên mạng Internet tự do và kết nối toàn cầu ngày nay.</p>
              </div>

              <div class="net-compare-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>🔒</span> Giao Thức Độc Quyền (Proprietary)</h4>
                  <span class="net-concept-badge">Sở Hữu Doanh Nghiệp</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">📖 Tài liệu đặc tả</span>
                    <span class="net-spec-val">Bảo mật tuyệt mật, giữ kín dưới dạng bí mật thương mại hoặc đăng ký bằng sáng chế độc quyền.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🤝 Khả năng tương thích</span>
                    <span class="net-spec-val">Chỉ hoạt động được giữa các phần cứng hoặc phần mềm của chính công ty đó sản xuất (Vendor Lock-in).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">💡 Các đại diện lịch sử</span>
                    <span class="net-spec-val">AppleTalk (Apple cũ), IPX/SPX (Novell NetWare), SNA (IBM), Skype Protocol đời đầu.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Từng thống trị thập niên 1980 nhưng đã hoàn toàn thất bại và bị đào thải bởi làn sóng Internet chuẩn mở.</p>
              </div>
            </div>
          `
        },
        {
          id: "sec-http-deep-dive",
          title: "4. Giải phẫu bức điện HTTP thực tế: Request, Response & Các mã trạng thái",
          content: `
            <p>Để thấy 'Cú pháp' và 'Ngữ nghĩa' hoạt động ngoài đời thực, hãy cùng giải phẫu chính xác bức điện văn bản mà trình duyệt Chrome của bạn gửi cho Web Server mỗi khi mở trang web:</p>

            <div class="net-topo-box">
              <div class="net-topo-title">📨 CẤU TRÚC BẢN TIN HTTP REQUEST CHUẨN RFC 9110</div>
              <pre class="net-topo-pre">GET /index.html HTTP/1.1\r\n
Host: example.com\r\n
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0\r\n
Accept: text/html,application/xhtml+xml\r\n
Accept-Language: vi-VN,vi;q=0.9,en-US;q=0.8\r\n
Connection: keep-alive\r\n
\r\n</pre>
              <p style="margin:8px 0 0;font-size:0.86rem;color:var(--text-secondary);">💡 Dòng trắng kết thúc bằng cặp ký tự <code>\\r\\n</code> (Carriage Return &amp; Line Feed) là tín hiệu cú pháp bắt buộc báo hiệu: <em>'Hết phần Header, bắt đầu phần nội dung!'</em>.</p>
            </div>

            <p style="margin-top:16px;">Và bức điện máy chủ trả về (<strong>HTTP Response</strong>):</p>

            <div class="net-topo-box">
              <div class="net-topo-title">📬 CẤU TRÚC BẢN TIN HTTP RESPONSE CHUẨN</div>
              <pre class="net-topo-pre">HTTP/1.1 200 OK\r\n
Date: Sat, 31 Oct 2026 10:00:00 GMT\r\n
Server: nginx/1.24.0 (Ubuntu)\r\n
Content-Type: text/html; charset=UTF-8\r\n
Content-Length: 1256\r\n
\r\n
&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;&lt;title&gt;Trang Chu&lt;/title&gt;...&lt;/html&gt;</pre>
            </div>

            <p style="margin-top:16px;">Ý nghĩa 5 nhóm mã trạng thái HTTP (Status Codes) mà mọi người làm kỹ thuật mạng và lập trình đều phải thuộc nằm lòng:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>ℹ️</span> 1xx: Thông Tin (Informational)</h4>
                  <span class="net-concept-badge">100 - 199</span>
                </div>
                <div class="net-concept-body">
                  <p>Yêu cầu đã được tiếp nhận, tiến trình đang tiếp tục xử lý (Ví dụ: <code>101 Switching Protocols</code> khi nâng cấp lên WebSocket).</p>
                </div>
              </div>

              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>✅</span> 2xx: Thành Công (Success)</h4>
                  <span class="net-concept-badge">200 - 299</span>
                </div>
                <div class="net-concept-body">
                  <p>Yêu cầu đã được hiểu và xử lý thành công trọn vẹn (Kinh điển: <code>200 OK</code>, <code>201 Created</code> khi gửi form).</p>
                </div>
              </div>

              <div class="net-concept-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🔀</span> 3xx: Chuyển Hướng (Redirection)</h4>
                  <span class="net-concept-badge">300 - 399</span>
                </div>
                <div class="net-concept-body">
                  <p>Tài nguyên đã dời sang địa chỉ URL khác (Ví dụ: <code>301 Moved Permanently</code> khi chuyển trang web từ HTTP sang HTTPS).</p>
                </div>
              </div>

              <div class="net-concept-card accent-rose">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>👤</span> 4xx: Lỗi Do Client (Client Error)</h4>
                  <span class="net-concept-badge">400 - 499</span>
                </div>
                <div class="net-concept-body">
                  <p>Yêu cầu chứa cú pháp sai hoặc đòi hỏi tài nguyên không tồn tại (<code>400 Bad Request</code>, <code>401 Unauthorized</code>, <code>403 Forbidden</code>, <code>404 Not Found</code>).</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>💥</span> 5xx: Lỗi Do Server (Server Error)</h4>
                  <span class="net-concept-badge">500 - 599</span>
                </div>
                <div class="net-concept-body">
                  <p>Máy chủ gặp trục trặc nội bộ không thể hoàn thành yêu cầu hợp lệ (<code>500 Internal Server Error</code>, <code>502 Bad Gateway</code>, <code>503 Service Unavailable</code>).</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-worked-example",
          title: "5. Ví dụ có lời giải (Worked Example): Giải mã thông điệp và chẩn đoán lỗi Cú pháp HTTP",
          content: `
            <p><strong>Tình huống kiểm thử API:</strong> Một kỹ sư backend viết một đoạn script socket bằng Python để gửi yêu cầu lấy thông tin người dùng từ máy chủ Web <code>api.company.com</code>. Chuỗi byte gửi đi như sau:</p>
            <pre class="net-topo-pre" style="margin:8px 0;">GET /api/v1/user HTTP/1.1\nHost: api.company.com\n\n</pre>
            <p>Tuy nhiên, máy chủ Nginx ngay lập tức trả về mã lỗi <code>HTTP/1.1 400 Bad Request</code>. Hãy phân tích nguyên nhân lỗi dựa trên 3 trụ cột giao thức:</p>

            <div class="net-calc-box">
              <div class="net-calc-header">
                <h4 class="net-calc-title">🧮 Lời giải phân tích lỗi vi phạm đặc tả giao thức HTTP RFC 9112</h4>
                <span class="net-calc-badge">Worked Example</span>
              </div>
              <div class="net-calc-body">
                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 1: Soi Cú Pháp (Syntax) của dấu xuống dòng trong chuỗi gửi đi</div>
                  <pre class="net-calc-formula">- Đoạn mã gửi đi sử dụng ký tự xuống dòng đơn của hệ điều hành Linux: '\\n' (Line Feed - mã ASCII 0x0A).
- Tuy nhiên, đặc tả giao thức HTTP chuẩn quốc tế (RFC 9112 mục 2.1) quy định nghiêm ngặt:
  $$\\text{Dấu kết thúc dòng chuẩn} = \\text{CRLF} = \\text{'\\r\\n'} = (\\text{0x0D 0x0A})$$</pre>
                </div>

                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 2: Phân tích hành vi phía máy chủ (Ngữ nghĩa)</div>
                  <pre class="net-calc-formula">Máy chủ web Nginx được lập trình tuân thủ đặc tả RFC chuẩn:
- Khi đọc luồng byte, nó không tìm thấy cặp ký tự '\\r\\n' mà chỉ thấy '\\n'.
- Bộ phân tích cú pháp (Parser) của máy chủ kết luận thông điệp bị lỗi định dạng (Malformed Request).
- Theo quy chuẩn ngữ nghĩa, máy chủ trả về mã '400 Bad Request' và từ chối xử lý.</pre>
                </div>

                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 3: Bản tin đã sửa đúng 100% cú pháp RFC</div>
                  <pre class="net-calc-formula">GET /api/v1/user HTTP/1.1\r\nHost: api.company.com\r\nConnection: close\r\n\r\n</pre>
                </div>

                <div class="net-calc-result">
                  ✓ Bài học cốt lõi: Máy tính không thể đoán mò như con người! Một sự sai lệch dù chỉ 1 byte ở tầng Cú pháp (như dùng '\\n' thay vì '\\r\\n') cũng đủ làm sập toàn bộ giao dịch mạng.
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-lab",
          title: "6. Thực hành (Lab 0.4): Bắt trọn thông điệp giao thức HTTP bằng cURL",
          content: `
            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Gửi yêu cầu HTTP thật và 'soi' chi tiết từng dòng đối đáp</h4>
              </div>
              <p class="net-step-desc">
                Công cụ dòng lệnh <code>curl</code> có sẵn trên cả Windows 10/11, Linux và macOS. Bằng cách thêm cờ <code>-v</code> (Verbose - tường thuật chi tiết), bạn sẽ thấy toàn bộ quá trình bắt tay TCP và hai bức điện HTTP Request/Response được trao đổi qua mạng.
              </p>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Bạn sẽ thấy các dòng bắt đầu bằng dấu <code>&gt;</code> (những gì máy bạn GỬI ĐI) và các dòng bắt đầu bằng dấu <code>&lt;</code> (những gì máy chủ TRẢ VỀ). Tìm dòng <code>&lt; HTTP/1.1 200 OK</code> để xác nhận giao thức đã vận hành hoàn hảo.</span>
              </div>
            </div>
          `,
          codeExamples: [
            {
              title: "Thực hành trên Windows / Linux / macOS (Terminal)",
              lang: "bash",
              code: "# Gửi yêu cầu HTTP HEAD tường thuật chi tiết tới trang web mẫu example.com\ncurl -I -v http://example.com",
              output: `*   Trying 93.184.216.34:80...
* Connected to example.com (93.184.216.34) port 80
> HEAD / HTTP/1.1
> Host: example.com
> User-Agent: curl/8.4.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: text/html; charset=UTF-8
< Content-Length: 1256
< Server: ECS (dcb/7F83)
< Date: Sat, 31 Oct 2026 10:15:00 GMT
< `,
              annotations: [
                { line: 1, text: "Bắt tay kết nối TCP tới IP 93.184.216.34 trên cổng mạng 80." },
                { line: 3, text: "> HEAD / HTTP/1.1: Bức điện HTTP Request được máy Client phát đi." },
                { line: 4, text: "> Host: example.com: Tiêu đề bắt buộc để máy chủ biết bạn cần truy cập trang web nào." },
                { line: 7, text: "> Dòng trống CRLF kết thúc phần Request Header." },
                { line: 8, text: "< HTTP/1.1 200 OK: Máy chủ phản hồi mã thành công 200 OK!" },
                { line: 10, text: "< Content-Length: 1256: Máy chủ báo trước nội dung trang HTML nặng đúng 1256 bytes." }
              ]
            }
          ]
        },
        {
          id: "sec-incident-study",
          title: "7. Góc sự cố thực tế: Cú click chuột biến thành mã lỗi 403 Forbidden",
          content: `
            <div class="net-incident-card">
              <div class="net-incident-header">
                <span>🚨</span>
                <span>CASE STUDY: KHÁCH HÀNG VIP BỊ CHẶN CỬA BẰNG MÃ LỖI 403 FORBIDDEN</span>
              </div>
              <div class="net-incident-body">
                <p><strong>Hiện tượng:</strong> Một khách hàng vip của sàn thương mại điện tử bấm vào trang xem lịch sử giao dịch nhưng màn hình chỉ hiện một dòng chữ trắng vỏn vẹn: <code>403 Forbidden - Access Denied</code>.</p>
                <p><strong>Khám nghiệm ngữ nghĩa giao thức:</strong> Khách hàng cho rằng trang web bị sập. Nhưng dưới góc độ kỹ thuật mạng:</p>
                <div class="net-verify-box">
                  <span class="net-verify-icon">✓</span>
                  <span><strong>Bài học chẩn đoán:</strong> Mã <code>403 Forbidden</code> thuộc nhóm 4xx (Lỗi Client), nghĩa là: Máy chủ hoàn toàn khỏe mạnh và hiểu chính xác yêu cầu của bạn, nhưng phiên làm việc của bạn (Cookie / Token chứng thực) đã hết hạn sau 24h không hoạt động! Vì vậy, máy chủ từ chối cung cấp dữ liệu nhạy cảm. Khách hàng chỉ cần đăng nhập lại để nhận Token mới là vấn đề được giải quyết tức thì!</span>
                </div>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Tưởng rằng giao thức mạng là phần mềm bạn có thể tải về máy",
            content: "Giao thức không phải là file .exe hay phần mềm! Giao thức là một TÀI LIỆU VĂN BẢN QUY CHUẨN (Specification Document). Ví dụ: RFC 9110 là tập tài liệu chữ tiếng Anh dài hàng trăm trang do các kỹ sư IETF biên soạn. Các lập trình viên của Google, Apple và Linux đọc tài liệu đó rồi viết mã nguồn (C, C++, Rust) để phần mềm của họ hành xử đúng y như tài liệu quy định."
          },
          {
            title: "Nhầm lẫn giữa mã lỗi 401 Unauthorized và 403 Forbidden",
            content: "Mã 401 Unauthorized có nghĩa là 'Bạn chưa đăng nhập, tôi không biết bạn là ai, hãy nhập mật khẩu đi'. Còn mã 403 Forbidden có nghĩa là 'Tôi biết rất rõ bạn là ai, bạn đã đăng nhập rồi, nhưng tài khoản thường của bạn không có quyền xem bảng lương của Giám đốc!'."
          }
        ],
        tips: [
          {
            title: "Cách nhớ các nhóm mã lỗi HTTP cực dễ",
            content: "Hãy nhớ câu vè cửa miệng của giới kỹ sư Web: 1xx là 'Chờ tí nhé'; 2xx là 'Xong xuôi rồi'; 3xx là 'Đi chỗ khác rồi'; 4xx là 'Lỗi tại bạn đấy (gõ sai URL, chưa đăng nhập)'; và 5xx là 'Lỗi tại tôi (máy chủ bị cháy, sập database)'!"
          }
        ]
      },
      exercises: [
        {
          id: "ex-04-1",
          level: "Dễ",
          title: "Bài 1: Phân loại 3 thành tố của Giao thức",
          problem: "Hãy xác định xem mỗi yếu tố sau đây thuộc về **Cú pháp (Syntax)**, **Ngữ nghĩa (Semantics)** hay **Định thời (Timing)** của giao thức mạng:\n\n1. Quy định trường địa chỉ IP đích phải nằm ở byte thứ 16 đến byte thứ 19 của gói tin.\n2. Quy định nếu gửi bản tin đi mà sau 3 giây không nhận được báo nhận (ACK) thì phải gửi lại.\n3. Quy định mã trạng thái 404 có nghĩa là tài nguyên yêu cầu không tìm thấy trên máy chủ.",
          hint: "Cú pháp là cấu trúc vị trí bit; Ngữ nghĩa là ý nghĩa hành động; Định thời là thời gian và trình tự.",
          solutionCode: `1. Quy định trường địa chỉ IP đích nằm ở byte thứ 16 - 19:
   => CÚ PHÁP (Syntax - quy định cấu trúc và vị trí các trường dữ liệu).

2. Quy định chờ sau 3 giây không có ACK thì gửi lại:
   => ĐỊNH THỜI (Timing - quy định thời gian chờ Timeout và xử lý rớt gói).

3. Quy định mã 404 có nghĩa là tài nguyên không tồn tại:
   => NGỮ NGHĨA (Semantics - quy định ý nghĩa thông điệp và hành động phản hồi).`,
          explanation: "3 trụ cột cấu thành mọi giao thức: Cú pháp (Định dạng), Ngữ nghĩa (Ý nghĩa), Định thời (Trình tự & Thời gian)."
        },
        {
          id: "ex-04-2",
          level: "Vừa",
          title: "Bài 2: Đọc hiểu và sửa lỗi bản tin HTTP Request",
          problem: "Một lập trình viên gửi một bản tin HTTP Request bằng tay như sau:\n\n```text\nGET /products HTTP/1.1\nUser-Agent: MyTestClient\n```\n\nKhi gửi tới máy chủ Apache, máy chủ trả về lỗi `HTTP/1.1 400 Bad Request`. Dựa trên quy chuẩn HTTP/1.1 (RFC 7230/9112), hãy chỉ ra 2 lỗi sai nghiêm trọng trong bản tin trên và viết lại bản tin chính xác.",
          hint: "Chuẩn HTTP/1.1 bắt buộc phải có một Header xác định tên miền máy chủ, và phải có một dòng trắng để báo hiệu kết thúc Header.",
          solutionCode: `2 LỖI SAI NGHIÊM TRỌNG TRONG BẢN TIN:

1. Thiếu Header 'Host' bắt buộc:
- Kể từ chuẩn HTTP/1.1, Header 'Host: <tên_miền>' là BẮT BUỘC trong mọi Request để hỗ trợ máy chủ ảo (Virtual Hosting - 1 IP chạy nhiều website). Thiếu Header này máy chủ sẽ từ chối ngay.

2. Thiếu dòng trắng (Blank Line \\r\\n) kết thúc Header:
- Sau dòng User-Agent, lập trình viên không gửi thêm một cặp ký tự \\r\\n trống. Máy chủ tiếp tục ngồi chờ vô tận và báo lỗi 400 do không biết khi nào Header mới kết thúc.

BẢN TIN ĐÃ ĐƯỢC VIẾT LẠI CHÍNH XÁC:
GET /products HTTP/1.1\\r\\n
Host: mystore.vn\\r\\n
User-Agent: MyTestClient\\r\\n
\\r\\n`,
          explanation: "HTTP/1.1 bắt buộc phải có Header Host và dòng trắng phân cách CRLF; thiếu một trong hai sẽ bị báo lỗi cú pháp 400 Bad Request."
        },
        {
          id: "ex-04-3",
          level: "Khó",
          title: "Bài 3: Phân tích sự khác biệt giữa HTTP/1.1, HTTP/2 và HTTP/3",
          problem: "Tổ chức tiêu chuẩn IETF đã liên tục nâng cấp giao thức Web từ HTTP/1.1 sang HTTP/2 (2015) và mới nhất là HTTP/3 (2022). Hãy trình bày tóm tắt: Vấn đề hạn chế lớn nhất của HTTP/1.1 là gì (Head-of-Line Blocking), và HTTP/2 cùng HTTP/3 đã thay đổi định dạng dữ liệu (Cú pháp) và giao thức tầng dưới như thế nào để giải quyết vấn đề đó?",
          hint: "HTTP/1.1 truyền văn bản thuần ASCII; HTTP/2 dùng nhị phân Multiplexing; HTTP/3 chuyển từ TCP sang UDP/QUIC.",
          solutionCode: `1. VẤN ĐỀ CỦA HTTP/1.1 — NGHẼN ĐẦU HÀNG (Head-of-Line Blocking - HoL):
- HTTP/1.1 truyền dữ liệu dạng văn bản thuần (Text-based).
- Trên mỗi kết nối TCP, các yêu cầu phải xếp hàng chờ nhau: nếu file ảnh số 1 tải chậm thì các file CSS, JS số 2, 3 phía sau phải đứng chờ, làm trang web tải chậm chạp.

2. CẢI TIẾN CỦA HTTP/2 (2015):
- Thay đổi Cú pháp: Chuyển từ Text sang ĐỊNH DẠNG NHỊ PHÂN (Binary Framing).
- Hỗ trợ Ghép kênh (Multiplexing): Cho phép gửi và nhận hàng trăm bức ảnh, file CSS cùng lúc trên duy nhất 1 kết nối TCP mà không cần chờ nhau.

3. ĐỘT PHÁ CỦA HTTP/3 (2022):
- Vấn đề còn lại của HTTP/2: Vì vẫn chạy trên nền TCP, nếu 1 gói tin TCP bị rớt trên cáp quang biển thì TOÀN BỘ các luồng dữ liệu đều bị khựng lại chờ TCP truyền lại.
- Giải pháp HTTP/3: Chuyển hẳn sang chạy trên nền giao thức QUIC (nền tảng UDP). Mỗi luồng dữ liệu là một dòng độc lập 100%: rớt gói của ảnh 1 không làm ảnh hưởng tới việc hiển thị ảnh 2!`,
          explanation: "Lịch sử tiến hóa của HTTP là minh chứng sống động cho việc tối ưu hóa 3 trụ cột Cú pháp, Ngữ nghĩa và Định thời của giao thức mạng."
        }
      ],
      summary: [
        "1. Giao thức mạng (Protocol) là bản khế ước quy chuẩn kỹ thuật cho phép các hệ thống phần cứng và phần mềm khác biệt giao tiếp nhịp nhàng.",
        "2. Mọi giao thức đều được xây dựng trên 3 trụ cột: Cú pháp (Syntax - định dạng cấu trúc), Ngữ nghĩa (Semantics - ý nghĩa hành động) và Định thời (Timing - trình tự và thời gian).",
        "3. Chuẩn mở RFC của IETF là nền móng giúp Internet phát triển tự do, đánh bại hoàn toàn các giao thức đóng kín độc quyền của các tập đoàn.",
        "4. Bản tin HTTP Request và Response kết thúc phần tiêu đề Header bằng một dòng trắng ký tự CRLF (\\r\\n) bắt buộc.",
        "5. Năm nhóm mã trạng thái HTTP: 1xx (Thông tin), 2xx (Thành công - 200 OK), 3xx (Chuyển hướng - 301), 4xx (Lỗi Client - 404), 5xx (Lỗi Server - 500)."
      ],
      selfReviewQuestions: [
        "1. Nếu một người bảo rằng 'Tôi vừa tải giao thức HTTP về cài đặt trên máy', câu nói đó sai ở chỗ nào?",
        "2. Ba trụ cột cấu thành mọi giao thức mạng là gì? Nêu ví dụ thực tế cho từng trụ cột?",
        "3. Sự khác nhau giữa mã lỗi 404 Not Found và mã lỗi 500 Internal Server Error là gì?",
        "4. Tại sao các tài liệu quy chuẩn mạng của IETF lại được đặt tên là RFC (Request for Comments)?"
      ],
      reflectionQuestion: "Tại sao trong suốt hơn 30 năm qua, dù phần cứng máy tính và chip xử lý đã mạnh lên hàng triệu lần, chúng ta vẫn dùng các thông điệp văn bản (Text-based) đọc được bằng mắt người như 'GET /index.html' trong HTTP/1.1 thay vì mã hóa nhị phân bí mật ngay từ ngày đầu?",
      reflectionHint: "Bởi vì tính MINH BẠCH và DỄ DÀNG CHẨN ĐOÁN LỖI (Human Readability & Debuggability)! Ở giai đoạn sơ khai của Internet, việc các kỹ sư có thể mở phần mềm lên đọc và gõ trực tiếp các lệnh như GET, POST bằng bàn phím giúp các nhà phát triển toàn cầu nhanh chóng sửa lỗi, hiểu được hệ thống của nhau và tạo nên một làn sóng bùng nổ ứng dụng Web nhanh chưa từng có trong lịch sử!",
      nextLessonPreview: "Module 1: Mô hình phân tầng OSI & TCP/IP — Bước vào thế giới kiến trúc mạng chuyên nghiệp: Khám phá bí mật tại sao thế giới mạng phải 'Chia để trị' và giải phẫu mô hình OSI 7 tầng thần thánh."
    }
  ],

  /* =========================================================================
     QUIZ TỔNG KẾT MODULE 0 (8 CÂU HỎI TRẮC NGHIỆM CHỌN LỌC)
     ========================================================================= */
  quiz: {
    title: "Bài Kiểm Tra Năng Lực Module 0: Bản Chất Mạng Máy Tính & Internet",
    questions: [
      {
        question: "Thành phần nào sau đây được phân loại là Thiết bị trung gian (Intermediary Device) trong mạng máy tính?",
        options: [
          "Máy tính xách tay cá nhân (Laptop).",
          "Bộ chuyển mạch mạng (Switch).",
          "Máy in hóa đơn kết nối mạng LAN.",
          "Máy chủ cơ sở dữ liệu (Database Server)."
        ],
        correctIndex: 1,
        explanation: "Switch, Router và Firewall là các thiết bị trung gian (Intermediary Devices) có nhiệm vụ chuyển tiếp, dẫn hướng và tái tạo tín hiệu trên đường truyền giữa các thiết bị đầu cuối."
      },
      {
        question: "Một công ty muốn kết nối 10 máy tính văn phòng theo mô hình hình sao (Star Topology) thông qua bộ chuyển mạch Switch. Cần bao nhiêu sợi cáp mạng?",
        options: [
          "10 sợi cáp mạng.",
          "45 sợi cáp mạng.",
          "90 sợi cáp mạng.",
          "20 sợi cáp mạng."
        ],
        correctIndex: 0,
        explanation: "Trong Topo hình sao (Star Topology), mỗi máy tính chỉ cần duy nhất 1 sợi cáp nối thẳng về Switch trung tâm. Do đó 10 máy tính cần đúng 10 sợi cáp."
      },
      {
        question: "Chế độ truyền thông nào cho phép dữ liệu truyền đi đồng thời ở cả hai chiều tại cùng một thời điểm?",
        options: [
          "Đơn công (Simplex).",
          "Bán song công (Half-Duplex).",
          "Song công toàn phần (Full-Duplex).",
          "Đa điểm (Multipoint)."
        ],
        correctIndex: 2,
        explanation: "Full-Duplex (Song công toàn phần) cho phép truyền và nhận tín hiệu hai chiều đồng thời (như gọi điện thoại hay cáp mạng Switch hiện đại)."
      },
      {
        question: "Khái niệm nào mô tả thời gian cần thiết để đẩy toàn bộ L bit của gói tin lên đường truyền có băng thông R (bps)?",
        options: [
          "Trễ lan truyền (Propagation Delay — d/s).",
          "Trễ truyền dẫn (Transmission Delay — L/R).",
          "Trễ hàng đợi (Queueing Delay).",
          "Trễ xử lý nút (Nodal Processing Delay)."
        ],
        correctIndex: 1,
        explanation: "Trễ truyền dẫn (Transmission Delay = L/R) là thời gian card mạng hoặc router phát toàn bộ các bit của gói tin lên đường truyền."
      },
      {
        question: "Kích thước gói tin lớn nhất mà một giao diện mạng Ethernet có thể truyền đi mà không bị phân mảnh (MTU) theo chuẩn thông thường là bao nhiêu?",
        options: [
          "64 Bytes.",
          "512 Bytes.",
          "1500 Bytes.",
          "65535 Bytes."
        ],
        correctIndex: 2,
        explanation: "Chuẩn Ethernet quy định MTU (Maximum Transmission Unit) là 1500 Bytes. Payload thực tế lớn nhất của TCP (MSS) là 1460 Bytes sau khi trừ đi 40 Bytes header."
      },
      {
        question: "Lợi thế lớn nhất của kiến trúc mạng ngang hàng (P2P) so với kiến trúc Client-Server tập trung là gì?",
        options: [
          "Bảo mật và kiểm duyệt bản quyền nội dung dễ dàng hơn.",
          "Khả năng mở rộng tự nhiên: mỗi người tham gia đồng thời đóng góp băng thông tải lên, biến hệ thống thành 'càng đông càng mạnh'.",
          "Không cần sử dụng địa chỉ IP khi giao tiếp.",
          "Tốc độ truyền dữ liệu luôn vượt vận tốc ánh sáng."
        ],
        correctIndex: 1,
        explanation: "Trong P2P, mỗi peer vừa là client vừa là server. Càng nhiều người tải thì tổng băng thông tải lên của toàn hệ thống càng tăng, không bị nghẽn cổ chai tại máy chủ trung tâm."
      },
      {
        question: "Dấu phân cách cú pháp bắt buộc báo hiệu kết thúc phần Header trong bản tin HTTP Request / Response là gì?",
        options: [
          "Dấu chấm phẩy ( ; ).",
          "Một dòng trắng chứa cặp ký tự CRLF ( \\r\\n\\r\\n ).",
          "Từ khóa END_HEADER.",
          "Thẻ đóng </header>."
        ],
        correctIndex: 1,
        explanation: "Theo chuẩn RFC của giao thức HTTP, phần Header và phần Body được phân cách bằng một dòng trắng trống rỗng, đại diện bởi cặp ký tự xuống dòng CRLF (\\r\\n)."
      },
      {
        question: "Mã trạng thái HTTP nào sau đây báo hiệu cho người dùng biết 'Tài nguyên trang web yêu cầu không tồn tại trên máy chủ'?",
        options: [
          "200 OK.",
          "301 Moved Permanently.",
          "404 Not Found.",
          "500 Internal Server Error."
        ],
        correctIndex: 2,
        explanation: "Mã 404 Not Found thuộc nhóm 4xx (Lỗi Client), thông báo rằng URL được yêu cầu không tìm thấy trên máy chủ web."
      }
    ]
  }
};
