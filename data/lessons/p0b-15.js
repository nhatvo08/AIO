export default {
  id: 'p0b-15',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B2.8',
  title: '"Từ điển" Lỗi thường gặp trong Flowchart và Logic (Flowchart Debugging)',
  subtitle: 'Bách khoa toàn thư về các lỗi kinh điển: Vòng lặp vô tận, Off-by-one, Nhánh cụt, Mã chết và Phương pháp truy vết sửa lỗi',
  level: 'Trung cấp',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nhận diện tức thì 7 lỗi cấu trúc và lỗi logic chí mạng thường xuất hiện trên Flowchart và trong code.',
    'Hiểu sâu bản chất căn nguyên của lỗi Lệch một (Off-by-One Error) trong các biểu thức điều kiện vòng lặp.',
    'Thành thạo quy trình bắt bệnh Flowchart Debugging: Dò vết ngược từ điểm chết (Dead-end) về ngọn nguồn.',
    'Tự tin sửa chữa và tối ưu hóa các sơ đồ thuật toán có khiếm khuyết mà không làm hỏng nghiệp vụ.'
  ],

  intuition: {
    title: 'Phòng cấp cứu thuật toán và Bản đồ chỉ dẫn lỗi',
    metaphor: 'Trong y khoa, một bác sĩ giỏi phải hiểu rõ triệu chứng của từng căn bệnh: sốt xuất huyết khác cảm cúm thông thường ở đâu, viêm ruột thừa đau ở vị trí nào. Trong công nghệ phần mềm, một kỹ sư cao cấp cũng phải sở hữu một "cuốn từ điển bệnh học thuật toán" tương tự. Khi chương trình bị treo cứng, bạn biết ngay đó là triệu chứng của "Vòng lặp vô tận". Khi mảng bị thiếu mất phần tử cuối cùng hoặc tràn chỉ số, bạn chẩn đoán ngay "Bệnh lệch một (Off-by-one)". Bài học này là cẩm nang phòng ngừa và chữa trị toàn diện các căn bệnh logic đó.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">7 BỆNH LÝ LOGIC KINH ĐIỂN CẦN PHÒNG NGỪA</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:8px;">
          <div style="padding:6px;border:1px solid var(--danger-text);border-radius:4px;background:var(--bg-surface);"><span style="color:var(--danger-text);font-weight:bold;">1.</span> Vòng lặp vô tận (Infinite Loop)</div>
          <div style="padding:6px;border:1px solid var(--danger-text);border-radius:4px;background:var(--bg-surface);"><span style="color:var(--danger-text);font-weight:bold;">2.</span> Lệch một (Off-by-one Error)</div>
          <div style="padding:6px;border:1px solid var(--danger-text);border-radius:4px;background:var(--bg-surface);"><span style="color:var(--danger-text);font-weight:bold;">3.</span> Biến chưa khởi tạo (Uninitialized)</div>
          <div style="padding:6px;border:1px solid var(--danger-text);border-radius:4px;background:var(--bg-surface);"><span style="color:var(--danger-text);font-weight:bold;">4.</span> Cập nhật sai vị trí</div>
          <div style="padding:6px;border:1px solid var(--danger-text);border-radius:4px;background:var(--bg-surface);"><span style="color:var(--danger-text);font-weight:bold;">5.</span> Nhánh cụt (Dead End)</div>
          <div style="padding:6px;border:1px solid var(--danger-text);border-radius:4px;background:var(--bg-surface);"><span style="color:var(--danger-text);font-weight:bold;">6.</span> Mã chết (Unreachable Code)</div>
          <div style="padding:6px;border:1px solid var(--danger-text);border-radius:4px;background:var(--bg-surface);"><span style="color:var(--danger-text);font-weight:bold;">7.</span> Điều kiện luôn đúng/sai</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Bệnh lý 1: Vòng lặp vô tận (Infinite Loop)',
      badge: 'Treo hệ thống',
      content: `
        <p><strong>Triệu chứng:</strong> Chương trình tiêu tốn 100% CPU, đơ giao diện, không bao giờ kết thúc.</p>
        <p><strong>Căn nguyên trên Flowchart:</strong> Mũi tên quay ngược lại đỉnh lặp (Back-edge), nhưng bên trong chu trình đó <em>không có bất kỳ khối lệnh nào làm thay đổi biến tham gia vào điều kiện dừng</em>!</p>
        <div class="callout-box callout-danger">
          <strong>Ví dụ sai kinh điển:</strong>
          <pre><code class="language-python"># QUÊN CẬP NHẬT BIẾN ĐẾM:
i = 1
while i <= 10:
    print(i)
    # Lỗi: Quên mất dòng i += 1! Giá trị i mãi mãi là 1 <= 10 -> LẶP VÔ HẠN</code></pre>
        </div>
      `
    },
    {
      id: 'sec-2',
      title: 'Bệnh lý 2: Lỗi lệch một (Off-by-One Error - OBOE)',
      badge: 'Sai lệch số lượng',
      content: `
        <p>Đây là một trong những lỗi huyền thoại nhất của ngành công nghệ thông tin. Bạn muốn lặp 10 lần nhưng code lại lặp 9 lần hoặc 11 lần.</p>
        <h4>Nguồn gốc gây lỗi:</h4>
        <ul>
          <li>Nhầm lẫn giữa dấu <code>&lt;</code> (nhỏ hơn) và <code>&lt;=</code> (nhỏ hơn hoặc bằng).</li>
          <li>Quên rằng chỉ số mảng trong Python đánh số từ <code>0</code> đến <code>len - 1</code>, chứ không phải từ 1.</li>
          <li>Quên rằng hàm <code>range(start, stop)</code> trong Python <strong>loại trừ cận trên <code>stop</code></strong> (chỉ chạy đến <code>stop - 1</code>).</li>
        </ul>
        <pre><code class="language-python"># Mục đích: Tính tổng từ 1 đến 5 (1 + 2 + 3 + 4 + 5 = 15)
# CODE LỖI OBOE:
total = 0
for i in range(1, 5): # Chết tại đây! range(1, 5) chỉ sinh ra 1, 2, 3, 4!
    total += i
print(total)  # In ra 10! Thiếu mất số 5!

# SỬA ĐÚNG:
for i in range(1, 6): total += i  # In ra 15 chuẩn xác</code></pre>
      `
    },
    {
      id: 'sec-3',
      title: 'Bệnh lý 5 & 6: Nhánh cụt (Dead-end) và Mã chết (Unreachable Code)',
      badge: 'Lỗi cấu trúc',
      content: `
        <p>Theo chuẩn vẽ Flowchart:</p>
        <ul>
          <li><strong>Nhánh cụt (Dead-end):</strong> Một mũi tên rẽ nhánh đi vào một khối xử lý rồi đứng khựng lại ở đó, không có đường dẫn nối về ký hiệu Kết thúc (End) hoặc nhập vào luồng chính. Trong code, điều này tương đương với luồng bị treo lơ lửng không trả về kết quả.</li>
          <li><strong>Mã chết (Unreachable Code):</strong> Một khối nằm trơ trọi trên sơ đồ mà không có bất kỳ mũi tên nào trỏ tới, hoặc nằm ngay sau một lệnh <code>return</code> / <code>sys.exit()</code> vô điều kiện. Trình thông dịch sẽ không bao giờ thực thi những dòng này.</li>
        </ul>
        <div style="margin:20px 0;display:flex;justify-content:center;">
          <svg viewBox="0 0 460 220" style="max-width:100%;height:auto;font-family:var(--font-mono);font-size:11px;" role="img" aria-label="Lỗi Unreachable Code">
            <rect x="150" y="20" width="160" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="230" y="45" fill="var(--text-primary)" text-anchor="middle">return result</text>
            
            <line x1="230" y1="60" x2="230" y2="100" stroke="var(--danger-text)" stroke-dasharray="4,4" stroke-width="2"/>
            <text x="240" y="85" fill="var(--danger-text)" font-weight="bold">Không bao giờ chạy tới!</text>

            <rect x="150" y="105" width="160" height="40" rx="4" fill="var(--bg-surface-alt)" stroke="var(--danger-text)" stroke-width="2"/>
            <text x="230" y="130" fill="var(--text-muted)" text-anchor="middle">print("Đã hoàn tất")</text>
          </svg>
        </div>
      `
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Quy trình Flowchart Debugging 3 bước',
      content: '1. **Đối chiếu biên:** Kiểm tra giá trị khởi tạo và điều kiện dừng đã đúng với cận biên chưa (đặc biệt là 0 và len).\n2. **Kiểm tra độ biến thiên:** Trong mỗi vòng lặp, biến kiểm soát có đang tịnh tiến dần về điều kiện dừng sau mỗi vòng hay không?\n3. **Theo dõi tất cả lối ra:** Mọi hình thoi quyết định đều phải có đầy đủ nhãn và dẫn về đích an toàn.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Tìm và sửa lỗi hàm tính giai thừa',
      description: 'Hàm tính giai thừa sau đây mắc phải 2 lỗi logic nghiêm trọng. Hãy chỉ ra lỗi và viết lại hàm chuẩn xác.',
      initialCode: `def faulty_factorial(n):
    # Lỗi ẩn nấp trong khởi tạo và phạm vi lặp
    result = 0
    for i in range(1, n):
        result = result * i
    return result
`,
      solution: `def fixed_factorial(n):
    # Lỗi 1: result ban đầu gán = 0 -> nhân vào luôn bằng 0! Phải gán result = 1.
    # Lỗi 2: range(1, n) bị thiếu n (Off-by-one). Phải là range(1, n + 1).
    if n < 0:
        raise ValueError("Không có giai thừa cho số âm")
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print("5! =", fixed_factorial(5))  # 120 chuẩn xác`
    }
  ],

  quiz: [
    {
      question: 'Dấu hiệu rõ nhất của một vòng lặp vô tận (Infinite Loop) khi quan sát trên Flowchart là gì?',
      options: [
        'Sơ đồ có sử dụng hình chữ nhật hai vạch đôi.',
        'Mũi tên quay ngược lại đỉnh lặp (loop back) nhưng bên trong thân vòng lặp không có bất kỳ khối lệnh nào làm biến đổi giá trị của biểu thức điều kiện.',
        'Sơ đồ có nhiều hơn 3 điểm kết thúc.',
        'Sơ đồ dùng biến boolean làm cờ hiệu.'
      ],
      correctIndex: 1,
      explanation: 'Nếu thân vòng lặp không làm thay đổi các biến nằm trong điều kiện dừng của hình thoi, điều kiện đó sẽ mãi mãi giữ nguyên trạng thái True, khiến luồng quay tròn vĩnh viễn không lối thoát.'
    }
  ],

  summary: 'Hiểu rõ các căn bệnh kinh điển (Vòng lặp vô tận, Off-by-one, Biến chưa khởi tạo, Nhánh cụt, Mã chết) giúp người kỹ sư trang bị trực giác chẩn đoán sắc bén, loại bỏ lỗi logic ngay từ khâu thiết kế sơ đồ trước khi gõ dòng code đầu tiên.'
};
