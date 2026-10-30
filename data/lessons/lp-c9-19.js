export default {
  id: 'lp-c9-19',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.19',
  title: 'Kiểm tra kiến thức Phần II (Bài 10, 11): Bản ghi thông tin cá nhân lồng nhau & Đọc Ghi File thực chiến',
  subtitle: 'Xây dựng mô hình dữ liệu lồng nhau phức hợp kết hợp Dict-Tuple-List, viết script đọc ghi tập tin hệ điều hành, phân tích CWD và tổng kết toàn bộ Phần II',
  level: 'Cơ bản đến Nâng cao',
  duration: '45 phút',
  isNew314: false,
  readings: [
    {
      title: 'Learning Python, 6th Edition — Chương 9: Kiểm tra kiến thức: Bài tập Phần II (Bài 10, 11)',
      author: 'Mark Lutz',
      pages: 'Trang 48 / 48 (Bản dịch tiếng Việt)'
    },
    {
      title: 'Learning Python, 6th Edition — Phụ lục B: Đáp án bài tập Phần II (Đối tượng và Thao tác)',
      author: 'Mark Lutz',
      pages: 'Trang 1166–1168 (Bản gốc tiếng Anh)'
    }
  ],
  objectives: [
    'Thiết kế và xây dựng cấu trúc dữ liệu mô hình hóa thông tin cá nhân lồng nhau (nested personal record) kết hợp tối ưu giữa dictionary, tuple, list, chuỗi và số.',
    'Thực hành truy cập các trường dữ liệu đa cấp bằng cú pháp kết hợp khóa và chỉ số: record[\'name\'][\'last\'], record[\'email\'][0].',
    'So sánh ưu nhược điểm kiến trúc giữa các cấu trúc dữ liệu khác nhau cho cùng một bài toán mô hình hóa thông tin đối tượng.',
    'Viết hoàn chỉnh hai tập lệnh Python độc lập tương tác với hệ điều hành: (1) Tạo và ghi file myfile.txt; (2) Mở, đọc và hiển thị nội dung file.',
    'Hiểu tường tận vai trò của Thư mục làm việc hiện tại (Current Working Directory - CWD), đường dẫn tương đối/tuyệt đối và ký tự kết thúc dòng \\n.',
    'Tổng kết toàn diện toàn bộ Phần II (Các kiểu đối tượng cốt lõi) và định hướng bước sang Phần III (Câu lệnh và Cú pháp).'
  ],
  sections: [
    {
      id: 'sec-1',
      title: '1. Bài tập 10: Cấu Trúc Lồng Nhau (Nesting Data Structures)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz (Trang 48 / 48)</span>
          </div>
          <div class="callout-body">
            <p>Yêu cầu của Mark Lutz: Xây dựng một cấu trúc dữ liệu biểu diễn thông tin cá nhân (tên riêng/tên đệm/họ, tuổi tác, nghề nghiệp, địa chỉ, email, số điện thoại) bằng bất kỳ sự kết hợp nào giữa các kiểu đối tượng cốt lõi (list, tuple, dict, chuỗi, số). Sau đó truy cập các thành phần riêng lẻ bằng chỉ mục và đánh giá tính hợp lý kiến trúc.</p>
          </div>
        </div>

        <p><strong>Thiết kế cấu trúc dữ liệu tối ưu:</strong></p>
        <p>Lớp ngoài cùng nên là một <strong>Dictionary</strong> vì nó cung cấp các khóa có ý nghĩa ngữ nghĩa (self-documenting), loại bỏ sự phụ thuộc vào thứ tự lưu trữ:</p>
        <ul>
          <li><strong>Họ tên (<code>'name'</code>):</strong> Sử dụng <code>dict</code> gồm các khóa <code>'first'</code>, <code>'middle'</code>, <code>'last'</code> giúp tra cứu độc lập họ hoặc tên bất chấp quy ước thứ tự văn hóa.</li>
          <li><strong>Tuổi tác (<code>'age'</code>):</strong> Dùng số nguyên <code>int</code> để có thể tính toán số học (cộng tuổi, so sánh điều kiện).</li>
          <li><strong>Nghề nghiệp (<code>'job'</code>):</strong> Dùng chuỗi <code>str</code> mô tả công việc.</li>
          <li><strong>Địa chỉ (<code>'address'</code>):</strong> Dùng <code>tuple</code> để biểu diễn bộ tọa độ địa lý cố định, thể hiện tính bất biến toàn vẹn.</li>
          <li><strong>Email (<code>'email'</code>):</strong> Dùng <code>list</code> vì một người có thể sở hữu nhiều email và danh sách này cần bổ sung, xóa bớt linh hoạt bằng <code>.append()</code>.</li>
          <li><strong>Số điện thoại (<code>'phone'</code>):</strong> Bắt buộc dùng chuỗi <code>str</code> để bảo toàn chữ số <code>0</code> ở đầu và hỗ trợ mã vùng quốc tế (<code>+84...</code>).</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 10: Xây dựng và truy cập bản ghi thông tin cá nhân lồng nhau',
          code: `# Thiết kế cấu trúc dữ liệu cá nhân hoàn chỉnh
me = {
    'name': {'first': 'Văn', 'middle': 'An', 'last': 'Nguyễn'},
    'age': 28,
    'job': 'Kỹ sư phần mềm',
    'address': ('Số 123 Đường Lê Lợi', 'Quận 1', 'TP. Hồ Chí Minh'),
    'email': ['an.nguyen@example.com', 'work.an@techcorp.vn'],
    'phone': '0901234567'
}

# Truy cập các trường thông tin đa cấp
print("Họ và Tên:", me['name']['last'], me['name']['first'])
print("Email chính:", me['email'][0])
print("Thành phố cư trú:", me['address'][2])

# Thêm một email phụ mới vào danh sách
me['email'].append('backup@gmail.com')
print("Danh sách email sau cập nhật:", me['email'])`,
          output: `Họ và Tên: Nguyễn Văn
Email chính: an.nguyen@example.com
Thành phố cư trú: TP. Hồ Chí Minh
Danh sách email sau cập nhật: ['an.nguyen@example.com', 'work.an@techcorp.vn', 'backup@gmail.com']`
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Bài tập 11: File — Tương Tác Hệ Thống Thực Chiến',
      content: `
        <p>Yêu cầu của Mark Lutz: Viết hai tập lệnh Python độc lập: (1) Tạo file <code>myfile.txt</code> và ghi chuỗi <code>'Hello file world!\\n'</code> vào đó; (2) Mở file, đọc và in nội dung ra màn hình console.</p>

        <p><strong>Ba câu hỏi chuyên sâu về cơ chế hệ điều hành:</strong></p>
        <ol>
          <li>
            <strong>File mới có xuất hiện trong thư mục chạy script không?</strong><br/>
            <em>Có!</em> Khi bạn chỉ truyền tên file đơn thuần (như <code>'myfile.txt'</code>), Python sẽ mặc định tìm và tạo file tại <strong>Thư mục làm việc hiện tại (CWD - Current Working Directory)</strong> của tiến trình chạy.
          </li>
          <li>
            <strong>Điều gì xảy ra nếu thêm đường dẫn thư mục khác vào tên file?</strong><br/>
            Nếu bạn truyền đường dẫn tương đối (ví dụ: <code>open('data/myfile.txt', 'w')</code>) hoặc tuyệt đối (ví dụ: <code>open('C:/data.txt', 'w')</code>), Python sẽ tạo file tại đúng vị trí đó. Tuy nhiên, mọi thư mục cha trên đường dẫn bắt buộc phải tồn tại từ trước; nếu thiếu thư mục cha, Python sẽ ném lỗi <code>FileNotFoundError</code>.
          </li>
          <li>
            <strong>Tầm quan trọng của ký tự <code>\\n</code> khi ghi file:</strong><br/>
            Phương thức <code>file.write()</code> là thao tác tầng thấp, ghi chính xác chuỗi byte được truyền vào mà <em>không tự động thêm ký tự xuống dòng</em> (khác với hàm <code>print()</code>). Do đó, bạn bắt buộc phải thêm <code>\\n</code> một cách tường minh để ngắt dòng.
          </li>
        </ol>
      `,
      codeExamples: [
        {
          title: 'Thực nghiệm Bài tập 11: Viết script ghi và đọc file myfile.txt',
          code: `import os

# --- Kịch bản 1: maker.py (Tạo và ghi file) ---
with open('myfile.txt', 'w', encoding='utf-8') as f:
    f.write('Hello file world!\\n')
print("Đã ghi file thành công tại CWD:", os.getcwd())

# --- Kịch bản 2: reader.py (Đọc và in file) ---
with open('myfile.txt', 'r', encoding='utf-8') as f:
    content = f.read()

print("Nội dung đọc được từ file:")
print(content, end='')

# Dọn dẹp file kiểm thử sau khi hoàn thành
if os.path.exists('myfile.txt'):
    os.remove('myfile.txt')
    print("Đã dọn dẹp file myfile.txt sau thực nghiệm.")`,
          output: `Đã ghi file thành công tại CWD: d:\\str
Nội dung đọc được từ file:
Hello file world!
Đã dọn dẹp file myfile.txt sau thực nghiệm.`
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cột Mốc Lớn: Tổng Kết Toàn Diện Phần II & Bước Sang Phần III',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>🎉</span>
            <span><strong>Cột mốc vinh quang:</strong> Hoàn thành trọn vẹn toàn bộ Phần II!</span>
          </div>
          <div class="callout-body">
            <p>Trải qua 6 chương học quy mô lớn từ Chương 4 đến Chương 9 với hơn 100 bài học chuyên sâu, bạn đã xây dựng một nền tảng vững chắc như bàn thạch về tất cả các kiểu đối tượng cốt lõi trong ngôn ngữ Python:</p>
            <ul>
              <li><strong>Chương 4:</strong> Giới thiệu tổng quan hệ thống kiểu đối tượng dựng sẵn và cơ chế kiểu động (dynamic typing).</li>
              <li><strong>Chương 5:</strong> Kiểu Số học (Numbers), phân số (fractions), số thập phân chính xác (decimal), và tập hợp (sets).</li>
              <li><strong>Chương 6:</strong> Mô hình đối tượng CPython: Biến, Tham chiếu, Đối tượng và Bộ dọn rác (Garbage Collector).</li>
              <li><strong>Chương 7:</strong> Kiểu Chuỗi ký tự (Strings): mã hóa Unicode, phương thức chuỗi, định dạng %, format, f-strings.</li>
              <li><strong>Chương 8:</strong> Danh sách (Lists) và Từ điển (Dictionaries): cấu trúc khả biến, bảng băm, lồng nhau đa cấp.</li>
              <li><strong>Chương 9:</strong> Tuple (dãy bất biến), File (giao tiếp hệ điều hành), phân cấp kiểu, sao chép sâu và các cạm bẫy đối tượng kinh điển.</li>
            </ul>
            <p>Với hành trang kiểu dữ liệu hoàn chỉnh này, bạn đã sẵn sàng bước sang <strong>Phần III: Các câu lệnh và Cú pháp (Statements and Syntax)</strong> — nơi chúng ta sẽ học cách điều khiển dòng chảy chương trình bằng các câu lệnh rẽ nhánh <code>if/else</code>, các vòng lặp <code>for</code> và <code>while</code>, cùng giao thức lặp (Iteration Protocol) siêu việt của Python!</p>
          </div>
        </div>
      `,
      codeExamples: []
    }
  ],
  callouts: {
    pitfalls: [
      {
        title: 'Cạm bẫy quên thêm \\n khi ghi file',
        content: 'Không giống như print(), phương thức file.write() không tự thêm ký tự xuống dòng. Nếu gọi f.write("Hello"); f.write("World"), nội dung trên đĩa sẽ là "HelloWorld" dính liền vào nhau.'
      }
    ],
    tips: [
      {
        title: 'Luôn sử dụng context manager "with open(...)"',
        content: 'Cú pháp with open(...) as f bảo đảm hệ điều hành luôn đóng file và giải phóng descriptor ngay cả khi xảy ra lỗi ngoại lệ bên trong khối lệnh, giúp code an toàn và chuẩn mực tuyệt đối.'
      }
    ]
  },
  quiz: [
    {
      question: 'Khi mô hình hóa hồ sơ một nhân sự, tại sao số điện thoại nên được lưu trữ dưới dạng chuỗi (str) thay vì số nguyên (int)?',
      options: [
        'Vì Python không cho phép nhập số nguyên có độ dài quá 9 chữ số.',
        'Vì số nguyên sẽ tự động loại bỏ chữ số 0 ở đầu và không thể chứa các ký tự đặc biệt như dấu cộng (+84) hay dấu gạch nối.',
        'Vì chuỗi tiêu tốn ít bộ nhớ RAM hơn số nguyên trong CPython.',
        'Vì số nguyên không thể hiển thị được trên màn hình console.'
      ],
      correctIndex: 1,
      explanation: 'Số điện thoại trong thực tế là một chuỗi ký tự định danh (identifier), không phải là giá trị số dùng để tính toán cộng trừ. Lưu bằng chuỗi giúp bảo toàn chữ số 0 mở đầu và các ký tự định dạng quốc tế.'
    },
    {
      question: 'Sự khác biệt căn bản giữa hàm print(text) và phương thức file.write(text) khi ghi dữ liệu là gì?',
      options: [
        'print() chỉ in được số nguyên còn file.write() chỉ ghi được chuỗi ký tự.',
        'print() tự động bổ sung ký tự xuống dòng \\n ở cuối, trong khi file.write() ghi chính xác chuỗi được truyền vào mà không tự thêm \\n.',
        'file.write() tự động xóa sạch file trước khi ghi chuỗi mới.',
        'Không có sự khác biệt nào, cả hai đều tự động xuống dòng.'
      ],
      correctIndex: 1,
      explanation: 'file.write() là phương thức tầng thấp, ghi chính xác từng ký tự nhận được vào buffer của file. Để có dòng mới, lập trình viên bắt buộc phải thêm ký tự \\n một cách tường minh.'
    },
    {
      question: 'Nếu bạn chạy open(\'subdir/myfile.txt\', \'w\') mà thư mục subdir chưa hề tồn tại trên đĩa cứng, điều gì sẽ xảy ra?',
      options: [
        'Python tự động tạo thư mục subdir rồi tạo file bên trong một cách êm thấm.',
        'Python lưu file vào thư mục gốc C:\\ thay thế.',
        'Python ném ngoại lệ FileNotFoundError (hoặc IOError) vì không thể tự động tạo các thư mục cha chưa tồn tại.',
        'File được lưu dưới dạng file tạm thời trong RAM.'
      ],
      correctIndex: 2,
      explanation: 'Hàm open() của Python chỉ có khả năng tạo file mới trong một thư mục đã tồn tại sẵn. Nếu bất kỳ thư mục cha nào trên đường dẫn bị thiếu, hệ thống sẽ báo lỗi FileNotFoundError. Để tạo thư mục tự động, cần dùng os.makedirs().'
    },
    {
      question: 'Trong cấu trúc me = {\'name\': {\'first\': \'An\', \'last\': \'Nguyen\'}, \'emails\': [\'a@x.com\', \'b@x.com\']}, cú pháp nào lấy ra địa chỉ email thứ hai?',
      options: [
        'me.emails[2]',
        'me[\'emails\'][2]',
        'me[\'name\'][\'emails\'][1]',
        'me[\'emails\'][1]'
      ],
      correctIndex: 3,
      explanation: 'me[\'emails\'] truy cập vào danh sách qua khóa \'emails\', và [1] lấy phần tử thứ hai của danh sách (theo chỉ số bắt đầu từ 0).'
    }
  ],
  summary: [
    'Mô hình hóa dữ liệu lồng nhau trong Python kết hợp linh hoạt Dictionary (định danh bằng khóa nhãn), Tuple (bản ghi bất biến), List (bộ sưu tập khả biến), và kiểu nguyên thủy phù hợp với ngữ nghĩa.',
    'Đánh chỉ mục nhiều cấp (record[\'key\'][index]) cho phép định vị chính xác dữ liệu sâu bên trong cấu trúc phân cấp.',
    'open(\'file.txt\', \'w\') tạo file tại Thư mục làm việc hiện tại (CWD); file.write() không tự thêm \\n.',
    'Sử dụng context manager with open(...) là tiêu chuẩn vàng của Python để bảo đảm file luôn được giải phóng tài nguyên an toàn.',
    'Hoàn thành trọn vẹn Phần II (Các kiểu đối tượng cốt lõi), mở đường bước sang Phần III (Câu lệnh và Cú pháp điều khiển luồng).'
  ],
  nextSteps: 'Chúc mừng bạn đã hoàn thành trọn vẹn toàn bộ 20 bài học của Chương 9 và toàn bộ Phần II! Bạn đã sở hữu một nền móng vững chắc về các kiểu đối tượng dựng sẵn của Python. Hãy chuẩn bị bước sang Phần III để chinh phục các cấu trúc điều khiển và cú pháp câu lệnh nâng cao!'
};
