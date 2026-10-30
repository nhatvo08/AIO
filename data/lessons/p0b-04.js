export default {
  id: 'p0b-04',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B1.4',
  title: 'Quy tắc vàng để vẽ Flowchart đúng và chuẩn mực',
  subtitle: '7 quy tắc kiểm tra tính hợp lệ: Điểm vào/ra duy nhất, không nhánh cụt, điều kiện phân định rõ, hướng chảy nhất quán và tính trừu tượng',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững 7 quy tắc vàng để một Flowchart được công nhận là hợp lệ và chuyên nghiệp.',
    'Hiểu nguyên tắc bảo toàn luồng: Một điểm bắt đầu rõ ràng, mọi nhánh rẽ đều phải dẫn về điểm kết thúc (không được có nhánh cụt Dead End).',
    'Rèn luyện kỹ năng viết điều kiện kiểm tra được (testable, không mơ hồ cảm tính) trong các khối quyết định.',
    'Nắm vững kỹ thuật giữ cùng một mức độ trừu tượng trong một sơ đồ và hạn chế tối đa các đường giao cắt.'
  ],

  intuition: {
    title: 'Hệ thống đường ống nước và Quy tắc không rò rỉ',
    metaphor: 'Hãy tưởng tượng Flowchart giống như một hệ thống đường ống nước tuần hoàn khép kín: Nước bắt đầu chảy từ một van tổng duy nhất (Start). Khi đi qua các ngã ba rẽ nhánh (Decision), dù rẽ sang trái hay sang phải thì các ống nước cuối cùng đều phải được gom về bể xả trung tâm (End). Nếu người thợ vụng về để một đường ống rẽ nhánh rồi bỏ lửng giữa chừng không nối vào đâu (nhánh cụt Dead End), nước sẽ tràn ra làm ngập cả ngôi nhà! Một bản vẽ flowchart chuẩn mực là một hệ thống ống nước hoàn hảo: không có điểm rò rỉ, không có nhánh cụt, hướng chảy một chiều từ trên xuống dưới, và tại mỗi van rẽ đều có biển chỉ dẫn rõ ràng "Nếu nhiệt độ > 100 thì mở van A, ngược lại mở van B".',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">7 QUY TẮC VÀNG VẼ FLOWCHART CHUẨN MỰC</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:8px;">
          <div style="padding:8px 10px;border-left:4px solid var(--success);background:var(--bg-surface);border-radius:4px;">
            <strong>1. Một Start duy nhất</strong><br/><small style="color:var(--text-muted);">Luôn có 1 điểm vào xác định</small>
          </div>
          <div style="padding:8px 10px;border-left:4px solid var(--success);background:var(--bg-surface);border-radius:4px;">
            <strong>2. Mọi nhánh về End</strong><br/><small style="color:var(--text-muted);">Tuyệt đối không để nhánh cụt</small>
          </div>
          <div style="padding:8px 10px;border-left:4px solid var(--success);background:var(--bg-surface);border-radius:4px;">
            <strong>3. Nhãn lối ra rõ ràng</strong><br/><small style="color:var(--text-muted);">Ghi rõ Đúng/Sai, Có/Không</small>
          </div>
          <div style="padding:8px 10px;border-left:4px solid var(--success);background:var(--bg-surface);border-radius:4px;">
            <strong>4. Điều kiện kiểm tra được</strong><br/><small style="color:var(--text-muted);">Không viết điều kiện cảm tính</small>
          </div>
          <div style="padding:8px 10px;border-left:4px solid var(--success);background:var(--bg-surface);border-radius:4px;">
            <strong>5. Hướng chảy thống nhất</strong><br/><small style="color:var(--text-muted);">Từ trên xuống, từ trái sang phải</small>
          </div>
          <div style="padding:8px 10px;border-left:4px solid var(--success);background:var(--bg-surface);border-radius:4px;">
            <strong>6. Tránh đường cắt nhau</strong><br/><small style="color:var(--text-muted);">Dùng Connector khi quá rối</small>
          </div>
          <div style="padding:8px 10px;border-left:4px solid var(--success);background:var(--bg-surface);border-radius:4px;">
            <strong>7. Đồng nhất mức trừu tượng</strong><br/><small style="color:var(--text-muted);">Không trộn lẫn tổng quan và chi tiết</small>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Phân tích 7 Quy tắc Vàng kiểm định Flowchart',
      badge: 'Bộ Quy tắc Kỹ thuật',
      content: `
        <p>Để tự kiểm tra một flowchart trước khi đem vào thảo luận hay lập trình, hãy đối chiếu qua danh sách kiểm định (Checklist) 7 điểm sau:</p>
        <ol>
          <li><strong>Quy tắc 1 - Điểm bắt đầu duy nhất:</strong> Sơ đồ luôn bắt đầu bằng đúng 1 khối <em>Bắt đầu (Start)</em>. Chỉ có duy nhất 1 đường mũi tên đi ra khỏi khối này.</li>
          <li><strong>Quy tắc 2 - Mọi nhánh đều phải dẫn tới điểm Kết thúc (End):</strong> Mọi ngã rẽ dù dài hay ngắn, thành công hay lỗi, cuối cùng đều phải hội tụ về một hoặc nhiều khối <em>Kết thúc (End)</em>. Nếu có một đường nối đi vào khoảng trống vô định, sơ đồ bị coi là phế phẩm!</li>
          <li><strong>Quy tắc 3 - Gắn nhãn cho MỌI lối ra của khối Quyết định:</strong> Khối hình thoi có bao nhiêu đường ra thì bấy nhiêu đường phải có nhãn chữ (ví dụ: <code>Đúng</code> / <code>Sai</code>, hoặc <code>Có</code> / <code>Không</code>, hoặc giá trị cụ thể <code>x > 0</code> / <code>x == 0</code> / <code>x < 0</code>). Không bao giờ để người đọc phải đoán!</li>
          <li><strong>Quy tắc 4 - Điều kiện phải kiểm tra được bằng toán học / logic:</strong> Bên trong hình thoi phải là một biểu thức có thể trả lời bằng <code>True</code> hoặc <code>False</code> (ví dụ: <code>tuoi >= 18?</code>, <code>so_du > tien_rut?</code>). Tránh viết mơ hồ như: <em>"Kiểm tra xem người này có tốt không?"</em>.</li>
          <li><strong>Quy tắc 5 - Thống nhất hướng chảy (Flow Direction):</strong> Hướng chảy chuẩn mực của tư duy nhân loại là từ TRÊN XUỐNG DƯỚI và từ TRÁI SANG PHẢI. Mọi đường nối bắt buộc phải có đầu mũi tên chỉ hướng đi rõ ràng.</li>
          <li><strong>Quy tắc 6 - Hạn chế tối đa các đường nối cắt nhau:</strong> Nếu hai đường mũi tên cắt nhau như ngã tư, người đọc rất dễ bị lạc mắt. Hãy sắp xếp lại vị trí các khối hoặc dùng ký hiệu điểm nối hình tròn (Connector).</li>
          <li><strong>Quy tắc 7 - Giữ đồng nhất một mức độ trừu tượng:</strong> Trong sơ đồ cấp cao (High-level), các khối phải ở mức nghiệp vụ lớn (ví dụ: "Xác thực danh tính", "Tính hóa đơn"). Không bao giờ trộn lẫn một khối nghiệp vụ to với một khối chi tiết nhỏ xíu như <code>i = i + 1</code> trong cùng một sơ đồ.</li>
        </ol>
      `
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: So sánh trực quan Sơ đồ Hợp lệ vs Sơ đồ Bị lỗi',
      badge: 'So sánh Đối chứng',
      content: `
        <p>Hãy xem ví dụ đối chiếu giữa một lưu đồ vẽ sai và cách sửa lại đúng quy chuẩn:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Lỗi vi phạm thường gặp</th>
                <th>Hậu quả khi lập trình</th>
                <th>Cách sửa chuẩn mực</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Nhánh cụt (Dead End):</strong> Sau khi kiểm tra mật khẩu sai, đường mũi tên dừng lại trơ trọi.</td>
                <td>Lập trình viên quên viết nhánh <code>else</code>, chương trình bị treo cứng khi người dùng nhập sai.</td>
                <td>Kéo đường mũi tên "Sai" nối tới khối thông báo lỗi rồi dẫn về điểm Kết thúc (hoặc quay lại cho nhập lại).</td>
              </tr>
              <tr>
                <td><strong>Thiếu nhãn ở hình thoi:</strong> Hai đường ra từ ô quyết định không ghi chữ nào.</td>
                <td>Người đọc không biết nhánh nào là Đúng, nhánh nào là Sai.</td>
                <td>Ghi rõ nhãn <code>Có / Đúng</code> và <code>Không / Sai</code> ngay trên thân mũi tên rẽ.</td>
              </tr>
              <tr>
                <td><strong>Mũi tên chỉ ngược không lý do:</strong> Mũi tên chỉ ngược lên trên nhưng không tạo thành vòng lặp.</td>
                <td>Gây rối mắt, vi phạm hướng chảy tự nhiên.</td>
                <td>Vẽ vòng sang bên hông hoặc sắp xếp lại thứ tự từ trên xuống.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Code Python phản ánh một quy trình có đầy đủ các nhánh kết thúc an toàn',
          code: `# Cài đặt thuật toán rút tiền ATM tuân thủ đúng quy tắc: Không có nhánh cụt!
def rut_tien_atm(so_du, so_tien_rut):
    # Nhánh 1: Kiểm tra tính hợp lệ của số tiền
    if so_tien_rut <= 0:
        return "Lỗi: Số tiền rút phải lớn hơn 0"  # Dẫn về điểm kết thúc an toàn
    
    # Nhánh 2: Kiểm tra số dư tài khoản
    if so_tien_rut > so_du:
        return "Lỗi: Số dư không đủ để thực hiện" # Dẫn về điểm kết thúc an toàn
    
    # Nhánh 3: Thực hiện giao dịch thành công
    so_du -= so_tien_rut
    return f"Thành công: Đã rút {so_tien_rut}đ. Số dư mới: {so_du}đ"

print("Test 1:", rut_tien_atm(1000000, -50000))
print("Test 2:", rut_tien_atm(1000000, 2000000))
print("Test 3:", rut_tien_atm(1000000, 400000))`,
          output: `Test 1: Lỗi: Số tiền rút phải lớn hơn 0
Test 2: Lỗi: Số dư không đủ để thực hiện
Test 3: Thành công: Đã rút 400000đ. Số dư mới: 600000đ`,
          annotations: [
            { line: 5, text: 'Mọi nhánh kiểm tra sai đều có điểm thoát return rõ ràng.' },
            { line: 9, text: 'Không để bất kỳ luồng dữ liệu nào bị bỏ lửng.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy "Vẽ flowchart giống như mê cung Spaghetti"',
        content: 'Nếu một sơ đồ có các đường mũi tên chéo nhau chằng chịt như sợi mì ống (Spaghetti code), đó là dấu hiệu tư duy thuật toán của bạn chưa được cấu trúc hóa tốt. Hãy phân rã thành các hàm con hoặc gom các bước lại để sơ đồ chảy thẳng mượt mà.'
      }
    ],
    tips: [
      {
        title: 'Quy tắc ngón tay trỏ kiểm tra đường đi',
        content: 'Sau khi vẽ xong flowchart, hãy đặt ngón tay trỏ vào ô Start và di chuyển lần lượt theo từng mũi tên. Nếu ngón tay của bạn có thể đi đến ô End ở MỌI nhánh rẽ mà không bị mắc kẹt, sơ đồ của bạn đạt chuẩn!'
      }
    ],
    deepDive: null,
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Kiểm tra tính hợp lệ của bản mô tả lưu đồ đăng nhập',
      problem: 'Cho mô tả lưu đồ sau:\\n`1. Bắt đầu`\\n`2. Nhập username, password`\\n`3. Kiểm tra: username và password đúng?`\\n`   - Nhánh Đúng: In "Chào mừng", tới Kết thúc`\\n`   - Nhánh Sai: (bỏ trống không làm gì cả)`\\nHỏi: Bản thiết kế trên vi phạm quy tắc vàng nào? Nêu cách khắc phục.',
      hint: 'Nhánh Sai đang bị bỏ lửng (nhánh cụt).',
      solutionCode: `phan_tich = """
VI PHẠM QUY TẮC 2: Mọi nhánh đều phải dẫn tới điểm Kết thúc (Không được có nhánh cụt).
HỆ QUẢ: Nếu người dùng nhập sai mật khẩu, chương trình rơi vào trạng thái vô định, không thông báo cho người dùng và không biết đi về đâu.

CÁCH KHẮC PHỤC:
Từ nhánh Sai, nối mũi tên tới một khối Hình bình hành 'In thông báo: Mật khẩu không chính xác', sau đó kéo đường nối dẫn về điểm Kết thúc (hoặc quay lại bước 2 cho nhập lại).
"""
print(phan_tich.strip())`,
      solutionOutput: `VI PHẠM QUY TẮC 2: Mọi nhánh đều phải dẫn tới điểm Kết thúc (Không được có nhánh cụt).
HỆ QUẢ: Nếu người dùng nhập sai mật khẩu, chương trình rơi vào trạng thái vô định, không thông báo cho người dùng và không biết đi về đâu.

CÁCH KHẮC PHỤC:
Từ nhánh Sai, nối mũi tên tới một khối Hình bình hành 'In thông báo: Mật khẩu không chính xác', sau đó kéo đường nối dẫn về điểm Kết thúc (hoặc quay lại bước 2 cho nhập lại).`,
      explanation: 'Một thuật toán chuyên nghiệp không bao giờ bỏ rơi các kịch bản thất bại.',
      annotations: [
        { line: 2, text: 'Phân tích lỗi nhánh cụt.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Chuẩn hóa điều kiện mơ hồ thành điều kiện kiểm tra được',
      problem: 'Một đề bài nghiệp vụ ghi: *"Nếu khách hàng là khách VIP và có điểm thưởng cao thì giảm giá 15%"*. Hãy chuẩn hóa điều kiện này thành biểu thức logic chính xác, kiểm tra được bằng Python để đưa vào khối hình thoi Decision.',
      hint: 'Cần định nghĩa cụ thể: VIP nghĩa là gì? (vi_tri == "VIP"), điểm thưởng cao nghĩa là bao nhiêu? (diem >= 1000).',
      solutionCode: `def tinh_giam_gia(khach_hang):
    # Điều kiện chuẩn hóa rõ ràng, kiểm tra được 100%:
    la_vip = khach_hang.get("hang", "") == "VIP"
    diem_cao = khach_hang.get("diem_thuong", 0) >= 1000
    
    if la_vip and diem_cao:
        return 0.15
    return 0.0

khach_1 = {"ten": "An", "hang": "VIP", "diem_thuong": 1200}
khach_2 = {"ten": "Bình", "hang": "VIP", "diem_thuong": 800}

print("Mức giảm giá của An:  ", tinh_giam_gia(khach_1) * 100, "%")
print("Mức giảm giá của Bình:", tinh_giam_gia(khach_2) * 100, "%")`,
      solutionOutput: `Mức giảm giá của An:   15.0 %
Mức giảm giá của Bình: 0.0 %`,
      explanation: 'Chuyển hóa từ câu từ văn nói mơ hồ thành biểu thức logic toán học chính xác là kỹ năng cốt lõi của kỹ sư phần mềm.',
      annotations: [
        { line: 3, text: 'la_vip và diem_cao có giá trị True/False xác định.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Khái niệm "Nhánh cụt" (Dead End) trong Flowchart ám chỉ điều gì?',
      options: [
        'Một mũi tên quay ngược về điểm Bắt đầu.',
        'Một đường nhánh rẽ logic kết thúc lơ lửng giữa chừng mà không bao giờ dẫn về khối Kết thúc (End) hoặc nối vào một khối xử lý khác.',
        'Một khối lệnh có quá nhiều chữ bên trong.',
        'Một phép chia cho số âm.'
      ],
      correctIndex: 1,
      explanation: 'Nhánh cụt là lỗi nghiêm trọng làm đứt đoạn luồng điều khiển, dẫn tới việc bỏ sót logic nghiệp vụ khi chuyển thành mã nguồn.'
    },
    {
      question: 'Tại sao các lối ra của khối Quyết định (Hình thoi) BẮT BUỘC phải có nhãn chữ ghi rõ (như Đúng / Sai, Có / Không)?',
      options: [
        'Để cho sơ đồ có thêm nhiều màu sắc sinh động.',
        'Để người đọc biết chính xác nhánh nào sẽ được thực thi khi điều kiện kiểm tra thỏa mãn và nhánh nào chạy khi điều kiện không thỏa mãn.',
        'Vì tiêu chuẩn ISO 5807 cấm vẽ mũi tên không có chữ.',
        'Để máy tính tự động dịch thành câu lệnh print.'
      ],
      correctIndex: 1,
      explanation: 'Nếu không có nhãn, người đọc và lập trình viên không thể suy luận được hướng đi nào là True và hướng đi nào là False.'
    },
    {
      question: 'Nguyên tắc "Đồng nhất một mức độ trừu tượng" (Single Level of Abstraction) trong Flowchart khuyên chúng ta điều gì?',
      options: [
        'Chỉ được dùng duy nhất 1 loại hình khối trong toàn bộ sơ đồ.',
        'Trong một sơ đồ tổng quát, các khối phải mô tả các bước nghiệp vụ lớn tương đương nhau; không trộn lẫn các bước vĩ mô với các chi tiết tính toán vi mô như i = i + 1.',
        'Toàn bộ sơ đồ phải vẽ bằng màu đen trắng.',
        'Chỉ được vẽ tối đa 5 khối.'
      ],
      correctIndex: 1,
      explanation: 'Giữ cùng một mức độ trừu tượng giúp người xem nắm bắt mạch suy nghĩ dễ dàng mà không bị ngập trong các chi tiết vụn vặt.'
    }
  ],

  summary: [
    'Mọi Flowchart chuẩn mực đều phải tuân thủ 7 quy tắc: 1 Start, mọi nhánh về End, nhãn lối ra đầy đủ, điều kiện kiểm tra được, hướng chảy thống nhất, hạn chế cắt nhau, và đồng nhất mức trừu tượng.',
    'Tuyệt đối không để xảy ra nhánh cụt (Dead End); mọi kịch bản lỗi đều phải có lối thoát an toàn.',
    'Điều kiện trong hình thoi phải là biểu thức logic xác định (True/False), không viết mơ hồ cảm tính.',
    'Dùng ngón tay trỏ lần theo mọi đường đi để tự kiểm định tính khép kín của lưu đồ.'
  ]
};
