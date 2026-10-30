# Kế Hoạch Đào Tạo: Networking Chuyên Sâu Trên Linux (Bản Cập Nhật Toàn Diện v3)

> **Tài liệu Kế hoạch Kỹ thuật & Giáo trình Thực chiến (Master Curriculum & Implementation Plan)**  
> **Kiến trúc sư & Giảng viên**: Kiến trúc sư Hạ tầng Mạng Linux (15+ năm kinh nghiệm thực chiến)  
> **Triết lý cốt lõi**: Đi từ bài toán trước, từ nguyên lý đầu tiên (First-Principles), học qua vòng lặp **HIỂU ➔ QUAN SÁT ➔ TỰ DỰNG ➔ CỐ TÌNH PHÁ ➔ GỠ LỖI**.  
> **Tuân thủ quy chuẩn**: [05-quy-chuan-uiux-bai-hoc.md](05-quy-chuan-uiux-bai-hoc.md), [01-bat-bien.md](01-bat-bien.md), [03-quy-trinh.md](03-quy-trinh.md).

---

## 1. Mục Tiêu Khóa Học & Năng Lực Đầu Ra

Sau khi hoàn thành chương trình, người học đạt được 4 năng lực kỹ thuật vững chắc:
1. **Giải thích bản chất thiết kế mạng**: Trả lời được câu hỏi *"Vì sao mạng được thiết kế như vậy?"* từ góc nhìn lịch sử và bài toán kỹ thuật mà các kỹ sư tiền bối phải giải quyết.
2. **Mô tả tường tận hành trình gói tin trong Linux Kernel**: Lần theo từng byte nhị phân qua các tầng mạng, cấu trúc dữ liệu `struct sk_buff`, bảng hàm VFS `socket_file_ops`, 5 Netfilter hooks và bảng FIB/RIB định tuyến.
3. **Tự dựng, cấu hình, quan sát và gỡ lỗi mạng hoàn chỉnh**: Làm chủ toàn bộ công cụ thực chiến hiện đại (`iproute2`, `nftables`, `tcpdump`, `tc-netem`, `FRRouting`, `WireGuard`, `containerlab`, `bpftrace`).
4. **Tự lập trình ứng dụng mạng bằng Python**: Nắm vững Socket API syscall, mô hình bất đồng bộ Non-blocking/`epoll` (`asyncio`), tự đóng gói bóc tách giao thức và thao tác Raw Packet với Scapy.

---

## 2. Bảng Đối Chiếu Công Cụ Phòng Lab Thực Hành (Lab Tooling Matrix)

Toàn bộ thực hành chạy trong môi trường mạng ảo cô lập 100% an toàn trên máy Linux (Ubuntu 22.04/24.04 LTS, Debian 12 hoặc WSL2/VM):

| Công cụ | Phạm vi sử dụng chính | Ưu điểm cốt lõi | Hạn chế & Lưu ý |
|---|---|---|---|
| **`ip netns` + `veth` + Linux Bridge** | **Giai đoạn 0 ➔ 5, 7** (Nền tảng, L2, L3, L4, Firewall) | Siêu nhẹ, chi phí RAM ~0 MB, không cần daemon chạy nền, quan sát trực tiếp Kernel Object | Không mô phỏng phần cứng vật lý chuyên dụng |
| **`Docker` / Podman** | **Giai đoạn 8** (Container, CNI, Overlay) | Sẵn có, dễ tái tạo và chia sẻ image | Che giấu nhiều chi tiết kernel (phải dùng `nsenter` để mổ xẻ) |
| **`containerlab` + FRRouting (FRR)** | **Giai đoạn 3b, 9, 11** (OSPF, BGP, Automation, Đồ án) | Hỗ trợ Network OS thật (FRR, Arista cEOS, Nokia SR Linux), dựng topo mạng phức tạp bằng file YAML | Cần cài Docker và tải image NOS |
| **`Mininet` (Khái niệm)** | Tham khảo bổ trợ | Dựng topo lớn nhanh chóng qua Python API | Phụ thuộc legacy Python 2 ở một số bản phân phối cũ |

---

## 3. Bảng Điều Chỉnh Thời Lượng Thực Tế

Khóa học được điều chỉnh từ khung ước tính ban đầu (26-28 tuần) lên **khung thời lượng thực tế sâu sắc (35 - 40 tuần)** nhằm đảm bảo người học có đủ thời gian thẩm thấu, làm lab và làm chủ đồ án quy mô lớn:

