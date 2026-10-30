# 05 — Bộ Quy Chuẩn Thiết Kế UI/UX Bài Học Mạng Linux
*(Networking Lesson UI/UX Design System Specification)*

> **Áp dụng cho**: Toàn bộ 70 bài học chuyên sâu trong Chuyên đề Networking trên Linux (`network.html`) và các chuyên đề mở rộng sau này.  
> **Mục tiêu**: Đảm bảo 100% bài học đạt độ hoàn thiện thị giác cao nhất, loại bỏ cảm giác đọc tài liệu thô sơ, tối ưu trải nghiệm học thực chiến (Hands-on Learning UX).

---

## 1. Nguyên Tắc Thiết Kế Trải Nghiệm Học Tập (Pedagogical UX Principles)

1. **Chống "Vách đá Văn bản" (No Wall of Text)**:
   - Tuyệt đối không để các đoạn văn bản dài quá 4 dòng mà không có ngắt đoạn, danh sách gạch đầu dòng, thẻ nhấn mạnh hoặc thuật ngữ nổi bật.
   - Thuật ngữ kỹ thuật cốt lõi phải được bọc trong thẻ `<code>...</code>` hoặc in đậm.
2. **Sơ đồ Trực quan Thay cho ASCII Trần (Visual Over Raw ASCII)**:
   - Không đặt các khối ASCII trần trụi trong thẻ `<pre>` đơn điệu.
   - Mọi luồng dữ liệu hoặc kiến trúc gói tin phải sử dụng hệ thống thẻ phân tầng có màu sắc ngữ nghĩa (`.net-arch-box`, `.net-flow-grid`, `.net-header-diagram`), phân biệt rõ User Space (xanh lam), Kernel VFS (tím), Network Stack (xanh da trời) và Phần cứng/NIC (cam).
3. **Chuẩn Mực Lệnh & Terminal (Terminal Block Standard)**:
   - Mỗi câu lệnh thực thi bắt buộc phải có: Tiêu đề rõ ràng, thẻ ngôn ngữ (`Bash`), số thứ tự dòng, nút Copy (`Sao chép`), khối Kết quả mong đợi (`Terminal Output`) và danh sách chú giải từng cờ/tham số (`annotations`).
4. **Phòng Lab Dạng Thẻ Bước Tuần Tự (Step-by-Step Lab Blueprint)**:
   - Không viết lab thành một bài luận văn xuôi.
   - Mỗi bài lab phải được chia thành các thẻ bước (`.net-lab-step-card`): có số thứ tự bước tròn, mục tiêu bước, câu lệnh copy, kết quả quan sát và **Hộp kiểm tra bạn đã làm đúng** (`.net-lab-verify`).
5. **Hồ Sơ Sự Cố Production Chuẩn SRE (SRE Post-Mortem Blueprint)**:
   - Định dạng chuẩn 4 phần: *🚨 Bối cảnh sự cố*, *💥 Triệu chứng & Log lỗi*, *🔍 Phân tích gốc rễ (Root Cause)*, và *💊 Phác đồ điều trị triệt để*.
6. **Thử Thách Bản Chất Tương Tác (Interactive Reflection Standard)**:
   - Câu hỏi tư duy cuối bài được đóng khung trong thẻ `.net-reflection-box` màu tím/indigo với icon `🧠`, kèm dropdown xem gợi ý suy ngẫm từ giảng viên.

---

## 2. Hệ Thống Khung Giao Diện Chuẩn Hóa (UI Component Specification)

### 2.1 Sơ đồ Luồng & Kiến trúc Phân tầng (`.net-arch-box`)
Dùng để mô phỏng đường đi của dữ liệu từ ứng dụng xuống card mạng hoặc cấu trúc bộ nhớ:
```html
<div class="net-arch-box">
  <div class="net-arch-header">
    <span class="net-arch-icon">🔌</span>
    <span class="net-arch-title">TIÊU ĐỀ SƠ ĐỒ KIẾN TRÚC</span>
  </div>
  <div class="net-arch-layers">
    <div class="net-arch-layer layer-userspace">...</div>
    <div class="net-arch-arrow">⬇️ Syscall</div>
    <div class="net-arch-layer layer-kernel">...</div>
    <div class="net-arch-arrow">⬇️ Datapath</div>
    <div class="net-arch-layer layer-hardware">...</div>
  </div>
</div>
```

