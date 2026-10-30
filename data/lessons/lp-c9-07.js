export default {
  id: 'lp-c9-07',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.7',
  title: 'Tuần tự hóa đối tượng nâng cao: Module pickle & Định dạng di động JSON',
  subtitle: 'Lưu trữ đối tượng trực tiếp vào file bằng pickle, khái niệm tuần tự hóa (serialization), định dạng di động đa nền tảng JSON, và so sánh hai giải pháp',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững khái niệm Tuần tự hóa đối tượng (Object Serialization): quá trình chuyển đổi đối tượng Python sống trong bộ nhớ RAM thành một dòng byte hoặc chuỗi văn bản để lưu xuống đĩa hoặc truyền qua mạng.',
    'Sử dụng thành thạo module pickle của thư viện chuẩn: gọi pickle.dump() để lưu và pickle.load() để tái tạo đối tượng từ file nhị phân (\'wb\' và \'rb\').',
    'Nhận biết cấu trúc dòng byte nội bộ của pickle và hiểu sơ lược về tiện ích shelve: cơ sở dữ liệu lưu trữ đối tượng dạng từ điển truy cập theo khóa trên đĩa cứng.',
    'Thành thạo module json: chuyển đổi đối tượng Python qua lại với chuỗi JSON trong bộ nhớ (dumps / loads) và đọc ghi trực tiếp với file văn bản (dump / load) có định dạng thụt lề indent=4.',
    'So sánh ưu nhược điểm kỹ thuật giữa pickle (độc quyền Python, hỗ trợ kiểu phong phú nhưng không an toàn với nguồn lạ) và JSON (chuẩn mở quốc tế, độc lập ngôn ngữ, định dạng văn bản Unicode an toàn).'
  ],

  intuition: {
    title: 'Đông khô mẫu vật và Đóng gói kiện hàng chuyển phát quốc tế',
    metaphor: 'Khi bạn muốn gửi một đối tượng Python phức tạp (chẳng hạn một từ điển lồng nhau chứa số, danh sách và chuỗi) vào tương lai hoặc sang máy tính khác, bạn cần kỹ thuật "tuần tự hóa" (serialization). Module `pickle` giống như công nghệ đông khô mẫu vật sinh học: nó ép toàn bộ cấu trúc tế bào phức tạp của đối tượng thành một gói bột nhị phân (chuỗi bytes). Khi cần dùng, chỉ việc "ngâm nước" lại bằng `pickle.load()` là đối tượng sống lại nguyên vẹn từng thuộc tính — nhưng gói bột này là độc quyền của Python, người ngoài nhìn vào không thể đọc được. Ngược lại, `JSON` giống như việc đóng gói kiện hàng theo quy chuẩn container quốc tế: mọi dữ liệu được dịch sang văn bản rõ ràng mà bất kỳ ngôn ngữ nào (JavaScript, Java, C++, Go, Rust) cũng đọc hiểu và bốc dỡ dễ dàng!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">HAI GIẢI PHÁP TUẦN TỰ HÓA ĐỐI TƯỢNG (OBJECT SERIALIZATION)</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:8px;">
            <div style="font-weight:700;color:#8b5cf6;margin-bottom:6px;">🥒 Module pickle (Python Proprietary)</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:6px;">Đối tượng Python ⇄ Byte Stream Nhị Phân (Mode 'wb' / 'rb')</div>
            <ul style="font-size:0.75rem;color:var(--text-secondary);padding-left:16px;margin:0;">
              <li>Lưu được hầu như mọi kiểu đối tượng (kể cả class, hàm)</li>
              <li>Tốc độ cao, tối ưu qua nhiều năm</li>
              <li>Chỉ dùng cho hệ sinh thái Python</li>
            </ul>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #f59e0b;border-radius:8px;">
            <div style="font-weight:700;color:#f59e0b;margin-bottom:6px;">🌐 Module json (Universal Standard)</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:6px;">Đối tượng Python ⇄ Chuỗi Văn Bản Unicode (Mode 'w' / 'r')</div>
            <ul style="font-size:0.75rem;color:var(--text-secondary);padding-left:16px;margin:0;">
              <li>Độc lập ngôn ngữ, di động đa nền tảng tuyệt đối</li>
              <li>Người đọc được, hỗ trợ định dạng indent đẹp mắt</li>
              <li>Giới hạn trong các kiểu cơ bản: dict, list, str, num, bool</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Tuần Tự Hóa Đối Tượng Bằng Module pickle',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 19 / 48 – Trang 20 / 48</strong>.</p>
          </div>
        </div>

        <p>Nếu bạn thực sự muốn lưu trữ các đối tượng Python nguyên bản nhưng không muốn mạo hiểm sử dụng <code>eval()</code>, module <code>pickle</code> của thư viện chuẩn chính là công cụ dành cho bạn. <code>pickle</code> giống như một tiện ích định dạng và phân tích cú pháp dữ liệu siêu tổng quát:</p>

        <ul>
          <li><strong>Ghi đối tượng bằng pickle.dump(obj, file):</strong> Mở file ở chế độ nhị phân <code>'wb'</code> và truyền đối tượng cùng tay cầm file vào <code>pickle.dump</code>.</li>
          <li><strong>Nạp đối tượng bằng pickle.load(file):</strong> Mở file ở chế độ nhị phân <code>'rb'</code> và gọi <code>pickle.load(file)</code>. Bạn nhận lại một đối tượng tương đương mà không cần phân tách chuỗi hay chuyển đổi thủ công.</li>
        </ul>

        <p>Module <code>pickle</code> thực hiện quá trình được gọi là <strong>tuần tự hóa đối tượng (object serialization)</strong> — chuyển đổi các đối tượng trong bộ nhớ qua lại với các chuỗi byte — nhưng đòi hỏi rất ít công sức từ phía chúng ta.</p>
      `,
      codeExamples: [
        {
          title: 'Lưu trữ và phục hồi Dictionary bằng module pickle',
          code: `import pickle

# 1. Đối tượng Python phức tạp cần lưu trữ
D = {'a': 1, 'b': 2, 'nested': [10, 20, 30]}

# 2. Ghi đối tượng vào file nhị phân bằng pickle.dump
F = open('datafile.pkl', 'wb')
pickle.dump(D, F)
F.close()
print("Đã pickle đối tượng D vào datafile.pkl thành công!")

# 3. Phục hồi lại đối tượng từ file nhị phân bằng pickle.load
F = open('datafile.pkl', 'rb')
E = pickle.load(F)
F.close()

print("Đối tượng phục hồi E:", E)
print("E có bằng D về giá trị không?", E == D)
print("E có phải cùng một đối tượng với D không (is)?", E is D)`,
          output: `Đã pickle đối tượng D vào datafile.pkl thành công!
Đối tượng phục hồi E: {'a': 1, 'b': 2, 'nested': [10, 20, 30]}
E có bằng D về giá trị không? True
E có phải cùng một đối tượng với D không (is)? False`,
          annotations: [
            { line: 7, text: 'File pickle bắt buộc phải mở ở chế độ nhị phân (\'wb\' / \'rb\').' },
            { line: 8, text: 'pickle.dump chuyển D thành các byte nhị phân ghi xuống file.' },
            { line: 14, text: 'pickle.load tái cấu trúc đối tượng hoàn chỉnh từ dòng byte.' },
            { line: 19, text: 'E is D trả về False vì E là một đối tượng mới được tạo ra trong RAM.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Định Dạng Nhị Phân Nội Bộ của pickle & Giới Thiệu Module shelve',
      content: `
        <p>Bên dưới hậu trường, <code>pickle</code> tự biên dịch đối tượng của chúng ta sang một dạng chuỗi bytes. Định dạng này trông không có gì đẹp mắt đối với mắt người và có thể thay đổi tùy thuộc vào phiên bản giao thức (protocol):</p>

        <p>Trong sách gốc của Mark Lutz (PDF trang 20), chuỗi bytes bắt đầu bằng <code>\\x80\\x04</code> (Protocol 4). Kể từ Python 3.8 và trên phiên bản Python 3.14.8 chuẩn của web, giao thức mặc định là <strong>Protocol 5</strong> (bắt đầu bằng <code>\\x80\\x05</code>) hỗ trợ bộ đệm ngoài ô nhớ (out-of-band data):</p>

        <div class="callout-box callout-note">
          <div class="callout-header"><span>🗄️ Khám phá thêm:</span> <span>Module shelve — Cơ sở dữ liệu pickle</span></div>
          <div class="callout-body">
            <p>Trong lúc tìm hiểu về pickle, bạn cũng nên biết tới module <code>shelve</code> của thư viện chuẩn. <code>shelve</code> là một công cụ sử dụng pickle để lưu trữ các đối tượng Python trong một hệ thống tệp truy cập theo khóa (tương tự một từ điển lưu trên đĩa cứng: <code>db['key'] = obj</code>). Chúng ta sẽ được thấy ví dụ trực quan về <code>shelve</code> trong Chương 28.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Khảo sát dòng byte nhị phân do pickle sinh ra trên Python 3.14.8',
          code: `import pickle

raw_bytes = open('datafile.pkl', 'rb').read()
print("Kích thước file pickle:", len(raw_bytes), "bytes")
print("Byte stream nội bộ (Protocol 5 trên Python 3.14):")
print(repr(raw_bytes))`,
          output: `Kích thước file pickle: 45 bytes
Byte stream nội bộ (Protocol 5 trên Python 3.14):
b'\\x80\\x05\\x95!\\x00\\x00\\x00\\x00\\x00\\x00\\x00}\\x94(\\x8c\\x01a\\x94K\\x01\\x8c\\x01b\\x94K\\x02\\x8c\\x06nested\\x94]\\x94(K\\nK\\x14K\\x1eeu.'`,
          annotations: [
            { line: 5, text: '\\x80\\x05 biểu thị giao thức Protocol 5 của pickle trong Python hiện đại.' },
            { line: 6, text: 'pickle tự động mã hóa cả khóa \'a\', \'b\', \'nested\' và list [10, 20, 30].' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Lưu Trữ Đối Tượng Bằng JSON (JavaScript Object Notation)',
      content: `
        <p>Nếu như <code>pickle</code> được phát triển riêng cho Python, thì <strong>JSON</strong> là định dạng trao đổi dữ liệu tiêu chuẩn quốc tế, vừa độc lập với ngôn ngữ lập trình vừa được hỗ trợ bởi hầu như mọi hệ thống hiện đại (từ trình duyệt web, cơ sở dữ liệu MongoDB/BSON, tới các file cấu hình hệ thống):</p>

        <p>Vì JSON rất gần gũi với cú pháp của dictionary và list trong Python, việc chuyển dịch qua lại giữa hai thế giới này là vô cùng đơn giản và được tự động hóa hoàn toàn bởi module <code>json</code>:</p>

        <ul>
          <li><strong>Trong bộ nhớ:</strong> <code>json.dumps(obj)</code> tuần tự hóa đối tượng Python thành chuỗi JSON; <code>json.loads(str)</code> giải tuần tự hóa chuỗi JSON ngược về đối tượng Python.</li>
          <li><strong>Với tệp tin văn bản:</strong> <code>json.dump(obj, fp, indent=4)</code> ghi trực tiếp đối tượng ra file văn bản với thụt lề đẹp mắt; <code>json.load(fp)</code> nạp đối tượng từ file văn bản.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Chuyển đổi JSON trong bộ nhớ và ghi ra file văn bản có định dạng',
          code: `import json

# Khởi tạo bản ghi Python lồng nhau
who = dict(first='Pat', last='Smith')
rec = dict(name=who, job=['dev', 'mgr'], age=40.5)

# 1. Chuyển đổi trong bộ nhớ: Python => JSON string => Python
json_str = json.dumps(rec)
print("Chuỗi JSON thô:", json_str)
obj_back = json.loads(json_str)
print("Khôi phục từ JSON:", obj_back)
print("Khớp với bản gốc?", obj_back == rec)

# 2. Ghi ra file văn bản với thụt lề định dạng đẹp (indent=4)
file = open('testjson.txt', 'w', encoding='utf-8')
json.dump(rec, fp=file, indent=4)
file.close()

# 3. Đọc nội dung văn bản của file JSON
print("--- Nội dung file JSON người đọc được ---")
print(open('testjson.txt', encoding='utf-8').read())

# 4. Nạp lại đối tượng trực tiếp từ file bằng json.load
P = json.load(open('testjson.txt', encoding='utf-8'))
print("Đối tượng nạp qua json.load:", P)
print("P == rec?", P == rec)`,
          output: `Chuỗi JSON thô: {"name": {"first": "Pat", "last": "Smith"}, "job": ["dev", "mgr"], "age": 40.5}
Khôi phục từ JSON: {'name': {'first': 'Pat', 'last': 'Smith'}, 'job': ['dev', 'mgr'], 'age': 40.5}
Khớp với bản gốc? True
--- Nội dung file JSON người đọc được ---
{
    "name": {
        "first": "Pat",
        "last": "Smith"
    },
    "job": [
        "dev",
        "mgr"
    ],
    "age": 40.5
}
Đối tượng nạp qua json.load: {'name': {'first': 'Pat', 'last': 'Smith'}, 'job': ['dev', 'mgr'], 'age': 40.5}
P == rec? True`,
          annotations: [
            { line: 8, text: 'json.dumps chuyển đổi dictionary thành một chuỗi văn bản JSON chuẩn.' },
            { line: 15, text: 'json.dump ghi trực tiếp vào file; indent=4 tự động căn lề 4 dấu cách.' },
            { line: 24, text: 'json.load đọc stream văn bản và tái tạo dictionary tương đương.' }
          ]
        }
      ]
    },
    {
      id: 'sec-4',
      title: '4. So Sánh Toàn Diện: pickle so với JSON',
      content: `
        <p>Bảng đối chiếu kỹ thuật dưới đây tổng kết sự khác biệt then chốt giữa hai công cụ tuần tự hóa dữ liệu chủ lực trong Python:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:24%;">Đặc tính</th>
                <th style="padding:10px 12px;width:38%;">Module pickle</th>
                <th style="padding:10px 12px;">Module json</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Chế độ file</strong></td>
                <td style="padding:8px 12px;">File nhị phân (<code>'wb'</code> / <code>'rb'</code>)</td>
                <td style="padding:8px 12px;">File văn bản Unicode (<code>'w'</code> / <code>'r'</code>)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Tính di động</strong></td>
                <td style="padding:8px 12px;">Độc quyền Python (không dùng được với JS, C...)</td>
                <td style="padding:8px 12px;">Đa ngôn ngữ, tiêu chuẩn toàn cầu</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Phạm vi kiểu</strong></td>
                <td style="padding:8px 12px;">Rất rộng: số, chuỗi, list, dict, set, hàm, class</td>
                <td style="padding:8px 12px;">Hẹp hơn: chỉ dict (khóa chuỗi), list, str, num, bool, null</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Tính an toàn</strong></td>
                <td style="padding:8px 12px;">⚠️ <strong>Không an toàn:</strong> Không unpickle dữ liệu từ nguồn không tin cậy</td>
                <td style="padding:8px 12px;">✅ <strong>An toàn:</strong> Chỉ biểu diễn dữ liệu thuần túy, không thực thi mã</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><strong>Khả năng đọc hiểu</strong></td>
                <td style="padding:8px 12px;">Byte thô máy đọc, mắt người không đọc được</td>
                <td style="padding:8px 12px;">Văn bản rõ ràng, con người dễ đọc và sửa thủ công</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Khi nào chọn JSON, khi nào chọn Pickle?',
        content: 'Hãy chọn <strong>JSON</strong> khi bạn cần trao đổi dữ liệu với ứng dụng web, frontend JavaScript, mobile app, API REST hoặc file cấu hình hệ thống. Chỉ chọn <strong>pickle</strong> khi bạn cần lưu trữ tạm thời các đối tượng Python chuyên biệt (như class instance phức tạp) phục vụ nội bộ giữa các tiến trình Python đáng tin cậy.'
      }
    ],
    pitfalls: [
      {
        title: 'Quy tắc an ninh sinh tử với pickle.load()',
        content: 'Tuyệt đối KHÔNG BAO GIỜ gọi <code>pickle.load()</code> trên một file hoặc dòng dữ liệu tải về từ Internet hoặc nhận từ người dùng không xác thực. Một tệp tin pickle độc hại có thể chứa chỉ thị khởi tạo tùy ý, thực thi lệnh hệ thống và chiếm quyền điều khiển toàn bộ máy chủ!'
      }
    ]
  },

  exercises: [
    {
      title: 'Tuần tự hóa danh sách sinh viên ra file JSON và đọc lại',
      level: 'Vừa',
      problem: 'Hãy viết mã Python: (1) Tạo một list gồm 2 dictionary chứa thông tin sinh viên (id, tên, điểm trung bình). (2) Dùng module json để ghi list này vào file \'students.json\' với tham số indent=2. (3) Mở và nạp lại dữ liệu bằng json.load(), tính điểm trung bình chung của cả hai sinh viên.',
      hint: 'Dùng json.dump(students, f, indent=2) và json.load(f).',
      solutionCode: `import json

students = [
    {'id': 1, 'name': 'An', 'gpa': 8.5},
    {'id': 2, 'name': 'Bình', 'gpa': 9.0}
]

# Ghi ra JSON
with open('students.json', 'w', encoding='utf-8') as f:
    json.dump(students, f, indent=2, ensure_ascii=False)

# Đọc lại và tính điểm
with open('students.json', 'r', encoding='utf-8') as f:
    loaded = json.load(f)

avg_gpa = sum(s['gpa'] for s in loaded) / len(loaded)
print(f"Đã đọc {len(loaded)} sinh viên. Điểm TB chung: {avg_gpa}")`,
      solutionOutput: `Đã đọc 2 sinh viên. Điểm TB chung: 8.75`,
      explanation: 'json.dump với indent=2 giúp tạo cấu trúc thụt lề rõ ràng; ensure_ascii=False đảm bảo các ký tự tiếng Việt (như \'Bình\') được lưu dưới dạng chữ Unicode trực tiếp.'
    }
  ],

  quiz: [
    {
      question: 'Phát biểu nào sau đây đúng về sự khác biệt giữa json.dumps() và json.dump()?',
      options: [
        'json.dumps() nhận đối số là tay cầm file, còn json.dump() trả về một chuỗi văn bản.',
        'json.dumps() tuần tự hóa đối tượng thành một chuỗi văn bản JSON trong bộ nhớ, còn json.dump() ghi trực tiếp luồng dữ liệu vào một đối tượng file.',
        'json.dumps() dùng cho file nhị phân, còn json.dump() dùng cho file văn bản.',
        'Hai hàm này hoàn toàn giống hệt nhau, dumps chỉ là cách viết tắt.'
      ],
      correctIndex: 1,
      explanation: 'Ký tự \'s\' trong dumps đại diện cho \'string\' (trả về chuỗi); không có \'s\' trong dump đại diện cho việc truyền nhận trực tiếp với một file pointer.'
    },
    {
      question: 'Tại sao file lưu trữ bằng module pickle bắt buộc phải mở ở chế độ nhị phân (\'wb\' hoặc \'rb\')?',
      options: [
        'Vì hệ điều hành cấm lưu file văn bản có đuôi .pkl.',
        'Vì dữ liệu do pickle tạo ra là một chuỗi bytes thô chứa các byte tùy ý, nếu mở chế độ văn bản thì cơ chế Unicode và ngắt dòng sẽ làm biến dạng và hỏng cấu trúc dữ liệu.',
        'Vì chế độ nhị phân tự động mã hóa mật khẩu cho file.',
        'Vì pickle chỉ hoạt động được trên các máy chủ đám mây.'
      ],
      correctIndex: 1,
      explanation: 'Pickle tạo ra chuỗi bytes thô. Nếu mở ở chế độ văn bản, các byte đặc biệt trùng với ký tự kết thúc dòng hoặc ngoài bảng mã sẽ bị chuyển đổi, khiến việc unpickle sau đó gặp lỗi hỏng dữ liệu.'
    }
  ],

  summary: [
    'Tuần tự hóa đối tượng (serialization) là việc chuyển đổi đối tượng sống trong RAM thành dạng lưu trữ bền vững trên đĩa hoặc truyền nhận qua mạng.',
    'Module pickle cung cấp pickle.dump() và pickle.load() làm việc trên file nhị phân, lưu trữ hầu như mọi đối tượng Python nguyên vẹn mà không cần parse thủ công.',
    'Module shelve xây dựng trên nền tảng pickle, cung cấp giao diện từ điển lưu trữ đối tượng truy cập theo khóa trên đĩa.',
    'Module json cung cấp khả năng chuyển đổi dữ liệu mở, đa nền tảng, làm việc với file văn bản Unicode, an toàn tuyệt đối trước nguy cơ thực thi mã độc.',
    'So sánh: JSON là chuẩn trao đổi quốc tế; Pickle chỉ dùng cho hệ thống Python nội bộ đáng tin cậy.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.8), chúng ta sẽ tìm hiểu các công cụ xử lý file định dạng khác (struct cho dữ liệu nhị phân C, csv cho dữ liệu bảng) cùng Trình quản lý ngữ cảnh của file (with open) và các công cụ giống file trong Python.'
};
