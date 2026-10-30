export default {
  id: 'p0-12',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.12',
  title: 'Thói quen tự khám phá và kiểm chứng trong REPL',
  subtitle: 'Bộ tứ quyền lực help(), dir(), type(), id(), cách tra cứu tài liệu docs.python.org và tinh thần "Nghi ngờ thì chạy thử"',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ "Bộ tứ quyền lực" tự khám phá của Python: `type()`, `id()`, `dir()`, và `help()`.',
    'Hình thành phản xạ và thói quen cốt lõi của lập trình viên giỏi: Tinh thần "Nghi ngờ thì bật REPL lên chạy thử", không học vẹt lý thuyết.',
    'Hiểu cách phân tích bảng thuộc tính trả về từ `dir()`: phân biệt phương thức ma thuật (`__dunder__`) và phương thức thông thường.',
    'Kỹ năng đọc và tra cứu tài liệu kỹ thuật chính thức của Python tại `docs.python.org`.'
  ],

  intuition: {
    title: 'Kính lúp, Thước đo, Danh bạ và Cuốn bách khoa toàn thư',
    metaphor: 'Một lập trình viên bình thường học bằng cách thuộc lòng cú pháp. Một kỹ sư senior học bằng cách trang bị cho mình bộ công cụ tự khám phá! Python cung cấp cho bạn 4 món bảo bối nằm ngay trong đầu ngón tay: type() là chiếc Kính lúp (soi xem vật này thuộc giống loài gì), id() là chiếc Thước đo tọa độ (xem nó đang nằm ở ô nhớ nào), dir() là cuốn Danh bạ điện thoại (liệt kê toàn bộ các ngón nghề mà đối tượng này biết làm), và help() là Cuốn bách khoa toàn thư (mở trang hướng dẫn chi tiết từng tham số). Khi ai đó nói một khẳng định về Python: "Ủa, hàm này có nhận số âm không?", người bình thường lên mạng hỏi, còn kỹ sư bật ngay cửa sổ dòng lệnh REPL, gõ vài ký tự để đối chứng trong 3 giây!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">BỘ TỨ BẢO BỐI TỰ KHÁM PHÁ CỦA PYTHON (INSPECTION TOOLS)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;text-align:center;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--accent-primary);">type(x)</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Nó là kiểu gì?<br/>(Lớp sinh ra nó)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--py-gold);">id(x)</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Nó ở ô nhớ nào?<br/>(Danh tính RAM)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--success);">dir(x)</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Nó biết làm gì?<br/>(Danh mục phương thức)</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--danger);">help(x)</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Dùng nó thế nào?<br/>(Tài liệu Docstring)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Khám phá Mọi Đối tượng bằng type(), id(), dir() và help()',
      badge: 'Công cụ Nội soi',
      content: `
        <p>Python là một ngôn ngữ có tính <strong>tự nội soi (Introspection)</strong> cực kỳ mạnh mẽ. Đối tượng luôn mang theo toàn bộ thông tin về chính nó:</p>
        <ul>
          <li><code>type(obj)</code>: Cho biết kiểu dữ liệu của đối tượng.</li>
          <li><code>id(obj)</code>: Cho biết con số danh tính duy nhất (địa chỉ RAM).</li>
          <li><code>dir(obj)</code>: Trả về danh sách chuỗi tên của <strong>toàn bộ thuộc tính và phương thức</strong> mà đối tượng sở hữu.</li>
          <li><code>help(obj)</code> hoặc <code>help(obj.phuong_thuc)</code>: Mở tài liệu docstring giải thích chi tiết ý nghĩa từng tham số và kiểu dữ liệu trả về ngay trong terminal mà không cần mở trình duyệt web!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Tự khám phá các phương thức của kiểu chuỗi str qua dir() và help()',
          code: `# Dùng dir() để xem chuỗi str có những phương thức nào
tat_ca_thuoc_tinh = dir(str)
print("Tổng số phương thức/thuộc tính của str:", len(tat_ca_thuoc_tinh))

# Lọc các phương thức người dùng hay dùng (không có dấu gạch dưới __ ở đầu)
phuong_thuc_cong_khai = [m for m in tat_ca_thuoc_tinh if not m.startswith("_")]
print("\\nMột vài phương thức công khai:", phuong_thuc_cong_khai[:8])

# Đọc tài liệu của phương thức str.strip trực tiếp bằng docstring
print("\\nTài liệu của str.strip:")
print(str.strip.__doc__)`,
          output: `Tổng số phương thức/thuộc tính của str: 82

Một vài phương thức công khai: ['capitalize', 'casefold', 'center', 'count', 'encode', 'endswith', 'expandtabs', 'find']

Tài liệu của str.strip:
Return a copy of the string with leading and trailing whitespace removed.

If chars is given and not None, remove characters in chars instead.`,
          annotations: [
            { line: 2, text: 'dir(str) trả về danh sách toàn bộ các phương thức có sẵn.' },
            { line: 6, text: 'Quy ước: Các thuộc tính bắt đầu bằng dấu gạch dưới "_" là nội bộ hoặc dunder method.' },
            { line: 11, text: 'Mọi hàm chuẩn mực trong Python đều có thuộc tính __doc__ chứa hướng dẫn sử dụng.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Tinh thần "Nghi ngờ thì chạy thử" (Doubt? Run it!)',
      badge: 'Tư duy Kỹ sư',
      content: `
        <p>Trong quá trình học và làm việc, bạn sẽ liên tục gặp những câu hỏi nghi vấn:</p>
        <ul>
          <li><em>"Toán tử % với số âm trong Python làm tròn thế nào?"</em></li>
          <li><em>"Khi so sánh chuỗi 'a' và 'A', cái nào lớn hơn?"</em></li>
          <li><em>"Hàm sorted() có làm thay đổi danh sách gốc không?"</em></li>
        </ul>
        <p><strong>Người nghiệp dư:</strong> Đoán mò hoặc lên diễn đàn hỏi.<br/>
        <strong>Kỹ sư chuyên nghiệp:</strong> Mở Terminal lên, gõ <code>python</code> vào REPL, viết 2 dòng code thử nghiệm và có câu trả lời chính xác 100% sau 5 giây!</p>
        <p>Môi trường tương tác REPL chính là phòng thí nghiệm hoàn hảo nhất để bạn đối chiếu giữa lý thuyết và thực tiễn.</p>
      `,
      codeExamples: [
        {
          title: '3 Phép thử nghiệm nhanh trong REPL giải tỏa mọi nghi vấn',
          code: `# Nghi vấn 1: "a" < "A" hay "A" < "a"?
# Kiểm tra:
print("1. 'A' < 'a' là:", "A" < "a", f"(Vì ord('A')={ord('A')}, ord('a')={ord('a')})")

# Nghi vấn 2: Phép chia lấy dư với số âm (-7 % 3) bằng mấy?
print("2. -7 % 3 =", -7 % 3, "(Python làm tròn sàn về phía âm vô cực)")

# Nghi vấn 3: sorted() có sửa list gốc không?
goc = [3, 1, 2]
ket_qua = sorted(goc)
print("3. List gốc sau sorted():", goc, "-> Giữ nguyên vẹn!")`,
          output: `1. 'A' < 'a' là: True (Vì ord('A')=65, ord('a')=97)
2. -7 % 3 = 2 (Python làm tròn sàn về phía âm vô cực)
3. List gốc sau sorted(): [3, 1, 2] -> Giữ nguyên vẹn!`,
          annotations: [
            { line: 3, text: 'Kiểm tra mã ASCII qua hàm ord() giải thích vì sao chữ hoa nhỏ hơn chữ thường.' },
            { line: 6, text: 'Phép chia số âm trong Python tuân theo quy tắc toán học (sẽ mổ xẻ ở Phần 1).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Kỹ năng Tra cứu Tài liệu Chính thức (docs.python.org)',
      badge: 'Nguồn Chuẩn mực',
      content: `
        <p>Tài liệu chính thức tại <strong>https://docs.python.org/3/</strong> là cuốn bách khoa toàn thư đáng tin cậy nhất thế giới về Python. Cấu trúc trang tài liệu được chia thành các phần chính:</p>
        <ol>
          <li><strong>Python Tutorial:</strong> Hướng dẫn nhập môn chuẩn mực của cha đẻ Guido van Rossum.</li>
          <li><strong>Python Library Reference:</strong> Cuốn danh mục tra cứu toàn bộ Thư viện chuẩn (Standard Library) — nơi bạn tra cứu từng phương thức của <code>str</code>, <code>math</code>, <code>json</code>, v.v.</li>
          <li><strong>Language Reference:</strong> Tài liệu đặc tả kỹ thuật chuyên sâu về cú pháp, mô hình dữ liệu, cơ chế thực thi của máy ảo.</li>
          <li><strong>What's New in Python X.Y:</strong> Tổng hợp toàn bộ các tính năng mới, cú pháp mới của từng phiên bản Python (ví dụ: các cập nhật mới nhất trong Python 3.14).</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Tra cứu thông tin phiên bản tài liệu tương ứng với môi trường đang chạy',
          code: `import sys

phien_ban = f"{sys.version_info.major}.{sys.version_info.minor}"
url_tai_lieu = f"https://docs.python.org/{phien_ban}/library/"

print(f"Phiên bản CPython hiện tại: {sys.version}")
print(f"Địa chỉ tra cứu thư viện chuẩn chính thức:")
print(url_tai_lieu)`,
          output: `Phiên bản CPython hiện tại: 3.14.8 (tags/v3.14.8:...)
Địa chỉ tra cứu thư viện chuẩn chính thức:
https://docs.python.org/3.14/library/`,
          annotations: [
            { line: 3, text: 'Luôn tra cứu đúng phiên bản tài liệu tương ứng với phiên bản Python bạn đang dùng.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Tra cứu tài liệu cũ thời Python 2.x trên mạng',
        content: 'Khi tìm kiếm Google, nhiều bài viết cũ từ thời Python 2 vẫn còn tồn tại (ví dụ: dùng lệnh `print "hello"` không có ngoặc, hay dùng `xrange`). Hãy luôn kiểm tra URL tài liệu có chứa `/3/` hoặc `/3.14/` để cập nhật đúng chuẩn hiện đại.'
      }
    ],
    tips: [
      {
        title: 'Thoát khỏi màn hình help() trong Terminal',
        content: 'Khi bạn gõ `help(str)` trong REPL, màn hình sẽ mở chế độ phân trang (Pager). Để quay lại dòng lệnh bình thường, bạn chỉ cần bấm phím `q` (Quit) trên bàn phím!'
      }
    ],
    deepDive: {
      title: 'Thuộc tính __all__ trong module',
      content: `
        <p>Khi bạn dùng <code>dir(module)</code>, làm sao module kiểm soát được những gì hiển thị ra ngoài?</p>
        <p>Các tác giả thư viện thường định nghĩa một danh sách chuỗi mang tên <code>__all__ = ["ham_1", "Lop_2"]</code>. Khi ai đó gõ <code>from module import *</code>, chỉ những định danh nằm trong danh sách <code>__all__</code> mới được xuất ra ngoài.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Tự tra cứu phương thức đếm phần tử của list bằng help()',
      problem: 'Hãy viết mã trích xuất chuỗi docstring hướng dẫn của phương thức `list.count` và in ra màn hình.',
      hint: 'Dùng thuộc tính list.count.__doc__.',
      solutionCode: `huong_dan = list.count.__doc__
print("Hướng dẫn của list.count:")
print(huong_dan)`,
      solutionOutput: `Hướng dẫn của list.count:
Return number of occurrences of value.`,
      explanation: 'Mọi phương thức chuẩn mực đều có docstring tóm tắt ngắn gọn mục đích và giá trị trả về.',
      annotations: [
        { line: 1, text: 'Truy cập docstring trực tiếp không cần qua help().' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Xây dựng hàm thanh tra đối tượng toàn diện',
      problem: 'Viết một hàm `thanh_tra(obj)` nhận vào bất kỳ đối tượng nào và in ra báo cáo gồm:\\n1. Kiểu dữ liệu (`type`)\\n2. Địa chỉ bộ nhớ hex (`id`)\\n3. Giá trị chân lý (`bool`)\\n4. Số lượng thuộc tính/phương thức công khai (không bắt đầu bằng dấu gạch dưới `_`).',
      hint: 'Dùng type(), hex(id()), bool(), và lọc list dir(obj).',
      solutionCode: `def thanh_tra(obj):
    kieu = type(obj).__name__
    dia_chi = hex(id(obj))
    chan_ly = "Truthy" if bool(obj) else "Falsy"
    
    cac_phuong_thuc = [m for m in dir(obj) if not m.startswith("_")]
    
    print(f"=== BÁO CÁO THANH TRA: {repr(obj)} ===")
    print(f"- Kiểu dữ liệu: {kieu}")
    print(f"- Địa chỉ RAM:  {dia_chi}")
    print(f"- Tính chân lý: {chan_ly}")
    print(f"- Số phương thức công khai: {len(cac_phuong_thuc)} (ví dụ: {cac_phuong_thuc[:3]})")

thanh_tra("Python")
thanh_tra([1, 2, 3])`,
      solutionOutput: `=== BÁO CÁO THANH TRA: 'Python' ===
- Kiểu dữ liệu: str
- Địa chỉ RAM:  0x1f40a12b150
- Tính chân lý: Truthy
- Số phương thức công khai: 47 (ví dụ: ['capitalize', 'casefold', 'center'])

=== BÁO CÁO THANH TRA: [1, 2, 3] ===
- Kiểu dữ liệu: list
- Địa chỉ RAM:  0x1f40a1b2a80
- Tính chân lý: Truthy
- Số phương thức công khai: 11 (ví dụ: ['append', 'clear', 'copy'])`,
      explanation: 'Hàm thanh tra tự động hóa quá trình nội soi đối tượng, giúp bạn nhanh chóng hiểu cấu trúc của bất kỳ thư viện nào mới tiếp cận.',
      annotations: [
        { line: 2, text: 'type(obj).__name__ lấy tên ngắn gọn của class.' },
        { line: 6, text: 'Lọc bỏ các dunder method để đếm phương thức người dùng.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Khi bạn muốn xem nhanh toàn bộ các phương thức mà đối tượng `x` có thể thực hiện được ngay trong terminal, hàm nào sau đây là phù hợp nhất?',
      options: [
        'len(x)',
        'dir(x)',
        'id(x)',
        'print(x)'
      ],
      correctIndex: 1,
      explanation: 'Hàm dir(x) liệt kê toàn bộ các thuộc tính, phương thức và hàm ma thuật mà đối tượng x sở hữu.'
    },
    {
      question: 'Làm thế nào để thoát khỏi giao diện phân trang khi gọi hàm `help()` trong chế độ tương tác REPL?',
      options: [
        'Bấm phím q (Quit)',
        'Bấm tổ hợp phím Alt + F4',
        'Gõ lệnh exit()',
        'Rút dây nguồn máy tính'
      ],
      correctIndex: 0,
      explanation: 'Trình phân trang của help() sử dụng chuẩn less/more của terminal, bấm phím q sẽ thoát ra ngay lập tức.'
    },
    {
      question: 'Tinh thần cốt lõi "Nghi ngờ thì chạy thử" trong cộng đồng Python có ý nghĩa gì?',
      options: [
        'Không tin tưởng vào bất kỳ đoạn code nào của người khác.',
        'Thay vì ngồi suy đoán hoặc học thuộc lòng lý thuyết mơ hồ, hãy mở môi trường tương tác REPL và viết ngay vài dòng code nhỏ để kiểm chứng tận mắt kết quả thực tế.',
        'Luôn chạy chương trình với quyền Admin tối cao.',
        'Bỏ qua việc viết test case.'
      ],
      correctIndex: 1,
      explanation: 'Môi trường REPL tức thì của Python được thiết kế để lập trình viên tự kiểm chứng mọi giả thuyết chỉ trong vài giây, biến việc học thành trải nghiệm thực nghiệm sống động.'
    }
  ],

  summary: [
    'Bộ tứ quyền lực tự khám phá: type() (kiểu), id() (danh tính), dir() (danh mục phương thức), help() (tài liệu chi tiết).',
    'Hình thành phản xạ "Nghi ngờ thì chạy thử": mở REPL và viết vài dòng code để đối chứng ngay lập tức.',
    'Các phương thức bắt đầu bằng dấu gạch dưới "_" là nội bộ; các phương thức công khai là công cụ làm việc hàng ngày.',
    'Tài liệu chính thức tại docs.python.org là cẩm nang tra cứu chuẩn mực và đáng tin cậy nhất.'
  ]
};
