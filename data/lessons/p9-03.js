export default {
  id: 'p9-03',
  partId: 'part-1',
  partTitle: 'Phần 1 – Các kiểu số trong Python',
  number: '1.3',
  title: 'Số thực float: Chuẩn IEEE 754 & Cạm bẫy Dấu phẩy động',
  subtitle: 'Mổ xẻ 64 bit binary64, giải mã 0.1 + 0.2 != 0.3, epsilon máy, khoảng cách ULP và cơ chế Banker’s Rounding',
  level: 'Chuyên sâu',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: 'ieee754-inspector',

  objectives: [
    'Nắm vững cấu trúc 64 bit của số thực theo chuẩn quốc tế IEEE 754 binary64 (1 bit dấu, 11 bit mũ, 52 bit phần định trị).',
    'Giải thích bản chất gốc rễ vì sao `0.1 + 0.2 != 0.3` dưới góc nhìn phân số nhị phân tuần hoàn, phá bỏ quan niệm sai lầm "Python bị lỗi".',
    'Hiểu khái niệm Machine Epsilon (`sys.float_info.epsilon`) và hiện tượng số float bị "thưa dần" khi vượt mốc $2^{53}$.',
    'Làm chủ các giá trị đặc biệt (`inf`, `nan`, `-0.0`) và kỹ thuật so sánh số thực an toàn bằng `math.isclose()`.',
    'Hiểu thấu đáo thuật toán làm tròn chẵn lẻ (Banker’s Rounding) của `round()` và nguồn gốc kết quả gây sốc của `round(2.675, 2)`.',
    'Sử dụng thành thạo các công cụ soi số thực trong Python: `float.hex()`, `float.as_integer_ratio()`, `sys.float_info`.'
  ],

  intuition: {
    title: 'Phân số một phần ba và Chiếc kính lúp nhị phân',
    metaphor: 'Trong hệ thập phân (cơ số 10), bạn không thể nào viết chính xác phân số $1/3$ bằng một số thập phân hữu hạn: nó sẽ là $0.333333...$ kéo dài vô tận. Máy tính hoạt động ở hệ nhị phân (cơ số 2, các lũy thừa của 2 như 1/2, 1/4, 1/8, 1/16...). Phân số $1/10$ ($0.1$) trong hệ nhị phân cũng rơi vào bi kịch y hệt như $1/3$ trong hệ 10: nó là dãy nhị phân tuần hoàn vô hạn $0.0001100110011..._2$! Khi máy tính buộc phải cắt cụt nó ở bit thứ 53, một hạt bụi sai số siêu vi đã ra đời. Python không hề tính sai, máy tính chỉ đang làm tròn theo đúng định luật vật lý nhị phân!',
    visualHtml: `
      <div style="font-family:var(--font-mono);font-size:0.85rem;padding:12px;background:var(--bg-code);color:var(--text-inverse);border-radius:8px;line-height:1.7;">
        <div style="color:var(--syn-keyword);font-weight:700;">CẤU TRÚC 64 BIT IEEE 754 (binary64) CỦA float:</div>
        <div style="display:flex;gap:4px;margin-top:8px;flex-wrap:wrap;">
          <span style="background:#ef4444;padding:4px 8px;border-radius:4px;" title="1 bit dấu">Sign (1b)</span>
          <span style="background:#f59e0b;padding:4px 12px;border-radius:4px;color:#000;" title="11 bit số mũ (bias 1023)">Exponent (11b)</span>
          <span style="background:#3b82f6;padding:4px 16px;border-radius:4px;flex:1;text-align:center;" title="52 bit định trị + 1 bit ngầm định">Fraction / Mantissa (52b)</span>
        </div>
        <div style="font-size:0.75rem;color:var(--syn-comment);margin-top:6px;">
          Công thức: $(-1)^{\\text{sign}} \\times 2^{(\\text{exponent} - 1023)} \\times (1 + \\text{fraction})$
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Cấu trúc 64 bit IEEE 754 & Nguồn gốc thực sự của 0.1 + 0.2 != 0.3',
      badge: 'Chuẩn IEEE 754 binary64',
      content: `
        <p>Kiểu <code>float</code> trong Python tương đương với kiểu <code>double</code> trong C/C++ và Java — tuân thủ nghiêm ngặt theo chuẩn quốc tế <strong>IEEE 754 binary64</strong>. Mỗi số float chiếm đúng 8 byte (64 bit) trong bộ nhớ, chia làm 3 trường:</p>
        <ul>
          <li><strong>Bit 63 (1 bit dấu - Sign):</strong> <code>0</code> là số dương, <code>1</code> là số âm.</li>
          <li><strong>Bit 62 đến 52 (11 bit số mũ - Exponent):</strong> Lưu số mũ có độ lệch (bias = 1023), giúp biểu diễn từ $2^{-1022}$ đến $2^{1023}$.</li>
          <li><strong>Bit 51 đến 0 (52 bit phần định trị - Mantissa/Fraction):</strong> Phần lẻ sau dấu chấm nhị phân. Kết hợp với 1 bit ngầm định (implicit leading bit <code>1.</code>), số float có tổng cộng <strong>53 bit độ chính xác</strong> (tương đương khoảng 15 đến 17 chữ số thập phân).</li>
        </ul>
        <p>Khi bạn gõ <code>0.1</code>, CPython chuyển con số này sang nhị phân. Do không thể lưu tuần hoàn vô tận, bit thứ 53 được làm tròn, tạo thành giá trị thực tế:</p>
        <p style="font-family:var(--font-mono);font-size:0.85rem;background:var(--bg-surface-alt);padding:8px;border-radius:6px;">
          0.1 lưu thực tế = <strong>0.1000000000000000055511151231257827021181583404541015625</strong><br/>
          0.2 lưu thực tế = <strong>0.200000000000000011102230246251565404236316680908203125</strong><br/>
          Tổng 0.1 + 0.2 &nbsp;= <strong>0.3000000000000000444089209850062616169452667236328125</strong>
        </p>
      `,
      codeExamples: [
        {
          title: 'Soi từng chữ số thập phân siêu vi bên trong 0.1, 0.2 và 0.3',
          code: `from decimal import Decimal

# Dùng Decimal để in ra CHÍNH XÁC giá trị nhị phân mà float đang lưu
print("0.1 thực chất là:", Decimal(0.1))
print("0.2 thực chất là:", Decimal(0.2))
print("0.3 thực chất là:", Decimal(0.3))

sum_val = 0.1 + 0.2
print("0.1 + 0.2 == 0.3 ?", sum_val == 0.3)
print("0.1 + 0.2 hiển thị :", sum_val)
print("Sai số chênh lệch   :", repr(sum_val - 0.3))`,
          output: `0.1 thực chất là: 0.1000000000000000055511151231257827021181583404541015625
0.2 thực chất là: 0.200000000000000011102230246251565404236316680908203125
0.3 thực chất là: 0.299999999999999988897769753748434595763683319091796875
0.1 + 0.2 == 0.3 ? False
0.1 + 0.2 hiển thị : 0.30000000000000004
Sai số chênh lệch   : 5.551115123125783e-17`,
          annotations: [
            { line: 4, text: 'Decimal(0.1) khi nhận float sẽ bóc tách đúng 100% từng chữ số nhị phân được lưu trên phần cứng.' },
            { line: 8, text: 'sum_val == 0.3 là False vì 0.1+0.2 hơi lớn hơn 0.3 khoảng 5.55e-17.' },
            { line: 10, text: 'Sai số này bằng đúng 1 ULP (khoảng cách 1 bit cuối cùng ở hàng đơn vị nhị phân).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Machine Epsilon và Hiện tượng "Thưa Dần" của Số Thực (> 2**53)',
      badge: 'sys.float_info & ULP',
      content: `
        <p>Khoảng cách giữa các số float liền kề nhau được gọi là <strong>ULP (Unit in the Last Place)</strong>. Vì số lượng bit định trị là cố định (52 bit), khi số thực càng lớn (số mũ càng cao), khoảng cách giữa hai số float kế tiếp <strong>càng bị kéo giãn ra</strong>!</p>
        <ul>
          <li><strong>Epsilon máy (Machine Epsilon):</strong> Là khoảng cách giữa <code>1.0</code> và số float kế tiếp ngay sau nó. Trong Python, giá trị này lưu tại <code>sys.float_info.epsilon</code> và bằng $2^{-52} \approx 2.22 \times 10^{-16}$.</li>
          <li><strong>Mốc giới hạn $2^{53}$ ($9{,}007{,}199{,}254{,}740{,}992$):</strong>
            <ul>
              <li>Từ $0$ đến $2^{53}$, kiểu float có đủ bit để biểu diễn chính xác <em>toàn bộ</em> các số nguyên liên tiếp.</li>
              <li>Khi vượt qua $2^{53}$, khoảng cách giữa 2 số float kế tiếp tăng lên thành <strong>$2.0$</strong>! Lúc này, float <strong>không thể biểu diễn được các số nguyên lẻ nữa</strong>!</li>
              <li>Nếu bạn viết <code>float(2**53) == float(2**53 + 1)</code>, Python sẽ trả về <strong><code>True</code></strong>!</li>
            </ul>
          </li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khảo sát sys.float_info và thử nghiệm mất mát số nguyên trên float',
          code: `import sys

print("Machine Epsilon :", sys.float_info.epsilon)
print("Số dương nhỏ nhất:", sys.float_info.min)
print("Số dương lớn nhất:", sys.float_info.max)

# Thử nghiệm mốc 2**53
limit = 2 ** 53  # 9,007,199,254,740,992
f1 = float(limit)
f2 = float(limit + 1)  # Số nguyên lẻ kế tiếp
f3 = float(limit + 2)  # Số nguyên chẵn kế tiếp

print("f1 == f2 (limit == limit + 1)?", f1 == f2)
print("f1 == f3 (limit == limit + 2)?", f1 == f3)
print(f"Khoảng cách giữa f1 và f3: {f3 - f1}")`,
          output: `Machine Epsilon : 2.220446049250313e-16
Số dương nhỏ nhất: 2.2250738585072014e-308
Số dương lớn nhất: 1.7976931348623157e+308
f1 == f2 (limit == limit + 1)? True
f1 == f3 (limit == limit + 2)? False
Khoảng cách giữa f1 và f3: 2.0`,
          annotations: [
            { line: 3, text: 'sys.float_info.epsilon là khoảng cách nhỏ nhất giữa 1.0 và số float tiếp theo.' },
            { line: 12, text: 'f1 == f2 trả về True! Do thiếu bit định trị, 2**53 + 1 bị làm tròn về lại 2**53.' },
            { line: 14, text: 'Bước nhảy ULP tại vùng này đã giãn rộng thành 2.0.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Các giá trị đặc biệt (inf, nan, -0.0) và So sánh đúng bằng math.isclose()',
      badge: 'inf · nan · math.isclose',
      content: `
        <p>Chuẩn IEEE 754 định nghĩa các mẫu bit đặc biệt đại diện cho trạng thái ngoại lệ:</p>
        <ul>
          <li><strong>Dương/Âm vô cực (<code>inf</code>, <code>-inf</code>):</strong> Sinh ra khi một phép toán vượt quá ngưỡng <code>sys.float_info.max</code> (ví dụ <code>1e308 * 10</code>) hoặc <code>float("inf")</code>. Mọi số hữu hạn cộng với <code>inf</code> vẫn là <code>inf</code>.</li>
          <li><strong>Không phải là số (<code>nan</code> — Not a Number):</strong> Sinh ra từ phép toán vô định như <code>0.0 / 0.0</code> hoặc <code>float("nan")</code>.
            <br/><strong>Đặc tính độc nhất vô nhị:</strong> <code>nan</code> KHÔNG BẰNG BẤT CỨ THỨ GÌ, <strong>kể cả chính nó</strong>! Biểu thức <code>float("nan") == float("nan")</code> luôn trả về <strong><code>False</code></strong>! Để kiểm tra, bắt buộc dùng hàm <code>math.isnan(x)</code>.
          </li>
          <li><strong>Số 0 âm (<code>-0.0</code>):</strong> Trong biểu diễn bit, bit dấu bằng 1 và tất cả bit còn lại bằng 0. Trong toán học $0.0 == -0.0$ là <code>True</code>, nhưng khi chia sẽ phân biệt: <code>1.0 / 0.0 == inf</code> còn <code>1.0 / -0.0 == -inf</code>.</li>
          <li><strong>So sánh số thực đúng chuẩn với <code>math.isclose(a, b)</code>:</strong> Tuyệt đối không dùng <code>a == b</code> để so sánh hai số thực tính toán! Hãy dùng <code>math.isclose(a, b, rel_tol=1e-9)</code> để cho phép dung sai sai số nhị phân.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Hành vi của inf, nan, -0.0 và cách so sánh chuẩn mực',
          code: `import math

# 1. Hành vi của nan (Not a Number)
x = float("nan")
print("nan == nan ?       ", x == x)
print("math.isnan(x) ?    ", math.isnan(x))

# 2. Số 0 âm (-0.0)
pos_zero = 0.0
neg_zero = -0.0
print("0.0 == -0.0 ?      ", pos_zero == neg_zero)
print("1 / 0.0 vs 1 / -0.0:", 1.0 / pos_zero, "vs", 1.0 / neg_zero)

# 3. So sánh đúng chuẩn bằng math.isclose
a = 0.1 + 0.2
b = 0.3
print("So sánh bằng ==    :", a == b)
print("So sánh bằng isclose:", math.isclose(a, b))`,
          output: `nan == nan ?        False
math.isnan(x) ?     True
0.0 == -0.0 ?       True
1 / 0.0 vs 1 / -0.0: inf vs -inf
So sánh bằng ==    : False
So sánh bằng isclose: True`,
          annotations: [
            { line: 5, text: 'nan là giá trị duy nhất trong Python không bằng chính nó (phù hợp chuẩn IEEE 754).' },
            { line: 11, text: 'Phép chia cho 0.0 và -0.0 trong float sinh ra inf và -inf tương ứng.' },
            { line: 16, text: 'math.isclose() kiểm tra |a - b| <= max(rel_tol * max(|a|, |b|), abs_tol).' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Cơ chế Banker’s Rounding & Bí ẩn tại sao round(2.675, 2) ra 2.67',
      badge: 'Bí ẩn round(2.675, 2)',
      content: `
        <p>Hàm <code>round(x, n)</code> trong Python 3 sử dụng chiến lược <strong>Làm tròn về số chẵn gần nhất (Round half to even / Banker’s Rounding)</strong>:</p>
        <ul>
          <li>Nếu phần phân vân nằm chính giữa (ví dụ kết thúc bằng <code>.5</code>), Python sẽ làm tròn về phía <strong>số chẵn</strong> gần nhất: <code>round(2.5) == 2</code>, và <code>round(3.5) == 4</code>!</li>
          <li><strong>Lý do của nhà băng:</strong> Trong thống kê và ngân hàng, nếu luôn làm tròn lên (như cách dạy ở trường tiểu học), sau hàng triệu giao dịch, tổng tài sản sẽ bị thổi phồng lệch dương. Làm tròn chẵn lẻ giúp các phép làm tròn triệt tiêu lẫn nhau, giữ kỳ vọng toán học trung bình không đổi.</li>
        </ul>
        <p><strong>Vậy tại sao <code>round(2.675, 2)</code> lại bằng <code>2.67</code> chứ không phải <code>2.68</code>?</strong></p>
        <p>Rất nhiều người đổ lỗi do Banker’s Rounding làm tròn về số 7 lẻ là sai. Nhưng sự thật không phải vậy! Nguyên nhân đến từ <strong>Lớp 1</strong>: Trong chuẩn IEEE 754, con số <code>2.675</code> không thể biểu diễn chính xác. Giá trị thực tế được lưu trong thanh ghi phần cứng là:</p>
        <p style="font-family:var(--font-mono);font-size:0.88rem;background:var(--bg-surface-alt);padding:8px;border-radius:6px;">
          2.675 thực chất = <strong>2.67499999999999982236431605997495353221893310546875</strong>
        </p>
        <p>Vì con số thực tế <strong>nhỏ hơn 2.675 một chút</strong>, điểm làm tròn nằm nghiêng về phía dưới chứ không hề nằm ở chính giữa! Do đó, Python làm tròn xuống <strong><code>2.67</code></strong> là hoàn toàn chính xác theo đúng giá trị số học đang lưu trữ!</p>
        <p>Hai công cụ tuyệt vời để soi rõ bản chất số float:</p>
        <ul>
          <li><code>x.hex()</code>: Trả về chuỗi biểu diễn hex nhị phân chính xác tuyệt đối (ví dụ <code>(2.675).hex()</code>).</li>
          <li><code>x.as_integer_ratio()</code>: Biến số float thành phân số tử/mẫu nguyên vẹn <code>(numerator, denominator)</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khám phá Banker’s Rounding và soi số bằng hex(), as_integer_ratio()',
          code: `from decimal import Decimal

# 1. Banker's Rounding: Nửa phân vân làm tròn về chẵn
print("round(0.5) =", round(0.5))  # Chẵn 0
print("round(1.5) =", round(1.5))  # Chẵn 2
print("round(2.5) =", round(2.5))  # Chẵn 2
print("round(3.5) =", round(3.5))  # Chẵn 4

# 2. Giải mã bí ẩn round(2.675, 2)
print("round(2.675, 2)      =", round(2.675, 2))
print("Giá trị float thực tế:", Decimal(2.675))
print("Dạng float.hex()     :", (2.675).hex())
print("as_integer_ratio()   :", (2.675).as_integer_ratio())`,
          output: `round(0.5) = 0
round(1.5) = 2
round(2.5) = 2
round(3.5) = 4
round(2.675, 2)      = 2.67
Giá trị float thực tế: 2.67499999999999982236431605997495353221893310546875
Dạng float.hex()     : 0x1.5666666666666p+1
as_integer_ratio()   : (6023307641170821, 2251799813685248)`,
          annotations: [
            { line: 4, text: 'round(2.5) và round(1.5) đều bằng 2 vì 2 là số nguyên chẵn gần nhất.' },
            { line: 9, text: 'Giá trị thực tế là 2.67499... < 2.675 nên việc làm tròn thành 2.67 là hoàn toàn chuẩn xác!' },
            { line: 12, text: 'as_integer_ratio() biến float thành phân số chính xác không sai một phần tỷ.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Dùng float để tính tiền và số dư tài khoản',
        content: 'Tuyệt đối không dùng kiểu float cho tiền tệ! Sai số tích lũy từ các phép tính cộng dồn hàng nghìn giao dịch sẽ khiến tài khoản bị lệch vài cent hay vài đồng, dẫn đến kiểm toán tài chính thất bại. Trong tài chính, luôn dùng decimal.Decimal.'
      },
      {
        title: 'Dùng toán tử == để so sánh hai số float sau tính toán',
        content: 'Biểu thức 0.1 + 0.2 == 0.3 trả về False. Nếu dùng trong câu lệnh if bill_total == expected_total:, chương trình của bạn sẽ có bug ngầm cực kỳ khó truy vết. Luôn dùng math.isclose(a, b).'
      }
    ],
    tips: [
      {
        title: '💡 Điểm nối tư duy: Vì sao 0.1 nhị phân bị tuần hoàn?',
        content: 'Hãy ôn lại [Phần 0: Nền tảng Python (Bài 0.1 - Mục nhị phân và phân số tuần hoàn)] để nhớ lại nguyên lý cơ bản: Một phân số tối giản chỉ biểu diễn được dưới dạng số thập phân hữu hạn nếu mẫu số chỉ có ước là 2 và 5. Trong hệ nhị phân (chỉ có cơ số 2), các phân số có mẫu số chia hết cho 5 như 1/10 (0.1) bắt buộc phải biến thành dãy số nhị phân lặp vô hạn!'
      },
      {
        title: 'Cách làm tròn kiểu học sinh truyền thống (Half Up)',
        content: 'Nếu bài toán kinh doanh bắt buộc làm tròn 0.5 luôn lên (ví dụ 2.675 phải ra 2.68), hãy dùng `decimal.Decimal` kết hợp cờ làm tròn `ROUND_HALF_UP`: `Decimal("2.675").quantize(Decimal("0.01"), rounding=ROUND_HALF_UP) == Decimal("2.68")`.'
      }
    ],
    deepDive: {
      title: 'Bên trong CPython: Thuật toán in float ngắn nhất và chính xác nhất (dtoa / David Gay)',
      content: `
        <p>Trước Python 3.1, khi bạn gõ <code>0.1</code> trên REPL, Python sẽ in ra: <code>0.10000000000000001</code> khiến người mới học rất hoang mang.</p>
        <p>Từ Python 3.1 trở đi, CPython tích hợp thuật toán thông minh của David Gay (<code>dtoa.c</code>). Thuật toán này tìm kiếm <strong>chuỗi thập phân ngắn nhất</strong> mà khi đọc ngược lại vào chuẩn IEEE 754 64-bit, nó trả về đúng chính xác số float đó trong bộ nhớ. Vì <code>0.10000000000000000555...</code> gần <code>0.1</code> hơn bất kỳ số float lân cận nào khác, CPython quyết định in ra chuỗi đẹp mắt là <code>0.1</code>!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'So sánh số thực an toàn với math.isclose',
      problem: 'Cho ba số thực `a = 0.1 * 3`, `b = 0.3`, `c = 0.3000000001`. Hãy so sánh `a` với `b` bằng toán tử `==` và bằng `math.isclose()`. Sau đó hãy kiểm tra xem `b` và `c` có được coi là gần bằng nhau với dung sai mặc định không.',
      hint: 'Dùng `math.isclose(a, b)` và `math.isclose(b, c)`.',
      solutionCode: `import math

a = 0.1 * 3
b = 0.3
c = 0.3000000001

print("a == b                :", a == b)
print("math.isclose(a, b)    :", math.isclose(a, b))
print("math.isclose(b, c)    :", math.isclose(b, c))
print("math.isclose(b, c, 1e-8):", math.isclose(b, c, rel_tol=1e-8))`,
      solutionOutput: `a == b                : False
math.isclose(a, b)    : True
math.isclose(b, c)    : False
math.isclose(b, c, 1e-8): True`,
      explanation: 'a và b lệch nhau cỡ 1e-17 nên isclose() với sai số mặc định rel_tol=1e-9 nhận diện đúng là bằng nhau. b và c lệch nhau ở hàng thứ 10 (1e-10) nên với rel_tol=1e-9 là False, nhưng nới lỏng rel_tol=1e-8 thì là True.'
    },
    {
      level: 'Vừa',
      title: 'Tìm số nguyên lẻ đầu tiên bị float "bỏ rơi"',
      problem: 'Hãy viết vòng lặp kiểm tra từ $2^{53}$ để tìm ra số nguyên dương $N$ nhỏ nhất sao cho `float(N) == float(N + 1)`. In ra số $N$ đó và giá trị phân số nhị phân của nó bằng `float.as_integer_ratio()`.',
      hint: 'Bắt đầu từ `N = 2**53`.',
      solutionCode: `N = 2 ** 53
print(f"Bắt đầu tại 2**53 = {N}")

while True:
    if float(N) == float(N + 1):
        print(f"Tìm thấy N lẻ bị bỏ rơi: {N}")
        print(f"float(N)   = {float(N)}")
        print(f"float(N+1) = {float(N+1)}")
        print(f"as_integer_ratio của float(N): {float(N).as_integer_ratio()}")
        break
    N += 1`,
      solutionOutput: `Bắt đầu tại 2**53 = 9007199254740992
Tìm thấy N lẻ bị bỏ rơi: 9007199254740992
float(N)   = 9007199254740992.0
float(N+1) = 9007199254740992.0
as_integer_ratio của float(N): (9007199254740992, 1)`,
      explanation: 'Ngay tại $N = 2^{53} = 9{,}007{,}199{,}254{,}740{,}992$, việc chuyển $N + 1$ sang float đã bị làm tròn ngược lại về $N$ vì không còn bit để lưu chữ số 1 lẻ cuối cùng.'
    },
    {
      level: 'Khó',
      title: 'Tự cài đặt hàm tách 64 bit IEEE 754 từ số float',
      problem: 'Hãy viết hàm `inspect_float_bits(val)` sử dụng module `struct` tích hợp của Python để bóc tách một số float thành: 1 bit dấu (sign), 11 bit số mũ (exponent) dạng số nguyên và 52 bit định trị (fraction) dạng chuỗi nhị phân.',
      hint: 'Dùng `struct.pack(">d", val)` để lấy 8 byte nhị phân lớn trước (big-endian), sau đó dùng phép toán bit.',
      solutionCode: `import struct

def inspect_float_bits(val):
    # Đóng gói float 64-bit thành 8 byte nguyên bản
    raw_bytes = struct.pack(">d", val)
    # Đọc lại thành số nguyên không dấu 64-bit
    (int_val,) = struct.unpack(">Q", raw_bytes)
    
    sign = (int_val >> 63) & 1
    exponent = (int_val >> 52) & 0x7FF
    fraction = int_val & 0xFFFFFFFFFFFFF
    
    return {
        "val": val,
        "sign": sign,
        "exponent_raw": exponent,
        "exponent_unbiased": exponent - 1023 if exponent != 0 else -1022,
        "fraction_bin": f"{fraction:052b}"
    }

info = inspect_float_bits(0.1)
print(f"Số float: {info['val']}")
print(f"Bit dấu (Sign): {info['sign']}")
print(f"Số mũ thô (Exponent raw): {info['exponent_raw']} (Số mũ thực: {info['exponent_unbiased']})")
print(f"52 bit định trị: {info['fraction_bin'][:20]}...")`,
      solutionOutput: `Số float: 0.1
Bit dấu (Sign): 0
Số mũ thô (Exponent raw): 1019 (Số mũ thực: -4)
52 bit định trị: 10011001100110011001...`,
      explanation: 'Số 0.1 có số mũ thực là -4 ($2^{-4} = 1/16 = 0.0625$). Phần định trị lặp chuỗi bit 100110011001... tuần hoàn vô tận, chứng minh 100% bản chất tuần hoàn của 0.1 trong chuẩn IEEE 754!'
    }
  ],

  quiz: [
    {
      question: 'Chuẩn IEEE 754 binary64 của số float trong Python phân bổ 64 bit như thế nào?',
      options: [
        '1 bit dấu, 8 bit số mũ, 55 bit định trị.',
        '1 bit dấu, 11 bit số mũ, 52 bit định trị.',
        '2 bit dấu, 14 bit số mũ, 48 bit định trị.',
        '1 bit dấu, 15 bit số mũ, 48 bit định trị.'
      ],
      correctIndex: 1,
      explanation: 'Chuẩn double precision IEEE 754 phân bổ chính xác: 1 bit sign, 11 bit exponent, và 52 bit fraction (kèm 1 bit ngầm định là 53 bit).'
    },
    {
      question: 'Biểu thức `float("nan") == float("nan")` trả về kết quả gì trong Python?',
      options: [
        '`True`',
        '`False`',
        '`None`',
        'Ném lỗi `ValueError`'
      ],
      correctIndex: 1,
      explanation: 'Theo chuẩn IEEE 754, giá trị nan (Not a Number) không bao giờ bằng bất cứ thứ gì, kể cả chính nó. Kết quả luôn là False. Muốn kiểm tra nan, phải dùng math.isnan().'
    },
    {
      question: 'Tại sao `round(2.675, 2)` lại cho kết quả là `2.67` thay vì `2.68`?',
      options: [
        'Do lỗi thuật toán làm tròn của CPython.',
        'Do Banker’s Rounding luôn làm tròn về số lẻ.',
        'Do trong chuẩn nhị phân 64-bit, 2.675 được lưu thực tế là 2.67499999999999982..., con số này nhỏ hơn 2.675 một chút nên bị làm tròn xuống.',
        'Do Python giới hạn chỉ lấy 1 chữ số thập phân.'
      ],
      correctIndex: 2,
      explanation: 'Giá trị thực tế của 2.675 trong bộ nhớ máy tính là 2.67499999999999982236... Vì nó hơi nhỏ hơn điểm giữa 2.675, nó bị kéo làm tròn xuống 2.67 một cách hoàn toàn tự nhiên theo toán học.'
    },
    {
      question: 'Cách so sánh hai số float sau khi tính toán nào sau đây là CHUẨN MỰC NHẤT?',
      options: [
        '`if a == b:`',
        '`if a is b:`',
        '`if round(a, 6) == round(b, 6):`',
        '`if math.isclose(a, b, rel_tol=1e-9):`'
      ],
      correctIndex: 3,
      explanation: 'Hàm math.isclose() kiểm tra khoảng cách tương đối và tuyệt đối giữa 2 số float, tránh mọi bẫy sai số nhị phân IEEE 754.'
    }
  ],

  summary: [
    'Kiểu `float` là chuẩn IEEE 754 binary64 (1 bit dấu, 11 bit mũ, 52 bit định trị + 1 bit ngầm định = 53 bit chính xác).',
    '`0.1 + 0.2 != 0.3` là hệ quả tất yếu do $1/10$ ở hệ nhị phân là số vô hạn tuần hoàn bị cắt cụt ở bit 53.',
    'Sau $2^{53}$, khoảng cách giữa các số float giãn rộng $> 1.0$, không thể biểu diễn số nguyên lẻ liên tiếp.',
    '`round()` dùng cơ chế Banker’s Rounding (về số chẵn gần nhất); `round(2.675, 2) == 2.67` do giá trị lưu thực tế nhỏ hơn 2.675 một chút.',
    'Luôn dùng `math.isclose()` để so sánh số thực và `Decimal` cho bài toán tài chính.'
  ]
};
