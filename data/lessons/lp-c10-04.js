export default {
  id: 'lp-c10-04',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.4',
  title: 'Các Trường hợp Đặc biệt của Câu lệnh — Dấu chấm phẩy, Dòng nối tiếp & Khối lệnh một dòng',
  subtitle: 'Quy tắc dồn lệnh đơn bằng dấu chấm phẩy, công cụ vạn năng cặp ngoặc cho dòng nối tiếp (continuation lines), rủi ro của backslash và cú pháp một dòng',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững quy tắc dồn nhiều câu lệnh đơn trên một dòng bằng dấu chấm phẩy (;) và giới hạn áp dụng.',
    'Sử dụng thành thạo kỹ thuật dòng nối tiếp tự nhiên (continuation lines) bằng các cặp dấu ngoặc (), [], {}.',
    'Hiểu vì sao dấu ngoặc đơn () được coi là công cụ vạn năng để ngắt dòng cho mọi biểu thức phức tạp.',
    'Phân tích lý do vì sao quy tắc cũ dùng dấu gạch chéo ngược (\\) không được khuyến khích trong cộng đồng Python.',
    'Nhận diện cú pháp khối lệnh một dòng sau dấu hai chấm (:) và hiểu vì sao nên ưu tiên viết tách dòng cho công cụ đo lường (profiling/coverage).'
  ],

  intuition: {
    title: 'Những chiếc bản lề linh hoạt của cánh cửa',
    metaphor: 'Nếu như quy tắc "một dòng một lệnh" và "thụt lề tạo khối" giống như bức tường bê tông vững chãi của ngôi nhà, thì các quy tắc đặc biệt giống như những chiếc bản lề linh hoạt giúp cánh cửa có thể gập lại hoặc mở rộng khi cần thiết. Khi câu lệnh quá dài, bạn dùng cặp ngoặc giống như chiếc đai ôm để kéo dài nó qua nhiều tầng mà không sợ gãy nhịp. Khi các thao tác cực kỳ ngắn và gắn kết mật thiết, bạn dùng dấu chấm phẩy để xếp chúng nằm cạnh nhau trên một kệ sách. Tuy nhiên, sự linh hoạt này phải được sử dụng có chừng mực; nếu lạm dụng, ngôi nhà gọn gàng sẽ biến thành một mê cung rối rắm.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BA TRƯỜNG HỢP CÚ PHÁP ĐẶC BIỆT CỦA CÂU LỆNH PYTHON</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--warning);">1. DỒN LỆNH BẰNG ';'</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;"><code>a = 1; b = 2; print(a+b)</code><br>Chỉ áp dụng cho câu lệnh đơn. Không dùng cho compound statement.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">2. DÒNG NỐI TIẾP '()'</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;"><code>X = (A + B +<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C + D)</code><br>Cặp ngoặc (), [], {} cho phép trải dài nhiều dòng tự nhiên, bỏ qua thụt lề.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);">3. LỆNH MỘT DÒNG ':'</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px;"><code>if x &gt; y: print(x)</code><br>Phần thân đứng ngay sau dấu hai chấm nếu chỉ chứa câu lệnh đơn.</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Dồn Nhiều Câu Lệnh Đơn bằng Dấu Chấm Phẩy (;)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 10–12 / 21</strong>.</p>
          </div>
        </div>

        <p>Như chúng ta đã biết, theo quy chuẩn thông thường của Python, mỗi dòng mã nguồn chỉ xuất hiện đúng một câu lệnh. Tuy nhiên, Python cũng cung cấp một số quy tắc chuyên biệt tạo ra sự linh hoạt.</p>
        <p>Trước hết, bạn hoàn toàn có thể <strong>dồn nhiều hơn một câu lệnh lên cùng một dòng duy nhất bằng cách phân tách chúng bằng dấu chấm phẩy (<code>;</code>)</strong>:</p>
        <pre><code>a = 1; b = 2; print(a + b)  # Ba câu lệnh trên một dòng</code></pre>
        <p><strong>Điểm cốt lõi cần lưu ý:</strong></p>
        <ul>
          <li>Đây là <strong>nơi duy nhất trong Python mà dấu chấm phẩy bắt buộc phải có</strong>: với vai trò là <em>dấu phân tách câu lệnh (statement separator)</em>, chứ không phải dấu kết thúc câu lệnh như trong C.</li>
          <li>Điều này <strong>chỉ có tác dụng đối với các câu lệnh đơn (simple statements)</strong>, chẳng hạn như phép gán, lệnh gọi hàm <code>print()</code>, hoặc các lời gọi phương thức.</li>
          <li>Các câu lệnh phức hợp như phép kiểm tra <code>if</code>, vòng lặp <code>while</code>, <code>for</code> <em>vẫn bắt buộc phải xuất hiện trên các dòng riêng biệt của chúng</em>. Bạn không thể dồn cả một chương trình phức hợp lên một dòng!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Dồn nhiều câu lệnh đơn trên cùng một dòng bằng dấu chấm phẩy',
          code: `# Dồn 3 câu lệnh gán và in trên cùng một dòng
x = 10; y = 20; z = x * y; print(f"x={x}, y={y}, z={z}")

# Thử nghiệm dồn lệnh phức hợp if sẽ gây lỗi cú pháp ngay lập tức:
try:
    exec("a = 1; if a > 0: print('Lỗi')")
except SyntaxError as e:
    print("Không thể dồn câu lệnh phức hợp if sau dấu chấm phẩy:", type(e).__name__)`,
          output: `x=10, y=20, z=200
Không thể dồn câu lệnh phức hợp if sau dấu chấm phẩy: SyntaxError`,
          annotations: [
            { line: 2, text: 'Dấu chấm phẩy đóng vai trò phân tách 4 câu lệnh đơn liên tiếp trên một dòng duy nhất.' },
            { line: 6, text: 'Câu lệnh phức hợp if bắt buộc phải đứng đầu một dòng mới, không thể đứng sau dấu chấm phẩy.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Dòng Nối Tiếp Tự Nhiên với Cặp Dấu Ngoặc (), [], {}',
      content: `
        <p>Quy tắc đặc biệt thứ hai dành cho câu lệnh về cơ bản là ngược lại: <strong>bạn có thể làm cho một câu lệnh đơn trải dài qua nhiều dòng mã vật lý</strong>.</p>
        <p>Để làm được điều này một cách an toàn và thanh thoát nhất trong Python, bạn chỉ cần <strong>bao bọc một phần câu lệnh của mình trong một cặp dấu ngoặc—ngoặc đơn <code>()</code>, ngoặc vuông <code>[]</code>, hoặc ngoặc nhọn <code>{}</code></strong>.</p>
        <p>Mọi mã nguồn được bao bọc trong các cấu trúc này đều có thể vượt qua nhiều dòng: câu lệnh của bạn sẽ <em>không kết thúc cho đến khi Python đọc tới dòng chứa dấu đóng ngoặc tương ứng</em> của cặp ngoặc đó:</p>
        <pre><code>mylist = [1111,  # Dòng nối tiếp
          2222,  # Mọi mã trong (), [], {}
          3333]</code></pre>
        <p>Đặc tính nổi bật của kỹ thuật dòng nối tiếp này:</p>
        <ul>
          <li><strong>Bất kỳ cấu trúc tập hợp nào</strong> (list <code>[]</code>, dictionary <code>{}</code>, set <code>{}</code>, tuple <code>()</code>) cùng comprehension của chúng đều hỗ trợ trải dòng tự nhiên.</li>
          <li><strong>Độ thụt lề của các dòng nối tiếp không quan trọng</strong> đối với trình phân tích cú pháp Python (mặc dù theo lẽ thông thường bạn nên gióng hàng cho mắt dễ đọc).</li>
          <li><strong>Mọi chú thích <code>#</code></strong> trên các dòng nối tiếp vẫn được bỏ qua hoàn toàn như bình thường.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Dictionary và Comprehension trải dài nhiều dòng với chú thích',
          code: `# Dictionary trải qua nhiều dòng kèm comment ở từng mục
cau_hinh = {
    'may_chu': 'localhost',      # Địa chỉ IP máy chủ
    'cong_ket_noi': 8080,         # Cổng dịch vụ
    'che_do_debug': True,        # Bật cờ gỡ lỗi
    'cac_plugin': ['auth', 'log'] # Danh sách module mở rộng
}

print("Cấu hình cổng:", cau_hinh['cong_ket_noi'])
print("Số plugin:", len(cau_hinh['cac_plugin']))`,
          output: `Cấu hình cổng: 8080
Số plugin: 2`,
          annotations: [
            { line: 2, text: 'Cặp ngoặc nhọn mở đầu cho phép trải dòng tự do mà không cần ký tự nối dòng.' },
            { line: 3, text: 'Các comment sau dấu phẩy được trình phân tích cú pháp bỏ qua.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ngoặc Đơn () — Công Cụ Vạn Năng & Rủi Ro của Dấu Backslash (\\)',
      content: `
        <h3>Dấu ngoặc đơn () là công cụ vạn năng</h3>
        <p>Bởi vì <strong>bất kỳ biểu thức nào cũng có thể được bao bọc trong dấu ngoặc đơn</strong>, việc chỉ cần chèn một dấu mở ngoặc đơn <code>(</code> sẽ cho phép bạn tự do xuống dòng tiếp theo và viết tiếp câu lệnh của mình:</p>
        <pre><code>X = (A + B +
     C + D)</code></pre>
        <p>Kỹ thuật này hoạt động hoàn hảo cả bên trong các câu lệnh phức hợp. Bất cứ nơi nào bạn cần viết một biểu thức điều kiện dài, chỉ cần bọc nó trong dấu ngoặc đơn:</p>
        <pre><code>if (A == 1 and
    B == 2 and
    C == 3):
    print('hack' * 3)</code></pre>

        <h3>Quy tắc cũ dùng dấu gạch chéo ngược (\\) và lý do không khuyến khích</h3>
        <p>Một quy tắc cũ thừa hưởng từ ngôn ngữ C cho phép tạo dòng nối tiếp bằng cách kết thúc dòng trước bằng một <strong>dấu gạch chéo ngược (<code>\\</code>)</strong>:</p>
        <pre><code>X = A + B + \\
    C + D  # Giải pháp cũ dễ gây lỗi!</code></pre>
        <p>Kỹ thuật thay thế này ngày nay <strong>hoàn toàn không được khuyến khích</strong> bởi các chuyên gia Python vì những lý do rất nghiêm trọng:</p>
        <ol>
          <li>Dấu <code>\\</code> rất khó nhìn thấy bằng mắt thường và rất dễ bị vô tình xóa mất trong quá trình sửa đổi mã.</li>
          <li><strong>Cực kỳ mong manh:</strong> Tuyệt đối không được phép có bất kỳ khoảng trắng nào hay dấu chú thích <code>#</code> nào nằm phía sau dấu gạch chéo ngược.</li>
          <li><strong>Hậu quả khó lường:</strong> Nếu vô tình bỏ quên dấu <code>\\</code>, dòng tiếp theo có thể bị hiểu nhầm thành một câu lệnh mới hoàn toàn hợp lệ (trong ví dụ trên, <code>C + D</code> tự thân nó là một câu lệnh biểu thức hợp lệ và sẽ âm thầm được thực thi mà không báo lỗi, làm hỏng giá trị của <code>X</code>!).</li>
        </ol>
        <p>Vì vậy, khi ở trong xứ sở Python, hãy hành xử như các tín đồ Python (Pythoneers): <strong>theo quy tắc, hãy luôn dùng các cặp dấu ngoặc <code>()</code> thay vì dùng dấu <code>\\</code></strong>.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh điều kiện dài bọc ngoặc đơn vs dấu gạch chéo ngược',
          code: `a, b, c = 1, 2, 3

# Cách chuẩn mực Pythoneers: Bọc ngoặc đơn quanh toàn bộ biểu thức
if (a == 1 and
    b == 2 and
    c == 3):
    print("Điều kiện chuẩn mực thỏa mãn!")

# Cách cũ dùng backslash (dễ lỗi khoảng trắng vô hình phía sau dấu \\):
X = a + b + \\
    c
print("Giá trị X =", X)`,
          output: `Điều kiện chuẩn mực thỏa mãn!
Giá trị X = 6`,
          annotations: [
            { line: 4, text: 'Cặp ngoặc đơn mở và đóng giúp điều kiện trải dài trên 3 dòng cực kỳ an toàn.' },
            { line: 10, text: 'Dấu backslash nối dòng cũ, chỉ cần thêm 1 dấu cách sau nó là SyntaxError ngay lập tức.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Trường Hợp Đặc Biệt của Khối Lệnh: Cú Pháp Một Dòng',
      content: `
        <p>Có một trường hợp đặc biệt đối với quy tắc khối lệnh mà chúng ta thường bắt gặp:</p>
        <blockquote>
          <p><strong>Phần thân của một câu lệnh phức hợp trong Python có thể xuất hiện ngay trên cùng dòng với dòng tiêu đề, phía sau dấu hai chấm.</strong></p>
        </blockquote>
        <pre><code>if x &gt; y: print(x)</code></pre>
        <p>Điều này cho phép chúng ta viết các câu lệnh <code>if</code> trên một dòng, các vòng lặp <code>while</code> và <code>for</code> trên một dòng đơn giản. Tuy nhiên, tương tự như dấu phân tách <code>;</code>, điều này <strong>sẽ chỉ hoạt động nếu bản thân phần thân của câu lệnh phức hợp không chứa bất kỳ câu lệnh phức hợp nào khác</strong>.</p>
        <ul>
          <li>Chỉ có các câu lệnh đơn—phép gán, lời gọi hàm <code>print()</code>, lệnh <code>break</code>, <code>continue</code>—mới được phép đứng sau dấu hai chấm trên cùng một dòng.</li>
          <li>Các phần bổ sung của câu lệnh phức hợp (chẳng hạn như phần <code>else:</code> của một lệnh <code>if</code>) vẫn <strong>bắt buộc phải nằm trên các dòng riêng biệt của chính chúng</strong>.</li>
        </ul>

        <h3>Lời khuyên thiết kế: Giữ câu lệnh trên từng dòng riêng biệt</h3>
        <p>Nhìn chung, dù không phải lúc nào cũng bắt buộc, nếu bạn giữ hầu hết các câu lệnh của mình trên từng dòng riêng biệt và thụt lề chuẩn mực, mã nguồn của bạn sẽ dễ đọc và dễ chỉnh sửa hơn nhiều trong tương lai.</p>
        <p>Hơn thế nữa, <strong>các công cụ đo lường hiệu năng (profiling) và độ bao phủ mã (code coverage)</strong> thường đo lường theo từng dòng vật lý. Chúng sẽ không thể phân biệt được chi tiết giữa nhiều câu lệnh bị dồn ép trên một dòng, hoặc giữa dòng tiêu đề và phần thân của một câu lệnh một dòng.</p>
      `,
      codeExamples: [
        {
          title: 'Cú pháp câu lệnh một dòng hợp lệ và không hợp lệ',
          code: `x, y = 10, 5

# Hợp lệ: Câu lệnh đơn đứng sau dấu hai chấm
if x > y: print("x lớn hơn y")

# Hợp lệ: Vòng lặp đơn một dòng
for i in (1, 2, 3): print(i, end=' ')
print()

# Không hợp lệ: Không thể viết if lồng if hoặc if có else trên cùng một dòng
try:
    exec("if x > y: if x > 20: print('quá lớn')")
except SyntaxError:
    print("Bắt lỗi: Không thể lồng câu lệnh phức hợp trên một dòng!")`,
          output: `x lớn hơn y
1 2 3 
Bắt lỗi: Không thể lồng câu lệnh phức hợp trên một dòng!`,
          annotations: [
            { line: 4, text: 'Câu lệnh if một dòng chỉ hợp lệ khi thân lệnh là một câu lệnh đơn.' },
            { line: 12, text: 'Lồng câu lệnh phức hợp if trong if trên một dòng bị trình phân tích cú pháp từ chối.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào nên dùng câu lệnh một dòng?',
        content: 'Một ngoại lệ rất phổ biến và được chấp nhận rộng rãi trong thực tế là việc viết câu lệnh thoát vòng lặp một dòng: <code>if condition: break</code> hoặc <code>if condition: continue</code>. Cách viết này giúp tiết kiệm một dòng mã thừa mà vẫn bảo toàn độ trong sáng của thuật toán.'
      }
    ],
    pitfalls: [
      {
        title: 'Cạm bẫy khoảng trắng vô hình sau dấu gạch chéo ngược (\\)',
        content: 'Khi sử dụng <code>\\</code> để nối dòng, nếu trình soạn thảo hoặc người sửa vô tình để lại dù chỉ một ký tự dấu cách (space) hoặc tab ở phía sau dấu <code>\\</code>, Python sẽ báo lỗi <code>SyntaxError: unexpected character after line continuation character</code>. Hãy luôn dùng cặp ngoặc <code>()</code> để an toàn tuyệt đối.'
      }
    ],
    deepDive: {
      title: 'Tác động của câu lệnh một dòng đến công cụ kiểm thử (Coverage Tools)',
      content: '<p>Khi chạy các công cụ đo độ bao phủ mã như <code>coverage.py</code> hoặc <code>pytest-cov</code>, báo cáo đo lường dựa trên số dòng vật lý (line-by-line). Nếu bạn viết <code>if error: raise ValueError()</code> trên cùng một dòng, công cụ kiểm thử sẽ không thể báo cáo chính xác liệu nhánh lỗi đó đã được kiểm thử thực thi hay chưa.</p>'
    }
  },

  exercises: [
    {
      title: 'Sử dụng cặp ngoặc đơn để ngắt một biểu thức logic phức tạp',
      level: 'Dễ',
      problem: 'Viết lại câu lệnh if sau đây trải dài trên 3 dòng bằng cách sử dụng công cụ vạn năng cặp ngoặc đơn ():\\n\\n<code>if nhiet_do > 35 and do_am > 80 and not troi_mua: print("Thời tiết oi bức")</code>',
      hint: 'Bao bọc toàn bộ 3 điều kiện trong một cặp ngoặc đơn ( ... ) và ngắt dòng sau toán tử and.',
      solutionCode: `nhiet_do = 38
do_am = 85
troi_mua = False

if (nhiet_do > 35 and
    do_am > 80 and
    not troi_mua):
    print("Thời tiết oi bức")`,
      solutionOutput: `Thời tiết oi bức`,
      explanation: 'Việc bao bọc điều kiện trong cặp ngoặc đơn cho phép ngắt dòng tự nhiên mà không cần đến ký tự backslash, giúp biểu thức trở nên vô cùng rõ ràng và an toàn.'
    },
    {
      title: 'Phát hiện sự cố khi dồn nhiều câu lệnh đơn bằng dấu chấm phẩy',
      level: 'Trung bình',
      problem: 'Đoạn mã sau có hợp lệ trong Python hay không? Kết quả in ra là gì?\\n\\n<code>x = 5; y = x * 2; print(x, y)</code>',
      hint: 'Hãy kiểm tra xem các câu lệnh này có phải toàn bộ là câu lệnh đơn hay không.',
      solutionCode: `x = 5; y = x * 2; print(x, y)`,
      solutionOutput: `5 10`,
      explanation: 'Đoạn mã hoàn toàn hợp lệ vì cả ba thành phần đều là câu lệnh đơn (hai phép gán và một lời gọi hàm print). Dấu chấm phẩy đóng vai trò dấu phân tách giữa chúng.'
    }
  ],

  quiz: [
    {
      question: 'Dấu chấm phẩy (;) bắt buộc phải xuất hiện trong tình huống nào trong Python?',
      options: [
        'Ở cuối mỗi dòng lệnh giống như trong C và Java.',
        'Chỉ khi bạn muốn dồn nhiều câu lệnh đơn lên cùng một dòng duy nhất.',
        'Ở sau dòng tiêu đề kết thúc bằng dấu hai chấm.',
        'Ở trước mọi biểu thức điều kiện của câu lệnh if.'
      ],
      correctIndex: 1,
      explanation: 'Dấu chấm phẩy chỉ bắt buộc trong Python với vai trò là dấu phân tách khi bạn muốn dồn nhiều câu lệnh đơn lên cùng một dòng duy nhất.'
    },
    {
      question: 'Phương pháp nào sau đây là cách chuẩn mực và an toàn nhất được cộng đồng Python (Pythoneers) khuyến nghị để làm cho một biểu thức trải dài trên nhiều dòng?',
      options: [
        'Đặt dấu gạch chéo ngược (\\) ở cuối mỗi dòng.',
        'Bao bọc biểu thức trong cặp dấu ngoặc đơn ().',
        'Sử dụng thẻ chú thích # để ngắt dòng.',
        'Chèn từ khóa continue vào giữa biểu thức.'
      ],
      correctIndex: 1,
      explanation: 'Dấu ngoặc đơn () là công cụ vạn năng, an toàn và tự nhiên nhất để nối dòng trong Python. Dấu gạch chéo ngược (\\) dễ sinh lỗi và không được khuyến khích.'
    },
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về việc viết phần thân của câu lệnh phức hợp trên cùng một dòng sau dấu hai chấm?',
      options: [
        'Có thể lồng thoải mái một câu lệnh if phức hợp khác ở phía sau dấu hai chấm.',
        'Chỉ được phép nếu phần thân hoàn toàn chỉ chứa các câu lệnh đơn (như phép gán, print, break).',
        'Phần else của câu lệnh if cũng có thể dồn tiếp vào phía sau dấu hai chấm.',
        'Python 3 đã cấm hoàn toàn cách viết này.'
      ],
      correctIndex: 1,
      explanation: 'Phần thân câu lệnh phức hợp chỉ có thể nằm trên cùng dòng với header nếu nó chỉ chứa các câu lệnh đơn. Các câu lệnh phức hợp khác hoặc phần else vẫn bắt buộc phải ở dòng riêng.'
    }
  ],

  summary: [
    'Dấu chấm phẩy (;) là dấu phân tách câu lệnh cho phép dồn nhiều câu lệnh đơn trên cùng một dòng.',
    'Dòng nối tiếp tự nhiên (continuation lines) bằng cặp ngoặc (), [], {} cho phép trải dài mã nguồn qua nhiều dòng mà không cần dấu gạch chéo ngược.',
    'Dấu ngoặc đơn () là công cụ vạn năng để ngắt dòng cho mọi biểu thức tính toán hoặc điều kiện phức tạp.',
    'Dấu gạch chéo ngược (\\) là giải pháp cũ dễ gây lỗi (do khoảng trắng vô hình) và không được khuyến khích.',
    'Thân câu lệnh phức hợp có thể xuất hiện sau dấu hai chấm nếu chỉ chứa câu lệnh đơn (như if condition: break).',
    'Chuẩn mực thiết kế tối ưu là giữ mỗi câu lệnh trên một dòng riêng để hỗ trợ tốt nhất cho mắt người đọc và các công cụ profiling/coverage.'
  ]
};
