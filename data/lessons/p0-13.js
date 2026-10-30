export default {
  id: 'p0-13',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.13',
  title: 'Những hiểu lầm phổ biến cần phá bỏ (Kèm ví dụ phản chứng)',
  subtitle: 'Tổng kết 8 ngộ nhận kinh điển của người học Python: Vạch trần bằng code phản chứng chạy được 100% và ranh giới kiến thức nền tảng',
  level: 'Cơ bản',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phá bỏ tận gốc 8 hiểu lầm phổ biến nhất của người mới học Python bằng các ví dụ phản chứng chạy được 100%.',
    'Khắc sâu lại mô hình tinh thần: Biến là nhãn tên, phép gán không sao chép, tính bất biến và ranh giới của hàm.',
    'Phân biệt triệt để giữa việc xuất dữ liệu ra màn hình (`print`) và việc trả về kết quả cho chương trình (`return`).',
    'Nắm rõ ranh giới: Những kiến thức đã được làm chủ trọn vẹn trong Phần 0 và những chuyên đề nâng cao sẽ học tiếp ở các phần sau (OOP chi tiết, Decorator, Generator, Async, Type hints).'
  ],

  intuition: {
    title: 'Tấm gương phản chiếu và Cú lột xác tư duy',
    metaphor: 'Học lập trình cũng giống như tập lái xe: những thói quen sai lầm ban đầu nếu không được uốn nắn ngay sẽ trở thành những "điểm mù" nguy hiểm chết người sau này. Bài học này đóng vai trò như một phòng gương chiếu phản: nó tập hợp 8 lỗi tư duy ngây thơ mà hầu như ai mới bước vào thế giới Python cũng từng mắc phải. Thay vì chỉ nói "bạn sai rồi", chúng ta sẽ đưa từng hiểu lầm lên bàn mổ bằng những đoạn code thực tế để bạn tận mắt nhìn thấy Python thực sự vận hành như thế nào. Vượt qua 8 hiểu lầm này, bạn chính thức tốt nghiệp lớp Nhập môn và sở hữu tư duy của một kỹ sư Python thực thụ!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">8 NGỘ NHẬN KINH ĐIỂN CẦN PHÁ BỎ</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
          <div style="padding:10px;border:1px solid var(--danger);border-radius:6px;background:var(--bg-surface);">
            <div style="color:var(--danger);font-weight:700;">1. Biến là cái hộp chứa đồ</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Sự thật: Biến chỉ là NHÃN TÊN trỏ tới đối tượng trên Heap!</div>
          </div>
          <div style="padding:10px;border:1px solid var(--danger);border-radius:6px;background:var(--bg-surface);">
            <div style="color:var(--danger);font-weight:700;">2. b = a là tạo bản sao</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Sự thật: Chỉ là gắn thêm nhãn thứ hai vào cùng 1 đối tượng!</div>
          </div>
          <div style="padding:10px;border:1px solid var(--danger);border-radius:6px;background:var(--bg-surface);">
            <div style="color:var(--danger);font-weight:700;">3. "is" và "==" như nhau</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Sự thật: == so sánh giá trị, is so sánh cùng địa chỉ RAM!</div>
          </div>
          <div style="padding:10px;border:1px solid var(--danger);border-radius:6px;background:var(--bg-surface);">
            <div style="color:var(--danger);font-weight:700;">4. input() trả về số</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Sự thật: input() LUÔN LUÔN trả về chuỗi văn bản str!</div>
          </div>
          <div style="padding:10px;border:1px solid var(--danger);border-radius:6px;background:var(--bg-surface);">
            <div style="color:var(--danger);font-weight:700;">5. range() là một list</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Sự thật: range sinh số theo nhu cầu, chỉ chiếm 48 bytes RAM!</div>
          </div>
          <div style="padding:10px;border:1px solid var(--danger);border-radius:6px;background:var(--bg-surface);">
            <div style="color:var(--danger);font-weight:700;">6. Hàm không đổi dữ liệu ngoài</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Sự thật: Hàm có thể sửa tại chỗ các đối tượng Mutable!</div>
          </div>
          <div style="padding:10px;border:1px solid var(--danger);border-radius:6px;background:var(--bg-surface);">
            <div style="color:var(--danger);font-weight:700;">7. print và return như nhau</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Sự thật: print chỉ in ra mắt xem; return cấp dữ liệu cho code!</div>
          </div>
          <div style="padding:10px;border:1px solid var(--danger);border-radius:6px;background:var(--bg-surface);">
            <div style="color:var(--danger);font-weight:700;">8. Thụt lề chỉ để cho đẹp</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Sự thật: Thụt lề CHÍNH LÀ CÚ PHÁP xác định khối lệnh!</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Mổ xẻ 8 Hiểu lầm bằng Code Phản chứng Chạy được 100%',
      badge: 'Phòng Thí nghiệm Phản chứng',
      content: `
        <p>Dưới đây là 8 cặp đối chứng thực nghiệm. Hãy quan sát kết quả output để khắc sâu bản chất:</p>
      `,
      codeExamples: [
        {
          title: 'Hiểu lầm 1 & 2: Biến là cái hộp & Phép gán sao chép dữ liệu',
          code: `# HIỂU LẦM: "b = a sao chép danh sách thành 2 bản độc lập"
a = [1, 2, 3]
b = a  # Chỉ gắn thêm nhãn b vào danh sách cũ!

# Phản chứng: Sửa qua b, a bị biến đổi theo
b.append(999)
print("a sau khi b.append(999):", a)
print("id của a và b có trùng nhau không?:", a is b)`,
          output: `a sau khi b.append(999): [1, 2, 3, 999]
id của a và b có trùng nhau không?: True`,
          annotations: [
            { line: 6, text: 'a cũng bị biến thành [1, 2, 3, 999] vì a và b là cùng 1 đối tượng trong RAM.' }
          ]
        },
        {
          title: 'Hiểu lầm 3: "is" và "==" hoạt động giống hệt nhau',
          code: `# HIỂU LẦM: "is và == đều kiểm tra bằng nhau"
list1 = [10, 20]
list2 = [10, 20]

# Phản chứng:
print("list1 == list2 (Cùng giá trị nội dung):", list1 == list2)
print("list1 is list2 (Cùng một vùng nhớ RAM):", list1 is list2)
print("Địa chỉ list1:", hex(id(list1)))
print("Địa chỉ list2:", hex(id(list2)))`,
          output: `list1 == list2 (Cùng giá trị nội dung): True
list1 is list2 (Cùng một vùng nhớ RAM): False
Địa chỉ list1: 0x1f40a1b2a80
Địa chỉ list2: 0x1f40a1b2b00`,
          annotations: [
            { line: 6, text: '== trả về True vì nội dung bằng nhau; is trả về False vì chúng là 2 đối tượng độc lập.' }
          ]
        },
        {
          title: 'Hiểu lầm 4: input() nhập số sẽ trả về số',
          code: `# HIỂU LẦM: "Nhập số 5 từ bàn phím thì kết quả là số nguyên 5"
# Giả lập kết quả trả về từ input()
x = "5"
y = "3"

# Phản chứng: Phép cộng không ra 8 mà ra chuỗi nối!
print("x + y =", repr(x + y))
print("Kiểu của x:", type(x))
print("Đúng phải là int(x) + int(y) =", int(x) + int(y))`,
          output: `x + y = '53'
Kiểu của x: <class 'str'>
Đúng phải là int(x) + int(y) = 8`,
          annotations: [
            { line: 7, text: '"5" + "3" nối chuỗi thành "53". Bắt buộc phải ép kiểu int().' }
          ]
        },
        {
          title: 'Hiểu lầm 5: range() là một danh sách list lưu sẵn số',
          code: `import sys

# HIỂU LẦM: "range(1000) tạo sẵn 1000 số trong danh sách"
r = range(1000000000)  # 1 tỷ số

# Phản chứng: Dung lượng RAM siêu nhỏ vì sinh số lười biếng
print("Kiểu của r:", type(r))
print("Dung lượng RAM chiếm dụng:", sys.getsizeof(r), "bytes!")
print("r có phải là list không?:", isinstance(r, list))`,
          output: `Kiểu của r: <class 'range'>
Dung lượng RAM chiếm dụng: 48 bytes!
r có phải là list không?: False`,
          annotations: [
            { line: 8, text: 'range là đối tượng riêng biệt, chỉ chiếm 48 bytes dù sinh tới 1 tỷ số.' }
          ]
        },
        {
          title: 'Hiểu lầm 6: Hàm số không thể làm thay đổi dữ liệu bên ngoài',
          code: `# HIỂU LẦM: "Hàm nhận tham số thì dữ liệu bên ngoài luôn an toàn"
def them_du_lieu(ds):
    ds.append("PHẦN TỬ MỚI")

gio_hang = ["Sách", "Bút"]
them_du_lieu(gio_hang)

# Phản chứng: gio_hang bên ngoài bị thay đổi trực tiếp!
print("gio_hang bên ngoài sau khi gọi hàm:", gio_hang)`,
          output: `gio_hang bên ngoài sau khi gọi hàm: ['Sách', 'Bút', 'PHẦN TỬ MỚI']`,
          annotations: [
            { line: 9, text: 'Vì Python truyền tham chiếu đối tượng, hàm có thể sửa đổi tại chỗ các đối tượng Mutable!' }
          ]
        },
        {
          title: 'Hiểu lầm 7: print và return có vai trò như nhau',
          code: `# HIỂU LẦM: "Dùng print trong hàm cũng giống như return"
def ham_dung_print(a, b):
    print("Kết quả:", a + b)  # Chỉ in ra màn hình cho mắt xem

def ham_dung_return(a, b):
    return a + b              # Trả dữ liệu thực sự cho chương trình

ket_qua_1 = ham_dung_print(2, 3)
ket_qua_2 = ham_dung_return(2, 3)

# Phản chứng: ket_qua_1 không dùng để tính toán tiếp được!
print("\\nGiá trị gán vào biến:")
print("ket_qua_1 mang giá trị:", repr(ket_qua_1), "(Là None!)")
print("ket_qua_2 mang giá trị:", repr(ket_qua_2), "(Là số 5)")

# Cố tính toán với ket_qua_1 sẽ lỗi ngay:
try:
    loi = ket_qua_1 * 10
except TypeError as e:
    print("Không thể tính toán với ket_qua_1:", e)`,
          output: `Kết quả: 5

Giá trị gán vào biến:
ket_qua_1 mang giá trị: None (Là None!)
ket_qua_2 mang giá trị: 5 (Là số 5)
Không thể tính toán với ket_qua_1: unsupported operand type(s) for *: 'NoneType' and 'int'`,
          annotations: [
            { line: 12, text: 'ham_dung_print in ra số 5 nhưng biến nhận về giá trị None.' },
            { line: 19, text: 'NoneType * 10 văng lỗi TypeError lập tức.' }
          ]
        },
        {
          title: 'Hiểu lầm 8: Thụt lề chỉ để cho đẹp, thụt thế nào cũng được',
          code: `# HIỂU LẦM: "Thụt lề tùy ý như HTML/CSS không ảnh hưởng logic"
# Dưới đây là ví dụ thụt lề sai làm đổi hoàn toàn logic nghiệp vụ:
def xet_thuong(doanh_so):
    thuong = 0
    if doanh_so > 100:
        thuong = 50
    thuong += 10  # DÒNG NÀY NẰM NGOÀI IF VÌ CÙNG CẤP VỚI IF!
    return thuong

print("Doanh số 50 (dưới 100) vẫn được thưởng:", xet_thuong(50))
print("-> Lý do: Dòng thuong += 10 không thụt lề vào trong if nên luôn luôn chạy!")`,
          output: `Doanh số 50 (dưới 100) vẫn được thưởng: 10
-> Lý do: Dòng thuong += 10 không thụt lề vào trong if nên luôn luôn chạy!`,
          annotations: [
            { line: 6, text: 'Chỉ cần thụt lề lùi ra 1 nấc, câu lệnh đã nhảy khỏi khối if và trở thành lệnh chạy vô điều kiện!' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Ranh giới Kiến thức: Những gì ngoài phạm vi Phần 0 (Học tiếp ở các phần sau)',
      badge: 'Lộ trình Nối tiếp',
      content: `
        <p>Chúc mừng bạn! Hoàn thành 13 bài học của Phần 0 đồng nghĩa với việc bạn đã nắm vững 100% nền móng vững chắc nhất của Python. Bạn đã hiểu máy tính lưu bit/byte ra sao, CPython biên dịch bytecode thế nào, biến là nhãn tên, tính bất biến, toán tử ngắn mạch, 10 kiểu dữ liệu cốt lõi, hàm, module, và cách đọc lỗi.</p>
        <p>Để giữ cho Phần 0 tập trung và tinh gọn, các chủ đề nâng cao sau đây <strong>cố tình được đặt ngoài phạm vi Phần 0</strong> và sẽ được khám phá lần lượt ở các phần tiếp theo:</p>
        <ul>
          <li><strong>Phần 0B (Kế tiếp):</strong> Flowchart và Tư duy Thuật toán chuyên sâu — rèn luyện khả năng phân tích đề, vẽ sơ đồ khối chuẩn ISO 5807, lập bảng Dry Run theo dõi biến, và tư duy thuật toán hình thức.</li>
          <li><strong>Phần 1:</strong> Chuyên sâu Các Kiểu Số (numbers) — mổ xẻ tận gốc số thực IEEE 754 float 64-bit, số nguyên vô hạn CPython, số phức cmath, Decimal tài chính và Fraction.</li>
          <li><strong>Học phần Chuỗi (str Masterclass):</strong> Toàn bộ 47 phương thức str, kiến trúc bộ nhớ CPython PEP 393, Regular Expressions, và Template Strings PEP 750 (Python 3.14).</li>
          <li><strong>Chủ đề chuyên sâu sau này:</strong> Lập trình hướng đối tượng chi tiết (Class, Kế thừa, Đa hình, Dunder methods), Decorator, Generator / yield, Lập trình bất đồng bộ Async/Await, và Hệ thống Type Hints chuyên sâu.</li>
        </ul>
      `
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Nôn nóng học các framework lớn (Django, FastAPI, AI) khi chưa vững nền tảng',
        content: '90% lỗi quái đản mà lập trình viên gặp phải khi làm việc với Pandas, PyTorch hay Django thực chất không phải do framework khó, mà do họ chưa nắm vững: biến là nhãn tên, sao chép nông vs sâu, hoặc truyền tham chiếu trong hàm. Hãy trân trọng và vững vàng nền tảng!'
      }
    ],
    tips: [
      {
        title: 'Sẵn sàng bước tiếp!',
        content: 'Bây giờ bạn đã có đầy đủ vũ khí tư duy để bước vào [Phần 0B: Flowchart và tư duy thuật toán] hoặc đào sâu vào các bí ẩn toán học máy tính ở [Phần 1: Các kiểu số].'
      }
    ],
    deepDive: null,
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Phát hiện hiểu lầm trong đoạn code kiểm tra đăng nhập',
      problem: 'Cho đoạn code sau:\\n```python\\ndef xac_thuc(mat_khau):\\n    if mat_khau == "123456":\\n        print("Đăng nhập thành công!")\\n\\ntrang_thai = xac_thuc("123456")\\nif trang_thai:\\n    print("Chào mừng bạn vào hệ thống")\\nelse:\\n    print("Từ chối truy cập")\\n```\\nHỏi: Màn hình sẽ in ra những dòng chữ nào? Giải thích vì sao người viết code bị nhầm lẫn giữa print và return.',
      hint: 'Hàm xac_thuc không có câu lệnh return nào cả, vậy nó trả về cái gì?',
      solutionCode: `def xac_thuc(mat_khau):
    if mat_khau == "123456":
        print("Đăng nhập thành công!")

trang_thai = xac_thuc("123456")
print("Giá trị thực tế của trang_thai là:", repr(trang_thai))

if trang_thai:
    print("Chào mừng bạn vào hệ thống")
else:
    print("Từ chối truy cập")`,
      solutionOutput: `Đăng nhập thành công!
Giá trị thực tế của trang_thai là: None
Từ chối truy cập`,
      explanation: 'Hàm xac_thuc chỉ in ra chữ "Đăng nhập thành công!" nhưng không return gì cả, nên giá trị trả về là None. Biến trang_thai nhận giá trị None (là Falsy), dẫn tới việc khối if trang_thai bị sai và in ra "Từ chối truy cập"!',
      annotations: [
        { line: 5, text: 'trang_thai nhận về giá trị mặc định None.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Sửa lỗi logic thụt lề trong hàm tính chiết khấu khách hàng',
      problem: 'Đoạn code sau đây muốn giảm 20% cho đơn hàng trên 500k, nhưng do lỗi thụt lề nên đơn hàng 200k cũng bị giảm giá:\\n```python\\ndef tinh_tien(gia_tri):\\n    tien = gia_tri\\n    if gia_tri > 500000:\\n        tien = gia_tri * 0.8\\n    print(f"Áp dụng giảm giá: {tien}")\\n    return tien\\n```\\nHãy sửa lại hàm để thông báo áp dụng giảm giá CHỈ ĐƯỢC IN RA khi đơn hàng thực sự vượt 500k.',
      hint: 'Thụt lề dòng print vào đúng cấp bên trong khối if.',
      solutionCode: `def tinh_tien(gia_tri):
    tien = gia_tri
    if gia_tri > 500000:
        tien = gia_tri * 0.8
        print(f"Áp dụng giảm giá: {tien}đ")
    return tien

print("Đơn hàng 200k:", tinh_tien(200000))
print("Đơn hàng 600k:", tinh_tien(600000))`,
      solutionOutput: `Đơn hàng 200k: 200000
Áp dụng giảm giá: 480000.0đ
Đơn hàng 600k: 480000.0`,
      explanation: 'Chỉ cần thụt lề dòng print thêm 4 dấu cách vào trong khối if gia_tri > 500000, thông báo giảm giá sẽ chỉ xuất hiện khi điều kiện thỏa mãn.',
      annotations: [
        { line: 5, text: 'Dòng print được thụt lề vào trong if.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Khi bạn gọi một hàm `f(ds)` và truyền một danh sách `ds` vào, hàm thực hiện `ds.pop(0)`. Điều gì xảy ra với `ds` ở bên ngoài hàm?',
      options: [
        'ds bên ngoài vẫn giữ nguyên vì hàm chỉ thao tác trên bản sao nội bộ.',
        'ds bên ngoài bị mất đi phần tử đầu tiên vì Python truyền tham chiếu đối tượng (Pass-by-object-reference) và list là kiểu có thể thay đổi (mutable).',
        'Python báo lỗi vì hàm không được phép xóa dữ liệu ngoài phạm vi.',
        'ds bên ngoài bị chuyển thành kiểu tuple.'
      ],
      correctIndex: 1,
      explanation: 'Vì list là kiểu mutable và Python truyền tham chiếu, thao tác pop() tác động trực tiếp lên vùng nhớ chung của danh sách.'
    },
    {
      question: 'Sự khác biệt cốt lõi giữa `print(x)` và `return x` trong một hàm là gì?',
      options: [
        'print(x) chỉ dùng được cho chuỗi, return x chỉ dùng được cho số.',
        'print(x) chỉ hiển thị giá trị x ra màn hình cho con người nhìn thấy; còn return x cung cấp giá trị x cho chương trình để gán vào biến hoặc tính toán tiếp.',
        'print(x) thoát khỏi hàm ngay lập tức; return x tiếp tục chạy các dòng sau.',
        'Cả hai đều có thể thay thế cho nhau hoàn toàn.'
      ],
      correctIndex: 1,
      explanation: 'print() là giao tiếp xuất dữ liệu với con người, không có giá trị trả về (trả về None). return là giao tiếp dữ liệu nội bộ giữa các phần của chương trình.'
    },
    {
      question: 'Biểu thức `range(5)` trong Python 3 thực chất là gì?',
      options: [
        'Một danh sách tương đương [0, 1, 2, 3, 4] được tạo sẵn trong RAM.',
        'Một đối tượng dãy số bất biến sinh số theo nhu cầu (Lazy Evaluation), không tạo trước danh sách trong bộ nhớ.',
        'Một hàm vô danh lambda.',
        'Một con trỏ file.'
      ],
      correctIndex: 1,
      explanation: 'range trong Python 3 là một đối tượng dãy số độc lập, sinh từng phần tử một khi được yêu cầu duyệt qua cơ chế Iterator.'
    }
  ],

  summary: [
    'Biến là nhãn tên trỏ tới đối tượng; phép gán "=" chỉ buộc thêm nhãn, không sao chép dữ liệu.',
    '"is" kiểm tra cùng địa chỉ RAM; "==" kiểm tra cùng giá trị nội dung.',
    'input() luôn trả về chuỗi str; muốn tính toán số học bắt buộc phải ép kiểu int() hoặc float().',
    'range() là một lazy sequence chỉ tốn 48 bytes RAM, không phải là một danh sách list có sẵn.',
    'Hàm có thể làm thay đổi dữ liệu bên ngoài nếu đối số truyền vào là kiểu Mutable và bị sửa đổi tại chỗ.',
    'print() chỉ hiển thị ra màn hình cho mắt xem; return mới thực sự chuyển giao dữ liệu cho chương trình.',
    'Thụt lề chính là cú pháp của Python, quy định ranh giới của các khối lệnh.'
  ]
};
