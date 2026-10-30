import crypto from 'crypto';
import https from 'https';

const urls = [
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js'
];

for (const url of urls) {
  https.get(url, (res) => {
    const hash = crypto.createHash('sha384');
    res.on('data', (d) => hash.update(d));
    res.on('end', () => {
      console.log(url, 'sha384-' + hash.digest('base64'));
    });
  });
}
