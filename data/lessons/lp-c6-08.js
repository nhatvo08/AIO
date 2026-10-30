export default {
  id: 'lp-c6-08',
  partId: 'part-lp-c6',
  chapter: 'Chương 6: Khúc đệm về định kiểu động',
  number: 'C6.8',
  title: 'Kỹ thuật Sao chép Đối tượng: Slicing, copy() và Module copy (Shallow vs Deep)',
  subtitle: 'Hóa giải bẫy tham chiếu chia sẻ: các kỹ thuật sao chép độc lập từ cắt lát dãy tuần tự đến sao chép nông và sao chép sâu',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững giải pháp triệt tiêu hiện tượng tham chiếu chia sẻ ngoài ý muốn: tạo bản sao (copy) đối tượng.',
    'Sử dụng thành thạo 3 cách sao chép danh sách: cắt lát toàn bộ L[:], hàm dựng sẵn list(L) và phương thức L.copy().',
    'Biết cách sao chép từ điển (dict) và tập hợp (set) bằng phương thức .copy() và hàm khởi tạo constructor.',
    'Phân biệt bản chất giữa Bản sao nông (Shallow Copy) và Bản sao sâu (Deep Copy) với module thư viện chuẩn copy.'
  ],

  intuition: {
    title: 'Photocopy một bản riêng trước khi ghi chú',
    metaphor: 'Nếu như việc gán L2 = L1 giống như việc chia sẻ cùng một cuốn sổ tay duy nhất, thì thao tác sao chép giống như việc bạn mang cuốn sổ đó đi photocopy ra một bản thứ hai đặt vào một ngăn bàn khác. Bây giờ bạn có hai cuốn sổ hoàn toàn tách biệt. Bạn có thể thoải mái dùng bút đỏ gạch xóa, viết đè lên cuốn sổ thứ nhất (L1[0] = 24) mà cuốn sổ thứ hai (L2) vẫn giữ nguyên nét chữ ban đầu. Tuy nhiên, nếu bên trong cuốn sổ có dán các chiếc phong bì chứa tài liệu con (cấu trúc lồng nhau), việc photocopy thông thường chỉ chụp lại cái phong bì chứ không nhân đôi ruột tài liệu bên trong (Bản sao nông). Để nhân đôi toàn bộ từ vỏ đến ruột, bạn cần một cỗ máy photocopy xuyên thấu (Bản sao sâu - Deep Copy).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SAO CHÉP DANH SÁCH BẰNG CẮT LÁT L1[:]: HAI ĐỐI TƯỢNG ĐỘC LẬP</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <!-- Đối tượng 1 của L1 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <span style="padding:4px 10px;background:#bae6fd;border:1px solid #0284c7;border-radius:10px;color:#0369a1;font-weight:700;">L1</span>
              <span style="color:var(--accent-primary);">─── trỏ ───►</span>
              <span style="font-weight:700;color:#0284c7;">Đối tượng List #1 (RAM)</span>
            </div>
            <div style="font-family:var(--font-mono);padding:8px;background:var(--bg-surface-alt);border-radius:6px;">
              [<span style="color:var(--danger);font-weight:700;">24</span>, 3, 4]
            </div>
            <div style="font-size:0.75rem;color:var(--danger);margin-top:6px;">Bị L1[0] = 24 sửa đổi tại chỗ</div>
          </div>

          <!-- Đối tượng 2 của L2 -->
          <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <span style="padding:4px 10px;background:#bae6fd;border:1px solid #0284c7;border-radius:10px;color:#0369a1;font-weight:700;">L2</span>
              <span style="color:var(--accent-primary);">─── trỏ ───►</span>
              <span style="font-weight:700;color:var(--success);">Đối tượng List #2 (Bản sao)</span>
            </div>
            <div style="font-family:var(--font-mono);padding:8px;background:var(--bg-surface-alt);border-radius:6px;">
              [<span style="color:var(--success);font-weight:700;">2</span>, 3, 4]
            </div>
            <div style="font-size:0.75rem;color:var(--success);margin-top:6px;">Giữ nguyên vẹn, không bị ảnh hưởng!</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Sao chép Danh sách để Ngăn ngừa Hiện tượng Chia sẻ',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 6: Khúc đệm về định kiểu động • <strong>PDF Trang 10 / 17</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Như chúng ta đã thấy ở bài học trước, hiện tượng chia sẻ tham chiếu là hành vi mặc định trong Python. Nếu bạn không muốn hiện tượng chia sẻ này xảy ra, bạn hoàn toàn có thể yêu cầu Python <strong>sao chép (copy) đối tượng</strong> thay vì tạo thêm một tham chiếu cùng trỏ tới nó.</p>

        <p>Có rất nhiều cách để sao chép một danh sách list trong Python:</p>
        <ul>
          <li>Sử dụng toán tử cắt lát từ đầu đến cuối: <code>L2 = L1[:]</code>.</li>
          <li>Sử dụng hàm dựng sẵn: <code>L2 = list(L1)</code>.</li>
          <li>Sử dụng phương thức dựng sẵn của danh sách: <code>L2 = L1.copy()</code>.</li>
          <li>Sử dụng module <code>copy</code> trong thư viện tiêu chuẩn.</li>
        </ul>

        <p>Cách làm phổ biến và kinh điển nhất trong các đoạn mã Python truyền thống có lẽ là <strong>trích xuất một lát cắt (slice) từ đầu đến cuối danh sách</strong>:</p>
      `,
      codeExamples: [
        {
          title: 'Sao chép danh sách bằng biểu thức cắt lát L1[:]',
          code: `>>> L1 = [2, 3, 4]
>>> L2 = L1[:]       # Tạo bản sao của L1 (hoặc list(L1), L1.copy(), v.v.)
>>> L1[0] = 24
>>> L1
[24, 3, 4]
>>> L2               # L2 không đổi lần này: hai đối tượng khác nhau
[2, 3, 4]`,
          output: `[24, 3, 4]
[2, 3, 4]`,
          annotations: [
            { line: 2, text: 'Biểu thức L1[:] tạo ra một đối tượng danh sách mới hoàn toàn với các phần tử sao chép từ L1.' },
            { line: 3, text: 'Thay đổi L1[0] chỉ tác động lên đối tượng List #1 của L1.' },
            { line: 6, text: 'L2 vẫn trỏ tới đối tượng List #2 riêng biệt, bảo toàn giá trị ban đầu [2, 3, 4].' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Sao chép Đối tượng Từ điển (dict) và Tập hợp (set)',
      content: `
        <p>Ở đây, thay đổi được thực hiện thông qua <code>L1</code> không hề phản chiếu sang <code>L2</code> bởi vì <code>L2</code> đang tham chiếu tới một bản sao của đối tượng mà <code>L1</code> tham chiếu, chứ không phải đối tượng gốc ban đầu; nghĩa là, <strong>hai biến trỏ tới hai đối tượng riêng biệt nằm ở hai vùng không gian bộ nhớ khác nhau</strong>.</p>

        <p><strong>Lưu ý quan trọng:</strong> Kỹ thuật cắt lát (slicing) này sẽ <strong>không áp dụng được</strong> cho các kiểu cốt lõi khả biến chủ đạo khác là từ điển (<code>dict</code>) và tập hợp (<code>set</code>), bởi vì chúng không phải là các dãy tuần tự (sequences)—chúng không có vị trí chỉ mục số 0, 1, 2...</p>

        <p>Để sao chép một từ điển hoặc tập hợp, thay vào đó bạn hãy:</p>
        <ul>
          <li>Sử dụng lời gọi phương thức <code>X.copy()</code> của chúng (danh sách list cũng có phương thức này).</li>
          <li>Hoặc truyền đối tượng gốc vào hàm khởi tạo kiểu dữ liệu: <code>dict(X)</code> và <code>set(X)</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sao chép từ điển và tập hợp bằng phương thức .copy()',
          code: `>>> d1 = {'a': 1, 'b': 2}
>>> d2 = d1.copy()         # Tạo bản sao riêng biệt của từ điển
>>> d1['a'] = 99
>>> d1
{'a': 99, 'b': 2}
>>> d2
{'a': 1, 'b': 2}

>>> s1 = {1, 2, 3}
>>> s2 = s1.copy()         # Tạo bản sao riêng biệt của tập hợp
>>> s1.add(100)
>>> s2
{1, 2, 3}`,
          output: `{'a': 99, 'b': 2}
{'a': 1, 'b': 2}
{1, 2, 3}`,
          annotations: [
            { line: 2, text: 'd1.copy() tạo đối tượng dict mới độc lập.' },
            { line: 10, text: 's1.copy() tạo đối tượng set mới độc lập.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phân biệt Bản sao Nông (Shallow) vs Bản sao Sâu (Deep) với Module copy',
      content: `
        <p>Ngoài ra, xin lưu ý rằng module <code>copy</code> trong thư viện tiêu chuẩn có hàm cho phép sao chép khái quát bất kỳ kiểu đối tượng nào, cũng như hàm sao chép các cấu trúc đối tượng lồng nhau—chẳng hạn như một từ điển chứa các danh sách lồng bên trong:</p>
      `,
      codeExamples: [
        {
          title: 'Sử dụng copy.copy() và copy.deepcopy() cho cấu trúc lồng nhau',
          code: `import copy
X = copy.copy(Y)       # Bản sao nông (shallow copy): chỉ sao chép cấp cao nhất
X = copy.deepcopy(Y)   # Bản sao sâu (deep copy): sao chép mọi phần tử lồng nhau`,
          output: ``,
          annotations: [
            { line: 2, text: 'Bản sao nông (shallow): chỉ nhân đôi cấu trúc ngoài cùng; các phần tử con lồng bên trong vẫn bị chia sẻ tham chiếu!' },
            { line: 3, text: 'Bản sao sâu (deep): đệ quy duyệt qua toàn bộ cấu trúc và nhân đôi tất cả các đối tượng con ở mọi tầng lồng nhau.' }
          ]
        },
        {
          title: 'Minh họa thực tế sự khác biệt giữa copy nông và copy sâu',
          code: `import copy

goc = [1, [2, 3]]
ban_sao_nong = copy.copy(goc)
ban_sao_sau = copy.deepcopy(goc)

# Thay đổi phần tử lồng bên trong danh sách gốc
goc[1][0] = 'X'

print("Gốc:", goc)
print("Bản sao nông (bị ảnh hưởng phần tử lồng!):", ban_sao_nong)
print("Bản sao sâu (hoàn toàn nguyên vẹn!):", ban_sao_sau)`,
          output: `Gốc: [1, ['X', 3]]
Bản sao nông (bị ảnh hưởng phần tử lồng!): [1, ['X', 3]]
Bản sao sâu (hoàn toàn nguyên vẹn!): [1, [2, 3]]`,
          annotations: [
            { line: 8, text: 'Thay đổi phần tử bên trong danh sách con [2, 3].' },
            { line: 11, text: 'Bản sao nông vẫn chia sẻ tham chiếu tới danh sách con nên bị đổi thành \'X\'.' },
            { line: 12, text: 'Bản sao sâu đã nhân đôi cả danh sách con nên hoàn toàn giữ nguyên [2, 3]!' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Tóm tắt Nguyên tắc Ứng xử với Đối tượng Khả biến',
      content: `
        <p>Chúng ta sẽ khám phá danh sách và từ điển chuyên sâu hơn, cũng như xem xét lại khái niệm tham chiếu chia sẻ và bản sao trong Chương 8 và Chương 9. Còn bây giờ, hãy luôn ghi nhớ rằng:</p>
        <ul>
          <li>Các đối tượng có thể thay đổi tại chỗ—tức là các <strong>đối tượng khả biến (mutable)</strong>—luôn luôn chịu ảnh hưởng của những hiệu ứng loại này trong bất kỳ đoạn mã nào mà chúng đi qua.</li>
          <li>Trong Python, nhóm đối tượng này bao gồm <code>list</code>, <code>dict</code>, <code>set</code>, và một số đối tượng thể hiện được định nghĩa thông qua câu lệnh <code>class</code>.</li>
          <li>Nếu đây không phải là hành vi mong muốn trong bài toán của bạn, hãy đơn giản là <strong>tạo bản sao cho các đối tượng khi cần thiết</strong>.</li>
        </ul>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào cần dùng deepcopy?',
        content: 'Chỉ nên dùng <code>copy.deepcopy()</code> khi bạn thực sự làm việc với các cấu trúc dữ liệu lồng nhau phức tạp (như mảng 2 chiều, cây JSON, từ điển chứa danh sách đối tượng). Do deepcopy phải duyệt đệ quy và theo dõi bảng đồ thị để tránh vòng lặp, chi phí hiệu năng và bộ nhớ của nó cao hơn đáng kể so với sao chép nông bằng <code>[:]</code> hoặc <code>.copy()</code>.'
      }
    ]
  },

  exercises: [
    {
      level: 'Trung bình',
      title: 'Xử lý sao chép ma trận 2 chiều',
      problem: 'Cho ma trận <code>matrix = [[1, 2], [3, 4]]</code>. Nếu bạn dùng lệnh <code>matrix_copy = matrix[:]</code>, sau đó thực hiện <code>matrix[0][0] = 99</code>, thì <code>matrix_copy[0][0]</code> sẽ có giá trị là bao nhiêu? Làm thế nào để sửa đúng?',
      hint: 'Cắt lát [:] chỉ là bản sao nông (shallow copy). Hãy dùng module nào để sao chép sâu?',
      solutionCode: `import copy

matrix = [[1, 2], [3, 4]]

# Sao chép nông bằng [:]
shallow = matrix[:]
# Sao chép sâu đúng cách
deep = copy.deepcopy(matrix)

matrix[0][0] = 99
print("matrix[0][0] =", matrix[0][0])
print("shallow[0][0] =", shallow[0][0], "(Bị đổi ngầm!)")
print("deep[0][0] =", deep[0][0], "(Được bảo vệ hoàn toàn!)")`,
      solutionOutput: `matrix[0][0] = 99
shallow[0][0] = 99 (Bị đổi ngầm!)
deep[0][0] = 1 (Được bảo vệ hoàn toàn!)`,
      explanation: 'Vì matrix là danh sách lồng nhau (ma trận 2D), cắt lát matrix[:] chỉ nhân đôi danh sách ngoài cùng nhưng vẫn chia sẻ tham chiếu tới các hàng con [1, 2]. Để tạo bản sao độc lập hoàn toàn cho cấu trúc lồng nhau, bắt buộc phải dùng copy.deepcopy().'
    }
  ],

  quiz: [
    {
      question: 'Tại sao cú pháp cắt lát [:] không thể dùng để sao chép đối tượng từ điển (dict) hay tập hợp (set)?',
      options: [
        'Vì từ điển và tập hợp không phải là các kiểu dãy tuần tự (sequences) có chỉ mục thứ tự.',
        'Vì module copy đã cấm dùng dấu hai chấm trong từ điển.',
        'Vì từ điển luôn luôn là kiểu dữ liệu bất biến không thể sao chép.',
        'Vì tập hợp chỉ hỗ trợ sao chép qua giao thức mạng.'
      ],
      correctIndex: 0,
      explanation: 'Toán tử cắt lát [:] chỉ áp dụng cho các kiểu dãy tuần tự (sequences) có chỉ mục (như str, list, tuple). Dict và set không có thứ tự chỉ mục, nên phải dùng phương thức .copy() hoặc hàm khởi tạo dict() / set().'
    },
    {
      question: 'Sự khác biệt cốt lõi giữa copy.copy() (bản sao nông) và copy.deepcopy() (bản sao sâu) là gì?',
      options: [
        'copy() chỉ sao chép được số nguyên, deepcopy() sao chép được chuỗi.',
        'copy() sao chép cấp ngoài cùng (phần tử lồng vẫn bị chia sẻ); deepcopy() đệ quy sao chép mọi phần tử con lồng nhau.',
        'copy() chạy chậm hơn deepcopy() 10 lần.',
        'deepcopy() chỉ dùng được trong môi trường điện toán đám mây.'
      ],
      correctIndex: 1,
      explanation: 'Bản sao nông (shallow copy) chỉ sao chép cấu trúc ở cấp cao nhất, các phần tử lồng bên trong vẫn là tham chiếu chia sẻ; trong khi bản sao sâu (deep copy) sao chép đệ quy mọi đối tượng con lồng nhau tạo thành bản sao hoàn toàn độc lập.'
    }
  ],

  summary: [
    'Sao chép đối tượng là giải pháp triệt để ngăn ngừa các tác dụng phụ của tham chiếu chia sẻ.',
    'Danh sách list có thể sao chép bằng cắt lát L[:], constructor list(L) hoặc phương thức L.copy().',
    'Từ điển và tập hợp sao chép bằng phương thức .copy() hoặc constructor dict() / set().',
    'Bản sao nông (shallow copy) chỉ nhân đôi cấp ngoài cùng; phần tử con lồng bên trong vẫn bị chia sẻ.',
    'Bản sao sâu (deep copy) với module copy sao chép độc lập toàn bộ các tầng cấu trúc lồng nhau.'
  ]
};
