export default {
  id: 'p0b-05',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B1.5',
  title: 'Ba cấu trúc điều khiển kinh điển: Tuần tự, Rẽ nhánh và Lặp',
  subtitle: 'Trình bày song song Sơ đồ ↔ Code Python: Sequence, Selection (if/elif/else) và Iteration (while/for) như hai mặt của một đồng xu',
  level: 'Cơ bản',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững 3 cấu trúc điều khiển cơ bản cấu thành 100% mọi chương trình máy tính: Tuần tự (Sequence), Rẽ nhánh (Selection) và Lặp (Iteration).',
    'Thành thạo việc đối chiếu song song 1-1 giữa hình mẫu Flowchart hình học và đoạn mã Python tương ứng.',
    'Nhận biết các biến thể của cấu trúc rẽ nhánh: Nhánh đơn (`if`), Nhánh kép (`if/else`), và Đa nhánh (`if/elif/else`).',
    'Hiểu bản chất cấu trúc lặp: Vòng lặp kiểm tra trước (`while`) và vòng lặp duyệt tập hợp (`for`).'
  ],

  intuition: {
    title: 'Ba nốt nhạc cơ bản tạo nên bản giao hưởng vĩ đại',
    metaphor: 'Trong âm nhạc, dù là bài hát thiếu nhi đơn giản hay bản giao hưởng hùng tráng của Beethoven, mọi giai điệu đều được xây dựng từ đúng 7 nốt nhạc cơ bản. Trong khoa học máy tính cũng vậy: dù là một script tính tổng 3 dòng hay toàn bộ hệ điều hành Windows và thuật toán AI phức tạp của Google, toàn bộ chương trình chỉ được ghép lại từ đúng 3 cấu trúc điều khiển cơ bản: Đi thẳng (Tuần tự), Rẽ hướng (Rẽ nhánh), và Quay vòng (Lặp)! Sơ đồ Flowchart và đoạn code Python không phải là hai thứ khác nhau; chúng chỉ là hai cách vẽ khác nhau của cùng một suy nghĩ logic: một bên dùng bút vẽ hình khối 2 chiều, một bên dùng bàn phím gõ từ ngữ 1 chiều.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">BA CẤU TRÚC ĐIỀU KHIỂN CỐT LÕI (BÖHM &amp; JACOPINI)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;text-align:center;">
          <div style="padding:12px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--accent-primary);">1. TUẦN TỰ (Sequence)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">Đi thẳng một mạch</div>
            <div style="padding:4px;background:var(--bg-surface-alt);border-radius:4px;font-size:0.75rem;">A ➔ B ➔ C</div>
          </div>
          <div style="padding:12px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--py-gold);">2. RẼ NHÁNH (Selection)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">Chọn 1 trong các hướng</div>
            <div style="padding:4px;background:var(--bg-surface-alt);border-radius:4px;font-size:0.75rem;">Đúng ➔ A | Sai ➔ B</div>
          </div>
          <div style="padding:12px;border:2px solid var(--success);border-radius:8px;background:var(--bg-surface);">
            <div style="font-weight:700;color:var(--success);">3. LẶP (Iteration)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">Lặp lại chừng nào còn đúng</div>
            <div style="padding:4px;background:var(--bg-surface-alt);border-radius:4px;font-size:0.75rem;">Kiểm tra ➔ Làm ➔ Quay lại</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Cấu trúc 1: TUẦN TỰ (Sequence) — Chảy thẳng từ trên xuống',
      badge: 'Cấu trúc Cơ sở',
      content: `
        <p><strong>Bản chất:</strong> Các câu lệnh được thực thi lần lượt từng dòng một theo thứ tự xuất hiện, từ bước 1 đến bước 2, rồi đến bước 3, không có rẽ ngang và không có quay đầu.</p>
        <div style="display:flex;justify-content:center;margin:16px 0;">
          <svg viewBox="0 0 240 180" width="240" height="180" role="img" aria-label="Lưu đồ cấu trúc tuần tự" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="10" width="140" height="36" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="120" y="33" text-anchor="middle" font-size="12" fill="var(--text-primary)">Bước 1: Nhập a, b</text>
            <path d="M 120 46 L 120 68" stroke="var(--border-strong)" stroke-width="2" marker-end="url(#arrow)"/>
            
            <rect x="50" y="70" width="140" height="36" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="120" y="93" text-anchor="middle" font-size="12" fill="var(--text-primary)">Bước 2: tong = a + b</text>
            <path d="M 120 106 L 120 128" stroke="var(--border-strong)" stroke-width="2" marker-end="url(#arrow)"/>
            
            <rect x="50" y="130" width="140" height="36" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="120" y="153" text-anchor="middle" font-size="12" fill="var(--text-primary)">Bước 3: In ra tong</text>
          </svg>
        </div>
      `,
      codeExamples: [
        {
          title: 'Code Python tương ứng với cấu trúc Tuần tự',
          code: `# Cấu trúc Tuần tự: Dòng 1 chạy xong -> đến dòng 2 -> đến dòng 3
a = 15
b = 25
tong = a + b
print(f"Tổng của {a} và {b} là: {tong}")`,
          output: `Tổng của 15 và 25 là: 40`,
          annotations: [
            { line: 2, text: 'Thực hiện tuần tự từ trên xuống dưới.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Cấu trúc 2: RẼ NHÁNH (Selection) — Quyết định ngã rẽ',
      badge: 'Cấu trúc Lựa chọn',
      content: `
        <p><strong>Bản chất:</strong> Đứng trước một câu hỏi điều kiện (Hình thoi), luồng chương trình sẽ chọn rẽ sang một trong các hướng tùy thuộc vào kết quả kiểm tra là <code>Đúng (True)</code> hay <code>Sai (False)</code>.</p>
        <div style="display:flex;justify-content:center;margin:16px 0;">
          <svg viewBox="0 0 320 160" width="320" height="160" role="img" aria-label="Lưu đồ cấu trúc rẽ nhánh if else" xmlns="http://www.w3.org/2000/svg">
            <!-- Diamond Decision -->
            <polygon points="160,10 230,45 160,80 90,45" fill="var(--bg-surface)" stroke="var(--py-gold)" stroke-width="2"/>
            <text x="160" y="49" text-anchor="middle" font-size="11" fill="var(--text-primary)">x % 2 == 0 ?</text>
            
            <!-- Nhánh Đúng sang phải -->
            <path d="M 230 45 L 280 45 L 280 90" stroke="var(--border-strong)" stroke-width="2"/>
            <text x="245" y="38" font-size="10" fill="var(--success)" font-weight="bold">Đúng</text>
            <rect x="235" y="90" width="90" height="32" rx="4" fill="var(--bg-surface)" stroke="var(--success)" stroke-width="2"/>
            <text x="280" y="110" text-anchor="middle" font-size="10" fill="var(--text-primary)">In "Chẵn"</text>
            
            <!-- Nhánh Sai sang trái -->
            <path d="M 90 45 L 40 45 L 40 90" stroke="var(--border-strong)" stroke-width="2"/>
            <text x="55" y="38" font-size="10" fill="var(--danger)" font-weight="bold">Sai</text>
            <rect x="-5" y="90" width="90" height="32" rx="4" fill="var(--bg-surface)" stroke="var(--danger)" stroke-width="2"/>
            <text x="40" y="110" text-anchor="middle" font-size="10" fill="var(--text-primary)">In "Lẻ"</text>
            
            <!-- Gom luồng về điểm nối -->
            <circle cx="160" cy="145" r="8" fill="var(--border-strong)"/>
            <path d="M 40 122 L 40 145 L 152 145" stroke="var(--border-strong)" stroke-width="2"/>
            <path d="M 280 122 L 280 145 L 168 145" stroke="var(--border-strong)" stroke-width="2"/>
          </svg>
        </div>
      `,
      codeExamples: [
        {
          title: 'Code Python tương ứng với cấu trúc Rẽ nhánh (if / else)',
          code: `x = 7

# Cấu trúc Rẽ nhánh kiểm tra chẵn lẻ
if x % 2 == 0:
    loai_so = "Số chẵn"
else:
    loai_so = "Số lẻ"

print(f"{x} là {loai_so}")`,
          output: `7 là Số lẻ`,
          annotations: [
            { line: 4, text: 'Khối if tương ứng nhánh Đúng.' },
            { line: 6, text: 'Khối else tương ứng nhánh Sai.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Cấu trúc 3: LẶP (Iteration) — Chu trình quay vòng',
      badge: 'Cấu trúc Lặp',
      content: `
        <p><strong>Bản chất:</strong> Một nhóm các câu lệnh được lặp đi lặp lại nhiều lần chừng nào một điều kiện kiểm tra vẫn còn thỏa mãn. Luôn có một đường mũi tên quay ngược lên trên để tạo thành chu trình khép kín.</p>
        <div style="display:flex;justify-content:center;margin:16px 0;">
          <svg viewBox="0 0 300 200" width="300" height="200" role="img" aria-label="Lưu đồ cấu trúc vòng lặp while" xmlns="http://www.w3.org/2000/svg">
            <!-- Khởi tạo -->
            <rect x="90" y="10" width="120" height="30" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="150" y="30" text-anchor="middle" font-size="11" fill="var(--text-primary)">i = 1</text>
            
            <!-- Điều kiện lặp -->
            <polygon points="150,55 210,85 150,115 90,85" fill="var(--bg-surface)" stroke="var(--py-gold)" stroke-width="2"/>
            <text x="150" y="89" text-anchor="middle" font-size="11" fill="var(--text-primary)">i &lt;= 3 ?</text>
            
            <!-- Nhánh Đúng: Làm việc và tăng i -->
            <text x="160" y="130" font-size="10" fill="var(--success)" font-weight="bold">Đúng</text>
            <rect x="80" y="135" width="140" height="36" rx="4" fill="var(--bg-surface)" stroke="var(--success)" stroke-width="2"/>
            <text x="150" y="152" text-anchor="middle" font-size="10" fill="var(--text-primary)">In i, Tăng i = i + 1</text>
            
            <!-- Mũi tên quay ngược lên (Vòng lặp) -->
            <path d="M 80 153 L 40 153 L 40 85 L 90 85" stroke="var(--border-strong)" stroke-width="2"/>
            
            <!-- Nhánh Sai: Thoát vòng lặp -->
            <path d="M 210 85 L 260 85 L 260 185 L 170 185" stroke="var(--border-strong)" stroke-width="2"/>
            <text x="220" y="78" font-size="10" fill="var(--danger)" font-weight="bold">Sai (Thoát)</text>
            <rect x="70" y="175" width="100" height="20" rx="10" fill="var(--bg-surface)" stroke="var(--danger)" stroke-width="2"/>
            <text x="120" y="189" text-anchor="middle" font-size="10" fill="var(--text-primary)">Kết thúc</text>
          </svg>
        </div>
      `,
      codeExamples: [
        {
          title: 'Code Python tương ứng với cấu trúc Lặp (while và for)',
          code: `# Dạng 1: Vòng lặp while kiểm tra điều kiện
i = 1
print("Vòng lặp while:")
while i <= 3:
    print(" -> Lần lặp i =", i)
    i += 1  # Bắt buộc tăng biến đếm để thoát lặp!

# Dạng 2: Vòng lặp for tương đương chuẩn Pythonic
print("\\nVòng lặp for:")
for x in range(1, 4):
    print(" -> Lần lặp x =", x)`,
          output: `Vòng lặp while:
 -> Lần lặp i = 1
 -> Lần lặp i = 2
 -> Lần lặp i = 3

Vòng lặp for:
 -> Lần lặp x = 1
 -> Lần lặp x = 2
 -> Lần lặp x = 3`,
          annotations: [
            { line: 4, text: 'while i <= 3 tương ứng với hình thoi điều kiện lặp.' },
            { line: 6, text: 'i += 1 tương ứng với bước cập nhật trạng thái trước khi quay ngược mũi tên lên.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Quên bước cập nhật biến điều khiển vòng lặp (Lặp vô hạn)',
        content: 'Trên sơ đồ Flowchart, nếu mũi tên quay ngược lên trên đỉnh của hình thoi mà TRÊN ĐƯỜNG ĐI không có bất kỳ khối chữ nhật nào thay đổi biến đếm (như `i = i + 1`), vòng lặp đó sẽ quay tít mù mãi mãi! Luôn kiểm tra xem biến điều kiện có được biến đổi ở mỗi vòng lặp hay không.'
      }
    ],
    tips: [
      {
        title: 'Định lý Cấu trúc Böhm–Jacopini (1966)',
        content: 'Hai nhà khoa học máy tính Corrado Böhm và Giuseppe Jacopini đã chứng minh về mặt toán học rằng: Mọi thuật toán tính toán được trong vũ trụ đều có thể biểu diễn trọn vẹn chỉ bằng sự kết hợp của 3 cấu trúc: Tuần tự, Rẽ nhánh và Lặp mà không bao giờ cần đến lệnh nhảy tùy tiện GOTO! (Sẽ học sâu ở Tầng 3).'
      }
    ],
    deepDive: null,
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Nhận diện cấu trúc điều khiển qua đoạn code mẫu',
      problem: 'Cho đoạn code sau:\\n```python\\ntong = 0\\nfor x in [10, 20, 30]:\\n    if x > 15:\\n        tong += x\\nprint(tong)\\n```\\nHỏi: Đoạn code trên là sự kết hợp của những cấu trúc điều khiển nào trong 3 cấu trúc kinh điển?',
      hint: 'Có vòng lặp for, bên trong có if, các lệnh xếp tuần tự.',
      solutionCode: `giai_thich = """
KẾT QUẢ PHÂN TÍCH:
1. Cấu trúc LẶP (Iteration): Thể hiện qua vòng lặp 'for x in [10, 20, 30]'.
2. Cấu trúc RẼ NHÁNH (Selection): Thể hiện qua câu lệnh 'if x > 15:'.
3. Cấu trúc TUẦN TỰ (Sequence): Khởi tạo tong = 0 -> chạy vòng lặp -> in ra print(tong).

Đây là ví dụ kinh điển về việc lồng ghép cả 3 cấu trúc điều khiển trong một bài toán thực tế.
"""
print(giai_thich.strip())`,
      solutionOutput: `KẾT QUẢ PHÂN TÍCH:
1. Cấu trúc LẶP (Iteration): Thể hiện qua vòng lặp 'for x in [10, 20, 30]'.
2. Cấu trúc RẼ NHÁNH (Selection): Thể hiện qua câu lệnh 'if x > 15:'.
3. Cấu trúc TUẦN TỰ (Sequence): Khởi tạo tong = 0 -> chạy vòng lặp -> in ra print(tong).

Đây là ví dụ kinh điển về việc lồng ghép cả 3 cấu trúc điều khiển trong một bài toán thực tế.`,
      explanation: 'Hầu hết các chương trình thực tế đều là sự phối hợp khéo léo của 3 cấu trúc nền tảng này.',
      annotations: [
        { line: 2, text: 'Nhận diện đầy đủ 3 cấu trúc lồng nhau.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Chuyển đổi lưu đồ rẽ nhánh đa hướng thành cấu trúc if/elif/else',
      problem: 'Một lưu đồ phân loại khách hàng có 3 nhánh ra từ tuổi:\\n- tuoi < 12: Giá vé 50k\\n- 12 <= tuoi <= 60: Giá vé 100k\\n- tuoi > 60: Giá vé 70k\\nHãy viết hàm Python `tinh_ve(tuoi)` thể hiện cấu trúc rẽ nhánh này và in kết quả kiểm thử cho 3 độ tuổi: 8, 25, 65.',
      hint: 'Dùng if tuoi < 12: ... elif tuoi <= 60: ... else: ...',
      solutionCode: `def tinh_ve(tuoi):
    if tuoi < 12:
        return 50000
    elif tuoi <= 60:
        return 100000
    else:
        return 70000

print("Tuổi 8: ", tinh_ve(8), "đ")
print("Tuổi 25:", tinh_ve(25), "đ")
print("Tuổi 65:", tinh_ve(65), "đ")`,
      solutionOutput: `Tuổi 8:  50000 đ
Tuổi 25: 100000 đ
Tuổi 65: 70000 đ`,
      explanation: 'Cấu trúc if/elif/else chia sẻ luồng rẽ nhánh đa hướng tương ứng với chuỗi các khối hình thoi nối tiếp trong lưu đồ.',
      annotations: [
        { line: 2, text: 'Phân loại đa nhánh logic chặt chẽ.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Theo định lý Böhm–Jacopini, những cấu trúc điều khiển nào là ĐỦ để biểu diễn mọi hàm tính toán được trong khoa học máy tính?',
      options: [
        'Chỉ cần duy nhất cấu trúc Lặp (Iteration).',
        'Tuần tự (Sequence), Rẽ nhánh (Selection), và Lặp (Iteration).',
        'Cần thêm câu lệnh GOTO và con trỏ bộ nhớ.',
        'Cần ít nhất 10 cấu trúc khác nhau.'
      ],
      correctIndex: 1,
      explanation: 'Định lý Böhm-Jacopini chứng minh chỉ cần 3 cấu trúc cơ bản: Tuần tự, Rẽ nhánh và Lặp là đủ cho mọi thuật toán.'
    },
    {
      question: 'Dấu hiệu nhận biết rõ ràng nhất của cấu trúc Lặp (Iteration) trên một bản vẽ Flowchart là gì?',
      options: [
        'Có chứa nhiều hình chữ nhật.',
        'Có một đường mũi tên chỉ hướng quay ngược lên phía trước của dòng chảy logic để tạo thành chu trình kín.',
        'Có hai điểm Bắt đầu Start.',
        'Tất cả các mũi tên đều có màu đỏ.'
      ],
      correctIndex: 1,
      explanation: 'Mũi tên quay ngược lên báo hiệu sự lặp lại của một khối lệnh cho đến khi điều kiện thoát được kích hoạt.'
    },
    {
      question: 'Cấu trúc rẽ nhánh if / else trong Python tương ứng với hình khối hình học nào trong tiêu chuẩn ISO 5807?',
      options: [
        'Hình bình hành (Parallelogram)',
        'Hình thoi (Diamond) với 2 nhánh ra có nhãn Đúng / Sai',
        'Hình tròn (Circle)',
        'Hình bầu dục (Oval)'
      ],
      correctIndex: 1,
      explanation: 'Hình thoi Decision đại diện cho mệnh đề điều kiện if với các nhánh rẽ tương ứng True/False.'
    }
  ],

  summary: [
    'Mọi chương trình trên thế giới đều cấu thành từ 3 khối điều khiển: Tuần tự (Sequence), Rẽ nhánh (Selection) và Lặp (Iteration).',
    'Tuần tự: chạy thẳng từ trên xuống; Rẽ nhánh: chọn đường đi dựa trên điều kiện True/False; Lặp: chu trình quay ngược mũi tên lên trên.',
    'Sơ đồ Flowchart và code Python là hai cách biểu đạt song song của cùng một tư duy thuật toán.',
    'Luôn đảm bảo vòng lặp có khối cập nhật biến trạng thái để tránh rơi vào bẫy lặp vô hạn.'
  ]
};
