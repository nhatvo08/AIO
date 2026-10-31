/**
 * Kiểm tra toàn vẹn dự án — một lệnh duy nhất, không cần thư viện ngoài.
 *
 * Cách chạy (từ thư mục gốc hoặc bất kỳ đâu):
 *   node tools/verify-all.mjs
 *
 * Nội dung kiểm tra:
 *  1. Mục lục curriculum khớp với file bài học trong data/lessons/
 *  2. Nạp được toàn bộ bài học và đúng cấu trúc tối thiểu
 *  3. Dữ liệu chuyên đề GitHub/Linux nạp được và không trùng id
 *  4. Mọi đường dẫn nội bộ trong HTML/JS đều tồn tại trên đĩa
 *  5. Bundle js/file-fallback.js phủ đúng danh sách bài học của curriculum
 *
 * Mã thoát: 0 = tất cả đạt, 1 = có mục không đạt.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const abs = (p) => path.join(ROOT, p);
const results = [];

async function check(name, fn) {
  try {
    const detail = await fn();
    results.push({ name, ok: true, detail });
  } catch (error) {
    results.push({ name, ok: false, detail: error.message });
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(file) {
  return fs.readFileSync(abs(file), 'utf8');
}

function loadGlobalScript(file, globalKey) {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(read(file), sandbox, { filename: file });
  return sandbox.window[globalKey];
}

// 1 + 2. Curriculum và toàn bộ bài học
const curriculum = await import(pathToFileURL(abs('data/curriculum.js')).href);
const lessons = curriculum.getFlatLessons();
const lessonIds = new Set(lessons.map((lesson) => lesson.id));
const lessonFiles = fs
  .readdirSync(abs('data/lessons'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => file.replace(/\.js$/, ''));

const loadedLessons = new Map();

await check('Mục lục curriculum', () => {
  assert(lessons.length > 0, 'getFlatLessons() trả về rỗng');
  assert(
    curriculum.COURSE_META.totalLessons === lessons.length,
    `COURSE_META.totalLessons = ${curriculum.COURSE_META.totalLessons} nhưng có ${lessons.length} bài`
  );
  assert(lessonIds.size === lessons.length, 'Có id bài học bị trùng trong curriculum');
  const missing = lessons.map((l) => l.id).filter((id) => !lessonFiles.includes(id));
  assert(missing.length === 0, `Thiếu file bài học: ${missing.slice(0, 5).join(', ')}`);
  const orphan = lessonFiles.filter((id) => !lessonIds.has(id));
  assert(orphan.length === 0, `File bài học không có trong curriculum: ${orphan.slice(0, 5).join(', ')}`);
  return `${lessons.length} bài / ${curriculum.COURSES.length} học phần / ${lessonFiles.length} file`;
});

await check('Nạp bài học', async () => {
  const broken = [];
  for (const lesson of lessons) {
    const mod = await import(pathToFileURL(abs(`data/lessons/${lesson.id}.js`)).href);
    const data = mod.default;
    loadedLessons.set(lesson.id, data);
    if (!data || data.id !== lesson.id || !data.title || !Array.isArray(data.sections) || !data.summary) {
      broken.push(lesson.id);
    }
  }
  assert(broken.length === 0, `Bài học lỗi cấu trúc: ${broken.slice(0, 5).join(', ')}`);
  return `${loadedLessons.size}/${lessons.length} bài hợp lệ`;
});

// 3. Dữ liệu chuyên đề
function loadParts(folder, prefix) {
  const files = fs
    .readdirSync(abs(folder))
    .filter((file) => /^level\d+\.js$/.test(file))
    .sort();
  assert(files.length > 0, `Không có file level*.js trong ${folder}`);
  const parts = files.map((file) => {
    const data = loadGlobalScript(`${folder}/${file}`, `${prefix}_LEVEL${file.match(/\d+/)[0]}_DATA`);
    assert(data && Array.isArray(data.lessons), `${folder}/${file} thiếu mảng lessons`);
    return { file, part: data };
  });
  return parts;
}

await check('Dữ liệu GitHub', () => {
  const parts = loadParts('data/github', 'GH');
  const ids = parts.flatMap(({ part }) => part.lessons.map((lesson) => lesson.id));
  assert(new Set(ids).size === ids.length, 'Có id bài GitHub bị trùng');
  const reference = loadGlobalScript('data/github/level3.js', 'GH_REFERENCE_DATA');
  const refCount = reference && Array.isArray(reference.lessons) ? reference.lessons.length : 0;
  return `${parts.length} cấp / ${ids.length} bài + ${refCount} bài tra cứu`;
});

await check('Dữ liệu Linux', () => {
  const parts = loadParts('data/linux', 'LX');
  const ids = parts.flatMap(({ part }) => part.lessons.map((lesson) => lesson.id));
  assert(new Set(ids).size === ids.length, 'Có id bài Linux bị trùng');
  return `${parts.length} cấp / ${ids.length} bài`;
});

await check('Dữ liệu Networking', () => {
  const allFiles = fs.readdirSync(abs('data/network'));

  // 1. Học phần I: Networking Cơ Bản (basic-mod*.js)
  const basicFiles = allFiles
    .filter((file) => /^basic-mod\d+\.js$/.test(file))
    .sort((a, b) => {
      const na = parseInt(a.match(/basic-mod(\d+)\.js/)[1], 10);
      const nb = parseInt(b.match(/basic-mod(\d+)\.js/)[1], 10);
      return na - nb;
    });

  const basicParts = basicFiles.map((file) => {
    const num = file.match(/basic-mod(\d+)\.js/)[1];
    const data = loadGlobalScript(`data/network/${file}`, `NET_BASIC_MOD${num}_DATA`);
    assert(data && Array.isArray(data.lessons), `data/network/${file} thiếu mảng lessons`);
    return { file, part: data };
  });

  // 2. Học phần II: Networking Chuyên Sâu (phase*.js)
  const phaseFiles = allFiles
    .filter((file) => /^phase[\da-z]+\.js$/.test(file))
    .sort((a, b) => {
      const getOrder = (f) => {
        const m = f.match(/phase(\d+)([a-z]?)\.js/);
        return parseInt(m[1]) * 10 + (m[2] ? m[2].charCodeAt(0) - 96 : 0);
      };
      return getOrder(a) - getOrder(b);
    });
  assert(phaseFiles.length > 0, 'Không có file phase*.js trong data/network');
  const phaseParts = phaseFiles.map((file) => {
    const key = file.replace(/^phase|\.js$/g, '').toUpperCase();
    const data = loadGlobalScript(`data/network/${file}`, `NET_PHASE${key}_DATA`);
    assert(data && Array.isArray(data.lessons), `data/network/${file} thiếu mảng lessons`);
    return { file, part: data };
  });

  const allParts = [...basicParts, ...phaseParts];
  const ids = allParts.flatMap(({ part }) => part.lessons.map((lesson) => lesson.id));
  assert(new Set(ids).size === ids.length, 'Có id bài Networking bị trùng');

  // Kiểm chứng chuẩn UI/UX & Schema cho toàn bộ bài học Networking (theo rules/05-quy-chuan-uiux-bai-hoc.md)
  const forbiddenClasses = ['net-arch-diagram', 'net-arch-badge', 'code-block'];
  for (const { file, part } of allParts) {
    for (const lesson of part.lessons) {
      const tag = `${file}#${lesson.id || 'unknown'}`;
      assert(lesson.id && lesson.number && lesson.title, `${tag}: thiếu id/number/title`);
      assert(Array.isArray(lesson.sections) && lesson.sections.length >= 1, `${tag}: thiếu sections`);
      assert(Array.isArray(lesson.summary) && lesson.summary.length >= 1, `${tag}: thiếu summary`);

      const secIds = lesson.sections.map((s) => s.id).filter(Boolean);
      assert(secIds.length === lesson.sections.length, `${tag}: có section thiếu id`);
      assert(new Set(secIds).size === secIds.length, `${tag}: bị trùng section.id`);

      const htmlBlob = [
        lesson.intuition?.visualHtml || '',
        ...lesson.sections.map((s) => s.content || '')
      ].join('\n');
      assert(!/<script\b/i.test(htmlBlob), `${tag}: cấm nhúng thẻ <script> trong nội dung bài học`);
      for (const badCls of forbiddenClasses) {
        assert(!htmlBlob.includes(badCls), `${tag}: dùng class không tồn tại '.${badCls}' (xem rules/05)`);
      }
    }
  }

  // Kiểm chứng các bài học đã biên soạn hoàn chỉnh ở Học phần II (phase*.js có > 1 section)
  let fullHp2Count = 0;
  for (const { file, part } of phaseParts) {
    for (const lesson of part.lessons) {
      if (lesson.sections.length <= 1 && !lesson.intuition) continue; // Bài khung chờ triển khai
      fullHp2Count += 1;
      const tag = `${file}#${lesson.id}`;
      assert(Array.isArray(lesson.objectives) && lesson.objectives.length >= 3, `${tag}: thiếu objectives`);
      assert(
        lesson.intuition &&
          typeof lesson.intuition.visualHtml === 'string' &&
          lesson.intuition.visualHtml.includes('net-arch-box'),
        `${tag}: intuition.visualHtml phải dùng .net-arch-box`
      );
      assert(Array.isArray(lesson.exercises) && lesson.exercises.length >= 3, `${tag}: thiếu exercises`);
      assert(lesson.summary.length >= 5, `${tag}: summary phải đủ 5 dòng`);
    }
  }

  // Kiểm chứng nghiêm ngặt khuôn mẫu 9 phần UI/UX riêng cho Học phần I (basic-mod*.js)
  for (const { file, part } of basicParts) {
    for (const lesson of part.lessons) {
      const tag = `${file}#${lesson.id}`;
      assert(
        lesson.intuition &&
          lesson.intuition.title &&
          (lesson.intuition.metaphor || lesson.intuition.analogy) &&
          lesson.intuition.boundary &&
          typeof lesson.intuition.visualHtml === 'string' &&
          lesson.intuition.visualHtml.includes('net-arch-box'),
        `${tag}: intuition phải đủ title, metaphor, boundary và visualHtml (.net-arch-box)`
      );
      assert(
        !lesson.pitfalls && !lesson.tips && !lesson.diagram,
        `${tag}: không đặt pitfalls/tips/diagram ở cấp cao nhất (phải lồng trong callouts)`
      );
      assert(
        lesson.callouts &&
          Array.isArray(lesson.callouts.pitfalls) &&
          lesson.callouts.pitfalls.length >= 2 &&
          Array.isArray(lesson.callouts.tips) &&
          lesson.callouts.tips.length >= 1,
        `${tag}: callouts phải có đủ mảng pitfalls và tips`
      );
      assert(
        Array.isArray(lesson.exercises) && lesson.exercises.length >= 3,
        `${tag}: phải có tối thiểu 3 bài tập tự luyện (exercises)`
      );
      for (const ex of lesson.exercises) {
        assert(
          ex.title && ex.level && ex.problem && (ex.solutionCode || ex.solution) && ex.explanation,
          `${tag}: bài tập '${ex.title || ''}' thiếu trường bắt buộc (title/level/problem/solutionCode/explanation)`
        );
      }
      assert(lesson.summary.length >= 5, `${tag}: summary phải đủ 5 dòng tóm tắt`);
      assert(
        Array.isArray(lesson.selfReviewQuestions) && lesson.selfReviewQuestions.length >= 3,
        `${tag}: thiếu selfReviewQuestions`
      );
      assert(
        lesson.reflectionQuestion && lesson.nextLessonPreview,
        `${tag}: thiếu reflectionQuestion hoặc nextLessonPreview ở cấp bài học`
      );
      const secHtml = lesson.sections.map((s) => s.content || '').join('\n');
      assert(
        !secHtml.includes('net-reflection-box') && !secHtml.includes('net-next-bridge-card'),
        `${tag}: không viết cứng net-reflection-box / net-next-bridge-card trong sections[].content`
      );
    }
  }

  const basicLessonCount = basicParts.flatMap(({ part }) => part.lessons).length;
  const phaseLessonCount = phaseParts.flatMap(({ part }) => part.lessons).length;
  if (basicParts.length > 0) {
    return `HP1: ${basicParts.length} module (${basicLessonCount} bài) + HP2: ${phaseParts.length} giai đoạn (${phaseLessonCount} bài)`;
  }
  return `${phaseParts.length} giai đoạn / ${phaseLessonCount} bài`;
});

// 4. Đường dẫn nội bộ
const brokenRefs = [];
let refCount = 0;

function checkRef(fromFile, target) {
  refCount += 1;
  const resolved = path.resolve(path.dirname(abs(fromFile)), target);
  if (!fs.existsSync(resolved)) brokenRefs.push(`${fromFile} → ${target}`);
}

const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
for (const file of htmlFiles) {
  const html = read(file);
  for (const match of html.matchAll(/(?:href|src)="(\.\/[^"#?]+)"/g)) {
    checkRef(file, match[1]);
  }
}

const scriptFiles = [
  ...fs.readdirSync(abs('js')).filter((f) => f.endsWith('.js')).map((f) => `js/${f}`),
  ...fs.readdirSync(abs('data')).filter((f) => f.endsWith('.js')).map((f) => `data/${f}`)
];

for (const file of scriptFiles) {
  const source = read(file);
  for (const match of source.matchAll(/from\s+'(\.\.?\/[^']+)'/g)) {
    checkRef(file, match[1]);
  }
  for (const match of source.matchAll(/import\(\s*`([^`]+)`/g)) {
    const dynamic = match[1];
    const directory = dynamic.split('${')[0];
    checkRef(file, directory);
  }
}

await check('Đường dẫn nội bộ', () => {
  assert(brokenRefs.length === 0, `Hỏng ${brokenRefs.length} tham chiếu: ${brokenRefs.slice(0, 5).join(' | ')}`);
  return `${refCount} tham chiếu trong ${scriptFiles.length} file JS + ${htmlFiles.length} file HTML`;
});

// 5. Bundle cho chế độ file://
await check('Bundle file://', () => {
  const bundle = read('js/file-fallback.js');
  const keys = [...bundle.matchAll(/__PRELOADED_LESSONS__\['([^']+)'\]/g)].map((m) => m[1]);
  const uniqueKeys = new Set(keys);
  assert(uniqueKeys.size > 0, 'Bundle không có bài học nào');
  const missing = [...lessonIds].filter((id) => !uniqueKeys.has(id));
  const extra = [...uniqueKeys].filter((id) => !lessonIds.has(id));
  assert(missing.length === 0, `Bundle thiếu: ${missing.slice(0, 5).join(', ')}`);
  assert(extra.length === 0, `Bundle thừa: ${extra.slice(0, 5).join(', ')}`);
  return `${uniqueKeys.size} bài, khớp curriculum`;
});

// Kết quả
console.log('\nKiểm tra toàn vẹn dự án\n' + '─'.repeat(64));
for (const { name, ok, detail } of results) {
  console.log(`${ok ? '✓' : '✗'} ${name.padEnd(22)} ${detail}`);
}
const failed = results.filter((r) => !r.ok);
console.log('─'.repeat(64));
console.log(`${results.length - failed.length}/${results.length} mục đạt`);
if (failed.length > 0) {
  console.log('\nKhông đạt: ' + failed.map((r) => r.name).join(', '));
  process.exit(1);
}
process.exit(0);
