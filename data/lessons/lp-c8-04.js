export default {
  id: 'lp-c8-04',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.4',
  title: 'Thay đổi List tại chỗ: Gán chỉ mục & Cơ chế Phép gán lát cắt (Trích xuất, Xóa và Chèn)',
  subtitle: 'Khám phá tính khả biến (mutable), sửa đổi trực tiếp không cần tạo bản sao và cơ chế hai nhịp Xóa - Chèn của phép gán lát cắt',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững bản chất thay đổi tại chỗ (in-place mutation) của List: trực tiếp ghi đè dữ liệu mà không cấp phát đối tượng mới.',
    'Thành thạo phép gán chỉ mục `L[i] = X` để thay thế một phần tử đơn lẻ.',
    'Thấu suốt cơ chế 2 bước của phép gán lát cắt (Slice Assignment): 1. Xóa lát cắt vế trái, 2. Chèn toàn bộ phần tử của iterable vế phải vào vị trí đó.',
    'Biết cách tận dụng phép gán lát cắt để thay thế phân đoạn, mở rộng, chèn tại vị trí rỗng (`L[i:i]`), và xóa phân đoạn (`L[i:j] = []`).'
  ],

  intuition: {
    title: 'Phẫu thuật đường ray: Cắt rời và Ghép nối tức thì',
    metaphor: 'Hãy tưởng tượng bạn đang sửa chữa một đoạn đường ray xe lửa gồm nhiều thanh tà vẹt. Nếu đường ray là chuỗi (str) bất biến, bạn không được phép tháo bất kỳ ốc vít nào; muốn đổi một thanh, bạn phải xây hẳn một tuyến đường sắt mới hoàn toàn song song! Nhưng với List khả biến, bạn có thể thực hiện "phẫu thuật" ngay trên tuyến đường đang chạy. Phép gán chỉ mục L[1] = "Hack" giống như tháo thanh tà vẹt số 1 ra và gắn thanh mới vào. Còn phép gán lát cắt L[1:3] = [A, B, C, D] giống như một cỗ máy công binh hiện đại: nó dùng lưỡi cưa cắt phăng đoạn đường ray từ cột 1 đến trước cột 3 (nhịp Xóa), rồi lập tức hàn 4 thanh tà vẹt mới A, B, C, D vào khoảng trống vừa tạo ra (nhịp Chèn). Độ dài đường ray co giãn ngay tại chỗ mà không cần đổi đường sắt!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ PHÉP GÁN LÁT CẮT (SLICE ASSIGNMENT): XÓA + CHÈN</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-weight:700;width:90px;color:var(--text-muted);">1. Ban đầu:</span>
            <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">1</span>
            <span style="padding:4px 10px;background:rgba(239,68,68,0.2);border:2px dashed #ef4444;border-radius:4px;font-weight:700;color:#ef4444;">[2] (L[1:2])</span>
            <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">3</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-weight:700;width:90px;color:#ef4444;">2. Bước Xóa:</span>
            <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">1</span>
            <span style="padding:4px 10px;border:1px dashed var(--text-muted);border-radius:4px;color:var(--text-muted);font-style:italic;">(vị trí trống)</span>
            <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">3</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-weight:700;width:90px;color:#10b981;">3. Bước Chèn:</span>
            <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">1</span>
            <span style="padding:4px 10px;background:rgba(16,185,129,0.2);border:2px solid #10b981;border-radius:4px;font-weight:700;color:#10b981;">4</span>
            <span style="padding:4px 10px;background:rgba(16,185,129,0.2);border:2px solid #10b981;border-radius:4px;font-weight:700;color:#10b981;">5</span>
            <span style="padding:4px 10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">3</span>
            <span style="font-weight:700;color:#10b981;margin-left:8px;">➔ List mở rộng thành [1, 4, 5, 3]!</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bản chất Thay đổi Tại chỗ (In-Place Mutation)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 6 / 42 – Trang 8 / 42</strong>.</p>
          </div>
        </div>

        <p>Bởi vì list mang tính <strong>khả biến (mutable)</strong>, chúng hỗ trợ các thao tác thay đổi trực tiếp đối tượng list tại chỗ (<em>in-place</em>). Nghĩa là, các thao tác này trực tiếp sửa đổi đối tượng list—ghi đè lên giá trị trước đó của nó—mà <strong>không bắt buộc bạn phải tạo một bản sao mới</strong> như từng phải làm với chuỗi.</p>

        <p>Vì Python chỉ làm việc với các tham chiếu đối tượng, sự khác biệt giữa việc thay đổi một đối tượng tại chỗ và việc tạo ra một đối tượng mới có ý nghĩa vô cùng quan trọng: như đã phân tích sâu trong Chương 6, nếu bạn thay đổi một đối tượng tại chỗ, bạn có thể tác động đến <em>nhiều hơn một tham chiếu đang cùng trỏ tới nó</em>!</p>
      `,
      codeExamples: [
        {
          title: 'Phép gán chỉ mục và gán lát cắt sửa đổi trực tiếp đối tượng list',
          code: `L = ['code', 'Code', 'CODE!']

# Phép gán chỉ mục: thay thế tham chiếu tại vị trí bù 1
L[1] = 'Hack'
print("Sau L[1] = 'Hack':", L)

# Gán lát cắt: thay thế phân đoạn [0:2]
L[0:2] = ['write', 'Python']
print("Sau L[0:2] = ['write', 'Python']:", L)`,
          output: `Sau L[1] = 'Hack': ['code', 'Hack', 'CODE!']
Sau L[0:2] = ['write', 'Python']: ['write', 'Python', 'CODE!']`,
          annotations: [
            { line: 4, text: 'L[1] thay đổi trực tiếp phần tử thứ hai của L thành \'Hack\'.' },
            { line: 8, text: 'L[0:2] thay thế hai phần tử đầu tiên bằng hai phần tử mới trong một bước duy nhất.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Cơ chế Hai Bước của Phép Gán Lát cắt (Slice Assignment)',
      content: `
        <p>Phép gán lát cắt thay thế toàn bộ một phân đoạn của list chỉ trong một bước duy nhất. Vì thao tác này có thể hơi trừu tượng, tác giả Mark Lutz hướng dẫn tốt nhất nên hình dung nó như sự kết hợp của <strong>hai bước kế tiếp nhau</strong>:</p>

        <ol>
          <li><strong>Xóa (Deletion):</strong> Lát cắt bạn chỉ định ở bên trái dấu <code>=</code> sẽ bị xóa bỏ hoàn toàn khỏi list.</li>
          <li><strong>Chèn (Insertion):</strong> Các phần tử mới chứa trong đối tượng iterable ở bên phải dấu <code>=</code> sẽ được chèn vào list bên trái, ngay tại vị trí mà lát cắt cũ vừa bị xóa.</li>
        </ol>

        <div class="callout-box callout-note">
          <div class="callout-header"><span>📌 Chú thích tác giả [2]:</span> <span>Trường hợp lát cắt hai vế chồng lấn nhau</span></div>
          <div class="callout-body">
            <p>Mô tả hai bước này cần được làm rõ thêm khi giá trị vế phải và lát cắt bị gán bị chồng lấn nhau: ví dụ <code>L[2:5] = L[3:6]</code> vẫn hoạt động hoàn hảo vì các giá trị cần chèn được trích xuất trước khi việc xóa diễn ra ở vế trái. Do đó, gán lát cắt thực chất là <em>Trích xuất + Xóa + Chèn</em>, nhưng phần trích xuất hiếm khi tạo ra sự khác biệt lớn cần nhấn mạnh.</p>
          </div>
        </div>

        <p>Cơ chế này giải thích tại sao <strong>số lượng phần tử được chèn không nhất thiết phải bằng số lượng phần tử bị xóa</strong>:</p>
        <ul>
          <li><strong>Thay thế & Mở rộng:</strong> <code>L[1:2] = [4, 5]</code> thay thế 1 phần tử bằng 2 phần tử, làm cho list nở rộng ra.</li>
          <li><strong>Chèn vào lát cắt rỗng:</strong> <code>L[1:1] = [6, 7]</code> xóa 0 phần tử (lát cắt rỗng tại vị trí 1) và chèn 2 phần tử vào, đóng vai trò như một phép chèn thuần túy.</li>
          <li><strong>Xóa phân đoạn:</strong> <code>L[1:2] = []</code> xóa lát cắt và không chèn gì vào, đóng vai trò như một phép xóa.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Minh họa cơ chế thay thế, chèn và xóa thông qua phép gán lát cắt',
          code: `L = [1, 2, 3]

# 1. Thay thế 1 phần tử bằng 2 phần tử (mở rộng kích thước)
L[1:2] = [4, 5]
print("Sau L[1:2] = [4, 5]:", L)

# 2. Chèn vào lát cắt rỗng [1:1] (không xóa gì)
L[1:1] = [6, 7]
print("Sau L[1:1] = [6, 7]:", L)

# 3. Gán lát cắt bằng list rỗng [] (xóa phân đoạn)
L[1:2] = []
print("Sau L[1:2] = []:     ", L)`,
          output: `Sau L[1:2] = [4, 5]: [1, 4, 5, 3]
Sau L[1:1] = [6, 7]: [1, 6, 7, 4, 5, 3]
Sau L[1:2] = []:      [1, 7, 4, 5, 3]`,
          annotations: [
            { line: 4, text: 'Phần tử 2 tại offset 1 bị xóa, hai số 4 và 5 được chèn vào đúng chỗ đó.' },
            { line: 8, text: 'Lát cắt [1:1] là rỗng, 6 và 7 được chèn vào trước offset 1 hiện tại.' },
            { line: 12, text: 'L[1:2] là phần tử 6; gán bằng [] xóa sạch phần tử này mà không chèn gì.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Chèn ở Đầu, Cuối và Đánh giá Thực tế của Lutz',
      content: `
        <p>Phép gán lát cắt cũng có thể được dùng như một dạng ghép nối tại chỗ ở phần đầu hoặc phần cuối của list:</p>

        <ul>
          <li><strong>Chèn ở đầu list:</strong> <code>L[:0] = [2, 3, 4]</code> — chèn toàn bộ các phần tử vào trước vị trí bù 0.</li>
          <li><strong>Chèn ở cuối list:</strong> <code>L[len(L):] = [5, 6, 7]</code> — chèn toàn bộ các phần tử vào sau phần tử cuối cùng.</li>
        </ul>

        <p>Tuy nhiên, như tác giả Mark Lutz thẳng thắn nhận định ở trang 8: <em>"Đây là một thao tác mạnh mẽ, nhưng thành thật mà nói, bạn có thể không bắt gặp nó quá thường xuyên trong thực tế. Thường có những cách trực tiếp và dễ nhớ hơn để thay thế, chèn và xóa (bao gồm các phương thức insert, pop, remove, extend), vốn được các lập trình viên Python ưa chuộng hơn trong thực tế."</em></p>
      `,
      codeExamples: [
        {
          title: 'Chèn ở đầu và cuối list bằng slice assignment so với extend()',
          code: `L = [1]

# Chèn tất cả tại đầu bằng slice rỗng :0
L[:0] = [2, 3, 4]
print("Sau L[:0] = [2, 3, 4]:        ", L)

# Chèn tất cả tại cuối bằng slice rỗng len(L):
L[len(L):] = [5, 6, 7]
print("Sau L[len(L):] = [5, 6, 7]:    ", L)

# Phương thức extend tương đương trực quan hơn nhiều
L.extend([8, 9, 10])
print("Sau L.extend([8, 9, 10]):      ", L)`,
          output: `Sau L[:0] = [2, 3, 4]:         [2, 3, 4, 1]
Sau L[len(L):] = [5, 6, 7]:     [2, 3, 4, 1, 5, 6, 7]
Sau L.extend([8, 9, 10]):       [2, 3, 4, 1, 5, 6, 7, 8, 9, 10]`,
          annotations: [
            { line: 4, text: 'L[:0] chèn 2, 3, 4 vào đầu danh sách.' },
            { line: 8, text: 'L[len(L):] chèn 5, 6, 7 vào cuối danh sách.' },
            { line: 12, text: 'L.extend([8, 9, 10]) thực hiện công việc tương tự nhưng cú pháp rõ ràng, dễ đọc hơn nhiều.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Vế phải của phép gán lát cắt phải là một Iterable',
        content: 'Bạn không thể gán một giá trị đơn lẻ cho một lát cắt, ví dụ: <code>L[1:2] = 4</code> sẽ gây lỗi <code>TypeError: can only assign an iterable</code>. Bắt buộc phải bọc giá trị vào một iterable như list: <code>L[1:2] = [4]</code>.'
      }
    ],
    pitfalls: [
      {
        title: 'Phân biệt gán lát cắt rỗng L[0:1] = [] với gán chỉ mục L[0] = []',
        content: 'Đây là cái bẫy kinh điển: <code>L[0:1] = []</code> sẽ <strong>xóa bỏ</strong> phần tử tại vị trí 0. Nhưng <code>L[0] = []</code> thì <strong>KHÔNG hề xóa</strong>, mà chỉ gán một list rỗng vào vị trí 0 đó, biến danh sách thành chứa một list con rỗng <code>[[]]</code>!'
      }
    ]
  },

  exercises: [
    {
      title: 'Thay thế và dọn dẹp phân đoạn bằng phép gán lát cắt',
      level: 'Vừa',
      problem: 'Cho list numbers = [1, 999, 999, 999, 5]. Hãy dùng đúng MỘT dòng lệnh phép gán lát cắt để thay thế toàn bộ đoạn ba số 999 ở giữa bằng hai số [2, 3, 4]. Sau đó in ra kết quả cuối cùng.',
      hint: 'Đoạn ba số 999 nằm từ offset 1 đến trước offset 4 (tức lát cắt [1:4]). Gán lát cắt này bằng [2, 3, 4].',
      solutionCode: `numbers = [1, 999, 999, 999, 5]

# Thay thế 3 phần tử bằng 3 phần tử mới chỉ trong một bước
numbers[1:4] = [2, 3, 4]

print("List sau khi thay thế:", numbers)
print("Độ dài danh sách:", len(numbers))`,
      solutionOutput: `List sau khi thay thế: [1, 2, 3, 4, 5]
Độ dài danh sách: 5`,
      explanation: 'numbers[1:4] chỉ định phân đoạn 3 phần tử 999; phép gán = [2, 3, 4] xóa bỏ 3 phần tử đó và chèn 2, 3, 4 vào vị trí vừa dọn trống.'
    }
  ],

  quiz: [
    {
      question: 'Cho L = [1, 2, 3]. Sau khi thực thi lệnh L[1:1] = [8, 9], giá trị của L sẽ là gì?',
      options: [
        '[1, 8, 9, 2, 3]',
        '[1, 8, 9, 3]',
        '[8, 9, 1, 2, 3]',
        'Lỗi IndexError vì lát cắt [1:1] là rỗng.'
      ],
      correctIndex: 0,
      explanation: 'Lát cắt [1:1] là rỗng (xóa 0 phần tử) tại vị trí bù 1. Do đó hai phần tử 8 và 9 được chèn vào ngay trước phần tử 2 hiện tại, tạo thành [1, 8, 9, 2, 3].'
    },
    {
      question: 'Phát biểu nào sau đây đúng về sự khác biệt giữa L[0] = [] và L[0:1] = []?',
      options: [
        'Cả hai lệnh đều xóa phần tử đầu tiên của list.',
        'L[0] = [] thay thế phần tử đầu tiên bằng một list rỗng, còn L[0:1] = [] xóa bỏ hoàn toàn phần tử đầu tiên.',
        'L[0:1] = [] gây lỗi TypeError vì không thể gán list rỗng cho lát cắt.',
        'L[0] = [] xóa list, còn L[0:1] = [] nhân bản list.'
      ],
      correctIndex: 1,
      explanation: 'Gán chỉ mục L[0] = [] lưu tham chiếu tới đối tượng list rỗng vào ô 0; gán lát cắt L[0:1] = [] xóa lát cắt đó và không chèn gì vào (thu hẹp kích thước list).'
    }
  ],

  summary: [
    'List là đối tượng khả biến: hỗ trợ thay đổi trực tiếp tại chỗ (in-place) mà không cần cấp phát lại đối tượng mới.',
    'Gán chỉ mục L[i] = X thay thế trực tiếp con trỏ tham chiếu tại vị trí bù i.',
    'Gán lát cắt hoạt động theo cơ chế 2 bước: Xóa phân đoạn vế trái, sau đó Chèn các phần tử của iterable vế phải vào vị trí đó.',
    'Số lượng phần tử chèn không bắt buộc phải bằng số phần tử xóa: gán lát cắt có thể làm mở rộng hoặc thu hẹp list.',
    'Mặc dù slice assignment rất linh hoạt, các lập trình viên Python trong thực tế thường ưa chuộng các phương thức như append, extend, insert, pop, remove.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.5), chúng ta sẽ khám phá các phương thức tăng kích thước phổ biến nhất của List: append(), extend(), insert() và toán tử cộng tại chỗ +=.'
};