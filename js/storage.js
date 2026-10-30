/**
 * Quản lý Lưu trữ Tiến độ Học tập & Tùy chọn Giao diện
 * Bọc `localStorage` trong `try/catch` với fallback bộ nhớ RAM (in-memory)
 */

const STORAGE_KEY = 'py314_str_course_state_v1';

const memoryFallback = {
  completedLessons: [],
  lastLessonId: null,
  quizAnswers: {},
  theme: null,
  fontSize: 'medium'
};

let isLocalStorageAvailable = false;

function checkStorage() {
  try {
    const testKey = '__py314_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    isLocalStorageAvailable = true;
  } catch (_err) {
    isLocalStorageAvailable = false;
  }
}

checkStorage();

export function loadState() {
  try {
    if (isLocalStorageAvailable) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          lastLessonId: parsed.lastLessonId || null,
          quizAnswers: parsed.quizAnswers && typeof parsed.quizAnswers === 'object' ? parsed.quizAnswers : {},
          theme: parsed.theme || null,
          fontSize: parsed.fontSize || 'medium'
        };
      }
    }
  } catch (_err) {
    // Fallback sang bộ nhớ RAM nếu lỗi đọc/parse
  }
  return { ...memoryFallback };
}

export function saveState(partialState) {
  const current = loadState();
  const next = {
    ...current,
    ...partialState
  };
  Object.assign(memoryFallback, next);
  try {
    if (isLocalStorageAvailable) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  } catch (_err) {
    // Đã lưu an toàn trong memoryFallback
  }
  return next;
}

export function toggleLessonComplete(lessonId) {
  const state = loadState();
  const set = new Set(state.completedLessons);
  let isNowCompleted = false;
  if (set.has(lessonId)) {
    set.delete(lessonId);
  } else {
    set.add(lessonId);
    isNowCompleted = true;
  }
  saveState({ completedLessons: Array.from(set) });
  return isNowCompleted;
}

export function markLessonComplete(lessonId) {
  const state = loadState();
  if (!state.completedLessons.includes(lessonId)) {
    saveState({ completedLessons: [...state.completedLessons, lessonId] });
  }
}

export function isLessonCompleted(lessonId) {
  const state = loadState();
  return state.completedLessons.includes(lessonId);
}

export function saveQuizAnswer(lessonId, questionIndex, optionIndex) {
  const state = loadState();
  const quizAnswers = {
    ...state.quizAnswers,
    [`${lessonId}:${questionIndex}`]: optionIndex
  };
  saveState({ quizAnswers });
}

export function getQuizAnswer(lessonId, questionIndex) {
  const state = loadState();
  const key = `${lessonId}:${questionIndex}`;
  return Object.prototype.hasOwnProperty.call(state.quizAnswers, key)
    ? state.quizAnswers[key]
    : null;
}

export function getPreferredTheme() {
  const state = loadState();
  if (state.theme === 'dark' || state.theme === 'light') {
    return state.theme;
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}
