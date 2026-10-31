# 05 — Bộ Quy Tắc Thiết Kế UI/UX & Khuôn Mẫu Bài Học Trang Networking (`network.html`)
*(Networking Course UI/UX Design System & Lesson Authoring Blueprint — v2.1)*

> **Phạm vi áp dụng bắt buộc**: Toàn bộ các bài học thuộc **Chuyên đề Networking (`network.html`)**, bao gồm:
> - **Học phần I — Networking Cơ Bản** (`data/network/basic-mod0.js` → `basic-mod10.js`, biến toàn cục `window.NET_BASIC_MODn_DATA`).
> - **Học phần II — Networking Chuyên Sâu trên Linux** (`data/network/phase0.js` → `phase11.js`, biến toàn cục `window.NET_PHASEn_DATA`).
>
> **Mục tiêu cốt lõi**: Đảm bảo 100% bài học đạt độ hoàn thiện thị giác cao nhất, **loại bỏ triệt để cảm giác đọc tài liệu thô sơ bằng cách hạn chế tối đa các định dạng bảng Markdown / `<table>` khô khan**, ưu tiên các bộ thẻ card responsive co giãn mượt mà trên mọi thiết bị và giao thức `file://`.

---

## 1. Kiến Trúc Hiển Thị & Bản Sắc Thị Giác Kép (Dual-Course Visual Identity)

Trang `network.html` sử dụng engine dùng chung `js/topic-engine.js` (IIFE, không dùng ES Module `import`/`export`), cấu hình tại `js/network-app.js`, hệ biến màu gốc `css/variables.css`, stylesheet chuyên biệt `css/network.css` (tiền tố `.net-` hoặc `.net-page`) và KaTeX.

### Nhận diện Học phần I: Networking Cơ Bản (Đặt ở trên)
- **Mã định danh:** `courseId: "course-net-hp1"`, `id: "part-net-b-<mod>"`, `lesson.id: "net-b-<mod>-<bai>"` (VD: `net-b-1-01`).
- **File lưu trữ:** `data/network/basic-mod0.js` → `basic-mod10.js` (gán `window.NET_BASIC_MODn_DATA`).
- **Màu nhấn thương hiệu:** Xanh Ngọc Lục Bảo (`#10b981` — `.network-basic-banner`, `.course-course-net-hp1`).
- **Đối tượng & Văn phong:** Người mới từ con số 0; giải thích từ trực giác đời thường trước, thuật ngữ tiếng Anh kèm nghĩa Việt ngay lần đầu xuất hiện.
- **Môi trường Lab:** Miễn phí và có sẵn trên PC: Windows (`cmd`/PowerShell) + Linux/WSL/macOS + Wireshark + Cisco Packet Tracer.

### Nhận diện Học phần II: Networking Chuyên Sâu trên Linux (Đặt ở dưới)
- **Mã định danh:** `courseId: "course-net-hp2"`, `id: "part-net-<phase>"`, `lesson.id: "net-<phase>-<bai>"` (VD: `net-1-01`).
- **File lưu trữ:** `data/network/phase0.js` → `phase11.js` (gán `window.NET_PHASEn_DATA`).
- **Màu nhấn thương hiệu:** Xanh Da Trời Hạ Tầng (`#0284c7` / `var(--topic-network)` — `.network-banner`).
- **Đối tượng & Văn phong:** Kỹ sư hệ thống/SRE/Backend; mổ xẻ Linux Network Stack, `sk_buff`, Kernel Socket, Routing, Netfilter thực chiến.
- **Môi trường Lab:** Linux Network Namespaces (`ip netns`), `veth`, `tcpdump`, `ss`, `tc-netem`, `nftables`, FRR, WireGuard.

---

## 2. Bảy Nguyên Tắc Sư Phạm & Thị Giác Bất Biến (7 UX Laws)

### 1. TUYỆT ĐỐI HẠN CHẾ ĐỊNH DẠNG BẢNG (No Raw Markdown/HTML Tables) — ƯU TIÊN CARD & GRID RESPONSIVE
- **Lý do kỹ thuật & trải nghiệm**: Bảng Markdown (`| col1 | col2 |`) và thẻ `<table>` truyền thống tạo cảm giác tài liệu hành chính khô khan, đơn điệu, và đặc biệt tồi tệ trên màn hình di động/máy tính bảng: chữ bị co ép, méo mó hoặc bắt buộc người học phải kéo thanh cuộn ngang gây đứt gãy luồng tiếp thu.
- **Quy tắc bắt buộc**:
  - **100% các phép so sánh / đối chiếu** (LAN vs WAN, Client-Server vs P2P, Chuyển mạch gói vs Chuyển mạch kênh, Chuẩn mở vs Độc quyền, TCP vs UDP...) **phải dùng Bộ thẻ đối chiếu kép (`.net-compare-grid` kết hợp `.net-spec-list`)**.
  - **100% các nhóm bóc tách khái niệm/thành phần** từ 3 mục trở lên **phải dùng Lưới thẻ khái niệm (`.net-concept-grid`)**.
  - **100% sơ đồ cấu trúc gói tin (Header & Payload)** **phải dùng Thanh phân đoạn trực quan (`.net-packet-strip`)**.
