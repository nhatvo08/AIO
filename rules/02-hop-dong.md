# 02 — Hợp đồng kỹ thuật (trích từ trang Python)

Mọi con số/dòng dưới đây lấy từ code đang chạy. Đổi một mục = phải sửa đúng nơi thi hành và chạy lại `verify-all`.

## 2.1 DOM id — hợp đồng với JS

**Trong HTML tĩnh** (`index.html`, phải tồn tại đúng tên):

| Nhóm | id |
|---|---|
| Khung trang | `menu-toggle-btn`, `brand-home-link`, `theme-toggle-btn`, `sidebar-backdrop`, `sidebar-left`, `sidebar-close-btn`, `main-content`, `toc-container` |
| Tiến độ | `sidebar-progress-pct`, `sidebar-progress-fill`, `sidebar-progress-stats` |
| Điều hướng | `top-nav-python`, `top-nav-github`, `top-nav-linux`, `sidebar-course-tabs`, `curriculum-tree` |

**Do renderer sinh ra** (đổi tên phải sửa cả `app.js`): `btn-toggle-complete`, `lesson-interactive-widget`,
`hero-start-btn`, `hero-python-btn`, `hero-methods-btn`, `hero-hp1-btn`, `hero-lp-btn`,
`home-course-python`, `home-course-str`, `home-course-learning-python`, `code-raw-<...>`,
`sec-objectives`, `sec-intuition`, `sec-callouts`, `sec-exercises`, `sec-quiz`, `sec-summary`, `section-<n>`.

Ngoài id, JS bám vào các class/hook: `.font-btn[data-size]`, `.course-tab-btn[data-course-filter]`,
`.lesson-nav-btn[data-lesson-id]`, `.quiz-card[data-quiz-idx][data-correct-idx]`, `.quiz-option-btn[data-opt-idx]`,
`.toc-link[data-toc-target]`, `.copy-code-btn[data-copy-target]`, `[data-nav-lesson]`, `[data-nav-home]`.

## 2.2 Route

| Route | Hành vi | Nơi xử lý |
|---|---|---|
| `#home` | Trang chủ + lộ trình | `navigateHome()` |
| `#lesson=<id>` | Render bài, lưu `lastLessonId` | `navigateToLesson()` |
| hash không khớp id nào | Quay về `#home` | `bootApp()` |

Không có router riêng, không có history API ngoài `replaceState`.

## 2.3 localStorage

- Key duy nhất: `py314_str_course_state_v1` (trong `js/storage.js`).
- Schema: `{ completedLessons: string[], lastLessonId: string|null, quizAnswers: { "<lessonId>:<questionIndex>": number }, theme: 'light'|'dark'|null, fontSize: 'small'|'medium'|'large' }`
- Mọi lỗi (chặn cookie, JSON hỏng) rơi về `memoryFallback` trong RAM — **không được ném lỗi ra UI**.

## 2.4 `data/curriculum.js`

```
COURSE_META: { title, version, subtitle, totalCourses, totalParts, totalLessons, totalMethods }
COURSES[]:   { id, number, code, title, shortTitle, badge, icon, accentColor, tagline,
               description, totalParts, totalLessons, totalMethods, widgetsCount, parts[] }
parts[]:     { id, number, title, level, description, lessons[],
               group?, groupShort?, chapterNumber?, chapterTitle?, fullTitle? }
lessons[]:   { id, number, title, level, duration, isNew314, keywords[] }   ← chỉ metadata, KHÔNG chứa nội dung
```

`getFlatLessons()` làm phẳng và bổ sung: `courseId, courseNumber, courseTitle, courseShortTitle,
courseIcon, courseBadge, courseAccent, partId, partNumber, partTitle, fullBreadcrumb`.

Hiện trạng: 3 học phần / 17 phần / 209 bài (`course-python` 3, `course-str` 8, `course-learning-python` 6).

## 2.5 `data/lessons/<id>.js`

**Bắt buộc**: `id`, `title`, `sections[]`, `summary`.
**Tùy chọn đang được render**: `partId`, `partTitle`, `chapter`, `number`, `subtitle`, `level`, `duration`,
`isNew314`, `interactiveWidget`, `objectives[]`, `intuition`, `callouts`, `exercises[]`, `quiz[]`.
**Có trong dữ liệu nhưng renderer KHÔNG đọc**: `nextSteps` — coi là trường dự phòng, đừng tin là đã hiển thị.

