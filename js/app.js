/**
 * Điều phối Ứng dụng Chính (Main Application Controller & Renderer)
 * Khóa học Chuyên sâu về Chuỗi (str) trong Python 3.14.8
 */

import {
  COURSE_META,
  COURSES,
  CURRICULUM,
  getFlatLessons,
  getCourseById,
  getCourseByLessonId
} from '../data/curriculum.js';
import {
  loadState,
  saveState,
  toggleLessonComplete,
  markLessonComplete,
  isLessonCompleted,
  saveQuizAnswer,
  getQuizAnswer,
  getPreferredTheme
} from './storage.js';
import { escapeHtml, highlightPythonCode, formatInlineCode } from './highlighter.js';
import { mountLessonWidget } from './widgets.js';

const lessonCache = new Map();
const flatLessons = getFlatLessons();
let currentView = 'home'; // 'home' | lessonId
let activeCourseFilter = 'all'; // 'all' | 'course-python' | 'course-str' | 'course-learning-python' | 'course-learning-python-part3'
let tocObserver = null;

/**
 * Tự động gọi KaTeX renderMathInElement cho một vùng chứa DOM cụ thể
 */
export function renderMathInContainer(container) {
  if (!container) return;
  const doRender = () => {
    if (typeof window !== 'undefined' && typeof window.renderMathInElement === 'function') {
      try {
        window.renderMathInElement(container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
          throwOnError: false
        });
      } catch (e) {
        console.warn('KaTeX render error:', e);
      }
    }
  };

  if (typeof window !== 'undefined' && typeof window.renderMathInElement === 'function') {
    doRender();
  } else if (typeof window !== 'undefined') {
    window.addEventListener('load', doRender, { once: true });
    setTimeout(doRender, 150);
    setTimeout(doRender, 500);
  }
}

/**
 * Tải dữ liệu bài học theo cơ chế Lazy Loading (chỉ tải bài đang xem)
 */
async function fetchLessonData(lessonId) {
  if (lessonCache.has(lessonId)) {
    return lessonCache.get(lessonId);
  }
  if (window.__PRELOADED_LESSONS__ && window.__PRELOADED_LESSONS__[lessonId]) {
    const data = window.__PRELOADED_LESSONS__[lessonId];
    lessonCache.set(lessonId, data);
    return data;
  }
  const mod = await import(`../data/lessons/${lessonId}.js`);
  const data = mod.default;
  lessonCache.set(lessonId, data);
  return data;
}

function getLevelClass(level) {
  switch (level) {
    case 'Cơ bản':
      return 'level-basic';
    case 'Trung cấp':
      return 'level-inter';
    case 'Nâng cao':
      return 'level-adv';
    case 'Chuyên sâu':
      return 'level-expert';
    default:
      return 'level-basic';
  }
}

function getExerciseLevelClass(level) {
  const norm = String(level).toLowerCase();
  if (norm.includes('dễ')) return 'ex-easy';
  if (norm.includes('vừa') || norm.includes('trung')) return 'ex-medium';
  return 'ex-hard';
}

/**
 * Render khối Ví dụ Code (có nút Copy, khối Output riêng, chú thích từng dòng)
 */
