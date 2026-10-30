export default {
  id: 'p0-11',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.11',
  title: 'Lỗi và cách đọc lỗi: SyntaxError, Exception và Traceback',
  subtitle: '3 nhóm lỗi, từ điển 7 ngoại lệ thường gặp nhất, kỹ năng đọc Traceback từ dưới lên, try/except/else/finally và breakpoint()',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Phân biệt rõ ràng 3 tầng lỗi trong lập trình: Lỗi cú pháp (SyntaxError), Lỗi lúc chạy (Runtime Exception), và Lỗi logic (Bug ngữ nghĩa).',
    'Nhận diện bản chất và nguyên nhân của 7 Exception phổ biến nhất: `NameError`, `TypeError`, `ValueError`, `IndexError`, `KeyError`, `ZeroDivisionError`, `AttributeError`.',
    'Thành thạo kỹ năng vàng của kỹ sư: Đọc thông điệp Traceback từ dưới lên trên để xác định dòng lỗi và chuỗi lời gọi hàm.',
    'Làm chủ cấu trúc xử lý ngoại lệ đầy đủ: `try / except / else / finally` và lệnh ném lỗi chủ động `raise`.',
    'Khắc cốt ghi tâm: Tuyệt đối không bắt lỗi chung chung bằng `except: pass` (Bare except); luôn bắt đúng loại lỗi cụ thể.',
    'Làm quen với công cụ gỡ lỗi tương tác hiện đại: hàm `breakpoint()` tích hợp sẵn trong Python.'
  ],

  intuition: {
    title: 'Hộp đen máy bay và Tấm bản đồ tìm kho báu',
    metaphor: 'Khi chương trình của bạn bị "sập" và màn hình tuôn ra một trang chữ đỏ dài ngoằng ngoẵng gọi là Traceback, người mới thường hoảng loạn tắt đi. Nhưng đối với kỹ sư senior, Traceback chính là "chiếc hộp đen máy bay" quý giá nhất! Nó ghi lại chính xác từng miligiây: máy bay đã cất cánh từ đâu (hàm nào gọi hàm nào) và khoảnh khắc va chạm xảy ra ở tọa độ nào. Quy tắc vàng khi đọc Traceback là đọc NGƯỢC TỪ DƯỚI LÊN: dòng dưới cùng luôn là lý do máy bay rơi (loại lỗi và thông điệp giải thích), còn các dòng bên trên là chuỗi đường bay dẫn tới thảm họa. Khối try...except giống như chiếc dù cứu hộ: khi động cơ hỏng hóc giữa không trung, chiếc dù bật ra giúp hành khách tiếp đất an toàn thay vì rơi tự do.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">QUY TẮC ĐỌC TRACEBACK TỪ DƯỚI LÊN TRÊN</div>
        <div style="display:flex;flex-direction:column;gap:8px;max-width:540px;margin:0 auto;width:100%;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.75rem;color:var(--text-muted);">Bước 3 (Đọc sau cùng): Chuỗi gọi hàm từ xa</div>
            <div style="color:var(--text-secondary);font-size:0.8rem;">File "main.py", line 12, in &lt;module&gt; -> xu_ly_du_lieu()</div>
          </div>
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:6px;background:var(--bg-surface);">
            <div style="font-size:0.75rem;color:var(--text-muted);">Bước 2 (Đọc kế tiếp): Vị trí chính xác phát sinh lỗi</div>
            <div style="color:var(--py-gold);font-weight:700;font-size:0.8rem;">File "calc.py", line 45, in chia_tien -> return tong / so_nguoi</div>
          </div>
          <div style="padding:10px;border:2px solid var(--danger);border-radius:6px;background:var(--danger-bg);">
            <div style="font-size:0.75rem;color:var(--danger-text);font-weight:700;">▲ BƯỚC 1: ĐỌC DÒNG CUỐI CÙNG TRƯỚC TIÊN!</div>
            <div style="color:var(--danger);font-weight:800;font-size:0.95rem;">ZeroDivisionError: division by zero</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Phân loại 3 Tầng Lỗi trong Lập trình',
      badge: 'Phân loại Lỗi',
      content: `
        <p>Mọi lỗi trong chương trình đều thuộc về một trong 3 tầng sau:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Tầng lỗi</th>
                <th>Thời điểm phát hiện</th>
                <th>Biểu hiện</th>
                <th>Cách khắc phục</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Lỗi Cú pháp (SyntaxError)</strong></td>
                <td>Giai đoạn biên dịch (trước khi chạy bất kỳ dòng code nào)</td>
                <td>Viết sai ngữ pháp Python (thiếu dấu hai chấm <code>:</code>, thụt lề sai, quên đóng ngoặc). Chương trình từ chối khởi động.</td>
                <td>Sửa theo mũi tên chỉ lỗi của trình biên dịch CPython.</td>
              </tr>
              <tr>
                <td><strong>2. Lỗi Lúc chạy (Runtime Exception)</strong></td>
                <td>Đang chạy chương trình (khi gặp dòng lệnh bất khả thi)</td>
                <td>Cú pháp hoàn toàn đúng, nhưng gặp tình huống vô lý: chia cho 0, truy cập khóa không tồn tại, mở file không có.</td>
                <td>Dùng khối <code>try...except</code> để bắt và xử lý tình huống dự phòng.</td>
              </tr>
              <tr>
                <td><strong>3. Lỗi Logic (Semantic Bug)</strong></td>
                <td>Sau khi chương trình chạy xong êm đẹp</td>
                <td><strong>Nguy hiểm nhất:</strong> Không có thông báo lỗi nào cả, nhưng kết quả tính toán bị sai (ví dụ: tính diện tích lại lấy dài cộng rộng).</td>
                <td>Viết ca kiểm thử (Unit Test), in vết biến (print), hoặc dùng <code>breakpoint()</code> để dò từng bước.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Minh họa 3 loại lỗi trong thực tế',
          code: `# 1. Lỗi Cú pháp (SyntaxError) - Code này sẽ không chạy được:
# if x == 5  <-- Thiếu dấu hai chấm ":"

# 2. Lỗi Lúc chạy (Runtime Exception):
print("Bắt đầu chạy...")
x = 10
y = 0
try:
    ket_qua = x / y
except ZeroDivisionError as e:
    print("Xử lý lỗi lúc chạy:", e)

# 3. Lỗi Logic: Tính chu vi hình chữ nhật nhưng viết nhầm công thức
dai = 10
rong = 5
chu_vi_sai = dai + rong  # Lẽ ra phải là (dai + rong) * 2
print(f"Chu vi tính sai: {chu_vi_sai} (Đúng phải là 30)")`,
          output: `Bắt đầu chạy...
Xử lý lỗi lúc chạy: division by zero
Chu vi tính sai: 15 (Đúng phải là 30)`,
          annotations: [
            { line: 9, text: 'Phép chia cho 0 sinh ra ngoại lệ ZeroDivisionError lúc chạy.' },
            { line: 16, text: 'Lỗi logic chạy êm ru nhưng kết quả 15 hoàn toàn sai về mặt toán học.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Từ điển 7 Ngoại lệ (Exception) Phổ biến nhất',
      badge: 'Từ điển Ngoại lệ',
      content: `
        <p>Ghi nhớ bản chất 7 ngoại lệ này giúp bạn định vị lỗi chỉ trong vài giây:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Tên Exception</th>
                <th>Bản chất nguyên nhân</th>
                <th>Ví dụ gây lỗi điển hình</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>NameError</code></td>
                <td>Sử dụng một tên biến hoặc hàm chưa từng được định nghĩa.</td>
                <td>Gõ sai chính tả: <code>prnt("hello")</code>, gọi biến trước khi gán.</td>
              </tr>
              <tr>
                <td><code>TypeError</code></td>
                <td>Thực hiện phép toán hoặc gọi hàm trên kiểu dữ liệu không hỗ trợ.</td>
                <td><code>"10" + 5</code>, <code>len(100)</code>, truyền thiếu tham số hàm.</td>
              </tr>
              <tr>
                <td><code>ValueError</code></td>
                <td>Kiểu dữ liệu đúng nhưng giá trị nội dung không hợp lệ.</td>
                <td><code>int("abc")</code>, <code>math.sqrt(-1)</code>.</td>
              </tr>
              <tr>
                <td><code>IndexError</code></td>
                <td>Truy cập chỉ số mảng vượt quá phạm vi độ dài dãy.</td>
                <td><code>ds = [1, 2]; print(ds[5])</code>.</td>
              </tr>
              <tr>
                <td><code>KeyError</code></td>
                <td>Truy cập một khóa không tồn tại trong từ điển <code>dict</code>.</td>
                <td><code>d = {"a": 1}; print(d["b"])</code>.</td>
              </tr>
              <tr>
                <td><code>ZeroDivisionError</code></td>
                <td>Chia cho số không (bằng <code>/</code>, <code>//</code> hoặc <code>%</code>).</td>
                <td><code>10 / 0</code>.</td>
              </tr>
              <tr>
                <td><code>AttributeError</code></td>
                <td>Truy cập thuộc tính hoặc phương thức mà đối tượng không có.</td>
                <td><code>x = 100; x.append(5)</code>, <code>x = None; x.upper()</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Kích hoạt có chủ đích và quan sát 4 ngoại lệ hay gặp nhất',
          code: `# 1. TypeError
try:
    tong = "Tuổi: " + 20
except TypeError as err:
    print("1. TypeError:", err)

# 2. IndexError
try:
    ds = ["A", "B"]
    item = ds[99]
except IndexError as err:
    print("2. IndexError:", err)

# 3. KeyError
try:
    thong_tin = {"ten": "An"}
    tuoi = thong_tin["tuoi"]
except KeyError as err:
    print("3. KeyError: Không tìm thấy khóa", err)

# 4. AttributeError (Cực kỳ hay gặp khi biến là None)
try:
    nguoi_dung = None
    nguoi_dung.dang_nhap()
except AttributeError as err:
    print("4. AttributeError:", err)`,
          output: `1. TypeError: can only concatenate str (not "int") to str
2. IndexError: list index out of range
3. KeyError: Không tìm thấy khóa 'tuoi'
4. AttributeError: 'NoneType' object has no attribute 'dang_nhap'`,
          annotations: [
            { line: 4, text: 'TypeError bảo vệ hệ thống kiểu dữ liệu.' },
            { line: 11, text: 'IndexError xuất hiện khi truy cập vượt quá len(ds) - 1.' },
            { line: 24, text: 'AttributeError trên NoneType là lỗi kinh điển khi hàm trả về None mà quên kiểm tra.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Cấu trúc Xử lý Ngoại lệ Hoàn chỉnh: try / except / else / finally',
      badge: 'Cấu trúc Chuẩn mực',
      content: `
        <p>Một khối xử lý lỗi chuẩn mực trong Python có thể có tới 4 mệnh đề:</p>
        <ul>
          <li><strong><code>try</code>:</strong> Chứa đoạn mã "nguy hiểm" có nguy cơ ném ra ngoại lệ.</li>
          <li><strong><code>except ExceptionType as err</code>:</strong> Khối lệnh cứu hộ, CHỈ CHẠY khi xảy ra đúng loại lỗi đó.</li>
          <li><strong><code>else</code>:</strong> CHỈ CHẠY khi khối <code>try</code> hoàn toàn KHÔNG CÓ BẤT KỲ LỖI NÀO xảy ra (thành công 100%). Rất hữu ích để phân tách giữa đoạn mã kiểm tra lỗi và đoạn mã xử lý kết quả.</li>
          <li><strong><code>finally</code>:</strong> <strong>LUÔN LUÔN ĐƯỢC THỰC THI trong mọi trường hợp</strong> (kể cả có lỗi, không có lỗi, hoặc trong try có lệnh <code>return</code>!). Đây là nơi dọn dẹp tài nguyên sống còn (đóng file, ngắt kết nối mạng).</li>
          <li><strong><code>raise</code>:</strong> Chủ động ném ra một ngoại lệ khi phát hiện dữ liệu bất thường.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Quy trình hoạt động hoàn chỉnh của try / except / else / finally',
          code: `def doc_du_lieu_an_toan(gia_tri_chuoi):
    print(f"\\n--- Bắt đầu xử lý: {repr(gia_tri_chuoi)} ---")
    try:
        # Khối nguy hiểm: Ép kiểu và chia số
        so = int(gia_tri_chuoi)
        ket_qua = 100 / so
    except ValueError:
        print("-> [EXCEPT]: Lỗi không thể chuyển chuỗi thành số!")
    except ZeroDivisionError:
        print("-> [EXCEPT]: Lỗi không thể chia cho số 0!")
    else:
        # Chỉ chạy khi try thành công mỹ mãn
        print(f"-> [ELSE]: Thành công! 100 / {so} = {ket_qua}")
    finally:
        # Luôn luôn chạy để dọn dẹp
        print("-> [FINALLY]: Hoàn tất chu trình kiểm tra.")

doc_du_lieu_an_toan("25")   # Thành công
doc_du_lieu_an_toan("0")    # Gặp ZeroDivisionError
doc_du_lieu_an_toan("abc")  # Gặp ValueError`,
          output: `--- Bắt đầu xử lý: '25' ---
-> [ELSE]: Thành công! 100 / 25 = 4.0
-> [FINALLY]: Hoàn tất chu trình kiểm tra.

--- Bắt đầu xử lý: '0' ---
-> [EXCEPT]: Lỗi không thể chia cho số 0!
-> [FINALLY]: Hoàn tất chu trình kiểm tra.

--- Bắt đầu xử lý: 'abc' ---
-> [EXCEPT]: Lỗi không thể chuyển chuỗi thành số!
-> [FINALLY]: Hoàn tất chu trình kiểm tra.`,
          annotations: [
            { line: 6, text: 'Phần tử try chứa các dòng lệnh có nguy cơ văng lỗi.' },
            { line: 12, text: 'else chỉ chạy khi không có except nào bị kích hoạt.' },
            { line: 15, text: 'finally đảm bảo không bao giờ bị bỏ quên, bất kể xảy ra chuyện gì.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: breakpoint() và Nghệ thuật Gỡ lỗi (Debugging)',
      badge: 'Công cụ Kỹ sư',
      content: `
        <p>Khi gặp lỗi logic (bug), làm sao để biết biến đang mang giá trị gì tại từng thời điểm?</p>
        <ul>
          <li><strong>Phương pháp 1: In vết biến (Print Debugging):</strong> Chèn các lệnh <code>print(f"DEBUG: {x=}")</code> ở các vị trí nghi vấn. Nhanh, tiện lợi cho các hàm nhỏ.</li>
          <li><strong>Phương pháp 2: Trình gỡ lỗi tích hợp <code>breakpoint()</code>:</strong> Từ Python 3.7+, bạn chỉ cần gõ <code>breakpoint()</code> vào dòng code muốn kiểm tra. Khi chạy đến dòng này, CPython sẽ <strong>dừng đóng băng chương trình ngay lập tức</strong> và mở ra dấu nhắc <code>(Pdb)</code> tương tác:
            <ul>
              <li>Gõ <code>n</code> (next): Chạy dòng tiếp theo.</li>
              <li>Gõ <code>s</code> (step): Nhảy vào bên trong hàm con.</li>
              <li>Gõ <code>c</code> (continue): Cho chương trình chạy tiếp tới điểm dừng kế tiếp.</li>
              <li>Gõ tên bất kỳ biến nào để in trực tiếp giá trị của nó trong RAM!</li>
              <li>Gõ <code>q</code> (quit): Thoát khỏi trình gỡ lỗi.</li>
            </ul>
          </li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Cách đặt breakpoint() để kiểm tra trạng thái biến',
          code: `# Minh họa cách đặt breakpoint trong code (Chạy trên Terminal)
def tinh_luong_thang(gio_lam, luong_gio):
    tong = gio_lam * luong_gio
    
    # Đóng băng chương trình tại đây để kiểm tra giá trị:
    # breakpoint()
    
    if tong > 20000000:
        thue = tong * 0.1
    else:
        thue = 0
    return tong - thue

print("Lương thực nhận:", tinh_luong_thang(160, 150000))`,
          output: `Lương thực nhận: 21600000.0`,
          annotations: [
            { line: 6, text: 'Bỏ comment breakpoint() khi chạy trên Terminal để tương tác trực tiếp với Pdb.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Tội ác lập trình: Bắt lỗi chung chung bằng "except: pass"',
        content: 'Viết `try: ... except: pass` (Bare except) là điều tồi tệ nhất bạn có thể làm trong Python! Nó sẽ nuốt chửng mọi lỗi lầm, kể cả lỗi chính tả `NameError`, lỗi cú pháp, và thậm chí chặn đứng cả lệnh bấm tổ hợp phím `Ctrl + C` (`KeyboardInterrupt`) của bạn. Hãy luôn chỉ định rõ lỗi: `except (ValueError, KeyError) as e:`!'
      },
      {
        title: 'Ném lại ngoại lệ khi bắt được mà không xử lý',
        content: 'Nếu bạn bắt được lỗi chỉ để in thông báo mà không giải quyết được triệt để nguyên nhân, hãy dùng lệnh `raise` trơ trọi ở cuối khối except để chuyển tiếp ngoại lệ lên tầng trên xử lý tiếp.'
      }
    ],
    tips: [
      {
        title: '💡 Điểm nối tư duy: Xem nhánh xử lý lỗi trong Flowchart tại Phần 0B',
        content: 'Làm thế nào để biểu diễn nhánh lỗi ngoại lệ (Exception Path) và so sánh giữa việc kiểm tra điều kiện trước (EAFP vs LBYL) trên sơ đồ khối chuẩn ISO 5807? Hãy xem [Phần 0B: Flowchart và tư duy thuật toán (Bài B2.5)].'
      }
    ],
    deepDive: {
      title: 'Triết lý EAFP vs LBYL trong văn hóa Python',
      content: `
        <p>Trong lập trình có 2 trường phái triết lý xử lý lỗi:</p>
        <ul>
          <li><strong>LBYL (Look Before You Leap - Nhìn kỹ trước khi nhảy):</strong> Kiểm tra thật kỹ mọi điều kiện trước khi làm. (Phong cách truyền thống của C/Java):<br/><code>if key in my_dict: val = my_dict[key]</code></li>
          <li><strong>EAFP (Easier to Ask for Forgiveness than Permission - Xin tha thứ dễ hơn xin phép):</strong> Cứ giả định mọi thứ đều êm đẹp và nhảy vào làm ngay; nếu có sự cố thì xử lý ở khối except (Phong cách chuẩn mực Pythonic):<br/><code>try: val = my_dict[key]<br/>except KeyError: val = default</code></li>
        </ul>
        <p>EAFP chạy nhanh hơn vì chỉ phải băm tìm khóa trong dict 1 lần duy nhất, thay vì 2 lần như LBYL.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Bắt lỗi chia cho số 0 và ép kiểu an toàn',
      problem: 'Viết một hàm `chia_hai_so(a_str, b_str)` nhận vào hai chuỗi. Hàm ép kiểu hai chuỗi sang số thực `float` và tính phép chia `a / b`. Hãy bắt lỗi `ValueError` (nếu người dùng nhập chuỗi không phải số) và `ZeroDivisionError` (nếu chia cho 0) để in ra các thông điệp thông báo riêng biệt thân thiện.',
      hint: 'Dùng 2 khối except riêng cho ValueError và ZeroDivisionError.',
      solutionCode: `def chia_hai_so(a_str, b_str):
    try:
        a = float(a_str)
        b = float(b_str)
        ket_qua = a / b
        return f"{a} / {b} = {ket_qua}"
    except ValueError:
        return "Lỗi: Đầu vào phải là các con số hợp lệ!"
    except ZeroDivisionError:
        return "Lỗi: Không thể thực hiện phép chia cho số 0!"

print("1.", chia_hai_so("10", "2"))
print("2.", chia_hai_so("10", "0"))
print("3.", chia_hai_so("10", "hai"))`,
      solutionOutput: `1. 10.0 / 2.0 = 5.0
2. Lỗi: Không thể thực hiện phép chia cho số 0!
3. Lỗi: Đầu vào phải là các con số hợp lệ!`,
      explanation: 'Tách biệt các khối except giúp chương trình đưa ra phản hồi chính xác đến đúng nguyên nhân gây lỗi cho người dùng.',
      annotations: [
        { line: 7, text: 'Bắt đúng ValueError khi float thất bại.' },
        { line: 9, text: 'Bắt đúng ZeroDivisionError khi mẫu số là 0.' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Tra cứu an toàn khóa từ điển với lệnh raise chủ động',
      problem: 'Viết một hàm `kiem_tra_quyen_truy_cap(nguoi_dung_dict)` nhận vào một từ điển thông tin tài khoản. Nếu trong từ điển thiếu khóa `"vai_tro"`, hàm chủ động ném ra ngoại lệ `KeyError("Tài khoản chưa được phân quyền!")`. Nếu vai trò là `"admin"`, trả về `"Cho phép truy cập"`, ngược lại trả về `"Từ chối"`.',
      hint: 'Dùng if "vai_tro" not in nguoi_dung_dict: raise KeyError(...).',
      solutionCode: `def kiem_tra_quyen_truy_cap(nguoi_dung):
    if "vai_tro" not in nguoi_dung:
        raise KeyError("Tài khoản chưa được phân quyền!")
    
    if nguoi_dung["vai_tro"] == "admin":
        return "Cho phép truy cập toàn quyền"
    return "Từ chối: Cần quyền admin"

print("1. Admin:", kiem_tra_quyen_truy_cap({"ten": "An", "vai_tro": "admin"}))
print("2. User: ", kiem_tra_quyen_truy_cap({"ten": "Bình", "vai_tro": "user"}))

try:
    kiem_tra_quyen_truy_cap({"ten": "Khách"})
except KeyError as err:
    print("3. Bắt lỗi thiếu khóa:", err)`,
      solutionOutput: `1. Admin: Cho phép truy cập toàn quyền
2. User:  Từ chối: Cần quyền admin
3. Bắt lỗi thiếu khóa: 'Tài khoản chưa được phân quyền!'`,
      explanation: 'Lệnh raise cho phép lập trình viên tự định nghĩa ranh giới lỗi nghiệp vụ cho hàm của mình.',
      annotations: [
        { line: 3, text: 'Chủ động ném ngoại lệ bằng raise.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Khi gặp một trang thông báo lỗi Traceback dài nhiều dòng trong Python, thứ tự đọc chuẩn xác nhất của kỹ sư là gì?',
      options: [
        'Đọc từ dòng đầu tiên xuống dòng cuối cùng.',
        'Đọc ngược từ dòng dưới cùng lên trên: dòng cuối cùng cho biết chính xác loại lỗi và thông điệp giải thích, còn các dòng phía trên là chuỗi vị trí file/hàm đã gọi.',
        'Chỉ cần đọc dòng số 2.',
        'Bỏ qua thông báo lỗi và chạy lại chương trình.'
      ],
      correctIndex: 1,
      explanation: 'Dòng cuối cùng của Traceback là kết luận của CPython về loại ngoại lệ xảy ra. Đọc từ dưới lên giúp ta nắm bắt vấn đề ngay trong 2 giây đầu tiên.'
    },
    {
      question: 'Khối lệnh `finally` trong cấu trúc `try...except...finally` có đặc tính gì?',
      options: [
        'Chỉ chạy khi có lỗi xảy ra.',
        'Chỉ chạy khi không có lỗi nào xảy ra.',
        'Luôn luôn được thực thi trong mọi tình huống (kể cả khi có lỗi, không có lỗi, hoặc gặp lệnh return trong try).',
        'Chỉ chạy khi người dùng bấm phím Enter.'
      ],
      correctIndex: 2,
      explanation: 'finally được bảo đảm luôn luôn chạy để thực hiện các thao tác giải phóng tài nguyên quan trọng như đóng file hoặc ngắt socket.'
    },
    {
      question: 'Tại sao việc viết `try: ... except: pass` lại bị coi là phản mẫu (Anti-pattern) nguy hiểm nhất trong Python?',
      options: [
        'Vì nó khiến máy tính bị chậm 100 lần.',
        'Vì nó âm thầm nuốt chửng mọi loại lỗi mà không báo gì, kể cả lỗi gõ sai tên biến hay lệnh ngắt KeyboardInterrupt, khiến việc gỡ lỗi trở nên bất khả thi.',
        'Vì cú pháp này bị cấm trong Python 3.',
        'Vì nó tự động xóa code của bạn.'
      ],
      correctIndex: 1,
      explanation: 'Bare except bắt tất cả các ngoại lệ bao gồm cả SystemExit và KeyboardInterrupt, che giấu các bug nghiêm trọng và khiến chương trình cư xử sai lệch mà không để lại bất kỳ dấu vết nào.'
    }
  ],

  summary: [
    'Có 3 nhóm lỗi: Lỗi cú pháp (SyntaxError - lúc dịch), Lỗi lúc chạy (Runtime Exception), và Lỗi logic (chạy được nhưng sai kết quả).',
    '7 ngoại lệ kinh điển: NameError, TypeError, ValueError, IndexError, KeyError, ZeroDivisionError, AttributeError.',
    'Luôn đọc Traceback từ dưới lên trên: dòng cuối là loại lỗi và thông điệp, bên trên là tọa độ file và chuỗi lời gọi.',
    'Cấu trúc try/except/else/finally: try chứa code nguy hiểm; except bắt lỗi; else chạy khi thành công; finally luôn chạy để dọn dẹp.',
    'Tuyệt đối không bắt lỗi chung chung bằng "except: pass"; luôn bắt đúng loại lỗi cụ thể.',
    'Dùng breakpoint() để dừng đóng băng chương trình và gỡ lỗi tương tác với trình Pdb.'
  ]
};
