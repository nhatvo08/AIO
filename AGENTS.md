# Hướng dẫn cho AI và người mới (AGENTS.md)

Website học lập trình **thuần tĩnh**: HTML + CSS + JavaScript, không bundler, không `package.json`, không phụ thuộc npm. Mọi thứ chạy bằng cách mở file hoặc serve thư mục.

## 1. Lệnh nhanh

```bash
# Chạy
python -m http.server 8788 --bind 127.0.0.1     # mở http://127.0.0.1:8788/index.html
# (hoặc VS Code Live Server, cổng đã cấu hình: 5501)

# Kiểm tra toàn vẹn — chạy lệnh này sau MỌI thay đổi
node tools/verify-all.mjs

# Sinh lại bundle file:// (khi thêm/sửa bài Python)
node tools/build-fallback.mjs
```

`verify-all.mjs` (không cần thư viện) kiểm 6 mục: mục lục curriculum khớp `data/lessons/`, nạp được cả 219 bài, dữ liệu GitHub/Linux hợp lệ, mọi đường dẫn nội bộ trong HTML/JS tồn tại, bundle `file://` phủ đúng danh sách bài. Mã thoát `0` = đạt, `1` = có mục hỏng.

Kiểm tra thủ công sau khi sửa UI: mở 3 trang hoạt động, sidebar phải có **219 / 20 / 41** mục (Python / GitHub / Linux), bấm một bài bất kỳ phải render, Console **0 lỗi**.

## 2. Bản đồ file

| Đường dẫn | Vai trò | Ghi chú |
|---|---|---|
| `index.html` | Trang khóa Python | Điểm vào, **không di chuyển** |
| `github.html`, `linux.html` | 2 chuyên đề bổ trợ | Điểm vào, **không di chuyển** |
| `css/` | `variables` → `layout` → `components` → `widgets` → `responsive`, cộng `github.css`, `linux.css` | Thứ tự nạp quan trọng: biến phải trước |
| `js/app.js` | Controller + renderer khóa Python (ESM) | Nạp bài bằng `import(\`../data/lessons/${id}.js\`)` |
| `js/topic-engine.js` | Engine lõi dùng chung cho các chuyên đề | IIFE, cung cấp renderer, sidebar accordion, TOC, quiz, theme sync |
| `js/github-app.js`, `js/linux-app.js` | Cấu hình chuyên đề Git & Linux | IIFE cấu hình mỏng gọi `window.TopicEngine.createApp`, chạy mượt trên `file://` |
| `js/widgets.js`, `storage.js`, `highlighter.js` | Widget bài học, localStorage, tô sáng mã | Dùng chung cho khóa Python |
| `js/file-fallback.js` | **Sinh tự động** — bundle 219 bài cho chế độ `file://` | Không sửa tay; sinh lại bằng `node tools/build-fallback.mjs` |
| `data/curriculum.js` | Mục lục 219 bài Python: học phần → phần → bài | Nguồn sự thật về `id` bài học |
| `data/lessons/<id>.js` | Nội dung từng bài (`export default {...}`) | **Tên file = id**, không đổi tên tùy ý |
| `data/methods.js` | 47 phương thức `str` | Dùng cho widget tương tác |
| `data/github/level1..3.js` | Dữ liệu chuyên đề GitHub | Gán `window.GH_LEVELn_DATA`; level3 còn có `GH_REFERENCE_DATA` |
| `data/linux/level1..4.js` | Dữ liệu chuyên đề Linux | Gán `window.LX_LEVELn_DATA` |
| `tools/verify-all.mjs` | Kiểm tra toàn vẹn, không cần thư viện | Chạy sau mọi thay đổi |
| `tools/build-fallback.mjs` | Sinh lại `js/file-fallback.js` (Node.js) | Đa nền tảng, không phụ thuộc PowerShell |
| `tools/build_fallback_all.ps1` | Script sinh fallback bằng PowerShell | Script phụ trợ cho môi trường Windows |
| `tools/calc_sri.mjs` | Tính hash SRI khi nâng phiên bản KaTeX | Dùng một lần khi đổi CDN |

Số lượng hiện tại: 219 bài Python, 18 bài GitHub + 2 tra cứu, 41 bài Linux.

## 3. Bất biến — không được vi phạm

1. **Không đổi tên `data/lessons/*.js`** trừ khi sửa đồng thời `id` trong `data/curriculum.js` (tên file chính là id nạp động).
2. **Không sửa tay `js/file-fallback.js`** — sửa `data/lessons/` rồi chạy `node tools/build-fallback.mjs` để sinh lại.
3. **Không di chuyển 3 file HTML gốc** — đường dẫn tương đối và link chéo giữa chúng phụ thuộc vị trí này.
4. **Không thêm thư viện/framework**: dự án chủ ý không có build step. Chỉ KaTeX tải từ CDN.
5. **Trước khi xoá bất kỳ file nào**: `grep` xác nhận không file nào trong `*.html`, `js/`, `data/`, `css/` nạp tới nó, rồi chạy `node tools/verify-all.mjs`. Repo chủ ý giữ ít file để AI đọc nhanh; không thêm script dùng một lần.
6. Không đụng `.git`, `.freebuff/`, `.vscode/`.

## 4. Thêm hoặc sửa một bài học

**Python**

1. Tạo `data/lessons/<id>.js` theo cấu trúc bài có sẵn (bắt buộc: `id`, `title`, `sections`, `summary`; tùy chọn: `objectives`, `intuition`, `callouts`, `exercises`, `interactiveWidget`).
2. Khai báo bài đó vào đúng phần trong `data/curriculum.js` (thêm object `{ id, number, title, level, duration, keywords }`).
3. Cập nhật `COURSE_META.totalLessons` / `totalParts` nếu số lượng đổi.
4. Sinh lại bundle: `node tools/build-fallback.mjs`.
5. `node tools/verify-all.mjs` → phải 6/6.

**GitHub / Linux / Chuyên đề mới**

Thêm object bài vào mảng `lessons` của file `data/<topic>/levelN.js`. Sau đó chạy `node tools/verify-all.mjs`.

## 5. Quy ước code (giữ đúng như hiện trạng)

- Khóa Python dùng **ES Module** (`import`/`export`); các chuyên đề dùng **IIFE + TopicEngine + biến global** để chạy được trên `file://`. Đừng đổi mô hình này.
- Comment và nội dung hướng dẫn viết **tiếng Việt**, thụt 2 dấu cách, chấm phẩy cuối câu lệnh.
- CSS dùng biến trong `css/variables.css` (`--bg-surface`, `--text-primary`…), không hard-code màu mới nếu đã có biến.
- Nội dung bài học là dữ liệu, không phải code: giữ nguyên văn phong, ví dụ, thuật ngữ hiện có.

## 6. Trạng thái kiểm chứng đã biết

| Hạng mục | Trạng thái |
|---|---|
| Nạp bài + dữ liệu + đường dẫn nội bộ | Tự động, `node tools/verify-all.mjs` (6/6 đạt) |
| Sinh Fallback Bundle đa nền tảng | Tự động, `node tools/build-fallback.mjs` (chạy mượt trên mọi OS) |
| 3 trang render + Console | Kiểm thủ công qua HTTP (Console 0 lỗi) |
| Chế độ `file://` | Mở trực tiếp file HTML, nạp đầy đủ bài học |
