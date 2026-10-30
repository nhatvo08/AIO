export default {
  id: 'lp-c6-04',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.4',
  title: 'Đối tượng được Thu gom Rác Tự động: Vòng đời & Bộ đếm Tham chiếu',
  subtitle: 'Khám phá cái kết trong vòng đời của đối tượng: cơ chế giải phóng bộ nhớ tự động qua bộ đếm tham chiếu về 0',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu số phận của một đối tượng trong bộ nhớ khi biến tham chiếu tới nó bị gán đè sang đối tượng khác.',
    'Nắm vững khái niệm cơ chế Thu gom rác tự động (Garbage Collection - GC) trong Python.',
    'Phân tích cách CPython duy trì bộ đếm tham chiếu (reference counter) và thu hồi tức thì về vùng bộ nhớ trống (free memory pool) khi bộ đếm về 0.',
    'Nhận thức rõ lợi ích to lớn của GC so với việc phải tự tay quản lý sổ sách bộ nhớ phức tạp trong C/C++.'
  ],

  intuition: {
    title: 'Người dọn phòng khách sạn vô hình',
    metaphor: 'Hãy tưởng tượng bộ nhớ máy tính giống như các phòng trong một khách sạn lớn. Mỗi đối tượng (số 99, chuỗi "Python") là một vị khách đang thuê phòng. Mỗi biến trỏ tới đối tượng giống như một chiếc chìa khóa phòng đang được trao cho một người quản lý. Miễn là còn ít nhất 1 chiếc chìa khóa đang được giữ (bộ đếm tham chiếu > 0), vị khách vẫn được ở trong phòng. Nhưng ngay khi chiếc chìa khóa cuối cùng bị thu hồi (khi biến x chuyển sang cầm chìa khóa phòng khác), bộ đếm số người giữ chìa khóa lập tức rơi về 0. Ngay lập tức trong tích tắc, một nhân viên dọn phòng vô hình (Garbage Collector) sẽ bước vào dọn dẹp sạch sẽ căn phòng, trả lại phòng trống cho khách sạn để đón vị khách mới tiếp theo.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">VÒNG ĐỜI VÀ SỰ THU HỒI BỘ NHỚ KHI GÁN LẠI BIẾN x</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
          <!-- Bước 1 -->
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. x = 99</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
              • Tạo đối tượng 99<br>
              • refcount(99) = 1<br>
              • Biến x trỏ tới 99
            </div>
          </div>
          <!-- Bước 2 -->
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);">2. x = 'Python'</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
              • Tạo đối tượng 'Python'<br>
              • refcount(99) rơi về 0<br>
              • <strong style="color:var(--danger);">Thu hồi 99 ngay lập tức!</strong>
            </div>
          </div>
          <!-- Bước 3 -->
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);">3. x = [1, 2, 3]</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">
              • Tạo list [1, 2, 3]<br>
              • refcount('Python') về 0<br>
              • <strong style="color:var(--danger);">Thu hồi 'Python' ngay lập tức!</strong>
            </div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--text-muted);">
          <em>Vùng nhớ của đối tượng cũ lập tức được hoàn trả về vùng nhớ trống (free memory pool).</em>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Số phận của Đối tượng Cũ khi Biến được Gán lại',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 5 / 17 – Trang 6 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Trong các ví dụ ở phần trước, chúng ta đã gán biến <code>a</code> cho các kiểu đối tượng khác nhau trong từng phép gán. Nhưng khi chúng ta gán lại một biến, điều gì sẽ thực sự xảy ra với giá trị mà trước đó biến đang tham chiếu tới? Chẳng hạn, sau hai câu lệnh dưới đây, số phận của đối tượng <code>3</code> sẽ ra sao?</p>
      `,
      codeExamples: [
        {
          title: 'Câu hỏi kinh điển về số phận của đối tượng cũ',
          code: `>>> a = 3
