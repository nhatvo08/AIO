export default {
  id: 'lp-c4-05-6',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.5.6',
  title: 'Chuỗi ký tự: Các cách khác để viết mã chuỗi',
  subtitle: 'Ký tự thoát escape sequences, byte không nhị phân \\0, nháy đơn/kép, chuỗi nhiều dòng nháy ba và chuỗi thô raw strings',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ các ký tự thoát dấu gạch chéo ngược (\\n, \\t, \\0, \\xNN) và cách Python hiển thị ký tự không in được.',
    'Hiểu vì sao byte không nhị phân \\0 không làm kết thúc chuỗi trong Python (khác với ngôn ngữ C).',
    'Sử dụng linh hoạt dấu nháy đơn, nháy kép và kỹ thuật nhúng nháy lẫn nhau.',
    'Viết chuỗi nhiều dòng bằng dấu nháy ba (""" hoặc \'\'\') để nhúng tài liệu, cấu hình hoặc vô hiệu hóa mã.',
    'Áp dụng chuỗi thô (raw string r\'...\') để xử lý biểu thức chính quy và đường dẫn Windows an toàn.'
  ],

  intuition: {
    title: 'Những chiếc áo khoác đặc biệt cho văn bản',
    metaphor: 'Bình thường một chuỗi ký tự mặc chiếc áo nháy đơn giản \'...\' để đi dạo. Nhưng khi gặp những tình huống hiểm trở: có gió lốc xuống dòng, có ký tự tab thụt lề, hay cần chui qua đường hầm Windows ngoằn ngoèo đầy dấu gạch chéo ngược C:\\\\Users, chuỗi cần những chiếc áo giáp chuyên dụng: Áo chống nước nháy ba """...""" để trải dài nhiều tầng mà không rách, hoặc chiếc áo khiên Raw r\'...\' biến toàn bộ dấu gạch chéo ngược thành những ký tự trần trụi vô hại, không bị kích hoạt cơ chế thoát bất ngờ.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢNG CÔNG CỤ CÁC DẠNG VIẾT MÃ CHUỖI</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">Ký tự thoát Escape</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;"><code>'A\\nB\\tC'</code> (len = 5)<br>Mỗi chuỗi thoát chỉ là 1 ký tự duy nhất trong bộ nhớ.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">Nháy ba nhiều dòng</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;"><code>""" dòng 1 ... dòng 2 """</code><br>Tự động thêm \\n ở chỗ ngắt dòng, nhúng HTML/JSON.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);">Chuỗi thô Raw (r)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;"><code>r'C:\\Users\\you\\code'</code><br>Tắt cơ chế thoát, giữ nguyên dấu gạch chéo ngược.</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Chuỗi Thoát Dấu Gạch chéo ngược (Escape Sequences)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 13–14 / 38</strong>.</p>
          </div>
        </div>

        <p>Python cung cấp nhiều cách khác nhau để chúng ta viết mã chuỗi ký tự. Ví dụ, các ký tự đặc biệt có thể được biểu diễn dưới dạng <strong>các chuỗi thoát dấu gạch chéo ngược (backslash escape sequence)</strong>, mà Python hiển thị dưới dạng ký hiệu thoát hệ thập lục phân <code>\\xNN</code>, trừ khi chúng đại diện cho các ký tự in ra được:</p>
        <ul>
          <li><code>\\n</code> biểu thị ký tự xuống dòng (newline).</li>
          <li><code>\\t</code> biểu thị ký tự tab cách dòng.</li>
          <li>Mỗi chuỗi thoát dù gõ hai ký tự trên bàn phím nhưng <strong>chỉ đại diện cho đúng một ký tự duy nhất trong bộ nhớ</strong>.</li>
          <li><code>\\0</code> là byte không nhị phân (binary zero). Khác với ngôn ngữ C (nơi ký tự null <code>\\0</code> làm kết thúc chuỗi), trong Python <strong>chuỗi lưu rõ độ dài tường minh nên <code>\\0</code> không hề kết thúc chuỗi</strong>, nó chỉ là một ký tự bình thường.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Ký tự thoát escape và byte không nhị phân \\0 trong REPL',
          code: `>>> S = 'A\\nB\\tC'
>>> len(S)                           # Ký tự thoát: \\n là xuống dòng, \\t là tab
5                                    # Mỗi chuỗi thoát chỉ đại diện cho một ký tự

>>> S = 'A\\0B\\0C'                   # \\0, byte không nhị phân, không kết thúc chuỗi
>>> len(S)
5
>>> S                                # Ký tự không in được hiển thị ở dạng thoát hex \\xNN
'A\\x00B\\x00C'`,
          output: `5
5
'A\\x00B\\x00C'`,
          annotations: [
            { line: 2, text: 'len(\'A\\nB\\tC\') = 5: \'A\' (1), \'\\n\' (2), \'B\' (3), \'\\t\' (4), \'C\' (5).' },
            { line: 5, text: '\\0 nằm giữa chuỗi nhưng len vẫn trả về 5 đầy đủ.' },
            { line: 8, text: 'Ký tự null không in được ra terminal được hiển thị dưới dạng mã hex \\x00.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Dấu Nháy Đơn, Nháy Kép và Chuỗi Nhiều dòng Nháy Ba',
      content: `
        <p>Như đã gợi ý trước đó, Python cho phép chuỗi được đặt trong <strong>các dấu nháy đơn hoặc nháy kép</strong>—chúng mang ý nghĩa hoàn toàn như nhau nhưng cho phép nhúng loại dấu nháy còn lại vào bên trong mà không cần ký tự thoát (hầu hết lập trình viên thích dấu nháy đơn hơn để đỡ rối mắt, trừ phi họ vẫn còn vương vấn thói quen từ các ngôn ngữ khác).</p>
        <p>Bạn cũng có thể viết các <strong>chuỗi ký tự nhiều dòng đặt trong dấu nháy ba</strong> (ba dấu nháy đơn <code>'''...'''</code> hoặc ba dấu nháy kép <code>"""..."""</code>):</p>
        <ul>
          <li>Khi sử dụng, tất cả các dòng được ghép nối lại với nhau.</li>
          <li>Ký tự xuống dòng (<code>\\n</code>) được tự động thêm vào những nơi có sự ngắt dòng vật lý.</li>
          <li>Rất hữu ích cho việc nhúng các đoạn mã HTML, YAML, hoặc JSON nhiều dòng vào tập lệnh Python, cũng như tạm thời vô hiệu hóa các dòng mã—chỉ cần thêm ba dấu nháy ở trên và ở dưới.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Chuỗi nhiều dòng bằng dấu nháy ba trong REPL',
          code: `>>> msg = """
... aaaaaaaaaaaa
... bbb'''bbb""bbb
... cccccccc
... """
>>> msg
'\\naaaaaaaaaaaa\\nbbb\\'\\'\\'bbb""bbb\\ncccccccc\\n'`,
          output: `'\\naaaaaaaaaaaa\\nbbb\\'\\'\\'bbb""bbb\\ncccccccc\\n'`,
          annotations: [
            { line: 1, text: 'Dấu nháy ba mở ra khối văn bản nhiều dòng.' },
            { line: 6, text: 'Kết quả hiển thị cho thấy các ký tự \\n được tự động chèn ở mỗi điểm ngắt dòng.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Chuỗi Thô (Raw Strings r\'...\')',
      content: `
        <p>Python cũng hỗ trợ <strong>chuỗi thô (raw string literal)</strong> giúp tắt hoàn toàn cơ chế thoát bằng dấu gạch chéo ngược. Các chuỗi như vậy bắt đầu bằng chữ cái <code>r</code> (hoặc <code>R</code>):</p>
        <blockquote>
          <em>"Chuỗi thô rất hữu ích cho các chuỗi như mẫu biểu thức chính quy (regular expressions), cùng các đường dẫn thư mục trên hệ điều hành Windows mà không cần phải nhân đôi dấu gạch chéo ngược (ví dụ: <code>r'C:\\Users\\you\\code'</code>)."</em>
        </blockquote>
      `,
      codeExamples: [
        {
          title: 'Đường dẫn Windows và chuỗi thô raw string',
          code: `>>> duong_dan_tho = r'C:\\Users\\you\\code'
>>> print(duong_dan_tho)
C:\\Users\\you\\code

>>> # Nếu không có tiền tố r, \\u sẽ bị hiểu nhầm là ký tự thoát Unicode!
>>> duong_dan_loi = 'C:\\\\Users\\\\you\\\\code'     # Phải gõ nhân đôi gạch chéo rất bất tiện
>>> print(duong_dan_loi)
C:\\Users\\you\\code`,
          output: `C:\\Users\\you\\code
C:\\Users\\you\\code`,
          annotations: [
            { line: 1, text: 'Tiền tố r giữ nguyên toàn bộ dấu gạch chéo ngược nguyên bản.' },
            { line: 5, text: 'Chuỗi thông thường buộc phải nhân đôi \\\\ để thoát dấu gạch chéo.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy dấu gạch chéo ngược ở cuối chuỗi thô',
        content: 'Một hạn chế cú pháp thú vị trong Python: một chuỗi thô <strong>không thể kết thúc bằng một số lẻ các dấu gạch chéo ngược</strong> (ví dụ <code>r"C:\\"</code> sẽ báo lỗi cú pháp) vì dấu gạch chéo ngược cuối cùng sẽ thoát luôn dấu nháy đóng. Cách khắc phục: dùng <code>r"C:\\path" + "\\\\"</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Viết đường dẫn tệp Windows chuẩn',
      level: 'Dễ',
      problem: 'Hãy viết một chuỗi thô lưu trữ đường dẫn tệp: <code>C:\\new_folder\\test.txt</code> mà không bị ký tự <code>\\n</code> và <code>\\t</code> làm hỏng văn bản.',
      hint: 'Thêm tiền tố <code>r</code> trước dấu nháy đơn.',
      solutionCode: `path = r'C:\\new_folder\\test.txt'
print(path)`,
      solutionOutput: `C:\\new_folder\\test.txt`,
      explanation: 'Tiền tố <code>r</code> ngăn chặn việc diễn giải <code>\\n</code> thành ký tự xuống dòng và <code>\\t</code> thành ký tự tab.'
    },
    {
      title: 'Nhúng chuỗi JSON nhiều dòng bằng nháy ba',
      level: 'Vừa',
      problem: 'Dùng cú pháp nháy ba để tạo một chuỗi lưu trữ dữ liệu JSON hợp lệ gồm tên và tuổi của một người, sau đó in ra màn hình.',
      hint: 'Đặt chuỗi bên trong <code>"""..."""</code>.',
      solutionCode: `json_data = """{
  "name": "Pat",
  "age": 40,
  "role": "developer"
}"""
print(json_data)`,
      solutionOutput: `{
  "name": "Pat",
  "age": 40,
  "role": "developer"
}`,
      explanation: 'Nháy ba cho phép bố trí khối văn bản nhiều dòng có thụt lề tự nhiên mà không cần nối chuỗi hay gõ thủ công <code>\\n</code>.'
    }
  ],

  quiz: [
    {
      question: 'Tại sao len(\'A\\nB\\tC\') lại trả về 5 thay vì 7?',
      options: [
        'Vì Python bỏ qua các ký tự chữ cái A, B, C.',
        'Vì mỗi chuỗi thoát \\n và \\t chỉ đại diện cho đúng MỘT ký tự duy nhất trong bộ nhớ.',
        'Vì hàm len() tự động làm tròn số.',
        'Vì hàm len() không đếm ký tự tab.'
      ],
      correctIndex: 1,
      explanation: 'Dấu gạch chéo ngược kết hợp với chữ cái đi liền sau tạo thành một escape sequence, chỉ chiếm 1 vị trí ký tự trong bộ nhớ.'
    },
    {
      question: 'Điều gì xảy ra khi chuỗi chứa ký tự byte không nhị phân \\0 (ví dụ \'A\\0B\') trong Python?',
      options: [
        'Chuỗi bị ngắt ngay tại chữ A giống như ngôn ngữ C, chuỗi chỉ có độ dài 1.',
        'Python báo lỗi SyntaxError.',
        'Python lưu trữ đầy đủ cả 3 ký tự, \\0 không làm kết thúc chuỗi và hiển thị dạng \\x00.',
        'Trình thông dịch tự động xóa bỏ ký tự \\0.'
      ],
      correctIndex: 2,
      explanation: 'Python theo dõi độ dài chuỗi bằng trường số nguyên rõ ràng trong CPython, do đó byte null \\0 hoàn toàn không làm ngắt chuỗi.'
    },
    {
      question: 'Tiền tố r trong chuỗi thô r\'C:\\path\\notes\' có tác dụng gì?',
      options: [
        'Đảo ngược thứ tự các ký tự trong chuỗi.',
        'Tắt hoàn toàn cơ chế ký tự thoát dấu gạch chéo ngược, giữ nguyên các ký tự \\ nguyên bản.',
        'Mã hóa chuỗi theo chuẩn ROT13.',
        'Chuyển đổi chuỗi thành kiểu số thực.'
      ],
      correctIndex: 1,
      explanation: 'Tiền tố r (raw string) giữ nguyên mọi dấu gạch chéo ngược như ký tự văn bản thông thường.'
    }
  ],

  summary: [
    'Ký tự thoát escape (\\n, \\t, \\xNN) biểu diễn các ký tự điều khiển đặc biệt; mỗi escape chỉ chiếm 1 ký tự.',
    'Byte không nhị phân \\0 không làm kết thúc chuỗi trong Python, khác biệt hoàn toàn với chuỗi trong C.',
    'Dấu nháy đơn và nháy kép tương đương, cho phép nhúng lẫn nhau thuận tiện.',
    'Dấu nháy ba (\"\"\" hoặc \'\'\') tạo chuỗi nhiều dòng, tự động giữ các ký tự xuống dòng \\n.',
    'Chuỗi thô (r\'...\') vô hiệu hóa cơ chế escape, giải pháp tối ưu cho đường dẫn Windows và Regex.',
    'Ý chính: Cú pháp viết chuỗi phong phú giúp Python xử lý mọi định dạng văn bản phức tạp một cách tự nhiên.'
  ]
};
