export default {
  id: 'lp-c9-09',
  partId: 'part-lp-c9',
  chapter: 'Chương 9: Tuple, File và các đối tượng khác',
  number: 'C9.9',
  title: 'Đánh giá và Tóm tắt các kiểu cốt lõi: Bảng 9-3, Phân loại Thể loại & Nạp chồng toán tử',
  subtitle: 'Phân loại toàn diện các kiểu dữ liệu cốt lõi trong Python theo Thể loại và Tính khả biến, bao quát Bảng 9-3 và khung nạp chồng toán tử OOP',
  level: 'Trung cấp',
  duration: '30 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Bao quát trọn vẹn Bảng 9-3: bản đồ phân loại toàn bộ các kiểu dữ liệu dựng sẵn chính của Python theo Thể loại (Category) và Tính khả biến (Mutability).',
    'Nắm vững quy luật thao tác theo thể loại: các đối tượng thuộc cùng thể loại Dãy tuần tự (Chuỗi, List, Tuple, Bytearray) đều chia sẻ chung các toán tử như ghép nối (+), tính độ dài len(), và cắt lát ([:]).',
    'Nhớ rõ ranh giới khả biến: chỉ có duy nhất 3 kiểu cốt lõi chính là List, Dictionary và Set (cùng bytearray) mới có thể thay đổi trực tiếp tại chỗ (in-place); Số học, Chuỗi và Tuple hoàn toàn bất biến.',
    'Nhận biết các trường hợp ngoại lệ thú vị: bytearray là chuỗi khả biến, frozenset là tập hợp bất biến, và đối tượng file chỉ cung cấp phương thức.',
    'Hiểu ý nghĩa của Khung chuyên đề Nạp chồng toán tử (Operator Overloading): cách các lớp (class) trong Phần VI có thể mô phỏng trọn vẹn hành vi của các kiểu dựng sẵn bằng các phương thức đặc biệt (__getitem__, __add__, __iter__).'
  ],

  intuition: {
    title: 'Bản đồ phân loại sinh học vương quốc dữ liệu Python',
    metaphor: 'Trong sinh học, các nhà khoa học phân chia hàng triệu loài sinh vật thành các Giới (Kingdoms), Ngành (Phyla) và Lớp (Classes) dựa trên các đặc tính chung nhất về cấu tạo tế bào và phương thức sinh sản. Trong Python, thế giới đối tượng cũng được quy hoạch theo một trật tự hoàn hảo: Thể loại (Category) quy định bộ "gen di truyền" về các thao tác mà đối tượng có thể phản hồi (Dãy tuần tự thì biết cắt lát, Ánh xạ thì biết tra cứu khóa, Tập hợp thì biết tìm giao/hợp). Trong khi đó, Tính khả biến (Mutability) giống như chất liệu sinh học: đối tượng làm bằng đất sét mềm (khả biến — List, Dict, Set) thì có thể nắn bóp sửa hình dạng tại chỗ; đối tượng đúc bằng đá hoa cương (bất biến — Số, Chuỗi, Tuple) thì vĩnh viễn giữ nguyên hình hài!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">MA TRẬN PHÂN LOẠI HỆ THỐNG KIỂU DỮ LIỆU CỐT LÕI</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #10b981;border-radius:8px;">
            <div style="font-weight:700;color:#10b981;margin-bottom:6px;">📦 ĐỐI TƯỢNG KHẢ BIẾN (MUTABLE)</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:4px;">Có thể thay đổi tại chỗ (In-place mutation):</div>
            <ul style="font-size:0.75rem;padding-left:16px;margin:0;">
              <li><strong>List</strong> (Dãy tuần tự)</li>
              <li><strong>Dictionary</strong> (Ánh xạ)</li>
              <li><strong>Set</strong> (Tập hợp)</li>
              <li><strong>bytearray</strong> (Dãy byte khả biến)</li>
            </ul>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid #3b82f6;border-radius:8px;">
            <div style="font-weight:700;color:#3b82f6;margin-bottom:6px;">🔒 ĐỐI TƯỢNG BẤT BIẾN (IMMUTABLE)</div>
            <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:4px;">Không thể thay đổi tại chỗ, chỉ tạo mới:</div>
            <ul style="font-size:0.75rem;padding-left:16px;margin:0;">
              <li><strong>Số học (Numbers):</strong> int, float, complex, decimal, fraction</li>
              <li><strong>Chuỗi (Strings):</strong> str, bytes</li>
              <li><strong>Tuple</strong> (Bộ giá trị)</li>
              <li><strong>frozenset</strong> (Tập hợp bất biến)</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Đánh Giá và Tóm Tắt Các Kiểu Cốt Lõi',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 9: Tuple, File và các đối tượng khác • <strong>PDF Trang 24 / 48</strong>.</p>
          </div>
        </div>

        <p>Giờ đây, sau khi chúng ta đã thấy toàn bộ các đối tượng dựng sẵn của Python hoạt động trong thực tế, hãy kết thúc chuyến hành trình tìm hiểu các kiểu đối tượng bằng cách điểm lại một số đặc tính chung mà chúng chia sẻ:</p>

        <ul>
          <li><strong>Các đối tượng chia sẻ chung các thao tác tùy theo thể loại của chúng:</strong> Ví dụ, các đối tượng dãy tuần tự — chuỗi, list, tuple và bytearray — đều dùng chung các thao tác dãy tuần tự như ghép nối <code>+</code>, tính độ dài <code>len()</code>, đánh chỉ mục và cắt lát <code>[:]</code>.</li>
          <li><strong>Chỉ các đối tượng khả biến (mutable) mới có thể thay đổi tại chỗ:</strong> List, dictionary và set có thể sửa đổi nội dung mà không làm thay đổi định danh (ID ô nhớ). Bạn không thể thay đổi số học, chuỗi hay tuple tại chỗ, mà chỉ có thể tạo một đối tượng mới mang giá trị khác.</li>
          <li><strong>Đối tượng File là ngoại lệ:</strong> File chỉ cung cấp các phương thức, do đó tính khả biến không thực sự áp dụng cho chúng — trạng thái của chúng có thể thay đổi khi đọc ghi dữ liệu, nhưng điều này không hoàn toàn giống với tính khả biến của đối tượng dữ liệu trong bộ nhớ.</li>
          <li><strong>Mục "Số học" (Numbers):</strong> Bao gồm mọi kiểu số: số nguyên, số thực dấu phẩy động, số phức, decimal và phân số fraction.</li>
          <li><strong>Mục "Chuỗi" (Strings):</strong> Bao gồm cả chuỗi văn bản <code>str</code> và chuỗi nhị phân <code>bytes</code>. Ngoại lệ thú vị: kiểu chuỗi <code>bytearray</code> làm phức tạp việc phân loại vì nó là một chuỗi có tính khả biến.</li>
          <li><strong>Tập hợp Set:</strong> Có phần giống như các khóa của một dictionary không có giá trị, nhưng chúng không ánh xạ tới giá trị và không có thứ tự, vì vậy set không phải là kiểu ánh xạ cũng không phải là kiểu dãy tuần tự. Biến thể bất biến của nó là <code>frozenset</code>.</li>
        </ul>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bảng 9-3: Phân Loại Toàn Bộ Các Đối Tượng Python',
      content: `
        <p><strong>Bảng 9-3</strong> dưới đây phân loại toàn bộ các kiểu dữ liệu cốt lõi chính mà chúng ta đã nghiên cứu từ trước đến nay dựa theo các danh mục kiểu và tính chất thay đổi tại chỗ:</p>

        <div style="overflow-x:auto;margin:16px 0;">
          <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.88rem;">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);text-align:left;">
                <th style="padding:10px 12px;width:30%;">Kiểu đối tượng (Object type)</th>
                <th style="padding:10px 12px;width:35%;">Thể loại (Category)</th>
                <th style="padding:10px 12px;">Khả biến? (Mutable?)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Số học (Numbers)</strong></td>
                <td style="padding:8px 12px;">Số học (Numeric)</td>
                <td style="padding:8px 12px;color:#ef4444;font-weight:700;">Không (No)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Chuỗi (Strings)</strong></td>
                <td style="padding:8px 12px;">Dãy tuần tự (Sequence)</td>
                <td style="padding:8px 12px;color:#ef4444;font-weight:700;">Không (No)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>List</strong></td>
                <td style="padding:8px 12px;">Dãy tuần tự (Sequence)</td>
                <td style="padding:8px 12px;color:#10b981;font-weight:700;">Có (Yes)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Dictionary</strong></td>
                <td style="padding:8px 12px;">Ánh xạ (Mapping)</td>
                <td style="padding:8px 12px;color:#10b981;font-weight:700;">Có (Yes)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Tuple</strong></td>
                <td style="padding:8px 12px;">Dãy tuần tự (Sequence)</td>
                <td style="padding:8px 12px;color:#ef4444;font-weight:700;">Không (No)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>File</strong></td>
                <td style="padding:8px 12px;">Mở rộng (Extension)</td>
                <td style="padding:8px 12px;color:var(--text-muted);">Không áp dụng (N/A)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Set</strong></td>
                <td style="padding:8px 12px;">Tập hợp (Set)</td>
                <td style="padding:8px 12px;color:#10b981;font-weight:700;">Có (Yes)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px 12px;"><strong>Frozenset</strong></td>
                <td style="padding:8px 12px;">Tập hợp (Set)</td>
                <td style="padding:8px 12px;color:#ef4444;font-weight:700;">Không (No)</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;"><strong>bytearray</strong></td>
                <td style="padding:8px 12px;">Dãy tuần tự (Sequence)</td>
                <td style="padding:8px 12px;color:#10b981;font-weight:700;">Có (Yes)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      codeExamples: []
    },
    {
      id: 'sec-3',
      title: '3. Khung Chuyên Đề: Vì Sao Bạn Sẽ Quan Tâm: Nạp Chồng Toán Tử (Operator Overloading)',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>⚙️ Khung chuyên đề Mark Lutz:</span> <span>Nạp chồng toán tử trong Lớp (Class)</span>
          </div>
          <div class="callout-body">
            <p>Trong Phần VI của cuốn sách này, bạn sẽ học được rằng các đối tượng được cài đặt bằng lớp (class) có thể tùy ý lựa chọn và kết hợp các đặc tính từ các thể loại này. Ví dụ, nếu chúng ta muốn cung cấp một loại đối tượng dãy tuần tự chuyên biệt mới hoạt động nhất quán với các dãy tuần tự dựng sẵn, chúng ta có thể viết mã một lớp <strong>nạp chồng toán tử (operator overloading)</strong> cho các thao tác như đánh chỉ mục và ghép nối:</p>
          </div>
        </div>

        <p>Bằng cách định nghĩa các phương thức đặc biệt bắt đầu và kết thúc bằng hai dấu gạch dưới (<em>dunder methods</em>), đối tượng tùy biến của bạn có thể hòa nhập tự nhiên vào cú pháp chuẩn của ngôn ngữ Python:</p>
      `,
      codeExamples: [
        {
          title: 'Minh họa lớp tự định nghĩa nạp chồng toán tử bắt chước dãy tuần tự',
          code: `class MySequence:
    def __init__(self, data):
        self.data = list(data)
        
    def __getitem__(self, index):
        # Được gọi khi thực hiện self[index], hỗ trợ chỉ mục và cắt lát
        return self.data[index]
        
    def __add__(self, other):
        # Được gọi khi thực hiện self + other
        return MySequence(self.data + list(other))
        
    def __len__(self):
        # Được gọi khi gọi hàm len(self)
        return len(self.data)

# Thử nghiệm đối tượng tùy biến
seq = MySequence(['a', 'b', 'c'])
print("Độ dài len(seq):", len(seq))
print("Đánh chỉ mục seq[1]:", seq[1])
combined = seq + ['d', 'e']
print("Ghép nối toán tử +:", list(combined))`,
          output: `Độ dài len(seq): 3
Đánh chỉ mục seq[1]: b
Ghép nối toán tử +: ['a', 'b', 'c', 'd', 'e']`,
          annotations: [
            { line: 5, text: '__getitem__ nạp chồng toán tử truy xuất chỉ số và slice.' },
            { line: 9, text: '__add__ nạp chồng toán tử cộng ghép nối +.' },
            { line: 13, text: '__len__ nạp chồng hàm dựng sẵn len().' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Mọi kiểu đối tượng ngày nay đều có phương thức riêng',
        content: 'Bên cạnh các toán tử dùng chung theo thể loại (như <code>+</code> hay <code>[:]</code>), tất cả các kiểu trong Bảng 9-3 đều sở hữu các phương thức đặc thù riêng biệt (như <code>str.upper()</code>, <code>list.append()</code>, <code>dict.keys()</code>, <code>set.intersection()</code>).'
      }
    ],
    pitfalls: [
      {
        title: 'Tránh nhầm lẫn bytearray với chuỗi thông thường str',
        content: 'bytearray là một dãy các số nguyên byte có tính KHẢ BIẾN (cho phép gán <code>b[0] = 65</code> tại chỗ). Trong khi đó, chuỗi <code>str</code> và chuỗi <code>bytes</code> là hoàn toàn BẤT BIẾN.'
      }
    ]
  },

  exercises: [
    {
      title: 'Phân loại các đối tượng và kiểm tra tính khả biến',
      level: 'Dễ',
      problem: 'Hãy viết một đoạn mã Python kiểm tra xem việc thay đổi phần tử đầu tiên tại chỗ có hoạt động được hay không trên 3 đối tượng: chuỗi s = \'abc\', danh sách l = [1, 2, 3], và tuple t = (1, 2, 3). Bắt lỗi TypeError đối với các đối tượng bất biến.',
      hint: 'Dùng try/except TypeError khi thực hiện phép gán s[0]=\'x\' và t[0]=99.',
      solutionCode: `s = 'abc'
l = [1, 2, 3]
t = (1, 2, 3)

# 1. Thử thay đổi list (Khả biến)
l[0] = 99
print("List sau khi sửa:", l)

# 2. Thử thay đổi chuỗi (Bất biến)
try:
    s[0] = 'z'
except TypeError as e:
    print("Chuỗi bất biến:", e)

# 3. Thử thay đổi tuple (Bất biến)
try:
    t[0] = 99
except TypeError as e:
    print("Tuple bất biến:", e)`,
      solutionOutput: `List sau khi sửa: [99, 2, 3]
Chuỗi bất biến: 'str' object does not support item assignment
Tuple bất biến: 'tuple' object does not support item assignment`,
      explanation: 'Minh chứng rõ nét cho Bảng 9-3: List là đối tượng khả biến cho phép sửa tại chỗ; Chuỗi và Tuple đều là đối tượng bất biến từ chối phép gán chỉ mục.'
    }
  ],

  quiz: [
    {
      question: 'Trong các kiểu dữ liệu sau đây, kiểu nào thuộc thể loại Dãy tuần tự (Sequence) nhưng lại có tính chất KHẢ BIẾN (Mutable)?',
      options: [
        'str',
        'tuple',
        'bytearray',
        'frozenset'
      ],
      correctIndex: 2,
      explanation: 'Theo Bảng 9-3, List và bytearray là hai đại diện tiêu biểu của thể loại Dãy tuần tự (Sequence) có tính khả biến, cho phép thay đổi tại chỗ.'
    },
    {
      question: 'Phương thức đặc biệt (dunder method) nào được dùng trong Lớp để nạp chồng thao tác đánh chỉ mục self[index]?',
      options: [
        '__index__',
        '__getitem__',
        '__slice__',
        '__get__'
      ],
      correctIndex: 1,
      explanation: '__getitem__(self, index) là phương thức nạp chồng toán tử đánh chỉ mục và cắt lát của Python.'
    }
  ],

  summary: [
    'Bảng 9-3 tổng kết toàn bộ 9 nhóm kiểu dữ liệu chính theo Thể loại (Số học, Dãy tuần tự, Ánh xạ, Mở rộng, Tập hợp) và Tính khả biến.',
    'Các đối tượng thuộc cùng thể loại chia sẻ chung các toán tử biểu thức (như phép cắt lát, ghép nối của dãy tuần tự).',
    'Chỉ có List, Dictionary và Set (cùng bytearray) là các đối tượng khả biến có thể thay đổi tại chỗ trong bộ nhớ.',
    'Thông qua cơ chế nạp chồng toán tử (operator overloading) với các phương thức dunder, lập trình viên có thể tạo ra các Lớp mới hòa nhập tự nhiên vào ngữ pháp chuẩn của Python.'
  ],

  nextSteps: 'Trong bài tiếp theo (C9.10), chúng ta sẽ khám phá Tính linh hoạt của đối tượng: mô hình cây lồng nhau đa tầng (Hình 9-1) và phân tích sâu sắc cơ chế Phép gán Tham chiếu so với Bản sao (Hình 9-2, shallow copy vs deepcopy).'
};
