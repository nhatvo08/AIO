/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 1: Bản chất mạng và phân tầng (Phase 1)
 */

window.NET_PHASE1_DATA = {
  id: "part-net-1",
  number: "Giai đoạn 1",
  title: "Bản chất mạng và phân tầng",
  level: "Nền tảng",
  badge: "GĐ 1",
  description: "Bản chất: mạng giải các bài toán đánh địa chỉ, đi đường, tin cậy, chia sẻ đường truyền; phân tầng và đóng gói (encapsulation) là cách chia nhỏ bài toán.",
  lessons: [
    {
      id: "net-1-01",
      number: "1.1",
      title: "Vì sao mạng phải phân tầng? Bài toán chia sẻ đường truyền & Đóng gói dữ liệu",
      subtitle: "Nghịch lý kết nối điểm-điểm, sự cần thiết của Header/Payload và cơ chế Encapsulation/Decapsulation",
      level: "Nền tảng",
      duration: "90 phút",
      objectives: [
        "Hiểu cặn kẽ nghịch lý bùng nổ kết nối điểm-điểm N(N-1)/2 và lý do kiến trúc mạng chuyển mạch gói (Packet Switching) ra đời thay thế chuyển mạch kênh (Circuit Switching).",
        "Nắm vững bản chất chia sẻ đường truyền qua cơ chế dồn kênh theo thời gian thống kê (Statistical Multiplexing) và nguồn gốc cốt lõi của độ trễ hàng đợi (Queueing Delay).",
        "Giải thích nguyên lý phân tầng (Layering Model) và triết lý Tách biệt mối quan tâm (Separation of Concerns): Các tầng độc lập tuyệt đối và chỉ tương tác qua giao diện chuẩn.",
        "Phân tích tường tận vòng đời đóng gói (Encapsulation) chiều gửi và bóc tách (Decapsulation) chiều nhận từ User Space qua Kernel Linux xuống môi trường vật lý.",
        "Tự tay sử dụng tcpdump mổ xẻ từng byte offset của Ethernet Frame, IPv4 Header, UDP/TCP Header, đồng thời dựng phòng lab mạng ảo thực chiến với Network Namespaces."
      ],
      intuition: {
        title: "Bưu Phẩm Quốc Tế & Những Chiếc Hộp Lồng Nhau (Russian Matryoshka)",
        metaphor: "Hãy tưởng tượng bạn muốn gửi một bức thư tình (Application Payload) từ Hà Nội sang Tokyo. Bạn không thể cầm bức thư chạy bộ thẳng sang Nhật Bản (kết nối điểm-điểm trực tiếp). Bạn bỏ bức thư vào phong bì nhỏ và dán nhãn: gửi người nhận tên Hanako tại phòng 402 (Port L4). Công ty chuyển phát nhanh lấy phong bì đó bỏ vào thùng các-tông dán nhãn: Tòa nhà Shibuya, Phố Dogenzaka, Tokyo (Địa chỉ IP L3). Xe tải bưu điện gom hàng trăm thùng các-tông bỏ vào thùng Container xe tải lớn dán nhãn biển số xe: 29C-12345 chạy từ bưu cục Cầu Giấy ra sân bay Nội Bài (MAC Address L2). Cuối cùng, container được nâng lên máy bay bay qua biển (Xung quang/điện L1). Khi máy bay hạ cánh tại Narita, nhân viên dỡ container (Bóc L2), chuyển phát nhanh lấy thùng các-tông theo địa chỉ đường phố Shibuya (Bóc L3), mang lên tầng 4 gõ cửa phòng 402 (Bóc L4), và Hanako mở phong bì đọc bức thư (Payload L7). Từng tầng chỉ quan tâm đến chiếc nhãn của tầng mình và coi mọi thứ bên trong là một khối đen (Payload)!",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">📦</span>
              <span class="net-arch-title">CHU TRÌNH ĐÓNG GÓI &amp; BÓC TÁCH DỮ LIỆU QUA CÁC TẦNG (ENCAPSULATION / DECAPSULATION)</span>
            </div>
            <div class="net-arch-layers">
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">👤 Tầng Ứng dụng (Application Layer — L7)</span>
                  <span class="net-arch-layer-badge">PDU: Data / Message</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Dữ liệu gốc (Application Payload):</strong> <code>GET /index.html HTTP/1.1\\r\\nHost: example.com...</code></div>
                  <div class="net-arch-node"><strong>Hành động:</strong> Ứng dụng gọi lời gọi hệ thống <code>write(sockfd, buf, len)</code> để đẩy dữ liệu vào Kernel RAM.</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Encapsulation: Chuyển xuống Kernel Space qua BSD Socket Subsystem</div>

              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🚚 Tầng Giao vận (Transport Layer — L4: TCP / UDP)</span>
                  <span class="net-arch-layer-badge">PDU: Segment / Datagram</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Thêm TCP Header (20 Bytes):</strong> [Source Port: <code>54321</code> | Dest Port: <code>80</code> | Seq: <code>1001</code> | Ack: <code>0</code> | Flags: <code>[ACK, PSH]</code>]</div>
                  <div class="net-arch-node"><strong>Vai trò:</strong> Định danh tiến trình nhận bằng Port, đảm bảo thứ tự gói tin và kiểm soát tắc nghẽn (Congestion Control).</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Encapsulation: Chuyển tiếp xuống Tầng Mạng (Network Subsystem)</div>

              <div class="net-arch-layer layer-vfs">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🌐 Tầng Mạng (Network Layer — L3: IPv4 / IPv6)</span>
                  <span class="net-arch-layer-badge">PDU: Packet</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Thêm IP Header (20 Bytes):</strong> [Source IP: <code>192.168.1.15</code> | Dest IP: <code>93.184.216.34</code> | TTL: <code>64</code> | Protocol: <code>6 (TCP)</code>]</div>
                  <div class="net-arch-node"><strong>Vai trò:</strong> Định vị địa chỉ logic toàn cầu xuyên mạng, quyết định chặng kế tiếp qua bảng định tuyến (FIB Routing Table).</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Encapsulation: Chuyển xuống Trình điều khiển Card mạng (Network Device Driver)</div>

              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🔗 Tầng Liên kết Dữ liệu (Data Link Layer — L2: Ethernet / Wi-Fi)</span>
                  <span class="net-arch-layer-badge">PDU: Frame</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Thêm Ethernet Header (14 Bytes) &amp; Trailer (4 Bytes):</strong> [Dest MAC: <code>00:1a:2b:3c:4d:5e</code> | Src MAC: <code>e8:9c:25:11:22:33</code> | EtherType: <code>0x0800</code>] + [FCS/CRC32]</div>
                  <div class="net-arch-node"><strong>Vai trò:</strong> Chuyển giao khung dữ liệu giữa 2 giao diện vật lý trong cùng mạng LAN, phát hiện lỗi bit trên đường truyền.</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Tín hiệu vật lý (PHY) chuyển đổi Frame thành dòng xung điện hoặc photon</div>

              <div class="net-arch-layer layer-kernel">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">⚡ Tầng Vật lý (Physical Layer — L1: Cáp Đồng, Cáp Quang, Sóng Vô Tuyến)</span>
                  <span class="net-arch-layer-badge">PDU: Bits / Symbols</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Dòng bit nhị phân (Bitstream):</strong> <code>01001100 01101001 01101110 01110101 01111000...</code></div>
                  <div class="net-arch-node"><strong>Môi trường truyền dẫn:</strong> Xung điện áp (Cáp xoắn đôi RJ45), xung laser photon (Cáp quang quang học), điều chế tần số sóng radio (Wi-Fi 802.11).</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-problem",
          title: "Vấn đề thực tế: Nghịch lý N(N-1)/2 & Chuyển Mạch Gói vs Chuyển Mạch Kênh",
          content: `
            <p>Hãy lùi lại thời kỳ sơ khai của khoa học máy tính để trả lời câu hỏi cốt lõi nhất: <strong>Tại sao chúng ta không thể đơn giản là kéo một sợi dây cáp nối thẳng giữa hai máy tính muốn giao tiếp với nhau?</strong></p>

            <div class="net-topo-box">
              <div class="net-topo-title">💥 NGHỊCH LÝ TOÁN HỌC: BÙNG NỔ KẾT NỐI ĐIỂM-ĐIỂM (FULL MESH TOPOLOGY)</div>
              <p>Nếu bạn có <code>N</code> máy tính và muốn mỗi máy đều có đường truyền dây cáp độc lập nối trực tiếp tới mọi máy khác, số lượng đường dây vật lý cần thiết tuân theo công thức tổ hợp:</p>
              <pre class="code-pre" style="margin:8px 0;background:var(--bg-code);color:var(--text-inverse);"><code>Số đường dây = N * (N - 1) / 2</code></pre>
              <ul>
                <li>Với <strong>4 máy tính:</strong> Cần <code>4 * 3 / 2 = 6</code> sợi cáp. (Khả thi trong một phòng lab nhỏ).</li>
                <li>Với <strong>100 máy tính:</strong> Cần <code>100 * 99 / 2 = 4.950</code> sợi cáp. (Bắt đầu rơi vào khủng hoảng không gian và chi phí card mạng).</li>
                <li>Với <strong>10.000 máy tính:</strong> Cần <code>10.000 * 9.999 / 2 ≈ 50.000.000</code> (50 triệu) sợi cáp!</li>
                <li>Với <strong>1 tỷ thiết bị trên Internet:</strong> Cần xấp xỉ <code>5 * 10^17</code> sợi cáp! Một con số hoàn toàn bất khả thi về mặt vật lý, không gian vũ trụ và kinh tế toàn cầu.</li>
              </ul>
            </div>

            <p>Để giải quyết bài toán này, nhân loại đã trải qua hai cuộc cách mạng kiến trúc:</p>

            <h3 style="margin-top:16px;">1. Chuyển mạch kênh (Circuit Switching) — Mô hình điện thoại viễn thông thế kỷ 20</h3>
            <p>Thay vì nối dây trực tiếp giữa mọi nhà, các thuê bao điện thoại nối vào một <strong>Tổng đài trung tâm (Central Switchboard)</strong>. Khi người A muốn nói chuyện với người B, tổng đài sẽ kết nối vật lý một mạch điện xuyên suốt từ máy A sang máy B. Mạch điện này được <em>dành riêng độc quyền (Dedicated)</em> trong suốt thời gian cuộc gọi.</p>
            <p><strong>Nhược điểm chí tử của chuyển mạch kênh đối với dữ liệu máy tính:</strong></p>
            <ul>
              <li><strong>Lãng phí băng thông trầm trọng:</strong> Dữ liệu máy tính có tính chất 'bùng nổ' (Bursty traffic — tải dữ liệu trong 100ms rồi ngồi đọc 30 giây). Trong suốt thời gian người dùng đọc bài, đường dây hoàn toàn im lặng nhưng không ai khác được phép dùng kênh truyền đó!</li>
              <li><strong>Giới hạn số lượng kết nối:</strong> Nếu tổng đài chỉ có 1.000 mạch điện đồng thời, người thứ 1.001 sẽ nhận tín hiệu báo bận (Busy tone) và bị từ chối phục vụ hoàn toàn.</li>
              <li><strong>Chịu lỗi cực kỳ kém:</strong> Nếu bất kỳ tổng đài trung gian nào trên tuyến mạch bị đứt cáp, toàn bộ cuộc gọi sụp đổ ngay lập tức.</li>
            </ul>

            <h3 style="margin-top:16px;">2. Chuyển mạch gói (Packet Switching) — Phát minh nền tảng khai sinh Internet</h3>
            <p>Vào thập niên 1960, Paul Baran (RAND Corporation) và Donald Davies (National Physical Laboratory) đã đề xuất một ý tưởng mang tính cách mạng: <strong>Chia nhỏ dòng dữ liệu liên tục thành các khối độc lập có kích thước hữu hạn gọi là Gói Tin (Packets)</strong>.</p>
            <p>Trong mạng chuyển mạch gói, các máy tính cùng chia sẻ một đường truyền vật lý chung (Shared Medium) theo cơ chế <strong>Dồn kênh theo thời gian thống kê (Statistical Time Division Multiplexing - STDM)</strong>:</p>
            <ul>
              <li>Máy tính A gửi 3 gói tin, xen kẽ với 2 gói tin của máy B, rồi đến 5 gói tin của máy C trên cùng một sợi cáp quang biển.</li>
              <li>Các thiết bị trung gian (Router / Switch) hoạt động theo cơ chế <strong>Lưu và Chuyển tiếp (Store-and-Forward)</strong>: Nhận trọn vẹn gói tin vào bộ đệm RAM, kiểm tra địa chỉ đích, rồi đẩy sang cổng ra tương ứng.</li>
              <li>Nếu không ai truyền dữ liệu, đường truyền lập tức sẵn sàng 100% cho bất kỳ ai có nhu cầu mà không cần thiết lập mạch trước.</li>
            </ul>

            <div class="net-incident-card">
              <div class="net-incident-header">
                <span>⚠️ NGHỊCH LÝ NẢY SINH KHI CHIA SẺ ĐƯỜNG TRUYỀN:</span>
              </div>
              <div class="net-incident-body">
                Khi hàng triệu máy tính cùng đổ các khối bit vào một đường truyền chung, làm sao một card mạng biết được:
                <ol style="margin:6px 0 0 18px;">
                  <li>Khối bit này bắt đầu từ đâu và kết thúc ở đâu?</li>
                  <li>Ai là người gửi và ai là người nhận đích thực?</li>
                  <li>Dữ liệu này thuộc về tab trình duyệt Web Chrome hay phần mềm Spotify trên máy tính?</li>
                  <li>Nếu một vài bit bị nhiễu điện từ làm biến dạng trên đường dây, làm sao phát hiện để loại bỏ?</li>
                </ol>
                <strong>Câu trả lời duy nhất:</strong> Mỗi khối dữ liệu (Payload) bắt buộc phải được gắn thêm các mẩu thông tin điều khiển ở đầu gọi là <strong>HEADER</strong> và ở cuối gọi là <strong>TRAILER</strong>!
              </div>
            </div>
          `
        },
        {
          id: "sec-mechanism",
          title: "Cơ chế kỹ thuật: Nguyên lý Phân tầng & Chu trình Encapsulation / Decapsulation",
          content: `
            <p>Một gói tin vừa phải mang thông tin kiểm soát lỗi phần cứng, vừa mang địa chỉ định tuyến toàn cầu, vừa mang cổng của tiến trình ứng dụng, vừa phải mã hóa bảo mật. Nếu gom tất cả những logic đó vào một khối phần mềm duy nhất, hệ thống mạng toàn cầu sẽ lâm vào thảm họa <em>Monolithic Coupling</em>:</p>
            <ul>
              <li>Mỗi khi kỹ sư phát minh ra một loại cáp mạng mới (ví dụ từ cáp đồng Ethernet sang cáp quang hoặc sóng Wi-Fi 7), các nhà phát triển ứng dụng Web như Nginx, Chrome, Facebook sẽ phải viết lại toàn bộ mã nguồn ứng dụng!</li>
              <li>Một lỗi nhỏ trong trình điều khiển card mạng có thể làm sập toàn bộ ứng dụng người dùng.</li>
            </ul>

            <p>Để giải phóng sức sáng tạo công nghệ độc lập, kiến trúc mạng áp dụng triệt để nguyên lý <strong>Tách biệt mối quan tâm (Separation of Concerns)</strong>: Hệ thống được chia thành các <strong>TẦNG (LAYERS)</strong> xếp chồng lên nhau. Mỗi tầng chỉ thực hiện một nhiệm vụ duy nhất và cung cấp giao diện chuẩn (API/Service Interface) cho tầng liền kề.</p>

            <div class="net-matrix-table-wrap">
              <table class="net-matrix-table">
                <thead>
                  <tr>
                    <th>Tầng (Layer)</th>
                    <th>Tên gọi Đơn vị Dữ liệu (PDU)</th>
                    <th>Nhiệm vụ cốt lõi duy nhất</th>
                    <th>Định danh cốt lõi</th>
                    <th>Nơi thực thi trong hệ điều hành</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Tầng 7: Application</strong></td>
                    <td class="net-highlight-cell">Message / Data</td>
                    <td>Xử lý logic nghiệp vụ, giao diện người dùng và định dạng dữ liệu (HTTP, DNS, SSH, TLS).</td>
                    <td>URL, Domain, Request Path</td>
                    <td>Không gian người dùng (User Space: Chrome, Nginx, Python)</td>
                  </tr>
                  <tr>
                    <td><strong>Tầng 4: Transport</strong></td>
                    <td class="net-highlight-cell">Segment (TCP) / Datagram (UDP)</td>
                    <td>Giao tiếp giữa hai tiến trình (End-to-End Process), kiểm soát luồng, độ tin cậy và ghép thứ tự.</td>
                    <td>Port (Cổng 16-bit: 80, 443, 22)</td>
                    <td>Không gian nhân Linux (Kernel Network Stack: struct sock, sk_buff)</td>
                  </tr>
                  <tr>
                    <td><strong>Tầng 3: Network</strong></td>
                    <td class="net-highlight-cell">Packet</td>
                    <td>Định địa chỉ logic toàn cầu và tìm đường (Routing) xuyên qua các mạng độc lập.</td>
                    <td>IP Address (IPv4: 32-bit, IPv6: 128-bit)</td>
                    <td>Không gian nhân Linux (Kernel IP Routing &amp; Netfilter)</td>
                  </tr>
                  <tr>
                    <td><strong>Tầng 2: Data Link</strong></td>
                    <td class="net-highlight-cell">Frame</td>
                    <td>Chuyển giao dữ liệu an toàn giữa hai giao diện liền kề trên cùng một đoạn cáp vật lý (Hop-by-Hop).</td>
                    <td>MAC Address (48-bit: <code>52:54:00:...</code>)</td>
                    <td>Kernel Device Driver &amp; Chip điều khiển card mạng (NIC MAC Controller)</td>
                  </tr>
                  <tr>
                    <td><strong>Tầng 1: Physical</strong></td>
                    <td class="net-highlight-cell">Bits / Symbols</td>
                    <td>Mã hóa chuỗi bit 0/1 thành tín hiệu vật lý truyền qua môi trường dẫn truyền.</td>
                    <td>Điện áp (Volt), Tần số sóng (Hz), Photon</td>
                    <td>Phần cứng vật lý (Transceiver PHY, Jack cắm RJ45, SFP+ Module)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style="margin-top:20px;">1. Quy trình Đóng gói (Encapsulation — Chiều gửi Top-Down)</h3>
            <p>Khi bạn gửi một yêu cầu HTTP trong Python: <code>requests.get('http://example.com')</code>, hãy quan sát từng tầng dán thêm 'vỏ bọc' của mình:</p>
            <ol style="line-height:1.75;padding-left:20px;">
              <li><strong>Tầng Ứng dụng (L7):</strong> Chuẩn bị chuỗi byte Payload: <code>GET / HTTP/1.1\r\nHost: example.com\r\n\r\n</code>. Gọi syscall <code>write()</code> chuyển chuỗi byte sang Kernel.</li>
              <li><strong>Tầng Giao vận (L4):</strong> Kernel TCP cấp phát cấu trúc bộ nhớ <code>sk_buff</code>, chèn <strong>TCP Header (20 bytes)</strong> vào trước payload. Header này chứa <em>Source Port (ví dụ 51234)</em> và <em>Destination Port (80)</em> cùng số thứ tự byte <em>Sequence Number</em>. Khối dữ liệu này giờ đây được gọi là <strong>TCP Segment</strong>.</li>
              <li><strong>Tầng Mạng (L3):</strong> Kernel IP tra bảng định tuyến (Routing Table), xác định IP nguồn và IP đích. Chèn tiếp <strong>IPv4 Header (20 bytes)</strong> vào trước TCP Segment. Header này ghi rõ <em>Source IP</em>, <em>Destination IP</em>, <em>TTL = 64</em> và trường <em>Protocol = 6 (TCP)</em>. Khối dữ liệu này giờ đây được gọi là <strong>IP Packet</strong>.</li>
              <li><strong>Tầng Liên kết Dữ liệu (L2):</strong> Kernel hỏi bảng ARP để tìm địa chỉ phần cứng của Router kế tiếp (Next-hop Gateway). Driver card mạng chèn <strong>Ethernet Header (14 bytes)</strong> chứa <em>Source MAC</em>, <em>Destination MAC</em> và <em>EtherType = 0x0800 (IPv4)</em>, đồng thời gắn thêm <strong>Ethernet Trailer (4 bytes CRC)</strong> vào cuối. Khối dữ liệu này giờ đây được gọi là <strong>Ethernet Frame</strong>.</li>
              <li><strong>Tầng Vật lý (L1):</strong> Card mạng (NIC) đẩy Frame ra bộ đệm phần cứng Tx Ring Buffer, chuyển đổi từng byte nhị phân thành xung điện hoặc ánh sáng bắn lên dây cáp.</li>
            </ol>

            <h3 style="margin-top:20px;">2. Quy trình Bóc tách (Decapsulation — Chiều nhận Bottom-Up)</h3>
            <p>Tại máy chủ đích, dòng bit đi từ dây cáp quang đi ngược lên qua từng tầng thẩm vấn:</p>
            <ol style="line-height:1.75;padding-left:20px;">
              <li><strong>Tầng Vật lý (L1):</strong> Chip PHY trên card mạng nhận xung điện, tái tạo thành chuỗi bit và đưa vào bộ đệm Rx Ring Buffer.</li>
              <li><strong>Tầng Liên kết Dữ liệu (L2):</strong> Vi mạch MAC kiểm tra mã CRC trong Trailer. Nếu đường truyền bị nhiễu làm sai dù chỉ 1 bit, card mạng <em>drop (vứt bỏ)</em> ngay lập tức ở cấp phần cứng. Nếu toàn vẹn, nó kiểm tra Destination MAC xem có khớp với card mạng của mình không. Nếu khớp, nó <strong>bóc bỏ Ethernet Header</strong>, đọc trường <code>EtherType = 0x0800</code> và bàn giao gói tin còn lại cho phân hệ IPv4 trong Kernel.</li>
              <li><strong>Tầng Mạng (L3):</strong> Phân hệ IPv4 kiểm tra IP đích xem có phải là địa chỉ của máy mình không, kiểm tra Checksum và giảm TTL. Nếu hợp lệ, nó <strong>bóc bỏ IP Header</strong>, đọc trường <code>Protocol = 6</code> và gọi hàm bàn giao cho phân hệ TCP (<code>tcp_v4_rcv()</code>).</li>
              <li><strong>Tầng Giao vận (L4):</strong> Phân hệ TCP kiểm tra số Sequence Number để xếp đúng thứ tự dữ liệu, gửi gói tin ACK xác nhận về cho máy gửi. Sau đó, nó đọc <code>Destination Port = 80</code>, tra cứu trong bảng Socket Hash Table để tìm đúng tiến trình Web Server đang lắng nghe trên cổng 80. Nó <strong>bóc bỏ TCP Header</strong> và đẩy chuỗi byte dữ liệu gốc vào hàng đợi <code>sk_receive_queue</code> của socket đó.</li>
              <li><strong>Tầng Ứng dụng (L7):</strong> Tiến trình Web Server đang ngủ trong hàm <code>epoll_wait()</code> hoặc <code>read()</code> được Kernel đánh thức. Nó đọc được chính xác 100% bức thông điệp ban đầu mà không hề hay biết gói tin đã trải qua bao nhiêu card mạng hay sợi cáp quang nào!</li>
            </ol>
          `
        },
        {
          id: "sec-packet-structure",
          title: "Giải phẫu Nhị Phân: Cấu trúc Header & Nghịch lý Overhead",
          content: `
            <p>Để hiểu rõ bản chất kỹ thuật, chúng ta hãy mổ xẻ từng byte cấu trúc của một khung dữ liệu mạng hoàn chỉnh khi di chuyển trên cáp Ethernet:</p>

            <div class="net-header-diagram">
              <div class="net-header-title"><span>🔬</span> GIẢI PHẪU CẤU TRÚC KHUNG DỮ LIỆU ĐÓNG GÓI TỪNG LỚP (ENCAPSULATION PDU)</div>
              <table class="net-header-table">
                <thead>
                  <tr>
                    <th style="width:20%;">Lớp Vỏ Bọc</th>
                    <th style="width:12%;">Kích thước</th>
                    <th style="width:30%;">Các trường nhị phân cốt lõi</th>
                    <th style="width:38%;">Vai trò giải mã trong Kernel Linux</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="field-highlight"><strong>Ethernet Header (L2)</strong></td>
                    <td>14 Bytes</td>
                    <td>Dest MAC (6B), Src MAC (6B), EtherType (2B)</td>
                    <td>Xác định card mạng vật lý kế tiếp trong mạng LAN. Trường EtherType (<code>0x0800</code> = IPv4, <code>0x86DD</code> = IPv6, <code>0x0806</code> = ARP) chỉ định tầng L3 xử lý.</td>
                  </tr>
                  <tr>
                    <td class="field-highlight"><strong>IPv4 Header (L3)</strong></td>
                    <td>20 Bytes (chuẩn)</td>
                    <td>Version/IHL (1B), ToS (1B), Total Length (2B), ID/Flags/Frag (4B), TTL (1B), Protocol (1B), Checksum (2B), Src IP (4B), Dst IP (4B)</td>
                    <td>Định tuyến gói tin xuyên qua Internet. Trường Protocol (<code>6</code> = TCP, <code>17</code> = UDP, <code>1</code> = ICMP) báo cho Kernel biết hàm L4 nào sẽ tiếp nhận gói.</td>
                  </tr>
                  <tr>
                    <td class="field-highlight"><strong>TCP Header (L4)</strong></td>
                    <td>20 Bytes (chuẩn)</td>
                    <td>Src Port (2B), Dst Port (2B), Seq Num (4B), Ack Num (4B), Offset/Flags (2B), Window Size (2B), Checksum (2B), Urg Ptr (2B)</td>
                    <td>Định danh tiến trình ứng dụng bằng Port. Quản lý trạng thái kết nối, cửa sổ trượt (Flow Control) và kiểm soát tắc nghẽn mạng.</td>
                  </tr>
                  <tr>
                    <td style="background:rgba(34,197,94,0.15);color:#4ade80;font-weight:bold;"><strong>Application Payload (L7)</strong></td>
                    <td>Variable (0 - 1460B)</td>
                    <td>HTTP Header/Body, TLS Handshake, DNS Query, SSH stream...</td>
                    <td>Dữ liệu nghiệp vụ thuần túy của ứng dụng người dùng. Đối với toàn bộ Network Stack bên dưới, đây chỉ là một mảng byte nhị phân mờ đục (Opaque Bytes).</td>
                  </tr>
                  <tr>
                    <td style="color:#94a3b8;"><strong>Ethernet Trailer (L2)</strong></td>
                    <td>4 Bytes</td>
                    <td>FCS (Frame Check Sequence — Thuật toán CRC32)</td>
                    <td>Mã kiểm tra lỗi phần cứng: Card mạng nhận tính toán lại CRC32 trên toàn bộ khung. Nếu sai lệch do suy hao tín hiệu thì hủy gói tin lập tức.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style="margin-top:20px;">Định lượng Hệ số Hao phí Băng thông (Header Overhead)</h3>
            <p>Mỗi tầng phân bọc đều bổ sung Header để phục vụ chức năng của mình. Điều này dẫn tới một bài toán kinh tế mạng vô cùng thú vị:</p>

            <div class="net-topo-box">
              <div class="net-topo-title">📊 BÀI TOÁN TỶ LỆ OVERHEAD TRONG THỰC TẾ</div>
              <p><strong>Trường hợp 1: Gói tin cực nhỏ (Worst-case Scenario — Gõ 1 ký tự SSH hoặc gửi 1 TCP ACK thuần túy)</strong></p>
              <ul>
                <li>Dữ liệu ứng dụng thực tế (Payload): <strong>1 Byte</strong>.</li>
                <li>TCP Header: <strong>20 Bytes</strong>.</li>
                <li>IPv4 Header: <strong>20 Bytes</strong>.</li>
                <li>Ethernet Header + FCS Trailer: <strong>14 + 4 = 18 Bytes</strong>.</li>
                <li>Hao phí tầng vật lý L1 (Preamble 7B + SFD 1B + Interpacket Gap 12B): <strong>20 Bytes</strong>.</li>
                <li><strong>Tổng dung lượng chiếm dụng trên dây cáp:</strong> <code>1 + 20 + 20 + 18 + 20 = 79 Bytes</code>!</li>
                <li><strong>Hiệu suất truyền tải dữ liệu hữu ích:</strong> <code>1 / 79 ≈ 1,26%</code>! (Hơn 98,7% băng thông bị tiêu tốn chỉ để chở các lớp bao bì đóng gói).</li>
              </ul>

              <p style="margin-top:10px;"><strong>Trường hợp 2: Tải file dung lượng lớn đạt trần MTU tiêu chuẩn (Best-case Scenario)</strong></p>
              <ul>
                <li>MTU tiêu chuẩn của Ethernet: <strong>1500 Bytes</strong>.</li>
                <li>Dữ liệu ứng dụng tối đa (MSS - Maximum Segment Size): <code>1500 - 20 (IP) - 20 (TCP) = 1460 Bytes</code>.</li>
                <li>Tổng kích thước chiếm dụng trên dây cáp: <code>1500 + 18 (Eth) + 20 (PHY) = 1538 Bytes</code>.</li>
                <li><strong>Hiệu suất truyền tải dữ liệu hữu ích:</strong> <code>1460 / 1538 ≈ 94,93%</code>!</li>
              </ul>
            </div>

            <p>Từ bài toán định lượng trên, các kỹ sư hệ thống đã phát minh ra các kỹ thuật tối ưu hóa kinh điển trên Linux:</p>
            <ul>
              <li><strong>Thuật toán Nagle (Nagle's Algorithm):</strong> Mặc định Kernel gom các mẩu dữ liệu nhỏ trong buffer và chỉ gửi đi khi đã gom đủ kích thước MSS hoặc khi nhận được ACK của gói tin trước. (Với ứng dụng thời gian thực như game online hoặc giao dịch tài chính tần suất cao, ta phải tắt nó bằng cờ <code>TCP_NODELAY</code>).</li>
              <li><strong>Jumbo Frames (MTU 9000):</strong> Trong các trung tâm dữ liệu (Data Center) và mạng lưu trữ SAN (iSCSI, Ceph), người ta nâng MTU từ 1500 lên 9000 bytes. Nhờ đó, một gói tin chở được tới 8960 bytes dữ liệu, giảm số lượng ngắt phần cứng (Hardware Interrupts) và giảm tải CPU máy chủ tới hơn 50%.</li>
              <li><strong>TSO (TCP Segmentation Offload) &amp; GRO (Generic Receive Offload):</strong> Thay vì bắt CPU Kernel băm nhỏ dòng dữ liệu 64KB thành từng gói tin 1500 bytes, Kernel đẩy nguyên khối 64KB xuống card mạng thông minh (SmartNIC) để chip phần cứng tự động đóng gói TCP/IP Header ở tốc độ dây (Line-rate).</li>
            </ul>
          `
        },
        {
          id: "sec-observe",
          title: "Quan sát trên Linux: Tự tay Bắt & Bóc Tách Từng Byte Encapsulation",
          content: `
            <p>Không học vẹt trên lý thuyết! Chúng ta sẽ sử dụng công cụ chuẩn mực <code>tcpdump</code> trên Linux để bắt một gói tin thực tế và soi từng cặp số Hexadecimal tương ứng với từng tầng đóng gói.</p>
          `,
          codeExamples: [
            {
              title: "Bước 1: Bắt gói tin UDP qua giao diện Loopback với tcpdump",
              lang: "Bash",
              code: "# Terminal 1: Lắng nghe trên loopback (lo), in số liệu không phân giải tên (-nn), hiển thị cả mã Hex và ký tự ASCII (-XX)\nsudo tcpdump -i lo -nn -XX 'udp port 9999' -c 1\n\n# Terminal 2: Bắn một thông điệp UDP ngắn sang cổng 9999 bằng netcat\necho -n \"Hello Net!\" | nc -u -w1 127.0.0.1 9999",
              output: "09:15:30.104231 IP 127.0.0.1.53426 > 127.0.0.1.9999: UDP, length 10\n\t0x0000:  0200 0000 4500 0026 89ab 4000 4011 f1f6  ....E..&..@.@...\n\t0x0010:  7f00 0001 7f00 0001 d0b2 270f 001e a1b2  ..........'.....\n\t0x0020:  4865 6c6c 6f20 4e65 7421                 Hello.Net!",
              annotations: [
                { line: 2, text: "Cờ -i lo lắng nghe giao diện loopback; -nn không phân giải DNS hay service name; -XX in toàn bộ gói ở định dạng hex và text." },
                { line: 5, text: "Gửi đúng 10 ký tự ASCII 'Hello Net!' qua giao thức UDP không có ký tự ngắt dòng (echo -n)." },
                { line: 6, text: "tcpdump báo cáo: Gói tin từ 127.0.0.1 cổng 53426 gửi tới 127.0.0.1 cổng 9999, độ dài UDP payload là 10 bytes." }
              ]
            },
            {
              title: "Bước 2: Giải phẫu chi tiết từng cặp Byte Offset từ kết quả tcpdump",
              lang: "Text",
              code: "# --- LOOPBACK HEADER (4 bytes trên Linux lo interface) ---\n0200 0000              -> AF_INET (IPv4 Family)\n\n# --- IPv4 HEADER (20 bytes: 0x4500 đến 0x7f000001) ---\n45                     -> Version 4 (IPv4), Internet Header Length = 5 (5 x 4 = 20 bytes)\n00                     -> DSCP / ECN (Dịch vụ chuẩn, không ưu tiên đặc biệt)\n0026                   -> Total Length = 0x0026 (38 bytes thập phân = 20B IP + 8B UDP + 10B Data)\n89ab 4000              -> Identification = 0x89ab, Flags = 0x40 (Don't Fragment - DF set)\n40                     -> Time To Live (TTL) = 0x40 (64 thập phân)\n11                     -> Protocol = 0x11 (17 thập phân, mã hiệu giao thức UDP!)\nf1f6                   -> Header Checksum (Mã kiểm tra tính toàn vẹn của IP Header)\n7f00 0001              -> Source IP: 127.0.0.1 (0x7f = 127, 0x00 = 0, 0x01 = 1)\n7f00 0001              -> Destination IP: 127.0.0.1\n\n# --- UDP HEADER (8 bytes: 0xd0b2 đến 0xa1b2) ---\nd0b2                   -> Source Port = 0xd0b2 (53426 thập phân)\n270f                   -> Destination Port = 0x270f (9999 thập phân)\n001e                   -> Length = 0x001e (30 bytes = 8B UDP Header + 10B Data)\na1b2                   -> UDP Checksum\n\n# --- APPLICATION PAYLOAD (10 bytes: Chuỗi 'Hello Net!') ---\n48 65 6c 6c 6f 20 4e 65 74 21  -> Mã ASCII: 'H' 'e' 'l' 'l' 'o' ' ' 'N' 'e' 't' '!'",
              output: "Phân tích khớp 100%: Toàn bộ 38 bytes nhị phân được bóc tách rạch ròi theo chuẩn RFC!",
              annotations: [
                { line: 5, text: "Byte 0x45 là chữ ký đặc trưng mở đầu của mọi gói tin IPv4 tiêu chuẩn: số 4 là version, số 5 nhân 4 bằng 20 bytes header." },
                { line: 9, text: "Byte 0x11 (17 thập phân): Đây là căn cứ để Kernel Linux biết phải chuyển gói này cho hàm udp_rcv() thay vì tcp_v4_rcv()." },
                { line: 16, text: "Cổng đích 0x270f (9999): Căn cứ để Kernel tìm đúng struct socket trong bảng băm của tiến trình netcat." }
              ]
            }
          ]
        },
        {
          id: "sec-lab",
          title: "Phòng Lab thực hành: Mổ xẻ Chuỗi Đóng Gói qua Network Namespaces",
          content: `
            <div class="net-topo-box">
              <div class="net-topo-title">🧪 PHÒNG LAB THỰC HÀNH 1.1: TẠO TOPO MẠNG CÔ LẬP VÀ MỔ XẺ ENCAPSULATION</div>
              <p><strong>Mục tiêu:</strong> Tự tay tạo 2 không gian mạng ảo (Network Namespaces) tách biệt hoàn toàn trong Kernel Linux, kết nối chúng bằng một cặp dây cáp mạng ảo (Virtual Ethernet - <code>veth pair</code>), bắt gói tin Ethernet Frame đầy đủ cả địa chỉ MAC L2, và kiểm chứng hiện tượng từ chối truyền khi vượt quá MTU.</p>
              <p><strong>Môi trường &amp; Công cụ:</strong> Mọi máy Linux (Ubuntu, Debian, CentOS hoặc WSL2 có hỗ trợ kernel modules). Công cụ: <code>ip</code>, <code>tcpdump</code>, <code>ping</code>.</p>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Khởi tạo 2 Network Namespaces cô lập tuyệt đối</h4>
              </div>
              <p class="net-step-desc">Tạo 2 không gian mạng ảo đại diện cho 2 máy tính độc lập (Client và Server). Mỗi namespace sở hữu bảng định tuyến, interface và socket table riêng:</p>
              <pre class="code-pre"><code>sudo ip netns add ns-client
sudo ip netns add ns-server
ip netns list</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Lệnh <code>ip netns list</code> hiển thị rõ cả 2 namespace <code>ns-client</code> và <code>ns-server</code>.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 2</span>
                <h4 class="net-step-title">Tạo sợi dây cáp mạng ảo (veth pair) và cắm vào 2 Namespace</h4>
              </div>
              <p class="net-step-desc">Thiết bị <code>veth</code> (Virtual Ethernet) hoạt động giống hệt một sợi dây cáp mạng 2 đầu: dữ liệu đi vào đầu này sẽ lập tức chui ra đầu kia ở tầng L2:</p>
              <pre class="code-pre"><code># Tạo cặp cáp ảo veth-c và veth-s
sudo ip link add veth-c type veth peer name veth-s

# Cắm đầu veth-c vào ns-client, cắm đầu veth-s vào ns-server
sudo ip link set veth-c netns ns-client
sudo ip link set veth-s netns ns-server</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Chạy <code>sudo ip netns exec ns-client ip link</code> sẽ thấy interface <code>veth-c</code> xuất hiện bên trong namespace client.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 3</span>
                <h4 class="net-step-title">Cấu hình địa chỉ IP, kích hoạt Interface và bật Loopback</h4>
              </div>
              <p class="net-step-desc">Gán dải mạng <code>10.10.1.0/24</code> cho 2 đầu dây cáp ảo và kích hoạt trạng thái UP:</p>
              <pre class="code-pre"><code># Cấu hình phía Client (10.10.1.1/24)
sudo ip netns exec ns-client ip addr add 10.10.1.1/24 dev veth-c
sudo ip netns exec ns-client ip link set veth-c up
sudo ip netns exec ns-client ip link set lo up

# Cấu hình phía Server (10.10.1.2/24)
sudo ip netns exec ns-server ip addr add 10.10.1.2/24 dev veth-s
sudo ip netns exec ns-server ip link set veth-s up
sudo ip netns exec ns-server ip link set lo up</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Chạy <code>sudo ip netns exec ns-client ping -c 1 10.10.1.2</code> thấy kết quả <code>0% packet loss</code>. Hai máy ảo đã thông mạng!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 4</span>
                <h4 class="net-step-title">Soi toàn diện Ethernet MAC Header (L2) bằng cờ -e trong tcpdump</h4>
              </div>
              <p class="net-step-desc">Khác với loopback, sợi cáp <code>veth</code> là card Ethernet đầy đủ. Hãy dùng cờ <code>-e</code> để bắt trọn cả 14 bytes Ethernet Header:</p>
              <pre class="code-pre"><code># Lắng nghe 1 gói ICMP Echo Request trên đầu cáp veth-s của Server
sudo ip netns exec ns-server tcpdump -i veth-s -e -nn -XX 'icmp' -c 1 &amp;
TCPDUMP_PID=$!

# Client gửi đúng 1 gói ping sang Server
sudo ip netns exec ns-client ping -c 1 10.10.1.2 &gt; /dev/null</code></pre>
              <p class="net-step-desc" style="margin-top:8px;">Quan sát kết quả dòng đầu tiên của tcpdump:</p>
              <pre class="code-pre"><code># Output mẫu:
# 52:54:00:12:34:56 &gt; 52:54:00:ab:cd:ef, ethertype IPv4 (0x0800), length 98: 10.10.1.1 &gt; 10.10.1.2: ICMP echo request</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Khám phá cốt lõi:</strong> Bạn thấy rõ địa chỉ Source MAC và Destination MAC của 2 đầu cáp <code>veth</code>, kèm trường <code>ethertype IPv4 (0x0800)</code>. Đây chính là bằng chứng sống của việc đóng gói L2 bọc quanh gói tin L3!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 5</span>
                <h4 class="net-step-title">Thử nghiệm 'Cố tình phá vỡ MTU' để quan sát phản ứng của Kernel</h4>
              </div>
              <p class="net-step-desc">Hạ MTU của đường truyền xuống 1200 bytes và thử gửi một gói tin 1300 bytes có cờ <code>Don't Fragment (DF)</code>:</p>
              <pre class="code-pre"><code># Hạ MTU của interface veth-c xuống 1200 bytes
sudo ip netns exec ns-client ip link set veth-c mtu 1200

# Gửi gói ping với payload 1250 bytes kèm cờ cấm phân mảnh (-M do)
sudo ip netns exec ns-client ping -M do -s 1250 10.10.1.2</code></pre>
              <p class="net-step-desc" style="margin-top:8px;">Kết quả Kernel lập tức trả về lỗi ngay tại máy gửi mà không hề đẩy gói ra đường dây:</p>
              <pre class="code-pre"><code>ping: local error: message too long, mtu=1200</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Nguyên lý:</strong> Tổng kích thước gói = 1250B (Payload) + 8B (ICMP) + 20B (IP Header) = 1278 Bytes &gt; MTU 1200 Bytes. Vì cờ DF được bật, Kernel từ chối truyền và báo lỗi kích thước vượt trần!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 6</span>
                <h4 class="net-step-title">Dọn dẹp môi trường Lab an toàn 100%</h4>
              </div>
              <p class="net-step-desc">Xóa bỏ 2 namespace. Khi namespace bị xóa, các interface <code>veth</code> gắn trong đó sẽ tự động bị Kernel giải phóng sạch sẽ:</p>
              <pre class="code-pre"><code>sudo ip netns del ns-client
sudo ip netns del ns-server</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Hệ thống sạch sẽ:</strong> Không để lại bất kỳ cấu hình rác nào trên máy chủ của bạn!</span>
              </div>
            </div>
          `
        },
        {
          id: "sec-production",
          title: "Môi trường Production & Ca sự cố: Bệnh án 'MTU Mismatch & Black Hole Router'",
          content: `
            <div class="net-postmortem-card">
              <div class="net-postmortem-header">
                <span class="net-postmortem-badge">SRE POST-MORTEM</span>
                <span class="net-postmortem-title">Hồ Sơ Sự Cố: Ping Thông, SSH Được Nhưng Web Server Bị Treo Cứng Bí Ẩn Khi Tải File Lớn</span>
              </div>
              <div class="net-postmortem-body">
                <p><strong>🚨 Bối cảnh sự cố:</strong> Một công ty công nghệ kết nối chi nhánh văn phòng với cụm máy chủ đám mây (Cloud VPC) thông qua đường hầm mạng ảo VPN IPsec / WireGuard kết hợp mạng Overlay (Kubernetes VXLAN). Đột ngột, các lập trình viên báo cáo:</p>
                <ul>
                  <li>Họ vẫn <code>ping</code> tới máy chủ thành công 100% với thời gian đáp ứng cực nhanh (RTT 15ms).</li>
                  <li>Họ vẫn đăng nhập <code>ssh</code> vào máy chủ và gõ các lệnh ngắn như <code>ls</code>, <code>pwd</code> bình thường.</li>
                  <li><strong>NHƯNG:</strong> Mỗi khi họ chạy <code>git clone</code>, <code>docker pull</code>, hoặc mở trình duyệt tải trang Web nội bộ thì trang web lập tức quay vòng tròn vô tận và báo lỗi <code>Connection timed out</code> sau 2 phút!</li>
                </ul>

                <p style="margin-top:12px;"><strong>💥 Triệu chứng trích xuất từ cURL và tcpdump:</strong></p>
                <div class="net-log-terminal">$ curl -vvv https://api.internal.company.com/large-dataset
* Connected to api.internal.company.com (10.200.1.50) port 443
* ALPN: offers h2,http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (512 bytes):
* [KẾT NỐI BỊ ĐƠ CỨNG TẠI ĐÂY SUỐT 120 GIÂY...]
* OpenSSL SSL_connect: Connection timed out in connection to api.internal.company.com:443
* Closing connection</div>

                <p><strong>🔍 Phân tích nguyên nhân gốc rễ (Root Cause Analysis - RCA):</strong></p>
                <ul>
                  <li>Hạ tầng mạng cáp quang vật lý có giới hạn MTU tiêu chuẩn là <strong>1500 Bytes</strong>.</li>
                  <li>Khi đi qua đường hầm VPN/VXLAN, hệ thống đóng gói thêm <strong>Outer IP + UDP + Encapsulation Header (khoảng 50 - 80 bytes)</strong>.</li>
                  <li>Do đó, kích thước MTU khả dụng thực tế bên trong đường hầm chỉ còn <strong>1420 Bytes</strong>!</li>
                  <li>Các lệnh <code>ping</code> (84 bytes), <code>ssh</code> gõ phím (khoảng 100 bytes) hay bắt tay TCP SYN/ACK (60 bytes) có kích thước rất nhỏ, nên đi qua đường hầm 1420 bytes hoàn toàn trơn tru.</li>
                  <li>Khi Web Server phản hồi dữ liệu lớn (chứng chỉ TLS Certificate hoặc dữ liệu JSON), TCP gửi gói tin tối đa kích thước tiêu chuẩn <strong>1500 Bytes</strong> với cờ <code>DF = 1 (Don't Fragment)</code>.</li>
                  <li>Router đóng gói VPN ở biên không thể nhét gói 1500B vào đường hầm 1420B mà không được phép phân mảnh. Nó buộc phải <strong>vứt bỏ (DROP)</strong> gói tin và gửi lại một thông điệp cảnh báo lỗi <code>ICMP Type 3 Code 4 (Destination Unreachable: Fragmentation Needed and DF set)</code> về cho Web Server.</li>
                  <li><strong>THẢM HỌA NẰM Ở ĐÂY:</strong> Quản trị viên bảo mật của công ty đã cấu hình tường lửa Firewall theo kiểu cực đoan: <code>iptables -A INPUT -p icmp -j DROP</code> ("chặn sạch ping và ICMP cho an toàn")!</li>
                  <li>Hậu quả: Gói tin ICMP báo lỗi bị firewall chặn đứng. Router biên trở thành một <strong>'Lỗ Đen Mạng' (Black Hole Router)</strong>. Web Server không hề biết gói tin bị drop vì kích thước quá lớn, nó ngỡ rằng bị mất gói do nghẽn mạng nên liên tục truyền lại gói 1500B cũ (TCP Retransmission) cho tới khi hết giờ (Timeout)!</li>
                </ul>

                <p style="margin-top:14px;"><strong>💊 Phác đồ điều trị triệt để của Kiến trúc sư Hạ tầng:</strong></p>
                <ol class="net-treatment-list">
                  <li>
                    <strong>Đo đạc Path MTU chính xác tới đích bằng cờ cấm phân mảnh:</strong>
                    <pre class="code-pre" style="margin:6px 0;"><code># Thử kích thước 1472 (1472 + 28 = 1500) -> Thất bại
ping -M do -s 1472 10.200.1.50
# Giảm dần tìm điểm thông suốt (ví dụ 1392 + 28 = 1420 Bytes) -> Thành công!
ping -M do -s 1392 10.200.1.50</code></pre>
                  </li>
                  <li>
                    <strong>Kích hoạt cơ chế MSS Clamping trên Firewall Linux (iptables / nftables):</strong>
                    <p style="margin:4px 0;font-size:0.86rem;">Tự động ép trần kích thước TCP MSS trong gói tin SYN bắt tay để máy khách và máy chủ tự động giới hạn kích thước gói nhỏ hơn MTU đường hầm:</p>
                    <pre class="code-pre" style="margin:6px 0;"><code>sudo iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu</code></pre>
                  </li>
                  <li>
                    <strong>Mở khóa ICMP Fragmentation Needed trên toàn bộ hệ thống Firewall:</strong>
                    <pre class="code-pre" style="margin:6px 0;"><code>sudo iptables -I INPUT -p icmp --icmp-type fragmentation-needed -j ACCEPT
sudo iptables -I FORWARD -p icmp --icmp-type fragmentation-needed -j ACCEPT</code></pre>
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
            title: "Nhầm lẫn tai hại giữa MTU (Layer 3) và MSS (Layer 4 TCP)",
            content: "Nhiều kỹ sư nhầm tưởng MTU và MSS là một. Không phải! MTU (Maximum Transmission Unit) là kích thước tối đa của toàn bộ gói tin IP (bao gồm cả IP Header, TCP Header và Data). Trong khi đó, MSS (Maximum Segment Size) CHỈ tính phần dữ liệu ứng dụng thuần túy (Payload) của tầng TCP. Trên mạng Ethernet tiêu chuẩn: `MTU = 1500 bytes`, suy ra `MSS = MTU - 20 (IP Header) - 20 (TCP Header) = 1460 bytes`."
          },
          {
            title: "Tắt sạch gói tin ICMP trong Firewall vì lý do 'Bảo mật ngây thơ'",
            content: "Nhiều người nghĩ rằng chặn toàn bộ giao thức ICMP (`iptables -A INPUT -p icmp -j DROP`) sẽ giúp máy chủ tàng hình và an toàn. Sai lầm nghiêm trọng này sẽ giết chết cơ chế Path MTU Discovery (PMTUD). Máy chủ của bạn sẽ trở thành nạn nhân của 'Lỗ đen mạng' (Black Hole Router), khiến các kết nối HTTPS lớn hoặc VPN bị treo cứng bí ẩn."
          }
        ],
        tips: [
          {
            title: "Công thức tính nhanh kích thước payload chuẩn xác cho lệnh ping",
            content: "Khi dùng lệnh `ping -s <size>`, tham số `-s` chỉ quy định phần Data Payload của gói ICMP. Một gói tin ICMP hoàn chỉnh cần thêm 8 bytes ICMP Echo Header và 20 bytes IPv4 Header (tổng cộng 28 bytes). Muốn kiểm tra xem đường truyền có chịu được gói tin 1500 bytes hay không, hãy chạy: `ping -M do -s 1472 <dest>` (vì `1472 + 28 = 1500`)."
          },
          {
            title: "Bật cờ -e trong tcpdump để soi rõ MAC Address L2",
            content: "Mặc định `tcpdump` chỉ in thông tin từ tầng L3 trở lên (IP nguồn -> IP đích). Hãy luôn thêm cờ `-e` (`sudo tcpdump -e -nn`) khi cần chẩn đoán sự cố L2: bạn sẽ thấy rõ địa chỉ MAC nguồn, MAC đích và mã định danh EtherType của từng khung dữ liệu."
          }
        ]
      },
      exercises: [
        {
          level: "Dễ",
          title: "Tính toán Tỷ lệ Hao phí Băng thông (Overhead) của Gói tin TCP ACK",
          problem: "Một tiến trình client gửi một gói tin TCP ACK thuần túy (không mang dữ liệu ứng dụng, tức Payload = 0 bytes) qua mạng Ethernet tiêu chuẩn với IPv4 không có trường Options.\n\n1. Hãy tính tổng kích thước của gói tin tính từ Ethernet Header đến hết Ethernet FCS Trailer (Layer 2).\n2. Nếu tính cả các trường tiền đề và khoảng cách tầng vật lý (Preamble 7 bytes, SFD 1 byte, Interpacket Gap 12 bytes), tổng số byte tiêu tốn trên dây cáp là bao nhiêu?",
          hint: "Cộng dồn kích thước từng header chuẩn: Ethernet Header (14B), IP Header (20B), TCP Header (20B), Ethernet FCS Trailer (4B), và các byte lớp vật lý L1.",
          solutionCode: "# 1. Tính kích thước khung Layer 2:\n# Ethernet Header: 14 bytes\n# IPv4 Header:     20 bytes\n# TCP Header:      20 bytes\n# Payload:          0 bytes\n# Ethernet FCS:     4 bytes\n# -> Kích thước Khung L2 = 14 + 20 + 20 + 0 + 4 = 58 bytes.\n# Chú ý: Chuẩn Ethernet quy định kích thước khung tối thiểu là 64 bytes.\n# Do đó, card mạng sẽ tự động chèn thêm 6 bytes padding (0x00) -> Khung L2 = 64 bytes.\n\n# 2. Tính kích thước tổng trên tầng vật lý L1:\n# Preamble (7B) + SFD (1B) + L2 Frame (64B) + Interpacket Gap (12B) = 84 bytes.",
          solutionOutput: "Kích thước L2 Frame: 64 bytes (đã gồm 6 bytes padding)\nKích thước trên dây L1: 84 bytes",
          explanation: "Một gói tin TCP ACK dù không mang theo bất kỳ byte dữ liệu người dùng nào nhưng vẫn tiêu tốn tối thiểu 64 bytes trên tầng liên kết dữ liệu và 84 bytes trên dây cáp vật lý. Điều này giải thích tại sao khi đường truyền bị nghẽn chiều tải lên (Upload bị bão hòa bởi các gói tin ACK), tốc độ tải xuống (Download) cũng sẽ bị sụt giảm nghiêm trọng theo."
        },
        {
          level: "Vừa",
          title: "Dò tìm chính xác Path MTU tới một máy chủ Internet bằng ping",
          problem: "Viết một đoạn script Bash ngắn sử dụng vòng lặp và lệnh `ping -M do -s` để tự động dò tìm kích thước Payload lớn nhất (MSS) có thể truyền từ máy bạn tới DNS Server `1.1.1.1` mà không bị phân mảnh, từ đó suy ra Path MTU chính xác của đường truyền Internet nhà bạn.",
          hint: "Thử nghiệm từ kích thước 1480 giảm dần về 1400. Khi lệnh ping trả về mã thoát 0 thành công lần đầu tiên, lấy kích thước đó cộng thêm 28 bytes sẽ ra Path MTU.",
          solutionCode: "for size in $(seq 1472 -10 1400); do\n  if ping -M do -s $size -c 1 -W 1 1.1.1.1 >/dev/null 2>&1; then\n    echo \"Payload lớn nhất không bị phân mảnh: $size bytes\"\n    echo \"Path MTU thực tế của đường truyền: $((size + 28)) bytes\"\n    break\n  fi\ndone",
          solutionOutput: "Payload lớn nhất không bị phân mảnh: 1472 bytes\nPath MTU thực tế của đường truyền: 1500 bytes",
          explanation: "Cờ `-M do` yêu cầu Kernel bật cờ DF (Don't Fragment) trong IP Header. Nếu gói tin vượt quá MTU của bất kỳ chặng nào trên đường đi, router chặng đó sẽ drop gói và ping sẽ thất bại. Khi tìm được kích thước payload lớn nhất chạy thành công, ta cộng thêm 20 bytes IP Header và 8 bytes ICMP Header để ra giá trị Path MTU chuẩn."
        },
        {
          level: "Thử thách",
          title: "Tự tay Bóc tách và Giải mã thủ công chuỗi Hex của Ethernet Header bằng tcpdump & xxd",
          problem: "Cho chuỗi byte nhị phân sau đây trích xuất từ 14 bytes đầu tiên của một khung dữ liệu bắt được trên cổng mạng:\n\n`52 54 00 12 34 56 e8 9c 25 aa bb cc 08 00`\n\nHãy giải mã:\n1. Địa chỉ MAC đích (Destination MAC) là gì?\n2. Địa chỉ MAC nguồn (Source MAC) là gì?\n3. Khung này mang theo gói tin của giao thức tầng mạng nào bên trong?",
          hint: "Ethernet Header tuân theo định dạng: 6 bytes đầu là Destination MAC, 6 bytes tiếp theo là Source MAC, 2 bytes cuối là trường EtherType.",
          solutionCode: "# Phân tách theo offset byte:\n# [0..5]   (6 bytes): 52 54 00 12 34 56 -> Destination MAC: 52:54:00:12:34:56\n# [6..11]  (6 bytes): e8 9c 25 aa bb cc -> Source MAC:      e8:9c:25:aa:bb:cc\n# [12..13] (2 bytes): 08 00             -> EtherType:       0x0800 (IPv4)\n\necho \"MAC Đích:  52:54:00:12:34:56\"\necho \"MAC Nguồn: e8:9c:25:aa:bb:cc\"\necho \"Giao thức: IPv4 (EtherType 0x0800)\"",
          solutionOutput: "MAC Đích:  52:54:00:12:34:56\nMAC Nguồn: e8:9c:25:aa:bb:cc\nGiao thức: IPv4 (EtherType 0x0800)",
          explanation: "Mọi khung Ethernet tuân thủ chặt chẽ định dạng IEEE 802.3 / DIX Ethernet II: 6 bytes MAC đích đứng đầu tiên để phần cứng switch hoặc NIC có thể quyết định chuyển tiếp hoặc nhận ngay mà không cần đợi đọc hết cả khung. Hai byte EtherType 0x0800 thông báo dứt khoát cho Kernel biết phải gọi driver IPv4 để bóc tách payload tiếp theo."
        }
      ],
      reflectionQuestion: "Nếu một kỹ sư phần mềm đề xuất: 'Tại sao phải tốn 54 bytes cho 3 lớp Header riêng biệt (Ethernet, IP, TCP)? Hãy gộp tất cả thành 1 header duy nhất 10 bytes để tiết kiệm băng thông toàn cầu!', bạn sẽ dùng những luận điểm kỹ thuật nào về tính độc lập giữa các tầng (Layer Independence) và nguyên lý 'Tách biệt mối quan tâm' (Separation of Concerns) để phản biện?",
      reflectionHint: "Hãy phân tích tính độc lập giữa các tầng: Nếu gộp làm một, card mạng Wi-Fi/Ethernet sẽ phải đọc hiểu được cả logic TCP và HTTP; router trên Internet sẽ phải can thiệp vào địa chỉ MAC của từng máy con; và mỗi khi có giao thức mới ra đời (như QUIC, HTTP/3 hay IPv6), toàn bộ phần cứng switch, router và card mạng trên toàn cầu sẽ bị biến thành 'rác công nghệ' vì không thể tương thích ngược! Sự đánh đổi 54 bytes header là cái giá cực rẻ để đổi lấy khả năng mở rộng không giới hạn và sự tiến hóa độc lập của nền văn minh Internet suốt hơn 40 năm qua.",
      summary: [
        "Nghịch lý kết nối điểm-điểm N(N-1)/2 khiến việc nối dây trực tiếp là bất khả thi; chuyển mạch gói (Packet Switching) ra đời để hàng triệu máy tính cùng chia sẻ chung đường truyền vật lý.",
        "Dồn kênh theo thời gian thống kê (Statistical Multiplexing) đòi hỏi mỗi khối dữ liệu phải có Header và Trailer để định danh người gửi, người nhận và kiểm soát tính toàn vẹn.",
        "Nguyên lý phân tầng (Layering) áp dụng triết lý Tách biệt mối quan tâm: Tầng ứng dụng chỉ lo dữ liệu nghiệp vụ, Tầng giao vận lo cổng và độ tin cậy, Tầng mạng lo định tuyến toàn cầu, Tầng liên kết lo chuyển giao chặng kế tiếp.",
        "Quá trình Encapsulation bọc thêm Header từ trên xuống dưới (Data -> Segment -> Packet -> Frame -> Bits); quá trình Decapsulation kiểm tra và bóc bỏ Header từ dưới lên trên.",
        "Sự cố MTU Mismatch kết hợp Black Hole Router (chặn ICMP) là nguyên nhân kinh điển khiến kết nối bị treo cứng bí ẩn khi tải dữ liệu lớn, khắc phục bằng MSS Clamping và mở ICMP Fragmentation Needed."
      ],
      nextLessonPreview: "Bài 1.2: Mô hình OSI vs TCP/IP dưới lăng kính Kernel Linux (sk_buff) — Bác bỏ hiểu lầm học vẹt về 7 tầng OSI; khám phá cấu trúc dữ liệu struct sk_buff trong bộ nhớ nhân Linux và cách con trỏ dịch chuyển qua các header."
    },
    {
      id: "net-1-02",
      number: "1.2",
      title: "Mô hình OSI vs TCP/IP dưới lăng kính Kernel Linux (sk_buff)",
      subtitle: "Bác bỏ hiểu lầm học vẹt về 7 tầng OSI; khám phá cấu trúc dữ liệu struct sk_buff trong bộ nhớ nhân Linux",
      level: "Nền tảng",
      duration: "120 phút",
      objectives: [
        "Phân biệt rạch ròi giữa Mô hình tham chiếu lý thuyết 7 tầng OSI và Kiến trúc thực thi thực tế 4/5 tầng TCP/IP trong hệ điều hành Linux.",
        "Giải mã sự 'biến mất' của Tầng Phiên (Session) và Tầng Trình bày (Presentation), hiểu cách User Space (TLS, Cookies, JSON) giải quyết chúng mà không cần Kernel.",
        "Nắm vững cấu trúc dữ liệu xương sống struct sk_buff (Socket Buffer) trong Linux Kernel (include/linux/skbuff.h) cùng 4 con trỏ then chốt: head, data, tail, end.",
        "Giải thích cơ chế 'Zero-Copy Header Manipulation' của Kernel: Cách các hàm skb_reserve(), skb_push(), skb_pull(), skb_put() thao tác trên con trỏ mà không sao chép dữ liệu.",
        "Khám phá hành trình gói tin trong bộ nhớ nhân (Rx Path & Tx Path), cơ chế NAPI, ngắt mềm NET_RX_SOFTIRQ và chẩn đoán nghẽn hàng đợi mạng qua /proc/net/softnet_stat."
      ],
      intuition: {
        title: "Bản Đồ Quy Hoạch Trên Giấy vs Toa Hàng Mở Rộng Thông Minh",
        metaphor: "Hãy tưởng tượng bạn cầm một bản đồ quy hoạch đô thị vẽ tay từ thập niên 1980 với 7 trạm trung chuyển phức tạp (OSI 7 layers). Nhưng khi bạn bước ra đường cao tốc thực tế, bạn chỉ thấy có 4 tầng phân cấp rõ ràng được xây dựng bằng bê tông cốt thép (TCP/IP): Tòa nhà văn phòng ứng dụng (User Space: Nginx, Chrome), Hệ thống đóng thùng container (Kernel TCP/UDP L4), Mạng lưới đường cao tốc liên tỉnh (Kernel IP L3), và Đường ray xe lửa vật lý nối các ga liền kề (Device Driver & Hardware NIC L2/L1). Trong lòng mỗi chuyến tàu hàng đó, Linux Kernel không xếp hàng rồi bốc dỡ hàng sang một toa tàu mới mỗi khi qua một trạm kiểm soát! Thay vào đó, Kernel dùng một chiếc toa xe thông minh có thể mở rộng hai đầu (struct sk_buff): Khi cần đóng gói, nhân viên chỉ việc cắm thêm một tấm biển kiểm soát mới vào đầu toa tàu (skb_push), và khi dỡ hàng, nhân viên chỉ việc rút tấm biển đó ra (skb_pull). Toàn bộ hàng hóa bên trong giữ nguyên vị trí từ đầu đến cuối hành trình mà không tốn một chút sức lực nào để bốc dỡ!",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">🧠</span>
              <span class="net-arch-title">ĐỐI CHIẾU MÔ HÌNH: 7 TẦNG OSI (LÝ THUYẾT) VS TCP/IP &amp; LINUX KERNEL (THỰC TẾ)</span>
            </div>
            <div class="net-arch-layers">
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">👤 Không Gian Người Dùng (User Space — Ring 3)</span>
                  <span class="net-arch-layer-badge">OSI L7 + L6 + L5 gom thành 1</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Tầng 7 (Application):</strong> HTTP/2, DNS, SSH, gRPC (Nginx, cURL, Python)</div>
                  <div class="net-arch-node"><strong>Tầng 6 (Presentation) &amp; Tầng 5 (Session):</strong> Không có trong Kernel! Được xử lý trực tiếp bởi các thư viện User Space: OpenSSL/BoringSSL (Mã hóa TLS), gzip/brotli (Nén dữ liệu), JSON/Protobuf (Định dạng), HTTP Cookies/JWT (Phiên làm việc).</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Ranh giới Lời gọi hệ thống (System Call Boundary: socket, send, recv, write, read)</div>

              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🧠 Tầng Giao vận (Transport Layer — OSI L4 / TCP/IP L4)</span>
                  <span class="net-arch-layer-badge">Kernel Core: struct sock &amp; struct socket</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Xử lý Giao thức:</strong> TCP State Machine, UDP, SCTP, DCCP. Quản lý cổng Port, cửa sổ trượt (Flow Control) và kiểm soát tắc nghẽn (CUBIC, BBR).</div>
                  <div class="net-arch-node"><strong>Cấu trúc dữ liệu:</strong> <code>struct sk_buff</code> dịch chuyển con trỏ <code>transport_header</code>. Hàng đợi <code>sk_receive_queue</code> / <code>sk_write_queue</code>.</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Lời gọi hàm nội bộ Kernel (ip_rcv / ip_output)</div>

              <div class="net-arch-layer layer-vfs">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🌐 Tầng Mạng (Network / Internet Layer — OSI L3 / TCP/IP L3)</span>
                  <span class="net-arch-layer-badge">Kernel IP Stack &amp; Netfilter</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Xử lý Định tuyến:</strong> IPv4, IPv6, ICMP, ARP. Bảng định tuyến FIB (Forwarding Information Base), Netfilter Hooks (iptables/nftables), IPsec XFRM.</div>
                  <div class="net-arch-node"><strong>Cấu trúc dữ liệu:</strong> <code>struct sk_buff</code> dịch chuyển con trỏ <code>network_header</code>.</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Tầng Giao diện Mạng (Device Independent Layer: dev_queue_xmit / netif_receive_skb)</div>

              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🔗 Tầng Liên kết &amp; Trình điều khiển (Link Layer — OSI L2 / TCP/IP L2)</span>
                  <span class="net-arch-layer-badge">Kernel Driver &amp; Qdisc</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Phần mềm Kernel:</strong> Hàng đợi Qdisc (fq_codel, pfifo_fast), Linux Bridge, VLAN (802.1Q), Bonding/Teaming. Device Driver (e1000e, ixgbe, virtio_net).</div>
                  <div class="net-arch-node"><strong>Phần cứng NIC:</strong> Chip điều khiển MAC, bộ đệm DMA Rx/Tx Ring Buffer. <code>struct sk_buff</code> gán con trỏ <code>mac_header</code>.</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Trực tiếp xuống Vi mạch PHY &amp; Môi trường truyền dẫn</div>

              <div class="net-arch-layer layer-kernel">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">⚡ Tầng Vật lý (Physical Layer — OSI L1 / TCP/IP L1)</span>
                  <span class="net-arch-layer-badge">Pure Hardware</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Thành phần:</strong> Bộ thu phát quang (Transceiver SFP+/QSFP), biến áp xung cách ly, cáp đồng RJ45, cáp quang Single/Multi-mode.</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-problem",
          title: "Vấn đề thực tế: Cuộc chiến OSI vs TCP/IP & Sự Biến Mất Của Hai Tầng Bí Ẩn",
          content: `
            <p>Hầu như mọi cuốn sách giáo khoa đại học và chứng chỉ nhập môn mạng đều yêu cầu học viên thuộc làu làu <strong>7 tầng của mô hình OSI</strong> (Open Systems Interconnection): <em>Application, Presentation, Session, Transport, Network, Data Link, Physical</em>.</p>
            <p>Thế nhưng, khi bạn bước chân vào thế giới kỹ thuật thực tế, mở mã nguồn của <strong>Linux Kernel</strong>, cấu hình máy chủ Nginx, viết mã Python Socket hoặc dùng lệnh <code>tcpdump</code>, bạn sẽ gặp một cú sốc lớn: <strong>Tuyệt đối không có bất kỳ dòng code, tiến trình hay cấu trúc dữ liệu nào mang tên 'Tầng Phiên (Session)' hay 'Tầng Trình Bày (Presentation)' trong toàn bộ hệ điều hành!</strong></p>

            <div class="net-topo-box">
              <div class="net-topo-title">📜 LỊCH SỬ KHOA HỌC: VÌ SAO MÔ HÌNH 7 TẦNG OSI THẤT BẠI TRONG THỰC TẾ?</div>
              <p>Mô hình OSI được Tổ chức Tiêu chuẩn hóa Quốc tế (ISO) thiết kế vào cuối thập niên 1970 bởi các ủy ban viễn thông lớn. Họ mắc phải một căn bệnh kinh điển trong khoa học phần mềm: <strong>Thiết kế quá mức (Over-engineering) và tiêu chuẩn hóa trên lý thuyết trước khi có mã nguồn thực thi thực tế</strong>.</p>
              <p>Ngược lại, mô hình <strong>TCP/IP</strong> ra đời từ dự án ARPANET của Bộ Quốc phòng Mỹ. Nó được thử nghiệm trực tiếp trên mạng máy tính thực tế và tích hợp mã nguồn mở thẳng vào bản phân phối <strong>4.2BSD Unix</strong>. Triết lý của IETF (cộng đồng xây dựng chuẩn Internet) được nhà khoa học David Clark tóm gọn trong một câu danh ngôn bất hủ:</p>
              <blockquote style="margin:10px 0;padding:8px 16px;border-left:4px solid var(--topic-network);font-style:italic;color:var(--text-secondary);background:var(--bg-surface);">
                "We reject: kings, presidents, and voting. We believe in: rough consensus and running code."<br>
                (Chúng tôi bác bỏ: vua chúa, tổng thống và những lá phiếu biểu quyết. Chúng tôi tin vào: sự đồng thuận chung và những dòng code đang thực sự chạy!)
              </blockquote>
            </div>

            <h3 style="margin-top:20px;">Sự biến mất của Tầng 5 (Session) và Tầng 6 (Presentation)</h3>
            <p>Tại sao Internet và Linux Kernel loại bỏ hai tầng này ra khỏi kiến trúc mạng cốt lõi?</p>
            <ul>
              <li><strong>Tầng 6: Presentation (Trình bày):</strong> Nhiệm vụ lý thuyết là mã hóa, nén và chuyển đổi bảng mã ký tự (ASCII sang EBCDIC). Trong thế giới thực tế, việc này không thuộc về hệ điều hành mà thuộc về <strong>thư viện không gian người dùng (User Space Libraries)</strong>:
                <ul style="margin-top:4px;">
                  <li>Mã hóa bảo mật được giải quyết bởi thư viện <strong>OpenSSL / BoringSSL / Rustls</strong> (tầng TLS/HTTPS).</li>
                  <li>Nén dữ liệu được giải quyết bởi các thuật toán <strong>zlib (gzip), Brotli, Zstandard</strong>.</li>
                  <li>Định dạng dữ liệu được giải quyết bởi các chuẩn <strong>JSON, Protocol Buffers, FlatBuffers, UTF-8</strong>.</li>
                </ul>
              </li>
              <li><strong>Tầng 5: Session (Phiên làm việc):</strong> Nhiệm vụ lý thuyết là thiết lập, duy trì và khôi phục phiên giao tiếp. Trong thực tế:
                <ul style="margin-top:4px;">
                  <li>Tầng Transport (TCP) đã làm quá tốt nhiệm vụ duy trì kênh kết nối điểm-điểm bằng bắt tay 3 bước và số thứ tự Sequence Number.</li>
                  <li>Các phiên làm việc nghiệp vụ phức tạp được ứng dụng tự quản lý: <strong>HTTP Cookies, JWT Tokens, TLS Session Resumption, gRPC Streams</strong>. Kernel hoàn toàn không cần can thiệp!</li>
                </ul>
              </li>
            </ul>

            <div class="net-incident-card">
              <div class="net-incident-header">
                <span>⚡ RANH GIỚI KIẾN TRÚC THẬT SỰ: USER SPACE VS KERNEL SPACE</span>
              </div>
              <div class="net-incident-body">
                Trong hệ điều hành Linux, ranh giới mạng quan trọng nhất không phải là giữa tầng 3 và tầng 4, mà là <strong>Ranh giới giữa User Space (Ring 3) và Kernel Space (Ring 0)</strong>:
                <ul style="margin-top:6px;">
                  <li><strong>User Space (Tầng Ứng dụng L7):</strong> Nơi tiến trình của bạn chạy (Python, Node.js, Go, Nginx, Chrome). Hoàn toàn độc lập với phần cứng mạng, chỉ giao tiếp với mạng qua các hàm Socket System Call (<code>read</code>, <code>write</code>, <code>sendto</code>, <code>recvfrom</code>).</li>
                  <li><strong>Kernel Space (Tầng Mạng &amp; Giao vận L4-L3-L2):</strong> Nơi nắm giữ toàn bộ trạng thái mạng toàn cục của máy chủ, chia sẻ một card mạng duy nhất cho hàng ngàn tiến trình, đảm bảo tính an toàn (Firewall) và điều khiển phần cứng.</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: "sec-mechanism",
          title: "Cơ chế kỹ thuật: Giải phẫu struct sk_buff — Xương Sống Bộ Nhớ Của Linux Network Stack",
          content: `
            <p>Nếu bạn hỏi một kỹ sư Kernel Linux: <em>"Cấu trúc dữ liệu nào quyền lực và quan trọng nhất trong toàn bộ mạng Linux?"</em>, câu trả lời 100% sẽ là: <code>struct sk_buff</code> (viết tắt là <strong>skb</strong>, định nghĩa trong tệp mã nguồn nhân <code>include/linux/skbuff.h</code>).</p>
            <p>Mọi gói tin đi vào hay đi ra hệ điều hành Linux — từ một gói tin ping ICMP 64 bytes cho tới luồng video 4K 100Gbps — đều được gói gọn và vận chuyển trong một cấu trúc <code>sk_buff</code>.</p>

            <h3 style="margin-top:18px;">Cơn ác mộng sao chép bộ nhớ (The Memory Copy Nightmare)</h3>
            <p>Để hiểu tại sao <code>sk_buff</code> lại được thiết kế như vậy, hãy xem điều gì xảy ra nếu các kỹ sư Linux lập trình theo cách ngây thơ:</p>
            <ul>
              <li>Khi gói tin đi từ tầng L2 lên L3: Cấp phát vùng nhớ mới, copy phần payload sang, bỏ qua Ethernet Header.</li>
              <li>Khi gói tin đi từ L3 lên L4: Lại cấp phát vùng nhớ mới, lại copy payload sang, bỏ qua IP Header.</li>
              <li>Khi gói tin đi từ L4 lên L7: Lại cấp phát vùng nhớ mới, lại copy payload sang...</li>
            </ul>
            <p>Nếu làm như vậy, một máy chủ 10Gbps truyền tải hàng triệu gói tin mỗi giây sẽ chết nghẹn vì thao tác cấp phát RAM (<code>kmalloc/kfree</code>) và sao chép bộ nhớ (<code>memcpy</code>). Bộ nhớ đệm CPU L1/L2 Cache sẽ bị bão hòa (Cache Thrashing), khiến hiệu năng hệ thống sụp đổ hoàn toàn!</p>

            <h3 style="margin-top:18px;">Thiết kế thiên tài của struct sk_buff: 4 Con Trỏ Sinh Tử</h3>
            <p>Linux Kernel giải quyết triệt để bài toán trên bằng cơ chế: <strong>Chỉ cấp phát MỘT vùng nhớ đệm liên tục duy nhất (Continuous Buffer) và dùng 4 con trỏ dịch chuyển trên vùng nhớ đó</strong>:</p>

            <div class="net-header-diagram">
              <div class="net-header-title"><span>🧩</span> BẢN ĐỒ VÙNG ĐỆM BỘ NHỚ CỦA STRUCT SK_BUFF TRONG KERNEL RAM</div>
              <pre class="code-pre" style="margin:8px 0;background:#090d16;color:#a5d6ff;font-family:var(--font-mono);font-size:0.84rem;line-height:1.5;">
+---------------------------------------------------------------------------------------+
|                               VÙNG ĐỆM BỘ NHỚ LIÊN TỤC (BUFFER)                       |
+-------------------+-----------------------------------------------+-------------------+
|     HEADROOM      |                DỮ LIỆU GÓI TIN (DATA)         |     TAILROOM      |
| (Chừa sẵn chỗ cho |               (Headers + Payload)             | (Chừa sẵn chỗ cho |
| các L2/L3 Headers)|                                               |  padding/trailer) |
+-------------------+-----------------------------------------------+-------------------+
^                   ^                                               ^                   ^
|                   |                                               |                   |
skb->head           skb->data                                       skb->tail           skb->end
(Đầu vùng nhớ RAM)  (Bắt đầu dữ liệu hiện hành)                     (Hết dữ liệu)       (Cuối vùng nhớ RAM)
              </pre>
            </div>

            <p>Bốn con trỏ này quản lý hai vùng đệm linh hoạt:</p>
            <ol style="line-height:1.75;padding-left:20px;">
              <li><code>head</code>: Con trỏ cố định trỏ vào byte đầu tiên của vùng nhớ được cấp phát.</li>
              <li><code>data</code>: Con trỏ động trỏ vào byte đầu tiên của dữ liệu hoặc Header của tầng hiện tại đang xử lý.</li>
              <li><code>tail</code>: Con trỏ động trỏ vào byte kết thúc của dữ liệu hiện tại.</li>
              <li><code>end</code>: Con trỏ cố định trỏ vào byte cuối cùng của vùng nhớ được cấp phát.</li>
              <li><strong>Headroom</strong> (khoảng cách từ <code>head</code> đến <code>data</code>): Khoảng trống dự phòng phía trước để có thể chèn thêm Header tầng dưới mà KHÔNG cần dịch chuyển hay copy dữ liệu!</li>
              <li><strong>Tailroom</strong> (khoảng cách từ <code>tail</code> đến <code>end</code>): Khoảng trống dự phòng phía sau để có thể gắn thêm Trailer, Padding hoặc mở rộng dữ liệu.</li>
            </ol>

            <h3 style="margin-top:20px;">4 Phép màu biến hóa con trỏ: Zero-Copy Pointer Manipulation</h3>
            <p>Thay vì copy dữ liệu, Kernel chỉ dùng 4 hàm nội bộ cực nhanh (chỉ mất vài nano-giây) để điều khiển gói tin:</p>

            <div class="net-matrix-table-wrap">
              <table class="net-matrix-table">
                <thead>
                  <tr>
                    <th>Hàm Kernel C</th>
                    <th>Hành động trên con trỏ</th>
                    <th>Ý nghĩa bản chất mạng</th>
                    <th>Khi nào được dùng?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>skb_reserve(skb, len)</code></td>
                    <td>Dời cả <code>data</code> và <code>tail</code> lùi về sau <code>len</code> bytes.</td>
                    <td>Tạo sẵn khoảng trống <strong>Headroom</strong> ở đầu buffer để sau này các tầng L4, L3, L2 ghi Header mà không bị tràn ngược.</td>
                    <td>Ngay khi vừa cấp phát <code>sk_buff</code> mới ở chiều gửi (Tx).</td>
                  </tr>
                  <tr>
                    <td><code>skb_push(skb, len)</code></td>
                    <td>Dời con trỏ <code>data</code> tiến về phía <code>head</code> <code>len</code> bytes. Trả về con trỏ vùng nhớ mới dôi ra.</td>
                    <td><strong>Đóng gói (Encapsulation):</strong> Mở rộng vùng dữ liệu về phía trước để tầng hiện tại ghi thêm Header (ví dụ ghi TCP Header hoặc IP Header). Không copy 1 byte dữ liệu nào!</td>
                    <td>Khi chuyển gói tin xuống tầng dưới ở chiều gửi (Tx).</td>
                  </tr>
                  <tr>
                    <td><code>skb_pull(skb, len)</code></td>
                    <td>Dời con trỏ <code>data</code> lùi về phía <code>tail</code> <code>len</code> bytes.</td>
                    <td><strong>Bóc tách (Decapsulation):</strong> Bỏ qua Header của tầng hiện tại, đưa con trỏ <code>data</code> vào vị trí bắt đầu Header của tầng tiếp theo.</td>
                    <td>Khi chuyển gói tin lên tầng trên ở chiều nhận (Rx).</td>
                  </tr>
                  <tr>
                    <td><code>skb_put(skb, len)</code></td>
                    <td>Dời con trỏ <code>tail</code> tiến về phía <code>end</code> <code>len</code> bytes.</td>
                    <td>Tăng kích thước dữ liệu về phía sau khi nạp thêm Payload hoặc khi DMA phần cứng đổ gói tin vào RAM.</td>
                    <td>Khi driver card mạng đọc gói tin từ NIC hoặc khi copy payload từ user space.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style="margin-top:14px;">Ngoài ra, <code>sk_buff</code> còn sở hữu các con trỏ chuyên biệt để Kernel có thể nhảy cóc đến bất kỳ header nào trong nháy mắt:</p>
            <ul>
              <li><code>skb->transport_header</code>: Trỏ tới cấu trúc TCP/UDP Header (<code>struct tcphdr</code> / <code>struct udphdr</code>).</li>
              <li><code>skb->network_header</code>: Trỏ tới cấu trúc IP Header (<code>struct iphdr</code> / <code>struct ipv6hdr</code>).</li>
              <li><code>skb->mac_header</code>: Trỏ tới cấu trúc Ethernet Header (<code>struct ethhdr</code>).</li>
              <li><code>skb->dev</code>: Con trỏ trỏ tới cấu trúc card mạng đại diện (<code>struct net_device</code>).</li>
            </ul>
          `
        },
        {
          id: "sec-lifecycle",
          title: "Hành trình Gói Tin trong Bộ Nhớ Kernel: Rx Path, NAPI & NET_RX_SOFTIRQ",
          content: `
            <p>Để hiểu cách hệ điều hành vận hành ở tốc độ hàng triệu gói tin mỗi giây, chúng ta hãy theo dõi hành trình của một gói tin từ khi còn là tín hiệu điện tử chạm vào card mạng cho tới khi trở thành chuỗi ký tự trong tiến trình của bạn:</p>

            <div class="net-topo-box">
              <div class="net-topo-title">⚙️ HÀNH TRÌNH CHIỀU NHẬN (RX - RECEIVE PATH) QUA 5 TRẠM TRUNG CHUYỂN</div>
              <ol style="margin:0;padding-left:20px;line-height:1.75;">
                <li><strong>Trạm 1: DMA vào RAM &amp; Ngắt phần cứng (Hardware IRQ):</strong>
                  Gói tin chạm vào chip PHY của card mạng. Bộ điều khiển MAC kiểm tra mã CRC toàn vẹn. Card mạng dùng cơ chế <strong>Direct Memory Access (DMA)</strong> để bắn thẳng dữ liệu gói tin vào bộ nhớ RAM của máy chủ (nằm trong một hàng đợi tròn gọi là <code>Rx Ring Buffer</code>) mà không cần tiêu tốn CPU. Khi chuyển xong, card mạng gửi một tín hiệu ngắt phần cứng (Hardware Interrupt - IRQ) lên CPU.
                </li>
                <li><strong>Trạm 2: Cơ chế NAPI (New API) dập tắt bão ngắt:</strong>
                  Nếu với mỗi gói tin đến card mạng đều kích hoạt 1 ngắt phần cứng, máy chủ sẽ chết đứng vì <em>Bão ngắt (Interrupt Storm / Livelock)</em>. Để giải quyết, Linux áp dụng cơ chế <strong>NAPI</strong>: Trình điều khiển (driver) tiếp nhận ngắt phần cứng đầu tiên, lập tức <strong>TẮT ngắt phần cứng</strong> của card mạng, và lên lịch kích hoạt một <strong>Ngắt mềm (SoftIRQ: <code>NET_RX_SOFTIRQ</code>)</strong> để chuyển sang chế độ <em>Thăm dò (Polling)</em> hàng loạt.
                </li>
                <li><strong>Trạm 3: Xử lý Ngắt mềm (SoftIRQ) &amp; Khởi tạo sk_buff:</strong>
                  Tiến trình nhân <code>ksoftirqd/x</code> (hoặc SoftIRQ context) thức dậy, gọi hàm <code>napi_poll()</code> của driver. Driver bốc các khối dữ liệu trong Rx Ring Buffer ra, gọi <code>netdev_alloc_skb()</code> (hoặc <code>build_skb()</code>) để bọc vào cấu trúc <code>struct sk_buff</code>. Sau đó gọi <code>netif_receive_skb()</code> để đẩy lên Network Stack độc lập phần cứng.
                </li>
                <li><strong>Trạm 4: Thẩm vấn qua Tầng Mạng (L3) &amp; Netfilter:</strong>
                  Hàm <code>ip_rcv()</code> nhận <code>sk_buff</code>, dùng <code>skb_pull()</code> để bóc Ethernet Header, kiểm tra tính toàn vẹn của IP Header. Gói tin đi qua các móc chặn (Hooks) của <strong>Netfilter (PREROUTING)</strong> để kiểm tra luật tường lửa (iptables/nftables) hoặc thực hiện NAT. Sau đó tra cứu bảng định tuyến: Nếu đích là máy cục bộ, đi tiếp qua hook <strong>LOCAL_IN</strong> và gọi hàm giao vận L4 tương ứng (<code>tcp_v4_rcv</code>).
                </li>
                <li><strong>Trạm 5: Đưa vào Hàng đợi Socket (L4) &amp; Đánh thức User Space:</strong>
                  Hàm <code>tcp_v4_rcv()</code> tìm kiếm trong bảng băm kết nối (TCP Socket Hash Table) để lấy cấu trúc <code>struct sock</code>. Nó kiểm tra số thứ tự Sequence Number, thực hiện bắt tay hoặc kiểm soát cửa sổ luồng, bóc TCP Header bằng <code>skb_pull()</code>, và móc <code>sk_buff</code> vào đuôi hàng đợi <strong><code>sk_receive_queue</code></strong> của Socket. Lúc này, tiến trình người dùng đang chờ trong lệnh <code>epoll_wait()</code> hoặc <code>recv()</code> được đánh thức. Lệnh <code>recv()</code> copy dữ liệu từ <code>sk_buff</code> sang buffer của User Space, và Kernel gọi <code>kfree_skb()</code> để trả vùng nhớ về lại cho hệ thống!
                </li>
              </ol>
            </div>

            <p style="margin-top:16px;"><strong>Còn ở Chiều gửi (Tx - Transmit Path)?</strong></p>
            <p>Hành trình diễn ra theo thứ tự ngược lại một cách hoàn hảo: Ứng dụng gọi <code>write()</code> $\rightarrow$ Kernel cấp phát <code>sk_buff</code> rỗng với <code>skb_reserve()</code> chừa sẵn headroom $\rightarrow$ Copy payload từ User Space vào $\rightarrow$ TCP gọi <code>skb_push(20)</code> chèn TCP Header $\rightarrow$ IP gọi <code>skb_push(20)</code> chèn IP Header $\rightarrow$ Driver gọi <code>skb_push(14)</code> chèn Ethernet Header $\rightarrow$ Đẩy vào hàng đợi điều phối lưu lượng (Qdisc) $\rightarrow$ Đưa vào Tx Ring Buffer của card mạng $\rightarrow$ NIC dùng DMA bắn ra đường dây cáp quang $\rightarrow$ Gửi xong, NIC phát ngắt để giải phóng <code>sk_buff</code>.</p>
          `
        },
        {
          id: "sec-observe",
          title: "Quan sát trên Linux: Khám phá SoftIRQ, Ring Buffer & Trạng thái sk_buff",
          content: `
            <p>Hãy cùng mở terminal Linux và sử dụng các công cụ chẩn đoán sâu của Kernel để nhìn xuyên thấu vào nơi các <code>sk_buff</code> và tiến trình SoftIRQ đang hoạt động:</p>
          `,
          codeExamples: [
            {
              title: "Bước 1: Giám sát hoạt động ngắt mềm mạng NET_RX qua /proc/softirqs",
              lang: "Bash",
              code: "# Xem số lượng ngắt mềm NET_RX được phân bổ trên từng lõi CPU\nwatch -n 1 \"cat /proc/softirqs | grep NET_RX\"",
              output: "                CPU0       CPU1       CPU2       CPU3\n      NET_RX: 14852014   15021480   14991204   14890112",
              annotations: [
                { line: 2, text: "Lệnh watch lặp lại sau mỗi 1 giây để theo dõi sự biến thiên của ngắt mạng NET_RX theo thời gian thực." },
                { line: 4, text: "Nếu số lượng NET_RX tăng đều trên mọi CPU (CPU0..CPU3), hệ thống đang phân bổ tải mạng rất tốt nhờ RSS." },
                { line: 4, text: "Nếu chỉ có CPU0 tăng phi mã còn các CPU khác đứng yên, bạn đang gặp sự cố nghẽn cổ chai ngắt mạng (IRQ Bottleneck)!" }
              ]
            },
            {
              title: "Bước 2: Giải phẫu bảng chỉ số Kernel /proc/net/softnet_stat",
              lang: "Bash",
              code: "# Đọc số liệu xử lý gói tin của subsystem mạng trên từng CPU core\ncat /proc/net/softnet_stat",
              output: "00e2a410 00000000 00000014 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000\n00e19208 00000000 00000008 00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000",
              annotations: [
                { line: 3, text: "Cột 1 (00e2a410): Tổng số gói tin (dạng hex) mà CPU core này đã xử lý qua hàm netif_receive_skb (0x00e2a410 = 14.853.136 gói)." },
                { line: 3, text: "Cột 2 (00000000): Số gói tin bị DROP do hàng đợi netdev_max_backlog bị đầy tràn! Cột này BẮT BUỘC phải bằng 0." },
                { line: 3, text: "Cột 3 (00000014): Chỉ số time_squeeze (hết lượt CPU slice): Số lần hàm napi_poll bị ngắt do hết hạn ngạch thời gian xử lý mà vẫn còn gói trong hàng đợi." }
              ]
            },
            {
              title: "Bước 3: Kiểm tra kích thước phần cứng Rx/Tx Ring Buffer bằng ethtool",
              lang: "Bash",
              code: "# Kiểm tra xem card mạng eth0 đang được cấu hình kích thước Ring Buffer là bao nhiêu\nsudo ethtool -g eth0",
              output: "Ring parameters for eth0:\nPre-set maximums:\nRX:             4096\nTX:             4096\nCurrent hardware settings:\nRX:             1024\nTX:             1024",
              annotations: [
                { line: 4, text: "Pre-set maximums: Ngưỡng tối đa phần cứng hỗ trợ (4096 ô nhớ chứa con trỏ DMA cho Rx và Tx)." },
                { line: 8, text: "Current hardware settings: Cấu hình hiện tại mới chỉ là 1024. Ta hoàn toàn có thể nâng lên 4096 để chống drop gói khi có bùng nổ traffic!" }
              ]
            }
          ]
        },
        {
          id: "sec-lab",
          title: "Phòng Lab thực hành: Theo dõi Vòng Đời sk_buff và Chu Kỳ SoftIRQ",
          content: `
            <div class="net-topo-box">
              <div class="net-topo-title">🧪 PHÒNG LAB THỰC HÀNH 1.2: KÍCH HOẠT BÃO LƯU LƯỢNG &amp; SOI KERNEL SOFTIRQ</div>
              <p><strong>Mục tiêu:</strong> Tự tay quan sát khoảnh khắc dòng dữ liệu mạng kích hoạt chu kỳ ngắt mềm <code>NET_RX_SOFTIRQ</code>, đo lường sự dịch chuyển của các chỉ số trong <code>/proc/net/softnet_stat</code>, và kiểm tra cơ chế chống nghẽn hàng đợi trong Kernel Linux.</p>
              <p><strong>Môi trường &amp; Công cụ:</strong> Máy Linux (Ubuntu, Debian, WSL2 hoặc CentOS). Công cụ: <code>ping</code>, <code>awk</code>, <code>watch</code>, <code>ethtool</code>.</p>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Ghi lại ảnh chụp (Snapshot) chỉ số mạng hiện tại của hệ thống</h4>
              </div>
              <p class="net-step-desc">Mở Terminal 1 và viết một lệnh Bash nhỏ sử dụng <code>awk</code> để dịch mã hex trong <code>/proc/net/softnet_stat</code> sang số thập phân dễ đọc:</p>
              <pre class="code-pre"><code>awk '{printf "CPU %d: Đã xử lý = %10d | Drop = %5d | Time_squeeze = %5d\\n", NR-1, strtonum("0x"$1), strtonum("0x"$2), strtonum("0x"$3)}' /proc/net/softnet_stat</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Màn hình in ra danh sách từng lõi CPU (CPU 0, CPU 1...) kèm số gói tin đã xử lý dạng số nguyên thông thường. Cột <code>Drop</code> phải đang bằng 0.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 2</span>
                <h4 class="net-step-title">Khởi chạy trình giám sát thay đổi ngắt NET_RX theo thời gian thực</h4>
              </div>
              <p class="net-step-desc">Giữ Terminal 1 chạy lệnh sau để theo dõi sát sao từng giây tốc độ tăng của ngắt mạng:</p>
              <pre class="code-pre"><code>watch -d -n 1 "cat /proc/softirqs | grep NET_RX"</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Cờ <code>-d</code> (difference) của lệnh watch sẽ tự động bôi sáng các con số thay đổi giữa hai chu kỳ làm mới.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 3</span>
                <h4 class="net-step-title">Tạo bão lưu lượng mạng cục bộ cực lớn bằng Flood Ping</h4>
              </div>
              <p class="net-step-desc">Mở Terminal 2 và sử dụng tính năng 'Flood Ping' (<code>ping -f</code>) gửi liên tục hàng chục ngàn gói tin ICMP nhỏ qua giao diện loopback trong 5 giây:</p>
              <pre class="code-pre"><code># Gửi dồn dập 50.000 gói tin ping không độ trễ
sudo ping -f -c 50000 127.0.0.1</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Terminal 2 in ra chuỗi các dấu chấm hoặc kết quả <code>50000 packets transmitted, 50000 received, 0% packet loss</code> chỉ trong chưa đầy 1-2 giây!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 4</span>
                <h4 class="net-step-title">Khám nghiệm phản ứng của CPU và Kernel Network Stack</h4>
              </div>
              <p class="net-step-desc">Nhìn lại Terminal 1 để quan sát hiện tượng kỳ diệu xảy ra trong Kernel:</p>
              <pre class="code-pre"><code># Chỉ số NET_RX lập tức tăng vọt thêm đúng ~50.000 lần trên CPU đang phụ trách xử lý!
# Chạy lại script giải mã softnet_stat ở Bước 1:
awk '{printf "CPU %d: Đã xử lý = %10d | Drop = %5d | Time_squeeze = %5d\\n", NR-1, strtonum("0x"$1), strtonum("0x"$2), strtonum("0x"$3)}' /proc/net/softnet_stat</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Phát hiện bản chất:</strong> Cột <code>Đã xử lý</code> tăng vọt đúng bằng số lượng gói tin vừa bắn qua. Toàn bộ 50.000 gói tin đó đã được kernel cấp phát <code>sk_buff</code>, gắn qua <code>skb_push</code>, kiểm tra IP và phản hồi ICMP Reply bằng <code>skb_pull</code> hoàn toàn trong bộ nhớ RAM mà không cần động đến đĩa cứng!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 5</span>
                <h4 class="net-step-title">Kiểm tra thông số cấu hình Hàng đợi Backlog của Kernel</h4>
              </div>
              <p class="net-step-desc">Khám phá thông số quy định trần kích thước hàng đợi tiếp nhận gói tin khi SoftIRQ chưa kịp xử lý:</p>
              <pre class="code-pre"><code>sysctl net.core.netdev_max_backlog</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Ghi nhớ kiến trúc:</strong> Giá trị mặc định thường là <code>1000</code>. Nếu tốc độ gói tin ập vào vượt quá khả năng xử lý của CPU và làm đầy 1000 ô chứa này, cột số 2 (Drop) trong <code>softnet_stat</code> sẽ lập tức nhảy số báo động!</span>
              </div>
            </div>
          `
        },
        {
          id: "sec-production",
          title: "Môi trường Production & Ca sự cố: Bệnh án 'SoftIRQ 100% CPU Spike & Packet Drop do Nghẽn Hàng Đợi NAPI'",
          content: `
            <div class="net-postmortem-card">
              <div class="net-postmortem-header">
                <span class="net-postmortem-badge">SRE POST-MORTEM</span>
                <span class="net-postmortem-title">Hồ Sơ Sự Cố: Cụm Nginx API Gateway Drop Hàng Triệu Gói Tin Dù Máy Chủ Còn Dư 15 Lõi CPU</span>
              </div>
              <div class="net-postmortem-body">
                <p><strong>🚨 Bối cảnh sự cố:</strong> Vào lúc 20:00 tối thứ Sáu, một nền tảng thanh toán trực tuyến chạy sự kiện ưu đãi người dùng. Cụm máy chủ Nginx Reverse Proxy (máy chủ vật lý cấu hình 16 CPU Cores, 64 GB RAM, Card mạng 10Gbps) tiếp nhận lưu lượng tăng vọt lên 90.000 requests/giây. Đột ngột:</p>
                <ul>
                  <li>Thời gian phản hồi (API Latency) tăng vọt từ <strong>3ms lên tới 1.200ms</strong>!</li>
                  <li>Tỷ lệ rớt kết nối khách hàng lên tới 12%, hàng ngàn giao dịch thanh toán bị gián đoạn.</li>
                  <li>Đội ngũ trực ban mở lệnh <code>top</code> kiểm tra thì thấy một hiện tượng vô cùng nghịch lý: <strong>Tổng mức tiêu thụ CPU toàn máy chủ chỉ có 12%, RAM còn trống 48 GB!</strong></li>
                </ul>

                <p style="margin-top:12px;"><strong>💥 Triệu chứng trích xuất từ lệnh mpstat và softnet_stat:</strong></p>
                <div class="net-log-terminal">$ mpstat -P ALL 1
08:00:15 PM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %idle
08:00:16 PM  all    2.50    0.00    1.80    0.05    0.20    6.40  89.05
08:00:16 PM    0    1.00    0.00    4.00    0.00    1.50   93.50   0.00  <-- CPU 0 ĐANG CHẾT CHÌM TRONG SOFTIRQ!
08:00:16 PM    1    2.00    0.00    1.00    0.00    0.00    0.10  96.90
...
08:00:16 PM   15    2.10    0.00    1.20    0.00    0.00    0.00  96.70

$ awk '{print NR-1, $1, $2, $3}' /proc/net/softnet_stat
0 08c12a40 001a4e12 00045f10  <-- Cột 2 (DROP): ĐÃ RỚT 1.723.922 GÓI TIN TRÊN CPU 0!
1 000214a0 00000000 00000000
...</div>

                <p><strong>🔍 Phân tích nguyên nhân gốc rễ (Root Cause Analysis - RCA):</strong></p>
                <ul>
                  <li>Mặc định trên hệ điều hành chưa được tối ưu, toàn bộ tín hiệu ngắt phần cứng (Hardware IRQ) của card mạng <code>eth0</code> được gắn cố định (pinned) vào <strong>duy nhất CPU Core 0</strong> qua cấu hình <code>/proc/irq/32/smp_affinity</code>.</li>
                  <li>Khi lưu lượng bùng nổ, luồng ngắt mềm <code>NET_RX_SOFTIRQ</code> chiếm dụng trọn vẹn 100% thời gian xử lý của CPU 0 (mức <code>%soft = 93.5%</code>).</li>
                  <li>CPU 0 bị quá tải (starvation), không thể chạy kịp hàm <code>napi_poll()</code> để vét các <code>sk_buff</code> ra khỏi hàng đợi. Chỉ số <code>time_squeeze</code> tăng vọt 286.480 lần!</li>
                  <li>Trong khi đó, hàng đợi tiếp nhận của Kernel (<code>net.core.netdev_max_backlog</code>) giữ nguyên giá trị mặc định quá nhỏ (chỉ 1000 gói). Hàng đợi đầy ắp chỉ trong 5 mili-giây, Kernel buộc phải <strong>DROP thẳng tay hơn 1.7 triệu gói tin sk_buff mới đến</strong>!</li>
                  <li>Thảm họa là 15 CPU Cores còn lại (CPU 1 đến 15) hoàn toàn rảnh rỗi (idle 97%) nhưng không hề được chia sẻ gánh nặng ngắt mạng!</li>
                </ul>

                <p style="margin-top:14px;"><strong>💊 Phác đồ điều trị triệt để của Kiến trúc sư Hạ tầng:</strong></p>
                <ol class="net-treatment-list">
                  <li>
                    <strong>Kích hoạt công nghệ Multi-Queue RSS (Receive Side Scaling) trên card mạng:</strong>
                    <p style="margin:4px 0;font-size:0.86rem;">Chia card mạng thành 16 hàng đợi phần cứng riêng biệt tương ứng với 16 CPU cores:</p>
                    <pre class="code-pre" style="margin:6px 0;"><code># Bật 16 kênh phần cứng (Combined Channels)
sudo ethtool -L eth0 combined 16</code></pre>
                  </li>
                  <li>
                    <strong>Phân tán đều ngắt phần cứng (IRQ Affinity) sang toàn bộ các CPU Cores:</strong>
                    <p style="margin:4px 0;font-size:0.86rem;">Khởi động và cấu hình daemon điều phối ngắt <code>irqbalance</code> hoặc gán mặt nạ bitmask:</p>
                    <pre class="code-pre" style="margin:6px 0;"><code># Bật dịch vụ tự động cân bằng ngắt
sudo systemctl enable --now irqbalance</code></pre>
                  </li>
                  <li>
                    <strong>Nâng kích thước Hàng đợi Kernel Backlog gấp 10 lần:</strong>
                    <pre class="code-pre" style="margin:6px 0;"><code># Nâng trần hàng đợi lên 10.000 gói tin
sudo sysctl -w net.core.netdev_max_backlog=10000
echo "net.core.netdev_max_backlog = 10000" | sudo tee -a /etc/sysctl.conf</code></pre>
                  </li>
                  <li>
                    <strong>Nâng tối đa kích thước phần cứng Rx/Tx Ring Buffer của card mạng:</strong>
                    <pre class="code-pre" style="margin:6px 0;"><code># Mở rộng bộ đệm DMA từ 1024 lên 4096 ô nhớ
sudo ethtool -G eth0 rx 4096 tx 4096</code></pre>
                  </li>
                </ol>

                <p style="margin-top:10px;"><strong>Kết quả sau điều trị:</strong> Mức tiêu thụ <code>%soft</code> phân bổ đều tăm tắp từ 5% - 8% trên cả 16 lõi CPU. Cột Drop trong <code>softnet_stat</code> trở về con số 0 tuyệt đối. Tỷ lệ lỗi biến mất và latency hạ xuống dưới 2ms ngay trong đợt cao điểm!</p>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Cạm bẫy 'học vẹt 7 tầng OSI' khi chẩn đoán sự cố hệ thống",
            content: "Nhiều kỹ sư khi gặp lỗi kết nối ứng dụng (như lỗi SSL/TLS hoặc lỗi timeout gRPC) lại mất công tra cứu xem 'tầng Presentation' hay 'tầng Session' của hệ điều hành có bị lỗi không. Hãy nhớ: Linux Kernel chỉ quản lý từ tầng 4 (TCP/UDP) trở xuống! Mọi vấn đề về chứng chỉ SSL/TLS, mã hóa, nén hay phiên làm việc đều nằm 100% trong User Space của tiến trình ứng dụng hoặc thư viện liên kết (OpenSSL, libc)."
          },
          {
            title: "Hiểu lầm về chi phí sao chép bộ nhớ khi dữ liệu đi qua các tầng mạng",
            content: "Nhiều lập trình viên nghĩ rằng khi một gói tin đi qua các tầng mạng trong Kernel (L2 -> L3 -> L4), dữ liệu sẽ bị copy nhiều lần qua các buffer khác nhau. Nhờ kiến trúc `struct sk_buff` với kỹ thuật dịch chuyển con trỏ `skb_push` và `skb_pull`, dữ liệu chỉ được copy đúng MỘT lần duy nhất: từ User Space sang Kernel Space (chiều gửi) hoặc từ Kernel Space sang User Space (chiều nhận)!"
          }
        ],
        tips: [
          {
            title: "Giải mã siêu tốc 3 cột chỉ số trong /proc/net/softnet_stat",
            content: "Chỉ cần ghi nhớ 3 cột đầu tiên (ở dạng số Hex): Cột 1 là tổng số gói tin đã xử lý; Cột 2 là số gói tin bị DROP do đầy hàng đợi `netdev_max_backlog` (cột này > 0 nghĩa là hệ thống đang nghẽn); Cột 3 là `time_squeeze` (số lần CPU SoftIRQ bị hết hạn ngạch thời gian xử lý)."
          },
          {
            title: "Phát hiện tức thì hiện tượng nghẽn lõi CPU mạng bằng mpstat",
            content: "Gõ lệnh `mpstat -P ALL 1` và nhìn vào cột `%soft`. Nếu có một CPU bất kỳ chạm ngưỡng > 80% trong khi các CPU khác gần như bằng 0, máy chủ của bạn đang bị nghẽn ngắt mạng (IRQ Bottleneck) và cần cấu hình lại RSS hoặc `irqbalance` ngay lập tức."
          }
        ]
      },
      exercises: [
        {
          level: "Dễ",
          title: "Tính toán Headroom và Tailroom trong bộ đệm sk_buff",
          problem: "Một driver card mạng cấp phát một vùng đệm bộ nhớ liên tục có kích thước tổng cộng là 2048 bytes cho cấu trúc `struct sk_buff`. Ban đầu, driver gọi hàm `skb_reserve(skb, 128)` để chừa khoảng trống cho các header tầng dưới. Sau đó, card mạng nạp vào 1400 bytes dữ liệu payload bằng hàm `skb_put(skb, 1400)`.\n\n1. Kích thước khoảng trống Headroom hiện tại là bao nhiêu bytes?\n2. Kích thước khoảng trống Tailroom còn lại ở cuối buffer là bao nhiêu bytes?",
          hint: "Headroom là khoảng cách từ `skb->head` tới `skb->data`. Tailroom là khoảng cách từ `skb->tail` tới `skb->end`. Tổng dung lượng buffer = Headroom + Kích thước Dữ liệu + Tailroom.",
          solutionCode: "# Tổng dung lượng buffer: 2048 bytes\n# Ban đầu: skb_reserve(skb, 128) -> dịch data và tail tiến về sau 128 bytes.\n# -> Headroom = 128 bytes.\n# Nạp dữ liệu: skb_put(skb, 1400) -> dịch tail tiến thêm 1400 bytes.\n# -> Kích thước dữ liệu (skb->len) = 1400 bytes.\n# -> Tailroom = Tổng dung lượng - Headroom - Dữ liệu\n#             = 2048 - 128 - 1400 = 520 bytes.",
          solutionOutput: "Headroom: 128 bytes\nTailroom: 520 bytes\nDữ liệu hiện hành (skb->len): 1400 bytes",
          explanation: "Khoảng trống 128 bytes Headroom là quá đủ để tầng L4 (20B TCP Header), tầng L3 (20B IP Header) và tầng L2 (14B Ethernet Header) thực hiện các lệnh `skb_push` chèn thêm header mà không lo bị chạm đầu bộ nhớ `skb->head`. Khoảng trống 520 bytes Tailroom còn lại cho phép mở rộng padding hoặc trailer nếu cần."
        },
        {
          level: "Vừa",
          title: "Viết kịch bản Bash tự động cảnh báo nghẽn mạng từ softnet_stat",
          problem: "Viết một đoạn script Bash ngắn đọc tệp `/proc/net/softnet_stat`, tự động chuyển đổi các cột từ Hex sang số thập phân, và in ra cảnh báo nếu phát hiện có bất kỳ CPU core nào bị rớt gói (Drop > 0) hoặc bị quá tải hạn ngạch thời gian (Time_squeeze > 100).",
          hint: "Duyệt từng dòng trong `/proc/net/softnet_stat` bằng `awk`, sử dụng hàm `strtonum(\"0x\"$2)` để lấy giá trị cột Drop.",
          solutionCode: "awk '\n{\n  cpu = NR - 1;\n  processed = strtonum(\"0x\" $1);\n  dropped   = strtonum(\"0x\" $2);\n  squeeze   = strtonum(\"0x\" $3);\n  \n  if (dropped > 0) {\n    printf \"[CẢNH BÁO NGUY HIỂM] CPU %d: Đã drop %d gói tin! Cần tăng net.core.netdev_max_backlog.\\n\", cpu, dropped;\n  }\n  if (squeeze > 100) {\n    printf \"[CẢNH BÁO HIỆU NĂNG] CPU %d: Time_squeeze = %d! CPU bị nghẽn ngắt mềm SoftIRQ.\\n\", cpu, squeeze;\n  }\n  if (dropped == 0 && squeeze <= 100) {\n    printf \"CPU %d: Bình thường (Processed: %d, Drop: 0, Squeeze: %d)\\n\", cpu, processed, squeeze;\n  }\n}' /proc/net/softnet_stat",
          solutionOutput: "CPU 0: Bình thường (Processed: 485012, Drop: 0, Squeeze: 12)\nCPU 1: Bình thường (Processed: 491204, Drop: 0, Squeeze: 8)",
          explanation: "Script này có thể gắn vào cronjob hoặc công cụ giám sát (Node Exporter / Prometheus script) để phát hiện sớm các sự cố nghẽn ngắt mạng tầng nhân trước khi người dùng kịp phàn nàn về tình trạng lag mạng hay timeout."
        },
        {
          level: "Thử thách",
          title: "Phân tích và Khắc phục hiện tượng Lệch tải SoftIRQ (CPU Affinity Bottleneck)",
          problem: "Máy chủ của bạn có 4 CPU cores (CPU 0..3). Khi kiểm tra `/proc/interrupts`, bạn thấy card mạng `eth0` sinh ra IRQ số `29` và toàn bộ các ngắt này chỉ đổ dồn về CPU 0:\n\n`29:  54820120          0          0          0   PCI-MSI-edge  eth0`\n\n1. Giá trị hex hiện tại trong tệp `/proc/irq/29/smp_affinity` là bao nhiêu?\n2. Muốn phân tán ngắt này đều sang cả 4 CPU cores (CPU 0, 1, 2, 3), bạn cần ghi giá trị bitmask nào vào `/proc/irq/29/smp_affinity`?",
          hint: "Mặt nạ bitmask trong Linux: Bit 0 đại diện cho CPU 0, Bit 1 cho CPU 1, Bit 2 cho CPU 2, Bit 3 cho CPU 3. Nếu chỉ dùng CPU 0: bitmask là `0001` nhị phân = `1` hex. Nếu dùng cả 4 CPU (CPU 0..3): bitmask là `1111` nhị phân.",
          solutionCode: "# 1. Giá trị hiện tại khi chỉ dồn vào CPU 0 (Bit 0 bật, các bit khác tắt):\n# Bitmask nhị phân: 0001 -> Giá trị Hex: 1 (hoặc 01)\ncat /proc/irq/29/smp_affinity\n# Output: 1\n\n# 2. Để phân bổ đều sang cả 4 CPU (Bit 0, 1, 2, 3 đều bật):\n# Bitmask nhị phân: 1111 -> Giá trị Hex: f (hoặc 0f)\nsudo bash -c 'echo f > /proc/irq/29/smp_affinity'\n\n# Kiểm tra lại:\ncat /proc/irq/29/smp_affinity\n# Output: f",
          solutionOutput: "Giá trị ban đầu: 1 (chỉ CPU 0)\nGiá trị sau tối ưu: f (phân bổ cho CPU 0, 1, 2, 3)",
          explanation: "Tệp `smp_affinity` sử dụng một số Hexadecimal để biểu diễn mặt nạ bit các CPU được phép tiếp nhận ngắt cứng. Giá trị `f` (15 trong hệ thập phân = nhị phân `1111`) cho phép Kernel chia sẻ tín hiệu ngắt mạng đồng đều qua cả 4 lõi CPU, giải phóng hoàn toàn tình trạng nghẽn cổ chai CPU 0."
        }
      ],
      reflectionQuestion: "Tại sao Linux Kernel không dùng danh sách liên kết các mẩu dữ liệu nhỏ (Linked List of Chunks) để quản lý Header và Payload mà lại chọn cấu trúc vùng nhớ liên tục với Headroom trong struct sk_buff? Sự đánh đổi giữa phân mảnh bộ nhớ (Memory Fragmentation) và hiệu năng bộ nhớ đệm CPU (CPU Cache Locality / L1-L2-L3 Cache Hit) đã quyết định thiết kế này như thế nào?",
      reflectionHint: "Hãy phân tích về mặt phần cứng máy tính: Khi CPU duyệt qua một vùng nhớ liên tục (Continuous Buffer), cơ chế phần cứng CPU Prefetcher sẽ tự động nạp toàn bộ các byte tiếp theo vào L1/L2 Cache, đạt tỷ lệ Cache Hit gần như tuyệt đối (thao tác đọc/ghi chỉ mất 1-3 chu kỳ xung nhịp). Ngược lại, nếu dùng Linked List of Chunks: mỗi con trỏ trỏ tới một vùng RAM rời rạc sẽ gây ra hàng loạt hiện tượng 'Cache Miss' (CPU phải tạm dừng hàng trăm chu kỳ để đợi dữ liệu từ thanh RAM chính kéo về). Trong môi trường truyền tải hàng triệu gói tin mỗi giây, việc chấp nhận hy sinh một ít byte bộ nhớ trống (Headroom) để đổi lấy tốc độ truy cập Cache siêu thanh là một quyết định kiến trúc thiên tài của những nhà sáng lập Linux Kernel!",
      summary: [
        "Mô hình 7 tầng OSI chỉ là lý thuyết học thuật; thế giới thực tế và Linux Kernel vận hành theo kiến trúc TCP/IP 4 tầng với ranh giới quyết định là User Space vs Kernel Space.",
        "Tầng Phiên (Session) và Tầng Trình bày (Presentation) không tồn tại trong Kernel; chúng được giải quyết tinh gọn trong User Space bởi TLS (OpenSSL), Cookies, JSON và Gzip.",
        "struct sk_buff (skb) là cấu trúc xương sống quản lý mọi gói tin trong Linux Kernel, sử dụng 4 con trỏ then chốt: head, data, tail, end trên một vùng nhớ liên tục duy nhất.",
        "Kỹ thuật Zero-Copy Pointer Manipulation: skb_reserve tạo headroom, skb_push chèn header (Encapsulation), skb_pull bóc header (Decapsulation) mà không copy dữ liệu.",
        "Cơ chế NAPI và SoftIRQ NET_RX dập tắt bão ngắt phần cứng; sự cố nghẽn lõi CPU mạng xảy ra khi thiếu Multi-Queue RSS hoặc hàng đợi netdev_max_backlog quá nhỏ, khắc phục bằng irqbalance và tăng ring buffer."
      ],
      nextLessonPreview: "Bài 1.3: Đo lường hiệu năng mạng: Latency, Bandwidth, Throughput, RTT & Jitter — Phân biệt rạch ròi độ rộng ống nước vs tốc độ dòng chảy; tính toán độ trễ lan truyền và Serialization Delay."
    },
    {
      id: "net-1-03",
      number: "1.3",
      title: "Đo lường hiệu năng mạng: Latency, Bandwidth, Throughput, RTT & Jitter",
      subtitle: "Phân biệt rạch ròi độ rộng ống nước vs tốc độ dòng chảy; tính toán độ trễ lan truyền và Serialization Delay",
      level: "Nền tảng",
      duration: "90 phút",
      objectives: [
        "Phân biệt rạch ròi bản chất vật lý giữa Băng thông (Bandwidth), Độ trễ (Latency), Thông lượng (Throughput) và Goodput.",
        "Mổ xẻ 4 thành phần tạo nên tổng độ trễ mạng: Độ trễ lan truyền (Propagation), Độ trễ truyền tải (Transmission), Độ trễ hàng đợi (Queueing) và Độ trễ xử lý (Processing).",
        "Làm chủ khái niệm Tích số Băng thông - Độ trễ (Bandwidth-Delay Product - BDP) và mối quan hệ sống còn với kích thước cửa sổ nhận của TCP (TCP Window Size).",
        "Hiểu cặn kẽ hiện tượng Jitter (độ biến thiên độ trễ) và thảm họa Bufferbloat (sưng phù bộ đệm) trong các thiết bị định tuyến.",
        "Sử dụng thành thạo các công cụ ping, iperf3, và tc-netem trên Linux để đo đạc hiệu năng, giả lập mạng xuyên lục địa và tối ưu hóa bộ đệm TCP Kernel."
      ],
      intuition: {
        title: "Ống Dẫn Nước: Đường Kính Ống vs Chiều Dài Ống vs Thể Tích Nước Trong Đường Dây",
        metaphor: "Hãy tưởng tượng mạng máy tính giống hệt một hệ thống ống dẫn nước nối từ nhà máy xử lý ở bờ biển ra hòn đảo xa xôi. BĂNG THÔNG (Bandwidth) chính là đường kính của ống nước: ống càng to thì một giây càng có thể bơm vào nhiều lít nước. ĐỘ TRỄ (Latency) là thời gian cần thiết để một giọt nước đầu tiên chảy từ nhà máy đến tận đảo: nó phụ thuộc hoàn toàn vào chiều dài của ống và tốc độ dòng chảy của nước (bị giới hạn bởi vận tốc ánh sáng). THÔNG LƯỢNG (Throughput) là lượng nước thực tế bạn hứng được vào xô mỗi giây ở đầu ra của đảo. Và điều kỳ diệu nhất: TÍCH SỐ BĂNG THÔNG - ĐỘ TRỄ (BDP) chính là TỔNG DUNG TÍCH NƯỚC ĐANG LƯU HÀNH TRONG LÒNG ỐNG tại một thời điểm! Nếu bạn chỉ đưa cho người nhận một chiếc cốc nhỏ 64KB (TCP Window nhỏ) và yêu cầu người nhận phải uống hết chiếc cốc đó rồi mới được báo về nhà máy bơm tiếp, toàn bộ đường ống khổng lồ hàng tỷ đồng sẽ bị bỏ hoang trong phần lớn thời gian chờ đợi!",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">🌊</span>
              <span class="net-arch-title">MÔ HÌNH ỐNG NƯỚC MẠNG: BANDWIDTH, LATENCY, BDP &amp; THROUGHPUT</span>
            </div>
            <div class="net-arch-layers">
              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">📏 Đường Kính Ống = Băng Thông (Bandwidth / Capacity)</span>
                  <span class="net-arch-layer-badge">Đơn vị: bps, Mbps, Gbps</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Bản chất:</strong> Số lượng bit tối đa phần cứng card mạng có thể đẩy lên dây truyền trong 1 giây (ví dụ: 1Gbps = 1 tỷ bit/giây).</div>
                  <div class="net-arch-node"><strong>Quy luật:</strong> Băng thông rộng hơn chỉ giúp bạn 'bơm' được nhiều bit hơn cùng một lúc, KHÔNG làm cho từng bit chạy nhanh hơn tốc độ ánh sáng!</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Các bit chuyển động dọc theo chiều dài đường dây với vận tốc ánh sáng trong sợi quang (~200.000 km/s)</div>

              <div class="net-arch-layer layer-vfs">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">⏳ Chiều Dài Ống = Độ Trễ Lan Truyền (Propagation Delay) &amp; RTT</span>
                  <span class="net-arch-layer-badge">Đơn vị: Mili-giây (ms), Micro-giây (µs)</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Công thức vật lý:</strong> <code>D_prop = Khoảng_cách / Vận_tốc_ánh_sáng</code>. Hà Nội ➔ Singapore (~2.200 km) mất tối thiểu ~11ms một chiều (RTT ~22ms).</div>
                  <div class="net-arch-node"><strong>Round-Trip Time (RTT):</strong> Thời gian khứ hồi từ lúc gói tin xuất phát đến khi máy gửi nhận lại gói tin phản hồi (ACK).</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Thể tích chứa toàn bộ các gói tin đang bay trên đường dây (In-flight Data)</div>

              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">📦 Thể Tích Trong Ống = Tích Số Băng Thông - Độ Trễ (BDP)</span>
                  <span class="net-arch-layer-badge">BDP = Bandwidth × RTT (Bytes)</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Ý nghĩa:</strong> Lượng dữ liệu tối đa có thể nằm trên đường truyền mà chưa cần nhận ACK. Ví dụ: 10Gbps × 50ms RTT = 62.5 Megabytes!</div>
                  <div class="net-arch-node"><strong>Hậu quả:</strong> Nếu bộ đệm TCP Window nhỏ hơn BDP, máy gửi sẽ bị nghẽn (Starvation), ống nước bị bỏ đói và Throughput sụt giảm thảm hại!</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Lượng dữ liệu thực tế thu được tại đầu ra ứng dụng</div>

              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🎯 Nước Hứng Được = Thông Lượng Thực Tế (Throughput &amp; Goodput)</span>
                  <span class="net-arch-layer-badge">Dữ liệu hữu ích cho User</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Throughput:</strong> Tốc độ truyền tải thực tế (bị khống chế bởi mắt xích nghẽn nhất trên tuyến đường, packet loss và kích thước TCP window).</div>
                  <div class="net-arch-node"><strong>Goodput:</strong> Tốc độ dữ liệu ứng dụng hữu ích thực tế sau khi đã trừ toàn bộ Header hao phí và các gói tin truyền lại (Retransmission).</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-problem",
          title: "Vấn đề thực tế: Hiểu Lầm Kinh Điển 'Nâng Cấp Gói Mạng Để Giảm Ping' & Vận Tốc Ánh Sáng",
          content: `
            <p>Trong cộng đồng người dùng và thậm chí nhiều kỹ sư phần mềm, có một hiểu lầm kinh điển kéo dài suốt nhiều thập kỷ:</p>
            <blockquote style="margin:10px 0;padding:8px 16px;border-left:4px solid var(--danger);font-style:italic;color:var(--text-secondary);background:var(--bg-surface);">
              "Nhà mạng vừa có gói cước cáp quang mới nâng băng thông từ 100 Mbps lên 1 Gbps (gấp 10 lần). Nếu tôi nâng cấp, ping khi chơi game sang máy chủ Mỹ chắc chắn sẽ giảm từ 180ms xuống còn 18ms!"
            </blockquote>
            <p><strong>Sự thật phũ phàng:</strong> Sau khi bỏ thêm tiền nâng cấp lên gói 1 Gbps, ping sang máy chủ Mỹ vẫn y nguyên là 180ms! Tại sao lại như vậy?</p>

            <div class="net-topo-box">
              <div class="net-topo-title">🌌 BỨC TƯỜNG VẬT LÝ TUYỆT ĐỐI: VẬN TỐC ÁNH SÁNG TRONG LÕI THỦY TINH</div>
              <p>Trong chân không, ánh sáng di chuyển với vận tốc xấp xỉ <code>c = 300.000 km/s</code>. Nhưng trong lõi sợi cáp quang (chất liệu thủy tinh Silica tinh khiết với chiết suất <code>n ≈ 1,468</code>), sóng ánh sáng bị làm chậm lại theo định luật quang học:</p>
              <pre class="code-pre" style="margin:8px 0;background:var(--bg-code);color:var(--text-inverse);"><code>v = c / n = 300.000 / 1,468 ≈ 204.360 km/s (Xấp xỉ 200 km / 1 mili-giây)</code></pre>
              <p>Khoảng cách đường chim bay từ Hà Nội đến San Francisco khoảng <strong>11.500 km</strong>. Nhưng cáp quang biển không đi thẳng tắp mà phải uốn lượn theo đáy đại dương qua các trạm cập bờ ở Hồng Kông, Nhật Bản, Guam với tổng chiều dài thực tế lên tới <strong>15.000 km</strong>:</p>
              <ul>
                <li>Thời gian ánh sáng chạy 1 chiều: <code>15.000 km / 204.360 km/s ≈ 73,4 ms</code>.</li>
                <li>Thời gian khứ hồi (Round-Trip Time - RTT): <code>73,4 ms * 2 ≈ 147 ms</code>!</li>
                <li>Cộng thêm độ trễ chuyển mạch qua hàng chục Router trung gian, RTT tối thiểu của đường truyền này <strong>vĩnh viễn không thể nhỏ hơn 160ms - 180ms</strong> dù bạn có bỏ ra hàng triệu USD để mua đường truyền 100 Gbps!</li>
              </ul>
            </div>

            <p><strong>Bài học bản chất:</strong></p>
            <ul>
              <li><strong>Băng thông (Bandwidth):</strong> Đo lường <em>độ rộng của đường cao tốc</em> (cho phép bao nhiêu chiếc xe cùng xuất phát trong 1 giây). Nâng băng thông giúp tải tệp phim 50 GB nhanh hơn gấp 10 lần.</li>
              <li><strong>Độ trễ (Latency):</strong> Đo lường <em>giới hạn tốc độ tối đa của chiếc xe</em> (bị trói buộc bởi vận tốc ánh sáng). Dù đường cao tốc có mở rộng ra 100 làn xe thì chiếc xe chở bit tin vẫn không thể chạy nhanh hơn 204.000 km/s!</li>
            </ul>

            <h3 style="margin-top:18px;">Ma trận phân biệt: Bandwidth vs Throughput vs Goodput</h3>
            <div class="net-matrix-table-wrap">
              <table class="net-matrix-table">
                <thead>
                  <tr>
                    <th>Khái niệm</th>
                    <th>Ý nghĩa bản chất</th>
                    <th>Ví dụ minh họa thực tế</th>
                    <th>Tỷ lệ tương đối</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Băng thông (Bandwidth / Link Capacity)</strong></td>
                    <td>Tốc độ truyền dữ liệu tối đa trên lý thuyết của kênh truyền phần cứng.</td>
                    <td>Hợp đồng nhà mạng cam kết cổng Ethernet 1 Gbps (1.000 Mbps).</td>
                    <td class="net-highlight-cell">100% (Trần lý thuyết)</td>
                  </tr>
                  <tr>
                    <td><strong>Thông lượng (Throughput)</strong></td>
                    <td>Tốc độ truyền dữ liệu nhị phân thực tế đo được qua mạng tại một thời điểm (đã tính cả Header L2, L3, L4).</td>
                    <td>Đo bằng iperf3 đạt 940 Mbps (do mất 60 Mbps cho Ethernet/IP/TCP Headers và ACK traffic).</td>
                    <td class="net-highlight-cell">≈ 94% Bandwidth</td>
                  </tr>
                  <tr>
                    <td><strong>Goodput (Thông lượng hữu ích)</strong></td>
                    <td>Tốc độ truyền dữ liệu ứng dụng thuần túy (Payload) sau khi trừ sạch mọi Header và các gói tin truyền lại do rớt mạng.</td>
                    <td>Tải file qua HTTPS trong cURL hiển thị: 108 MB/s (xấp xỉ 864 Mbps dữ liệu file sạch).</td>
                    <td class="net-highlight-cell">≈ 85% - 90% Bandwidth</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        },
        {
          id: "sec-mechanism",
          title: "Cơ chế kỹ thuật: 4 Thành Phần Cấu Thành Độ Trễ & BDP (Bandwidth-Delay Product)",
          content: `
            <p>Khi bạn gõ lệnh <code>ping 8.8.8.8</code> và nhận về kết quả <code>time=25.4 ms</code>, con số 25.4 mili-giây đó không phải là một khối đơn nhất. Nó được cấu thành từ <strong>4 thành phần vật lý và toán học độc lập</strong>:</p>

            <div class="net-header-diagram">
              <div class="net-header-title"><span>📐</span> CÔNG THỨC VÀNG VỀ TỔNG ĐỘ TRỄ MẠNG (TOTAL LATENCY)</div>
              <pre class="code-pre" style="margin:8px 0;background:#090d16;color:#38bdf8;font-size:0.95rem;text-align:center;">
Tổng Độ Trễ = D_prop (Lan truyền) + D_trans (Truyền tải) + D_queue (Hàng đợi) + D_proc (Xử lý)
              </pre>
            </div>

            <ol style="line-height:1.8;padding-left:20px;">
              <li>
                <strong>1. Độ trễ Lan truyền ($D_{\text{prop}}$ - Propagation Delay):</strong>
                <p style="margin:2px 0;">Thời gian một bit di chuyển từ máy gửi sang máy nhận qua môi trường vật lý:</p>
                <code style="background:var(--bg-code);padding:2px 8px;border-radius:4px;">D_prop = Khoảng cách (d) / Vận tốc ánh sáng trong môi trường (s)</code>
                <p style="margin:4px 0 8px;font-size:0.9rem;color:var(--text-secondary);">Thành phần này CỐ ĐỊNH theo địa lý. Không có thuật toán phần mềm hay cấu hình Linux sysctl nào có thể giảm được $D_{\text{prop}}$ ngoại trừ việc đặt máy chủ gần người dùng hơn (CDN / Edge Computing)!</p>
              </li>
              <li>
                <strong>2. Độ trễ Truyền tải / Tuần tự hóa ($D_{\text{trans}}$ - Transmission / Serialization Delay):</strong>
                <p style="margin:2px 0;">Thời gian card mạng (NIC) cần để đẩy toàn bộ các bit của một gói tin ra dây cáp:</p>
                <code style="background:var(--bg-code);padding:2px 8px;border-radius:4px;">D_trans = Kích thước gói tin (L tính bằng bits) / Băng thông card mạng (R tính bằng bps)</code>
                <p style="margin:4px 0 8px;font-size:0.9rem;color:var(--text-secondary);">
                  Ví dụ: Với gói tin 1.500 bytes (12.000 bits):<br>
                  - Trên mạng Dial-up 56 Kbps: $D_{\text{trans}} = 12.000 / 56.000 \approx 214\text{ ms}$ (Cực lớn!).<br>
                  - Trên mạng Ethernet 1 Gbps: $D_{\text{trans}} = 12.000 / 1.000.000.000 = 0,012\text{ ms}$ ($12\text{ µs}$ - Siêu nhỏ!).
                </p>
              </li>
              <li>
                <strong>3. Độ trễ Hàng đợi ($D_{\text{queue}}$ - Queueing Delay):</strong>
                <p style="margin:2px 0;">Thời gian gói tin phải nằm im trong bộ đệm RAM của Switch, Router hoặc card mạng máy chủ để xếp hàng chờ đến lượt được xử lý.</p>
                <p style="margin:4px 0 8px;font-size:0.9rem;color:var(--text-secondary);">Đây là thành phần <strong>BIẾN THIÊN MẠNH NHẤT</strong> trong toàn bộ hệ thống mạng. Khi đường truyền vắng, $D_{\text{queue}} \approx 0$. Khi mạng nghẽn, các bộ đệm đầy ắp, $D_{\text{queue}}$ có thể nhảy vọt từ vài mili-giây lên tới hàng ngàn mili-giây! Sự dao động của $D_{\text{queue}}$ chính là nguyên nhân trực tiếp sinh ra hiện tượng <strong>Jitter</strong>.</p>
              </li>
              <li>
                <strong>4. Độ trễ Xử lý ($D_{\text{proc}}$ - Processing Delay):</strong>
                <p style="margin:2px 0;">Thời gian CPU hoặc vi mạch chuyển mạch (ASIC) kiểm tra checksum, đọc IP Header, tra cứu bảng định tuyến FIB và kiểm tra luật tường lửa Netfilter. Thường cực kỳ nhỏ (vài micro-giây trong Kernel hiện đại).</p>
              </li>
            </ol>

            <h3 style="margin-top:24px;">Chỉ Số Sống Còn Của Kỹ Sư Hệ Thống: BDP (Bandwidth-Delay Product)</h3>
            <p>Khái niệm quan trọng nhất kết nối giữa Băng thông và Độ trễ trong giao thức TCP là <strong>Tích số Băng thông - Độ trễ (BDP)</strong>:</p>

            <div class="net-topo-box">
              <div class="net-topo-title">💎 CÔNG THỨC TÍCH SỐ BĂNG THÔNG - ĐỘ TRỄ (BDP)</div>
              <pre class="code-pre" style="margin:8px 0;background:var(--bg-code);color:var(--text-inverse);font-size:1rem;"><code>BDP (Bits)  = Băng thông (Bits/giây) × RTT (Giây)
BDP (Bytes) = BDP (Bits) / 8</code></pre>
              <p><strong>Ý nghĩa vật lý:</strong> BDP cho biết <em>có bao nhiêu byte dữ liệu có thể bay đồng thời trên đường truyền mạng</em> tại một thời điểm mà chưa cần nhận lại gói tin ACK xác nhận.</p>
            </div>

            <p><strong>Nghịch lý nghẽn cửa sổ TCP khi BDP cao (Long Fat Networks - LFN):</strong></p>
            <p>Xét một đường truyền mạng cáp quang tốc độ cao <strong>10 Gbps</strong> nối giữa Tokyo và Frankfurt với thời gian khứ hồi <strong>RTT = 200 ms (0,2 giây)</strong>:</p>
            <ul>
              <li>$\text{BDP} = 10 \times 10^9\text{ bps} \times 0,2\text{ s} = 2.000.000.000\text{ bits} = \mathbf{250\text{ Megabytes}}$!</li>
              <li>Điều này có nghĩa là: Để khai thác trọn vẹn 100% đường truyền 10 Gbps này, máy gửi phải được phép bơm liên tục <strong>250 MB dữ liệu vào đường dây</strong> trước khi dừng lại chờ gói ACK đầu tiên quay về!</li>
              <li><strong>Thảm họa xảy ra nếu cấu hình mặc định:</strong> Chuẩn TCP nguyên thủy (RFC 793) chỉ dùng trường 16-bit cho Window Size, giới hạn cửa sổ nhận tối đa là $2^{16} - 1 = \mathbf{65.535\text{ Bytes (64 KB)}}$.</li>
              <li>Nếu bộ đệm TCP bị giới hạn ở 64 KB, tốc độ tối đa có thể đạt được tuân theo công thức:
                <pre class="code-pre" style="margin:6px 0;background:var(--bg-code);color:var(--danger);font-weight:bold;"><code>Throughput_max = TCP_Window / RTT = 65.535 Bytes / 0,2s = 327.675 Bytes/s ≈ 2,62 Mbps!</code></pre>
              </li>
              <li><strong>Kết quả cay đắng:</strong> Bạn chi tiền mua một đường truyền 10.000 Mbps, nhưng chỉ chạy được vỏn vẹn... <strong>2,62 Mbps</strong> (hiệu suất 0,026%) chỉ vì kích thước cửa sổ nhận của TCP quá nhỏ so với BDP khổng lồ của đường truyền!</li>
            </ul>

            <p style="margin-top:14px;"><strong>Giải pháp cứu tinh trong Linux Kernel:</strong></p>
            <ul>
              <li><strong>TCP Window Scale Option (RFC 1323):</strong> Mở rộng trường Window Size từ 16-bit lên tới 30-bit, cho phép cửa sổ TCP mở rộng lên tới <strong>1 Gigabyte</strong>! (Kiểm tra bằng <code>sysctl net.ipv4.tcp_window_scaling = 1</code>).</li>
              <li><strong>TCP Autotuning:</strong> Linux Kernel tự động đo đạc RTT và BDP của từng kết nối để co giãn bộ đệm <code>tcp_rmem</code> và <code>tcp_wmem</code> một cách linh hoạt theo thời gian thực.</li>
            </ul>
          `
        },
        {
          id: "sec-jitter-bufferbloat",
          title: "Thảm Họa Jitter & Bufferbloat: Kẻ Giết Chết Cuộc Gọi Video & Game Online",
          content: `
            <h3 style="margin-top:0;">1. Jitter (Độ biến thiên độ trễ) là gì?</h3>
            <p><strong>Jitter</strong> là sự dao động thất thường của độ trễ mạng qua từng gói tin kế tiếp nhau. Ví dụ, nếu bạn gửi 4 gói tin liên tiếp:</p>
            <ul>
              <li>Gói 1: RTT = 20ms</li>
              <li>Gói 2: RTT = 85ms (trễ tăng đột biến do gặp hàng đợi)</li>
              <li>Gói 3: RTT = 22ms</li>
              <li>Gói 4: RTT = 110ms</li>
            </ul>
            <p>Mặc dù RTT trung bình chỉ là 59ms, nhưng chỉ số Jitter rất cao ($|85 - 20| = 65\text{ms}$). Đối với việc tải file dữ liệu, Jitter cao không thành vấn đề. Nhưng đối với <strong>ứng dụng thời gian thực (Real-time: VoIP, Zoom/Meet, Livestream, Cloud Gaming)</strong>, Jitter là một thảm họa: âm thanh sẽ bị méo tiếng như robot, khung hình video bị giật cục và nhân vật trong game bị giật lùi vị trí (Rubber-banding)!</p>

            <h3 style="margin-top:20px;">2. Thảm họa Bufferbloat (Sưng phù bộ đệm)</h3>
            <p><strong>Bufferbloat</strong> là một căn bệnh thâm căn cố đế của hạ tầng mạng Internet hiện đại, được kỹ sư Jim Gettys chỉ mặt đặt tên vào năm 2010:</p>

            <div class="net-incident-card">
              <div class="net-incident-header">
                <span>💥 NGUYÊN NHÂN GỐC RỄ CỦA BUFFERBLOAT:</span>
              </div>
              <div class="net-incident-body">
                <p>Trước đây, bộ nhớ RAM rất đắt tiền nên các router chỉ có hàng đợi đệm nhỏ vài chục kilobyte. Khi RAM trở nên siêu rẻ, các nhà sản xuất router/modem gia đình đã nhồi nhét hàng chục megabyte RAM vào thiết bị với suy nghĩ ngây thơ: <em>'Càng nhiều RAM đệm thì càng ít bị rớt gói tin (Drop packet)'</em>.</p>
                <p>Nhưng giao thức TCP dựa vào hiện tượng <strong>MẤT GÓI TIN (Packet Loss)</strong> làm tín hiệu duy nhất để nhận biết mạng đã bị nghẽn và chủ động hạ tốc độ gửi. Khi router có bộ đệm RAM khổng lồ theo cơ chế Drop-tail cổ điển:</p>
                <ul>
                  <li>Khi bạn bắt đầu tải một video lớn trên YouTube, gói tin TCP đổ dồn vào làm đầy ứ bộ đệm RAM của router.</li>
                  <li>Router KHÔNG drop gói tin nào, mà kiên nhẫn 'ngậm' hàng ngàn gói tin trong RAM hàng đợi.</li>
                  <li>Một gói tin ping hoặc gói tin voice chat Zoom đến sau buộc phải xếp hàng sau 10 MB dữ liệu YouTube kia, mất tới <strong>1.500ms - 2.000ms</strong> mới chui qua được router!</li>
                  <li>TCP của YouTube thấy không có gói nào bị rớt nên tiếp tục bơm ga mạnh hơn. Kết quả: Mạng không rớt gói nào nhưng <strong>ping vọt từ 15ms lên 2.000ms</strong>, khiến cuộc gọi video đứng hình hoàn toàn!</li>
                </ul>
              </div>
            </div>

            <h3 style="margin-top:16px;">Vũ khí tiêu diệt Bufferbloat trên Linux: Thuật toán fq_codel &amp; CAKE</h3>
            <p>Để chữa dứt điểm căn bệnh Bufferbloat, các kỹ sư hạt nhân Linux (đứng đầu là Van Jacobson và Eric Dumazet) đã phát minh ra các thuật toán điều phối hàng đợi chủ động (Active Queue Management - AQM):</p>
            <ul>
              <li><strong>CoDel (Controlled Delay):</strong> Thay vì đo số lượng gói tin trong hàng đợi, CoDel đo <em>thời gian lưu trú (sojourn time)</em> của gói tin trong đệm. Nếu một gói tin bị ngâm quá 5ms, CoDel chủ động drop có chủ đích một vài gói tin để cảnh báo TCP giảm tốc độ trước khi bộ đệm kịp phình to!</li>
              <li><strong>fq_codel (Fair Queueing CoDel):</strong> Kết hợp chia luồng công bằng (Fair Queueing) với CoDel. Các luồng dữ liệu nhỏ (DNS, Ping, Voice, Game) được xếp vào các làn đường ưu tiên riêng chạy vèo qua, hoàn toàn không bị kẹt sau luồng tải file khổng lồ của Torrent hay YouTube. <code>fq_codel</code> đã trở thành bộ điều phối qdisc mặc định của Linux Kernel từ bản 3.5!</li>
            </ul>
          `
        },
        {
          id: "sec-observe",
          title: "Quan sát trên Linux: Đo Đạc Ping, Jitter & Thông Lượng Thực Tế Với iperf3",
          content: `
            <p>Hãy cùng thực hiện chuỗi đo lường thực tế trên Linux để định lượng chính xác các thông số mạng:</p>
          `,
          codeExamples: [
            {
              title: "Bước 1: Giải mã chỉ số RTT và Jitter (mdev) bằng lệnh ping",
              lang: "Bash",
              code: "# Gửi 10 gói tin ping thăm dò tới Cloudflare DNS (1.1.1.1)\nping -c 10 1.1.1.1",
              output: "--- 1.1.1.1 ping statistics ---\n10 packets transmitted, 10 received, 0% packet loss, time 9012ms\nrtt min/avg/max/mdev = 12.140/14.821/21.450/2.614 ms",
              annotations: [
                { line: 3, text: "min (12.140ms): Thời gian khứ hồi nhỏ nhất đạt được (khi không có độ trễ hàng đợi D_queue)." },
                { line: 3, text: "avg (14.821ms): Thời gian khứ hồi trung bình của toàn bộ 10 gói tin." },
                { line: 3, text: "max (21.450ms): Thời gian khứ hồi lớn nhất (thường do gói tin gặp hàng đợi tức thời trên một router trung gian)." },
                { line: 3, text: "mdev (2.614ms): Viết tắt của Mean Deviation (Độ lệch chuẩn trung bình). Đây chính là thước đo JITTER chuẩn mực của đường truyền! mdev càng nhỏ, mạng càng ổn định." }
              ]
            },
            {
              title: "Bước 2: Đo Thông Lượng Thực Tế (Throughput) bằng iperf3",
              lang: "Bash",
              code: "# Máy chủ (Server): Lắng nghe đo băng thông trên cổng mặc định 5201\niperf3 -s\n\n# Máy khách (Client): Kết nối tới máy chủ, đo băng thông TCP trong 5 giây\niperf3 -c 192.168.1.50 -t 5",
              output: "[ ID] Interval           Transfer     Bitrate         Retr\n[  5]   0.00-1.00   sec   112 MBytes   941 Mbits/sec    0\n[  5]   1.00-2.00   sec   112 MBytes   942 Mbits/sec    0\n[  5]   2.00-3.00   sec   112 MBytes   941 Mbits/sec    0\n[  5]   3.00-4.00   sec   112 MBytes   942 Mbits/sec    0\n[  5]   4.00-5.00   sec   112 MBytes   941 Mbits/sec    0\n- - - - - - - - - - - - - - - - - - - - - - - - -\n[  5]   0.00-5.00   sec   561 MBytes   941 Mbits/sec    0   sender",
              annotations: [
                { line: 3, text: "Bitrate đạt 941 Mbits/sec: Đây là THÔNG LƯỢNG THỰC TẾ (Throughput) của cổng mạng Gigabit 1.000 Mbps." },
                { line: 3, text: "Cột Retr = 0: Không có bất kỳ gói tin nào phải truyền lại (đường truyền hoàn hảo, không mất gói)." }
              ]
            },
            {
              title: "Bước 3: Kiểm tra hàng đợi Qdisc mặc định của card mạng Linux",
              lang: "Bash",
              code: "# Kiểm tra thuật toán điều phối hàng đợi trên giao diện mạng eth0\ntc qdisc show dev eth0",
              output: "qdisc fq_codel 0: root refcnt 2 limit 10240p flows 1024 quantum 1514 target 5ms interval 100ms memory_limit 32Mb ecn",
              annotations: [
                { line: 2, text: "fq_codel: Hệ điều hành đang sử dụng thuật toán Fair Queueing CoDel chống Bufferbloat." },
                { line: 2, text: "target 5ms: Thuật toán CoDel tự động kiểm soát để thời gian gói tin nằm chờ trong hàng đợi không vượt quá 5 mili-giây!" }
              ]
            }
          ]
        },
        {
          id: "sec-lab",
          title: "Phòng Lab thực hành: Giả lập Mạng Xuyên Lục Địa (WAN Emulation) với tc-netem & Đo BDP",
          content: `
            <div class="net-topo-box">
              <div class="net-topo-title">🧪 PHÒNG LAB THỰC HÀNH 1.3: DÙNG TC-NETEM BƠM TRỄ XUYÊN ĐẠI DƯƠNG VÀ ĐO BDP</div>
              <p><strong>Mục tiêu:</strong> Tự tay sử dụng công cụ điều phối lưu lượng của nhân Linux (<code>tc-netem</code>) để bơm 100ms độ trễ xuyên lục địa vào sợi cáp ảo, quan sát sự sụt giảm tức thì của thông lượng TCP khi cửa sổ bị giới hạn, và tự tay tối ưu hóa thông số Kernel để kéo băng thông trở lại đỉnh cao.</p>
              <p><strong>Môi trường &amp; Công cụ:</strong> Mọi máy Linux (Ubuntu/Debian/CentOS). Công cụ: <code>ip</code>, <code>tc</code>, <code>iperf3</code>, <code>sysctl</code>.</p>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Dựng Topo mạng ảo 2 Node cô lập bằng Network Namespaces</h4>
              </div>
              <p class="net-step-desc">Tạo 2 namespace <code>ns-tokyo</code> và <code>ns-london</code>, kết nối với nhau bằng cặp dây cáp ảo <code>veth</code>:</p>
              <pre class="code-pre"><code>sudo ip netns add ns-tokyo
sudo ip netns add ns-london
sudo ip link add veth-t type veth peer name veth-l
sudo ip link set veth-t netns ns-tokyo
sudo ip link set veth-l netns ns-london

# Cấu hình IP và bật interface
sudo ip netns exec ns-tokyo ip addr add 10.20.1.1/24 dev veth-t
sudo ip netns exec ns-tokyo ip link set veth-t up
sudo ip netns exec ns-tokyo ip link set lo up

sudo ip netns exec ns-london ip addr add 10.20.1.2/24 dev veth-l
sudo ip netns exec ns-london ip link set veth-l up
sudo ip netns exec ns-london ip link set lo up</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Chạy <code>sudo ip netns exec ns-tokyo ping -c 1 10.20.1.2</code> thấy ping siêu tốc <code>time=0.035 ms</code> (độ trễ cáp ảo trong RAM).</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 2</span>
                <h4 class="net-step-title">Dùng tc-netem bơm 100ms độ trễ và 10ms Jitter vào đầu cáp Tokyo</h4>
              </div>
              <p class="net-step-desc">Biến sợi cáp ảo trong máy tính thành một đường cáp ngầm xuyên lục địa có độ trễ khứ hồi RTT = 200ms:</p>
              <pre class="code-pre"><code># Bơm 100ms trễ một chiều với 10ms biến thiên (Jitter) trên veth-t
sudo ip netns exec ns-tokyo tc qdisc add dev veth-t root netem delay 100ms 10ms

# Kiểm tra lại lệnh ping từ Tokyo sang London:
sudo ip netns exec ns-tokyo ping -c 4 10.20.1.2</code></pre>
              <p class="net-step-desc" style="margin-top:8px;">Kết quả ping lập tức thay đổi ngoạn mục:</p>
              <pre class="code-pre"><code>64 bytes from 10.20.1.2: icmp_seq=1 ttl=64 time=201 ms
64 bytes from 10.20.1.2: icmp_seq=2 ttl=64 time=193 ms
64 bytes from 10.20.1.2: icmp_seq=3 ttl=64 time=208 ms
64 bytes from 10.20.1.2: icmp_seq=4 ttl=64 time=197 ms</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Khám phá cốt lõi:</strong> Độ trễ khứ hồi RTT đã nhảy vọt lên xấp xỉ 200ms kèm theo sự biến thiên Jitter khoảng 10ms. Bạn vừa tự tay tái lập môi trường mạng xuyên lục địa từ Tokyo sang London ngay trên chiếc laptop của mình!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 3</span>
                <h4 class="net-step-title">Khởi động iperf3 Server tại London và đo Throughput khi cửa sổ nhỏ</h4>
              </div>
              <p class="net-step-desc">Khởi động server đo băng thông tại London và dùng Tokyo kết nối sang với cửa sổ nhận bị cố tình ép xuống 64KB (chuẩn RFC 793):</p>
              <pre class="code-pre"><code># Chạy server ngầm trong ns-london
sudo ip netns exec ns-london iperf3 -s -D

# Tokyo kết nối sang đo thông lượng với cửa sổ TCP Window bị khóa ở 64KB (-w 64k)
sudo ip netns exec ns-tokyo iperf3 -c 10.20.1.2 -t 5 -w 64k</code></pre>
              <p class="net-step-desc" style="margin-top:8px;">Quan sát kết quả thông lượng đo được:</p>
              <pre class="code-pre"><code>[ ID] Interval           Transfer     Bitrate
[  5]   0.00-5.00   sec  1.56 MBytes  2.62 Mbits/sec    receiver</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Chứng minh thực nghiệm:</strong> Tốc độ đo được CHÍNH XÁC là <code>2.62 Mbits/sec</code>! Hoàn toàn trùng khớp 100% với công thức toán học <code>Throughput = Window / RTT = 64KB / 0.2s</code> mà ta đã tính toán ở phần lý thuyết!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 4</span>
                <h4 class="net-step-title">Giải phóng cửa sổ TCP Window tương xứng với BDP và chứng kiến kỳ tích</h4>
              </div>
              <p class="net-step-desc">Bây giờ, hãy mở rộng cửa sổ TCP Window lên mức 8 Megabytes (<code>-w 8M</code>) để lấp đầy thể tích BDP của đường truyền:</p>
              <pre class="code-pre"><code>sudo ip netns exec ns-tokyo iperf3 -c 10.20.1.2 -t 5 -w 8M</code></pre>
              <p class="net-step-desc" style="margin-top:8px;">Quan sát tốc độ vọt lên sau khi mở rộng cửa sổ:</p>
              <pre class="code-pre"><code>[ ID] Interval           Transfer     Bitrate
[  5]   0.00-5.00   sec   480 MBytes   805 Mbits/sec    receiver</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Kỳ tích hiệu năng:</strong> Tốc độ truyền tải lập tức tăng vọt từ <strong>2.62 Mbps lên hơn 800 Mbps (tăng hơn 300 lần!)</strong> trên cùng một đường dây có độ trễ 200ms đó! Đây chính là sức mạnh của việc thấu hiểu BDP.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 5</span>
                <h4 class="net-step-title">Dọn dẹp môi trường Lab an toàn 100%</h4>
              </div>
              <p class="net-step-desc">Tiêu diệt tiến trình iperf3 và xóa 2 namespace để giải phóng toàn bộ tài nguyên:</p>
              <pre class="code-pre"><code>sudo pkill -f "iperf3 -s" 2>/dev/null
sudo ip netns del ns-tokyo
sudo ip netns del ns-london</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Hệ thống sạch sẽ:</strong> Trả lại nguyên trạng máy chủ của bạn!</span>
              </div>
            </div>
          `
        },
        {
          id: "sec-production",
          title: "Môi trường Production & Ca sự cố: Bệnh án 'Thuê Đường Truyền 10Gbps Xuyên Quốc Gia Nhưng Tốc Độ Copy File Chỉ Đạt 30Mbps'",
          content: `
            <div class="net-postmortem-card">
              <div class="net-postmortem-header">
                <span class="net-postmortem-badge">SRE POST-MORTEM</span>
                <span class="net-postmortem-title">Hồ Sơ Sự Cố: Thuê Kênh Riêng Quốc Tế 10Gbps Hàng Trăm Triệu Mỗi Tháng Nhưng Sao Chép Dữ Liệu Bị Rùa Bò</span>
              </div>
              <div class="net-postmortem-body">
                <p><strong>🚨 Bối cảnh sự cố:</strong> Một tập đoàn đa quốc gia thuê đường truyền cáp quang chuyên dụng (Dedicated Leased Line / AWS Direct Connect) băng thông <strong>10 Gbps</strong> nối giữa trung tâm dữ liệu tại Frankfurt (Đức) và Singapore để phục vụ việc sao lưu cơ sở dữ liệu khổng lồ (Dung lượng 5 TB) mỗi đêm. Thời gian khứ hồi đo được là <strong>RTT = 160 ms</strong>.</p>
                <p>Ban giám đốc gửi khiếu nại khẩn cấp: Đội ngũ vận hành dùng công cụ <code>rsync</code> / <code>scp</code> để copy tệp sao lưu 5 TB qua đường truyền 10 Gbps, nhưng tốc độ truyền tải chỉ lẹt đẹt ở mức <strong>3,5 MB/s (tương đương ~28 Mbps)</strong>! Quá trình sao lưu mất tới hơn 40 giờ đồng hồ, làm gián đoạn toàn bộ hoạt động kinh doanh ngày hôm sau.</p>

                <p style="margin-top:12px;"><strong>💥 Triệu chứng trích xuất từ iperf3 và thông số Kernel:</strong></p>
                <div class="net-log-terminal">$ iperf3 -c 10.150.1.20
[ ID] Interval           Transfer     Bitrate
[  5]   0.00-10.00  sec  34.5 MBytes  28.9 Mbits/sec  <-- TỐC ĐỘ CHỈ ĐẠT 0.28% BĂNG THÔNG DANH ĐỊNH!

$ sysctl net.ipv4.tcp_rmem net.ipv4.tcp_wmem net.core.rmem_max net.core.wmem_max
net.ipv4.tcp_rmem = 4096	87380	4194304  <-- GIÁ TRỊ MAX CỦA TCP WINDOW CHỈ LÀ 4 MB!
net.core.rmem_max = 212992</div>

                <p><strong>🔍 Phân tích nguyên nhân gốc rễ (Root Cause Analysis - RCA):</strong></p>
                <ul>
                  <li>Đường truyền xuyên lục địa có độ trễ lớn <code>RTT = 160ms = 0,16s</code> trên băng thông <code>10 Gbps</code> tạo ra một giá trị BDP khổng lồ:
                    <pre class="code-pre" style="margin:4px 0;background:var(--bg-code);color:var(--text-inverse);"><code>BDP = 10.000.000.000 bps * 0,16s = 1.600.000.000 bits = 200 MEGABYTES!</code></pre>
                  </li>
                  <li>Để bơm đầy đường ống này, TCP Socket bắt buộc phải có bộ đệm gửi/nhận tối thiểu là <strong>200 MB</strong>.</li>
                  <li>Thế nhưng trên hệ điều hành Ubuntu mặc định của máy chủ, thông số trần của bộ đệm <code>net.ipv4.tcp_wmem</code> và <code>net.ipv4.tcp_rmem</code> bị khóa cứng ở mức tối đa chỉ là <strong>4 MB</strong> (4.194.304 bytes). Thậm chí <code>net.core.wmem_max</code> chỉ cho phép cấp tối đa 212 KB!</li>
                  <li>Với cửa sổ gửi tối đa bị bóp nghẹt ở mức 4 MB, thông lượng tối đa của một luồng TCP đơn lẻ bị khống chế tuyệt đối ở mức:
                    <pre class="code-pre" style="margin:4px 0;background:var(--bg-code);color:var(--danger);font-weight:bold;"><code>Throughput_max = 4 MB / 0,16s = 25 MB/s = 200 Mbps!</code></pre>
                  </li>
                  <li>Chưa dừng lại ở đó, trên đường truyền cáp quang dài hơn 12.000 km, chỉ cần một tỷ lệ mất gói cực nhỏ <strong>0,05%</strong> (do nhiễu quang học), thuật toán kiểm soát tắc nghẽn cổ điển <strong>TCP CUBIC</strong> sẽ hiểu lầm là mạng nghẽn nghiêm trọng, lập tức chặt đôi cửa sổ gửi (Multiplicative Decrease) và mất hàng chục phút để bò từ từ trở lại!</li>
                  <li>Đồng thời, lệnh <code>scp</code> sử dụng cơ chế điều khiển luồng nội bộ tầng ứng dụng thời xưa bị khóa buffer ở mức 64KB, khiến tốc độ tụt thảm hại xuống đúng 28 Mbps!</li>
                </ul>

                <p style="margin-top:14px;"><strong>💊 Phác đồ điều trị triệt để của Kiến trúc sư Hạ tầng:</strong></p>
                <ol class="net-treatment-list">
                  <li>
                    <strong>Mở rộng trần bộ đệm Socket toàn hệ thống lên 128 Megabytes:</strong>
                    <pre class="code-pre" style="margin:6px 0;"><code># Nâng trần bộ nhớ đệm socket mạng lõi
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728

# Cấu hình dải bộ đệm TCP (min, default, max): Max nâng lên 128 MB
sudo sysctl -w net.ipv4.tcp_rmem="4096 87380 134217728"
sudo sysctl -w net.ipv4.tcp_wmem="4096 65536 134217728"</code></pre>
                  </li>
                  <li>
                    <strong>Kích hoạt thuật toán kiểm soát tắc nghẽn BBR (Bottleneck Bandwidth and RTT) của Google:</strong>
                    <p style="margin:4px 0;font-size:0.86rem;">Thay thế TCP CUBIC bằng BBR. BBR không coi mất gói là nghẽn mạng; nó liên tục đo đạc dung lượng ống thực tế và RTT tối thiểu, duy trì tốc độ tối đa ngay cả khi có tỷ lệ rớt gói 1-2%:</p>
                    <pre class="code-pre" style="margin:6px 0;"><code># Bật hàng đợi fair queueing và thuật toán BBR
sudo sysctl -w net.core.default_qdisc=fq
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr</code></pre>
                  </li>
                  <li>
                    <strong>Lưu vĩnh viễn cấu hình tối ưu vào /etc/sysctl.conf:</strong>
                    <pre class="code-pre" style="margin:6px 0;"><code>cat << 'EOF' | sudo tee -a /etc/sysctl.conf
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.ipv4.tcp_rmem = 4096 87380 134217728
net.ipv4.tcp_wmem = 4096 65536 134217728
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
EOF
sudo sysctl -p</code></pre>
                  </li>
                  <li>
                    <strong>Thay thế công cụ truyền file scp đơn luồng bằng công cụ truyền đa luồng:</strong>
                    <p style="margin:4px 0;font-size:0.86rem;">Sử dụng <code>rclone</code> hoặc <code>bbcp</code> chạy song song 16 luồng TCP:</p>
                    <pre class="code-pre" style="margin:6px 0;"><code>rclone copy --transfers 16 /backup/db.tar.gz remote-singapore:/backup/</code></pre>
                  </li>
                </ol>

                <p style="margin-top:10px;"><strong>Kết quả sau điều trị:</strong> Thông lượng của đường truyền nhảy vọt từ <strong>28 Mbps lên tới 9.35 Gbps</strong> (đạt 93.5% công suất tối đa của đường truyền vật lý 10 Gbps). Thời gian sao chép 5 TB dữ liệu rút ngắn ngoạn mục từ <strong>40 tiếng xuống còn đúng 1 giờ 15 phút</strong>!</p>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Nhầm lẫn tai hại giữa bit (b) và Byte (B) khi tính toán băng thông",
            content: "Rất nhiều người nhầm lẫn giữa `Mbps` (Mega-bit mỗi giây) và `MB/s` (Mega-Byte mỗi giây). Băng thông mạng luôn được niêm yết bằng **bit** (nhỏ), trong khi dung lượng tệp tin trên ổ đĩa luôn được đo bằng **Byte** (lớn). Hãy luôn nhớ quy tắc: `1 Byte = 8 bits`. Nếu bạn có gói cước 800 Mbps, tốc độ tải tệp tối đa trên lý thuyết chỉ là `800 / 8 = 100 MB/s`."
          },
          {
            title: "Tưởng rằng nâng băng thông đường truyền sẽ làm giảm ping game",
            content: "Độ trễ ping (RTT) phụ thuộc chủ yếu vào khoảng cách địa lý và vận tốc ánh sáng trong sợi quang ($D_{\text{prop}}$). Nâng gói cước từ 100 Mbps lên 1 Gbps chỉ làm giảm một phần cực nhỏ độ trễ truyền tải ($D_{\text{trans}}$, từ $0,1\text{ms}$ xuống $0,01\text{ms}$). Nếu đường truyền hiện tại của bạn không bị nghẽn băng thông, việc nâng cấp gói cước sẽ KHÔNG làm giảm dù chỉ 1 mili-giây ping sang máy chủ nước ngoài!"
          }
        ],
        tips: [
          {
            title: "Giải mã nhanh chỉ số mdev trong lệnh ping",
            content: "Khi chạy lệnh `ping`, hãy luôn nhìn vào chỉ số cuối cùng `mdev` (Mean Deviation). Nếu RTT trung bình là 30ms nhưng `mdev = 15ms`, đường truyền của bạn đang bị Jitter rất nặng (độ trễ trồi sụt thất thường), cần kiểm tra xem Wi-Fi có bị nhiễu sóng hoặc router có bị Bufferbloat hay không."
          },
          {
            title: "Kiểm tra xem máy chủ Linux của bạn đã bật thuật toán BBR chưa",
            content: "Chỉ cần gõ lệnh: `sysctl net.ipv4.tcp_congestion_control`. Nếu kết quả hiển thị `cubic`, hãy cân nhắc chuyển sang `bbr` nếu máy chủ của bạn thường xuyên phải phục vụ khách hàng từ xa hoặc truyền tải file lớn qua mạng WAN."
          }
        ]
      },
      exercises: [
        {
          level: "Dễ",
          title: "Tính toán BDP và Cửa sổ Buffer cần thiết cho Đường truyền 1Gbps",
          problem: "Một chi nhánh công ty tại Đà Nẵng kết nối tới trung tâm dữ liệu tại Singapore qua đường truyền cáp quang băng thông 1 Gbps. Đo đạc bằng lệnh ping cho thấy thời gian khứ hồi ổn định là RTT = 40 mili-giây (0,04 giây).\n\n1. Hãy tính giá trị BDP (Bandwidth-Delay Product) của đường truyền này theo đơn vị Megabytes.\n2. Nếu cửa sổ nhận TCP Window Size của máy chủ bị giới hạn ở mức 256 KB, thông lượng tối đa có thể đạt được là bao nhiêu Mbps?",
          hint: "BDP = Băng thông (bps) * RTT (s). Đổi sang Bytes bằng cách chia 8, đổi sang MB bằng cách chia (1024 * 1024). Thông lượng cực đại = Window Size / RTT.",
          solutionCode: "# 1. Tính BDP:\n# Băng thông = 1 Gbps = 1.000.000.000 bits/s\n# RTT = 0.04 s\n# BDP (bits) = 1.000.000.000 * 0.04 = 40.000.000 bits\n# BDP (Bytes) = 40.000.000 / 8 = 5.000.000 Bytes ≈ 4.77 MB (hoặc 5 MB chuẩn thập phân).\n\n# 2. Tính Thông lượng khi Window = 256 KB (262.144 Bytes):\n# Throughput = 262.144 Bytes / 0.04 s = 6.553.600 Bytes/s\n# Đổi sang Mbps: (6.553.600 * 8) / 1.000.000 ≈ 52.43 Mbps.",
          solutionOutput: "BDP cần thiết: 5.000.000 Bytes (≈ 5 MB)\nThông lượng khi Window 256KB: 52.43 Mbps (chỉ đạt 5.2% băng thông đường truyền 1Gbps)",
          explanation: "Kết quả cho thấy nếu không nâng trần bộ đệm TCP Window lên tối thiểu 5 MB, đường truyền 1 Gbps đắt đỏ sẽ bị lãng phí hơn 94% công suất, chỉ chạy được vỏn vẹn ở tốc độ 52.4 Mbps!"
        },
        {
          level: "Vừa",
          title: "Phân tách 4 Thành phần Độ trễ của một gói tin qua mạng WAN",
          problem: "Một gói tin kích thước chuẩn MTU 1.500 bytes (12.000 bits) được gửi từ máy khách qua đường truyền cáp quang dài 3.000 km tới máy chủ. Băng thông đường truyền là 100 Mbps. Trên đường đi, gói tin đi qua 3 router trung gian, mỗi router mất trung bình 10 micro-giây (0,01 ms) để xử lý header và hàng đợi tại mỗi router đang có độ trễ xếp hàng là 2 mili-giây. Vận tốc ánh sáng trong sợi quang là 200.000 km/s.\n\nHãy tính toán chính xác giá trị của 4 thành phần độ trễ một chiều (D_prop, D_trans, D_queue, D_proc) và tổng độ trễ một chiều (One-way Latency).",
          hint: "D_prop = Khoảng cách / 200.000. D_trans = 12.000 bits / 100.000.000 bps. D_queue = 3 * 2ms. D_proc = 3 * 0,01ms.",
          solutionCode: "# 1. Độ trễ lan truyền (D_prop):\n# D_prop = 3.000 km / 200.000 km/s = 0.015 s = 15 ms.\n\n# 2. Độ trễ truyền tải (D_trans):\n# D_trans = 12.000 bits / 100.000.000 bits/s = 0.00012 s = 0.12 ms.\n\n# 3. Độ trễ hàng đợi (D_queue):\n# Đi qua 3 router, mỗi router trễ 2 ms -> D_queue = 3 * 2 ms = 6 ms.\n\n# 4. Độ trễ xử lý (D_proc):\n# Đi qua 3 router, mỗi router mất 0.01 ms -> D_proc = 3 * 0.01 ms = 0.03 ms.\n\n# Tổng độ trễ 1 chiều = 15 + 0.12 + 6 + 0.03 = 21.15 ms.",
          solutionOutput: "D_prop  (Lan truyền): 15.00 ms\nD_trans (Truyền tải):  0.12 ms\nD_queue (Hàng đợi):    6.00 ms\nD_proc  (Xử lý):       0.03 ms\nTổng độ trễ một chiều: 21.15 ms (RTT khứ hồi xấp xỉ 42.3 ms)",
          explanation: "Trong mạng WAN đường dài, độ trễ lan truyền (15 ms) chiếm áp đảo (hơn 70% tổng độ trễ), tiếp theo là độ trễ hàng đợi do nghẽn mạng (6 ms). Độ trễ truyền tải và xử lý ở tốc độ 100 Mbps chỉ chiếm tỷ lệ không đáng kể."
        },
        {
          level: "Thử thách",
          title: "Tính toán Giới hạn Băng thông Lý thuyết của TCP khi có Packet Loss (Công thức Mathis)",
          problem: "Nhà khoa học mạng Matt Mathis đã chứng minh công thức kinh điển xác định thông lượng tối đa của một luồng TCP đơn lẻ khi có tỷ lệ mất gói (Packet Loss Rate $p$):\n\n$$\\text{Throughput} \\le \\frac{\\text{MSS}}{\\text{RTT}} \\times \\frac{C}{\\sqrt{p}}$$\n\n(Trong đó $C$ là hằng số xấp xỉ bằng $1,22$, $\\text{MSS} = 1.460\\text{ bytes} = 11.680\\text{ bits}$).\n\nGiả sử bạn có đường truyền mạng 1 Gbps giữa hai chi nhánh có $\\text{RTT} = 50\\text{ ms} = 0,05\\text{ s}$. Đường truyền cáp quang bị suy hao dẫn tới tỷ lệ mất gói là $p = 1\\% = 0,01$.\n\nHãy tính thông lượng TCP tối đa có thể đạt được. Con số này chiếm bao nhiêu phần trăm băng thông danh định 1 Gbps?",
          hint: "Thay số: MSS = 11.680 bits, RTT = 0.05 s, C = 1.22, căn bậc hai của p (căn bậc hai của 0.01 là 0.1).",
          solutionCode: "# Áp dụng công thức Mathis:\n# MSS = 11.680 bits\n# RTT = 0.05 s\n# p = 0.01 -> sqrt(p) = 0.1\n# C = 1.22\n\n# Throughput = (11.680 / 0.05) * (1.22 / 0.1)\n#            = 233.600 * 12.2 = 2.849.920 bits/s ≈ 2.85 Mbps!\n\n# Tỷ lệ so với băng thông 1 Gbps (1.000 Mbps):\n# Tỷ lệ = 2.85 / 1000 ≈ 0.285%.",
          solutionOutput: "Thông lượng TCP tối đa: 2.85 Mbps\nHiệu suất đường truyền: 0.285% (Mất hơn 99.7% băng thông)",
          explanation: "Công thức Mathis chứng minh một quy luật tàn khốc của thuật toán TCP truyền thống: Chỉ cần 1% mất gói trên đường truyền RTT 50ms, thông lượng của 1 luồng TCP sẽ bị bóp nghẹt từ 1.000 Mbps xuống còn vỏn vẹn 2.85 Mbps! Đây chính là lý do vì sao trong mạng WAN hiện đại, người ta bắt buộc phải sử dụng các thuật toán không phụ thuộc vào mất gói như Google BBR hoặc truyền dữ liệu đa luồng (Multi-stream)."
        }
      ],
      reflectionQuestion: "Tại sao các vệ tinh viễn thông địa tĩnh (Geostationary Satellites - GEO ở độ cao 35.786 km) dù sở hữu băng thông rất lớn (hàng trăm Mbps) nhưng trải nghiệm lướt web, họp video hay chơi game lại cực kỳ tồi tệ? Vì sao các chòm sao vệ tinh tầm thấp (LEO như Starlink ở độ cao 550 km) lại được coi là một cuộc cách mạng vật lý về độ trễ mạng?",
      reflectionHint: "Hãy tính độ trễ lan truyền hai chiều: Vệ tinh địa tĩnh GEO ở độ cao 35.786 km. Sóng vô tuyến đi từ mặt đất lên vệ tinh rồi xuống mặt đất mất: `2 * 35.786 km / 300.000 km/s ≈ 238 ms` một chiều! Thời gian khứ hồi RTT tối thiểu để nhận gói tin ACK là gần `500 - 600 ms`. Với RTT hơn nửa giây, BDP cực lớn và TCP handshake mất gần 1 giây, tạo cảm giác đơ cứng dù băng thông có rộng bao nhiêu. Ngược lại, vệ tinh LEO ở độ cao chỉ 550 km: thời gian khứ hồi chỉ mất khoảng `4 * 550 km / 300.000 km/s ≈ 7.3 ms` (cộng thêm trạm mặt đất chỉ khoảng 25 - 35 ms RTT), tương đương cáp quang mặt đất, giải quyết triệt để bài toán độ trễ lan truyền!",
      summary: [
        "Băng thông (độ rộng ống) đo lường số bit bơm vào dây trong 1 giây; Độ trễ (chiều dài ống) đo thời gian bit đầu tiên chạy đến đích bị khống chế bởi vận tốc ánh sáng.",
        "Tổng độ trễ gồm 4 thành phần: Lan truyền (D_prop - cố định theo địa lý), Truyền tải (D_trans - tỷ lệ nghịch với băng thông), Hàng đợi (D_queue - nguồn gốc của Jitter), và Xử lý (D_proc).",
        "Tích số Băng thông - Độ trễ (BDP = Bandwidth × RTT) là lượng dữ liệu tối đa bay trên đường dây; nếu TCP Window nhỏ hơn BDP, thông lượng sẽ bị sụt giảm thảm hại dù mạng rất nhanh.",
        "Thảm họa Bufferbloat xảy ra khi router trang bị bộ đệm RAM quá lớn và dùng cơ chế Drop-tail, khiến ping vọt lên hàng ngàn mili-giây khi tải nặng; khắc phục bằng thuật toán fq_codel.",
        "Trên mạng WAN có BDP lớn và có độ trễ cao, cần mở rộng tcp_rmem/tcp_wmem và chuyển sang thuật toán kiểm soát tắc nghẽn Google BBR thay cho TCP CUBIC."
      ],
      nextLessonPreview: "Bài 1.4: Bắt và giải mã gói tin: ping, tcpdump và Wireshark theo từng byte nhị phân — Sử dụng tcpdump -i any -nn -XX, mổ xẻ cấu trúc hex và giải mã từng byte offset của khung ICMP Echo Request/Reply."
    },
    {
      id: "net-1-04",
      number: "1.4",
      title: "Bắt và giải mã gói tin: ping, tcpdump và Wireshark theo từng byte nhị phân",
      subtitle: "Sử dụng tcpdump -i any -nn -XX, mổ xẻ cấu trúc hex và giải mã từng byte offset của khung ICMP Echo Request/Reply",
      level: "Nền tảng",
      duration: "120 phút",
      objectives: [
        "Hiểu cặn kẽ cơ chế bắt gói tin trong Linux Kernel: Socket AF_PACKET, móc nối dev_add_pack, và máy ảo lọc gói Berkeley Packet Filter (BPF).",
        "Mổ xẻ từng byte offset nhị phân của khung ICMP Echo Request và Reply: Ethernet Header (14B), IPv4 Header (20B), và ICMP Header/Payload.",
        "Làm chủ toàn diện các cờ thiết yếu của tcpdump (-i, -nn, -XX, -vvv, -s0, -e, -w, -r) và cú pháp lọc gói tin BPF Filter từ cơ bản đến nâng cao.",
        "Ứng dụng kỹ thuật kết hợp Wireshark và tshark trên máy chủ Linux từ xa qua đường ống SSH Pipe thời gian thực (Zero-GUI Streaming).",
        "Thực hành phòng lab điều tra gói tin độc lập trong Network Namespaces và nắm vững phác đồ phòng tránh thảm họa 'tcpdump làm sập production'."
      ],
      intuition: {
        title: "Chiếc Máy Quét X-Quang Tại Cửa Khẩu & Lăng Kính Soi Từng Nguyên Tử Byte",
        metaphor: "Nếu các tầng mạng là những lớp vỏ bọc kín mít thì công cụ tcpdump và Wireshark chính là chiếc máy quét X-quang y tế đặt ngay tại cổng kiểm soát hải quan của hệ điều hành. Bất kỳ kiện hàng nào (gói tin) vừa chạm bánh xe vào lãnh thổ (card mạng NIC) — dù chưa kịp khai báo thuế hay kiểm tra an ninh (Netfilter/Firewall) — đều bị chiếc máy quét này chụp lại trọn vẹn 100% từng phân tử nhị phân. Bạn không cần phải đoán xem Nginx có nhận được yêu cầu hay không, không cần đoán xem ứng dụng có gửi nhầm cổng hay không. Dưới lăng kính của tcpdump dạng Hex (-XX), mọi bí mật của thế giới mạng đều hiện nguyên hình thành những con số thập lục phân trần trụi: 0x45 mở đầu cho IPv4, 0x01 đại diện cho ICMP, 0x0800 cho Ethernet, và từng ký tự mật khẩu dạng plaintext đều phơi bày rõ ràng trước mắt bạn!",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">🔬</span>
              <span class="net-arch-title">KIẾN TRÚC BẮT GÓI TIN TRONG LINUX KERNEL: AF_PACKET &amp; IN-KERNEL BPF FILTER</span>
            </div>
            <div class="net-arch-layers">
              <div class="net-arch-layer layer-userspace">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">👤 Không Gian Người Dùng: tcpdump / Wireshark / tshark</span>
                  <span class="net-arch-layer-badge">User Space Application</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Tạo Raw Packet Socket:</strong> <code>int fd = socket(AF_PACKET, SOCK_RAW, htons(ETH_P_ALL));</code></div>
                  <div class="net-arch-node"><strong>Biên dịch BPF:</strong> Thư viện <code>libpcap</code> dịch biểu thức lọc (ví dụ <code>'icmp and host 1.1.1.1'</code>) thành chuỗi mã bytecode BPF assembly nạp vào Kernel.</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Nạp bộ lọc BPF qua syscall setsockopt(fd, SOL_SOCKET, SO_ATTACH_FILTER, ...)</div>

              <div class="net-arch-layer layer-netstack">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🧠 Máy Ảo Lọc Gói Tin Trong Kernel (In-Kernel BPF Virtual Machine)</span>
                  <span class="net-arch-layer-badge">Kernel Core Engine</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Móc nối dev_add_pack:</strong> Kernel đăng ký một điểm nghe (Packet Tap) trực tiếp tại tầng thiết bị mạng (Layer 2).</div>
                  <div class="net-arch-node"><strong>Thực thi BPF Bytecode:</strong> Máy ảo BPF duyệt gói tin trong RAM ngắt. Gói nào KHÔNG thỏa mãn bộ lọc bị vứt bỏ ngay tức khắc, chỉ gói thỏa mãn mới được copy lên User Space!</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Vòng đệm bộ nhớ chia sẻ PACKET_MMAP (Zero-Copy Ring Buffer giữa Kernel &amp; User)</div>

              <div class="net-arch-layer layer-hardware">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🔗 Tầng Trình Điều Khiển Card Mạng (Device Driver &amp; netif_receive_skb)</span>
                  <span class="net-arch-layer-badge">Layer 2 Ingress / Egress Point</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Vị trí bắt gói tin:</strong> Gói tin được nhân bản (cloned <code>sk_buff</code>) gửi cho <code>AF_PACKET</code> TRƯỚC KHI Netfilter (iptables) kịp Drop gói ở chiều nhận (Ingress)!</div>
                  <div class="net-arch-node"><strong>Card mạng vật lý / ảo:</strong> Ethernet PHY, Wi-Fi 802.11, veth pair, loopback interface (lo).</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-problem",
          title: "Vấn đề thực tế: Bức Tranh Mù Của Quản Trị Viên & Sức Mạnh Của Khám Nghiệm Nhị Phân",
          content: `
            <p>Trong quá trình vận hành hệ thống mạng và phát triển phần mềm, bạn chắc chắn sẽ nhiều lần rơi vào tình thế bế tắc tuyệt vọng:</p>
            <ul>
              <li>Ứng dụng Web báo lỗi: <em>"Connection refused"</em> hoặc <em>"Upstream timeout"</em>.</li>
              <li>Bạn kiểm tra log của Nginx thì không có dòng nào; log của ứng dụng backend Python/Go cũng trống trơn.</li>
              <li>Nhà cung cấp đám mây khẳng định: <em>"Mạng của chúng tôi hoàn toàn bình thường"</em>. Đội quản trị tường lửa (Firewall) cũng khăng khăng: <em>"Chúng tôi không chặn cổng nào của bạn cả"</em>.</li>
            </ul>
            <p>Ai đang nói dối? Lỗi nằm ở hạ tầng mạng, ở tường lửa hay ở chính mã nguồn của bạn? <strong>Trong mạng máy tính, mọi lời giải thích đều là vô nghĩa nếu không có BẰNG CHỨNG GÓI TIN (PACKET EVIDENCE)</strong>.</p>

            <div class="net-topo-box">
              <div class="net-topo-title">🛡️ BẢN CHẤT CỦA BẮT GÓI TIN: SOCKET AF_PACKET TRONG LINUX KERNEL</div>
              <p>Thông thường, khi bạn viết một chương trình Socket mạng chuẩn (<code>AF_INET</code>), bạn chỉ nhìn thấy dữ liệu sau khi Kernel đã bóc sạch các lớp vỏ bọc L2, L3, L4. Bạn không thể thấy địa chỉ MAC, không thể thấy cờ TCP SYN, và không thể thấy gói tin bị Netfilter chặn.</p>
              <p>Công cụ <code>tcpdump</code> sử dụng một họ Socket đặc biệt của Linux: <strong><code>AF_PACKET</code></strong> (kết hợp với chế độ Promiscuous Mode của card mạng):</p>
              <ul>
                <li>Nó gắn trực tiếp vào hàm <code>dev_add_pack()</code> của tầng điều khiển thiết bị mạng.</li>
                <li>Nó nhân bản một bản sao của cấu trúc <code>struct sk_buff</code> <strong>ngay khi gói tin vừa từ card mạng bước chân vào RAM</strong>, hoàn toàn bỏ qua mọi quy trình phân tầng thông thường.</li>
                <li><strong>Hệ quả quan trọng:</strong> <code>tcpdump</code> nhìn thấy gói tin TRƯỚC KHI tường lửa iptables/nftables xử lý nó ở chiều nhận! Nếu <code>tcpdump</code> thấy gói tin đi vào máy nhưng ứng dụng không nhận được, bạn biết chắc chắn 100% rằng gói tin đã bị Netfilter/Firewall âm thầm tiêu diệt!</li>
              </ul>
            </div>
          `
        },
        {
          id: "sec-mechanism",
          title: "Cơ chế kỹ thuật: Giải Phẫu Từng Byte Nhị Phân Của Khung ICMP Ping",
          content: `
            <p>Để trở thành một chuyên gia mạng thực thụ, bạn phải có khả năng đọc chuỗi Hex thô giống như một bác sĩ đọc phim chụp X-quang. Hãy cùng mổ xẻ một gói tin <strong>ICMP Echo Request</strong> (lệnh ping chuẩn trên Linux) kích thước 98 bytes:</p>

            <div class="net-header-diagram">
              <div class="net-header-title"><span>🧬</span> BẢN ĐỒ OFFSET BYTES CỦA KHUNG ICMP ECHO REQUEST TRÊN ETHERNET</div>
              <table class="net-header-table">
                <thead>
                  <tr>
                    <th style="width:14%;">Vị trí Offset</th>
                    <th style="width:18%;">Tầng &amp; Header</th>
                    <th style="width:28%;">Chuỗi Hexadecimal mẫu</th>
                    <th style="width:40%;">Giải mã cấu trúc chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>0x0000 - 0x0005</code></td>
                    <td class="field-highlight">Ethernet: Destination MAC</td>
                    <td><code>52 54 00 12 34 56</code></td>
                    <td>Địa chỉ MAC của máy nhận hoặc Gateway kế tiếp: <code>52:54:00:12:34:56</code></td>
                  </tr>
                  <tr>
                    <td><code>0x0006 - 0x000b</code></td>
                    <td class="field-highlight">Ethernet: Source MAC</td>
                    <td><code>e8 9c 25 aa bb cc</code></td>
                    <td>Địa chỉ MAC phần cứng của máy gửi: <code>e8:9c:25:aa:bb:cc</code></td>
                  </tr>
                  <tr>
                    <td><code>0x000c - 0x000d</code></td>
                    <td class="field-highlight">Ethernet: EtherType</td>
                    <td><code>08 00</code></td>
                    <td>Định danh giao thức tầng mạng L3: <code>0x0800</code> = IPv4</td>
                  </tr>
                  <tr>
                    <td><code>0x000e</code></td>
                    <td style="color:#38bdf8;font-weight:bold;">IP: Version &amp; IHL</td>
                    <td><code>45</code></td>
                    <td>Nửa byte đầu <code>4</code> = IPv4; Nửa byte sau <code>5</code> = Internet Header Length (5 × 4 = 20 Bytes)</td>
                  </tr>
                  <tr>
                    <td><code>0x000f</code></td>
                    <td style="color:#38bdf8;">IP: ToS / DSCP</td>
                    <td><code>00</code></td>
                    <td>Type of Service / Differentiated Services (Dịch vụ mạng tiêu chuẩn)</td>
                  </tr>
                  <tr>
                    <td><code>0x0010 - 0x0011</code></td>
                    <td style="color:#38bdf8;">IP: Total Length</td>
                    <td><code>00 54</code></td>
                    <td>Tổng độ dài gói tin IP: <code>0x0054</code> = 84 bytes thập phân (20B IP + 64B ICMP)</td>
                  </tr>
                  <tr>
                    <td><code>0x0012 - 0x0013</code></td>
                    <td style="color:#38bdf8;">IP: Identification</td>
                    <td><code>a1 b2</code></td>
                    <td>Mã định danh gói tin dùng cho phân mảnh: <code>0xa1b2</code></td>
                  </tr>
                  <tr>
                    <td><code>0x0014 - 0x0015</code></td>
                    <td style="color:#38bdf8;">IP: Flags &amp; Fragment</td>
                    <td><code>40 00</code></td>
                    <td>Bit cờ <code>0x40</code> = Bật cờ <strong>Don't Fragment (DF)</strong>; Offset = 0</td>
                  </tr>
                  <tr>
                    <td><code>0x0016</code></td>
                    <td style="color:#38bdf8;">IP: TTL</td>
                    <td><code>40</code></td>
                    <td>Time to Live = <code>0x40</code> (64 thập phân — bước nhảy tối đa)</td>
                  </tr>
                  <tr>
                    <td><code>0x0017</code></td>
                    <td style="color:#38bdf8;font-weight:bold;">IP: Protocol</td>
                    <td><code>01</code></td>
                    <td>Mã giao thức tầng trên: <code>0x01</code> = <strong>ICMP</strong> (nếu là <code>0x06</code> là TCP, <code>0x11</code> là UDP)</td>
                  </tr>
                  <tr>
                    <td><code>0x0018 - 0x0019</code></td>
                    <td style="color:#38bdf8;">IP: Header Checksum</td>
                    <td><code>f4 e2</code></td>
                    <td>Mã kiểm tra tính toàn vẹn của IP Header</td>
                  </tr>
                  <tr>
                    <td><code>0x001a - 0x001d</code></td>
                    <td style="color:#38bdf8;font-weight:bold;">IP: Source IP</td>
                    <td><code>c0 a8 01 0a</code></td>
                    <td>IP nguồn: <code>c0</code>=192, <code>a8</code>=168, <code>01</code>=1, <code>0a</code>=10 ➔ <code>192.168.1.10</code></td>
                  </tr>
                  <tr>
                    <td><code>0x001e - 0x0021</code></td>
                    <td style="color:#38bdf8;font-weight:bold;">IP: Destination IP</td>
                    <td><code>08 08 08 08</code></td>
                    <td>IP đích: <code>08</code>.<code>08</code>.<code>08</code>.<code>08</code> ➔ <code>8.8.8.8</code> (Google DNS)</td>
                  </tr>
                  <tr>
                    <td><code>0x0022</code></td>
                    <td style="color:#4ade80;font-weight:bold;">ICMP: Type</td>
                    <td><code>08</code></td>
                    <td>Loại thông điệp: <code>0x08</code> = <strong>Echo (Ping) Request</strong> (Reply sẽ là <code>0x00</code>)</td>
                  </tr>
                  <tr>
                    <td><code>0x0023</code></td>
                    <td style="color:#4ade80;">ICMP: Code</td>
                    <td><code>00</code></td>
                    <td>Mã phụ: Luôn là <code>0x00</code> cho Echo Request/Reply</td>
                  </tr>
                  <tr>
                    <td><code>0x0024 - 0x0025</code></td>
                    <td style="color:#4ade80;">ICMP: Checksum</td>
                    <td><code>4c 2a</code></td>
                    <td>Mã kiểm tra tính toàn vẹn của toàn bộ thông điệp ICMP</td>
                  </tr>
                  <tr>
                    <td><code>0x0026 - 0x0027</code></td>
                    <td style="color:#4ade80;">ICMP: Identifier</td>
                    <td><code>00 01</code></td>
                    <td>Mã định danh tiến trình ping (Process ID)</td>
                  </tr>
                  <tr>
                    <td><code>0x0028 - 0x0029</code></td>
                    <td style="color:#4ade80;">ICMP: Sequence Number</td>
                    <td><code>00 01</code></td>
                    <td>Số thứ tự gói ping: Gói thứ 1 (<code>icmp_seq=1</code>)</td>
                  </tr>
                  <tr>
                    <td><code>0x002a - 0x0031</code></td>
                    <td style="color:#fbbf24;">ICMP: Timestamp</td>
                    <td><code>67 23 89 0a 00 0c 14 02</code></td>
                    <td>8 bytes dấu thời gian ghi lại khoảnh khắc gói tin rời card mạng để tính RTT</td>
                  </tr>
                  <tr>
                    <td><code>0x0032 - 0x0061</code></td>
                    <td style="color:#94a3b8;">ICMP: Payload Pattern</td>
                    <td><code>10 11 12 13 14 15...</code></td>
                    <td>Chuỗi byte mẫu được Kernel Linux chèn thêm vào để lấp đầy 56 bytes payload chuẩn</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style="margin-top:14px;">Khi máy đích nhận được gói tin này, nó tạo gói <strong>Echo Reply</strong> phản hồi với cấu trúc gần như tương đồng 100%, chỉ thay đổi 3 điểm then chốt:</p>
            <ol style="line-height:1.75;padding-left:20px;">
              <li>Đảo ngược Source IP và Destination IP (Source trở thành <code>8.8.8.8</code>, Destination thành <code>192.168.1.10</code>).</li>
              <li>Đảo ngược Source MAC và Destination MAC ở tầng L2.</li>
              <li>Trường <code>ICMP Type</code> đổi từ <code>0x08 (Request)</code> sang <strong><code>0x00 (Reply)</code></strong>, tính toán lại checksum và giữ nguyên chuỗi Timestamp/Payload để máy gửi đo đạc RTT!</li>
            </ol>
          `
        },
        {
          id: "sec-tcpdump-mastery",
          title: "Vũ Khí Thực Chiến: Làm Chủ tcpdump & BPF Filter Assembly",
          content: `
            <p>Để khai thác tối đa sức mạnh của <code>tcpdump</code> mà không làm rác terminal hay làm nghẽn máy chủ, bạn cần làm chủ các cờ tùy chọn sống còn sau:</p>

            <div class="net-matrix-table-wrap">
              <table class="net-matrix-table">
                <thead>
                  <tr>
                    <th>Cờ tùy chọn (Flag)</th>
                    <th>Tên đầy đủ</th>
                    <th>Ý nghĩa bản chất thực chiến</th>
                    <th>Hậu quả nếu QUÊN dùng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>-nn</code></td>
                    <td>No Name / No Port Resolve</td>
                    <td>Không phân giải địa chỉ IP thành tên miền DNS và không dịch cổng số thành tên dịch vụ (hiển thị số thực <code>80</code> thay vì <code>http</code>).</td>
                    <td style="color:var(--danger);font-weight:bold;">Máy chủ bị lag nghiêm trọng do tcpdump liên tục gửi truy vấn DNS đảo cho từng gói tin bắt được!</td>
                  </tr>
                  <tr>
                    <td><code>-XX</code></td>
                    <td>Hex and ASCII with L2</td>
                    <td>In toàn bộ nội dung gói tin dưới cả 2 định dạng: cột số Hexadecimal và cột ký tự ASCII, <strong>bao gồm cả Ethernet Header Layer 2</strong>.</td>
                    <td>Nếu dùng <code>-X</code> bạn sẽ bị mất 14 bytes Ethernet Header L2 (không thấy được địa chỉ MAC).</td>
                  </tr>
                  <tr>
                    <td><code>-i &lt;interface&gt;</code></td>
                    <td>Interface</td>
                    <td>Chỉ định card mạng cần bắt. Có thể dùng <code>-i any</code> để bắt trên toàn bộ các interface của hệ thống cùng lúc.</td>
                    <td>Mặc định bắt trên interface có số thứ tự nhỏ nhất (thường bắt nhầm card không có traffic).</td>
                  </tr>
                  <tr>
                    <td><code>-s 0</code></td>
                    <td>Snapshot Length</td>
                    <td>Bắt trọn vẹn toàn bộ chiều dài gói tin (mặc định tương đương <code>-s 262144</code> bytes), không cắt ngắn.</td>
                    <td>Gói tin bị cắt cụt (truncated), không đọc được payload ứng dụng bên trong.</td>
                  </tr>
                  <tr>
                    <td><code>-w &lt;file.pcap&gt;</code></td>
                    <td>Write to PCAP</td>
                    <td>Ghi dữ liệu thô nhị phân trực tiếp ra tệp tin chuẩn PCAP thay vì in ra màn hình.</td>
                    <td>I/O terminal bị quá tải khi lưu lượng mạng lớn; không thể mở lại bằng Wireshark.</td>
                  </tr>
                  <tr>
                    <td><code>-c &lt;N&gt;</code></td>
                    <td>Count</td>
                    <td>Dừng lệnh bắt gói tin ngay lập tức sau khi đã thu thập đủ <code>N</code> gói tin.</td>
                    <td>Lệnh chạy vô tận, ngốn đầy ổ đĩa nếu ghi file.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style="margin-top:20px;">Nghệ Thuật Lọc Gói Tin: Cú Pháp BPF (Berkeley Packet Filter)</h3>
            <p>Bộ lọc BPF được máy ảo trong Kernel Linux thực thi ở tốc độ nano-giây. Dưới đây là những bộ lọc quyền lực nhất bạn cần nằm lòng:</p>

            <div class="net-topo-box">
              <div class="net-topo-title">🎯 CÚ PHÁP BPF TỪ CƠ BẢN ĐẾN MA THUẬT BITWISE</div>
              <ul>
                <li><strong>Lọc theo địa chỉ và cổng:</strong>
                  <pre class="code-pre" style="margin:4px 0;"><code>sudo tcpdump -i eth0 -nn 'host 192.168.1.50 and port 443'</code></pre>
                </li>
                <li><strong>Bắt toàn bộ lưu lượng web nhưng LOẠI TRỪ cổng SSH của chính bạn:</strong>
                  <pre class="code-pre" style="margin:4px 0;"><code>sudo tcpdump -i eth0 -nn 'port 80 or port 443 and not port 22'</code></pre>
                </li>
                <li><strong>Ma thuật Bitwise: Chỉ bắt gói tin TCP SYN (Khởi tạo kết nối bắt tay 3 bước):</strong>
                  <p style="margin:2px 0;font-size:0.86rem;">Byte thứ 13 của TCP Header chứa các cờ (Flags: FIN=1, SYN=2, RST=4, PSH=8, ACK=16, URG=32). Gói SYN thuần túy có giá trị bằng 2:</p>
                  <pre class="code-pre" style="margin:4px 0;"><code>sudo tcpdump -i eth0 -nn 'tcp[tcpflags] & tcp-syn != 0 and tcp[tcpflags] & tcp-ack == 0'</code></pre>
                </li>
                <li><strong>Ma thuật Bitwise: Chỉ bắt các gói tin TCP RST (Kết nối bị từ chối hoặc bị ngắt đột ngột):</strong>
                  <pre class="code-pre" style="margin:4px 0;"><code>sudo tcpdump -i eth0 -nn 'tcp[tcpflags] & tcp-rst != 0'</code></pre>
                </li>
                <li><strong>Bắt các gói tin HTTP có chứa phương thức GET hoặc POST trong Payload:</strong>
                  <p style="margin:2px 0;font-size:0.86rem;">Chuỗi 'GET ' trong mã ASCII là <code>0x47455420</code>; chuỗi 'POST' là <code>0x504f5354</code>:</p>
                  <pre class="code-pre" style="margin:4px 0;"><code>sudo tcpdump -i eth0 -nn -A 'tcp[((tcp[12:1] & 0xf0) >> 2):4] = 0x47455420 or tcp[((tcp[12:1] & 0xf0) >> 2):4] = 0x504f5354'</code></pre>
                </li>
              </ul>
            </div>
          `
        },
        {
          id: "sec-observe",
          title: "Quan sát trên Linux: Tự Tay Bắt & Giải Mã Khung ICMP Ping Bằng tcpdump",
          content: `
            <p>Hãy cùng mở 2 terminal trên máy Linux và trực tiếp đối chiếu từng dòng output của lệnh bắt gói tin:</p>
          `,
          codeExamples: [
            {
              title: "Bước 1: Khởi chạy tcpdump bắt đúng 1 gói ICMP Request và 1 gói Reply",
              lang: "Bash",
              code: "# Terminal 1: Lắng nghe trên loopback, hiển thị hex và ascii đầy đủ (-XX), dừng sau đúng 2 gói (-c 2)\nsudo tcpdump -i lo -nn -XX 'icmp' -c 2\n\n# Terminal 2: Bắn đúng 1 gói ping sang địa chỉ 127.0.0.1\nping -c 1 127.0.0.1",
              output: "listening on lo, link-type EN10MB (Ethernet), snapshot length 262144 bytes\n09:40:12.891204 IP 127.0.0.1 > 127.0.0.1: ICMP echo request, id 1892, seq 1, length 64\n\t0x0000:  0000 0000 0000 0000 0000 0000 0800 4500  ..............E.\n\t0x0010:  0054 3a12 4000 4001 0289 7f00 0001 7f00  .T:.@.@.........\n\t0x0020:  0001 0800 b891 0764 0001 6724 9b02 000c  .......d..g$....\n\t0x0030:  1a88 0000 0000 0000 0000 1011 1213 1415  ................\n\t0x0040:  1617 1819 1a1b 1c1d 1e1f 2021 2223 2425  ..........!\"#$% \n\t0x0050:  2627 2829 2a2b 2c2d 2e2f 3031 3233 3435  &'()*+,-./012345\n\t0x0060:  3637                                     67\n09:40:12.891220 IP 127.0.0.1 > 127.0.0.1: ICMP echo reply, id 1892, seq 1, length 64\n\t0x0000:  0000 0000 0000 0000 0000 0000 0800 4500  ..............E.\n\t0x0010:  0054 3a13 4000 4001 0288 7f00 0001 7f00  .T:.@.@.........\n\t0x0020:  0001 0000 c091 0764 0001 6724 9b02 000c  .......d..g$....\n\t0x0030:  1a88 0000 0000 0000 0000 1011 1213 1415  ................\n\t0x0040:  1617 1819 1a1b 1c1d 1e1f 2021 2223 2425  ..........!\"#$% \n\t0x0050:  2627 2829 2a2b 2c2d 2e2f 3031 3233 3435  &'()*+,-./012345\n\t0x0050:  3637                                     67",
              annotations: [
                { line: 2, text: "Gói tin 1: Echo Request từ 127.0.0.1 sang 127.0.0.1, mã id=1892, seq=1, chiều dài IP payload là 64 bytes." },
                { line: 5, text: "Tại dòng 0x0020 byte thứ 3-4 là '0800': 08 chính là ICMP Type 8 (Echo Request), 00 là Code 0!" },
                { line: 8, text: "Tại dòng 0x0040 đến 0x0060 cột phải: Chuỗi byte mẫu hiển thị rõ các ký tự ASCII !\"#$%&'()*+,-./01234567." },
                { line: 10, text: "Gói tin 2: Echo Reply phản hồi chỉ sau 16 micro-giây (09:40:12.891220)." },
                { line: 13, text: "Tại dòng 0x0020 của gói Reply: '0000' -> 00 chính là ICMP Type 0 (Echo Reply), chứng minh sự đối ứng hoàn hảo!" }
              ]
            },
            {
              title: "Bước 2: Tuyệt kỹ Streaming gói tin từ máy chủ từ xa về Wireshark cục bộ qua SSH Pipe",
              lang: "Bash",
              code: "# Chạy lệnh này trên máy trạm của bạn (đã cài Wireshark) để xem trực tiếp traffic của Server:\nssh root@server.company.com \"tcpdump -U -s0 -w - 'not port 22' -i eth0\" | wireshark -k -i -",
              output: "Wireshark GUI cục bộ tự động bật lên và cuộn các dòng gói tin thời gian thực!",
              annotations: [
                { line: 2, text: "Cờ -U (Packet-buffered): Đẩy từng gói tin vào stdout ngay lập tức, không đợi đầy bộ đệm buffer." },
                { line: 2, text: "Cờ -w -: Ghi trực tiếp định dạng nhị phân PCAP ra luồng tiêu chuẩn stdout thay vì lưu ra file." },
                { line: 2, text: "Cờ 'not port 22': CỰC KỲ QUAN TRỌNG! Loại trừ chính phiên SSH này để tránh tạo bão vòng lặp." },
                { line: 2, text: "Dấu pipe | wireshark -k -i -: Wireshark nhận luồng stdin (-) và bắt đầu phân tích đồ họa ngay tức khắc (-k)." }
              ]
            }
          ]
        },
        {
          id: "sec-lab",
          title: "Phòng Lab thực hành: Mổ Xẻ Gói Tin Nhị Phân & Điều Tra Mật Khẩu Plaintext",
          content: `
            <div class="net-topo-box">
              <div class="net-topo-title">🧪 PHÒNG LAB THỰC HÀNH 1.4: BẮT QUẢ TANG THÔNG TIN NHẠY CẢM QUA TCPDUMP PCAP</div>
              <p><strong>Mục tiêu:</strong> Tự tay thiết lập môi trường mạng cô lập bằng Network Namespaces, khởi chạy một dịch vụ truyền dữ liệu không mã hóa, sử dụng <code>tcpdump</code> ghi lại file PCAP, và dùng các bộ lọc nhị phân để trích xuất chính xác thông tin đăng nhập mà người dùng đã gửi.</p>
              <p><strong>Môi trường &amp; Công cụ:</strong> Mọi máy Linux (Ubuntu/Debian). Công cụ: <code>ip</code>, <code>nc</code>, <code>tcpdump</code>, <code>grep</code>.</p>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Khởi tạo Topo mạng ảo Client - Server độc lập</h4>
              </div>
              <p class="net-step-desc">Tạo 2 namespace <code>ns-web</code> và <code>ns-user</code> kết nối qua cặp cáp ảo <code>veth</code> dải mạng <code>172.16.1.0/24</code>:</p>
              <pre class="code-pre"><code>sudo ip netns add ns-web
sudo ip netns add ns-user
sudo ip link add veth-w type veth peer name veth-u
sudo ip link set veth-w netns ns-web
sudo ip link set veth-u netns ns-user

sudo ip netns exec ns-web ip addr add 172.16.1.10/24 dev veth-w
sudo ip netns exec ns-web ip link set veth-w up
sudo ip netns exec ns-web ip link set lo up

sudo ip netns exec ns-user ip addr add 172.16.1.20/24 dev veth-u
sudo ip netns exec ns-user ip link set veth-u up
sudo ip netns exec ns-user ip link set lo up</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Kiểm tra thông mạng:</strong> Chạy <code>sudo ip netns exec ns-user ping -c 1 172.16.1.10</code> xác nhận <code>0% packet loss</code>.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 2</span>
                <h4 class="net-step-title">Thiết lập tiến trình bắt gói tin ngầm ra file PCAP trên Web Server</h4>
              </div>
              <p class="net-step-desc">Bắt đầu lắng nghe toàn bộ lưu lượng cổng 8080 trên card mạng <code>veth-w</code> và ghi ra tệp <code>/tmp/traffic.pcap</code>:</p>
              <pre class="code-pre"><code>sudo ip netns exec ns-web tcpdump -i veth-w -nn -s0 -w /tmp/traffic.pcap 'tcp port 8080' &amp;
DUMP_PID=$!
echo "tcpdump đang chạy nền với PID: $DUMP_PID"</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Biến <code>$DUMP_PID</code> in ra số nguyên dương và tiến trình tcpdump đang sẵn sàng hứng gói tin.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 3</span>
                <h4 class="net-step-title">Mô phỏng Web Server và Người dùng gửi thông tin nhạy cảm</h4>
              </div>
              <p class="net-step-desc">Khởi động server netcat tại <code>ns-web</code> và gửi một thông điệp đăng nhập giả lập từ <code>ns-user</code>:</p>
              <pre class="code-pre"><code># Khởi động dịch vụ nghe cổng 8080 trong ns-web
sudo ip netns exec ns-web nc -l -p 8080 > /dev/null &amp;
SERVER_PID=$!

# Người dùng gửi thông điệp đăng nhập HTTP POST chứa mật khẩu dạng Plaintext
sudo ip netns exec ns-user bash -c 'echo -e "POST /login HTTP/1.1\\r\\nHost: api.company.com\\r\\n\\r\\nuser=admin&pass=SecretP@ssw0rd2026" | nc -w 1 172.16.1.10 8080'</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Hoàn thành truyền dữ liệu:</strong> Thông điệp đã được gửi thành công qua sợi cáp ảo.</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 4</span>
                <h4 class="net-step-title">Dừng tcpdump và Khám nghiệm tệp PCAP theo từng byte Hex</h4>
              </div>
              <p class="net-step-desc">Dừng tiến trình tcpdump và đọc lại tệp PCAP bằng các cờ hiển thị phân tích chuyên sâu:</p>
              <pre class="code-pre"><code># Dừng tcpdump và netcat server
sudo kill -2 $DUMP_PID $SERVER_PID 2>/dev/null
sleep 1

# Đọc lại tệp PCAP và lọc tìm gói tin chứa mật khẩu
sudo tcpdump -r /tmp/traffic.pcap -nn -XX 'tcp and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:1]&0xf0)>>2)) > 0)'</code></pre>
              <p class="net-step-desc" style="margin-top:8px;">Quan sát kết quả bóc tách nhị phân:</p>
              <pre class="code-pre"><code>0x0030:  504f 5354 202f 6c6f 6769 6e20 4854 5450  POST./login.HTTP
0x0040:  2f31 2e31 0d0a 486f 7374 3a20 6170 692e  /1.1..Host:.api.
...
0x0070:  7573 6572 3d61 646d 696e 2670 6173 733d  user=admin&pass=
0x0080:  5365 6372 6574 5040 7373 7730 7264 3230  SecretP@ssw0rd20
0x0090:  3236                                     26</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Bằng chứng không thể chối cãi:</strong> Toàn bộ chuỗi tài khoản và mật khẩu <code>user=admin&pass=SecretP@ssw0rd2026</code> hiển thị rõ mồn một! Bạn vừa tận mắt chứng kiến lý do tại sao toàn bộ thế giới bắt buộc phải chuyển sang giao thức mã hóa HTTPS/TLS!</span>
              </div>
            </div>

            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 5</span>
                <h4 class="net-step-title">Dọn dẹp môi trường Lab và xóa tệp PCAP</h4>
              </div>
              <p class="net-step-desc">Thu hồi toàn bộ tài nguyên lab:</p>
              <pre class="code-pre"><code>sudo ip netns del ns-web
sudo ip netns del ns-user
sudo rm -f /tmp/traffic.pcap</code></pre>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Hệ thống sạch sẽ:</strong> Không để lại bất kỳ file rác nào trên máy chủ của bạn!</span>
              </div>
            </div>
          `
        },
        {
          id: "sec-production",
          title: "Môi trường Production & Ca sự cố: Bệnh án 'Chạy tcpdump Sai Cách Làm Sập Cả Cụm Máy Chủ 10Gbps'",
          content: `
            <div class="net-postmortem-card">
              <div class="net-postmortem-header">
                <span class="net-postmortem-badge">SRE POST-MORTEM</span>
                <span class="net-postmortem-title">Hồ Sơ Sự Cố: Kỹ Sư Trực Ban Gõ tcpdump Chẩn Đoán Lỗi Khiến Máy Chủ Bị Treo Cứng Toàn Diện</span>
              </div>
              <div class="net-postmortem-body">
                <p><strong>🚨 Bối cảnh sự cố:</strong> Một cụm máy chủ Cổng thanh toán (Payment Gateway) đang xử lý khoảng 120.000 gói tin/giây (băng thông ~3 Gbps). Kỹ sư trực ban nhận được thông báo có một khách hàng bị lỗi thanh toán. Để điều tra xem request của khách hàng có đến máy chủ hay không, kỹ sư SSH vào một node production và gõ câu lệnh ngây thơ sau:</p>
                <div class="net-log-terminal">$ sudo tcpdump -i eth0</div>

                <p style="margin-top:12px;"><strong>💥 Hậu quả tức thì:</strong></p>
                <ul>
                  <li>Màn hình terminal của kỹ sư lập tức bị đóng băng cứng đơ (Frozen). Kỹ sư nhấn <code>Ctrl + C</code> trong tuyệt vọng nhưng terminal hoàn toàn không phản hồi.</li>
                  <li>Chỉ 10 giây sau, toàn bộ các phiên SSH khác vào máy chủ bị ngắt kết nối (Broken pipe).</li>
                  <li>Hệ thống giám sát Datadog báo động đỏ: CPU của máy chủ nhảy vọt từ 20% lên <strong>100%</strong>, tỷ lệ rớt gói tin của card mạng tăng vọt lên hàng chục triệu gói, và cụm máy chủ bị gạt ra khỏi Load Balancer vì trượt Healthcheck!</li>
                </ul>

                <p><strong>🔍 Phân tích nguyên nhân gốc rễ (Root Cause Analysis - RCA):</strong></p>
                <ol style="margin:6px 0 0 18px;line-height:1.7;">
                  <li>
                    <strong>Tội đồ 1: Không dùng cờ <code>-nn</code> (Thảm họa Reverse DNS Loop):</strong>
                    Mặc định nếu không có cờ <code>-n</code>, <code>tcpdump</code> sẽ cố gắng gửi một truy vấn DNS đảo (Reverse DNS PTR Lookup) cho <em>MỖI GÓI TIN</em> mà nó bắt được để tìm tên miền tương ứng. Với 120.000 gói tin/giây, <code>tcpdump</code> đã tự mình sinh ra thêm <strong>120.000 truy vấn DNS mỗi giây</strong>! Cụm DNS Server nội bộ bị quá tải sụp đổ ngay lập tức, khiến toàn bộ tiến trình của hệ điều hành bị nghẽn (hang) trong các lời gọi hàm <code>getnameinfo()</code>.
                  </li>
                  <li>
                    <strong>Tội đồ 2: Cơn bão phản hồi SSH (Self-Monitoring Feedback Loop):</strong>
                    Kỹ sư đang SSH vào máy chủ qua cổng 22. Khi <code>tcpdump</code> bắt 1 gói tin, nó in ra terminal một dòng text. Dòng text đó được gửi về máy kỹ sư qua kết nối SSH (cổng 22). Nhưng <code>tcpdump</code> lại bắt tiếp chính gói tin SSH vừa phát sinh đó, lại in ra thêm 1 dòng text nữa, lại sinh ra gói SSH mới! Một <strong>vòng lặp phản hồi vô tận (Infinite Feedback Loop)</strong> bùng nổ, nhân bản lưu lượng mạng lên cấp số nhân chỉ trong vài giây!
                  </li>
                  <li>
                    <strong>Tội đồ 3: Nghẽn cổ chai TTY / Stdout:</strong>
                    Tốc độ render ký tự ra màn hình terminal chỉ đạt tối đa vài ngàn dòng/giây. Việc ép in 120.000 dòng/giây khiến tiến trình bị nghẽn I/O (I/O Blocking), bộ đệm của <code>AF_PACKET</code> đầy tràn, dẫn tới Kernel phải DROP hàng chục triệu gói tin nghiệp vụ thực tế của khách hàng!
                  </li>
                </ol>

                <p style="margin-top:14px;"><strong>💊 4 Điều Luật Thép Khi Sử Dụng tcpdump Trên Môi Trường Production:</strong></p>
                <ol class="net-treatment-list">
                  <li>
                    <strong>ĐIỀU LUẬT 1: LUÔN LUÔN CÓ CỜ <code>-nn</code>:</strong>
                    <p style="margin:2px 0;font-size:0.86rem;">Tuyệt đối không bao giờ để tcpdump phân giải DNS hoặc cổng dịch vụ trên máy chủ production.</p>
                  </li>
                  <li>
                    <strong>ĐIỀU LUẬT 2: LUÔN LOẠI TRỪ CỔNG SSH CỦA BẠN:</strong>
                    <p style="margin:2px 0;font-size:0.86rem;">Bắt buộc phải thêm mệnh đề lọc: <code>not port 22</code> (hoặc cổng SSH tùy chỉnh của máy chủ) để dập tắt vĩnh viễn vòng lặp tự phản hồi.</p>
                  </li>
                  <li>
                    <strong>ĐIỀU LUẬT 3: LUÔN DÙNG CỜ GIỚI HẠN SỐ LƯỢNG <code>-c &lt;N&gt;</code> HOẶC GHI RA FILE:</strong>
                    <p style="margin:2px 0;font-size:0.86rem;">Chỉ bắt đúng số lượng mẫu cần xem (ví dụ <code>-c 100</code>) hoặc ghi thẳng nhị phân ra đĩa bằng <code>-w /tmp/capture.pcap</code>, tuyệt đối không in tràn lan ra màn hình terminal.</p>
                  </li>
                  <li>
                    <strong>CÂU LỆNH CHUẨN MỰC AN TOÀN TRÊN PRODUCTION:</strong>
                    <pre class="code-pre" style="margin:6px 0;"><code>sudo tcpdump -i eth0 -nn -c 100 'host 10.20.1.50 and not port 22'</code></pre>
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
            title: "Cạm bẫy 'tcpdump không thấy nghĩa là mạng không nhận được'",
            content: "Nhớ rằng `tcpdump` sử dụng socket `AF_PACKET` gắn vào tầng driver L2. Ở chiều nhận (Ingress), `tcpdump` nhìn thấy gói tin TRƯỚC KHI Netfilter (iptables) can thiệp. Nếu `tcpdump` thấy gói tin đến nhưng ứng dụng không nhận được, chắc chắn gói tin đã bị iptables/nftables drop. Ngược lại ở chiều gửi (Egress), `tcpdump` nhìn thấy gói tin SAU KHI Netfilter xử lý: nếu iptables drop gói tin ở bảng OUTPUT, `tcpdump` sẽ HOÀN TOÀN KHÔNG nhìn thấy gói tin đó!"
          },
          {
            title: "Quên cờ -s0 khiến gói tin bị cắt cụt (Packet Truncated)",
            content: "Trên một số bản phân phối Linux cũ, mặc định `tcpdump` chỉ bắt 68 hoặc 96 bytes đầu tiên của gói tin (đủ cho header). Khi bạn cần xem dữ liệu ứng dụng hoặc payload HTTP/DNS bên trong, gói tin sẽ bị thông báo `[|http]` hoặc `[packet truncated]`. Luôn thêm cờ `-s 0` để bắt trọn vẹn toàn bộ gói tin."
          }
        ],
        tips: [
          {
            title: "Chế độ yên lặng (Quiet Mode) để lọc nhanh danh sách IP kết nối",
            content: "Thêm cờ `-q` kết hợp với `awk`: `sudo tcpdump -i eth0 -nn -q -c 50 'tcp' | awk '{print $3}'` để trích xuất nhanh danh sách các IP nguồn đang gửi traffic tới máy chủ của bạn trong nháy mắt."
          },
          {
            title: "Đọc file PCAP nhanh như chớp với tshark không cần giao diện đồ họa",
            content: "Sử dụng công cụ `tshark` (Wireshark CLI): `tshark -r capture.pcap -Y 'http.request' -T fields -e ip.src -e http.request.method -e http.request.uri` để lọc ra danh sách toàn bộ URL được request trong file capture mà không cần mở giao diện đồ họa!"
          }
        ]
      },
      exercises: [
        {
          level: "Dễ",
          title: "Bắt đúng 5 gói tin DNS Query (Port 53 UDP) không phân giải tên",
          problem: "Hãy viết một câu lệnh `tcpdump` duy nhất thực hiện các yêu cầu sau:\n1. Lắng nghe trên mọi card mạng (`any`).\n2. Tắt hoàn toàn việc phân giải tên miền và cổng dịch vụ (`-nn`).\n3. Chỉ bắt các gói tin giao thức UDP trên cổng 53.\n4. Tự động dừng lệnh sau khi đã bắt đủ đúng 5 gói tin.",
          hint: "Sử dụng cờ `-i any`, `-nn`, bộ lọc BPF `udp port 53`, và cờ giới hạn số lượng `-c 5`.",
          solutionCode: "sudo tcpdump -i any -nn -c 5 'udp port 53'",
          solutionOutput: "listening on any, link-type LINUX_SLL2 (Linux cooked v2), snapshot length 262144 bytes\n10:15:20.102145 eth0  IP 192.168.1.15.54120 > 1.1.1.1.53: 1245+ A? google.com. (28)\n10:15:20.115420 eth0  IP 1.1.1.1.53 > 192.168.1.15.54120: 1245 1/0/0 A 142.250.190.46 (44)\n5 packets captured\n5 packets received by filter\n0 packets dropped by kernel",
          explanation: "Cờ `-nn` ngăn chặn tcpdump gửi thêm các truy vấn DNS đảo lặp vô tận. Bộ lọc `'udp port 53'` chỉ chọn lọc các gói tin phân giải tên miền. Cờ `-c 5` đảm bảo lệnh tự động thoát an toàn sau 5 gói tin mà không cần người dùng nhấn Ctrl+C."
        },
        {
          level: "Vừa",
          title: "Giải mã cấu trúc 8 bytes ICMP Echo Request từ chuỗi Hex thô",
          problem: "Cho 8 bytes nhị phân sau đây trích xuất từ phần bắt đầu của ICMP Header (ngay sau IP Header 20 bytes):\n\n`08 00 a4 f2 1b 34 00 05`\n\nHãy giải mã chi tiết:\n1. Đây là thông điệp ICMP gì (Type & Code)?\n2. Mã kiểm tra tính toàn vẹn (Checksum) là bao nhiêu?\n3. Mã Identifier của tiến trình gửi là bao nhiêu (dạng hex và thập phân)?\n4. Số thứ tự gói tin (Sequence Number) là bao nhiêu?",
          hint: "ICMP Header tuân theo chuẩn RFC 792: Byte 0 là Type, Byte 1 là Code, Byte 2-3 là Checksum, Byte 4-5 là Identifier, Byte 6-7 là Sequence Number.",
          solutionCode: "# Phân tách theo từng trường:\n# Byte 0:     08       -> ICMP Type = 8 (Echo Request / Ping)\n# Byte 1:     00       -> ICMP Code = 0\n# Byte 2..3:  a4 f2    -> Checksum = 0xa4f2\n# Byte 4..5:  1b 34    -> Identifier = 0x1b34 (Thập phân: 6964)\n# Byte 6..7:  00 05    -> Sequence Number = 0x0005 (Gói số 5 / icmp_seq=5)\n\necho \"Loại thông điệp: ICMP Echo Request (Type 8, Code 0)\"\necho \"Checksum: 0xa4f2\"\necho \"Identifier: 0x1b34 (PID: 6964)\"\necho \"Sequence Number: 5\"",
          solutionOutput: "Loại thông điệp: ICMP Echo Request (Type 8, Code 0)\nChecksum: 0xa4f2\nIdentifier: 0x1b34 (PID: 6964)\nSequence Number: 5",
          explanation: "Cấu trúc 8 bytes ICMP Header là chuẩn mực cố định cho mọi gói tin ping trên toàn cầu. Nhờ trường Identifier (PID của tiến trình ping) và Sequence Number (số thứ tự 5), tiến trình ping có thể phân biệt chính xác gói tin phản hồi của mình ngay cả khi trên máy chủ đang có hàng chục tiến trình ping cùng chạy đồng thời."
        },
        {
          level: "Thử thách",
          title: "Viết bộ lọc BPF Bitwise bắt chính xác gói TCP SYN đầu tiên mà không dùng từ khóa",
          problem: "Trong giao thức TCP, cờ điều khiển nằm ở byte thứ 13 của TCP Header (tính từ offset 0). Hãy viết biểu thức lọc BPF sử dụng toán tử trích xuất byte `tcp[offset:length]` và toán tử bitwise AND (`&`) để bắt chính xác các gói tin có cờ SYN bật (`SYN = 1`, giá trị bit thứ 2 là `0x02`) nhưng cờ ACK tắt (`ACK = 0`, giá trị bit thứ 4 là `0x10`).",
          hint: "Byte thứ 13 của TCP Header được truy xuất bằng `tcp[13]`. Kiểm tra xem bit 0x02 có bật và bit 0x10 có tắt hay không: `tcp[13] & 0x12 == 0x02` (vì 0x02 | 0x10 = 0x12).",
          solutionCode: "# Biểu thức BPF Bitwise thuần túy:\nsudo tcpdump -i eth0 -nn 'tcp[13] & 0x12 == 2'\n\n# Hoặc cách viết tương đương bằng tên cờ chuẩn:\nsudo tcpdump -i eth0 -nn 'tcp[tcpflags] & (tcp-syn|tcp-ack) == tcp-syn'",
          solutionOutput: "10:30:00.104250 IP 192.168.1.10.45120 > 93.184.216.34.80: Flags [S], seq 3410294120, win 64240, options [mss 1460,sackOK,TS val 12901 ecr 0,nop,wscale 7], length 0",
          explanation: "Toán tử `tcp[13] & 0x12` kiểm tra đồng thời cả 2 cờ SYN (bit 2) và ACK (bit 4). Nếu kết quả đúng bằng 2 (`0x02`), điều này chứng minh cờ SYN đang bật và cờ ACK đang tắt. Đây chính là chữ ký nhận diện duy nhất của gói tin TCP SYN đầu tiên trong quá trình bắt tay 3 bước, là vũ khí tối thượng để phát hiện các cuộc tấn công SYN Flood."
        }
      ],
      reflectionQuestion: "Tại sao việc bắt gói tin (Packet Sniffing) bằng tcpdump lại đòi hỏi quyền root hoặc năng lực Linux CAP_NET_RAW / CAP_NET_ADMIN? Nếu một ứng dụng của bên thứ ba không có quyền root mà vẫn có thể tùy tiện mở socket AF_PACKET trong hệ thống, những thảm họa bảo mật kinh hoàng nào sẽ xảy ra?",
      reflectionHint: "Hãy phân tích về mặt an ninh mạng: Socket AF_PACKET cho phép tiến trình đọc bản sao nguyên vẹn của MỌI khung dữ liệu đi qua card mạng, bao gồm mật khẩu HTTP Basic Auth, mã token JWT, thông điệp cookie của người dùng khác, và cả các gói tin nội bộ của các container Docker khác trên cùng máy chủ! Hơn thế nữa, SOCK_RAW cho phép tiến trình tự tạo và bắn ra các gói tin giả mạo IP nguồn (IP Spoofing) hoặc giả mạo địa chỉ MAC (ARP Poisoning). Vì vậy, Linux Kernel bắt buộc phải khóa chặt quyền này dưới quyền quản trị viên tối cao (root) hoặc năng lực đặc quyền `CAP_NET_RAW` để ngăn chặn kẻ xấu biến máy chủ thành ổ nghe lén mạng nội bộ.",
      summary: [
        "tcpdump sử dụng socket AF_PACKET gắn trực tiếp vào hàm dev_add_pack của Kernel, bắt trọn gói tin trước khi Netfilter (iptables) kịp xử lý ở chiều nhận.",
        "Khung ICMP Ping gồm 14B Ethernet Header (0x0800), 20B IP Header (0x45 mở đầu, Protocol 0x01), và 8B ICMP Header (Type 8 cho Request, Type 0 cho Reply).",
        "Luôn luôn sử dụng cờ -nn (tắt DNS lookup) và loại trừ cổng SSH ('not port 22') khi chạy tcpdump trên môi trường production để tránh thảm họa treo đơ máy chủ.",
        "Bộ lọc BPF (Berkeley Packet Filter) được biên dịch thành bytecode và thực thi trực tiếp trong Kernel Space, giúp lọc bỏ gói tin ở tốc độ nano-giây trước khi đẩy lên User Space.",
        "Kỹ thuật SSH Pipe (tcpdump -w - | wireshark -k -i -) cho phép truyền trực tiếp luồng gói tin nhị phân từ máy chủ đám mây không GUI về giao diện Wireshark trên máy cá nhân theo thời gian thực."
      ],
      nextLessonPreview: "Giai đoạn 2 (Phase 2): Tầng Liên Kết Dữ Liệu (L2) — Bắt đầu bằng Bài 2.1: Khung Ethernet & Địa chỉ MAC: Giao tiếp trong Miền Broadcast (Preamble, SFD, Unicast/Multicast/Broadcast, và kiểm tra lỗi FCS CRC32)."
    }
  ]
};
