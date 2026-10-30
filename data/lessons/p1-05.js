export default {
  id: 'p1-05',
  partId: 'part-1',
  partTitle: 'Phần 1 – Nền tảng (Cơ bản)',
  number: '1.5',
  title: 'Toán tử & Hàm cơ bản: +, *, in, so sánh code point, min/max/sorted, enumerate, ord/chr',
  subtitle: 'Nắm trọn bộ toán tử chuỗi, quy tắc so sánh từ điển theo mã Unicode, cách duyệt chuỗi chuẩn Pythonic và cặp hàm ord() / chr()',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng thành thạo toán tử nối `+`, lặp `*`, và kiểm tra chuỗi con `in` / `not in`.',
    'Hiểu cơ chế so sánh chuỗi (`<`, `>`, `==`) dựa trên giá trị số Unicode code point từng cặp ký tự từ trái sang phải.',
    'Vận dụng cặp hàm nghịch đảo `ord(c)` (ký tự → số Unicode) và `chr(i)` (số Unicode → ký tự).',
    'Duyệt chuỗi chuẩn mực với `for ch in s:`, `enumerate(s)` và sử dụng `min()`, `max()`, `sorted()`, `reversed()`.'
  ],

  intuition: {
    title: 'So sánh chuỗi giống như tra từ điển nhưng dùng "bảng chữ cái số" Unicode',
    metaphor: 'Khi tra từ điển giấy, ta so sánh chữ cái đầu tiên của hai từ; nếu bằng nhau mới xét đến chữ cái thứ hai. Python so sánh hai chuỗi `s1 < s2` theo đúng quy tắc đó (gọi là lexicographical order), chỉ khác ở chỗ "thứ tự bảng chữ cái" của Python chính là con số `ord(c)` của từng ký tự! Vì chữ HOA tiếng Anh có mã từ 65–90 còn chữ thường có mã từ 97–122, nên trong Python mọi chữ HOA ASCII đều "nhỏ hơn" chữ thường (`"Z" < "a"` là `True`).',
    visualHtml: `
      <div style="font-family:var(--font-mono);font-size:0.86rem;display:flex;flex-direction:column;gap:8px;">
        <div>So sánh <code>"Py" &lt; "Python"</code> và <code>"Apple" &lt; "apple"</code>:</div>
        <div style="padding:10px;background:var(--bg-surface-alt);border-radius:6px;border:1px solid var(--border-subtle);">
          1. <code>'A'</code> (ord = <strong>65</strong>) so với <code>'a'</code> (ord = <strong>97</strong>) ──► <code>65 &lt; 97</code> ──► <code>"Apple" &lt; "apple"</code> là <strong>True</strong>!
        </div>
        <div style="padding:10px;background:var(--bg-surface-alt);border-radius:6px;border:1px solid var(--border-subtle);">
          2. <code>"Py"</code> khớp hoàn toàn 2 ký tự đầu của <code>"Python"</code> nhưng ngắn hơn ──► <code>"Py" &lt; "Python"</code> là <strong>True</strong>!
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Toán tử Nối (+), Lặp (*) và Kiểm tra chuỗi con (in / not in)',
      badge: null,
      content: `
        <p>Là một kiểu dãy (sequence), <code>str</code> hỗ trợ các toán tử rất trực quan:</p>
        <ul>
          <li><code>s1 + s2</code>: Ghép hai chuỗi thành chuỗi mới. <strong>Lưu ý:</strong> Cả hai vế bắt buộc phải là <code>str</code> (cộng <code>str</code> với <code>int</code> sẽ ném <code>TypeError</code>).</li>
          <li><code>s * n</code> (hoặc <code>n * s</code>): Lặp lại chuỗi <code>s</code> đúng <code>n</code> lần. Nếu <code>n &lt;= 0</code>, kết quả trả về là chuỗi rỗng <code>""</code>.</li>
          <li><code>sub in s</code> / <code>sub not in s</code>: Kiểm tra chuỗi con <code>sub</code> có xuất hiện liên tiếp bên trong <code>s</code> hay không (trả về <code>True</code> hoặc <code>False</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng toán tử +, *, in và not in',
          code: `prefix = "Py"
lang = prefix + "thon"
divider = "=-" * 10

print(lang)
print(divider)
print("s * 0 ->", repr("abc" * 0))
print("s * -3 ->", repr("abc" * -3))

# Kiểm tra chuỗi con bằng in / not in
email = "hocvien@python.org"
print("Có '@'?", "@" in email)
print("Có 'java'?", "java" not in email)
print("Chuỗi rỗng '' luôn nằm trong mọi chuỗi:", "" in email)`,
          output: `Python
=-=-=-=-=-=-=-=-=-=-
s * 0 -> ''
s * -3 -> ''
Có '@'? True
Có 'java'? True
Chuỗi rỗng '' luôn nằm trong mọi chuỗi: True`,
          annotations: [
            { line: 3, text: '`"=-" * 10` tạo nhanh đường kẻ phân cách lặp lại 10 lần.' },
            { line: 7, text: 'Nhân chuỗi với `0` hoặc số âm luôn trả về chuỗi rỗng `\'\'`.' },
            { line: 14, text: 'Đặc tính toán học: chuỗi rỗng `""` là tập con của mọi chuỗi nên `"" in s` luôn là `True`!' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Cặp hàm ord() / chr() và Quy tắc so sánh chuỗi',
      badge: null,
      content: `
        <p>Để làm cầu nối giữa ký tự văn bản và mã số Unicode bên dưới, Python cung cấp hai hàm nghịch đảo nhau:</p>
        <ul>
          <li><code>ord(c)</code>: Nhận một chuỗi có <strong>độ dài đúng bằng 1</strong> và trả về số nguyên Unicode code point của ký tự đó (từ <code>0</code> đến <code>1114111</code> tức <code>0x10FFFF</code>).</li>
          <li><code>chr(i)</code>: Nhận số nguyên code point <code>i</code> và trả về chuỗi 1 ký tự tương ứng. Luôn có <code>chr(ord(c)) == c</code>.</li>
        </ul>
        <p>Khi so sánh hai chuỗi bằng <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>, Python đối chiếu từng cặp ký tự <code>s1[k]</code> và <code>s2[k]</code> từ trái sang phải thông qua giá trị <code>ord()</code> của chúng. Ngay tại vị trí đầu tiên khác nhau, chuỗi nào có <code>ord()</code> nhỏ hơn sẽ nhỏ hơn.</p>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi ord() ↔ chr() và so sánh chuỗi theo Code Point',
          code: `print("ord('A') =", ord("A"), "| ord('a') =", ord("a"))
print("ord('đ') =", ord("đ"), "| chr(273) =", chr(273))
print("ord('🐍') =", ord("🐍"), "| hex =", hex(ord("🐍")))

# Dịch chuyển chữ cái: chữ cái liền sau 'A'
next_letter = chr(ord("A") + 1)
print("Liền sau 'A' là:", next_letter)

# So sánh chuỗi theo thứ tự code point
print("'Z' < 'a':", "Z" < "a")             # 90 < 97 -> True
print("'100' < '2':", "100" < "2")         # ord('1')=49 < ord('2')=50 -> True!
print("'abc' < 'abcd':", "abc" < "abcd")   # Tiền tố ngắn hơn thì nhỏ hơn`,
          output: `ord('A') = 65 | ord('a') = 97
ord('đ') = 273 | chr(273) = đ
ord('🐍') = 128013 | hex = 0x1f40d
Liền sau 'A' là: B
'Z' < 'a': True
'100' < '2': True
'abc' < 'abcd': True`,
          annotations: [
            { line: 6, text: 'Không thể cộng trực tiếp `"A" + 1`, nhưng `chr(ord("A") + 1)` giúp dịch mã Unicode sang chữ `"B"`.' },
            { line: 11, text: 'Cực kỳ cẩn thận khi so sánh số dưới dạng chuỗi: `"100" < "2"` là `True` vì ký tự đầu `\'1\'` (49) nhỏ hơn `\'2\'` (50)!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Duyệt chuỗi với for, enumerate() và min/max/sorted/reversed',
      badge: null,
      content: `
        <p>Trong Python, bạn không cần viết vòng lặp chỉ số <code>for i in range(len(s)):</code> để đọc từng ký tự. Hãy duyệt trực tiếp <code>for ch in s:</code>, hoặc dùng <code>enumerate(s)</code> khi cần cả chỉ số lẫn ký tự.</p>
        <p>Các hàm tích hợp làm việc với mọi iterable cũng áp dụng trực tiếp lên <code>str</code>:</p>
        <ul>
          <li><code>min(s)</code> / <code>max(s)</code>: Trả về ký tự có <code>ord(c)</code> nhỏ nhất / lớn nhất trong chuỗi không rỗng.</li>
          <li><code>sorted(s)</code>: Trả về một <strong>danh sách (<code>list</code>)</strong> các ký tự đã sắp xếp tăng dần theo code point. Muốn ghép lại thành chuỗi, dùng <code>"".join(sorted(s))</code>.</li>
          <li><code>reversed(s)</code>: Trả về một iterator duyệt ngược các ký tự từ cuối về đầu.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Duyệt chuỗi bằng enumerate() và dùng min, max, sorted, reversed',
          code: `word = "Py3"
for idx, ch in enumerate(word, start=1):
    print(f"Ký tự #{idx}: {ch} (U+{ord(ch):04X})")

sample = "dcba"
print("min:", min(sample), "| max:", max(sample))
print("sorted(sample) trả về list:", sorted(sample))
print("Ghép lại thành str:", "".join(sorted(sample)))
print("reversed + join:", "".join(reversed(sample)))`,
          output: `Ký tự #1: P (U+0050)
Ký tự #2: y (U+0079)
Ký tự #3: 3 (U+0033)
min: a | max: d
sorted(sample) trả về list: ['a', 'b', 'c', 'd']
Ghép lại thành str: abcd
reversed + join: abcd`,
          annotations: [
            { line: 2, text: '`enumerate(word, start=1)` cung cấp đồng thời số thứ tự `idx` (bắt đầu từ 1) và ký tự `ch`.' },
            { line: 7, text: 'Lưu ý: `sorted("dcba")` luôn trả về `list` `[\'a\', \'b\', \'c\', \'d\']`, không phải `str`.' },
            { line: 8, text: 'Kết hợp `"".join(sorted(s))` để nhận lại một chuỗi đã sắp xếp các ký tự.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'So sánh số nguyên dưới dạng chuỗi: `"9" > "100"` là `True`!',
        content: 'Khi đọc dữ liệu từ file hoặc `input()`, các con số đang ở kiểu `str`. Nếu bạn so sánh trực tiếp `"9" > "100"`, Python so sánh ký tự đầu tiên `\'9\'` (`ord=57`) với `\'1\'` (`ord=49`) và kết luận `"9" > "100"`! Luôn ép kiểu sang `int(s)` hoặc `float(s)` trước khi so sánh độ lớn số học.'
      },
      {
        title: 'Truyền chuỗi rỗng hoặc chuỗi dài hơn 1 ký tự vào `ord()`',
        content: '`ord("")` hoặc `ord("ab")` sẽ ném lỗi `TypeError: ord() expected a character, but string of length 2 found`. Hàm `ord()` chỉ chấp nhận chuỗi có độ dài đúng bằng `1`.'
      }
    ],
    tips: [
      {
        title: 'Kiểm tra hai từ có phải là đảo chữ (Anagram) bằng `sorted()`',
        content: 'Hai chuỗi là đảo chữ của nhau (như `"listen"` và `"silent"`) khi và chỉ khi `sorted(s1) == sorted(s2)`!'
      }
    ],
    deepDive: {
      title: 'Toán tử in trên chuỗi trong CPython sử dụng thuật toán gì?',
      content: `
        <p>Khi bạn viết <code>sub in s</code> (hoặc <code>s.find(sub)</code>), CPython không dùng thuật toán vét cạn ngây thơ $O(N \\times M)$, mà cài đặt thuật toán kết hợp <strong>Boyer-Moore-Horspool</strong> và <strong>Two-Way string-matching</strong> ở tầng C (trong file <code>Objects/stringlib/fastsearch.h</code>), cho tốc độ tìm kiếm cực nhanh ngay cả trên văn bản hàng megabyte.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'In bảng mã chữ cái in hoa từ A đến F bằng ord() và chr()',
      problem: 'Sử dụng hàm `ord("A")`, vòng lặp `range(6)` và hàm `chr()` để tạo và in ra chuỗi gồm 6 chữ cái đầu tiên trong bảng chữ cái tiếng Anh kèm mã Unicode thập phân của chúng.',
      hint: 'Duyệt `i` từ `0` đến `5`, ký tự thứ `i` là `chr(ord("A") + i)`.',
      solutionCode: `start_code = ord("A")
for i in range(6):
    code = start_code + i
    print(f"{chr(code)} -> {code}")`,
      solutionOutput: `A -> 65
B -> 66
C -> 67
D -> 68
E -> 69
F -> 70`,
      explanation: 'Các chữ cái ASCII từ `A` đến `Z` nằm liên tiếp nhau từ mã `65` đến `90`, nên cộng thêm độ lệch `i` vào `ord("A")` rồi gọi `chr()` sẽ thu được chữ cái tương ứng.'
    },
    {
      level: 'Vừa',
      title: 'Kiểm tra hai chuỗi có phải là Anagram (Đảo chữ) của nhau không',
      problem: 'Viết hàm `are_anagrams(w1, w2)` trả về `True` nếu hai từ `w1` và `w2` được tạo thành từ cùng một tập các ký tự với số lần xuất hiện như nhau (ví dụ `"act"` và `"cat"`, `"python"` và `"typhon"`).',
      hint: 'So sánh kết quả của `sorted(w1)` và `sorted(w2)`.',
      solutionCode: `def are_anagrams(w1, w2):
    return len(w1) == len(w2) and sorted(w1) == sorted(w2)

print("act & cat    ->", are_anagrams("act", "cat"))
print("python & typhon ->", are_anagrams("python", "typhon"))
print("hello & world  ->", are_anagrams("hello", "world"))`,
      solutionOutput: `act & cat    -> True
python & typhon -> True
hello & world  -> False`,
      explanation: 'Kiểm tra nhanh `len(w1) == len(w2)` trong thời gian $O(1)$ trước, sau đó `sorted()` sắp xếp các ký tự về thứ tự chuẩn để so sánh.'
    },
    {
      level: 'Khó',
      title: 'Sắp xếp danh sách mã phiên bản theo giá trị số thực tế',
      problem: 'Cho danh sách các chuỗi số `scores = ["9", "100", "25", "3", "40"]`. Nếu gọi `sorted(scores)` mặc định, Python sẽ sắp theo thứ tự chữ cái thành `[\'100\', \'25\', \'3\', \'40\', \'9\']`. Hãy dùng tham số `key=` của hàm `sorted()` để sắp xếp danh sách chuỗi trên theo đúng giá trị số nguyên tăng dần.',
      hint: 'Truyền `key=int` vào `sorted(scores, key=int)`.',
      solutionCode: `scores = ["9", "100", "25", "3", "40"]

lex_sorted = sorted(scores)
num_sorted = sorted(scores, key=int)

print("So sánh chuỗi mặc định:", lex_sorted)
print("So sánh theo giá trị int:", num_sorted)`,
      solutionOutput: `So sánh chuỗi mặc định: ['100', '25', '3', '40', '9']
So sánh theo giá trị int: ['3', '9', '25', '40', '100']`,
      explanation: 'Tham số `key=int` bảo `sorted()` gọi `int(x)` trên từng phần tử để lấy giá trị khóa so sánh, trong khi các phần tử trong danh sách kết quả vẫn giữ nguyên kiểu `str` ban đầu.'
    }
  ],

  quiz: [
    {
      question: 'Kết quả của biểu thức `"20" > "100"` trong Python là gì?',
      options: [
        '`False` vì 20 nhỏ hơn 100',
        '`True` vì ký tự đầu `\'2\'` có mã Unicode (`50`) lớn hơn ký tự đầu `\'1\'` (`49`)',
        'Ném lỗi `TypeError`',
        '`False` vì chuỗi `"20"` ngắn hơn `"100"`'
      ],
      correctIndex: 1,
      explanation: 'So sánh chuỗi đối chiếu từng cặp ký tự từ trái sang phải theo mã `ord()`. Ở vị trí `0`, `ord("2") == 50 > ord("1") == 49`, nên `"20" > "100"` lập tức trả về `True`.'
    },
    {
      question: 'Kiểu dữ liệu trả về của hàm `sorted("python")` là gì?',
      options: [
        '`<class \'str\'>` (`"hnopty"`)',
        '`<class \'list\'>` (`[\'h\', \'n\', \'o\', \'p\', \'t\', \'y\']`)',
        '`<class \'tuple\'>`',
        '`<class \'reversed\'>`'
      ],
      correctIndex: 1,
      explanation: 'Hàm tích hợp `sorted(iterable)` luôn luôn trả về một danh sách (`list`) mới chứa các phần tử đã sắp xếp.'
    },
    {
      question: 'Cặp hàm nào dùng để chuyển đổi qua lại giữa ký tự đơn và mã số Unicode code point?',
      options: [
        '`int()` và `str()`',
        '`hex()` và `bin()`',
        '`ord()` và `chr()`',
        '`encode()` và `decode()`'
      ],
      correctIndex: 2,
      explanation: '`ord(c)` chuyển ký tự đơn thành số nguyên Unicode code point, còn `chr(i)` chuyển số nguyên code point thành ký tự tương ứng.'
    },
    {
      question: 'Biểu thức `"" in "Python"` trả về kết quả gì?',
      options: [
        '`True`',
        '`False`',
        'Ném lỗi `ValueError`',
        '`None`'
      ],
      correctIndex: 0,
      explanation: 'Trong Python, chuỗi rỗng `""` luôn được coi là chuỗi con của mọi chuỗi (kể cả `"" in ""`), nên kết quả luôn là `True`.'
    }
  ],

  summary: [
    'Toán tử `+` nối hai chuỗi, `*` lặp lại chuỗi `n` lần, và `in` / `not in` kiểm tra sự tồn tại của chuỗi con.',
    'So sánh chuỗi (`<`, `>`, `==`) thực hiện theo thứ tự từ điển dựa trên giá trị `ord(c)` của từng cặp ký tự từ trái sang phải.',
    '`ord(c)` đổi ký tự dài 1 thành số nguyên Unicode; `chr(i)` đổi số nguyên Unicode thành ký tự.',
    'Dùng `for ch in s:` hoặc `enumerate(s)` để duyệt chuỗi, và nhớ rằng `sorted(s)` trả về `list` nên cần `"".join(sorted(s))` nếu muốn nhận lại `str`.'
  ]
};
