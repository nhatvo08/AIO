/**
 * Network Course Application Controller & Configuration
 * Sử dụng TopicEngine dùng chung, tối giản mã lặp, chạy mượt cả trên file:// và HTTP
 */

(function () {
  'use strict';

  var BASIC_PARTS = [];
  for (var b = 0; b <= 10; b++) {
    var key = 'NET_BASIC_MOD' + b + '_DATA';
    if (window[key]) BASIC_PARTS.push(window[key]);
  }

  var ADVANCED_PARTS = [];
  if (window.NET_PHASE0_DATA) ADVANCED_PARTS.push(window.NET_PHASE0_DATA);
  if (window.NET_PHASE1_DATA) ADVANCED_PARTS.push(window.NET_PHASE1_DATA);
  if (window.NET_PHASE2_DATA) ADVANCED_PARTS.push(window.NET_PHASE2_DATA);
  if (window.NET_PHASE3A_DATA) ADVANCED_PARTS.push(window.NET_PHASE3A_DATA);
  if (window.NET_PHASE3B_DATA) ADVANCED_PARTS.push(window.NET_PHASE3B_DATA);
  if (window.NET_PHASE4_DATA) ADVANCED_PARTS.push(window.NET_PHASE4_DATA);
  if (window.NET_PHASE5_DATA) ADVANCED_PARTS.push(window.NET_PHASE5_DATA);
  if (window.NET_PHASE6_DATA) ADVANCED_PARTS.push(window.NET_PHASE6_DATA);
  if (window.NET_PHASE7_DATA) ADVANCED_PARTS.push(window.NET_PHASE7_DATA);
  if (window.NET_PHASE8_DATA) ADVANCED_PARTS.push(window.NET_PHASE8_DATA);
  if (window.NET_PHASE9_DATA) ADVANCED_PARTS.push(window.NET_PHASE9_DATA);
  if (window.NET_PHASE10_DATA) ADVANCED_PARTS.push(window.NET_PHASE10_DATA);
  if (window.NET_PHASE11_DATA) ADVANCED_PARTS.push(window.NET_PHASE11_DATA);

  var extraSectionsHtml = '' +
    '<section id="sec-lab-guide" class="net-lab-section">' +
      '<div class="net-lab-header">' +
        '<div class="net-lab-tag">🧪 Nền tảng Thực hành Không rủi ro</div>' +
        '<h2 class="net-lab-title"><span>🛡️</span> <span>Triết lý Phòng Lab An toàn &amp; Độc lập 100%</span></h2>' +
        '<p class="net-lab-subtitle">Không cần máy ảo cồng kềnh, không lo mất mạng hay ảnh hưởng máy thật. Toàn bộ topo mạng đa router, switch và firewall đều được cô lập tuyệt đối trong không gian mạng ảo (Network Namespaces) của Linux Kernel.</p>' +
      '</div>' +

      '<div class="net-lab-grid">' +
        '<div class="net-lab-card">' +
          '<div class="net-lab-card-top">' +
            '<div class="net-lab-card-title"><span>📦</span> <span>1. Network Namespaces</span></div>' +
            '<span class="net-lab-pill">Cô lập Tuyệt đối</span>' +
          '</div>' +
          '<div class="net-lab-desc">' +
            '<strong>ip netns &amp; veth pair:</strong> Tách biệt hoàn toàn bảng định tuyến, interface, socket table và iptables. Chi phí RAM gần như bằng 0, khởi tạo tức thì.' +
          '</div>' +
          '<div class="net-lab-cmd-preview">$ sudo ip netns add router1 && ip link add veth0 type veth peer name veth1</div>' +
        '</div>' +

        '<div class="net-lab-card">' +
          '<div class="net-lab-card-top">' +
            '<div class="net-lab-card-title"><span>🔬</span> <span>2. Mổ xẻ Gói Tin Nhị Phân</span></div>' +
            '<span class="net-lab-pill">Bằng chứng Thực nghiệm</span>' +
          '</div>' +
          '<div class="net-lab-desc">' +
            '<strong>tcpdump &amp; Wireshark:</strong> Không học vẹt theo lý thuyết suông. Mọi cấu trúc header, bắt tay 3 bước TCP, cờ SYN/ACK đều được bắt và đọc từng byte offset.' +
          '</div>' +
          '<div class="net-lab-cmd-preview">$ sudo tcpdump -i any -nn -XX \'icmp or tcp port 80\'</div>' +
        '</div>' +

        '<div class="net-lab-card">' +
          '<div class="net-lab-card-top">' +
            '<div class="net-lab-card-title"><span>⚡</span> <span>3. Giả lập Mạng Xấu</span></div>' +
            '<span class="net-lab-pill">Thử lửa Thực chiến</span>' +
          '</div>' +
          '<div class="net-lab-desc">' +
            '<strong>tc-netem &amp; iperf3:</strong> Tự tay bơm 100ms trễ xuyên lục địa, giả lập rớt gói 1-5% để thấy TCP retransmit và so sánh trực quan hiệu năng giữa TCP Cubic và BBR.' +
          '</div>' +
          '<div class="net-lab-cmd-preview">$ sudo tc qdisc add dev veth0 root netem delay 100ms loss 1%</div>' +
        '</div>' +
      '</div>' +

      '<div class="net-loop-container">' +
        '<div class="net-loop-title"><span>🔄</span> Vòng lặp học tập thực chiến 5 bước (Hands-on Feedback Loop)</div>' +
        '<div class="net-loop-steps">' +
          '<div class="net-loop-step">' +
            '<span class="net-loop-num">BƯỚC 1</span>' +
            '<div class="net-loop-text">Hiểu Bản Chất</div>' +
          '</div>' +
          '<div class="net-loop-step">' +
            '<span class="net-loop-num">BƯỚC 2</span>' +
            '<div class="net-loop-text">Dựng Topo Ảo</div>' +
          '</div>' +
          '<div class="net-loop-step">' +
            '<span class="net-loop-num">BƯỚC 3</span>' +
            '<div class="net-loop-text">Quan Sát Packet</div>' +
          '</div>' +
          '<div class="net-loop-step">' +
            '<span class="net-loop-num">BƯỚC 4</span>' +
            '<div class="net-loop-text">Cố Tình Phá Hỏng</div>' +
          '</div>' +
          '<div class="net-loop-step">' +
            '<span class="net-loop-num">BƯỚC 5</span>' +
            '<div class="net-loop-text">Gỡ Lỗi &amp; Cleanup</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="net-safety-banner">' +
        '<div class="net-safety-item">' +
          '<span class="net-safety-icon">✓</span>' +
          '<span>An toàn 100%: Mạng lab cô lập, không ảnh hưởng Wi-Fi hay card mạng thật.</span>' +
        '</div>' +
        '<div class="net-safety-item">' +
          '<span class="net-safety-icon">✓</span>' +
          '<span>Tương thích rộng: Chạy mượt trên Ubuntu, Debian, WSL2, Multipass, VirtualBox.</span>' +
        '</div>' +
        '<div class="net-safety-item">' +
          '<span class="net-safety-icon">✓</span>' +
          '<span>Có sẵn lệnh dọn dẹp: Mỗi bài lab đều kết thúc bằng lệnh cleanup 1 dòng trả lại nguyên trạng.</span>' +
        '</div>' +
      '</div>' +
    '</section>';

  window.TopicEngine.createApp({
    topicId: 'network',
    topicPrefix: 'net',
    topicTitle: 'Chuyên đề Networking Toàn diện',
    storageKey: 'py314_net_course_state_v1',
    courses: [
      {
        id: 'course-net-hp1',
        number: 'Học phần I',
        title: 'Networking Cơ Bản',
        icon: '🌐',
        badge: '11 Module',
        customClass: 'network-basic-banner',
        desc: 'Giáo trình Mạng máy tính căn bản cho người mới bắt đầu từ con số 0: đi từ trực giác đời thường, giải mã bản chất các tầng mạng OSI/TCP-IP, tính toán Subnetting từng bước bằng tay, chẩn đoán lỗi mạng bằng lệnh CLI và thực hành Wireshark / Cisco Packet Tracer.',
        parts: BASIC_PARTS
      },
      {
        id: 'course-net-hp2',
        number: 'Học phần II',
        title: 'Networking Chuyên Sâu trên Linux',
        icon: '🐧',
        badge: '13 Giai đoạn',
        customClass: 'network-banner',
        desc: 'Giáo trình hạ tầng mạng chuyên sâu: lấy Linux Network Stack làm phòng thí nghiệm quan sát. Tự tay mổ xẻ sk_buff, Linux Bridge, VLAN 802.1Q, định tuyến động OSPF với FRR, máy trạng thái TCP, Netfilter & nftables, TLS 1.3, WireGuard VPN và Socket Python.',
        parts: ADVANCED_PARTS
      }
    ],
    pillPrefix: 'net',
    partIcons: {
      'part-net-b-0': '🌐',
      'part-net-b-1': '📶',
      'part-net-b-2': '🔌',
      'part-net-b-3': '🔢',
      'part-net-b-4': '✂️',
      'part-net-b-5': '🧭',
      'part-net-b-6': '🚚',
      'part-net-b-7': '🌍',
      'part-net-b-8': '🏢',
      'part-net-b-9': '🛡️',
      'part-net-b-10': '🩺',
      'part-net-0': '🔌',
      'part-net-1': '📦',
      'part-net-2': '🔀',
      'part-net-3a': '🏷️',
      'part-net-3b': '🧭',
      'part-net-4': '🚚',
      'part-net-5': '🧱',
      'part-net-6': '🌐',
      'part-net-7': '🛡️',
      'part-net-8': '🐳',
      'part-net-9': '🩺',
      'part-net-10': '🐍',
      'part-net-11': '🏛️'
    },
    hero: {
      accentColor: '#0284c7',
      eyebrowStyle: 'background:rgba(2,132,199,0.14);color:#0284c7;border-color:rgba(2,132,199,0.35);',
      eyebrow: '<span>🌐 Chuyên đề Networking Toàn diện</span> <span>•</span> <span>Từ Căn Bản Trực Giác đến Kỹ Thuật Hệ Thống Linux</span>',
      title: 'Làm chủ Mạng Máy Tính & Networking Chuyên Sâu',
      desc: 'Lộ trình đào tạo mạng máy tính hoàn chỉnh hai học phần: Học phần I (Networking Cơ Bản) dành cho người mới bắt đầu từ trực giác đến công cụ dòng lệnh/Wireshark; Học phần II (Networking Chuyên Sâu trên Linux) đào sâu vào Linux Network Stack, Kernel Socket, Linux Bridge, VLAN, OSPF, Netfilter và WireGuard.',
      buttons: [
        { id: 'hero-hp1-btn', text: '🌐 Lộ trình Học phần I (Cơ bản)', scrollTarget: '#home-course-net-hp1' },
        { id: 'hero-hp2-btn', text: '🐧 Lộ trình Học phần II (Chuyên sâu)', scrollTarget: '#home-course-net-hp2' },
        { id: 'hero-lab-guide-btn', text: '🧪 Triết lý Thực hành An toàn', scrollTarget: '#sec-lab-guide' }
      ],
      stats: [
        { value: 'Học phần I & II', label: 'Căn bản & Chuyên sâu' },
        { value: '24 Module/GĐ', label: 'Lộ trình Thực chiến' },
        { value: '100% Thực hành', label: 'CLI, Wireshark & Kernel' }
      ],
      roadmapTitle: 'Lộ trình Đào tạo Mạng Toàn diện'
    },
    overviewExtraSections: extraSectionsHtml,
    overviewExtraTocItems: [
      { id: 'sec-lab-guide', label: 'Phòng Lab An toàn' }
    ],
    topNavId: 'top-nav-network'
  });
})();