function renderCodeExampleCard(ex, idxKey) {
  const codeId = `code-raw-${idxKey}`;
  const hasAnnotations = Array.isArray(ex.annotations) && ex.annotations.length > 0;

  return `
    <div class="code-example-card">
      <div class="code-card-header">
        <div class="code-header-left">
          <span class="lang-tag">Python 3.14.8</span>
          <span>${escapeHtml(ex.title || 'Ví dụ minh họa')}</span>
        </div>
        <button type="button" class="copy-code-btn" data-copy-target="${codeId}" aria-label="Sao chép mã nguồn">
          <span>📋</span> <span class="copy-btn-text">Sao chép</span>
        </button>
      </div>
      <textarea id="${codeId}" style="display:none;" readonly>${escapeHtml(ex.code)}</textarea>
      <pre class="code-pre"><code>${highlightPythonCode(ex.code)}</code></pre>
      ${
        ex.output !== undefined && ex.output !== null
          ? `
        <div class="code-output-block">
          <div class="output-label">
            <span>Output (Đã kiểm chứng trên Python 3.14.8)</span>
          </div>
          <pre class="output-pre">${escapeHtml(ex.output)}</pre>
        </div>
      `
          : ''
      }
      ${
        hasAnnotations
          ? `
        <div class="code-annotations">
          <div class="annotations-title">Giải thích từng dòng quan trọng</div>
          <ul class="annotation-list">
            ${ex.annotations
              .map(
                (ann) => `
              <li class="annotation-item">
                <span class="ann-line-badge">Dòng ${escapeHtml(String(ann.line))}</span>
                <span>${formatInlineCode(ann.text)}</span>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      `
          : ''
      }
    </div>
  `;
}

/**
 * Cập nhật thanh tiến độ và cây mục lục bên trái theo 2 Học phần riêng biệt
 */
function renderSidebar() {
  const state = loadState();
  const completedSet = new Set(state.completedLessons);
  const completedCount = completedSet.size;
  const totalCount = flatLessons.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  const fillEl = document.getElementById('sidebar-progress-fill');
  const pctEl = document.getElementById('sidebar-progress-pct');
  const statsEl = document.getElementById('sidebar-progress-stats');
  const treeEl = document.getElementById('curriculum-tree');

  if (fillEl) fillEl.style.width = `${pct}%`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (statsEl) {
    statsEl.innerHTML = `<span>Đã hoàn thành: <strong>${completedCount}/${totalCount}</strong> bài</span>`;
  }

  // Cập nhật trạng thái các nút lọc Học phần
  const filterBtns = document.querySelectorAll('.course-tab-btn');
  filterBtns.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.courseFilter === activeCourseFilter);
    btn.onclick = () => {
      activeCourseFilter = btn.dataset.courseFilter;
      filterBtns.forEach((b) => b.classList.toggle('active', b === btn));
      renderSidebar();
    };
  });

  if (!treeEl) return;

  const filteredCourses =
    activeCourseFilter === 'all'
      ? COURSES
      : COURSES.filter((c) => c.id === activeCourseFilter);

  treeEl.innerHTML = filteredCourses
    .map((course) => {
      const isNumbers = course.id === 'course-python';
      const isLP = course.id === 'course-learning-python' || course.id === 'course-learning-python-part3';
      const courseDoneCount = course.parts.reduce(
        (sum, p) => sum + p.lessons.filter((l) => completedSet.has(l.id)).length,
        0
      );

      const partsHtml = course.parts
        .map((part) => {
          const partDoneCount = part.lessons.filter((l) => completedSet.has(l.id)).length;
          const groupLabelHtml = part.group
            ? `<div class="sidebar-part-group-label" style="padding:10px 14px 4px;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--accent-primary);border-top:1px solid var(--border-subtle);margin-top:6px;">${escapeHtml(part.group)}</div>`
            : '';
          const hasActiveLesson = part.lessons.some((l) => l.id === currentView);
          const isCollapsed = !hasActiveLesson;
          return `
            ${groupLabelHtml}
            <div class="part-group ${isCollapsed ? 'collapsed' : ''}" data-part="${part.id}">
              <button type="button" class="part-group-header" aria-expanded="${!isCollapsed}">
                <span>${escapeHtml(part.number)}: ${escapeHtml(part.title)} <small style="color:var(--text-muted);font-weight:500;">(${partDoneCount}/${part.lessons.length})</small></span>
                <span class="part-chevron">▾</span>
              </button>
              <ul class="part-lessons">
                ${part.lessons
                  .map((lesson) => {
                    const isDone = completedSet.has(lesson.id);
                    const isActive = currentView === lesson.id;
                    return `
                      <li>
                        <button
                          type="button"
                          class="lesson-nav-btn ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}"
                          data-lesson-id="${lesson.id}"
                        >
                          <span class="lesson-status-dot" aria-hidden="true">${isDone ? '✓' : ''}</span>
                          <span class="lesson-nav-title"><strong>${escapeHtml(lesson.number)}</strong> ${escapeHtml(lesson.title)}</span>
                          ${lesson.isNew314 ? `<span class="lesson-nav-badge-314" title="Điểm mới Python 3.14">3.14</span>` : ''}
                        </button>
                      </li>
                    `;
                  })
                  .join('')}
              </ul>
            </div>
          `;
        })
        .join('');

      return `
        <div class="sidebar-course-section" data-course-id="${course.id}">
          <div class="sidebar-course-banner ${isNumbers ? 'numbers-banner' : isLP ? 'lp-banner' : ''}">
            <div class="sidebar-course-banner-top">
              <span class="sidebar-course-number-tag">${escapeHtml(course.number)}</span>
              <span class="sidebar-course-count">${courseDoneCount}/${course.totalLessons} bài</span>
            </div>
            <div class="sidebar-course-title">
              <span>${course.icon}</span>
              <span>${escapeHtml(course.shortTitle)}</span>
            </div>
          </div>
          ${partsHtml}
        </div>
      `;
    })
    .join('');

  // Sự kiện thu gọn/mở rộng Phần và tự động cuộn lên đầu khi chọn mở
  treeEl.querySelectorAll('.part-group-header').forEach((headerBtn) => {
    headerBtn.addEventListener('click', () => {
      const group = headerBtn.closest('.part-group');
      const isCollapsed = group.classList.toggle('collapsed');
      headerBtn.setAttribute('aria-expanded', String(!isCollapsed));
      if (!isCollapsed) {
        setTimeout(() => {
          const targetTop = group.getBoundingClientRect().top - treeEl.getBoundingClientRect().top + treeEl.scrollTop;
          treeEl.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        }, 10);
      }
    });
  });

  // Sự kiện chuyển bài học
  treeEl.querySelectorAll('.lesson-nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigateToLesson(btn.dataset.lessonId);
    });
  });

  // Tự động cuộn đề mục bài học đang chọn lên đầu của Sidebar Trái
  setTimeout(() => {
    const activeEl = treeEl.querySelector('.lesson-nav-btn.active');
    if (activeEl) {
      const targetTop = activeEl.getBoundingClientRect().top - treeEl.getBoundingClientRect().top + treeEl.scrollTop;
      treeEl.scrollTo({ top: Math.max(0, targetTop - 8), behavior: 'smooth' });
    }
  }, 10);
}

/**
 * Render Trang chủ (Home View) — Phân tách 2 Học phần Thống nhất & Độc lập
 */
function renderHomeView() {
  const mainEl = document.getElementById('main-content');
  const tocEl = document.getElementById('toc-container');
  if (!mainEl) return;

  mainEl.classList.add('wide-view');
  const state = loadState();
  const completedSet = new Set(state.completedLessons);

  // Tìm bài học tiếp theo để học tiếp
  const resumeLessonId =
    state.lastLessonId ||
    (flatLessons.find((l) => !completedSet.has(l.id)) || flatLessons[0]).id;
  const resumeLesson = flatLessons.find((l) => l.id === resumeLessonId) || flatLessons[0];
  const hasProgress = state.completedLessons.length > 0 || Boolean(state.lastLessonId);
  const totalPct = Math.round((completedSet.size / flatLessons.length) * 100);

  const coursesHtml = COURSES.map((course) => {
    const isNumbers = course.id === 'course-python';
    const isLP = course.id === 'course-learning-python' || course.id === 'course-learning-python-part3';
    const courseDone = course.parts.reduce(
      (sum, p) => sum + p.lessons.filter((l) => completedSet.has(l.id)).length,
      0
    );
    const coursePct = Math.round((courseDone / course.totalLessons) * 100);

    const partsHtml = course.parts
      .map((part) => {
        const doneInPart = part.lessons.filter((l) => completedSet.has(l.id)).length;
        return `
          <article class="part-card" id="home-${course.id}-${part.id}">
            <div>
              <div class="part-card-top">
                <span class="part-number-pill">${escapeHtml(part.number)}</span>
                <span class="level-badge ${getLevelClass(part.level)}">${escapeHtml(part.level)}</span>
              </div>
              <h3 class="part-card-title">${escapeHtml(part.title)}</h3>
              <p class="part-card-desc">${escapeHtml(part.description)}</p>
              <ul class="part-card-lessons">
                ${part.lessons
                  .map((l) => {
                    const isDone = completedSet.has(l.id);
                    return `
                      <li>
                        <button type="button" class="part-card-lesson-btn" data-goto="${l.id}">
                          <span style="color:${isDone ? 'var(--success)' : 'var(--text-muted)'};font-weight:700;">
                            ${isDone ? '✓' : '○'}
                          </span>
                          <span style="flex:1;"><strong>${escapeHtml(l.number)}</strong> ${escapeHtml(l.title)}</span>
                          ${l.isNew314 ? `<span class="lesson-nav-badge-314">3.14</span>` : ''}
                        </button>
                      </li>
                    `;
                  })
                  .join('')}
              </ul>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid var(--border-subtle);font-size:0.8rem;color:var(--text-muted);">
              <span>Hoàn thành: ${doneInPart}/${part.lessons.length} bài</span>
              <button type="button" class="btn-secondary btn-sm" data-goto="${part.lessons[0].id}">
                Vào ${escapeHtml(part.number)} →
              </button>
            </div>
          </article>
        `;
      })
      .join('');

    return `
      <section class="course-home-section" id="home-${course.id}">
        <div class="course-section-header-lg ${isNumbers ? 'numbers-theme' : isLP ? 'lp-theme' : ''}">
          <div class="course-header-badge-row">
            <span class="course-number-badge ${isNumbers ? 'numbers-badge' : isLP ? 'lp-badge' : ''}">${escapeHtml(course.number)}</span>
            <span class="course-tag-badge">${escapeHtml(course.badge)}</span>
            <span class="course-meta-badge">${course.totalParts} Phần • ${course.totalLessons} Bài học</span>
          </div>
          <h2 class="course-title-lg">
            <span>${course.icon}</span>
            <span>${escapeHtml(course.title)}</span>
          </h2>
          <p class="course-desc-lg">${escapeHtml(course.description)}</p>
          <div class="course-progress-indicator">
            <div class="course-prog-bar">
              <div class="course-prog-fill ${isNumbers ? 'numbers-fill' : isLP ? 'lp-fill' : ''}" style="width:${coursePct}%"></div>
            </div>
            <span>Tiến độ ${escapeHtml(course.number)}: <strong>${courseDone}/${course.totalLessons}</strong> bài (${coursePct}%)</span>
          </div>
        </div>

        <div class="roadmap-grid">
          ${partsHtml}
        </div>
      </section>
    `;
  }).join('');

  mainEl.innerHTML = `
    <section class="hero-banner">
      <div class="hero-eyebrow">
        <span>🐍 Phiên bản chuẩn: ${escapeHtml(COURSE_META.version)}</span>
        <span>•</span>
        <span>Cập nhật PEP 750 (t-strings) &amp; PEP 3141 (Numeric Tower)</span>
      </div>
      <h1 class="hero-title">${escapeHtml(COURSE_META.title)}</h1>
      <p class="hero-desc">${escapeHtml(COURSE_META.subtitle)}</p>
      <div class="hero-actions">
        <button type="button" class="btn-primary" id="hero-start-btn">
          <span>${hasProgress ? '▶ Tiếp tục học:' : '🚀 Bắt đầu học ngay:'}</span>
          <span>Bài ${escapeHtml(resumeLesson.number)}</span>
        </button>
        <button type="button" class="btn-secondary" id="hero-python-btn">
          <span>🐍 Python</span>
        </button>
        <button type="button" class="btn-secondary" id="hero-hp1-btn">
          <span>🔤 Chuỗi (str)</span>
        </button>
        <button type="button" class="btn-secondary" id="hero-lp-btn">
          <span>📖 LP — Part 2</span>
        </button>
        <button type="button" class="btn-secondary" id="hero-lp3-btn">
          <span>📜 LP — Part 3</span>
        </button>
        <button type="button" class="btn-secondary" id="hero-methods-btn">
          <span>🧭 47 Phương thức str</span>
        </button>
      </div>

      <div class="hero-stats-grid">
        <div class="stat-item">
          <span class="stat-value">🐍 Python</span>
          <span class="stat-label">Phần 0, 0B &amp; 1 • 43 Bài học</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">🔤 Chuỗi (str)</span>
          <span class="stat-label">8 Phần • 28 Bài • 47 Phương thức</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">🔢 Tổng bài học</span>
          <span class="stat-label">${flatLessons.length} Bài chuyên sâu • Python 3.14</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${completedSet.size} / ${flatLessons.length}</span>
          <span class="stat-label">Tổng tiến độ hoàn thành (${totalPct}%)</span>
        </div>
      </div>
    </section>

    <div class="courses-roadmap-container">
      ${coursesHtml}
    </div>
  `;

  if (tocEl) {
    if (tocObserver) {
      tocObserver.disconnect();
      tocObserver = null;
    }

    tocEl.innerHTML = `
      <div class="toc-heading">Lộ trình Khóa học</div>
      ${COURSES.map((course) => `
        <div style="margin-top:12px;margin-bottom:6px;font-weight:700;font-size:0.75rem;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.04em;">
          <a class="toc-link toc-course-title" href="#home-${course.id}" style="color:inherit;text-decoration:none;display:block;">
            ${course.icon} ${escapeHtml(course.number)}: ${escapeHtml(course.shortTitle)}
          </a>
        </div>
        <ul class="toc-list" style="margin-bottom:12px;">
          ${course.parts
            .map(
              (p) =>
                `<li><a class="toc-link" href="#home-${course.id}-${p.id}">${escapeHtml(p.number)}: ${escapeHtml(p.title)}</a></li>`
            )
            .join('')}
        </ul>
      `).join('')}
    `;

    tocEl.querySelectorAll('.toc-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href') || '';
        const targetId = href.replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          tocEl.querySelectorAll('.toc-link').forEach((a) => a.classList.toggle('active', a === link));
        }
      });
    });

    if ('IntersectionObserver' in window) {
      tocObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const activeId = entry.target.id;
              tocEl.querySelectorAll('.toc-link').forEach((a) => {
                const targetId = (a.getAttribute('href') || '').replace('#', '');
                a.classList.toggle('active', targetId === activeId);
              });
            }
          }
        },
        { rootMargin: '-70px 0px -70% 0px', threshold: 0.05 }
      );

      tocEl.querySelectorAll('.toc-link').forEach((link) => {
        const targetId = (link.getAttribute('href') || '').replace('#', '');
        const el = document.getElementById(targetId);
        if (el) tocObserver.observe(el);
      });
    }
  }

  document.getElementById('hero-start-btn')?.addEventListener('click', () => {
    navigateToLesson(resumeLesson.id);
  });
  document.getElementById('hero-python-btn')?.addEventListener('click', () => {
    document.getElementById('home-course-python')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('hero-hp1-btn')?.addEventListener('click', () => {
    document.getElementById('home-course-str')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('hero-lp-btn')?.addEventListener('click', () => {
    document.getElementById('home-course-learning-python')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('hero-lp3-btn')?.addEventListener('click', () => {
    document.getElementById('home-course-learning-python-part3')?.scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('hero-methods-btn')?.addEventListener('click', () => {
    navigateToLesson('p2-07');
  });

  mainEl.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigateToLesson(btn.dataset.goto);
    });
  });
}

/**
 * Render Chi tiết một Bài học theo đúng cấu trúc 8 mục bắt buộc
 */
async function renderLessonView(lessonId) {
  const mainEl = document.getElementById('main-content');
  const tocEl = document.getElementById('toc-container');
  if (!mainEl) return;

  mainEl.classList.remove('wide-view');
  mainEl.innerHTML = `<div style="padding:40px 0;color:var(--text-muted);">Đang tải bài học...</div>`;

  let lesson;
  try {
    lesson = await fetchLessonData(lessonId);
  } catch (err) {
    mainEl.innerHTML = `
      <div class="callout-box callout-pitfall">
        <div class="callout-header"><span>⚠️</span> <span>Không thể tải dữ liệu bài học (${escapeHtml(lessonId)})</span></div>
        <div class="callout-body">
          <p>Chi tiết lỗi: ${escapeHtml(String(err && err.message ? err.message : err))}</p>
        </div>
      </div>
    `;
    return;
  }

  try {
    saveState({ lastLessonId: lessonId });
    const isCompleted = isLessonCompleted(lessonId);
    const currentIdx = flatLessons.findIndex((l) => l.id === lessonId);
    const prevLesson = currentIdx > 0 ? flatLessons[currentIdx - 1] : null;
    const nextLesson = currentIdx >= 0 && currentIdx < flatLessons.length - 1 ? flatLessons[currentIdx + 1] : null;
    const course = getCourseByLessonId(lessonId);
    const isLP = course && (course.id === 'course-learning-python' || course.id === 'course-learning-python-part3');
    const isLP3 = course && course.id === 'course-learning-python-part3';
    const currentLesson = currentIdx >= 0 ? flatLessons[currentIdx] : null;
    const chapterLabel = (currentLesson && currentLesson.partNumber) || (lesson.chapter ? lesson.chapter.split(':')[0] : 'Chương');
    const courseBadgeHtml = course
      ? `<span class="breadcrumb-course-badge ${course.id}">${escapeHtml(course.number)}: ${escapeHtml(course.shortTitle)}</span>`
      : '';

    if (isLP) {
      document.title = `${chapterLabel} · ${lesson.number} ${lesson.title} — Learning Python`;
    } else {
      document.title = `Bài ${lesson.number}: ${lesson.title} — Python`;
    }

    let codeCounter = 0;

    // Xây dựng HTML cho từng lớp giải thích (Section)
    const sectionsHtml = (lesson.sections || [])
      .map((sec, sIdx) => {
        const secId = sec.id || `section-${sIdx + 1}`;
        const examplesHtml = (sec.codeExamples || [])
          .map((ex) => {
            codeCounter += 1;
            return renderCodeExampleCard(ex, `${lesson.id}-s${sIdx}-c${codeCounter}`);
          })
          .join('');

        return `
          <section id="${escapeHtml(secId)}" class="lesson-section">
            <h2>
              ${escapeHtml(sec.title)}
              ${sec.badge ? `<span class="badge-new-314" style="margin-left:8px;vertical-align:middle;">✨ ${escapeHtml(sec.badge)}</span>` : ''}
            </h2>
            <div class="section-prose">${sec.content || ''}</div>
            ${examplesHtml}
          </section>
        `;
      })
      .join('');

    // Xây dựng HTML cho mục 5: Hộp Lỗi thường gặp (⚠), Ghi nhớ (💡), Chuyên sâu (🔍), Mới trong 3.14 (✨)
    const callouts = lesson.callouts || {};
    let pitfallsList = [];
    let tipsList = [];
    let new314Data = null;
    let deepDiveData = null;

    if (Array.isArray(callouts)) {
      pitfallsList = callouts.filter((c) => c && (c.type === 'pitfall' || c.type === 'warning'));
      tipsList = callouts.filter((c) => c && c.type === 'tip');
    } else {
      pitfallsList = callouts.pitfalls || [];
      tipsList = callouts.tips || [];
      new314Data = callouts.newIn314 || null;
      deepDiveData = callouts.deepDive || null;
    }

    const pitfallsHtml = pitfallsList
      .map(
        (p) => `
        <div class="callout-box callout-pitfall">
          <div class="callout-header"><span>⚠️ Lỗi thường gặp:</span> <span>${formatInlineCode(p.title)}</span></div>
          <div class="callout-body"><p>${formatInlineCode(p.content)}</p></div>
        </div>
      `
      )
      .join('');

    const tipsHtml = tipsList
      .map(
        (t) => `
        <div class="callout-box callout-tip">
          <div class="callout-header"><span>💡 Ghi nhớ:</span> <span>${formatInlineCode(t.title)}</span></div>
          <div class="callout-body"><p>${formatInlineCode(t.content)}</p></div>
        </div>
      `
      )
      .join('');

    const new314Html = new314Data
      ? `
        <div class="callout-box callout-314">
          <div class="callout-header"><span>✨ Mới trong Python 3.14:</span> <span>${formatInlineCode(new314Data.title)}</span></div>
          <div class="callout-body"><p>${formatInlineCode(new314Data.content)}</p></div>
        </div>
      `
      : '';

    const deepDiveHtml = deepDiveData
      ? `
        <details class="deep-dive-details">
          <summary class="deep-dive-summary">
            <span>🔍 Chuyên sâu: ${formatInlineCode(deepDiveData.title)}</span>
            <span class="deep-dive-toggle-hint">Bấm để mở rộng / thu gọn ▾</span>
          </summary>
          <div class="deep-dive-content">
            ${deepDiveData.content}
          </div>
        </details>
      `
      : '';

    // Xây dựng HTML cho mục 6: Bài tập 3 mức (Dễ / Vừa / Khó)
    const exercisesHtml = (lesson.exercises || [])
      .map((ex, exIdx) => {
        codeCounter += 1;
        const exLevel = ex.level || 'Vừa';
        const exProblem = ex.problem || ex.description || '';
        const solCode = ex.solutionCode || ex.solution || '';
        const solCard = renderCodeExampleCard(
          {
            title: `Lời giải mẫu (${exLevel})`,
            code: solCode,
            output: ex.solutionOutput,
            annotations: ex.annotations || []
          },
          `${lesson.id}-ex-${exIdx}`
        );

        return `
          <div class="exercise-card">
            <div class="exercise-header">
              <span class="ex-level-badge ${getExerciseLevelClass(exLevel)}">Mức: ${escapeHtml(exLevel)}</span>
              <span class="exercise-title">${formatInlineCode(ex.title)}</span>
            </div>
            <div class="exercise-problem">${formatInlineCode(exProblem)}</div>
            ${ex.hint ? `<div class="exercise-hint"><strong>Gợi ý:</strong> ${formatInlineCode(ex.hint)}</div>` : ''}
            <details class="solution-details">
              <summary class="solution-summary">👁️ Bấm để xem đáp án &amp; giải thích chi tiết</summary>
              <div class="solution-body">
                ${solCard}
                ${ex.explanation ? `<p style="margin-top:10px;font-size:0.9rem;"><strong>Giải thích:</strong> ${formatInlineCode(ex.explanation)}</p>` : ''}
              </div>
            </details>
          </div>
        `;
      })
      .join('');

    // Xây dựng HTML cho mục 7: Quiz 3–5 câu
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const quizHtml = (lesson.quiz || [])
      .map((q, qIdx) => {
        const savedAns = getQuizAnswer(lesson.id, qIdx);
        const isAnswered = savedAns !== null && savedAns !== undefined;
        const isUserCorrect = isAnswered && savedAns === q.correctIndex;

        return `
          <div class="quiz-card" data-quiz-idx="${qIdx}" data-correct-idx="${q.correctIndex}">
            <div class="quiz-question">Câu ${qIdx + 1}: ${formatInlineCode(q.question)}</div>
            <div class="quiz-options">
              ${q.options
                .map((opt, oIdx) => {
                  let stateClass = '';
                  if (isAnswered) {
                    if (oIdx === q.correctIndex) stateClass = 'correct';
                    else if (oIdx === savedAns) stateClass = 'wrong';
                  }
                  return `
                    <button
                      type="button"
                      class="quiz-option-btn ${stateClass}"
                      data-opt-idx="${oIdx}"
                    >
                      <span class="quiz-option-letter">${letters[oIdx] || oIdx + 1}</span>
                      <span>${formatInlineCode(opt)}</span>
                    </button>
                  `;
                })
                .join('')}
            </div>
            <div class="quiz-explanation ${isAnswered ? 'visible' : ''} ${isAnswered ? (isUserCorrect ? 'is-correct' : 'is-wrong') : ''}">
              <strong>${isAnswered ? (isUserCorrect ? '🎉 Chính xác!' : '❌ Chưa chính xác!') : ''}</strong>
              <span> ${formatInlineCode(q.explanation)}</span>
            </div>
          </div>
        `;
      })
      .join('');

    // Xây dựng HTML cho mục 8: Tóm tắt & Điều hướng
    const rawSummary = lesson.summary;
    const summaryList = Array.isArray(rawSummary)
      ? rawSummary
      : (typeof rawSummary === 'string' && rawSummary.trim() ? [rawSummary.trim()] : []);
    const summaryHtml = summaryList
      .map((line) => `<li>${formatInlineCode(line)}</li>`)
      .join('');

    mainEl.innerHTML = `
      <article class="lesson-article">
        <!-- Header & Mục 1: Mục tiêu + Huy hiệu mức độ -->
        <header class="lesson-header">
          <div class="lesson-meta-row">
            <span class="part-breadcrumb">
              ${
                isLP
                  ? (isLP3
                      ? `<span class="breadcrumb-course-badge course-learning-python-part3">Học phần IV: Learning Python</span> › Phần III › ${escapeHtml(chapterLabel)} › ${escapeHtml(lesson.title)}`
                      : `<span class="breadcrumb-course-badge course-learning-python">Học phần III: Learning Python</span> › Phần II › ${escapeHtml(chapterLabel)} › ${escapeHtml(lesson.title)}`)
                  : `${courseBadgeHtml} › ${escapeHtml(lesson.partTitle)} › Bài ${escapeHtml(lesson.number)}: ${escapeHtml(lesson.title)}`
              }
            </span>
            ${isLP ? `<span class="level-badge chapter-badge" style="background:var(--accent-soft);color:var(--accent-text);font-weight:700;">${escapeHtml(chapterLabel)}</span>` : ''}
            <span class="level-badge ${getLevelClass(lesson.level)}">${escapeHtml(lesson.level)}</span>
            <span class="level-badge" style="background:var(--bg-surface-alt);color:var(--text-secondary);">⏱ ${escapeHtml(lesson.duration || '25 phút')}</span>
            ${lesson.isNew314 ? `<span class="badge-new-314">✨ Mới trong Python 3.14</span>` : ''}
          </div>
          <h1>${isLP ? `${escapeHtml(chapterLabel)} · ${escapeHtml(lesson.number)}: ${escapeHtml(lesson.title)}` : `Bài ${escapeHtml(lesson.number)}: ${escapeHtml(lesson.title)}`}</h1>
          ${lesson.subtitle ? `<p class="lesson-subtitle">${escapeHtml(lesson.subtitle)}</p>` : ''}
        </header>

        <section class="objectives-box" id="sec-objectives">
          <div class="objectives-title">
            <span>🎯</span>
            <span>1. Mục tiêu bài học</span>
          </div>
          <ul class="objectives-list">
            ${(lesson.objectives || [])
              .map(
                (obj) => `
                <li>
                  <span class="obj-check">✓</span>
                  <span>${formatInlineCode(obj)}</span>
                </li>
              `
              )
              .join('')}
          </ul>
        </section>

        <!-- Mục 2: Trực giác (Intuition) -->
        ${
          lesson.intuition
            ? `
          <section id="sec-intuition" class="intuition-box">
            <div class="intuition-header">
              <span>💡</span>
              <span>2. Trực giác: ${escapeHtml(lesson.intuition.title)}</span>
            </div>
            <p class="intuition-metaphor">${formatInlineCode(lesson.intuition.metaphor)}</p>
            ${
              lesson.intuition.visualHtml
                ? `<div class="intuition-visual">${lesson.intuition.visualHtml}</div>`
                : ''
            }
          </section>
        `
            : ''
        }

        <!-- Thành phần tương tác trực quan (nếu bài học có gắn widget) -->
        ${lesson.interactiveWidget ? `<div id="lesson-interactive-widget"></div>` : ''}

        <!-- Mục 3 & 4: Giải thích từng lớp & Ví dụ code -->
        ${sectionsHtml}

        <!-- Mục 5: Lỗi thường gặp, Ghi nhớ, Chuyên sâu, Mới trong 3.14 -->
        <section id="sec-callouts">
          <h2>Lưu ý Quan trọng &amp; Đào sâu</h2>
          ${new314Html}
          ${pitfallsHtml}
          ${tipsHtml}
          ${deepDiveHtml}
        </section>

        <!-- Mục 6: Bài tập thực hành 3 mức (Dễ / Vừa / Khó) -->
        <section id="sec-exercises">
          <h2>Bài tập Thực hành (3 mức độ)</h2>
          <div class="exercises-container">
            ${exercisesHtml}
          </div>
        </section>

        <!-- Mục 7: Quiz kiểm tra nhanh -->
        <section id="sec-quiz">
          <h2>Câu hỏi Trắc nghiệm (Quiz)</h2>
          <div class="quiz-container">
            ${quizHtml}
          </div>
        </section>

        <!-- Mục 8: Tóm tắt & Điều hướng Bài trước / Bài sau -->
        <section id="sec-summary" class="summary-box">
          <div class="summary-title">
            <span>📌</span>
            <span>Tóm tắt Bài học</span>
          </div>
          <ul>
            ${summaryHtml}
          </ul>
        </section>

        <div class="complete-lesson-bar">
          <div>
            <strong>Tiến độ bài học:</strong>
            <span style="color:var(--text-muted);font-size:0.88rem;margin-left:6px;">
              Đánh dấu hoàn thành để lưu vào lộ trình cá nhân của bạn.
            </span>
          </div>
          <button type="button" id="btn-toggle-complete" class="btn-complete-toggle ${isCompleted ? 'completed' : ''}">
            <span>${isCompleted ? '✓ Đã hoàn thành bài học' : '○ Đánh dấu hoàn thành'}</span>
          </button>
        </div>

        <nav class="lesson-prev-next" aria-label="Điều hướng bài trước và bài sau">
          ${
            prevLesson
              ? `
            <button type="button" class="prev-next-card prev" data-nav-lesson="${prevLesson.id}">
              <span class="pn-direction">← Bài trước <kbd class="kbd-hint">[</kbd></span>
              <span class="pn-title">Bài ${escapeHtml(prevLesson.number)}: ${escapeHtml(prevLesson.title)}</span>
            </button>
          `
              : `
            <button type="button" class="prev-next-card prev" data-nav-home="1">
              <span class="pn-direction">← Quay lại <kbd class="kbd-hint">[</kbd></span>
              <span class="pn-title">Trang chủ &amp; Lộ trình khóa học</span>
            </button>
          `
          }
          ${
            nextLesson
              ? `
            <button type="button" class="prev-next-card next" data-nav-lesson="${nextLesson.id}">
              <span class="pn-direction"><kbd class="kbd-hint">]</kbd> Bài tiếp theo →</span>
              <span class="pn-title">Bài ${escapeHtml(nextLesson.number)}: ${escapeHtml(nextLesson.title)}</span>
            </button>
          `
              : `
            <button type="button" class="prev-next-card next" data-nav-home="1">
              <span class="pn-direction">🎉 Hoàn tất khóa học →</span>
              <span class="pn-title">Về Trang chủ Tổng kết</span>
            </button>
          `
          }
        </nav>
      </article>
    `;

    // Gắn Widget tương tác nếu bài học có khai báo
    if (lesson.interactiveWidget) {
      const widgetContainer = document.getElementById('lesson-interactive-widget');
      mountLessonWidget(lesson.interactiveWidget, widgetContainer);
    }

    // Render công thức toán KaTeX cho toàn bộ vùng nội dung bài học vừa được chèn
    renderMathInContainer(mainEl);

    // Gắn sự kiện Copy Code
    mainEl.querySelectorAll('.copy-code-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const targetId = btn.dataset.copyTarget;
        const textarea = document.getElementById(targetId);
        if (!textarea) return;
        const rawCode = textarea.value;
        try {
          await navigator.clipboard.writeText(rawCode);
        } catch (_e) {
          textarea.style.display = 'block';
          textarea.select();
          document.execCommand('copy');
          textarea.style.display = 'none';
        }
        btn.classList.add('copied');
        const labelSpan = btn.querySelector('.copy-btn-text');
        if (labelSpan) labelSpan.textContent = 'Đã chép!';
        setTimeout(() => {
          btn.classList.remove('copied');
          if (labelSpan) labelSpan.textContent = 'Sao chép';
        }, 1800);
      });
    });

    // Gắn sự kiện Quiz tương tác
    mainEl.querySelectorAll('.quiz-card').forEach((card) => {
      const qIdx = Number(card.dataset.quizIdx);
      const correctIdx = Number(card.dataset.correctIdx);
      const qObj = lesson.quiz[qIdx];
      const expEl = card.querySelector('.quiz-explanation');
      const optBtns = card.querySelectorAll('.quiz-option-btn');

      optBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const chosenIdx = Number(btn.dataset.optIdx);
          saveQuizAnswer(lesson.id, qIdx, chosenIdx);

          optBtns.forEach((b, idx) => {
            b.classList.remove('correct', 'wrong');
            if (idx === correctIdx) b.classList.add('correct');
            else if (idx === chosenIdx) b.classList.add('wrong');
          });

          const isCorrect = chosenIdx === correctIdx;
          if (expEl) {
            expEl.className = `quiz-explanation visible ${isCorrect ? 'is-correct' : 'is-wrong'}`;
            expEl.innerHTML = `
              <strong>${isCorrect ? '🎉 Chính xác!' : '❌ Chưa chính xác!'}</strong>
              <span> ${formatInlineCode(qObj.explanation)}</span>
            `;
          }
        });
      });
    });

    // Nút Đánh dấu hoàn thành
    const completeBtn = document.getElementById('btn-toggle-complete');
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        const nowDone = toggleLessonComplete(lesson.id);
        completeBtn.classList.toggle('completed', nowDone);
        completeBtn.innerHTML = `<span>${nowDone ? '✓ Đã hoàn thành bài học' : '○ Đánh dấu hoàn thành'}</span>`;
        renderSidebar();
      });
    }

    // Nút Bài trước / Bài sau (khi bấm Bài tiếp theo, tự động đánh dấu hoàn thành bài hiện tại nếu muốn hoặc chuyển bài)
    mainEl.querySelectorAll('[data-nav-lesson]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('next')) {
          markLessonComplete(lesson.id);
        }
        navigateToLesson(btn.dataset.navLesson);
      });
    });

    mainEl.querySelectorAll('[data-nav-home]').forEach((btn) => {
      btn.addEventListener('click', () => {
        navigateHome();
      });
    });

    // Cập nhật cột phải "Trong bài này" (Table of Contents)
    renderRightToc(lesson);
    window.scrollTo({ top: 0, behavior: 'auto' });
  } catch (renderErr) {
    console.error('Lỗi khi render bài học:', renderErr);
    mainEl.innerHTML = `
      <div class="callout-box callout-pitfall">
        <div class="callout-header"><span>⚠️</span> <span>Lỗi hiển thị nội dung bài học (${escapeHtml(lessonId)})</span></div>
        <div class="callout-body">
          <p>Chi tiết lỗi: ${escapeHtml(String(renderErr && renderErr.message ? renderErr.message : renderErr))}</p>
        </div>
      </div>
    `;
  }
}

/**
 * Render mục lục "Trong bài này" ở cột phải và theo dõi cuộn trang
 */
function renderRightToc(lesson) {
  const tocEl = document.getElementById('toc-container');
  if (!tocEl) return;

  if (tocObserver) {
    tocObserver.disconnect();
    tocObserver = null;
  }

  const tocItems = [
    { id: 'sec-objectives', label: '1. Mục tiêu bài học' },
    ...(lesson.intuition ? [{ id: 'sec-intuition', label: '2. Trực giác' }] : []),
    ...(lesson.sections || []).map((s, idx) => ({
      id: s.id || `section-${idx + 1}`,
      label: s.title
    })),
    { id: 'sec-callouts', label: 'Lưu ý & Chuyên sâu' },
    { id: 'sec-exercises', label: 'Bài tập thực hành' },
    { id: 'sec-quiz', label: 'Câu hỏi Quiz' },
    { id: 'sec-summary', label: 'Tóm tắt bài học' }
  ];

  tocEl.innerHTML = `
    <div class="toc-heading">Trong bài này</div>
    <ul class="toc-list">
      ${tocItems
        .map(
          (item) => `
        <li>
          <a class="toc-link" href="#${escapeHtml(item.id)}" data-toc-target="${escapeHtml(item.id)}">
            ${escapeHtml(item.label)}
          </a>
        </li>
      `
        )
        .join('')}
    </ul>
  `;

  tocEl.querySelectorAll('.toc-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.tocTarget;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if ('IntersectionObserver' in window) {
    tocObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;
            tocEl.querySelectorAll('.toc-link').forEach((a) => {
              a.classList.toggle('active', a.dataset.tocTarget === activeId);
            });
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0.05 }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) tocObserver.observe(el);
    });
  }
}

/**
 * Điều hướng sang một Bài học hoặc về Trang chủ
 */
export function navigateToLesson(lessonId) {
  currentView = lessonId;
  const course = getCourseByLessonId(lessonId);
  if (course && activeCourseFilter !== 'all' && activeCourseFilter !== course.id) {
    activeCourseFilter = 'all';
  }
  closeMobileDrawer();
  try {
    window.history.replaceState(null, '', `#lesson=${lessonId}`);
  } catch (_e) {
    window.location.hash = `lesson=${lessonId}`;
  }
  renderSidebar();
  renderLessonView(lessonId);
  updateScrollIndicators();
}

