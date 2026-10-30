export default {
  id: 'lp-c7-18',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.18',
  title: 'Hằng chuỗi định dạng F-String: Cú pháp nền tảng & Điểm mới Python 3.12+',
  subtitle: 'Cú pháp f\'...{expression}...\', phép nội suy chuỗi (string interpolation), biểu thức tùy ý tại runtime, kết hợp tiền tố rf/fr, và đột phá cú pháp trong Python 3.12+ (dấu nháy lồng nhau, backslash, xuống dòng, chú thích)',
  level: 'Cơ bản',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững bản chất của f-string (bổ sung từ Python 3.6): phép nội suy chuỗi (string interpolation) nhúng biểu thức trực tiếp vào văn bản.',
    'Sử dụng các tiền tố kết hợp hợp lệ: f, F, rf, fr; hiểu rõ lý do f-string không thể kết hợp với tiền tố byte b hoặc tiền tố u.',
    'Nhận biết bản chất thời gian chạy (runtime evaluation) của f-string và lý do f-string không thể dùng làm docstring.',
    'Làm chủ các đột phá cú pháp mang tính cách mạng trong Python 3.12+ (PEP 701): nhúng dấu nháy cùng loại bên trong {}, hỗ trợ dấu gạch chéo ngược \\, ngắt dòng và ghi chú thích # trong cặp ngoặc nhọn.'
  ],

  intuition: {
    title: 'Chiếc kính soi trực tiếp vào mạch điện',
    metaphor: 'Trong hai phương pháp trước, chuỗi bản mẫu giống như một tấm phim âm bản nằm riêng, còn các đối số giống như một chồng ảnh rời nằm ở đuôi hàm — bạn phải đảo mắt qua lại giữa hai đầu để đoán xem cái gì sẽ lọt vào đâu. F-string giống như việc bạn lắp một chiếc kính hiển vi trong suốt ngay trên bảng mạch: bất cứ nơi nào bạn khoét một lỗ {}, bạn có thể đặt trực tiếp một bộ vi xử lý mini vào đó (tên biến, phép cộng, lời gọi hàm .upper()). Khi dòng điện chạy qua, kết quả lập tức phát sáng ngay tại tọa độ đó mà không cần bất kỳ dây dẫn lòng vòng nào!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">NỘI SUY CHUỖI VỚI F-STRING: BIỂU THỨC NỘI TUYẾN THỜI GIAN CHẠY</div>
        <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:8px;text-align:center;">
          <span style="font-size:1.15rem;font-weight:700;color:var(--warning);">f</span>
          <span style="color:var(--text-primary);">'Learning </span>
          <span style="padding:3px 8px;background:var(--bg-surface-alt);border:1px dashed var(--accent-primary);border-radius:4px;color:var(--accent-primary);font-weight:700;">{what.upper() + "!\"}</span>
          <span style="color:var(--text-primary);"> in </span>
          <span style="padding:3px 8px;background:var(--bg-surface-alt);border:1px dashed var(--success);border-radius:4px;color:var(--success);font-weight:700;">{tool + str(3.12)}</span>
          <span style="color:var(--text-primary);">'</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:0.8rem;margin-top:4px;">
          <div style="padding:8px 12px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--accent-primary);">
            <strong>Trước Python 3.12:</strong> Hạn chế khắt khe về dấu nháy, không cho phép backslash \\ trong {}, cấm chú thích.
          </div>
          <div style="padding:8px 12px;background:var(--bg-surface);border-radius:6px;border-left:3px solid var(--success);">
            <strong>Kể từ Python 3.12+ (PEP 701):</strong> Tự do tuyệt đối: nháy trùng loại, backslash đầy đủ, ngắt dòng &amp; comment # tùy ý!
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. F-String: Hằng Chuỗi Định Dạng & Phép Nội Suy Chuỗi',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 43 / 52 – Trang 45 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Nếu bạn đã trụ vững qua câu chuyện định dạng cho đến lúc này, thì có một tin vui: biến thể thứ ba và cũng là cuối cùng chủ yếu là sự kế thừa từ biến thể thứ hai. <strong>f-string</strong> (viết tắt của <em>formatted string literal</em>) là một hằng chuỗi văn bản nhúng trực tiếp các giá trị thay thế vào trong chính chuỗi định dạng, thay vì liệt kê chúng riêng rẽ ở phía đuôi.</p>

        <p>Được thêm vào trong Python 3.6, f-string thực hiện điều thường được gọi là <strong>phép nội suy chuỗi (string interpolation)</strong>—thay thế văn bản của một biểu thức bằng kết quả chạy trực tiếp của nó, ngay khi bản thân f-string được thực thi. Các biểu thức này được viết mã bên trong cặp dấu ngoặc nhọn <code>{}</code> và có thể là bất kỳ mã biểu thức Python hợp lệ nào.</p>

        <p>Về mặt cú pháp:</p>
        <ul>
          <li>F-string bắt đầu bằng chữ cái <code>f</code> hoặc <code>F</code> (thông thường dùng <code>f</code> thường) đứng trước bất kỳ dạng hằng chuỗi nào (nháy đơn, nháy kép, hoặc nháy ba).</li>
          <li><strong>Kết hợp tiền tố:</strong> Tiền tố <code>f</code> có thể kết hợp tự do với <code>r</code> theo bất kỳ thứ tự nào (<code>rf'...'</code> hoặc <code>fr'...'</code>) để tạo chuỗi thô định dạng vừa bỏ qua ký tự thoát gạch chéo ngược vừa hỗ trợ nội suy biểu thức.</li>
          <li><strong>Ràng buộc cấm:</strong> Tiền tố <code>f</code> <strong>không thể kết hợp với tiền tố byte <code>b</code></strong> (f-string chỉ áp dụng cho văn bản <code>str</code>, không áp dụng cho dữ liệu nhị phân <code>bytes</code>); và cũng không thể kết hợp với tiền tố <code>u</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'So sánh f-string cơ bản với biểu thức % và phương thức .format()',
          code: `what = 'coding'
tool = 'Python'

# 1. Hằng chuỗi định dạng f-string (gọn gàng, trực quan nhất)
print(f'Learning {what} in {tool}')

# 2. Biểu thức % tương đương
print('Learning %s in %s' % (what, tool))

# 3. Phương thức format tương đương
print('Learning {} in {}'.format(what, tool))`,
          output: `Learning coding in Python
Learning coding in Python
Learning coding in Python`,
          annotations: [
            { line: 5, text: '{what} và {tool} nhúng trực tiếp tên biến vào vị trí hiển thị.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bản Chất Thực Thi Thời Gian Chạy (Runtime Evaluation)',
      content: `
        <p>Một nguyên lý nền tảng cần ghi nhớ: <strong>các biểu thức bên trong cặp dấu ngoặc nhọn {} của f-string được đánh giá tại thời gian chạy (runtime)</strong> tại chính nơi chúng xuất hiện trong luồng điều khiển, chứ không phải khi mã nguồn lần đầu tiên được Python đọc hay nạp vào bộ nhớ.</p>

        <p>Bất kỳ biểu thức Python hợp lệ nào cũng có thể được đặt bên trong <code>{}</code>: từ các phép toán số học, phép nối chuỗi, gọi phương thức, chỉ mục danh sách, đến các biểu thức điều kiện 3 ngôi (ternary expression):</p>

        <div class="callout-box callout-warning" style="border-left:4px solid var(--warning);margin:14px 0;">
          <div class="callout-header">
            <span>⚠️</span>
            <span><strong>F-string không thể hoạt động như Docstring:</strong></span>
          </div>
          <div class="callout-body">
            <p>Bởi vì f-string là mã thực thi thời gian chạy (runtime code), nó <strong>không thể hoạt động như docstring</strong> của module, hàm hay lớp (sẽ học ở Chương 15). Các docstring cần phải là các hằng chuỗi tĩnh có sẵn ngay sau bước biên dịch mã byte (compile-time) để các công cụ như <code>help()</code> trích xuất thuộc tính <code>__doc__</code>, trong khi f-string nằm trong một hàm sẽ không hề được chạy cho đến khi hàm đó thực sự được gọi!</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Biểu thức tùy ý bên trong {} và bản chất đánh giá thời gian chạy',
          code: `what = 'coding'
tool = 'Python'

# Nhúng biểu thức gọi phương thức và cộng chuỗi:
task = f"Learning {what.upper() + '!'} in {tool + str(3.12)}"
print(task)

# Đánh giá thời gian chạy: thay đổi biến rồi tạo lại chuỗi
what = 'f-strings'
print("Trước khi chạy lại f-string:", task)

task = f"Learning {what.upper() + '!'} in {tool + str(3.12)}"
print("Sau khi chạy lại f-string:", task)`,
          output: `Learning CODING! in Python3.12
Trước khi chạy lại f-string: Learning CODING! in Python3.12
Sau khi chạy lại f-string: Learning F-STRINGS! in Python3.12`,
          annotations: [
            { line: 5, text: 'what.upper() + \'!\' chạy biểu thức rồi mới ép chuỗi.' },
            { line: 9, text: 'task cũ không tự đổi vì chuỗi là đối tượng bất biến.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bước Ngoặt Cú Pháp Trong Python 3.12+ (PEP 701)',
      content: `
        <p>Trước phiên bản Python 3.12, bộ phân tích cú pháp (parser) của f-string có nhiều quy định ngặt nghèo gây khó chịu cho lập trình viên. Tuy nhiên, <strong>kể từ Python 3.12 trở đi</strong> (vốn là phiên bản nền tảng của ấn bản sách này), bộ phân tích cú pháp đã được chính thức hóa hoàn toàn (PEP 701), mang lại sự tự do tối đa:</p>

        <ol>
          <li><strong>Dấu nháy lồng nhau tùy ý:</strong> Bạn có thể dùng cùng một loại dấu nháy bên trong biểu thức <code>{}</code> trùng với dấu nháy bao quanh toàn bộ f-string mà không cần đổi sang nháy khác hay dùng dấu gạch chéo ngược. Trước Python 3.12, điều này sẽ gây lỗi cú pháp <code>SyntaxError</code>!</li>
          <li><strong>Cho phép dấu gạch chéo ngược (<code>\\</code>) bên trong <code>{}</code>:</strong> Trước 3.12, viết <code>\\n</code> bên trong <code>{}</code> bị cấm hoàn toàn. Kể từ 3.12+, bạn hoàn toàn có thể viết các phương thức như <code>'\\n'.join(...)</code> trực tiếp trong ngoặc nhọn.</li>
          <li><strong>Hỗ trợ biểu thức nhiều dòng và chú thích (<code>#</code>):</strong> Bạn có thể ngắt dòng biểu thức bên trong cặp <code>{}</code> và chèn các dòng chú thích <code>#</code> giải thích logic một cách thoải mái.</li>
        </ol>

        <p>Nói cách khác, nếu bạn yêu thích f-string, bạn sẽ thấy chúng tỏa sáng và tiện lợi nhất kể từ Python 3.12+!</p>
      `,
      codeExamples: [
        {
          title: 'Khảo sát các điểm mới trong Python 3.12+: Nháy trùng loại, backslash và comment',
          code: `what = 'f-strings'
tool = 'Python'

# 1. Dấu nháy lồng nhau cùng loại (hợp lệ từ Python 3.12+)
# Nháy đơn bao ngoài, nháy đơn '!' bên trong {}
res1 = f'Learning {what + "!"}'
print("res1:", res1)

# 2. Dấu gạch chéo ngược \\n và \\x21 trực tiếp trong {} (Python 3.12+)
res2 = f"{\\'\\\\n\\'.join([what] * 3) + chr(0x21)}"
print("res2:\\n" + f"{'\\n'.join([what] * 2)}")

# 3. Biểu thức ngắt dòng và có chú thích # bên trong {}
res3 = f'Learning {
    what.upper() + "!"  # Viết hoa và thêm dấu chấm than
} in {tool + str(3.12)}'
print("res3:", res3)`,
          output: `res1: Learning f-strings!
res2:
f-strings
f-strings
res3: Learning F-STRINGS! in Python3.12`,
          annotations: [
            { line: 6, text: 'Python 3.12+ xử lý biểu thức {} độc lập hoàn toàn với chuỗi bao ngoài.' },
            { line: 15, text: 'Biểu thức trong {} được ngắt nhiều dòng và có comment # hợp lệ trong 3.12+.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
      title: 'Tối Ưu Mã In: Đừng Lạm Dụng F-String Không Cần Thiết',
      content: `Mark Lutz lưu ý: Không có lý do gì để dùng một f-string cho những lệnh in đơn giản chỉ phân cách nhau bằng dấu cách! Viết print(a, b, c) vừa chạy nhanh hơn vừa sạch sẽ hơn nhiều so với việc viết print(f"{a} {b} {c}"). Chỉ dùng f-string khi bạn cần định dạng phức tạp hoặc nối văn bản liền mạch.`
      }
    ],
    pitfalls: [
      {
      title: 'Tương Thích Ngược Với Python 3.11 Trở Về Trước',
      content: `Nếu dự án của bạn cần chạy trên các máy chủ cũ cài Python 3.8 - 3.11, hãy cẩn thận tránh dùng dấu nháy lồng cùng loại hoặc backslash trong {}. Thay vào đó, hãy dùng nháy kép ngoài, nháy đơn trong (ví dụ: f"Value: {data['name']}") để đảm bảo chạy tốt trên mọi phiên bản.`
      }
    ]
  },

  exercises: [
    {
      id: 'ex-1',
      title: 'Ứng dụng f-string nội suy biểu thức phức hợp',
      question: 'Cho biến shopping_cart = [("Táo", 3, 15000), ("Cam", 2, 20000)]. Hãy dùng một f-string duy nhất lặp qua phần tử đầu tiên để in ra chuỗi thông báo: "Mặt hàng: TÁO | Tổng tiền: 45,000 VNĐ" (tên mặt hàng viết hoa toàn bộ bằng .upper(), tổng tiền tính bằng phép nhân số lượng * đơn giá và định dạng phân cách hàng nghìn bằng dấu phẩy).',
      starterCode: `shopping_cart = [("Táo", 3, 15000), ("Cam", 2, 20000)]
item = shopping_cart[0]

# Viết biểu thức f-string ở đây:
# message = ...
# print(message)
`,
      solution: `shopping_cart = [("Táo", 3, 15000), ("Cam", 2, 20000)]
item = shopping_cart[0]

message = f"Mặt hàng: {item[0].upper()} | Tổng tiền: {item[1] * item[2]:,} VNĐ"
print(message)`,
      hints: [
        'Dùng item[0].upper() trong {} để viết hoa tên mặt hàng.',
        'Dùng {item[1] * item[2]:,} để vừa tính phép nhân vừa kích hoạt cờ phân cách hàng nghìn bằng dấu phẩy.'
      ]
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về f-string trong Python?',
      options: [
        'F-string được tính toán ngay tại thời điểm biên dịch mã nguồn sang bytecode.',
        'F-string có thể kết hợp với tiền tố byte b (ví dụ bf"...") để định dạng dữ liệu nhị phân.',
        'F-string có thể được sử dụng làm docstring cho hàm và module để hệ thống trích xuất __doc__.',
        'F-string là biểu thức đánh giá tại thời gian chạy (runtime) và chỉ áp dụng cho chuỗi văn bản str, không áp dụng cho byte.'
      ],
      answer: 3,
      explanation: 'F-string thực hiện tại thời gian chạy (runtime expression), tạo ra đối tượng str và không thể kết hợp với tiền tố b (byte).'
    },
    {
      question: 'Cú pháp nào sau đây là tính năng mới ĐƯỢC PHÉP kể từ Python 3.12+ (PEP 701)?',
      options: [
        'Nhúng dấu nháy cùng loại với dấu nháy bao ngoài f-string bên trong biểu thức {}.',
        'Sử dụng dấu gạch chéo ngược \\ bên trong cặp dấu {}.',
        'Ngắt dòng và chèn dòng chú thích # bên trong cặp dấu {}.',
        'Tất cả các phương án trên đều đúng.'
      ],
      answer: 3,
      explanation: 'PEP 701 trong Python 3.12 đã chính thức hóa bộ phân tích f-string, cho phép nháy lồng cùng loại, sử dụng ký tự thoát backslash, và xuống dòng kèm chú thích # tự do bên trong {}.'
    }
  ],

  summary: {
    takeaways: [
      'f-string (Python 3.6+) thực hiện phép nội suy chuỗi (string interpolation), nhúng trực tiếp biểu thức vào chuỗi.',
      'F-string là mã thực thi thời gian chạy, tạo ra đối tượng chuỗi str mới, không thể dùng làm docstring.',
      'Hỗ trợ kết hợp tiền tố rf / fr (chuỗi thô định dạng), nhưng cấm kết hợp với b (byte) hay u.',
      'Python 3.12+ mang lại cải tiến vượt bậc (PEP 701): hỗ trợ nháy trùng loại bên trong {}, hỗ trợ dấu gạch chéo ngược, ngắt dòng và ghi chú thích # trong cặp ngoặc nhọn.'
    ],
    nextSteps: 'Trong bài tiếp theo (C7.19), chúng ta sẽ khám phá các tính năng định dạng nâng cao của f-string: cờ tự gán nhãn gỡ lỗi (=), cờ chuyển đổi (!s/!r/!a), formatspec lồng nhau động và so sánh với phương thức.'
  }
};