| Phân hệ / Giai đoạn | Thời lượng gốc | Thời lượng điều chỉnh | Lý do điều chỉnh & Nội dung trọng tâm |
|---|---|---|---|
| **0 – Linux góc nhìn mạng** | 1 tuần | **1 tuần** | Giữ nguyên: Socket Inode, VFS, `/proc`, `/sys`, `ss`, `lsof` |
| **1 – Bản chất mạng & phân tầng** | 1 tuần | **1 tuần** | Giữ nguyên: Đóng gói, OSI/TCP-IP, giải mã nhị phân, cấu trúc `sk_buff` |
| **2 – Ethernet, switch, VLAN** | 2 tuần | **2 tuần** | Giữ nguyên: Khung Ethernet, ARP, Bridge, 802.1Q, thêm bài **Multicast & IGMP** |
| **3 – IP & định tuyến** | 3 tuần | **Tách 3a + 3b (Tổng 6 tuần)** | **Tách làm 2 giai đoạn độc lập** (Xem chi tiết bên dưới): |
| ↳ *3a – Địa chỉ hóa, DHCP & IPv6* | — | *3 tuần* | Nhị phân, Subnetting, IPv4 Header, **Thêm bài DHCP chính thức**, IPv6 & NDP, **IPv6 Transition (NAT64)** |
| ↳ *3b – Định tuyến IP & Giao thức FRR* | — | *3 tuần* | Longest prefix match, Forwarding, Static route, Policy routing `ip rule`, OSPF & BGP trên FRRouting |
| **4 – UDP, TCP, QUIC & QoS** | 3 tuần | **3 tuần** | Bắt tay 3 bước, State machine, Flow & Congestion control, **Làm rõ bản chất QUIC**, **Thêm bài QoS với `tc`** |
| **5 – Netfilter, NAT, firewall** | 2 tuần | **2 tuần** | 5 Netfilter hooks, Connection tracking, `nftables` hiện đại, SNAT/DNAT |
| **6 – Ứng dụng: DNS, Web, TLS & PKI** | 3 tuần | **3 tuần** | DNS, **Anycast**, HTTP/1.1-2-3, **Chuyển PKI cốt lõi về trước bài TLS**, Reverse proxy |
| **7 – Bảo mật & VPN phòng thủ** | 2 tuần | **2 tuần** | Threat modeling, Zero trust, WireGuard Site-to-Site, Mổ xẻ tấn công ARP spoofing, Nmap & Fail2ban |
| **8 – Container, Overlay & Cloud** | 3 tuần | **3 tuần** | Docker networking, VXLAN Overlay, Kubernetes CNI (ClusterIP/kube-proxy), Cloud VPC & SDN |
| **9 – Vận hành, Gỡ lỗi, eBPF & Automation** | 2 tuần | **3 tuần** | Gỡ lỗi Bottom-Up, 5 bệnh án kinh điển, Tuning sysctl, **Thêm bài eBPF với bpftrace**, **Thêm bài Automation Ansible** |
| **10 – Lập trình mạng bằng Python** | 2 tuần | **4 tuần** | Khối lượng thực tế gấp đôi: Syscall socket, TCP echo, Asyncio/epoll C10K, Custom Framing, Scapy raw packets |
| **11 – Dự án Tốt nghiệp Doanh nghiệp** | 2-3 tuần | **4-6 tuần** | Đồ án quy mô doanh nghiệp đa chi nhánh: OSPF/BGP, WireGuard mesh, NAT gateway, HA Reverse Proxy, SRE drill |
| **TỔNG CỘNG** | **~26-28 tuần** | **~35-40 tuần (350-400 giờ)** | **Ở mức 10 giờ/tuần ≈ 8-10 tháng đào tạo chuyên sâu vững chắc** |

---

## 4. Quy Trình Giảng Dạy & Format Giao Tiếp Theo Đợt (Workflow)

Để khắc phục hiện tượng quá tải nhận thức khi đọc một bài viết đồ sộ 3.500 - 4.500 từ, toàn bộ các bài học trong phiên làm việc với AI được chia thành **3 Đợt chuyển giao tuần tự**:

```
┌────────────────────────────────────────────────────────────────────────┐
│               QUY TRÌNH GIAO TIẾP 3 ĐỢT MỖI BÀI HỌC (A ➔ B ➔ C)        │
├────────────────────────────────────────────────────────────────────────┤
│ 🟢 ĐỢT A – HIỂU BẢN CHẤT (Phần 1, 2, 3, 4)                             │
│    • Phần 1: Mục tiêu bài học & Tiền đề kiến thức                      │
│    • Phần 2: Vấn đề thực tế (Nếu không có nó thì chuyện gì xảy ra?)     │
│    • Phần 3: Trực giác & Ẩn dụ cốt lõi (Metaphor)                       │
│    • Phần 4: Cơ chế kỹ thuật chi tiết + Sơ đồ trực quan (.net-arch-box)│
│    ➔ DỪNG LẠI. Người học đọc xong, gõ: "tiếp đợt B"                     │
├────────────────────────────────────────────────────────────────────────┤
│ 🔵 ĐỢT B – THẤY & LÀM (Phần 5, 6, 7)                                   │
│    • Phần 5: Ví dụ số liệu cụ thể (Bảng đối chiếu .net-matrix-table)   │
│    • Phần 6: Quan sát trên Linux (Lệnh CLI, cờ, annotations & outputs) │
│    • Phần 7: Phòng Lab thực hành tuần tự (.net-step-card & verify box) │
│    ➔ DỪNG LẠI. Người học chạy lab trên máy, gõ: "tiếp đợt C"            │
├────────────────────────────────────────────────────────────────────────┤
│ 🟣 ĐỢT C – KHẮC SÂU & THỬ THÁCH (Phần 8, 9, 10, 11, 12)                 │
│    • Phần 8: Môi trường Production & Ca sự cố SRE (.net-postmortem)    │
│    • Phần 9: Cạm bẫy & Lưu ý thực tế (Pitfalls & Tips)                 │
│    • Phần 10: Bài tập thực chiến 3 mức (Dễ, Vừa, Thử thách + Lời giải) │
│    • Phần 11: Thử thách bản chất ("Explain in your own words")         │
│    • Phần 12: Tóm tắt 5 gạch đầu dòng & Mắt xích bài tiếp theo         │
│    ➔ CỔNG DUYỆT: Người học trả lời câu 11 ➔ Giảng viên nhận xét ➔ Qua bài│
└────────────────────────────────────────────────────────────────────────┘
```

