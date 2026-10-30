export default {
  id: 'lp-c8-06',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.6',
  title: 'Sắp xếp List: Phương thức sort(), Bẫy kiểu hỗn hợp & Hàm dựng sẵn sorted()',
  subtitle: 'Làm chủ phương thức sort() tại chỗ, tham số key và reverse, xử lý lỗi TypeError kiểu hỗn hợp và so sánh với hàm dựng sẵn sorted()',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo phương thức sắp xếp tại chỗ `sort()` của List cùng hai đối số từ khóa cấu hình: `reverse=True` và `key=`.',
    'Thấu suốt bẫy lỗi kinh điển của người mới học: `sort()` trả về `None`, tránh mất dữ liệu khi gán đè `L = L.sort()`.',
    'Hiểu nguyên nhân và cách xử lý lỗi `TypeError` khi sắp xếp danh sách chứa các kiểu dữ liệu hỗn hợp (mixed types).',
    'Phân biệt rõ ràng giữa phương thức `list.sort()` (sửa đổi tại chỗ) và hàm dựng sẵn `sorted()` (trả về list mới độc lập).'
  ],

  intuition: {
    title: 'Sắp xếp hồ sơ trên bàn hay Photocopy sang tập hồ sơ mới',
    metaphor: 'Hãy tưởng tượng bạn có một chồng tài liệu xáo trộn trên bàn làm việc. Bạn có hai cách để sắp xếp chúng theo thứ tự: Cách 1 (`list.sort()`): Bạn đứng ngay tại bàn, dùng tay xáo đổi và xếp lại chính chồng tài liệu đó theo thứ tự từ A đến Z. Chồng tài liệu ban đầu bị biến đổi vĩnh viễn (in-place mutation), và sau khi xếp xong, trên tay bạn chẳng có thêm tập giấy mới nào cả (trả về None). Cách 2 (`sorted(iterable)`): Bạn không chạm vào chồng tài liệu trên bàn; bạn mang nó đến máy photocopy, vừa scan vừa in ra một tập hồ sơ mới tinh đã được sắp xếp gọn gàng. Chồng tài liệu cũ vẫn nằm nguyên vị trí ban đầu. Đó chính là sự khác biệt giữa phương thức sort() và hàm sorted() trong Python!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH: PHƯƠNG THỨC sort() VS HÀM DỰNG SẴN sorted()</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">1. L.sort(key=..., reverse=...)</div>
            <ul style="margin:0;padding-left:18px;font-size:0.8rem;line-height:1.6;">
              <li>Sửa đổi trực tiếp đối tượng <code>L</code> tại chỗ (in-place).</li>
              <li>Giá trị trả về là <strong>None</strong> (bẫy gán đè biến!).</li>
              <li>Chỉ khả dụng trên kiểu <code>list</code>.</li>
              <li>Tiết kiệm bộ nhớ vì không tạo đối tượng trung gian.</li>
            </ul>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">2. sorted(iterable, key=..., reverse=...)</div>
            <ul style="margin:0;padding-left:18px;font-size:0.8rem;line-height:1.6;">
              <li>Giữ nguyên vẹn tập hợp gốc không bị thay đổi.</li>
              <li>Trả về một đối tượng <strong>List mới tinh</strong>.</li>
              <li>Áp dụng được cho <strong>mọi iterable</strong> (chuỗi, dict, tuple, set...).</li>
              <li>Thích hợp khi cần giữ lại dữ liệu gốc ban đầu.</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phương thức sort() và các Đối số Từ khóa (key, reverse)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 9 / 42 – Trang 10 / 42</strong>.</p>
          </div>
        </div>

        <p>Phương thức <strong><code>sort()</code></strong> sắp xếp các phần tử của một list tại chỗ. Đây là một công cụ phổ biến sử dụng các phép kiểm tra so sánh tiêu chuẩn của Python (so sánh chuỗi theo bảng mã, so sánh số học theo độ lớn), và theo mặc định sẽ sắp xếp theo thứ tự tăng dần.</p>

        <p>Bạn có thể tùy biến hành vi sắp xếp bằng hai <em>đối số từ khóa (keyword arguments)</em> chuẩn:</p>
        <ul>
          <li><strong><code>reverse=True</code>:</strong> Sắp xếp theo thứ tự giảm dần thay vì tăng dần mặc định.</li>
          <li><strong><code>key=func</code>:</strong> Nhận vào một hàm một tham số (ví dụ: <code>str.lower</code> hoặc <code>str.casefold</code>). Hàm này được áp dụng tạm thời cho từng phần tử để lấy ra "khóa so sánh", giúp việc sắp xếp không phân biệt chữ hoa / chữ thường mà vẫn giữ nguyên hình dạng chuỗi ban đầu.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sắp xếp danh sách chuỗi với các đối số key và reverse',
          code: `L = ['abc', 'ABD', 'aBe']

# Sắp xếp mặc định: chữ hoa đứng trước chữ thường theo mã ASCII ('P' < 'c')
L.sort()
print("Sắp xếp mặc định:", L)

# Sắp xếp có chuẩn hóa chữ thường bằng đối số key=str.lower
L = ['abc', 'ABD', 'aBe']
L.sort(key=str.lower)
print("Sắp xếp với key=str.lower:", L)

# Kết hợp đảo ngược thứ tự: key=str.lower và reverse=True
L = ['abc', 'ABD', 'aBe']
L.sort(key=str.lower, reverse=True)
print("Sắp xếp giảm dần hoa thường:", L)`,
          output: `Sắp xếp mặc định: ['ABD', 'aBe', 'abc']
Sắp xếp với key=str.lower: ['abc', 'ABD', 'aBe']
Sắp xếp giảm dần hoa thường: ['aBe', 'ABD', 'abc']`,
          annotations: [
            { line: 4, text: 'Mặc định \'ABD\' xếp trước vì mã ASCII chữ in hoa A (65) nhỏ hơn chữ thường a (97).' },
            { line: 9, text: 'key=str.lower coi \'abc\', \'abd\', \'abe\' để so sánh, nhưng list kết quả vẫn giữ nguyên chữ hoa \'ABD\'.' },
            { line: 14, text: 'reverse=True đảo ngược danh sách theo thứ tự giảm dần.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bẫy Kiểu Hỗn hợp (Mixed Types) và Bẫy Giá trị None',
      content: `
        <p>Tác giả Mark Lutz đặc biệt đưa ra hai lưu ý cảnh giác tối quan trọng mà lập trình viên Python nào cũng cần khắc ghi:</p>

        <p><strong>Cảnh báo 1: Sắp xếp kiểu hỗn hợp mặc định thất bại:</strong><br>
        Trong Python, phép so sánh độ lớn giữa các kiểu dữ liệu không tương thích (chẳng hạn như so sánh số nguyên với chuỗi: <code>1 &lt; 'hack'</code>) là một lỗi <code>TypeError</code> vì nó mang tính nhập nhằng. Do <code>sort()</code> sử dụng phép so sánh này trong nội bộ, việc sắp xếp danh sách chứa cả số và chuỗi sẽ gián tiếp sụp đổ. Để khắc phục, bạn cần truyền đối số <code>key=str</code> để đồng nhất mọi phần tử về chuỗi trong lúc so sánh:</p>

        <p><strong>Cảnh báo 2: sort() trả về None — Đừng gán lại biến!</strong><br>
        Các phương thức <code>append</code>, <code>extend</code>, và <code>sort</code> thay đổi trực tiếp đối tượng list liên kết tại chỗ, nhưng <strong>không trả về list đã sửa đổi</strong> (về mặt kỹ thuật, chúng trả về đối tượng giữ chỗ <code>None</code>). Nếu bạn viết <code>L = L.sort()</code>, bạn sẽ không nhận được danh sách đã sắp xếp, mà trên thực tế biến <code>L</code> sẽ bị gán thành <code>None</code> và bạn sẽ <em>mất hoàn toàn dữ liệu</em>!</p>
      `,
      codeExamples: [
        {
          title: 'Khắc phục lỗi sắp xếp kiểu hỗn hợp và kiểm chứng bẫy None',
          code: `# Sắp xếp kiểu hỗn hợp thất bại mặc định
L = [1, 'hack', 2]
try:
    L.sort()
except TypeError as err:
    print("Bắt lỗi kiểu hỗn hợp:", err)

# Khắc phục bằng cách truyền hàm chuyển đổi vào đối số key
L.sort(key=str)
print("Sắp xếp kiểu hỗn hợp thành công:", L)

# Cảnh giác bẫy trả về None
ret_val = L.sort()
print("Giá trị trả về của L.sort():", ret_val)`,
          output: `Bắt lỗi kiểu hỗn hợp: '<' not supported between instances of 'str' and 'int'
Sắp xếp kiểu hỗn hợp thành công: [1, 2, 'hack']
Giá trị trả về của L.sort(): None`,
          annotations: [
            { line: 5, text: 'Python từ chối so sánh số nguyên 1 với chuỗi \'hack\' bằng toán tử <.' },
            { line: 9, text: 'key=str chuyển tạm thời 1 thành \'1\', 2 thành \'2\' để so sánh chuỗi hợp lệ.' },
            { line: 13, text: 'L.sort() luôn trả về None vì đây là phương thức thao tác tại chỗ (side effect).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Hàm Dựng Sẵn sorted(): Sắp xếp Linh hoạt Mọi Tập hợp',
      content: `
        <p>Một phần vì những ràng buộc như trả về <code>None</code> và chỉ áp dụng được cho list, Python cung cấp thêm tính năng sắp xếp dưới dạng <strong>hàm dựng sẵn <code>sorted()</code></strong>.</p>

        <p>Hàm <code>sorted()</code> có những đặc tính ưu việt:</p>
        <ul>
          <li>Có thể nhận <strong>bất kỳ đối tượng iterable nào</strong> (không chỉ riêng list, mà cả chuỗi, dictionary, tuple, set).</li>
          <li>Luôn luôn <strong>trả về một list mới tinh</strong> làm kết quả, giữ nguyên vẹn tập hợp gốc.</li>
          <li>Nhận các đối số từ khóa <code>key</code> và <code>reverse</code> giống hệt như phương thức <code>list.sort()</code>.</li>
        </ul>

        <p><em>So sánh đối số key với list comprehension:</em> Khi dùng <code>sorted([x.lower() for x in L])</code>, bạn đã biến đổi hoàn toàn các phần tử thành chữ thường trong kết quả. Trong khi đó, <code>sorted(L, key=str.lower)</code> chỉ áp dụng chuyển chữ thường tạm thời trong quá trình so sánh, kết quả trả về vẫn giữ nguyên dạng chữ hoa / chữ thường ban đầu của các phần tử!</p>
      `,
      codeExamples: [
        {
          title: 'Sắp xếp bằng hàm dựng sẵn sorted() và so sánh với list comprehension',
          code: `L = ['abc', 'ABD', 'aBe']

# sorted() trả về list mới, L ban đầu không bị biến đổi
sorted_list = sorted(L)
print("sorted(L): ", sorted_list)
print("L gốc vẫn: ", L)

# Sắp xếp không phân biệt hoa thường và đảo ngược
print("sorted có key & reverse:  ", sorted(L, key=str.lower, reverse=True))

# So sánh với tiền biến đổi bằng list comprehension
comp_sorted = sorted([x.lower() for x in L], reverse=True)
print("Dùng comprehension [x.lower()]:", comp_sorted)`,
          output: `sorted(L):  ['ABD', 'aBe', 'abc']
L gốc vẫn:  ['abc', 'ABD', 'aBe']
sorted có key & reverse:   ['aBe', 'ABD', 'abc']
Dùng comprehension [x.lower()]: ['abe', 'abd', 'abc']`,
          annotations: [
            { line: 4, text: 'L giữ nguyên trật tự ban đầu sau khi gọi hàm sorted(L).' },
            { line: 9, text: 'key=str.lower bảo tồn giá trị ban đầu \'aBe\', \'ABD\', \'abc\'.' },
            { line: 13, text: 'Dùng [x.lower() for x in L] đã thay đổi vĩnh viễn dữ liệu thành \'abe\', \'abd\'.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào nên dùng sort() và khi nào nên dùng sorted()?',
        content: '• Dùng <code>L.sort()</code> khi bạn đang có một list lớn và muốn tiết kiệm bộ nhớ RAM bằng cách sửa trực tiếp, không cần giữ lại thứ tự ban đầu.<br>• Dùng <code>sorted()</code> khi bạn cần giữ nguyên dữ liệu gốc, hoặc khi tập hợp đầu vào không phải là list (ví dụ: cần sắp xếp các khóa của một dictionary).'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy tự hủy dữ liệu: L = L.sort()',
        content: 'Tuyệt đối không bao giờ viết <code>L = L.sort()</code>. Kết quả trả về của <code>sort()</code> là <code>None</code>, lệnh này sẽ gán <code>None</code> cho biến <code>L</code> và làm mất toàn bộ danh sách của bạn!'
      }
    ]
  },

  exercises: [
    {
      title: 'Sắp xếp danh sách các chuỗi theo độ dài tăng dần',
      level: 'Vừa',
      problem: 'Cho danh sách các từ words = ["Python", "C", "JavaScript", "Go", "Rust"]. Hãy dùng hàm dựng sẵn sorted() cùng đối số key phù hợp để sắp xếp danh sách theo thứ tự độ dài từ ngắn nhất đến dài nhất mà không làm thay đổi list words ban đầu.',
      hint: 'Truyền hàm len làm đối số key: key=len.',
      solutionCode: `words = ["Python", "C", "JavaScript", "Go", "Rust"]

# Sắp xếp theo chiều dài bằng key=len
sorted_by_len = sorted(words, key=len)

print("Danh sách gốc:          ", words)
print("Sắp xếp theo độ dài tăng:", sorted_by_len)`,
      solutionOutput: `Danh sách gốc:           ['Python', 'C', 'JavaScript', 'Go', 'Rust']
Sắp xếp theo độ dài tăng: ['C', 'Go', 'Rust', 'Python', 'JavaScript']`,
      explanation: 'Hàm len được gọi cho từng chuỗi để lấy số ký tự làm tiêu chí so sánh. Từ ngắn nhất \'C\' (1 ký tự) xếp đầu, từ dài nhất \'JavaScript\' (10 ký tự) xếp cuối.'
    }
  ],

  quiz: [
    {
      question: 'Điều gì xảy ra nếu bạn thực hiện: my_list = [3, 1, 2]; my_list = my_list.sort()?',
      options: [
        'my_list trở thành [1, 2, 3].',
        'my_list trở thành None.',
        'Python báo lỗi TypeError.',
        'my_list vẫn giữ nguyên [3, 1, 2].'
      ],
      correctIndex: 1,
      explanation: 'Phương thức sort() sửa đổi list tại chỗ và trả về None. Khi gán ngược lại cho my_list, biến này sẽ nhận giá trị None.'
    },
    {
      question: 'Tại sao lệnh [10, "20", 30].sort() lại gây ra lỗi TypeError trong Python 3?',
      options: [
        'Vì List chỉ có thể chứa tối đa 2 phần tử khi sắp xếp.',
        'Vì Python không hỗ trợ toán tử so sánh độ lớn (<) giữa chuỗi và số nguyên.',
        'Vì phương thức sort() chỉ hỗ trợ sắp xếp các số thực float.',
        'Vì số 20 nằm trong dấu nháy kép.'
      ],
      correctIndex: 1,
      explanation: 'Python là ngôn ngữ định kiểu mạnh. Phép so sánh độ lớn giữa chuỗi và số không được định nghĩa và sẽ phát sinh lỗi TypeError.'
    }
  ],

  summary: [
    'Phương thức L.sort() sắp xếp các phần tử của list tại chỗ và luôn trả về None (side effect).',
    'Tham số reverse=True cho phép đảo ngược trật tự sang giảm dần; tham số key=func cung cấp hàm biến đổi tiêu chí so sánh.',
    'Sắp xếp danh sách kiểu hỗn hợp (số và chuỗi) sẽ kích hoạt TypeError; có thể khắc phục bằng cách chỉ định key=str.',
    'Hàm dựng sẵn sorted(iterable) hoạt động trên mọi tập hợp, trả về một list mới tinh và giữ nguyên vẹn dữ liệu gốc ban đầu.',
    'Đối số key áp dụng tạm thời trong quá trình so sánh nên bảo tồn giá trị ban đầu của các phần tử trong kết quả.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.7), chúng ta sẽ khám phá phương thức đảo ngược list (reverse vs reversed) và kỹ thuật cài đặt cấu trúc dữ liệu Ngăn xếp (Stack LIFO) nhanh chóng bằng List.'
};