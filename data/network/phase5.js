/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 5: Netfilter, nftables, conntrack, NAT & Firewall (Phase 5)
 */

window.NET_PHASE5_DATA = {
  id: "part-net-5",
  number: "Giai đoạn 5",
  title: "Netfilter, nftables, conntrack, NAT & Firewall",
  level: "Chuyên sâu",
  badge: "GĐ 5",
  description: "Bản chất: Gói tin đi qua các điểm móc (hooks) trong kernel; firewall và NAT là các luật gắn vào các móc đó; connection tracking là bộ nhớ trạng thái giúp kernel nhận diện luồng kết nối.",
  lessons: [
    {
      id: "net-5-01",
      number: "5.1",
      title: "Kiến trúc Netfilter & Bản đồ hành trình gói tin qua 5 Hooks",
      subtitle: "Theo dõi luồng di chuyển của sk_buff qua PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING trong Linux Kernel",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Vẽ sơ đồ luồng gói tin đi qua các mốc hook của Netfilter trong nhân Linux.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-5-02",
      number: "5.2",
      title: "Connection Tracking (conntrack): Bộ nhớ trạng thái của Kernel",
      subtitle: "Giải phẫu 4 trạng thái NEW, ESTABLISHED, RELATED, INVALID, kiểm tra conntrack -L và phân tích sự cố tràn bảng conntrack_max",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tìm hiểu cơ chế kernel theo dõi phiên kết nối thông qua conntrack table.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-5-03",
      number: "5.3",
      title: "Tường lửa hiện đại với nftables & Đối chiếu iptables cũ",
      subtitle: "Cấu trúc Table/Chain/Rule, cú pháp nft add rule, hiệu năng xử lý gói tin và cách chuyển đổi từ cú pháp iptables cũ",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Làm chủ công cụ tường lửa thế hệ mới nftables và viết các bộ lọc lưu lượng có trạng thái.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-5-04",
      number: "5.4",
      title: "Bản chất NAT: SNAT, Masquerade và Port Forwarding (DNAT)",
      subtitle: "Source NAT tại POSTROUTING, Destination NAT tại PREROUTING và bảng chuyển dịch địa chỉ trong Conntrack",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Mổ xẻ bản chất của Network Address Translation và cơ chế định vị cổng dịch vụ.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
