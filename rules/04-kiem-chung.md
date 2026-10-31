# 04 — Cổng kiểm chứng

Không được nói "đã xong" nếu chưa có bằng chứng cho **cả 4 cổng**. Cổng nào không chạy được thì phải ghi rõ
"CHƯA KIỂM CHỨNG" kèm lý do, không được bỏ qua.

## G1. Tự động — bắt buộc, chạy sau mọi thay đổi

```bash
node tools/verify-all.mjs    # phải in "6/6 mục đạt", mã thoát 0
```

| Mục | Kỳ vọng hiện tại |
|---|---|
| Mục lục curriculum | 219 bài / 4 học phần / 219 file |
| Nạp bài học | 219/219 hợp lệ |
| Dữ liệu GitHub | 3 cấp / 18 bài + 2 tra cứu |
| Dữ liệu Linux | 4 cấp / 41 bài |
| Đường dẫn nội bộ | Kiểm tra mọi tham chiếu HTML/JS, 0 hỏng |
| Bundle `file://` | 219 khoá khớp curriculum |

Đổi nội dung bài học ⇒ **phải** sinh lại `js/file-fallback.js`, nếu không cổng này vẫn xanh nhưng chế độ
`file://` đã lệch nội dung. Đếm khoá duy nhất (đừng dùng `grep -c` vì bundle còn 2 chỗ đọc lại khoá):

```bash
grep -o "__PRELOADED_LESSONS__\['[^']*'\]" js/file-fallback.js | sort -u | wc -l   # = 219
```

## G2. Thủ công — 3 trang qua HTTP

```bash
python -m http.server 8788 --bind 127.0.0.1
```

| Trang | Sidebar | Bấm 1 bài | Console |
|---|---|---|---|
| `http://127.0.0.1:8788/index.html` | 219 mục, 18 phần | Tiêu đề + TOC đúng | 0 lỗi |
| `http://127.0.0.1:8788/github.html` | 20 mục (18 bài + 2 tra cứu) | render đúng | 0 lỗi |
| `http://127.0.0.1:8788/linux.html` | 41 mục, 4 phần | render đúng | 0 lỗi |

Kiểm thêm khi có sửa UI: đổi theme sáng/tối, 3 cỡ chữ, mở/đóng sidebar ở 360px, chuyển đổi chuyên đề bằng Header tabs (Python / Github / Linux).

## G3. Hiệu năng — ngân sách tải trang

| Chỉ số | Ngưỡng |
|---|---|
| Tổng byte nạp đầu của `index.html` (HTML + CSS + JS lõi + `curriculum.js` + `methods.js`) | ≤ **360 KB** (hiện 342 KB) |
| Mỗi bài học nạp thêm | ≤ **20 KB** (hiện ~15 KB) |
| `js/file-fallback.js` | chỉ tải ở `file://`, không được nạp khi HTTP |

Đo lại bằng:

```bash
total=0; for f in index.html css/*.css js/app.js js/storage.js js/highlighter.js js/widgets.js data/curriculum.js data/methods.js; do total=$((total+$(wc -c < "$f"))); done; echo $total
```

Vượt ngưỡng ⇒ phải nêu lý do và số đo trước/sau trong báo cáo.

## G4. Vệ sinh thư mục — trước khi kết thúc

```bash
git status --short          # không được còn file lạ ngoài phạm vi thay đổi
grep -rn "edge_temp" --exclude-dir=.git .   # phải rỗng (không tái sinh profile trình duyệt)
```

- Không thêm script dùng một lần; script kiểm tra phải có giá trị lặp lại, nếu không thì xoá sau khi dùng.
- Không để file `.log`, dump HTML, `__pycache__` trong repo (đã có `.gitignore`).

## Mẫu báo cáo kết quả

| Cổng | Kết quả | Bằng chứng |
|---|---|---|
| G1 | đạt / không đạt | dán 6 dòng của `verify-all` |
| G2 | đạt / chưa kiểm chứng | số mục sidebar + 0 lỗi console |
| G3 | đạt / vượt ngưỡng | số byte đo được |
| G4 | đạt / còn sót | `git status --short` |

## Những mục CHƯA kiểm chứng được trên máy hiện tại

| Mục | Lý do | Cách xử lý |
|---|---|---|
| Chế độ `file://` (bundle) | Môi trường agent chặn mở `file://` | Người dùng mở trực tiếp `index.html`, xác nhận 219 bài |
| Sinh bundle `file://` đa nền tảng | Đã có `tools/build-fallback.mjs` | Chạy lệnh `node tools/build-fallback.mjs` trên mọi hệ điều hành |
