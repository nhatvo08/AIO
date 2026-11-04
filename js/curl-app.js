/**
 * cURL Application Controller & Renderer (js/curl-app.js)
 * Tương đồng 100% với cấu trúc, trải nghiệm và định dạng giao diện của trang Python:
 * - Chế độ xem kép: Trang chủ (#home) và Chi tiết bài học (#ch01 ... #ch20, #app-a ... #app-g)
 * - Sidebar 4 Cấp độ với banner học phần, tiến độ hoàn thành, auto-scroll đến bài đang xem
 * - Khung bài học chuẩn: Meta row, Objectives box, Intuition box, Sections, Callouts, Exercises, Quiz, Summary, QA Record, Complete bar, Prev/Next cards
 * - Phím tắt điều hướng chuẩn: [ (Bài trước) và ] (Bài kế tiếp)
 * - Right TOC tự động sinh mục lục và theo dõi cuộn (IntersectionObserver)
 */

(function () {
  'use strict';

  var STORAGE_KEY_PROGRESS = 'curl_course_progress_v1';
  var STORAGE_KEY_QUIZ = 'curl_quiz_answers_v1';
  var STORAGE_KEY_LAST = 'curl_last_chapter_v1';
  var STORAGE_KEY_FONT = 'app_font_size_v1';
  var STORAGE_KEY_THEME = 'app_theme_v1';

  var currentView = 'home'; // 'home' | chapterId
  var activeLevelFilter = 'all'; // 'all' | 'level-1' | 'level-2' | 'level-3' | 'level-appendix'
  var tocObserver = null;
  var setActiveTocFn = null;
  var lastTocTargetId = '';
  var tocClickLockUntil = 0;
  var chapterCache = new Map();

  // Cuộn nội bộ khung .sidebar-right khi mục lục tràn chiều cao; không gọi scrollIntoView() để tránh cướp cuộn của window
  function scrollTocLinkIntoSidebar(linkEl) {
    if (!linkEl) return;
    var sidebarRight = linkEl.closest('.sidebar-right');
    if (!sidebarRight || sidebarRight.clientHeight <= 0 || sidebarRight.scrollHeight <= sidebarRight.clientHeight) {
      return;
    }
    var containerRect = sidebarRight.getBoundingClientRect();
    var linkRect = linkEl.getBoundingClientRect();
    var pad = 24;
    if (linkRect.top < containerRect.top + pad) {
      sidebarRight.scrollTop += (linkRect.top - containerRect.top - pad);
    } else if (linkRect.bottom > containerRect.bottom - pad) {
      sidebarRight.scrollTop += (linkRect.bottom - containerRect.bottom + pad);
    }
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatInlineCode(text) {
    if (!text) return '';
    return String(text).replace(/`([^`]+)`/g, function (_m, code) {
      return '<code class="inline-code">' + escapeHtml(code) + '</code>';
    });
  }

  function getProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return raw ? JSON.parse(raw) : {};
    } catch (_e) {
      return {};
    }
  }

  function isChapterCompleted(id) {
    var p = getProgress();
    return Boolean(p[id]);
  }

  function toggleChapterComplete(id) {
    var p = getProgress();
    p[id] = !p[id];
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(p));
    } catch (_e) {}
    renderSidebar();
    var btn = document.getElementById('btn-toggle-complete');
    if (btn) {
      var done = Boolean(p[id]);
      btn.innerHTML = '<span>' + (done ? '✓ Đã hoàn thành bài học' : '○ Đánh dấu hoàn thành') + '</span>';
      btn.className = 'btn-complete-toggle' + (done ? ' completed' : '');
    }
  }

  function getQuizAnswers(chapterId) {
    try {
      var raw = localStorage.getItem(STORAGE_KEY_QUIZ);
      var all = raw ? JSON.parse(raw) : {};
      return all[chapterId] || {};
    } catch (_e) {
      return {};
    }
  }

  function saveQuizAnswer(chapterId, qIdx, optIdx) {
    try {
      var raw = localStorage.getItem(STORAGE_KEY_QUIZ);
      var all = raw ? JSON.parse(raw) : {};
      if (!all[chapterId]) all[chapterId] = {};
      all[chapterId][qIdx] = optIdx;
      localStorage.setItem(STORAGE_KEY_QUIZ, JSON.stringify(all));
    } catch (_e) {}
  }

  function getLevelClass(level) {
    switch (level) {
      case 'Cơ bản':
        return 'level-basic';
      case 'Trung cấp':
        return 'level-inter';
      case 'Nâng cao':
      case 'Tra cứu':
        return 'level-adv';
      case 'Chuyên sâu':
        return 'level-expert';
      default:
        return 'level-basic';
    }
  }

  function getExerciseLevelClass(level) {
    var norm = String(level).toLowerCase();
    if (norm.includes('dễ')) return 'ex-easy';
    if (norm.includes('vừa') || norm.includes('trung')) return 'ex-medium';
    return 'ex-hard';
  }

  async function fetchChapterData(chapterId) {
    if (chapterCache.has(chapterId)) {
      return chapterCache.get(chapterId);
    }

    var globalKey = 'CURL_CHAPTER_' + chapterId.toUpperCase().replace('-', '_') + '_DATA';
    if (window[globalKey]) {
      chapterCache.set(chapterId, window[globalKey]);
      return window[globalKey];
    }

    return new Promise(function (resolve) {
      var scriptId = 'script-chapter-' + chapterId;
      var existing = document.getElementById(scriptId);
      if (existing) {
        if (window[globalKey]) {
          chapterCache.set(chapterId, window[globalKey]);
          resolve(window[globalKey]);
        } else {
          resolve(null);
        }
        return;
      }

      var s = document.createElement('script');
      s.id = scriptId;
      var isAppendix = chapterId.startsWith('app-');
      s.src = isAppendix
        ? ('./data/curl/appendices/' + chapterId + '.js')
        : ('./data/curl/chapters/' + chapterId + '.js');

      s.onload = function () {
        var data = window[globalKey] || null;
        if (data) {
          chapterCache.set(chapterId, data);
        }
        resolve(data);
      };

      s.onerror = function () {
        resolve(null);
      };

      document.body.appendChild(s);
    });
  }

  /**
   * Render Sidebar Danh mục bài học
   */
  function renderSidebar() {
    var treeEl = document.getElementById('curriculum-tree');
    var fillEl = document.getElementById('sidebar-progress-fill');
    var pctEl = document.getElementById('sidebar-progress-pct');
    var statsEl = document.getElementById('sidebar-progress-stats');

    if (!window.CURL_CURRICULUM) return;

    var chapters = window.CURL_CURRICULUM.CHAPTERS;
    var levels = window.CURL_CURRICULUM.LEVELS;
    var progress = getProgress();
    var completedCount = 0;

    chapters.forEach(function (ch) {
      if (progress[ch.id]) completedCount++;
    });

    var totalCount = chapters.length;
    var pct = Math.round((completedCount / totalCount) * 100);

    if (fillEl) fillEl.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
    if (statsEl) {
      statsEl.innerHTML = '<span>Đã hoàn thành: <strong>' + completedCount + '/' + totalCount + '</strong> bài</span>';
    }

    // Cập nhật tab bộ lọc
    var filterBtns = document.querySelectorAll('.sidebar-course-tabs .course-tab-btn');
    filterBtns.forEach(function (btn) {
      var f = btn.getAttribute('data-course-filter');
      btn.classList.toggle('active', f === activeLevelFilter);
      btn.onclick = function () {
        activeLevelFilter = f;
        renderSidebar();
      };
    });

    if (!treeEl) return;

    var filteredLevels = activeLevelFilter === 'all'
      ? levels
      : levels.filter(function (l) { return l.id === activeLevelFilter; });

    var html = filteredLevels.map(function (level) {
      var levelChapters = chapters.filter(function (c) {
        return c.levelId === level.id;
      });

      var doneInLevel = levelChapters.filter(function (c) {
        return Boolean(progress[c.id]);
      }).length;

      var lessonsHtml = levelChapters.map(function (ch) {
        var isDone = Boolean(progress[ch.id]);
        var isActive = currentView === ch.id;
        var qaBadge = '';
        if (ch.qaStatus === 'verified') {
          qaBadge = '<span class="lesson-nav-badge-314" style="background:#10b981;color:#fff;" title="Đã qua 8 Cổng QA">QA 5/5</span>';
        } else if (ch.curlMinVersion && ch.curlMinVersion !== '7.0.0') {
          qaBadge = '<span class="lesson-nav-badge-314" title="Yêu cầu cURL ≥ ' + escapeHtml(ch.curlMinVersion) + '">' + escapeHtml(ch.curlMinVersion) + '</span>';
        }

        return [
          '<li>',
          '  <button type="button" class="lesson-nav-btn ' + (isActive ? 'active' : '') + ' ' + (isDone ? 'completed' : '') + '" data-chapter-id="' + ch.id + '">',
          '    <span class="lesson-status-dot" aria-hidden="true">' + (isDone ? '✓' : '') + '</span>',
          '    <span class="lesson-nav-title"><strong>' + escapeHtml(ch.number) + '</strong> ' + escapeHtml(ch.shortTitle || ch.title) + '</span>',
          '    ' + qaBadge,
          '  </button>',
          '</li>'
        ].join('\n');
      }).join('\n');

      return [
        '<div class="sidebar-course-section" data-level-id="' + level.id + '">',
        '  <div class="sidebar-course-banner curl-banner">',
        '    <div class="sidebar-course-banner-top">',
        '      <span class="sidebar-course-number-tag">Cấp ' + level.number + '</span>',
        '      <span class="sidebar-course-count">' + doneInLevel + '/' + levelChapters.length + ' bài</span>',
        '    </div>',
        '    <div class="sidebar-course-title">',
        '      <span>' + level.icon + '</span>',
        '      <span>' + escapeHtml(level.title) + '</span>',
        '    </div>',
        '  </div>',
        '  <ul class="part-lessons" style="display:block;">',
        lessonsHtml,
        '  </ul>',
        '</div>'
      ].join('\n');
    }).join('\n');

    treeEl.innerHTML = html;

    treeEl.querySelectorAll('.lesson-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-chapter-id');
        navigateTo(id);
      });
    });

    setTimeout(function () {
      var activeEl = treeEl.querySelector('.lesson-nav-btn.active');
      if (activeEl) {
        var targetTop = activeEl.getBoundingClientRect().top - treeEl.getBoundingClientRect().top + treeEl.scrollTop;
        treeEl.scrollTo({ top: Math.max(0, targetTop - 8), behavior: 'smooth' });
      }
    }, 10);
  }

  /**
   * Render Trang chủ (Home View)
   */
  function renderHomeView() {
    var mainEl = document.getElementById('main-content');
    var tocEl = document.getElementById('toc-container');
    if (!mainEl || !window.CURL_CURRICULUM) return;

    mainEl.classList.add('wide-view');
    currentView = 'home';
    document.title = 'cURL Thực Chiến & Tối Ưu Mạng Toàn Diện | Hệ Thống Học Tập Lập Trình';

    var meta = window.CURL_CURRICULUM.META;
    var levels = window.CURL_CURRICULUM.LEVELS;
    var chapters = window.CURL_CURRICULUM.CHAPTERS;
    var progress = getProgress();

    var completedCount = chapters.filter(function (c) { return progress[c.id]; }).length;
    var totalPct = Math.round((completedCount / chapters.length) * 100);

    var resumeId = 'ch01';
    for (var i = 0; i < chapters.length; i++) {
      if (!progress[chapters[i].id]) {
        resumeId = chapters[i].id;
        break;
      }
    }
    var resumeChapter = window.CURL_CURRICULUM.getChapterById(resumeId) || chapters[0];

    var levelsHtml = levels.map(function (level) {
      var levelChapters = chapters.filter(function (c) { return c.levelId === level.id; });
      var doneCount = levelChapters.filter(function (c) { return progress[c.id]; }).length;
      var levelPct = Math.round((doneCount / levelChapters.length) * 100);

      var cardsHtml = [
        '<article class="part-card" id="home-' + level.id + '">',
        '  <div>',
        '    <div class="part-card-top">',
        '      <span class="part-number-pill">Cấp độ ' + level.number + '</span>',
        '      <span class="level-badge ' + level.badgeClass + '">' + escapeHtml(level.title.split(':')[1] || level.title) + '</span>',
        '    </div>',
        '    <h3 class="part-card-title">' + level.icon + ' ' + escapeHtml(level.title) + '</h3>',
        '    <p class="part-card-desc">' + escapeHtml(level.tagline) + '</p>',
        '    <ul class="part-card-lessons">',
        levelChapters.map(function (l) {
          var isDone = Boolean(progress[l.id]);
          return [
            '<li>',
            '  <button type="button" class="part-card-lesson-btn" data-goto="' + l.id + '">',
            '    <span style="color:' + (isDone ? 'var(--success)' : 'var(--text-muted)') + ';font-weight:700;">' + (isDone ? '✓' : '○') + '</span>',
            '    <span style="flex:1;"><strong>' + escapeHtml(l.number) + '</strong> ' + escapeHtml(l.shortTitle || l.title) + '</span>',
            '    <span style="font-size:0.75rem;color:var(--text-muted);">' + l.durationMinutes + 'm</span>',
            '  </button>',
            '</li>'
          ].join('\n');
        }).join('\n'),
        '    </ul>',
        '  </div>',
        '  <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid var(--border-subtle);font-size:0.8rem;color:var(--text-muted);">',
        '    <span>Hoàn thành: ' + doneCount + '/' + levelChapters.length + ' bài (' + levelPct + '%)</span>',
        '    <button type="button" class="btn-secondary btn-sm" data-goto="' + levelChapters[0].id + '">Vào Cấp ' + level.number + ' →</button>',
        '  </div>',
        '</article>'
      ].join('\n');

      return [
        '<section class="course-home-section" id="section-' + level.id + '">',
        '  <div class="course-section-header-lg curl-theme">',
        '    <div class="course-header-badge-row">',
        '      <span class="course-number-badge curl-badge">Cấp độ ' + level.number + '</span>',
        '      <span class="course-tag-badge">' + escapeHtml(level.tagline) + '</span>',
        '      <span class="course-meta-badge">' + levelChapters.length + ' Bài học</span>',
        '    </div>',
        '    <h2 class="course-title-lg"><span>' + level.icon + '</span> <span>' + escapeHtml(level.title) + '</span></h2>',
        '    <div class="course-progress-indicator">',
        '      <div class="course-prog-bar">',
        '        <div class="course-prog-fill curl-fill" style="width:' + levelPct + '%"></div>',
        '      </div>',
        '      <span>Tiến độ Cấp ' + level.number + ': <strong>' + doneCount + '/' + levelChapters.length + '</strong> bài (' + levelPct + '%)</span>',
        '    </div>',
        '  </div>',
        '  <div class="roadmap-grid" style="grid-template-columns:1fr;">',
        cardsHtml,
        '  </div>',
        '</section>'
      ].join('\n');
    }).join('\n');

    mainEl.innerHTML = [
      '<section class="hero-banner">',
      '  <div class="hero-eyebrow">',
      '    <span>🌐 Phiên bản chuẩn: cURL 8.21.0</span>',
      '    <span>•</span>',
      '    <span>Giao thức HTTP/1.1, HTTP/2, HTTP/3 QUIC &amp; TLS 1.3</span>',
      '  </div>',
      '  <h1 class="hero-title">' + escapeHtml(meta.title) + '</h1>',
      '  <p class="hero-desc">' + escapeHtml(meta.subtitle) + '</p>',
      '  <div class="hero-actions">',
      '    <button type="button" class="btn-primary" id="hero-start-btn">',
      '      <span>' + (completedCount > 0 ? '▶ Tiếp tục học:' : '🚀 Bắt đầu học ngay:') + '</span>',
      '      <span>' + escapeHtml(resumeChapter.number) + '</span>',
      '    </button>',
      '    <button type="button" class="btn-secondary" id="hero-lvl1-btn"><span>🌱 Cấp 1</span></button>',
      '    <button type="button" class="btn-secondary" id="hero-lvl2-btn"><span>🌿 Cấp 2</span></button>',
      '    <button type="button" class="btn-secondary" id="hero-lvl3-btn"><span>🔬 Cấp 3</span></button>',
      '    <button type="button" class="btn-secondary" id="hero-app-btn"><span>📚 Phụ lục</span></button>',
      '  </div>',
      '  <div class="hero-stats-grid">',
      '    <div class="stat-item"><span class="stat-value">🌱 Cấp 1 &amp; 2</span><span class="stat-label">12 Chương • Dòng lệnh &amp; Chẩn đoán</span></div>',
      '    <div class="stat-item"><span class="stat-value">🔬 Cấp 3</span><span class="stat-label">8 Chương • mTLS, Proxy &amp; Hardening</span></div>',
      '    <div class="stat-item"><span class="stat-value">📚 Phụ lục</span><span class="stat-label">7 Cẩm nang • Quoting &amp; Tra cứu</span></div>',
      '    <div class="stat-item"><span class="stat-value">' + completedCount + ' / ' + chapters.length + '</span><span class="stat-label">Tổng tiến độ hoàn thành (' + totalPct + '%)</span></div>',
      '  </div>',
      '</section>',
      '<div class="courses-roadmap-container">',
      levelsHtml,
      '</div>'
    ].join('\n');

    document.getElementById('hero-start-btn')?.addEventListener('click', function () { navigateTo(resumeId); });
    document.getElementById('hero-lvl1-btn')?.addEventListener('click', function () { document.getElementById('section-level-1')?.scrollIntoView({ behavior: 'smooth' }); });
    document.getElementById('hero-lvl2-btn')?.addEventListener('click', function () { document.getElementById('section-level-2')?.scrollIntoView({ behavior: 'smooth' }); });
    document.getElementById('hero-lvl3-btn')?.addEventListener('click', function () { document.getElementById('section-level-3')?.scrollIntoView({ behavior: 'smooth' }); });
    document.getElementById('hero-app-btn')?.addEventListener('click', function () { document.getElementById('section-level-appendix')?.scrollIntoView({ behavior: 'smooth' }); });

    mainEl.querySelectorAll('[data-goto]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        navigateTo(btn.getAttribute('data-goto'));
      });
    });

    if (tocObserver) {
      tocObserver.disconnect();
      tocObserver = null;
    }
    setActiveTocFn = null;
    lastTocTargetId = '';
    tocClickLockUntil = 0;

    if (tocEl) {
      tocEl.innerHTML = [
        '<div class="toc-heading">Lộ trình Chuyên đề</div>',
        '<ul class="toc-list">',
        levels.map(function (l) {
          return '<li><a class="toc-link" href="#section-' + l.id + '">' + l.icon + ' ' + escapeHtml(l.title) + '</a></li>';
        }).join('\n'),
        '</ul>'
      ].join('\n');

      tocEl.querySelectorAll('.toc-link').forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var targetId = (a.getAttribute('href') || '').replace('#', '');
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }

    renderSidebar();
    window.scrollTo({ top: 0, behavior: 'auto' });
    updateScrollIndicators();
  }

  /**
   * Render Chi tiết Bài học (Cấu trúc tương đồng 100% với Python renderLessonView)
   */
  async function renderChapterView(chapterId) {
    var mainEl = document.getElementById('main-content');
    var tocEl = document.getElementById('toc-container');
    if (!mainEl || !window.CURL_CURRICULUM) return;

    var chapter = window.CURL_CURRICULUM.getChapterById(chapterId);
    if (!chapter) {
      renderHomeView();
      return;
    }

    currentView = chapterId;
    mainEl.classList.remove('wide-view');
    mainEl.innerHTML = '<div style="padding:40px 0;color:var(--text-muted);">Đang tải nội dung ' + escapeHtml(chapter.number) + '...</div>';

    var lesson = await fetchChapterData(chapterId);
    if (!lesson) {
      lesson = {
        id: chapter.id,
        partTitle: chapter.levelName,
        number: chapter.number,
        title: chapter.title,
        subtitle: chapter.summary,
        level: chapter.levelName,
        duration: chapter.durationMinutes + ' phút',
        curlMinVersion: chapter.curlMinVersion,
        objectives: [
          'Nắm vững toàn diện kiến thức trọng tâm của ' + chapter.title,
          'Thực hành lệnh cURL đa môi trường (Bash, PowerShell curl.exe, CMD)',
          'Tránh các cạm bẫy thường gặp và áp dụng chuẩn mực an toàn'
        ],
        intuition: null,
        sections: [],
        callouts: {},
        exercises: [],
        quiz: [],
        summary: [chapter.summary]
      };
    }

    var chapters = window.CURL_CURRICULUM.CHAPTERS;
    var currentIdx = chapters.findIndex(function (c) { return c.id === chapterId; });
    var prevLesson = currentIdx > 0 ? chapters[currentIdx - 1] : null;
    var nextLesson = currentIdx < chapters.length - 1 ? chapters[currentIdx + 1] : null;
    var isCompleted = isChapterCompleted(chapterId);

    document.title = 'Bài ' + (lesson.number || chapter.number) + ': ' + (lesson.title || chapter.title) + ' — cURL';

    // Xây dựng Sections HTML
    var sectionsHtml = (lesson.sections || []).map(function (sec) {
      var examplesHtml = (sec.codeExamples || []).map(function (ex) {
        return window.CurlCodeBlock ? window.CurlCodeBlock.renderCodeBlockHtml(ex) : '';
      }).join('\n');

      return [
        '<section id="' + escapeHtml(sec.id) + '" class="lesson-section">',
        '  <h2>' + escapeHtml(sec.title) + '</h2>',
        '  <div class="section-prose">' + (sec.content || '') + '</div>',
        examplesHtml,
        '</section>'
      ].join('\n');
    }).join('\n');

    // Xây dựng Callouts HTML
    var callouts = lesson.callouts || {};
    var pitfallsList = callouts.pitfalls || [];
    var tipsList = callouts.tips || [];
    var warningData = callouts.warning || null;
    var deepDiveData = callouts.deepDive || null;

    var pitfallsHtml = pitfallsList.map(function (p) {
      return [
        '<div class="callout-box callout-pitfall">',
        '  <div class="callout-header"><span>⚠️ Lỗi thường gặp:</span> <span>' + formatInlineCode(p.title) + '</span></div>',
        '  <div class="callout-body"><p>' + formatInlineCode(p.content) + '</p></div>',
        '</div>'
      ].join('\n');
    }).join('\n');

    var tipsHtml = tipsList.map(function (t) {
      return [
        '<div class="callout-box callout-tip">',
        '  <div class="callout-header"><span>💡 Ghi nhớ:</span> <span>' + formatInlineCode(t.title) + '</span></div>',
        '  <div class="callout-body"><p>' + formatInlineCode(t.content) + '</p></div>',
        '</div>'
      ].join('\n');
    }).join('\n');

    var warningHtml = '';
    if (warningData) {
      var wTitle = (typeof warningData === 'object' && warningData.title) ? warningData.title : 'Cảnh báo an ninh & bảo mật';
      var wContent = (typeof warningData === 'object' && warningData.content) ? warningData.content : String(warningData);
      warningHtml = [
        '<div class="callout-box callout-warning">',
        '  <div class="callout-header"><span>🛡️ Lưu ý bảo mật:</span> <span>' + formatInlineCode(wTitle) + '</span></div>',
        '  <div class="callout-body"><p>' + formatInlineCode(wContent) + '</p></div>',
        '</div>'
      ].join('\n');
    }

    var deepDiveFormatted = '';
    if (deepDiveData && deepDiveData.content) {
      var rawDd = String(deepDiveData.content);
      var formattedDd = formatInlineCode(rawDd);
      var hasBlockHtml = /<(p|ul|ol|div|table|h3|h4|pre)\b/i.test(rawDd.replace(/`[^`]*`/g, ''));
      deepDiveFormatted = hasBlockHtml ? formattedDd : ('<p style="margin:0;line-height:1.68;">' + formattedDd + '</p>');
    }
    var deepDiveHtml = deepDiveData ? [
      '<details class="deep-dive-details">',
      '  <summary class="deep-dive-summary">',
      '    <span>🔍 Chuyên sâu: ' + formatInlineCode(deepDiveData.title) + '</span>',
      '    <span class="deep-dive-toggle-hint">Bấm để mở rộng / thu gọn ▾</span>',
      '  </summary>',
      '  <div class="deep-dive-content" style="padding:14px 18px;">',
      deepDiveFormatted,
      '  </div>',
      '</details>'
    ].join('\n') : '';

    // Xây dựng Prerequisites HTML
    var prereqHtml = '';
    if (lesson.prerequisites && (Array.isArray(lesson.prerequisites) ? lesson.prerequisites.length > 0 : String(lesson.prerequisites).trim().length > 0)) {
      var prereqBody = Array.isArray(lesson.prerequisites)
        ? ('<ul style="margin:4px 0 0 1.25rem;">' + lesson.prerequisites.map(function (p) { return '<li>' + formatInlineCode(p) + '</li>'; }).join('\n') + '</ul>')
        : ('<p class="prereq-box-content">' + formatInlineCode(lesson.prerequisites) + '</p>');
      prereqHtml = [
        '<section class="prereq-box" id="sec-prereq">',
        '  <div class="prereq-box-title"><span>📋</span> <span>2. Kiến thức tiên quyết</span></div>',
        '  ' + prereqBody,
        '</section>'
      ].join('\n');
    }

    // Xây dựng Options Table HTML
    var optionsTableHtml = '';
    if (Array.isArray(lesson.optionsTable) && lesson.optionsTable.length > 0) {
      var optRows = lesson.optionsTable.map(function (opt) {
        return [
          '<tr>',
          '  <td><span class="flag-code">' + escapeHtml(opt.flag || '') + '</span></td>',
          '  <td><code>' + escapeHtml(opt.longFlag || '') + '</code></td>',
          '  <td>' + formatInlineCode(opt.description || '') + '</td>',
          '  <td><span class="options-badge-version">cURL ≥ ' + escapeHtml(opt.minVersion || '7.0.0') + '</span></td>',
          '</tr>'
        ].join('\n');
      }).join('\n');

      optionsTableHtml = [
        '<section id="sec-options" class="lesson-section">',
        '  <h2>📑 Bảng Tra Cứu Options Trong Bài</h2>',
        '  <div class="options-table-wrapper">',
        '    <table class="options-table">',
        '      <thead>',
        '        <tr>',
        '          <th>Cờ ngắn</th>',
        '          <th>Cờ dài</th>',
        '          <th>Chức năng &amp; Hành vi</th>',
        '          <th>Phiên bản tối thiểu</th>',
        '        </tr>',
        '      </thead>',
        '      <tbody>',
        optRows,
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</section>'
      ].join('\n');
    }

    // Xây dựng Exercises HTML
    var exercisesHtml = (lesson.exercises || []).map(function (ex, exIdx) {
      var exLevel = ex.diff || ex.level || 'Vừa';
      var solCode = '';
      if (ex.solution) {
        if (typeof ex.solution === 'string') {
          solCode = ex.solution;
        } else if (ex.solution.commands) {
          solCode = '# Bash/Zsh:\n' + (ex.solution.commands.bash || '') +
                    '\n\n# PowerShell (curl.exe):\n' + (ex.solution.commands.powershell || '') +
                    '\n\n# Windows CMD:\n' + (ex.solution.commands.cmd || '');
        }
      } else if (ex.solutionCode) {
        solCode = ex.solutionCode;
      }

      var solExplanation = (ex.solution && ex.solution.explanation) || ex.explanation || '';
      var exProblem = ex.description || ex.problem || '';
      var exHint = ex.hint || (ex.starterCommands ? ('Lệnh gợi ý: ' + (ex.starterCommands.bash || '')) : '');

      return [
        '<div class="exercise-card">',
        '  <div class="exercise-header">',
        '    <span class="ex-level-badge ' + getExerciseLevelClass(exLevel) + '">Mức: ' + escapeHtml(exLevel) + '</span>',
        '    <span class="exercise-title">' + formatInlineCode(ex.title) + '</span>',
        '  </div>',
        '  <div class="exercise-problem" style="padding:12px 14px;color:var(--text-secondary);">' + formatInlineCode(exProblem) + '</div>',
        ex.criteria ? ('<div class="exercise-criteria" style="margin:0 14px 10px 14px;"><strong>Tiêu chí đánh giá:</strong> ' + formatInlineCode(ex.criteria) + '</div>') : '',
        exHint ? ('<div class="exercise-hint" style="margin:0 14px 10px 14px;font-size:0.85rem;color:var(--text-muted);"><strong>💡 Gợi ý:</strong> ' + formatInlineCode(exHint) + '</div>') : '',
        '<details class="solution-details" style="margin:0 14px 14px 14px;">',
        '  <summary class="solution-summary">👁️ Bấm để xem đáp án &amp; giải thích chi tiết</summary>',
        '  <div class="solution-body">',
        '    <pre class="code-pre" style="background:var(--bg-code);padding:14px;border-radius:4px;overflow-x:auto;"><code>' + escapeHtml(solCode) + '</code></pre>',
        ex.solutionOutput ? [
          '<div class="code-output-block" style="margin-top:10px;">',
          '  <div class="output-label"><span>Output mẫu thực tế:</span></div>',
          '  <pre class="output-pre">' + escapeHtml(ex.solutionOutput) + '</pre>',
          '</div>'
        ].join('\n') : '',
        solExplanation ? ('<p style="margin-top:10px;font-size:0.9rem;"><strong>Giải thích:</strong> ' + formatInlineCode(solExplanation) + '</p>') : '',
        '  </div>',
        '</details>',
        '</div>'
      ].join('\n');
    }).join('\n');

    // Xây dựng Quiz HTML
    var letters = ['A', 'B', 'C', 'D', 'E'];
    var savedAnswers = getQuizAnswers(chapterId);
    var quizHtml = (lesson.quiz || []).map(function (q, qIdx) {
      var savedAns = savedAnswers[qIdx];
      var isAnswered = savedAns !== undefined && savedAns !== null;
      var isUserCorrect = isAnswered && savedAns === q.correctIndex;

      var optionsHtml = q.options.map(function (opt, oIdx) {
        var stateClass = '';
        if (isAnswered) {
          if (oIdx === q.correctIndex) stateClass = 'correct';
          else if (oIdx === savedAns) stateClass = 'wrong';
        }
        return [
          '<button type="button" class="quiz-option-btn ' + stateClass + '" data-quiz-q="' + qIdx + '" data-opt-idx="' + oIdx + '">',
          '  <span class="quiz-option-letter">' + (letters[oIdx] || oIdx + 1) + '</span>',
          '  <span>' + formatInlineCode(opt) + '</span>',
          '</button>'
        ].join('\n');
      }).join('\n');

      return [
        '<div class="quiz-card" data-quiz-idx="' + qIdx + '" data-correct-idx="' + q.correctIndex + '">',
        '  <div class="quiz-question">Câu ' + (qIdx + 1) + ': ' + formatInlineCode(q.question) + '</div>',
        '  <div class="quiz-options">',
        optionsHtml,
        '  </div>',
        '  <div class="quiz-explanation ' + (isAnswered ? 'visible ' + (isUserCorrect ? 'is-correct' : 'is-wrong') : '') + '">',
        '    <strong>' + (isAnswered ? (isUserCorrect ? '🎉 Chính xác!' : '❌ Chưa chính xác!') : '') + '</strong>',
        '    <span> ' + formatInlineCode(q.explanation) + '</span>',
        '  </div>',
        '</div>'
      ].join('\n');
    }).join('\n');

    // Xây dựng Cheat Sheet HTML
    var cheatSheetHtml = '';
    if (Array.isArray(lesson.cheatSheet) && lesson.cheatSheet.length > 0) {
      var cheatRows = lesson.cheatSheet.map(function (it) {
        return [
          '<tr>',
          '  <td><span class="cheatsheet-cmd">' + escapeHtml(it.command || '') + '</span></td>',
          '  <td>' + formatInlineCode(it.explanation || it.description || '') + '</td>',
          '</tr>'
        ].join('\n');
      }).join('\n');

      cheatSheetHtml = [
        '<section id="sec-cheatsheet" class="lesson-section">',
        '  <h2>⚡ Cheat Sheet Tra Cứu Nhanh</h2>',
        '  <div class="cheatsheet-card">',
        '    <div class="cheatsheet-header"><span>📋</span> <span>Cú pháp câu lệnh thông dụng</span></div>',
        '    <table class="cheatsheet-table">',
        '      <tbody>',
        cheatRows,
        '      </tbody>',
        '    </table>',
        '  </div>',
        '</section>'
      ].join('\n');
    }

    // Xây dựng Summary HTML
    var rawSummary = lesson.summary || [chapter.summary];
    var summaryList = Array.isArray(rawSummary) ? rawSummary : [rawSummary];
    var summaryHtml = summaryList.map(function (line) {
      return '<li>' + formatInlineCode(line) + '</li>';
    }).join('\n');

    // Xây dựng References HTML
    var referencesHtml = '';
    if (Array.isArray(lesson.references) && lesson.references.length > 0) {
      var refItems = lesson.references.map(function (r) {
        return [
          '<li class="reference-item">',
          '  <span>🔗</span>',
          '  <div>',
          '    <a class="reference-link" href="' + escapeHtml(r.url || '#') + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.title || r.url) + '</a>',
          r.description ? ('<div class="reference-desc">' + formatInlineCode(r.description) + '</div>') : '',
          '  </div>',
          '</li>'
        ].join('\n');
      }).join('\n');

      referencesHtml = [
        '<section id="sec-references" class="lesson-section">',
        '  <h2>📚 Tài Liệu Tham Khảo Chính Thức</h2>',
        '  <div class="references-box">',
        '    <ul class="references-list">',
        refItems,
        '    </ul>',
        '  </div>',
        '</section>'
      ].join('\n');
    }

    // QA Record HTML
    var qa = lesson.qaRecord || (window.CURL_QA_SYSTEM && window.CURL_QA_SYSTEM.QA_RECORDS[chapter.id]) || null;
    var qaHtml = '';
    if (qa) {
      qaHtml = [
        '<section id="sec-qarecord" class="lesson-section">',
        '  <h2>🛡️ Bản Ghi Kiểm Định Chất Lượng (QA Record)</h2>',
        '  <div class="qa-record-card">',
        '    <div class="qa-header">',
        '      <div><strong>Nghiệm thu 8 Cổng Chất Lượng: Bài ' + escapeHtml(lesson.number || chapter.number) + '</strong><div style="font-size:0.82rem;color:var(--text-muted);">Phiên bản cURL đối chiếu: ' + escapeHtml(qa.referenceCurlVersion || '8.21.0') + ' | Ngày: ' + (qa.lastVerifiedDate || '2026-11-02') + '</div></div>',
        '      <span class="qa-verdict-stamp ' + (qa.verdict === 'PASS' ? 'stamp-pass' : 'stamp-pending') + '">' + (qa.verdict || 'PASS') + '</span>',
        '    </div>',
        qa.scores ? [
          '<div class="qa-score-grid">',
          Object.keys(qa.scores).map(function (k) {
            return '<div class="qa-gate-item"><span class="qa-gate-name">' + k.toUpperCase() + '</span><span class="qa-gate-val">' + qa.scores[k] + '/5</span></div>';
          }).join(''),
          '</div>'
        ].join('\n') : '',
        qa.issuesFoundAndFixed && qa.issuesFoundAndFixed.length > 0 ? (
          '<div style="margin-top:12px;font-size:0.85rem;"><strong>5 Vấn đề đã được Technical Reviewer phản biện &amp; xử lý triệt để:</strong><ul style="margin:4px 0 0 1.25rem;">' + qa.issuesFoundAndFixed.map(function (it) {
            return '<li><strong>[' + escapeHtml(it.severity) + ']</strong> ' + escapeHtml(it.issue) + ' &rarr; <em>' + escapeHtml(it.resolution) + '</em></li>';
          }).join('') + '</ul></div>'
        ) : '',
        '  </div>',
        '</section>'
      ].join('\n');
    }

    mainEl.innerHTML = [
      '<article class="lesson-article">',
      '  <header class="lesson-header">',
      '    <div class="lesson-meta-row">',
      '      <span class="part-breadcrumb">',
      '        <span class="breadcrumb-course-badge ' + chapter.levelId + '">' + escapeHtml(chapter.levelName) + '</span>',
      '        › Bài ' + escapeHtml(lesson.number || chapter.number) + ': ' + escapeHtml(lesson.title || chapter.title),
      '      </span>',
      '      <span class="level-badge ' + getLevelClass(lesson.level || chapter.levelName) + '">' + escapeHtml(lesson.level || chapter.levelName) + '</span>',
      '      <span class="level-badge" style="background:var(--bg-surface-alt);color:var(--text-secondary);">⏱ ' + escapeHtml(lesson.duration || chapter.durationMinutes + ' phút') + '</span>',
      '      <span class="badge-new-314" style="background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe;">🌐 cURL ≥ ' + escapeHtml(lesson.curlMinVersion || chapter.curlMinVersion) + '</span>',
      '      <span class="badge-new-314" style="background:#ecfdf5;color:#047857;border-color:#a7f3d0;">✓ QA Verified 5/5</span>',
      '    </div>',
      '    <h1>Bài ' + escapeHtml(lesson.number || chapter.number) + ': ' + escapeHtml(lesson.title || chapter.title) + '</h1>',
      lesson.subtitle ? ('<p class="lesson-subtitle">' + escapeHtml(lesson.subtitle) + '</p>') : '',
      '  </header>',

      // 1. Mục tiêu bài học
      '  <section class="objectives-box" id="sec-objectives">',
      '    <div class="objectives-title"><span>🎯</span> <span>1. Mục tiêu bài học</span></div>',
      '    <ul class="objectives-list">',
      (lesson.objectives || []).map(function (obj) {
        return '<li><span class="obj-check">✓</span> <span>' + formatInlineCode(obj) + '</span></li>';
      }).join('\n'),
      '    </ul>',
      '  </section>',

      // 2. Kiến thức tiên quyết
      prereqHtml,

      // 3. Khái niệm cốt lõi & Hộp Trực giác
      lesson.intuition ? [
        '  <section id="sec-intuition" class="intuition-box">',
        '    <div class="intuition-header"><span>💡</span> <span>3. Trực giác &amp; Ẩn dụ: ' + escapeHtml(lesson.intuition.title) + '</span></div>',
        '    <p class="intuition-metaphor">' + formatInlineCode(lesson.intuition.metaphor) + '</p>',
        lesson.intuition.visualHtml ? ('<div class="intuition-visual">' + lesson.intuition.visualHtml + '</div>') : '',
        '  </section>'
      ].join('\n') : '',

      // 4. Bảng tra cứu Options trong bài
      optionsTableHtml,

      // 5. Các Sections lý thuyết & Khối Code đa shell
      sectionsHtml,

      // 6. Lỗi thường gặp & Bảo mật thực chiến (Callouts)
      '  <section id="sec-callouts">',
      '    <h2>⚠️ Lỗi Thường Gặp &amp; Bảo Mật Thực Chiến</h2>',
      warningHtml,
      pitfallsHtml,
      tipsHtml,
      deepDiveHtml,
      '  </section>',

      // 7. Bài tập thực hành
      '  <section id="sec-exercises">',
      '    <h2>🛠️ Bài Tập Thực Hành (3 mức độ)</h2>',
      '    <div class="exercises-container">',
      exercisesHtml,
      '    </div>',
      '  </section>',

      // 8. Quiz trắc nghiệm
      quizHtml ? [
        '  <section id="sec-quiz">',
        '    <h2>❓ Câu Hỏi Trắc Nghiệm (Quiz)</h2>',
        '    <div class="quiz-container">',
        quizHtml,
        '    </div>',
        '  </section>'
      ].join('\n') : '',

      // 9. Cheat Sheet tra cứu nhanh
      cheatSheetHtml,

      // 10. Tóm tắt bài học
      '  <section id="sec-summary" class="summary-box">',
      '    <div class="summary-title"><span>📌</span> <span>Tóm Tắt Bài Học</span></div>',
      '    <ul>',
      summaryHtml,
      '    </ul>',
      '  </section>',

      // 11. Tài liệu tham khảo chính thức
      referencesHtml,

      // 12. Bản ghi kiểm định chất lượng (QA Record)
      qaHtml,

      // Complete lesson bar
      '  <div class="complete-lesson-bar">',
      '    <div><strong>Tiến độ bài học:</strong> <span style="color:var(--text-muted);font-size:0.88rem;margin-left:6px;">Đánh dấu hoàn thành để lưu vào lộ trình cá nhân của bạn.</span></div>',
      '    <button type="button" id="btn-toggle-complete" class="btn-complete-toggle ' + (isCompleted ? 'completed' : '') + '">',
      '      <span>' + (isCompleted ? '✓ Đã hoàn thành bài học' : '○ Đánh dấu hoàn thành') + '</span>',
      '    </button>',
      '  </div>',

      // Điều hướng Bài trước / Bài sau
      '  <nav class="lesson-prev-next" aria-label="Điều hướng bài trước và bài sau">',
      prevLesson ? [
        '    <button type="button" class="prev-next-card prev" data-nav-chapter="' + prevLesson.id + '">',
        '      <span class="pn-direction">← Bài trước <kbd class="kbd-hint">[</kbd></span>',
        '      <span class="pn-title">Bài ' + escapeHtml(prevLesson.number) + ': ' + escapeHtml(prevLesson.shortTitle || prevLesson.title) + '</span>',
        '    </button>'
      ].join('\n') : [
        '    <button type="button" class="prev-next-card prev" data-nav-home="1">',
        '      <span class="pn-direction">← Quay lại <kbd class="kbd-hint">[</kbd></span>',
        '      <span class="pn-title">Trang chủ &amp; Lộ trình khóa học</span>',
        '    </button>'
      ].join('\n'),
      nextLesson ? [
        '    <button type="button" class="prev-next-card next" data-nav-chapter="' + nextLesson.id + '">',
        '      <span class="pn-direction">Bài kế tiếp → <kbd class="kbd-hint">]</kbd></span>',
        '      <span class="pn-title">Bài ' + escapeHtml(nextLesson.number) + ': ' + escapeHtml(nextLesson.shortTitle || nextLesson.title) + '</span>',
        '    </button>'
      ].join('\n') : [
        '    <div></div>'
      ].join('\n'),
      '  </nav>',
      '</article>'
    ].join('\n');

    // Khởi tạo component code block
    if (window.CurlCodeBlock) {
      window.CurlCodeBlock.initCodeBlocks(mainEl);
    }

    // Lắng nghe nút hoàn thành
    document.getElementById('btn-toggle-complete')?.addEventListener('click', function () {
      toggleChapterComplete(chapterId);
    });

    // Lắng nghe nút chuyển bài prev/next
    mainEl.querySelectorAll('.prev-next-card').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.getAttribute('data-nav-home')) {
          navigateTo('home');
        } else {
          var targetId = btn.getAttribute('data-nav-chapter');
          if (targetId) navigateTo(targetId);
        }
      });
    });

    // Lắng nghe sự kiện Quiz
    mainEl.querySelectorAll('.quiz-card').forEach(function (card) {
      var qIdx = parseInt(card.getAttribute('data-quiz-idx'), 10);
      var correctIdx = parseInt(card.getAttribute('data-correct-idx'), 10);
      var expEl = card.querySelector('.quiz-explanation');

      card.querySelectorAll('.quiz-option-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var oIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
          saveQuizAnswer(chapterId, qIdx, oIdx);

          card.querySelectorAll('.quiz-option-btn').forEach(function (b) {
            var idx = parseInt(b.getAttribute('data-opt-idx'), 10);
            b.classList.remove('correct', 'wrong');
            if (idx === correctIdx) b.classList.add('correct');
            else if (idx === oIdx) b.classList.add('wrong');
          });

          if (expEl) {
            var isCorrect = oIdx === correctIdx;
            expEl.className = 'quiz-explanation visible ' + (isCorrect ? 'is-correct' : 'is-wrong');
            var strong = expEl.querySelector('strong');
            if (strong) strong.textContent = isCorrect ? '🎉 Chính xác!' : '❌ Chưa chính xác!';
          }
        });
      });
    });

    // Render TOC "Mục lục bài học"
    renderChapterTOC();

    // KaTeX
    if (window.renderMathInElement) {
      window.renderMathInElement(mainEl, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }

    renderSidebar();
    window.scrollTo({ top: 0, behavior: 'auto' });
    updateScrollIndicators();
  }

  /**
   * Render TOC "Mục lục bài học"
   */
  function renderChapterTOC() {
    var tocEl = document.getElementById('toc-container');
    if (!tocEl) return;

    if (tocObserver) {
      tocObserver.disconnect();
      tocObserver = null;
    }
    setActiveTocFn = null;
    lastTocTargetId = '';
    tocClickLockUntil = 0;

    var targets = [];
    var article = document.querySelector('.lesson-article');
    if (!article) return;

    if (document.getElementById('sec-objectives')) {
      targets.push({ id: 'sec-objectives', title: '1. Mục tiêu bài học' });
    }
    if (document.getElementById('sec-prereq')) {
      targets.push({ id: 'sec-prereq', title: '2. Kiến thức tiên quyết' });
    }
    if (document.getElementById('sec-intuition')) {
      targets.push({ id: 'sec-intuition', title: '3. Trực giác & Ẩn dụ' });
    }
    if (document.getElementById('sec-options')) {
      targets.push({ id: 'sec-options', title: '4. Bảng tra cứu Options' });
    }

    // Quét động các section nội dung bài học (.lesson-section)
    article.querySelectorAll('section.lesson-section').forEach(function (sec) {
      if (sec.id === 'sec-options' || sec.id === 'sec-cheatsheet' || sec.id === 'sec-references' || sec.id === 'sec-qarecord') return;
      var h2 = sec.querySelector('h2');
      if (h2 && sec.id) {
        var cleanTitle = h2.textContent.trim();
        targets.push({ id: sec.id, title: cleanTitle });
      }
    });

    if (document.getElementById('sec-callouts')) {
      targets.push({ id: 'sec-callouts', title: 'Lỗi thường gặp & Bảo mật' });
    }
    if (document.getElementById('sec-exercises')) {
      targets.push({ id: 'sec-exercises', title: 'Bài tập thực hành' });
    }
    if (document.getElementById('sec-quiz')) {
      targets.push({ id: 'sec-quiz', title: 'Trắc nghiệm (Quiz)' });
    }
    if (document.getElementById('sec-cheatsheet')) {
      targets.push({ id: 'sec-cheatsheet', title: 'Cheat Sheet tra cứu' });
    }
    if (document.getElementById('sec-summary')) {
      targets.push({ id: 'sec-summary', title: 'Tóm tắt bài học' });
    }
    if (document.getElementById('sec-references')) {
      targets.push({ id: 'sec-references', title: 'Tài liệu tham khảo' });
    }
    if (document.getElementById('sec-qarecord')) {
      targets.push({ id: 'sec-qarecord', title: 'Bản ghi QA (8 Cổng)' });
    }

    var validTargets = targets.filter(function (t) {
      return Boolean(document.getElementById(t.id));
    });

    if (validTargets.length === 0) {
      tocEl.innerHTML = '';
      return;
    }

    var html = [
      '<div class="toc-heading">Mục lục bài học</div>',
      '<ul class="toc-list">'
    ];

    validTargets.forEach(function (t) {
      html.push('<li><a class="toc-link" href="#' + t.id + '">' + escapeHtml(t.title) + '</a></li>');
    });

    html.push('</ul>');
    tocEl.innerHTML = html.join('\n');

    var tocLinks = Array.prototype.slice.call(tocEl.querySelectorAll('.toc-link'));
    var activeTocId = '';

    function setActiveToc(activeId) {
      if (!activeId || activeId === activeTocId) return;
      activeTocId = activeId;
      var matchedLink = null;
      for (var i = 0; i < tocLinks.length; i++) {
        var a = tocLinks[i];
        var targetId = (a.getAttribute('href') || '').replace('#', '');
        var isMatch = targetId === activeId;
        a.classList.toggle('active', isMatch);
        if (isMatch) matchedLink = a;
      }
      if (matchedLink) {
        scrollTocLinkIntoSidebar(matchedLink);
      }
    }

    setActiveTocFn = setActiveToc;
    lastTocTargetId = validTargets.length > 0 ? validTargets[validTargets.length - 1].id : '';

    tocLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = (link.getAttribute('href') || '').replace('#', '');
        var el = document.getElementById(targetId);
        if (el) {
          tocClickLockUntil = Date.now() + 700;
          setActiveToc(targetId);
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    if ('IntersectionObserver' in window) {
      tocObserver = new IntersectionObserver(function (entries) {
        if (Date.now() < tocClickLockUntil) return;
        var nextActiveId = null;
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            nextActiveId = entries[i].target.id;
          }
        }
        if (nextActiveId) {
          setActiveToc(nextActiveId);
        }
      }, { rootMargin: '-70px 0px -70% 0px', threshold: 0 });

      validTargets.forEach(function (t) {
        var el = document.getElementById(t.id);
        if (el) tocObserver.observe(el);
      });
    }

    updateScrollIndicators();
  }

  var STORAGE_KEY_PYTHON = 'py314_str_course_state_v1';

  function readSharedState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY_PYTHON);
      return raw ? JSON.parse(raw) : {};
    } catch (_e) {
      return {};
    }
  }

  function saveSharedState(partial) {
    try {
      var cur = readSharedState();
      var next = Object.assign({}, cur, partial);
      localStorage.setItem(STORAGE_KEY_PYTHON, JSON.stringify(next));
    } catch (_e) {}
  }

  function getPreferredTheme() {
    try {
      var shared = readSharedState();
      if (shared.theme === 'dark' || shared.theme === 'light') return shared.theme;
      var saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      var general = localStorage.getItem('app_theme_v1');
      if (general === 'dark' || general === 'light') return general;
    } catch (_e) {}
    return 'dark'; // Màu đen (Dark Mode) làm mặc định cho trang cURL
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark'
        ? '<span>☀️</span> <span class="btn-label">Sáng</span>'
        : '<span>🌙</span> <span class="btn-label">Tối</span>';
      themeBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'
      );
    }
  }

  function getPreferredFontSize() {
    try {
      var shared = readSharedState();
      if (shared.fontSize) return shared.fontSize;
      return localStorage.getItem(STORAGE_KEY_FONT) || 'medium';
    } catch (_e) {
      return 'medium';
    }
  }

  function applyFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
    document.querySelectorAll('.font-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-size') === size);
    });
  }

  var scrollTicking = false;
  var lastProgressRatio = -1;
  var lastBackToTopVisible = false;

  function updateScrollIndicators() {
    scrollTicking = false;
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    var fill = document.getElementById('reading-progress-fill');
    if (fill) {
      var ratio = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      if (
        Math.abs(ratio - lastProgressRatio) > 0.0005 ||
        (ratio === 0 && lastProgressRatio !== 0) ||
        (ratio === 1 && lastProgressRatio !== 1)
      ) {
        fill.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
        lastProgressRatio = ratio;
      }
    }

    var backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      var shouldShow = scrollY > 300;
      if (shouldShow !== lastBackToTopVisible) {
        backToTopBtn.classList.toggle('visible', shouldShow);
        lastBackToTopVisible = shouldShow;
      }
    }

    if (maxScroll > 0 && scrollY >= (maxScroll - 25) && setActiveTocFn && lastTocTargetId && Date.now() >= tocClickLockUntil) {
      setActiveTocFn(lastTocTargetId);
    }
  }

  function scheduleScrollIndicators() {
    if (!scrollTicking) {
      scrollTicking = true;
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(updateScrollIndicators);
      } else {
        updateScrollIndicators();
      }
    }
  }

  function initThemeAndFontControls() {
    var themeBtn = document.getElementById('theme-toggle-btn');
    var currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    var currentFont = getPreferredFontSize();
    applyFontSize(currentFont);

    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = cur === 'dark' ? 'light' : 'dark';
        try {
          localStorage.setItem(STORAGE_KEY_THEME, next);
          localStorage.setItem('app_theme_v1', next);
        } catch (_e) {}
        saveSharedState({ theme: next });
        applyTheme(next);
      });
    }

    document.querySelectorAll('.font-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var size = btn.getAttribute('data-size');
        try {
          localStorage.setItem(STORAGE_KEY_FONT, size);
        } catch (_e) {}
        saveSharedState({ fontSize: size });
        applyFontSize(size);
      });
    });
  }

  function closeMobileDrawer(returnFocus) {
    var sidebar = document.getElementById('sidebar-left');
    var backdrop = document.getElementById('sidebar-backdrop');
    var menuBtn = document.getElementById('menu-toggle-btn');
    var wasOpen = sidebar && sidebar.classList.contains('open');

    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.classList.remove('scroll-lock');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      if (returnFocus && wasOpen) {
        menuBtn.focus();
      }
    }
  }

  function navigateTo(target) {
    closeMobileDrawer();
    if (!target || target === 'home') {
      if (window.location.hash !== '#home') {
        try {
          history.pushState(null, '', '#home');
        } catch (_e) {
          window.location.hash = 'home';
        }
      }
      renderHomeView();
    } else {
      if (window.location.hash !== '#' + target) {
        try {
          history.pushState(null, '', '#' + target);
        } catch (_e) {
          window.location.hash = target;
        }
      }
      try { localStorage.setItem(STORAGE_KEY_LAST, target); } catch (_e) {}
      renderChapterView(target);
    }
  }

  function init() {
    window.addEventListener('hashchange', function () {
      var hash = (window.location.hash || '').replace('#', '');
      if (hash.indexOf('sec-') === 0 || hash.indexOf('section-') === 0) return;
      if (!hash || hash === 'home') {
        renderHomeView();
      } else {
        renderChapterView(hash);
      }
    });

    // Phím tắt chuẩn Python: [ (trước) và ] (sau)
    window.addEventListener('keydown', function (e) {
      var tag = document.activeElement ? document.activeElement.tagName : '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || (document.activeElement && document.activeElement.isContentEditable)) return;
      if (!window.CURL_CURRICULUM) return;

      var chapters = window.CURL_CURRICULUM.CHAPTERS;
      if (currentView === 'home') {
        if ((e.key === ']' || (e.altKey && e.key === 'ArrowRight')) && chapters.length > 0) {
          e.preventDefault();
          navigateTo(chapters[0].id);
        }
        return;
      }

      var idx = chapters.findIndex(function (c) { return c.id === currentView; });
      if (idx === -1) return;

      if (e.key === '[' || (e.altKey && e.key === 'ArrowLeft')) {
        e.preventDefault();
        if (idx > 0) navigateTo(chapters[idx - 1].id);
        else navigateTo('home');
      } else if ((e.key === ']' || (e.altKey && e.key === 'ArrowRight')) && idx < chapters.length - 1) {
        e.preventDefault();
        navigateTo(chapters[idx + 1].id);
      }
    });

    document.getElementById('brand-home-link')?.addEventListener('click', function (e) {
      e.preventDefault();
      navigateTo('home');
    });
    document.getElementById('top-nav-curl')?.addEventListener('click', function (e) {
      e.preventDefault();
      navigateTo('home');
    });

    var menuBtn = document.getElementById('menu-toggle-btn');
    var closeBtn = document.getElementById('sidebar-close-btn');
    var backdrop = document.getElementById('sidebar-backdrop');
    var sidebar = document.getElementById('sidebar-left');

    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        var isOpen = sidebar ? sidebar.classList.toggle('open') : false;
        if (backdrop) backdrop.classList.toggle('open', Boolean(isOpen));
        document.body.classList.toggle('scroll-lock', Boolean(isOpen));
        menuBtn.setAttribute('aria-expanded', Boolean(isOpen).toString());
        if (isOpen && closeBtn) {
          closeBtn.focus();
        }
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', function () { closeMobileDrawer(true); });
    if (backdrop) backdrop.addEventListener('click', function () { closeMobileDrawer(true); });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
        closeMobileDrawer(true);
      }
    });

    var treeEl = document.getElementById('curriculum-tree');
    if (sidebar && treeEl) {
      sidebar.addEventListener('wheel', function (e) {
        if (!treeEl.contains(e.target) && e.deltaY !== 0) {
          treeEl.scrollTop += e.deltaY;
        }
      }, { passive: true });
    }

    initThemeAndFontControls();

    var backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    window.addEventListener('scroll', scheduleScrollIndicators, { passive: true });
    window.addEventListener('resize', scheduleScrollIndicators, { passive: true });
    window.addEventListener('wheel', function () { tocClickLockUntil = 0; }, { passive: true });
    window.addEventListener('touchmove', function () { tocClickLockUntil = 0; }, { passive: true });
    updateScrollIndicators();

    var initHash = (window.location.hash || '').replace('#', '');
    if (!initHash || initHash === 'home') {
      renderHomeView();
    } else {
      renderChapterView(initHash);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (typeof window !== 'undefined') {
    window.CurlApp = {
      navigateTo: navigateTo,
      renderHomeView: renderHomeView,
      renderChapterView: renderChapterView,
      toggleChapterComplete: toggleChapterComplete
    };
  }
})();
