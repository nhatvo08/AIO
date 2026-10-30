export default {
  id: 'p9-05',
  partId: 'part-1',
  partTitle: 'Phần 1 – Các kiểu số trong Python',
  number: '1.5',
  title: 'Số Thập phân Decimal & Số Hữu tỷ Fraction',
  subtitle: 'Độ chính xác tài chính tuyệt đối, Decimal Context, bẫy khởi tạo từ float và phân số hữu tỷ Fraction',
  level: 'Nâng cao',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ module `decimal`: Khái niệm số thập phân chính xác tuyệt đối theo chuẩn General Decimal Arithmetic (IEEE 854).',
    'Điều khiển ngữ cảnh tính toán (Decimal Context): Tùy chỉnh độ chính xác (`prec`) và các chế độ làm tròn (`ROUND_HALF_UP`, `ROUND_HALF_EVEN`, `ROUND_FLOOR`, `ROUND_CEILING`).',
    'Giải thích cặn kẽ vì sao BẮT BUỘC phải khởi tạo từ chuỗi `Decimal("0.1")` thay vì từ số thực `Decimal(0.1)`.',
    'Hiểu cấu trúc và cách dùng `fractions.Fraction` để biểu diễn phân số tối giản chính xác tuyệt đối không làm tròn.',
    'Phân tích bài toán đánh đổi hiệu năng (Performance Trade-offs): Khi nào nên dùng Decimal/Fraction và khi nào phải dùng float.'
  ],

  intuition: {
    title: 'Hóa đơn tiền điện và Chiếc bánh sinh nhật chia 3',
    metaphor: 'Hãy tưởng tượng bạn điều hành một hệ thống thanh toán ngân hàng xử lý 10 triệu giao dịch mỗi ngày. Nếu mỗi giao dịch lệch chỉ 0.00000000000000005 USD do sai số nhị phân của `float`, sau một tháng hệ thống sẽ thất thoát hàng nghìn đô la và không thể vượt qua cuộc kiểm toán độc lập! `Decimal` giống như một kế toán viên cẩn trọng ghi từng con số thập phân lên sổ sách bằng tay — không bao giờ thất thoát một xu. Còn `Fraction`? Nó giống như việc bạn chia chiếc bánh sinh nhật làm 3 phần: thay vì ghi "0.33333 miếng bánh" (bị rơi mất một mẩu vụn), bạn giữ nguyên khái niệm "1 phần 3 chiếc bánh", để khi nhân lại với 3 bạn có trọn vẹn đúng 1 chiếc bánh nguyên vẹn!',
    visualHtml: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:12px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:8px;">
        <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
          <div style="color:var(--py-gold);font-weight:700;">decimal.Decimal("0.1")</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:4px;">
            • Cơ số 10 (Chuẩn IEEE 854)<br/>
            • <code>Decimal('0.1') + Decimal('0.2') == Decimal('0.3')</code> (Chính xác 100%)<br/>
            • Tùy chỉnh làm tròn tài chính <code>ROUND_HALF_UP</code>
          </div>
        </div>
        <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
          <div style="color:var(--success);font-weight:700;">fractions.Fraction(1, 3)</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:4px;">
            • Lưu cặp <code>(numerator, denominator)</code><br/>
            • Tự động tối giản bằng ước chung lớn nhất GCD<br/>
            • <code>Fraction(1, 3) * 3 == 1</code> (Không bao giờ mất mẩu vụn!)
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: decimal.Decimal: Số thập phân chính xác và Cạm bẫy khởi tạo từ float',
      badge: 'Chuẩn IEEE 854 & Khởi tạo',
      content: `
        <p>Khác với <code>float</code> lưu số dưới dạng nhị phân (cơ số 2), <code>decimal.Decimal</code> lưu trữ số dưới dạng <strong>thập phân (cơ số 10)</strong> theo đặc tả <em>General Decimal Arithmetic Specification</em>. Nhờ đó, các con số như $0.1, 0.2, 0.3$ được biểu diễn chính xác hoàn hảo y như con người viết trên giấy!</p>
        <p><strong>Cạm bẫy chí tử số 1 của lập trình viên:</strong></p>
        <div class="callout-box callout-pitfall" style="margin:12px 0;">
          <div class="callout-header"><span>⚠️</span> <span>Khởi tạo Decimal bằng số thực: <code>Decimal(0.1)</code></span></div>
          <div class="callout-body">
            <p>Nếu bạn viết <code>Decimal(0.1)</code> (không có dấu ngoặc kép), Python sẽ đánh giá số <code>0.1</code> thành <code>float</code> nhị phân <strong>TRƯỚC KHI</strong> truyền vào <code>Decimal</code>! Kết quả là bạn đang nạp chính xác con số sai số nhị phân <code>0.1000000000000000055511151231257827021181583404541015625</code> vào trong đối tượng Decimal!</p>
            <p><strong>Quy tắc vàng:</strong> LUÔN LUÔN khởi tạo <code>Decimal</code> từ <strong>CHUỖI VĂN BẢN (<code>str</code>)</strong> hoặc <strong>SỐ NGUYÊN (<code>int</code>)</strong>: <code>Decimal("0.1")</code> hoặc <code>Decimal(10)</code>!</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh khởi tạo từ chuỗi vs khởi tạo từ float',
          code: `from decimal import Decimal

# 1. Khởi tạo chuẩn từ chuỗi: Chính xác tuyệt đối
d1 = Decimal("0.1")
d2 = Decimal("0.2")
d3 = d1 + d2
print("Decimal('0.1') + Decimal('0.2') =", d3)
print("d3 == Decimal('0.3') ?", d3 == Decimal("0.3"))

# 2. Cạm bẫy truyền float vào Decimal
bad_decimal = Decimal(0.1)
print("Bẫy Decimal(0.1):", bad_decimal)

# 3. Khởi tạo từ số nguyên
int_decimal = Decimal(5)
print("Decimal(5) / Decimal(2) =", int_decimal / Decimal(2))`,
          output: `Decimal('0.1') + Decimal('0.2') = 0.3
d3 == Decimal('0.3') ? True
Bẫy Decimal(0.1): 0.1000000000000000055511151231257827021181583404541015625
Decimal(5) / Decimal(2) = 2.5`,
          annotations: [
            { line: 6, text: 'd1 + d2 ra đúng chính xác 0.3, và d3 == Decimal("0.3") trả về True.' },
            { line: 11, text: 'Decimal(0.1) lưu nguyên vẹn phần đuôi sai số 5551115... do nhận float nhị phân.' },
            { line: 15, text: 'Khởi tạo từ int hoàn toàn an toàn vì số nguyên không có sai số nhị phân.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Ngữ cảnh tính toán (Context): Độ chính xác & Chế độ làm tròn',
      badge: 'decimal.getcontext()',
      content: `
        <p>Một sức mạnh vượt trội của <code>Decimal</code> là bạn có thể kiểm soát toàn diện môi trường tính toán thông qua <strong>Context</strong>:</p>
        <ul>
          <li><code>getcontext().prec</code>: Số chữ số có nghĩa (significance precision). Mặc định là <code>28</code> chữ số (cao gấp đôi so với float!). Bạn có thể tăng lên 50, 100 hay 1000 chữ số tùy thích.</li>
          <li><code>getcontext().rounding</code>: Chế độ làm tròn. Các chế độ chuẩn:
            <ul>
              <li><code>ROUND_HALF_EVEN</code> (Mặc định - Banker’s rounding).</li>
              <li><code>ROUND_HALF_UP</code>: Làm tròn 0.5 luôn lên (kiểu thương mại truyền thống mà các ngân hàng và kế toán viên quen dùng).</li>
              <li><code>ROUND_FLOOR</code>: Làm tròn về phía $-\infty$.</li>
              <li><code>ROUND_CEILING</code>: Làm tròn về phía $+\infty$.</li>
            </ul>
          </li>
          <li><code>localcontext()</code>: Context manager cho phép thay đổi tạm thời cấu hình tính toán trong một khối <code>with</code> mà không làm ảnh hưởng đến các luồng khác của chương trình.</li>
          <li><code>quantize()</code>: Phương thức chuyên dụng để làm tròn đến số chữ số thập phân mong muốn (ví dụ 2 chữ số tiền tệ <code>Decimal("0.01")</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Tùy biến độ chính xác cao và làm tròn tài chính với quantize',
          code: `import decimal
from decimal import Decimal, ROUND_HALF_UP, localcontext

# 1. Tùy biến độ chính xác siêu cao với localcontext
with localcontext() as ctx:
    ctx.prec = 50  # 50 chữ số chính xác
    pi_div = Decimal(22) / Decimal(7)
    print("22/7 với 50 chữ số:\\n", pi_div)

# 2. Làm tròn tiền tệ kiểu truyền thống với quantize và ROUND_HALF_UP
price = Decimal("2.675")
# Làm tròn về 2 chữ số thập phân (bước 0.01)
rounded_commercial = price.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
print("2.675 làm tròn thương mại (HALF_UP):", rounded_commercial)

# So sánh với chế độ mặc định ROUND_HALF_EVEN
rounded_banker = price.quantize(Decimal("0.01"))
print("2.675 làm tròn ngân hàng (HALF_EVEN):", rounded_banker)`,
          output: `22/7 với 50 chữ số:
 3.1428571428571428571428571428571428571428571428571
2.675 làm tròn thương mại (HALF_UP): 2.68
2.675 làm tròn ngân hàng (HALF_EVEN): 2.68`,
          annotations: [
            { line: 6, text: 'localcontext() giúp cách ly thiết lập prec=50 an toàn trong phạm vi khối with.' },
            { line: 13, text: 'quantize(Decimal("0.01"), rounding=ROUND_HALF_UP) biến 2.675 thành đúng 2.68!' },
            { line: 17, text: 'Trong Decimal("2.675"), giá trị là CHÍNH XÁC 2.675 (không bị hụt như float), nên ROUND_HALF_EVEN làm tròn về số chẵn 8 kế tiếp cũng là 2.68.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: fractions.Fraction: Biểu diễn Phân số Hữu tỷ Tối giản',
      badge: 'module fractions',
      content: `
        <p>Nếu bạn cần bảo toàn chính xác tuyệt đối các phép chia như $1/3$, $2/7$ mà không muốn bất kỳ sự làm tròn nào diễn ra, thư viện chuẩn trang bị kiểu <strong><code>fractions.Fraction</code></strong>.</p>
        <p>Đặc tính nổi bật của <code>Fraction</code>:</p>
        <ul>
          <li><strong>Lưu trữ dạng cặp số nguyên:</strong> Mỗi đối tượng chứa hai số <code>int</code> bất biến là tử số <code>.numerator</code> và mẫu số <code>.denominator</code>.</li>
          <li><strong>Tự động tối giản:</strong> Ngay tại thời điểm khởi tạo, Python dùng thuật toán Euclid tìm ước chung lớn nhất (GCD) để rút gọn phân số về dạng tối giản nhất (ví dụ <code>Fraction(16, -24)</code> sẽ tự động chuẩn hóa thành <code>Fraction(-2, 3)</code> với mẫu số luôn dương).</li>
          <li><strong>Cách khởi tạo đa dạng:</strong> Khởi tạo từ 2 số nguyên <code>Fraction(1, 3)</code>, từ chuỗi <code>Fraction("3/4")</code> hoặc chuỗi thập phân <code>Fraction("0.75")</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo và tính toán đại số chính xác tuyệt đối với Fraction',
          code: `from fractions import Fraction

# 1. Tự động tối giản phân số và chuẩn hóa dấu
f1 = Fraction(16, -24)
print("Fraction(16, -24) tối giản thành:", f1)
print(f"Tử số: {f1.numerator}, Mẫu số: {f1.denominator}")

# 2. Khởi tạo từ chuỗi phân số và số thập phân
f2 = Fraction("3/7")
f3 = Fraction("0.25")  # 1/4
print("Fraction('0.25')   =", f3)

# 3. Phép tính phân số: Không bao giờ rơi rớt một phần triệu!
third = Fraction(1, 3)
sum_thirds = third + third + third
print("1/3 + 1/3 + 1/3   =", sum_thirds)
print("1/3 * 3 == 1      ?", third * 3 == 1)`,
          output: `Fraction(16, -24) tối giản thành: -2/3
Tử số: -2, Mẫu số: 3
Fraction('0.25')   = 1/4
1/3 + 1/3 + 1/3   = 1
1/3 * 3 == 1      ? True`,
          annotations: [
            { line: 4, text: 'Phân số tự động rút gọn về -2/3, mẫu số luôn được đảm bảo là số nguyên dương.' },
            { line: 9, text: 'Fraction("0.25") tự động nhận diện thành phân số tối giản 1/4.' },
            { line: 15, text: '1/3 + 1/3 + 1/3 cho kết quả đúng bằng 1 nguyên vẹn, điều mà float không thể làm được.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Đánh đổi Hiệu năng (Performance Trade-offs): Khi nào dùng kiểu nào?',
      badge: 'Đo lường Hiệu năng & Quyết định',
      content: `
        <p>Độ chính xác tuyệt đối không phải là "bữa trưa miễn phí". Việc tính toán bằng phần mềm (Software Emulation) của <code>Decimal</code> và <code>Fraction</code> có cái giá rất lớn về mặt tốc độ:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th><code>float</code> (IEEE 754)</th>
                <th><code>decimal.Decimal</code></th>
                <th><code>fractions.Fraction</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tốc độ thực thi</strong></td>
                <td><strong>Cực nhanh</strong> (Thanh ghi FPU phần cứng CPU xử lý trực tiếp trong 1 chu kỳ)</td>
                <td><strong>Chậm hơn ~10–50 lần</strong> (Thực thi bằng thư viện C <code>_decimal</code> hoặc Python)</td>
                <td><strong>Chậm hơn ~50–200 lần</strong> (Phải liên tục tính thuật toán Euclid GCD ở mỗi phép toán)</td>
              </tr>
              <tr>
                <td><strong>Bộ nhớ RAM</strong></td>
                <td>Rất nhỏ (chỉ 24 bytes cho đối tượng float)</td>
                <td>Lớn hơn (~104 bytes cho mỗi số)</td>
                <td>Lớn nhất (chứa 2 đối tượng <code>int</code> Bignum)</td>
              </tr>
              <tr>
                <td><strong>Độ chính xác</strong></td>
                <td>Xấp xỉ nhị phân (~15 chữ số thập phân)</td>
                <td>Chính xác tuyệt đối ở hệ thập phân</td>
                <td>Chính xác tuyệt đối dạng phân số hữu tỷ</td>
              </tr>
              <tr>
                <td><strong>Khi nào DÙNG?</strong></td>
                <td>Đồ họa game 3D, Machine Learning / AI, mô phỏng vật lý, xử lý âm thanh/hình ảnh</td>
                <td>Thương mại điện tử, hóa đơn thuế, tính lãi suất ngân hàng, kế toán</td>
                <td>Đại số tượng trưng, xác suất thống kê chính xác, bài toán chia cổ phần</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh tốc độ cộng dồn 100,000 phép tính giữa float và Decimal',
          code: `import time
from decimal import Decimal

N = 100_000

# 1. Đo tốc độ float (Phần cứng FPU)
t0 = time.perf_counter()
total_f = 0.0
for _ in range(N):
    total_f += 0.1
t_float = time.perf_counter() - t0

# 2. Đo tốc độ Decimal (Phần mềm)
t0 = time.perf_counter()
total_d = Decimal("0")
step_d = Decimal("0.1")
for _ in range(N):
    total_d += step_d
t_decimal = time.perf_counter() - t0

print(f"Tổng float   = {total_f:.4f} | Thời gian: {t_float*1000:.2f} ms")
print(f"Tổng Decimal = {total_d} | Thời gian: {t_decimal*1000:.2f} ms")
print(f"Decimal chậm hơn float khoảng: {t_decimal / t_float:.1f} lần")`,
          output: `Tổng float   = 10000.0000 | Thời gian: 6.20 ms
Tổng Decimal = 10000.0 | Thời gian: 28.50 ms
Decimal chậm hơn float khoảng: 4.6 lần`,
          annotations: [
            { line: 11, text: 'float chạy với tốc độ phần cứng gốc của CPU.' },
            { line: 19, text: 'Decimal chậm hơn vài lần nhưng mang lại kết quả 10000.0 chính xác tuyệt đối không bị lệch một ly.' },
            { line: 23, text: 'Hiểu rõ sự đánh đổi giúp bạn không lạm dụng Decimal cho các thuật toán đồ họa hay AI cần hàng tỷ phép tính mỗi giây.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Trộn lẫn phép toán giữa Decimal và float gây TypeError',
        content: 'Python cấm tuyệt đối Decimal("10.5") + 1.5! Đây không phải là thiếu sót mà là một rào chắn an toàn có chủ ý: nếu Python tự động chuyển float thành Decimal hoặc ngược lại, sai số nhị phân sẽ âm thầm phá hủy độ chính xác của tài chính. Khi cần tính toán hỗn hợp, bạn phải tự chuyển đổi tường minh: Decimal(str(f)) hoặc float(d).'
      },
      {
        title: 'Khởi tạo Fraction từ float không tối giản như mong đợi',
        content: 'Nếu bạn viết Fraction(0.1), bạn sẽ nhận được phân số khổng lồ: 3602879701896397 / 36028797018963968! Đó là vì Python biểu diễn chính xác giá trị nhị phân thực tế của float 0.1. Luôn viết Fraction("0.1") hoặc Fraction(1, 10) để có phân số 1/10 đẹp mắt.'
      }
    ],
    tips: [
      {
        title: 'Tạo đối tượng tiền tệ bất biến với Decimal',
        content: 'Khi xây dựng các mô hình dữ liệu (Data Class) cho sản phẩm thương mại điện tử, hãy luôn đặt type hint là `Decimal`: `price: Decimal`. Khi parse dữ liệu từ JSON API người dùng gửi lên, hãy truyền trực tiếp chuỗi vào: `Decimal(json_data["price"])`.'
      }
    ],
    deepDive: {
      title: 'Bên trong CPython: Module _decimal được viết bằng ngôn ngữ C (libmpdec)',
      content: `
        <p>Trước Python 3.3, module <code>decimal</code> được viết hoàn toàn bằng Python thuần (pure Python), khiến nó chạy chậm hơn float tới 80–120 lần.</p>
        <p>Từ Python 3.3 trở đi, CPython đã tích hợp thư viện tăng tốc <strong><code>_decimal</code> viết bằng ngôn ngữ C</strong> dựa trên thư viện <em>libmpdec</em> của Stefan Krah. Khi bạn <code>from decimal import Decimal</code>, CPython sẽ tự động nạp phiên bản C tối ưu hóa với tốc độ nhanh gấp hơn 10 lần so với phiên bản cũ, xử lý hàng triệu phép tính tài chính mỗi giây một cách nhẹ nhàng.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Tính hóa đơn thanh toán VAT chính xác',
      problem: 'Một đơn hàng gồm 3 sản phẩm có đơn giá: sản phẩm A giá 19.99 USD, sản phẩm B giá 45.50 USD, sản phẩm C giá 12.75 USD. Thuế VAT là 8.5%. Hãy dùng `Decimal` để tính tổng tiền hàng, tiền thuế VAT (làm tròn đến 2 chữ số thập phân bằng `ROUND_HALF_UP`) và tổng thanh toán cuối cùng.',
      hint: 'Dùng `Decimal` từ chuỗi và phương thức `quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)`.',
      solutionCode: `from decimal import Decimal, ROUND_HALF_UP

items = [Decimal("19.99"), Decimal("45.50"), Decimal("12.75")]
vat_rate = Decimal("0.085")

subtotal = sum(items)
vat_amount = (subtotal * vat_rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
total = subtotal + vat_amount

print(f"Tiền hàng : {subtotal} USD")
print(f"Thuế VAT  : {vat_amount} USD")
print(f"Tổng cộng : {total} USD")`,
      solutionOutput: `Tiền hàng : 78.24 USD
Thuế VAT  : 6.65 USD
Tổng cộng : 84.89 USD`,
      explanation: 'Tổng tiền hàng là 78.24. Thuế trước làm tròn là 78.24 * 0.085 = 6.6504, được làm tròn chính xác thành 6.65 USD, cho ra tổng thanh toán chuẩn xác 84.89 USD.'
    },
    {
      level: 'Vừa',
      title: 'Phân chia bánh pizza bằng phân số Fraction',
      problem: 'Một nhóm bạn có 3 người cùng ăn pizza: An ăn 1/4 chiếc bánh, Bình ăn 2/5 chiếc bánh, Cường ăn phần còn lại. Hãy dùng `Fraction` để tính xem Cường đã ăn mấy phần chiếc bánh và kiểm tra xem tổng phần ăn của cả ba người có đúng bằng 1 chiếc bánh nguyên vẹn hay không.',
      hint: 'Lấy `Fraction(1) - Fraction(1, 4) - Fraction(2, 5)`.',
      solutionCode: `from fractions import Fraction

total_pizza = Fraction(1)
an = Fraction(1, 4)
binh = Fraction(2, 5)

cuong = total_pizza - an - binh
print("Phần ăn của An   :", an)
print("Phần ăn của Bình :", binh)
print("Phần ăn của Cường:", cuong)
print("Tổng ba phần     :", an + binh + cuong)
print("Có trọn vẹn 1 cái?", (an + binh + cuong) == 1)`,
      solutionOutput: `Phần ăn của An   : 1/4
Phần ăn của Bình : 2/5
Phần ăn của Cường: 7/20
Tổng ba phần     : 1
Có trọn vẹn 1 cái? True`,
      explanation: 'Phân số 1 - 1/4 - 2/5 quy đồng mẫu số chung 20: 20/20 - 5/20 - 8/20 = 7/20 chiếc bánh. Cộng lại cho kết quả đúng bằng 1 nguyên vẹn.'
    },
    {
      level: 'Khó',
      title: 'Chuyển đổi float thành Fraction theo 2 cách và giải thích',
      problem: 'Cho số thực `x = 0.3`. Hãy dùng `Fraction(x)` và `Fraction(str(x))` để xem sự khác biệt. Sau đó hãy dùng phương thức `Fraction(x).limit_denominator(10)` để tìm phân số đơn giản nhất xấp xỉ số `x` với mẫu số không quá 10.',
      hint: 'Dùng `Fraction(x)` trực tiếp, `Fraction(str(x))` và phương thức `.limit_denominator(10)`.',
      solutionCode: `from fractions import Fraction

x = 0.3

# Cách 1: Truyền float trực tiếp (Lấy đúng 64 bit nhị phân)
f_raw = Fraction(x)
print("Fraction(0.3) trực tiếp:\\n", f_raw)

# Cách 2: Truyền chuỗi
f_str = Fraction(str(x))
print("Fraction('0.3') từ chuỗi:\\n", f_str)

# Cách 3: Dùng limit_denominator để tìm phân số gần nhất
f_approx = f_raw.limit_denominator(10)
print("Fraction(0.3).limit_denominator(10):\\n", f_approx)`,
      solutionOutput: `Fraction(0.3) trực tiếp:
 5404319552844595/18014398509481984
Fraction('0.3') từ chuỗi:
 3/10
Fraction(0.3).limit_denominator(10):
 3/10`,
      explanation: 'Fraction(0.3) lưu đúng giá trị nhị phân xấp xỉ của IEEE 754. Trong khi đó, limit_denominator(10) sử dụng thuật toán liên phân số (Continued Fractions) để tìm ra phân số 3/10 gần nhất một cách kỳ diệu!'
    }
  ],

  quiz: [
    {
      question: 'Cách khởi tạo đối tượng `decimal.Decimal` nào sau đây là AN TOÀN NHẤT để tránh sai số nhị phân?',
      options: [
        '`Decimal(0.1)`',
        '`Decimal("0.1")`',
        '`Decimal(float("0.1"))`',
        '`Decimal(1/10)`'
      ],
      correctIndex: 1,
      explanation: 'Khởi tạo từ chuỗi văn bản `Decimal("0.1")` giúp Python đọc trực tiếp các ký tự thập phân mà không đi qua tầng chuyển đổi nhị phân của float, bảo toàn độ chính xác tuyệt đối.'
    },
    {
      question: 'Điều gì xảy ra khi bạn thực hiện phép tính `Decimal("10.5") + 2.5`?',
      options: [
        'Trả về `Decimal("13.0")`.',
        'Trả về `float(13.0)`.',
        'Ném lỗi `TypeError` vì Python cấm ngầm định trộn lẫn Decimal với float.',
        'Tự động làm tròn về số nguyên 13.'
      ],
      correctIndex: 2,
      explanation: 'Python có chủ ý cấm phép toán giữa Decimal và float để ngăn chặn sai số nhị phân làm hỏng dữ liệu tài chính của Decimal. Phép toán này luôn ném TypeError.'
    },
    {
      question: 'Chế độ làm tròn mặc định của module `decimal` (`ROUND_HALF_EVEN`) hoạt động như thế nào?',
      options: [
        'Luôn luôn làm tròn lên số nguyên kế tiếp.',
        'Luôn luôn làm tròn xuống.',
        'Khi phần lẻ đúng bằng 0.5, nó làm tròn về phía số chẵn gần nhất (Banker’s Rounding).',
        'Cắt bỏ toàn bộ phần thập phân.'
      ],
      correctIndex: 2,
      explanation: 'Mặc định Decimal dùng ROUND_HALF_EVEN để triệt tiêu độ lệch thống kê trong ngân hàng. Muốn làm tròn 0.5 lên theo kiểu trường học, dùng ROUND_HALF_UP.'
    },
    {
      question: 'Tại sao các game 3D và thư viện Trí tuệ nhân tạo (PyTorch, TensorFlow) không dùng `Decimal` mà lại dùng `float`?',
      options: [
        'Vì Decimal không thể biểu diễn số âm.',
        'Vì Decimal tính toán bằng phần mềm, chậm hơn float (được tính bằng vi mạch phần cứng FPU/GPU) từ 10 đến 50 lần.',
        'Vì Decimal không hỗ trợ phép nhân.',
        'Vì Decimal bị giới hạn bộ nhớ chỉ lưu được 100 số.'
      ],
      correctIndex: 1,
      explanation: 'float được phần cứng GPU và CPU hỗ trợ trực tiếp với hàng nghìn tỷ phép tính mỗi giây, trong khi Decimal mô phỏng bằng phần mềm chậm hơn nhiều chục lần, không thể đáp ứng tốc độ đồ họa và AI.'
    }
  ],

  summary: [
    '`decimal.Decimal` lưu số ở hệ thập phân (IEEE 854), loại bỏ hoàn toàn sai số nhị phân cho các bài toán tài chính, hóa đơn và kế toán.',
    'LUÔN LUÔN khởi tạo Decimal từ chuỗi `Decimal("0.1")` hoặc số nguyên, TUYỆT ĐỐI không dùng `Decimal(0.1)`.',
    'Tùy biến độ chính xác và làm tròn tài chính thông qua Context (`prec`, `quantize()`, `ROUND_HALF_UP`).',
    '`fractions.Fraction` lưu cặp số nguyên tử/mẫu tối giản, bảo toàn giá trị đại số chính xác tuyệt đối không rơi rớt mẩu vụn.',
    'Chấp nhận đánh đổi hiệu năng: Dùng `float` cho tốc độ phần cứng tối đa, dùng `Decimal`/`Fraction` khi sự chính xác là tối thượng.'
  ]
};
