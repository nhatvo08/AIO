export default {
  id: 'p0-07',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.7',
  title: 'Nhập xuất dữ liệu: print, input, f-string và repr',
  subtitle: 'Kỹ năng tương tác cơ bản: Các tham số sep/end của print, cạm bẫy input luôn là str, ValueError và sự khác biệt giữa str() vs repr()',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ hàm `print()` với các tham số quan trọng: `sep` (ký tự phân tách) và `end` (ký tự kết thúc dòng).',
    'Khắc cốt ghi tâm: Hàm `input()` LUÔN LUÔN trả về chuỗi văn bản (`str`), nắm cách ép kiểu tường minh và bắt lỗi `ValueError` khi người dùng nhập sai.',
    'Thành thạo định dạng đầu ra bằng `f-string`: căn lề, độ chính xác số thực và chuyển đổi chuyển tiếp.',
    'Hiểu sự khác biệt bản chất giữa `str()` (dành cho con người đọc) và `repr()` (dành cho lập trình viên/gỡ lỗi), và vì sao màn hình REPL luôn hiển thị bằng `repr()`.'
  ],

  intuition: {
    title: 'Cửa sổ giao tiếp giữa Con người và Cỗ máy',
    metaphor: 'Hàm input() giống như chiếc micro thu âm của chương trình: cho dù bạn hét vào micro một con số "123", micro cũng chỉ ghi nhận được sóng âm thanh (chuỗi ký tự "123") chứ chiếc micro không thể tự biết đó là số tiền hay số tuổi. Bạn buộc phải dùng chiếc máy quét int() để phân tích chuỗi đó thành con số thực sự. Còn hàm print() giống như chiếc loa phát thanh: bạn có thể gắn thêm bộ lọc để ngăn cách các từ bằng dấu gạch ngang (sep) hoặc không thèm xuống dòng mà phát liên tục (end). Khi nhìn vào một đối tượng, hàm str() giống như bức ảnh chụp sản phẩm trên tạp chí (đẹp đẽ, thân thiện với người xem), còn repr() giống như bản vẽ kỹ thuật X-quang của kỹ sư (thấy rõ từng linh kiện bên trong để gỡ lỗi).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">LUỒNG NHẬP DỮ LIỆU TỪ BÀN PHÍM VÀ ÉP KIỂU</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;">
          <div style="padding:10px 14px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">Bàn phím nhập</span>
            <strong style="color:var(--text-primary);">"42"</strong>
          </div>
          <span style="color:var(--accent-primary);font-weight:700;">──input()──►</span>
          <div style="padding:10px 14px;border:1px solid var(--danger);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">Luôn là kiểu str!</span>
            <strong style="color:var(--danger);">'42'</strong>
          </div>
          <span style="color:var(--success);font-weight:700;">──int('42')──►</span>
          <div style="padding:10px 14px;border:1px solid var(--success);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">Số nguyên tính toán được</span>
            <strong style="color:var(--success);">42 (int)</strong>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Hàm print() — Làm chủ sep, end và in nhiều đối tượng',
      badge: 'Xuất Dữ liệu',
      content: `
        <p>Hàm <code>print(*objects, sep=' ', end='\\n', file=None, flush=False)</code> là công cụ xuất dữ liệu cơ bản nhất. Hai tham số tùy biến thường dùng nhất:</p>
        <ul>
          <li><strong><code>sep</code> (Separator - Ký tự phân tách):</strong> Mặc định là một dấu cách đơn <code>" "</code> đặt giữa các đối tượng. Bạn có thể đổi thành dấu phẩy, gạch ngang, hoặc ký tự xuống dòng.</li>
          <li><strong><code>end</code> (Ký tự kết thúc):</strong> Mặc định là ký tự xuống dòng <code>"\\n"</code>. Nếu bạn muốn in liên tiếp nhiều nội dung trên cùng một dòng, hãy đặt <code>end=""</code> hoặc <code>end=" "</code>.</li>
          <li><strong><code>flush=True</code>:</strong> Ép bộ đệm xuất ngay lập tức ra màn hình mà không chờ đầy bộ đệm (rất hữu ích khi viết thanh tiến độ loading).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khám phá tham số sep và end trong print()',
          code: `# In cơ bản nhiều đối tượng (mặc định sep=' ')
print("Ngày", 22, "Tháng", 10, "Năm", 2026)

# Tùy biến ký tự phân tách sep
print("2026", "10", "22", sep="-")
print("user", "domain.com", sep="@")
print("Dòng 1", "Dòng 2", "Dòng 3", sep="\\n")

# Tùy biến ký tự kết thúc end để không xuống dòng
print("Đang tải dữ liệu", end="...")
print(" [XONG 100%]")`,
          output: `Ngày 22 Tháng 10 Năm 2026
2026-10-22
user@domain.com
Dòng 1
Dòng 2
Dòng 3
Đang tải dữ liệu... [XONG 100%]`,
          annotations: [
            { line: 5, text: 'sep="-" tự động chèn dấu gạch nối giữa các đối tượng.' },
            { line: 7, text: 'sep="\\n" biến mỗi đối tượng thành một dòng riêng.' },
            { line: 10, text: 'end="..." giữ con trỏ trên cùng dòng để lệnh print kế tiếp in nối đuôi.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Cạm bẫy input() luôn là str & Lỗi ValueError khi ép kiểu',
      badge: 'Nhập Dữ liệu',
      content: `
        <p>Một trong những lỗi kinh điển nhất của người mới học là viết:</p>
        <pre class="code-pre"><code>tuoi = input("Nhập tuổi: ") # Nhập vào: 20
print(tuoi + 5)             # ❌ TypeError: can only concatenate str (not "int") to str!</code></pre>
        <p><strong>Bản chất:</strong> Hàm <code>input()</code> đọc toàn bộ những gì người dùng gõ từ bàn phím dưới dạng một dòng văn bản thô, và <strong>LUÔN LUÔN trả về một đối tượng kiểu <code>str</code></strong>.</p>
        <p>Để tính toán số học, bạn bắt buộc phải ép kiểu bằng <code>int()</code> hoặc <code>float()</code>. Nếu người dùng nhập vào chữ cái hoặc khoảng trắng không thể đổi thành số (như nhập <code>"abc"</code>), Python sẽ văng lỗi <code>ValueError: invalid literal for int() with base 10</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Mô phỏng nhập liệu an toàn với try...except bắt lỗi ValueError',
          code: `# Giả lập dữ liệu chuỗi lấy từ input()
du_lieu_nhap = "25"

# Ép kiểu đúng
tuoi = int(du_lieu_nhap)
print(f"Sang năm bạn sẽ {tuoi + 1} tuổi.")

# Xử lý an toàn khi người dùng nhập sai dữ liệu
du_lieu_loi = "hai muoi"
try:
    so_tien = int(du_lieu_loi)
except ValueError as err:
    print("\\nBắt lỗi nhập sai kiểu an toàn:")
    print("Thông báo lỗi:", err)
    print("Khắc phục: Vui lòng chỉ nhập số nguyên hợp lệ!")`,
          output: `Sang năm bạn sẽ 26 tuổi.

Bắt lỗi nhập sai kiểu an toàn:
Thông báo lỗi: invalid literal for int() with base 10: 'hai muoi'
Khắc phục: Vui lòng chỉ nhập số nguyên hợp lệ!`,
          annotations: [
            { line: 5, text: 'int("25") chuyển chuỗi thành số nguyên 25.' },
            { line: 12, text: 'Bắt lỗi ValueError ngăn chặn chương trình bị crash khi người dùng nhập sai cú pháp số.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: str() khác gì repr()? Vì sao REPL hiển thị bằng repr?',
      badge: 'Bản chất Sâu sắc',
      content: `
        <p>Trong Python, mỗi đối tượng có thể được biến thành chuỗi văn bản theo <strong>hai cách nhìn hoàn toàn khác nhau</strong>:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th><code>str(obj)</code></th>
                <th><code>repr(obj)</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mục đích</strong></td>
                <td>Dành cho <strong>người dùng cuối</strong> đọc. Ưu tiên sự tự nhiên, sạch sẽ, dễ nhìn.</td>
                <td>Dành cho <strong>lập trình viên & gỡ lỗi (debugging)</strong>. Ưu tiên tính chính xác, không mập mờ.</td>
              </tr>
              <tr>
                <td><strong>Phương thức CPython</strong></td>
                <td><code>obj.__str__()</code></td>
                <td><code>obj.__repr__()</code></td>
              </tr>
              <tr>
                <td><strong>Quy tắc vàng</strong></td>
                <td>Ẩn đi dấu nháy, ký tự escape <code>\\n</code>, <code>\\t</code> để người đọc dễ chịu.</td>
                <td>Hiển thị rõ dấu nháy, kiểu dữ liệu, sao cho copy chuỗi đó dán vào Python có thể tạo lại đối tượng!</td>
              </tr>
              <tr>
                <td><strong>Nơi sử dụng</strong></td>
                <td>Hàm <code>print()</code> mặc định dùng <code>str()</code>.</td>
                <td>Màn hình <strong>REPL</strong> luôn dùng <code>repr()</code> để hiển thị kết quả tính toán!</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh trực quan giữa str() và repr()',
          code: `import datetime

# 1. So sánh trên chuỗi có ký tự đặc biệt
van_ban = "Dòng 1\\nDòng 2\\tCách"

print("=== IN BẰNG STR (PRINT THÔNG THƯỜNG) ===")
print(str(van_ban))

print("\\n=== IN BẰNG REPR (CHÍNH XÁC KỸ THUẬT) ===")
print(repr(van_ban))

# 2. So sánh trên đối tượng thời gian datetime
hom_nay = datetime.date(2026, 10, 22)
print("\\nĐối tượng Date:")
print("str()  ->", str(hom_nay), "(Dễ đọc cho người dùng)")
print("repr() ->", repr(hom_nay), "(Chính xác cú pháp tạo đối tượng)")

# 3. f-string với hậu tố !r và !s
ten = "Python"
print(f"\\nf-string mặc định: {ten}")
print(f"f-string với !r:   {ten!r}")`,
          output: `=== IN BẰNG STR (PRINT THÔNG THƯỜNG) ===
Dòng 1
Dòng 2	Cách

=== IN BẰNG REPR (CHÍNH XÁC KỸ THUẬT) ===
'Dòng 1\\nDòng 2\\tCách'

Đối tượng Date:
str()  -> 2026-10-22 (Dễ đọc cho người dùng)
repr() -> datetime.date(2026, 10, 22) (Chính xác cú pháp tạo đối tượng)

f-string mặc định: Python
f-string với !r:   'Python'`,
          annotations: [
            { line: 7, text: 'str() thực hiện các thao tác xuống dòng và tab thực tế.' },
            { line: 10, text: 'repr() hiển thị rõ ký tự escape \\n, \\t và bọc chuỗi trong dấu nháy đơn.' },
            { line: 20, text: 'f-string với hậu tố !r tự động gọi repr() của biến.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cộng chuỗi nhận từ input() thay vì cộng số',
        content: 'Nếu bạn viết `a = input()` và nhập `5`, `b = input()` và nhập `3`, phép `a + b` sẽ cho ra `"53"` (nối chuỗi) chứ không phải `8`! Hãy luôn ép kiểu rõ ràng: `int(a) + int(b)`.'
      },
      {
        title: 'Ép kiểu int("3.14") trực tiếp gây lỗi ValueError',
        content: 'Hàm `int()` không thể ép một chuỗi có chứa dấu chấm thập phân. Muốn chuyển chuỗi `"3.14"` thành số nguyên 3, bạn phải chuyển qua số thực trước: `int(float("3.14"))`.'
      }
    ],
    tips: [
      {
        title: 'Dùng f-string với cú pháp {bien=}',
        content: 'Từ Python 3.8+, khi gỡ lỗi bạn có thể viết `print(f"{x=}, {y=}")`. Python sẽ tự động in ra tên biến kèm dấu bằng và giá trị repr của nó, ví dụ: `x=10, y=\'abc\'`.'
      }
    ],
    deepDive: {
      title: 'Quy tắc Fallback: Nếu một class không có __str__ thì sao?',
      content: `
        <p>Khi bạn gọi <code>str(obj)</code> trên một đối tượng tùy biến:</p>
        <ol>
          <li>CPython tìm phương thức <code>__str__()</code> của lớp đó.</li>
          <li>Nếu không tìm thấy <code>__str__()</code>, CPython sẽ <strong>tự động gọi phương thức <code>__repr__()</code> để làm phương án thay thế dự phòng (fallback)</strong>!</li>
          <li>Do đó, quy tắc chuẩn khi thiết kế class là: Luôn luôn viết <code>__repr__()</code> trước tiên để phục vụ gỡ lỗi.</li>
        </ol>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Định dạng bảng hóa đơn mua hàng bằng print và f-string',
      problem: 'Cho thông tin món hàng: tên `"Sách Python"`, số lượng `3`, đơn giá `125000`. Hãy viết mã in hóa đơn với định dạng:\\n- Cột Tên căn trái 15 ký tự\\n- Cột Số lượng căn giữa 8 ký tự\\n- Cột Thành tiền căn phải 12 ký tự có dấu phân tách phần ngàn.',
      hint: 'Dùng f-string: {ten:<15}, {so_luong:^8}, {thanh_tien:>12,}.',
      solutionCode: `ten = "Sách Python"
so_luong = 3
don_gia = 125000
thanh_tien = so_luong * don_gia

print(f"{'MẶT HÀNG':<15} | {'SỐ LƯỢNG':^8} | {'THÀNH TIỀN':>12}")
print("-" * 43)
print(f"{ten:<15} | {so_luong:^8} | {thanh_tien:>12,} đ")`,
      solutionOutput: `MẶT HÀNG        | SỐ LƯỢNG |   THÀNH TIỀN
-------------------------------------------
Sách Python     |    3     |    375,000 đ`,
      explanation: 'f-string hỗ trợ mini-language cực mạnh: < là căn trái, ^ là căn giữa, > là căn phải, và dấu phẩy , tự động thêm dấu ngăn cách hàng ngàn.',
      annotations: [
        { line: 6, text: 'In dòng tiêu đề bảng.' },
        { line: 8, text: 'thanh_tien:>12, căn phải 12 ký tự và thêm dấu phẩy phân tách nghìn.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Xây dựng hàm nhập số thực an toàn có giá trị mặc định',
      problem: 'Viết một hàm `nhap_so_thuc_an_toan(chuoi_nhap, mac_dinh=0.0)` nhận vào chuỗi nhập liệu. Hàm cố gắng ép kiểu thành `float`. Nếu chuỗi rỗng hoặc người dùng nhập sai ký tự (như `"abc"`), hàm không được báo lỗi mà trả về giá trị `mac_dinh`.',
      hint: 'Dùng try...except ValueError kết hợp if chuoi_nhap.strip():.',
      solutionCode: `def nhap_so_thuc_an_toan(chuoi_nhap, mac_dinh=0.0):
    if not chuoi_nhap or not chuoi_nhap.strip():
        return mac_dinh
    try:
        return float(chuoi_nhap)
    except ValueError:
        return mac_dinh

print("1. '3.14'  ->", nhap_so_thuc_an_toan("3.14"))
print("2. '   '   ->", nhap_so_thuc_an_toan("   ", 10.0))
print("3. 'abc'   ->", nhap_so_thuc_an_toan("abc", 5.0))`,
      solutionOutput: `1. '3.14'  -> 3.14
2. '   '   -> 10.0
3. 'abc'   -> 5.0`,
      explanation: 'Mẫu thiết kế kiểm tra an toàn giúp hệ thống chống chịu tốt với dữ liệu đầu vào người dùng bất cẩn.',
      annotations: [
        { line: 2, text: 'Kiểm tra chuỗi rỗng hoặc chỉ có khoảng trắng.' },
        { line: 4, text: 'Bắt lỗi ValueError khi ép float thất bại.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Khi người dùng nhập số 100 từ bàn phím qua câu lệnh `x = input()`, kiểu dữ liệu thực tế của `x` là gì?',
      options: [
        'int (số nguyên)',
        'float (số thực)',
        'str (chuỗi ký tự)',
        'bytes (dãy byte)'
      ],
      correctIndex: 2,
      explanation: 'Hàm input() trong Python luôn luôn trả về một đối tượng kiểu str, cho dù người dùng gõ số, chữ hay ký tự đặc biệt.'
    },
    {
      question: 'Để hàm `print("Hello")` và `print("World")` in ra trên cùng 1 dòng cách nhau bởi dấu cách ("Hello World"), ta cần truyền tham số nào?',
      options: [
        'print("Hello", sep=" ")',
        'print("Hello", end=" ")',
        'print("Hello", inline=True)',
        'print("Hello", newline=False)'
      ],
      correctIndex: 1,
      explanation: 'Mặc định end="\\n" sẽ đẩy con trỏ xuống dòng tiếp theo. Đổi end=" " sẽ giữ con trỏ ở lại cùng dòng kèm theo một dấu cách.'
    },
    {
      question: 'Sự khác biệt cốt lõi giữa `str(obj)` và `repr(obj)` là gì?',
      options: [
        'str() chạy nhanh hơn repr() 10 lần.',
        'str() dành cho người dùng cuối đọc (thân thiện, bỏ bớt chi tiết kỹ thuật); còn repr() dành cho lập trình viên/debug (chính xác, không mập mờ, hiển thị rõ kiểu và dấu nháy).',
        'repr() chỉ dùng được trên số thực float.',
        'str() chỉ dùng được trong Python 2.'
      ],
      correctIndex: 1,
      explanation: 'Triết lý Python: str() hướng tới readability cho người dùng, còn repr() hướng tới unambiguity cho lập trình viên.'
    }
  ],

  summary: [
    'Hàm print() có 2 tham số quan trọng: sep (phân tách giữa các biến) và end (kết thúc dòng, mặc định là \\n).',
    'Hàm input() luôn trả về chuỗi str; muốn tính toán bắt buộc phải ép kiểu int() hoặc float().',
    'Khi ép kiểu thất bại (nhập chữ cái vào int), Python ném ra ngoại lệ ValueError.',
    'str() tạo chuỗi thân thiện cho con người đọc; repr() tạo chuỗi chính xác kỹ thuật cho lập trình viên gỡ lỗi.',
    'Màn hình REPL luôn hiển thị kết quả bằng repr() để tránh hiểu lầm giữa chuỗi và số.'
  ]
};
