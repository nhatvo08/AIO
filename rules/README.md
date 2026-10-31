# Bộ luật bất biến — lấy trang Python làm gốc

Thư mục này chốt lại **cách dự án đang hoạt động thật** (phân tích từ code hiện tại) để mọi mở rộng sau này
bám theo mà không phá vỡ trang Python. Đây là luật kỹ thuật, không phải tài liệu giới thiệu.

| File | Nội dung | Khi nào đọc |
|---|---|---|
| [01-bat-bien.md](01-bat-bien.md) | 22 điều bất biến, mỗi điều kèm lý do và cách kiểm | **Trước khi sửa bất cứ thứ gì** |
| [02-hop-dong.md](02-hop-dong.md) | Hợp đồng kỹ thuật: DOM id, route, localStorage, schema dữ liệu, widget, CSS | Khi thêm/sửa dữ liệu, DOM, style |
| [03-quy-trinh.md](03-quy-trinh.md) | 5 quy trình mở rộng kèm checklist và mẫu | Khi thêm bài, phần, chuyên đề, widget |
| [04-kiem-chung.md](04-kiem-chung.md) | Cổng kiểm chứng, số liệu kỳ vọng, bằng chứng bắt buộc | Trước khi kết luận "đã xong" |
| [07-quy-chuan-uiux-design-rulebook.md](07-quy-chuan-uiux-design-rulebook.md) | Bộ Quy Tắc Thiết Kế UI/UX Toàn Diện (v3.0) — Chuẩn hóa Design Tokens, Components, Accessibility & QA Checklist | **Quy tắc thiết kế hệ thống chuẩn mực cho toàn bộ nền tảng học kỹ thuật tĩnh** |

## Nguyên tắc áp dụng

1. **Trang Python là chuẩn** (`index.html` + `js/app.js` + `data/curriculum.js` + `data/lessons/`).
   Trang/chuyên đề mới phải tái dùng hệ CSS và hợp đồng DOM của nó, không dựng bộ giao diện thứ hai.
2. **Thứ tự ưu tiên khi mâu thuẫn**: `01` > `02` > `03` > `04` > mọi tài liệu khác (README, ghi chú cũ).
   Nếu hai luật mâu thuẫn hoặc luật cản trở yêu cầu mới → **dừng, hỏi chủ dự án**, không tự nới luật.
3. **Luật chỉ được sửa khi code đổi**: mỗi lần sửa phải kèm bằng chứng `đường-dẫn-file:dòng` trong commit.
4. **Không suy diễn**: điều gì không thấy trong code thì không được ghi thành luật.
5. Tài liệu này **chỉ mô tả**, không thay thế kiểm chứng — vẫn phải chạy `node tools/verify-all.mjs`.

## Luật ↔ nơi thi hành

| Nhóm luật | Thi hành ở |
|---|---|
| Điểm vào, nạp script theo protocol | `index.html`, `github.html`, `linux.html` |
| Render, route, TOC, tiến độ | `js/app.js` |
| Lưu trữ, theme, cỡ chữ | `js/storage.js` |
| Widget tương tác | `js/widgets.js` |
| Engine lõi chuyên đề | `js/topic-engine.js` |
| Tô sáng mã, escape HTML | `js/highlighter.js` |
| Mục lục khóa Python | `data/curriculum.js` |
| Nội dung bài | `data/lessons/<id>.js` |
| Chuyên đề GitHub/Linux | `data/github/level*.js`, `data/linux/level*.js`, `js/*-app.js` |
| Kiểm chứng tự động | `tools/verify-all.mjs` |
