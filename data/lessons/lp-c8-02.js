export default {
  id: 'lp-c8-02',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.2',
  title: 'Thao tác cơ bản với List: Ghép nối (+), Lặp lại (*), Độ dài len() & So sánh List',
  subtitle: 'Áp dụng các toán tử dãy tuần tự cốt lõi lên kiểu List, nguyên tắc cùng kiểu của phép cộng và cơ chế so sánh đệ quy từ trái sang phải',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo các toán tử dãy tuần tự cơ bản trên List: tính độ dài `len()`, phép ghép nối `+` và phép lặp lại `*`.',
    'Nắm vững nguyên tắc kiểu nghiêm ngặt: toán tử `+` bắt buộc cả hai vế phải cùng là List, phân biệt rõ lỗi `TypeError`.',
    'Biết cách chuyển đổi kiểu giữa List và Chuỗi khi cần kết hợp dữ liệu (`str()` vs `list()`).',
    'Thấu suốt thuật toán so sánh List: duyệt so sánh tuần tự từng cặp phần tử từ trái sang phải, so sánh lồng nhau và quy tắc chiều dài.'
  ],

  intuition: {
    title: 'Nối đoàn tàu và Đọ sức hai chuỗi toa',
    metaphor: 'Hãy hình dung mỗi List là một đoàn tàu hỏa gồm các toa nối liền nhau. Khi bạn dùng phép cộng `L1 + L2`, Python như một người thợ đường sắt: anh ta tạo ra một đường ray mới tinh và móc lần lượt các toa của đoàn tàu thứ nhất vào trước, rồi móc tiếp các toa của đoàn tàu thứ hai vào sau. Tuy nhiên, anh thợ này rất nguyên tắc: anh ta chỉ đồng ý móc hai đoàn tàu cùng loại lại với nhau. Nếu bạn bảo anh ta móc một toa tàu hỏa (`list`) vào một toa xe bus đường bộ (`str`), anh ta sẽ lập tức từ chối và phát tín hiệu cảnh báo `TypeError`! Còn khi so sánh hai đoàn tàu `L1 > L2`, vị trọng tài Python sẽ đối chiếu từng toa một từ đầu máy sang đuôi: nếu toa đầu tiên bằng nhau, anh ta nhìn sang toa thứ hai; nếu gặp một toa lớn hơn, kết quả thắng cuộc được định đoạt ngay tức khắc mà không cần nhìn các toa phía sau!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ SO SÁNH LIST TỪ TRÁI SANG PHẢI (LEFT-TO-RIGHT COMPARISON)</div>
        <div style="display:flex;flex-direction:column;gap:10px;align-items:center;">
          <div style="display:flex;gap:8px;align-items:center;">
            <span style="font-weight:700;width:70px;color:var(--accent-primary);">List A:</span>
            <span style="padding:6px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">1</span>
            <span style="padding:6px 12px;background:var(--accent-soft);color:var(--accent-text);border:2px solid var(--accent-primary);border-radius:6px;font-weight:700;">[2, 3]</span>
            <span style="padding:6px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">4</span>
          </div>
          <div style="font-size:1.1rem;font-weight:700;color:var(--success);">▲ So sánh tại vị trí bù 1: [2, 3] &gt; [2, 2] (3 &gt; 2) ➔ Kết luận: A &gt; B ngay lập tức!</div>
          <div style="display:flex;gap:8px;align-items:center;">
            <span style="font-weight:700;width:70px;color:var(--text-muted);">List B:</span>
            <span style="padding:6px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">1</span>
            <span style="padding:6px 12px;background:var(--bg-surface-alt);border:2px solid var(--border-strong);border-radius:6px;font-weight:700;">[2, 2]</span>
            <span style="padding:6px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">4</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Các Thao tác Cơ bản: Độ dài, Ghép nối và Lặp lại',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 4 / 42 – Trang 5 / 42</strong>.</p>
          </div>
        </div>

        <p>Bởi vì là các dãy tuần tự (sequence), list hỗ trợ nhiều thao tác tương tự như chuỗi mà chúng ta đã làm quen trong Chương 7. Tóm lại, list đáp ứng các toán tử <code>+</code> và <code>*</code> rất giống chuỗi—ở đây chúng cũng mang ý nghĩa ghép nối (concatenation) và lặp lại (repetition), ngoại trừ việc <strong>kết quả trả về là một list mới</strong>, chứ không phải một chuỗi:</p>
      `,
      codeExamples: [
        {
          title: 'Các thao tác sequence cơ bản trên List trong phiên tương tác REPL',
          code: `# Độ dài của list
print("len([1, 2, 3]):", len([1, 2, 3]))

# Phép ghép nối hai list (trả về list mới)
concat_res = [1, 2, 3] + [4, 5, 6]
print("[1, 2, 3] + [4, 5, 6]:", concat_res)

# Phép lặp lại nhân bản
repeat_res = ['Py!'] * 4
print("['Py!'] * 4:", repeat_res)`,
          output: `len([1, 2, 3]): 3
[1, 2, 3] + [4, 5, 6]: [1, 2, 3, 4, 5, 6]
['Py!'] * 4: ['Py!', 'Py!', 'Py!', 'Py!']`,
          annotations: [
            { line: 2, text: 'Hàm len() đếm số lượng phần tử cấp ngoài cùng của list.' },
            { line: 5, text: 'Toán tử + tạo ra một list mới tinh gồm 6 phần tử liên tiếp.' },
            { line: 9, text: 'Toán tử * nhân bản tham chiếu của phần tử \'Py!\' lên 4 lần trong list mới.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Yêu cầu Cùng Kiểu của Toán tử + và Kỹ thuật Ép kiểu',
      content: `
        <p>Mặc dù toán tử <code>+</code> hoạt động như nhau đối với list và chuỗi, nhưng điều quan trọng cần biết là <strong>nó yêu cầu cùng một loại dãy tuần tự ở cả hai vế</strong>. Nếu bạn cố tình ghép nối một list với một chuỗi, trình thông dịch sẽ lập tức báo lỗi kiểu (<code>TypeError</code>):</p>

        <p>Để giải quyết điều này, bạn phải chủ động thực hiện chuyển đổi kiểu trước khi thực hiện phép cộng:</p>
        <ul>
          <li><strong>Chuyển list thành chuỗi:</strong> Sử dụng hàm <code>str()</code> để có dạng biểu diễn chuỗi của list trước khi ghép với chuỗi khác.</li>
          <li><strong>Chuyển chuỗi thành list:</strong> Sử dụng hàm dựng sẵn <code>list()</code> để phân rã chuỗi thành một danh sách các ký tự đơn lẻ trước khi ghép với list khác.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Bẫy lỗi TypeError khi khác kiểu và hai phương án ép kiểu',
          code: `# Cố tình ghép nối List với Chuỗi gây lỗi TypeError
try:
    bad = [1, 2] + '34'
except TypeError as err:
    print("Bắt lỗi thành công:", err)

# Phương án 1: Chuyển list thành chuỗi bằng str()
res_str = str([1, 2]) + '34'
print("str([1, 2]) + '34':", repr(res_str))

# Phương án 2: Chuyển chuỗi thành list bằng hàm list()
res_list = [1, 2] + list('34')
print("[1, 2] + list('34'):", res_list)`,
          output: `Bắt lỗi thành công: can only concatenate list (not "str") to list
str([1, 2]) + '34': '[1, 2]34'
[1, 2] + list('34'): [1, 2, '3', '4']`,
          annotations: [
            { line: 3, text: 'List + String kích hoạt TypeError: Python là ngôn ngữ định kiểu mạnh, không tự động ép kiểu ngầm.' },
            { line: 8, text: 'str([1, 2]) trả về chuỗi văn bản \'[1, 2]\', sau đó ghép nối thông thường với \'34\'.' },
            { line: 12, text: 'list(\'34\') phân rã chuỗi thành [\'3\', \'4\'], sau đó ghép hai list lại thành [1, 2, \'3\', \'4\'].' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cơ chế So sánh List Tự động Từ Trái sang Phải',
      content: `
        <p>Như đã gợi ý trong các chương trước, list cũng hỗ trợ các toán tử so sánh (<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>). Python thực hiện so sánh list theo cơ chế <strong>duyệt tuần tự từng phần tử từ trái sang phải</strong> cho đến khi xác định được kết quả:</p>

        <ul>
          <li>Nếu hai phần tử tại cùng một vị trí bù bằng nhau, Python tiếp tục kiểm tra phần tử tiếp theo.</li>
          <li>Nếu gặp một phần tử khác biệt, kết quả so sánh giữa hai phần tử đó sẽ quyết định trực tiếp kết quả chung cuộc của cả hai list.</li>
          <li>Nếu một phần tử là một sublist lồng nhau, Python sẽ đệ quy đi sâu vào bên trong sublist đó để so sánh từng phần tử con.</li>
          <li>Nếu tất cả các phần tử đối ứng đều bằng nhau nhưng một list hết phần tử trước, thì <strong>list ngắn hơn được coi là nhỏ hơn</strong> (như Mark Lutz nói vui: <em>nó thích thuật ngữ "hạn chế về chiều ngang" hơn</em>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Minh họa so sánh List đa tầng trong ví dụ sách Mark Lutz',
          code: `L = [1, [2, 3], 4]

# Kiểm tra bằng nhau: khớp toàn bộ cấu trúc và giá trị
check_eq = (L == [1, [2, 3], 4])

# So sánh độ lớn: tại sublist lồng nhau, phần tử 3 lớn hơn 2
check_gt_nested = (L > [1, [2, 2], 4])

# So sánh độ lớn: L dài hơn list [1] một phần tử
check_gt_short = (L > [1])

print("Kết quả bộ ba so sánh:", (check_eq, check_gt_nested, check_gt_short))`,
          output: `Kết quả bộ ba so sánh: (True, True, True)`,
          annotations: [
            { line: 4, text: 'L == [1, [2, 3], 4] cho True vì cả 3 phần tử (kể cả sublist) khớp 100%.' },
            { line: 7, text: 'L > [1, [2, 2], 4] cho True vì tại offset 1: [2, 3] > [2, 2] do 3 > 2.' },
            { line: 10, text: 'L > [1] cho True vì tại offset 0 hai bên đều là 1, nhưng vế phải hết phần tử trước.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Phép ghép nối + luôn tạo ra đối tượng mới',
        content: 'Hãy lưu ý rằng <code>L1 + L2</code> không làm thay đổi <code>L1</code> hay <code>L2</code>. Nó cấp phát một vùng nhớ mới và tạo ra một đối tượng list thứ ba chứa bản sao các con trỏ tham chiếu. Nếu bạn muốn mở rộng <code>L1</code> tại chỗ mà không tạo list mới, hãy dùng phương thức <code>extend()</code> sắp học ở bài C8.5.'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy nhân bản danh sách chứa đối tượng khả biến lồng nhau',
        content: 'Khi dùng phép nhân bản <code>*</code> trên một list chứa sublist, ví dụ: <code>nested = [[0]] * 3</code>, Python chỉ nhân bản <em>các con trỏ tham chiếu</em> trỏ về cùng một đối tượng sublist duy nhất! Khi bạn sửa <code>nested[0][0] = 99</code>, tất cả các hàng đều sẽ bị đổi thành 99. Hãy dùng list comprehension nếu muốn tạo các sublist độc lập.'
      }
    ]
  },

  exercises: [
    {
      title: 'So sánh và ghép nối an toàn giữa các kiểu dữ liệu',
      level: 'Dễ',
      problem: 'Cho biến l1 = [10, 20] và s = "30". Hãy viết biểu thức ghép s vào cuối l1 sao cho kết quả thu được là một list mới [10, 20, 30] chứa số nguyên 30.',
      hint: 'Chuyển "30" thành số nguyên int("30") rồi đóng gói vào list một phần tử [int("30")] trước khi dùng toán tử +.',
      solutionCode: `l1 = [10, 20]
s = "30"

# Ghép nối an toàn cùng kiểu list
result = l1 + [int(s)]

print("List kết quả:", result)
print("Kiểu của phần tử cuối:", type(result[-1]).__name__)`,
      solutionOutput: `List kết quả: [10, 20, 30]
Kiểu của phần tử cuối: int`,
      explanation: 'Toán tử + yêu cầu cả hai vế đều là list. Bằng cách bọc int(s) vào trong cặp ngoặc vuông [int(s)], ta thu được một list mới [30] hợp lệ để thực hiện phép cộng.'
    }
  ],

  quiz: [
    {
      question: 'Điều gì sẽ xảy ra khi bạn thực thi lệnh: res = [1, 2] + "34" trong Python?',
      options: [
        'res sẽ nhận giá trị [1, 2, "34"].',
        'res sẽ nhận giá trị [1, 2, "3", "4"].',
        'Python phát sinh lỗi TypeError vì không thể ghép nối list với chuỗi.',
        'res sẽ nhận giá trị "[1, 2]34".'
      ],
      correctIndex: 2,
      explanation: 'Trong Python, toán tử + đòi hỏi hai toán hạng phải cùng loại dãy tuần tự. Ghép list với chuỗi sẽ gây lỗi TypeError.'
    },
    {
      question: 'Kết quả của biểu thức so sánh: [2, [1, 5]] > [2, [1, 4], 999] là gì?',
      options: [
        'False, vì list bên phải dài hơn và có phần tử 999 rất lớn.',
        'True, vì tại vị trí bù 1, sublist [1, 5] lớn hơn [1, 4] do 5 > 4.',
        'TypeError, vì không thể so sánh các sublist lồng nhau.',
        'False, vì 999 lớn hơn 5.'
      ],
      correctIndex: 1,
      explanation: 'Python so sánh tuần tự từ trái sang phải. Tại offset 0, cả hai đều là 2 (bằng nhau). Tại offset 1, sublist [1, 5] lớn hơn [1, 4] vì 5 > 4. Kết quả thắng cuộc được quyết định ngay tại đây, phần tử 999 phía sau không bao giờ được duyệt tới.'
    }
  ],

  summary: [
    'List hỗ trợ các thao tác dãy tuần tự cơ bản: len() đo độ dài, + ghép nối, và * nhân bản.',
    'Toán tử ghép nối + bắt buộc hai toán hạng phải cùng là List; không tự động ép kiểu ngầm với chuỗi hoặc các kiểu khác.',
    'Để ghép chuỗi vào list hoặc ngược lại, cần sử dụng hàm chuyển đổi tường minh như list() hoặc str().',
    'Phép so sánh List duyệt tuần tự từng phần tử từ trái sang phải và tự động đệ quy vào các sublist lồng nhau.',
    'Khi các phần tử đối ứng bằng nhau, list có chiều dài ngắn hơn được xem là nhỏ hơn.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.3), chúng ta sẽ nghiên cứu sâu hơn về Đánh chỉ mục (Indexing), Cắt lát (Slicing) và cách tổ chức Ma trận đa chiều (Matrix) với List.'
};