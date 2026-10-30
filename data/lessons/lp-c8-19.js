export default {
  id: 'lp-c8-19',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.19',
  title: 'Thực hành: Cơ sở dữ liệu sách, Kỹ thuật Ánh xạ ngược (Giá trị sang Khóa) & Đảo ngược Dict',
  subtitle: 'Xây dựng cơ sở dữ liệu các ấn bản sách trong bộ nhớ, kỹ thuật duyệt lặp với tab \\t, đánh chỉ mục ngược và đảo ngược Dictionary bằng zip()',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thực hành xây dựng cơ sở dữ liệu trong bộ nhớ (in-memory database) bằng Dictionary.',
    'Hiểu bản chất duyệt lặp: tại sao `for key in D` hoạt động tương đương `for key in D.keys()`.',
    'Thành thạo kỹ thuật ánh xạ ngược (Reverse Indexing: từ Giá trị tìm Khóa) bằng List Comprehension và `items()`.',
    'Sử dụng hàm `zip()` kết hợp `dict()` để đảo ngược hoán đổi Khóa và Giá trị của Dictionary và nhận diện giới hạn bảo toàn dữ liệu.'
  ],

  intuition: {
    title: 'Biển số xe và Chủ xe: Tra cứu hai chiều',
    metaphor: 'Hãy tưởng tượng hệ thống quản lý xe cộ. Dictionary ban đầu ánh xạ từ "Biển số xe" (khóa) sang "Họ tên chủ xe" (giá trị). Nếu bạn biết biển số xe, cảnh sát chỉ mất 1 giây để đọc ra tên chủ xe (tra cứu O(1)). Nhưng nếu bạn chỉ biết họ tên của một người và muốn tìm xem người đó đang sở hữu những biển số xe nào? Dictionary vốn là con đường một chiều (từ khóa sang giá trị). Để tìm ngược lại, bạn có hai phương án: Cách 1 là đi dọc bãi đỗ xe kiểm tra từng chiếc (duyệt comprehension qua items() để lọc ra các biển số khớp tên). Cách 2 là lập hẳn một bảng phụ thứ hai đảo ngược lại: lấy họ tên làm khóa và biển số làm giá trị bằng zip()! Tuy nhiên hãy cẩn thận: nếu một người sở hữu nhiều xe, việc đảo ngược đơn thuần sẽ khiến chiếc xe sau ghi đè lên chiếc xe trước!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">KỸ THUẬT ĐẢO NGƯỢC DICTIONARY BẰNG zip(values, keys)</div>
        <div style="display:flex;justify-content:center;gap:12px;align-items:center;flex-wrap:wrap;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Bảng gốc (Năm ➔ Tên sách)</div>
            <div style="font-size:0.82rem;font-weight:700;color:#8b5cf6;">'1999' ➔ 'Learning Python'</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;">
            <span style="font-size:0.72rem;color:var(--accent-primary);">dict(zip(values, keys))</span>
            <span style="color:var(--accent-primary);font-weight:700;font-size:1.2rem;">⇄</span>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Bảng đảo (Tên sách ➔ Năm)</div>
            <div style="font-size:0.82rem;font-weight:700;color:#10b981;">'Learning Python' ➔ '1999'</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Nghỉ giải lao: Cơ sở Dữ liệu Sách Kỷ niệm 25 Năm',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 28 / 42 – Trang 29 / 42</strong>.</p>
          </div>
        </div>

        <p>Để kỷ niệm cột mốc một phần tư thế kỷ của cuốn sách này (1999 – 2024), tác giả Mark Lutz xây dựng một ví dụ thực tế cụ thể: một cơ sở dữ liệu các ấn bản sách đơn giản trong bộ nhớ, ánh xạ các năm xuất bản (khóa) sang tên sách (giá trị):</p>

        <p><em>Giao thức lặp ngầm định:</em> Lệnh cuối cùng sử dụng vòng lặp <code>for year in table:</code>. Với một dictionary <code>D</code>, cách viết <code>for key in D</code> hoạt động giống hệt như <code>for key in D.keys()</code>, và cả hai đều sử dụng <strong>giao thức lặp (iteration protocol)</strong> mà chúng ta sẽ mở rộng sau trong cuốn sách. Dù theo cách nào, bạn đều có thể đánh chỉ mục từ khóa sang giá trị bên trong vòng lặp <code>for</code> trong quá trình duyệt:</p>
      `,
      codeExamples: [
        {
          title: 'Cơ sở dữ liệu các ấn bản sách của Mark Lutz và vòng lặp in với ký tự tab',
          code: `# Bảng cơ sở dữ liệu các ấn bản sách (Năm => Tên sách)
table = {
    '2024': 'Learning Python, 6th Edition',
    '2013': 'Learning Python, 5th Edition',
    '1999': 'Learning Python'
}

# Lấy giá trị theo khóa năm
print("table['2024']:", repr(table['2024']))

# Duyệt lặp qua các khóa và in kèm ký tự tab ngang \\t
print("\nDanh sách các ấn bản theo thời gian:")
for year in table:
    print(year + '\t' + table[year])`,
          output: `table['2024']: 'Learning Python, 6th Edition'

Danh sách các ấn bản theo thời gian:
2024	Learning Python, 6th Edition
2013	Learning Python, 5th Edition
1999	Learning Python`,
          annotations: [
            { line: 2, text: 'Khởi tạo dict table với 3 năm phát hành các ấn bản lớn của sách.' },
            { line: 9, text: 'table[\'2024\'] tra cứu trực tiếp theo chuỗi năm.' },
            { line: 14, text: 'Vòng lặp for year in table duyệt qua từng khóa; ký tự \\t tạo khoảng cách tab đẹp mắt.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Kỹ thuật Ánh xạ Ngược: Từ Giá trị sang Khóa',
      content: `
        <p>Bảng trước đó ánh xạ từ năm sang tên sách, nhưng <strong>không có chiều ngược lại</strong>. Nếu bạn muốn tìm năm xuất bản dựa vào tên sách, bản chất của dictionary là ánh xạ đơn hướng (từ khóa sang giá trị).</p>

        <p>Tuy nhiên, bạn hoàn toàn có thể thực hiện <strong>đánh chỉ mục ngược (reverse indexing)</strong> thông qua việc quét qua phương thức <code>items()</code> kết hợp với List Comprehension:</p>

        <ul>
          <li><code>[key for (key, value) in table.items() if value == V]</code>: Quét qua tất cả các cặp, chọn ra những khóa có giá trị khớp với mục tiêu tìm kiếm <code>V</code>.</li>
          <li>Kết quả trả về là một <strong>List các khóa</strong>. Điều này phản ánh thực tế rằng: trong dictionary, mỗi khóa chỉ có đúng một giá trị, nhưng <em>một giá trị có thể được liên kết bởi nhiều khóa khác nhau</em>!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Đánh chỉ mục ngược từ Giá trị sang Khóa bằng List Comprehension',
          code: `table = {
    '2024': 'Learning Python, 6th Edition',
    '2013': 'Learning Python, 5th Edition',
    '1999': 'Learning Python'
}

# Đổi chiều ánh xạ: Tìm năm xuất bản của ấn bản 'Learning Python'
target_val = 'Learning Python'

# Cách 1: Quét qua table.items()
res1 = [year for (year, title) in table.items() if title == target_val]
print("Tìm qua table.items():", res1)

# Cách 2: Quét qua table.keys() và đánh chỉ mục
res2 = [year for year in table.keys() if table[year] == target_val]
print("Tìm qua table.keys(): ", res2)`,
          output: `Tìm qua table.items(): ['1999']
Tìm qua table.keys():  ['1999']`,
          annotations: [
            { line: 11, text: 'table.items() trả về các cặp (year, title); mệnh đề if lọc đúng tên sách.' },
            { line: 15, text: 'table.keys() duyệt qua các năm và so sánh table[year] == target_val.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Đảo ngược Toàn bộ Dictionary bằng zip()',
      content: `
        <p>Nếu bạn cần tra cứu ngược thường xuyên, việc quét duyệt tuyến tính bằng comprehension sẽ tốn chi phí O(N). Thay vào đó, bạn có thể <strong>đảo ngược toàn bộ dictionary</strong> bằng cách zip các giá trị và khóa của nó lại với nhau:</p>
        <p><code>reversed_dict = dict(zip(table.values(), table.keys()))</code></p>

        <div class="callout-box callout-warning">
          <div class="callout-header"><span>⚠️ Điều kiện ngặt nghèo khi đảo ngược Dictionary:</span> <span>Tránh mất mát dữ liệu!</span></div>
          <div class="callout-body">
            <p>Phương pháp đảo ngược bằng <code>zip(table.values(), table.keys())</code> <strong>chỉ an toàn khi thỏa mãn hai điều kiện</strong>:<br>
            1. Tất cả các giá trị (values) phải là đối tượng <em>bất biến (hashable)</em> để có thể trở thành khóa mới.<br>
            2. Các giá trị phải là <em>duy nhất (unique)</em>. Nếu có hai khóa ban đầu mang cùng một giá trị, thì khi đảo ngược, khóa xuất hiện sau sẽ ghi đè lên khóa trước và làm mất vĩnh viễn dữ liệu!</p>
            <p>Để biết thêm về thuật toán đảo ngược ít mất mát dữ liệu hơn (gom các khóa trùng vào list), hãy đón xem ví dụ <code>mapattrs.py</code> ở Chương 27.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Đảo ngược Dictionary bằng zip() theo ví dụ sách Lutz',
          code: `table = {
    '2024': 'Learning Python, 6th Edition',
    '2013': 'Learning Python, 5th Edition',
    '1999': 'Learning Python'
}

# Đảo ngược: đưa tên sách làm Khóa, năm xuất bản làm Giá trị
inv_table = dict(zip(table.values(), table.keys()))

print("Bảng tra cứu ngược:")
for title, year in inv_table.items():
    print(f"  • '{title}' => {year}")

# Tra cứu O(1) tức thì bằng tên sách
print("\nTra cứu năm của ấn bản đầu:", inv_table['Learning Python'])`,
          output: `Bảng tra cứu ngược:
  • 'Learning Python, 6th Edition' => 2024
  • 'Learning Python, 5th Edition' => 2013
  • 'Learning Python' => 1999

Tra cứu năm của ấn bản đầu: 1999`,
          annotations: [
            { line: 8, text: 'zip(table.values(), table.keys()) hoán đổi vị trí của giá trị thành khóa mới.' },
            { line: 16, text: 'inv_table[\'Learning Python\'] đạt tốc độ tra cứu O(1) tức thì.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào nên dùng Comprehension và khi nào nên Đảo ngược Dictionary?',
        content: '• Nếu bạn chỉ thỉnh thoảng mới cần tra cứu ngược 1–2 lần: hãy dùng List Comprehension trên <code>items()</code> để tránh tốn thêm bộ nhớ RAM.<br>• Nếu bạn phải tra cứu ngược hàng ngàn lần trong vòng lặp: hãy bỏ chi phí bộ nhớ để tạo một <code>reversed_dict</code> trước bằng <code>zip()</code> để hưởng lợi từ tốc độ O(1).'
      }
    ],
    pitfalls: [
      {
        title: 'Giá trị chứa List sẽ gây lỗi TypeError khi đảo ngược!',
        content: 'Nếu dictionary của bạn có giá trị là một list (ví dụ: `{"admin": [1, 2]}`), lệnh `dict(zip(D.values(), D.keys()))` sẽ sụp đổ ngay lập tức với lỗi <code>TypeError: unhashable type: \'list\'</code> vì kiểu list không thể làm khóa của dictionary.'
      }
    ]
  },

  exercises: [
    {
      title: 'Đảo ngược danh bạ số điện thoại và phát hiện trùng lặp',
      level: 'Vừa',
      problem: 'Cho danh bạ phonebook = {"An": "0901", "Bình": "0902", "Cường": "0901"}. Hãy: (1) Dùng List Comprehension tìm tất cả những người dùng chung số điện thoại "0901". (2) Nhận xét điều gì xảy ra nếu cố tình dùng dict(zip(phonebook.values(), phonebook.keys())).',
      hint: 'Dùng [name for name, phone in phonebook.items() if phone == "0901"].',
      solutionCode: `phonebook = {"An": "0901", "Bình": "0902", "Cường": "0901"}

# 1. Tìm tất cả những người dùng số '0901'
users_0901 = [name for name, phone in phonebook.items() if phone == "0901"]
print("Những người dùng số 0901:", users_0901)

# 2. Thử đảo ngược bằng zip
inv_phone = dict(zip(phonebook.values(), phonebook.keys()))
print("Bảng đảo ngược bằng zip: ", inv_phone)
print("Số mục bị mất:", len(phonebook) - len(inv_phone))`,
      solutionOutput: `Những người dùng số 0901: ['An', 'Cường']
Bảng đảo ngược bằng zip:  {'0901': 'Cường', '0902': 'Bình'}
Số mục bị mất: 1`,
      explanation: 'Khi đảo ngược bằng zip, khóa "0901" của Cường xuất hiện sau đã ghi đè lên khóa "0901" của An, làm mất dữ liệu của An! Trong khi đó, comprehension giữ lại trọn vẹn cả hai người.'
    }
  ],

  quiz: [
    {
      question: 'Tại sao việc tìm kiếm ngược từ Giá trị sang Khóa bằng vòng lặp trên items() lại chậm hơn việc tìm từ Khóa sang Giá trị bằng D[key]?',
      options: [
        'Vì items() luôn sắp xếp lại từ điển trước khi duyệt.',
        'Vì tìm từ Khóa dùng Bảng băm O(1), trong khi tìm từ Giá trị bắt buộc phải quét tuyến tính O(N) qua toàn bộ các phần tử.',
        'Vì items() chỉ chạy trên Python 2.',
        'Vì các giá trị bị mã hóa nhị phân.'
      ],
      correctIndex: 1,
      explanation: 'Bảng băm chỉ băm Khóa để tìm ô nhớ tức thì O(1). Giá trị không có chỉ mục băm riêng, nên muốn tìm theo giá trị bắt buộc phải duyệt tuần tự từ đầu đến cuối danh sách (O(N)).'
    },
    {
      question: 'Cú pháp nào sau đây giúp bạn lấy danh sách TẤT CẢ các khóa có giá trị bằng 100 trong dictionary D?',
      options: [
        '[k for k in D if D[k] == 100]',
        'D.keys(100)',
        'D.find(100)',
        'D[100]'
      ],
      correctIndex: 0,
      explanation: 'Biểu thức comprehension [k for k in D if D[k] == 100] quét qua từng khóa k và kiểm tra điều kiện D[k] == 100.'
    }
  ],

  summary: [
    'Dictionary là công cụ lý tưởng để biểu diễn các cơ sở dữ liệu trong bộ nhớ (in-memory database).',
    'Vòng lặp for key in D tự động duyệt qua các khóa nhờ giao thức lặp ngầm định.',
    'Để ánh xạ ngược từ Giá trị sang Khóa, ta sử dụng List Comprehension duyệt qua D.items().',
    'Có thể đảo ngược toàn bộ Dictionary bằng dict(zip(D.values(), D.keys())) nếu các giá trị đều là duy nhất và băm được.',
    'Nếu các giá trị bị trùng lặp, phép đảo ngược bằng zip sẽ làm mất dữ liệu do các khóa trùng nhau bị ghi đè.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.20), chúng ta sẽ khám phá Các mẹo sử dụng Dictionary: mô phỏng List bằng khóa số nguyên, ma trận thưa bằng khóa Tuple và 3 kỹ thuật tránh lỗi thiếu khóa.'
};