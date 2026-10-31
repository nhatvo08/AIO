# 07 — BỘ QUY TẮC THIẾT KẾ UI/UX TOÀN DIỆN CHO NỀN TẢNG HỌC KỸ THUẬT TĨNH
*(Static Technical Learning UI/UX Design System & Engineering Rulebook — v3.0)*

> **Phạm vi áp dụng**: Toàn bộ các trang bài học thuộc nền tảng học lập trình & mạng máy tính tĩnh (HTML/CSS/JS thuần, không bundler, không framework). Trọng tâm chuẩn hóa: **Chuyên đề Networking (`network.html`)**, làm khuôn mẫu áp dụng cho Python, Linux và GitHub.
>
> **Mục tiêu cốt lõi**:
> 1. **Đẹp & Hiện đại**: Bố cục thoáng, chiều sâu tinh tế qua hệ thống Elevation, không lòe loẹt.
> 2. **Trực quan & Dễ đọc**: Loại bỏ hoàn toàn bảng thô và vách đá văn bản, dẫn dắt ánh mắt mượt mà, giảm mỏi mắt (giảm tải nhận thức ngoại lai).
> 3. **Nhất quán & Đo đếm được**: 100% quy tắc đều có giá trị định lượng cụ thể (Design Tokens) và kiểm tra được (WCAG AA).

---