- **Ngoại lệ duy nhất cho bảng**: Chỉ sử dụng bảng khi thật sự là ma trận bitmask 32-bit trong `.net-header-diagram` nếu không thể biểu diễn bằng card. Trong mọi trường hợp khác, **nghiêm cấm dùng định dạng bảng dạng Markdown thô sơ**.

### 2. Chống "Vách đá Văn bản" (No Wall of Text)
- Không viết đoạn `<p>` dài quá **3–4 dòng** liên tục mà không có cấu trúc thị giác ngắt nhịp.
- Thuật ngữ kỹ thuật, tên lệnh, cờ tham số, địa chỉ IP/MAC, cổng Port và mã trạng thái phải bọc trong `<code>...</code>` (trong HTML) hoặc dấu backtick `` `...` `` (trong chuỗi văn bản thuần của JSON).

### 3. Sơ đồ Trực quan Thay cho ASCII Trần (Visual Over Raw ASCII)
- **Cấm tuyệt đối** đặt khối `<pre>` ASCII trần trụi không có khung chứa.
- Mọi bài học **bắt buộc** có sơ đồ phân tầng/luồng dữ liệu trực quan trong `intuition.visualHtml` bằng `.net-arch-box`.
- Khi thật sự cần vẽ sơ đồ nhánh mạng (Topology) hoặc biểu đồ thời gian (Sequence Diagram) dạng ký tự, **bắt buộc** bọc trong `<div class="net-topo-box">...<pre class="net-topo-pre">...</pre></div>`.

### 4. Toán Học & Phép Tính Từng Bước Minh Bạch (Zero Skipped Math Steps)
- Đặc biệt quan trọng ở các bài tính số cáp, băng thông/độ trễ, MTU/Overhead, đổi cơ số nhị phân (Module 3) và chia Subnetting bằng tay (Module 4).
- Mọi bài giải định lượng nhiều bước **bắt buộc** đóng khung bằng `.net-calc-box` (gồm các `.net-calc-step`, khối công thức `.net-calc-formula` và hộp đáp số `.net-calc-result`).
- Công thức toán học hiển thị qua KaTeX (`$N = \frac{n(n-1)}{2}$` hoặc `$$...$$`); nhớ escape hai dấu gạch chéo ngược `\\frac`, `\\times`, `\\text{...}` bên trong chuỗi JavaScript!

### 5. Phòng Lab Từng Bước Có Kiểm Chứng (Verifiable Hands-on Lab)
- Phần Lab luôn mở đầu bằng thẻ `.net-step-card` nêu rõ mục tiêu bước làm + hộp `.net-verify-box` chỉ rõ *"Cách kiểm tra bạn làm đúng"* (dấu hiệu/con số cần thấy trong kết quả).
- Lệnh gõ thực tế đặt trong mảng `codeExamples` của section đó để Engine tự động sinh khung Terminal có đánh số dòng, nút **📋 Sao chép**, khối **Kết quả mong đợi (Terminal Output)** và danh sách **Giải thích từng dòng (`annotations`)**.
- Với **Học phần I**: Khi lệnh trên Windows và Linux khác cú pháp (VD: `ping 8.8.8.8` vs `ping -c 4 8.8.8.8`, `tracert -d` vs `traceroute -n`, `ipconfig /all` vs `ip addr`), luôn cung cấp đủ **2 thẻ `codeExamples`** rõ ràng cho hai hệ điều hành.

### 6. An Toàn Giao Diện Sáng / Tối & Màn Hình Nhỏ (Theme & Responsive Safety)
- Tuyệt đối không gắn `style="color:#000"` hay `style="background:#fff"` cứng trên thẻ HTML. Chỉ dùng biến từ `css/variables.css` (`var(--text-primary)`, `var(--text-secondary)`, `var(--bg-surface)`...) và các class ngữ nghĩa đã định nghĩa sẵn cho cả `[data-theme="light"]` và `[data-theme="dark"]` trong `css/network.css`.

### 7. Không Nhân Đôi Khối Tự Động Render Của `TopicEngine`
- `js/topic-engine.js` đã tự động render và tự động gắn mục lục phải (TOC) cho các trường dữ liệu cấp cao:
  - `#sec-objectives` ← `lesson.objectives`
  - `#sec-intuition` ← `lesson.intuition` (`title`, `metaphor`, `boundary`, `visualHtml`)
  - Các `<section id="...">` ← `lesson.sections[]`
  - `#sec-callouts` ← `lesson.callouts` (`deepDive`, `pitfalls`, `tips`)
  - `#sec-exercises` ← `lesson.exercises[]`
  - `#sec-quiz` ← `lesson.quiz[]` (hoặc `part.quiz` ở bài cuối cùng của mỗi Module)
  - `#sec-summary` ← `lesson.summary[]` + `lesson.selfReviewQuestions[]`
  - `#sec-reflection` ← `lesson.reflectionQuestion` + `lesson.reflectionHint`
  - `.net-next-bridge-card` ← `lesson.nextLessonPreview`
- **Cấm** tự viết cứng HTML của `.net-reflection-box` hoặc `.net-next-bridge-card` lồng bên trong `sections[].content`.

---

## 3. Thư Viện 10 Component Giao Diện Chính Thức (`css/network.css`)

