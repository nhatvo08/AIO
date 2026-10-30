# 01 — 22 điều bất biến

Mỗi điều rút ra từ code đang chạy, không phải quy ước đề xuất. Vi phạm bất kỳ điều nào = dự án đã đổi hành vi.

| # | Luật bất biến | Vì sao (nơi thi hành) | Cách kiểm |
|---|---|---|---|
| R1 | Ba file `index.html`, `github.html`, `linux.html` nằm ở gốc dự án, không di chuyển, không đổi tên | Mọi `href`/`src` đều tương đối từ gốc; 3 trang link chéo nhau | `node tools/verify-all.mjs` (mục "Đường dẫn nội bộ") |
| R2 | Không có bước build, không npm, không framework; thư viện ngoài duy nhất là KaTeX 0.16.11 qua CDN kèm SRI | Không có `package.json`; `index.html` nạp KaTeX bằng `<link>`/`<script>` có `integrity` | `ls package.json` (không tồn tại); xem 3 thẻ KaTeX trong `index.html` |
| R3 | Mọi đường dẫn tài nguyên phải tương đối (`./css/...`, `../data/...`), không dùng `/...` tuyệt đối | Phải chạy được cả `file://` lẫn khi serve trong thư mục con | `verify-all` + mở `index.html` trực tiếp |
| R4 | Khóa Python dùng **ES Module**; các chuyên đề dùng **IIFE + TopicEngine + biến global** — không trộn hai mô hình | `js/app.js` có `import`; `js/topic-engine.js`, `js/github-app.js`, `js/linux-app.js` là IIFE đọc global để chạy trên `file://` | `grep -c "^import" js/app.js`; `grep "window.GH_LEVEL1_DATA"` |
| R5 | `data/lessons/<id>.js` phải `export default {...}`; **tên file chính là `id`**, chỉ gồm `[a-z0-9-]` | `js/app.js:79` import động `` `../data/lessons/${lessonId}.js` ``; route chỉ nhận `[a-z0-9-]` | `verify-all` (mục "Mục lục curriculum") |
| R6 | Mỗi bài học phải có mặt trong `data/curriculum.js` **và** ngược lại — không file mồ côi, không id treo | `getFlatLessons()` sinh menu, tiến độ, bài trước/sau | `verify-all` báo "Thiếu file bài học" / "không có trong curriculum" |
| R7 | `COURSE_META.totalLessons` phải bằng số bài thật; `totalParts` bằng số phần thật | Hiển thị ở trang chủ và progress "0/209" | `verify-all` (đối chiếu `totalLessons`) |
| R8 | Không đổi tên/ý nghĩa các field mà renderer đang đọc (bảng đầy đủ ở [02](02-hop-dong.md)); chỉ được **thêm** field tùy chọn mới | `renderLessonView` đọc trực tiếp từng field | `verify-all` + mở 1 bài có đủ mục |
| R9 | `id` của section phải duy nhất trong bài; thiếu `id` thì renderer tự sinh `section-<n>` | TOC dùng `id` để cuộn và highlight (`renderRightToc`) | Mở bài, bấm từng mục ở cột "Trong bài này" |
| R10 | `callouts` chỉ nhận **2 dạng**: object `{pitfalls, tips, newIn314, deepDive}` hoặc array phần tử có `type: 'pitfall' \| 'warning' \| 'tip'`. Không dạng thứ 3 | `js/app.js` rẽ nhánh theo `Array.isArray` | `verify-all` + mở bài có callout |
| R11 | `exercises` phải là **array**; `level` chứa "Dễ" / "Vừa" hoặc "Trung" / còn lại = Khó | `getExerciseLevelClass()` suy ra màu theo chuỗi tiếng Việt | Mở bài có bài tập, xem badge màu |
| R12 | `quiz[].correctIndex` là chỉ số **0-based** trong `options`; mỗi câu 3–5 lựa chọn (nhãn A–E) | `letters = ['A'..'E']`, so sánh `savedAns === q.correctIndex` | Bấm 1 đáp án đúng và 1 sai |
| R13 | `summary` là `string` hoặc `string[]`, luôn render thành danh sách | `renderLessonView` chuẩn hóa cả hai dạng | `verify-all` (mục "Nạp bài học") |
| R14 | `interactiveWidget` chỉ nhận 1 trong 6 giá trị: `slice-viewer`, `unicode-viewer`, `immutability-viewer`, `method-explorer`, `format-builder`, `ieee754-inspector` | `mountLessonWidget` là `switch` đóng (`js/widgets.js:986`) | `verify-all` + mở bài có widget |
| R15 | Mọi truy cập `localStorage` phải qua `js/storage.js`; key duy nhất `py314_str_course_state_v1`; schema 5 trường cố định | `js/storage.js`; có fallback RAM khi trình duyệt chặn | `grep -rn "localStorage" js/` |
| R16 | Route của trang Python chỉ có `#home` và `#lesson=<id>`; renderer nhận hash bằng regex `/lesson=([a-z0-9-]+)/i` | `bootApp()`; `history.replaceState` | Mở `index.html#lesson=lp-c9-00` trực tiếp |
| R17 | Các `id` trong HTML tĩnh là hợp đồng với module JS — không đổi tên, không xóa (danh sách ở [02](02-hop-dong.md)) | `getElementById(...)` khắp `app.js`, `topic-engine.js` | Console phải 0 lỗi; sidebar/theme vẫn chạy |
| R18 | Thứ tự nạp CSS cố định: `variables → layout → components → widgets → responsive → theme riêng` | Biến phải có trước khi dùng; `responsive` ghi đè layout/components | Xem 7 thẻ `<link>` trong `index.html` |
| R19 | Không hard-code màu/kích thước mới: dùng biến trong `css/variables.css`; style riêng chuyên đề phải prefix `gh-` / `lx-` | Theme sáng/tối đổi bằng `data-theme`, cỡ chữ bằng `data-font-size` | Đổi theme + cỡ chữ, không có phần tử "lạc màu" |
| R20 | Không sửa tay `js/file-fallback.js` (sinh tự động); sửa `data/lessons/` rồi sinh lại bằng `node tools/build-fallback.mjs` | `index.html` nạp bundle này khi protocol là `file:` | `verify-all` mục "Bundle file://" |
| R21 | Nội dung bài học là **dữ liệu**: HTML trong `content` chỉ dùng class đã có, **không đặt thẻ `<script>` thật**, không style inline tùy tiện | Renderer chèn `content` thẳng vào DOM; chỉ `code`/`problem`/callout mới được escape | `grep -rn "<script" data/lessons/` |
| R22 | Mọi thay đổi phải kết thúc bằng: `node tools/verify-all.mjs` = 6/6, 3 trang 0 lỗi console, sidebar 209 / 20 / 41 mục | [04-kiem-chung.md](04-kiem-chung.md) | Chạy lại 3 bước trên |

## Điều cấm tuyệt đối

- Đổi tên `data/lessons/*.js` mà không sửa `id` tương ứng trong `data/curriculum.js`.
- Thêm `import`/`export` vào `js/topic-engine.js`, `js/github-app.js`, `js/linux-app.js`, `data/github/*`, `data/linux/*` (sẽ chết trên `file://`).
- Đưa thêm thư viện/npm/build step.
- Đặt CSS/JS mới vào vị trí khiến thứ tự nạp ở R18 sai.
- Sửa nội dung bài học để "khớp code" — nội dung là nguồn sự thật về học thuật.
