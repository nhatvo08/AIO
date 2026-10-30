export default {
  id: 'p2-01',
  partId: 'part-2',
  partTitle: 'Phần 2 – Phương thức của str (Trung cấp)',
  number: '2.1',
  title: 'Nhóm chữ hoa / thường (upper, lower, title, capitalize, swapcase, casefold)',
  subtitle: 'Làm chủ 6 phương thức biến đổi kiểu chữ từ ASCII cơ bản đến chuẩn hóa Unicode đa ngôn ngữ',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cú pháp, giá trị trả về và tính bất biến (immutability) của 6 phương thức biến đổi hoa/thường: upper(), lower(), capitalize(), title(), swapcase(), casefold().',
    'Phân biệt chính xác hành vi của capitalize() (chỉ viết hoa ký tự đầu chuỗi) và title() (viết hoa chữ cái đầu mỗi cụm từ) cùng cạm bẫy với dấu nháy đơn.',
    'Hiểu sâu sự khác biệt giữa lower() và casefold() khi xử lý văn bản Unicode đa ngôn ngữ (như tiếng Đức, tiếng Hy Lạp) để so sánh không phân biệt hoa thường chuẩn xác.',
    'Vận dụng linh hoạt các phương thức biến đổi kiểu chữ để chuẩn hóa dữ liệu đầu vào (email, họ tên, mã định danh) trong ứng dụng thực tế.'
  ],

  intuition: {
    title: 'Bộ khuôn dập chữ thông minh trên dây chuyền in ấn',
    metaphor: 'Hãy tưởng tượng chuỗi gốc của bạn là một bản thảo khắc trên tấm kim loại không thể tẩy xóa (bất biến). Sáu phương thức hoa/thường giống như 6 chiếc máy photocopy gắn sẵn khuôn định dạng: máy upper() phóng to mọi chữ cái lên IN HOA, máy lower() thu nhỏ tất cả về chữ thường, máy capitalize() chỉ nhấn mạnh chữ cái đầu tiên của toàn văn bản, máy title() trang trọng viết hoa chữ cái đầu mỗi từ như bìa sách, máy swapcase() đảo ngược trắng-đen mọi chữ cái, còn máy casefold() là chiếc máy ép phẳng đặc biệt dùng trong phòng thí nghiệm ngôn ngữ để đưa mọi biến thể chữ cái quốc tế về cùng một mặt bằng so sánh.',
    visualHtml: `
      <div class="table-responsive">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>Phương thức</th>
              <th>Chuỗi đầu vào mẫu</th>
              <th>Kết quả trả về</th>
              <th>Quy tắc cốt lõi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>str.upper()</code></td>
              <td><code>"python 3.14 ß"</code></td>
              <td><code>"PYTHON 3.14 SS"</code></td>
              <td>Chuyển mọi ký tự có phân biệt kiểu chữ (cased) sang CHỮ HOA.</td>
            </tr>
            <tr>
              <td><code>str.lower()</code></td>
              <td><code>"PyThOn 3.14"</code></td>
              <td><code>"python 3.14"</code></td>
              <td>Chuyển mọi ký tự cased sang chữ thường thông thường.</td>
            </tr>
            <tr>
              <td><code>str.capitalize()</code></td>
              <td><code>"hELLO wORLD"</code></td>
              <td><code>"Hello world"</code></td>
              <td>Ký tự đầu tiên của chuỗi viết hoa (titlecase), toàn bộ phần còn lại viết thường.</td>
            </tr>
            <tr>
              <td><code>str.title()</code></td>
              <td><code>"hELLO wORLD"</code></td>
              <td><code>"Hello World"</code></td>
              <td>Ký tự đầu mỗi nhóm chữ cái liên tiếp viết hoa, các chữ liền sau viết thường.</td>
            </tr>
            <tr>
              <td><code>str.swapcase()</code></td>
              <td><code>"PyThOn 3.14"</code></td>
              <td><code>"pYtHoN 3.14"</code></td>
              <td>Chữ hoa thành chữ thường và chữ thường thành chữ hoa.</td>
            </tr>
            <tr>
              <td><code>str.casefold()</code></td>
              <td><code>"Straße ß"</code></td>
              <td><code>"strasse ss"</code></td>
              <td>Hạ cấp chữ thường triệt để (aggressive lowercasing) để so sánh không phân biệt hoa/thường.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Biến đổi toàn cục với upper(), lower() và swapcase()',
      badge: 'Cơ bản & Bất biến',
      content: `
        <p>Trong Python, chỉ những ký tự thuộc nhóm <strong>cased characters</strong> (các ký tự có thuộc tính hoa/thường trong bảng mã Unicode như <code>Lu</code> - Letter uppercase, <code>Ll</code> - Letter lowercase, <code>Lt</code> - Letter titlecase) mới bị tác động bởi nhóm phương thức này. Các chữ số, dấu câu, khoảng trắng hay biểu tượng cảm xúc sẽ được giữ nguyên hoàn toàn.</p>
        <ul>
          <li><strong><code>str.upper()</code></strong>: Không nhận tham số. Trả về một <strong>chuỗi mới</strong> trong đó mọi ký tự cased đều được chuyển sang dạng chữ hoa. Lưu ý rằng độ dài chuỗi có thể tăng lên với một số ký tự Unicode đặc biệt (ví dụ chữ <code>'ß'</code> trong tiếng Đức chuyển thành <code>'SS'</code> dài 2 ký tự).</li>
          <li><strong><code>str.lower()</code></strong>: Không nhận tham số. Trả về một <strong>chuỗi mới</strong> với mọi ký tự cased được chuyển sang chữ thường chuẩn dùng cho hiển thị.</li>
          <li><strong><code>str.swapcase()</code></strong>: Không nhận tham số. Trả về một <strong>chuỗi mới</strong> đảo ngược trạng thái: chữ hoa thành chữ thường và chữ thường thành chữ hoa. Do đặc thù của Unicode, không phải lúc nào <code>s.swapcase().swapcase() == s</code> cũng đúng tuyệt đối.</li>
        </ul>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Cú pháp</th>
                <th>Tham số</th>
                <th>Giá trị trả về</th>
                <th>Độ phức tạp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>s.upper()</code></td>
                <td>Không có</td>
                <td><code>str</code> mới đã viết hoa</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td><code>s.lower()</code></td>
                <td>Không có</td>
                <td><code>str</code> mới đã viết thường</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td><code>s.swapcase()</code></td>
                <td>Không có</td>
                <td><code>str</code> mới đã đảo hoa/thường</td>
                <td>O(n)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Sử dụng upper(), lower(), swapcase() và tính bất biến của str',
          code: `raw_tag = "PyThOn_3.14_Release!"
up = raw_tag.upper()
lo = raw_tag.lower()
sw = raw_tag.swapcase()

print(f"Gốc      : {raw_tag}")
print(f"upper()  : {up}")
print(f"lower()  : {lo}")
print(f"swapcase(): {sw}")

# Trường hợp đặc biệt với Unicode: độ dài chuỗi thay đổi
german = "straße"
print(f"'{german}'.upper() -> '{german.upper()}' (len: {len(german)} -> {len(german.upper())})")
print(f"Khứ hồi swapcase: {german.swapcase().swapcase()}")`,
          output: `Gốc      : PyThOn_3.14_Release!
upper()  : PYTHON_3.14_RELEASE!
lower()  : python_3.14_release!
swapcase(): pYtHoN_3.14_rELEASE!
'straße'.upper() -> 'STRASSE' (len: 6 -> 7)
Khứ hồi swapcase: strasse`,
          annotations: [
            { line: 2, text: 'Tạo chuỗi mới viết hoa toàn bộ chữ cái; số 3.14 và dấu _, ! giữ nguyên.' },
            { line: 6, text: 'Chuỗi gốc raw_tag hoàn toàn không bị thay đổi vì str là kiểu bất biến (immutable).' },
            { line: 13, text: 'Chữ ß (eszett) khi viết hoa thành SS khiến độ dài chuỗi tăng từ 6 lên 7.' },
            { line: 14, text: 'Khi STRASSE gọi swapcase() lần 2, nó thành strasse chứ không quay lại straße.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Định dạng đầu câu & tiêu đề với capitalize() và title()',
      badge: 'Định dạng văn bản',
      content: `
        <p>Khi hiển thị câu văn hoặc tiêu đề bài viết, bạn thường chỉ muốn viết hoa ký tự mở đầu. Python cung cấp hai phương thức với quy tắc quét rất khác nhau:</p>
        <ul>
          <li><strong><code>str.capitalize()</code></strong>: Đưa ký tự đầu tiên của toàn bộ chuỗi (tại chỉ số <code>0</code>) về dạng titlecase/hoa, và ép <strong>tất cả các ký tự còn lại từ chỉ số 1 trở đi về chữ thường</strong>. Nếu ký tự đầu tiên là khoảng trắng hoặc chữ số, nó giữ nguyên ký tự đó và vẫn hạ toàn bộ phần sau xuống chữ thường!</li>
          <li><strong><code>str.title()</code></strong>: Sử dụng thuật toán dựa trên trạng thái: bất kỳ chữ cái nào đứng ngay sau một ký tự <em>không phải chữ cái</em> (khoảng trắng, chữ số, dấu câu, ký hiệu) sẽ được viết hoa; các chữ cái đi liền sau nó sẽ bị ép về chữ thường.</li>
        </ul>
        <p><strong>Cạm bẫy của <code>title()</code>:</strong> Vì dấu nháy đơn <code>'</code> hoặc chữ số được tính là ký tự phân cách (non-letter), <code>"they're bill's friends".title()</code> sẽ biến thành <code>"They'Re Bill'S Friends"</code>, hay <code>"2nd place".title()</code> biến thành <code>"2Nd Place"</code>. Để khắc phục, bạn có thể dùng <code>string.capwords(s)</code> (chỉ tách theo khoảng trắng).</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Tình huống</th>
                <th><code>s.capitalize()</code></th>
                <th><code>s.title()</code></th>
                <th><code>string.capwords(s)</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>"nguyễn văn a"</code></td>
                <td><code>"Nguyễn văn a"</code></td>
                <td><code>"Nguyễn Văn A"</code></td>
                <td><code>"Nguyễn Văn A"</code></td>
              </tr>
              <tr>
                <td><code>"  python CODE"</code></td>
                <td><code>"  python code"</code></td>
                <td><code>"  Python Code"</code></td>
                <td><code>"Python Code"</code></td>
              </tr>
              <tr>
                <td><code>"don't stop"</code></td>
                <td><code>"Don't stop"</code></td>
                <td><code>"Don'T Stop"</code></td>
                <td><code>"Don't Stop"</code></td>
              </tr>
              <tr>
                <td><code>"python 3.14b"</code></td>
                <td><code>"Python 3.14b"</code></td>
                <td><code>"Python 3.14B"</code></td>
                <td><code>"Python 3.14b"</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh trực diện capitalize(), title() và string.capwords()',
          code: `import string

s1 = "lẬP TRÌNH python CƠ BẢN"
print("capitalize():", s1.capitalize())
print("title()     :", s1.title())

# Cạm bẫy dấu nháy đơn và chữ số trong title()
s2 = "they're learning python 3.14a"
print("title() lỗi :", s2.title())
print("capwords()  :", string.capwords(s2))

# Cạm bẫy khoảng trắng đầu chuỗi với capitalize()
s3 = "   hello WORLD"
print("Có space đầu:", repr(s3.capitalize()))`,
          output: `capitalize(): Lập trình python cơ bản
title()     : Lập Trình Python Cơ Bản
title() lỗi : They'Re Learning Python 3.14A
capwords()  : They're Learning Python 3.14a
Có space đầu: '   hello world'`,
          annotations: [
            { line: 4, text: 'capitalize() chỉ viết hoa chữ L đầu tiên, toàn bộ phần sau bị ép xuống chữ thường.' },
            { line: 9, text: 'title() coi dấu nháy đơn và số 4 là ranh giới từ nên viết hoa cả chữ R và chữ A.' },
            { line: 10, text: 'string.capwords() thực hiện s.split() rồi capitalize() từng từ và nối lại bằng khoảng trắng.' },
            { line: 14, text: 'Vì ký tự ở index 0 là dấu cách, chữ h ở index 3 bị coi là phần thân nên bị hạ thành chữ thường!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Chuẩn hóa so sánh đa ngôn ngữ với casefold()',
      badge: 'Thực chiến Unicode',
      content: `
        <p>Khi kiểm tra hai chuỗi có giống nhau không mà không phân biệt chữ hoa/chữ thường (case-insensitive comparison), nhiều lập trình viên có thói quen viết <code>s1.lower() == s2.lower()</code>. Cách này hoạt động tốt với bảng mã ASCII tiếng Anh, nhưng <strong>thất bại với nhiều ngôn ngữ quốc tế trong Unicode</strong>.</p>
        <p>Phương thức <strong><code>str.casefold()</code></strong> (được định nghĩa theo mục 3.13 của chuẩn Unicode) thực hiện phép "gập kiểu chữ" (case folding) mạnh mẽ hơn <code>lower()</code> rất nhiều:</p>
        <ul>
          <li>Trong tiếng Đức, chữ thường <code>'ß'</code> vốn đã là chữ thường nên <code>'ß'.lower()</code> vẫn trả về <code>'ß'</code>. Nhưng dạng viết hoa của nó là <code>'SS'</code>, và <code>'SS'.lower()</code> trả về <code>'ss'</code>. Kết quả là <code>'ß'.lower() != 'SS'.lower()</code>! Ngược lại, <code>'ß'.casefold()</code> chuyển thẳng thành <code>'ss'</code>, giúp phép so sánh khớp hoàn hảo.</li>
          <li>Trong tiếng Hy Lạp, chữ Sigma có hai dạng viết thường: <code>'σ'</code> (giữa từ) và <code>'ς'</code> (cuối từ). <code>lower()</code> giữ nguyên sự khác biệt này, trong khi <code>casefold()</code> quy cả hai về <code>'σ'</code>.</li>
        </ul>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Biểu thức</th>
                <th>Kết quả của <code>.lower()</code></th>
                <th>Kết quả của <code>.casefold()</code></th>
                <th>Đánh giá khi dùng để so sánh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>"Python"</code></td>
                <td><code>"python"</code></td>
                <td><code>"python"</code></td>
                <td>Giống hệt nhau với ký tự ASCII thuần túy.</td>
              </tr>
              <tr>
                <td><code>"Straße"</code> vs <code>"STRASSE"</code></td>
                <td><code>"straße" != "strasse"</code> (False)</td>
                <td><code>"strasse" == "strasse"</code> (True)</td>
                <td><code>casefold()</code> chính xác về mặt ngữ nghĩa.</td>
              </tr>
              <tr>
                <td><code>"ΜΆΙΟΣ"</code> vs <code>"μάιος"</code></td>
                <td>Cần khớp vị trí chữ <code>ς</code></td>
                <td>Chuẩn hóa mọi chữ Sigma về <code>σ</code></td>
                <td><code>casefold()</code> luôn an toàn cho tìm kiếm & khớp chuỗi.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh lower() và casefold() trong bài toán khớp tên người dùng & địa danh',
          code: `word_de_1 = "Straße"
word_de_2 = "STRASSE"

print("So sánh bằng lower()   :", word_de_1.lower() == word_de_2.lower())
print("So sánh bằng casefold():", word_de_1.casefold() == word_de_2.casefold())

# Chữ Sigma trong tiếng Hy Lạp: 'Σ' (hoa), 'σ' (thường), 'ς' (thường cuối từ)
greek_1 = "ΟΔΥΣΣΕΥΣ"
greek_2 = "οδυσσευς"
print("Hy Lạp casefold khớp   :", greek_1.casefold() == greek_2.casefold())
print("Giá trị sau casefold   :", greek_2.casefold())`,
          output: `So sánh bằng lower()   : False
So sánh bằng casefold(): True
Hy Lạp casefold khớp   : True
Giá trị sau casefold   : οδυσσευσ`,
          annotations: [
            { line: 4, text: 'lower() giữ nguyên ß nên "straße" khác "strasse".' },
            { line: 5, text: 'casefold() biến ß thành "ss" nên hai chuỗi khớp nhau hoàn toàn.' },
            { line: 11, text: 'Chữ ς ở cuối từ greek_2 được casefold() quy chuẩn về σ giống như các vị trí khác.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Quên gán lại biến vì tưởng phương thức sửa trực tiếp chuỗi gốc',
        content: 'Viết <code>name.upper()</code> đứng một mình sẽ không làm thay đổi biến <code>name</code>. Vì <code>str</code> trong Python là bất biến (immutable), bạn bắt buộc phải gán lại: <code>name = name.upper()</code>.'
      },
      {
        title: 'Dùng casefold() để hiển thị ra giao diện người dùng',
        content: '<code>casefold()</code> được thiết kế riêng cho việc <strong>so sánh và tìm kiếm ngầm</strong> (internal matching), không dùng để hiển thị vì nó có thể làm biến dạng chính tả (như đổi <code>Straße</code> thành <code>strasse</code>). Khi cần hiển thị chữ thường cho người đọc, hãy dùng <code>lower()</code>.'
      },
      {
        title: 'Gọi capitalize() trước khi cắt khoảng trắng đầu chuỗi',
        content: 'Nếu chuỗi có dấu cách ở đầu như <code>"  an"</code>, gọi <code>"  an".capitalize()</code> vẫn ra <code>"  an"</code> vì ký tự ở vị trí 0 là dấu cách. Luôn gọi <code>s.strip().capitalize()</code>.'
      }
    ],
    tips: [
      {
        title: 'Chuẩn hóa khóa từ điển (Dictionary Keys) bằng casefold()',
        content: 'Khi xây dựng bảng tra cứu không phân biệt hoa thường (như danh bạ, email, thẻ tag), hãy luôn lưu khóa ở dạng <code>key.strip().casefold()</code> để đảm bảo tính nhất quán trên mọi ngôn ngữ.'
      }
    ],
    deepDive: {
      title: 'Ký tự Titlecase (Lt) trong Unicode khác gì Uppercase (Lu)?',
      content: `
        <p>Hầu hết các chữ cái đều có dạng viết hoa (Uppercase) và dạng tiêu đề (Titlecase) giống hệt nhau (ví dụ <code>'a'</code> có cả Uppercase và Titlecase là <code>'A'</code>). Tuy nhiên, trong bảng mã Unicode có những ký tự kép đóng vai trò là <strong>một ký tự duy nhất</strong> (digraphs), tiêu biểu là chữ <code>'ǆ'</code> (U+01C6) trong tiếng Croatia/Serbia.</p>
        <p>Khi gọi <code>'ǆ'.upper()</code>, toàn bộ ký tự kép đều viết hoa thành <code>'Ǆ'</code> (DZ). Nhưng khi gọi <code>'ǆ'.capitalize()</code> hoặc <code>'ǆ'.title()</code>, Python sử dụng bảng ánh xạ Titlecase của Unicode để chuyển nó thành <code>'ǅ'</code> (Dz - chỉ chữ D viết hoa, chữ z viết thường dù vẫn nằm trong 1 code point duy nhất!). Đó là lý do tài liệu chính thức của Python mô tả <code>capitalize()</code> đưa ký tự đầu về <em>titlecase</em> chứ không đơn thuần là <em>uppercase</em>.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Chuẩn hóa email và tên hiển thị',
      problem: 'Cho chuỗi thông tin khách hàng nhập lộn xộn: `raw_name = "pHẠM   mINH   tUẤN"` và `raw_email = "PhamMinhTuan99@GMAIL.Com"`. Hãy chuẩn hóa `raw_email` về toàn bộ chữ thường và chuẩn hóa `raw_name` sao cho mỗi từ cách nhau đúng 1 khoảng trắng và viết hoa chữ cái đầu mỗi từ.',
      hint: 'Dùng `.lower()` cho email. Với tên, có thể kết hợp `.split()` và `.join()` rồi gọi `.title()`, hoặc dùng `string.capwords()`.',
      solutionCode: `raw_name = "pHẠM   mINH   tUẤN"
raw_email = "PhamMinhTuan99@GMAIL.Com"

clean_name = " ".join(raw_name.split()).title()
clean_email = raw_email.lower()

print(f"Họ tên: {clean_name}")
print(f"Email : {clean_email}")`,
      solutionOutput: `Họ tên: Phạm Minh Tuấn
Email : phamminhtuan99@gmail.com`,
      explanation: '`raw_name.split()` tách các từ và tự động loại bỏ khoảng trắng thừa ở giữa. `" ".join(...)` ghép lại với đúng 1 dấu cách, sau đó `.title()` viết hoa chữ cái đầu mỗi từ và hạ phần còn lại xuống chữ thường.'
    },
    {
      level: 'Vừa',
      title: 'Kiểm tra danh sách từ cấm không phân biệt hoa thường đa ngôn ngữ',
      problem: 'Viết hàm `contains_banned_word(text, banned_words)` nhận vào một chuỗi `text` và danh sách `banned_words`. Hàm trả về `True` nếu bất kỳ từ cấm nào xuất hiện trong `text` (không phân biệt hoa/thường và xử lý đúng cả ký tự quốc tế như `"Straße"` vs `"STRASSE"`), ngược lại trả về `False`. Kiểm nghiệm với dữ liệu mẫu.',
      hint: 'Đưa cả `text` và từng từ trong `banned_words` về dạng `.casefold()` trước khi kiểm tra toán tử `in`.',
      solutionCode: `def contains_banned_word(text: str, banned_words: list[str]) -> bool:
    folded_text = text.casefold()
    return any(word.casefold() in folded_text for word in banned_words)

banned = ["spam", "straße", "admin_root"]
samples = [
    "Chào mừng bạn đến với hệ thống!",
    "Địa chỉ tại HAUPTSTRASSE số 10",
    "Tài khoản Admin_Root đang đăng nhập"
]

for s in samples:
    print(f"{contains_banned_word(s, banned)!s:5} | {s}")`,
      solutionOutput: `False | Chào mừng bạn đến với hệ thống!
True  | Địa chỉ tại HAUPTSTRASSE số 10
True  | Tài khoản Admin_Root đang đăng nhập`,
      explanation: 'Nhờ `casefold()`, từ `"straße"` được chuẩn hóa thành `"strasse"`, khớp chính xác với chuỗi con `"strasse"` bên trong `"HAUPTSTRASSE".casefold()`.'
    },
    {
      level: 'Khó',
      title: 'Xây dựng hàm smart_title() khắc phục nhược điểm của str.title()',
      problem: 'Phương thức `"don\'t".title()` bị lỗi viết hoa chữ cái sau dấu nháy đơn (`"Don\'T"`), còn `string.capwords("  hello   world  ")` lại xóa mất khoảng trắng định dạng gốc và không viết hoa từ sau dấu gạch ngang như `"e-commerce"`. Hãy viết hàm `smart_title(text)` viết hoa chữ cái đầu của mỗi từ được phân tách bởi khoảng trắng hoặc dấu gạch ngang `-`, nhưng giữ nguyên chữ thường sau dấu nháy đơn `\'` nằm giữa từ và bảo toàn nguyên vẹn khoảng trắng/dấu gạch ngang của chuỗi gốc.',
      hint: 'Duyệt qua từng ký tự cùng trạng thái `in_word` (boolean). Một ký tự thuộc về từ nếu là `.isalnum()` hoặc là dấu `\'` nằm kẹp giữa hai chữ cái.',
      solutionCode: `def smart_title(text: str) -> str:
    result = []
    in_word = False
    n = len(text)
    for i, ch in enumerate(text):
        is_mid_apostrophe = (
            ch == "'" and 0 < i < n - 1 and text[i - 1].isalpha() and text[i + 1].isalpha()
        )
        if ch.isalpha() or is_mid_apostrophe:
            if not in_word:
                result.append(ch.upper())
                in_word = True
            else:
                result.append(ch.lower())
        else:
            result.append(ch)
            in_word = ch.isdigit()
    return "".join(result)

sample = "they're building a state-of-the-art 3d app in 'python'"
print("str.title() :", sample.title())
print("smart_title :", smart_title(sample))`,
      solutionOutput: `str.title() : They'Re Building A State-Of-The-Art 3D App In 'Python'
smart_title : They're Building A State-Of-The-Art 3d App In 'Python'`,
      explanation: 'Khi duyệt qua chuỗi, dấu nháy đơn nằm giữa hai chữ cái (`they\'re`) được coi là một phần liên tục của từ nên `in_word` vẫn là `True` (chữ `r` viết thường). Ngược lại, dấu gạch ngang `-` đặt lại `in_word = False` nên từ kế tiếp trong `State-Of-The-Art` được viết hoa chữ đầu, còn chữ số `3` giữ `in_word = True` để `3d` không bị biến thành `3D`.'
    }
  ],

  quiz: [
    {
      question: 'Kết quả của biểu thức `"   pYTHON 3.14".capitalize()` trong Python 3.14 là gì?',
      options: [
        '`"   Python 3.14"`',
        '`"   python 3.14"`',
        '`"Python 3.14"`',
        '`"   PYTHON 3.14"`'
      ],
      correctIndex: 1,
      explanation: '`capitalize()` chỉ tác động viết hoa lên ký tự tại chỉ số `0` (ở đây là khoảng trắng nên giữ nguyên) và ép toàn bộ các ký tự từ chỉ số `1` trở đi về chữ thường.'
    },
    {
      question: 'Biểu thức `"it\'s a 2nd test".title()` trả về giá trị nào sau đây?',
      options: [
        '`"It\'s A 2nd Test"`',
        '`"It\'S A 2nd Test"`',
        '`"It\'S A 2Nd Test"`',
        '`"It\'s a 2nd test"`'
      ],
      correctIndex: 2,
      explanation: 'Phương thức `title()` viết hoa mọi chữ cái đứng liền sau một ký tự không phải chữ cái (non-letter). Cả dấu nháy đơn `\'` và chữ số `2` đều không phải chữ cái, nên chữ `s` và chữ `n` đều bị viết hoa thành `S` và `N`.'
    },
    {
      question: 'Khi nào bạn nên ưu tiên sử dụng `str.casefold()` thay vì `str.lower()`?',
      options: [
        'Khi muốn in chuỗi chữ thường ra màn hình đẹp hơn',
        'Khi chỉ xử lý chuỗi số và ký tự ASCII tiếng Anh',
        'Khi cần so sánh hoặc tìm kiếm chuỗi không phân biệt hoa/thường trên dữ liệu Unicode đa ngôn ngữ',
        'Khi muốn tăng tốc độ thực thi gấp đôi so với `lower()`'
      ],
      correctIndex: 2,
      explanation: '`casefold()` thực hiện chuẩn hóa chữ thường triệt để theo chuẩn Unicode (ví dụ chuyển `"ß"` thành `"ss"`), giúp việc so sánh không phân biệt hoa/thường chính xác trên nhiều ngôn ngữ.'
    },
    {
      question: 'Cho `s = "straße"`. Khẳng định nào sau đây là ĐÚNG trong Python 3.14?',
      options: [
        '`len(s.upper()) == len(s)`',
        '`s.lower() == s.casefold()`',
        '`s.swapcase().swapcase() == s`',
        '`len(s.upper()) == 7` và `s.casefold() == "strasse"`'
      ],
      correctIndex: 3,
      explanation: 'Ký tự `"ß"` khi gọi `.upper()` trở thành `"SS"` làm độ dài chuỗi tăng từ 6 lên 7, và khi gọi `.casefold()` trở thành `"strasse"`.'
    }
  ],

  summary: [
    'Cả 6 phương thức upper(), lower(), capitalize(), title(), swapcase(), casefold() đều không nhận tham số và luôn trả về một chuỗi mới (không sửa chuỗi gốc).',
    'capitalize() chỉ viết hoa ký tự tại index 0 và hạ toàn bộ phần còn lại xuống chữ thường; title() viết hoa chữ cái đầu của mỗi cụm chữ cái liên tiếp.',
    'Cẩn thận với title() khi chuỗi chứa dấu nháy đơn hoặc chữ số liền chữ cái (có thể thay bằng string.capwords() nếu chỉ cần tách theo khoảng trắng).',
    'Luôn dùng casefold() thay cho lower() khi thực hiện so sánh hoặc tra cứu chuỗi không phân biệt hoa/thường (case-insensitive matching).'
  ]
};
