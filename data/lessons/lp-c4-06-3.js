export default {
  id: 'lp-c4-06-3',
  partId: 'part-lp-c4',
  chapter: 'Chương 4: Giới thiệu các đối tượng Python',
  number: 'C4.6.3',
  title: 'Danh sách: Kiểm tra giới hạn biên (Bounds Checking)',
  subtitle: 'IndexError khi truy cập hoặc gán ngoài phạm vi và cơ chế an toàn của phép cắt lát',
  level: 'Cơ bản',
  duration: '20 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu nguyên tắc kiểm tra giới hạn biên nghiêm ngặt (bounds checking) của Python trên các dãy tuần tự.',
    'Nhận biết lỗi IndexError khi đọc chỉ mục không tồn tại hoặc gán vào chỉ mục vượt biên.',
    'Phân biệt rõ: danh sách không thể mở rộng bằng phép gán chỉ mục L[i] = x mà phải dùng append() hoặc insert().',
    'Nắm vững hành vi kẹp biên bao dung của phép cắt lát slicing khi chỉ số vượt ngoài phạm vi danh sách.'
  ],

  intuition: {
    title: 'Hàng rào an toàn chống tràn mảng',
    metaphor: 'Trong ngôn ngữ lập trình cấp thấp như C, nếu bạn cố gắng đọc hoặc ghi vào ô nhớ thứ 100 của một mảng chỉ có 3 ô, chương trình có thể âm thầm làm hỏng dữ liệu của biến khác hoặc gây sập hệ thống (segmentation fault). Python thiết lập một "người gác cổng" nghiêm ngặt: hễ bạn đưa tay qua hàng rào vượt quá số phần tử hiện có, người gác cổng sẽ lập tức thổi còi báo động IndexError. Bạn không bao giờ có thể vô tình làm hỏng bộ nhớ trong Python.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;font-family:var(--font-mono);font-size:0.86rem;">
        <div style="text-align:center;font-weight:700;color:var(--accent-primary);">KIỂM TRA GIỚI HẠN BIÊN: L = ['spam', 'NI'] (len = 2)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--danger);border-radius:8px;">
            <div style="font-weight:700;color:var(--danger);margin-bottom:6px;">❌ TRUY CẬP / GÁN CHỈ MỤC</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">L[99] hoặc L[99] = 1</div>
            <div style="font-weight:700;color:var(--danger);margin-top:6px;">IndexError!</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">(Chặn đứng lỗi bộ nhớ)</div>
          </div>
          <div style="padding:12px;background:var(--bg-surface);border:2px solid var(--success);border-radius:8px;">
            <div style="font-weight:700;color:var(--success);margin-bottom:6px;">✅ CẮT LÁT (SLICING)</div>
            <div style="font-size:0.8rem;color:var(--text-secondary);">L[1:100]</div>
            <div style="font-weight:700;color:var(--success);margin-top:6px;">['NI']</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">(Tự động kẹp trong biên)</div>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: '1. Không cho phép tham chiếu ngoài biên: IndexError',
      content: `
        <p>Mặc dù danh sách trong Python không cố định kích thước và có thể co giãn tùy ý, Python <strong>không cho phép</strong> bạn tham chiếu đến những phần tử không tồn tại.</p>
        <p>Bất kỳ nỗ lực nào nhằm đọc chỉ mục nằm ngoài phạm vi danh sách đều sẽ bị chặn lại ngay lập tức bằng một ngoại lệ <code>IndexError</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Đọc chỉ mục vượt biên gây lỗi IndexError',
          code: `>>> L = [123, 'spam', 'NI']
>>> L[99]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range`,
          output: `IndexError: list index out of range`,
          annotations: [
            { line: 2, text: 'Danh sách L chỉ có 3 phần tử (chỉ mục 0, 1, 2). Chỉ mục 99 không tồn tại.' },
            { line: 5, text: 'Python ném ra lỗi IndexError để bảo vệ an toàn bộ nhớ.' }
          ]
        }
      ]
    },
    {
      id: 'sec-2',
      title: '2. Không thể gán ngoài biên để mở rộng danh sách',
      content: `
        <p>Trong một số ngôn ngữ, việc gán giá trị vào một chỉ mục xa (ví dụ ô 99) sẽ tự động làm mảng phình to ra và chèn các giá trị rỗng vào giữa. <strong>Python không hoạt động như vậy!</strong></p>
        <p>Trong Python, bạn không thể gán vào một chỉ mục không tồn tại. Thao tác này cũng sẽ làm phát sinh ngoại lệ <code>IndexError</code>.</p>
        <p>Để thêm phần tử vào danh sách, bạn bắt buộc phải gọi các phương thức có chủ đích như <code>append()</code> hoặc <code>insert()</code>.</p>
      `,
      codeExamples: [
        {
          title: 'Gán ngoài biên bị từ chối',
          code: `>>> L = [123, 'spam', 'NI']
