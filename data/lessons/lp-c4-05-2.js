export default {
  id: 'lp-c4-05-2',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.5.2',
  title: 'Chuỗi ký tự: Tính bất biến (Immutability)',
  subtitle: 'Bản chất không thể thay đổi tại chỗ, phân loại Bất biến vs Khả biến, kỹ thuật sửa chuỗi và đối tượng bytearray',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu thấu suốt khái niệm Tính bất biến (Immutability): chuỗi không thể bị sửa đổi tại chỗ sau khi tạo.',
    'Quan sát lỗi TypeError khi cố tình gán vào chỉ mục và kỹ thuật tạo chuỗi mới thay thế.',
    'Nắm vững phân loại 2 nhóm đối tượng lớn trong Python: Bất biến (Immutable) vs Khả biến (Mutable).',
    'Thực hành 2 cách sửa đổi văn bản: bung thành danh sách ký tự với join() và sử dụng đối tượng lai bytearray.'
  ],

  intuition: {
    title: 'Tờ tiền giấy được niêm phong và chiếc bảng xóa',
    metaphor: 'Một đối tượng bất biến (như chuỗi hay số) giống như một tờ tiền giấy polymer có in mệnh giá và số seri: bạn không thể lấy bút tẩy xóa mệnh giá của nó để biến tờ 10 nghìn thành tờ 50 nghìn được (nếu làm vậy máy sẽ báo lỗi vi phạm). Muốn có tờ 50 nghìn, bạn phải đổi lấy một tờ tiền hoàn toàn mới từ ngân hàng. Ngược lại, đối tượng khả biến (như danh sách list) giống như một chiếc bảng viết phấn: bạn có thể xóa một chữ, viết thêm một chữ mới ngay tại chỗ mà vẫn là chiếc bảng đó.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">PHÂN LOẠI ĐỐI TƯỢNG CỐT LÕI: BẤT BIẾN VS KHẢ BIẾN</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">🔒 BẤT BIẾN (Immutable)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              • <strong>Số:</strong> <code>int</code>, <code>float</code>, <code>Decimal</code><br>
              • <strong>Chuỗi:</strong> <code>str</code>, <code>bytes</code><br>
              • <strong>Bộ giá trị:</strong> <code>tuple</code>, <code>frozenset</code><br>
              <span style="color:var(--accent-text);font-weight:600;">✓ Không thể sửa tại chỗ, đảm bảo toàn vẹn.</span>
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">✏️ KHẢ BIẾN (Mutable)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">
              • <strong>Danh sách:</strong> <code>list</code><br>
              • <strong>Từ điển:</strong> <code>dict</code><br>
              • <strong>Tập hợp:</strong> <code>set</code>, <code>bytearray</code><br>
              <span style="color:var(--success);font-weight:600;">✓ Sửa tại chỗ bằng gán chỉ mục hoặc method.</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Tính Bất biến (Immutability)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 9–10 / 38</strong>.</p>
          </div>
        </div>

        <p>Cũng hãy lưu ý trong các ví dụ trước rằng chúng ta không hề làm thay đổi chuỗi gốc qua bất kỳ thao tác nào đã thực thi. Thực tế là, mọi thao tác chuỗi đều được định nghĩa để <strong>tạo ra một chuỗi mới làm kết quả</strong>, bởi vì chuỗi ký tự là <strong>bất biến (immutable)</strong> trong Python—chúng không thể bị thay đổi tại chỗ (in place) sau khi đã được tạo ra.</p>
        <p>Nói một cách tổng quát hơn, bạn không bao giờ có thể ghi đè lên các giá trị của những đối tượng bất biến. Ví dụ, bạn không thể thay đổi một chuỗi bằng cách gán giá trị mới vào một vị trí chỉ mục của nó:</p>
      `,
      codeExamples: [
        {
          title: 'Cố gắng sửa chuỗi tại chỗ dẫn tới TypeError và cách tạo chuỗi mới',
          code: `>>> S = 'Code'
>>> S[0] = 'z'                        # Đối tượng bất biến không thể bị thay đổi
TypeError: 'str' object does not support item assignment

>>> S = 'Z' + S[1:]                  # Nhưng có thể chạy biểu thức để tạo đối tượng mới
>>> S
'Zode'`,
          output: `TypeError: 'str' object does not support item assignment
'Zode'`,
          annotations: [
            { line: 2, text: 'Phép gán theo chỉ mục bị chặn đứng bởi TypeError (thông báo lỗi đã rút gọn).' },
            { line: 4, text: 'Tạo đối tượng chuỗi mới "Zode" bằng ghép nối và gán lại cho tên biến S.' },
            { line: 6, text: 'Chuỗi cũ \'Code\' mất tham chiếu và được Python dọn rác tự động.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phân loại Bất biến vs Khả biến và Tầm quan trọng',
      content: `
        <p>Mọi đối tượng trong Python đều được phân loại là <strong>bất biến (immutable - không thể thay đổi)</strong> hoặc <strong>khả biến (mutable)</strong>:</p>
        <ul>
          <li><strong>Bất biến:</strong> Số, chuỗi ký tự, và bộ giá trị <code>tuple</code>.</li>
          <li><strong>Khả biến:</strong> Danh sách <code>list</code>, từ điển <code>dict</code>, và tập hợp <code>set</code>—chúng có thể được thay đổi tại chỗ một cách tự do, tương tự như hầu hết các đối tượng mới mà bạn lập trình bằng các lớp.</li>
        </ul>
        <p>Sự phân biệt này cực kỳ quan trọng trong công việc với Python. Trong số các lợi ích:</p>
        <blockquote>
          <em>"Tính bất biến có thể được dùng để đảm bảo rằng một đối tượng luôn giữ nguyên giá trị không đổi trong suốt chương trình của bạn; ngược lại, giá trị của các đối tượng khả biến có thể bị thay đổi vào bất kỳ thời điểm nào và ở bất kỳ đâu (dù mã nguồn của bạn có lường trước điều đó hay không!)."</em>
        </blockquote>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Cách Thay đổi Văn bản: Bung thành List và Đối tượng bytearray',
      content: `
        <p>Nói một cách chính xác, bạn có thể thay đổi dữ liệu dạng văn bản tại chỗ nếu bạn áp dụng một trong hai kỹ thuật sau:</p>
        <ol>
          <li><strong>Bung chuỗi thành danh sách các ký tự:</strong> Dùng hàm <code>list()</code> để tạo danh sách khả biến, sửa đổi phần tử tùy thích tại độ dời, rồi dùng phương thức <code>join()</code> để nối chúng lại với nhau không kèm ký tự phân cách.</li>
          <li><strong>Sử dụng đối tượng chuyên dụng <code>bytearray</code>:</strong> Cấu trúc lai đặc biệt hỗ trợ thay đổi tại chỗ cho văn bản có ký tự rộng tối đa 8 bit (chẳng hạn như ASCII).</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Sửa văn bản bằng danh sách ký tự và đối tượng bytearray',
          code: `>>> S = 'Python'
>>> L = list(S)                      # Bung rộng thành một danh sách: [...]
>>> L
['P', 'y', 't', 'h', 'o', 'n']
>>> L[0] = 'C'                       # Thay đổi trực tiếp tại chỗ
>>> ''.join(L)                       # Nối lại với ký tự phân cách rỗng
'Cython'

>>> B = bytearray(b'app')            # Cấu trúc lai bytes/list (xem phần sau)
>>> B.extend(b'lication')            # Tiền tố 'b' biểu thị chuỗi bytes
>>> B                                # B[i] = ord(x) cũng hoạt động tại đây
bytearray(b'application')
>>> B.decode()                       # Giải mã sang chuỗi văn bản thông thường
'application'`,
          output: `['P', 'y', 't', 'h', 'o', 'n']
'Cython'
bytearray(b'application')
'application'`,
          annotations: [
            { line: 2, text: 'list(S) bung chuỗi thành 6 phần tử ký tự riêng biệt.' },
            { line: 5, text: 'L[0] = "C" sửa đổi tại chỗ vì list là đối tượng khả biến.' },
            { line: 7, text: '"".join(L) ghép các ký tự lại thành chuỗi bất biến mới "Cython".' },
            { line: 9, text: 'bytearray khởi tạo từ chuỗi byte b"app".' },
            { line: 10, text: 'B.extend() mở rộng mảng byte trực tiếp tại chỗ.' },
            { line: 13, text: 'B.decode() chuyển đổi mảng byte sang chuỗi văn bản str.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Hiểu lầm về hiệu năng khi gán lại chuỗi',
        content: 'Nhiều người mới học lo ngại rằng việc tạo chuỗi mới <code>S = \'Z\' + S[1:]</code> sẽ làm chậm chương trình vì phải sao chép bộ nhớ. Trong thực tế, trình dọn rác tự động của CPython giải phóng vùng nhớ cũ cực kỳ nhanh chóng và cơ chế tái sử dụng bộ nhớ đệm chuỗi được tối ưu hóa rất cao.'
      }
    ],
    tips: [
      {
        title: 'Giới hạn của bytearray',
        content: 'Đối tượng <code>bytearray</code> chỉ sửa tại chỗ được cho văn bản có ký tự rộng tối đa 8 bit (ASCII). Mọi chuỗi văn bản Unicode tổng quát khác trong Python vẫn luôn là bất biến.'
      }
    ]
  },

  exercises: [
    {
      title: 'Thay thế ký tự đầu tiên bằng phương pháp cắt lát',
      level: 'Dễ',
      problem: 'Cho chuỗi <code>s = "hàng"</code>. Hãy tạo ra chuỗi mới <code>"vàng"</code> bằng cách kết hợp ký tự <code>\'v\'</code> với lát cắt của chuỗi <code>s</code>.',
      hint: 'Cắt lát từ vị trí 1 đến hết chuỗi: <code>s[1:]</code>.',
      solutionCode: `s = "hàng"
s_moi = 'v' + s[1:]
print("Chuỗi mới:", s_moi)`,
      solutionOutput: `Chuỗi mới: vàng`,
      explanation: 'Biểu thức <code>"v" + s[1:]</code> tạo ra chuỗi mới <code>"vàng"</code> mà không làm thay đổi chuỗi gốc <code>"hàng"</code>.'
    },
    {
      title: 'Đổi chữ cái giữa chuỗi bằng list và join',
      level: 'Vừa',
      problem: 'Cho chuỗi <code>s = "spam"</code>. Hãy dùng kỹ thuật bung thành list để đổi chữ <code>\'a\'</code> thành <code>\'o\'</code> (thành <code>"spom"</code>) và in kết quả.',
      hint: 'Chuyển sang list, tìm hoặc gán chỉ mục tương ứng của chữ \'a\', rồi dùng <code>\'\'.join()</code>.',
      solutionCode: `s = "spam"
ds = list(s)
ds[2] = 'o'
ket_qua = ''.join(ds)
print("Kết quả sau khi đổi:", ket_qua)`,
      solutionOutput: `Kết quả sau khi đổi: spom`,
      explanation: '<code>ds[2] = "o"</code> thay đổi tại chỗ phần tử thứ 3 của list, sau đó <code>"".join(ds)</code> hợp nhất lại thành chuỗi mới.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn thực thi lệnh S[0] = \'x\' trên một chuỗi S = \'abc\', điều gì sẽ xảy ra trong Python?',
      options: [
        'Ký tự đầu tiên được đổi thành \'x\' thành công.',
        'Python tự động tạo ra một chuỗi mới mà không cần gán biến.',
        'Xảy ra ngoại lệ TypeError: \'str\' object does not support item assignment vì chuỗi là bất biến.',
        'Chuỗi bị xóa khỏi bộ nhớ.'
      ],
      correctIndex: 2,
      explanation: 'Chuỗi trong Python là bất biến (immutable), không hỗ trợ thao tác gán vào phần tử chỉ mục.'
    },
    {
      question: 'Nhóm đối tượng nào sau đây gồm TOÀN BỘ là các đối tượng BẤT BIẾN (Immutable)?',
      options: [
        'Số nguyên (int), Danh sách (list), Từ điển (dict)',
        'Số (Numbers), Chuỗi (str), Bộ giá trị (tuple)',
        'Danh sách (list), Tập hợp (set), bytearray',
        'Từ điển (dict), Chuỗi (str), Danh sách (list)'
      ],
      correctIndex: 1,
      explanation: 'Các đối tượng cốt lõi bất biến gồm: Số (int, float...), Chuỗi ký tự (str, bytes) và Bộ giá trị (tuple).'
    },
    {
      question: 'Đối tượng bytearray trong Python có đặc điểm nổi bật nào?',
      options: [
        'Nó là một đối tượng hoàn toàn bất biến như chuỗi str.',
        'Nó là cấu trúc lai giữa chuỗi byte và danh sách khả biến, cho phép thay đổi tại chỗ cho văn bản ký tự 8-bit.',
        'Nó chỉ dùng để lưu trữ số nguyên âm.',
        'Nó bắt buộc phải khai báo kích thước bộ nhớ cố định từ trước.'
      ],
      correctIndex: 1,
      explanation: 'bytearray là cấu trúc lai khả biến, hỗ trợ sửa đổi trực tiếp tại chỗ trên các byte 8-bit.'
    }
  ],

  summary: [
    'Chuỗi ký tự trong Python là bất biến (immutable): không thể sửa đổi tại chỗ sau khi tạo.',
    'Mọi thao tác biến đổi chuỗi đều sinh ra một đối tượng chuỗi mới trong bộ nhớ.',
    'Phân loại: Bất biến gồm Số, Chuỗi, Tuple; Khả biến gồm Danh sách, Từ điển, Set.',
    'Tính bất biến bảo vệ toàn vẹn dữ liệu xuyên suốt chương trình.',
    'Có thể sửa văn bản bằng cách bung thành list ký tự rồi join(), hoặc dùng đối tượng bytearray cho dữ liệu 8-bit.',
    'Ý chính: Bất biến không phải là nhược điểm mà là một cam kết an toàn vững chắc của kiến trúc Python.'
  ]
};
