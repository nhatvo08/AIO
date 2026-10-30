export default {
  id: 'lp-c8-08',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.8',
  title: 'Các phương thức tìm kiếm và thu hẹp: remove(), pop(), count(), index()',
  subtitle: 'Hoàn tất hộp công cụ phương thức List: phân biệt xóa theo giá trị (remove) vs xóa theo vị trí (pop), cùng hai phương thức truy vấn thông tin count() và index()',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo phương thức `remove(X)` để xóa phần tử theo giá trị xuất hiện đầu tiên.',
    'Phân biệt rạch ròi giữa `remove(X)` (xóa theo giá trị) và `pop(i)` (xóa theo vị trí bù và trả về giá trị).',
    'Sử dụng phương thức `count(X)` để đếm số lần xuất hiện của một phần tử trong danh sách.',
    'Sử dụng phương thức `index(X)` để tìm vị trí bù đầu tiên của phần tử và cách xử lý lỗi `ValueError` khi không tìm thấy.'
  ],

  intuition: {
    title: 'Tìm số ghế hay Nhặt món hàng ra khỏi giỏ',
    metaphor: 'Hãy tưởng tượng bạn đang quản lý một danh sách hành khách đi máy bay. Nếu bạn muốn biết "hành khách tên Bình ngồi ghế số mấy?", bạn dùng `index("Bình")` — Python quét qua từng ghế và báo cho bạn số ghế (vị trí bù). Nếu bạn muốn đếm xem có bao nhiêu người họ Nguyễn trên chuyến bay, bạn dùng `count("Nguyễn")`. Hai hành động này chỉ là "đọc sổ sách" (phương thức truy vấn thông tin), hành khách trên máy bay vẫn ngồi nguyên vị trí. Nhưng nếu có vị khách muốn hủy vé: cách 1 (`remove("Bình")`) là bạn tìm người tên Bình đầu tiên và mời anh ta xuống máy bay (xóa theo giá trị); cách 2 (`pop(5)`) là bạn đến thẳng ghế số 5, mời người ở ghế đó xuống và mang thông tin của người đó về bàn lễ tân (xóa theo vị trí và trả về giá trị)!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN LOẠI 4 PHƯƠNG THỨC: THU HẸP VS TRUY VẤN THÔNG TIN</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">Nhóm Thu hẹp (Sửa đổi tại chỗ)</div>
            <div style="font-size:0.8rem;line-height:1.6;">
              • <code>L.remove(value)</code>: Tìm và xóa <strong>giá trị</strong> đầu tiên. Trả về <code>None</code>.<br>
              • <code>L.pop(index)</code>: Xóa tại <strong>vị trí bù</strong> và <strong>trả về giá trị</strong> đó.
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Nhóm Truy vấn (Không đổi List)</div>
            <div style="font-size:0.8rem;line-height:1.6;">
              • <code>L.count(value)</code>: Đếm <strong>số lần xuất hiện</strong> của giá trị (>= 0).<br>
              • <code>L.index(value)</code>: Trả về <strong>vị trí bù đầu tiên</strong> (báo <code>ValueError</code> nếu không có).
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phương thức remove(X) và So sánh với pop()',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 11 / 42 – Trang 12 / 42</strong>.</p>
          </div>
        </div>

        <p>Phương thức <strong><code>L.remove(X)</code></strong> tìm kiếm giá trị <code>X</code> trong danh sách và xóa phần tử xuất hiện đầu tiên khớp với <code>X</code> trực tiếp tại chỗ:</p>

        <ul>
          <li><strong>Xóa theo giá trị (Value-based):</strong> Bạn cung cấp giá trị đối tượng cần xóa (ví dụ: chuỗi <code>'code'</code>), Python sẽ quét từ trái sang phải và gỡ bỏ phần tử đầu tiên bằng với nó.</li>
          <li><strong>Không trả về giá trị:</strong> <code>remove()</code> trả về <code>None</code>. Nếu bạn cần lấy lại phần tử bị xóa, hãy dùng <code>pop()</code>.</li>
          <li><strong>Nếu giá trị không tồn tại:</strong> Python sẽ kích hoạt ngoại lệ <code>ValueError: list.remove(x): x not in list</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Quy trình chèn, tìm kiếm và thu hẹp danh sách theo ví dụ Mark Lutz',
          code: `L = ['hack', 'Py', 'code']

# 1. Tìm vị trí bù của phần tử
print("L.index('Py'):    ", L.index('Py'))

# 2. Chèn tại vị trí bù 1
L.insert(1, 'more')
print("Sau insert(1):   ", L)

# 3. Xóa theo giá trị bằng remove()
L.remove('code')
print("Sau remove('code'):", L)

# 4. Xóa theo vị trí bằng pop()
popped_val = L.pop(1)
print("Sau L.pop(1):      ", L, "| Giá trị lấy ra:", repr(popped_val))`,
          output: `L.index('Py'):     1
Sau insert(1):    ['hack', 'more', 'Py', 'code']
Sau remove('code'): ['hack', 'more', 'Py']
Sau L.pop(1):       ['hack', 'Py'] | Giá trị lấy ra: 'more'`,
          annotations: [
            { line: 4, text: 'L.index(\'Py\') tìm thấy tại vị trí bù 1.' },
            { line: 8, text: 'insert(1, \'more\') chèn vào giữa \'hack\' và \'Py\'.' },
            { line: 12, text: 'remove(\'code\') tìm thấy chuỗi \'code\' ở cuối và xóa bỏ nó tại chỗ.' },
            { line: 16, text: 'pop(1) xóa phần tử tại vị trí bù 1 (\'more\') và trả về giá trị đó.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Hai Phương thức Truy vấn Thông tin: count() và index()',
      content: `
        <p>Như tác giả Mark Lutz đặc biệt lưu ý ở trang 12: <em>"Lưu ý rằng khác với các phương thức list khác, <code>count</code> và <code>index</code> không thay đổi chính bản thân list, mà trả về thông tin về nội dung của nó."</em></p>

        <ul>
          <li><strong><code>L.count(X)</code>:</strong> Duyệt qua toàn bộ danh sách và đếm tổng số lần đối tượng <code>X</code> xuất hiện. Nếu không có, hàm trả về số <code>0</code> (không bao giờ báo lỗi).</li>
          <li><strong><code>L.index(X, [start, [stop]])</code>:</strong> Trả về vị trí bù đầu tiên mà tại đó <code>L[i] == X</code>. Tên gọi của phương thức này là tìm kiếm chỉ mục (<em>index search</em>), đừng nhầm lẫn với bản thân thao tác đánh chỉ mục (<em>indexing</em> <code>L[i]</code>), dù có tên gọi tương tự!</li>
        </ul>

        <div class="callout-box callout-pitfall">
          <div class="callout-header"><span>⚠️ Điểm khác biệt quan trọng với Chuỗi:</span> <span>List không có phương thức find()!</span></div>
          <div class="callout-body">
            <p>Trong Chương 7, phương thức <code>S.find('sub')</code> của chuỗi trả về <code>-1</code> nếu không tìm thấy. Nhưng với List, <strong>kiểu list không có phương thức <code>find()</code></strong>! Phương thức <code>L.index(X)</code> sẽ quẳng ra lỗi <code>ValueError</code> nếu <code>X</code> vắng mặt trong list. Vì vậy, trong thực tế bạn nên kiểm tra <code>if X in L:</code> trước khi gọi <code>L.index(X)</code>.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Sử dụng count(), index() an toàn và xử lý lỗi ValueError',
          code: `L = ['hack', 'Py', 'code', 'Py', 'dev']

# Đếm số lần xuất hiện
count_py = L.count('Py')
count_missing = L.count('Java')
print("L.count('Py'):  ", count_py)
print("L.count('Java'):", count_missing)

# Tìm kiếm chỉ mục an toàn với toán tử in
target = 'Py'
if target in L:
    print(f"Vị trí đầu tiên của '{target}':", L.index(target))

# Xử lý ngoại lệ ValueError khi tìm phần tử vắng mặt
try:
    L.index('Java')
except ValueError as err:
    print("Bắt lỗi index():", err)`,
          output: `L.count('Py'):   2
L.count('Java'): 0
Vị trí đầu tiên của 'Py': 1
Bắt lỗi index(): 'Java' is not in list`,
          annotations: [
            { line: 5, text: 'count() trả về số lần xuất hiện chính xác (2 lần \'Py\').' },
            { line: 6, text: 'count(\'Java\') trả về 0 một cách an toàn mà không phát sinh ngoại lệ.' },
            { line: 12, text: 'index(\'Py\') dừng lại ở vị trí đầu tiên tìm thấy (offset 1).' },
            { line: 18, text: 'Tìm kiếm phần tử không tồn tại bằng index() kích hoạt lỗi ValueError.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tra cứu nhanh mã nguồn với help(list) hoặc dir(list)',
        content: 'Hãy chạy <code>help(list)</code> hoặc <code>dir(list)</code> trong REPL của bạn để xem đầy đủ danh sách và tài liệu chuẩn của toàn bộ các phương thức mà kiểu list cung cấp.'
      }
    ],
    pitfalls: [
      {
        title: 'remove() chỉ xóa phần tử ĐẦU TIÊN khớp với giá trị',
        content: 'Nếu danh sách có nhiều phần tử trùng lặp (ví dụ: `[1, 2, 1, 1]`), lệnh `L.remove(1)` sẽ chỉ xóa duy nhất số 1 đầu tiên, danh sách còn lại `[2, 1, 1]`. Nếu muốn xóa toàn bộ các số 1, bạn cần dùng vòng lặp `while 1 in L: L.remove(1)` hoặc dùng list comprehension để lọc: `[x for x in L if x != 1]`.'
      }
    ]
  },

  exercises: [
    {
      title: 'Dọn dẹp phần tử trùng lặp theo giá trị an toàn',
      level: 'Dễ',
      problem: 'Cho danh sách scores = [9, 5, 10, 5, 8, 5, 7]. Hãy dùng vòng lặp while kết hợp toán tử in và phương thức remove() để xóa sạch tất cả các điểm số 5 ra khỏi danh sách.',
      hint: 'Dùng cấu trúc while 5 in scores: scores.remove(5).',
      solutionCode: `scores = [9, 5, 10, 5, 8, 5, 7]

print("Trước khi dọn:", scores)

# Xóa tất cả các số 5
while 5 in scores:
    scores.remove(5)

print("Sau khi dọn:  ", scores)
print("Số 5 còn lại: ", scores.count(5))`,
      solutionOutput: `Trước khi dọn: [9, 5, 10, 5, 8, 5, 7]
Sau khi dọn:   [9, 10, 8, 7]
Số 5 còn lại:  0`,
      explanation: 'Vòng lặp while 5 in scores sẽ lặp lại đúng 3 lần, mỗi lần remove(5) sẽ xóa đi một số 5 cho đến khi không còn số 5 nào trong danh sách.'
    }
  ],

  quiz: [
    {
      question: 'Điều gì xảy ra khi bạn gọi L.index("abc") trên một list L không hề chứa phần tử "abc"?',
      options: [
        'Hàm trả về giá trị -1 giống như phương thức find() của chuỗi.',
        'Hàm trả về None.',
        'Python kích hoạt ngoại lệ ValueError: \'abc\' is not in list.',
        'Hàm trả về False.'
      ],
      correctIndex: 2,
      explanation: 'Khác với chuỗi có phương thức find() trả về -1, List chỉ có phương thức index() và sẽ báo lỗi ValueError nếu đối tượng không có trong danh sách.'
    },
    {
      question: 'Phát biểu nào sau đây đúng về hai phương thức count() và index() của List?',
      options: [
        'Cả hai phương thức đều thay đổi đối tượng list tại chỗ.',
        'Cả hai phương thức chỉ truy vấn thông tin về nội dung mà không làm thay đổi list.',
        'Phương thức count() trả về một list mới.',
        'Phương thức index() có thể xóa phần tử tại vị trí tìm thấy.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz nhấn mạnh: count() và index() là các phương thức phi sửa đổi (non-mutating), chúng chỉ đọc dữ liệu và trả về kết quả số nguyên.'
    }
  ],

  summary: [
    'remove(X) tìm và xóa phần tử đầu tiên khớp với giá trị X tại chỗ, báo lỗi ValueError nếu không tìm thấy.',
    'pop(i) xóa phần tử tại vị trí bù i và trả về chính phần tử đó; mặc định xóa phần tử cuối cùng (i = -1).',
    'count(X) đếm số lần xuất hiện của đối tượng X trong list, trả về 0 nếu không có.',
    'index(X) tìm vị trí bù đầu tiên của X trong list, báo lỗi ValueError nếu X vắng mặt.',
    'Khác với các phương thức sửa đổi tại chỗ, count() và index() không làm thay đổi bản thân list.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.9), chúng ta sẽ khám phá cơ chế Duyệt lặp trên List: toán tử in, vòng lặp for và hàm dựng sẵn range().'
};