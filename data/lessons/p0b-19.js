export default {
  id: 'p0b-19',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B3.4',
  title: 'Phân tích độ phức tạp thời gian từ hình dáng Flowchart (Big O Trực quan)',
  subtitle: 'Đọc vị Big O bằng mắt thường: Đếm tần suất cạnh, vòng lặp đơn O(n), vòng lặp lồng O(n²), sơ đồ chia đôi O(log n) và điểm nghẽn hiệu năng',
  level: 'Chuyên sâu',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Xác định độ phức tạp thời gian Big O của thuật toán thông qua hình học trực quan của Flowchart.',
    'Nhận diện các mẫu hình đồ họa: Đường thẳng O(1), Vòng tròn đơn O(n), Vòng tròn lồng nhau O(n²), và Nhánh chia đôi O(log n).',
    'Chỉ điểm chính xác Điểm nghẽn hiệu năng (Bottlenecks / Hotspot) trên sơ đồ để tập trung tối ưu hóa.',
    'Hình dung sự chênh lệch khủng khiếp giữa các cấp độ Big O khi quy mô dữ liệu n tăng lên hàng triệu phần tử.'
  ],

  intuition: {
    title: 'Đếm số vòng quay của bánh xe và Tàu lượn siêu tốc',
    metaphor: 'Hãy tưởng tượng Flowchart là một hệ thống đường ray xe lửa, và bạn là một thanh tra đứng đếm xem đoàn tàu chạy qua mỗi đoạn ray bao nhiêu lần. Những đoạn ray thẳng (O(1)) đoàn tàu chỉ lướt qua một lần duy nhất rồi thôi. Nhưng nếu bạn nhìn thấy một vòng ray uốn cong quay đầu (Vòng lặp), đoàn tàu sẽ phải chạy vòng tròn n lần (O(n)). Tệ hơn nữa, nếu bên trong cái vòng tròn đó lại có một vòng xoáy ốc nhỏ hơn nữa (Nested loop), đoàn tàu sẽ phải chạy n × n = n² vòng (O(n²))! Ngược lại, những đoạn ray chia đôi (O(log n)) giống như trò nhảy cóc thần tốc: mỗi bước nhảy cắt bỏ một nửa quãng đường còn lại, giúp bạn về đích nhanh chóng.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">HÌNH HỌC FLOWCHART ÁNH XẠ ĐỘ PHỨC TẠP BIG O</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;text-align:center;">
          <div style="padding:8px;border:1px solid #10b981;border-radius:6px;background:var(--bg-surface);">
            <strong style="color:#10b981;">O(1)</strong><br/>
            <span style="font-size:0.7rem;color:var(--text-muted);">Đường thẳng tuột</span>
          </div>
          <div style="padding:8px;border:1px solid #3b82f6;border-radius:6px;background:var(--bg-surface);">
            <strong style="color:#3b82f6;">O(log n)</strong><br/>
            <span style="font-size:0.7rem;color:var(--text-muted);">Cây chia đôi</span>
          </div>
          <div style="padding:8px;border:1px solid var(--py-gold);border-radius:6px;background:var(--bg-surface);">
            <strong style="color:var(--py-gold);">O(n)</strong><br/>
            <span style="font-size:0.7rem;color:var(--text-muted);">1 Vòng khép kín</span>
          </div>
          <div style="padding:8px;border:1px solid var(--danger-text);border-radius:6px;background:var(--bg-surface);">
            <strong style="color:var(--danger-text);">O(n²)</strong><br/>
            <span style="font-size:0.7rem;color:var(--text-muted);">Vòng trong vòng</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Đọc vị Big O từ số lần duyệt qua cạnh (Edge Frequency)',
      badge: 'Phương pháp phân tích',
      content: `
        <details class="deep-dive-details" open style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:16px;">
          <summary style="cursor:pointer;font-weight:bold;color:var(--accent-primary);">Thu gọn / Mở rộng kiến thức Chuyên sâu Tầng 3</summary>
          <div style="margin-top:12px;">
            <p>Để xác định độ phức tạp của một thuật toán trên Flowchart, ta không nhìn vào tổng số câu lệnh, mà nhìn vào <strong>tần suất thực thi cực đại của các cạnh có hướng</strong> khi đầu vào $n \to \infty$:</p>
            <ul>
              <li><strong>Cung $O(1)$:</strong> Nằm ngoài mọi vòng lặp. Luôn thực thi cố định 1 lần bất kể $n$ bằng 10 hay 1 tỷ.</li>
              <li><strong>Cung $O(n)$:</strong> Nằm trong một chu trình lặp đơn thuần với bước nhảy hằng số ($i = i + 1$). Cạnh này được kích hoạt tỷ lệ thuận trực tiếp với $n$.</li>
              <li><strong>Cung $O(n^2)$:</strong> Nằm trong giao điểm của hai chu trình lặp lồng nhau. Mỗi một bước của vòng lặp mẹ kích hoạt toàn bộ chu trình con.</li>
              <li><strong>Cung $O(\log n)$:</strong> Sau mỗi chu trình, biến điều khiển không tăng/giảm tuyến tính mà <strong>bị chia đôi ($n = n // 2$) hoặc nhân đôi</strong>.</li>
            </ul>
          </div>
        </details>
      `
    },
    {
      id: 'sec-2',
      title: 'So sánh tốc độ với n = 1,000,000 (1 triệu phần tử)',
      badge: 'Tác động thực tế',
      content: `
        <p>Bảng so sánh sau đây giải thích vì sao kỹ sư Google và Big Tech luôn bị ám ảnh bởi việc đưa thuật toán từ $O(n^2)$ về $O(n \\log n)$ hoặc $O(\\log n)$:</p>
        <div class="table-responsive">
          <table class="lesson-table">
          <thead>
            <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);">
              <th style="padding:6px;border:1px solid var(--border-subtle);">Độ phức tạp</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Số phép toán với n = 1,000,000</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Thời gian ước tính (CPU 1GHz)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);font-weight:bold;color:#10b981;">O(1)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">1</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);color:#10b981;">~ 1 nano-giây (tức thì)</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);font-weight:bold;color:#3b82f6;">O(log n)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">~ 20 (vì 2^20 ≈ 1,048,576)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);color:#3b82f6;">~ 0.02 micro-giây</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);font-weight:bold;color:var(--py-gold);">O(n)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">1,000,000 (1 triệu)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);color:var(--py-gold);">~ 1 mili-giây</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);font-weight:bold;color:var(--danger-text);">O(n²)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">1,000,000,000,000 (1 nghìn tỷ!)</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);color:var(--danger-text);font-weight:bold;">~ 16.6 phút! (Treo cứng máy)</td>
            </tr>
          </tbody>
        </table>
        </div>
      `
    },
    {
      id: 'sec-3',
      title: 'Nhận diện Điểm nghẽn hiệu năng (Bottlenecks)',
      badge: 'Tối ưu hóa',
      content: `
        <p>Quy tắc Pareto 80/20 trong hiệu năng phần mềm: <em>"80% thời gian chạy của chương trình thường bị tiêu tốn tại 20% các khối lệnh nằm sâu trong vòng lặp trong cùng"</em>.</p>
        <p>Khi nhìn vào Flowchart, những khối hình chữ nhật nào nằm gọn trong tâm của nhiều lớp vòng lặp lồng nhau nhất chính là <strong>Vùng nóng (Hotspots)</strong>. Hãy dồn toàn lực tối ưu hóa các khối đó (hoặc tìm cách đưa chúng ra khỏi vòng lặp), thay vì tối ưu hóa những dòng lệnh ở vùng ngoài.</p>
      `
    }
  ],

  callouts: [
    {
      type: 'important',
      title: 'Quy tắc bỏ qua hằng số',
      content: 'Trong ký pháp Big O, một vòng lặp chạy $5n$ lần hay $100n$ lần đều là $O(n)$, vì khi $n$ tăng từ 1 triệu lên 1 tỷ, tốc độ tăng trưởng là tuyến tính. Tuy nhiên với hệ thống thực tế, việc tối ưu hệ số hằng số ở vùng nóng vẫn mang lại cải thiện tốc độ đáng giá.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Dự đoán độ phức tạp từ số vòng lặp',
      description: 'Cho hai đoạn code sau, hãy xác định độ phức tạp Big O của từng đoạn:\n1. Đoạn A: Một vòng lặp for i in range(n) chạy xong, sau đó đến một vòng for j in range(n) độc lập.\n2. Đoạn B: Một vòng lặp while n > 1: n = n // 2.',
      initialCode: `big_o_a = ""
big_o_b = ""
`,
      solution: `big_o_a = "O(n)"       # Hai vòng lặp nối tiếp: O(n + n) = O(2n) = O(n)
big_o_b = "O(log n)"   # Sau mỗi bước n giảm đi một nửa: O(log2 n)
print(f"Đoạn A: {big_o_a}")
print(f"Đoạn B: {big_o_b}")`
    }
  ],

  quiz: [
    {
      question: 'Khi quan sát Flowchart của thuật toán Tìm kiếm nhị phân (Binary Search), tại sao độ phức tạp lại là O(log n)?',
      options: [
        'Vì mảng có n phần tử.',
        'Vì tại mỗi lần lặp, không gian bài toán [left, right] bị thu nhỏ đi đúng một nửa.',
        'Vì nó dùng phép cộng chỉ số.',
        'Vì nó có hai điểm kết thúc return.'
      ],
      correctIndex: 1,
      explanation: 'Số bước lặp cần thiết để một đại lượng n bị chia đôi liên tục cho đến khi chạm mốc 1 chính là định nghĩa toán học của logarithm cơ số 2: log2(n).'
    }
  ],

  summary: 'Hình dáng Flowchart phản ánh trung thực độ phức tạp tính toán: đường thẳng là O(1), vòng đơn là O(n), vòng lồng nhau là O(n²), và chia đôi là O(log n). Tập trung tối ưu vùng nóng sâu nhất trên sơ đồ giúp giải phóng hiệu năng phần mềm.'
};
