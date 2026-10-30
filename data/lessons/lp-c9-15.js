export default {
  id: 'lp-c9-15',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.15',
  title: 'Kiểm tra kiến thức Phần II (Bài 1): Thử nghiệm tương tác 9 nhóm thao tác kiểu dữ liệu cơ bản',
  subtitle: 'Lời mở đầu bài tập tổng kết Phần II, thực nghiệm tương tác trên REPL toàn bộ 9 nhóm biểu thức kiểm thử kinh điển của Mark Lutz trang 45',
  level: 'Cơ bản đến Nâng cao',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Khởi động Phần bài tập thực hành tổng kết Phần II (Trang 44–48): hiểu rõ triết lý học tập của Mark Lutz — "Lập trình là một hoạt động thực hành, và không có gì thay thế được việc tự mình viết mã những gì đã đọc".',
    'Thực nghiệm và giải thích cặn kẽ 9 nhóm biểu thức kiểm thử tương tác trên REPL trong Bài tập 1:',
    'Nhóm 1 & 2 (Số học): phép lũy thừa số nguyên lớn (2 ** 16), phép chia dấu phẩy động tự động trong Python 3 (2 / 5), và việc dấu phẩy tạo ra tuple.',
    'Nhóm 3 & 4 (Chuỗi & Định dạng): ghép nối, nhân bản, cắt lát chuỗi, và so sánh 3 thế hệ định dạng chuỗi (% formatting, str.format, f-strings).',
    'Nhóm 5 & 6 (Tuple & List): đánh chỉ mục tuple một phần tử, cắt lát biên ([2:4], [:0], [-2:]), thay đổi tại chỗ với reverse() và sort(), tra cứu index().',
    'Nhóm 7 & 8 (Dictionary & Truthiness): đánh chỉ mục theo khóa, gán khóa mới, khóa dạng tuple bất biến D[(1, 2, 3)], view keys/values, và danh sách các cấu trúc rỗng falsy.'
  ],

  intuition: {
    title: 'Phòng thí nghiệm thử tải tổng hợp trên bệ phóng',
    metaphor: 'Trong ngành kỹ thuật hàng không vũ trụ, trước khi một tên lửa được phóng lên quỹ đạo (bước sang Phần III về cú pháp câu lệnh và cấu trúc điều khiển), các kỹ sư phải đưa từng khối module vào phòng thử tải: kiểm tra động cơ nhiên liệu (số học), lớp vỏ chịu nhiệt (chuỗi ký tự), khoang chứa hàng hóa biến đổi (list), hệ thống bảng định tuyến tín hiệu (dictionary), và khóa van an toàn (tuple). Bài tập 1 trong phần tổng kết này chính là một bài test thử tải toàn diện gồm 9 trạm kiểm định: mỗi biểu thức bạn gõ vào REPL sẽ làm sáng tỏ một góc khuất tinh tế trong cơ chế vận hành bên dưới của Python!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">9 NHÓM BIỂU THỨC THỰC NGHIỆM TRÊN REPL (BÀI TẬP 1 - TRANG 45)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:#10b981;">Trạm 1: Số học & Dấu phẩy</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;"><code>2 ** 16</code> ➔ 65536<br><code>2 / 5, 2 / 5.0</code> ➔ Tuple (0.4, 0.4)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:#3b82f6;">Trạm 2: Chuỗi & 3 Kiểu Format</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;"><code>S[0], S[:0], S[1:]</code><br>Toán tử %, .format(), f-strings</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:#f59e0b;">Trạm 3: List & Thay đổi tại chỗ</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">Slicing biên, <code>reverse()</code>, <code>sort()</code>, <code>index(4)</code></div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;">
            <div style="font-weight:700;color:#8b5cf6;">Trạm 4: Dict Khóa Tuple & Falsy</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;"><code>D[(1, 2, 3)] = 4</code><br><code>[[], ['', [], (), {}, None]]</code></div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Khởi Động Phần Bài Tập Thực Hành Cuối Phần II',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 44 / 48 – Trang 45 / 48</strong>.</p>
          </div>
        </div>

        <p>Phần thực hành này yêu cầu bạn bắt tay vào viết mã thực tế với các nguyên lý nền tảng của các đối tượng dựng sẵn mà bạn đã tích lũy qua toàn bộ Phần II (từ Chương 4 đến Chương 9). Tác giả Mark Lutz nhấn mạnh:</p>

        <blockquote>
          <p><em>"Lập trình là một hoạt động thực hành, và không có gì thay thế được việc tự mình viết mã những gì đã đọc để giúp các ý tưởng kết tinh vững chắc."</em></p>
        </blockquote>

        <p>Lưu ý kỹ thuật trước khi bắt đầu thử nghiệm trên REPL:</p>
        <ul>
          <li><strong>Dấu chấm phẩy <code>;</code>:</strong> Trong một số biểu thức dưới đây, dấu chấm phẩy được dùng như một dấu phân cách câu lệnh, nhằm gom nhiều câu lệnh trên một dòng duy nhất (ví dụ: <code>X=1; X</code> gán rồi sau đó in ra biến <code>X</code>).</li>
          <li><strong>Dấu phẩy tạo tuple:</strong> Dấu phẩy đặt giữa các biểu thức luôn tạo ra một tuple, ngay cả khi không có dấu ngoặc đơn bao bọc: biểu thức <code>X, Y, Z</code> tạo ra một tuple ba phần tử mà Python sẽ in lại cho bạn trong cặp ngoặc đơn.</li>
        </ul>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Nhóm 1 & 2: Số Học (Lũy Thừa, Phép Chia Dấu Phẩy Động & Dấu Phẩy Tạo Tuple)',
      content: `
        <p>Hai nhóm biểu thức đầu tiên kiểm tra kiến thức về toán tử số học và phân biệt phép chia trong Python 3:</p>
        <ul>
          <li><code>2 ** 16</code>: Toán tử lũy thừa <code>**</code> tính $2^{16} = 65,536$. Kiểu số nguyên <code>int</code> trong Python có độ chính xác vô hạn, tự động mở rộng theo nhu cầu bộ nhớ.</li>
          <li><code>2 / 5, 2 / 5.0</code>: Trong Python 3, toán tử <code>/</code> luôn là <strong>phép chia thực (true division)</strong>, luôn trả về kết quả số thực <code>float</code> kể cả khi cả hai toán hạng đều là số nguyên. Vì có dấu phẩy đặt giữa hai phép tính, Python tự động đóng gói cả hai kết quả thành một <strong>tuple gồm 2 phần tử</strong>: <code>(0.4, 0.4)</code>!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Nhóm 1 & 2: Lũy thừa và phép chia tạo Tuple',
          code: `# Nhóm 1: Toán tử lũy thừa
pow_res = 2 ** 16
print("2 ** 16 =", pow_res)

# Nhóm 2: Phép chia thực và dấu phẩy tạo tuple
div_tuple = 2 / 5, 2 / 5.0
print("2 / 5, 2 / 5.0 =", div_tuple)
print("Kiểu của kết quả phép chia ghép phẩy:", type(div_tuple).__name__)`,
          output: `2 ** 16 = 65536
2 / 5, 2 / 5.0 = (0.4, 0.4)
Kiểu của kết quả phép chia ghép phẩy: tuple`,
          annotations: [
            { line: 2, text: '2 ** 16 tính lũy thừa nhị phân 16-bit = 65536.' },
            { line: 6, text: 'Dấu phẩy không có ngoặc đơn tự động tạo ra một tuple (0.4, 0.4).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Nhóm 3, 4 & 5: Chuỗi, Ba Thế Hệ Định Dạng & Đánh Chỉ Mục Tuple',
      content: `
        <p>Ba nhóm tiếp theo khảo sát các thao tác trên chuỗi và tuple:</p>
        <ul>
          <li><code>'hack' + 'code'</code>: Phép ghép nối chuỗi tạo thành <code>'hackcode'</code>.</li>
          <li><code>S = 'Python'; 'grok ' + S; S * 5</code>: Ghép chuỗi tạo <code>'grok Python'</code>; nhân bản chuỗi lặp lại 5 lần.</li>
          <li><code>S[0], S[:0], S[1:]</code>: <code>S[0]</code> lấy ký tự đầu <code>'P'</code>; <code>S[:0]</code> cắt từ đầu đến trước offset 0 trả về chuỗi rỗng <code>''</code>; <code>S[1:]</code> cắt bỏ ký tự đầu trả về <code>'ython'</code>. Cả ba kết quả được gom thành tuple <code>('P', '', 'ython')</code>!</li>
          <li><strong>Ba thế hệ định dạng chuỗi:</strong>
            <br>• Cũ: <code>'coding %s is %s!' % (S, how)</code> (toán tử %)
            <br>• Hiện đại: <code>'coding {} is {}!'.format(S, how)</code> (phương thức str.format)
            <br>• Chuẩn mực mới: <code>f'coding {S} is {how}!'</code> (f-strings)
          </li>
          <li><code>('x',)[0]</code> và <code>('x', 'y')[1]</code>: Đánh chỉ mục trên literal tuple. <code>('x',)[0]</code> trả về <code>'x'</code>; <code>('x', 'y')[1]</code> trả về <code>'y'</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Nhóm 3, 4, 5: Chuỗi, Định dạng và Đánh chỉ mục Tuple',
          code: `# Nhóm 3: Thao tác chuỗi cơ bản
S = 'Python'
print("Ghép chuỗi:", 'hack' + 'code')
print("Grok + S:", 'grok ' + S)
print("Nhân bản S * 5:", S * 5)
print("Slicing biên S[0], S[:0], S[1:]:", (S[0], S[:0], S[1:]))

# Nhóm 4: Ba thế hệ định dạng chuỗi
how = 'fun'
fmt_percent = 'coding %s is %s!' % (S, how)
fmt_method  = 'coding {} is {}!'.format(S, how)
fmt_fstring = f'coding {S} is {how}!'
print("Format %:", fmt_percent)
print("Format .format():", fmt_method)
print("Format f-string:", fmt_fstring)

# Nhóm 5: Đánh chỉ mục trên tuple
tup1_item = ('x',)[0]
tup2_item = ('x', 'y')[1]
print("('x',)[0] =", repr(tup1_item), "| ('x', 'y')[1] =", repr(tup2_item))`,
          output: `Ghép chuỗi: hackcode
Grok + S: grok Python
Nhân bản S * 5: PythonPythonPythonPythonPython
Slicing biên S[0], S[:0], S[1:]: ('P', '', 'ython')
Format %: coding Python is fun!
Format .format(): coding Python is fun!
Format f-string: coding Python is fun!
('x',)[0] = 'x' | ('x', 'y')[1] = 'y'`,
          annotations: [
            { line: 6, text: 'S[:0] trích xuất lát cắt rỗng từ 0 đến 0: chuỗi rỗng \'\'.' },
            { line: 11, text: 'Cả 3 kỹ thuật format đều sinh ra chuỗi đồng nhất \'coding Python is fun!\'.' },
            { line: 17, text: '(\'x\',)[0] trích xuất phần tử duy nhất từ tuple một phần tử.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. Nhóm 6: Thao Tác Dãy Tuần Tự Toàn Diện Với List',
      content: `
        <p>Nhóm thứ 6 là bài kiểm tra sát hạch toàn diện nhất về kiểu dữ liệu List:</p>
        <ul>
          <li><code>L = [1, 2, 3] + [4, 5, 6]</code>: Ghép nối hai list thành <code>[1, 2, 3, 4, 5, 6]</code>.</li>
          <li><code>L, L[:], L[:0], L[-2], L[-2:]</code>:
            <br>• <code>L</code>: list gốc <code>[1, 2, 3, 4, 5, 6]</code>
            <br>• <code>L[:]</code>: bản sao nông của toàn bộ list
            <br>• <code>L[:0]</code>: lát cắt rỗng <code>[]</code>
            <br>• <code>L[-2]</code>: phần tử thứ hai tính từ cuối lên: số <code>5</code>
            <br>• <code>L[-2:]</code>: hai phần tử cuối cùng: <code>[5, 6]</code>
          </li>
          <li><code>([1, 2, 3] + [4, 5, 6])[2:4]</code>: Ghép nối tạo list tạm thời rồi cắt lát từ offset 2 đến trước 4: thu được <code>[3, 4]</code>.</li>
          <li><code>[L[2], L[3]]</code>: Trích xuất hai phần tử đơn lẻ và đóng gói vào một list mới: <code>[3, 4]</code>.</li>
          <li><code>L.reverse(); L</code>: Đảo ngược list tại chỗ; trả về <code>[6, 5, 4, 3, 2, 1]</code>.</li>
          <li><code>L.sort(); L</code>: Sắp xếp list tại chỗ; trả về <code>[1, 2, 3, 4, 5, 6]</code>.</li>
          <li><code>L.index(4)</code>: Tìm chỉ mục của số 4; trả về <code>3</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Nhóm 6: Thao tác toàn diện trên List',
          code: `L = [1, 2, 3] + [4, 5, 6]
print("L sau khi ghép nối:", L)
print("Các biến thể slicing L, L[:], L[:0], L[-2], L[-2:]:")
print((L, L[:], L[:0], L[-2], L[-2:]))

print("Cắt lát trên biểu thức ghép nối [2:4]:", ([1, 2, 3] + [4, 5, 6])[2:4])
print("Tạo list từ hai phần tử [L[2], L[3]]:", [L[2], L[3]])

# Thao tác in-place: reverse và sort
L.reverse()
print("L sau khi reverse():", L)
L.sort()
print("L sau khi sort():", L)
print("L.index(4):", L.index(4))`,
          output: `L sau khi ghép nối: [1, 2, 3, 4, 5, 6]
Các biến thể slicing L, L[:], L[:0], L[-2], L[-2:]:
([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], [], 5, [5, 6])
Cắt lát trên biểu thức ghép nối [2:4]: [3, 4]
Tạo list từ hai phần tử [L[2], L[3]]: [3, 4]
L sau khi reverse(): [6, 5, 4, 3, 2, 1]
L sau khi sort(): [1, 2, 3, 4, 5, 6]
L.index(4): 3`,
          annotations: [
            { line: 4, text: 'L[-2] trả về số nguyên 5, trong khi L[-2:] trả về sublist [5, 6].' },
            { line: 10, text: 'L.reverse() biến đổi tại chỗ, không tạo list mới.' },
            { line: 14, text: 'L.index(4) tìm thấy số 4 ở offset 3 trong list đã sort.' }
          ]
        }
      ]
    },
    {
      id: 'sec-5',
      title: '5. Nhóm 7 & 8: Dictionary (Khóa Tuple, View) & Cấu Trúc Rỗng Falsy',
      content: `
        <p>Hai nhóm biểu thức cuối cùng khảo sát các khía cạnh chuyên sâu về Dictionary và tính chân lý của cấu trúc lồng nhau:</p>
        <ul>
          <li><code>{'a': 1, 'b': 2}['b']</code>: Tra cứu literal dictionary theo khóa <code>'b'</code>: trả về <code>2</code>.</li>
          <li><code>D = {'x': 1, 'y': 2, 'z': 3}; D['w'] = 0; D['x'] + D['w']</code>: Thêm khóa mới <code>'w'</code> gán bằng 0; sau đó cộng giá trị của hai khóa $1 + 0 = 1$.</li>
          <li><code>D[(1, 2, 3)] = 4</code>: <strong>Gán khóa là một Tuple!</strong> Tuple là đối tượng bất biến nên có thể băm (hashable), hoàn toàn hợp lệ khi làm khóa từ điển.</li>
          <li><code>list(D.keys()), list(D.values()), (1, 2, 3) in D</code>: Lấy danh sách khóa, danh sách giá trị, và kiểm tra sự tồn tại của khóa tuple bằng toán tử <code>in</code> (trả về <code>True</code>).</li>
          <li><code>[[]], ["", [], (), {}, None]</code>:
            <br>• <code>[[]]</code>: Một list chứa một list con rỗng bên trong. Độ dài của nó là 1, mang giá trị <strong>True</strong>!
            <br>• <code>["", [], (), {}, None]</code>: Một list chứa toàn bộ các giá trị rỗng/falsy tiêu biểu nhất của Python. Bản thân list này có độ dài 5 phần tử nên mang giá trị <strong>True</strong>!
          </li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Nhóm 7 & 8: Khóa Dict dạng Tuple và các cấu trúc rỗng',
          code: `# Nhóm 7: Dictionary và khóa Tuple
print("Tra cứu literal dict ['b']:", {'a': 1, 'b': 2}['b'])

D = {'x': 1, 'y': 2, 'z': 3}
D['w'] = 0
print("D['x'] + D['w'] =", D['x'] + D['w'])

# Thêm khóa dạng Tuple bất biến
D[(1, 2, 3)] = 4
print("Dictionary D sau khi thêm khóa Tuple:", D)
print("list(D.keys()):", list(D.keys()))
print("list(D.values()):", list(D.values()))
print("(1, 2, 3) in D?", (1, 2, 3) in D)

# Nhóm 8: Cấu trúc lồng nhau và các giá trị Falsy
nested_empty = [[]]
falsy_collection = ["", [], (), {}, None]
print("nested_empty:", nested_empty, "| len:", len(nested_empty), "| bool:", bool(nested_empty))
print("falsy_collection:", falsy_collection, "| len:", len(falsy_collection))
print("Từng phần tử bên trong falsy_collection có bool là gì?")
print([bool(item) for item in falsy_collection])`,
          output: `Tra cứu literal dict ['b']: 2
D['x'] + D['w'] = 1
Dictionary D sau khi thêm khóa Tuple: {'x': 1, 'y': 2, 'z': 3, 'w': 0, (1, 2, 3): 4}
list(D.keys()): ['x', 'y', 'z', 'w', (1, 2, 3)]
list(D.values()): [1, 2, 3, 0, 4]
(1, 2, 3) in D? True
nested_empty: [[]] | len: 1 | bool: True
falsy_collection: ['', [], (), {}, None] | len: 5
Từng phần tử bên trong falsy_collection có bool là gì?
[False, False, False, False, False]`,
          annotations: [
            { line: 9, text: 'D[(1, 2, 3)] = 4 chứng minh tuple bất biến làm khóa dict rất tự nhiên.' },
            { line: 12, text: '(1, 2, 3) in D kiểm tra tra cứu O(1) thành công.' },
            { line: 17, text: 'List [[]] có độ dài 1 (chứa 1 phần tử là []) nên nó là truthy!' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Thực hành gõ trực tiếp trên REPL',
        content: 'Cách nhanh nhất để nhuần nhuyễn các biểu thức này là mở terminal, gõ lệnh <code>python</code> và lần lượt thực thi từng biểu thức của Bảng 1. Quan sát kết quả và đối chiếu với giải thích.'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy [[]] là Truthy!',
        content: 'Đừng nhầm lẫn giữa một list rỗng <code>[]</code> (falsy) và một list chứa list con rỗng <code>[[]]</code>. Biểu thức <code>bool([[]])</code> trả về <strong>True</strong> vì list bên ngoài có độ dài bằng 1!'
      }
    ]
  },

  exercises: [
    {
      title: 'Tự kiểm tra biểu thức kết hợp Slicing và Ghép nối',
      level: 'Vừa',
      problem: 'Cho L = [10, 20, 30, 40, 50]. Không dùng máy tính, hãy dự đoán kết quả của: (1) L[1:4][1:], (2) L[::-1][0], (3) bool(L[:0]). Sau đó viết mã Python để kiểm chứng.',
      hint: 'L[1:4] là [20, 30, 40]; L[:0] là list rỗng [].',
      solutionCode: `L = [10, 20, 30, 40, 50]

res1 = L[1:4][1:]
res2 = L[::-1][0]
res3 = bool(L[:0])

print("L[1:4][1:] =", res1)
print("L[::-1][0] =", res2)
print("bool(L[:0]) =", res3)`,
      solutionOutput: `L[1:4][1:] = [30, 40]
L[::-1][0] = 50
bool(L[:0]) = False`,
      explanation: 'L[1:4] cho ra [20, 30, 40], cắt tiếp [1:] từ vị trí 1 cho ra [30, 40]. L[::-1] đảo ngược list nên phần tử đầu tiên là 50. L[:0] là list rỗng nên bool là False.'
    }
  ],

  quiz: [
    {
      question: 'Biểu thức nào sau đây trả về giá trị boolean FALSE?',
      options: [
        'bool([[]])',
        'bool([0])',
        'bool([None])',
        'bool([])'
      ],
      correctIndex: 3,
      explanation: 'Các danh sách [[]], [0], [None] đều có độ dài bằng 1 (chứa 1 phần tử), do đó chúng là truthy (True). Chỉ có list rỗng [] có độ dài 0 mới là falsy (False).'
    },
    {
      question: 'Khi bạn chạy biểu thức D = {}; D[(1, 2)] = 10; D[[3, 4]] = 20, điều gì sẽ xảy ra?',
      options: [
        'Cả hai phép gán đều thành công, tạo từ điển 2 phần tử.',
        'Phép gán đầu thành công, nhưng phép gán thứ hai báo lỗi TypeError: unhashable type: \'list\'.',
        'Cả hai phép gán đều báo lỗi TypeError.',
        'Dictionary tự động chuyển đổi list [3, 4] thành tuple (3, 4).'
      ],
      correctIndex: 1,
      explanation: 'Tuple (1, 2) là bất biến nên có thể băm (hashable) làm khóa; List [3, 4] là khả biến nên không thể băm, gây ra lỗi TypeError.'
    }
  ],

  summary: [
    'Bài tập 1 tổng kết 9 nhóm thao tác kiểu dữ liệu cơ bản xuyên suốt Phần II của cuốn sách.',
    'Python 3 áp dụng phép chia thực (/) luôn trả về float; dấu phẩy giữa các biểu thức tự động tạo ra một tuple.',
    'Ba thế hệ định dạng chuỗi (%, format, f-strings) cùng cho kết quả tương đương nhưng f-strings là chuẩn mực hiện đại nhất.',
    'List hỗ trợ cắt lát biên linh hoạt và các thao tác thay đổi tại chỗ như reverse() và sort().',
    'Tuple bất biến có thể làm khóa cho Dictionary rất tiện lợi (như ma trận thưa hay tọa độ nhiều chiều).',
    'Mọi cấu trúc rỗng (chuỗi rỗng, list rỗng, dict rỗng, set rỗng) và None đều mang giá trị falsy.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.16), chúng ta sẽ tiếp tục giải quyết Bài tập 2, 3 và 4: Khảo sát các trường hợp biên của Đánh chỉ mục, Cắt lát, câu lệnh del và Phép gán hoán đổi Tuple.'
};
