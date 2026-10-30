/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 2: Liên kết dữ liệu (L2): Ethernet, Switch, VLAN & Multicast (Phase 2)
 */

window.NET_PHASE2_DATA = {
  id: "part-net-2",
  number: "Giai đoạn 2",
  title: "Liên kết dữ liệu (L2): Ethernet, Switch, VLAN & Multicast",
  level: "Cơ bản",
  badge: "GĐ 2",
  description: "Bản chất: trong mạng cục bộ định danh là MAC; switch học bảng FDB để chuyển tiếp khung; VLAN phân tách broadcast domain; Multicast tối ưu một gửi - nhiều nhận.",
  lessons: [
    {
      id: "net-2-01",
      number: "2.1",
      title: "Khung Ethernet & Địa chỉ MAC: Giao tiếp trong Miền Broadcast",
      subtitle: "Cấu trúc khung chuẩn Ethernet II, Preamble, SFD, Unicast/Multicast/Broadcast, và kiểm tra lỗi FCS CRC32",
      level: "Cơ bản",
      duration: "90 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tìm hiểu cấu trúc chi tiết của Ethernet Frame và vai trò của địa chỉ MAC trong mạng cục bộ.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-2-02",
      number: "2.2",
      title: "Giao thức ARP (Address Resolution Protocol) & Bộ nhớ đệm lân cận (ip neigh)",
      subtitle: "Cơ chế ánh xạ IP thành MAC, vòng đời ARP Cache (REACHABLE/STALE/FAILED) và phân tích sự cố ARP spoofing",
      level: "Cơ bản",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Phân tích giao thức ARP và cách Linux lưu trữ bảng láng giềng qua ip neigh.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-2-03",
      number: "2.3",
      title: "Cơ chế học của Switch & Linux Bridge (ip link add br0 type bridge)",
      subtitle: "Thuật toán Forwarding Database (FDB), flooding, learning, aging và tự dựng switch ảo bằng Linux bridge và veth pair",
      level: "Cơ bản",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá cách Switch học địa chỉ MAC và biến Linux thành Switch phần mềm bằng bridge.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-2-04",
      number: "2.4",
      title: "VLAN IEEE 802.1Q: Chia cắt miền Broadcast & VLAN Sub-interfaces",
      subtitle: "Cấu trúc tag 4-byte 802.1Q, TPID, TCI, VID, Access port vs Trunk port, và tạo VLAN sub-interface trên Linux",
      level: "Cơ bản",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Cơ chế phân tách mạng cục bộ ảo bằng VLAN và cấu hình sub-interface eth0.10 trên Linux.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-2-05",
      number: "2.5",
      title: "Multicast & IGMP: Bài toán Một Gửi - Nhiều Nhận",
      subtitle: "Dải địa chỉ IPv4 Multicast 224.0.0.0/4, IGMP Membership Report/Query, IGMP Snooping trên Switch, lab socat và ip maddr show",
      level: "Cơ bản",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá bản chất của Multicast, giao thức IGMP và cách switch tối ưu một gửi nhiều nhận.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-2-06",
      number: "2.6",
      title: "Chống lặp vòng với STP (Spanning Tree Protocol) & Cơ chế Wi-Fi 802.11",
      subtitle: "Thảm họa Broadcast Storm khi có vòng lặp L2, BPDU, Root Bridge và so sánh CSMA/CD với CSMA/CA",
      level: "Cơ bản",
      duration: "90 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tìm hiểu cơ chế chống lặp vòng STP và đặc tính không dây của giao thức 802.11.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
