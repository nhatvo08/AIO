export default {
  id: 'lp-c5-07',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.7',
  title: 'Các toán tử chia: Chia thực (/), Chia sàn (//) và Cắt thập phân',
  subtitle: 'Sắc thái tinh tế của phép chia trong Python: chia thực / luôn ra float, chia sàn // làm tròn về âm vô cùng',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt bản chất của hai toán tử chia trong Python: chia thực (/) và chia lấy sàn (//).',
    'Hiểu nguyên tắc trả về kiểu dữ liệu: / luôn trả về float, còn // trả về int khi hai toán hạng đều là int.',
    'Nắm vững sự khác biệt then chốt giữa Chia lấy sàn (floor) và Cắt bỏ phần thập phân (truncation) trên số âm.',
    'Thực hành các hàm math.floor(), math.trunc() và dự đoán chính xác kết quả 5 // -2 ra -3.'
  ],

  intuition: {
    title: 'Sàn nhà, trần nhà và chiếc kéo cắt số',
    metaphor: 'Hãy tưởng tượng trục số như một tòa nhà nhiều tầng: số 0 ở tầng trệt, số dương ở các tầng trên, và số âm ở các tầng hầm (-1, -2, -3...). Phép chia lấy sàn (floor) giống như lực hấp dẫn: nó luôn kéo con số rơi xuống cái sàn nhà ngay bên dưới chân nó. Với số dương 2.5, sàn nhà bên dưới là số 2. Nhưng với số âm -2.5 (đang ở giữa tầng hầm -2 và -3), rơi xuống phía dưới nghĩa là rơi xuống sàn tầng hầm -3! Ngược lại, phép cắt bỏ phần thập phân (truncation) giống như một chiếc kéo: nó không quan tâm sàn hay trần, mà chỉ đơn giản lấy kéo cắt phăng đi phần lẻ sau dấu chấm, kéo con số về gần số 0.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">TRỤC SỐ MINH HỌA CHIA SÀN VS CẮT PHẦN THẬP PHÂN</div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
          <div style="text-align:center;">
            <div style="color:var(--danger);font-weight:700;">-3</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">math.floor(-2.5)</div>
          </div>
          <div style="color:var(--accent-primary);font-size:1.2rem;">◄── làm tròn xuống (floor)</div>
          <div style="text-align:center;padding:4px 8px;background:var(--accent-soft);border-radius:4px;font-weight:700;">-2.5</div>
          <div style="color:var(--success);font-size:1.2rem;">về số 0 (trunc) ──►</div>
          <div style="text-align:center;">
            <div style="color:var(--success);font-weight:700;">-2</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">math.trunc(-2.5)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Hai Hình thức Phân biệt của Phép Chia trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 14 / 38 – Trang 15 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Phép chia có lẽ là toán tử số học cơ bản nhiều sắc thái nhất trong Python, bởi vì nó có hai hình thức phân biệt hoàn toàn rõ ràng:</p>
        <ul>
          <li><strong>Phép chia thực (True division: <code>/</code>):</strong> Luôn luôn giữ lại phần dư thập phân và trả về một số thực dấu phẩy động (<code>float</code>), bất kể kiểu của các toán hạng là gì (ngay cả khi phép chia hết như <code>4 / 2</code> ra <code>2.0</code>).</li>
          <li><strong>Phép chia lấy sàn (Floor division: <code>//</code>):</strong> Cắt phần kết quả xuống số nguyên nhỏ hơn liền kề (giá trị sàn - floor). Phép toán này trả về một <code>int</code> nếu cả hai toán hạng đều là số nguyên, hoặc trả về một <code>float</code> nếu có ít nhất một toán hạng là float.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh chia thực / và chia lấy sàn // trong REPL',
          code: `>>> 10 / 4     # Chia thực: giữ lại phần thập phân, trả về float
2.5
>>> 10 // 4    # Chia lấy sàn: cắt bỏ phần thập phân, trả về int
2
>>> 10 / 4.0   # Chia thực: toán hạng float hoạt động tương tự
2.5
>>> 10 // 4.0  # Chia lấy sàn: trả về float nếu có toán hạng float
2.0`,
          output: `2.5
2
2.5
2.0`,
          annotations: [
            { line: 1, text: 'Toán tử / luôn luôn trả về kiểu float trong Python 3.' },
            { line: 3, text: 'Toán tử // với hai số nguyên trả về số nguyên 2.' },
            { line: 7, text: 'Toán tử // khi có toán hạng float trả về 2.0 (float).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Chia lấy Sàn (Floor) so với Cắt phần Thập phân (Truncation)',
      content: `
        <p>Điều quan trọng là bạn cần hiểu rằng: <strong>toán tử <code>//</code> thực hiện phép chia lấy sàn (floor), chứ không phải phép cắt bỏ phần thập phân (truncation)</strong>.</p>
        <ul>
          <li><strong>Đối với các số dương:</strong> lấy sàn và cắt bỏ là như nhau: cả <code>2.5</code> và <code>2.9</code> đều trở thành <code>2</code>.</li>
          <li><strong>Đối với các số âm:</strong> chúng phân kỳ rõ rệt!
            <br>+ Lấy sàn (<code>floor</code>) sẽ làm tròn xuống theo hướng <em>âm vô cùng</em> (số nhỏ hơn liền kề). Ví dụ: <code>-2.5</code> làm tròn xuống thành <code>-3</code> (vì <code>-3 &lt; -2.5</code>).
            <br>+ Cắt phần thập phân (<code>truncation</code>) chỉ đơn giản là gạt bỏ các chữ số thập phân (làm tròn về hướng số <code>0</code>). Ví dụ: <code>-2.5</code> cắt thập phân thành <code>-2</code>.
          </li>
        </ul>
        <p>Python cung cấp các công cụ dựng sẵn trong module <code>math</code> để minh họa sự khác biệt bản chất này:</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa math.floor và math.trunc trên số dương và số âm',
          code: `>>> import math
>>> math.floor(2.5)     # Lấy sàn: số nguyên nhỏ hơn liền kề
2
>>> math.floor(-2.5)    # -3 nhỏ hơn -2.5!
-3
>>> math.trunc(2.5)     # Cắt phần thập phân: bỏ phần lẻ thập phân
2
>>> math.trunc(-2.5)    # Cắt bỏ phần lẻ, kéo về phía số 0
-2`,
          output: `2
-3
2
-2`,
          annotations: [
            { line: 4, text: 'math.floor(-2.5) cho ra -3 vì -3 nằm phía dưới -2.5 trên trục số.' },
            { line: 8, text: 'math.trunc(-2.5) loại bỏ .5 để giữ lại -2.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Kiểm chứng Tổng thể Hành vi Chia trên Số Dương và Số Âm',
      content: `
        <p>Dưới đây là bảng kiểm chứng tương tác trọn vẹn được Mark Lutz đưa ra trong sách giáo trình để bạn thấy rõ hành vi của <code>/</code> và <code>//</code> trên cả toán hạng nguyên và toán hạng thực:</p>
      `,
      codeExamples: [
        {
          title: 'Bộ kiểm chứng đầy đủ các phép chia với số âm',
          code: `>>> 5 / 2, 5 / -2
(2.5, -2.5)
>>> 5 // 2, 5 // -2        # Chia lấy sàn làm tròn về hướng âm vô cùng!
(2, -3)
>>> 5 / 2.0, 5 / -2.0
(2.5, -2.5)
>>> 5 // 2.0, 5 // -2.0
(2.0, -3.0)`,
          output: `(2.5, -2.5)
(2, -3)
(2.5, -2.5)
(2.0, -3.0)`,
          annotations: [
            { line: 3, text: '5 // -2 cho kết quả -3 (chứ KHÔNG PHẢI -2) vì -2.5 được làm tròn xuống sàn -3!' },
            { line: 7, text: 'Toán hạng float khiến kết quả chia sàn là -3.0.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy chia số âm // trong các bài toán chỉ mục hay phân trang',
        content: 'Một lỗi rất phổ biến khi lập trình là sử dụng <code>//</code> với số âm và kỳ vọng kết quả chỉ cắt bỏ phần thập phân. Hãy luôn ghi nhớ: <code>-5 // 2</code> cho ra <code>-3</code> chứ không phải <code>-2</code>. Nếu bạn muốn cắt bỏ phần thập phân đơn thuần, hãy dùng hàm <code>int(a / b)</code> hoặc <code>math.trunc(a / b)</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Dự đoán kết quả phép chia số âm',
      level: 'Dễ',
      problem: 'Hãy tính giá trị và kiểu dữ liệu của hai biểu thức sau: <code>-7 // 2</code> và <code>int(-7 / 2)</code>.',
      hint: '// lấy sàn về phía âm vô cùng, còn int() cắt bỏ phần thập phân về phía số 0.',
      solutionCode: `kq1 = -7 // 2
kq2 = int(-7 / 2)

print("-7 // 2      =", kq1, type(kq1))
print("int(-7 / 2)  =", kq2, type(kq2))`,
      solutionOutput: `-7 // 2      = -4 <class 'int'>
int(-7 / 2)  = -3 <class 'int'>`,
      explanation: '-7 / 2 là -3.5. Phép chia sàn <code>//</code> làm tròn xuống số nguyên nhỏ hơn là <code>-4</code>. Trong khi đó, <code>int()</code> cắt bỏ phần thập phân .5 để giữ lại <code>-3</code>.'
    }
  ],

  quiz: [
    {
      question: 'Toán tử chia thực / trong Python 3 luôn trả về kiểu dữ liệu gì?',
      options: [
        'Luôn luôn trả về số nguyên int nếu chia hết.',
        'Luôn luôn trả về số thực dấu phẩy động float.',
        'Trả về int hoặc float tùy thuộc vào kiểu của toán hạng đầu vào.',
        'Trả về chuỗi số thập phân.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python 3, toán tử / thực hiện phép chia thực (true division) và luôn luôn trả về một số thực float, kể cả khi 4 / 2 ra 2.0.'
    },
    {
      question: 'Biểu thức 5 // -2 trong Python cho ra kết quả là bao nhiêu?',
      options: [
        '-2',
        '-2.5',
        '-3',
        '2'
      ],
      correctIndex: 2,
      explanation: '5 / -2 là -2.5. Vì // thực hiện phép chia lấy sàn (floor) làm tròn về phía âm vô cùng (số nhỏ hơn liền kề), kết quả tạo ra là -3.'
    }
  ],

  summary: [
    'Python cung cấp hai toán tử chia riêng biệt: chia thực (/) và chia lấy sàn (//).',
    'Toán tử chia thực / luôn luôn trả về float, bảo toàn trọn vẹn phần thập phân.',
    'Toán tử chia lấy sàn // làm tròn kết quả xuống số nguyên nhỏ hơn liền kề (về hướng âm vô cùng).',
    'Với số âm, chia sàn // phân kỳ so với cắt bỏ thập phân (truncation): -2.5 lấy sàn là -3, nhưng cắt thập phân là -2.',
    'Nếu muốn cắt bỏ thập phân đơn thuần, hãy dùng int() hoặc math.trunc().'
  ]
};