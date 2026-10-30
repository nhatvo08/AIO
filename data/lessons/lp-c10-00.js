export default {
  id: 'lp-c10-00',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.0',
  title: 'Mở đầu Chương 10 & Phân cấp khái niệm trong Python',
  subtitle: 'Bản chất câu lệnh thủ tục, mô hình "việc tác động lên đối tượng" và hệ thống phân cấp 4 tầng: Module › Câu lệnh › Biểu thức › Đối tượng',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu định nghĩa và vai trò của câu lệnh (statements): các chỉ thị mã nguồn quy định chương trình cần phải làm những gì.',
    'Nắm vững mô hình Python như một ngôn ngữ thủ tục (procedural language) dựa trên câu lệnh để đạt được mục tiêu chương trình.',
    'Nằm lòng hệ thống phân cấp khái niệm 4 tầng của Python: Chương trình tạo từ Module › Module chứa Câu lệnh › Câu lệnh chứa Biểu thức › Biểu thức tạo và xử lý Đối tượng.',
    'Nhận diện vai trò chiến lược của câu lệnh: cầu nối điều hướng biểu thức, quản lý bộ nhớ và khai sinh các đối tượng mới.'
  ],

  intuition: {
    title: 'Dây chuyền sản xuất và Bản thiết kế vận hành',
    metaphor: 'Nếu coi các "đối tượng" (stuff) ở Phần II là những nguyên vật liệu cụ thể (gỗ, thép, bu-lông, đai ốc) nằm trên mặt bàn xưởng mộc, thì "câu lệnh" (statements) chính là các bản hướng dẫn kỹ thuật và động tác của người thợ: lấy thanh gỗ A ghép với ốc vít B, nếu chiều dài vượt quá quy chuẩn thì cắt bớt, và lặp lại thao tác này cho 100 sản phẩm. Bạn không thể vận hành một xưởng mộc chỉ bằng việc ngắm nhìn các khối vật liệu; bạn cần các chỉ thị hành động rõ ràng. Trong một chương trình Python, câu lệnh chính là các chỉ thị thủ tục điều phối toàn bộ nguyên liệu đối tượng đó để tạo ra thành phẩm.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HỆ THỐNG PHÂN CẤP CẤU TRÚC CHƯƠNG TRÌNH PYTHON (4 TẦNG)</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid #8b5cf6;border-radius:6px;">
            <strong style="color:#8b5cf6;">TẦNG 1 — MODULE:</strong> Các tệp mã nguồn (.py) đóng gói và tổ chức chương trình thành các đơn vị lớn.
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:6px;margin-left:16px;">
            <strong style="color:var(--accent-primary);">TẦNG 2 — CÂU LỆNH (STATEMENTS):</strong> Lập trình logic, điều khiển luồng, chứa và điều hướng các biểu thức.
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--warning);border-radius:6px;margin-left:32px;">
            <strong style="color:var(--warning);">TẦNG 3 — BIỂU THỨC (EXPRESSIONS):</strong> Tính toán giá trị, thực hiện phép toán, xử lý các đối tượng.
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;margin-left:48px;">
            <strong style="color:var(--success);">TẦNG 4 — ĐỐI TƯỢNG (OBJECTS):</strong> Vùng nhớ mang dữ liệu (số, chuỗi, list, dict, hàm, lớp...).
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Câu lệnh và Ngôn ngữ Dạng Thủ tục',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp (Statements and Syntax) • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 1 / 21</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Ghi chú học tập: Toàn bộ nội dung, thuật ngữ và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu chuyên sâu.</em></p>
          </div>
        </div>

        <p>Giờ đây, khi bạn đã làm quen và làm chủ các đối tượng dựng sẵn (built-in objects) của Python ở Phần II, Phần III này sẽ bắt đầu chuyến khám phá của chúng ta về các dạng <strong>câu lệnh (statements)</strong> nền tảng của nó.</p>
        <p>Nói một cách đơn giản nhất:</p>
        <blockquote>
          <p><strong>Câu lệnh chính là mã nguồn mà chúng ta viết để chỉ thị cho Python biết chương trình cần phải làm gì.</strong></p>
        </blockquote>
        <p>Nếu như Chương 4 đã gợi ý rằng các chương trình máy tính <em>“làm những việc (things) tác động lên các đối tượng (stuff)”</em>, thì câu lệnh chính là cách thức chúng ta chỉ rõ chương trình thực hiện những việc gì:</p>
        <ul>
          <li><strong>Những việc (things):</strong> Thực hiện hành động, lặp lại tác vụ, đưa ra lựa chọn rẽ nhánh, gán dữ liệu.</li>
          <li><strong>Các đối tượng (stuff):</strong> Các thực thể mang dữ liệu nằm trong bộ nhớ (con số, chuỗi, danh sách, từ điển...).</li>
        </ul>
        <p>Nói một cách chính quy hơn theo khoa học máy tính, Python là một <strong>ngôn ngữ dạng thủ tục (procedural)</strong>, dựa trên câu lệnh (statement-based). Bằng cách kết hợp các câu lệnh lại với nhau, chúng ta chỉ định một quy trình thủ tục mà trình thông dịch Python sẽ tuần tự thực thi để đáp ứng các mục tiêu của chương trình.</p>
      `,
      codeExamples: [
        {
          title: 'Kết hợp câu lệnh thủ tục để điều phối các đối tượng',
          code: `# Câu lệnh gán: khai sinh đối tượng trong không gian tên
