/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 7: Bảo mật & VPN Phòng thủ (Phase 7)
 */

window.NET_PHASE7_DATA = {
  id: "part-net-7",
  number: "Giai đoạn 7",
  title: "Bảo mật & VPN Phòng thủ",
  level: "Chuyên sâu",
  badge: "GĐ 7",
  description: "Bản chất: Bảo mật mạng là bài toán tin cậy: Ai là ai, ai được làm gì, dữ liệu có bị nghe lén hay can thiệp không; phòng thủ dựa trên hiểu rõ bản chất tấn công.",
  lessons: [
    {
      id: "net-7-01",
      number: "7.1",
      title: "Mô hình Đe dọa (Threat Modeling), Phân đoạn mạng & Tư duy Zero Trust",
      subtitle: "Vùng DMZ, Bastion Host, Network Segmentation và nguyên tắc xác thực mọi truy cập không tin cậy ngầm",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Phân tích mô hình đe dọa mạng và thiết kế kiến trúc phân đoạn mạng an toàn theo nguyên tắc Zero Trust.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-7-02",
      number: "7.2",
      title: "Vận hành PKI Doanh nghiệp & Vòng đời Chứng chỉ",
      subtitle: "Tự động hóa gia hạn với ACME/Let's Encrypt, mTLS - Mutual TLS trong giao tiếp Microservices và quản lý khóa an toàn",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Triển khai hạ tầng khóa công khai trong doanh nghiệp và áp dụng mTLS cho microservices.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-7-03",
      number: "7.3",
      title: "Mạng Riêng Ảo (VPN): IPsec vs Kiến trúc hiện đại WireGuard",
      subtitle: "Giao diện wg0, Noise Protocol, Cryptokey Routing, cấu hình VPN Site-to-Site và Road-Warrior",
      level: "Chuyên sâu",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>So sánh giao thức IPsec với WireGuard và tự tay thiết lập đường hầm VPN mã hóa hiệu năng cao.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-7-04",
      number: "7.4",
      title: "Mổ xẻ Tấn công L2/L3 trong Lab Cô lập & Cơ chế Phòng ngừa",
      subtitle: "Thực nghiệm ARP Spoofing / Man-in-the-Middle trong namespace, bắt gói bằng tcpdump, thiết lập Static ARP và Dynamic ARP Inspection (DAI)",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Mô phỏng tấn công mạng cục bộ trong môi trường cô lập an toàn để hiểu cặn kẽ cách phòng ngừa.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-7-05",
      number: "7.5",
      title: "Rà soát An ninh với Nmap & Tự động Phòng vệ bằng Fail2ban",
      subtitle: "TCP SYN scan (-sS), Service detection (-sV), cơ chế Jail đọc log xác thực và tự đẩy luật chặn vào nftables",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Quét lỗ hổng cổng dịch vụ bằng Nmap và cấu hình hệ thống phòng thủ tự động với Fail2ban.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