Chỉ sử dụng các cấu trúc HTML và tên class chính thức dưới đây. **Không tự bịa tên class mới** nếu chưa khai báo trong `css/network.css`.

### 3.1 Sơ đồ Kiến trúc & Luồng Phân tầng (`.net-arch-box`)
Dùng bắt buộc trong `intuition.visualHtml` và các phần giải thích kiến trúc đa tầng / luồng đóng gói dữ liệu:

```html
<div class="net-arch-box">
  <div class="net-arch-header">
    <span class="net-arch-icon">📦</span>
    <span class="net-arch-title">TIÊU ĐỀ SƠ ĐỒ KIẾN TRÚC / LUỒNG DỮ LIỆU</span>
  </div>
  <div class="net-arch-layers">
    <div class="net-arch-layer layer-app">
      <div class="net-arch-layer-header">
        <span class="net-arch-layer-name">🌐 1. Tầng Ứng Dụng (Application Layer — L7)</span>
        <span class="net-arch-layer-badge">PDU: Data</span>
      </div>
      <div class="net-arch-nodes">
        <div class="net-arch-node"><strong>Thành phần A:</strong> Mô tả ngắn gọn kèm <code>code</code></div>
        <div class="net-arch-node"><strong>Thành phần B:</strong> Mô tả ngắn gọn</div>
      </div>
    </div>

    <div class="net-arch-arrow">⬇️ Đóng gói (Encapsulation): Gắn thêm TCP Header 20 Bytes</div>

    <div class="net-arch-layer layer-transport">
      <div class="net-arch-layer-header">
        <span class="net-arch-layer-name">🚚 2. Tầng Giao Vận (Transport Layer — L4)</span>
        <span class="net-arch-layer-badge">PDU: Segment</span>
      </div>
      <div class="net-arch-nodes">
        <div class="net-arch-node"><strong>TCP/UDP:</strong> Đánh số cổng <code>Port</code> và kiểm soát luồng</div>
      </div>
    </div>
  </div>
  <div class="net-arch-footer">
    💡 Ghi chú tóm lược ngắn dưới chân sơ đồ (tùy chọn).
  </div>
</div>
```

**Bảng mã màu ngữ nghĩa cho `.net-arch-layer`:**
- `.layer-app` (hoặc `.layer-userspace`): Xanh dương (`#3b82f6`) — Tầng Ứng dụng (L7/L6/L5) / Tiến trình User Space / Client-Server.
- `.layer-transport` (hoặc `.layer-vfs`): Tím Violet (`#8b5cf6`) — Tầng Giao vận (L4: TCP, UDP, Port, Handshake) / Socket & VFS.
- `.layer-network` (hoặc `.layer-netstack`, `.layer-kernel`): Xanh da trời (`#0284c7`) — Tầng Mạng (L3: IPv4, IPv6, Router, NAT, ICMP).
- `.layer-datalink`: Xanh ngọc (`#10b981`) — Tầng Liên kết dữ liệu (L2: Ethernet Frame, Switch, MAC, ARP, VLAN).
- `.layer-physical` (hoặc `.layer-hardware`): Vàng hổ phách (`#f59e0b`) — Tầng Vật lý (L1: Cáp đồng, Cáp quang, Wi-Fi, NIC).
- `.layer-security`: Đỏ hồng (`#ef4444`) — Tầng Bảo mật / Firewall / VPN / Mã hóa TLS.

---

### 3.2 Lưới Thẻ Khái Niệm (`.net-concept-grid` & `.net-concept-card`)
Dùng để bóc tách 3–6 khái niệm, thành phần thiết bị, trường thông tin hoặc nguyên lý cốt lõi:

```html
<div class="net-concept-grid">
  <div class="net-concept-card accent-blue">
    <div class="net-concept-header">
      <h4 class="net-concept-title"><span>💻</span> 1. Tên Khái Niệm</h4>
      <span class="net-concept-badge">English Term</span>
    </div>
    <div class="net-concept-body">
      <p>Giải thích súc tích, đi thẳng vào bản chất kỹ thuật và ví dụ thực tế.</p>
    </div>
  </div>
</div>
```
- **6 class màu viền đỉnh (`.net-concept-card`)**: `accent-blue` (`#0284c7`), `accent-emerald` (`#10b981`), `accent-amber` (`#f59e0b`), `accent-purple` (`#8b5cf6`), `accent-cyan` (`#06b6d4`), `accent-rose` (`#ef4444`).

---

### 3.3 Bộ Thẻ Đối Chiếu Đặc Tính Kép (`.net-compare-grid` & `.net-spec-list`) — Thay Thế Hoàn Toàn Bảng Ma Trận
**Đây là giải pháp chuẩn mực thay thế cho các bảng so sánh 2 đối tượng**. Co giãn 100% trên điện thoại mà không sinh thanh cuộn ngang:

