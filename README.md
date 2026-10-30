# Nền Tảng Tự Học Lập Trình Thực Chiến

> **Hệ thống tài liệu và học tập lập trình thuần tĩnh (Vanilla Web Stack)**: Chạy trực tiếp trên trình duyệt, tốc độ tức thì, không cần cài đặt Node.js hay build step, hỗ trợ cả môi trường máy chủ HTTP lẫn mở trực tiếp file offline (`file://`).

---

## 🚀 Cách Sử Dụng

### 1. Khởi chạy website

Bạn có thể sử dụng theo một trong hai cách cực kỳ đơn giản:

* **Cách 1 — Mở trực tiếp (Ngoại tuyến / `file://`)**: 
  Nhấp đúp chuột trực tiếp vào bất kỳ file nào (`index.html`, `github.html`, `linux.html`, `network.html`) để học ngay mà không cần cài đặt bất kỳ công cụ nào.
* **Cách 2 — Khởi chạy qua Local HTTP Server (Khuyến nghị)**: 
  Chạy lệnh sau tại thư mục dự án để trình duyệt nạp native ES Modules nhanh nhất:
  ```bash
  python -m http.server 8788 --bind 127.0.0.1
  # Mở trình duyệt tại: http://127.0.0.1:8788/index.html
  ```
  *(Hoặc chuột phải vào `index.html` chọn **Open with Live Server** trong VS Code).*

---

### 2. Bản đồ 4 Phân hệ Học tập

Truy cập nhanh thông qua thanh Header điều hướng trên cùng hoặc mở file tương ứng:

| Chuyên đề | File vào | Quy mô | Nội dung chính |
|---|---|---|---|
| **🐍 Python Chuyên Sâu** | [`index.html`](index.html) | 219 bài | Nền tảng, tư duy thuật toán, bản chất kiểu số/chuỗi, OOP và nội bộ CPython (Mark Lutz). |
| **🐙 Git & GitHub** | [`github.html`](github.html) | 20 bài | Chu trình 3 trạng thái, phân nhánh, rebase, giải quyết conflict, CI/CD và Git Cheat Sheet. |
| **🐧 Linux Thực Chiến** | [`linux.html`](linux.html) | 41 bài | Dòng lệnh CLI, quản trị tiến trình & systemd, Docker, Nginx đến kiến trúc Nhân (Kernel). |
| **🌐 Linux Networking** | [`network.html`](network.html) | 70 bài | Mô hình OSI/TCP-IP, định tuyến, firewall (iptables/nftables), socket, phân tích gói tin. |

---

### 3. Các tiện ích hỗ trợ học tập

* **Bố cục 3 cột thông minh**:
  * *Cột trái*: Danh mục bài học phân cấp (Accordion), thanh tiến độ (%) và bộ lọc học phần.
  * *Cột giữa*: Nội dung bài giảng tối ưu cho việc đọc tập trung, kèm khối code có nút copy và chú thích.
  * *Cột phải*: Mục lục nhanh trong bài (Scrollspy) giúp nhảy ngay đến phần cần xem.
* **Tự động lưu tiến độ (`localStorage`)**: Ghi nhớ bài học đang đọc, các bài đã hoàn thành và đáp án Quiz đã chọn.
* **Bộ Widget tương tác (Interactive Pure JS)**: Trực quan hóa cơ chế bộ nhớ, cắt lát chuỗi (slice), mã hóa Unicode PEP 393, chuẩn IEEE 754 số thực...
* **Tùy biến đọc**: Nút đổi giao diện Sáng / Tối (☀️/🌙) và chỉnh cỡ chữ (`A-`, `A`, `A+`) bảo vệ mắt khi học lâu.

---

## 🎯 Cách Học Hiệu Quả Nhất Với Sản Phẩm Này

Học lập trình là quá trình **xây dựng mô hình tư duy và phản xạ gõ mã**, không phải đọc thuộc lòng lý thuyết. Để hấp thu tối đa giá trị từ 350 bài học, hãy áp dụng các nguyên tắc sau:

### 1. Chu trình 4 bước cho mỗi bài học

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   1. TRỰC GIÁC   │ ──► │   2. TỰ GÕ MÃ   │ ──► │  3. THỬ BIẾN DỊ │ ──► │  4. QUIZ & BÀI  │
│  Hiểu bản chất  │     │  Không copy/paste│     │  Cố tình gây lỗi│     │  Tự giải 10p   │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

