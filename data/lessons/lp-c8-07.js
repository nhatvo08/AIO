export default {
  id: 'lp-c8-07',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.7',
  title: 'Đảo ngược List (reverse vs reversed) & Cài đặt Ngăn xếp (Stack LIFO) với List',
  subtitle: 'So sánh đảo ngược tại chỗ với hàm dựng sẵn reversed() và kỹ thuật xây dựng cấu trúc dữ liệu Ngăn xếp vào-sau-ra-trước bằng append() và pop()',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo phương thức `reverse()` đảo ngược thứ tự các phần tử của List tại chỗ.',
    'Phân biệt rõ ràng giữa `list.reverse()` và hàm dựng sẵn `reversed()` (trả về iterator lặp lười biếng theo nhu cầu).',
    'Hiểu nguyên lý hoạt động của cấu trúc dữ liệu Ngăn xếp (Stack LIFO: Last-In, First-Out).',
    'Cài đặt thành công một ngăn xếp hoàn chỉnh bằng cách kết hợp hai phương thức `append()` (push) và `pop()` (pop).'
  ],

  intuition: {
    title: 'Xếp chồng đĩa ăn và Lật ngược tấm thảm',
    metaphor: 'Hãy tưởng tượng bạn đang rửa bát và xếp từng chiếc đĩa vào một chồng: chiếc đĩa đầu tiên nằm ở đáy, chiếc đĩa tiếp theo đặt lên trên, và chiếc đĩa sau cùng nằm ở trên đỉnh. Khi cần lấy đĩa ra dùng, bạn chỉ có thể nhấc chiếc đĩa trên cùng (chiếc được đặt vào sau cùng) ra trước. Đó chính xác là nguyên lý Ngăn xếp (Stack LIFO: Vào Sau, Ra Trước)! Trong Python, List đóng vai trò hoàn hảo cho chiếc giá để đĩa này: phương thức `append()` đẩy đĩa vào đỉnh, và phương thức `pop()` nhấc chiếc đĩa trên đỉnh ra trả về cho bạn. Còn khi bạn muốn đảo ngược toàn bộ danh sách, phương thức `reverse()` giống như lật ngược cả tấm thảm tại chỗ, trong khi hàm `reversed()` giống như một chiếc gương soi phản chiếu hình ảnh đảo ngược từng phần tử một khi bạn cần nhìn tới!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH CẤU TRÚC NGĂN XẾP (STACK LIFO) VỚI LIST</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:20px;flex-wrap:wrap;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <span style="font-size:0.75rem;font-weight:700;color:var(--success);">⬇ L.append(2) (PUSH)</span>
            <div style="width:140px;border:3px solid var(--border-strong);border-top:none;border-radius:0 0 8px 8px;padding:8px 8px 4px;display:flex;flex-direction:column-reverse;gap:4px;background:var(--bg-surface);min-height:90px;">
              <div style="padding:6px;background:rgba(16,185,129,0.2);border:1px solid #10b981;border-radius:4px;text-align:center;font-weight:700;">Đỉnh: 2</div>
              <div style="padding:6px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:4px;text-align:center;">Đáy: 1</div>
            </div>
            <span style="font-size:0.75rem;font-weight:700;color:var(--danger);margin-top:4px;">⬆ L.pop() ➔ 2 (POP)</span>
          </div>
          <div style="max-width:240px;font-size:0.8rem;color:var(--text-secondary);line-height:1.6;">
            Phần cuối của List đóng vai trò là <strong>ĐỈNH (top)</strong> của ngăn xếp. Thao tác thêm vào đỉnh (append) và lấy khỏi đỉnh (pop) đều đạt tốc độ O(1) cực hạn trong CPython!
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Đảo ngược List: reverse() vs Hàm reversed()',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 11 / 42</strong>.</p>
          </div>
        </div>

        <p>Giống như sắp xếp, Python cung cấp hai công cụ riêng biệt để đảo ngược thứ tự các phần tử của một danh sách:</p>

        <ul>
          <li><strong>Phương thức <code>L.reverse()</code>:</strong> Đảo ngược các phần tử của list trực tiếp tại chỗ (in-place) và trả về <code>None</code>. Danh sách ban đầu bị biến đổi vĩnh viễn.</li>
          <li><strong>Hàm dựng sẵn <code>reversed(L)</code>:</strong> Không làm thay đổi list ban đầu. Tuy nhiên, điều dễ gây nhầm lẫn là <code>reversed()</code> <strong>không trả về một list mới như <code>sorted()</code></strong>; thay vào đó, nó trả về một <em>đối tượng iterable</em> tạo ra kết quả theo nhu cầu (lazy evaluation). Bạn phải bọc nó trong một lệnh gọi <code>list()</code> để thu thập các kết quả nếu cần một list thực sự để hiển thị hoặc đánh chỉ mục.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh phương thức reverse() tại chỗ và hàm reversed()',
          code: `L = [1, 2, 3, 4, 5]
print("List ban đầu:", L)

# Phương thức reverse(): đảo ngược trực tiếp tại chỗ
L.reverse()
print("Sau L.reverse():", L)

# Hàm dựng sẵn reversed(): giữ nguyên L và trả về một iterable
rev_iter = reversed(L)
print("Kết quả reversed(L):", rev_iter)
print("Thu thập bằng list():", list(reversed(L)))
print("L gốc vẫn không đổi:", L)`,
          output: `List ban đầu: [1, 2, 3, 4, 5]
Sau L.reverse(): [5, 4, 3, 2, 1]
Kết quả reversed(L): <list_reverseiterator object at ...>
Thu thập bằng list(): [1, 2, 3, 4, 5]
L gốc vẫn không đổi: [5, 4, 3, 2, 1]`,
          annotations: [
            { line: 5, text: 'L.reverse() đổi trật tự 5 phần tử ngay trong bộ nhớ của L.' },
            { line: 9, text: 'reversed(L) trả về một iterator lười biếng, tiết kiệm RAM cho các tập dữ liệu lớn.' },
            { line: 11, text: 'list(reversed(L)) ép iterator nhả toàn bộ phần tử vào một list mới.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Cài đặt Cấu trúc Ngăn xếp (Stack LIFO) với List',
      content: `
        <p>Trong một số loại chương trình (như duyệt cây, bộ phân tích cú pháp biểu thức, xử lý nút Undo/Redo), phương thức <strong><code>pop()</code></strong> của list được dùng kết hợp với <strong><code>append()</code></strong> để cài đặt một cấu trúc <strong>ngăn xếp (stack) vào-sau-ra-trước (LIFO: Last-In, First-Out)</strong> vô cùng nhanh chóng:</p>

        <ul>
          <li><strong>Đẩy vào ngăn xếp (Push):</strong> Dùng <code>L.append(X)</code> để đưa một phần tử mới lên "đỉnh" (top) của ngăn xếp.</li>
          <li><strong>Lấy khỏi ngăn xếp (Pop):</strong> Dùng <code>L.pop()</code> để xóa và trả về phần tử nằm ở đỉnh ngăn xếp (phần tử cuối cùng).</li>
        </ul>

        <p>Do phần cuối của list trong CPython có thể mở rộng và thu hẹp ngay lập tức mà không cần dịch chuyển các phần tử phía trước, cả hai thao tác này đều đạt hiệu năng tối ưu <strong>O(1)</strong>.</p>
      `,
      codeExamples: [
        {
          title: 'Cài đặt chu trình Push và Pop của Ngăn xếp trên List',
          code: `# Khởi tạo ngăn xếp rỗng
stack = []

# Đẩy các phần tử vào ngăn xếp (Push)
stack.append(1)
stack.append(2)
print("Ngăn xếp sau khi push 1 và 2:", stack)

# Lấy phần tử trên đỉnh ra khỏi ngăn xếp (Pop)
top_item = stack.pop()
print("Phần tử vừa lấy ra (top):     ", top_item)
print("Ngăn xếp còn lại:             ", stack)`,
          output: `Ngăn xếp sau khi push 1 và 2: [1, 2]
Phần tử vừa lấy ra (top):      2
Ngăn xếp còn lại:              [1]`,
          annotations: [
            { line: 6, text: 'append(2) đưa số 2 lên vị trí cuối cùng (đỉnh ngăn xếp).' },
            { line: 10, text: 'pop() không tham số xóa và trả về phần tử đỉnh (2).' },
            { line: 12, text: 'Ngăn xếp thu hẹp còn lại [1].' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Tham số Vị trí Tùy chọn của Phương thức pop()',
      content: `
        <p>Ngoài hành vi mặc định là lấy phần tử cuối cùng (vị trí bù <code>-1</code>), phương thức <strong><code>pop(i)</code></strong> cũng chấp nhận một vị trí bù số nguyên <code>i</code> tùy chọn của phần tử cần xóa và trả về:</p>

        <ul>
          <li><code>L.pop()</code> hoặc <code>L.pop(-1)</code>: Xóa và trả về phần tử cuối cùng (O(1)).</li>
          <li><code>L.pop(0)</code>: Xóa và trả về phần tử đầu tiên (đóng vai trò hàng đợi Queue). <em>Lưu ý: Thao tác này có chi phí O(N) vì phải dồn toàn bộ mảng con trỏ phía sau sang trái.</em></li>
          <li><code>L.pop(i)</code>: Xóa và trả về phần tử tại vị trí bù <code>i</code> bất kỳ.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng phương thức pop() với vị trí bù tùy chọn',
          code: `L = ['aa', 'bb', 'cc', 'dd']

# Pop phần tử ở cuối (mặc định)
val_last = L.pop()
print("L.pop() trả về:   ", repr(val_last))
print("List sau pop():    ", L)

# Pop phần tử tại vị trí bù 1 cụ thể
val_idx1 = L.pop(1)
print("L.pop(1) trả về:  ", repr(val_idx1))
print("List sau pop(1):   ", L)`,
          output: `L.pop() trả về:    'dd'
List sau pop():     ['aa', 'bb', 'cc']
L.pop(1) trả về:   'bb'
List sau pop(1):    ['aa', 'cc']`,
          annotations: [
            { line: 4, text: 'L.pop() lấy ra \'dd\' ở cuối.' },
            { line: 9, text: 'L.pop(1) lấy ra phần tử \'bb\' tại vị trí bù 1.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'So sánh phương thức pop() với câu lệnh del',
        content: 'Cả <code>L.pop(i)</code> và <code>del L[i]</code> đều xóa phần tử tại vị trí bù <code>i</code> tại chỗ. Điểm khác biệt duy nhất: <code>L.pop(i)</code> <strong>trả về giá trị của phần tử vừa bị xóa</strong> để bạn lưu vào biến sử dụng tiếp, trong khi câu lệnh <code>del</code> chỉ đơn thuần tiêu hủy mục đó mà không trả về giá trị.'
      }
    ],
    pitfalls: [
      {
        title: 'Gọi pop() trên danh sách rỗng sẽ phát sinh lỗi IndexError',
        content: 'Nếu danh sách không có phần tử nào mà bạn gọi <code>[].pop()</code>, Python sẽ báo lỗi <code>IndexError: pop from empty list</code>. Trong các bài toán thực tế, hãy luôn kiểm tra <code>if stack:</code> trước khi gọi pop.'
      }
    ]
  },

  exercises: [
    {
      title: 'Kiểm tra cặp dấu ngoặc hợp lệ bằng Ngăn xếp List',
      level: 'Vừa',
      problem: 'Viết một hàm Python ngắn is_valid_parens(s) sử dụng ngăn xếp list để kiểm tra xem một chuỗi dấu ngoặc đơn s chỉ chứa \'(\' và \')\' có đóng mở đúng quy tắc hay không (mỗi ngoặc mở phải có ngoặc đóng tương ứng và đúng thứ tự).',
      hint: 'Duyệt qua từng ký tự: nếu gặp \'(\' thì append vào ngăn xếp; nếu gặp \')\' thì kiểm tra xem ngăn xếp có rỗng không (nếu rỗng return False) rồi pop(). Cuối cùng ngăn xếp phải rỗng.',
      solutionCode: `def is_valid_parens(s):
    stack = []
    for char in s:
        if char == '(':
            stack.append(char)
        elif char == ')':
            if not stack:
                return False
            stack.pop()
    return len(stack) == 0

# Kiểm tra các trường hợp
print("'(())':", is_valid_parens('(())'))
print("'())(': ", is_valid_parens('())('))
print("'(()':  ", is_valid_parens('(()'))`,
      solutionOutput: `'(())': True
'())(':  False
'(()':   False`,
      explanation: 'Thuật toán ngăn xếp kinh điển: dùng append để ghi nhận dấu mở ngoặc và pop để triệt tiêu cặp khi gặp dấu đóng ngoặc.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây phân biệt ĐÚNG NHẤT giữa L.reverse() và reversed(L)?',
      options: [
        'L.reverse() trả về một list mới, còn reversed(L) sửa L tại chỗ.',
        'L.reverse() đảo ngược L tại chỗ và trả về None; reversed(L) giữ nguyên L và trả về một đối tượng iterable lười biếng.',
        'reversed(L) chỉ hoạt động trên chuỗi, không hoạt động trên list.',
        'Cả hai lệnh đều trả về một list mới đã được đảo ngược.'
      ],
      correctIndex: 1,
      explanation: 'L.reverse() là phương thức tại chỗ (in-place) trả về None; reversed(L) là hàm dựng sẵn trả về một iterator tạo giá trị theo nhu cầu mà không sửa L.'
    },
    {
      question: 'Cấu trúc dữ liệu Ngăn xếp (Stack) tuân theo nguyên lý nào sau đây?',
      options: [
        'FIFO (First-In, First-Out: Vào trước ra trước).',
        'LIFO (Last-In, First-Out: Vào sau ra trước).',
        'Truy cập ngẫu nhiên theo khóa.',
        'Sắp xếp tự động theo giá trị.'
      ],
      correctIndex: 1,
      explanation: 'Ngăn xếp (Stack) hoạt động theo nguyên lý LIFO (Last-In, First-Out): phần tử được thêm vào sau cùng (append vào đuôi) sẽ là phần tử được lấy ra đầu tiên (pop khỏi đuôi).'
    }
  ],

  summary: [
    'L.reverse() đảo ngược các phần tử của list tại chỗ và trả về None.',
    'Hàm dựng sẵn reversed(L) trả về một iterable lười biếng (iterator), cần dùng list(reversed(L)) nếu muốn tạo ra một list mới.',
    'Cấu trúc Ngăn xếp (Stack LIFO) được cài đặt tự nhiên và đạt hiệu năng O(1) trong Python bằng cặp phương thức append() và pop().',
    'Phương thức pop() có thể nhận một vị trí bù tùy chọn i để xóa và trả về phần tử tại offset đó (mặc định là -1).',
    'Gọi pop() trên một danh sách rỗng sẽ kích hoạt lỗi IndexError.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.8), chúng ta sẽ hoàn tất hộp công cụ phương thức của List với các công cụ tìm kiếm và thu hẹp: remove(), count(), và index().'
};