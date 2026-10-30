export default {
  id: 'lp-c10-07',
  partId: 'part-lp-c10',
  chapter: 'Chương 10: Giới thiệu các câu lệnh Python',
  number: 'C10.7',
  title: 'Xử lý Ngoại lệ với try/except/else — Tư duy EAFP & Hỗ trợ Số thực float',
  subtitle: 'Bắt và phục hồi lỗi bằng câu lệnh try, tư duy phản ứng EAFP, cơ chế gióng hàng thụt lề phân biệt else của try vs else của if, và hỗ trợ số thực float toàn diện',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên lý cơ bản của câu lệnh phức hợp try/except/else trong việc bắt và phục hồi sau ngoại lệ.',
    'Phân biệt hai triết lý lập trình kinh điển: LBYL (kiểm tra trước) vs EAFP (hành động trước, bắt lỗi sau).',
    'Nắm vững cơ chế phân định thụt lề: làm sao để biết mệnh đề else thuộc về câu lệnh try hay thuộc về câu lệnh if.',
    'Nhận biết hạn chế của kiểm tra thủ công: chuỗi ký tự không có phương thức isfloat().',
    'Ứng dụng câu lệnh try kết hợp float() để hỗ trợ mọi định dạng số thực phức tạp (số thập phân, số mũ khoa học E).'
  ],

  intuition: {
    title: 'Chiếc lưới an toàn của diễn viên xiếc nhào lộn',
    metaphor: 'Nếu như phương pháp kiểm tra trước (LBYL) giống như việc một người diễn viên xiếc phải kiểm tra từng chiếc đinh ốc, đo đạc từng cơn gió trước khi nhảy; thì câu lệnh try/except giống như việc căng sẵn một chiếc lưới bảo hộ khổng lồ bên dưới. Người diễn viên cứ tự tin thực hiện cú nhào lộn (khối try: chuyển đổi float()). Nếu thành công, tiếng vỗ tay vang lên (khối else: in kết quả). Nếu sơ sảy hụt chân rơi xuống, chiếc lưới an toàn sẽ đón đỡ nhẹ nhàng và người diễn viên đứng dậy mỉm cười cúi chào khán giả (khối except: in cảnh báo), tuyệt đối không để xảy ra tai nạn đổ vỡ!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHU TRÌNH XỬ LÝ NGOẠI LỆ VỚI TRY / EXCEPT / ELSE</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--accent-primary);">KHỐI TRY</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:4px;">Hành động có thể gây lỗi:<br><code>num = float(reply)</code></div>
          </div>
          <div style="font-size:1.2rem;color:var(--text-muted);text-align:center;">➔</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--danger);border-radius:4px;">
              <strong style="color:var(--danger);">CÓ LỖI:</strong> Chạy khối <code>except:</code> (bắt lỗi)
            </div>
            <div style="padding:8px 12px;background:var(--bg-surface);border-left:4px solid var(--success);border-radius:4px;">
              <strong style="color:var(--success);">KHÔNG LỖI:</strong> Chạy khối <code>else:</code> (in kết quả)
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Xử Lý Lỗi Bằng Câu Lệnh try — Tư Duy EAFP',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 10: Giới thiệu các câu lệnh Python • <strong>PDF Trang 16–18 / 21</strong>.</p>
          </div>
        </div>

        <p>Giải pháp kiểm tra phòng ngừa bằng <code>str.isdigit()</code> ở bài trước hoạt động tốt, nhưng như bạn sẽ thấy ở phần sau của cuốn sách, <strong>cách thức tổng quát nhất để xử lý lỗi trong Python là bắt và phục hồi hoàn toàn sau lỗi bằng cách sử dụng câu lệnh <code>try</code></strong>.</p>
        <p>Phiên bản tập lệnh tương tác sử dụng câu lệnh <code>try</code> trông như sau:</p>
        <pre><code>while True:
    reply = input('Enter text:')
    if reply == 'stop': break
    try:
        num = int(reply)
    except:
        print('Bad!' * 8)
    else:
        print(num ** 2)
