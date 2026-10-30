/**
 * Script sinh tự động file-fallback.js cho giao thức file://
 * Chạy bằng Node.js thuần, đa nền tảng (Windows, macOS, Linux), không cần PowerShell.
 *
 * Cách chạy:
 *   node tools/build-fallback.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fallbackPath = path.join(ROOT, 'js', 'file-fallback.js');
const lessonsDir = path.join(ROOT, 'data', 'lessons');

console.log('Đang tạo Fallback Bundle cho chế độ file://...');

function processModule(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  // Xóa các import ở đầu file (kể cả import nhiều dòng)
  let content = raw.replace(/^import\s+[\s\S]*?;\r?\n/gm, '');
  // Xóa từ khóa export
  content = content.replace(/^export\s+(const|let|var|function|class)\s+/gm, '$1 ');
  content = content.replace(/^export\s+default\s+/gm, '');
  return content.trim();
}

const chunks = [];
chunks.push('/**\n');
chunks.push(' * Auto-generated Fallback Bundle for direct file:// protocol opening\n');
chunks.push(' * When served via HTTP (npx serve / python -m http.server), native ES modules in ./js/app.js are used instead.\n');
chunks.push(' */\n');
chunks.push('(function() {\n');
chunks.push('  window.__PRELOADED_LESSONS__ = {};\n\n');

// 1. Quét và gói toàn bộ 209 bài học Python
const lessonFiles = fs
  .readdirSync(lessonsDir)
  .filter((f) => f.endsWith('.js'))
  .sort();

for (const file of lessonFiles) {
  const lessonId = file.replace(/\.js$/, '');
  const raw = fs.readFileSync(path.join(lessonsDir, file), 'utf8');
  const converted = raw.replace(/^export\s+default\s*\{/m, `window.__PRELOADED_LESSONS__['${lessonId}'] = {`);
  chunks.push(converted.trim());
  chunks.push('\n\n');
}

console.log(`Đã nạp ${lessonFiles.length} bài học từ data/lessons/`);

// 2. Nối các module lõi
const modules = [
  'data/curriculum.js',
  'data/methods.js',
  'js/storage.js',
  'js/highlighter.js',
  'js/widgets.js',
  'js/app.js'
];

for (const mod of modules) {
  chunks.push(`// --- Module: ${mod} ---\n`);
  chunks.push(processModule(path.join(ROOT, mod)));
  chunks.push('\n\n');
}

chunks.push('})();\n');

fs.writeFileSync(fallbackPath, chunks.join(''), 'utf8');
const stats = fs.statSync(fallbackPath);
console.log(`Đã sinh thành công js/file-fallback.js! Kích thước: ${(stats.size / 1024 / 1024).toFixed(2)} MB (${stats.size} bytes)\n`);
