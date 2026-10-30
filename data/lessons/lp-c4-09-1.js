export default {
  id: 'lp-c4-09-1',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.9.1',
  title: 'Tệp: Đối tượng Tệp cốt lõi và Thao tác Văn bản',
  subtitle: 'Hàm open(), các chế độ truy cập (r, w), ghi dữ liệu, đọc chuỗi, và đóng tệp an toàn',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu vị trí đặc biệt của đối tượng tệp: là kiểu cốt lõi duy nhất không có cú pháp biểu diễn hằng (no literal syntax).',
    'Sử dụng hàm dựng sẵn open() với các chế độ "w" (ghi mới) và "r" (đọc).',
    'Thực hiện các thao tác cơ bản: write(), close(), read(), và readline().',
    'Áp dụng vòng lặp for line in open(...) để đọc tệp dòng theo dòng với bộ nhớ tối ưu.'
  ],

  intuition: {
    title: 'Đường ống nối từ chương trình xuống đĩa cứng',
    metaphor: 'Các đối tượng như số, chuỗi, danh sách chỉ tồn tại tạm thời trong bộ nhớ RAM và sẽ biến mất khi tắt máy. Tệp tin (file) giống như một chiếc vòi nước kết nối trực tiếp bộ nhớ RAM của Python với kho lưu trữ vĩnh viễn trên ổ đĩa cứng. Hàm open() mở van nước, write() bơm dữ liệu qua vòi xuống đĩa, và close() khóa van lại để đảm bảo không một giọt dữ liệu nào bị kẹt lại trong đường ống trung gian.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">VÒNG ĐỜI THAO TÁC TỆP CƠ BẢN</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;">
          <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;text-align:center;">
            <div style="font-weight:700;color:var(--accent-primary);">1. open('data.txt', 'w')</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Mở/tạo tệp ghi</div>
          </div>
          <div style="color:var(--text-muted);font-weight:700;">➔</div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;text-align:center;">
            <div style="font-weight:700;color:var(--success);">2. f.write('Hello\\n')</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Ghi dữ liệu vào đệm</div>
          </div>
          <div style="color:var(--text-muted);font-weight:700;">➔</div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;text-align:center;">
            <div style="font-weight:700;color:var(--warning);">3. f.close()</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Đẩy ra đĩa & đóng</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Đối tượng Tệp Cốt lõi (File Objects)',
      content: `
        <p>Đối tượng <strong>tệp (file)</strong> là kiểu dữ liệu cốt lõi chính của Python dùng để tương tác với hệ thống tệp tin trên máy tính của bạn. Chúng đóng vai trò giao diện chính để xuất nhập dữ liệu bền vững (I/O).</p>
        <p>Một điểm đặc biệt cần lưu ý: <strong>Tệp không có cú pháp hằng (literal syntax)</strong>. Không có cặp ngoặc nhọn hay ngoặc vuông nào để tạo tệp. Cách duy nhất để khởi tạo một đối tượng tệp là gọi hàm dựng sẵn <code>open()</code> của Python.</p>
      `
    },
    {
      id: 'sec-2',
      title: '2. Mở, Ghi Dữ liệu và Đóng Tệp',
      content: `
        <p>Để tạo và ghi dữ liệu ra một tệp mới, ta truyền tên tệp cùng chế độ <code>'w'</code> (write mode) vào hàm <code>open()</code>. Phương thức <code>write()</code> nhận một chuỗi văn bản và ghi trực tiếp vào tệp:</p>
      `,
      codeExamples: [
        {
          title: 'Tạo tệp mới và ghi văn bản',
          code: `>>> f = open('data.txt', 'w')     # Tạo tệp mới data.txt ở chế độ ghi ('w')
>>> f.write('Hello\\n')            # Ghi dòng chữ thứ nhất (kèm ký tự xuống dòng)
6
>>> f.write('world\\n')            # Ghi dòng chữ thứ hai
6
>>> f.close()                      # Đẩy bộ đệm ra đĩa và đóng tệp`,
          output: `6
6`,
          annotations: [
            { line: 1, text: 'Hàm open tạo đối tượng tệp f kết nối tới data.txt.' },
            { line: 2, text: 'write() trả về số ký tự đã được ghi vào tệp (trong Python 3).' },
            { line: 6, text: 'close() đóng tệp, đảm bảo toàn bộ dữ liệu từ bộ đệm đã nằm trọn trên đĩa cứng.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Mở để Đọc Dữ liệu: read() và readline()',
      content: `
        <p>Để đọc lại dữ liệu từ tệp, ta gọi <code>open('data.txt')</code> mà không cần truyền chế độ (hoặc truyền tường minh <code>'r'</code> vì chế độ đọc <code>'r'</code> là mặc định):</p>
        <ul>
          <li><code>f.read()</code>: Đọc toàn bộ nội dung tệp vào một biến chuỗi duy nhất (bao gồm cả các ký tự <code>\\n</code>).</li>
          <li><code>f.readline()</code>: Đọc từng dòng một tại một thời điểm cho đến khi gặp chuỗi rỗng <code>''</code> (dấu hiệu kết thúc tệp EOF).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Đọc toàn bộ nội dung tệp',
          code: `>>> f = open('data.txt')           # Mở tệp data.txt ở chế độ đọc mặc định ('r')
>>> text = f.read()                # Đọc toàn bộ nội dung thành một chuỗi
>>> text
'Hello\\nworld\\n'
>>> print(text)                    # In văn bản với định dạng xuống dòng chuẩn
Hello
world
>>> f.close()`,
          output: `'Hello\\nworld\\n'
Hello
world`,
          annotations: [
            { line: 2, text: 'f.read() lấy toàn bộ nội dung tệp thành một chuỗi str duy nhất.' },
            { line: 4, text: 'print(text) hiển thị các ký tự xuống dòng \\n thành các dòng văn bản thực.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Lặp Từng Dòng Tối ưu Bộ nhớ với for line in open(...)',
      content: `
        <p>Nếu bạn cần xử lý một tệp nhật ký (log file) dung lượng hàng chục Gigabyte, việc gọi <code>f.read()</code> sẽ làm tràn bộ nhớ RAM ngay lập tức!</p>
        <p>May mắn thay, các đối tượng tệp trong Python hỗ trợ trực tiếp <strong>Giao thức lặp (Iteration Protocol)</strong>. Bạn có thể đặt đối tượng tệp trực tiếp vào vòng lặp <code>for</code>. Python sẽ chỉ nạp từng dòng một vào bộ nhớ tại mỗi thời điểm:</p>
      `,
      codeExamples: [
        {
          title: 'Đọc dòng theo dòng cực kỳ hiệu quả với vòng lặp for',
          code: `>>> for line in open('data.txt'):
...     print(line, end='')
... 
Hello
world`,
          output: `Hello
world`,
          annotations: [
            { line: 1, text: 'Tự động mở tệp và sử dụng iterator để đọc từng dòng khi cần.' },
            { line: 2, text: 'end=\'\' để tránh in thêm dòng trống do line đã có sẵn ký tự \\n ở cuối.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Quên đóng tệp (File Descriptor Leak)',
        content: `
          <p>Mặc dù bộ dọn rác của Python sẽ tự động đóng tệp khi đối tượng tệp bị thu hồi, nhưng việc không đóng tệp tường minh có thể khiến dữ liệu chưa kịp đẩy từ bộ đệm ra đĩa nếu chương trình gặp sự cố đột ngột. Hơn nữa, hệ điều hành chỉ cấp một số lượng hữu hạn handle mở tệp.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Cú pháp with open(...) as f:',
        content: `
          <p>Mặc dù trong Chương 4 Mark Lutz giới thiệu cặp <code>open() / close()</code> cơ bản, trong thực tế bạn nên sử dụng cấu trúc quản lý ngữ cảnh (context manager):</p>
          <pre><code>with open('data.txt') as f:
    text = f.read()</code></pre>
          <p>Khối lệnh <code>with</code> đảm bảo tệp luôn luôn được đóng tự động ngay cả khi có ngoại lệ xảy ra bên trong khối lệnh.</p>
        `
      }
    ],
    deepDive: {
      title: 'Bộ đệm I/O trong CPython',
      content: `
        <p>Khi bạn gọi <code>f.write()</code>, dữ liệu không được ghi ngay lập tức xuống phiến đĩa cứng vì thao tác vật lý trên đĩa rất chậm. CPython gom các chuỗi ghi vào một bộ nhớ đệm (buffer) trung gian trong RAM. Chỉ khi bộ đệm đầy hoặc khi hàm <code>f.flush()</code> / <code>f.close()</code> được gọi, toàn bộ khối dữ liệu mới thực sự được đẩy xuống tầng lưu trữ của hệ điều hành.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Ghi danh sách việc cần làm ra tệp',
      level: 'Dễ',
      description: 'Cho danh sách công việc <code>todos = ["Đọc sách Python", "Viết code thực hành", "Nghỉ ngơi"]</code>. Hãy mở tệp <code>todo.txt</code> để ghi mỗi công việc trên một dòng riêng biệt, sau đó đóng tệp lại.',
      starterCode: `todos = ["Đọc sách Python", "Viết code thực hành", "Nghỉ ngơi"]

# Ghi todos vào tệp todo.txt
`,
      solution: `todos = ["Đọc sách Python", "Viết code thực hành", "Nghỉ ngơi"]

f = open('todo.txt', 'w', encoding='utf-8')
for task in todos:
    f.write(task + '\\n')
f.close()

# Kiểm tra lại nội dung
for line in open('todo.txt', encoding='utf-8'):
    print(line.strip())`,
      solutionOutput: `Đọc sách Python
Viết code thực hành
Nghỉ ngơi`,
      explanation: 'Duyệt từng phần tử, nối thêm ký tự xuống dòng <code>\\n</code> và gọi <code>f.write()</code>.'
    },
    {
      title: 'Đếm số dòng và số từ trong tệp văn bản',
      level: 'Vừa',
      description: 'Hãy viết hàm <code>count_file_stats(filename)</code> nhận tên tệp, sử dụng vòng lặp <code>for line in open(...)</code> để đếm và trả về bộ giá trị <code>(tổng_số_dòng, tổng_số_từ)</code>.',
      starterCode: `def count_file_stats(filename):
    pass
`,
      solution: `def count_file_stats(filename):
    line_count = 0
    word_count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            line_count += 1
            word_count += len(line.split())
    return line_count, word_count`,
      solutionOutput: `(Ví dụ trả về: (2, 2))`,
      explanation: 'Duyệt từng dòng giúp tính toán thống kê mà không cần nạp toàn bộ tệp vào RAM.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về đối tượng tệp trong Python?',
      options: [
        'Tệp được tạo bằng cú pháp hằng {...}.',
        'Tệp là kiểu đối tượng cốt lõi duy nhất không có cú pháp hằng (literal syntax), chỉ được tạo qua hàm open().',
        'Tệp chỉ đọc được các con số nhị phân.',
        'Hàm open() bắt buộc phải truyền đường dẫn tuyệt đối.'
      ],
      correctIndex: 1,
      explanation: 'Tệp không có ký hiệu biểu diễn hằng, luôn được khởi tạo thông qua hàm open().'
    },
    {
      question: 'Chế độ mở tệp nào sau đây là mặc định nếu bạn chỉ gọi open(\'data.txt\')?',
      options: [
        '\'w\' (Ghi đè)',
        '\'a\' (Ghi nối tiếp)',
        '\'r\' (Đọc)',
        '\'b\' (Nhị phân)'
      ],
      correctIndex: 2,
      explanation: 'Chế độ mặc định của hàm open() luôn là \'r\' (đọc văn bản).'
    },
    {
      question: 'Tại sao nên ưu tiên cú pháp for line in open(filename): thay vì open(filename).read().splitlines() khi xử lý tệp lớn?',
      options: [
        'Vì for line in open(...) nạp toàn bộ tệp vào RAM cùng lúc.',
        'Vì nó sử dụng giao thức lặp để chỉ nạp từng dòng một vào bộ nhớ, tránh làm tràn RAM.',
        'Vì read() bị giới hạn tối đa 1000 dòng.',
        'Vì splitlines() không hỗ trợ ký tự tiếng Việt.'
      ],
      correctIndex: 1,
      explanation: 'Iterator của tệp đọc dữ liệu theo yêu cầu (streamed on-demand), giữ mức tiêu thụ RAM luôn thấp và ổn định.'
    }
  ],

  summary: [
    'Tệp (file) là đối tượng cốt lõi dùng để đọc và ghi dữ liệu ra hệ thống lưu trữ bền vững.',
    'Tệp không có cú pháp hằng (no literal syntax), luôn được tạo thông qua hàm open().',
    'Các thao tác cơ bản: write() ghi dữ liệu, close() xả bộ đệm và đóng handle, read() đọc toàn bộ văn bản.',
    'Vòng lặp for line in open(...) là kỹ thuật đọc tệp chuẩn mực giúp tối ưu hóa bộ nhớ cho các tệp dữ liệu lớn.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 28–29.'
  ]
};
