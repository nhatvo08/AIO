/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 4: Tầng giao vận (L4): UDP, TCP, QUIC & Quản lý băng thông QoS (Phase 4)
 */

window.NET_PHASE4_DATA = {
  id: "part-net-4",
  number: "Giai đoạn 4",
  title: "Tầng giao vận (L4): UDP, TCP, QUIC & Quản lý Băng thông QoS",
  level: "Nâng cao",
  badge: "GĐ 4",
  description: "Bản chất: IP chỉ là nỗ lực tối đa (Best-effort); TCP tự xây dựng độ tin cậy, tuần tự và kiểm soát tắc nghẽn; UDP tối giản độ trễ; QUIC khắc phục Head-of-Line blocking; QoS điều tiết chất lượng dịch vụ.",
  lessons: [
    {
      id: "net-4-01",
      number: "4.1",
      title: "Cổng (Port), Ghép kênh (Multiplexing) & Bản chất 'Best-effort' của UDP",
      subtitle: "Pseudo-header Checksum, Socket Demultiplexing và phân tích vì sao UDP là nền tảng của DNS, VoIP và Video streaming",
      level: "Nâng cao",
      duration: "90 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tìm hiểu cơ chế ghép kênh/phân kênh tại tầng giao vận và ưu thế tốc độ của UDP.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-4-02",
      number: "4.2",
      title: "Bắt tay 3 bước TCP: SYN, SYN-ACK, ACK, Hàng đợi SYN & Cạn kiệt cổng",
      subtitle: "Khởi tạo ISN, phân biệt SYN Queue vs Accept Queue, kỹ thuật phòng thủ SYN Flood Cookie và cạn kiệt Ephemeral Ports",
      level: "Nâng cao",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Phân tích quá trình thiết lập kết nối TCP, các hàng đợi trong kernel và cơ chế cạn cổng ephemeral.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-4-03",
      number: "4.3",
      title: "Máy trạng thái TCP (TCP State Machine) & Bí mật trạng thái TIME_WAIT",
      subtitle: "Sơ đồ 11 trạng thái TCP, quá trình đóng 4 bước FIN-ACK, tại sao TIME_WAIT kéo dài 2*MSL và tham số tcp_tw_reuse",
      level: "Nâng cao",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Mổ xẻ máy trạng thái TCP và bản chất bảo vệ kết nối của trạng thái TIME_WAIT.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-4-04",
      number: "4.4",
      title: "Đảm bảo độ tin cậy: Sequence Numbers, Cumulative ACK & Cơ chế Truyền lại",
      subtitle: "Sliding Window, tính toán RTT/RTO động, cơ chế Fast Retransmit (3 Dup ACKs) và kỹ thuật Selective Acknowledgment (SACK)",
      level: "Nâng cao",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá cơ chế cửa sổ trượt và thuật toán phát hiện rớt gói tin để truyền lại kịp thời.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-4-05",
      number: "4.5",
      title: "Kiểm soát luồng (Flow Control) vs Kiểm soát tắc nghẽn (Congestion Control: Cubic vs BBR)",
      subtitle: "Đối chiếu rwnd vs cwnd, Slow Start, Congestion Avoidance, Bufferbloat và theo dõi chỉ số socket qua ss -ti",
      level: "Nâng cao",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Phân biệt bảo vệ máy nhận (flow control) và bảo vệ mạng truyền dẫn (congestion control) bằng thuật toán Cubic và BBR.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-4-06",
      number: "4.6",
      title: "Bản chất của QUIC: Giao thức Ứng dụng trên nền UDP",
      subtitle: "Bản chất: QUIC chạy ở tầng ứng dụng trên UDP thay thế TCP+TLS+HTTP/2, giải quyết Head-of-Line Blocking và 0-RTT Connection",
      level: "Nâng cao",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá lý do ra đời của giao thức QUIC và cách nó giải quyết triệt để các hạn chế cố hữu của TCP.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-4-07",
      number: "4.7",
      title: "Điều tiết băng thông & QoS với Linux tc (Traffic Control)",
      subtitle: "Kiến trúc qdisc, class, filter, các thuật toán HTB, TBF, fq_codel, phân biệt Traffic Shaping vs Policing và DSCP marking",
      level: "Nâng cao",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Sử dụng công cụ tc của Linux để điều tiết băng thông, mô phỏng mạng xấu và ưu tiên gói tin QoS.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
