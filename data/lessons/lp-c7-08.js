export default {
  id: 'lp-c7-08',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.8',
  title: 'Chuyển đổi kiểu chuỗi: Số học (int/float/str/eval) & Mã ký tự (ord/chr)',
  subtitle: 'Triết lý từ chối phỏng đoán, chuyển đổi giữa chuỗi và số, hàm eval() và rủi ro, chuyển đổi mã ký tự với ord()/chr()',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thấu suốt triết lý thiết kế của Python: "Từ chối sự cám dỗ của việc phỏng đoán" khi xử lý kiểu dữ liệu chuỗi và số.',
    'Thành thạo các hàm chuyển đổi kiểu dữ liệu cơ bản: int(), float(), str() để chủ động ép kiểu trong biểu thức.',
    'Hiểu cơ chế và rủi ro bảo mật của hàm eval(), so sánh hiệu năng và độ an toàn với int() và float().',
    'Làm chủ cặp hàm chuyển đổi mã ký tự ord() và chr(), nguyên lý code point Unicode và kỹ thuật số học trên ký tự.'
  ],

  intuition: {
    title: 'Người thông dịch minh bạch và bảng tra cứu mật mã',
    metaphor: 'Trong một số ngôn ngữ như JavaScript hay PHP, nếu bạn viết \'62\' + 1, ngôn ngữ sẽ cố gắng "đoán mò" xem bạn muốn gì: nó có thể tự biến số 1 thành chuỗi \'1\' rồi ghép thành \'621\', hoặc biến chuỗi \'62\' thành số 62 để tính ra 63. Sự đoán mò này thường tạo ra những lỗi ngầm vô cùng tai hại. Python từ chối trò ảo thuật đó: nó dừng lại và yêu cầu bạn phải tuyên bố rõ ràng bằng lời. Nếu bạn muốn số học, hãy dùng int(\'62\') + 1; nếu muốn nối chữ, hãy dùng \'62\' + str(1). Ở tầng sâu hơn, mỗi ký tự chữ cũng có một con số bí mật đại diện cho nó trong RAM: hàm ord() giống như người lật cuốn sổ mã Unicode để tìm ra con số định danh đó, còn chr() nhận con số đó và hô biến nó trở lại thành hình dạng chữ cái.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CHUYỂN ĐỔI CHUỖI ⇄ SỐ & KÝ TỰ ⇄ MÃ ĐỊNH DANH (CODE POINT)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Chuỗi ⇄ Số Học</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.7;">
              <code>int('62')</code> ➔ Số nguyên <code>62</code><br>
              <code>float('1.5')</code> ➔ Số thực <code>1.5</code><br>
              <code>str(62)</code> ➔ Chuỗi <code>'62'</code><br>
              <span style="color:var(--success);">✓ Rõ ràng, an toàn, không đoán mò</span>
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Ký tự ⇄ Mã Code Point</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.7;">
              <code>ord('h')</code> ➔ <code>104</code> (Mã Unicode)<br>
              <code>chr(104)</code> ➔ <code>'h'</code> (Nghịch đảo)<br>
              <code>chr(ord('5') + 1)</code> ➔ <code>'6'</code><br>
              <span style="color:var(--warning);">⚡ Số học trên ký tự qua mã số</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Triết lý Thiết kế: Từ chối Sự Cám dỗ của việc Phỏng đoán',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 18 / 52 – Trang 20 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Một trong những phương châm thiết kế nổi tiếng nhất của ngôn ngữ Python là:</p>
        <blockquote>
          <p><strong>"Từ chối sự cám dỗ của việc phỏng đoán" (Refuse the temptation to guess).</strong></p>
        </blockquote>

        <p>Là một ví dụ điển hình, bạn không thể cộng một số và một chuỗi lại với nhau trong Python, ngay cả khi chuỗi đó trông giống hệt như một số (toàn bộ là các chữ số):</p>
        <pre class="code-pre"><code>>>> '62' + 1
TypeError: can only concatenate str (not "int") to str</code></pre>

        <p>Đây là chủ đích thiết kế có chủ quyền: vì toán tử <code>+</code> có thể mang nghĩa là cả phép cộng số học lẫn phép nối chuỗi, nên lựa chọn tự động chuyển đổi kiểu sẽ gây mơ hồ nghiêm trọng—bạn đang muốn nhận được kết quả chuỗi <code>'621'</code> hay số nguyên <code>63</code>? Thay vì tự ý quyết định thay bạn, Python xem điều này là một lỗi. Trong Python, các yếu tố "ma thuật" nhìn chung bị lược bỏ nếu chúng làm cho công việc viết mã trở nên phức tạp và khó đoán định hơn.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Các Hàm Chuyển đổi Kiểu Tường minh: int, float, str & eval',
      content: `
        <p>Vậy phải làm gì nếu tập lệnh của bạn nhận được một con số dưới dạng một chuỗi văn bản từ một tệp tin hoặc từ giao diện người dùng? Bí quyết là bạn chỉ cần sử dụng các công cụ chuyển đổi trước khi có thể thao tác với chuỗi như một số, hoặc ngược lại:</p>
        <ul>
          <li><strong>Hàm <code>int(S)</code>:</strong> Chuyển đổi một chuỗi văn bản chứa các chữ số nguyên thành đối tượng số nguyên.</li>
          <li><strong>Hàm <code>float(S)</code>:</strong> Chuyển đổi một chuỗi văn bản chứa số thập phân thành số thực dấu phẩy động.</li>
          <li><strong>Hàm <code>str(X)</code>:</strong> Chuyển đổi một số (hoặc bất kỳ đối tượng nào) thành dạng biểu diễn chuỗi của nó (hình thức khi được in ra).</li>
        </ul>

        <p>Giờ đây, bạn có thể tự mình chủ động ép thực hiện phép cộng số hoặc phép nối chuỗi một cách tường minh:</p>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi kiểu tường minh với int(), float() và str()',
          code: `S = '62'
I = 1

# Ép thực hiện phép cộng số nguyên:
int_sum = int(S) + I
print("int(S) + I =", int_sum, "| Kiểu:", type(int_sum).__name__)

# Ép thực hiện phép nối chuỗi:
str_concat = S + str(I)
print("S + str(I) =", repr(str_concat), "| Kiểu:", type(str_concat).__name__)

# Chuyển đổi với số thực dấu phẩy động:
f_sum = float('1.5') + 2.8
f_concat = '1.5' + str(2.8)
print("float('1.5') + 2.8 =", f_sum)
print("'1.5' + str(2.8) =", repr(f_concat))`,
          output: `int(S) + I = 63 | Kiểu: int
S + str(I) = '621' | Kiểu: str
float('1.5') + 2.8 = 4.3
'1.5' + str(2.8) = '1.52.8'`,
          annotations: [
            { line: 5, text: 'int(S) biến chuỗi \'62\' thành số 62 để cộng với 1 ra 63.' },
            { line: 9, text: 'str(I) biến số 1 thành chuỗi \'1\' để ghép với \'62\' thành \'621\'.' },
            { line: 13, text: 'float(\'1.5\') biến chuỗi thành số thực 1.5 để cộng số học.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. So sánh Hàm eval() với int() và float()',
      content: `
        <p>Hàm dựng sẵn <code>eval()</code> được giới thiệu ở Chương 5 có khả năng chạy một chuỗi chứa mã biểu thức Python tùy ý, và do đó nó cũng có thể chuyển đổi một chuỗi thành bất kỳ loại đối tượng nào (ví dụ <code>eval('62')</code> trả về số nguyên 62, <code>eval('[1, 2, 3]')</code> trả về danh sách).</p>

        <p>Tuy nhiên, các hàm chuyên biệt <code>int()</code> và <code>float()</code> có những ưu thế áp đảo:</p>
        <ol>
          <li><strong>Tốc độ thực thi:</strong> Nhanh hơn đáng kể vì chúng được tối ưu hóa trực tiếp bằng ngôn ngữ C chỉ để phân tích các chữ số mà không phải kích hoạt toàn bộ trình phân tích cú pháp Python (parser).</li>
          <li><strong>Độ an toàn bảo mật:</strong> Tuyệt đối an toàn. Hàm <code>eval()</code> chấp nhận mọi biểu thức mã tùy ý; nếu người dùng nhập vào chuỗi độc hại (như lệnh xóa tệp hệ thống), <code>eval()</code> sẽ thực thi lệnh đó ngay lập tức.</li>
        </ol>
      `,
      codeExamples: []
    },
    {
      id: 'sec-4',
      title: '4. Chuyển đổi Mã Ký tự: Bộ đôi ord() và chr()',
      content: `
        <p>Về chủ đề chuyển đổi, ta cũng có thể chuyển đổi một ký tự đơn lẻ thành <strong>mã số nguyên bên dưới của nó</strong> bằng cách truyền nó vào hàm dựng sẵn <strong><code>ord()</code></strong>—hàm này trả về giá trị số thứ tự (<em>"ordinal"</em>) dùng để biểu diễn ký tự tương ứng trong bộ nhớ (về mặt kỹ thuật, đó là <strong>code point Unicode</strong> của nó).</p>

        <p>Hàm dựng sẵn <strong><code>chr()</code></strong> thực hiện thao tác nghịch đảo hoàn hảo: nhận một mã số nguyên và chuyển đổi nó thành ký tự chuỗi tương ứng:</p>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi ký tự sang code point bằng ord() và ngược lại bằng chr()',
          code: `# Ký tự => Mã định danh ID (code point)
code_h = ord('h')
print("ord('h') =", code_h)

# Mã định danh ID => Ký tự chuỗi
char_h = chr(104)
print("chr(104) =", repr(char_h))

# Duyệt và in tất cả các code point trong chuỗi 'hack'
print("\\nTất cả code point trong 'hack':")
for c in 'hack':
    print(f"Ký tự '{c}' => code point {ord(c)}")`,
          output: `ord('h') = 104
chr(104) = 'h'

Tất cả code point trong 'hack':
Ký tự 'h' => code point 104
Ký tự 'a' => code point 97
Ký tự 'c' => code point 99
Ký tự 'k' => code point 107`,
          annotations: [
            { line: 2, text: 'ord(\'h\') trả về 104 (mã ASCII / Unicode của chữ h thường).' },
            { line: 6, text: 'chr(104) thực hiện phép chuyển đổi nghịch đảo trở lại ký tự \'h\'.' },
            { line: 11, text: 'Vòng lặp lấy mã số định danh của từng ký tự trong chuỗi.' }
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      title: '5. Số học trên Ký tự qua ord/chr & So sánh Ký tự',
      content: `
        <p>Bộ đôi <code>ord</code> và <code>chr</code> không chỉ để tra cứu mà còn có thể dùng để thực hiện một dạng <strong>tính toán số học đơn giản dựa trên chuỗi</strong>. Chẳng hạn, để tiến tới ký tự tiếp theo trong bảng chữ cái hoặc bảng chữ số, bạn chỉ việc chuyển đổi sang số nguyên, cộng thêm 1, rồi chuyển ngược lại:</p>
        <pre class="code-pre"><code>>>> S = '5'
>>> S = chr(ord(S) + 1)
>>> S
'6'</code></pre>

        <p>Ít nhất là đối với các chuỗi gồm một ký tự, điều này cung cấp một giải pháp thay thế thông minh cho việc dùng hàm <code>int()</code> để chuyển đổi từ ký tự chữ số sang số nguyên: bằng cách lấy hiệu số thứ tự giữa ký tự đó và ký tự <code>'0'</code>:</p>
        <pre class="code-pre"><code>>>> ord('5') - ord('0')
5</code></pre>
      `,
      codeExamples: [
        {
          title: 'Tính toán số học trên ký tự và trích xuất giá trị chữ số',
          code: `ch = '5'

# Tăng ký tự số lên 1 đơn vị
next_ch = chr(ord(ch) + 1)
print(f"Ký tự '{ch}' sau khi +1 thành: '{next_ch}'")

# Chuyển đổi chữ số sang int bằng phép trừ khoảng cách code point
digit_val = ord('5') - ord('0')
print("ord('5') - ord('0') =", digit_val)
print("So sánh với int('5'):", digit_val == int('5'))`,
          output: `Ký tự '5' sau khi +1 thành: '6'
ord('5') - ord('0') = 5
So sánh với int('5'): True`,
          annotations: [
            { line: 4, text: 'ord(\'5\') là 53, cộng 1 thành 54, chr(54) cho ra ký tự \'6\'.' },
            { line: 8, text: 'Trong bảng mã ASCII/Unicode, các chữ số 0-9 được sắp xếp liên tiếp (48 đến 57).' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mã ASCII vs Code Point Unicode',
        content: 'Với các ký tự tiếng Anh tiêu chuẩn (code point từ 0 đến 127), giá trị của <code>ord()</code> hoàn toàn trùng khớp với bảng mã ASCII truyền thống. Với các ký tự quốc tế hay tiếng Việt (như <code>ord(\'ă\') = 259</code>, <code>ord(\'Đ\') = 272</code>), hàm <code>ord()</code> trả về chính xác số thứ tự code point trong không gian Unicode toàn cầu.'
      }
    ],
    pitfalls: [
      {
        title: 'Hàm ord() chỉ nhận chuỗi gồm đúng 1 ký tự',
        content: 'Nếu bạn truyền một chuỗi có độ dài khác 1 vào hàm <code>ord()</code> (ví dụ: <code>ord(\'ab\')</code> hoặc <code>ord(\'\')</code>), Python sẽ lập tức báo lỗi <code>TypeError: ord() expected a character, but string of length ... found</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Mã hóa và giải mã văn bản theo mật mã Caesar đơn giản',
      level: 'Vừa',
      problem: 'Hãy viết hai hàm đơn giản: caesar_encrypt(text, shift=3) và caesar_decrypt(cipher, shift=3) sử dụng bộ đôi ord() và chr() để dịch chuyển từng ký tự trong chuỗi đi một khoảng shift nhất định, sau đó giải mã ngược lại.',
      hint: 'Dùng list comprehension hoặc vòng lặp: chr(ord(c) + shift) để mã hóa và chr(ord(c) - shift) để giải mã.',
      solutionCode: `def caesar_encrypt(text, shift=3):
    return ''.join(chr(ord(c) + shift) for c in text)

def caesar_decrypt(cipher, shift=3):
    return ''.join(chr(ord(c) - shift) for c in cipher)

original = "Python 3.14"
encrypted = caesar_encrypt(original, shift=3)
decrypted = caesar_decrypt(encrypted, shift=3)

print("Văn bản gốc:", original)
print("Sau khi mã hóa Caesar:", encrypted)
print("Sau khi giải mã:", decrypted)
print("Khôi phục chính xác?", original == decrypted)`,
      solutionOutput: `Văn bản gốc: Python 3.14
Sau khi mã hóa Caesar: S|wkrq#6147
Sau khi giải mã: Python 3.14
Khôi phục chính xác? True`,
      explanation: 'Sử dụng ord() để chuyển ký tự sang mã số nguyên rồi cộng/trừ độ dời shift, sau đó dùng chr() chuyển ngược lại thành ký tự. Đây là minh chứng tuyệt vời cho ứng dụng của số học trên ký tự.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây giải thích ĐÚNG NHẤT vì sao Python không cho phép \'62\' + 1?',
      options: [
        'Vì bộ nhớ CPython không hỗ trợ lưu trữ số và chuỗi trong cùng một tập lệnh.',
        'Vì Python từ chối sự cám dỗ của việc phỏng đoán: phép cộng mơ hồ giữa số học (63) và nối chuỗi (\'621\').',
        'Vì Python thiếu toán tử chuyển đổi kiểu ngầm định của C.',
        'Vì toán tử + chỉ được định nghĩa riêng cho chuỗi văn bản.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz khẳng định triết lý cốt lõi của Python là "từ chối phỏng đoán". Python không tự ý chọn giữa phép cộng 63 hay nối chuỗi \'621\', mà buộc người lập trình phải viết rõ ràng ý định của mình.'
    },
    {
      question: 'Kết quả của biểu thức chr(ord(\'A\') + 2) trong Python là gì?',
      options: [
        '\'A2\'',
        '67',
        '\'C\'',
        '\'B\''
      ],
      correctIndex: 2,
      explanation: 'ord(\'A\') trả về 65. Cộng thêm 2 là 67. Hàm chr(67) chuyển mã số nguyên 67 thành ký tự tương ứng trong bảng mã, chính là chữ cái in hoa \'C\'.'
    }
  ],

  summary: [
    'Python từ chối sự cám dỗ của việc phỏng đoán: cấm tự ép kiểu cộng lẫn số và chuỗi (\'62\' + 1 gây TypeError).',
    'Dùng int(S) và float(S) để chuyển chuỗi thành số; dùng str(X) để chuyển số thành chuỗi.',
    'Hàm eval(S) chạy biểu thức tổng quát nhưng chậm hơn và tiềm ẩn nguy cơ bảo mật nghiêm trọng so với int/float.',
    'ord(C) trả về mã số nguyên (code point) của ký tự; chr(I) chuyển mã số nguyên trở lại thành ký tự.',
    'Bộ đôi ord/chr hỗ trợ thực hiện các phép tính số học trực tiếp trên ký tự (như chr(ord(S) + 1)).'
  ]
};
