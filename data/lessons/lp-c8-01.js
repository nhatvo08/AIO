export default {
  id: 'lp-c8-01',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.1',
  title: 'Căn bản về List: Đặc tính cốt lõi, Dãy tuần tự khả biến & Mảng tham chiếu trong CPython',
  subtitle: 'Khám phá 5 đặc tính nền tảng của List, phân loại dãy tuần tự khả biến và cơ chế mảng con trỏ C bên trong trình thông dịch CPython',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững 5 đặc tính kỹ thuật cốt lõi định hình nên kiểu đối tượng List trong Python.',
    'Hiểu rõ bản chất "Dãy tuần tự khả biến" (Mutable Sequence): vừa kế thừa các thao tác chuỗi vừa hỗ trợ thay đổi tại chỗ.',
    'Thấu suốt kiến trúc tầng sâu: List trong CPython là một mảng các con trỏ tham chiếu (C array of pointers), đảm bảo tốc độ truy cập O(1).',
    'Thành thạo cú pháp hằng số bằng chữ (literal) của List: list rỗng, list chứa kiểu dị thể và list lồng nhau đa tầng.'
  ],

  intuition: {
    title: 'Mảng danh thiếp trỏ tới các thực thể trong bộ nhớ',
    metaphor: 'Nếu bạn từng học ngôn ngữ C, một mảng số nguyên `int a[10]` là một khối bộ nhớ liên tục chứa trực tiếp 10 con số đó. Nhưng List trong Python linh hoạt hơn thế gấp bội: hãy hình dung List là một cuốn album gồm các ô túi nhựa trong suốt có thứ tự từ 0 đến N-1. Trong mỗi ô túi, Python không nhét cả một đối tượng cồng kềnh vào đó, mà chỉ bỏ vào một "tấm danh thiếp ghi địa chỉ" (con trỏ tham chiếu - pointer/reference) dẫn đến đối tượng thực sự đang nằm ở một nơi nào đó trên vùng nhớ Heap. Nhờ kiến trúc này, một ô có thể trỏ tới số nguyên, ô tiếp theo trỏ tới chuỗi văn bản dài, ô kế tiếp lại trỏ tới một cuốn album khác (list lồng nhau). Khi bạn truy xuất `L[i]`, Python lập tức phóng theo địa chỉ trên tấm danh thiếp để mang đối tượng về cho bạn với tốc độ tức thì O(1)!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">KIẾN TRÚC MẢNG THAM CHIẾU CỦA LIST TRONG CPYTHON</div>
        <div style="display:flex;justify-content:center;gap:12px;align-items:flex-start;flex-wrap:wrap;">
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:8px;text-align:center;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:6px;">Đối tượng List (PyListObject)</div>
            <div style="display:flex;gap:4px;border:1px dashed var(--border-strong);padding:6px;border-radius:4px;background:var(--bg-surface-alt);">
              <span style="padding:4px 8px;background:var(--accent-soft);color:var(--accent-text);border-radius:4px;">ptr[0]</span>
              <span style="padding:4px 8px;background:var(--accent-soft);color:var(--accent-text);border-radius:4px;">ptr[1]</span>
              <span style="padding:4px 8px;background:var(--accent-soft);color:var(--accent-text);border-radius:4px;">ptr[2]</span>
            </div>
            <div style="font-size:0.72rem;color:var(--text-muted);margin-top:4px;">Mảng con trỏ C liên tục</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div style="padding:6px 12px;background:var(--bg-surface);border:1px solid #10b981;border-radius:6px;font-size:0.82rem;">
              ➔ ptr[0] trỏ tới: <strong style="color:#10b981;">PyLongObject (123)</strong>
            </div>
            <div style="padding:6px 12px;background:var(--bg-surface);border:1px solid #3b82f6;border-radius:6px;font-size:0.82rem;">
              ➔ ptr[1] trỏ tới: <strong style="color:#3b82f6;">PyUnicodeObject ('abc')</strong>
            </div>
            <div style="padding:6px 12px;background:var(--bg-surface);border:1px solid #8b5cf6;border-radius:6px;font-size:0.82rem;">
              ➔ ptr[2] trỏ tới: <strong style="color:#8b5cf6;">PyListObject (['dev', 'mgr'])</strong>
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Năm Đặc Tính Kỹ Thuật Nền Tảng của List',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 1 / 42 – Trang 2 / 42</strong>.</p>
          </div>
        </div>

        <p>List trong Python đảm nhiệm vai trò của nhiều cấu trúc dữ liệu tập hợp mà bạn có thể phải tự cài đặt thủ công trong các ngôn ngữ cấp thấp hơn như C. Dưới đây là 5 đặc tính then chốt định hình nên kiểu dữ liệu này:</p>

        <ol>
          <li><strong>Tập hợp có thứ tự chứa các đối tượng tùy ý:</strong> List đơn thuần là nơi tập hợp các đối tượng khác để xử lý theo nhóm. Nó duy trì thứ tự vị trí cố định từ trái sang phải giữa các phần tử mà nó chứa đựng.</li>
          <li><strong>Truy cập theo vị trí bù (offset):</strong> Bạn có thể lấy ra bất kỳ đối tượng thành phần nào bằng cách đánh chỉ mục (indexing) theo vị trí bù số học (bắt đầu từ 0). Vì có thứ tự vị trí, list cũng hỗ trợ các tác vụ cắt lát (slicing) và ghép nối (concatenation).</li>
          <li><strong>Chiều dài khả biến, dị thể, và có thể lồng nhau tùy ý:</strong> Khác với chuỗi, list có thể mở rộng và thu hẹp tại chỗ. Chúng có thể chứa bất kỳ loại đối tượng nào chứ không chỉ là các ký tự đồng nhất (cấu trúc <em>dị thể - heterogeneous</em>). Do list vừa có thể chứa vừa có thể được chứa bởi các đối tượng tập hợp khác, chúng hỗ trợ lồng ghép tùy ý (list chứa sublist, sublist lại chứa list khác...).</li>
          <li><strong>Thuộc phân loại "dãy tuần tự khả biến" (mutable sequence):</strong> List đáp ứng tất cả thao tác sequence như chuỗi (chỉ mục, slice, ghép nối). Điểm khác biệt là: ghép nối và cắt lát trên list trả về một <em>list mới</em>; đồng thời list hỗ trợ các thao tác in-place (xóa, chèn, gán chỉ mục) trực tiếp trên chính đối tượng hiện tại.</li>
          <li><strong>Mảng các tham chiếu đối tượng:</strong> Về mặt kỹ thuật, list chứa từ không đến nhiều tham chiếu (reference) tới các đối tượng khác trong bộ nhớ máy tính.</li>
        </ol>
      `,
      codeExamples: []
    },
    {
      id: 'sec-2',
      title: '2. Bản chất Tầng sâu trong CPython: Mảng Tham chiếu Đối tượng',
      content: `
        <p>Như tác giả Mark Lutz phân tích ở trang 2, list có thể gợi bạn nhớ đến mảng các con trỏ (địa chỉ) nếu bạn có nền tảng từ C/C++. Việc lấy một phần tử từ list trong Python nhanh gần như việc đánh chỉ mục một mảng trong C.</p>

        <p>Trong thực tế, <strong>list thực sự là các mảng bên trong trình thông dịch CPython tiêu chuẩn</strong>, chứ không phải các cấu trúc liên kết (linked lists). Cấu trúc <code>PyListObject</code> trong mã nguồn C của CPython lưu giữ một con trỏ tới một mảng các con trỏ <code>PyObject*</code>. Nhờ đó, thao tác truy xuất <code>L[i]</code> là một phép toán số học con trỏ với độ phức tạp thời gian cực hạn: <strong>O(1)</strong>.</p>

        <p>Tuy nhiên, như đã tìm hiểu ở Chương 6, Python luôn tự động lần theo tham chiếu tới đối tượng bất cứ khi nào tham chiếu đó được sử dụng, do đó chương trình của bạn chỉ làm việc trực tiếp với các đối tượng. Bất cứ khi nào bạn gán một đối tượng cho một phần tử của list, Python luôn lưu <strong>một tham chiếu tới chính đối tượng đó chứ không phải một bản sao của nó</strong>.</p>
      `,
      codeExamples: [
        {
          title: 'Khám phá cấu trúc dị thể và cơ chế lưu tham chiếu của List',
          code: `# Khởi tạo list chứa các đối tượng thuộc nhiều kiểu khác nhau (dị thể)
mixed_list = [100, 'Python', 3.14, [1, 2]]

print("Độ dài của list:", len(mixed_list))
for idx, item in enumerate(mixed_list):
    print(f"Offset {idx}: Giá trị = {item!r:<10} | Kiểu = {type(item).__name__} | ID = {id(item)}")

# Chứng minh list lưu tham chiếu tới chính đối tượng gốc
shared_sub = ['a', 'b']
main_list = [shared_sub, 999]

# Sửa đổi đối tượng con qua biến shared_sub
shared_sub.append('c')
print("\nSau khi thay đổi shared_sub:")
print("main_list[0]:", main_list[0])`,
          output: `Độ dài của list: 4
Offset 0: Giá trị = 100        | Kiểu = int | ID = ...
Offset 1: Giá trị = 'Python'   | Kiểu = str | ID = ...
Offset 2: Giá trị = 3.14       | Kiểu = float | ID = ...
Offset 3: Giá trị = [1, 2]     | Kiểu = list | ID = ...

Sau khi thay đổi shared_sub:
main_list[0]: ['a', 'b', 'c']`,
          annotations: [
            { line: 2, text: 'List chứa int, str, float và một sublist: cấu trúc dị thể hoàn toàn hợp lệ.' },
            { line: 6, text: 'Hàm id() cho thấy mỗi phần tử thực chất là một tham chiếu trỏ tới đối tượng độc lập trong Heap.' },
            { line: 13, text: 'Thay đổi shared_sub phản ánh ngay lập tức vào main_list vì main_list lưu tham chiếu trỏ tới shared_sub.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Cú pháp Hằng số bằng chữ (Literal) của List',
      content: `
        <p>Khi được viết dưới dạng biểu thức hằng số bằng chữ (literal), một list được viết mã dưới dạng một chuỗi các đối tượng (thực chất là các biểu thức trả về đối tượng) nằm trong cặp dấu ngoặc vuông <code>[]</code>, ngăn cách nhau bằng dấu phẩy:</p>

        <ul>
          <li><strong>List rỗng:</strong> <code>L = []</code> — một cặp ngoặc vuông không có gì bên trong, độ dài bằng 0.</li>
          <li><strong>List đơn giản:</strong> <code>L = [1, 2, 3]</code> — các phần tử đồng nhất hoặc dị thể.</li>
          <li><strong>List lồng nhau:</strong> <code>L = ['Pat', 40.0, ['dev', 'mgr']]</code> — sublist được viết như một chuỗi ngoặc vuông lồng nhau.</li>
        </ul>

        <p>Hãy lưu ý rằng các phần tử bên trong dấu ngoặc vuông có thể là bất kỳ biểu thức Python hợp lệ nào; Python sẽ đánh giá biểu thức đó và lưu tham chiếu tới đối tượng kết quả vào vị trí tương ứng trong list.</p>
      `,
      codeExamples: [
        {
          title: 'Khởi tạo các dạng literal của List trong thực tế',
          code: `# List rỗng
empty_list = []
print("List rỗng:", empty_list, "Độ dài:", len(empty_list))

# List chứa biểu thức tính toán
calc_list = [1 + 1, 'Py' * 2, abs(-99)]
print("List từ biểu thức:", calc_list)

# List lồng nhau đa tầng
nested_list = ['Root', ['Child_1', ['Grandchild']], 'Child_2']
print("Cấu trúc lồng nhau:", nested_list)
print("Truy cập Grandchild:", nested_list[1][1][0])`,
          output: `List rỗng: [] Độ dài: 0
List từ biểu thức: [2, 'PyPy', 99]
Cấu trúc lồng nhau: ['Root', ['Child_1', ['Grandchild']], 'Child_2']
Truy cập Grandchild: Grandchild`,
          annotations: [
            { line: 6, text: 'Biểu thức tính toán 1+1, \'Py\'*2 được đánh giá ngay khi tạo list.' },
            { line: 11, text: 'Truy cập lồng nhau 3 tầng liên tiếp bằng chuỗi chỉ mục [1][1][0].' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Tra cứu danh sách phương thức của List với help() và dir()',
        content: 'Bạn luôn có thể mở REPL và gõ <code>dir(list)</code> hoặc <code>help(list)</code> để xem danh sách đầy đủ tất cả phương thức có sẵn của kiểu list trong phiên bản Python hiện tại của bạn.'
      }
    ],
    pitfalls: [
      {
        title: 'Tránh nhầm lẫn giữa List trong Python và Mảng C hoặc Danh sách liên kết',
        content: 'List trong CPython KHÔNG phải là Linked List (danh sách liên kết). Việc truy xuất ngẫu nhiên <code>L[i]</code> luôn là O(1) chứ không phải O(N). Tuy nhiên, thao tác chèn/xóa ở đầu list (<code>insert(0, X)</code> hoặc <code>pop(0)</code>) đòi hỏi dịch chuyển toàn bộ mảng con trỏ phía sau nên sẽ tốn chi phí O(N).'
      }
    ]
  },

  exercises: [
    {
      title: 'Tạo và trích xuất thông tin từ cấu trúc List dị thể lồng nhau',
      level: 'Dễ',
      problem: 'Hãy viết mã Python khởi tạo một list mô tả thông tin nhân viên: phần tử đầu tiên là mã ID (số nguyên), phần tử thứ hai là họ tên (chuỗi), phần tử thứ ba là danh sách các kỹ năng (list các chuỗi gồm \'Python\', \'SQL\', \'Git\'). Sau đó: in ra kỹ năng thứ hai (\'SQL\') bằng chỉ mục lồng nhau.',
      hint: 'Cấu trúc dạng employee = [101, "Nguyễn Văn A", ["Python", "SQL", "Git"]]. Chỉ mục thứ hai của list kỹ năng là [2][1].',
      solutionCode: `employee = [101, "Nguyễn Văn A", ["Python", "SQL", "Git"]]

emp_id = employee[0]
emp_name = employee[1]
second_skill = employee[2][1]

print(f"Nhân viên: {emp_name} (ID: {emp_id})")
print(f"Kỹ năng thứ 2: {second_skill}")`,
      solutionOutput: `Nhân viên: Nguyễn Văn A (ID: 101)
Kỹ năng thứ 2: SQL`,
      explanation: 'Biểu thức employee[2] lấy ra sublist các kỹ năng, và thêm chỉ mục [1] sẽ lấy ra phần tử \'SQL\' tại vị trí bù thứ hai của sublist đó.'
    }
  ],

  quiz: [
    {
      question: 'Bên trong trình thông dịch CPython tiêu chuẩn, List được cài đặt bằng cấu trúc dữ liệu nào dưới tầng C?',
      options: [
        'Một danh sách liên kết đơn (Singly Linked List) với các con trỏ next.',
        'Một mảng các con trỏ tham chiếu đối tượng liên tục (Array of PyObject pointers).',
        'Một bảng băm (Hash Table) sử dụng cơ chế băm địa chỉ bộ nhớ.',
        'Một cây nhị phân tìm kiếm cân bằng đỏ-đen (Red-Black Tree).'
      ],
      correctIndex: 1,
      explanation: 'Trong CPython tiêu chuẩn, List được cài đặt dưới dạng mảng con trỏ C liên tục, giúp thao tác truy xuất theo chỉ mục L[i] đạt tốc độ O(1) như mảng trong C.'
    },
    {
      question: 'Đặc tính "dị thể" (heterogeneous) của List trong Python có nghĩa là gì?',
      options: [
        'List chỉ có thể chứa các đối tượng có cùng một kiểu dữ liệu duy nhất.',
        'List có thể chứa đồng thời nhiều kiểu đối tượng khác nhau (số, chuỗi, list, dict...) trong cùng một tập hợp.',
        'List không thể thay đổi chiều dài sau khi đã khởi tạo.',
        'Các phần tử trong list không có thứ tự xác định.'
      ],
      correctIndex: 1,
      explanation: 'Dị thể (heterogeneous) có nghĩa là list có thể chứa bất kỳ loại đối tượng nào, hỗn hợp số, chuỗi, list lồng nhau, hàm, v.v.'
    }
  ],

  summary: [
    'List là tập hợp có thứ tự vị trí từ trái sang phải, linh hoạt và phổ biến nhất trong Python.',
    'List thuộc phân loại "dãy tuần tự khả biến" (mutable sequence): hỗ trợ toàn bộ các thao tác sequence như chuỗi, đồng thời cho phép sửa đổi trực tiếp tại chỗ.',
    'Về mặt bản chất tầng sâu trong CPython, List là một mảng liên tục các con trỏ tham chiếu đối tượng, mang lại tốc độ truy xuất O(1) cực hạn.',
    'List có tính chất dị thể (heterogeneous) và hỗ trợ lồng ghép tùy ý đến độ sâu không giới hạn.',
    'Cú pháp hằng số bằng chữ của list sử dụng cặp dấu ngoặc vuông [], với các phần tử ngăn cách nhau bởi dấu phẩy.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.2), chúng ta sẽ khám phá các thao tác cơ bản với List: phép ghép nối (+), phép lặp lại (*), hàm len(), và cơ chế so sánh tự động đa tầng.'
};