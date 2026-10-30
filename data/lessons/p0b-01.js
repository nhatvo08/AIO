export default {
  id: 'p0b-01',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B1.1',
  title: 'Thuật toán là gì? Mô hình IPO và phân tích đề bài',
  subtitle: 'Nền tảng tư duy giải quyết vấn đề: Phân biệt bài toán, thuật toán và chương trình; mô hình Đầu vào – Xử lý – Đầu ra (IPO)',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu định nghĩa chính xác về Thuật toán (Algorithm): Dãy bước hữu hạn, rõ ràng, có đầu vào, đầu ra, và chắc chắn kết thúc sau hữu hạn bước.',
    'Phân biệt rõ ràng 3 khái niệm: Bài toán (Vấn đề cần giải) vs Thuật toán (Ý tưởng logic giải quyết) vs Chương trình (Mã code viết bằng ngôn ngữ cụ thể).',
    'Thành thạo kỹ thuật phân tích đề bài bằng Mô hình IPO (Input – Process – Output) trước khi bắt tay vào viết code.',
    'Nhận diện các đặc trưng bắt buộc của một thuật toán tốt: Tính xác định, Tính dừng, Tính đúng đắn và Tính phổ quát.'
  ],

  intuition: {
    title: 'Công thức làm bánh và Bản đồ chỉ đường',
    metaphor: 'Hãy tưởng tượng bạn muốn làm một chiếc bánh kem sinh nhật (đây là Bài toán). Một công thức nấu ăn ghi chi tiết từng bước: "Lấy 2 quả trứng (Input), đánh bông trong 5 phút, nướng ở 180 độ trong 25 phút (Process), ta được cốt bánh thơm ngon (Output)" — đó chính là Thuật toán! Công thức này viết bằng tiếng Việt, tiếng Anh hay tiếng Pháp thì bản chất quy trình vẫn y như nhau. Còn "Chương trình" chính là việc bạn dùng các nút bấm cụ thể của chiếc lò nướng thương hiệu Python để thực thi công thức đó. Nếu công thức viết mập mờ: "Cho một lượng muối vừa phải" (thiếu tính xác định) hoặc "Đun mãi không ngừng" (thiếu tính dừng), chiếc bánh sẽ hỏng. Lập trình giỏi bắt đầu từ việc thiết kế công thức rõ ràng trước khi bật lò!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">MÔ HÌNH IPO: CỐT LÕI CỦA MỌI THUẬT TOÁN</div>
        <div style="display:grid;grid-template-columns:1fr auto 1.5fr auto 1fr;gap:8px;align-items:center;text-align:center;">
          <div style="padding:12px 8px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--accent-primary);">1. INPUT</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Đầu vào:<br/>Dữ liệu, tham số</div>
          </div>
          <span style="font-size:1.2rem;color:var(--accent-primary);font-weight:700;">➔</span>
          <div style="padding:12px 8px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--py-gold);">2. PROCESS</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Xử lý:<br/>Các bước biến đổi logic</div>
          </div>
          <span style="font-size:1.2rem;color:var(--success);font-weight:700;">➔</span>
          <div style="padding:12px 8px;border:2px solid var(--success);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--success);">3. OUTPUT</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Đầu ra:<br/>Kết quả mong muốn</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Phân biệt Bài toán, Thuật toán và Chương trình',
      badge: 'Khái niệm Nền tảng',
      content: `
        <p>Người học thường vội vã mở trình soạn thảo code ngay khi vừa đọc xong đề bài. Đây là nguyên nhân lớn nhất dẫn tới việc viết code rối rắm, phát sinh hàng loạt bug. Hãy phân định rạch ròi 3 tầng nấc:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Khái niệm</th>
                <th>Bản chất</th>
                <th>Ví dụ thực tế</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Bài toán (Problem)</strong></td>
                <td>Nhu cầu hoặc câu hỏi thực tế cần giải quyết. Xác định rõ xuất phát điểm và đích đến.</td>
                <td><em>"Tìm ước chung lớn nhất của hai số nguyên dương $a$ và $b$."</em></td>
              </tr>
              <tr>
                <td><strong>2. Thuật toán (Algorithm)</strong></td>
                <td>Phương pháp tư duy, chuỗi các chỉ dẫn logic từng bước, <strong>độc lập với ngôn ngữ máy tính</strong>.</td>
                <td><em>"Thuật toán Euclid: Lấy $a$ chia lấy dư cho $b$, nếu dư bằng 0 thì dừng..."</em></td>
              </tr>
              <tr>
                <td><strong>3. Chương trình (Program)</strong></td>
                <td>Bản cài đặt cụ thể của thuật toán bằng một ngôn ngữ lập trình (Python, C, Rust) để máy tính hiểu được.</td>
                <td><em>Đoạn mã Python: <code>while b: a, b = b, a % b</code></em></td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4>5 Đặc trưng bắt buộc của một Thuật toán:</h4>
        <ul>
          <li><strong>Tính xác định (Definiteness):</strong> Mỗi bước phải rõ ràng, tuyệt đối không có sự mơ hồ, hai người đọc cùng hiểu một nghĩa duy nhất.</li>
          <li><strong>Tính dừng (Finiteness):</strong> Thuật toán bắt buộc phải kết thúc sau một số lượng bước hữu hạn với mọi bộ dữ liệu đầu vào. Không được chạy vô tận!</li>
          <li><strong>Đầu vào (Input):</strong> Có 0 hoặc nhiều dữ liệu đầu vào được xác định miền giá trị hợp lệ.</li>
          <li><strong>Đầu ra (Output):</strong> Có ít nhất 1 kết quả đầu ra có quan hệ xác định với đầu vào.</li>
          <li><strong>Tính khả thi (Effectiveness):</strong> Mọi bước đều phải thực hiện được bằng các thao tác cơ bản trong thời gian thực tế.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Từ bài toán đến thuật toán và code Python',
          code: `# BÀI TOÁN: Tính tiền cước taxi dựa trên số km di chuyển
# QUY TẮC: Giá mở cửa 10.000đ cho km đầu tiên, mỗi km tiếp theo 12.000đ

# THUẬT TOÁN (IPO):
# - Input: so_km (số thực >= 0)
# - Process:
#     Nếu so_km <= 1: cuoc = 10000
#     Ngược lại: cuoc = 10000 + (so_km - 1) * 12000
# - Output: cuoc (số tiền)

def tinh_cuoc_taxi(so_km):
    if so_km <= 0:
        return 0
    elif so_km <= 1:
        return 10000
    else:
        return 10000 + (so_km - 1) * 12000

print("Cước 0.8 km:", tinh_cuoc_taxi(0.8), "đ")
print("Cước 5 km:  ", tinh_cuoc_taxi(5), "đ")`,
          output: `Cước 0.8 km: 10000 đ
Cước 5 km:   58000.0 đ`,
          annotations: [
            { line: 9, text: 'Hàm cài đặt đúng công thức toán học đã thiết kế.' },
            { line: 10, text: 'Xử lý biên khi số km <= 0.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Mô hình Phân tích IPO (Input – Process – Output)',
      badge: 'Phương pháp Tư duy',
      content: `
        <p>Mô hình IPO là công cụ sắc bén nhất để tháo gỡ mọi đề bài phức tạp. Trước khi gõ bất kỳ ký tự code nào, hãy vẽ một bảng 3 cột và điền vào:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Cột</th>
                <th>Câu hỏi tự đặt ra</th>
                <th>Ví dụ: Tính điểm trung bình học kỳ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Input (Đầu vào)</strong></td>
                <td>Cần những dữ liệu gì? Kiểu dữ liệu là gì? Có giới hạn gì không?</td>
                <td>Danh sách các con số thực điểm số ($0.0 \le diem \le 10.0$).</td>
              </tr>
              <tr>
                <td><strong>Process (Xử lý)</strong></td>
                <td>Cần làm những bước tính toán nào? Theo thứ tự nào? Dùng công thức gì?</td>
                <td>1. Tính tổng các điểm số trong danh sách.<br/>2. Đếm số lượng đầu điểm.<br/>3. Chia tổng cho số lượng để ra trung bình.</td>
              </tr>
              <tr>
                <td><strong>Output (Đầu ra)</strong></td>
                <td>Kết quả trả về là gì? Định dạng thế nào? Cần làm tròn mấy chữ số?</td>
                <td>Một số thực duy nhất đại diện điểm trung bình, làm tròn 2 chữ số thập phân.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Cài đặt thuật toán theo đúng thiết kế IPO',
          code: `# Thiết kế IPO cho bài toán Tính điểm trung bình
def tinh_diem_trung_binh(danh_sach_diem):
    # 1. Kiểm tra đầu vào (Input Validation)
    if not danh_sach_diem:
        return 0.0
    
    # 2. Xử lý (Process)
    tong = sum(danh_sach_diem)
    so_luong = len(danh_sach_diem)
    dtb = tong / so_luong
    
    # 3. Đầu ra (Output)
    return round(dtb, 2)

bang_diem = [8.5, 9.0, 7.5, 8.0]
print("Điểm trung bình:", tinh_diem_trung_binh(bang_diem))`,
          output: `Điểm trung bình: 8.25`,
          annotations: [
            { line: 4, text: 'Xử lý biên: Danh sách rỗng tránh lỗi chia cho 0.' },
            { line: 7, text: 'Thực thi các bước tính toán logic tuần tự.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy "Vừa đọc đề đã lao vào viết code"',
        content: 'Đây là thói quen xấu phổ biến nhất. Không làm rõ Input và Output sẽ khiến bạn vừa viết vừa sửa, dẫn tới code chắp vá và bỏ sót các trường hợp đặc biệt (như số âm, danh sách rỗng, chia cho 0). Hãy dành 70% thời gian để nghĩ và vẽ mô hình IPO trước khi code!'
      }
    ],
    tips: [
      {
        title: 'Quy tắc "Kiểm tra biên" (Edge Cases) ngay ở bước Input',
        content: 'Khi xác định Input, hãy tự hỏi ngay: "Nếu đầu vào bằng 0 thì sao? Nếu là số âm thì sao? Nếu danh sách rỗng thì sao?". Xử lý tốt các trường hợp biên ngay từ bước thiết kế sẽ giúp thuật toán của bạn không bao giờ bị sập lúc chạy thực tế.'
      }
    ],
    deepDive: {
      title: 'Nguồn gốc của từ "Algorithm" (Thuật toán)',
      content: `
        <p>Thuật ngữ <strong>Algorithm</strong> bắt nguồn từ tên của nhà toán học vĩ đại người Ba Tư thế kỷ thứ 9: <strong>Muḥammad ibn Mūsā al-Khwārizmī</strong> (viết Latinh hóa thành <em>Algoritmi</em>). Ông là người đặt nền móng cho đại số học và các phương pháp giải toán từng bước có hệ thống của nhân loại.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Lập bảng phân tích IPO cho bài toán chuyển đổi nhiệt độ',
      problem: 'Đề bài: Viết chương trình đổi nhiệt độ từ độ C sang độ F theo công thức: $F = C \times 1.8 + 32$. Hãy xác định Input, Process, Output của bài toán này và viết mã Python thực thi.',
      hint: 'Input là số thực độ C, Process áp dụng công thức, Output là số thực độ F.',
      solutionCode: `# IPO:
# - Input: do_c (float)
# - Process: do_f = do_c * 1.8 + 32
# - Output: do_f (float)

def doi_c_sang_f(do_c):
    return do_c * 1.8 + 32

print("0 độ C   =", doi_c_sang_f(0), "độ F")
print("100 độ C =", doi_c_sang_f(100), "độ F")
print("37 độ C  =", round(doi_c_sang_f(37), 1), "độ F")`,
      solutionOutput: `0 độ C   = 32.0 độ F
100 độ C = 212.0 độ F
37 độ C  = 98.6 độ F`,
      explanation: 'Việc xác định rõ ràng công thức xử lý ở cột Process giúp chuyển hóa thành câu lệnh return trong code một cách tự nhiên.',
      annotations: [
        { line: 6, text: 'Hàm thuần túy thực hiện bước xử lý.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Phát hiện vi phạm tính dừng của thuật toán',
      problem: 'Một bạn học sinh thiết kế thuật toán tìm số dương nhỏ nhất như sau:\\n`Bước 1: x = 10`\\n`Bước 2: Giảm x đi 2 (x = x - 2)`\\n`Bước 3: Nếu x khác 0, quay lại Bước 2`\\n`Bước 4: In ra kết quả`\\nHỏi: Thuật toán trên có vi phạm tính chất nào của thuật toán không nếu ban đầu gán `x = 9`? Hãy giải thích.',
      hint: 'Xét chuỗi giá trị của x khi bắt đầu từ số lẻ 9: 9 -> 7 -> 5 -> 3 -> 1 -> -1 -> -3...',
      solutionCode: `# Mô phỏng lỗi lặp vô hạn khi thiếu tính dừng:
def thuat_toan_loi(x):
    buoc = 0
    while x != 0:
        x -= 2
        buoc += 1
        if buoc > 10:  # Đặt chốt chặn để tránh treo máy
            return "LỖI: Vòng lặp vô hạn! x đã âm và không bao giờ bằng 0."
    return f"Thành công dừng tại x = {x}"

print("Khi x = 10:", thuat_toan_loi(10))
print("Khi x = 9: ", thuat_toan_loi(9))`,
      solutionOutput: `Khi x = 10: Thành công dừng tại x = 0
Khi x = 9:  LỖI: Vòng lặp vô hạn! x đã âm và không bao giờ bằng 0.`,
      explanation: 'Khi x là số lẻ (x = 9), việc trừ 2 sẽ nhảy cóc qua số 0 (1 -> -1 -> -3...). Điều kiện dừng x != 0 sẽ mãi mãi là True, vi phạm Tính dừng (Finiteness) của thuật toán!',
      annotations: [
        { line: 4, text: 'Điều kiện x != 0 quá mong manh đối với số lẻ.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây định nghĩa chính xác nhất về một Thuật toán (Algorithm)?',
      options: [
        'Một đoạn mã viết bằng ngôn ngữ Python để chạy trên máy tính.',
        'Một dãy hữu hạn các chỉ dẫn rõ ràng, không mập mờ, nhận đầu vào và chắc chắn kết thúc sau số bước hữu hạn để tạo ra đầu ra mong muốn.',
        'Một phần mềm đã được đóng gói thành file .exe hoàn chỉnh.',
        'Một công thức toán học phức tạp không thể tính bằng tay.'
      ],
      correctIndex: 1,
      explanation: 'Thuật toán là khái niệm logic độc lập với ngôn ngữ máy tính, bắt buộc phải có tính hữu hạn, xác định và dừng.'
    },
    {
      question: 'Trong mô hình phân tích IPO, thành phần "P" (Process) đại diện cho điều gì?',
      options: [
        'Phần cứng máy tính (Processor).',
        'Chuỗi các bước xử lý, biến đổi logic và công thức tính toán từ dữ liệu đầu vào để tạo ra kết quả.',
        'Mật khẩu bảo mật chương trình (Password).',
        'Ngôn ngữ lập trình được sử dụng (Python).'
      ],
      correctIndex: 1,
      explanation: 'IPO viết tắt của Input (Đầu vào) - Process (Xử lý logic) - Output (Đầu ra kết quả).'
    },
    {
      question: 'Nếu một đoạn mã chạy mãi mãi không bao giờ dừng (vòng lặp vô tận), nó đã vi phạm tính chất bắt buộc nào của thuật toán?',
      options: [
        'Tính xác định (Definiteness)',
        'Tính dừng (Finiteness)',
        'Tính phổ quát (Generality)',
        'Tính bảo mật (Security)'
      ],
      correctIndex: 1,
      explanation: 'Tính dừng (Finiteness) quy định mọi thuật toán phải kết thúc sau một số lượng bước hữu hạn với mọi đầu vào hợp lệ.'
    }
  ],

  summary: [
    'Bài toán là vấn đề cần giải; Thuật toán là phương pháp logic từng bước; Chương trình là mã cài đặt cụ thể.',
    'Mọi thuật toán bắt buộc phải có: Tính xác định, Tính dừng, Đầu vào, Đầu ra, và Tính khả thi.',
    'Mô hình IPO (Input – Process – Output) là công cụ tư duy số 1 để phân tích đề bài trước khi viết code.',
    'Luôn kiểm tra các trường hợp biên (0, số âm, rỗng) ngay từ bước thiết kế thuật toán.'
  ]
};