*Quy tắc tùy biến:*
- Người học có thể gõ `"gửi gọn"` khi muốn nhận gộp Đợt A+B hoặc B+C, nhưng hệ thống **tuyệt đối không được bỏ Phần 4 (Cơ chế) và Phần 7 (Phòng Lab)**.
- **Cơ chế Ôn tập Spaced Repetition (C4)**: Cứ sau 3 bài học, chèn một *"Bài ôn nhanh 15 phút"* gồm 5 câu hỏi thực chiến chọn lọc (1 câu/bài vừa học + 2 câu từ các giai đoạn trước) để chống quên sau 8-10 tháng học.
- **Quiz Giữa Giai Đoạn (C5)**: Mọi giai đoạn có thời lượng kéo dài $\ge$ 3 tuần (Giai đoạn 3a, 3b, 4, 6, 8, 9, 10, 11) đều có 1 bài trắc nghiệm/tình huống giữa chặng (10 câu, ~30 phút) để rà soát lỗ hổng kiến thức trước khi bước vào phần nâng cao.

---

## 5. Đề Cương Chi Tiết 13 Giai Đoạn Đã Tích Hợp Đề Xuất Mới

### GIAI ĐOẠN 0: Linux Dưới Góc Nhìn Mạng (1 tuần)
*Bản chất: Socket() trả về file descriptor (số nguyên); bản thân socket là kernel object (`struct socket` bọc `struct sock`) trong RAM; "mạng" chính là trạng thái và cấu hình trong kernel.*
- `net-0-01`: **Triết lý "Mọi thứ đều là File" & Bản chất Socket trên Linux** (Giải phẫu VFS, Inode ảo `sockfs`, `socket_file_ops`, phân biệt Socket FD vs Kernel Object khi `fork()`/`dup()`).
- `net-0-02`: **Tiến trình mạng, Đặc quyền (Root vs Linux Capabilities) & Systemd** (Ranh giới cổng đặc quyền < 1024, `CAP_NET_BIND_SERVICE`, cấu hình service hardening, `journalctl -u`).
- `net-0-03`: **Mổ xẻ Kernel qua `/proc/net` và `/sys/class/net`** (Giải mã hex table `/proc/net/tcp`, bộ đếm interface `/proc/net/dev`, tham số card mạng trong `/sys`).
- `net-0-04`: **Bộ ba chẩn đoán Interface & Socket: `ip -br a`, `ss -tulpn`, `lsof -i`** (Phân tích cờ lệnh, phân biệt trạng thái LISTEN vs ESTABLISHED, tìm tiến trình ma chiếm cổng).
- 🧪 **Lab Cột mốc 0**: Giải phẫu Listening Daemon — Truy vết Socket FD từ `/proc/<pid>/fd/` ra bảng `ss -tulpne` và đối chiếu Inode trên `/proc/net/tcp`.

---

### GIAI ĐOẠN 1: Bản Chất Mạng & Phân Tầng (1 tuần)
*Bản chất: Mạng giải quyết các bài toán đánh địa chỉ, định tuyến, độ tin cậy và chia sẻ đường truyền; phân tầng và đóng gói là cách chia nhỏ bài toán; `sk_buff` là mạch máu dữ liệu trong kernel.*
- `net-1-01`: **Vì sao mạng phải phân tầng? Bài toán chia sẻ đường truyền & Đóng gói dữ liệu** (Encapsulation/Decapsulation, Header/Payload overhead, khái niệm PDU).
- `net-1-02`: **Mô hình OSI vs TCP/IP dưới lăng kính Kernel Linux (`sk_buff`)** (Cấu trúc `struct sk_buff`, con trỏ head/data/tail/end, cơ chế headroom/tailroom để đóng gói không cần copy RAM, slab cache).
- `net-1-03`: **Đo lường hiệu năng mạng: Latency, Bandwidth, Throughput, RTT & Jitter** (Propagation delay vs Transmission delay, BDP - Bandwidth-Delay Product).
- `net-1-04`: **Bắt và giải mã gói tin: `ping`, `tcpdump` và Wireshark theo từng byte nhị phân** (Đọc hex dump `-XX`, phân tích cấu trúc byte offset của MAC, IP và ICMP payload).
- 🧪 **Lab Cột mốc 1**: Mổ xẻ khung ICMP Echo Request/Reply — Chỉ ra byte nào là MAC đích, IP nguồn/đích, mã ICMP Type/Code, và chứng minh các lớp header lồng nhau.

---

