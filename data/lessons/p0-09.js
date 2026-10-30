export default {
  id: 'p0-09',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.9',
  title: 'Hàm: Đối tượng hạng nhất, cơ chế truyền tham số và phạm vi LEGB',
  subtitle: 'def, *args/**kwargs, First-class Citizen, Pass-by-object-reference, bẫy default mutable argument, LEGB và Call Stack',
  level: 'Trung cấp',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ cú pháp định nghĩa hàm `def`, tham số vị trí, tham số từ khóa, giá trị mặc định, `*args` và `**kwargs`.',
    'Hiểu bản chất Hàm là Công dân hạng nhất (First-class Object): hàm cũng là đối tượng có thể gán cho biến, cất vào list, truyền làm tham số.',
    'Giải mã cách truyền đối số thực sự trong Python: Truyền tham chiếu đối tượng (Pass-by-object-reference / Pass-by-assignment).',
    'Mổ xẻ cạm bẫy kinh điển: Tham số mặc định mang kiểu có thể thay đổi (`def f(x=[])`) — vì sao nó bị dùng chung qua các lần gọi.',
    'Nắm vững quy tắc tìm kiếm phạm vi biến LEGB (Local, Enclosing, Global, Built-in), từ khóa `global` và `nonlocal`.',
    'Hiểu về Ngăn xếp lời gọi (Call Stack) và giới hạn độ sâu đệ quy qua `sys.getrecursionlimit()`.'
  ],

  intuition: {
    title: 'Hợp đồng lao động và Chiếc bảng ghi chú trong phòng',
    metaphor: 'Một hàm trong Python giống như một bản hợp đồng dịch vụ đóng gói: bạn đưa tài liệu đầu vào (tham số), hàm xử lý xong và ký gửi kết quả trả về bằng lệnh return. Nếu bạn không ghi rõ return cái gì, Python tự động ngầm định trả về một phong bì trống rỗng chứa đối tượng duy nhất None! Khi bạn truyền một danh sách vào hàm, bạn không photo một danh sách mới để đưa cho họ; bạn đưa cho họ đúng chiếc chìa khóa trỏ tới chiếc hộp dữ liệu ngoài phòng khách (Pass-by-object-reference). Nếu người đó lấy bút vẽ thêm vào danh sách, khi hàm kết thúc bạn quay về phòng khách vẫn thấy nét vẽ đó! Còn phạm vi LEGB giống như chiếc kính mở rộng tầm mắt: trước hết tìm đồ trong túi áo (Local), không thấy thì tìm trong phòng ngủ (Enclosing), không thấy thì tìm ngoài sân (Global), và cuối cùng là tra danh bạ của nhà nước (Built-in).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">QUY TẮC TÌM KIẾM PHẠM VI BIẾN (LEGB RULE)</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:500px;margin:0 auto;width:100%;">
          <div style="padding:8px;border:2px solid var(--accent-primary);border-radius:6px;background:var(--bg-surface);text-align:center;">
            <strong style="color:var(--accent-primary);">1. LOCAL (Cục bộ):</strong> Bên trong thân hàm hiện tại
          </div>
          <div style="text-align:center;color:var(--text-muted);font-size:0.8rem;">▼ Nếu không thấy, mở rộng ra:</div>
          <div style="padding:8px;border:2px solid var(--py-gold);border-radius:6px;background:var(--bg-surface);text-align:center;">
            <strong style="color:var(--py-gold);">2. ENCLOSING (Bao bọc):</strong> Hàm cha bên ngoài (nếu có hàm lồng nhau)
          </div>
          <div style="text-align:center;color:var(--text-muted);font-size:0.8rem;">▼ Nếu không thấy, mở rộng ra:</div>
          <div style="padding:8px;border:2px solid var(--success);border-radius:6px;background:var(--bg-surface);text-align:center;">
            <strong style="color:var(--success);">3. GLOBAL (Toàn cục):</strong> Cấp cao nhất của file module hiện tại
          </div>
          <div style="text-align:center;color:var(--text-muted);font-size:0.8rem;">▼ Nếu không thấy, mở rộng ra:</div>
          <div style="padding:8px;border:2px solid var(--danger);border-radius:6px;background:var(--bg-surface);text-align:center;">
            <strong style="color:var(--danger);">4. BUILT-IN (Tích hợp sẵn):</strong> Các hàm gốc như len(), print(), range()
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Cú pháp Hàm, Giá trị trả về và Bộ tham số *args, **kwargs',
      badge: 'Cú pháp Nền tảng',
      content: `
        <p>Hàm được định nghĩa bằng từ khóa <code>def</code>. Các đặc điểm quan trọng cần ghi nhớ:</p>
        <ul>
          <li><strong>Giá trị trả về mặc định:</strong> Mọi hàm trong Python luôn trả về một giá trị. Nếu trong hàm không có lệnh <code>return</code> nào, hoặc chỉ viết <code>return</code> trơ trọi, hàm sẽ tự động trả về <code>None</code>.</li>
          <li><strong>Tham số vị trí và tham số từ khóa:</strong> Bạn có thể gọi <code>ham(10, 20)</code> theo vị trí, hoặc <code>ham(b=20, a=10)</code> theo tên tham số.</li>
          <li><strong><code>*args</code> (Arbitrary Positional Arguments):</strong> Gom toàn bộ các đối số vị trí thừa thành một <strong><code>tuple</code></strong>.</li>
          <li><strong><code>**kwargs</code> (Arbitrary Keyword Arguments):</strong> Gom toàn bộ các đối số có tên thừa thành một <strong><code>dict</code></strong>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng linh hoạt *args và **kwargs trong hàm',
          code: `# Hàm nhận số lượng tham số bất kỳ
def tinh_tong_va_ghi_chu(*args, **kwargs):
    print("args gom thành tuple:", args)
    print("kwargs gom thành dict:", kwargs)
    
    tong = sum(args)
    don_vi = kwargs.get("don_vi", "VND")
    return f"{tong} {don_vi}"

ket_qua = tinh_tong_va_ghi_chu(10, 20, 30, don_vi="USD", nguoi_tao="An")
print("Kết quả:", ket_qua)

# Hàm không có return -> Trả về None
def khong_return():
    x = 1 + 1

print("Giá trị trả về của khong_return():", repr(khong_return()))`,
          output: `args gom thành tuple: (10, 20, 30)
kwargs gom thành dict: {'don_vi': 'USD', 'nguoi_tao': 'An'}
Kết quả: 60 USD
Giá trị trả về của khong_return(): None`,
          annotations: [
            { line: 2, text: '*args gom (10, 20, 30) thành tuple.' },
            { line: 3, text: '**kwargs gom don_vi="USD", nguoi_tao="An" thành dict.' },
            { line: 16, text: 'Mọi hàm không return đều trả về None.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Hàm là Đối tượng Hạng nhất (First-Class Object) & Lambda',
      badge: 'Lập trình Hàm',
      content: `
        <p>Trong nhiều ngôn ngữ, hàm chỉ là một khối mã thực thi cứng nhắc. Nhưng trong Python, <strong>Hàm là một đối tượng thực thụ</strong> (thuộc kiểu <code>function</code>):</p>
        <ul>
          <li>Bạn có thể gán hàm cho một biến khác (<code>f = print</code>).</li>
          <li>Bạn có thể nhét hàm vào trong danh sách list hoặc dict.</li>
          <li>Bạn có thể truyền hàm như một đối số cho hàm khác (Hàm bậc cao - Higher-Order Function, ví dụ như tham số <code>key=</code> của hàm <code>sorted()</code>).</li>
          <li><strong>Hàm vô danh (Lambda):</strong> Cú pháp tạo hàm nhỏ gọn trên 1 dòng duy nhất: <code>lambda tham_so: biểu_thức</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Xem hàm như một biến và sử dụng lambda',
          code: `# 1. Gán hàm cho một biến mới
in_dep = print
in_dep("Xin chào từ biến in_dep!")

# 2. Truyền hàm vào làm tham số sắp xếp (sorted)
danh_sach = [("An", 22), ("Bình", 19), ("Cường", 25)]

# Sắp xếp học sinh theo tuổi (phần tử thứ 2 của tuple) bằng lambda
ds_theo_tuoi = sorted(danh_sach, key=lambda hoc_sinh: hoc_sinh[1])
print("\\nSắp xếp theo tuổi tăng dần:", ds_theo_tuoi)

# 3. Hàm cất trong từ điển (Dispatch Table)
phep_tinh = {
    "cong": lambda a, b: a + b,
    "nhan": lambda a, b: a * b
}
print("Tính nhẩm qua dict:", phep_tinh["nhan"](5, 6))`,
          output: `Xin chào từ biến in_dep!

Sắp xếp theo tuổi tăng dần: [('Bình', 19), ('An', 22), ('Cường', 25)]
Tính nhẩm qua dict: 30`,
          annotations: [
            { line: 2, text: 'in_dep trỏ cùng đối tượng hàm với print trong RAM.' },
            { line: 9, text: 'lambda hoc_sinh: hoc_sinh[1] là hàm nhận tuple và trả về tuổi.' },
            { line: 17, text: 'Mô hình Dispatch Table dùng hàm trong dict thay thế cho câu lệnh switch/case.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Cơ chế Truyền tham số: Pass-by-Object-Reference & Bẫy Default Mutable',
      badge: 'Bản chất Sâu sắc',
      content: `
        <p>Python truyền tham số theo cơ chế: <strong>Pass-by-object-reference (Truyền tham chiếu tới đối tượng)</strong> hay còn gọi là <em>Pass-by-assignment</em>.</p>
        <ul>
          <li>Khi gọi <code>f(x)</code>: Tham số trong hàm được <strong>buộc cùng một nhãn tên vào đúng đối tượng mà <code>x</code> đang trỏ tới</strong>.</li>
          <li>Nếu bạn truyền một đối tượng <em>Mutable</em> (như <code>list</code>) và dùng phương thức sửa tại chỗ (như <code>.append()</code>), dữ liệu bên ngoài hàm <strong>chắc chắn sẽ bị thay đổi theo</strong>!</li>
        </ul>
        <h4>Cạm bẫy nguy hiểm nhất: Tham số mặc định Mutable <code>def f(ds=[])</code></h4>
        <p>Trong Python, <strong>giá trị mặc định của hàm được tính toán và tạo ra ĐÚNG MỘT LẦN DUY NHẤT khi hàm được định nghĩa (lúc nạp file code)</strong>, chứ không phải mỗi lần hàm được gọi! Chiếc list <code>[]</code> đó tồn tại xuyên suốt vòng đời chương trình và bị dùng chung qua tất cả các lời gọi hàm.</p>
      `,
      codeExamples: [
        {
          title: 'Vạch trần cạm bẫy def f(ds=[]) và cách khắc phục chuẩn mực',
          code: `# CẠM BẪY NGUY HIỂM:
def them_phan_tu_loi(item, danh_sach=[]):
    danh_sach.append(item)
    return danh_sach

print("Lần gọi 1:", them_phan_tu_loi("A"))
print("Lần gọi 2:", them_phan_tu_loi("B"))  # Bất ngờ: ra ['A', 'B']!
print("Lần gọi 3:", them_phan_tu_loi("C"))  # Biến thành ['A', 'B', 'C']!

# CÁCH KHẮC PHỤC CHUẨN PEP 8: Dùng None làm giá trị mặc định
def them_phan_tu_dung(item, danh_sach=None):
    if danh_sach is None:
        danh_sach = []  # Mỗi lần gọi tạo một list mới tinh trong thân hàm
    danh_sach.append(item)
    return danh_sach

print("\\n=== CÁCH LÀM ĐÚNG VỚI NONE ===")
print("Lần gọi 1:", them_phan_tu_dung("A"))
print("Lần gọi 2:", them_phan_tu_dung("B"))
print("Lần gọi 3:", them_phan_tu_dung("C"))`,
          output: `Lần gọi 1: ['A']
Lần gọi 2: ['A', 'B']
Lần gọi 3: ['A', 'B', 'C']

=== CÁCH LÀM ĐÚNG VỚI NONE ===
Lần gọi 1: ['A']
Lần gọi 2: ['B']
Lần gọi 3: ['C']`,
          annotations: [
            { line: 2, text: 'danh_sach=[] được tạo một lần duy nhất khi CPython đọc dòng def.' },
            { line: 7, text: 'Lần gọi 2 vẫn dùng lại chính chiếc danh_sach cũ từ lần gọi 1!' },
            { line: 12, text: 'Quy tắc vàng: Luôn dùng default=None cho các tham số kiểu mutable (list, dict).' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Phạm vi biến LEGB, global, nonlocal và Đệ quy',
      badge: 'Phạm vi & Ngăn xếp',
      content: `
        <p>Khi bạn gọi một biến <code>x</code> trong hàm, CPython tìm kiếm theo thứ tự <strong>L ➔ E ➔ G ➔ B</strong>:</p>
        <ol>
          <li><strong>Local:</strong> Tìm trong hàm hiện tại.</li>
          <li><strong>Enclosing:</strong> Tìm trong các hàm cha bao ngoài (hàm lồng nhau). Dùng từ khóa <code>nonlocal</code> để sửa biến của hàm cha.</li>
          <li><strong>Global:</strong> Tìm ở cấp cao nhất của file module. Dùng từ khóa <code>global</code> nếu muốn gán lại biến toàn cục bên trong hàm.</li>
          <li><strong>Built-in:</strong> Không gian chứa các hàm có sẵn như <code>len</code>, <code>range</code>, <code>int</code>.</li>
        </ol>
        <h4>Đệ quy và Giới hạn Ngăn xếp (Recursion Limit):</h4>
        <p>Hàm gọi lại chính nó được gọi là <em>đệ quy</em>. Mỗi lời gọi hàm sinh ra một khung ngăn xếp (Stack Frame). Để tránh chương trình bị treo cứng vì đệ quy vô hạn làm tràn bộ nhớ RAM (Stack Overflow), CPython đặt sẵn một giới hạn độ sâu (mặc định là 1000 lần gọi, kiểm tra bằng <code>sys.getrecursionlimit()</code>).</p>
      `,
      codeExamples: [
        {
          title: 'Khám phá nonlocal và giới hạn đệ quy trong Python',
          code: `import sys

# 1. Thao tác biến bao bọc bằng nonlocal
def tao_bo_dem():
    so = 0
    def tang_dem():
        nonlocal so  # Báo cho Python biết ta muốn sửa biến 'so' của hàm cha
        so += 1
        return so
    return tang_dem

dem = tao_bo_dem()
print("Lần 1:", dem())
print("Lần 2:", dem())

# 2. Giới hạn độ sâu đệ quy trong CPython
print("\\nGiới hạn đệ quy mặc định của CPython:", sys.getrecursionlimit())

def de_quy_vo_han(n):
    return de_quy_vo_han(n + 1)

try:
    de_quy_vo_han(1)
except RecursionError as err:
    print("Bị chặn an toàn bởi CPython:")
    print("Lỗi:", err)`,
          output: `Lần 1: 1
Lần 2: 2

Giới hạn đệ quy mặc định của CPython: 1000
Bị chặn an toàn bởi CPython:
Lỗi: maximum recursion depth exceeded`,
          annotations: [
            { line: 7, text: 'Từ khóa nonlocal cho phép hàm lồng nhau sửa đổi trạng thái của hàm bao bọc.' },
            { line: 16, text: 'sys.getrecursionlimit() bảo vệ máy tính khỏi sập bộ nhớ khi đệ quy thiếu điều kiện dừng.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cố tình gán biến toàn cục trong hàm mà không khai báo global',
        content: 'Nếu trong hàm bạn viết `x += 1` mà biến `x` ở ngoài hàm, Python sẽ ném lỗi `UnboundLocalError: cannot access local variable \'x\' where it is not associated with a value`. Lý do: khi thấy phép gán `=`, Python mặc định xem `x` là biến Local của hàm, nhưng lại cố đọc giá trị trước khi gán. Hãy dùng `global x` nếu thực sự cần.'
      },
      {
        title: 'Ghi đè tên các hàm Built-in có sẵn',
        content: 'Tuyệt đối không bao giờ đặt tên biến là `list`, `str`, `dict`, `sum`, `id`, `max`! Làm vậy sẽ che khuất hàm tích hợp của Python (hàm Built-in), khiến các đoạn code sau đó không thể gọi `list()` hay `str()` được nữa.'
      }
    ],
    tips: [
      {
        title: '💡 Điểm nối tư duy: Xem ký hiệu chương trình con tại Phần 0B',
        content: 'Trong biểu diễn thuật toán chuẩn ISO 5807, hàm được gọi là "Chương trình con" (Subroutine / Predefined Process) với ký hiệu hình chữ nhật có hai đường viền dọc đôi. Để học cách chia nhỏ bài toán phức tạp thành các hàm con theo tư duy Top-Down, hãy xem [Phần 0B: Flowchart và tư duy thuật toán (Bài B2.4)].'
      }
    ],
    deepDive: {
      title: 'Bên trong CPython: Thuộc tính __defaults__ của hàm',
      content: `
        <p>Nơi CPython cất giấu các giá trị tham số mặc định là ở đâu?</p>
        <p>Mỗi hàm trong CPython là một đối tượng và nó có một thuộc tính bí mật mang tên <code>f.__defaults__</code> (lưu dưới dạng tuple). Khi bạn viết <code>def f(x=[])</code>, chiếc list đó được gắn thẳng vào <code>f.__defaults__[0]</code>. Mỗi khi gọi hàm mà không truyền tham số, CPython móc đúng chiếc list trong tuple đó ra dùng lại!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Xây dựng hàm tính trung bình cộng với *args',
      problem: 'Viết một hàm `tinh_trung_binh(*args)` nhận vào số lượng con số bất kỳ. Nếu không có số nào được truyền vào, hàm trả về `0.0`. Nếu có số, hàm tính và trả về giá trị trung bình cộng của các số đó.',
      hint: 'Dùng if not args: return 0.0, ngược lại return sum(args) / len(args).',
      solutionCode: `def tinh_trung_binh(*args):
    if not args:
        return 0.0
    return sum(args) / len(args)

print("1. Không có số:", tinh_trung_binh())
print("2. Ba số 8, 9, 10:", tinh_trung_binh(8, 9, 10))
print("3. Bốn số 5, 5, 5, 5:", tinh_trung_binh(5, 5, 5, 5))`,
      solutionOutput: `1. Không có số: 0.0
2. Ba số 8, 9, 10: 9.0
3. Bốn số 5, 5, 5, 5: 5.0`,
      explanation: '*args gom tất cả đối số thành một tuple, ta có thể dùng trực tiếp hàm sum() và len() để tính toán.',
      annotations: [
        { line: 2, text: 'Xử lý biên an toàn khi tuple args rỗng.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Sửa lỗi hàm tích lũy dữ liệu dùng sai tham số mặc định',
      problem: 'Đoạn code sau đây bị lỗi tích lũy chung dữ liệu giữa các lần gọi:\\n```python\\ndef them_nhat_ky(tin_nhan, nhat_ky=[]):\\n    nhat_ky.append(tin_nhan)\\n    return nhat_ky\\n```\\nHãy viết lại hàm này theo chuẩn mực Pythonic để mỗi lần gọi mà không truyền tham số `nhat_ky`, hàm luôn khởi tạo một nhật ký mới tinh độc lập.',
      hint: 'Gán tham số mặc định nhat_ky=None, bên trong kiểm tra if nhat_ky is None:.',
      solutionCode: `def them_nhat_ky(tin_nhan, nhat_ky=None):
    if nhat_ky is None:
        nhat_ky = []
    nhat_ky.append(tin_nhan)
    return nhat_ky

log1 = them_nhat_ky("Khởi động hệ thống")
print("Log 1:", log1)

log2 = them_nhat_ky("Người dùng đăng nhập")
print("Log 2:", log2)

print("Hai nhật ký có độc lập nhau không?", log1 is not log2)`,
      solutionOutput: `Log 1: ['Khởi động hệ thống']
Log 2: ['Người dùng đăng nhập']
Hai nhật ký có độc lập nhau không? True`,
      explanation: 'Sử dụng None làm giá trị mặc định đảm bảo danh sách mới chỉ được cấp phát bên trong thân hàm tại thời điểm gọi, hoàn toàn tách biệt giữa các lần gọi.',
      annotations: [
        { line: 1, text: 'Tham số mặc định an toàn nhat_ky=None.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Tại sao việc viết `def them_item(item, ds=[])` lại bị coi là cạm bẫy nghiêm trọng trong Python?',
      options: [
        'Vì Python sẽ báo lỗi cú pháp SyntaxError không cho phép đặt [] ở tham số.',
        'Vì giá trị mặc định [] chỉ được tạo đúng một lần khi định nghĩa hàm; chiếc list này sẽ bị dùng chung và tích lũy dữ liệu qua tất cả các lần gọi hàm tiếp theo.',
        'Vì [] sẽ bị xóa ngay khi hàm chạy xong.',
        'Vì hàm không thể append vào danh sách mặc định.'
      ],
      correctIndex: 1,
      explanation: 'Tham số mặc định trong CPython được đánh giá và lưu trữ trong __defaults__ ngay lúc định nghĩa hàm. Kiểu mutable sẽ bị chia sẻ trạng thái qua mọi lần gọi.'
    },
    {
      question: 'Quy tắc LEGB xác định thứ tự tìm kiếm phạm vi biến trong Python theo trình tự nào?',
      options: [
        'Local ➔ Enclosing ➔ Global ➔ Built-in',
        'Global ➔ Local ➔ Built-in ➔ Enclosing',
        'Built-in ➔ Global ➔ Enclosing ➔ Local',
        'Local ➔ Global ➔ Enclosing ➔ Built-in'
      ],
      correctIndex: 0,
      explanation: 'LEGB: Tìm ở Local (cục bộ) trước, sau đó Enclosing (hàm cha bao bọc), rồi Global (file module), và cuối cùng là Built-in (tích hợp sẵn).'
    },
    {
      question: 'Điều gì xảy ra khi bạn truyền một danh sách `ds = [1, 2]` vào hàm `def f(a): a.append(3)`?',
      options: [
        'Danh sách ds bên ngoài vẫn giữ nguyên [1, 2] vì Python sao chép một bản sao mới cho tham số a.',
        'Danh sách ds bên ngoài bị biến thành [1, 2, 3] vì Python truyền tham chiếu trỏ tới cùng một đối tượng danh sách trong bộ nhớ (Pass-by-object-reference).',
        'Chương trình ném ra ngoại lệ TypeError.',
        'Biến ds bị chuyển thành số nguyên 3.'
      ],
      correctIndex: 1,
      explanation: 'Python truyền tham chiếu đối tượng. Vì list là kiểu mutable, thao tác sửa đổi qua tham số a tác động trực tiếp lên vùng nhớ mà ds bên ngoài đang trỏ tới.'
    }
  ],

  summary: [
    'Mọi hàm trong Python đều trả về giá trị; nếu không có return thì mặc định trả về None.',
    '*args gom các tham số vị trí thừa thành tuple; **kwargs gom các tham số từ khóa thừa thành dict.',
    'Hàm là First-Class Object: có thể gán cho biến, lưu trong danh sách, truyền làm tham số, hoặc viết ngắn gọn bằng lambda.',
    'Python truyền tham số theo cơ chế Pass-by-object-reference: hàm có thể sửa đổi dữ liệu tại chỗ của các đối tượng mutable.',
    'Tuyệt đối không dùng list hoặc dict làm tham số mặc định; hãy dùng None kết hợp kiểm tra "if x is None:".',
    'Thứ tự tìm kiếm biến là LEGB: Local -> Enclosing -> Global -> Built-in.'
  ]
};
