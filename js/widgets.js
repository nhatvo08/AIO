/**
 * 5 Thành phần Trực quan Tương tác (Pure JS Widgets)
 * Đảm bảo đúng ngữ nghĩa Python 3.14.8 100%
 */

import { escapeHtml, highlightPythonCode, formatInlineCode } from './highlighter.js';
import { STR_METHODS, METHOD_CATEGORIES } from '../data/methods.js';

/**
 * Thuật toán cắt lát chuẩn CPython (PySlice_AdjustIndices)
 * Hoạt động trên mảng các Unicode code point (Array.from(str))
 */
export function computePythonSlice(codePoints, rawStart, rawStop, rawStep) {
  const length = codePoints.length;
  const step = rawStep === '' || rawStep === null || rawStep === undefined ? 1 : Number(rawStep);

  if (Number.isNaN(step) || !Number.isInteger(step)) {
    return { error: "TypeError: slice indices must be integers or None" };
  }
  if (step === 0) {
    return { error: "ValueError: slice step cannot be zero" };
  }

  const parseBound = (val) => {
    if (val === '' || val === null || val === undefined) return null;
    const n = Number(val);
    return Number.isInteger(n) ? n : 'INVALID';
  };

  let start = parseBound(rawStart);
  let stop = parseBound(rawStop);
  if (start === 'INVALID' || stop === 'INVALID') {
    return { error: "TypeError: slice indices must be integers or None" };
  }

  let adjStart;
  let adjStop;

  if (step > 0) {
    if (start === null) {
      adjStart = 0;
    } else {
      adjStart = start < 0 ? start + length : start;
      if (adjStart < 0) adjStart = 0;
      if (adjStart >= length) adjStart = length;
    }

    if (stop === null) {
      adjStop = length;
    } else {
      adjStop = stop < 0 ? stop + length : stop;
      if (adjStop < 0) adjStop = 0;
      if (adjStop >= length) adjStop = length;
    }
  } else {
    // step < 0
    if (start === null) {
      adjStart = length - 1;
    } else {
      adjStart = start < 0 ? start + length : start;
      if (adjStart < 0) adjStart = -1;
      if (adjStart >= length) adjStart = length - 1;
    }

    if (stop === null) {
      adjStop = -1;
    } else {
      adjStop = stop < 0 ? stop + length : stop;
      if (adjStop < 0) adjStop = -1;
      if (adjStop >= length) adjStop = length - 1;
    }
  }

  const selectedIndices = [];
  if (step > 0) {
    for (let i = adjStart; i < adjStop; i += step) {
      selectedIndices.push(i);
    }
  } else {
    for (let i = adjStart; i > adjStop; i += step) {
      selectedIndices.push(i);
    }
  }

  const resultChars = selectedIndices.map((idx) => codePoints[idx]);
  return {
    error: null,
    selectedIndices,
    result: resultChars.join(''),
    adjStart,
    adjStop,
    step
  };
}

/**
 * 1. BỘ XEM INDEX / SLICE (Slice Viewer)
 */
