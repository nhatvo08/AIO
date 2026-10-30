export default {
  id: 'lp-c6-01',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.1',
  title: 'Biến, Đối tượng và Tham chiếu: 3 Bước của Phép gán & Sơ đồ Hình 6-1',
  subtitle: 'Giải phẫu cơ chế phép gán nền tảng trong Python: khởi tạo, kiểu, sử dụng và sơ đồ liên kết con trỏ tham chiếu',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững 3 khía cạnh quy ước khi làm việc với biến trong Python: khởi tạo, kiểu của biến và cách sử dụng.',
    'Phân tích chi tiết 3 bước khái niệm mà Python thực thi ngầm phía sau mỗi câu lệnh gán giá trị (ví dụ a = 3).',
    'Đọc hiểu và trực quan hóa Sơ đồ Hình 6-1: mối quan hệ con trỏ tham chiếu nối giữa bảng tên biến và vùng nhớ đối tượng.',
    'Phân biệt rõ ràng 3 khái niệm cốt lõi: Tên biến (Names), Đối tượng (Objects) và Tham chiếu (References).'
  ],

  intuition: {
    title: 'Sợi dây liên kết giữa Bảng tên và Kho bộ nhớ',
    metaphor: 'Hãy hình dung bộ nhớ máy tính giống như một căn phòng kho rộng lớn chứa đầy những chiếc hộp giá trị (đối tượng 3, chuỗi "hack", danh sách [1, 2, 3]). Ở bên ngoài cửa phòng kho có một chiếc bảng ghi danh mục tên (bảng hệ thống chứa các tên biến như a, b, x). Một câu lệnh gán như a = 3 không phải là việc nhét con số 3 vào chiếc bảng tên a; mà là hành động người quản kho mang một đối tượng số 3 đặt vào trong phòng kho, sau đó đóng một chiếc đinh mang nhãn a lên bảng, rồi căng một sợi dây thép (con trỏ tham chiếu) nối thẳng từ đinh a đến khối số 3 trong phòng kho. Bất cứ khi nào bạn gọi tên a, người quản kho sẽ tự động men theo sợi dây thép đó để lấy giá trị số 3 ra cho bạn.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:20px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HÌNH 6-1: TÊN BIẾN (NAMES) VÀ ĐỐI TƯỢNG (OBJECTS) SAU KHI CHẠY PHÉP GÁN a = 3</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:30px;padding:20px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
          <!-- Cột 1: Tên biến -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Tên biến (Names)</div>
            <div style="width:80px;height:45px;display:flex;align-items:center;justify-content:center;background:#bae6fd;color:#0369a1;font-weight:700;border:2px solid #0284c7;border-radius:24px;font-size:1.1rem;">
              a
            </div>
            <div style="font-size:0.72rem;color:var(--text-muted);">Mục trong bảng tên</div>
          </div>

          <!-- Cột 2: Tham chiếu (Mũi tên) -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;max-width:200px;">
            <div style="font-size:0.75rem;font-weight:700;color:var(--accent-primary);text-transform:uppercase;">Tham chiếu (Reference)</div>
            <div style="width:100%;display:flex;align-items:center;">
              <div style="flex:1;height:3px;background:var(--accent-primary);"></div>
              <div style="width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:10px solid var(--accent-primary);"></div>
            </div>
            <div style="font-size:0.72rem;color:var(--text-muted);">Con trỏ địa chỉ RAM</div>
          </div>

          <!-- Cột 3: Đối tượng -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <div style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;">Đối tượng (Objects)</div>
            <div style="width:80px;height:45px;display:flex;align-items:center;justify-content:center;background:#e0f2fe;color:#0284c7;font-weight:700;border:2px dashed #0284c7;border-radius:24px;font-size:1.1rem;">
              3
            </div>
            <div style="font-size:0.72rem;color:var(--text-muted);">Vùng nhớ được cấp phát</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--text-muted);">
          <em>Biến và đối tượng nằm ở hai vùng nhớ tách biệt, được kết nối với nhau thông qua tham chiếu con trỏ.</em>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Ba Khía cạnh Vận hành Tự nhiên của Biến trong Python',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 2 / 17 – Trang 3 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Như bạn đã thấy trong nhiều ví dụ từ đầu cuốn sách tới nay, khi bạn thực thi một câu lệnh gán đơn giản như <code>a = 3</code> trong Python, câu lệnh đó hoạt động trơn tru ngay cả khi bạn chưa từng thông báo trước cho Python biết tên <code>a</code> sẽ đóng vai trò là một biến, hay <code>a</code> phải đại diện cho một đối tượng thuộc kiểu số nguyên. Trong ngôn ngữ Python, toàn bộ quá trình này diễn ra một cách tự nhiên theo 3 khía cạnh sau:</p>

        <h3>a) Khởi tạo biến (Variable creation)</h3>
        <p>Một biến (trong Python còn gọi là một <strong>tên biến – name</strong>), chẳng hạn như <code>a</code>, được tạo ra khi mã nguồn của bạn gán giá trị cho nó lần đầu tiên. Những phép gán tiếp theo trong tương lai sẽ thay đổi giá trị của tên biến đã được tạo sẵn đó. Về mặt kỹ thuật bên dưới, Python nhận diện một số tên biến trước khi mã nguồn thực thi (ví dụ: các biến cục bộ – <em>local variables</em> – bên trong một hàm khi hàm được biên dịch sang bytecode), nhưng bạn hoàn toàn có thể hình dung một cách trực quan và chính xác rằng: <strong>chính phép gán đầu tiên đã sinh ra biến</strong>.</p>

        <h3>b) Kiểu của biến (Variable types)</h3>
        <p>Bản thân một biến <strong>không bao giờ gắn liền với bất kỳ thông tin kiểu dữ liệu hay ràng buộc kiểu nào</strong>. Trong Python, khái niệm kiểu dữ liệu nằm hoàn toàn ở các đối tượng, chứ không nằm ở các tên biến. Bản chất của các biến là <strong>khái quát (generic)</strong>; chúng chỉ đơn thuần tham chiếu đến một đối tượng cụ thể tại một thời điểm cụ thể.</p>

        <h3>c) Sử dụng biến (Variable use)</h3>
        <p>Khi một biến xuất hiện trong một biểu thức (expression), nó ngay lập tức được tự động thay thế bằng chính đối tượng mà nó đang tham chiếu tới tại thời điểm đó, bất kể đối tượng đó là gì. Hơn nữa, mọi biến đều bắt buộc phải được gán giá trị rõ ràng trước khi có thể đem ra sử dụng; việc cố tình tham chiếu tới một biến chưa từng được gán giá trị sẽ lập tức dẫn đến lỗi <code>NameError</code>.</p>

        <p><strong>Tóm lại:</strong> Biến được tạo ra khi được gán, có thể tham chiếu tới bất kỳ kiểu đối tượng nào, và bắt buộc phải được gán giá trị trước khi được tham chiếu tới. Điều này đồng nghĩa với việc bạn không bao giờ phải khai báo các tên biến được dùng trong tập lệnh, nhưng bạn phải khởi tạo giá trị cho biến trước khi có thể cập nhật chúng; chẳng hạn, các biến đếm (counter) phải được khởi tạo về số <code>0</code> trước khi bạn có thể cộng dồn giá trị vào chúng (<code>count += 1</code>).</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Ba Bước Phân biệt của Mọi Phép gán trong Python',
      content: `
        <p>Mô hình định kiểu động này khác biệt một cách rõ rệt so với mô hình định kiểu của các ngôn ngữ truyền thống. Khi mới bắt đầu, mô hình này thường sẽ dễ hiểu hơn nhiều nếu bạn phân biệt rạch ròi giữa tên biến và đối tượng.</p>
        <p>Chẳng hạn, khi chúng ta thực hiện phép gán giá trị cho một biến trong môi trường REPL hoặc tập lệnh Python như sau:</p>
      `,
      codeExamples: [
        {
          title: 'Phép gán biến cơ bản trong Python REPL',
          code: `>>> a = 3 # Gán tên biến cho một đối tượng`,
          output: ``,
          annotations: [
            { line: 1, text: 'Phép gán đơn giản nhưng kích hoạt một quy trình gồm 3 bước phân biệt bên dưới CPython.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cơ chế 3 Bước Khái niệm Phía sau Phép gán a = 3',
      content: `
        <p>Ít nhất là về mặt khái niệm, Python sẽ tiến hành <strong>ba bước phân biệt</strong> để thực thi yêu cầu của câu lệnh <code>a = 3</code>. Ba bước này phản ánh cơ chế hoạt động nền tảng của mọi phép gán trong toàn bộ ngôn ngữ Python:</p>
        <ol>
          <li><strong>Bước 1:</strong> Tạo ra một đối tượng đại diện cho giá trị <code>3</code> (cấp phát vùng không gian bộ nhớ RAM cho số nguyên 3).</li>
          <li><strong>Bước 2:</strong> Tạo ra biến <code>a</code> trong bảng tên hệ thống, nếu như nó chưa từng tồn tại trước đó.</li>
          <li><strong>Bước 3:</strong> Thiết lập mối liên kết (con trỏ tham chiếu) từ biến <code>a</code> tới đối tượng mới tạo mang giá trị <code>3</code>.</li>
        </ol>

        <p>Kết quả cuối cùng thu được là một cấu trúc bên trong Python tương tự như <strong>Hình 6-1</strong> ở phần đầu bài học. Như được phác họa trong sơ đồ:</p>
        <ul>
          <li>Các biến và đối tượng được lưu trữ ở những vùng bộ nhớ hoàn toàn khác nhau.</li>
          <li>Chúng được gắn kết với nhau thông qua các mối liên kết (được biểu thị bằng mũi tên con trỏ trong hình vẽ).</li>
          <li><strong>Biến luôn luôn liên kết tới đối tượng</strong> chứ không bao giờ liên kết trực tiếp tới một biến khác.</li>
          <li>Tuy nhiên, các đối tượng lớn hơn (như danh sách <code>list</code>, từ điển <code>dict</code>) có thể chứa bên trong các liên kết trỏ tới những đối tượng khác.</li>
        </ul>

        <h3>Định nghĩa rõ ràng về Biến, Đối tượng và Tham chiếu</h3>
        <p>Các liên kết từ biến tới đối tượng được gọi là <strong>tham chiếu (references)</strong> trong Python—một dạng liên kết được hiện thực hóa bằng <strong>địa chỉ bộ nhớ</strong> của đối tượng. Bất cứ khi nào các biến được sử dụng sau đó (tức là được tham chiếu tới), Python sẽ tự động dò theo mối liên kết từ biến tới đối tượng. Nói một cách cô đọng và chính xác nhất:</p>
        <ul>
          <li><strong>Biến (Variables / Names):</strong> Là các mục có tên trong một bảng hệ thống (system table), có chừa sẵn không gian để lưu liên kết trỏ tới các đối tượng.</li>
          <li><strong>Đối tượng (Objects):</strong> Là các mảnh bộ nhớ được cấp phát, có đủ dung lượng để biểu diễn giá trị mà chúng đại diện.</li>
          <li><strong>Tham chiếu (References):</strong> Là các con trỏ từ biến trỏ tới đối tượng, được tự động lần theo dấu vết khi sử dụng.</li>
        </ul>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy tham chiếu tới biến chưa từng được gán giá trị',
        content: 'Bởi vì biến trong Python chỉ sinh ra tại thời điểm được gán giá trị lần đầu, việc cố đọc hoặc tính toán trên một biến chưa khởi tạo sẽ gây ra lỗi <code>NameError: name \'x\' is not defined</code>. Không giống như một số ngôn ngữ tự động gán giá trị mặc định (như 0 hay null) cho biến chưa khởi tạo, Python đòi hỏi phép gán tường minh trước khi sử dụng.'
      }
    ]
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Nhận diện lỗi biến chưa khởi tạo trong Python',
      problem: 'Đoạn mã sau có hợp lệ trong Python hay không? Nếu không, nó sẽ phát sinh lỗi gì và tại sao?\n\n```python\ntotal = total + 5\n```',
      hint: 'Biểu thức bên phải dấu bằng đòi hỏi đọc giá trị của biến total trước khi phép gán có thể hoàn thành.',
      solutionCode: `try:
    total = total + 5
except NameError as err:
    print("Bắt được lỗi:", err)

# Cách khắc phục đúng: khởi tạo trước khi dùng
total = 0
total = total + 5
print("Giá trị sau khi khởi tạo đúng:", total)`,
      solutionOutput: `Bắt được lỗi: name 'total' is not defined
Giá trị sau khi khởi tạo đúng: 5`,
      explanation: 'Khi Python đánh giá biểu thức bên phải `total + 5`, biến `total` chưa từng được gán giá trị nào trước đó trong bảng hệ thống, nên Python không tìm thấy đối tượng nào để thay thế, dẫn tới lỗi `NameError`. Biến đếm bắt buộc phải được khởi tạo về giá trị ban đầu (như `total = 0`) trước khi tích lũy.'
    }
  ],

  quiz: [
    {
      question: 'Khi thực thi câu lệnh a = 3, thứ tự 3 bước khái niệm diễn ra bên dưới Python là gì?',
      options: [
        '1. Tạo biến a -> 2. Gán kiểu int cho a -> 3. Lưu số 3 vào ô nhớ của a.',
        '1. Tạo đối tượng 3 -> 2. Tạo biến a (nếu chưa có) -> 3. Liên kết con trỏ từ a tới đối tượng 3.',
        '1. Tìm kiếm kiểu của a -> 2. Ép kiểu số 3 sang int -> 3. Gán giá trị.',
        '1. Khởi tạo bảng tên -> 2. Biên dịch mã sang C -> 3. Cấp phát bộ nhớ tĩnh.'
      ],
      correctIndex: 1,
      explanation: 'Quy trình chuẩn 3 bước của phép gán trong Python: 1. Tạo đối tượng đại diện cho giá trị 3; 2. Tạo tên biến a nếu chưa tồn tại; 3. Thiết lập liên kết tham chiếu từ biến a tới đối tượng 3.'
    },
    {
      question: 'Trong mô hình bộ nhớ của Python, biến có thể liên kết trực tiếp tới một biến khác không?',
      options: [
        'Có, biến có thể tạo bí danh con trỏ trỏ trực tiếp vào ô nhớ của biến khác như trong C++.',
        'Không bao giờ, biến luôn luôn chỉ liên kết tới đối tượng, không bao giờ liên kết trực tiếp tới biến khác.',
        'Chỉ có thể liên kết trực tiếp nếu hai biến có cùng kiểu dữ liệu.',
        'Có thể, nhưng chỉ diễn ra đối với các biến cục bộ bên trong một hàm.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz khẳng định: Biến luôn luôn liên kết tới đối tượng chứ không bao giờ liên kết trực tiếp tới biến khác. Khi hai biến cùng mang một giá trị, cả hai đều độc lập trỏ tới cùng một đối tượng duy nhất trong bộ nhớ.'
    }
  ],

  summary: [
    'Biến trong Python được sinh ra ngay trong lần đầu tiên được gán giá trị.',
    'Bản thân biến không có kiểu dữ liệu; kiểu thuộc về đối tượng mà biến đang trỏ tới.',
    'Biến phải được gán giá trị trước khi đem ra sử dụng trong các biểu thức.',
    'Phép gán gồm 3 bước: tạo đối tượng trong RAM -> tạo biến trong bảng tên -> liên kết tham chiếu con trỏ.',
    'Sơ đồ Hình 6-1 minh họa ranh giới tách bạch giữa Bảng tên biến và Không gian lưu trữ đối tượng.'
  ]
};
