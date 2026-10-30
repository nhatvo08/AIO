export default {
  id: 'p2-02',
  partId: 'part-2',
  partTitle: 'Phần 2 – Phương thức của str (Trung cấp)',
  number: '2.2',
  title: 'Nhóm tìm kiếm (find, rfind, index, rindex, count, startswith, endswith)',
  subtitle: 'Định vị chính xác chuỗi con, đếm tần suất không chồng lấp và kiểm tra tiền tố/hậu tố đa mẫu',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt rõ cơ chế báo lỗi giữa cặp phương thức find()/rfind() (trả về -1) và index()/rindex() (ném ngoại lệ ValueError) khi không tìm thấy chuỗi con.',
    'Sử dụng thành thạo hai tham số giới hạn phạm vi tìm kiếm [start, end) mà không cần cắt chuỗi (slicing) gây tốn bộ nhớ.',
    'Hiểu cơ chế đếm không chồng lấp (non-overlapping) của count() và hành vi đặc biệt khi tìm chuỗi rỗng "".',
    'Vận dụng startswith() và endswith() truyền vào một tuple các tiền tố/hậu tố để viết mã kiểm tra điều kiện ngắn gọn, chuẩn Pythonic.'
  ],

  intuition: {
    title: 'Đội radar dò tìm hai chiều trên băng giấy',
    metaphor: 'Hãy hình dung chuỗi ký tự như một dãy nhà đánh số từ 0 đến n-1. Khi cần tìm một cụm ký tự: find() và index() là chiếc radar quét từ đầu phố (trái sang phải), còn rfind() và rindex() quét từ cuối phố ngược về (phải sang trái). Điểm khác biệt duy nhất nằm ở thái độ khi không tìm thấy: find() lịch sự báo cáo con số -1, còn index() lập tức bấm còi báo động đỏ (ValueError). Trong khi đó, startswith() và endswith() là hai nhân viên gác cổng chỉ kiểm tra đúng biển hiệu ở cổng đầu và cổng cuối.',
    visualHtml: `
      <div class="table-responsive">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>Phương thức</th>
              <th>Hướng quét</th>
              <th>Khi tìm thấy</th>
              <th>Khi KHÔNG tìm thấy</th>
              <th>Kiểu trả về</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>s.find(sub[, start[, end]])</code></td>
              <td>Trái &rarr; Phải</td>
              <td>Chỉ số (index) đầu tiên</td>
              <td>Trả về <code>-1</code></td>
              <td><code>int</code></td>
            </tr>
            <tr>
              <td><code>s.rfind(sub[, start[, end]])</code></td>
              <td>Phải &rarr; Trái</td>
              <td>Chỉ số (index) cao nhất</td>
              <td>Trả về <code>-1</code></td>
              <td><code>int</code></td>
            </tr>
            <tr>
              <td><code>s.index(sub[, start[, end]])</code></td>
              <td>Trái &rarr; Phải</td>
              <td>Chỉ số (index) đầu tiên</td>
              <td>Ném <code>ValueError</code></td>
              <td><code>int</code></td>
            </tr>
            <tr>
              <td><code>s.rindex(sub[, start[, end]])</code></td>
              <td>Phải &rarr; Trái</td>
              <td>Chỉ số (index) cao nhất</td>
              <td>Ném <code>ValueError</code></td>
              <td><code>int</code></td>
            </tr>
            <tr>
              <td><code>s.count(sub[, start[, end]])</code></td>
              <td>Trái &rarr; Phải</td>
              <td>Số lần xuất hiện (không đè nhau)</td>
              <td>Trả về <code>0</code></td>
              <td><code>int</code></td>
            </tr>
            <tr>
              <td><code>s.startswith(prefix[, start[, end]])</code></td>
              <td>Tại vị trí đầu</td>
              <td><code>True</code></td>
              <td><code>False</code></td>
              <td><code>bool</code></td>
            </tr>
            <tr>
              <td><code>s.endswith(suffix[, start[, end]])</code></td>
              <td>Tại vị trí cuối</td>
              <td><code>True</code></td>
              <td><code>False</code></td>
              <td><code>bool</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Định vị chuỗi con với find(), rfind(), index() và rindex()',
      badge: 'Định vị vị trí',
      content: `
        <p>Cả 4 phương thức định vị đều nhận cùng một cấu trúc tham số: <code>(sub[, start[, end]])</code>, trong đó:</p>
        <ul>
          <li><code>sub</code> (bắt buộc, kiểu <code>str</code>): Chuỗi con cần tìm.</li>
          <li><code>start</code>, <code>end</code> (tùy chọn, kiểu <code>int</code> hoặc <code>None</code>): Giới hạn vùng tìm kiếm trong lát cắt <code>s[start:end]</code> (bao gồm <code>start</code>, không bao gồm <code>end</code>). Điểm quan trọng: chỉ số trả về luôn là <strong>chỉ số tuyệt đối tính từ đầu chuỗi gốc <code>s</code></strong>, chứ không phải tính từ <code>start</code>!</li>
        </ul>
        <p><strong>Khi nào dùng phương thức nào?</strong></p>
        <ul>
          <li>Nếu bạn chỉ muốn biết chuỗi con <em>có tồn tại hay không</em> mà không cần vị trí: hãy dùng toán tử <strong><code>sub in s</code></strong> (nhanh hơn và rõ nghĩa hơn).</li>
          <li>Nếu chuỗi con có thể không xuất hiện và bạn muốn rẽ nhánh bằng <code>if pos != -1:</code>: hãy dùng <strong><code>find()</code> / <code>rfind()</code></strong>.</li>
          <li>Nếu về mặt logic chuỗi con <em>bắt buộc phải có</em> (nếu thiếu là dữ liệu hỏng cần dừng luồng hoặc bắt bằng <code>try...except</code>): hãy dùng <strong><code>index()</code> / <code>rindex()</code></strong>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Tìm kiếm hai chiều và sử dụng vùng giới hạn [start, end)',
          code: `path = "/home/user/docs/report_2026_final.pdf"

# Tìm dấu '/' đầu tiên và cuối cùng
first_slash = path.find("/")
last_slash = path.rfind("/")
print(f"Dấu '/' đầu: {first_slash}, cuối: {last_slash}")
print(f"Tên file   : {path[last_slash + 1:]}")

# Tìm dấu '/' thứ hai bằng cách đặt start = first_slash + 1
second_slash = path.find("/", first_slash + 1)
print(f"Dấu '/' thứ 2 ở index: {second_slash}")

# Sự khác biệt khi không tìm thấy
print("find('.docx') :", path.find(".docx"))
try:
    path.index(".docx")
except ValueError as e:
    print("index('.docx') ném ValueError:", e)`,
          output: `Dấu '/' đầu: 0, cuối: 15
Tên file   : report_2026_final.pdf
Dấu '/' thứ 2 ở index: 5
find('.docx') : -1
index('.docx') ném ValueError: substring not found`,
          annotations: [
            { line: 4, text: 'find("/") tìm từ trái sang phải, gặp ngay ký tự đầu tiên tại index 0.' },
            { line: 5, text: 'rfind("/") tìm từ phải sang trái, gặp dấu "/" cuối cùng tại index 15 (nhưng vẫn trả về index dương tính từ đầu chuỗi).' },
            { line: 10, text: 'Truyền start = 1 giúp tìm tiếp mà không cần tạo chuỗi con mới bằng slicing path[1:].' },
            { line: 16, text: 'index() ném ValueError: substring not found khi không tìm thấy chuỗi con.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Đếm số lần xuất hiện không chồng lấp với count()',
      badge: 'Thống kê tần suất',
      content: `
        <p>Phương thức <strong><code>str.count(sub[, start[, end]])</code></strong> trả về số lần xuất hiện <strong>không chồng lấp (non-overlapping)</strong> của chuỗi con <code>sub</code> trong phạm vi <code>s[start:end]</code>.</p>
        <ul>
          <li><strong>Cơ chế không chồng lấp:</strong> Ngay khi tìm thấy một khớp của <code>sub</code> tại vị trí <code>i</code>, con trỏ quét sẽ nhảy thẳng tới <code>i + len(sub)</code> để tìm tiếp, chứ không lùi lại <code>i + 1</code>. Ví dụ: trong chuỗi <code>"aaaa"</code>, chuỗi con <code>"aa"</code> xuất hiện ở vị trí <code>0..1</code> rồi nhảy sang vị trí <code>2..3</code>, nên <code>"aaaa".count("aa")</code> trả về <code>2</code> (chứ không phải <code>3</code>).</li>
          <li><strong>Trường hợp <code>sub == ""</code> (chuỗi rỗng):</strong> Giữa <code>n</code> ký tự của chuỗi có <code>n - 1</code> khe hở, cộng thêm 1 vị trí trước ký tự đầu và 1 vị trí sau ký tự cuối. Do đó, <code>s.count("")</code> luôn trả về <strong><code>len(s) + 1</code></strong>!</li>
        </ul>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Biểu thức</th>
                <th>Kết quả</th>
                <th>Giải thích chi tiết</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>"banana".count("na")</code></td>
                <td><code>2</code></td>
                <td>Khớp tại vị trí 2 (<code>ba[na]na</code>) và vị trí 4 (<code>bana[na]</code>).</td>
              </tr>
              <tr>
                <td><code>"banana".count("ana")</code></td>
                <td><code>1</code></td>
                <td>Khớp đầu tiên tiêu thụ <code>b[ana]na</code> (index 1..3), phần còn lại <code>"na"</code> không đủ tạo thêm <code>"ana"</code>.</td>
              </tr>
              <tr>
                <td><code>"abc".count("")</code></td>
                <td><code>4</code></td>
                <td>Chuỗi rỗng khớp tại 4 biên: <code>|a|b|c|</code> (tức <code>len("abc") + 1</code>).</td>
              </tr>
              <tr>
                <td><code>"".count("")</code></td>
                <td><code>1</code></td>
                <td>Chuỗi rỗng chứa đúng 1 chuỗi rỗng (<code>0 + 1 = 1</code>).</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Đếm không chồng lấp vs Đếm có chồng lấp',
          code: `dna = "ATATATAT"
print("count('ATAT') mặc định (không chồng lấp):", dna.count("ATAT"))

# Cách đếm CÓ chồng lấp (overlapping) bằng vòng lặp với find()
def count_overlapping(text: str, sub: str) -> int:
    if not sub:
        return len(text) + 1
    total = 0
    start = 0
    while (pos := text.find(sub, start)) != -1:
        total += 1
        start = pos + 1  # Chỉ dịch 1 ký tự thay vì len(sub)
    return total

print("Đếm có chồng lấp 'ATAT' trong 'ATATATAT':", count_overlapping(dna, "ATAT"))
print("Đếm chuỗi rỗng trong 'Python'           :", "Python".count(""))`,
          output: `count('ATAT') mặc định (không chồng lấp): 2
Đếm có chồng lấp 'ATAT' trong 'ATATATAT': 3
Đếm chuỗi rỗng trong 'Python'           : 7`,
          annotations: [
            { line: 2, text: 'count() khớp ATAT ở [0:4] rồi nhảy sang [4:8], tổng cộng được 2 lần.' },
            { line: 10, text: 'Toán tử walrus (:=) kết hợp với find(sub, start) giúp quét toàn bộ chuỗi rất gọn.' },
            { line: 12, text: 'Tăng start = pos + 1 giúp phát hiện cả mẫu ATAT nằm ở giữa tại index [2:6].' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Kiểm tra biên chuỗi với startswith() và endswith()',
      badge: 'Kiểm tra đa mẫu',
      content: `
        <p>Hai phương thức <strong><code>str.startswith(prefix[, start[, end]])</code></strong> và <strong><code>str.endswith(suffix[, start[, end]])</code></strong> kiểm tra xem chuỗi (hoặc vùng <code>s[start:end]</code>) có bắt đầu bằng <code>prefix</code> hoặc kết thúc bằng <code>suffix</code> hay không.</p>
        <p><strong>Sức mạnh đặc biệt — Truyền một <code>tuple</code> các chuỗi:</strong></p>
        <ul>
          <li>Tham số đầu tiên (<code>prefix</code> hoặc <code>suffix</code>) có thể là một <code>str</code> đơn lẻ HOẶC một <strong><code>tuple[str, ...]</code></strong>. Nếu truyền tuple, phương thức trả về <code>True</code> ngay khi khớp với bất kỳ phần tử nào trong tuple đó.</li>
          <li><strong>Lưu ý cực kỳ quan trọng:</strong> Python chỉ chấp nhận <code>str</code> hoặc <code>tuple</code> của các <code>str</code>. Nếu bạn truyền một <code>list</code> hoặc <code>set</code> (ví dụ <code>s.endswith([".png", ".jpg"])</code>), Python sẽ lập tức ném lỗi <code>TypeError</code>!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra phần mở rộng file và giao thức URL bằng tuple',
          code: `files = ["avatar.png", "report.pdf", "banner.JPG", "archive.tar.gz", "script.py"]
image_exts = (".png", ".jpg", ".jpeg", ".webp", ".gif")

# Lọc danh sách file ảnh (kết hợp casefold để không phân biệt hoa thường)
images = [f for f in files if f.casefold().endswith(image_exts)]
print("Các file ảnh:", images)

# Sử dụng tham số start với startswith để kiểm tra tại vị trí bất kỳ
log_line = "2026-10-21 [ERROR] Database connection timeout"
is_error = log_line.startswith(("[ERROR]", "[CRITICAL]"), 11)
print("Dòng log báo lỗi tại cột 11:", is_error)

# Minh họa lỗi TypeError nếu truyền list thay vì tuple
try:
    "test.py".endswith([".py", ".js"])
except TypeError as err:
    print("Lỗi khi truyền list:", err)`,
          output: `Các file ảnh: ['avatar.png', 'banner.JPG']
Dòng log báo lỗi tại cột 11: True
Lỗi khi truyền list: endswith first arg must be str or a tuple of str, not list`,
          annotations: [
            { line: 2, text: 'Khai báo image_exts là một tuple các chuỗi đuôi file.' },
            { line: 5, text: 'Kết hợp casefold().endswith(image_exts) giúp bắt được cả "banner.JPG".' },
            { line: 10, text: 'Tham số start=11 kiểm tra ngay tại vị trí thứ 11 mà không cần cắt chuỗi log_line[11:].' },
            { line: 15, text: 'Truyền list vào endswith() sẽ gây ra TypeError ngay lập tức.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Viết if s.find(sub): để kiểm tra sự tồn tại của chuỗi con',
        content: 'Đây là lỗi logic cực kỳ nguy hiểm! Trong Python, số <code>0</code> có giá trị falsy, còn số <code>-1</code> lại có giá trị truthy. Nếu <code>sub</code> nằm ngay đầu chuỗi (trả về <code>0</code>), <code>if s.find(sub):</code> sẽ đánh giá là <code>False</code>; ngược lại khi không tìm thấy (trả về <code>-1</code>), nó lại đánh giá là <code>True</code>! Luôn viết <code>if sub in s:</code> hoặc <code>if s.find(sub) != -1:</code>.'
      },
      {
        title: 'Truyền list vào startswith() hoặc endswith()',
        content: 'Cả hai phương thức chỉ nhận <code>str</code> hoặc <code>tuple</code> các <code>str</code>. Nếu dữ liệu của bạn đang ở dạng <code>list</code>, hãy ép kiểu bằng <code>tuple(my_list)</code> trước khi truyền vào.'
      }
    ],
    tips: [
      {
        title: 'Tận dụng tham số start và end để tiết kiệm bộ nhớ',
        content: 'Thay vì viết <code>large_text[1000:5000].find("target")</code> (vốn phải cấp phát bộ nhớ tạo chuỗi mới dài 4000 ký tự), hãy viết <code>large_text.find("target", 1000, 5000)</code> để tìm trực tiếp trên vùng đệm của chuỗi gốc với chi phí bộ nhớ O(1).'
      }
    ],
    deepDive: {
      title: 'Thuật toán tìm kiếm chuỗi bên trong CPython 3.14 (Fast Search)',
      content: `
        <p>Bên dưới lớp vỏ Python, các phương thức <code>find()</code>, <code>index()</code>, <code>count()</code> và toán tử <code>in</code> đều gọi tới thuật toán <strong>Fast Search</strong> viết bằng C (trong file <code>Objects/stringlib/fastsearch.h</code> của CPython).</p>
        <p>Đây là một biến thể lai thông minh giữa thuật toán <strong>Boyer-Moore-Horspool</strong> và <strong>Sunday</strong> kèm bộ lọc bitmask (Bloom filter thu nhỏ 64-bit). Thay vì so sánh từng ký tự một từ đầu đến cuối với độ phức tạp $O(n \\times m)$, CPython nhìn vào ký tự cuối của mẫu tìm kiếm và dùng bảng đánh dấu bit để nhảy cóc qua nhiều ký tự cùng lúc, giúp tốc độ thực tế trong hầu hết trường hợp đạt mức $O(n / m)$ (sub-linear time)!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Trích xuất tên miền từ địa chỉ email',
      problem: 'Cho danh sách các chuỗi đầu vào `inputs = ["contact@python.org", "invalid_email_address", "admin@mail.google.com"]`. Dùng `find()` hoặc `rfind()` để trích xuất phần tên miền (sau ký tự `@` cuối cùng). Nếu không có `@` hoặc `@` nằm ở cuối cùng, trả về `"Không hợp lệ"`.',
      hint: 'Dùng `rfind("@")` để lấy vị trí dấu `@`. Kiểm tra xem `pos != -1` và `pos < len(s) - 1`.',
      solutionCode: `inputs = ["contact@python.org", "invalid_email_address", "admin@mail.google.com"]

for item in inputs:
    at_pos = item.rfind("@")
    if at_pos != -1 and at_pos < len(item) - 1:
        domain = item[at_pos + 1:]
    else:
        domain = "Không hợp lệ"
    print(f"{item:22} -> {domain}")`,
      solutionOutput: `contact@python.org     -> python.org
invalid_email_address  -> Không hợp lệ
admin@mail.google.com  -> mail.google.com`,
      explanation: 'Phương thức `rfind("@")` trả về vị trí của ký tự `@` cuối cùng hoặc `-1` nếu không có. Nhờ kiểm tra `at_pos != -1`, chương trình không bị văng lỗi khi gặp chuỗi không hợp lệ.'
    },
    {
      level: 'Vừa',
      title: 'Tìm tất cả các vị trí xuất hiện của một từ khóa',
      problem: 'Viết hàm `find_all_positions(text, sub)` trả về danh sách tất cả các chỉ số bắt đầu (không chồng lấp) của chuỗi con `sub` trong `text`. Nếu `sub` là chuỗi rỗng hoặc không xuất hiện, trả về danh sách rỗng `[]`. Thử nghiệm với `text = "abracadabra"` và `sub = "abra"`.',
      hint: 'Sử dụng vòng lặp `while` kết hợp `text.find(sub, start)`. Sau mỗi lần tìm thấy ở `pos`, cập nhật `start = pos + len(sub)`.',
      solutionCode: `def find_all_positions(text: str, sub: str) -> list[int]:
    if not sub:
        return []
    positions = []
    start = 0
    while (pos := text.find(sub, start)) != -1:
        positions.append(pos)
        start = pos + len(sub)
    return positions

text = "abracadabra_abra"
print("Vị trí 'abra':", find_all_positions(text, "abra"))
print("Vị trí 'xyz' :", find_all_positions(text, "xyz"))`,
      solutionOutput: `Vị trí 'abra': [0, 7, 12]
Vị trí 'xyz' : []`,
      explanation: 'Mỗi vòng lặp tìm `"abra"` từ vị trí `start` trở đi. Khi tìm thấy tại `pos`, ta lưu `pos` vào danh sách rồi nhảy tới `pos + len(sub)` để đảm bảo các lần khớp không chồng lấp nhau.'
    },
    {
      level: 'Khó',
      title: 'Trích xuất nội dung giữa cặp thẻ đánh dấu lồng nhau ngoài cùng',
      problem: 'Cho một chuỗi văn bản chứa các thẻ đánh dấu dạng `[QUOTE]...[/QUOTE]` có thể xuất hiện nhiều lần hoặc lồng nhau, ví dụ: `raw = "Mở đầu [QUOTE]Trích dẫn ngoài [QUOTE]Trích dẫn trong[/QUOTE] hết ngoài[/QUOTE] kết thúc"`. Hãy dùng `find()` và `rfind()` để trích xuất toàn bộ nội dung nằm giữa thẻ mở `[QUOTE]` đầu tiên và thẻ đóng `[/QUOTE]` cuối cùng (đảm bảo thẻ đóng phải nằm sau thẻ mở).',
      hint: 'Tìm vị trí kết thúc của thẻ mở đầu tiên bằng `find(open_tag) + len(open_tag)` và vị trí bắt đầu của thẻ đóng cuối cùng bằng `rfind(close_tag)`. Kiểm tra điều kiện hợp lệ giữa hai vị trí.',
      solutionCode: `def extract_outer_quote(text: str) -> str | None:
    open_tag = "[QUOTE]"
    close_tag = "[/QUOTE]"
    
    start_idx = text.find(open_tag)
    if start_idx == -1:
        return None
    
    content_start = start_idx + len(open_tag)
    end_idx = text.rfind(close_tag, content_start)
    if end_idx == -1:
        return None
        
    return text[content_start:end_idx]

raw1 = "Mở đầu [QUOTE]Trích dẫn ngoài [QUOTE]Trích dẫn trong[/QUOTE] hết ngoài[/QUOTE] kết thúc"
raw2 = "Lỗi thứ tự [/QUOTE] trước rồi mới [QUOTE] không có đóng"

print("Kết quả 1:", extract_outer_quote(raw1))
print("Kết quả 2:", extract_outer_quote(raw2))`,
      solutionOutput: `Kết quả 1: Trích dẫn ngoài [QUOTE]Trích dẫn trong[/QUOTE] hết ngoài
Kết quả 2: None`,
      explanation: 'Bằng cách truyền `content_start` làm tham số `start` cho `text.rfind(close_tag, content_start)`, ta vừa tìm được thẻ đóng ngoài cùng ở phía phải, vừa chặn đứng trường hợp thẻ `[/QUOTE]` nằm trước thẻ mở `[QUOTE]` như ở `raw2`.'
    }
  ],

  quiz: [
    {
      question: 'Đoạn mã `if "python".find("p"): print("Found")` sẽ hoạt động như thế nào?',
      options: [
        'In ra `"Found"` vì `"p"` nằm trong `"python"`',
        'Không in ra gì cả vì `"python".find("p")` trả về `0` (falsy)',
        'Ném ngoại lệ `ValueError`',
        'In ra `0`'
      ],
      correctIndex: 1,
      explanation: 'Ký tự `"p"` nằm ở vị trí đầu tiên nên `find("p")` trả về chỉ số `0`. Trong biểu thức điều kiện `if 0:`, số `0` được đánh giá là `False` nên lệnh `print` không được chạy.'
    },
    {
      question: 'Kết quả của hai biểu thức `"aaaaa".count("aa")` và `"abc".count("")` lần lượt là bao nhiêu?',
      options: [
        '`2` và `0`',
        '`4` và `3`',
        '`2` và `4`',
        '`3` và `4`'
      ],
      correctIndex: 2,
      explanation: '`count()` đếm không chồng lấp nên `"aaaaa"` chứa 2 cụm `"aa"` (ở index 0..1 và 2..3). Với chuỗi rỗng `""`, `s.count("")` luôn trả về `len(s) + 1 = 3 + 1 = 4`.'
    },
    {
      question: 'Biểu thức nào sau đây kiểm tra hợp lệ xem tên file `fn` có kết thúc bằng `.py` hoặc `.pyw` hay không?',
      options: [
        '`fn.endswith([".py", ".pyw"])`',
        '`fn.endswith((".py", ".pyw"))`',
        '`fn.endswith(".py", ".pyw")`',
        '`fn.endswith({".py", ".pyw"})`'
      ],
      correctIndex: 1,
      explanation: '`endswith()` cho phép truyền một `tuple` các hậu tố ở tham số đầu tiên. Truyền `list` hoặc `set` sẽ gây lỗi `TypeError`, còn truyền 2 tham số rời sẽ khiến tham số thứ 2 bị hiểu nhầm là chỉ số `start`.'
    },
    {
      question: 'Cho `s = "ab_cd_ab"`. Giá trị của `s.rfind("ab", 0, 5)` là bao nhiêu?',
      options: [
        '`6`',
        '`0`',
        '`-1`',
        '`5`'
      ],
      correctIndex: 1,
      explanation: 'Phạm vi tìm kiếm bị giới hạn trong `s[0:5]` tức là `"ab_cd"`. Trong phạm vi này chỉ có một cụm `"ab"` duy nhất tại chỉ số `0`, nên `rfind` trả về `0`.'
    }
  ],

  summary: [
    'find() và rfind() trả về -1 khi không tìm thấy; index() và rindex() có hành vi tương đương nhưng ném ngoại lệ ValueError khi thất bại.',
    'Không bao giờ viết if s.find(sub): vì index 0 là falsy và -1 là truthy; hãy dùng sub in s hoặc s.find(sub) != -1.',
    'count() luôn đếm các lần xuất hiện không chồng lấp (non-overlapping), và s.count("") trả về len(s) + 1.',
    'startswith() và endswith() hỗ trợ nhận một tuple các chuỗi (không nhận list) để kiểm tra nhiều tiền tố/hậu tố cùng lúc.'
  ]
};
