export default {
  id: 'lp-c5-10',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.10',
  title: 'Hệ đếm Hex, Octal, Binary: Hằng số, Chuyển đổi & Định dạng',
  subtitle: 'Biểu diễn và chuyển đổi qua lại giữa cơ số 10, 16, 8, 2 bằng oct, hex, bin, int(s, base) và f-string',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Biết cách viết các hằng số bằng chữ ở hệ thập lục phân (0x), bát phân (0o) và nhị phân (0b).',
    'Sử dụng các hàm dựng sẵn oct(), hex(), bin() để chuyển đổi số nguyên sang chuỗi biểu diễn cơ số.',
    'Sử dụng hàm int(chuỗi, cơ_số) để chuyển đổi chuỗi ngược lại thành số nguyên thập phân.',
    'Làm chủ 3 kỹ thuật định dạng chuỗi (%o/%x, format, f-string) với ký tự điều khiển #X.',
    'Nhận diện rủi ro bảo mật nghiêm trọng khi sử dụng hàm eval() để phân tích số liệu.'
  ],

  intuition: {
    title: 'Những chiếc áo đa sắc màu của cùng một số nguyên',
    metaphor: 'Trong thế giới máy tính, con người quen dùng hệ 10 vì có 10 ngón tay; phần cứng mạch điện chỉ hiểu hệ 2 (bật/tắt); còn các kỹ sư hệ thống thích dùng hệ 16 (hex) vì mỗi chữ số hex gom gọn gàng đúng 4 bit nhị phân (1 byte = đúng 2 chữ số hex). Cho dù bạn mặc chiếc áo nào cho số 64 (0x40, 0o100 hay 0b1000000), trong bộ nhớ RAM nó vẫn là một thực thể số nguyên duy nhất. Các hàm oct, hex, bin và int giống như những người thợ may chuyên nghiệp, giúp bạn thay đổi chiếc áo bên ngoài theo nhu cầu giao tiếp.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHU TRÌNH CHUYỂN ĐỔI CƠ SỐ QUA LẠI TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">SỐ NGUYÊN (INT)</div>
            <div style="font-weight:700;color:var(--accent-primary);font-size:1.1rem;">64</div>
          </div>
          <div style="text-align:center;font-size:0.8rem;color:var(--text-secondary);">
            <div>hex(64) ➔ '0x40'</div>
            <div>oct(64) ➔ '0o100'</div>
            <div>bin(64) ➔ '0b1000000'</div>
            <div style="margin-top:4px;color:var(--success);">◄── int(str, base) ──</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">CHUỖI KÝ HIỆU (STR)</div>
            <div style="font-weight:700;color:var(--success);font-size:0.9rem;">'0x40', '0o100', '0b1000000'</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Biểu diễn Hằng số Số nguyên ở các Cơ số Khác',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 16 / 38 – Trang 18 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Số nguyên trong Python có thể được viết bằng ký hiệu thập lục phân (cơ số 16), bát phân (cơ số 8) và nhị phân (cơ số 2), bên cạnh cách viết thập phân cơ số 10 thông thường:</p>
      `,
      codeExamples: [
        {
          title: 'Các hằng số bằng chữ ở hệ bát phân, hex và nhị phân',
          code: `>>> 0o1, 0o20, 0o377                  # Hằng số bằng chữ bát phân (octal)
(1, 16, 255)
>>> 0x01, 0x10, 0xFF                  # Hằng số bằng chữ thập lục phân (hex)
(1, 16, 255)
>>> 0b1, 0b10000, 0b11111111          # Hằng số bằng chữ nhị phân (binary)
(1, 16, 255)`,
          output: `(1, 16, 255)
(1, 16, 255)
(1, 16, 255)`,
          annotations: [
            { line: 1, text: 'Tiền tố 0o cho bát phân: 0o377 = 3*64 + 7*8 + 7 = 255.' },
            { line: 3, text: 'Tiền tố 0x cho hex: 0xFF = 15*16 + 15 = 255.' },
            { line: 5, text: 'Tiền tố 0b cho nhị phân: 8 bit 1 liên tiếp = 255.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Các Hàm Chuyển đổi: oct, hex, bin và int(str, base)',
      content: `
        <p>Để chuyển đổi một số nguyên thành chuỗi biểu diễn của nó ở các cơ số này, Python cung cấp các hàm dựng sẵn <strong><code>oct()</code></strong>, <strong><code>hex()</code></strong> và <strong><code>bin()</code></strong>:</p>
        <pre class="code-block"><code>>>> oct(64), hex(64), bin(64)
('0o100', '0x40', '0b1000000')</code></pre>
        <p>Để làm điều ngược lại—chuyển đổi các chuỗi chữ số ở các cơ số khác thành số nguyên—hàm dựng sẵn <strong><code>int()</code></strong> chấp nhận một đối số thứ hai tùy chọn chỉ định cơ số (ví dụ: <code>2</code>, <code>8</code>, <code>16</code>). Hàm này cũng tự động nhận diện tiền tố cơ số nếu có:</p>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi chuỗi sang số nguyên bằng int(s, base)',
          code: `>>> int('64'), int('100', 8), int('40', 16), int('1000000', 2)
(64, 64, 64, 64)
>>> int('0x40', 16), int('0b1000000', 2)   # Chấp nhận chuỗi có tiền tố cơ số
(64, 64)`,
          output: `(64, 64, 64, 64)
(64, 64)`,
          annotations: [
            { line: 1, text: 'int("100", 8) phân tích chuỗi "100" ở cơ số 8 thành 64 thập phân.' },
            { line: 3, text: 'Hàm int() xử lý mượt mà chuỗi chứa cả tiền tố 0x hay 0b.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Định dạng Chuỗi Cơ số và Hỗ trợ Số nguyên Lớn Tùy ý',
      content: `
        <p>Các công cụ định dạng chuỗi có thể định dạng số nguyên thành các chuỗi bát phân, thập lục phân và nhị phân một cách linh hoạt:</p>
        <ul>
          <li>Toán tử <code>%</code>: <code>%o</code> (bát phân), <code>%x</code> (hex thường), <code>%#X</code> (thêm tiền tố <code>0X</code> và in hoa).</li>
          <li>Phương thức <code>str.format()</code>: <code>{:o}</code>, <code>{:b}</code>, <code>{:x}</code>, <code>{:#X}</code>.</li>
          <li>Cú pháp <code>f-string</code> hiện đại: <code>f'{64:o}, {64:b}, {255:x}, {255:#X}'</code>.</li>
        </ul>
        <p>Trước khi kết thúc phần này, hãy nhớ rằng các hằng số bằng chữ ở cơ số khác và các hàm chuyển đổi cũng <strong>hỗ trợ các số nguyên lớn tùy ý (bignum)</strong>:</p>
      `,
      codeExamples: [
        {
          title: 'Định dạng chuỗi cơ số và số nguyên hex khổng lồ',
          code: `>>> f'{64:o}, {64:b}, {255:x}, {255:#X}'
'100, 1000000, ff, 0XFF'
>>> X = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF
>>> X
5192296858534827628530496329220095
>>> oct(X)
'0o17777777777777777777777777777777777777'`,
          output: `'100, 1000000, ff, 0XFF'
5192296858534827628530496329220095
'0o17777777777777777777777777777777777777'`,
          annotations: [
            { line: 1, text: 'Định dạng f-string kết xuất tức thì các cơ số đếm khác nhau.' },
            { line: 3, text: 'Hằng số hex cực lớn được lưu thành đối tượng số nguyên vô hạn 519229...' },
            { line: 6, text: 'oct(X) chuyển số nguyên lớn thành chuỗi bát phân trơn tru.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cảnh báo bảo mật: Tuyệt đối tránh dùng eval() để phân tích số liệu',
        content: `
          <p>Mặc dù <code>eval('0x40')</code> trả về <code>64</code>, nhưng hàm <code>eval()</code> thực thi chuỗi như một đoạn mã Python đầy đủ. Nếu người dùng nhập vào một chuỗi độc hại (như <code>eval("__import__('os').system('rmdir /s /q C:\\\\')")</code>), hệ thống của bạn sẽ bị xâm hại nghiêm trọng.</p>
          <p>Luôn sử dụng <strong><code>int(s, base)</code></strong> thay vì <code>eval()</code> khi cần chuyển đổi chuỗi sang số.</p>
        `
      }
    ]
  },

  exercises: [
    {
      title: 'Chuyển đổi địa chỉ MAC hoặc mã màu Hex sang số nguyên',
      level: 'Dễ',
      problem: 'Màu đỏ trong CSS được biểu diễn bằng mã hex <code>"FF0000"</code>. Hãy dùng hàm <code>int()</code> để chuyển mã màu này sang số nguyên hệ thập phân, sau đó dùng <code>hex()</code> để chuyển ngược lại.',
      hint: 'Dùng int("FF0000", 16).',
      solutionCode: `ma_mau_hex = "FF0000"
gia_tri_so = int(ma_mau_hex, 16)
chuyen_nguoc_lai = hex(gia_tri_so)

print("Giá trị số nguyên thập phân:", gia_tri_so)
print("Chuyển ngược lại sang hex:", chuyen_nguoc_lai)`,
      solutionOutput: `Giá trị số nguyên thập phân: 16711680
Chuyển ngược lại sang hex: 0xff0000`,
      explanation: '<code>int("FF0000", 16)</code> chuyển đổi chuỗi cơ số 16 thành số nguyên 16.711.680. Hàm <code>hex()</code> trả về chuỗi <code>0xff0000</code> kèm tiền tố 0x chuẩn.'
    }
  ],

  quiz: [
    {
      question: 'Hàm nào sau đây dùng để chuyển đổi chuỗi nhị phân "1101" thành số nguyên thập phân 13 trong Python?',
      options: [
        'bin("1101")',
        'int("1101", 2)',
        'str.to_int("1101", binary=True)',
        'float("1101", 2)'
      ],
      correctIndex: 1,
      explanation: 'Hàm int(chuỗi, cơ_số) với cơ số 2: int("1101", 2) phân tích chuỗi nhị phân thành số nguyên 13.'
    },
    {
      question: 'Trong cú pháp f-string, ký tự định dạng nào dùng để hiển thị một số nguyên dưới dạng chuỗi hex có tiền tố "0X" viết hoa?',
      options: [
        '{x:hex}',
        '{x:x}',
        '{x:#X}',
        '{x:base16}'
      ],
      correctIndex: 2,
      explanation: 'Ký tự # thêm tiền tố cơ số (0X hoặc 0x), và chữ X in hoa chỉ thị các chữ số A-F cùng chữ X được viết hoa (ví dụ: 0XFF).'
    }
  ],

  summary: [
    'Python hỗ trợ các tiền tố cơ số: 0x (hex cơ số 16), 0o (bát phân cơ số 8), 0b (nhị phân cơ số 2).',
    'Các hàm oct(), hex(), bin() chuyển đổi một số nguyên thành chuỗi biểu diễn có tiền tố tương ứng.',
    'Hàm int(chuỗi, base) chuyển đổi chuỗi ký tự ở bất kỳ cơ số nào thành số nguyên.',
    'Tránh xa hàm eval() vì nguy cơ bảo mật và suy giảm hiệu năng.',
    'Các công cụ định dạng chuỗi (%o/%x, f-string) hỗ trợ ký tự # để chủ động hiển thị tiền tố cơ số.'
  ]
};