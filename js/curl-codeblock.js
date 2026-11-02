/**
 * cURL Code Block Engine (js/curl-codeblock.js)
 * Tương đồng 100% với cấu trúc .code-example-card của trang Python:
 * - Header có tabs đa shell (Bash / PowerShell curl.exe / CMD), version badge và verify badge
 * - Nút Copy chuẩn .copy-code-btn có phản hồi tức thì
 * - .code-output-block với .output-label và .output-pre
 * - .code-annotations với .annotations-title, .ann-line-badge
 * - Đồng bộ lựa chọn shell toàn trang qua localStorage('preferred_curl_shell_v1')
 */

(function () {
  'use strict';

  var STORAGE_KEY_SHELL = 'preferred_curl_shell_v1';
  var DEFAULT_SHELL = 'bash';

  function getActiveShell() {
    try {
      return localStorage.getItem(STORAGE_KEY_SHELL) || DEFAULT_SHELL;
    } catch (_e) {
      return DEFAULT_SHELL;
    }
  }

  function setActiveShell(shellName) {
    if (!['bash', 'powershell', 'cmd'].includes(shellName)) return;
    try {
      localStorage.setItem(STORAGE_KEY_SHELL, shellName);
    } catch (_e) {}

    var allCards = document.querySelectorAll('.code-example-card');
    allCards.forEach(function (card) {
      var tabs = card.querySelectorAll('.curl-shell-tab-btn');
      tabs.forEach(function (btn) {
        var isTarget = btn.getAttribute('data-shell') === shellName;
        btn.classList.toggle('active', isTarget);
        btn.setAttribute('aria-selected', String(isTarget));
      });

      var panes = card.querySelectorAll('.curl-shell-pane');
      panes.forEach(function (pane) {
        var isTarget = pane.getAttribute('data-shell') === shellName;
        pane.classList.toggle('active', isTarget);
        pane.style.display = isTarget ? 'block' : 'none';
      });
    });
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderCodeBlockHtml(example) {
    var activeShell = getActiveShell();
    var id = example.id || ('curl-ex-' + Math.random().toString(36).substr(2, 6));
    var minVersion = example.minVersion || '7.0.0';
    var isVerified = example.verificationStatus === 'verified_real';
    var realOutput = example.realOutput || '';
    var hasOutput = Boolean(realOutput && realOutput.trim());
    var tokens = example.explanationTokens || [];

    var bashCmd = escapeHtml(example.commands ? example.commands.bash : (example.bash || ''));
    var pwshCmd = escapeHtml(example.commands ? example.commands.powershell : (example.pwsh || ''));
    var cmdCmd = escapeHtml(example.commands ? example.commands.cmd : (example.cmd || ''));

    var versionBadgeHtml = '<span class="badge-curl-version" title="Yêu cầu cURL ≥ ' + escapeHtml(minVersion) + '">cURL ≥ ' + escapeHtml(minVersion) + '</span>';

    var verifyBadgeHtml = isVerified
      ? '<span class="badge-verified-real" title="Lệnh đã được thực thi thật và đối chiếu output">✓ Đã xác minh</span>'
      : '<span class="badge-unverified" title="Cần kiểm tra lại">⚠ Chưa test</span>';

    var outputHtml = '';
    if (hasOutput) {
      outputHtml = [
        '<div class="code-output-block">',
        '  <div class="output-label">',
        '    <span>Output thực tế (Đã kiểm chứng trên cURL 8.21.0)</span>',
        '  </div>',
        '  <pre class="output-pre">' + escapeHtml(realOutput) + '</pre>',
        '</div>'
      ].join('\n');
    }

    var annotationsHtml = '';
    if (tokens.length > 0) {
      var tokenItems = tokens.map(function (t) {
        return [
          '<li class="annotation-item">',
          '  <span class="ann-line-badge">' + escapeHtml(t.token) + '</span>',
          '  <span>' + escapeHtml(t.meaning) + '</span>',
          '</li>'
        ].join('');
      }).join('\n');

      annotationsHtml = [
        '<div class="code-annotations">',
        '  <div class="annotations-title">Giải thích từng tham số / token quan trọng</div>',
        '  <ul class="annotation-list">',
        tokenItems,
        '  </ul>',
        '</div>'
      ].join('\n');
    }

    return [
      '<div class="code-example-card" id="' + id + '" data-active-shell="' + activeShell + '">',
      '  <div class="code-card-header">',
      '    <div class="code-header-left" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">',
      '      <div class="curl-shell-tabs" role="tablist" aria-label="Chọn môi trường dòng lệnh">',
      '        <button type="button" class="curl-shell-tab-btn ' + (activeShell === 'bash' ? 'active' : '') + '" data-shell="bash" role="tab" aria-selected="' + (activeShell === 'bash') + '">🐧 Bash/Zsh</button>',
      '        <button type="button" class="curl-shell-tab-btn ' + (activeShell === 'powershell' ? 'active' : '') + '" data-shell="powershell" role="tab" aria-selected="' + (activeShell === 'powershell') + '">🔷 PowerShell</button>',
      '        <button type="button" class="curl-shell-tab-btn ' + (activeShell === 'cmd' ? 'active' : '') + '" data-shell="cmd" role="tab" aria-selected="' + (activeShell === 'cmd') + '">⬛ CMD</button>',
      '      </div>',
      '      ' + versionBadgeHtml,
      '      ' + verifyBadgeHtml,
      '    </div>',
      '    <button type="button" class="copy-code-btn" aria-label="Sao chép lệnh vào clipboard" title="Sao chép">',
      '      <span>📋</span> <span class="copy-btn-text">Sao chép</span>',
      '    </button>',
      '  </div>',
      '  <pre class="code-pre curl-shell-pane ' + (activeShell === 'bash' ? 'active' : '') + '" data-shell="bash" style="display:' + (activeShell === 'bash' ? 'block' : 'none') + '"><code>' + bashCmd + '</code></pre>',
      '  <pre class="code-pre curl-shell-pane ' + (activeShell === 'powershell' ? 'active' : '') + '" data-shell="powershell" style="display:' + (activeShell === 'powershell' ? 'block' : 'none') + '"><code>' + pwshCmd + '</code></pre>',
      '  <pre class="code-pre curl-shell-pane ' + (activeShell === 'cmd' ? 'active' : '') + '" data-shell="cmd" style="display:' + (activeShell === 'cmd' ? 'block' : 'none') + '"><code>' + cmdCmd + '</code></pre>',
      outputHtml,
      annotationsHtml,
      '</div>'
    ].join('\n');
  }

  function initCodeBlocks(containerElement) {
    var root = containerElement || document;
    if (root.__curlCodeBlockInitialized) return;
    root.__curlCodeBlockInitialized = true;

    root.addEventListener('click', function (e) {
      // 1. Chuyển tab Shell
      var tabBtn = e.target.closest('.curl-shell-tab-btn');
      if (tabBtn) {
        var shell = tabBtn.getAttribute('data-shell');
        if (shell) {
          setActiveShell(shell);
        }
        return;
      }

      // 2. Nút Copy
      var copyBtn = e.target.closest('.copy-code-btn');
      if (copyBtn) {
        var card = copyBtn.closest('.code-example-card');
        if (card) {
          var activePane = card.querySelector('.curl-shell-pane.active');
          if (activePane) {
            var textToCopy = activePane.textContent || '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(textToCopy).then(function () {
                var copyText = copyBtn.querySelector('.copy-btn-text');
                var origText = copyText ? copyText.textContent : 'Sao chép';
                if (copyText) copyText.textContent = 'Đã chép!';
                setTimeout(function () {
                  if (copyText) copyText.textContent = origText;
                }, 2000);
              }).catch(function () {
                alert('Không thể sao chép, hãy chọn văn bản và nhấn Ctrl+C');
              });
            }
          }
        }
        return;
      }
    });
  }

  if (typeof window !== 'undefined') {
    window.CurlCodeBlock = {
      getActiveShell: getActiveShell,
      setActiveShell: setActiveShell,
      renderCodeBlockHtml: renderCodeBlockHtml,
      initCodeBlocks: initCodeBlocks
    };
  }
})();
