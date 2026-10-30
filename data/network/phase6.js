/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 6: Tầng ứng dụng (L7): DNS, Anycast, PKI, HTTP & TLS (Phase 6)
 */

window.NET_PHASE6_DATA = {
  id: "part-net-6",
  number: "Giai đoạn 6",
  title: "Tầng ứng dụng (L7): DNS, Anycast, PKI, HTTP & TLS",
  level: "Chuyên sâu",
  badge: "GĐ 6",
  description: "Bản chất: Tên miền là nhãn phân cấp phân tán; Anycast tối ưu định tuyến theo vị trí gần nhất; PKI là nền tảng tin cậy; HTTP và TLS là cách ứng dụng thỏa thuận và mã hóa hội thoại.",
  lessons: [
    {
      id: "net-6-01",
      number: "6.1",
      title: "Hệ thống DNS: Phân cấp tên miền, Caching & Truy vết với dig +trace",
      subtitle: "Root hints, TLD, Authoritative, Recursive vs Iterative Resolver, các loại bản ghi A/AAAA/CNAME/MX/TXT/SRV",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tìm hiểu cơ chế phân giải tên miền phân tán và kỹ thuật chẩn đoán DNS chuyên sâu bằng dig.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-6-02",
      number: "6.2",
      title: "Kiến trúc Anycast trong Mạng Hiện Đại",
      subtitle: "So sánh Unicast vs Multicast vs Anycast; cách DNS Root Servers, Cloudflare 1.1.1.1, CDN và hệ thống chống DDoS dùng Anycast qua BGP",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá kiến trúc Anycast cho phép nhiều máy chủ vật lý cùng chia sẻ một địa chỉ IP duy nhất trên toàn cầu.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-6-03",
      number: "6.3",
      title: "Nền tảng PKI Cốt Lõi: Mật Mã Học, X.509 & Chuỗi Tin Cậy",
      subtitle: "Mã hóa đối xứng vs bất đối xứng, cặp khóa công khai/bí mật, Root CA, Intermediate CA, Certificate Chain và thu hồi CRL/OCSP",
      level: "Chuyên sâu",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Nắm vững cơ chế mật mã học bảo vệ kênh truyền và cách thức xây dựng chuỗi tin cậy số.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-6-04",
      number: "6.4",
      title: "Giao thức Bảo mật TLS 1.3 & Quá Trình Bắt Tay Mã Hóa",
      subtitle: "Bắt tay 1-RTT, ECDHE Key Exchange, Perfect Forward Secrecy, Server Name Indication (SNI) và kiểm tra bằng openssl s_client",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Giải phẫu quá trình bắt tay TLS 1.3 tối ưu hóa độ trễ và bảo vệ toàn vẹn dữ liệu.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-6-05",
      number: "6.5",
      title: "Sự tiến hóa của Web: HTTP/1.1 -> HTTP/2 -> HTTP/3 & Nginx Reverse Proxy",
      subtitle: "Keep-Alive, Pipelining, Multiplexing nhị phân, HPACK, HTTP/3 qua QUIC và cân bằng tải L4 vs L7 bằng Nginx/HAProxy",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>So sánh kiến trúc các thế hệ giao thức web và cấu hình Reverse Proxy cân bằng tải.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-6-06",
      number: "6.6",
      title: "Quản trị An toàn với SSH & Nghệ thuật tạo SSH Tunneling",
      subtitle: "Host keys, Public key auth, Local (-L), Remote (-R), Dynamic SOCKS5 Proxy (-D) và phân tích luồng kết nối mã hóa",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Thành thạo công cụ quản trị từ xa SSH và thiết lập các đường hầm bảo mật linh hoạt.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
