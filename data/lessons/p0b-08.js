export default {
  id: 'p0b-08',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B2.1',
  title: 'Mổ xẻ các dạng vòng lặp: Pre-test, Post-test, Lồng nhau và Sentinel',
  subtitle: 'So sánh chuyên sâu: while kiểm tra trước, mô phỏng do-while bằng while True, vòng lặp đếm for, break/continue và lính canh (sentinel)',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt bản chất giữa Vòng lặp kiểm tra trước (Pre-test Loop - while) và Vòng lặp kiểm tra sau (Post-test Loop - do-while).',
    'Thành thạo kỹ thuật mô phỏng vòng lặp Post-test trong Python bằng cú pháp `while True` kết hợp `break`.',
    'Hiểu cách biểu diễn Vòng lặp lồng nhau (Nested Loops) trên Flowchart và quy tắc bước nhảy biến đếm.',
    'Làm chủ mẫu vòng lặp có Điều kiện dừng đặc biệt (Sentinel Value - Giá trị lính canh).'
  ],

  intuition: {
    title: 'Bảo vệ soát vé ở cửa ra vào và Thanh tra kiểm tra tại ghế ngồi',
    metaphor: 'Vòng lặp kiểm tra trước (Pre-test) giống như người bảo vệ đứng soát vé ngay ở cửa rạp chiếu phim: nếu bạn không có vé hợp lệ (điều kiện False), bạn bị chặn ngay từ cửa và không được bước vào rạp dù chỉ một giây (thân vòng lặp có thể chạy 0 lần). Ngược lại, Vòng lặp kiểm tra sau (Post-test) giống như nhà hàng buffet "Ăn trước trả tiền sau": bạn bước vào ăn xong một bữa thỏa thuê rồi mới gặp quầy thu ngân kiểm tra hóa đơn (thân vòng lặp luôn luôn được chạy ít nhất 1 lần). Còn "Giá trị lính canh" (Sentinel) giống như mật hiệu dừng cuộc chơi: khi bạn chơi một trò chơi đố vui, người quản trò bảo "Hãy trả lời liên tục, cuộc chơi chỉ dừng lại khi bạn hô to chữ STOP!". Chữ STOP đó chính là lính canh báo hiệu kết thúc vòng lặp.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">SO SÁNH PRE-TEST (WHILE) VÀ POST-TEST (DO-WHILE)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;text-align:center;">
          <div style="padding:10px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);">PRE-TEST (KIỂM TRA TRƯỚC)</strong>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">Kiểm tra điều kiện ➔ Đúng mới làm</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Thân vòng lặp có thể chạy <strong>0 lần</strong></div>
          </div>
          <div style="padding:10px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--py-gold);">POST-TEST (KIỂM TRA SAU)</strong>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">Làm trước ➔ Kiểm tra điều kiện sau</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">Thân vòng lặp luôn chạy <strong>ít nhất 1 lần</strong></div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Pre-test vs Post-test và Cách mô phỏng trong Python',
      badge: 'Cơ chế Vòng lặp',
      content: `
        <p>Hầu hết các ngôn ngữ như C, C++, Java đều có cả hai cấu trúc: <code>while</code> (kiểm tra trước) và <code>do...while</code> (kiểm tra sau). Nhưng <strong>Python cố tình không có từ khóa do-while</strong> để giữ ngôn ngữ tinh giản.</p>
        <h4>Làm sao viết Post-test trong Python?</h4>
        <p>Thành ngữ kinh điển trong Python để tạo vòng lặp chạy ít nhất 1 lần là sử dụng <strong><code>while True</code> kết hợp lệnh <code>break</code> ở cuối thân vòng lặp</strong>:</p>
      `,
      codeExamples: [
        {
          title: 'So sánh cấu trúc Pre-test và Post-test trong Python',
          code: `# DẠNG 1: PRE-TEST (while điều_kiện)
# Nếu ban đầu x = 0, vòng lặp này không chạy dù chỉ một lần!
x = 0
print("Pre-test:")
while x > 0:
    print("Dòng này không bao giờ xuất hiện!")
    x -= 1

# DẠNG 2: POST-TEST (Mô phỏng do-while)
# Đảm bảo khối lệnh luôn chạy ít nhất 1 lần trước khi kiểm tra thoát
so = 0
print("\\nPost-test (Chạy ít nhất 1 lần):")
while True:
    so += 10
    print(" -> Đang xử lý, số =", so)
    # Kiểm tra điều kiện dừng ở cuối:
    if so >= 30:
        break`,
          output: `Pre-test:

Post-test (Chạy ít nhất 1 lần):
 -> Đang xử lý, số = 10
 -> Đang xử lý, số = 20
 -> Đang xử lý, số = 30`,
          annotations: [
            { line: 5, text: 'Điều kiện x > 0 bị sai ngay từ đầu, bỏ qua thân vòng lặp.' },
            { line: 15, text: 'Thân vòng lặp chạy trước, tăng số lên 10 rồi mới kiểm tra if so >= 30.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Vòng lặp lồng nhau (Nested Loops) và Giá trị lính canh (Sentinel)',
      badge: 'Kỹ thuật Nâng cao',
      content: `
        <h4>1. Vòng lặp lồng nhau (Nested Loops):</h4>
        <p>Là cấu trúc có một vòng lặp con nằm hoàn toàn bên trong thân của một vòng lặp cha. Với mỗi <strong>1 lần lặp của vòng lặp cha</strong>, vòng lặp con sẽ <strong>chạy hết toàn bộ chu trình của nó</strong>. Thường dùng để duyệt ma trận 2 chiều hoặc tạo bảng cửu chương.</p>
        <h4>2. Giá trị lính canh (Sentinel Value):</h4>
        <p>Là một giá trị đặc biệt được quy ước trước (ví dụ: nhập số <code>-1</code> hoặc chuỗi <code>"q"</code>) báo hiệu cho chương trình biết người dùng muốn kết thúc việc nhập dữ liệu mà không cần biết trước số lượng phần tử.</p>
      `,
      codeExamples: [
        {
          title: 'Vòng lặp lồng nhau (Bảng cửu chương) và Vòng lặp dùng Lính canh',
          code: `# 1. Vòng lặp lồng nhau: In bảng nhân 2 và 3
print("=== VÒNG LẶP LỒNG NHAU ===")
for i in [2, 3]:
    for j in [1, 2, 3]:
        print(f"{i} x {j} = {i * j}", end=" | ")
    print()  # Xuống dòng sau khi chạy xong vòng lặp con

# 2. Vòng lặp với Giá trị lính canh (Sentinel = -1)
print("\\n=== VÒNG LẶP DÙNG LÍNH CANH (SENTINEL) ===")
# Giả lập dòng dữ liệu nhập từ người dùng, số -1 báo hiệu dừng nhập
du_lieu_nhap = [15, 20, 35, -1, 50, 99]

tong_diem = 0
for x in du_lieu_nhap:
    if x == -1:  # Gặp lính canh -> DỪNG NGAY!
        print("Gặp giá trị lính canh -1: Dừng nhận dữ liệu.")
        break
    tong_diem += x

print("Tổng các số hợp lệ đã nhập:", tong_diem)`,
          output: `=== VÒNG LẶP LỒNG NHAU ===
2 x 1 = 2 | 2 x 2 = 4 | 2 x 3 = 6 | 
3 x 1 = 3 | 3 x 2 = 6 | 3 x 3 = 9 | 

=== VÒNG LẶP DÙNG LÍNH CANH (SENTINEL) ===
Gặp giá trị lính canh -1: Dừng nhận dữ liệu.
Tổng các số hợp lệ đã nhập: 70`,
          annotations: [
            { line: 5, text: 'Vòng lặp con j chạy hết 3 lần cho mỗi giá trị của i.' },
            { line: 15, text: 'Khi gặp lính canh -1, các số phía sau (50, 99) hoàn toàn bị bỏ qua.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Cộng nhầm giá trị lính canh vào kết quả tổng',
        content: 'Một lỗi logic rất phổ biến: khi người dùng nhập số lính canh `-1` để dừng, chương trình lỡ cộng luôn `-1` vào biến `tong` trước khi kiểm tra điều kiện. Luôn luôn kiểm tra lính canh TRƯỚC KHI thực hiện phép cộng tích lũy!'
      }
    ],
    tips: [
      {
        title: 'Nhận diện số lần lặp của Vòng lặp lồng nhau',
        content: 'Nếu vòng lặp ngoài chạy $N$ lần và vòng lặp trong chạy $M$ lần, tổng số lần thân vòng lặp trong được thực thi là $N \times M$ lần. Hãy cẩn thận khi $N$ và $M$ lớn (đây là nguồn gốc của độ phức tạp $O(n^2)$ sẽ học ở Tầng 3).'
      }
    ],
    deepDive: null,
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Thiết kế vòng lặp yêu cầu nhập lại mật khẩu cho đến khi đúng',
      problem: 'Viết một hàm mô phỏng quy trình nhập mật khẩu dạng Post-test: yêu cầu người dùng nhập mã PIN. Vòng lặp tiếp tục chạy chừng nào mã PIN nhập vào còn sai khác `"2026"`. Khi nhập đúng `"2026"`, in ra `"Đăng nhập thành công"` và dừng lại.',
      hint: 'Dùng while True: nhap = ... if nhap == "2026": break.',
      solutionCode: `def xac_thuc_pin(danh_sach_thu):
    for ma_pin in danh_sach_thu:
        print(f"Người dùng nhập: '{ma_pin}'")
        if ma_pin == "2026":
            print("-> Chính xác! Đăng nhập thành công.")
            break
        else:
            print("-> Sai mã PIN, yêu cầu nhập lại...")

xac_thuc_pin(["1111", "1234", "2026", "9999"])`,
      solutionOutput: `Người dùng nhập: '1111'
-> Sai mã PIN, yêu cầu nhập lại...
Người dùng nhập: '1234'
-> Sai mã PIN, yêu cầu nhập lại...
Người dùng nhập: '2026'
-> Chính xác! Đăng nhập thành công.`,
      explanation: 'Vòng lặp tiếp diễn chừng nào điều kiện đúng chưa xuất hiện, mô phỏng hoàn hảo mẫu nhập dữ liệu kiểm tra sau.',
      annotations: [
        { line: 4, text: 'Kiểm tra điều kiện thoát.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Vẽ ma trận hình vuông bằng hai vòng lặp lồng nhau',
      problem: 'Viết một hàm `ve_ma_tran(n)` in ra một ma trận hình vuông kích thước $n \times n$ gồm các dấu sao `*` cách nhau bởi dấu cách bằng cách dùng 2 vòng lặp for lồng nhau.',
      hint: 'Vòng ngoài for i in range(n), vòng trong for j in range(n) in print("*", end=" ").',
      solutionCode: `def ve_ma_tran(n):
    for hang in range(n):
        for cot in range(n):
            print("*", end=" ")
        print()  # Hết một hàng thì xuống dòng

print("Ma trận 3x3:")
ve_ma_tran(3)`,
      solutionOutput: `Ma trận 3x3:
* * * 
* * * 
* * * `,
      explanation: 'Vòng lặp trong in đủ n ngôi sao trên cùng 1 hàng, vòng lặp ngoài lặp lại n hàng để tạo thành lưới vuông.',
      annotations: [
        { line: 4, text: 'end=" " giữ các dấu sao trên cùng một hàng.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Sự khác biệt cốt lõi giữa Vòng lặp Pre-test (while) và Post-test (do-while) là gì?',
      options: [
        'Pre-test chạy nhanh hơn Post-test gấp 2 lần.',
        'Pre-test kiểm tra điều kiện trước nên thân vòng lặp có thể chạy 0 lần; còn Post-test kiểm tra điều kiện sau nên thân vòng lặp luôn chạy ít nhất 1 lần.',
        'Post-test không bao giờ có thể bị lặp vô hạn.',
        'Pre-test chỉ dùng được cho số nguyên.'
      ],
      correctIndex: 1,
      explanation: 'Pre-test kiểm tra trước cửa rạp (có thể không chạy lần nào nếu sai ngay từ đầu), Post-test làm xong mới kiểm tra (luôn chạy tối thiểu 1 lần).'
    },
    {
      question: 'Khái niệm "Giá trị lính canh" (Sentinel Value) trong lập trình có công dụng gì?',
      options: [
        'Một biến dùng để bảo vệ máy tính khỏi virus.',
        'Một giá trị đặc biệt được thỏa thuận trước, khi xuất hiện trong luồng dữ liệu vào sẽ phát tín hiệu kết thúc vòng lặp ngay lập tức.',
        'Một lỗi nghiêm trọng làm ngắt chương trình.',
        'Một kiểu dữ liệu mới trong Python 3.14.'
      ],
      correctIndex: 1,
      explanation: 'Giá trị lính canh là mốc đánh dấu điểm kết thúc của chuỗi dữ liệu đầu vào không biết trước số lượng.'
    },
    {
      question: 'Nếu vòng lặp ngoài chạy 5 lần và vòng lặp trong lồng vào nó chạy 4 lần, câu lệnh bên trong cùng sẽ được thực thi tổng cộng bao nhiêu lần?',
      options: [
        '9 lần',
        '20 lần',
        '5 lần',
        '1 lần'
      ],
      correctIndex: 1,
      explanation: 'Tổng số lần lặp bằng tích của số lần lặp các tầng lồng nhau: 5 x 4 = 20 lần.'
    }
  ],

  summary: [
    'Pre-test kiểm tra trước (while): thân vòng lặp có thể chạy 0 lần.',
    'Post-test kiểm tra sau: thân vòng lặp luôn chạy ít nhất 1 lần; mô phỏng trong Python bằng while True kết hợp if ...: break.',
    'Vòng lặp lồng nhau có số lần chạy bằng tích số lần lặp của vòng ngoài và vòng trong.',
    'Giá trị lính canh (Sentinel) là mốc giá trị thỏa thuận để ra hiệu kết thúc việc nhập dữ liệu.'
  ]
};
