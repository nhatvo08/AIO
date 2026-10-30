# 03 — Quy trình mở rộng

Mọi quy trình dưới đây kết thúc bằng [04-kiem-chung.md](04-kiem-chung.md). Không có bước "làm sau".

## P1. Thêm một bài học Python

1. Tạo `data/lessons/<id>.js` theo mẫu tối thiểu:

```js
export default {
  id: 'lp-c9-20',                  // = tên file, chỉ [a-z0-9-]
  partId: 'part-lp-c9',            // phải khớp part.id trong curriculum
  partTitle: 'Chương 9: ...',
  number: 'C9.20',
  title: '...',
  subtitle: '...',
  level: 'Trung cấp',              // Cơ bản | Trung cấp | Nâng cao
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,          // hoặc 1 trong 6 giá trị ở 02 §2.6
  objectives: ['...'],
  intuition: { title: '...', metaphor: '...' },   // tùy chọn
  sections: [
    { id: 'sec-1', title: '...', content: '<p>...</p>',
      codeExamples: [{ title: '...', code: 'print(1)', output: '1',
                       annotations: [{ line: 1, text: '...' }] }] }
  ],
  callouts: { pitfalls: [{ title: '...', content: '...' }], tips: [], deepDive: null, newIn314: null },
  exercises: [{ title: '...', level: 'Dễ', problem: '...', hint: '...',
                solutionCode: '...', solutionOutput: '...', explanation: '...' }],
  quiz: [{ question: '...', options: ['A', 'B', 'C'], correctIndex: 0, explanation: '...' }],
  summary: ['Ý 1', 'Ý 2']
};
```

2. Khai báo vào **đúng phần** trong `data/curriculum.js`:
   `{ id: 'lp-c9-20', number: 'C9.20', title: '...', level: 'Trung cấp', duration: '30 phút', keywords: ['...'] }`.
3. Nếu số bài đổi: cập nhật `COURSE_META.totalLessons` **và** `totalLessons` của học phần chứa nó.
4. Sinh lại bundle `file://`: `node tools/build-fallback.mjs` (hoặc `powershell -File tools/build_fallback_all.ps1`).
5. Chạy cổng kiểm chứng ở 04.

**Không được**: đổi id bài cũ, đặt `content` chứa `<script>`, dùng class CSS chưa tồn tại, bỏ `summary`.

## P2. Thêm một phần (part) mới

1. Thêm object part vào `parts[]` của học phần trong `data/curriculum.js`
   (`id: 'part-lp-c10'`, `number`, `title`, `level`, `description`, `lessons: []`; LP còn cần `group`, `groupShort`, `fullTitle`).
2. Tăng `COURSE_META.totalParts` và `totalParts` của học phần.
3. Sinh bài theo P1 (mỗi bài phải có `partId` trùng `part.id`).
4. Chạy cổng kiểm chứng; kiểm thêm: bộ lọc học phần ở sidebar vẫn lọc đúng (`data-course-filter`).

## P3. Thêm chuyên đề mới (trang thứ 4) — dùng TopicEngine

1. Tạo file HTML: `cp github.html <ten>.html` rồi thay nhãn tiêu đề, giữ nguyên cấu trúc
   `header → sidebar-left → main-content-wrapper → sidebar-right` và toàn bộ id ở 02 §2.1.
2. CSS: tạo `css/<ten>.css` **chỉ** chứa class prefix riêng (`<ten>-*`); nạp **sau** `responsive.css`.
3. Dữ liệu: `data/<ten>/level1..N.js`, mỗi file gán `window.<PREFIX>_LEVELn_DATA = { id, number, title, level, badge, description, lessons[] }`.
   Bài trong chuyên đề dùng `id` riêng (ví dụ `dk-1-01`), mỗi bài có `id, number, title, subtitle, level, duration, sections[], summary`.
4. Controller: tạo `js/<ten>-app.js` dạng **IIFE** cấu hình mỏng gọi `window.TopicEngine.createApp({...})` — không cần sao chép mã lặp.
5. Thẻ script trong `<ten>.html`:
   ```html
   <script src="./data/<ten>/level1.js"></script>
   <script src="./js/topic-engine.js"></script>
   <script src="./js/<ten>-app.js"></script>
   ```
6. Điều hướng: thêm tab tương ứng vào thanh `header-nav-tabs` ở **tất cả các trang HTML**; link tương đối `./<ten>.html`.
7. Cập nhật `tools/verify-all.mjs` để kiểm dữ liệu của chuyên đề mới.
8. `AGENTS.md` và `README.md`: thêm dòng mô tả trang mới.

**Không được**: dùng ES Module cho dữ liệu chuyên đề (chết trên `file://`), tái dùng id bài của khóa Python,
đặt CSS riêng mà không nạp sau `responsive.css`.

## P4. Thêm widget tương tác

1. Viết `export function render<Ten>(container)` trong `js/widgets.js` (thuần DOM, không thư viện).
2. Thêm `case '<ten-widget>':` vào `mountLessonWidget` — giữ `default` báo lỗi rõ ràng.
3. Khai báo `interactiveWidget: '<ten-widget>'` trong bài dùng nó; thêm vào danh sách 6 → 7 giá trị ở 02 §2.6.
4. Kiểm: mở đúng bài, widget render, không lỗi console; mở bài khác không bị ảnh hưởng.

## P5. Sửa giao diện / thêm biến CSS

1. Biến mới đặt trong `css/variables.css`, khai báo cho **cả** `[data-theme='light']` và `[data-theme='dark']`.
2. Quy tắc đặt tên: `--<nhóm>-<ý>` (`--bg-*`, `--text-*`, `--border-*`, `--accent-*`, `--danger`, `--info`).
3. Không hard-code mã màu trong `components.css`/`layout.css` nếu đã có biến tương đương.
4. Responsive: thêm vào `css/responsive.css`, không sửa breakpoint tại chỗ khác.
5. Kiểm: đổi theme sáng/tối + 3 cỡ chữ, không phần tử nào mất tương phản; kiểm ở 360px và 1440px.

## Checklist chung (dán vào mô tả công việc)

```
[ ] Không thêm dependency / build step
[ ] Không đổi tên file bài học hoặc id đang có
[ ] Field mới chỉ là tùy chọn, renderer cũ vẫn chạy nếu thiếu
[ ] CSS theo đúng thứ tự nạp, dùng biến có sẵn
[ ] node tools/verify-all.mjs → 6/6, exit 0
[ ] 3 trang: 209 / 20 / 41 mục, bấm 1 bài render, Console 0 lỗi
[ ] Nếu sửa data/lessons: đã sinh lại js/file-fallback.js bằng node tools/build-fallback.mjs
```
