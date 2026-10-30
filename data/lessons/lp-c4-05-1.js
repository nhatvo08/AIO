export default {
  id: 'lp-c4-05-1',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.5.1',
  title: 'Chuỗi ký tự: Các thao tác trên dãy tuần tự',
  subtitle: 'Khái niệm dãy tuần tự (sequence), chỉ mục dương/âm, cắt lát (slicing), ghép nối và tính đa hình (polymorphism)',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu sâu sắc khái niệm Dãy tuần tự (Sequence): thứ tự vị trí từ trái sang phải trong bộ nhớ.',
    'Sử dụng thành thạo chỉ mục dương (độ dời từ 0) và chỉ mục âm (đếm ngược từ cuối).',
    'Làm chủ cú pháp cắt lát X[I:J] và các biến thể biên mặc định.',
    'Thực hiện các thao tác ghép nối (+) và lặp lại (*).',
    'Thấu suốt tư tưởng cốt lõi: Tính đa hình (Polymorphism) và lập trình dựa trên giao diện.'
  ],

  intuition: {
    title: 'Thước đo milimet và dải băng chữ cái',
    metaphor: 'Hãy tưởng tượng chuỗi ký tự \'Code\' giống như một dải băng được đặt dọc theo một cây thước kẻ. Vạch 0 là mép trước của chữ \'C\', vạch 1 là mép trước chữ \'o\', vạch 2 là chữ \'d\', vạch 3 là chữ \'e\'. Bạn có thể đọc ký tự bằng cách đo từ đầu thước (chỉ mục dương 0, 1, 2, 3), hoặc đo ngược từ mép cuối dải băng (chỉ mục âm -1, -2, -3, -4). Cắt lát S[1:3] giống như lấy chiếc kéo cắt dải băng từ vạch 1 đến vạch 3: bạn thu được một dải băng nhỏ mới chứa chữ \'od\' mà dải băng gốc vẫn còn nguyên vẹn.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">SƠ ĐỒ CHỈ MỤC DƯƠNG, ÂM VÀ LÁT CẮT CỦA S = 'Code'</div>
        <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:8px;max-width:420px;margin:0 auto;width:100%;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Offset: 0</div>
            <div style="font-size:1.3rem;font-weight:800;color:var(--accent-primary);margin:4px 0;">'C'</div>
            <div style="font-size:0.75rem;color:var(--warning);">Âm: -4</div>
          </div>
          <div style="padding:10px;background:var(--accent-soft);border:2px solid var(--accent-primary);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--accent-text);">Offset: 1</div>
            <div style="font-size:1.3rem;font-weight:800;color:var(--accent-primary);margin:4px 0;">'o'</div>
            <div style="font-size:0.75rem;color:var(--warning);">Âm: -3</div>
          </div>
          <div style="padding:10px;background:var(--accent-soft);border:2px solid var(--accent-primary);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--accent-text);">Offset: 2</div>
            <div style="font-size:1.3rem;font-weight:800;color:var(--accent-primary);margin:4px 0;">'d'</div>
            <div style="font-size:0.75rem;color:var(--warning);">Âm: -2</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Offset: 3</div>
            <div style="font-size:1.3rem;font-weight:800;color:var(--accent-primary);margin:4px 0;">'e'</div>
            <div style="font-size:0.75rem;color:var(--warning);">Âm: -1</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.8rem;color:var(--accent-text);font-weight:600;">
          Lát cắt S[1:3] lấy từ độ dời 1 đến trước 3 ──► Thu được: 'od'
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khái niệm Dãy tuần tự (Sequence) và Lập chỉ mục Vị trí',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 7–9 / 38</strong>.</p>
          </div>
        </div>

        <p>Chuỗi ký tự được sử dụng để ghi lại cả thông tin dạng văn bản (chẳng hạn như tên của bạn) lẫn các tập hợp byte tùy ý (như nội dung của một tệp hình ảnh). Chúng là ví dụ đầu tiên về thứ mà trong Python chúng ta gọi là một <strong>dãy tuần tự (sequence)</strong>—một tập hợp các đối tượng khác được sắp xếp theo vị trí.</p>
        <p>Các dãy tuần tự duy trì thứ tự từ trái sang phải giữa các phần tử mà chúng chứa: các phần tử được lưu trữ và truy xuất dựa theo vị trí tương đối của chúng. Nói một cách chặt chẽ, chuỗi ký tự là các dãy tuần tự chứa các chuỗi gồm một ký tự; những đối tượng dãy tuần tự tổng quát hơn bao gồm danh sách (<code>list</code>) và bộ giá trị (<code>tuple</code>).</p>
        <p>Vì là các dãy tuần tự, chuỗi ký tự hỗ trợ các thao tác dựa trên thứ tự vị trí giữa các phần tử. Chúng ta có thể kiểm tra độ dài bằng hàm <code>len()</code> và trích xuất các thành phần bằng biểu thức chỉ mục (indexing):</p>
      `,
      codeExamples: [
        {
          title: 'Lập chỉ mục dương tính từ độ dời 0',
          code: `>>> S = 'Code'                         # Tạo chuỗi 4 ký tự và gán cho một tên biến
>>> len(S)                           # Độ dài: số lượng phần tử
4
>>> S[0]                             # Phần tử đầu tiên trong S, lập chỉ mục theo độ dời từ 0
'C'
>>> S[1]                             # Phần tử thứ hai tính từ bên trái
'o'`,
          output: `4
'C'
'o'`,
          annotations: [
            { line: 1, text: 'Chuỗi 4 ký tự được gán cho nhãn tên S.' },
            { line: 2, text: 'len(S) trả về số lượng ký tự.' },
            { line: 4, text: 'Chỉ mục là độ dời (offset) tính từ đầu chuỗi, bắt đầu từ 0.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Độ dời Âm (Negative Offsets)',
      content: `
        <p>Python cũng cho phép bạn truy xuất các phần tử bằng các <strong>độ dời âm</strong>. Nói chính xác về mặt kỹ thuật, một chỉ mục âm sẽ được cộng với độ dài của chuỗi để quy về một độ dời dương.</p>
        <p>Một cách trực quan hơn, bạn có thể hình dung độ dời âm là <strong>việc đếm ngược từ cuối chuỗi</strong>:</p>
        <ul>
          <li><code>S[-1]</code> lấy ra phần tử cuối cùng, tương đương với <code>S[len(S) - 1]</code>.</li>
          <li><code>S[-2]</code> lấy ra phần tử kế cuối tính từ cuối chuỗi.</li>
        </ul>
        <p>Bạn có thể sử dụng chỉ mục thuộc một trong hai loại này ở bất kỳ nơi nào mà Python yêu cầu một độ dời vào trong một dãy tuần tự:</p>
      `,
      codeExamples: [
        {
          title: 'Truy xuất phần tử bằng chỉ mục âm',
          code: `>>> S[-1]                            # Phần tử cuối cùng tính từ cuối chuỗi S
'e'
>>> S[-2]                            # Phần tử kế cuối tính từ cuối chuỗi
'd'
>>> S[-1]                            # Phần tử cuối cùng trong S
'e'
>>> S[len(S)-1]                      # Chỉ mục âm, viết theo cách thủ công
'e'`,
          output: `'e'
'd'
'e'
'e'`,
          annotations: [
            { line: 1, text: 'S[-1] tương đương S[4 - 1] = S[3], lấy chữ e.' },
            { line: 7, text: 'Cách viết S[-1] ngắn gọn và thanh lịch hơn nhiều so với S[len(S)-1].' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phép Cắt lát (Slicing) X[I:J]',
      content: `
        <p>Bên cạnh phép lập chỉ mục vị trí đơn giản, các dãy tuần tự còn hỗ trợ một dạng lập chỉ mục tổng quát hơn được gọi là <strong>cắt lát (slicing)</strong>—một phương thức trích xuất toàn bộ một đoạn (lát cắt) chỉ trong một bước duy nhất.</p>
        <p>Cú pháp của nó có dạng <code>X[I:J]</code>, mang ý nghĩa: <strong>"hãy lấy cho tôi mọi thứ trong X từ độ dời I cho đến trước độ dời J (không bao gồm J)"</strong>. Kết quả được trả về dưới dạng một đối tượng mới:</p>
        <p>Trong một lát cắt (slice), cận bên trái mặc định là <code>0</code>, và cận bên phải mặc định là độ dài của dãy tuần tự đang được cắt. Điều này dẫn tới một số biến thể sử dụng phổ biến:</p>
      `,
      codeExamples: [
        {
          title: 'Các biến thể cắt lát phổ biến trên chuỗi',
          code: `>>> S                                # Một chuỗi gồm 4 ký tự
'Code'
>>> S[1:3]                           # Cắt lát S từ độ dời 1 đến 2 (không gồm 3)
'od'
>>> S[1:]                            # Mọi phần tử sau phần tử đầu tiên (1:len(S))
'ode'
>>> S                                # Bản thân chuỗi S không hề thay đổi
'Code'
>>> S[0:3]                           # Mọi phần tử ngoại trừ phần tử cuối cùng
'Cod'
>>> S[:3]                            # Tương tự như S[0:3]
'Cod'
>>> S[:-1]                           # Mọi phần tử trừ phần tử cuối, nhưng gọn hơn (0:-1)
'Cod'
>>> S[:]                             # Toàn bộ S dưới dạng bản sao mức cao nhất (0:len(S))
'Code'`,
          output: `'Code'
'od'
'ode'
'Code'
'Cod'
'Cod'
'Cod'
'Code'`,
          annotations: [
            { line: 3, text: 'S[1:3] lấy ký tự tại vị trí 1 và 2, dừng trước 3.' },
            { line: 5, text: 'Bỏ qua cận phải: mặc định lấy đến hết chuỗi.' },
            { line: 7, text: 'Chuỗi gốc S vẫn nguyên vẹn.' },
            { line: 11, text: 'Bỏ qua cận trái: mặc định bắt đầu từ vị trí 0.' },
            { line: 13, text: 'Cận âm: S[:-1] cắt từ 0 đến trước ký tự cuối cùng.' },
            { line: 15, text: 'S[:] sao chép toàn bộ chuỗi (rất hữu ích cho danh sách sau này).' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Ghép nối (+), Lặp lại (*) và Tính Đa hình (Polymorphism)',
      content: `
        <p>Với tư cách là các dãy tuần tự, chuỗi ký tự cũng hỗ trợ:</p>
        <ul>
          <li><strong>Phép ghép nối (concatenation) bằng dấu cộng (<code>+</code>):</strong> Kết hợp hai chuỗi thành một chuỗi mới.</li>
          <li><strong>Phép lặp lại (repetition) bằng dấu sao (<code>*</code>):</strong> Tạo ra chuỗi mới bằng cách nhân bản lặp lại một chuỗi khác nhiều lần.</li>
        </ul>
        <p>Hãy chú ý rằng dấu cộng (<code>+</code>) mang các ý nghĩa khác nhau đối với những đối tượng khác nhau: <strong>là phép cộng đối với số, và là phép ghép nối đối với chuỗi</strong>. Đây là một đặc tính tổng quát của Python mà chúng ta sẽ thường xuyên gọi là <strong>tính đa hình (polymorphism)</strong>:</p>
        <blockquote>
          <em>"Nói ngắn gọn, tính đa hình có nghĩa là ý nghĩa của một thao tác phụ thuộc vào các đối tượng đang được thao tác."</em>
        </blockquote>
        <p>Bởi vì các kiểu đối tượng không bị trói buộc cứng nhắc, một thao tác lập trình trong Python thông thường có thể tự động áp dụng trên nhiều kiểu đối tượng khác nhau, miễn là chúng hỗ trợ một giao diện tương thích (như thao tác <code>+</code> ở đây). Đây là một tư tưởng cốt lõi và vĩ đại trong Python.</p>
      `,
      codeExamples: [
        {
          title: 'Phép ghép nối và lặp lại trên chuỗi',
          code: `>>> S
'Code'
>>> S + 'xyz'                        # Phép ghép nối (concatenation)
'Codexyz'
>>> S                                # S vẫn không thay đổi
'Code'
>>> S * 8                            # Phép lặp lại (repetition)
'CodeCodeCodeCodeCodeCodeCodeCode'`,
          output: `'Code'
'Codexyz'
'Code'
'CodeCodeCodeCodeCodeCodeCodeCode'`,
          annotations: [
            { line: 3, text: 'Dấu + ghép nối hai chuỗi thành chuỗi mới Codexyz mà không đổi S.' },
            { line: 7, text: 'Dấu * lặp lại chuỗi S đúng 8 lần.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tính đa hình mang lại mã nguồn súc tích',
        content: 'Nhờ tính đa hình, bạn không cần phải viết hàm <code>cong_so(a, b)</code> riêng và <code>ghep_chuoi(s1, s2)</code> riêng. Chỉ cần dùng toán tử <code>+</code>, Python sẽ tự động điều phối hành vi thích hợp tùy theo đối tượng.'
      }
    ]
  },

  exercises: [
    {
      title: 'Đảo ngược chuỗi bằng lát cắt bước nhảy âm',
      level: 'Dễ',
      problem: 'Mặc dù cú pháp hai chỉ mục <code>S[I:J]</code> là phổ biến nhất, Python còn hỗ trợ chỉ mục bước nhảy thứ ba <code>S[I:J:K]</code>. Hãy viết biểu thức cắt lát đảo ngược toàn bộ chuỗi <code>"Python"</code>.',
      hint: 'Dùng bước nhảy âm -1 với hai cận mặc định: <code>[::-1]</code>.',
      solutionCode: `s = "Python"
dao_nguoc = s[::-1]
print("Chuỗi đảo ngược:", dao_nguoc)`,
      solutionOutput: `Chuỗi đảo ngược: nohtyP`,
      explanation: 'Cú pháp <code>[::-1]</code> duyệt từ cuối chuỗi về đầu chuỗi với bước nhảy -1, trả về chuỗi đảo ngược mới.'
    },
    {
      title: 'Trích xuất tên miền từ địa chỉ email',
      level: 'Vừa',
      problem: 'Cho chuỗi email <code>"user@example.com"</code>. Hãy sử dụng hàm <code>len()</code>, phương thức tìm vị trí <code>find()</code> và phép cắt lát để trích xuất phần tên miền <code>"example.com"</code>.',
      hint: 'Tìm vị trí ký tự \'@\' rồi cắt lát từ vị trí kế tiếp đến hết chuỗi.',
      solutionCode: `email = "user@example.com"
at_pos = email.find('@')
ten_mien = email[at_pos + 1:]
print("Tên miền trích xuất:", ten_mien)`,
      solutionOutput: `Tên miền trích xuất: example.com`,
      explanation: '<code>email.find("@")</code> trả về vị trí 4. Lát cắt <code>email[5:]</code> lấy toàn bộ ký tự từ vị trí 5 đến hết chuỗi.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây định nghĩa chính xác nhất về "dãy tuần tự" (sequence) trong Python?',
      options: [
        'Một cấu trúc dữ liệu lưu trữ các đối tượng theo thứ tự thời gian tạo ra chúng.',
        'Một tập hợp các đối tượng được sắp xếp theo vị trí, duy trì thứ tự từ trái sang phải và truy xuất theo vị trí tương đối.',
        'Một tập hợp không có thứ tự và không cho phép phần tử trùng lặp.',
        'Một cấu trúc dữ liệu bắt buộc tất cả phần tử phải là số nguyên.'
      ],
      correctIndex: 1,
      explanation: 'Dãy tuần tự là tập hợp đối tượng có thứ tự vị trí từ trái sang phải, lưu và truy xuất theo độ dời (như str, list, tuple).'
    },
    {
      question: 'Cho chuỗi S = \'Python\'. Kết quả của biểu thức S[1:-1] là gì?',
      options: [
        '\'Python\'',
        '\'ytho\'',
        '\'Pyth\'',
        '\'yton\''
      ],
      correctIndex: 1,
      explanation: 'S[1:-1] bắt đầu từ độ dời 1 (\'y\') và dừng trước ký tự cuối cùng -1 (\'n\'), thu được \'ytho\'.'
    },
    {
      question: 'Khái niệm "Tính đa hình" (Polymorphism) trong Python được thể hiện như thế nào qua toán tử +?',
      options: [
        'Dấu + luôn biến tất cả dữ liệu thành số nguyên trước khi thực hiện.',
        'Ý nghĩa của dấu + phụ thuộc vào các đối tượng đang được thao tác: cộng đối với số, ghép nối đối với chuỗi.',
        'Dấu + chỉ hoạt động trên các lớp do người dùng tự tạo.',
        'Dấu + tự động xóa bỏ các ký tự khoảng trắng thừa.'
      ],
      correctIndex: 1,
      explanation: 'Tính đa hình nghĩa là ý nghĩa của thao tác phụ thuộc vào đối tượng: số thì làm phép cộng, chuỗi thì làm phép ghép nối.'
    }
  ],

  summary: [
    'Chuỗi ký tự là dãy tuần tự (sequence): duy trì thứ tự từ trái sang phải, truy xuất theo vị trí tương đối.',
    'Chỉ mục dương tính từ độ dời 0; chỉ mục âm đếm ngược từ cuối chuỗi (-1 là phần tử cuối).',
    'Cắt lát X[I:J] lấy mọi phần tử từ độ dời I đến trước độ dời J (không bao gồm J).',
    'Chuỗi hỗ trợ ghép nối bằng dấu cộng (+) và lặp lại bằng dấu sao (*).',
    'Tính đa hình (polymorphism): ý nghĩa thao tác phụ thuộc vào đối tượng bị thao tác.',
    'Ý chính: Lập chỉ mục và cắt lát là ngôn ngữ chung của mọi dãy tuần tự trong Python.'
  ]
};
