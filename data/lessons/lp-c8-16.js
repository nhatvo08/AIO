export default {
  id: 'lp-c8-16',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.16',
  title: 'Các kỹ thuật tạo Dictionary: 4 Cách kinh điển, dict(zip()), dict.fromkeys() & ** Unpacking',
  subtitle: 'Khảo sát toàn diện các phương pháp khởi tạo Dictionary, kỹ thuật ghép cặp zip, phương thức fromkeys và cú pháp giải nén hai dấu sao (**)',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo 4 kỹ thuật khởi tạo Dictionary kinh điển và phân tích hoàn cảnh tối ưu cho từng cách.',
    'Sử dụng hàm dựng sẵn `zip()` kết hợp với `dict()` để hợp nhất hai danh sách khóa và giá trị độc lập.',
    'Sử dụng phương thức `dict.fromkeys()` để khởi tạo hàng loạt khóa có cùng một giá trị ban đầu.',
    'Thành thạo cú pháp Unpacking hai dấu sao `**` trong Dictionary Literal và hiểu rõ quy tắc xung đột khóa (vế phải thắng).',
    'Nhận diện bẫy lỗi `TypeError` khi dùng `**` bên trong hàm `dict()` có khóa trùng lặp.'
  ],

  intuition: {
    title: 'Bốn cách đúc chìa khóa và Chiếc máy ghép phôi tự động',
    metaphor: 'Để tạo ra một chiếc Dictionary trong Python, bạn giống như một người thợ rèn có 4 bộ khuôn khác nhau: (1) Khuôn đúc sẵn (`{...}`): bạn có sẵn cả chìa lẫn ổ khóa ngay từ đầu. (2) Đục rãnh từng chiếc (`D[k] = v`): bạn rèn từng chiếc chìa một khi có khách yêu cầu trong ngày. (3) Khuôn từ khóa (`dict(name=...)`): bạn đọc tên chìa khóa nhẹ nhàng không cần dấu nháy. (4) Dây chuyền ghép đôi (`dict(zip(keys, values))`): bạn có một rổ phôi chìa khóa và một rổ thẻ tên riêng rẽ, chiếc máy kéo khóa zip sẽ kẹp đôi từng cặp tương ứng lại với nhau! Cuối cùng, cú pháp `**D` giống như việc mở toang chiếc tủ cũ, đổ toàn bộ đồ bên trong hòa vào chiếc tủ mới!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BỐN CÁCH TẠO CÙNG MỘT DICTIONARY {'name': 'Pat', 'age': 40}</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. Literal Truyền thống</div>
            <div style="font-size:0.8rem;margin-top:4px;"><code>{'name': 'Pat', 'age': 40}</code></div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Viết rõ toàn bộ ngay từ đầu.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">2. Gán theo Khóa Động</div>
            <div style="font-size:0.8rem;margin-top:4px;"><code>D = {}; D['name'] = 'Pat'</code></div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Tạo từng trường khi đang chạy.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">3. Đối số Từ khóa dict()</div>
            <div style="font-size:0.8rem;margin-top:4px;"><code>dict(name='Pat', age=40)</code></div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Ít phải gõ dấu nháy, gọn gàng.</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">4. Dạng Tuple dict()</div>
            <div style="font-size:0.8rem;margin-top:4px;"><code>dict([('name','Pat'),...])</code></div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Rất hợp khi ghép cặp với zip().</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bốn Phương pháp Khởi tạo Dictionary Kinh điển',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 22 / 42 – Trang 23 / 42</strong>.</p>
          </div>
        </div>

        <p>Bởi vì dictionary quá đỗi hữu ích trong thực tế, nhiều cách thức xây dựng chúng đã xuất hiện theo thời gian. Dưới đây tóm tắt 4 phương án thay thế phổ biến nhất để tạo ra cùng một dictionary có hai khóa <code>'name'</code> và <code>'age'</code>:</p>

        <ul>
          <li><strong>1. Biểu thức literal truyền thống:</strong> <code>{'name': 'Pat', 'age': 40}</code> — tiện dụng nếu bạn có thể viết rõ toàn bộ dictionary ngay từ đầu trong mã nguồn.</li>
          <li><strong>2. Gán theo khóa động:</strong> <code>D = {}; D['name'] = 'Pat'; D['age'] = 40</code> — hữu ích nếu bạn cần tạo dictionary từng trường một trong lúc chạy chương trình (ví dụ: đọc từng dòng dữ liệu từ người dùng hoặc tệp).</li>
          <li><strong>3. Dạng đối số từ khóa <code>dict()</code>:</strong> <code>dict(name='Pat', age=40)</code> — ít phải gõ phím hơn dạng thứ nhất (không cần gõ dấu nháy quanh khóa), nhưng đòi hỏi tất cả các khóa phải là tên biến (identifier) hợp lệ.</li>
          <li><strong>4. Dạng các tuple khóa/giá trị <code>dict()</code>:</strong> <code>dict([('name', 'Pat'), ('age', 40)])</code> — hữu ích nếu bạn cần xây dựng các khóa và giá trị dưới dạng các dãy tuần tự trong thời gian chạy.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo cùng một Dictionary bằng 4 phương pháp kinh điển',
          code: `# 1) Biểu thức literal truyền thống
d1 = {'name': 'Pat', 'age': 40}

# 2) Gán theo khóa động
d2 = {}
d2['name'] = 'Pat'
d2['age'] = 40

# 3) Dạng đối số từ khóa dict()
d3 = dict(name='Pat', age=40)

# 4) Dạng các tuple khóa/giá trị dict()
d4 = dict([('name', 'Pat'), ('age', 40)])

# Kiểm chứng cả 4 cách đều tạo ra kết quả y hệt
print("d1 == d2 == d3 == d4:", d1 == d2 == d3 == d4)
print("Kết quả:", d1)`,
          output: `d1 == d2 == d3 == d4: True
Kết quả: {'name': 'Pat', 'age': 40}`,
          annotations: [
            { line: 2, text: 'Literal {} là dạng trực quan và phổ biến nhất.' },
            { line: 5, text: 'Gán động cho phép xây dựng dict linh hoạt theo từng bước logic.' },
            { line: 11, text: 'dict(name=\'Pat\') sử dụng cú pháp name=value ngắn gọn.' },
            { line: 14, text: 'dict(list_of_tuples) chuyển đổi cấu trúc cặp tuần tự thành bảng băm.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Kỹ thuật Ghép cặp zip() và Phương thức dict.fromkeys()',
      content: `
        <p><strong>Khởi tạo động bằng hàm zip():</strong><br>
        Dạng khởi tạo thứ tư thường được kết hợp với hàm dựng sẵn <code>zip()</code> để kết hợp các danh sách khóa và giá trị riêng biệt thu được động trong thời gian chạy (ví dụ: danh sách tên cột và danh sách dòng dữ liệu được phân tích cú pháp từ tệp CSV hay cơ sở dữ liệu SQL):</p>
        <p><code>D = dict(zip(keyslist, valueslist))</code></p>

        <p><strong>Khởi tạo hàng loạt với dict.fromkeys():</strong><br>
        Với điều kiện là tất cả các giá trị của khóa ban đầu đều giống nhau, bạn có thể tạo một dictionary bằng phương thức đặc biệt <code>dict.fromkeys(keys, [value])</code>. Lưu ý rằng thao tác này được chạy trực tiếp từ <strong>tên kiểu <code>dict</code></strong> chứ không phải từ một đối tượng dictionary thực tế (nếu bỏ qua giá trị, mặc định sẽ là <code>None</code>):</p>
      `,
      codeExamples: [
        {
          title: 'Ghép cặp danh sách với zip() và tạo khóa mặc định với fromkeys()',
          code: `# 1. Ghép cặp hai list độc lập bằng zip()
keys_list = ['a', 'b', 'c']
vals_list = [1, 2, 3]

zipped_pairs = list(zip(keys_list, vals_list))
print("Cặp zip được tạo ra:    ", zipped_pairs)

dict_from_zip = dict(zip(keys_list, vals_list))
print("Dict tạo từ zip:        ", dict_from_zip)

# 2. Khởi tạo hàng loạt bằng dict.fromkeys()
zeros_dict = dict.fromkeys(['a', 'b'], 0)
print("\ndict.fromkeys(['a', 'b'], 0):", zeros_dict)

# Mặc định giá trị là None khi không chỉ định
none_dict = dict.fromkeys('code')
print("dict.fromkeys('code'):        ", none_dict)`,
          output: `Cặp zip được tạo ra:     [('a', 1), ('b', 2), ('c', 3)]
Dict tạo từ zip:         {'a': 1, 'b': 2, 'c': 3}

dict.fromkeys(['a', 'b'], 0): {'a': 0, 'b': 0}
dict.fromkeys('code'):         {'c': None, 'o': None, 'd': None, 'e': None}`,
          annotations: [
            { line: 5, text: 'zip kẹp đôi từng phần tử tương ứng của hai list thành tuple.' },
            { line: 8, text: 'dict() chuyển đổi các tuple thành cặp key-value hoàn chỉnh.' },
            { line: 12, text: 'dict.fromkeys khởi tạo nhanh tất cả các khóa có cùng giá trị 0.' },
            { line: 16, text: 'Chuỗi \'code\' là iterable, sinh ra 4 khóa \'c\', \'o\', \'d\', \'e\' có giá trị None.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Unpacking Dictionary với ** và Xung đột Khóa',
      content: `
        <p>Kể từ Python 3.5, các literal của dictionary cũng hỗ trợ <strong>cú pháp dấu sao kép <code>**</code></strong> đặc biệt giúp giải nén (unpack) nội dung của một dictionary khác ở cấp ngoài cùng của nó, tương tự như <code>*</code> trong list literal:</p>

        <ul>
          <li>Bất kỳ số lượng <code>**</code> nào cũng có thể xuất hiện trong một literal để unpack bất kỳ số lượng dictionary nào.</li>
          <li><strong>Quy tắc giải quyết xung đột khóa:</strong> Giá trị nằm <strong>ngoài cùng bên phải sẽ chiến thắng</strong> khi các khóa bị trùng lặp.</li>
        </ul>

        <div class="callout-box callout-pitfall">
          <div class="callout-header"><span>⚠️ Phân biệt ** trong Literal {} vs ** trong hàm dict():</span> <span>Bẫy lỗi TypeError</span></div>
          <div class="callout-body">
            <p>Cú pháp <code>**</code> cũng hoạt động trong lời gọi hàm <code>dict(...)</code>, nhưng đơn giản là vì <code>**</code> giải nén các đối số từ khóa trong lệnh gọi hàm. Tuy nhiên, <strong>khác với trong các literal <code>{}</code></strong>, <code>**</code> bên trong <code>dict()</code> <strong>sẽ thất bại với lỗi <code>TypeError</code> nếu có bất kỳ khóa nào xuất hiện hai lần</strong>, vì Python không cho phép truyền lặp lại một đối số từ khóa trong lời gọi hàm!</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Unpacking Dictionary với ** và bẫy lỗi TypeError trong hàm dict()',
          code: `D = dict(a=4, c=3)

# 1. Unpacking trong dictionary literal: vế phải ('a': 4) chiến thắng 'a': 1
merged_lit = {'a': 1, 'b': 2, **D}
print("Unpacking literal {'a': 1, 'b': 2, **D}:", merged_lit)

# 2. Hoạt động bình thường trong dict() khi KHÔNG có khóa trùng lặp
call_ok = dict(a=1, **{'b': 2}, **dict(c=3))
print("dict() với ** không trùng khóa:         ", call_ok)

# 3. BẪY LỖI: dict() với ** bị trùng khóa sẽ phát sinh TypeError!
try:
    dict(a=1, b=2, **dict(a=4, c=3))
except TypeError as err:
    print("Bắt lỗi trùng khóa trong dict():", err)`,
          output: `Unpacking literal {'a': 1, 'b': 2, **D}: {'a': 4, 'b': 2, 'c': 3}
dict() với ** không trùng khóa:          {'a': 1, 'b': 2, 'c': 3}
Bắt lỗi trùng khóa trong dict(): dict() got multiple values for keyword argument 'a'`,
          annotations: [
            { line: 4, text: 'Literal {}: khóa \'a\' trong **D nằm bên phải nên ghi đè giá trị \'a\': 1.' },
            { line: 8, text: 'dict(a=1, **{\'b\': 2}) giải nén đối số từ khóa b=2 hoàn toàn hợp lệ.' },
            { line: 14, text: 'dict(a=1, ..., **dict(a=4)) bị lỗi vì tham số \'a\' được truyền 2 lần vào hàm dict().' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào nên dùng dict(name="Pat") thay vì {"name": "Pat"}?',
        content: 'Dạng <code>dict(name="Pat", age=40)</code> rất được ưa chuộng khi viết mã vì ít phải gõ dấu nháy, giảm nguy cơ sai cú pháp. Tuy nhiên, nó có hạn chế là khóa <strong>bắt buộc phải là tên biến hợp lệ</strong>. Nếu khóa của bạn chứa dấu cách (<code>"full name"</code>), ký tự đặc biệt, hoặc là số nguyên (<code>2024</code>), bạn bắt buộc phải dùng cú pháp literal <code>{}</code>.'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy chia sẻ tham chiếu của dict.fromkeys() với giá trị khả biến',
        content: 'Nếu bạn khởi tạo <code>d = dict.fromkeys([\'a\', \'b\'], [])</code> với giá trị mặc định là một list rỗng, tất cả các khóa đều sẽ <strong>trỏ chung về cùng một đối tượng list duy nhất</strong>! Sửa đổi <code>d[\'a\'].append(1)</code> sẽ làm <code>d[\'b\']</code> cũng bị đổi theo! Hãy dùng dictionary comprehension nếu giá trị là đối tượng khả biến.'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo danh bạ nhân viên tự động từ hai danh sách cột',
      level: 'Dễ',
      problem: 'Cho hai danh sách riêng biệt: ids = [101, 102, 103] và names = ["An", "Bình", "Cường"]. Hãy dùng hàm zip() kết hợp hàm khởi tạo dict() để tạo ra một dictionary ánh xạ từ mã số ID sang họ tên.',
      hint: 'Dùng cú pháp dict(zip(ids, names)).',
      solutionCode: `ids = [101, 102, 103]
names = ["An", "Bình", "Cường"]

# Hợp nhất hai cột thành Dictionary
employee_dir = dict(zip(ids, names))

print("Danh bạ nhân viên:", employee_dir)
print("Tên của nhân viên 102:", employee_dir[102])`,
      solutionOutput: `Danh bạ nhân viên: {101: 'An', 102: 'Bình', 103: 'Cường'}
Tên của nhân viên 102: Bình`,
      explanation: 'dict(zip(ids, names)) ánh xạ từng cặp tương ứng 101: \'An\', 102: \'Bình\', 103: \'Cường\' một cách trực quan và tối ưu.'
    }
  ],

  quiz: [
    {
      question: 'Trong biểu thức Dictionary Literal: res = {"x": 10, **{"x": 20, "y": 30}}, giá trị của res["x"] sẽ là bao nhiêu?',
      options: [
        '10, vì giá trị bên trái được bảo tồn.',
        '20, vì trong unpacking dictionary literal, giá trị nằm bên phải sẽ chiến thắng khi có xung đột khóa.',
        'Lỗi TypeError vì khóa "x" xuất hiện hai lần.',
        '[10, 20]'
      ],
      correctIndex: 1,
      explanation: 'Trong literal {}, cú pháp ** tuân theo quy tắc "vế phải thắng" (rightmost wins), giá trị "x": 20 sẽ ghi đè lên "x": 10.'
    },
    {
      question: 'Tại sao lệnh dict(1="one", 2="two") lại gây lỗi SyntaxError trong Python?',
      options: [
        'Vì hàm dict() không hỗ trợ số nguyên.',
        'Vì dạng đối số từ khóa yêu cầu tên tham số phải là định danh (identifier) hợp lệ của Python, không thể bắt đầu bằng chữ số.',
        'Vì số nguyên không thể làm khóa của dictionary.',
        'Vì thiếu cặp dấu ngoặc nhọn.'
      ],
      correctIndex: 1,
      explanation: 'Dạng dict(name=value) xem các khóa là tên tham số hàm. Tên tham số không thể là số nguyên 1, 2. Muốn dùng khóa số nguyên, bạn phải dùng literal {1: "one", 2: "two"}.'
    }
  ],

  summary: [
    'Có 4 kỹ thuật khởi tạo Dictionary kinh điển: Literal {}, Gán động D[k]=v, Đối số từ khóa dict(k=v), và Dạng tuple dict([(k, v)]).',
    'dict(zip(keys, values)) là giải pháp chuẩn mực để ghép đôi hai danh sách độc lập thành một Dictionary.',
    'dict.fromkeys(keys, [value]) khởi tạo nhanh chóng hàng loạt khóa với cùng một giá trị ban đầu (mặc định None).',
    'Cú pháp Unpacking ** trong literal {} giải nén dictionary và áp dụng nguyên tắc "vế phải thắng" khi trùng lặp khóa.',
    'Dùng ** trong hàm dict(...) sẽ kích hoạt TypeError nếu xuất hiện khóa trùng lặp do vi phạm quy tắc tham số hàm.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.17), chúng ta sẽ khám phá Dictionary Comprehension: cú pháp biểu thức lặp sinh từ điển, kết hợp zip và các biểu thức tính toán khóa - giá trị động.'
};