### GIAI ĐOẠN 2: Liên Kết Dữ Liệu (L2): Ethernet, Switch, VLAN & Multicast (2 tuần)
*Bản chất: Trong mạng cục bộ định danh là MAC; switch học bảng FDB để chuyển tiếp khung; VLAN phân tách broadcast domain; Multicast tối ưu một gửi - nhiều nhận.*
- `net-2-01`: **Khung Ethernet & Địa chỉ MAC: Giao tiếp trong Miền Broadcast** (Preamble, SFD, MAC Unicast/Multicast/Broadcast, FCS CRC32).
- `net-2-02`: **Giao thức ARP (Address Resolution Protocol) & Bộ nhớ đệm lân cận (`ip neigh`)** (ARP Request broadcast, ARP Reply unicast, ARP cache state machine: REACHABLE/STALE/FAILED).
- `net-2-03`: **Cơ chế học của Switch & Linux Bridge (`ip link add br0 type bridge`)** (Bảng FDB, Flooding, Learning, Aging, Cặp dây ảo `veth`, lệnh `bridge fdb show`).
- `net-2-04`: **VLAN IEEE 802.1Q: Chia cắt miền Broadcast & VLAN Sub-interfaces** (Cấu trúc tag 4-byte 802.1Q, TPID, TCI, VID, Access port vs Trunk port, VLAN tagging trên Linux).
- `net-2-05`: **Multicast & IGMP: Bài toán Một Gửi - Nhiều Nhận** (Địa chỉ IPv4 Multicast 224.0.0.0/4, IGMP Membership Report/Query, IGMP Snooping trên Switch, vì sao OSPF dùng 224.0.0.5/6, lab `socat` & `ip maddr show`).
- `net-2-06`: **Chống lặp vòng với STP (Spanning Tree Protocol) & Cơ chế Wi-Fi 802.11** (Broadcast storm, BPDU, Root Bridge, CSMA/CD vs CSMA/CA).
- 🧪 **Lab Cột mốc 2**: Dựng Switch ảo bằng Linux Bridge nối 3 Namespaces, cấu hình chia 2 VLAN, chứng minh 2 VLAN không thấy nhau và quan sát bảng MAC học dần.

---

### GIAI ĐOẠN 3a: Địa Chỉ Hóa L3, DHCP & Thế Hệ Mới IPv6 (3 tuần)
*Bản chất: Địa chỉ IP là định danh logic toàn cầu; Subnetting chia nhỏ không gian mạng; DHCP tự động hóa cấp phát; IPv6 giải quyết triệt để cạn kiệt địa chỉ.*
- `net-3a-01`: **Số học nhị phân, Kiến trúc IPv4, CIDR & Kỹ thuật chia mạng con (VLSM)** (Bitwise AND, Subnet Mask, Wildcard Mask, bài tập chia mạng chi tiết với các con số cụ thể).
- `net-3a-02`: **Giải phẫu chi tiết IPv4 Header từng trường** (IHL, ToS/DSCP, Total Length, Identification, Flags DF/MF, Fragment Offset, TTL, Protocol, Header Checksum).
- `net-3a-03`: **Cấu hình IP Động với Giao thức DHCP (Dynamic Host Configuration Protocol)** (Bài toán cấu hình thủ công vs tự động, quy trình 4 bước DORA: Discover-Offer-Request-Ack, Lease time, DHCP Relay, các Options cốt lõi: Option 3 Gateway, Option 6 DNS, Option 51 Lease, Option 121 Classless Static Route).
- `net-3a-04`: **ICMP, TTL, MTU, Phân mảnh gói tin & Cơ chế phát hiện MTU đường truyền (PMTUD)** (Bit DF/MF, Offset, Sự cố MTU Blackhole Router và cách Kernel Linux xử lý).
- `net-3a-05`: **Thế hệ mới IPv6: Cấu trúc địa chỉ, Tự cấu hình SLAAC & Giao thức NDP** (Link-Local, Global Unicast, Solicited-Node Multicast, RS/RA, NS/NA thay thế ARP, đơn giản hóa IPv6 Header).
- `net-3a-06`: **Chiến lược chuyển dịch IPv6 (IPv6 Transition Technologies)** (Dual-Stack, NAT64 + DNS64, 464XLAT, vì sao thế giới chưa chuyển dịch IPv6 thuần).
- 🧪 **Lab Cột mốc 3a**: Dựng DHCP Server bằng `dnsmasq` trong namespace cấp phát cho 2 client namespace, bắt gói DORA bằng `tcpdump`, cố tình ngắt server để thấy client thử gia hạn và fail; dựng đường hầm NAT64 cho IPv6 client truy cập IPv4 server.

---

### GIAI ĐOẠN 3b: Định Tuyến IP & Giao Thức Định Tuyến Động FRR (3 tuần)
*Bản chất: Router chọn đường bằng thuật toán khớp tiền tố dài nhất (Longest Prefix Match) trên bảng định tuyến; giao thức định tuyến giúp các router tự động chia sẻ bản đồ mạng.*
- `net-3b-01`: **Nguyên lý Longest Prefix Match & Kernel Forwarding (`net.ipv4.ip_forward`)** (Bảng FIB vs RIB, Default Gateway, Direct Connected vs Indirect Route, tra cứu bảng định tuyến bằng `ip route`).
- `net-3b-02`: **Định tuyến tĩnh & Định tuyến theo chính sách (Policy-Based Routing - `ip rule`)** (Multi-homed Server, bảng định tuyến tùy biến, định tuyến theo IP nguồn và `fwmark`).
- `net-3b-03`: **Lý thuyết Định tuyến Động: Distance-Vector vs Link-State** (Hội tụ mạng, Split Horizon, Poison Reverse, Dijkstra SPF algorithm, so sánh RIP vs OSPF vs BGP).
- `net-3b-04`: **Định tuyến Nội bộ OSPF với FRRouting (FRR)** (Cơ chế Adjacency, Hello Packet, LSA, OSPF Area 0, cấu hình và vận hành FRR qua công cụ dòng lệnh `vtysh`).
- `net-3b-05`: **Định tuyến Liên miền BGP (Border Gateway Protocol) ở Mức Cơ Chế** (BGP Path Attributes: AS-Path, Next-Hop, Local Preference, MED; quan sát eBGP giữa 2 Autonomous System).
- 🧪 **Lab Cột mốc 3b**: Biến một máy Linux thành Router nối 3 Subnet bằng Namespaces; triển khai OSPF qua FRRouting cho 3 router ảo trong containerlab, quan sát bảng định tuyến tự động hội tụ khi ngắt kết nối một đường dây.

