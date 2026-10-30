export default {
  id: 'lp-c8-20',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.20',
  title: 'Mẹo sử dụng Dictionary: Mô phỏng List (Khóa số nguyên), Ma trận thưa (Khóa Tuple) & Tránh thiếu khóa',
  subtitle: 'Khám phá các kỹ thuật lập trình nâng cao với Dictionary: mô phỏng mảng co giãn bằng khóa số nguyên, ma trận thưa 3D với khóa Tuple và 3 giải pháp tránh KeyError',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững 3 nguyên tắc then chốt khi sử dụng Dictionary, bao gồm điều kiện để một đối tượng được phép làm khóa (Hashable & Immutable).',
    'Sử dụng Dictionary với khóa số nguyên để mô phỏng một danh sách tự co giãn, tiết kiệm bộ nhớ so với việc cấp phát trước `[0] * N`.',
    'Cài đặt cấu trúc dữ liệu thưa (Sparse Data Structure) và ma trận đa chiều bằng cách dùng Tuple tọa độ làm khóa.',
    'Thành thạo 3 kỹ thuật xử lý và phòng ngừa lỗi thiếu khóa (`KeyError`): phương thức `get()`, câu lệnh `if...in`, và khối lệnh `try...except`.'
  ],

  intuition: {
    title: 'Khách sạn triệu phòng trống và Bản đồ tọa độ sao vũ trụ',
    metaphor: 'Hãy tưởng tượng bạn phải quản lý một khách sạn khổng lồ có 1 triệu phòng, nhưng hiện tại chỉ có đúng 2 vị khách ở phòng số 99 và phòng số 8888. Nếu bạn dùng List, bạn phải xây dựng đầy đủ toàn bộ 1 triệu căn phòng vật lý trong bộ nhớ (`[None] * 1000000`), gây lãng phí tài nguyên khủng khiếp! Nhưng nếu bạn dùng Dictionary với khóa số nguyên, bạn chỉ cần một cuốn sổ nhỏ ghi hai dòng: `{99: "Khách A", 8888: "Khách B"}` — bộ nhớ chỉ tiêu tốn đúng cho hai vị khách thực tế. Tương tự, trong vũ trụ bao la (ma trận 3 chiều thưa), các vì sao nằm rải rác cách nhau hàng triệu năm ánh sáng. Thay vì tạo một ma trận 3D khổng lồ toàn số 0, bạn chỉ cần dùng khóa Tuple tọa độ `Matrix[(x, y, z)] = độ_sáng` để ghi lại vị trí của các vì sao phát sáng!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MÔ HÌNH MA TRẬN THƯA (SPARSE MATRIX) VỚI KHÓA TUPLE</div>
        <div style="display:flex;justify-content:center;gap:14px;align-items:center;flex-wrap:wrap;">
          <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Tọa độ 3D (X, Y, Z)</div>
            <div style="font-weight:700;color:#8b5cf6;font-size:1.05rem;">Khóa: (2, 3, 4)</div>
            <div style="font-size:0.75rem;color:var(--success);margin-top:4px;">Giá trị = 88</div>
          </div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-strong);border-radius:6px;text-align:center;">
            <div style="font-size:0.75rem;color:var(--text-muted);">Tọa độ 3D (X, Y, Z)</div>
            <div style="font-weight:700;color:#8b5cf6;font-size:1.05rem;">Khóa: (7, 8, 9)</div>
            <div style="font-size:0.75rem;color:var(--success);margin-top:4px;">Giá trị = 99</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">
          Chỉ lưu các ô có giá trị thực tế • Ô trống truy cập an toàn bằng Matrix.get((x, y, z), 0)
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Ba Nguyên tắc Then chốt & Ràng buộc Khóa Hashable',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 30 / 42 – Trang 32 / 42</strong>.</p>
          </div>
        </div>

        <p>Dictionary là những công cụ trực quan một khi bạn đã nắm vững chúng, nhưng dưới đây là 3 chỉ dẫn và lưu ý bổ sung quan trọng bạn nên biết:</p>

        <ol>
          <li><strong>Các thao tác dãy tuần tự (sequence) không hoạt động:</strong> Dictionary là ánh xạ (mapping), không phải dãy tuần tự. Những thao tác phụ thuộc thứ tự vị trí như ghép nối (<code>+</code>) và cắt lát (<code>[:]</code>) hoàn toàn không áp dụng được và sẽ bị báo lỗi.</li>
          <li><strong>Gán cho các chỉ mục mới sẽ thêm các mục mới:</strong> Dù viết trong literal hay gán riêng lẻ <code>D[new_key] = val</code>, kết quả cuối cùng đều là tạo thêm mục mới.</li>
          <li><strong>Khóa không nhất thiết phải luôn là chuỗi:</strong> Bất kỳ đối tượng <strong>bất biến (immutable) và băm được (hashable)</strong> nào khác cũng hoạt động tốt (số nguyên, số thực, tuple, hoặc instance của lớp do người dùng định nghĩa ở Phần VI). Ngược lại, <strong>các đối tượng khả biến như list, set và các dictionary khác KHÔNG THỂ làm khóa</strong> vì giá trị của chúng có thể thay đổi sau khi lưu, làm phá vỡ cơ chế tìm kiếm của bảng băm.</li>
        </ol>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Mô phỏng List Linh hoạt bằng Khóa Số nguyên',
      content: `
        <p>Khi sử dụng list, việc gán cho một vị trí bù vượt quá giới hạn cuối của list là bất hợp lệ và gây lỗi <code>IndexError</code>:</p>
        <pre><code>L = []
L[99] = 'hack'
IndexError: list assignment index out of range</code></pre>

        <p>Mặc dù bạn có thể sử dụng phép nhân bản để cấp phát trước một list lớn như bạn cần (ví dụ: <code>[0] * 100</code>), bạn cũng có thể làm một điều gì đó tương tự với dictionary mà <strong>không đòi hỏi việc cấp phát không gian bộ nhớ như vậy—và tránh lãng phí tiềm ẩn</strong>.</p>

        <p>Bằng cách sử dụng các khóa là số nguyên, dictionary có thể mô phỏng các list dường như tự động mở rộng khi được gán theo vị trí bù:</p>
      `,
      codeExamples: [
        {
          title: 'Mô phỏng List co giãn tự do bằng Dictionary có khóa số nguyên',
          code: `# Khởi tạo dictionary rỗng mô phỏng mảng thưa
D = {}
D[99] = 'hack'
print("D[99]:", repr(D[99]))
print("D hiện tại:", D)

# Gán thêm tại các vị trí bất kỳ không theo thứ tự
D[62] = 'code'
D[30] = 'write'
print("Sau khi gán 62 và 30:", D)
print("Truy xuất vị trí 62:  ", repr(D[62]))

# Áp dụng khóa số nguyên cho cơ sở dữ liệu sách
table = {
    2024: 'Learning Python, 6th Edition',
    2013: 'Learning Python, 5th Edition',
    1999: 'Learning Python'
}
print("\nTruy xuất ấn bản năm 2024:", table[2024])`,
          output: `D[99]: 'hack'
D hiện tại: {99: 'hack'}
Sau khi gán 62 và 30: {99: 'hack', 62: 'code', 30: 'write'}
Truy xuất vị trí 62:   'code'

Truy xuất ấn bản năm 2024: Learning Python, 6th Edition`,
          annotations: [
            { line: 3, text: 'D[99] = \'hack\' tạo ra dict 1 mục duy nhất, không lãng phí 99 ô nhớ trống.' },
            { line: 8, text: 'Gán thoải mái tại các vị trí bù 62 và 30.' },
            { line: 15, text: 'Khóa số nguyên 2024 giúp loại bỏ việc phải đặt dấu nháy cho năm.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Ma trận Thưa (Khóa Tuple) & 3 Kỹ thuật Tránh Lỗi Thiếu Khóa',
      content: `
        <p>Theo cách tương tự, các khóa dictionary thường được tận dụng để cài đặt <strong>các cấu trúc dữ liệu thưa (sparse)</strong>—phần lớn là rỗng—chẳng hạn như các mảng đa chiều chỉ có một vài vị trí được lưu trữ giá trị. Chúng ta sử dụng các <strong>Tuple tọa độ</strong> làm khóa:</p>

        <p>Khi truy cập vào một ô trống chưa từng được gán, Python sẽ kích hoạt ngoại lệ <code>KeyError</code>. Có <strong>ba kỹ thuật chuẩn</strong> để xử lý và cung cấp giá trị mặc định (như số 0) thay vì để chương trình bị dừng:</p>

        <ol>
          <li><strong>Phương thức <code>get()</code>:</strong> <code>Matrix.get((2, 3, 6), 0)</code> — giải pháp ngắn gọn nhất, được ưa chuộng nhất khi chỉ cần đọc dữ liệu.</li>
          <li><strong>Câu lệnh điều kiện <code>if...in</code>:</strong> <code>if (2, 3, 6) in Matrix: print(Matrix[(2, 3, 6)]) else: print(0)</code> — kiểm tra trước khi truy xuất.</li>
          <li><strong>Khối bắt lỗi <code>try...except</code>:</strong> <code>try: print(Matrix[(2, 3, 6)]) except KeyError: print(0)</code> — áp dụng tổng quát khi thao tác phức tạp.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Cài đặt ma trận 3D thưa và 3 kỹ thuật xử lý an toàn khóa thiếu',
          code: `# Cài đặt ma trận ba chiều thưa bằng khóa Tuple
Matrix = {}
Matrix[(2, 3, 4)] = 88
Matrix[(7, 8, 9)] = 99

# Truy xuất tọa độ hợp lệ
coords = (2, 3, 4)
print("Giá trị tại (2, 3, 4):", Matrix[coords])
print("Toàn bộ ma trận thưa:", Matrix)

# Ô trống (2, 3, 6) không có trong bộ nhớ
# Cách 1: Dùng phương thức get() (ngắn gọn nhất)
val_get = Matrix.get((2, 3, 6), 0)
print("\n1. Dùng Matrix.get((2, 3, 6), 0):", val_get)

# Cách 2: Dùng câu lệnh if...in kiểm tra trước
print("2. Dùng if-in:                    ", end="")
if (2, 3, 6) in Matrix:
    print(Matrix[(2, 3, 6)])
else:
    print(0)

# Cách 3: Dùng khối try...except KeyError
print("3. Dùng try-except:               ", end="")
try:
    print(Matrix[(2, 3, 6)])
except KeyError:
    print(0)`,
          output: `Giá trị tại (2, 3, 4): 88
Toàn bộ ma trận thưa: {(2, 3, 4): 88, (7, 8, 9): 99}

1. Dùng Matrix.get((2, 3, 6), 0): 0
2. Dùng if-in:                     0
3. Dùng try-except:                0`,
          annotations: [
            { line: 3, text: 'Tuple (2, 3, 4) làm khóa đại diện cho tọa độ (X, Y, Z).' },
            { line: 13, text: 'get() trả về giá trị mặc định 0 tức thì.' },
            { line: 17, text: 'Kiểm tra thành viên bằng in trước khi truy cập.' },
            { line: 24, text: 'Khối try bắt KeyError và phục hồi mượt mà.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tại sao Tuple làm khóa được nhưng List thì không?',
        content: 'Vì Tuple là kiểu dữ liệu <strong>bất biến (immutable)</strong>, nội dung của nó không bao giờ bị thay đổi sau khi tạo nên mã băm của nó luôn cố định. Ngược lại, List là kiểu <strong>khả biến (mutable)</strong>; nếu dùng list làm khóa, khi bạn sửa đổi phần tử trong list, mã băm sẽ bị lệch và Python sẽ không thể tìm lại ô nhớ đó trong bảng băm!'
      }
    ],
    pitfalls: [
      {
        title: 'Đừng lạm dụng try...except nếu phương thức get() đã đủ tốt',
        content: 'Khối <code>try...except</code> có chi phí xử lý khi phát sinh ngoại lệ. Trong các tác vụ tra cứu thông thường của ma trận thưa, phương thức <code>Matrix.get(key, 0)</code> vừa chạy nhanh hơn vừa viết mã trong sáng hơn rất nhiều.'
      }
    ]
  },

  exercises: [
    {
      title: 'Biểu diễn bàn cờ tướng thưa bằng Dictionary với khóa Tuple',
      level: 'Vừa',
      problem: 'Bàn cờ tướng có kích thước 9x10 (90 ô). Hãy dùng một Dictionary chessboard = {} để lưu tọa độ và tên của hai quân cờ: quân \'Tướng\' đỏ tại tọa độ (4, 0) và quân \'Tướng\' đen tại tọa độ (4, 9). Sau đó viết một hàm get_piece(x, y) trả về tên quân cờ nếu có, hoặc trả về \'Trống\' nếu ô đó không có quân cờ.',
      hint: 'Dùng chessboard.get((x, y), \'Trống\').',
      solutionCode: `chessboard = {}

# Đặt quân cờ tại tọa độ cụ thể
chessboard[(4, 0)] = 'Tướng Đỏ'
chessboard[(4, 9)] = 'Tướng Đen'

def get_piece(x, y):
    return chessboard.get((x, y), 'Trống')

# Kiểm tra các ô
print("Ô (4, 0):", get_piece(4, 0))
print("Ô (4, 9):", get_piece(4, 9))
print("Ô (0, 0):", get_piece(0, 0))`,
      solutionOutput: `Ô (4, 0): Tướng Đỏ
Ô (4, 9): Tướng Đen
Ô (0, 0): Trống`,
      explanation: 'Dictionary chỉ tốn bộ nhớ cho đúng 2 ô có quân cờ thay vì phải cấp phát ma trận 90 phần tử. Hàm get() trả về \'Trống\' một cách an toàn cho 88 ô còn lại.'
    }
  ],

  quiz: [
    {
      question: 'Đối tượng nào sau đây KHÔNG THỂ được dùng làm khóa (key) trong Dictionary của Python?',
      options: [
        'Một số nguyên (ví dụ: 2024)',
        'Một chuỗi ký tự (ví dụ: "name")',
        'Một danh sách (ví dụ: [1, 2, 3])',
        'Một tuple chứa các số nguyên (ví dụ: (1, 2, 3))'
      ],
      correctIndex: 2,
      explanation: 'List là kiểu dữ liệu khả biến (mutable), không có hàm băm cố định (unhashable), do đó không thể được sử dụng làm khóa trong Dictionary.'
    },
    {
      question: 'Tại sao việc dùng Dictionary với khóa số nguyên lại tối ưu hơn List lớn được nhân bản [0] * 1000000 khi chỉ cần lưu một vài vị trí?',
      options: [
        'Vì Dictionary tự động sắp xếp các số nguyên.',
        'Vì Dictionary chỉ cấp phát bộ nhớ cho đúng những khóa thực sự được gán, tránh lãng phí RAM cho hàng triệu ô nhớ trống.',
        'Vì List không hỗ trợ chỉ số vượt quá 1000.',
        'Vì Dictionary chạy trên đa luồng.'
      ],
      correctIndex: 1,
      explanation: 'Với cấu trúc dữ liệu thưa, Dictionary chỉ lưu các cặp khóa-giá trị thực sự có dữ liệu, giúp tiết kiệm bộ nhớ RAM khổng lồ so với việc cấp phát trước một mảng lớn phần lớn là số 0.'
    }
  ],

  summary: [
    'Dictionary là ánh xạ (mapping), không hỗ trợ các thao tác dãy tuần tự như cắt lát hay ghép nối.',
    'Chỉ các đối tượng bất biến và băm được (chuỗi, số, tuple) mới được phép làm khóa của Dictionary; đối tượng khả biến (list, set, dict) bị cấm.',
    'Dùng khóa số nguyên trong Dictionary giúp mô phỏng mảng tự co giãn mà không lo lỗi IndexError hay lãng phí bộ nhớ.',
    'Khóa Tuple đại diện cho tọa độ đa chiều (X, Y, Z) là giải pháp hoàn hảo để cài đặt ma trận thưa.',
    'Ba kỹ thuật xử lý thiếu khóa gồm: phương thức get() (ngắn gọn nhất), câu lệnh if...in, và khối bắt ngoại lệ try...except KeyError.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.21), chúng ta sẽ nghiên cứu cách Biểu diễn Bản ghi (Record / JSON), Đối tượng View của Dictionary (keys, values, items), Tính chất Set-like và Quy tắc so sánh Dictionary.'
};