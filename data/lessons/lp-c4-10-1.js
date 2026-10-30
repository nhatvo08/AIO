export default {
  id: 'lp-c4-10-1',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.10.1',
  title: 'Các kiểu cốt lõi khác: Tập hợp (Sets)',
  subtitle: 'Tập hợp không trùng lặp, toán tử toán học (&, |, -, ^), cú pháp {...} và ứng dụng lọc dữ liệu duy nhất',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững bản chất của tập hợp (set): tập hợp các đối tượng duy nhất, không có thứ tự và có thể băm (hashable).',
    'Phân biệt hai cách tạo tập hợp: hàm dựng set() và cú pháp hằng ngoặc nhọn {1, 2, 3}.',
    'Sử dụng các toán tử đại số tập hợp: giao (&), hợp (|), hiệu (-), hiệu đối xứng (^).',
    'Áp dụng tập hợp vào bài toán thực tế: khử trùng lặp dữ liệu và kiểm tra thành viên với hiệu năng O(1).'
  ],

  intuition: {
    title: 'Chiếc rây lọc sạn và Vòng tròn Venn',
    metaphor: 'Tập hợp (set) trong Python hoạt động giống hệt các vòng tròn biểu đồ Venn trong toán học hoặc một chiếc rây thông minh: nếu bạn đổ một xô hạt chứa 100 chữ "a" vào đó, nó sẽ tự động lọc bỏ 99 chữ thừa và chỉ giữ lại đúng 1 chữ "a" duy nhất. Bạn có thể chập hai vòng tròn lại để xem phần chung (giao &), gộp chung mọi hạt của hai vòng (hợp |), hoặc nhặt ra những hạt chỉ riêng vòng này có mà vòng kia không có (hiệu -).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÉP TOÁN TẬP HỢP: X = {'s', 'p', 'a', 'm'} VÀ Y = {'h', 'a', 'm'}</div>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:10px;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);font-size:0.8rem;">GIAO: X & Y</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin:4px 0;">{'a', 'm'}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);">Phần tử có ở cả hai</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);font-size:0.8rem;">HỢP: X | Y</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin:4px 0;">{'s','p','a','m','h'}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);">Gộp tất cả (duy nhất)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);font-size:0.8rem;">HIỆU: X - Y</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin:4px 0;">{'p', 's'}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);">Có ở X nhưng không ở Y</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bản chất của Kiểu Tập hợp (Sets)',
      content: `
        <p>Kiểu đối tượng <strong>tập hợp (set)</strong> được bổ sung vào bộ kiểu dữ liệu cốt lõi của Python để mô hình hóa tập hợp toán học:</p>
        <ul>
          <li><strong>Tính duy nhất:</strong> Tập hợp không bao giờ chứa hai phần tử trùng lặp. Mỗi phần tử chỉ xuất hiện duy nhất một lần.</li>
          <li><strong>Không có thứ tự vị trí:</strong> Tập hợp không phải là một dãy tuần tự (sequence). Bạn không thể dùng chỉ mục <code>S[0]</code> hay cắt lát <code>S[1:3]</code> trên tập hợp.</li>
          <li><strong>Khả biến:</strong> Bạn có thể thêm hoặc xóa phần tử khỏi tập hợp (bằng <code>add()</code>, <code>remove()</code>).</li>
        </ul>
      `
    },
    {
      id: 'sec-2',
      title: '2. Khởi tạo Tập hợp và Cú pháp Hằng {...}',
      content: `
        <p>Có hai cách chính để tạo một tập hợp trong Python:</p>
        <ol>
          <li>Dùng hàm dựng <code>set()</code> truyền vào một dãy tuần tự (ví dụ chuỗi hoặc danh sách).</li>
          <li>Dùng cú pháp hằng ngoặc nhọn <code>{1, 2, 3}</code> (được hỗ trợ từ Python 3.0 và 2.7).</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo tập hợp bằng hàm set() và ngoặc nhọn',
          code: `>>> X = set('spam')               # Tạo tập hợp từ chuỗi: loại bỏ trùng lặp nếu có
>>> Y = {'h', 'a', 'm'}           # Cú pháp hằng tập hợp
>>> X, Y
({'a', 'p', 's', 'm'}, {'a', 'h', 'm'})`,
          output: `({'a', 'p', 's', 'm'}, {'a', 'h', 'm'})`,
          annotations: [
            { line: 1, text: 'set(\'spam\') tách chuỗi thành 4 ký tự đơn lẻ duy nhất.' },
            { line: 2, text: 'Cú pháp hằng ngoặc nhọn {...} không có dấu hai chấm tạo ra một set.' },
            { line: 4, text: 'Thứ tự các phần tử khi in ra có thể khác nhau vì tập hợp không có thứ tự.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Các Phép toán Đại số Tập hợp Toán học',
      content: `
        <p>Sức mạnh đặc trưng của tập hợp nằm ở các toán tử toán học trực quan được quá tải sẵn:</p>
      `,
      codeExamples: [
        {
          title: 'Toán tử giao, hợp, hiệu và so sánh tập con',
          code: `>>> X & Y                         # Giao (Intersection): phần tử xuất hiện ở cả hai tập
{'a', 'm'}
>>> X | Y                         # Hợp (Union): tất cả phần tử của cả hai tập
{'s', 'p', 'a', 'm', 'h'}
>>> X - Y                         # Hiệu (Difference): có trong X nhưng không có trong Y
{'p', 's'}
>>> X > Y                         # Tập cha (Superset): X có chứa toàn bộ Y không?
False`,
          output: `{'a', 'm'}
{'s', 'p', 'a', 'm', 'h'}
{'p', 's'}
False`,
          annotations: [
            { line: 1, text: 'Toán tử & tìm giao điểm của hai tập hợp.' },
            { line: 3, text: 'Toán tử | gộp hai tập hợp và tự động loại bỏ trùng lặp.' },
            { line: 5, text: 'Toán tử - loại trừ các phần tử của tập Y ra khỏi X.' },
            { line: 7, text: 'Toán tử > kiểm tra quan hệ bao hàm giữa hai tập hợp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Ứng dụng Thực tế: Khử Trùng lặp Dữ liệu',
      content: `
        <p>Ứng dụng phổ biến nhất của tập hợp trong lập trình hàng ngày là <strong>khử trùng lặp (deduplication)</strong> một danh sách dữ liệu chỉ bằng một dòng lệnh duy nhất:</p>
      `,
      codeExamples: [
        {
          title: 'Khử trùng lặp danh sách bằng set()',
          code: `>>> raw_list = [1, 2, 1, 3, 2, 4, 1]
>>> unique_list = list(set(raw_list))
>>> unique_list
[1, 2, 3, 4]`,
          output: `[1, 2, 3, 4]`,
          annotations: [
            { line: 2, text: 'set() lọc sạch các con số trùng lặp, sau đó list() chuyển lại thành danh sách.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy tập hợp rỗng: set() vs {}',
        content: `
          <p>Vì lý do tương thích lịch sử, cặp ngoặc nhọn rỗng <code>{}</code> trong Python luôn luôn đại diện cho một <strong>từ điển rỗng (empty dict)</strong>, không phải tập hợp rỗng!</p>
          <p>Để tạo một tập hợp rỗng, bạn <strong>bắt buộc</strong> phải viết: <code>s = set()</code>.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Tập hợp bất biến: frozenset',
        content: `
          <p>Vì đối tượng <code>set</code> là khả biến, bạn không thể nhét một <code>set</code> vào làm phần tử của một <code>set</code> khác, cũng không thể dùng <code>set</code> làm khóa của từ điển. Khi cần dùng tập hợp làm khóa hoặc phần tử không đổi, hãy dùng <strong>frozenset</strong>: <code>fs = frozenset([1, 2, 3])</code>.</p>
        `
      }
    ],
    deepDive: {
      title: 'Hiệu năng tra cứu O(1) của Tập hợp',
      content: `
        <p>Bên dưới CPython, kiểu <code>set</code> được cài đặt dựa trên chính bảng băm của từ điển nhưng bỏ qua cột giá trị (chỉ lưu các khóa). Do đó, phép kiểm tra thành viên <code>x in S</code> trên một tập hợp có hàng triệu phần tử đạt độ phức tạp thời gian trung bình <strong>O(1)</strong> (tức thì), nhanh hơn gấp hàng nghìn lần so với phép kiểm tra tuần tự O(N) trên danh sách.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Tìm bạn chung giữa hai người dùng',
      level: 'Dễ',
      description: 'Cho danh sách bạn bè của Nam: <code>nam_friends = ["An", "Bình", "Cường", "Dũng"]</code> và của Hoa: <code>hoa_friends = ["Bình", "Dũng", "Giang", "Hương"]</code>. Hãy dùng toán tử tập hợp để tìm danh sách những người bạn chung của cả hai người.',
      starterCode: `nam_friends = ["An", "Bình", "Cường", "Dũng"]
hoa_friends = ["Bình", "Dũng", "Giang", "Hương"]

# Tìm bạn chung dùng set
`,
      solution: `nam_friends = ["An", "Bình", "Cường", "Dũng"]
hoa_friends = ["Bình", "Dũng", "Giang", "Hương"]

common_friends = list(set(nam_friends) & set(hoa_friends))
common_friends.sort()
print("Bạn chung:", common_friends)`,
      solutionOutput: `Bạn chung: ['Bình', 'Dũng']`,
      explanation: 'Toán tử giao <code>&</code> trên hai tập hợp lập tức lọc ra những người có mặt trong cả hai danh sách.'
    },
    {
      title: 'Kiểm tra chuỗi chứa đủ các chữ cái (Pangram đơn giản)',
      level: 'Vừa',
      description: 'Hãy viết hàm <code>contains_all_vowels(text)</code> kiểm tra xem chuỗi <code>text</code> có chứa đầy đủ cả 5 nguyên âm tiếng Anh (\'a\', \'e\', \'i\', \'o\', \'u\') hay không bằng phép so sánh tập hợp.',
      starterCode: `def contains_all_vowels(text):
    pass

print(contains_all_vowels("The quick brown fox jumps over the lazy dog"))
print(contains_all_vowels("Hello world"))`,
      solution: `def contains_all_vowels(text):
    vowels = set('aeiou')
    return vowels.issubset(set(text.lower()))

print(contains_all_vowels("The quick brown fox jumps over the lazy dog"))
print(contains_all_vowels("Hello world"))`,
      solutionOutput: `True
False`,
      explanation: '<code>vowels.issubset(...)</code> (hoặc toán tử <code>vowels <= set(text.lower())</code>) kiểm tra xem toàn bộ nguyên âm có nằm trọn trong tập ký tự của chuỗi hay không.'
    }
  ],

  quiz: [
    {
      question: 'Cú pháp nào sau đây tạo ra một TẬP HỢP RỖNG trong Python?',
      options: [
        's = {}',
        's = set()',
        's = []',
        's = set({})'
      ],
      correctIndex: 1,
      explanation: '{} tạo ra từ điển rỗng. Để tạo tập hợp rỗng, bắt buộc phải dùng set().'
    },
    {
      question: 'Toán tử nào thực hiện phép GIAO (intersection) giữa hai tập hợp?',
      options: [
        'X | Y',
        'X & Y',
        'X - Y',
        'X ^ Y'
      ],
      correctIndex: 1,
      explanation: 'Toán tử & tìm các phần tử xuất hiện đồng thời trong cả hai tập hợp (phép giao).'
    },
    {
      question: 'Ưu điểm lớn nhất của việc dùng tập hợp (set) thay cho danh sách (list) khi cần kiểm tra x in collection là gì?',
      options: [
        'Tập hợp luôn giữ nguyên thứ tự phần tử.',
        'Tập hợp sử dụng bảng băm giúp kiểm tra thành viên với thời gian O(1) tức thì.',
        'Tập hợp tốn ít RAM hơn danh sách.',
        'Tập hợp cho phép lưu trữ danh sách bên trong.'
      ],
      correctIndex: 1,
      explanation: 'Tập hợp dựa trên bảng băm (hash table), mang lại tốc độ kiểm tra thành viên O(1) vượt trội.'
    }
  ],

  summary: [
    'Tập hợp (set) là tập hợp các đối tượng duy nhất, không trùng lặp và không có thứ tự.',
    'Tạo tập hợp bằng hàm set(iterable) hoặc cú pháp hằng ngoặc nhọn {1, 2, 3}. Cặp ngoặc {} rỗng luôn là từ điển.',
    'Hỗ trợ đầy đủ các phép toán đại số tập hợp trực quan: giao (&), hợp (|), hiệu (-), hiệu đối xứng (^).',
    'Ứng dụng then chốt: khử trùng lặp danh sách và kiểm tra thành viên tức thì với hiệu năng O(1).',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 31–32.'
  ]
};
