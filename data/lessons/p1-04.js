export default {
  id: 'p1-04',
  partId: 'part-1',
  partTitle: 'Phần 1 – Nền tảng (Cơ bản)',
  number: '1.4',
  title: 'Tính bất biến (Immutability): Vì sao s[0]="x" lỗi, tạo chuỗi mới & id()',
  subtitle: 'Hiểu sâu vì sao chuỗi Python không thể sửa tại chỗ, cách biến trỏ tới đối tượng qua id() và các mẫu tạo chuỗi mới chuẩn mực',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: 'immutability-viewer',

  objectives: [
    'Giải thích được nguyên nhân kỹ thuật vì sao `s[0] = "x"` hoặc `del s[0]` ném lỗi `TypeError`.',
    'Sử dụng hàm `id(obj)` để quan sát địa chỉ/định danh đối tượng trước và sau khi gán lại hoặc nối chuỗi `+=`.',
    'Nắm vững 3 lợi ích cốt lõi của tính bất biến: làm khóa từ điển (`dict` key), chia sẻ bộ nhớ an toàn và an toàn đa luồng.',
    'Thành thạo các kỹ thuật tạo chuỗi mới khi cần "sửa" nội dung: ghép lát cắt (`s[:i] + ch + s[i+1:]`), `replace()`, hoặc chuyển qua `list` rồi `"".join()`.'
  ],

  intuition: {
    title: 'Biển số xe đúc bằng thép so với bảng phấn viết tay',
    metaphor: 'Một danh sách `list` giống như tấm bảng phấn: bạn có thể xóa chữ đầu tiên và viết chữ khác lên chính tấm bảng đó. Ngược lại, một chuỗi `str` giống như tấm biển số xe được dập nổi bằng thép: một khi đã dập xong, bạn không thể lấy tẩy xóa một chữ số trên biển. Nếu muốn đổi một chữ số, bạn phải đúc một tấm biển mới hoàn toàn rồi tháo ốc chuyển nhãn biến `s` sang tấm biển mới đó.',
    visualHtml: `
      <div style="display:flex;gap:14px;flex-wrap:wrap;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="flex:1;min-width:230px;padding:12px;border:1px solid var(--danger-border);border-radius:8px;background:var(--danger-bg);">
          <div style="font-weight:700;color:var(--danger-text);margin-bottom:6px;">❌ Sửa tại chỗ (In-place Mutation):</div>
          <code>s = "cat"<br/>s[0] = "b"</code>
          <div style="margin-top:6px;color:var(--danger-text);">TypeError: 'str' object does not support item assignment</div>
        </div>
        <div style="flex:1;min-width:230px;padding:12px;border:1px solid var(--success-border);border-radius:8px;background:var(--success-bg);">
          <div style="font-weight:700;color:var(--success-text);margin-bottom:6px;">✓ Tạo chuỗi mới &amp; gán lại biến:</div>
          <code>s = "cat"<br/>s = "b" + s[1:]  # Tạo đối tượng 'bat' mới</code>
          <div style="margin-top:6px;color:var(--success-text);">Kết quả: s == 'bat' (ở địa chỉ id() mới)</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Vì sao s[0] = "x" gây lỗi TypeError?',
      badge: null,
      content: `
        <p>Khi mới chuyển sang Python từ C hoặc các ngôn ngữ có chuỗi khả biến, thao tác đầu tiên nhiều người thử là sửa một ký tự bằng chỉ số: <code>s[0] = "x"</code>. Ngay lập tức, Python dừng chương trình và báo:</p>
        <p><code>TypeError: 'str' object does not support item assignment</code></p>
        <p>Điều này <strong>không phải là một hạn chế ngẫu nhiên</strong>, mà là một quyết định kiến trúc có chủ đích của Python. Nhờ tính bất biến (immutability), đối tượng <code>str</code> mang lại 3 bảo chứng quan trọng:</p>
        <ul>
          <li><strong>Làm khóa của <code>dict</code> và phần tử của <code>set</code>:</strong> Giá trị băm <code>hash(s)</code> của chuỗi không bao giờ thay đổi trong suốt vòng đời đối tượng, giúp tra cứu <code>dict</code> nhanh tức thì.</li>
          <li><strong>Không có hiệu ứng phụ (No aliasing side-effects):</strong> Khi truyền một chuỗi vào hàm hoặc gán <code>b = a</code>, bạn yên tâm 100% rằng không ai có thể âm thầm sửa nội dung chuỗi của bạn.</li>
          <li><strong>Chia sẻ bộ nhớ &amp; tối ưu nội bộ:</strong> CPython có thể cho hàng nghìn biến cùng trỏ vào một hằng chuỗi mà không sợ xung đột.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Minh họa lỗi TypeError khi cố gắng sửa hoặc xóa phần tử trong str',
          code: `word = "Python"

try:
    word[0] = "J"
except TypeError as err:
    print("Lỗi khi gán:", err)

try:
    del word[-1]
except TypeError as err:
    print("Lỗi khi xóa:", err)`,
          output: `Lỗi khi gán: 'str' object does not support item assignment
Lỗi khi xóa: 'str' object doesn't support item deletion`,
          annotations: [
            { line: 4, text: 'Gán `word[0] = "J"` thất bại vì kiểu `str` không cài đặt phương thức `__setitem__`.' },
            { line: 9, text: 'Xóa `del word[-1]` cũng thất bại vì kiểu `str` không cài đặt `__delitem__`.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Phân biệt "Biến" và "Đối tượng" thông qua hàm id()',
      badge: null,
      content: `
        <p>Nhiều người thắc mắc: <em>"Nếu chuỗi là bất biến, tại sao tôi vẫn viết được <code>s = 'Hello'</code> rồi <code>s = s + ' World'</code>?"</em></p>
        <p>Câu trả lời nằm ở sự khác biệt giữa <strong>tên biến (variable name)</strong> và <strong>đối tượng trong bộ nhớ (object)</strong>. Tên biến <code>s</code> chỉ là một chiếc nhãn dán (tham chiếu). Khi bạn chạy <code>s = s + " World"</code> (hoặc <code>s += " World"</code>), đối tượng <code>"Hello"</code> ban đầu <strong>không hề bị sửa</strong>; Python tạo ra một đối tượng <code>"Hello World"</code> mới ở vùng nhớ khác rồi bóc nhãn <code>s</code> dán sang đối tượng mới đó.</p>
        <p>Hàm tích hợp <code>id(obj)</code> trả về định danh duy nhất của đối tượng trong bộ nhớ (trong CPython chính là địa chỉ bộ nhớ của đối tượng đó).</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng đối tượng mới được tạo ra bằng id()',
          code: `s = "Python"
alias = s
first_id = id(s)

s = s + " 3.14"
second_id = id(s)

print("s hiện tại:", s)
print("alias vẫn là:", alias)
print("id(s) đã thay đổi?", first_id != second_id)
print("alias vẫn giữ nguyên id cũ?", id(alias) == first_id)`,
          output: `s hiện tại: Python 3.14
alias vẫn là: Python
id(s) đã thay đổi? True
alias vẫn giữ nguyên id cũ? True`,
          annotations: [
            { line: 2, text: '`alias` và `s` ban đầu cùng trỏ tới đúng một đối tượng `"Python"` trong bộ nhớ.' },
            { line: 5, text: 'Phép cộng tạo đối tượng mới `"Python 3.14"` và gắn tên `s` vào đối tượng mới.' },
            { line: 9, text: 'Biến `alias` hoàn toàn không bị ảnh hưởng, vẫn trỏ tới đối tượng `"Python"` ban đầu!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Ba cách chuẩn mực để "sửa" nội dung chuỗi bằng cách tạo chuỗi mới',
      badge: null,
      content: `
        <p>Khi bài toán yêu cầu thay đổi một hoặc nhiều ký tự ở vị trí bất kỳ, hãy chọn 1 trong 3 kỹ thuật sau tùy tình huống:</p>
        <ol>
          <li><strong>Ghép lát cắt (Slicing + Concatenation):</strong> <code>s[:i] + new_char + s[i+1:]</code> — Nhanh và gọn nhất khi chỉ cần thay đổi 1 vị trí biết trước chỉ số <code>i</code>.</li>
          <li><strong>Dùng phương thức chuỗi (<code>replace</code>, <code>translate</code>):</strong> Tốt nhất khi muốn thay thế theo nội dung ký tự/chuỗi con.</li>
          <li><strong>Chuyển sang <code>list(s)</code> rồi ghép lại bằng <code>"".join(chars)</code>:</strong> Tốt nhất khi thuật toán cần hoán đổi hoặc cập nhật hàng loạt vị trí theo chỉ số trong vòng lặp.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Ba kỹ thuật tạo chuỗi mới đã chỉnh sửa',
          code: `s = "Python"

# Cách 1: Thay ký tự tại vị trí index 0 bằng slicing
s_fixed = "J" + s[1:]
print("Cách 1 (Slicing):", s_fixed)

# Cách 2: Thay ký tự tại vị trí index i = 2 ('t' -> 'T')
i = 2
s_mid = s[:i] + "T" + s[i + 1:]
print("Cách 2 (Giữa chuỗi):", s_mid)

# Cách 3: Biến thành list các ký tự để hoán đổi nhiều vị trí rồi join lại
chars = list("abcdef")
chars[0], chars[-1] = chars[-1], chars[0]   # Đổi chỗ đầu và cuối
chars[2] = "X"
result = "".join(chars)
print("Cách 3 (list + join):", result)`,
          output: `Cách 1 (Slicing): Jython
Cách 2 (Giữa chuỗi): PyThon
Cách 3 (list + join): fbcXea`,
          annotations: [
            { line: 4, text: '`"J" + s[1:]` ghép `"J"` với phần đuôi `"ython"` tạo thành `"Jython"`.' },
            { line: 9, text: 'Công thức tổng quát thay ký tự tại chỉ số dương `i`: `s[:i] + new_ch + s[i + 1:]`.' },
            { line: 13, text: '`list("abcdef")` tách chuỗi thành danh sách khả biến `[\'a\', \'b\', \'c\', \'d\', \'e\', \'f\']`.' },
            { line: 16, text: '`"".join(chars)` ghép danh sách các ký tự trở lại thành một đối tượng `str` mới trong một lần cấp phát.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Gọi phương thức chuỗi mà quên gán lại kết quả',
        content: 'Vì `str` bất biến, mọi phương thức như `s.upper()`, `s.strip()`, `s.replace("a", "b")` đều KHÔNG sửa `s` mà trả về một chuỗi mới. Nếu bạn chỉ viết `s.strip()` đứng một mình trên một dòng, chuỗi mới tạo ra sẽ bị vứt bỏ ngay lập tức và `s` vẫn còn nguyên khoảng trắng! Hãy viết `s = s.strip()`.'
      }
    ],
    tips: [
      {
        title: 'Khi nào dùng `list` các ký tự thay vì cộng chuỗi?',
        content: 'Nếu bạn cần thay đổi ký tự tại $K$ vị trí khác nhau (ví dụ trò chơi đoán chữ Hangman hoặc thuật toán xáo trộn), việc chuyển `chars = list(s)`, sửa `chars[i] = ...` trong thời gian $O(1)$ mỗi lần, rồi gọi `"".join(chars)` ở cuối sẽ chỉ tốn tổng thời gian $O(N)$ thay vì $O(K \\times N)$.'
      }
    ],
    deepDive: {
      title: 'Vì sao str làm được khóa của dict còn list thì không?',
      content: `
        <p>Bảng băm (Hash Table) bên dưới <code>dict</code> tìm vị trí lưu trữ của khóa <code>k</code> dựa trên <code>hash(k)</code>. Nếu một khóa có thể bị sửa nội dung sau khi đưa vào <code>dict</code>, giá trị <code>hash(k)</code> sẽ thay đổi và khóa đó sẽ "mất tích" trong bảng băm!</p>
        <p>Vì vậy Python quy định các kiểu khả biến như <code>list</code> là <em>unhashable</em> (ném <code>TypeError: unhashable type: 'list'</code>), trong khi <code>str</code> bất biến nên là khóa từ điển hoàn hảo và còn lưu đệm (cache) sẵn giá trị băm ngay trong bộ nhớ của đối tượng chuỗi.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Thay thế ký tự tại một chỉ số cho trước',
      problem: 'Viết hàm `replace_at(s, index, new_char)` trả về chuỗi mới trong đó ký tự tại vị trí `index` (giả sử `0 <= index < len(s)`) được thay bằng `new_char`. Thử nghiệm với `replace_at("Python", 0, "C")`.',
      hint: 'Ghép phần trước `index` (`s[:index]`), `new_char`, và phần sau `index` (`s[index + 1:]`).',
      solutionCode: `def replace_at(s, index, new_char):
    return s[:index] + new_char + s[index + 1:]

print(replace_at("Python", 0, "C"))
print(replace_at("2025", 3, "6"))`,
      solutionOutput: `Cython
2026`,
      explanation: '`s[:index]` lấy các ký tự từ đầu đến sát `index`, cộng với `new_char`, rồi nối tiếp từ `index + 1` đến cuối chuỗi.'
    },
    {
      level: 'Vừa',
      title: 'Sửa lỗi quên gán lại chuỗi trong hàm làm sạch dữ liệu',
      problem: 'Một lập trình viên mới viết hàm làm sạch tên người dùng như sau nhưng chuỗi trả về vẫn còn nguyên khoảng trắng và chữ thường:\n```python\ndef clean_code(raw):\n    raw.strip()\n    raw.upper()\n    return raw\n```\nHãy sửa lại hàm `clean_code(raw)` cho đúng và kiểm tra với `"  vn_99  "`.',
      hint: 'Gán lại biến hoặc nối chuỗi phương thức (method chaining): `raw.strip().upper()`.',
      solutionCode: `def clean_code(raw):
    return raw.strip().upper()

sample = "  vn_99  "
cleaned = clean_code(sample)
print("Gốc:", repr(sample))
print("Sau khi làm sạch:", repr(cleaned))`,
      solutionOutput: `Gốc: '  vn_99  '
Sau khi làm sạch: 'VN_99'`,
      explanation: 'Vì mỗi phương thức của `str` trả về một đối tượng `str` mới, ta có thể gọi nối tiếp (method chaining) `raw.strip().upper()` và trả về kết quả cuối cùng.'
    },
    {
      level: 'Khó',
      title: 'Cập nhật bảng chữ cái trò chơi đoán chữ (Hangman) bằng list + join',
      problem: 'Trong trò chơi đoán chữ, từ bí mật là `secret = "PYTHON"`, trạng thái hiện tại trên màn hình là `masked = "______"`. Khi người chơi đoán một chữ cái `guess` (ví dụ `"O"` hoặc `"T"`), hãy viết hàm `reveal_letter(secret, masked, guess)` cập nhật tất cả vị trí khớp trong `masked` và trả về chuỗi trạng thái mới.',
      hint: 'Chuyển `masked` thành `list(masked)`, duyệt qua `secret` để cập nhật các vị trí khớp, sau đó `"".join(...)`.',
      solutionCode: `def reveal_letter(secret, masked, guess):
    chars = list(masked)
    for i in range(len(secret)):
        if secret[i] == guess:
            chars[i] = guess
    return "".join(chars)

secret = "BANANA"
state = "______"
state = reveal_letter(secret, state, "A")
print("Sau khi đoán 'A':", state)
state = reveal_letter(secret, state, "N")
print("Sau khi đoán 'N':", state)`,
      solutionOutput: `Sau khi đoán 'A': _A_A_A
Sau khi đoán 'N': _ANANA`,
      explanation: 'Chuyển trạng thái sang `list` cho phép gán trực tiếp `chars[i] = guess` tại mọi vị trí tìm thấy chữ cái đoán đúng, rồi dùng `"".join(chars)` đóng gói lại thành `str`.'
    }
  ],

  quiz: [
    {
      question: 'Kết quả của đoạn code sau là gì?\n`s = "abc"`\n`s.upper()`\n`print(s)`',
      options: [
        '`ABC`',
        '`abc`',
        'Ném lỗi `TypeError`',
        '`None`'
      ],
      correctIndex: 1,
      explanation: 'Vì `str` bất biến, `s.upper()` tạo và trả về chuỗi mới `"ABC"` nhưng không sửa biến `s`. Do giá trị trả về không được gán lại cho `s`, `print(s)` vẫn in ra `"abc"`.'
    },
    {
      question: 'Khi thực hiện `a = "Hello"`, `b = a`, rồi `a += "!"`, điều gì xảy ra với biến `b`?',
      options: [
        '`b` cũng trở thành `"Hello!"` vì `b` nối với `a`.',
        '`b` vẫn giữ nguyên giá trị `"Hello"` vì `a += "!"` tạo đối tượng chuỗi mới cho `a`.',
        'Ném lỗi `TypeError` vì không thể dùng `+=` trên chuỗi bất biến.',
        '`b` trở thành `None`.'
      ],
      correctIndex: 1,
      explanation: '`a += "!"` tạo một đối tượng chuỗi mới `"Hello!"` và gán lại tên `a` sang đối tượng mới. Biến `b` vẫn trỏ tới đối tượng `"Hello"` ban đầu.'
    },
    {
      question: 'Vì sao đối tượng `str` có thể dùng làm khóa (key) của từ điển `dict`, trong khi `list` thì không?',
      options: [
        'Vì `str` ngắn hơn `list`.',
        'Vì `str` là bất biến (immutable) nên giá trị băm `hash(s)` không bao giờ thay đổi trong suốt vòng đời đối tượng.',
        'Vì `dict` trong Python chỉ chấp nhận khóa là văn bản.',
        'Vì `list` không có hàm `len()`.'
      ],
      correctIndex: 1,
      explanation: 'Khóa của `dict` bắt buộc phải là đối tượng khả băm (hashable) với giá trị hash bất biến. Tính bất biến của `str` đảm bảo `hash(s)` luôn cố định.'
    }
  ],

  summary: [
    'Đối tượng `str` trong Python là bất biến (immutable): mọi thao tác gán `s[i] = "x"` hoặc xóa `del s[i]` đều ném `TypeError`.',
    'Khi thực hiện `s = s + "x"` hoặc `s += "x"`, Python tạo ra một đối tượng `str` mới ở địa chỉ `id()` mới và gắn lại nhãn biến `s`.',
    'Mọi phương thức của chuỗi đều trả về chuỗi mới — luôn nhớ gán lại kết quả (`s = s.strip()`).',
    'Để thay đổi nhiều vị trí theo chỉ số, hãy chuyển sang `chars = list(s)`, sửa trên danh sách rồi ghép lại bằng `"".join(chars)`.'
  ]
};