## MỤC LỤC
1. [Giả Định Thiết Kế Nền Tảng](#1-giả-định-thiết-kế-nền-tảng)
2. [Bảy Nguyên Tắc Thiết Kế Nền Tảng (Core Design Principles)](#2-bảy-nguyên-tắc-thiết-kế-nền-tảng-core-design-principles)
3. [Hệ Thống Design Tokens Định Lượng](#3-hệ-thống-design-tokens-định-lượng)
4. [Bố Cục Trang Bài Học (Lesson Page Layout)](#4-bố-cục-trang-bài-học-lesson-page-layout)
5. [Thư Viện Thành Phần Chuẩn Hóa & Trạng Thái](#5-thư-viện-thành-phần-chuẩn-hóa--trạng-thái)
6. [Thiết Kế Trải Nghiệm Học Tập (Learning UX & Cognitive Ergonomics)](#6-thiết-kế-trải-nghiệm-học-tập-learning-ux--cognitive-ergonomics)
7. [Thiết Kế Đáp Ứng Đa Thiết Bị (Responsive & Mobile Ergonomics)](#7-thiết-kế-đáp-ứng-đa-thiết-bị-responsive--mobile-ergonomics)
8. [Kỹ Thuật Chế Độ Sáng / Tối (Dual Theme Engineering)](#8-kỹ-thuật-chế-độ-sáng--tối-dual-theme-engineering)
9. [Khả Năng Tiếp Cận Toàn Diện (Accessibility - WCAG 2.1 AA)](#9-khả-năng-tiếp-cận-toàn-diện-accessibility---wcag-21-aa)
10. [Tối Ưu Hiệu Năng Cho Web Tĩnh (Static Web Performance)](#10-tối-ưu-hiệu-năng-cho-web-tĩnh-static-web-performance)
11. [12 Lỗi Thiết Kế Thường Gặp (UI/UX Anti-Patterns) & Cách Sửa](#11-12-lỗi-thiết-kế-thường-gặp-uiux-anti-patterns--cách-sửa)
12. [Checklist Kiểm Định Chất Lượng (Pass/Fail QA Checklist)](#12-checklist-kiểm-định-chất-lượng-passfail-qa-checklist)
13. [Phụ Lục A: Khối CSS Variables Hoàn Chỉnh (Light & Dark)](#phụ-lục-a-khối-css-variables-hoàn-chỉnh-light--dark)
14. [Phụ Lục B: Bản Tóm Tắt 10 Quy Tắc Vàng Trên 1 Trang A4](#phụ-lục-b-bản-tóm-tắt-10-quy-tắc-vàng-trên-1-trang-a4)

---

## 1. Giả Định Thiết Kế Nền Tảng

1. **Ràng buộc công nghệ**: HTML5 ngữ nghĩa, CSS3 thuần với CSS Variables (`var(--token)`), Vanilla JavaScript ES6/IIFE. Nạp tức thì trên cả giao thức `file://` (mở local) và `http(s)://` (web server) mà không cần bước build hay bundler.
2. **Khách hàng mục tiêu**: Kỹ sư phần mềm, kỹ sư mạng, quản trị Linux, DevOps/SRE. Phiên đọc kéo dài từ 30 – 90 phút liên tục.
3. **Môi trường hiển thị**: 60% Desktop ($1366\text{px} - 2560\text{px}$), 40% Mobile/Tablet ($360\text{px} - 768\text{px}$).
4. **Font & Icon**: Sử dụng System Font Stack cao cấp nạp 0ms độ trễ (Inter, Segoe UI, system-ui, JetBrains Mono, Consolas). Icon sử dụng Unicode emoji ngữ nghĩa và SVG inline tối giản, không phụ thuộc bộ font icon bên ngoài.

---

## 2. Bảy Nguyên Tắc Thiết Kế Nền Tảng (Core Design Principles)

### 2.1 Nguyên tắc 1: Cấu trúc thị giác phân cấp rõ rệt (Visual Hierarchy First)
- **Ý nghĩa**: Mắt người đọc không đọc tuần tự từng từ như máy tính quét file; mắt quét lướt theo luồng F-shape để tìm điểm neo thị giác (Visual Anchors). Phân cấp từ H1 $\rightarrow$ H4, màu sắc, độ đậm (font-weight), và khoảng cách phải phản ánh chính xác tầm quan trọng của thông tin.
- **NÊN LÀM**: Dùng kích thước tiêu đề giảm dần rõ rệt ($1.75\text{rem} \rightarrow 1.35\text{rem} \rightarrow 1.15\text{rem}$), kết hợp huy hiệu ngữ cảnh (`.badge`), màu chữ cấp 1 cho nội dung chính và cấp 2 cho phần giải thích.
- **KHÔNG NÊN LÀM**: Dùng kích thước chữ hoặc màu sắc đồng nhất cho cả tiêu đề lẫn nội dung; dùng quá nhiều màu nhấn rực rỡ khiến mắt không biết đâu là điểm trọng tâm.

### 2.2 Nguyên tắc 2: Chống vách đá văn bản & Chia nhỏ nhận thức (Cognitive Chunking)
- **Ý nghĩa**: Não bộ con người bị quá tải khi đối mặt với một đoạn văn bản dài quá 4 dòng chữ nhỏ liên tục (Vách đá văn bản - Wall of Text).
- **NÊN LÀM**: Giới hạn mỗi đoạn `<p>` tối đa **3–4 dòng** ($40 - 70$ từ). Đan xen nhịp nhàng giữa văn bản, danh sách có bullet biểu tượng, khối code, hộp mẹo (`tips`), và thẻ khái niệm (`.net-concept-grid`).
- **KHÔNG NÊN LÀM**: Viết một đoạn văn dài 10 dòng không ngắt nghỉ; trình bày 5 khái niệm liền nhau trong một đoạn văn duy nhất.

### 2.3 Nguyên tắc 3: Trực quan hóa tối đa, bài trừ bảng thô (Visual Over Raw Tables)
- **Ý nghĩa**: Bảng Markdown (`|---|---|`) hoặc thẻ `<table>` thô sơ tạo cảm giác tài liệu hành chính khô khan, gây vỡ giao diện trên di động và buộc người học phải cuộn ngang khó chịu.
- **NÊN LÀM**: 
  - So sánh đối chiếu 2 đối tượng $\rightarrow$ Dùng Bộ thẻ đối chiếu đặc tính kép (`.net-compare-grid` + `.net-spec-list`).
  - Bóc tách $3 - 6$ khái niệm/thành phần $\rightarrow$ Dùng Lưới thẻ khái niệm (`.net-concept-grid`).
  - Cấu trúc gói tin/Header $\rightarrow$ Dùng Thanh phân đoạn gói tin (`.net-packet-strip`).
- **KHÔNG NÊN LÀM**: Dùng bảng HTML/Markdown cho nội dung so sánh lý thuyết thông thường. Ngoại lệ duy nhất cho bảng: Ma trận bitmask 32-bit của Header IP trong `.net-header-diagram`.

### 2.4 Nguyên tắc 4: Minh bạch từng bước & Không bỏ bước trung gian (Zero Skipped Steps)
- **Ý nghĩa**: Khi học kỹ thuật, một bước nhảy tư duy không có lời giải thích sẽ khiến người học bị kẹt lại và mất động lực.
- **NÊN LÀM**: Mọi phép tính toán (tính số cáp mạng, băng thông, trễ, nhị phân, chia subnet) phải đóng khung trong `.net-calc-box`, chia nhỏ thành các `.net-calc-step` có công thức KaTeX rõ ràng và hộp đáp số `.net-calc-result`.
- **KHÔNG NÊN LÀM**: Đưa ra đề bài rồi nhảy ngay tới đáp số cuối cùng mà bỏ qua công thức trung gian.

### 2.5 Nguyên tắc 5: Tương tác thực hành có kiểm chứng ngay (Verifiable Hands-on Feedback)
- **Ý nghĩa**: Người học chỉ thật sự hiểu khi tự tay gõ lệnh và đối chiếu kết quả kỳ vọng trên máy tính của mình.
- **NÊN LÀM**: Mọi bài Lab phải mở đầu bằng `.net-step-card` nêu rõ hành động, kèm hộp `.net-verify-box` chỉ rõ dấu hiệu làm đúng (chỉ số ping, mã trạng thái HTTP, số byte trả về). Với lệnh khác nhau giữa Windows và Linux, luôn cung cấp đủ 2 tab `codeExamples`.
- **KHÔNG NÊN LÀM**: Chỉ đưa ra dòng lệnh mà không giải thích ý nghĩa các cờ tham số, không cung cấp kết quả output mẫu và không chỉ cách nhận biết thành công hay thất bại.

### 2.6 Nguyên tắc 6: Thích ứng hai chế độ sáng/tối an toàn thị giác (Dual-Theme Contrast Safety)
- **Ý nghĩa**: Đọc lâu trên nền trắng tinh khiết (`#ffffff`) gây chói mắt; đọc lâu trên nền đen tuyền (`#000000`) gây tương phản gắt (halo effect) làm mỏi mắt.
- **NÊN LÀM**: Dùng nền Off-white dịu nhẹ (`#f8fafc`) cho Light Mode và Dark Slate (`#0b0f19` / `#111827`) cho Dark Mode. 100% màu sắc tham chiếu qua biến CSS `var(--token)`.
- **KHÔNG NÊN LÀM**: Hard-code màu bằng mã hex trực tiếp (`style="color:#000;"` hoặc `style="background:#fff;"`) khiến giao diện bị chìm chữ hoặc nổ màu khi đổi theme.

### 2.7 Nguyên tắc 7: Tiếp cận phổ quát & Thân thiện ngón tay (Accessibility & Touch-First Ergonomics)
- **Ý nghĩa**: Người học sử dụng đa dạng thiết bị: từ chuột độ phân giải cao trên PC đến ngón tay cái trên màn hình cảm ứng di động, hoặc điều hướng bàn phím thuần túy.
- **NÊN LÀM**: Vùng chạm tương tác (nút bấm, tab, liên kết mục lục) tối thiểu $44 \times 44\text{px}$; hiển thị viền focus rõ nét (`:focus-visible`); hỗ trợ phím tắt chuyển bài và chế độ giảm chuyển động (`prefers-reduced-motion`).
- **KHÔNG NÊN LÀM**: Nút bấm quá nhỏ đặt sát nhau khiến người dùng chạm nhầm trên điện thoại; ẩn outline bàn phím (`outline: none`) mà không có viền thay thế.

---

## 3. Hệ Thống Design Tokens Định Lượng

Toàn bộ hệ thống giao diện được kiểm soát bằng biến CSS (CSS Custom Properties).

### 3.1 Bảng Màu (Color Tokens) & Tỉ Lệ Tương Phản WCAG AA

| Nhóm Token | Tên Biến CSS | Light Mode Giá Trị | Dark Mode Giá Trị | Tỉ Lệ Tương Phản (vs Nền chính) | Mục Đích Sử Dụng |
|---|---|---|---|---|---|
| **Nền chính** | `--bg-app` | `#f8fafc` | `#0b0f19` | N/A (Canvas) | Màu nền bao quát toàn bộ cửa sổ |
| **Bề mặt card** | `--bg-surface` | `#ffffff` | `#111827` | 1.05:1 (vs App) | Khối nội dung, thẻ card, khung đọc chính |
| **Bề mặt phụ** | `--bg-surface-alt` | `#f1f5f9` | `#1e293b` | 1.15:1 (vs App) | Header, thanh công cụ, dải phân cách |
| **Hover bề mặt** | `--bg-surface-hover` | `#e2e8f0` | `#334155` | 1.25:1 (vs App) | Phản hồi khi di chuột lên item |
| **Bề mặt nổi** | `--bg-elevated` | `#ffffff` | `#1e293b` | 1.2:1 | Dropdown menu, Modal popup |
| **Khung Code** | `--bg-code` | `#0f172a` | `#090d16` | $\ge 12:1$ (vs Text code) | Khối lệnh Terminal & Code block |
| **Header Code** | `--bg-code-header` | `#1e293b` | `#161f33` | $\ge 9:1$ | Thanh tiêu đề của khối Code |
| **Terminal Output** | `--bg-output` | `#090d16` | `#050811` | $\ge 13:1$ | Khối hiển thị kết quả lệnh trả về |
| **Chữ cấp 1** | `--text-primary` | `#0f172a` | `#f1f5f9` | $\mathbf{15.4:1}$ (Light) / $\mathbf{14.8:1}$ (Dark) | Tiêu đề H1-H4, thân bài chính |
| **Chữ cấp 2** | `--text-secondary` | `#334155` | `#cbd5e1` | $\mathbf{9.6:1}$ (Light) / $\mathbf{9.2:1}$ (Dark) | Văn bản phụ, chú thích, mô tả card |
| **Chữ mờ** | `--text-muted` | `#64748b` | `#94a3b8` | $\mathbf{4.8:1}$ (Light) / $\mathbf{5.1:1}$ (Dark) | Metadata, timestamp, placeholder (đạt WCAG AA text thường) |
| **Chữ tương phản**| `--text-inverse` | `#f8fafc` | `#0f172a` | $\ge 14:1$ | Dùng trên nền ngược màu |
| **Chủ đạo Mạng** | `--topic-network` | `#0284c7` | `#38bdf8` | $\mathbf{4.6:1}$ (Light) / $\mathbf{7.2:1}$ (Dark) | Màu nhận diện Chuyên đề Networking |
| **Nền mềm Mạng** | `--topic-network-bg` | `rgba(2, 132, 199, 0.14)`| `rgba(56, 189, 248, 0.18)` | N/A (Trang trí) | Nền badge, pill đang active |
| **Thành công** | `--success` | `#059669` | `#10b981` | $\mathbf{4.7:1}$ (Light) / $\mathbf{6.8:1}$ (Dark) | Đáp án đúng, hộp kiểm chứng thành công |
| **Cảnh báo/Mẹo** | `--warning` | `#d97706` | `#f59e0b` | $\mathbf{4.5:1}$ (Light) / $\mathbf{7.0:1}$ (Dark) | Lưu ý, hiểu lầm phổ biến, mẹo hay |
| **Nguy hiểm/Lỗi** | `--danger` | `#dc2626` | `#ef4444` | $\mathbf{4.8:1}$ (Light) / $\mathbf{5.6:1}$ (Dark) | Cảnh báo lệnh nguy hiểm, đáp án sai |
| **Thông tin** | `--info` | `#0284c7` | `#38bdf8` | $\mathbf{4.6:1}$ (Light) / $\mathbf{7.2:1}$ (Dark) | Ghi chú mở rộng, bối cảnh kỹ thuật |
| **Viền mờ** | `--border-subtle` | `#e2e8f0` | `#1e293b` | 1.2:1 | Đường chia nhẹ, viền card |
| **Viền rõ** | `--border-strong` | `#cbd5e1` | `#334155` | $\mathbf{3.1:1}$ | Viền input, viền nút, viền hộp |
| **Vòng Focus** | `--focus-ring` | `0 0 0 3px rgba(2, 132, 199, 0.4)` | `0 0 0 3px rgba(56, 189, 248, 0.5)` | $\ge 3:1$ | Chỉ báo truy cập bằng bàn phím |

### 3.2 Typography Tokens

- **Font Stack Nội dung**:
  `--font-sans: 'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Noto Sans', sans-serif;`
- **Font Stack Mã lệnh & Số liệu**:
  `--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'Courier New', monospace;`

| Thang Cỡ | Giá trị rem / px | Line Height | Font Weight | Letter Spacing | Quy tắc sử dụng |
|---|---|---|---|---|---|
| **H1 (Bài học)** | `1.75rem` ($28\text{px}$) | `1.25` | `800` (Bold) | `-0.025em` | Duy nhất 1 thẻ H1 trên đầu bài học |
| **H2 (Section)** | `1.35rem` ($21.6\text{px}$) | `1.35` | `700` (Bold) | `-0.018em` | Đề mục lớn của bài (có gắn id vào TOC) |
| **H3 (Tiểu mục)**| `1.15rem` ($18.4\text{px}$) | `1.45` | `700` (Semi-bold) | `-0.01em` | Phân đoạn trong section |
| **H4 (Thẻ/Card)**| `1.00rem` ($16\text{px}$) | `1.50` | `600` (Medium) | `0em` | Tiêu đề thẻ card, hộp công thức |
| **Thân bài (Body)**| `1.00rem` ($16\text{px}$) | `1.72` | `400` (Regular) | `0em` | Đoạn văn nội dung chính |
| **Code inline** | `0.88rem` ($14\text{px}$) | `1.50` | `500` (Medium) | `0em` | Thuật ngữ lệnh, cờ tham số, địa chỉ IP |
| **Code block** | `0.88rem` ($14\text{px}$) | `1.60` | `400` (Regular) | `0em` | Khung code Terminal và chú giải |
| **Badge / Meta** | `0.75rem` ($12\text{px}$) | `1.40` | `700` (Bold) | `0.025em` | Huy hiệu thời lượng, cấp độ, tag |

- **Độ rộng dòng đọc tối ưu (Optimal Reading Width)**:
  `--content-max-width: 78ch;` (tương đương khoảng $750\text{px} - 860\text{px}$ tùy cỡ chữ).
  *Lý do*: Theo nghiên cứu công thái học mắt người, dòng chữ dài vượt quá 80 ký tự khiến mắt gặp khó khăn khi nhảy về đầu dòng tiếp theo; dòng ngắn hơn 50 ký tự làm mắt phải đảo dòng liên tục gây mỏi cơ vận nhãn.

### 3.3 Spacing & Layout Tokens (Thang Bội Số 4px / 8px)

| Token Spacing | Kích thước | Tương quan Bội số | Trường hợp áp dụng chuẩn |
|---|---|---|---|
| `--space-1` | `4px` | $1 \times 4\text{px}$ | Khoảng cách icon và text inline, padding badge mini |
| `--space-2` | `8px` | $2 \times 4\text{px}$ | Gap giữa các tag, padding nút nhỏ, khoảng cách dòng code |
| `--space-3` | `12px` | $3 \times 4\text{px}$ | Gap trong danh sách spec list, padding thẻ card nhỏ |
| `--space-4` | `16px` | $4 \times 4\text{px}$ | Margin dưới đoạn văn `<p>`, padding tiêu chuẩn thẻ card |
| `--space-5` | `20px` | $5 \times 4\text{px}$ | Gap giữa các thẻ card trong lưới `.net-concept-grid` |
| `--space-6` | `24px` | $6 \times 4\text{px}$ | Khoảng cách giữa các khối component lớn |
| `--space-8` | `32px` | $8 \times 4\text{px}$ | Margin trên tiêu đề H2 (`margin-top: 32px; margin-bottom: 12px;`) |
| `--space-10`| `40px` | $10 \times 4\text{px}$ | Khoảng cách giữa các `<section>` bài học |
| `--space-12`| `48px` | $12 \times 4\text{px}$ | Khoảng cách trước khối Tổng kết bài học `#sec-summary` |

### 3.4 Hình Khối, Viền & Độ Cao Lớp (Elevation Tokens)

| Token Bo Góc | Kích thước | Ứng dụng |
|---|---|---|
| `--radius-xs` | `4px` | Badge mini, tag nhỏ, inline code background |
| `--radius-sm` | `8px` | Nút bấm, input, item danh sách, tab |
| `--radius-md` | `12px` | Thẻ card chuẩn, khung code block, hộp callout |
| `--radius-lg` | `16px` | Modal, container bài học, banner lớn |
| `--radius-pill`| `9999px` | Thẻ pill trạng thái, nút tròn |

| Cấp Độ Elevation | Giá trị Shadow (Light Mode) | Giá trị Shadow (Dark Mode) | Ứng dụng |
|---|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(15, 23, 42, 0.05)` | `0 1px 2px rgba(0, 0, 0, 0.3)` | Phân cách nhẹ các thẻ cùng phẳng |
| `--shadow-sm` | `0 2px 6px -1px rgba(15, 23, 42, 0.07)`| `0 2px 6px rgba(0, 0, 0, 0.4)` | Thẻ card mặc định, nút bấm thường |
| `--shadow-md` | `0 8px 20px -4px rgba(15, 23, 42, 0.08)`| `0 8px 20px rgba(0, 0, 0, 0.5)` | Khối code nổi bật, hộp bài toán |
| `--shadow-lg` | `0 18px 32px -8px rgba(15, 23, 42, 0.12)`| `0 20px 36px rgba(0, 0, 0, 0.65)`| Modal, menu nổi, drawer di động |
| `--shadow-hover`| `0 12px 28px -4px rgba(2, 132, 199, 0.15)`| `0 12px 28px rgba(0, 0, 0, 0.55)`| Trạng thái di chuột (Hover Card) |

### 3.5 Chuyển Động (Motion Tokens)

- `--transition-fast: 0.12s cubic-bezier(0.4, 0, 0.2, 1);` (Dành cho hover nút, đổi màu chữ, đổi viền).
- `--transition-normal: 0.20s cubic-bezier(0.4, 0, 0.2, 1);` (Dành cho mở rộng dropdown, trượt accordion, hiển thị tooltip).
- `--transition-slow: 0.30s cubic-bezier(0.4, 0, 0.2, 1);` (Dành cho ngăn kéo drawer mở trên mobile, chuyển cảnh trang).

**Quy tắc chuyển động nghiêm ngặt**:
1. **ĐƯỢC PHÉP DÙNG**: Biến đổi `transform: translateY(-2px)` nhẹ khi hover card; đổi màu nền `background-color` khi hover menu; co giãn `max-height` khi click xem đáp án.
2. **CẤM TUYỆT ĐỐI**: Hiệu ứng rung lắc (shake), chớp nháy lặp vô tận (infinite pulse), phóng to quá $1.05\times$, chuyển động bay từ xa vào màn hình gây xao nhãng việc đọc bài.
3. **Bắt buộc hỗ trợ `prefers-reduced-motion`**:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 4. Bố Cục Trang Bài Học (Lesson Page Layout)

Trang bài học áp dụng cấu trúc **3 vùng không gian độc lập** trên màn hình lớn:

```
+-----------------------------------------------------------------------------------+
|  HEADER CHÍNH: Logo • Điều hướng chuyên đề • Ô tìm kiếm • Chuyển Theme • Phông cỡ |
+-----------------------------------------------------------------------------------+
|  SIDEBAR TRÁI   |            VÙNG NỘI DUNG CHÍNH (MAIN ARTICLE)          |  TOC PHẢI  |
|  (310px cố định)|                (Tối đa 78ch / ~860px)                  | (250px)    |
|                 |                                                        |            |
| - Tên Module    | 1. Header bài học: Số bài • Tiêu đề H1 • Badge thời gian| - Mục lục  |
| - Danh sách bài | 2. Mục tiêu bài học (Objectives: 3-4 bullet đo đếm)     |   bài học  |
| - Tiến độ %     | 3. Trực giác đời thường (Intuition: Ẩn dụ + .net-arch) |   theo H2  |
| - Accordion     | 4. Các phần nội dung chi tiết (Sections 1, 2, 3...)    | - Active   |
|                 | 5. Ví dụ giải từng bước (.net-calc-box)                |   spy theo |
|                 | 6. Phòng Lab thực hành (.net-step-card + codeExamples) |   vị trí   |
|                 | 7. Góc sự cố thực tế (.net-incident-card)              |   cuộn     |
|                 | 8. Hiểu lầm & Mẹo (Callouts: Pitfalls & Tips)          |            |
|                 | 9. Bài tập tự luyện (Exercises có dropdown lời giải)   |            |
|                 | 10. Tóm tắt 5 dòng & Tự đánh giá (Summary & Review)    |            |
|                 | 11. Cầu nối bài kế tiếp (.net-next-bridge-card)        |            |
|                 | 12. Cụm nút chuyển bài: [⬅ Bài trước] [Bài tiếp ➡]    |            |
+-----------------------------------------------------------------------------------+
```

- **Kích thước định lượng**:
  - Sidebar trái: `--sidebar-width: 310px;` (cố định, cuộn riêng biệt).
  - Mục lục phải: `--toc-width: 250px;` (sticky theo viewport, highlight mục đang đọc).
  - Vùng đọc trung tâm: `--content-max-width: 78ch;` căn lề giữa (margin: `0 auto`), padding hai bên `24px`.
- **Hành vi cuộn**:
  - Thanh Header cố định (`position: sticky; top: 0; z-index: 100;`).
  - Vị trí cuộn của Sidebar được lưu trữ qua `sessionStorage` để không bị nhảy vị trí khi click chuyển giữa các bài học.

---

## 5. Thư Viện Thành Phần Chuẩn Hóa & Trạng Thái

### 5.1 Khối Đoạn Văn & Danh Sách Đặc Tính
- Đoạn văn: `margin: 0 0 16px; font-size: 1rem; line-height: 1.72; color: var(--text-primary);`.
- Danh sách bullet: Sử dụng biểu tượng ngữ nghĩa làm bullet thay vì dấu chấm đen thô sơ:
```html
<ul class="net-feature-list">
  <li><span class="net-bullet">✓</span> <strong>Điểm mạnh:</strong> Giải thích nội dung...</li>
  <li><span class="net-bullet">⚡</span> <strong>Tốc độ:</strong> Đo lường đạt 10 Gbps...</li>
</ul>
```

### 5.2 Khối Code & Terminal Đa Năng
- **Cấu trúc bắt buộc**: Khung chứa `.code-terminal-box` gồm thanh Header chứa nhãn ngôn ngữ + nút sao chép 1 chạm, thân code có đánh số dòng, khối Terminal Output và danh sách giải thích dòng (`annotations`).
```html
<div class="code-terminal-box">
  <div class="code-header">
    <span class="code-lang">BASH TERMINAL</span>
    <button class="btn-copy" onclick="copyCode(this)" aria-label="Sao chép mã lệnh">📋 Sao chép</button>
  </div>
  <pre class="code-body"><code><span class="line-num">1</span>ping -c 4 8.8.8.8</code></pre>
  <div class="terminal-output">
    <div class="output-label">KẾT QUẢ MONG ĐỢI (OUTPUT):</div>
    <pre>4 packets transmitted, 4 received, 0% packet loss, time 3004ms</pre>
  </div>
  <div class="code-annotations">
    <div class="ann-item"><strong>Dòng 1:</strong> Cờ <code>-c 4</code> chỉ định gửi đúng 4 gói tin rồi dừng.</div>
  </div>
</div>
```

### 5.3 Khối Sơ Đồ Kiến Trúc Phân Tầng (`.net-arch-box`)
Bắt buộc dùng trong `intuition.visualHtml` và các phần bóc tách kiến trúc đa tầng:
```html
<div class="net-arch-box">
  <div class="net-arch-header">
    <span class="net-arch-icon">🌐</span>
    <span class="net-arch-title">TIÊU ĐỀ SƠ ĐỒ ĐƯỢC VIẾT HOA RÕ RÀNG</span>
  </div>
  <div class="net-arch-layers">
    <div class="net-arch-layer layer-userspace">
      <div class="net-arch-layer-header">
        <span class="net-arch-layer-name">💻 1. Tầng Người Dùng &amp; Thiết Bị Đầu Cuối (Host)</span>
        <span class="net-arch-layer-badge">Nơi Phát Sinh Dữ Liệu</span>
      </div>
      <div class="net-arch-nodes">
        <div class="net-arch-node"><strong>Laptop cá nhân:</strong> Gửi yêu cầu HTTP</div>
      </div>
    </div>
    <div class="net-arch-arrow">⬇️ Đường truyền cáp mạng UTP &amp; Sóng Wi-Fi</div>
    <div class="net-arch-layer layer-netstack">
      <div class="net-arch-layer-header">
        <span class="net-arch-layer-name">🧭 2. Tầng Mạng &amp; Định Tuyến (Router)</span>
        <span class="net-arch-layer-badge">Chuyển Tiếp L3</span>
      </div>
      <div class="net-arch-nodes">
        <div class="net-arch-node"><strong>Router Gateway:</strong> Định tuyến gói tin qua IP</div>
      </div>
    </div>
  </div>
</div>
```

### 5.4 Lưới Thẻ Khái Niệm (`.net-concept-grid`)
Dùng để nhóm từ 3 đến 6 khái niệm:
```html
<div class="net-concept-grid">
  <div class="net-concept-card accent-blue">
    <div class="net-concept-header">
      <h4 class="net-concept-title"><span>💻</span> 1. Thiết Bị Đầu Cuối</h4>
      <span class="net-concept-badge">End Devices</span>
    </div>
    <div class="net-concept-body">
      <p>Mô tả ngắn gọn súc tích không quá 3 dòng.</p>
    </div>
  </div>
</div>
```
- Các biến thể viền đỉnh (`accent-*`): `accent-blue`, `accent-purple`, `accent-emerald`, `accent-amber`, `accent-rose`, `accent-cyan`.

### 5.5 Bộ Thẻ Đối Chiếu Kép (`.net-compare-grid` & `.net-spec-list`) — *Thay Thế Hoàn Toàn Bảng Thô*
```html
<div class="net-compare-grid">
  <div class="net-compare-card accent-emerald">
    <div class="net-concept-header">
      <h4 class="net-compare-title"><span>🏠</span> Mạng Cục Bộ (LAN)</h4>
      <span class="net-concept-badge">Phạm vi hẹp</span>
    </div>
    <ul class="net-spec-list">
      <li class="net-spec-item">
        <span class="net-spec-label">📍 Không gian</span>
        <span class="net-spec-val">Gia đình, văn phòng, trường học.</span>
      </li>
      <li class="net-spec-item">
        <span class="net-spec-label">⚡ Tốc độ</span>
        <span class="net-spec-val">Rất cao: 1 Gbps đến 10 Gbps.</span>
      </li>
    </ul>
    <p class="net-compare-verdict">➔ Bản chất: Kết nối nội bộ tốc độ cao, chia sẻ máy in và tệp tin.</p>
  </div>
  <div class="net-compare-card accent-blue">
    <!-- Thẻ đối chiếu B tương ứng -->
  </div>
</div>
```

### 5.6 Thanh Phân Đoạn Gói Tin Trực Quan (`.net-packet-strip`)
```html
<div class="net-packet-strip">
  <div class="net-packet-seg seg-ip">
    <div class="seg-tag-row">
      <span class="seg-tag">L3 IP HEADER</span>
      <span class="seg-size">20 Bytes</span>
    </div>
    <p class="seg-desc">Phong bì định tuyến toàn cầu: IP Nguồn, IP Đích, TTL.</p>
  </div>
  <div class="net-packet-seg seg-tcp">
    <div class="seg-tag-row">
      <span class="seg-tag">L4 TCP HEADER</span>
      <span class="seg-size">20 Bytes</span>
    </div>
    <p class="seg-desc">Phong bì dịch vụ cổng: Source Port, Dest Port, Sequence #.</p>
  </div>
  <div class="net-packet-seg seg-payload">
    <div class="seg-tag-row">
      <span class="seg-tag">DATA PAYLOAD</span>
      <span class="seg-size">Tối đa 1460 Bytes (MSS)</span>
    </div>
    <p class="seg-desc">Dữ liệu người dùng thực tế: Nội dung HTML, JSON API.</p>
  </div>
</div>
```

### 5.7 Hộp Giải Toán / Nhị Phân / Subnetting Từng Bước (`.net-calc-box`)
```html
<div class="net-calc-box">
  <div class="net-calc-header">
    <h4 class="net-calc-title">🧮 Lời giải phân tích từng bước</h4>
    <span class="net-calc-badge">Worked Example</span>
  </div>
  <div class="net-calc-body">
    <div class="net-calc-step">
      <div class="net-calc-step-title">Bước 1: Tính số đường dây kết nối Topo Mesh toàn phần</div>
      <pre class="net-calc-formula">$$N_{\text{mesh}} = \frac{n(n - 1)}{2} = \frac{6 \times 5}{2} = 15\text{ sợi cáp.}$$</pre>
    </div>
    <div class="net-calc-result">
      ✓ Kết luận: Topo hình sao tiết kiệm hơn 60% dây cáp so với mô hình lưới toàn phần.
    </div>
  </div>
</div>
```

### 5.8 Thẻ Bước Thực Hành Lab & Hộp Kiểm Chứng (`.net-step-card` + `.net-verify-box`)
```html
<div class="net-step-card">
  <div class="net-step-header">
    <span class="net-step-badge">BƯỚC 1</span>
    <h4 class="net-step-title">Phát lệnh kiểm tra thông mạng tới máy chủ DNS 8.8.8.8</h4>
  </div>
  <p class="net-step-desc">Mô tả mục tiêu thao tác...</p>
  <div class="net-verify-box">
    <span class="net-verify-icon">✓</span>
    <span><strong>Cách kiểm tra bạn làm đúng:</strong> Dòng tổng kết hiện <code>0% packet loss</code> và thời gian phản hồi dưới <code>30ms</code>.</span>
  </div>
</div>
```

### 5.9 Thẻ Tình Huống Sự Cố Thực Tế (`.net-incident-card`)
```html
<div class="net-incident-card">
  <div class="net-incident-header">
    <span>🚨</span>
    <span>CASE STUDY: SÓNG WI-FI ĐẦY VẠCH NHƯNG KHÔNG VÀO ĐƯỢC INTERNET</span>
  </div>
  <div class="net-incident-body">
    <p><strong>Hiện tượng:</strong> Laptop báo đầy vạch sóng Wi-Fi nhưng trình duyệt báo mất mạng.</p>
    <p><strong>Bản chất kỹ thuật:</strong> Kết nối vô tuyến LAN tới AP thông suốt nhưng đường cáp quang WAN từ Router ra ISP bị đứt.</p>
    <div class="net-verify-box">
      <span class="net-verify-icon">✓</span>
      <span><strong>Bài học rút ra:</strong> Sóng Wi-Fi chỉ đại diện cho tầng liên kết LAN cục bộ, không bảo chứng kết nối WAN.</span>
    </div>
  </div>
</div>
```

---

## 6. Thiết Kế Trải Nghiệm Học Tập (Learning UX & Cognitive Ergonomics)

1. **Luồng đọc chuẩn F-Shape & Z-Pattern**:
   - Điểm nhìn đầu tiên: Tiêu đề H1 và Hộp mục tiêu (`#sec-objectives`) để xác định giá trị bài học trong 5 giây đầu.
   - Điểm nhìn tiếp theo: Sơ đồ trực giác (`intuition.visualHtml`) để neo giữ mô hình tư duy trước khi đọc chi tiết.
   - Các điểm dừng: Khối code, thẻ card nổi bật, hộp kiểm chứng kết quả.
2. **Quy tắc Chunking (Dưới 100 từ mỗi khối thị giác)**:
   - Chia nhỏ kiến thức phức tạp thành từng thẻ bài độc lập. Không trình bày liên tục quá 2 đoạn văn mà không có tiêu đề phụ hoặc thẻ minh họa ngắt nhịp.
3. **Cơ chế Dẫn đường (Progressive Disclosure)**:
   - Bài tập tự luyện (`exercises`): Đề bài hiển thị trước, đáp án và lời giải chi tiết được ẩn trong thẻ `<details>` để người học tự động não suy nghĩ trước khi xem kết quả.
4. **Giảm tải nhận thức ngoại lai (Extraneous Cognitive Load)**:
   - Loại bỏ các trang trí vô nghĩa, ảnh động nhấp nháy, các dải màu gradient quá gắt. Mọi màu sắc đều mang ý nghĩa ngữ nghĩa kỹ thuật (xanh lá = thành công/L2, xanh dương = L3/Host, tím = L4, đỏ = bảo mật/lỗi).
5. **Xử lý trạng thái biên**:
   - Khi tắt JavaScript: Nội dung tĩnh vẫn hiển thị 100% đầy đủ nhờ render cấu trúc HTML ngữ nghĩa ngay từ template.
   - Khi chạy ở chế độ `file://`: Hệ thống nạp dữ liệu qua biến toàn cục (Global Objects) và `js/file-fallback.js` ổn định, không ném lỗi CORS.

---

## 7. Thiết Kế Đáp Ứng Đa Thiết Bị (Responsive & Mobile Ergonomics)

### 7.1 Bảng Điểm Ngắt (Breakpoints)
- **Mobile**: $\le 640\text{px}$ (Màn hình dọc điện thoại).
- **Tablet**: $641\text{px} - 1024\text{px}$ (Máy tính bảng, iPad dọc).
- **Desktop**: $1025\text{px} - 1440\text{px}$ (Laptop, màn hình máy tính phổ thông).
- **Wide**: $> 1440\text{px}$ (Màn hình 2K/4K).

### 7.2 Quy Tắc Bố Cục Theo Thiết Bị

| Thành phần | Desktop ($>1024\text{px}$) | Tablet ($641 - 1024\text{px}$) | Mobile ($\le 640\text{px}$) |
|---|---|---|---|
| **Sidebar Trái** | Cố định $310\text{px}$ bên trái | Thu gọn dạng Drawer trượt | Ẩn, mở qua nút Hamburger góc trái |
| **Mục lục TOC Phải**| Sticky $250\text{px}$ bên phải | Ẩn, hiển thị qua nút nổi | Ẩn, mở qua Sheet popup đáy màn hình |
| **Vùng nội dung** | Tối đa $78\text{ch}$ (~$860\text{px}$) căn giữa | Chiếm $100\%$ chiều rộng trừ lề ($16\text{px}$) | Chiếm $100\%$ chiều rộng, padding $12\text{px}$ |
| **Lưới thẻ Card** | 2 hoặc 3 cột (`grid-template-columns`) | 2 cột | **Tự động ép về 1 cột** (`1fr`) |
| **Gói tin Strip** | Nằm ngang (`flex-direction: row`) | Nằm ngang hoặc quấn dòng | Dọc (`flex-direction: column`) |
| **Vùng chạm nút** | $\ge 36\text{px}$ chiều cao | $\ge 44\text{px}$ chiều cao | $\mathbf{\ge 48\text{px}}$ chiều cao |

### 7.3 Xử Lý Khối Code & Sơ Đồ Rộng Trên Màn Hình Nhỏ
- Khối code và sơ đồ ASCII Topology có độ rộng vượt quá màn hình **bắt buộc có thuộc tính `overflow-x: auto`** và `-webkit-overflow-scrolling: touch`.
- Bổ sung hiệu ứng bóng mờ dải viền (Scroll Affordance Shadow) để người học biết khối nội dung có thể cuộn ngang tiếp được, tránh cảm giác bị cắt cụt chữ.

---

## 8. Kỹ Thuật Chế Độ Sáng / Tối (Dual Theme Engineering)

1. **Tuyệt đối không dùng `#ffffff` và `#000000` thuần**:
   - Thay `#ffffff` bằng **`#f8fafc`** (Slate 50) cho nền ứng dụng và **`#ffffff`** cho bề mặt thẻ để tạo sự phân tầng nhẹ.
   - Thay `#000000` bằng **`#0b0f19`** (Deep Slate) cho nền Dark Mode và **`#111827`** (Gray 900) cho bề mặt thẻ.
2. **Cơ chế đồng bộ Theme**:
   - Sử dụng thuộc tính `data-theme="light"` hoặc `data-theme="dark"` trên thẻ `<html>`.
   - Ưu tiên đọc lựa chọn đã lưu trong `localStorage.getItem('theme')`. Nếu chưa lưu, tự động kích hoạt theo hệ điều hành qua `window.matchMedia('(prefers-color-scheme: dark)')`.
3. **Bảo tồn tương phản chữ trên nền tối**:
   - Màu chữ cấp 1 trên nền tối: `#f1f5f9` (độ tương phản 14.8:1).
   - Màu viền trên nền tối: dùng sắc độ `#1e293b` kết hợp độ trong suốt `rgba(255, 255, 255, 0.08)`.

---

## 9. Khả Năng Tiếp Cận Toàn Diện (Accessibility - WCAG 2.1 AA)

1. **Tỉ lệ tương phản màu**:
   - Văn bản kích thước thông thường ($<18\text{pt}$ / $<24\text{px}$): Độ tương phản tối thiểu **$\ge 4.5:1$** so với nền.
   - Văn bản kích thước lớn ($\ge 18\text{pt}$ hoặc $\ge 14\text{pt}$ in đậm): Độ tương phản tối thiểu **$\ge 3.0:1$**.
   - Các thành phần tương tác UI và viền khung: Độ tương phản tối thiểu **$\ge 3.0:1$**.
2. **Chỉ báo Focus rõ nét**:
   - Nghiêm cấm đặt `outline: none;` mà không có giá trị thay thế.
   - Sử dụng `:focus-visible` với vòng sáng `--focus-ring: 0 0 0 3px rgba(2, 132, 199, 0.45);`.
3. **Điều hướng bằng bàn phím**:
   - Phím tắt `[`: Quay về bài học trước.
   - Phím tắt `]`: Tiến tới bài học tiếp theo.
   - Phím `T`: Mở nhanh mục lục bài học (TOC).
4. **HTML ngữ nghĩa & ARIA**:
   - Dùng đúng thẻ: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
   - Các nút không có chữ (chỉ có icon) phải có thuộc tính `aria-label="Tên hành động"`.

---

## 10. Tối Ưu Hiệu Năng Cho Web Tĩnh (Static Web Performance)

1. **Thời gian nạp Font = 0ms (Zero FOIT/FOUT)**:
   - Sử dụng System Font Stack có sẵn trên thiết bị người dùng. Trình duyệt không mất thời gian gửi request tải tệp `.woff2` từ máy chủ ngoài.
2. **Dịch chuyển bố cục bằng 0 (Cumulative Layout Shift - CLS = 0)**:
   - Các khung chứa ảnh, iframe hoặc khối code sinh động phải được định sẵn chiều cao tối thiểu (`min-height`) hoặc tỉ lệ khung hình (`aspect-ratio`) để tránh nhảy giật khung hình khi nội dung render xong.
3. **Hiệu năng Render CSS**:
   - Các chuyển động (transitions) chỉ tác động lên 2 thuộc tính được tăng tốc phần cứng (GPU Accelerated): **`transform`** và **`opacity`**.
   - Không tạo transition trên `width`, `height`, `margin`, `padding` vì sẽ gây Layout Reflow làm đơ lag giao diện.

---

## 11. 12 Lỗi Thiết Kế Thường Gặp (UI/UX Anti-Patterns) & Cách Sửa

| STT | Hiện Tượng Sai (Anti-Pattern) | Hậu Quả Trải Nghiệm | Cách Khắc Phục Chuẩn Hóa |
|---|---|---|---|
| **1** | Dùng bảng Markdown thô (`| col1 | col2 |`) | Gây khô khan, vỡ khung và cuộn ngang trên điện thoại | Thay bằng `.net-compare-grid` + `.net-spec-list` |
| **2** | Vách đá văn bản: 8-10 dòng chữ liên tục | Mỏi mắt, người học nản chí và bỏ dở giữa chừng | Giới hạn 3-4 dòng; xen kẽ `.net-concept-grid` |
| **3** | ASCII art trần trụi không đóng khung | Vỡ sơ đồ khi font chữ bị co dãn | Bọc trong `<div class="net-topo-box"><pre class="net-topo-pre">` |
| **4** | Hard-code mã màu inline (`style="color:#000"`) | Chìm chữ thành tàng hình khi bật Dark Mode | Dùng `var(--text-primary)` hoặc class ngữ nghĩa |
| **5** | Đưa ra công thức rồi nhảy ngay tới đáp số | Người học không hiểu vì sao ra con số đó | Bọc trong `.net-calc-box`, chia nhỏ `.net-calc-step` |
| **6** | Lệnh Terminal không có kết quả output mẫu | Người học không biết mình gõ lệnh đúng hay sai | Thêm trường `output` và mảng `annotations` |
| **7** | Nút bấm trên di động quá nhỏ ($<32\text{px}$) | Chạm nhầm liên tục gây ức chế | Đặt `min-height: 48px; min-width: 48px;` |
| **8** | Bỏ outline focus bàn phím (`outline: none`) | Người dùng khiếm thị hoặc dùng phím bị mù phương hướng | Thêm viền `:focus-visible` với `--focus-ring` |
| **9** | Đặt `pitfalls` và `tips` ở root bài học | Engine không nạp được và gây lỗi kiểm chứng | Lồng trong object `callouts: { pitfalls, tips }` |
| **10**| Viết lặp code `.net-reflection-box` trong `sections`| Trùng lặp nội dung do TopicEngine tự render | Chỉ khai báo `reflectionQuestion` ở cấp bài học |
| **11**| Dùng class tự bịa (như `.net-arch-diagram`) | Không có style CSS tương ứng, vỡ layout | Chỉ dùng 10 class chuẩn trong `css/network.css` |
| **12**| Dòng văn bản kéo dài toàn màn hình ($>120\text{ch}$) | Mỏi mắt khi lia từ cuối dòng này sang đầu dòng sau | Giới hạn độ rộng vùng đọc `--content-max-width: 78ch;` |

---

## 12. Checklist Kiểm Định Chất Lượng (Pass/Fail QA Checklist)

Trước khi nghiệm thu bất kỳ bài học nào, người biên soạn và AI bắt buộc phải rà soát qua 20 tiêu chí sau:

- [ ] **1. Kiểm chứng tự động**: Chạy `node tools/verify-all.mjs` đạt toàn bộ các mục kiểm tra (`0` lỗi).
- [ ] **2. Không bảng thô**: 100% phép so sánh dùng `.net-compare-grid`; không có bảng Markdown `|---|---|` thông thường.
- [ ] **3. Trực giác mở đầu**: Có `intuition` đủ 4 trường (`title`, `metaphor`, `boundary`, `visualHtml`) và dùng `.net-arch-box`.
- [ ] **4. Đoạn văn vừa vặn**: Không có đoạn văn nào vượt quá 4 dòng chữ mà không có cấu trúc thị giác ngắt nhịp.
- [ ] **5. Khái niệm phân mảnh**: Các nhóm từ 3 khái niệm trở lên dùng `.net-concept-grid`.
- [ ] **6. Gói tin trực quan**: Cấu trúc Header/Payload dùng `.net-packet-strip` có badge dung lượng byte rõ ràng.
- [ ] **7. Tính toán minh bạch**: Các phép tính số học, nhị phân, subnet dùng `.net-calc-box` chia từng bước (`.net-calc-step`).
- [ ] **8. Công thức KaTeX chuẩn**: Công thức toán học bọc trong KaTeX (`$...$` hoặc `$$...$$`) và escape hai dấu gạch chéo ngược `\\`.
- [ ] **9. Phòng Lab kiểm chứng**: Có thẻ `.net-step-card`, hộp `.net-verify-box`, output mẫu và ghi chú từng dòng.
- [ ] **10. Đa nền tảng OS**: Các lệnh khác biệt giữa Windows và Linux đều có đủ 2 tab `codeExamples`.
- [ ] **11. Case Study thực tế**: Có tối thiểu 1 thẻ `.net-incident-card` nêu hiện tượng và bản chất chẩn đoán.
- [ ] **12. Callouts đúng cấp**: Mảng `pitfalls` ($\ge 2$) và `tips` ($\ge 1$) nằm gọn trong object `callouts`.
- [ ] **13. Bài tập tự luyện**: Có tối thiểu 3 bài tập (`exercises`) phân cấp Dễ $\rightarrow$ Vừa $\rightarrow$ Khó kèm đáp án và giải thích.
- [ ] **14. Tóm tắt 5 dòng**: Mảng `summary` có đúng hoặc tối thiểu 5 dòng đúc kết cốt lõi.
- [ ] **15. Câu hỏi tự ôn tập**: Mảng `selfReviewQuestions` có tối thiểu 3 câu hỏi đào sâu.
- [ ] **16. Chiêm nghiệm & Cầu nối**: Có `reflectionQuestion`, `reflectionHint` và `nextLessonPreview` ở root bài học.
- [ ] **17. Không nhân đôi khối tự động**: Không viết cứng HTML của reflection box hay next bridge card trong `sections`.
- [ ] **18. An toàn hai theme**: Hiển thị hoàn hảo, không bị chìm chữ hay chói lóa trên cả Light Mode và Dark Mode.
- [ ] **19. Thử nghiệm co giãn**: Co màn hình về $360\text{px}$ kiểm tra không xuất hiện thanh cuộn ngang trang (trừ khối code nội bộ).
- [ ] **20. Không dùng class lạ**: Mọi class CSS sử dụng đều nằm trong danh mục chính thức của hệ thống.

---

## Phụ Lục A: Khối CSS Variables Hoàn Chỉnh (Light & Dark)

Dưới đây là toàn bộ mã biến thiết kế chuẩn, có thể chép trực tiếp vào file CSS gốc (`css/variables.css`):

```css
/* ==========================================================================
   Design System Tokens — Nền tảng Thiết kế Giao diện Khóa học v3.0
   Chuẩn WCAG AA, Hỗ trợ Sáng/Tối, Tối ưu cho bài học Kỹ thuật & Mạng máy tính
   ========================================================================== */

:root {
  /* Font Families — 0ms Latency System Font Stack */
  --font-sans: 'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Noto Sans', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'Courier New', monospace;

  /* Cỡ chữ cơ sở & Dòng đọc công thái học */
  --base-font-size: 16px;
  --code-font-size: 0.88rem;
  --line-height-body: 1.72;
  --line-height-code: 1.60;
  --content-max-width: 78ch;

  /* Khoảng cách chữ */
  --tracking-tight: -0.018em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;

  /* Bảng màu Sáng (Light Mode - Mặc định) */
  --bg-app: #f8fafc;
  --bg-surface: #ffffff;
  --bg-surface-alt: #f1f5f9;
  --bg-surface-hover: #e2e8f0;
  --bg-elevated: #ffffff;
  --bg-glass: rgba(255, 255, 255, 0.86);
  --bg-code: #0f172a;
  --bg-code-header: #1e293b;
  --bg-output: #090d16;
  --bg-backdrop: rgba(15, 23, 42, 0.55);

  /* Văn bản (Light Mode) */
  --text-primary: #0f172a;     /* Contrast 15.4:1 */
  --text-secondary: #334155;   /* Contrast 9.6:1 */
  --text-muted: #64748b;       /* Contrast 4.8:1 */
  --text-inverse: #f8fafc;

  /* Màu nhận diện Chuyên đề Networking */
  --topic-network: #0284c7;
  --topic-network-soft: #e0f2fe;
  --topic-network-bg: rgba(2, 132, 199, 0.14);
  --topic-network-border: rgba(2, 132, 199, 0.35);
  --gradient-network: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%);

  /* Màu trạng thái ngữ nghĩa (Semantic Colors) */
  --success: #059669;
  --success-bg: #ecfdf5;
  --success-border: #6ee7b7;
  --success-text: #065f46;

  --warning: #d97706;
  --warning-bg: #fffbeb;
  --warning-border: #fcd34d;
  --warning-text: #92400e;

  --danger: #dc2626;
  --danger-bg: #fef2f2;
  --danger-border: #fca5a5;
  --danger-text: #991b1b;

  --info: #0284c7;
  --info-bg: #f0f9ff;
  --info-border: #7dd3fc;
  --info-text: #075985;

  --deep-bg: #f5f3ff;
  --deep-border: #c4b5fd;
  --deep-text: #5b21b6;

  /* Viền & Đổ bóng */
  --border-subtle: #e2e8f0;
  --border-strong: #cbd5e1;
  --focus-ring: 0 0 0 3px rgba(2, 132, 199, 0.40);

  --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.05);
  --shadow-sm: 0 2px 6px -1px rgba(15, 23, 42, 0.07), 0 1px 3px -1px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 8px 20px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 18px 32px -8px rgba(15, 23, 42, 0.12);
  --shadow-hover: 0 12px 28px -4px rgba(2, 132, 199, 0.15), 0 4px 8px -2px rgba(15, 23, 42, 0.06);

  /* Kích thước cấu trúc */
  --header-height: 62px;
  --sidebar-width: 310px;
  --toc-width: 250px;

  /* Bo góc */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 9999px;

  /* Thời lượng chuyển động */
  --transition-fast: 0.12s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.20s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.30s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ==========================================================================
   Bảng màu Tối (Dark Mode) — Kích hoạt qua [data-theme="dark"]
   ========================================================================== */
[data-theme="dark"] {
  --bg-app: #0b0f19;
  --bg-surface: #111827;
  --bg-surface-alt: #1e293b;
  --bg-surface-hover: #334155;
  --bg-elevated: #1e293b;
  --bg-glass: rgba(17, 24, 39, 0.88);
  --bg-code: #090d16;
  --bg-code-header: #161f33;
  --bg-output: #050811;
  --bg-backdrop: rgba(2, 6, 23, 0.75);

  --text-primary: #f1f5f9;     /* Contrast 14.8:1 */
  --text-secondary: #cbd5e1;   /* Contrast 9.2:1 */
  --text-muted: #94a3b8;       /* Contrast 5.1:1 */
  --text-inverse: #0f172a;

  --topic-network: #38bdf8;
  --topic-network-soft: rgba(56, 189, 248, 0.16);
  --topic-network-bg: rgba(56, 189, 248, 0.18);
  --topic-network-border: rgba(56, 189, 248, 0.40);

  --success: #10b981;
  --success-bg: rgba(16, 185, 129, 0.12);
  --success-border: rgba(52, 211, 153, 0.35);
  --success-text: #6ee7b7;

  --warning: #f59e0b;
  --warning-bg: rgba(245, 158, 11, 0.12);
  --warning-border: rgba(251, 191, 36, 0.35);
  --warning-text: #fde68a;

  --danger: #ef4444;
  --danger-bg: rgba(239, 68, 68, 0.12);
  --danger-border: rgba(248, 113, 113, 0.35);
  --danger-text: #fca5a5;

  --info: #38bdf8;
  --info-bg: rgba(56, 189, 248, 0.12);
  --info-border: rgba(125, 211, 252, 0.35);
  --info-text: #bae6fd;

  --deep-bg: rgba(139, 92, 246, 0.13);
  --deep-border: rgba(167, 139, 250, 0.35);
  --deep-text: #ddd6fe;

  --border-subtle: #1e293b;
  --border-strong: #334155;
  --focus-ring: 0 0 0 3px rgba(56, 189, 248, 0.45);

  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 8px 20px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 20px 36px rgba(0, 0, 0, 0.65);
  --shadow-hover: 0 12px 28px rgba(0, 0, 0, 0.55);
}
```

---

## Phụ Lục B: Bản Tóm Tắt 10 Quy Tắc Vàng Trên 1 Trang A4

| STT | Quy Tắc Vàng | Hành Động Bắt Buộc | Chỉ Số Kiểm Chứng |
|---|---|---|---|
| **1** | **Bài trừ bảng thô** | Dùng `.net-compare-grid` + `.net-spec-list` cho mọi so sánh đối chiếu; dùng `.net-packet-strip` cho phân mảnh gói tin. | $0$ bảng Markdown/HTML so sánh |
| **2** | **Chống vách đá chữ** | Đoạn văn tối đa $3-4$ dòng ($<70$ từ). Đan xen lưới thẻ bài `.net-concept-grid`. | Không có đoạn văn $>4$ dòng |
| **3** | **Độ rộng dòng đọc** | Giới hạn tối đa $78\text{ch}$ (~$860\text{px}$) để mắt quét chữ mượt mà không đảo dòng mệt mỏi. | `max-width: 78ch;` |
| **4** | **Trực giác mở đầu** | 100% bài có `intuition` đủ 4 trường (`title`, `metaphor`, `boundary`, `visualHtml`) và dùng `.net-arch-box`. | Đầy đủ 4 trường dữ liệu |
| **5** | **Giải toán từng bước** | Mọi phép tính số học, nhị phân, subnet bọc trong `.net-calc-box` chia nhỏ các `.net-calc-step`. | Không bỏ bước tính trung gian |
| **6** | **Lab có kiểm chứng** | Mở đầu bằng `.net-step-card`, kèm hộp `.net-verify-box` chỉ rõ dấu hiệu làm đúng, có output mẫu và annotation. | Đầy đủ verify-box & codeExamples |
| **7** | **An toàn hai Theme** | Không hard-code mã màu inline. 100% dùng biến CSS `var(--token)`. Tránh `#fff` và `#000` tuyệt đối. | Contrast $\ge 4.5:1$ cả 2 theme |
| **8** | **Thân thiện ngón tay** | Mọi nút bấm, tab điều hướng trên mobile đạt diện tích chạm tối thiểu $44 \times 44\text{px}$ đến $48 \times 48\text{px}$. | Touch target $\ge 44\text{px}$ |
| **9** | **Cấu trúc dữ liệu sạch**| `callouts` lồng `{ pitfalls, tips }`, `exercises` $\ge 3$ bài, `summary` 5 dòng, không lặp HTML tự động render. | Chạy `verify-all.mjs` đạt 100% |
| **10**| **Hiệu năng Web tĩnh** | Dùng System Font Stack nạp 0ms độ trễ; chỉ transition trên `transform` và `opacity`; CLS = 0. | Tải tức thì trên `file://` |
