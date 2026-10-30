export default {
  id: 'lp-c8-13',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.13',
  title: 'Thao tác cơ bản với Dictionary: Đánh chỉ mục theo khóa, len(), Toán tử in & View keys()',
  subtitle: 'Thực hành các thao tác nền tảng trên Dictionary trong REPL: truy xuất theo khóa, đo kích thước, kiểm tra khóa O(1) và đối tượng view keys()',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo cú pháp đánh chỉ mục `D[key]` để truy xuất giá trị liên kết theo khóa biểu tượng.',
    'Sử dụng hàm `len(D)` để đo số lượng cặp khóa/giá trị đang được lưu trữ trong Dictionary.',
    'Nắm vững toán tử `in` trên Dictionary: kiểm tra sự tồn tại của KHÓA với tốc độ O(1) nhờ giao thức băm.',
    'Hiểu bản chất phương thức `keys()`: trả về đối tượng khung nhìn view có thể lặp (iterable view) tạo giá trị theo nhu cầu.'
  ],

  intuition: {
    title: 'Hộp thư gia đình và Chiếc nhãn dán trên nắp',
    metaphor: 'Hãy tưởng tượng bạn có một chiếc tủ hộp thư gồm nhiều ngăn chia. Khi bạn viết D["Py"], bạn không cần biết ngăn thư này nằm ở vị trí vật lý thứ mấy; bạn chỉ cần tìm chiếc nhãn dán chữ "Py" trên nắp hộp để thò tay vào lấy thư (giá trị). Nếu bạn muốn biết chiếc tủ này đang có tổng cộng bao nhiêu ngăn chứa thư, hàm len(D) sẽ đếm số lượng ngăn đang có chủ. Còn khi bạn dùng toán tử in ("code" in D), bạn chỉ việc liếc mắt xem nhãn tên "code" có dán trên tủ hay không — bạn không bao giờ phải mở từng lá thư bên trong ra để đọc nội dung! Cuối cùng, phương thức D.keys() giống như một tấm bảng kê danh sách toàn bộ các nhãn tên đang được dán trên tủ!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">TRUY XUẤT THEO KHÓA BIỂU TƯỢNG VÀ KIỂM TRA THÀNH VIÊN</div>
        <div style="display:flex;justify-content:center;gap:12px;align-items:center;flex-wrap:wrap;">
          <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Khóa 'hack'</div>
            <div style="font-weight:700;color:#10b981;font-size:1.1rem;">Giá trị: 1</div>
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--accent-primary);font-weight:700;">D['Py'] ➔ Khóa 'Py'</div>
            <div style="font-weight:700;color:#8b5cf6;font-size:1.1rem;">Giá trị: 2</div>
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Khóa 'code'</div>
            <div style="font-weight:700;color:#3b82f6;font-size:1.1rem;">Giá trị: 3</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">
          'code' in D ➔ Kiểm tra trực tiếp trên các khóa • len(D) = 3 mục
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Đánh chỉ mục theo Khóa và Thứ tự Chèn',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 19 / 42 – Trang 20 / 42</strong>.</p>
          </div>
        </div>

        <p>Trong hoạt động thông thường, bạn tạo dictionary bằng các hằng số bằng chữ (literal), đồng thời lưu trữ và truy cập các phần tử theo khóa bằng phép đánh chỉ mục:</p>

        <p>Chúng ta sử dụng cùng một cú pháp ngoặc vuông <code>D[key]</code> để đánh chỉ mục dictionary theo khóa giống như từng dùng để đánh chỉ mục list theo vị trí bù số học, nhưng ở đây nó mang ý nghĩa <strong>truy cập theo khóa, chứ không phải theo vị trí</strong>.</p>

        <p><em>Ghi nhận thứ tự chèn:</em> Hãy chú ý rằng các khóa của dictionary ngày nay giữ nguyên thứ tự chèn của chúng từ trái sang phải, không còn ngẫu nhiên như các phiên bản Python 2.X hay các tập hợp set.</p>
      `,
      codeExamples: [
        {
          title: 'Tạo Dictionary và truy xuất giá trị theo khóa trong phiên tương tác REPL',
          code: `# Tạo một dictionary với 3 mục
D = {'hack': 1, 'Py': 2, 'code': 3}

# Lấy giá trị theo khóa biểu tượng
val_py = D['Py']
print("D['Py']:", val_py)

# Hiển thị dictionary nguyên vẹn
print("Dictionary D:", D)`,
          output: `D['Py']: 2
