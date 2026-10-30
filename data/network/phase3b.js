/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 3b: Định tuyến IP & Giao thức Định tuyến Động FRR (Phase 3b)
 */

window.NET_PHASE3B_DATA = {
  id: "part-net-3b",
  number: "Giai đoạn 3b",
  title: "Định tuyến IP & Giao thức Định tuyến Động FRR",
  level: "Trung cấp",
  badge: "GĐ 3b",
  description: "Bản chất: Router chọn đường bằng thuật toán khớp tiền tố dài nhất (Longest Prefix Match) trên bảng định tuyến; giao thức định tuyến giúp các router tự động chia sẻ bản đồ mạng.",
  lessons: [
    {
      id: "net-3b-01",
      number: "3b.1",
      title: "Nguyên lý Longest Prefix Match & Kernel Forwarding (net.ipv4.ip_forward)",
      subtitle: "Bảng FIB vs RIB, Default Gateway, Direct Connected vs Indirect Route, và tra cứu bảng định tuyến bằng ip route",
      level: "Trung cấp",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Phân tích bảng FIB trong Linux kernel và nguyên lý router lựa chọn đường đi theo tiền tố dài nhất.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-3b-02",
      number: "3b.2",
      title: "Định tuyến tĩnh & Định tuyến theo chính sách (Policy-Based Routing - ip rule)",
      subtitle: "Multi-homed Server, bảng định tuyến tùy biến, định tuyến theo IP nguồn, cổng dịch vụ và fwmark",
      level: "Trung cấp",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Cấu hình định tuyến nâng cao theo chính sách PBR trên Linux cho máy chủ đa card mạng.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-3b-03",
      number: "3b.3",
      title: "Lý thuyết Định tuyến Động: Distance-Vector vs Link-State",
      subtitle: "Hội tụ mạng, Split Horizon, Poison Reverse, giải thuật Dijkstra SPF và so sánh RIP vs OSPF vs BGP",
      level: "Trung cấp",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tìm hiểu nguyên lý các giao thức định tuyến tự động chia sẻ bản đồ mạng và tránh vòng lặp.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-3b-04",
      number: "3b.4",
      title: "Định tuyến Nội bộ OSPF với FRRouting (FRR)",
      subtitle: "Cơ chế Adjacency, Hello Packet, LSA, OSPF Area 0, cấu hình và vận hành phần mềm FRR qua vtysh",
      level: "Trung cấp",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Thiết lập OSPF dynamic routing bằng FRRouting trên Linux và quan sát quá trình tự hội tụ mạng.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-3b-05",
      number: "3b.5",
      title: "Định tuyến Liên miền BGP (Border Gateway Protocol) ở Mức Cơ Chế",
      subtitle: "BGP Path Attributes: AS-Path, Next-Hop, Local Preference, MED và quan sát eBGP giữa 2 Hệ thống Tự trị AS",
      level: "Trung cấp",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá giao thức định tuyến liên kết toàn bộ Internet và các thuộc tính điều hướng đường đi BGP.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
