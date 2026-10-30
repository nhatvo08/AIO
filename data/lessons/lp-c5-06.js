export default {
  id: 'lp-c5-06',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.6',
  title: 'Toán tử so sánh, So sánh chuỗi & So sánh bằng Float',
  subtitle: 'So sánh độ lớn số học, cú pháp so sánh chuỗi ngắn mạch, bẫy == trên float và giải pháp math.isclose',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng thành thạo các toán tử so sánh số học: <, <=, >, >=, ==, != và hiểu cơ chế tự nâng kiểu khi so sánh hỗn hợp.',
    'Làm chủ cú pháp so sánh chuỗi (chained comparisons): viết tắt kiểm tra phạm vi (X < Y < Z) và cơ chế ngắn mạch.',
    'Giải thích tại sao 1 == 2 < 3 trả về False mà không phải True (phân biệt chuỗi logic với đánh giá gộp giá trị).',
    'Nhận diện bẫy nguy hiểm khi so sánh bằng == trên số thực float và sử dụng chuẩn mực math.isclose().'
  ],

  intuition: {
    title: 'Thước đo toán học và chiếc kính lúp so sánh vi mô',
    metaphor: 'Trong toán học ở trường phổ thông, bạn thường viết "0 < x < 10" để kiểm tra xem một giá trị có nằm trong khoảng từ 0 đến 10 hay không. Hầu hết các ngôn ngữ lập trình như C hay Java bắt bạn phải chẻ đôi mệnh đề này thành "x > 0 && x < 10". Nhưng Python cho phép bạn viết y nguyên như trong vở toán: "0 < x < 10"! Tuy nhiên, khi chuyển sang so sánh số thực float, đừng dùng chiếc thước đo tuyệt đối ==. Vì sai số làm tròn bit nhị phân, hai số nhìn có vẻ bằng nhau nhưng ở mức vi mô vẫn lệch nhau một phần triệu tỷ. Thay vì so sánh bằng tuyệt đối, hãy dùng một chiếc "kính lúp dung sai" như math.isclose() để kiểm tra xem chúng có đủ gần nhau hay không.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ SO SÁNH CHUỖI VÀ NGẮN MẠCH TRONG PYTHON</div>
        <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
          <div style="color:var(--text-muted);font-size:0.75rem;margin-bottom:4px;">BIỂU THỨC SO SÁNH CHUỖI:</div>
          <div style="font-weight:700;color:var(--accent-primary);font-size:1.05rem;">A &lt; B &lt; C</div>
          <div style="margin-top:6px;font-size:0.82rem;color:var(--text-secondary);">
            ➔ Tương đương: <code>(A &lt; B) and (B &lt; C)</code> (B chỉ được tính toán 1 lần duy nhất!)<br>
            ➔ Đánh giá từ trái sang phải: Nếu <code>A &lt; B</code> là <code>False</code>, Python dừng ngay và trả về <code>False</code>.
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Các Toán tử So sánh Cơ bản',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 12 / 38 – Trang 14 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Các con số, giống như mọi đối tượng Python khác, đều có thể được so sánh. Các phép so sánh thông thường hoạt động trên các con số hoàn toàn đúng như bạn mong đợi—chúng so sánh độ lớn tương đối của các toán hạng và trả về một kết quả <strong>Boolean (<code>True</code> hoặc <code>False</code>)</strong>.</p>
        <p>Các kiểu số hỗn hợp cũng được hỗ trợ trong các phép so sánh số học: Python tự động nâng kiểu số nguyên lên kiểu phức tạp hơn là float trước khi so sánh giá trị.</p>
      `,
      codeExamples: [
        {
          title: 'Các phép so sánh số học cơ bản',
          code: `>>> 1 < 2          # Nhỏ hơn (so sánh độ lớn)
True
>>> 2.0 >= 1       # Lớn hơn hoặc bằng: kiểu hỗn hợp, 1 chuyển thành 1.0
True
>>> 2.0 == 2.0     # Giá trị bằng nhau
True
>>> 2.0 != 2.0     # Giá trị khác nhau
False`,
          output: `True
True
True
False`,
          annotations: [
            { line: 3, text: 'Phép so sánh hỗn hợp: số nguyên 1 được nâng thành 1.0.' },
            { line: 5, text: '== kiểm tra sự bằng nhau về mặt giá trị.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. So sánh Chuỗi (Chained Comparisons) và Cơ chế Ngắn mạch',
      content: `
        <p>Thật thú vị là Python cho phép chúng ta <strong>xâu chuỗi nhiều phép so sánh lại với nhau</strong> để thực hiện các kiểm tra phạm vi. Các phép so sánh chuỗi là một dạng viết tắt thanh lịch cho các biểu thức Boolean lớn hơn.</p>
        <p>Chẳng hạn, biểu thức <code>A &lt; B &lt; C</code> kiểm tra xem <code>B</code> có nằm giữa <code>A</code> và <code>C</code> hay không; nó tương đương với <code>(A &lt; B and B &lt; C)</code> nhưng dễ chịu hơn nhiều cho mắt đọc và ngắn gọn hơn khi gõ mã.</p>
        <p>Các phép so sánh chuỗi được đánh giá theo thứ tự từ trái sang phải, nhưng <strong>Python sẽ dừng lại ngay khi có bất kỳ phép so sánh nào trong chuỗi bị sai (ngắn mạch - short-circuit)</strong>:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh chuỗi trong thực tế',
          code: `>>> X, Y, Z = 2, 4, 6
>>> X < Y < Z                  # Tương đương: (X < Y and Y < Z)
True
>>> X < Y and Y < Z
True
>>> X < Y > Z
False
>>> 1 < 2 < 3.0 < 4            # Chuỗi nhiều phép so sánh qua kiểu hỗn hợp
True
>>> 1 == 2 < 3                 # Tương đương: 1 == 2 and 2 < 3
False`,
          output: `True
True
False
True
False`,
          annotations: [
            { line: 2, text: 'So sánh chuỗi kiểm tra phạm vi: 4 nằm giữa 2 và 6.' },
            { line: 6, text: 'X < Y là True, nhưng Y > Z (4 > 6) là False -> kết quả chung là False.' },
            { line: 10, text: '1 == 2 là False, Python dừng ngay và trả về False. KHÔNG PHẢI (1 == 2) < 3!' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. So sánh bằng giữa các Số thực Dấu phẩy động (Floating-point Equality)',
      content: `
        <p>Như đã lưu ý ở bài trước, việc kiểm tra các số thực dấu phẩy động xem có bằng nhau chính xác tuyệt đối bằng toán tử <code>==</code> đôi khi có thể gặp rắc rối nghiêm trọng do các giới hạn của phần cứng:</p>
        <pre class="code-block"><code>>>> 1.1 + 2.2 == 3.3
False
>>> 1.1 + 2.2
3.3000000000000003</code></pre>
        <p>Để giải quyết vấn đề này, bạn có thể chuyển sang số nguyên nếu chỉ quan tâm tới phần nguyên: <code>int(1.1 + 2.2) == int(3.3)</code>. Nhưng giải pháp chuẩn mực kỹ thuật nhất trong Python là sử dụng hàm <strong><code>math.isclose()</code></strong> từ thư viện chuẩn để kiểm tra xem hai số thực có đủ gần nhau trong phạm vi sai số dung sai cho phép hay không.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh số thực an toàn bằng math.isclose()',
          code: `>>> int(1.1 + 2.2) == int(3.3)
True
>>> import math
>>> math.isclose(1.1 + 2.2, 3.3)
True`,
          output: `True
True`,
          annotations: [
            { line: 1, text: 'int() cắt bỏ phần thập phân nên so sánh được phần nguyên.' },
            { line: 4, text: 'math.isclose() kiểm tra xem hai giá trị float có xấp xỉ bằng nhau trong khoảng dung sai hay không.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy hiểu nhầm biểu thức 1 == 2 < 3',
        content: `
          <p>Trong một số ngôn ngữ, <code>1 == 2 &lt; 3</code> được đánh giá tuần tự từ trái sang phải: <code>(1 == 2)</code> ra <code>false</code> (0), rồi <code>0 &lt; 3</code> lại cho ra <code>true</code>! Điều này cực kỳ nguy hiểm.</p>
          <p>Trong Python, đây là <strong>so sánh chuỗi</strong> tương đương với <code>(1 == 2) and (2 &lt; 3)</code>. Vì <code>1 == 2</code> là <code>False</code>, Python dừng ngay và trả về <code>False</code> đúng chuẩn toán học!</p>
        `
      }
    ]
  },

  exercises: [
    {
      title: 'Kiểm tra điểm số hợp lệ bằng so sánh chuỗi',
      level: 'Dễ',
      problem: 'Viết một hàm kiểm tra xem một điểm số <code>score</code> có nằm trong thang điểm hợp lệ từ 0 đến 100 (bao gồm cả hai đầu mút) hay không bằng cú pháp so sánh chuỗi của Python.',
      hint: 'Dùng cú pháp 0 <= score <= 100.',
      solutionCode: `def kiem_tra_hop_le(score):
    return 0 <= score <= 100

print("Điểm 85:", kiem_tra_hop_le(85))
print("Điểm -5:", kiem_tra_hop_le(-5))
print("Điểm 105:", kiem_tra_hop_le(105))`,
      solutionOutput: `Điểm 85: True
Điểm -5: False
Điểm 105: False`,
      explanation: 'Cú pháp <code>0 &lt;= score &lt;= 100</code> trong Python tương đương với <code>(0 &lt;= score) and (score &lt;= 100)</code> nhưng vừa gọn gàng vừa dễ đọc hơn rất nhiều.'
    }
  ],

  quiz: [
    {
      question: 'Biểu thức so sánh chuỗi "A < B < C" trong Python có ý nghĩa tương đương với biểu thức logic nào?',
      options: [
        '(A < B) < C',
        '(A < B) and (B < C)',
        '(A < B) or (B < C)',
        'A < (B < C)'
      ],
      correctIndex: 1,
      explanation: 'So sánh chuỗi A < B < C là cú pháp viết tắt tương đương với (A < B and B < C), trong đó biểu thức con B chỉ được đánh giá một lần duy nhất.'
    },
    {
      question: 'Khi cần kiểm tra hai số thực float x và y có bằng nhau hay không trong mã nguồn thực tế, giải pháp nào sau đây là CHUẨN MỰC nhất?',
      options: [
        'Sử dụng toán tử x == y.',
        'Sử dụng hàm math.isclose(x, y).',
        'Sử dụng toán tử x is y.',
        'Ép kiểu sang chuỗi rồi so sánh: str(x) == str(y).'
      ],
      correctIndex: 1,
      explanation: 'Do giới hạn phần cứng nhị phân gây ra sai số làm tròn, hàm math.isclose(x, y) từ module math là cách chuẩn mực để so sánh độ gần nhau giữa hai số thực float.'
    }
  ],

  summary: [
    'Toán tử so sánh số học trả về kết quả kiểu Boolean (True hoặc False).',
    'So sánh chuỗi (như X < Y < Z) là cú pháp rút gọn thanh lịch để kiểm tra phạm vi giá trị.',
    'So sánh chuỗi có tính ngắn mạch: dừng lại ngay khi một mắt xích trong chuỗi bị sai.',
    'Tránh so sánh bằng tuyệt đối (==) trên số thực float; hãy dùng math.isclose() để so sánh với dung sai phần cứng.',
    'Ý chính: Cú pháp so sánh chuỗi của Python mang lại sự trực quan toán học tự nhiên mà vẫn đảm bảo tính an toàn logic cao nhất.'
  ]
};