export default {
  id: 'lp-c7-19',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.19',
  title: 'Định dạng tùy chỉnh của F-String: Cờ gỡ lỗi (=), Chuyển đổi (!s/!r/!a) & Lồng động',
  subtitle: 'Cú pháp đầy đủ f\'...{expression [=] [!s/!r/!a] [:formatspec]}...\', cờ tự gán nhãn gỡ lỗi =, biểu thức lồng nhau trong formatspec, so sánh khi gom dữ liệu gom cụm vs bản mẫu nạp từ file',
  level: 'Nâng cao',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ cấu trúc toàn diện của mục tiêu f-string: f\'...{expression [=] [!s/!r/!a] [:formatspec]}...\'.',
    'Ứng dụng cờ tự gán nhãn gỡ lỗi = (Python 3.8+) để tăng tốc gỡ lỗi in ấn (print debugging) mà không cần gõ lặp lại tên biến.',
    'Sử dụng các cờ chuyển đổi !s, !r, !a với các ký tự đặc biệt hoặc phi-ASCII.',
    'Nhúng biểu thức lồng nhau động bên trong formatspec của f-string.',
    'Phân tích sâu sắc ưu và nhược điểm thực chiến của f-string so với % và .format() khi làm việc với từ điển gom dữ liệu hoặc bản mẫu nạp từ tệp bên ngoài (rủi ro eval).'
  ],

  intuition: {
    title: 'Chiếc nhãn tự dán và bài toán an toàn bảo mật',
    metaphor: 'Tính năng cờ gỡ lỗi f"{x=}" giống như một chiếc máy in nhãn tự động: thay vì bạn phải vừa in chữ "x = " rồi mới in giá trị của x, chiếc máy tự động đọc tên biến và in kèm dấu bằng ở phía trước, giúp việc dò lỗi khi viết mã trở nên nhẹ nhàng bất ngờ. Tuy nhiên, f-string không phải là vạn năng. Khi bạn cần nạp các mẫu hợp đồng hay email từ tệp văn bản bên ngoài, f-string giống như một lá thư chứa mã lệnh máy tính có thể tự kích hoạt — nếu tin tưởng mù quáng nạp vào hàm eval(), kẻ xấu có thể xóa sạch ổ đĩa của bạn chỉ bằng một biểu thức ngụy trang!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CẤU TRÚC MỤC TIÊU ĐẦY ĐỦ CỦA F-STRING</div>
        <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;font-size:1.05rem;">
          <code>f'...{<span style="color:var(--accent-primary);font-weight:700;">expression</span> <span style="color:var(--warning);font-weight:700;">[=]</span> <span style="color:#e06c75;">[!s/!r/!a]</span> <span style="color:var(--success);">[:formatspec]</span>}...'</code>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:8px;font-size:0.8rem;">
          <div style="padding:8px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--warning);">
            <strong>Cờ Gỡ Lỗi <code>=</code>:</strong> Tự động chèn văn bản biểu thức kèm <code>=</code> (ví dụ: <code>x=10</code>)
          </div>
          <div style="padding:8px;background:var(--bg-surface);border-radius:6px;border-left:3px solid #e06c75;">
            <strong>Cờ Chuyển Đổi:</strong> <code>!s</code> (str), <code>!r</code> (repr), <code>!a</code> (ascii)
          </div>
          <div style="padding:8px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--success);">
            <strong>Đặc Tả Lồng:</strong> <code>{a:.{width}f}</code> tính độ rộng động
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cú Pháp Toàn Diện Của F-String & Cờ Gỡ Lỗi Tự Động Gắn Nhãn (=)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 45 / 52 – Trang 47 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Về mặt trừu tượng, một mục tiêu hoàn chỉnh bên trong f-string có cấu trúc như sau:</p>
        <pre style="margin:12px 0;padding:12px;background:var(--bg-surface-alt);border-radius:6px;font-family:var(--font-mono);font-size:0.92rem;color:var(--accent-primary);">f'...literaltext... {expression [=] [!s, !r, or !a] [:formatspec]} ...literaltext...'</pre>

        <p>Trong đó, một bổ sung cực kỳ tiện lợi cho các nhà phát triển (được thêm từ Python 3.8) là <strong>ký tự <code>=</code> đứng ngay sau biểu thức</strong>:</p>
        <ul>
          <li>Ký tự <code>=</code> yêu cầu Python <strong>tự động thêm văn bản của biểu thức cùng một dấu <code>"="</code> làm nhãn phía trước giá trị</strong>.</li>
          <li>Giá trị phía sau được định dạng mặc định theo biểu diễn <code>repr()</code> hoặc tuân theo <code>formatspec</code> nếu có.</li>
          <li>Tính năng này giải phóng lập trình viên khỏi công việc tẻ nhạt khi gỡ lỗi: thay vì phải gõ <code>print(f"total_amount={total_amount}")</code>, bạn chỉ cần gõ ngắn gọn <code>print(f"{total_amount=}")</code>!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng cờ gỡ lỗi = tự động gắn nhãn biến và biểu thức',
          code: `a = 3.14156
b = 1_234_567

# Cờ = kết hợp với đặc tả định dạng :e và :+012,
print(f'{a=:e} and {b=:+012,}')

# Cờ = áp dụng cho cả các biểu thức tính toán phức hợp:
print(f'{a + 1=:e} and {b * 2=:+012,}')`,
          output: `a=3.141560e+00 and b=+001,234,567
a + 1=4.141560e+00 and b * 2=+002,469,134`,
          annotations: [
            { line: 5, text: '{a=:e} tự động in nhãn "a=" theo sau là định dạng số mũ.' },
            { line: 8, text: '{a + 1=:e} tự động in nhãn "a + 1=" nguyên văn chuỗi biểu thức.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Cờ Chuyển Đổi (!s, !r, !a) & Biểu Thức Lồng Nhau Động',
      content: `
        <p>Các cờ chuyển đổi được viết trước dấu hai chấm của <code>formatspec</code> (nhưng đứng sau dấu <code>=</code> nếu có). Để minh họa sự khác biệt, ví dụ của Mark Lutz sử dụng một chuỗi chứa ký tự phi-ASCII <code>'h\\xc4ck'</code> (trong đó <code>\\xc4</code> là ký tự <strong>Ä</strong>):</p>
        <ul>
          <li><code>!s</code>: Gọi <code>str()</code> hiển thị thân thiện người dùng: <code>hÄck</code>.</li>
          <li><code>!r</code>: Gọi <code>repr()</code> giữ nguyên dấu nháy mã nguồn: <code>'hÄck'</code>.</li>
          <li><code>!a</code>: Gọi <code>ascii()</code> biến đổi toàn bộ ký tự phi-ASCII thành chuỗi thoát mã hex: <code>'h\\xc4ck'</code>.</li>
        </ul>

        <p><strong>Biểu thức lồng nhau trong formatspec:</strong> Giống như phương thức <code>format()</code>, bất kỳ thành phần nào của một <code>formatspec</code> trong f-string cũng có thể là một cặp <code>{}</code> lồng nhau chứa biểu thức Python tùy ý để tính toán độ rộng, ký tự đệm hoặc độ chính xác tại thời gian chạy:</p>
      `,
      codeExamples: [
        {
          title: 'Khảo sát cờ !s, !r, !a với ký tự phi-ASCII',
          code: `c = 'h\\xc4ck'  # \\xc4 là ký tự Ä phi-ASCII

# So sánh 3 cờ chuyển đổi
print(f'{c!s} and {c!r} and {c!a}')
print(f'{str(c)} and {repr(c)} and {ascii(c)}')

# Kết hợp cờ = và cờ chuyển đổi
print(f'{c=!s} and {c=!r} and {c=!a}')

# Kết hợp độ rộng và căn lề:
print(f'{c=!s:8} and {repr(c)} and {c:0>8}')`,
          output: `hÄck and 'hÄck' and 'h\\xc4ck'
hÄck and 'hÄck' and 'h\\xc4ck'
c=hÄck and c='hÄck' and c='h\\xc4ck'
c=hÄck     and 'hÄck' and 0000hÄck`,
          annotations: [
            { line: 4, text: '!a chuyển đổi Ä thành ký tự thoát ASCII \\xc4.' },
            { line: 11, text: '{c:0>8} đệm 4 số không phía trước để đạt độ rộng 8.' }
          ]
        },
        {
          title: 'Formatspec lồng nhau: Tính toán độ rộng và đệm động',
          code: `a = 3.14156
c = 'hÄck'
width = 8

# Tham số động truyền qua biểu thức {width}:
print(f'{a:.{width}f} and {c:0>{width}}')

# Biểu thức tính toán lồng: {width * 3}
print(f'{a=:.{width}f} and {c * 2:0>{width * 3}}')`,
          output: `3.14156000 and 0000hÄck
a=3.14156000 and 0000000000000000hÄckhÄck`,
          annotations: [
            { line: 6, text: '.{width}f truyền động số 8 làm số chữ số lẻ thập phân.' },
            { line: 9, text: 'c * 2:0>{width * 3} nhân đôi chuỗi và nhân ba độ rộng trường đệm 0.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phân Tích Thực Chiến: Khi Nào F-String Thua Kém Biểu Thức & Phương Thức?',
      content: `
        <p>Mặc dù f-string cực kỳ mạnh mẽ, tác giả Mark Lutz chỉ ra hai tình huống sử dụng thực tế rất phổ biến mà ở đó <strong>f-string lại bộc lộ những điểm bất tiện đáng kể</strong>:</p>

        <ol>
          <li>
            <strong>Khi dữ liệu thay thế được gom sẵn trong một bộ chứa (như từ điển):</strong><br>
            Biểu thức <code>%</code> và phương thức <code>format()</code> có thể dễ dàng nhận toàn bộ từ điển qua cú pháp <code>template % values</code> hoặc <code>template.format(**values)</code>. Trái lại, trong f-string bạn buộc phải viết lặp lại tên từ điển nhiều lần: <code>f"Use {values['tool']} for {values['role']}."</code>, khiến mã nguồn trở nên rối rắm.
          </li>
          <li>
            <strong>Khi bản mẫu được nạp từ tệp văn bản bên ngoài tại thời gian chạy:</strong><br>
            Đây là tình huống cực kỳ phổ biến trong các hệ thống gửi email tự động, sinh báo cáo, hoặc quản lý cấu hình. Trong khi biểu thức <code>%</code> và phương thức <code>format()</code> coi các bản mẫu đó là <strong>dữ liệu văn bản đơn thuần hoàn toàn an toàn</strong>, thì f-string lại là <strong>mã chương trình Python</strong>!
          </li>
        </ol>

        <div class="callout-box callout-warning" style="border-left:4px solid var(--danger);margin:14px 0;">
          <div class="callout-header">
            <span>🛡️</span>
            <span><strong>Nguy cơ bảo mật nghiêm trọng khi nạp F-string từ bên ngoài:</strong></span>
          </div>
          <div class="callout-body">
            <p>Để chạy một chuỗi bản mẫu f-string được nạp từ tệp văn bản hoặc cơ sở dữ liệu, bạn buộc phải dùng hàm <code>eval()</code>. Điều này đòi hỏi bạn phải <em>tuyệt đối tin tưởng</em> rằng tệp đó không chứa mã độc. Bởi vì trong một biểu thức Python, việc xóa tệp tin hệ thống hoặc mở kết nối mạng ngầm là cực kỳ dễ dàng (ví dụ kẻ tấn công chèn: <code>f"{__import__('os').system('rmdir /s /q C:\\')}"</code>)!</p>
          </div>
        </div>

        <p>Vì vậy, f-string hướng nhiều hơn về việc <strong>định dạng nội bộ trong mã nguồn chương trình</strong>, trong khi biểu thức <code>%</code> và phương thức <code>.format()</code> lại là lựa chọn hàng đầu cho các vai trò <strong>dựa trên dữ liệu thuần túy (data-driven templating)</strong>.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh ba công cụ khi dữ liệu được gom trong từ điển',
          code: `# Dữ liệu thay thế được gom trong từ điển:
values = dict(tool='Python', role='scripting')

# 1. Biểu thức %: tự động khớp khóa ngắn gọn
print('Use %(tool)s for %(role)s.' % values)

# 2. Phương thức format: giải nén từ khóa **values
print('Use {tool} for {role}.'.format(**values))

# 3. Phương thức format: nhận đối số vị trí và truy xuất khóa
print('Use {0[tool]} for {0[role]}.'.format(values))

# 4. F-string: phải gõ lặp lại values[...] trong từng cặp {}
print(f"Use {values['tool']} for {values['role']}.")`,
          output: `Use Python for scripting.
Use Python for scripting.
Use Python for scripting.
Use Python for scripting.`,
          annotations: [
            { line: 5, text: 'Biểu thức % rất sạch khi dữ liệu là một dict có sẵn.' },
            { line: 8, text: 'format(**values) chuyển dict thành các keyword arguments.' },
            { line: 14, text: 'F-string dài dòng hơn vì phải truy xuất chỉ mục values[\'key\'] nhiều lần.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Tối Ưu F-String Bằng Cách Gán Biến Trước',
      content: `Khi muốn dùng f-string với dữ liệu từ từ điển, cách viết đẹp và dễ đọc nhất là giải nén các giá trị thành các biến cục bộ có tên ngắn gọn trước khi viết f-string: tool = values['tool']; role = values['role']; msg = f"Use {tool} for {role}."`
      }
    ],
    pitfalls: [
      {
      title: 'Tuyệt Đối Không Dùng eval() Để Nạp F-String Từ Người Dùng',
      content: `Đừng bao giờ cho phép người dùng nhập vào một mẫu f-string rồi chạy eval(f"f'{user_input}'"). Đây là lỗ hổng tiêm mã (Code Injection) chí mạng cho phép tin tặc thực thi mã tùy ý trên máy chủ của bạn!`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Gỡ lỗi hàm toán học với cờ = và formatspec',
      question: 'Cho hai biến radius = 7.5 và pi = 3.14159265. Hãy dùng một f-string duy nhất có cờ gỡ lỗi = và đặc tả số thực 2 chữ số thập phân để in ra chuỗi chẩn đoán: "radius=7.50, area=176.71" (với diện tích area được tính trực tiếp từ công thức pi * radius ** 2 trong biểu thức).',
      starterCode: `radius = 7.5
pi = 3.14159265

# Viết mã f-string có cờ = ở đây:
# debug_info = ...
# print(debug_info)
`,
      solution: `radius = 7.5
pi = 3.14159265

debug_info = f"{radius=:.2f}, {pi * radius ** 2=:.2f}".replace("pi * radius ** 2=", "area=")
# Hoặc gán biến area trước:
area = pi * radius ** 2
print(f"{radius=:.2f}, {area=:.2f}")`,
      hints: [
        'Dùng {radius=:.2f} để in nhãn radius= kèm 2 chữ số thập phân.',
        'Gán area = pi * radius ** 2 rồi dùng {area=:.2f}.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Ký tự nào được thêm vào sau biểu thức trong f-string (kể từ Python 3.8) để tự động in tên biểu thức cùng dấu bằng làm nhãn gỡ lỗi?',
      options: [
        '?',
        '!',
        '=',
        '@'
      ],
      answer: 2,
      explanation: 'Ký tự = đứng sau biểu thức (ví dụ: f"{x=}") tự động gắn nhãn văn bản của biểu thức kèm một dấu = trước giá trị kết quả.'
    },
    {
      question: 'Tại sao việc sử dụng f-string cho các bản mẫu nạp từ tệp bên ngoài lại tiềm ẩn nguy cơ mất an toàn bảo mật nghiêm trọng?',
      options: [
        'Vì f-string làm tệp văn bản bị mã hóa và không thể mở lại.',
        'Vì f-string là mã chương trình Python, muốn chạy bản mẫu từ văn bản phải thông qua hàm eval() — hàm có thể thực thi bất kỳ mã độc hại nào trong tệp.',
        'Vì f-string không hỗ trợ bộ nhớ đệm khiến máy chủ hết RAM.',
        'Vì f-string không hỗ trợ bảng mã UTF-8.'
      ],
      answer: 1,
      explanation: 'Khác với % hay format coi bản mẫu là dữ liệu tĩnh an toàn, f-string là mã thực thi thời gian chạy. Nạp f-string từ tệp đòi hỏi chạy qua eval(), tạo ra lỗ hổng Code Injection chí mạng.'
    }
  ],

  summary: {
    takeaways: [
      'Cú pháp hoàn chỉnh: f\'...{expression [=] [!s/!r/!a] [:formatspec]}...\'.',
      'Cờ gỡ lỗi = tự động tạo nhãn biểu thức, tiết kiệm thời gian khi ghi log hoặc debug.',
      'Cờ chuyển đổi !s, !r, !a điều khiển chế độ hiển thị chuỗi với các ký tự đặc biệt hoặc phi-ASCII.',
      'F-string hỗ trợ formatspec lồng nhau để thiết lập kích thước và độ chính xác động.',
      'F-string phù hợp nhất cho định dạng nội bộ trong mã nguồn; biểu thức % và format() ưu việt hơn khi dữ liệu là từ điển gom cụm hoặc bản mẫu nạp từ bên ngoài.'
    ],
    nextSteps: 'Trong bài tiếp theo (C7.20), chúng ta sẽ tổng kết so sánh toàn diện ba công cụ định dạng, bàn về bản quyền tự do lựa chọn của lập trình viên, và khung chuyên đề bổ sung về string.Template.'
  }
};