print('Bye')</code></pre>

        <p><strong>Sự thay đổi về mặt tư duy:</strong></p>
        <ul>
          <li>Thay vì chủ động phát hiện lỗi từ trước bằng cách kiểm tra điều kiện (tư duy <em>LBYL — Look Before You Leap</em>), chúng ta <strong>giả định rằng phép chuyển đổi sẽ thành công</strong> và bọc nó trong một <strong>bộ xử lý ngoại lệ (exception handler)</strong>.</li>
          <li>Nói cách khác, chúng ta chỉ đơn giản là <strong>phản ứng lại nếu có lỗi phát sinh</strong>—đây chính là triết lý Python nổi tiếng: <strong>EAFP (Easier to Ask for Forgiveness than Permission — Dễ xin tha thứ hơn xin phép)</strong>.</li>
        </ul>
        <p>Câu lệnh <code>try</code> này là một câu lệnh phức hợp tuân theo cùng khuôn mẫu: dòng tiêu đề kết thúc bằng dấu hai chấm, theo sau bởi khối lệnh được thụt lề. Python trước tiên sẽ chạy phần <code>try</code>, sau đó sẽ chạy phần <code>except</code> (nếu có ngoại lệ xảy ra) hoặc phần <code>else</code> (nếu không có ngoại lệ xảy ra).</p>
      `,
      codeExamples: [
        {
          title: 'Vòng lặp tương tác sử dụng try / except / else',
          code: `# Giả lập luồng dữ liệu: '7' -> 'abc' -> 'stop'
inputs = ['7', 'abc', 'stop']
it = iter(inputs)

def mock_input(prompt):
    val = next(it)
    print(f"{prompt}{val}")
    return val

while True:
    reply = mock_input('Enter text:')
    if reply == 'stop': break
    try:
        num = int(reply)
    except:
        print('Bad!' * 8)
    else:
        print(num ** 2)
print('Bye')`,
          output: `Enter text:7