>>> a = 'text'`,
          output: ``,
          annotations: [
            { line: 1, text: 'a tham chiếu tới đối tượng số 3.' },
            { line: 2, text: 'a chuyển sang tham chiếu chuỗi \'text\'. Số phận của số 3 sẽ đi về đâu?' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Cơ chế Thu gom Rác Tự động (Garbage Collection)',
      content: `
        <p>Câu trả lời của Mark Lutz là: trong Python, bất cứ khi nào một tên biến được gán cho một đối tượng mới, <strong>vùng không gian bộ nhớ do đối tượng cũ chiếm giữ sẽ được tự động thu hồi</strong> nếu như nó không còn được bất kỳ tên biến hay đối tượng nào khác tham chiếu tới.</p>

        <p>Cơ chế tự động giải phóng vùng không gian của các đối tượng không còn được sử dụng này được gọi là <strong>thu gom rác tự động (garbage collection - GC)</strong>, và nó giúp cuộc sống của các lập trình viên làm việc với những ngôn ngữ hỗ trợ tính năng này như Python trở nên "dễ thở" hơn rất nhiều.</p>

        <p>Để minh họa rõ hơn quá trình này, hãy xem xét ví dụ sau đây, trong đó tên biến <code>x</code> được gán cho một đối tượng khác nhau ở mỗi phép gán liên tiếp:</p>
      `,
      codeExamples: [
        {
          title: 'Chuỗi gán biến và quá trình thu hồi bộ nhớ liên tiếp',
          code: `>>> x = 99
