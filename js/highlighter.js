/**
 * Bộ Tô màu Cú pháp Python 3.14 (Custom Python 3.14 Tokenizer & Highlighter)
 * Hỗ trợ đầy đủ:
 * - Tiền tố chuỗi: f"", r"", b"", u"", t"" (PEP 750), fr"", rf"", br"", rb"", tr"", rt""
 * - Chuỗi nhiều dòng """...""" và '''...'''
 * - Tô sáng vùng nội suy {...} bên trong f-string và t-string
 * - Từ khóa ( bao gồm match/case ), hàm tích hợp (builtins), số, chú thích (#), decorator (@)
 */

const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
  'try', 'while', 'with', 'yield', 'match', 'case'
]);

const BUILTINS = new Set([
  'print', 'len', 'str', 'repr', 'ascii', 'ord', 'chr', 'int', 'float',
  'bool', 'bytes', 'bytearray', 'list', 'tuple', 'dict', 'set', 'frozenset',
  'slice', 'range', 'enumerate', 'min', 'max', 'sum', 'sorted', 'reversed',
  'format', 'isinstance', 'issubclass', 'type', 'id', 'hash', 'open', 'dir',
  'vars', 'getattr', 'setattr', 'hasattr', 'map', 'filter', 'zip', 'any', 'all',
  'ValueError', 'TypeError', 'IndexError', 'KeyError', 'UnicodeEncodeError',
  'UnicodeDecodeError', 'SyntaxError', 'Exception', 'Template', 'Interpolation', 'convert'
]);

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Tô màu phần thân của f-string hoặc t-string (làm nổi bật biểu thức { ... })
 */
function highlightInterpolatedBody(rawBody, bodyClass) {
  let out = '';
  let i = 0;
  const n = rawBody.length;

  while (i < n) {
    if (rawBody[i] === '{') {
      if (i + 1 < n && rawBody[i + 1] === '{') {
        out += escapeHtml('{{');
        i += 2;
        continue;
      }
      // Tìm dấu } đóng tương ứng (hỗ trợ ngoặc nhọn lồng nhau như {x:{w}.{p}f})
      let depth = 1;
      let j = i + 1;
      while (j < n && depth > 0) {
        if (rawBody[j] === '{') depth++;
        else if (rawBody[j] === '}') depth--;
        j++;
      }
      const exprSlice = rawBody.slice(i, j);
      out += `<span class="tok-interp">${escapeHtml(exprSlice)}</span>`;
      i = j;
    } else if (rawBody[i] === '}' && i + 1 < n && rawBody[i + 1] === '}') {
      out += escapeHtml('}}');
      i += 2;
    } else {
      out += escapeHtml(rawBody[i]);
      i++;
    }
  }
  return `<span class="${bodyClass}">${out}</span>`;
}

/**
 * Tokenize toàn bộ đoạn mã Python 3.14 (hỗ trợ chuỗi nhiều dòng """...""")
 */
