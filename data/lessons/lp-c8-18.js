export default {
  id: 'lp-c8-18',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.18',
  title: 'Thứ tự chèn khóa, Ngăn xếp LIFO với popitem(), Toán tử Hợp (| và |=) & Triết lý ngôn ngữ Mark Lutz',
  subtitle: 'Khám phá hành vi Thứ tự chèn của Dictionary, mô hình ngăn xếp LIFO với popitem(), toán tử hợp nhất từ Python 3.9+ và thảo luận của Mark Lutz về sự phình to tính năng',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu sâu cơ chế duy trì Thứ tự chèn (Insertion Order) của Dictionary: các thao tác nào làm thay đổi và không làm thay đổi thứ tự khóa.',
    'Sử dụng phương thức `popitem()` để xóa và nhận về cặp `(khóa, giá trị)` cuối cùng theo thứ tự LIFO.',
    'Thành thạo toán tử hợp nhất Dictionary `|` (trả về dict mới) và toán tử gán tại chỗ `|=` được bổ sung từ Python 3.9+.',
    'Hiểu phân tích phê bình của Mark Lutz về sự dư thừa tính năng (3 cách hợp nhất dict: `update`, `**`, `|`).'
  ],

  intuition: {
    title: 'Quy tắc xếp hàng điểm danh và Phép sáp nhập hai công ty',
    metaphor: 'Kể từ Python 3.7, Dictionary không còn là một đám đông hỗn loạn như trước; nó giống như một hàng người nghiêm túc xếp hàng điểm danh theo thời gian đến: ai đến trước đứng trước, ai đến sau đứng ở cuối hàng. Nếu một người đã đứng trong hàng đổi chiếc áo mới (sửa giá trị `D[k] = new_val`), vị trí đứng của anh ta không hề suy chuyển. Nhưng nếu anh ta rời hàng rồi xếp hàng lại (bị `pop` rồi gán lại), anh ta bắt buộc phải xuống đứng ở cuối hàng! Phương thức `popitem()` giống như việc mời người đứng cuối hàng bước ra khỏi hàng. Còn toán tử hợp `D1 | D2` giống như việc sáp nhập hai công ty để thành lập một công ty hoàn toàn mới thứ ba, với quy định ai thuộc công ty thứ hai sẽ được ưu tiên giữ chức vụ nếu xảy ra trùng lặp tên phòng ban!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH THỨ TỰ CHÈN VÀ TOÁN TỬ HỢP DICTIONARY (|)</div>
        <div style="display:flex;justify-content:center;gap:8px;align-items:center;flex-wrap:wrap;font-size:0.92rem;">
          <span style="padding:6px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">{'a': 1, 'b': 2}</span>
          <span style="font-weight:700;color:var(--accent-primary);font-size:1.2rem;">|</span>
          <span style="padding:6px 12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:4px;">{'b': 3, 'c': 4}</span>
          <span style="font-weight:700;color:var(--success);font-size:1.2rem;">➔</span>
          <span style="padding:6px 12px;background:rgba(16,185,129,0.15);border:2px solid #10b981;border-radius:4px;font-weight:700;color:#10b981;">{'a': 1, 'b': 3, 'c': 4}</span>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">
          Toán tử | tạo Dictionary mới • Khóa trùng 'b': 3 từ vế phải chiến thắng • Thứ tự chèn được bảo toàn
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bản chất Thứ tự Chèn Khóa và Phương thức popitem()',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 26 / 42</strong>.</p>
          </div>
        </div>

        <p>Đến đây, bạn đã nhận thấy rằng dictionary ghi nhớ thứ tự các khóa của chúng—bất kể chúng ta sử dụng loại cú pháp nào để tạo ra chúng. Kể từ Python 3.7 (và CPython 3.6), dictionary đã loại bỏ thứ tự khóa ngẫu nhiên trước đây và chuyển sang áp dụng <strong>thứ tự chèn (insertion order)</strong>:</p>

        <ul>
          <li>Các khóa được sắp xếp từ trái sang phải từ phần tử được thêm sớm nhất đến mới nhất.</li>
          <li>Thứ tự này được duy trì đối với các literal, các lệnh gọi <code>dict()</code>, comprehension, và các khóa mới được thêm vào linh hoạt.</li>
          <li><strong>Thay đổi giá trị không làm đổi thứ tự:</strong> Phép gán <code>D['c'] = 0</code> chỉ sửa giá trị, vị trí của khóa <code>'c'</code> vẫn giữ nguyên.</li>
          <li><strong>Xóa rồi thêm lại sẽ chuyển xuống cuối:</strong> Nếu bạn xóa khóa bằng <code>pop()</code> rồi gán lại, khóa đó sẽ được coi là mới và xuất hiện ở cuối danh sách khóa.</li>
        </ul>

        <p><strong>Cấu trúc LIFO với phương thức popitem():</strong><br>
        Thứ tự chèn của dictionary rất giống với thứ tự ngăn xếp LIFO mà chúng ta đã làm việc với <code>append()</code> và <code>pop()</code> của list trước đây. Phương thức <strong><code>D.popitem()</code></strong> được định nghĩa để xóa và trả về cặp <code>(khóa, giá trị)</code> (dưới dạng một tuple) cho khóa được thêm vào gần đây nhất (tức là ở cuối bảng):</p>
      `,
      codeExamples: [
        {
          title: 'Khảo sát hành vi của Thứ tự Chèn và phương thức popitem()',
          code: `D = dict(a=1, b=2)
D['c'] = 3                  # Khóa mới 'c' luôn vào cuối
print("Ban đầu:            ", D)

D.pop('b')                  # Xóa khóa 'b'
print("Sau khi xóa 'b':    ", D)

D['b'] = 2                  # Thêm lại 'b' ➔ chuyển xuống cuối!
print("Sau khi thêm lại 'b':", D)

D['c'] = 0                  # Thay đổi giá trị ➔ không ảnh hưởng thứ tự!
D['d'] = 1                  # Khóa mới 'd' vào cuối
print("Sau khi sửa 'c' & thêm 'd':", D)

# popitem() lấy cặp khóa/giá trị cuối cùng (LIFO)
last_pair = D.popitem()
print("\nD.popitem() trả về: ", last_pair)
print("Dictionary còn lại:  ", D)`,
          output: `Ban đầu:             {'a': 1, 'b': 2, 'c': 3}
Sau khi xóa 'b':     {'a': 1, 'c': 3}
Sau khi thêm lại 'b': {'a': 1, 'c': 3, 'b': 2}
Sau khi sửa 'c' & thêm 'd': {'a': 1, 'c': 0, 'b': 2, 'd': 1}

D.popitem() trả về:  ('d', 1)
Dictionary còn lại:   {'a': 1, 'c': 0, 'b': 2}`,
          annotations: [
            { line: 7, text: 'Khóa \'b\' khi được thêm lại sẽ đứng sau \'c\'.' },
            { line: 10, text: 'Sửa D[\'c\'] = 0 giữ nguyên vị trí thứ hai của \'c\'.' },
            { line: 15, text: 'D.popitem() xóa và trả về tuple (\'d\', 1) nằm ở cuối cùng.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Toán tử Hợp của Dictionary (| và |= từ Python 3.9+)',
      content: `
        <p>Kể từ Python 3.9, dictionary đã nảy sinh một thao tác "hợp" (union) được kích hoạt bằng <strong>toán tử <code>|</code></strong>—cùng một ký hiệu được sử dụng cho phép hợp trong các đối tượng tập hợp (set):</p>

        <ul>
          <li><strong>Toán tử <code>D1 | D2</code>:</strong> Thực hiện phép hợp nhất dựa trên khóa có tính nhạy cảm về vị trí. Nó hoạt động tương tự như phương thức <code>update()</code> nhưng <strong>trả về kết quả là một dictionary mới</strong> thay vì cập nhật trực tiếp tại chỗ đối tượng mục tiêu.</li>
          <li><strong>Quy tắc giải quyết xung đột:</strong> Khóa ở vế bên phải sẽ chiến thắng (ghi đè lên giá trị của khóa bên trái nếu trùng lặp).</li>
          <li><strong>Toán tử gán tại chỗ <code>D1 |= D2</code>:</strong> Cập nhật trực tiếp <code>D2</code> vào <code>D1</code> tại chỗ, hoàn toàn giống hệt với việc gọi <code>D1.update(D2)</code> mà không cần tạo bản sao.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng toán tử hợp | và so sánh với copy() + update()',
          code: `D = dict(a=1, b=2)
print("D ban đầu:", D)

# Toán tử hợp | trả về dict mới, vế phải thắng khi trùng khóa 'b'
merged = D | {'b': 3, 'c': 4}
print("D | {'b': 3, 'c': 4}:", merged)
print("D gốc không đổi:      ", D)

# Xâu chuỗi nhiều toán tử hợp liên tiếp
chain_merged = D | {'b': 3, 'c': 4} | dict(a=5, d=6)
print("Xâu chuỗi 3 dict:     ", chain_merged)

# Tương đương truyền thống bằng copy() + update()
C = D.copy()
C.update({'b': 3, 'c': 4})
print("Dùng copy() + update():", C)`,
          output: `D ban đầu: {'a': 1, 'b': 2}
D | {'b': 3, 'c': 4}: {'a': 1, 'b': 3, 'c': 4}
D gốc không đổi:       {'a': 1, 'b': 2}
Xâu chuỗi 3 dict:      {'a': 5, 'b': 3, 'c': 4, 'd': 6}
Dùng copy() + update(): {'a': 1, 'b': 3, 'c': 4}`,
          annotations: [
            { line: 5, text: 'D | {...} tạo một dict mới độc lập, giá trị \'b\': 3 ghi đè \'b\': 2.' },
            { line: 9, text: 'Xâu chuỗi nhiều toán tử | từ trái sang phải, \'a\': 5 ở dict cuối cùng thắng.' },
            { line: 15, text: 'copy() kết hợp update() cho kết quả tương đương nhưng dài dòng hơn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Triết lý Thiết kế Ngôn ngữ: Góc nhìn Phê bình của Mark Lutz',
      content: `
        <div class="callout-box callout-note">
          <div class="callout-header"><span>🧐 Góc nhìn tác giả: Mark Lutz:</span> <span>Tranh luận về sự phình to tính năng trong Python</span></div>
          <div class="callout-body">
            <p>Tác giả Mark Lutz đưa ra một câu đố triết học sâu sắc ở cuối trang 27 – trang 28 của giáo trình:</p>
            <p><em>"Điều này—những người hâm mộ đích thực sẽ nhận thấy—làm tăng số lượng các thao tác hợp nhất dictionary chuyên dụng từ một lên ba: (1) Phương thức <code>update()</code>, (2) Cú pháp unpacking <code>{**D1, **D2}</code> trong Python 3.5, và (3) Toán tử <code>|</code> trong Python 3.9.<br><br>
            Tại sao người ta lại cho là đáng để làm nặng Python với hai thao tác mới và dư thừa cho việc hợp nhất dictionary, lại còn là hai thao tác có những khác biệt phức tạp và tinh vi, là một câu hỏi lớn hơn. Và tại sao việc mở rộng dictionary chỉ với một toán tử nhị phân duy nhất, chỉ một trong số rất nhiều thao tác tập hợp, và một thao tác gần như hoàn toàn dư thừa với hai công cụ trước đó vốn đã gần như hoàn toàn dư thừa với đoạn mã rất đơn giản, lại là điều hợp lý, là một câu đố dành riêng cho độc giả tự giải đáp."</em></p>
          </div>
        </div>

        <p>Lời nhắc nhở này giúp bạn hiểu rằng: dù Python liên tục bổ sung cú pháp mới qua các phiên bản, việc nắm vững bản chất cốt lõi (như <code>update()</code> và vòng lặp) luôn là nền tảng vững vàng nhất giúp bạn viết mã nguồn bền vững với thời gian.</p>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Thứ tự chèn không thay thế việc sắp xếp khóa theo giá trị',
        content: 'Mặc dù thứ tự chèn giúp dữ liệu hiển thị mạch lạc, hãy nhớ rằng bạn vẫn có thể cần phải sắp xếp các khóa của dictionary theo cách thủ công khi yêu cầu đòi hỏi (ví dụ: sắp xếp tên tệp theo bảng chữ cái A-Z thay vì theo thời gian đọc tệp).'
      }
    ],
    pitfalls: [
      {
        title: 'Đừng nhầm lẫn toán tử | của Dictionary với toán tử | của Set',
        content: 'Khi chạy trên hai Dictionary (<code>D1 | D2</code>), toán tử <code>|</code> là một phép hợp nhất có thứ tự và nhạy cảm vị trí (vế phải thắng). Nó không phải là phép hợp tập hợp toán học vô trật tự như trên Set.'
      }
    ]
  },

  exercises: [
    {
      title: 'Hợp nhất cấu hình mặc định và cấu hình người dùng bằng toán tử |',
      level: 'Dễ',
      problem: 'Cho cấu hình mặc định default_cfg = {"theme": "light", "font_size": 14, "auto_save": True} và cấu hình người dùng user_cfg = {"theme": "dark", "font_size": 16}. Hãy dùng toán tử | để tạo cấu hình chung cuộc final_cfg sao cho các thiết lập của người dùng ghi đè lên cấu hình mặc định.',
      hint: 'Dùng cú pháp default_cfg | user_cfg (user_cfg ở bên phải).',
      solutionCode: `default_cfg = {"theme": "light", "font_size": 14, "auto_save": True}
user_cfg = {"theme": "dark", "font_size": 16}

# Hợp nhất: user_cfg ghi đè default_cfg
final_cfg = default_cfg | user_cfg

print("Cấu hình hoàn chỉnh:")
print(final_cfg)`,
      solutionOutput: `Cấu hình hoàn chỉnh:
{'theme': 'dark', 'font_size': 16, 'auto_save': True}`,
      explanation: 'Toán tử | tạo dict mới giữ lại auto_save: True từ default_cfg, đồng thời ghi đè theme thành "dark" và font_size thành 16 từ user_cfg.'
    }
  ],

  quiz: [
    {
      question: 'Trong Python 3.9+, kết quả của biểu thức {"x": 1} | {"x": 2, "y": 3} là gì?',
      options: [
        '{"x": 1, "y": 3}',
        '{"x": 2, "y": 3}',
        'Lỗi TypeError vì không thể dùng toán tử | trên dictionary.',
        '{"x": [1, 2], "y": 3}'
      ],
      correctIndex: 1,
      explanation: 'Toán tử | của dictionary trả về dict mới và áp dụng nguyên tắc giá trị ở vế bên phải sẽ chiến thắng khi có xung đột khóa, tạo ra {"x": 2, "y": 3}.'
    },
    {
      question: 'Phương thức D.popitem() trên Dictionary thực hiện hành vi nào sau đây?',
      options: [
        'Xóa và trả về phần tử đầu tiên của dictionary (FIFO).',
        'Xóa và trả về cặp (khóa, giá trị) được thêm vào gần đây nhất ở cuối dictionary (LIFO).',
        'Xóa ngẫu nhiên một phần tử trong bảng băm.',
        'Xóa toàn bộ các phần tử của dictionary.'
      ],
      correctIndex: 1,
      explanation: 'popitem() tuân theo mô hình LIFO: xóa và trả về cặp (key, value) ở cuối cùng của dictionary (được thêm vào gần đây nhất).'
    }
  ],

  summary: [
    'Dictionary duy trì thứ tự chèn (insertion order) của các khóa từ Python 3.7+.',
    'Sửa giá trị khóa hiện có không làm thay đổi vị trí của khóa; xóa rồi thêm lại sẽ đẩy khóa xuống cuối danh sách.',
    'Phương thức popitem() xóa và trả về cặp (key, value) cuối cùng theo nguyên tắc ngăn xếp LIFO.',
    'Toán tử hợp | (từ Python 3.9) tạo ra dictionary mới bằng cách hợp nhất hai dict, vế phải thắng khi trùng khóa.',
    'Toán tử gán |= cập nhật tại chỗ, tương đương phương thức update().',
    'Mark Lutz nhấn mạnh sự tồn tại song song của 3 cách hợp nhất dict (update, **, |) phản ánh sự phình to tính năng qua các thế hệ Python.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.19), chúng ta sẽ bước vào phần Thực hành: Xây dựng cơ sở dữ liệu sách, Kỹ thuật ánh xạ ngược từ Giá trị sang Khóa và Đảo ngược Dictionary.'
};