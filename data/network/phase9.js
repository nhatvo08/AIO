/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 9: Vận hành, Gỡ lỗi, eBPF & Tự động hóa mạng (Phase 9)
 */

window.NET_PHASE9_DATA = {
  id: "part-net-9",
  number: "Giai đoạn 9",
  title: "Vận hành, Gỡ lỗi, eBPF & Tự động hóa Mạng",
  level: "Chuyên sâu",
  badge: "GĐ 9",
  description: "Bản chất: Sự cố mạng để lại dấu vết ở mọi tầng; kỹ sư giỏi gỡ lỗi có phương pháp từ L1 lên L7; eBPF cho phép quan sát sâu trong nhân mà không làm chậm hệ thống.",
  lessons: [
    {
      id: "net-9-01",
      number: "9.1",
      title: "Quy trình Gỡ lỗi Mạng Chuẩn mực: Phương pháp Bottom-Up (L1 -> L7)",
      subtitle: "Checklist 6 bước loại trừ có hệ thống: Link -> ARP -> Route -> Firewall -> Socket -> App DNS/TLS",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Phương pháp luận gỡ lỗi mạng chuẩn mực từ tầng vật lý lên tầng ứng dụng giúp thu hẹp nguyên nhân sự cố trong vài phút.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-9-02",
      number: "9.2",
      title: "Khám nghiệm 5 Bệnh án Mạng Kinh điển trong Môi trường Thực tế",
      subtitle: "Giải phẫu chi tiết: MTU Blackhole, Asymmetric Routing, DNS Timeout, Cạn bảng Conntrack & Port Exhaustion",
      level: "Chuyên sâu",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám nghiệm hiện trường và phác đồ điều trị 5 sự cố mạng kinh điển hay gặp nhất tại doanh nghiệp.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-9-03",
      number: "9.3",
      title: "Bộ Công cụ Khám nghiệm Chuyên sâu trên Linux",
      subtitle: "ethtool -S xem drop ring buffer, ip -s link, ss -s, mtr phân tích packet loss từng hop và bộ lọc BPF phức tạp với tcpdump",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Làm chủ các công cụ dòng lệnh chuyên sâu đo lường chỉ số card mạng và bắt gói tin có chọn lọc.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-9-04",
      number: "9.4",
      title: "Tối ưu hóa Network Stack qua sysctl net.* & Giám sát với Prometheus",
      subtitle: "Tuning TCP buffers rmem/wmem, somaxconn, tcp_max_syn_backlog và xuất metrics mạng ra Grafana Dashboard",
      level: "Chuyên sâu",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tinh chỉnh các tham số kernel để máy chủ Linux xử lý hàng trăm nghìn kết nối đồng thời và giám sát thời gian thực.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-9-05",
      number: "9.5",
      title: "Thực hành Quan sát Mạng Chuyên sâu với eBPF & bpftrace",
      subtitle: "eBPF kernel bytecode, so sánh bpftrace vs tcpdump, vì sao Cilium thay thế iptables, và viết script one-liner đo độ trễ syscall sendto",
      level: "Chuyên sâu",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá công nghệ mang tính cách mạng eBPF để nhìn sâu vào luồng xử lý gói tin trong nhân Linux.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-9-06",
      number: "9.6",
      title: "Tự động hóa Cấu hình Mạng (Network Automation) với Ansible & FRRouting",
      subtitle: "Triết lý Infrastructure as Code, Ansible inventory, NETCONF/YANG khái niệm, và viết playbook cấu hình OSPF cho cụm router FRR",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tự động hóa cấu hình hạ tầng mạng bằng Ansible đảm bảo tính Idempotent và chống lỗi con người.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
