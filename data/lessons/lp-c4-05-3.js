export default {
  id: 'lp-c4-05-3',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.5.3',
  title: 'Chuỗi ký tự: Các phương thức đặc thù theo kiểu',
  subtitle: 'Tìm kiếm với find(), thay thế với replace(), tách chuỗi với split(), chuẩn hóa văn bản và xâu chuỗi phương thức',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt thao tác dãy tuần tự thông dụng với các phương thức (methods) đặc thù của kiểu chuỗi.',
    'Sử dụng find() để tìm vị trí chuỗi con và replace() để thay thế nội dung.',
    'Thành thạo tuyến công cụ xử lý văn bản: split(), upper(), isalpha(), rstrip().',
    'Nắm vững kỹ thuật xâu chuỗi phương thức (method chaining) từ trái sang phải.'
  ],

  intuition: {
    title: 'Dây chuyền tinh chế kim hoàn chuyên dụng',
    metaphor: 'Nếu các thao tác dãy tuần tự (như cắt lát, đếm độ dài) là chiếc kéo hay cái thước mà thợ thủ công nào cũng dùng được cho vải, gỗ hay giấy; thì các phương thức chuỗi là những công cụ tinh xảo chuyên dụng dành riêng cho văn bản: chiếc kính lúp tìm chữ (find), con dấu thay thế (replace), lưỡi dao phân tách dấu phẩy (split) và chiếc chổi quét sạch bụi khoảng trắng (rstrip). Khi đặt liên tiếp các công cụ này (xâu chuỗi phương thức), khối văn bản đi qua đầu này và đi ra ở đầu kia ở trạng thái đã được gọt giũa hoàn hảo.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">DÂY CHUYỀN XÂU CHUỖI PHƯƠNG THỨC (METHOD CHAINING)</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:8px;align-items:center;text-align:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Đầu vào</div>
            <div style="color:var(--warning);font-weight:700;">'aaa,bbb\\n'</div>
          </div>
          <div style="color:var(--accent-primary);font-size:1.2rem;">──.rstrip()──►</div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Kết quả tạm</div>
            <div style="color:var(--accent-text);font-weight:700;">'aaa,bbb'</div>
          </div>
          <div style="color:var(--accent-primary);font-size:1.2rem;">──.split(',')──►</div>
          <div style="padding:10px;background:var(--accent-soft);border:2px solid var(--success);border-radius:6px;">
            <div style="font-size:0.75rem;color:var(--success);font-weight:700;">Đầu ra (List)</div>
            <div style="color:var(--success);font-weight:800;">['aaa', 'bbb']</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Phương thức (Method) là gì?',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 4: Giới thiệu các đối tượng Python • <strong>PDF Trang 11–12 / 38</strong>.</p>
          </div>
        </div>

        <p>Mọi thao tác chuỗi mà chúng ta đã nghiên cứu từ đầu đến giờ (như lập chỉ mục, cắt lát, ghép nối, lặp lại) thực chất đều là <strong>các thao tác dãy tuần tự</strong>—nghĩa là những thao tác này cũng sẽ hoạt động trơn tru trên các dãy tuần tự khác trong Python, bao gồm cả danh sách (<code>list</code>) và bộ giá trị (<code>tuple</code>).</p>
        <p>Tuy nhiên, bên cạnh các thao tác dãy tuần tự thông dụng, chuỗi ký tự còn sở hữu những thao tác của riêng chúng, tồn tại dưới dạng <strong>các phương thức (method)</strong>:</p>
        <blockquote>
          <em>"Phương thức là các hàm được gắn liền với một đối tượng cụ thể và tác động lên đối tượng đó, được kích hoạt bằng một biểu thức gọi hàm sử dụng cặp dấu ngoặc đơn thông qua dấu chấm truy xuất: <code>doi_tuong.phuong_thuc(doi_so)</code>."</em>
        </blockquote>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Tìm kiếm và Thay thế: find() và replace()',
      content: `
        <p>Phương thức <code>find()</code> của chuỗi là thao tác tìm kiếm chuỗi con cơ bản: nó trả về độ dời (vị trí đầu tiên) của chuỗi con được truyền vào, hoặc trả về <code>-1</code> nếu không tìm thấy.</p>
        <p>Phương thức <code>replace()</code> thực hiện tìm kiếm và thay thế trên toàn bộ chuỗi: cả hai đều tác động lên chủ thể mà chúng gắn liền và được gọi từ đó.</p>
        <p>Một lần nữa, bất chấp tên gọi của các phương thức chuỗi này, <strong>chúng ta không hề thay đổi chuỗi gốc ở đây mà tạo ra các chuỗi mới làm kết quả</strong>—bởi vì chuỗi ký tự là bất biến, đây là cách duy nhất mà thao tác có thể vận hành:</p>
      `,
      codeExamples: [
        {
          title: 'Thao tác tìm kiếm find() và thay thế replace()',
          code: `>>> S = 'Code'
>>> S.find('od')                      # Tìm độ dời của một chuỗi con trong S
1
>>> S
'Code'
>>> S.replace('od', 'abl')           # Thay thế mọi chuỗi con 'od' trong S bằng 'abl'
'Cable'
>>> S
'Code'`,
          output: `1
'Code'
'Cable'
'Code'`,
          annotations: [
            { line: 2, text: 'S.find(\'od\') tìm thấy tại độ dời 1 (bắt đầu từ ký tự thứ hai).' },
            { line: 4, text: 'Chuỗi gốc S vẫn nguyên vẹn là \'Code\'.' },
            { line: 6, text: 'S.replace() trả về chuỗi mới \'Cable\'.' },
            { line: 8, text: 'Sau replace(), S vẫn là \'Code\'.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Tuyến Công cụ Văn bản và Xâu chuỗi Phương thức (Chaining)',
      content: `
        <p>Các phương thức chuỗi là tuyến công cụ xử lý văn bản hàng đầu trong Python:</p>
        <ul>
          <li><code>split(',')</code>: Tách chuỗi thành các chuỗi con dựa trên một ký tự phân cách (rất tiện lợi như một dạng phân tích cú pháp đơn giản cho tệp CSV).</li>
          <li><code>upper()</code> / <code>lower()</code>: Chuyển đổi toàn bộ sang chữ hoa hoặc chữ thường.</li>
          <li><code>isalpha()</code>, <code>isdigit()</code>: Kiểm tra tính chất nội dung (chỉ chứa chữ cái, chỉ chứa số...).</li>
          <li><code>rstrip()</code>: Loại bỏ các ký tự khoảng trắng thừa (dấu cách, tab, ký tự xuống dòng <code>\\n</code>) ở phía bên phải chuỗi.</li>
        </ul>
        <p>Đặc biệt, bạn có thể <strong>xâu chuỗi (chain) các lệnh gọi phương thức</strong>: Python thực thi tuần tự từ trái sang phải, tạo ra kết quả tạm thời trong tiến trình xử lý, miễn là lệnh gọi trước đó trả về một đối tượng có các phương thức phù hợp:</p>
      `,
      codeExamples: [
        {
          title: 'Tách chuỗi, chuyển chữ hoa, kiểm tra và xâu chuỗi phương thức',
          code: `>>> line = 'aaa,bbb,ccccc,dd'
>>> line.split(',')                  # Tách theo ký tự phân cách thành danh sách chuỗi con
['aaa', 'bbb', 'ccccc', 'dd']

>>> S = 'code'
>>> S.upper()                        # Chuyển đổi chữ hoa và chữ thường
'CODE'
>>> S.isalpha()                      # Kiểm tra nội dung: isalpha, isdigit, v.v.
True

>>> line = 'aaa,bbb,ccccc,dd\\n'
>>> line.rstrip()                    # Xóa các ký tự khoảng trắng ở phía bên phải
'aaa,bbb,ccccc,dd'
>>> line.rstrip().split(',')         # Kết hợp hai thao tác, thực thi từ trái sang phải
['aaa', 'bbb', 'ccccc', 'dd']`,
          output: `['aaa', 'bbb', 'ccccc', 'dd']
'CODE'
True
'aaa,bbb,ccccc,dd'
['aaa', 'bbb', 'ccccc', 'dd']`,
          annotations: [
            { line: 2, text: 'split(\',\') băm chuỗi thành danh sách 4 phần tử.' },
            { line: 6, text: 'upper() trả về bản sao chữ hoa \'CODE\'.' },
            { line: 8, text: 'isalpha() trả về True vì toàn bộ là chữ cái.' },
            { line: 12, text: 'rstrip() cắt bỏ ký tự xuống dòng \\n ở đuôi.' },
            { line: 14, text: 'Xâu chuỗi: line.rstrip() tạo chuỗi tạm sạch, rồi .split(\',\') tách thành danh sách.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Quy tắc vàng của Xâu chuỗi phương thức',
        content: 'Chỉ có thể xâu chuỗi nếu phương thức phía trước trả về một đối tượng hỗ trợ phương thức kế tiếp. Ví dụ: <code>line.rstrip().split(\',\')</code> hợp lệ vì <code>rstrip()</code> trả về <code>str</code>, và <code>str</code> có phương thức <code>split()</code>. Nhưng không thể gọi tiếp <code>line.rstrip().split(\',\').upper()</code> vì <code>split()</code> trả về <code>list</code>, mà <code>list</code> không có <code>upper()</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Làm sạch và phân tách dữ liệu dòng người dùng',
      level: 'Dễ',
      problem: 'Cho chuỗi dữ liệu thô: <code>"  Nguyen Van An ; 28 ; Kỹ sư \\n"</code>. Hãy dùng kỹ thuật xâu chuỗi phương thức để loại bỏ khoảng trắng thừa 2 đầu và tách các trường bằng dấu chấm phẩy <code>;</code>.',
      hint: 'Dùng phương thức <code>strip()</code> rồi gọi tiếp <code>split(";")</code>.',
      solutionCode: `raw_data = "  Nguyen Van An ; 28 ; Kỹ sư \\n"
cac_truong = [truong.strip() for truong in raw_data.strip().split(';')]
print("Các trường đã chuẩn hóa:", cac_truong)`,
      solutionOutput: `Các trường đã chuẩn hóa: ['Nguyen Van An', '28', 'Kỹ sư']`,
      explanation: '<code>raw_data.strip().split(";")</code> loại bỏ khoảng trắng hai đầu chuỗi rồi tách thành danh sách 3 phần tử.'
    },
    {
      title: 'Kiểm tra mật khẩu đơn giản',
      level: 'Vừa',
      problem: 'Hãy viết đoạn mã kiểm tra xem chuỗi mật khẩu <code>pw = "Secret123"</code> có chứa ít nhất một chữ cái và kết thúc bằng chuỗi <code>"123"</code> hay không.',
      hint: 'Dùng phương thức <code>isalnum()</code> hoặc kết hợp kiểm tra <code>endswith("123")</code>.',
      solutionCode: `pw = "Secret123"
ket_thuc_123 = pw.endswith("123")
co_chu_va_so = pw.isalnum()
print("Kết thúc bằng '123'?", ket_thuc_123)
print("Chỉ gồm chữ và số?", co_chu_va_so)`,
      solutionOutput: `Kết thúc bằng '123'? True
Chỉ gồm chữ và số? True`,
      explanation: 'Phương thức <code>endswith()</code> và <code>isalnum()</code> là các công cụ kiểm tra nội dung chuỗi mạnh mẽ tích hợp sẵn.'
    }
  ],

  quiz: [
    {
      question: 'Điểm khác biệt cốt lõi giữa thao tác cắt lát (slicing) và phương thức replace() của chuỗi là gì?',
      options: [
        'Cắt lát là thao tác dãy tuần tự dùng chung cho nhiều kiểu, còn replace() là phương thức đặc thù riêng của chuỗi.',
        'Cắt lát tạo chuỗi mới còn replace() sửa đổi trực tiếp chuỗi gốc tại chỗ.',
        'replace() chỉ hoạt động trên danh sách, không dùng được cho chuỗi.',
        'Cắt lát bắt buộc phải nạp module re mới dùng được.'
      ],
      correctIndex: 0,
      explanation: 'Cắt lát là cú pháp dãy tuần tự tổng quát, còn replace() là phương thức gắn liền với kiểu dữ liệu chuỗi.'
    },
    {
      question: 'Khi gọi lệnh S.find(\'xyz\') trên một chuỗi S mà \'xyz\' không xuất hiện trong S, kết quả trả về là gì?',
      options: [
        'Chương trình ném ra ngoại lệ ValueError.',
        'Trả về None.',
        'Trả về -1.',
        'Trả về False.'
      ],
      correctIndex: 2,
      explanation: 'Phương thức S.find() trả về độ dời (offset) nếu tìm thấy, hoặc trả về -1 nếu chuỗi con không tồn tại trong S.'
    },
    {
      question: 'Lệnh line.rstrip().split(\',\') thực hiện theo trình tự nào?',
      options: [
        'Tách dấu phẩy trước, sau đó xóa khoảng trắng trên từng phần tử của danh sách.',
        'Xóa khoảng trắng bên phải chuỗi line trước, tạo ra chuỗi tạm, rồi gọi split(\',\') trên chuỗi tạm đó.',
        'Cả hai thao tác chạy đồng thời không phân biệt thứ tự.',
        'Đây là cú pháp sai và Python sẽ báo lỗi SyntaxError.'
      ],
      correctIndex: 1,
      explanation: 'Xâu chuỗi phương thức thực thi tuần tự từ trái sang phải: rstrip() chạy trước sinh chuỗi tạm sạch, sau đó split() chạy trên chuỗi tạm đó.'
    }
  ],

  summary: [
    'Phương thức là các hàm gắn liền với đối tượng cụ thể, gọi qua cú pháp dấu chấm doi_tuong.method().',
    'find() tìm vị trí chuỗi con (hoặc -1); replace() thay thế nội dung; cả hai đều tạo chuỗi mới.',
    'split() băm chuỗi thành danh sách chuỗi con dựa trên ký tự phân cách.',
    'upper(), isalpha(), rstrip() là tuyến công cụ chuẩn hóa và kiểm tra văn bản hàng đầu.',
    'Có thể xâu chuỗi các phương thức từ trái sang phải để xử lý văn bản liên tục.',
    'Ý chính: Các phương thức chuỗi biến Python thành một ngôn ngữ xử lý văn bản mạnh mẽ bậc nhất.'
  ]
};
