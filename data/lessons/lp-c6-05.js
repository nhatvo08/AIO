export default {
  id: 'lp-c6-05',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.5',
  title: 'Chuyên đề Thu gom Rác: Tham chiếu Vòng (Cyclic References) & Module gc',
  subtitle: 'Đào sâu góc khuất của cơ chế dọn rác: bẫy tham chiếu vòng lặp vô tận và bộ phát hiện chu trình vòng của CPython',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu điểm yếu kinh điển của thuật toán đếm tham chiếu: hiện tượng tham chiếu vòng (circular / cyclic references).',
    'Thực nghiệm cách một đối tượng tự nhúng tham chiếu vào chính nó (ví dụ: L.append(L)) khiến bộ đếm không bao giờ về 0.',
    'Khám phá bộ phát hiện và thu gom chu trình vòng (cycle detector) của CPython cùng module thư viện chuẩn gc.',
    'Nhận biết sự khác biệt về cơ chế thu gom rác giữa CPython và các bản hiện thực hóa khác như PyPy, Jython.'
  ],

  intuition: {
    title: 'Bẫy hai người nắm chặt tay nhau',
    metaphor: 'Hãy tưởng tượng hai người bạn cùng bị rơi xuống một chiếc giếng sâu. Người A nắm chặt cổ tay người B, còn người B nắm chặt cổ tay người A. Ở trên miệng giếng, không còn sợi dây thừng nào thả xuống để kéo họ lên (chương trình chính đã xóa hết biến bên ngoài trỏ tới họ). Nếu chỉ nhìn vào số người đang nắm giữ tay họ (bộ đếm tham chiếu), mỗi người đều đang có đúng 1 bàn tay nắm chặt, nên theo quy tắc đếm thông thường, họ sẽ không bao giờ được giải phóng. Đây chính là bẫy tham chiếu vòng! CPython phải cử một "đội cứu hộ đặc biệt" (bộ thu gom chu trình vòng lặp gc) đi tuần tra, phát hiện ra cả hai người chỉ đang tự nắm tay nhau trong một ốc đảo cô lập, và giải phóng cả hai cùng lúc.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH THAM CHIẾU VÒNG (CYCLIC REFERENCE): L.append(L)</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:24px;padding:16px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
          <!-- Đối tượng List L -->
          <div style="display:flex;flex-direction:column;align-items:center;padding:16px 24px;background:#fef3c7;border:2px solid #d97706;border-radius:12px;">
            <div style="font-weight:700;color:#b45309;">Đối tượng Danh sách L</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Phần tử L[0] ─── trỏ ngược lại ───► chính L</div>
            <div style="font-size:0.75rem;color:var(--danger);font-weight:700;margin-top:6px;">ob_refcnt >= 1 (không bao giờ tự về 0!)</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--text-muted);">
          <em>Ngay cả khi câu lệnh 'del L' được chạy, đối tượng L vẫn tự tham chiếu tới chính nó nên cần module gc xử lý riêng.</em>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khung chuyên đề: Tìm hiểu thêm về Thu gom Rác trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 6 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Xét về mặt kỹ thuật thuần túy, cơ chế thu gom rác của Python chủ yếu dựa trên các <strong>bộ đếm tham chiếu (reference counters)</strong> như đã mô tả ở bài trước, nhưng nó còn tích hợp thêm một thành phần chuyên phát hiện và thu hồi kịp thời các đối tượng có chứa <strong>tham chiếu vòng (cyclic references)</strong>.</p>

        <p>Thành phần này có thể bị vô hiệu hóa nếu bạn chắc chắn rằng mã nguồn của mình không bao giờ tạo ra chu trình tham chiếu vòng, nhưng theo mặc định nó luôn được bật sẵn. Cả cơ chế đếm tham chiếu lẫn thành phần tùy chọn này đều thực hiện nhiệm vụ thu gom rác, song thành phần thứ hai có lẽ chính là điều mà người dùng của một số ngôn ngữ thiếu vắng bộ đếm tham chiếu (như Java hay Go) thường nghĩ tới khi nhắc đến thuật ngữ "thu gom rác" (garbage collection).</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Tham chiếu Vòng (Circular References) là gì?',
      content: `
        <p><strong>Tham chiếu vòng (circular references)</strong> là vấn đề kinh điển trong các bộ thu gom rác dựa trên đếm tham chiếu. Vì tham chiếu được hiện thực hóa dưới dạng con trỏ, nên một đối tượng hoàn toàn có thể tự tham chiếu tới chính nó, hoặc tham chiếu tới một đối tượng khác mà đối tượng đó lại trỏ ngược về nó.</p>

        <p>Chẳng hạn, như tác giả Mark Lutz nhắc lại từ bài tập 6 trong mục <em>"Kiểm tra kiến thức: Các bài tập Phần I"</em> ở trang 48 của bản gốc, chúng ta có thể tạo ra một chu trình vòng lặp cực kỳ dễ dàng bằng cách <strong>nhúng tham chiếu của một list vào chính nó</strong>:</p>
      `,
      codeExamples: [
        {
          title: 'Tạo chu trình tham chiếu vòng lặp với L.append(L)',
          code: `>>> L = []
>>> L.append(L)       # Nhúng chính tham chiếu L vào phần tử đầu tiên của L
>>> len(L)
1
>>> L[0] is L         # Phần tử L[0] chính là đối tượng L!
True
>>> L
[[...]]`,
          output: `1
True
[[...]]`,
          annotations: [
            { line: 2, text: 'Phương thức append nhúng con trỏ của L vào bên trong cấu trúc của chính nó.' },
            { line: 5, text: 'Toán tử is xác nhận L[0] trỏ vào đúng cùng một đối tượng danh sách với L.' },
            { line: 7, text: 'Python in ra [[...]] để báo hiệu sự xuất hiện của cấu trúc lồng nhau vô hạn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bộ Thu gom Chu trình gc và Khác biệt giữa các Bản Hiện thực',
      content: `
        <p>Hiện tượng tương tự cũng có thể xảy ra khi gán giá trị cho các thuộc tính của những đối tượng được tạo từ các lớp (classes) do người dùng tự định nghĩa (ví dụ: đối tượng Cha trỏ tới Con, và Con lại trỏ ngược về Cha). Dù tương đối hiếm gặp trong mã nguồn nghiệp vụ thông thường, nhưng vì số đếm tham chiếu của các đối tượng dạng này <strong>không bao giờ tự giảm về 0</strong> khi ta xóa các biến bên ngoài, nên chúng bắt buộc phải được xử lý theo một cơ chế đặc biệt.</p>

        <p>Để biết thêm chi tiết về bộ phát hiện và thu gom chu trình vòng của Python, bạn có thể tham khảo module <code>gc</code> trong thư viện chuẩn:</p>
        <ul>
          <li>Hàm <code>gc.collect()</code>: Kích hoạt thủ công một chu kỳ quét và dọn dẹp các đối tượng tham chiếu vòng mồ côi trong bộ nhớ.</li>
          <li>Hàm <code>gc.disable()</code> và <code>gc.enable()</code>: Tắt hoặc bật bộ dò chu trình tự động (thường dùng trong các hệ thống đòi hỏi hiệu năng thời gian thực cao).</li>
        </ul>

        <p>Điều tâm đắc nhất bạn cần ghi nhớ ở đây là: <strong>việc quản lý bộ nhớ dựa trên cơ chế thu gom rác đã được những chuyên gia kỳ cựu cài đặt sẵn sàng cho bạn trong Python</strong>; nó vận hành cực kỳ chuẩn xác và hiệu quả, ngay cả khi gặp phải các chu trình tham chiếu vòng phức tạp nhất.</p>

        <h3>Lưu ý về các bản phân phối khác CPython</h3>
        <p>Cũng xin lưu ý thêm rằng phần mô tả về bộ thu gom rác của Python trong chương này <strong>không nằm trong định nghĩa quy chuẩn cốt lõi của ngôn ngữ</strong> và chỉ áp dụng riêng cho bản hiện thực hóa tiêu chuẩn của Python (tức CPython). Các bản hiện thực hóa thay thế đã được giới thiệu trong Chương 2 như Jython (chạy trên JVM của Java), IronPython (chạy trên .NET của Microsoft) và PyPy (trình thông dịch JIT tối ưu hóa) có thể áp dụng các cơ chế thu gom rác hoàn toàn khác nhau—dẫu rằng hiệu quả chung cuộc ở tất cả các bản đều tương tự nhau: vùng không gian bộ nhớ không còn dùng tới luôn được tự động thu hồi cho bạn, dẫu không phải lúc nào cũng được thu hồi ngay tức thì.</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng module gc để kích hoạt dọn dẹp tham chiếu vòng',
          code: `import gc

# Tạo một chu trình tham chiếu vòng
L = []
L.append(L)
del L  # Biến L ngoài đã xóa, nhưng chu trình vòng vẫn tồn tại trong RAM

# Gọi bộ thu gom chu trình vòng dọn dẹp
unreachable_count = gc.collect()
print("Số đối tượng mồ côi đã được gc giải phóng:", unreachable_count)`,
          output: `Số đối tượng mồ côi đã được gc giải phóng: 1`,
          annotations: [
            { line: 5, text: 'Lệnh del L làm biến L biến mất, nhưng refcount của đối tượng danh sách vẫn là 1.' },
            { line: 8, text: 'gc.collect() truy quét đồ thị đối tượng và thu hồi chu trình mồ côi này.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    deepDive: [
      {
        title: 'Thuật toán Generational Garbage Collection của CPython',
        content: 'Bộ dò chu trình vòng của CPython chia các đối tượng thành 3 thế hệ (Generations: 0, 1, 2) dựa trên tuổi thọ sống sót qua các chu kỳ dọn dẹp. Các đối tượng mới sinh nằm ở Generation 0 và được kiểm tra thường xuyên nhất. Nếu một đối tượng sống sót qua nhiều đợt quét, nó được thăng cấp lên Generation 1 và 2 với tần suất quét thưa hơn, giúp tối ưu hóa hiệu năng tối đa.'
      }
    ]
  },

  exercises: [
    {
      level: 'Trung bình',
      title: 'Tạo và phát hiện tham chiếu vòng giữa hai đối tượng từ điển',
      problem: 'Hãy viết một đoạn mã tạo ra hai từ điển <code>d1</code> và <code>d2</code> sao cho <code>d1</code> chứa tham chiếu tới <code>d2</code> và <code>d2</code> chứa tham chiếu tới <code>d1</code>. Sau đó in ra để kiểm chứng hiện tượng lồng nhau vô hạn.',
      hint: 'Khởi tạo d1 = {}, d2 = {} trước, sau đó gán d1["other"] = d2 và d2["other"] = d1.',
      solutionCode: `d1 = {}
d2 = {}

d1["partner"] = d2
d2["partner"] = d1

print("d1['partner'] is d2:", d1["partner"] is d2)
print("d2['partner'] is d1:", d2["partner"] is d1)
print("Biểu diễn của d1:", d1)`,
      solutionOutput: `d1['partner'] is d2: True
d2['partner'] is d1: True
Biểu diễn của d1: {'partner': {'partner': {...}}}`,
      explanation: 'Khi in d1, Python phát hiện thấy chu trình vòng qua khóa "partner" nên hiển thị ký hiệu `{...}` để tránh rơi vào vòng lặp in vô tận làm tràn ngăn xếp.'
    }
  ],

  quiz: [
    {
      question: 'Tại sao cơ chế đếm tham chiếu (reference counting) đơn thuần không thể tự giải phóng các đối tượng tham chiếu vòng?',
      options: [
        'Vì các đối tượng tham chiếu vòng luôn bị hệ điều hành khóa quyền ghi.',
        'Vì các đối tượng trong chu trình tự trỏ vào nhau, khiến số đếm tham chiếu không bao giờ tự giảm về 0 dù biến bên ngoài đã bị xóa.',
        'Vì bộ đếm tham chiếu chỉ có tác dụng với các kiểu dữ liệu nguyên thủy như số nguyên int.',
        'Vì Python không hỗ trợ phép xóa del đối với các danh sách lồng nhau.'
      ],
      correctIndex: 1,
      explanation: 'Trong tham chiếu vòng, các đối tượng tự nắm giữ con trỏ trỏ tới nhau, do đó số đếm tham chiếu nội bộ luôn >= 1, khiến thuật toán đếm tham chiếu đơn thuần không thể phát hiện để giải phóng.'
    },
    {
      question: 'Module nào trong thư viện chuẩn của Python cung cấp các công cụ cấu hình và kích hoạt bộ thu gom chu trình vòng lặp?',
      options: [
        'Module sys',
        'Module gc',
        'Module os',
        'Module memory'
      ],
      correctIndex: 1,
      explanation: 'Module gc (Garbage Collector) trong thư viện chuẩn cung cấp giao diện lập trình để quản lý, cấu hình và kích hoạt bộ thu gom rác chu trình vòng của Python.'
    }
  ],

  summary: [
    'CPython kết hợp hai cơ chế dọn rác: bộ đếm tham chiếu chính và bộ phát hiện chu trình vòng lặp.',
    'Tham chiếu vòng xuất hiện khi đối tượng tự trỏ vào chính nó hoặc trỏ chéo lẫn nhau (như L.append(L)).',
    'Chu trình tham chiếu vòng làm refcount không thể về 0, đòi hỏi bộ dò chu trình giải phóng.',
    'Module gc trong thư viện chuẩn cho phép theo dõi và kích hoạt dọn dẹp chu trình vòng thủ công.',
    'Cơ chế GC này là đặc thù của bản CPython; các bản như PyPy, Jython sử dụng các thuật toán GC khác.'
  ]
};
