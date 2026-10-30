export default {
  id: 'lp-c7-06',
  partId: 'part-lp-c7',
  chapter: 'Chương 7: Các nền tảng cơ bản về chuỗi',
  number: 'C7.6',
  title: 'Đánh chỉ mục (Indexing), Cắt lát (Slicing) & Sơ đồ Hình 7-1',
  subtitle: 'Truy xuất theo độ lệch số, chỉ mục âm đếm ngược, phân đoạn liên tục [I:J], sơ đồ Hình 7-1, top-level copy và chính sách vượt biên',
  level: 'Cơ bản',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững nguyên lý đánh chỉ mục (indexing): bắt đầu từ 0 bên trái, độ lệch âm đếm ngược từ bên phải.',
    'Thành thạo cú pháp cắt lát cơ bản S[I:J]: cận dưới I (bao gồm), cận trên J (không bao gồm), và các giá trị mặc định khi lược bỏ cận.',
    'Đọc hiểu và trực quan hóa Sơ đồ Hình 7-1: cách các chỉ mục dương và âm ánh xạ vào từng ô ký tự trong chuỗi.',
    'Hiểu kỹ thuật tạo bản sao cấp cao nhất (top-level copy) bằng S[:] và sự khác biệt chính sách vượt biên giữa chỉ mục và slice.'
  ],

  intuition: {
    title: 'Hàng rào số và chiếc dao cắt bánh mỳ lát',
    metaphor: 'Hãy tưởng tượng chuỗi \'code\' giống như một chiếc bánh mỳ baguette được cắt sẵn thành 4 lát. Chỉ mục (index) giống như bạn gọi đích danh lát bánh mỳ số mấy: lát 0 là \'c\', lát cuối cùng (-1) là \'d\'. Còn thao tác cắt lát (slice S[I:J]) giống như bạn dùng hai chiếc vách ngăn cắm xuống các rãnh chia giữa các lát bánh: vách ngăn trái cắm ở rãnh I, vách ngăn phải cắm ở rãnh J. Toàn bộ các lát bánh nằm kẹp giữa hai vách ngăn đó sẽ được nhấc ra đĩa tạo thành một chiếc bánh mỳ nhỏ mới tinh! Nếu bạn nhấc lát bánh thứ 99 không tồn tại, máy sẽ báo động (IndexError); nhưng nếu bạn cắm vách ngăn vượt ra ngoài mép bàn bánh, Python sẽ khéo léo co vách ngăn lại vừa khít mép bánh mà không làm đổ vỡ chương trình.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HÌNH 7-1: ÁNH XẠ CHỈ MỤC & CẮT LÁT TRÊN CHUỖI 'code'</div>
        
        <!-- Sơ đồ Hình 7-1 trực quan hóa -->
        <div style="display:flex;justify-content:center;align-items:center;padding:16px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;overflow-x:auto;">
          <div style="display:grid;grid-template-columns:repeat(4, 56px);gap:4px;text-align:center;">
            <!-- Hàng 1: Chỉ mục dương -->
            <div style="color:var(--accent-primary);font-weight:700;font-size:0.85rem;">0 ↓</div>
            <div style="color:var(--accent-primary);font-weight:700;font-size:0.85rem;">1 ↓</div>
            <div style="color:var(--accent-primary);font-weight:700;font-size:0.85rem;">2 ↓</div>
            <div style="color:var(--accent-primary);font-weight:700;font-size:0.85rem;">3 ↓</div>
            
            <!-- Hàng 2: Ô ký tự -->
            <div style="height:48px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:2px solid var(--border-strong);border-radius:6px;font-size:1.2rem;">c</div>
            <div style="height:48px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:2px solid var(--border-strong);border-radius:6px;font-size:1.2rem;">o</div>
            <div style="height:48px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:2px solid var(--border-strong);border-radius:6px;font-size:1.2rem;">d</div>
            <div style="height:48px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent-text);font-weight:700;border:2px solid var(--border-strong);border-radius:6px;font-size:1.2rem;">e</div>
            
            <!-- Hàng 3: Chỉ mục âm -->
            <div style="color:var(--success);font-weight:700;font-size:0.85rem;">↑ -4</div>
            <div style="color:var(--success);font-weight:700;font-size:0.85rem;">↑ -3</div>
            <div style="color:var(--success);font-weight:700;font-size:0.85rem;">↑ -2</div>
            <div style="color:var(--success);font-weight:700;font-size:0.85rem;">↑ -1</div>
          </div>
        </div>

        <div style="text-align:center;font-size:0.82rem;color:var(--text-muted);">
          <em>Số dương bắt đầu từ bên trái (0) • Số âm đếm ngược từ bên phải (-1) • Slice S[1:3] lấy từ offset 1 đến 2 ('od')</em>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Đánh Chỉ mục (Indexing): Truy xuất theo Độ lệch Số',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các đối tượng và thao tác • Chương 7: Các nền tảng cơ bản về chuỗi • <strong>PDF Trang 14 / 52 – Trang 16 / 52</strong>.</p>
            <p style="font-size:0.82rem;color:var(--text-muted);margin-top:4px;"><em>Lưu ý học tập: Toàn bộ nội dung và ví dụ được chuyển thể trung thực từ bản dịch tiếng Việt của giáo trình, phục vụ mục đích nghiên cứu và tự học.</em></p>
          </div>
        </div>

        <p>Bởi vì chuỗi là các tập hợp có thứ tự (dãy tuần tự - sequence) các ký tự, chúng ta có thể truy cập các thành phần của chúng theo vị trí. Như đã giới thiệu ở Chương 4, các ký tự trong một chuỗi được lấy ra bằng cách <strong>đánh chỉ mục (indexing)</strong>—cung cấp độ lệch số (numeric offset) của thành phần mong muốn trong dấu ngoặc vuông đặt sau chuỗi. Bạn sẽ nhận lại chuỗi gồm một ký tự tại vị trí đã chỉ định.</p>

        <p>Như trong hầu hết các ngôn ngữ họ C, độ lệch vị trí trong Python bắt đầu từ 0 và kết thúc ở vị trí nhỏ hơn một đơn vị so với độ dài của chuỗi (<code>len(S) - 1</code>). Tuy nhiên, khác với C, Python cũng cho phép bạn lấy các phần tử từ các dãy tuần tự bằng cách sử dụng <strong>độ lệch âm (negative offsets)</strong>. Về mặt kỹ thuật, một độ lệch âm được cộng vào độ dài của chuỗi để suy ra độ lệch dương tương ứng: <code>S[-2]</code> tương đương <code>S[len(S) - 2]</code>. Bạn có thể hình dung độ lệch âm như việc đếm ngược từ phía cuối chuỗi trở lại:</p>
      `,
      codeExamples: [
        {
          title: 'Đánh chỉ mục từ đầu (dương) và từ cuối (âm)',
          code: `S = 'code'

# Chỉ mục từ đầu và từ cuối
first = S[0]
second_from_end = S[-2]

print("S[0] =", repr(first))
print("S[-2] =", repr(second_from_end))
print("Tương đương S[len(S)-2]:", repr(S[len(S) - 2]))`,
          output: `S[0] = 'c'
S[-2] = 'd'
Tương đương S[len(S)-2]: 'd'`,
          annotations: [
            { line: 4, text: 'S[0] lấy ký tự đầu tiên bên trái (\'c\').' },
            { line: 5, text: 'S[-2] lấy ký tự thứ 2 tính từ cuối đếm ngược (\'d\').' },
            { line: 9, text: 'Độ lệch âm -2 được cộng vào độ dài 4 để thành độ lệch dương 2.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Thao tác Cắt lát (Slicing): Trích xuất Phân đoạn Liên tục',
      content: `
        <p>Thao tác <strong>cắt lát (slicing)</strong> là một dạng tổng quát hóa của chỉ mục nhằm trả về <strong>toàn bộ một phân đoạn liên tục</strong> thay vì một phần tử đơn lẻ. Nó có thể được dùng để trích xuất các cột dữ liệu, cắt bỏ tiền tố và hậu tố, phân tách chuỗi con, cùng nhiều tác vụ khác.</p>

        <p>Thao tác slice hoạt động theo nguyên tắc sau: khi bạn đánh chỉ mục một đối tượng dãy tuần tự bằng một cặp độ lệch phân tách bởi dấu hai chấm <code>S[I:J]</code>, Python trả về một đối tượng mới chứa phân đoạn liên tục được xác định bởi cặp độ lệch đó:</p>
        <ul>
          <li><strong>Độ lệch bên trái <code>I</code>:</strong> Là cận dưới (<strong>bao gồm</strong> - inclusive).</li>
          <li><strong>Độ lệch bên phải <code>J</code>:</strong> Là cận trên (<strong>không bao gồm</strong> - noninclusive).</li>
          <li>Tức là, Python lấy tất cả các phần tử từ cận dưới cho đến <em>ngay trước</em> cận trên (<code>I</code> đến <code>J - 1</code>) và trả về một đối tượng mới.</li>
          <li><strong>Cận mặc định:</strong> Nếu được lược bỏ, cận trái nhận giá trị mặc định là <code>0</code>, và cận phải nhận giá trị mặc định là <code>len(S)</code> (độ dài chuỗi).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Các biến thể cắt lát S[I:J] trên chuỗi \'code\'',
          code: `S = 'code'

# S[1:3] lấy từ vị trí 1 đến trước 3 (lấy 1 và 2)
print("S[1:3]:", repr(S[1:3]))

# S[1:] lược bỏ cận phải: lấy từ vị trí 1 đến hết chuỗi
print("S[1:]:", repr(S[1:]))

# S[:-1] lược bỏ cận trái: lấy từ đầu đến ngay trước phần tử cuối cùng
print("S[:-1]:", repr(S[:-1]))

# S[:] lược bỏ cả hai cận: tạo bản sao cấp cao nhất
print("S[:]:", repr(S[:]))`,
          output: `S[1:3]: 'od'
S[1:]: 'ode'
S[:-1]: 'cod'
S[:]: 'code'`,
          annotations: [
            { line: 4, text: 'S[1:3] lấy hai ký tự ở offset 1 và 2 (\'o\' và \'d\').' },
            { line: 7, text: 'S[1:] lấy toàn bộ phần còn lại sau ký tự đầu tiên (\'ode\').' },
            { line: 10, text: 'S[:-1] cắt bỏ ký tự cuối cùng, một kỹ thuật dọn dẹp chuỗi kinh điển.' },
            { line: 13, text: 'S[:] tạo một bản sao cấp cao nhất (top-level copy).' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Bản tóm tắt Quy tắc Chỉ mục & Cắt lát',
      content: `
        <p>Để tiện tra cứu nhanh trong thực tế, dưới đây là bảng tóm tắt chi tiết các quy chuẩn cốt lõi:</p>

        <div style="padding:14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:8px;font-size:0.88rem;line-height:1.7;">
          <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Chỉ mục — S[I] — Truy xuất thành phần tại độ lệch vị trí:</div>
          <ul style="margin:0 0 12px 18px;">
            <li>Phần tử đầu tiên ở vị trí <code>0</code>.</li>
            <li>Chỉ mục âm có nghĩa là đếm ngược từ phía cuối hoặc từ bên phải.</li>
            <li>Độ lệch vượt quá giới hạn (out-of-bounds) sẽ gây lỗi <code>IndexError</code>.</li>
            <li><code>S[0]</code> lấy phần tử đầu tiên; <code>S[-2]</code> lấy phần tử thứ hai tính từ cuối.</li>
          </ul>

          <div style="font-weight:700;color:var(--success);margin-bottom:6px;">Cắt lát — S[I:J] — Trích xuất phân đoạn liên tục:</div>
          <ul style="margin:0 0 12px 18px;">
            <li>Cận trên không bao gồm (noninclusive).</li>
            <li>Cận của slice mặc định là <code>0</code> và <code>len(S)</code> nếu được lược bỏ.</li>
            <li>Các độ lệch vượt giới hạn sẽ được <strong>tự động điều chỉnh (co giãn)</strong> về trong giới hạn hợp lệ.</li>
            <li><code>S[1:3]</code> lấy các phần tử từ vị trí 1 cho đến ngay trước 3.</li>
            <li><code>S[1:]</code> lấy các phần tử từ vị trí 1 cho đến hết (độ dài dãy tuần tự).</li>
            <li><code>S[:3]</code> lấy các phần tử từ vị trí 0 cho đến ngay trước 3.</li>
            <li><code>S[:-1]</code> lấy các phần tử từ vị trí 0 cho đến ngay trước phần tử cuối cùng.</li>
            <li><code>S[:]</code> lấy các phần tử từ vị trí 0 cho đến hết—tạo một bản sao cấp cao nhất (top-level copy).</li>
          </ul>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-4',
      title: '4. Sự Khác biệt Chính sách Vượt biên: Chỉ mục vs Slice',
      content: `
        <p>Một điểm tương phản rất thú vị giữa chỉ mục và slice là <strong>chính sách xử lý các độ lệch vượt quá giới hạn (out-of-bounds offsets)</strong>:</p>
        <ul>
          <li><strong>Trong phép đánh chỉ mục <code>S[I]</code>:</strong> Luôn là một ngoại lệ lỗi <code>IndexError: string index out of range</code>, vì độ lệch đó không hề tồn tại trong đối tượng.</li>
          <li><strong>Trong phép cắt lát <code>S[I:J]</code>:</strong> Python không bao giờ báo lỗi vượt biên! Thay vào đó, các độ lệch vượt quá giới hạn sẽ được <strong>tự động co giãn (clipping)</strong> về cận biên hợp lệ của chuỗi (chẳng hạn nếu cận trên lớn hơn độ dài chuỗi, nó được coi như là <code>len(S)</code>).</li>
        </ul>

        <p>Cơ chế co giãn an toàn này cực kỳ hữu ích trong các chương trình cần thích ứng linh hoạt với các kích thước văn bản đầu vào biến động mà không cần phải viết thêm các câu lệnh kiểm tra điều kiện rườm rà.</p>
      `,
      codeExamples: [
        {
          title: 'So sánh lỗi IndexError của chỉ mục và tính co giãn an toàn của slice',
          code: `S = 'code'

# Chỉ mục vượt biên kích hoạt ngoại lệ IndexError:
try:
    print(S[99])
except IndexError as e:
    print("S[99] báo lỗi:", e)

# Cắt lát vượt biên tự động co giãn về giới hạn hợp lệ:
print("S[1:99] =", repr(S[1:99]))
print("S[-100:2] =", repr(S[-100:2]))
print("S[10:20] =", repr(S[10:20]))`,
          output: `S[99] báo lỗi: string index out of range
S[1:99] = 'ode'
S[-100:2] = 'co'
S[10:20] = ''`,
          annotations: [
            { line: 6, text: 'IndexError xuất hiện khi truy cập chỉ mục đơn 99 không tồn tại.' },
            { line: 9, text: 'S[1:99] co cận trên về len(S)=4, lấy từ offset 1 đến hết chuỗi (\'ode\').' },
            { line: 10, text: 'S[-100:2] co cận dưới về 0, lấy từ offset 0 đến 1 (\'co\').' },
            { line: 11, text: 'Khi cả hai cận đều vượt biên ngoài phạm vi, slice trả về chuỗi rỗng \'\' một cách êm đẹp.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Bản sao cấp cao nhất S[:] có ý nghĩa gì?',
        content: 'Đối với chuỗi bất biến, <code>S[:]</code> có thể tái sử dụng chính đối tượng cũ để tối ưu bộ nhớ. Nhưng kỹ thuật <code>L[:]</code> này lại cực kỳ quan trọng đối với kiểu dữ liệu khả biến như <strong>danh sách (list)</strong> mà chúng ta sẽ học ở Chương 8: nó tạo ra một bản sao nông hoàn chỉnh nằm ở vùng nhớ riêng biệt, giúp triệt tiêu hoàn toàn các tác dụng phụ ngoài ý muốn của cơ chế tham chiếu chia sẻ đã chỉ ra ở Chương 6.'
      }
    ],
    pitfalls: [
      {
        title: 'Cận trên của slice luôn là "không bao gồm" (noninclusive)',
        content: 'Một lỗi tư duy thường gặp là nghĩ rằng <code>S[0:3]</code> sẽ lấy ký tự tại vị trí 3. Thực tế nó chỉ lấy tại các vị trí 0, 1 và 2 (tổng cộng đúng <code>3 - 0 = 3</code> ký tự). Số lượng phần tử trả về trong một slice chuẩn luôn bằng cận trên trừ cận dưới: <code>J - I</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Trích xuất hai ký tự ở giữa chuỗi bằng cắt lát',
      level: 'Dễ',
      problem: 'Cho chuỗi S = "c,od,e" (tổng độ dài 6 ký tự). Hãy viết một biểu thức cắt lát duy nhất để trích xuất hai ký tự ở giữa là "od".',
      hint: 'Hãy đếm độ lệch từ bên trái: \'c\' là 0, \',\' là 1, \'o\' là 2, \'d\' là 3. Cận trên phải là vị trí đứng sau \'d\'.',
      solutionCode: `S = 'c,od,e'

# Vị trí của 'o' là 2, 'd' là 3, cận trên không bao gồm là 4
middle = S[2:4]

print("Chuỗi gốc:", S)
print("Hai ký tự ở giữa:", repr(middle))
print("Độ dài:", len(middle))`,
      solutionOutput: `Chuỗi gốc: c,od,e
Hai ký tự ở giữa: 'od'
Độ dài: 2`,
      explanation: 'Biểu thức S[2:4] lấy các phần tử từ chỉ mục 2 đến trước 4 (nghĩa là lấy tại vị trí 2 và 3), mang lại kết quả chính xác là chuỗi hai ký tự \'od\'.'
    }
  ],

  quiz: [
    {
      question: 'Khi thực hiện biểu thức S = "Python"; slice_res = S[2:5], kết quả thu được là gì?',
      options: [
        '\'yth\'',
        '\'tho\'',
        '\'thon\'',
        '\'pyt\''
      ],
      correctIndex: 1,
      explanation: 'Chuỗi "Python" có các chỉ mục: 0:P, 1:y, 2:t, 3:h, 4:o, 5:n. Cắt lát S[2:5] lấy từ chỉ mục 2 đến trước 5 (chỉ mục 2, 3, 4), kết quả là \'tho\'.'
    },
    {
      question: 'Sự khác biệt cốt lõi về chính sách vượt giới hạn (out-of-bounds) giữa chỉ mục S[99] và cắt lát S[1:99] trên chuỗi "code" là gì?',
      options: [
        'Cả hai đều phát sinh ngoại lệ IndexError vì vượt quá độ dài chuỗi.',
        'S[99] gây lỗi IndexError, trong khi S[1:99] tự động co giãn về giới hạn hợp lệ và trả về \'ode\'.',
        'S[99] trả về None, trong khi S[1:99] gây lỗi ValueError.',
        'S[99] trả về ký tự rỗng \'\', trong khi S[1:99] nối thêm các khoảng trắng vào cuối chuỗi.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, chỉ mục vượt biên luôn là lỗi IndexError vì phần tử không tồn tại; trái lại, slice được thiết kế linh hoạt để tự động co giãn về giới hạn cận biên, trả về \'ode\' mà không báo lỗi.'
    }
  ],

  summary: [
    'Chỉ mục S[I] truy xuất ký tự đơn: bắt đầu từ 0 bên trái, chỉ mục âm đếm ngược từ bên phải.',
    'Chỉ mục vượt biên luôn phát sinh lỗi ngoại lệ IndexError: string index out of range.',
    'Cắt lát S[I:J] trích xuất phân đoạn liên tục: cận dưới I bao gồm, cận trên J không bao gồm; số phần tử bằng J - I.',
    'Cận mặc định của slice: cận trái là 0, cận phải là len(S). S[:] tạo bản sao cấp cao nhất (top-level copy).',
    'Cắt lát vượt biên tự động được co giãn về giới hạn hợp lệ, mang lại độ mềm dẻo cao cho xử lý văn bản.'
  ]
};
