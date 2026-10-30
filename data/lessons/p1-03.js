export default {
  id: 'p1-03',
  partId: 'part-1',
  partTitle: 'Phần 1 – Nền tảng (Cơ bản)',
  number: '1.3',
  title: 'Chỉ số (Indexing) và Cắt lát (Slicing): s[start:stop:step] & đối tượng slice',
  subtitle: 'Làm chủ hệ trục tọa độ hai chiều dương/âm, quy tắc nửa khoảng [start, stop), đảo chuỗi [::-1] và đối tượng slice',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: 'slice-viewer',

  objectives: [
    'Truy cập chính xác từng ký tự bằng chỉ số dương (`0` đến `len(s) - 1`) và chỉ số âm (`-1` về `-len(s)`).',
    'Làm chủ cú pháp cắt lát `s[start:stop:step]`, hiểu rõ quy tắc bao gồm `start` nhưng KHÔNG bao gồm `stop`.',
    'Hiểu cơ chế cắt lát với bước nhảy âm (`step < 0`), kỹ thuật đảo chuỗi `s[::-1]`, và lý do slicing không bao giờ ném `IndexError` khi vượt phạm vi.',
    'Sử dụng đối tượng tích hợp `slice(start, stop, step)` để đặt tên cho các vùng cắt dữ liệu cố định.'
  ],

  intuition: {
    title: 'Lưỡi dao cắt bánh đặt ở vạch ngăn giữa các ô ký tự',
    metaphor: 'Khi truy cập một phần tử `s[i]`, bạn chỉ tay thẳng vào chiếc hộp thứ `i`. Nhưng khi cắt lát `s[start:stop]`, hãy tưởng tượng `start` và `stop` là vị trí đặt lưỡi dao ở VẠCH NGĂN phía trước các ô: `s[1:4]` đặt nhát dao thứ nhất ngay trước ô 1 và nhát dao thứ hai ngay trước ô 4, lấy ra đúng 3 ô (1, 2, 3). Nhờ tư duy vạch ngăn này, bạn sẽ thấy ngay vì sao `len(s[1:4])` luôn bằng `4 - 1 = 3` và vì sao `s[:k] + s[k:]` luôn ghép khít lại thành `s`!',
    visualHtml: `
      <div style="font-family:var(--font-mono);font-size:0.86rem;line-height:1.7;overflow-x:auto;">
        <div>Vạch cắt:&nbsp;&nbsp;0&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;6</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+---+---+---+---+---+---+</div>
        <div>Ký tự:&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;<strong>P</strong>&nbsp;|&nbsp;<strong style="color:var(--accent-primary);">Y</strong>&nbsp;|&nbsp;<strong style="color:var(--accent-primary);">T</strong>&nbsp;|&nbsp;<strong style="color:var(--accent-primary);">H</strong>&nbsp;|&nbsp;<strong>O</strong>&nbsp;|&nbsp;<strong>N</strong>&nbsp;|</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+---+---+---+---+---+---+</div>
        <div>Index âm:&nbsp;-6&nbsp;&nbsp;-5&nbsp;&nbsp;-4&nbsp;&nbsp;-3&nbsp;&nbsp;-2&nbsp;&nbsp;-1</div>
        <div style="margin-top:6px;color:var(--accent-primary);font-weight:700;">► s[1:4] lấy các ô giữa vạch 1 và vạch 4 ──► 'YTH' (độ dài 4 - 1 = 3)</div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Đánh chỉ số (Indexing) — Hệ tọa độ Dương và Âm',
      badge: null,
      content: `
        <p>Mỗi ký tự trong chuỗi <code>s</code> có độ dài $n = \\text{len}(s)$ đều có thể được truy cập bằng toán tử ngoặc vuông <code>s[i]</code> theo hai cách đánh số song song:</p>
        <ul>
          <li><strong>Chỉ số dương (Từ trái sang phải):</strong> Bắt đầu từ <code>0</code> (ký tự đầu tiên) đến <code>n - 1</code> (ký tự cuối cùng).</li>
          <li><strong>Chỉ số âm (Từ phải sang trái):</strong> Bắt đầu từ <code>-1</code> (ký tự cuối cùng) lùi về <code>-n</code> (ký tự đầu tiên). Về mặt toán học, <code>s[-k]</code> chính là viết tắt của <code>s[len(s) - k]</code>.</li>
        </ul>
        <p>Nếu bạn truy cập một chỉ số <code>i</code> nằm ngoài đoạn <code>[-n, n - 1]</code> (hoặc truy cập <code>s[0]</code> trên chuỗi rỗng <code>""</code>), Python sẽ lập tức ném ngoại lệ <code>IndexError: string index out of range</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Truy cập ký tự bằng chỉ số dương và chỉ số âm',
          code: `s = "PYTHON"

print("Đầu tiên (s[0]):", s[0])
print("Đầu tiên (s[-6]):", s[-6])
print("Cuối cùng (s[5]):", s[5])
print("Cuối cùng (s[-1]):", s[-1])
print("Kế cuối (s[-2]):", s[-2])`,
          output: `Đầu tiên (s[0]): P
Đầu tiên (s[-6]): P
Cuối cùng (s[5]): N
Cuối cùng (s[-1]): N
Kế cuối (s[-2]): O`,
          annotations: [
            { line: 3, text: '`s[0]` luôn là ký tự đầu tiên (với điều kiện chuỗi không rỗng).' },
            { line: 6, text: '`s[-1]` là cách viết chuẩn mực nhất trong Python để lấy ký tự cuối cùng mà không cần gọi `s[len(s) - 1]`.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Cắt lát (Slicing) s[start:stop:step] và Bước nhảy Âm',
      badge: null,
      content: `
        <p>Cú pháp tổng quát <code>s[start:stop:step]</code> trích xuất một chuỗi con mới theo 3 tham số:</p>
        <ul>
          <li><code>start</code>: Vị trí bắt đầu (<strong>có bao gồm</strong> trong kết quả). Nếu bỏ trống: mặc định là <code>0</code> khi <code>step &gt; 0</code>, hoặc <code>len(s) - 1</code> (cuối chuỗi) khi <code>step &lt; 0</code>.</li>
          <li><code>stop</code>: Vị trí dừng lại (<strong>KHÔNG bao gồm</strong> trong kết quả). Nếu bỏ trống: mặc định đi tới hết chuỗi theo chiều của <code>step</code>.</li>
          <li><code>step</code>: Bước nhảy giữa các lần lấy ký tự (mặc định là <code>1</code>). Nếu <code>step == 0</code>, Python ném <code>ValueError: slice step cannot be zero</code>.</li>
        </ul>
        <p><strong>Quy tắc vàng khi <code>step &lt; 0</code> (đi ngược từ phải sang trái):</strong> Để kết quả không rỗng, vị trí xuất phát <code>start</code> phải nằm <strong>bên phải</strong> (lớn hơn) vị trí đích <code>stop</code>!</p>
      `,
      codeExamples: [
        {
          title: 'Các mẫu Slicing quan trọng nhất và đảo chuỗi [::-1]',
          code: `s = "0123456789"

print("s[2:7]   ->", s[2:7])      # Từ index 2 đến sát 7
print("s[:4]    ->", s[:4])       # 4 ký tự đầu tiên
print("s[-3:]   ->", s[-3:])      # 3 ký tự cuối cùng
print("s[::2]   ->", s[::2])      # Các vị trí chẵn: 0, 2, 4, 6, 8
print("s[1::2]  ->", s[1::2])     # Các vị trí lẻ: 1, 3, 5, 7, 9
print("s[::-1]  ->", s[::-1])     # Đảo ngược toàn bộ chuỗi
print("s[7:2:-1]->", s[7:2:-1])   # Đi ngược từ 7 về trước 2`,
          output: `s[2:7]   -> 23456
s[:4]    -> 0123
s[-3:]   -> 789
s[::2]   -> 02468
s[1::2]  -> 13579
s[::-1]  -> 9876543210
s[7:2:-1]-> 76543`,
          annotations: [
            { line: 4, text: '`s[:k]` luôn lấy tối đa `k` ký tự đầu tiên; `s[-k:]` lấy tối đa `k` ký tự cuối cùng.' },
            { line: 8, text: '`s[::-1]` có `step = -1`, tự động bắt đầu từ cuối chuỗi đi ngược về đầu chuỗi.' },
            { line: 9, text: '`s[7:2:-1]` lấy các index `7, 6, 5, 4, 3` và dừng lại ngay trước index `2`.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Slicing "dễ tính" (Out-of-bounds Safe) vs Indexing khắt khe',
      badge: null,
      content: `
        <p>Một thiết kế cực kỳ tinh tế của Python là: trong khi <strong>Indexing <code>s[i]</code> ném lỗi <code>IndexError</code></strong> nếu vượt quá phạm vi, thì <strong>Slicing <code>s[start:stop]</code> KHÔNG BAO GIỜ ném <code>IndexError</code></strong>!</p>
        <p>Khi <code>start</code> hoặc <code>stop</code> nằm ngoài biên của chuỗi, Python tự động kẹp (clamp) chúng về biên gần nhất (<code>0</code> hoặc <code>len(s)</code>). Nhờ vậy, viết <code>s[:10]</code> để lấy "tối đa 10 ký tự đầu" trên một chuỗi chỉ có 3 ký tự vẫn chạy êm ái mà không cần <code>if len(s) &gt;= 10</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Slicing an toàn ngay cả với chuỗi ngắn hoặc chuỗi rỗng',
          code: `short = "Hi"
empty = ""

print("short[:100]   ->", repr(short[:100]))
print("short[50:100] ->", repr(short[50:100]))
print("empty[:10]    ->", repr(empty[:10]))
print("Lấy ký tự đầu an toàn:", repr(empty[:1]))`,
          output: `short[:100]   -> 'Hi'
short[50:100] -> ''
empty[:10]    -> ''
Lấy ký tự đầu an toàn: ''`,
          annotations: [
            { line: 4, text: 'Dù `stop = 100` lớn hơn `len(short) = 2`, Python tự giới hạn ở cuối chuỗi và trả về `\'Hi\'`.' },
            { line: 5, text: 'Khi cả `start` và `stop` đều vượt quá độ dài chuỗi, kết quả đơn giản là chuỗi rỗng `\'\'`.' },
            { line: 7, text: 'Mẹo thực chiến: `s[:1]` trả về chuỗi 1 ký tự đầu hoặc `""` nếu `s` rỗng, không bao giờ gây `IndexError` như `s[0]`!' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Đối tượng slice() — Tái sử dụng lát cắt có tên gọi',
      badge: null,
      content: `
        <p>Thực chất, cú pháp <code>s[start:stop:step]</code> là đường cú pháp (syntactic sugar) cho <code>s[slice(start, stop, step)]</code>. Khi phải đọc dữ liệu định dạng cột cố định (fixed-width records như hóa đơn, sao kê ngân hàng, mã vạch), việc tạo sẵn các đối tượng <code>slice</code> có tên rõ nghĩa giúp code sạch hơn rất nhiều so với những "con số ma thuật" <code>row[0:8]</code>, <code>row[8:20]</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Tách bản ghi độ rộng cố định bằng đối tượng slice()',
          code: `record = "20261021VN-HN   000450000"

DATE_SLICE   = slice(0, 8)
REGION_SLICE = slice(8, 16)
AMOUNT_SLICE = slice(16, None)

print("Ngày:", record[DATE_SLICE])
print("Khu vực:", repr(record[REGION_SLICE]))
print("Số tiền:", int(record[AMOUNT_SLICE]))
print("Chỉ số chuẩn hóa:", DATE_SLICE.indices(len(record)))`,
          output: `Ngày: 20261021
Khu vực: 'VN-HN   '
Số tiền: 450000
Chỉ số chuẩn hóa: (0, 8, 1)`,
          annotations: [
            { line: 3, text: '`slice(0, 8)` tương đương với `:8` hoặc `0:8`.' },
            { line: 5, text: '`slice(16, None)` tương đương với `[16:]` (lấy từ 16 đến hết chuỗi).' },
            { line: 10, text: 'Phương thức `slice_obj.indices(length)` trả về bộ `(start, stop, step)` đã quy đổi chuẩn xác cho chuỗi có độ dài `length`.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Viết `s[0:5:-1]` và ngạc nhiên vì nhận được chuỗi rỗng `""`',
        content: 'Khi `step = -1` (đi từ phải sang trái), điểm bắt đầu `start` phải lớn hơn `stop`. Bắt đầu từ index `0` mà lại đi lùi về bên trái thì không bao giờ gặp được index `5`, nên `s[0:5:-1]` trả về `""`. Nếu muốn đảo ngược 5 ký tự đầu tiên (`s[0:5]`), hãy viết `s[4::-1]` hoặc rõ ràng nhất là `s[:5][::-1]`.'
      },
      {
        title: 'Dùng `s[:-0]` để bỏ 0 ký tự cuối',
        content: 'Vì `-0` bằng `0`, nên khi biến `n = 0`, biểu thức `s[:-n]` biến thành `s[:0]` và trả về chuỗi rỗng `""` thay vì toàn bộ chuỗi `s`! Hãy viết `s[:-n] if n > 0 else s` hoặc dùng `removesuffix()`.'
      }
    ],
    tips: [
      {
        title: 'Bất đẳng thức bất biến của Slicing: `s[:i] + s[i:] == s`',
        content: 'Với mọi số nguyên `i` bất kỳ (âm, dương hay vượt phạm vi), `s[:i] + s[i:]` luôn luôn bằng đúng `s`.'
      }
    ],
    deepDive: {
      title: 'CPython xử lý s[:] như thế nào? Có tốn bộ nhớ tạo bản sao không?',
      content: `
        <p>Với danh sách khả biến <code>list</code>, biểu thức <code>lst[:]</code> bắt buộc phải cấp phát vùng nhớ mới để tạo bản sao nông (shallow copy). Nhưng vì <code>str</code> là <strong>bất biến (immutable)</strong>, CPython tối ưu hóa bằng cách cho <code>s[:]</code> (hoặc <code>str(s)</code>) <strong>trả về chính tham chiếu tới đối tượng <code>s</code> ban đầu</strong> mà không cấp phát lại bộ nhớ (<code>s[:] is s</code> là <code>True</code>)!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Trích xuất mã quốc gia và phần đuôi từ mã đơn hàng',
      problem: 'Cho mã đơn hàng `order_id = "VN-2026-98765"`. Hãy dùng slicing để trích xuất: (1) Mã quốc gia gồm 2 ký tự đầu, (2) Năm gồm 4 chữ số ở giữa, và (3) Mã số gồm 5 chữ số cuối cùng (dùng chỉ số âm).',
      hint: 'Dùng `order_id[:2]`, `order_id[3:7]` và `order_id[-5:]`.',
      solutionCode: `order_id = "VN-2026-98765"
country = order_id[:2]
year = order_id[3:7]
serial = order_id[-5:]

print("Quốc gia:", country)
print("Năm:", year)
print("Số serial:", serial)`,
      solutionOutput: `Quốc gia: VN
Năm: 2026
Số serial: 98765`,
      explanation: '`[:2]` lấy index 0 và 1; `[3:7]` lấy index 3, 4, 5, 6; `[-5:]` lấy từ ký tự thứ 5 tính từ cuối đến hết chuỗi.'
    },
    {
      level: 'Vừa',
      title: 'Kiểm tra chuỗi đối xứng (Palindrome) cơ bản bằng Slicing',
      problem: 'Một chuỗi được gọi là đối xứng (palindrome) nếu đọc xuôi hay đọc ngược đều giống nhau (ví dụ `"radar"`, `"level"`, `"12321"`). Hãy viết hàm `is_palindrome(s)` chỉ dùng 1 dòng với kỹ thuật slicing `[::-1]` và kiểm tra với `"radar"` và `"python"`.',
      hint: 'So sánh trực tiếp `s == s[::-1]`.',
      solutionCode: `def is_palindrome(s):
    return s == s[::-1]

print("radar ->", is_palindrome("radar"))
print("python ->", is_palindrome("python"))
print("12321 ->", is_palindrome("12321"))`,
      solutionOutput: `radar -> True
python -> False
12321 -> True`,
      explanation: '`s[::-1]` tạo ra chuỗi đảo ngược hoàn toàn của `s`. Toán tử `==` so sánh từng ký tự của chuỗi gốc và chuỗi đảo ngược.'
    },
    {
      level: 'Khó',
      title: 'Xoay vòng chuỗi sang trái k vị trí (Left Rotation) an toàn với mọi k',
      problem: 'Viết hàm `rotate_left(s, k)` dịch chuyển các ký tự của chuỗi `s` sang trái `k` vị trí (các ký tự rơi khỏi đầu trái sẽ vòng sang đuôi phải). Hàm phải hoạt động đúng ngay cả khi `s` là chuỗi rỗng `""` hoặc `k` lớn hơn độ dài của `s` (ví dụ `k = 100`) hoặc `k < 0`.',
      hint: 'Nếu `not s`, trả về `""`. Ngược lại, chuẩn hóa `k = k % len(s)` rồi ghép `s[k:] + s[:k]`.',
      solutionCode: `def rotate_left(s, k):
    if not s:
        return ""
    k = k % len(s)
    return s[k:] + s[:k]

print(rotate_left("PYTHON", 2))
print(rotate_left("PYTHON", 8))   # 8 % 6 == 2
print(rotate_left("PYTHON", -1))  # Xoay phải 1 ký tự
print(repr(rotate_left("", 5)))`,
      solutionOutput: `THONPY
THONPY
NPYTHO
''`,
      explanation: 'Phép chia lấy dư `k % len(s)` trong Python luôn trả về kết quả trong khoảng `[0, len(s) - 1]` ngay cả khi `k` âm hoặc rất lớn. Sau đó `s[k:] + s[:k]` cắt tại vạch `k` và đảo 2 nửa cho nhau.'
    }
  ],

  quiz: [
    {
      question: 'Cho `s = "ABCDEFG"`. Kết quả của biểu thức `s[1:6:2]` là gì?',
      options: [
        '`"BDF"`',
        '`"ACE"`',
        '`"BCDEF"`',
        '`"BDEF"`'
      ],
      correctIndex: 0,
      explanation: 'Bắt đầu từ index `1` (`"B"`), nhảy bước `2` tới trước `6`: lấy các index `1` (`"B"`), `3` (`"D"`), `5` (`"F"`). Kết quả là `"BDF"`.'
    },
    {
      question: 'Cho `s = "Python"`. Biểu thức nào sau đây trả về `"nohtyP"`?',
      options: [
        '`s[-1:0]`',
        '`s[0:-1:-1]`',
        '`s[::-1]`',
        '`s[-1:0:-1]`'
      ],
      correctIndex: 2,
      explanation: '`s[::-1]` đảo ngược toàn bộ chuỗi. Lưu ý `s[-1:0:-1]` sẽ dừng TRƯỚC index `0` nên bị thiếu mất chữ `"P"` đầu tiên (`"nohty"`).'
    },
    {
      question: 'Cho `s = "abc"`. Kết quả của `s[10:20]` là gì?',
      options: [
        'Ném lỗi `IndexError: string index out of range`',
        'Trả về chuỗi rỗng `""`',
        'Trả về `"c"`',
        'Trả về `None`'
      ],
      correctIndex: 1,
      explanation: 'Slicing trong Python tự động kẹp các chỉ số vượt biên về giới hạn hợp lệ mà không ném `IndexError`. Vì cả `start` và `stop` đều `>= len(s)`, kết quả là chuỗi rỗng `""`.'
    },
    {
      question: 'Biểu thức nào tương đương hoàn toàn với `s[2:8:2]`?',
      options: [
        '`s[slice(2, 8, 2)]`',
        '`s(2, 8, 2)`',
        '`slice(s, 2, 8, 2)`',
        '`s[2, 8, 2]`'
      ],
      correctIndex: 0,
      explanation: 'Cú pháp `s[start:stop:step]` được Python biên dịch thành việc tạo đối tượng `slice(start, stop, step)` và truyền vào `s[...]`.'
    }
  ],

  summary: [
    'Chỉ số dương đi từ `0` đến `len(s) - 1`; chỉ số âm đi từ `-1` (cuối chuỗi) về `-len(s)` (đầu chuỗi).',
    'Cắt lát `s[start:stop:step]` luôn bao gồm `start` và KHÔNG bao gồm `stop`.',
    'Slicing an toàn với các chỉ số vượt phạm vi (trả về `""` hoặc phần giao hợp lệ), không ném `IndexError` như indexing `s[i]`.',
    'Sử dụng `s[::-1]` để đảo ngược chuỗi và dùng `slice(start, stop, step)` để đặt tên cho các vùng cắt cố định.'
  ]
};
