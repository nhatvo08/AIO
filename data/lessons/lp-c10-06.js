export default {
  id: 'lp-c10-06',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.6',
  title: 'Tính toán Số học & Bắt Lỗi Nhập liệu — str.isdigit() và Cấu trúc if/elif/else',
  subtitle: 'Chuyển đổi kiểu với int(), xử lý lỗi TypeError và ValueError, kiểm tra phòng ngừa LBYL với str.isdigit() và cấu trúc if/elif/else nhiều nhánh',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên nhân phát sinh lỗi TypeError khi cố gắng thực hiện phép toán số học trên dữ liệu trả về từ input().',
    'Sử dụng hàm dựng sẵn int() để chuyển đổi chuỗi văn bản thành số nguyên và hiểu vị trí của câu lệnh dọn dẹp sau vòng lặp.',
    'Nhận diện ngoại lệ ValueError khi người dùng nhập dữ liệu không phải là chữ số hợp lệ.',
    'Áp dụng phương pháp kiểm tra trước dữ liệu (LBYL) bằng phương thức chuỗi str.isdigit().',
    'Nắm vững cấu trúc câu lệnh rẽ nhánh if / elif / else đầy đủ và quy tắc gióng hàng thụt lề lồng bên trong vòng lặp while.'
  ],

  intuition: {
    title: 'Người gác cổng soát vé và Máy cân tự động',
    metaphor: 'Hãy tưởng tượng tại một trạm thu phí cầu đường: người lái xe đưa vào một tờ phiếu (chuỗi văn bản từ input()). Nếu bạn cố nhét thẳng tờ phiếu giấy đó vào máy tính tiền (phép tính số học), máy sẽ lập tức kẹt cứng và báo lỗi TypeError ("Không thể cộng trừ một tờ giấy!"). Bạn phải đưa tờ phiếu qua một máy đọc mã số (hàm int()) để trích xuất số tiền. Nhưng nếu tài xế đưa nhầm một tờ báo cũ (chuỗi \'xxx\'), máy đọc mã số sẽ rú còi báo động ValueError! Để trạm thu phí vận hành trơn tru, bạn cần một người gác cổng kiểm tra trước: "Tờ giấy này có đúng là in toàn chữ số không?" (str.isdigit()). Nếu đúng thì cho qua, nếu sai thì nhắc nhở lái xe đổi vé!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">LUỒNG XỬ LÝ DỮ LIỆU VỚI KIỂM TRA PHÒNG NGỪA (LBYL)</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--accent-primary);border-radius:6px;">
            <strong>BƯỚC 1:</strong> <code>reply = input('Enter text:')</code> ➔ Nhận chuỗi (str)
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid #8b5cf6;border-radius:6px;margin-left:16px;">
            <strong>BƯỚC 2:</strong> <code>if reply == 'stop': break</code> ➔ Kiểm tra mật mã thoát
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--warning);border-radius:6px;margin-left:32px;">
            <strong>BƯỚC 3:</strong> <code>elif not reply.isdigit():</code> ➔ Kiểm tra hợp lệ bằng <code>isdigit()</code>
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:6px;margin-left:48px;">
            <strong>BƯỚC 4:</strong> <code>else: print(int(reply) ** 2)</code> ➔ An toàn chuyển đổi và tính toán!
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Thực Hiện Phép Tính Toán Trên Dữ Liệu Nhập & Lỗi TypeError',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 14–16 / 21</strong>.</p>
          </div>
        </div>

        <p>Tập lệnh tương tác ban đầu của chúng ta đã hoạt động trơn tru. Nhưng giờ đây, hãy giả sử rằng thay vì chuyển đổi chuỗi thành chữ in hoa, chúng ta muốn <strong>thực hiện một số phép toán trên dữ liệu nhập dạng số</strong>—chẳng hạn như bình phương giá trị người dùng nhập vào.</p>
        <p>Nếu bạn thử tính toán trực tiếp trên dữ liệu từ <code>input()</code>:</p>
        <pre><code>&gt;&gt;&gt; reply = '40'
