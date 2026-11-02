/**
 * Mục lục và Cấu trúc Chuyên đề cURL (data/curl/curriculum.js)
 * Định nghĩa 20 Chương học (3 Cấp độ) và 7 Phụ lục tra cứu chuyên sâu.
 * Chuẩn hóa metadata, liên kết tiên quyết, thời lượng học ước tính.
 */

(function () {
  'use strict';

  var CURL_COURSE_META = {
    id: 'curl-mastery',
    title: 'cURL Thực Chiến & Tối Ưu Mạng Toàn Diện',
    subtitle: 'Từ Dòng Lệnh Cơ Bản Đến Tự Động Hóa CI/CD, Khắc Phục Lỗi Mạng & Bảo Mật Production',
    badge: '20 Chương + 7 Phụ lục',
    icon: '🌐',
    totalChapters: 20,
    totalAppendices: 7,
    totalDurationMinutes: 520,
    minCurlVersion: '7.50.0'
  };

  var CURL_LEVELS = [
    {
      id: 'level-1',
      number: 1,
      title: 'Cấp độ 1: Nền Tảng Cốt Lõi',
      tagline: 'Hiểu bản chất cURL, thành thạo terminal, đa môi trường shell và request căn bản',
      badgeClass: 'level-basic',
      icon: '🌱',
      chapterIds: ['ch01', 'ch02', 'ch03', 'ch04', 'ch05', 'ch06']
    },
    {
      id: 'level-2',
      number: 2,
      title: 'Cấp độ 2: Kỹ Năng Trung Cấp',
      tagline: 'Quản trị Header, Auth an toàn, xử lý file/streaming, Cookie, Redirect và Chẩn đoán mạng',
      badgeClass: 'level-inter',
      icon: '🌿',
      chapterIds: ['ch07', 'ch08', 'ch09', 'ch10', 'ch11', 'ch12']
    },
    {
      id: 'level-3',
      number: 3,
      title: 'Cấp độ 3: Chuyên Sâu & Production Hardening',
      tagline: 'TLS/mTLS, Proxy, DNS DoH, Caching, Retry Idempotent, Automation Scripting & Bảo mật',
      badgeClass: 'level-expert',
      icon: '🔬',
      chapterIds: ['ch13', 'ch14', 'ch15', 'ch16', 'ch17', 'ch18', 'ch19', 'ch20']
    },
    {
      id: 'level-appendix',
      number: 4,
      title: 'Phụ Lục & Tra Cứu Toàn Diện',
      tagline: 'Bảng cờ option theo phiên bản, HTTP status, Exit code, Shell quoting cheatsheet',
      badgeClass: 'level-adv',
      icon: '📚',
      chapterIds: ['app-a', 'app-b', 'app-c', 'app-d', 'app-e', 'app-f', 'app-g']
    }
  ];

  var CURL_CHAPTERS = [
    // === CẤP ĐỘ 1: NỀN TẢNG ===
    {
      id: 'ch01',
      order: 1,
      levelId: 'level-1',
      levelName: 'Cơ bản',
      number: 'Chương 01',
      title: 'cURL Là Gì & Vị Trí Trong Hệ Sinh Thái Phần Mềm',
      shortTitle: 'Tổng quan cURL & libcurl',
      durationMinutes: 20,
      curlMinVersion: '7.0.0',
      keywords: ['curl là gì', 'libcurl', 'postman vs curl', 'load test', 'grpc', 'websocket'],
      prerequisites: [],
      qaStatus: 'verified',
      summary: 'Phân biệt cURL CLI vs libcurl, lý do developer cần thành thạo, so sánh với Postman/fetch/axios và các giới hạn thực tế.'
    },
    {
      id: 'ch02',
      order: 2,
      levelId: 'level-1',
      levelName: 'Cơ bản',
      number: 'Chương 02',
      title: 'Cài Đặt, Kiểm Tra curl -V & Cẩm Nang Quoting Đa Shell',
      shortTitle: 'Môi trường Shell & Quoting',
      durationMinutes: 30,
      curlMinVersion: '7.0.0',
      keywords: ['curl -V', 'bash', 'powershell', 'cmd', 'curl.exe', 'quoting', 'escaping json', 'docker alpine'],
      prerequisites: ['ch01'],
      qaStatus: 'verified',
      summary: 'Đọc hiểu Protocols và Features trong curl -V, giải quyết cạm bẫy curl vs curl.exe trên PowerShell, kỹ thuật quote JSON đa nền tảng và Docker.'
    },
    {
      id: 'ch03',
      order: 3,
      levelId: 'level-1',
      levelName: 'Cơ bản',
      number: 'Chương 03',
      title: 'Kiến Thức HTTP Cần Có Để Làm Chủ cURL',
      shortTitle: 'Kiến thức HTTP cốt lõi',
      durationMinutes: 25,
      curlMinVersion: '7.0.0',
      keywords: ['http request', 'http response', 'header', 'status code', 'etag', 'cache-control', 'content negotiation'],
      prerequisites: ['ch01'],
      qaStatus: 'verified',
      summary: 'Cấu trúc HTTP message, vòng đời request/response, cơ chế cache ETag/Last-Modified và thương lượng nội dung Accept.'
    },
    {
      id: 'ch04',
      order: 4,
      levelId: 'level-1',
      levelName: 'Cơ bản',
      number: 'Chương 04',
      title: 'Request Đầu Tiên & Bộ Cờ Thiết Yếu (-s, -S, -i, -I, -v, -D)',
      shortTitle: 'Request đầu tiên & Flags cơ bản',
      durationMinutes: 25,
      curlMinVersion: '7.0.0',
      keywords: ['curl url', '-s', '-S', '-i', '-I', '-v', '-D', 'dump header'],
      prerequisites: ['ch02', 'ch03'],
      qaStatus: 'verified',
      summary: 'Gửi request cơ bản, đọc hiểu output verbose (-v), tắt thanh tiến độ mà vẫn bắt lỗi (-sS), kiểm tra header với -I và lưu header với -D.'
    },
    {
      id: 'ch05',
      order: 5,
      levelId: 'level-1',
      levelName: 'Cơ bản',
      number: 'Chương 05',
      title: 'HTTP Methods Thực Chiến & Cạm Bẫy Lạm Dụng Cờ -X',
      shortTitle: 'HTTP Methods & Cạm bẫy -X',
      durationMinutes: 25,
      curlMinVersion: '7.0.0',
      keywords: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', '-X', 'redirect bug'],
      prerequisites: ['ch03', 'ch04'],
      qaStatus: 'verified',
      summary: 'Hiểu đúng ngữ nghĩa các phương thức RESTful và lý do cờ -X có thể gây lỗi nghiêm trọng khi kết hợp với redirect -L.'
    },
    {
      id: 'ch06',
      order: 6,
      levelId: 'level-1',
      levelName: 'Cơ bản',
      number: 'Chương 06',
      title: 'Gửi Dữ Liệu Chuyên Sâu: -d, --data-raw, --json, -F & --url-query',
      shortTitle: 'Gửi dữ liệu & Encode Form/JSON',
      durationMinutes: 35,
      curlMinVersion: '7.82.0',
      keywords: ['--json', '-d', '--data-raw', '--data-binary', '--data-urlencode', '-F multipart', '--url-query'],
      prerequisites: ['ch02', 'ch05'],
      qaStatus: 'verified',
      summary: 'So sánh chi tiết các cờ gửi dữ liệu, tận dụng cờ hiện đại --json và --url-query, tránh cạm bẫy mất ký tự xuống dòng và double-encode.'
    },

    // === CẤP ĐỘ 2: TRUNG CẤP ===
    {
      id: 'ch07',
      order: 7,
      levelId: 'level-2',
      levelName: 'Trung cấp',
      number: 'Chương 07',
      title: 'Quản Trị Request & Response Headers Chuyên Nghiệp (-H)',
      shortTitle: 'Quản trị Header (-H)',
      durationMinutes: 25,
      curlMinVersion: '7.0.0',
      keywords: ['-H', 'Content-Type', 'Accept', 'User-Agent', 'xóa header mặc định', 'custom headers'],
      prerequisites: ['ch04', 'ch06'],
      qaStatus: 'verified',
      summary: 'Tùy biến header, ghi đè User-Agent, kỹ thuật xóa sạch header mặc định của cURL bằng cú pháp -H "Header:".'
    },
    {
      id: 'ch08',
      order: 8,
      levelId: 'level-2',
      levelName: 'Trung cấp',
      number: 'Chương 08',
      title: 'Xác Thực & Quản Lý Token: Basic, Bearer, API Key, OAuth2',
      shortTitle: 'Xác thực & Bảo vệ Token',
      durationMinutes: 30,
      curlMinVersion: '7.0.0',
      keywords: ['Basic Auth -u', 'Bearer Token', 'API Key', 'Digest', 'OAuth2', 'rủi ro lộ secret'],
      prerequisites: ['ch07'],
      qaStatus: 'verified',
      summary: 'Thực hành các chuẩn xác thực phổ biến và giải pháp bảo vệ token không bị lộ trong process list hoặc terminal history.'
    },
    {
      id: 'ch09',
      order: 9,
      levelId: 'level-2',
      levelName: 'Trung cấp',
      number: 'Chương 09',
      title: 'Download, Upload File Lớn, Streaming SSE & Giới Hạn WebSocket',
      shortTitle: 'File Transfer, Streaming & SSE',
      durationMinutes: 35,
      curlMinVersion: '7.73.0',
      keywords: ['-o', '-O', '-J', '--remote-time', '--create-dirs', '--output-dir', '--range', '-C -', 'SSE', '--no-buffer'],
      prerequisites: ['ch04', 'ch06'],
      qaStatus: 'verified',
      summary: 'Tải và resume file tải dở, giới hạn tốc độ (--limit-rate), đọc stream SSE thời gian thực và giới hạn thực tế của cURL với WebSocket.'
    },
    {
      id: 'ch10',
      order: 10,
      levelId: 'level-2',
      levelName: 'Trung cấp',
      number: 'Chương 10',
      title: 'Quản Lý Cookie & Phiên Làm Việc (Cookie Jar -b, -c)',
      shortTitle: 'Cookie Jar & Session',
      durationMinutes: 25,
      curlMinVersion: '7.0.0',
      keywords: ['-b', '-c', 'cookie jar', 'Netscape format', 'session maintenance', 'cookie redirect'],
      prerequisites: ['ch07'],
      qaStatus: 'verified',
      summary: 'Lưu và nạp cookie tự động qua nhiều request, mô phỏng đăng nhập web và theo dõi cookie qua các lần chuyển hướng.'
    },
    {
      id: 'ch11',
      order: 11,
      levelId: 'level-2',
      levelName: 'Trung cấp',
      number: 'Chương 11',
      title: 'Chuyển Hướng, Timeout & Hiểm Họa --location-trusted',
      shortTitle: 'Redirect, Timeout & Cạm bẫy bảo mật',
      durationMinutes: 30,
      curlMinVersion: '7.10.4',
      keywords: ['-L', '--max-redirs', '--connect-timeout', '-m', '301 vs 307', '--post301', '--location-trusted'],
      prerequisites: ['ch05', 'ch08'],
      qaStatus: 'verified',
      summary: 'Phân tích hành vi chuyển hướng HTTP, kiểm soát timeout phân đoạn và cảnh báo rò rỉ credential nghiêm trọng khi dùng --location-trusted.'
    },
    {
      id: 'ch12',
      order: 12,
      levelId: 'level-2',
      levelName: 'Trung cấp',
      number: 'Chương 12',
      title: 'Diagnostics Chuyên Sâu: --trace, -w & Đo Đạc Độ Trễ Từng Giai Đoạn',
      shortTitle: 'Diagnostics & Bảng đo thời gian -w',
      durationMinutes: 35,
      curlMinVersion: '8.3.0',
      keywords: ['-v', '--trace', '--trace-ascii', '--trace-time', '--trace-config', '-w write-out', 'time_namelookup', 'time_connect', 'time_starttransfer'],
      prerequisites: ['ch04', 'ch11'],
      qaStatus: 'verified',
      summary: 'Sử dụng bộ biến định dạng -w để bóc tách thời gian DNS, TCP Handshake, TLS Handshake và TTFB thành biểu đồ trực quan.'
    },

    // === CẤP ĐỘ 3: CHUYÊN SÂU & PRODUCTION ===
    {
      id: 'ch13',
      order: 13,
      levelId: 'level-3',
      levelName: 'Chuyên sâu',
      number: 'Chương 13',
      title: 'Bảo Mật HTTPS, TLS, mTLS & Lý Do Tuyệt Đối Cấm -k Ở Production',
      shortTitle: 'HTTPS, TLS Handshake & mTLS',
      durationMinutes: 35,
      curlMinVersion: '7.50.0',
      keywords: ['HTTPS', 'TLS 1.3', 'CA bundle', '-k insecure', '--cacert', '--cert', '--key', 'mTLS', 'PEM DER PKCS#12'],
      prerequisites: ['ch08', 'ch12'],
      qaStatus: 'verified',
      summary: 'Cơ chế xác thực chứng chỉ số, thiết lập mTLS với private key, phân tích nguy cơ tấn công MitM khi dùng -k và cách sửa chuẩn.'
    },
    {
      id: 'ch14',
      order: 14,
      levelId: 'level-3',
      levelName: 'Chuyên sâu',
      number: 'Chương 14',
      title: 'Mạng, Proxy (SOCKS5), DNS over HTTPS (DoH), Unix Socket & HTTP/3',
      shortTitle: 'Proxy, DoH, Unix Socket & HTTP/3',
      durationMinutes: 35,
      curlMinVersion: '7.66.0',
      keywords: ['--proxy', 'socks5 vs socks5h', '--resolve', '--doh-url', '--unix-socket', 'HTTP/2', 'HTTP/3', 'NO_PROXY'],
      prerequisites: ['ch12', 'ch13'],
      qaStatus: 'verified',
      summary: 'Định tuyến traffic qua Proxy/SOCKS, phân giải DNS bảo mật DoH, can thiệp DNS với --resolve, gọi API qua Unix domain socket và HTTP/3.'
    },
    {
      id: 'ch15',
      order: 15,
      levelId: 'level-3',
      levelName: 'Chuyên sâu',
      number: 'Chương 15',
      title: 'Caching Nâng Cao: ETag, --etag-save, --etag-compare & Tiết Kiệm Băng Thông',
      shortTitle: 'Caching & Conditional Request',
      durationMinutes: 30,
      curlMinVersion: '7.68.0',
      keywords: ['If-None-Match', 'ETag', 'If-Modified-Since', '--etag-save', '--etag-compare', '304 Not Modified', '--compressed'],
      prerequisites: ['ch03', 'ch09'],
      qaStatus: 'verified',
      summary: 'Khai thác conditional request để nhận HTTP 304, tự động hóa lưu và so khớp ETag với cờ mới của cURL, tối ưu 90% băng thông.'
    },
    {
      id: 'ch16',
      order: 16,
      levelId: 'level-3',
      levelName: 'Chuyên sâu',
      number: 'Chương 16',
      title: 'Retry Tự Động & Xử Lý Lỗi Thông Minh: --fail-with-body, Backoff & Jitter',
      shortTitle: 'Retry Semantics & Error Handling',
      durationMinutes: 35,
      curlMinVersion: '7.76.0',
      keywords: ['-f', '--fail-with-body', '--retry', '--retry-all-errors', 'exit codes', 'backoff jitter', 'idempotency', 'Retry-After'],
      prerequisites: ['ch11', 'ch12'],
      qaStatus: 'verified',
      summary: 'Phân biệt lỗi mạng vs HTTP 4xx/5xx bằng exit code, kết hợp --fail-with-body, chiến lược retry chỉ cho request idempotent kèm exponential backoff.'
    },
    {
      id: 'ch17',
      order: 17,
      levelId: 'level-3',
      levelName: 'Chuyên sâu',
      number: 'Chương 17',
      title: 'Tương Tác API Thực Tế: CRUD Chuẩn RESTful, Phân Trang, Rate Limit & GraphQL',
      shortTitle: 'Thực chiến REST API & GraphQL',
      durationMinutes: 35,
      curlMinVersion: '7.82.0',
      keywords: ['CRUD API', 'pagination cursor link header', 'rate limiting', 'GraphQL query mutation', 'webhook debugging'],
      prerequisites: ['ch06', 'ch08', 'ch16'],
      qaStatus: 'verified',
      summary: 'Xây dựng workflow gọi API hoàn chỉnh: xác thực, duyệt trang dữ liệu lớn, xử lý phản hồi 429 Rate Limit và truy vấn GraphQL payload.'
    },
    {
      id: 'ch18',
      order: 18,
      levelId: 'level-3',
      levelName: 'Chuyên sâu',
      number: 'Chương 18',
      title: 'Tự Động Hóa CI/CD, Kịch Bản Shell & Xử Lý Output JSON Với jq',
      shortTitle: 'CI/CD Automation & jq Scripting',
      durationMinutes: 35,
      curlMinVersion: '7.70.0',
      keywords: ['CI/CD pipeline', 'GitHub Actions', 'jq parser', 'set -euo pipefail', '--fail-with-body', '-w "%{json}"', 'healthcheck polling', 'secrets masking'],
      prerequisites: ['ch02', 'ch12', 'ch16'],
      qaStatus: 'verified',
      summary: 'Tích hợp cURL vào pipeline CI/CD an toàn: bộ cờ vàng fail-fast, chốt chặn pipefail, bóc tách JSON và kiểm tra SLA với jq, cùng kịch bản healthcheck polling.'
    },
    {
      id: 'ch19',
      order: 19,
      levelId: 'level-3',
      levelName: 'Chuyên sâu',
      number: 'Chương 19',
      title: 'Bảo Mật Thực Chiến: Chống Lộ Token, .netrc, Chống SSRF & Injection Trong CI/CD',
      shortTitle: 'Security Hardening & Production Audit',
      durationMinutes: 35,
      curlMinVersion: '7.50.0',
      keywords: ['.netrc chmod 600', 'process table leak ps aux', 'SSRF defense', 'command injection', 'CI/CD security review checklist'],
      prerequisites: ['ch08', 'ch13', 'ch18'],
      qaStatus: 'verified',
      summary: 'Đóng kín mọi lỗ hổng rò rỉ credential: che giấu secret khỏi lệnh ps, phân quyền file .netrc, chống tấn công SSRF và bảng checklist review an toàn.'
    },
    {
      id: 'ch20',
      order: 20,
      levelId: 'level-3',
      levelName: 'Chuyên sâu',
      number: 'Chương 20',
      title: 'Hệ Sinh Thái cURL: libcurl Bindings, Docker, Code Generation & Công Cụ Bổ Trợ',
      shortTitle: 'Hệ sinh thái, Bindings & Tools',
      durationMinutes: 30,
      curlMinVersion: '7.50.0',
      keywords: ['libcurl', 'pycurl', 'docker alpine certs', 'curl to code', 'postman import', 'k6 wrk grpcurl websocat'],
      prerequisites: ['ch01', 'ch18', 'ch19'],
      qaStatus: 'verified',
      summary: 'Cách libcurl vận hành trong Python/Go/Node, kỹ thuật build cURL tối ưu trong Docker container, và khi nào nên chuyển sang k6 hay grpcurl.'
    },

    // === PHỤ LỤC TRA CỨU ===
    {
      id: 'app-a',
      order: 21,
      levelId: 'level-appendix',
      levelName: 'Tra cứu',
      number: 'Phụ lục A',
      title: 'Bảng Tra Cứu Toàn Bộ Option cURL Phân Loại Theo Nhóm & Phiên Bản',
      shortTitle: 'Bảng tra cứu Option & Version',
      durationMinutes: 20,
      curlMinVersion: '7.0.0',
      keywords: ['option matrix', 'tra cứu flag', 'phiên bản tối thiểu cURL', 'cờ nguy hiểm'],
      prerequisites: [],
      qaStatus: 'verified',
      summary: 'Cẩm nang tra cứu tức thì toàn bộ cờ option của cURL theo từng nhóm tính năng kèm badge phiên bản tối thiểu.'
    },
    {
      id: 'app-b',
      order: 22,
      levelId: 'level-appendix',
      levelName: 'Tra cứu',
      number: 'Phụ lục B',
      title: 'Bảng Mã Trạng Thái HTTP (Status Codes) & Ý Nghĩa Đối Với cURL',
      shortTitle: 'Bảng mã HTTP Status Codes',
      durationMinutes: 15,
      curlMinVersion: '7.0.0',
      keywords: ['http status 200', '301 vs 302', '401 vs 403', '429 rate limit', '500 502 503'],
      prerequisites: [],
      qaStatus: 'verified',
      summary: 'Phân loại chi tiết các mã phản hồi HTTP 1xx, 2xx, 3xx, 4xx, 5xx và cách cURL xử lý từng mã.'
    },
    {
      id: 'app-c',
      order: 23,
      levelId: 'level-appendix',
      levelName: 'Tra cứu',
      number: 'Phụ lục C',
      title: 'Bảng Mã Thoát cURL (Exit Codes 1-99) & Cách Bắt Lỗi Trong Script',
      shortTitle: 'Bảng cURL Exit Codes',
      durationMinutes: 20,
      curlMinVersion: '7.0.0',
      keywords: ['exit code 0', 'exit code 6 dns', 'exit code 28 timeout', 'exit code 35 60 ssl', 'exit code 22 fail'],
      prerequisites: [],
      qaStatus: 'verified',
      summary: 'Giải mã toàn bộ mã lỗi trả về của chương trình curl.exe và cách viết cấu trúc switch-case bắt lỗi trong shell script.'
    },
    {
      id: 'app-d',
      order: 24,
      levelId: 'level-appendix',
      levelName: 'Tra cứu',
      number: 'Phụ lục D',
      title: 'Cẩm Nang Quoting & Escaping Đa Shell: Bash vs PowerShell vs Windows CMD',
      shortTitle: 'Cẩm nang Quoting Đa Shell',
      durationMinutes: 25,
      curlMinVersion: '7.0.0',
      keywords: ['bash quotes', 'powershell backtick', 'cmd caret ^', 'json escaping', 'line continuation'],
      prerequisites: [],
      qaStatus: 'verified',
      summary: 'Bảng tổng hợp chi tiết quy tắc dấu nháy đơn, nháy kép, ký tự xuống dòng và biến môi trường trên 3 shell phổ biến nhất.'
    },
    {
      id: 'app-e',
      order: 25,
      levelId: 'level-appendix',
      levelName: 'Tra cứu',
      number: 'Phụ lục E',
      title: 'Bảng Ma Trận Tính Năng cURL (Feature Matrix & Protocols Flag)',
      shortTitle: 'Feature Matrix & Protocols',
      durationMinutes: 15,
      curlMinVersion: '7.0.0',
      keywords: ['curl -V features', 'AsynchDNS', 'HSTS', 'HTTP2', 'HTTP3', 'UnixSockets', 'brotli zstd'],
      prerequisites: ['ch01', 'ch07', 'ch08', 'ch18', 'ch20'],
      qaStatus: 'verified',
      summary: 'Giải mã toàn diện từng cờ trong dòng Features và Protocols của lệnh curl -V, đối chiếu các bản build cURL trên Windows vs Linux, và kỹ thuật Feature Detection trong script tự động hóa.'
    },
    {
      id: 'app-f',
      order: 26,
      levelId: 'level-appendix',
      levelName: 'Tra cứu',
      number: 'Phụ lục F',
      title: 'Bảng Thuật Ngữ Chuẩn Hóa cURL & Mạng Máy Tính (Glossary)',
      shortTitle: 'Từ điển Thuật ngữ Glossary',
      durationMinutes: 20,
      curlMinVersion: '7.0.0',
      keywords: ['glossary', 'thuật ngữ curl', 'idempotent', 'mtls', 'doh', 'ttfb', 'chunked transfer', 'alpn', 'sni', 'keep-alive', 'head-of-line blocking'],
      prerequisites: ['ch01', 'ch07', 'ch08', 'ch13', 'ch14'],
      qaStatus: 'verified',
      summary: 'Cẩm nang tra cứu và giải mã hơn 50 thuật ngữ kỹ thuật cốt lõi về HTTP, TCP/IP, TLS/PKI, cURL Engine và Hệ thống phân tán, gắn liền với cờ lệnh và kịch bản thực tế.'
    },
    {
      id: 'app-g',
      order: 27,
      levelId: 'level-appendix',
      levelName: 'Tra cứu',
      number: 'Phụ lục G',
      title: 'Sổ Tay Troubleshooting & Những Lỗi Hay Gặp Khi Chạy cURL',
      shortTitle: 'Troubleshooting & FAQ',
      durationMinutes: 25,
      curlMinVersion: '7.0.0',
      keywords: ['troubleshooting', 'lỗi ssl certificate', 'lỗi quote powershell', 'lỗi curl invoke-webrequest', 'faq', 'exit code 6', 'exit code 28', 'exit code 35', 'exit code 60', 'cây quyết định'],
      prerequisites: ['ch01', 'ch02', 'ch07', 'app-c', 'app-d'],
      qaStatus: 'verified',
      summary: 'Sổ tay chẩn đoán sự cố mạng, giải mã các mã lỗi kinh điển (Exit Code 6, 28, 35, 52, 60), cây quyết định (Decision Tree) khoanh vùng nguyên nhân và 15 câu hỏi FAQ thực chiến nhất.'
    }
  ];

  /**
   * Helper tra cứu chương theo ID
   * @param {string} id
   * @returns {object|null}
   */
  function getChapterById(id) {
    if (!id) return null;
    for (var i = 0; i < CURL_CHAPTERS.length; i++) {
      if (CURL_CHAPTERS[i].id === id) {
        return CURL_CHAPTERS[i];
      }
    }
    return null;
  }

  /**
   * Lấy danh sách toàn bộ bài học phẳng
   */
  function getFlatChapters() {
    return CURL_CHAPTERS.slice();
  }

  // Đưa vào global scope cho trình duyệt thuần
  if (typeof window !== 'undefined') {
    window.CURL_CURRICULUM = {
      META: CURL_COURSE_META,
      LEVELS: CURL_LEVELS,
      CHAPTERS: CURL_CHAPTERS,
      getChapterById: getChapterById,
      getFlatChapters: getFlatChapters
    };
  }

  // Hỗ trợ Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      META: CURL_COURSE_META,
      LEVELS: CURL_LEVELS,
      CHAPTERS: CURL_CHAPTERS,
      getChapterById: getChapterById,
      getFlatChapters: getFlatChapters
    };
  }
})();
