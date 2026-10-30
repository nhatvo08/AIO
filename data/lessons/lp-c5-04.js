export default {
  id: 'lp-c5-04',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.4',
  title: 'Số học trong thực tế: Biến, Biểu thức & Phép gán cơ bản',
  subtitle: 'Thực hành dòng lệnh REPL: 4 quy tắc biến, bẫy NameError và so sánh thứ tự đánh giá',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững 4 quy tắc vàng chi phối vòng đời và hành vi của biến trong Python.',
    'Thực hành các biểu thức số học cơ bản (+, -, *, /, %, **) trong môi trường tương tác REPL.',
    'Hiểu nguyên nhân và cách phòng tránh lỗi NameError khi sử dụng biến chưa gán giá trị.',
    'Nhận biết hành vi trả về bộ tuple khi đánh giá nhiều biểu thức ngăn cách bởi dấu phẩy.'
  ],

  intuition: {
    title: 'Những chiếc thẻ tên và chiếc giỏ giá trị',
    metaphor: 'Trong nhiều ngôn ngữ lập trình truyền thống như C hay Java, bạn phải đăng ký trước một chiếc hộp cố định (khai báo int x;) rồi mới được đặt đồ vào. Nhưng trong Python, một "biến" không phải là cái hộp đựng giá trị, mà chỉ là một "chiếc thẻ tên" (tag). Khi bạn viết a = 3, Python tạo ra đối tượng số nguyên 3 trong bộ nhớ rồi dán chiếc thẻ tên "a" lên nó. Nếu bạn đòi gọi một chiếc thẻ tên chưa từng được dán lên bất kỳ vật thể nào (ví dụ c * 2 khi chưa có c), Python sẽ ngay lập tức giơ cờ cảnh báo: NameError!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH BIẾN LÀ NHÃN TÊN THAM CHIẾU TỚI ĐỐI TƯỢNG</div>
        <div style="display:flex;justify-content:space-around;align-items:center;flex-wrap:wrap;gap:16px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="padding:6px 14px;background:var(--accent-soft);border:1px solid var(--accent-primary);border-radius:6px;font-weight:700;color:var(--accent-text);">Tên: a</div>
            <div style="color:var(--accent-primary);font-size:1.2rem;">──►</div>
            <div style="padding:8px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:50%;font-weight:700;color:var(--success);">3</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="padding:6px 14px;background:var(--accent-soft);border:1px solid var(--accent-primary);border-radius:6px;font-weight:700;color:var(--accent-text);">Tên: b</div>
            <div style="color:var(--accent-primary);font-size:1.2rem;">──►</div>
            <div style="padding:8px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:50%;font-weight:700;color:var(--success);">4</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="padding:6px 14px;background:#fef2f2;border:1px dashed var(--danger);border-radius:6px;font-weight:700;color:var(--danger);">Tên: c</div>
            <div style="color:var(--danger);font-size:1.2rem;">──✗</div>
            <div style="font-size:0.75rem;color:var(--danger);">NameError!</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Biến và 4 Quy tắc Nền tảng trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 9 / 38 – Trang 11 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Cách tốt nhất để hiểu về các đối tượng số học và biểu thức là chứng kiến chúng hoạt động trong thực tế thông qua dòng lệnh tương tác REPL. Trong mã lệnh thực tế, chúng ta sử dụng <strong>biến (variables)</strong> để lưu vết thông tin. Biến đơn giản chỉ là các cái tên do bạn hoặc Python tạo ra.</p>
        <p>Mark Lutz tổng kết <strong>4 quy tắc nền tảng</strong> chi phối hoạt động của biến trong Python:</p>
        <ol>
          <li><strong>Biến được tạo ra khi chúng lần đầu tiên được gán giá trị:</strong> Không có câu lệnh khai báo biến riêng biệt (như <code>int a;</code> trong C).</li>
          <li><strong>Biến được thay thế bằng giá trị của chúng khi xuất hiện trong biểu thức:</strong> Khi tính toán, Python tìm đối tượng mà biến đang tham chiếu tới để lấy giá trị.</li>
          <li><strong>Biến bắt buộc phải được gán giá trị trước khi có thể được dùng trong biểu thức:</strong> Dùng một biến chưa gán sẽ kích hoạt lỗi <code>NameError</code> ngay lập tức.</li>
          <li><strong>Biến tham chiếu (reference) tới các đối tượng và không cần phải khai báo trước:</strong> Kiểu dữ liệu thuộc về đối tượng, không thuộc về biến.</li>
        </ol>

        <h4>Chú thích (Comments) trong mã nguồn</h4>
        <p>Văn bản nằm sau dấu thăng <code>#</code> và kéo dài đến cuối dòng được xem là chú thích và sẽ bị Python bỏ qua. Chú thích mô tả các khía cạnh của mã lệnh nhằm hỗ trợ cho những người khác (và chính bạn sáu tháng sau!). Khi thực hành gõ lệnh trong REPL, bạn không bắt buộc phải gõ các đoạn chú thích sau dấu <code>#</code>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Thực hành Biểu thức Số học Cơ bản trong REPL',
      content: `
        <p>Hãy khởi động một phiên làm việc tương tác và thử nghiệm các phép gán biến cùng các toán tử số học cơ bản:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo biến và tính toán biểu thức',
          code: `>>> a = 3          # Tên được tạo: không cần phải khai báo trước
>>> b = 4
>>> a + 1, a - 1   # Phép cộng (3 + 1), phép trừ (3 - 1)
(4, 2)
>>> b * 3, b / 2   # Phép nhân (4 * 3), phép chia (4 / 2)
(12, 2.0)
>>> a % 2, b ** 2  # Chia lấy dư (phần dư), lũy thừa (4 ** 2)
(1, 16)
>>> 2 + 4.0, 2.0 ** b  # Chuyển đổi kiểu hỗn hợp
(6.0, 16.0)`,
          output: `(4, 2)
(12, 2.0)
(1, 16)
(6.0, 16.0)`,
          annotations: [
            { line: 3, text: 'Khi gõ nhiều biểu thức ngăn cách bởi dấu phẩy, Python tự động gom kết quả vào một bộ tuple (4, 2).' },
            { line: 5, text: 'Phép chia b / 2 (4 / 2) cho kết quả là 2.0 (float) vì toán tử / luôn thực hiện phép chia thực.' },
            { line: 7, text: 'Toán tử % tính số dư (3 % 2 = 1); ** tính lũy thừa (4 ** 2 = 16).' },
            { line: 9, text: 'Biểu thức hỗn hợp tự động nâng kiểu số nguyên lên float.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bẫy NameError & Sự Khác Biệt Khi Nhóm Dấu Ngoặc Đơn',
      content: `
        <p>Nếu bạn cố tình sử dụng một biến chưa từng được gán giá trị, Python sẽ báo lỗi thay vì tự động gán cho nó một giá trị mặc định nào đó (như <code>0</code> hay <code>None</code>):</p>
        <pre class="code-block"><code>>>> c * 2
NameError: name 'c' is not defined</code></pre>
        <p>Quy tắc này có nghĩa là bạn luôn phải khởi tạo biến trước khi dùng: đặt biến đếm bằng <code>0</code> trước khi cộng dồn, tạo danh sách rỗng <code>[]</code> trước khi thêm phần tử, v.v.</p>

        <h4>So sánh thứ tự đánh giá có và không có dấu ngoặc đơn</h4>
        <p>Hãy xem hai biểu thức sau để thấy rõ sự khác biệt giữa quy tắc ưu tiên mặc định và việc ép thứ tự bằng dấu ngoặc đơn:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh b / 2 + a và b / (2 + a)',
          code: `>>> a, b = 3, 4
>>> b / 2 + a        # Tương đương ((4 / 2) + 3) -> 2.0 + 3
5.0
>>> b / (2 + a)      # Tương đương (4 / (2 + 3)) -> 4 / 5
0.8
>>> b // 2 + a       # Phép chia lấy sàn //: 4 // 2 = 2; 2 + 3 = 5
5
>>> b // (2 + a)     # Phép chia lấy sàn //: 4 // 5 = 0 (cắt bỏ phần lẻ)
0
>>> b // 2.0 + a     # Toán hạng float khiến kết quả // là float
5.0
>>> b // (2.0 + a)
0.0`,
          output: `5.0
0.8
5
0
5.0
0.0`,
          annotations: [
            { line: 3, text: 'Phép chia / ưu tiên cao hơn phép cộng +, được tính trước.' },
            { line: 5, text: 'Dấu ngoặc đơn ép buộc phép cộng 2 + a (5) thực hiện trước, sau đó mới chia 4 / 5 = 0.8.' },
            { line: 7, text: 'Toán tử chia sàn // trả về số nguyên 5 nếu các toán hạng là số nguyên.' },
            { line: 11, text: 'Khi có toán hạng float (2.0), chia sàn trả về float tương ứng (5.0 và 0.0).' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy NameError do không khởi tạo biến',
        content: 'Python không có cơ chế "giá trị rác" hay tự động gán giá trị mặc định cho biến. Lệnh <code>total += price</code> khi <code>total</code> chưa từng được gán <code>total = 0</code> sẽ lập tức làm sập chương trình với lỗi <code>NameError</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Khởi tạo biến đếm an toàn và tính toán tỷ lệ',
      level: 'Dễ',
      problem: 'Viết đoạn mã khởi tạo 2 biến <code>tong_diem = 85</code> và <code>so_mon = 10</code>. Hãy tính điểm trung bình bằng phép chia thực <code>/</code> và điểm trung bình làm tròn xuống bằng phép chia sàn <code>//</code>.',
      hint: 'Dùng / cho chia thực và // cho chia sàn.',
      solutionCode: `tong_diem = 85
so_mon = 10

dtb_thuc = tong_diem / so_mon
dtb_san = tong_diem // so_mon

print("Điểm trung bình thực:", dtb_thuc)
print("Điểm trung bình sàn:", dtb_san)`,
      solutionOutput: `Điểm trung bình thực: 8.5
Điểm trung bình sàn: 8`,
      explanation: 'Phép chia thực <code>/</code> giữ nguyên phần thập phân <code>8.5</code> (kiểu float). Phép chia sàn <code>//</code> cắt bỏ phần lẻ thập phân, chỉ giữ lại phần nguyên <code>8</code> (kiểu int).'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn thực thi biểu thức chứa một biến chưa từng xuất hiện trong câu lệnh gán nào, Python sẽ phản ứng thế nào?',
      options: [
        'Tự động khởi tạo biến đó bằng giá trị 0.',
        'Tự động khởi tạo biến đó bằng giá trị None.',
        'Báo lỗi NameError: name is not defined.',
        'Báo lỗi TypeError: unsupported operand type.'
      ],
      correctIndex: 2,
      explanation: 'Theo quy tắc số 3 của Mark Lutz: biến bắt buộc phải được gán giá trị trước khi có thể được dùng trong biểu thức, nếu không Python sẽ báo NameError.'
    },
    {
      question: 'Tại sao kết quả của dòng lệnh ">>> a + 1, a - 1" lại được hiển thị bên trong cặp dấu ngoặc đơn "(4, 2)"?',
      options: [
        'Vì Python luôn bọc mọi kết quả số học trong ngoặc đơn.',
        'Vì dấu phẩy ngăn cách hai biểu thức đã tự động tạo ra một đối tượng tuple chứa hai giá trị.',
        'Vì phép toán có độ ưu tiên thấp nhất.',
        'Vì dấu ngoặc đơn biểu thị một biểu thức chưa hoàn thành.'
      ],
      correctIndex: 1,
      explanation: 'Các dòng được gõ tại dấu nhắc chứa hai biểu thức ngăn cách bởi dấu phẩy tạo thành một bộ giá trị (tuple); đó là lý do kết quả được hiển thị trong dấu ngoặc đơn.'
    }
  ],

  summary: [
    'Biến trong Python được tạo khi gán, thay thế bằng giá trị khi tính toán, và không cần khai báo trước.',
    'Sử dụng biến chưa được gán giá trị sẽ gây lỗi NameError.',
    'Chú thích bắt đầu bằng dấu # kéo dài đến hết dòng và bị trình thông dịch bỏ qua.',
    'Toán tử chia thực / luôn trả về float, trong khi chia sàn // cắt phần thập phân về số nguyên nhỏ hơn liền kề.',
    'Nhiều biểu thức ngăn cách bởi dấu phẩy tự động tạo thành một bộ tuple giá trị.'
  ]
};