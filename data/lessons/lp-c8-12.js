export default {
  id: 'lp-c8-12',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.12',
  title: 'Căn bản về Dictionary: Phân loại Ánh xạ khả biến, Cấu trúc Bảng băm & Thứ tự chèn',
  subtitle: 'Khám phá kiểu dữ liệu Ánh xạ (mapping) dựng sẵn duy nhất của Python, cơ chế Bảng băm O(1) và tính năng Thứ tự chèn từ Python 3.7+',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững định nghĩa cốt lõi: Dictionary là tập hợp các cặp Khóa/Giá trị thuộc phân loại Ánh xạ khả biến (Mutable Mapping).',
    'Hiểu cấu trúc tầng sâu bên dưới: Bảng băm (Hash Table) giúp thao tác tra cứu theo khóa đạt tốc độ O(1) cực hạn.',
    'Nắm vững lịch sử và bản chất của tính năng "Thứ tự chèn" (Insertion Order) được chuẩn hóa từ Python 3.7+.',
    'Thành thạo cú pháp hằng số bằng chữ (literal) của Dictionary: cặp ngoặc nhọn `{}`, phân cách dấu hai chấm `:` và dấu phẩy `,`.'
  ],

  intuition: {
    title: 'Cuốn sổ danh bạ tra cứu theo tên thay vì số trang',
    metaphor: 'Hãy tưởng tượng bạn đang tìm số điện thoại của một người bạn tên "Nam". Nếu danh bạ lưu dưới dạng List, bạn sẽ phải lật từng trang một từ trang 0, 1, 2... đến khi nào nhìn thấy chữ "Nam" (tìm kiếm tuyến tính O(N)). Nếu danh bạ có một triệu người, bạn sẽ mất cả ngày! Nhưng Dictionary hoạt động như một thuật toán phù thủy: khi bạn đọc tên "Nam", Python đưa tên này qua một cỗ máy băm (hàm băm - hash function) để biến chữ "Nam" thành một con số nguyên địa chỉ duy nhất. Con số này dẫn thẳng tới ngăn tủ chứa số điện thoại của Nam ngay tức khắc (truy xuất O(1))! Mỗi ngăn tủ có một nhãn tên (khóa - key) và một món đồ (giá trị - value). Đó chính là sức mạnh vượt trội của Bảng băm!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH BẢNG BĂM: ÁNH XẠ KHÓA ➔ GIÁ TRỊ (KEY ➔ VALUE)</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:16px;flex-wrap:wrap;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Khóa (Key)</div>
            <div style="font-weight:700;color:#8b5cf6;font-size:1.05rem;">'name'</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;">
            <span style="font-size:0.72rem;color:var(--text-muted);">Hàm băm hash()</span>
            <span style="color:var(--accent-primary);font-weight:700;font-size:1.2rem;">➔</span>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Vị trí băm</div>
            <div style="font-weight:700;color:var(--accent-primary);font-size:1.05rem;">Slot #4</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;">
            <span style="font-size:0.72rem;color:var(--text-muted);">Lần theo con trỏ</span>
            <span style="color:var(--accent-primary);font-weight:700;font-size:1.2rem;">➔</span>
          </div>
          <div style="padding:10px;background:rgba(16,185,129,0.15);border:1px solid #10b981;border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:#10b981;">Giá trị (Value)</div>
            <div style="font-weight:700;color:#10b981;font-size:1.05rem;">'Pat'</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">
          Truy xuất O(1) không phụ thuộc kích thước dữ liệu • Duy trì thứ tự chèn từ Python 3.7+
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm và Năm Đặc tính Cốt lõi của Dictionary',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 16 / 42 – Trang 17 / 42</strong>.</p>
          </div>
        </div>

        <p>Cùng với list, <strong>dictionary (từ điển / dict)</strong> là một trong những kiểu đối tượng dựng sẵn linh hoạt nhất trong Python. Nếu coi list là tập hợp các đối tượng dựa trên thứ tự vị trí số học, bạn có thể coi dictionary là <strong>tập hợp dựa trên khóa (key-based)</strong>.</p>

        <p>Trong khi list đảm nhận vai trò của mảng, dictionary có thể thay thế cho bản ghi (record), bảng tìm kiếm (search table) và bất kỳ dạng tập hợp nào khác mà tên phần tử mang nhiều ý nghĩa hơn là vị trí của phần tử. Dưới đây là 5 đặc tính định hình nên Dictionary:</p>

        <ol>
          <li><strong>Truy cập theo khóa, không theo vị trí bù (offset):</strong> Dictionary đôi khi được gọi là <em>mảng kết hợp (associative array)</em> hoặc <em>mảng băm (hash table)</em>. Chúng liên kết một tập hợp các giá trị với các khóa tương ứng. Chỉ mục ở đây mang hình thức của một khóa biểu tượng chứ không phải vị trí bù số.</li>
          <li><strong>Tập hợp có thứ tự chèn chứa các đối tượng tùy ý:</strong> Các khóa được sắp xếp theo đúng thứ tự mà chúng được chèn vào. Kể từ Python 3.7 (CPython 3.6), việc duy trì thứ tự chèn là tính năng chính thức của ngôn ngữ (trước đó thứ tự là ngẫu nhiên).</li>
          <li><strong>Chiều dài khả biến, dị thể, và có thể lồng nhau tùy ý:</strong> Có thể mở rộng và thu hẹp tại chỗ không cần bản sao mới; có thể chứa bất kỳ kiểu dữ liệu nào và lồng ghép sâu tùy ý. Mỗi khóa chỉ có đúng một giá trị liên kết, nhưng giá trị đó có thể là một tập hợp (list, dict khác).</li>
          <li><strong>Thuộc phân loại "ánh xạ khả biến" (mutable mapping):</strong> Dictionary là đại diện kiểu cốt lõi dựng sẵn duy nhất của phân loại ánh xạ (mapping). Vì dựa trên khóa, các thao tác phụ thuộc thứ tự vị trí cố định (ghép nối <code>+</code>, cắt lát <code>[:]</code>) hoàn toàn không áp dụng được và sẽ bị báo lỗi.</li>
          <li><strong>Bảng tham chiếu đối tượng (bảng băm - hash table):</strong> Về mặt nội bộ, dictionary được cài đặt dưới dạng các bảng băm tối ưu cao, khởi đầu nhỏ và tự mở rộng theo nhu cầu, lưu giữ các tham chiếu đối tượng.</li>
        </ol>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Cấu trúc Bảng băm (Hash Table) và Hiệu năng Tra cứu O(1)',
      content: `
        <p>Về mặt kỹ thuật, việc đánh chỉ mục một dictionary là một <strong>phép tìm kiếm cực kỳ nhanh</strong>. Python sử dụng các thuật toán băm tối ưu (thuật toán băm mở open-addressing với kỹ thuật nén bảng băm nhỏ gọn từ PEP 468/CPython 3.6):</p>

        <ul>
          <li>Khi bạn cung cấp khóa <code>D[key]</code>, Python tính mã băm <code>hash(key)</code> để xác định vị trí ô lưu trữ trong mảng chỉ mục chỉ trong một vài lệnh CPU.</li>
          <li>Tốc độ tra cứu là <strong>O(1)</strong> — nghĩa là dù dictionary của bạn chứa 10 phần tử hay 10 triệu phần tử, thời gian để tìm thấy giá trị của một khóa gần như bằng nhau tuyệt đối!</li>
          <li>Điều kiện tiên quyết: Để một đối tượng có thể làm khóa trong dictionary, nó bắt buộc phải là <strong>đối tượng băm được (hashable) và bất biến (immutable)</strong>, chẳng hạn như chuỗi, số nguyên, số thực, hoặc tuple (sẽ được đào sâu ở bài C8.20).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khám phá hàm băm hash() và cấu trúc của Dictionary',
          code: `# Kiểm tra mã băm của các khóa bất biến
print("hash('name'):", hash('name'))
print("hash(2024):  ", hash(2024))
print("hash((1, 2)):", hash((1, 2)))

# Khởi tạo dictionary literal
D = {'name': 'Pat', 'age': 40.0, 'job': 'dev'}
print("\nDictionary D:", D)
print("Truy xuất theo khóa 'name':", repr(D['name']))
print("Truy xuất theo khóa 'age': ", D['age'])`,
          output: `hash('name'): ...
hash(2024):   2024
hash((1, 2)): ...

Dictionary D: {'name': 'Pat', 'age': 40.0, 'job': 'dev'}
Truy xuất theo khóa 'name': 'Pat'
Truy xuất theo khóa 'age':  40.0`,
          annotations: [
            { line: 2, text: 'Chuỗi, số nguyên, tuple đều có mã băm cố định, thỏa mãn điều kiện làm khóa.' },
            { line: 8, text: 'Cú pháp literal cặp ngoặc nhọn {key: value} biểu diễn trực quan một ánh xạ.' },
            { line: 9, text: 'D[\'name\'] tính hash(\'name\') và truy xuất giá trị \'Pat\' với độ phức tạp O(1).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cú pháp Hằng số bằng chữ (Literal) của Dictionary',
      content: `
        <p>Khi được viết mã dưới dạng biểu thức hằng số bằng chữ (literal), một dictionary được viết dưới dạng một chuỗi các cặp <code>key: value</code> ngăn cách nhau bằng dấu phẩy và đặt trong cặp ngoặc nhọn <code>{}</code>:</p>

        <ul>
          <li><strong>Dictionary rỗng:</strong> <code>D = {}</code> — một cặp ngoặc nhọn trống (lưu ý: set rỗng phải dùng <code>set()</code>, vì <code>{}</code> luôn được ưu tiên cho dict).</li>
          <li><strong>Dictionary đơn giản:</strong> <code>D = {'name': 'Pat', 'age': 40.0}</code>.</li>
          <li><strong>Dictionary lồng nhau:</strong> <code>E = {'cto': {'name': 'Sue', 'age': 40}}</code> — bạn có thể lồng dictionary làm giá trị bên trong một dictionary khác, hoặc bên trong một literal của list hay tuple tùy ý.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Các dạng literal của Dictionary và cấu trúc lồng nhau',
          code: `# Dictionary rỗng
empty_dict = {}
print("Dict rỗng:", empty_dict, "| Độ dài:", len(empty_dict))

# Dictionary biểu diễn bản ghi thông tin
book = {
    'title': 'Learning Python',
    'edition': 6,
    'author': 'Mark Lutz',
    'tags': ['programming', 'python', 'tutorial']
}
print("\nThông tin sách:", book['title'], "- Tác giả:", book['author'])
print("Thẻ kỹ thuật đầu tiên:", book['tags'][0])`,
          output: `Dict rỗng: {} | Độ dài: 0

Thông tin sách: Learning Python - Tác giả: Mark Lutz
Thẻ kỹ thuật đầu tiên: programming`,
          annotations: [
            { line: 2, text: '{} khởi tạo một dictionary rỗng có độ dài 0.' },
            { line: 9, text: 'Giá trị liên kết với khóa \'tags\' là một list: lồng ghép hoàn toàn tự nhiên.' },
            { line: 12, text: 'book[\'tags\'][0] truy xuất theo khóa \'tags\' rồi đánh chỉ mục 0 của list.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Thứ tự chèn (Insertion Order) trong Python hiện đại',
        content: 'Kể từ Python 3.7 trở đi, khi bạn lặp qua dictionary hoặc in nó ra màn hình, các khóa được đảm bảo 100% sẽ xuất hiện theo đúng thứ tự mà bạn đã chèn chúng vào. Điều này giúp kết quả đầu ra luôn mạch lạc và có thể dự đoán được.'
      }
    ],
    pitfalls: [
      {
        title: 'Tuyệt đối không dùng toán tử cắt lát hay ghép nối trên Dictionary',
        content: 'Vì dictionary thuộc phân loại Ánh xạ (mapping), các thao tác <code>D1 + D2</code> hay <code>D[0:2]</code> sẽ lập tức gây lỗi <code>TypeError</code>. Bạn không thể cắt lát một từ điển hay dùng dấu cộng để gộp từ điển (để hợp từ điển, hãy dùng phương thức <code>update()</code> hoặc toán tử <code>|</code> trong Python 3.9+ sắp học ở bài C8.18).'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo bản ghi dữ liệu đa tầng bằng Dictionary Literal',
      level: 'Dễ',
      problem: 'Hãy viết mã Python khởi tạo một dictionary sinh viên tên student chứa các trường: \'id\' (số nguyên 2026), \'name\' (chuỗi), và \'scores\' (một dictionary con chứa hai điểm số: \'midterm\': 8.5 và \'final\': 9.0). Sau đó in ra điểm thi cuối kỳ (\'final\').',
      hint: 'Dùng cú pháp lồng nhau: student[\'scores\'][\'final\'].',
      solutionCode: `student = {
    'id': 2026,
    'name': 'Lê Văn B',
    'scores': {
        'midterm': 8.5,
        'final': 9.0
    }
}

print(f"Sinh viên: {student['name']} (MSSV: {student['id']})")
print(f"Điểm thi cuối kỳ: {student['scores']['final']}")`,
      solutionOutput: `Sinh viên: Lê Văn B (MSSV: 2026)
Điểm thi cuối kỳ: 9.0`,
      explanation: 'student[\'scores\'] lấy ra dictionary con, sau đó [\'final\'] truy xuất điểm số 9.0.'
    }
  ],

  quiz: [
    {
      question: 'Dictionary trong Python thuộc phân loại kiểu dữ liệu cốt lõi nào?',
      options: [
        'Dãy tuần tự bất biến (Immutable Sequence).',
        'Ánh xạ khả biến (Mutable Mapping).',
        'Tập hợp số học (Numeric Tower).',
        'Dãy tuần tự khả biến (Mutable Sequence).'
      ],
      correctIndex: 1,
      explanation: 'Dictionary là đại diện cốt lõi dựng sẵn duy nhất của phân loại Ánh xạ khả biến (Mutable Mapping): ánh xạ khóa tới giá trị và có thể thay đổi tại chỗ.'
    },
    {
      question: 'Kể từ phiên bản Python nào thì thứ tự các khóa trong Dictionary được đảm bảo duy trì theo thứ tự chèn (insertion order)?',
      options: [
        'Python 2.7',
        'Python 3.0',
        'Python 3.7 (CPython 3.6)',
        'Python 3.12'
      ],
      correctIndex: 2,
      explanation: 'CPython 3.6 đã bắt đầu duy trì thứ tự chèn như một chi tiết cài đặt tối ưu bảng băm, và Python 3.7 đã chính thức chuẩn hóa thứ tự chèn thành đặc tả ngôn ngữ cho mọi trình thông dịch.'
    }
  ],

  summary: [
    'Dictionary là tập hợp các cặp khóa/giá trị (key: value) linh hoạt, thuộc phân loại Ánh xạ khả biến (Mutable Mapping).',
    'Khác với List truy xuất theo vị trí số học O(N), Dictionary sử dụng Bảng băm (Hash Table) mang lại tốc độ truy xuất O(1) cực hạn.',
    'Các phần tử trong Dictionary duy trì theo đúng thứ tự được chèn vào (insertion order) kể từ Python 3.7+.',
    'Dictionary không hỗ trợ các thao tác dãy tuần tự như cắt lát (slicing) hay phép ghép nối (+).',
    'Cú pháp hằng số bằng chữ của Dictionary sử dụng cặp dấu ngoặc nhọn {}, với mỗi cặp phân cách bởi dấu hai chấm : và các mục cách nhau bởi dấu phẩy.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.13), chúng ta sẽ thực hành các thao tác cơ bản với Dictionary: đánh chỉ mục theo khóa, hàm len(), toán tử in và phương thức keys().'
};