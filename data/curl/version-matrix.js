/**
 * Bảng tra cứu phiên bản tối thiểu cURL (data/curl/version-matrix.js)
 * Cung cấp thông tin phiên bản phát hành, giao thức, tính năng hỗ trợ,
 * và cảnh báo rủi ro an toàn cho từng flag cURL từ 7.50 trở đi.
 */

(function () {
  'use strict';

  var VERSION_MATRIX = {
    // 1. Dữ liệu và Body flags
    '--json': {
      minVersion: '7.82.0',
      releaseDate: '2022-03-05',
      category: 'Data & Body',
      description: 'Gửi chuỗi JSON hoặc file JSON với tự động thêm Content-Type: application/json và Accept: application/json',
      syntax: '--json <data|@filename>',
      safeNote: 'Tránh dùng nếu chuỗi JSON chứa biến môi trường chưa được escape chuẩn.',
      docsUrl: 'https://curl.se/docs/manpage.html#--json'
    },
    '--url-query': {
      minVersion: '7.76.0',
      releaseDate: '2021-03-31',
      category: 'Data & Body',
      description: 'Nối tham số query string vào URL một cách an toàn và tự động URL-encode ký tự đặc biệt',
      syntax: '--url-query <data|@filename|name=content>',
      docsUrl: 'https://curl.se/docs/manpage.html#--url-query'
    },
    '--data-raw': {
      minVersion: '7.43.0',
      releaseDate: '2015-06-17',
      category: 'Data & Body',
      description: 'Gửi dữ liệu POST thô mà không thông dịch ký tự @ thành đường dẫn file (an toàn hơn -d)',
      syntax: '--data-raw <data>',
      safeNote: 'Khuyến nghị dùng thay -d khi truyền chuỗi bắt đầu bằng ký tự @.',
      docsUrl: 'https://curl.se/docs/manpage.html#--data-raw'
    },
    '--data-urlencode': {
      minVersion: '7.18.0',
      releaseDate: '2008-01-28',
      category: 'Data & Body',
      description: 'Tự động mã hóa URL các tham số form-urlencoded (name=value hoặc @filename)',
      syntax: '--data-urlencode <data>',
      docsUrl: 'https://curl.se/docs/manpage.html#--data-urlencode'
    },

    // 1b. Authentication & Tokens
    '--oauth2-bearer': {
      minVersion: '7.33.0',
      releaseDate: '2013-10-14',
      category: 'Authentication',
      description: 'Chỉ định Bearer token xác thực OAuth 2.0 (tự động gắn Authorization: Bearer <token>)',
      syntax: '--oauth2-bearer <token>',
      safeNote: 'Tránh gõ trực tiếp token nhạy cảm trên terminal máy chủ dùng chung.',
      docsUrl: 'https://curl.se/docs/manpage.html#--oauth2-bearer'
    },
    '--netrc-file': {
      minVersion: '7.21.5',
      releaseDate: '2011-03-23',
      category: 'Authentication',
      description: 'Chỉ định file .netrc tùy chỉnh chứa thông tin đăng nhập tự động',
      syntax: '--netrc-file <filename>',
      safeNote: 'File credentials cần được phân quyền bảo mật chmod 600.',
      docsUrl: 'https://curl.se/docs/manpage.html#--netrc-file'
    },

    // 2. Retry & Xử lý lỗi
    '--fail-with-body': {
      minVersion: '7.76.0',
      releaseDate: '2021-03-31',
      category: 'Error & Retry',
      description: 'Thoát với mã lỗi (exit code 22) khi HTTP status >= 400 nhưng VẪN in body trả về (khắc phục nhược điểm của -f)',
      syntax: '--fail-with-body',
      safeNote: 'Thiết yếu cho CI/CD khi cần cả exit code báo lỗi lẫn chi tiết thông báo lỗi từ API server.',
      docsUrl: 'https://curl.se/docs/manpage.html#--fail-with-body'
    },
    '--retry-all-errors': {
      minVersion: '7.71.0',
      releaseDate: '2020-06-24',
      category: 'Error & Retry',
      description: 'Thử lại cả khi gặp lỗi mạng lẫn lỗi HTTP 5xx (mặc định --retry chỉ thử lại với lỗi tạm thời: timeout, connect fail, 503...)',
      syntax: '--retry-all-errors',
      safeNote: 'Chỉ nên dùng cho request Idempotent (GET, PUT, DELETE). Nguy hiểm nếu áp dụng cho POST thanh toán.',
      docsUrl: 'https://curl.se/docs/manpage.html#--retry-all-errors'
    },
    '--retry-connrefused': {
      minVersion: '7.52.0',
      releaseDate: '2016-11-30',
      category: 'Error & Retry',
      description: 'Coi lỗi Connection Refused (ECONNREFUSED) là lỗi tạm thời để kích hoạt cơ chế retry',
      syntax: '--retry-connrefused',
      docsUrl: 'https://curl.se/docs/manpage.html#--retry-connrefused'
    },

    // 2b. Redirect & Timeout
    '--connect-timeout': {
      minVersion: '7.7.0',
      releaseDate: '2001-03-22',
      category: 'Redirect & Timeout',
      description: 'Giới hạn thời gian tối đa (giây) cho giai đoạn kết nối ban đầu (DNS, TCP, TLS)',
      syntax: '--connect-timeout <seconds>',
      safeNote: 'Thiết yếu cho CI/CD và Microservices để fail-fast khi máy chủ gặp sự cố mạng.',
      docsUrl: 'https://curl.se/docs/manpage.html#--connect-timeout'
    },
    '--max-redirs': {
      minVersion: '7.5.0',
      releaseDate: '2000-11-21',
      category: 'Redirect & Timeout',
      description: 'Giới hạn số lần chuyển hướng HTTP tối đa mà cURL được phép theo dõi (mặc định 50)',
      syntax: '--max-redirs <num>',
      safeNote: 'Chống kẹt tiến trình do vòng lặp chuyển hướng vô tận (Infinite Redirect Loop).',
      docsUrl: 'https://curl.se/docs/manpage.html#--max-redirs'
    },

    // 3. Caching & Tối ưu hóa
    '--etag-save': {
      minVersion: '7.68.0',
      releaseDate: '2020-01-08',
      category: 'Caching',
      description: 'Lưu ETag header nhận được từ response vào một file xác định',
      syntax: '--etag-save <file>',
      docsUrl: 'https://curl.se/docs/manpage.html#--etag-save'
    },
    '--etag-compare': {
      minVersion: '7.68.0',
      releaseDate: '2020-01-08',
      category: 'Caching',
      description: 'Đọc ETag từ file và tự động gửi kèm If-None-Match trong request kế tiếp (nhận về 304 nếu không đổi)',
      syntax: '--etag-compare <file>',
      docsUrl: 'https://curl.se/docs/manpage.html#--etag-compare'
    },
    '--compressed': {
      minVersion: '7.10.0',
      releaseDate: '2002-10-01',
      category: 'Caching & Transport',
      description: 'Yêu cầu nén response (gzip, deflate, br, zstd) và tự động giải nén trong suốt',
      syntax: '--compressed',
      docsUrl: 'https://curl.se/docs/manpage.html#--compressed'
    },

    // 4. Output, File & Directory
    '--output-dir': {
      minVersion: '7.73.0',
      releaseDate: '2020-10-14',
      category: 'Output & File',
      description: 'Chỉ định thư mục gốc lưu các file output (hữu ích khi tải nhiều URL cùng lúc)',
      syntax: '--output-dir <dir>',
      docsUrl: 'https://curl.se/docs/manpage.html#--output-dir'
    },
    '--create-dirs': {
      minVersion: '7.10.3',
      releaseDate: '2003-01-14',
      category: 'Output & File',
      description: 'Tự động tạo các thư mục cha cục bộ cần thiết khi lưu file bằng -o',
      syntax: '--create-dirs',
      docsUrl: 'https://curl.se/docs/manpage.html#--create-dirs'
    },
    '--parallel': {
      minVersion: '7.66.0',
      releaseDate: '2019-09-11',
      category: 'Concurrency',
      description: 'Tải song song nhiều URL thay vì xử lý tuần tự (kết hợp với --parallel-max)',
      syntax: '-Z, --parallel [--parallel-max <num>]',
      docsUrl: 'https://curl.se/docs/manpage.html#--parallel'
    },

    // 5. Diagnostics, Trace & Profiling
    '--trace-config': {
      minVersion: '8.3.0',
      releaseDate: '2023-09-13',
      category: 'Diagnostics',
      description: 'Cấu hình chi tiết các thành phần cần trace (ids, time, ssl, http/2, http/3)',
      syntax: '--trace-config <string>',
      docsUrl: 'https://curl.se/docs/manpage.html#--trace-config'
    },
    '--trace-time': {
      minVersion: '7.11.2',
      releaseDate: '2004-04-22',
      category: 'Diagnostics',
      description: 'Thêm dấu mốc thời gian (timestamp microsecond) vào từng dòng trace và verbose log',
      syntax: '--trace-time',
      docsUrl: 'https://curl.se/docs/manpage.html#--trace-time'
    },
    '--write-out': {
      minVersion: '7.6.1',
      releaseDate: '2000-03-29',
      category: 'Diagnostics',
      description: 'Xuất thông tin định dạng sau khi hoàn thành chuyển dữ liệu (hỗ trợ biến %{http_code}, %{time_total}, v.v.)',
      syntax: '-w, --write-out <format>',
      docsUrl: 'https://curl.se/docs/manpage.html#--write-out'
    },

    // 6. Network, DNS & Giao thức
    '--doh-url': {
      minVersion: '7.62.0',
      releaseDate: '2018-10-31',
      category: 'Network & DNS',
      description: 'Phân giải tên miền qua giao thức DNS over HTTPS (DoH) thay vì DNS truyền thống',
      syntax: '--doh-url <url>',
      docsUrl: 'https://curl.se/docs/manpage.html#--doh-url'
    },
    '--http3': {
      minVersion: '7.66.0',
      releaseDate: '2019-09-11',
      category: 'Network & Protocols',
      description: 'Kích hoạt giao thức HTTP/3 qua UDP/QUIC (yêu cầu build cURL có feature HTTP3)',
      syntax: '--http3, --http3-only',
      docsUrl: 'https://curl.se/docs/manpage.html#--http3'
    },
    '--resolve': {
      minVersion: '7.21.3',
      releaseDate: '2010-12-15',
      category: 'Network & DNS',
      description: 'Chỉ định ánh xạ địa chỉ IP tùy chỉnh cho host và port mà không cần sửa file hosts hệ thống',
      syntax: '--resolve <host:port:address[,address]...>',
      docsUrl: 'https://curl.se/docs/manpage.html#--resolve'
    },
    '--unix-socket': {
      minVersion: '7.40.0',
      releaseDate: '2015-01-08',
      category: 'Network & Sockets',
      description: 'Kết nối qua Unix domain socket thay vì TCP/IP (dùng kiểm tra Docker daemon, Nginx local)',
      syntax: '--unix-socket <path>',
      docsUrl: 'https://curl.se/docs/manpage.html#--unix-socket'
    },

    // 7. Bảo mật & Cờ Nguy Hiểm
    '--insecure': {
      minVersion: '7.10.0',
      releaseDate: '2002-10-01',
      category: 'Security Warning',
      description: 'Bỏ qua toàn bộ bước xác thực chứng chỉ TLS/SSL của máy chủ',
      syntax: '-k, --insecure',
      isDangerous: true,
      riskLevel: 'CRITICAL',
      safeNote: 'CẤM DÙNG TRÊN PRODUCTION. Cho phép tấn công Man-in-the-Middle (MitM) đánh cắp toàn bộ dữ liệu và token.',
      docsUrl: 'https://curl.se/docs/manpage.html#--insecure'
    },
    '--location-trusted': {
      minVersion: '7.10.4',
      releaseDate: '2003-03-31',
      category: 'Security Warning',
      description: 'Tiếp tục gửi username/password hoặc Authorization header sang host mới khi bị redirect',
      syntax: '--location-trusted',
      isDangerous: true,
      riskLevel: 'CRITICAL',
      safeNote: 'RỦI RO RÒ RỈ SECRET: Nếu redirect dẫn tới domain của bên thứ ba, token sẽ bị lộ hoàn toàn.',
      docsUrl: 'https://curl.se/docs/manpage.html#--location-trusted'
    }
  };

  /**
   * Tra cứu thông tin option
   * @param {string} flag
   * @returns {object|null}
   */
  function getOptionInfo(flag) {
    if (!flag) return null;
    var cleanFlag = flag.trim().split(/[ =]/)[0];
    return VERSION_MATRIX[cleanFlag] || null;
  }

  // Xuất ra global scope cho môi trường browser thuần
  if (typeof window !== 'undefined') {
    window.CURL_VERSION_MATRIX = VERSION_MATRIX;
    window.CURL_VERSION_MATRIX_API = {
      getOptionInfo: getOptionInfo,
      allOptions: Object.keys(VERSION_MATRIX)
    };
  }

  // Hỗ trợ ESM / Node.js test runner
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      VERSION_MATRIX: VERSION_MATRIX,
      getOptionInfo: getOptionInfo
    };
  }
})();
