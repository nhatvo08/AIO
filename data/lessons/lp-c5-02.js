export default {
  id: 'lp-c5-02',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.2',
  title: 'Toán tử biểu thức Python, Bảng 5-2 & Khung chuyên đề "No-op"',
  subtitle: 'Bảng 5-2 toàn diện 19 bậc ưu tiên toán tử, các sắc thái cú pháp tinh tế và những "thao tác rỗng" trong ngôn ngữ',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu khái niệm biểu thức (expression) và toán tử (operator) trong xử lý dữ liệu Python.',
    'Nắm vững toàn bộ 19 bậc ưu tiên toán tử trong Bảng 5-2 chuẩn của Mark Lutz từ thấp đến cao.',
    'Làm chủ các sắc thái cú pháp: yield, toán tử gán walrus :=, nhân ma trận @, và tính liên kết.',
    'Khám phá Khung chuyên đề: hiểu vì sao toán tử @, Ellipsis (...) và type hinting được gọi là các "no-op" của Python cốt lõi.'
  ],

  intuition: {
    title: 'Bậc thang quyền lực của các toán tử',
    metaphor: 'Hãy tưởng tượng các toán tử trong biểu thức như các đại biểu trong một hội đồng. Những toán tử đứng ở bậc thang thấp (như yield, phép gán :=, hay phép or) có độ ưu tiên thấp và phải nhường lời cho những toán tử ở bậc cao hơn (như nhân *, lũy thừa **, hay gọi hàm x()). Khi một biểu thức phức tạp xuất hiện, Python không đánh giá hỗn loạn mà nhìn vào "bậc thang quyền lực" (Bảng 5-2) để quyết định ai được thực thi trước. Nếu bạn muốn can thiệp vào trật tự này, bạn dùng chiếc gậy chỉ huy quyền năng nhất: cặp dấu ngoặc đơn ().',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.85rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">TRẬT TỰ ĐỘ ƯU TIÊN TOÁN TỬ (BẢNG 5-2 TỪ DƯỚI LÊN TRÊN)</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:4px;">
            <span><strong>CAO NHẤT (Ưu tiên số 1):</strong> <code>(...)</code>, <code>[...]</code>, <code>x[i]</code>, <code>x(...)</code>, <code>x.attr</code></span>
            <span style="color:var(--success);font-weight:700;">Liên kết chặt nhất</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:4px;">
            <span><strong>Toán học mạnh:</strong> <code>**</code> (Lũy thừa - từ phải sang trái), <code>~x</code>, <code>+x</code>, <code>-x</code></span>
            <span style="color:var(--text-muted);">Tính toán trước</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--warning);border-radius:4px;">
            <span><strong>Số học thường:</strong> <code>*</code>, <code>/</code>, <code>//</code>, <code>%</code> rồi mới tới <code>+</code>, <code>-</code></span>
            <span style="color:var(--text-muted);">Nhân chia trước, cộng trừ sau</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--accent-secondary);border-radius:4px;">
            <span><strong>Bitwise & So sánh:</strong> <code><<</code>, <code>>></code>, <code>&</code>, <code>^</code>, <code>|</code> rồi tới <code>==</code>, <code><</code>, <code>is</code>, <code>in</code></span>
            <span style="color:var(--text-muted);">Sau số học</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--danger);border-radius:4px;">
            <span><strong>THẤP NHẤT:</strong> <code>not</code>, <code>and</code>, <code>or</code>, <code>if-else</code>, <code>lambda</code>, <code>:=</code>, <code>yield</code></span>
            <span style="color:var(--danger);font-weight:700;">Đánh giá sau cùng</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Biểu thức và Toán tử trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 4 / 38 – Trang 6 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Có lẽ cách cơ bản nhất để xử lý các con số là sử dụng <strong>biểu thức (expression)</strong>—sự kết hợp giữa các con số (hoặc những đối tượng khác) và các <strong>toán tử (operator)</strong> để tính toán ra một giá trị mới.</p>
        <p>Trong Python, biểu thức được viết bằng ký hiệu toán học thông thường. Chẳng hạn, để cộng hai số <code>X</code> và <code>Y</code>, bạn viết <code>X + Y</code>, chỉ thị cho Python áp dụng toán tử <code>+</code> lên các đối tượng được đặt tên bởi <code>X</code> và <code>Y</code>. Kết quả trả về là tổng của chúng—tức là một đối tượng số mới.</p>
        <p>Bảng 5-2 dưới đây liệt kê tất cả các biểu thức toán tử khả dụng trong Python theo dạng trừu tượng, được sắp xếp theo <strong>thứ tự độ ưu tiên tăng dần</strong> (các toán tử nằm phía dưới có độ ưu tiên cao hơn và liên kết chặt chẽ hơn).</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bảng 5-2: Các toán tử biểu thức Python theo thứ tự ưu tiên',
      content: `
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:8px 12px;color:var(--text-primary);width:35%;">Toán tử (Operators)</th>
                <th style="padding:8px 12px;color:var(--text-primary);">Mô tả (Description) — Độ ưu tiên tăng dần ↓</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">yield x, yield from x</td>
                <td style="padding:8px 12px;">Giao thức gửi của hàm generator</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x := y</td>
                <td style="padding:8px 12px;">Biểu thức gán (assignment expression / walrus)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">lambda args: expression</td>
                <td style="padding:8px 12px;">Tạo hàm ẩn danh (anonymous function)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x if y else z</td>
                <td style="padding:8px 12px;">Phép chọn ba ngôi (x chỉ được đánh giá nếu y là true)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x or y</td>
                <td style="padding:8px 12px;">Phép OR logic (y chỉ được đánh giá nếu x là false)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x and y</td>
                <td style="padding:8px 12px;">Phép AND logic (y chỉ được đánh giá nếu x là true)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">not x</td>
                <td style="padding:8px 12px;">Phủ định logic (logical negation)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x in y, x not in y<br>x is y, x is not y<br>x &lt; y, &lt;=, &gt;, &gt;=<br>x == y, x != y</td>
                <td style="padding:8px 12px;">Kiểm tra thành viên (iterables)<br>Kiểm tra đồng nhất đối tượng<br>So sánh độ lớn, tập con và tập cha của set<br>Các toán tử so sánh bằng giá trị</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x | y</td>
                <td style="padding:8px 12px;">Phép OR bitwise, hợp tập hợp (set union), hợp nhất từ điển (dict merge)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x ^ y</td>
                <td style="padding:8px 12px;">Phép XOR bitwise, hiệu đối xứng tập hợp (symmetric difference)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x &amp; y</td>
                <td style="padding:8px 12px;">Phép AND bitwise, giao tập hợp (set intersection)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x &lt;&lt; y, x &gt;&gt; y</td>
                <td style="padding:8px 12px;">Dịch x sang trái hoặc phải y bit</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x + y, x - y</td>
                <td style="padding:8px 12px;">Phép cộng, ghép nối dãy (concatenation); Phép trừ, hiệu tập hợp</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x * y, x % y<br>x / y, x // y<br>x @ y</td>
                <td style="padding:8px 12px;">Nhân, lặp lại dãy; Chia lấy dư, định dạng chuỗi;<br>Phép chia thực (true) và chia lấy sàn (floor);<br>Nhân ma trận (chưa được Python cốt lõi cài sẵn)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">-x, +x, ~x</td>
                <td style="padding:8px 12px;">Đổi dấu âm, giữ nguyên dấu dương, đảo bit (inversion)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x ** y</td>
                <td style="padding:8px 12px;">Lũy thừa (power/exponentiation) — <em>nhóm từ phải sang trái</em></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">await x</td>
                <td style="padding:8px 12px;">Biểu thức await (các hàm bất đồng bộ async)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">x[i], x[i:j:k]<br>x(...)<br>x.attr</td>
                <td style="padding:8px 12px;">Lập chỉ mục (indexing cho dãy, ánh xạ, v.v.);<br>Cắt lát (slicing); Lời gọi hàm, phương thức, lớp;<br>Tham chiếu thuộc tính (attribute reference)</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-family:var(--font-mono);color:var(--accent-primary);">(...), [...], {...}</td>
                <td style="padding:8px 12px;">Tuple, biểu thức, generator expr; List, list comp; Dict, set, comprehensions</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Các Sắc thái Cú pháp Tinh tế trong Bảng 5-2',
      content: `
        <p>Mặc dù Bảng 5-2 đóng vai trò như một tài liệu tham khảo chuẩn mực, nhưng một số toán tử có các sắc thái tinh tế cần ghi nhớ:</p>
        <ul>
          <li><strong>Dấu ngoặc đơn bắt buộc:</strong> Bắt buộc đối với <code>yield</code> nếu nó không đứng một mình ở vế phải của một câu lệnh gán, cũng như đối với toán tử gán có tên <code>:=</code> (walrus operator) nếu nó được dùng trong một số ngữ cảnh nhất định (như biểu thức f-string hay tham số hàm).</li>
          <li><strong>Toán tử so sánh chuỗi:</strong> Các toán tử so sánh sẽ tự động so sánh mọi phần tử và có thể được viết nối tiếp thành chuỗi như một cú pháp rút gọn và tối ưu hóa tiềm năng (ví dụ: <code>X &lt; Y &lt; Z</code> tạo ra cùng kết quả với <code>X &lt; Y and Y &lt; Z</code>).</li>
          <li><strong>Toán tử nhân ma trận <code>@</code>:</strong> Python định nghĩa toán tử <code>@</code> dùng cho phép nhân ma trận nhưng bản thân ngôn ngữ cốt lõi không cung cấp phần hiện thực sẵn cho nó. Trừ khi bạn tự viết mã cài đặt phương thức <code>__matmul__</code> trong một class hoặc sử dụng một thư viện chuyên dụng như NumPy, nếu không toán tử này sẽ báo lỗi <code>TypeError</code>.</li>
          <li><strong>Lược bỏ dấu ngoặc đơn:</strong> Dấu ngoặc đơn dùng cho tuple đôi khi có thể được lược bỏ; khi được lược bỏ, dấu phẩy ngăn cách các phần tử của nó sẽ hoạt động giống như một toán tử có độ ưu tiên thấp nhất.</li>
          <li><strong>Các toán tử hoãn lại:</strong> Một số toán tử như <code>yield</code>, <code>lambda</code> và <code>await</code> liên quan đến những chủ đề lớn hơn và sẽ được khám phá chi tiết ở các phần sau của giáo trình.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Minh họa độ ưu tiên và toán tử gán walrus :=',
          code: `>>> x = 2 + 3 * 4   # Phép nhân * ưu tiên cao hơn phép cộng +
>>> x
14
>>> (x := 5) * 2     # Toán tử := bắt buộc bọc ngoặc khi nằm trong biểu thức
10
>>> x
5`,
          output: `14
10
5`,
          annotations: [
            { line: 1, text: 'Phép 3 * 4 = 12 được tính trước, sau đó 2 + 12 = 14.' },
            { line: 4, text: 'Toán tử := gán 5 cho x và đồng thời trả về giá trị 5 để nhân tiếp với 2.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    deepDive: [
      {
        title: 'Khung chuyên đề: Gặp gỡ những "no-op" của Python',
        content: `
          <p>Ký tự <code>@</code> được Python sử dụng để mở đầu các decorator của hàm (sẽ được trình bày ở phần sau của cuốn sách này), nhưng lại được chỉ định chính thức như một toán tử biểu thức nhân ma trận mà không hề có cài đặt mặc định trong nhân ngôn ngữ.</p>
          <p>Trong vai trò này, <code>@</code> gia nhập cùng <strong>Ellipsis (<code>...</code>)</strong> và <strong>gợi ý kiểu (type hinting)</strong> trở thành những công cụ cú pháp được định nghĩa ra nhưng hoàn toàn không được chính bản thân trình thông dịch Python cốt lõi thực thi hay kiểm tra (no-operation). Cứ như thể bạn chưa có đủ thứ thực tế cần phải học vậy!</p>
        `
      }
    ]
  },

  exercises: [
    {
      title: 'Dự đoán thứ tự đánh giá theo Bảng 5-2',
      level: 'Dễ',
      problem: 'Dựa vào Bảng 5-2, trong biểu thức <code>3 + 4 * 2 ** 3</code>, phép toán nào được thực hiện đầu tiên, thứ hai và thứ ba?',
      hint: 'So sánh vị trí của **, *, và + trong Bảng 5-2. Toán tử nằm càng thấp thì độ ưu tiên càng cao.',
      solutionCode: `# Biểu thức: 3 + 4 * 2 ** 3
# Bước 1: Lũy thừa 2 ** 3 = 8 (ưu tiên cao nhất trong 3 toán tử)
# Bước 2: Phép nhân 4 * 8 = 32
# Bước 3: Phép cộng 3 + 32 = 35
ket_qua = 3 + 4 * 2 ** 3
print("Kết quả:", ket_qua)`,
      solutionOutput: `Kết quả: 35`,
      explanation: 'Trong Bảng 5-2: <code>**</code> (lũy thừa) nằm thấp hơn <code>*</code> (nhân), và <code>*</code> lại nằm thấp hơn <code>+</code> (cộng). Do đó thứ tự thực hiện lần lượt là lũy thừa → nhân → cộng.'
    }
  ],

  quiz: [
    {
      question: 'Trong Bảng 5-2 của Mark Lutz, các toán tử được sắp xếp theo quy luật nào?',
      options: [
        'Theo thứ tự bảng chữ cái tên tiếng Anh của toán tử.',
        'Theo thứ tự độ ưu tiên tăng dần: toán tử nằm phía dưới có độ ưu tiên cao hơn toán tử nằm phía trên.',
        'Theo độ dài ký tự của biểu thức.',
        'Toán tử số học ở trên cùng, toán tử logic ở dưới cùng.'
      ],
      correctIndex: 1,
      explanation: 'Bảng 5-2 được sắp xếp theo thứ tự độ ưu tiên tăng dần: các toán tử nằm ở vị trí thấp hơn trong bảng có độ ưu tiên cao hơn và liên kết chặt chẽ hơn.'
    },
    {
      question: 'Toán tử nào sau đây trong Python cốt lõi được coi là "no-op" (không có phần hiện thực sẵn trong nhân ngôn ngữ)?',
      options: [
        'Toán tử chia lấy sàn //.',
        'Toán tử lũy thừa **.',
        'Toán tử nhân ma trận @.',
        'Toán tử dịch bit <<.'
      ],
      correctIndex: 2,
      explanation: 'Toán tử @ dùng cho phép nhân ma trận được định nghĩa cú pháp nhưng nhân Python cốt lõi không cung cấp mã cài đặt sẵn; bạn phải tự cài đặt trong class hoặc dùng thư viện ngoài như NumPy.'
    }
  ],

  summary: [
    'Biểu thức kết hợp đối tượng và toán tử để tính toán giá trị mới trong Python.',
    'Bảng 5-2 chuẩn hóa toàn diện 19 bậc độ ưu tiên của mọi toán tử trong ngôn ngữ Python.',
    'Toán tử nằm ở vị trí càng thấp trong Bảng 5-2 thì có độ ưu tiên càng cao (liên kết càng chặt).',
    'Toán tử walrus := cho phép gán trong biểu thức nhưng cần ngoặc đơn trong các ngữ cảnh phức tạp.',
    'Các công cụ như toán tử @, Ellipsis (...) và type hinting là những cú pháp chuẩn nhưng không được Python cốt lõi trực tiếp thực thi (no-op).'
  ]
};