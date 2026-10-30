export default {
  id: 'p0b-12',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B2.5',
  title: 'Xử lý ngoại lệ và Rẽ nhánh phòng ngừa: LBYL vs EAFP trên Flowchart',
  subtitle: 'So sánh chuyên sâu hai triết lý xử lý lỗi: Look Before You Leap (if) và Easier to Ask for Forgiveness (try/except)',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Biết cách biểu diễn luồng xử lý ngoại lệ (Exception Handling) và nhánh lỗi trên Flowchart chuẩn hóa.',
    'Phân biệt bản chất sâu sắc giữa hai triết lý: LBYL (kiểm tra trước) và EAFP (bắt lỗi sau).',
    'Hiểu lý do tại sao Python tôn sùng EAFP và giải thích được hiểm họa Race Condition (TOCTOU) khi dùng LBYL với file.',
    'Ánh xạ hoàn chỉnh khối cấu trúc 4 phần của Python `try...except...else...finally` lên mô hình trực quan.'
  ],

  intuition: {
    title: 'Hỏi người bán trước khi bóc kẹo hay Cứ ăn rồi tính tiền?',
    metaphor: 'Hãy tưởng tượng bạn bước vào một cửa hàng tạp hóa. Triết lý LBYL (Look Before You Leap - Nhìn kỹ trước khi nhảy) giống như một đứa trẻ rất thận trọng: bé hỏi chủ quán "Kẹo này có bán không ạ?", sau đó hỏi tiếp "Cháu có đủ 5000 đồng không?", sau đó hỏi "Hạn sử dụng còn không?", khi mọi câu trả lời đều là Có thì bé mới dám bóc kẹo ăn. Ngược lại, triết lý EAFP (Easier to Ask for Forgiveness than Permission - Dễ xin lỗi hơn là xin phép) giống như vị khách tự tin: cứ bóc kẹo ra thưởng thức (trong khối try), nếu chẳng may máy quét mã vạch báo kẹo hết hạn hoặc không đủ tiền (phát sinh Exception), lúc đó ta xin lỗi chủ quán và đổi sang việc khác (trong khối except). Trong lập trình hiện đại, EAFP thường nhanh hơn và an toàn hơn trước các thay đổi bất ngờ từ môi trường bên ngoài!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">HAI TRƯỜNG PHÁI XỬ LÝ LỖI TRONG PHẦN MỀM</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);">LBYL (Look Before You Leap)</strong>
            <p style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">Kiểm tra trước mọi điều kiện bằng <code>if</code></p>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Thích hợp: C, C++, kiểm tra input người dùng</div>
          </div>
          <div style="padding:10px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--py-gold);">EAFP (Ask Forgiveness)</strong>
            <p style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">Cứ chạy trong <code>try</code>, bắt lỗi ở <code>except</code></p>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Triết lý cốt lõi Pythonic, xử lý I/O, file, mạng</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Triết lý 1: LBYL (Look Before You Leap) trên Flowchart',
      badge: 'Kiểm tra trước',
      content: `
        <p>Với LBYL, lập trình viên đặt một chuỗi các hình thoi quyết định (<code>if</code>) để thẩm định từng điều kiện trước khi thực hiện thao tác nhạy cảm (như chia cho 0, truy cập phần tử ngoài danh sách, đọc key trong từ điển).</p>
        <p>Ưu điểm: Luồng đi tuần tự rõ ràng, dễ hình dung với người mới bắt đầu.</p>
        <p>Nhược điểm: Làm code bị phình to bởi vô số tầng <code>if</code> lồng nhau (vấn đề "Pyramid of Doom").</p>
      `,
      codeExamples: [
        {
          title: 'Phong cách LBYL trong Python',
          code: `def safe_divide_lbyl(a, b):
    # Nhìn kỹ trước khi nhảy: Kiểm tra mẫu số khác 0 trước
    if b == 0:
        print("Lỗi: Không thể chia cho 0!")
        return None
    return a / b

student_scores = {"An": 9.0, "Bình": 8.5}
# Kiểm tra sự tồn tại của key trước khi đọc
if "Cường" in student_scores:
    print(student_scores["Cường"])
else:
    print("Không tìm thấy bạn Cường!")`
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Triết lý 2: EAFP và Mô hình Try...Except trên Flowchart',
      badge: 'Bắt ngoại lệ',
      content: `
        <p>Python sinh ra với phương châm: <em>"Ngoại lệ (Exception) là một cơ chế điều khiển luồng hợp lệ và cực kỳ tối ưu, không phải là một sự cố tồi tệ"</em>.</p>
        <p>Trên sơ đồ Flowchart, khối <code>try</code> được biểu diễn như một vùng được bảo vệ (Protected Region). Mũi tên bình thường tiếp tục chảy xuống khi không có lỗi. Nếu có lỗi phát sinh bất ngờ ở bất kỳ dòng nào bên trong vùng bảo vệ, luồng điều khiển sẽ <strong>ngay lập tức rẽ nhánh sang khối Xử lý ngoại lệ (Exception Handler)</strong>.</p>
        <div style="margin:20px 0;display:flex;justify-content:center;">
          <svg viewBox="0 0 520 280" style="max-width:100%;height:auto;font-family:var(--font-mono);font-size:11px;" role="img" aria-label="Sơ đồ Try Except">
            <defs>
              <marker id="arrow-b2-5" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--text-muted)" />
              </marker>
            </defs>
            <!-- Try Block boundary -->
            <rect x="50" y="30" width="220" height="120" rx="6" fill="var(--bg-surface-alt)" stroke="var(--accent-primary)" stroke-dasharray="4,4" stroke-width="2"/>
            <text x="60" y="50" fill="var(--accent-primary)" font-weight="bold">VÙNG BẢO VỆ (try:)</text>
            <rect x="70" y="70" width="180" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="1.5"/>
            <text x="160" y="95" fill="var(--text-primary)" text-anchor="middle">Thực thi nghiệp vụ</text>

            <!-- Normal Path -->
            <path d="M 160 110 L 160 180" stroke="var(--accent-primary)" stroke-width="2" marker-end="url(#arrow-b2-5)"/>
            <text x="170" y="150" fill="var(--accent-primary)" font-weight="bold">Thành công (else)</text>
            <rect x="70" y="185" width="180" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="1.5"/>
            <text x="160" y="210" fill="var(--text-primary)" text-anchor="middle">Xử lý kết quả trả về</text>

            <!-- Exception Branch -->
            <path d="M 250 90 L 330 90" stroke="var(--danger-text)" stroke-width="2" marker-end="url(#arrow-b2-5)"/>
            <text x="270" y="80" fill="var(--danger-text)" font-weight="bold">Bắn lỗi!</text>

            <!-- Except handler -->
            <rect x="335" y="70" width="160" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--danger-text)" stroke-width="2"/>
            <text x="415" y="95" fill="var(--text-primary)" text-anchor="middle">except ErrorHandler</text>

            <!-- Merge at Finally -->
            <path d="M 160 225 L 160 255 L 260 255" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
            <path d="M 415 110 L 415 255 L 270 255" fill="none" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#arrow-b2-5)"/>
            
            <circle cx="265" cy="255" r="4" fill="var(--text-muted)"/>
            <text x="265" y="275" fill="var(--text-secondary)" text-anchor="middle" font-weight="bold">Khối finally dọn dẹp</text>
          </svg>
        </div>
      `,
      codeExamples: [
        {
          title: 'Phong cách EAFP chuẩn mực trong Python',
          code: `def parse_age(user_input):
    # EAFP: Cứ thử ép kiểu sang int, nếu không được thì xin lỗi
    try:
        age = int(user_input)
        print(f"Tuổi hợp lệ: {age}")
        return age
    except ValueError:
        print(f"Lỗi: '{user_input}' không thể đổi thành số nguyên!")
        return None
    finally:
        print("-> Hoàn tất phiên kiểm tra.")

parse_age("25")
parse_age("hai mươi lăm")`
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Hiểm họa TOCTOU (Time-of-Check to Time-of-Use) của LBYL',
      badge: 'Bảo mật & Cạnh tranh',
      content: `
        <p>Tại sao LBYL đôi khi lại <strong>nguy hiểm hơn</strong> EAFP? Hãy xét bài toán đọc file:</p>
        <pre><code class="language-python"># PHONG CÁCH LBYL ĐẦY RỦI RO:
import os

if os.path.exists("data.txt"):  # 1. Check (Kiểm tra)
    # KHOẢNG NGHỈ THỜI GIAN: Một tiến trình khác bất ngờ xóa data.txt ngay tại tích tắc này!
    with open("data.txt") as f: # 2. Use (Sử dụng) -> VẪN CRASH VỚI FileNotFoundError!
        content = f.read()</code></pre>
        <p>Khoảng trống thời gian giữa lúc kiểm tra (Check) và lúc sử dụng (Use) được gọi là <strong>TOCTOU Race Condition</strong>. Trong hệ điều hành đa nhiệm, một file có thể bị xóa hoặc thay đổi quyền truy cập ngay sau khi hàm <code>exists()</code> vừa trả về <code>True</code>!</p>
        <p>Với EAFP, ta loại bỏ hoàn toàn rủi ro này: <em>cứ mở file trực tiếp trong khối try</em>. Nếu file không còn đó, ta bắt ngoại lệ <code>FileNotFoundError</code> một cách thanh lịch.</p>
      `
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Quy tắc vàng lựa chọn LBYL hay EAFP',
      content: 'Hãy dùng **LBYL** khi: Kiểm tra đầu vào người dùng trước khi gửi đi, hoặc khi trường hợp lỗi xảy ra rất thường xuyên (tránh chi phí bắt ngoại lệ). Hãy dùng **EAFP** khi: Làm việc với tài nguyên ngoại vi (File, Database, Socket mạng) hoặc khi mã Pythonic yêu cầu sự gọn gàng và tránh xung đột TOCTOU.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Chuyển đổi từ LBYL sang EAFP',
      description: 'Cho đoạn code tra cứu điểm học viên đang dùng phong cách LBYL (`in`). Hãy viết lại bằng phong cách EAFP sử dụng `try...except KeyError`.',
      initialCode: `scores = {"Alice": 95, "Bob": 80}

def get_score_lbyl(student_name):
    if student_name in scores:
        return scores[student_name]
    else:
        return "Không có dữ liệu"
`,
      solution: `scores = {"Alice": 95, "Bob": 80}

def get_score_eafp(student_name):
    try:
        return scores[student_name]
    except KeyError:
        return "Không có dữ liệu"

print("Alice:", get_score_eafp("Alice"))
print("David:", get_score_eafp("David"))`
    }
  ],

  quiz: [
    {
      question: 'Khái niệm TOCTOU (Time-of-Check to Time-of-Use) phản ánh nguy cơ gì khi lập trình theo phong cách LBYL?',
      options: [
        'Bộ nhớ bị tràn do biến kiểm tra tồn tại quá lâu.',
        'Trạng thái tài nguyên bị thay đổi bởi tiến trình khác trong khoảng thời gian giữa lúc kiểm tra và lúc sử dụng.',
        'Tốc độ CPU bị chậm khi so sánh chuỗi.',
        'Hàm if không hỗ trợ kiểm tra file.'
      ],
      correctIndex: 1,
      explanation: 'TOCTOU là lỗ hổng cạnh tranh (race condition): giữa thời điểm code kiểm tra xem file có tồn tại hay không và thời điểm code mở file, file đó có thể đã bị xóa bởi tiến trình khác.'
    }
  ],

  summary: 'LBYL kiểm tra điều kiện trước bằng if, trong khi EAFP thực hiện thao tác trong try và bắt lỗi ở except. EAFP là phong cách chủ đạo của Python, giúp mã nguồn trong sáng hơn và an toàn tuyệt đối trước rủi ro cạnh tranh tài nguyên TOCTOU.'
};
