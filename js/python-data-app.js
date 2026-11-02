/**
 * Python for Data Course Application Controller & Configuration
 * Sử dụng TopicEngine dùng chung, tối giản mã lặp, chạy được cả trên file:// và HTTP
 */

(function () {
  'use strict';

  var PARTS = [];
  if (window.PYDATA_GROUP1_PARTS) PARTS = PARTS.concat(window.PYDATA_GROUP1_PARTS);
  if (window.PYDATA_GROUP2_PARTS) PARTS = PARTS.concat(window.PYDATA_GROUP2_PARTS);
  if (window.PYDATA_GROUP3_PARTS) PARTS = PARTS.concat(window.PYDATA_GROUP3_PARTS);
  if (window.PYDATA_GROUP4_PARTS) PARTS = PARTS.concat(window.PYDATA_GROUP4_PARTS);

  var extraSectionsHtml = '' +
    '<section id="sec-techmart-context" style="margin: 32px 0;">' +
      '<h2 class="roadmap-section-title">🏢 Ca Thực Tế TechMart: Xuyên Suốt 13 Module</h2>' +
      '<p style="color:var(--text-secondary);margin-bottom:14px;">Để việc học không bị phân mảnh hay lý thuyết suông, toàn bộ 13 Module của chương trình được gắn liền với một bối cảnh kinh doanh duy nhất: <strong>Chuỗi siêu thị công nghệ TechMart</strong> (3 chi nhánh Hà Nội, TP.HCM, Đà Nẵng cùng hệ thống bán lẻ trực tuyến):</p>' +
      '<div class="pd-context-grid">' +
        '<div class="pd-context-card">' +
          '<div class="pd-context-header">' +
            '<span class="pd-context-icon">💾</span>' +
            '<span>Đa Nguồn Dữ Liệu</span>' +
          '</div>' +
          '<p class="pd-context-desc">Thu thập từ tệp giao dịch bán lẻ CSV định kỳ, bảng giá tham chiếu thị trường HTML, API đối tác ngoại tệ và cơ sở dữ liệu SQLite.</p>' +
        '</div>' +
        '<div class="pd-context-card">' +
          '<div class="pd-context-header">' +
            '<span class="pd-context-icon">🧹</span>' +
            '<span>Thực Trạng Dữ Liệu Bẩn</span>' +
          '</div>' +
          '<p class="pd-context-desc">Xử lý các tình huống thực tế: số lượng âm, đơn vị tiền tệ hỗn hợp, thiếu mã đơn hàng, ngày giờ lệch múi và bóc trần nghịch lý Simpson.</p>' +
        '</div>' +
        '<div class="pd-context-card">' +
          '<div class="pd-context-header">' +
            '<span class="pd-context-icon">🚀</span>' +
            '<span>Clean Pipeline Tự Động</span>' +
          '</div>' +
          '<p class="pd-context-desc">Dựng cổng kiểm định Validation Gate, cách ly dữ liệu lỗi vào Quarantine, tối ưu hóa RAM 80% và xuất báo cáo điều hành KPI.</p>' +
        '</div>' +
      '</div>' +
    '</section>' +
    '<section id="sec-data-pyramid" style="margin: 32px 0;">' +
      '<h2 class="roadmap-section-title">📐 Kim Tự Tháp Kiến Thức 3 Tầng: Từ Bản Chất Đến Chuyên Sâu</h2>' +
      '<p style="color:var(--text-secondary);margin-bottom:14px;">Mỗi Module trong giáo trình được thiết kế theo đúng mô hình 3 tầng kiến thức lũy tiến, đảm bảo người học không học vẹt cú pháp:</p>' +
      '<div class="pd-pyramid-container">' +
        '<div class="pd-pyramid-tier pd-tier-1">' +
          '<span class="pd-tier-badge">Tầng 1: Cơ Bản</span>' +
          '<div class="pd-tier-content">' +
            '<h4>Bản Chất Kiến Trúc &amp; Mô Hình Tư Duy</h4>' +
            '<p>Hiểu vì sao khái niệm ra đời, giải phẫu bộ nhớ máy tính (C-buffer vs Pointer Array), nguyên lý Indexing và các thao tác cốt lõi.</p>' +
          '</div>' +
        '</div>' +
        '<div class="pd-pyramid-tier pd-tier-2">' +
          '<span class="pd-tier-badge">Tầng 2: Nâng Cao</span>' +
          '<div class="pd-tier-content">' +
            '<h4>Lỗi Kinh Điển, Kiểm Định &amp; Đập Tan Ngộ Nhận</h4>' +
            '<p>Vạch trần cạm bẫy Chained Assignment, bẫy so sánh NaN IEEE 754, ngộ nhận Mean vs Median, Rate Limiting 429 và kỹ thuật Downcasting tiết kiệm RAM.</p>' +
          '</div>' +
        '</div>' +
        '<div class="pd-pyramid-tier pd-tier-3">' +
          '<span class="pd-tier-badge">Tầng 3: Chuyên Sâu</span>' +
          '<div class="pd-tier-content">' +
            '<h4>Sản Xuất Thực Chiến &amp; Clean Pipeline Tự Động</h4>' +
            '<p>Thiết kế luồng xử lý .pipe(), phòng cách ly Quarantine Router, Unit Test hồi quy với assert_frame_equal và đạo đức khai thác dữ liệu.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';

  window.TopicEngine.createApp({
    topicId: 'python-data',
    topicPrefix: 'pd',
    topicTitle: 'Python for Data (Cốt Lõi)',
    storageKey: 'py314_python_data_state_v1',
    parts: PARTS,
    pillPrefix: 'pd',
    partIcons: {
      'mod-01': '🎯',
      'mod-02': '🐍',
      'mod-03': '🔢',
      'mod-04': '🐼',
      'mod-05': '💾',
      'mod-06': '🧹',
      'mod-07': '🔄',
      'mod-08': '📊',
      'mod-09': '📈',
      'mod-10': '🌐',
      'mod-11': '🛡️',
      'mod-12': '⚡',
      'mod-13': '🚀'
    },
    hero: {
      accentColor: '#0284c7',
      eyebrowStyle: 'background:rgba(2,132,199,0.12);color:#0284c7;border-color:rgba(2,132,199,0.3);',
      eyebrow: '<span>📊 Chuyên đề Kỹ nghệ &amp; Phân tích Dữ liệu</span> <span>•</span> <span>13 Module Thực chiến từ Cơ bản đến Chuyên sâu</span>',
      title: 'Làm Chủ Python for Data: Từ Bản Chất Đến Clean Pipeline',
      desc: 'Giáo trình kỹ nghệ dữ liệu thực chiến đi từ bản chất kiến trúc bộ nhớ: NumPy ndarray &amp; SIMD, Pandas DataFrame Indexing, Làm sạch &amp; Ghép nối dữ liệu, Trực quan hóa Matplotlib/Seaborn, Phân tích EDA &amp; Nghịch lý Simpson, Thu thập REST API với Backoff, Hàng rào Kiểm định Pandera/assert_frame_equal và xây dựng Clean Data Pipeline tự động hóa trọn vẹn cho TechMart.',
      buttons: [
        { id: 'hero-case-study-btn', text: '🏢 Ca thực tế TechMart xuyên suốt', scrollTarget: '#sec-techmart-context' },
        { id: 'hero-data-pyramid-btn', text: '📐 Kim tự tháp Kiến thức 3 Tầng', scrollTarget: '#sec-data-pyramid' }
      ],
      stats: [
        { value: '13 Module', label: 'Cốt lõi • Thực chiến • Độc lập' },
        { value: '39 Bài học', label: '100% Code chạy thật • Zero-Placeholder' }
      ],
      roadmapTitle: 'Lộ Trình 13 Module: Từ Bản Chất Bộ Nhớ Đến Production Pipeline'
    },
    overviewExtraSections: extraSectionsHtml,
    overviewExtraTocItems: [
      { id: 'sec-techmart-context', label: 'Bối cảnh TechMart' },
      { id: 'sec-data-pyramid', label: 'Kim tự tháp 3 Tầng' }
    ],
    topNavId: 'top-nav-python-data'
  });
})();
