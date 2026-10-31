export default {
  id: 'lp-c11-07',
  partId: 'part-lp-c11',
  chapter: 'Chương 11: Phép gán, Biểu thức và Lệnh print',
  number: 'C11.7',
  title: 'Câu lệnh Biểu thức — Bảng 11-4 & Cạm bẫy Gán đè Phương thức Thay đổi Tại chỗ',
  subtitle: 'Bản chất biểu thức đứng riêng vì tác dụng phụ, toàn cảnh 6 dạng trong Bảng 11-4, tính bất đối xứng lệnh-biểu thức và thảm họa L = L.append(4)',
  level: 'Cơ bản đến Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu bản chất của câu lệnh biểu thức (expression statement): thực thi biểu thức trên một dòng đứng riêng chỉ vì tác dụng phụ (side effect).',
    'Nắm vững 6 dạng câu lệnh biểu thức phổ biến trong Bảng 11-4 của Mark Lutz: gọi hàm, gọi phương thức, in REPL, hàm print, yield và await.',
    'Phân tích tính bất đối xứng nền tảng của cú pháp Python: mọi biểu thức đều có thể làm câu lệnh, nhưng câu lệnh không thể nhúng làm biểu thức.',
    'Nhận diện và phòng tránh triệt để cạm bẫy lập trình kinh điển: gán ngược kết quả phương thức thay đổi tại chỗ (L = L.append() hoặc L = L.sort()) khiến biến bị gán thành None và mất sạch dữ liệu.'
  ],

  intuition: {
    title: 'Hành Động Vì Hiệu Quả Phụ và Lời Nhắc Đừng Cưa Ghế Mình Ngồi',
    metaphor: 'Trong toán học, một biểu thức tính toán xong sẽ cho ra một con số để lưu lại. Nhưng trong lập trình, có những hành động bạn thực hiện không phải để lấy giá trị trả về, mà là để tạo ra một "tác dụng phụ" (side effect) hữu ích ra thế giới bên ngoài—giống như việc bạn bật công tắc đèn (đèn sáng) hay bấm còi xe (phát ra âm thanh). Khi bạn gọi phương thức L.append(3), bạn đang yêu cầu thợ mộc đóng thêm một ngăn kéo vào chiếc tủ L hiện có. Thao tác hoàn tất và thợ mộc không đưa lại chiếc tủ mới nào cả (hàm trả về None). Nếu bạn dại dột viết L = L.append(3), bạn đã tự tay vứt bỏ chiếc tủ đầy đủ đồ đạc của mình ra bãi rác và nhận về một bàn tay trắng (None)!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--danger);">CẠM BẪY TỬ HUYỆT: GÁN NGƯỢC PHƯƠNG THỨC THAY ĐỔI TẠI CHỖ</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;">
          <div style="padding:10px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--accent-primary);">L.append(4)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Thực hiện biến đổi tại chỗ<br>Trả về: <code>None</code></div>
          </div>
          <div style="font-size:1.6rem;color:var(--danger);font-weight:700;">GÁN VÀO ➔</div>
          <div style="padding:10px;background:rgba(239,68,68,0.1);border:2px solid var(--danger);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--danger);">L = L.append(4)</div>
            <div style="font-size:0.8rem;color:var(--danger);margin-top:4px;font-weight:700;">L TRỞ THÀNH None!<br>(Mất toàn bộ danh sách)</div>
          </div>
        </div>
        <div style="padding:6px 12px;background:var(--bg-surface);border-left:4px solid var(--danger);font-size:0.8rem;color:var(--text-secondary);">
          <strong>Quy tắc vàng:</strong> Luôn gọi các phương thức thay đổi tại chỗ (<code>append</code>, <code>sort</code>, <code>reverse</code>, <code>extend</code>) dưới dạng câu lệnh biểu thức đứng riêng, KHÔNG BAO GIỜ gán kết quả của chúng!
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Bản Chất Câu Lệnh Biểu Thức & Toàn Cảnh Bảng 11-4',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 26–27 / 38</strong>.</p>
          </div>
        </div>

        <p>Trong Python, bạn cũng có thể sử dụng bất kỳ biểu thức nào như một câu lệnh—điều này thường có nghĩa là đặt nó trên một dòng đứng hoàn toàn riêng lẻ. Tuy nhiên, vì kết quả của biểu thức sẽ không được lưu giữ lại vào bất kỳ biến nào, việc làm này trong các tập lệnh thường chỉ có ý nghĩa nếu biểu thức thực hiện một điều gì đó hữu ích dưới dạng một <strong>tác dụng phụ (side effect)</strong>.</p>
        <p>Các biểu thức thường được sử dụng làm câu lệnh trong hai tình huống cơ bản:</p>
        <ol>
          <li>
            <strong>Đối với các lệnh gọi hàm và phương thức (procedures):</strong> Một số hàm thực hiện công việc của chúng mà không trả về giá trị hữu ích nào (những hàm như vậy đôi khi được gọi là <em>thủ tục — procedures</em> trong các ngôn ngữ khác). Bạn gọi chúng chỉ để chúng thực thi hành động. Điều này cũng áp dụng cho các phương thức đối tượng.
          </li>
          <li>
            <strong>Đối với việc in các giá trị tại dấu nhắc lệnh tương tác (REPL):</strong> Python sẽ tự động in phản hồi kết quả của các biểu thức được gõ tại REPL. Về mặt kỹ thuật, đây cũng là các câu lệnh biểu thức, đóng vai trò như một cách viết tắt cho việc gõ lệnh <code>print</code>.
          </li>
        </ol>

        <p>Bảng 11-4 liệt kê các dạng câu lệnh biểu thức phổ biến nhất trong Python:</p>

        <div class="table-wrapper" style="margin:20px 0;">
          <table class="markdown-table" style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-subtle);text-align:left;">
                <th style="padding:10px 14px;color:var(--accent-primary);">Thao tác (Biểu thức)</th>
                <th style="padding:10px 14px;color:var(--accent-primary);">Ý nghĩa giải thích</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>hack('Py', 3.12)</code></td>
                <td style="padding:8px 14px;">Lệnh gọi hàm (function call)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>code.hack('Py')</code></td>
                <td style="padding:8px 14px;">Lệnh gọi phương thức (method call)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>hack</code></td>
                <td style="padding:8px 14px;">In kết quả trong trình thông dịch tương tác (REPL)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>print(a, b, c, sep='')</code></td>
                <td style="padding:8px 14px;">Thao tác in ấn (một lệnh gọi hàm đặc biệt)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 14px;"><code>yield x ** 2</code></td>
                <td style="padding:8px 14px;">Câu lệnh biểu thức sinh giá trị (generator — Chương 20)</td>
              </tr>
              <tr>
                <td style="padding:8px 14px;"><code>await producer()</code></td>
                <td style="padding:8px 14px;">Tạm dừng để đợi các bước hoàn thành (coroutine — Chương 20)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="callout-box callout-tip" style="border-left:4px solid #8b5cf6;margin:16px 0;">
          <div class="callout-header">
            <span>🎭</span>
            <span><strong>Biểu thức cải trang thành câu lệnh: print thực chất trả về None!</strong></span>
          </div>
          <div class="callout-body">
            <p>Mặc dù chúng ta thường viết lệnh <code>print(...)</code> trên một dòng đứng riêng như một câu lệnh độc lập, nhưng thực chất nó là một biểu thức gọi hàm bình thường và nó <strong>luôn luôn trả về giá trị <code>None</code></strong> (giá trị mặc định cho các hàm không có lệnh <code>return</code> cụ thể):</p>
            <pre><code>>>> x = print('code')
