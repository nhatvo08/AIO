/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 1: Bản chất mạng và phân tầng (Phase 1)
 */

window.NET_PHASE1_DATA = {
  id: "part-net-1",
  number: "Giai đoạn 1",
  title: "Bản chất mạng và phân tầng",
  level: "Nền tảng",
  badge: "GĐ 1",
  description: "Bản chất: mạng giải các bài toán đánh địa chỉ, đi đường, tin cậy, chia sẻ đường truyền; phân tầng và đóng gói (encapsulation) là cách chia nhỏ bài toán.",
  lessons: [
    {
      id: "net-1-01",
      number: "1.1",
      title: "Vì sao mạng phải phân tầng? Bài toán chia sẻ đường truyền & Đóng gói dữ liệu",
      subtitle: "Nghịch lý kết nối điểm-điểm, sự cần thiết của Header/Payload và cơ chế Encapsulation/Decapsulation",
      level: "Nền tảng",
      duration: "90 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Phân tích bài toán chia sẻ đường truyền, hiện tượng đóng gói và bóc tách dữ liệu theo mô hình phân tầng.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-1-02",
      number: "1.2",
      title: "Mô hình OSI vs TCP/IP dưới lăng kính Kernel Linux (sk_buff)",
      subtitle: "Bác bỏ hiểu lầm học vẹt về 7 tầng OSI; khám phá cấu trúc dữ liệu struct sk_buff trong bộ nhớ nhân Linux",
      level: "Nền tảng",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Khám phá cách Linux Kernel biểu diễn một gói tin bằng struct sk_buff và con trỏ dịch chuyển qua các header.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-1-03",
      number: "1.3",
      title: "Đo lường hiệu năng mạng: Latency, Bandwidth, Throughput, RTT & Jitter",
      subtitle: "Phân biệt rạch ròi độ rộng ống nước vs tốc độ dòng chảy; tính toán độ trễ lan truyền và Serialization Delay",
      level: "Nền tảng",
      duration: "90 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Định lượng chính xác các thông số đo lường hiệu năng mạng và tích số băng thông - độ trễ (BDP).</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-1-04",
      number: "1.4",
      title: "Bắt và giải mã gói tin: ping, tcpdump và Wireshark theo từng byte nhị phân",
      subtitle: "Sử dụng tcpdump -i any -nn -XX, mổ xẻ cấu trúc hex và giải mã từng byte offset của khung ICMP Echo Request/Reply",
      level: "Nền tảng",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Thực hành bắt gói tin trực tiếp trên card mạng và giải mã từng trường trong header nhị phân.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