### 2.2 Bảng Đối chiếu Khám nghiệm (`.net-matrix-table`)
Dùng cho phần "Ví dụ số liệu cụ thể" đối chiếu giữa các tầng:
- Header bảng dùng nền `--bg-code-header` với độ tương phản sắc nét.
- Các ô dữ liệu quan trọng dùng class `.net-highlight-cell` với màu nhấn xanh da trời `--topic-network`.

### 2.3 Thẻ Bước Thực Hành Phòng Lab (`.net-step-card`)
Dùng cho phần Lab thực hành:
```html
<div class="net-step-card">
  <div class="net-step-badge">BƯỚC 1</div>
  <h4 class="net-step-title">Tiêu đề bước làm</h4>
  <p class="net-step-desc">Mục đích và giải thích ngắn gọn...</p>
  <!-- Code block thực thi -->
  <div class="net-verify-box">
    <span class="net-verify-icon">✓</span>
    <span><strong>Cách kiểm tra bạn làm đúng:</strong> Mô tả output hoặc cờ cần thấy...</span>
  </div>
</div>
```

### 2.4 Thẻ Bệnh án Sự cố Production (`.net-postmortem-card`)
Dùng cho phần phân tích môi trường thực tế:
- Border trái màu đỏ `var(--danger)`.
- Có log trích xuất dạng hộp terminal màu đen cảnh báo lỗi `500` hoặc drop packet.
- Có checklist toa thuốc điều trị bằng các tham số `sysctl` và `limits.conf`.

### 2.5 Hộp Thử Thách Bản Chất (`.net-reflection-box`)
Render tự động qua thuộc tính `reflectionQuestion` và `reflectionHint` trong JSON bài học:
- Icon `🧠` nổi bật.
- Câu hỏi in đậm dạng gợi mở ("Explain in your own words").
- Dropdown `<details>` xem gợi ý suy ngẫm từ giảng viên.

### 2.6 Thẻ Cầu Nối Bài Tiếp Theo (`.net-next-bridge`)
Render tự động qua thuộc tính `nextLessonPreview`:
- Nằm ngay phía trên thanh điều hướng bài trước/sau.
- Giúp người học thấy rõ mắt xích kết nối giữa các bài trong lộ trình xoắn ốc.

---

## 3. Cấu Trúc Khung Bài Học Mạng Chuẩn (Lesson Schema Checklist)

Mỗi file bài học trong `data/network/phase*.js` phải tuân thủ nghiêm ngặt cấu trúc 12 phần sau:

```javascript
{
  id: "net-X-YY",
  number: "X.Y",
  title: "...",
  subtitle: "...",
  level: "Nền tảng" | "Cơ bản" | "Trung cấp" | "Nâng cao" | "Chuyên sâu",
  duration: "90 phút",
  objectives: [ /* 4-5 gạch đầu dòng rõ ràng */ ],
  intuition: {
    title: "...",
    metaphor: "...",
    visualHtml: `<!-- Sử dụng .net-arch-box hoặc sơ đồ phân tầng trực quan -->`
  },
  sections: [
    { id: "sec-problem", title: "Vấn đề thực tế: ...", content: "..." },
    { id: "sec-mechanism", title: "Cơ chế chi tiết: ...", content: "..." },
    { id: "sec-walkthrough", title: "Ví dụ số liệu cụ thể: ...", content: "..." },
    { id: "sec-observe", title: "Quan sát trên Linux: ...", content: "...", codeExamples: [ ... ] },
    { id: "sec-lab", title: "Phòng Lab thực hành: ...", content: "..." },
    { id: "sec-production", title: "Môi trường Production & Ca sự cố: ...", content: "..." }
  ],
  callouts: {
    pitfalls: [ { title: "...", content: "..." } ],
    tips: [ { title: "...", content: "..." } ]
  },
  exercises: [
    { level: "Dễ", title: "...", problem: "...", hint: "...", solutionCode: "...", explanation: "..." },
    { level: "Vừa", title: "...", problem: "...", hint: "...", solutionCode: "...", explanation: "..." },
    { level: "Thử thách", title: "...", problem: "...", hint: "...", solutionCode: "...", explanation: "..." }
  ],
  reflectionQuestion: "Câu hỏi kích thích tư duy bản chất...",
  reflectionHint: "Gợi ý cốt lõi từ giảng viên giúp người học tự đối chiếu suy nghĩ...",
  summary: [ /* 5 gạch đầu dòng cô đọng nhất */ ],
  nextLessonPreview: "Tóm tắt 1 câu liên kết chặt chẽ sang bài tiếp theo..."
}
```
