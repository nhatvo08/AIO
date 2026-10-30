/**
 * GitHub Course Application Controller & Configuration
 * Sử dụng TopicEngine dùng chung, tối giản mã lặp, chạy được cả trên file:// và HTTP
 */

(function () {
  'use strict';

  var PARTS = [];
  if (window.GH_LEVEL1_DATA) PARTS.push(window.GH_LEVEL1_DATA);
  if (window.GH_LEVEL2_DATA) PARTS.push(window.GH_LEVEL2_DATA);
  if (window.GH_LEVEL3_DATA) PARTS.push(window.GH_LEVEL3_DATA);

  window.TopicEngine.createApp({
    topicId: 'github',
    topicPrefix: 'gh',
    topicTitle: 'Git & GitHub Thực chiến',
    storageKey: 'py314_gh_course_state_v1',
    parts: PARTS,
    referenceData: window.GH_REFERENCE_DATA,
    partIcons: {
      'part-gh-1': '🌱',
      'part-gh-2': '🌿',
      'part-gh-3': '🚀',
      'part-gh-ref': '📚'
    },
    hero: {
      eyebrow: '<span>🐙 Chuyên đề Kỹ thuật Phần mềm</span> <span>•</span> <span>Bổ trợ Toàn diện cho Lập trình viên Python</span>',
      title: 'Làm chủ Git &amp; GitHub từ Bản chất đến Chuyên sâu',
      desc: 'Hệ thống hóa toàn bộ kiến thức kiểm soát phiên bản: từ chu trình commit, phân nhánh feature branch, xử lý conflict, pull request, rebase, reflog đến tự động hóa CI/CD với GitHub Actions — gắn liền với các tình huống dự án Python thực tế.',
      buttons: [
        { id: 'hero-cheatsheet-btn', text: '📋 Bảng tra cứu Cheat Sheet', target: 'gh-ref-cheatsheet' },
        { id: 'hero-glossary-btn', text: '📖 Bảng thuật ngữ Glossary', target: 'gh-ref-glossary' }
      ],
      stats: [
        { value: '3 Cấp độ', label: 'Cơ bản • Trung cấp • Chuyên sâu' },
        { value: '18 Bài + 2 PL', label: 'Bao quát 100% lệnh thực chiến' }
      ],
      roadmapTitle: 'Lộ trình 3 Cấp độ &amp; Tài liệu Tra cứu'
    },
    topNavId: 'top-nav-github'
  });
})();
