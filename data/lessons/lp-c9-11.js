export default {
  id: 'lp-c9-11',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.11',
  title: 'So sánh đối tượng: Đệ quy, == vs is, Caching chuỗi ngắn & Bảng chân lý Truthiness (None, bool)',
  subtitle: 'Cơ chế so sánh đệ quy đa tầng, phân biệt tương đương giá trị == và định danh is, hiện tượng string interning, cấm so sánh kiểu hỗn hợp, Bảng 9-4 và đối tượng None, bool',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững cơ chế So sánh đệ quy (Recursive comparison): Python tự động duyệt qua các cấu trúc lồng nhau từ trái sang phải đến độ sâu tùy ý cho đến khi xác định được kết quả.',
    'Phân biệt triệt để hai toán tử so sánh cốt lõi: toán tử == (kiểm tra sự tương đương về giá trị) và toán tử is (kiểm tra định danh đối tượng, cùng trỏ vào một ô nhớ duy nhất).',
    'Thấu hiểu hiện tượng Caching và Lưu đệm chuỗi ngắn (String interning) của CPython, biết cách giải thích vì sao \'text\' is \'text\' lại trả về True trong khi các chuỗi dài trên REPL trả về False.',
    'Nắm chắc quy tắc so sánh độ lớn giữa các kiểu cốt lõi và lệnh cấm nghiêm ngặt trong Python 3: so sánh độ lớn giữa các kiểu hỗn hợp không phải số (như int < str) sẽ lập tức báo lỗi TypeError.',
    'Biết cách so sánh độ lớn giữa hai Dictionary thông qua việc sắp xếp sorted(D.items()).',
    'Bao quát toàn cảnh Bảng 9-4 về Giá trị chân lý (Truth value / Truthiness): 0 là False, khác 0 là True; rỗng là False, không rỗng là True; thành ngữ kiểm tra if X:.',
    'Làm chủ đối tượng đặc biệt None (vị trí giữ chỗ, cấp phát trước [None] * size) và kiểu dữ liệu bool (lớp con của int).'
  ],

  intuition: {
    title: 'Hai cuốn hộ chiếu cùng thông tin và Chiếc cân chân lý vạn vật',
    metaphor: 'Hãy tưởng tượng bạn có hai cuốn hộ chiếu: một cuốn gốc và một cuốn photocopy sao y bản chính. Nếu công an hải quan kiểm tra thông tin trên hai cuốn hộ chiếu (họ tên, ngày sinh, quê quán), họ kết luận: "Hai cuốn này tương đương về giá trị!" — đó chính là toán tử `==`. Nhưng nếu cảnh sát hỏi: "Hai cuốn này có phải là CÙNG MỘT vật thể duy nhất không?", câu trả lời dứt khoát là không — đó chính là toán tử định danh `is`. Bên cạnh đó, trong thế giới Python, vạn vật đều có thể đặt lên một chiếc cân chân lý: bất cứ thứ gì "rỗng tuếch" (danh sách rỗng `[]`, từ điển rỗng `{}`, chuỗi rỗng `\'\'`) hay "bằng không" (`0`, `0.0`, `None`) đều làm chiếc cân nghiêng về phía Sai (False); ngược lại, chỉ cần chứa đựng dù chỉ một hạt cát, chiếc cân sẽ lập tức nghiêng về phía Đúng (True)!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN BIỆT TOÁN TỬ SO SÁNH: TƯƠNG ĐƯƠNG GIÁ TRỊ (==) vs ĐỊNH DANH Ô NHỚ (is)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;">
            <div style="font-weight:700;color:#10b981;margin-bottom:6px;">⚖️ Toán tử == (Value Equality)</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);">
              <code>L1 == L2</code> ➔ <strong>True</strong><br>
              So sánh nội dung bên trong từng phần tử một cách đệ quy. Thường được sử dụng cho hầu hết mọi tác vụ logic trong thực tế.
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:8px;">
            <div style="font-weight:700;color:#8b5cf6;margin-bottom:6px;">🆔 Toán tử is (Object Identity)</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);">
              <code>L1 is L2</code> ➔ <strong>False</strong><br>
              Kiểm tra <code>id(L1) == id(L2)</code>, xác định xem hai biến có cùng trỏ vào một địa chỉ ô nhớ duy nhất hay không.
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. So Sánh Đệ Quy & Phân Biệt Toán Tử == và is',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 30 / 48 – Trang 31 / 48</strong>.</p>
          </div>
        </div>

        <p>Mọi đối tượng Python đều phản hồi các phép so sánh. Tóm lại, các phép so sánh trong Python luôn kiểm tra toàn bộ các thành phần của đối tượng phức hợp cho đến khi có thể xác định được kết quả. Khi xuất hiện các đối tượng lồng nhau, Python sẽ tự động duyệt qua các cấu trúc dữ liệu để áp dụng so sánh từ trái sang phải, và sâu bao nhiêu tùy thích. Điều này được gọi là <strong>phép so sánh đệ quy (recursive comparison)</strong>.</p>

        <p>Có hai cách thức để kiểm tra tính bằng nhau trong Python:</p>
        <ul>
          <li><strong>Toán tử <code>==</code>:</strong> Kiểm tra sự tương đương về giá trị (value equality). Python thực hiện so sánh nội dung của mọi đối tượng lồng nhau một cách đệ quy.</li>
          <li><strong>Toán tử <code>is</code>:</strong> Kiểm tra định danh đối tượng (object identity). Python kiểm tra xem liệu cả hai biến có thực sự là cùng một đối tượng hay không (nghĩa là cùng cư trú tại một địa chỉ ô nhớ trong RAM: <code>id(X) == id(Y)</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh đệ quy trên List: Phân biệt == và is',
          code: `# Hai list có giá trị giống hệt nhau nhưng ở hai ô nhớ khác nhau
L1 = [1, ('a', 3)]
L2 = [1, ('a', 3)]

print("L1:", L1, "| ID:", id(L1))
print("L2:", L2, "| ID:", id(L2))

# Kiểm tra tương đương giá trị và định danh đối tượng
print("L1 == L2 (Cùng giá trị?):", L1 == L2)
print("L1 is L2 (Cùng đối tượng?):", L1 is L2)`,
          output: `L1: [1, ('a', 3)] | ID: 2200...
L2: [1, ('a', 3)] | ID: 2201...
L1 == L2 (Cùng giá trị?): True
L1 is L2 (Cùng đối tượng?): False`,
          annotations: [
            { line: 2, text: 'L1 và L2 là hai đối tượng riêng biệt được cấp phát độc lập.' },
            { line: 9, text: 'L1 == L2 duyệt đệ quy: so sánh 1 với 1, rồi so sánh (\'a\', 3) với (\'a\', 3).' },
            { line: 10, text: 'L1 is L2 trả về False vì id(L1) != id(L2).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Hiện Tượng Lưu Đệm Chuỗi Ngắn (String Interning / Caching)',
      content: `
        <p>Tuy nhiên, hãy để ý điều gì xảy ra đối với các chuỗi ký tự ngắn trong Python. Mark Lutz chỉ ra một hiện tượng tối ưu hóa rất thú vị của CPython:</p>

        <p>Bởi vì bên trong Python có cơ chế <strong>lưu trữ đệm (cache/interning)</strong> và tái sử dụng một số đối tượng bất biến (như các số nguyên nhỏ từ -5 đến 256, và các chuỗi ngắn mang dáng dấp định danh như <code>'text'</code>) như một sự tối ưu hóa hiệu năng, thực chất chỉ có duy nhất một chuỗi <code>'text'</code> trong bộ nhớ được chia sẻ chung bởi cả <code>S1</code> và <code>S2</code>. Do đó, phép kiểm tra <code>S1 is S2</code> báo cáo kết quả là <code>True</code>.</p>

        <p>Để kích hoạt hành vi thông thường (tạo ra hai vùng nhớ khác nhau), chúng ta cần sử dụng các chuỗi dài hơn hoặc chứa khoảng trắng trong phiên tương tác REPL:</p>
      `,
      codeExamples: [
        {
          title: 'Khảo sát hiện tượng lưu đệm chuỗi ngắn (interning) trong CPython',
          code: `# 1. Chuỗi ngắn (identifier-like): CPython tự động cache và chia sẻ ô nhớ
S1 = 'text'
S2 = 'text'
print("Chuỗi ngắn 'text':")
print("S1 == S2, S1 is S2:", (S1 == S2, S1 is S2))

# 2. Chuỗi dài hơn chứa dấu cách (trên REPL tương tác):
# (Lưu ý: trong cùng 1 file kịch bản, bộ tối ưu compiler có thể intern các hằng số chuỗi)
s_a = "".join(['a', ' longer', ' string'])
s_b = "".join(['a', ' longer', ' string'])
print("Chuỗi sinh động tại thời gian chạy:")
print("s_a == s_b:", s_a == s_b)
print("s_a is s_b:", s_a is s_b)`,
          output: `Chuỗi ngắn 'text':
S1 == S2, S1 is S2: (True, True)
Chuỗi sinh động tại thời gian chạy:
s_a == s_b: True
s_a is s_b: False`,
          annotations: [
            { line: 5, text: 'S1 is S2 là True do string interning của CPython đối với chuỗi ngắn.' },
            { line: 12, text: 'Hai chuỗi được sinh động tại runtime có cùng giá trị nhưng khác ô nhớ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Quy Tắc So Sánh Độ Lớn & Cấm So Sánh Kiểu Hỗn Hợp Trong Python 3',
      content: `
        <p>Tổng quát hơn, Python so sánh các kiểu đối tượng cốt lõi của nó như sau:</p>
        <ul>
          <li><strong>Số học:</strong> So sánh theo độ lớn tương đối, sau khi đã tự động ép sang kiểu chung cao nhất nếu cần (ví dụ: <code>1 < 1.1</code> sau khi 1 được chuyển thành 1.0).</li>
          <li><strong>Chuỗi:</strong> So sánh theo thứ tự từ điển dựa trên giá trị điểm mã Unicode do <code>ord()</code> trả về (ví dụ: <code>'abc' < 'ac'</code>).</li>
          <li><strong>List và Tuple:</strong> So sánh từng thành phần từ trái sang phải, và đệ quy đối với các cấu trúc lồng nhau, cho đến khi chạm tới cuối hoặc điểm không khớp đầu tiên (ví dụ: <code>[1, 3] > [1, 2]</code>).</li>
          <li><strong>Set:</strong> Bằng nhau nếu cả hai chứa các phần tử giống nhau; các toán tử <code><</code> và <code>></code> áp dụng các phép kiểm tra tập con (subset) và tập cha (superset).</li>
        </ul>

        <div class="callout-box callout-pitfall">
          <div class="callout-header"><span>⚠️ Thay đổi cốt lõi trong Python 3:</span> <span>Cấm so sánh độ lớn kiểu hỗn hợp</span></div>
          <div class="callout-body">
            <p>Trong Python 2 cũ kỹ trước đây, bạn có thể so sánh bất kỳ hai đối tượng nào (ví dụ <code>11 < '11'</code>) và Python sẽ trả về kết quả dựa trên tên kiểu. Trong <strong>Python 3, quy tắc này bị cấm tiệt</strong>: so sánh độ lớn giữa các kiểu hỗn hợp không phải số học sẽ lập tức báo lỗi <code>TypeError</code>! Quy tắc này cũng gián tiếp áp dụng cho phương thức <code>sort()</code>.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh độ lớn đệ quy và lỗi TypeError khi so sánh kiểu hỗn hợp',
          code: `# So sánh độ lớn đệ quy: phần tử lồng nhau 3 > 2
L1 = [1, ('a', 3)]
L2 = [1, ('a', 2)]
print("So sánh L1 và L2:", (L1 < L2, L1 == L2, L1 > L2))

# Kiểm tra bằng nhau giữa các kiểu khác nhau: Hợp lệ (trả về False)
print("11 == '11':", 11 == '11')

# Kiểm tra độ lớn giữa các kiểu khác nhau: BỊ CẤM trong Python 3!
try:
    print(11 >= '11')
except TypeError as err:
    print("Bắt lỗi TypeError khi so sánh int và str:", err)

# Sắp xếp danh sách kiểu hỗn hợp cũng bị cấm
try:
    [11, '11'].sort()
except TypeError as err:
    print("Bắt lỗi TypeError khi sort list hỗn hợp:", err)`,
          output: `So sánh L1 và L2: (False, False, True)
11 == '11': False
Bắt lỗi TypeError khi so sánh int và str: '>=' not supported between instances of 'int' and 'str'
Bắt lỗi TypeError khi sort list hỗn hợp: '<' not supported between instances of 'str' and 'int'`,
          annotations: [
            { line: 4, text: 'Python so sánh 1==1, \'a\'==\'a\', và dừng lại khi 3 > 2 kết luận L1 > L2.' },
            { line: 7, text: 'Toán tử == cho phép so sánh khác kiểu, kết quả là False.' },
            { line: 12, text: 'Toán tử độ lớn >= cấm so sánh giữa int và str.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. So Sánh Dictionary Qua sorted(D.items())',
      content: `
        <p>Như đã lưu ý trong Chương 8, các toán tử so sánh độ lớn <code><</code> hay <code>></code> không hoạt động trực tiếp đối với dictionary trong Python 3 (sẽ báo lỗi <code>TypeError</code>). Phép kiểm tra bằng nhau <code>==</code> thì hoạt động bình thường, so sánh xem hai dictionary có cùng các cặp khóa/giá trị hay không mà không phân biệt thứ tự chèn.</p>

        <p>Để so sánh độ lớn giữa hai dictionary, giải pháp tiêu chuẩn là trích xuất các cặp mục thông qua <code>D.items()</code>, sắp xếp chúng bằng <code>sorted()</code> rồi so sánh hai danh sách đã sắp xếp:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh bằng nhau và so sánh độ lớn Dictionary bằng sorted(D.items())',
          code: `D1 = {'b': 3, 'a': 1}
D2 = {'a': 1, 'b': 3}

# Phép so sánh bằng nhau: Hoạt động bình thường
print("D1 == D2:", D1 == D2)

# Phép so sánh độ lớn trực tiếp: Bị cấm
try:
    print(D1 < D2)
except TypeError as err:
    print("Lỗi so sánh dict trực tiếp:", err)

# Giải pháp: So sánh danh sách các mục (items) đã được sắp xếp
items1 = sorted(D1.items())
items2 = sorted(D2.items())
print("D1 items đã sắp xếp:", items1)
print("D2 items đã sắp xếp:", items2)
print("So sánh độ lớn items1 <= items2:", items1 <= items2)`,
          output: `D1 == D2: True
Lỗi so sánh dict trực tiếp: '<' not supported between instances of 'dict' and 'dict'
D1 items đã sắp xếp: [('a', 1), ('b', 3)]
D2 items đã sắp xếp: [('a', 1), ('b', 3)]
So sánh độ lớn items1 <= items2: True`,
          annotations: [
            { line: 5, text: 'D1 == D2 kiểm tra tương đương nội dung, bỏ qua thứ tự chèn.' },
            { line: 10, text: 'Toán tử < cấm áp dụng trên dict.' },
            { line: 17, text: 'sorted(D.items()) biến dict thành danh sách tuple có thể so sánh được.' }
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      title: '5. Ý Nghĩa Của True và False Trong Python & Bảng 9-4',
      content: `
        <p>Trong Python, số nguyên <code>0</code> đại diện cho sai (False), và số nguyên <code>1</code> đại diện cho đúng (True). Thêm vào đó, Python nhận diện <strong>bất kỳ cấu trúc dữ liệu rỗng nào là False và bất kỳ cấu trúc dữ liệu không rỗng nào là True</strong>. Tổng quát hơn, tính đúng và sai là thuộc tính nội tại (truthiness) của mọi đối tượng trong Python.</p>

        <p><strong>Bảng 9-4</strong> đưa ra các ví dụ về giá trị chân lý (truth value) đúng và sai của các đối tượng đa dạng:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:50%;">Đối tượng (Object)</th>
                <th style="padding:10px 12px;">Giá trị chân lý (Truth Value)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>'text'</code> (Chuỗi có ký tự)</td>
                <td style="padding:8px 12px;color:#10b981;font-weight:700;">True</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>''</code> (Chuỗi rỗng)</td>
                <td style="padding:8px 12px;color:#ef4444;font-weight:700;">False</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>[1, 2]</code> (List không rỗng)</td>
                <td style="padding:8px 12px;color:#10b981;font-weight:700;">True</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>[]</code> (List rỗng)</td>
                <td style="padding:8px 12px;color:#ef4444;font-weight:700;">False</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>{'a': 1}</code> (Dictionary có phần tử)</td>
                <td style="padding:8px 12px;color:#10b981;font-weight:700;">True</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>{}</code> (Dictionary rỗng)</td>
                <td style="padding:8px 12px;color:#ef4444;font-weight:700;">False</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>1</code> (Số nguyên khác không)</td>
                <td style="padding:8px 12px;color:#10b981;font-weight:700;">True</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><code>0.0</code> (Số thực bằng không)</td>
                <td style="padding:8px 12px;color:#ef4444;font-weight:700;">False</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><code>None</code> (Đối tượng giữ chỗ)</td>
                <td style="padding:8px 12px;color:#ef4444;font-weight:700;">False</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Như một ứng dụng của nguyên lý này, thay vì phải viết rườm rà <code>if len(L) > 0:</code> hoặc <code>if S != '':</code>, lập trình viên Python thường viết ngắn gọn và thanh lịch: <code>if X:</code> (nếu X có phần tử) hoặc <code>if not X:</code> (nếu X rỗng)!</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-6',
      title: '6. Đối Tượng None & Kỹ Thuật Cấp Phát Trước Danh Sách [None] * size',
      content: `
        <p>Như được hiển thị ở hàng cuối cùng trong Bảng 9-4, Python cũng cung cấp một đối tượng đặc biệt gọi là <strong>None</strong>, vốn luôn luôn mang giá trị <code>False</code>. <code>None</code> đóng vai trò như một vị trí giữ chỗ trống (tương tự như con trỏ <code>NULL</code> trong ngôn ngữ C).</p>

        <p>Hãy nhớ lại rằng đối với list, bạn không thể gán giá trị cho một chỉ mục ngoài biên (sẽ báo lỗi <code>IndexError</code>). Để cấp phát trước một list có kích thước cố định để có thể gán giá trị vào bất kỳ vị trí nào trong tương lai, bạn có thể khởi tạo list lấp đầy bởi các đối tượng <code>None</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Cấp phát trước danh sách bằng [None] * size để gán chỉ mục tự do',
          code: `# Cố gắng gán chỉ mục ngoài biên của list rỗng sẽ thất bại
size = 50
L = []
try:
    L[size - 1] = 'NO'
except IndexError as err:
    print("Lỗi khi gán chỉ mục ngoài biên:", err)

# Giải pháp chuẩn: Cấp phát trước 50 phần tử None
L = [None] * size
L[size - 1] = 'OK'
print("10 phần tử cuối của list sau khi cấp phát:")
print(L[-10:])`,
          output: `Lỗi khi gán chỉ mục ngoài biên: list assignment index out of range
10 phần tử cuối của list sau khi cấp phát:
[None, None, None, None, None, None, None, None, None, 'OK']`,
          annotations: [
            { line: 6, text: 'List không tự động mở rộng khi gán chỉ mục vượt biên.' },
            { line: 9, text: '[None] * size nhân bản tham chiếu None, tạo list 50 phần tử.' },
            { line: 10, text: 'L[size - 1] = \'OK\' gán thành công vào vị trí thứ 49.' }
          ]
        }
      ]
    },
    {
      id: 'sec-7',
      title: '7. Kiểu bool và Hàm Dựng Sẵn bool()',
      content: `
        <p>Kiểu Boolean <code>bool</code> trong Python chỉ đơn giản là tăng cường thêm cho các khái niệm <code>True</code> và <code>False</code>. Về mặt kỹ thuật, <code>bool</code> là một lớp con của <code>int</code> (nghĩa là <code>issubclass(bool, int) == True</code>), và hai hằng số <code>True</code>, <code>False</code> hoạt động giống như các phiên bản tùy biến của số <code>1</code> và <code>0</code>:</p>

        <p>Bạn có thể sử dụng hàm dựng sẵn <code>bool(X)</code> để trích xuất tường minh giá trị Boolean của bất kỳ đối tượng nào (khác không và không rỗng sẽ trả về <code>True</code>):</p>
      `,
      codeExamples: [
        {
          title: 'Trích xuất giá trị Boolean bằng hàm dựng sẵn bool()',
          code: `print("bool(1):", bool(1))
print("bool(0):", bool(0))
print("bool('text'):", bool('text'))
print("bool(''):", bool(''))
print("bool([]):", bool([]))
print("bool({'a': 1}):", bool({'a': 1}))
print("bool(None):", bool(None))

# bool kế thừa từ int: True và False có thể tham gia tính toán
print("True + True:", True + True)
print("isinstance(True, int):", isinstance(True, int))`,
          output: `bool(1): True
bool(0): False
bool('text'): True
bool(''): False
bool([]): False
bool({'a': 1}): True
bool(None): False
True + True: 2
isinstance(True, int): True`,
          annotations: [
            { line: 1, text: 'Số khác 0 trả về True.' },
            { line: 4, text: 'Chuỗi rỗng trả về False.' },
            { line: 9, text: 'True tương đương 1, nên True + True = 2.' },
            { line: 10, text: 'bool là subclass của int trong hệ phân cấp kiểu của Python.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Luôn dùng "X is None" thay vì "X == None"',
        content: 'Theo quy chuẩn PEP 8, khi kiểm tra xem một biến có phải là None hay không, luôn luôn sử dụng <code>if X is None:</code> hoặc <code>if X is not None:</code>. Toán tử is so sánh trực tiếp địa chỉ ô nhớ nên chạy cực nhanh và tránh bị đánh lừa nếu đối tượng X tự định nghĩa lại phương thức __eq__.'
      }
    ],
    pitfalls: [
      {
        title: 'Tránh so sánh "if X == True:"',
        content: 'Đừng bao giờ viết <code>if X == True:</code>. Thay vào đó, hãy viết ngắn gọn <code>if X:</code>. Nếu X là danh sách [1, 2], nó mang giá trị chân lý là truthy nhưng biểu thức <code>[1, 2] == True</code> sẽ trả về <code>False</code>!'
      }
    ]
  },

  exercises: [
    {
      title: 'Kiểm tra tính chân lý và so sánh đệ quy',
      level: 'Dễ',
      problem: 'Hãy viết mã Python: (1) Kiểm tra giá trị chân lý của các giá trị: 0, 0.0, \'\', [], {}, None bằng hàm bool(). (2) Khởi tạo hai tuple lồng nhau t1 = (1, [2, 3]) và t2 = (1, [2, 3]); kiểm tra t1 == t2 và t1 is t2.',
      hint: 'Dùng list comprehension [bool(x) for x in ...] và toán tử == / is.',
      solutionCode: `falsy_values = [0, 0.0, '', [], {}, None]
truth_results = [bool(v) for v in falsy_values]
print("Kết quả bool của các giá trị:", truth_results)

t1 = (1, [2, 3])
t2 = (1, [2, 3])
print("t1 == t2 (Giá trị):", t1 == t2)
print("t1 is t2 (Định danh):", t1 is t2)`,
      solutionOutput: `Kết quả bool của các giá trị: [False, False, False, False, False, False]
t1 == t2 (Giá trị): True
t1 is t2 (Định danh): False`,
      explanation: 'Mọi cấu trúc rỗng và số bằng không đều là falsy; t1 và t2 có cùng giá trị nội dung nhờ so sánh đệ quy nhưng nằm ở hai vùng nhớ khác nhau.'
    }
  ],

  quiz: [
    {
      question: 'Trong Python 3, kết quả của biểu thức (100 < \'200\') là gì?',
      options: [
        'True (vì 100 nhỏ hơn 200)',
        'False (vì số nguyên được xếp sau chuỗi)',
        'Báo lỗi TypeError vì Python 3 cấm so sánh độ lớn giữa các kiểu dữ liệu hỗn hợp không phải số',
        'None'
      ],
      correctIndex: 2,
      explanation: 'Python 3 nghiêm cấm so sánh độ lớn tương đối (<, <=, >, >=) giữa các kiểu dữ liệu không tương thích như int và str, báo lỗi TypeError.'
    },
    {
      question: 'Phát biểu nào sau đây phân biệt CHÍNH XÁC NHẤT giữa toán tử "==" và toán tử "is"?',
      options: [
        'Toán tử "is" kiểm tra độ dài chuỗi, còn "==" kiểm tra ký tự.',
        'Toán tử "==" kiểm tra sự tương đương về giá trị nội dung, còn "is" kiểm tra xem hai biến có cùng tham chiếu tới một đối tượng ô nhớ duy nhất hay không.',
        'Toán tử "==" chỉ dùng cho số, còn "is" chỉ dùng cho chuỗi.',
        'Hai toán tử này hoàn toàn đồng nghĩa trong Python 3.'
      ],
      correctIndex: 1,
      explanation: '== kiểm tra value equality (giá trị tương đương qua so sánh đệ quy); is kiểm tra object identity (cùng ID ô nhớ trong RAM).'
    }
  ],

  summary: [
    'Python thực hiện so sánh đệ quy trên các đối tượng phức hợp từ trái sang phải đến độ sâu tùy ý.',
    'Toán tử == kiểm tra tương đương giá trị; toán tử is kiểm tra định danh ô nhớ (id(X) == id(Y)).',
    'CPython có cơ chế interning (lưu đệm) các chuỗi ngắn và số nguyên nhỏ để tối ưu hiệu năng.',
    'Python 3 cấm so sánh độ lớn giữa các kiểu hỗn hợp không phải số; Dictionary không hỗ trợ so sánh độ lớn trực tiếp mà phải qua sorted(D.items()).',
    'Bảng 9-4 định nghĩa giá trị chân lý: số 0 và cấu trúc rỗng là False; số khác 0 và cấu trúc có phần tử là True.',
    'Đối tượng None là vị trí giữ chỗ hữu ích cho việc cấp phát trước [None] * size; kiểu bool là lớp con của int.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.12), chúng ta sẽ khám phá Phân cấp kiểu của Python (Hình 9-3), mô hình đối tượng hạng nhất, đối tượng kiểu type, hàm isinstance, và phân tích vì sao range không phải là một dãy tuần tự thực sự trong bộ nhớ.'
};
