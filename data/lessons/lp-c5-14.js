export default {
  id: 'lp-c5-14',
  partId: 'part-lp-c5',
  chapter: 'Chương 5: Số và biểu thức',
  number: 'C5.14',
  title: 'Module Thống kê & Ngẫu nhiên: statistics và random',
  subtitle: 'Thao tác số học thực tế: tính trung bình, trung vị, sinh số ngẫu nhiên, lựa chọn phần tử và xáo trộn danh sách',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Sử dụng module statistics để thực hiện các phép tính thống kê cơ bản: mean (trung bình cộng), median (trung vị).',
    'Sử dụng module random để sinh số thực ngẫu nhiên [0, 1) bằng random() và số nguyên ngẫu nhiên bằng randint().',
    'Thực hành các thao tác ngẫu nhiên trên dãy tuần tự: chọn phần tử bằng choice() và xáo trộn danh sách tại chỗ bằng shuffle().',
    'Nhận biết các ứng dụng thực tế phổ biến: lập trình trò chơi, giao diện người dùng GUI, và khởi tạo trọng số mạng nơ-ron trong AI.'
  ],

  intuition: {
    title: 'Xúc xắc may rủi và bảng phân tích số liệu',
    metaphor: 'Trong cuộc sống, chúng ta vừa cần sự phân tích chính xác dựa trên số đông (thống kê), vừa cần yếu tố bất ngờ không đoán trước được (ngẫu nhiên). Module statistics giống như một nhà phân tích số liệu ngồi tổng hợp điểm thi: tính điểm trung bình (mean) để biết mức học chung, tìm điểm trung vị (median) để lọc bỏ điểm cá biệt. Còn module random giống như một chiếc hộp lắc xúc xắc hay một người chia bài sành sỏi: rút ngẫu nhiên một lá bài (choice) hoặc xới tung bộ bài lên một cách ngẫu nhiên tuyệt đối (shuffle).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HAI MODULE TIỆN ÍCH THƯ VIỆN CHUẨN: STATISTICS & RANDOM</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">import statistics</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              • <code>statistics.mean(data)</code>: Trung bình cộng<br>
              • <code>statistics.median(data)</code>: Trung vị (phần tử chính giữa)<br>
              • Phép tính chuẩn máy tính bỏ túi
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">import random</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">
              • <code>random.random()</code>: Float [0.0, 1.0)<br>
              • <code>random.randint(1, 10)</code>: Int trong [1, 10]<br>
              • <code>random.choice(seq)</code>: Chọn 1 phần tử<br>
              • <code>random.shuffle(list)</code>: Xáo trộn tại chỗ
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Module Thống kê statistics',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 5: Số và biểu thức • <strong>PDF Trang 22 / 38 – Trang 23 / 38</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Các module <code>statistics</code> và <code>random</code> của thư viện chuẩn cũng bắt buộc phải được <code>import</code> trước khi sử dụng. Module <code>statistics</code> hỗ trợ các phép tính thường thấy trên máy tính bỏ túi và phân tích dữ liệu cơ bản:</p>
        <ul>
          <li><strong><code>statistics.mean(iterable)</code>:</strong> Tính giá trị trung bình cộng (tổng các phần tử chia cho số lượng).</li>
          <li><strong><code>statistics.median(iterable)</code>:</strong> Tính giá trị trung vị (giá trị nằm ở chính giữa sau khi tập hợp dữ liệu đã được sắp xếp).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Tính toán thống kê với module statistics',
          code: `>>> import statistics
>>> statistics.mean([1, 2, 4, 5, 7])      # Trung bình cộng: 19 / 5 = 3.8
3.8
>>> statistics.median([1, 2, 4, 5, 7])    # Trung vị (phần tử ở giữa tập đã xếp)
4`,
          output: `3.8
4`,
          annotations: [
            { line: 2, text: 'mean() trả về số thực float biểu diễn trung bình cộng.' },
            { line: 4, text: 'median() tìm ra số 4 là phần tử chính giữa của dãy 5 số.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Module Ngẫu nhiên random: Sinh số và Thao tác trên Dãy',
      content: `
        <p>Module <code>random</code> cho phép thực hiện các tác vụ sinh số ngẫu nhiên phục vụ mô phỏng và trò chơi:</p>
        <ul>
          <li><code>random.random()</code>: Trả về một số thực ngẫu nhiên trong nửa khoảng <code>[0.0, 1.0)</code>.</li>
          <li><code>random.randint(a, b)</code>: Trả về một số nguyên ngẫu nhiên <code>N</code> nằm trong đoạn <code>a &lt;= N &lt;= b</code> (bao gồm cả hai đầu mút <code>a</code> và <code>b</code>).</li>
          <li><code>random.choice(sequence)</code>: Chọn ngẫu nhiên một phần tử từ một dãy tuần tự (chuỗi, danh sách, tuple).</li>
          <li><code>random.shuffle(list)</code>: Xáo trộn vị trí các phần tử của một danh sách trực tiếp tại chỗ (in-place).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sinh số và xáo trộn danh sách với module random',
          code: `>>> import random
>>> random.random()
0.5566014960423105
>>> random.randint(1, 10)
5
>>> random.randint(1, 10)
9
>>> random.choice(['Pizza', 'Tacos', 'Tikka', 'Lasagna'])
'Tikka'
>>> suits = ['hearts', 'clubs', 'diamonds', 'spades']
>>> random.shuffle(suits)      # Xáo trộn danh sách tại chỗ
>>> suits
['spades', 'hearts', 'diamonds', 'clubs']`,
          output: `0.5566014960423105
5
9
'Tikka'
['spades', 'hearts', 'diamonds', 'clubs']`,
          annotations: [
            { line: 2, text: 'random() sinh số thực ngẫu nhiên từ 0.0 đến sát 1.0.' },
            { line: 4, text: 'randint(1, 10) sinh số nguyên ngẫu nhiên từ 1 đến 10.' },
            { line: 8, text: 'choice() bốc ngẫu nhiên một món ăn từ danh sách.' },
            { line: 11, text: 'shuffle() thay đổi thứ tự các phần tử của suits trực tiếp trong bộ nhớ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ứng dụng Thực tế của Tính toán Ngẫu nhiên',
      content: `
        <p>Dù các ví dụ dòng lệnh ở đây chỉ mang tính minh họa ngắn gọn, nhưng trong thực tế phát triển phần mềm, module <code>random</code> đóng vai trò then chốt trong rất nhiều bài toán:</p>
        <ul>
          <li><strong>Lập trình trò chơi (Game Dev):</strong> Xáo các bộ bài, mô phỏng tung xúc xắc, sinh vị trí xuất hiện quái vật hoặc vật phẩm.</li>
          <li><strong>Giao diện người dùng (GUI):</strong> Chọn ngẫu nhiên hình ảnh nền trong một ứng dụng trình chiếu ảnh (slideshow), hiển thị ngẫu nhiên các câu trích dẫn hàng ngày.</li>
          <li><strong>Trí tuệ nhân tạo (AI & Machine Learning):</strong> Khởi tạo trọng số ban đầu (weights initialization) cho các tầng mạng nơ-ron nhân tạo, phân chia tập dữ liệu huấn luyện và kiểm thử.</li>
        </ul>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Lỗi thường gặp với random.shuffle()',
        content: 'Hàm <code>random.shuffle(L)</code> xáo trộn danh sách <strong>tại chỗ (in-place)</strong> và trả về giá trị <code>None</code>. Do đó, nếu bạn viết <code>L = random.shuffle(L)</code>, biến <code>L</code> của bạn sẽ bị gán thành <code>None</code> và danh sách gốc sẽ biến mất! Cách dùng đúng là gọi <code>random.shuffle(L)</code> rồi tiếp tục sử dụng <code>L</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Mô phỏng trò chơi tung xúc xắc 6 mặt',
      level: 'Dễ',
      problem: 'Viết một hàm <code>tung_xuc_xac()</code> trả về kết quả ngẫu nhiên của một con xúc xắc 6 mặt (từ 1 đến 6). Sau đó mô phỏng tung xúc xắc 5 lần và in kết quả.',
      hint: 'Dùng random.randint(1, 6).',
      solutionCode: `import random

def tung_xuc_xac():
    return random.randint(1, 6)

ket_qua = [tung_xuc_xac() for _ in range(5)]
print("Kết quả 5 lần tung xúc xắc:", ket_qua)`,
      solutionOutput: `Kết quả 5 lần tung xúc xắc: [...]`,
      explanation: '<code>random.randint(1, 6)</code> sinh ngẫu nhiên số nguyên trong đoạn [1, 6] với xác suất đồng đều cho mỗi mặt xúc xắc.'
    }
  ],

  quiz: [
    {
      question: 'Hàm random.shuffle(my_list) trong Python trả về giá trị gì?',
      options: [
        'Một bản sao danh sách mới đã được xáo trộn.',
        'Giá trị None (vì nó thay đổi danh sách gốc trực tiếp tại chỗ).',
        'Số lượng phần tử đã được hoán đổi.',
        'Giá trị Boolean True nếu xáo trộn thành công.'
      ],
      correctIndex: 1,
      explanation: 'Giống như phương thức list.sort(), random.shuffle() sửa đổi trực tiếp danh sách truyền vào tại chỗ và trả về None.'
    },
    {
      question: 'Để chọn ngẫu nhiên một phần tử từ một danh sách ["A", "B", "C", "D"], hàm nào sau đây là phù hợp nhất?',
      options: [
        'random.random(["A", "B", "C", "D"])',
        'random.choice(["A", "B", "C", "D"])',
        'random.sample(["A", "B", "C", "D"])',
        'statistics.choice(["A", "B", "C", "D"])'
      ],
      correctIndex: 1,
      explanation: 'Hàm random.choice(sequence) nhận một dãy tuần tự và trả về ngẫu nhiên một phần tử duy nhất từ dãy đó.'
    }
  ],

  summary: [
    'Module statistics hỗ trợ tính trung bình cộng (mean) và trung vị (median).',
    'Module random cung cấp các công cụ sinh số ngẫu nhiên: random() (float [0, 1)) và randint(a, b) (int [a, b]).',
    'Hàm random.choice() bốc ngẫu nhiên một phần tử từ dãy; random.shuffle() xáo trộn danh sách tại chỗ.',
    'random.shuffle() trả về None, thay đổi danh sách trực tiếp trong bộ nhớ.',
    'Ý chính: Thống kê và ngẫu nhiên là hai mảnh ghép bổ trợ hoàn hảo cho hệ thống số học cơ bản của Python.'
  ]
};