```html
<div class="net-compare-grid">
  <div class="net-compare-card accent-emerald">
    <div class="net-concept-header">
      <h4 class="net-compare-title"><span>🏠</span> Tên Đối Tượng A</h4>
      <span class="net-concept-badge">Thuộc tính A</span>
    </div>
    <ul class="net-spec-list">
      <li class="net-spec-item">
        <span class="net-spec-label">📍 Tiêu chí 1</span>
        <span class="net-spec-val">Mô tả đặc điểm nổi bật...</span>
      </li>
      <li class="net-spec-item">
        <span class="net-spec-label">⚡ Tiêu chí 2</span>
        <span class="net-spec-val">Thông số hoặc hành vi cụ thể...</span>
      </li>
    </ul>
    <p class="net-compare-verdict">➔ Đúc kết: Giá trị cốt lõi của Đối tượng A.</p>
  </div>

  <div class="net-compare-card accent-blue">
    <div class="net-concept-header">
      <h4 class="net-compare-title"><span>🌍</span> Tên Đối Tượng B</h4>
      <span class="net-concept-badge">Thuộc tính B</span>
    </div>
    <ul class="net-spec-list">
      <li class="net-spec-item">
        <span class="net-spec-label">📍 Tiêu chí 1</span>
        <span class="net-spec-val">Mô tả đối chiếu tương ứng...</span>
      </li>
      <li class="net-spec-item">
        <span class="net-spec-label">⚡ Tiêu chí 2</span>
        <span class="net-spec-val">Thông số hoặc hành vi cụ thể...</span>
      </li>
    </ul>
    <p class="net-compare-verdict">➔ Đúc kết: Giá trị cốt lõi của Đối tượng B.</p>
  </div>
</div>
```
- Các biến thể màu viền: `.bad` (viền đỏ), `.good` (viền xanh lá), `.accent-blue` (viền xanh da trời), `.accent-purple` (viền tím), `.accent-emerald` (viền xanh ngọc), `.accent-amber` (viền vàng cam).

---

### 3.4 Thanh Phân Đoạn Gói Tin Trực Quan (`.net-packet-strip`) — Thay Thế Bảng Header Gói Tin
Dùng để giải phẫu cấu trúc phân mảnh, khung truyền Ethernet, IP Header, TCP Header và Payload trực quan như các công cụ Wireshark / DevTools:

```html
<div class="net-packet-strip">
  <div class="net-packet-seg seg-ip">
    <div class="seg-tag-row">
      <span class="seg-tag">IP Header</span>
      <span class="seg-size">20 Bytes</span>
    </div>
    <p class="seg-desc">Phong bì L3 định vị nguồn/đích toàn cầu &amp; kiểm soát vòng đời.</p>
    <div class="seg-fields">
      • Src IP: <code>192.168.1.5</code><br>
      • Dst IP: <code>142.250.204.46</code><br>
      • TTL: <code>64</code> | Checksum: <code>0x4A2F</code>
    </div>
  </div>

  <div class="net-packet-seg seg-tcp">
    <div class="seg-tag-row">
      <span class="seg-tag">TCP Header</span>
      <span class="seg-size">20 Bytes</span>
    </div>
    <p class="seg-desc">Phong bì L4 định danh cổng dịch vụ &amp; đảm bảo thứ tự.</p>
    <div class="seg-fields">
      • Src Port: <code>52410</code> | Dst Port: <code>443</code><br>
      • Sequence Number: <code>#3482</code><br>
      • Flags: <code>[ACK, PSH]</code>
    </div>
  </div>

  <div class="net-packet-seg seg-payload">
    <div class="seg-tag-row">
      <span class="seg-tag">User Payload</span>
      <span class="seg-size">Tối đa 1460 Bytes</span>
    </div>
    <p class="seg-desc">Dữ liệu người dùng thực tế được băm nhỏ vừa vặn giới hạn đường truyền.</p>
    <div class="seg-fields" style="color:#86efac;">
      • Mảnh dữ liệu ảnh JPEG, tệp tin tải về, hoặc chuỗi chat văn bản <code>"Xin chào"</code>...
    </div>
  </div>
</div>
```

---

### 3.5 Khám Nghiệm Hex Dump Nhị Phân (`.net-hex-dump`)
Khi cần minh họa khung bắt gói tin nhị phân từ Wireshark hoặc `tcpdump -XX`:

```html
<div class="net-hex-dump">
  <div><span class="net-hex-offset">0x0000:</span><span class="net-hex-bytes"><span class="net-hex-highlight">4500 003c</span> 1c46 4000 4006 b1e6 c0a8 0105</span><span class="net-hex-ascii">E..&lt;.F@.@.......</span></div>
</div>
```

---

### 3.6 Hộp Giải Toán / Nhị Phân / Subnetting Từng Bước (`.net-calc-box`)
**Bắt buộc dùng** cho mục *"Ví dụ có lời giải từng bước (Worked Example)"* khi có biến đổi toán học, đổi nhị phân ↔ thập phân, tính mặt nạ mạng Subnet Mask / CIDR, chia dải IP hoặc tính Overhead:

