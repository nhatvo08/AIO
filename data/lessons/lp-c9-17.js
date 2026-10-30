export default {
  id: 'lp-c9-17',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.17',
  title: 'Kiểm tra kiến thức Phần II (Bài 5, 6, 7): Khóa Dict, Lỗi truy cập ngoài biên & Thao tác chung',
  subtitle: 'Làm rõ bản chất khóa băm bất biến của dictionary, cơ chế tự động nở rộng khi gán khóa mới vs IndexError của list, và tính đa hình giới hạn của các thao tác chung',
  level: 'Cơ bản đến Nâng cao',
  duration: '40 phút',
  isNew314: false,
  readings: [
    {
      title: 'Learning Python, 6th Edition — Chương 9: Kiểm tra kiến thức: Bài tập Phần II (Bài 5, 6, 7)',
      author: 'Mark Lutz',
      pages: 'Trang 46–47 / 48 (Bản dịch tiếng Việt)'
    },
    {
      title: 'Learning Python, 6th Edition — Phụ lục B: Đáp án bài tập Phần II (Đối tượng và Thao tác)',
      author: 'Mark Lutz',
      pages: 'Trang 1162–1164 (Bản gốc tiếng Anh)'
    }
  ],
  objectives: [
    'Giải thích tại sao khóa số nguyên trong dictionary không phải là vị trí bù mà là khóa băm bất biến (hashable key).',
    'Phân biệt rõ ràng lỗi KeyError khi đọc khóa không tồn tại và khả năng tự động nở rộng kích thước khi gán khóa mới (khác biệt sâu sắc với list).',
    'Nhận diện mối liên hệ mật thiết giữa hành vi gán khóa dictionary và việc tạo biến trong namespace của Python.',
    'Nắm vững giới hạn của toán tử ghép nối + trên các kiểu dữ liệu hỗn hợp (mixed types) và lý do dictionary không hỗ trợ phép cộng.',
    'Hiểu nguyên tắc đa hình (polymorphism) và tính bảo toàn kiểu dữ liệu (type preservation) khi thực hiện các phép cắt lát và ghép nối.'
  ],
  sections: [
    {
      id: 'sec-1',
      title: '1. Bài tập 5: Khóa của Dictionary — Không Phải Vị Trí Bù (Offset)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz (Trang 46–47 / 48)</span>
          </div>
          <div class="callout-body">
            <p>Đoạn mã thử nghiệm của Mark Lutz:</p>
            <pre><code class="language-python">&gt;&gt;&gt; D = {}
&gt;&gt;&gt; D[1] = 'a'
&gt;&gt;&gt; D[2] = 'b'
&gt;&gt;&gt; D[(1, 2, 3)] = 'c'
&gt;&gt;&gt; D
{1: 'a', 2: 'b', (1, 2, 3): 'c'}</code></pre>
          </div>
        </div>

        <p><strong>Bản chất của khóa Dictionary:</strong></p>
        <p>Khi thấy các số <code>1</code> và <code>2</code> trong dấu ngoặc vuông, người mới học thường lầm tưởng đây là các vị trí bù (offset) thứ 1 và thứ 2. Nhưng trong Python, <strong>dictionary hoàn toàn không hoạt động dựa trên vị trí thứ tự</strong>!</p>
        <ul>
          <li>Dictionary là một bảng ánh xạ (mapping table). Mọi khóa được đưa vào hàm băm (hash function) để tìm ô nhớ.</li>
          <li>Khóa của từ điển có thể là <em>bất kỳ đối tượng nào thuộc thể loại bất biến (immutable / hashable)</em>: số nguyên (<code>1</code>, <code>2</code>), chuỗi (<code>'name'</code>), hoặc tuple chứa các kiểu bất biến <code>(1, 2, 3)</code>.</li>
          <li>Số <code>1</code> ở đây chỉ là một nhãn khóa đơn thuần, hoàn toàn không đại diện cho "vị trí phần tử thứ hai" như trong list!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 5: Khóa số nguyên và Khóa Tuple trong Dictionary',
          code: `# Khởi tạo dictionary rỗng
D = {}

# Gán khóa là số nguyên
D[1] = 'a'
D[2] = 'b'

# Gán khóa là một tuple bất biến
D[(1, 2, 3)] = 'c'

print("Dictionary hoàn chỉnh:", D)
print("Tra cứu bằng khóa số nguyên D[1]:", D[1])
print("Tra cứu bằng khóa tuple D[(1, 2, 3)]:", D[(1, 2, 3)])`,
          output: `Dictionary hoàn chỉnh: {1: 'a', 2: 'b', (1, 2, 3): 'c'}
Tra cứu bằng khóa số nguyên D[1]: a
Tra cứu bằng khóa tuple D[(1, 2, 3)]: c`
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bài tập 6: Đánh Chỉ Mục Dictionary — KeyError vs Tự Động Tạo Khóa Mới',
      content: `
        <p>Tạo một từ điển ban đầu: <code>D = {'a': 1, 'b': 2, 'c': 3}</code>.</p>

        <p><strong>1. Đọc khóa không tồn tại:</strong></p>
        <p>Khi bạn cố đọc <code>D['d']</code>, Python phát hiện khóa <code>'d'</code> không có trong bảng băm và ném ra ngoại lệ <code>KeyError: 'd'</code> (tương tự như <code>IndexError</code> khi đọc ngoài biên danh sách).</p>

        <p><strong>2. Gán vào một khóa không tồn tại:</strong></p>
        <p>Ngược lại, khi bạn gán <code>D['d'] = 'hack'</code>, dictionary <strong>tự động tạo mới khóa <code>'d'</code> và liên kết giá trị <code>'hack'</code> vào bảng băm</strong>, mở rộng kích thước từ 3 lên 4 mục!</p>

        <p><strong>So sánh sâu sắc giữa List và Dictionary:</strong></p>
        <ul>
          <li>Với List: Bạn không thể gán <code>L[len(L)] = 'hack'</code> — thao tác này sẽ gây <code>IndexError</code>. Bạn buộc phải gọi <code>L.append('hack')</code>.</li>
          <li>Với Dictionary: Phép gán tự động bổ sung khóa mới mà không cần phương thức đặc biệt nào!</li>
        </ul>

        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-top:15px;">
          <div class="callout-header">
            <span>💡</span>
            <span><strong>Kiến trúc CPython:</strong> Mối quan hệ giữa Dict và Tên biến</span>
          </div>
          <div class="callout-body">
            <p>Hành vi này của dictionary giống hệt như quy tắc gán tên biến trong Python: khi bạn viết <code>X = 99</code>, biến <code>X</code> được tự động tạo trong bảng ký hiệu (namespace). Thực tế, namespace biến toàn cục của module trong CPython chính là một dictionary chuẩn, truy cập được thông qua hàm <code>globals()</code>!</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 6: KeyError khi đọc vs Tự động tạo mới khi gán',
          code: `D = {'a': 1, 'b': 2, 'c': 3}

# Đọc khóa không tồn tại
try:
    print(D['d'])
except KeyError as e:
    print("D['d'] ném ngoại lệ:", type(e).__name__, "-", e)

# Gán cho khóa không tồn tại -> Tự động thêm mục mới!
D['d'] = 'hack'
print("Dictionary sau khi gán D['d'] = 'hack':", D)

# So sánh với List:
L = [1, 2, 3]
try:
    L[3] = 'hack'
except IndexError as e:
    print("L[3] = 'hack' ném ngoại lệ:", type(e).__name__, "-", e)`,
          output: `D['d'] ném ngoại lệ: KeyError - 'd'
Dictionary sau khi gán D['d'] = 'hack': {'a': 1, 'b': 2, 'c': 3, 'd': 'hack'}
L[3] = 'hack' ném ngoại lệ: IndexError - list assignment index out of range`
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bài tập 7: Các Thao Tác Chung (Generic Operations) và Giới Hạn Kiểu',
      content: `
        <p>Python là ngôn ngữ kiểu động (dynamically typed) nhưng có tính kiểm tra kiểu nghiêm ngặt (strongly typed) — không ép kiểu ngầm giữa các cấu trúc dữ liệu không cùng loại:</p>

        <p><strong>a. Toán tử <code>+</code> trên các kiểu dữ liệu khác nhau:</strong></p>
        <p>Các biểu thức ghép nối kiểu hỗn hợp như <code>'spam' + [1, 2]</code> hay <code>[1, 2] + (3, 4)</code> đều ném ra ngoại lệ <code>TypeError</code>. Phép cộng dãy tuần tự đòi hỏi cả hai toán hạng phải thuộc cùng một kiểu dữ liệu.</p>

        <p><strong>b. Toán tử <code>+</code> trên Dictionary:</strong></p>
        <p>Biểu thức <code>{'a': 1} + {'b': 2}</code> ném lỗi <code>TypeError: unsupported operand type(s) for +: 'dict' and 'dict'</code>. Dictionary không có thứ tự và không hỗ trợ phép cộng (từ Python 3.9+, dùng toán tử hợp nhất <code>|</code>: <code>d1 | d2</code>).</p>

        <p><strong>c. Phương thức <code>append</code> trên chuỗi và <code>keys</code> trên list:</strong></p>
        <ul>
          <li><code>'spam'.append('x')</code> ném <code>AttributeError</code>: Chuỗi là bất biến (immutable), không có phương thức thay đổi kích thước tại chỗ.</li>
          <li><code>[1, 2].keys()</code> ném <code>AttributeError</code>: List là dãy tuần tự theo chỉ số số nguyên, không phải cấu trúc ánh xạ nhãn khóa nên không có phương thức <code>keys()</code>.</li>
        </ul>

        <p><strong>d. Kiểu đối tượng trả về khi cắt lát và ghép nối:</strong></p>
        <p>Thao tác cắt lát hoặc ghép nối luôn trả về một đối tượng mới <strong>cùng kiểu dữ liệu với toán hạng</strong>: cắt lát <code>str</code> trả về <code>str</code>, cắt lát <code>list</code> trả về <code>list</code>, cắt lát <code>tuple</code> trả về <code>tuple</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 7: Khảo sát các thao tác chung và lỗi kiểu dữ liệu',
          code: `# a. Toán tử + trên kiểu hỗn hợp
for expr_name, func in [
    ("str + list", lambda: 'spam' + [1, 2]),
    ("list + tuple", lambda: [1, 2] + (3, 4)),
    ("dict + dict", lambda: {'a': 1} + {'b': 2}),
    ("str.append", lambda: 'spam'.append('x')),
    ("list.keys", lambda: [1, 2].keys())
]:
    try:
        func()
    except Exception as e:
        print(f"{expr_name:12} ném lỗi: {type(e).__name__} - {e}")

# d. Kiểm tra tính bảo toàn kiểu
print("\\nBảo toàn kiểu đối tượng:")
print("Kiểu của 'spam'[1:]: ", type('spam'[1:]).__name__)
print("Kiểu của [1, 2][1:]:   ", type([1, 2][1:]).__name__)
print("Kiểu của (1, 2)[1:]:   ", type((1, 2)[1:]).__name__)`,
          output: `str + list   ném lỗi: TypeError - can only concatenate str (not "list") to str
list + tuple ném lỗi: TypeError - can only concatenate list (not "tuple") to list
dict + dict  ném lỗi: TypeError - unsupported operand type(s) for +: 'dict' and 'dict'
str.append   ném lỗi: AttributeError - 'str' object has no attribute 'append'
list.keys    ném lỗi: AttributeError - 'list' object has no attribute 'keys'

Bảo toàn kiểu đối tượng:
Kiểu của 'spam'[1:]:  str
Kiểu của [1, 2][1:]:    list
Kiểu của (1, 2)[1:]:    tuple`
        }
      ]
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Cạm bẫy dùng List làm khóa Dictionary',
        content: 'Một cạm bẫy kinh điển: cố gắng dùng list làm khóa từ điển D[[1, 2]] = 3 sẽ gây TypeError: unhashable type: \'list\'. Lý do: list là kiểu khả biến (mutable), nội dung có thể thay đổi sau khi tạo nên không thể tính toán mã băm cố định. Nếu cần khóa gồm nhiều phần tử, hãy dùng tuple D[(1, 2)] = 3.'
      }
    ],
    tips: [
      {
        title: 'Toán tử hợp nhất | cho Dictionary trong Python 3.9+',
        content: 'Thay vì dùng D1.update(D2) làm biến đổi D1 tại chỗ, trong Python 3.9+ bạn có thể dùng toán tử | để tạo ra một từ điển mới gộp cả hai: D3 = D1 | D2.'
      }
    ]
  },
  quiz: [
    {
      question: 'Tại sao câu lệnh D = {}; D[(1, 2, 3)] = \'c\' hoàn toàn hợp lệ trong Python trong khi D[[1, 2, 3]] = \'c\' sẽ báo lỗi TypeError?',
      options: [
        'Vì dictionary chỉ cho phép khóa là kiểu số hoặc ký tự đơn.',
        'Vì tuple (1, 2, 3) là kiểu dữ liệu bất biến nên có thể băm (hashable), trong khi list [1, 2, 3] là kiểu khả biến không thể băm.',
        'Vì dấu ngoặc vuông làm nhầm lẫn cú pháp đánh chỉ mục của Python.',
        'Vì list tiêu tốn quá nhiều bộ nhớ nên không được dùng làm khóa.'
      ],
      correctIndex: 1,
      explanation: 'Khóa của dictionary bắt buộc phải là đối tượng có thể băm (hashable), nghĩa là giá trị của nó không thay đổi trong suốt vòng đời. Tuple chứa các phần tử bất biến thỏa mãn điều này, trong khi list là mutable nên không thể băm (unhashable type: list).'
    },
    {
      question: 'Phép so sánh nào sau đây mô tả chính xác sự khác biệt giữa phép gán chỉ mục ngoài biên của List và gán khóa mới của Dictionary?',
      options: [
        'Cả List và Dictionary đều tự động mở rộng khi gán vào vị trí/khóa mới.',
        'Cả List và Dictionary đều ném ngoại lệ khi vị trí/khóa chưa tồn tại.',
        'List ném IndexError khi gán ngoài độ dài (không tự nở rộng), còn Dictionary tự động bổ sung khóa mới và mở rộng kích thước.',
        'List tự động mở rộng còn Dictionary ném KeyError.'
      ],
      correctIndex: 2,
      explanation: 'List có kích thước cố định theo số phần tử hiện hữu; gán vào L[len(L)] sẽ gây IndexError. Ngược lại, Dictionary là bảng băm tự động nở rộng; gán cho khóa mới sẽ lập tức bổ sung một cặp key-value mới.'
    },
    {
      question: 'Tại sao phương thức append(\'x\') không tồn tại trên đối tượng chuỗi trong Python?',
      options: [
        'Vì chuỗi là kiểu dữ liệu bất biến (immutable), không hỗ trợ các phương thức biến đổi tại chỗ.',
        'Vì chuỗi chỉ có thể mở rộng bằng câu lệnh add().',
        'Vì append là từ khóa dành riêng cho kiểu dictionary.',
        'Vì Python giới hạn chuỗi không được dài quá 256 ký tự.'
      ],
      correctIndex: 0,
      explanation: 'Phương thức append làm thay đổi đối tượng tại chỗ (in-place modification). Chuỗi trong Python là bất biến (immutable) nên không thể sửa đổi hay thêm phần tử tại chỗ; mọi biến đổi chuỗi đều phải tạo ra đối tượng chuỗi mới.'
    },
    {
      question: 'Biểu thức nào sau đây sẽ gây ra lỗi TypeError trong Python?',
      options: [
        '[1, 2] + [3, 4]',
        '\'hello \' + \'world\'',
        '(1, 2) + (3, 4)',
        '[1, 2] + (3, 4)'
      ],
      correctIndex: 3,
      explanation: 'Toán tử ghép nối + đòi hỏi hai toán hạng phải cùng kiểu sequence. Ghép nối một list với một tuple [1, 2] + (3, 4) sẽ gây lỗi TypeError: can only concatenate list (not "tuple") to list.'
    }
  ],
  summary: [
    'Khóa của dictionary có thể là bất kỳ đối tượng bất biến nào (số nguyên, chuỗi, tuple), và khóa số nguyên không đại diện cho vị trí bù thứ tự.',
    'Truy cập khóa không tồn tại gây KeyError; nhưng gán cho khóa không tồn tại sẽ tự động tạo mới cặp mục trong từ điển (giống như gán biến trong namespace).',
    'Toán tử ghép nối + nghiêm ngặt cấm ghép các kiểu dãy tuần tự khác nhau (như chuỗi + list, list + tuple); Python không ép kiểu ngầm.',
    'Dictionary không hỗ trợ toán tử + (dùng .update() hoặc toán tử hợp nhất | trong Python 3.9+).',
    'Các thao tác cắt lát và ghép nối luôn bảo toàn kiểu dữ liệu ban đầu của đối tượng.'
  ],
  nextSteps: 'Trong bài học tiếp theo (C9.18), chúng ta sẽ khám phá Bài tập 8 và 9: Giải mã hiện tượng đánh chỉ mục chuỗi đệ quy và các kỹ thuật cập nhật đối tượng bất biến.'
};
