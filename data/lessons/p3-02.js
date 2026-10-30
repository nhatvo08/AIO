export default {
  id: 'p3-02',
  partId: 'part-3',
  partTitle: 'Phần 3 – Định dạng chuỗi (Trung cấp → Nâng cao)',
  number: '3.2',
  title: 'Format Specification Mini-Language Toàn Tập',
  subtitle: 'Giải phẫu cú pháp [[fill]align][sign][#][0][width][grouping_option][.precision][type] cho số nguyên, số thực, hệ cơ số và datetime',
  level: 'Nâng cao',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: 'format-builder',

  objectives: [
    'Thuộc lòng thứ tự chuẩn xác của 9 thành phần trong Format Specification Mini-Language: [[fill]align][sign][#][0][width][grouping_option][.precision][type].',
    'Làm chủ căn lề (<, >, ^, =) kết hợp ký tự đệm (fill), dấu số học (+, -, khoảng trắng) và độ rộng (width).',
    'Định dạng thành thạo số nguyên ở các hệ cơ số nhị phân (#b), bát phân (#o), thập lục phân (#x/#X) cùng dấu phân nhóm nghìn (`,` và `_`).',
    'Hiểu rõ ý nghĩa của .precision đối với số thực (f, e, g, %) so với khi áp dụng lên chuỗi (cắt ngắn chuỗi), cũng như cách định dạng đối tượng datetime trực tiếp.'
  ],

  intuition: {
    title: 'Bản thiết kế kỹ thuật 9 ô lắp ghép theo thứ tự cố định',
    metaphor: 'Hãy hình dung phần đứng sau dấu hai chấm `:` trong `{giá_trị:định_dạng}` là một dây chuyền đóng gói hàng hóa gồm 9 trạm nối tiếp nhau theo thứ tự bất di bất dịch từ trái sang phải. Bạn có thể bỏ qua bất kỳ trạm nào không dùng tới, nhưng tuyệt đối không được đảo thứ tự giữa các trạm (ví dụ: không thể đặt dấu phân cách nghìn `,` trước độ rộng `width`, hay đặt căn lề `<` sau `.precision`).',
    visualHtml: `
      <div style="padding:16px;border-radius:12px;background:rgba(15,23,42,0.7);border:1px solid rgba(56,189,248,0.3);font-family:monospace;overflow-x:auto;">
        <div style="font-family:system-ui,sans-serif;font-size:13px;color:#94a3b8;margin-bottom:10px;font-weight:600;">
          CÚ PHÁP CHUẨN: <code>[[fill]align][sign][#][0][width][grouping_option][.precision][type]</code>
        </div>
        <div style="display:flex;gap:6px;min-width:680px;text-align:center;">
          <div style="flex:1;padding:8px 4px;border-radius:6px;background:rgba(244,63,94,0.15);border:1px solid rgba(244,63,94,0.4);">
            <div style="font-size:15px;font-weight:700;color:#fb7185;">[fill]</div>
            <div style="font-size:11px;color:#fda4af;font-family:system-ui;">Ký tự đệm<br/><code>*</code>, <code>.</code>, <code>0</code></div>
          </div>
          <div style="flex:1;padding:8px 4px;border-radius:6px;background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.4);">
            <div style="font-size:15px;font-weight:700;color:#fb923c;">[align]</div>
            <div style="font-size:11px;color:#fdba74;font-family:system-ui;">Căn lề<br/><code>&lt; &gt; ^ =</code></div>
          </div>
          <div style="flex:1;padding:8px 4px;border-radius:6px;background:rgba(234,179,8,0.15);border:1px solid rgba(234,179,8,0.4);">
            <div style="font-size:15px;font-weight:700;color:#facc15;">[sign]</div>
            <div style="font-size:11px;color:#fde047;font-family:system-ui;">Dấu số<br/><code>+ - ' '</code></div>
          </div>
          <div style="flex:1;padding:8px 4px;border-radius:6px;background:rgba(132,204,22,0.15);border:1px solid rgba(132,204,22,0.4);">
            <div style="font-size:15px;font-weight:700;color:#a3e635;">[#]</div>
            <div style="font-size:11px;color:#bef264;font-family:system-ui;">Tiền tố cơ số<br/><code>0b 0o 0x</code></div>
          </div>
          <div style="flex:1;padding:8px 4px;border-radius:6px;background:rgba(20,184,166,0.15);border:1px solid rgba(20,184,166,0.4);">
            <div style="font-size:15px;font-weight:700;color:#2dd4bf;">[0]</div>
            <div style="font-size:11px;color:#5eead4;font-family:system-ui;">Đệm số 0<br/>sau dấu</div>
          </div>
          <div style="flex:1;padding:8px 4px;border-radius:6px;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.4);">
            <div style="font-size:15px;font-weight:700;color:#38bdf8;">[width]</div>
            <div style="font-size:11px;color:#7dd3fc;font-family:system-ui;">Độ rộng<br/>tối thiểu</div>
          </div>
          <div style="flex:1;padding:8px 4px;border-radius:6px;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.4);">
            <div style="font-size:15px;font-weight:700;color:#818cf8;">[group]</div>
            <div style="font-size:11px;color:#a5b4fc;font-family:system-ui;">Tách nghìn<br/><code>,</code> hoặc <code>_</code></div>
          </div>
          <div style="flex:1;padding:8px 4px;border-radius:6px;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.4);">
            <div style="font-size:15px;font-weight:700;color:#c084fc;">[.prec]</div>
            <div style="font-size:11px;color:#d8b4fe;font-family:system-ui;">Độ chính xác<br/><code>.2</code>, <code>.5</code></div>
          </div>
          <div style="flex:1;padding:8px 4px;border-radius:6px;background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.4);">
            <div style="font-size:15px;font-weight:700;color:#f472b6;">[type]</div>
            <div style="font-size:11px;color:#f9a8d4;font-family:system-ui;">Kiểu xuất<br/><code>d f % x b</code></div>
          </div>
        </div>
        <div style="margin-top:10px;font-family:system-ui,sans-serif;font-size:13px;color:#cbd5e1;">
          Ví dụ tổng hợp: <code>f"{12345.678:_>+14,.2f}"</code> ➔ <code style="color:#4ade80;">"___+12,345.68"</code> (đệm <code>_</code>, căn phải <code>&gt;</code>, luôn hiện dấu <code>+</code>, rộng <code>14</code>, tách nghìn <code>,</code>, <code>.2</code> thập phân, kiểu <code>f</code>).
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Căn lề (align), Ký tự đệm (fill), Độ rộng (width) và Dấu (sign)',
      badge: null,
      content: `
        <p>Nhóm định dạng bố cục quyết định cách giá trị chiếm chỗ trên màn hình khi độ dài thực tế ngắn hơn <code>width</code> (độ rộng tối thiểu):</p>
        <ul>
          <li><strong><code>align</code> (Căn lề):</strong> <code>&lt;</code> (căn trái — mặc định cho chuỗi), <code>&gt;</code> (căn phải — mặc định cho số), <code>^</code> (căn giữa), và <code>=</code> (chỉ dành cho số: đẩy dấu <code>+</code>/<code>-</code> hoặc tiền tố <code>0x</code> ra sát mép trái, phần đệm nằm giữa dấu và chữ số).</li>
          <li><strong><code>fill</code> (Ký tự đệm):</strong> Bất kỳ ký tự đơn nào khác <code>{</code> và <code>}</code> đứng ngay trước <code>align</code>. Lưu ý: Bạn <strong>bắt buộc phải chỉ định <code>align</code></strong> nếu muốn dùng <code>fill</code> (trừ trường hợp viết tắt <code>0</code> trước <code>width</code> tương đương với <code>0=</code>).</li>
          <li><strong><code>sign</code> (Quy tắc hiển thị dấu cho số):</strong> <code>+</code> (hiện dấu cho cả số dương lẫn âm), <code>-</code> (chỉ hiện dấu cho số âm — mặc định), hoặc <code>' '</code> (một khoảng trắng cho số dương để thẳng hàng với dấu trừ của số âm).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Căn lề bảng biểu, đệm ký tự và căn thẳng hàng dấu âm/dương',
          code: `title = "BÁO CÁO DOANH THU"
print(f"{title:*^31}")

# So sánh căn phải (>) và căn sau dấu (=) khi đệm số 0
delta_neg = -420
delta_pos = 420
print("Dùng 0>8 :", f"{delta_neg:0>8d}")  # Dấu trừ bị đẩy vào trong: 0000-420
print("Dùng 0=8 :", f"{delta_neg:0=8d}")  # Chuẩn số học: -0000420
print("Viết tắt :", f"{delta_neg:08d}")   # Tương đương 0=8d

# Dùng khoảng trắng (sign=' ') để cột số âm và số dương thẳng hàng tuyệt đối
for val in [125.5, -48.2, 0.0, 910.75]:
    print(f"| {val: 9.2f} | {val:+9.2f} |")`,
          output: `*******BÁO CÁO DOANH THU*******
Dùng 0>8 : 0000-420
Dùng 0=8 : -0000420
Viết tắt : -0000420
|    125.50 |   +125.50 |
|    -48.20 |    -48.20 |
|      0.00 |     +0.00 |
|    910.75 |   +910.75 |`,
          annotations: [
            { line: 2, text: '*^31: lấy dấu * làm fill, ^ để căn giữa trong tổng chiều rộng 31 ký tự.' },
            { line: 7, text: 'Cẩn thận: 0>8d là căn phải thông thường nên ký tự đệm 0 nằm bên trái cả dấu trừ!' },
            { line: 8, text: '0=8d hoặc viết tắt 08d đặt dấu - ở đầu tiên rồi mới điền các chữ số 0 ở giữa.' },
            { line: 13, text: '{val: 9.2f} có một khoảng trắng sau dấu : giúp số dương chừa 1 ô đầu dòng khớp với dấu - của số âm.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Số nguyên, Hệ cơ số (#b, #o, #x) và Phân nhóm nghìn (grouping_option)',
      badge: null,
      content: `
        <p>Với số nguyên (<code>int</code>), thành phần <code>type</code> hỗ trợ chuyển đổi hệ cơ số trực tiếp mà không cần gọi hàm <code>bin()</code>, <code>oct()</code> hay <code>hex()</code>:</p>
        <ul>
          <li><code>d</code>: Hệ thập phân (cơ số 10 — mặc định).</li>
          <li><code>b</code>: Hệ nhị phân (cơ số 2).</li>
          <li><code>o</code>: Hệ bát phân (cơ số 8).</li>
          <li><code>x</code> / <code>X</code>: Hệ thập lục phân chữ thường (<code>a-f</code>) hoặc chữ hoa (<code>A-F</code>).</li>
          <li><code>c</code>: Chuyển mã Unicode nguyên thành ký tự tương ứng (giống <code>chr()</code>).</li>
        </ul>
        <p>Khi bật cờ <strong><code>#</code> (alternate form)</strong> trước độ rộng, Python tự động gắn tiền tố <code>0b</code>, <code>0o</code>, <code>0x</code> hoặc <code>0X</code>. Ngoài ra, thành phần <strong><code>grouping_option</code></strong> cho phép chèn dấu phẩy <code>,</code> (mỗi 3 chữ số hệ 10) hoặc dấu gạch dưới <code>_</code> (hỗ trợ cả hệ 10 với nhóm 3 chữ số, và hệ <code>b</code>, <code>o</code>, <code>x</code> với nhóm 4 chữ số!).</p>
      `,
      codeExamples: [
        {
          title: 'Biểu diễn đa hệ cơ số và tách nhóm chữ số',
          code: `mem_addr = 48879
population = 99_460_000

# 1. Chuyển đổi hệ cơ số có và không có cờ #
print(f"Dec: {mem_addr:d} | Hex thường: {mem_addr:x} | Hex có #: {mem_addr:#08X}")
print(f"Bin thuần: {mem_addr:b}")
print(f"Bin nhóm 4 bit có tiền tố: {mem_addr:#_b}")

# 2. Phân nhóm nghìn với dấu phẩy (,) và gạch dưới (_)
print(f"Dấu phẩy (,): {population:,d}")
print(f"Gạch dưới (_): {population:_d}")

# 3. Kết hợp đệm 0 cho thanh ghi 16-bit (nhóm 4 bit + chữ số + dấu _)
reg = 0b101101
print(f"Thanh ghi 16-bit: {reg:#021_b}")`,
          output: `Dec: 48879 | Hex thường: beef | Hex có #: 0X00BEEF
Bin thuần: 1011111011101111
Bin nhóm 4 bit có tiền tố: 0b1011_1110_1110_1111
Dấu phẩy (,): 99,460,000
Gạch dưới (_): 99_460_000
Thanh ghi 16-bit: 0b0000_0000_0010_1101`,
          annotations: [
            { line: 5, text: '#08X tính tổng độ rộng 8 ký tự (bao gồm 2 ký tự "0X"), nên đệm thêm 2 chữ số 0 vào trước BEEF.' },
            { line: 7, text: 'Cờ _ kết hợp với kiểu b, o, x sẽ tự động tách nhóm mỗi 4 chữ số từ phải sang trái.' },
            { line: 15, text: 'Độ rộng 21 tính cả 2 ký tự "0b", 16 bit nhị phân và 3 dấu gạch dưới (2 + 16 + 3 = 21).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Số thực, Phần trăm (%) và Ý nghĩa kép của .precision',
      badge: null,
      content: `
        <p>Thành phần <code>.precision</code> (một dấu chấm theo sau bởi số nguyên không âm) thay đổi hành vi tùy theo kiểu <code>type</code>:</p>
        <ul>
          <li>Với kiểu <strong><code>f</code> / <code>F</code> (Fixed-point)</strong> và <strong><code>e</code> / <code>E</code> (Khoa học)</strong>: <code>.precision</code> là <strong>số chữ số sau dấu chấm thập phân</strong> (mặc định là 6 nếu không ghi).</li>
          <li>Với kiểu <strong><code>%</code> (Phần trăm)</strong>: Nhân giá trị số với <code>100</code>, định dạng theo kiểu <code>f</code> với <code>.precision</code> chữ số thập phân, rồi gắn ký hiệu <code>%</code> vào cuối.</li>
          <li>Với kiểu <strong><code>g</code> / <code>G</code> (General format)</strong>: <code>.precision</code> là tổng số <strong>chữ số có nghĩa (significant digits)</strong> cả trước và sau dấu chấm.</li>
          <li>Với kiểu <strong>chuỗi <code>s</code></strong> (hoặc không ghi type cho <code>str</code>): <code>.precision</code> đóng vai trò <strong>độ dài tối đa (cắt ngắn chuỗi — truncation)</strong>!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Định dạng số thực, phần trăm và cắt ngắn chuỗi bằng .precision',
          code: `pi = 3.1415926535
growth = 0.08456
avogadro = 6.02214076e23
long_note = "Giao dịch thành công tại quầy số 12"

# 1. Số thực dấu phẩy động (f), Khoa học (e), Phần trăm (%)
print(f"Mặc định f : {pi:f}")
print(f"Làm tròn .3f: {pi:.3f}")
print(f"Khoa học .2e: {avogadro:.2e}")
print(f"Phần trăm  : {growth:.1%} (so với gốc {growth:.4f})")

# 2. Chữ số có nghĩa với g
for num in [0.000123456, 12.3456, 1234567.8]:
    print(f"Giá trị {num:<12} -> định dạng .4g: {num:.4g}")

# 3. Cắt ngắn chuỗi (truncation) kết hợp căn lề độ rộng cố định
# {:<15.10s} nghĩa là: cắt chuỗi lấy tối đa 10 ký tự đầu, sau đó căn trái trong ô rộng 15 ký tự!
print(f"[{long_note:<15.10s}]")`,
          output: `Mặc định f : 3.141593
Làm tròn .3f: 3.142
Khoa học .2e: 6.02e+23
Phần trăm  : 8.5% (so với gốc 0.0846)
Giá trị 0.000123456  -> định dạng .4g: 0.0001235
Giá trị 12.3456      -> định dạng .4g: 12.35
Giá trị 1234567.8    -> định dạng .4g: 1.235e+06
[Giao dịch      ]`,
          annotations: [
            { line: 7, text: 'Nếu chỉ ghi :f mà không ghi .precision, Python mặc định lấy 6 chữ số sau dấu chấm.' },
            { line: 10, text: '.1% tự động nhân 100 (0.08456 -> 8.456), làm tròn 1 chữ số thập phân thành 8.5%.' },
            { line: 18, text: 'Trên chuỗi, .10s cắt lấy 10 ký tự ("Giao dịch "), sau đó <15 đệm thêm 5 khoảng trắng cho đủ 15 ô.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: Định dạng Ngày Giờ (datetime) trực tiếp trong Format Spec',
      badge: null,
      content: `
        <p>Mini-Language trong Python không hề bị giới hạn cho số và chuỗi! Bất kỳ lớp nào cài đặt phương thức <code>__format__(self, format_spec)</code> đều có thể định nghĩa ngôn ngữ định dạng riêng. Tiêu biểu nhất là các đối tượng <code>datetime.date</code>, <code>datetime.time</code> và <code>datetime.datetime</code>.</p>
        <p>Khi đặt đối tượng <code>datetime</code> vào <code>{dt:...}</code>, toàn bộ chuỗi đứng sau dấu hai chấm <code>:</code> được chuyển thẳng cho <code>dt.strftime()</code>. Nhờ đó, bạn có thể viết <code>f"{now:%Y-%m-%d %H:%M:%S}"</code> trực tiếp mà không cần gọi phương thức <code>.strftime()</code> bên ngoài.</p>
      `,
      codeExamples: [
        {
          title: 'Định dạng datetime chuyên nghiệp ngay sau dấu hai chấm',
          code: `from datetime import datetime, timezone, timedelta

vn_tz = timezone(timedelta(hours=7))
event_time = datetime(2026, 10, 21, 14, 35, 9, tzinfo=vn_tz)

# Định dạng chuẩn ISO, ngày tháng kiểu Việt Nam và log timestamp
print(f"Chuẩn ngày giờ : {event_time:%Y-%m-%d %H:%M:%S %z}")
print(f"Kiểu Việt Nam  : Ngày {event_time:%d/%m/%Y} lúc {event_time:%I:%M %p}")
print(f"Tên thứ & Ngày : {event_time:%A, ngày %j của năm %Y}")`,
          output: `Chuẩn ngày giờ : 2026-10-21 14:35:09 +0700
Kiểu Việt Nam  : Ngày 21/10/2026 lúc 02:35 PM
Tên thứ & Ngày : Wednesday, ngày 294 của năm 2026`,
          annotations: [
            { line: 7, text: '%Y: năm 4 chữ số, %m: tháng 01-12, %d: ngày 01-31, %H:%M:%S: giờ 24h, %z: múi giờ UTC.' },
            { line: 8, text: '%I là giờ hệ 12 tiếng (01-12), đi kèm %p (AM/PM).' },
            { line: 9, text: '%A là tên thứ đầy đủ bằng tiếng Anh (theo locale mặc định), %j là ngày thứ bao nhiêu trong năm (001-366).' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Nhầm lẫn giữa dấu phẩy `,` cho hệ cơ số 16/2 và quy tắc làm tròn Round Half to Even',
        content: '1) Dấu phẩy `,` chỉ hợp lệ với kiểu thập phân (`d`, `f`, `e`, `g`, `%`). Nếu bạn viết `f"{255:,x}"`, Python sẽ ném `ValueError: Cannot specify \',\' with \'x\'`. Hãy dùng dấu gạch dưới `f"{255:_x}"` cho hệ nhị phân, bát phân và thập lục phân.\n2) Định dạng `.2f` dùng quy tắc làm tròn tới số chẵn gần nhất (Banker\'s Rounding) và chịu ảnh hưởng của biểu diễn nhị phân IEEE 754 (ví dụ `f"{2.675:.2f}"` ra `"2.67"`). Với tiền tệ chính xác tuyệt đối, hãy dùng kiểu `decimal.Decimal`.'
      },
      {
        title: 'Độ rộng `width` là mức TỐI THIỂU, không phải mức cắt ngắn',
        content: 'Nếu bạn định dạng `f"{123456789:5d}"` hoặc `f"{\'Chuỗi rất dài\':5s}"`, Python sẽ KHÔNG cắt bớt chuỗi về 5 ký tự mà in toàn bộ giá trị. Để ép chuỗi không vượt quá 5 ký tự, phải kết hợp cả `width` và `.precision`: `f"{text:5.5s}"`.'
      }
    ],
    tips: [
      {
        title: 'Tùy chọn [z] khử dấu âm của số thực -0.0 (Python 3.11+)',
        content: 'Trong tính toán khoa học, một số âm rất nhỏ như `-0.00001` khi làm tròn `.2f` sẽ in ra `"-0.00"`. Bạn có thể thêm cờ `z` ngay sau `[sign]` (ví dụ `f"{-0.00001:z.2f}"`) để Python tự động chuẩn hóa kết quả thành `"0.00"` dương!'
      }
    ],
    deepDive: {
      title: 'Cách tính độ rộng (width) khi có tiền tố #, dấu + và dấu phân nhóm',
      content: '<p>Trong Format Specification Mini-Language, tham số <code>width</code> quy định <strong>tổng số ký tự của toàn bộ kết quả đầu ra</strong>, bao gồm cả dấu (<code>+</code>, <code>-</code>), tiền tố hệ cơ số (<code>0x</code>, <code>0b</code>), dấu chấm thập phân, dấu phân nhóm nghìn (<code>,</code>, <code>_</code>) và phần mũ (<code>e+06</code>). Chẳng hạn, với <code>f"{48879:#08X}"</code>, chuỗi <code>"0XBEEF"</code> đã chiếm 6 ký tự (2 ký tự cho <code>0X</code> và 4 ký tự cho <code>BEEF</code>), do đó Python sẽ chèn đúng <code>8 - 6 = 2</code> chữ số <code>0</code> vào giữa để tạo thành <code>"0X00BEEF"</code>.</p>'
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'In hóa đơn căn cột chuẩn xác',
      problem: 'Cho danh sách món hàng `cart = [("Cà phê sữa", 2, 35000), ("Bánh sừng bò", 1, 42000), ("Trà đào cam sả đặc biệt", 3, 55000)]`. Hãy in từng dòng theo định dạng: Tên món (cắt tối đa 14 ký tự, căn trái trong ô rộng 14), Số lượng (căn phải rộng 3, đệm khoảng trắng), Thành tiền (căn phải rộng 10, có dấu phẩy tách nghìn), ngăn cách bởi `" | "`.',
      hint: 'Sử dụng {name:<14.14s} cho cột tên, {qty:>3d} cho số lượng và {qty * price:>10,d} cho thành tiền.',
      solutionCode: `cart = [
    ("Cà phê sữa", 2, 35000),
    ("Bánh sừng bò", 1, 42000),
    ("Trà đào cam sả đặc biệt", 3, 55000)
]

for name, qty, price in cart:
    total = qty * price
    print(f"{name:<14.14s} | {qty:>3d} | {total:>10,d}")`,
      solutionOutput: `Cà phê sữa     |   2 |     70,000
Bánh sừng bò   |   1 |     42,000
Trà đào cam sả |   3 |    165,000`,
      explanation: 'Cú pháp `<14.14s` đảm bảo cột tên món luôn có độ dài đúng 14 ký tự: nếu ngắn hơn sẽ được đệm khoảng trắng bên phải (`<14`), nếu dài hơn sẽ bị cắt bớt ở ký tự thứ 14 (`.14s`).'
    },
    {
      level: 'Vừa',
      title: 'Bảng tra cứu Thanh ghi Phần cứng (Dec / Hex / Bin)',
      problem: 'Cho danh sách các giá trị byte `registers = [0, 15, 170, 255]`. Hãy in bảng biểu diễn mỗi giá trị ở 3 cột: Hệ 10 (rộng 3, căn phải), Hệ 16 chữ hoa có tiền tố `0X` và đệm đủ 2 chữ số hex (tổng độ rộng 4), Hệ 2 có tiền tố `0b` đệm đủ 8 bit và tách nhóm 4 bit bằng dấu `_`.',
      hint: 'Với 8 bit nhị phân có "0b" (2 ký tự) + 8 bit + 1 dấu "_" ở giữa, tổng độ rộng width sẽ là 2 + 8 + 1 = 11 ký tự: {#011_b}.',
      solutionCode: `registers = [0, 15, 170, 255]

for val in registers:
    print(f"DEC: {val:>3d} | HEX: {val:#04X} | BIN: {val:#011_b}")`,
      solutionOutput: `DEC:   0 | HEX: 0X00 | BIN: 0b0000_0000
DEC:  15 | HEX: 0X0F | BIN: 0b0000_1111
DEC: 170 | HEX: 0XAA | BIN: 0b1010_1010
DEC: 255 | HEX: 0XFF | BIN: 0b1111_1111`,
      explanation: 'Khi kết hợp `#` (tiền tố `0b`), `0` (zero-padding), `11` (tổng độ rộng) và `_b` (nhị phân tách nhóm 4 bit), Python tính tổng độ dài chuỗi `"0b0000_0000"` là 11 ký tự và chèn các số 0 vào đúng phần chữ số.'
    },
    {
      level: 'Khó',
      title: 'Bộ định dạng biến động tài chính thông minh',
      problem: 'Viết hàm `format_metric(label, value, change_pct)` trả về chuỗi báo cáo 1 dòng. Yêu cầu:\n- `label`: căn trái, đệm dấu chấm `.` trong độ rộng 16.\n- `value`: số thực có dấu phẩy tách nghìn, 2 chữ số thập phân, căn phải trong độ rộng 12.\n- `change_pct`: tỷ lệ thay đổi (ví dụ `0.052` hoặc `-0.128`), luôn hiển thị dấu `+` hoặc `-`, định dạng phần trăm với 2 chữ số thập phân, nằm trong ngoặc đơn `(...)`.',
      hint: 'Dùng {label:.<16s}, {value:>12,.2f} và ({change_pct:+.2%}).',
      solutionCode: `def format_metric(label: str, value: float, change_pct: float) -> str:
    return f"{label:.<16s}{value:>12,.2f} ({change_pct:+.2%})"

print(format_metric("Doanh thu", 1452300.5, 0.1245))
print(format_metric("Chi phí vận hành", 320100.0, -0.038))
print(format_metric("Lợi nhuận ròng", 1132200.5, 0.0))`,
      solutionOutput: `Doanh thu.......1,452,300.50 (+12.45%)
Chi phí vận hành..320,100.00 (-3.80%)
Lợi nhuận ròng..1,132,200.50 (+0.00%)`,
      explanation: 'Sự kết hợp giữa fill/align (`.<16s`), grouping/precision (`>12,.2f`) và sign/percentage (`+.2%`) giúp tạo ra báo cáo tài chính chuyên nghiệp chỉ bằng một biểu thức định dạng duy nhất.'
    }
  ],

  quiz: [
    {
      question: 'Thứ tự nào sau đây là ĐÚNG theo quy tắc Format Specification Mini-Language của Python?',
      options: [
        '{val:0,+12.2f}',
        '{val:+012,.2f}',
        '{val:.2f+012,}',
        '{val:,+012.2f}'
      ],
      correctIndex: 1,
      explanation: 'Theo thứ tự chuẩn `[[fill]align][sign][#][0][width][grouping_option][.precision][type]`, dấu `+` (`sign`) phải đứng trước `0` (`zero-pad`), tiếp theo là `12` (`width`), rồi đến `,` (`grouping_option`), `.2` (`.precision`) và cuối cùng là `f` (`type`).'
    },
    {
      question: 'Kết quả của biểu thức `f"{-42:0>6d}"` khác gì so với `f"{-42:0=6d}"`?',
      options: [
        'Không khác gì nhau, cả hai đều trả về "-00042"',
        '`0>6d` trả về `"000-42"`, còn `0=6d` trả về `"-00042"`',
        '`0>6d` trả về `"-42000"`, còn `0=6d` trả về `"-00042"`',
        '`0=6d` gây lỗi ValueError'
      ],
      correctIndex: 1,
      explanation: 'Căn phải `>` đẩy toàn bộ chuỗi `"-42"` sang phải và điền ký tự đệm `0` vào bên trái dấu trừ (`"000-42"`). Trong khi đó, căn lề `=` đặt dấu `-` ở ngoài cùng bên trái rồi mới điền ký tự đệm vào giữa dấu và chữ số (`"-00042"`).'
    },
    {
      question: 'Khi áp dụng `.precision` lên một chuỗi văn bản, ví dụ `f"{\'Python 3.14\':>8.6s}"`, kết quả thu được là gì?',
      options: [
        '"Python 3.14"',
        '"Python  "',
        '"  Python"',
        'Lỗi ValueError vì chuỗi không hỗ trợ .precision'
      ],
      correctIndex: 2,
      explanation: 'Với kiểu chuỗi `s`, `.6` trước hết cắt chuỗi `"Python 3.14"` chỉ giữ lại tối đa 6 ký tự đầu tiên là `"Python"`. Sau đó `>8` căn phải chuỗi 6 ký tự đó trong độ rộng 8, thêm 2 khoảng trắng ở đầu thành `"  Python"`.'
    },
    {
      question: 'Định dạng nào sau đây dùng để in số nguyên `n = 255` dưới dạng thập lục phân chữ thường có tiền tố `0x` và tổng độ rộng 6 ký tự đệm bằng số `0` (`"0x00ff"`)?',
      options: [
        'f"{n:#04x}"',
        'f"{n:#06x}"',
        'f"{n:06#x}"',
        'f"{n:#60x}"'
      ],
      correctIndex: 1,
      explanation: 'Cờ `#` đứng trước `0` và `width`. Vì `width` tính cả 2 ký tự của tiền tố `"0x"`, nên để có `"0x00ff"` (dài 6 ký tự), ta phải chỉ định độ rộng là `6`: `{n:#06x}`.'
    }
  ],

  summary: [
    'Mọi chuỗi định dạng đều tuân theo thứ tự: `[[fill]align][sign][#][0][width][grouping_option][.precision][type]`.',
    'Bốn kiểu căn lề gồm `<` (trái), `>` (phải), `^` (giữa) và `=` (đệm vào giữa dấu/tiền tố và chữ số).',
    'Cờ `#` tự động thêm tiền tố `0b`, `0o`, `0x`/`0X`; tùy chọn phân nhóm `_` hỗ trợ tách nhóm 4 chữ số cho cả hệ nhị phân và thập lục phân.',
    'Tham số `.precision` quy định số chữ số thập phân cho `f`/`e`/`%`, số chữ số có nghĩa cho `g`, và độ dài cắt ngắn tối đa cho chuỗi `s`.',
    'Đối tượng `datetime` tích hợp trực tiếp với Mini-Language thông qua các mã định dạng `strftime` như `{dt:%Y-%m-%d %H:%M}`.'
  ]
};
