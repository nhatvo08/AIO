export default {
  id: 'p0b-07',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B1.7',
  title: 'Bảng theo dõi giá trị (Trace Table) và Kỹ năng "Chạy tay" (Dry Run)',
  subtitle: 'Kỹ năng số 1 của lập trình viên: Cách lập bảng theo dõi biến, gạch giá trị cũ, cập nhật giá trị mới và bắt trọn lỗi sai logic',
  level: 'Cơ bản',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thấu hiểu bản chất của kỹ năng "Chạy tay" (Dry Run): Tự đóng vai trình thông dịch máy tính để thực thi từng dòng lệnh trên giấy.',
    'Làm chủ cấu trúc chuẩn mực của một Bảng theo dõi biến (Trace Table): Cột Bước, Cột Dòng lệnh, Cột Điều kiện logic, Các cột Biến số, và Cột Output.',
    'Thành thạo kỹ thuật cập nhật trạng thái ô nhớ: Gạch ngang giá trị cũ khi biến bị gán lại và ghi giá trị mới.',
    'Rèn luyện phản xạ phát hiện các lỗi logic nguy hiểm thông qua Trace Table: Lỗi lệch 1 đơn vị (Off-by-one), lỗi biến chưa khởi tạo, và lỗi điều kiện dừng sai.'
  ],

  intuition: {
    title: 'Cuốn sổ cái của kế toán trưởng và Trò chơi cờ tướng',
    metaphor: 'Trong cờ tướng, một kỳ thủ đẳng cấp không bao giờ nhấc tay đi quân một cách bốc đồng; họ ngồi tĩnh lặng, nhắm mắt và "chạy thử" trong đầu: "Nếu mình đi Mã lên đây, đối phương sẽ nhảy Xe vào đâu, con Pháo của mình sẽ bị chiếu ra sao?". Đó chính là kỹ năng Dry Run (Chạy tay)! Còn Bảng theo dõi biến (Trace Table) giống như cuốn sổ cái kế toán của một ngân hàng: mỗi giao dịch tiền vào tiền ra đều được ghi vào một dòng riêng biệt với thời gian, số dư cũ bị gạch đi và số dư mới được cập nhật. Nếu cuối ngày phát hiện thiếu 1 đồng, người kế toán chỉ cần lật từng trang sổ cái để tìm ra đúng giao dịch đã làm sai. Khi bạn biết lập Trace Table, không có con bọ (bug) nào có thể lẩn trốn khỏi mắt bạn!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">CẤU TRÚC 5 CỘT CHUẨN CỦA MỘT BẢNG TRACE TABLE</div>
        <div style="display:grid;grid-template-columns:repeat(5, 1fr);gap:6px;text-align:center;">
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong style="color:var(--text-muted);font-size:0.75rem;">1. BƯỚC / DÒNG</strong>
            <div style="font-size:0.7rem;margin-top:2px;">Vị trí code</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong style="color:var(--py-gold);font-size:0.75rem;">2. ĐIỀU KIỆN</strong>
            <div style="font-size:0.7rem;margin-top:2px;">True / False</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);font-size:0.75rem;">3. BIẾN A</strong>
            <div style="font-size:0.7rem;margin-top:2px;">Giá trị trong RAM</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);font-size:0.75rem;">4. BIẾN B</strong>
            <div style="font-size:0.7rem;margin-top:2px;">Giá trị trong RAM</div>
          </div>
          <div style="padding:8px 4px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong style="color:var(--success);font-size:0.75rem;">5. OUTPUT</strong>
            <div style="font-size:0.7rem;margin-top:2px;">In ra màn hình</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Dry Run là gì? Vì sao máy tính chạy nhanh nhưng người giỏi phải biết chạy chậm?',
      badge: 'Phương pháp Cốt lõi',
      content: `
        <p><strong>Dry Run (Chạy tay / Bàn cờ nháp):</strong> Là quá trình con người tự mình thực thi từng dòng lệnh của một thuật toán trên giấy với một bộ dữ liệu thử nghiệm nhỏ, ghi chép lại mọi sự thay đổi của biến số sau từng bước mà không cần bấm nút Run trên máy tính.</p>
        <h4>Tại sao kỹ sư senior luôn bắt đầu bằng Dry Run?</h4>
        <ul>
          <li><strong>Máy tính chỉ làm theo lệnh, nó không biết bạn "nghĩ gì":</strong> Máy tính chạy 1 tỷ lệnh/giây, nếu logic sai nó sẽ tính sai 1 tỷ lần/giây. Chạy tay giúp bạn phát hiện sai ngay từ trong trứng nước.</li>
          <li><strong>Hiểu rõ trạng thái ô nhớ:</strong> Giúp bạn rèn luyện mô hình tinh thần, biết được con số trong RAM đang nhảy múa như thế nào qua từng vòng lặp.</li>
          <li><strong>Vũ khí số 1 trong phỏng vấn kỹ thuật:</strong> Các công ty công nghệ hàng đầu luôn yêu cầu ứng viên: <em>"Hãy vẽ bảng trace table cho ca kiểm thử này trên bảng trắng"</em>.</li>
        </ul>
      `
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Quy trình 4 bước Lập một Bảng Trace Table Chuẩn mực',
      badge: 'Kỹ thuật Lập bảng',
      content: `
        <ol>
          <li><strong>Bước 1 - Liệt kê tiêu đề cột:</strong>
            <ul>
              <li>Cột 1: Số thứ tự bước lặp hoặc số dòng lệnh.</li>
              <li>Cột 2: Biểu thức điều kiện kiểm tra (nếu có rẽ nhánh hay lặp).</li>
              <li>Các cột tiếp theo: Mỗi biến số trong thuật toán được dành riêng một cột (ví dụ: cột <code>i</code>, cột <code>tong</code>).</li>
              <li>Cột cuối cùng: Kết quả in ra màn hình (Output).</li>
            </ul>
          </li>
          <li><strong>Bước 2 - Điền trạng thái khởi tạo:</strong> Dòng đầu tiên luôn ghi các giá trị ban đầu của biến trước khi bước vào xử lý.</li>
          <li><strong>Bước 3 - Lần lượt điền từng dòng theo thời gian:</strong> Mỗi khi một biến bị thay đổi giá trị, ghi giá trị mới vào dòng tương ứng.</li>
          <li><strong>Bước 4 - Đối chiếu kết quả với kỳ vọng:</strong> So sánh giá trị cuối cùng ở cột Output với kết quả bạn tính nhẩm bằng tay. Nếu khác nhau, bạn đã bắt được bug!</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Bài tập mẫu: Dry Run thuật toán đảo ngược số nguyên (ví dụ n = 123)',
          code: `# THUẬT TOÁN ĐẢO NGƯỢC SỐ NGUYÊN
