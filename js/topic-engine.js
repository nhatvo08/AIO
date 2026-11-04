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
    var coursesConfig = config.courses || null;
    var partIdToCourseId = {};
    var rawParts = config.parts || [];
    if (Array.isArray(coursesConfig) && coursesConfig.length > 0) {
      coursesConfig.forEach(function (c) {
        (c.parts || []).forEach(function (p) {
          if (p) {
            partIdToCourseId[p.id] = c.id;
            if (rawParts.indexOf(p) === -1) {
              rawParts.push(p);
            }
          }
        });
      });
    }
    if (config.referenceData) {
      rawParts.push(config.referenceData);
    }
    var PARTS = rawParts.filter(Boolean);
    var standaloneParts = PARTS.filter(function (p) {
      return !partIdToCourseId[p.id];
    });
    var PART_ICONS = config.partIcons || {};
    var heroConfig = config.hero || {};
    var topNavId = config.topNavId || ('top-nav-' + topicId);
    var initialDocTitle = (typeof document !== 'undefined' && document.title) ? document.title : topicTitle;
    var updateScrollIndicators = function () {};

    // Thu thập danh sách phẳng tất cả bài học
    var ALL_LESSONS = [];
    var codeHighlighter = typeof config.highlightCode === 'function' ? config.highlightCode : null;
    PARTS.forEach(function (part) {
      var partLessons = part.lessons || [];
      partLessons.forEach(function (lesson, lIdx) {
        ALL_LESSONS.push({
          part: part,
          partId: part.id,
          courseId: partIdToCourseId[part.id] || null,
          partNumber: part.number,
          partTitle: part.title,
          partLevel: part.level,
          isLastInPart: lIdx === partLessons.length - 1,
          lesson: lesson
        });
      });
    });

    function doesItemMatchFilter(item, filterStr) {
      if (!filterStr || filterStr === 'all') return true;
      var allowed = filterStr.split(',').map(function (s) { return s.trim(); });
      if (allowed.indexOf(item.partId) !== -1) return true;
      if (item.courseId && allowed.indexOf(item.courseId) !== -1) return true;
      return false;
    }

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

    var currentView = null;
    var activeFilter = 'all';
    var tocObserver = null;
    var setActiveTocFn = null;
    var lastTocTargetId = '';
    var tocClickLockUntil = 0;
    var partOpenState = {};
    var searchQuery = '';

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

    function normalizeSearch(str) {
      return (str || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
    }

    function renderSidebar() {
      var state = loadState();
      var totalCount = ALL_LESSONS.length;
      var completedCount = ALL_LESSONS.filter(function (it) {
        return state.completed.indexOf(it.lesson.id) !== -1;
      }).length;
      var pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      var fillEl = document.getElementById('sidebar-progress-fill');
      var pctEl = document.getElementById('sidebar-progress-pct');
      var statsEl = document.getElementById('sidebar-progress-stats');
      var treeEl = document.getElementById('curriculum-tree');

      if (fillEl) {
        fillEl.style.width = pct + '%';
        var tier = pct < 25 ? 'tier-1' : (pct < 50 ? 'tier-2' : (pct < 75 ? 'tier-3' : (pct < 100 ? 'tier-4' : 'tier-5')));
        fillEl.setAttribute('data-tier', tier);
        fillEl.classList.remove('tier-1', 'tier-2', 'tier-3', 'tier-4', 'tier-5');
        fillEl.classList.add(tier);
      }
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
            activeFilter.split(',').forEach(function (pid) {
              partOpenState[pid.trim()] = true;
            });
          }
          filterBtns.forEach(function (b) {
            var bVal = b.dataset.courseFilter || b.dataset.filter;
            b.classList.toggle('active', bVal === activeFilter);
          });
          renderSidebar();
        };
      });

      if (!treeEl) return;

      var q = normalizeSearch(searchQuery);

      function renderSinglePartGroup(part) {
        var allPartLessons = part.lessons || [];
        var partLessons = q
          ? allPartLessons.filter(function (l) {
              var numMatch = normalizeSearch(l.number).includes(q);
              var titleMatch = normalizeSearch(l.title).includes(q);
              var kwMatch = (l.keywords || []).some(function (k) { return normalizeSearch(k).includes(q); });
              return numMatch || titleMatch || kwMatch;
            })
          : allPartLessons;

        if (q && partLessons.length === 0) {
          return '';
        }

        var partDoneCount = allPartLessons.filter(function (l) { return isLessonDone(l.id); }).length;
        var hasActiveLesson = partLessons.some(function (l) { return l.id === currentView; });
        var isOpen = q ? true : (hasActiveLesson || Boolean(partOpenState[part.id]));
        var isCollapsed = !isOpen;
        var icon = PART_ICONS[part.id] || part.icon || '';

        var lessonsHtml = partLessons.map(function (l) {
          var isDone = isLessonDone(l.id);
          var isActive = currentView === l.id;
          var isRef = l.id.includes('-ref-') || l.id.startsWith('sql-map-') || l.id.startsWith('sql-sample-');
          var badgeHtml = '';
          if (isRef) {
            badgeHtml = '<span class="' + topicPrefix + '-nav-pill-mini">Tra cứu</span>';
          } else if (l.circuit === 'dq' || (l.title && l.title.includes('[DQ]'))) {
            badgeHtml = '<span class="circuit-badge circuit-badge-dq" style="font-size:0.65rem;padding:1px 5px;margin-left:auto;margin-right:0;">DQ</span>';
          } else if (l.circuit === 'fe' || (l.title && l.title.includes('[FE]'))) {
            badgeHtml = '<span class="circuit-badge circuit-badge-fe" style="font-size:0.65rem;padding:1px 5px;margin-left:auto;margin-right:0;">FE</span>';
          } else if (l.circuit === 'scale' || (l.title && l.title.includes('[SCALE]'))) {
            badgeHtml = '<span class="circuit-badge circuit-badge-scale" style="font-size:0.65rem;padding:1px 5px;margin-left:auto;margin-right:0;">SCALE</span>';
          } else if (l.badge) {
            badgeHtml = '<span class="' + topicPrefix + '-nav-pill-mini">' + escapeHtml(l.badge) + '</span>';
          }

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
                ' <small style="color:var(--text-muted);font-weight:500;">(' + (q ? (partLessons.length + ' khớp') : (partDoneCount + '/' + allPartLessons.length)) + ')</small>' +
              '</span>' +
              '<span class="part-chevron">▾</span>' +
            '</button>' +
            '<ul class="part-lessons">' + lessonsHtml + '</ul>' +
          '</div>';
      }

      if (Array.isArray(coursesConfig) && coursesConfig.length > 0) {
        var coursesSidebarHtml = coursesConfig.map(function (course) {
          var courseParts = (course.parts || []).filter(function (p) {
            if (activeFilter === 'all') return true;
            if (activeFilter === course.id) return true;
            var allowed = activeFilter.split(',').map(function (s) { return s.trim(); });
            return allowed.indexOf(p.id) !== -1 || allowed.indexOf(course.id) !== -1;
          });

          if (courseParts.length === 0 && activeFilter !== 'all') {
            return '';
          }

          var courseTotalLessons = 0;
          var courseCompletedLessons = 0;
          (course.parts || []).forEach(function (part) {
            (part.lessons || []).forEach(function (l) {
              courseTotalLessons++;
              if (isLessonDone(l.id)) courseCompletedLessons++;
            });
          });

          var banner = course.banner || {};
          var bannerNumber = banner.number || course.number || '';
          var bannerTitle = banner.title || course.title || '';
          var bannerIcon = banner.icon || course.icon || '🌐';
          var bannerClass = banner.customClass || course.customClass || (topicPrefix + '-banner');
          var bannerBadge = (banner.badge || course.badge)
            ? ('<span class="sidebar-course-badge" style="margin-left:auto;font-size:0.68rem;padding:1px 6px;border-radius:var(--radius-xs);background:var(--accent-soft);color:var(--accent-primary);border:1px solid var(--border-subtle);">' + escapeHtml(banner.badge || course.badge) + '</span>')
            : '';

          var renderedParts = courseParts.map(renderSinglePartGroup).filter(Boolean).join('');
          if (q && !renderedParts) {
            return '';
          }

          return '' +
            '<div class="sidebar-course-section" data-course-id="' + escapeHtml(course.id) + '">' +
              '<div class="sidebar-course-banner ' + bannerClass + '">' +
                '<div class="sidebar-course-banner-top">' +
                  '<span class="sidebar-course-number-tag">' + escapeHtml(bannerNumber) + '</span>' +
                  '<span class="sidebar-course-count">' + courseCompletedLessons + '/' + courseTotalLessons + ' bài</span>' +
                '</div>' +
                '<div class="sidebar-course-title">' +
                  '<span class="course-banner-icon" aria-hidden="true">' + bannerIcon + '</span>' +
                  '<span>' + escapeHtml(bannerTitle) + '</span>' +
                  bannerBadge +
                '</div>' +
              '</div>' +
              renderedParts +
            '</div>';
        }).filter(Boolean).join('');

        var standaloneSidebarHtml = '';
        if (standaloneParts.length > 0) {
          var filteredStandalone = standaloneParts.filter(function (p) {
            if (activeFilter === 'all') return true;
            var allowed = activeFilter.split(',').map(function (s) { return s.trim(); });
            return allowed.indexOf(p.id) !== -1;
          });
          if (filteredStandalone.length > 0) {
            var standaloneTotal = 0;
            var standaloneDone = 0;
            standaloneParts.forEach(function (p) {
              (p.lessons || []).forEach(function (l) {
                standaloneTotal++;
                if (isLessonDone(l.id)) standaloneDone++;
              });
            });
            var renderedStandalone = filteredStandalone.map(renderSinglePartGroup).filter(Boolean).join('');
            if (!q || renderedStandalone) {
              var firstRef = filteredStandalone[0];
              var refIcon = PART_ICONS[firstRef.id] || firstRef.icon || '📚';
              standaloneSidebarHtml = '' +
                '<div class="sidebar-course-section" data-course-id="' + escapeHtml(firstRef.id) + '">' +
                  '<div class="sidebar-course-banner ' + topicPrefix + '-banner">' +
                    '<div class="sidebar-course-banner-top">' +
                      '<span class="sidebar-course-number-tag">' + escapeHtml(firstRef.number || 'Tra cứu') + '</span>' +
                      '<span class="sidebar-course-count">' + standaloneDone + '/' + standaloneTotal + ' bài</span>' +
                    '</div>' +
                    '<div class="sidebar-course-title">' +
                      '<span class="course-banner-icon" aria-hidden="true">' + refIcon + '</span>' +
                      '<span>' + escapeHtml(firstRef.title || 'Tài liệu Tra cứu & Bản đồ') + '</span>' +
                    '</div>' +
                  '</div>' +
                  renderedStandalone +
                '</div>';
            }
          }
        }

        treeEl.innerHTML = coursesSidebarHtml + standaloneSidebarHtml;
      } else {
        var filteredParts = activeFilter === 'all'
          ? PARTS
          : PARTS.filter(function (p) {
              var allowed = activeFilter.split(',').map(function (s) { return s.trim(); });
              return allowed.indexOf(p.id) !== -1;
            });

        var partsHtml = filteredParts.map(renderSinglePartGroup).filter(Boolean).join('');

        if (config.courseBanner) {
          var banner = config.courseBanner;
          var bannerNumber = banner.number || 'Học phần II';
          var bannerTitle = banner.title || topicTitle;
          var bannerIcon = banner.icon || '🌐';
          var bannerClass = banner.customClass || (topicPrefix + '-banner');
          var bannerBadge = banner.badge
            ? ('<span class="sidebar-course-badge" style="margin-left:auto;font-size:0.68rem;padding:1px 6px;border-radius:var(--radius-xs);background:var(--accent-soft);color:var(--accent-primary);border:1px solid var(--border-subtle);">' + escapeHtml(banner.badge) + '</span>')
            : '';

          treeEl.innerHTML = (q && !partsHtml) ? '' : ('' +
            '<div class="sidebar-course-section" data-course-id="course-' + topicId + '">' +
              '<div class="sidebar-course-banner ' + bannerClass + '">' +
                '<div class="sidebar-course-banner-top">' +
                  '<span class="sidebar-course-number-tag">' + escapeHtml(bannerNumber) + '</span>' +
                  '<span class="sidebar-course-count">' + completedCount + '/' + totalCount + ' bài</span>' +
                '</div>' +
                '<div class="sidebar-course-title">' +
                  '<span class="course-banner-icon" aria-hidden="true">' + bannerIcon + '</span>' +
                  '<span>' + escapeHtml(bannerTitle) + '</span>' +
                  bannerBadge +
                '</div>' +
              '</div>' +
              partsHtml +
            '</div>');
        } else {
          treeEl.innerHTML = partsHtml;
        }
      }

      if (q && !treeEl.querySelector('.lesson-nav-btn')) {
        treeEl.innerHTML = '' +
          '<div class="sidebar-empty-search">' +
            '<p style="font-size:1.3rem;margin-bottom:6px;" aria-hidden="true">🔍</p>' +
            '<p>Không tìm thấy bài học nào với từ khóa</p>' +
            '<p style="color:var(--text-primary);font-weight:700;margin-top:4px;">“' + escapeHtml(searchQuery) + '”</p>' +
          '</div>';
      }

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
          closeDrawer();
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

      if (tocObserver) {
        tocObserver.disconnect();
        tocObserver = null;
      }
      setActiveTocFn = null;
      lastTocTargetId = '';
      tocClickLockUntil = 0;
      if (initialDocTitle) {
        document.title = initialDocTitle;
      }

      mainEl.classList.add('wide-view');
      var state = loadState();
      var totalCount = ALL_LESSONS.length;
      var completedCount = ALL_LESSONS.filter(function (it) {
        return state.completed.indexOf(it.lesson.id) !== -1;
      }).length;

      var resumeItem = ALL_LESSONS.find(function (item) {
        return state.completed.indexOf(item.lesson.id) === -1;
      }) || ALL_LESSONS[0];

      var heroStyle = heroConfig.accentColor ? ' style="border-left: 5px solid ' + escapeHtml(heroConfig.accentColor) + ';"' : '';
      var eyebrowStyle = heroConfig.eyebrowStyle ? ' style="' + escapeHtml(heroConfig.eyebrowStyle) + '"' : '';
      var resumeBtnStyle = heroConfig.accentColor ? ' style="background:' + escapeHtml(heroConfig.accentColor) + ';"' : '';
      var statValueStyle = heroConfig.accentColor ? ' style="color:' + escapeHtml(heroConfig.accentColor) + ';"' : '';

      function renderSinglePartCard(part) {
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
        var pillIcon = (PART_ICONS[part.id] ? PART_ICONS[part.id] + ' ' : (part.icon ? part.icon + ' ' : ''));

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
      }

      var partsHtml = PARTS.map(renderSinglePartCard).join('');

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

      var coursePct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      var banner = config.courseBanner;
      var roadmapSectionHtml = '';

      if (Array.isArray(coursesConfig) && coursesConfig.length > 0) {
        roadmapSectionHtml = coursesConfig.map(function (course) {
          var courseParts = course.parts || [];
          var courseTotal = 0;
          var courseDone = 0;
          courseParts.forEach(function (p) {
            (p.lessons || []).forEach(function (l) {
              courseTotal++;
              if (isLessonDone(l.id)) courseDone++;
            });
          });
          var cPct = courseTotal > 0 ? Math.round((courseDone / courseTotal) * 100) : 0;
          var cBanner = course.banner || {};
          var bannerTheme = cBanner.customClass ? (cBanner.customClass.replace('-banner', '-theme')) : (course.customClass ? course.customClass.replace('-banner', '-theme') : (topicPrefix + '-theme'));
          var bannerBadge = cBanner.customClass ? (cBanner.customClass.replace('-banner', '-badge')) : (course.customClass ? course.customClass.replace('-banner', '-badge') : (topicPrefix + '-badge'));
          var bannerFill = cBanner.customClass ? (cBanner.customClass.replace('-banner', '-fill')) : (course.customClass ? course.customClass.replace('-banner', '-fill') : (topicPrefix + '-fill'));
          var bannerNumber = cBanner.number || course.number || '';
          var bannerTitle = cBanner.title || course.title || '';
          var bannerIcon = cBanner.icon || course.icon || '🌐';
          var bannerTag = cBanner.badge || course.badge || (courseParts.length + ' Phần');
          var courseDesc = course.desc || cBanner.desc || '';

          return '' +
            '<section class="course-home-section" id="home-' + escapeHtml(course.id) + '">' +
              '<div class="course-section-header-lg ' + bannerTheme + '">' +
                '<div class="course-header-badge-row">' +
                  '<span class="course-number-badge ' + bannerBadge + '">' + escapeHtml(bannerNumber) + '</span>' +
                  '<span class="course-tag-badge">' + escapeHtml(bannerTag) + '</span>' +
                  '<span class="course-meta-badge">' + courseParts.length + ' Phần • ' + courseTotal + ' Bài học</span>' +
                '</div>' +
                '<h2 class="course-title-lg">' +
                  '<span>' + bannerIcon + '</span> ' +
                  '<span>' + escapeHtml(bannerTitle) + '</span>' +
                '</h2>' +
                (courseDesc ? ('<p class="course-desc-lg">' + escapeHtml(courseDesc) + '</p>') : '') +
                '<div class="course-progress-indicator">' +
                  '<div class="course-prog-bar">' +
                    '<div class="course-prog-fill ' + bannerFill + '" style="width:' + cPct + '%;"></div>' +
                  '</div>' +
                  '<span>Tiến độ ' + escapeHtml(bannerNumber) + ': <strong>' + courseDone + '/' + courseTotal + '</strong> bài (' + cPct + '%)</span>' +
                '</div>' +
              '</div>' +
              '<div class="roadmap-grid">' + courseParts.map(renderSinglePartCard).join('') + '</div>' +
            '</section>';
        }).join('');

        if (standaloneParts.length > 0) {
          var stTotal = 0;
          var stDone = 0;
          standaloneParts.forEach(function (p) {
            (p.lessons || []).forEach(function (l) {
              stTotal++;
              if (isLessonDone(l.id)) stDone++;
            });
          });
          var stPct = stTotal > 0 ? Math.round((stDone / stTotal) * 100) : 0;
          var stFirst = standaloneParts[0];
          var stIcon = PART_ICONS[stFirst.id] || stFirst.icon || '📚';
          roadmapSectionHtml += '' +
            '<section class="course-home-section" id="home-' + escapeHtml(stFirst.id) + '">' +
              '<div class="course-section-header-lg ' + topicPrefix + '-theme">' +
                '<div class="course-header-badge-row">' +
                  '<span class="course-number-badge ' + topicPrefix + '-badge">' + escapeHtml(stFirst.number || 'Tra cứu') + '</span>' +
                  '<span class="course-tag-badge">Tài liệu tham chiếu</span>' +
                  '<span class="course-meta-badge">' + stTotal + ' Bài học</span>' +
                '</div>' +
                '<h2 class="course-title-lg">' +
                  '<span>' + stIcon + '</span> ' +
                  '<span>' + escapeHtml(stFirst.title || 'Tài liệu Tra cứu & Bản đồ') + '</span>' +
                '</h2>' +
                '<div class="course-progress-indicator">' +
                  '<div class="course-prog-bar">' +
                    '<div class="course-prog-fill ' + topicPrefix + '-fill" style="width:' + stPct + '%;"></div>' +
                  '</div>' +
                  '<span>Tiến độ: <strong>' + stDone + '/' + stTotal + '</strong> bài (' + stPct + '%)</span>' +
                '</div>' +
              '</div>' +
              '<div class="roadmap-grid">' + standaloneParts.map(renderSinglePartCard).join('') + '</div>' +
            '</section>';
        }
      } else if (banner) {
        var bannerTheme = banner.customClass ? (banner.customClass.replace('-banner', '-theme')) : (topicPrefix + '-theme');
        var bannerBadge = banner.customClass ? (banner.customClass.replace('-banner', '-badge')) : (topicPrefix + '-badge');
        var bannerFill = banner.customClass ? (banner.customClass.replace('-banner', '-fill')) : (topicPrefix + '-fill');
        var bannerNumber = banner.number || 'Học phần II';
        var bannerTitle = banner.title || topicTitle;
        var bannerIcon = banner.icon || '🌐';
        var bannerTag = banner.badge || (PARTS.length + ' Giai đoạn');

        roadmapSectionHtml = '' +
          '<section class="course-home-section" id="home-course-' + topicId + '">' +
            '<div class="course-section-header-lg ' + bannerTheme + '">' +
              '<div class="course-header-badge-row">' +
                '<span class="course-number-badge ' + bannerBadge + '">' + escapeHtml(bannerNumber) + '</span>' +
                '<span class="course-tag-badge">' + escapeHtml(bannerTag) + '</span>' +
                '<span class="course-meta-badge">' + PARTS.length + ' Giai đoạn • ' + totalCount + ' Bài học</span>' +
              '</div>' +
              '<h2 class="course-title-lg">' +
                '<span>' + bannerIcon + '</span> ' +
                '<span>' + escapeHtml(bannerTitle) + '</span>' +
              '</h2>' +
              '<p class="course-desc-lg">' + (heroConfig.desc || '') + '</p>' +
              '<div class="course-progress-indicator">' +
                '<div class="course-prog-bar">' +
                  '<div class="course-prog-fill ' + bannerFill + '" style="width:' + coursePct + '%;"></div>' +
                '</div>' +
                '<span>Tiến độ ' + escapeHtml(bannerNumber) + ': <strong>' + completedCount + '/' + totalCount + '</strong> bài (' + coursePct + '%)</span>' +
              '</div>' +
            '</div>' +
            '<div class="roadmap-grid">' + partsHtml + '</div>' +
          '</section>';
      } else {
        roadmapSectionHtml = '' +
          '<section>' +
            '<h2 class="roadmap-section-title">' + (heroConfig.roadmapTitle || 'Lộ trình Chuyên đề') + '</h2>' +
            '<div class="roadmap-grid">' + partsHtml + '</div>' +
          '</section>';
      }

      mainEl.innerHTML = '' +
        '<section class="hero-banner"' + heroStyle + '>' +
          '<div class="hero-eyebrow"' + eyebrowStyle + '>' + (heroConfig.eyebrow || ('<span>' + escapeHtml(topicTitle) + '</span>')) + '</div>' +
          '<h1 class="hero-title">' + (heroConfig.title || escapeHtml(topicTitle)) + '</h1>' +
          '<p class="hero-desc">' + (heroConfig.desc || '') + '</p>' +
          '<div class="hero-actions">' + heroActionsHtml + '</div>' +
          '<div class="hero-stats-grid">' + statsItemsHtml + '</div>' +
        '</section>' +
        extraSectionsHtml +
        '<div class="courses-roadmap-container">' +
          roadmapSectionHtml +
        '</div>';

      if (tocEl) {
        var extraToc = config.overviewExtraTocItems || [];
        var extraTocHtml = extraToc.map(function (item) {
          return '<li><a class="toc-link" href="#' + escapeHtml(item.id) + '">' + escapeHtml(item.label) + '</a></li>';
        }).join('');

        var coursesTocHtml = '';
        if (Array.isArray(coursesConfig) && coursesConfig.length > 0) {
          coursesTocHtml = coursesConfig.map(function (c) {
            var bNum = c.number || (c.banner ? c.banner.number : '');
            var bTitle = c.title || (c.banner ? c.banner.title : '');
            var bIcon = c.icon || (c.banner ? c.banner.icon : '🌐');
            var cParts = c.parts || [];
            return '' +
              '<div style="margin-top:12px;margin-bottom:6px;font-weight:700;font-size:0.75rem;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.04em;">' +
                '<a class="toc-link toc-course-title" href="#home-' + escapeHtml(c.id) + '" style="color:inherit;text-decoration:none;display:block;">' +
                  bIcon + ' ' + escapeHtml(bNum) + ': ' + escapeHtml(bTitle) +
                '</a>' +
              '</div>' +
              '<ul class="toc-list" style="margin-bottom:12px;">' +
                cParts.map(function (p) {
                  return '<li><a class="toc-link" href="#part-card-' + p.id + '"><strong>' + escapeHtml(p.number) + ':</strong> ' + escapeHtml(p.title) + '</a></li>';
                }).join('') +
              '</ul>';
          }).join('');
          if (standaloneParts.length > 0) {
            coursesTocHtml += '' +
              '<ul class="toc-list" style="margin-bottom:12px;">' +
                standaloneParts.map(function (p) {
                  return '<li><a class="toc-link" href="#part-card-' + p.id + '"><strong>' + escapeHtml(p.number) + ':</strong> ' + escapeHtml(p.title) + '</a></li>';
                }).join('') +
              '</ul>';
          }
        }

        var bannerTocHtml = banner ? ('' +
          '<div style="margin-top:12px;margin-bottom:6px;font-weight:700;font-size:0.75rem;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.04em;">' +
            '<a class="toc-link toc-course-title" href="#home-course-' + topicId + '" style="color:inherit;text-decoration:none;display:block;">' +
              banner.icon + ' ' + escapeHtml(banner.number) + ': ' + escapeHtml(banner.title) +
            '</a>' +
          '</div>'
        ) : '';

        tocEl.innerHTML = '' +
          '<div class="toc-heading">Lộ trình Khóa học</div>' +
          (extraTocHtml ? ('<ul class="toc-list" style="margin-bottom:8px;">' + extraTocHtml + '</ul>') : '') +
          (coursesTocHtml || (bannerTocHtml + '<ul class="toc-list">' +
            PARTS.map(function (p) {
              return '<li><a class="toc-link" href="#part-card-' + p.id + '">' + escapeHtml(p.number) + ': ' + escapeHtml(p.title) + '</a></li>';
            }).join('') +
          '</ul>'));

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
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      updateScrollIndicators();
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

      function renderSectionItem(sec, sIdx) {
        var examplesHtml = (sec.codeExamples || []).map(function (ex) {
          codeCounter++;
          var codeId = topicPrefix + '-code-' + lesson.id + '-' + sIdx + '-' + codeCounter;
          var lines = '';
          if (codeHighlighter) {
            lines = codeHighlighter(ex.code || '', ex.lang || 'SQL');
          } else {
            lines = (ex.code || '').split('\n').map(function (line, lineIdx) {
              return '<div class="code-line"><span class="line-num">' + (lineIdx + 1) + '</span><span class="line-content">' + escapeHtml(line) + '</span></div>';
            }).join('');
          }

          var annotationsHtml = '';
          if (Array.isArray(ex.annotations) && ex.annotations.length > 0) {
            annotationsHtml = '' +
              '<div class="code-annotations">' +
                '<div class="annotations-title">Giải thích từng thành phần của lệnh</div>' +
                '<ul class="annotation-list">' +
                  ex.annotations.map(function (ann, annIdx) {
                    var badgeLabel = '';
                    var bodyText = '';
                    if (typeof ann === 'string') {
                      var colonIdx = ann.indexOf(':');
                      if (colonIdx > 0 && colonIdx <= 48) {
                        badgeLabel = ann.slice(0, colonIdx).trim();
                        bodyText = ann.slice(colonIdx + 1).trim();
                      } else {
                        badgeLabel = 'Điểm #' + (annIdx + 1);
                        bodyText = ann;
                      }
                    } else if (ann && typeof ann === 'object') {
                      if (ann.line !== undefined && ann.line !== null && String(ann.line) !== '') {
                        var lineStr = String(ann.line);
                        var baseLine = /^dòng\b/i.test(lineStr) ? lineStr : ('Dòng ' + lineStr);
                        var extraPart = String(ann.part || ann.token || ann.label || '').trim();
                        badgeLabel = (extraPart && extraPart.length <= 36) ? (baseLine + ' · ' + extraPart) : baseLine;
                      } else if (ann.part || ann.token || ann.label) {
                        badgeLabel = String(ann.part || ann.token || ann.label);
                      } else {
                        badgeLabel = 'Điểm #' + (annIdx + 1);
                      }
                      bodyText = String(ann.text || ann.meaning || ann.desc || '');
                    }
                    return '<li class="annotation-item"><span class="ann-line-badge">' + escapeHtml(badgeLabel) + '</span><span>' + formatInlineCode(bodyText) + '</span></li>';
                  }).join('') +
                '</ul>' +
                (ex.explanation ? '<p style="margin:8px 0 0;font-size:0.88rem;color:var(--text-secondary);">' + formatInlineCode(ex.explanation) + '</p>' : '') +
              '</div>';
          } else if (ex.explanation) {
            annotationsHtml = '' +
              '<div class="code-annotations">' +
                '<div class="annotations-title">Giải thích kết quả thực thi</div>' +
                '<p style="margin:4px 0 0;font-size:0.88rem;line-height:1.6;color:var(--text-secondary);">' + formatInlineCode(ex.explanation) + '</p>' +
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

        var secId = sec.id || ('section-' + (sIdx + 1));
        var hTag = (lesson.generalInfo && /^\d+\.\d+\s/.test(sec.title || '')) ? 'h3' : 'h2';
        return '' +
          '<section id="' + escapeHtml(secId) + '" class="lesson-section' + (hTag === 'h3' ? ' lx-subsection' : '') + '">' +
            '<' + hTag + '>' + escapeHtml(sec.title) + '</' + hTag + '>' +
            '<div class="section-prose">' + (sec.content || '') + '</div>' +
            examplesHtml +
          '</section>';
      }

      // Render các sections nội dung (tách phần 11 & 12 về cuối bài khi áp dụng khung 12 phần)
      var allLessonSections = (lesson.sections || []).map(function (sec, sIdx) {
        return { sec: sec, sIdx: sIdx, id: sec.id || ('section-' + (sIdx + 1)), title: sec.title };
      });
      var coreSectionEntries = lesson.generalInfo
        ? allLessonSections.filter(function (entry) { return entry.sec.id !== 'sec-resources' && entry.sec.id !== 'sec-appendix'; })
        : allLessonSections;
      var trailingSectionEntries = lesson.generalInfo
        ? allLessonSections.filter(function (entry) { return entry.sec.id === 'sec-resources' || entry.sec.id === 'sec-appendix'; })
        : [];

      var sectionsHtml = coreSectionEntries.map(function (entry) {
        return renderSectionItem(entry.sec, entry.sIdx);
      }).join('');
      var trailingSectionsHtml = trailingSectionEntries.map(function (entry) {
        return renderSectionItem(entry.sec, entry.sIdx);
      }).join('');

      // Callouts (ưu tiên lesson.callouts.{pitfalls,tips}, tương thích dự phòng lesson.{pitfalls,tips})
      var callouts = lesson.callouts || {};
      var pitfallsList = callouts.pitfalls || lesson.pitfalls || [];
      if (pitfallsList.length === 0 && Array.isArray(lesson.commonMistakes)) {
        pitfallsList = lesson.commonMistakes.map(function (item, idx) {
          if (typeof item === 'object' && item !== null) return item;
          return { title: 'Cạm bẫy thực chiến #' + (idx + 1), content: String(item) };
        });
      }
      var tipsList = callouts.tips || lesson.tips || [];
      var pitfallsHtml = pitfallsList.map(function (p) {
        return '' +
          '<div class="callout-box callout-pitfall">' +
            '<div class="callout-header"><span>⚠️ Lỗi thường gặp:</span> <span>' + formatInlineCode(p.title) + '</span></div>' +
            '<div class="callout-body"><p>' + formatInlineCode(p.content) + '</p></div>' +
          '</div>';
      }).join('');

      var tipsHtml = tipsList.map(function (t) {
        return '' +
          '<div class="callout-box callout-tip">' +
            '<div class="callout-header"><span>💡 Ghi nhớ hữu ích:</span> <span>' + formatInlineCode(t.title) + '</span></div>' +
            '<div class="callout-body"><p>' + formatInlineCode(t.content) + '</p></div>' +
          '</div>';
      }).join('');

      var deepDiveData = callouts.deepDive || null;
      var deepDiveHtml = deepDiveData ? ('' +
        '<details class="deep-dive-details">' +
          '<summary class="deep-dive-summary">' +
            '<span>🔍 Chuyên sâu Kernel &amp; RFC: ' + formatInlineCode(deepDiveData.title) + '</span>' +
            '<span class="deep-dive-toggle-hint">Bấm để mở rộng / thu gọn ▾</span>' +
          '</summary>' +
          '<div class="deep-dive-content">' +
            (deepDiveData.content || '') +
          '</div>' +
        '</details>'
      ) : '';

      // Exercises
      var exercisesHtml = (lesson.exercises || []).map(function (ex, exIdx) {
        var exTitle = ex.title || ('Thử thách thực hành ' + (exIdx + 1));
        var exProblem = ex.problem || ex.description || ex.question || ex.task || ex.prompt || '';

        var rawCode = ex.solutionCode || ex.command || '';
        if (!rawCode && ex.solution) {
          if (Array.isArray(ex.solution.commands) && ex.solution.commands.length > 0) {
            rawCode = ex.solution.commands.join('\n');
          } else if (typeof ex.solution.code === 'string') {
            rawCode = ex.solution.code;
          } else if (typeof ex.solution === 'string') {
            rawCode = ex.solution;
          }
        }
        var exCode = rawCode || '';

        var exOutput = ex.solutionOutput || (ex.solution && ex.solution.output) || '';
        var exLevel = ex.level || 'Vừa';
        var exExplanation = ex.explanation || ex.thoughtProcess || (ex.solution && ex.solution.explanation) || (ex.solution && typeof ex.solution.desc === 'string' ? ex.solution.desc : '');
        var exHint = ex.hint || '';
        var exCodeId = topicPrefix + '-sol-' + lesson.id + '-' + exIdx;

        var exLang = ex.lang || (topicPrefix === 'lx' ? 'bash' : 'SQL');
        var solLines = '';
        if (exCode) {
          if (codeHighlighter) {
            solLines = codeHighlighter(exCode, exLang);
          } else {
            solLines = exCode.split('\n').map(function (l, idx) {
              return '<div class="code-line"><span class="line-num">' + (idx + 1) + '</span><span class="line-content">' + escapeHtml(l) + '</span></div>';
            }).join('');
          }
        }

        var solCard = solLines ? ('' +
          '<div class="code-example-card" style="margin:10px 0;">' +
            '<div class="code-card-header">' +
              '<div class="code-header-left">' +
                '<span class="lang-tag">Lời giải mẫu</span>' +
                '<span>' + escapeHtml(exTitle) + '</span>' +
              '</div>' +
              '<button type="button" class="copy-code-btn" data-copy-target="' + exCodeId + '" aria-label="Sao chép câu lệnh">' +
                '<span>📋</span> <span class="copy-btn-text">Sao chép</span>' +
              '</button>' +
            '</div>' +
            '<textarea id="' + exCodeId + '" style="display:none;" readonly>' + escapeHtml(exCode) + '</textarea>' +
            '<pre class="code-pre"><code>' + solLines + '</code></pre>' +
            (exOutput ? '<div class="code-output-block"><div class="output-label"><span>Kết quả mong đợi</span></div><pre class="output-pre">' + escapeHtml(exOutput) + '</pre></div>' : '') +
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

        var rubricHtml = '';
        if (ex.rubric) {
          if (Array.isArray(ex.rubric)) {
            rubricHtml = '' +
              '<div class="lx-rubric-box" style="margin-top:14px;padding:12px 14px;border-radius:var(--radius-sm);background:var(--bg-surface-alt);border:1px solid var(--border-subtle);">' +
                '<div style="font-weight:700;font-size:0.88rem;color:var(--text-primary);margin-bottom:8px;display:flex;align-items:center;gap:6px;"><span>🎯</span> <span>Rubric Đánh Giá Năng Lực (Tiêu Chuẩn Quốc Tế)</span></div>' +
                '<div class="table-responsive"><table class="lesson-table lx-rubric-table" style="font-size:0.85rem;margin:0;">' +
                  '<thead><tr><th>Tiêu chí</th><th>Mức Đạt (Acceptable)</th><th>Mức Xuất sắc (Mastery)</th><th style="text-align:center;">Trọng số</th></tr></thead>' +
                  '<tbody>' +
                    ex.rubric.map(function (r) {
                      return '<tr><td><strong>' + escapeHtml(r.criterion || '') + '</strong></td><td>' + formatInlineCode(r.pass || '') + '</td><td>' + formatInlineCode(r.excellent || '') + '</td><td style="text-align:center;"><span style="padding:2px 8px;border-radius:10px;background:var(--accent-soft);color:var(--accent-primary);font-weight:700;font-size:0.75rem;">' + escapeHtml(r.weight || '33%') + '</span></td></tr>';
                    }).join('') +
                  '</tbody>' +
                '</table></div>' +
              '</div>';
          } else if (typeof ex.rubric === 'string') {
            rubricHtml = '<div class="lx-rubric-box" style="margin-top:14px;">' + ex.rubric + '</div>';
          }
        }

        if (!solCard && !explanationHtml && ex.solution) {
          explanationHtml = '' +
            '<div class="solution-explanation" style="margin-top:12px;padding-top:10px;border-top:1px dashed var(--border-subtle);font-size:0.92rem;line-height:1.65;">' +
              '<strong>Lời giải chi tiết:</strong>' +
              '<div style="margin-top:4px;">' + formatMultilineHtml(typeof ex.solution === 'string' ? ex.solution : JSON.stringify(ex.solution)) + '</div>' +
            '</div>';
        }

        var exLevelClass = (exLevel === 'Dễ' || exLevel === 'Cơ bản')
          ? 'ex-easy'
          : (exLevel === 'Vừa' || exLevel === 'Trung bình' || exLevel === 'Trung cấp')
            ? 'ex-medium'
            : 'ex-hard';

        return '' +
          '<div class="exercise-card">' +
            '<div class="exercise-header">' +
              '<span class="ex-level-badge ' + exLevelClass + '">Mức: ' + escapeHtml(exLevel) + '</span>' +
              '<span class="exercise-title">' + formatInlineCode(exTitle) + '</span>' +
            '</div>' +
            '<div class="exercise-problem" style="line-height:1.65;margin-bottom:10px;">' + formatMultilineHtml(exProblem) + '</div>' +
            (exHint ? '<div class="exercise-hint" style="margin-bottom:10px;"><strong>Gợi ý:</strong> ' + formatMultilineHtml(exHint) + '</div>' : '') +
            '<div class="exercise-solution-wrapper">' +
              '<button type="button" class="solution-toggle-btn" id="sol-btn-' + escapeHtml(lesson.id) + '-' + exIdx + '" aria-expanded="false" aria-controls="sol-panel-' + escapeHtml(lesson.id) + '-' + exIdx + '">' +
                '<span class="solution-toggle-icon" aria-hidden="true">👁️</span> ' +
                '<span class="solution-toggle-text">Bấm để xem đáp án lệnh &amp; giải thích chi tiết</span> ' +
                '<span class="solution-toggle-chevron" aria-hidden="true">▾</span>' +
              '</button>' +
              '<div class="solution-accordion-panel" id="sol-panel-' + escapeHtml(lesson.id) + '-' + exIdx + '" role="region" aria-labelledby="sol-btn-' + escapeHtml(lesson.id) + '-' + exIdx + '">' +
                '<div class="solution-accordion-inner">' +
                  '<div class="solution-body">' +
                    solCard +
                    explanationHtml +
                    rubricHtml +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
      }).join('');

      // Quiz kiểm tra nhanh tương tác (hỗ trợ cả lesson.quiz lẫn part.quiz ở bài cuối module)
      var letters = ['A', 'B', 'C', 'D', 'E'];
      var quizList = Array.isArray(lesson.quiz) && lesson.quiz.length > 0 ? lesson.quiz : [];
      var quizSectionTitle = 'Câu hỏi Trắc nghiệm (Quiz)';
      if (quizList.length === 0 && item.isLastInPart && item.part && item.part.quiz && Array.isArray(item.part.quiz.questions)) {
        quizList = item.part.quiz.questions;
        quizSectionTitle = item.part.quiz.title || ('Bài kiểm tra tổng kết ' + item.partNumber);
      }
      var quizStorageKey = storageKey + '_quiz';
      function getSavedQuizAnswer(lId, qIdx) {
        try {
          var raw = localStorage.getItem(quizStorageKey);
          if (!raw) return null;
          var map = JSON.parse(raw);
          return (map[lId] && map[lId][qIdx] !== undefined) ? map[lId][qIdx] : null;
        } catch (_e) { return null; }
      }

      var quizHtml = quizList.map(function (q, qIdx) {
        var targetCorrect = 0;
        if (typeof q.correctIndex === 'number') {
          targetCorrect = q.correctIndex;
        } else if (typeof q.answer === 'number') {
          targetCorrect = q.answer;
        } else if (typeof q.correctAnswer === 'string' && Array.isArray(q.options)) {
          var foundAnsIdx = q.options.indexOf(q.correctAnswer);
          if (foundAnsIdx !== -1) targetCorrect = foundAnsIdx;
        }
        var savedAns = getSavedQuizAnswer(lesson.id, qIdx);
        var isAnswered = savedAns !== null && savedAns !== undefined;
        var isCorrect = isAnswered && savedAns === targetCorrect;

        var optionsHtml = (q.options || []).map(function (opt, oIdx) {
          var stateClass = '';
          if (isAnswered) {
            if (oIdx === targetCorrect) stateClass = 'correct';
            else if (oIdx === savedAns) stateClass = 'wrong';
          }
          return '' +
            '<button type="button" class="quiz-option-btn ' + stateClass + '" data-quiz-opt="' + oIdx + '">' +
              '<span class="quiz-option-letter">' + (letters[oIdx] || (oIdx + 1)) + '</span>' +
              '<span>' + formatInlineCode(opt) + '</span>' +
            '</button>';
        }).join('');

        return '' +
          '<div class="quiz-card" data-quiz-idx="' + qIdx + '" data-correct-idx="' + targetCorrect + '">' +
            '<div class="quiz-question">Câu ' + (qIdx + 1) + ': ' + formatInlineCode(q.question) + '</div>' +
            '<div class="quiz-options">' + optionsHtml + '</div>' +
            '<div class="quiz-explanation ' + (isAnswered ? 'visible' : '') + ' ' + (isAnswered ? (isCorrect ? 'is-correct' : 'is-wrong') : '') + '">' +
              '<strong>' + (isAnswered ? (isCorrect ? '🎉 Chính xác!' : '❌ Chưa chính xác!') : '') + '</strong>' +
              '<span> ' + formatInlineCode(q.explanation || '') + '</span>' +
            '</div>' +
          '</div>';
      }).join('');

      // Summary + Câu hỏi tự kiểm tra (selfReviewQuestions)
      var rawSummary = lesson.summary;
      var summaryList = Array.isArray(rawSummary)
        ? rawSummary
        : (typeof rawSummary === 'string' && rawSummary.trim()
            ? rawSummary.split(/\r?\n|\\n/).map(function (s) { return s.replace(/^\d+\.\s*/, '').trim(); }).filter(Boolean)
            : []);
      var summaryHtml = summaryList.map(function (line) {
        return '<li>' + formatInlineCode(line) + '</li>';
      }).join('');
      var selfReviewHtml = '';
      if (Array.isArray(lesson.selfReviewQuestions) && lesson.selfReviewQuestions.length > 0) {
        selfReviewHtml = '' +
          '<div class="net-self-review">' +
            '<div class="net-self-review-title"><span>❓</span> <span>Câu hỏi tự kiểm tra nhanh</span></div>' +
            '<ul class="net-self-review-list">' +
              lesson.selfReviewQuestions.map(function (rq) {
                return '<li>' + formatInlineCode(rq) + '</li>';
              }).join('') +
            '</ul>' +
          '</div>';
      }

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
        var intTitle = lesson.intuition.title || 'Hiểu bằng trực giác đời thường';
        var intMetaphor = lesson.intuition.metaphor || lesson.intuition.analogy || '';
        var intBoundary = lesson.intuition.boundary ? (
          '<div class="intuition-boundary ' + topicPrefix + '-intuition-boundary">' +
            '<strong>⚠️ Ranh giới của phép ví dụ (Where the analogy breaks down):</strong> ' +
            formatInlineCode(lesson.intuition.boundary) +
          '</div>'
        ) : '';
        intuitionHtml = '' +
          '<section id="sec-intuition" class="intuition-box ' + topicPrefix + '-intuition-box">' +
            '<div class="intuition-header ' + topicPrefix + '-intuition-header">' +
              '<span class="' + topicPrefix + '-intuition-icon-pill" aria-hidden="true">💡</span>' +
              '<span class="' + topicPrefix + '-intuition-title-text">' + (lesson.generalInfo ? '3. Khởi động &amp; Trực giác: ' : '2. Trực giác: ') + escapeHtml(intTitle) + '</span>' +
            '</div>' +
            (intMetaphor ? '<p class="intuition-metaphor ' + topicPrefix + '-intuition-metaphor">' + formatInlineCode(intMetaphor) + '</p>' : '') +
            intBoundary +
            (lesson.intuition.visualHtml ? '<div class="intuition-visual ' + topicPrefix + '-intuition-visual">' + lesson.intuition.visualHtml + '</div>' : '') +
          '</section>';
      }

      var matchedCourse = null;
      if (Array.isArray(coursesConfig)) {
        for (var cIdx = 0; cIdx < coursesConfig.length; cIdx++) {
          var cParts = coursesConfig[cIdx].parts || [];
          if (cParts.some(function (p) { return p.id === item.partId; })) {
            matchedCourse = coursesConfig[cIdx];
            break;
          }
        }
      }
      var courseNum = matchedCourse ? (matchedCourse.number || (matchedCourse.banner && matchedCourse.banner.number)) : (config.courseBanner ? config.courseBanner.number : '');
      var courseTitle = matchedCourse ? (matchedCourse.title || (matchedCourse.banner && matchedCourse.banner.title)) : (config.courseBanner ? config.courseBanner.title : topicTitle);
      var breadcrumbCourseBadge = courseNum
        ? ('<button type="button" class="breadcrumb-nav-link" data-nav="overview" title="Về tổng quan Lộ trình"><span class="breadcrumb-course-badge course-' + (matchedCourse ? matchedCourse.id : topicId) + '">' + escapeHtml(courseNum) + ': ' + escapeHtml(courseTitle) + '</span></button>')
        : ('<button type="button" class="breadcrumb-nav-link" data-nav="overview" title="Về tổng quan Lộ trình">' + escapeHtml(topicTitle) + '</button>');

      var breadcrumbPartLink = '<button type="button" class="breadcrumb-part-link" data-part-target="part-card-' + item.partId + '" title="Xem phần học trên Lộ trình">' + escapeHtml(item.partNumber) + ': ' + escapeHtml(item.partTitle) + '</button>';

      var breadcrumbHtml = breadcrumbCourseBadge + ' › ' + breadcrumbPartLink + ' › <span>Bài ' + escapeHtml(lesson.number) + '</span>';

      var generalInfoHtml = '';
      if (lesson.generalInfo) {
        var g = lesson.generalInfo;
        generalInfoHtml = '' +
          '<section class="lx-general-info-card" id="sec-general-info">' +
            '<div class="lx-general-info-header">' +
              '<span class="lx-info-icon" aria-hidden="true">📋</span>' +
              '<span class="lx-info-title">1. Thông tin Chung của Bài học</span>' +
            '</div>' +
            '<div class="lx-info-grid">' +
              '<div class="lx-info-item"><span class="lx-info-label">⏱️ Thời lượng dự kiến</span><span class="lx-info-val">' + escapeHtml(g.duration || lesson.duration || '40 phút') + '</span></div>' +
              '<div class="lx-info-item"><span class="lx-info-label">👥 Đối tượng học viên</span><span class="lx-info-val">' + escapeHtml(g.targetAudience || 'Lập trình viên, DevOps, Kỹ sư hệ thống') + '</span></div>' +
              '<div class="lx-info-item"><span class="lx-info-label">🔑 Kiến thức tiên quyết</span><span class="lx-info-val">' + formatInlineCode(g.prerequisites || 'Cơ bản về máy tính') + '</span></div>' +
              '<div class="lx-info-item"><span class="lx-info-label">🖥️ Môi trường thực hành</span><span class="lx-info-val">' + formatInlineCode(g.environment || 'Ubuntu 22.04/24.04 LTS (VM / WSL2 / Docker)') + '</span></div>' +
              '<div class="lx-info-item lx-info-full"><span class="lx-info-label">📚 Học liệu cần chuẩn bị</span><span class="lx-info-val">' + formatInlineCode(g.materials || 'Terminal emulator, quyền sudo máy ảo, kết nối Internet') + '</span></div>' +
            '</div>' +
          '</section>';
      }

      var tocList = lesson.generalInfo ? [
        { id: 'sec-general-info', label: '1. Thông tin chung' },
        { id: 'sec-objectives', label: '2. Mục tiêu học tập (Bloom)' },
        ...(lesson.intuition ? [{ id: 'sec-intuition', label: '3. Khởi động & Trực giác' }] : []),
        ...coreSectionEntries.map(function (entry) {
          return {
            id: entry.id,
            label: entry.title,
            sub: /^\d+\.\d+\s/.test(entry.title || '')
          };
        }),
        ...(deepDiveHtml || pitfallsHtml || tipsHtml ? [{ id: 'sec-callouts', label: 'Lưu ý & Cạm bẫy thực tế' }] : []),
        ...(summaryHtml ? [{ id: 'sec-summary', label: '9. Tóm tắt bài học' }] : []),
        ...(exercisesHtml ? [{ id: 'sec-exercises', label: '10. Thử thách & Rubric' }] : []),
        ...(quizHtml ? [{ id: 'sec-quiz', label: 'Câu hỏi Quiz' }] : []),
        ...trailingSectionEntries.map(function (entry) {
          return { id: entry.id, label: entry.title };
        }),
        ...(lesson.reflectionQuestion ? [{ id: 'sec-reflection', label: 'Thử thách bản chất' }] : [])
      ] : [
        { id: 'sec-objectives', label: '1. Mục tiêu bài học' },
        ...(lesson.intuition ? [{ id: 'sec-intuition', label: '2. Trực giác' }] : []),
        ...(lesson.sections || []).map(function (s, idx) { return { id: s.id || ('section-' + (idx + 1)), label: s.title }; }),
        ...(deepDiveHtml || pitfallsHtml || tipsHtml ? [{ id: 'sec-callouts', label: 'Lưu ý & Chuyên sâu' }] : []),
        ...(exercisesHtml ? [{ id: 'sec-exercises', label: 'Bài tập thực hành' }] : []),
        ...(quizHtml ? [{ id: 'sec-quiz', label: 'Câu hỏi Quiz' }] : []),
        ...(summaryHtml ? [{ id: 'sec-summary', label: 'Tóm tắt bài học' }] : []),
        ...(lesson.reflectionQuestion ? [{ id: 'sec-reflection', label: 'Thử thách bản chất' }] : [])
      ];

      var mobileTocHtml = '' +
        '<nav class="mobile-toc-box" aria-label="Mục lục bài học trên di động">' +
          '<details class="mobile-toc-details">' +
            '<summary class="mobile-toc-summary">' +
              '<span class="mobile-toc-summary-label">' +
                '<span class="mobile-toc-icon" aria-hidden="true">📑</span>' +
                '<span>Mục lục bài học (' + tocList.length + ' mục)</span>' +
              '</span>' +
              '<span class="mobile-toc-chevron" aria-hidden="true">▾</span>' +
            '</summary>' +
            '<div class="mobile-toc-dropdown">' +
              '<ul class="mobile-toc-list">' +
                tocList.map(function (it) {
                  return '<li><a class="mobile-toc-link' + (it.sub ? ' mobile-toc-link-sub' : '') + '" href="#' + escapeHtml(it.id) + '" data-toc-target="' + escapeHtml(it.id) + '">' + escapeHtml(it.label) + '</a></li>';
                }).join('') +
              '</ul>' +
            '</div>' +
          '</details>' +
        '</nav>';

      var summaryBlockHtml = summaryHtml ? (
        '<section id="sec-summary" class="summary-box">' +
          '<div class="summary-title"><span>📌</span> <span>' + (lesson.generalInfo ? '9. Tóm tắt Bài học &amp; Ghi nhớ Cốt lõi' : 'Tóm tắt Bài học') + '</span></div>' +
          '<ul>' + summaryHtml + '</ul>' +
          selfReviewHtml +
        '</section>'
      ) : '';

      var exercisesBlockHtml = exercisesHtml ? (
        '<section id="sec-exercises">' +
          '<h2>' + (lesson.generalInfo ? '10. Thử thách Thực hành &amp; Rubric Đánh giá' : 'Bài tập &amp; Thử thách Thực chiến') + '</h2>' +
          '<div class="exercises-container">' + exercisesHtml + '</div>' +
        '</section>'
      ) : '';

      var quizBlockHtml = quizHtml ? (
        '<section id="sec-quiz">' +
          '<h2>' + escapeHtml(quizSectionTitle) + '</h2>' +
          '<div class="quiz-container">' + quizHtml + '</div>' +
        '</section>'
      ) : '';

      var linuxMetaPillsHtml = '';
      if (typeof lesson.requiresRoot === 'boolean') {
        linuxMetaPillsHtml += lesson.requiresRoot
          ? '<span class="lx-meta-pill lx-meta-root" title="Bài học có thao tác yêu cầu quyền quản trị sudo/root">🔐 Cần sudo/root</span>'
          : '<span class="lx-meta-pill lx-meta-user" title="Thực hành an toàn bằng tài khoản người dùng thường">👤 User thường</span>';
      }
      if (typeof lesson.requiresVM === 'boolean') {
        linuxMetaPillsHtml += lesson.requiresVM
          ? '<span class="lx-meta-pill lx-meta-vm-warn" title="Nên thực hành trên Máy ảo (VM) độc lập để bảo vệ máy thật">🖥️ Khuyên dùng VM</span>'
          : '<span class="lx-meta-pill lx-meta-all-env" title="Tương thích đầy đủ trên VM, WSL2 và Container">✓ Mọi môi trường</span>';
      }

      mainEl.innerHTML = '' +
        '<article class="lesson-article">' +
          '<header class="lesson-header">' +
            '<div class="lesson-meta-row">' +
              '<span class="part-breadcrumb">' + breadcrumbHtml + '</span>' +
              '<span class="level-badge ' + getLevelBadgeClass(lesson.level) + '">' + escapeHtml(lesson.level) + '</span>' +
              '<span class="level-badge" style="background:var(--bg-surface-alt);color:var(--text-secondary);">⏱ ' + escapeHtml(lesson.duration || '30 phút') + '</span>' +
              linuxMetaPillsHtml +
              ((lesson.circuit === 'dq' || (lesson.title && lesson.title.includes('[DQ]'))) ? '<span class="circuit-badge circuit-badge-dq">[DQ]</span>' : '') +
              ((lesson.circuit === 'fe' || (lesson.title && lesson.title.includes('[FE]'))) ? '<span class="circuit-badge circuit-badge-fe">[FE]</span>' : '') +
              ((lesson.circuit === 'scale' || (lesson.title && lesson.title.includes('[SCALE]'))) ? '<span class="circuit-badge circuit-badge-scale">[SCALE]</span>' : '') +
              (lesson.verifiedEngines ? '<span class="level-badge" style="background:rgba(37,99,235,0.08);color:var(--topic-sql, #2563eb);border:1px solid rgba(37,99,235,0.25);font-size:0.75rem;" title="' + escapeHtml(lesson.verifiedEngines) + '">✓ ' + escapeHtml(lesson.verifiedEngines.split('(')[0].trim()) + '</span>' : '') +
            '</div>' +
            '<h1>Bài ' + escapeHtml(lesson.number) + ': ' + escapeHtml(lesson.title) + '</h1>' +
            (lesson.subtitle ? '<p class="lesson-subtitle">' + escapeHtml(lesson.subtitle) + '</p>' : '') +
          '</header>' +

          generalInfoHtml +

          '<section class="objectives-box" id="sec-objectives">' +
            '<div class="objectives-title"><span>🎯</span> <span>' + (lesson.generalInfo ? '2. Mục tiêu học tập (Thang Bloom)' : '1. Mục tiêu bài học') + '</span></div>' +
            '<ul class="objectives-list">' +
              (lesson.objectives || []).map(function (obj) {
                return '<li><span class="obj-check">✓</span> <span>' + formatInlineCode(obj) + '</span></li>';
              }).join('') +
            '</ul>' +
          '</section>' +

          mobileTocHtml +

          intuitionHtml +
          sectionsHtml +

          (pitfallsHtml || tipsHtml || deepDiveHtml ? (
            '<section id="sec-callouts">' +
              '<h2>Lưu ý Quan trọng &amp; Cạm bẫy thực tế</h2>' +
              deepDiveHtml +
              pitfallsHtml +
              tipsHtml +
            '</section>'
          ) : '') +

          (lesson.generalInfo
            ? (summaryBlockHtml + exercisesBlockHtml + quizBlockHtml + trailingSectionsHtml)
            : (exercisesBlockHtml + quizBlockHtml + summaryBlockHtml)) +

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

      // Gắn sự kiện chọn đáp án Quiz tương tác
      mainEl.querySelectorAll('.quiz-card').forEach(function (card) {
        var qIdx = parseInt(card.dataset.quizIdx, 10);
        var correctIdx = parseInt(card.dataset.correctIdx, 10);
        var explanationEl = card.querySelector('.quiz-explanation');

        card.querySelectorAll('.quiz-option-btn').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var optIdx = parseInt(btn.dataset.quizOpt, 10);
            try {
              var raw = localStorage.getItem(quizStorageKey);
              var map = raw ? JSON.parse(raw) : {};
              if (!map[lesson.id]) map[lesson.id] = {};
              map[lesson.id][qIdx] = optIdx;
              localStorage.setItem(quizStorageKey, JSON.stringify(map));
            } catch (_e) {}

            card.querySelectorAll('.quiz-option-btn').forEach(function (b) {
              var bIdx = parseInt(b.dataset.quizOpt, 10);
              b.classList.remove('correct', 'wrong');
              if (bIdx === correctIdx) {
                b.classList.add('correct');
              } else if (bIdx === optIdx) {
                b.classList.add('wrong');
              }
            });

            if (explanationEl) {
              explanationEl.classList.add('visible');
              explanationEl.classList.remove('is-correct', 'is-wrong');
              if (optIdx === correctIdx) {
                explanationEl.classList.add('is-correct');
                var strongEl = explanationEl.querySelector('strong');
                if (strongEl) strongEl.textContent = '🎉 Chính xác!';
              } else {
                explanationEl.classList.add('is-wrong');
                var strongEl = explanationEl.querySelector('strong');
                if (strongEl) strongEl.textContent = '❌ Chưa chính xác!';
              }
            }
          });
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

      // Tương tác nút Bấm xem đáp án với hiệu ứng accordion mượt mà và aria đồng bộ
      mainEl.querySelectorAll('.solution-toggle-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var panelId = btn.getAttribute('aria-controls');
          var panel = document.getElementById(panelId);
          if (!panel) return;
          var isExpanded = btn.getAttribute('aria-expanded') === 'true';
          var nextState = !isExpanded;
          btn.setAttribute('aria-expanded', String(nextState));
          panel.classList.toggle('is-open', nextState);
          var textEl = btn.querySelector('.solution-toggle-text');
          if (textEl) {
            textEl.textContent = nextState
              ? 'Ẩn đáp án lệnh & giải thích chi tiết'
              : 'Bấm để xem đáp án lệnh & giải thích chi tiết';
          }
        });
      });

      // Tương tác Mục lục nhanh trên Mobile (đóng hộp details trước khi đo vị trí cuộn để không bị lệch chiều cao dropdown)
      mainEl.querySelectorAll('.mobile-toc-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          var targetId = link.dataset.tocTarget;
          var targetEl = document.getElementById(targetId);
          if (targetEl) {
            var detailsEl = link.closest('.mobile-toc-details');
            if (detailsEl) detailsEl.removeAttribute('open');
            tocClickLockUntil = Date.now() + 700;
            if (setActiveTocFn) setActiveTocFn(targetId);
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            try {
              window.history.replaceState(null, '', '#' + targetId);
            } catch (_e) {}
          }
        });
      });

      // Tương tác Breadcrumb nhảy về Phần học trên Lộ trình
      mainEl.querySelectorAll('.breadcrumb-part-link').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var partTargetId = btn.getAttribute('data-part-target');
          navigateTo('overview');
          if (partTargetId) {
            setTimeout(function () {
              var targetEl = document.getElementById(partTargetId);
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 80);
          }
        });
      });

      if (tocEl) {
        if (tocObserver) {
          tocObserver.disconnect();
          tocObserver = null;
        }
        setActiveTocFn = null;
        lastTocTargetId = tocList.length > 0 ? tocList[tocList.length - 1].id : '';
        tocClickLockUntil = 0;

        tocEl.innerHTML = '' +
          '<div class="toc-heading">Trong bài này</div>' +
          '<ul class="toc-list">' +
            tocList.map(function (it) {
              return '<li><a class="toc-link' + (it.sub ? ' toc-link-sub' : '') + '" href="#' + escapeHtml(it.id) + '" data-toc-target="' + escapeHtml(it.id) + '">' + escapeHtml(it.label) + '</a></li>';
            }).join('') +
          '</ul>';

        var tocLinks = Array.prototype.slice.call(tocEl.querySelectorAll('.toc-link'));
        var activeTocId = '';

        function setActiveToc(activeId) {
          if (!activeId || activeId === activeTocId) return;
          activeTocId = activeId;
          var matchedLink = null;
          for (var i = 0; i < tocLinks.length; i++) {
            var a = tocLinks[i];
            var isMatch = a.dataset.tocTarget === activeId;
            a.classList.toggle('active', isMatch);
            if (isMatch) matchedLink = a;
          }
          if (matchedLink) {
            scrollTocLinkIntoSidebar(matchedLink);
          }
        }

        setActiveTocFn = setActiveToc;

        tocLinks.forEach(function (link) {
          link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = link.dataset.tocTarget;
            var targetEl = document.getElementById(targetId);
            if (targetEl) {
              tocClickLockUntil = Date.now() + 700;
              setActiveToc(targetId);
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              try {
                window.history.replaceState(null, '', '#' + targetId);
              } catch (_e) {}
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
          }, { rootMargin: '-75px 0px -65% 0px', threshold: 0 });

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

      // Luôn cuộn trang lên đầu khi nạp bài học
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Nếu hash là một section cụ thể trong bài (không phải #overview hay #lesson=...)
      if (window.location.hash && window.location.hash.indexOf('lesson=') === -1 && window.location.hash !== '#overview') {
        var initialTargetId = window.location.hash.substring(1);
        setTimeout(function () {
          var targetEl = document.getElementById(initialTargetId);
          if (targetEl && typeof targetEl.scrollIntoView === 'function') {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (typeof setActiveToc === 'function') setActiveToc(initialTargetId);
          }
        }, 80);
      }
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
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        updateScrollIndicators();
        return;
      }

      currentView = targetId;
      var selectedItem = ALL_LESSONS.find(function (it) { return it.lesson.id === targetId; });
      if (selectedItem) {
        partOpenState[selectedItem.partId] = true;
        if (activeFilter !== 'all' && !doesItemMatchFilter(selectedItem, activeFilter)) {
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

      // Đảm bảo trình duyệt luôn cuộn lên đầu bài học mới ngay lập tức
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      updateScrollIndicators();
    }

    function closeDrawer(returnFocus) {
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
      var scrollTicking = false;
      var lastProgressRatio = -1;
      var lastBackToTopVisible = false;

      function flushScrollIndicators() {
        scrollTicking = false;
        var scrollY = window.scrollY || window.pageYOffset || 0;
        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (progressFill) {
          var ratio = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
          if (
            Math.abs(ratio - lastProgressRatio) > 0.0005 ||
            (ratio === 0 && lastProgressRatio !== 0) ||
            (ratio === 1 && lastProgressRatio !== 1)
          ) {
            progressFill.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
            lastProgressRatio = ratio;
          }
        }

        if (backToTopBtn) {
          var shouldShow = scrollY > 300;
          if (shouldShow !== lastBackToTopVisible) {
            backToTopBtn.classList.toggle('visible', shouldShow);
            lastBackToTopVisible = shouldShow;
          }
        }

        // Kích hoạt đề mục cuối cùng trong mục lục khi cuộn chạm đáy trang (không gọi scrollIntoView trên window)
        if (maxScroll > 0 && scrollY >= (maxScroll - 25) && setActiveTocFn && lastTocTargetId && Date.now() >= tocClickLockUntil) {
          setActiveTocFn(lastTocTargetId);
        }
      }

      function scheduleScrollIndicators() {
        if (!scrollTicking) {
          scrollTicking = true;
          if (typeof window.requestAnimationFrame === 'function') {
            window.requestAnimationFrame(flushScrollIndicators);
          } else {
            flushScrollIndicators();
          }
        }
      }

      updateScrollIndicators = flushScrollIndicators;

      window.addEventListener('scroll', scheduleScrollIndicators, { passive: true });
      window.addEventListener('resize', scheduleScrollIndicators, { passive: true });
      window.addEventListener('wheel', function () { tocClickLockUntil = 0; }, { passive: true });
      window.addEventListener('touchmove', function () { tocClickLockUntil = 0; }, { passive: true });

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
          if (e.key === 'Escape' && document.activeElement.id === 'sidebar-search-input') {
            var searchInp = document.getElementById('sidebar-search-input');
            var searchClr = document.getElementById('sidebar-search-clear');
            if (searchInp) {
              searchInp.value = '';
              searchInp.blur();
            }
            if (searchClr) searchClr.hidden = true;
            searchQuery = '';
            renderSidebar();
          }
          return;
        }

        if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
          var searchInput = document.getElementById('sidebar-search-input');
          if (searchInput) {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
          }
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

      // Khởi tạo ô tìm kiếm nhanh bài học trong Sidebar
      var sidebarLeft = document.getElementById('sidebar-left');
      var searchInput = document.getElementById('sidebar-search-input');
      if (sidebarLeft && !searchInput) {
        var searchBox = document.createElement('div');
        searchBox.className = 'sidebar-search-box';
        searchBox.innerHTML = '' +
          '<span class="sidebar-search-icon" aria-hidden="true">🔍</span>' +
          '<input type="text" id="sidebar-search-input" class="sidebar-search-input" placeholder="Tìm bài học... (/)" aria-label="Tìm kiếm nhanh bài học" autocomplete="off" spellcheck="false">' +
          '<button type="button" id="sidebar-search-clear" class="sidebar-search-clear" aria-label="Xóa nội dung tìm kiếm" hidden>✕</button>';
        var insertBeforeTarget = document.getElementById('sidebar-course-tabs') || document.getElementById('curriculum-tree');
        if (insertBeforeTarget) {
          sidebarLeft.insertBefore(searchBox, insertBeforeTarget);
        }
        searchInput = document.getElementById('sidebar-search-input');
      }

      var searchClearBtn = document.getElementById('sidebar-search-clear');
      if (searchInput) {
        searchInput.addEventListener('input', function () {
          searchQuery = searchInput.value;
          if (searchClearBtn) {
            searchClearBtn.hidden = !searchQuery;
          }
          renderSidebar();
        });
      }
      if (searchClearBtn) {
        searchClearBtn.addEventListener('click', function () {
          if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
          }
          searchQuery = '';
          searchClearBtn.hidden = true;
          renderSidebar();
        });
      }

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
          var isOpen = sidebar ? sidebar.classList.toggle('open') : false;
          if (backdrop) backdrop.classList.toggle('open', Boolean(isOpen));
          document.body.classList.toggle('scroll-lock', Boolean(isOpen));
          menuBtn.setAttribute('aria-expanded', Boolean(isOpen).toString());
          if (isOpen && closeBtn) {
            closeBtn.focus();
          }
        });
      }
      if (backdrop) backdrop.addEventListener('click', function () { closeDrawer(true); });
      if (closeBtn) closeBtn.addEventListener('click', function () { closeDrawer(true); });

      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
          closeDrawer(true);
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

      function handleRouteFromHash(isInitial) {
        var hash = window.location.hash || '';
        var match = hash.match(/lesson=([a-z0-9-]+)/i);
        var directId = hash.replace(/^#/, '').trim();

        // 1. Nếu hash là liên kết bài học (dạng #lesson=... hoặc #id_bai_hoc)
        if (match && ALL_LESSONS.some(function (it) { return it.lesson.id === match[1]; })) {
          if (isInitial || currentView !== match[1]) {
            navigateTo(match[1]);
          }
          return;
        }
        if (directId && ALL_LESSONS.some(function (it) { return it.lesson.id === directId; })) {
          if (isInitial || currentView !== directId) {
            navigateTo(directId);
          }
          return;
        }

        // 2. Nếu không phải lần nạp đầu tiên và hash là neo nội bộ trong trang đang mở (#sec-..., #part-card-..., #home-...)
        if (!isInitial && currentView && (hash.indexOf('#sec-') === 0 || hash.indexOf('#part-card-') === 0 || hash.indexOf('#home-') === 0)) {
          return;
        }

        // 3. Mặc định về trang Tổng quan (#overview)
        if (isInitial || directId === 'overview' || directId === 'home' || !directId) {
          if (isInitial || currentView !== 'overview') {
            navigateTo('overview');
            if (isInitial && directId && directId !== 'overview' && directId !== 'home') {
              setTimeout(function () {
                var anchorEl = document.getElementById(directId);
                if (anchorEl && typeof anchorEl.scrollIntoView === 'function') {
                  anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 80);
            }
          }
        }
      }

      window.addEventListener('hashchange', function () { handleRouteFromHash(false); });
      handleRouteFromHash(true);
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
