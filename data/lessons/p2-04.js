export default {
  id: 'p2-04',
  partId: 'part-2',
  partTitle: 'Phần 2 – Phương thức của str (Trung cấp)',
  number: '2.4',
  title: 'Nhóm tách và ghép (split, rsplit, splitlines, partition, rpartition, join)',
  subtitle: 'Bẻ nhỏ văn bản thành cấu trúc danh sách/tuple và lắp ghép lại với độ phức tạp tuyến tính O(n)',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt sâu sắc hai chế độ hoạt động hoàn toàn khác nhau của split() / rsplit() khi để mặc định sep=None so với khi truyền chuỗi phân cách tường minh như sep=" ".',
    'Sử dụng splitlines() để tách dòng an toàn trên mọi hệ điều hành (Windows \\r\\n, Linux/macOS \\n, và các ký tự ngắt dòng Unicode).',
    'Tận dụng partition() và rpartition() để tách chuỗi thành đúng bộ 3 phần tử (head, sep, tail) mà không lo lỗi thiếu phần tử khi unpacking.',
    'Làm chủ phương thức sep.join(iterable) để ghép chuỗi hiệu năng cao O(n) thay vì cộng chuỗi liên tiếp trong vòng lặp.'
  ],

  intuition: {
    title: 'Xưởng cưa gỗ định hình và keo dán công nghiệp',
    metaphor: 'Hãy tưởng tượng một thanh gỗ dài chứa các mắt gỗ đánh dấu. split() và rsplit() là cưa máy nhiều lưỡi cắt thanh gỗ thành một danh sách các khúc ngắn (list). Nếu bạn cần tách một bức thư thành từng dòng bất kể thư được viết trên máy Windows hay Mac, splitlines() là máy cắt dòng chuyên dụng. Nếu bạn chỉ muốn chặt thanh gỗ làm hai nửa quanh đúng một mắt gỗ đầu tiên (hoặc cuối cùng) và giữ lại cả cái mắt gỗ đó để kiểm tra, partition() và rpartition() luôn trả về đúng một khay 3 ngăn cố định (trước, mắt gỗ, sau). Cuối cùng, join() là súng bắn keo siêu tốc dán hàng ngàn mảnh gỗ lại với nhau chỉ trong một lần quét duy nhất.',
    visualHtml: `
      <div class="table-responsive">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>Phương thức</th>
              <th>Kiểu trả về</th>
              <th>Đặc điểm nhận diện cốt lõi</th>
              <th>Ví dụ kết quả</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>s.split(sep=None, maxsplit=-1)</code></td>
              <td><code>list[str]</code></td>
              <td>Tách từ trái qua phải. Chế độ <code>sep=None</code> gộp khoảng trắng liên tiếp.</td>
              <td><code>" a  b ".split()</code> &rarr; <code>['a', 'b']</code></td>
            </tr>
            <tr>
              <td><code>s.rsplit(sep=None, maxsplit=-1)</code></td>
              <td><code>list[str]</code></td>
              <td>Tách từ phải qua trái (khác biệt khi giới hạn <code>maxsplit</code>).</td>
              <td><code>"a.b.c".rsplit(".", 1)</code> &rarr; <code>['a.b', 'c']</code></td>
            </tr>
            <tr>
              <td><code>s.splitlines(keepends=False)</code></td>
              <td><code>list[str]</code></td>
              <td>Tách theo mọi ranh giới dòng (<code>\\n</code>, <code>\\r\\n</code>, <code>\\r</code>...).</td>
              <td><code>"a\\r\\nb\\n".splitlines()</code> &rarr; <code>['a', 'b']</code></td>
            </tr>
            <tr>
              <td><code>s.partition(sep)</code></td>
              <td><code>tuple[str, str, str]</code></td>
              <td>Luôn trả về tuple 3 phần tử tại vị trí khớp đầu tiên từ trái.</td>
              <td><code>"k=v=1".partition("=")</code> &rarr; <code>('k', '=', 'v=1')</code></td>
            </tr>
            <tr>
              <td><code>s.rpartition(sep)</code></td>
              <td><code>tuple[str, str, str]</code></td>
              <td>Luôn trả về tuple 3 phần tử tại vị trí khớp cuối cùng từ phải.</td>
              <td><code>"k=v=1".rpartition("=")</code> &rarr; <code>('k=v', '=', '1')</code></td>
            </tr>
            <tr>
              <td><code>sep.join(iterable)</code></td>
              <td><code>str</code></td>
              <td>Nối các chuỗi trong <code>iterable</code> bằng chất kết dính <code>sep</code>.</td>
              <td><code>"-".join(["2026", "10"])</code> &rarr; <code>"2026-10"</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Hai bộ mặt của split() và rsplit() — sep=None vs sep tường minh',
      badge: 'Trọng tâm dễ nhầm',
      content: `
        <p>Hai phương thức <strong><code>str.split(sep=None, maxsplit=-1)</code></strong> và <strong><code>str.rsplit(sep=None, maxsplit=-1)</code></strong> dùng để tách chuỗi thành một danh sách (<code>list</code>). Điều quan trọng nhất bạn phải nắm vững là <strong>hai thuật toán tách hoàn toàn khác nhau</strong> tùy thuộc vào việc bạn có truyền <code>sep</code> hay không:</p>
        <ul>
          <li><strong>Thuật toán 1 — Khi <code>sep=None</code> (hoặc không truyền đối số):</strong>
            <ul>
              <li>Tự động bỏ qua mọi khoảng trắng ở đầu và cuối chuỗi.</li>
              <li>Gộp mọi chuỗi khoảng trắng liên tiếp (nhiều dấu cách, <code>\\t</code>, <code>\\n</code>) thành <strong>một điểm cắt duy nhất</strong>.</li>
              <li>Đặc biệt: <code>"".split()</code> hoặc <code>"   ".split()</code> trả về danh sách rỗng <strong><code>[]</code></strong>!</li>
            </ul>
          </li>
          <li><strong>Thuật toán 2 — Khi truyền <code>sep</code> cụ thể (ví dụ <code>s.split(" ")</code> hoặc <code>s.split(",")</code>):</strong>
            <ul>
              <li>Cắt chính xác tại từng vị trí xuất hiện của <code>sep</code>, <strong>không gộp</strong> các dấu phân cách đứng cạnh nhau. Giữa hai dấu phân cách liền kề sẽ sinh ra một chuỗi rỗng <code>""</code>.</li>
              <li>Đặc biệt: <code>"".split(",")</code> trả về <strong><code>[""]</code></strong> (danh sách có 1 phần tử là chuỗi rỗng, không phải danh sách rỗng!).</li>
              <li>Nếu truyền <code>sep=""</code> (chuỗi rỗng), Python sẽ ném lỗi <code>ValueError: empty separator</code>.</li>
            </ul>
          </li>
        </ul>
        <p><strong>Khi nào <code>rsplit()</code> khác <code>split()</code>?</strong> Chỉ khi bạn giới hạn số lần cắt bằng <strong><code>maxsplit</code></strong> (với <code>maxsplit >= 1</code>). Khi đó <code>split</code> đếm vết cắt từ trái sang phải, còn <code>rsplit</code> đếm vết cắt từ phải sang trái.</p>
      `,
      codeExamples: [
        {
          title: 'Sự khác biệt một trời một vực giữa s.split() và s.split(" ")',
          code: `text = "  Python   3.14  "

print("s.split()    :", text.split())
print("s.split(' ') :", text.split(" "))

# Trường hợp chuỗi rỗng
print("''.split()   :", "".split())
print("''.split(','):", "".split(","))

# Ứng dụng maxsplit với split() và rsplit()
log = "2026-10-21 09:30:00 ERROR Server failed to respond"
date, time_str, level, message = log.split(maxsplit=3)
print(f"Level: {level} | Nội dung: {message}")

filepath = "archive.backup.2026.tar.gz"
name, ext = filepath.rsplit(".", maxsplit=1)
print(f"Tên: {name} | Đuôi cuối: {ext}")`,
          output: `s.split()    : ['Python', '3.14']
s.split(' ') : ['', '', 'Python', '', '', '3.14', '', '']
''.split()   : []
''.split(','): ['']
Level: ERROR | Nội dung: Server failed to respond
Tên: archive.backup.2026.tar | Đuôi cuối: gz`,
          annotations: [
            { line: 3, text: 'split() không đối số tự động dọn khoảng trắng đầu/cuối và gộp 3 dấu cách ở giữa.' },
            { line: 4, text: 'split(" ") cắt máy móc tại từng dấu cách một, sinh ra hàng loạt chuỗi rỗng "".' },
            { line: 7, text: 'Cần đặc biệt lưu ý: "".split() ra [] nhưng "".split(",") lại ra [""].' },
            { line: 12, text: 'maxsplit=3 chỉ cắt 3 khoảng trắng đầu tiên, giữ nguyên cả câu thông báo lỗi ở phần tử thứ 4.' },
            { line: 16, text: 'rsplit(".", maxsplit=1) cắt đúng 1 lần từ bên phải, rất tiện để tách phần mở rộng file.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Tách dòng với splitlines() và tách bộ ba cố định với partition()',
      badge: 'An toàn cấu trúc',
      content: `
        <p><strong>1. Phương thức <code>str.splitlines(keepends=False)</code>:</strong></p>
        <ul>
          <li>Tách chuỗi tại mọi ranh giới ngắt dòng chuẩn Unicode (không chỉ <code>\\n</code> mà cả <code>\\r\\n</code> của Windows, <code>\\r</code>, <code>\\v</code>, <code>\\f</code>, <code>\\x1c</code>, <code>\\x1d</code>, <code>\\x1e</code>, <code>\\x85</code>, <code>\\u2028</code>, <code>\\u2029</code>).</li>
          <li>Khác biệt lớn so với <code>split("\\n")</code>: Nếu chuỗi kết thúc bằng một dấu xuống dòng <code>"dòng 1\\ndòng 2\\n"</code>, <code>splitlines()</code> trả về <code>["dòng 1", "dòng 2"]</code> (không sinh ra chuỗi rỗng thừa ở cuối như <code>split("\\n")</code>). Ngoài ra, <code>"".splitlines()</code> trả về <code>[]</code>.</li>
          <li>Nếu truyền <code>keepends=True</code>, các ký tự ngắt dòng được giữ lại ở cuối mỗi phần tử.</li>
        </ul>
        <p><strong>2. Cặp phương thức <code>str.partition(sep)</code> và <code>str.rpartition(sep)</code>:</strong></p>
        <ul>
          <li>Luôn trả về một <strong>tuple đúng 3 phần tử</strong>: <code>(head, sep, tail)</code>.</li>
          <li>Nếu tìm thấy <code>sep</code>: trả về <code>(phần_trước, sep, phần_sau)</code>.</li>
          <li>Nếu <strong>không tìm thấy <code>sep</code></strong>:
            <ul>
              <li><code>s.partition(sep)</code> trả về <strong><code>(s, "", "")</code></strong> (chuỗi gốc nằm ở đầu).</li>
              <li><code>s.rpartition(sep)</code> trả về <strong><code>("", "", s)</code></strong> (chuỗi gốc nằm ở cuối).</li>
            </ul>
          </li>
          <li>Nhờ luôn trả về đúng 3 phần tử, bạn có thể unpack <code>key, sep, val = line.partition("=")</code> một cách an toàn tuyệt đối mà không bao giờ sợ lỗi <code>ValueError: not enough values to unpack</code> như khi dùng <code>split("=", 1)</code>!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh splitlines() với split("\\n") và giải phẫu partition()',
          code: `multiline = "Dòng 1\\r\\nDòng 2\\n"
print("split('\\\\n')      :", multiline.split("\\n"))
print("splitlines()     :", multiline.splitlines())
print("splitlines(True) :", multiline.splitlines(keepends=True))

# Dùng partition() để phân tích cấu hình key=value an toàn
config_lines = [
    "HOST=localhost",
    "DATABASE_URL=postgres://user:pass@db:5432/app?sslmode=require",
    "DEBUG_MODE"  # Dòng không có dấu '='
]

for line in config_lines:
    key, sep, value = line.partition("=")
    if sep:
        print(f"Key: {key:12} -> Value: {value}")
    else:
        print(f"Cờ đơn (không có '='): {key}")`,
          output: `split('\\n')      : ['Dòng 1\\r', 'Dòng 2', '']
splitlines()     : ['Dòng 1', 'Dòng 2']
splitlines(True) : ['Dòng 1\\r\\n', 'Dòng 2\\n']
Key: HOST         -> Value: localhost
Key: DATABASE_URL -> Value: postgres://user:pass@db:5432/app?sslmode=require
Cờ đơn (không có '='): DEBUG_MODE`,
          annotations: [
            { line: 2, text: 'split("\\n") để sót ký tự "\\r" ở Dòng 1 và tạo thêm phần tử rỗng "" ở cuối.' },
            { line: 3, text: 'splitlines() xử lý sạch cả "\\r\\n" lẫn "\\n" cuối chuỗi.' },
            { line: 14, text: 'Kể cả khi "DEBUG_MODE" không có dấu "=" hay "DATABASE_URL" có 2 dấu "=", partition("=") vẫn luôn trả về đúng 3 biến.' },
            { line: 15, text: 'Kiểm tra if sep: là cách chuẩn xác nhất để biết dấu phân cách có thực sự xuất hiện hay không.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Ghép chuỗi hiệu năng cao với str.join(iterable)',
      badge: 'Tối ưu bộ nhớ O(n)',
      content: `
        <p>Phương thức <strong><code>sep.join(iterable)</code></strong> được gọi trên chuỗi phân cách <code>sep</code> và nhận vào bất kỳ đối tượng khả duyệt nào (<code>list</code>, <code>tuple</code>, <code>set</code>, generator, hoặc thậm chí một <code>str</code> hay <code>dict</code>) chứa các phần tử kiểu <code>str</code>.</p>
        <p><strong>Tại sao phải dùng <code>join()</code> thay vì vòng lặp cộng chuỗi <code>+=</code>?</strong></p>
        <ul>
          <li>Vì <code>str</code> là bất biến, việc cộng nối <code>n</code> chuỗi trong vòng lặp có thể phải cấp phát và sao chép bộ nhớ nhiều lần (độ phức tạp lý thuyết $O(n^2)$).</li>
          <li>Ngược lại, <code>sep.join(iterable)</code> tính toán tổng dung lượng bộ nhớ của tất cả các mảnh ngay từ đầu, cấp phát <strong>đúng một vùng nhớ duy nhất</strong> rồi chép các ký tự vào với độ phức tạp tuyến tính <strong>$O(n)$</strong>!</li>
        </ul>
        <p><strong>Lưu ý:</strong> Mọi phần tử trong <code>iterable</code> bắt buộc phải là kiểu <code>str</code>. Nếu có số nguyên hoặc kiểu khác, <code>join()</code> sẽ ném <code>TypeError</code>; khi đó hãy kết hợp với generator expression: <code>", ".join(str(x) for x in items)</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng join() linh hoạt với list, generator và dictionary',
          code: `words = ["Python", "3.14", "nhanh", "và", "mạnh mẽ"]
print("Nối bằng dấu cách :", " ".join(words))
print("Nối không khoảng  :", "".join(["A", "B", "C"]))

# Khi danh sách chứa số nguyên hoặc kiểu dữ liệu khác
numbers = [10, 20, 30, 40]
csv_row = ", ".join(str(n) for n in numbers)
print("Dòng CSV từ list số:", csv_row)

# Khi truyền một dict vào join(), nó sẽ duyệt qua các KEYS của dict
params = {"page": "1", "sort": "desc", "limit": "50"}
query_string = "&".join(f"{k}={v}" for k, v in params.items())
print("Query URL          :", query_string)`,
          output: `Nối bằng dấu cách : Python 3.14 nhanh và mạnh mẽ
Nối không khoảng  : ABC
Dòng CSV từ list số: 10, 20, 30, 40
Query URL          : page=1&sort=desc&limit=50`,
          annotations: [
            { line: 3, text: '"".join(...) với chuỗi rỗng là cách chuẩn mực nhất để ghép một list các ký tự thành chuỗi.' },
            { line: 7, text: 'Chuyển từng số thành str bằng generator expression trước khi đưa vào join().' },
            { line: 12, text: 'Kết hợp f-string và join("&") để tạo chuỗi truy vấn URL cực kỳ gọn gàng.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy "".split(",") trả về [""] chứ không phải []',
        content: 'Nếu bạn đọc một dòng trống <code>line = ""</code> và gọi <code>items = line.split(",")</code>, bạn sẽ nhận được <code>items = [""]</code> có độ dài <code>len(items) == 1</code> (truthy!). Hãy kiểm tra <code>if not line:</code> trước khi tách bằng dấu phẩy.'
      },
      {
        title: 'Truyền trực tiếp một chuỗi vào join(): ", ".join("abc")',
        content: 'Vì bản thân <code>"abc"</code> cũng là một iterable gồm 3 ký tự, <code>", ".join("abc")</code> sẽ không báo lỗi mà trả về <code>"a, b, c"</code>! Hãy cẩn thận đừng truyền nhầm một biến kiểu <code>str</code> khi bạn định truyền <code>list[str]</code>.'
      }
    ],
    tips: [
      {
        title: 'Dùng partition() thay vì find() + slicing khi cần cắt chuỗi tại 1 điểm',
        content: 'Thay vì tìm vị trí bằng <code>pos = s.find(":")</code> rồi cắt <code>s[:pos]</code> và <code>s[pos+1:]</code> (rất dễ nhầm chỉ số <code>+1</code>), hãy viết <code>left, _, right = s.partition(":")</code> — vừa nhanh hơn vừa không bao giờ lệch index.'
      }
    ],
    deepDive: {
      title: 'Tối ưu hóa list comprehension bên trong str.join() của CPython',
      content: `
        <p>Trong CPython, hàm <code>str.join()</code> cần biết trước tổng độ dài của các chuỗi con để cấp phát bộ nhớ 1 lần, nên nó cần duyệt qua dữ liệu 2 lượt (lượt 1 tính tổng độ dài và kiểm tra kiểu <code>str</code>, lượt 2 sao chép byte). Nếu bạn truyền một <em>generator expression</em> như <code>"".join(str(x) for x in data)</code>, vì generator không thể duyệt lại lần 2 nên CPython phải âm thầm chuyển kết quả generator đó thành một <code>list</code> tạm ở bên dưới.</p>
        <p>Do đó, trong Python thực chiến, viết <strong>list comprehension</strong> trực tiếp bên trong <code>join</code> như <code>"".join([str(x) for x in data])</code> thực chất còn <strong>nhanh hơn khoảng 15% - 25%</strong> so với generator expression vì bỏ qua được chi phí khởi tạo và gọi hàm <code>next()</code> của đối tượng generator!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Đảo ngược thứ tự các từ trong câu',
      problem: 'Cho câu văn có nhiều khoảng trắng thừa: `sentence = "   Python   3.14   là   ngôn ngữ   tuyệt vời  "`. Hãy tách các từ, đảo ngược thứ tự của chúng và ghép lại thành một câu mới cách nhau đúng 1 khoảng trắng (`"vời tuyệt ngữ ngôn là 3.14 Python"`).',
      hint: 'Dùng `sentence.split()` để lấy danh sách từ sạch, đảo ngược bằng `[::-1]`, rồi nối lại bằng `" ".join(...)`.',
      solutionCode: `sentence = "   Python   3.14   là   ngôn ngữ   tuyệt vời  "
reversed_sentence = " ".join(sentence.split()[::-1])
print(repr(reversed_sentence))`,
      solutionOutput: `'vời tuyệt ngữ ngôn là 3.14 Python'`,
      explanation: '`sentence.split()` tự động loại bỏ khoảng trắng hai đầu và gộp khoảng trắng giữa các từ thành `[\'Python\', \'3.14\', \'là\', \'ngôn\', \'ngữ\', \'tuyệt\', \'vời\']`. Lát cắt `[::-1]` đảo ngược danh sách và `" ".join(...)` nối chúng lại.'
    },
    {
      level: 'Vừa',
      title: 'Phân tích HTTP Header bằng partition()',
      problem: 'Cho một đoạn văn bản chứa nhiều dòng HTTP Header (ngăn cách bằng `\\r\\n`). Mỗi dòng có dạng `Header-Name: Header-Value` (lưu ý phần Value có thể chứa thêm dấu hai chấm `:`, ví dụ `Host: localhost:8080`). Hãy dùng `splitlines()` và `partition(":")` để chuyển đoạn văn bản thành một `dict` với khóa được viết thường và giá trị đã được cắt khoảng trắng hai đầu.',
      hint: 'Duyệt qua `raw_headers.splitlines()`, gọi `k, sep, v = line.partition(":")` và kiểm tra `if sep:`.',
      solutionCode: `raw_headers = (
    "Host: localhost:8080\\r\\n"
    "Content-Type: application/json; charset=utf-8\\r\\n"
    "X-Custom-Timestamp: 12:30:45\\r\\n"
)

headers_dict = {}
for line in raw_headers.splitlines():
    key, sep, val = line.partition(":")
    if sep:
        headers_dict[key.strip().lower()] = val.strip()

for k, v in headers_dict.items():
    print(f"{k:20} => {v}")`,
      solutionOutput: `host                 => localhost:8080
content-type         => application/json; charset=utf-8
x-custom-timestamp   => 12:30:45`,
      explanation: 'Nhờ `partition(":")` chỉ cắt tại dấu `:` đầu tiên, các giá trị chứa dấu `:` như `localhost:8080` hay `12:30:45` được giữ nguyên vẹn trong biến `val`.'
    },
    {
      level: 'Khó',
      title: 'Biến đổi đường dẫn module và tên hàm bằng rpartition() và split()',
      problem: 'Cho danh sách các chuỗi định danh đầy đủ tới hàm trong Python (ví dụ `"package.subpkg.module:ClassName.method_name"` hoặc `"simple_module:func"` hoặc `"standalone_func"` không có dấu `:`). Hãy viết hàm `parse_entrypoint(spec)` trả về một tuple 3 phần tử `(module_path, class_name, func_name)`. Nếu không có dấu `:`, `module_path` là `""`. Trong phần sau dấu `:`, nếu có dấu `.` thì phần trước dấu `.` cuối cùng là `class_name` và sau là `func_name`; nếu không có dấu `.` thì `class_name` là `""`.',
      hint: 'Dùng `rpartition(":")` để tách phần module và phần đối tượng (vì nếu không có `:`, `rpartition` sẽ tự động đẩy toàn bộ chuỗi về biến thứ 3!). Sau đó dùng tiếp `rpartition(".")` trên phần đối tượng.',
      solutionCode: `def parse_entrypoint(spec: str) -> tuple[str, str, str]:
    mod_path, _, target = spec.rpartition(":")
    cls_name, _, func_name = target.rpartition(".")
    return (mod_path, cls_name, func_name)

specs = [
    "package.subpkg.module:ClassName.method_name",
    "simple_module:my_function",
    "standalone_func"
]

for s in specs:
    print(f"{s:44} -> {parse_entrypoint(s)}")`,
      solutionOutput: `package.subpkg.module:ClassName.method_name  -> ('package.subpkg.module', 'ClassName', 'method_name')
simple_module:my_function                    -> ('simple_module', '', 'my_function')
standalone_func                              -> ('', '', 'standalone_func')`,
      explanation: 'Đây là vẻ đẹp tuyệt đối của `rpartition()`: khi không tìm thấy dấu phân cách, nó trả về `("", "", chuỗi_gốc)`. Nhờ đó, ta hoàn toàn không cần một câu lệnh `if/else` nào mà vẫn xử lý đúng cả 3 trường hợp chỉ với 2 dòng code!'
    }
  ],

  quiz: [
    {
      question: 'Kết quả của hai biểu thức `"".split()` và `"".split(",")` lần lượt là gì?',
      options: [
        '`[]` và `[]`',
        '`[""]` và `[""]`',
        '`[]` và `[""]`',
        '`[""]` và `[]`'
      ],
      correctIndex: 2,
      explanation: 'Khi không truyền `sep` (`sep=None`), chuỗi rỗng trả về danh sách rỗng `[]`. Khi truyền `sep` tường minh (`","`), chuỗi rỗng không có dấu phẩy nào để cắt nên trả về danh sách chứa 1 phần tử là chính chuỗi rỗng đó `[""]`.'
    },
    {
      question: 'Khi gọi `"python".partition(":")` (dấu `:` không có trong chuỗi), giá trị trả về là gì?',
      options: [
        '`("python",)`',
        '`("python", "", "")`',
        '`("", "", "python")`',
        'Ném lỗi `ValueError`'
      ],
      correctIndex: 1,
      explanation: 'Khi không tìm thấy `sep`, `partition(sep)` luôn trả về tuple 3 phần tử `(s, "", "")`, còn `rpartition(sep)` trả về `("", "", s)`.'
    },
    {
      question: 'Biểu thức `"a\\nb\\n".splitlines()` khác `"a\\nb\\n".split("\\n")` ở điểm nào?',
      options: [
        '`splitlines()` trả về `["a", "b"]` còn `split("\\n")` trả về `["a", "b", ""]`',
        '`splitlines()` giữ lại ký tự `"\\n"` theo mặc định',
        '`splitlines()` chỉ hoạt động trên Windows',
        'Hai biểu thức trả về kết quả hoàn toàn giống nhau'
      ],
      correctIndex: 0,
      explanation: '`splitlines()` xem ký tự `"\\n"` ở cuối chuỗi là dấu kết thúc của dòng thứ 2 nên trả về 2 dòng `["a", "b"]`, trong khi `split("\\n")` coi nó là vách ngăn nên sinh thêm chuỗi rỗng `""` ở cuối.'
    },
    {
      question: 'Điều gì xảy ra khi thực thi `"-".join([1, 2, 3])` trong Python 3.14?',
      options: [
        'Trả về `"1-2-3"`',
        'Trả về `"[1, 2, 3]"`',
        'Ném ngoại lệ `TypeError: sequence item 0: expected str instance, int found`',
        'Ném ngoại lệ `ValueError`'
      ],
      correctIndex: 2,
      explanation: 'Phương thức `str.join()` yêu cầu mọi phần tử trong iterable bắt buộc phải là kiểu `str`. Để nối danh sách số, bạn phải chuyển đổi trước: `"-".join(str(x) for x in [1, 2, 3])`.'
    }
  ],

  summary: [
    'split() không tham số (sep=None) tự xóa khoảng trắng biên và gộp các khoảng trắng liên tiếp; split(sep) cắt chính xác tại từng dấu phân cách và có thể sinh chuỗi rỗng "".',
    'splitlines() tách dòng đa nền tảng và không tạo phần tử rỗng thừa ở cuối khi văn bản kết thúc bằng dấu xuống dòng.',
    'partition(sep) và rpartition(sep) luôn trả về tuple đúng 3 phần tử (head, sep, tail), cực kỳ an toàn để unpacking mà không lo lỗi thiếu giá trị.',
    'Sử dụng sep.join(iterable) để ghép nối nhiều chuỗi với độ phức tạp thời gian và bộ nhớ tuyến tính O(n).'
  ]
};