49
Enter text:abc
Bad!Bad!Bad!Bad!Bad!Bad!Bad!Bad!
Enter text:stop
Bye`,
          annotations: [
            { line: 12, text: 'Nhập \'7\': try thành công, khối else chạy và in 7^2 = 49.' },
            { line: 12, text: 'Nhập \'abc\': int() phát sinh ValueError, khối except bắt lấy và in Bad! 8 lần.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Phân Biệt else của try vs else của if Bằng Độ Thụt Lề',
      content: `
        <p>Một điểm ngữ pháp cực kỳ thú vị và quan trọng mà Mark Lutz phân tích ở đây: <strong>mệnh đề <code>else</code> trong đoạn mã trên gắn liền với <code>try</code>, chứ không phải với <code>if</code>!</strong></p>
        <p>Như chúng ta đã biết, từ khóa <code>else</code> có thể xuất hiện trong nhiều cấu trúc khác nhau của Python: trong câu lệnh <code>if</code>, trong câu lệnh <code>try</code>, và thậm chí trong các vòng lặp <code>for</code> và <code>while</code>. Vậy làm thế nào trình thông dịch Python (và người đọc mã) biết <code>else</code> thuộc về câu lệnh nào?</p>
        <blockquote>
          <p><strong>Chính độ thụt lề vật lý sẽ cho bạn biết chính xác từ khóa <code>else</code> là một phần của câu lệnh nào!</strong></p>
        </blockquote>
        <p>Hãy phân tích vị trí thụt lề trong đoạn mã trên:</p>
        <ul>
          <li>Các từ khóa <code>try:</code>, <code>except:</code> và <code>else:</code> đều được thụt lề đúng 4 khoảng trắng—tức là <strong>có cùng một mức độ thụt lề và gióng thẳng hàng với nhau</strong>. Do đó, chúng được coi là các phần của cùng một câu lệnh <code>try</code> duy nhất.</li>
          <li>Trong khi đó, câu lệnh <code>if reply == 'stop': break</code> là một câu lệnh đơn xuất hiện trên một dòng duy nhất và đã <strong>kết thúc hoàn toàn ngay sau từ khóa <code>break</code></strong>. Vì vậy, từ khóa <code>else:</code> phía dưới tuyệt đối không thể gắn với <code>if</code> được!</li>
        </ul>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Hỗ Trợ Số Dấu Phẩy Động (float) Toàn Diện',
      content: `
        <p>Hiện tại, bạn chỉ cần ghi nhớ rằng: vì <code>try</code> có thể được sử dụng để chặn bắt bất kỳ lỗi nào, nó <strong>làm giảm đáng kể lượng mã kiểm tra lỗi thủ công mà bạn phải viết</strong>, và đây là một cách tiếp cận mang tính khái quát rất cao.</p>
        <p>Chẳng hạn, nếu chúng ta chắc chắn rằng lệnh <code>print()</code> sẽ không thất bại, ví dụ này có thể được viết súc tích hơn nữa bằng cách đưa thẳng biểu thức tính toán vào trong <code>try</code>:</p>
        <pre><code>while True:
    reply = input('Enter text:')
    if reply == 'stop': break
    try:
        print(int(reply) ** 2)
    except:
        print('Bad!' * 8)
print('Bye')</code></pre>

        <h3>Tại sao kiểm tra thủ công số float lại là cơn ác mộng?</h3>
        <p>Và nếu chúng ta muốn hỗ trợ người dùng nhập vào các <strong>số dấu phẩy động (floating-point numbers — <code>float</code>)</strong> thay vì chỉ số nguyên, việc sử dụng <code>try</code> sẽ thể hiện sức mạnh vượt trội:</p>
        <pre><code>while True:
    reply = input('Enter text:')
    if reply == 'stop': break
    try:
        print(float(reply) ** 2)
    except:
        print('Bad!' * 8)
print('Bye')</code></pre>

        <p><strong>Lý do căn bản:</strong> Đối tượng chuỗi ký tự trong Python <strong>hoàn toàn không có phương thức <code>isfloat()</code></strong>! Hãy nghĩ về sự phức tạp khổng lồ của một con số thực: nó có thể có dấu âm ở đầu (<code>-5.5</code>), dấu chấm thập phân (<code>40.5</code>), phần nguyên bỏ trống (<code>.25</code>), hoặc được viết dưới dạng ký hiệu khoa học số mũ (<code>1.23E-100</code>).</p>
        <p>Việc viết mã thủ công để bao quát trọn vẹn toàn bộ các biến thể cú pháp của số thực trước khi chuyển đổi là một công việc cực kỳ gian nan và dễ phát sinh lỗi. Với <code>try</code>, chúng ta chỉ cần gọi <code>float(reply)</code> và để chính bộ máy tối ưu của CPython kiểm tra cú pháp giúp chúng ta!</p>
      `,
      codeExamples: [
        {
          title: 'Chạy thử vòng lặp hỗ trợ số thực float đa dạng từ giáo trình',
          code: `# Giả lập các loại dữ liệu nhập: 50 -> 40.5 -> 1.23E-100 -> hack -> stop
inputs = ['50', '40.5', '1.23E-100', 'hack', 'stop']
it = iter(inputs)

def mock_input(prompt):
    val = next(it)
    print(f"{prompt}{val}")
    return val

while True:
    reply = mock_input('Enter text:')
    if reply == 'stop': break
    try:
        print(float(reply) ** 2)
    except:
        print('Bad!' * 8)
print('Bye')`,
          output: `Enter text:50
2500.0
Enter text:40.5
1640.25
Enter text:1.23E-100
1.5129e-200
Enter text:hack
Bad!Bad!Bad!Bad!Bad!Bad!Bad!Bad!
Enter text:stop
Bye`,
          annotations: [
            { line: 12, text: 'Nhập \'50\': float(\'50\') ** 2 = 2500.0.' },
            { line: 12, text: 'Nhập \'40.5\': float(\'40.5\') ** 2 = 1640.25.' },
            { line: 12, text: 'Nhập \'1.23E-100\': số mũ khoa học tính bình phương ra 1.5129e-200.' },
            { line: 14, text: 'Nhập \'hack\': không thể ép kiểu sang float, except kích hoạt in Bad! 8 lần.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Chỉ định rõ ngoại lệ cụ thể (Specific Exception)',
        content: 'Mặc dù trong ví dụ minh họa cơ bản của chương, Mark Lutz dùng <code>except:</code> trần (bare except), trong mã nguồn thực tế bạn nên chỉ định rõ ngoại lệ cần bắt: <code>except ValueError:</code>. Điều này giúp tránh việc vô tình nuốt mất các ngoại lệ hệ thống khác như <code>KeyboardInterrupt</code> khi người dùng bấm Ctrl+C.'
      }
    ],
    pitfalls: [
      {
        title: 'Sử dụng biến khởi tạo trong khối try ở ngoài khối try',
        content: 'Nếu bạn viết <code>try: num = int(reply)</code>, và sau đó ở bên ngoài khối try bạn dùng <code>num</code>, nếu <code>int()</code> bị lỗi thì biến <code>num</code> chưa hề được gán giá trị! Khi đó Python sẽ phát sinh thêm lỗi <code>UnboundLocalError</code>. Đó là lý do Mark Lutz đặt lệnh in vào nhánh <code>else:</code> của <code>try</code>—nhánh này chỉ chạy khi khối try gán biến thành công!'
      }
    ],
    deepDive: {
      title: 'Triết lý EAFP — Bản sắc riêng của ngôn ngữ Python',
      content: '<p>Trong nhiều ngôn ngữ khác (như C++ hay Java), việc ném và bắt ngoại lệ (exception) rất tốn kém chi phí hiệu năng (overhead). Nhưng trong Python, cơ chế ngoại lệ được tối ưu hóa cực kỳ nhẹ nhàng trong CPython. Do đó, phong cách EAFP ("Cứ làm thử đi, nếu có lỗi thì xin tha thứ sau") trở thành chuẩn mực thành ngữ (idiomatic Python) được toàn bộ cộng đồng khuyến khích.</p>'
    }
  },

  exercises: [
    {
      title: 'Sử dụng try/except để xây dựng hàm an toàn chuyển đổi số',
      level: 'Dễ',
      problem: 'Viết một hàm <code>chuyen_doi_so(chuoi)</code> nhận vào một chuỗi. Nếu có thể chuyển thành số nguyên thì trả về int; nếu không thể thành int nhưng thành được float thì trả về float; nếu hoàn toàn không phải số thì trả về None.',
      hint: 'Dùng một khối try/except lồng hoặc hai khối try liên tiếp.',
      solutionCode: `def chuyen_doi_so(chuoi):
    try:
        return int(chuoi)
    except ValueError:
        try:
            return float(chuoi)
        except ValueError:
            return None

print("'100'  ->", chuyen_doi_so('100'))
print("'3.14' ->", chuyen_doi_so('3.14'))
print("'abc'  ->", chuyen_doi_so('abc'))`,
      solutionOutput: `'100'  -> 100
'3.14' -> 3.14
'abc'  -> None`,
      explanation: 'Sử dụng <code>try/except ValueError</code> giúp xử lý phân cấp chuyển đổi kiểu một cách an toàn mà không cần bất kỳ biểu thức chính quy (regex) phức tạp nào.'
    },
    {
      title: 'Tái cấu trúc vòng lặp chỉ định rõ ngoại lệ ValueError',
      level: 'Vừa',
      problem: 'Hãy viết lại vòng lặp hỗ trợ float ở mục 3 sao cho khối <code>except</code> chỉ bắt đúng ngoại lệ <code>ValueError</code> và in ra thông báo lỗi có định dạng thân thiện hơn: <code>"Lỗi: Không thể chuyển \'...\' thành số!"</code>.',
      hint: 'Dùng cú pháp except ValueError: và định dạng f-string với biến reply.',
      solutionCode: `inputs = ['3.5', 'khong_hop_le', 'stop']
it = iter(inputs)

while True:
    reply = next(it)
    print(f"Nhập: {reply}")
    if reply == 'stop': break
    try:
        val = float(reply)
    except ValueError:
        print(f"Lỗi: Không thể chuyển '{reply}' thành số!")
    else:
        print(f"Bình phương của {val} là {val ** 2}")
print("Đã thoát.")`,
      solutionOutput: `Nhập: 3.5
Bình phương của 3.5 là 12.25
Nhập: khong_hop_le
Lỗi: Không thể chuyển 'khong_hop_le' thành số!
Nhập: stop
Đã thoát.`,
      explanation: 'Bắt cụ thể <code>ValueError</code> là phương pháp tối ưu giúp mã nguồn chuẩn chỉ theo chuẩn PEP 8 và tránh các tác dụng phụ không mong muốn.'
    }
  ],

  quiz: [
    {
      question: 'Trong cấu trúc câu lệnh try / except / else, khi nào thì khối lệnh trong nhánh else sẽ được thực thi?',
      options: [
        'Khi có ngoại lệ xảy ra trong khối try.',
        'Khi không có bất kỳ ngoại lệ nào phát sinh trong khối try.',
        'Nhánh else luôn luôn được thực thi trong mọi trường hợp.',
        'Nhánh else chỉ thực thi khi khối except bị lỗi.'
      ],
      correctIndex: 1,
      explanation: 'Trong câu lệnh try, khối lệnh trong mệnh đề else chỉ được thực thi khi khối try chạy thành công trọn vẹn mà không phát sinh bất kỳ ngoại lệ nào.'
    },
    {
      question: 'Làm thế nào Python phân biệt được một từ khóa else: thuộc về câu lệnh try hay thuộc về câu lệnh if?',
      options: [
        'Dựa vào độ thụt lề: từ khóa else gióng thẳng hàng theo cột dọc với từ khóa nào thì thuộc về câu lệnh đó.',
        'Python luôn ưu tiên gắn else với câu lệnh if.',
        'Lập trình viên bắt buộc phải viết else try: để phân biệt.',
        'Python dựa vào dấu chấm phẩy ở cuối dòng.'
      ],
      correctIndex: 0,
      explanation: 'Chính độ thụt lề vật lý xác định cấu trúc liên kết: từ khóa else gióng thẳng hàng với try thì là của câu lệnh try; gióng thẳng hàng với if thì là của câu lệnh if.'
    },
    {
      question: 'Tại sao việc dùng try kết hợp hàm float() lại ưu việt hơn nhiều so với việc kiểm tra chuỗi thủ công trước khi ép kiểu số thực?',
      options: [
        'Vì chuỗi ký tự không có phương thức isfloat(), và cú pháp số thực rất phức tạp (dấu âm, dấu chấm, số mũ E).',
        'Vì float() chạy nhanh hơn int() 100 lần.',
        'Vì try giúp biến chuỗi chữ cái thành số 0 tự động.',
        'Vì Python không cho phép dùng if với số thực.'
      ],
      correctIndex: 0,
      explanation: 'Chuỗi không có isfloat(), và cú pháp số thực float vô cùng đa dạng (dấu âm, thập phân, số mũ khoa học E). Câu lệnh try với float() bao quát trọn vẹn mọi trường hợp mà không cần viết code kiểm tra phức tạp.'
    }
  ],

  summary: [
    'Câu lệnh try/except/else là cơ chế tổng quát nhất để bắt và phục hồi sau ngoại lệ trong Python.',
    'Triết lý EAFP (Dễ xin tha thứ hơn xin phép) cho phép viết mã tự nhiên, ngắn gọn và bền bỉ hơn so với kiểm tra phòng ngừa LBYL.',
    'Độ thụt lề gióng hàng phân định rõ ràng mệnh đề else thuộc về câu lệnh try hay câu lệnh if.',
    'Sử dụng try kết hợp float() là giải pháp tối ưu để hỗ trợ dữ liệu số thực đa dạng (số thập phân, số mũ khoa học) mà không cần kiểm tra thủ công phức tạp.'
  ]
};
