export default {
  id: 'lp-c9-14',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.14',
  title: 'Tóm tắt Chương 9 & Bộ 6 Câu hỏi Trắc nghiệm Ôn tập kèm Lời giải Chi tiết',
  subtitle: 'Khái quát toàn diện kiến thức cốt lõi Chương 9, chuẩn bị bước sang Phần III (Cú pháp câu lệnh), và giải trọn vẹn bộ 6 câu hỏi kiểm tra kiến thức của Mark Lutz',
  level: 'Trung bình',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Tổng hợp toàn bộ kiến thức cốt lõi của Chương 9: hai kiểu đối tượng dựng sẵn cuối cùng (Tuple và File), cơ chế tuần tự hóa (pickle, JSON, struct, csv), phân cấp kiểu, so sánh đệ quy và các cạm bẫy đối tượng.',
    'Xác định rõ cầu nối chuyển tiếp sang Phần III của cuốn sách: từ thế giới đối tượng và dữ liệu sang thế giới của cú pháp câu lệnh (statements), cấu trúc rẽ nhánh và vòng lặp thủ tục.',
    'Thử thách và củng cố hiểu biết với Bộ 6 Câu hỏi trắc nghiệm ôn tập nguyên bản từ trang 43–44 của giáo trình Mark Lutz.',
    'Phân tích chi tiết lý do đằng sau các quyết định thiết kế ngôn ngữ của tác giả: vì sao len() là hàm dựng sẵn mà không phải là phương thức, vì sao cần (1,) để ghép nối tuple, và cơ chế truthiness.'
  ],

  intuition: {
    title: 'Trạm dừng chân trên đỉnh đèo và Cánh cổng bước sang miền đất mới',
    metaphor: 'Sau khi vượt qua một hành trình leo núi dài qua 9 chương của Phần I và Phần II, bạn đã đặt chân lên trạm dừng chân đỉnh đèo hùng vĩ. Từ đây nhìn lại, bạn thấy toàn bộ bản đồ thế giới đối tượng của Python đã hiện ra trọn vẹn: từ những con số nhỏ bé, chuỗi ký tự, list khả biến, từ điển bảng băm, đến bộ giá trị tuple bất biến và những đường ống tệp tin kết nối đĩa cứng. Bài học này là trạm dừng chân tổng kết và sát hạch bản lĩnh: bạn sẽ đối mặt với 6 câu hỏi kiểm tra kinh điển của Mark Lutz để đảm bảo mọi ý niệm đã kết tinh vững chắc, trước khi bước qua cánh cổng Phần III — nơi bạn sẽ học cách điều khiển dòng chảy logic bằng các câu lệnh thủ tục quyền năng!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢN ĐỒ TỔNG KẾT CHƯƠNG 9 VÀ CHUYỂN TIẾP SANG PHẦN III</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:10px;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);">1. Tuple & Named Tuple</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Dãy tuần tự bất biến<br>• Dấu phẩy tạo tuple (40,)<br>• collections.namedtuple (attr + offset)</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #10b981;border-radius:6px;">
            <div style="font-weight:700;color:#10b981;">2. File & Serialization</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• open(), file iterator for line<br>• Văn bản str vs Nhị phân bytes<br>• pickle, JSON, struct, csv, with open</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #f59e0b;border-radius:6px;">
            <div style="font-weight:700;color:#f59e0b;">3. Hệ Thống Đối Tượng</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Bảng 9-3 & Hình 9-3 phân cấp<br>• So sánh đệ quy, == vs is, caching<br>• Bảng 9-4 Truthiness, None, bool</div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;">
            <div style="font-weight:700;color:#8b5cf6;">4. Chuyển Tiếp Phần III</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:2px;">• Kết thúc Phần II (Đối tượng)<br>• Bắt đầu Phần III: Cú pháp câu lệnh<br>• Câu lệnh rẽ nhánh if, vòng lặp for/while</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tóm Tắt Toàn Diện Chương 9 & Cầu Nối Sang Phần III',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 43 / 48</strong>.</p>
          </div>
        </div>

        <p>Chương này đã khám phá hai kiểu đối tượng cốt lõi chính cuối cùng — <strong>tuple</strong> và <strong>file</strong>:</p>
        <ul>
          <li>Chúng ta đã học được rằng <strong>tuple</strong> hỗ trợ toàn bộ các thao tác dãy tuần tự thông thường, chỉ có đúng hai phương thức (<code>index</code> và <code>count</code>), không cho phép bất kỳ sự thay đổi tại chỗ nào vì chúng là bất biến, và được khái quát hóa thông qua kiểu mở rộng <code>namedtuple</code>.</li>
          <li>Chúng ta cũng học được rằng <strong>file</strong> được trả về từ hàm dựng sẵn <code>open</code> và cung cấp các phương thức để đọc và ghi nội dung cho cả dạng văn bản (<code>str</code>) lẫn nhị phân (<code>bytes</code>). Xuyên suốt hành trình, chúng ta đã tìm hiểu cách chuyển dịch các đối tượng Python qua lại với chuỗi để lưu trữ vào file, đồng thời xem xét <code>pickle</code>, <code>json</code> cùng các module khác (<code>struct</code>, <code>csv</code>) cho các vai trò nâng cao (tuần tự hóa đối tượng và xử lý dữ liệu đóng gói).</li>
          <li>Cuối cùng, chúng ta khép lại bằng việc điểm lại một số đặc tính chung cho toàn bộ các kiểu đối tượng (chẳng hạn như các tham chiếu được chia sẻ, so sánh đệ quy, định danh <code>is</code> vs bằng nhau <code>==</code>, giá trị chân lý của <code>None</code> và <code>bool</code>) và điểm qua danh sách 4 cạm bẫy phổ biến trong miền kiểu đối tượng.</li>
        </ul>

        <p>Trong phần tiếp theo của cuốn sách (Phần III), chúng ta sẽ chuyển hướng bước sang chủ đề <strong>cú pháp câu lệnh (statements)</strong> — cách thức chúng ta viết mã các bước xử lý và logic trong tập lệnh của mình. Dọc hành trình đó, phần tiếp theo sẽ khám phá toàn bộ các câu lệnh thủ tục cơ bản của Python (như <code>if</code>, <code>while</code>, <code>for</code>, <code>try</code>). Tuy nhiên, trước khi chuyển tiếp, hãy làm bài trắc nghiệm của chương, rồi giải quyết toàn bộ 11 bài tập thực hành ở cuối phần này để ôn luyện các khái niệm về kiểu dữ liệu.</p>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bộ 6 Câu Hỏi Ôn Tập Kiến Thức Nguyên Bản & Lời Giải Chi Tiết Của Mark Lutz',
      content: `
        <p>Dưới đây là phần phân tích sâu sắc cho toàn bộ <strong>6 câu hỏi trắc nghiệm kiểm tra kiến thức</strong> nguyên bản từ trang 43–44 của giáo trình:</p>

        <h3>Câu 1: Làm thế nào để bạn xác định một tuple lớn cỡ nào? Tại sao công cụ này lại được đặt ở vị trí như vậy?</h3>
        <p><strong>Lời giải:</strong> Bạn sử dụng hàm dựng sẵn <code>len(T)</code>. Nó trả về độ dài (số lượng phần tử chứa bên trong) cho bất kỳ đối tượng vật chứa (container) nào trong Python, bao gồm cả tuple. <code>len</code> là một hàm dựng sẵn (built-in function) thay vì là một phương thức của kiểu bởi vì nó có tính chất đa hình, có thể áp dụng đồng nhất trên rất nhiều kiểu đối tượng khác nhau (chuỗi, list, tuple, dict, set). Các phương thức thì mang tính đặc thù riêng cho một kiểu đối tượng đơn lẻ.</p>

        <h3>Câu 2: Hãy viết một biểu thức thay đổi phần tử đầu tiên trong một tuple. Trong quá trình đó, (4, 5, 6) sẽ trở thành (1, 5, 6).</h3>
        <p><strong>Lời giải:</strong> Vì tuple là bất biến, bạn không thể thay đổi tại chỗ. Cho <code>T = (4, 5, 6)</code>, bạn tạo một tuple mới bằng cách kết hợp cắt lát và ghép nối: <code>T = (1,) + T[1:]</code>. Lưu ý rằng tuple một phần tử <code>(1,)</code> bắt buộc phải có dấu phẩy ở cuối. Bạn cũng có thể chuyển tuple thành list, thay đổi nó tại chỗ rồi chuyển ngược lại (<code>L = list(T); L[0] = 1; T = tuple(L)</code>), nhưng cách này tốn kém hơn.</p>

        <h3>Câu 3: Giá trị mặc định cho đối số chế độ xử lý trong lời gọi hàm open của file là gì?</h3>
        <p><strong>Lời giải:</strong> Giá trị mặc định cho đối số chế độ xử lý (mode) trong lời gọi <code>open</code> là <code>'r'</code>, dùng để mở file đầu vào ở chế độ văn bản. Đối với file văn bản đọc thông thường, bạn chỉ cần truyền vào tên file: <code>open('data.txt')</code>.</p>

        <h3>Câu 4: Bạn có thể sử dụng module nào để lưu trữ các đối tượng Python vào một file mà không cần phải tự mình chuyển đổi chúng thành chuỗi?</h3>
        <p><strong>Lời giải:</strong> Module <code>pickle</code> có thể được sử dụng để tuần tự hóa và lưu trữ các đối tượng Python nguyên bản vào file nhị phân mà không cần chuyển đổi tường minh thành chuỗi. Tương tự, module <code>json</code> chuyển đổi một tập hợp các đối tượng giới hạn qua lại với chuỗi JSON. Module <code>struct</code> đóng gói dữ liệu nhị phân dạng C.</p>

        <h3>Câu 5: Bạn có thể làm cách nào để sao chép toàn bộ các thành phần của một cấu trúc lồng nhau cùng một lúc?</h3>
        <p><strong>Lời giải:</strong> Hãy import module <code>copy</code> và gọi hàm <code>copy.deepcopy(X)</code>. Hàm này sẽ duyệt đệ quy qua toàn bộ cấu trúc dữ liệu để sao chép độc lập mọi thành phần ở mọi cấp độ sâu.</p>

        <h3>Câu 6: Khi nào thì Python coi một đối tượng là mang giá trị đúng (true)?</h3>
        <p><strong>Lời giải:</strong> Một đối tượng được coi là mang giá trị đúng (true / truthy) nếu nó là một số khác không hoặc một đối tượng tập hợp không rỗng (chứa ít nhất một phần tử). Các giá trị mang tính sai (falsy) gồm có: số 0, 0.0, chuỗi rỗng <code>''</code>, tập hợp rỗng (<code>[]</code>, <code>()</code>, <code>{}</code>, <code>set()</code>), và đối tượng <code>None</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Mã nguồn minh họa thực nghiệm 6 câu hỏi ôn tập của Mark Lutz',
          code: `# Câu 1: len(T) là hàm dựng sẵn
T = (4, 5, 6)
print("Câu 1 - len(T):", len(T))

# Câu 2: Đổi (4, 5, 6) thành (1, 5, 6)
T = (1,) + T[1:]
print("Câu 2 - Tuple mới:", T)

# Câu 3: Mặc định mode 'r'
f = open('datafile.txt')
print("Câu 3 - Chế độ mở mặc định của file:", f.mode)
f.close()

# Câu 4: Module pickle lưu trực tiếp
import pickle
raw_bytes = pickle.dumps(T)
print("Câu 4 - pickle lưu đối tượng thành:", repr(raw_bytes[:10]) + '...')

# Câu 5: copy.deepcopy sao chép đệ quy
import copy
nested_orig = [1, [2, 3]]
nested_deep = copy.deepcopy(nested_orig)
print("Câu 5 - deepcopy độc lập:", nested_deep is not nested_orig)

# Câu 6: Giá trị đúng (True) vs Sai (False)
print("Câu 6 - bool(T):", bool(T), "| bool(()):", bool(()))`,
          output: `Câu 1 - len(T): 3
Câu 2 - Tuple mới: (1, 5, 6)
Câu 3 - Chế độ mở mặc định của file: r
Câu 4 - pickle lưu đối tượng thành: b'\\x80\\x05\\x95\\x0b\\x00\\x00\\x00\\x00\\x00\\x00'...
Câu 5 - deepcopy độc lập: True
Câu 6 - bool(T): True | bool(()): False`,
          annotations: [
            { line: 6, text: '(1,) + T[1:] tạo tuple mới (1, 5, 6).' },
            { line: 10, text: 'f.mode in ra \'r\' xác nhận chế độ mặc định.' },
            { line: 20, text: 'nested_deep is not nested_orig trả về True.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Sẵn sàng bước sang 11 Bài tập Thực hành Phần II',
        content: 'Sau khi đã nắm vững 6 câu hỏi trắc nghiệm của chương, 5 bài học tiếp theo (từ C9.15 đến C9.19) sẽ dành riêng để giải quyết trọn vẹn toàn bộ 11 bài tập thực hành tổng kết cuối Phần II — nơi hội tụ mọi kỹ năng thực chiến về số, chuỗi, list, dict, tuple và file!'
      }
    ],
    pitfalls: [
      {
        title: 'Bẫy quên dấu phẩy khi tạo tuple 1 phần tử (1,)',
        content: 'Một trong những sai lầm phổ biến nhất trong Câu 2 là viết <code>T = (1) + T[1:]</code>. Lệnh này sẽ báo lỗi <code>TypeError: unsupported operand type(s) for +: \'int\' and \'tuple\'</code> vì (1) chỉ là số nguyên 1!'
      }
    ]
  },

  exercises: [
    {
      title: 'Biến đổi phần tử thứ hai của Tuple',
      level: 'Dễ',
      problem: 'Cho T = (\'a\', \'b\', \'c\', \'d\'). Hãy viết biểu thức một dòng để thay đổi phần tử \'b\' ở vị trí bù 1 thành \'MOD\', tạo ra tuple mới (\'a\', \'MOD\', \'c\', \'d\').',
      hint: 'Dùng cắt lát phần đầu T[:1], ghép nối (\'MOD\',) và cắt lát phần đuôi T[2:].',
      solutionCode: `T = ('a', 'b', 'c', 'd')
T_new = T[:1] + ('MOD',) + T[2:]
print("Tuple sau biến đổi:", T_new)`,
      solutionOutput: `Tuple sau biến đổi: ('a', 'MOD', 'c', 'd')`,
      explanation: 'T[:1] lấy (\'a\'), (\'MOD\',) là tuple 1 phần tử, T[2:] lấy (\'c\', \'d\'). Phép cộng ghép nối tạo ra tuple 4 phần tử mới.'
    }
  ],

  quiz: [
    {
      question: 'Vì sao trong Python, len() lại được thiết kế dưới dạng một hàm dựng sẵn thay vì là phương thức T.len()?',
      options: [
        'Vì phương thức len() không chạy được trên hệ điều hành Windows.',
        'Vì hàm dựng sẵn len() có thể áp dụng đồng nhất trên nhiều kiểu dữ liệu khác nhau (tính đa hình), trong khi phương thức thì mang tính đặc thù riêng cho từng kiểu.',
        'Vì hàm len() được viết bằng ngôn ngữ assembly nên nhanh hơn phương thức.',
        'Vì Python 3 muốn loại bỏ hoàn toàn các phương thức của tuple.'
      ],
      correctIndex: 1,
      explanation: 'Mark Lutz giải thích trong đáp án Câu 1: Các hàm dựng sẵn như len() và các biểu thức toán tử áp dụng trên nhiều kiểu đối tượng khác nhau; các phương thức thì mang tính đặc thù riêng cho một kiểu đối tượng đơn lẻ.'
    },
    {
      question: 'Biểu thức nào sau đây chuyển đổi tuple (4, 5, 6) thành (1, 5, 6) mà KHÔNG gây lỗi cú pháp?',
      options: [
        'T = (1) + T[1:]',
        'T[0] = 1',
        'T = (1,) + T[1:]',
        'T.replace(4, 1)'
      ],
      correctIndex: 2,
      explanation: 'Tuple là bất biến nên không gán T[0]=1 được; (1) chỉ là int; tuple không có replace(); duy nhất (1,) + T[1:] ghép nối hai tuple thành công.'
    }
  ],

  summary: [
    'Chương 9 khép lại hành trình khảo sát các kiểu đối tượng cốt lõi bằng Tuple và File, cùng bức tranh tổng kết toàn diện Phần II.',
    'Hàm dựng sẵn len() thể hiện tính đa hình áp dụng trên mọi container trong Python.',
    'Thay đổi tuple đòi hỏi tạo đối tượng mới qua cắt lát và ghép nối: T = (new_val,) + T[1:].',
    'Chế độ xử lý file mặc định là \'r\' (đọc văn bản).',
    'Module pickle lưu trữ đối tượng Python nguyên bản vào file nhị phân; copy.deepcopy() sao chép đệ quy mọi cấp độ sâu.',
    'Giá trị chân lý (Truthiness): khác 0 và không rỗng là True; bằng 0, rỗng và None là False.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.15), chúng ta sẽ bước vào Phần bài tập thực hành tổng kết Phần II: Giải quyết chi tiết Bài tập 1 với 9 nhóm biểu thức kiểm thử tương tác trên REPL.'
};
