export default {
  id: 'p0-03',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.3',
  title: 'Mô hình đối tượng: Tên, đối tượng và phép gán',
  subtitle: 'Viên gạch quan trọng nhất của tư duy Python: Biến là nhãn tên, id/type/value, aliasing, is vs == và dọn rác',
  level: 'Cơ bản',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: 'immutability-viewer',

  objectives: [
    'Xây dựng mô hình tinh thần chuẩn xác: Biến trong Python là NHÃN TÊN trỏ tới đối tượng, tuyệt đối không phải cái hộp chứa giá trị.',
    'Nắm vững 3 thuộc tính sống còn của mọi đối tượng trong bộ nhớ: Danh tính (id), Kiểu dữ liệu (type), và Giá trị (value).',
    'Hiểu sâu sắc hiện tượng nhiều tên cùng trỏ một đối tượng (Aliasing) và hệ quả khi đối tượng có thể thay đổi (mutable).',
    'Phân biệt tuyệt đối giữa toán tử đồng nhất `is` (cùng đối tượng) và toán tử bằng giá trị `==`. Hiểu vì sao so sánh với `None` bắt buộc dùng `is`.',
    'Hiểu bản chất hàm `id()`, lệnh `del` (xóa nhãn tên chứ không xóa đối tượng), và cơ chế đếm tham chiếu (Reference Counting) dọn rác tự động của CPython.'
  ],

  intuition: {
    title: 'Thẻ tên hành lý và Quả bóng bay trong phòng',
    metaphor: 'Trong các ngôn ngữ như C hay Pascal, biến giống như một chiếc hộp gỗ cố định gắn chặt vào tường: gán x = 5 nghĩa là ném số 5 vào hộp x. Nhưng trong Python, tư duy hoàn toàn ngược lại: ĐỐI TƯỢNG là một quả bóng bay lơ lửng trong không gian bộ nhớ (Heap). Còn BIẾN chỉ là chiếc thẻ tên bằng giấy buộc vào sợi dây của quả bóng! Khi bạn viết a = [1, 2, 3], Python tạo ra một quả bóng danh sách trong bộ nhớ và buộc thẻ tên "a" vào đó. Khi bạn viết b = a, bạn KHÔNG hề tạo thêm quả bóng nào — bạn chỉ buộc thêm chiếc thẻ tên thứ hai "b" vào đúng sợi dây của quả bóng ban đầu! Nếu ai đó cầm thẻ "b" và làm nổ quả bóng, người cầm thẻ "a" cũng thấy quả bóng của mình biến mất.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">MÔ HÌNH TINH THẦN CỐT LÕI: THẺ TÊN (NAMES) ──► ĐỐI TƯỢNG (HEAP OBJECTS)</div>
        <div style="display:grid;grid-template-columns:1fr 1.5fr;gap:16px;align-items:center;">
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="padding:10px;border:2px dashed var(--accent-primary);border-radius:8px;background:var(--bg-surface);text-align:center;">
              <span style="font-size:0.75rem;color:var(--text-muted);display:block;">Thẻ tên (Variable Names)</span>
              <strong style="font-size:1.1rem;color:var(--accent-primary);">a</strong>
            </div>
            <div style="padding:10px;border:2px dashed var(--accent-primary);border-radius:8px;background:var(--bg-surface);text-align:center;">
              <span style="font-size:0.75rem;color:var(--text-muted);display:block;">Thẻ tên (Variable Names)</span>
              <strong style="font-size:1.1rem;color:var(--accent-primary);">b</strong>
            </div>
          </div>
          <div style="padding:14px;border:2px solid var(--success);border-radius:10px;background:var(--bg-surface);">
            <div style="font-size:0.75rem;color:var(--text-muted);display:flex;justify-content:space-between;">
              <span>id: 0x7ffd980 (Địa chỉ RAM)</span>
              <span style="color:var(--success);font-weight:700;">refcount: 2</span>
            </div>
            <div style="font-size:1.15rem;font-weight:800;color:var(--text-primary);margin:8px 0;text-align:center;">
              [1, 2, 3]
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);text-align:center;">
              type: &lt;class 'list'&gt; (Đối tượng thực thể)
            </div>
          </div>
        </div>
        <div style="text-align:center;color:var(--accent-primary);font-weight:600;font-size:0.8rem;">
          a và b cùng trỏ tới 1 đối tượng duy nhất! Phép gán "=" là gắn thẻ tên, KHÔNG sao chép dữ liệu.
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Mọi thứ đều là Đối tượng — 3 Thuộc tính Sống còn (id, type, value)',
      badge: 'Bản chất Python',
      content: `
        <p>Trong Python, một triết lý thiết kế tối cao là: <strong>Mọi thứ đều là đối tượng (Everything is an Object)</strong>. Từ một con số nguyên <code>42</code>, số thực <code>3.14</code>, chuỗi <code>"chào"</code>, một hàm (function), một module, cho đến một lớp (class) — tất cả đều là các đối tượng độc lập tồn tại trên bộ nhớ Heap.</p>
        <p>Mỗi khi một đối tượng được sinh ra trong CPython, nó luôn sở hữu <strong>3 thuộc tính bất biến</strong> định hình nên nó:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Thuộc tính</th>
                <th>Công cụ kiểm tra</th>
                <th>Ý nghĩa bản chất</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Danh tính (Identity)</strong></td>
                <td><code>id(obj)</code></td>
                <td>Con số định danh duy nhất của đối tượng trong suốt vòng đời của nó. Trong CPython, <code>id()</code> chính là <strong>địa chỉ vùng nhớ RAM</strong> của khối dữ liệu <code>PyObject</code>.</td>
              </tr>
              <tr>
                <td><strong>2. Kiểu dữ liệu (Type)</strong></td>
                <td><code>type(obj)</code></td>
                <td>Quyết định đối tượng này có thể làm được những việc gì, hỗ trợ những phép toán nào (ví dụ: có cộng được không, có cắt lát được không).</td>
              </tr>
              <tr>
                <td><strong>3. Giá trị (Value)</strong></td>
                <td>In trực tiếp hoặc <code>==</code></td>
                <td>Dữ liệu thực tế được chứa bên trong đối tượng (có thể bất biến hoặc có thể sửa đổi).</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khám phá 3 thuộc tính id, type, value của các đối tượng',
          code: `# Tạo một đối tượng số nguyên và một danh sách
x = 1000
ds = ["Python", 3.14]

print("=== ĐỐI TƯỢNG SỐ NGUYÊN ===")
print("Giá trị (Value):", x)
print("Kiểu dữ liệu (Type):", type(x))
print("Danh tính id (Địa chỉ RAM):", id(x), f"(Dạng Hex: {hex(id(x))})")

print("\\n=== ĐỐI TƯỢNG DANH SÁCH ===")
print("Giá trị (Value):", ds)
print("Kiểu dữ liệu (Type):", type(ds))
print("Danh tính id (Địa chỉ RAM):", id(ds), f"(Dạng Hex: {hex(id(ds))})")`,
          output: `=== ĐỐI TƯỢNG SỐ NGUYÊN ===
Giá trị (Value): 1000
Kiểu dữ liệu (Type): <class 'int'>
Danh tính id (Địa chỉ RAM): 140728492038480 (Dạng Hex: 0x7ffd8a120150)

=== ĐỐI TƯỢNG DANH SÁCH ===
Giá trị (Value): ['Python', 3.14]
Kiểu dữ liệu (Type): <class 'list'>
Danh tính id (Địa chỉ RAM): 2147829482112 (Dạng Hex: 0x1f40a1b2a80)`,
          annotations: [
            { line: 2, text: 'CPython cấp phát một PyObject cho số 1000 và gán thẻ x vào.' },
            { line: 7, text: 'Hàm id(x) trả về số nguyên đại diện cho địa chỉ RAM.' },
            { line: 13, text: 'Hàm hex(id(ds)) giúp ta quan sát địa chỉ bộ nhớ quen thuộc dưới dạng hex.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Biến là Nhãn tên — Phép gán "=" KHÔNG sao chép dữ liệu!',
      badge: 'Mô hình Tinh thần',
      content: `
        <p>Đây là sai lầm phổ biến nhất của người mới học: nghĩ rằng biến là cái hộp đựng đồ, và khi viết <code>b = a</code> thì máy tính sao chép một cái hộp mới.</p>
        <p><strong>Sự thật trong Python:</strong></p>
        <ul>
          <li>Phép gán <code>biến = đối_tượng</code> chỉ đơn giản là: <strong>Buộc một nhãn tên vào một đối tượng</strong>.</li>
          <li>Khi viết <code>b = a</code>: Python nhìn xem nhãn <code>a</code> đang buộc vào đối tượng nào, và <strong>buộc thêm nhãn <code>b</code> vào đúng đối tượng đó</strong>! Hoàn toàn không có thao tác nhân bản dữ liệu nào xảy ra.</li>
          <li>Hiện tượng nhiều nhãn tên cùng trỏ vào một đối tượng được gọi là <strong>Aliasing (Bí danh)</strong>.</li>
        </ul>
        <p>Khi đối tượng là kiểu <em>có thể thay đổi (mutable)</em> như <code>list</code>, việc sửa đổi qua nhãn này sẽ lập tức làm thay đổi góc nhìn từ nhãn kia!</p>
      `,
      codeExamples: [
        {
          title: 'Hiện tượng Aliasing: Hai tên cùng chia sẻ một danh sách',
          code: `# Khởi tạo một danh sách điểm số
diem_a = [8, 9, 10]

# Gán diem_b = diem_a (Gắn thêm nhãn tên, KHÔNG sao chép!)
diem_b = diem_a

print("id của diem_a:", id(diem_a))
print("id của diem_b:", id(diem_b))
print("Cả 2 có trỏ cùng 1 đối tượng không?", diem_a is diem_b)

# Thử sửa dữ liệu thông qua nhãn diem_b
diem_b.append(7)

print("\\nSau khi sửa qua diem_b:")
print("diem_b:", diem_b)
print("diem_a cũng bị đổi theo!:", diem_a)`,
          output: `id của diem_a: 2147829482112
id của diem_b: 2147829482112
Cả 2 có trỏ cùng 1 đối tượng không? True

Sau khi sửa qua diem_b:
diem_b: [8, 9, 10, 7]
diem_a cũng bị đổi theo!: [8, 9, 10, 7]`,
          annotations: [
            { line: 5, text: 'diem_b và diem_a có cùng một mã id() duy nhất.' },
            { line: 7, text: 'Toán tử is xác nhận 100% hai tên đang trỏ cùng 1 đối tượng.' },
            { line: 10, text: 'Thao tác append(7) sửa trực tiếp trên vùng nhớ RAM 2147829482112.' },
            { line: 15, text: 'Người cầm thẻ diem_a nhìn vào cũng thấy số 7 vừa được thêm!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Phân biệt tuyệt đối "is" và "==" — Khi nào dùng cái nào?',
      badge: 'Toán tử So sánh',
      content: `
        <p>Hai toán tử này nhìn có vẻ giống nhau nhưng kiểm tra hai câu hỏi hoàn toàn khác nhau:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Toán tử</th>
                <th>Tên gọi</th>
                <th>Câu hỏi kiểm tra</th>
                <th>Bản chất bên dưới</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>==</code></td>
                <td>So sánh Giá trị (Equality)</td>
                <td><em>"Hai đối tượng này có cùng giá trị nội dung không?"</em></td>
                <td>Gọi phương thức <code>__eq__()</code> của đối tượng để đối chiếu từng phần tử.</td>
              </tr>
              <tr>
                <td><code>is</code></td>
                <td>So sánh Danh tính (Identity)</td>
                <td><em>"Hai biến này có đang cùng trỏ vào <strong>ĐÚNG MỘT</strong> đối tượng trong RAM không?"</em></td>
                <td>Kiểm tra xem <code>id(a) == id(b)</code> (so sánh trực tiếp con trỏ địa chỉ bộ nhớ).</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4>Ví dụ đời thường:</h4>
        <p>Hai cuốn sách giáo khoa giống hệt nhau xuất bản cùng đợt: chúng có nội dung bằng nhau (<code>sach1 == sach2</code> là <code>True</code>), nhưng chúng là hai cuốn sách vật lý khác nhau nằm ở hai vị trí khác nhau (<code>sach1 is sach2</code> là <code>False</code>).</p>
      `,
      codeExamples: [
        {
          title: 'So sánh chi tiết giữa is và == trên danh sách và số',
          code: `# Tạo hai danh sách riêng biệt có nội dung giống hệt nhau
list_1 = [1, 2, 3]
list_2 = [1, 2, 3]

print("list_1 == list_2:", list_1 == list_2, "-> Cùng nội dung giá trị")
print("list_1 is list_2:", list_1 is list_2, "-> Hai đối tượng riêng biệt trong RAM!")
print("id list_1:", hex(id(list_1)))
print("id list_2:", hex(id(list_2)))

# Trường hợp bắt buộc: So sánh với đối tượng None
ket_qua = None
print("\\nCách chuẩn mực kiểm tra None:")
print("ket_qua is None ->", ket_qua is None)
print("ket_qua is not None ->", ket_qua is not None)`,
          output: `list_1 == list_2: True -> Cùng nội dung giá trị
list_1 is list_2: False -> Hai đối tượng riêng biệt trong RAM!
id list_1: 0x1f40a1b2a80
id list_2: 0x1f40a1b2b00

Cách chuẩn mực kiểm tra None:
ket_qua is None -> True
ket_qua is not None -> False`,
          annotations: [
            { line: 6, text: 'list_1 và list_2 có id khác nhau dù nội dung bằng nhau.' },
            { line: 13, text: 'Chuẩn PEP 8 quy định: Luôn dùng is None hoặc is not None, KHÔNG BAO GIỜ dùng == None.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Lệnh del, Đếm tham chiếu (Reference Counting) và Dọn rác',
      badge: 'CPython Internals',
      content: `
        <p>Nhiều người nghĩ lệnh <code>del x</code> là "xóa đối tượng <code>x</code> khỏi bộ nhớ". <strong>Sai hoàn toàn!</strong></p>
        <ul>
          <li><strong>Lệnh <code>del x</code> chỉ xóa TÊN <code>x</code></strong> khỏi không gian tên (namespace) hiện tại, giống như bạn gỡ bỏ chiếc thẻ tên giấy ra khỏi quả bóng.</li>
          <li><strong>Bộ đếm tham chiếu (Reference Counting):</strong> Mỗi đối tượng trong CPython luôn có một trường số nguyên gọi là <code>ob_refcnt</code> để đếm xem hiện tại có bao nhiêu nhãn tên hoặc cấu trúc đang trỏ vào nó.</li>
          <li>Khi một nhãn tên bị gỡ ra (bằng <code>del</code> hoặc khi hàm kết thúc), <code>ob_refcnt</code> giảm đi 1.</li>
          <li>Khi <code>ob_refcnt == 0</code> (không còn ai trên đời trỏ vào quả bóng đó nữa): <strong>Bộ thu gom rác (Garbage Collector) của CPython lập tức giải phóng vùng nhớ đó trả về cho hệ điều hành!</strong></li>
        </ul>
        <h4>Đối tượng đặc biệt None (Singleton):</h4>
        <p>Trong Python chỉ tồn tại <strong>duy nhất một đối tượng <code>None</code></strong> trong suốt thời gian chương trình chạy (nằm ở một địa chỉ RAM cố định). Nó thuộc kiểu <code>NoneType</code>, dùng để biểu thị "không có giá trị" hoặc "chưa khởi tạo". Vì chỉ có một <code>None</code> duy nhất, nên so sánh với <code>None</code> ta luôn dùng toán tử <code>is</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Quan sát bộ đếm tham chiếu qua module sys',
          code: `import sys

# Tạo một đối tượng danh sách mới hoàn toàn
ds_goc = [10, 20, 30]

# Xem số lượng tham chiếu trỏ vào danh sách này
# Lưu ý: sys.getrefcount() tự nó tạo thêm 1 tham chiếu tạm thời khi được gọi
print("Số tham chiếu ban đầu:", sys.getrefcount(ds_goc))

# Gắn thêm một thẻ tên mới
nhan_phu = ds_goc
print("Sau khi gắn thêm nhan_phu:", sys.getrefcount(ds_goc))

# Xóa nhãn phụ bằng lệnh del
del nhan_phu
print("Sau khi del nhan_phu:", sys.getrefcount(ds_goc))

# Kiểm tra đối tượng duy nhất None
a = None
b = None
print("\\nNone là đối tượng duy nhất (Singleton):")
print("id của a:", id(a))
print("id của b:", id(b))
print("a is b:", a is b)`,
          output: `Số tham chiếu ban đầu: 2
Sau khi gắn thêm nhan_phu: 3
Sau khi del nhan_phu: 2

None là đối tượng duy nhất (Singleton):
id của a: 140728491823904
id của b: 140728491823904
a is b: True`,
          annotations: [
            { line: 8, text: 'getrefcount() trả về 2 vì biến ds_goc là 1, và tham số truyền vào hàm là 2.' },
            { line: 12, text: 'Khi gán nhan_phu = ds_goc, refcount tăng lên 3.' },
            { line: 16, text: 'del nhan_phu gỡ bỏ nhãn tên, refcount giảm về 2.' },
            { line: 24, text: 'Mọi biến trỏ vào None đều có cùng một id() duy nhất.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy sao chép danh sách bằng phép gán b = a',
        content: 'Nếu bạn muốn tạo một bản sao độc lập của một list để sửa mà không làm hỏng list cũ, TUYỆT ĐỐI KHÔNG DÙNG `b = a`. Hãy dùng cú pháp sao chép: `b = a.copy()` hoặc `b = list(a)` hoặc cắt lát `b = a[:]`. Lúc này `b` sẽ trỏ vào một đối tượng hoàn toàn mới.'
      },
      {
        title: 'Dùng toán tử "==" để kiểm tra None',
        content: 'Viết `if x == None:` là một thói quen xấu. Một lớp tùy biến có thể tự định nghĩa phương thức `__eq__` để trả về `True` ngay cả khi nó không phải là `None`. Hãy luôn luôn dùng `if x is None:` hoặc `if x is not None:` theo chuẩn PEP 8.'
      }
    ],
    tips: [
      {
        title: 'Mô hình tư duy "Vẽ mũi tên trên giấy"',
        content: 'Bất cứ khi nào bạn gặp một lỗi logic kỳ lạ khi làm việc với list, dict hay hàm, hãy lấy một tờ giấy ra: vẽ tên biến ở cột trái, vẽ hình tròn đối tượng ở cột phải, và vẽ mũi tên nối giữa chúng. 99% lỗi sai về tham chiếu sẽ lộ diện ngay lập tức trước mắt bạn!'
      }
    ],
    deepDive: {
      title: 'CPython: Struct PyObject nằm dưới ngôn ngữ C trông như thế nào?',
      content: `
        <p>Bên trong mã nguồn C của CPython, mọi đối tượng Python thực chất là một con trỏ tới một struct ngôn ngữ C có định nghĩa tối thiểu như sau:</p>
        <pre class="code-pre"><code>typedef struct _object {
    _PyObject_HEAD_EXTRA // Con trỏ danh sách liên kết kép (khi debug)
    Py_ssize_t ob_refcnt; // BỘ ĐẾM THAM CHIẾU (Reference count)
    PyTypeObject *ob_type; // CON TRỎ TỚI KIỂU DỮ LIỆU (Type pointer)
} PyObject;</code></pre>
        <p>Khi bạn gọi <code>id(obj)</code>, CPython chỉ đơn giản ép kiểu con trỏ <code>(uintptr_t)obj</code> thành số nguyên và trả về cho bạn!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Dự đoán giá trị của biến qua các phép gán liên tiếp',
      problem: 'Cho đoạn code sau:\\n```python\\na = [1, 2]\\nb = a\\na = [3, 4]\\n```\\nHỏi: Biến `b` lúc này có giá trị là gì? Giải thích cặn kẽ dựa trên mô hình thẻ tên và mũi tên.',
      hint: 'Hãy chú ý dòng lệnh thứ 3: a = [3, 4] là tạo một đối tượng MỚI và đổi mũi tên của a, hay là sửa đổi đối tượng cũ?',
      solutionCode: `a = [1, 2]
b = a
a = [3, 4]

print("Giá trị của b:", b)
print("a và b có cùng trỏ 1 đối tượng không?", a is b)`,
      solutionOutput: `Giá trị của b: [1, 2]
a và b có cùng trỏ 1 đối tượng không? False`,
      explanation: 'Dòng 1: Tạo đối tượng [1, 2], gắn nhãn a. Dòng 2: Gắn thêm nhãn b vào [1, 2]. Dòng 3: Tạo ra một đối tượng HOÀN TOÀN MỚI là [3, 4], và gỡ nhãn a khỏi [1, 2] để buộc sang [3, 4]. Nhãn b vẫn đang buộc nguyên vẹn vào đối tượng cũ [1, 2]! Do đó b vẫn là [1, 2].',
      annotations: [
        { line: 2, text: 'b trỏ cùng đối tượng [1, 2] với a.' },
        { line: 3, text: 'Phép gán a = [3, 4] không sửa đổi đối tượng cũ mà tạo đối tượng mới.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Tạo bản sao độc lập (Shallow Copy) để tránh Aliasing',
      problem: 'Cho một danh sách các món hàng trong giỏ: `cart = ["Táo", "Cam"]`. Hãy tạo ra một biến `backup_cart` sao cho khi ta thêm món `"Xoài"` vào `cart`, danh sách `backup_cart` vẫn giữ nguyên vẹn 2 món ban đầu.',
      hint: 'Dùng phương thức .copy() hoặc hàm dựng list().',
      solutionCode: `cart = ["Táo", "Cam"]

# Tạo bản sao độc lập bằng phương thức .copy()
backup_cart = cart.copy()

# Thêm món mới vào giỏ chính
cart.append("Xoài")

print("cart hiện tại:", cart)
print("backup_cart giữ nguyên:", backup_cart)
print("Hai giỏ có khác địa chỉ id không?", cart is not backup_cart)`,
      solutionOutput: `cart hiện tại: ['Táo', 'Cam', 'Xoài']
backup_cart giữ nguyên: ['Táo', 'Cam']
Hai giỏ có khác địa chỉ id không? True`,
      explanation: 'Phương thức cart.copy() tạo ra một đối tượng list mới trong RAM và sao chép các con trỏ phần tử sang. Vì cart và backup_cart là hai đối tượng riêng biệt, thao tác append trên cart không ảnh hưởng tới backup_cart.',
      annotations: [
        { line: 4, text: 'cart.copy() trả về một đối tượng mới hoàn toàn với id() mới.' },
        { line: 7, text: 'append chỉ sửa đổi đối tượng cart.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Trong Python, bản chất của câu lệnh gán `x = [10, 20]` là gì?',
      options: [
        'Tạo một ô nhớ có tên là x, sau đó ghi trực tiếp dữ liệu [10, 20] vào trong ô nhớ đó.',
        'Tạo ra một đối tượng danh sách [10, 20] trong bộ nhớ Heap, rồi gắn nhãn tên "x" trỏ tới đối tượng đó.',
        'Sao chép dữ liệu từ CPU vào thanh ghi x.',
        'Khai báo biến x có kiểu dữ liệu là số nguyên.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, biến không phải là hộp chứa dữ liệu mà là nhãn tên (name tag) tham chiếu tới đối tượng nằm trên bộ nhớ Heap.'
    },
    {
      question: 'Cho hai biến: `s1 = "hello world"` và `s2 = "hello world"`. Biểu thức `s1 == s2` và `s1 is s2` kiểm tra điều gì?',
      options: [
        'Cả hai đều kiểm tra xem s1 và s2 có cùng địa chỉ RAM không.',
        's1 == s2 kiểm tra hai chuỗi có cùng độ dài không; s1 is s2 kiểm tra có cùng ký tự đầu không.',
        's1 == s2 kiểm tra xem hai chuỗi có cùng giá trị nội dung không; s1 is s2 kiểm tra xem s1 và s2 có đang cùng trỏ vào ĐÚNG MỘT đối tượng trong bộ nhớ không.',
        's1 is s2 kiểm tra lỗi cú pháp, s1 == s2 kiểm tra giá trị.'
      ],
      correctIndex: 2,
      explanation: 'Toán tử == kiểm tra bình đẳng về mặt giá trị (value), còn toán tử is kiểm tra tính đồng nhất về danh tính (identity: id(s1) == id(s2)).'
    },
    {
      question: 'Điều gì thực sự xảy ra trong bộ nhớ CPython khi bạn chạy lệnh `del x`?',
      options: [
        'Đối tượng mà x trỏ tới bị xóa ngay lập tức khỏi RAM kể cả khi còn biến khác đang trỏ vào nó.',
        'Lệnh del chỉ xóa nhãn tên "x" khỏi không gian tên và giảm bộ đếm tham chiếu của đối tượng đi 1. Đối tượng chỉ bị xóa khi bộ đếm tham chiếu giảm về 0.',
        'Python sẽ khởi động lại trình thông dịch.',
        'Lệnh del biến đối tượng thành số 0.'
      ],
      correctIndex: 1,
      explanation: 'del chỉ xóa tên biến. Bộ thu gom rác của CPython quản lý đối tượng dựa trên Reference Counting; chừng nào refcount còn > 0 thì đối tượng vẫn tồn tại trong RAM.'
    }
  ],

  summary: [
    'Mọi thứ trong Python đều là đối tượng. Mỗi đối tượng có 3 thuộc tính: id (danh tính), type (kiểu), value (giá trị).',
    'Biến là NHÃN TÊN trỏ tới đối tượng, không phải chiếc hộp chứa dữ liệu. Phép gán "=" là gắn nhãn, không sao chép.',
    'Aliasing xảy ra khi nhiều tên cùng trỏ vào một đối tượng mutable, dẫn tới việc sửa qua tên này sẽ làm đổi góc nhìn từ tên khác.',
    'Phân biệt rõ: "==" so sánh giá trị nội dung, "is" so sánh danh tính cùng vùng nhớ. Luôn dùng "is None" thay vì "== None".',
    'Lệnh del chỉ gỡ bỏ nhãn tên; CPython tự động dọn dẹp vùng nhớ khi bộ đếm tham chiếu (refcount) giảm về 0.'
  ]
};
