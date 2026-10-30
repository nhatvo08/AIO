/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 11: Đồ Án Tốt Nghiệp: Hạ Tầng Mạng Doanh Nghiệp Quy Mô Lớn (Phase 11)
 */

window.NET_PHASE11_DATA = {
  id: "part-net-11",
  number: "Giai đoạn 11",
  title: "Đồ Án Tốt Nghiệp: Hạ Tầng Mạng Doanh Nghiệp Quy Mô Lớn",
  level: "Chuyên sâu",
  badge: "GĐ 11",
  description: "Bản chất: Tổng hòa toàn bộ tri thức từ L1 đến L7, tự tay thiết kế, dựng từ đầu, cấu hình, bảo mật, tối ưu và gỡ lỗi một hệ thống mạng thực thụ.",
  lessons: [
    {
      id: "net-11-01",
      number: "11.1",
      title: "Thiết kế Kiến trúc & Bảng Địa Chỉ Mạng Doanh Nghiệp Đa Chi Nhánh (Blueprint Design)",
      subtitle: "Thiết kế trụ sở chính HQ, 2 chi nhánh Branch, phân vùng DMZ, VLSM, VLAN IDs, OSPF Areas, WireGuard Site-to-Site VPN, chính sách tường lửa Zero Trust",
      level: "Chuyên sâu",
      duration: "180 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Lập bản vẽ kỹ thuật chi tiết toàn bộ hạ tầng mạng doanh nghiệp trước khi bắt tay vào triển khai.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-11-02",
      number: "11.2",
      title: "Triển khai Hạ tầng Định tuyến L3 & Mạng Ảo trên Containerlab + FRRouting",
      subtitle: "Dựng topo gồm 5 router FRR nối các subnet, cấu hình OSPF Area 0 và Area 1, kiểm tra bảng FIB/RIB và hội tụ đường truyền",
      level: "Chuyên sâu",
      duration: "180 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Dựng xương sống định tuyến động cho toàn bộ hệ thống mạng đa chi nhánh.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-11-03",
      number: "11.3",
      title: "Triển khai Dịch vụ Cốt lõi: DHCP, DNS Phân giải Nội bộ & NAT Gateway",
      subtitle: "Cấu hình dnsmasq cấp IP động theo VLAN, dựng Authoritative DNS cho domain nội bộ .corp, cấu hình Masquerade NAT ra Internet",
      level: "Chuyên sâu",
      duration: "180 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Hiện thực hóa các dịch vụ mạng nền tảng để các máy trạm tự động kết nối và phân giải tên miền.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-11-04",
      number: "11.4",
      title: "Bảo Mật Toàn Diện với nftables Stateful Firewall & WireGuard Mesh",
      subtitle: "Thiết lập tường lửa bảo vệ từng vùng mạng, mở Port Forwarding DNAT an toàn, cấu hình đường hầm WireGuard mã hóa dữ liệu liên chi nhánh",
      level: "Chuyên sâu",
      duration: "180 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Thiết lập lá chắn bảo vệ hạ tầng và kết nối mạng riêng ảo bảo mật giữa các chi nhánh.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-11-05",
      number: "11.5",
      title: "Cụm Dịch Vụ Web Ứng Dụng với HA Reverse Proxy & HTTPS TLS 1.3",
      subtitle: "Dựng cụm Nginx Reverse Proxy cân bằng tải cho các microservices backend, cài đặt chứng chỉ SSL/TLS từ CA nội bộ",
      level: "Chuyên sâu",
      duration: "180 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Triển khai cụm dịch vụ web an toàn với khả năng cân bằng tải và chấm dứt mã hóa TLS 1.3.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-11-06",
      number: "11.6",
      title: "Giám Sát Hạ Tầng với Prometheus/Grafana & Diễn Tập Sự Cố (Chaos Engineering Drill)",
      subtitle: "Thu thập metrics băng thông và socket drop; thực hiện diễn tập: cắt cáp OSPF, làm nghẽn băng thông, mô phỏng tấn công ARP Spoofing và phục hồi trong 15 phút",
      level: "Chuyên sâu",
      duration: "240 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Diễn tập xử lý sự cố thực chiến và nghiệm thu đồ án tốt nghiệp toàn diện.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
