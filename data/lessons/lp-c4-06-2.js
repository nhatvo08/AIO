export default {
  id: 'lp-c4-06-2',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.6.2',
  title: 'Danh sách: Thao tác đặc thù kiểu dữ liệu',
  subtitle: 'append, pop, del, sort, reverse — sửa đổi trực tiếp tại chỗ (in-place) và quản lý kích thước động',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững bản chất khả biến (mutable) của danh sách thông qua các phương thức sửa đổi trực tiếp tại chỗ.',
    'Sử dụng thành thạo append() để mở rộng danh sách và pop(), del để thu nhỏ danh sách theo vị trí.',
    'Hiểu rõ phương thức sort() và reverse() thực hiện sắp xếp/đảo ngược trực tiếp trên danh sách gốc và trả về None.',
    'Tránh bẫy kinh điển của người mới học: gán kết quả của các phương thức in-place (L = L.sort()).'
  ],

  intuition: {
    title: 'Bảng từ nam châm thay đổi linh hoạt',
    metaphor: 'Nếu chuỗi ký tự là dòng chữ khắc lên bia đá (bất biến), thì danh sách giống như một chiếc bảng đính các mảnh thẻ nam châm. Bạn có thể đính thêm một thẻ mới vào cuối bảng bất kỳ lúc nào (append), nhấc một thẻ ra khỏi bảng để dùng vào việc khác (pop), hoặc hoán đổi vị trí các thẻ để xếp chúng theo thứ tự bảng chữ cái (sort). Toàn bộ chiếc bảng vẫn là chiếc bảng đó, chỉ có các thẻ bên trong được thay đổi trực tiếp tại chỗ.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">THAY ĐỔI TẠI CHỖ (IN-PLACE MODIFICATION)</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;">
          <div style="padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:6px;text-align:center;">
            <div style="color:var(--text-muted);font-size:0.75rem;">Ban đầu</div>
            <div style="color:var(--accent-primary);font-weight:700;">['bb', 'aa', 'cc']</div>
          </div>
          <div style="color:var(--accent-primary);font-size:1.2rem;">➔ .sort() ➔</div>
          <div style="padding:10px 14px;background:var(--bg-surface);border:2px solid var(--success);border-radius:6px;text-align:center;">
            <div style="color:var(--success);font-size:0.75rem;">Cùng ID bộ nhớ (In-place)</div>
            <div style="color:var(--success);font-weight:700;">['aa', 'bb', 'cc']</div>
          </div>
        </div>
        <div style="text-align:center;font-size:0.78rem;color:var(--text-secondary);">* Phương thức trả về None, đối tượng danh sách được sắp xếp trực tiếp trong bộ nhớ.</div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Thao tác Đặc thù của Danh sách (Type-Specific Operations)',
      content: `
        <p>Do danh sách trong Python là đối tượng <strong>khả biến (mutable)</strong>, chúng hỗ trợ các thao tác sửa đổi trực tiếp giá trị của đối tượng tại chỗ mà không cần phải tạo ra đối tượng mới.</p>
        <p>Các thao tác này là phương thức đặc thù riêng của kiểu <code>list</code>, được gọi thông qua cú pháp dấu chấm <code>danh_sách.phương_thức()</code>, tương tự như các phương thức đặc thù của chuỗi nhưng mang tính chất làm biến đổi đối tượng.</p>
      `,
      codeExamples: [
        {
          title: 'Thêm và bớt phần tử với append() và pop()',
          code: `>>> L = [123, 'spam', 1.23]
>>> L.append('NI')          # Thêm đối tượng vào cuối danh sách
>>> L
[123, 'spam', 1.23, 'NI']
>>> L.pop(2)                # Xóa và trả về phần tử tại vị trí chỉ mục 2
1.23
>>> L                       # Danh sách sau khi loại bỏ 1.23
[123, 'spam', 'NI']`,
          output: `[123, 'spam', 1.23, 'NI']
1.23
[123, 'spam', 'NI']`,
          annotations: [
            { line: 2, text: 'append() mở rộng kích thước danh sách, chèn phần tử mới vào vị trí cuối cùng.' },
            { line: 5, text: 'pop(2) loại bỏ phần tử ở chỉ mục 2 (1.23) và trả về giá trị đó.' },
            { line: 7, text: 'Danh sách L bị co lại còn 3 phần tử, các phần tử phía sau được dồn lại.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Lệnh del và Xóa Phần tử',
      content: `
        <p>Bên cạnh phương thức <code>pop()</code> (vừa xóa vừa trả về giá trị), Python cung cấp câu lệnh <code>del</code> tổng quát để xóa phần tử theo chỉ mục hoặc cắt lát mà không cần trả về giá trị.</p>
      `,
      codeExamples: [
        {
          title: 'Xóa phần tử bằng lệnh del',
          code: `>>> L = [123, 'spam', 'NI']
>>> del L[0]                # Xóa phần tử ở vị trí 0
>>> L
['spam', 'NI']`,
          output: `['spam', 'NI']`,
          annotations: [
            { line: 2, text: 'del là câu lệnh của Python, xóa trực tiếp vị trí phần tử trong danh sách.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Sắp xếp và Đảo ngược: sort() và reverse()',
      content: `
        <p>Hai phương thức rất phổ biến khác là <code>sort()</code> và <code>reverse()</code>:</p>
        <ul>
          <li><code>sort()</code>: Sắp xếp các phần tử trong danh sách theo thứ tự tăng dần mặc định (theo quy tắc so sánh tiêu chuẩn của Python).</li>
          <li><code>reverse()</code>: Đảo ngược thứ tự các phần tử của danh sách từ sau ra trước.</li>
        </ul>
        <p><strong>Điểm cốt lõi:</strong> Cả hai phương thức này đều sửa đổi danh sách <strong>tại chỗ (in-place)</strong> và trả về <code>None</code>. Chúng không sinh ra danh sách mới.</p>
      `,
      codeExamples: [
        {
          title: 'Sắp xếp và đảo ngược danh sách',
          code: `>>> M = ['bb', 'aa', 'cc']
>>> M.sort()
>>> M
['aa', 'bb', 'cc']
>>> M.reverse()
>>> M
['cc', 'bb', 'aa']`,
          output: `['aa', 'bb', 'cc']
['cc', 'bb', 'aa']`,
          annotations: [
            { line: 2, text: 'M.sort() sắp xếp các chuỗi theo bảng chữ cái. Không gán M = M.sort()!' },
            { line: 5, text: 'M.reverse() đảo ngược thứ tự các phần tử hiện có trong danh sách M.' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Bẫy kinh điển: Gán kết quả của sort() hoặc append()',
        content: `
          <p>Vì <code>sort()</code>, <code>append()</code>, <code>reverse()</code> sửa đổi danh sách tại chỗ và trả về <code>None</code>, người mới học rất hay viết:</p>
          <pre><code>L = L.sort()    # BẪY NGUY HIỂM: L sẽ bị gán thành None!</code></pre>
          <p>Sau câu lệnh trên, biến <code>L</code> mất hoàn toàn danh sách dữ liệu và trở thành <code>None</code>. Nếu bạn muốn nhận một danh sách mới được sắp xếp mà giữ nguyên danh sách cũ, hãy dùng hàm dựng sẵn <code>sorted(L)</code>.</p>
        `
      }
    ],
    tips: [
      {
        title: 'pop() mặc định xóa phần tử cuối',
        content: `
          <p>Nếu bạn gọi <code>L.pop()</code> mà không truyền tham số, nó mặc định lấy và xóa phần tử cuối cùng (tương đương <code>L.pop(-1)</code>). Thao tác này giúp danh sách hoạt động như một ngăn xếp LIFO (Last-In, First-Out) cực kỳ tiện lợi.</p>
        `
      }
    ],
    deepDive: {
      title: 'Bộ nhớ CPython: Over-allocation trong mảng con trỏ',
      content: `
        <p>Trong CPython, đối tượng <code>PyListObject</code> thực chất là một mảng liên tục chứa các con trỏ trỏ tới các đối tượng phần tử.</p>
        <p>Khi bạn gọi <code>append()</code>, nếu kích thước mảng đã đầy, CPython sẽ cấp phát thêm dung lượng bộ nhớ vượt mức cần thiết (over-allocation) theo một tỷ lệ nhất định. Nhờ chiến lược này, thao tác <code>append()</code> chỉ thỉnh thoảng mới phải cấp phát lại bộ nhớ, giúp thời gian chạy trung bình (amortized time) đạt hiệu năng <strong>O(1)</strong> tối ưu.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Mô phỏng hàng đợi FIFO với list',
      level: 'Dễ',
      description: 'Cho danh sách hàng đợi khách hàng <code>queue = ["An", "Bình", "Cường"]</code>. Hãy dùng phương thức thích hợp để thêm khách hàng "Dũng" vào cuối hàng, sau đó phục vụ (lấy ra) khách hàng đầu tiên trong hàng đợi.',
      starterCode: `queue = ["An", "Bình", "Cường"]
# 1. Thêm "Dũng" vào cuối hàng
# 2. Lấy người đầu tiên ra phục vụ và in tên người đó
# 3. In hàng đợi còn lại`,
      solution: `queue = ["An", "Bình", "Cường"]
queue.append("Dũng")
served = queue.pop(0)
print("Đang phục vụ:", served)
print("Hàng đợi còn lại:", queue)`,
      solutionOutput: `Đang phục vụ: An
Hàng đợi còn lại: ['Bình', 'Cường', 'Dũng']`,
      explanation: '<code>append()</code> thêm vào cuối hàng, <code>pop(0)</code> lấy phần tử đầu tiên ra khỏi danh sách theo nguyên tắc FIFO (First-In, First-Out).'
    },
    {
      title: 'Phục hồi danh sách bị mất do gán sort()',
      level: 'Vừa',
      description: 'Một lập trình viên viết <code>nums = [4, 1, 7, 3]; nums = nums.sort()</code> khiến <code>nums</code> thành <code>None</code>. Hãy viết lại mã nguồn theo 2 cách đúng: Cách 1 sắp xếp tại chỗ giữ nguyên biến; Cách 2 tạo danh sách mới được sắp xếp.',
      starterCode: `# Cách 1: Sắp xếp tại chỗ (in-place)
nums1 = [4, 1, 7, 3]

# Cách 2: Tạo danh sách mới với hàm sorted()
nums2 = [4, 1, 7, 3]
`,
      solution: `# Cách 1: Sắp xếp tại chỗ
nums1 = [4, 1, 7, 3]
nums1.sort()
print("Cách 1:", nums1)

# Cách 2: Tạo danh sách mới
nums2 = [4, 1, 7, 3]
sorted_nums = sorted(nums2)
print("Cách 2 - mới:", sorted_nums)
print("Cách 2 - gốc:", nums2)`,
      solutionOutput: `Cách 1: [1, 3, 4, 7]
Cách 2 - mới: [1, 3, 4, 7]
Cách 2 - gốc: [4, 1, 7, 3]`,
      explanation: '<code>nums1.sort()</code> làm biến đổi chính <code>nums1</code> và trả về <code>None</code>. Trong khi đó, hàm <code>sorted(nums2)</code> trả về một danh sách mới và giữ nguyên <code>nums2</code>.'
    }
  ],

  quiz: [
    {
      question: 'Điều gì xảy ra khi bạn thực thi dòng lệnh: x = [3, 1, 2]; x = x.sort()?',
      options: [
        'x trở thành [1, 2, 3]',
        'x trở thành None',
        'Gây ra lỗi cú pháp SyntaxError',
        'x không thay đổi, vẫn là [3, 1, 2]'
      ],
      correctIndex: 1,
      explanation: 'Phương thức sort() sắp xếp tại chỗ và trả về None. Việc gán x = x.sort() khiến biến x nhận giá trị None.'
    },
    {
      question: 'Phương thức nào sau đây vừa loại bỏ phần tử ra khỏi danh sách vừa trả về giá trị của phần tử đó?',
      options: [
        'L.remove(i)',
        'del L[i]',
        'L.pop(i)',
        'L.delete(i)'
      ],
      correctIndex: 2,
      explanation: 'L.pop(i) xóa phần tử tại chỉ mục i và trả về chính giá trị của phần tử đó.'
    },
    {
      question: 'Phát biểu nào sau đây là ĐÚNG về phương thức reverse() trên danh sách?',
      options: [
        'Nó trả về một danh sách mới được đảo ngược thứ tự.',
        'Nó đảo ngược thứ tự các phần tử trực tiếp trên danh sách gốc và trả về None.',
        'Nó chỉ dùng được với danh sách chứa chuỗi ký tự.',
        'Nó tương đương với cú pháp L = L[::-1].'
      ],
      correctIndex: 1,
      explanation: 'reverse() là phương thức thay đổi tại chỗ (in-place), không sinh đối tượng mới và trả về None.'
    }
  ],

  summary: [
    'Danh sách hỗ trợ các phương thức đặc thù làm thay đổi đối tượng tại chỗ (in-place).',
    'append(x) thêm phần tử vào cuối danh sách; pop([i]) xóa và trả về phần tử theo vị trí (mặc định là phần tử cuối).',
    'Lệnh del xóa phần tử hoặc lát cắt mà không cần trả về giá trị.',
    'sort() và reverse() sửa đổi trực tiếp danh sách và luôn trả về None. Tuyệt đối không gán L = L.sort().',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 17.'
  ]
};