1. **Nắm bắt trực giác trước (3 phút)**: Đọc kỹ phần *Mục tiêu* và *Trực giác cốt lõi* ở đầu bài. Hãy hình dung cơ chế vận hành trong đầu trước khi nhìn thấy cú pháp code.
2. **Tự tay gõ mã — Tuyệt đối không chỉ bấm Copy (10–15 phút)**:
   * Mở song song cửa sổ dòng lệnh (Terminal / Python REPL) bên cạnh trình duyệt.
   * Tự tay gõ lại từng dòng ví dụ để tạo trí nhớ cơ bắp (muscle memory).
3. **Thử nghiệm và cố tình gây lỗi (Break the code)**:
   * Đừng chỉ chạy mã đúng. Hãy cố tình truyền sai kiểu dữ liệu, vượt biên mảng, hoặc thay đổi tham số để quan sát cách trình thông dịch báo lỗi (Traceback).
   * Thao tác trên các **Interactive Widgets** với các giá trị biên (số âm, chuỗi rỗng, ký tự Unicode đặc biệt).
4. **Giải bài tập và trắc nghiệm củng cố**:
   * *Quy tắc 10 phút*: Tự suy nghĩ và code bài tập ít nhất 10 phút trước khi nhấn mở gợi ý / lời giải mẫu.
   * Làm Quiz trắc nghiệm: Nếu chọn sai, hãy đọc kỹ phần giải thích chi tiết để lấp ngay lỗ hổng kiến thức.
   * Nhấn **Đánh dấu hoàn thành** để ghi nhận tiến độ vào thanh đo tổng thể.

---

### 2. Gợi ý lộ trình theo mục tiêu cá nhân

* **Lộ trình 1: Người mới bắt đầu (Zero to Hero)**
  * Python Phần 0 (Nền tảng Tên – Đối tượng) ➔ Python Phần 0B (Flowchart & Tư duy thuật toán).
  * Chuyển qua Git Level 1 để biết lưu trữ bài tập hàng ngày.
  * Làm quen với dòng lệnh Linux Level 1.
* **Lộ trình 2: Đào sâu bản chất & Tối ưu hiệu năng (Deep Dive)**
  * Python Phần 1 (Kiểu số & IEEE 754) ➔ Chuỗi & Bộ nhớ Unicode PEP 393.
  * Nghiên cứu sâu Học phần III & IV (Chuyển thể từ tác phẩm *Learning Python* của Mark Lutz).
  * Khám phá Linux Level 4 (Kernel & System Calls) và Linux Networking.
* **Lộ trình 3: Hướng nghiệp Backend & DevOps**
  * Làm chủ toàn diện Cấu trúc dữ liệu & Xử lý ngoại lệ trong Python.
  * Git Level 2 & 3 (Quy trình PR, Git Rebase, CI/CD GitHub Actions).
  * Linux Level 2, 3 (Systemd, Nginx, Docker) kết hợp 70 bài Linux Networking thực chiến.

---

## ⌨️ Phím Tắt Thao Tác Nhanh

Hệ thống được thiết kế tối ưu cho thao tác bàn phím, giúp việc chuyển bài mượt mà:

| Phím tắt | Chức năng |
|---|---|
| <kbd>]</kbd> hoặc <kbd>Alt</kbd> + <kbd>→</kbd> | **Bài tiếp theo**: Tự động đánh dấu bài hiện tại hoàn thành và nhảy sang bài kế tiếp |
| <kbd>[</kbd> hoặc <kbd>Alt</kbd> + <kbd>←</kbd> | **Bài trước đó**: Quay lại bài học liền trước |
| <kbd>Esc</kbd> | **Đóng Drawer / Menu**: Áp dụng khi dùng trên giao diện di động hoặc máy tính bảng |

*(Phím tắt sẽ tự động tạm dừng khi bạn đang nhập liệu trong ô văn bản).*

---

## 🛠️ Dành Cho Người Phát Triển (Developer Notes)

Nếu bạn muốn đóng góp hoặc mở rộng bài học:
* **Kiểm tra tính toàn vẹn**: Luôn chạy `node tools/verify-all.mjs` trước và sau khi chỉnh sửa dữ liệu.
* **Sinh lại bundle ngoại tuyến**: Sau khi thêm/sửa bài học Python trong `data/lessons/`, chạy `node tools/build-fallback.mjs` để cập nhật `js/file-fallback.js`.
* **Quy ước chi tiết**: Xem file [AGENTS.md](AGENTS.md) để biết các bất biến kiến trúc và quy tắc mã nguồn.