```html
<div class="net-calc-box">
  <div class="net-calc-header">
    <h4 class="net-calc-title">🧮 Giải bài toán từng bước: Chia mạng 192.168.10.0/24 thành 4 phòng ban</h4>
    <span class="net-calc-badge">Worked Example</span>
  </div>
  <div class="net-calc-body">
    <div class="net-calc-step">
      <div class="net-calc-step-title">Bước 1: Tìm số bit mượn thêm từ phần Host ($n$)</div>
      <p style="margin:0;font-size:0.88rem;color:var(--text-secondary);">Ta cần tạo ra ít nhất $4$ mạng con thỏa mãn $2^n \ge 4$:</p>
      <pre class="net-calc-formula">2^2 = 4 ≥ 4  ➔  Mượn n = 2 bit phần Host. Prefix mới: /24 + 2 = /26</pre>
    </div>

    <div class="net-calc-step">
      <div class="net-calc-step-title">Bước 2: Tính bước nhảy (Block Size) và số Host khả dụng mỗi mạng</div>
      <pre class="net-calc-formula">Subnet Mask /26 = 11111111.11111111.11111111.11000000 = 255.255.255.192
Bước nhảy       = 256 - 192 = 64
Số IP khả dụng  = 2^(32 - 26) - 2 = 2^6 - 2 = 62 máy trạm / mạng con</pre>
    </div>

    <div class="net-calc-result">
      ✓ Đáp số hoàn chỉnh: 4 mạng con lần lượt là <code>.0/26</code>, <code>.64/26</code>, <code>.128/26</code> và <code>.192/26</code> (mỗi mạng cấp được tối đa 62 thiết bị).
    </div>
  </div>
</div>
```

---

### 3.7 Hộp Topo Mạng & Sơ Đồ Luồng Giao Thức (`.net-topo-box` & `.net-topo-pre`)
Dùng cho sơ đồ đấu nối thiết bị (Modem — Router — Switch — PC cho bài tập Packet Tracer) hoặc biểu đồ trao đổi bản tin theo thời gian (ARP Request/Reply, DORA của DHCP, 3-Way Handshake của TCP):

```html
<div class="net-topo-box">
  <div class="net-topo-title">🗺️ SƠ ĐỒ TOPO PHÒNG LAB PACKET TRACER</div>
  <pre class="net-topo-pre">[PC1: 192.168.1.10/24] ──┐
                         ├── [Switch SW1 (2960)] ── [Router R1: 192.168.1.1/24] ── (ISP)
[PC2: 192.168.1.11/24] ──┘</pre>
</div>
```

---

### 3.8 Thẻ Bước Thực Hành Lab & Hộp Kiểm Chứng (`.net-step-card` + `.net-verify-box`)
Đặt trong `content` của section Thực hành (Lab), ngay phía trên danh sách `codeExamples` của section đó:

```html
<div class="net-step-card">
  <div class="net-step-header">
    <span class="net-step-badge">BƯỚC 1</span>
    <h4 class="net-step-title">Tiêu đề hành động rõ ràng</h4>
  </div>
  <p class="net-step-desc">Giải thích ngắn gọn bạn sắp gõ lệnh gì và để quan sát hiện tượng gì...</p>
  <div class="net-verify-box">
    <span class="net-verify-icon">✓</span>
    <span><strong>Cách kiểm tra bạn làm đúng:</strong> Nêu chính xác dòng chữ hoặc thông số kỳ vọng xuất hiện trên màn hình.</span>
  </div>
</div>
```

---

### 3.9 Thẻ Tình Huống Sự Cố Thực Tế (`.net-incident-card` vs `.net-postmortem-card`)
- **Trong Học phần I (Networking Cơ Bản)**: Dùng `.net-incident-card` nhẹ nhàng, gần gũi đời sống:
```html
<div class="net-incident-card">
  <div class="net-incident-header">
    <span>🚨</span>
    <span>CASE STUDY: TIÊU ĐỀ TÌNH HUỐNG SỰ CỐ THỰC TẾ</span>
  </div>
  <div class="net-incident-body">
    <p><strong>Hiện tượng:</strong> Mô tả triệu chứng người dùng nhìn thấy...</p>
    <p><strong>Khám nghiệm bản chất:</strong> Phân tích nguyên nhân kỹ thuật dựa trên kiến thức vừa học...</p>
    <div class="net-verify-box">
      <span class="net-verify-icon">✓</span>
      <span><strong>Bài học chẩn đoán:</strong> Quy tắc kiểm tra nhanh rút ra từ sự cố.</span>
    </div>
  </div>
</div>
```

- **Trong Học phần II (Networking Chuyên Sâu trên Linux)**: Dùng `.net-postmortem-card` chuẩn SRE Production kèm `.net-log-terminal` và `.net-treatment-list`.

---

### 3.10 Các Khối Cuối Bài Được `TopicEngine` Tự Động Render
Không viết HTML thủ công cho 5 phần sau — chỉ khai báo dữ liệu chuẩn trong object bài học:
1. `callouts: { pitfalls: [...], tips: [...] }` → Sinh `#sec-callouts`.
2. `exercises: [...]` → Sinh `#sec-exercises` (kèm dropdown `<details>` xem đáp án).
3. `part.quiz: { title, questions: [...] }` → Tự động hiển thị bài trắc nghiệm tương tác tại bài học cuối của Module.
4. `summary: [...]` + `selfReviewQuestions: [...]` → Sinh hộp `#sec-summary` kèm `.net-self-review`.
5. `reflectionQuestion` + `reflectionHint` + `nextLessonPreview` → Sinh `#sec-reflection` và `.net-next-bridge-card`.

---

## 4. Hợp Đồng Schema Dữ Liệu Bắt Buộc (Canonical Lesson Schemas)