ten = 'Python'
phien_ban = 3.14

# Câu lệnh if/else: rẽ nhánh logic dựa trên giá trị đối tượng
if phien_ban >= 3.0:
    thong_bao = f"{ten} {phien_ban}: Thế hệ hiện đại"
else:
    thong_bao = f"{ten} {phien_ban}: Phiên bản cũ"

# Câu lệnh biểu thức (lời gọi hàm): thực hiện hành động in
print(thong_bao)`,
          output: `Python 3.14: Thế hệ hiện đại`,
          annotations: [
            { line: 2, text: 'Câu lệnh gán tạo tham chiếu tên ten gắn tới đối tượng chuỗi \'Python\'.' },
            { line: 6, text: 'Câu lệnh if kiểm tra biểu thức điều kiện và điều hướng luồng thực thi.' },
            { line: 12, text: 'Câu lệnh gọi hàm print() in kết quả ra màn hình chuẩn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Xem lại Phân cấp Khái niệm trong Python (4 Tầng Cấu trúc)',
      content: `
        <p>Một cách trực quan để hiểu rõ vai trò của các câu lệnh là xem lại <strong>hệ thống phân cấp khái niệm (conceptual hierarchy)</strong> đã từng được giới thiệu trong Chương 4. Hệ thống này mô tả kiến trúc từ lớn đến nhỏ của một chương trình Python:</p>
        <ol>
          <li><strong>Chương trình được tạo thành từ các module.</strong></li>
          <li><strong>Module chứa các câu lệnh.</strong></li>
          <li><strong>Câu lệnh chứa các biểu thức.</strong></li>
          <li><strong>Biểu thức tạo ra và xử lý các đối tượng.</strong></li>
        </ol>

        <p>Mỗi nấc thang trong hệ thống phân cấp này có nhiệm vụ riêng biệt:</p>
        <ul>
          <li><strong>Ở tầng nền tảng nhất:</strong> Các chương trình đều được cấu thành từ câu lệnh và biểu thức. Biểu thức xử lý đối tượng và luôn được nhúng bên trong các câu lệnh.</li>
          <li><strong>Ở tầng trung gian:</strong> Các câu lệnh lập trình nên <em>logic vận hành lớn hơn</em> của chương trình—chúng sử dụng và điều hướng các biểu thức để xử lý những đối tượng trong bộ nhớ. Hơn thế nữa, câu lệnh chính là nơi các đối tượng xuất hiện trong đời sống chương trình (chẳng hạn như trong các câu lệnh gán <code>assignment statement</code>), và một số câu lệnh còn tạo ra những loại đối tượng hoàn toàn mới (như lệnh <code>def</code> tạo hàm, lệnh <code>class</code> tạo lớp đối tượng).</li>
          <li><strong>Ở tầng trên cùng:</strong> Các câu lệnh luôn tồn tại bên trong các module (các tệp <code>.py</code>), mà bản thân các module cũng lại được quản lý và nạp vào thông qua các câu lệnh (như câu lệnh <code>import</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Mối quan hệ 4 tầng trong một đoạn mã thực tế',
          code: `# TẦNG 2 (CÂU LỆNH GÁN) chứa TẦNG 3 (BIỂU THỨC) xử lý TẦNG 4 (ĐỐI TƯỢNG)
ket_qua = [x ** 2 for x in [1, 2, 3, 4] if x % 2 == 0]

# Câu lệnh if (Tầng 2) chứa biểu thức so sánh len(ket_qua) > 0 (Tầng 3)
if len(ket_qua) > 0:
    # Lời gọi hàm print là câu lệnh biểu thức
    print("Danh sách bình phương chẵn:", ket_qua)`,
          output: `Danh sách bình phương chẵn: [4, 16]`,
          annotations: [
            { line: 2, text: 'Phép gán là câu lệnh; biểu thức list comprehension tạo ra đối tượng list mới [4, 16].' },
            { line: 5, text: 'Biểu thức len(ket_qua) > 0 được đánh giá thành đối tượng True để câu lệnh if quyết định rẽ nhánh.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Quy tắc vàng phân biệt: Biểu thức vs Câu lệnh',
        content: '<strong>Biểu thức (Expression)</strong> luôn được đánh giá để sinh ra một giá trị (đối tượng), ví dụ: <code>2 + 3</code>, <code>x.upper()</code>. Trong khi đó, <strong>Câu lệnh (Statement)</strong> thực hiện một hành động hoặc điều khiển luồng và bản thân nó không có giá trị trả về trực tiếp, ví dụ: lệnh <code>if</code>, lệnh <code>while</code>, lệnh gán <code>x = 5</code>.'
      }
    ],
    pitfalls: [
      {
        title: 'Nhầm lẫn câu lệnh với biểu thức trong phép gán',
        content: 'Trong Python truyền thống, phép gán <code>x = 1</code> là một câu lệnh (statement), không phải là biểu thức. Vì vậy bạn không thể viết <code>if (x = 1):</code> như trong ngôn ngữ C. Từ Python 3.8, toán tử walrus <code>:=</code> mới bổ sung khả năng gán dưới dạng biểu thức.'
      }
    ],
    deepDive: {
      title: 'Vòng đời đối tượng thông qua câu lệnh',
      content: '<p>Trong CPython, câu lệnh gán không tạo ra biến theo kiểu "ô nhớ chứa dữ liệu" như C/C++, mà tạo ra một <strong>liên kết tên (binding)</strong> trỏ tới đối tượng trong bộ nhớ heap. Khi câu lệnh <code>del</code> hoặc khi một khối lệnh kết thúc, các liên kết tên bị hủy, bộ đếm tham chiếu (reference counter) của đối tượng giảm về 0 và bộ gom rác (Garbage Collector) sẽ tự động giải phóng vùng nhớ.</p>'
    }
  },

  exercises: [
    {
      title: 'Phân định 4 tầng phân cấp trong một dòng lệnh Python',
      level: 'Dễ',
      problem: 'Cho dòng mã Python sau: <code>tong = sum([10, 20, 30])</code>. Hãy chỉ ra thành phần nào là câu lệnh, thành phần nào là biểu thức, và đâu là các đối tượng?',
      hint: 'Hãy nhớ: toàn bộ dòng là câu lệnh gán, phần bên phải dấu = là biểu thức sinh giá trị, các con số và danh sách là đối tượng.',
      solutionCode: `# Phân tích chi tiết:
# 1. Câu lệnh: toàn bộ dòng 'tong = sum([10, 20, 30])' là câu lệnh gán (assignment statement).
# 2. Biểu thức: 'sum([10, 20, 30])' là biểu thức gọi hàm.
# 3. Đối tượng: các số 10, 20, 30, danh sách [10, 20, 30], và số nguyên kết quả 60.
danh_sach = [10, 20, 30]
tong = sum(danh_sach)
print("Kết quả:", tong)`,
      solutionOutput: `Kết quả: 60`,
      explanation: 'Câu lệnh gán quản lý đời sống đối tượng bằng cách gán tên <code>tong</code> cho đối tượng số nguyên <code>60</code> vừa được biểu thức <code>sum(...)</code> tính toán ra.'
    },
    {
      title: 'Xây dựng quy trình thủ tục đơn giản kết hợp câu lệnh',
      level: 'Vừa',
      problem: 'Viết một tập lệnh nhỏ minh họa tính chất thủ tục (procedural) của Python: duyệt qua danh sách các từ, đếm số từ có độ dài lớn hơn 3 ký tự và in ra màn hình.',
      hint: 'Sử dụng câu lệnh gán khởi tạo bộ đếm, câu lệnh for để lặp, câu lệnh if để kiểm tra điều kiện, và câu lệnh biểu thức gọi print().',
      solutionCode: `tu_khoa = ['python', 'c', 'java', 'go', 'rust']
dem = 0

for tu in tu_khoa:
    if len(tu) > 3:
        dem += 1

print(f"Số lượng từ dài hơn 3 ký tự: {dem}")`,
      solutionOutput: `Số lượng từ dài hơn 3 ký tự: 3`,
      explanation: 'Các câu lệnh kết hợp tuần tự (gán → lặp for → rẽ nhánh if → gán tăng cường += → gọi print) tạo thành quy trình thủ tục thực thi logic bài toán.'
    }
  ],

  quiz: [
    {
      question: 'Theo Mark Lutz, câu lệnh (statement) trong Python đóng vai trò gì?',
      options: [
        'Là vùng nhớ vật lý lưu trữ các giá trị số và chuỗi.',
        'Là mã nguồn chỉ thị cho Python biết chương trình cần phải làm những việc gì.',
        'Là công cụ chỉ dùng để tối ưu hóa tốc độ thực thi của CPU.',
        'Là các hàm toán học thuần túy không làm thay đổi trạng thái chương trình.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz định nghĩa: câu lệnh chính là mã nguồn mà chúng ta viết để chỉ thị cho Python biết chương trình cần phải làm gì (thực hiện những "việc" tác động lên "đối tượng").'
    },
    {
      question: 'Thứ tự đúng từ cấp cao nhất xuống cấp thấp nhất trong hệ thống phân cấp khái niệm của Python là gì?',
      options: [
        'Biểu thức › Đối tượng › Câu lệnh › Module',
        'Module › Biểu thức › Câu lệnh › Đối tượng',
        'Module › Câu lệnh › Biểu thức › Đối tượng',
        'Câu lệnh › Module › Đối tượng › Biểu thức'
      ],
      correctIndex: 2,
      explanation: 'Hệ thống 4 tầng phân cấp cấu trúc chương trình Python là: 1. Chương trình tạo từ Module › 2. Module chứa Câu lệnh › 3. Câu lệnh chứa Biểu thức › 4. Biểu thức tạo ra và xử lý Đối tượng.'
    },
    {
      question: 'Phát biểu nào sau đây thể hiện ĐÚNG mối quan hệ giữa câu lệnh và biểu thức?',
      options: [
        'Biểu thức luôn chứa câu lệnh bên trong nó.',
        'Câu lệnh chứa và điều hướng các biểu thức; biểu thức được nhúng trong câu lệnh để tính toán đối tượng.',
        'Câu lệnh và biểu thức là hai khái niệm hoàn toàn đồng nghĩa và có thể thay thế cho nhau.',
        'Mọi câu lệnh trong Python đều bắt buộc phải trả về một đối tượng giá trị.'
      ],
      correctIndex: 1,
      explanation: 'Biểu thức xử lý đối tượng và được nhúng bên trong các câu lệnh. Các câu lệnh lập trình nên logic vận hành lớn hơn, điều hướng các biểu thức.'
    }
  ],

  summary: [
    'Câu lệnh (statement) là mã nguồn chỉ thị cho Python biết chương trình cần phải thực hiện những hành động gì.',
    'Python là ngôn ngữ dạng thủ tục (procedural) dựa trên câu lệnh để điều phối dòng chảy thực thi.',
    'Hệ thống phân cấp 4 tầng: Module › Câu lệnh › Biểu thức › Đối tượng là bản đồ kiến trúc then chốt của toàn bộ chương trình Python.',
    'Câu lệnh là nơi khai sinh đối tượng (phép gán, hàm, lớp), quản lý phạm vi và điều hướng các biểu thức xử lý dữ liệu.'
  ]
};
