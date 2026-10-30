export default {
  id: 'lp-c7-07',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.7',
  title: 'Slice mở rộng (Stride), Đảo ngược chuỗi & Đối tượng slice',
  subtitle: 'Bước nhảy K trong S[I:J:K], đảo ngược chuỗi kinh điển S[::-1], lớp slice() và ứng dụng thực tế sys.argv[1:], line[:-1]',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cú pháp cắt lát mở rộng ba tham số S[I:J:K] với bước nhảy (sải bước - stride) K.',
    'Thành thạo kỹ thuật đảo ngược chuỗi kinh điển trong Python bằng sải bước âm: S[::-1].',
    'Hiểu nguyên lý đảo ngược vai trò của hai cận khi sử dụng bước nhảy âm (như S[5:1:-1]).',
    'Nhận biết đối tượng slice(I, J, K) và tính tương đương với biểu thức cắt lát cú pháp.',
    'Áp dụng slice vào thực tế lập trình: xử lý đối số dòng lệnh sys.argv[1:] và tước bỏ ký tự dòng mới của tệp tin line[:-1].'
  ],

  intuition: {
    title: 'Những bước nhảy cách quãng và chiếc gương phản chiếu',
    metaphor: 'Nếu như thao tác slice thông thường là bạn đi bộ từng bước một (+1) từ ô này sang ô liền kề, thì giới hạn thứ ba K (stride) giống như việc bạn đi ủng nhảy cóc: K = 2 nghĩa là bạn nhảy cách quãng 2 ô một lần (bỏ qua một ô ở giữa). Điều kỳ diệu nhất xảy ra khi bước nhảy là số âm (K = -1): bạn quay lưng lại và bước lùi từ cuối chuỗi về đầu chuỗi. Biểu thức S[::-1] biến lát cắt thành một chiếc gương ma thuật: chuỗi "hello" khi đi qua chiếc gương này sẽ lập tức đảo chiều hoàn hảo thành "olleh"!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH CẮT LÁT MỞ RỘNG (STRIDE K)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">1. Bước Nhảy Dương (Nhảy cóc): S[::2]</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              Chuỗi: <code>'abcdef'</code><br>
              Lấy các vị trí: <code>0, 2, 4</code><br>
              ➔ Kết quả: <code>'ace'</code> (lấy cách quãng 1 ký tự)
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">2. Bước Nhảy Âm (Đảo chiều): S[::-1]</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              Chuỗi: <code>'hello'</code><br>
              Duyệt từ phải sang trái (bước lùi -1)<br>
              ➔ Kết quả: <code>'olleh'</code> (đảo ngược toàn bộ chuỗi)
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Slice Mở rộng: Giới hạn Thứ ba (Stride - Bước nhảy)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 16 / 52 – Trang 18 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Mặc dù không được sử dụng thường xuyên bằng dạng hai tham số, các biểu thức slice còn hỗ trợ <strong>chỉ mục thứ ba tùy chọn</strong>, được dùng làm <strong>bước nhảy (đôi khi được gọi là sải bước - stride)</strong>. Bước nhảy này được cộng vào chỉ mục của từng phần tử được trích xuất.</p>

        <p>Với nó, dạng đầy đủ hoàn chỉnh của một slice là <code>S[I:J:K]</code>, có nghĩa là:</p>
        <blockquote>
          <p><em>"Trích xuất tất cả các phần tử trong S, từ vị trí I đến ngay trước J, theo bước nhảy K."</em></p>
        </blockquote>

        <p>Giới hạn thứ ba, <code>K</code>, mặc định là <code>+1</code>, đó là lý do vì sao thông thường mọi phần tử trong một slice đều được trích xuất lần lượt từ trái sang phải. Tuy nhiên, nếu bạn chỉ định một giá trị tường minh, bạn có thể dùng giới hạn thứ ba này để nhảy cóc qua các phần tử:</p>
      `,
      codeExamples: [
        {
          title: 'Cắt lát cách quãng với bước nhảy dương',
          code: `S = 'abcdefghijklmnop'

# Lấy từ vị trí 1 đến trước 10, bước nhảy 2 (lấy các offset 1, 3, 5, 7, 9)
res1 = S[1:10:2]
print("S[1:10:2] =", repr(res1))

# Lược bỏ hai cận: lấy cách quãng từ đầu đến cuối chuỗi
res2 = S[::2]
print("S[::2] =", repr(res2))`,
          output: `S[1:10:2] = 'bdfhj'
S[::2] = 'acegikmo'`,
          annotations: [
            { line: 4, text: 'S[1:10:2] gom các phần tử tại các chỉ mục lẻ 1, 3, 5, 7, 9.' },
            { line: 8, text: 'S[::2] gom các phần tử tại các chỉ mục chẵn 0, 2, 4, 6, 8, 10, 12, 14.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Đảo ngược Chuỗi bằng Sải bước Âm: S[::-1]',
      content: `
        <p>Bạn cũng có thể dùng một <strong>sải bước âm (negative stride)</strong> để gom các phần tử theo thứ tự ngược lại. Ví dụ, trong biểu thức slice <code>S[::-1]</code>, một sải bước là <code>-1</code> biểu thị rằng slice sẽ duyệt từ phải sang trái thay vì từ trái sang phải như thường lệ. Nói một cách đơn giản, hiệu ứng thu được là <strong>đảo ngược dãy tuần tự (reverse sequence)</strong>.</p>

        <p>Với một sải bước âm, ý nghĩa của hai cận đầu tiên về cơ bản bị đảo ngược lại: cận bên trái phải lớn hơn cận bên phải. Chẳng hạn, slice <code>S[5:1:-1]</code> sẽ lấy các phần tử từ vị trí 5 lùi dần về vị trí 2 (dừng trước 1):</p>
      `,
      codeExamples: [
        {
          title: 'Đảo ngược chuỗi và đảo ngược vai trò các cận với sải bước âm',
          code: `# Đảo ngược toàn bộ chuỗi
greeting = 'hello'
reversed_greeting = greeting[::-1]
print("greeting[::-1]:", repr(reversed_greeting))

# Sải bước âm với cận cụ thể
S = 'abcedfg'
# Lấy từ offset 5 ('f') lùi về trước 1 (offset 5, 4, 3, 2)
res = S[5:1:-1]
print("S[5:1:-1]:", repr(res))`,
          output: `greeting[::-1]: 'olleh'
S[5:1:-1]: 'fdec'`,
          annotations: [
            { line: 3, text: '\'hello\'[::-1] duyệt từ phải qua trái, tạo chuỗi mới \'olleh\'.' },
            { line: 9, text: 'S[5:1:-1] lấy các ký tự ở offset 5, 4, 3, 2 theo thứ tự lùi dần.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Đối tượng Slice & Tính Tương đương với Cú pháp [ ]',
      content: `
        <p>Ở phần nâng cao của Python, bạn sẽ biết rằng mọi thao tác cắt lát cú pháp <code>S[I:J:K]</code> thực chất hoàn toàn tương đương với việc đánh chỉ mục bằng một <strong>đối tượng <code>slice()</code></strong>:</p>
        <ul>
          <li><code>S[1:3]</code> tương đương <code>S[slice(1, 3)]</code></li>
          <li><code>S[::-1]</code> tương đương <code>S[slice(None, None, -1)]</code></li>
        </ul>

        <p>Đây là một phát hiện rất quan trọng khi bạn tự viết các lớp (class) do người dùng định nghĩa ở Phần VI: phương thức nạp chồng toán tử chỉ mục <code>__getitem__</code> sẽ nhận vào một đối tượng <code>slice</code> khi người dùng thực hiện thao tác cắt lát trên thể hiện của lớp bạn.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh cú pháp slice và hàm dựng sẵn slice()',
          code: `word = 'code'

# Dạng cú pháp thông thường
print("word[1:3]:", repr(word[1:3]))
# Dạng đối tượng slice
print("word[slice(1, 3)]:", repr(word[slice(1, 3)]))

# Đảo ngược bằng cú pháp
print("word[::-1]:", repr(word[::-1]))
# Đảo ngược bằng đối tượng slice
print("word[slice(None, None, -1)]:", repr(word[slice(None, None, -1)]))`,
          output: `word[1:3]: 'od'
word[slice(1, 3)]: 'od'
word[::-1]: 'edoc'
word[slice(None, None, -1)]: 'edoc'`,
          annotations: [
            { line: 4, text: 'word[1:3] trả về \'od\'.' },
            { line: 6, text: 'slice(1, 3) tạo đối tượng slice đại diện cho cận dưới 1 và cận trên 3.' },
            { line: 11, text: 'slice(None, None, -1) đại diện cho việc duyệt từ cuối về đầu với bước nhảy -1.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Khung Chuyên đề: Tại sao Bạn sẽ Quan tâm đến Slice?',
      content: `
        <p>Các khung chuyên đề tình huống thực tế của Mark Lutz giúp người học thấy được các tính năng ngôn ngữ trừu tượng được áp dụng vào các chương trình thực tế như thế nào. Dưới đây là hai ứng dụng kinh điển của slice:</p>

        <h3>a) Trích xuất đối số dòng lệnh trong sys.argv</h3>
        <p>Các từ đối số được liệt kê trên dòng lệnh hệ thống dùng để khởi chạy một chương trình Python sẽ được cung cấp sẵn trong danh sách <code>sys.argv</code> của module <code>sys</code>. Phần tử đầu tiên <code>sys.argv[0]</code> luôn là tên tệp chương trình. Một biểu thức slice duy nhất <strong><code>sys.argv[1:]</code></strong> giúp bạn trích xuất tất cả các đối số phía sau mà không cần bận tâm đến tên chương trình ở đầu.</p>

        <h3>b) Dọn dẹp ký tự dòng mới khi đọc tệp tin</h3>
        <p>Khi đọc các dòng từ tệp văn bản (kiểu dữ liệu ở Chương 9), mỗi dòng thường có ký tự dòng mới <code>\\n</code> ở cuối. Biểu thức <strong><code>line[:-1]</code></strong> trích xuất tất cả các ký tự ngoại trừ ký tự cuối cùng, tước bỏ <code>\\n</code> trong một dòng mã duy nhất. Dẫu vậy, phương thức <code>line.rstrip('\\n')</code> thường được ưa chuộng hơn vì nó an toàn ngay cả khi dòng cuối tệp không có ký tự ngắt dòng.</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa xử lý đối số sys.argv và tước bỏ ký tự cuối dòng',
          code: `# Giả lập danh sách sys.argv
fake_argv = ['myscript.py', '-a', '-b', '--output=data.txt']
# Dùng slice bỏ qua tên script ở đầu:
cli_args = fake_argv[1:]
print("Các tham số người dùng truyền vào:", cli_args)

# Giả lập dòng đọc từ file văn bản có chứa \\n ở cuối
file_line = "Dòng dữ liệu thứ nhất\\n"
# Dùng slice [:-1] cắt bỏ ký tự cuối
clean_line = file_line[:-1]
print("Chuỗi gốc repr:", repr(file_line))
print("Chuỗi sau khi cắt lát [:-1] repr:", repr(clean_line))`,
          output: `Các tham số người dùng truyền vào: ['-a', '-b', '--output=data.txt']
Chuỗi gốc repr: 'Dòng dữ liệu thứ nhất\\n'
Chuỗi sau khi cắt lát [:-1] repr: 'Dòng dữ liệu thứ nhất'`,
          annotations: [
            { line: 5, text: 'fake_argv[1:] trả về danh sách các đối số từ chỉ mục 1 đến hết.' },
            { line: 11, text: 'file_line[:-1] loại bỏ ký tự ngắt dòng cuối cùng một cách gọn gàng.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Kiểm tra chuỗi đối xứng (Palindrome) chỉ với 1 dòng',
        content: 'Bạn có thể kiểm tra xem một từ có phải là từ đối xứng (đọc xuôi đọc ngược đều giống nhau, như "radar", "level", "madam") hay không bằng cách so sánh chuỗi đó với bản đảo ngược của nó: <code>is_palindrome = (word == word[::-1])</code>. Biểu thức này chạy cực nhanh và thanh lịch.'
      }
    ],
    pitfalls: [
      {
        title: 'Cẩn thận với hai cận khi dùng bước nhảy âm',
        content: 'Khi bước nhảy K là số âm, nếu bạn vô tình viết <code>S[1:5:-1]</code>, Python sẽ trả về chuỗi rỗng <code>\'\'</code> vì khi lùi từ 1 thì không thể nào chạm tới 5 được! Hãy luôn nhớ: với bước nhảy âm, cận trái phải lớn hơn cận phải: <code>S[5:1:-1]</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Lọc các ký tự ở vị trí chẵn và đảo ngược chuỗi kết quả',
      level: 'Vừa',
      problem: 'Cho chuỗi text = "A1B2C3D4E5". Hãy thực hiện hai yêu cầu bằng slice: (1) Trích xuất tất cả các chữ cái ở vị trí chẵn (A, B, C, D, E); (2) Đảo ngược chuỗi chữ cái vừa trích xuất đó thành "EDCBA".',
      hint: 'Dùng text[::2] cho yêu cầu 1, sau đó áp dụng [::-1] cho yêu cầu 2 (hoặc có thể kết hợp text[-2::-2]).',
      solutionCode: `text = "A1B2C3D4E5"

# Yêu cầu 1: Lấy các ký tự ở vị trí chẵn (bước nhảy 2)
letters = text[::2]
print("Chữ cái ở vị trí chẵn:", letters)

# Yêu cầu 2: Đảo ngược chuỗi kết quả
reversed_letters = letters[::-1]
print("Chuỗi sau khi đảo ngược:", reversed_letters)

# Cách kết hợp trong 1 biểu thức duy nhất:
combo = text[-2::-2]
print("Kết hợp 1 bước text[-2::-2]:", combo)`,
      solutionOutput: `Chữ cái ở vị trí chẵn: ABCDE
Chuỗi sau khi đảo ngược: EDCBA
Kết hợp 1 bước text[-2::-2]: EDCBA`,
      explanation: 'text[::2] lấy các chỉ mục 0, 2, 4, 6, 8 tạo ra "ABCDE". Biểu thức đảo ngược [::-1] biến nó thành "EDCBA".'
    }
  ],

  quiz: [
    {
      question: 'Biểu thức nào sau đây là cách viết ngắn gọn và mang đậm phong cách Python nhất để đảo ngược một chuỗi S?',
      options: [
        'S.reverse()',
        'S[::-1]',
        'reversed(S).join()',
        'S[len(S):0:-1]'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, biểu thức cắt lát mở rộng S[::-1] là idiom kinh điển và nhanh nhất để đảo ngược một chuỗi hoặc bất kỳ dãy tuần tự nào.'
    },
    {
      question: 'Cắt lát cú pháp S[1:5] trong Python thực chất tương đương với thao tác nào bên dưới?',
      options: [
        'S[slice(1, 5)]',
        'S.slice(1, 5)',
        'slice(S, 1, 5)',
        'S[range(1, 5)]'
      ],
      correctIndex: 0,
      explanation: 'Mọi biểu thức cắt lát cú pháp S[I:J] đều được Python chuyển dịch thành việc đánh chỉ mục bằng một đối tượng slice dựng sẵn: S[slice(I, J)].'
    }
  ],

  summary: [
    'Slice mở rộng S[I:J:K] chấp nhận bước nhảy (stride) K, mặc định là +1.',
    'Bước nhảy dương (như S[::2]) cho phép trích xuất các phần tử cách quãng.',
    'Sải bước âm (như S[::-1]) đảo ngược chiều duyệt từ phải sang trái, dùng để đảo ngược chuỗi cực nhanh.',
    'Với sải bước âm, cận trái phải lớn hơn cận phải: ví dụ S[5:1:-1].',
    'Cú pháp slice tương đương với việc đánh chỉ mục bằng đối tượng slice(I, J, K).',
    'Slice được áp dụng rộng rãi trong thực tế: lọc sys.argv[1:] và tước bỏ dòng mới line[:-1].'
  ]
};