### Cấu Trúc 9 Phần Chuẩn Cho Bài Học Học Phần I:
1. **Mục tiêu bài học** (`objectives: string[]`): 3–4 gạch đầu dòng đo kiểm được.
2. **Hiểu bằng trực giác** (`intuition: { title, metaphor, boundary, visualHtml }`): Đủ 4 trường, `visualHtml` dùng `.net-arch-box`.
3. **Giải thích chi tiết** (`sections`): Dùng `.net-concept-grid`, **tuyệt đối không dùng bảng**.
4. **Ví dụ có lời giải** (`sections[id: "sec-worked-example"]`): Dùng `.net-calc-box` hoặc `.net-compare-grid`.
5. **Hình minh họa / Sơ đồ**: Dùng `.net-arch-box`, `.net-packet-strip`, `.net-topo-box` + `.net-topo-pre`.
6. **Thực hành (Lab)** (`sections[id: "sec-lab"]`): Có `.net-step-card` + `.net-verify-box` + `codeExamples` (Windows & Linux).
7. **Hiểu lầm & Lỗi hay gặp** (`callouts: { pitfalls, tips }`): Tối thiểu 3 `pitfalls` + 1–2 `tips` + 1 `.net-incident-card`.
8. **Bài tập tự luyện** (`exercises: Exercise[]`): 3–5 bài tăng dần độ khó (`"Dễ"` → `"Vừa"` → `"Khó"`).
9. **Tóm tắt 5 dòng & Tự kiểm tra**: `summary` (5 dòng) + `selfReviewQuestions` (3–4 câu) + `reflectionQuestion` + `nextLessonPreview`.

---

## 5. Danh Sách Cấm Kỵ Tuyệt Đối (Zero-Tolerance Anti-Patterns)

- ❌ **CẤM: Lạm dụng bảng Markdown `|---|---|` hoặc thẻ `<table>` thô sơ trong bài học.**
  - Thay vào đó: Dùng `.net-compare-grid` + `.net-spec-list` cho so sánh đối chiếu, `.net-packet-strip` cho giải phẫu gói tin, `.net-concept-grid` cho nhóm khái niệm.
- ❌ **CẤM: Đặt `pitfalls` và `tips` ở cấp cao nhất của `lesson`.**
  - Phải lồng trong `callouts: { pitfalls: [...], tips: [...] }`.
- ❌ **CẤM: Dùng các class không tồn tại như `.net-arch-diagram`, `.net-arch-badge`, `.code-block`, `.diagram-box`.**
  - Chỉ dùng các component chính thức tại Mục 3.
- ❌ **CẤM: Nhân đôi hộp cuối bài vào `sections[].content`.**
  - Không viết cứng `.net-reflection-box` hay `.net-next-bridge-card` trong section; khai báo qua `reflectionQuestion`, `reflectionHint`, `nextLessonPreview`.
- ❌ **CẤM: Dùng màu chữ inline cứng làm chìm chữ trên Dark Mode.**
  - Dùng class `.net-compare-verdict`, `.net-spec-val` hoặc biến CSS `var(--text-primary)`.
- ❌ **CẤM: Dùng cú pháp `export default` hoặc `import` trong `data/network/*.js`.**
  - Luôn gán biến toàn cục `window.NET_BASIC_MODn_DATA = { ... };`.

---

## 6. Bản Mẫu Khởi Tạo Bài Học Mới (Copy-Paste Starter Template — Học Phần I)

