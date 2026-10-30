export default {
  id: 'p0b-02',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B1.2',
  title: 'Flowchart để làm gì và không làm gì? So sánh với Mã giả',
  subtitle: 'Định vị đúng công cụ tư duy: Khi nào nên vẽ flowchart, khi nào dùng mã giả (pseudocode) và ranh giới không lạm dụng',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu đúng mục đích tối cao của Flowchart: Là công cụ để suy nghĩ và giao tiếp giải thuật, KHÔNG PHẢI thứ phải vẽ cho mọi dòng code.',
    'Phân biệt rõ ràng giữa Flowchart (Sơ đồ trực quan 2 chiều) và Mã giả (Pseudocode - Văn bản phi hình thức 1 chiều).',
    'Nắm vững ma trận so sánh: Khi nào nên vẽ flowchart, khi nào nên viết mã giả, và khi nào nên code trực tiếp.',
    'Nhận biết các cạm bẫy lạm dụng: Vẽ flowchart quá chi tiết từng dòng gán biến (Over-specification) làm mất đi bức tranh tổng thể.'
  ],

  intuition: {
    title: 'Bản vẽ phác thảo kiến trúc sư và Kịch bản phân cảnh đạo diễn',
    metaphor: 'Khi xây một cây cầu vượt phức tạp, các kỹ sư luôn vẽ một bản sơ đồ luồng giao thông để cả đội ngũ — từ chủ đầu tư, thợ thi công đến cảnh sát giao thông — đều nhìn thấy dòng xe sẽ rẽ nhánh thế nào mà không sợ đâm nhau. Đó chính là Flowchart! Nó là ngôn ngữ hình ảnh toàn cầu. Nhưng nếu bạn chỉ muốn sửa cái bóng đèn trong phòng ngủ, bạn không cần phải vẽ bản vẽ kiến trúc 3D làm gì (đó là sự lạm dụng). Còn Mã giả (Pseudocode) giống như cuốn kịch bản phân cảnh của đạo diễn: viết bằng lời văn tự nhiên kết hợp cú pháp logic, giúp bạn sắp xếp mạch phim trước khi bấm máy quay thật. Flowchart giúp mắt bạn "nhìn thấy" cấu trúc rẽ nhánh và vòng lặp trong không gian 2 chiều, còn mã giả giúp bạn diễn đạt logic tuần tự một cách nhanh nhất.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">BA CÔNG CỤ DIỄN ĐẠT THUẬT TOÁN TRONG LẬP TRÌNH</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;text-align:center;">
          <div style="padding:10px;border:1px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--accent-primary);">1. FLOWCHART</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Hình học 2 chiều<br/>Trực quan, dễ thảo luận<br/>Thấy ngay rẽ nhánh</div>
          </div>
          <div style="padding:10px;border:1px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--py-gold);">2. MÃ GIẢ (PSEUDOCODE)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Văn bản có cấu trúc<br/>Viết nhanh, dễ sửa<br/>Gần gũi với mã thật</div>
          </div>
          <div style="padding:10px;border:1px solid var(--success);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--success);">3. MÃ NGUỒN (CODE)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Python cụ thể<br/>Chạy được trên máy<br/>Tuân thủ ngữ pháp chặt</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Flowchart làm được gì và KHÔNG làm được gì?',
      badge: 'Định vị Công cụ',
      content: `
        <p><strong>Lưu đồ thuật toán (Flowchart)</strong> là biểu đồ sử dụng các hình khối hình học chuẩn mực được nối với nhau bằng các mũi tên để mô tả dòng chảy điều khiển (Control Flow) của một giải thuật.</p>
        <h4>Flowchart sinh ra để làm gì?</h4>
        <ul>
          <li><strong>Rèn luyện tư duy thị giác:</strong> Giúp bộ não người "nhìn thấy" các ngã rẽ, nhận ra ngay nếu một nhánh bị cụt (Dead end) hoặc một vòng lặp không có đường thoát (Infinite loop).</li>
          <li><strong>Giao tiếp đa ngành:</strong> Là cầu nối hoàn hảo giữa kỹ sư phần mềm với khách hàng, chuyên gia nghiệp vụ ngân hàng hay bác sĩ y khoa — những người không biết code nhưng có thể đọc hiểu lưu đồ ngay lập tức.</li>
          <li><strong>Tài liệu hóa kiến trúc:</strong> Lưu giữ quy trình nghiệp vụ lớn của hệ thống để người mới vào dự án có thể nắm bắt bức tranh toàn cảnh trong 10 phút.</li>
        </ul>
        <h4>Flowchart KHÔNG NÊN làm gì?</h4>
        <ul>
          <li><strong>Không vẽ cho mọi hàm nhỏ đơn giản:</strong> Một hàm cộng hai số <code>def add(a, b): return a + b</code> không cần vẽ flowchart! Việc vẽ cho mọi dòng code chỉ gây lãng phí thời gian và làm rối mắt.</li>
          <li><strong>Không thay thế việc viết code:</strong> Flowchart chỉ là phương tiện thiết kế, nó không chạy trực tiếp được và không thể hiện tốt các chi tiết kỹ thuật như quản lý bộ nhớ hay ép kiểu dữ liệu.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh mức độ cần thiết của Flowchart theo độ phức tạp bài toán',
          code: `# TRƯỜNG HỢP 1: Không cần vẽ Flowchart (Quá đơn giản)
def gap_doi(x):
    return x * 2

# TRƯỜNG HỢP 2: Rất cần vẽ Flowchart trước khi code
# Thuật toán duyệt hồ sơ vay vốn: kiểm tra nợ xấu -> kiểm tra thu nhập
# -> kiểm tra tài sản đảm bảo -> phê duyệt mức hạn mức -> thông báo
def xet_duyet_khoan_vay(khach_hang):
    if khach_hang.get("no_xau"):
        return "Từ chối: Có lịch sử nợ xấu"
    if khach_hang.get("thu_nhap", 0) < 15000000:
        return "Từ chối: Thu nhập không đủ điều kiện"
    if khach_hang.get("tai_san_the_chap"):
        return "Duyệt: Hạn mức tối đa 500 triệu"
    return "Duyệt: Hạn mức tín chấp 50 triệu"

print("Kết quả:", xet_duyet_khoan_vay({"no_xau": False, "thu_nhap": 20000000, "tai_san_the_chap": True}))`,
          output: `Kết quả: Duyệt: Hạn mức tối đa 500 triệu`,
          annotations: [
            { line: 2, text: 'Các hàm tuyến tính 1 dòng không bao giờ cần vẽ flowchart.' },
            { line: 9, text: 'Quy trình nhiều nhánh rẽ quyết định cực kỳ thích hợp để mô hình hóa bằng flowchart.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: So sánh Flowchart và Mã giả (Pseudocode) — Khi nào dùng cái nào?',
      badge: 'Công cụ Bổ trợ',
      content: `
        <p><strong>Mã giả (Pseudocode)</strong> là cách diễn đạt thuật toán bằng ngôn ngữ tự nhiên (tiếng Việt hoặc tiếng Anh) nhưng được cấu trúc hóa theo các khối lệnh logic (như NẾU... THÌ..., LẶP KHI...).</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Tiêu chí</th>
                <th>Flowchart (Lưu đồ)</th>
                <th>Mã giả (Pseudocode)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hình thức</strong></td>
                <td>Sơ đồ khối hình học 2 chiều có mũi tên.</td>
                <td>Văn bản 1 chiều có thụt lề, dùng từ khóa giả lập.</td>
              </tr>
              <tr>
                <td><strong>Tốc độ phác thảo</strong></td>
                <td>Chậm hơn (cần căn chỉnh hình khối, mũi tên).</td>
                <td><strong>Rất nhanh</strong> (chỉ cần gõ phím như viết văn).</td>
              </tr>
              <tr>
                <td><strong>Ưu điểm lớn nhất</strong></td>
                <td>Trực quan sinh động, nhìn thấy ngay các chu trình lặp và ngã rẽ song song.</td>
                <td>Rất gần với cú pháp mã nguồn thật, dễ chuyển thành code chỉ trong vài giây.</td>
              </tr>
              <tr>
                <td><strong>Nhược điểm</strong></td>
                <td>Chiếm nhiều diện tích màn hình, khó sửa khi thuật toán mở rộng hàng chục bước.</td>
                <td>Kém trực quan hơn với người không chuyên ngành kỹ thuật.</td>
              </tr>
              <tr>
                <td><strong>Khi nào dùng?</strong></td>
                <td>Khi thiết kế luồng nghiệp vụ tổng quan, giải thích thuật toán cho nhóm, hoặc khi tư duy bị bế tắc ở các nhánh rẽ.</td>
                <td>Khi tự thiết kế thuật toán chi tiết, chuẩn bị viết code trong các buổi phỏng vấn kỹ thuật hoặc bài thi.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh cùng một thuật toán biểu diễn bằng Mã giả và Code Python',
          code: `"""
MÃ GIẢ (PSEUDOCODE) TÌM SỐ LỚN NHẤT:
-------------------------------------
HÀM TimMax(danh_sach):
    NẾU danh_sach RỖNG THÌ:
        TRẢ VỀ None
    
    max_val = phần tử đầu tiên của danh_sach
    VỚI MỖI x TRONG danh_sach TỪ PHẦN TỬ THỨ HAI:
        NẾU x > max_val THÌ:
            max_val = x
            
    TRẢ VỀ max_val
"""

# CODE PYTHON THỰC TẾ:
def tim_max(danh_sach):
    if not danh_sach:
        return None
    max_val = danh_sach[0]
    for x in danh_sach[1:]:
        if x > max_val:
            max_val = x
    return max_val

print("Số lớn nhất trong [3, 9, 2, 7]:", tim_max([3, 9, 2, 7]))`,
          output: `Số lớn nhất trong [3, 9, 2, 7]: 9`,
          annotations: [
            { line: 2, text: 'Mã giả không phụ thuộc cú pháp Python, người học Java/C đều đọc hiểu ngay.' },
            { line: 17, text: 'Code Python ánh xạ 1-1 từ cấu trúc mã giả sang.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cạm bẫy "Vẽ flowchart chi tiết đến từng biến đếm i = i + 1"',
        content: 'Flowchart sinh ra để làm rõ ý tưởng thuật toán ở mức trừu tượng hợp lý. Nếu bạn vẽ từng ô nhỏ xíu cho việc khởi tạo biến, tăng biến đếm, in ra màn hình... sơ đồ sẽ biến thành một đám rừng dây nhợ rối rắm không ai muốn đọc. Hãy gom các bước tính toán nhỏ vào cùng một khối Xử lý!'
      }
    ],
    tips: [
      {
        title: 'Quy trình vàng của kỹ sư: Ý tưởng ➔ Flowchart/Mã giả ➔ Code ➔ Test',
        content: 'Khi gặp một bài toán khó: 1. Đặt bút vẽ flowchart luồng chính trên giấy nháp để thông suốt tư duy. 2. Viết mã giả các bước chi tiết. 3. Mở máy gõ code Python. 4. Chạy test kiểm chứng. Quy trình 4 bước này sẽ giúp bạn tiết kiệm hàng giờ gỡ lỗi.'
      }
    ],
    deepDive: null,
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Chuyển đổi một đoạn mã giả thành code Python hoàn chỉnh',
      problem: 'Cho đoạn mã giả sau:\\n```\\nHÀM KiemTraTuoi(tuoi):\\n    NẾU tuoi >= 18 THÌ\\n        TRẢ VỀ "Đủ tuổi bầu cử"\\n    NGƯỢC LẠI\\n        TRẢ VỀ "Chưa đủ tuổi"\\n```\\nHãy viết hàm Python tương ứng và chạy thử với `tuoi = 16` và `tuoi = 20`.',
      hint: 'Dùng if tuoi >= 18: return ... else: return ...',
      solutionCode: `def kiem_tra_tuoi(tuoi):
    if tuoi >= 18:
        return "Đủ tuổi bầu cử"
    else:
        return "Chưa đủ tuổi"

print("16 tuổi:", kiem_tra_tuoi(16))
print("20 tuổi:", kiem_tra_tuoi(20))`,
      solutionOutput: `16 tuổi: Chưa đủ tuổi
20 tuổi: Đủ tuổi bầu cử`,
      explanation: 'Mã giả chuyển sang Python rất tự nhiên nhờ cấu trúc if/else tương thích trực tiếp.',
      annotations: [
        { line: 1, text: 'Hàm cài đặt đúng theo kịch bản mã giả.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Đánh giá khi nào nên vẽ flowchart cho tính năng thanh toán',
      problem: 'Một hệ thống thương mại điện tử cần xây dựng quy trình thanh toán: kiểm tra số dư -> nếu đủ thì trừ tiền, nếu thiếu thì gợi ý nạp thêm -> gửi mã OTP -> xác thực OTP (tối đa 3 lần) -> thông báo thành công hoặc khóa giao dịch. Hãy viết mã giả thể hiện quy trình này và giải thích vì sao trường hợp này nên vẽ Flowchart trước.',
      hint: 'Có vòng lặp xác thực OTP tối đa 3 lần và nhiều nhánh rẽ thất bại.',
      solutionCode: `"""
MÃ GIẢ QUY TRÌNH THANH TOÁN:
1. NẾU so_du < tong_tien THÌ:
     Hiển thị "Thiếu tiền, vui lòng nạp thêm" -> DỪNG
2. Gửi mã OTP tới điện thoại
3. dem_lan_nhap = 0
4. LẶP KHI dem_lan_nhap < 3:
     otp_nhap = Nhập từ người dùng
     NẾU otp_nhap == otp_thuc THÌ:
         Trừ tiền tài khoản
         Hiển thị "Thanh toán thành công" -> DỪNG
     NGƯỢC LẠI:
         dem_lan_nhap = dem_lan_nhap + 1
         Hiển thị "OTP sai, còn 3 - dem lần thử"
5. Hiển thị "Đã khóa giao dịch do nhập sai OTP quá 3 lần" -> DỪNG
"""

def thanh_toan(so_du, tong_tien, otp_thuc, danh_sach_otp_nhap):
    if so_du < tong_tien:
        return "Thiếu tiền, vui lòng nạp thêm"
    
    for idx, otp in enumerate(danh_sach_otp_nhap[:3]):
        if otp == otp_thuc:
            return "Thanh toán thành công"
    return "Đã khóa giao dịch do nhập sai OTP quá 3 lần"

print("Test đúng OTP:", thanh_toan(500000, 200000, "1234", ["0000", "1234"]))
print("Test sai 3 lần:", thanh_toan(500000, 200000, "1234", ["1111", "2222", "3333"]))`,
      solutionOutput: `Test đúng OTP: Thanh toán thành công
Test sai 3 lần: Đã khóa giao dịch do nhập sai OTP quá 3 lần`,
      explanation: 'Quy trình này chứa cả rẽ nhánh điều kiện số dư, vòng lặp giới hạn số lần thử OTP, và nhiều điểm thoát sớm. Vẽ flowchart giúp lập trình viên và chuyên gia nghiệp vụ ngân hàng nhìn rõ toàn bộ các kịch bản rủi ro.',
      annotations: [
        { line: 20, text: 'Kiểm tra số dư trước.' },
        { line: 23, text: 'Vòng lặp tối đa 3 lần thử OTP.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây thể hiện ĐÚNG NHẤT về vai trò của Flowchart trong công việc của kỹ sư phần mềm?',
      options: [
        'Flowchart là thứ bắt buộc phải vẽ cho từng hàm và từng dòng code trong mọi dự án.',
        'Flowchart là công cụ tư duy thị giác và giao tiếp logic, đặc biệt hữu ích khi thiết kế các quy trình rẽ nhánh phức tạp hoặc giải thích thuật toán cho các thành viên khác.',
        'Flowchart có thể thay thế hoàn toàn việc viết code Python.',
        'Chỉ có người không biết lập trình mới cần vẽ flowchart.'
      ],
      correctIndex: 1,
      explanation: 'Flowchart là công cụ tư duy và giao tiếp ở mức trừu tượng, không phải thứ cần lạm dụng cho mọi đoạn code đơn giản.'
    },
    {
      question: 'Ưu điểm lớn nhất của Mã giả (Pseudocode) so với Flowchart khi lập trình viên tự thiết kế thuật toán là gì?',
      options: [
        'Mã giả có thể chạy trực tiếp bằng lệnh python.',
        'Mã giả viết bằng văn bản rất nhanh, dễ chỉnh sửa trên bàn phím, và có cấu trúc tuần tự rất gần với cú pháp mã nguồn thật.',
        'Mã giả có hình khối màu sắc đẹp hơn flowchart.',
        'Mã giả tự động dịch thành file nhị phân.'
      ],
      correctIndex: 1,
      explanation: 'Mã giả cho phép lập trình viên phác thảo ý tưởng nhanh chóng bằng văn bản mà không tốn công căn chỉnh hình khối hình học.'
    },
    {
      question: 'Trường hợp nào sau đây KHÔNG CẦN THIẾT phải vẽ Flowchart?',
      options: [
        'Quy trình xét duyệt vay vốn ngân hàng có 10 điều kiện rẽ nhánh đan xen.',
        'Một hàm đơn giản nhận hai số a, b và trả về tổng a + b.',
        'Thuật toán tìm kiếm nhị phân có vòng lặp thu hẹp khoảng tìm kiếm.',
        'Quy trình đặt vé máy bay và giữ chỗ ghế ngồi của hãng hàng không.'
      ],
      correctIndex: 1,
      explanation: 'Các hàm tuyến tính 1–2 dòng đơn giản hoàn toàn không có rẽ nhánh phức tạp, việc vẽ flowchart cho chúng là lãng phí và không đem lại giá trị.'
    }
  ],

  summary: [
    'Flowchart là công cụ tư duy thị giác 2 chiều giúp nhìn rõ các nhánh rẽ và vòng lặp; không lạm dụng cho các hàm đơn giản.',
    'Mã giả (Pseudocode) là văn bản có cấu trúc viết bằng ngôn ngữ tự nhiên, viết rất nhanh và gần với code thật.',
    'Dùng Flowchart khi cần giao tiếp nghiệp vụ và làm rõ luồng phức tạp; dùng Mã giả khi tự thiết kế giải thuật chi tiết.',
    'Quy trình chuẩn: Ý tưởng ➔ Flowchart/Mã giả ➔ Viết code ➔ Kiểm thử.'
  ]
};