export function renderSliceViewer(container) {
  container.innerHTML = `
    <div class="widget-box" role="region" aria-label="Bộ mô phỏng Index và Slice Python">
      <div class="widget-header">
        <div class="widget-title">
          <span>🔬</span>
          <span>Bộ mô phỏng Index &amp; Slice: <code>s[start:stop:step]</code></span>
        </div>
        <span class="widget-badge">Chuẩn ngữ nghĩa CPython 3.14</span>
      </div>

      <div class="preset-row" aria-label="Các mẫu cắt lát nhanh">
        <button type="button" class="preset-chip" data-str="PYTHON 3.14" data-start="0" data-stop="6" data-step="1">Lấy "PYTHON" [0:6]</button>
        <button type="button" class="preset-chip" data-str="PYTHON 3.14" data-start="-4" data-stop="" data-step="1">4 ký tự cuối [-4:]</button>
        <button type="button" class="preset-chip" data-str="PYTHON 3.14" data-start="" data-stop="" data-step="2">Cách bước [::2]</button>
        <button type="button" class="preset-chip" data-str="PYTHON 3.14" data-start="" data-stop="" data-step="-1">Đảo ngược [::-1]</button>
        <button type="button" class="preset-chip" data-str="PYTHON 3.14" data-start="5" data-stop="0" data-step="-1">Step âm [5:0:-1]</button>
        <button type="button" class="preset-chip" data-str="PYTHON 3.14" data-start="-100" data-stop="999" data-step="1">Ngoài phạm vi [-100:999]</button>
      </div>

      <div class="widget-controls">
        <div class="widget-field">
          <label for="sv-input-str">Chuỗi <code>s</code> (tối đa 20 code points)</label>
          <input id="sv-input-str" type="text" class="widget-input" value="PYTHON 3.14" maxlength="24" />
        </div>
        <div class="widget-field">
          <label for="sv-start"><code>start</code> <span>(để trống = None)</span></label>
          <input id="sv-start" type="number" class="widget-input" value="0" placeholder="None" />
        </div>
        <div class="widget-field">
          <label for="sv-stop"><code>stop</code> <span>(không bao gồm)</span></label>
          <input id="sv-stop" type="number" class="widget-input" value="6" placeholder="None" />
        </div>
        <div class="widget-field">
          <label for="sv-step"><code>step</code> <span>(bước nhảy ≠ 0)</span></label>
          <input id="sv-step" type="number" class="widget-input" value="1" placeholder="1" />
        </div>
      </div>

      <div id="sv-cells-track" class="slice-cells-track" aria-live="polite"></div>
      <div id="sv-result-panel" class="slice-result-panel" aria-live="polite"></div>
    </div>
  `;

  const strInput = container.querySelector('#sv-input-str');
  const startInput = container.querySelector('#sv-start');
  const stopInput = container.querySelector('#sv-stop');
  const stepInput = container.querySelector('#sv-step');
  const trackEl = container.querySelector('#sv-cells-track');
  const resultEl = container.querySelector('#sv-result-panel');

  function update() {
    const rawStr = strInput.value;
    // Duyệt bằng Array.from để tách chuẩn theo Unicode code point
    const codePoints = Array.from(rawStr).slice(0, 20);
    const len = codePoints.length;

    const sVal = startInput.value.trim();
    const eVal = stopInput.value.trim();
    const stVal = stepInput.value.trim();

    const sliceInfo = computePythonSlice(codePoints, sVal, eVal, stVal);
    const orderMap = new Map();
    if (!sliceInfo.error) {
      sliceInfo.selectedIndices.forEach((idx, orderIdx) => {
        orderMap.set(idx, orderIdx + 1);
      });
    }

    if (len === 0) {
      trackEl.innerHTML = `<div style="padding:8px;color:var(--text-muted);">Chuỗi rỗng <code>""</code> (len = 0)</div>`;
    } else {
      trackEl.innerHTML = codePoints
        .map((cp, idx) => {
          const negIdx = idx - len;
          const isSelected = orderMap.has(idx);
          const orderNum = orderMap.get(idx);
          const displayChar = cp === ' ' ? '␣' : escapeHtml(cp);
          return `
            <div class="slice-cell ${isSelected ? 'selected' : ''}">
              ${isSelected ? `<span class="slice-order-badge" title="Thứ tự lấy #${orderNum}">${orderNum}</span>` : ''}
              <span class="slice-pos-idx" title="Chỉ số dương">${idx}</span>
              <span class="slice-char">${displayChar}</span>
              <span class="slice-neg-idx" title="Chỉ số âm">${negIdx}</span>
            </div>
          `;
        })
        .join('');
    }

    const sliceSyntax =
      stVal === '' || stVal === '1'
        ? `s[${sVal}:${eVal}]`
        : `s[${sVal}:${eVal}:${stVal}]`;

    if (sliceInfo.error) {
      resultEl.innerHTML = `
        <div class="slice-expr-line">&gt;&gt;&gt; s = ${ JSON.stringify(codePoints.join('')) }</div>
        <div class="slice-expr-line">&gt;&gt;&gt; ${escapeHtml(sliceSyntax)}</div>
        <div style="color:#f87171;font-weight:700;">${escapeHtml(sliceInfo.error)}</div>
      `;
    } else {
      const pyRepr = `'${sliceInfo.result.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
      resultEl.innerHTML = `
        <div class="slice-expr-line">&gt;&gt;&gt; s = '${escapeHtml(codePoints.join(''))}'  # len(s) = ${len}</div>
        <div class="slice-expr-line">&gt;&gt;&gt; ${escapeHtml(sliceSyntax)}</div>
        <div class="slice-out-line">${escapeHtml(pyRepr)}</div>
        <div class="slice-meta-line">
          Các chỉ số được chọn theo thứ tự: [${sliceInfo.selectedIndices.join(', ')}] — Độ dài kết quả: ${sliceInfo.selectedIndices.length}
        </div>
      `;
    }
  }

  [strInput, startInput, stopInput, stepInput].forEach((el) =>
    el.addEventListener('input', update)
  );

  container.querySelectorAll('.preset-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      strInput.value = btn.dataset.str;
      startInput.value = btn.dataset.start;
      stopInput.value = btn.dataset.stop;
      stepInput.value = btn.dataset.step;
      update();
    });
  });

  update();
}

/**
 * 2. TRÌNH XEM UNICODE / BYTES (Unicode & UTF-8/UTF-16 Explorer)
 */
export function renderUnicodeViewer(container) {
  container.innerHTML = `
    <div class="widget-box" role="region" aria-label="Trình khám phá Unicode Code Point và Bytes">
      <div class="widget-header">
        <div class="widget-title">
          <span>🌐</span>
          <span>Trình phân tích Unicode Code Point &amp; Bytes (UTF-8 / UTF-16)</span>
        </div>
        <span class="widget-badge">Duyệt chuẩn theo Code Point</span>
      </div>

      <div class="preset-row">
        <button type="button" class="preset-chip" data-val="Việt Nam">Tiếng Việt: "Việt Nam"</button>
        <button type="button" class="preset-chip" data-val="Phở">Từ "Phở" (5 bytes UTF-8)</button>
        <button type="button" class="preset-chip" data-val="Ho\u00e0">NFC: "Hoà" (3 code points)</button>
        <button type="button" class="preset-chip" data-val="Ho\u0300a">NFD: "Hòa" (4 code points)</button>
        <button type="button" class="preset-chip" data-val="🐍">Emoji "🐍" (U+1F40D)</button>
        <button type="button" class="preset-chip" data-val="🇻🇳">Cờ "🇻🇳" (2 Regional Indicators)</button>
      </div>

      <div class="widget-controls">
        <div class="widget-field">
          <label for="uv-input">Nhập văn bản cần mổ xẻ (tối đa 16 code points để xem chi tiết):</label>
          <input id="uv-input" type="text" class="widget-input" value="Phở 🇻🇳" maxlength="30" />
        </div>
      </div>

      <div id="uv-summary" class="unicode-summary-strip"></div>
      <div class="table-responsive">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Ký tự</th>
              <th><code>ord(c)</code></th>
              <th>Code Point</th>
              <th>Bytes UTF-8 (Hex)</th>
              <th>UTF-16BE (Hex)</th>
            </tr>
          </thead>
          <tbody id="uv-tbody"></tbody>
        </table>
      </div>
      <div id="uv-bytes-literal" class="slice-result-panel"></div>
    </div>
  `;

  const inputEl = container.querySelector('#uv-input');
  const summaryEl = container.querySelector('#uv-summary');
  const tbodyEl = container.querySelector('#uv-tbody');
  const bytesLiteralEl = container.querySelector('#uv-bytes-literal');
  const encoder = new TextEncoder();

  function getUtf16BeHex(cpStr) {
    const hexUnits = [];
    for (let i = 0; i < cpStr.length; i++) {
      const unit = cpStr.charCodeAt(i);
      const hi = ((unit >> 8) & 0xff).toString(16).toUpperCase().padStart(2, '0');
      const lo = (unit & 0xff).toString(16).toUpperCase().padStart(2, '0');
      hexUnits.push(`${hi} ${lo}`);
    }
    return hexUnits.join(' | ');
  }

  function toPythonBytesRepr(uint8Arr) {
    let out = "b'";
    for (const byte of uint8Arr) {
      if (byte === 0x5c) out += '\\\\';
      else if (byte === 0x27) out += "\\'";
      else if (byte >= 0x20 && byte <= 0x7e) out += String.fromCharCode(byte);
      else out += '\\x' + byte.toString(16).padStart(2, '0');
    }
    out += "'";
    return out;
  }

  function update() {
    // Dùng Array.from để duyệt đúng từng Unicode code point (không bị vỡ surrogate pair UTF-16)
    const codePoints = Array.from(inputEl.value).slice(0, 16);
    const cleanStr = codePoints.join('');
    const utf8Bytes = encoder.encode(cleanStr);
    const utf16ByteLen = cleanStr.length * 2;
    const utf32ByteLen = codePoints.length * 4;

    summaryEl.innerHTML = `
      <div class="unicode-stat-card">
        <div class="unicode-stat-val">${codePoints.length}</div>
        <div class="unicode-stat-lbl"><code>len(s)</code> (Code Points)</div>
      </div>
      <div class="unicode-stat-card">
        <div class="unicode-stat-val">${utf8Bytes.length} bytes</div>
        <div class="unicode-stat-lbl"><code>len(s.encode('utf-8'))</code></div>
      </div>
      <div class="unicode-stat-card">
        <div class="unicode-stat-val">${utf16ByteLen} bytes</div>
        <div class="unicode-stat-lbl">UTF-16BE (không BOM)</div>
      </div>
      <div class="unicode-stat-card">
        <div class="unicode-stat-val">${utf32ByteLen} bytes</div>
        <div class="unicode-stat-lbl">UTF-32BE (4 bytes/cp)</div>
      </div>
    `;

    if (codePoints.length === 0) {
      tbodyEl.innerHTML = `<tr><td colspan="6">Chuỗi rỗng <code>""</code></td></tr>`;
    } else {
      tbodyEl.innerHTML = codePoints
        .map((cp, idx) => {
          const ordVal = cp.codePointAt(0);
          const hexCode = 'U+' + ordVal.toString(16).toUpperCase().padStart(4, '0');
          const cpUtf8 = Array.from(encoder.encode(cp))
            .map((b) => `<span class="byte-pill">${b.toString(16).toUpperCase().padStart(2, '0')}</span>`)
            .join('');
          const cpUtf16 = getUtf16BeHex(cp);
          const isCombining = ordVal >= 0x0300 && ordVal <= 0x036f;
          const displayChar = cp === ' ' ? '␣ (space)' : isCombining ? `◌${cp} (dấu tổ hợp)` : escapeHtml(cp);

          return `
            <tr>
              <td><code>${idx}</code></td>
              <td style="font-size:1.15rem;font-weight:700;">${displayChar}</td>
              <td><code>${ordVal}</code></td>
              <td><code>${hexCode}</code></td>
              <td>${cpUtf8}</td>
              <td><code>${cpUtf16}</code></td>
            </tr>
          `;
        })
        .join('');
    }

    bytesLiteralEl.innerHTML = `
      <div class="slice-expr-line">&gt;&gt;&gt; s = ${JSON.stringify(cleanStr)}</div>
      <div class="slice-expr-line">&gt;&gt;&gt; s.encode("utf-8")</div>
      <div class="slice-out-line">${escapeHtml(toPythonBytesRepr(utf8Bytes))}</div>
    `;
  }

  inputEl.addEventListener('input', update);
  container.querySelectorAll('.preset-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      inputEl.value = btn.dataset.val;
      update();
    });
  });

  update();
}

/**
 * 3. SƠ ĐỒ TÍNH BẤT BIẾN (Immutability & id() Memory Visualizer)
 */
export function renderImmutabilityViewer(container) {
  const steps = [
    {
      stepTitle: 'Bước 1: Khởi tạo s = "Python"',
      code: `s = "Python"`,
      desc: 'CPython cấp phát một đối tượng str bất biến chứa "Python" trên Heap tại địa chỉ giả lập 0x7f8a1020. Tên biến s trỏ tới địa chỉ này.',
      vars: [{ name: 's', targetId: '0x7f8a1020' }],
      heap: [{ id: '0x7f8a1020', val: '"Python"', refCount: 1, active: true }]
    },
    {
      stepTitle: 'Bước 2: Gán b = s (Chia sẻ tham chiếu)',
      code: `s = "Python"\nb = s\nprint(id(s) == id(b))  # True`,
      desc: 'Gán b = s KHÔNG sao chép chuỗi! Vì str bất biến nên việc nhiều biến cùng trỏ vào một đối tượng "Python" hoàn toàn an toàn. Refcount tăng lên 2.',
      vars: [
        { name: 's', targetId: '0x7f8a1020' },
        { name: 'b', targetId: '0x7f8a1020' }
      ],
      heap: [{ id: '0x7f8a1020', val: '"Python"', refCount: 2, active: true }]
    },
    {
      stepTitle: 'Bước 3: Thử sửa tại chỗ s[0] = "J" -> Báo lỗi TypeError!',
      code: `s[0] = "J"  # ❌ TypeError: 'str' object does not support item assignment`,
      desc: 'Vì đối tượng str tại 0x7f8a1020 đã khóa cứng, Python ngăn chặn sửa đổi tại chỗ. Nhờ vậy biến b không bao giờ bị thay đổi ngoài ý muốn!',
      vars: [
        { name: 's', targetId: '0x7f8a1020' },
        { name: 'b', targetId: '0x7f8a1020' }
      ],
      heap: [{ id: '0x7f8a1020', val: '"Python" (Nguyên vẹn)', refCount: 2, active: true }]
    },
    {
      stepTitle: 'Bước 4: Nối chuỗi s += " 3.14" -> Tạo đối tượng MỚI!',
      code: `s += " 3.14"\nprint("s:", s, id(s))\nprint("b:", b, id(b))`,
      desc: 'Phép s += " 3.14" tạo ra một đối tượng str MỚI HOÀN TOÀN tại địa chỉ 0x7f8a1090 và đổi mũi tên của biến s sang đối tượng mới. Biến b vẫn giữ nguyên "Python" tại 0x7f8a1020!',
      vars: [
        { name: 's', targetId: '0x7f8a1090' },
        { name: 'b', targetId: '0x7f8a1020' }
      ],
      heap: [
        { id: '0x7f8a1020', val: '"Python"', refCount: 1, active: true },
        { id: '0x7f8a1090', val: '"Python 3.14"', refCount: 1, active: true }
      ]
    },
    {
      stepTitle: 'Bước 5: Gán lại b = "Done" -> Đối tượng cũ về refcount = 0',
      code: `b = "Done"`,
      desc: 'Khi biến cuối cùng rời khỏi đối tượng 0x7f8a1020, bộ đếm tham chiếu (refcount) của "Python" giảm về 0 và bộ thu gom rác của CPython thu hồi vùng nhớ đó.',
      vars: [
        { name: 's', targetId: '0x7f8a1090' },
        { name: 'b', targetId: '0x7f8a1140' }
      ],
      heap: [
        { id: '0x7f8a1020', val: '"Python" (Đã giải phóng)', refCount: 0, active: false },
        { id: '0x7f8a1090', val: '"Python 3.14"', refCount: 1, active: true },
        { id: '0x7f8a1140', val: '"Done"', refCount: 1, active: true }
      ]
    }
  ];

  let currentIdx = 0;

  container.innerHTML = `
    <div class="widget-box" role="region" aria-label="Sơ đồ mô phỏng tính bất biến của chuỗi">
      <div class="widget-header">
        <div class="widget-title">
          <span>🧊</span>
          <span>Sơ đồ Bộ nhớ: Tính bất biến (Immutability) &amp; <code>id()</code></span>
        </div>
        <span class="widget-badge">Stack Names → Heap Objects</span>
      </div>

      <div class="preset-row" id="immut-step-btns">
        ${steps
          .map(
            (st, i) =>
              `<button type="button" class="preset-chip" data-step="${i}">Bước ${i + 1}</button>`
          )
          .join('')}
      </div>

      <div id="immut-body"></div>
    </div>
  `;

  const bodyEl = container.querySelector('#immut-body');
  const btns = container.querySelectorAll('#immut-step-btns .preset-chip');

  function renderStep() {
    const st = steps[currentIdx];
    btns.forEach((b, i) => {
      b.style.borderColor = i === currentIdx ? 'var(--accent-primary)' : '';
      b.style.background = i === currentIdx ? 'var(--accent-soft)' : '';
      b.style.fontWeight = i === currentIdx ? '700' : '400';
    });

    bodyEl.innerHTML = `
      <div style="margin-bottom:10px;font-weight:700;color:var(--accent-primary);">${escapeHtml(st.stepTitle)}</div>
      <p style="font-size:0.9rem;margin-bottom:12px;">${escapeHtml(st.desc)}</p>
      <div class="code-example-card" style="margin:10px 0 14px;">
        <pre class="code-pre">${highlightPythonCode(st.code)}</pre>
      </div>
      <div class="immut-stage">
        <div class="immut-vars-col">
          <div class="immut-col-title">Không gian tên biến (Variables / Names)</div>
          ${st.vars
            .map(
              (v) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;margin-bottom:8px;font-family:var(--font-mono);">
                <strong>${escapeHtml(v.name)}</strong>
                <span style="color:var(--accent-primary);">───► id: ${escapeHtml(v.targetId)}</span>
              </div>
            `
            )
            .join('')}
        </div>
        <div class="immut-heap-col">
          <div class="immut-col-title">Bộ nhớ Heap (Đối tượng PyUnicodeObject bất biến)</div>
          ${st.heap
            .map(
              (h) => `
              <div class="heap-obj-card ${h.active ? '' : 'unreferenced'}">
                <div class="heap-id-tag">
                  <span>id: ${escapeHtml(h.id)}</span>
                  <span>refcount: ${h.refCount}</span>
                </div>
                <div class="heap-str-val">${escapeHtml(h.val)}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);">type: &lt;class 'str'&gt; (immutable)</div>
              </div>
            `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentIdx = Number(btn.dataset.step);
      renderStep();
    });
  });

  renderStep();
}

