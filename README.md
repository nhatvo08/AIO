# Python 3.14.8 — Khóa học tĩnh (HTML/CSS/JavaScript)

Website học lập trình thuần tĩnh, không cần build, không phụ thuộc npm. Ba trang độc lập dùng chung hệ thống CSS/JS:

> Làm việc bằng AI/agent: đọc [AGENTS.md](AGENTS.md) trước — có bản đồ file, quy ước và các điều không được thay đổi.

| Trang | Nội dung |
|---|---|
| `index.html` | Khóa Python 3.14.8 — 209 bài (gồm Chương 9 Learning Python mới nhất) |
| `github.html` | Chuyên đề Git & GitHub — 18 bài + 2 bài tra cứu |
| `linux.html` | Chuyên đề Linux Thực chiến — 41 bài, 4 cấp độ |

## Cách chạy

```bash
# Khuyến nghị: serve qua HTTP để dùng ES Module gốc
python -m http.server 8788 --bind 127.0.0.1
# mở http://127.0.0.1:8788/index.html
```

- VS Code Live Server đã cấu hình cổng `5501` trong `.vscode/settings.json`.
- Mở trực tiếp bằng `file://` vẫn chạy: `index.html` tự phát hiện protocol và nạp bundle `js/file-fallback.js` (chứa sẵn toàn bộ 209 bài); `github.html` và `linux.html` dùng script thường nên không bị chặn CORS.
- Công thức toán dùng KaTeX 0.16.11 từ CDN, cần mạng khi tải trang.

## Cấu trúc thư mục

```
.
├── index.html  github.html  linux.html   # 3 điểm vào, phải giữ ở gốc
├── assets/                               # favicon
├── css/                                  # 7 file: biến, layout, component, widget, responsive, theme GitHub, theme Linux
├── js/                                   # 8 file: app, topic-engine, github-app, linux-app, widgets, storage, highlighter, file-fallback (sinh tự động)
├── data/
│   ├── curriculum.js                     # mục lục 209 bài Python (nguồn sự thật về id bài học)
│   ├── methods.js                        # 47 phương thức str
│   ├── lessons/                          # 209 file, tên file chính là id bài học
│   ├── github/level1..3.js               # dữ liệu chuyên đề GitHub (gán window.GH_*)
│   └── linux/level1..4.js                # dữ liệu chuyên đề Linux (gán window.LX_*)
├── tools/                                # 4 script: kiểm tra toàn vẹn, build fallback đa nền tảng, build ps1, tính SRI
└── _refactor/                            # nhật ký tái cấu trúc thư mục
```

Quy ước bắt buộc:

- `data/lessons/<id>.js` được nạp động bởi `js/app.js` theo `id` khai báo trong `data/curriculum.js` → **không đổi tên file** nếu không sửa đồng thời cả hai nơi.
- `js/file-fallback.js` là bundle sinh tự động, `index.html` phụ thuộc trực tiếp. Sinh lại bằng `node tools/build-fallback.mjs`.

## Thêm hoặc sửa bài học

1. Python: tạo `data/lessons/<id>.js` (export default object có `id`, `title`, `sections`, `summary`) và khai báo `<id>` trong `data/curriculum.js`.
2. Cập nhật bundle cho chế độ `file://`: chạy `node tools/build-fallback.mjs` (hoặc `tools/build_fallback_all.ps1`).
3. GitHub/Linux: thêm mục vào `data/github/levelN.js` hoặc `data/linux/levelN.js`.

## Kiểm tra nhanh

```bash
node tools/verify-all.mjs   # mục lục, 209 bài, dữ liệu GitHub/Linux, mọi đường dẫn nội bộ, bundle file://
```

Kết quả mong đợi: `6/6 mục đạt`, mã thoát `0`.