def dao_nguoc_so(n):
    so_dao = 0
    while n > 0:
        chu_so_cuoi = n % 10          # Lấy chữ số hàng đơn vị
        so_dao = so_dao * 10 + chu_so_cuoi # Ghép vào số đảo
        n = n // 10                   # Bỏ chữ số cuối
    return so_dao

print("Đảo ngược 123 thành:", dao_nguoc_so(123))`,
          output: `Đảo ngược 123 thành: 321`,
          annotations: [
            { line: 5, text: 'Phép n % 10 trích xuất chữ số cuối cùng.' },
            { line: 7, text: 'Phép chia nguyên n // 10 rút ngắn con số.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Bảng Trace Table Thực tế cho Thuật toán Đảo ngược số (n = 123)',
      badge: 'Bảng Minh họa Trực quan',
      content: `
        <p>Dưới đây là toàn bộ tiến trình nội soi ô nhớ của CPython khi thực thi hàm <code>dao_nguoc_so(123)</code>:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Lần lặp</th>
                <th>Điều kiện <code>n > 0</code></th>
                <th><code>chu_so_cuoi</code> ($n \% 10$)</th>
                <th><code>so_dao</code> ($so\_dao \times 10 + cuoi$)</th>
                <th><code>n</code> ($n // 10$)</th>
                <th>Ghi chú trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Khởi tạo</strong></td>
                <td>—</td>
                <td>—</td>
                <td><code>0</code></td>
                <td><code>123</code></td>
                <td>Bắt đầu trước vòng lặp</td>
              </tr>
              <tr>
                <td><strong>Vòng 1</strong></td>
                <td><code>123 > 0</code> (True)</td>
                <td><code>123 % 10 = 3</code></td>
                <td><code>0 * 10 + 3 = 3</code></td>
                <td><code>123 // 10 = 12</code></td>
                <td>Lấy được số 3</td>
              </tr>
              <tr>
                <td><strong>Vòng 2</strong></td>
                <td><code>12 > 0</code> (True)</td>
                <td><code>12 % 10 = 2</code></td>
                <td><code>3 * 10 + 2 = 32</code></td>
                <td><code>12 // 10 = 1</code></td>
                <td>Ghép tiếp số 2</td>
              </tr>
              <tr>
                <td><strong>Vòng 3</strong></td>
                <td><code>1 > 0</code> (True)</td>
                <td><code>1 % 10 = 1</code></td>
                <td><code>32 * 10 + 1 = 321</code></td>
                <td><code>1 // 10 = 0</code></td>
                <td>Ghép tiếp số 1</td>
              </tr>
              <tr>
                <td><strong>Thoát lặp</strong></td>
                <td><code>0 > 0</code> (<strong>False</strong>)</td>
                <td>—</td>
                <td><code>321</code></td>
                <td><code>0</code></td>
                <td><strong>Dừng vòng lặp</strong>, trả về <code>321</code>!</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy Lỗi Lệch Một Đơn Vị (Off-by-one Error)',
        content: 'Đây là lỗi phổ biến nhất trong các bài thi thuật toán: lặp thừa 1 lần hoặc thiếu 1 lần (ví dụ: dùng `range(1, n)` thay vì `range(1, n + 1)`). Khi lập Trace Table, hãy luôn quan sát kỹ vòng lặp ĐẦU TIÊN và vòng lặp CUỐI CÙNG xem biến đếm có dừng đúng vị trí mong muốn hay không.'
      }
    ],
    tips: [
      {
        title: 'Bí kíp chọn bộ dữ liệu thử nghiệm (Test Case) khi Dry Run',
        content: 'Đừng chọn số quá lớn! Hãy chọn số nhỏ nhất có thể phản ánh đầy đủ các ngã rẽ của thuật toán (ví dụ: chọn mảng 3 phần tử `[3, 1, 2]`, hoặc số `n = 4`). Chạy tay với số nhỏ giúp bạn tính toán nhẩm cực nhanh trong 1–2 phút.'
      }
    ],
    deepDive: null,
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Điền vào bảng Trace Table cho đoạn code tính lũy thừa',
      problem: 'Cho đoạn code:\\n```python\\np = 1\\nfor k in range(3):\\n    p = p * 2\\n```\\nHãy lập bảng Trace Table cho biết giá trị của `k` và `p` qua từng lần lặp. Sau khi vòng lặp kết thúc, `p` bằng bao nhiêu?',
      hint: 'range(3) sinh ra các giá trị k lần lượt là: 0, 1, 2.',
      solutionCode: `p = 1
bang = []
for k in range(3):
    p_cu = p
    p = p * 2
    bang.append((k, p_cu, p))

print(f"{'Vòng k':<8} | {'p cũ':<8} | {'Phép tính':<12} | {'p mới':<8}")
print("-" * 42)
for row in bang:
    print(f"{row[0]:<8} | {row[1]:<8} | {row[1]} * 2       | {row[2]:<8}")

print(f"\\nGiá trị cuối cùng của p: {p} (tương đương 2^3)")`,
      solutionOutput: `Vòng k   | p cũ     | Phép tính    | p mới   
------------------------------------------
0        | 1        | 1 * 2        | 2       
1        | 2        | 2 * 2        | 4       
2        | 4        | 4 * 2        | 8       

Giá trị cuối cùng của p: 8 (tương đương 2^3)`,
      explanation: 'range(3) chạy 3 lần với k = 0, 1, 2. Mỗi lần p nhân đôi, kết quả cuối cùng là 2^3 = 8.',
      annotations: [
        { line: 4, text: 'Ghi nhận vết biến p qua từng bước.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Dùng Trace Table để tìm ra lỗi sai lệch 1 đơn vị',
      problem: 'Một bạn học sinh muốn tính tổng các số từ 1 đến 5 bằng code sau:\\n```python\\ntong = 0\\ni = 1\\nwhile i < 5:\\n    tong += i\\n    i += 1\\n```\\nKhi chạy, kết quả ra 10 thay vì 15. Hãy lập bảng Trace Table để chỉ ra chính xác tại sao thuật toán bị sai và cách sửa.',
      hint: 'Quan sát điều kiện i < 5 ở lần lặp cuối cùng khi i = 5.',
      solutionCode: `phan_tich = """
BẢNG THEO DÕI VÒNG LẶP CUỐI CÙNG:
- Lần i = 4: 4 < 5 (True) -> tong = 6 + 4 = 10, i tăng lên 5.
- Lần i = 5: Kiểm tra điều kiện '5 < 5' -> KẾT QUẢ LÀ FALSE!
Vòng lặp DỪNG NGAY LẬP TỨC và bỏ qua số 5! Do đó tong chỉ dừng lại ở 10.

LỖI: Lệch 1 đơn vị (Off-by-one Error) do dùng dấu '<' thay vì '<='.
CÁCH SỬA: Sửa điều kiện thành 'while i <= 5:'
"""
print(phan_tich.strip())`,
      solutionOutput: `BẢNG THEO DÕI VÒNG LẶP CUỐI CÙNG:
- Lần i = 4: 4 < 5 (True) -> tong = 6 + 4 = 10, i tăng lên 5.
- Lần i = 5: Kiểm tra điều kiện '5 < 5' -> KẾT QUẢ LÀ FALSE!
Vòng lặp DỪNG NGAY LẬP TỨC và bỏ qua số 5! Do đó tong chỉ dừng lại ở 10.

LỖI: Lệch 1 đơn vị (Off-by-one Error) do dùng dấu '<' thay vì '<='.
CÁCH SỬA: Sửa điều kiện thành 'while i <= 5:'`,
      explanation: 'Trace Table phơi bày chính xác khoảnh khắc điều kiện bị đánh giá sai ở ranh giới biên.',
      annotations: [
        { line: 2, text: 'Chỉ rõ giá trị tại bước i = 5.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Kỹ năng "Dry Run" (Chạy tay) trong lập trình có nghĩa là gì?',
      options: [
        'Chạy chương trình trên máy chủ đám mây không có màn hình.',
        'Con người tự mình thực thi từng dòng lệnh của thuật toán trên giấy hoặc bảng nháp, ghi lại sự biến đổi của biến số qua từng bước mà không cần máy tính.',
        'Xóa hết các biến tạm để tiết kiệm RAM.',
        'Biên dịch code sang file nhị phân.'
      ],
      correctIndex: 1,
      explanation: 'Dry Run là phương pháp kiểm chứng logic thủ công bằng mắt và não người trên giấy nháp để hiểu sâu sắc luồng thực thi.'
    },
    {
      question: 'Trong một Bảng theo dõi biến (Trace Table), khi một biến bị gán giá trị mới, quy tắc ghi chép chuẩn mực là gì?',
      options: [
        'Xóa sạch bảng và vẽ lại từ đầu.',
        'Ghi giá trị mới vào một dòng mới (hoặc gạch ngang giá trị cũ) tương ứng với bước thực thi hiện tại.',
        'Cộng dồn giá trị mới vào giá trị cũ.',
        'Chỉ ghi khi chương trình kết thúc.'
      ],
      correctIndex: 1,
      explanation: 'Mỗi dòng trong trace table thể hiện một lát cắt thời gian; ghi nhận giá trị mới giúp ta đối chiếu được lịch sử biến đổi của ô nhớ.'
    },
    {
      question: 'Lỗi "Lệch một đơn vị" (Off-by-one Error) thường được phát hiện dễ dàng nhất qua thao tác nào trong Trace Table?',
      options: [
        'Kiểm tra kích thước file code.',
        'Quan sát kỹ bước lặp đầu tiên và bước lặp cuối cùng tại điều kiện thoát vòng lặp.',
        'Đổi tên biến thành chữ hoa.',
        'Thêm dấu hai chấm vào cuối dòng.'
      ],
      correctIndex: 1,
      explanation: 'Lỗi lệch 1 đơn vị luôn bộc lộ tại thời điểm biên của vòng lặp: kiểm tra xem vòng lặp có bắt đầu đúng số đầu tiên và dừng đúng số cuối cùng hay không.'
    }
  ],

  summary: [
    'Dry Run (Chạy tay) là kỹ năng số 1 giúp lập trình viên hiểu sâu và bắt lỗi logic trước khi chạy máy tính.',
    'Bảng Trace Table gồm 5 cột chuẩn: Bước/Dòng, Điều kiện logic, Các cột biến số, và Output xuất ra.',
    'Mỗi bước lặp ghi một dòng, cập nhật giá trị mới và quan sát sự biến thiên của ô nhớ.',
    'Trace Table là vũ khí tối thượng để phát hiện lỗi Lệch một đơn vị (Off-by-one) và vòng lặp vô hạn.'
  ]
};