---

### GIAI ĐOẠN 4: Tầng Giao Vận (L4): UDP, TCP, QUIC & Quản Lý Băng Thông QoS (3 tuần)
*Bản chất: IP chỉ là nỗ lực tối đa (Best-effort); TCP tự xây dựng độ tin cậy, tuần tự và kiểm soát tắc nghẽn; UDP tối giản độ trễ; QUIC khắc phục Head-of-Line blocking; QoS điều tiết chất lượng dịch vụ.*
- `net-4-01`: **Cổng (Port), Ghép kênh (Multiplexing) & Bản chất "Best-effort" của UDP** (Pseudo-header Checksum, Socket Demultiplexing, ứng dụng trong DNS và VoIP).
- `net-4-02`: **Bắt tay 3 bước TCP: SYN, SYN-ACK, ACK, Hàng đợi SYN & Cạn kiệt cổng** (ISN, SYN Queue vs Accept Queue, phòng thủ SYN Flood Cookie, cạn kiệt Ephemeral Ports).
- `net-4-03`: **Máy trạng thái TCP (TCP State Machine) & Bí mật trạng thái TIME_WAIT** (Sơ đồ 11 trạng thái, quá trình đóng kết nối 4 bước FIN-ACK, tham số `tcp_tw_reuse`).
- `net-4-04`: **Đảm bảo độ tin cậy: Sequence Numbers, Cumulative ACK & Cơ chế Truyền lại** (Sliding Window, tính toán RTT/RTO, Fast Retransmit, Selective ACK - SACK).
- `net-4-05`: **Kiểm soát luồng (Flow Control) vs Kiểm soát tắc nghẽn (Congestion Control: Cubic vs BBR)** (rwnd vs cwnd, Slow Start, Congestion Avoidance, Bufferbloat, theo dõi qua `ss -ti`).
- `net-4-06`: **Bản chất của QUIC: Giao thức Ứng dụng trên nền UDP** (Khẳng định: QUIC chạy ở tầng ứng dụng trên UDP thay thế TCP+TLS+HTTP/2, giải quyết Head-of-Line Blocking và 0-RTT Connection, đặt nền móng cho HTTP/3).
- `net-4-07`: **Điều tiết băng thông & QoS với Linux `tc` (Traffic Control)** (`qdisc`, `class`, `filter`, các thuật toán HTB, TBF, fq_codel, phân biệt Traffic Shaping [làm chậm] vs Policing [drop], DSCP marking).
- 🧪 **Lab Cột mốc 4**: Dùng `tc-netem` thêm 100ms trễ và 1% rớt gói, đo đạc thông lượng TCP Cubic vs BBR bằng `iperf3`; dùng `tc qdisc add htb` giới hạn băng thông 10 Mbps và cấu hình ưu tiên ICMP so với TCP bulk.

---

### GIAI ĐOẠN 5: Netfilter, nftables, conntrack, NAT & Firewall (2 tuần)
*Bản chất: Gói tin đi qua các điểm móc (hooks) trong kernel; firewall và NAT là các luật gắn vào các móc đó; connection tracking là bộ nhớ trạng thái giúp kernel nhận diện luồng kết nối.*
- `net-5-01`: **Kiến trúc Netfilter & Bản đồ hành trình gói tin qua 5 Hooks** (PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING).
- `net-5-02`: **Connection Tracking (`conntrack`): Bộ nhớ trạng thái của Kernel** (4 Trạng thái NEW/ESTABLISHED/RELATED/INVALID, kiểm tra `conntrack -L`, phân tích triệu chứng tràn bảng `conntrack_max`).
- `net-5-03`: **Tường lửa hiện đại với `nftables` & Đối chiếu `iptables` cũ** (Cấu trúc Table/Chain/Rule, cú pháp `nft add rule`, hiệu năng xử lý gói tin và cách chuyển đổi từ cú pháp iptables cũ).
- `net-5-04`: **Bản chất NAT: SNAT, Masquerade và Port Forwarding (DNAT)** (Source NAT tại POSTROUTING, Destination NAT tại PREROUTING, bảng chuyển dịch địa chỉ trong Conntrack).
- 🧪 **Lab Cột mốc 5**: Dựng Linux NAT Gateway cho mạng namespace, cấu hình Port Forwarding DNAT vào web server nội bộ, viết bộ luật Stateful Firewall chỉ cho phép luồng cần thiết và tự kích hoạt tình huống đầy bảng conntrack để quan sát triệu chứng drop gói.

---

