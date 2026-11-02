/**
 * Data & AI Libraries Application Controller & Configuration
 * Sử dụng TopicEngine dùng chung, chạy được cả trên file:// và HTTP
 */

(function () {
  'use strict';

  var COURSES = [];
  if (window.DATA_AI_GROUP1_DATA) COURSES.push(window.DATA_AI_GROUP1_DATA);
  if (window.DATA_AI_GROUP2_DATA) COURSES.push(window.DATA_AI_GROUP2_DATA);
  if (window.DATA_AI_GROUP3_DATA) COURSES.push(window.DATA_AI_GROUP3_DATA);
  if (window.DATA_AI_GROUP4_DATA) COURSES.push(window.DATA_AI_GROUP4_DATA);
  if (window.DATA_AI_GROUP5_DATA) COURSES.push(window.DATA_AI_GROUP5_DATA);

  window.TopicEngine.createApp({
    topicId: 'data-ai',
    topicPrefix: 'data-ai',
    topicTitle: 'Thư viện Python cho Dữ liệu & AI',
    storageKey: 'py314_data_ai_course_state_v1',
    courses: COURSES,
    referenceData: window.DATA_AI_REFERENCE_DATA,
    pillPrefix: 'data-ai',
    partIcons: {
      'part-ai-numpy': '🔢',
      'part-ai-pandas': '🐼',
      'part-ai-scipy': '🔬',
      'part-ai-statsmodels': '📈',
      'part-ai-matplotlib': '📉',
      'part-ai-seaborn': '🎨',
      'part-ai-plotly-bokeh': '✨',
      'part-ai-sklearn': '⚙️',
      'part-ai-tf': '🔶',
      'part-ai-torch': '🔥',
      'part-ai-tf-vs-torch': '⚖️',
      'part-ai-polars': '⚡',
      'part-ai-dask': '🐙',
      'part-ai-pyspark': '🚀',
      'part-ai-ref': '🗺️'
    },
    hero: {
      accentColor: '#059669',
      eyebrowStyle: 'background:rgba(16,185,129,0.14);color:#047857;border-color:rgba(16,185,129,0.35);',
      eyebrow: '<span>🧠 Chuyên đề Kỹ thuật Dữ liệu &amp; Trí tuệ Nhân tạo</span> <span>•</span> <span>Làm chủ 12 Thư viện Trụ cột</span>',
      title: 'Làm chủ Hệ thống Thư viện Python cho Dữ liệu &amp; AI',
      desc: 'Giáo trình đào tạo bài bản đi thẳng vào BẢN CHẤT: từ kiến trúc bộ nhớ ndarray của NumPy, tư duy vectorization, cơ chế Index alignment của Pandas đến giải tích số SciPy, thống kê suy diễn Statsmodels, phân cấp Artist trong Matplotlib, API thống nhất của Scikit-learn, đồ thị autograd trong PyTorch &amp; TensorFlow, tới Dataframe siêu tốc Polars và tính toán phân tán Dask / PySpark.',
      buttons: [
        { id: 'hero-map-btn', text: '🗺️ Bản đồ Hệ sinh thái & Định hướng', target: 'data-ai-ecosystem-map' }
      ],
      stats: [
        { value: '5 Nhóm', label: 'Nền tảng • Thống kê • Trực quan • AI/ML • Big Data' },
        { value: '12 Thư viện', label: 'Bao quát toàn diện hệ sinh thái Python hiện đại' },
        { value: '72 Bài học', label: 'Đi từ Bản chất • Trực quan hóa • Dự án Thực chiến' }
      ],
      roadmapTitle: 'Lộ trình 5 Nhóm Chuyên đề &amp; 12 Thư viện Trụ cột'
    },
    topNavId: 'top-nav-data-ai'
  });
})();