>>> x = 'Python'    # Thu hồi 99 ngay (trừ khi có tham chiếu khác)
>>> x = 3.1415      # Thu hồi 'Python' ngay (tương tự)
>>> x = [1, 2, 3]   # Thu hồi 3.1415 ngay (tương tự)`,
          output: ``,
          annotations: [
            { line: 1, text: 'Biến x tham chiếu tới số nguyên 99.' },
            { line: 2, text: 'Gán x sang chuỗi \'Python\'. Số 99 hết người tham chiếu -> được thu hồi.' },
            { line: 3, text: 'Gán x sang số thực 3.1415. Chuỗi \'Python\' hết người tham chiếu -> được thu hồi.' },
            { line: 4, text: 'Gán x sang danh sách [1, 2, 3]. Số 3.1415 -> được thu hồi.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cơ chế Bộ đếm Tham chiếu và Vùng nhớ Trống',
      content: `
        <p>Quan sát đoạn mã trên, có hai điểm then chốt cần ghi nhớ:</p>
        <ul>
          <li><strong>Thứ nhất:</strong> <code>x</code> được gán cho một kiểu đối tượng khác nhau ở mỗi lần. Trông như thể kiểu của <code>x</code> biến đổi theo thời gian, nhưng thực chất không phải như vậy. Tên biến chỉ là các tham chiếu khái quát trỏ tới đối tượng, nên loại mã nguồn này hoạt động hết sức tự nhiên.</li>
          <li><strong>Thứ hai:</strong> Các tham chiếu tới đối tượng trước đó bị loại bỏ dần trên suốt hành trình đó. Mỗi khi <code>x</code> được gán cho một đối tượng mới, Python sẽ thu hồi không gian bộ nhớ của đối tượng trước đó (giả định rằng nó không được tham chiếu ở bất kỳ nơi nào khác)—nghĩa là vùng nhớ của đối tượng sẽ tự động được trả về <strong>vùng bộ nhớ trống (free memory pool)</strong> để tái sử dụng cho các đối tượng trong tương lai.</li>
        </ul>

        <h3>Nguyên lý đếm tham chiếu (Reference Counting)</h3>
        <p>Ở tầng nội bộ CPython, Python thực hiện được kỳ tích này bằng cách duy trì một <strong>bộ đếm bên trong mỗi đối tượng (reference counter)</strong> nhằm theo dõi số lượng tham chiếu hiện đang trỏ tới đối tượng đó. Ngay khi—và chính xác vào thời điểm—bộ đếm này <strong>giảm về mức 0</strong>, vùng không gian bộ nhớ của đối tượng sẽ tự động được thu hồi ngay tức khắc.</p>

        <p><strong>Lợi ích hiển hiện rõ ràng nhất:</strong> Bạn có thể tự do thoải mái tạo ra và sử dụng các đối tượng mà không bao giờ cần bận tâm đến việc phải tự tay cấp phát (allocate bằng <code>malloc</code>) hay giải phóng (free) không gian bộ nhớ trong tập lệnh của mình. Python sẽ tự động buộc các đối tượng phải dọn dẹp phần không gian không còn dùng đến của chúng. Trên thực tế, điều này loại bỏ hoàn toàn một khối lượng mã nguồn đồ sộ dành cho việc quản lý sổ sách bộ nhớ vốn là gánh nặng bắt buộc trong các ngôn ngữ cấp thấp như C và C++.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tính tức thì của bộ thu gom rác CPython',
        content: 'Bởi vì cơ chế dọn rác chính của CPython dựa trên việc đếm tham chiếu, nên ngay tại thời điểm bộ đếm của một đối tượng giảm về 0, bộ nhớ của nó được giải phóng <strong>ngay lập tức trong cùng dòng lệnh đó</strong>, chứ không cần đợi một chu kỳ quét rác định kỳ như trong máy ảo Java (JVM).'
      }
    ]
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Xác định thời điểm đối tượng được thu hồi bộ nhớ',
      problem: 'Trong đoạn mã sau, đối tượng chuỗi `"Hello"` sẽ bị thu gom rác tự động sau dòng lệnh số mấy?\n\n```python\n# Dòng 1\ns1 = "Hello"\n# Dòng 2\ns2 = s1\n# Dòng 3\ns1 = "World"\n# Dòng 4\ns2 = "World"\n```',
      hint: 'Hãy đếm xem tại mỗi dòng có bao nhiêu biến đang cùng tham chiếu tới đối tượng chuỗi "Hello".',
      solutionCode: `# Phân tích số đếm tham chiếu tới "Hello":
# Dòng 1: s1 = "Hello"        -> refcount("Hello") = 1 (s1 trỏ tới)
# Dòng 2: s2 = s1             -> refcount("Hello") = 2 (cả s1 và s2 trỏ tới)
# Dòng 3: s1 = "World"        -> refcount("Hello") = 1 (chỉ còn s2 trỏ tới, chưa bị hủy!)
# Dòng 4: s2 = "World"        -> refcount("Hello") = 0 (hết người trỏ tới!)

print("Chuỗi 'Hello' bị thu hồi bộ nhớ ngay sau Dòng 4.")`,
      solutionOutput: `Chuỗi 'Hello' bị thu hồi bộ nhớ ngay sau Dòng 4.`,
      explanation: 'Ở dòng 3, dù s1 đã chuyển sang trỏ chuỗi "World", nhưng s2 vẫn còn đang giữ tham chiếu tới "Hello" (refcount = 1). Phải đợi đến dòng 4, khi s2 cũng bị gán đè sang "World", số đếm tham chiếu của "Hello" mới chính thức giảm về 0 và bị giải phóng tức thì.'
    }
  ],

  quiz: [
    {
      question: 'Cơ chế thu gom rác chính của CPython giải phóng vùng nhớ của đối tượng vào thời điểm nào?',
      options: [
        'Khi chương trình kết thúc và đóng lại hoàn toàn.',
        'Ngay lập tức khi bộ đếm tham chiếu (reference counter) của đối tượng đó giảm về 0.',
        'Vào lúc nửa đêm theo lịch chạy tác vụ cron định kỳ của hệ thống.',
        'Khi dung lượng ổ cứng của máy tính bị đầy quá 90%.'
      ],
      correctIndex: 1,
      explanation: 'CPython sử dụng cơ chế đếm tham chiếu: ngay khi bộ đếm tham chiếu của một đối tượng rơi về 0 (không còn ai trỏ tới), vùng nhớ của nó được thu hồi tự động ngay lập tức.'
    },
    {
      question: 'Vùng nhớ được giải phóng sau khi thu gom rác sẽ được chuyển về đâu?',
      options: [
        'Bị xóa vĩnh viễn khỏi thanh ghi BIOS của bo mạch chủ.',
        'Được trả về vùng bộ nhớ trống (free memory pool) của Python để tái sử dụng cho các đối tượng mới.',
        'Lưu tạm vào tập tin thùng rác (Recycle Bin) của hệ điều hành.',
        'Được ghi đè ngẫu nhiên bằng chuỗi các số 0.'
      ],
      correctIndex: 1,
      explanation: 'Vùng nhớ được giải phóng sẽ tự động được hoàn trả về vùng bộ nhớ trống (free memory pool) để cấp phát tái sử dụng cho các đối tượng được sinh ra trong tương lai.'
    }
  ],

  summary: [
    'Khi một biến được gán lại, đối tượng cũ sẽ bị thu hồi nếu không còn ai tham chiếu tới.',
    'Thu gom rác tự động (GC) giải phóng lập trình viên khỏi việc cấp phát/giải phóng bộ nhớ thủ công.',
    'CPython duy trì một bộ đếm tham chiếu (reference counter) bên trong mỗi đối tượng.',
    'Ngay khi bộ đếm tham chiếu giảm về 0, đối tượng được giải phóng ngay lập tức.',
    'Vùng nhớ được trả về free memory pool để tái cấp phát cho các đối tượng mới sinh ra.'
  ]
};