### GIAI ĐOẠN 6: Tầng Ứng Dụng (L7): DNS, Anycast, PKI, HTTP & TLS (3 tuần)
*Bản chất: Tên miền là nhãn phân cấp phân tán; Anycast tối ưu định tuyến theo vị trí gần nhất; PKI là nền tảng tin cậy; HTTP và TLS là cách ứng dụng thỏa thuận và mã hóa hội thoại.*
- `net-6-01`: **Hệ thống DNS: Phân cấp tên miền, Caching & Truy vết với `dig +trace`** (Root hints, TLD, Authoritative, Recursive vs Iterative Resolver, các loại bản ghi A/AAAA/CNAME/MX/TXT/SRV).
- `net-6-02`: **Kiến trúc Anycast trong Mạng Hiện Đại** (So sánh Unicast vs Multicast vs Anycast; cách DNS Root Servers, Cloudflare 1.1.1.1, CDN và hệ thống chống DDoS dùng Anycast qua BGP).
- `net-6-03`: **Nền tảng PKI Cốt Lõi: Mật Mã Học, X.509 & Chuỗi Tin Cậy (Chuyển từ GĐ 7 sang)** (Mã hóa đối xứng vs bất đối xứng, Cặp khóa công khai/bí mật, Certificate Authority - Root CA, Intermediate CA, Certificate Chain, thu hồi chứng chỉ qua CRL/OCSP).
- `net-6-04`: **Giao thức Bảo mật TLS 1.3 & Quá Trình Bắt Tay Mã Hóa** (Bắt tay 1-RTT, ECDHE Key Exchange, Perfect Forward Secrecy, Server Name Indication - SNI, kiểm tra chứng chỉ bằng `openssl s_client`).
- `net-6-05`: **Sự tiến hóa của Web: HTTP/1.1 $\to$ HTTP/2 $\to$ HTTP/3 & Nginx Reverse Proxy** (Keep-Alive, Pipelining, Multiplexing nhị phân, HPACK, HTTP/3 qua QUIC, cân bằng tải L4 vs L7 bằng Nginx/HAProxy).
- `net-6-06`: **Quản trị An toàn với SSH & Nghệ thuật tạo SSH Tunneling** (Host keys, Public key auth, Local `-L`, Remote `-R`, Dynamic SOCKS5 Proxy `-D`).
- 🧪 **Lab Cột mốc 6**: Dựng DNS Resolver nội bộ bằng `dnsmasq`, tự tạo CA riêng cấp chứng chỉ SSL/TLS, cấu hình Nginx Reverse Proxy cân bằng tải cho 2 backend và thiết lập SSH Dynamic SOCKS5 Proxy duyệt web an toàn.

---

