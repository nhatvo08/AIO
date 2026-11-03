/**
 * SQL Master & Data Engineering Application Controller & Configuration
 * Sử dụng TopicEngine dùng chung, tối giản mã lặp, chạy được cả trên file:// và HTTP
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

  var SQL_KEYWORDS = new Set([
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS', 'NATURAL', 'ON', 'USING',
    'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'FETCH', 'FIRST', 'NEXT', 'ROWS', 'ONLY',
    'AS', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'LIKE', 'ILIKE', 'SIMILAR', 'TO', 'BETWEEN', 'EXISTS',
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
    'DISTINCT', 'ALL', 'UNION', 'INTERSECT', 'EXCEPT',
    'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'TRUNCATE',
    'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX', 'VIEW', 'SCHEMA', 'DATABASE', 'SEQUENCE',
    'MATERIALIZED', 'TEMPORARY', 'TEMP', 'REPLACE',
    'WITH', 'RECURSIVE',
    'OVER', 'PARTITION', 'WINDOW',
    'RANGE', 'GROUPS', 'UNBOUNDED', 'PRECEDING', 'FOLLOWING', 'CURRENT', 'ROW', 'EXCLUDE',
    'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT', 'CHECK', 'DEFAULT', 'UNIQUE',
    'CASCADE', 'RESTRICT', 'ACTION',
    'BEGIN', 'COMMIT', 'ROLLBACK', 'TRANSACTION', 'SAVEPOINT', 'RELEASE', 'ISOLATION', 'LEVEL',
    'READ', 'COMMITTED', 'UNCOMMITTED', 'REPEATABLE', 'SERIALIZABLE', 'DEFERRABLE',
    'EXPLAIN', 'ANALYZE', 'VERBOSE', 'COSTS', 'BUFFERS', 'TIMING', 'SUMMARY', 'FORMAT',
    'VACUUM', 'FREEZE',
    'TRUE', 'FALSE', 'UNKNOWN',
    'ASC', 'DESC', 'NULLS', 'LAST',
    'COLLATE', 'LATERAL', 'SHOW', 'DESCRIBE', 'PRAGMA', 'FILTER'
  ]);

  var SQL_BUILTINS = new Set([
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
    'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'PERCENT_RANK', 'CUME_DIST', 'NTILE',
    'LAG', 'LEAD', 'FIRST_VALUE', 'LAST_VALUE', 'NTH_VALUE',
    'COALESCE', 'NULLIF', 'GREATEST', 'LEAST', 'CAST',
    'DATE_TRUNC', 'DATE_ADD', 'DATE_SUB', 'DATEDIFF', 'DATE_DIFF', 'EXTRACT', 'NOW',
    'CURRENT_TIMESTAMP', 'CURRENT_DATE', 'CURRENT_TIME', 'AGE',
    'CONCAT', 'CONCAT_WS', 'SUBSTRING', 'SUBSTR', 'LENGTH', 'CHAR_LENGTH', 'LOWER', 'UPPER',
    'INITCAP', 'TRIM', 'LTRIM', 'RTRIM', 'LPAD', 'RPAD', 'REPLACE', 'POSITION', 'STRPOS',
    'SPLIT_PART', 'REGEXP_MATCHES', 'REGEXP_REPLACE',
    'ROUND', 'TRUNC', 'FLOOR', 'CEIL', 'CEILING', 'ABS', 'MOD', 'POWER', 'SQRT', 'SIGN',
    'ARRAY_AGG', 'STRING_AGG', 'LISTAGG', 'GROUP_CONCAT', 'ARRAY_TO_STRING', 'UNNEST',
    'JSON_EXTRACT', 'JSON_EXTRACT_PATH', 'JSON_ARRAY_LENGTH', 'JSON_BUILD_OBJECT', 'JSON_AGG', 'TO_JSON',
    'GENERATE_SERIES'
  ]);

  var SQL_TYPES = new Set([
    'INT', 'INTEGER', 'BIGINT', 'SMALLINT', 'TINYINT', 'SERIAL', 'BIGSERIAL', 'SMALLSERIAL',
    'DECIMAL', 'NUMERIC', 'REAL', 'FLOAT', 'DOUBLE',
    'VARCHAR', 'CHAR', 'TEXT', 'BYTEA', 'BLOB',
    'BOOLEAN', 'BOOL',
    'DATE', 'TIME', 'TIMESTAMP', 'TIMESTAMPTZ', 'INTERVAL',
    'JSON', 'JSONB', 'UUID'
  ]);

  function highlightSqlCode(code) {
    var src = String(code || '').replace(/\r\n/g, '\n');
    var len = src.length;
    var i = 0;
    var tokenized = '';

    while (i < len) {
      if (src[i] === '-' && src[i + 1] === '-') {
        var end = src.indexOf('\n', i);
        if (end === -1) end = len;
        tokenized += '<span class="tok-cmt">' + escapeHtml(src.slice(i, end)) + '</span>';
        i = end;
        continue;
      }

      if (src[i] === '/' && src[i + 1] === '*') {
        var end = src.indexOf('*/', i + 2);
        if (end === -1) end = len;
        else end += 2;
        tokenized += '<span class="tok-cmt">' + escapeHtml(src.slice(i, end)) + '</span>';
        i = end;
        continue;
      }

      if (src[i] === "'") {
        var j = i + 1;
        while (j < len) {
          if (src[j] === "'") {
            if (src[j + 1] === "'") {
              j += 2;
              continue;
            }
            j++;
            break;
          }
          if (src[j] === '\\' && j + 1 < len) {
            j += 2;
            continue;
          }
          j++;
        }
        tokenized += '<span class="tok-str">' + escapeHtml(src.slice(i, j)) + '</span>';
        i = j;
        continue;
      }

      if (src[i] === '"') {
        var j = i + 1;
        while (j < len && src[j] !== '"') {
          if (src[j] === '\\' && j + 1 < len) j += 2;
          else j++;
        }
        if (j < len && src[j] === '"') j++;
        tokenized += '<span class="tok-dec">' + escapeHtml(src.slice(i, j)) + '</span>';
        i = j;
        continue;
      }

      if (src[i] === '$') {
        var match = src.slice(i).match(/^\$([a-zA-Z0-9_]*)\$/);
        if (match) {
          var tag = match[0];
          var closeIdx = src.indexOf(tag, i + tag.length);
          if (closeIdx !== -1) {
            var end = closeIdx + tag.length;
            tokenized += '<span class="tok-str">' + escapeHtml(src.slice(i, end)) + '</span>';
            i = end;
            continue;
          }
        }
      }

      if (/[0-9]/.test(src[i]) && (i === 0 || /[^a-zA-Z0-9_]/.test(src[i - 1]))) {
        var j = i;
        while (j < len && /[0-9]/.test(src[j])) j++;
        if (j < len && src[j] === '.' && /[0-9]/.test(src[j + 1] || '')) {
          j++;
          while (j < len && /[0-9]/.test(src[j])) j++;
        }
        tokenized += '<span class="tok-num">' + escapeHtml(src.slice(i, j)) + '</span>';
        i = j;
        continue;
      }

      if (/[a-zA-Z_]/.test(src[i])) {
        var j = i;
        while (j < len && /[a-zA-Z0-9_]/.test(src[j])) j++;
        var word = src.slice(i, j);
        var upper = word.toUpperCase();

        if (SQL_KEYWORDS.has(upper)) {
          tokenized += '<span class="tok-kw">' + escapeHtml(word) + '</span>';
        } else if (SQL_BUILTINS.has(upper)) {
          tokenized += '<span class="tok-bi">' + escapeHtml(word) + '</span>';
        } else if (SQL_TYPES.has(upper)) {
          tokenized += '<span class="tok-pfx">' + escapeHtml(word) + '</span>';
        } else {
          tokenized += escapeHtml(word);
        }
        i = j;
        continue;
      }

      if (/[!=<>|:+\-*/%]/.test(src[i])) {
        var j = i;
        while (j < len && /[!=<>|:+\-*/%]/.test(src[j])) j++;
        var op = src.slice(i, j);
        tokenized += '<span class="tok-op">' + escapeHtml(op) + '</span>';
        i = j;
        continue;
      }

      tokenized += escapeHtml(src[i]);
      i++;
    }

    var rawLines = tokenized.split('\n');
    var activeSpan = '';
    return rawLines.map(function (lineHtml, idx) {
      var prefixed = activeSpan + lineHtml;
      var opens = prefixed.match(/<span class="[^"]+">/g) || [];
      var closes = prefixed.match(/<\/span>/g) || [];
      var lineFormatted = prefixed;
      if (opens.length > closes.length) {
        activeSpan = opens[opens.length - 1];
        lineFormatted += '</span>';
      } else {
        activeSpan = '';
      }
      return '<div class="code-line"><span class="line-num">' + (idx + 1) + '</span><span class="line-content">' + lineFormatted + '</span></div>';
    }).join('');
  }

  var COURSES = [
    {
      id: 'course-sql-1',
      number: 'Giai đoạn I',
      title: 'Giai đoạn I: Nền Tảng Quan Hệ & Khám Bệnh Dữ Liệu [DQ]',
      shortTitle: 'Nền Tảng Quan Hệ & DQ',
      icon: '🎯',
      badge: 'Cốt lõi',
      banner: {
        number: 'Giai đoạn I',
        title: 'Nền Tảng Quan Hệ & Khám Bệnh Dữ Liệu [DQ]',
        icon: '🎯',
        badge: 'Tầng 0 & 1 • 8 Bài',
        customClass: 'sql-stage1-banner'
      },
      description: 'Hiểu thấu bản chất mô hình quan hệ Codd, Đa tập (Bag Semantics), Logic 3 giá trị 3VL, CRUD an toàn và kỹ thuật Data Profiling bắt bẩn dữ liệu thực chiến.',
      parts: [window.SQL_LEVEL0_PART, window.SQL_LEVEL1_PART].filter(Boolean)
    },
    {
      id: 'course-sql-2',
      number: 'Giai đoạn II',
      title: 'Giai đoạn II: JOIN, Gom Nhóm, Window Functions & Đặc Trưng AI [FE]',
      shortTitle: 'JOIN & Window Functions',
      icon: '🔗',
      badge: 'Chuyên sâu',
      banner: {
        number: 'Giai đoạn II',
        title: 'JOIN, Window Functions & Kỹ Nghệ Đặc Trưng [FE]',
        icon: '🔗',
        badge: 'Tầng 2 & 3 • 12 Bài',
        customClass: 'sql-stage2-banner'
      },
      description: 'Bản chất các giải thuật JOIN (Hash/Merge/Nested Loop), CTE đệ quy, Window Functions toàn diện và trích xuất đặc trưng Machine Learning chống rò rỉ thời điểm.',
      parts: [window.SQL_LEVEL2_PART, window.SQL_LEVEL3_PART].filter(Boolean)
    },
    {
      id: 'course-sql-3',
      number: 'Giai đoạn III',
      title: 'Giai đoạn III: Thiết Kế Dữ Liệu, Hợp Đồng Dữ Liệu & Giao Dịch ACID',
      shortTitle: 'Thiết Kế CSDL & ACID',
      icon: '📐',
      badge: 'Kiến trúc',
      banner: {
        number: 'Giai đoạn III',
        title: 'Thiết Kế CSDL, Hợp Đồng Dữ Liệu & ACID',
        icon: '📐',
        badge: 'Tầng 4 & 5 • 8 Bài',
        customClass: 'sql-stage3-banner'
      },
      description: 'Chuẩn hóa 3NF/BCNF, thiết kế khóa, Temporal tables, SCD Type 2, hợp đồng dữ liệu Data Contracts, giải mã WAL log, MVCC và hóa giải Deadlock.',
      parts: [window.SQL_LEVEL4_PART, window.SQL_LEVEL5_PART].filter(Boolean)
    },
    {
      id: 'course-sql-4',
      number: 'Giai đoạn IV',
      title: 'Giai đoạn IV: Tối Ưu Hiệu Năng, Modern Tooling & Thực Chiến [SCALE]',
      shortTitle: 'Tối Ưu Hiệu Năng & Tooling',
      icon: '⚡',
      badge: 'Production',
      banner: {
        number: 'Giai đoạn IV',
        title: 'Tối Ưu Hiệu Năng & Modern Data Stack [SCALE]',
        icon: '⚡',
        badge: 'Tầng 6, 7 & 8 • 17 Bài',
        customClass: 'sql-stage4-banner'
      },
      description: 'Giải mã cây B-Tree, đọc EXPLAIN ANALYZE, tư duy CSDL Cột (DuckDB/Parquet), dbt Core modeling, Airflow pipeline và dự án Modern Data Warehouse trọn vẹn.',
      parts: [window.SQL_LEVEL6_PART, window.SQL_LEVEL7_PART, window.SQL_LEVEL8_PART].filter(Boolean)
    }
  ];

  var extraSectionsHtml = '' +
    '<section id="sec-circuits-intro" class="sql-overview-section">' +
      '<div class="sql-section-intro">' +
        '<div class="sql-section-pill">🧭 Strategic Pillars • Ba Mạch Trọng Tâm</div>' +
        '<h2 class="sql-section-title">Ba Mạch Kỹ Năng Xuyên Suốt Cho Kỹ Sư Dữ Liệu &amp; AI</h2>' +
        '<p class="sql-section-desc">Không chỉ dừng lại ở cú pháp <code>SELECT</code> cơ bản, giáo trình cấy sâu 3 mạch tư duy chiến lược vào từng tầng kiến thức. Mỗi mạch giải quyết một bài toán sống còn trong hệ thống dữ liệu hiện đại, giúp bạn tự tin vận hành trong môi trường Data &amp; AI Production thực tế:</p>' +
      '</div>' +
      '<div class="sql-circuit-deck">' +
        '<!-- Mạch [DQ] -->' +
        '<div class="sql-circuit-card sql-circuit-card--dq">' +
          '<div class="sql-circuit-top">' +
            '<div class="sql-circuit-header">' +
              '<div class="sql-circuit-badge-wrap">' +
                '<span class="circuit-badge circuit-badge-dq">[DQ]</span>' +
                '<span class="sql-circuit-tier-pill">Cấy tại: Tầng 1 • 2 • 4 • 8</span>' +
              '</div>' +
              '<div class="sql-circuit-icon-box">🩺</div>' +
            '</div>' +
            '<h3 class="sql-circuit-title">Data Quality &amp; Validation</h3>' +
            '<p class="sql-circuit-desc">Dùng chính tư duy tập hợp của SQL để "khám bệnh" dữ liệu suy thoái, phát hiện sớm các dị thường nghiệp vụ, bản ghi mồ côi và tự động hóa hàng rào kiểm thử trong Data Pipeline.</p>' +
          '</div>' +
          '<div class="sql-circuit-pillars">' +
            '<div class="sql-circuit-pillars-label">Trọng tâm kỹ năng thực chiến</div>' +
            '<div class="sql-pillar-tag-list">' +
              '<span class="sql-pillar-tag">🩺 Profiling &amp; Tỷ lệ NULL</span>' +
              '<span class="sql-pillar-tag">🔍 Bắt trùng lặp bản ghi</span>' +
              '<span class="sql-pillar-tag">👻 Khóa mồ côi (Anti-join)</span>' +
              '<span class="sql-pillar-tag">📑 Data Contracts &amp; Drift</span>' +
              '<span class="sql-pillar-tag">🤖 dbt test &amp; CI/CD Testing</span>' +
            '</div>' +
          '</div>' +
          '<div class="sql-circuit-footer">' +
            '<button type="button" class="sql-circuit-cta-btn" data-goto="sql-map-circuits">' +
              '<span>Khám phá lộ trình mạch [DQ]</span>' +
              '<span class="arrow-icon">→</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<!-- Mạch [FE] -->' +
        '<div class="sql-circuit-card sql-circuit-card--fe">' +
          '<div class="sql-circuit-top">' +
            '<div class="sql-circuit-header">' +
              '<div class="sql-circuit-badge-wrap">' +
                '<span class="circuit-badge circuit-badge-fe">[FE]</span>' +
                '<span class="sql-circuit-tier-pill">Cấy tại: Tầng 3 • 4 • 6 • 7</span>' +
              '</div>' +
              '<div class="sql-circuit-icon-box">⏳</div>' +
            '</div>' +
            '<h3 class="sql-circuit-title">Feature Engineering Mindset</h3>' +
            '<p class="sql-circuit-desc">Làm chủ tư duy trích xuất đặc trưng Machine Learning trên SQL: biến đổi chuỗi thời gian, bảo toàn tính đúng đắn thời điểm (Point-in-time) và triệt tiêu nguy cơ rò rỉ dữ liệu tương lai.</p>' +
          '</div>' +
          '<div class="sql-circuit-pillars">' +
            '<div class="sql-circuit-pillars-label">Trọng tâm kỹ năng thực chiến</div>' +
            '<div class="sql-pillar-tag-list">' +
              '<span class="sql-pillar-tag">🪟 Window Rolling Aggregations</span>' +
              '<span class="sql-pillar-tag">⏪ Tín hiệu trễ (Lag / Lead)</span>' +
              '<span class="sql-pillar-tag">🚫 Chống rò rỉ dữ liệu (Anti-leakage)</span>' +
              '<span class="sql-pillar-tag">⏱️ As-of Joins theo thời gian</span>' +
              '<span class="sql-pillar-tag">📜 SCD Type 2 &amp; Feature Store</span>' +
            '</div>' +
          '</div>' +
          '<div class="sql-circuit-footer">' +
            '<button type="button" class="sql-circuit-cta-btn" data-goto="sql-map-circuits">' +
              '<span>Khám phá lộ trình mạch [FE]</span>' +
              '<span class="arrow-icon">→</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<!-- Mạch [SCALE] -->' +
        '<div class="sql-circuit-card sql-circuit-card--scale">' +
          '<div class="sql-circuit-top">' +
            '<div class="sql-circuit-header">' +
              '<div class="sql-circuit-badge-wrap">' +
                '<span class="circuit-badge circuit-badge-scale">[SCALE]</span>' +
                '<span class="sql-circuit-tier-pill">Cấy tại: Tầng 6 • 7 • 8</span>' +
              '</div>' +
              '<div class="sql-circuit-icon-box">🚀</div>' +
            '</div>' +
            '<h3 class="sql-circuit-title">Large-Scale SQL &amp; Modern Tooling</h3>' +
            '<p class="sql-circuit-desc">Chuyển dịch sang kiến trúc CSDL Cột (OLAP: DuckDB, ClickHouse), tối ưu hóa Partitioning, kiểm soát chi phí đám mây (BigQuery/Snowflake) và làm chủ hệ sinh thái Modern Data Stack.</p>' +
          '</div>' +
          '<div class="sql-circuit-pillars">' +
            '<div class="sql-circuit-pillars-label">Trọng tâm kỹ năng thực chiến</div>' +
            '<div class="sql-pillar-tag-list">' +
              '<span class="sql-pillar-tag">📊 Columnar &amp; Định dạng Parquet</span>' +
              '<span class="sql-pillar-tag">🗂️ Partitioning &amp; Tránh Shuffling</span>' +
              '<span class="sql-pillar-tag">💰 Tối ưu Slot &amp; Chi phí Cloud</span>' +
              '<span class="sql-pillar-tag">📦 Mô hình hóa ELT với dbt Core</span>' +
              '<span class="sql-pillar-tag">🔄 Điều phối Airflow &amp; SQLFluff CI</span>' +
            '</div>' +
          '</div>' +
          '<div class="sql-circuit-footer">' +
            '<button type="button" class="sql-circuit-cta-btn" data-goto="sql-map-circuits">' +
              '<span>Khám phá lộ trình mạch [SCALE]</span>' +
              '<span class="arrow-icon">→</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="sql-circuits-map-banner">' +
        '<div class="sql-circuits-map-banner-info">' +
          '<span class="sql-circuits-map-banner-icon">🗺️</span>' +
          '<div class="sql-circuits-map-banner-text">' +
            '<strong>Bạn muốn xem ma trận phân bổ 3 mạch chi tiết theo từng bài học?</strong><br>' +
            'Xem bảng đối chiếu đầy đủ các chặng dừng [DQ], [FE] và [SCALE] trên toàn bộ 47 bài của 10 tầng giáo trình.' +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn-secondary btn-sm" data-goto="sql-map-circuits" style="white-space:nowrap;">' +
          'Mở Bản Đồ 3 Mạch Chi Tiết →' +
        '</button>' +
      '</div>' +
    '</section>' +
    '<section id="sec-techmart-sql-context" class="sql-overview-section">' +
      '<div class="sql-section-intro">' +
        '<div class="sql-section-pill">🏢 Unified Testbench • Bộ Dữ Liệu Thực Hành</div>' +
        '<h2 class="sql-section-title">Bộ Dữ Liệu Mẫu Thực Hành TechMart Thống Nhất</h2>' +
        '<p class="sql-section-desc">Toàn bộ 47 bài học và các ví dụ minh họa trong giáo trình đều sử dụng chung một hệ thống CSDL bán lẻ điện tử <strong>TechMart</strong> gồm 7 bảng quan hệ chuẩn hóa. Mô hình này được thiết kế vừa vặn để bạn vừa có thể nhẩm tính bằng tay, vừa có đủ độ phức tạp thực chiến để rèn luyện mọi kỹ năng kỹ sư dữ liệu:</p>' +
      '</div>' +
      '<div class="sql-schema-showcase">' +
        '<div class="sql-engine-bar">' +
          '<div class="sql-engine-chips">' +
            '<span style="font-size:0.8rem;font-weight:700;color:var(--text-muted);margin-right:4px;">Engine Tương Thích:</span>' +
            '<span class="sql-engine-chip"><span class="sql-engine-chip-status"></span>🐘 PostgreSQL 16+</span>' +
            '<span class="sql-engine-chip"><span class="sql-engine-chip-status"></span>🦆 DuckDB 1.1+ (OLAP Cột)</span>' +
            '<span class="sql-engine-chip"><span class="sql-engine-chip-status"></span>🪶 SQLite 3.45+ (In-process)</span>' +
          '</div>' +
          '<span class="sql-engine-verified-badge">✓ Đã kiểm chứng 100% kết quả truy vấn</span>' +
        '</div>' +
        '<div class="sql-schema-grid">' +
          '<!-- Khối 1: Nghiệp vụ cốt lõi -->' +
          '<div class="sql-schema-box">' +
            '<div>' +
              '<div class="sql-schema-box-header">' +
                '<div class="sql-schema-box-title-group">' +
                  '<span class="sql-schema-box-icon">🛒</span>' +
                  '<h4 class="sql-schema-box-title">Giao Dịch Cốt Lõi</h4>' +
                '</div>' +
                '<span class="sql-schema-box-badge">4 Bảng • Chuẩn 3NF</span>' +
              '</div>' +
              '<ul class="sql-schema-table-list">' +
                '<li class="sql-schema-table-item">' +
                  '<span class="sql-schema-table-name">customers</span>' +
                  '<span class="sql-schema-table-meta">5 khách hàng • VIP/Normal</span>' +
                '</li>' +
                '<li class="sql-schema-table-item">' +
                  '<span class="sql-schema-table-name">products</span>' +
                  '<span class="sql-schema-table-meta">5 SP thiết bị công nghệ</span>' +
                '</li>' +
                '<li class="sql-schema-table-item">' +
                  '<span class="sql-schema-table-name">orders</span>' +
                  '<span class="sql-schema-table-meta">6 đơn hàng • đa trạng thái</span>' +
                '</li>' +
                '<li class="sql-schema-table-item">' +
                  '<span class="sql-schema-table-name">order_items</span>' +
                  '<span class="sql-schema-table-meta">9 chi tiết mặt hàng</span>' +
                '</li>' +
              '</ul>' +
            '</div>' +
            '<p class="sql-schema-box-desc">Nền tảng thực hành cú pháp lọc <code>WHERE</code>, phép nối nhiều bảng <code>JOIN</code>, gom nhóm <code>GROUP BY</code> và CTE phân tích.</p>' +
          '</div>' +
          '<!-- Khối 2: Data Quality Lab -->' +
          '<div class="sql-schema-box">' +
            '<div>' +
              '<div class="sql-schema-box-header">' +
                '<div class="sql-schema-box-title-group">' +
                  '<span class="sql-schema-box-icon">⚠️</span>' +
                  '<h4 class="sql-schema-box-title">Phòng Lab Kiểm Định [DQ]</h4>' +
                '</div>' +
                '<span class="sql-schema-box-badge">1 Bảng • 6 Lỗi Cố Ý</span>' +
              '</div>' +
              '<ul class="sql-schema-table-list">' +
                '<li class="sql-schema-table-item">' +
                  '<span class="sql-schema-table-name">raw_dirty_orders</span>' +
                  '<span class="sql-schema-table-meta">6 dòng staging bẩn</span>' +
                '</li>' +
              '</ul>' +
              '<div style="font-size:0.78rem;color:var(--text-muted);line-height:1.55;margin-bottom:8px;">' +
                '• 🔁 Trùng đơn <code>2001</code> • 👻 Khách mồ côi <code>999</code><br>' +
                '• 🚫 Tiền âm <code>-500k</code> • ⏳ Ngày tương lai <code>2099</code><br>' +
                '• 🕳️ Trạng thái <code>NULL</code> • 🔤 Chuỗi lệch chuẩn' +
              '</div>' +
            '</div>' +
            '<p class="sql-schema-box-desc">Thao trường thực hành kỹ thuật Anti-join, Profiling tự động, Data Contracts và viết bộ dbt tests kiểm thử dữ liệu rác.</p>' +
          '</div>' +
          '<!-- Khối 3: Event Stream -->' +
          '<div class="sql-schema-box">' +
            '<div>' +
              '<div class="sql-schema-box-header">' +
                '<div class="sql-schema-box-title-group">' +
                  '<span class="sql-schema-box-icon">⏳</span>' +
                  '<h4 class="sql-schema-box-title">Chuỗi Sự Kiện [FE]</h4>' +
                '</div>' +
                '<span class="sql-schema-box-badge">1 Bảng • Event Logs</span>' +
              '</div>' +
              '<ul class="sql-schema-table-list">' +
                '<li class="sql-schema-table-item">' +
                  '<span class="sql-schema-table-name">customer_events</span>' +
                  '<span class="sql-schema-table-meta">7 mốc log thời gian</span>' +
                '</li>' +
              '</ul>' +
              '<div style="font-size:0.78rem;color:var(--text-muted);line-height:1.55;margin-bottom:8px;">' +
                '• Chuỗi hành vi: <code>login</code> → <code>view</code> → <code>cart</code> → <code>checkout</code><br>' +
                '• Dấu thời gian chính xác từng giây phục vụ trích xuất đặc trưng ML' +
              '</div>' +
            '</div>' +
            '<p class="sql-schema-box-desc">Thực hành Window Functions: Rolling Aggregates, Lag/Lead, tính khoảng thời gian giữa 2 sự kiện và triệt tiêu rò rỉ dữ liệu.</p>' +
          '</div>' +
          '<!-- Khối 4: SCD Type 2 -->' +
          '<div class="sql-schema-box">' +
            '<div>' +
              '<div class="sql-schema-box-header">' +
                '<div class="sql-schema-box-title-group">' +
                  '<span class="sql-schema-box-icon">📜</span>' +
                  '<h4 class="sql-schema-box-title">Lịch Sử Chiều SCD [FE]</h4>' +
                '</div>' +
                '<span class="sql-schema-box-badge">1 Bảng • SCD Type 2</span>' +
              '</div>' +
              '<ul class="sql-schema-table-list">' +
                '<li class="sql-schema-table-item">' +
                  '<span class="sql-schema-table-name">customer_tier_history</span>' +
                  '<span class="sql-schema-table-meta">5 bản ghi thăng hạng</span>' +
                '</li>' +
              '</ul>' +
              '<div style="font-size:0.78rem;color:var(--text-muted);line-height:1.55;margin-bottom:8px;">' +
                '• Theo dõi phân khúc Bronze → Silver → Gold<br>' +
                '• Khoảng hiệu lực: <code>valid_from</code> đến <code>valid_to</code>' +
              '</div>' +
            '</div>' +
            '<p class="sql-schema-box-desc">Thực hành As-of Joins, tái tạo trạng thái lịch sử chuẩn xác tại thời điểm giao dịch cho Feature Store mà không làm sai lệch mô hình.</p>' +
          '</div>' +
        '</div>' +
        '<div class="sql-schema-action-banner">' +
          '<div class="sql-schema-action-left">' +
            '<h3 class="sql-schema-action-title">📐 Sẵn Sàng Chạy Thử Ngay Trên Máy Của Bạn?</h3>' +
            '<p class="sql-schema-action-desc">' +
              'Xem sơ đồ quan hệ thực thể (ER Diagram) trực quan với đầy đủ khóa chính (PK), khóa ngoại (FK), và copy kịch bản SQL DDL tạo bảng + DML nạp sẵn toàn bộ dữ liệu mẫu (chạy ngay trên PostgreSQL, DuckDB hoặc SQLite chỉ trong 5 giây).' +
            '</p>' +
          '</div>' +
          '<button type="button" class="sql-schema-action-btn" data-goto="sql-sample-dataset">' +
            '<span>Xem Sơ Đồ ER &amp; Script SQL TechMart</span>' +
            '<span>→</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</section>';

  window.TopicEngine.createApp({
    topicId: 'sql',
    topicPrefix: 'sql',
    topicTitle: 'SQL Master & Data Engineering',
    storageKey: 'py314_sql_state_v1',
    courses: COURSES,
    referenceData: window.SQL_META_PART,
    highlightCode: highlightSqlCode,
    pillPrefix: 'sql',
    partIcons: {
      'part-sql-meta': '🗺️',
      'part-sql-0': '🎯',
      'part-sql-1': '🧱',
      'part-sql-2': '🔗',
      'part-sql-3': '🪟',
      'part-sql-4': '📐',
      'part-sql-5': '🔒',
      'part-sql-6': '⚡',
      'part-sql-7': '🛠️',
      'part-sql-8': '🚀'
    },
    hero: {
      accentColor: '#2563eb',
      eyebrowStyle: 'background:rgba(37,99,235,0.12);color:#2563eb;border-color:rgba(37,99,235,0.3);',
      eyebrow: '<span>🗄️ Chuyên đề SQL Toàn Diện &amp; Kỹ Nghệ Dữ Liệu</span> <span>•</span> <span>Từ Tư Duy Tập Hợp Đến Feature Store</span>',
      title: 'Làm Chủ SQL: Từ Bản Chất RDBMS Đến Data Engineering Hiện Đại',
      desc: 'Giáo trình SQL chuyên sâu đi từ bản chất mô hình quan hệ, thứ tự thực thi logic, giải mã cây chỉ mục B-tree, giao dịch ACID/MVCC, tối ưu hóa CSDL Cột (DuckDB), tích hợp 3 mạch xuyên suốt: Khám bệnh & Kiểm định [DQ], Kỹ nghệ đặc trưng AI [FE], Vận hành quy mô lớn với dbt & Airflow [SCALE].',
      buttons: [
        { id: 'hero-circuits-btn', text: '🧭 Xem Bản đồ 3 Mạch Xuyên Suốt', scrollTarget: '#sec-circuits-intro' },
        { id: 'hero-schema-btn', text: '🗄️ Sơ đồ Schema & Kịch bản TechMart', scrollTarget: '#sec-techmart-sql-context' }
      ]
    },
    overviewExtraSections: extraSectionsHtml
  });
})();