&gt;&gt;&gt; reply ** 2
TypeError: unsupported operand type(s) for ** or pow(): 'str' and 'int'</code></pre>
        <p><strong>Nguyên nhân cốt lõi:</strong> Hàm <code>input()</code> luôn luôn trả về phản hồi dưới dạng một đối tượng chuỗi ký tự (<code>str</code>), chứ không phải con số. Trong Python, các phép toán nhân lặp lại và lũy thừa (<code>**</code>) không được định nghĩa giữa một chuỗi và một số theo cách toán học này.</p>
        <p>Để thực hiện phép toán, trước tiên chúng ta bắt buộc phải <strong>chuyển đổi chuỗi thành số nguyên bằng hàm dựng sẵn <code>int()</code></strong>:</p>
        <pre><code>&gt;&gt;&gt; int(reply) ** 2
1600</code></pre>
      `,
      codeExamples: [
        {
          title: 'Khắc phục lỗi TypeError bằng hàm chuyển đổi kiểu int()',
          code: `# Dữ liệu nhập từ người dùng luôn có kiểu str
reply = '40'
print("Kiểu dữ liệu gốc của reply:", type(reply))

# Chuyển đổi sang số nguyên trước khi bình phương
so_nguyen = int(reply)
print("Kiểu sau khi chuyển đổi:", type(so_nguyen))
print("Kết quả bình phương:", so_nguyen ** 2)`,
          output: `Kiểu dữ liệu gốc của reply: <class 'str'>
Kiểu sau khi chuyển đổi: <class 'int'>
Kết quả bình phương: 1600`,
          annotations: [
            { line: 3, text: 'Hàm type(reply) xác nhận kiểu str của dữ liệu nhập.' },
            { line: 6, text: 'Hàm int() tạo ra đối tượng số nguyên mới mang giá trị 40.' },
            { line: 8, text: 'Toán tử ** thực thi phép lũy thừa số học hợp lệ 40^2 = 1600.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Vòng Lặp Tính Toán Bình Phương & Vị Trí Câu Lệnh Dọn Dẹp',
      content: `
        <p>Được trang bị kiến thức chuyển đổi kiểu, chúng ta viết lại vòng lặp tương tác để tính toán bình phương và bổ sung thêm thông điệp chia tay ở cuối:</p>
        <pre><code>while True:
    reply = input('Enter text:')
    if reply == 'stop': break
    print(int(reply) ** 2)