/**
 * 4. TRÌNH KHÁM PHÁ 47 PHƯƠNG THỨC CỦA STR (Method Explorer)
 */
export function renderMethodExplorer(container) {
  let activeCategory = 'all';
  let searchQuery = '';
  let selectedMethodName = 'strip';

  container.innerHTML = `
    <div class="widget-box" role="region" aria-label="Trình khám phá 47 phương thức của str">
      <div class="widget-header">
        <div class="widget-title">
          <span>🧭</span>
          <span>Trình Khám phá 47 Phương thức Public của <code>str</code></span>
        </div>
        <span class="widget-badge">Khớp 100% dir(str) Python 3.14</span>
      </div>

      <div class="widget-controls">
        <div class="widget-field">
          <label for="me-search">Tìm kiếm theo tên phương thức hoặc công dụng:</label>
          <input id="me-search" type="search" class="widget-input" placeholder="Ví dụ: split, prefix, casefold, decimal..." />
        </div>
      </div>

      <div id="me-cats" class="method-filter-bar"></div>
      <div id="me-grid" class="methods-grid"></div>
      <div id="me-detail" class="method-detail-panel" aria-live="polite"></div>
    </div>
  `;

  const searchInput = container.querySelector('#me-search');
  const catsEl = container.querySelector('#me-cats');
  const gridEl = container.querySelector('#me-grid');
  const detailEl = container.querySelector('#me-detail');

  function renderCategories() {
    catsEl.innerHTML = METHOD_CATEGORIES.map(
      (cat) => `
        <button type="button" class="method-cat-btn ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
          ${escapeHtml(cat.label)}
        </button>
      `
    ).join('');

    catsEl.querySelectorAll('.method-cat-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        renderCategories();
        renderGrid();
      });
    });
  }

  function getFilteredMethods() {
    const q = searchQuery.trim().toLowerCase();
    return STR_METHODS.filter((m) => {
      const matchCat = activeCategory === 'all' || m.category === activeCategory;
      const matchQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.shortDesc.toLowerCase().includes(q) ||
        m.signature.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }

  function renderDetail(methodObj) {
    if (!methodObj) {
      detailEl.innerHTML = `<p style="margin:0;color:var(--text-muted);">Không tìm thấy phương thức khớp bộ lọc.</p>`;
      return;
    }

    detailEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
        <h3 style="margin:0;font-family:var(--font-mono);color:var(--accent-primary);font-size:1.15rem;">
          ${escapeHtml(methodObj.signature)}
        </h3>
        <span class="badge-new-314">str.${escapeHtml(methodObj.name)}</span>
      </div>
      <p style="margin-bottom:8px;"><strong>Mô tả:</strong> ${escapeHtml(methodObj.shortDesc)}</p>
      <p style="margin-bottom:8px;font-size:0.88rem;"><strong>Tham số:</strong> ${escapeHtml(methodObj.params)}</p>
      <p style="margin-bottom:12px;font-size:0.88rem;"><strong>Giá trị trả về:</strong> ${escapeHtml(methodObj.returns)}</p>

      <div class="code-example-card" style="margin:10px 0;">
        <div class="code-card-header">
          <div class="code-header-left">
            <span class="lang-tag">Python 3.14</span>
            <span>Ví dụ: str.${escapeHtml(methodObj.name)}()</span>
          </div>
        </div>
        <pre class="code-pre">${highlightPythonCode(methodObj.example)}</pre>
        <div class="code-output-block">
          <div class="output-label"><span>Output</span></div>
          <pre class="output-pre">${escapeHtml(methodObj.output)}</pre>
        </div>
      </div>

      <div class="callout-box callout-pitfall" style="margin:10px 0 0;">
        <div class="callout-header"><span>⚠️</span> <span>Lưu ý &amp; Lỗi thường gặp</span></div>
        <div class="callout-body"><p>${formatInlineCode(methodObj.pitfall)}</p></div>
      </div>
    `;
  }

  function renderGrid() {
    const filtered = getFilteredMethods();
    if (filtered.length > 0 && !filtered.some((m) => m.name === selectedMethodName)) {
      selectedMethodName = filtered[0].name;
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = `<div style="grid-column:1/-1;padding:12px;color:var(--text-muted);">Không có phương thức nào khớp từ khóa "${escapeHtml(searchQuery)}".</div>`;
      renderDetail(null);
      return;
    }

    gridEl.innerHTML = filtered
      .map(
        (m) => `
        <button type="button" class="method-item-card ${m.name === selectedMethodName ? 'active' : ''}" data-name="${m.name}">
          <div class="method-item-name">.<span>${escapeHtml(m.name)}</span>()</div>
          <div class="method-item-short">${escapeHtml(m.shortDesc)}</div>
        </button>
      `
      )
      .join('');

    gridEl.querySelectorAll('.method-item-card').forEach((card) => {
      card.addEventListener('click', () => {
        selectedMethodName = card.dataset.name;
        renderGrid();
      });
    });

    const selectedObj = STR_METHODS.find((m) => m.name === selectedMethodName) || filtered[0];
    renderDetail(selectedObj);
  }

  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    renderGrid();
  });

  renderCategories();
  renderGrid();
}

/**
 * 5. BỘ DỰNG FORMAT SPEC (Format Specification Mini-Language Builder)
 * Chỉ cho phép chọn các tổ hợp hợp lệ và tính toán đúng chuẩn Python 3.14
 */
export function renderFormatBuilder(container) {
  const SAMPLES = {
    float_pos: { label: 'Số thực dương: 12345.6789', val: 12345.6789, kind: 'float', pyLiteral: '12345.6789' },
    float_neg: { label: 'Số thực âm: -42.5', val: -42.5, kind: 'float', pyLiteral: '-42.5' },
    int_pos:   { label: 'Số nguyên: 255', val: 255, kind: 'int', pyLiteral: '255' },
    int_big:   { label: 'Số nguyên lớn: 1000000', val: 1000000, kind: 'int', pyLiteral: '1000000' },
    ratio:     { label: 'Tỷ lệ phần trăm: 0.8765', val: 0.8765, kind: 'float', pyLiteral: '0.8765' },
    text:      { label: 'Chuỗi văn bản: "Python"', val: 'Python', kind: 'str', pyLiteral: '"Python"' }
  };

  container.innerHTML = `
    <div class="widget-box" role="region" aria-label="Bộ dựng Format Spec Mini-Language">
      <div class="widget-header">
        <div class="widget-title">
          <span>🎛️</span>
          <span>Bộ dựng Format Specification Mini-Language</span>
        </div>
        <span class="widget-badge">[[fill]align][sign][#][0][width][grouping_option][.precision][type]</span>
      </div>

      <div class="widget-controls">
        <div class="widget-field">
          <label for="fb-sample">Giá trị đầu vào (<code>val</code>)</label>
          <select id="fb-sample" class="widget-select">
            ${Object.entries(SAMPLES)
              .map(([k, v]) => `<option value="${k}">${escapeHtml(v.label)}</option>`)
              .join('')}
          </select>
        </div>

        <div class="widget-field">
          <label for="fb-fill">Ký tự đệm (<code>fill</code>)</label>
          <select id="fb-fill" class="widget-select">
            <option value="">Mặc định (dấu cách)</option>
            <option value=".">Dấu chấm (.)</option>
            <option value="*">Dấu sao (*)</option>
            <option value="_">Gạch dưới (_)</option>
            <option value="0">Số không (0)</option>
          </select>
        </div>

        <div class="widget-field">
          <label for="fb-align">Căn lề (<code>align</code>)</label>
          <select id="fb-align" class="widget-select">
            <option value="">Mặc định</option>
            <option value="<">&lt; (Căn trái)</option>
            <option value=">">&gt; (Căn phải)</option>
            <option value="^">^ (Căn giữa)</option>
            <option value="=">= (Đệm sau dấu +/- cho số)</option>
          </select>
        </div>

        <div class="widget-field">
          <label for="fb-sign">Dấu (<code>sign</code> - chỉ cho số)</label>
          <select id="fb-sign" class="widget-select">
            <option value="">- (Chỉ hiện khi âm)</option>
            <option value="+">+ (Luôn hiện + hoặc -)</option>
            <option value=" ">␣ (Cách khi dương, - khi âm)</option>
          </select>
        </div>

        <div class="widget-field">
          <label for="fb-width">Độ rộng tối thiểu (<code>width</code>)</label>
          <select id="fb-width" class="widget-select">
            <option value="">Không giới hạn</option>
            <option value="10">10</option>
            <option value="14" selected>14</option>
            <option value="18">18</option>
          </select>
        </div>

        <div class="widget-field">
          <label for="fb-group">Phân nhóm nghìn (<code>grouping</code>)</label>
          <select id="fb-group" class="widget-select">
            <option value="">Không phân nhóm</option>
            <option value="," selected>, (Dấu phẩy: 12,345)</option>
            <option value="_">_ (Gạch dưới: 12_345)</option>
          </select>
        </div>

        <div class="widget-field">
          <label for="fb-prec">Độ chính xác (<code>.precision</code>)</label>
          <select id="fb-prec" class="widget-select">
            <option value="">Mặc định</option>
            <option value="0">.0</option>
            <option value="2" selected>.2</option>
            <option value="4">.4</option>
          </select>
        </div>

        <div class="widget-field">
          <label for="fb-type">Kiểu biểu diễn (<code>type</code>)</label>
          <select id="fb-type" class="widget-select"></select>
        </div>
      </div>

      <div id="fb-output" class="slice-result-panel" aria-live="polite"></div>
      <div id="fb-ruler" class="format-preview-ruler" aria-label="Thước đo ký tự kết quả"></div>
    </div>
  `;

  const sampleEl = container.querySelector('#fb-sample');
  const fillEl = container.querySelector('#fb-fill');
  const alignEl = container.querySelector('#fb-align');
  const signEl = container.querySelector('#fb-sign');
  const widthEl = container.querySelector('#fb-width');
  const groupEl = container.querySelector('#fb-group');
  const precEl = container.querySelector('#fb-prec');
  const typeEl = container.querySelector('#fb-type');
  const outputEl = container.querySelector('#fb-output');
  const rulerEl = container.querySelector('#fb-ruler');

  function syncAllowedTypes() {
    const sample = SAMPLES[sampleEl.value];
    const currentType = typeEl.value;
    let options = [];

    if (sample.kind === 'float') {
      options = [
        { val: 'f', label: 'f (Số thực dấu phẩy tĩnh)' },
        { val: '%', label: '% (Phần trăm × 100%)' },
        { val: 'e', label: 'e (Ký hiệu khoa học)' }
      ];
      signEl.disabled = false;
      groupEl.disabled = false;
      precEl.disabled = false;
    } else if (sample.kind === 'int') {
      options = [
        { val: 'd', label: 'd (Thập phân)' },
        { val: 'x', label: 'x (Hệ 16 thường - hex)' },
        { val: 'X', label: 'X (Hệ 16 HOA - HEX)' },
        { val: '#x', label: '#x (Hex kèm tiền tố 0x)' },
        { val: 'b', label: 'b (Nhị phân - binary)' },
        { val: '#b', label: '#b (Nhị phân kèm 0b)' },
        { val: 'o', label: 'o (Bát phân - octal)' }
      ];
      signEl.disabled = false;
      groupEl.disabled = false;
      precEl.value = '';
      precEl.disabled = true;
    } else {
      // Chuỗi str
      options = [{ val: 's', label: 's (Chuỗi văn bản)' }];
      signEl.value = '';
      signEl.disabled = true;
      groupEl.value = '';
      groupEl.disabled = true;
      precEl.disabled = false;
      if (alignEl.value === '=') alignEl.value = '<';
    }

    typeEl.innerHTML = options
      .map((o) => `<option value="${o.val}">${escapeHtml(o.label)}</option>`)
      .join('');
    if (options.some((o) => o.val === currentType)) {
      typeEl.value = currentType;
    }
  }

  function formatNumberGroup(intStr, sep, groupSize = 3) {
    if (!sep) return intStr;
    const re = new RegExp(`\\B(?=(\\d{${groupSize}})+(?!\\d))`, 'g');
    return intStr.replace(re, sep);
  }

  function update() {
    const sample = SAMPLES[sampleEl.value];
    const fill = fillEl.value;
    let align = alignEl.value;
    if (fill && !align) {
      align = sample.kind === 'str' ? '<' : '>';
    }
    const sign = sample.kind === 'str' ? '' : signEl.value;
    const width = widthEl.value ? Number(widthEl.value) : 0;
    let group = sample.kind === 'str' ? '' : groupEl.value;
    const prec = precEl.disabled || precEl.value === '' ? null : Number(precEl.value);
    const rawType = typeEl.value;
    const hasAlt = rawType.startsWith('#');
    const typeChar = hasAlt ? rawType.slice(1) : rawType;

    // Trong Python, dấu phẩy ',' không dùng chung với kiểu 'b', 'o', 'x', 'X' (chỉ '_' được phép)
    if (['b', 'o', 'x', 'X'].includes(typeChar) && group === ',') {
      group = '';
    }

    const specParts = [];
    if (fill) specParts.push(fill + align);
    else if (align) specParts.push(align);
    if (sign) specParts.push(sign);
    if (hasAlt) specParts.push('#');
    if (width) specParts.push(String(width));
    if (group) specParts.push(group);
    if (prec !== null) specParts.push('.' + prec);
    if (typeChar) specParts.push(typeChar);
    const specStr = specParts.join('');

    // Tính kết quả đúng chuẩn Python 3.14
    let signPrefix = '';
    let basePrefix = '';
    let bodyCore = '';

    if (sample.kind === 'str') {
      bodyCore = prec !== null ? sample.val.slice(0, prec) : sample.val;
    } else {
      const num = sample.val;
      const isNeg = num < 0;
      const absNum = Math.abs(num);

      if (isNeg) signPrefix = '-';
      else if (sign === '+') signPrefix = '+';
      else if (sign === ' ') signPrefix = ' ';

      if (typeChar === 'd') {
        bodyCore = formatNumberGroup(String(Math.trunc(absNum)), group, 3);
      } else if (typeChar === 'x' || typeChar === 'X') {
        if (hasAlt) basePrefix = typeChar === 'x' ? '0x' : '0X';
        const hexRaw = Math.trunc(absNum).toString(16);
        const hexCased = typeChar === 'X' ? hexRaw.toUpperCase() : hexRaw;
        bodyCore = group === '_' ? hexCased.replace(/\B(?=(.{4})+(?!.))/g, '_') : hexCased;
      } else if (typeChar === 'b') {
        if (hasAlt) basePrefix = '0b';
        const binRaw = Math.trunc(absNum).toString(2);
        bodyCore = group === '_' ? binRaw.replace(/\B(?=(.{4})+(?!.))/g, '_') : binRaw;
      } else if (typeChar === 'o') {
        if (hasAlt) basePrefix = '0o';
        const octRaw = Math.trunc(absNum).toString(8);
        bodyCore = group === '_' ? octRaw.replace(/\B(?=(.{4})+(?!.))/g, '_') : octRaw;
      } else if (typeChar === 'f') {
        const p = prec !== null ? prec : 6;
        const fixed = absNum.toFixed(p);
        const [intPart, decPart] = fixed.split('.');
        const groupedInt = formatNumberGroup(intPart, group, 3);
        bodyCore = decPart !== undefined ? `${groupedInt}.${decPart}` : groupedInt;
      } else if (typeChar === '%') {
        const p = prec !== null ? prec : 6;
        const fixed = (absNum * 100).toFixed(p);
        const [intPart, decPart] = fixed.split('.');
        const groupedInt = formatNumberGroup(intPart, group, 3);
        bodyCore = (decPart !== undefined ? `${groupedInt}.${decPart}` : groupedInt) + '%';
      } else if (typeChar === 'e') {
        const p = prec !== null ? prec : 6;
        const expStr = absNum.toExponential(p);
        const [mant, expPart] = expStr.split('e');
        const expSign = expPart[0];
        const expDigits = expPart.slice(1).padStart(2, '0');
        bodyCore = `${mant}e${expSign}${expDigits}`;
      }
    }

    const unpaddedLen = signPrefix.length + basePrefix.length + bodyCore.length;
    const padCount = Math.max(0, width - unpaddedLen);
    const padChar = fill || ' ';

    let finalStr = '';
    const effectiveAlign = align || (sample.kind === 'str' ? '<' : '>');

    if (effectiveAlign === '<') {
      finalStr = signPrefix + basePrefix + bodyCore + padChar.repeat(padCount);
    } else if (effectiveAlign === '>') {
      finalStr = padChar.repeat(padCount) + signPrefix + basePrefix + bodyCore;
    } else if (effectiveAlign === '=') {
      finalStr = signPrefix + basePrefix + padChar.repeat(padCount) + bodyCore;
    } else if (effectiveAlign === '^') {
      const leftPad = Math.floor(padCount / 2);
      const rightPad = padCount - leftPad;
      finalStr = padChar.repeat(leftPad) + signPrefix + basePrefix + bodyCore + padChar.repeat(rightPad);
    }

    outputEl.innerHTML = `
      <div class="slice-expr-line">&gt;&gt;&gt; val = ${escapeHtml(sample.pyLiteral)}</div>
      <div class="slice-expr-line">&gt;&gt;&gt; f"{val:${escapeHtml(specStr)}}"</div>
      <div class="slice-out-line">'${escapeHtml(finalStr)}'</div>
      <div class="slice-meta-line">Format Spec: "${escapeHtml(specStr)}" — Độ dài chuỗi kết quả: ${finalStr.length} ký tự</div>
    `;

    rulerEl.innerHTML = Array.from(finalStr)
      .map((ch, idx) => {
        const disp = ch === ' ' ? '␣' : escapeHtml(ch);
        return `
          <div class="fmt-char-box" title="Vị trí ${idx}">
            <span>${disp}</span>
            <span style="font-size:0.62rem;color:#94a3b8;">${idx}</span>
          </div>
        `;
      })
      .join('');
  }

  sampleEl.addEventListener('change', () => {
    syncAllowedTypes();
    update();
  });

  [fillEl, alignEl, signEl, widthEl, groupEl, precEl, typeEl].forEach((el) =>
    el.addEventListener('change', update)
  );

  syncAllowedTypes();
  update();
}

/**
 * Gắn widget tương tác vào vùng chứa của bài học dựa theo tên widget
 */
export function mountLessonWidget(widgetType, container) {
  if (!container || !widgetType) return;
  switch (widgetType) {
    case 'slice-viewer':
      renderSliceViewer(container);
      break;
    case 'unicode-viewer':
      renderUnicodeViewer(container);
      break;
    case 'immutability-viewer':
      renderImmutabilityViewer(container);
      break;
    case 'method-explorer':
      renderMethodExplorer(container);
      break;
    case 'format-builder':
      renderFormatBuilder(container);
      break;
    case 'ieee754-inspector':
      renderIEEE754Inspector(container);
      break;
    default:
      break;
  }
}

/**
 * 6. BỘ SOI 64 BIT IEEE 754 (IEEE 754 Float 64-bit Inspector)
 * Dùng DataView & BigInt chuẩn xác 100%, không giả lập
 */
export function renderIEEE754Inspector(container) {
  container.innerHTML = `
    <div class="widget-box ieee-widget-box">
      <div class="widget-header">
        <div class="widget-title">
          <span>🔬</span>
          <span>Kính Hiển Vi 64-Bit IEEE 754 Float Inspector</span>
        </div>
        <span class="widget-badge">binary64 · Double Precision</span>
      </div>

      <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:14px;">
        Khám phá chính xác 64 bit được lưu trong thanh ghi vi xử lý khi Python xử lý một số <code>float</code>. Bóc tách từng bit dấu (Sign), 11 bit số mũ (Exponent) và 52 bit phần định trị (Mantissa) để chứng minh nguồn gốc sai số nhị phân.
      </p>

      <div class="preset-row">
        <span style="font-size:0.8rem;color:var(--text-muted);align-self:center;">Mẫu thử nghiệm:</span>
        <button type="button" class="preset-chip active" data-val="0.1">0.1 (Tuần hoàn)</button>
        <button type="button" class="preset-chip" data-val="0.2">0.2 (Tuần hoàn)</button>
        <button type="button" class="preset-chip" data-val="0.3">0.3 (Tuần hoàn)</button>
        <button type="button" class="preset-chip" data-val="2.675">2.675 (Bẫy round)</button>
        <button type="button" class="preset-chip" data-val="0.125">0.125 (Lũy thừa 2)</button>
        <button type="button" class="preset-chip" data-val="0.75">0.75 (Lũy thừa 2)</button>
        <button type="button" class="preset-chip" data-val="-0.0">-0.0 (Số 0 âm)</button>
        <button type="button" class="preset-chip" data-val="Infinity">+inf</button>
        <button type="button" class="preset-chip" data-val="NaN">nan (NaN != NaN)</button>
      </div>

      <div class="widget-controls" style="grid-template-columns: 1fr auto;">
        <div class="widget-field">
          <label for="ieee-input-val">
            <span>Nhập số float bất kỳ (hoặc biểu thức số):</span>
            <span id="ieee-type-indicator" style="color:var(--accent-text);font-family:var(--font-mono);">float</span>
          </label>
          <input
            type="text"
            id="ieee-input-val"
            class="widget-input"
            value="0.1"
            placeholder="Nhập vd: 0.1, -3.14, 1e-4, 2.675, inf, nan..."
          />
        </div>
        <div style="align-self:flex-end;">
          <button type="button" id="ieee-calc-btn" class="btn-primary" style="padding:9px 18px;height:42px;">
            <span>Phân tích Bit ➔</span>
          </button>
        </div>
      </div>

      <!-- Trình hiển thị 64 ô bit -->
      <div class="ieee-bitfield-card">
        <div class="ieee-bitfield-header">
          <div class="ieee-legend">
            <span class="legend-item"><span class="legend-dot sign"></span> <strong>1 Bit Dấu (Sign)</strong> [63]</span>
            <span class="legend-item"><span class="legend-dot exp"></span> <strong>11 Bit Mũ (Exponent)</strong> [62..52]</span>
            <span class="legend-item"><span class="legend-dot frac"></span> <strong>52 Bit Định Trị (Mantissa)</strong> [51..0]</span>
          </div>
        </div>

        <div class="ieee-bits-stream" id="ieee-bits-stream" aria-label="64 bit nhị phân"></div>
      </div>

      <!-- Bảng giải mã chi tiết các trường -->
      <div class="ieee-analysis-grid" id="ieee-analysis-grid"></div>
    </div>
  `;

  const inputEl = container.querySelector('#ieee-input-val');
  const calcBtn = container.querySelector('#ieee-calc-btn');
  const bitsStreamEl = container.querySelector('#ieee-bits-stream');
  const analysisGridEl = container.querySelector('#ieee-analysis-grid');
  const presetChips = container.querySelectorAll('.preset-chip');

  function parseInputValue(str) {
    const trimmed = String(str).trim();
    if (trimmed.toLowerCase() === 'infinity' || trimmed.toLowerCase() === '+infinity' || trimmed.toLowerCase() === 'inf' || trimmed.toLowerCase() === '+inf') {
      return Infinity;
    }
    if (trimmed.toLowerCase() === '-infinity' || trimmed.toLowerCase() === '-inf') {
      return -Infinity;
    }
    if (trimmed.toLowerCase() === 'nan') {
      return NaN;
    }
    if (trimmed === '-0' || trimmed === '-0.0') {
      return -0.0;
    }
    const num = Number(trimmed);
    return num;
  }

  function formatHexPython(num, expRaw, mantissaBig) {
    if (Number.isNaN(num)) return "nan";
    if (num === Infinity) return "inf";
    if (num === -Infinity) return "-inf";
    if (Object.is(num, -0.0)) return "-0x0.0p+0";
    if (num === 0.0) return "0x0.0p+0";

    const isNeg = num < 0 || Object.is(num, -0.0);
    const signPrefix = isNeg ? '-' : '';
    
    if (expRaw === 0) {
      // Subnormal
      const fracHex = mantissaBig.toString(16).padStart(13, '0');
      return `${signPrefix}0x0.${fracHex.replace(/0+$/, '') || '0'}p-1022`;
    }
    
    // Normal: 0x1.xxxxp+exp
    const unbiased = expRaw - 1023;
    const fracHex = mantissaBig.toString(16).padStart(13, '0');
    const trimmedFrac = fracHex.replace(/0+$/, '') || '0';
    const expSign = unbiased >= 0 ? '+' : '';
    return `${signPrefix}0x1.${trimmedFrac}p${expSign}${unbiased}`;
  }

  function update() {
    const rawInput = inputEl.value;
    const val = parseInputValue(rawInput);

    // Dùng ArrayBuffer và DataView để đọc chính xác 64 bit trên RAM
    const buf = new ArrayBuffer(8);
    const view = new DataView(buf);
    view.setFloat64(0, val);

    const bits64 = view.getBigUint64(0);
    const sign = Number((bits64 >> 63n) & 1n);
    const expRaw = Number((bits64 >> 52n) & 0x7FFn);
    const mantissaBig = bits64 & 0xFFFFFFFFFFFFFn;

    const signBin = String(sign);
    const expBin = expRaw.toString(2).padStart(11, '0');
    const fracBin = mantissaBig.toString(2).padStart(52, '0');

    // 1. Render 64 bit với nhãn và màu sắc
    const bitCards = [];
    // Bit dấu [63]
    bitCards.push(`
      <div class="bit-item bit-sign" title="Bit 63: Dấu (${sign === 0 ? '+ Dương' : '- Âm'})">
        <span class="bit-val">${signBin}</span>
        <span class="bit-idx">63</span>
      </div>
    `);
    // 11 bit số mũ [62..52]
    for (let i = 0; i < 11; i++) {
      const bitIdx = 62 - i;
      bitCards.push(`
        <div class="bit-item bit-exp" title="Bit ${bitIdx}: Số mũ [exp]">
          <span class="bit-val">${expBin[i]}</span>
          <span class="bit-idx">${bitIdx}</span>
        </div>
      `);
    }
    // 52 bit định trị [51..0]
    for (let i = 0; i < 52; i++) {
      const bitIdx = 51 - i;
      bitCards.push(`
        <div class="bit-item bit-frac" title="Bit ${bitIdx}: Định trị [mantissa]">
          <span class="bit-val">${fracBin[i]}</span>
          <span class="bit-idx">${bitIdx}</span>
        </div>
      `);
    }

    bitsStreamEl.innerHTML = bitCards.join('');

    // 2. Tính toán phân tích
    let category = "Số chuẩn (Normalized Number)";
    let expActual = expRaw - 1023;
    let formulaDesc = "";
    let exactStoredVal = "";

    if (expRaw === 0x7FF) {
      if (mantissaBig === 0n) {
        category = sign === 0 ? "Dương vô cực (+Infinity)" : "Âm vô cực (-Infinity)";
        formulaDesc = sign === 0 ? "+inf (Tràn số dương)" : "-inf (Tràn số âm)";
        exactStoredVal = sign === 0 ? "+inf" : "-inf";
      } else {
        category = "Không phải là số (NaN - Not a Number)";
        formulaDesc = "nan (Kết quả của 0.0/0.0 hoặc phép tính vô định)";
        exactStoredVal = "nan";
      }
    } else if (expRaw === 0) {
      if (mantissaBig === 0n) {
        category = sign === 0 ? "Số 0 dương (+0.0)" : "Số 0 âm (-0.0)";
        formulaDesc = sign === 0 ? "+0.0" : "-0.0 (Dấu âm được lưu riêng biệt)";
        exactStoredVal = sign === 0 ? "0.0" : "-0.0";
      } else {
        category = "Số dưới chuẩn (Subnormal / Denormalized)";
        expActual = -1022;
        formulaDesc = `(-1)^${sign} × 2^(-1022) × (0 + ${fracBin.slice(0, 10)}...)`;
        exactStoredVal = String(val);
      }
    } else {
      formulaDesc = `(-1)^${sign} × 2^(${expRaw} - 1023) × (1 + phân số 52-bit)`;
      exactStoredVal = String(val);
    }

    const pyHex = formatHexPython(val, expRaw, mantissaBig);

    function floatAsIntegerRatio(v) {
      if (!Number.isFinite(v)) return 'OverflowError: cannot convert float infinity/NaN to integer ratio';
      if (v === 0) return '(0, 1)';
      let num, den;
      if (expRaw === 0) {
        if (mantissaBig === 0n) return '(0, 1)';
        num = mantissaBig;
        den = 1n << (1022n + 52n);
      } else {
        num = (1n << 52n) | mantissaBig;
        const exp = BigInt(expRaw - 1023);
        if (exp >= 52n) {
          num = num << (exp - 52n);
          den = 1n;
        } else {
          den = 1n << (52n - exp);
        }
      }
      function gcd(a, b) {
        while (b !== 0n) {
          const t = b;
          b = a % b;
          a = t;
        }
        return a;
      }
      const g = gcd(num, den);
      num = num / g;
      den = den / g;
      if (sign === 1) num = -num;
      return `(${num.toString()}, ${den.toString()})`;
    }

    analysisGridEl.innerHTML = `
      <div class="analysis-card">
        <div class="analysis-card-title">1. Phân Tích Bit Dấu (Sign)</div>
        <div class="analysis-row"><span>Bit nhị phân:</span> <code class="bit-pill sign">${signBin}</code></div>
        <div class="analysis-row"><span>Ý nghĩa:</span> <strong>${sign === 0 ? 'Dương (+)' : 'Âm (-)'}</strong></div>
        <div class="analysis-row"><span>Thừa số toán học:</span> <code>(-1)^${sign} = ${sign === 0 ? '+1' : '-1'}</code></div>
      </div>

      <div class="analysis-card">
        <div class="analysis-card-title">2. Phân Tích Số Mũ (Exponent)</div>
        <div class="analysis-row"><span>11 bit nhị phân:</span> <code class="bit-pill exp">${expBin}</code></div>
        <div class="analysis-row"><span>Giá trị thô (Raw int):</span> <strong>${expRaw}</strong></div>
        <div class="analysis-row"><span>Độ lệch (Bias):</span> <code>1023</code></div>
        <div class="analysis-row"><span>Số mũ thực tế (Unbiased):</span> <strong style="color:var(--py-gold);">${expRaw === 0x7FF ? 'Đặc biệt (inf/nan)' : expActual}</strong></div>
      </div>

      <div class="analysis-card" style="grid-column: 1 / -1;">
        <div class="analysis-card-title">3. Phân Tích Phần Định Trị (52-bit Mantissa / Fraction)</div>
        <div class="analysis-row"><span>52 bit nhị phân:</span> <code class="bit-pill frac" style="word-break:break-all;">${fracBin}</code></div>
        <div class="analysis-row"><span>Giá trị Hex nguyên bản:</span> <code>0x${mantissaBig.toString(16).toUpperCase()}</code></div>
        <div class="analysis-row"><span>Phân loại IEEE:</span> <span class="badge-new-314">${category}</span></div>
        <div class="analysis-row"><span>Công thức biểu diễn:</span> <code>${formulaDesc}</code></div>
      </div>

      <div class="analysis-card" style="grid-column: 1 / -1; background:var(--bg-code); color:#e6edf3; border:1px solid var(--border-strong);">
        <div class="analysis-card-title" style="color:#79c0ff;">4. Đối Chiếu Chuẩn Python 3.14 (CPython Output)</div>
        <div style="font-family:var(--font-mono);font-size:0.88rem;line-height:1.7;">
          <div>&gt;&gt;&gt; val = ${escapeHtml(rawInput)}</div>
          <div>&gt;&gt;&gt; val.hex() &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;──► <span style="color:#a5d6ff;">'${escapeHtml(pyHex)}'</span></div>
          <div>&gt;&gt;&gt; float(val).as_integer_ratio() ──► <span style="color:#56d364;">${escapeHtml(floatAsIntegerRatio(val))}</span></div>
          <div>&gt;&gt;&gt; Giá trị hiển thị Python &nbsp;&nbsp;&nbsp;──► <strong>${escapeHtml(String(val))}</strong></div>
        </div>
      </div>
    `;
  }

  // Gắn sự kiện các Preset Chips
  presetChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      presetChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      inputEl.value = chip.dataset.val;
      update();
    });
  });

  calcBtn?.addEventListener('click', () => {
    presetChips.forEach((c) => c.classList.remove('active'));
    update();
  });

  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      presetChips.forEach((c) => c.classList.remove('active'));
      update();
    }
  });

  update();
}

