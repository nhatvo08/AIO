export default {
  id: 'p0-08',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.8',
  title: 'Điều khiển luồng: if, while, for và cơ chế Iterator',
  subtitle: 'Cấu trúc rẽ nhánh, vòng lặp, bản chất iterable vs iterator, range() sinh số theo yêu cầu, break/continue/else và quy tắc thụt lề',
  level: 'Cơ bản',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo cấu trúc rẽ nhánh `if / elif / else` và cấu trúc so khớp mẫu `match / case` (Python 3.10+).',
    'Nắm vững bản chất vòng lặp `for` trong Python: không phải biến đếm chỉ số như C/Java, mà là duyệt trên một `iterable` qua giao thức Iterator.',
    'Hiểu vì sao hàm `range()` là một dãy sinh số theo yêu cầu (lazy evaluation), tuyệt đối KHÔNG PHẢI một danh sách list có sẵn trong RAM.',
    'Làm chủ các lệnh điều hướng vòng lặp: `break`, `continue`, khối `else` độc đáo của vòng lặp, và câu lệnh giữ chỗ `pass`.',
    'Hiểu triết lý: Trong Python, thụt lề (Indentation) CHÍNH LÀ CÚ PHÁP xác định khối lệnh.'
  ],

  intuition: {
    title: 'Người bồi bàn rót trà và Bộ đếm bước chân',
    metaphor: 'Trong các ngôn ngữ như C, vòng lặp for giống như bạn tự cầm sổ tay: "bước 1, bước 2, bước 3...". Nhưng trong Python, vòng lặp for hoạt động giống như một người bồi bàn đi rót trà: bạn đưa cho người bồi bàn một chiếc bình (iterable). Mỗi lần bước tới, người bồi bàn chỉ hỏi bình một câu duy nhất: "Còn ngụm trà nào tiếp theo không?" (hàm next()). Chiếc bình rót ra một giọt, người bồi bàn đem cho bạn xử lý. Đến khi bình cạn kiệt, nó phát tín hiệu "Hết rồi!" (ngoại lệ StopIteration) và người bồi bàn tự động dừng lại. Hàm range(1_000_000) giống như một chiếc máy đếm số tự động nhảy: nó không hề in sẵn 1 triệu tờ giấy chất đầy phòng (không tốn RAM), mà mỗi khi người bồi bàn chìa tay ra xin số tiếp theo, chiếc máy mới bấm tách một cái để sinh ra con số đó.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">BẢN CHẤT CỦA VÒNG LẶP FOR: ITERABLE ──► ITERATOR ──► NEXT()</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">Đối tượng duyệt được</span>
            <strong style="color:var(--accent-primary);">Iterable: [1, 2, 3]</strong>
          </div>
          <span style="color:var(--py-gold);font-weight:700;">──iter()──►</span>
          <div style="padding:10px;border:1px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">Con trỏ duyệt</span>
            <strong style="color:var(--py-gold);">Iterator Object</strong>
          </div>
          <span style="color:var(--success);font-weight:700;">──next()──►</span>
          <div style="padding:10px;border:1px solid var(--success);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">Lần lượt từng phần tử</span>
            <strong style="color:var(--success);">1 ➔ 2 ➔ 3 ➔ Stop</strong>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Thụt lề (Indentation) là Cú pháp & Cấu trúc if / elif / else',
      badge: 'Cú pháp Nền tảng',
      content: `
        <p>Nếu như C, Java hay JavaScript dùng cặp dấu ngoặc nhọn <code>{ }</code> để bao bọc khối lệnh, thì <strong>trong Python, thụt lề chính là cú pháp!</strong></p>
        <ul>
          <li>Quy chuẩn chính thức PEP 8: Luôn sử dụng <strong>đúng 4 dấu cách (spaces)</strong> cho mỗi cấp độ thụt lề. Tuyệt đối không trộn lẫn giữa phím Tab và dấu cách.</li>
          <li>Các khối lệnh con bắt đầu sau dấu hai chấm <code>:</code> và toàn bộ các dòng thuộc khối đó phải thẳng hàng nhau.</li>
        </ul>
        <p>Cấu trúc rẽ nhánh chuẩn: <code>if</code> kiểm tra điều kiện đầu tiên; nếu sai, <code>elif</code> (viết tắt của else if) kiểm tra điều kiện kế tiếp; cuối cùng <code>else</code> bắt các trường hợp còn lại.</p>
      `,
      codeExamples: [
        {
          title: 'Cấu trúc if / elif / else và so khớp mẫu match / case',
          code: `# Phân loại điểm thi học sinh
diem = 8.5

if diem >= 9.0:
    hoc_luc = "Xuất sắc"
elif diem >= 8.0:
    hoc_luc = "Giỏi"
elif diem >= 6.5:
    hoc_luc = "Khá"
else:
    hoc_luc = "Trung bình"

print(f"Điểm {diem}: Học lực {hoc_luc}")

# Cấu trúc match / case (Python 3.10+) hiện đại
ma_trang_thai = 404

match ma_trang_thai:
    case 200:
        thong_diep = "OK - Thành công"
    case 404:
        thong_diep = "Not Found - Không tìm thấy trang"
    case 500:
        thong_diep = "Internal Server Error - Lỗi máy chủ"
    case _:
        thong_diep = "Mã trạng thái khác"

print(f"HTTP {ma_trang_thai}: {thong_diep}")`,
          output: `Điểm 8.5: Học lực Giỏi
HTTP 404: Not Found - Không tìm thấy trang`,
          annotations: [
            { line: 4, text: 'Dòng lệnh con thụt lề đúng 4 dấu cách sau dấu hai chấm.' },
            { line: 26, text: 'Ký tự gạch dưới "_" trong match/case đóng vai trò trường hợp mặc định (wildcard giống else).' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Bản chất vòng lặp for và Giao thức Iterator',
      badge: 'Bản chất Sâu sắc',
      content: `
        <p>Trong Python, không có vòng lặp kiểu <code>for (int i = 0; i < n; i++)</code>. Vòng lặp <code>for</code> của Python là <strong>For-Each</strong>: nó duyệt trực tiếp trên một tập hợp gọi là <strong>Iterable</strong> (chuỗi, danh sách, tuple, từ điển, file, v.v.).</p>
        <h4>Bên dưới hậu trường, CPython làm gì khi chạy vòng lặp for?</h4>
        <ol>
          <li>Gọi hàm <code>iter(doi_tuong)</code> để lấy ra một <strong>Iterator</strong> (con trỏ duyệt).</li>
          <li>Lặp lại liên tục việc gọi hàm <code>next(iterator)</code> để lấy phần tử kế tiếp và gán vào biến lặp.</li>
          <li>Khi hết dữ liệu, iterator phát ra ngoại lệ <code>StopIteration</code>. CPython âm thầm bắt ngoại lệ này và kết thúc vòng lặp một cách êm đẹp.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Mô phỏng chính xác cách vòng lặp for hoạt động bằng iter() và next()',
          code: `# Vòng lặp for thông thường:
ds = ["Táo", "Cam", "Chuối"]
print("=== FOR THÔNG THƯỜNG ===")
for trai_cay in ds:
    print(trai_cay)

# HẬU TRƯỜNG: Cách CPython thực sự chạy vòng lặp for bằng Iterator:
print("\\n=== HẬU TRƯỜNG CỦA CPYTHON ===")
con_tro = iter(ds)  # Lấy iterator từ list

while True:
    try:
        trai_cay = next(con_tro)  # Lấy phần tử kế tiếp
        print(trai_cay)
    except StopIteration:
        break  # Hết dữ liệu thì dừng`,
          output: `=== FOR THÔNG THƯỜNG ===
Táo
Cam
Chuối

=== HẬU TRƯỜNG CỦA CPYTHON ===
Táo
Cam
Chuối`,
          annotations: [
            { line: 10, text: 'iter(ds) trả về đối tượng list_iterator.' },
            { line: 14, text: 'next(con_tro) trả về từng phần tử một.' },
            { line: 16, text: 'Ngoại lệ StopIteration báo hiệu luồng dữ liệu đã kết thúc.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: range() — Sinh số theo yêu cầu (Lazy Evaluation)',
      badge: 'Tối ưu Bộ nhớ',
      content: `
        <p>Cú pháp: <code>range(start, stop, step)</code> (sinh các số nguyên từ <code>start</code> đến sát <code>stop - 1</code>).</p>
        <p><strong>Hiểu lầm phổ biến:</strong> Nghĩ rằng <code>range(1000000)</code> tạo ra một danh sách chứa 1 triệu con số làm đầy bộ nhớ RAM.</p>
        <p><strong>Sự thật:</strong> <code>range</code> là một đối tượng dãy số <em>sinh theo nhu cầu (Lazy Evaluation)</em>. Nó chỉ lưu đúng 3 con số nguyên trong bộ nhớ: giá trị bắt đầu, giá trị kết thúc, và bước nhảy. Dù bạn gọi <code>range(10)</code> hay <code>range(10_000_000_000_000)</code>, <strong>dung lượng RAM chiếm dụng đều chỉ bằng đúng 48 bytes!</strong></p>
      `,
      codeExamples: [
        {
          title: 'Chứng minh: range() không tốn RAM dù sinh hàng tỷ con số',
          code: `import sys

range_nho = range(10)
range_khong_lo = range(10_000_000_000_000)

print("Dung lượng RAM của range(10):", sys.getsizeof(range_nho), "bytes")
print("Dung lượng RAM của range(10 nghìn tỷ):", sys.getsizeof(range_khong_lo), "bytes")

# range sinh số lần lượt khi được yêu cầu duyệt
print("\\n3 số đầu tiên của range_khong_lo:")
it = iter(range_khong_lo)
print(next(it))
print(next(it))
print(next(it))`,
          output: `Dung lượng RAM của range(10): 48 bytes
Dung lượng RAM của range(10 nghìn tỷ): 48 bytes

3 số đầu tiên của range_khong_lo:
0
1
2`,
          annotations: [
            { line: 6, text: 'sys.getsizeof() xác nhận range() không hề cấp phát danh sách số trong RAM.' },
            { line: 12, text: 'Mỗi lần next() được gọi, range mới tính toán nhẩm ra số tiếp theo.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: break, continue, pass và khối "else" Độc đáo của Vòng lặp',
      badge: 'Điều hướng Luồng',
      content: `
        <ul>
          <li><code>break</code>: Thoát khỏi vòng lặp ngay lập tức.</li>
          <li><code>continue</code>: Bỏ qua phần còn lại của thân vòng lặp hiện tại và nhảy sang vòng lặp kế tiếp.</li>
          <li><code>pass</code>: Câu lệnh giữ chỗ rỗng (No-op). Khi cú pháp bắt buộc phải có lệnh nhưng bạn chưa muốn viết gì, dùng <code>pass</code> để không bị lỗi <code>IndentationError</code>.</li>
          <li><strong>Khối <code>else</code> của vòng lặp (Độc nhất vô nhị trong Python):</strong> Khối <code>else</code> gắn sau <code>for</code> hoặc <code>while</code> sẽ <strong>CHỈ CHẠY khi vòng lặp kết thúc bình thường tự nhiên</strong> (không bị ngắt bởi lệnh <code>break</code>). Rất tiện lợi khi làm bài toán tìm kiếm: nếu tìm thấy thì <code>break</code>, nếu duyệt hết mà không thấy thì khối <code>else</code> sẽ thông báo!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng vòng lặp for...else để tìm kiếm số nguyên tố',
          code: `def kiem_tra_tim_kiem(so_can_tim, danh_sach):
    for x in danh_sach:
        if x == so_can_tim:
            print(f"Tìm thấy {so_can_tim} trong danh sách!")
            break
    else:
        # Khối else chỉ chạy khi duyệt hết vòng lặp mà KHÔNG gặp break!
        print(f"KHÔNG tìm thấy {so_can_tim} sau khi duyệt toàn bộ danh sách.")

ds = [12, 45, 67, 89]
kiem_tra_tim_kiem(67, ds)
kiem_tra_tim_kiem(99, ds)`,
          output: `Tìm thấy 67 trong danh sách!
KHÔNG tìm thấy 99 sau khi duyệt toàn bộ danh sách.`,
          annotations: [
            { line: 5, text: 'Khi gặp 67, lệnh break thoát vòng lặp ngay, khối else bị bỏ qua.' },
            { line: 8, text: 'Khi tìm 99, vòng lặp duyệt hết danh sách mà không break, khối else tự động chạy.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Sửa đổi danh sách (xóa/thêm) ngay trong lúc đang duyệt vòng lặp for',
        content: 'Tuyệt đối không dùng `for x in ds: ds.remove(x)`. Khi bạn xóa một phần tử, các phần tử phía sau bị dồn lên làm chỉ số nội bộ của Iterator bị nhảy cóc, dẫn tới bỏ sót phần tử. Hãy duyệt trên một bản sao: `for x in ds.copy():` hoặc dùng List Comprehension.'
      },
      {
        title: 'Nhầm lẫn else của vòng lặp là else của câu lệnh if',
        content: 'Hãy chú ý mức thụt lề: nếu chữ `else:` thẳng hàng với chữ `for` (hoặc `while`), đó là else của vòng lặp. Nếu nó thẳng hàng với `if`, đó là else của rẽ nhánh.'
      }
    ],
    tips: [
      {
        title: '💡 Điểm nối tư duy: Xem sơ đồ hóa vòng lặp tại Phần 0B',
        content: 'Để nhìn thấy trực quan chu trình lặp (Loop cycle), điều kiện lặp kiểm tra trước (Pre-test) vs kiểm tra sau (Post-test), và cách thuật toán thoát vòng lặp bằng flowchart chuẩn ISO 5807, hãy xem [Phần 0B: Flowchart và tư duy thuật toán (Bài B1.5, B2.1)].'
      }
    ],
    deepDive: {
      title: 'Tối ưu hóa Bytecode CPython cho vòng lặp: FOR_ITER',
      content: `
        <p>Bên trong máy ảo CPython, vòng lặp <code>for</code> được thực thi bằng lệnh bytecode siêu tối ưu mang tên <code>FOR_ITER</code>.</p>
        <p>Lệnh này gọi trực tiếp hàm C <code>tp_iternext</code> trên con trỏ struct của Iterator. Nhờ bỏ qua các bước kiểm tra gián tiếp, vòng lặp for duyệt dữ liệu trên CPython nhanh hơn đáng kể so với việc bạn tự viết một vòng lặp <code>while</code> dùng biến chỉ số <code>i += 1</code>!</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Dùng range() và continue để in các số chẵn',
      problem: 'Hãy viết một đoạn mã dùng vòng lặp `for` và hàm `range(1, 11)` để duyệt các số từ 1 đến 10. Sử dụng câu lệnh `continue` để bỏ qua các số lẻ, chỉ in ra các số chẵn trên cùng một dòng cách nhau bởi dấu cách.',
      hint: 'Nếu i % 2 != 0: continue, in với print(i, end=" ").',
      solutionCode: `for i in range(1, 11):
    if i % 2 != 0:
        continue
    print(i, end=" ")
print()`,
      solutionOutput: `2 4 6 8 10`,
      explanation: 'Khi gặp số lẻ, continue lập tức bỏ qua lệnh print và chuyển sang lần lặp kế tiếp.',
      annotations: [
        { line: 3, text: 'Lệnh continue nhảy ngay sang số tiếp theo.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Mô phỏng vòng lặp Do-While bằng while True và break',
      problem: 'Python không có cấu trúc vòng lặp `do...while` (lặp xong mới kiểm tra điều kiện). Hãy mô phỏng một vòng lặp yêu cầu giả lập xử lý công việc: ban đầu biến `tien = 100`. Mỗi vòng lặp trừ đi 30 đồng và in ra số tiền còn lại. Vòng lặp dừng lại ngay khi số tiền nhỏ hơn hoặc bằng 0, sử dụng cú pháp `while True` kết hợp `break`.',
      hint: 'while True: trừ tiền -> in -> if tien <= 0: break.',
      solutionCode: `tien = 100

while True:
    tien -= 30
    print(f"Đã chi tiêu 30đ, số dư còn lại: {tien}đ")
    if tien <= 0:
        print("Hết tiền, dừng giao dịch!")
        break`,
      solutionOutput: `Đã chi tiêu 30đ, số dư còn lại: 70đ
Đã chi tiêu 30đ, số dư còn lại: 40đ
Đã chi tiêu 30đ, số dư còn lại: 10đ
Đã chi tiêu 30đ, số dư còn lại: -20đ
Hết tiền, dừng giao dịch!`,
      explanation: 'while True tạo vòng lặp vô tận, và điều kiện thoát được đặt ở cuối thân vòng lặp, mô phỏng hoàn hảo hành vi do-while của C/Java.',
      annotations: [
        { line: 3, text: 'while True đảm bảo thân vòng lặp chạy ít nhất 1 lần.' },
        { line: 7, text: 'Lệnh break thoát an toàn.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Trong Python, điều gì thực sự xảy ra khi bạn gọi `range(1_000_000)`?',
      options: [
        'CPython tạo ra một danh sách chứa sẵn 1 triệu số nguyên trong RAM, tiêu tốn khoảng 8MB bộ nhớ.',
        'CPython tạo ra một đối tượng range chỉ lưu trữ 3 con số (start, stop, step) chiếm khoảng 48 bytes, và chỉ tính toán sinh ra số khi có yêu cầu duyệt.',
        'Python chạy một luồng ngầm để đếm từ 1 đến 1 triệu.',
        'Lệnh bị lỗi vì số quá lớn vượt quá giới hạn của hàm range.'
      ],
      correctIndex: 1,
      explanation: 'range trong Python 3 là một lazy sequence (dãy sinh lười), không cấp phát trước mảng dữ liệu trong RAM nên cực kỳ tiết kiệm bộ nhớ.'
    },
    {
      question: 'Khối lệnh `else` gắn sau vòng lặp `for` trong Python sẽ chạy khi nào?',
      options: [
        'Chạy mỗi khi một lần lặp gặp điều kiện sai.',
        'Chỉ chạy khi vòng lặp kết thúc bình thường tự nhiên (không bị ngắt bởi lệnh break).',
        'Chỉ chạy khi vòng lặp bị ngắt đột ngột bởi lệnh break.',
        'Luôn luôn chạy trong mọi trường hợp.'
      ],
      correctIndex: 1,
      explanation: 'Khối for...else hoặc while...else là cú pháp đặc trưng của Python: else chỉ thực thi khi vòng lặp đã duyệt qua hết mọi phần tử mà không gặp câu lệnh break nào.'
    },
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về quy tắc Thụt lề (Indentation) trong Python?',
      options: [
        'Thụt lề chỉ mang tính thẩm mỹ cho đẹp code, dùng dấu ngoặc nhọn { } mới là bắt buộc.',
        'Thụt lề chính là cú pháp của ngôn ngữ; các dòng lệnh trong cùng một khối phải có cùng mức thụt lề chính xác.',
        'Có thể tùy tiện trộn lẫn phím Tab và dấu cách trong cùng một file mà không bị lỗi.',
        'Mỗi khối lệnh con phải thụt lề đúng 8 dấu cách.'
      ],
      correctIndex: 1,
      explanation: 'Trong Python, thụt lề thay thế hoàn toàn cho dấu ngoặc nhọn để phân định phạm vi khối lệnh. Chuẩn PEP 8 khuyến nghị dùng đúng 4 dấu cách.'
    }
  ],

  summary: [
    'Thụt lề trong Python chính là cú pháp; chuẩn mực là 4 dấu cách cho mỗi cấp khối lệnh.',
    'Vòng lặp for trong Python duyệt trên một Iterable thông qua cơ chế Iterator (iter() và next()).',
    'range() là dãy số sinh theo nhu cầu (lazy evaluation), chỉ chiếm khoảng 48 bytes RAM dù sinh hàng tỷ con số.',
    'break ngắt vòng lặp ngay; continue bỏ qua vòng hiện tại; pass là lệnh giữ chỗ rỗng.',
    'Khối else của vòng lặp chỉ chạy khi vòng lặp kết thúc tự nhiên, không bị ngắt bởi break.'
  ]
};
