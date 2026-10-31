export default {
  id: 'lp-c11-04',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.4',
  title: 'Phép gán Tăng cường (Augmented Assignment) — Bảng 11-2 & Tối ưu hóa Tại chỗ',
  subtitle: '13 dạng câu lệnh gán tăng cường trong Bảng 11-2, 3 ưu thế vượt trội, cơ chế ánh xạ tự động tới extend() trên danh sách và tác động tinh vi tới tham chiếu chia sẻ',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững toàn bộ 13 định dạng câu lệnh gán tăng cường trong Bảng 11-2 được tiếp nhận từ ngôn ngữ C.',
    'Phân tích 3 ưu điểm then chốt: tiết kiệm thao tác gõ, đánh giá vế trái duy nhất một lần, và tự động tối ưu hóa cập nhật tại chỗ (in-place).',
    'Thấu hiểu cơ chế CPython: phép toán += trên danh sách tự động ánh xạ tới phương thức extend() nhanh hơn, cho phép nhận iterable bất kỳ thay vì báo TypeError như phép + thông thường.',
    'Nhận diện sự khác biệt sâu sắc giữa L = L + [val] và L += [val] khi có nhiều biến cùng chia sẻ tham chiếu.'
  ],

  intuition: {
    title: 'Xây Nhà Mới Khác Với Kê Thêm Giường Vào Phòng',
    metaphor: 'Khi bạn viết L = L + [3], bạn giống như một người muốn thêm một chiếc giường nhưng lại quyết định đập bỏ ngôi nhà cũ, mua một lô đất mới, bê nguyên vẹn đồ đạc từ nhà cũ sang, đặt thêm chiếc giường số 3 vào, rồi mới chuyển địa chỉ hộ khẩu L sang nhà mới. Rất tốn kém thời gian và công sức! Ngược lại, phép gán tăng cường L += [3] giống như việc bạn mở cửa bước thẳng vào căn phòng sẵn có và kê thêm chiếc giường vào góc phòng (cập nhật tại chỗ in-place). Căn nhà không đổi, địa chỉ không đổi, và nếu có người bạn M đang cùng ở chung nhà với bạn, anh ta cũng sẽ lập tức thấy chiếc giường mới xuất hiện!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH BỘ NHỚ GIỮA PHÉP GÉP NỐI (+) VÀ GÁN TĂNG CƯỜNG (+=) TRÊN LIST</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;">
            <div style="color:var(--warning);font-weight:700;">L = L + [3] (Ghép nối)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:6px;">
              • Tạo ra đối tượng List MỚI<br>
              • Sao chép toàn bộ phần tử cũ sang<br>
              • Nếu M trỏ L cũ, M KHÔNG bị đổi
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;">
            <div style="color:#10b981;font-weight:700;">L += [3] (Ánh xạ extend)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:6px;">
              • Cập nhật TẠI CHỖ (in-place)<br>
              • Không tạo đối tượng mới, chạy cực nhanh<br>
              • Nếu M trỏ L, M CŨNG thấy thay đổi!
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Toàn Cảnh Bảng 11-2 — Các Định Dạng Câu Lệnh Gán Tăng Cường',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 15–16 / 38</strong>.</p>
          </div>
        </div>

        <p>Được vay mượn từ ngôn ngữ C từ khá sớm trong tiến trình phát triển của Python, các <strong>phép gán tăng cường (augmented assignments)</strong> phần lớn là cách viết tắt ngụ ý sự kết hợp giữa một biểu thức hai ngôi (hai toán hạng) và một phép gán:</p>
        <pre><code>X = X + Y  # Dạng cơ bản (lặp lại X)
X += Y     # Dạng tăng cường (ngắn gọn, tối ưu)</code></pre>

        <p>Bảng 11-2 liệt kê toàn bộ 13 định dạng câu lệnh gán tăng cường có sẵn trong Python:</p>

        <div class="table-wrapper" style="margin:20px 0;">
          <table class="markdown-table" style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:10px 14px;color:var(--accent-primary);">Câu lệnh gán tăng cường</th>
                <th style="padding:10px 14px;color:var(--accent-primary);">Ý nghĩa giải thích</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X += Y</code></td>
                <td style="padding:8px 14px;">Cộng và gán (hoặc ghép nối / extend chuỗi/danh sách)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X -= Y</code></td>
                <td style="padding:8px 14px;">Trừ và gán (trên số hoặc phép hiệu tập hợp set)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X *= Y</code></td>
                <td style="padding:8px 14px;">Nhân và gán (hoặc nhân bản dãy tuần tự)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X /= Y</code></td>
                <td style="padding:8px 14px;">Chia thực và gán (trả về float)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X @= Y</code></td>
                <td style="padding:8px 14px;">Nhân ma trận và gán (dành cho NumPy, chưa dùng trong Python cốt lõi)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X //= Y</code></td>
                <td style="padding:8px 14px;">Chia lấy sàn và gán (floor division)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X %= Y</code></td>
                <td style="padding:8px 14px;">Chia lấy dư và gán (hoặc định dạng chuỗi cũ %)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X **= Y</code></td>
                <td style="padding:8px 14px;">Lũy thừa và gán</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X >>= Y</code></td>
                <td style="padding:8px 14px;">Dịch phải bit và gán</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X <<= Y</code></td>
                <td style="padding:8px 14px;">Dịch trái bit và gán</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X &= Y</code></td>
                <td style="padding:8px 14px;">Phép AND trên bit (bitwise) và gán (hoặc giao tập hợp set)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>X |= Y</code></td>
                <td style="padding:8px 14px;">Phép OR trên bit (bitwise) và gán (hoặc hợp nhất dict/set từ Python 3.9)</td>
              </tr>
              <tr>
                <td style="padding:8px 14px;"><code>X ^= Y</code></td>
                <td style="padding:8px 14px;">Phép XOR trên bit (bitwise) và gán (hoặc hiệu đối xứng set)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin:16px 0;">
          <div class="callout-header">
            <span>📌</span>
            <span><strong>Chú thích [1] dành cho lập trình viên C/C++:</strong></span>
          </div>
          <div class="callout-body">
            <p>Mặc dù Python hỗ trợ đầy đủ các câu lệnh như <code>X += Y</code>, nó <strong>hoàn toàn không có các toán tử tự động tăng/giảm</strong> như <code>X++</code>, <code>++X</code>, <code>X--</code>, <code>--X</code>. Những toán tử này không ánh xạ vào mô hình đối tượng của Python vì số học trong Python là đối tượng bất biến (không có khái niệm thay đổi tại chỗ cho con số). Tương tự, Python cũng không có biểu thức gán có tên tăng cường dạng <code>:+= 1</code>.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khảo sát các phép gán tăng cường trên số nguyên và chuỗi ký tự',
          code: `# Gán tăng cường số nguyên
x = 1
x += 1 # Tương đương x = x + 1
print("x sau khi += 1:", x)

x *= 5 # Tương đương x = x * 5
print("x sau khi *= 5:", x)

x **= 2 # Lũy thừa 10^2
print("x sau khi **= 2:", x)

# Gán tăng cường trên chuỗi (ghép nối)
S = 'hack'
S += 'HACK' # Ghép chuỗi ngầm định
print("Chuỗi S sau khi +=:", S)`,
          output: `x sau khi += 1: 2
x sau khi *= 5: 10
x sau khi **= 2: 100
Chuỗi S sau khi +=: hackHACK`,
          annotations: [
            { line: 3, text: 'Toán tử += thay đổi tham chiếu của x sang đối tượng số 2.' },
            { line: 13, text: 'Chuỗi là bất biến nên S += \'HACK\' tạo đối tượng chuỗi mới \'hackHACK\'.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Ba Ưu Thế Cốt Lõi & Cơ Chế Tối Ưu Hóa Tại Chỗ Của CPython',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 17–18 / 38</strong>.</p>
          </div>
        </div>

        <p>Mark Lutz chỉ rõ <strong>ba ưu điểm vượt trội</strong> giúp phép gán tăng cường trở thành chuẩn mực viết mã trong Python thực tế:</p>

        <ol>
          <li><strong>Gõ ít ký tự hơn:</strong> Đơn giản, ngắn gọn và tránh lặp lại tên biến dài.</li>
          <li>
            <strong>Vế trái chỉ cần đánh giá duy nhất một lần:</strong> Trong câu lệnh <code>X += Y</code>, nếu <code>X</code> là một biểu thức phức tạp (ví dụ <code>matrix[i][j + offset()] += 1</code>), địa chỉ của <code>X</code> chỉ được tính toán 1 lần duy nhất. Trong khi ở dạng <code>X = X + Y</code>, biểu thức vế trái xuất hiện 2 lần và bắt buộc phải chạy 2 lần, làm chậm tốc độ thực thi đáng kể.
          </li>
          <li>
            <strong>Kỹ thuật tối ưu hóa tại chỗ được tự động lựa chọn:</strong> Đối với các đối tượng khả biến (như danh sách), các dạng tăng cường sẽ <strong>tự động thực hiện thao tác thay đổi tại chỗ (in-place)</strong> thay vì thực hiện các phép sao chép đối tượng chậm chạp.
          </li>
        </ol>

        <h3>Cơ chế ngầm định trên List: += tự động gọi extend()</h3>
        <p>Để nối thêm các phần tử vào một danh sách, chúng ta có hai cách:</p>
        <ul>
          <li><code>L = L + [5, 6]</code>: Bắt buộc tạo ra một danh sách mới toanh, sao chép toàn bộ phần tử của <code>L</code> sang, rồi sao chép tiếp <code>[5, 6]</code> vào. Cực kỳ tốn bộ nhớ và chậm chạp.</li>
          <li><code>L.extend([7, 8])</code>: Thêm trực tiếp các con trỏ phần tử vào cuối khối bộ nhớ hiện có của <code>L</code> mà không cần cấp phát lại đối tượng danh sách mới. Chạy nhanh vượt trội.</li>
        </ul>
        <p>Khi bạn viết <code>L += [9, 10]</code>, Python tự động ánh xạ lệnh này sang phương thức <code>extend()</code> tại chỗ!</p>

        <h3>Sự khác biệt về tính chấp nhận Iterable</h3>
        <p>Chính vì <code>+=</code> ánh xạ tới <code>extend()</code>, nó thừa hưởng sự linh hoạt tuyệt vời: <strong><code>+=</code> chấp nhận bất kỳ dãy tuần tự hoặc iterable nào ở vế phải (kể cả chuỗi ký tự)</strong>, trong khi phép cộng thông thường <code>+</code> sẽ lập tức báo lỗi <code>TypeError</code>:</p>
        <pre><code>>>> L = []
>>> L += 'hack'       # += chấp nhận chuỗi như extend()!
>>> L
['h', 'a', 'c', 'k']

>>> L = L + 'code'    # Phép cộng thông thường bắt buộc cả hai vế là list
TypeError: can only concatenate list (not "str") to list</code></pre>

        <h3>Gán tăng cường trên Chỉ mục và Lát cắt</h3>
        <p>Phép gán tăng cường cũng hoạt động tuyệt vời trên các mục tiêu chỉ mục và lát cắt để cập nhật cấu trúc dữ liệu tại chỗ:</p>
        <pre><code>>>> L = [1, 2]
>>> L[0] += 10        # Thay đổi phần tử đầu tiên tại chỗ: [11, 2]
>>> L[-1:] += [3, 4]  # Mở rộng đoạn cuối tại chỗ: [11, 2, 3, 4]</code></pre>
      `,
      codeExamples: [
        {
          title: 'Khảo sát hiệu năng và tính chấp nhận Iterable của phép gán tăng cường trên List',
          code: `# 1. Phép gán += trên danh sách chấp nhận chuỗi ký tự
L = [1, 2]
L += 'AB' # Tương đương L.extend('AB')
print("L sau khi += 'AB':", L)

# 2. Phép gán tăng cường trên chỉ mục
L[0] += 100
print("L sau khi L[0] += 100:", L)

# 3. Phép gán tăng cường trên lát cắt
L[-2:] += ['X', 'Y']
print("L sau khi L[-2:] += ['X', 'Y']:", L)

# 4. Thử nghiệm TypeError của phép + thông thường
try:
    L = L + "loi_kieu"
except TypeError as err:
    print("Phép + thông thường báo lỗi:", err)`,
          output: `L sau khi += 'AB': [1, 2, 'A', 'B']
L sau khi L[0] += 100: [101, 2, 'A', 'B']
L sau khi L[-2:] += ['X', 'Y']: [101, 2, 'A', 'B', 'X', 'Y']
Phép + thông thường báo lỗi: can only concatenate list (not "str") to list`,
          annotations: [
            { line: 3, text: '+= tự động duyệt chuỗi \'AB\' và thêm từng ký tự vào danh sách.' },
            { line: 7, text: 'L[0] += 100 cập nhật giá trị số nguyên tại vị trí chỉ mục 0.' },
            { line: 17, text: 'Phép ghép nối + bắt buộc hai toán hạng phải cùng kiểu list.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phép Gán Tăng Cường và Cạm Bẫy Tham Chiếu Chia Sẻ',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 18–19 / 38</strong>.</p>
          </div>
        </div>

        <p>Tinh vi hơn rất nhiều, sự thay đổi tại chỗ ngầm định trong <code>+=</code> đối với danh sách rất khác biệt so với đối tượng hoàn toàn mới được tạo ra bởi phép ghép nối <code>+</code>. Khi có nhiều biến cùng tham chiếu đến một đối tượng danh sách, sự khác biệt này có thể tạo ra những tác dụng phụ ngoài ý muốn:</p>

        <h3>Trường hợp 1: Phép ghép nối thông thường (+) bảo vệ biến chia sẻ</h3>
        <pre><code>>>> L = [1, 2]
>>> M = L              # L và M cùng trỏ vào một danh sách
>>> L = L + [3, 4]     # Phép + tạo ra một danh sách MỚI gán cho L
>>> L, M
([1, 2, 3, 4], [1, 2]) # M vẫn giữ nguyên danh sách ban đầu!</code></pre>
        <p>Tại đây, việc gán <code>L = L + [3, 4]</code> làm cho biến <code>L</code> trỏ sang một đối tượng danh sách mới. Biến <code>M</code> vẫn trỏ vào danh sách cũ <code>[1, 2]</code> và hoàn toàn không bị ảnh hưởng.</p>

        <h3>Trường hợp 2: Phép gán tăng cường (+=) biến đổi biến chia sẻ</h3>
        <pre><code>>>> L = [1, 2]
>>> M = L              # L và M cùng trỏ vào một danh sách
>>> L += [3, 4]        # += thực sự gọi extend() tại chỗ!
>>> L, M
([1, 2, 3, 4], [1, 2, 3, 4]) # M CŨNG BỊ ĐỔI THEO!</code></pre>
        <p>Tại đây, vì <code>+=</code> thay đổi danh sách tại chỗ trên vùng nhớ hiện tại, biến <code>M</code> vốn đang trỏ cùng vùng nhớ đó cũng lập tức nhìn thấy các phần tử mới <code>[3, 4]</code>!</p>
        <p>Mark Lutz nhắc nhở: <em>Đây là một góc khuất tinh vi của Python mà mọi kỹ sư đều phải nắm vững trước khi nó âm thầm gây lỗi trong mã nguồn của bạn. Nếu cần bảo vệ dữ liệu khi chia sẻ tham chiếu, hãy luôn chủ động tạo bản sao độc lập!</em></p>
      `,
      codeExamples: [
        {
          title: 'Đối chứng tác động của + và += tới tham chiếu chia sẻ',
          code: `# Kịch bản A: Phép + tạo đối tượng mới (M giữ nguyên)
L1 = [1, 2]
M1 = L1
L1 = L1 + [3, 4]
print("Kịch bản A (L = L + [3, 4]):")
print("  L1 =", L1)
print("  M1 =", M1, "(An toàn, không bị đổi)")
print("  L1 is M1:", L1 is M1)

# Kịch bản B: Phép += cập nhật tại chỗ (M2 bị đổi theo!)
L2 = [1, 2]
M2 = L2
L2 += [3, 4] # Gọi extend() tại chỗ
print("\\nKịch bản B (L += [3, 4]):")
print("  L2 =", L2)
print("  M2 =", M2, "(Bị đổi theo ngoài ý muốn!)")
print("  L2 is M2:", L2 is M2)`,
          output: `Kịch bản A (L = L + [3, 4]):
  L1 = [1, 2, 3, 4]
  M1 = [1, 2] (An toàn, không bị đổi)
  L1 is M1: False

Kịch bản B (L += [3, 4]):
  L2 = [1, 2, 3, 4]
  M2 = [1, 2, 3, 4] (Bị đổi theo ngoài ý muốn!)
  L2 is M2: True`,
          annotations: [
            { line: 4, text: 'Phép + gán lại con trỏ L1 sang đối tượng danh sách mới.' },
            { line: 14, text: 'Phép += giữ nguyên đối tượng và sửa đổi trực tiếp, làm M2 đổi theo.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Lời khuyên từ Mark Lutz: Khi nào dùng + và khi nào dùng +=?',
        content: 'Dùng += khi bạn muốn tối ưu tốc độ và chắc chắn rằng không có biến nào khác đang cần bảo toàn trạng thái cũ của danh sách. Nếu danh sách được truyền từ bên ngoài vào hàm hoặc được chia sẻ qua nhiều module, hãy cẩn trọng với += hoặc chủ động tạo bản sao danh sách bằng L = L[:] trước khi thao tác.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tối ưu hóa bộ tích lũy ma trận bằng phép gán tăng cường',
      level: 'Trung bình',
      problem: 'Viết một hàm gom_du_lieu(ds_goc, du_lieu_moi) nhận vào một danh sách và một chuỗi ký tự các mã code (ví dụ: "PY314"). Hãy sử dụng phép gán tăng cường để nạp toàn bộ các ký tự của chuỗi vào cuối danh sách tại chỗ và chứng minh rằng đối tượng danh sách không bị thay đổi địa chỉ id.',
      hint: 'Áp dụng tính chất += trên danh sách chấp nhận chuỗi như phương thức extend().',
      solutionCode: `def gom_du_lieu(ds_goc, chuoi_ma):
    id_truoc = id(ds_goc)
    ds_goc += chuoi_ma # Cập nhật tại chỗ
    id_sau = id(ds_goc)
    print("Địa chỉ bộ nhớ không đổi:", id_truoc == id_sau)
    return ds_goc

kho = ['CODE']
ket_qua = gom_du_lieu(kho, '123')
print("Danh sách sau khi nạp:", ket_qua)`,
      solutionOutput: `Địa chỉ bộ nhớ không đổi: True
Danh sách sau khi nạp: ['CODE', '1', '2', '3']`,
      explanation: 'Phép gán tăng cường += biến đổi danh sách tại chỗ (in-place) nên địa chỉ bộ nhớ id của kho hoàn toàn giữ nguyên.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây KHÔNG PHẢI là ưu điểm của phép gán tăng cường (augmented assignment)?',
      options: [
        'Giúp viết mã ngắn gọn, tốn ít ký tự hơn.',
        'Vế trái chỉ cần được đánh giá duy nhất một lần.',
        'Tự động chọn thao tác cập nhật tại chỗ (in-place) trên đối tượng khả biến để tối ưu hiệu năng.',
        'Tự động sao chép sâu (deep copy) đối tượng để tránh xung đột dữ liệu.'
      ],
      correctIndex: 3,
      explanation: 'Phép gán tăng cường không hề sao chép dữ liệu; ngược lại, trên các đối tượng khả biến nó thực hiện thay đổi tại chỗ để tăng tốc độ thực thi.'
    },
    {
      question: 'Điều gì xảy ra khi bạn chạy hai dòng lệnh sau: L = []; L += \'abc\'?',
      options: [
        'Phát sinh ngoại lệ TypeError vì không thể cộng list với chuỗi str.',
        'L trở thành [\'abc\'].',
        'L trở thành [\'a\', \'b\', \'c\'] vì += trên list tự động gọi phương thức extend().',
        'L trở thành [].'
      ],
      correctIndex: 2,
      explanation: 'Trên đối tượng list, toán tử += được ánh xạ tới phương thức extend(), cho phép nhận bất kỳ iterable nào (kể cả chuỗi) và giải nén từng phần tử vào list.'
    },
    {
      question: 'Cho đoạn mã: L = [1, 2]; M = L; L += [3]. Giá trị của biến M sau câu lệnh là gì?',
      options: [
        '[1, 2]',
        '[1, 2, 3]',
        '[3]',
        'None'
      ],
      correctIndex: 1,
      explanation: 'Vì L += [3] thực hiện cập nhật tại chỗ trên danh sách mà L và M cùng tham chiếu, nên M cũng sẽ thấy danh sách được bổ sung thành [1, 2, 3].'
    }
  ],

  summary: [
    'Phép gán tăng cường kết hợp toán tử hai ngôi và phép gán (X += Y), có 13 biến thể trong Bảng 11-2.',
    'Ba ưu điểm then chốt: ít gõ hơn, đánh giá vế trái duy nhất một lần, và tự động tối ưu hóa tại chỗ.',
    'Trên danh sách, += tương đương phương thức extend(), chạy nhanh hơn phép + và chấp nhận mọi iterable ở vế phải.',
    'Cần lưu ý cạm bẫy tham chiếu chia sẻ: += làm thay đổi tất cả các biến đang cùng trỏ tới đối tượng danh sách đó.'
  ]
};
