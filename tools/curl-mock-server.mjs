/**
 * cURL Mock Server Cục Bộ (tools/curl-mock-server.mjs)
 * Server mock HTTP thuần Node.js (zero npm dependency), phục vụ việc
 * kiểm thử tự động (Cổng 7) và chạy sandbox Playground an toàn không phụ thuộc mạng ngoài.
 *
 * Cách chạy độc lập:
 *   node tools/curl-mock-server.mjs
 */

import http from 'node:http';
import zlib from 'node:zlib';

const PORT = 8789;
const HOST = '127.0.0.1';

function parseRequestBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      resolve({
        raw: buffer.toString('utf8'),
        buffer: buffer,
        length: buffer.length
      });
    });
  });
}

const server = http.createServer(async (req, res) => {
  // Bật CORS cho Playground trình duyệt
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Expose-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlObj = new URL(req.url, `http://${HOST}:${PORT}`);
  const pathname = urlObj.pathname;
  const searchParams = Object.fromEntries(urlObj.searchParams.entries());

  const bodyData = await parseRequestBody(req);

  // 1. Endpoint /ping hoặc /
  if (pathname === '/' || pathname === '/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', server: 'cURL-Mock-Server-v1', port: PORT }));
    return;
  }

  // 2. Endpoint Echo (/echo, /get, /post, /put, /patch, /delete)
  if (pathname === '/echo' || ['/get', '/post', '/put', '/patch', '/delete'].includes(pathname)) {
    let parsedJson = null;
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      try {
        parsedJson = JSON.parse(bodyData.raw);
      } catch (_e) {
        parsedJson = null;
      }
    }

    const payload = {
      method: req.method,
      path: pathname,
      query: searchParams,
      headers: req.headers,
      bodyRaw: bodyData.raw,
      bodyJson: parsedJson,
      bodyLength: bodyData.length,
      timestamp: new Date().toISOString()
    };

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'X-Mock-Server': 'curl-verifier',
      'X-Request-Method': req.method
    });
    res.end(JSON.stringify(payload, null, 2));
    return;
  }

  // 3. Endpoint Mô phỏng HTTP Status Code (/status/:code)
  const statusMatch = pathname.match(/^\/status\/(\d{3})$/);
  if (statusMatch) {
    const code = parseInt(statusMatch[1], 10);
    res.writeHead(code, {
      'Content-Type': 'application/json',
      'X-Simulated-Status': String(code)
    });
    res.end(JSON.stringify({
      code: code,
      message: `Simulated HTTP status ${code}`,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 4. Basic Authentication (/basic-auth/:user/:passwd)
  const basicAuthMatch = pathname.match(/^\/basic-auth\/([^/]+)\/([^/]+)$/);
  if (basicAuthMatch) {
    const expectedUser = decodeURIComponent(basicAuthMatch[1]);
    const expectedPass = decodeURIComponent(basicAuthMatch[2]);
    const authHeader = req.headers['authorization'] || '';

    if (authHeader.startsWith('Basic ')) {
      const b64 = authHeader.slice(6);
      const decoded = Buffer.from(b64, 'base64').toString('utf8');
      const [u, p] = decoded.split(':');
      if (u === expectedUser && p === expectedPass) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ authenticated: true, user: u }));
        return;
      }
    }

    res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm="Mock Realm"',
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({ authenticated: false, error: 'Unauthorized credentials' }));
    return;
  }

  // 5. Bearer Token (/bearer)
  if (pathname === '/bearer') {
    const authHeader = req.headers['authorization'] || '';
    if (authHeader.startsWith('Bearer ') && authHeader.slice(7).trim().length > 0) {
      const token = authHeader.slice(7).trim();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ authenticated: true, tokenPrefix: token.slice(0, 4) + '...' }));
      return;
    }
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ authenticated: false, error: 'Missing or invalid Bearer token' }));
    return;
  }

  // 6. ETag & Caching (/cache)
  if (pathname === '/cache') {
    const eTagValue = '"v1.4.2-mock-hash"';
    const lastModifiedValue = 'Tue, 01 Nov 2026 12:00:00 GMT';

    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch === eTagValue) {
      res.writeHead(304, {
        'ETag': eTagValue,
        'Last-Modified': lastModifiedValue
      });
      res.end();
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'ETag': eTagValue,
      'Last-Modified': lastModifiedValue,
      'Cache-Control': 'public, max-age=3600'
    });
    res.end(JSON.stringify({ data: 'Fresh Cache Payload', eTag: eTagValue }));
    return;
  }

  // 7. Chuyển hướng Redirect (/redirect/:count)
  const redirMatch = pathname.match(/^\/redirect\/(\d+)$/);
  if (redirMatch) {
    const count = parseInt(redirMatch[1], 10);
    if (count <= 1) {
      res.writeHead(302, { 'Location': '/echo?redirected=true' });
      res.end();
    } else {
      res.writeHead(302, { 'Location': `/redirect/${count - 1}` });
      res.end();
    }
    return;
  }

  // 8. Rate Limiting 429 (/rate-limit)
  if (pathname === '/rate-limit') {
    res.writeHead(429, {
      'Content-Type': 'application/json',
      'Retry-After': '5'
    });
    res.end(JSON.stringify({
      error: 'Too Many Requests',
      retryAfterSeconds: 5
    }));
    return;
  }

  // 9. Nén Gzip (/gzip)
  if (pathname === '/gzip') {
    const rawContent = JSON.stringify({ message: 'This is a compressed payload with gzip', size: 1024 });
    zlib.gzip(Buffer.from(rawContent), (_err, gzipped) => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Encoding': 'gzip'
      });
      res.end(gzipped);
    });
    return;
  }

  // 10. Streaming SSE (/stream)
  if (pathname === '/stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    let count = 0;
    const interval = setInterval(() => {
      count++;
      res.write(`data: ${JSON.stringify({ event: 'ping', count: count })}\n\n`);
      if (count >= 3) {
        clearInterval(interval);
        res.end();
      }
    }, 200);
    return;
  }

  // 11. Download File với Range Header & Resume (/download/sample.txt)
  if (pathname === '/download/sample.txt') {
    const fullText = 'cURL File Transfer & Streaming Mastery 2026 - Chunk 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const totalSize = Buffer.byteLength(fullText, 'utf8');
    const rangeHeader = req.headers['range'];

    if (rangeHeader && rangeHeader.startsWith('bytes=')) {
      const parts = rangeHeader.slice(6).split('-');
      const start = parseInt(parts[0], 10) || 0;
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
      const chunk = Buffer.from(fullText, 'utf8').subarray(start, end + 1);

      res.writeHead(206, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Content-Length': chunk.length,
        'Accept-Ranges': 'bytes'
      });
      res.end(chunk);
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Length': totalSize,
      'Content-Disposition': 'attachment; filename="sample.txt"',
      'Accept-Ranges': 'bytes'
    });
    res.end(fullText);
    return;
  }

  // 12. Endpoint Cookie Session (/cookie/login & /cookie/profile)
  if (pathname === '/cookie/login') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': [
        'session_id=sess_cookie_998877; Path=/; HttpOnly',
        'theme=dark; Path=/; Max-Age=86400'
      ]
    });
    res.end(JSON.stringify({ loggedIn: true, user: 'alice', message: 'Session cookie issued' }));
    return;
  }

  if (pathname === '/cookie/profile') {
    const cookieHeader = req.headers['cookie'] || '';
    if (cookieHeader.includes('session_id=sess_cookie_998877')) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ authorized: true, user: 'alice', activeSession: true, cookieString: cookieHeader }));
      return;
    }
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ authorized: false, error: 'Missing or expired session cookie' }));
    return;
  }

  // 404 mặc định
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint Not Found', pathname: pathname }));
});

export function startMockServer(port = PORT) {
  return new Promise((resolve, reject) => {
    server.listen(port, HOST, () => {
      resolve(server);
    });
    server.on('error', reject);
  });
}

export function stopMockServer() {
  return new Promise((resolve) => {
    server.close(() => resolve());
  });
}

// Nếu gọi trực tiếp từ dòng lệnh
if (process.argv[1] && process.argv[1].endsWith('curl-mock-server.mjs')) {
  server.listen(PORT, HOST, () => {
    console.log(`[cURL Mock Server] Đang chạy tại http://${HOST}:${PORT}`);
    console.log(`  - Echo:       http://${HOST}:${PORT}/echo`);
    console.log(`  - Status 404: http://${HOST}:${PORT}/status/404`);
    console.log(`  - Basic Auth: http://${HOST}:${PORT}/basic-auth/admin/secret123`);
    console.log(`  - Cache ETag: http://${HOST}:${PORT}/cache`);
    console.log(`  - Rate limit: http://${HOST}:${PORT}/rate-limit`);
    console.log(`Nhấn Ctrl+C để dừng server.`);
  });
}
