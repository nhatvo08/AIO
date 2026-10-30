/**
 * Topic Engine (js/topic-engine.js)
 * Bộ điều khiển và renderer dùng chung cho tất cả các Chuyên đề thực chiến (Git & GitHub, Linux, Docker, SQL...)
 * Thiết kế theo mô hình IIFE thuần, không bundler, hoạt động đồng thời trên cả HTTP và giao thức file://
 */

(function () {
  'use strict';

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
    var str = String(text);
    return str.replace(/`([^`]+)`/g, function (_m, code) {
      return '<code>' + escapeHtml(code) + '</code>';
    });
  }

  function formatMultilineHtml(text) {
    if (!text) return '';
    var str = String(text);
    var paragraphs = str.split(/\n\n+/);
    if (paragraphs.length > 1) {
      return paragraphs
        .map(function (p) {
          var lines = p.split(/\n/).map(function (l) { return formatInlineCode(l); }).join('<br>');
          return '<p style="margin-bottom:8px;">' + lines + '</p>';
        })
        .join('');
    }
    return str.split(/\n/).map(function (l) { return formatInlineCode(l); }).join('<br>');
  }

  function getLevelBadgeClass(level) {
    switch (level) {
      case 'Cơ bản':
        return 'level-basic';
      case 'Trung cấp':
        return 'level-inter';
      case 'Nâng cao':
      case 'Tra cứu':
        return 'level-adv';
      case 'Chuyên sâu':
      case 'Cực kỳ chuyên sâu':
        return 'level-expert';
      default:
        return 'level-basic';
    }
  }

  var STORAGE_KEY_PYTHON = 'py314_str_course_state_v1';

  function createApp(config) {
    var topicId = config.topicId || 'topic';
    var topicPrefix = config.topicPrefix || topicId;
    var topicTitle = config.topicTitle || 'Chuyên đề Thực chiến';
    var storageKey = config.storageKey || ('py314_' + topicPrefix + '_course_state_v1');
    var rawParts = config.parts || [];
    if (config.referenceData) {
      rawParts.push(config.referenceData);
    }
    var PARTS = rawParts.filter(Boolean);
    var PART_ICONS = config.partIcons || {};
    var heroConfig = config.hero || {};
    var topNavId = config.topNavId || ('top-nav-' + topicId);

    // Thu thập danh sách phẳng tất cả bài học
    var ALL_LESSONS = [];
    PARTS.forEach(function (part) {
      (part.lessons || []).forEach(function (lesson) {
        ALL_LESSONS.push({
          partId: part.id,
          partNumber: part.number,
          partTitle: part.title,
          partLevel: part.level,
          lesson: lesson
        });
      });
    });

    var memStorage = {
      completed: [],
      lastLessonId: null
    };

    function loadState() {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          var raw = window.localStorage.getItem(storageKey);
          if (raw) {
            var parsed = JSON.parse(raw);
            return {
              completed: Array.isArray(parsed.completed) ? parsed.completed : [],
              lastLessonId: parsed.lastLessonId || null
            };
          }
        }
      } catch (_e) {}
      return memStorage;
    }

    function saveState(partial) {
      var cur = loadState();
      var next = {
        completed: partial.completed !== undefined ? partial.completed : cur.completed,
        lastLessonId: partial.lastLessonId !== undefined ? partial.lastLessonId : cur.lastLessonId
      };
      memStorage = next;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        }
      } catch (_e) {}
      return next;
    }

    function isLessonDone(lid) {
      return loadState().completed.indexOf(lid) !== -1;
    }

    function toggleLessonDone(lid) {
      var state = loadState();
      var list = state.completed.slice();
      var idx = list.indexOf(lid);
      var nowDone = false;
      if (idx !== -1) {
        list.splice(idx, 1);
      } else {
        list.push(lid);
        nowDone = true;
      }
      saveState({ completed: list });
      return nowDone;
    }

    var currentView = 'overview';
    var activeFilter = 'all';
    var tocObserver = null;
    var partOpenState = {};

    function renderSidebar() {
      var state = loadState();
      var coreLessons = ALL_LESSONS.filter(function (it) {
        return !it.lesson.id.includes('-ref-');
      });
      var totalCount = coreLessons.length > 0 ? coreLessons.length : ALL_LESSONS.length;
      var completedCount = state.completed.filter(function (id) {
        return !id.includes('-ref-');
      }).length;
      var pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      var fillEl = document.getElementById('sidebar-progress-fill');
      var pctEl = document.getElementById('sidebar-progress-pct');
      var statsEl = document.getElementById('sidebar-progress-stats');
      var treeEl = document.getElementById('curriculum-tree');

      if (fillEl) fillEl.style.width = pct + '%';
      if (pctEl) pctEl.textContent = pct + '%';
      if (statsEl) {
        statsEl.innerHTML = '<span>Đã hoàn thành: <strong>' + completedCount + '/' + totalCount + '</strong> bài</span>';
      }

      var filterBtns = document.querySelectorAll('.course-tab-btn');
      filterBtns.forEach(function (btn) {
        var val = btn.dataset.courseFilter || btn.dataset.filter;
        btn.classList.toggle('active', val === activeFilter);
        btn.onclick = function () {
          activeFilter = val;
          if (activeFilter !== 'all') {
            partOpenState[activeFilter] = true;
          }
          filterBtns.forEach(function (b) {
            var bVal = b.dataset.courseFilter || b.dataset.filter;
            b.classList.toggle('active', bVal === activeFilter);
          });
          renderSidebar();
        };
      });

      if (!treeEl) return;

      var filteredParts = activeFilter === 'all'
        ? PARTS
        : PARTS.filter(function (p) { return p.id === activeFilter; });

      treeEl.innerHTML = filteredParts.map(function (part) {
        var partLessons = part.lessons || [];
        var partDoneCount = partLessons.filter(function (l) { return isLessonDone(l.id); }).length;
        var hasActiveLesson = partLessons.some(function (l) { return l.id === currentView; });
        var isOpen = hasActiveLesson || Boolean(partOpenState[part.id]);
        var isCollapsed = !isOpen;
        var icon = PART_ICONS[part.id] || '';

        var lessonsHtml = partLessons.map(function (l) {
          var isDone = isLessonDone(l.id);
          var isActive = currentView === l.id;
          var isRef = l.id.includes('-ref-');
          var badgeHtml = isRef ? '<span class="' + topicPrefix + '-nav-pill-mini">Tra cứu</span>' : '';

          return '' +
            '<li>' +
              '<button type="button" class="lesson-nav-btn ' + (isActive ? 'active' : '') + ' ' + (isDone ? 'completed' : '') + '" data-lesson-id="' + l.id + '">' +
                '<span class="lesson-status-dot" aria-hidden="true">' + (isDone ? '✓' : '') + '</span>' +
                '<span class="lesson-nav-title"><strong>' + escapeHtml(l.number) + '</strong> ' + escapeHtml(l.title) + '</span>' +
                badgeHtml +
              '</button>' +
            '</li>';
        }).join('');

        return '' +
          '<div class="part-group ' + (isCollapsed ? 'collapsed' : '') + '" data-part="' + part.id + '">' +
            '<button type="button" class="part-group-header" aria-expanded="' + (!isCollapsed) + '">' +
              '<span>' +
                (icon ? '<span aria-hidden="true" style="margin-right:4px;">' + icon + '</span> ' : '') +
                '<strong>' + escapeHtml(part.number) + ':</strong> ' + escapeHtml(part.title) +
                ' <small style="color:var(--text-muted);font-weight:500;">(' + partDoneCount + '/' + partLessons.length + ')</small>' +
              '</span>' +
              '<span class="part-chevron">▾</span>' +
            '</button>' +
            '<ul class="part-lessons">' + lessonsHtml + '</ul>' +
          '</div>';
      }).join('');

      treeEl.querySelectorAll('.part-group-header').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var group = btn.closest('.part-group');
          var partId = group.getAttribute('data-part');
          var isNowCollapsed = group.classList.toggle('collapsed');
          btn.setAttribute('aria-expanded', String(!isNowCollapsed));
          partOpenState[partId] = !isNowCollapsed;
          if (!isNowCollapsed) {
            setTimeout(function () {
              var targetTop = group.getBoundingClientRect().top - treeEl.getBoundingClientRect().top + treeEl.scrollTop;
              treeEl.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
            }, 10);
          }
        });
      });

      treeEl.querySelectorAll('.lesson-nav-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          navigateTo(btn.dataset.lessonId);
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

    function renderOverviewView() {
      var mainEl = document.getElementById('main-content');
      var tocEl = document.getElementById('toc-container');
      if (!mainEl) return;

      mainEl.classList.add('wide-view');
      var state = loadState();
      var completedCount = state.completed.length;
      var totalCount = ALL_LESSONS.length;

      var resumeItem = ALL_LESSONS.find(function (item) {
        return state.completed.indexOf(item.lesson.id) === -1;
      }) || ALL_LESSONS[0];

      var heroStyle = heroConfig.accentColor ? ' style="border-left: 5px solid ' + escapeHtml(heroConfig.accentColor) + ';"' : '';
      var eyebrowStyle = heroConfig.eyebrowStyle ? ' style="' + escapeHtml(heroConfig.eyebrowStyle) + '"' : '';
      var resumeBtnStyle = heroConfig.accentColor ? ' style="background:' + escapeHtml(heroConfig.accentColor) + ';"' : '';
      var statValueStyle = heroConfig.accentColor ? ' style="color:' + escapeHtml(heroConfig.accentColor) + ';"' : '';

      var partsHtml = PARTS.map(function (part) {
        var partLessons = part.lessons || [];
        var partDone = partLessons.filter(function (l) { return isLessonDone(l.id); }).length;
        var lessonsListHtml = partLessons.map(function (l) {
          var isDone = isLessonDone(l.id);
          return '' +
            '<li>' +
              '<button type="button" class="part-card-lesson-btn" data-goto="' + l.id + '">' +
                '<span style="color:' + (isDone ? 'var(--success)' : 'var(--text-muted)') + ';font-weight:700;">' + (isDone ? '✓' : '○') + '</span>' +
                '<span style="flex:1;"><strong>' + escapeHtml(l.number) + '</strong> ' + escapeHtml(l.title) + '</span>' +
              '</button>' +
            '</li>';
        }).join('');

        var pillClassExtra = config.pillPrefix ? (' ' + config.pillPrefix + '-part-pill ' + config.pillPrefix + '-part-pill-' + (part.id.replace('part-' + config.pillPrefix + '-', ''))) : '';
        var pillIcon = (PART_ICONS[part.id] ? PART_ICONS[part.id] + ' ' : '');

        return '' +
          '<article class="part-card" id="part-card-' + part.id + '">' +
            '<div>' +
              '<div class="part-card-top">' +
                '<span class="part-number-pill' + pillClassExtra + '">' + pillIcon + escapeHtml(part.number) + '</span>' +
                '<span class="level-badge ' + getLevelBadgeClass(part.level) + '">' + escapeHtml(part.level) + '</span>' +
              '</div>' +
              '<h3 class="part-card-title">' + escapeHtml(part.title) + '</h3>' +
              '<p class="part-card-desc">' + escapeHtml(part.description) + '</p>' +
              '<ul class="part-card-lessons">' + lessonsListHtml + '</ul>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid var(--border-subtle);font-size:0.8rem;color:var(--text-muted);">' +
              '<span>Hoàn thành: ' + partDone + '/' + partLessons.length + ' bài</span>' +
              (partLessons[0] ? (
                '<button type="button" class="btn-secondary btn-sm" data-goto="' + partLessons[0].id + '">' +
                  'Bắt đầu ' + escapeHtml(part.number) + ' →' +
                '</button>'
              ) : '') +
            '</div>' +
          '</article>';
      }).join('');

      var heroActionsHtml = '';
      if (resumeItem) {
        heroActionsHtml += '' +
          '<button type="button" class="btn-primary" id="hero-resume-btn"' + resumeBtnStyle + '>' +
            '<span>' + (completedCount > 0 ? '▶ Tiếp tục học:' : '🚀 Bắt đầu học:') + '</span> ' +
            '<span>Bài ' + escapeHtml(resumeItem.lesson.number) + '</span>' +
          '</button>';
      }
      (heroConfig.buttons || []).forEach(function (btn) {
        if (btn.scrollTarget) {
          heroActionsHtml += '' +
            '<button type="button" class="btn-secondary" id="' + escapeHtml(btn.id) + '" data-scroll="' + escapeHtml(btn.scrollTarget) + '">' +
              '<span>' + escapeHtml(btn.text) + '</span>' +
            '</button>';
        } else {
          heroActionsHtml += '' +
            '<button type="button" class="btn-secondary" id="' + escapeHtml(btn.id) + '" data-goto="' + escapeHtml(btn.target) + '">' +
              '<span>' + escapeHtml(btn.text) + '</span>' +
            '</button>';
        }
      });

      var statsItemsHtml = (heroConfig.stats || []).map(function (stat) {
        return '' +
          '<div class="stat-item">' +
            '<span class="stat-value"' + statValueStyle + '>' + escapeHtml(stat.value) + '</span>' +
            '<span class="stat-label">' + escapeHtml(stat.label) + '</span>' +
          '</div>';
      }).join('');

      statsItemsHtml += '' +
        '<div class="stat-item">' +
          '<span class="stat-value"' + statValueStyle + '>' + completedCount + ' / ' + totalCount + '</span>' +
          '<span class="stat-label">Tiến độ hoàn thành (' + (totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0) + '%)</span>' +
        '</div>';

      var extraSectionsHtml = typeof config.overviewExtraSections === 'function'
        ? config.overviewExtraSections()
        : (config.overviewExtraSections || '');

      mainEl.innerHTML = '' +
        '<section class="hero-banner"' + heroStyle + '>' +
          '<div class="hero-eyebrow"' + eyebrowStyle + '>' + (heroConfig.eyebrow || ('<span>' + escapeHtml(topicTitle) + '</span>')) + '</div>' +
          '<h1 class="hero-title">' + (heroConfig.title || escapeHtml(topicTitle)) + '</h1>' +
          '<p class="hero-desc">' + (heroConfig.desc || '') + '</p>' +
          '<div class="hero-actions">' + heroActionsHtml + '</div>' +
          '<div class="hero-stats-grid">' + statsItemsHtml + '</div>' +
        '</section>' +
        extraSectionsHtml +
        '<section>' +
          '<h2 class="roadmap-section-title">' + (heroConfig.roadmapTitle || 'Lộ trình Chuyên đề') + '</h2>' +
          '<div class="roadmap-grid">' + partsHtml + '</div>' +
        '</section>';

      if (tocEl) {
        var extraToc = config.overviewExtraTocItems || [];
        var extraTocHtml = extraToc.map(function (item) {
          return '<li><a class="toc-link" href="#' + escapeHtml(item.id) + '">' + escapeHtml(item.label) + '</a></li>';
        }).join('');

        tocEl.innerHTML = '' +
          '<div class="toc-heading">Lộ trình Chuyên đề</div>' +
          '<ul class="toc-list">' +
            extraTocHtml +
            PARTS.map(function (p) {
              return '<li><a class="toc-link" href="#part-card-' + p.id + '">' + escapeHtml(p.number) + ': ' + escapeHtml(p.title) + '</a></li>';
            }).join('') +
          '</ul>';

        tocEl.querySelectorAll('.toc-link').forEach(function (link) {
          link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = link.getAttribute('href').replace('#', '');
            var targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });
      }

      document.getElementById('hero-resume-btn')?.addEventListener('click', function () {
        if (resumeItem) navigateTo(resumeItem.lesson.id);
      });

      mainEl.querySelectorAll('[data-scroll]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = document.querySelector(btn.dataset.scroll);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
      });

      mainEl.querySelectorAll('[data-goto]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          navigateTo(btn.dataset.goto);
        });
      });

      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    function renderLessonView(lessonId) {
      var mainEl = document.getElementById('main-content');
      var tocEl = document.getElementById('toc-container');
      if (!mainEl) return;

      mainEl.classList.remove('wide-view');
      var foundIdx = -1;
      for (var i = 0; i < ALL_LESSONS.length; i++) {
        if (ALL_LESSONS[i].lesson.id === lessonId) {
          foundIdx = i;
          break;
        }
      }

      if (foundIdx === -1) {
        renderOverviewView();
        return;
      }

      var item = ALL_LESSONS[foundIdx];
      var lesson = item.lesson;
      var prevItem = foundIdx > 0 ? ALL_LESSONS[foundIdx - 1] : null;
      var nextItem = foundIdx < ALL_LESSONS.length - 1 ? ALL_LESSONS[foundIdx + 1] : null;
      var isDone = isLessonDone(lesson.id);

      saveState({ lastLessonId: lesson.id });
      document.title = 'Bài ' + lesson.number + ': ' + lesson.title + ' — ' + topicTitle;

      var codeCounter = 0;

      // Render các sections nội dung
      var sectionsHtml = (lesson.sections || []).map(function (sec, sIdx) {
        var examplesHtml = (sec.codeExamples || []).map(function (ex) {
          codeCounter++;
          var codeId = topicPrefix + '-code-' + lesson.id + '-' + sIdx + '-' + codeCounter;
          var lines = (ex.code || '').split('\n').map(function (line, lineIdx) {
            return '<div class="code-line"><span class="line-num">' + (lineIdx + 1) + '</span><span class="line-content">' + escapeHtml(line) + '</span></div>';
          }).join('');

          var annotationsHtml = '';
          if (Array.isArray(ex.annotations) && ex.annotations.length > 0) {
            annotationsHtml = '' +
              '<div class="code-annotations">' +
                '<div class="annotations-title">Giải thích từng thành phần của lệnh</div>' +
                '<ul class="annotation-list">' +
                  ex.annotations.map(function (ann) {
                    return '<li class="annotation-item"><span class="ann-line-badge">Dòng ' + escapeHtml(String(ann.line)) + '</span><span>' + formatInlineCode(ann.text) + '</span></li>';
                  }).join('') +
                '</ul>' +
              '</div>';
          }

          var outputHtml = '';
          if (ex.output) {
            outputHtml = '' +
              '<div class="code-output-block">' +
                '<div class="output-label"><span>Kết quả mong đợi (Terminal Output)</span></div>' +
                '<pre class="output-pre">' + escapeHtml(ex.output) + '</pre>' +
              '</div>';
          }

          return '' +
            '<div class="code-example-card">' +
              '<div class="code-card-header">' +
                '<div class="code-header-left">' +
                  '<span class="lang-tag">' + escapeHtml(ex.lang || 'CLI') + '</span>' +
                  '<span>' + escapeHtml(ex.title || 'Lệnh thực thi') + '</span>' +
                '</div>' +
                '<button type="button" class="copy-code-btn" data-copy-target="' + codeId + '" aria-label="Sao chép câu lệnh">' +
                  '<span>📋</span> <span class="copy-btn-text">Sao chép</span>' +
                '</button>' +
              '</div>' +
              '<textarea id="' + codeId + '" style="display:none;" readonly>' + escapeHtml(ex.code) + '</textarea>' +
              '<pre class="code-pre"><code>' + lines + '</code></pre>' +
              outputHtml +
              annotationsHtml +
            '</div>';
        }).join('');

        return '' +
          '<section id="' + escapeHtml(sec.id) + '" class="lesson-section">' +
            '<h2>' + escapeHtml(sec.title) + '</h2>' +
            '<div class="section-prose">' + (sec.content || '') + '</div>' +
            examplesHtml +
          '</section>';
      }).join('');

      // Callouts
      var callouts = lesson.callouts || {};
      var pitfallsHtml = (callouts.pitfalls || []).map(function (p) {
        return '' +
          '<div class="callout-box callout-pitfall">' +
            '<div class="callout-header"><span>⚠️ Lỗi thường gặp:</span> <span>' + formatInlineCode(p.title) + '</span></div>' +
            '<div class="callout-body"><p>' + formatInlineCode(p.content) + '</p></div>' +
          '</div>';
      }).join('');

      var tipsHtml = (callouts.tips || []).map(function (t) {
        return '' +
          '<div class="callout-box callout-tip">' +
            '<div class="callout-header"><span>💡 Ghi nhớ hữu ích:</span> <span>' + formatInlineCode(t.title) + '</span></div>' +
            '<div class="callout-body"><p>' + formatInlineCode(t.content) + '</p></div>' +
          '</div>';
      }).join('');

      // Exercises
      var exercisesHtml = (lesson.exercises || []).map(function (ex, exIdx) {
        var exTitle = ex.title || ('Thử thách thực hành ' + (exIdx + 1));
        var exProblem = ex.problem || ex.question || '';
        var exCode = ex.solutionCode || ex.command || '';
        var exOutput = ex.solutionOutput || '';
        var exLevel = ex.level || 'Vừa';
        var exExplanation = ex.explanation || '';
        var exHint = ex.hint || '';

        var solLines = exCode ? exCode.split('\n').map(function (l, idx) {
          return '<div class="code-line"><span class="line-num">' + (idx + 1) + '</span><span class="line-content">' + escapeHtml(l) + '</span></div>';
        }).join('') : '';

        var solCard = solLines ? ('' +
          '<div class="code-example-card" style="margin:10px 0;">' +
            '<div class="code-card-header">' +
              '<div class="code-header-left">' +
                '<span class="lang-tag">Lời giải mẫu</span>' +
                '<span>' + escapeHtml(exTitle) + '</span>' +
              '</div>' +
            '</div>' +
            '<pre class="code-pre"><code>' + solLines + '</code></pre>' +
            (exOutput ? '<div class="code-output-block"><div class="output-label"><span>Kết quả</span></div><pre class="output-pre">' + escapeHtml(exOutput) + '</pre></div>' : '') +
          '</div>'
        ) : '';

        var explanationHtml = '';
        if (exExplanation) {
          explanationHtml = '' +
            '<div class="solution-explanation" style="margin-top:12px;padding-top:10px;border-top:1px dashed var(--border-subtle);font-size:0.92rem;line-height:1.65;">' +
              '<strong>Giải thích:</strong>' +
              '<div style="margin-top:4px;">' + formatMultilineHtml(exExplanation) + '</div>' +
            '</div>';
        }

        return '' +
          '<div class="exercise-card">' +
            '<div class="exercise-header">' +
              '<span class="ex-level-badge ' + (exLevel === 'Dễ' ? 'ex-easy' : exLevel === 'Vừa' ? 'ex-medium' : 'ex-hard') + '">Mức: ' + escapeHtml(exLevel) + '</span>' +
              '<span class="exercise-title">' + formatInlineCode(exTitle) + '</span>' +
            '</div>' +
            '<div class="exercise-problem" style="line-height:1.65;margin-bottom:10px;">' + formatMultilineHtml(exProblem) + '</div>' +
            (exHint ? '<div class="exercise-hint" style="margin-bottom:10px;"><strong>Gợi ý:</strong> ' + formatMultilineHtml(exHint) + '</div>' : '') +
            '<details class="solution-details">' +
              '<summary class="solution-summary">👁️ Bấm để xem đáp án lệnh &amp; giải thích chi tiết</summary>' +
              '<div class="solution-body">' +
                solCard +
                explanationHtml +
              '</div>' +
            '</details>' +
          '</div>';
      }).join('');

      // Summary
      var summaryHtml = (lesson.summary || []).map(function (line) {
        return '<li>' + formatInlineCode(line) + '</li>';
      }).join('');

      // Thử thách bản chất (Reflection Challenge)
      var reflectionHtml = '';
      if (lesson.reflectionQuestion) {
        reflectionHtml = '' +
          '<section id="sec-reflection" class="net-reflection-box">' +
            '<div class="net-reflection-header">' +
              '<span class="net-reflection-icon" aria-hidden="true">🧠</span>' +
              '<span class="net-reflection-title">Thử thách bản chất — Giải thích bằng lời của bạn</span>' +
            '</div>' +
            '<div class="net-reflection-prompt">' +
              '<p><strong>Câu hỏi:</strong> ' + formatMultilineHtml(lesson.reflectionQuestion) + '</p>' +
            '</div>' +
            (lesson.reflectionHint ? (
              '<details class="net-reflection-details">' +
                '<summary class="net-reflection-summary">🔍 Xem gợi ý suy ngẫm từ giảng viên</summary>' +
                '<div class="net-reflection-hint-content">' +
                  formatMultilineHtml(lesson.reflectionHint) +
                '</div>' +
              '</details>'
            ) : '') +
          '</section>';
      }

      // Thẻ cầu nối bài tiếp theo (Spiral Learning Bridge)
      var nextBridgeHtml = '';
      if (lesson.nextLessonPreview) {
        nextBridgeHtml = '' +
          '<div class="net-next-bridge-card">' +
            '<div class="net-next-bridge-header">' +
              '<span class="net-next-bridge-badge">MẮT XÍCH TIẾP THEO</span>' +
              '<span class="net-next-bridge-title">Bước đệm kiến thức xoắn ốc</span>' +
            '</div>' +
            '<p class="net-next-bridge-text">' + formatInlineCode(lesson.nextLessonPreview) + '</p>' +
          '</div>';
      }

      var intuitionHtml = '';
      if (lesson.intuition) {
        intuitionHtml = '' +
          '<section id="sec-intuition" class="intuition-box ' + topicPrefix + '-intuition-box">' +
            '<div class="intuition-header ' + topicPrefix + '-intuition-header">' +
              '<span class="' + topicPrefix + '-intuition-icon-pill" aria-hidden="true">💡</span>' +
              '<span class="' + topicPrefix + '-intuition-title-text">2. Trực giác: ' + escapeHtml(lesson.intuition.title) + '</span>' +
            '</div>' +
            '<p class="intuition-metaphor ' + topicPrefix + '-intuition-metaphor">' + formatInlineCode(lesson.intuition.metaphor) + '</p>' +
            (lesson.intuition.visualHtml ? '<div class="intuition-visual ' + topicPrefix + '-intuition-visual">' + lesson.intuition.visualHtml + '</div>' : '') +
          '</section>';
      }

      mainEl.innerHTML = '' +
        '<article class="lesson-article">' +
          '<header class="lesson-header">' +
            '<div class="lesson-meta-row">' +
              '<span class="part-breadcrumb">' + escapeHtml(topicTitle) + ' › ' + escapeHtml(item.partNumber) + ': ' + escapeHtml(item.partTitle) + ' › Bài ' + escapeHtml(lesson.number) + '</span>' +
              '<span class="level-badge ' + getLevelBadgeClass(lesson.level) + '">' + escapeHtml(lesson.level) + '</span>' +
              '<span class="level-badge" style="background:var(--bg-surface-alt);color:var(--text-secondary);">⏱ ' + escapeHtml(lesson.duration || '30 phút') + '</span>' +
            '</div>' +
            '<h1>Bài ' + escapeHtml(lesson.number) + ': ' + escapeHtml(lesson.title) + '</h1>' +
            (lesson.subtitle ? '<p class="lesson-subtitle">' + escapeHtml(lesson.subtitle) + '</p>' : '') +
          '</header>' +

          '<section class="objectives-box" id="sec-objectives">' +
            '<div class="objectives-title"><span>🎯</span> <span>1. Mục tiêu bài học</span></div>' +
            '<ul class="objectives-list">' +
              (lesson.objectives || []).map(function (obj) {
                return '<li><span class="obj-check">✓</span> <span>' + formatInlineCode(obj) + '</span></li>';
              }).join('') +
            '</ul>' +
          '</section>' +

          intuitionHtml +
          sectionsHtml +

          (pitfallsHtml || tipsHtml ? (
            '<section id="sec-callouts">' +
              '<h2>Lưu ý Quan trọng &amp; Cạm bẫy thực tế</h2>' +
              pitfallsHtml +
              tipsHtml +
            '</section>'
          ) : '') +

          (exercisesHtml ? (
            '<section id="sec-exercises">' +
              '<h2>Bài tập &amp; Thử thách Thực chiến</h2>' +
              '<div class="exercises-container">' + exercisesHtml + '</div>' +
            '</section>'
          ) : '') +

          (summaryHtml ? (
            '<section id="sec-summary" class="summary-box">' +
              '<div class="summary-title"><span>📌</span> <span>Tóm tắt Bài học</span></div>' +
              '<ul>' + summaryHtml + '</ul>' +
            '</section>'
          ) : '') +

          reflectionHtml +

          '<div class="complete-lesson-bar">' +
            '<div>' +
              '<strong>Tiến độ bài học:</strong> ' +
              '<span style="color:var(--text-muted);font-size:0.88rem;margin-left:6px;">Đánh dấu để lưu vết lộ trình cá nhân của bạn.</span>' +
            '</div>' +
            '<button type="button" id="btn-toggle-complete" class="btn-complete-toggle ' + (isDone ? 'completed' : '') + '">' +
              '<span>' + (isDone ? '✓ Đã hoàn thành bài học' : '○ Đánh dấu hoàn thành') + '</span>' +
            '</button>' +
          '</div>' +

          nextBridgeHtml +

          '<nav class="lesson-prev-next" aria-label="Điều hướng bài trước và bài sau">' +
            (prevItem ? (
              '<button type="button" class="prev-next-card prev" data-nav="' + prevItem.lesson.id + '">' +
                '<span class="pn-direction">← Bài trước <kbd class="kbd-hint">[</kbd></span>' +
                '<span class="pn-title">Bài ' + escapeHtml(prevItem.lesson.number) + ': ' + escapeHtml(prevItem.lesson.title) + '</span>' +
              '</button>'
            ) : (
              '<button type="button" class="prev-next-card prev" data-nav="overview">' +
                '<span class="pn-direction">← Quay lại <kbd class="kbd-hint">[</kbd></span>' +
                '<span class="pn-title">Tổng quan Lộ trình ' + escapeHtml(topicTitle) + '</span>' +
              '</button>'
            )) +
            (nextItem ? (
              '<button type="button" class="prev-next-card next" data-nav="' + nextItem.lesson.id + '">' +
                '<span class="pn-direction"><kbd class="kbd-hint">]</kbd> Bài tiếp theo →</span>' +
                '<span class="pn-title">Bài ' + escapeHtml(nextItem.lesson.number) + ': ' + escapeHtml(nextItem.lesson.title) + '</span>' +
              '</button>'
            ) : (
              '<button type="button" class="prev-next-card next" data-nav="overview">' +
                '<span class="pn-direction">🎉 Hoàn thành Chuyên đề →</span>' +
                '<span class="pn-title">Về Trang Tổng quan</span>' +
              '</button>'
            )) +
          '</nav>' +
        '</article>';

      mainEl.querySelectorAll('.copy-code-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var targetId = btn.dataset.copyTarget;
          var textarea = document.getElementById(targetId);
          if (!textarea) return;
          var rawCode = textarea.value;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(rawCode).catch(function () {
              try {
                textarea.style.display = 'block';
                textarea.select();
                document.execCommand('copy');
                textarea.style.display = 'none';
              } catch (_e) {}
            });
          } else {
            textarea.style.display = 'block';
            textarea.select();
            document.execCommand('copy');
            textarea.style.display = 'none';
          }
          btn.classList.add('copied');
          var labelSpan = btn.querySelector('.copy-btn-text');
          if (labelSpan) labelSpan.textContent = 'Đã chép!';
          setTimeout(function () {
            btn.classList.remove('copied');
            if (labelSpan) labelSpan.textContent = 'Sao chép';
          }, 1800);
        });
      });

      var completeBtn = document.getElementById('btn-toggle-complete');
      if (completeBtn) {
        completeBtn.addEventListener('click', function () {
          var nowCompleted = toggleLessonDone(lesson.id);
          completeBtn.classList.toggle('completed', nowCompleted);
          completeBtn.innerHTML = '<span>' + (nowCompleted ? '✓ Đã hoàn thành bài học' : '○ Đánh dấu hoàn thành') + '</span>';
          renderSidebar();
        });
      }

      mainEl.querySelectorAll('[data-nav]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          navigateTo(btn.dataset.nav);
        });
      });

      if (tocEl) {
        if (tocObserver) {
          tocObserver.disconnect();
          tocObserver = null;
        }

        var tocList = [
          { id: 'sec-objectives', label: '1. Mục tiêu bài học' },
          ...(lesson.intuition ? [{ id: 'sec-intuition', label: '2. Trực giác' }] : []),
          ...(lesson.sections || []).map(function (s) { return { id: s.id, label: s.title }; }),
          ...(pitfallsHtml || tipsHtml ? [{ id: 'sec-callouts', label: 'Lưu ý & Cạm bẫy' }] : []),
          ...(exercisesHtml ? [{ id: 'sec-exercises', label: 'Bài tập thực hành' }] : []),
          ...(summaryHtml ? [{ id: 'sec-summary', label: 'Tóm tắt bài học' }] : []),
          ...(lesson.reflectionQuestion ? [{ id: 'sec-reflection', label: 'Thử thách bản chất' }] : [])
        ];

        tocEl.innerHTML = '' +
          '<div class="toc-heading">Trong bài này</div>' +
          '<ul class="toc-list">' +
            tocList.map(function (it) {
              return '<li><a class="toc-link" href="#' + escapeHtml(it.id) + '" data-toc-target="' + escapeHtml(it.id) + '">' + escapeHtml(it.label) + '</a></li>';
            }).join('') +
          '</ul>';

        tocEl.querySelectorAll('.toc-link').forEach(function (link) {
          link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = link.dataset.tocTarget;
            var targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });

        if ('IntersectionObserver' in window) {
          tocObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                var activeId = entry.target.id;
                tocEl.querySelectorAll('.toc-link').forEach(function (a) {
                  a.classList.toggle('active', a.dataset.tocTarget === activeId);
                });
              }
            });
          }, { rootMargin: '-80px 0px -70% 0px', threshold: 0.05 });

          tocList.forEach(function (item) {
            var el = document.getElementById(item.id);
            if (el) tocObserver.observe(el);
          });
        }
      }

      if (typeof window !== 'undefined' && typeof window.renderMathInElement === 'function') {
        try {
          window.renderMathInElement(mainEl, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: true }
            ],
            ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            throwOnError: false
          });
        } catch (_mathErr) {}
      }

      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    function navigateTo(targetId) {
      if (!targetId || targetId === 'overview') {
        currentView = 'overview';
        try {
          window.history.replaceState(null, '', '#overview');
        } catch (_e) {
          window.location.hash = 'overview';
        }
        closeDrawer();
        renderSidebar();
        renderOverviewView();
        return;
      }

      currentView = targetId;
      var selectedItem = ALL_LESSONS.find(function (it) { return it.lesson.id === targetId; });
      if (selectedItem) {
        partOpenState[selectedItem.partId] = true;
        if (activeFilter !== 'all' && selectedItem.partId !== activeFilter) {
          activeFilter = 'all';
        }
      }
      closeDrawer();
      try {
        window.history.replaceState(null, '', '#lesson=' + targetId);
      } catch (_e) {
        window.location.hash = 'lesson=' + targetId;
      }
      renderSidebar();
      renderLessonView(targetId);
    }

    function closeDrawer() {
      var sidebar = document.getElementById('sidebar-left');
      var backdrop = document.getElementById('sidebar-backdrop');
      if (sidebar) sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.classList.remove('scroll-lock');
    }

    function initThemeAndFontSync() {
      var themeBtn = document.getElementById('theme-toggle-btn');
      var fontBtns = document.querySelectorAll('.font-btn');

      function readSharedThemeAndFont() {
        var theme = 'light';
        var fontSize = 'medium';
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            var raw = window.localStorage.getItem(STORAGE_KEY_PYTHON);
            if (raw) {
              var parsed = JSON.parse(raw);
              if (parsed.theme) theme = parsed.theme;
              if (parsed.fontSize) fontSize = parsed.fontSize;
            }
          }
        } catch (_e) {}

        if (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          theme = 'dark';
        }

        return { theme: theme || 'light', fontSize: fontSize || 'medium' };
      }

      function saveSharedThemeAndFont(partial) {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            var raw = window.localStorage.getItem(STORAGE_KEY_PYTHON);
            var cur = raw ? JSON.parse(raw) : {};
            var next = Object.assign({}, cur, partial);
            window.localStorage.setItem(STORAGE_KEY_PYTHON, JSON.stringify(next));
          }
        } catch (_e) {}
      }

      function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeBtn) {
          themeBtn.innerHTML = theme === 'dark'
            ? '<span>☀️</span> <span class="btn-label">Sáng</span>'
            : '<span>🌙</span> <span class="btn-label">Tối</span>';
          themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối');
        }
      }

      function applyFontSize(size) {
        document.documentElement.setAttribute('data-font-size', size);
        fontBtns.forEach(function (btn) {
          btn.classList.toggle('active', btn.dataset.size === size);
        });
      }

      var initial = readSharedThemeAndFont();
      applyTheme(initial.theme);
      applyFontSize(initial.fontSize);

      if (themeBtn) {
        themeBtn.addEventListener('click', function () {
          var cur = document.documentElement.getAttribute('data-theme') || 'light';
          var next = cur === 'dark' ? 'light' : 'dark';
          applyTheme(next);
          saveSharedThemeAndFont({ theme: next });
        });
      }

      fontBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var size = btn.dataset.size;
          applyFontSize(size);
          saveSharedThemeAndFont({ fontSize: size });
        });
      });
    }

    function boot() {
      initThemeAndFontSync();

      var progressFill = document.getElementById('reading-progress-fill');
      var backToTopBtn = document.getElementById('back-to-top-btn');

      function updateScrollIndicators() {
        if (progressFill) {
          var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (maxScroll <= 0) {
            progressFill.style.width = '0%';
          } else {
            var pct = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
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

      window.addEventListener('scroll', updateScrollIndicators, { passive: true });

      if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      function navigatePrevious() {
        if (currentView === 'overview') return;
        var idx = -1;
        for (var i = 0; i < ALL_LESSONS.length; i++) {
          if (ALL_LESSONS[i].lesson.id === currentView) {
            idx = i;
            break;
          }
        }
        if (idx > 0) {
          navigateTo(ALL_LESSONS[idx - 1].lesson.id);
        } else if (idx === 0) {
          navigateTo('overview');
        }
      }

      function navigateNext() {
        if (currentView === 'overview') {
          if (ALL_LESSONS.length > 0) {
            navigateTo(ALL_LESSONS[0].lesson.id);
          }
          return;
        }
        var idx = -1;
        for (var i = 0; i < ALL_LESSONS.length; i++) {
          if (ALL_LESSONS[i].lesson.id === currentView) {
            idx = i;
            break;
          }
        }
        if (idx >= 0 && idx < ALL_LESSONS.length - 1) {
          navigateTo(ALL_LESSONS[idx + 1].lesson.id);
        }
      }

      window.addEventListener('keydown', function (e) {
        var tag = document.activeElement ? document.activeElement.tagName : '';
        if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(tag) !== -1 || (document.activeElement && document.activeElement.isContentEditable)) {
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

      document.getElementById(topNavId)?.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo('overview');
      });
      document.getElementById('brand-home-link')?.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo('overview');
      });

      var menuBtn = document.getElementById('menu-toggle-btn');
      var sidebar = document.getElementById('sidebar-left');
      var backdrop = document.getElementById('sidebar-backdrop');
      var closeBtn = document.getElementById('sidebar-close-btn');

      if (menuBtn) {
        menuBtn.addEventListener('click', function () {
          var isOpen = sidebar?.classList.toggle('open');
          backdrop?.classList.toggle('open', Boolean(isOpen));
          document.body.classList.toggle('scroll-lock', Boolean(isOpen));
        });
      }
      if (backdrop) backdrop.addEventListener('click', closeDrawer);
      if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

      var treeEl = document.getElementById('curriculum-tree');
      if (sidebar && treeEl) {
        sidebar.addEventListener('wheel', function (e) {
          if (!treeEl.contains(e.target)) {
            treeEl.scrollTop += e.deltaY;
          }
        }, { passive: true });
      }

      function handleRouteFromHash() {
        var hash = window.location.hash || '';
        var match = hash.match(/lesson=([a-z0-9-]+)/i);
        if (match && ALL_LESSONS.some(function (it) { return it.lesson.id === match[1]; })) {
          navigateTo(match[1]);
        } else {
          navigateTo('overview');
        }
      }

      window.addEventListener('hashchange', handleRouteFromHash);
      handleRouteFromHash();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  }

  window.TopicEngine = {
    createApp: createApp,
    escapeHtml: escapeHtml,
    formatInlineCode: formatInlineCode
  };
})();
