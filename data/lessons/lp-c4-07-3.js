export default {
  id: 'lp-c4-07-3',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.7.3',
  title: 'Từ điển: Khóa không tồn tại & Các kỹ thuật kiểm tra',
  subtitle: 'Lỗi KeyError, toán tử in, câu lệnh if, quy tắc dấu hai chấm/thụt lề và phương thức get()',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên nhân và hành vi khi phát sinh ngoại lệ KeyError khi truy cập khóa chưa tồn tại.',
    'Sử dụng toán tử in (và not in) để kiểm tra sự hiện diện của khóa trước khi truy xuất.',
    'Nắm vững cú pháp khối lệnh của Python: vai trò bắt buộc của dấu hai chấm (:) và quy tắc thụt lề thống nhất.',
    'Áp dụng phương thức D.get(khóa, mặc_định) và biểu thức điều kiện ba ngôi (ternary) để lấy giá trị an toàn.'
  ],

  intuition: {
    title: 'Hộp thư gia đình và Ngăn kéo bí mật',
    metaphor: 'Nếu bạn mở một ngăn kéo không có trong tủ hồ sơ, người quản thư sẽ hô to "Không tìm thấy khóa này!" (KeyError). Để không bị giật mình, bạn có hai cách thông minh: hoặc bạn ngó qua xem trên nhãn có tên đó hay không trước khi mở ("k" in D), hoặc bạn dặn người quản thư: "Hãy mở ngăn k cho tôi, nếu không có ngăn đó thì hãy đưa cho tôi một tờ giấy trắng (giá trị mặc định 0)" — đó chính là phương thức get().',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">3 CÁCH XỬ LÝ KHÓA CHƯA TỒN TẠI (D = {'a': 1, 'b': 2})</div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);font-size:0.8rem;">D['c']</div>
            <div style="color:var(--danger);font-size:0.75rem;margin-top:4px;">❌ KeyError!</div>
            <div style="color:var(--text-muted);font-size:0.7rem;">(Lỗi dừng chương trình)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--warning);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);font-size:0.8rem;">if 'c' in D:</div>
            <div style="color:var(--warning);font-size:0.75rem;margin-top:4px;">⚠️ Kiểm tra trước</div>
            <div style="color:var(--text-muted);font-size:0.7rem;">(Hơi dài dòng)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);font-size:0.8rem;">D.get('c', 0)</div>
            <div style="color:var(--success);font-size:0.75rem;margin-top:4px;">✅ Trả về 0</div>
            <div style="color:var(--text-muted);font-size:0.7rem;">(Thanh lịch, an toàn)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khóa Không Tồn Tại: Ngoại lệ KeyError',
      content: `
        <p>Như chúng ta đã biết, phép gán vào một khóa mới sẽ tự động tạo thêm phần tử. Tuy nhiên, nếu bạn cố gắng <strong>đọc (truy xuất)</strong> một khóa không hề có trong từ điển, Python sẽ chặn lại và phát sinh lỗi <code>KeyError</code>.</p>
        <p>Đây là hành vi có chủ ý để ngăn chặn việc âm thầm sử dụng các giá trị rác hoặc biến chưa được định nghĩa.</p>
      `,
      codeExamples: [
        {
          title: 'Truy xuất khóa không tồn tại gây lỗi KeyError',
          code: `>>> D = {'a': 1, 'b': 2, 'c': 3}
>>> D['e']
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'e'`,
          output: `KeyError: 'e'`,
          annotations: [
            { line: 2, text: 'Khóa \'e\' không tồn tại trong từ điển D.' },
            { line: 5, text: 'Ngoại lệ KeyError thông báo rõ tên khóa bị thiếu.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Kiểm tra Sự Tồn Tại bằng Toán tử in',
      content: `
        <p>Để tránh lỗi <code>KeyError</code>, cách tiếp cận cơ bản đầu tiên là sử dụng toán tử thành viên <code>in</code>:</p>
        <ul>
          <li>Toán tử <code>in</code> kiểm tra xem một khóa có nằm trong từ điển hay không và trả về giá trị boolean <code>True</code> hoặc <code>False</code>.</li>
          <li>Bạn cũng có thể dùng dạng phủ định <code>not in</code> để viết điều kiện tự nhiên hơn.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra khóa với toán tử in',
          code: `>>> D = {'a': 1, 'b': 2, 'c': 3}
>>> 'f' in D
False
>>> 'a' in D
True
>>> if not 'f' in D:
...     print('missing')
... 
missing`,
          output: `False
True
missing`,
          annotations: [
            { line: 2, text: '\'f\' in D kiểm tra khóa \'f\', trả về False.' },
            { line: 4, text: '\'a\' in D trả về True vì khóa \'a\' có mặt.' },
            { line: 6, text: 'Câu lệnh if kiểm tra điều kiện trước khi thực thi khối lệnh con.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Quy tắc Cú pháp Python: Dấu hai chấm (:) và Thụt lề',
      content: `
        <p>Nhân ví dụ về câu lệnh <code>if</code>, Mark Lutz nhấn mạnh hai nguyên tắc cú pháp đặc trưng và bất di bất dịch của ngôn ngữ Python:</p>
        <ul>
          <li><strong>Dấu hai chấm (<code>:</code>):</strong> Mọi dòng lệnh mở đầu một cấu trúc lồng nhau (như <code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>class</code>) bắt buộc phải kết thúc bằng dấu hai chấm.</li>
          <li><strong>Thụt lề (Indentation):</strong> Khối lệnh con bên trong không dùng ngoặc nhọn <code>{}</code> hay từ khóa <code>begin/end</code> mà được xác định hoàn toàn bằng khoảng trắng thụt lề ở đầu dòng (chuẩn PEP 8 quy định là <strong>4 dấu cách</strong>). Mọi dòng lệnh trong cùng một khối phải thụt lề thẳng hàng nhau.</li>
        </ul>
      `
    },
    {
      id: 'sec-4',
      title: '4. Giải pháp Thanh lịch: Phương thức get() và Biểu thức Ba ngôi',
      content: `
        <p>Việc viết các khối <code>if/else</code> chỉ để gán một giá trị mặc định khi thiếu khóa thường làm mã nguồn trở nên dài dòng. Python cung cấp hai giải pháp một dòng cực kỳ thanh lịch:</p>
        <ul>
          <li><strong>Phương thức <code>D.get(key, default)</code>:</strong> Lấy giá trị của <code>key</code> nếu có; nếu không có, trả về giá trị <code>default</code> (hoặc <code>None</code> nếu không truyền <code>default</code>) mà không bao giờ ném lỗi.</li>
          <li><strong>Biểu thức ba ngôi (Ternary expression):</strong> Cú pháp <code>giá_trị_nếu_đúng if điều_kiện else giá_trị_nếu_sai</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng phương thức get() và biểu thức điều kiện',
          code: `>>> D = {'a': 1, 'b': 2, 'c': 3}
>>> value = D.get('x', 0)                  # Khóa 'x' không có, trả về 0
>>> value
0
>>> value = D.get('a', 0)                  # Khóa 'a' có sẵn, trả về 1
>>> value
1
>>> value = D['x'] if 'x' in D else 0      # Biểu thức ba ngôi tương đương
>>> value
0`,
          output: `0
1
0`,
          annotations: [
            { line: 2, text: 'D.get(\'x\', 0) tìm \'x\'; không thấy thì trả về giá trị mặc định 0.' },
            { line: 5, text: 'D.get(\'a\', 0) tìm thấy \'a\', trả về giá trị gốc 1.' },
            { line: 8, text: 'Biểu thức ba ngôi: trích xuất D[\'x\'] nếu có, ngược lại lấy 0.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy kiểm tra truthiness thay vì toán tử in',
        content: `
          <p>Nhiều người có thói quen viết: <code>if D['a']: ...</code>. Câu lệnh này vừa nguy hiểm (phát sinh lỗi <code>KeyError</code> nếu thiếu khóa), vừa sai logic nếu khóa tồn tại nhưng giá trị của nó là <code>0</code>, <code>False</code> hoặc rỗng <code>""</code>. Hãy luôn dùng <code>if 'a' in D:</code> để kiểm tra sự tồn tại của khóa!</p>
        `
      }
    ],
    tips: [
      {
        title: 'Khi nào dùng get() và khi nào dùng D[key]?',
        content: `
          <p>Nếu việc thiếu khóa là một tình huống <em>dự kiến trước</em> (ví dụ: người dùng không cung cấp tham số tùy chọn), hãy dùng <code>D.get(key, default)</code>.</p>
          <p>Nếu việc thiếu khóa là một <em>lỗi nghiêm trọng</em> trong logic hệ thống (ví dụ: hồ sơ tài khoản bắt buộc phải có <code>user_id</code>), hãy dùng <code>D['user_id']</code> trực tiếp để nếu thiếu khóa, lỗi sẽ được báo động ngay lập tức.</p>
        `
      }
    ],
    deepDive: {
      title: 'Triết lý EAFP của Python và khối try/except',
      content: `
        <p>Trong Python có một triết lý thiết kế nổi tiếng là <strong>EAFP</strong> (<em>"Easier to Ask for Forgiveness than Permission"</em> — Dễ xin thứ lỗi hơn là xin phép). Thay vì luôn dùng <code>if key in D</code> để kiểm tra trước (phong cách LBYL - Look Before You Leap), các chuyên gia Python thường truy cập thẳng và dùng khối <code>try/except KeyError</code> để bắt lỗi khi ngoại lệ hiếm khi xảy ra. Chi tiết về kỹ thuật này sẽ được trình bày ở các chương sau.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Đếm tần suất xuất hiện với phương thức get()',
      level: 'Dễ',
      description: 'Cho chuỗi ký tự <code>text = "banana"</code>. Hãy dùng một từ điển <code>counts = {}</code> và phương thức <code>get()</code> để đếm số lần xuất hiện của mỗi ký tự trong chuỗi.',
      starterCode: `text = "banana"
counts = {}

# Dùng vòng lặp for và counts.get(char, 0)
`,
      solution: `text = "banana"
counts = {}

for char in text:
    counts[char] = counts.get(char, 0) + 1

print(counts)`,
      solutionOutput: `{'b': 1, 'a': 3, 'n': 2}`,
      explanation: '<code>counts.get(char, 0)</code> trả về số lượng hiện tại hoặc 0 nếu ký tự chưa từng xuất hiện, sau đó cộng thêm 1.'
    },
    {
      title: 'Hàm lấy cấu hình an toàn với giá trị dự phòng',
      level: 'Vừa',
      description: 'Hãy viết hàm <code>get_setting(settings, key, fallback)</code> nhận vào từ điển cài đặt, tên khóa và giá trị dự phòng. Hàm trả về giá trị tương ứng nếu khóa có mặt, ngược lại trả về <code>fallback</code> kèm thông báo in ra màn hình.',
      starterCode: `def get_setting(settings, key, fallback):
    pass

app_settings = {'theme': 'dark', 'version': '1.0'}
print(get_setting(app_settings, 'theme', 'light'))
print(get_setting(app_settings, 'timeout', 30))`,
      solution: `def get_setting(settings, key, fallback):
    if key in settings:
        return settings[key]
    print(f"Cảnh báo: Không tìm thấy khóa '{key}', dùng giá trị mặc định.")
    return fallback

app_settings = {'theme': 'dark', 'version': '1.0'}
print(get_setting(app_settings, 'theme', 'light'))
print(get_setting(app_settings, 'timeout', 30))`,
      solutionOutput: `dark
Cảnh báo: Không tìm thấy khóa 'timeout', dùng giá trị mặc định.
30`,
      explanation: 'Sử dụng toán tử <code>in</code> để kiểm tra điều kiện và in cảnh báo thích hợp trước khi hoàn trả giá trị dự phòng.'
    }
  ],

  quiz: [
    {
      question: 'Điều gì xảy ra khi bạn truy xuất D[\'unknown\'] trên một từ điển không chứa khóa này?',
      options: [
        'Python trả về giá trị None.',
        'Python trả về chuỗi rỗng "".',
        'Phát sinh ngoại lệ KeyError.',
        'Khóa \'unknown\' tự động được thêm vào từ điển.'
      ],
      correctIndex: 2,
      explanation: 'Truy xuất khóa không tồn tại luôn làm phát sinh ngoại lệ KeyError.'
    },
    {
      question: 'Biểu thức D.get(\'age\', 18) sẽ làm gì nếu khóa \'age\' KHÔNG có trong từ điển D?',
      options: [
        'Gây lỗi KeyError.',
        'Trả về số 18 và không thay đổi từ điển D.',
        'Trả về số 18 đồng thời tự động thêm \'age\': 18 vào D.',
        'Trả về None.'
      ],
      correctIndex: 1,
      explanation: 'D.get(\'age\', 18) trả về giá trị mặc định 18 một cách an toàn mà không làm biến đổi từ điển.'
    },
    {
      question: 'Hai quy tắc cú pháp cơ bản nào xác định cấu trúc khối lệnh trong Python?',
      options: [
        'Dấu hai chấm (:) ở cuối dòng mở đầu và thụt lề bằng khoảng trắng thống nhất.',
        'Cặp ngoặc nhọn {} và dấu chấm phẩy (;).',
        'Từ khóa begin/end và đánh số thứ tự dòng.',
        'Thẻ mở và thẻ đóng dạng XML.'
      ],
      correctIndex: 0,
      explanation: 'Python dùng dấu hai chấm (:) để báo hiệu bắt đầu khối lệnh con và khoảng trắng thụt lề (indentation) để phân định phạm vi.'
    }
  ],

  summary: [
    'Truy xuất khóa không tồn tại (D[\'missing\']) gây ngoại lệ KeyError.',
    'Toán tử in (và not in) cho phép kiểm tra sự hiện diện của khóa trước khi truy cập.',
    'Cú pháp Python dùng dấu hai chấm (:) ở đầu khối và thụt lề (indentation) để phân định khối lệnh con.',
    'Phương thức D.get(key, default) và biểu thức điều kiện ba ngôi giúp lấy giá trị dự phòng an toàn, ngắn gọn.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 23–25.'
  ]
};
