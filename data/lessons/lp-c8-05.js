export default {
  id: 'lp-c8-05',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.5',
  title: 'Các phương thức tăng kích thước List: append(), extend(), insert() & Toán tử +=',
  subtitle: 'Khám phá bộ ba phương thức mở rộng danh sách tại chỗ, sự khác biệt mấu chốt giữa append và extend, cùng hiệu năng của toán tử +=',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo phương thức phổ biến nhất của List: `append()` để gắn thêm một phần tử đơn lẻ vào cuối danh sách.',
    'Phân biệt rõ ràng giữa `append()` (thêm nguyên vẹn 1 đối tượng) và `extend()` (duyệt lặp và thêm nhiều phần tử).',
    'Sử dụng phương thức `insert(i, X)` để chèn một phần tử tại một vị trí bù bất kỳ.',
    'Hiểu rõ bản chất hiệu năng: tại sao `append` và `+=` lại nhanh hơn phép cộng tạo đối tượng mới `L = L + [X]`.'
  ],

  intuition: {
    title: 'Đóng thêm toa tàu hay Móc thêm một đoàn tàu khác',
    metaphor: 'Hãy tưởng tượng bạn đang quản lý một đoàn tàu hỏa `L`. Có ba cách để bạn bổ sung toa cho đoàn tàu này: (1) `append(X)`: bạn đóng thêm đúng MỘT toa tàu duy nhất X vào đuôi đoàn tàu. Nếu món hàng X là một thùng container chứa nhiều kiện hàng bên trong, bạn vẫn móc nguyên cả chiếc thùng container đó thành đúng một toa! (2) `extend(iterable)`: bạn mở một đoàn xe khác ra, dỡ từng kiện hàng bên trong và móc lần lượt từng kiện hàng đó thành các toa mới ở đuôi tàu của mình. (3) `insert(i, X)`: bạn tháo khớp nối tại toa số i, đẩy các toa phía sau lùi lại một bước, và nhét toa X vào đúng khe hở đó. Cả ba hành động này đều thực hiện trực tiếp trên chính đoàn tàu hiện có!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN BIỆT BẢN CHẤT: L.append(X) VS L.extend(X)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:#3b82f6;margin-bottom:6px;">1. L.append([4, 5]) ➔ Thêm 1 phần tử</div>
            <div style="padding:6px;background:var(--bg-surface-alt);border-radius:4px;margin-bottom:6px;">
              <code>[1, 2, 3, <strong style="color:#3b82f6;">[4, 5]</strong>]</code>
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Thêm nguyên vẹn đối tượng list [4, 5] làm một sublist lồng nhau ở cuối. Chiều dài chỉ tăng thêm 1!</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:#10b981;margin-bottom:6px;">2. L.extend([4, 5]) ➔ Thêm nhiều phần tử</div>
            <div style="padding:6px;background:var(--bg-surface-alt);border-radius:4px;margin-bottom:6px;">
              <code>[1, 2, 3, <strong style="color:#10b981;">4</strong>, <strong style="color:#10b981;">5</strong>]</code>
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Duyệt lặp qua iterable và thêm phẳng từng phần tử 4 và 5 vào cuối. Chiều dài tăng thêm 2!</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phương thức append(): Gắn thêm Phần tử vào Cuối',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 8 / 42 – Trang 9 / 42</strong>.</p>
          </div>
        </div>

        <p>Như đã giới thiệu trong Chương 7, các phương thức là các hàm gắn liền với và thao tác trên các đối tượng mục tiêu cụ thể. Trong số các phương thức của list, <strong><code>append()</code> có lẽ là phương thức được sử dụng phổ biến nhất</strong>.</p>

        <p>Phương thức <code>append()</code> chỉ đơn giản là gắn thêm một phần tử đơn lẻ (thực chất là một tham chiếu đối tượng) vào cuối list mục tiêu tại chỗ, và list sẽ tự động mở rộng ra để chứa phần tử bổ sung đó. Khác với phép ghép nối <code>+</code>, <code>append()</code> yêu cầu bạn truyền vào một đối tượng duy nhất chứ không phải một list, và sử dụng nguyên vẹn đối tượng đó:</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng phương thức append() để tăng kích thước list tại chỗ',
          code: `L = ['write']

# Gắn thêm một phần tử vào cuối list tại chỗ
L.append('Python')
print("Sau L.append('Python'):", L)

# Thêm một sublist: append thêm nguyên vẹn cả list đó
L.append(['code', 'goodly'])
print("Sau L.append([...]):   ", L)`,
          output: `Sau L.append('Python'): ['write', 'Python']
Sau L.append([...]):    ['write', 'Python', ['code', 'goodly']]`,
          annotations: [
            { line: 4, text: 'L.append(\'Python\') mở rộng list thành [\'write\', \'Python\'] tại chỗ.' },
            { line: 8, text: 'Truyền một list vào append sẽ tạo ra một sublist lồng nhau chứ không làm phẳng.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phương thức extend() và Toán tử Cộng tại chỗ +=',
      content: `
        <p>Ngược lại với <code>append()</code>, phương thức <strong><code>extend()</code></strong> thêm nhiều phần tử vào cuối list, cũng theo cách tại chỗ. Về mặt kỹ thuật, <code>extend()</code> luôn lặp qua và thêm từng phần tử trong đối tượng iterable được truyền vào (sự phân biệt này sẽ có ý nghĩa rõ ràng hơn trong Chương 14):</p>

        <div class="callout-box callout-note">
          <div class="callout-header"><span>📌 Chú thích tác giả [3]:</span> <span>Hiệu năng của append, extend và toán tử +=</span></div>
          <div class="callout-body">
            <p>Khác với phép ghép nối <code>+</code>, <code>append</code> không phải tạo đối tượng mới, do đó nó thường chạy <strong>nhanh hơn rất nhiều so với <code>+</code></strong>. Thậm chí, bạn có thể tinh chỉnh để Python làm điều tương tự với phép ghép nối bằng cách sử dụng phép cộng tại chỗ (<code>+=</code>): <code>L += [4]</code> gần tương đương với <code>L.extend([4])</code>, và thường nhanh hơn <code>L = L + [4]</code> rất nhiều. Chúng ta sẽ thảo luận sâu về <code>+=</code> trong Chương 11.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh chi tiết extend() và toán tử +=',
          code: `L = ['write', 'Python']

# extend duyệt lặp qua iterable và thêm từng phần tử vào cuối
L.extend(['code', 'goodly'])
print("Sau L.extend([...]):", L)

# Toán tử += thực hiện phép mở rộng tại chỗ tương đương extend
L += ['fast', 'clean']
print("Sau L += [...]:     ", L)`,
          output: `Sau L.extend([...]): ['write', 'Python', 'code', 'goodly']
Sau L += [...]:      ['write', 'Python', 'code', 'goodly', 'fast', 'clean']`,
          annotations: [
            { line: 4, text: 'extend() làm phẳng iterable và bổ sung từng phần tử riêng biệt vào list.' },
            { line: 8, text: 'Toán tử += sửa đổi L tại chỗ tương đương extend, không tạo list mới.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phương thức insert(i, X): Chèn tại Vị trí Bất kỳ',
      content: `
        <p>Trong khi <code>append()</code> và <code>extend()</code> chỉ thêm phần tử vào đuôi danh sách, phương thức <strong><code>insert(i, X)</code></strong> cho phép bạn chèn đối tượng <code>X</code> vào trước vị trí bù <code>i</code> được chỉ định:</p>

        <ul>
          <li>Nếu <code>i = 0</code>: Phần tử <code>X</code> sẽ được chèn vào ngay đầu list. Tất cả các phần tử hiện tại sẽ bị đẩy lùi sang phải một vị trí.</li>
          <li>Nếu <code>i</code> vượt quá chiều dài list: Phần tử sẽ được chèn vào cuối list (tương tự <code>append</code>).</li>
        </ul>

        <p><em>Lưu ý hiệu năng:</em> Trong CPython, vì list là mảng con trỏ C liên tục, việc gọi <code>insert(0, X)</code> ở đầu list đòi hỏi trình thông dịch phải dịch chuyển toàn bộ N con trỏ phía sau sang phải, do đó thao tác này có độ phức tạp thời gian là <strong>O(N)</strong>. Nếu chương trình của bạn thường xuyên chèn ở đầu, cấu trúc <code>collections.deque</code> sẽ là lựa chọn hiệu quả hơn.</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng phương thức insert() chèn tại các vị trí bù',
          code: `L = ['hack', 'Py', 'code']

# Chèn phần tử 'more' tại vị trí bù 1
L.insert(1, 'more')
print("Sau L.insert(1, 'more'):", L)

# Chèn phần tử 'START' vào ngay đầu danh sách (offset 0)
L.insert(0, 'START')
print("Sau L.insert(0, 'START'):", L)`,
          output: `Sau L.insert(1, 'more'): ['hack', 'more', 'Py', 'code']
Sau L.insert(0, 'START'): ['START', 'hack', 'more', 'Py', 'code']`,
          annotations: [
            { line: 4, text: '\'more\' được chèn vào trước offset 1, đẩy \'Py\' thành offset 2.' },
            { line: 8, text: '\'START\' trở thành phần tử đầu tiên tại offset 0.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Quy tắc chọn: append() vs extend() vs insert()',
        content: '• Cần thêm 1 giá trị vào cuối: dùng <code>append(x)</code>.<br>• Cần thêm tất cả phần tử từ một danh sách/chuỗi khác vào cuối: dùng <code>extend(iterable)</code> hoặc <code>+=</code>.<br>• Cần chèn vào giữa hoặc đầu: dùng <code>insert(i, x)</code>.'
      }
    ],
    pitfalls: [
      {
        title: 'Truyền chuỗi vào extend() sẽ bị phân rã thành từng ký tự!',
        content: 'Vì chuỗi là một iterable, lệnh <code>L.extend("abc")</code> sẽ thêm 3 phần tử riêng lẻ <code>\'a\', \'b\', \'c\'</code> vào list chứ không thêm chuỗi <code>"abc"</code> nguyên vẹn! Nếu muốn thêm cả chuỗi "abc", hãy dùng <code>L.append("abc")</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tối ưu hiệu năng tích lũy danh sách bằng append và extend',
      level: 'Dễ',
      problem: 'Viết mã Python khởi tạo một list rỗng results = []. Thêm lần lượt số 1, số 2 vào cuối bằng phương thức phù hợp. Sau đó thêm một lúc 3 số [3, 4, 5] sao cho danh sách cuối cùng là [1, 2, 3, 4, 5] chứ không bị lồng sublist.',
      hint: 'Dùng append() cho số 1 và 2; dùng extend() hoặc += cho [3, 4, 5].',
      solutionCode: `results = []

# Thêm từng phần tử
results.append(1)
results.append(2)

# Thêm hàng loạt phần tử phẳng
results.extend([3, 4, 5])

print("Kết quả cuối cùng:", results)
print("Số phần tử:", len(results))`,
      solutionOutput: `Kết quả cuối cùng: [1, 2, 3, 4, 5]
Số phần tử: 5`,
      explanation: 'append(1) và append(2) thêm từng số nguyên đơn lẻ. extend([3, 4, 5]) duyệt qua list [3, 4, 5] và gắn lần lượt 3, 4, 5 vào cuối kết quả.'
    }
  ],

  quiz: [
    {
      question: 'Cho L = [1, 2]. Sau khi chạy lệnh L.append([3, 4]), giá trị của len(L) và L là gì?',
      options: [
        'len(L) = 4, L = [1, 2, 3, 4]',
        'len(L) = 3, L = [1, 2, [3, 4]]',
        'len(L) = 3, L = [1, 2, 3, 4]',
        'Lỗi TypeError vì append chỉ nhận số nguyên.'
      ],
      correctIndex: 1,
      explanation: 'append() coi đối số truyền vào là một phần tử duy nhất, do đó sublist [3, 4] được thêm nguyên vẹn vào cuối, làm độ dài tăng từ 2 lên 3.'
    },
    {
      question: 'Tại sao câu lệnh L += [4] thường được khuyến khích hơn L = L + [4]?',
      options: [
        'Vì L += [4] tự động sắp xếp danh sách sau khi cộng.',
        'Vì L += [4] sửa đổi list trực tiếp tại chỗ (tương đương extend), tránh chi phí cấp phát và sao chép của việc tạo list mới.',
        'Vì L = L + [4] sẽ gây lỗi cú pháp trong Python 3.',
        'Vì L += [4] chuyển số 4 thành chuỗi ký tự.'
      ],
      correctIndex: 1,
      explanation: 'Toán tử += trên list thực thi phương thức __iadd__ sửa đổi đối tượng tại chỗ, không tạo ra đối tượng trung gian như toán tử +.'
    }
  ],

  summary: [
    'append(X) thêm một phần tử đơn lẻ vào cuối list tại chỗ; nếu X là tập hợp, nó được giữ nguyên vẹn làm sublist lồng nhau.',
    'extend(iterable) duyệt lặp qua iterable và thêm từng phần tử của nó vào cuối list theo dạng phẳng.',
    'insert(i, X) chèn đối tượng X vào trước vị trí bù i; thao tác chèn ở đầu list có độ phức tạp O(N).',
    'Toán tử += trên list tương đương với extend(), sửa đổi tại chỗ và nhanh hơn nhiều so với phép ghép nối tạo đối tượng mới L = L + [...].',
    'Các phương thức append, extend và insert đều trả về None, thay đổi list như một tác dụng phụ (side effect).'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.6), chúng ta sẽ nghiên cứu sâu về phương thức sort(), các đối số cấu hình key và reverse, bẫy sắp xếp kiểu hỗn hợp, và hàm dựng sẵn sorted().'
};