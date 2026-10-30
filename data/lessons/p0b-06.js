export default {
  id: 'p0b-06',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B1.6',
  title: '5 Bài toán nền tảng: Flowchart, Code Python & Bảng Dry Run',
  subtitle: 'Thực hành toàn diện qua 5 thuật toán kinh điển: Chẵn/lẻ, Max của 3 số, Tổng 1..n, Bộ đếm và Kiểm tra số nguyên tố cơ bản',
  level: 'Cơ bản',
  duration: '40 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thực hành thiết kế trọn gói từ Đề bài ➔ Mô hình IPO ➔ Flowchart ➔ Code Python ➔ Bảng theo dõi giá trị (Trace Table).',
    'Làm chủ 5 thuật toán nền tảng kinh điển của lập trình viên: Kiểm tra chẵn lẻ, Tìm max của 3 số, Tính tổng dải số, Bộ đếm, và Kiểm tra số nguyên tố.',
    'Hình thành phản xạ lập Bảng theo dõi biến (Dry Run table) để kiểm tra từng bước tính toán mà không cần máy tính.',
    'Nhận biết các kỹ thuật xử lý biên trong từng bài toán: số 0, số âm, số nguyên tố nhỏ nhất.'
  ],

  intuition: {
    title: '5 Bài tập khởi động của võ sinh đai trắng',
    metaphor: 'Trong võ thuật, trước khi học những bài quyền phức tạp trên sàn đấu, mọi võ sinh đều phải thuần thục 5 đòn thế căn bản: đấm thẳng, đá trước, gạt ngang, thế tấn và né đòn. 5 bài toán trong bài học này chính là 5 đòn thế căn bản của người học thuật toán! Khi bạn đã tự tay vẽ được lưu đồ, viết được code và lập được bảng dò biến cho cả 5 bài toán này mà không vấp váp, bộ não của bạn đã được "lập trình" sẵn phản xạ tư duy thuật toán vững chắc.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">5 BÀI TOÁN NỀN TẢNG KINH ĐIỂN CỦA LẬP TRÌNH</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:8px;text-align:center;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong>1. Chẵn / Lẻ</strong><br/><small style="color:var(--text-muted);">Toán tử dư %</small>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong>2. Max của 3 số</strong><br/><small style="color:var(--text-muted);">So sánh rẽ nhánh</small>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong>3. Tổng 1 đến n</strong><br/><small style="color:var(--text-muted);">Bộ tích lũy (Sum)</small>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong>4. Bộ đếm (Count)</strong><br/><small style="color:var(--text-muted);">Đếm thỏa điều kiện</small>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <strong>5. Số nguyên tố</strong><br/><small style="color:var(--text-muted);">Vòng lặp &amp; cờ hiệu</small>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Bài toán 1 & 2: Kiểm tra Chẵn/Lẻ & Tìm Số lớn nhất của 3 số (Max of 3)',
      badge: 'Cấu trúc Rẽ nhánh',
      content: `
        <h4>1. Kiểm tra Chẵn / Lẻ:</h4>
        <p>Thuật toán dựa trên tính chất toán học: số nguyên chia hết cho 2 (phần dư <code>n % 2 == 0</code>) là số chẵn, ngược lại là số lẻ.</p>
        <h4>2. Tìm Số lớn nhất của 3 số (a, b, c):</h4>
        <p>Thuật toán tối ưu tư duy "Vua giữ vương miện": ban đầu giả định <code>max_val = a</code>. So sánh <code>max_val</code> với <code>b</code>, nếu $b > \\text{max\\_val}$ thì trao vương miện cho <code>b</code>. So sánh tiếp với <code>c</code>, nếu $c > \\text{max\\_val}$ thì trao cho <code>c</code>. Cuối cùng <code>max_val</code> chắc chắn là số lớn nhất.</p>
      `,
      codeExamples: [
        {
          title: 'Code và Bảng Dry Run cho Bài toán Tìm Max 3 số',
          code: `def tim_max_ba_so(a, b, c):
    max_val = a      # Giả định a là lớn nhất ban đầu
    if b > max_val:
        max_val = b  # Cập nhật nếu b lớn hơn
    if c > max_val:
        max_val = c  # Cập nhật nếu c lớn hơn
    return max_val

print("Max(15, 42, 28) =", tim_max_ba_so(15, 42, 28))
print("Max(99, 10, 50) =", tim_max_ba_so(99, 10, 50))`,
          output: `Max(15, 42, 28) = 42
Max(99, 10, 50) = 99`,
          annotations: [
            { line: 2, text: 'Khởi tạo max_val bằng a.' },
            { line: 3, text: 'Chỉ cần đúng 2 phép so sánh là tìm ra max của 3 số, không cần lồng if phức tạp.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Bài toán 3 & 4: Tính Tổng từ 1 đến n & Mẫu Thuật toán Bộ đếm (Count)',
      badge: 'Cấu trúc Lặp',
      content: `
        <h4>3. Tính tổng $S = 1 + 2 + ... + n$:</h4>
        <p>Sử dụng <strong>Bộ tích lũy (Accumulator)</strong>: khởi tạo <code>tong = 0</code>. Cho biến <code>i</code> chạy từ $1$ đến $n$, mỗi bước cộng dồn <code>tong = tong + i</code>.</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Bước chạy tay</th>
                <th>Biến lặp <code>i</code></th>
                <th>Điều kiện <code>i <= 4</code></th>
                <th>Biến tích lũy <code>tong</code></th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Khởi tạo</td><td>—</td><td>—</td><td><code>0</code></td><td>tong = 0, i = 1</td></tr>
              <tr><td>Vòng 1</td><td>1</td><td>True</td><td><code>0 + 1 = 1</code></td><td>Cộng 1, tăng i lên 2</td></tr>
              <tr><td>Vòng 2</td><td>2</td><td>True</td><td><code>1 + 2 = 3</code></td><td>Cộng 2, tăng i lên 3</td></tr>
              <tr><td>Vòng 3</td><td>3</td><td>True</td><td><code>3 + 3 = 6</code></td><td>Cộng 3, tăng i lên 4</td></tr>
              <tr><td>Vòng 4</td><td>4</td><td>True</td><td><code>6 + 4 = 10</code></td><td>Cộng 4, tăng i lên 5</td></tr>
              <tr><td>Thoát lặp</td><td>5</td><td><strong>False</strong></td><td><code>10</code></td><td>Dừng vòng lặp, trả về 10</td></tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Code Tính tổng 1 đến n và Đếm số lượng số chẵn trong dãy',
          code: `# 1. Tính tổng 1 đến n
def tinh_tong(n):
    tong = 0
    for i in range(1, n + 1):
        tong += i
    return tong

print("Tổng từ 1 đến 4:", tinh_tong(4))
print("Tổng từ 1 đến 100:", tinh_tong(100))

# 2. Mẫu Bộ đếm (Count): Đếm số chia hết cho 3 trong khoảng [1, 20]
def dem_chia_het_cho_3(gioi_han):
    dem = 0
    for x in range(1, gioi_han + 1):
        if x % 3 == 0:
            dem += 1
    return dem

print("Số lượng số chia hết cho 3 trong 1..20 là:", dem_chia_het_cho_3(20))`,
          output: `Tổng từ 1 đến 4: 10
Tổng từ 1 đến 100: 5050
Số lượng số chia hết cho 3 trong 1..20 là: 6`,
          annotations: [
            { line: 5, text: 'Phép += là bộ tích lũy kinh điển.' },
            { line: 16, text: 'dem += 1 chỉ kích hoạt khi điều kiện x % 3 == 0 thỏa mãn.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Bài toán 5: Kiểm tra Số nguyên tố cơ bản & Kỹ thuật Cờ hiệu (Flag)',
      badge: 'Thuật toán Cổ điển',
      content: `
        <p><strong>Định nghĩa:</strong> Số nguyên tố là số nguyên lớn hơn 1, chỉ có đúng hai ước số dương là 1 và chính nó ($2, 3, 5, 7, 11, ...$).</p>
        <h4>Chiến lược thuật toán:</h4>
        <ol>
          <li>Nếu $n \le 1$: Kết luận ngay KHÔNG phải số nguyên tố.</li>
          <li>Nếu $n == 2$: Là số nguyên tố chẵn duy nhất.</li>
          <li>Với $n > 2$: Dùng vòng lặp kiểm tra biến $d$ chạy từ $2$ đến $n - 1$. Nếu tồn tại bất kỳ số nào mà $n$ chia hết (<code>n % d == 0</code>), lập tức dừng lại (<code>break</code>) và kết luận KHÔNG phải số nguyên tố.</li>
          <li>Nếu duyệt hết mà không chia hết cho ai: Kết luận LÀ số nguyên tố!</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra số nguyên tố bằng cờ hiệu Flag và break',
          code: `def kiem_tra_nguyen_to_co_ban(n):
    if n <= 1:
        return False
    
    # Kỹ thuật cờ hiệu: Giả định ban đầu là số nguyên tố
    la_nguyen_to = True
    
    for d in range(2, n):
        if n % d == 0:
            la_nguyen_to = False  # Tìm thấy ước số -> Hạ cờ!
            break                # Thoát vòng lặp ngay lập tức
            
    return la_nguyen_to

# Kiểm thử với các số khác nhau:
cac_so = [1, 2, 7, 9, 13, 25]
for x in cac_so:
    print(f"Số {x:2d} có phải số nguyên tố?: {kiem_tra_nguyen_to_co_ban(x)}")`,
          output: `Số  1 có phải số nguyên tố?: False
Số  2 có phải số nguyên tố?: True
Số  7 có phải số nguyên tố?: True
Số  9 có phải số nguyên tố?: False
Số 13 có phải số nguyên tố?: True
Số 25 có phải số nguyên tố?: False`,
          annotations: [
            { line: 2, text: 'Xử lý biên: số <= 1 không phải nguyên tố.' },
            { line: 6, text: 'Cờ hiệu boolean la_nguyen_to lưu trạng thái kiểm tra.' },
            { line: 10, text: 'break giúp thuật toán dừng ngay khi phát hiện ước số đầu tiên.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy số 1 trong bài toán số nguyên tố',
        content: 'Rất nhiều người học quên mất định nghĩa toán học và cho rằng số 1 là số nguyên tố. Số 1 KHÔNG PHẢI là số nguyên tố vì nó chỉ có đúng 1 ước số dương (chính nó).'
      },
      {
        title: 'Bẫy khởi tạo nhầm biến tích lũy phép nhân',
        content: 'Khi tính tổng, ta khởi tạo `tong = 0`. Nhưng khi tính tích lũy thừa hoặc giai thừa, BẮT BUỘC phải khởi tạo `tich = 1`! Nếu khởi tạo bằng 0, mọi phép nhân đều biến thành 0.'
      }
    ],
    tips: [
      {
        title: 'Công thức toán học Gauss tính tổng 1 đến n trong O(1)',
        content: 'Nhà toán học Gauss lúc 7 tuổi đã phát hiện ra công thức: $S = n \times (n + 1) / 2$. Thay vì chạy vòng lặp tốn $n$ bước, công thức này chỉ tốn đúng 1 phép tính duy nhất!'
      }
    ],
    deepDive: null,
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Lập bảng chạy tay (Dry Run) cho bài toán tính giai thừa',
      problem: 'Cho thuật toán tính $n! = 1 \times 2 \times ... \times n$ với $n = 4$:\\n`tich = 1`\\n`for i in range(1, 5): tich *= i`\\nHãy lập bảng theo dõi giá trị của biến `i` và `tich` qua từng bước.',
      hint: 'Ban đầu tich = 1. Lần lượt nhân với 1, 2, 3, 4.',
      solutionCode: `def tinh_giai_thua(n):
    tich = 1
    bang_dry_run = []
    for i in range(1, n + 1):
        tich_cu = tich
        tich *= i
        bang_dry_run.append((i, tich_cu, i, tich))
    return tich, bang_dry_run

kq, bang = tinh_giai_thua(4)
print(f"{'Vòng i':<8} | {'Biến cũ':<10} | {'Nhân với':<10} | {'Tích mới':<10}")
print("-" * 46)
for row in bang:
    print(f"{row[0]:<8} | {row[1]:<10} | {row[2]:<10} | {row[3]:<10}")
print(f"\\nKết quả cuối cùng: 4! = {kq}")`,
      solutionOutput: `Vòng i   | Biến cũ    | Nhân với   | Tích mới  
----------------------------------------------
1        | 1          | 1          | 1         
2        | 1          | 2          | 2         
3        | 2          | 3          | 6         
4        | 6          | 4          | 24        

Kết quả cuối cùng: 4! = 24`,
      explanation: 'Bảng theo dõi biến cho thấy sự tích lũy của phép nhân qua từng vòng lặp một cách minh bạch.',
      annotations: [
        { line: 2, text: 'Khởi tạo tich = 1.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Đếm và tính trung bình cộng các số dương trong danh sách',
      problem: 'Cho một danh sách các số thực hỗn hợp: `ds = [-5, 10, 0, 20, -3, 30]`. Hãy viết hàm kết hợp cả mẫu Bộ đếm (Count) và Bộ tích lũy (Sum) để tính điểm trung bình của riêng các số dương (> 0). Xử lý an toàn nếu danh sách không có số dương nào.',
      hint: 'Duyệt qua danh sách, nếu x > 0: tang tong, tang dem.',
      solutionCode: `def trung_binh_so_duong(danh_sach):
    tong_duong = 0
    dem_duong = 0
    
    for x in danh_sach:
        if x > 0:
            tong_duong += x
            dem_duong += 1
            
    if dem_duong == 0:
        return 0.0
    return tong_duong / dem_duong

ds_so = [-5, 10, 0, 20, -3, 30]
print("Trung bình các số dương:", trung_binh_so_duong(ds_so))`,
      solutionOutput: `Trung bình các số dương: 20.0`,
      explanation: 'Các số dương là 10, 20, 30. Tổng là 60, số lượng là 3, trung bình là 60 / 3 = 20.0.',
      annotations: [
        { line: 7, text: 'Cùng lúc cập nhật cả biến đếm và biến tích lũy.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Khi sử dụng thuật toán tìm số lớn nhất của 3 số (a, b, c) theo chiến lược "Vua giữ vương miện", số lượng phép so sánh tối thiểu cần thực hiện là bao nhiêu?',
      options: [
        '1 phép so sánh',
        '2 phép so sánh',
        '6 phép so sánh',
        '3 phép so sánh'
      ],
      correctIndex: 1,
      explanation: 'Chỉ cần gán max = a, sau đó so sánh max với b (1 lần), rồi so sánh max với c (1 lần nữa) -> Đúng 2 phép so sánh.'
    },
    {
      question: 'Tại sao số 1 KHÔNG ĐƯỢC coi là số nguyên tố?',
      options: [
        'Vì 1 là số lẻ.',
        'Vì theo định nghĩa toán học, số nguyên tố phải lớn hơn 1 và có đúng 2 ước số dương phân biệt (1 và chính nó). Số 1 chỉ có duy nhất 1 ước số.',
        'Vì số 1 không chia hết cho 2.',
        'Vì các nhà khoa học quy ước ngẫu nhiên.'
      ],
      correctIndex: 1,
      explanation: 'Nếu coi 1 là số nguyên tố, Định lý Cơ bản của Số học (mọi số nguyên phân tích thành tích các thừa số nguyên tố duy nhất) sẽ bị phá vỡ vì có thể nhân thêm vô hạn số 1.'
    },
    {
      question: 'Trong thuật toán tính tích lũy thừa hoặc giai thừa, nếu bạn khởi tạo biến `tich = 0` thay vì `1`, điều gì sẽ xảy ra?',
      options: [
        'Chương trình báo lỗi cú pháp SyntaxError.',
        'Kết quả cuối cùng sẽ luôn luôn bằng 0 vì bất kỳ số nào nhân với 0 cũng bằng 0.',
        'Chương trình chạy vô tận không dừng.',
        'Kết quả không bị ảnh hưởng.'
      ],
      correctIndex: 1,
      explanation: '0 là phần tử trung hòa của phép cộng, nhưng 1 mới là phần tử trung hòa của phép nhân. Nhân với 0 sẽ triệt tiêu toàn bộ kết quả.'
    }
  ],

  summary: [
    '5 bài toán kinh điển: Chẵn/lẻ (toán tử %), Max 3 số (giữ vương miện), Tổng 1..n (bộ tích lũy sum += i), Bộ đếm (count += 1), Số nguyên tố (kiểm tra ước số và cờ hiệu flag).',
    'Khởi tạo biến: Bộ tích lũy tổng bắt đầu từ 0; Bộ tích lũy nhân bắt đầu từ 1.',
    'Số nguyên tố bắt buộc phải lớn hơn 1; số 2 là số nguyên tố chẵn duy nhất.',
    'Lập bảng Dry Run chạy tay từng bước là kỹ năng cốt lõi giúp phát hiện bug logic trước khi chạy máy.'
  ]
};
