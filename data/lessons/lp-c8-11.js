export default {
  id: 'lp-c8-11',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.11',
  title: 'Unpacking hằng số bằng chữ của List (* Unpacking), Câu lệnh del & Bản sao nông copy()',
  subtitle: 'Khám phá cú pháp giải nén dấu sao (*) làm phẳng iterable từ Python 3.5, câu lệnh xóa del và phương thức sao chép cấp ngoài cùng copy()',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo cú pháp Unpacking dấu sao `*` trong hằng số List literal để giải nén và làm phẳng bất kỳ iterable nào.',
    'Thấu suốt góc nhìn thực tế của Mark Lutz: so sánh cú pháp unpacking `*` với phép cộng `+` và phương thức `extend()`.',
    'Sử dụng câu lệnh `del` để tiêu hủy phần tử đơn lẻ hoặc toàn bộ phân đoạn lát cắt của List tại chỗ.',
    'Phân biệt rõ ràng giữa gán lát cắt rỗng `L[0:1] = []` (xóa) và gán chỉ mục `L[0] = []` (nhét list rỗng vào ô 0).',
    'Nắm vững phương thức `L.copy()` để tạo bản sao nông cấp ngoài cùng (top-level copy).'
  ],

  intuition: {
    title: 'Mở gói bưu kiện và Tách đường ray',
    metaphor: 'Hãy tưởng tượng bạn đang đóng một chiếc thùng carton lớn `new_list = [...]`. Nếu bạn đặt nguyên chiếc hộp quà nhỏ `L` vào trong, chiếc hộp nhỏ vẫn giữ nguyên hình dạng bên trong thùng lớn (list lồng list). Nhưng nếu bạn dùng "cây kéo thần kỳ" dấu sao `*L`, bạn đã rạch mở chiếc hộp nhỏ ra, lấy từng món đồ bên trong và xếp phẳng phiu vào thùng lớn (làm phẳng - flatten). Dấu sao có thể rạch mở bất kỳ gói bưu kiện nào (từ list, tuple, chuỗi đến range). Còn câu lệnh `del L[i]` giống như một chiếc xe ủi: nó dọn sạch vật cản tại vị trí bù i rồi kéo các toa xe phía sau lại gần nhau. Cuối cùng, phương thức `L.copy()` giống như việc chụp lại một bức ảnh cấp bề mặt của danh sách, tạo ra một danh sách mới độc lập để bạn thoải mái chỉnh sửa mà không làm hỏng dữ liệu gốc!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SO SÁNH: GÁN LỒNG NHAU VS UNPACKING DẤU SAO (*)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:var(--text-muted);margin-bottom:6px;">1. Gán thông thường: [L, 2, 3]</div>
            <div style="padding:6px;background:var(--bg-surface-alt);border-radius:4px;margin-bottom:6px;">
              <code>[<strong style="color:var(--danger);">['code', 'hack']</strong>, 2, 3]</code>
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Giữ nguyên cấu trúc lồng nhau. L đóng vai trò là một phần tử đơn lẻ ở vị trí bù 0.</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">2. Unpacking dấu sao: [*L, 2, 3]</div>
            <div style="padding:6px;background:var(--bg-surface-alt);border-radius:4px;margin-bottom:6px;">
              <code>[<strong style="color:var(--success);">'code'</strong>, <strong style="color:var(--success);">'hack'</strong>, 2, 3]</code>
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Giải nén và làm phẳng (flatten) từng phần tử bên trong L ra cấp ngoài cùng!</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Unpacking Hằng số bằng chữ của List (* Iterable Unpacking)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 13 / 42 – Trang 14 / 42</strong>.</p>
          </div>
        </div>

        <p>Kể từ Python 3.5, các hằng số bằng chữ (literal) của list hỗ trợ cú pháp dấu sao <strong><code>*</code></strong> đặc biệt giúp <strong>giải nén (unpack)</strong> nội dung của bất kỳ đối tượng có thể lặp (iterable) nào (bao gồm các sequence như list, chuỗi, tuple, và cả range) ở cấp ngoài cùng của list đang được tạo. Hiệu ứng này sẽ làm phẳng (<em>flatten</em>) phần tử có gắn dấu sao trong list mới:</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa cú pháp Unpacking dấu sao (*) trong List Literal',
          code: `L = ['code', 'hack']

# Gán thông thường sẽ tạo sublist lồng nhau
nested_res = [L, 2, 3, L]
print("Gán thông thường [L, 2, 3, L]:", nested_res)

# Dùng dấu sao * để giải nén iterable
flat_res = [*L, 2, 3, *L]
print("Dùng unpacking [*L, 2, 3, *L]:", flat_res)

# Unpacking chuỗi và range
S = 'code'
combo = [*'Py', *S, *range(3)]
print("combo [*'Py', *S, *range(3)]: ", combo)`,
          output: `Gán thông thường [L, 2, 3, L]: [['code', 'hack'], 2, 3, ['code', 'hack']]
Dùng unpacking [*L, 2, 3, *L]: ['code', 'hack', 2, 3, 'code', 'hack']
combo [*'Py', *S, *range(3)]:  ['P', 'y', 'c', 'o', 'd', 'e', 0, 1, 2]`,
          annotations: [
            { line: 4, text: 'Gán bình thường giữ nguyên sublist lồng nhau.' },
            { line: 8, text: '[*L, ...] giải nén \'code\' và \'hack\' ra cấp ngoài cùng.' },
            { line: 13, text: '*\'Py\' rã thành \'P\', \'y\'; *range(3) rã thành 0, 1, 2.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Góc nhìn Tác giả: Unpacking bằng * có Thực sự Cần thiết?',
      content: `
        <div class="callout-box callout-note">
          <div class="callout-header"><span>🧐 Góc nhìn tác giả: Mark Lutz:</span> <span>Sự tiện lợi đặc thù vs Tính đa dụng tổng quát</span></div>
          <div class="callout-body">
            <p>Điều quan trọng, và cũng là chân lý rất thường thấy trong Python hiện nay, là <strong>việc unpacking bằng <code>*</code> không bao giờ là bắt buộc</strong>. Ví dụ, phép ghép nối đơn giản sau đây có cùng hiệu ứng với phép unpacking bằng <code>*</code> đầu tiên ở trên—vốn dư thừa trong trường hợp này:</p>
            <p><code>L + [2, 3] + L  # Điều * unpacking làm với list</code></p>
            <p>Đối với các iterable không phải list, việc unpacking mà không dùng <code>*</code> chỉ đòi hỏi chuyển đổi kiểu vì <code>+</code> yêu cầu list ở cả hai vế: <code>list('Py') + list(S) + list(range(3))</code>. Hoặc dùng vòng lặp <code>extend()</code>: <code>for x in ('Py', S, range(3)): M.extend(x)</code>. Vòng lặp có thể dài dòng hơn một chút, nhưng lại mang tính đa dụng và tổng quát hơn rất nhiều. Người học hãy tự cân nhắc xem liệu các giải pháp thay thế có thực sự kém hơn đến mức cần đến cú pháp đặc thù phức tạp đó hay không.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Các phương án thay thế truyền thống cho cú pháp Unpacking *',
          code: `L = ['code', 'hack']
S = 'code'

# Phương án 1: Dùng phép ghép nối + thuần túy
alt_plus = L + [2, 3] + L
print("Phương án + với list:     ", alt_plus)

# Phương án 2: Chuyển đổi kiểu rồi ghép nối
alt_type = list('Py') + list(S) + list(range(3))
print("Phương án ép kiểu rồi +:   ", alt_type)

# Phương án 3: Dùng vòng lặp for với extend()
M = []
for x in ('Py', S, range(3)):
    M.extend(x)
print("Phương án vòng lặp extend:", M)`,
          output: `Phương án + với list:      ['code', 'hack', 2, 3, 'code', 'hack']
Phương án ép kiểu rồi +:    ['P', 'y', 'c', 'o', 'd', 'e', 0, 1, 2]
Phương án vòng lặp extend: ['P', 'y', 'c', 'o', 'd', 'e', 0, 1, 2]`,
          annotations: [
            { line: 5, text: 'Phép ghép nối + quen thuộc cho kết quả y hệt [*L, 2, 3, *L].' },
            { line: 9, text: 'Ép kiểu tường minh giúp mã rõ nghĩa, không phụ thuộc cú pháp dấu sao đặc thù.' },
            { line: 14, text: 'Vòng lặp duyệt qua tuple các iterable và extend() vào list kết quả.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Câu lệnh del, Bẫy Lát cắt Rỗng & Bản sao Nông copy()',
      content: `
        <p>Bởi vì list mang tính khả biến, bạn cũng có thể sử dụng <strong>câu lệnh <code>del</code></strong> để xóa một phần tử đơn lẻ hoặc toàn bộ một phân đoạn tại chỗ:</p>

        <p><em>Phân biệt bản chất:</em> Như đã đề cập ở bài C8.4, việc gán lát cắt rỗng <code>L[0:1] = []</code> sẽ xóa phần tử tại vị trí 0. Tuy nhiên, việc gán một list rỗng cho một chỉ mục (<code>L[0] = []</code>) <strong>chỉ đơn thuần lưu một tham chiếu tới đối tượng list rỗng vào vị trí được chỉ định, chứ không hề xóa phần tử</strong>!</p>

        <p><strong>Bản sao nông (Top-level Copy) với phương thức copy():</strong><br>
        Phương thức <code>L.copy()</code> tạo ra một bản sao cấp ngoài cùng của list, có hiệu ứng tương tự như <code>L[:]</code> và <code>list(L)</code>. Phương thức này được bổ sung trong Python hiện đại để tạo tính đối xứng nhất quán với các phương thức <code>copy()</code> của <code>dict</code> và <code>set</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa câu lệnh del, bẫy gán chỉ mục list rỗng và phương thức copy()',
          code: `L = ['hack', 'more', 'Py', 'code']

# Xóa một phần tử tại chỗ bằng del
del L[0]
print("Sau del L[0]: ", L)

# Xóa toàn bộ phân đoạn lát cắt bằng del
del L[1:]
print("Sau del L[1:]:", L)

# So sánh: gán lát cắt rỗng vs gán chỉ mục rỗng
test = ['hack', 'more']
test[0:1] = []
print("Gán lát cắt test[0:1] = []:", test)

test[0] = []
print("Gán chỉ mục test[0] = []:  ", test)

# Tạo bản sao nông bằng L.copy()
original = [1, 2, [3, 4]]
shallow_clone = original.copy()
shallow_clone[0] = 999
print("Clone sau sửa: ", shallow_clone)
print("Original không đổi phần tử ngoài:", original)`,
          output: `Sau del L[0]:  ['more', 'Py', 'code']
Sau del L[1:]: ['more']
Gán lát cắt test[0:1] = []: ['more']
Gán chỉ mục test[0] = []:   [[]]
Clone sau sửa:  [999, 2, [3, 4]]
Original không đổi phần tử ngoài: [1, 2, [3, 4]]`,
          annotations: [
            { line: 4, text: 'del L[0] xóa phần tử \'hack\' tại offset 0.' },
            { line: 8, text: 'del L[1:] xóa sạch các phần tử từ offset 1 trở đi.' },
            { line: 13, text: 'test[0:1] = [] xóa phần tử 0.' },
            { line: 16, text: 'test[0] = [] không xóa mà biến phần tử 0 thành sublist rỗng [[]].' },
            { line: 21, text: 'original.copy() tạo bản sao cấp ngoài cùng độc lập.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Ba cách tạo bản sao nông (Shallow Copy) tương đương trong Python',
        content: 'Ba cách sau đây tạo ra bản sao nông hoàn toàn giống nhau:<br>1. <code>clone = L.copy()</code> (hiện đại, đối xứng với dict/set)<br>2. <code>clone = L[:]</code> (kinh điển, ngắn gọn)<br>3. <code>clone = list(L)</code> (tường minh bằng hàm khởi tạo)'
      }
    ],
    pitfalls: [
      {
        title: 'Lời nhắc nhở về ranh giới Khả biến (Mutable) và Bất biến (Immutable)',
        content: 'Tất cả các thao tác thay đổi tại chỗ được thảo luận ở đây (<code>del</code>, <code>append</code>, <code>sort</code>, <code>reverse</code>, gán lát cắt) <strong>chỉ hoạt động đối với các đối tượng khả biến (mutable)</strong>. Chúng sẽ không hoạt động trên chuỗi (str) hoặc tuple (sắp xuất hiện ở Chương 9), cho dù bạn có cố gắng đến mức nào!'
      }
    ]
  },

  exercises: [
    {
      title: 'Tái tạo danh sách phẳng từ các nguồn dữ liệu đa dạng',
      level: 'Vừa',
      problem: 'Cho ba nguồn dữ liệu: a = [10, 20], b = (30, 40) (tuple), và c = range(50, 71, 10). Hãy dùng cú pháp Unpacking dấu sao (*) trong một list literal duy nhất để tạo ra một danh sách phẳng kết hợp cả ba nguồn này: [10, 20, 30, 40, 50, 60, 70].',
      hint: 'Dùng cú pháp [*a, *b, *c].',
      solutionCode: `a = [10, 20]
b = (30, 40)
c = range(50, 71, 10)

# Unpacking kết hợp list, tuple và range
flat_combined = [*a, *b, *c]

print("Danh sách phẳng kết hợp:", flat_combined)
print("Số phần tử:", len(flat_combined))`,
      solutionOutput: `Danh sách phẳng kết hợp: [10, 20, 30, 40, 50, 60, 70]
Số phần tử: 7`,
      explanation: 'Dấu sao * giải nén các phần tử từ list a, tuple b và range c, gom toàn bộ vào một list phẳng duy nhất ở cấp ngoài cùng.'
    }
  ],

  quiz: [
    {
      question: 'Cú pháp [*[1, 2], *[3, 4]] tạo ra kết quả nào trong Python?',
      options: [
        '[[1, 2], [3, 4]]',
        '[1, 2, 3, 4]',
        '([1, 2], [3, 4])',
        'Lỗi SyntaxError vì dấu sao không thể đứng đầu list.'
      ],
      correctIndex: 1,
      explanation: 'Cú pháp * trong list literal giải nén các phần tử của từng list con ra cấp ngoài cùng, tạo thành [1, 2, 3, 4].'
    },
    {
      question: 'Sau khi chạy lệnh: L = ["a", "b"]; L[0] = [], danh sách L sẽ có giá trị là gì?',
      options: [
        '["b"]',
        '[[]]',
        '[[], "b"]',
        '[]'
      ],
      correctIndex: 2,
      explanation: 'Gán chỉ mục L[0] = [] không hề xóa phần tử; nó thay thế phần tử \'a\' bằng một list rỗng [], kết quả thu được là [[], \'b\'].'
    }
  ],

  summary: [
    'Kể từ Python 3.5, dấu sao * trong list literal cho phép giải nén (unpack) bất kỳ iterable nào ra cấp ngoài cùng của list.',
    'Mặc dù cú pháp * rất tiện dụng, các phương án thay thế như phép cộng + hoặc vòng lặp extend() mang tính đa dụng tổng quát hơn.',
    'Câu lệnh del L[i] hoặc del L[i:j] xóa phần tử đơn lẻ hoặc phân đoạn lát cắt tại chỗ mà không trả về giá trị.',
    'Gán lát cắt rỗng L[i:j] = [] sẽ xóa phân đoạn; trong khi gán chỉ mục L[i] = [] chỉ lưu tham chiếu list rỗng vào vị trí bù i.',
    'Phương thức L.copy() tạo bản sao nông cấp ngoài cùng (top-level copy), tương đương L[:] và list(L).',
    'Các thao tác in-place chỉ hoạt động trên các đối tượng khả biến (mutable), không áp dụng được cho chuỗi hay tuple.'
  ],

  nextSteps: 'Chúc mừng bạn đã hoàn thành phần đầu của Chương 8 về List! Trong bài tiếp theo (C8.12), chúng ta sẽ bước sang nửa sau của chương để khám phá cấu trúc dữ liệu Ánh xạ cốt lõi nhất Python: Dictionary.'
};