```
sections[]:       { id?, title, badge?, content: string(HTML), codeExamples?: CodeExample[] }
CodeExample:      { title?, code, output?, annotations?: [{ line: number, text }] }
intuition:        { title, metaphor, visualHtml? }
objectives[]:     string
quiz[]:           { question, options[] (3–5), correctIndex (0-based), explanation }
summary:          string | string[]
callouts (dạng object): { pitfalls?: {title,content}[], tips?: {title,content}[],
                          newIn314?: {title,content}, deepDive?: {title,content} }
callouts (dạng array):  [{ type: 'pitfall'|'warning'|'tip', title, content }]
exercises[]:      { title, level, problem?|description?, hint?, solutionCode?|solution?,
                    solutionOutput?, annotations?, explanation? }
```

## 2.6 Widget tương tác

`js/widgets.js` xuất `mountLessonWidget(widgetType, container)` với `switch` **đóng** 6 nhánh:
`slice-viewer`, `unicode-viewer`, `immutability-viewer`, `method-explorer`, `format-builder`, `ieee754-inspector`.
Thêm widget mới = thêm hàm render + thêm `case` + cập nhật tài liệu này; **không** sửa `renderLessonView`.

## 2.7 Tìm kiếm

- Nguồn: `getFlatLessons()` (số bài, tiêu đề, `partTitle`, `keywords[]`, tên học phần) + `STR_METHODS` trong `data/methods.js`.
- `METHOD_CATEGORY_TO_LESSON` ánh xạ category phương thức → id bài: `case→p2-01`, `search→p2-02`, `strip→p2-03`,
  `splitjoin→p2-04`, `replace→p2-05`, `align→p2-05`, `check→p2-06`, `other→p2-06`, mặc định `p2-07`.
  **Đổi id bài `p2-*` thì phải sửa bảng này**, nếu không kết quả tìm kiếm trỏ vào hư không.
- Phím tắt: `/`, `Ctrl+K` / `Cmd+K`, `Escape`; tối đa 18 kết quả.

## 2.8 Công thức toán (KaTeX)

- Delimiter: `$...$`, `$$...$$`, `\(...\)`, `\[...\]`.
- Bỏ qua: `script, noscript, style, textarea, pre, code` → mã Python trong `<pre><code>` không bị render.
- Gọi qua `renderMathInContainer(container)` sau mỗi lần chèn HTML.

## 2.9 Nạp script theo protocol (`index.html`)

```
protocol === 'file:'  → <script src="./js/file-fallback.js">   (bundle 4,15 MB chứa sẵn 209 bài)
ngược lại             → <script type="module" src="./js/app.js">
```

`github.html` / `linux.html` nạp script thường (không module): `data/<chủ-đề>/level1..N.js` rồi `js/<chủ-đề>-app.js`.

## 2.10 CSS

- Thứ tự: `variables → layout → components → widgets → responsive → github.css → linux.css`.
- Theme: `data-theme="light|dark"`, cỡ chữ: `data-font-size="small|medium|large"` trên `<html>`.
- Biến gốc (ví dụ): `--bg-app`, `--bg-surface`, `--bg-surface-alt`, `--text-primary`, `--text-secondary`,
  `--text-muted`, `--border-subtle`, `--accent-primary`, `--accent-soft`, `--accent-text`, `--danger`, `--info`,
  `--font-sans`, `--font-mono`, `--base-font-size`, `--content-max-width`.
- Prefix riêng: `gh-*` (GitHub), `lx-*` (Linux); không dùng prefix này cho trang Python.

## 2.11 Tải trang (ngân sách)

| Phần | Kích thước thực tế |
|---|---|
| `index.html` + 7 CSS + 5 JS dùng chung + `curriculum.js` + `methods.js` | **~356 KB** (không nén) |
| Mỗi bài học nạp thêm | **~15 KB** (module `data/lessons/<id>.js`) |
| `js/file-fallback.js` | 4,15 MB — **chỉ** tải khi mở `file://` |
| KaTeX | CDN, chỉ tải khi trang có công thức |

Thêm bất cứ thứ gì vào lần tải đầu đều phải nêu lý do và số đo trước/sau.
