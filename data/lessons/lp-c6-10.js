export default {
  id: 'lp-c6-10',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.10',
  title: 'Kiểm tra Định danh bên dưới: id(), sys.getrefcount() & Đối tượng Bất tử',
  subtitle: 'Đào sâu vào tầng máy CPython: đo lường số đếm tham chiếu, địa chỉ ô nhớ và khái niệm Immortal Objects từ Python 3.12+',
  level: 'Trung cấp',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng hàm dựng sẵn id() để kiểm tra địa chỉ bộ nhớ RAM của các đối tượng trong CPython.',
    'Đo lường số lượng tham chiếu thực tế của một đối tượng thông qua hàm sys.getrefcount().',
    'Hiểu khái niệm Đối tượng Bất tử (Immortal Objects - PEP 683) được giới thiệu từ Python 3.12.',
    'Giải mã ý nghĩa của các con số refcount cực lớn (hơn 4 tỷ hoặc hơn 3 tỷ) trên các số nguyên nhỏ và hằng số đặc biệt.'
  ],

  intuition: {
    title: 'Chiếc kính lúp soi vào mạch vi xử lý của CPython',
    metaphor: 'Nếu như bình thường chúng ta chỉ quan sát Python ở tầng bề mặt như một người lái xe ô tô (đạp ga, bẻ lái), thì hai hàm id() và sys.getrefcount() giống như chiếc đồng hồ đo áp suất và máy quét X-quang giúp bạn nhìn thấu vào bên trong khối động cơ CPython. Hàm id() cho bạn biết tọa độ chính xác của chiếc bình nhiên liệu trong khoang máy; còn hàm getrefcount() cho biết có bao nhiêu đường ống đang hút nhiên liệu từ chiếc bình đó. Khi bạn soi vào những con số đặc biệt như số 99 hay giá trị None, bạn sẽ thấy chiếc đồng hồ đo áp suất báo một con số "vô cực" (Immortal). Điều này có nghĩa là khối linh kiện đó được đúc liền vào khung gầm xe—vĩnh viễn không bao giờ bị tháo dỡ trong suốt hành trình xe chạy.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH BỘ ĐẾM THAM CHIẾU: ĐỐI TƯỢNG BẤT TỬ VS ĐỐI TƯỢNG ĐỘNG</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <!-- Đối tượng Bất tử -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Đối tượng Bất tử (Ví dụ: 99, None)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              • Trạng thái: Lưu đệm vĩnh viễn (Immortal)<br>
              • <code>sys.getrefcount(99)</code> ──► <strong style="color:var(--accent-primary);">4,294,967,295</strong><br>
              • Trên Python 3.14.8: <strong style="color:var(--accent-primary);">3,221,225,472</strong><br>
              • <em>Không bao giờ bị thu hồi bộ nhớ!</em>
            </div>
          </div>
          <!-- Đối tượng Động bình thường -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:6px;">Đối tượng Động (Ví dụ: 2 ** 1000)</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">
              • Trạng thái: Cấp phát động tức thời<br>
              • <code>sys.getrefcount(2 ** 1000)</code> ──► <strong style="color:var(--success);">1</strong><br>
              • <em>Khi không còn biến trỏ tới, bị thu hồi về pool ngay lập tức!</em>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khám phá Bên dưới Cơ chế: Hàm id() và sys.getrefcount()',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 12 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Nếu bạn thực sự muốn đào sâu vào bên dưới cơ chế vận hành của CPython, có hai công cụ chuyên biệt giúp bạn giải phẫu trực tiếp:</p>
        <ul>
          <li><strong>Hàm dựng sẵn <code>id()</code>:</strong> Một cách trực tiếp để kiểm tra định danh đối tượng (trong bản hiện thực tiêu chuẩn CPython, hàm này trả về chính địa chỉ bộ nhớ RAM nơi đối tượng cư ngụ).</li>
          <li><strong>Hàm <code>sys.getrefcount()</code> trong module chuẩn <code>sys</code>:</strong> Trả về số lượng đếm tham chiếu hiện thời của đối tượng được truyền vào. <em>(Lưu ý: bản thân lời gọi hàm <code>getrefcount</code> sẽ tạo thêm một tham chiếu tạm thời tới đối tượng khi truyền đối số, do đó số đếm trả về luôn cao hơn thực tế 1 đơn vị).</em></li>
        </ul>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Đối tượng Bất tử (Immortal Objects) từ Python 3.12 Trở đi',
      content: `
        <p>Tuy nhiên, như tác giả Mark Lutz lưu ý, <strong>kể từ phiên bản Python 3.12</strong>, hàm <code>sys.getrefcount()</code> không còn thể hiện các con số nhỏ bé như trước đây đối với một số đối tượng cốt lõi, bởi vì nó sẽ trả về <strong>một số đếm cực kỳ lớn</strong> đối với các đối tượng được xem là <strong>bất tử (immortal)</strong>.</p>

        <p>Thuật ngữ "bất tử" (PEP 683) trong Python chỉ đơn thuần mang nghĩa kỹ thuật là: đối tượng được <strong>lưu đệm vĩnh viễn trong bộ nhớ RAM</strong> để tái sử dụng xuyên suốt toàn bộ phiên chạy của trình thông dịch, và trình thu gom rác tự động sẽ hoàn toàn bỏ qua việc tăng/giảm refcount thông thường của chúng để tránh xung đột luồng và cải thiện hiệu năng bộ nhớ đệm CPU.</p>

        <p>Hãy xem xét đoạn mã chạy thực nghiệm được Mark Lutz trình bày trong sách:</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra refcount và id trên đối tượng bất tử và đối tượng động',
          code: `>>> import sys
>>> sys.getrefcount(99)           # 99 là bất tử (được lưu bộ đệm)
4294967295
>>> sys.getrefcount(2 ** 1000)    # Nhưng giá trị này thì không
1
>>> id(99) == id(99)              # Cùng ID/cùng đối tượng (địa chỉ?)
True`,
          output: `4294967295
1
True`,
          annotations: [
            { line: 2, text: 'Số nguyên nhỏ 99 được ghim làm đối tượng bất tử, trả về số đếm khổng lồ 4,294,967,295 (2^32 - 1 trong Python 3.12).' },
            { line: 4, text: 'Số nguyên khổng lồ 2**1000 không được lưu đệm, tạo mới động và chỉ có 1 tham chiếu tạm thời từ chính getrefcount.' },
            { line: 6, text: 'id(99) == id(99) trả về True xác nhận hai lần gõ số 99 đều dùng chung một vùng nhớ duy nhất.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ghi chú Kỹ thuật: Khác biệt giữa Python 3.12 và Python 3.14.8',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-secondary);background:var(--bg-surface);margin:18px 0;">
          <div class="callout-header" style="font-weight:700;color:var(--accent-secondary);">
            <span>🔍</span>
            <span>Ghi chú của trang: Đối chiếu giá trị Immortal Refcount trên Python 3.14.8</span>
          </div>
          <div class="callout-body" style="font-size:0.88rem;line-height:1.6;">
            <p>Trong tài liệu sách giáo trình (viết ở thời điểm Python 3.12), lệnh <code>sys.getrefcount(99)</code> in ra giá trị <code>4294967295</code> (tức giá trị số nguyên không dấu $2^{32} - 1$ hay <code>0xFFFFFFFF</code>).</p>
            <p>Khi kiểm chứng trên môi trường <strong>Python 3.14.8</strong> tiêu chuẩn của trang web chúng ta, lệnh này trả về giá trị <strong><code>3221225472</code></strong> (tức <code>0xC0000000</code>). Sự khác biệt về con số hiển thị này bắt nguồn từ việc nhóm phát triển lõi CPython điều chỉnh lại định dạng cờ bit của hằng số nội bộ <code>_Py_IMMORTAL_REFCNT</code> để hỗ trợ dự án Python đa luồng không GIL (Free-threaded Python PEP 703). Tuy con số hiển thị khác nhau, nhưng bản chất kỹ thuật là hoàn toàn đồng nhất: <strong>số 99 là đối tượng bất tử vĩnh viễn không bị giải phóng khỏi RAM</strong>.</p>
          </div>
        </div>

        <p>Cơ chế lưu bộ đệm và tái sử dụng đối tượng này hoàn toàn không làm thay đổi ngữ nghĩa mã nguồn của bạn (trừ phi bạn chạy lệnh kiểm tra <code>is</code>!). Do bạn không thể thay đổi các con số hay chuỗi bất biến tại chỗ, nên việc có bao nhiêu tham chiếu cùng trỏ tới một đối tượng hoàn toàn không thành vấn đề—mọi tham chiếu sẽ luôn nhìn thấy cùng một giá trị bất biến như nhau cho dù tất cả chúng đều cùng trỏ vào một đối tượng được lưu đệm. Dẫu vậy, hành vi này phản ánh một trong nhiều giải pháp mà Python áp dụng để tối ưu hóa mô hình nhằm tăng tốc độ thực thi.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    deepDive: [
      {
        title: 'Mục đích của PEP 683 (Immortal Objects)',
        content: 'Trước Python 3.12, mỗi khi một luồng (thread) truy cập các đối tượng dùng chung như <code>None</code> hay các số nguyên nhỏ, Python phải liên tục tăng và giảm bộ đếm <code>ob_refcnt</code> trong bộ nhớ. Điều này làm mất hiệu lực của các dòng cache CPU L1/L2 và gây nghẽn hiệu năng trên các hệ thống đa nhân. Việc biến chúng thành "bất tử" cho phép các luồng chỉ đọc các đối tượng này mà không bao giờ cần ghi đè lên bộ đếm tham chiếu, mở đường cho việc loại bỏ hoàn toàn Global Interpreter Lock (GIL).'
      }
    ]
  },

  exercises: [
    {
      level: 'Trung bình',
      title: 'Kiểm tra tính bất tử của None, True và False',
      problem: 'Hãy viết đoạn mã kiểm tra xem ba đối tượng đơn bản <code>None</code>, <code>True</code> và <code>False</code> có phải là đối tượng bất tử (Immortal Objects) hay không bằng cách đọc <code>sys.getrefcount()</code>.',
      hint: 'Import module sys và so sánh getrefcount của chúng xem có vượt quá 1 tỷ hay không.',
      solutionCode: `import sys

for val in [None, True, False]:
    count = sys.getrefcount(val)
    is_immortal = count > 1_000_000_000
    print(f"Giá trị: {str(val):5} | Refcount: {count} | Bất tử: {is_immortal}")`,
      solutionOutput: `Giá trị: None  | Refcount: 3221225472 | Bất tử: True
Giá trị: True  | Refcount: 3221225472 | Bất tử: True
Giá trị: False | Refcount: 3221225472 | Bất tử: True`,
      explanation: 'Cả ba đối tượng đơn bản None, True và False đều là các đối tượng bất tử cốt lõi của CPython, sở hữu giá trị bộ đếm tham chiếu đặc biệt ghim cố định trong suốt vòng đời chương trình.'
    }
  ],

  quiz: [
    {
      question: 'Khái niệm "Đối tượng Bất tử" (Immortal Objects) trong Python 3.12+ mang ý nghĩa kỹ thuật là gì?',
      options: [
        'Là đối tượng không thể bị xóa bằng lệnh del và được lưu đệm vĩnh viễn trong suốt vòng đời trình thông dịch.',
        'Là đối tượng có thể tự động phục hồi dữ liệu khi máy tính bị mất điện đột ngột.',
        'Là đối tượng không thể bị virus máy tính tấn công.',
        'Là đối tượng chỉ có thể tồn tại trong các máy chủ đám mây.'
      ],
      correctIndex: 0,
      explanation: 'Đối tượng bất tử (Immortal Objects) trong CPython là các đối tượng được lưu đệm vĩnh viễn, bộ đếm tham chiếu được ghim cố định và bộ thu gom rác tự động hoàn toàn không can thiệp vào vòng đời của chúng.'
    },
    {
      question: 'Tại sao hàm sys.getrefcount(x) luôn trả về con số lớn hơn số lượng biến thực tế đang trỏ vào x một đơn vị?',
      options: [
        'Vì Python luôn cộng thêm 1 đơn vị làm số bù an toàn hệ thống.',
        'Vì bản thân việc truyền biến x làm đối số vào hàm sys.getrefcount(x) đã tự tạo thêm một tham chiếu tạm thời.',
        'Vì hệ điều hành luôn tự động trỏ một con trỏ kernel vào biến x.',
        'Vì hàm getrefcount tính cả biến trong tệp tin nguồn.'
      ],
      correctIndex: 1,
      explanation: 'Khi bạn gọi sys.getrefcount(x), tham số của hàm tạm thời nắm giữ con trỏ trỏ tới đối tượng trong suốt quá trình hàm thực thi, khiến số đếm tham chiếu tạm thời tăng thêm 1.'
    }
  ],

  summary: [
    'Hàm id() trả về định danh đối tượng (chính là địa chỉ bộ nhớ RAM trong CPython).',
    'Hàm sys.getrefcount() cho phép kiểm tra số lượng tham chiếu đang trỏ tới một đối tượng.',
    'Từ Python 3.12, các đối tượng bất tử (Immortal Objects) trả về số đếm tham chiếu khổng lồ.',
    'Các số nguyên nhỏ, None, True, False được lưu đệm vĩnh viễn để tối ưu hóa hiệu năng CPU cache.',
    'Cơ chế đối tượng bất tử không làm thay đổi logic mã nguồn đối với các kiểu dữ liệu bất biến.'
  ]
};
