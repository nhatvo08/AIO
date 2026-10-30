export default {
  id: 'lp-c7-02',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.2',
  title: 'Ký tự thoát (Escape Sequences), Bảng 7-2 & Cảnh báo Python 3.12+',
  subtitle: 'Mã hóa ký tự đặc biệt bằng dấu gạch chéo ngược, hàm len() vs số byte, Bảng 7-2, ký tự NULL và cảnh báo cú pháp SyntaxWarning mới',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên lý hoạt động của ký tự thoát (escape sequence) và cách dấu gạch chéo ngược (\\) mã hóa các ký tự đặc biệt.',
    'Phân biệt rõ ràng giữa độ dài ký tự do len() trả về và số lượng byte bộ nhớ (Khung chuyên đề: độ dài không phải số byte).',
    'Tra cứu và vận dụng thành thạo Bảng 7-2 gồm 18 chuỗi mã thoát chuẩn trong Python.',
    'Nắm vững bản chất ký tự NULL (\\0): không làm kết thúc chuỗi trong Python như ngôn ngữ C.',
    'Nhận biết các thay đổi cú pháp trong Python 3.12+: cảnh báo SyntaxWarning với mã thoát bát phân quá lớn và ký tự thoát không hợp lệ.'
  ],

  intuition: {
    title: 'Chiếc chìa khóa vạn năng và những mật mã vô hình',
    metaphor: 'Bàn phím máy tính thông thường chỉ có chừng hơn 100 phím bấm hữu hình, nhưng thế giới văn bản lại chứa hàng triệu ký tự: từ những thao tác điều khiển vô hình như xuống dòng (newline), thụt lề (tab), chuông báo (bell), đến hàng ngàn ký tự quốc tế và biểu tượng cảm xúc (emoji). Trong Python, dấu gạch chéo ngược (\\) đóng vai trò như một chiếc chìa khóa vạn năng. Khi đứng trước một chữ cái bình thường như \'n\' hay \'t\', nó lập tức tước đi nghĩa đen của chữ cái đó và biến nó thành một "mật mã điều khiển" vô hình. Hai ký tự gõ trên bàn phím (\\ và n) được nén lại thành đúng MỘT ký tự duy nhất trong bộ nhớ RAM.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ KÝ TỰ THOÁT: TỪ MÃ NGUỒN VÀO BỘ NHỚ RAM</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">GÕ TRONG MÃ NGUỒN (LITERAL)</div>
            <div style="font-weight:700;color:var(--warning);font-size:1.1rem;">'a\\nb\\tc'</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">7 ký tự vật lý khi gõ phím</div>
          </div>
          <div style="font-size:1.4rem;color:var(--accent-primary);text-align:center;">── biên dịch ──►</div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">LƯU TRONG BỘ NHỚ (RAM)</div>
            <div style="font-weight:700;color:var(--success);font-size:1.1rem;">['a', LF, 'b', TAB, 'c']</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;">Đúng 5 ký tự (len = 5)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Ký tự Thoát là các Ký tự Đặc biệt',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 5 / 52 – Trang 9 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Như chúng ta đã thấy, dấu gạch chéo ngược (<code>\\</code>) được dùng để giới thiệu các cách mã hóa ký tự đặc biệt được gọi là <strong>ký tự thoát (escape sequence)</strong>.</p>

        <p>Ký tự thoát cho phép chúng ta nhúng các ký tự vào chuỗi mà không thể dễ dàng chèn trực tiếp vào một hằng chuỗi hay gõ ra từ bàn phím. Ký tự <code>\\</code>, cùng với một hoặc nhiều ký tự theo sau nó trong hằng chuỗi, sẽ được <strong>thay thế bằng một ký tự đơn lẻ duy nhất trong đối tượng chuỗi kết quả</strong>, có giá trị được quy định bởi ký tự thoát đó.</p>

        <p>Ví dụ, hai ký tự <code>\\n</code> đại diện cho một ký tự đơn lẻ—ký tự dòng mới (newline / linefeed, code point 10 trong bảng mã ASCII và Unicode). Tương tự, <code>\\t</code> được thay thế bằng ký tự tab (code point 9). Phản hồi tương tác của REPL hiển thị các ký tự đặc biệt dưới dạng ký tự thoát (như <code>'a\\nb\\tc'</code>), nhưng hàm <code>print()</code> lại diễn giải và kết xuất chúng ra màn hình trực quan:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh hiển thị REPL và hàm print() với ký tự thoát',
          code: `s = 'a\\nb\\tc'

# REPL hiển thị dạng chuỗi mã (repr)
print("Dạng biểu diễn (repr):", repr(s))

# Hàm print() diễn giải các ký tự điều khiển
print("Kết quả in trực tiếp:")
print(s)

# Kiểm tra độ dài thực tế
print("len(s) =", len(s))`,
          output: `Dạng biểu diễn (repr): 'a\\nb\\tc'
Kết quả in trực tiếp:
a
b	c
len(s) = 5`,
          annotations: [
            { line: 1, text: 'Chuỗi khởi tạo có 7 ký tự khi gõ trong mã nguồn.' },
            { line: 4, text: 'Hàm repr() cho thấy \\n và \\t được bảo toàn dạng ký tự thoát.' },
            { line: 8, text: 'print(s) diễn giải \\n thành điểm ngắt dòng và \\t thành bước thụt lề tab.' },
            { line: 11, text: 'len(s) trả về 5: gồm \'a\', dòng mới (10), \'b\', tab (9), và \'c\'.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Khung Chuyên đề: Nhưng Độ dài Không phải là Số Byte',
      content: `
        <p>Nếu bạn đã quen với văn bản toàn bộ là ASCII, bạn sẽ rất dễ nghĩ rằng kết quả <code>len(s) = 5</code> này cũng đồng nghĩa với 5 byte, nhưng có lẽ bạn không nên nghĩ như vậy. Quả thực, khái niệm "byte" trong thế giới Unicode ngày nay không còn giữ nguyên ý nghĩa như nó từng có trước đây:</p>
        <ol>
          <li><strong>Dữ liệu quản trị bộ nhớ:</strong> Đối tượng chuỗi <code>str</code> của Python bao gồm dữ liệu tiêu đề (header) của CPython khiến nó chiếm dung lượng trong RAM lớn hơn nhiều so với phần văn bản đơn thuần (khoảng 48–80 byte cho tiêu đề đối tượng).</li>
          <li><strong>Code point vs Byte:</strong> Nội dung và độ dài của chuỗi phản ánh các <strong>code point (con số định danh)</strong> do Unicode gán. Một code point của một ký tự đơn lẻ không nhất thiết phải tương ứng với một byte duy nhất. Chẳng hạn, ký tự tiếng Đức <code>Ä</code> (<code>\\u00c4</code>), ký tự <code>Ā</code> (<code>\\u0100</code>), hay biểu tượng con rắn <code>\\U0001F40D</code> đòi hỏi từ 2 đến 4 byte trong bộ nhớ hoặc tệp tin.</li>
        </ol>

        <p>Trên thực tế, Python định nghĩa chính thức chuỗi <code>str</code> là <strong>các dãy tuần tự chứa các code point Unicode, chứ không phải byte</strong>. Hãy luôn nhớ: các ký tự gạch chéo ngược <code>\\</code> ban đầu không thực sự được lưu trữ trong bộ nhớ RAM; chúng chỉ là ký hiệu chỉ dẫn để Python tạo ra ký tự tương ứng.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Bảng 7-2: Các Ký tự Gạch chéo ngược trong Chuỗi',
      content: `
        <p>Để viết mã cho những ký tự đặc biệt, Python nhận diện một bộ đầy đủ các chuỗi mã thoát, được liệt kê chi tiết trong <strong>Bảng 7-2</strong>:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:25%;">Ký tự thoát (Escape)</th>
                <th style="padding:10px 12px;">Ý nghĩa (Meaning) &amp; Chi tiết sử dụng</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\\\</code></td>
                <td style="padding:8px 12px;">Dấu gạch chéo ngược nguyên nghĩa (lưu trữ một ký tự <code>\\</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\'</code></td>
                <td style="padding:8px 12px;">Dấu nháy đơn (lưu trữ ký tự <code>'</code> trong chuỗi nháy đơn)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\"</code></td>
                <td style="padding:8px 12px;">Dấu nháy kép (lưu trữ ký tự <code>"</code> trong chuỗi nháy kép)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\n</code></td>
                <td style="padding:8px 12px;">Dòng mới (newline / linefeed, code point 10)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\r</code></td>
                <td style="padding:8px 12px;">Về đầu dòng (carriage return, ví dụ Windows kết thúc dòng bằng <code>\\r\\n</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\t</code></td>
                <td style="padding:8px 12px;">Tab ngang (horizontal tab, code point 9)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\v</code></td>
                <td style="padding:8px 12px;">Tab dọc (vertical tab)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\a</code></td>
                <td style="padding:8px 12px;">Chuông báo (bell / alert, phát âm thanh nơi được hỗ trợ)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\b</code></td>
                <td style="padding:8px 12px;">Xóa lùi (backspace)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\f</code></td>
                <td style="padding:8px 12px;">Sang trang (formfeed)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\xhh</code></td>
                <td style="padding:8px 12px;">Giá trị byte hoặc code point thập lục phân (chính xác 2 chữ số hex <code>0-9, A-F</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\ooo</code></td>
                <td style="padding:8px 12px;">Giá trị byte hoặc code point bát phân (1 đến 3 chữ số bát phân <code>0-7</code>, trần là <code>\\377</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\0</code></td>
                <td style="padding:8px 12px;">Ký tự Null: ký tự nhị phân bát phân 0 (<strong>không kết thúc chuỗi</strong>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\uhhhh</code></td>
                <td style="padding:8px 12px;">Code point Unicode 16-bit (chính xác 4 chữ số hex, chỉ áp dụng cho <code>str</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\Uhhhhhhhh</code></td>
                <td style="padding:8px 12px;">Code point Unicode 32-bit (chính xác 8 chữ số hex, chỉ áp dụng cho <code>str</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\N{name}</code></td>
                <td style="padding:8px 12px;">Ký tự có tên định danh trong cơ sở dữ liệu chuẩn Unicode (ví dụ <code>\\N{SNAKE}</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>\\newline</code></td>
                <td style="padding:8px 12px;">Bị bỏ qua (dấu gạch chéo ngược đứng ngay trước một điểm ngắt dòng vật lý)</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><code>\\other</code></td>
                <td style="padding:8px 12px;">Giữ nguyên dạng chữ, nhưng phát cảnh báo trong Python 3.12, sẽ là lỗi tương lai</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-4',
      title: '4. Ký tự NULL (\\0) và Ký tự Không in được trong Python',
      content: `
        <p>Ký tự gắn liền với code point 0 thường được gọi là <strong>NULL (hoặc NUL)</strong>. Điều đặc biệt quan trọng là trong Python, <strong>ký tự NULL không kết thúc chuỗi theo cách mà "byte null" thường làm trong ngôn ngữ C</strong>.</p>

        <p>Trong C, chuỗi là một mảng ký tự kết thúc bằng byte <code>'\\0'</code>. Nếu một hàm trong C bắt gặp <code>'\\0'</code>, nó sẽ dừng đọc ngay lập tức và bỏ qua toàn bộ phần phía sau. Nhưng trong Python, đối tượng <code>str</code> lưu giữ độc lập cả độ dài (length) lẫn nội dung văn bản trong bộ nhớ. <strong>Không có bất kỳ ký tự nào có thể làm kết thúc sớm một chuỗi trong Python</strong>. Bạn hoàn toàn có thể nhúng các ký tự NULL vào giữa chuỗi:</p>
      `,
      codeExamples: [
        {
          title: 'Ký tự NULL không làm kết thúc chuỗi và hiển thị ký tự hex',
          code: `# Nhúng hai ký tự NULL vào giữa chuỗi
s = 'a\\0b\\0c'
print("REPL biểu diễn:", repr(s))
print("Độ dài:", len(s))

# Chuỗi chứa toàn bộ các mã thoát giá trị tuyệt đối không in được
raw_codes = '\\001\\002\\x03'
print("raw_codes repr:", repr(raw_codes))
print("Độ dài raw_codes:", len(raw_codes))

# Kết hợp ký tự chữ, tab, newline và hex 0x00
mixed = 'H\\tA\\nC\\x00K'
print("mixed repr:", repr(mixed))
print("len(mixed):", len(mixed))`,
          output: `REPL biểu diễn: 'a\\x00b\\x00c'
Độ dài: 5
raw_codes repr: '\\x01\\x02\\x03'
Độ dài raw_codes: 3
mixed repr: 'H\\tA\\nC\\x00K'
len(mixed): 7`,
          annotations: [
            { line: 2, text: '\'a\\0b\\0c\' chứa 5 ký tự: \'a\', null, \'b\', null, \'c\'.' },
            { line: 7, text: 'Python tự động hiển thị các ký tự không in được dưới dạng thập lục phân \\x01\\x02\\x03.' },
            { line: 12, text: 'Chuỗi mixed chứa 7 ký tự riêng biệt dù có chứa \\x00 ở giữa.' }
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      title: '5. Cảnh báo Cú pháp Mới trong Python 3.12+ (SyntaxWarning)',
      content: `
        <p>Có hai giới hạn quan trọng trong Bảng 7-2 mà Mark Lutz đặc biệt nhấn mạnh:</p>
        <ol>
          <li><strong>Ký tự thoát bát phân lớn hơn \\377:</strong> Kể từ Python 3.12, các mã thoát bát phân có giá trị quá lớn đối với 1 byte (như <code>'\\400'</code>) sẽ phát ra <code>SyntaxWarning: invalid octal escape sequence</code>, bất chấp việc chuỗi văn bản lưu trữ code point.</li>
          <li><strong>Ký tự thoát không hợp lệ (\\other):</strong> Suốt 30 năm qua, nếu Python bắt gặp ký tự không nằm trong danh mục thoát đứng sau dấu <code>\\</code> (ví dụ: <code>'C:\\py\\code'</code> với <code>\\p</code>), Python đơn thuần giữ lại dấu gạch chéo ngược. Tuy nhiên, kể từ Python 3.12, hành vi này chính thức bị coi là xấu và kích hoạt cảnh báo <code>SyntaxWarning: invalid escape sequence '\\p'</code>. Trong các phiên bản tương lai, điều này sẽ trở thành lỗi <code>SyntaxError</code> dừng chương trình!</li>
        </ol>

        <p>Để đảm bảo mã nguồn an toàn tuyệt đối trên mọi phiên bản Python, bạn hãy áp dụng một trong hai giải pháp: <strong>nhân đôi dấu gạch chéo ngược thành <code>\\\\</code></strong>, hoặc <strong>sử dụng chuỗi thô (raw string)</strong> sẽ học ở bài tiếp theo.</p>
      `,
      codeExamples: [
        {
          title: 'Cảnh báo cú pháp SyntaxWarning khi dùng escape không hợp lệ',
          code: `# Dưới Python 3.12+, đoạn mã này phát SyntaxWarning:
# path = 'C:\\py\\code'  # Cảnh báo invalid escape sequence '\\p'

# Giải pháp viết an toàn: Nhân đôi dấu gạch chéo ngược
safe_path = 'C:\\\\py\\\\code'
print("safe_path repr:", repr(safe_path))
print("safe_path print:", safe_path)
print("Độ dài:", len(safe_path))`,
          output: `safe_path repr: 'C:\\\\py\\\\code'
safe_path print: C:\\py\\code
Độ dài: 10`,
          annotations: [
            { line: 5, text: 'Mỗi cặp \\\\ đại diện cho duy nhất một ký tự gạch chéo ngược nguyên nghĩa.' },
            { line: 8, text: 'len(safe_path) là 10, hoàn toàn an toàn và không gây ra bất kỳ cảnh báo nào.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tra cứu tên ký tự Unicode với \\N{name}',
        content: 'Bạn có thể sử dụng cú pháp <code>\\N{name}</code> để đưa bất kỳ ký tự nào trong cơ sở dữ liệu Unicode quốc tế vào chuỗi: ví dụ <code>"\\N{GREEK CAPITAL LETTER DELTA}"</code> sinh ra ký tự <code>Δ</code>, hoặc <code>"\\N{SNAKE}"</code> sinh ra biểu tượng <code>🐍</code>. Cách viết này giúp mã nguồn mang tính tự tài liệu hóa rất cao.'
      }
    ],
    pitfalls: [
      {
        title: 'Cảnh báo: Đừng dựa dẫm vào cơ chế giữ nguyên \\ của Python cũ',
        content: `Nếu trong mã nguồn cũ của bạn có những chuỗi như <code>'\\programs'</code> hay <code>'\\test'</code> (với <code>\\p</code> không hợp lệ), hãy chủ động sửa lại thành chuỗi thô <code>r'\\programs'</code> hoặc <code>'\\\\programs'</code> ngay hôm nay để tránh việc mã bị đổ vỡ khi nâng cấp lên các bản Python mới hơn.`
      }
    ]
  },

  exercises: [
    {
      title: 'Đếm chính xác số lượng ký tự trong chuỗi có ký tự thoát',
      level: 'Vừa',
      problem: 'Hãy dự đoán bằng mắt giá trị len() của chuỗi sau: s = "a\\nb\\x1f\\000d". Sau đó viết mã Python để kiểm chứng và in ra giá trị code point số nguyên (ord) của từng ký tự có mặt trong chuỗi.',
      hint: 'Chuỗi gồm: \'a\', \'\\n\' (newline), \'b\', \'\\x1f\' (hex 31), \'\\000\' (null 0), và \'d\'. Tổng cộng có bao nhiêu ký tự?',
      solutionCode: `s = "a\\nb\\x1f\\000d"
print("Độ dài chuỗi len(s):", len(s))

print("Chi tiết từng ký tự và code point:")
for idx, char in enumerate(s):
    print(f"Vị trí {idx}: ký tự {repr(char):<8} | code point ord = {ord(char)}")`,
      solutionOutput: `Độ dài chuỗi len(s): 6
Chi tiết từng ký tự và code point:
Vị trí 0: ký tự 'a'      | code point ord = 97
Vị trí 1: ký tự '\\n'     | code point ord = 10
Vị trí 2: ký tự 'b'      | code point ord = 98
Vị trí 3: ký tự '\\x1f'   | code point ord = 31
Vị trí 4: ký tự '\\x00'   | code point ord = 0
Vị trí 5: ký tự 'd'      | code point ord = 100`,
      explanation: 'Chuỗi gồm đúng 6 ký tự. Ký tự thoát \\x1f đại diện cho mã điều khiển Unit Separator (31), và \\000 đại diện cho ký tự NULL (0). len() đếm số lượng ký tự thực trong bộ nhớ RAM chứ không đếm số ký tự gõ ở mã nguồn.'
    }
  ],

  quiz: [
    {
      question: 'Trong Python, điều gì sẽ xảy ra khi một chuỗi chứa ký tự NULL (\\0)?',
      options: [
        'Chuỗi sẽ bị cắt cụt tại vị trí ký tự NULL giống như quy ước của ngôn ngữ C.',
        'Python phát sinh lỗi ValueError vì ký tự NULL không được phép tồn tại trong văn bản.',
        'Ký tự NULL được lưu trữ như một ký tự bình thường và không làm kết thúc chuỗi.',
        'Ký tự NULL tự động bị xóa bỏ khỏi chuỗi khi nạp vào bộ nhớ RAM.'
      ],
      correctIndex: 2,
      explanation: 'Khác với C, Python theo dõi rõ ràng độ dài và nội dung chuỗi trong tiêu đề đối tượng. Ký tự NULL (\\0) không hề kết thúc chuỗi và được xử lý hoàn toàn bình thường.'
    },
    {
      question: 'Kể từ Python 3.12, việc viết một chuỗi chứa ký tự thoát không hợp lệ như \'C:\\project\' (với \\p) sẽ dẫn đến điều gì?',
      options: [
        'Chương trình bị dừng ngay lập tức với lỗi cú pháp SyntaxError.',
        'Python âm thầm xóa bỏ dấu gạch chéo ngược mà không thông báo gì.',
        'Python phát ra cảnh báo cú pháp SyntaxWarning và giữ lại dấu gạch chéo ngược.',
        'Trình thông dịch tự động chuyển chuỗi đó thành chuỗi thô (raw string).'
      ],
      correctIndex: 2,
      explanation: 'Python 3.12 đưa ra cảnh báo SyntaxWarning: invalid escape sequence \'\\p\' để nhắc nhở lập trình viên thay thế bằng chuỗi thô r\'...\' hoặc \\\\ trước khi biến nó thành lỗi dừng chương trình trong tương lai.'
    }
  ],

  summary: [
    'Ký tự thoát (escape sequence) bắt đầu bằng dấu gạch chéo ngược \\ để mã hóa các ký tự đặc biệt không gõ được trực tiếp.',
    'len() trả về số lượng ký tự / code point thực tế trong bộ nhớ RAM, không phản ánh số lượng byte lưu trữ.',
    'Bảng 7-2 liệt kê 18 ký tự thoát chuẩn: \\n (dòng mới), \\t (tab), \\xhh (hex), \\ooo (bát phân), \\uhhhh, \\Uhhhhhhhh (Unicode).',
    'Ký tự NULL (\\0) trong Python không kết thúc chuỗi như trong ngôn ngữ C; chuỗi Python có thể chứa bất kỳ dữ liệu nhị phân nào.',
    'Python 3.12+ đưa ra cảnh báo SyntaxWarning cho ký tự thoát không hợp lệ; hãy luôn dùng chuỗi thô hoặc \\\\ để an toàn.'
  ]
};
