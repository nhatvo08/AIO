export default {
  id: 'p1-01',
  partId: 'part-1',
  partTitle: 'Phần 1 – Nền tảng (Cơ bản)',
  number: '1.1',
  title: 'str là gì? Chuỗi Unicode bất biến, type() và len()',
  subtitle: 'Hiểu đúng bản chất kiểu dữ liệu văn bản trong Python 3.14.8 ngay từ viên gạch đầu tiên',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu bản chất kiểu `str` trong Python 3.14 là một dãy bất biến (immutable sequence) gồm các Unicode code point.',
    'Sử dụng thành thạo hàm `type()`, `isinstance()`, `len()` và hàm khởi tạo `str()` để làm việc với chuỗi.',
    'Phân biệt rõ chuỗi rỗng `""`, chuỗi một ký tự và lý do Python không có kiểu `char` riêng biệt.',
    'Nắm được khái niệm ban đầu về Unicode code point — vì sao Python xử lý tiếng Việt và Emoji tự nhiên ngay từ gốc.'
  ],

  intuition: {
    title: 'Đoàn tàu chở các toa chữ được niêm phong',
    metaphor: 'Hãy hình dung một chuỗi `str` giống như một đoàn tàu hỏa mà mỗi toa tàu chở đúng một ký tự Unicode (chữ cái tiếng Việt, con số, dấu câu, hay biểu tượng cảm xúc 🐍). Khi đoàn tàu xuất xưởng trong Python, các toa đã được hàn kín theo thứ tự cố định: bạn có thể đếm tổng số toa ngay lập tức bằng `len()`, nhìn vào từng toa, hoặc ghép thêm một đoàn tàu mới hoàn toàn, nhưng không thể cậy cửa thay hàng hóa bên trong một toa đang chạy.',
    visualHtml: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-family:var(--font-mono);font-size:0.9rem;">
        <span style="font-weight:700;color:var(--text-secondary);">s = "Phở 🐍" ──►</span>
        <div style="padding:8px 12px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--accent-soft);text-align:center;">
          <div style="font-size:0.7rem;color:var(--text-muted);">Toa 0</div>
          <div style="font-size:1.15rem;font-weight:800;">'P'</div>
          <div style="font-size:0.68rem;color:var(--accent-text);">U+0050</div>
        </div>
        <div style="padding:8px 12px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--accent-soft);text-align:center;">
          <div style="font-size:0.7rem;color:var(--text-muted);">Toa 1</div>
          <div style="font-size:1.15rem;font-weight:800;">'h'</div>
          <div style="font-size:0.68rem;color:var(--accent-text);">U+0068</div>
        </div>
        <div style="padding:8px 12px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--accent-soft);text-align:center;">
          <div style="font-size:0.7rem;color:var(--text-muted);">Toa 2</div>
          <div style="font-size:1.15rem;font-weight:800;">'ở'</div>
          <div style="font-size:0.68rem;color:var(--accent-text);">U+1EDF</div>
        </div>
        <div style="padding:8px 12px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--accent-soft);text-align:center;">
          <div style="font-size:0.7rem;color:var(--text-muted);">Toa 3</div>
          <div style="font-size:1.15rem;font-weight:800;">'␣'</div>
          <div style="font-size:0.68rem;color:var(--accent-text);">U+0020</div>
        </div>
        <div style="padding:8px 12px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--accent-soft);text-align:center;">
          <div style="font-size:0.7rem;color:var(--text-muted);">Toa 4</div>
          <div style="font-size:1.15rem;font-weight:800;">'🐍'</div>
          <div style="font-size:0.68rem;color:var(--accent-text);">U+1F40D</div>
        </div>
        <span style="font-weight:700;color:var(--success);">→ len(s) = 5</span>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Kiểu dữ liệu str và cách kiểm tra bằng type(), isinstance()',
      badge: null,
      content: `
        <p>Trong Python, mọi dữ liệu văn bản — từ một chữ cái đơn lẻ, họ tên tiếng Việt có dấu, đến toàn bộ nội dung một cuốn sách hay mã nguồn trang web — đều được biểu diễn bằng kiểu dữ liệu tích hợp mang tên <code>str</code> (viết tắt của <strong>string</strong> — chuỗi ký tự).</p>
        <p>Khác với các ngôn ngữ như C, C++ hay Java vốn tách riêng kiểu ký tự đơn (<code>char</code>) và chuỗi (<code>String</code>), <strong>Python không có kiểu <code>char</code></strong>. Một ký tự đơn như <code>"A"</code> đơn giản là một đối tượng <code>str</code> có độ dài bằng 1.</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra kiểu dữ liệu của chuỗi với type() và isinstance()',
          code: `greeting = "Xin chào Python 3.14.8!"
single_char = "A"
empty = ""

print(type(greeting))
print(type(single_char))
print(isinstance(greeting, str))
print(isinstance(empty, str))`,
          output: `<class 'str'>
<class 'str'>
True
True`,
          annotations: [
            { line: 1, text: 'Tạo biến `greeting` chứa chuỗi văn bản tiếng Việt.' },
            { line: 2, text: 'Một ký tự đơn `"A"` vẫn có kiểu là `str`, không phải `char`.' },
            { line: 3, text: 'Chuỗi rỗng `""` không chứa ký tự nào nhưng vẫn là một đối tượng `str` hợp lệ.' },
            { line: 5, text: '`type(obj)` trả về lớp tạo nên đối tượng: `<class \'str\'>`.' },
            { line: 7, text: '`isinstance(obj, str)` trả về `True`/`False`, là cách chuẩn mực để kiểm tra kiểu trong Python.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Bản chất bên trong — Dãy bất biến các Unicode Code Point',
      badge: null,
      content: `
        <p>Định nghĩa kỹ thuật chính xác của <code>str</code> trong tài liệu chính thức Python 3.14 gồm <strong>3 trụ cột</strong>:</p>
        <ul>
          <li><strong>Sequence (Dãy có thứ tự):</strong> Các phần tử trong chuỗi được sắp xếp theo thứ tự từ trái sang phải, đánh số từ <code>0</code>.</li>
          <li><strong>Immutable (Bất biến):</strong> Một khi đối tượng <code>str</code> đã được tạo ra trong bộ nhớ, nội dung của nó không bao giờ bị thay đổi.</li>
          <li><strong>Unicode Code Points (Điểm mã Unicode):</strong> Mỗi phần tử của chuỗi không phải là 1 byte thô như thời Python 2, mà là một <em>Unicode code point</em> — một con số định danh duy nhất toàn cầu (từ <code>U+0000</code> đến <code>U+10FFFF</code>) đại diện cho một ký tự trong bảng mã Unicode.</li>
        </ul>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Ký tự</th>
                <th>Mô tả</th>
                <th>Mã thập phân <code>ord()</code></th>
                <th>Mã Unicode Hex</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>'A'</code></td>
                <td>Chữ A hoa Latin (ASCII)</td>
                <td><code>65</code></td>
                <td><code>U+0041</code></td>
              </tr>
              <tr>
                <td><code>'đ'</code></td>
                <td>Chữ đ thường Tiếng Việt</td>
                <td><code>273</code></td>
                <td><code>U+0111</code></td>
              </tr>
              <tr>
                <td><code>'ở'</code></td>
                <td>Chữ o móc dấu hỏi Tiếng Việt</td>
                <td><code>7903</code></td>
                <td><code>U+1EDF</code></td>
              </tr>
              <tr>
                <td><code>'🐍'</code></td>
                <td>Biểu tượng con rắn (Snake Emoji)</td>
                <td><code>128013</code></td>
                <td><code>U+1F40D</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Mỗi phần tử trong str là một Unicode code point hoàn chỉnh',
          code: `word = "Phở 🐍"
print("Độ dài:", len(word))
print("Ký tự thứ 3:", word[2])
print("Ký tự cuối:", word[4])`,
          output: `Độ dài: 5
Ký tự thứ 3: ở
Ký tự cuối: 🐍`,
          annotations: [
            { line: 1, text: 'Chuỗi gồm 3 chữ cái (`P`, `h`, `ở`), 1 dấu cách (` `) và 1 emoji (`🐍`).' },
            { line: 2, text: '`len(word)` đếm đúng 5 Unicode code point (khác với JavaScript nơi `"🐍".length` trả về 2 do dùng UTF-16 code unit).' },
            { line: 4, text: 'Truy cập `word[4]` lấy trọn vẹn biểu tượng `🐍` mà không bị vỡ ký tự.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Đo độ dài bằng len() và chuyển đổi kiểu bằng str()',
      badge: null,
      content: `
        <p>Hàm tích hợp <code>len(s)</code> trả về số lượng Unicode code point có trong chuỗi <code>s</code>. Mọi ký tự nhìn thấy được, khoảng trắng (<code>" "</code>), ký tự xuống dòng (<code>"\\n"</code>) đều được tính vào độ dài chuỗi.</p>
        <p>Ngoài cách viết trực tiếp trong cặp dấu nháy, bạn có thể dùng hàm khởi tạo <code>str(object)</code> để chuyển đổi số nguyên, số thực, boolean, danh sách... thành chuỗi văn bản hiển thị được.</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng len() và hàm chuyển đổi str()',
          code: `print(len(""))           # Chuỗi rỗng
print(len(" "))          # Chuỗi chứa 1 dấu cách
print(len("Việt Nam"))   # 4 + 1 + 3 = 8

version_num = 3.14
is_stable = True
msg = "Python " + str(version_num) + " (stable=" + str(is_stable) + ")"
print(msg)
print(repr(str()))       # Gọi str() không đối số trả về chuỗi rỗng`,
          output: `0
1
8
Python 3.14 (stable=True)
''`,
          annotations: [
            { line: 1, text: 'Chuỗi rỗng `""` có độ dài bằng `0`.' },
            { line: 2, text: 'Dấu cách `" "` là một ký tự hợp lệ (code point `U+0020`), nên độ dài bằng `1`.' },
            { line: 7, text: 'Python không tự động cộng `str` với `float`/`bool`; dùng `str(...)` để chuyển chúng thành chuỗi trước khi ghép.' },
            { line: 9, text: '`str()` khi gọi không truyền tham số sẽ trả về chuỗi rỗng `\'\'`.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Đặt tên biến là `str` làm mất hàm tích hợp `str()`',
        content: 'Nếu bạn lỡ viết `str = "Xin chào"`, tên `str` trong phạm vi hiện tại sẽ trỏ tới chuỗi `"Xin chào"` thay vì lớp `<class \'str\'>`. Ngay sau đó, nếu bạn gọi `str(100)`, Python sẽ báo lỗi `TypeError: \'str\' object is not callable`. Hãy luôn đặt tên biến là `s`, `text`, `name`, `message`.'
      },
      {
        title: 'Nhầm lẫn giữa chuỗi rỗng `""` và chuỗi khoảng trắng `" "`',
        content: 'Trong biểu thức điều kiện (`if s:`), chuỗi rỗng `""` mang giá trị `False` (`bool("") == False` vì `len("") == 0`), nhưng chuỗi chứa dấu cách `" "` mang giá trị `True` (`bool(" ") == True` vì `len(" ") == 1`).'
      }
    ],
    tips: [
      {
        title: 'Kiểm tra chuỗi rỗng theo phong cách Pythonic (PEP 8)',
        content: 'Thay vì viết `if len(s) == 0:`, cộng đồng Python khuyến khích viết `if not s:` để kiểm tra chuỗi rỗng, và `if s:` để kiểm tra chuỗi có ít nhất 1 ký tự.'
      }
    ],
    deepDive: {
      title: 'Vì sao hàm len(s) trong CPython luôn chạy tức thì O(1)?',
      content: `
        <p>Trong ngôn ngữ C, chuỗi là mảng các byte kết thúc bằng ký tự <code>\\0</code> (null-terminated), nên hàm <code>strlen(s)</code> phải duyệt từ đầu đến cuối chuỗi mất thời gian tuyến tính $O(N)$.</p>
        <p>Ngược lại, trong CPython 3.14, đối tượng <code>str</code> là một cấu trúc C (<code>PyASCIIObject</code>) có lưu sẵn trường <code>length</code> ngay tại thời điểm khởi tạo. Vì <code>str</code> là <strong>bất biến</strong>, độ dài này không bao giờ thay đổi. Khi bạn gọi <code>len(s)</code>, CPython chỉ đọc đúng con số lưu sẵn đó trong <strong>1 thao tác máy ($O(1)$)</strong> — dù chuỗi dài 10 ký tự hay 100 triệu ký tự!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Khám phá kiểu và độ dài chuỗi phiên bản',
      problem: 'Tạo biến `release = "Python 3.14.8"`. Hãy in ra kiểu dữ liệu của biến `release`, tổng số ký tự của nó, và kiểm tra giá trị boolean của `release` bằng hàm `bool()`.',
      hint: 'Sử dụng lần lượt `type(release)`, `len(release)` và `bool(release)`.',
      solutionCode: `release = "Python 3.14.8"
print("Kiểu:", type(release))
print("Số ký tự:", len(release))
print("Giá trị bool:", bool(release))`,
      solutionOutput: `Kiểu: <class 'str'>
Số ký tự: 13
Giá trị bool: True`,
      explanation: 'Chuỗi `"Python 3.14.8"` gồm 6 chữ cái + 1 dấu cách + 6 ký tự phần số và dấu chấm = `13` code points. Mọi chuỗi có độ dài lớn hơn 0 đều có `bool(s)` là `True`.'
    },
    {
      level: 'Vừa',
      title: 'Phân biệt độ dài số nguyên và độ dài biểu diễn chuỗi',
      problem: 'Cho số nguyên `n = 1_000_000` (một triệu). Vì số nguyên `int` không có hàm `len()`, hãy chuyển `n` sang kiểu `str` rồi đếm xem số `n` có bao nhiêu chữ số thập phân.',
      hint: 'Dùng `str(n)` để biến số nguyên thành chuỗi `"1000000"`, sau đó truyền vào `len()`.',
      solutionCode: `n = 1_000_000
n_str = str(n)
print("Chuỗi sau khi chuyển:", n_str)
print("Số chữ số của n:", len(n_str))`,
      solutionOutput: `Chuỗi sau khi chuyển: 1000000
Số chữ số của n: 7`,
      explanation: 'Dấu gạch dưới `_` trong literal số `1_000_000` chỉ giúp lập trình viên dễ đọc code. Khi chuyển thành đối tượng `int` rồi qua `str(n)`, chuỗi kết quả là `"1000000"` có độ dài đúng `7` ký tự.'
    },
    {
      level: 'Khó',
      title: 'Viết hàm đếm tổng số ký tự của mọi phần tử trong danh sách hỗn hợp',
      problem: 'Cho danh sách `items = ["Hà Nội", 2026, "", "🐍", None]`. Hãy viết hàm ` summarize_strings(data)` chỉ lọc ra những phần tử thực sự có kiểu `str` (dùng `isinstance`), đếm xem có bao nhiêu phần tử là `str` và tính tổng độ dài (`len`) của các chuỗi đó.',
      hint: 'Duyệt qua từng phần tử `x` trong `data`, kiểm tra `if isinstance(x, str):` rồi cộng dồn số lượng và `len(x)`.',
      solutionCode: `def summarize_strings(data):
    str_count = 0
    total_chars = 0
    for item in data:
        if isinstance(item, str):
            str_count += 1
            total_chars += len(item)
    return str_count, total_chars

items = ["Hà Nội", 2026, "", "🐍", None]
count, chars = summarize_strings(items)
print("Số phần tử kiểu str:", count)
print("Tổng số code point:", chars)`,
      solutionOutput: `Số phần tử kiểu str: 3
Tổng số code point: 7`,
      explanation: 'Trong danh sách có 3 phần tử thuộc kiểu `str`: `"Hà Nội"` (dài 6), `""` (dài 0), và `"🐍"` (dài 1). Tổng cộng có `3` chuỗi và `6 + 0 + 1 = 7` code points.'
    }
  ],

  quiz: [
    {
      question: 'Trong Python 3.14, kết quả của biểu thức `type("x")` là gì?',
      options: [
        '`<class \'char\'>`',
        '`<class \'str\'>`',
        '`<class \'string\'>`',
        '`<class \'unicode\'>`'
      ],
      correctIndex: 1,
      explanation: 'Python không có kiểu `char`. Mọi chuỗi văn bản (dù dài 0, 1 hay nhiều ký tự) đều thuộc kiểu `<class \'str\'>`.'
    },
    {
      question: 'Phát biểu nào sau đây mô tả ĐÚNG NHẤT bản chất của kiểu `str` trong Python 3.14?',
      options: [
        'Dãy khả biến (mutable) gồm các byte ASCII 8-bit.',
        'Dãy bất biến (immutable) gồm các Unicode code point.',
        'Mảng các ký tự kết thúc bằng byte null `\\0` như trong C.',
        'Dãy các đơn vị mã UTF-16 16-bit giống như JavaScript.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python 3, `str` là một dãy bất biến (immutable sequence) chứa các Unicode code point.'
    },
    {
      question: 'Giá trị của biểu thức `len("Phở 🐍")` và `bool(" ")` lần lượt là bao nhiêu?',
      options: [
        '`5` và `False`',
        '`6` và `True`',
        '`5` và `True`',
        '`7` và `False`'
      ],
      correctIndex: 2,
      explanation: '`"Phở 🐍"` gồm 5 code point (`P`, `h`, `ở`, dấu cách, và `🐍`). Chuỗi `" "` có độ dài 1 (khác rỗng) nên `bool(" ")` là `True`.'
    },
    {
      question: 'Điều gì xảy ra nếu bạn thực thi hai dòng lệnh: `str = "abc"` rồi sau đó gọi `str(123)`?',
      options: [
        'In ra chuỗi `"123"` bình thường.',
        'Ném lỗi `TypeError: \'str\' object is not callable`.',
        'Ném lỗi `SyntaxError` vì `str` là từ khóa cấm gán.',
        'Trả về `"abc123"`.'
      ],
      correctIndex: 1,
      explanation: '`str` là tên tích hợp (built-in), không phải từ khóa cứng. Khi gán `str = "abc"`, biến `str` che khuất hàm `str()`, khiến lệnh gọi `str(123)` biến thành `"abc"(123)` và gây lỗi `TypeError: \'str\' object is not callable`.'
    }
  ],

  summary: [
    'Kiểu `str` trong Python 3.14 là một dãy bất biến (immutable sequence) gồm các Unicode code point.',
    'Python không có kiểu `char` riêng; ký tự đơn lẻ chỉ là một đối tượng `str` có độ dài bằng 1.',
    'Hàm `len(s)` trả về số lượng Unicode code point trong thời gian hằng số $O(1)$.',
    'Chuỗi rỗng `""` là chuỗi duy nhất có `bool(s) == False`; chuỗi chứa dấu cách `" "` có `len == 1` và `bool(" ") == True`.'
  ]
};
