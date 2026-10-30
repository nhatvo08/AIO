/**
 * Linux Course Application Controller & Configuration
 * Sử dụng TopicEngine dùng chung, tối giản mã lặp, chạy được cả trên file:// và HTTP
 */

(function () {
  'use strict';

  var PARTS = [];
  if (window.LX_LEVEL1_DATA) PARTS.push(window.LX_LEVEL1_DATA);
  if (window.LX_LEVEL2_DATA) PARTS.push(window.LX_LEVEL2_DATA);
  if (window.LX_LEVEL3_DATA) PARTS.push(window.LX_LEVEL3_DATA);
  if (window.LX_LEVEL4_DATA) PARTS.push(window.LX_LEVEL4_DATA);

  var extraSectionsHtml = '' +
    '<section id="sec-env-guide" style="margin: 32px 0;">' +
      '<h2 class="roadmap-section-title">🖥️ Chỉ dẫn Môi trường Thực hành An toàn</h2>' +
      '<p style="color:var(--text-secondary);margin-bottom:14px;">Trước khi gõ các lệnh quản trị, việc chọn đúng môi trường thực hành là yếu tố quyết định để bảo vệ an toàn cho máy tính chính của bạn:</p>' +
      '<div class="lx-distro-grid">' +
        '<div class="lx-distro-card" style="border-left: 4px solid var(--success);">' +
          '<div class="lx-distro-title">' +
            '<span>1. Máy ảo (VM)</span>' +
            '<span class="lx-badge-safe">Khuyên dùng số 1</span>' +
          '</div>' +
          '<div class="lx-distro-desc">' +
            '<strong>VirtualBox / UTM / Multipass:</strong> Chạy nhân Linux độc lập 100%. Hỗ trợ trọn vẹn systemd, kernel modules, LVM, tường lửa và chẩn đoán sâu mà không ảnh hưởng máy thật.' +
          '</div>' +
        '</div>' +
        '<div class="lx-distro-card" style="border-left: 4px solid #f59e0b;">' +
          '<div class="lx-distro-title">' +
            '<span>2. WSL2 (Windows)</span>' +
            '<span class="lx-cmd-badge">Tiện cho Cấp 1 &amp; 2</span>' +
          '</div>' +
          '<div class="lx-distro-desc">' +
            '<strong>Windows Subsystem for Linux:</strong> Rất tiện để gõ lệnh file, xử lý văn bản, lập trình Python &amp; Bash. Hạn chế khi học khởi động bootloader, LVM thiết bị khối hoặc sysctl sâu.' +
          '</div>' +
        '</div>' +
        '<div class="lx-distro-card" style="border-left: 4px solid var(--accent-primary);">' +
          '<div class="lx-distro-title">' +
            '<span>3. Container</span>' +
            '<span class="lx-cmd-badge">Thử nghiệm nhanh</span>' +
          '</div>' +
          '<div class="lx-distro-desc">' +
            '<strong>Docker / Podman:</strong> Khởi động trong vài giây để thử lệnh cài gói, script dọn dẹp. Lưu ý: dùng chung nhân với máy chủ, mặc định không chạy PID 1 systemd và không can thiệp phần cứng.' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +
    '<section id="sec-kernel-distro" style="margin: 32px 0;">' +
      '<h2 class="roadmap-section-title">🐧 Phân biệt Rạch ròi: Kernel (Nhân) vs Bản phân phối (Distro)</h2>' +
      '<div class="lx-vs-grid">' +
        '<div class="lx-vs-card kernel-card">' +
          '<div class="lx-vs-title">' +
            '<span>⚙️</span>' +
            '<span>LINUX KERNEL</span>' +
            '<span class="lx-vs-tag">Core Engine</span>' +
          '</div>' +
          '<p class="lx-vs-desc">Bộ não trung tâm (Nhân hệ điều hành) điều khiển phần cứng do Linus Torvalds khởi xướng năm 1991, viết bằng ngôn ngữ C.</p>' +
          '<ul class="lx-vs-list">' +
            '<li><span class="lx-vs-bullet">•</span> Quản lý trực tiếp CPU, bộ nhớ RAM, thiết bị vào/ra và các tiến trình.</li>' +
            '<li><span class="lx-vs-bullet">•</span> Cung cấp giao diện Lời gọi hệ thống (System Calls) cho phần mềm.</li>' +
            '<li><span class="lx-vs-bullet">•</span> Đứng một mình thì không thể dùng được nếu thiếu các tiện ích người dùng.</li>' +
          '</ul>' +
        '</div>' +
        '<div class="lx-vs-card distro-card">' +
          '<div class="lx-vs-title">' +
            '<span>📦</span>' +
            '<span>LINUX DISTRO</span>' +
            '<span class="lx-vs-tag">Full OS Package</span>' +
          '</div>' +
          '<p class="lx-vs-desc">Bản phân phối hệ điều hành hoàn chỉnh gồm Kernel + GNU Userland + Trình quản lý gói + Dịch vụ hệ thống.</p>' +
          '<ul class="lx-vs-list">' +
            '<li><span class="lx-vs-bullet">•</span> <strong>Họ Debian/Ubuntu:</strong> Trình quản lý gói <code>apt</code>, phổ biến nhất trên server đám mây.</li>' +
            '<li><span class="lx-vs-bullet">•</span> <strong>Họ RHEL/Rocky/Fedora:</strong> Trình quản lý gói <code>dnf</code>, tiêu chuẩn trong khối doanh nghiệp lớn.</li>' +
            '<li><span class="lx-vs-bullet">•</span> <strong>Họ Arch Linux:</strong> Trình quản lý gói <code>pacman</code>, cập nhật liên tục (Rolling Release).</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</section>';

  window.TopicEngine.createApp({
    topicId: 'linux',
    topicPrefix: 'lx',
    topicTitle: 'Linux Thực chiến & Nội bộ Hệ điều hành',
    storageKey: 'py314_lx_course_state_v1',
    parts: PARTS,
    pillPrefix: 'lx',
    partIcons: {
      'part-lx-1': '🌱',
      'part-lx-2': '🌿',
      'part-lx-3': '🛡️',
      'part-lx-4': '🔬'
    },
    hero: {
      accentColor: '#d97706',
      eyebrowStyle: 'background:rgba(245,158,11,0.14);color:#b45309;border-color:rgba(245,158,11,0.35);',
      eyebrow: '<span>🐧 Chuyên đề Kỹ thuật Hệ thống &amp; Vận hành</span> <span>•</span> <span>Từ Dòng lệnh đến Nội bộ Nhân OS</span>',
      title: 'Làm chủ Linux Thực Chiến &amp; Nội bộ Hệ Điều Hành',
      desc: 'Giáo trình đào tạo toàn diện đi từ bản chất: làm chủ dòng lệnh, cấu trúc cây thư mục, phân quyền bảo mật, tự động hóa Shell Script/Cron, quản trị dịch vụ systemd, lưu trữ LVM, mạng &amp; tường lửa nftables, Nginx, Docker, Ansible — tiến sâu tới giải phẫu syscall, tiến trình, quản lý bộ nhớ ảo/Page Cache, VFS, eBPF và phương pháp chẩn đoán sự cố bài bản.',
      buttons: [
        { id: 'hero-env-guide-btn', text: '🖥️ Hướng dẫn Môi trường Thực hành An toàn', scrollTarget: '#sec-env-guide' },
        { id: 'hero-distro-btn', text: '🐧 Phân biệt Kernel vs Distro', scrollTarget: '#sec-kernel-distro' }
      ],
      stats: [
        { value: '4 Cấp độ', label: 'Cơ bản • Trung cấp • Nâng cao • Chuyên sâu' },
        { value: '100% Thực chiến', label: 'Gắn liền với Python, Web & Server' }
      ],
      roadmapTitle: 'Lộ trình 4 Cấp độ: Từ Cơ bản đến Nội bộ HĐH'
    },
    overviewExtraSections: extraSectionsHtml,
    overviewExtraTocItems: [
      { id: 'sec-env-guide', label: 'Môi trường Thực hành An toàn' },
      { id: 'sec-kernel-distro', label: 'Kernel vs Distro' }
    ],
    topNavId: 'top-nav-linux'
  });
})();
