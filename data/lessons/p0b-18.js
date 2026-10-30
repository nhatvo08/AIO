export default {
  id: 'p0b-18',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B3.3',
  title: 'Chứng minh tính đúng đắn của Thuật toán: Bất biến vòng lặp và Hàm giảm',
  subtitle: 'Tư duy toán học nghiêm cẩn: Hoare Logic, Tiền điều kiện, Hậu điều kiện, Bất biến (Loop Invariant) và Chứng minh tính dừng',
  level: 'Chuyên sâu',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thấu hiểu chân lý của Dijkstra: Kiểm thử chỉ phát hiện sự hiện diện của lỗi, không chứng minh được sự vắng mặt của lỗi.',
    'Làm chủ công cụ Bất biến vòng lặp (Loop Invariant) qua 3 bước: Khởi tạo, Duy trì và Kết thúc.',
    'Sử dụng Hàm giảm (Variant Function) để chứng minh một cách toán học rằng vòng lặp bắt buộc phải dừng lại.',
    'Áp dụng Bất biến vòng lặp để chứng minh tính đúng đắn của thuật toán Tìm kiếm nhị phân (Binary Search).'
  ],

  intuition: {
    title: 'Quy nạp toán học và Tấm thẻ bảo hành trọn đời',
    metaphor: 'Làm sao bạn dám tin tưởng leo lên chiếc máy bay Boeing hay sử dụng chiếc máy trợ tim cấy trong lồng ngực? Kỹ sư hàng không không thể bảo: "Chúng tôi đã bay thử 10 chuyến thấy ổn nên chắc chuyến thứ 11 cũng ổn!". Họ phải có những chứng minh toán học bất khả xâm phạm. Trong khoa học máy tính, "Bất biến vòng lặp" (Loop Invariant) chính là phương pháp Quy nạp toán học ứng dụng vào thuật toán: Nếu một sự thật đúng ngay tại vạch xuất phát, và mỗi bước chân tiếp theo của bạn bảo tồn sự thật đó, thì chắc chắn khi về đến đích bạn sẽ đạt được kết quả hoàn hảo. Còn "Hàm giảm" giống như đồng hồ cát: mỗi hạt cát rơi xuống là khoảng cách đến vạch đích ngắn lại một đơn vị, và đồng hồ cát bắt buộc phải cạn!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">3 GIAI ĐOẠN CHỨNG MINH BẤT BIẾN VÒNG LẶP</div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;">
          <div style="padding:10px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);">1. KHỞI TẠO</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Đúng trước khi bước vào vòng lặp lần đầu</span>
          </div>
          <div style="padding:10px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--py-gold);">2. DUY TRÌ</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Nếu đúng trước vòng k ➔ Vẫn đúng sau vòng k</span>
          </div>
          <div style="padding:10px;border:2px solid #10b981;border-radius:8px;background:var(--bg-surface);">
            <strong style="color:#10b981;">3. KẾT THÚC</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Khi dừng ➔ Suy ra hậu điều kiện đúng</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Khung lý thuyết Hoare Triple: Tiền điều kiện và Hậu điều kiện',
      badge: 'Logic mệnh đề',
      content: `
        <details class="deep-dive-details" open style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:16px;">
          <summary style="cursor:pointer;font-weight:bold;color:var(--accent-primary);">Thu gọn / Mở rộng kiến thức Chuyên sâu Tầng 3</summary>
          <div style="margin-top:12px;">
            <p>Nhà khoa học máy tính Sir Tony Hoare đưa ra hệ thống logic hình thức để suy luận về tính đúng đắn của phần mềm qua bộ ba <strong>Hoare Triple: $\{P\} \; C \; \{Q\}$</strong>:</p>
            <ul>
              <li><strong>$\{P\}$ (Precondition - Tiền điều kiện):</strong> Trạng thái của hệ thống trước khi thực thi đoạn mã $C$.</li>
              <li><strong>$C$ (Command - Đoạn mã):</strong> Khối lệnh thuật toán.</li>
              <li><strong>$\{Q\}$ (Postcondition - Hậu điều kiện):</strong> Kết quả bắt buộc phải thỏa mãn sau khi $C$ chạy xong.</li>
            </ul>
            <p>Ý nghĩa: Nếu môi trường đáp ứng đúng hợp đồng $\{P\}$, thì khi đoạn code $C$ kết thúc, nó bảo đảm kết quả trả về chắc chắn thỏa mãn $\{Q\}$.</p>
          </div>
        </details>
      `
    },
    {
      id: 'sec-2',
      title: 'Bất biến vòng lặp (Loop Invariant)',
      badge: 'Quy nạp thuật toán',
      content: `
        <p>Bất biến vòng lặp là một vị từ (mệnh đề logic) $I$ liên kết các biến của thuật toán lại với nhau sao cho nó <strong>luôn đúng trước và sau mỗi vòng lặp</strong>.</p>
        <h4>Ví dụ: Chứng minh hàm tính tổng mảng $S = \\sum_{i=0}^{n-1} arr[i]$</h4>
        <pre><code class="language-python">s = 0
k = 0
while k < n:
    s = s + arr[k]
    k = k + 1</code></pre>
        <p><strong>Mệnh đề bất biến $I$:</strong> Tại thời điểm bắt đầu mỗi vòng lặp, $s = \\sum_{j=0}^{k-1} arr[j]$ (tức là $s$ luôn lưu tổng của $k$ phần tử đầu tiên).</p>
        <ol>
          <li><strong>Khởi tạo ($k = 0$):</strong> Trước khi vào vòng lặp, $s = 0$. Tổng của 0 phần tử đầu tiên bằng 0. Mệnh đề $I$ đúng!</li>
          <li><strong>Duy trì:</strong> Giả sử $I$ đúng trước vòng lặp thứ $k$. Sau khi thực hiện <code>s = s + arr[k]</code> và <code>k = k + 1</code>, giá trị mới của $s$ chính là tổng của $(k+1)$ phần tử đầu tiên. Mệnh đề $I$ tiếp tục được bảo toàn!</li>
          <li><strong>Kết thúc:</strong> Vòng lặp dừng khi $k = n$. Thay $k = n$ vào mệnh đề bất biến $I$, ta có: $s = \\sum_{j=0}^{n-1} arr[j]$. Đây chính là định nghĩa tổng của toàn bộ mảng! Thuật toán được chứng minh đúng 100%.</li>
        </ol>
      `
    },
    {
      id: 'sec-3',
      title: 'Hàm giảm (Variant Function) và Chứng minh tính dừng',
      badge: 'Toán học hữu hạn',
      content: `
        <p>Một thuật toán không chỉ cần tính ra kết quả đúng nếu dừng, mà nó <strong>bắt buộc phải dừng lại</strong> (không bị lặp vô tận).</p>
        <p>Để chứng minh tính dừng, ta tìm một <strong>Hàm giảm $V$</strong> nhận trạng thái các biến làm đầu vào và trả về một số nguyên:</p>
        <ol>
          <li>$V \ge 0$ trong suốt thời gian vòng lặp còn tiếp diễn (bị chặn dưới bởi 0).</li>
          <li>Sau mỗi vòng lặp, giá trị của $V$ giảm đi một lượng ít nhất là 1 ($V_{sau} \le V_{truoc} - 1$).</li>
        </ol>
        <p>Vì tập hợp các số nguyên không âm có chặn dưới và $V$ luôn giảm nghiêm ngặt sau mỗi bước, theo nguyên lý sắp thứ tự tốt (Well-ordering Principle), $V$ không thể giảm mãi mãi. Do đó vòng lặp <strong>bắt buộc phải dừng lại sau tối đa $V_0$ bước</strong>!</p>
      `
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Hàm giảm trong Binary Search',
      content: 'Trong Tìm kiếm nhị phân với khoảng `[left, right]`, hàm giảm chính là độ dài đoạn tìm kiếm: $V = right - left + 1$. Mỗi bước không tìm thấy, đoạn tìm kiếm bị thu hẹp ít nhất một nửa ($V_{sau} \le \lfloor V_{truoc} / 2 \rfloor$). Vì $V$ giảm liên tục về 0, thuật toán bắt buộc phải dừng sau tối đa $\lfloor \log_2 n \rfloor + 1$ bước!'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Xác định hàm giảm của thuật toán Euclid',
      description: 'Trong thuật toán Euclid `while b != 0: a, b = b, a % b`, đại lượng nào đóng vai trò là hàm giảm đảm bảo thuật toán chắc chắn dừng lại?',
      initialCode: `# Hãy điền hàm giảm V và giải thích ngắn gọn:
variant_function = ""
explanation = ""
`,
      solution: `variant_function = "b"
explanation = """
Tại mỗi bước lặp, b mới = a % b cũ.
Theo tính chất phép chia lấy dư cho số nguyên dương, phần dư luôn thỏa mãn: 0 <= a % b < b.
Do đó giá trị b mới luôn nhỏ hơn nghiêm ngặt giá trị b cũ (b_mới <= b_cũ - 1) và luôn không âm (b >= 0).
Đại lượng b đóng vai trò là hàm giảm hoàn hảo, bảo đảm thuật toán Euclid chắc chắn phải kết thúc khi b chạm mốc 0.
"""
print("Hàm giảm:", variant_function)
print(explanation)`
    }
  ],

  quiz: [
    {
      question: 'Bất biến vòng lặp (Loop Invariant) là gì?',
      options: [
        'Một hằng số không bao giờ thay đổi giá trị trong máy tính.',
        'Một mệnh đề logic luôn đúng trước và sau mỗi lần thực thi thân vòng lặp.',
        'Lệnh break dừng vòng lặp.',
        'Biến đếm i tăng lên 1 sau mỗi vòng.'
      ],
      correctIndex: 1,
      explanation: 'Bất biến vòng lặp là một thuộc tính hoặc mệnh đề logic luôn giữ nguyên giá trị Đúng (True) tại các mốc thời gian trước và sau mỗi vòng lặp, tương đương với bước quy nạp trong toán học.'
    }
  ],

  summary: 'Chứng minh tính đúng đắn của thuật toán đưa kỹ sư vượt lên khỏi việc đoán mò test case. Bất biến vòng lặp chứng minh tính đúng nếu dừng (Partial Correctness), kết hợp cùng Hàm giảm chứng minh tính dừng (Termination) tạo nên sự đảm bảo tuyệt đối 100% (Total Correctness).'
};
