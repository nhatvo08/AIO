/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 3a: Địa chỉ hóa L3, DHCP & Thế hệ mới IPv6 (Phase 3a)
 */

window.NET_PHASE3A_DATA = {
  id: "part-net-3a",
  number: "Giai đoạn 3a",
  title: "Địa chỉ hóa L3, DHCP & Thế hệ mới IPv6",
  level: "Trung cấp",
  badge: "GĐ 3a",
  description: "Bản chất: Địa chỉ IP là định danh logic toàn cầu; Subnetting chia nhỏ không gian mạng; DHCP tự động hóa cấp phát; IPv6 giải quyết triệt để cạn kiệt địa chỉ.",
  lessons: [
    {
      id: "net-3a-01",
      number: "3a.1",
      title: "Số học nhị phân, Kiến trúc IPv4, CIDR & Kỹ thuật chia mạng con (VLSM)",
      subtitle: "Làm chủ phép toán bitwise AND, Subnet Mask, Wildcard Mask và bài toán phân bổ không gian địa chỉ tối ưu",
      level: "Trung cấp",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Thành thạo chia mạng con nhị phân không cần bảng tra và làm chủ phương pháp tính VLSM với các con số cụ thể.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-3a-02",
      number: "3a.2",
      title: "Giải phẫu chi tiết IPv4 Header từng trường",
      subtitle: "Phân tích 20-byte IPv4 Header: IHL, ToS/DSCP, Total Length, Identification, Flags DF/MF, TTL, Protocol, Checksum",
      level: "Trung cấp",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Giải mã từng trường bit trong gói tin IPv4 và cơ chế bảo toàn dữ liệu trên đường truyền.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-3a-03",
      number: "3a.3",
      title: "Cấu hình IP Động với Giao thức DHCP (Dynamic Host Configuration Protocol)",
      subtitle: "Bài toán cấu hình thủ công vs tự động, chu trình 4 bước DORA, Lease time, DHCP Relay, và các Options cốt lõi 3, 6, 51, 121",
      level: "Trung cấp",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tìm hiểu cơ chế cấp phát IP tự động qua DHCP, phân tích các gói tin DORA và cấu hình dnsmasq làm DHCP server.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-3a-04",
      number: "3a.4",
      title: "ICMP, TTL, MTU, Phân mảnh gói tin & Cơ chế phát hiện MTU đường truyền (PMTUD)",
      subtitle: "Giải phẫu ICMP Type/Code, cờ DF/MF, Offset, sự cố MTU Blackhole Router và cách Kernel Linux xử lý",
      level: "Trung cấp",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá cơ chế phân mảnh gói tin và cách giao thức Path MTU Discovery vận hành khi gặp blackhole router.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-3a-05",
      number: "3a.5",
      title: "Thế hệ mới IPv6: Cấu trúc địa chỉ, Tự cấu hình SLAAC & Giao thức NDP",
      subtitle: "Link-Local, Global Unicast, Solicited-Node Multicast, gói tin RS/RA, NS/NA thay thế ARP và tinh giản IPv6 Header",
      level: "Trung cấp",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá kiến trúc 128-bit của IPv6 và các cơ chế thay thế hoàn toàn ARP và Broadcast.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-3a-06",
      number: "3a.6",
      title: "Chiến lược chuyển dịch IPv6 (IPv6 Transition Technologies)",
      subtitle: "Dual-Stack, NAT64 + DNS64, 464XLAT và giải đáp vì sao Internet toàn cầu chưa thể chuyển dịch hoàn toàn sang IPv6 thuần",
      level: "Trung cấp",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khảo sát các công nghệ chuyển dịch IPv6 sang IPv4 và lab dựng đường hầm NAT64.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
