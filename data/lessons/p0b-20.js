export default {
  id: 'p0b-20',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B3.5',
  title: 'Đo lường độ phức tạp chu trình (Cyclomatic Complexity — Chỉ số McCabe)',
  subtitle: 'Thước đo định lượng chất lượng phần mềm: Công thức M = E - N + 2P, M = D + 1, thang đo rủi ro và số lượng Test Case tối thiểu',
  level: 'Chuyên sâu',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu ý nghĩa nền tảng của Chỉ số Cyclomatic Complexity do Thomas J. McCabe đề xuất năm 1976.',
    'Thành thạo hai công thức tính toán McCabe: Từ đồ thị luồng (M = E - N + 2P) và từ số điểm quyết định (M = D + 1).',
    'Nắm vững mối liên hệ mật thiết giữa chỉ số McCabe và Số lượng bài kiểm thử (Test Cases) tối thiểu cần viết.',
    'Áp dụng thang đo rủi ro công nghiệp để đánh giá khi nào một hàm cần phải được chia nhỏ lập tức.'
  ],

  intuition: {
    title: 'Độ phức tạp của mê cung và Số ngọn đuốc cần mang theo',
    metaphor: 'Hãy tưởng tượng hàm của bạn là một mê cung hang động. Nếu hang động là một hành lang thẳng tuột (M = 1), bạn chỉ cần bước vào và đi thẳng là tới lối ra. Nhưng nếu trong hang có 3 ngã ba rẽ đôi (D = 3), thì bạn sẽ có 3 + 1 = 4 con đường độc lập hoàn toàn khác nhau để đi qua mê cung. Chỉ số McCabe (Cyclomatic Complexity) chính là số lượng nhánh rẽ độc lập của mê cung đó. Nó cho bạn biết chính xác: Bạn cần chuẩn bị tối thiểu bao nhiêu ngọn đuốc (Test Cases) để khám phá hết mọi ngóc ngách của hang động mà không bỏ sót bất kỳ một ngõ cụt nguy hiểm nào!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">CÔNG THỨC MCCABE VÀ THANG ĐO NGUY CƠ</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:20px;flex-wrap:wrap;">
          <div style="padding:10px 18px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <strong style="color:var(--accent-primary);font-size:1.1rem;">M = D + 1</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">D: Số điểm quyết định (if, while, and, or)</span>
          </div>
          <div style="padding:10px 18px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <strong style="color:var(--py-gold);font-size:1.1rem;">M = E - N + 2P</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">E: Cạnh, N: Đỉnh, P: Đồ thị con</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Chỉ số McCabe là gì và Hai công thức tính toán',
      badge: 'Lý thuyết đo lường',
      content: `
        <details class="deep-dive-details" open style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:16px;">
          <summary style="cursor:pointer;font-weight:bold;color:var(--accent-primary);">Thu gọn / Mở rộng kiến thức Chuyên sâu Tầng 3</summary>
          <div style="margin-top:12px;">
            <p>Năm 1976, Thomas J. McCabe đã phát minh ra độ đo <strong>Cyclomatic Complexity (M)</strong> dựa trên lý thuyết đồ thị topo để đo lường độ phức tạp cấu trúc của một đoạn mã.</p>
            <h4>Cách 1: Tính trên Đồ thị luồng điều khiển (CFG)</h4>
            <p>$$\\mathbf{M = E - N + 2P}$$</p>
            <ul>
              <li>$E$: Tổng số cạnh (Edges / Mũi tên) trong đồ thị.</li>
              <li>$N$: Tổng số nút (Nodes / Khối cơ bản).</li>
              <li>$P$: Số thành phần liên thông (với một hàm thông thường, $P = 1$).</li>
            </ul>
            <h4>Cách 2: Tính nhanh từ số Điểm quyết định (Decision Points)</h4>
            <p>$$\\mathbf{M = D + 1}$$</p>
            <p>Trong đó $D$ là số lượng các phép rẽ nhánh điều kiện: mỗi từ khóa <code>if</code>, <code>elif</code>, <code>for</code>, <code>while</code>, cũng như mỗi toán tử logic boolean <code>and</code>, <code>or</code> đều đóng góp $+1$ vào $D$.</p>
          </div>
        </details>
      `
    },
    {
      id: 'sec-2',
      title: 'Thang đo chuẩn công nghiệp và Ngưỡng cảnh báo',
      badge: 'Tiêu chuẩn kỹ thuật',
      content: `
        <p>Các công cụ kiểm định chất lượng phần mềm quốc tế (như SonarQube, CodeClimate) sử dụng thang phân loại McCabe sau:</p>
        <div class="table-responsive">
          <table class="lesson-table">
          <thead>
            <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);">
              <th style="padding:6px;border:1px solid var(--border-subtle);">Chỉ số M</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Mức độ phức tạp</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Mức độ rủi ro</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Hành động khuyến nghị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;font-weight:bold;color:#10b981;">1 – 10</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Đơn giản, trong sáng</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);color:#10b981;">Thấp</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Tuyệt vời, dễ viết Unit Test</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;font-weight:bold;color:var(--py-gold);">11 – 20</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Phức tạp trung bình</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);color:var(--py-gold);">Vừa phải</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Cần cân nhắc tách bớt hàm con</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;font-weight:bold;color:var(--danger-text);">21 – 50</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Rất phức tạp</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);color:var(--danger-text);">Cao</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Bắt buộc tái cấu trúc (Refactor)</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;font-weight:bold;color:#ef4444;background:rgba(239,68,68,0.1);">&gt; 50</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Hỗn loạn (Untestable)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);color:#ef4444;font-weight:bold;">Cực kỳ nguy hiểm</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Không thể kiểm thử toàn diện, dễ sập hệ thống</td>
            </tr>
          </tbody>
        </table>
        </div>
      `
    },
    {
      id: 'sec-3',
      title: 'Ý nghĩa sống còn: Số Test Case tối thiểu cần viết',
      badge: 'Chỉ dẫn kiểm thử',
      content: `
        <p>Đóng góp vĩ đại nhất của McCabe là định lý: <strong>Chỉ số $M$ chính là số lượng đường đi độc lập tuyến tính (Basis Paths) tối thiểu cần phải kiểm thử để đạt 100% Branch Coverage!</strong></p>
        <p>Nếu hàm của bạn có $M = 5$, thì về mặt toán học, bạn <em>không thể nào</em> kiểm thử toàn diện hàm đó chỉ với 3 hay 4 test cases. Bạn bắt buộc phải viết ít nhất 5 test cases ứng với 5 đường đi độc lập!</p>
      `,
      codeExamples: [
        {
          title: 'Tính toán chỉ số McCabe thực tế',
          code: `def evaluate_loan(income, age, has_debt):
    # D = 0 (khởi tạo)
    if age < 18:                   # D += 1 (Quyết định 1)
        return "Từ chối: Chưa đủ tuổi"
    
    if income > 20_000_000:        # D += 1 (Quyết định 2)
        if not has_debt:           # D += 1 (Quyết định 3)
            return "Duyệt VIP"
        else:
            return "Duyệt tiêu chuẩn"
    else:
        return "Từ chối: Thu nhập thấp"

# TỔNG KẾT:
# Số điểm quyết định D = 3
# Cyclomatic Complexity M = D + 1 = 3 + 1 = 4.
# Kết luận: Cần tối thiểu ĐÚNG 4 TEST CASES để bao phủ 100% các nhánh!`
        }
      ]
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Mẹo giữ chỉ số McCabe luôn dưới 10',
      content: 'Bất cứ khi nào bạn thấy mình chuẩn bị gõ thêm một câu lệnh `if` thứ 10 trong một hàm, hãy dừng lại ngay lập tức và áp dụng bài học B2.4 (Modularization): Cắt khối logic đó ra thành một hàm con riêng biệt!'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Tính Cyclomatic Complexity của hàm',
      description: 'Cho hàm sau, hãy tính số điểm quyết định D và chỉ số Cyclomatic Complexity M:\n```python\ndef check(x, y):\n    if x > 0 and y > 0:\n        return True\n    elif x < 0:\n        return False\n    return None\n```',
      initialCode: `d_points = 0
m_complexity = 0
`,
      solution: `d_points = 3  # Bao gồm: 'x > 0', toán tử 'and', và 'elif x < 0'
m_complexity = d_points + 1  # M = 3 + 1 = 4
print(f"Số điểm quyết định D: {d_points}")
print(f"Cyclomatic Complexity M: {m_complexity}")`
    }
  ],

  quiz: [
    {
      question: 'Nếu một hàm có Cyclomatic Complexity M = 7, điều này có ý nghĩa gì đối với việc viết Unit Test?',
      options: [
        'Hàm chỉ chạy được trên 7 luồng CPU.',
        'Hàm cần tối thiểu 7 bài test case độc lập để bảo đảm bao phủ hết mọi nhánh thực thi.',
        'Hàm bắt buộc phải có 7 tham số đầu vào.',
        'Hàm có độ dài tối đa 7 dòng code.'
      ],
      correctIndex: 1,
      explanation: 'Theo định lý của McCabe, M chính là số lượng đường đi độc lập tuyến tính (basis paths). Vì vậy, bạn cần ít nhất M test case (ở đây là 7) để kiểm thử bao phủ toàn bộ các nhánh.'
    }
  ],

  summary: 'Chỉ số Cyclomatic Complexity McCabe (M = D + 1) là kim chỉ nam định lượng độ phức tạp logic. Giữ M <= 10 giúp mã nguồn luôn tinh giản, hạn chế lỗi tiềm ẩn và xác định chính xác số lượng Unit Test tối thiểu cần thiết.'
};
