export default {
  id: 'lp-c4-02',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.2',
  title: 'Tại sao nên dùng các đối tượng dựng sẵn?',
  subtitle: 'Bối cảnh ngôn ngữ cấp thấp và 4 lý do sống còn: Dễ viết, Nền tảng mở rộng, Hiệu năng tối ưu và Chuẩn hóa toàn cầu',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thấu hiểu sự khác biệt giữa việc phải tự hiện thực cấu trúc dữ liệu ở ngôn ngữ cấp thấp và lợi thế khi dùng Python.',
    'Nắm vững và giải thích trọn vẹn đủ cả 4 lý do vì sao luôn có lợi khi dùng đối tượng dựng sẵn.',
    'Thấy rõ cách các đối tượng dựng sẵn (như list, dict) đóng vai trò làm khung xương cho các cấu trúc dữ liệu nâng cao (như stack, queue).',
    'Hiểu tính chuẩn hóa của Python: sự giao thoa hài hòa giữa di sản Lisp (công cụ dựng sẵn) và C++ (tự lập trình công cụ).'
  ],

  intuition: {
    title: 'Xây nhà bằng gạch tiêu chuẩn thay vì tự nung gạch',
    metaphor: 'Nếu bạn muốn xây một ngôi nhà vững chãi, bạn có hai lựa chọn: Một là tự đi đào đất sét, đóng khuôn, nhóm lò nung từng viên gạch, tự đúc từng ống nước và tự chế bu-lông (như ngôn ngữ cấp thấp C). Hai là đến ngay kho vật liệu tiêu chuẩn quốc gia lấy những viên gạch nung chuẩn hóa, chịu lực cao, kích thước đồng nhất về ráp lại (như Python). Trừ phi bạn đang xây một lò phản ứng hạt nhân cực kỳ đặc biệt, sử dụng gạch tiêu chuẩn luôn giúp bạn hoàn thành ngôi nhà nhanh hơn, ít nứt gãy hơn và mọi kỹ sư khác đều hiểu ngay bản thiết kế của bạn.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">ĐỐI CHIẾU: TỰ CÀI ĐẶT CẤP THẤP VS ĐỐI TƯỢNG DỰNG SẴN PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--warning);margin-bottom:8px;">🛠️ Ngôn ngữ Cấp thấp (C/C++)</div>
            <ul style="margin:0;padding-left:18px;font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              <li>Tự thiết kế cấu trúc bộ nhớ (struct).</li>
              <li>Tự cấp phát (malloc) & giải phóng (free).</li>
              <li>Tự viết thuật toán tìm kiếm, sắp xếp.</li>
              <li>Dễ lỗi rò rỉ RAM (leak) và tràn bộ nhớ.</li>
              <li>Mỗi dự án lại có một bộ thư viện tự chế riêng.</li>
            </ul>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:8px;">⚡ Đối tượng Dựng sẵn Python</div>
            <ul style="margin:0;padding-left:18px;font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              <li>Tập hợp (list) và tra cứu (dict) có sẵn ngay.</li>
              <li>Bộ nhớ tự động cấp phát và tự dọn rác (GC).</li>
              <li>Tối ưu hóa cực hạn bằng C bên dưới.</li>
              <li>An toàn, tự kiểm tra giới hạn biên.</li>
              <li>Chuẩn hóa 100% trên toàn cầu, mọi dự án.</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bối cảnh ở các Ngôn ngữ Lập trình Cấp thấp',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 2–3 / 38</strong>.</p>
          </div>
        </div>

        <p>Nếu từng sử dụng các ngôn ngữ lập trình cấp thấp hơn (chẳng hạn như C hoặc Pascal), bạn hẳn đã biết rằng phần lớn công việc của lập trình viên thường phải xoay quanh việc <strong>tự hiện thực các đối tượng—còn gọi là các cấu trúc dữ liệu</strong>—nhằm biểu diễn các thành phần trong miền bài toán ứng dụng của mình.</p>
        <p>Bạn có thể phải tự tay:</p>
        <ul>
          <li>Thiết kế cấu trúc bố cục bộ nhớ (memory layout) cho từng bản ghi.</li>
          <li>Quản lý việc cấp phát bộ nhớ (allocation) và cẩn thận giải phóng bộ nhớ (deallocation) khi không còn dùng tới.</li>
          <li>Viết các hàm tìm kiếm, chèn, xóa và truy xuất dữ liệu từ con trỏ.</li>
        </ul>
        <p>Theo Mark Lutz, <em>"những công việc lặt vặt này vừa tẻ nhạt vừa dễ sinh lỗi đúng như bạn hình dung, và chúng thường làm bạn xao nhãng khỏi các mục tiêu thực tế của chương trình"</em>.</p>
        <p>Trong các chương trình Python thông thường, hầu hết các công việc nặng nhọc mang tính cơ bắp đó đều hoàn toàn biến mất. Vì Python cung cấp sẵn các kiểu đối tượng mạnh mẽ như một phần nội tại của ngôn ngữ, thường bạn không cần phải lập trình hiện thực đối tượng trước khi bắt tay vào giải quyết bài toán.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bốn Lý do Cốt tử vì sao Luôn Nên Dùng Đối tượng Dựng sẵn',
      content: `
        <p>Trừ phi bạn có nhu cầu xử lý cực kỳ đặc thù mà các đối tượng dựng sẵn không thể đáp ứng được, bạn hầu như luôn có lợi hơn khi sử dụng đối tượng dựng sẵn thay vì tự mình hiện thực từ đầu. Dưới đây là <strong>đủ cả 4 lý do giải thích tại sao</strong> do Mark Lutz tổng kết:</p>

        <div style="display:flex;flex-direction:column;gap:14px;margin-top:14px;">
          <div class="callout-box callout-tip" style="margin:0;">
            <div class="callout-header"><span>1️⃣</span> <span>Lý do 1: Giúp chương trình dễ viết hơn</span></div>
            <div class="callout-body">
              <p>Đối với các tác vụ đơn giản hơn, các đối tượng dựng sẵn thường là tất cả những gì bạn cần để biểu diễn cấu trúc của miền bài toán. Bởi vì bạn được cung cấp miễn phí các công cụ cực kỳ mạnh mẽ như <strong>các tập hợp có thứ tự (danh sách <code>list</code>)</strong> và <strong>các bảng tra cứu (từ điển <code>dict</code>)</strong>, bạn có thể sử dụng chúng ngay lập tức. Bạn có thể hoàn thành một khối lượng công việc khổng lồ chỉ với riêng các kiểu đối tượng dựng sẵn của Python mà không cần viết thêm một dòng mã quản lý nào.</p>
            </div>
          </div>

          <div class="callout-box callout-tip" style="margin:0;">
            <div class="callout-header"><span>2️⃣</span> <span>Lý do 2: Là nền tảng cấu thành của các phần mở rộng</span></div>
            <div class="callout-body">
              <p>Đối với các tác vụ phức tạp hơn, bạn có thể cần cung cấp các đối tượng của riêng mình bằng cách sử dụng các lớp Python hoặc các giao diện ngôn ngữ C. Nhưng như bạn sẽ thấy trong các phần sau của cuốn sách, <em>các đối tượng được hiện thực thủ công thường được xây dựng dựa trên các đối tượng dựng sẵn như danh sách và từ điển</em>. Ví dụ: cấu trúc dữ liệu ngăn xếp (stack) có thể được hiện thực vô cùng ngắn gọn dưới dạng một lớp quản lý hoặc tùy biến một danh sách <code>list</code> dựng sẵn.</p>
            </div>
          </div>

          <div class="callout-box callout-tip" style="margin:0;">
            <div class="callout-header"><span>3️⃣</span> <span>Lý do 3: Thường hiệu quả hơn so với cấu trúc dữ liệu tự tạo</span></div>
            <div class="callout-body">
              <p>Các đối tượng dựng sẵn của Python áp dụng những thuật toán tiên tiến đã được tối ưu hóa kỹ lưỡng qua hàng thập kỷ bởi các chuyên gia hàng đầu. Hơn thế nữa, chúng thường được <strong>hiện thực trực tiếp bằng ngôn ngữ cấp thấp như C</strong> để đạt tốc độ xử lý tối đa của phần cứng. Mặc dù bạn có thể tự viết các kiểu đối tượng tương tự bằng mã thuần Python, bạn thường sẽ rất khó có thể bắt kịp mức hiệu năng mà các kiểu đối tượng dựng sẵn mang lại.</p>
            </div>
          </div>

          <div class="callout-box callout-tip" style="margin:0;">
            <div class="callout-header"><span>4️⃣</span> <span>Lý do 4: Là một phần chuẩn hóa của ngôn ngữ</span></div>
            <div class="callout-body">
              <p>Theo một số khía cạnh, Python vừa kế thừa từ các ngôn ngữ phụ thuộc vào công cụ dựng sẵn (như Lisp), vừa kế thừa từ các ngôn ngữ trông cậy vào lập trình viên tự cung cấp các hiện thực công cụ (như C++). Mặc dù bạn có thể hiện thực các kiểu đối tượng độc nhất vô nhị trong Python, bạn không cần phải làm vậy chỉ để bắt đầu. Hơn nữa, vì các công cụ dựng sẵn của Python là chuẩn hóa, <strong>chúng luôn đồng nhất ở mọi nơi</strong>; trong khi các bộ công cụ tự chế độc quyền lại có xu hướng khác biệt giữa các hệ thống và dự án, gây khó khăn cho việc cộng tác và bảo trì.</p>
            </div>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Minh họa Lý do 2: Xây dựng ngăn xếp (Stack) bằng cách tùy biến list dựng sẵn',
          code: `# Cấu trúc ngăn xếp (Stack) LIFO: Last-In, First-Out
# Tận dụng trực tiếp các phương thức append() và pop() tối ưu của list dựng sẵn

class Stack:
    def __init__(self):
        self._items = []          # Tận dụng list dựng sẵn làm lõi lưu trữ
    
    def push(self, item):
        self._items.append(item)  # Đưa phần tử vào đỉnh ngăn xếp
    
    def pop(self):
        return self._items.pop()  # Lấy phần tử đỉnh ngăn xếp ra ngoài
    
    def is_empty(self):
        return len(self._items) == 0

# Thử nghiệm ngăn xếp vừa tạo:
s = Stack()
s.push("Tài liệu 1")
s.push("Tài liệu 2")
print("Phần tử lấy ra đầu tiên:", s.pop())`,
          output: `Phần tử lấy ra đầu tiên: Tài liệu 2`,
          annotations: [
            { line: 6, text: 'Lớp Stack không cần tự cấp phát mảng, nó dùng list dựng sẵn bên dưới.' },
            { line: 9, text: 'Phương thức push tận dụng append() viết bằng C của list.' },
            { line: 12, text: 'Phương thức pop tận dụng pop() tối ưu của list.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Kết luận của Tác giả',
      content: `
        <p>Nói cách khác, các kiểu đối tượng dựng sẵn không chỉ giúp việc lập trình trở nên dễ dàng hơn, mà chúng còn mạnh mẽ và dễ tiếp cận hơn phần lớn những gì có thể được tạo ra từ đầu.</p>
        <p>Bất kể sau này bạn có hiện thực các kiểu đối tượng mới bằng các lớp hay không, <strong>các đối tượng dựng sẵn vẫn luôn tạo nên cốt lõi của mọi chương trình Python</strong>.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Đừng phát minh lại bánh xe',
        content: 'Quy tắc vàng của lập trình viên Python giàu kinh nghiệm: Nếu một bài toán có thể giải quyết được bằng sự kết hợp của <code>list</code>, <code>dict</code>, <code>set</code> và <code>tuple</code> dựng sẵn, hãy dùng chúng ngay lập tức trước khi nghĩ đến việc tạo thêm lớp mới.'
      }
    ]
  },

  exercises: [
    {
      title: 'Nhận diện đối tượng dựng sẵn thích hợp',
      level: 'Dễ',
      problem: 'Bạn cần quản lý danh bạ điện thoại gồm tên người và số điện thoại tương ứng. Nên dùng kiểu đối tượng dựng sẵn nào của Python để tra cứu nhanh nhất theo tên?',
      hint: 'Cần một cấu trúc lưu trữ dạng cặp "khóa: giá trị" (lookup table).',
      solutionCode: `# Sử dụng từ điển (dict) dựng sẵn làm bảng tra cứu:
danh_ba = {
    'An': '0901234567',
    'Bình': '0912345678',
    'Châu': '0987654321'
}

# Tra cứu siêu tốc theo tên (khóa):
print("Số của Bình:", danh_ba['Bình'])`,
      solutionOutput: `Số của Bình: 0912345678`,
      explanation: 'Từ điển (dict) dựng sẵn là bảng băm (hash table) được cài đặt bằng C tối ưu, cho phép tra cứu theo khóa với độ phức tạp trung bình O(1), dùng được ngay mà không cần lập trình thuật toán tìm kiếm.'
    },
    {
      title: 'Giải thích tính chuẩn hóa của đối tượng dựng sẵn',
      level: 'Vừa',
      problem: 'Một lập trình viên C mới sang Python có ý định tự viết một cấu trúc danh sách liên kết kép (doubly linked list) bằng class để lưu 1.000 số nguyên. Hãy đưa ra 2 lý do dựa trên sách giải thích vì sao anh ta nên dùng <code>list</code> dựng sẵn của Python thay thế.',
      hint: 'Xem xét Lý do 3 (Hiệu năng thuật toán & C) và Lý do 4 (Chuẩn hóa ngôn ngữ).',
      solutionCode: `# 1. Dùng list dựng sẵn:
ds_dung_san = list(range(1000))
print("Tổng số phần tử:", len(ds_dung_san))
# Cực nhanh vì viết bằng C, chuẩn hóa cho mọi thư viện Python!`,
      solutionOutput: `Tổng số phần tử: 1000`,
      explanation: 'Thứ nhất, <code>list</code> dựng sẵn được viết bằng C và quản lý bộ nhớ mảng động tối ưu hóa bộ nhớ đệm CPU, nhanh hơn rất nhiều so với class Python tự chế. Thứ hai, <code>list</code> dựng sẵn là chuẩn hóa toàn ngôn ngữ, mọi hàm như <code>sum()</code>, <code>len()</code> hay vòng lặp <code>for</code> đều tương thích trực tiếp.'
    }
  ],

  quiz: [
    {
      question: 'Khó khăn lớn nhất khi hiện thực cấu trúc dữ liệu trong các ngôn ngữ cấp thấp như C là gì?',
      options: [
        'C không hỗ trợ các phép toán số học cơ bản như cộng và trừ.',
        'Lập trình viên phải tự thiết kế bộ nhớ, tự cấp phát/giải phóng bộ nhớ và tự viết hàm tìm kiếm/truy xuất, rất tẻ nhạt và dễ sinh lỗi.',
        'Ngôn ngữ cấp thấp không có bộ vi xử lý trung tâm để thực thi mã.',
        'C bắt buộc phải có máy ảo mới chạy được mã máy.'
      ],
      correctIndex: 1,
      explanation: 'Trong ngôn ngữ cấp thấp, việc phải tự quản lý từng byte bộ nhớ và viết hàm tìm kiếm cấu trúc thủ công làm tốn công sức và dễ gây lỗi rò rỉ bộ nhớ.'
    },
    {
      question: 'Lý do nào sau đây KHÔNG PHẢI là một trong 4 lý do Mark Lutz đưa ra để ủng hộ việc dùng đối tượng dựng sẵn?',
      options: [
        'Giúp chương trình dễ viết hơn nhờ có sẵn list và dict.',
        'Là nền tảng cấu thành của các phần mở rộng và lớp hướng đối tượng.',
        'Thường hiệu quả hơn do được tối ưu thuật toán và viết bằng C.',
        'Đối tượng dựng sẵn tự động ngăn chặn mọi lỗi cú pháp xảy ra trong toàn bộ script.'
      ],
      correctIndex: 3,
      explanation: '4 lý do của Mark Lutz gồm: (1) Dễ viết hơn; (2) Là nền tảng mở rộng; (3) Hiệu năng vượt trội; (4) Chuẩn hóa của ngôn ngữ. Không có lý do nào nói đối tượng dựng sẵn ngăn chặn lỗi cú pháp.'
    },
    {
      question: 'Tính "chuẩn hóa của ngôn ngữ" (Lý do 4) mang lại lợi ích thiết thực gì trong dự án thực tế?',
      options: [
        'Công cụ dựng sẵn luôn đồng nhất ở mọi nơi và mọi dự án, tránh được sự phân mảnh của các bộ công cụ tự chế độc quyền.',
        'Chương trình viết ra không bao giờ cần kiểm tra lỗi hay bảo trì.',
        'Cho phép Python chạy được mà không cần cài đặt trình thông dịch.',
        'Lập trình viên không cần kết nối mạng khi tải thư viện bên thứ ba.'
      ],
      correctIndex: 0,
      explanation: 'Vì các công cụ dựng sẵn là chuẩn hóa nên mã nguồn nhất quán trên mọi máy tính và giữa các nhóm lập trình, không bị mỗi nơi tự sáng chế một chuẩn riêng.'
    }
  ],

  summary: [
    'Ngôn ngữ cấp thấp đòi hỏi tự hiện thực cấu trúc dữ liệu và quản lý bộ nhớ thủ công, rất tẻ nhạt và dễ sinh lỗi.',
    'Python loại bỏ công việc cơ bắp đó bằng việc cung cấp sẵn các kiểu đối tượng cốt lõi mạnh mẽ.',
    '4 lý do cốt tử để dùng đối tượng dựng sẵn: Dễ viết hơn, Nền tảng mở rộng, Hiệu năng tối ưu bằng C, và Chuẩn hóa ngôn ngữ.',
    'Các lớp và đối tượng tự tạo sau này phần lớn vẫn xây dựng dựa trên danh sách và từ điển dựng sẵn.',
    'Ý chính: Đối tượng dựng sẵn vừa dễ dùng vừa mạnh mẽ hơn hầu hết những gì có thể tự tạo từ đầu, và là cốt lõi của mọi chương trình Python.'
  ]
};
