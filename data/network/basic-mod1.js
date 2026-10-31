/**
 * Chuyên đề Mạng máy tính (Networking)
 * HỌC PHẦN I: NETWORKING CƠ BẢN (Dành cho người mới bắt đầu)
 * MODULE 1: Mô hình phân tầng: OSI và TCP/IP, đóng gói dữ liệu (Encapsulation)
 */

window.NET_BASIC_MOD1_DATA = {
  courseId: "course-net-hp1",
  courseNumber: "Học phần I",
  courseTitle: "Networking Cơ Bản",
  id: "part-net-b-1",
  number: "Module 1",
  title: "Mô hình Phân tầng OSI & TCP/IP",
  level: "Cơ bản",
  badge: "Mod 1",
  icon: "🥞",
  description: "Triết lý chia để trị, kiến trúc phân tầng mạng, mô hình tham chiếu OSI 7 tầng, mô hình Internet TCP/IP 4 tầng và quy trình đóng gói dữ liệu (Encapsulation).",
  lessons: [
    {
      id: "net-b-1-01",
      number: "1.1",
      title: "Triết lý phân tầng: Tại sao thế giới mạng phải \"Chia để trị\"?",
      subtitle: "Hiểu vì sao mạng máy tính không thể thiết kế nguyên khối (monolithic), nguyên lý 'Chia để trị' (Divide and Conquer), tính độc lập giữa các tầng và mô hình dịch vụ SAP",
      level: "Cơ bản",
      duration: "45 phút",
      objectives: [
        "Giải thích được vì sao kiến trúc nguyên khối (Monolithic Architecture) thất bại thảm hại khi mở rộng quy mô mạng và phát triển ứng dụng mới.",
        "Nắm vững nguyên lý 'Chia để trị' (Divide and Conquer): Mỗi tầng giải quyết một bài toán duy nhất, đóng gói tri thức và độc lập với các tầng khác.",
        "Phân tích được khái niệm Tính độc lập giữa các tầng (Layer Independence): Thay đổi công nghệ ở tầng dưới (cáp đồng sang Wi-Fi hay cáp quang) không làm ảnh hưởng tầng trên (HTTP, trình duyệt Web).",
        "Phân biệt rạch ròi Mô hình Dịch vụ: Tầng cung cấp dịch vụ (Service Provider), Tầng sử dụng dịch vụ (Service User) và Điểm truy cập dịch vụ (Service Access Point - SAP / Interface).",
        "Thực hành kiểm chứng tính độc lập của card mạng (Network Interface) và cấu hình IP trên cả Windows và Linux."
      ],
      intuition: {
        title: "Dây Chuyền Lắp Ráp Xe Hơi & Cơ Cấu Phòng Ban Xuất Nhập Khẩu",
        metaphor: "Hãy tưởng tượng một xưởng sản xuất ô tô mà chỉ có đúng một người thợ làm tất cả mọi việc: từ đào quặng luyện thép, tiện ốc vít, quấn dây đồng động cơ, lập trình vi mạch điều khiển (ECU), đến may da ghế và pha sơn vỏ. Khi khách hàng muốn đổi từ sơn bóng sang sơn nhám, cả xưởng phải dừng hoạt động vì người thợ phải đi học lại hóa học pha sơn! Ngược lại, nền công nghiệp hiện đại tổ chức thành các xưởng phân tầng chuyên biệt: xưởng khung gầm, xưởng động cơ, xưởng nội thất và xưởng sơn. Mỗi xưởng chỉ cần tuân thủ chuẩn khớp nối (interface): ốc vít 10mm bắt vừa khung xe. Khi xưởng động cơ chuyển từ máy xăng sang động cơ điện, xưởng may ghế da không cần phải thay đổi bất kỳ sợi chỉ nào! Mạng máy tính toàn cầu cũng chính xác như vậy: việc chia nhỏ thành các tầng giúp mỗi công nghệ chuyên môn hóa tối đa mà không can thiệp vào tầng khác.",
        boundary: "Điểm phép ẩn dụ này không còn đúng: Trong nhà máy vật lý, nếu xưởng đúc ốc vít bị chậm 1 phút, toàn bộ dây chuyền lắp ráp phía sau sẽ tắc nghẽn và dừng máy hoàn toàn (khóa đồng bộ). Trong mạng máy tính, các tầng giao tiếp lỏng lẻo (loose coupling) thông qua các gói tin số và vùng đệm bộ nhớ (buffers); nếu tầng vật lý bị đứt cáp hoặc nhiễu sóng, tầng mạng có thể tự động chuyển hướng đường truyền (reroute), hoặc tầng giao vận tự động gửi lại gói tin (retransmit) mà tầng ứng dụng của người dùng không hề bị dừng hay sập chương trình.",
        visualHtml: `
          <div class="net-arch-box">
            <div class="net-arch-header">
              <span class="net-arch-icon">🥞</span>
              <span class="net-arch-title">SƠ ĐỒ PHÂN CHIA TRÁCH NHIỆM: BỐN BÀI TOÁN CỐT LÕI TRONG TRUYỀN THÔNG MẠNG</span>
            </div>
            <div class="net-arch-layers">
              <!-- Tầng Ứng Dụng -->
              <div class="net-arch-layer layer-app">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🌐 1. Tầng Ứng Dụng (Application Layer)</span>
                  <span class="net-arch-layer-badge">PDU: Data (Nghiệp Vụ)</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Trình duyệt Web (Chrome/Firefox):</strong> Tạo yêu cầu <code>GET /index.html</code> (HTTP/HTTPS)</div>
                  <div class="net-arch-node"><strong>Email / Chat Client:</strong> Định dạng văn bản, hình ảnh, mã hóa thông điệp người dùng</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Tầng trên chuyển giao dữ liệu xuống qua Socket / Port (Giao tiếp nội bộ)</div>

              <!-- Tầng Giao Vận -->
              <div class="net-arch-layer layer-transport">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">📦 2. Tầng Giao Vận (Transport Layer)</span>
                  <span class="net-arch-layer-badge">PDU: Segment / Datagram</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>TCP (Truyền tin cậy):</strong> Cắt dữ liệu thành mảnh nhỏ, đánh số thứ tự (Sequence Number), quản lý báo nhận (ACK)</div>
                  <div class="net-arch-node"><strong>UDP (Truyền tốc độ cao):</strong> Bắn gói tin liên tục cho Livestream, Game không cần chờ ACK</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Gắn thêm IP nguồn &amp; IP đích để chuẩn bị tìm đường đi xuyên Internet</div>

              <!-- Tầng Mạng -->
              <div class="net-arch-layer layer-network">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">🧭 3. Tầng Mạng &amp; Định Tuyến (Network / Internet Layer)</span>
                  <span class="net-arch-layer-badge">PDU: Packet</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Địa chỉ IP Logic:</strong> Xác định danh tính thiết bị nguồn (192.168.1.5) và máy chủ đích (142.250.204.46)</div>
                  <div class="net-arch-node"><strong>Bộ định tuyến (Router):</strong> Quyết định gói tin rẽ trái hay rẽ phải qua các ngã rẽ mạng toàn cầu</div>
                </div>
              </div>

              <div class="net-arch-arrow">⬇️ Đưa gói tin xuống phần cứng card mạng, gán địa chỉ MAC trạm kế tiếp</div>

              <!-- Tầng Truy Cập Mạng & Vật Lý -->
              <div class="net-arch-layer layer-physical">
                <div class="net-arch-layer-header">
                  <span class="net-arch-layer-name">⚡ 4. Tầng Liên Kết &amp; Truyền Dẫn Vật Lý (Data Link &amp; Physical)</span>
                  <span class="net-arch-layer-badge">PDU: Frame &amp; Bits</span>
                </div>
                <div class="net-arch-nodes">
                  <div class="net-arch-node"><strong>Card mạng (NIC) &amp; MAC:</strong> Kiểm tra tính toàn vẹn dữ liệu bằng mã CRC/FCS</div>
                  <div class="net-arch-node"><strong>Môi trường truyền dẫn:</strong> Biến đổi bit 0 và 1 thành xung điện áp, sóng Wi-Fi hoặc xung ánh sáng cáp quang</div>
                </div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: "sec-monolithic-problem",
          title: "1. Bế tắc thời kỳ đầu: Cơn ác mộng 'Mạng Nguyên Khối' (Monolithic)",
          content: `
            <p>Vào những năm 1960–1970, khi các mạng máy tính đầu tiên như ARPANET ra đời, các kỹ sư chưa có khái niệm mô hình phân tầng chuẩn mực. Mỗi hãng sản xuất máy tính lớn (như IBM với kiến trúc SNA, DEC với DECnet) đều tự tay xây dựng một hệ thống mạng khép kín từ đầu đến chân theo kiểu <strong>Nguyên khối (Monolithic)</strong>.</p>
            <p>Trong một hệ thống mạng nguyên khối, một phần mềm duy nhất vừa phải đảm nhiệm việc hiển thị giao diện người dùng, vừa quản lý bộ nhớ đệm, vừa tính toán đường đi của gói tin, và trực tiếp phát xung điện áp điều khiển các bóng bán dẫn trên sợi dây đồng. Cách thiết kế này nhanh chóng dẫn tới ba thảm họa kỹ thuật nghiêm trọng:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🔒</span> 1. Khóa Chặt Nhà Cung Cấp</h4>
                  <span class="net-concept-badge">Vendor Lock-in</span>
                </div>
                <div class="net-concept-body">
                  <p>Máy tính của hãng IBM chỉ có thể kết nối với máy tính IBM và dùng đúng loại dây cáp do IBM sản xuất. Nếu một công ty mua máy tính DEC, hai hệ thống mạng này hoàn toàn "điếc" trước nhau, không thể trao đổi dù chỉ một ký tự.</p>
                </div>
              </div>

              <div class="net-concept-card accent-rose">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>💥</span> 2. Hiệu Ứng Sụp Đổ Dây Chuyền</h4>
                  <span class="net-concept-badge">Tight Coupling</span>
                </div>
                <div class="net-concept-body">
                  <p>Mọi thành phần gắn chặt chẽ vào nhau (khớp nối cứng). Khi một kỹ sư muốn nâng cấp sợi cáp đồng cũ sang cáp đồng trục tốc độ cao, họ buộc phải viết lại toàn bộ phần mềm ứng dụng kế toán từ đầu vì mã nguồn ứng dụng có gắn liền với thông số vi mạch của sợi cáp cũ!</p>
                </div>
              </div>

              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🤯</span> 3. Độ Phức Tạp Vượt Tầm Kiểm Soát</h4>
                  <span class="net-concept-badge">Cognitive Overload</span>
                </div>
                <div class="net-concept-body">
                  <p>Không một lập trình viên đơn lẻ nào có thể vừa am hiểu thuật toán nghiệp vụ ngân hàng, vừa nắm rõ cơ chế chống nhiễu sóng điện từ ở tần số cao. Quá trình phát triển ứng dụng mạng trở nên chậm chạp, tốn kém và tràn ngập lỗi bảo mật không thể vá.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-divide-and-conquer",
          title: "2. Triết lý 'Chia để trị' (Divide and Conquer) & 4 Nguyên tắc vàng",
          content: `
            <p>Để giải cứu thế giới mạng khỏi ngõ cụt nguyên khối, các nhà khoa học máy tính đã áp dụng một nguyên lý kinh điển trong khoa học máy tính: <strong>Chia để trị (Divide and Conquer)</strong>. Bài toán truyền thông dữ liệu xuyên lục địa khổng lồ được bóc tách thành nhiều tầng xếp chồng lên nhau (Protocol Stack), tạo nên <strong>Kiến trúc phân tầng (Layered Architecture)</strong>.</p>
            <p>Kiến trúc này hoạt động dựa trên 4 nguyên tắc vàng không thể thay thế:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🎯</span> 1. Độc Lập Chức Năng</h4>
                  <span class="net-concept-badge">Functional Independence</span>
                </div>
                <div class="net-concept-body">
                  <p>Mỗi tầng chỉ giải quyết một bài toán duy nhất và đóng vai trò như một <em>"Hộp đen" (Black box)</em>. Tầng mạng chỉ lo tìm đường (Routing); tầng truyền dẫn chỉ lo phát xung điện/ánh sáng. Tầng này không cần biết chi tiết cài đặt bên trong của tầng khác.</p>
                </div>
              </div>

              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🤝</span> 2. Mô Hình Dịch Vụ Phục Vụ</h4>
                  <span class="net-concept-badge">Service-Oriented</span>
                </div>
                <div class="net-concept-body">
                  <p>Tầng dưới đóng vai trò là <strong>Nhà cung cấp dịch vụ (Service Provider)</strong> cho tầng ngay phía trên. Tầng trên là <strong>Khách hàng sử dụng dịch vụ (Service User)</strong>. Tầng trên chỉ cần gọi dịch vụ mà không cần bận tâm tầng dưới thực thi thế nào.</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🔌</span> 3. Điểm Truy Cập Chuẩn Mực</h4>
                  <span class="net-concept-badge">Interface &amp; SAP</span>
                </div>
                <div class="net-concept-body">
                  <p>Ranh giới giữa hai tầng liền kề được xác định qua một <strong>Giao diện (Interface)</strong> chuẩn tắc. Điểm tiếp xúc nơi tầng trên yêu cầu tầng dưới phục vụ được gọi là <strong>Service Access Point (SAP)</strong> (trong thực tế thường là các hàm API hoặc Socket / Cổng Port).</p>
                </div>
              </div>

              <div class="net-concept-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>👥</span> 4. Giao Tiếp Ngang Hàng Ảo</h4>
                  <span class="net-concept-badge">Peer-to-Peer Protocol</span>
                </div>
                <div class="net-concept-body">
                  <p>Tầng $N$ trên máy gửi giao tiếp logic trực tiếp với Tầng $N$ trên máy nhận thông qua một bộ quy tắc chung gọi là <strong>Giao thức (Protocol)</strong> của tầng đó, mặc dù trong thực tế dữ liệu phải đi vòng xuống tầng 1 rồi mới sang được máy kia.</p>
                </div>
              </div>
            </div>

            <p style="margin-top:20px;">Dưới đây là bộ thẻ đối chiếu trực quan sự khác biệt một trời một vực giữa hai mô hình kiến trúc:</p>

            <div class="net-compare-grid">
              <div class="net-compare-card accent-amber">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>🧱</span> Mạng Nguyên Khối (Monolithic)</h4>
                  <span class="net-concept-badge">Thập niên 1970</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">🧩 Tính mô-đun</span>
                    <span class="net-spec-val">Không có; một khối mã nguồn duy nhất kiểm soát tất cả.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔄 Khả năng thay thế</span>
                    <span class="net-spec-val">Cực kỳ khó khăn; đổi một sợi cáp kéo theo viết lại toàn bộ phần mềm.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🌐 Khả năng mở rộng</span>
                    <span class="net-spec-val">Bị giới hạn trong mạng nội bộ độc quyền của một hãng duy nhất.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔧 Khắc phục sự cố</span>
                    <span class="net-spec-val">Đoán mò; không thể biết lỗi do ứng dụng hay đứt dây mạng.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Bản chất: Cứng nhắc, đóng kín, không thể tạo ra mạng toàn cầu Internet.</p>
              </div>

              <div class="net-compare-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>🥞</span> Mạng Phân Tầng (Layered)</h4>
                  <span class="net-concept-badge">Chuẩn hóa Toàn Cầu</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">🧩 Tính mô-đun</span>
                    <span class="net-spec-val">Rất cao; mỗi tầng là một khối độc lập chuẩn hóa quốc tế (RFC/ISO).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔄 Khả năng thay thế</span>
                    <span class="net-spec-val">Dễ dàng; đổi cáp quang sang Wi-Fi tầng ứng dụng không hề hay biết.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🌐 Khả năng mở rộng</span>
                    <span class="net-spec-val">Không giới hạn; cho phép hàng tỷ thiết bị khác hệ điều hành nói chuyện với nhau.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔧 Khắc phục sự cố</span>
                    <span class="net-spec-val">Khoa học; phân lập lỗi theo từng tầng (Bottom-Up hoặc Top-Down).</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Bản chất: Linh hoạt, mở rộng, nền móng vững chắc của toàn bộ Internet.</p>
              </div>
            </div>
          `
        },
        {
          id: "sec-layer-independence",
          title: "3. Tính Độc Lập Giữa Các Tầng (Layer Independence) trong Thực Tế",
          content: `
            <p>Khái niệm <strong>Tính độc lập giữa các tầng (Layer Independence)</strong> chính là "vũ khí tối thượng" giải thích vì sao Internet có thể tồn tại và phát triển vũ bão suốt hơn 40 năm qua mà không bao giờ phải thiết kế lại từ đầu. Hãy quan sát hai minh chứng kinh điển diễn ra hàng ngày quanh bạn:</p>

            <div class="net-concept-grid">
              <div class="net-concept-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>📶</span> 1. Thay đổi tầng dưới, tầng trên không đổi</h4>
                  <span class="net-concept-badge">Dưới đổi — Trên giữ nguyên</span>
                </div>
                <div class="net-concept-body">
                  <p>Bạn đang ngồi xem video 4K trên YouTube bằng mạng Wi-Fi của quán cà phê. Bạn cắm thêm một sợi cáp mạng LAN vào laptop. Hệ điều hành tự động chuyển hướng dữ liệu sang cáp có dây. Video YouTube của bạn có bị tắt ngúm không? Trình duyệt Chrome có báo lỗi không? <strong>Hoàn toàn không!</strong></p>
                  <p>Tầng Ứng dụng (HTTP/YouTube) hoàn toàn độc lập với Tầng Vật lý (Wi-Fi hay Cáp đồng). Tầng ứng dụng chỉ yêu cầu: <em>"Hãy gửi cho tôi dòng byte này"</em>, nó không quan tâm dòng byte đó được truyền bằng sóng radio hay xung điện áp!</p>
                </div>
              </div>

              <div class="net-concept-card accent-purple">
                <div class="net-concept-header">
                  <h4 class="net-concept-title"><span>🚀</span> 2. Phát minh tầng trên, tầng dưới không đổi</h4>
                  <span class="net-concept-badge">Trên đổi — Dưới giữ nguyên</span>
                </div>
                <div class="net-concept-body">
                  <p>Năm 2022, tổ chức IETF chính thức chuẩn hóa giao thức <strong>HTTP/3</strong> (chạy trên nền giao thức UDP và mã hóa QUIC hoàn toàn mới). Nhờ đó các trang Web tải nhanh gấp 3 lần và giảm độ trễ nhảy mạng.</p>
                  <p>Khi HTTP/3 ra đời, các công ty viễn thông có phải đi đào đường lên để thay toàn bộ dây cáp quang xuyên đại dương không? <strong>Tuyệt đối không!</strong> Hạ tầng cáp quang ở Tầng 1 vẫn giữ nguyên 100%. Các kỹ sư chỉ việc cập nhật phần mềm ở tầng trên cùng.</p>
                </div>
              </div>
            </div>

            <p style="margin-top:20px;">Để đảm bảo tính độc lập tuyệt đối này, các kỹ sư mạng phân biệt rõ ràng hai khái niệm thường bị người mới nhầm lẫn: <strong>Giao diện (Interface)</strong> và <strong>Giao thức (Protocol)</strong>:</p>

            <div class="net-compare-grid">
              <div class="net-compare-card accent-blue">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>↕️</span> Giao Diện Dịch Vụ (Interface / SAP)</h4>
                  <span class="net-concept-badge">Giao tiếp Thẳng Đứng</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">📍 Phạm vi</span>
                    <span class="net-spec-val">Nội bộ bên trong CÙNG MỘT MÁY TÍNH (Local Host).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">📐 Bản chất</span>
                    <span class="net-spec-val">Tập hợp các hàm gọi hệ thống (System Calls, Socket API) giữa Tầng $N$ và Tầng $N-1$.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔒 Quy tắc</span>
                    <span class="net-spec-val">Có thể thay đổi tùy hệ điều hành (Windows gọi Winsock, Linux gọi BSD Socket) miễn là cùng chuẩn chức năng.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Cầu nối thẳng đứng giữa hai tầng lân cận trên cùng một hệ điều hành.</p>
              </div>

              <div class="net-compare-card accent-emerald">
                <div class="net-concept-header">
                  <h4 class="net-compare-title"><span>↔️</span> Giao Thức Mạng (Protocol)</h4>
                  <span class="net-concept-badge">Giao tiếp Nằm Ngang</span>
                </div>
                <ul class="net-spec-list">
                  <li class="net-spec-item">
                    <span class="net-spec-label">📍 Phạm vi</span>
                    <span class="net-spec-val">Xuyên qua mạng giữa HAI THIẾT BỊ KHÁC NHAU (Remote Hosts).</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">📐 Bản chất</span>
                    <span class="net-spec-val">Bộ quy chuẩn quốc tế (RFC) quy định cấu trúc bit của gói tin và trình tự đối đáp logic.</span>
                  </li>
                  <li class="net-spec-item">
                    <span class="net-spec-label">🔒 Quy tắc</span>
                    <span class="net-spec-val">Bắt buộc phải giống hệt nhau từng byte trên cả máy gửi và máy nhận để hiểu được nhau.</span>
                  </li>
                </ul>
                <p class="net-compare-verdict">➔ Ngôn ngữ ngang hàng giữa hai thực thể cùng tầng qua không gian mạng.</p>
              </div>
            </div>
          `
        },
        {
          id: "sec-worked-example",
          title: "4. Ví dụ phân tích kiến trúc (Worked Example): Chi phí của sự phân tầng",
          content: `
            <p>Trong kỹ thuật, không có bữa trưa nào là miễn phí (<em>No free lunch</em>). Kiến trúc phân tầng đem lại sự linh hoạt và độc lập vô giá, nhưng cái giá phải trả là gì? Đó là <strong>Chi phí đóng gói phần đầu (Header Overhead)</strong> và độ trễ chuyển tầng.</p>
            <p><strong>Bài toán thực tế:</strong> Một cảm biến IoT trong nhà máy gửi một thông điệp trạng thái nhỏ gọn: <code>"STATUS=OK"</code> (chỉ vỏn vẹn $10\\text{ bytes}$ dữ liệu hữu ích). Khi gói tin này đi qua chồng giao thức 4 tầng, mỗi tầng sẽ dán thêm một phần tiêu đề (Header) riêng của mình:</p>

            <div class="net-calc-box">
              <div class="net-calc-header">
                <h4 class="net-calc-title">🧮 Phân tích chi phí đóng gói gói tin IoT qua các tầng</h4>
                <span class="net-calc-badge">Worked Example</span>
              </div>
              <div class="net-calc-body">
                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 1: Liệt kê kích thước tiêu đề của từng tầng mạng</div>
                  <pre class="net-calc-formula">- Tầng Dữ liệu có ích (Payload):  10 bytes
- Tiêu đề Tầng Giao vận (TCP Header tối thiểu): 20 bytes
- Tiêu đề Tầng Mạng (IPv4 Header tối thiểu):     20 bytes
- Tiêu đề Tầng Liên kết dữ liệu (Ethernet II):   14 bytes
- Đuôi kiểm tra lỗi khung (Ethernet FCS/CRC):     4 bytes</pre>
                </div>

                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 2: Tính tổng kích thước khung truyền thực tế trên đường dây cáp</div>
                  <pre class="net-calc-formula">$$\\text{Tổng kích thước Frame} = 10 + 20 + 20 + 14 + 4 = 68\\text{ bytes}$$</pre>
                </div>

                <div class="net-calc-step">
                  <div class="net-calc-step-title">Bước 3: Tính Hiệu suất Dữ liệu có ích (Goodput Efficiency) và Tỷ lệ Overhead</div>
                  <pre class="net-calc-formula">$$\\text{Hiệu suất Hữu ích (\\%)} = \\frac{\\text{Dữ liệu thực tế}}{\\text{Tổng kích thước}} \\times 100\\% = \\frac{10}{68} \\times 100\\% \\approx 14.71\\%$$
$$\\text{Tỷ lệ Lãng phí Overhead (\\%)} = 100\\% - 14.71\\% = 85.29\\%$$</pre>
                </div>

                <div class="net-calc-result">
                  ✓ Kết luận quan trọng: Với các gói tin quá nhỏ (như IoT hoặc cờ ACK), chi phí tiêu đề chiếm tới hơn $85\\%$ băng thông đường truyền! Tuy nhiên, khi gửi một gói tin tải dữ liệu lớn (MTU $1500\\text{ bytes}$ với $1460\\text{ bytes}$ payload), hiệu suất hữu ích tăng vọt lên tới $\\frac{1460}{1518} \\approx 96.18\\%$. Đây là lý do vì sao các kỹ sư mạng luôn tìm cách gộp dữ liệu để tối ưu hóa hiệu suất truyền dẫn!
                </div>
              </div>
            </div>
          `
        },
        {
          id: "sec-lab",
          title: "5. Thực hành (Lab): Khám nghiệm Tính Độc Lập Card Mạng trên Windows & Linux",
          content: `
            <div class="net-step-card">
              <div class="net-step-header">
                <span class="net-step-badge">BƯỚC 1</span>
                <h4 class="net-step-title">Quan sát Card mạng vật lý (Tầng 1/2) và Địa chỉ IP Logic (Tầng 3)</h4>
              </div>
              <p class="net-step-desc">
                Trong bài thực hành này, bạn sẽ mở cửa sổ dòng lệnh để trực tiếp chứng kiến hệ điều hành tách bạch tuyệt đối giữa <strong>Phần cứng card mạng vật lý</strong> (được định danh bằng tên giao diện và địa chỉ MAC) với <strong>Cấu hình mạng logic</strong> (địa chỉ IP và Default Gateway do tầng mạng quản lý).
              </p>
              <div class="net-verify-box">
                <span class="net-verify-icon">✓</span>
                <span><strong>Cách kiểm tra bạn làm đúng:</strong> Bạn sẽ thấy máy tính của mình có nhiều hơn 1 Card mạng (ví dụ: vừa có Wi-Fi, vừa có Ethernet, vừa có Loopback). Mỗi card có địa chỉ MAC vật lý riêng biệt, và việc rút dây hay tắt Wi-Fi chỉ làm thay đổi trạng thái của card đó mà không làm tê liệt các tiến trình phần mềm khác trên máy.</span>
              </div>
            </div>
          `,
          codeExamples: [
            {
              title: "Thực hành trên Windows (PowerShell / Command Prompt)",
              lang: "powershell",
              code: "# 1. Liệt kê danh sách tất cả các Card mạng vật lý và ảo trên máy\nGet-NetAdapter | Select-Object Name, InterfaceDescription, Status, MacAddress, LinkSpeed\n\n# 2. Xem chi tiết sự gắn kết giữa Card mạng (L2) và Địa chỉ IP (L3)\nGet-NetIPAddress -AddressFamily IPv4 | Select-Object InterfaceAlias, IPAddress, PrefixLength",
              output: `Name             InterfaceDescription                     Status       MacAddress         LinkSpeed
----             --------------------                     ------       ----------         ---------
Wi-Fi            Intel(R) Wi-Fi 6 AX201 160MHz            Up           3C-58-C2-4A-12-89  574 Mbps
Ethernet         Realtek PCIe GbE Family Controller       Disconnected D8-BB-C1-89-AA-01  0 bps

InterfaceAlias IPAddress       PrefixLength
-------------- ---------       ------------
Wi-Fi          192.168.1.15              24
Loopback       127.0.0.1                  8`,
              annotations: [
                { line: 2, text: "Lệnh Get-NetAdapter liệt kê tầng vật lý & liên kết dữ liệu: Tên card, nhà sản xuất, địa chỉ MAC và tốc độ kết nối." },
                { line: 5, text: "Lệnh Get-NetIPAddress cho thấy tầng 3 (IP logic) được gắn (bind) lên giao diện tầng dưới như thế nào." },
                { line: 10, text: "Card Wi-Fi đang Up với tốc độ 574 Mbps, card Ethernet đang Disconnected nhưng cấu hình phần cứng vẫn độc lập nguyên vẹn." }
              ]
            },
            {
              title: "Thực hành trên Linux / WSL / macOS (Bash Shell)",
              lang: "bash",
              code: "# 1. Liệt kê các giao diện mạng ở Tầng Liên Kết (L2) kèm trạng thái và địa chỉ MAC\nip -br link show\n\n# 2. Hiển thị thông tin địa chỉ IP (L3) tương ứng trên từng interface\nip -br -4 addr show",
              output: `lo               UNKNOWN        00:00:00:00:00:00 <LOOPBACK,UP,LOWER_UP> 
eth0             UP             00:15:5d:2a:4c:11 <BROADCAST,MULTICAST,UP,LOWER_UP> 

lo               UNKNOWN        127.0.0.1/8 
eth0             UP             172.28.194.215/20`,
              annotations: [
                { line: 2, text: "Lệnh 'ip link' truy vấn trực tiếp vào nhân Linux Kernel để lấy danh sách thiết bị mạng và địa chỉ MAC phần cứng." },
                { line: 5, text: "Lệnh 'ip addr' cho thấy địa chỉ IP logic được ánh xạ lên giao diện tương ứng (eth0 nhận IP 172.28.194.215)." },
                { line: 11, text: "Giao diện ảo 'lo' (Loopback) luôn tồn tại độc lập để máy tính có thể tự gửi dữ liệu thử nghiệm cho chính nó." }
              ]
            }
          ]
        },
        {
          id: "sec-incident-study",
          title: "6. Góc sự cố thực tế: 'Lỗi phần mềm hay đứt dây mạng?'",
          content: `
            <div class="net-incident-card">
              <div class="net-incident-header">
                <span>🚨</span>
                <span>CASE STUDY: HỆ THỐNG XUẤT HÓA ĐƠN ERP ĐỘT NGỘT BỊ ĐÌNH TRỆ</span>
              </div>
              <div class="net-incident-body">
                <p><strong>Bối cảnh &amp; Triệu chứng:</strong> 9h sáng thứ Hai đầu tuần, phòng kế toán của một tập đoàn lớn phản ánh toàn bộ máy tính không thể bấm nút <em>"Phát hành hóa đơn điện tử"</em> trên phần mềm ERP. Ban giám đốc lập tức gọi điện khiển trách đội ngũ lập trình viên phần mềm (Dev) vì cho rằng bản cập nhật tối qua bị lỗi nghiêm trọng.</p>
                <p><strong>Khám nghiệm bản chất theo triết lý phân tầng (Bottom-Up Troubleshooting):</strong> Thay vì mở mã nguồn phần mềm ra mò mẫm vô vọng trong hàng triệu dòng code, kỹ sư mạng đã áp dụng phương pháp chẩn đoán từ tầng dưới lên trên:</p>
                <div class="net-concept-grid">
                  <div class="net-concept-card accent-emerald">
                    <div class="net-concept-header">
                      <h4 class="net-concept-title"><span>🔌</span> Kiểm tra Tầng 1 &amp; 2 (Vật lý &amp; MAC)</h4>
                      <span class="net-concept-badge">Đạt yêu cầu</span>
                    </div>
                    <div class="net-concept-body">
                      <p>Đèn cổng mạng trên Switch phòng kế toán sáng xanh ổn định; lệnh <code>ip link</code> cho thấy trạng thái <code>UP</code>, không bị rớt khung truyền (No packet drops).</p>
                    </div>
                  </div>

                  <div class="net-concept-card accent-blue">
                    <div class="net-concept-header">
                      <h4 class="net-concept-title"><span>🧭</span> Kiểm tra Tầng 3 (Mạng &amp; IP)</h4>
                      <span class="net-concept-badge">Đạt yêu cầu</span>
                    </div>
                    <div class="net-concept-body">
                      <p>Dùng lệnh <code>ping 192.168.10.1</code> tới Default Gateway và <code>ping 8.8.8.8</code> đều phản hồi tức thì với thời gian RTT $&lt; 1\\text{ms}$. Hệ thống mạng nội bộ và Internet hoàn toàn thông suốt.</p>
                    </div>
                  </div>

                  <div class="net-concept-card accent-rose">
                    <div class="net-concept-header">
                      <h4 class="net-concept-title"><span>📦</span> Kiểm tra Tầng 4 (Giao vận &amp; Cổng Port)</h4>
                      <span class="net-concept-badge">Phát hiện thủ phạm!</span>
                    </div>
                    <div class="net-concept-body">
                      <p>Kỹ sư gõ lệnh kiểm tra bắt tay TCP: <code>Test-NetConnection -ComputerName invoice.tax.gov.vn -Port 443</code>. Kết quả trả về: <strong>TcpTestSucceeded: False</strong>! Kết nối TCP bị Timeout ngay lập tức.</p>
                    </div>
                  </div>
                </div>

                <div class="net-verify-box" style="margin-top:15px;">
                  <span class="net-verify-icon">✓</span>
                  <span><strong>Bài học chẩn đoán đắt giá:</strong> Thủ phạm thực sự không phải lỗi code của đội Dev, mà do đội Quản trị Firewall đã vô tình cập nhật luật bảo mật chặn dải IP mới của Cổng dịch vụ Thuế ở Tầng 4! Nhờ tư duy phân tầng, sự cố được khoanh vùng chính xác trong 10 phút, cứu đội ngũ lập trình khỏi việc phải thức trắng đêm vô ích để sửa những dòng code không hề bị lỗi!</span>
                </div>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Tưởng rằng dữ liệu nhảy vọt trực tiếp ngang hàng giữa hai phần mềm ứng dụng",
            content: "Nhiều người mới học tưởng rằng trình duyệt Chrome gửi thẳng dữ liệu sang Web Server đối diện. Thực tế, dữ liệu BẮT BUỘC phải đi một hành trình chữ 'U': đi từ Tầng Ứng dụng dốc đứng xuống Tầng Vật lý của máy gửi, biến thành xung điện chạy qua dây cáp mạng sang máy nhận, rồi lại đi ngược từ Tầng Vật lý leo lên Tầng Ứng dụng của máy nhận!"
          },
          {
            title: "Nghĩ rằng càng chia nhiều tầng thì hệ thống mạng càng chạy nhanh hơn",
            content: "Ngược lại! Mỗi tầng sinh ra đều kèm theo chi phí: CPU phải thêm/bóc header, hệ điều hành phải chuyển đổi ngữ cảnh (Context switch) và tiêu tốn thêm bộ nhớ RAM cho các vùng đệm (buffer). Số lượng tầng luôn là sự cân bằng tối ưu giữa tính linh hoạt của con người và hiệu năng xử lý của máy tính."
          },
          {
            title: "Nhầm lẫn giữa Giao thức (Protocol) và Dịch vụ (Service)",
            content: "Dịch vụ là thứ tầng dưới CUNG CẤP cho tầng trên thông qua Interface nội bộ trên cùng một máy tính. Giao thức là tập hợp các QUY TẮC mà hai thực thể cùng tầng trên hai máy tính khác nhau dùng để trao đổi dữ liệu qua mạng."
          }
        ],
        tips: [
          {
            title: "Quy tắc chẩn đoán lỗi 'Bottom-Up' cứu nguy trong mọi phòng phỏng vấn kỹ thuật",
            content: "Khi được hỏi 'Một người dùng không vào được trang web, bạn sẽ làm gì?', hãy luôn trả lời theo hướng phân tầng từ dưới lên: 1. Kiểm tra cáp mạng / Wi-Fi (Tầng 1) -> 2. Kiểm tra đèn link và MAC (Tầng 2) -> 3. Kiểm tra IP và ping Default Gateway (Tầng 3) -> 4. Kiểm tra mở cổng TCP/UDP (Tầng 4) -> 5. Kiểm tra DNS và mã phản hồi HTTP Server (Tầng 7). Câu trả lời này thể hiện tư duy kỹ sư hạ tầng chuyên nghiệp bậc nhất!"
          }
        ]
      },
      exercises: [
        {
          id: "ex-1-01-1",
          level: "Dễ",
          title: "Bài 1: Phân biệt Giao thức (Protocol) và Giao diện (Interface)",
          problem: "Một lập trình viên mới vào nghề khẳng định: 'Hàm socket() trong ngôn ngữ C và giao thức HTTP thực chất là một, chúng đều là giao thức mạng vì đều dùng để gửi dữ liệu'. Dựa trên nguyên lý phân tầng và mô hình dịch vụ, hãy giải thích tại sao nhận định trên là sai và chỉ rõ đâu là Interface, đâu là Protocol.",
          hint: "Hãy đối chiếu phạm vi hoạt động: cái nào hoạt động nội bộ trên một máy tính, cái nào hoạt động xuyên qua không gian mạng giữa hai máy tính?",
          solutionCode: `1. Nhận định trên hoàn toàn SAI về mặt bản chất kiến trúc mạng.

2. Phân định rạch ròi:
- Hàm socket() trong ngôn ngữ C là một GIAO DIỆN LẬP TRÌNH (API / Interface / SAP):
  + Nó là cầu nối thẳng đứng giữa Tầng Ứng dụng (chương trình C của bạn) và Tầng Giao vận (nhân hệ điều hành OS Kernel).
  + Nó chỉ có giá trị nội bộ trên máy tính của bạn; máy chủ bên kia không hề biết hay quan tâm chương trình của bạn được viết bằng C, Python hay Java.

- Giao thức HTTP (Hypertext Transfer Protocol) là một GIAO THỨC MẠNG (Protocol):
  + Nó là bộ quy tắc nằm ngang chuẩn hóa quốc tế (RFC) quy định cấu trúc bản tin (GET, POST, Header, Status Code).
  + Cả máy gửi và máy nhận bắt buộc phải hiểu và tuân thủ định dạng byte này thì mới có thể hiển thị được trang web.`,
          explanation: "Interface là ranh giới cục bộ giữa hai tầng kề nhau trên cùng một host; Protocol là quy tắc trao đổi dữ liệu ngang hàng giữa hai thực thể qua môi trường mạng."
        },
        {
          id: "ex-1-01-2",
          level: "Vừa",
          title: "Bài 2: Tính toán Hiệu suất Dữ liệu & Chi phí Phân tầng (Overhead)",
          problem: "Một ứng dụng VoIP (gọi điện thoại qua mạng Internet) truyền âm thanh theo thời gian thực. Cứ mỗi 20 mili-giây, ứng dụng mã hóa một đoạn giọng nói có kích thước 32 bytes (Payload). Đoạn âm thanh này được đóng gói lần lượt qua: Giao thức RTP (12 bytes header), giao thức UDP (8 bytes header), giao thức IPv4 (20 bytes header), và khung truyền Ethernet II (18 bytes gồm cả 4 bytes FCS). Hãy tính: (a) Tổng kích thước của một khung truyền giọng nói gửi trên cáp mạng; (b) Tỷ lệ phần trăm hiệu suất hữu ích (Goodput ratio) của cuộc gọi.",
          hint: "Tổng kích thước = Dữ liệu âm thanh + Tổng tất cả các header của các tầng. Hiệu suất = (Dữ liệu âm thanh / Tổng kích thước) * 100%.",
          solutionCode: `(a) Tính tổng kích thước khung truyền Ethernet thực tế:
- Kích thước tải trọng âm thanh (Voice Payload): 32 bytes
- RTP Header: 12 bytes
- UDP Header: 8 bytes
- IPv4 Header: 20 bytes
- Ethernet Header + FCS: 18 bytes
=> Tổng kích thước khung truyền = 32 + 12 + 8 + 20 + 18 = 90 bytes

(b) Tính tỷ lệ hiệu suất hữu ích (Goodput Ratio):
- Hiệu suất (%) = (Kích thước âm thanh thực tế / Tổng kích thước khung) * 100%
- Hiệu suất (%) = (32 / 90) * 100% ≈ 35.56%

=> Nhận xét: Chi phí đóng gói (Overhead) chiếm tới 64.44% băng thông của gói tin! Để giảm tải, các kỹ sư thường dùng kỹ thuật nén header (cRTP) trong các đường truyền chuyên dụng.`,
          explanation: "Với các ứng dụng thời gian thực cần độ trễ thấp như VoIP, kích thước dữ liệu mỗi lần gửi rất nhỏ nên chi phí header của các tầng chiếm tỷ trọng lớn."
        },
        {
          id: "ex-1-01-3",
          level: "Khó",
          title: "Bài 3: Tư duy kiến trúc & Xây dựng quy trình chẩn đoán Bottom-Up",
          problem: "Một máy chủ Web trong trung tâm dữ liệu bất ngờ không thể nhận kết nối từ khách hàng bên ngoài. Khi đăng nhập vào bảng điều khiển máy chủ, bạn thấy tải CPU bình thường, tiến trình Nginx vẫn đang lắng nghe (listening) ở port 80/443. Hãy liệt kê quy trình 4 bước chẩn đoán theo phương pháp 'Chia để trị' (Bottom-Up) kèm các câu lệnh tương ứng trên Linux để tìm ra chính xác tầng mạng đang gặp sự cố.",
          hint: "Bắt đầu từ Tầng 1/2 (kiểm tra link, interface), lên Tầng 3 (IP, routing, gateway), lên Tầng 4 (firewall, port), rồi mới đến Tầng 7 (Nginx config/log).",
          solutionCode: `# BƯỚC 1: Kiểm tra Tầng 1 & Tầng 2 (Vật lý & Liên kết dữ liệu)
# Mục tiêu: Xác định card mạng có cắm cáp và link state có UP không
ip -br link show
# Dấu hiệu đúng: Interface (vd: eth0) phải có trạng thái UP, không có carrier loss

# BƯỚC 2: Kiểm tra Tầng 3 (Mạng & Định tuyến)
# Mục tiêu: Xác định máy chủ có nhận đúng IP và ra được Gateway không
ip -br addr show eth0
ip route show default
ping -c 3 <Default_Gateway_IP>
# Dấu hiệu đúng: IP trùng khớp quy hoạch, ping Default Gateway phản hồi 0% packet loss

# BƯỚC 3: Kiểm tra Tầng 4 (Giao vận & Tường lửa Netfilter)
# Mục tiêu: Xác định socket có mở và tường lửa có chặn cổng không
ss -tulpn | grep -E ':80|:443'
sudo iptables -L -n -v | grep -E 'dpt:80|dpt:443'
# Dấu hiệu: Tiến trình nginx ở trạng thái LISTEN; iptables không có luật DROP cổng 80/443

# BƯỚC 4: Kiểm tra Tầng 7 (Ứng dụng & Phản hồi HTTP cục bộ)
# Mục tiêu: Xác định Web Server có trả về mã 200 khi truy vấn nội bộ không
curl -I http://127.0.0.1
# Dấu hiệu đúng: Trả về HTTP/1.1 200 OK. Nếu cục bộ OK mà bên ngoài không vào được -> Sự cố nằm ở Router/Load Balancer phía trước!`,
          explanation: "Phương pháp Bottom-Up giúp loại trừ tuần tự từ hạ tầng vật lý lên tầng ứng dụng, ngăn chặn việc suy đoán sai hướng và tiết kiệm thời gian vận hành."
        }
      ],
      summary: [
        "1. Kiến trúc mạng nguyên khối (Monolithic) thất bại vì gây ra khóa chặt nhà cung cấp (vendor lock-in), ghép nối cứng (tight coupling) và độ phức tạp vượt tầm kiểm soát.",
        "2. Nguyên lý 'Chia để trị' (Divide and Conquer) chia nhỏ bài toán truyền thông thành một chồng các tầng độc lập (Protocol Stack), trong đó mỗi tầng giải quyết một bài toán duy nhất.",
        "3. Tính độc lập giữa các tầng (Layer Independence) cho phép nâng cấp hoặc thay thế công nghệ ở một tầng (như đổi cáp quang sang Wi-Fi, hoặc nâng cấp HTTP/1 lên HTTP/3) mà không ảnh hưởng đến các tầng khác.",
        "4. Phân biệt rạch ròi: Interface (Giao diện) là cầu nối dịch vụ thẳng đứng giữa hai tầng trên CÙNG MỘT MÁY; Protocol (Giao thức) là bộ quy tắc nằm ngang giữa hai thực thể cùng tầng qua MẠNG.",
        "5. Phân tầng tạo ra chi phí tiêu đề (Header Overhead) và độ trễ, nhưng đổi lại tính mở rộng, khả năng tương thích toàn cầu và khả năng phân lập lỗi (troubleshooting) vô giá của Internet."
      ],
      selfReviewQuestions: [
        "1. Vì sao việc thay đổi từ mạng có dây (Ethernet) sang mạng không dây (Wi-Fi) không yêu cầu lập trình viên phải sửa lại mã nguồn của trình duyệt Web?",
        "2. Điểm khác nhau căn bản giữa Service (Dịch vụ) và Protocol (Giao thức) trong mô hình phân tầng là gì?",
        "3. Khi chẩn đoán sự cố mạng, vì sao phương pháp 'Từ dưới lên' (Bottom-Up) lại thường được các kỹ sư mạng ưu tiên áp dụng đầu tiên?"
      ],
      reflectionQuestion: "Nếu ngày mai các nhà khoa học phát minh ra công nghệ truyền thông lượng tử (Quantum Teleportation) truyền các bit dữ liệu tức thời xuyên lục địa, theo bạn tầng nào trong mô hình mạng máy tính sẽ phải thay đổi, và tầng nào hoàn toàn không cần phải sửa đổi bất kỳ dòng code nào? Tại sao?",
      reflectionHint: "Hãy nhớ lại tính độc lập của các tầng: Công nghệ truyền bit lượng tử chỉ tác động lên Tầng Vật lý (L1) và cách thức tạo tín hiệu; các tầng bên trên như TCP, IP và ứng dụng Web HTTP chỉ quan tâm nhận được các bit nhị phân chính xác mà không hề bận tâm các bit đó bay xuyên qua sợi cáp quang hay xuyên qua hiện tượng vướng víu lượng tử!",
      nextLessonPreview: "Bài 1.2: Mô hình OSI 7 tầng: Ý nghĩa, chức năng và câu thần chú ghi nhớ — Khám phá bản thiết kế vĩ đại 7 tầng của tổ chức ISO, giải phẫu chi tiết nhiệm vụ của từng tầng từ Tầng Vật lý đến Tầng Ứng dụng và câu thần chú giúp bạn nhớ suốt đời."
    }
  ],
  quiz: {
    title: "Bài Kiểm Tra Năng Lực Module 1: Mô Hình Phân Tầng OSI & TCP/IP",
    questions: [
      {
        question: "Lợi ích cốt lõi lớn nhất của kiến trúc mạng phân tầng (Layered Architecture) so với kiến trúc nguyên khối (Monolithic) là gì?",
        options: [
          "Giúp tốc độ truyền dữ liệu qua dây cáp đạt mức tiệm cận vận tốc ánh sáng.",
          "Tính độc lập giữa các tầng: thay đổi công nghệ ở một tầng không làm ảnh hưởng hay bắt buộc viết lại các tầng khác.",
          "Loại bỏ hoàn toàn các phần tiêu đề (Header), giúp tiết kiệm 100% băng thông đường truyền.",
          "Đảm bảo mọi gói tin truyền qua mạng không bao giờ bị mất mát hay suy hao."
        ],
        correctIndex: 1,
        explanation: "Tính độc lập giữa các tầng (Layer Independence) cho phép các kỹ sư tự do đổi mới công nghệ ở một tầng (ví dụ phát minh Wi-Fi 6, 5G, cáp quang mới) mà toàn bộ các ứng dụng Web, Game ở tầng trên vẫn hoạt động bình thường mà không cần sửa đổi mã nguồn."
      },
      {
        question: "Khái niệm nào mô tả ranh giới giao tiếp THẲNG ĐỨNG giữa hai tầng liền kề nhau trên CÙNG MỘT máy tính?",
        options: [
          "Giao thức mạng (Protocol).",
          "Bộ định tuyến (Router).",
          "Giao diện dịch vụ (Interface / Service Access Point - SAP).",
          "Môi trường truyền dẫn (Transmission Media)."
        ],
        correctIndex: 2,
        explanation: "Giao diện (Interface / SAP) là ranh giới nội bộ thẳng đứng giữa tầng dưới (Service Provider) và tầng trên (Service User) trên cùng một máy; trong khi Giao thức (Protocol) là quy tắc giao tiếp nằm ngang giữa hai thiết bị qua không gian mạng."
      },
      {
        question: "Hiện tượng một gói tin có kích thước dữ liệu hữu ích nhỏ (10 bytes) nhưng kích thước gửi thực tế lên tới 68 bytes được gọi là gì trong kỹ thuật mạng?",
        options: [
          "Lỗi tràn bộ nhớ đệm (Buffer Overflow).",
          "Chi phí tiêu đề phân tầng (Header Overhead).",
          "Tấn công từ chối dịch vụ (DDoS Amplification).",
          "Độ trễ truyền lan (Propagation Delay)."
        ],
        correctIndex: 1,
        explanation: "Khi đi qua mỗi tầng của mô hình mạng, gói tin được đóng gói thêm tiêu đề (Header) của tầng đó (TCP Header 20B, IP Header 20B, Ethernet 18B...). Phần dung lượng bổ sung này gọi là Header Overhead."
      },
      {
        question: "Theo phương pháp chẩn đoán sự cố mạng 'Từ dưới lên' (Bottom-Up Troubleshooting), khi máy tính không truy cập được Internet, bước nào sau đây phải được thực hiện ĐẦU TIÊN?",
        options: [
          "Cài đặt lại hệ điều hành Windows hoặc cập nhật phiên bản Chrome mới nhất.",
          "Kiểm tra xem cáp mạng có cắm chặt không, đèn cổng mạng có sáng xanh không, hoặc Wi-Fi đã kết nối chưa.",
          "Mở tệp cấu hình DNS và kiểm tra các bản ghi MX của máy chủ email.",
          "Viết lại mã nguồn của máy chủ cơ sở dữ liệu backend."
        ],
        correctIndex: 1,
        explanation: "Phương pháp Bottom-Up luôn bắt đầu từ Tầng 1 (Tầng Vật lý): kiểm tra nguồn điện, dây cáp mạng, sóng Wi-Fi và đèn cổng mạng trước khi nghi ngờ các tầng mạng hay ứng dụng phức tạp bên trên."
      }
    ]
  }
};
