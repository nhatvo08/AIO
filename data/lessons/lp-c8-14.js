export default {
  id: 'lp-c8-14',
  partId: 'part-lp-c8',
  chapter: 'Chương 8: List và Dictionary',
  number: 'C8.14',
  title: 'Thay đổi Dictionary tại chỗ: Gán khóa mới vs sửa khóa cũ, del & Lồng nhau đa tầng',
  subtitle: 'Làm chủ tính khả biến của Dictionary: cơ chế tự động mở rộng khi gán khóa mới, câu lệnh del tiêu hủy mục và kỹ thuật sửa đổi cấu trúc lồng nhau',
  level: 'Cơ bản',
  duration: '25 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Thành thạo cơ chế thay đổi tại chỗ của Dictionary: gán khóa đã có để cập nhật giá trị liên kết.',
    'Hiểu điểm khác biệt cốt tử với List: phép gán khóa mới trong Dictionary sẽ tự động mở rộng kích thước (trong khi List báo lỗi `IndexError`).',
    'Sử dụng câu lệnh `del D[key]` để xóa bỏ một mục khóa/giá trị tại chỗ.',
    'Thao tác và chỉnh sửa các cấu trúc dữ liệu phức hợp lồng nhau đa tầng (Dictionary chứa List, List chứa Dictionary).'
  ],

  intuition: {
    title: 'Gắn thêm móc treo đồ và Thay đổi món đồ trên móc',
    metaphor: 'Hãy tưởng tượng bức tường phòng khách nhà bạn là một chiếc Dictionary. Trên tường có gắn sẵn một số chiếc móc treo có dán nhãn: nhãn "áo khoác", nhãn "chìa khóa". Khi bạn viết D["áo khoác"] = "áo gió", bạn chỉ việc gỡ chiếc áo cũ xuống và treo chiếc áo gió mới lên móc đó (sửa giá trị khóa cũ). Nhưng nếu bạn mang về một món đồ mới chưa có móc, chẳng hạn chiếc "mũ bảo hiểm", bạn chỉ việc đóng thêm một chiếc đinh mới lên tường, dán nhãn "mũ bảo hiểm" và treo nó lên: D["mũ"] = "mũ bảo hiểm" (tự động thêm mục mới)! Bức tường không bao giờ từ chối hay kêu la "vượt quá giới hạn" như chiếc kệ đóng kín (List). Còn khi bạn không dùng món đồ nào nữa, câu lệnh del D["chìa khóa"] sẽ nhổ hẳn chiếc đinh đó ra khỏi tường!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:14px;padding:18px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.88rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">CƠ CHẾ PHÉP GÁN CHỈ MỤC: DICTIONARY VS LIST</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;">
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--success);border-radius:6px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">DICTIONARY: D['new_key'] = val</div>
            <div style="font-size:0.8rem;line-height:1.6;">
              • Khóa <strong>đã có</strong>: Ghi đè cập nhật giá trị mới.<br>
              • Khóa <strong>chưa có</strong>: <strong>Tự động thêm mục mới</strong> vào cuối bảng băm. Luôn thành công!
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:1px solid var(--danger);border-radius:6px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">LIST: L[new_offset] = val</div>
            <div style="font-size:0.8rem;line-height:1.6;">
              • Chỉ mục <strong>trong biên</strong>: Thay thế con trỏ tại vị trí đó.<br>
              • Chỉ mục <strong>ngoài biên</strong>: Báo lỗi <code>IndexError</code>! Không tự mở rộng, phải dùng <code>append()</code>.
            </div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Gán Khóa Mới vs Sửa Khóa Cũ trong Dictionary',
      content: `
        <div class="callout-box callout-note" style="border-left:4px solid var(--accent-primary);margin-bottom:20px;">
          <div class="callout-header">
            <span>📖</span>
            <span><strong>Nguồn đối chiếu:</strong> <em>Learning Python (6th Edition)</em> — Mark Lutz</span>
          </div>
          <div class="callout-body">
            <p>Phần II: Các kiểu dữ liệu và thao tác • Chương 8: List và Dictionary • <strong>PDF Trang 20 / 42 – Trang 21 / 42</strong>.</p>
          </div>
        </div>

        <p>Dictionary, giống như list, mang tính <strong>khả biến (mutable)</strong>, do đó bạn có thể thay đổi, mở rộng và thu hẹp chúng tại chỗ mà không cần tạo dictionary mới:</p>

        <ul>
          <li><strong>Sửa khóa đã tồn tại:</strong> Việc gán cho một khóa đã có sẵn sẽ trực tiếp thay đổi giá trị liên kết của nó (ghi đè giá trị cũ).</li>
          <li><strong>Thêm khóa hoàn toàn mới:</strong> Bất cứ khi nào bạn gán cho một khóa dictionary mới (khóa chưa từng có sẵn), bạn sẽ <strong>tạo ra một mục hoàn toàn mới</strong> trong dictionary.</li>
        </ul>

        <div class="callout-box callout-pitfall">
          <div class="callout-header"><span>⚠️ Điểm khác biệt sống còn với List:</span> <span>Khả năng tự động mở rộng</span></div>
          <div class="callout-body">
            <p>Cách gán này <strong>hoàn toàn không áp dụng được cho list</strong>! Bạn chỉ có thể gán cho các vị trí bù hiện có của list. Python coi một vị trí bù vượt quá giới hạn cuối của list là vượt biên (<em>out of bounds</em>) và sẽ phát sinh lỗi <code>IndexError: list assignment index out of range</code>. Để mở rộng một list, bạn bắt buộc phải dùng <code>append()</code> hoặc phép gán lát cắt.</p>
          </div>
        </div>
      `,
      codeExamples: [
        {
          title: 'Sửa mục cũ, thêm mục mới và so sánh với lỗi IndexError của List',
          code: `D = {'hack': 1, 'Py': 2, 'code': 3}

# Sửa mục đã có tại chỗ: thay thế giá trị khóa 'Py'
D['Py'] = ['app', 'dev']
print("Sau khi sửa khóa 'Py':   ", D)

# Thêm một mục hoàn toàn mới: khóa 'years' chưa hề có
D['years'] = 32
print("Sau khi thêm khóa 'years':", D)

# So sánh với List: cố tình gán ngoài biên sẽ thất bại
L = [1, 2, 3]
try:
    L[99] = 100
except IndexError as err:
    print("List gán ngoài biên báo lỗi:", err)`,
          output: `Sau khi sửa khóa 'Py':    {'hack': 1, 'Py': ['app', 'dev'], 'code': 3}
Sau khi thêm khóa 'years': {'hack': 1, 'Py': ['app', 'dev'], 'code': 3, 'years': 32}
List gán ngoài biên báo lỗi: list assignment index out of range`,
          annotations: [
            { line: 4, text: 'Khóa \'Py\' đã tồn tại: giá trị số 2 bị thay bằng list [\'app\', \'dev\'].' },
            { line: 8, text: 'Khóa \'years\' chưa có: dict tự động tăng thêm 1 mục ở cuối.' },
            { line: 15, text: 'L[99] trên list gây IndexError vì list không tự mở rộng qua gán chỉ mục.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Xóa Mục với Câu lệnh del và Sửa đổi Cấu trúc Lồng nhau',
      content: `
        <p>Để xóa một mục khỏi dictionary, bạn sử dụng <strong>câu lệnh <code>del</code></strong> với cú pháp <code>del D[key]</code>. Thao tác này tiêu hủy liên kết khóa/giá trị tại chỗ và giải phóng bộ nhớ tương ứng.</p>

        <p><strong>Khả năng lồng nhau đa tầng và chỉnh sửa độc lập:</strong><br>
        Tất cả các kiểu dữ liệu tập hợp trong Python đều có thể lồng vào nhau một cách tùy ý (ví dụ: một sublist nằm làm giá trị bên trong một dictionary). Khi lồng nhau, đối tượng con vẫn duy trì tính chất khả biến độc lập của nó:</p>

        <p>Bạn có thể xâu chuỗi chỉ mục để sửa đổi trực tiếp đối tượng con bên trong mà không ảnh hưởng tới các thành phần khác của dictionary bao bọc bên ngoài.</p>
      `,
      codeExamples: [
        {
          title: 'Xóa mục bằng del và sửa đổi List lồng bên trong Dictionary',
          code: `D = {'hack': 1, 'Py': ['app', 'dev'], 'years': 32}

# Xóa mục liên kết với khóa 'hack'
del D['hack']
print("Sau del D['hack']:", D)

# Thay đổi list lồng nhau tại chỗ qua chuỗi chỉ mục D['Py'][0]
D['Py'][0] = 'program'
print("Sau khi sửa đổi list con:", D)

# Thêm một phần tử vào list con bằng append()
D['Py'].append('prod')
print("Sau khi append vào list con:", D)`,
          output: `Sau del D['hack']: {'Py': ['app', 'dev'], 'years': 32}
Sau khi sửa đổi list con: {'Py': ['program', 'dev'], 'years': 32}
Sau khi append vào list con: {'Py': ['program', 'dev', 'prod'], 'years': 32}`,
          annotations: [
            { line: 4, text: 'del D[\'hack\'] xóa hoàn toàn khóa \'hack\' và giá trị 1.' },
            { line: 8, text: 'D[\'Py\'][0] truy xuất phần tử đầu của sublist và đổi thành \'program\'.' },
            { line: 12, text: 'Gọi phương thức .append() trực tiếp trên list con D[\'Py\'].' }
          ]
        }
      ]
    }
  ],

  callouts: {
    tips: [
      {
        title: 'Xóa mục an toàn: del vs pop()',
        content: 'Câu lệnh <code>del D[key]</code> sẽ phát sinh lỗi <code>KeyError</code> nếu khóa không tồn tại. Nếu bạn muốn xóa một khóa mà không chắc chắn nó có tồn tại hay không, phương thức <code>D.pop(key, None)</code> (sắp học ở bài C8.15) sẽ an toàn hơn vì không phát sinh ngoại lệ.'
      }
    ],
    pitfalls: [
      {
        title: 'Cẩn thận khi xóa khóa trong lúc đang duyệt vòng lặp trên chính Dict đó!',
        content: 'Nếu bạn gọi <code>del D[key]</code> bên trong một vòng lặp <code>for key in D:</code>, Python sẽ lập tức quẳng ra lỗi <code>RuntimeError: dictionary changed size during iteration</code>. Để xóa an toàn, hãy lặp qua danh sách khóa độc lập: <code>for key in list(D.keys()):</code>.'
      }
    ]
  },

  exercises: [
    {
      title: 'Quản lý giỏ hàng trực tuyến bằng Dictionary lồng nhau',
      level: 'Vừa',
      problem: 'Cho giỏ hàng cart = {"sp01": {"name": "Chuột không dây", "qty": 1, "price": 250}}. Hãy viết mã: (1) Tăng số lượng (qty) của sản phẩm "sp01" lên thành 2. (2) Thêm một sản phẩm mới "sp02" với name: "Bàn phím cơ", qty: 1, price: 800. (3) Sau đó xóa sản phẩm "sp01" khỏi giỏ hàng.',
      hint: 'Truy cập lồng nhau cart["sp01"]["qty"] = 2. Thêm mới cart["sp02"] = {...}. Xóa del cart["sp01"].',
      solutionCode: `cart = {
    "sp01": {"name": "Chuột không dây", "qty": 1, "price": 250}
}

# 1. Tăng số lượng sp01
cart["sp01"]["qty"] = 2

# 2. Thêm sản phẩm mới sp02
cart["sp02"] = {"name": "Bàn phím cơ", "qty": 1, "price": 800}

print("Giỏ hàng sau khi thêm mới:")
print(cart)

# 3. Xóa sản phẩm sp01
del cart["sp01"]
print("\nGiỏ hàng sau khi xóa sp01:")
print(cart)`,
      solutionOutput: `Giỏ hàng sau khi thêm mới:
{'sp01': {'name': 'Chuột không dây', 'qty': 2, 'price': 250}, 'sp02': {'name': 'Bàn phím cơ', 'qty': 1, 'price': 800}}

Giỏ hàng sau khi xóa sp01:
{'sp02': {'name': 'Bàn phím cơ', 'qty': 1, 'price': 800}}`,
      explanation: 'Minh họa trọn vẹn vòng đời chỉnh sửa Dictionary: sửa đổi giá trị lồng nhau, tự động mở rộng khi gán khóa mới và tiêu hủy mục với del.'
    }
  ],

  quiz: [
    {
      question: 'Khi bạn chạy lệnh D["new_item"] = 50 trên một dictionary D chưa có khóa "new_item", kết quả là gì?',
      options: [
        'Python báo lỗi KeyError.',
        'Python báo lỗi IndexError.',
        'Dictionary tự động mở rộng và lưu cặp "new_item": 50 vào danh sách các mục của nó.',
        'Giá trị 50 bị bỏ qua.'
      ],
      correctIndex: 2,
      explanation: 'Khác với List báo IndexError, Dictionary sẽ tự động mở rộng và tạo thêm mục mới khi gán cho một khóa chưa có sẵn.'
    },
    {
      question: 'Lệnh nào sau đây xóa bỏ hoàn toàn mục có khóa "age" ra khỏi dictionary D?',
      options: [
        'D["age"] = None',
        'D["age"] = []',
        'del D["age"]',
        'D.remove("age")'
      ],
      correctIndex: 2,
      explanation: 'Câu lệnh del D["age"] trực tiếp xóa khóa "age" và giá trị liên kết khỏi bảng băm. Phép gán D["age"] = None vẫn giữ lại khóa "age" trong từ điển.'
    }
  ],

  summary: [
    'Dictionary là đối tượng khả biến (mutable), hỗ trợ thêm, sửa, xóa tại chỗ không cần cấp phát lại đối tượng mới.',
    'Gán cho một khóa hiện có sẽ cập nhật giá trị liên kết của khóa đó.',
    'Gán cho một khóa chưa từng xuất hiện sẽ tự động tạo một mục mới trong Dictionary.',
    'Câu lệnh del D[key] xóa mục tương ứng theo khóa chỉ định.',
    'Các kiểu dữ liệu tập hợp lồng nhau bên trong Dictionary có thể được sửa đổi độc lập thông qua chuỗi các chỉ mục.'
  ],

  nextSteps: 'Trong bài tiếp theo (C8.15), chúng ta sẽ khám phá bộ phương thức cốt lõi của Dictionary: values(), items(), get(), update() và pop().'
};