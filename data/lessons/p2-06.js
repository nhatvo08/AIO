export default {
  id: 'p2-06',
  partId: 'part-2',
  partTitle: 'Phần 2 – Phương thức của str (Trung cấp)',
  number: '2.6',
  title: 'Nhóm kiểm tra is* & khác (12 phương thức is* + encode, format, format_map)',
  subtitle: 'Giải phẫu bộ 12 hàm kiểm tra đặc tính chuỗi, phân biệt sâu isdecimal / isdigit / isnumeric và nhóm định dạng/mã hóa',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu đến tận gốc rễ sự khác biệt giữa 3 phương thức kiểm tra số: isdecimal() ⊂ isdigit() ⊂ isnumeric() thông qua hệ thống thuộc tính Unicode.',
    'Nắm vững quy tắc hoạt động và các trường hợp biên (như chuỗi rỗng "") của toàn bộ 12 phương thức kiểm tra bắt đầu bằng tiền tố is*.',
    'Biết cách kết hợp str.isidentifier() và keyword.iskeyword() để kiểm tra tên biến/hàm hợp lệ trong Python 3.14.',
    'Sử dụng thành thạo 3 phương thức hoàn thiện mảnh ghép str: format(), format_map() và encode().'
  ],

  intuition: {
    title: 'Trạm kiểm định chất lượng 12 cửa và Ba vòng tròn đồng tâm của chữ số',
    metaphor: 'Hãy tưởng tượng 12 phương thức is* là 12 máy quét X-quang tại cổng kiểm soát dữ liệu: mỗi máy chỉ trả lời Đúng (True) hoặc Sai (False). Riêng với dữ liệu số, Python có tới 3 chiếc máy quét xếp theo 3 vòng tròn đồng tâm từ khắt khe nhất đến rộng rãi nhất: Vòng trong cùng là isdecimal() (chỉ nhận chữ số hệ cơ số 10 chuẩn để tính toán như 0-9), vòng giữa là isdigit() (nhận thêm các số mũ ², chỉ số trên và số đóng khung ①), và vòng ngoài cùng là isnumeric() (nhận thêm cả phân số ½, số La Mã Ⅷ và chữ số Hán tự 四).',
    visualHtml: `
      <div class="table-responsive">
        <table class="lesson-table">
          <thead>
            <tr>
              <th>Nhóm ký tự mẫu</th>
              <th>Ví dụ</th>
              <th><code>isdecimal()</code></th>
              <th><code>isdigit()</code></th>
              <th><code>isnumeric()</code></th>
              <th><code>int(s)</code> chạy được?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chữ số ASCII chuẩn (0-9)</td>
              <td><code>"2026"</code></td>
              <td><strong>True</strong></td>
              <td><strong>True</strong></td>
              <td><strong>True</strong></td>
              <td><strong>Có</strong> (<code>2026</code>)</td>
            </tr>
            <tr>
              <td>Chữ số hệ 10 ngôn ngữ khác (Ả Rập, Thái, Toàn độ rộng)</td>
              <td><code>"٠١٢"</code>, <code>"１２３"</code></td>
              <td><strong>True</strong></td>
              <td><strong>True</strong></td>
              <td><strong>True</strong></td>
              <td><strong>Có</strong> (<code>12</code>, <code>123</code>)</td>
            </tr>
            <tr>
              <td>Số mũ / Chỉ số trên & Số trong vòng tròn</td>
              <td><code>"²"</code>, <code>"³"</code>, <code>"①"</code></td>
              <td>False</td>
              <td><strong>True</strong></td>
              <td><strong>True</strong></td>
              <td><strong>Lỗi ValueError!</strong></td>
            </tr>
            <tr>
              <td>Phân số Unicode, Số La Mã, Chữ số Hán tự</td>
              <td><code>"½"</code>, <code>"¾"</code>, <code>"Ⅷ"</code>, <code>"四"</code></td>
              <td>False</td>
              <td>False</td>
              <td><strong>True</strong></td>
              <td><strong>Lỗi ValueError!</strong></td>
            </tr>
            <tr>
              <td>Số âm hoặc Số thực có dấu chấm</td>
              <td><code>"-42"</code>, <code>"3.14"</code></td>
              <td>False</td>
              <td>False</td>
              <td>False</td>
              <td><code>int("-42")</code> được, nhưng <code>is*</code> đều False vì dấu <code>-</code> và <code>.</code>!</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Giải phẫu chuyên sâu bộ ba isdecimal() ⊂ isdigit() ⊂ isnumeric()',
      badge: 'Trọng tâm phỏng vấn & Thực chiến',
      content: `
        <p>Tại sao Python lại có tới 3 phương thức kiểm tra chuỗi số? Câu trả lời nằm ở chuẩn Unicode: mỗi ký tự số trong Unicode được gắn các thuộc tính <code>Decimal_Number (Nd)</code>, <code>Numeric_Type=Digit</code>, hoặc <code>Numeric_Type=Numeric</code>. Ba phương thức của Python tương ứng với 3 cấp độ tập hợp con chặt chẽ: <strong><code>isdecimal() &sub; isdigit() &sub; isnumeric()</code></strong> (nghĩa là nếu <code>isdecimal()</code> là <code>True</code> thì chắc chắn <code>isdigit()</code> và <code>isnumeric()</code> cũng là <code>True</code>).</p>
        <ul>
          <li><strong>1. <code>str.isdecimal()</code> — Khắt khe nhất (Hệ cơ số 10):</strong>
            <ul>
              <li>Trả về <code>True</code> nếu chuỗi khác rỗng và mọi ký tự đều thuộc danh mục <em>General Category = Nd (Number, Decimal Digit)</em>.</li>
              <li>Bao gồm: chữ số ASCII <code>'0'-'9'</code>, chữ số toàn độ rộng <code>'０'-'９'</code>, chữ số Ả Rập-Ấn Độ <code>'٠'-'٩'</code>.</li>
              <li><strong>Ứng dụng vàng:</strong> Nếu <code>s.isdecimal()</code> là <code>True</code>, bạn <strong>chắc chắn 100% gọi <code>int(s)</code> sẽ thành công</strong> mà không bao giờ ném <code>ValueError</code>!</li>
            </ul>
          </li>
          <li><strong>2. <code>str.isdigit()</code> — Cấp độ trung gian (Chữ số ký hiệu):</strong>
            <ul>
              <li>Bao gồm tất cả các ký tự của <code>isdecimal()</code>, cộng thêm các ký tự có thuộc tính <code>Numeric_Type = Digit</code> trong Unicode.</li>
              <li>Bao gồm thêm: chỉ số trên (superscripts) như <code>'²'</code>, <code>'³'</code>, chỉ số dưới <code>'₁'</code>, số trong vòng tròn <code>'①'</code>, số Kharosthi.</li>
              <li><strong>Cảnh báo:</strong> <code>"²".isdigit()</code> trả về <code>True</code>, nhưng gọi <code>int("²")</code> sẽ văng lỗi <code>ValueError</code>!</li>
            </ul>
          </li>
          <li><strong>3. <code>str.isnumeric()</code> — Rộng rãi nhất (Mọi biểu diễn giá trị số):</strong>
            <ul>
              <li>Bao gồm tất cả các ký tự của <code>isdigit()</code>, cộng thêm mọi ký tự có thuộc tính <code>Numeric_Type = Numeric</code> (bất kỳ ký tự nào mang giá trị số học trong văn viết nhân loại).</li>
              <li>Bao gồm thêm: phân số dạng 1 ký tự (<code>'½'</code>, <code>'⅓'</code>, <code>'¾'</code>), chữ số La Mã Unicode (<code>'Ⅰ'</code>, <code>'Ⅴ'</code>, <code>'Ⅷ'</code>), chữ số Hán/Nhật (<code>'一'</code>, <code>'四'</code>, <code>'百'</code>, <code>'萬'</code>). Bạn có thể lấy giá trị thực của chúng bằng <code>unicodedata.numeric(char)</code>.</li>
            </ul>
          </li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm chứng thực tế sự khác biệt giữa isdecimal(), isdigit() và isnumeric()',
          code: `import unicodedata

samples = ["2026", "１２３", "²", "①", "½", "Ⅷ", "四", "-5", "3.14"]

print(f"{'Chuỗi':6} | {'isdecimal':9} | {'isdigit':7} | {'isnumeric':9} | {'int(s)':8}")
print("-" * 52)
for s in samples:
    dec = str(s.isdecimal())
    dig = str(s.isdigit())
    num = str(s.isnumeric())
    try:
        val = str(int(s))
    except ValueError:
        val = "ValueError"
    print(f"{s:6} | {dec:9} | {dig:7} | {num:9} | {val:8}")

# Đọc giá trị toán học của ký tự isnumeric() bằng module unicodedata
for ch in ["½", "Ⅷ", "四"]:
    print(f"unicodedata.numeric('{ch}') = {unicodedata.numeric(ch)}")`,
          output: `Chuỗi  | isdecimal | isdigit | isnumeric | int(s)  
----------------------------------------------------
2026   | True      | True    | True      | 2026    
１２３    | True      | True    | True      | 123     
²      | False     | True    | True      | ValueError
①      | False     | True    | True      | ValueError
½      | False     | False   | True      | ValueError
Ⅷ      | False     | False   | True      | ValueError
四      | False     | False   | True      | ValueError
-5     | False     | False   | False     | -5      
3.14   | False     | False   | False     | ValueError
unicodedata.numeric('½') = 0.5
unicodedata.numeric('Ⅷ') = 8.0
unicodedata.numeric('四') = 4.0`,
          annotations: [
            { line: 8, text: 'Chỉ những chuỗi có isdecimal() == True mới chuyển thẳng sang int(s) an toàn.' },
            { line: 12, text: 'Với "²" hay "①", isdigit() là True nhưng int() lại ném ValueError!' },
            { line: 19, text: 'Hàm unicodedata.numeric() giải mã được giá trị thực của các ký tự phân số, La Mã và Hán tự.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Nhóm kiểm tra chữ cái, khoảng trắng và kiểu chữ (isalpha, isalnum, isspace, islower, isupper, istitle)',
      badge: 'Kiểm tra đặc tính',
      content: `
        <p>Tất cả các phương thức dưới đây đều trả về <code>False</code> nếu chuỗi là chuỗi rỗng <code>""</code>:</p>
        <ul>
          <li><strong><code>str.isalpha()</code></strong>: <code>True</code> nếu mọi ký tự đều là chữ cái theo chuẩn Unicode (General Category: <code>Lm, Lt, Lu, Ll, Lo</code> — bao gồm cả tiếng Việt có dấu <code>"TiếngViệt"</code>, chữ Hán, chữ Nhật, nhưng <strong>không</strong> được chứa khoảng trắng hay dấu câu).</li>
          <li><strong><code>str.isalnum()</code></strong>: <code>True</code> nếu mọi ký tự là chữ cái HOẶC số (tức là thỏa mãn ít nhất một trong 4 điều kiện: <code>isalpha()</code>, <code>isdecimal()</code>, <code>isdigit()</code>, hoặc <code>isnumeric()</code>).</li>
          <li><strong><code>str.isspace()</code></strong>: <code>True</code> nếu mọi ký tự đều là khoảng trắng Unicode (<code>' '</code>, <code>'\\t'</code>, <code>'\\n'</code>, <code>'\\r'</code>, <code>'\\v'</code>, <code>'\\f'</code>, <code>'\\u00a0'</code>...).</li>
          <li><strong><code>str.islower()</code> / <code>str.isupper()</code></strong>: Bỏ qua các ký tự không phân biệt hoa thường (số, dấu câu, khoảng trắng), nhưng chuỗi <strong>bắt buộc phải có ít nhất 1 ký tự cased</strong> và tất cả các ký tự cased đó đều phải là chữ thường (với <code>islower</code>) hoặc chữ hoa (với <code>isupper</code>). Vì vậy, <code>"123!".islower()</code> và <code>"123!".isupper()</code> đều trả về <strong><code>False</code></strong>!</li>
          <li><strong><code>str.istitle()</code></strong>: <code>True</code> nếu chuỗi có ít nhất 1 chữ cái và tuân thủ đúng quy tắc của <code>s.title()</code> (chữ cái đầu mỗi cụm từ viết hoa, các chữ cái đi liền sau phải viết thường).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khám phá hành vi của isalpha, isalnum, islower, isupper và istitle',
          code: `print("'TiếngViệt'.isalpha() :", "TiếngViệt".isalpha())
print("'Tiếng Việt'.isalpha():", "Tiếng Việt".isalpha())  # Có dấu cách!
print("'Python314'.isalnum() :", "Python314".isalnum())
print("'½Abc'.isalnum()      :", "½Abc".isalnum())       # '½' là isnumeric

# Quy tắc "ít nhất 1 ký tự cased" của islower / isupper / istitle
print("'python 3.14!'.islower():", "python 3.14!".islower())
print("'3.14!'.islower()       :", "3.14!".islower())
print("'3.14!'.isupper()       :", "3.14!".isupper())
print("'Hello World'.istitle() :", "Hello World".istitle())
print("'Hello WORLD'.istitle() :", "Hello WORLD".istitle())`,
          output: `'TiếngViệt'.isalpha() : True
'Tiếng Việt'.isalpha(): False
'Python314'.isalnum() : True
'½Abc'.isalnum()      : True
'python 3.14!'.islower(): True
'3.14!'.islower()       : False
'3.14!'.isupper()       : False
'Hello World'.istitle() : True
'Hello WORLD'.istitle() : False`,
          annotations: [
            { line: 2, text: 'Chỉ một dấu cách ở giữa cũng khiến isalpha() và isalnum() trả về False.' },
            { line: 4, text: 'Vì "½" thỏa mãn isnumeric(), nên "½Abc" cũng thỏa mãn isalnum().' },
            { line: 8, text: '"3.14!" không có bất kỳ chữ cái nào nên cả islower() lẫn isupper() đều trả về False.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Kiểm tra định danh, bảng mã ASCII & khả năng hiển thị (isidentifier, isascii, isprintable)',
      badge: 'Kiểm tra hệ thống',
      content: `
        <p>Ba phương thức cuối cùng trong nhóm 12 hàm <code>is*</code> có những đặc điểm riêng biệt rất thú vị:</p>
        <ul>
          <li><strong><code>str.isidentifier()</code></strong>: Trả về <code>True</code> nếu chuỗi là một tên định danh (tên biến, tên hàm, tên lớp) đúng cú pháp từ vựng của Python (bắt đầu bằng chữ cái hoặc dấu gạch dưới <code>_</code>, theo sau là chữ cái, số hoặc <code>_</code> theo chuẩn Unicode PEP 3131). <strong>Chú ý:</strong> <code>"def".isidentifier()</code> hay <code>"for".isidentifier()</code> vẫn trả về <code>True</code>! Để kiểm tra tên biến thực sự dùng được, hãy kết hợp thêm <code>not keyword.iskeyword(s)</code>.</li>
          <li><strong><code>str.isascii()</code></strong>: Trả về <code>True</code> nếu mọi ký tự trong chuỗi có mã Unicode nằm trong khoảng <code>U+0000</code> đến <code>U+007F</code> (7-bit ASCII). <strong>Đặc biệt:</strong> Chuỗi rỗng <code>"".isascii()</code> trả về <strong><code>True</code></strong>!</li>
          <li><strong><code>str.isprintable()</code></strong>: Trả về <code>True</code> nếu mọi ký tự đều có thể in ra màn hình (không chứa các ký tự điều khiển như <code>\\n</code>, <code>\\t</code>, <code>\\r</code>, <code>\\x00</code>). Dấu cách thường <code>' '</code> được tính là in được, nhưng <code>'\\t'</code> và <code>'\\n'</code> thì không! <strong>Đặc biệt:</strong> Chuỗi rỗng <code>"".isprintable()</code> cũng trả về <strong><code>True</code></strong>!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra tên biến Python hợp lệ và phân biệt chuỗi rỗng trên isascii / isprintable',
          code: `import keyword

def is_valid_variable_name(name: str) -> bool:
    return name.isidentifier() and not keyword.iskeyword(name)

for candidate in ["user_id", "2nd_user", "biến_số_1", "def", "_private"]:
    print(f"{candidate:10} -> isidentifier: {str(candidate.isidentifier()):5} | valid var: {is_valid_variable_name(candidate)}")

# Hai phương thức is* DUY NHẤT trả về True cho chuỗi rỗng ""
print("''.isascii()          :", "".isascii())
print("''.isprintable()      :", "".isprintable())
print("'Hello\\n'.isprintable():", "Hello\\n".isprintable())`,
          output: `user_id    -> isidentifier: True  | valid var: True
2nd_user   -> isidentifier: False | valid var: False
biến_số_1  -> isidentifier: True  | valid var: True
def        -> isidentifier: True  | valid var: False
_private   -> isidentifier: True  | valid var: True
''.isascii()          : True
''.isprintable()      : True
'Hello\\n'.isprintable(): False`,
          annotations: [
            { line: 4, text: 'Kết hợp isidentifier() và not keyword.iskeyword() là công thức chuẩn để kiểm tra tên biến.' },
            { line: 6, text: 'Python 3 hỗ trợ định danh Unicode nên "biến_số_1" là tên biến hợp lệ; còn "def" bị chặn bởi iskeyword.' },
            { line: 10, text: 'Trong 12 hàm is*, chỉ có isascii() và isprintable() trả về True trên chuỗi rỗng "".' },
            { line: 12, text: 'Ký tự xuống dòng \\n là ký tự điều khiển nên isprintable() trả về False.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Ba phương thức hoàn thiện — format(), format_map() và encode()',
      badge: 'Định dạng & Mã hóa',
      content: `
        <p>Để khép lại toàn bộ các phương thức của <code>str</code>, chúng ta điểm qua 3 phương thức quan trọng về định dạng khuôn mẫu và chuyển đổi mã hóa byte (sẽ còn được đào sâu hơn ở Phần 3 và Phần 4):</p>
        <ul>
          <li><strong><code>str.format(*args, **kwargs)</code></strong>: Điền dữ liệu vào các trường giữ chỗ <code>{}</code> trong chuỗi mẫu. Cực kỳ hữu ích khi chuỗi mẫu (template) được lưu trong file cấu hình hoặc cơ sở dữ liệu (nơi không dùng trực tiếp f-string tại thời điểm viết code được).</li>
          <li><strong><code>str.format_map(mapping)</code></strong>: Tương tự như <code>s.format(**mapping)</code> nhưng truyền trực tiếp đối tượng <code>mapping</code> mà <strong>không sao chép sang một <code>dict</code> mới</strong>. Nhờ đó, bạn có thể truyền một lớp con của <code>dict</code> có định nghĩa <code>__missing__(self, key)</code> để xử lý êm đẹp các trường hợp thiếu khóa mà không bị văng lỗi <code>KeyError</code>!</li>
          <li><strong><code>str.encode(encoding='utf-8', errors='strict')</code></strong>: Chuyển đổi chuỗi văn bản (<code>str</code>) thành dãy byte (<code>bytes</code>) theo bảng mã chỉ định (mặc định là <code>'utf-8'</code>). Tham số <code>errors</code> có thể nhận <code>'strict'</code>, <code>'ignore'</code>, <code>'replace'</code>, <code>'xmlcharrefreplace'</code>, hoặc <code>'backslashreplace'</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng format(), format_map() chống lỗi KeyError và encode() sang bytes',
          code: `# 1. format() với tham số vị trí và tên
tpl = "Xin chào {name}, số dư của bạn là {balance:,.2f} VNĐ"
print(tpl.format(name="Lan", balance=15250000))

# 2. format_map() kết hợp __missing__ để giữ nguyên {key} nếu thiếu dữ liệu
class SafeDict(dict):
    def __missing__(self, key):
        return f"<{key} chưa cung cấp>"

email_tpl = "Kính gửi {customer}, đơn hàng #{order_id} sẽ giao vào {delivery_date}."
data = SafeDict(customer="Minh", order_id=9081)
print(email_tpl.format_map(data))

# 3. encode() sang đối tượng bytes
text = "Python 3.14 🚀"
utf8_bytes = text.encode("utf-8")
ascii_safe = text.encode("ascii", errors="backslashreplace")
print("UTF-8 bytes :", utf8_bytes)
print("ASCII escape:", ascii_safe)`,
          output: `Xin chào Lan, số dư của bạn là 15,250,000.00 VNĐ
Kính gửi Minh, đơn hàng #9081 sẽ giao vào <delivery_date chưa cung cấp>.
UTF-8 bytes : b'Python 3.14 \\xf0\\x9f\\x9a\\x80'
ASCII escape: b'Python 3.14 \\\\U0001f680'`,
          annotations: [
            { line: 2, text: 'Bộ đặc tả :, .2f trong format() giúp phân cách hàng nghìn bằng dấu phẩy và lấy 2 chữ số thập phân.' },
            { line: 7, text: 'Khi khóa delivery_date không tồn tại, format_map() gọi thẳng vào __missing__ của SafeDict.' },
            { line: 17, text: 'errors="backslashreplace" giúp mã hóa sang ASCII mà không mất thông tin ký tự emoji.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Dùng isdigit() hoặc isnumeric() để kiểm tra trước khi gọi int(s) chỉ cho chữ số ASCII',
        content: 'Nếu API của bạn chỉ chấp nhận chữ số ASCII từ <code>0-9</code> (ví dụ mã PIN, năm sinh), ngay cả <code>"１２３".isdecimal()</code> cũng trả về <code>True</code> (chữ số toàn độ rộng của tiếng Nhật). Để kiểm tra <strong>chỉ chữ số ASCII <code>0-9</code></strong>, hãy kết hợp: <code>s.isdecimal() and s.isascii()</code>!'
      },
      {
        title: 'Quên rằng mọi phương thức is* số đều trả về False cho số âm và số thập phân',
        content: '<code>"-10".isdecimal()</code> và <code>"3.14".isdecimal()</code> đều là <code>False</code> vì dấu <code>"-"</code> và dấu <code>"."</code> không phải là chữ số. Để kiểm tra chuỗi số thực tổng quát, cách chuẩn Pythonic nhất vẫn là dùng khối <code>try: float(s) except ValueError: ...</code>.'
      }
    ],
    tips: [
      {
        title: 'Quy tắc nhớ nhanh cho 12 phương thức is* với chuỗi rỗng ""',
        content: 'Trong 12 phương thức <code>is*</code> của <code>str</code>, có đúng <strong>10 phương thức trả về <code>False</code></strong> khi chuỗi rỗng <code>""</code>. Chỉ có duy nhất <strong>2 ngoại lệ trả về <code>True</code></strong> cho chuỗi rỗng là <code>"".isascii()</code> và <code>"".isprintable()</code>!'
      }
    ],
    deepDive: {
      title: 'Tại sao int() hiểu được isdecimal() đa ngôn ngữ nhưng từ chối isdigit()?',
      content: `
        <p>Trong chuẩn Unicode, các ký tự thuộc nhóm <code>Nd</code> (Decimal_Number — tức <code>isdecimal() == True</code>) luôn được tổ chức thành từng dãy <strong>10 mã liên tiếp nhau</strong> đại diện cho giá trị từ 0 đến 9 trong hệ thập phân vị trí (positional base-10 system) của từng ngôn ngữ. Do đó, hàm <code>int()</code> của CPython có thể chuyển đổi bất kỳ chuỗi <code>isdecimal()</code> nào thành giá trị nguyên cơ số 10 một cách nhất quán.</p>
        <p>Ngược lại, các ký tự thuộc nhóm <code>isdigit()</code> (như <code>'²'</code>) hoặc <code>isnumeric()</code> (như <code>'Ⅷ'</code> hay <code>'½'</code>) không tuân theo hệ đếm vị trí cơ số 10 (ví dụ ghép hai chữ số La Mã <code>'Ⅴ'</code> và <code>'Ⅰ'</code> là phép cộng $5 + 1 = 6$ chứ không phải $51$). Vì thế <code>int()</code> từ chối chúng để tránh sai lệch ngữ nghĩa toán học.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Xác thực mã PIN 6 chữ số ASCII thuần túy',
      problem: 'Viết hàm `is_valid_pin(pin)` kiểm tra xem chuỗi `pin` có phải là mã PIN hợp lệ gồm đúng 6 chữ số ASCII (`0-9`) hay không. Lưu ý hàm phải từ chối các chữ số Unicode toàn độ rộng như `"１２３４５６"` hay chỉ số trên `"²²²²²²"`.',
      hint: 'Kiểm tra `len(pin) == 6`, `pin.isdecimal()` và `pin.isascii()`.',
      solutionCode: `def is_valid_pin(pin: str) -> bool:
    return len(pin) == 6 and pin.isdecimal() and pin.isascii()

tests = ["123456", "12345a", "１２３４５６", "12345²", "009812"]
for t in tests:
    print(f"{t:10} -> {is_valid_pin(t)}")`,
      solutionOutput: `123456     -> True
12345a     -> False
１２３４５６     -> False
12345²     -> False
009812     -> True`,
      explanation: 'Kết hợp `pin.isdecimal()` và `pin.isascii()` đảm bảo chỉ những ký tự nằm trong dải `"0"` đến `"9"` của bảng mã ASCII mới vượt qua được bài kiểm tra.'
    },
    {
      level: 'Vừa',
      title: 'Phân loại từng ký tự trong chuỗi hỗn hợp',
      problem: 'Cho chuỗi `mixed = "Py3_²½! \\n"`. Hãy duyệt qua từng ký tự và phân loại nó vào một trong các nhãn ưu tiên theo thứ tự: `"DECIMAL"` (nếu `isdecimal`), `"DIGIT_ONLY"` (nếu `isdigit` nhưng không `isdecimal`), `"NUMERIC_ONLY"` (nếu `isnumeric` nhưng không `isdigit`), `"ALPHA"` (nếu `isalpha`), `"SPACE"` (nếu `isspace`), hoặc `"OTHER"`.',
      hint: 'Sử dụng cấu trúc `if / elif` theo thứ tự từ tập con nhỏ nhất (`isdecimal`) ra tập lớn hơn (`isdigit` -> `isnumeric`).',
      solutionCode: `mixed = "P3²½_ \\n"

for ch in mixed:
    if ch.isdecimal():
        label = "DECIMAL"
    elif ch.isdigit():
        label = "DIGIT_ONLY"
    elif ch.isnumeric():
        label = "NUMERIC_ONLY"
    elif ch.isalpha():
        label = "ALPHA"
    elif ch.isspace():
        label = "SPACE"
    else:
        label = "OTHER"
    print(f"{ch!r:6} -> {label:12} | printable: {ch.isprintable()}")`,
      solutionOutput: `'P'    -> ALPHA        | printable: True
'3'    -> DECIMAL      | printable: True
'²'    -> DIGIT_ONLY   | printable: True
'½'    -> NUMERIC_ONLY | printable: True
'_'    -> OTHER        | printable: True
' '    -> SPACE        | printable: True
'\\n'   -> SPACE        | printable: False`,
      explanation: 'Nhờ kiểm tra theo thứ tự `isdecimal()` -> `isdigit()` -> `isnumeric()`, ta bóc tách rõ ràng 3 tầng số học, đồng thời thấy được sự khác biệt giữa dấu cách `" "` (`isprintable() == True`) và `"\\n"` (`isprintable() == False`).'
    },
    {
      level: 'Khó',
      title: 'Bộ kết xuất mẫu (Template Engine) an toàn với format_map() và kiểm tra định danh',
      problem: 'Viết hàm `render_template(template, context)` sử dụng `format_map()`. Yêu cầu tạo lớp từ điển tùy chỉnh sao cho: nếu khóa tồn tại trong `context` thì trả về giá trị đó; nếu khóa không tồn tại nhưng tên khóa là một định danh Python hợp lệ (và không phải từ khóa) thì trả về chuỗi mặc định `"[MISSING: <key>]"`; ngược lại trả về `"[INVALID_KEY: <key>]"`.',
      hint: 'Tạo lớp kế thừa `dict`, cài đặt phương thức `__missing__(self, key)` có sử dụng `key.isidentifier()` và `keyword.iskeyword(key)`.',
      solutionCode: `import keyword

class SmartContext(dict):
    def __missing__(self, key: str) -> str:
        if key.isidentifier() and not keyword.iskeyword(key):
            return f"[MISSING: {key}]"
        return f"[INVALID_KEY: {key}]"

def render_template(template: str, context: dict) -> str:
    return template.format_map(SmartContext(context))

tpl = "User: {username} | Role: {user_role} | Keyword: {for} | Bad: {2fast}"
ctx = {"username": "nhatvo"}
print(render_template(tpl, ctx))`,
      solutionOutput: `User: nhatvo | Role: [MISSING: user_role] | Keyword: [INVALID_KEY: for] | Bad: [INVALID_KEY: 2fast]`,
      explanation: '`format_map()` chuyển các tên trường bên trong `{...}` tới `__missing__` khi không tìm thấy trong `SmartContext`. Tại đây, `user_role` là định danh hợp lệ nên báo `MISSING`, trong khi `for` (từ khóa Python) và `2fast` (bắt đầu bằng số) bị gắn nhãn `INVALID_KEY`.'
    }
  ],

  quiz: [
    {
      question: 'Với ký tự phân số `"¾"` và chữ số mũ `"²"`, kết quả của `("¾".isdigit(), "¾".isnumeric(), "²".isdecimal(), "²".isdigit())` là gì?',
      options: [
        '`(True, True, False, True)`',
        '`(False, True, False, True)`',
        '`(False, True, True, True)`',
        '`(False, False, False, True)`'
      ],
      correctIndex: 1,
      explanation: 'Phân số `"¾"` chỉ thỏa mãn `isnumeric()` (không phải `isdigit`). Chỉ số trên `"²"` thỏa mãn `isdigit()` và `isnumeric()`, nhưng không phải `isdecimal()`.'
    },
    {
      question: 'Trong 12 phương thức `is*` của `str`, hai phương thức nào trả về `True` khi gọi trên chuỗi rỗng `""`?',
      options: [
        '`isspace()` và `isascii()`',
        '`isascii()` và `isprintable()`',
        '`isalnum()` và `isprintable()`',
        'Không có phương thức nào, tất cả đều trả về `False`'
      ],
      correctIndex: 1,
      explanation: 'Chuỗi rỗng `""` không chứa ký tự ngoài ASCII nào và cũng không chứa ký tự không in được nào, nên `"".isascii()` và `"".isprintable()` đều trả về `True`. Toàn bộ 10 phương thức `is*` còn lại đều trả về `False`.'
    },
    {
      question: 'Kết quả của hai biểu thức `"def".isidentifier()` và `"123!".islower()` lần lượt là gì?',
      options: [
        '`False` và `True`',
        '`True` và `False`',
        '`False` và `False`',
        '`True` và `True`'
      ],
      correctIndex: 1,
      explanation: '`isidentifier()` chỉ kiểm tra quy tắc cấu tạo ký tự nên trả về `True` cho cả từ khóa như `"def"`. Còn `islower()` đòi hỏi chuỗi phải có ít nhất 1 chữ cái có phân biệt hoa/thường, nên `"123!".islower()` trả về `False`.'
    },
    {
      question: 'Ưu điểm lớn nhất của `s.format_map(mapping)` so với `s.format(**mapping)` là gì?',
      options: [
        'Tự động dịch chuỗi sang tiếng Việt',
        'Không sao chép `mapping` thành `dict` mới và cho phép tận dụng phương thức `__missing__` của lớp con `dict` để xử lý khóa bị thiếu',
        'Chạy nhanh gấp 100 lần f-string',
        'Tự động mã hóa kết quả sang `bytes`'
      ],
      correctIndex: 1,
      explanation: 'Toán tử giải nén `**mapping` luôn ép kiểu và chép dữ liệu sang một `dict` chuẩn làm mất hành vi `__missing__`, trong khi `format_map(mapping)` tra cứu trực tiếp trên đối tượng `mapping` truyền vào.'
    }
  ],

  summary: [
    'Ghi nhớ tập hợp bao hàm của 3 hàm kiểm tra số: isdecimal() (hệ 10, an toàn cho int()) ⊂ isdigit() (thêm số mũ ², ①) ⊂ isnumeric() (thêm phân số ½, số La Mã Ⅷ, chữ Hán 四).',
    'Mười phương thức is* trả về False cho chuỗi rỗng ""; chỉ duy nhất "".isascii() và "".isprintable() trả về True.',
    'Để kiểm tra tên biến hợp lệ trong Python, luôn kết hợp s.isidentifier() and not keyword.iskeyword(s).',
    'Sử dụng format() / format_map() cho các chuỗi mẫu động và encode("utf-8") để chuyển đổi chuỗi văn bản sang đối tượng bytes.'
  ]
};
