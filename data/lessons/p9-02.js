export default {
  id: 'p9-02',
  partId: 'part-1',
  partTitle: 'Phần 1 – Các kiểu số trong Python',
  number: '1.2',
  title: 'Số nguyên int: Độ chính xác Tùy ý & Cơ chế CPython',
  subtitle: 'Giải mã cấu trúc Bignum không tràn số, phép chia số âm làm tròn về âm vô cực, và cạm bẫy Small Integer Cache',
  level: 'Nâng cao',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu bản chất kiểu `int` trong Python 3 là số nguyên có độ chính xác tùy ý (Bignum), không bao giờ bị tràn số như C/Java.',
    'Sử dụng thành thạo các hệ cơ số (nhị phân, bát phân, thập lục phân), toán tử bitwise và hai phương thức `bit_length()`, `bit_count()`.',
    'Nắm vững quy tắc làm tròn về âm vô cực (Floor Division) của phép `//` và `%` với số âm, so sánh với C/Java/JavaScript và hàm `divmod()`.',
    'Làm chủ hàm `pow(base, exp, mod)` 3 tham số và giới hạn chuyển đổi chuỗi `sys.set_int_max_str_digits()`.',
    'Phân biệt rõ chi tiết cài đặt CPython (bộ nhớ đệm số nhỏ -5 đến 256) và lý do vì sao TUYỆT ĐỐI KHÔNG dùng toán tử `is` để so sánh số.'
  ],

  intuition: {
    title: 'Hộp số đo vô hạn và Chiếc đồng hồ đo km xe máy',
    metaphor: 'Trong các ngôn ngữ như C hay Java, biến số nguyên giống như đồng hồ contermet cơ học trên xe máy chỉ có 5 chữ số: khi bạn chạy qua con số 99999, nó đột ngột nhảy về 00000 hoặc tràn sang số âm (Integer Overflow). Trong Python 3, `int` không phải là một ngăn nhớ cố định 32-bit hay 64-bit; nó giống như một cuộn giấy vô tận: khi con số lớn dần, Python tự động mở rộng thêm "các trang giấy" (digit 30-bit trong CPython) để chứa kết quả. Bạn có thể tính $2^{1000}$ hay $1000!$ mà không bao giờ sợ tràn số!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:8px;font-family:var(--font-mono);font-size:0.85rem;padding:12px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:var(--danger-bg);border:1px solid var(--danger-border);border-radius:6px;color:var(--danger-text);">
          <span>C / Java (int 32-bit cố định):</span>
          <span>2,147,483,647 + 1 ──► <strong>-2,147,483,648</strong> (Tràn số nguy hiểm!)</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:var(--success-bg);border:1px solid var(--success-border);border-radius:6px;color:var(--success-text);">
          <span>Python 3 (Arbitrary Precision):</span>
          <span>2**63 + 1 ──► <strong>9,223,372,036,854,775,809</strong> (Mở rộng vô hạn!)</span>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Số nguyên Độ chính xác Tùy ý (Bignum) & Đối tượng Bất biến',
      badge: 'Arbitrary Precision',
      content: `
        <p>Từ Python 3.0 trở đi, sự phân biệt giữa <code>int</code> (số nguyên thông thường 32/64-bit) và <code>long</code> (số nguyên lớn) trong Python 2 đã hoàn toàn bị xóa bỏ. Toàn bộ số nguyên trong Python 3 đều là <strong>độ chính xác tùy ý (arbitrary-precision integer)</strong>.</p>
        <p>Đặc tính kỹ thuật cốt lõi:</p>
        <ul>
          <li><strong>Không tràn số (No Overflow):</strong> Kích thước tối đa của một số nguyên chỉ bị giới hạn bởi dung lượng bộ nhớ RAM mà máy tính của bạn có thể cấp phát.</li>
          <li><strong>Bất biến (Immutable):</strong> Giống như <code>str</code>, một đối tượng <code>int</code> sau khi được sinh ra trong bộ nhớ sẽ không thể bị thay đổi giá trị. Khi bạn thực hiện phép tính <code>x = x + 1</code>, Python sẽ tạo ra một đối tượng <code>int</code> hoàn toàn mới và gắn tên biến <code>x</code> vào đối tượng mới đó.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Tính toán với những con số khổng lồ không giới hạn',
          code: `import sys

huge_number = 2 ** 100
print("2 lũy thừa 100:", huge_number)
print("Số chữ số thập phân:", len(str(huge_number)))
print("Dung lượng bộ nhớ RAM chiếm dụng:", sys.getsizeof(huge_number), "bytes")

# Tính giai thừa 50!
import math
fact_50 = math.factorial(50)
print("50! =", fact_50)`,
          output: `2 lũy thừa 100: 1267650600228229401496703205376
Số chữ số thập phân: 31
Dung lượng bộ nhớ RAM chiếm dụng: 40 bytes
50! = 30414093201713378043612608166064768844377641568960512000000000000`,
          annotations: [
            { line: 3, text: 'Phép lũy thừa 2**100 tạo ra con số 31 chữ số mà các kiểu int64 trong C/C++ không thể chứa được.' },
            { line: 6, text: 'sys.getsizeof() cho thấy CPython cấp phát linh hoạt: số nguyên nhỏ tốn 28 bytes, số lớn tăng dần 40, 56 bytes...' },
            { line: 10, text: 'Hàm math.factorial(50) tính ra con số 65 chữ số chính xác tuyệt đối từng hàng đơn vị.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Các hệ cơ số, Toán tử Bitwise, bit_length() và bit_count()',
      badge: 'Cơ số & Thao tác Bit',
      content: `
        <p>Trong mã nguồn Python, bạn có thể viết số nguyên ở 4 hệ cơ số phổ biến bằng các tiền tố:</p>
        <ul>
          <li><strong>Hệ thập phân (Decimal, cơ số 10):</strong> Viết bình thường: <code>42</code>, có thể dùng dấu gạch dưới <code>1_000_000</code>.</li>
          <li><strong>Hệ nhị phân (Binary, cơ số 2):</strong> Tiền tố <code>0b</code> hoặc <code>0B</code>: <code>0b101010</code>. Hàm chuyển đổi: <code>bin(n)</code>.</li>
          <li><strong>Hệ bát phân (Octal, cơ số 8):</strong> Tiền tố <code>0o</code> hoặc <code>0O</code>: <code>0o52</code>. Hàm chuyển đổi: <code>oct(n)</code>.</li>
          <li><strong>Hệ thập lục phân (Hexadecimal, cơ số 16):</strong> Tiền tố <code>0x</code> hoặc <code>0X</code>: <code>0x2A</code>. Hàm chuyển đổi: <code>hex(n)</code>.</li>
        </ul>
        <p>Hai phương thức tích hợp cực kỳ mạnh mẽ của <code>int</code>:</p>
        <ul>
          <li><code>n.bit_length()</code>: Trả về số lượng bit tối thiểu cần thiết để biểu diễn số <code>n</code> ở hệ nhị phân (không tính bit dấu).</li>
          <li><code>n.bit_count()</code> (Từ Python 3.10+): Đếm số lượng bit <code>1</code> trong biểu diễn nhị phân của số nguyên không âm (dân thuật toán gọi là hàm <em>Hamming Weight</em> hoặc <em>Population Count</em>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi hệ cơ số và thao tác bit chuyên sâu',
          code: `val = 42

print("Hệ 2 :", bin(val))
print("Hệ 8 :", oct(val))
print("Hệ 16:", hex(val))

# Hai phương thức đo lường bit
print("Số bit cần dùng (bit_length):", val.bit_length())  # 42 = 101010b -> 6 bits
print("Số bit 1 bật (bit_count)     :", val.bit_count())   # '101010' có 3 bit 1

# Các toán tử bitwise cơ bản
a = 0b1100  # 12
b = 0b1010  # 10
print("AND (a & b) :", bin(a & b))  # 0b1000
print("OR  (a | b) :", bin(a | b))  # 0b1110
print("XOR (a ^ b) :", bin(a ^ b))  # 0b0110
print("Dịch trái a << 2:", a << 2)  # 12 * 4 = 48`,
          output: `Hệ 2 : 0b101010
Hệ 8 : 0o52
Hệ 16: 0x2a
Số bit cần dùng (bit_length): 6
Số bit 1 bật (bit_count)     : 3
AND (a & b) : 0b1000
OR  (a | b) : 0b1110
XOR (a ^ b) : 0b110
Dịch trái a << 2: 48`,
          annotations: [
            { line: 3, text: 'bin(), oct(), hex() luôn trả về chuỗi có tiền tố 0b, 0o, 0x tương ứng.' },
            { line: 8, text: 'bit_length() giúp lập trình viên xác định kích thước buffer cần cấp phát khi mã hóa dữ liệu mạng.' },
            { line: 9, text: 'bit_count() chạy ở tốc độ phần cực nhanh (POPCOUNT instruction của CPU).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Phép chia // và % với số âm: Quy tắc Floor Division & divmod()',
      badge: 'Bản chất Toán học',
      content: `
        <p>Đây là một trong những câu hỏi phỏng vấn phân loại kỹ sư Python xuất sắc nhất: <strong>Tại sao <code>-7 // 2</code> trong Python lại bằng <code>-4</code> mà không phải <code>-3</code> như trong C/C++, Java hay JavaScript?</strong></p>
        <p>Sự khác biệt cốt lõi:</p>
        <ul>
          <li><strong>C/Java/JavaScript dùng Truncation towards zero (Cắt cụt về 0):</strong> Phép chia nguyên bỏ phần thập phân. Vì $-7 / 2 = -3.5$, cắt phần thập phân sẽ được $-3$. Do đó số dư là: $-7 - (-3 \times 2) = -1$. Dẫn đến việc số dư có thể bị âm!</li>
          <li><strong>Python dùng Floor Division (Làm tròn về $-\infty$):</strong> Phép <code>//</code> luôn lấy hàm sàn $\lfloor a / b \rfloor$ (số nguyên lớn nhất nhỏ hơn hoặc bằng $a / b$). Vì $-3.5$ nằm giữa $-3$ và $-4$, số nguyên nhỏ hơn là <strong>$-4$</strong>!</li>
        </ul>
        <p>Lợi ích kiến trúc của Python: Giữ vững định lý số dư toán học sơ cấp Euclid: <strong>Nếu số chia $b > 0$, số dư $a \% b$ LUÔN LUÔN là một số không âm nằm trong khoảng $[0, b - 1]$</strong>. Nhờ đó, việc duyệt chỉ số xoay vòng (modulo clock index) cho danh sách không bao giờ bị văng chỉ số âm!</p>
        <p>Đẳng thức bất biến trong Python: <code>a == (a // b) * b + (a % b)</code> luôn đúng cho mọi $a, b \neq 0$. Hàm <code>divmod(a, b)</code> trả về đồng thời cặp <code>(a // b, a % b)</code> trong một lần tính toán tối ưu.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh phép chia nguyên và modulo với số âm',
          code: `print("7 // 2  =", 7 // 2)
print("7 % 2   =", 7 % 2)

print("-7 // 2 =", -7 // 2)   # Làm tròn về âm vô cực: floor(-3.5) = -4
print("-7 % 2  =", -7 % 2)    # Số dư luôn dương: -7 - (-4 * 2) = 1

# Kiểm tra đẳng thức bất biến: a == (a // b) * b + (a % b)
a, b = -7, 2
q, r = divmod(a, b)
print(f"divmod({a}, {b}) -> thương={q}, dư={r}")
print(f"Kiểm chứng: {q} * {b} + {r} ==", q * b + r)`,
          output: `7 // 2  = 3
7 % 2   = 1
-7 // 2 = -4
-7 % 2  = 1
divmod(-7, 2) -> thương=-4, dư=1
Kiểm chứng: -4 * 2 + 1 == -7`,
          annotations: [
            { line: 4, text: '-7 // 2 cho kết quả -4 vì sàn của -3.5 là -4 (hướng về phía âm vô cực).' },
            { line: 5, text: '-7 % 2 bằng 1, luôn mang dấu của số chia (b=2 dương).' },
            { line: 9, text: 'Hàm divmod() thực hiện cả phép // và % hiệu quả hơn là gọi hai phép toán riêng lẻ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: pow 3 tham số và Giới hạn chuyển đổi chuỗi sys.set_int_max_str_digits',
      badge: 'Mật mã học & Bảo mật',
      content: `
        <p>Hai tính năng cấp cao không thể thiếu của số nguyên:</p>
        <ul>
          <li><strong>Hàm <code>pow(base, exp, mod)</code> 3 tham số:</strong> Tính $(base^{exp}) \pmod{mod}$. Thay vì tính số khổng lồ $base^{exp}$ rồi mới lấy dư (sẽ làm sập RAM), thuật toán <em>Modular Exponentiation</em> (Bình phương và nhân liên tiếp) lấy modulo ở từng bước trung gian. Tốc độ nhanh hơn hàng triệu lần và dùng cực nhiều trong mật mã học RSA.</li>
          <li><strong>Giới hạn chuyển đổi chuỗi ↔ số nguyên (CVE-2020-10735 & PEP 686):</strong>
            <ul>
              <li>Thuật toán đổi chuỗi thành số nguyên lớn ở hệ thập phân có độ phức tạp thời gian là $O(N^2)$ theo số chữ số. Kẻ tấn công có thể gửi chuỗi gồm 1 triệu chữ số làm CPU máy chủ bị treo hoàn toàn (Denial of Service - DoS).</li>
              <li>Vì vậy, Python đặt ra ngưỡng mặc định: <strong>4300 chữ số</strong>. Nếu bạn cố gắng làm <code>int("9" * 4301)</code> hoặc <code>str(10 ** 4301)</code>, Python sẽ ném lỗi <code>ValueError: Exceeds the limit (4300 digits) for integer string conversion</code>.</li>
              <li>Bạn có thể kiểm tra bằng <code>sys.get_int_max_str_digits()</code> và tùy chỉnh bằng <code>sys.set_int_max_str_digits(n)</code> (hoặc truyền <code>0</code> để tắt giới hạn).</li>
            </ul>
          </li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sức mạnh của pow 3 tham số và an toàn giới hạn chuỗi',
          code: `import sys

# 1. pow 3 tham số chạy tức thì dù số mũ cực lớn
base = 123456789
exp = 987654321
mod = 1000000007
result = pow(base, exp, mod)
print("pow(base, exp, mod) =", result)

# 2. Giới hạn chuyển đổi chuỗi an toàn
current_limit = sys.get_int_max_str_digits()
print("Giới hạn chữ số mặc định:", current_limit)

try:
    huge_str = "9" * 4301
    val = int(huge_str)
except ValueError as e:
    print("Bị chặn an toàn:", type(e).__name__, "->", str(e)[:60] + "...")`,
          output: `pow(base, exp, mod) = 879899320
Giới hạn chữ số mặc định: 4300
Bị chặn an toàn: ValueError -> Exceeds the limit (4300 digits) for integer string conversio...`,
          annotations: [
            { line: 7, text: 'pow(base, exp, mod) giải quyết phép toán mật mã trong micro-giây mà không hề tốn RAM.' },
            { line: 11, text: 'sys.get_int_max_str_digits() mặc định là 4300 nhằm phòng thủ DoS tấn công thuật toán O(N^2).' },
            { line: 17, text: 'Lỗi ValueError được ném ra ngay lập tức để bảo vệ tiến trình web server không bị nghẽn CPU.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'TUYỆT ĐỐI KHÔNG dùng toán tử "is" để so sánh số nguyên!',
        content: 'Toán tử is so sánh danh tính vùng nhớ (object identity - cùng địa chỉ RAM), còn == so sánh giá trị tương đương. Trong CPython, có cơ chế Small Integer Caching: các số nguyên từ -5 đến 256 được tạo sẵn trong RAM và dùng chung. Do đó a = 256; b = 256 thì a is b trả về True! Nhưng nếu a = 257; b = 257, CPython tạo 2 đối tượng khác nhau nên a is b sẽ trả về False! Đây là chi tiết cài đặt riêng của CPython, không phải quy chuẩn ngôn ngữ. Luôn dùng == để so sánh số.'
      },
      {
        title: 'Nhầm lẫn kết quả của phép chia số nguyên âm trong thuật toán danh sách xoay vòng',
        content: 'Khi viết thuật toán đồng hồ hay xoay vòng (circular array), nếu chỉ số lùi về âm i = -1, trong Python i % 5 cho kết quả bằng 4 (rất tiện để lấy phần tử cuối). Nhưng nếu bạn chuyển code này sang C/Java/JS, (-1) % 5 sẽ ra -1 và làm chương trình bị sập vì IndexOutOfBoundsException! Hãy luôn chú ý sự khác biệt này.'
      }
    ],
    tips: [
      {
        title: '💡 Điểm nối tư duy: Liên hệ với Bài 0.1 và 0.3',
        content: 'Để hiểu sâu cơ chế bù hai (Two\'s complement) và cách máy tính biểu diễn số nhị phân dưới thanh ghi phần cứng trước khi CPython bọc thành đối tượng PyLongObject, hãy xem lại [Phần 0: Nền tảng Python (Bài 0.1 - Máy tính lưu trữ thông tin thế nào và Bài 0.3 - id() vs is)].'
      },
      {
        title: 'Sử dụng dấu gạch dưới _ để code dễ đọc hơn',
        content: 'Python cho phép chèn dấu gạch dưới `_` ở bất kỳ đâu giữa các chữ số: `1_000_000` (một triệu), `0xFF_FF_FF_FF`, `0b1111_0000`. Dấu gạch dưới hoàn toàn không ảnh hưởng đến giá trị và hiệu năng.'
      }
    ],
    deepDive: {
      title: 'Bên trong CPython Internals: Cấu trúc PyLongObject và Small Integer Cache',
      content: `
        <p>Trong mã nguồn C của CPython (file <code>Include/cpython/longintrepr.h</code>), số nguyên được định nghĩa bằng cấu trúc <code>PyLongObject</code>:</p>
        <pre class="code-pre"><code>struct _longobject {
    PyObject_HEAD
    _PyLongValue long_value;
};</code></pre>
        <p>Mỗi con số không được lưu dưới dạng 64-bit đơn thuần, mà là một mảng các <em>digits</em>: trên hệ điều hành 64-bit, mỗi digit chứa <strong>30 bit</strong> dữ liệu (giữ lại 2 bit để chống tràn khi cộng nhân). Khi một con số vượt qua $2^{30}$, CPython sẽ cấp phát thêm một digit thứ hai, thứ ba... theo kỹ thuật mảng động.</p>
        <p><strong>Cơ chế Bộ nhớ đệm số nhỏ (Small Integer Caching):</strong> Khi CPython khởi động, nó tự động tạo sẵn một mảng cố định chứa 262 đối tượng số nguyên liên tiếp từ <strong>-5 đến 256</strong> (gọi là <code>small_ints</code>). Mọi phép tính trong chương trình sinh ra số trong khoảng này đều trỏ về một con trỏ duy nhất để tiết kiệm RAM. Đó là lý do <code>a = 100; b = 100; a is b</code> luôn là <code>True</code>.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Xác định số bit và đổi cơ số',
      problem: 'Cho số nguyên `n = 2026`. Hãy in ra dạng nhị phân, dạng hex của `n`, đếm xem `n` cần ít nhất bao nhiêu bit để lưu trữ và có bao nhiêu bit 1 đang bật.',
      hint: 'Dùng `bin(n)`, `hex(n)`, `n.bit_length()` và `n.bit_count()`.',
      solutionCode: `n = 2026

print("Nhị phân   :", bin(n))
print("Hex        :", hex(n))
print("bit_length :", n.bit_length())
print("bit_count  :", n.bit_count())`,
      solutionOutput: `Nhị phân   : 0b11111101010
Hex        : 0x7ea
bit_length : 11
bit_count  : 8`,
      explanation: 'Số 2026 chuyển sang nhị phân là 11111101010b có độ dài 11 bit, trong đó có đúng 8 chữ số 1.'
    },
    {
      level: 'Vừa',
      title: 'Viết hàm đồng hồ quay ngược an toàn với modulo',
      problem: 'Một mặt đồng hồ có 12 số (từ 0 đến 11). Hãy viết hàm `clock_move(current_hour, step)` tính giờ mới sau khi di chuyển `step` bước (step có thể là số dương đi tới, hoặc số âm đi lùi). Hãy giải thích vì sao công thức của Python hoạt động hoàn hảo cho cả `step` âm.',
      hint: 'Dùng phép chia dư `(current_hour + step) % 12`.',
      solutionCode: `def clock_move(current_hour, step):
    return (current_hour + step) % 12

print("Bắt đầu lúc 3h, tiến 5 tiếng :", clock_move(3, 5))
print("Bắt đầu lúc 2h, lùi 4 tiếng  :", clock_move(2, -4))
print("Bắt đầu lúc 0h, lùi 1 tiếng  :", clock_move(0, -1))`,
      solutionOutput: `Bắt đầu lúc 3h, tiến 5 tiếng : 8
Bắt đầu lúc 2h, lùi 4 tiếng  : 10
Bắt đầu lúc 0h, lùi 1 tiếng  : 11`,
      explanation: 'Khi lùi 4 tiếng từ 2h, ta có (2 - 4) % 12 = -2 % 12 = 10. Nhờ quy tắc Floor Division làm tròn về âm vô cực, số dư của Python luôn dương trong [0, 11], đưa ra kết quả 10h chuẩn xác mà không cần câu lệnh if rườm rà!'
    },
    {
      level: 'Khó',
      title: 'Kiểm tra tính an toàn của Small Integer Cache trong CPython',
      problem: 'Hãy viết đoạn script kiểm tra xem trên phiên bản Python của bạn, các số nguyên trong đoạn nào thì có cùng địa chỉ ô nhớ (`is`), và chứng minh rằng ngoài khoảng đó thì `is` sẽ thất bại dù `==` vẫn đúng.',
      hint: 'Dùng hàm `id()` và toán tử `is` với các mốc -6, -5, 256, 257.',
      solutionCode: `def test_cache(val):
    # Tạo giá trị thông qua phép tính toán học để tránh tối ưu hóa hằng số của compiler
    a = int(str(val))
    b = int(str(val))
    return (a == b), (a is b), (id(a) == id(b))

for num in [-6, -5, 0, 256, 257]:
    eq, same_obj, same_id = test_cache(num)
    print(f"Số {num:4}: a == b là {str(eq):5} | a is b là {str(same_obj):5} | Cùng địa chỉ RAM: {same_id}")`,
      solutionOutput: `Số   -6: a == b là True  | a is b là False | Cùng địa chỉ RAM: False
Số   -5: a == b là True  | a is b là True  | Cùng địa chỉ RAM: True
Số    0: a == b là True  | a is b là True  | Cùng địa chỉ RAM: True
Số  256: a == b là True  | a is b là True  | Cùng địa chỉ RAM: True
Số  257: a == b là True  | a is b là False | Cùng địa chỉ RAM: False`,
      explanation: 'Kết quả chứng minh chính xác phạm vi bộ đệm số nguyên nhỏ của CPython là từ [-5, 256]. Ngoài khoảng này (-6 và 257), hai số hoàn toàn bằng nhau về giá trị (== True) nhưng là hai thực thể khác nhau trên RAM (is False).'
    }
  ],

  quiz: [
    {
      question: 'Điều gì xảy ra khi bạn thực hiện phép tính `2**63 - 1 + 1` trên phiên bản CPython 64-bit?',
      options: [
        'Tràn số thành số âm `-9223372036854775808` như ngôn ngữ C.',
        'Ném lỗi `OverflowError: integer overflow`.',
        'Tự động mở rộng bộ nhớ để cho ra kết quả chính xác `9223372036854775808`.',
        'Chuyển đổi ngầm định thành số thực `float`.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python 3, kiểu int có độ chính xác tùy ý (arbitrary-precision) và tự động mở rộng theo nhu cầu, không bao giờ bị tràn số nguyên.'
    },
    {
      question: 'Kết quả của hai biểu thức `-11 // 3` và `-11 % 3` trong Python lần lượt là gì?',
      options: [
        '`-3` và `-2`',
        '`-4` và `1`',
        '`-4` và `-2`',
        '`-3` và `1`'
      ],
      correctIndex: 1,
      explanation: 'Phép // làm tròn về phía âm vô cực: -11 / 3 = -3.666..., làm tròn xuống là -4. Số dư là -11 - (-4 * 3) = 1 (luôn mang dấu dương của số chia 3).'
    },
    {
      question: 'Tại sao CPython đặt ra giới hạn mặc định `sys.set_int_max_str_digits(4300)`?',
      options: [
        'Vì bộ nhớ RAM của máy tính không thể chứa số có trên 4300 chữ số.',
        'Vì thuật toán chuyển đổi chuỗi ↔ số nguyên thập phân có độ phức tạp $O(N^2)$, có thể bị lợi dụng để tấn công từ chối dịch vụ (DoS) CPU.',
        'Vì chuẩn IEEE quy định như vậy.',
        'Vì màn hình terminal không hiển thị được quá 4300 ký tự.'
      ],
      correctIndex: 1,
      explanation: 'Đây là bản vá bảo mật CVE-2020-10735: chuyển đổi chuỗi thập phân sang Bignum tốn thời gian bậc hai $O(N^2)$, có thể làm nghẽn toàn bộ luồng xử lý web server nếu kẻ xấu gửi một con số hàng triệu ký tự.'
    },
    {
      question: 'Đoạn mã sau in ra kết quả gì trong CPython chuẩn? `a = 500; b = 500; print(a is b)`',
      options: [
        'Luôn luôn in ra `True`.',
        'Luôn luôn ném lỗi `SyntaxError`.',
        'Thường in ra `False` (ngoại trừ trường hợp tối ưu hóa dòng lệnh đơn), vì 500 vượt ngoài khoảng đệm [-5, 256].',
        'In ra `None`.'
      ],
      correctIndex: 2,
      explanation: 'Số 500 nằm ngoài khoảng Small Integer Cache [-5, 256] của CPython nên hai biến a và b trỏ tới 2 đối tượng riêng biệt trên heap, khiến toán tử is trả về False.'
    }
  ],

  summary: [
    'Số nguyên `int` trong Python 3 có độ chính xác tùy ý (Bignum), không bao giờ bị tràn số và là đối tượng bất biến.',
    'Python dùng Floor Division (làm tròn về $-\infty$), đảm bảo đẳng thức $a = (a // b) * b + (a \% b)$ và số dư $a \% b$ luôn cùng dấu với số chia $b$.',
    '`pow(base, exp, mod)` chạy bằng thuật toán lũy thừa modulo nhanh, không gây bùng nổ RAM.',
    'Small Integer Cache [-5, 256] là chi tiết cài đặt riêng của CPython — TUYỆT ĐỐI không dùng `is` để so sánh giá trị số.'
  ]
};
