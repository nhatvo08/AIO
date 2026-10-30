export default {
  id: 'p0b-14',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B2.7',
  title: 'Dịch ngược: Từ Code Python ra Flowchart và Nhận diện Code Smell',
  subtitle: 'Kỹ năng đọc hiểu mã nguồn di sản (Legacy Code), phát hiện cấu trúc ẩn và nhận diện mã bốc mùi qua hình dạng sơ đồ',
  level: 'Trung cấp',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo phương pháp dịch ngược (Reverse Engineering) từ mã nguồn Python có sẵn ra sơ đồ Flowchart chuẩn mực.',
    'Nhận diện các "mùi mã nguồn" (Code Smells) tai hại biểu hiện qua hình dạng sơ đồ bị méo mó, lộn xộn.',
    'Áp dụng mẫu hình Mệnh đề bảo vệ (Guard Clauses / Early Return) để duỗi thẳng các sơ đồ hình kim tự tháp (Arrow Pattern).',
    'Phát hiện các điểm thoát ẩn (hidden returns, exceptions) trong code của người khác.'
  ],

  intuition: {
    title: 'Bác sĩ chẩn đoán bệnh qua phim chụp X-quang',
    metaphor: 'Một đoạn code được viết lộn xộn có thể đánh lừa người đọc bằng cách đặt tên biến mỹ miều hoặc căn chỉnh thụt lề trông có vẻ bắt mắt. Nhưng khi bạn "dịch ngược" đoạn code đó thành một bức ảnh Flowchart, hình dạng luồng điều khiển sẽ phơi bày toàn bộ "bệnh tật" bên trong giống như phim chụp X-quang của bác sĩ. Nếu sơ đồ có quá nhiều đường kẻ cắt chéo nhau như mạng nhện, hoặc thụt vào sâu hoắm như một mũi tên đâm vào màn hình (Arrow Pattern), bạn biết ngay đoạn code đó đang mắc bệnh và cần được phẫu thuật tái cấu trúc (refactoring)!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">HÌNH DÁNG SƠ ĐỒ TIẾT LỘ CHẤT LƯỢNG MÃ NGUỒN</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;border:2px solid var(--danger-text);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <strong style="color:var(--danger-text);">MÃ BỐC MÙI (CODE SMELL)</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Kim tự tháp if lồng nhau 4-5 tầng, đường chéo cắt nhau, luồng rối loạn</span>
          </div>
          <div style="padding:10px;border:2px solid #10b981;border-radius:8px;background:var(--bg-surface);text-align:center;">
            <strong style="color:#10b981;">MÃ CÓ CẤU TRÚC (CLEAN CODE)</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Luồng thẳng đứng từ trên xuống, bảo vệ ở cửa vào (Guard Clause)</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Quy trình 4 bước dịch ngược từ Code ra Flowchart',
      badge: 'Phương pháp luận',
      content: `
        <p>Để không bị ngợp trước một đoạn code dài, hãy tiến hành giải mã theo 4 bước bài bản sau:</p>
        <ol>
          <li><strong>Bước 1: Xác định Biên (Entry & Exit Points):</strong> Đánh dấu điểm bắt đầu hàm và toàn bộ các vị trí lệnh <code>return</code>, <code>raise</code>, <code>sys.exit()</code>.</li>
          <li><strong>Bước 2: Gom cụm tuần tự (Basic Blocks):</strong> Nhóm các dòng lệnh gán, tính toán, in ấn liên tiếp không có rẽ nhánh thành một hình chữ nhật duy nhất.</li>
          <li><strong>Bước 3: Dựng các chốt quyết định (Decisions):</strong> Chuyển các lệnh <code>if</code>, <code>elif</code>, <code>else</code> thành các hình thoi. Ghi rõ nhãn nhánh Đúng/Sai.</li>
          <li><strong>Bước 4: Nối các đường hồi quy lặp (Back-edges):</strong> Tìm các lệnh <code>while</code>, <code>for</code> và nối mũi tên quay ngược lại đỉnh kiểm tra điều kiện.</li>
        </ol>
      `
    },
    {
      id: 'sec-2',
      title: 'Nhận diện Code Smell 1: Kim tự tháp if lồng nhau (Arrow Anti-pattern)',
      badge: 'Anti-pattern',
      content: `
        <p>Đây là căn bệnh phổ biến nhất: lập trình viên cứ muốn kiểm tra điều kiện là lại thụt lề thêm một cấp <code>if</code>, tạo thành hình tam giác nhọn đâm sang phải màn hình.</p>
        <pre><code class="language-python"># CODE XẤU (HÌNH KIM TỰ THÁP / MŨI TÊN NHỌN):
def process_user_data(user):
    if user is not None:
        if user.is_active:
            if user.has_subscription:
                if user.balance >= 100:
                    user.balance -= 100
                    return "Thanh toán thành công"
                else:
                    return "Không đủ tiền"
            else:
                return "Chưa đăng ký gói"
        else:
            return "Tài khoản bị khóa"
    else:
        return "Người dùng không tồn tại"</code></pre>
        <h4>Giải pháp: Mệnh đề bảo vệ (Guard Clauses)</h4>
        <p>Thay vì lồng sâu, ta đảo ngược điều kiện để kiểm tra các trường hợp không hợp lệ trước và <strong>trả về ngay lập tức (Early Return)</strong>. Trên Flowchart, sơ đồ sẽ duỗi thẳng ra thành một trục chính duy nhất với các nhánh phụ ngắt ngang ngắn gọn!</p>
      `,
      codeExamples: [
        {
          title: 'Code sạch sau khi duỗi thẳng luồng bằng Guard Clauses',
          code: `def process_user_data_clean(user):
    # 1. Guard Clauses (Mệnh đề bảo vệ chặn cửa)
    if user is None:
        return "Người dùng không tồn tại"
    if not user.is_active:
        return "Tài khoản bị khóa"
    if not user.has_subscription:
        return "Chưa đăng ký gói"
    if user.balance < 100:
        return "Không đủ tiền"
    
    # 2. Luồng hạnh phúc chính (Happy Path) chạy thẳng tuột, không thụt lề!
    user.balance -= 100
    return "Thanh toán thành công"`
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Nhận diện Code Smell 2: Hàm ôm đồm (God Function) và Biến cờ lộn xộn',
      badge: 'Cấu trúc mã',
      content: `
        <p>Khi dịch ngược, nếu bạn thấy một Flowchart có kích thước vượt quá một trang giấy A4 (hơn 15-20 khối) hoặc sử dụng 4-5 biến cờ hiệu boolean chéo nhau để điều khiển luồng, thì đó là dấu hiệu chắc chắn của một <strong>God Function</strong> (hàm làm quá nhiều việc, vi phạm nguyên lý Single Responsibility Principle).</p>
        <p>Cách xử lý: Cắt tỉa các nhánh xử lý phụ thành các hàm con độc lập (Subroutines) như đã học ở bài B2.4.</p>
      `
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Quy tắc Bouncer (Người bảo vệ vũ trường)',
      content: 'Hãy tưởng tượng hàm của bạn giống như một câu lạc bộ đêm sang trọng. Thay vì cho tất cả mọi người vào trong sảnh rồi mới xét trang phục, xét vé, xét tuổi (khiến sảnh trở nên hỗn loạn), hãy để người bảo vệ (Guard Clause) đứng ngay trước cửa. Ai không đủ tiêu chuẩn thì chặn lại và đuổi về ngay (Early Return). Sảnh chính bên trong sẽ luôn tinh tươm và an toàn!'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Tái cấu trúc hàm kiểm tra email',
      description: 'Đoạn code sau đang bị lồng if quá nhiều tầng. Hãy dùng kỹ thuật Guard Clauses (kiểm tra phủ định và return False sớm) để làm phẳng hoàn toàn cấu trúc hàm.',
      initialCode: `def is_valid_email(email):
    if email:
        if "@" in email:
            parts = email.split("@")
            if len(parts) == 2:
                if "." in parts[1]:
                    return True
    return False
`,
      solution: `def is_valid_email(email):
    # Dùng Guard Clauses để lọc lỗi sớm:
    if not email:
        return False
    if "@" not in email:
        return False
    
    parts = email.split("@")
    if len(parts) != 2:
        return False
    if "." not in parts[1]:
        return False
        
    return True

print("Test 1:", is_valid_email("user@example.com")) # True
print("Test 2:", is_valid_email("invalid-email"))     # False`
    }
  ],

  quiz: [
    {
      question: 'Kỹ thuật Guard Clause (Mệnh đề bảo vệ / Early Return) mang lại lợi ích cấu trúc lớn nhất là gì?',
      options: [
        'Làm tăng tốc độ CPU lên gấp 10 lần.',
        'Loại bỏ tình trạng thụt lề nhiều cấp (Arrow Pattern), giúp luồng logic chính chạy thẳng và dễ đọc hơn.',
        'Cho phép bỏ qua các khối try/except.',
        'Tự động sinh ra tài liệu API cho hàm.'
      ],
      correctIndex: 1,
      explanation: 'Guard Clauses kiểm tra điều kiện lỗi và return sớm, loại bỏ các khối else lồng nhau, giúp mã nguồn phẳng (flat) thay vì lồng sâu (nested) theo đúng triết lý Zen of Python: Flat is better than nested.'
    }
  ],

  summary: 'Dịch ngược từ mã nguồn ra Flowchart là công cụ x-quang tối thượng giúp phát hiện các cấu trúc rườm rà. Áp dụng Mệnh đề bảo vệ (Guard Clauses) giúp duỗi thẳng sơ đồ kim tự tháp, đưa mã nguồn về chuẩn mực Clean Code.'
};