>>> L[99] = 1
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list assignment index out of range`,
          output: `IndexError: list assignment index out of range`,
          annotations: [
            { line: 2, text: 'Không thể gán vào chỉ mục chưa tồn tại để mở rộng danh sách.' },
            { line: 5, text: 'Thông báo lỗi chỉ rõ: list assignment index out of range.' }
          ]
        }
      ]
    },
    {
      id: 'sec-3',
      title: '3. Phép cắt lát (Slicing) xử lý biên bao dung',
      content: `
        <p>Trái ngược với việc truy cập đơn chỉ mục <code>L[i]</code>, phép cắt lát <code>L[i:j]</code> thể hiện cơ chế xử lý biên cực kỳ linh hoạt và bao dung:</p>
        <ul>
          <li>Nếu chỉ số cận trên vượt quá chiều dài danh sách, Python sẽ tự động kẹp chỉ số về đúng cuối danh sách (tương đương <code>len(L)</code>).</li>
          <li>Nếu chỉ số cận dưới nhỏ hơn 0 hoặc vượt quá phạm vi, Python cũng sẽ điều chỉnh thích ứng mà không bao giờ ném ra lỗi <code>IndexError</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Cắt lát vượt biên không gây lỗi',
          code: `>>> L = [123, 'spam', 'NI']
>>> L[1:100]
['spam', 'NI']
>>> L[50:100]
[]`,
          output: `['spam', 'NI']
[]`,
          annotations: [
            { line: 2, text: 'Cắt lát từ chỉ mục 1 đến 100: Python tự kẹp biên đến hết danh sách, trả về 2 phần tử.' },
            { line: 4, text: 'Khi cả khoảng cắt nằm hoàn toàn ngoài phạm vi, Python trả về danh sách rỗng [].' }
          ]
        }
      ]
    }
  ],

  callouts: {
    pitfalls: [
      {
        title: 'Khác biệt căn bản giữa Danh sách (List) và Từ điển (Dict)',
        content: `
          <p>Hãy ghi nhớ sự tương phản này:</p>
          <ul>
            <li><code>L[99] = 'val'</code> ➔ <strong>LỖI IndexError</strong> (danh sách không cho gán tạo chỉ mục mới).</li>
            <li><code>D['key'] = 'val'</code> ➔ <strong>HỢP LỆ</strong> (từ điển tự động tạo thêm khóa mới nếu chưa có).</li>
          </ul>
        `
      }
    ],
    tips: [
      {
        title: 'Làm sao để mở rộng danh sách an toàn?',
        content: `
          <p>Nếu bạn muốn gán giá trị vào một vị trí cụ thể trong danh sách đã có phần tử, hãy kiểm tra <code>len(L)</code> trước. Nếu muốn khởi tạo sẵn danh sách có 100 phần tử rỗng để gán theo chỉ mục, hãy dùng: <code>L = [None] * 100</code>, sau đó bạn có thể tự do gán <code>L[99] = 1</code>.</p>
        `
      }
    ],
    deepDive: {
      title: 'Bảo mật bộ nhớ: Tại sao Python luôn kiểm tra biên?',
      content: `
        <p>Trong ngôn ngữ C/C++, lỗi "tràn bộ đệm" (buffer overflow) xảy ra khi chương trình đọc/ghi ngoài phạm vi mảng được cấp phát. Đây là nguyên nhân hàng đầu của các lỗ hổng an ninh mạng và lỗi khai thác mã từ xa.</p>
        <p>Python loại bỏ hoàn toàn nguy cơ này bằng cơ chế <strong>Bounds Checking</strong> ở mức máy ảo: trước mọi thao tác truy cập chỉ mục, hàm <code>PyList_GetItem</code> và <code>PyList_SetItem</code> luôn so sánh chỉ số với <code>Py_SIZE(op)</code>. Sự an toàn này là một trong những ưu điểm lớn nhất của các ngôn ngữ cấp cao.</p>
      `
    }
  },

  exercises: [
    {
      title: 'Tránh lỗi IndexError bằng kiểm tra độ dài',
      level: 'Dễ',
      description: 'Cho danh sách <code>items = ["A", "B"]</code> và một chỉ mục <code>target_idx = 5</code>. Hãy viết đoạn code kiểm tra: nếu chỉ mục hợp lệ thì in phần tử đó ra, ngược lại in thông báo "Chỉ mục vượt quá giới hạn" thay vì để chương trình gặp lỗi.',
      starterCode: `items = ["A", "B"]
target_idx = 5

# Viết mã kiểm tra an toàn tại đây`,
      solution: `items = ["A", "B"]
target_idx = 5

if 0 <= target_idx < len(items):
    print("Phần tử:", items[target_idx])
else:
    print("Chỉ mục vượt quá giới hạn")`,
      solutionOutput: `Chỉ mục vượt quá giới hạn`,
      explanation: 'Điều kiện <code>0 <= target_idx < len(items)</code> đảm bảo chỉ mục nằm chính xác trong khoảng chỉ số hợp lệ của danh sách.'
    },
    {
      title: 'So sánh kết quả chỉ mục vs cắt lát',
      level: 'Vừa',
      description: 'Cho danh sách <code>data = [10, 20, 30]</code>. Hãy viết hàm <code>safe_get(lst, idx)</code> sử dụng kỹ thuật cắt lát (slicing) để lấy phần tử tại <code>idx</code>. Nếu <code>idx</code> vượt quá giới hạn thì trả về <code>None</code> mà không cần dùng khối <code>try/except</code>.',
      starterCode: `def safe_get(lst, idx):
    # Dùng cắt lát lst[idx:idx+1]
    pass

data = [10, 20, 30]
print(safe_get(data, 1))
print(safe_get(data, 10))`,
      solution: `def safe_get(lst, idx):
    slice_res = lst[idx:idx+1]
    return slice_res[0] if slice_res else None

data = [10, 20, 30]
print(safe_get(data, 1))
print(safe_get(data, 10))`,
      solutionOutput: `20
None`,
      explanation: '<code>lst[idx:idx+1]</code> trả về danh sách 1 phần tử nếu hợp lệ hoặc danh sách rỗng <code>[]</code> nếu vượt biên, không bao giờ gây lỗi IndexError.'
    }
  ],

  quiz: [
    {
      question: 'Điều gì xảy ra khi bạn thực thi đoạn mã: L = [1, 2, 3]; L[5] = 99?',
      options: [
        'Danh sách L tự động mở rộng và chèn các giá trị None vào giữa: [1, 2, 3, None, None, 99]',
        'Phát sinh ngoại lệ IndexError: list assignment index out of range',
        'Phát sinh lỗi KeyError',
        'Số 99 được thêm vào cuối danh sách: [1, 2, 3, 99]'
      ],
      correctIndex: 1,
      explanation: 'Python nghiêm cấm việc gán vào chỉ mục không tồn tại để mở rộng danh sách. Lỗi ném ra là IndexError.'
    },
    {
      question: 'Cho L = ["a", "b"]. Biểu thức L[0:10] sẽ trả về kết quả gì?',
      options: [
        'Lỗi IndexError: slice index out of range',
        '["a", "b"]',
        '["a", "b", None, None, None, ...]',
        'None'
      ],
      correctIndex: 1,
      explanation: 'Phép cắt lát slicing có cơ chế kẹp biên an toàn, nó tự động lấy đến hết danh sách mà không gây lỗi.'
    },
    {
      question: 'Phương thức chuẩn để bổ sung một phần tử mới vào cuối danh sách là gì?',
      options: [
        'L[len(L)] = new_item',
        'L.push(new_item)',
        'L.append(new_item)',
        'L.add(new_item)'
      ],
      correctIndex: 2,
      explanation: 'Phương thức chuẩn trong Python là append(new_item).'
    }
  ],

  summary: [
    'Python kiểm tra giới hạn biên (bounds checking) nghiêm ngặt trên mọi thao tác truy cập chỉ mục.',
    'Truy cập chỉ mục ngoài phạm vi (L[99]) gây lỗi IndexError: list index out of range.',
    'Gán vào chỉ mục không tồn tại (L[99] = 1) cũng gây lỗi IndexError; không thể mở rộng danh sách bằng phép gán chỉ mục.',
    'Phép cắt lát (slicing) xử lý biên linh hoạt, tự động kẹp trong giới hạn hợp lệ và không gây lỗi.',
    'Nguồn trích dẫn: Mark Lutz — Learning Python, Chương 4: Giới thiệu các đối tượng Python, trang 17–18.'
  ]
};
