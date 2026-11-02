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

await check('Dữ liệu Python Data', () => {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  ['group1-foundation.js', 'group2-wrangling.js', 'group3-analysis.js', 'group4-engineering.js'].forEach((file) => {
    vm.runInContext(read(`data/python-data/${file}`), sandbox, { filename: file });
  });
  const parts = [
    ...(sandbox.window.PYDATA_GROUP1_PARTS || []),
    ...(sandbox.window.PYDATA_GROUP2_PARTS || []),
    ...(sandbox.window.PYDATA_GROUP3_PARTS || []),
    ...(sandbox.window.PYDATA_GROUP4_PARTS || [])
  ];
  assert(parts.length === 13, `Cần đúng 13 Module nhưng có ${parts.length}`);
  const ids = parts.flatMap((p) => p.lessons.map((lesson) => lesson.id));
  assert(new Set(ids).size === ids.length, 'Có id bài Python Data bị trùng');
  assert(ids.length === 39, `Cần đúng 39 bài học nhưng có ${ids.length}`);
  return `${parts.length} module / ${ids.length} bài`;
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