### GIAI ĐOẠN 7: Bảo Mật Mạng & VPN, Góc Nhìn Phòng Thủ (2 tuần)
*Bản chất: Bảo mật mạng là bài toán tin cậy: Ai là ai, ai được làm gì, dữ liệu có bị nghe lén hay can thiệp không; phòng thủ dựa trên hiểu rõ bản chất tấn công.*
- `net-7-01`: **Mô hình Đe dọa (Threat Modeling), Phân đoạn mạng & Tư duy Zero Trust** (Vùng DMZ, Bastion Host, Network Segmentation, nguyên tắc xác thực mọi truy cập không tin cậy ngầm).
- `net-7-02`: **Vận hành PKI Doanh nghiệp & Vòng đời Chứng chỉ** (Tự động hóa gia hạn với ACME/Let's Encrypt, mTLS - Mutual TLS trong giao tiếp Microservices).
- `net-7-03`: **Mạng Riêng Ảo (VPN): IPsec vs Kiến trúc hiện đại WireGuard** (Giao diện `wg0`, Noise Protocol, Cryptokey Routing, cấu hình VPN Site-to-Site và Road-Warrior).
- `net-7-04`: **Mổ xẻ Tấn công L2/L3 trong Lab Cô lập & Cơ chế Phòng ngừa** (Thực nghiệm ARP Spoofing / Man-in-the-Middle trong namespace, bắt gói bằng `tcpdump`, thiết lập Static ARP và Dynamic ARP Inspection - DAI).
- `net-7-05`: **Rà soát An ninh với Nmap & Tự động Phòng vệ bằng Fail2ban** (TCP SYN scan `-sS`, Service detection `-sV`, cơ chế Jail đọc log xác thực và tự đẩy luật chặn vào `nftables`).
- 🧪 **Lab Cột mốc 7**: Thiết lập đường hầm WireGuard Site-to-Site nối 2 mạng ảo độc lập; trong lab cô lập, mô phỏng ARP Spoofing và viết script phát hiện biến động địa chỉ MAC trong bảng `ip neigh`.

---

### GIAI ĐOẠN 8: Container, Overlay & Cloud Networking (3 tuần)
*Bản chất: Mạng container chính là namespace, veth, bridge, NAT được tự động hóa bằng phần mềm; overlay là đóng gói gói tin này bên trong gói tin khác để đi qua mạng vật lý.*
- `net-8-01`: **Giải phẫu Mạng Docker: Network Namespaces, veth pair & Docker0 Bridge** (Mổ xẻ từng lệnh Docker tạo ngầm dưới kernel, iptables NAT table của Docker daemon).
- `net-8-02`: **Mạng Overlay & Công nghệ VXLAN (Virtual Extensible LAN)** (Cơ chế đóng gói MAC-in-UDP cổng 4789, tạo giao diện `type vxlan` trên Linux, giải bài toán giới hạn 4096 VLAN).
- `net-8-03`: **Mạng Kubernetes: Flat Pod Network, CNI Plugin & `kube-proxy`** (Mô hình Pod-to-Pod, CNI Flannel vs Calico, ClusterIP, iptables mode vs IPVS mode).
- `net-8-04`: **Mạng Đám mây (Cloud VPC Architecture)** (Subnet, Route Table, Internet Gateway, NAT Gateway, Security Groups & Network ACLs đối chiếu với Linux Kernel components).
- `net-8-05`: **Kiến trúc Mạng do Phần mềm Định nghĩa (SDN) & Tương lai Networking** (Bóc tách Control Plane vs Data Plane, OpenFlow ở mức khái niệm, xu hướng dịch chuyển sang Programmable Datapath).
- 🧪 **Lab Cột mốc 8**: Tự tay thiết lập đường hầm VXLAN thủ công nối 2 máy ảo Linux độc lập; kết nối các container qua mạng overlay mà không cần router vật lý bên ngoài.

---

### GIAI ĐOẠN 9: Vận Hành, Gỡ Lỗi, eBPF & Tự Động Hóa Mạng (3 tuần)
*Bản chất: Sự cố mạng để lại dấu vết ở mọi tầng; kỹ sư giỏi gỡ lỗi có phương pháp từ L1 lên L7; eBPF cho phép quan sát sâu trong nhân mà không làm chậm hệ thống.*
- `net-9-01`: **Quy trình Gỡ lỗi Mạng Chuẩn mực: Phương pháp Bottom-Up (L1 $\to$ L7)** (Checklist 6 bước loại trừ: Link $\to$ ARP $\to$ Route $\to$ Firewall $\to$ Socket $\to$ App DNS/TLS).
- `net-9-02`: **Khám nghiệm 5 Bệnh án Mạng Kinh điển trong Môi trường Thực tế** (MTU Blackhole, Asymmetric Routing, DNS Timeout, Cạn bảng Conntrack & Port Exhaustion).
- `net-9-03`: **Bộ Công cụ Khám nghiệm Chuyên sâu trên Linux** (`ethtool -S` xem drop ring buffer, `ip -s link`, `ss -s`, `mtr` phân tích packet loss từng hop, bộ lọc BPF phức tạp với `tcpdump`).
- `net-9-04`: **Tối ưu hóa Network Stack qua `sysctl net.*` & Giám sát với Prometheus** (Tuning TCP buffers `rmem`/`wmem`, `somaxconn`, `tcp_max_syn_backlog`, xuất metrics mạng ra Grafana).
- `net-9-05`: **Thực hành Quan sát Mạng Chuyên sâu với eBPF & `bpftrace`** (eBPF là gì: máy ảo trong kernel gắn vào hook; XDP ở mức khái niệm; so sánh `bpftrace` với `tcpdump`; vì sao Cilium thay `iptables` trong Kubernetes; viết script `bpftrace` one-liner đếm kết nối TCP đến port 80, đo độ trễ syscall `sendto`, phát hiện retransmission mà `tcpdump` không thấy).
- `net-9-06`: **Tự động hóa Cấu hình Mạng (Network Automation) với Ansible & FRRouting** (Vì sao cần automation: chống lỗi con người; Ansible inventory & module cấu hình FRR; NETCONF/YANG ở mức khái niệm; viết playbook cấu hình OSPF cho 3 router FRR trong containerlab bảo đảm tính Idempotent).
- 🧪 **Lab Cột mốc 9**: "Phòng thí nghiệm Sự cố (The Broken Lab)": Gỡ lỗi 5 sự cố mạng bí mật được cài cắm; viết 3 script `bpftrace` one-liner giám sát kernel datapath; chạy playbook Ansible tự động cấu hình cụm router FRR.

---

### GIAI ĐOẠN 10: Lập Trình Mạng Bằng Python Trên Linux (4 tuần)
*Bản chất: Lập trình mạng là gọi Syscall xuống kernel; socket stream là dòng byte vô tận không có ranh giới tin nhắn; Async I/O và epoll giải quyết bài toán triệu kết nối đồng thời.*
- `net-10-01`: **Syscall Socket API trên Linux & Module `socket` trong Python** (Mổ xẻ `socket()`, `bind()`, `listen()`, `accept()`, `send()`, `recv()`, `close()`, quan sát trạng thái tương ứng trong `/proc/<pid>/fd`).
- `net-10-02`: **Xây dựng TCP Echo Server & Client: Quan sát Trạng thái Socket từ Kernel** (Bản chất truyền nhận byte stream, theo dõi các trạng thái `ESTABLISHED`, `CLOSE_WAIT`, `TIME_WAIT` bằng lệnh `ss`).
- `net-10-03`: **Bài toán Concurrency & Sự Tiến Hóa của Mô Hình I/O: Blocking $\to$ Multi-threading $\to$ `select()` $\to$ `epoll`** (Giải bài toán C10K, vì sao `epoll` có độ phức tạp $O(1)$ so với $O(N)$ của `select`, cơ chế Event Loop).
- `net-10-04`: **Lập trình Mạng Bất đồng bộ Hiệu năng cao với Python `asyncio`** (`asyncio.start_server`, `StreamReader`, `StreamWriter`, xử lý hàng ngàn kết nối đồng thời trên một tiến trình đơn luồng).
- `net-10-05`: **Tự Thiết Kế Giao Thức Ứng Dụng: Bài toán Đóng Gói (Framing) & Bóc Tách Tin Nhắn** (TCP Stream không có ranh giới gói tin, xử lý dính gói [Packet Sticking], phân định tin nhắn bằng Delimiter vs Header Length-Prefix với module `struct`).
- `net-10-06`: **Bắt và Thao tác Gói Tin Cấp Thấp với Scapy & Raw Socket** (Tự tay nhào nặn từng bit trong IP/TCP Header, gửi nhận Raw Socket, viết công cụ ARP Ping và TCP Port Scanner mini).
- 🧪 **Lab Cột mốc 10**: Tự lập trình một Async HTTP/1.1 Server hoàn chỉnh bằng Python `asyncio` thuần (không dùng thư viện ngoài), hỗ trợ Keep-Alive và Custom Routing; dùng `curl` và `wrk` kiểm tra hiệu năng, đối chiếu kết quả bắt gói qua `tcpdump`.

---

### GIAI ĐOẠN 11: Đồ Án Tốt Nghiệp: Hạ Tầng Mạng Doanh Nghiệp Quy Mô Lớn (4-6 tuần)
*Bản chất: Tổng hòa toàn bộ tri thức từ L1 đến L7, tự tay thiết kế, dựng từ đầu, cấu hình, bảo mật, tối ưu và gỡ lỗi một hệ thống mạng thực thụ.*
- `net-11-01`: **Thiết kế Kiến trúc & Bảng Địa Chỉ Mạng Doanh Nghiệp Đa Chi Nhánh (Blueprint Design)** (Thiết kế trụ sở chính HQ, 2 chi nhánh Branch, phân vùng DMZ, VLSM, VLAN IDs, OSPF Areas, IPsec/WireGuard Site-to-Site VPN, chính sách tường lửa Zero Trust).
- `net-11-02`: **Triển khai Hạ tầng Định tuyến L3 & Mạng Ảo trên Containerlab + FRRouting** (Dựng topo gồm 5 router FRR nối các subnet, cấu hình OSPF Area 0 và Area 1, kiểm tra bảng FIB/RIB và hội tụ đường truyền).
- `net-11-03`: **Triển khai Dịch vụ Cốt lõi: DHCP, DNS Phân giải Nội bộ & NAT Gateway** (Cấu hình `dnsmasq` cấp IP động theo VLAN, dựng Authoritative DNS cho domain nội bộ `.corp`, cấu hình Masquerade NAT ra Internet).
- `net-11-04`: **Bảo Mật Toàn Diện với nftables Stateful Firewall & WireGuard Mesh** (Thiết lập tường lửa bảo vệ từng vùng mạng, mở Port Forwarding DNAT an toàn, cấu hình đường hầm WireGuard mã hóa dữ liệu liên chi nhánh).
- `net-11-05`: **Cụm Dịch Vụ Web Ứng Dụng với HA Reverse Proxy & HTTPS TLS 1.3** (Dựng cụm Nginx Reverse Proxy cân bằng tải cho các microservices backend, cài đặt chứng chỉ SSL/TLS từ CA nội bộ).
- `net-11-06`: **Giám Sát Hạ Tầng với Prometheus/Grafana & Diễn Tập Sự Cố (Chaos Engineering Drill)** (Thu thập metrics băng thông và socket drop; thực hiện diễn tập: cắt cáp OSPF, làm nghẽn băng thông, mô phỏng tấn công ARP Spoofing và phục hồi trong 15 phút).
- 🏆 **Nghiệm thu Đồ án Cột mốc 11**: Bảo vệ đồ án: Mô tả toàn bộ đường đi của một gói tin từ máy client chi nhánh đến web server trụ sở chính; giải thích vì sao hệ thống đứng vững trước sự cố.

---

## 6. Checklist Tự Xác Nhận Trước Khi Bắt Đầu Khóa Học

Người học tự kiểm tra và xác nhận 6 điều kiện tiên quyết:

- [ ] **1. Cam kết thời lượng**: Đã hiểu và đồng ý với thời lượng thực tế **35 - 40 tuần (~8 - 10 tháng, 10 giờ/tuần)**, không học cấp tốc vì mạng yêu cầu sự thẩm thấu sâu sắc.
- [ ] **2. Môi trường thực hành**: Đã chuẩn bị máy Linux (máy thật, máy ảo VirtualBox/VMware hoặc WSL2) với bản phân phối khuyến nghị Ubuntu 22.04/24.04 LTS hoặc Debian 12+.
- [ ] **3. Bộ công cụ cài sẵn**: Đã cài đặt hoặc sẵn sàng cài: `iproute2`, `tcpdump`, `wireshark`, `iperf3`, `dnsmasq`, `frr`, `docker`, `containerlab`, `python3` (3.10+).
- [ ] **4. Quyền quản trị & Độc lập**: Đã xác nhận có toàn quyền `sudo` và hiểu rằng mọi bài thực hành chạy hoàn toàn trong mạng ảo cô lập (`network namespaces`), không làm gián đoạn hay ảnh hưởng tới card mạng máy thật.
- [ ] **5. Quy tắc chính xác**: Đã nắm rõ nguyên tắc kỹ thuật: Mọi câu lệnh, cờ, thông số đều cần được tự tay gõ và kiểm chứng trên máy của mình.
- [ ] **6. Định dạng học theo 3 đợt**: Đã hiểu quy trình gửi bài theo 3 đợt **Đợt A (Hiểu) ➔ Đợt B (Thấy & Làm) ➔ Đợt C (Khắc sâu)** và sẵn sàng tương tác *"tiếp đợt B"*, *"tiếp đợt C"*.

---

## 7. Hướng Dẫn Áp Dụng Phụ Lục Kế Hoạch

1. Bản kế hoạch v3 này là **Nguồn sự thật cao nhất (Single Source of Truth)** cho toàn bộ Chuyên đề Networking trên Linux. Khi có bất kỳ điểm khác biệt nào với các mô tả sơ bộ trước đó, bản kế hoạch này được ưu tiên áp dụng 100%.
2. Khi bắt đầu viết nội dung chi tiết cho từng bài học, AI và người học sẽ bám sát lộ trình 13 phân hệ trên, áp dụng đúng cấu trúc 12 phần theo quy chuẩn [05-quy-chuan-uiux-bai-hoc.md](05-quy-chuan-uiux-bai-hoc.md) và gửi theo đúng 3 đợt A/B/C.