code
>>> print(x)
None</code></pre>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khảo sát các câu lệnh biểu thức và giá trị trả về None của print',
          code: `# 1. Lệnh gọi hàm thủ tục (thực thi vì tác dụng phụ)
def chao_mung(ten):
    print(f"Xin chào, {ten}!") # Tác dụng phụ: xuất dữ liệu ra màn hình

chao_mung("Pythonista") # Câu lệnh biểu thức

# 2. Lệnh gọi phương thức biến đổi đối tượng
danh_sach = [3, 1, 2]
danh_sach.sort() # Câu lệnh biểu thức làm thay đổi danh sách tại chỗ
print("Danh sách sau khi sort():", danh_sach)

# 3. Chứng minh print() trả về None
tra_ve = print("Kiểm tra giá trị trả về của print")
print("Giá trị biến tra_ve là:", tra_ve)`,
          output: `Xin chào, Pythonista!
Danh sách sau khi sort(): [1, 2, 3]
Kiểm tra giá trị trả về của print
Giá trị biến tra_ve là: None`,
          annotations: [
            { line: 5, text: 'chao_mung("Pythonista") là câu lệnh biểu thức đứng riêng trên một dòng.' },
            { line: 9, text: 'danh_sach.sort() sắp xếp danh sách tại chỗ mà không tạo biến mới.' },
            { line: 15, text: 'Hàm print() in văn bản ra console và trả về None cho biến tra_ve.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Tính Bất Đối Xứng Lệnh-Biểu Thức & Thảm Họa L = L.append(4)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần III: Câu lệnh và Cú pháp • Chương 11: Phép gán, Biểu thức và Lệnh print • <strong>PDF Trang 27–28 / 38</strong>.</p>
          </div>
        </div>

        <p>Một nguyên lý thiết kế then chốt của Python là <strong>tính bất đối xứng giữa câu lệnh và biểu thức</strong>:</p>
        <blockquote>
          <p><strong>Mặc dù các biểu thức có thể xuất hiện dưới dạng câu lệnh, nhưng điều ngược lại là KHÔNG ĐÚNG: các câu lệnh không thể được sử dụng làm biểu thức.</strong></p>
        </blockquote>

        <p>Chẳng hạn, Python không cho phép bạn nhúng các câu lệnh gán cơ bản (<code>=</code>) vào các biểu thức điều kiện như ngôn ngữ C (ví dụ <code>if x = 1:</code> bị cấm hoàn toàn). Mục đích là để bảo vệ bạn khỏi các lỗi ngầm tai hại do nhầm lẫn giữa <code>=</code> và <code>==</code>.</p>

        <h3>Thảm họa lập trình: Gán ngược phương thức thay đổi tại chỗ</h3>
        <p>Điều này dẫn đến một trong những sai lầm phổ biến và tai hại nhất đối với những người mới học Python: <strong>gán ngược kết quả của một phương thức thay đổi tại chỗ cho chính biến đó</strong>.</p>

        <p>Các phương thức danh sách như <code>append()</code>, <code>sort()</code>, và <code>reverse()</code> được thiết kế để <em>biến đổi danh sách tại chỗ (in-place)</em> nhằm tối ưu hóa hiệu năng và bộ nhớ. Chúng <strong>không bao giờ trả về danh sách đã thay đổi; thay vào đó, chúng luôn luôn trả về <code>None</code></strong>!</p>

        <pre><code>>>> L = [1, 2]
>>> L.append(3)      # ĐÚNG: Thao tác tại chỗ, L trở thành [1, 2, 3]
>>> L
[1, 2, 3]

>>> L = L.append(4)  # SAI LẦM TỬ HUYỆT: L.append(4) trả về None!
>>> print(L)
None                 # BẠN ĐÃ MẤT SẠCH TOÀN BỘ DANH SÁCH CỦA MÌNH!</code></pre>

        <p>Khi bạn viết <code>L = L.append(4)</code>, giá trị <code>None</code> trả về sẽ lập tức ghi đè lên biến <code>L</code>. Đối tượng danh sách chứa dữ liệu ban đầu không còn biến nào tham chiếu tới và sẽ bị bộ thu gom rác (<em>garbage collector</em>) xóa sổ khỏi bộ nhớ RAM!</p>

        <div class="callout-box callout-warning" style="border-left:4px solid var(--danger);margin:16px 0;">
          <div class="callout-header">
            <span>🚨</span>
            <span><strong>Quy tắc bất di bất dịch của Mark Lutz:</strong></span>
          </div>
          <div class="callout-body">
            <p><strong>Hãy luôn gọi các thao tác thay đổi tại chỗ mà KHÔNG gán kết quả của chúng!</strong></p>
            <p>Nếu bạn muốn sắp xếp danh sách và gán kết quả cho một biến mới, hãy sử dụng hàm dựng sẵn <code>sorted(L)</code> (hàm này tạo ra danh sách mới sắp xếp mà không chạm vào danh sách gốc), thay vì gọi phương thức tại chỗ <code>L.sort()</code>.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khảo sát thảm họa L = L.sort() / L.append() và cách dùng đúng',
          code: `# 1. CẠM BẪY SAI LẦM: Gán ngược append()
danh_sach_a = [10, 20]
danh_sach_a = danh_sach_a.append(30) # Gán đè biến bằng None!
print("Kết quả sau sai lầm gán append():", danh_sach_a)

# 2. CẠM BẪY SAI LẦM: Gán ngược sort()
danh_sach_b = [5, 2, 9, 1]
danh_sach_b = danh_sach_b.sort() # Gán đè biến bằng None!
print("Kết quả sau sai lầm gán sort():", danh_sach_b)

# 3. CÁCH LÀM ĐÚNG VỚI PHƯƠNG THỨC TẠI CHỖ
kho_hang = ['Chuối', 'Táo', 'Cam']
kho_hang.append('Xoài') # Gọi đứng riêng như một câu lệnh biểu thức
kho_hang.sort()         # Gọi đứng riêng tại chỗ
print("Cách làm đúng với phương thức tại chỗ:", kho_hang)

# 4. CÁCH LÀM ĐÚNG KHI MUỐN GÁN CHO BIẾN MỚI
chuoi_so = [40, 10, 30]
da_sap_xep = sorted(chuoi_so) # sorted() trả về list mới an toàn
print("Dùng hàm sorted() tạo biến mới:", da_sap_xep)
print("Danh sách gốc vẫn nguyên vẹn:", chuoi_so)`,
          output: `Kết quả sau sai lầm gán append(): None
Kết quả sau sai lầm gán sort(): None
Cách làm đúng với phương thức tại chỗ: ['Cam', 'Chuối', 'Táo', 'Xoài']
Dùng hàm sorted() tạo biến mới: [10, 30, 40]
Danh sách gốc vẫn nguyên vẹn: [40, 10, 30]`,
          annotations: [
            { line: 3, text: 'danh_sach_a.append(30) trả về None gán vào danh_sach_a, làm mất dữ liệu.' },
            { line: 8, text: 'danh_sach_b.sort() trả về None gán vào danh_sach_b, biến thành None.' },
            { line: 13, text: 'Gọi phương thức tại chỗ đứng riêng trên một dòng độc lập, không gán.' },
            { line: 19, text: 'sorted() là hàm dựng sẵn trả về danh sách mới, hoàn toàn an toàn khi gán.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    warnings: [
      {
        title: 'Lời dặn dò từ Mark Lutz: Thu gom rác (Garbage Collection)',
        content: 'Khi một đối tượng mất đi tham chiếu cuối cùng (như khi bạn vô tình gán None đè lên biến duy nhất trỏ tới nó), bộ thu gom rác của CPython sẽ giải phóng vùng nhớ đó ngay lập tức. Bạn sẽ không có cách nào lấy lại dữ liệu đó trong chương trình!'
      }
    ]
  },

  exercises: [
    {
      title: 'Sửa lỗi hàm xử lý danh sách điểm học sinh',
      level: 'Cơ bản',
      problem: 'Một đồng nghiệp viết hàm sau để nạp điểm mới và sắp xếp điểm: def cap_nhat_diem(ds, diem): ds = ds.append(diem); return ds.sort(). Hãy chỉ ra hai lỗi chết người trong hàm này và viết lại phiên bản chuẩn xác.',
      hint: 'Cả append() và sort() đều trả về None. Hãy gọi chúng thành từng câu lệnh độc lập không gán, sau đó return ds.',
      solutionCode: `# Sửa lại hàm chuẩn xác
def cap_nhat_diem_chuan(ds, diem):
    ds.append(diem) # Thay đổi tại chỗ
    ds.sort()       # Sắp xếp tại chỗ
    return ds       # Trả về chính danh sách đã biến đổi

bang_diem = [8.5, 9.0, 7.5]
ket_qua = cap_nhat_diem_chuan(bang_diem, 8.0)
print("Bảng điểm sau khi cập nhật và sắp xếp:", ket_qua)`,
      solutionOutput: `Bảng điểm sau khi cập nhật và sắp xếp: [7.5, 8.0, 8.5, 9.0]`,
      explanation: 'Không được gán ds = ds.append(diem) vì sẽ làm ds thành None. Không được return ds.sort() vì hàm sẽ trả về None. Gọi chúng riêng biệt và return ds.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn chạy câu lệnh print(L.append(5)) trên một danh sách L = [1, 2], màn hình sẽ hiển thị gì?',
      options: [
        '[1, 2, 5]',
        '5',
        'None',
        'Phát sinh lỗi AttributeError'
      ],
      correctIndex: 2,
      explanation: 'Phương thức append() thực hiện thêm phần tử vào danh sách tại chỗ và không trả về giá trị hữu ích nào, mặc định trả về None.'
    },
    {
      question: 'Vì sao câu lệnh if (x = 1): bị trình thông dịch Python cấm hoàn toàn?',
      options: [
        'Vì dấu ngoặc đơn không được phép xuất hiện sau if.',
        'Vì câu lệnh gán không phải là một biểu thức và không thể nhúng vào cấu trúc cú pháp khác, giúp tránh nhầm lẫn với phép so sánh ==.',
        'Vì số 1 không phải là giá trị logic hợp lệ.',
        'Vì Python chỉ cho phép gán biến bên trong hàm.'
      ],
      correctIndex: 1,
      explanation: 'Python có tính bất đối xứng: câu lệnh không thể dùng làm biểu thức. Điều này loại bỏ hoàn toàn lỗi ngầm vô tình gõ = khi muốn so sánh == như trong C.'
    },
    {
      question: 'Phương thức nào sau đây KHÔNG THAY ĐỔI danh sách tại chỗ mà trả về một đối tượng mới?',
      options: [
        'L.sort()',
        'L.reverse()',
        'L.append()',
        'sorted(L)'
      ],
      correctIndex: 3,
      explanation: 'sorted(L) là hàm dựng sẵn (built-in function), tạo và trả về một danh sách mới chứa các phần tử đã sắp xếp; ba phương thức còn lại đều là thao tác tại chỗ và trả về None.'
    }
  ],

  summary: [
    'Câu lệnh biểu thức đứng riêng trên một dòng, thực thi chỉ vì tác dụng phụ (gọi hàm thủ tục, in REPL).',
    'Bảng 11-4 tổng kết 6 dạng biểu thức phổ biến: gọi hàm, gọi phương thức, REPL, print, yield, await.',
    'Tính bất đối xứng: biểu thức có thể làm câu lệnh, nhưng câu lệnh không thể dùng làm biểu thức.',
    'Thảm họa L = L.append() hoặc L = L.sort(): các phương thức tại chỗ trả về None, gán ngược lại sẽ xóa sạch danh sách của bạn!'
  ]
};
