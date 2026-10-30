/**
 * Dữ liệu Chuyên đề Networking trên Linux
 * GIAI ĐOẠN 10: Lập trình mạng bằng Python trên Linux (Phase 10)
 */

window.NET_PHASE10_DATA = {
  id: "part-net-10",
  number: "Giai đoạn 10",
  title: "Lập trình Mạng bằng Python trên Linux",
  level: "Chuyên sâu",
  badge: "GĐ 10",
  description: "Bản chất: Lập trình mạng là gọi Syscall xuống kernel; socket stream là dòng byte vô tận không có ranh giới tin nhắn; Async I/O và epoll giải quyết bài toán triệu kết nối đồng thời.",
  lessons: [
    {
      id: "net-10-01",
      number: "10.1",
      title: "Syscall Socket API trên Linux & Module socket trong Python",
      subtitle: "Mổ xẻ socket(), bind(), listen(), accept(), send(), recv(), close() và quan sát trạng thái tương ứng trong /proc/<pid>/fd",
      level: "Chuyên sâu",
      duration: "90 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Tìm hiểu cách Python wrap các lời gọi hệ thống của Linux kernel để giao tiếp mạng.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-10-02",
      number: "10.2",
      title: "Xây dựng TCP Echo Server & Client: Quan sát Trạng thái Socket từ Kernel",
      subtitle: "Bản chất truyền nhận byte stream, theo dõi các trạng thái ESTABLISHED, CLOSE_WAIT, TIME_WAIT bằng lệnh ss",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Thực hành viết cặp chương trình TCP client/server và đối chiếu với bảng trạng thái trong kernel.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-10-03",
      number: "10.3",
      title: "Bài toán Concurrency & Sự Tiến Hóa của Mô Hình I/O: Blocking -> Multi-threading -> select() -> epoll",
      subtitle: "Giải bài toán C10K, vì sao epoll có độ phức tạp O(1) so với O(N) của select, cơ chế Event Loop",
      level: "Chuyên sâu",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Giải quyết bài toán phục vụ hàng vạn kết nối đồng thời bằng các mô hình I/O khác nhau trong kernel.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-10-04",
      number: "10.4",
      title: "Lập trình Mạng Bất đồng bộ Hiệu năng cao với Python asyncio",
      subtitle: "asyncio.start_server, StreamReader, StreamWriter, xử lý hàng ngàn kết nối đồng thời trên một tiến trình đơn luồng",
      level: "Chuyên sâu",
      duration: "150 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Xây dựng máy chủ bất đồng bộ hiệu năng cao sử dụng thư viện asyncio của Python.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-10-05",
      number: "10.5",
      title: "Tự Thiết Kế Giao Thức Ứng Dụng: Bài toán Đóng Gói (Framing) & Bóc Tách Tin Nhắn",
      subtitle: "TCP Stream không có ranh giới gói tin, xử lý dính gói (Packet Sticking), phân định tin nhắn bằng Delimiter vs Header Length-Prefix với module struct",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Thiết kế định dạng gói tin tầng ứng dụng an toàn và xử lý bóc tách tin nhắn trên luồng TCP.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    },
    {
      id: "net-10-06",
      number: "10.6",
      title: "Bắt và Thao tác Gói Tin Cấp Thấp với Scapy & Raw Socket",
      subtitle: "Tự tay nhào nặn từng bit trong IP/TCP Header, gửi nhận Raw Socket, viết công cụ ARP Ping và TCP Port Scanner mini",
      level: "Chuyên sâu",
      duration: "120 phút",
      sections: [{ id: "sec-intro", title: "Tổng quan bài học", content: "<p>Can thiệp và tạo thủ công các gói tin mạng cấp thấp phục vụ kiểm thử bảo mật với Scapy.</p>" }],
      summary: ["Bài học đang trong kế hoạch triển khai chi tiết."]
    }
  ]
};
