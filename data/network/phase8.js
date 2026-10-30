/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 8: Container, Overlay & Cloud Networking (Phase 8)
 */

window.NET_PHASE8_DATA = {
  id: "part-net-8",
  number: "Giai đoạn 8",
  title: "Container, Overlay & Cloud Networking",
  level: "Chuyên sâu",
  badge: "GĐ 8",
  description: "Bản chất: Mạng container chính là namespace, veth, bridge, NAT được tự động hóa bằng phần mềm; overlay là đóng gói gói tin này bên trong gói tin khác để đi qua mạng vật lý.",
  lessons: [
    {
      id: "net-8-01",
      number: "8.1",
      title: "Giải phẫu Mạng Docker: Network Namespaces, veth pair & Docker0 Bridge",
      subtitle: "Mổ xẻ từng lệnh Docker tạo ngầm dưới kernel, iptables NAT table của Docker daemon và cơ chế publish port",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tìm hiểu các thành phần hạt nhân Linux tạo nên hệ thống mạng của Docker container.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-8-02",
      number: "8.2",
      title: "Mạng Overlay & Công nghệ VXLAN (Virtual Extensible LAN)",
      subtitle: "Cơ chế đóng gói MAC-in-UDP cổng 4789, tạo giao diện type vxlan trên Linux, giải bài toán giới hạn 4096 VLAN",
      level: "Chuyên sâu",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá công nghệ mạng phủ VXLAN kết nối các cụm máy chủ phân tán.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-8-03",
      number: "8.3",
      title: "Mạng Kubernetes: Flat Pod Network, CNI Plugin & kube-proxy",
      subtitle: "Mô hình Pod-to-Pod, CNI Flannel vs Calico, ClusterIP, iptables mode vs IPVS mode và cân bằng tải dịch vụ",
      level: "Chuyên sâu",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Phân tích mô hình mạng phẳng của Kubernetes và kiến trúc điều phối lưu lượng Pod-to-Pod.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-8-04",
      number: "8.4",
      title: "Mạng Đám mây (Cloud VPC Architecture)",
      subtitle: "Subnet, Route Table, Internet Gateway, NAT Gateway, Security Groups & Network ACLs đối chiếu với Linux Kernel components",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Đối chiếu kiến trúc mạng đám mây VPC với các công cụ mạng quen thuộc trên Linux.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-8-05",
      number: "8.5",
      title: "Kiến trúc Mạng do Phần mềm Định nghĩa (SDN) & Tương lai Networking",
      subtitle: "Bóc tách Control Plane vs Data Plane, OpenFlow ở mức khái niệm, xu hướng dịch chuyển sang Programmable Datapath",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá kiến trúc mạng SDN hiện đại và xu hướng lập trình hóa tầng chuyển tiếp dữ liệu.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