print('Bye')</code></pre>

        <p><strong>Quan sát quan trọng về thụt lề:</strong></p>
        <ul>
          <li>Ba dòng bên trong <code>while</code> đều thụt lề 4 khoảng trắng, do đó chúng lặp đi lặp lại sau mỗi lần người dùng nhập dữ liệu.</li>
          <li>Câu lệnh <code>print('Bye')</code> ở dòng cuối cùng <strong>không thụt lề</strong> (nằm ở cột lề ngoài cùng). Do đó, theo quy tắc "hết thụt lề là hết khối lệnh", nó <em>không được coi là một phần của thân vòng lặp</em>.</li>
          <li>Kết quả là <code>print('Bye')</code> sẽ chỉ chạy đúng một lần duy nhất, sau khi vòng lặp đã được giải phóng bởi lệnh <code>break</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Chạy thử vòng lặp tính bình phương kèm câu chào Bye',
          code: `# Mô phỏng luồng nhập liệu: 2 -> 40 -> stop
inputs = ['2', '40', 'stop']
it = iter(inputs)

def mock_input(prompt):
    val = next(it)
    print(f"{prompt}{val}")
    return val

while True:
    reply = mock_input('Enter text:')
    if reply == 'stop': break
    print(int(reply) ** 2)
print('Bye')`,
          output: `Enter text:2
4
Enter text:40
1600
Enter text:stop
Bye`,
          annotations: [
            { line: 12, text: 'Nhập 2: In kết quả bình phương là 4.' },
            { line: 12, text: 'Nhập 40: In kết quả bình phương là 1600.' },
            { line: 15, text: 'print(\'Bye\') nằm ngoài vòng lặp, chạy duy nhất 1 lần khi kết thúc.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Xử Lý Lỗi Bằng Cách Kiểm Tra Dữ Liệu Nhập (str.isdigit)',
      content: `
        <p>Chương trình phía trên hoạt động hoàn hảo khi người dùng nhập số. Nhưng hãy chú ý điều gì sẽ xảy ra khi người dùng nhập dữ liệu không hợp lệ (chẳng hạn một từ khóa ngẫu nhiên):</p>
        <pre><code>Enter text:xxx
ValueError: invalid literal for int() with base 10: 'xxx'</code></pre>
        <p>Hàm dựng sẵn <code>int()</code> sẽ <strong>kích hoạt một ngoại lệ (exception) <code>ValueError</code></strong> tại đây khi gặp một chuỗi ký tự không thể phân tích thành số nguyên cơ số 10. Sự cố này sẽ làm chương trình đổ vỡ (crash) ngay lập tức.</p>

        <h3>Giải pháp phòng ngừa: Phương thức str.isdigit()</h3>
        <p>Nếu chúng ta muốn tập lệnh của mình hoạt động bền bỉ, chúng ta có thể <strong>chủ động kiểm tra nội dung chuỗi từ trước</strong> bằng phương thức <code>isdigit()</code> của đối tượng chuỗi:</p>
        <pre><code>&gt;&gt;&gt; S = '40'
&gt;&gt;&gt; T = 'xxx'
&gt;&gt;&gt; S.isdigit(), T.isdigit()
(True, False)</code></pre>
        <p>Phương thức <code>isdigit()</code> trả về <code>True</code> nếu tất cả các ký tự trong chuỗi đều là chữ số (0–9), và trả về <code>False</code> nếu chuỗi rỗng hoặc có chứa bất kỳ ký tự chữ cái, khoảng trắng hay dấu câu nào.</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra tính hợp lệ của chuỗi với phương thức isdigit()',
          code: `cac_chuoi = ['40', 'xxx', '123a', ' 50 ', '']

for s in cac_chuoi:
    hop_le = s.isdigit()
    print(f"Chuỗi {repr(s):<8}: isdigit() = {hop_le}")`,
          output: `Chuỗi '40'    : isdigit() = True
Chuỗi 'xxx'   : isdigit() = False
Chuỗi '123a'  : isdigit() = False
Chuỗi ' 50 '  : isdigit() = False
Chuỗi ''      : isdigit() = False`,
          annotations: [
            { line: 5, text: 'Chỉ chuỗi \'40\' chứa toàn chữ số mới trả về True.' },
            { line: 5, text: 'Khoảng trắng hoặc chuỗi rỗng đều bị isdigit() từ chối (False).' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Cấu Trúc if / elif / else Đầy Đủ Lồng Trong Vòng Lặp',
      content: `
        <p>Nhu cầu kiểm tra dữ liệu trước mang lại cho chúng ta lý do xác đáng để lồng các câu lệnh sâu hơn trong cấu trúc mã nguồn. Phiên bản mới dưới đây sử dụng một <strong>câu lệnh <code>if</code> đầy đủ các mệnh đề (<code>if / elif / else</code>)</strong> để ngăn chặn ngoại lệ:</p>
        <pre><code>while True:
    reply = input('Enter text:')
    if reply == 'stop':
        break
    elif not reply.isdigit():
        print('Bad!' * 8)
    else:
        print(int(reply) ** 2)
print('Bye')</code></pre>

        <p><strong>Cơ chế liên kết cú pháp:</strong></p>
        <ul>
          <li>Các phần <code>if</code>, <code>elif</code> và <code>else</code> được liên kết như các phần của cùng một câu lệnh duy nhất bởi vì các từ khóa mở đầu của chúng <strong>đều gióng thẳng hàng theo chiều dọc</strong> (có cùng mức độ thụt lề 4 khoảng trắng).</li>
          <li>Câu lệnh <code>if</code> này trải dài từ từ khóa <code>if</code> đầu tiên cho đến ngay trước câu lệnh <code>print('Bye')</code> ở dòng cuối cùng.</li>
          <li>Đổi lại, toàn bộ cấu trúc <code>if / elif / else</code> này lại là một phần của khối thân vòng lặp <code>while</code> vì tất cả các dòng của nó đều được thụt lề vào trong so với dòng tiêu đề của <code>while</code>.</li>
        </ul>
        <p>Khi chạy tập lệnh mới, mã nguồn sẽ <strong>chặn bắt lỗi trước khi chúng kịp xảy ra</strong> (in cảnh báo <code>'Bad!' * 8</code> khi nhập sai), nhưng việc gõ <code>"stop"</code> vẫn giúp chúng ta thoát ra an toàn, và các con số hợp lệ vẫn được tính bình phương chuẩn xác.</p>
      `,
      codeExamples: [
        {
          title: 'Chạy thử tập lệnh kiểm tra dữ liệu nhập hoàn chỉnh',
          code: `# Giả lập luồng nhập: 5 -> xxx -> 10 -> stop
inputs = ['5', 'xxx', '10', 'stop']
it = iter(inputs)

def mock_input(prompt):
    val = next(it)
    print(f"{prompt}{val}")
    return val

while True:
    reply = mock_input('Enter text:')
    if reply == 'stop':
        break
    elif not reply.isdigit():
        print('Bad!' * 8)
    else:
        print(int(reply) ** 2)
print('Bye')`,
          output: `Enter text:5
25
Enter text:xxx
Bad!Bad!Bad!Bad!Bad!Bad!Bad!Bad!
Enter text:10
100
Enter text:stop
Bye`,
          annotations: [
            { line: 12, text: 'Nhập 5: Nhánh else chạy, in 25.' },
            { line: 14, text: 'Nhập xxx: not isdigit() là True, nhánh elif chặn bắt và in Bad! 8 lần.' },
            { line: 12, text: 'Nhập 10: Nhánh else chạy, in 100.' },
            { line: 13, text: 'Nhập stop: Nhánh if chạy lệnh break thoát vòng lặp, in Bye.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tư duy kiểm tra phòng ngừa: LBYL (Look Before You Leap)',
        content: 'Kỹ thuật dùng <code>str.isdigit()</code> để kiểm tra trước khi chuyển đổi <code>int()</code> đại diện cho phong cách lập trình <strong>LBYL (Kiểm tra trước khi nhảy)</strong>. Bạn kiểm tra mọi điều kiện biên từ trước để đảm bảo hành động tiếp theo sẽ không bao giờ phát sinh lỗi.'
      }
    ],
    pitfalls: [
      {
        title: 'str.isdigit() không hỗ trợ số âm!',
        content: 'Nếu người dùng nhập <code>"-40"</code>, phương thức <code>"-40".isdigit()</code> sẽ trả về <code>False</code> vì ký tự dấu trừ <code>\'-\'</code> không phải là chữ số. Đây là một hạn chế lớn của việc kiểm tra thủ công, và chúng ta sẽ thấy câu lệnh <code>try</code> giải quyết vấn đề này thanh thoát như thế nào ở bài tiếp theo.'
      }
    ],
    deepDive: {
      title: 'Hiệu quả nhân chuỗi trong thông báo lỗi',
      content: '<p>Cú pháp <code>print(\'Bad!\' * 8)</code> tận dụng toán tử nhân chuỗi dãy tuần tự mà chúng ta đã học ở Chương 4 và 7. Nó nhân bản chuỗi <code>\'Bad!\'</code> thành <code>\'Bad!Bad!Bad!Bad!Bad!Bad!Bad!Bad!\'</code> trong bộ nhớ một cách cực kỳ nhanh chóng mà không cần bất kỳ vòng lặp thủ công nào.</p>'
    }
  },

  exercises: [
    {
      title: 'Kiểm tra chuỗi số nguyên có dấu âm và dương',
      level: 'Dễ',
      problem: 'Viết một hàm <code>la_so_nguyen(s)</code> kiểm tra xem chuỗi <code>s</code> có thể chuyển đổi an toàn thành số nguyên hay không, bao gồm cả các số có dấu trừ hoặc dấu cộng ở đầu (ví dụ: <code>"-25"</code>, <code>"+10"</code>, <code>"40"</code>).',
      hint: 'Kiểm tra nếu ký tự đầu tiên là \'+\' hoặc \'-\' thì cắt lát phần còn lại s[1:] để gọi isdigit().',
      solutionCode: `def la_so_nguyen(s):
    s = s.strip()
    if s.startswith(('+', '-')):
        return s[1:].isdigit()
    return s.isdigit()

print("-25 là số nguyên:", la_so_nguyen("-25"))
print("+10 là số nguyên:", la_so_nguyen("+10"))
print("abc là số nguyên:", la_so_nguyen("abc"))`,
      solutionOutput: `-25 là số nguyên: True
+10 là số nguyên: True
abc là số nguyên: False`,
      explanation: 'Bằng cách loại bỏ dấu dấu âm/dương ở đầu trước khi kiểm tra <code>isdigit()</code>, chúng ta mở rộng khả năng kiểm tra của chuỗi cho các số nguyên âm.'
    },
    {
      title: 'Mở rộng câu lệnh if/elif/else cho 3 nhánh dữ liệu',
      level: 'Trung bình',
      problem: 'Bổ sung thêm một nhánh elif vào vòng lặp tương tác: nếu người dùng nhập chuỗi <code>"help"</code> thì in ra dòng hướng dẫn: <code>"Hãy nhập một con số hoặc gõ stop để thoát"</code>.',
      hint: 'Đặt nhánh elif reply == \'help\': ngay sau nhánh if reply == \'stop\'.',
      solutionCode: `inputs = ['help', '8', 'stop']
it = iter(inputs)

while True:
    reply = next(it)
    print(f"Nhập: {reply}")
    if reply == 'stop':
        break
    elif reply == 'help':
        print("Trợ giúp: Hãy nhập một con số để tính bình phương, hoặc gõ stop để thoát.")
    elif not reply.isdigit():
        print("Lỗi: Dữ liệu không phải là số hợp lệ!")
    else:
        print("Bình phương:", int(reply) ** 2)
print("Kết thúc.")`,
      solutionOutput: `Nhập: help
Trợ giúp: Hãy nhập một con số để tính bình phương, hoặc gõ stop để thoát.
Nhập: 8
Bình phương: 64
Nhập: stop
Kết thúc.`,
      explanation: 'Cấu trúc <code>if / elif / ... / else</code> của Python cho phép mở rộng không giới hạn các nhánh kiểm tra điều kiện, thực thi nhánh đầu tiên thỏa mãn tính từ trên xuống dưới.'
    }
  ],

  quiz: [
    {
      question: 'Tại sao biểu thức reply ** 2 phát sinh lỗi TypeError khi reply là kết quả trả về từ input()?',
      options: [
        'Vì Python không hỗ trợ phép toán lũy thừa.',
        'Vì input() trả về chuỗi (str), và phép toán lũy thừa không được hỗ trợ giữa chuỗi và số nguyên.',
        'Vì biến reply chưa được khai báo trước trong hàm.',
        'Vì số 2 bắt buộc phải được viết dưới dạng số thực 2.0.'
      ],
      correctIndex: 1,
      explanation: 'input() luôn trả về chuỗi str. Trong Python, toán tử lũy thừa ** không được định nghĩa giữa kiểu str và int, dẫn đến TypeError.'
    },
    {
      question: 'Ngoại lệ nào sẽ xảy ra nếu bạn cố gắng gọi int("hello") trong Python?',
      options: [
        'TypeError',
        'SyntaxError',
        'ValueError',
        'KeyError'
      ],
      correctIndex: 2,
      explanation: 'Khi chuỗi chứa các ký tự không thể phân tích cú pháp thành một số nguyên cơ số 10 hợp lệ, hàm int() sẽ kích hoạt ngoại lệ ValueError.'
    },
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về phương thức str.isdigit()?',
      options: [
        'Nó trả về True cho mọi chuỗi có thể ép kiểu thành số, bao gồm cả "-5" và "3.14".',
        'Nó trả về True chỉ khi tất cả các ký tự trong chuỗi đều là chữ số và chuỗi không rỗng.',
        'Nó tự động chuyển đổi chuỗi thành số nguyên int.',
        'Nó là một từ khóa đặc biệt của câu lệnh if.'
      ],
      correctIndex: 1,
      explanation: 'str.isdigit() chỉ trả về True khi toàn bộ các ký tự trong chuỗi đều là chữ số thập phân (0-9). Nó trả về False cho chuỗi rỗng, số âm (có dấu -), và số thực (có dấu chấm).'
    }
  ],

  summary: [
    'Hàm input() luôn trả về chuỗi; phải dùng hàm dựng sẵn int() để ép kiểu sang số trước khi tính toán số học.',
    'Nhập dữ liệu không phải chữ số sẽ khiến int() kích hoạt ngoại lệ ValueError làm đổ vỡ chương trình.',
    'Phương thức str.isdigit() cho phép kiểm tra phòng ngừa (tư duy LBYL) tính hợp lệ của chuỗi trước khi chuyển đổi.',
    'Cấu trúc if / elif / else đầy đủ liên kết các nhánh rẽ bằng cách gióng thẳng hàng theo một cột dọc, lồng nhịp nhàng bên trong vòng lặp while.',
    'Các câu lệnh sau vòng lặp lùi ra ngoài lề (hết thụt lề) sẽ chỉ chạy đúng một lần duy nhất khi vòng lặp kết thúc.'
  ]
};
