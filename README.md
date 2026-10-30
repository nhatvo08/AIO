# Hệ Thống Học Tập Lập Trình Chuyên Sâu: Python 3.14.8, Git & Linux Thực Chiến

> **Nền tảng tài liệu và học tập lập trình thuần tĩnh (Vanilla Web Stack)**: Tốc độ tức thì, không cần cài đặt Node.js hay build step phức tạp, hỗ trợ học tập trực tiếp qua trình duyệt web trên cả môi trường máy chủ HTTP lẫn chế độ ngoại tuyến (`file://`).

---

## 📑 Mục lục

1. [Tổng quan Nền tảng](#-tổng-quan-nền-tảng)
2. [Bản đồ 3 Phân hệ Học tập](#-bản-đồ-3-phân-hệ-học-tập)
3. [Hướng dẫn Khởi chạy & Trải nghiệm](#-hướng-dẫn-khởi-chạy--trải-nghiệm)
4. [Hướng dẫn Sử dụng Tính năng Toàn diện](#-hướng-dẫn-sử-dụng-tính-năng-toàn-diện)
5. [Đề xuất Lộ trình & Phương pháp Học tập Hiệu quả](#-đề-xuất-lộ-trình--phương-pháp-học-tập-hiệu-quả)
6. [Hệ thống Phím tắt & Tiện ích Điều hướng](#-hệ-thống-phím-tắt--tiện-ích-điều-hướng)
7. [Dành cho Nhà phát triển & Đóng góp](#-dành-cho-nhà-phát-triển--đóng-góp)

---

## 🌟 Tổng quan Nền tảng

Hệ thống được thiết kế theo triết lý **"Hiểu từ Bản chất đến Bộ nhớ"** — không chỉ học cú pháp bề nổi mà giải thích thấu đáo cách trình thông dịch CPython, hệ điều hành Linux và hệ thống kiểm soát phiên bản Git vận hành bên dưới.

### Quy mô Nội dung Hiện tại

| Chỉ số | Chi tiết |
|---|---|
| **Tổng số bài học** | **280 bài chuyên sâu** (219 bài Python + 20 bài Git/GitHub + 41 bài Linux) |
| **Công nghệ nền tảng** | HTML5 chuẩn ngữ nghĩa, CSS3 hiện đại (CSS Variables, Grid, Flexbox), Pure ES Modules & IIFE JavaScript |
| **Công thức Toán học** | Tích hợp KaTeX 0.16.11 hiển thị công thức đại số, ma trận và số học máy tính mượt mà |
| **Interactive Widgets** | 6 công cụ tương tác thuần JavaScript mô phỏng trực quan cơ chế bộ nhớ, cắt lát, bit và Unicode |
| **Trạng thái lưu trữ** | Tự động đồng bộ tiến độ học, ghi nhớ câu trả lời Quiz, cỡ chữ và giao diện Sáng/Tối vào `localStorage` |

---

## 🗺️ Bản đồ 3 Phân hệ Học tập

Dự án phân tách thành 3 cổng vào độc lập tại thư mục gốc, có thanh điều hướng chuyển đổi linh hoạt trên đầu trang:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TOP NAVIGATION HEADER                           │
│   🐍 Python (index.html)  │  🐙 GitHub (github.html)  │  🐧 Linux      │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Khóa Học Python 3.14.8 Toàn Diện (`index.html`)
Bao gồm **219 bài học**, chia làm 4 học phần lớn với các cập nhật tính năng mới nhất từ Python 3.14 (PEP 750 t-strings, tối ưu hóa CPython, Numeric Tower PEP 3141):

* **Học phần I: Python — Nền tảng & Số học (43 bài)**
  * *Phần 0: Nền tảng Python (13 bài)*: Kiến trúc phần cứng, mô hình Tên – Đối tượng, tính bất biến, cơ chế quản lý bộ nhớ refcount, 10 kiểu dữ liệu cốt lõi và kỹ năng đọc traceback.
  * *Phần 0B: Flowchart và Tư duy Thuật toán (24 bài)*: Rèn luyện tư duy giải quyết vấn đề qua lưu đồ thuật toán, rẽ nhánh điều kiện, vòng lặp và phương pháp phân rã bài toán.
  * *Phần 1: Các Kiểu Số trong Python (6 bài)*: Số nguyên `int` độ chính xác vô hạn, số thực `float` chuẩn IEEE 754, module `decimal`, `fractions`, số phức `complex` và tháp số PEP 3141.
* **Học phần II: Làm chủ Chuỗi (`str`) trong Python 3.14.8 (28 bài)**
  * *8 Phần chuyên sâu*: Nền tảng chuỗi, 47 phương thức có sẵn của `str`, nghệ thuật định dạng chuỗi (`f-string`, format specifier, template strings PEP 750), cấu trúc Unicode & CPython PEP 393 (1-byte Latin-1, 2-byte UCS-2, 4-byte UCS-4), xử lý văn bản nâng cao, tối ưu hiệu năng và bảo mật ứng dụng.
* **Học phần III: Learning Python (Mark Lutz) — Part 2: Types and Operations (138 bài)**
  * Bản dịch và chuyển thể chi tiết từ tác phẩm kinh điển *Learning Python*:
    * *Chương 4*: Giới thiệu tổng quan hệ sinh thái đối tượng Python (33 bài).
    * *Chương 5*: Số học, toán tử và biểu thức chuyên sâu (23 bài).
    * *Chương 6*: Khúc đệm về định kiểu động (Dynamic Typing) và tham chiếu bộ nhớ (16 bài).
    * *Chương 7*: Nền tảng toàn diện về chuỗi ký tự (23 bài).
    * *Chương 8*: Danh sách (`list`) và Từ điển (`dict`) từ bản chất đến ứng dụng (23 bài).
    * *Chương 9*: Bộ dữ liệu (`tuple`), Tệp tin (`file`) và các kiểu đối tượng nâng cao (20 bài).
* **Học phần IV: Learning Python (Mark Lutz) — Part 3: Statements and Syntax (10 bài)**
  * *Chương 10*: Giới thiệu các câu lệnh trong Python, cú pháp khối lệnh thụt lề, vòng lặp và quy tắc tài liệu hóa mã nguồn (10 bài).

### 2. Chuyên Đề Git & GitHub Thực Chiến (`github.html`)
Bao gồm **18 bài học thực hành + 2 bài phụ lục tra cứu**:
* **Level 1 — Nền tảng & Cốt lõi (6 bài)**: Cấu trúc bên trong của Git (`.git/objects`, commit SHA, tree, blob), chu trình làm việc 3 trạng thái, phân nhánh `branch`, sáp nhập `merge`, giải quyết xung đột (conflict).
* **Level 2 — Làm việc nhóm & GitHub (6 bài)**: Quản lý remote repository, mô hình phân nhánh Git Flow & GitHub Flow, chiến lược Pull Request, kỹ năng Code Review chuẩn mực.
* **Level 3 — Nâng cao, CI/CD & Bảo mật (6 bài)**: `git rebase` tương tác, `cherry-pick`, cứu dữ liệu đã mất bằng `git reflog`, dò lỗi bằng `git bisect`, thiết lập CI/CD Pipeline với GitHub Actions cho dự án Python và ký xác thực commit GPG.
* **Phụ lục Tra cứu Thực chiến**:
  * *Bảng tra cứu Git Cheat Sheet*: Hệ thống hóa 100% lệnh thường dùng theo từng tình huống công việc.
  * *Bảng thuật ngữ Git & GitHub Glossary*: Định nghĩa chuẩn xác các khái niệm từ Upstream, Fork, Fast-forward tới Detached HEAD.

### 3. Chuyên Đề Linux Thực Chiến & Nội Bộ Hệ Điều Hành (`linux.html`)
Bao gồm **41 bài học**, phân bổ thành 4 cấp độ bài bản:
* **Level 1 — Dòng lệnh Thực chiến & Hệ thống File (10 bài)**: Kỹ năng điều hướng Shell, hệ thống quyền tập tin POSIX (`chmod`, `chown`, `umask`), ống dẫn `pipe` và chuyển hướng luồng dữ liệu (`<`, `>`, `2>&1`), các tiện ích tìm kiếm và lọc (`find`, `grep`, `awk`, `sed`).
* **Level 2 — Quản trị Hệ thống, Tiến trình & Dịch vụ (11 bài)**: Vòng đời tiến trình, quản trị dịch vụ với `systemd` (service unit, timer thay thế cron), quản lý gói (`apt`, `dnf`), mạng máy tính cơ bản (`ip`, `ss`, tường lửa `ufw`) và kết nối an toàn qua SSH.
* **Level 3 — Triển khai Dịch vụ, DevOps & Tự động hóa (10 bài)**: Cấu hình Web Server Nginx Reverse Proxy, chứng chỉ HTTPS Let's Encrypt, Container hóa ứng dụng với Docker, tự động hóa hạ tầng với Ansible và viết Shell Script chuyên nghiệp.
* **Level 4 — Nội bộ Hệ điều hành & Kiến trúc Nhân Linux (10 bài)**: Khám phá kiến trúc nhân (Monolithic Kernel vs Microkernel), Hệ thống tệp ảo VFS, Quản lý bộ nhớ ảo (Paging, Page Fault, Swap, OOM Killer), công nghệ giám sát nhân eBPF và phương pháp chẩn đoán hiệu năng hệ thống USE (Utilization, Saturation, Errors).

---

## 🚀 Hướng Dẫn Khởi Chạy & Trải Nghiệm

Website hoàn toàn không cần `npm install` hay trình biên dịch bundle. Bạn có thể sử dụng theo 2 phương thức:

### Phương thức 1: Chạy qua HTTP Server Cục bộ (Khuyến nghị)
Đây là cách tốt nhất để trình duyệt nạp các mô-đun JavaScript gốc (Native ES Modules) với hiệu năng tối ưu:

```bash
# Sử dụng Python (có sẵn trong mọi bản cài đặt Python)
python -m http.server 8788 --bind 127.0.0.1

# Sau đó mở trình duyệt tại:
http://127.0.0.1:8788/index.html
```

* **VS Code Live Server**: Nhấp chuột phải vào `index.html` chọn **Open with Live Server** (Cổng mặc định đã cấu hình trong dự án là `5501`).
* **Node.js**: Nếu máy bạn có cài Node.js, có thể gõ `npx serve .` hoặc `npx http-server`.

### Phương thức 2: Mở Trực Tiếp Không Cần Server (`file://`)
Khi bạn đang di chuyển hoặc không có môi trường chạy server, chỉ cần **nhấp đúp chuột vào bất kỳ file nào trong 3 file**: `index.html`, `github.html`, hoặc `linux.html`:
* Cơ chế tự động phát hiện giao thức sẽ nạp bundle `js/file-fallback.js` để vượt qua rào cản CORS của trình duyệt đối với ES Modules.
* Toàn bộ 219 bài học Python, 20 bài Git và 41 bài Linux vẫn hiển thị đầy đủ 100%.

> [!NOTE]
> Thư viện công thức toán KaTeX được tải từ CDN jsDelivr. Trong lần mở đầu tiên, bạn cần kết nối mạng Internet để trình duyệt tải tệp phông chữ và CSS toán học; sau đó trình duyệt sẽ lưu vào bộ nhớ đệm (cache).

---

## 🎯 Hướng Dẫn Sử Dụng Tính Năng Toàn Diện

### 1. Bố Cục 3 Cột Chuẩn Mực (Desktop) & Responsive Mobile
* **Cột trái (Sidebar Left)**:
  * Thanh tiến độ học tập tổng thể (%) và số bài đã hoàn thành.
  * Hàng nút lọc học phần (Course Tabs): Chọn xem riêng *Tất cả*, *🐍 Python*, *🔤 Chuỗi (str)*, *📖 Learning Python Part 2*, hoặc *📜 Learning Python Part 3*.
  * Cây mục lục bài học dạng Accordion thông minh: Tự động cuộn đến bài học đang mở, có thể đóng/mở từng chương.
* **Cột giữa (Main Content)**: Không gian hiển thị bài học thoáng đãng, tối ưu cho việc đọc tập trung lâu dài.
* **Cột phải (Sidebar Right)**: Mục lục con "Trong bài này" (On-this-page Table of Contents). Theo dõi vị trí cuộn trang theo thời gian thực (Scrollspy) và cho phép nhảy nhanh đến từng mục.
* **Chế độ Mobile/Tablet**: Tự động chuyển đổi thành bố cục 1 cột. Sidebar chuyển thành ngăn kéo trượt (Drawer) điều khiển bằng nút ☰ trên thanh tiêu đề.

### 2. Cấu Trúc 8 Mục Chuẩn Mực Trong Mỗi Bài Học
Mỗi bài học được biên soạn công phu theo chuẩn sư phạm 8 bước:
1. **Mục tiêu bài học (🎯 Objectives)**: Liệt kê rõ ràng những kiến thức và kỹ năng bạn sẽ làm chủ sau bài học.
2. **Trực giác cốt lõi (💡 Intuition)**: Ẩn dụ và hình tượng hóa khái niệm kỹ thuật để não bộ nắm bắt ý tưởng tự nhiên nhất.
3. **Các lớp phân tích chuyên sâu (Sections)**: Nội dung chính đi từ cơ chế đến bản chất, chia thành các phần nhỏ mạch lạc.
4. **Khối ví dụ mã nguồn (Code Examples)**:
   * Nút **Sao chép (Copy)** 1-click tiện lợi.
   * Khung kết quả đầu ra (Output) thực tế đã được kiểm chứng trên bản Python 3.14.8.
   * Bảng chú thích từng dòng lệnh quan trọng (Line Annotations).
5. **Hộp lưu ý & Đào sâu**:
   * ⚠️ **Lỗi thường gặp (Pitfalls)**: Cảnh báo những cạm bẫy tư duy mà người học hay mắc phải.
   * 💡 **Ghi nhớ (Tips)**: Mẹo thực hành và quy ước chuẩn PEP 8.
   * ✨ **Mới trong Python 3.14**: Cập nhật những cải tiến ngôn ngữ mới nhất.
   * 🔍 **Chuyên sâu (Deep Dive)**: Mở rộng kiến thức về CPython, mã máy bytecode và giải thuật ngầm.
6. **Bài tập thực hành 3 mức (Dễ / Vừa / Khó)**: Kèm đề bài, gợi ý tư duy và khung lời giải chi tiết có nút gập/mở.
7. **Trắc nghiệm tương tác (Quiz)**: 3–5 câu hỏi kiểm tra kiến thức tức thì. Bấm chọn đáp án sẽ hiển thị phản hồi Đúng/Sai và giải thích cặn kẽ tại sao.
8. **Tóm tắt bài học & Thanh điều hướng**: Tổng hợp các gạch đầu dòng cốt lõi và các nút chuyển bài tiếp theo / bài trước.

### 3. Hệ Thống 6 Công Cụ Tương Tác Trực Quan (Interactive Pure JS Widgets)
Trong các bài học trọng tâm của khóa Python, bạn sẽ được trải nghiệm các widget trực quan:
* 🪓 **String Slice Viewer**: Nhập chuỗi, chỉ số `start`, `stop`, `step` (hỗ trợ cả số âm) để quan sát thuật toán `PySlice_AdjustIndices` của CPython trích xuất từng ký tự trực quan.
* 🌐 **Unicode & CPython Memory Inspector**: Nhập văn bản bất kỳ để xem bảng mã Code Point thập phân, thập lục phân, mã hóa UTF-8, UTF-16 và cấu trúc bộ nhớ tối ưu hóa PEP 393 (1 byte, 2 byte hoặc 4 byte trên mỗi ký tự).
* 🧭 **47 Methods Explorer**: Bảng tra cứu tương tác toàn diện 47 phương thức của kiểu chuỗi `str`, phân loại theo nhóm chức năng (tìm kiếm, biến đổi, kiểm tra, tách/ghép), kèm thanh tìm kiếm tức thời và mã ví dụ chạy thử.
* 🛠️ **Format String Builder**: Thử nghiệm trực tiếp cú pháp định dạng chuỗi `f-string`, các ký tự căn lề `<`, `>`, `^`, dấu phẩy ngăn cách hàng nghìn và quy định số chữ số thập phân.
* 🧠 **Immutability & Object Identity Viewer**: Trực quan hóa mối quan hệ giữa biến (nhãn tên) và vùng nhớ đối tượng trong RAM, giải thích tường tận vì sao chuỗi và số trong Python là bất biến (immutable).
* 🔬 **IEEE 754 Float Inspector**: Giải mã cấu trúc 64-bit của số thực dấu phẩy động: Bit dấu (Sign), 11-bit số mũ (Exponent) và 52-bit phần định trị (Mantissa), giải mã bí ẩn tại sao `0.1 + 0.2 != 0.3`.

### 4. Hệ Thống Quản Lý Tiến Độ Cá Nhân Hóa
* **Đánh dấu hoàn thành bài học**: Nút *"Đánh dấu hoàn thành"* ở cuối mỗi bài học giúp bạn chủ động ghi nhận tiến độ. Khi bạn bấm *"Bài tiếp theo"*, bài học hiện tại cũng sẽ được tự động tích hoàn thành.
* **Tự động lưu trạng thái (Auto-save)**: Dữ liệu bài học đã đọc, vị trí bài học cuối cùng và các đáp án trắc nghiệm được lưu tự động trong `localStorage` của trình duyệt.
* **Tiếp tục học chỉ với 1 Click**: Tại Trang chủ, nút lớn *"Tiếp tục học: Bài X.X"* sẽ tự động dẫn bạn tới bài học đang dang dở.

### 5. Tùy Biến Giao Diện & Trải Nghiệm Đọc
* **Chế độ Sáng / Tối (Light / Dark Theme)**: Nút chuyển đổi trên thanh Header với biểu tượng 🌙/☀️, bảo vệ mắt khi học ban đêm. Lựa chọn được đồng bộ tự động xuyên suốt cả 3 trang.
* **Chỉnh cỡ chữ linh hoạt**: 3 cấp độ chữ `A-` (Nhỏ), `A` (Vừa - chuẩn), `A+` (Lớn) phù hợp với mọi khoảng cách mắt và kích thước màn hình.
* **Thanh tiến độ đọc (Reading Progress Fill)**: Vạch màu mảnh trên cùng hiển thị chính xác bạn đã đọc được bao nhiêu phần trăm độ dài bài học hiện tại.
* **Nút Lên đầu trang (Back to top)**: Tự động xuất hiện ở góc dưới bên phải khi bạn cuộn trang xuống sâu, bấm vào để cuộn mượt lên đỉnh.

---

## 🧭 Đề Xuất Lộ Trình & Phương Pháp Học Tập Hiệu Quả

Học lập trình không phải là đọc thuộc lòng cú pháp, mà là rèn luyện khả năng tư duy mô hình hóa và kỹ năng gõ mã thực tế. Dưới đây là các lộ trình và phương pháp được đúc kết để bạn khai thác tối đa giá trị của website:

### 1. Lựa Chọn Lộ Trình Phù Hợp Với Bạn

```
                     ┌───────────────────────────────┐
                     │   BẠN LÀ AI KHI BẮT ĐẦU?      │
                     └──────────────┬────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
  [ Người mới bắt đầu ]     [ Đã biết cơ bản ]        [ Kỹ sư Backend / DevOps ]
          │                         │                         │
          ├─► Python Phần 0         ├─► Python Phần 1         ├─► Python Core vững
          ├─► Python Phần 0B        ├─► Python str (HP II)    ├─► Git Level 2 & 3
          ├─► Git Level 1           ├─► LP Part 2 & 3         ├─► Linux Level 2, 3, 4
          └─► Linux Level 1         └─► Linux Level 4         └─► CI/CD & Docker
```

#### Lộ trình A: Người Mới Bắt Đầu (Zero to Hero)
* **Mục tiêu**: Xây dựng nền tảng tư duy lập trình vững chắc, không bị hoang mang bởi các thuật ngữ trừu tượng.
* **Kế hoạch đề xuất**:
  1. **Bước 1**: Học trọn vẹn **Python Phần 0: Nền tảng Python** (13 bài). Tập trung hiểu rõ mô hình Tên – Đối tượng và cách Python quản lý vùng nhớ.
  2. **Bước 2**: Học song song **Python Phần 0B: Flowchart & Tư duy thuật toán** (24 bài). Hãy dùng giấy bút tự vẽ lại từng lưu đồ trước khi nhìn code.
  3. **Bước 3**: Chuyển sang **Git & GitHub Level 1** (6 bài) để biết cách khởi tạo repository và commit bài tập của mình hàng ngày.
  4. **Bước 4**: Học **Linux Level 1** (10 bài) để làm quen với dòng lệnh Terminal, chạy script Python bằng CLI thay vì chỉ dùng IDE đồ họa.

#### Lộ trình B: Lập Trình Viên Muốn Đào Sâu Bản Chất (Deep Dive Pythonic)
* **Mục tiêu**: Nâng tầm tư duy lập trình, hiểu sâu cơ chế CPython, tối ưu hiệu năng và viết mã chuẩn Pythonic.
* **Kế hoạch đề xuất**:
  1. **Bước 1**: Học **Python Phần 1: Các kiểu số** (IEEE 754, int vô hạn) và tương tác với công cụ *IEEE 754 Inspector*.
  2. **Bước 2**: Học toàn diện **Học phần II: Làm chủ Chuỗi (`str`)** (28 bài). Chú trọng phần Unicode, tối ưu CPython PEP 393 và các phương thức xử lý văn bản.
  3. **Bước 3**: Nghiền ngẫm **Học phần III & IV: Learning Python (Mark Lutz)**. Đây là kho tàng kiến thức sâu sắc về định kiểu động, cơ chế tham chiếu của `list`, `dict`, `tuple` và bản chất cú pháp.
  4. **Bước 4**: Đọc **Linux Level 4: Nội bộ Hệ điều hành** để thấu hiểu cách mã Python tương tác với Kernel, bộ nhớ ảo và các System Call.

#### Lộ trình C: Định Hướng Kỹ Sư Phần Mềm / Backend / DevOps
* **Mục tiêu**: Làm chủ trọn vẹn chu trình phát triển, kiểm thử, đóng gói và vận hành ứng dụng Python trên môi trường máy chủ.
* **Kế hoạch đề xuất**:
  1. **Python**: Hoàn thành Học phần I, II và III để làm chủ cấu trúc dữ liệu và xử lý ngoại lệ.
  2. **Git & GitHub**: Học trọn bộ **Level 2 & Level 3** — thực hành giải quyết conflict, quy trình Pull Request, tái cấu trúc commit bằng `git rebase` và xây dựng CI/CD Pipeline với GitHub Actions.
  3. **Linux**: Học trọn bộ **Level 2 & Level 3** — cấu hình Nginx Reverse Proxy, đóng gói ứng dụng với Docker, viết Systemd Service và tự động hóa bằng Shell Script/Ansible.

---

### 2. Quy Trình 5 Bước "Học Sâu — Nhớ Lâu" Cho Mỗi Bài Học

Để kiến thức thực sự trở thành kỹ năng của bạn, hãy áp dụng quy trình 5 bước sau cho từng bài học:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   BƯỚC 1     │     │   BƯỚC 2     │     │   BƯỚC 3     │     │   BƯỚC 4     │     │   BƯỚC 5     │
│  Mục tiêu &  │ ──► │  Đọc & Gõ    │ ──► │  Khám phá    │ ──► │  Giải bài tập│ ──► │  Đánh dấu &  │
│   Trực giác  │     │  trực tiếp   │     │   Widget     │     │   & Làm Quiz │     │  Tự đúc kết  │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

1. **Bước 1: Nạp khung tư duy (3–5 phút)**
   * Đọc phần **1. Mục tiêu bài học** để biết bài này giải quyết vấn đề gì.
   * Đọc phần **2. Trực giác** để liên hệ khái niệm với đời sống thực tế qua các phép ẩn dụ sinh động.
2. **Bước 2: Đọc lý thuyết và tự tay gõ lại mã nguồn (10–15 phút)**
   * **Nguyên tắc vàng**: *Tuyệt đối không chỉ dùng nút Copy mã!*
   * Mở cửa sổ dòng lệnh Python REPL hoặc trình soạn thảo của bạn lên, tự tay gõ lại từng dòng code ví dụ.
   * Thử thay đổi các tham số, thử truyền giá trị sai để cố ý tạo ra lỗi và quan sát cách Python báo lỗi.
3. **Bước 3: Tương tác với Widgets trực quan (nếu có)**
   * Thử các giá trị biên (như cắt lát với step âm, nhập ký tự Emoji Unicode nhiều byte, số thực cực lớn...).
   * Đối chiếu kết quả trên màn hình với lý thuyết bạn vừa đọc.
4. **Bước 4: Thử thách với Bài tập & Quiz (10 phút)**
   * Làm bài tập thực hành từ mức Dễ đến Khó.
   * *Quy tắc 10 phút*: Tự suy nghĩ và viết mã ít nhất 10 phút trước khi bấm mở khung xem lời giải mẫu.
   * Trả lời các câu hỏi Quiz trắc nghiệm. Nếu chọn sai, hãy đọc kỹ phần giải thích để sửa ngay lỗ hổng kiến thức.
5. **Bước 5: Đánh dấu và Đúc kết (2 phút)**
   * Bấm nút *"Đánh dấu hoàn thành bài học"*.
   * Ghi chép nhanh 1–2 điều bạn tâm đắc nhất (đặc biệt là các mục trong hộp *⚠️ Lỗi thường gặp*) vào sổ tay hoặc công cụ ghi chú cá nhân của bạn.

---

## ⌨️ Hệ Thống Phím Tắt & Tiện Ích Điều Hướng

Trải nghiệm học tập được tối ưu hóa tối đa cho thao tác bàn phím (Keyboard First):

| Phím tắt | Thao tác | Mô tả |
|---|---|---|
| <kbd>]</kbd> | **Bài tiếp theo** | Tự động đánh dấu bài hiện tại hoàn thành và chuyển sang bài kế tiếp |
| <kbd>[</kbd> | **Bài trước đó** | Lùi về bài học liền trước |
| <kbd>Alt</kbd> + <kbd>→</kbd> | **Tiến tới** | Phím tắt phụ tương đương phím `]` |
| <kbd>Alt</kbd> + <kbd>←</kbd> | **Lùi lại** | Phím tắt phụ tương đương phím `[` |
| <kbd>Esc</kbd> | **Đóng ngăn kéo** | Đóng menu điều hướng trên thiết bị di động |

> [!TIP]
> Khi con trỏ chuột hoặc tiêu điểm đang nằm trong ô nhập liệu văn bản (`<input>` hoặc `<textarea>`), phím tắt điều hướng bài học sẽ tự động vô hiệu hóa để không gây gián đoạn quá trình gõ phím của bạn.

---

## 🛠️ Dành Cho Nhà Phát Triển & Đóng Góp

Dự án tuân thủ nghiêm ngặt các nguyên tắc thiết kế tối giản, sạch sẽ và bền vững.

### 1. Cấu Trúc Thư Mục Dự Án

```
.
├── index.html                  # Điểm vào Khóa học Python (Không di chuyển)
├── github.html                 # Điểm vào Chuyên đề Git & GitHub (Không di chuyển)
├── linux.html                  # Điểm vào Chuyên đề Linux Thực chiến (Không di chuyển)
├── assets/                     # Biểu tượng Favicon và hình ảnh minh họa
├── css/                        # 7 tệp CSS module hóa (variables, layout, components, widgets, responsive...)
├── js/
│   ├── app.js                  # Bộ điều khiển chính cho khóa Python (ES Module)
│   ├── topic-engine.js         # Engine chung hiển thị các chuyên đề Git & Linux (IIFE thuần)
│   ├── github-app.js           # Cấu hình dữ liệu chuyên đề Git
│   ├── linux-app.js            # Cấu hình dữ liệu chuyên đề Linux
│   ├── widgets.js              # Mã nguồn 6 công cụ tương tác trực quan
│   ├── storage.js              # Lớp quản lý trạng thái và localStorage an toàn
│   ├── highlighter.js          # Bộ tô sáng cú pháp mã nguồn Python siêu nhẹ
│   └── file-fallback.js        # Bundle sinh tự động phục vụ chế độ mở qua file://
├── data/
│   ├── curriculum.js           # Cấu trúc mục lục khóa Python (Nguồn sự thật chuẩn)
│   ├── methods.js              # Dữ liệu tra cứu 47 phương thức chuỗi str
│   ├── lessons/                # 219 tệp bài học Python (Tên tệp chính là ID bài học)
│   ├── github/                 # Dữ liệu bài học Git (level1.js, level2.js, level3.js)
│   └── linux/                  # Dữ liệu bài học Linux (level1.js .. level4.js)
├── tools/
│   ├── verify-all.mjs          # Script kiểm tra toàn vẹn dự án (Không cần thư viện ngoài)
│   ├── build-fallback.mjs      # Script sinh lại file-fallback.js (Đa nền tảng)
│   └── calc_sri.mjs            # Script tính hash bảo mật SRI cho CDN KaTeX
├── AGENTS.md                   # Chỉ dẫn và quy ước bất biến dành cho AI Agent
└── README.md                   # Hướng dẫn sử dụng và lộ trình học tập toàn diện
```

### 2. Các Lệnh Kiểm Tra Toàn Vẹn & Xây Dựng

Trước và sau bất kỳ thay đổi nào liên quan đến dữ liệu bài học hoặc cấu trúc mã nguồn, hãy chạy script kiểm tra:

```bash
# Kiểm tra toàn bộ 6 hạng mục toàn vẹn của dự án
node tools/verify-all.mjs
```

Nếu bạn thêm mới hoặc chỉnh sửa nội dung các bài học Python trong thư mục `data/lessons/`, hãy sinh lại gói dữ liệu cho chế độ ngoại tuyến:

```bash
# Tự động cập nhật js/file-fallback.js
node tools/build-fallback.mjs
```

### 3. Các Quy Tắc Bất Biến Cần Ghi Nhớ
* **Không đổi tên các tệp trong `data/lessons/*.js`** trừ khi cập nhật đồng thời trường `id` tương ứng trong `data/curriculum.js`.
* **Không chỉnh sửa thủ công tệp `js/file-fallback.js`** — luôn dùng lệnh `node tools/build-fallback.mjs` để sinh tự động.
* **Giữ nguyên 3 tệp HTML tại thư mục gốc** để đảm bảo đường dẫn tương đối và tính tương thích liên kết chéo.
* Đọc kỹ tài liệu [AGENTS.md](AGENTS.md) trước khi thực hiện các tác vụ tự động hóa bằng AI.

---

## 📜 Giấy Phép & Tinh Thần Dự Án

Dự án được xây dựng với mục tiêu mang đến cho cộng đồng lập trình viên Việt Nam một nguồn tài liệu học tập lập trình **bài bản, sâu sắc, trực quan và hoàn toàn miễn phí**. 

Chúc bạn có những giờ phút học tập đầy cảm hứng và nhanh chóng làm chủ thế giới lập trình! 🚀🐍🐙🐧
