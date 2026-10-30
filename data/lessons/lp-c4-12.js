export default {
  id: 'lp-c4-12',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.12',
  title: 'Tóm tắt Chương 4 & Bài kiểm tra Tự đánh giá Kiến thức',
  subtitle: 'Tổng kết toàn diện hệ thống đối tượng cốt lõi và 6 câu hỏi tự đánh giá kinh điển của Mark Lutz kèm đáp án',
  level: 'Trung bình',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hệ thống hóa toàn bộ kiến thức về các kiểu đối tượng cốt lõi dựng sẵn của Python đã học trong Chương 4.',
    'Phân loại thành thạo các đối tượng theo hai trục: Trục cấu trúc (Dãy tuần tự vs Ánh xạ) và Trục biến đổi (Khả biến vs Bất biến).',
    'Tự kiểm tra và củng cố hiểu biết với 6 câu hỏi đánh giá kiến thức kinh điển của tác giả Mark Lutz.',
    'Sẵn sàng bước sang các chương tiếp theo để đi sâu vào chi tiết kỹ thuật từng kiểu dữ liệu.'
  ],

  intuition: {
    title: 'Bức tranh toàn cảnh sau khi hoàn thành chuyến thám hiểm',
    metaphor: 'Sau khi đã đi qua từng hòn đảo — từ đảo Số học, vùng vịnh Chuỗi ký tự, cánh đồng Danh sách bát ngát, thành phố Từ điển tấp nập, lâu đài Tuple bất biến, cho đến bến cảng Tệp tin và vùng đất Tập hợp — giờ là lúc bạn đứng trên ngọn núi cao nhất để nhìn lại toàn bộ bản đồ. Bạn nhận ra mọi thứ không hề rời rạc: chúng đều được kết nối chặt chẽ bởi các nguyên lý thống nhất: Đa hình, Tính bất biến, và Giao thức lặp.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">BẢN ĐỒ PHÂN LOẠI CÁC KIỂU DỮ LIỆU CỐT LÕI PYTHON</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--accent-primary);border-radius:6px;">
            <div style="font-weight:700;color:var(--accent-primary);font-size:0.8rem;margin-bottom:4px;">🔒 BẤT BIẾN (IMMUTABLE)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">
              • <strong>Số:</strong> int, float, complex, decimal, fraction<br>
              • <strong>Chuỗi:</strong> str, bytes<br>
              • <strong>Dãy tuần tự:</strong> tuple, range, frozenset<br>
              • <strong>Khác:</strong> bool, None
            </div>
          </div>
          <div style="padding:10px;background:var(--bg-surface);border:2px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);font-size:0.8rem;margin-bottom:4px;">✏️ KHẢ BIẾN (MUTABLE)</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">
              • <strong>Dãy tuần tự:</strong> list, bytearray<br>
              • <strong>Ánh xạ:</strong> dict<br>
              • <strong>Tập hợp:</strong> set<br>
              • <strong>Kiểu tự tạo:</strong> class instances
            </div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">Phân loại theo danh mục: Dãy tuần tự (str, list, tuple) | Ánh xạ (dict) | Tập hợp (set)</div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Nhìn lại Toàn bộ Hành trình Chương 4',
      content: `
        <p>Trong Chương 4 của cuốn <em>Learning Python</em>, chúng ta đã thực hiện một chuyến tham quan tổng quan nhanh (tour) qua toàn bộ thế giới các đối tượng cốt lõi dựng sẵn của Python:</p>
        <ol>
          <li><strong>Hệ thống phân cấp khái niệm:</strong> Chương trình ➔ Mô-đun ➔ Câu lệnh ➔ Biểu thức ➔ Đối tượng.</li>
          <li><strong>Số học (Numbers):</strong> Số nguyên vô hạn chữ số, số thực, số phức, cùng các mở rộng <code>Decimal</code> và <code>Fraction</code>.</li>
          <li><strong>Chuỗi ký tự (Strings):</strong> Dãy tuần tự ký tự bất biến, các phép thao tác vị trí, cắt lát, phương thức định dạng, và hệ thống chuỗi Unicode / Bytes.</li>
          <li><strong>Danh sách (Lists):</strong> Dãy tuần tự tổng quát, khả biến, co giãn linh hoạt, cấu trúc ma trận lồng nhau và cú pháp comprehension mạnh mẽ.</li>
          <li><strong>Từ điển (Dictionaries):</strong> Kiểu ánh xạ duy nhất, lưu trữ theo cặp khóa-giá trị, truy cập tức thì O(1) qua bảng băm, giao thức lặp và phép gán tuple.</li>
          <li><strong>Bộ giá trị (Tuples):</strong> Phiên bản bất biến của danh sách, bảo vệ toàn vẹn dữ liệu và đóng vai trò khóa cho từ điển.</li>
          <li><strong>Tệp (Files):</strong> Cổng giao tiếp xuất nhập dữ liệu bền vững xuống đĩa cứng và giao diện duck-typing giống tệp.</li>
          <li><strong>Các kiểu khác:</strong> Tập hợp (Set) loại bỏ trùng lặp, Boolean (True/False), đối tượng giữ chỗ None, và Lớp tự tạo (Class Worker).</li>
        </ol>
      `
    },
    {
      id: 'sec-2',
      title: '2. Bài kiểm tra Tự đánh giá Kiến thức Chương 4 (Chapter Review)',
      content: `
        <p>Dưới đây là <strong>6 câu hỏi kiểm tra kiến thức tự luận kinh điển</strong> được Mark Lutz biên soạn ở cuối Chương 4 để giúp người học tự đo lường mức độ tiếp thu bài học. Bạn hãy suy nghĩ câu trả lời trong đầu trước khi bấm mở đáp án gợi ý của tác giả!</p>

        <div style="margin:20px 0;display:flex;flex-direction:column;gap:16px;">
          <div style="padding:16px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">Câu hỏi 1: Ba kiểu đối tượng cốt lõi biểu diễn các loại dữ liệu cơ bản</div>
            <p style="margin:0 0 10px 0;">Hãy kể tên ba kiểu đối tượng cốt lõi dựng sẵn của Python dùng để biểu diễn các tập hợp số, chữ và dữ liệu hỗn hợp.</p>
            <details class="solution-details" style="padding:10px 14px;background:var(--bg-surface-alt);border-radius:6px;cursor:pointer;">
              <summary style="font-weight:600;color:var(--text-secondary);">Bấm xem đáp án gợi ý của tác giả</summary>
              <div style="margin-top:10px;font-size:0.9rem;line-height:1.6;color:var(--text-primary);">
                <strong>Đáp án của Mark Lutz:</strong><br>
                Ba kiểu đối tượng cốt lõi đại diện tương ứng là:
                <ul>
                  <li><strong>Số (Numbers):</strong> chẳng hạn như số nguyên (<code>int</code>) và số thực dấu phẩy động (<code>float</code>).</li>
                  <li><strong>Chuỗi ký tự (Strings):</strong> biểu diễn các văn bản và ký tự (<code>str</code>).</li>
                  <li><strong>Danh sách (Lists):</strong> biểu diễn các tập hợp dữ liệu hỗn hợp có thứ tự và khả biến (<code>list</code>).</li>
                </ul>
              </div>
            </details>
          </div>

          <div style="padding:16px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">Câu hỏi 2: Bản chất của tính "bất biến" (Immutability)</div>
            <p style="margin:0 0 10px 0;">Khái niệm "bất biến" (immutable) có nghĩa là gì trong ngữ cảnh đối tượng Python, và hai kiểu đối tượng cốt lõi nào của Python là bất biến?</p>
            <details class="solution-details" style="padding:10px 14px;background:var(--bg-surface-alt);border-radius:6px;cursor:pointer;">
              <summary style="font-weight:600;color:var(--text-secondary);">Bấm xem đáp án gợi ý của tác giả</summary>
              <div style="margin-top:10px;font-size:0.9rem;line-height:1.6;color:var(--text-primary);">
                <strong>Đáp án của Mark Lutz:</strong><br>
                "Bất biến" có nghĩa là giá trị của đối tượng không thể bị thay đổi tại chỗ sau khi nó đã được tạo ra trong bộ nhớ. Mọi thao tác có vẻ như sửa đổi một đối tượng bất biến thực chất đều phải tạo ra một đối tượng mới hoàn toàn.<br>
                Các kiểu đối tượng cốt lõi bất biến tiêu biểu bao gồm: <strong>Chuỗi ký tự (strings)</strong>, <strong>Số (numbers)</strong>, và <strong>Bộ giá trị (tuples)</strong>.
              </div>
            </details>
          </div>

          <div style="padding:16px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">Câu hỏi 3: Khái niệm "Dãy tuần tự" (Sequence)</div>
            <p style="margin:0 0 10px 0;">"Dãy tuần tự" (sequence) là gì, và ba kiểu đối tượng cốt lõi nào của Python thuộc danh mục này?</p>
            <details class="solution-details" style="padding:10px 14px;background:var(--bg-surface-alt);border-radius:6px;cursor:pointer;">
              <summary style="font-weight:600;color:var(--text-secondary);">Bấm xem đáp án gợi ý của tác giả</summary>
              <div style="margin-top:10px;font-size:0.9rem;line-height:1.6;color:var(--text-primary);">
                <strong>Đáp án của Mark Lutz:</strong><br>
                "Dãy tuần tự" là một tập hợp các đối tượng được sắp xếp theo thứ tự vị trí từ trái sang phải. Các phần tử trong dãy tuần tự được định vị bằng các chỉ số nguyên (offsets) bắt đầu từ 0. Mọi dãy tuần tự đều chia sẻ chung các thao tác vị trí: hàm <code>len()</code>, chỉ mục số dương/âm <code>X[i]</code>, cắt lát <code>X[i:j]</code>, ghép nối (<code>+</code>) và lặp lại (<code>*</code>).<br>
                Ba kiểu dãy tuần tự cốt lõi tiêu biểu nhất là: <strong>Chuỗi ký tự (strings)</strong>, <strong>Danh sách (lists)</strong>, và <strong>Bộ giá trị (tuples)</strong>.
              </div>
            </details>
          </div>

          <div style="padding:16px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">Câu hỏi 4: Khái niệm "Ánh xạ" (Mapping)</div>
            <p style="margin:0 0 10px 0;">"Ánh xạ" (mapping) là gì, và kiểu đối tượng cốt lõi nào của Python là một ánh xạ?</p>
            <details class="solution-details" style="padding:10px 14px;background:var(--bg-surface-alt);border-radius:6px;cursor:pointer;">
              <summary style="font-weight:600;color:var(--text-secondary);">Bấm xem đáp án gợi ý của tác giả</summary>
              <div style="margin-top:10px;font-size:0.9rem;line-height:1.6;color:var(--text-primary);">
                <strong>Đáp án của Mark Lutz:</strong><br>
                "Ánh xạ" là một tập hợp các đối tượng được lưu trữ và truy xuất thông qua các <strong>khóa (keys)</strong> định danh thay vì theo thứ tự vị trí tương đối. Ánh xạ không duy trì thứ tự từ trái sang phải để truy cập bằng chỉ số 0, 1, 2.<br>
                Kiểu đối tượng cốt lõi duy nhất trong Python thuộc danh mục ánh xạ là <strong>Từ điển (Dictionaries / dict)</strong>.
              </div>
            </details>
          </div>

          <div style="padding:16px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">Câu hỏi 5: Khái niệm "Đa hình" (Polymorphism)</div>
            <p style="margin:0 0 10px 0;">"Đa hình" (polymorphism) có nghĩa là gì trong ngữ cảnh lập trình Python?</p>
            <details class="solution-details" style="padding:10px 14px;background:var(--bg-surface-alt);border-radius:6px;cursor:pointer;">
              <summary style="font-weight:600;color:var(--text-secondary);">Bấm xem đáp án gợi ý của tác giả</summary>
              <div style="margin-top:10px;font-size:0.9rem;line-height:1.6;color:var(--text-primary);">
                <strong>Đáp án của Mark Lutz:</strong><br>
                "Đa hình" có nghĩa là ý nghĩa và hành vi cụ thể của một thao tác hoặc cú pháp phụ thuộc hoàn toàn vào kiểu của các đối tượng đang tham gia thao tác đó.<br>
                Ví dụ: toán tử <code>+</code> biểu thị phép cộng toán học khi hai toán hạng là số (<code>1 + 2 = 3</code>), nhưng lại biểu thị phép ghép nối khi hai toán hạng là chuỗi (<code>'a' + 'b' = 'ab'</code>) hoặc danh sách. Đa hình là đặc tính cốt lõi tạo nên sự linh hoạt và khả năng tái sử dụng mã nguồn tuyệt vời của Python.
              </div>
            </details>
          </div>

          <div style="padding:16px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;">
            <div style="font-weight:700;color:var(--accent-primary);margin-bottom:8px;">Câu hỏi 6: Khi nào nên sử dụng Lớp (Class)?</div>
            <p style="margin:0 0 10px 0;">Khi nào bạn nên sử dụng một lớp (class) thay vì chỉ sử dụng các kiểu đối tượng cốt lõi dựng sẵn của Python?</p>
            <details class="solution-details" style="padding:10px 14px;background:var(--bg-surface-alt);border-radius:6px;cursor:pointer;">
              <summary style="font-weight:600;color:var(--text-secondary);">Bấm xem đáp án gợi ý của tác giả</summary>
              <div style="margin-top:10px;font-size:0.9rem;line-height:1.6;color:var(--text-primary);">
                <strong>Đáp án của Mark Lutz:</strong><br>
                Bạn nên định nghĩa một lớp (class) khi cần mô hình hóa một thực thể nghiệp vụ thế giới thực phức tạp đòi hỏi phải đóng gói chặt chẽ cả <strong>dữ liệu trạng thái (thuộc tính)</strong> lẫn <strong>hành vi thao tác (phương thức)</strong> đi cùng với nhau trong cùng một đơn vị logic.<br>
                Ngoài ra, lớp là bắt buộc khi bạn muốn tận dụng các tính năng cao cấp của lập trình hướng đối tượng như <strong>kế thừa (inheritance)</strong> để tái sử dụng mã nguồn và <strong>nạp chồng toán tử (operator overloading)</strong> để tùy biến hành vi của các toán tử chuẩn trên đối tượng mới.
              </div>
            </details>
          </div>
        </div>
      `
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Học vẹt cú pháp mà quên bản chất phân loại',
        content: `
          <p>Sai lầm lớn nhất của người mới học là cố gắng ghi nhớ từng phương thức một cách máy móc. Hãy luôn phân loại đối tượng trước: đối tượng này là Dãy tuần tự hay Ánh xạ? Nó là Khả biến hay Bất biến? Một khi đã nắm được phân loại, bạn sẽ tự động biết nó hỗ trợ những thao tác nào mà không cần phải tra cứu tài liệu.</p>
        `
      }
    ],
    tips: [
      {
        title: 'Chúc mừng bạn đã hoàn thành Chương 4!',
        content: `
          <p>Chương 4 là cánh cổng mở ra toàn bộ thế giới Python. Từ Chương 5 trở đi, chúng ta sẽ lần lượt đào sâu vào từng ngóc ngách kỹ thuật tinh xảo của từng kiểu dữ liệu cốt lõi này với độ chi tiết cao nhất!</p>
        `
      }
    ],
    deepDive: {
      title: 'Triết lý thiết kế của Guido van Rossum',
      content: `
        <p>Tác giả ngôn ngữ Python — Guido van Rossum — từng chia sẻ: mục tiêu hàng đầu khi thiết kế bộ đối tượng cốt lõi dựng sẵn là mang lại <em>"sự ngạc nhiên tối thiểu" (Principle of Least Astonishment)</em>. Mọi thao tác từ cắt lát chuỗi, duyệt từ điển đến đóng tệp đều tuân theo những trực giác đời thường nhất của con người.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Phân loại nhanh 5 đối tượng bất kỳ',
      level: 'Dễ',
      description: 'Cho 5 biểu thức: <code>[1, 2]</code>, <code>"hello"</code>, <code>(True, False)</code>, <code>{"x": 1}</code>, <code>set([1, 2])</code>. Hãy viết một đoạn mã Python in ra tên kiểu và xác định xem đối tượng đó là Khả biến (Mutable) hay Bất biến (Immutable).',
      starterCode: `items = [[1, 2], "hello", (True, False), {"x": 1}, set([1, 2])]

# Duyệt và phân loại
`,
      solution: `items = [[1, 2], "hello", (True, False), {"x": 1}, set([1, 2])]

mutable_types = (list, dict, set, bytearray)

for obj in items:
    obj_type = type(obj).__name__
    mutability = "Khả biến (Mutable)" if isinstance(obj, mutable_types) else "Bất biến (Immutable)"
    print(f"Đối tượng: {repr(obj):<16} | Kiểu: {obj_type:<8} | {mutability}")`,
      solutionOutput: `Đối tượng: [1, 2]           | Kiểu: list     | Khả biến (Mutable)
Đối tượng: 'hello'          | Kiểu: str      | Bất biến (Immutable)
Đối tượng: (True, False)    | Kiểu: tuple    | Bất biến (Immutable)
Đối tượng: {'x': 1}         | Kiểu: dict     | Khả biến (Mutable)
Đối tượng: {1, 2}           | Kiểu: set      | Khả biến (Mutable)`,
      explanation: 'Sử dụng <code>isinstance</code> kết hợp tuple các kiểu khả biến để tự động phân loại chính xác các đối tượng cốt lõi.'
    },
    {
      title: 'Xây dựng hồ sơ phương tiện đa hình',
      level: 'Vừa',
      description: 'Viết một lớp <code>Vehicle</code> có thuộc tính <code>name</code> và <code>speed</code>, cùng phương thức <code>move(hours)</code> tính quãng đường đi được. Thử nghiệm tính đa hình khi <code>hours</code> có thể là số nguyên (int), số thực (float) hoặc phân số (Fraction).',
      starterCode: `from fractions import Fraction

class Vehicle:
    pass

# Tạo xe và thử nghiệm với các kiểu số khác nhau
`,
      solution: `from fractions import Fraction

class Vehicle:
    def __init__(self, name, speed):
        self.name = name
        self.speed = speed

    def move(self, hours):
        return self.speed * hours

car = Vehicle("VinFast", 60)
print("Đi 2 giờ (int):", car.move(2), "km")
print("Đi 1.5 giờ (float):", car.move(1.5), "km")
print("Đi 2/3 giờ (Fraction):", car.move(Fraction(2, 3)), "km")`,
      solutionOutput: `Đi 2 giờ (int): 120 km
Đi 1.5 giờ (float): 90.0 km
Đi 2/3 giờ (Fraction): 40 km`,
      explanation: 'Phương thức <code>move</code> tự động hoạt động đa hình mượt mà trên cả 3 kiểu số mà không cần sửa đổi mã nguồn.'
    }
  ],

  quiz: [
    {
      question: 'Nhóm kiểu dữ liệu cốt lõi nào sau đây ĐỀU thuộc danh mục Dãy tuần tự (Sequence)?',
      options: [
        'int, float, complex',
        'str, list, tuple',
        'dict, set, file',
        'bool, None, class'
      ],
      correctIndex: 1,
      explanation: 'str, list và tuple là ba kiểu dãy tuần tự cốt lõi chia sẻ chung các thao tác vị trí, cắt lát và ghép nối.'
    },
    {
      question: 'Đặc tính "Đa hình" (Polymorphism) trong Python được thể hiện rõ nét nhất qua hiện tượng nào sau đây?',
      options: [
        'Mọi tệp tin đều phải mở bằng lệnh open().',
        'Toán tử + thực hiện phép cộng trên số nhưng lại thực hiện ghép nối trên chuỗi và danh sách.',
        'Mọi biến trong Python đều phải khai báo kiểu trước khi dùng.',
        'Từ điển chỉ chấp nhận số nguyên làm khóa.'
      ],
      correctIndex: 1,
      explanation: 'Cùng một toán tử + nhưng hành vi tự động biến đổi linh hoạt tùy theo kiểu của đối tượng tham gia thao tác.'
    },
    {
      question: 'Khi nào bạn BẮT BUỘC phải dùng câu lệnh class thay vì các kiểu dựng sẵn như list hay dict?',
      options: [
        'Khi cần lưu trữ trên 1000 phần tử.',
        'Khi muốn đóng gói cả trạng thái dữ liệu và các hàm hành vi nghiệp vụ đi liền với nhau, hoặc cần áp dụng kế thừa OOP.',
        'Khi muốn chạy mã nguồn với tốc độ nhanh hơn C.',
        'Khi xử lý tệp văn bản Unicode.'
      ],
      correctIndex: 1,
      explanation: 'Lớp (class) là công cụ đóng gói trạng thái và hành vi tùy biến, đồng thời hỗ trợ kế thừa trong lập trình hướng đối tượng.'
    }
  ],

  summary: [
    'Chương 4 cung cấp cái nhìn toàn cảnh về bộ đối tượng cốt lõi dựng sẵn (Bảng 4-1) và các nguyên lý vận hành.',
    'Hai trục phân loại nền tảng: Dãy tuần tự vs Ánh xạ; Khả biến vs Bất biến.',
    '6 câu hỏi ôn tập kinh điển của Mark Lutz giúp củng cố bản chất: kiểu dữ liệu, tính bất biến, dãy tuần tự, ánh xạ, đa hình, và vai trò của lớp.',
    'Mọi khái niệm này tạo thành nền móng vững chắc để tiếp tục khám phá các chương chuyên sâu tiếp theo của Learning Python.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 36–38.'
  ]
};