export function navigateHome() {
  currentView = 'home';
  document.title = 'Python';
  closeMobileDrawer();
  try {
    window.history.replaceState(null, '', '#home');
  } catch (_e) {
    window.location.hash = 'home';
  }
  renderSidebar();
  renderHomeView();
  window.scrollTo({ top: 0, behavior: 'auto' });
  updateScrollIndicators();
}

function closeMobileDrawer() {
  document.getElementById('sidebar-left')?.classList.remove('open');
  document.getElementById('sidebar-backdrop')?.classList.remove('open');
  document.body.classList.remove('scroll-lock');
}

/**
 * Khởi tạo Theme (Sáng/Tối) và Cỡ chữ (Small/Medium/Large)
 */
function initThemeAndFontControls() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const fontBtns = document.querySelectorAll('.font-btn');
  const state = loadState();

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.innerHTML =
        theme === 'dark'
          ? `<span>☀️</span> <span class="btn-label">Sáng</span>`
          : `<span>🌙</span> <span class="btn-label">Tối</span>`;
      themeBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'
      );
    }
  }

  function applyFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
    fontBtns.forEach((b) => {
      b.classList.toggle('active', b.dataset.size === size);
    });
  }

  applyTheme(getPreferredTheme());
  applyFontSize(state.fontSize || 'medium');

  themeBtn?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    saveState({ theme: next });
    applyTheme(next);
  });

  fontBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const size = btn.dataset.size;
      saveState({ fontSize: size });
      applyFontSize(size);
    });
  });
}

