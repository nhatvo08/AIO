export default {
  id: 'p0b-23',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B3.8',
  title: 'Giới hạn của Phân tích: Bài toán dừng (Halting Problem của Alan Turing)',
  subtitle: 'Đỉnh cao triết học khoa học máy tính: Vì sao không thể có công cụ tự động phát hiện mọi vòng lặp vô tận và trách nhiệm của kỹ sư',
  level: 'Chuyên sâu',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thấu hiểu bản chất lịch sử và phát biểu của Bài toán dừng (The Halting Problem) do Alan Turing giải năm 1936.',
    'Nắm vững lập luận phản chứng bằng Nghịch lý tự quy chiếu (Self-referential Paradox) qua mã giả Python.',
    'Nhận thức sâu sắc giới hạn vật lý của mọi công cụ kiểm tra mã tĩnh và trình biên dịch.',
    'Hiểu lý do vì sao người kỹ sư vẫn là thành trì cuối cùng chịu trách nhiệm về tính dừng của chương trình.'
  ],

  intuition: {
    title: 'Nghịch lý người thợ cạo thành Seville và Cỗ máy đoán tương lai',
    metaphor: 'Trong một ngôi làng nọ có một người thợ cạo tuyên bố: "Tôi chỉ cạo râu cho những ai trong làng KHÔNG tự cạo râu cho mình". Hỏi người thợ cạo có cạo râu cho chính mình không? Nếu ông tự cạo, ông vi phạm nguyên tắc "chỉ cạo cho người không tự cạo". Nhưng nếu ông không tự cạo, thì theo lời hứa ông lại bắt buộc phải cạo cho chính mình! Năm 1936, thiên tài Alan Turing đã dùng một nghịch lý tương tự để chứng minh rằng: Sẽ không bao giờ tồn tại một phần mềm nào có thể kiểm tra xem mọi chương trình khác có bị treo lặp vô hạn hay không!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">NGHỊCH LÝ BÀI TOÁN DỪNG (HALTING PROBLEM)</div>
        <div style="padding:12px;border:2px dashed var(--danger-text);border-radius:8px;background:var(--bg-surface);text-align:center;">
          <div style="font-weight:bold;color:var(--danger-text);">CỖ MÁY TROUBLEMAKER CỦA TURING</div>
          <div style="font-size:0.8rem;color:var(--text-secondary);margin:8px 0;">
            Nếu máy đoán: <em>"Chương trình sẽ DỪNG"</em> ➔ Cố tình chạy vòng lặp vô tận!<br/>
            Nếu máy đoán: <em>"Chương trình sẽ LẶP"</em> ➔ Cố tình thoát lệnh ngay lập tức!
          </div>
          <div style="font-size:0.75rem;color:var(--text-muted);font-style:italic;">➔ Mâu thuẫn logic tuyệt đối! Máy đoán trước không thể tồn tại.</div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Ý tưởng ngây thơ: Chiếc máy kiểm tra lỗi toàn năng',
      badge: 'Ý tưởng ban đầu',
      content: `
        <details class="deep-dive-details" open style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:16px;">
          <summary style="cursor:pointer;font-weight:bold;color:var(--accent-primary);">Thu gọn / Mở rộng kiến thức Chuyên sâu Tầng 3</summary>
          <div style="margin-top:12px;">
            <p>Mỗi khi gặp lỗi vòng lặp vô tận (Infinite Loop), người mới học thường hỏi: <em>"Tại sao các phần mềm biên dịch như VS Code hay Python không tự phát hiện vòng lặp vô tận trước khi chạy để cảnh báo cho lập trình viên?"</em></p>
            <p>Ta hãy giả sử rằng câu trả lời là CÓ. Giả sử có một nhà khoa học chế tạo thành công một hàm Python thần thánh tên là <code>will_halt(func, arg)</code> nhận vào bất kỳ hàm <code>func</code> và đối số <code>arg</code>:</p>
            <ul>
              <li>Trả về <code>True</code> nếu hàm <code>func(arg)</code> chắc chắn sẽ kết thúc sau hữu hạn bước.</li>
              <li>Trả về <code>False</code> nếu hàm <code>func(arg)</code> sẽ bị treo lặp vô hạn.</li>
            </ul>
          </div>
        </details>
      `
    },
    {
      id: 'sec-2',
      title: 'Chứng minh bất hủ của Alan Turing bằng mã Python',
      badge: 'Chứng minh phản chứng',
      content: `
        <p>Bằng sự sắc sảo tuyệt đối, Alan Turing xây dựng một hàm phản bác <code>troublemaker</code> (kẻ gây rối) như sau:</p>
        <pre><code class="language-python"># GIẢ SỬ ĐÃ CÓ HÀM KIỂM ĐỊNH TOÀN NĂNG:
def will_halt(target_func, arg):
    # Trả về True nếu target_func dừng, False nếu lặp vô tận
    pass

# TURING TẠO RA HÀM TROUBLEMAKER:
def troublemaker(func):
    if will_halt(func, func):
        # Nếu will_halt đoán rằng func(func) sẽ DỪNG,
        # troublemaker CỐ TÌNH CHẠY VÒNG LẶP VÔ HẬN!
        while True:
            pass
    else:
        # Nếu will_halt đoán rằng func(func) sẽ LẶP VÔ HẬN,
        # troublemaker CỐ TÌNH DỪNG LẠI NGAY LẬP TỨC!
        return True</code></pre>
        <h4>Nghịch lý bùng nổ: Khi ta gọi <code>troublemaker(troublemaker)</code></h4>
        <ol>
          <li>Nếu <code>will_halt(troublemaker, troublemaker)</code> trả về <code>True</code> (dự đoán nó sẽ dừng) ➔ Điều kiện <code>if</code> thỏa mãn ➔ Nó nhảy vào <code>while True: pass</code> ➔ Nó <strong>chạy vô tận</strong>! Dự đoán bị SAI!</li>
          <li>Nếu <code>will_halt(troublemaker, troublemaker)</code> trả về <code>False</code> (dự đoán nó lặp vô tận) ➔ Nhảy sang nhánh <code>else</code> ➔ Nó <code>return True</code> và <strong>dừng ngay lập tức</strong>! Dự đoán lại SAI!</li>
        </ol>
        <p>Trong mọi kịch bản logic, hàm <code>will_halt</code> đều đưa ra kết luận sai trái. Điều này chứng minh bằng phản chứng: <strong>Hàm <code>will_halt</code> không bao giờ có thể tồn tại trong vũ trụ toán học!</strong></p>
      `
    },
    {
      id: 'sec-3',
      title: 'Ý nghĩa thực tiễn: Trách nhiệm tối thượng của Kỹ sư',
      badge: 'Đạo đức nghề nghiệp',
      content: `
        <p>Định lý của Turing dạy cho các kỹ sư phần mềm một bài học khiêm nhường sâu sắc:</p>
        <ul>
          <li>Không có bất kỳ IDE, Compiler hay mô hình AI nào (dù tân tiến đến đâu) có thể đảm bảo 100% rằng một đoạn mã tùy ý sẽ không bao giờ bị treo.</li>
          <li>Các công cụ Static Analysis (như Linter) chỉ có thể phát hiện các trường hợp lặp vô hạn <em>hiển nhiên</em> (như <code>while True: pass</code> không có break).</li>
          <li><strong>Người kỹ sư phải tự chịu trách nhiệm:</strong> Bạn phải tự mình thiết kế Hàm giảm (Variant function), tự đặt ngưỡng Timeout phòng vệ, và tự kiểm chứng logic của mình!</li>
        </ul>
      `
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Giải pháp kỹ thuật thực tế cho bài toán treo luồng: Timeout',
      content: 'Vì không thể biết trước một thuật toán phức tạp có dừng hay không, trong kỹ thuật thực tế, các hệ thống phân tán luôn bọc các lời gọi nhạy cảm bằng cơ chế **Timeout** (ví dụ: sau 5 giây không phản hồi thì tự động ngắt kết nối và ném lỗi TimeoutError).'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Thiết kế hàm chạy có cơ chế Timeout bảo vệ',
      description: 'Khi duyệt một chuỗi số Collatz (3n + 1) chưa ai chứng minh được nó luôn dừng cho mọi số, hãy viết hàm tính với giới hạn tối đa `max_steps = 1000` để phòng ngừa lặp vô tận.',
      initialCode: `def collatz_safe(n, max_steps=1000):
    steps = 0
    # Viết vòng lặp Collatz có chốt chặn an toàn steps < max_steps
    pass
`,
      solution: `def collatz_safe(n, max_steps=1000):
    steps = 0
    current = n
    while current != 1 and steps < max_steps:
        if current % 2 == 0:
            current = current // 2
        else:
            current = 3 * current + 1
        steps += 1
        
    if current == 1:
        return f"Dừng sau {steps} bước."
    else:
        return "Cảnh báo: Đã chạm ngưỡng an toàn max_steps, ngắt tiến trình!"

print("Collatz(27):", collatz_safe(27))`
    }
  ],

  quiz: [
    {
      question: 'Alan Turing đã chứng minh điều gì về Bài toán dừng (Halting Problem)?',
      options: [
        'Mọi chương trình máy tính cuối cùng đều sẽ dừng.',
        'Không thể tồn tại một thuật toán tổng quát có khả năng xác định chính xác liệu một chương trình bất kỳ có dừng lại hay không.',
        'Mọi chương trình lặp đều có thể thay thế bằng đệ quy.',
        'Máy tính chỉ có thể xử lý các số hữu tỉ.'
      ],
      correctIndex: 1,
      explanation: 'Turing đã chứng minh rằng Halting Problem là bài toán không thể giải quyết được (undecidable): không có thuật toán vạn năng nào có thể phân tích một đoạn mã bất kỳ và trả lời đúng 100% việc nó có dừng hay không.'
    }
  ],

  summary: 'Bài toán dừng của Alan Turing vạch ra giới hạn vật lý của khoa học máy tính: không cỗ máy nào có thể tự động kiểm tra tính dừng của mọi chương trình. Lập trình viên chính là người thuyền trưởng duy nhất cầm lái và chịu trách nhiệm về sự ổn định của thuật toán.'
};
