/**
 * cURL Quality Gate Verification Runner (tools/verify-curl.mjs)
 * Script kiểm tra toàn vẹn và thực thi tự động (Cổng 7) cho Chuyên đề cURL.
 *
 * Cách chạy:
 *   node tools/verify-curl.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { startMockServer, stopMockServer } from './curl-mock-server.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const results = [];

function check(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then((detail) => {
      results.push({ name, ok: true, detail });
    })
    .catch((err) => {
      results.push({ name, ok: false, detail: err.message });
    });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function loadScript(relPath, globalKey) {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(read(relPath), sandbox, { filename: relPath });
  return sandbox.window[globalKey];
}

function execCommand(cmd, args) {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, { shell: true });
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    proc.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });
    proc.on('error', (err) => {
      resolve({ code: -1, stdout: '', stderr: err.message });
    });
  });
}

async function runAllChecks() {
  console.log('\n================================================================');
  console.log('KIỂM ĐỊNH TOÀN DIỆN CHUYÊN ĐỀ cURL (QUALITY GATE AUDIT)');
  console.log('================================================================');

  // 1. Kiểm tra Version Matrix
  await check('Version Matrix DB', () => {
    const matrix = loadScript('data/curl/version-matrix.js', 'CURL_VERSION_MATRIX');
    assert(matrix && typeof matrix === 'object', 'Không nạp được CURL_VERSION_MATRIX');
    const flags = Object.keys(matrix);
    assert(flags.includes('--json'), 'Thiếu cờ --json trong version matrix');
    assert(flags.includes('--fail-with-body'), 'Thiếu cờ --fail-with-body');
    assert(flags.includes('--insecure'), 'Thiếu cờ cảnh báo --insecure');
    return `${flags.length} cờ option được định nghĩa`;
  });

  // 2. Kiểm tra Mục lục Curriculum
  await check('Curriculum & Cấu trúc', () => {
    const curr = loadScript('data/curl/curriculum.js', 'CURL_CURRICULUM');
    assert(curr && Array.isArray(curr.CHAPTERS), 'Không nạp được CURL_CURRICULUM.CHAPTERS');
    assert(curr.CHAPTERS.length === 27, `Yêu cầu đúng 27 bài (20 chương + 7 phụ lục), hiện có ${curr.CHAPTERS.length}`);
    const uniqueIds = new Set(curr.CHAPTERS.map((c) => c.id));
    assert(uniqueIds.size === 27, 'Có ID chương bị trùng lặp');
    return `${curr.LEVELS.length} cấp độ / ${curr.CHAPTERS.length} chương & phụ lục`;
  });

  // 3. Kiểm tra QA System Records
  await check('QA System Registry', () => {
    const qa = loadScript('data/curl/qa-records.js', 'CURL_QA_SYSTEM');
    assert(qa && qa.QA_RECORDS, 'Không nạp được QA_RECORDS');
    const keys = Object.keys(qa.QA_RECORDS);
    assert(keys.length === 27, `QA Records cần đủ 27 mục, hiện có ${keys.length}`);
    return `Đã khởi tạo bản ghi cho 27/27 chương và phụ lục`;
  });

  // Helper kiểm tra cấu trúc 1 chương học
  function verifyChapterStructure(chData, chId, expectedGlobal) {
    assert(chData, `Không nạp được dữ liệu ${expectedGlobal}`);
    assert(chData.id === chId || (chData.meta && chData.meta.id === chId), `Metadata chương ${chId} không hợp lệ`);
    assert(Array.isArray(chData.objectives) && chData.objectives.length >= 3, `Chương ${chId} cần tối thiểu 3 mục tiêu học`);
    assert(chData.intuition && chData.intuition.metaphor, `Thiếu trực giác/ẩn dụ trong intuition (${chId})`);
    assert(Array.isArray(chData.sections) && chData.sections.length >= 2, `Thiếu sections bài học (${chId})`);
    
    // Thu thập code examples từ các section
    const allExamples = chData.sections.flatMap(s => s.codeExamples || []);
    assert(allExamples.length >= 2, `Chương ${chId} cần tối thiểu 2 ví dụ thực hành đa shell`);
    for (const ex of allExamples) {
      assert(ex.commands && ex.commands.bash && ex.commands.powershell && ex.commands.cmd, `Ví dụ "${ex.title}" (${chId}) thiếu tab lệnh đa shell`);
      assert(ex.realOutput && ex.realOutput.trim().length > 0, `Ví dụ "${ex.title}" (${chId}) thiếu realOutput`);
    }

    assert(chData.callouts && Array.isArray(chData.callouts.pitfalls) && chData.callouts.pitfalls.length >= 2, `Thiếu cạm bẫy thường gặp trong callouts (${chId})`);
    assert(chData.callouts && chData.callouts.warning && chData.callouts.warning.title && chData.callouts.warning.content, `Thiếu cảnh báo bảo mật hợp lệ (cần title và content) trong callouts (${chId})`);
    assert(Array.isArray(chData.exercises) && chData.exercises.length >= 3, `Thiếu bài tập thực hành (${chId}, cần >= 3 bài)`);
    assert(Array.isArray(chData.quiz) && chData.quiz.length >= 3, `Thiếu câu hỏi quiz trắc nghiệm (${chId}, cần >= 3 câu)`);
    assert(Array.isArray(chData.summary) && chData.summary.length >= 3, `Thiếu tóm tắt bài học (${chId})`);
    assert(chData.qaRecord && chData.qaRecord.verdict === 'PASS', `Chương ${chId} chưa có bản ghi QA Record PASS`);
    assert(chData.qaRecord.issuesFoundAndFixed.length >= 5, `Reviewer cần phát hiện tối thiểu 5 vấn đề phản biện (${chId})`);
    return `${chId.toUpperCase()} đủ cấu trúc chuẩn (${chData.objectives.length} Mục tiêu, ${chData.sections.length} Lớp, ${allExamples.length} Ví dụ, ${chData.exercises.length} Bài tập, ${chData.quiz.length} Quiz, QA PASS)`;
  }

  // 3b. Kiểm tra Toàn vẹn Dữ liệu Chương Đã Phát Hành (Ch.01, Ch.02, Ch.03)
  await check('Nạp Chương Đã Phát Hành (Ch.01)', () => {
    const ch01 = loadScript('data/curl/chapters/ch01.js', 'CURL_CHAPTER_CH01_DATA');
    return verifyChapterStructure(ch01, 'ch01', 'CURL_CHAPTER_CH01_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.02)', () => {
    const ch02 = loadScript('data/curl/chapters/ch02.js', 'CURL_CHAPTER_CH02_DATA');
    return verifyChapterStructure(ch02, 'ch02', 'CURL_CHAPTER_CH02_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.03)', () => {
    const ch03 = loadScript('data/curl/chapters/ch03.js', 'CURL_CHAPTER_CH03_DATA');
    return verifyChapterStructure(ch03, 'ch03', 'CURL_CHAPTER_CH03_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.04)', () => {
    const ch04 = loadScript('data/curl/chapters/ch04.js', 'CURL_CHAPTER_CH04_DATA');
    return verifyChapterStructure(ch04, 'ch04', 'CURL_CHAPTER_CH04_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.05)', () => {
    const ch05 = loadScript('data/curl/chapters/ch05.js', 'CURL_CHAPTER_CH05_DATA');
    return verifyChapterStructure(ch05, 'ch05', 'CURL_CHAPTER_CH05_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.06)', () => {
    const ch06 = loadScript('data/curl/chapters/ch06.js', 'CURL_CHAPTER_CH06_DATA');
    return verifyChapterStructure(ch06, 'ch06', 'CURL_CHAPTER_CH06_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.07)', () => {
    const ch07 = loadScript('data/curl/chapters/ch07.js', 'CURL_CHAPTER_CH07_DATA');
    return verifyChapterStructure(ch07, 'ch07', 'CURL_CHAPTER_CH07_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.08)', () => {
    const ch08 = loadScript('data/curl/chapters/ch08.js', 'CURL_CHAPTER_CH08_DATA');
    return verifyChapterStructure(ch08, 'ch08', 'CURL_CHAPTER_CH08_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.09)', () => {
    const ch09 = loadScript('data/curl/chapters/ch09.js', 'CURL_CHAPTER_CH09_DATA');
    return verifyChapterStructure(ch09, 'ch09', 'CURL_CHAPTER_CH09_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.10)', () => {
    const ch10 = loadScript('data/curl/chapters/ch10.js', 'CURL_CHAPTER_CH10_DATA');
    return verifyChapterStructure(ch10, 'ch10', 'CURL_CHAPTER_CH10_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.11)', () => {
    const ch11 = loadScript('data/curl/chapters/ch11.js', 'CURL_CHAPTER_CH11_DATA');
    return verifyChapterStructure(ch11, 'ch11', 'CURL_CHAPTER_CH11_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.12)', () => {
    const ch12 = loadScript('data/curl/chapters/ch12.js', 'CURL_CHAPTER_CH12_DATA');
    return verifyChapterStructure(ch12, 'ch12', 'CURL_CHAPTER_CH12_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.13)', () => {
    const ch13 = loadScript('data/curl/chapters/ch13.js', 'CURL_CHAPTER_CH13_DATA');
    return verifyChapterStructure(ch13, 'ch13', 'CURL_CHAPTER_CH13_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.14)', () => {
    const ch14 = loadScript('data/curl/chapters/ch14.js', 'CURL_CHAPTER_CH14_DATA');
    return verifyChapterStructure(ch14, 'ch14', 'CURL_CHAPTER_CH14_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.15)', () => {
    const ch15 = loadScript('data/curl/chapters/ch15.js', 'CURL_CHAPTER_CH15_DATA');
    return verifyChapterStructure(ch15, 'ch15', 'CURL_CHAPTER_CH15_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.16)', () => {
    const ch16 = loadScript('data/curl/chapters/ch16.js', 'CURL_CHAPTER_CH16_DATA');
    return verifyChapterStructure(ch16, 'ch16', 'CURL_CHAPTER_CH16_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.17)', () => {
    const ch17 = loadScript('data/curl/chapters/ch17.js', 'CURL_CHAPTER_CH17_DATA');
    return verifyChapterStructure(ch17, 'ch17', 'CURL_CHAPTER_CH17_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.18)', () => {
    const ch18 = loadScript('data/curl/chapters/ch18.js', 'CURL_CHAPTER_CH18_DATA');
    return verifyChapterStructure(ch18, 'ch18', 'CURL_CHAPTER_CH18_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.19)', () => {
    const ch19 = loadScript('data/curl/chapters/ch19.js', 'CURL_CHAPTER_CH19_DATA');
    return verifyChapterStructure(ch19, 'ch19', 'CURL_CHAPTER_CH19_DATA');
  });

  await check('Nạp Chương Đã Phát Hành (Ch.20)', () => {
    const ch20 = loadScript('data/curl/chapters/ch20.js', 'CURL_CHAPTER_CH20_DATA');
    return verifyChapterStructure(ch20, 'ch20', 'CURL_CHAPTER_CH20_DATA');
  });

  await check('Nạp Phụ Lục Đã Phát Hành (App-A)', () => {
    const appA = loadScript('data/curl/appendices/app-a.js', 'CURL_CHAPTER_APP_A_DATA');
    return verifyChapterStructure(appA, 'app-a', 'CURL_CHAPTER_APP_A_DATA');
  });

  await check('Nạp Phụ Lục Đã Phát Hành (App-B)', () => {
    const appB = loadScript('data/curl/appendices/app-b.js', 'CURL_CHAPTER_APP_B_DATA');
    return verifyChapterStructure(appB, 'app-b', 'CURL_CHAPTER_APP_B_DATA');
  });

  await check('Nạp Phụ Lục Đã Phát Hành (App-C)', () => {
    const appC = loadScript('data/curl/appendices/app-c.js', 'CURL_CHAPTER_APP_C_DATA');
    return verifyChapterStructure(appC, 'app-c', 'CURL_CHAPTER_APP_C_DATA');
  });

  await check('Nạp Phụ Lục Đã Phát Hành (App-D)', () => {
    const appD = loadScript('data/curl/appendices/app-d.js', 'CURL_CHAPTER_APP_D_DATA');
    return verifyChapterStructure(appD, 'app-d', 'CURL_CHAPTER_APP_D_DATA');
  });

  await check('Nạp Phụ Lục Đã Phát Hành (App-E)', () => {
    const appE = loadScript('data/curl/appendices/app-e.js', 'CURL_CHAPTER_APP_E_DATA');
    return verifyChapterStructure(appE, 'app-e', 'CURL_CHAPTER_APP_E_DATA');
  });

  await check('Nạp Phụ Lục Đã Phát Hành (App-F)', () => {
    const appF = loadScript('data/curl/appendices/app-f.js', 'CURL_CHAPTER_APP_F_DATA');
    return verifyChapterStructure(appF, 'app-f', 'CURL_CHAPTER_APP_F_DATA');
  });

  await check('Nạp Phụ Lục Đã Phát Hành (App-G)', () => {
    const appG = loadScript('data/curl/appendices/app-g.js', 'CURL_CHAPTER_APP_G_DATA');
    return verifyChapterStructure(appG, 'app-g', 'CURL_CHAPTER_APP_G_DATA');
  });

  // 4. Kiểm tra Tài nguyên Frontend
  await check('Tài nguyên Frontend curl.html', () => {
    assert(fs.existsSync(path.join(ROOT, 'curl.html')), 'Thiếu file curl.html');
    assert(fs.existsSync(path.join(ROOT, 'css/curl.css')), 'Thiếu file css/curl.css');
    assert(fs.existsSync(path.join(ROOT, 'js/curl-app.js')), 'Thiếu file js/curl-app.js');
    assert(fs.existsSync(path.join(ROOT, 'js/curl-codeblock.js')), 'Thiếu file js/curl-codeblock.js');

    const html = read('curl.html');
    assert(html.includes('href="./css/curl.css"'), 'curl.html chưa link css/curl.css');
    assert(html.includes('src="./js/curl-app.js"'), 'curl.html chưa link js/curl-app.js');
    return 'HTML/CSS/JS đồng bộ và đầy đủ';
  });

  // 5. Kiểm thử Tự động Cổng 7 qua Local Mock Server & curl.exe
  await check('Kiểm thử Cổng 7 (Local Mock Server)', async () => {
    const mockPort = 8799;
    await startMockServer(mockPort);

    try {
      // Test 1: GET Ping
      const resPing = await execCommand('curl.exe', ['-s', `http://127.0.0.1:${mockPort}/ping`]);
      assert(resPing.code === 0, `curl ping thất bại với mã ${resPing.code}`);
      assert(resPing.stdout.includes('"status":"ok"') || resPing.stdout.includes('"status": "ok"'), 'Output ping không khớp');

      // Test 2: Echo Method & Query
      const resEcho = await execCommand('curl.exe', ['-s', `http://127.0.0.1:${mockPort}/echo?course=curl`]);
      assert(resEcho.code === 0, 'curl echo thất bại');
      assert(resEcho.stdout.includes('"course": "curl"'), 'Không tìm thấy query trong echo output');

      // Test 3: Status 404 và --fail-with-body
      const resFailWithBody = await execCommand('curl.exe', ['-s', '--fail-with-body', `http://127.0.0.1:${mockPort}/status/404`]);
      assert(resFailWithBody.code === 22, `Cần trả về exit code 22 khi gặp 404, nhận được: ${resFailWithBody.code}`);
      assert(resFailWithBody.stdout.includes('404'), 'Body lỗi phải được in ra khi dùng --fail-with-body');

      // Test 4: ETag & 304 Not Modified
      const resEtag = await execCommand('curl.exe', ['-s', '-i', '-H', '"If-None-Match: \\"v1.4.2-mock-hash\\""', `http://127.0.0.1:${mockPort}/cache`]);
      assert(resEtag.stdout.includes('304 Not Modified') || resEtag.stdout.includes('304'), 'Phải nhận được HTTP 304 khi khớp ETag');

      return `Đã xác thực 4/4 kịch bản mạng với curl.exe và local mock`;
    } finally {
      await stopMockServer();
    }
  });

  // Báo cáo kết quả
  console.log('\nKẾT QUẢ KIỂM TRA:\n' + '─'.repeat(64));
  let hasFailed = false;
  for (const r of results) {
    const icon = r.ok ? '✓ PASS' : '✗ FAIL';
    console.log(`${icon.padEnd(8)} ${r.name.padEnd(30)} ${r.detail}`);
    if (!r.ok) hasFailed = true;
  }
  console.log('─'.repeat(64));

  if (hasFailed) {
    console.error('=> CÓ MỤC KHÔNG ĐẠT TIÊU CHÍ!');
    process.exit(1);
  } else {
    console.log(`=> TẤT CẢ ${results.length}/${results.length} HẠNG MỤC ĐẠT CHUẨN 100%!`);
    process.exit(0);
  }
}

runAllChecks();
