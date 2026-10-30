export default {
  id: 'p2-03',
  partId: 'part-2',
  partTitle: 'Phần 2 – Phương thức của str (Trung cấp)',
  number: '2.3',
  title: 'Nhóm cắt dọn (strip, lstrip, rstrip, removeprefix, removesuffix)',
  subtitle: 'Làm sạch biên chuỗi chuẩn xác và tránh cạm bẫy kinh điển giữa tập ký tự với chuỗi con',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu rõ cơ chế quét từ biên vào trong của bộ ba strip([chars]), lstrip([chars]) và rstrip([chars]).',
    'Nhận diện và phòng tránh cạm bẫy nổi tiếng nhất của strip(chars): tham số chars là một TẬP HỢP các ký tự độc lập chứ không phải một chuỗi con cố định.',
    'Sử dụng thành thạo removeprefix(prefix) và removesuffix(suffix) để cắt bỏ chính xác tiền tố và hậu tố nguyên khối.',
    'Kết hợp nhóm phương thức cắt dọn để làm sạch dữ liệu thô từ file CSV, log hệ thống, đường dẫn URL và tên file.'
  ],

  intuition: {
    title: 'Máy tỉa hàng rào tự động vs Dao cắt nhãn nguyên khối',
    metaphor: 'Hãy tưởng tượng chuỗi ký tự như một hàng cây cảnh. Bộ ba strip(), lstrip(), rstrip() giống như chiếc máy tỉa hàng rào được nạp danh sách các loại lá cần tỉa (chars): nó đi từ hai đầu hàng cây vào giữa, hễ gặp bất kỳ chiếc lá nào nằm trong danh sách là cắt phăng, cho đến khi chạm phải một thân cây không nằm trong danh sách thì lập tức dừng lại (nên phần giữa hàng cây được giữ nguyên). Ngược lại, removeprefix() và removesuffix() là chiếc kéo cắt nhãn chuyên dụng: nó chỉ kiểm tra đúng một tấm nhãn nguyên vẹn gắn ở đầu hoặc cuối; nếu khớp 100% cả cụm thì bóc tấm nhãn đó ra đúng 1 lần, nếu lệch dù chỉ 1 chữ thì giữ nguyên không đụng chạm.',
    visualHtml: `
      <div class="table-responsive">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>Phương thức</th>
              <th>Bản chất tham số</th>
              <th>Số lần cắt</th>
              <th>Ví dụ với <code>"www.wiki.com"</code></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>s.strip([chars])</code></td>
              <td>Tập hợp các ký tự rời (mặc định: mọi khoảng trắng)</td>
              <td>Lặp lại liên tục ở 2 đầu</td>
              <td><code>s.strip("w.com")</code> &rarr; <code>"iki"</code> (mất cả chữ <code>w</code> của <code>wiki</code>!)</td>
            </tr>
            <tr>
              <td><code>s.lstrip([chars])</code></td>
              <td>Tập hợp các ký tự rời (cắt từ bên trái)</td>
              <td>Lặp lại liên tục ở đầu trái</td>
              <td><code>s.lstrip("w.")</code> &rarr; <code>"iki.com"</code> (xóa quá đà chữ <code>w</code>!)</td>
            </tr>
            <tr>
              <td><code>s.rstrip([chars])</code></td>
              <td>Tập hợp các ký tự rời (cắt từ bên phải)</td>
              <td>Lặp lại liên tục ở đầu phải</td>
              <td><code>s.rstrip(".com")</code> &rarr; <code>"www.wiki"</code></td>
            </tr>
            <tr>
              <td><code>s.removeprefix(prefix)</code></td>
              <td>Chuỗi con nguyên khối (bắt buộc truyền <code>str</code>)</td>
              <td>Tối đa 1 lần ở đầu trái</td>
              <td><code>s.removeprefix("www.")</code> &rarr; <code>"wiki.com"</code> (An toàn!)</td>
            </tr>
            <tr>
              <td><code>s.removesuffix(suffix)</code></td>
              <td>Chuỗi con nguyên khối (bắt buộc truyền <code>str</code>)</td>
              <td>Tối đa 1 lần ở đầu phải</td>
              <td><code>s.removesuffix(".com")</code> &rarr; <code>"www.wiki"</code> (An toàn!)</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Dọn khoảng trắng và ký tự biên với strip(), lstrip(), rstrip()',
      badge: 'Làm sạch dữ liệu',
      content: `
        <p>Khi đọc dữ liệu từ người dùng nhập vào, từ file văn bản (mỗi dòng thường kết thúc bằng <code>\\n</code> hoặc <code>\\r\\n</code>), hay từ trang web, chuỗi thường bị dính khoảng trắng thừa ở hai đầu. Ba phương thức sau giải quyết triệt để vấn đề này:</p>
        <ul>
          <li><strong><code>str.strip(chars=None)</code></strong>: Loại bỏ các ký tự ở cả <strong>đầu bên trái và đầu bên phải</strong> của chuỗi.</li>
          <li><strong><code>str.lstrip(chars=None)</code></strong>: Chỉ loại bỏ các ký tự ở <strong>đầu bên trái (leading)</strong>.</li>
          <li><strong><code>str.rstrip(chars=None)</code></strong>: Chỉ loại bỏ các ký tự ở <strong>đầu bên phải (trailing)</strong>.</li>
        </ul>
        <p><strong>Khi không truyền tham số (hoặc <code>chars=None</code>):</strong> Python tự động xóa toàn bộ các ký tự khoảng trắng theo chuẩn Unicode (bao gồm dấu cách <code>' '</code>, tab <code>'\\t'</code>, xuống dòng <code>'\\n'</code>, về đầu dòng <code>'\\r'</code>, sang trang <code>'\\f'</code>, tab dọc <code>'\\v'</code>, và cả khoảng trắng không ngắt dòng <code>'\\u00a0'</code>).</p>
        <p><strong>Quy tắc dừng:</strong> Quá trình cắt chỉ diễn ra ở hai biên. Ngay khi gặp ký tự đầu tiên <em>không thuộc nhóm cần xóa</em>, bộ quét của đầu đó sẽ dừng hẳn. Do đó, các khoảng trắng hay ký tự nằm <strong>ở giữa chuỗi luôn được bảo toàn nguyên vẹn</strong>.</p>
      `,
      codeExamples: [
        {
          title: 'Dọn khoảng trắng ở hai biên và giữ nguyên nội dung bên trong',
          code: `raw_input = "  \\t\\n  Python   3.14.8  \\r\\n "

print("strip() :", repr(raw_input.strip()))
print("lstrip():", repr(raw_input.lstrip()))
print("rstrip():", repr(raw_input.rstrip()))

# Truyền tham số chars để bóc các ký tự trang trí ở hai đầu
banner = "***===--- CHÀO MỪNG ĐẾN VỚI PYTHON ---===***"
clean_banner = banner.strip("*=- ")
print("Banner sạch:", repr(clean_banner))`,
          output: `strip() : 'Python   3.14.8'
lstrip(): 'Python   3.14.8  \\r\\n '
rstrip(): '  \\t\\n  Python   3.14.8'
Banner sạch: 'CHÀO MỪNG ĐẾN VỚI PYTHON'`,
          annotations: [
            { line: 3, text: 'strip() dọn sạch dấu cách, \\t, \\n, \\r ở cả hai đầu nhưng giữ nguyên 3 dấu cách giữa Python và 3.14.8.' },
            { line: 4, text: 'lstrip() chỉ dọn phía bên trái, phần "\\r\\n " bên phải vẫn còn nguyên.' },
            { line: 9, text: 'Truyền "*=- " nghĩa là xóa bất kỳ ký tự nào là *, =, - hoặc dấu cách ở hai biên.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Cạm bẫy kinh điển của strip(chars) — Tập ký tự, không phải chuỗi con!',
      badge: 'Cảnh báo quan trọng',
      content: `
        <p>Một trong những bug phổ biến nhất của lập trình viên Python (kể cả người đã có kinh nghiệm) là dùng <code>lstrip()</code> hoặc <code>rstrip()</code> để cắt bỏ tiền tố đường dẫn hoặc phần mở rộng file như <code>filename.rstrip(".py")</code>.</p>
        <p><strong>Tại sao lại sai?</strong> Vì tham số <code>chars</code> truyền vào <code>strip(".py")</code> được hiểu là một <strong>tập hợp gồm 3 ký tự rời rạc <code>{'.', 'p', 'y'}</code></strong>, hoàn toàn không quan tâm thứ tự! Bộ quét từ phải sang trái sẽ xóa mọi ký tự chừng nào ký tự đó vẫn nằm trong tập <code>{'.', 'p', 'y'}</code>.</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Biểu thức sai lầm</th>
                <th>Kết quả kỳ vọng</th>
                <th>Kết quả thực tế</th>
                <th>Nguyên nhân gây lỗi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>"script_copy.py".rstrip(".py")</code></td>
                <td><code>"script_copy"</code></td>
                <td><code>"script_co"</code></td>
                <td>Chữ <code>p</code> và <code>y</code> ở cuối từ <code>copy</code> nằm trong tập <code>{'.', 'p', 'y'}</code> nên bị xóa luôn!</td>
              </tr>
              <tr>
                <td><code>"www.working.com".lstrip("www.")</code></td>
                <td><code>"working.com"</code></td>
                <td><code>"orking.com"</code></td>
                <td>Chữ <code>w</code> đầu từ <code>working</code> nằm trong tập <code>{'w', '.'}</code> nên bị nuốt mất!</td>
              </tr>
              <tr>
                <td><code>"unhappy".lstrip("un")</code></td>
                <td><code>"happy"</code></td>
                <td><code>"happy"</code></td>
                <td>Trông có vẻ đúng, nhưng với <code>"union".lstrip("un")</code> sẽ trả về <code>"io"</code>!</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Minh họa trực quan lỗi mất ký tự khi dùng lstrip/rstrip sai mục đích',
          code: `filenames = ["main.py", "setup_copy.py", "display.py", "py_helper.py"]

print("--- DÙNGSAI: rstrip('.py') ---")
for fn in filenames:
    print(f"{fn:15} -> {fn.rstrip('.py')!r}")

urls = ["https://httpbin.org", "https://python.org", "https://shop.vn"]
print("\\n--- DÙNG SAI: lstrip('https://') ---")
for u in urls:
    print(f"{u:20} -> {u.lstrip('https://')!r}")`,
          output: `--- DÙNGSAI: rstrip('.py') ---
main.py         -> 'main'
setup_copy.py   -> 'setup_co'
display.py      -> 'displa'
py_helper.py    -> 'py_helper'

--- DÙNG SAI: lstrip('https://') ---
https://httpbin.org  -> 'bin.org'
https://python.org   -> 'ython.org'
https://shop.vn      -> 'op.vn'`,
          annotations: [
            { line: 5, text: '"setup_copy.py" bị mất "py" của từ "copy", còn "display.py" bị mất chữ "y" của từ "display"!' },
            { line: 10, text: 'Tập ký tự {"h", "t", "p", "s", ":", "/"} ăn cụt luôn chữ "http" của httpbin, chữ "p" của python và "sh" của shop!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Cắt tiền tố và hậu tố nguyên khối với removeprefix() và removesuffix()',
      badge: 'Chuẩn mực hiện đại',
      content: `
        <p>Để giải quyết triệt để sự nhầm lẫn của <code>lstrip</code>/<code>rstrip</code>, từ bản PEP 616 (Python 3.9+) đến Python 3.14, kiểu <code>str</code> cung cấp hai phương thức chuyên biệt:</p>
        <ul>
          <li><strong><code>str.removeprefix(prefix)</code></strong>: Nếu chuỗi bắt đầu bằng đúng chuỗi con <code>prefix</code>, trả về bản sao đã cắt bỏ <code>prefix</code> ở đầu (tương đương <code>s[len(prefix):]</code>). Nếu không khớp, trả về bản sao của chuỗi gốc nguyên vẹn.</li>
          <li><strong><code>str.removesuffix(suffix)</code></strong>: Nếu chuỗi kết thúc bằng đúng chuỗi con <code>suffix</code> (và <code>suffix</code> khác rỗng), trả về bản sao đã cắt bỏ <code>suffix</code> ở cuối (tương đương <code>s[:-len(suffix)]</code>). Nếu không khớp, trả về chuỗi gốc nguyên vẹn.</li>
        </ul>
        <p><strong>Đặc điểm quan trọng:</strong></p>
        <ul>
          <li>So khớp theo <strong>chuỗi con nguyên khối (exact substring)</strong> chứ không phải tập ký tự rời.</li>
          <li>Chỉ cắt <strong>tối đa 1 lần duy nhất</strong> (ví dụ <code>"test_test_file".removeprefix("test_")</code> trả về <code>"test_file"</code>).</li>
          <li>Tham số bắt buộc phải là một <code>str</code> duy nhất (không nhận <code>None</code> và không nhận <code>tuple</code> như <code>startswith</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng removeprefix() và removesuffix() an toàn tuyệt đối',
          code: `filenames = ["main.py", "setup_copy.py", "display.py", "README.md"]
for fn in filenames:
    stem = fn.removesuffix(".py")
    print(f"{fn:15} -> {stem!r}")

urls = ["https://httpbin.org", "https://python.org", "https://shop.vn"]
for u in urls:
    host = u.removeprefix("https://")
    print(f"{u:20} -> {host!r}")

# Chỉ cắt đúng 1 lần ở biên
repeated = "pre_pre_value"
print("removeprefix 1 lần:", repeated.removeprefix("pre_"))`,
          output: `main.py         -> 'main'
setup_copy.py   -> 'setup_copy'
display.py      -> 'display'
README.md       -> 'README.md'
https://httpbin.org  -> 'httpbin.org'
https://python.org   -> 'python.org'
https://shop.vn      -> 'shop.vn'
removeprefix 1 lần: pre_value`,
          annotations: [
            { line: 3, text: 'removesuffix(".py") giữ nguyên chữ "copy" và "display", đồng thời không làm hỏng "README.md".' },
            { line: 8, text: 'removeprefix("https://") bóc đúng cụm giao thức mà không chạm vào chữ h, t, p, s của tên miền.' },
            { line: 13, text: 'Khác với lstrip, removeprefix chỉ bóc đúng một lớp tiền tố "pre_" ở ngoài cùng.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Truyền tuple vào removeprefix() hoặc removesuffix()',
        content: 'Khác với <code>startswith()</code> và <code>endswith()</code> vốn cho phép truyền một <code>tuple</code> các tiền tố/hậu tố, hai phương thức <code>removeprefix()</code> và <code>removesuffix()</code> <strong>chỉ chấp nhận duy nhất một đối số kiểu <code>str</code></strong>. Truyền tuple sẽ gây ra <code>TypeError</code>.'
      },
      {
        title: 'Tưởng rằng strip() xóa được khoảng trắng thừa ở giữa các từ',
        content: '<code>"Xin    chào".strip()</code> vẫn giữ nguyên 4 dấu cách ở giữa. Để thu gọn khoảng trắng ở giữa về 1 dấu cách, hãy dùng cụm <code>" ".join(s.split())</code>.'
      }
    ],
    tips: [
      {
        title: 'Dùng rstrip("\\r\\n") khi đọc dòng từ file văn bản',
        content: 'Khi duyệt từng dòng trong file, nếu bạn gọi <code>line.strip()</code> hoặc <code>line.rstrip()</code> không tham số, bạn sẽ vô tình xóa mất cả dấu cách hoặc tab có chủ đích ở đầu/cuối dòng dữ liệu. Thay vào đó, hãy dùng <code>line.rstrip("\\r\\n")</code> để chỉ cắt bỏ ký tự xuống dòng.'
      }
    ],
    deepDive: {
      title: 'Cách cài đặt tương đương của removeprefix và removesuffix trong CPython',
      content: `
        <p>Theo đặc tả PEP 616, logic của hai phương thức này tương đương với đoạn mã Python thuần sau (nhưng được viết bằng C để đạt tốc độ tối đa):</p>
        <p>Với <code>s.removeprefix(prefix)</code>: nếu <code>s.startswith(prefix)</code> thì trả về <code>s[len(prefix):]</code>, ngược lại trả về <code>s[:]</code>.</p>
        <p>Với <code>s.removesuffix(suffix)</code>: cần chú ý trường hợp đặc biệt khi <code>suffix == ""</code> (chuỗi rỗng). Nếu viết ngây thơ <code>s[:-len(suffix)]</code> khi <code>len(suffix) == 0</code> thì nó sẽ thành <code>s[:-0]</code> tức là <code>s[:0]</code> (trả về chuỗi rỗng <code>""</code>, làm mất toàn bộ chuỗi gốc!). Do đó, CPython kiểm tra chặt chẽ: <code>if suffix and s.endswith(suffix): return s[:-len(suffix)]</code>.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Làm sạch giá tiền sản phẩm từ chuỗi thô',
      problem: 'Cho danh sách các chuỗi giá tiền thu thập từ web: `prices = ["  $1,250.00\\n", "\\t$89.50  ", "USD $420.00 "]`. Hãy dùng kết hợp các phương thức cắt dọn để lấy ra chuỗi số thuần túy (giữ dấu chấm thập phân, giữ dấu phẩy ngàn, nhưng bỏ hết khoảng trắng, ký hiệu `USD` và dấu `$` ở đầu/cuối).',
      hint: 'Trước tiên gọi `.strip()` để bỏ khoảng trắng, sau đó gọi `.removeprefix("USD")` -> `.strip()` -> `.removeprefix("$")` (hoặc dùng `.lstrip("USD$ ")`).',
      solutionCode: `prices = ["  $1,250.00\\n", "\\t$89.50  ", "USD $420.00 "]

for raw in prices:
    cleaned = raw.strip().removeprefix("USD").strip().removeprefix("$")
    print(f"{raw!r:18} -> {cleaned!r}")`,
      solutionOutput: `'  $1,250.00\\n'    -> '1,250.00'
'\\t$89.50  '       -> '89.50'
'USD $420.00 '     -> '420.00'`,
      explanation: 'Việc kết hợp chuỗi phương thức (method chaining) `.strip().removeprefix("USD").strip().removeprefix("$")` giúp bóc tách từng lớp tiền tố một cách an toàn và rõ ràng.'
    },
    {
      level: 'Vừa',
      title: 'Chuẩn hóa đường dẫn URL về dạng tên miền gốc',
      problem: 'Viết hàm `clean_domain(url)` nhận vào một URL có thể có khoảng trắng thừa ở hai đầu, bắt đầu bằng `"http://"` hoặc `"https://"`, tiếp theo có thể có `"www."`, và ở cuối có thể dư một hoặc nhiều dấu gạch chéo `"/"` (ví dụ `"  https://www.watched.com///  "`). Hãy trả về tên miền sạch (`"watched.com"`) mà không làm mất chữ `"w"` của `"watched.com"`.',
      hint: 'Dùng `strip()` cho khoảng trắng, `removeprefix()` lần lượt cho `"https://"`, `"http://"`, `"www."`, và dùng `rstrip("/")` để xóa mọi dấu `/` dư ở cuối.',
      solutionCode: `def clean_domain(url: str) -> str:
    s = url.strip()
    for proto in ("https://", "http://"):
        if s.startswith(proto):
            s = s.removeprefix(proto)
            break
    s = s.removeprefix("www.")
    return s.rstrip("/")

samples = [
    "  https://www.watched.com///  ",
    "http://www.wikipedia.org/",
    "https://python.org"
]
for u in samples:
    print(f"{u.strip():28} -> {clean_domain(u)}")`,
      solutionOutput: `https://www.watched.com///   -> watched.com
http://www.wikipedia.org/    -> wikipedia.org
https://python.org           -> python.org`,
      explanation: 'Dùng `removeprefix("www.")` đảm bảo chỉ bóc đúng tiền tố `"www."` chứ không ăn lẹm vào chữ `"w"` đầu tiên của `"watched.com"` hay `"wikipedia.org"`. Ở cuối chuỗi, vì ta muốn xóa toàn bộ các dấu `"/"` lặp lại nên `rstrip("/")` lại là công cụ hoàn hảo.'
    },
    {
      level: 'Khó',
      title: 'Bóc tách phần mở rộng kép của tệp nén',
      problem: 'Viết hàm `strip_archive_ext(filename)` nhận vào tên file và loại bỏ phần mở rộng nén nếu nó thuộc danh sách `ARCHIVE_EXTS = (".tar.gz", ".tar.bz2", ".tar.xz", ".tgz", ".zip", ".gz")`. Lưu ý: Nếu một file có đuôi `.tar.gz` (ví dụ `"backup_2026.tar.gz"`), phải cắt trọn vẹn cả `.tar.gz` để trả về `"backup_2026"` chứ không phải chỉ cắt `.gz` để lại `"backup_2026.tar"`. Đồng thời chỉ cắt tối đa 1 đuôi khớp dài nhất.',
      hint: 'Sắp xếp danh sách đuôi file theo độ dài giảm dần (hoặc kiểm tra đuôi dài trước), dùng `endswith()` (hoặc so sánh với `removesuffix()`) rồi thoát vòng lặp ngay khi cắt thành công.',
      solutionCode: `ARCHIVE_EXTS = (".tar.gz", ".tar.bz2", ".tar.xz", ".tgz", ".zip", ".gz")

def strip_archive_ext(filename: str) -> str:
    # Sắp xếp theo độ dài giảm dần để ưu tiên khớp đuôi kép (.tar.gz trước .gz)
    for ext in sorted(ARCHIVE_EXTS, key=len, reverse=True):
        if filename.endswith(ext):
            return filename.removesuffix(ext)
    return filename

files = [
    "backup_2026.tar.gz",
    "access_log.gz",
    "project_tar.zip",
    "notes.txt"
]
for f in files:
    print(f"{f:20} -> {strip_archive_ext(f)}")`,
      solutionOutput: `backup_2026.tar.gz   -> backup_2026
access_log.gz        -> access_log
project_tar.zip      -> project_tar
notes.txt            -> notes.txt`,
      explanation: 'Nhờ sắp xếp các hậu tố theo độ dài giảm dần (`key=len, reverse=True`), hậu tố dài `".tar.gz"` được kiểm tra và cắt bằng `removesuffix()` trước khi xét đến `".gz"`, giúp `"backup_2026.tar.gz"` được bóc sạch thành `"backup_2026"`.'
    }
  ],

  quiz: [
    {
      question: 'Kết quả của biểu thức `"banana_split.txt".rstrip(".txt")` là gì?',
      options: [
        '`"banana_split"`',
        '`"banana_spli"`',
        '`"banana_split."`',
        'Ném lỗi `ValueError`'
      ],
      correctIndex: 1,
      explanation: '`rstrip(".txt")` xóa mọi ký tự ở biên phải thuộc tập `{\'.\', \'t\', \'x\'}`. Sau khi xóa `".txt"`, ký tự kế tiếp ở biên phải là chữ `"t"` cuối của từ `"split"`, vốn cũng nằm trong tập hợp nên bị xóa tiếp, để lại `"banana_spli"`!'
    },
    {
      question: 'Biểu thức nào sau đây giúp cắt bỏ chính xác đuôi `".txt"` khỏi `"banana_split.txt"` mà không làm mất chữ `"t"` của từ `"split"`?',
      options: [
        '`"banana_split.txt".strip(".txt")`',
        '`"banana_split.txt".removesuffix(".txt")`',
        '`"banana_split.txt".removeprefix(".txt")`',
        '`"banana_split.txt".rstrip("txt")`'
      ],
      correctIndex: 1,
      explanation: '`removesuffix(".txt")` kiểm tra và cắt đúng chuỗi con nguyên khối `".txt"` ở cuối đúng 1 lần duy nhất, giữ nguyên vẹn chữ `"t"` trong `"split"`.'
    },
    {
      question: 'Cho chuỗi `s = "Test_Test_Case"`. Kết quả của `s.removeprefix("Test_")` là gì?',
      options: [
        '`"Case"`',
        '`"Test_Case"`',
        '`"est_Test_Case"`',
        '`"Test_Test_Case"`'
      ],
      correctIndex: 1,
      explanation: '`removeprefix()` chỉ cắt bỏ tiền tố khớp ở đầu chuỗi tối đa 1 lần duy nhất, nên lớp `"Test_"` thứ hai vẫn được giữ nguyên.'
    },
    {
      question: 'Khi gọi `s.strip()` không truyền tham số, những ký tự nào sẽ bị xóa ở hai đầu chuỗi `s`?',
      options: [
        'Chỉ duy nhất ký tự dấu cách ASCII `" "`',
        'Dấu cách `" "` và dấu chấm câu',
        'Tất cả các ký tự khoảng trắng Unicode (như `" "`, `"\\t"`, `"\\n"`, `"\\r"`, `"\\v"`, `"\\f"`, ...)',
        'Mọi ký tự không phải chữ cái và chữ số'
      ],
      correctIndex: 2,
      explanation: 'Khi `chars=None` (mặc định), `strip()`, `lstrip()` và `rstrip()` xóa mọi ký tự có thuộc tính khoảng trắng (whitespace) theo chuẩn Unicode ở hai biên của chuỗi.'
    }
  ],

  summary: [
    'strip(), lstrip(), rstrip() khi không truyền tham số sẽ xóa toàn bộ các ký tự khoảng trắng (space, tab, newline...) ở hai biên chuỗi.',
    'Khi truyền tham số chars vào strip(chars), Python hiểu đó là một TẬP HỢP các ký tự rời rạc cần xóa liên tục từ biên vào trong, KHÔNG PHẢI chuỗi con.',
    'Sử dụng removeprefix(prefix) và removesuffix(suffix) khi muốn cắt bỏ chính xác một tiền tố hoặc hậu tố nguyên khối đúng 1 lần.',
    'Cả 5 phương thức cắt dọn chỉ tác động ở hai đầu biên, hoàn toàn không làm thay đổi các ký tự nằm ở phần giữa của chuỗi.'
  ]
};
