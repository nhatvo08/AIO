export default {
  id: 'p9-06',
  partId: 'part-1',
  partTitle: 'Phần 1 – Các kiểu số trong Python',
  number: '1.6',
  title: 'Phép toán Liên kiểu, Ma trận Chọn kiểu & 6 Hiểu lầm Phổ biến',
  subtitle: 'Quy tắc nâng kiểu tự động, bí ẩn 1 == 1.0 == True trong Set/Dict, Bảng quyết định và phá bỏ 6 lầm tưởng kinh điển',
  level: 'Chuyên sâu',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững quy tắc nâng kiểu tự động (Type Coercion) khi thực hiện phép tính giữa các kiểu số: `int` → `float` → `complex`.',
    'Hiểu vì sao phép chia `/` luôn luôn trả về `float` và lũy thừa số mũ âm sinh ra `float`.',
    'Giải mã bản chất vì sao `1 == 1.0 == True` và có cùng giá trị hàm băm `hash()`, dẫn đến hiện tượng "nuốt chửng" phần tử trong `set` và `dict`.',
    'Sử dụng Bảng Ma trận Quyết định (Decision Matrix) để chọn đúng kiểu số tối ưu cho mọi bài toán thực tế.',
    'Phá bỏ dứt điểm 6 hiểu lầm tai hại phổ biến nhất về số học trong Python bằng lập luận bản chất.'
  ],

  intuition: {
    title: 'Bàn cân pha lê và Bữa tiệc buffet đa quốc gia',
    metaphor: 'Khi bạn đặt một đồng xu bạc nguyên chất (`int`) và một thỏi hợp kim mạ vàng (`float`) lên bàn cân, Python tự động hiểu rằng thỏi hợp kim có độ chi tiết xấp xỉ cao hơn, nên nó nấu chảy cả hai thành một hỗn hợp hợp kim mới (`float`). Nhưng khi một tờ tiền mặt pháp định (`Decimal`) xuất hiện, bảo vệ ngân hàng sẽ lập tức can thiệp chặn đứng: tiền không thể nấu chung với kim loại! Còn trong một câu lạc bộ thượng lưu (`dict`/`set`), nơi các thành viên được nhận diện bằng dấu vân tay (`hash`), dù bạn mặc áo sơ mi `1`, áo vest `1.0` hay đeo cà vạt `True`, bảo vệ chỉ thấy cùng một con người duy nhất bước vào cửa!',
    visualHtml: `
      <div style="font-family:var(--font-mono);font-size:0.85rem;padding:12px;background:var(--bg-code);color:var(--text-inverse);border-radius:8px;line-height:1.7;">
        <div style="color:var(--syn-keyword);font-weight:700;">DÒNG CHẢY NÂNG KIỂU (TYPE COERCION):</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:6px;flex-wrap:wrap;">
          <span style="background:#10b981;padding:4px 10px;border-radius:4px;">int / bool</span>
          <span>──(nâng cấp)──►</span>
          <span style="background:#3b82f6;padding:4px 10px;border-radius:4px;">float</span>
          <span>──(nâng cấp)──►</span>
          <span style="background:#8b5cf6;padding:4px 10px;border-radius:4px;">complex</span>
        </div>
        <div style="margin-top:8px;color:#ef4444;font-size:0.78rem;">
          ⛔ decimal.Decimal: Tách biệt hoàn toàn, cấm trộn lẫn ngầm định với float!
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Quy tắc nâng kiểu (Type Coercion) & Phép toán liên kiểu',
      badge: 'Quy tắc Coercion',
      content: `
        <p>Khi bạn thực hiện phép toán giữa hai đối tượng số khác kiểu nhau (Mixed Arithmetic), Python tuân theo nguyên tắc: <strong>kiểu hẹp hơn sẽ tự động được nâng cấp (coerced) thành kiểu rộng hơn</strong> để không làm mất thông tin:</p>
        <ul>
          <li><code>int + float</code> $\rightarrow$ <code>float</code>: Số nguyên được chuyển thành float trước khi cộng.</li>
          <li><code>float + complex</code> $\rightarrow$ <code>complex</code>: Số float trở thành phần thực của số phức mới có phần ảo bằng <code>0j</code>.</li>
          <li><code>int + complex</code> $\rightarrow$ <code>complex</code>: Tương tự, nâng thành số phức.</li>
        </ul>
        <p><strong>Hai quy tắc đặc biệt cần ghi nhớ:</strong></p>
        <ol>
          <li><strong>Toán tử chia thực <code>/</code> LUÔN LUÔN trả về <code>float</code>:</strong> Kể cả khi phép chia hết hoàn toàn: <code>4 / 2</code> cho kết quả là <code>2.0</code> (float), chứ không phải <code>2</code> (int). Muốn giữ nguyên kiểu <code>int</code> khi chia hết, bạn phải dùng toán tử chia nguyên <code>//</code>.</li>
          <li><strong>Toán tử lũy thừa <code>**</code> với số mũ âm:</strong> Bất kể cơ số là số nguyên, số mũ âm sẽ tạo ra kết quả là <code>float</code>: <code>2 ** -1 == 0.5</code>.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Khảo sát hành vi nâng kiểu tự động trong Python',
          code: `print("10 + 2.5       =", 10 + 2.5, "      | Kiểu:", type(10 + 2.5).__name__)
print("2.5 + (1+2j)   =", 2.5 + (1+2j), "| Kiểu:", type(2.5 + (1+2j)).__name__)
print("True + 4.0     =", True + 4.0, "     | Kiểu:", type(True + 4.0).__name__)

# Phép chia / luôn sinh float
div_result = 6 / 2
print("6 / 2          =", div_result, "       | Kiểu:", type(div_result).__name__)

# Lũy thừa số mũ âm
pow_result = 2 ** -2
print("2 ** -2        =", pow_result, "      | Kiểu:", type(pow_result).__name__)`,
          output: `10 + 2.5       = 12.5       | Kiểu: float
2.5 + (1+2j)   = (3.5+2j) | Kiểu: complex
True + 4.0     = 5.0      | Kiểu: float
6 / 2          = 3.0        | Kiểu: float
2 ** -2        = 0.25       | Kiểu: float`,
          annotations: [
            { line: 1, text: 'int 10 được chuyển thành float 10.0 trước khi cộng.' },
            { line: 2, text: 'float 2.5 được nâng thành (2.5+0j) trước khi cộng với (1+2j).' },
            { line: 3, text: 'bool True chuyển thành int 1, rồi nâng thành float 1.0.' },
            { line: 6, text: '6 / 2 cho kết quả là 3.0 (float) để bảo đảm tính nhất quán toán học.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Bí ẩn 1 == 1.0 == True và Hiện tượng "nuốt chửng" trong Set & Dict',
      badge: 'Đẳng thức & Hàm băm Hash',
      content: `
        <p>Đây là một câu đố gây bối rối cho cả những lập trình viên có nhiều năm kinh nghiệm:</p>
        <pre class="code-pre"><code>&gt;&gt;&gt; my_set = {1, 1.0, True}
&gt;&gt;&gt; print(my_set)
{1}
&gt;&gt;&gt; len(my_set)
1</code></pre>
        <p>Tại sao tập hợp <code>set</code> chứa 3 đối tượng thuộc 3 kiểu dữ liệu hoàn toàn khác nhau (<code>int</code>, <code>float</code>, <code>bool</code>) lại chỉ còn lại đúng một phần tử duy nhất <code>{1}</code>?</p>
        <p><strong>Bản chất bên dưới:</strong></p>
        <ul>
          <li><strong>Đẳng thức toán học:</strong> Trong Python, <code>1 == 1.0</code> là <code>True</code>, và <code>1 == True</code> là <code>True</code>. Theo tính chất bắc cầu: <code>1 == 1.0 == True</code>!</li>
          <li><strong>Quy tắc hàm băm (Hash Invariant):</strong> Python đặt ra một định luật tối cao cho cấu trúc bảng băm (Hash Table) của <code>dict</code> và <code>set</code>: <em>Nếu hai đối tượng bằng nhau về giá trị (<code>a == b</code>), thì giá trị băm của chúng BẮT BUỘC phải bằng nhau (<code>hash(a) == hash(b)</code>)</em>.</li>
          <li>Vì <code>hash(1) == hash(1.0) == hash(True) == 1</code>, khi bạn đưa <code>1.0</code> và <code>True</code> vào tập hợp, bảng băm kiểm tra thấy đã có phần tử có cùng mã băm và bằng giá trị với phần tử đang có, nên nó coi đó là phần tử trùng lặp và bỏ qua!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khảo sát đẳng thức và giá trị băm hash() giữa các kiểu số',
          code: `val_int = 1
val_float = 1.0
val_bool = True

print("So sánh ==   :", val_int == val_float == val_bool)
print("So sánh is   :", val_int is val_float, val_int is val_bool)
print("hash(1)      :", hash(val_int))
print("hash(1.0)    :", hash(val_float))
print("hash(True)   :", hash(val_bool))

# Hiện tượng trong Dictionary (Key bị ghi đè giá trị nhưng giữ nguyên Key đầu tiên)
d = {}
d[1] = "Số nguyên"
d[1.0] = "Số thực"
d[True] = "Boolean"
print("Nội dung Dict:", d)
print("Độ dài Dict  :", len(d))`,
          output: `So sánh ==   : True
So sánh is   : False False
hash(1)      : 1
hash(1.0)    : 1
hash(True)   : 1
Nội dung Dict: {1: 'Boolean'}
Độ dài Dict  : 1`,
          annotations: [
            { line: 5, text: 'Ba giá trị hoàn toàn khác nhau về danh tính ô nhớ (is False) nhưng lại bằng nhau về mặt số học.' },
            { line: 8, text: 'Mã băm hash() của cả 3 đều đúng bằng 1.' },
            { line: 17, text: 'Trong Dict, khi thêm key 1.0 và True, vì hash và == trùng với key 1, nó giữ nguyên key 1 ban đầu nhưng cập nhật đè value thành "Boolean"!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Bảng Ma trận Ra Quyết định (Decision Matrix): Chọn đúng kiểu số',
      badge: 'Bảng Quyết định Thực chiến',
      content: `
        <p>Để trở thành một kỹ sư phần mềm chuyên nghiệp, việc lựa chọn đúng kiểu số ngay từ khi thiết kế kiến trúc hệ thống là yếu tố quyết định sự ổn định và hiệu năng của phần mềm:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Tình huống bài toán</th>
                <th>Kiểu số NÊN chọn</th>
                <th>Lý do &amp; Lợi ích cốt lõi</th>
                <th>Kiểu TUYỆT ĐỐI TRÁNH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Đếm số lượng, Chỉ số mảng, ID người dùng</strong></td>
                <td><code>int</code></td>
                <td>Độ chính xác tuyệt đối, không tràn số, đánh chỉ số tức thì $O(1)$.</td>
                <td>Tránh <code>float</code> (vì $2^{53}$ sẽ bị nhảy cóc số nguyên).</td>
              </tr>
              <tr>
                <td><strong>Đồ họa 3D, Game, Machine Learning, Vật lý</strong></td>
                <td><code>float</code></td>
                <td>Thực thi trực tiếp bằng phần cứng FPU/GPU với tốc độ hàng tỷ phép tính/giây.</td>
                <td>Tránh <code>Decimal</code> (quá chậm, làm tụt FPS).</td>
              </tr>
              <tr>
                <td><strong>Tiền tệ, Ngân hàng, Hóa đơn thuế, Kế toán</strong></td>
                <td><code>decimal.Decimal</code></td>
                <td>Biểu diễn chính xác hệ thập phân cơ số 10, tùy chỉnh làm tròn tài chính theo luật.</td>
                <td><strong>CẤM <code>float</code></strong> (sai số tích lũy làm lệch tiền kiểm toán).</td>
              </tr>
              <tr>
                <td><strong>Đại số phân số, Bài toán chia bánh, Tỷ lệ xác suất</strong></td>
                <td><code>fractions.Fraction</code></td>
                <td>Tự động rút gọn tử/mẫu, giữ nguyên $1/3$ không làm tròn bất kỳ hạt bụi nào.</td>
                <td>Tránh <code>float</code> (sai số phân số tuần hoàn).</td>
              </tr>
              <tr>
                <td><strong>Kỹ thuật điện xoay chiều, Xử lý tín hiệu, Cơ lượng tử</strong></td>
                <td><code>complex</code></td>
                <td>Xoay vector 2D, tính biên độ và góc pha tức thì qua <code>cmath</code>.</td>
                <td>Tránh tự quản lý 2 biến x, y rời rạc.</td>
              </tr>
              <tr>
                <td><strong>Cờ trạng thái, Lọc điều kiện, Mặt nạ nhị phân</strong></td>
                <td><code>bool</code></td>
                <td>Rõ ràng về mặt ngữ nghĩa, hỗ trợ tính tổng nhanh qua <code>sum()</code>.</td>
                <td>Tránh dùng chuỗi <code>"true"</code>/<code>"false"</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Áp dụng đúng kiểu số vào từng bài toán thực tế',
          code: `from decimal import Decimal
from fractions import Fraction

# 1. Bài toán Đếm: Dùng int
view_count = 10_000_000_000  # 10 tỷ lượt xem không lo tràn int32

# 2. Bài toán Tiền tệ: Dùng Decimal
account_balance = Decimal("1500000.50")
fee = Decimal("1500.25")
new_balance = account_balance - fee

# 3. Bài toán Tỷ lệ xác suất: Dùng Fraction
dice_probability = Fraction(1, 6)
two_dice = dice_probability * dice_probability

print(f"Số lượt xem     : {view_count:,}")
print(f"Số dư tài khoản : {new_balance} VND")
print(f"Xác suất 2 xúc xắc: {two_dice} (hoặc {float(two_dice)*100:.2f}%)")`,
          output: `Số lượt xem     : 10,000,000,000
Số dư tài khoản : 1498500.25 VND
Xác suất 2 xúc xắc: 1/36 (hoặc 2.78%)`,
          annotations: [
            { line: 5, text: 'Số nguyên int chứa 10 tỷ nhẹ nhàng mà không bị tràn số.' },
            { line: 8, text: 'Decimal đảm bảo tài khoản không bị lệch một hào.' },
            { line: 12, text: 'Fraction biểu diễn xác suất 1/36 chính xác trước khi người dùng cần format ra phần trăm.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Phá vỡ 6 Hiểu lầm Kinh điển về Số học trong Python',
      badge: 'Mythbusting Sư phạm',
      content: `
        <div class="callout-box callout-pitfall" style="margin-bottom:14px;">
          <div class="callout-header"><span>💥 Hiểu lầm 1:</span> <span>"Python bị lỗi tính toán số học vì 0.1 + 0.2 != 0.3!"</span></div>
          <div class="callout-body">
            <p><strong>Sự thật:</strong> Đây hoàn toàn KHÔNG phải là lỗi của Python! Đây là quy luật vật lý của chuẩn nhị phân quốc tế IEEE 754 mà mọi ngôn ngữ lập trình chạy trên vi xử lý hiện đại (C, C++, Java, JavaScript, Rust, Go...) đều gặp phải. Muốn chính xác thập phân tuyệt đối, giải pháp là dùng <code>Decimal</code>.</p>
          </div>
        </div>

        <div class="callout-box callout-pitfall" style="margin-bottom:14px;">
          <div class="callout-header"><span>💥 Hiểu lầm 2:</span> <span>"Số thực float luôn luôn có sai số và không bao giờ chính xác!"</span></div>
          <div class="callout-body">
            <p><strong>Sự thật:</strong> Sai! Bất kỳ số thực nào là <strong>tổng các lũy thừa của 2</strong> ($1/2 = 0.5$, $1/4 = 0.25$, $1/8 = 0.125$, $3/4 = 0.75$, $1024.0$...) đều được float biểu diễn <strong>CHÍNH XÁC 100%</strong> không lệch một phần tỷ! Sai số chỉ xuất hiện khi số đó là phân số tuần hoàn ở hệ nhị phân (như $0.1, 0.2$).</p>
          </div>
        </div>

        <div class="callout-box callout-pitfall" style="margin-bottom:14px;">
          <div class="callout-header"><span>💥 Hiểu lầm 3:</span> <span>"Hàm round() của Python bị lỗi làm tròn vì round(2.675, 2) ra 2.67!"</span></div>
          <div class="callout-body">
            <p><strong>Sự thật:</strong> Hàm <code>round()</code> chạy hoàn toàn chính xác theo 2 nguyên lý: (1) Số 2.675 trong bộ nhớ thực chất là <code>2.67499999999999982...</code> (hơi nhỏ hơn 2.675) nên bị kéo xuống 2.67; (2) Chiến lược Banker’s Rounding làm tròn về phía số chẵn gần nhất để bảo vệ phân phối chuẩn trong thống kê.</p>
          </div>
        </div>

        <div class="callout-box callout-pitfall" style="margin-bottom:14px;">
          <div class="callout-header"><span>💥 Hiểu lầm 4:</span> <span>"Số nguyên trong Python bị giới hạn 64-bit như C/Java!"</span></div>
          <div class="callout-body">
            <p><strong>Sự thật:</strong> Trong Python 3, <code>int</code> là số nguyên Bignum có độ chính xác tùy ý. Nó tự động cấp phát thêm RAM để chứa con số hàng triệu chữ số mà không bao giờ bị tràn số.</p>
          </div>
        </div>

        <div class="callout-box callout-pitfall" style="margin-bottom:14px;">
          <div class="callout-header"><span>💥 Hiểu lầm 5:</span> <span>"Dùng float tính tiền lẻ cũng không sao, chỉ cần round() ở bước cuối!"</span></div>
          <div class="callout-body">
            <p><strong>Sự thật:</strong> Sai lầm này đã làm phá sản nhiều dự án tài chính! Sai số dấu phẩy động tích lũy (Cumulative Floating-Point Drift) qua hàng nghìn phép nhân chia cộng dồn sẽ tạo ra độ lệch vượt qua ngưỡng làm tròn, dẫn đến việc tổng từng dòng hóa đơn cộng lại KHÔNG KHỚP với tổng thanh toán.</p>
          </div>
        </div>

        <div class="callout-box callout-pitfall" style="margin-bottom:14px;">
          <div class="callout-header"><span>💥 Hiểu lầm 6:</span> <span>"Dùng toán tử is để kiểm tra hai số nguyên bằng nhau cho nhanh hơn ==!"</span></div>
          <div class="callout-body">
            <p><strong>Sự thật:</strong> Cực kỳ nguy hiểm! Toán tử <code>is</code> kiểm tra cùng ô nhớ trên RAM. Nó chỉ vô tình đúng với các số nguyên từ <code>-5</code> đến <code>256</code> do cơ chế bộ đệm CPython (Small Integer Cache). Từ <code>257</code> trở đi hoặc trên các trình thông dịch khác (PyPy, Jython), <code>a is b</code> sẽ trả về <code>False</code> dù hai số bằng nhau.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Chứng minh: float hoàn toàn chính xác với các lũy thừa của 2',
          code: `# Các số là tổng lũy thừa của 2 được lưu chính xác 100% trong float
a = 0.5      # 1/2
b = 0.25     # 1/4
c = 0.125    # 1/8
d = 0.0625   # 1/16

print("0.5 + 0.25 == 0.75 ?      ", 0.5 + 0.25 == 0.75)
print("0.125 + 0.0625 == 0.1875 ?", 0.125 + 0.0625 == 0.1875)
print("float.hex(0.75)           :", (0.75).hex())
print("float.hex(0.1875)         :", (0.1875).hex())`,
          output: `0.5 + 0.25 == 0.75 ?       True
0.125 + 0.0625 == 0.1875 ? True
float.hex(0.75)           : 0x1.8000000000000p-1
float.hex(0.1875)         : 0x1.8000000000000p-3`,
          annotations: [
            { line: 7, text: 'Phép cộng các phân số nhị phân hữu hạn luôn cho kết quả True tuyệt đối.' },
            { line: 9, text: 'Dạng hex của 0.75 kết thúc gọn gàng mà không hề có phần đuôi tuần hoàn.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Tránh dùng số float làm khóa (Key) trong Dictionary hoặc Set',
        content: 'Vì sai số làm tròn siêu vi (ví dụ 0.1 + 0.2 != 0.3), nếu bạn dùng d[0.1 + 0.2] = "ok", sau đó bạn tìm d[0.3] sẽ ném KeyError! Nếu buộc phải dùng số thực làm key, hãy làm tròn có chủ đích trước hoặc dùng Decimal / Fraction.'
      }
    ],
    tips: [
      {
        title: 'Chuẩn hóa dữ liệu đầu vào bằng Type Casting tường minh',
        content: 'Khi nhận dữ liệu từ người dùng, file CSV hoặc API mạng, hãy luôn chuyển đổi kiểu tường minh có bọc trong khối `try ... except (ValueError, TypeError)`: `try: count = int(user_input) except ValueError: ...`.'
      }
    ],
    deepDive: {
      title: 'Thuật toán băm thống nhất (Unified Hash Algorithm) của CPython',
      content: `
        <p>Để bảo đảm định luật <code>a == b ==&gt; hash(a) == hash(b)</code> xuyên suốt giữa <code>int</code>, <code>float</code>, <code>Decimal</code> và <code>Fraction</code>, CPython sử dụng một thuật toán băm toán học cực kỳ tinh vi dựa trên số nguyên tố Mersenne $P = 2^{61} - 1$ (trên kiến trúc 64-bit):</p>
        <pre class="code-pre"><code>_PyHASH_MODULUS = (2**61) - 1</code></pre>
        <p>Mọi số nguyên, số thực, phân số hay số thập phân có cùng giá trị toán học đều được quy chiếu đồng dư modulo $P$. Nhờ đó, <code>hash(1)</code>, <code>hash(1.0)</code>, <code>hash(Decimal('1.0'))</code> và <code>hash(Fraction(1, 1))</code> luôn luôn cho ra một con số duy nhất là <code>1</code>!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Xử lý và deduplicate danh sách số hỗn hợp',
      problem: 'Cho danh sách: `raw_items = [1, 2.0, True, 2, 1.0, 3, False, 0]`. Hãy tạo một tập hợp `unique_set = set(raw_items)` và in ra độ dài cùng các phần tử bên trong. Giải thích vì sao nhiều phần tử bị biến mất.',
      hint: 'Dùng hàm `set(raw_items)`.',
      solutionCode: `raw_items = [1, 2.0, True, 2, 1.0, 3, False, 0]
unique_set = set(raw_items)

print("Tập hợp Set:", unique_set)
print("Số phần tử :", len(unique_set))`,
      solutionOutput: `Tập hợp Set: {0, 1, 2.0, 3}
Số phần tử : 4`,
      explanation: 'Ban đầu có 8 phần tử, nhưng 1 == True == 1.0 (trùng 1), 2.0 == 2 (trùng 2.0), False == 0 (trùng 0), và số 3. Do đó Set chỉ còn lại 4 phần tử duy nhất: {0, 1, 2.0, 3}.'
    },
    {
      level: 'Vừa',
      title: 'Phát hiện sự cố tính toán tài chính của float',
      problem: 'Viết một chương trình nhỏ mô phỏng việc cộng dồn 10 lần số tiền 0.1 USD. So sánh kết quả của `float` và `Decimal`. Hãy chỉ ra sai số và viết code kiểm tra an toàn.',
      hint: 'Dùng vòng lặp cộng 0.1 mười lần với float và với Decimal("0.1").',
      solutionCode: `from decimal import Decimal

# Cách 1: float
float_total = 0.0
for _ in range(10):
    float_total += 0.1

# Cách 2: Decimal
decimal_total = Decimal("0")
for _ in range(10):
    decimal_total += Decimal("0.1")

print("Cộng dồn 10 lần 0.1 float  :", float_total)
print("float_total == 1.0 ?        ", float_total == 1.0)
print("Cộng dồn 10 lần 0.1 Decimal:", decimal_total)
print("decimal_total == Decimal(1) ?", decimal_total == Decimal("1"))`,
      solutionOutput: `Cộng dồn 10 lần 0.1 float  : 0.9999999999999999
float_total == 1.0 ?         False
Cộng dồn 10 lần 0.1 Decimal: 1.0
decimal_total == Decimal(1) ? True`,
      explanation: 'Cộng dồn 10 lần 0.1 bằng float cho kết quả 0.9999999999999999 (khác 1.0!), trong khi Decimal cho kết quả 1.0 chính xác tuyệt đối.'
    },
    {
      level: 'Khó',
      title: 'Xây dựng hàm chia tài khoản công bằng không rơi một xu',
      problem: 'Một hóa đơn tổng trị giá $V$ đồng cần được chia đều cho $N$ người (với $V$ là số tiền nguyên hoặc Decimal). Vì phép chia có thể tạo ra số lẻ (ví dụ 100,000 VND chia cho 3 người), hãy viết hàm `split_bill_exact(total_amount, n_people)` chia tiền sao cho mỗi người nhận số tiền nguyên (hoặc làm tròn đến hàng đơn vị), tổng số tiền của mọi người nhận được PHẢI BẰNG CHÍNH XÁC $V$ đồng, không được thất thoát hay sinh ra thêm dù chỉ 1 đồng!',
      hint: 'Dùng phép chia nguyên `//` và chia lấy dư `%` (`divmod`) để phân phối phần dư cho những người đầu tiên.',
      solutionCode: `def split_bill_exact(total_amount, n_people):
    if n_people <= 0:
        raise ValueError("Số người phải lớn hơn 0")
    
    # Dùng divmod để lấy phần cơ bản và phần xu dư
    base_share, remainder = divmod(total_amount, n_people)
    
    shares = []
    for i in range(n_people):
        # Những người đầu tiên nhận thêm 1 đồng dư cho đến khi hết số dư
        extra = 1 if i < remainder else 0
        shares.append(base_share + extra)
        
    return shares

total = 100_000
people = 3
shares = split_bill_exact(total, people)
print(f"Tổng hóa đơn: {total} VND chia cho {people} người:")
for idx, s in enumerate(shares, 1):
    print(f" - Người {idx}: {s:,} VND")
print("Tổng thực nhận:", sum(shares), "== Tổng ban đầu?", sum(shares) == total)`,
      solutionOutput: `Tổng hóa đơn: 100000 VND chia cho 3 người:
 - Người 1: 33,334 VND
 - Người 2: 33,333 VND
 - Người 3: 33,333 VND
Tổng thực nhận: 100000 == Tổng ban đầu? True`,
      explanation: 'Thay vì dùng float (cho ra 33,333.333... và mất tiền khi làm tròn), thuật toán dùng divmod() phân chia 33,334 + 33,333 + 33,333 đúng chính xác 100,000 VND!'
    }
  ],

  quiz: [
    {
      question: 'Phép tính nào sau đây trong Python 3 sẽ trả về kiểu `float` dù các toán hạng là số nguyên?',
      options: [
        '`4 // 2`',
        '`4 * 2`',
        '`4 / 2`',
        '`4 % 2`'
      ],
      correctIndex: 2,
      explanation: 'Toán tử chia thực `/` trong Python 3 luôn luôn trả về kiểu float (4 / 2 == 2.0).'
    },
    {
      question: 'Tại sao `len({1, 1.0, True})` lại bằng 1 trong Python?',
      options: [
        'Do lỗi tối ưu hóa của trình thông dịch CPython.',
        'Vì 1 == 1.0 == True và cả ba giá trị này đều có cùng giá trị băm hash() bằng 1, nên Set coi chúng là phần tử trùng lặp.',
        'Vì Set tự động xóa các phần tử không phải số nguyên.',
        'Vì True bị chuyển thành chuỗi.'
      ],
      correctIndex: 1,
      explanation: 'Theo nguyên tắc bảng băm của Python: hai đối tượng có hash() bằng nhau và toán tử == trả về True sẽ được coi là cùng một phần tử duy nhất trong Set và Dict.'
    },
    {
      question: 'Số thực nào sau đây được lưu CHÍNH XÁC 100% trong chuẩn float IEEE 754 mà không hề có sai số xấp xỉ?',
      options: [
        '`0.1`',
        '`0.2`',
        '`0.3`',
        '`0.125`'
      ],
      correctIndex: 3,
      explanation: 'Số 0.125 bằng đúng phân số nhị phân $1/8 = 1/2^3$, có thể biểu diễn hữu hạn chính xác 100% trong hệ nhị phân.'
    },
    {
      question: 'Khi lập trình hệ thống thanh toán và tính tiền cho website thương mại điện tử, bạn nên chọn kiểu dữ liệu nào?',
      options: [
        '`float` vì tính toán nhanh nhất.',
        '`decimal.Decimal` để đảm bảo độ chính xác tuyệt đối ở hệ thập phân và tùy chỉnh làm tròn tài chính chuẩn mực.',
        '`complex` để lưu cả tiền gốc và tiền lãi.',
        '`str` để lưu số tiền dưới dạng chữ.'
      ],
      correctIndex: 1,
      explanation: 'Trong tài chính và thương mại, decimal.Decimal là chuẩn mực vàng bắt buộc để loại trừ hoàn toàn sai số dấu phẩy động nhị phân.'
    }
  ],

  summary: [
    'Quy tắc nâng kiểu tự động: `int` → `float` → `complex`; phép chia `/` luôn luôn trả về `float`.',
    '`1 == 1.0 == True` và cùng `hash() == 1`, dẫn đến việc bị gộp chung thành 1 phần tử duy nhất trong `set` và `dict`.',
    'Chọn kiểu đúng theo bảng ma trận: `int` (đếm), `float` (AI/đồ họa/vật lý), `Decimal` (tài chính), `Fraction` (phân số đại số).',
    'Phá bỏ hiểu lầm: `0.1 + 0.2 != 0.3` là chuẩn IEEE 754 toàn cầu; float hoàn toàn chính xác với các lũy thừa của 2; tuyệt đối không dùng `is` để so sánh số.'
  ]
};
