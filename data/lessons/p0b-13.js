export default {
  id: 'p0b-13',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B2.6',
  title: 'Từ Flowchart đến Kiểm thử: Bao phủ nhánh và Thiết kế Test Case',
  subtitle: 'Kỹ thuật kiểm thử hộp trắng (White-box): Đạt 100% Branch Coverage, tìm đường đi độc lập và bẫy giá trị biên',
  level: 'Trung cấp',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Biết cách chuyển hóa trực tiếp từ các nhánh trên Flowchart thành một bộ kịch bản kiểm thử (Test Suite) toàn diện.',
    'Hiểu rõ sự khác biệt giữa Bao phủ câu lệnh (Statement Coverage) và Bao phủ nhánh (Branch Coverage).',
    'Thành thạo kỹ thuật phân tích giá trị biên (Boundary Value Analysis) cho các bài toán thuật toán.',
    'Viết các bài kiểm thử tự động (Unit Test) bằng câu lệnh `assert` chuẩn mực trong Python.'
  ],

  intuition: {
    title: 'Người thợ sửa ống nước kiểm tra từng ngóc ngách đường ống',
    metaphor: 'Một người thợ sửa ống nước không bao giờ chỉ xả nước qua một vòi duy nhất rồi vội vàng ký giấy nghiệm thu công trình. Bác thợ sẽ mở van nóng, mở van lạnh, khóa van tổng, thậm chí thử áp lực khi đường ống bị tắc rác. Trên Flowchart, mỗi hình thoi quyết định chính là một chiếc van rẽ nhánh đường ống. Kiểm thử dựa trên Flowchart (Branch Coverage) chính là hành động bơm các dữ liệu đầu vào khác nhau để đảm bảo nước (dòng điều khiển) đã chảy qua và thử sức chịu đựng của mọi ngã rẽ trên sơ đồ mà không bỏ sót bất kỳ một nhánh nào!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">MÔ HÌNH BAO PHỦ NHÁNH (BRANCH COVERAGE)</div>
        <div style="display:flex;align-items:center;justify-content:space-around;flex-wrap:wrap;gap:10px;">
          <div style="padding:8px 14px;border:2px solid var(--accent-primary);border-radius:6px;background:var(--bg-surface);">
            <strong>Test 1: Input x = 15</strong><br/>
            <span style="font-size:0.75rem;color:var(--accent-primary);">Đi qua nhánh ĐÚNG (True)</span>
          </div>
          <div style="font-size:1.2rem;font-weight:bold;color:var(--text-muted);">+</div>
          <div style="padding:8px 14px;border:2px solid var(--py-gold);border-radius:6px;background:var(--bg-surface);">
            <strong>Test 2: Input x = -5</strong><br/>
            <span style="font-size:0.75rem;color:var(--py-gold);">Đi qua nhánh SAI (False)</span>
          </div>
          <div style="font-size:1.2rem;font-weight:bold;color:var(--text-muted);">=</div>
          <div style="padding:8px 14px;border:2px solid #10b981;border-radius:6px;background:var(--bg-surface);">
            <strong style="color:#10b981;">100% Coverage</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Không nhánh nào bị bỏ sót</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Bao phủ câu lệnh (Statement) vs Bao phủ nhánh (Branch Coverage)',
      badge: 'Lý thuyết Kiểm thử',
      content: `
        <p>Đây là sai lầm phổ biến nhất của các lập trình viên mới vào nghề: nghĩ rằng code chạy qua tất cả các dòng là đã kiểm thử xong!</p>
        <ul>
          <li><strong>Statement Coverage:</strong> Kiểm tra xem mỗi dòng lệnh đã được thực thi ít nhất một lần hay chưa.</li>
          <li><strong>Branch Coverage (Nghiêm ngặt hơn nhiều):</strong> Kiểm tra xem <em>tất cả các cạnh rẽ nhánh</em> (cả ngã True lẫn ngã False) của mỗi hình thoi quyết định đã được đi qua hay chưa.</li>
        </ul>
        <pre><code class="language-python"># VÍ DỤ NGUY HIỂM:
def calculate_bonus(salary, is_manager):
    bonus = 0
    if is_manager:
        bonus = salary * 0.2
    return bonus

# Test Case 1: calculate_bonus(1000, True) -> Trả về 200.
# Test 1 này ĐẠT 100% Statement Coverage (chạy qua cả 4 dòng code!).
# Nhưng Branch Coverage MỚI ĐẠT 50% (chưa hề test nhánh if False)!</code></pre>
      `
    },
    {
      id: 'sec-2',
      title: 'Thiết kế ma trận Test Cases từ Flowchart',
      badge: 'Phương pháp luận',
      content: `
        <p>Hãy xem xét sơ đồ phân loại học lực: <code>Điểm &gt;= 8.0 ➔ Giỏi; Điểm &gt;= 5.0 ➔ Đạt; Ngược lại ➔ Trượt</code>.</p>
        <p>Để đạt 100% Branch Coverage, ta lập ma trận kiểm thử bao gồm tất cả các con đường có thể xảy ra:</p>
        <div class="table-responsive">
          <table class="lesson-table">
          <thead>
            <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);">
              <th style="padding:6px;border:1px solid var(--border-subtle);">Mã Test</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Mục tiêu nhánh</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Input (score)</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Output kỳ vọng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">TC01</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Nhánh score &gt;= 8.0 (Đúng)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">8.5</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">"Giỏi"</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">TC02</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Nhánh score &gt;= 5.0 (Đúng)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">6.5</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">"Đạt"</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">TC03</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Nhánh score &gt;= 5.0 (Sai)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">3.0</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">"Trượt"</td>
            </tr>
          </tbody>
        </table>
        </div>
      `
    },
    {
      id: 'sec-3',
      title: 'Phân tích Giá trị biên (Boundary Value Analysis - BVA)',
      badge: 'Cạm bẫy biên',
      content: `
        <p>Lỗi lập trình hầu như <strong>luôn ẩn nấp tại các đường biên</strong> (Boundary Points) giữa hai vùng quyết định, đặc biệt là khi dùng nhầm giữa <code>&gt;</code> và <code>&gt;=</code>.</p>
        <p>Quy tắc kiểm tra biên cho điều kiện <code>score &gt;= 8.0</code>:</p>
        <ul>
          <li><strong>Ngay tại biên (On the boundary):</strong> <code>score = 8.0</code> (Phải ra "Giỏi").</li>
          <li><strong>Ngay dưới biên (Just below boundary):</strong> <code>score = 7.99</code> (Phải ra "Đạt", không được lọt vào "Giỏi").</li>
          <li><strong>Ngay trên biên (Just above boundary):</strong> <code>score = 8.01</code> (Phải ra "Giỏi").</li>
          <li><strong>Biên cực hạn của miền giá trị:</strong> <code>score = 0.0</code> và <code>score = 10.0</code>.</li>
          <li><strong>Đầu vào ngoài miền (Invalid boundary):</strong> <code>score = -1</code> và <code>score = 11</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Hiện thực hóa Unit Test với câu lệnh assert',
          code: `def classify_score(score):
    if not (0.0 <= score <= 10.0):
        raise ValueError("Điểm phải nằm trong đoạn [0, 10]")
    if score >= 8.0:
        return "Giỏi"
    if score >= 5.0:
        return "Đạt"
    return "Trượt"

# BỘ KIỂM THỬ ĐẠT 100% BRANCH COVERAGE VÀ BAO PHỦ BIÊN:
# 1. Test giá trị thông thường
assert classify_score(9.0) == "Giỏi"
assert classify_score(6.0) == "Đạt"
assert classify_score(3.0) == "Trượt"

# 2. Test các giá trị ngay tại biên (Boundary cases)
assert classify_score(8.0) == "Giỏi"   # Ngay biên 8.0
assert classify_score(7.99) == "Đạt"   # Dưới biên 8.0 một chút
assert classify_score(5.0) == "Đạt"    # Ngay biên 5.0
assert classify_score(4.99) == "Trượt" # Dưới biên 5.0 một chút
assert classify_score(0.0) == "Trượt"  # Biên cực tiểu
assert classify_score(10.0) == "Giỏi"  # Biên cực đại

print("Toàn bộ 8 bài test đều PASS hoàn hảo!")`
        }
      ]
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Danh sách kiểm tra biên (Edge Cases Checklist) cần nhớ',
      content: 'Bất cứ khi nào viết một thuật toán, hãy tự hỏi bộ test của bạn đã thử 5 trường hợp này chưa: 1) Danh sách rỗng (`[]`), 2) Danh sách chỉ có đúng 1 phần tử (`[x]`), 3) Số 0, 4) Số âm, 5) Tất cả phần tử đều bằng nhau.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Thiết kế bộ test cho hàm tính cước taxi',
      description: 'Quy tắc cước taxi: Dưới 1km đầu tiên giá 10,000đ. Từ km thứ 2 đến km thứ 10 giá 12,000đ/km. Từ km thứ 11 trở đi giá 10,000đ/km. Nếu km <= 0 ném lỗi ValueError. Hãy viết bộ test `assert` bao phủ các điểm biên.',
      initialCode: `def taxi_fare(km):
    if km <= 0:
        raise ValueError("Quãng đường phải > 0")
    if km <= 1:
        return 10000
    if km <= 10:
        return 10000 + (km - 1) * 12000
    return 10000 + 9 * 12000 + (km - 10) * 10000

# Viết các câu lệnh assert kiểm thử tại đây:
`,
      solution: `def taxi_fare(km):
    if km <= 0:
        raise ValueError("Quãng đường phải > 0")
    if km <= 1:
        return 10000
    if km <= 10:
        return 10000 + (km - 1) * 12000
    return 10000 + 9 * 12000 + (km - 10) * 10000

# Test biên km = 1
assert taxi_fare(1) == 10000

# Test trong khoảng km = 5
assert taxi_fare(5) == 10000 + 4 * 12000  # 58000

# Test biên km = 10
assert taxi_fare(10) == 10000 + 9 * 12000 # 118000

# Test vượt mốc km = 11
assert taxi_fare(11) == 118000 + 10000    # 128000

print("Toàn bộ test case taxi thành công!")`
    }
  ],

  quiz: [
    {
      question: 'Nếu một đoạn code có 3 câu lệnh if độc lập (không lồng nhau, mỗi if có nhánh True và False riêng), thì có tối đa bao nhiêu đường đi độc lập (independent paths)?',
      options: [
        '3 đường đi',
        '6 đường đi',
        '8 đường đi (2 * 2 * 2)',
        '4 đường đi'
      ],
      correctIndex: 2,
      explanation: 'Vì 3 điều kiện if độc lập với nhau, mỗi điều kiện có 2 khả năng (True hoặc False), nên tổng số tổ hợp đường đi luồng thực thi có thể trải qua là 2^3 = 8 đường đi.'
    }
  ],

  summary: 'Flowchart cung cấp cái nhìn trực quan về mọi con đường mà luồng chương trình có thể đi qua. Kiểm thử dựa trên sơ đồ bảo đảm 100% Branch Coverage và kiểm tra triệt để các ca biên (rỗng, đơn lẻ, số âm, số 0) trước khi phần mềm được bàn giao.'
};
