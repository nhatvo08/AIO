export default {
  id: 'p0-10',
  partId: 'part-0',
  partTitle: 'Phần 0 – Nền tảng Python',
  number: '0.10',
  title: 'Module, import và Thư viện chuẩn (Standard Library)',
  subtitle: 'Cơ chế cache sys.modules, namespace, giải mã if __name__ == "__main__", đường dẫn sys.path, package và "pin đi kèm"',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu bản chất của câu lệnh `import`: CPython thực sự thực thi toàn bộ mã của module một lần duy nhất rồi lưu kết quả vào bộ nhớ cache `sys.modules`.',
    'Phân biệt rõ ràng giữa các cú pháp nhập khẩu: `import math`, `from math import sqrt`, và vì sao tuyệt đối tránh `from math import *`.',
    'Giải mã ý nghĩa sống còn của thành ngữ `if __name__ == "__main__":` trong việc tách biệt giữa chạy file độc lập và nhập khẩu làm thư viện.',
    'Nắm quy trình CPython tìm kiếm module trên ổ đĩa qua danh sách `sys.path`.',
    'Hiểu khái niệm Package (thư mục chứa file `__init__.py`) và làm quen với triết lý "Batteries Included" (Pin đi kèm) của Thư viện chuẩn Python.'
  ],

  intuition: {
    title: 'Chiếc công tắc cầu dao và Bản sao tài liệu',
    metaphor: 'Hãy tưởng tượng mỗi file .py giống như một công xưởng: khi bạn gõ "import cong_xuong", CPython sẽ chạy đến bật cầu dao chính của công xưởng đó và cho toàn bộ dây chuyền chạy từ đầu đến cuối một lần! Toàn bộ máy móc và sản phẩm sau đó được ghi danh vào một cuốn sổ hộ khẩu lưu trữ gọi là sys.modules. Lần sau nếu bạn có gõ lại "import cong_xuong" thêm mười lần nữa, CPython chỉ việc lật sổ hộ khẩu ra dùng chứ không dại gì chạy lại dây chuyền! Còn câu lệnh if __name__ == "__main__" giống như một câu hỏi an ninh trước cổng: "Bạn đang chạy công xưởng này trực tiếp (bằng cách đứng trước cổng bấm nút), hay công xưởng này đang được một công ty khác mời làm đối tác?". Nếu được mời làm đối tác, công xưởng chỉ cung cấp máy móc chứ không tự động khởi chạy dây chuyền bán lẻ!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">QUY TRÌNH IMPORT &amp; CƠ CHẾ CACHE SYS.MODULES</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;">
          <div style="padding:10px;border:1px solid var(--border-strong);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">1. Tìm trên ổ đĩa</span>
            <strong style="color:var(--text-primary);">sys.path</strong>
          </div>
          <span style="color:var(--accent-primary);font-weight:700;">──Thực thi──►</span>
          <div style="padding:10px;border:1px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">2. Lưu vào RAM</span>
            <strong style="color:var(--py-gold);">sys.modules</strong>
          </div>
          <span style="color:var(--success);font-weight:700;">──Gắn vào──►</span>
          <div style="padding:10px;border:1px solid var(--success);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <span style="font-size:0.75rem;color:var(--text-muted);display:block;">3. Tạo Không gian tên</span>
            <strong style="color:var(--success);">Local Namespace</strong>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Lớp 1: Bản chất câu lệnh import và Cơ chế Cache sys.modules',
      badge: 'Cơ chế Thực thi',
      content: `
        <p>Một <strong>Module</strong> trong Python đơn giản là một file mã nguồn có đuôi <code>.py</code>. Khi bạn viết <code>import my_module</code>, CPython thực hiện 3 bước tuần tự:</p>
        <ol>
          <li><strong>Kiểm tra Cache (<code>sys.modules</code>):</strong> CPython mở từ điển <code>sys.modules</code> trong RAM để xem module này đã từng được nạp chưa. Nếu đã có trong cache, nó bỏ qua bước 2 và dùng lại ngay!</li>
          <li><strong>Tìm kiếm và Thực thi:</strong> Nếu chưa có, CPython tìm file trên các thư mục của <code>sys.path</code>, biên dịch thành bytecode, và <strong>chạy toàn bộ mã nguồn của file đó từ dòng đầu tiên đến dòng cuối cùng</strong>.</li>
          <li><strong>Gắn vào không gian tên (Namespace):</strong> Tạo một đối tượng <code>module</code> và gán vào tên biến trong file hiện tại để bạn truy cập các hàm và biến bên trong.</li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Khám phá sys.modules và chứng minh import chỉ chạy một lần',
          code: `import sys
import math

# Kiểm tra xem module math có nằm trong cache sys.modules không
print("math có trong sys.modules?:", "math" in sys.modules)
print("Kiểu của module math:", type(math))
print("Địa chỉ bộ nhớ của math:", hex(id(math)))

# Nhập khẩu lại math lần thứ hai
import math as toan_hoc
print("toan_hoc có trỏ đúng vào cùng một đối tượng module math cũ?:", toan_hoc is math)`,
          output: `math có trong sys.modules?: True
Kiểu của module math: <class 'module'>
Địa chỉ bộ nhớ của math: 0x1f40a12b200
toan_hoc có trỏ đúng vào cùng một đối tượng module math cũ?: True`,
          annotations: [
            { line: 5, text: 'sys.modules là một dict lưu toàn bộ các module đã nạp.' },
            { line: 11, text: 'Toán tử is khẳng định CPython không nạp lại module mà tái sử dụng đối tượng có sẵn trong cache.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Lớp 2: Các cú pháp import — Tránh cạm bẫy "from module import *"',
      badge: 'Cú pháp Chuẩn mực',
      content: `
        <p>Có 3 cách viết câu lệnh import phổ biến:</p>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr>
                <th>Cú pháp</th>
                <th>Ví dụ</th>
                <th>Ưu điểm / Nhược điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>import X</code></td>
                <td><code>import math</code><br/><code>math.sqrt(16)</code></td>
                <td><strong>Khuyến nghị cao nhất:</strong> Giữ không gian tên sạch sẽ, nhìn vào biết ngay hàm <code>sqrt</code> thuộc về module <code>math</code>.</td>
              </tr>
              <tr>
                <td><code>from X import Y</code></td>
                <td><code>from math import sqrt</code><br/><code>sqrt(16)</code></td>
                <td>Ngắn gọn, gọi trực tiếp <code>sqrt()</code> không cần tiền tố. Dùng tốt khi chỉ cần 1 vài hàm cụ thể.</td>
              </tr>
              <tr>
                <td><code>from X import *</code></td>
                <td><code>from math import *</code></td>
                <td><strong>Cực kỳ nguy hiểm:</strong> Trút toàn bộ hàng trăm tên hàm của math vào không gian tên hiện tại, dễ ghi đè mất các biến và hàm trùng tên của bạn!</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'So sánh các cách import và bí danh alias qua từ khóa as',
          code: `# Cách 1: import chuẩn mực (giữ namespace rõ ràng)
import math
print("Pi qua import math:", math.pi)

# Cách 2: import hàm cụ thể
from math import sqrt, floor
print("Căn bậc 2:", sqrt(25))

# Cách 3: Đổi tên định danh ngắn gọn bằng 'as'
import datetime as dt
ngay = dt.date.today()
print("Ngày hôm nay:", ngay)`,
          output: `Pi qua import math: 3.141592653589793
Căn bậc 2: 5.0
Ngày hôm nay: 2026-10-22`,
          annotations: [
            { line: 3, text: 'math.pi giữ rõ xuất xứ.' },
            { line: 10, text: 'as dt giúp viết code ngắn gọn mà không làm ô nhiễm không gian tên.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Lớp 3: Giải mã if __name__ == "__main__":',
      badge: 'Thành ngữ Kinh điển',
      content: `
        <p>Hầu như file Python mẫu nào cũng kết thúc bằng khối lệnh:</p>
        <pre class="code-pre"><code>if __name__ == "__main__":
    chay_chuong_trinh_chinh()</code></pre>
        <h4>Bản chất bên dưới là gì?</h4>
        <p>Mỗi khi CPython thực thi một file, nó tự động gán cho file đó một biến đặc biệt tên là <code>__name__</code>:</p>
        <ul>
          <li><strong>Khi file được chạy TRỰC TIẾP từ dòng lệnh (ví dụ: <code>python app.py</code>):</strong> CPython tự động đặt <code>__name__ = "__main__"</code>. Khối lệnh bên trong <code>if</code> sẽ được thực thi!</li>
          <li><strong>Khi file được NHẬP KHẨU từ file khác (ví dụ: <code>import app</code>):</strong> CPython tự động đặt <code>__name__ = "app"</code> (đúng bằng tên file module). Lúc này biểu thức <code>__name__ == "__main__"</code> trả về <code>False</code>, giúp mã chạy thử không bị kích hoạt ngoài ý muốn!</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Khám phá giá trị của biến đặc biệt __name__',
          code: `# Xem tên của module hiện tại
print("Giá trị của biến __name__ trong ngữ cảnh này là:", repr(__name__))

if __name__ == "__main__":
    print("-> Đoạn mã này đang được chạy TRỰC TIẾP!")
else:
    print("-> Đoạn mã này đang được NHẬP KHẨU như một module thư viện.")`,
          output: `Giá trị của biến __name__ trong ngữ cảnh này là: '__main__'
-> Đoạn mã này đang được chạy TRỰC TIẾP!`,
          annotations: [
            { line: 2, text: '__name__ là biến hệ thống được CPython tự động thiết lập cho mỗi khung thực thi.' },
            { line: 4, text: 'Khối if bảo vệ mã chạy thử không bị kích hoạt khi file khác import vào.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Lớp 4: sys.path, Package và Triết lý "Batteries Included"',
      badge: 'Thư viện Chuẩn',
      content: `
        <h4>1. CPython tìm kiếm module ở đâu? (sys.path)</h4>
        <p>Khi bạn gõ <code>import xyz</code>, CPython lần lượt tìm trong danh sách các đường dẫn của <code>sys.path</code>:</p>
        <ol>
          <li>Thư mục hiện tại chứa file đang chạy.</li>
          <li>Các đường dẫn thư viện trong biến môi trường <code>PYTHONPATH</code>.</li>
          <li>Thư mục thư viện chuẩn tích hợp sẵn của Python.</li>
          <li>Thư mục các gói cài thêm qua pip (<code>site-packages</code> trong môi trường venv).</li>
        </ol>
        <h4>2. Package là gì?</h4>
        <p>Một <strong>Package</strong> là một thư mục chứa nhiều module <code>.py</code> con và có một file đặc biệt mang tên <code>__init__.py</code> (từ Python 3.3 trở đi, file này có thể để trống hoặc không bắt buộc trong namespace package, nhưng vẫn là chuẩn mực tốt để đánh dấu thư mục là một gói Python).</p>
        <h4>3. Triết lý "Batteries Included" (Có sẵn pin):</h4>
        <p>Python nổi tiếng vì khi vừa cài đặt xong, bạn đã sở hữu một kho tàng thư viện chuẩn (Standard Library) đồ sộ chất lượng cao mà không cần cài thêm bất kỳ thư viện ngoài nào:</p>
        <ul>
          <li><code>math</code>, <code>cmath</code>, <code>random</code>: Tính toán toán học, số phức, ngẫu nhiên.</li>
          <li><code>datetime</code>, <code>time</code>: Xử lý thời gian, múi giờ.</li>
          <li><code>pathlib</code>, <code>os</code>: Xử lý đường dẫn file đa nền tảng hiện đại.</li>
          <li><code>json</code>, <code>csv</code>: Đọc ghi dữ liệu có cấu trúc.</li>
          <li><code>re</code>: Biểu thức chính quy (Regex).</li>
          <li><code>hashlib</code>, <code>secrets</code>: Mã hóa và bảo mật.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Sử dụng nhanh một số module tiêu biểu trong Thư viện chuẩn',
          code: `import math
import random
import pathlib

# 1. math
print("Giai thừa 5!:", math.factorial(5))

# 2. random
xuc_xac = random.randint(1, 6)
print("Tung xúc xắc ngẫu nhiên (1-6):", xuc_xac)

# 3. pathlib (Hiện đại, hướng đối tượng)
duong_dan = pathlib.Path("data") / "lessons" / "p0-01.js"
print("Đường dẫn file chuẩn hóa:", duong_dan)
print("Đuôi file:", duong_dan.suffix)`,
          output: `Giai thừa 5!: 120
Tung xúc xắc ngẫu nhiên (1-6): 4
Đường dẫn file chuẩn hóa: data\\lessons\\p0-01.js
Đuôi file: .js`,
          annotations: [
            { line: 6, text: 'math.factorial() tính toán giai thừa cực nhanh bằng C.' },
            { line: 13, text: 'pathlib dùng toán tử gạch chéo / để ghép đường dẫn file tự động tương thích Windows/Linux.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Đặt tên file trùng với tên module thư viện chuẩn (Shadowing)',
        content: 'Cực kỳ cẩn thận: nếu bạn tạo một file tên là `math.py`, `random.py` hay `email.py` trong thư mục của mình, khi bạn viết `import math`, CPython sẽ tìm thấy file của bạn trước (do thư mục hiện tại đứng đầu trong `sys.path`) và nạp file đó thay vì thư viện chuẩn, dẫn tới lỗi bí ẩn `AttributeError: module has no attribute \'sqrt\'`!'
      },
      {
        title: 'Nhập khẩu vòng (Circular Import)',
        content: 'Xảy ra khi file `a.py` viết `import b`, đồng thời file `b.py` lại viết `import a`. Lúc này cả hai file đều chưa nạp xong đã đòi hỏi đối tượng của nhau, gây ra lỗi `ImportError: cannot import name ... from partially initialized module`.'
      }
    ],
    tips: [
      {
        title: 'Dùng pathlib thay vì os.path',
        content: 'Trong code Python hiện đại, hãy ưu tiên dùng `pathlib.Path` thay cho các hàm cũ của `os.path`. Pathlib là thư viện hướng đối tượng, cú pháp ghép đường dẫn `Path("a") / "b"` cực kỳ thanh lịch và an toàn.'
      }
    ],
    deepDive: {
      title: 'Bên trong CPython: sys.path[0] luôn là gì?',
      content: `
        <p>Khi CPython khởi động để chạy một script, nó tự động chèn thư mục chứa script đó vào vị trí <code>sys.path[0]</code>.</p>
        <p>Nếu bạn mở terminal và gõ <code>python</code> để vào REPL, <code>sys.path[0]</code> sẽ là chuỗi rỗng <code>""</code>, đại diện cho thư mục làm việc hiện tại (Current Working Directory - CWD). Điều này lý giải vì sao bạn luôn có thể import các file nằm cùng thư mục một cách dễ dàng.</p>
      `
    },
    newIn314: null
  },

  exercises: [
    {
      level: 'Dễ',
      title: 'Khám phá các hàm có sẵn trong module math bằng dir()',
      problem: 'Hãy viết một đoạn mã import module `math`, sau đó dùng hàm `dir(math)` để lấy danh sách toàn bộ các thuộc tính và hàm của module này. Lọc và chỉ in ra các tên hàm bắt đầu bằng chữ cái `"c"` (ví dụ: `ceil`, `cos`, `comb`...).',
      hint: 'Dùng list comprehension: [name for name in dir(math) if name.startswith("c")].',
      solutionCode: `import math

# Lấy danh sách tên hàm bắt đầu bằng chữ 'c'
cac_ham_chu_c = [ten for ten in dir(math) if ten.startswith("c")]

print("Số lượng hàm bắt đầu bằng 'c':", len(cac_ham_chu_c))
print("Danh sách:", cac_ham_chu_c)`,
      solutionOutput: `Số lượng hàm bắt đầu bằng 'c': 11
Danh sách: ['cbrt', 'ceil', 'comb', 'copysign', 'cos', 'cosh', 'cube', 'degrees', ...]`,
      explanation: 'Hàm dir() là công cụ tự khám phá mạnh mẽ nhất của Python, trả về danh sách toàn bộ các định danh hợp lệ của một đối tượng.',
      annotations: [
        { line: 4, text: 'Lọc các tên bắt đầu bằng "c".' }
      ]
    },
    {
      level: 'Vừa',
      title: 'Kiểm tra đường dẫn file tồn tại bằng pathlib',
      problem: 'Hãy viết một hàm `kiem_tra_file(duong_dan_str)` nhận vào chuỗi đường dẫn. Hàm dùng `pathlib.Path` để kiểm tra: nếu đường dẫn tồn tại và là một file thì in ra kích thước của file đó theo byte; nếu không tồn tại thì in ra thông báo tương ứng.',
      hint: 'Dùng p = pathlib.Path(...); p.exists(), p.is_file(), p.stat().st_size.',
      solutionCode: `import pathlib

def kiem_tra_file(duong_dan_str):
    p = pathlib.Path(duong_dan_str)
    if p.exists() and p.is_file():
        dung_luong = p.stat().st_size
        return f"File '{p.name}' tồn tại, dung lượng: {dung_luong} bytes"
    else:
        return f"Đường dẫn '{duong_dan_str}' không tồn tại hoặc không phải là file."

print(kiem_tra_file("index.html"))
print(kiem_tra_file("file_khong_co_that.xyz"))`,
      solutionOutput: `File 'index.html' tồn tại, dung lượng: 6599 bytes
Đường dẫn 'file_khong_co_that.xyz' không tồn tại hoặc không phải là file.`,
      explanation: 'pathlib cung cấp API hướng đối tượng đầy đủ và trực quan để thao tác với hệ thống tập tin mà không cần gọi nhiều hàm rời rạc trong module os.',
      annotations: [
        { line: 4, text: 'Khởi tạo đối tượng Path.' },
        { line: 6, text: 'p.stat().st_size lấy dung lượng file chính xác.' }
      ]
    }
  ],

  quiz: [
    {
      question: 'Tại sao câu lệnh `if __name__ == "__main__":` lại được sử dụng rộng rãi trong các file Python?',
      options: [
        'Để chương trình chạy nhanh hơn gấp 2 lần nhờ bỏ qua kiểm tra lỗi.',
        'Để đảm bảo khối mã bên trong chỉ chạy khi file được thực thi trực tiếp, chứ không tự ý chạy khi file được import từ một chương trình khác.',
        'Vì Python bắt buộc mọi hàm phải được khai báo bên trong khối lệnh này.',
        'Để mã hóa mã nguồn chống dịch ngược.'
      ],
      correctIndex: 1,
      explanation: 'Khi chạy trực tiếp, CPython gán __name__ = "__main__". Khi import, __name__ mang tên của file module. Khối if này giúp phân tách hoàn hảo giữa việc chạy thử file và việc dùng file làm thư viện.'
    },
    {
      question: 'Điều gì xảy ra nếu bạn tạo một file tên là `random.py` trong dự án của mình, rồi viết `import random`?',
      options: [
        'CPython sẽ tự động đổi tên file của bạn thành random_user.py.',
        'CPython sẽ nạp chính file random.py của bạn thay vì thư viện chuẩn random của Python (do thư mục hiện tại đứng đầu trong sys.path), gây ra lỗi thiếu hàm (Shadowing).',
        'Chương trình vẫn chạy bình thường vì Python ưu tiên thư viện chuẩn trước.',
        'Python xóa file random.py của bạn.'
      ],
      correctIndex: 1,
      explanation: 'Thư mục hiện tại (sys.path[0]) có mức ưu tiên cao hơn thư viện chuẩn. Việc đặt tên file trùng tên module hệ thống sẽ che khuất thư viện gốc (Name Shadowing).'
    },
    {
      question: 'Khi bạn gõ lệnh `import math` tới 5 lần liên tiếp trong cùng một file code, CPython sẽ thực hiện như thế nào?',
      options: [
        'CPython sẽ đọc file và thực thi lại mã nguồn của math đủ 5 lần.',
        'CPython chỉ đọc và thực thi mã của math ở lần import đầu tiên, sau đó lưu vào từ điển sys.modules và 4 lần sau chỉ lấy đối tượng từ cache ra dùng.',
        'CPython báo lỗi cú pháp vì không được import trùng tên.',
        'CPython tạo ra 5 bản sao khác nhau của math trong bộ nhớ.'
      ],
      correctIndex: 1,
      explanation: 'Bộ nhớ cache sys.modules ngăn ngừa việc thực thi lặp lại cùng một module, vừa tăng tốc độ chương trình vừa bảo đảm trạng thái biến toàn cục của module được nhất quán.'
    }
  ],

  summary: [
    'import thực chất là thực thi mã nguồn của file module một lần duy nhất rồi lưu kết quả vào bộ nhớ cache sys.modules.',
    'Tránh dùng "from x import *"; hãy dùng "import x" hoặc "from x import y, z" để giữ không gian tên tường minh.',
    'Thành ngữ "if __name__ == \'__main__\':" phân tách rạch ròi giữa việc chạy script độc lập và nạp làm thư viện.',
    'sys.path là danh sách các thư mục mà CPython quét để tìm module, trong đó thư mục hiện tại luôn đứng đầu tiên.',
    'Tuyệt đối không đặt tên file trùng với các module của Thư viện chuẩn (math.py, random.py, test.py) để tránh lỗi Name Shadowing.'
  ]
};
