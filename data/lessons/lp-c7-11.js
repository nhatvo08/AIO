export default {
  id: 'lp-c7-11',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.11',
  title: '"Thay đổi" chuỗi Phần 2: Phương thức replace() & Tối ưu với list/join',
  subtitle: 'Phương thức replace, tìm kiếm với find/rfind, xâu chuỗi phương thức, chi phí tạo chuỗi trung gian, kỹ thuật explode sang list và implode bằng join()',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo phương thức replace(old, new [, count]) để thay thế toàn bộ hoặc có giới hạn số lần xuất hiện của chuỗi con.',
    'Kết hợp phương thức tìm kiếm vị trí find() và rfind() với phép cắt lát để thay thế chính xác tại vị trí xác định.',
    'Hiểu nguyên lý xâu chuỗi phương thức (method chaining) dựa trên tính bất biến của chuỗi.',
    'Nhận biết nhược điểm hiệu năng khi thay đổi chuỗi lớn: chi phí sao chép đối tượng trung gian liên tiếp.',
    'Làm chủ mẫu thiết kế tối ưu hiệu năng kinh điển trong Python: "bung" chuỗi sang list (explode) để sửa tại chỗ và "gom" lại bằng join() (implode).'
  ],

  intuition: {
    title: 'Tháo dỡ thành từng viên gạch và xây lại bức tường',
    metaphor: 'Nếu bạn có một bức tường gạch dài hàng trăm mét đã được trét xi măng khô cứng (chuỗi bất biến), mỗi lần bạn muốn đổi màu một viên gạch ở giữa bằng toán tử + hay replace(), thợ xây buộc phải đập bỏ toàn bộ bức tường và xây lại một bức tường mới tinh từ đầu đến cuối! Nếu bạn phải thay 1.000 viên gạch, bạn sẽ phải đập đi xây lại bức tường đúng 1.000 lần—vô cùng lãng phí công sức và thời gian. Giải pháp thông minh của các kỹ sư Python là: tháo dỡ toàn bộ bức tường ra thành từng viên gạch xếp rời trên mặt đất (list(S) - explode). Lúc này bạn tha hồ đổi màu từng viên gạch tùy thích tại chỗ (in-place) mà không tốn công xây dựng lại. Khi đã hoàn tất mọi chỉnh sửa, bạn chỉ cần một lượt trét vữa duy nhất (\'\'.join(L) - implode) để ghép các viên gạch thành bức tường mới hoàn chỉnh chỉ trong một bước!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MẪU THIẾT KẾ HIỆU NĂNG CAO: EXPLODE (list) ➔ MUTATE ➔ IMPLODE (join)</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:8px;align-items:center;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">BƯỚC 1: EXPLODE</div>
            <div style="font-weight:700;color:var(--accent-primary);margin-top:2px;">list(S)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">'text' ➔ ['t','e','x','t']</div>
          </div>
          <div style="font-size:1.2rem;color:var(--text-muted);">➔</div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--warning);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">BƯỚC 2: MUTATE</div>
            <div style="font-weight:700;color:var(--warning);margin-top:2px;">L[0] = 'h'</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Sửa tại chỗ trong RAM</div>
          </div>
          <div style="font-size:1.2rem;color:var(--text-muted);">➔</div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">BƯỚC 3: IMPLODE</div>
            <div style="font-weight:700;color:var(--success);margin-top:2px;">''.join(L)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">['h','e','x','!'] ➔ 'hex!'</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phương Thức replace(): Tìm Kiếm và Thay Thế Chuỗi Con',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 25 / 52 – Trang 27 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Để ôn lại, nhằm tạo ra một giá trị văn bản mới từ một chuỗi hiện có, bạn có thể cấu trúc một chuỗi mới bằng các thao tác dãy tuần tự như slice và phép nối chuỗi (ví dụ <code>S[:4] + 'ful' + S[-1]</code>). Nhưng nếu bạn thực sự chỉ muốn thay thế một chuỗi con, bạn có thể dùng <strong>phương thức <code>replace()</code> của chuỗi</strong>:</p>

        <p>Phương thức <code>replace()</code> có tính tổng quát rất cao: nó nhận các đối số gồm chuỗi con ban đầu (có độ dài bất kỳ) và một chuỗi con mới (có độ dài bất kỳ) để thay thế, và thực hiện một thao tác tìm kiếm và thay thế trên toàn bộ chuỗi—với <strong>đối số thứ ba tùy chọn <code>count</code></strong> để giới hạn số lần thay thế được thực hiện:</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng replace() với đối số giới hạn số lần thay thế',
          code: `S = 'textly!'

# Thay thế đơn giản
print("S.replace('ly', 'ful'):", repr(S.replace('ly', 'ful')))

# Giới hạn số lần thay thế với đối số thứ ba count = 2
pattern = '--@--@--@--'
res = pattern.replace('@', 'PY', 2)
print("pattern.replace('@', 'PY', 2):", repr(res))`,
          output: `S.replace('ly', 'ful'): 'textful!'
pattern.replace('@', 'PY', 2): '--PY--PY--@--'`,
          annotations: [
            { line: 4, text: 'replace(\'ly\', \'ful\') tìm và thay thế cụm \'ly\' thành \'ful\'.' },
            { line: 8, text: 'Đối số 2 quy định chỉ thay thế tối đa 2 lần xuất hiện đầu tiên, dấu @ thứ ba được giữ nguyên.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Tìm Kiếm Vị Trí với find()/rfind() & Xâu Chuỗi Phương Thức',
      content: `
        <p>Nếu bạn cần thay thế một chuỗi có kích thước cố định xuất hiện tại một vị trí cụ thể, bạn có thể tìm kiếm vị trí của nó bằng <strong>phương thức <code>find()</code></strong> rồi sau đó thực hiện slice:</p>
        <ul>
          <li><strong>Phương thức <code>find(sub)</code>:</strong> Trả về độ lệch vị trí (offset) đầu tiên nơi chuỗi con xuất hiện, hoặc trả về <code>-1</code> nếu không tìm thấy.</li>
          <li><strong>Phương thức họ hàng <code>rfind(sub)</code>:</strong> Thực hiện tìm kiếm tương tự nhưng theo chiều ngược lại từ phía cuối chuỗi.</li>
        </ul>

        <p>Bởi vì <code>replace()</code> luôn trả về một đối tượng chuỗi mới, chúng ta có thể <strong>xâu chuỗi các lời gọi phương thức liên tiếp (method chaining)</strong> để thay thế nhiều mục tiêu khác nhau trong một biểu thức duy nhất:</p>
      `,
      codeExamples: [
        {
          title: 'Tìm vị trí bằng find() và xâu chuỗi nhiều lời gọi replace()',
          code: `S = 'xxxxPYxxxxPYxxxx'

# 1. Tìm vị trí xuất hiện đầu tiên của 'PY'
where = S.find('PY')
print("Vị trí tìm thấy 'PY':", where)

# Thay thế vị trí đầu tiên bằng slice
replaced_by_slice = S[:where] + 'CODE' + S[(where + 2):]
print("Thay thế bằng slice:", repr(replaced_by_slice))

# 2. Xâu chuỗi nhiều lời gọi replace() liên tiếp
data = 'xxxxWHATxxxxHOWxxxx'
clean_data = data.replace('WHAT', 'CODE').replace('HOW', 'PYTHON')
print("Sau khi xâu chuỗi replace:", repr(clean_data))`,
          output: `Vị trí tìm thấy 'PY': 4
Thay thế bằng slice: 'xxxxCODExxxxPYxxxx'
Sau khi xâu chuỗi replace: 'xxxxCODExxxxPYTHONxxxx'`,
          annotations: [
            { line: 4, text: 'S.find(\'PY\') trả về 4 (vị trí offset xuất hiện đầu tiên).' },
            { line: 8, text: 'Cắt lát trước và sau vị trí tìm thấy để chèn \'CODE\'.' },
            { line: 13, text: 'Lời gọi replace thứ nhất trả về chuỗi mới, lời gọi thứ hai tiếp tục tác động lên chuỗi mới đó.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Tối Ưu Hiệu Năng Chuỗi Lớn: Kỹ Thuật list() và join()',
      content: `
        <p>Việc các thao tác nối chuỗi và phương thức <code>replace()</code> tạo ra các đối tượng chuỗi mới mỗi khi thực thi là một <strong>nhược điểm tiềm tàng về hiệu năng</strong> khi xử lý các chuỗi rất lớn: mỗi kết quả trung gian đều phải tạo ra một đối tượng hoàn chỉnh với một bản sao văn bản mới tinh trong bộ nhớ.</p>

        <p>Nếu bạn phải áp dụng hàng ngàn thay đổi trên một chuỗi văn bản khổng lồ, bạn có thể cải thiện hiệu năng của tập lệnh bằng cách chuyển đổi chuỗi sang một đối tượng có hỗ trợ thay đổi tại chỗ—đó là <strong>danh sách (list)</strong>:</p>
        <ol>
          <li><strong>"Bung" chuỗi (explode):</strong> Gọi hàm <code>list(S)</code> để biến các ký tự của chuỗi thành các phần tử trong một danh sách độc lập.</li>
          <li><strong>Chỉnh sửa tại chỗ:</strong> Tự do gán và sửa đổi các phần tử của danh sách theo chỉ mục (<code>L[0] = 'h'</code>) mà không phải tạo bản sao mới cho mỗi lần sửa.</li>
          <li><strong>"Gom" lại thành chuỗi (implode):</strong> Dùng phương thức <strong><code>join()</code></strong> của chuỗi phân tách rỗng <code>''.join(L)</code> để ghép các ký tự trong danh sách trở lại thành một chuỗi duy nhất chỉ trong một lượt cấp phát bộ nhớ.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Kỹ thuật explode chuỗi sang list và implode bằng join()',
          code: `S = 'text'

# Bước 1: Bung chuỗi thành danh sách (explode)
L = list(S)
print("Danh sách ký tự:", L)

# Bước 2: Thay đổi nhiều ký tự tại chỗ trong list
L[0] = 'h'
L[3] = '!'
print("Sau khi sửa tại chỗ:", L)

# Bước 3: Gom danh sách trở lại thành chuỗi (implode)
S_modified = ''.join(L)
print("Chuỗi kết quả hoàn chỉnh:", repr(S_modified))

# Nối danh sách các từ với ký tự phân tách tùy ý
words = ['which', 'language', 'is', 'best', '?']
joined_words = ' '.join(words)
print("Ghép từ bằng dấu cách:", repr(joined_words))`,
          output: `Danh sách ký tự: ['t', 'e', 'x', 't']
Sau khi sửa tại chỗ: ['h', 'e', 'x', '!']
Chuỗi kết quả hoàn chỉnh: 'hex!'
Ghép từ bằng dấu cách: 'which language is best ?'`,
          annotations: [
            { line: 4, text: 'list(S) tạo danh sách các chuỗi 1 ký tự: [\'t\', \'e\', \'x\', \'t\'].' },
            { line: 8, text: 'L[0] = \'h\' và L[3] = \'!\' sửa đổi trực tiếp mảng con trỏ trong RAM.' },
            { line: 13, text: '\'\'.join(L) ghép các phần tử lại mà không chèn ký tự phân tách.' },
            { line: 18, text: '\' \'.join(words) dùng khoảng trắng làm ký tự phân tách giữa các từ.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Cú pháp của join() thoạt nhìn hơi "ngược ngạo"',
        content: `Phương thức <code>join()</code> có vẻ hơi ngược ngạo khi mới gặp lần đầu: tại sao không viết <code>list.join(sep)</code> mà lại là <code>sep.join(list)</code>? Bởi vì <code>join()</code> là một phương thức của chuỗi (chứ không phải của danh sách), nó được gọi thông qua chuỗi phân tách mong muốn và có thể ghép nối bất kỳ đối tượng lặp (iterable) nào chứa chuỗi (bao gồm tuple, generator, set).`
      }
    ],
    pitfalls: [
      {
        title: 'Đừng quên gán lại khi gọi replace()',
        content: `Một lỗi vô cùng phổ biến: viết <code>S.replace('a', 'b')</code> rồi thắc mắc vì sao <code>S</code> vẫn không đổi! Hãy luôn nhớ: <code>replace()</code> không thay đổi chuỗi tại chỗ. Bạn bắt buộc phải gán lại kết quả: <code>S = S.replace('a', 'b')</code>.`
      }
    ]
  },

  exercises: [
    {
      title: 'Tối ưu hóa việc sửa đổi nhiều ký tự bằng kỹ thuật list/join',
      level: 'Vừa',
      problem: 'Cho chuỗi mã định danh s = "A-000-B-000-C". Hãy chuyển chuỗi này thành list, thay thế toàn bộ các ký tự \'0\' thành \'X\' bằng một vòng lặp trên list, sau đó dùng join() để khôi phục lại thành chuỗi hoàn chỉnh.',
      hint: 'Dùng L = list(s), duyệt enumerate(L), nếu ký tự là \'0\' thì gán L[i] = \'X\', cuối cùng gọi \'\'.join(L).',
      solutionCode: `s = "A-000-B-000-C"

# Chuyển chuỗi sang danh sách
char_list = list(s)

# Thay đổi tại chỗ các ký tự '0' thành 'X'
for idx, ch in enumerate(char_list):
    if ch == '0':
        char_list[idx] = 'X'

# Gom lại thành chuỗi hoàn chỉnh
result = ''.join(char_list)

print("Chuỗi ban đầu:", s)
print("Chuỗi sau khi sửa:", result)`,
      solutionOutput: `Chuỗi ban đầu: A-000-B-000-C
Chuỗi sau khi sửa: A-XXX-B-XXX-C`,
      explanation: 'Việc sửa đổi tại chỗ trên list tránh việc phải tạo nhiều đối tượng chuỗi trung gian, sau đó join() thực hiện ghép nối chỉ trong một lượt phân bổ bộ nhớ duy nhất với hiệu năng tối ưu.'
    }
  ],

  quiz: [
    {
      question: 'Khi gọi S.replace(\'old\', \'new\', 1) trên một chuỗi S có chứa 3 cụm từ \'old\', điều gì sẽ xảy ra?',
      options: [
        'Toàn bộ 3 cụm từ \'old\' đều được thay thế thành \'new\'.',
        'Chỉ có cụm từ \'old\' xuất hiện đầu tiên được thay thế thành \'new\', 2 cụm từ còn lại giữ nguyên.',
        'Python báo lỗi TypeError vì đối số thứ ba không hợp lệ.',
        'Chỉ có cụm từ \'old\' xuất hiện cuối cùng được thay thế.'
      ],
      correctIndex: 1,
      explanation: 'Đối số thứ ba tùy chọn count quy định số lần thay thế tối đa từ trái sang phải. Truyền count = 1 đồng nghĩa với việc chỉ thay thế cụm từ xuất hiện đầu tiên.'
    },
    {
      question: 'Tại sao việc chuyển chuỗi sang list(S) rồi sửa đổi và gọi \'\'.join(L) lại được khuyên dùng khi cần sửa đổi dồn dập trên một chuỗi lớn?',
      options: [
        'Vì chuỗi không thể chứa các ký tự đặc biệt.',
        'Vì list cho phép thay đổi tại chỗ (in-place), tránh chi phí cấp phát và sao chép đối tượng chuỗi trung gian mới cho mỗi lần sửa.',
        'Vì hàm join() tự động nén dung lượng chuỗi xuống một nửa.',
        'Vì list là kiểu dữ liệu có tốc độ tìm kiếm nhanh hơn chuỗi.'
      ],
      correctIndex: 1,
      explanation: 'Do tính bất biến, việc sửa đổi chuỗi liên tục tạo ra hàng loạt đối tượng tạm thời gây áp lực lên bộ nhớ. List cho phép sửa tại chỗ, và join() cấp phát bộ nhớ chuỗi kết quả một lần duy nhất.'
    }
  ],

  summary: [
    'Phương thức replace(old, new [, count]) tìm kiếm và thay thế chuỗi con, hỗ trợ đối số count giới hạn số lần thay thế.',
    'find(sub) trả về vị trí xuất hiện đầu tiên hoặc -1 nếu không tìm thấy; rfind(sub) tìm ngược từ cuối chuỗi.',
    'Method chaining cho phép xâu chuỗi nhiều phương thức liên tiếp (ví dụ .replace().replace()).',
    'Chuỗi bất biến nên replace() luôn trả về chuỗi mới, bắt buộc phải gán lại tên biến nếu muốn lưu kết quả.',
    'Mẫu thiết kế tối ưu chuỗi lớn: list(S) để sửa đổi tại chỗ trong danh sách, sau đó dùng sep.join(L) để gom lại thành chuỗi.'
  ]
};
