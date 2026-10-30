export default {
  id: 'lp-c7-04',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.4',
  title: 'Chuỗi khối nháy ba: Dữ liệu nhiều dòng, Docstring & Bẫy chú thích',
  subtitle: 'Cú pháp chuỗi nháy ba, giữ nguyên ngắt dòng vật lý, ứng dụng nhúng HTML/XML/docstring, bẫy chú thích # và mẹo tắt khối lệnh',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cú pháp chuỗi khối (block string) sử dụng ba dấu nháy đơn (\'\'\') hoặc ba dấu nháy kép (""").',
    'Hiểu cách Python tự động gom ngắt dòng vật lý thành ký tự \\n và bảo lưu các khoảng trắng thụt lề.',
    'Nhận biết các ứng dụng phổ biến: nhúng dữ liệu cấu trúc (HTML, XML, JSON, YAML) và viết chuỗi tài liệu (docstring).',
    'Tránh bẫy chú thích (#) bị vô tình nuốt trọn vào chuỗi nháy ba và phương pháp thay thế bằng dấu ngoặc đơn.',
    'Hiểu thói quen tạm thời vô hiệu hóa khối mã bằng nháy ba và triết lý "tính thực tiễn chiến thắng tính thẩm mỹ".'
  ],

  intuition: {
    title: 'Chiếc máy ảnh chụp nguyên văn và chiếc bẫy chú thích',
    metaphor: 'Nếu như các chuỗi thông thường (nháy đơn hay nháy kép) chỉ ghi nhận những gì nằm trên một dòng duy nhất, thì chuỗi dấu nháy ba (""" hoặc \'\'\') giống như một chiếc máy ảnh chụp nguyên văn toàn bộ khung cảnh: từ từng điểm ngắt dòng, từng khoảng trắng thụt lề cho đến các đoạn văn nhiều trang. Tuy nhiên, chiếc máy ảnh này không biết phân biệt đâu là văn bản và đâu là lời chú thích của lập trình viên! Bất kỳ dấu thăng (#) hay dòng bình luận nào bạn viết ở bên trong phạm vi của ba dấu nháy đều sẽ bị máy ảnh chụp lại và biến thành một phần không thể tách rời của chuỗi văn bản.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHUỖI KHỐI NHÁY BA: LỢI ÍCH & BẪY CHÚ THÍCH</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--danger);border-radius:8px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">Bẫy Chú Thích Bị Nuốt</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>menu = """</code><br>
              <code>Open  # Chú thích ở đây!</code><br>
              <code>Save  # Tương tự</code><br>
              <code>"""</code><br>
              <span style="color:var(--danger);">❌ Lời chú thích trở thành nội dung chuỗi!</span>
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Giải Pháp Dấu Ngoặc Đơn</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              <code>menu = (</code><br>
              <code>  'Open\\n'   # Chú thích bỏ qua</code><br>
              <code>  'Save\\n'   # Hoàn toàn an toàn</code><br>
              <code>)</code><br>
              <span style="color:var(--success);">✓ Chú thích bị trình biên dịch loại bỏ</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Cú pháp Chuỗi Khối Dấu Nháy Ba',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 11 / 52 – Trang 13 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Python có một định dạng hằng chuỗi dấu nháy ba, đôi khi được gọi là <strong>chuỗi khối (block string)</strong>, vốn là một sự tiện lợi lớn về mặt cú pháp để viết mã cho dữ liệu trải dài trên nhiều dòng.</p>

        <p>Dạng này bắt đầu bằng ba dấu nháy (thuộc loại nháy đơn <code>'''</code> hoặc nháy kép <code>"""</code>), theo sau bởi số dòng văn bản tùy ý, và được đóng lại bằng chính chuỗi ba dấu nháy đã mở đầu nó. Các dấu nháy đơn và nháy kép thông thường được nhúng bên trong văn bản của chuỗi có thể xuất hiện tự do mà không bắt buộc phải thoát—chuỗi sẽ chỉ kết thúc khi Python bắt gặp ba dấu nháy không bị thoát cùng loại:</p>
      `,
      codeExamples: [
        {
          title: 'Khai báo chuỗi nhiều dòng bằng dấu nháy ba',
          code: `quip = """Python strings
 sure have
a lot of options"""

# REPL hiển thị chuỗi có nhúng \\n tại các điểm ngắt dòng
print("repr(quip):", repr(quip))

# In trực tiếp: các dòng mới và khoảng trắng đầu dòng được diễn giải
print("\\nKết quả in trực tiếp:")
print(quip)`,
          output: `repr(quip): 'Python strings\\n sure have\\na lot of options'

Kết quả in trực tiếp:
Python strings
 sure have
a lot of options`,
          annotations: [
            { line: 1, text: 'Chuỗi khối bắt đầu bằng """ và trải dài qua ba dòng vật lý.' },
            { line: 6, text: 'Python tự động chèn ký tự dòng mới \\n tại các vị trí Enter ngắt dòng.' },
            { line: 11, text: 'Dòng thứ hai có khoảng trắng ở đầu, dòng thứ ba thì không—những gì gõ thực sự là những gì nhận được.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bẫy Chú thích (#) & Giải pháp Dấu Ngoặc Đơn',
      content: `
        <p>Một điểm hết sức quan trọng mà nhiều người học thường mắc phải: <strong>các chuỗi dấu nháy ba sẽ giữ lại toàn bộ văn bản được bao bọc, bao gồm bất kỳ phần nào nằm ở bên phải mã mà bạn có ý định dùng làm chú thích</strong>.</p>

        <p>Nếu bạn đặt một chú thích <code># Chú thích ở đây</code> ở cuối dòng bên trong cặp nháy ba, Python sẽ không xem đó là lời bình luận mà sẽ cộng thẳng chuỗi chú thích đó vào giá trị của biến! Để tránh lỗi này, tác giả Mark Lutz hướng dẫn hai giải pháp:</p>
        <ol>
          <li>Đặt dòng chú thích <code>#</code> ở phía trên hoặc phía dưới hẳn khối dấu nháy ba.</li>
          <li>Sử dụng cơ chế <strong>tự động nối các chuỗi liền kề bên trong dấu ngoặc đơn <code>(...)</code></strong>:</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'So sánh bẫy chú thích nháy ba và giải pháp ngoặc đơn',
          code: `# Bẫy: Chú thích bị nuốt trọn vào chuỗi!
bad_menu = """
Open # Chú thích ở đây bị cộng vào chuỗi!
Save # Tương tự
"""
print("bad_menu repr:", repr(bad_menu))

# Giải pháp đúng: Dùng ngoặc đơn nối chuỗi tường minh
good_menu = (
    'Open\\n'   # Chú thích ở đây hoàn toàn bị trình biên dịch bỏ qua
    'Save\\n'   # Dòng mới được thêm tường minh bằng \\n
)
print("good_menu repr:", repr(good_menu))
print("\\ngood_menu hiển thị:\\n" + good_menu, end='')`,
          output: `bad_menu repr: '\\nOpen # Chú thích ở đây bị cộng vào chuỗi!\\nSave # Tương tự\\n'
good_menu repr: 'Open\\nSave\\n'

good_menu hiển thị:
Open
Save`,
          annotations: [
            { line: 2, text: 'Các ký tự sau dấu # bị gộp vào chuỗi vì nháy ba nuốt toàn bộ văn bản thô.' },
            { line: 9, text: 'Cặp ngoặc đơn cho phép trải dài biểu thức trên nhiều dòng; dấu # là comment Python chuẩn.' },
            { line: 15, text: 'good_menu chỉ chứa đúng hai dòng \'Open\\n\' và \'Save\\n\'.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ứng dụng Thực tế: Nhúng Dữ liệu, Docstring & Tắt Khối Mã',
      content: `
        <p>Vậy tại sao chuỗi dấu nháy ba lại được sử dụng phổ biến đến vậy? Có ba trường hợp kinh điển:</p>
        <ul>
          <li><strong>Nhúng dữ liệu cấu trúc nhiều dòng:</strong> Nhúng các đoạn thông báo lỗi nhiều dòng, mã HTML, XML, JSON, hoặc YAML trực tiếp trong tệp mã nguồn Python mà không cần phải đọc từ tệp bên ngoài hay thực hiện các phép nối chuỗi rườm rà.</li>
          <li><strong>Chuỗi tài liệu (docstring):</strong> Hằng chuỗi xuất hiện ở ngay đầu tệp module, hàm hoặc lớp để làm tài liệu hướng dẫn (sẽ học ở Chương 15). Lưu ý: nếu docstring chứa các ký tự gạch chéo ngược (ví dụ biểu thức chính quy), nên dùng chuỗi thô nháy ba <code>r"""..."""</code> để tránh cảnh báo cú pháp.</li>
          <li><strong>Vô hiệu hóa tạm thời khối mã trong quá trình gỡ lỗi:</strong> Một thói quen khá phổ biến là đặt ba dấu nháy ở trên và dưới một đoạn mã để tạm thời tắt nó đi mà không cần phải gõ dấu <code>#</code> cho từng dòng.</li>
        </ul>

        <p>Cách tắt khối mã này từng bị một số người gắn mác là <em>"chữa cháy vụng về khủng khiếp" (horribly hackish)</em> vì Python thực chất vẫn tạo ra một đối tượng chuỗi trong RAM. Tuy nhiên, tác giả Mark Lutz khẳng định rằng chi phí này là không đáng kể, và trong triết lý của Python: <strong>"Tính thực tiễn thường chiến thắng tính thẩm mỹ" (Practicality beats purity)</strong>.</p>
      `,
      codeExamples: [
        {
          title: 'Tạm thời vô hiệu hóa đoạn mã bằng dấu nháy ba',
          code: `x = 10

"""
# Đoạn mã dưới đây được tạm thời tắt đi trong khi thử nghiệm:
import os
print("Thư mục hiện tại:", os.getcwd())
x = x * 99
"""

y = 20
print("x =", x, "| y =", y)`,
          output: `x = 10 | y = 20`,
          annotations: [
            { line: 3, text: 'Khối lệnh nằm giữa cặp nháy ba trở thành một hằng chuỗi độc lập, không thực thi.' },
            { line: 11, text: 'Biến x vẫn giữ nguyên giá trị 10 ban đầu, y được tính bình thường.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào nên dùng chuỗi thô nháy ba r"""..."""?',
        content: 'Khi bạn viết chuỗi tài liệu docstring hoặc nhúng các mẫu biểu thức chính quy (regex), văn bản LaTeX hay đường dẫn thư mục có nhiều dấu gạch chéo ngược, hãy thêm tiền tố <code>r</code>: <code>r"""..."""</code>. Điều này giúp ngăn chặn các cảnh báo <code>SyntaxWarning</code> về ký tự thoát không hợp lệ trên Python 3.12+.'
      }
    ],
    pitfalls: [
      {
        title: 'Đừng quên \\n khi dùng kỹ thuật nối chuỗi trong ngoặc đơn',
        content: `Khác với chuỗi nháy ba tự động thêm <code>\\n</code> tại điểm ngắt dòng vật lý, các chuỗi con trong dấu ngoặc đơn <code>('a' 'b')</code> khi tự nối sẽ dính liền vào nhau: <code>'ab'</code>. Nếu muốn xuống dòng, bạn bắt buộc phải chủ động viết <code>\\n</code> ở cuối mỗi chuỗi con.`
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo đoạn mã HTML mẫu bằng chuỗi nháy ba',
      level: 'Dễ',
      problem: 'Hãy dùng chuỗi khối nháy ba để tạo ra một đoạn mã HTML có thụt lề chuẩn gồm thẻ <div class="card">, bên trong có <h1>Tiêu đề</h1> và <p>Nội dung</p>. In chuỗi ra màn hình và kiểm tra len() của nó.',
      hint: 'Dùng html_template = """<div class="card">...""" và in trực tiếp bằng print().',
      solutionCode: `html_template = """<div class="card">
  <h1>Tiêu đề bài học</h1>
  <p>Nội dung chuỗi khối nháy ba trong Python.</p>
</div>"""

print("Đoạn mã HTML được nhúng:")
print(html_template)
print("Tổng số ký tự len:", len(html_template))`,
      solutionOutput: `Đoạn mã HTML được nhúng:
<div class="card">
  <h1>Tiêu đề bài học</h1>
  <p>Nội dung chuỗi khối nháy ba trong Python.</p>
</div>
Tổng số ký tự len: 98`,
      explanation: 'Chuỗi nháy ba bảo toàn toàn bộ cấu trúc xuống dòng và các khoảng trắng thụt lề 2 dấu cách của thẻ HTML, giúp mã nguồn Python nhúng văn bản có cấu trúc vô cùng trực quan và trong sáng.'
    }
  ],

  quiz: [
    {
      question: 'Điều gì sẽ xảy ra nếu bạn đặt một chú thích dạng # Lưu ý ở cuối một dòng nằm bên trong chuỗi dấu nháy ba """?',
      options: [
        'Trình thông dịch Python tự động nhận diện và loại bỏ chú thích đó khỏi chuỗi.',
        'Python báo lỗi cú pháp SyntaxError: unexpected character inside multiline string.',
        'Toàn bộ đoạn chữ sau dấu # sẽ bị lưu trữ như một phần nội dung thực của chuỗi.',
        'Dòng chứa dấu # sẽ bị bỏ qua và không được in ra khi gọi hàm print().'
      ],
      correctIndex: 2,
      explanation: 'Chuỗi nháy ba lưu giữ nguyên văn mọi ký tự nằm giữa cặp mở và đóng nháy. Ký tự # bên trong không đóng vai trò là chú thích mà chỉ là một ký tự chuỗi bình thường.'
    },
    {
      question: 'Giải pháp nào sau đây giúp viết chuỗi nhiều dòng có chú thích # mà không bị nuốt vào chuỗi?',
      options: [
        'Bao bọc các chuỗi con có chứa \\n bên trong cặp dấu ngoặc đơn: (\'line1\\n\' \'line2\\n\').',
        'Thêm tiền tố r vào trước dấu nháy ba: r"""...""".',
        'Dùng hai dấu thăng ## thay vì một dấu thăng #.',
        'Khai báo chuỗi trong một khối hàm với từ khóa def.'
      ],
      correctIndex: 0,
      explanation: 'Bao bọc các hằng chuỗi liền kề trong cặp ngoặc đơn (...) cho phép trải dài biểu thức qua nhiều dòng, đồng thời bạn có thể viết chú thích # tự do ở cuối mỗi dòng mà không sợ bị cộng vào chuỗi.'
    }
  ],

  summary: [
    'Chuỗi khối nháy ba (\'\'\' hoặc """) cho phép viết chuỗi trải dài trên nhiều dòng một cách tự nhiên.',
    'Python tự động chuyển các điểm ngắt dòng vật lý thành ký tự \\n và bảo lưu nguyên vẹn các khoảng trắng thụt lề.',
    'Chú thích # đặt bên trong nháy ba sẽ bị nuốt trọn vào chuỗi; hãy dùng giải pháp ngoặc đơn (...) nếu cần comment từng dòng.',
    'Nháy ba là công cụ lý tưởng để nhúng mã HTML, XML, JSON, thông báo lỗi nhiều dòng và viết docstring.',
    'Dùng nháy ba để tạm thời vô hiệu hóa khối lệnh phản ánh triết lý của Python: "Tính thực tiễn chiến thắng tính thẩm mỹ".'
  ]
};
