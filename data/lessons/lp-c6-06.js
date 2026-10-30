export default {
  id: 'lp-c6-06',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.6',
  title: 'Tham chiếu Chia sẻ (Shared References) với Đối tượng Bất biến',
  subtitle: 'Khám phá tình huống nhiều biến cùng trỏ vào một đối tượng: Sơ đồ Hình 6-2, Hình 6-3 và sự an toàn của kiểu bất biến',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu khái niệm tham chiếu chia sẻ (shared reference) khi nhiều tên biến cùng trỏ tới một đối tượng duy nhất.',
    'Trực quan hóa qua Sơ đồ Hình 6-2 và Hình 6-3: biến a và b hoàn toàn độc lập, không liên kết trực tiếp với nhau.',
    'Giải thích tại sao khi gán lại biến a (ví dụ a = "hack" hoặc a = a + 2), giá trị của biến b vẫn hoàn toàn không bị ảnh hưởng.',
    'Nắm vững tính chất bất biến (immutability) của số nguyên bảo vệ chương trình khỏi các tác dụng phụ ngoài ý muốn.'
  ],

  intuition: {
    title: 'Hai sợi dây cùng buộc vào một quả bóng bay',
    metaphor: 'Hãy tưởng tượng đối tượng số 3 giống như một quả bóng bay đang lơ lửng giữa phòng. Ban đầu, biến a là một sợi dây buộc vào quả bóng bay đó (a = 3). Sau đó, câu lệnh b = a có nghĩa là bạn lấy thêm một sợi dây thứ hai mang tên b và buộc nó vào cùng quả bóng bay đó (Hình 6-2). Bây giờ cả hai sợi dây a và b cùng giữ một quả bóng. Tuy nhiên, hai sợi dây a và b không hề dính vào nhau! Khi bạn thực hiện lệnh a = "hack", bạn chỉ đơn giản là tháo sợi dây a ra khỏi quả bóng số 3 để đem buộc vào một chiếc diều mang tên "hack" (Hình 6-3). Sợi dây b vẫn đang giữ chặt quả bóng số 3 ban đầu, không hề bị suy chuyển hay thay đổi mảy may.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:20px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HÌNH 6-2 & HÌNH 6-3: CƠ CHẾ THAM CHIẾU CHIA SẺ VÀ GÁN LẠI</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <!-- Hình 6-2 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;font-size:0.82rem;">Hình 6-2: Sau lệnh b = a</div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <div style="display:flex;flex-direction:column;gap:10px;">
                <div style="padding:4px 12px;background:#bae6fd;border:1px solid #0284c7;border-radius:12px;color:#0369a1;font-weight:700;">a</div>
                <div style="padding:4px 12px;background:#bae6fd;border:1px solid #0284c7;border-radius:12px;color:#0369a1;font-weight:700;">b</div>
              </div>
              <div style="display:flex;flex-direction:column;gap:10px;flex:1;align-items:center;">
                <div style="color:var(--accent-primary);">──────►</div>
                <div style="color:var(--accent-primary);">──────►</div>
              </div>
              <div style="padding:16px 20px;background:#e0f2fe;border:2px dashed #0284c7;border-radius:24px;color:#0284c7;font-weight:700;font-size:1.1rem;">
                3
              </div>
            </div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:10px;text-align:center;">
              Cả a và b cùng trỏ tới số 3.
            </div>
          </div>

          <!-- Hình 6-3 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:8px;font-size:0.82rem;">Hình 6-3: Sau lệnh a = 'hack'</div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <div style="display:flex;flex-direction:column;gap:18px;">
                <div style="padding:4px 12px;background:#bae6fd;border:1px solid #0284c7;border-radius:12px;color:#0369a1;font-weight:700;">a</div>
                <div style="padding:4px 12px;background:#bae6fd;border:1px solid #0284c7;border-radius:12px;color:#0369a1;font-weight:700;">b</div>
              </div>
              <div style="display:flex;flex-direction:column;gap:18px;flex:1;align-items:center;">
                <div style="color:var(--warning);">──────►</div>
                <div style="color:var(--accent-primary);">──────►</div>
              </div>
              <div style="display:flex;flex-direction:column;gap:10px;">
                <div style="padding:8px 12px;background:#fef3c7;border:1px dashed #d97706;border-radius:16px;color:#b45309;font-weight:700;">'hack'</div>
                <div style="padding:8px 16px;background:#e0f2fe;border:2px dashed #0284c7;border-radius:16px;color:#0284c7;font-weight:700;">3</div>
              </div>
            </div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:10px;text-align:center;">
              a trỏ tới 'hack', b vẫn trỏ tới số 3!
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Tham chiếu Chia sẻ (Shared References)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 7 / 17 – Trang 8 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Cho đến lúc này, chúng ta đã khám phá những gì diễn ra khi một biến đơn lẻ được gán tham chiếu tới các đối tượng. Bây giờ, hãy đưa thêm một biến thứ hai vào phiên tương tác và cùng theo dõi xem điều gì sẽ xảy ra với các tên biến và đối tượng của chúng:</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo tham chiếu chia sẻ với hai biến a và b',
          code: `>>> a = 3
>>> b = a`,
          output: ``,
          annotations: [
            { line: 1, text: 'Tạo đối tượng số 3 và cho biến a tham chiếu tới nó.' },
            { line: 2, text: 'Biến a được đem ra sử dụng, lập tức được thay thế bằng đối tượng 3. Biến b được tạo và cùng trỏ tới 3.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bản chất Cơ chế: Biến Không Bao giờ Liên kết Trực tiếp với Biến',
      content: `
        <p>Việc gõ hai câu lệnh trên sẽ tạo ra tình huống được phác họa trong <strong>Hình 6-2</strong>. Lệnh thứ hai khiến Python tạo ra biến <code>b</code>; ở đây biến <code>a</code> đang được đem ra sử dụng chứ không phải được gán, nên nó lập tức được thay thế bằng đối tượng mà nó tham chiếu tới (số 3), và <code>b</code> được thiết lập để cùng tham chiếu tới đối tượng đó.</p>

        <p>Kết quả chung cuộc là cả hai biến <code>a</code> và <code>b</code> cùng tham chiếu tới một đối tượng duy nhất—nghĩa là <strong>cùng trỏ tới một vùng bộ nhớ</strong>.</p>

        <p>Tình huống này trong Python—với nhiều tên biến cùng tham chiếu tới một đối tượng—thường được gọi là một <strong>tham chiếu chia sẻ (shared reference)</strong> (và đôi khi, có lẽ chính xác hơn, là <em>đối tượng được chia sẻ – shared object</em>).</p>

        <p><strong>Điểm cốt tử cần lưu ý:</strong> Hai tên biến <code>a</code> và <code>b</code> <strong>hoàn toàn không liên kết trực tiếp với nhau</strong> khi điều này xảy ra; trên thực tế, trong Python không có cách nào để liên kết một biến với một biến khác (không có khái niệm tham chiếu alias biến-trỏ-biến như trong C++). Thay vào đó, cả hai biến đều trỏ tới cùng một đối tượng thông qua <strong>các tham chiếu độc lập của riêng chúng</strong>.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Tác động khi Gán lại một Biến: Phép thử a = "hack" & a = a + 2',
      content: `
        <p>Tiếp theo, giả sử chúng ta mở rộng phiên làm việc bằng cách thêm vào một câu lệnh gán lại biến <code>a</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Gán lại biến a sang chuỗi \'hack\'',
          code: `>>> a = 3
>>> b = a
>>> a = 'hack'
>>> b
3`,
          output: `3`,
          annotations: [
            { line: 3, text: 'Tạo đối tượng chuỗi \'hack\' mới và chuyển hướng a trỏ tới nó.' },
            { line: 4, text: 'Kiểm tra biến b: b vẫn tham chiếu nguyên vẹn tới số nguyên 3 ban đầu!' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Tính Bất biến của Số nguyên và Sự An toàn của Tham chiếu',
      content: `
        <p>Giống như mọi phép gán khác trong Python, câu lệnh <code>a = 'hack'</code> chỉ đơn giản tạo ra một đối tượng mới để đại diện cho giá trị chuỗi <code>'hack'</code> và thiết lập <code>a</code> tham chiếu tới đối tượng mới này. Tuy nhiên, nó <strong>hoàn toàn không làm thay đổi giá trị của <code>b</code></strong>; biến <code>b</code> vẫn tiếp tục tham chiếu tới đối tượng ban đầu là số nguyên <code>3</code> (như minh họa trong <strong>Hình 6-3</strong>).</p>

        <p>Điều tương tự cũng sẽ diễn ra nếu thay vào đó chúng ta đổi <code>b</code> thành <code>'hack'</code>—phép gán sẽ chỉ làm thay đổi duy nhất biến <code>b</code>, chứ không ảnh hưởng tới <code>a</code>. Hành vi này cũng xuất hiện ngay cả khi giữa các biến không hề có sự khác biệt nào về kiểu dữ liệu. Chẳng hạn, hãy xem xét ba câu lệnh sau:</p>
      `,
      codeExamples: [
        {
          title: 'Thực hiện phép tính cộng trên biến a: a = a + 2',
          code: `>>> a = 3
>>> b = a
>>> a = a + 2
>>> a
5
>>> b
3`,
          output: `5
3`,
          annotations: [
            { line: 3, text: 'Biểu thức a + 2 tính 3 + 2 = 5, tạo ra một đối tượng số nguyên 5 hoàn toàn mới!' },
            { line: 6, text: 'Biến b vẫn nắm giữ đối tượng 3 ban đầu, hoàn toàn không bị thay đổi.' }
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      title: '5. Biến là Con trỏ, Không phải Nhãn Ô nhớ Cố định',
      content: `
        <p>Trong chuỗi lệnh trên, các diễn biến diễn ra hoàn toàn tương tự. Python thiết lập biến <code>a</code> tham chiếu tới đối tượng <code>3</code> và cho <code>b</code> cùng tham chiếu tới đối tượng giống như <code>a</code>; phép gán cuối cùng <code>a = a + 2</code> sẽ đặt <code>a</code> tham chiếu tới một đối tượng hoàn toàn khác (trong trường hợp này là số nguyên <code>5</code>, kết quả của biểu thức cộng <code>+</code>). Nó không hề làm thay đổi <code>b</code> như một tác dụng phụ (side effect).</p>

        <p>Trên thực tế, <strong>không có cách nào để ghi đè lên giá trị của đối tượng 3</strong>—như đã giới thiệu trong Chương 4, số nguyên là kiểu dữ liệu <strong>bất biến (immutable)</strong> và do đó không bao giờ có thể bị thay đổi tại chỗ. Tất cả những gì chúng ta có thể làm luôn là tạo ra một đối tượng số nguyên mới.</p>

        <p>Một cách trực quan để hình dung về điều này là: không giống như trong một số ngôn ngữ, biến trong Python luôn luôn là các con trỏ trỏ tới đối tượng, chứ không phải nhãn dán định danh cho các ô nhớ có thể biến đổi. Việc đặt một biến sang giá trị mới không làm biến đổi đối tượng ban đầu, mà chỉ khiến biến đó chuyển sang tham chiếu tới một đối tượng hoàn toàn khác. Kết quả chung cuộc là <strong>việc gán giá trị cho bản thân một biến chỉ có thể tác động duy nhất lên chính biến đang được gán đó</strong>.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tính bất biến là lá chắn bảo vệ',
        content: 'Với các kiểu dữ liệu bất biến (như <code>int</code>, <code>float</code>, <code>str</code>, <code>tuple</code>), bạn hoàn toàn có thể yên tâm sử dụng tham chiếu chia sẻ khắp nơi mà không sợ một biến này vô tình làm biến đổi giá trị của một biến khác. Mọi thao tác toán học hay chỉnh sửa chuỗi luôn luôn sinh ra một đối tượng mới hoàn toàn.'
      }
    ]
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Dự đoán giá trị của biến sau chuỗi gán số nguyên',
      problem: 'Hãy cho biết giá trị được in ra của x, y và z sau chuỗi lệnh sau:\n\n```python\nx = 10\ny = x\nx = x * 2\nz = y\ny = y + 5\n```',
      hint: 'Hãy vẽ sơ đồ con trỏ từng bước: khi x và y được tính toán lại, chúng chuyển sang trỏ đối tượng số mới.',
      solutionCode: `x = 10
y = x
x = x * 2
z = y
y = y + 5

print(f"x = {x}, y = {y}, z = {z}")`,
      solutionOutput: `x = 20, y = 15, z = 10`,
      explanation: 'Ban đầu x và y cùng trỏ tới 10. `x = x * 2` tạo số 20 mới cho x, y vẫn là 10. `z = y` cho z trỏ vào số 10. `y = y + 5` tạo số 15 mới cho y, z vẫn trỏ số 10 ban đầu.'
    }
  ],

  quiz: [
    {
      question: 'Khi thực hiện hai câu lệnh a = 3 và b = a, điều gì thực sự diễn ra trong bộ nhớ Python?',
      options: [
        'Python sao chép một đối tượng số 3 thứ hai vào ô nhớ riêng của biến b.',
        'Biến b được liên kết trực tiếp vào tên biến a như một bí danh con trỏ.',
        'Cả hai biến a và b cùng độc lập tham chiếu tới một đối tượng số 3 duy nhất.',
        'Biến a bị xóa khỏi bảng tên và được thay thế bằng biến b.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python, không có cơ chế liên kết biến với biến; cả a và b độc lập nắm giữ con trỏ tham chiếu cùng trỏ tới một đối tượng số 3 duy nhất trong RAM (tham chiếu chia sẻ).'
    },
    {
      question: 'Tại sao sau lệnh a = a + 2, giá trị của biến b (vốn trước đó cùng trỏ với a) lại không bị thay đổi thành 5?',
      options: [
        'Vì Python tự động hủy biến b khi a được tính toán lại.',
        'Vì số nguyên là kiểu bất biến; phép cộng tạo ra một đối tượng số 5 mới và gán riêng cho a, còn đối tượng 3 của b không hề bị đổi.',
        'Vì phép cộng dấu + có độ ưu tiên thấp hơn phép gán b = a.',
        'Vì Python lưu trữ biến b trên ổ cứng còn biến a trên RAM.'
      ],
      correctIndex: 1,
      explanation: 'Số nguyên là kiểu bất biến (immutable), không thể thay đổi tại chỗ. Phép tính a + 2 sinh ra một đối tượng số 5 mới và chỉ liên kết riêng biến a tới đối tượng 5 này, trong khi b vẫn trỏ tới đối tượng 3 ban đầu.'
    }
  ],

  summary: [
    'Tham chiếu chia sẻ (shared reference) là tình huống nhiều biến cùng trỏ tới một đối tượng duy nhất.',
    'Các biến trong Python hoàn toàn độc lập với nhau, không bao giờ trỏ trực tiếp vào nhau.',
    'Gán một biến sang giá trị mới chỉ chuyển hướng con trỏ của biến đó, không ảnh hưởng các biến khác.',
    'Số nguyên là kiểu dữ liệu bất biến (immutable), không bao giờ có thể bị thay đổi giá trị tại chỗ.',
    'Tính bất biến bảo vệ các biến dùng chung tham chiếu khỏi hiện tượng biến đổi ngầm ngoài ý muốn.'
  ]
};