```javascript
{
  id: "net-b-1-01",
  number: "1.1",
  title: "Tiêu đề bài học gợi mở bản chất",
  subtitle: "Tóm tắt 1 dòng các khái niệm cốt lõi",
  level: "Cơ bản",
  duration: "45 phút",
  objectives: [
    "Mục tiêu 1 (Giải thích, Phân biệt, Tính toán, Chẩn đoán...).",
    "Mục tiêu 2...",
    "Mục tiêu 3...",
    "Mục tiêu 4 (kỹ năng thực hành dòng lệnh / Wireshark / Packet Tracer)."
  ],
  intuition: {
    title: "Tên Phép Ẩn Dụ Đời Thường",
    metaphor: "Câu chuyện trực giác dẫn dắt từ đời thực vào mạng...",
    boundary: "Điểm phép ẩn dụ không còn đúng: Ranh giới kỹ thuật số...",
    visualHtml: `
      <div class="net-arch-box">
        <div class="net-arch-header">
          <span class="net-arch-icon">🌐</span>
          <span class="net-arch-title">TIÊU ĐỀ SƠ ĐỒ BÀI HỌC</span>
        </div>
        <div class="net-arch-layers">
          <div class="net-arch-layer layer-app">
            <div class="net-arch-layer-header">
              <span class="net-arch-layer-name">💻 1. Tầng / Bước 1</span>
              <span class="net-arch-layer-badge">Vai trò</span>
            </div>
            <div class="net-arch-nodes">
              <div class="net-arch-node"><strong>Thành phần 1:</strong> Chi tiết ngắn gọn...</div>
            </div>
          </div>
          <div class="net-arch-arrow">⬇️ Luồng dữ liệu chuyển tiếp</div>
          <div class="net-arch-layer layer-network">
            <div class="net-arch-layer-header">
              <span class="net-arch-layer-name">🧭 2. Tầng / Bước 2</span>
              <span class="net-arch-layer-badge">Vai trò</span>
            </div>
            <div class="net-arch-nodes">
              <div class="net-arch-node"><strong>Thành phần 2:</strong> Chi tiết ngắn gọn...</div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  sections: [
    {
      id: "sec-concepts",
      title: "1. Giải thích chi tiết: Các khái niệm trụ cột",
      content: `
        <p>Đoạn dẫn nhập ngắn gọn định nghĩa thuật ngữ kèm <strong>Tên Tiếng Anh</strong>.</p>
        <div class="net-concept-grid">
          <div class="net-concept-card accent-blue">
            <div class="net-concept-header">
              <h4 class="net-concept-title"><span>🔹</span> 1. Khái niệm A</h4>
              <span class="net-concept-badge">Term A</span>
            </div>
            <div class="net-concept-body"><p>Nội dung giải thích...</p></div>
          </div>
          <div class="net-concept-card accent-emerald">
            <div class="net-concept-header">
              <h4 class="net-concept-title"><span>🔹</span> 2. Khái niệm B</h4>
              <span class="net-concept-badge">Term B</span>
            </div>
            <div class="net-concept-body"><p>Nội dung giải thích...</p></div>
          </div>
        </div>
      `
    },
    {
      id: "sec-comparison",
      title: "2. Đối chiếu đặc tính: Cơ chế A vs Cơ chế B",
      content: `
        <p>Phân tích sự khác biệt qua bộ thẻ đối chiếu đặc tính trực quan (không dùng bảng thô):</p>
        <div class="net-compare-grid">
          <div class="net-compare-card accent-emerald">
            <div class="net-concept-header">
              <h4 class="net-compare-title"><span>🟢</span> Cơ Chế A</h4>
              <span class="net-concept-badge">Đặc tính A</span>
            </div>
            <ul class="net-spec-list">
              <li class="net-spec-item">
                <span class="net-spec-label">📍 Tiêu chí 1</span>
                <span class="net-spec-val">Mô tả đặc điểm nổi bật...</span>
              </li>
              <li class="net-spec-item">
                <span class="net-spec-label">⚡ Tiêu chí 2</span>
                <span class="net-spec-val">Thông số hoặc hành vi cụ thể...</span>
              </li>
            </ul>
            <p class="net-compare-verdict">➔ Đúc kết: Giá trị cốt lõi của Cơ chế A.</p>
          </div>

          <div class="net-compare-card accent-blue">
            <div class="net-concept-header">
              <h4 class="net-compare-title"><span>🔵</span> Cơ Chế B</h4>
              <span class="net-concept-badge">Đặc tính B</span>
            </div>
            <ul class="net-spec-list">
              <li class="net-spec-item">
                <span class="net-spec-label">📍 Tiêu chí 1</span>
                <span class="net-spec-val">Mô tả đặc điểm nổi bật...</span>
              </li>
              <li class="net-spec-item">
                <span class="net-spec-label">⚡ Tiêu chí 2</span>
                <span class="net-spec-val">Thông số hoặc hành vi cụ thể...</span>
              </li>
            </ul>
            <p class="net-compare-verdict">➔ Đúc kết: Giá trị cốt lõi của Cơ chế B.</p>
          </div>
        </div>
      `
    },
    {
      id: "sec-worked-example",
      title: "3. Ví dụ có lời giải từng bước (Worked Example)",
      content: `
        <p><strong>Bài toán thực tế:</strong> Nêu đề bài cụ thể với con số rõ ràng...</p>
        <div class="net-calc-box">
          <div class="net-calc-header">
            <h4 class="net-calc-title">🧮 Lời giải phân tích từng bước</h4>
            <span class="net-calc-badge">Worked Example</span>
          </div>
          <div class="net-calc-body">
            <div class="net-calc-step">
              <div class="net-calc-step-title">Bước 1: ...</div>
              <pre class="net-calc-formula">Phép tính cụ thể không bỏ bước trung gian...</pre>
            </div>
            <div class="net-calc-result">✓ Kết luận: Ý nghĩa của con số vừa tìm được.</div>
          </div>
        </div>
      `
    },
    {
      id: "sec-lab",
      title: "4. Thực hành (Lab): Kiểm chứng trực tiếp trên máy tính",
      content: `
        <div class="net-step-card">
          <div class="net-step-header">
            <span class="net-step-badge">BƯỚC 1</span>
            <h4 class="net-step-title">Tên thao tác thực hành</h4>
          </div>
          <p class="net-step-desc">Hướng dẫn rõ ràng người học mở công cụ nào và quan sát điều gì...</p>
          <div class="net-verify-box">
            <span class="net-verify-icon">✓</span>
            <span><strong>Cách kiểm tra bạn làm đúng:</strong> Tiêu chí xác nhận kết quả thành công.</span>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: "Thực hành trên Windows (CMD / PowerShell)",
          lang: "cmd",
          code: "ping 8.8.8.8",
          output: "Kết quả mẫu...",
          annotations: [
            { line: 1, text: "Giải thích ý nghĩa dòng lệnh và thông số trả về." }
          ]
        },
        {
          title: "Thực hành trên Linux / WSL / macOS (Bash)",
          lang: "bash",
          code: "ping -c 4 8.8.8.8",
          output: "Kết quả mẫu...",
          annotations: [
            { line: 1, text: "Giải thích sự tương đương trên môi trường Linux." }
          ]
        }
      ]
    },
    {
      id: "sec-incident-study",
      title: "5. Góc sự cố thực tế: Tình huống chẩn đoán đời thường",
      content: `
        <div class="net-incident-card">
          <div class="net-incident-header">
            <span>🚨</span>
            <span>CASE STUDY: TÊN TÌNH HUỐNG LỖI MẠNG</span>
          </div>
          <div class="net-incident-body">
            <p><strong>Hiện tượng:</strong> ...</p>
            <p><strong>Khám nghiệm bản chất:</strong> ...</p>
            <div class="net-verify-box">
              <span class="net-verify-icon">✓</span>
              <span><strong>Bài học chẩn đoán:</strong> ...</span>
            </div>
          </div>
        </div>
      `
    }
  ],
  callouts: {
    pitfalls: [
      { title: "Tên hiểu lầm phổ biến 1", content: "Giải thích rõ vì sao sai và bản chất đúng là gì..." },
      { title: "Tên hiểu lầm phổ biến 2", content: "Giải thích rõ..." },
      { title: "Tên hiểu lầm phổ biến 3", content: "Giải thích rõ..." }
    ],
    tips: [
      { title: "Mẹo ghi nhớ / thao tác nhanh", content: "Kinh nghiệm thực tế giúp nhớ lâu hoặc chẩn đoán nhanh..." }
    ]
  },
  exercises: [
    {
      id: "ex-1-01-1",
      level: "Dễ",
      title: "Bài 1: Câu hỏi nhận diện & nắm vững khái niệm",
      problem: "Đề bài mức độ Dễ...",
      hint: "Gợi ý ngắn...",
      solutionCode: "Đáp án trình bày rõ từng ý...",
      explanation: "Giải thích lý do..."
    },
    {
      id: "ex-1-01-2",
      level: "Vừa",
      title: "Bài 2: Bài toán tính toán / phân tích tình huống",
      problem: "Đề bài mức độ Vừa...",
      hint: "Gợi ý công thức...",
      solutionCode: "Các bước giải chi tiết...",
      explanation: "Giải thích kết quả..."
    },
    {
      id: "ex-1-01-3",
      level: "Khó",
      title: "Bài 3: Thực hành tổng hợp / chẩn đoán thực nghiệm",
      problem: "Đề bài mức độ Khó...",
      hint: "Gợi ý lệnh kiểm chứng...",
      solutionCode: "Lệnh thực thi và phân tích kết quả...",
      explanation: "Đúc kết bản chất kỹ thuật..."
    }
  ],
  summary: [
    "1. Ý cốt lõi thứ nhất của bài học.",
    "2. Ý cốt lõi thứ hai của bài học.",
    "3. Ý cốt lõi thứ ba của bài học.",
    "4. Ý cốt lõi thứ tư của bài học.",
    "5. Ý cốt lõi thứ năm của bài học."
  ],
  selfReviewQuestions: [
    "1. Câu hỏi tự kiểm tra nhanh số 1?",
    "2. Câu hỏi tự kiểm tra nhanh số 2?",
    "3. Câu hỏi tự kiểm tra nhanh số 3?"
  ],
  reflectionQuestion: "Một câu hỏi đào sâu bản chất để người học tự diễn đạt lại bằng lời của mình?",
  reflectionHint: "Gợi ý định hướng tư duy từ giảng viên để người học đối chiếu sau khi tự suy nghĩ.",
  nextLessonPreview: "Bài X.Y: Tên bài học tiếp theo — Câu dẫn nối mạch kiến thức tò mò sang bài mới."
}
```

---

## 7. Checklist Nghiệm Thu 8 Bước

- [ ] **1. Cú pháp JS sạch 100%**: Chạy `node tools/verify-all.mjs` đạt toàn bộ các mục (`0` lỗi).
- [ ] **2. KHÔNG CÓ BẢNG THÔ**: Tuyệt đối không dùng bảng Markdown hoặc `<table>` cho các phần so sánh; toàn bộ dùng `.net-compare-grid` + `.net-spec-list` hoặc `.net-packet-strip`.
- [ ] **3. Đủ 9 phần sư phạm (HP1) hoặc 12 phần (HP2)**: Không rút gọn, không gộp bài, không bỏ bước tính toán trung gian.
- [ ] **4. Sơ đồ trực quan**: `intuition.visualHtml` có `.net-arch-box` đủ tầng màu ngữ nghĩa; không có `<pre>` trần trụi.
- [ ] **5. Không có class lạ**: Mọi class `.net-*` trong bài đều có thực trong `css/network.css`.
- [ ] **6. `callouts` đúng cấp**: `pitfalls` và `tips` nằm gọn trong `callouts: { pitfalls, tips }`.
- [ ] **7. Lab đa nền tảng có kiểm chứng**: Có `.net-step-card` + `.net-verify-box` + `codeExamples` kèm `output` và `annotations`.
- [ ] **8. Không lặp khối tự động**: `reflectionQuestion`, `reflectionHint`, `selfReviewQuestions`, `nextLessonPreview` đặt ở cấp cao nhất của `lesson`, không viết lặp HTML vào `sections`.