export function tokenizePython(code) {
  const src = String(code).replace(/\r\n/g, '\n');
  const len = src.length;
  let i = 0;
  let html = '';

  const prefixRegex = /^(?:fr|rf|br|rb|tr|rt|[frbut])(?=['"])/i;

  while (i < len) {
    const ch = src[i];

    // 1. Chú thích (# tới cuối dòng)
    if (ch === '#') {
      let end = src.indexOf('\n', i);
      if (end === -1) end = len;
      html += `<span class="tok-cmt">${escapeHtml(src.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // 2. Chuỗi có hoặc không có tiền tố (f, r, b, u, t, fr, rf, br, rb, tr, rt)
    let prefix = '';
    let quoteStart = i;
    const prevChar = i > 0 ? src[i - 1] : '';
    const isIdentifierPrev = /[A-Za-z0-9_]/.test(prevChar);

    if (!isIdentifierPrev) {
      const rest = src.slice(i, i + 3);
      const pm = rest.match(prefixRegex);
      if (pm) {
        prefix = pm[0];
        quoteStart = i + prefix.length;
      }
    }

    if (quoteStart < len && (src[quoteStart] === '"' || src[quoteStart] === "'")) {
      const qChar = src[quoteStart];
      const isTriple =
        quoteStart + 2 < len &&
        src[quoteStart + 1] === qChar &&
        src[quoteStart + 2] === qChar;
      const delim = isTriple ? qChar.repeat(3) : qChar;
      const isRaw = /r/i.test(prefix);
      const isTemplate = /t/i.test(prefix);
      const isFormatted = /[ft]/i.test(prefix);

      let j = quoteStart + delim.length;
      while (j < len) {
        if (src[j] === '\\' && !isRaw) {
          j += 2;
          continue;
        }
        if (src[j] === '\\' && isRaw) {
          // Trong raw string, \" vẫn thoát dấu nháy đóng
          j += 2;
          continue;
        }
        if (src.startsWith(delim, j)) {
          j += delim.length;
          break;
        }
        if (!isTriple && src[j] === '\n') {
          break;
        }
        j++;
      }

      const fullStringLiteral = src.slice(quoteStart, j);
      const bodyClass = isTemplate ? 'tok-tstr' : 'tok-str';

      if (prefix) {
        html += `<span class="tok-pfx">${escapeHtml(prefix)}</span>`;
      }
      if (isFormatted) {
        html += highlightInterpolatedBody(fullStringLiteral, bodyClass);
      } else {
        html += `<span class="${bodyClass}">${escapeHtml(fullStringLiteral)}</span>`;
      }
      i = j;
      continue;
    }

    // 3. Decorator (@...)
    if (ch === '@' && (i === 0 || src[i - 1] === '\n' || /\s/.test(src[i - 1]))) {
      let j = i + 1;
      while (j < len && /[A-Za-z0-9_.]/.test(src[j])) j++;
      html += `<span class="tok-dec">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // 4. Số (Hex, Bin, Oct, Float, Int có _)
    if (/[0-9]/.test(ch) && !isIdentifierPrev) {
      let j = i;
      if (src[j] === '0' && j + 1 < len && /[xXbBoO]/.test(src[j + 1])) {
        j += 2;
        while (j < len && /[0-9a-fA-F_]/.test(src[j])) j++;
      } else {
        while (j < len && /[0-9_.]/.test(src[j])) j++;
        if (j < len && /[eE]/.test(src[j])) {
          j++;
          if (j < len && /[+-]/.test(src[j])) j++;
          while (j < len && /[0-9_]/.test(src[j])) j++;
        }
      }
      html += `<span class="tok-num">${escapeHtml(src.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // 5. Định danh (Từ khóa, Builtin, hoặc Tên biến)
    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < len && /[A-Za-z0-9_]/.test(src[j])) j++;
      const word = src.slice(i, j);
      if (KEYWORDS.has(word)) {
        html += `<span class="tok-kw">${escapeHtml(word)}</span>`;
      } else if (BUILTINS.has(word)) {
        html += `<span class="tok-bi">${escapeHtml(word)}</span>`;
      } else {
        html += escapeHtml(word);
      }
      i = j;
      continue;
    }

    // 6. Toán tử cơ bản
    if ('+-*/%=<>!&|^~'.includes(ch)) {
      html += `<span class="tok-op">${escapeHtml(ch)}</span>`;
      i++;
      continue;
    }

    // 7. Ký tự thường & xuống dòng
    html += escapeHtml(ch);
    i++;
  }

  return html;
}

/**
 * Render khối code có đánh số dòng
 * Lưu ý: Vì chuỗi """...""" có thể trải trên nhiều dòng, ta đóng/mở lại thẻ span nếu qua dòng mới
 */
export function highlightPythonCode(code) {
  const tokenized = tokenizePython(code);
  const rawLines = tokenized.split('\n');
  let activeSpanOpen = '';

  const formattedLines = rawLines.map((lineHtml, idx) => {
    const prefixedLine = activeSpanOpen + lineHtml;

    // Kiểm tra xem cuối dòng có thẻ <span ...> nào chưa đóng bằng </span> không
    const opens = prefixedLine.match(/<span class="[^"]+">/g) || [];
    const closes = prefixedLine.match(/<\/span>/g) || [];
    let suffix = '';
    if (opens.length > closes.length) {
      activeSpanOpen = opens[opens.length - 1];
      suffix = '</span>';
    } else {
      activeSpanOpen = '';
    }

    const lineNumber = idx + 1;
    return `<div class="code-line"><span class="line-num">${lineNumber}</span><span class="line-content">${prefixedLine}${suffix}</span></div>`;
  });

  return formattedLines.join('');
}

const SAFE_HTML_TAGS = new Set([
  'code', '/code',
  'strong', '/strong',
  'b', '/b',
  'em', '/em',
  'i', '/i',
  'br',
  'span', '/span',
  'p', '/p',
  'ul', '/ul',
  'ol', '/ol',
  'li', '/li',
  'sub', '/sub',
  'sup', '/sup',
  'kbd', '/kbd',
  'mark', '/mark',
  'a', '/a',
  'blockquote', '/blockquote'
]);

function renderMathSnippet(latex, displayMode = false) {
  const trimmed = latex.trim();
  if (typeof window !== 'undefined' && window.katex && typeof window.katex.renderToString === 'function') {
    try {
      return window.katex.renderToString(trimmed, {
        displayMode: displayMode,
        throwOnError: false
      });
    } catch (_err) {
      // Nếu KaTeX gặp lỗi cú pháp thì dùng giải pháp thay thế văn bản bên dưới
    }
  }

  let s = escapeHtml(trimmed)
    .replace(/\\le\b/g, '≤')
    .replace(/\\ge\b/g, '≥')
    .replace(/\\ne\b/g, '≠')
    .replace(/\\times\b/g, '×')
    .replace(/\\div\b/g, '÷')
    .replace(/\\pm\b/g, '±')
    .replace(/\\to\b/g, '→')
    .replace(/\\in\b/g, '∈')
    .replace(/\\notin\b/g, '∉')
    .replace(/\\approx\b/g, '≈')
    .replace(/\\pi\b/g, 'π')
    .replace(/\\infty\b/g, '∞')
    .replace(/\\log\b/g, 'log')
    .replace(/\\ln\b/g, 'ln')
    .replace(/\\sin\b/g, 'sin')
    .replace(/\\cos\b/g, 'cos')
    .replace(/\\tan\b/g, 'tan')
    .replace(/\\max\b/g, 'max')
    .replace(/\\min\b/g, 'min')
    .replace(/\\%/g, '%')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>')
    .replace(/\^([0-9a-zA-Z+-]+)/g, '<sup>$1</sup>')
    .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
    .replace(/_([0-9a-zA-Z]+)/g, '<sub>$1</sub>');

  if (displayMode) {
    return `<div class="katex-display"><span class="math-inline">${s}</span></div>`;
  }
  return `<span class="math-inline">${s}</span>`;
}

/**
 * Định dạng văn bản có chứa inline `code`, công thức toán $...$, bảo toàn thẻ an toàn
 * và thoát HTML toàn bộ văn bản/ký tự so sánh để tránh nuốt chữ hoặc sinh thẻ HTML rác
 */
export function formatInlineCode(text) {
  if (!text) return '';
  const str = String(text);
  const tokenRegex = /(`[^`]+`|\$\$(?:\\.|[\s\S])*?\$\$|\$(?!\$|\{)(?:\\.|[^$\r\n])+\$|<[^>]+>)/g;
  let result = '';
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      result += escapeHtml(str.slice(lastIndex, match.index));
    }
    const token = match[0];
    lastIndex = tokenRegex.lastIndex;

    if (token.startsWith('`') && token.endsWith('`')) {
      const inner = token.slice(1, -1);
      result += `<code>${escapeHtml(inner)}</code>`;
    } else if (token.startsWith('$$') && token.endsWith('$$') && token.length > 4) {
      result += renderMathSnippet(token.slice(2, -2), true);
    } else if (token.startsWith('$') && token.endsWith('$') && token.length > 2) {
      result += renderMathSnippet(token.slice(1, -1), false);
    } else if (token.startsWith('<') && token.endsWith('>')) {
      const tagContent = token.slice(1, -1).trim();
      const tagNameMatch = tagContent.match(/^(\/?)([a-zA-Z0-9]+)/);
      if (tagNameMatch) {
        const fullTagName = (tagNameMatch[1] ? '/' : '') + tagNameMatch[2].toLowerCase();
        if (SAFE_HTML_TAGS.has(fullTagName)) {
          result += token;
          continue;
        }
      }
      result += escapeHtml(token);
    }
  }

  if (lastIndex < str.length) {
    result += escapeHtml(str.slice(lastIndex));
  }
  return result;
}
