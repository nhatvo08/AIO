export default {
  id: 'p0-04',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.4',
  title: 'Kiểu dữ liệu và tính bất biến (Immutable vs Mutable)',
  subtitle: 'Hai thế giới dữ liệu trong Python: Bản chất thay đổi tại chỗ vs tạo mới, tuple chứa list, shallow vs deep copy, và hashable',
  level: 'Cơ bản',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: 'immutability-viewer',

  objectives: [
    'Phân loại rõ ràng hai nhóm dữ liệu cốt lõi: Bất biến (Immutable) và Có thể thay đổi (Mutable).',
    'Hiểu bản chất vì sao tuple bất biến nhưng vẫn có thể chứa một list bên trong và list đó vẫn sửa được.',
    'Giải mã sự khác biệt sâu sắc của toán tử `a += b` giữa kiểu bất biến (tạo đối tượng mới) và kiểu danh sách (sửa tại chỗ in-place).',
    'Thành thạo phân biệt sao chép nông (Shallow Copy) và sao chép sâu (Deep Copy) qua module `copy`.',
    'Phá bỏ cạm bẫy tạo mảng hai chiều bằng phép nhân `[[0] * 3] * 3`.',
    'Hiểu mối liên hệ giữa tính bất biến và tính khả băm (`hashable`): vì sao khóa của `dict` và phần tử của `set` bắt buộc phải bất biến.'
  ],

  intuition: {
    title: 'Bức tượng đồng vĩnh cửu và Khối đất nặn linh hoạt',
    metaphor: 'Hãy hình dung các kiểu dữ liệu trong Python thuộc về hai thế giới vật chất đối lập nhau: Nhóm Bất biến (Immutable như int, str, tuple) giống như những bức tượng đúc bằng đồng. Một khi người nghệ sĩ đã đúc xong số 5 hay chữ "Python", bức tượng đó được niêm phong vĩnh viễn trong tủ kính — bạn không thể gọt bớt một nét hay dát thêm một ly. Nếu bạn muốn số 6, Python phải đúc một bức tượng số 6 hoàn toàn mới! Ngược lại, nhóm Có thể thay đổi (Mutable như list, dict, set) giống như một khối đất nặn trên bàn: bạn có thể nhét thêm bi vào (append), nặn dài ra, bớt đất đi (pop) mà khối đất nặn đó vẫn nằm nguyên tại chỗ cũ trên mặt bàn.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">HAI THẾ GIỚI DỮ LIỆU TRONG PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--py-gold);font-size:0.95rem;">BẤT BIẾN (IMMUTABLE)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0 8px;">Không thể sửa tại chỗ, muốn đổi phải tạo mới</div>
            <ul style="margin:0;padding-left:18px;font-size:0.8rem;color:var(--text-primary);line-height:1.6;">
              <li><code>int</code>, <code>float</code>, <code>complex</code></li>
              <li><code>bool</code> (True, False)</li>
              <li><code>str</code> (Chuỗi văn bản)</li>
              <li><code>bytes</code> (Dãy byte)</li>
              <li><code>tuple</code> (Bộ cố định)</li>
              <li><code>frozenset</code> (Tập hợp đóng băng)</li>
            </ul>
          </div>
          <div style="padding:12px;border:2px solid var(--success);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--success);font-size:0.95rem;">THAY ĐỔI ĐƯỢC (MUTABLE)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0 8px;">Sửa trực tiếp trên vùng nhớ RAM hiện tại</div>
            <ul style="margin:0;padding-left:18px;font-size:0.8rem;color:var(--text-primary);line-height:1.6;">
              <li><code>list</code> (Danh sách linh hoạt)</li>
              <li><code>dict</code> (Từ điển khóa - giá trị)</li>
              <li><code>set</code> (Tập hợp phần tử duy nhất)</li>
              <li><code>bytearray</code> (Mảng byte sửa được)</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Kiểu dữ liệu thuộc về Đối tượng, không thuộc về Tên biến',
      badge: 'Nền tảng',
      content: `
        <p>Như ta đã học ở bài 0.3: trong Python, <strong>tên biến không có kiểu dữ liệu</strong>. Kiểu dữ liệu gắn liền với chính thực thể đối tượng đang nằm trong bộ nhớ RAM.</p>
        <ul>
          <li>Hàm <code>type(obj)</code>: Cho biết chính xác lớp (class) đã sinh ra đối tượng đó.</li>
          <li>Hàm <code>isinstance(obj, ClassInfo)</code>: Kiểm tra xem đối tượng có thuộc về lớp đó hoặc các lớp con kế thừa hay không. Đây là cách kiểm tra kiểu chuẩn mực và an toàn nhất trong lập trình hướng đối tượng.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra kiểu dữ liệu bằng type() và isinstance()',
          code: `# Kiểm tra kiểu dữ liệu với isinstance()
so = 42
chuoi = "Python 3.14"

print("type(so):", type(so))
print("so có phải int không?:", isinstance(so, int))
print("so có phải float không?:", isinstance(so, float))

# isinstance() hỗ trợ kiểm tra nhiều kiểu cùng lúc qua tuple
print("so có thuộc (int, float) không?:", isinstance(so, (int, float)))

# bool thực chất là một lớp con của int!
print("True có phải là bool không?:", isinstance(True, bool))
print("True có phải là int không?:", isinstance(True, int))`,
          output: `type(so): <class 'int'>
so có phải int không?: True
so có phải float không?: False
so có thuộc (int, float) không?: True
True có phải là bool không?: True
True có phải là int không?: True`,
          annotations: [
            { line: 6, text: 'isinstance() trả về giá trị boolean True hoặc False.' },
            { line: 10, text: 'Truyền tuple (int, float) để kiểm tra: đúng nếu đối tượng thuộc một trong các kiểu đó.' },
            { line: 14, text: 'Một sự thật thú vị: bool kế thừa trực tiếp từ int, True chính là 1 và False là 0 (sẽ phân tích sâu ở Phần 1).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Điều gì xảy ra khi sửa đổi đối tượng? Hệ quả của a += b',
      badge: 'Bản chất Bộ nhớ',
      content: `
        <p>Để thấy rõ sự khác biệt sống còn giữa Immutable và Mutable, hãy quan sát toán tử gán tăng cường <code>a += b</code>:</p>
        <ol>
          <li><strong>Với kiểu Bất biến (như <code>int</code>, <code>str</code>):</strong> Vì đối tượng không thể sửa tại chỗ, biểu thức <code>a += 1</code> thực chất là: lấy giá trị cũ cộng 1, <strong>tạo ra một đối tượng số mới hoàn toàn</strong>, rồi đổi nhãn <code>a</code> sang trỏ vào đối tượng mới đó. Địa chỉ <code>id(a)</code> bị thay đổi!</li>
          <li><strong>Với kiểu Có thể thay đổi (như <code>list</code>):</strong> Khi viết <code>ds += [4]</code>, CPython gọi phương thức <code>__iadd__()</code> để <strong>chèn phần tử trực tiếp vào cuối danh sách hiện tại</strong>. Hoàn toàn KHÔNG tạo danh sách mới, địa chỉ <code>id(ds)</code> được giữ nguyên vẹn 100%!</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'So sánh id() trước và sau phép += giữa int và list',
          code: `# 1. Phép += với kiểu BẤT BIẾN (int)
x = 100
id_truoc_int = id(x)
x += 1
id_sau_int = id(x)

print("=== KIỂU INT (IMMUTABLE) ===")
print("id trước:", id_truoc_int)
print("id sau:  ", id_sau_int)
print("id có đổi không?:", id_truoc_int != id_sau_int)

# 2. Phép += với kiểu MUTABLE (list)
ds = [1, 2, 3]
id_truoc_list = id(ds)
ds += [4]
id_sau_list = id(ds)

print("\\n=== KIỂU LIST (MUTABLE) ===")
print("id trước:", id_truoc_list)
print("id sau:  ", id_sau_list)
print("id có giữ nguyên không?:", id_truoc_list == id_sau_list)`,
          output: `=== KIỂU INT (IMMUTABLE) ===
id trước: 140728492038480
id sau:   140728492038512
id có đổi không?: True

=== KIỂU LIST (MUTABLE) ===
id trước: 2147829482112
id sau:   2147829482112
id có giữ nguyên không?: True`,
          annotations: [
            { line: 4, text: 'Phép x += 1 tạo ra một đối tượng số 101 mới tại địa chỉ mới.' },
            { line: 15, text: 'Phép ds += [4] sửa tại chỗ trên cùng một vùng nhớ danh sách cũ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Nghịch lý Tuple — Bất biến nhưng chứa phần tử Mutable?',
      badge: 'Đào sâu Cấu trúc',
      content: `
        <p>Hãy xem xét một câu hỏi hóc búa: <em>"Tuple là kiểu bất biến, vậy ta có thể sửa đổi nội dung bên trong một tuple không?"</em></p>
        <p>Câu trả lời nằm ở bản chất cấu trúc: <strong>Một tuple bất biến nghĩa là dãy các CON TRỎ mà nó chứa là bất biến</strong>. Bạn không thể thêm bớt con trỏ, cũng không thể đổi con trỏ sang ô nhớ khác.</p>
        <p>Tuy nhiên, nếu một trong các con trỏ đó đang trỏ tới một <strong>đối tượng có thể thay đổi (như một list)</strong>, thì bản thân chiếc list đó vẫn có thể bị nặn sửa tự do! Tuple không bảo vệ được sự bất biến của những vật thể mà nó trỏ tới.</p>
      `,
      codeExamples: [
        {
          title: 'Sửa phần tử list nằm bên trong một tuple',
          code: `# Tạo một tuple chứa số 1 và một list [2, 3]
t = (1, [2, 3])
print("Tuple ban đầu:", t)
print("id của tuple:", hex(id(t)))
print("id của list bên trong:", hex(id(t[1])))

# Cố tình đổi con trỏ của tuple -> Báo lỗi TypeError ngay!
try:
    t[0] = 99
except TypeError as err:
    print("\\nKhông thể đổi con trỏ của tuple:", err)

# Nhưng sửa nội dung của list bên trong -> Hoàn toàn hợp lệ!
t[1].append(4)
print("\\nSau khi append vào list bên trong:")
print("Tuple hiện tại:", t)
print("id của tuple vẫn nguyên vẹn:", hex(id(t)))`,
          output: `Tuple ban đầu: (1, [2, 3])
id của tuple: 0x1f40a1c1a00
id của list bên trong: 0x1f40a1b2a80

Không thể đổi con trỏ của tuple: 'tuple' object does not support item assignment

Sau khi append vào list bên trong:
Tuple hiện tại: (1, [2, 3, 4])
id của tuple vẫn nguyên vẹn: 0x1f40a1c1a00`,
          annotations: [
            { line: 2, text: 't[0] trỏ tới số 1, t[1] trỏ tới list [2, 3].' },
            { line: 9, text: 'Gán t[0] = 99 bị chặn vì tuple không cho phép thay đổi con trỏ.' },
            { line: 15, text: 't[1].append(4) không đổi con trỏ của tuple, mà chỉ sửa đối tượng list mà con trỏ đó chỉ tới!' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Sao chép Nông vs Sao chép Sâu & Cạm bẫy [[0]*3]*3',
      badge: 'Cạm bẫy Thực tế',
      content: `
        <p>Khi làm việc với các cấu trúc lồng nhau (danh sách chứa danh sách), có hai khái niệm sao chép bạn bắt buộc phải phân biệt:</p>
        <ul>
          <li><strong>Sao chép nông (Shallow Copy - <code>list.copy()</code>, <code>a[:]</code>):</strong> Tạo ra một vỏ danh sách mới, nhưng các phần tử bên trong vẫn là <em>các con trỏ trỏ tới cùng đối tượng cũ</em>. Nếu phần tử con là list, sửa phần tử con sẽ làm hỏng bản sao!</li>
          <li><strong>Sao chép sâu (Deep Copy - <code>copy.deepcopy()</code>):</strong> Đệ quy sao chép toàn bộ từ vỏ đến ruột, tạo ra một bản sao độc lập 100% không còn dính dáng gì tới dữ liệu gốc.</li>
        </ul>
        <h4>Cạm bẫy kinh điển: Tạo ma trận bằng <code>[[0] * 3] * 3</code></h4>
        <p>Phép nhân <code>[danh_sách] * 3</code> KHÔNG tạo ra 3 danh sách mới. Nó tạo ra một danh sách chứa <strong>3 con trỏ cùng trỏ vào ĐÚNG 1 DANH SÁCH DUY NHẤT</strong>! Khi bạn sửa một ô, cả 3 hàng đều bị sửa theo.</p>
      `,
      codeExamples: [
        {
          title: 'Vạch trần cạm bẫy [[0] * 3] * 3 và cách làm đúng',
          code: `import copy

# CẠM BẪY SAI LẦM:
ma_tran_loi = [[0] * 3] * 3
print("Ma trận ban đầu:", ma_tran_loi)

# Thử sửa ô ở hàng 0, cột 0 thành số 9
ma_tran_loi[0][0] = 9
print("Toàn bộ 3 hàng đều bị biến thành 9!:", ma_tran_loi)
print("Lý do: Cả 3 hàng có cùng id:", id(ma_tran_loi[0]), id(ma_tran_loi[1]), id(ma_tran_loi[2]))

# CÁCH LÀM ĐÚNG: Dùng List Comprehension để tạo từng hàng độc lập
print("\\n=== CÁCH TẠO MA TRẬN ĐÚNG ===")
ma_tran_dung = [[0] * 3 for _ in range(3)]
ma_tran_dung[0][0] = 9
print("Chỉ hàng 0 bị đổi:", ma_tran_dung)

# SO SÁNH SHALLOW VS DEEP COPY
goc = [[1, 2], [3, 4]]
shallow = goc.copy()
deep = copy.deepcopy(goc)

goc[0].append(999)
print("\\nSau khi sửa goc[0]:")
print("Shallow copy bị ảnh hưởng:", shallow)
print("Deep copy an toàn tuyệt đối:", deep)`,
          output: `Ma trận ban đầu: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
Toàn bộ 3 hàng đều bị biến thành 9!: [[9, 0, 0], [9, 0, 0], [9, 0, 0]]
Lý do: Cả 3 hàng có cùng id: 2147829482400 2147829482400 2147829482400

=== CÁCH TẠO MA TRẬN ĐÚNG ===
Chỉ hàng 0 bị đổi: [[9, 0, 0], [0, 0, 0], [0, 0, 0]]

Sau khi sửa goc[0]:
Shallow copy bị ảnh hưởng: [[1, 2, 999], [3, 4]]
Deep copy an toàn tuyệt đối: [[1, 2], [3, 4]]`,
          annotations: [
            { line: 4, text: 'Phép nhân sao chép con trỏ tham chiếu, tạo ra 3 bí danh cùng trỏ 1 hàng.' },
            { line: 13, text: 'List comprehension chạy vòng lặp 3 lần, mỗi lần tạo ra một list [0, 0, 0] mới tinh với id riêng biệt.' },
            { line: 20, text: 'copy.deepcopy() đệ quy nhân bản mọi tầng dữ liệu lồng nhau.' }
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      title: 'Lớp 5: Mối liên hệ giữa Tính Bất biến và Khả băm (Hashable)',
      badge: 'Kiến trúc Từ điển',
      content: `
        <p>Tại sao bạn có thể dùng một chuỗi <code>"user_id"</code> hoặc một tuple <code>(10, 20)</code> làm khóa (key) của <code>dict</code>, nhưng nếu dùng <code>list</code> làm khóa thì Python báo lỗi <code>TypeError: unhashable type: 'list'</code> ngay lập tức?</p>
        <p>Để tìm kiếm phần tử trong <code>dict</code> và <code>set</code> với tốc độ cực nhanh $O(1)$, Python dùng <strong>Bảng băm (Hash Table)</strong>. Nó chuyển giá trị của khóa qua hàm <code>hash()</code> để tính ra vị trí ô nhớ tương ứng.</p>
        <ul>
          <li>Một đối tượng được gọi là <strong>Hashable (Khả băm)</strong> nếu mã băm của nó <strong>không bao giờ thay đổi</strong> trong suốt vòng đời của nó.</li>
          <li>Nếu cho phép một <code>list</code> làm khóa: bạn thêm một phần tử vào list, nội dung đổi thì mã băm phải đổi, khiến <code>dict</code> không tài nào tìm lại được dữ liệu cũ đã cất ở đâu!</li>
          <li><strong>Quy tắc vàng:</strong> Khóa của <code>dict</code> và phần tử của <code>set</code> <strong>bắt buộc phải là đối tượng BẤT BIẾN (Immutable)</strong>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khám phá hàm hash() và lỗi unhashable với list',
          code: `# Các đối tượng bất biến đều khả băm (hashable)
print("hash của số nguyên:", hash(42))
print("hash của chuỗi:", hash("Python"))
print("hash của tuple:", hash((1, 2, 3)))

# Dùng tuple làm khóa cho dict (Tọa độ bản đồ)
ban_do = {
    (21.0285, 105.8542): "Hà Nội",
    (10.8231, 106.6297): "TP. Hồ Chí Minh"
}
print("\\nTra cứu theo tọa độ tuple:", ban_do[(21.0285, 105.8542)])

# Thử dùng list làm khóa cho dict -> Lỗi ngay!
try:
    dict_loi = {[1, 2]: "Giá trị"}
except TypeError as err:
    print("\\nBị từ chối vì list là mutable:", err)`,
          output: `hash của số nguyên: 42
hash của chuỗi: -2847291847192849182
hash của tuple: 529344067295497451

Tra cứu theo tọa độ tuple: Hà Nội

Bị từ chối vì list là mutable: unhashable type: 'list'`,
          annotations: [
            { line: 4, text: 'Hàm hash() trả về một số nguyên cố định đại diện cho dữ liệu.' },
            { line: 7, text: 'Tuple (lat, long) bất biến nên hoàn toàn hợp lệ để làm khóa từ điển.' },
            { line: 17, text: 'Python từ chối list làm key để bảo vệ tính toàn vẹn của bảng băm.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Hiểu lầm tuple bất biến là mọi thứ bên trong nó đều bất biến',
        content: 'Hãy nhớ: `tuple` chỉ đảm bảo các con trỏ của nó không đổi. Nếu nó chứa một phần tử mutable (như list), list đó vẫn có thể bị biến đổi, và điều này cũng khiến cho chiếc tuple đó KHÔNG THỂ BĂM ĐƯỢC (`TypeError: unhashable type: \'list\'` khi cố tính `hash(t)`).'
      },
      {
        title: 'Tạo mảng 2 chiều bằng cú pháp [[None] * n] * m',
        content: 'Đây là lỗi phổ biến nhất trong các bài phỏng vấn thuật toán. Hãy luôn luôn dùng List Comprehension: `[[0 for _ in range(n)] for _ in range(m)]` để đảm bảo mỗi hàng là một đối tượng độc lập.'
      }
    ],
    tips: [
      {
        title: 'Cần một tập hợp bất biến? Hãy dùng frozenset',
        content: 'Kiểu `set` thông thường là mutable (thêm bớt được phần tử) nên không thể đưa vào làm phần tử của set khác hay làm key của dict. Khi cần một tập hợp bất biến, hãy dùng `frozenset([1, 2, 3])`.'
      }
    ],
    deepDive: {
      title: 'Bảo mật CPython: Thuật toán ngẫu nhiên hóa hàm băm (PYTHONHASHSEED)',
      content: `
        <p>Bạn có để ý thấy mỗi lần khởi động lại Python, hàm <code>hash("Python")</code> lại cho ra một con số khác nhau? Đây không phải là lỗi mà là một tính năng bảo mật tuyệt vời của CPython từ phiên bản 3.3 (chống tấn công Từ chối Dịch vụ băm - Hash DoS Attack).</p>
        <p>Mỗi khi tiến trình Python khởi động, nó tự sinh một khóa bí mật ngẫu nhiên (salt) để tính toán băm chuỗi. Nhờ vậy kẻ tấn công không thể cố tình gửi các chuỗi có cùng mã băm để làm nghẽn bảng băm máy chủ.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Phân loại các kiểu dữ liệu vào nhóm Immutable và Mutable',
      problem: 'Hãy viết một hàm `kiem_tra_kha_bam(obj)` nhận vào một đối tượng bất kỳ. Hàm sử dụng khối lệnh `try...except` để kiểm tra xem đối tượng có tính khả băm (hashable) hay không và in ra kết luận.',
      hint: 'Gọi hàm hash(obj), bắt ngoại lệ TypeError nếu không thể băm.',
      solutionCode: `def kiem_tra_kha_bam(obj):
    try:
        ma_bam = hash(obj)
        print(f"Đối tượng {repr(obj)} là KHẢ BĂM (Immutable/Hashable), hash = {ma_bam}")
    except TypeError:
        print(f"Đối tượng {repr(obj)} KHÔNG KHẢ BĂM (Mutable/Unhashable)")

kiem_tra_kha_bam(100)
kiem_tra_kha_bam("Xin chào")
kiem_tra_kha_bam((1, 2))
kiem_tra_kha_bam([1, 2])
kiem_tra_kha_bam({"a": 1})`,
      solutionOutput: `Đối tượng 100 là KHẢ BĂM (Immutable/Hashable), hash = 100
Đối tượng 'Xin chào' là KHẢ BĂM (Immutable/Hashable), hash = -39182948192849182
Đối tượng (1, 2) là KHẢ BĂM (Immutable/Hashable), hash = -3550055125485641917
Đối tượng [1, 2] KHÔNG KHẢ BĂM (Mutable/Unhashable)
Đối tượng {'a': 1} KHÔNG KHẢ BĂM (Mutable/Unhashable)`,
      explanation: 'Các kiểu dữ liệu mutable như list và dict không có phương thức __hash__ hợp lệ, ném ra lỗi TypeError khi truyền vào hàm hash().',
      annotations: [
        { line: 2, text: 'Thử tính mã băm bằng hàm hash().' },
        { line: 5, text: 'Bắt lỗi TypeError chỉ khi đối tượng không khả băm.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Bảo vệ dữ liệu lồng nhau bằng Deep Copy',
      problem: 'Một hồ sơ sinh viên gồm thông tin cá nhân và bảng điểm: `sv = {"ten": "An", "diem": [8, 9]}`. Hãy sao chép hồ sơ này sang `sv_moi`, đổi tên thành `"Bình"` và thêm điểm `10` vào danh sách điểm của `sv_moi`. Đảm bảo hồ sơ gốc của `"An"` không bị thay đổi bất kỳ thông tin nào.',
      hint: 'Nếu chỉ dùng sv.copy(), danh sách diem bên trong vẫn bị dùng chung. Cần dùng copy.deepcopy().',
      solutionCode: `import copy

sv = {"ten": "An", "diem": [8, 9]}

# Dùng deepcopy để sao chép độc lập toàn diện cả list bên trong
sv_moi = copy.deepcopy(sv)

# Cập nhật thông tin sinh viên mới
sv_moi["ten"] = "Bình"
sv_moi["diem"].append(10)

print("Hồ sơ sinh viên gốc:", sv)
print("Hồ sơ sinh viên mới:", sv_moi)`,
      solutionOutput: `Hồ sơ sinh viên gốc: {'ten': 'An', 'diem': [8, 9]}
Hồ sơ sinh viên mới: {'ten': 'Bình', 'diem': [8, 9, 10]}`,
      explanation: 'Nếu dùng sv.copy(), trường "diem" chỉ sao chép nông tham chiếu list, dẫn tới việc append điểm của Bình sẽ làm đổi điểm của An. deepcopy() giải quyết triệt để vấn đề này.',
      annotations: [
        { line: 6, text: 'copy.deepcopy() tạo ra bản sao tách rời cả dict bên ngoài lẫn list bên trong.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Nhóm nào sau đây CHỈ CHỨA các kiểu dữ liệu Bất biến (Immutable) trong Python?',
      options: [
        'int, float, list, str',
        'int, str, tuple, bool, frozenset',
        'dict, set, list, bytearray',
        'str, list, tuple, dict'
      ],
      correctIndex: 1,
      explanation: 'int, str, tuple, bool, frozenset đều là kiểu bất biến, một khi tạo ra trong bộ nhớ thì giá trị của đối tượng không thể sửa đổi tại chỗ.'
    },
    {
      question: 'Cho biến `ds = [1, 2]`. Sau khi thực thi lệnh `ds += [3]`, điều gì xảy ra với đối tượng danh sách trong bộ nhớ?',
      options: [
        'CPython tạo ra một đối tượng danh sách mới tại địa chỉ RAM mới và chuyển ds sang trỏ vào đó.',
        'CPython chèn trực tiếp số 3 vào cuối đối tượng danh sách hiện tại, địa chỉ id(ds) được giữ nguyên.',
        'Chương trình báo lỗi TypeError vì list không hỗ trợ toán tử +=.',
        'Danh sách bị chuyển thành kiểu tuple.'
      ],
      correctIndex: 1,
      explanation: 'Với kiểu mutable như list, toán tử += gọi phương thức __iadd__ để mở rộng danh sách tại chỗ (in-place), không cấp phát đối tượng mới.'
    },
    {
      question: 'Tại sao Python không cho phép dùng kiểu `list` làm khóa (key) của một `dict`?',
      options: [
        'Vì list có thể chứa số lượng phần tử quá lớn làm đầy bộ nhớ.',
        'Vì list là kiểu có thể thay đổi (mutable), khiến mã băm hash() không thể đảm bảo cố định, làm phá hỏng cơ chế tra cứu của Bảng băm (Hash Table).',
        'Vì cú pháp dict chỉ cho phép khóa là chuỗi văn bản str.',
        'Vì list không có thứ tự các phần tử.'
      ],
      correctIndex: 1,
      explanation: 'Bảng băm đòi hỏi mã hash của khóa phải bất biến trong suốt vòng đời. Nếu list làm khóa và bị sửa đổi, dict sẽ không thể định vị lại ô nhớ chứa giá trị tương ứng.'
    }
  ],

  summary: [
    'Kiểu dữ liệu thuộc về đối tượng trong bộ nhớ, không thuộc về tên biến.',
    'Dữ liệu chia làm 2 nhóm: Bất biến (int, float, bool, str, tuple, frozenset) và Có thể thay đổi (list, dict, set).',
    'Toán tử "+=" tạo đối tượng mới với kiểu bất biến, nhưng sửa đổi tại chỗ (in-place) với kiểu danh sách.',
    'Tuple bất biến về con trỏ, nhưng nếu nó trỏ tới một list thì nội dung của list đó vẫn có thể bị sửa đổi.',
    'Shallow copy chỉ sao chép lớp vỏ con trỏ; hãy dùng copy.deepcopy() khi cấu trúc dữ liệu có nhiều tầng lồng nhau.',
    'Khóa của dict và phần tử của set bắt buộc phải bất biến (khả băm - hashable) để đảm bảo tốc độ tra cứu O(1).'
  ]
};