/**
 * Khởi động toàn bộ ứng dụng
 */
function updateScrollIndicators() {
  const progressFill = document.getElementById('reading-progress-fill');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  if (progressFill) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      progressFill.style.width = '0%';
    } else {
      const pct = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
      progressFill.style.width = pct.toFixed(1) + '%';
    }
  }
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
}

export function bootApp() {
  initThemeAndFontControls();

  const backToTopBtn = document.getElementById('back-to-top-btn');
  window.addEventListener('scroll', updateScrollIndicators, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Điều hướng bàn phím: [ (Bài trước) / ] (Bài tiếp theo)
  function navigatePrevious() {
    if (currentView === 'home') return;
    const idx = flatLessons.findIndex((l) => l.id === currentView);
    if (idx > 0) {
      navigateToLesson(flatLessons[idx - 1].id);
    } else if (idx === 0) {
      navigateHome();
    }
  }

  function navigateNext() {
    if (currentView === 'home') {
      if (flatLessons.length > 0) {
        navigateToLesson(flatLessons[0].id);
      }
      return;
    }
    const idx = flatLessons.findIndex((l) => l.id === currentView);
    if (idx >= 0 && idx < flatLessons.length - 1) {
      navigateToLesson(flatLessons[idx + 1].id);
    }
  }

  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement ? document.activeElement.tagName : '';
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || document.activeElement?.isContentEditable) {
      return;
    }
    if (e.key === '[' || (e.altKey && e.key === 'ArrowLeft')) {
      e.preventDefault();
      navigatePrevious();
    } else if (e.key === ']' || (e.altKey && e.key === 'ArrowRight')) {
      e.preventDefault();
      navigateNext();
    }
  });

  // Nút về trang chủ
  document.getElementById('brand-home-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigateHome();
  });
  document.getElementById('top-nav-python')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigateHome();
  });

  // Ngăn kéo Mobile
  const menuBtn = document.getElementById('menu-toggle-btn');
  const sidebarLeft = document.getElementById('sidebar-left');
  const backdrop = document.getElementById('sidebar-backdrop');

  menuBtn?.addEventListener('click', () => {
    const isOpen = sidebarLeft?.classList.toggle('open');
    backdrop?.classList.toggle('open', Boolean(isOpen));
    document.body.classList.toggle('scroll-lock', Boolean(isOpen));
  });
  backdrop?.addEventListener('click', closeMobileDrawer);
  document.getElementById('sidebar-close-btn')?.addEventListener('click', closeMobileDrawer);

  // Đồng bộ route từ URL hash (hỗ trợ hash ban đầu và nút Back/Forward)
  function handleRouteFromHash(isInitial = false) {
    const hash = window.location.hash || '';
    const match = hash.match(/lesson=([a-z0-9-]+)/i);
    if (match && flatLessons.some((l) => l.id === match[1])) {
      if (isInitial || currentView !== match[1]) {
        navigateToLesson(match[1]);
      }
    } else {
      if (isInitial || currentView !== 'home') {
        navigateHome();
      }
    }
  }

  window.addEventListener('hashchange', () => handleRouteFromHash(false));
  handleRouteFromHash(true);
}

bootApp();
