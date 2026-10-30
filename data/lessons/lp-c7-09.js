export default {
  id: 'lp-c7-09',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.9',
  title: 'So sánh chuỗi & "Thay đổi" chuỗi Phần 1: Thao tác trên dãy tuần tự',
  subtitle: 'So sánh từ điển theo code point, tính bất biến cấm gán tại chỗ, tạo chuỗi mới qua phép nối & slice, hiệu năng dọn rác GC và bytearray',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu quy tắc so sánh chuỗi theo thứ tự từ điển (lexicographical) dựa trên các giá trị code point do ord() cung cấp.',
    'Nhận biết ràng buộc bất biến (immutability): vì sao phép gán tại chỗ S[0] = \'n\' bị cấm tuyệt đối với lỗi TypeError.',
    'Thành thạo kỹ thuật "sửa đổi" chuỗi: tạo đối tượng chuỗi mới bằng phép nối (+) và cắt lát (slicing) rồi gán lại tên biến.',
    'Hiểu cơ chế thu gom rác (Garbage Collection): vì sao việc tạo chuỗi mới trong Python lại hiệu quả bất ngờ về bộ nhớ.',
    'Khám phá Khung chuyên đề bytearray: đối tượng mảng byte khả biến 8-bit có thể thay đổi tại chỗ.'
  ],

  intuition: {
    title: 'Quy tắc từ điển và cỗ máy đúc lại pho tượng',
    metaphor: 'Làm sao Python biết từ "hact" lớn hơn từ "hack"? Nó không đọc nghĩa của từ, mà mở từ điển tra từng ký tự từ trái sang phải: chữ \'h\', \'a\', \'c\' đều hòa nhau, nhưng đến chữ thứ tư, code point của \'t\' (116) lớn hơn code point của \'k\' (107), do đó "hact" lập tức chiến thắng! Còn đối với việc sửa đổi chuỗi: một chuỗi giống như một pho tượng thạch cao đã khô cứng hoàn toàn. Bạn không thể nắn lại cái mũi hay ngón tay của pho tượng cũ (TypeError). Nếu muốn đổi hình dạng của nó, thợ điêu khắc sẽ đập vụn pho tượng cũ trả về cho cỗ máy tái chế (thu gom rác tự động - GC) và dùng khuôn đúc ra một pho tượng hoàn toàn mới mang hình hài bạn mong muốn.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ "THAY ĐỔI" CHUỖI BẤT BIẾN QUA CẮT LÁT & GHÉP NỐI</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:12px;padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;flex-wrap:wrap;">
          <div style="padding:8px 12px;background:var(--accent-soft);border-radius:6px;font-weight:700;">S[:4] ('text')</div>
          <div style="font-size:1.2rem;color:var(--accent-primary);">+</div>
          <div style="padding:8px 12px;background:#fef08a;color:#854d0e;border-radius:6px;font-weight:700;">' processing'</div>
          <div style="font-size:1.2rem;color:var(--accent-primary);">+</div>
          <div style="padding:8px 12px;background:var(--accent-soft);border-radius:6px;font-weight:700;">S[-1] ('!')</div>
          <div style="font-size:1.2rem;color:var(--accent-primary);">➔</div>
          <div style="padding:8px 12px;background:var(--success);color:#ffffff;border-radius:6px;font-weight:700;">'text processing!'</div>
        </div>
        <div style="text-align:center;font-size:0.82rem;color:var(--text-muted);">
          <em>Đối tượng mới được tạo ra • Gán lại biến S để trỏ tới vùng nhớ mới • Đối tượng cũ tự động được dọn rác (GC)</em>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. So Sánh Chuỗi theo Thứ Tự Từ Điển (Lexicographical)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 21 / 52 – Trang 22 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Một lý do khác để tìm hiểu về số thứ tự ký tự ở bài trước là nó giúp chúng ta hiểu sâu sắc về <strong>các phép so sánh chuỗi trong Python</strong>.</p>

        <p>Khi so sánh hai chuỗi văn bản, Python tự động so sánh chúng từ trái sang phải, từng ký tự một, và theo <strong>thứ tự từ điển (lexicographically)</strong>—nghĩa là theo chính các giá trị mã số nguyên code point được trả về bởi hàm <code>ord()</code>—cho đến khi gặp sự khác biệt đầu tiên hoặc đi đến hết một trong hai chuỗi:</p>
        <ul>
          <li>Nếu mọi ký tự ở các vị trí tương ứng đều bằng nhau và hai chuỗi có cùng độ dài, chúng <strong>bằng nhau (<code>==</code>)</strong>.</li>
          <li>Khi gặp hai ký tự khác nhau ở cùng một độ lệch vị trí, ký tự nào có giá trị <code>ord()</code> lớn hơn sẽ quyết định chuỗi đó <strong>lớn hơn (<code>></code>)</strong>.</li>
          <li>Nếu một chuỗi là tiền tố của chuỗi kia nhưng ngắn hơn, thì <strong>chuỗi dài hơn ở cuối sẽ thắng</strong> (ví dụ: <code>'hacker' > 'hack'</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh chuỗi theo thứ tự từ điển và code point',
          code: `# So sánh từ điển
comp1 = ('hack' == 'hack')
comp2 = ('hact' > 'hack')    # ord('t') = 116 > ord('k') = 107
comp3 = ('hacker' > 'hack')  # Chuỗi dài hơn thắng

print("('hack' == 'hack'):", comp1)
print("('hact' > 'hack'):", comp2)
print("('hacker' > 'hack'):", comp3)
print("Bộ ba kết quả:", (comp1, comp2, comp3))`,
          output: `('hack' == 'hack'): True
('hact' > 'hack'): True
('hacker' > 'hack'): True
Bộ ba kết quả: (True, True, True)`,
          annotations: [
            { line: 2, text: 'Hai chuỗi có cùng độ dài và cùng ký tự sẽ bằng nhau theo ==.' },
            { line: 3, text: '\'hact\' lớn hơn \'hack\' vì ở vị trí thứ tư ord(\'t\') = 116 > ord(\'k\') = 107.' },
            { line: 4, text: '\'hacker\' có tiền tố là \'hack\' nhưng dài hơn, nên \'hacker\' > \'hack\'.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. "Thay Đổi" Chuỗi Phần 1: Ràng Buộc Bất Biến',
      content: `
        <p>Bạn còn nhớ thuật ngữ <strong>dãy tuần tự bất biến (immutable sequence)</strong> không? Như chúng ta đã thấy, là một dãy tuần tự đồng nghĩa với việc chuỗi hỗ trợ các thao tác như nối chuỗi, lặp lại, chỉ mục và slice.</p>

        <p>Phần <strong>bất biến (immutable)</strong> có nghĩa là bạn <strong>không thể thay đổi một chuỗi tại chỗ</strong>—chẳng hạn như bằng cách gán giá trị mới cho một chỉ mục:</p>
        <pre class="code-pre"><code>>>> S = 'text'
>>> S[0] = 'n'
TypeError: 'str' object does not support item assignment</code></pre>

        <p>Vậy làm thế nào để sửa đổi thông tin văn bản trong Python? Để thay đổi một chuỗi, nhìn chung bạn cần <strong>xây dựng một chuỗi mới</strong> bằng cách sử dụng các công cụ như nối chuỗi (<code>+</code>) và cắt lát (<code>slice</code>), rồi <strong>gán lại kết quả cho tên biến ban đầu</strong> của chuỗi nếu muốn cập nhật:</p>
      `,
      codeExamples: [
        {
          title: 'Kỹ thuật tạo chuỗi mới thay thế cho phép sửa đổi tại chỗ',
          code: `S = 'text'

# Thêm chuỗi con vào cuối bằng phép nối:
S = S + 'ual!'
print("Sau khi nối:", repr(S))

# Thay thế đoạn giữa bằng slice, chỉ mục và nối chuỗi:
S = S[:4] + ' processing' + S[-1]
print("Sau khi chèn đoạn giữa:", repr(S))

# Thay thế bằng phương thức replace():
S_word = 'text'
S_replaced = S_word.replace('ex', 'hough')
print("Dùng replace():", repr(S_replaced))`,
          output: `Sau khi nối: 'textual!'
Sau khi chèn đoạn giữa: 'text processing!'
Dùng replace(): 'thought'`,
          annotations: [
            { line: 4, text: 'S + \'ual!\' tạo một chuỗi mới và gán lại cho biến S.' },
            { line: 8, text: 'S[:4] lấy \'text\', ghép với \' processing\', rồi ghép với ký tự cuối S[-1] (\'!\').' },
            { line: 13, text: 'Phương thức replace cũng tạo ra một chuỗi mới tinh trong bộ nhớ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Hiệu Quả của Bộ Dọn Rác (Garbage Collection) & Khung Chuyên Đề bytearray',
      content: `
        <p>Việc tạo ra một đối tượng chuỗi mới cho mỗi lần thay đổi nghe qua có vẻ tốn kém về bộ nhớ, nhưng trên thực tế <strong>nó không hề kém hiệu quả như bạn tưởng</strong>.</p>

        <p>Hãy nhớ lại cơ chế quản lý bộ nhớ đã thảo luận ở Chương 6: Python sở hữu một bộ <strong>thu gom rác tự động (garbage collection)</strong> hoạt động dựa trên bộ đếm tham chiếu (reference counting). Khi bạn gán lại <code>S = S + 'ual!'</code>, đối tượng chuỗi cũ <code>'text'</code> không còn bất kỳ biến nào trỏ tới, vùng không gian bộ nhớ của nó lập tức được thu hồi về vùng nhớ rảnh (free memory pool). Nhờ đó, các đối tượng mới hơn sẽ tái sử dụng chính vùng không gian đó một cách cực kỳ tối ưu.</p>

        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-top:20px;">
          <div class="callout-header">
            <span>🔍</span>
            <span><strong>Khung chuyên đề: Ngoại trừ bytearray</strong></span>
          </div>
          <div class="callout-body">
            <p>Như đã giới thiệu sơ lược ở Chương 4 và sẽ được trình bày ở Chương 37, Python có một kiểu chuỗi mang tên <strong><code>bytearray</code> (mảng byte khả biến)</strong>, vốn có tính khả biến và do đó <strong>có thể được thay đổi tại chỗ</strong>. Các đối tượng <code>bytearray</code> là các dãy tuần tự chứa các số nguyên nhỏ 8-bit (0..255). Chúng hỗ trợ hầu hết các thao tác tương tự như chuỗi thông thường và in ra dưới dạng các ký tự ASCII khi hiển thị. Chúng cung cấp một giải pháp thay thế tối ưu cho khối lượng lớn văn bản 8-bit cần thay đổi liên tục.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khám phá mảng byte khả biến bytearray sửa đổi tại chỗ',
          code: `# Khởi tạo mảng byte khả biến từ chuỗi byte
ba = bytearray(b'text')
print("bytearray ban đầu:", ba)

# Thay đổi tại chỗ ký tự đầu tiên (code point 'n' là 110)
ba[0] = ord('n')
print("Sau khi sửa ba[0] = ord('n'):", ba)

# Thay đổi ký tự thứ hai
ba[1] = ord('e')
ba[2] = ord('x')
ba[3] = ord('t')
print("Khôi phục lại:", ba)`,
          output: `bytearray ban đầu: bytearray(b'text')
Sau khi sửa ba[0] = ord('n'): bytearray(b'next')
Khôi phục lại: bytearray(b'text')`,
          annotations: [
            { line: 2, text: 'bytearray là kiểu dãy tuần tự khả biến (mutable sequence).' },
            { line: 6, text: 'ba[0] cho phép gán trực tiếp tại chỗ, không sinh ra đối tượng mới.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Bảo toàn dữ liệu nhờ tính bất biến',
        content: 'Tính bất biến của chuỗi mang lại sự an toàn tuyệt đối khi truyền dữ liệu qua các hàm và module. Bạn có thể truyền một chuỗi đi khắp chương trình mà không bao giờ phải lo sợ bất kỳ đoạn mã của lập trình viên khác vô tình làm thay đổi nội dung của nó ở nơi khác.'
      }
    ],
    pitfalls: [
      {
        title: 'Chữ hoa luôn nhỏ hơn chữ thường trong bảng mã ASCII',
        content: 'Vì <code>ord(\'Z\') = 90</code> nhỏ hơn <code>ord(\'a\') = 97</code>, nên trong so sánh chuỗi: <code>\'Zoo\' < \'apple\'</code> trả về <code>True</code>! Khi cần so sánh không phân biệt hoa/thường, hãy chuẩn hóa bằng <code>S.lower()</code> hoặc <code>S.casefold()</code> trước khi so sánh.'
      }
    ]
  },

  exercises: [
    {
      title: 'Thay thế ký tự đầu tiên của chuỗi bất biến mà không gây lỗi',
      level: 'Dễ',
      problem: 'Cho chuỗi text = "Hello World". Hãy viết một đoạn mã biểu diễn cách thay thế chữ \'H\' đầu tiên thành chữ \'J\' để tạo ra chuỗi "Jello World", sau đó giải thích ngắn gọn bằng ghi chú vì sao không thể viết text[0] = \'J\'.',
      hint: 'Dùng phép cắt lát text[1:] để lấy phần đuôi và ghép với \'J\' ở đầu: \'J\' + text[1:].',
      solutionCode: `text = "Hello World"

# text[0] = 'J'  # Sẽ gây TypeError: 'str' object does not support item assignment!

# Giải pháp chuẩn: Cắt lát và nối chuỗi mới
new_text = 'J' + text[1:]
print("Chuỗi ban đầu:", text)
print("Chuỗi sau khi đổi ký tự đầu:", new_text)`,
      solutionOutput: `Chuỗi ban đầu: Hello World
Chuỗi sau khi đổi ký tự đầu: Jello World`,
      explanation: 'Vì chuỗi str là đối tượng bất biến, việc gán vào chỉ mục bị Python chặn lại để bảo toàn dữ liệu. Bằng cách lấy \'J\' ghép với phần cắt lát text[1:], chúng ta tạo ra đối tượng chuỗi mới một cách an toàn và đúng chuẩn.'
    }
  ],

  quiz: [
    {
      question: 'Khi thực hiện so sánh \'Python\' > \'python\' trong Python, kết quả trả về là gì và vì sao?',
      options: [
        'True, vì chữ cái in hoa có quyền ưu tiên cao hơn chữ thường.',
        'False, vì trong bảng mã ASCII/Unicode chữ cái hoa \'P\' (80) có mã số nguyên nhỏ hơn chữ thường \'p\' (112).',
        'True, vì độ dài hai chuỗi bằng nhau.',
        'Lỗi TypeError vì không thể so sánh hai chuỗi có trạng thái viết hoa khác nhau.'
      ],
      correctIndex: 1,
      explanation: 'Python so sánh theo thứ tự từ điển dựa trên code point. ord(\'P\') là 80, nhỏ hơn ord(\'p\') là 112, do đó \'Python\' > \'python\' trả về False.'
    },
    {
      question: 'Điểm khác biệt quan trọng nhất giữa kiểu chuỗi str và kiểu bytearray trong Python là gì?',
      options: [
        'str chỉ chứa văn bản ASCII, còn bytearray chỉ chứa văn bản tiếng Việt.',
        'str là kiểu dãy tuần tự bất biến, trong khi bytearray là kiểu dãy tuần tự khả biến cho phép sửa đổi tại chỗ.',
        'str không hỗ trợ cắt lát, trong khi bytearray hỗ trợ cắt lát mở rộng.',
        'bytearray tự động nén dữ liệu dung lượng lớn để lưu vào đĩa cứng.'
      ],
      correctIndex: 1,
      explanation: 'str là đối tượng bất biến (không thể sửa tại chỗ); trong khi bytearray là đối tượng khả biến (mutable), cho phép gán trực tiếp tại các chỉ mục vị trí.'
    }
  ],

  summary: [
    'Python so sánh chuỗi theo thứ tự từ điển (lexicographical) từ trái sang phải dựa vào giá trị code point của từng ký tự.',
    'Chuỗi dài hơn sẽ thắng nếu một chuỗi là tiền tố của chuỗi kia (ví dụ \'hacker\' > \'hack\').',
    'Chuỗi là bất biến (immutable): cấm gán tại chỗ S[0] = \'x\' với lỗi TypeError.',
    'Để sửa đổi chuỗi, tạo một chuỗi mới bằng phép nối (+), cắt lát (slice) hoặc phương thức replace() rồi gán lại biến.',
    'Bộ thu gom rác tự động (GC) giải phóng vùng nhớ cũ ngay lập tức, giúp việc tạo chuỗi mới đạt hiệu năng tối ưu.',
    'Khung chuyên đề bytearray giới thiệu mảng byte 8-bit khả biến cho phép thay đổi ký tự tại chỗ khi cần xử lý dữ liệu lớn.'
  ]
};
