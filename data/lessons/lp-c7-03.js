export default {
  id: 'lp-c7-03',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.3',
  title: 'Chuỗi thô (Raw Strings): Tắt ký tự thoát & Điểm kỳ quặc',
  subtitle: 'Giải quyết lỗi đường dẫn tệp Windows, tiền tố r, hiển thị REPL vs print, và điểm kỳ quặc không thể kết thúc bằng số lẻ dấu gạch chéo ngược',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nhận biết lỗi kinh điển khi mở tệp trên Windows do dấu gạch chéo ngược vô tình kích hoạt ký tự thoát.',
    'Nắm vững cú pháp chuỗi thô (raw string) với tiền tố r hoặc R để vô hiệu hóa toàn bộ cơ chế ký tự thoát.',
    'Phân biệt cách hiển thị của chuỗi thô: REPL nhân đôi dấu gạch chéo (\\\\) trong khi print() hiển thị ký tự đơn.',
    'Hiểu tường tận "điểm kỳ quặc" của chuỗi thô: không thể kết thúc bằng một số lượng lẻ các dấu gạch chéo ngược và 3 cách khắc phục.'
  ],

  intuition: {
    title: 'Tấm khiên vô hiệu hóa phép thuật của dấu gạch chéo ngược',
    metaphor: 'Trong thế giới Python, dấu gạch chéo ngược (\\) vốn là một "phù thủy" luôn tìm cách biến đổi các chữ cái đứng sau nó thành ký tự đặc biệt (\\n thành dòng mới, \\t thành bước nhảy tab). Nhưng đôi khi bạn chỉ muốn một chuỗi thuần túy nguyên nghĩa—chẳng hạn như đường dẫn thư mục C:\\new\\test.dat trên Windows. Tiền tố r (Raw) đứng trước dấu nháy mở giống như việc bạn phủ một tấm khiên chống phép lên toàn bộ chuỗi. Bên dưới tấm khiên này, mọi dấu gạch chéo ngược đều bị tước bỏ ma thuật và trở thành những ký tự gạch chéo bình thường đúng theo nghĩa đen.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHUỖI BÌNH THƯỜNG VS CHUỖI THÔ (RAW STRING)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--danger);border-radius:8px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">Chuỗi Thường: 'C:\\new\\test.dat'</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              • <code>\\n</code> ➔ Bị hiểu là dòng mới (newline)<br>
              • <code>\\t</code> ➔ Bị hiểu là thụt lề tab<br>
              <span style="color:var(--danger);">❌ Lỗi mở file: C:(dòng mới)ew(tab)ext.dat</span>
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Chuỗi Thô: r'C:\\new\\test.dat'</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              • Tiền tố <code>r</code> tắt toàn bộ escape<br>
              • Giữ nguyên <code>\\n</code> và <code>\\t</code> dạng chữ<br>
              <span style="color:var(--success);">✓ Mở đúng file C:\\new\\test.dat</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bài toán Thực tế: Sự cố Tên tệp trên Hệ điều hành Windows',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 9 / 52 – Trang 11 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Như chúng ta đã thấy, các ký tự thoát rất tiện lợi để nhúng các ký tự đặc biệt vào chuỗi. Tuy nhiên, đôi khi cách xử lý đặc biệt của dấu gạch chéo ngược để mở đầu các ký tự thoát có thể dẫn đến rắc rối nghiêm trọng.</p>

        <p>Chẳng hạn, một lỗi rất phổ biến ở những người mới học Python là cố mở một tệp trên hệ điều hành Windows với câu lệnh trông giống như thế này:</p>
        <pre class="code-pre"><code>myfile = open('C:\\new\\text.dat', 'w')</code></pre>

        <p>với suy nghĩ rằng họ sẽ mở một tệp có tên là <code>text.dat</code> nằm trong thư mục <code>C:\\new</code>. Vấn đề ở đây là:</p>
        <ul>
          <li>Ký tự <code>\\n</code> bị Python hiểu là đại diện cho một <strong>ký tự dòng mới (newline)</strong>.</li>
          <li>Ký tự <code>\\t</code> bị thay thế bằng một <strong>ký tự tab ngang</strong>.</li>
        </ul>

        <p>Về mặt hiệu lực, lệnh gọi này đang cố mở một tệp có tên kỳ quặc là <code>C:(dòng mới)ew(tab)ext.dat</code>, và kết quả thường là xuất hiện lỗi <code>OSError</code> hoặc không tìm thấy tệp.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Chuỗi Thô (Raw String) và Tiền tố r',
      content: `
        <p>Đây chính là kiểu vấn đề mà <strong>chuỗi thô (raw string)</strong> được thiết kế để giải quyết một cách triệt để. Nếu chữ cái <code>r</code> (hoặc <code>R</code>, nhưng thông thường là chữ thường) xuất hiện ngay trước dấu nháy mở đầu của bất kỳ hằng chuỗi nào, nó sẽ <strong>tắt hoàn toàn cơ chế ký tự thoát</strong>.</p>

        <p>Kết quả là Python sẽ giữ nguyên các dấu gạch chéo ngược của bạn đúng theo nghĩa đen, chính xác như cách chúng xuất hiện khi bạn gõ trên bàn phím. Do đó, để khắc phục sự cố tên tệp trên Windows, bạn chỉ cần nhớ thêm chữ cái <code>r</code> phía trước:</p>
      `,
      codeExamples: [
        {
          title: 'Khắc phục đường dẫn Windows bằng chuỗi thô r\'...\'',
          code: `# Chuỗi thô: tắt hoàn toàn ký tự thoát
path = r'C:\\new\\text.dat'

# REPL hiển thị dạng chuỗi mã nguồn Python (nhân đôi dấu \\)
print("Dạng mã nguồn (repr):", repr(path))

# In trực quan: hiển thị đúng 1 dấu gạch chéo ngược
print("In trực tiếp:", path)

# Hàm len() đếm đúng số ký tự thực tế
print("Tổng số ký tự len(path):", len(path))`,
          output: `Dạng mã nguồn (repr): 'C:\\\\new\\\\text.dat'
In trực tiếp: C:\\new\\text.dat
Tổng số ký tự len(path): 15`,
          annotations: [
            { line: 2, text: 'Tiền tố r vô hiệu hóa \\n và \\t, giữ nguyên chúng là hai ký tự riêng biệt.' },
            { line: 5, text: 'repr(path) dùng ký hiệu \\\\ để biểu thị một dấu gạch chéo ngược nguyên nghĩa.' },
            { line: 8, text: 'print(path) hiển thị chính xác một dấu gạch chéo tại mỗi vị trí.' },
            { line: 11, text: 'len(path) trả về đúng 15 ký tự (C, :, \\, n, e, w, \\, t, e, x, t, ., d, a, t).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Khung Chuyên đề: Điểm Kỳ quặc của Chuỗi Thô',
      content: `
        <p>Bất chấp vai trò đắc lực của nó, <strong>ngay cả một chuỗi thô cũng không thể kết thúc bằng một dấu gạch chéo ngược đơn lẻ</strong>, bởi vì dấu gạch chéo ngược sẽ thoát ký tự dấu nháy bao quanh theo sau nó.</p>

        <p>Nghĩa là, cú pháp <code>r'…\\'</code> <strong>không phải là một hằng chuỗi hợp lệ</strong>: bạn vẫn bắt buộc phải thoát ký tự dấu nháy bao quanh nếu muốn nhúng nó vào chuỗi, và Python cho rằng đó chính là ý định của bạn. Kết cục là:</p>
        <blockquote>
          <p><strong>Quy tắc bất di bất dịch:</strong> Một chuỗi thô không thể kết thúc bằng một số lượng LẺ các dấu gạch chéo ngược (bao gồm cả một dấu đơn lẻ).</p>
        </blockquote>

        <p>Nếu bạn thực sự cần kết thúc một chuỗi thô bằng một dấu gạch chéo ngược duy nhất, bạn có 3 giải pháp kinh điển sau:</p>
        <ol>
          <li>Dùng hai dấu gạch chéo ngược ở cuối rồi cắt bỏ dấu thứ hai bằng slice: <code>r'C:\\path\\\\'[:-1]</code>.</li>
          <li>Ghép nối thêm một dấu gạch chéo ngược một cách thủ công: <code>r'C:\\path' + '\\\\'</code>.</li>
          <li>Bỏ qua cú pháp chuỗi thô và nhân đôi các dấu gạch chéo ngược trong chuỗi thông thường: <code>'C:\\\\path\\\\'</code>.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: '3 cách xử lý dấu gạch chéo ngược ở cuối chuỗi',
          code: `# Cách 1: Chuỗi thô có 2 dấu gạch chéo cuối rồi cắt lát [:-1]
p1 = r'C:\\dir\\\\'[:-1]

# Cách 2: Ghép nối thủ công thêm '\\\\'
p2 = r'C:\\dir' + '\\\\'

# Cách 3: Chuỗi thông thường nhân đôi dấu gạch chéo
p3 = 'C:\\\\dir\\\\'

print("p1:", p1, "| len:", len(p1))
print("p2:", p2, "| len:", len(p2))
print("p3:", p3, "| len:", len(p3))
print("Cả 3 cách có cùng giá trị?", p1 == p2 == p3)`,
          output: `p1: C:\\dir\\ | len: 7
p2: C:\\dir\\ | len: 7
p3: C:\\dir\\ | len: 7
Cả 3 cách có cùng giá trị? True`,
          annotations: [
            { line: 2, text: 'r\'C:\\dir\\\\\' có 2 dấu \\ cuối (số chẵn hợp lệ), [:-1] cắt bỏ dấu cuối để lại 1 dấu \\.' },
            { line: 5, text: 'Ghép thêm \'\\\\\' (chuỗi thường biểu diễn 1 dấu \\).' },
            { line: 8, text: 'Dùng chuỗi thường với \\\\ ở mọi vị trí là giải pháp truyền thống tin cậy.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mẹo khả chuyển: Dùng dấu gạch chéo xuôi (/) trên cả Windows',
        content: `Các tập lệnh Python hiện đại thường có thể dùng dấu gạch chéo xuôi (<code>/</code>) trong đường dẫn thư mục trên cả Windows lẫn Unix/Linux, vì bản thân Python và hệ điều hành Windows đều diễn giải dấu này một cách hoàn toàn khả chuyển (chẳng hạn <code>open('C:/new/text.dat', 'w')</code> hoạt động hoàn hảo). Tuy nhiên, chuỗi thô vẫn rất cần thiết cho các đường dẫn sử dụng dấu gạch chéo ngược nguyên bản hoặc các biểu thức chính quy trong module <code>re</code>.`
      }
    ],
    pitfalls: [
      {
        title: 'Cú pháp r\'C:\\path\\\' sẽ gây lỗi SyntaxError',
        content: 'Đừng bao giờ viết <code>path = r"C:\\path\\"</code>. Dấu gạch chéo ngược cuối cùng sẽ thoát dấu nháy kép đóng, khiến Python tưởng chuỗi chưa kết thúc và báo lỗi <code>SyntaxError: unterminated string literal</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo đường dẫn thư mục Windows có dấu gạch chéo ngược ở cuối',
      level: 'Dễ',
      problem: 'Hãy viết mã Python tạo một chuỗi biểu diễn đường dẫn thư mục "D:\\workspace\\project\\" (chú ý có dấu gạch chéo ngược ở cuối). Kiểm tra độ dài len() và in chuỗi ra màn hình để chắc chắn không bị lỗi cú pháp.',
      hint: 'Áp dụng một trong ba cách xử lý điểm kỳ quặc của chuỗi thô: r\'D:\\workspace\\project\\\\\'[:-1] hoặc chuỗi thường nhân đôi \'D:\\\\workspace\\\\project\\\\\'.',
      solutionCode: `# Sử dụng chuỗi thô kết hợp cắt lát
folder_path = r'D:\\workspace\\project\\\\'[:-1]

print("Đường dẫn:", folder_path)
print("Tổng số ký tự len:", len(folder_path))
print("Ký tự cuối cùng:", repr(folder_path[-1]))`,
      solutionOutput: `Đường dẫn: D:\\workspace\\project\\
Tổng số ký tự len: 21
Ký tự cuối cùng: '\\\\'`,
      explanation: 'Bằng cách sử dụng hai dấu gạch chéo ngược cuối chuỗi thô rồi cắt bỏ ký tự cuối cùng bằng [:-1], chúng ta thu được chuỗi kết thúc bằng đúng 1 dấu gạch chéo ngược một cách an toàn và hợp lệ.'
    }
  ],

  quiz: [
    {
      question: 'Mục đích chính của tiền tố r (ví dụ: r\'text\') trong chuỗi thô là gì?',
      options: [
        'Tự động đảo ngược thứ tự các ký tự trong chuỗi từ phải sang trái.',
        'Vô hiệu hóa toàn bộ cơ chế diễn giải ký tự thoát (escape sequence), giữ nguyên dấu gạch chéo ngược.',
        'Mã hóa chuỗi thành mảng byte nhị phân để ghi vào tệp.',
        'Chuyển đổi các ký tự chữ thường thành chữ hoa.'
      ],
      correctIndex: 1,
      explanation: 'Tiền tố r (Raw) tắt cơ chế xử lý ký tự thoát, khiến dấu gạch chéo ngược \\ được đối xử nguyên nghĩa như một ký tự văn bản thông thường.'
    },
    {
      question: 'Đoạn mã sau trong Python sẽ tạo ra kết quả gì: s = r"abc\\"',
      options: [
        'Một chuỗi gồm 4 ký tự: \'abc\\\\\'',
        'Một chuỗi gồm 3 ký tự: \'abc\'',
        'Lỗi cú pháp SyntaxError: unterminated string literal',
        'Một cảnh báo RuntimeWarning nhưng vẫn chạy tiếp'
      ],
      correctIndex: 2,
      explanation: 'Dấu gạch chéo ngược cuối cùng sẽ thoát dấu nháy kép đóng, khiến chuỗi không có dấu đóng hợp lệ và Python sẽ báo lỗi cú pháp SyntaxError: unterminated string literal.'
    }
  ],

  summary: [
    'Lỗi đường dẫn tệp trên Windows rất phổ biến do dấu \\ kích hoạt các ký tự thoát ngoài ý muốn (như \\n, \\t).',
    'Chuỗi thô (raw string) với tiền tố r/R tắt cơ chế ký tự thoát, giữ nguyên mọi dấu gạch chéo ngược nguyên văn.',
    'Dấu gạch chéo xuôi / hoạt động khả chuyển trên cả Windows và Linux khi mở tệp trong Python.',
    'Điểm kỳ quặc: Chuỗi thô không thể kết thúc bằng một số lẻ dấu gạch chéo ngược (r\'...\\\' là lỗi cú pháp).',
    'Khắc phục bằng cách dùng r\'...\\\\\'[:-1], nối chuỗi r\'...\' + \'\\\\\', hoặc nhân đôi dấu gạch chéo trong chuỗi thường.'
  ]
};