Dictionary D: {'hack': 1, 'Py': 2, 'code': 3}`,
          annotations: [
            { line: 2, text: 'Khởi tạo dict D chứa 3 cặp khóa/giá trị.' },
            { line: 5, text: 'D[\'Py\'] tra cứu theo khóa chuỗi \'Py\', trả về giá trị số nguyên 2.' },
            { line: 9, text: 'Thứ tự hiển thị khớp chính xác 100% với thứ tự chèn: \'hack\', \'Py\', \'code\'.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Đo Độ dài len() và Kiểm tra Thành viên với Toán tử in',
      content: `
        <p>Hàm dựng sẵn <strong><code>len(D)</code></strong> cũng hoạt động hoàn hảo trên dictionary—nó trả về số lượng giá trị được lưu trữ trong dictionary hay nói cách khác là <strong>tổng số lượng khóa duy nhất</strong> của nó.</p>

        <p><strong>Toán tử kiểm tra thành viên <code>in</code> trên Dictionary:</strong><br>
        Như tác giả Mark Lutz nhấn mạnh ở trang 20: Phép kiểm tra thành viên <code>in</code> dùng cho chuỗi và list cũng hoạt động trên dictionary, nhưng ở đây <strong>nó kiểm tra xem một KHÓA có được lưu trữ hay không</strong> (chứ không phải kiểm tra giá trị!):</p>

        <p>Về mặt kỹ thuật, điều này hoạt động được vì dictionary định nghĩa một giao thức do <code>in</code> thực thi để tra cứu khóa nhanh chóng qua bảng băm với chi phí cực thấp <strong>O(1)</strong>. Điều này sẽ có ý nghĩa quan trọng sau này trong cuốn sách khi chúng ta tìm hiểu về iterator và lớp (class).</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng hàm len() và toán tử in kiểm tra sự tồn tại của khóa',
          code: `D = {'hack': 1, 'Py': 2, 'code': 3}

# Số lượng mục trong dictionary
print("len(D):          ", len(D))

# Kiểm tra thành viên của KHÓA
print("'code' in D:     ", 'code' in D)
print("'missing' in D:  ", 'missing' in D)

# Lưu ý: toán tử in chỉ kiểm tra KHÓA, không kiểm tra GIÁ TRỊ!
print("1 in D:          ", 1 in D) # 1 là GIÁ TRỊ, không phải khóa!`,
          output: `len(D):           3
'code' in D:      True
'missing' in D:   False
1 in D:           False`,
          annotations: [
            { line: 4, text: 'len(D) trả về 3 vì dict có đúng 3 mục.' },
            { line: 7, text: '\'code\' in D trả về True vì chuỗi \'code\' là một khóa trong D.' },
            { line: 11, text: '1 in D trả về False vì 1 là giá trị (value) chứ không phải khóa (key).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phương thức keys() và Đối tượng View (Khung nhìn)',
      content: `
        <p>Phương thức <strong><code>D.keys()</code></strong> trả về tất cả các khóa có mặt trong dictionary. Phương thức này đặc biệt hữu ích khi bạn cần xử lý toàn bộ dictionary trong vòng lặp.</p>

        <p><em>Bản chất tầng sâu:</em> Trong Python 3, phương thức <code>keys()</code> không trả về một list vật lý chiếm dụng bộ nhớ RAM. Thay vào đó, nó trả về một <strong>đối tượng "view" (khung nhìn) có thể lặp (iterable)</strong> tạo ra kết quả theo nhu cầu (lazy evaluation). Lệnh gọi <code>list(D.keys())</code> buộc đối tượng view phải cung cấp tất cả các giá trị của nó cùng một lúc để hiển thị tại REPL tương tác:</p>

        <p>Mặc dù lệnh gọi <code>list()</code> giúp hiển thị kết quả trực quan, nhưng trong mã nguồn thực tế (như vòng lặp <code>for key in D:</code>), việc ép kiểu qua <code>list()</code> là không bắt buộc và thậm chí có thể kém tối ưu vì tốn thêm bộ nhớ không cần thiết.</p>
      `,
      codeExamples: [
        {
          title: 'Khám phá đối tượng view keys() và cách ép kiểu sang List',
          code: `D = {'hack': 1, 'Py': 2, 'code': 3}

# Gọi phương thức keys() trả về một đối tượng view
k_view = D.keys()
print("Kết quả D.keys():     ", k_view)
print("Kiểu của D.keys():    ", type(k_view).__name__)

# Bọc qua list() để thu thập các khóa thành một list thực sự
keys_list = list(D.keys())
print("list(D.keys()):       ", keys_list)

# Duyệt trực tiếp qua view trong vòng lặp for (không cần gọi list)
print("Duyệt lặp các khóa:   ", end="")
for k in D.keys():
    print(k, end=" ")
print()`,
          output: `Kết quả D.keys():      dict_keys(['hack', 'Py', 'code'])
Kiểu của D.keys():     dict_keys
list(D.keys()):        ['hack', 'Py', 'code']
Duyệt lặp các khóa:    hack Py code`,
          annotations: [
            { line: 4, text: 'D.keys() trả về đối tượng đặc thù dict_keys.' },
            { line: 9, text: 'list(D.keys()) tạo một list độc lập chứa 3 khóa.' },
            { line: 14, text: 'Vòng lặp for duyệt trực tiếp qua view mà không cần tạo list trung gian.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Cú pháp duyệt lặp ngắn gọn nhất qua Dictionary',
        content: 'Vì bản thân dictionary đã là một iterable sinh ra các khóa ngầm định, hai cách viết sau đây hoạt động tương đương nhau:<br>• <code>for key in D.keys():</code><br>• <code>for key in D:</code> (ngắn gọn hơn và được các lập trình viên Python ưa chuộng hơn).'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy KeyError khi truy xuất khóa không tồn tại',
        content: 'Nếu bạn truy xuất một khóa không có trong dictionary bằng cú pháp <code>D["missing_key"]</code>, Python sẽ lập tức kích hoạt lỗi <code>KeyError</code>. Để truy xuất an toàn mà không bị crash ứng dụng, hãy dùng phương thức <code>get()</code> sắp học ở bài C8.15.'
      }
    ]
  },

  exercises: [
    {
      title: 'Kiểm tra tồn tại và truy xuất an toàn giá trị trong bảng cấu hình',
      level: 'Dễ',
      problem: 'Cho dictionary config = {"host": "localhost", "port": 8080, "debug": True}. Hãy viết đoạn mã: (1) Kiểm tra xem khóa "timeout" có tồn tại trong config không bằng toán tử in. (2) Nếu có in ra giá trị của nó, nếu không in thông báo "Chưa cấu hình timeout".',
      hint: 'Dùng cấu trúc if "timeout" in config: ... else: ...',
      solutionCode: `config = {"host": "localhost", "port": 8080, "debug": True}

# Kiểm tra sự tồn tại của khóa
if "timeout" in config:
    print("Timeout:", config["timeout"])
else:
    print("Chưa cấu hình timeout (Dùng mặc định)")`,
      solutionOutput: `Chưa cấu hình timeout (Dùng mặc định)`,
      explanation: 'Toán tử "timeout" in config kiểm tra nhanh O(1) và trả về False vì khóa này không có trong bảng cấu hình.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn chạy lệnh: "value" in D trên một dictionary D, toán tử in đang kiểm tra điều gì?',
      options: [
        'Kiểm tra xem chuỗi "value" có tồn tại trong danh sách các KHÓA (keys) của D hay không.',
        'Kiểm tra xem chuỗi "value" có tồn tại trong danh sách các GIÁ TRỊ (values) của D hay không.',
        'Kiểm tra cả khóa lẫn giá trị xem có khớp không.',
        'Đếm số lượng phần tử của D.'
      ],
      correctIndex: 0,
      explanation: 'Toán tử in trên dictionary mặc định chỉ kiểm tra sự tồn tại của KHÓA (key), không kiểm tra giá trị (value).'
    },
    {
      question: 'Phương thức D.keys() trong Python 3 trả về kiểu đối tượng nào?',
      options: [
        'Một list vật lý chứa tất cả các khóa.',
        'Một tuple chứa tất cả các khóa.',
        'Một đối tượng view có thể lặp (dict_keys) tạo ra kết quả theo nhu cầu.',
        'Một chuỗi ký tự nối các khóa lại với nhau.'
      ],
      correctIndex: 2,
      explanation: 'Trong Python 3, D.keys() trả về một đối tượng view (dict_keys), không tốn RAM để tạo list vật lý trừ khi được bọc trong list().'
    }
  ],

  summary: [
    'Truy xuất phần tử theo khóa trong Dictionary sử dụng cú pháp ngoặc vuông D[key] với tốc độ O(1).',
    'Hàm len(D) trả về tổng số lượng khóa duy nhất được lưu trữ trong Dictionary.',
    'Toán tử in và not in trên Dictionary kiểm tra sự tồn tại của KHÓA cực kỳ nhanh chóng thông qua hàm băm.',
    'Phương thức D.keys() trả về một đối tượng view có thể lặp (dict_keys), phản ánh động nội dung của từ điển.',
    'Để có một list thực sự chứa các khóa, ta bọc phương thức qua hàm khởi tạo list(D.keys()).'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.14), chúng ta sẽ khám phá cách Thay đổi Dictionary tại chỗ: gán khóa mới (tự mở rộng), sửa khóa cũ, câu lệnh del và kỹ thuật lồng ghép đa tầng.'
};