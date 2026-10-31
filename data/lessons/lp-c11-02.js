export default {
  id: 'lp-c11-02',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.2',
  title: 'Phép gán Giải nén Mở rộng với Dấu sao (*X) & Chuyên đề Các vì sao muôn màu',
  subtitle: 'Làm chủ cú pháp *X thu gom phần tử, quy tắc luôn trả về List, các trường hợp biên, ứng dụng vòng lặp for và bức tranh toàn cảnh dấu sao trong tiến trình lịch sử CPython',
  level: 'Trung cấp đến Nâng cao',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ cú pháp phép gán giải nén mở rộng (extended sequence unpacking) với mục tiêu có dấu sao *X tại các vị trí đầu, giữa, và cuối dãy tuần tự.',
    'Phân biệt rõ ràng sự khác biệt bản chất giữa giải nén mở rộng (luôn tạo ra một List mới) và thao tác cắt lát (bảo tồn kiểu đối tượng ban đầu).',
    'Nhận diện các trường hợp biên quan trọng: biến dấu sao nhận danh sách một phần tử, nhận danh sách rỗng [], và các lỗi cú pháp SyntaxError / ValueError.',
    'Khám phá khung chuyên đề lịch sử "Các vì sao muôn màu của Python": từ phép gán, hàm, hằng trị đối tượng PEP 448 đến câu lệnh match và except* trong Python 3.11+.'
  ],

  intuition: {
    title: 'Chiếc Lưới Gom Sao và Nam Châm Hút Dữ Liệu',
    metaphor: 'Nếu phép gán dãy tuần tự thông thường giống như việc bạn xếp hàng từng người vào từng ghế đơn cố định (thừa người hay thiếu ghế đều vỡ trận), thì biến mang dấu sao *X giống như một chiếc ghế sofa co giãn không đáy ở giữa khán phòng. Các biến bình thường sẽ nhanh chóng giành lấy các ghế đầu và ghế cuối đã được phân bổ đích danh; còn lại bao nhiêu người ở giữa—dù là 10 người, 1 người, hay thậm chí không còn ai—chiếc sofa *X sẽ gom tất cả lại và bọc gọn gàng vào trong một chiếc túi List mới tinh. Đó chính là sự công thái học đỉnh cao giúp bạn giải phóng khỏi những phép tính chỉ mục cắt lát vụn vặt.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH THU GOM PHẦN TỬ CỦA MỤC TIÊU CÓ DẤU SAO (*b)</div>
        <div style="display:grid;grid-template-columns:1fr 2fr 1fr;gap:10px;align-items:center;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:8px;">
            <div style="font-weight:700;color:#8b5cf6;">Mục tiêu a</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Nhận phần tử đầu<br><code>seq[0] = 1</code></div>
          </div>
          <div style="padding:10px;background:rgba(236,72,153,0.1);border:2px solid #ec4899;border-radius:8px;">
            <div style="font-weight:700;color:#ec4899;">Mục tiêu *b (Thu gom)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Gom mọi phần tử còn lại vào List<br><code>b = [2, 3]</code></div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;">
            <div style="font-weight:700;color:#10b981;">Mục tiêu c</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Nhận phần tử cuối<br><code>seq[-1] = 4</code></div>
          </div>
        </div>
        <div style="padding:8px 12px;background:var(--bg-surface);border-left:4px solid #ec4899;border-radius:4px;font-size:0.8rem;color:var(--text-secondary);">
          <strong>Quy tắc bất biến:</strong> Bất kể vế phải là chuỗi, tuple hay range, biến có dấu sao <code>*b</code> <em>luôn luôn</em> được gán một đối tượng <code>list</code> mới.
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phép Gán Giải Nén Mở Rộng (*X) Trong Thực Tế',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 8–10 / 38</strong>.</p>
          </div>
        </div>

        <p>Như đã thấy ở bài học trước, các phép gán dãy tuần tự thông thường đòi hỏi chính xác số lượng mục tiêu ở bên trái bằng số lượng phần tử trong đối tượng ở bên phải. Để loại bỏ hạn chế này mà không cần cắt lát thủ công rườm rà, Python đưa vào cú pháp <strong>phép gán giải nén mở rộng (extended sequence unpacking)</strong>.</p>
        <p>Tóm lại, một mục tiêu có dấu sao, <code>*X</code>, có thể được đặt ở bên trái dấu <code>=</code> để chỉ định một sự khớp nối tổng quát hơn với iterable ở bên phải: <strong>mục tiêu có dấu sao được gán một danh sách (list), thu thập tất cả các phần tử trong iterable chưa được gán cho các mục tiêu khác</strong>.</p>

        <h3>Vị trí linh hoạt của dấu sao</h3>
        <p>Mục tiêu có dấu sao có thể xuất hiện ở <strong>bất kỳ đâu</strong> bên vế trái:</p>
        <ul>
          <li><strong>Ở cuối (đầu, còn lại):</strong> <code>a, *b = seq</code> → <code>a</code> khớp phần tử đầu tiên, <code>b</code> thu thập toàn bộ phần còn lại vào một list.</li>
          <li><strong>Ở đầu (còn lại, cuối):</strong> <code>*a, b = seq</code> → <code>b</code> khớp phần tử cuối cùng, <code>a</code> thu thập mọi thứ phía trước vào một list.</li>
          <li><strong>Ở giữa:</strong> <code>a, *b, c = seq</code> → <code>a</code> nhận phần tử đầu, <code>c</code> nhận phần tử cuối, và <code>b</code> nhận danh sách tất cả những gì nằm ở giữa.</li>
        </ul>

        <h3>Quy tắc kiểu dữ liệu: Luôn luôn trả về List</h3>
        <p>Giống như phép gán thông thường, giải nén mở rộng hoạt động cho bất kỳ kiểu iterable nào: chuỗi ký tự, tuple, list, range... Tuy nhiên, có một sự khác biệt bản chất so với thao tác cắt lát (slice):</p>
        <blockquote>
          <p><strong>Cắt lát bảo tồn kiểu đối tượng ban đầu (chuỗi cắt lát trả về chuỗi), trong khi mục tiêu có dấu sao trong phép giải nén mở rộng LUÔN LUÔN trả về một đối tượng List mới!</strong></p>
        </blockquote>
      `,
      codeExamples: [
        {
          title: 'Giải nén mở rộng tại các vị trí và đối chiếu kiểu dữ liệu với Slicing',
          code: `seq = [1, 2, 3, 4]

# 1. Dấu sao ở cuối (Đầu, còn lại)
a, *b = seq
print("a, *b:", a, b) # 1, [2, 3, 4]

# 2. Dấu sao ở đầu (Còn lại, cuối)
*a, b = seq
print("*a, b:", a, b) # [1, 2, 3], 4

# 3. Dấu sao ở giữa
a, *b, c = seq
print("a, *b, c:", a, b, c) # 1, [2, 3], 4

# 4. Giải nén trên chuỗi ký tự
S = 'hack'
a, *b, c = S
print("Chuỗi unpack *b:", a, b, c) # 'h', ['a', 'c'], 'k'

# 5. So sánh với Cắt lát (Slicing bảo tồn kiểu chuỗi)
x, y, z = S[0], S[1:-1], S[-1]
print("Cắt lát giữ nguyên chuỗi:", x, repr(y), z) # 'h', 'ac', 'k'`,
          output: `a, *b: 1 [2, 3, 4]
*a, b: [1, 2, 3] 4
a, *b, c: 1 [2, 3] 4
Chuỗi unpack *b: h ['a', 'c'] k
Cắt lát giữ nguyên chuỗi: h 'ac' k`,
          annotations: [
            { line: 4, text: 'b thu gom các phần tử [2, 3, 4] thành một list mới.' },
            { line: 8, text: 'a thu gom các phần tử phía trước [1, 2, 3] thành một list mới.' },
            { line: 17, text: 'Mục tiêu *b trên chuỗi \'hack\' trả về list các ký tự [\'a\', \'c\'].' },
            { line: 21, text: 'Thao tác cắt lát S[1:-1] trả về chuỗi \'ac\', không biến thành list.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Các Trường Hợp Biên (Boundary Cases) & Các Lỗi Cú Pháp Cần Tránh',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 10–12 / 38</strong>.</p>
          </div>
        </div>

        <p>Mặc dù việc giải nén mở rộng rất linh hoạt, các tình huống biên (<em>boundary cases</em>) sau đây rất đáng chú ý:</p>

        <ol>
          <li>
            <strong>Khớp duy nhất một phần tử:</strong> Mục tiêu có dấu sao có thể chỉ khớp với một phần tử đơn lẻ, nhưng nó <em>vẫn luôn luôn được gán một danh sách chứa phần tử đó</em> (ví dụ: <code>[4]</code> chứ không phải con số <code>4</code>).
          </li>
          <li>
            <strong>Không còn phần tử nào để khớp:</strong> Nếu tất cả các mục tiêu khác đã vét sạch các phần tử của dãy tuần tự, mục tiêu có dấu sao sẽ được gán một <strong>danh sách rỗng <code>[]</code></strong> thay vì coi đây là trường hợp lỗi!
          </li>
        </ol>

        <h3>Ba trường hợp kích hoạt Lỗi Cú Pháp & Lỗi Giá Trị</h3>
        <ul>
          <li>
            <strong>Nhiều hơn một mục tiêu có dấu sao trong cùng một dãy:</strong> Python không thể đoán được ranh giới thu gom giữa hai biến dấu sao, do đó lệnh <code>a, *b, c, *d = seq</code> lập tức báo <code>SyntaxError: multiple starred expressions in assignment</code>.
          </li>
          <li>
            <strong>Mục tiêu có dấu sao đứng cô độc không nằm trong tuple/list:</strong> Lệnh <code>*a = seq</code> báo lỗi <code>SyntaxError: starred assignment target must be in a list or tuple</code>.
          </li>
          <li>
            <strong>Mẹo tạo bản sao danh sách với dấu phẩy:</strong> Bạn có thể thêm một dấu phẩy phía sau: <code>*a, = seq</code>. Lúc này vế trái là một tuple một phần tử hợp lệ, và <code>a</code> sẽ thu gom toàn bộ <code>seq</code> thành một <strong>bản sao danh sách (list copy) mới</strong>!
          </li>
        </ul>

        <h3>Ứng dụng trong vòng lặp while và vòng lặp for</h3>
        <p>Nhờ giải nén mở rộng, vòng lặp rút trích ngăn xếp ở bài trước trở nên cực kỳ gọn gàng:</p>
        <pre><code>L = [1, 2, 3, 4]
while L:
    front, *L = L
    print(front, L)</code></pre>
        <p>Tương tự, trong vòng lặp <code>for</code>, bạn có thể giải nén mở rộng ngay tại tiêu đề:</p>
        <pre><code>for (a, *b, c) in [(1, 2, 3, 4), (5, 6, 7, 8)]:
    print(a, b, c) # b nhận [2, 3], sau đó nhận [6, 7]</code></pre>
      `,
      codeExamples: [
        {
          title: 'Khảo sát các trường hợp biên, lỗi cú pháp và bản sao danh sách *a, = seq',
          code: `seq = [1, 2, 3, 4]

# 1. Khớp duy nhất 1 phần tử -> Vẫn trả về List 1 phần tử
a, b, c, *d = seq
print("Khớp 1 phần tử:", d) # [4]

# 2. Không còn phần tử nào -> Trả về List rỗng []
a, b, c, d, *e = seq
print("Hết phần tử để khớp:", e) # []

# 3. Dấu sao ở giữa khi hết phần tử
a, b, *e, c, d = seq
print("Dấu sao ở giữa khi đủ phần tử:", e) # []

# 4. Mẹo tạo bản sao danh sách bằng *a, = seq
*ban_sao, = seq
print("Bản sao list mới:", ban_sao)
print("Là đối tượng độc lập:", ban_sao is not seq)

# 5. Giải nén mở rộng trong vòng lặp for
du_lieu = [(1, 2, 3, 4), (5, 6, 7, 8)]
for (dau, *giua, cuoi) in du_lieu:
    print(f"Đầu: {dau} | Giữa: {giua} | Cuối: {cuoi}")`,
          output: `Khớp 1 phần tử: [4]
Hết phần tử để khớp: []
Dấu sao ở giữa khi đủ phần tử: []
Bản sao list mới: [1, 2, 3, 4]
Là đối tượng độc lập: True
Đầu: 1 | Giữa: [2, 3] | Cuối: 4
Đầu: 5 | Giữa: [6, 7] | Cuối: 8`,
          annotations: [
            { line: 5, text: 'Biến d nhận [4] (list một phần tử), giữ vững quy tắc kiểu dữ liệu.' },
            { line: 9, text: 'Biến e nhận [] an toàn, không sinh lỗi thiếu phần tử.' },
            { line: 17, text: '*ban_sao, = seq là tuple 1 phần tử, sao chép nông toàn bộ seq thành list mới.' },
            { line: 23, text: 'Giải nén mở rộng vận hành tự nhiên ngay trong tiêu đề vòng lặp for.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Khung Chuyên Đề: Các Vì Sao Muôn Màu của Python',
      content: `
        <div class="callout-box callout-theory" style="border-left:4px solid #ec4899;margin-bottom:20px;">
          <div class="callout-header">
            <span>✨</span>
            <span><strong>Khung chuyên đề: Các vì sao muôn màu của Python (The Many Stars of Python)</strong></span>
          </div>
          <div class="callout-body">
            <p><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz • <strong>PDF Trang 13–14 / 38</strong>.</p>
            <p>Không, khung thông tin này không nói về những nhân vật nổi tiếng trong showbiz! Đây là sự tổng kết của Mark Lutz về tất cả những lần xuất hiện đặc biệt của ký tự dấu sao <code>*</code> đã nổi lên trong ngôn ngữ Python qua nhiều năm tháng phát triển:</p>

            <h4>1. Trước Python 3.5</h4>
            <ul>
              <li><strong>Phép gán:</strong> Nơi một mục tiêu gán có dấu sao <code>*X</code> duy nhất thu thập các phần tử chưa khớp vào một danh sách mới (như chúng ta vừa học trong chương này).</li>
              <li><strong>Dòng tiêu đề hàm (Header):</strong> Nơi các tham số có dấu sao đơn <code>*args</code> và dấu sao kép <code>**kwargs</code> thu thập các đối số vị trí và đối số từ khóa chưa khớp vào một tuple và dictionary tương ứng (Chương 18).</li>
              <li><strong>Lời gọi hàm (Call):</strong> Nơi các biểu thức có dấu sao đơn <code>*X</code> và dấu sao kép <code>**X</code> giải nén các iterable và mapping thành các đối số vị trí và đối số từ khóa riêng lẻ khi truyền vào hàm.</li>
            </ul>

            <h4>2. Kể từ Python 3.5 (PEP 448 — Additional Unpacking Generalizations)</h4>
            <p>Các lệnh gọi hàm hỗ trợ số lượng tùy ý các biểu thức giải nén <code>*X</code> và <code>**X</code>. Hơn thế nữa, số lượng tùy ý các biểu thức có dấu sao cũng có thể xuất hiện trực tiếp trong các <strong>biểu thức hằng trị đối tượng (object literals)</strong> để giải nén và ghép nối linh hoạt:</p>
            <pre><code>[x, *iter]        # List: giải nén các phần tử trong iterable
(x, *iter, y)     # Tuple: tương tự, có ngoặc đơn hoặc không
{*iter, x}        # Set: tương tự, tập hợp duy nhất không thứ tự
{x: y, **map}     # Dict: giải nén khóa/giá trị, trùng lặp ngoài cùng bên phải thắng!</code></pre>

            <h4>3. Kể từ Python 3.10 (PEP 634 — Structural Pattern Matching)</h4>
            <p>Cả hai tên biến có dấu sao <code>*X</code> và <code>**X</code> đều có thể xuất hiện trong các khuôn mẫu (patterns) của câu lệnh <code>match/case</code> (được trình bày ở Chương 12), nơi chúng phục vụ các vai trò tương tự như trong phép gán dãy tuần tự.</p>

            <h4>4. Kể từ Python 3.11 (PEP 654 — Exception Groups and except*)</h4>
            <p>Một mệnh đề <code>except*</code> có thể xuất hiện trong các câu lệnh <code>try</code>, nơi nó cho phép xử lý đồng thời nhiều ngoại lệ được gói trong một nhóm ngoại lệ (<em>exception group</em>)—một tính năng nâng cao mà chúng ta sẽ khám phá tại Chương 35.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Minh họa các dạng thức dấu sao mở rộng trong Object Literals (PEP 448)',
          code: `# Giải nén trong List literal
ds_goc = [2, 3]
ds_moi = [1, *ds_goc, 4]
print("List literal *:", ds_moi)

# Giải nén trong Set literal (tự động khử trùng lặp)
tap_hop = {*ds_moi, 1, 5}
print("Set literal *:", sorted(list(tap_hop)))

# Giải nén trong Dict literal với ** (khóa trùng bên phải thắng)
dict_a = {'a': 1, 'b': 2}
dict_b = {'b': 99, 'c': 3}
dict_gop = {**dict_a, **dict_b}
print("Dict literal **:", dict_gop)`,
          output: `List literal *: [1, 2, 3, 4]
Set literal *: [1, 2, 3, 4, 5]
Dict literal **: {'a': 1, 'b': 99, 'c': 3}`,
          annotations: [
            { line: 3, text: '*ds_goc trải phẳng các phần tử 2, 3 vào list mới.' },
            { line: 7, text: 'Set loại bỏ phần tử 1 trùng lặp.' },
            { line: 13, text: 'Khóa \'b\' của dict_b ghi đè giá trị 2 của dict_a vì nằm ngoài cùng bên phải.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    warnings: [
      {
        title: 'Cảnh báo về giới hạn một dấu sao trong mỗi cấp dãy',
        content: 'Quy tắc "chỉ xuất hiện một lần" cho mục tiêu có dấu sao chỉ áp dụng cho từng dãy tuần tự riêng lẻ. Bạn không thể viết a, *b, *c = seq. Tuy nhiên, nếu có sự lồng nhau, bạn có thể có một dấu sao trong mỗi tuple con: [(a, *b), (c, *d)] = [(1, 2, 3, 4), (5, 6, 7, 8)] là hoàn toàn hợp lệ!'
      }
    ]
  },

  exercises: [
    {
      title: 'Tách dòng nhật ký hệ thống bằng phép gán giải nén mở rộng',
      level: 'Trung bình',
      problem: 'Một dòng nhật ký server được biểu diễn dưới dạng chuỗi: log = "2026-10-31 18:30:00 ERROR Database connection pool exhausted server_node_4". Hãy dùng split() và giải nén mở rộng để lấy ngày, giờ vào hai biến riêng; lấy toàn bộ nội dung thông báo lỗi ở giữa vào một biến; và lấy tên node server cuối cùng vào một biến.',
      hint: 'Dùng cú pháp ngay, gio, muc_do, *thong_bao, node = log.split() sau đó nối các từ trong thong_bao bằng " ".join().',
      solutionCode: `log = "2026-10-31 18:30:00 ERROR Database connection pool exhausted server_node_4"

ngay, gio, muc_do, *thong_bao, node = log.split()
thong_bao_str = " ".join(thong_bao)

print(f"Thời gian: {ngay} {gio}")
print(f"Mức độ: {muc_do}")
print(f"Thông điệp: {thong_bao_str}")
print(f"Node: {node}")`,
      solutionOutput: `Thời gian: 2026-10-31 18:30:00
Mức độ: ERROR
Thông điệp: Database connection pool exhausted
Node: server_node_4`,
      explanation: 'Mục tiêu *thong_bao ở giữa thu gom toàn bộ danh sách các từ còn lại [\'Database\', \'connection\', \'pool\', \'exhausted\'] một cách thanh lịch mà không cần tính chỉ mục phức tạp.'
    }
  ],

  quiz: [
    {
      question: 'Khi thực hiện câu lệnh a, *b = \'Python\', giá trị và kiểu dữ liệu của b là gì?',
      options: [
        'b = \'ython\' (kiểu str)',
        'b = (\'y\', \'t\', \'h\', \'o\', \'n\') (kiểu tuple)',
        'b = [\'y\', \'t\', \'h\', \'o\', \'n\'] (kiểu list)',
        'b = [\'Python\'] (kiểu list chứa 1 chuỗi)'
      ],
      correctIndex: 2,
      explanation: 'Mục tiêu có dấu sao trong phép giải nén mở rộng luôn luôn thu thập các phần tử chưa gán vào một đối tượng list mới, bất kể vế phải là chuỗi hay tuple.'
    },
    {
      question: 'Câu lệnh nào sau đây sẽ phát sinh ngoại lệ SyntaxError?',
      options: [
        '*a, = [1, 2, 3]',
        'a, *b, c = [1, 2]',
        'a, *b, c, *d = [1, 2, 3, 4]',
        '[(a, *b), (c, *d)] = [(1, 2), (3, 4)]'
      ],
      correctIndex: 2,
      explanation: 'Python nghiêm cấm việc xuất hiện nhiều hơn một biểu thức dấu sao (*b và *d) trong cùng một dãy tuần tự gán vì không thể xác định ranh giới thu gom.'
    },
    {
      question: 'Khi chạy câu lệnh a, b, *c = [10, 20], giá trị của biến c là gì?',
      options: [
        'c = None',
        'c = 0',
        'c = [] (danh sách rỗng)',
        'Phát sinh ngoại lệ ValueError vì thiếu phần tử'
      ],
      correctIndex: 2,
      explanation: 'Khi tất cả các phần tử đã được gán cho các mục tiêu cố định (a=10, b=20), mục tiêu có dấu sao *c sẽ nhận một danh sách rỗng [] thay vì báo lỗi.'
    }
  ],

  summary: [
    'Mục tiêu có dấu sao *X thu gom tất cả các phần tử còn lại của iterable vào một đối tượng List mới.',
    'Dấu sao có thể đặt ở đầu, giữa hoặc cuối vế trái, mang lại sự linh hoạt vượt trội so với cắt lát thủ công.',
    'Các trường hợp biên: biến dấu sao nhận List 1 phần tử nếu chỉ còn 1, và nhận List rỗng [] nếu không còn phần tử nào.',
    'Ký tự * có hành trình lịch sử phong phú trong Python: từ giải nén tham số hàm, object literals (PEP 448) đến match/case (3.10) và except* (3.11).'
  ]
};
