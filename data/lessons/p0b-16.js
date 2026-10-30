export default {
  id: 'p0b-16',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B3.1',
  title: 'Control Flow Graph (CFG) và Khối cơ bản (Basic Block)',
  subtitle: 'Cánh cửa bước vào thế giới trình biên dịch: Khái niệm Basic Block, cấu trúc đồ thị CFG và cách Python 3.14 dịch code ra Bytecode',
  level: 'Chuyên sâu',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Nắm vững định nghĩa hình thức của Khối cơ bản (Basic Block): Một cửa vào (Single Entry), một cửa ra (Single Exit).',
    'Hiểu cách thức Trình biên dịch (Compiler) chuyển hóa mã nguồn thành Đồ thị luồng điều khiển (Control Flow Graph - CFG).',
    'Phân biệt rõ ràng giữa Flowchart (dành cho con người suy nghĩ) và CFG (dành cho máy móc tối ưu hóa).',
    'Sử dụng module `dis` trong Python 3.14 để quan sát trực tiếp các khối Basic Block và bước nhảy opcode.'
  ],

  intuition: {
    title: 'Từ bức tranh hoạt hình đến bản đồ ray tàu điện cao tốc',
    metaphor: 'Nếu Flowchart giống như cuốn truyện tranh sinh động mô tả từng hành động của nhân vật để con người dễ theo dõi, thì Đồ thị luồng điều khiển (Control Flow Graph - CFG) giống như bản đồ hệ thống đường sắt đô thị. Mỗi nhà ga (Basic Block) là một đoạn đường ray thẳng tuột: đoàn tàu đi vào ở đầu ga và ra ở cuối ga, không bao giờ có chuyện tàu nhảy ngang ra giữa ga. Các ngã rẽ và ghi chuyển ray chính là các cạnh (Edges) của đồ thị. Trình biên dịch CPython không đọc hiểu code Python như bạn nghĩ, mà nó chuyển code thành đồ thị CFG này để tối ưu hóa tốc độ và cắt bỏ các đoạn ray thừa!',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">CẤU TRÚC KHỐI CƠ BẢN (BASIC BLOCK) VÀ ĐỒ THỊ CFG</div>
        <div style="display:flex;justify-content:space-around;align-items:center;flex-wrap:wrap;gap:12px;">
          <div style="padding:10px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);text-align:center;max-width:220px;">
            <strong style="color:var(--accent-primary);">Block A (BB0)</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">x = 10; y = 20<br/>if x &gt; y: goto BB1</span>
          </div>
          <div style="font-size:1.5rem;color:var(--accent-primary);">⤹ ⤸</div>
          <div style="padding:10px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);text-align:center;max-width:180px;">
            <strong style="color:var(--py-gold);">Block B (BB1)</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">z = x + y</span>
          </div>
          <div style="padding:10px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);text-align:center;max-width:180px;">
            <strong style="color:var(--py-gold);">Block C (BB2)</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">z = x - y</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Định nghĩa Khối cơ bản (Basic Block)',
      badge: 'Khoa học máy tính',
      content: `
        <details class="deep-dive-details" open style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:16px;">
          <summary style="cursor:pointer;font-weight:bold;color:var(--accent-primary);">Thu gọn / Mở rộng kiến thức Chuyên sâu Tầng 3</summary>
          <div style="margin-top:12px;">
            <p>Trong lý thuyết trình biên dịch, một <strong>Khối cơ bản (Basic Block)</strong> là một chuỗi các câu lệnh liên tiếp thỏa mãn hai điều kiện vàng:</p>
            <ol>
              <li><strong>Cửa vào duy nhất (Single Entry):</strong> Luồng điều khiển chỉ có thể bắt đầu tại câu lệnh đầu tiên của khối. Không có bất kỳ lệnh nhảy (jump/goto/branch) nào từ bên ngoài được phép nhảy vào giữa khối.</li>
              <li><strong>Cửa ra duy nhất (Single Exit):</strong> Khi câu lệnh đầu tiên đã được kích hoạt, <em>toàn bộ</em> các câu lệnh còn lại trong khối sẽ được thực thi tuần tự cho tới câu lệnh cuối cùng mà không bị rẽ nhánh giữa chừng. Chỉ có câu lệnh cuối cùng mới được phép là lệnh rẽ nhánh hoặc kết thúc.</li>
            </ol>
            <p>Tính chất này bảo đảm: Đối với trình tối ưu hóa, một Basic Block có thể được coi là một "nguyên tử" xử lý không thể chia cắt.</p>
          </div>
        </details>
      `
    },
    {
      id: 'sec-2',
      title: 'Đồ thị luồng điều khiển (CFG) và Khác biệt với Flowchart',
      badge: 'Cấu trúc dữ liệu',
      content: `
        <p><strong>Control Flow Graph (CFG)</strong> là một đồ thị có hướng $G = (V, E)$:</p>
        <ul>
          <li><strong>Tập đỉnh $V$:</strong> Mỗi đỉnh là một Khối cơ bản (Basic Block).</li>
          <li><strong>Tập cạnh $E$:</strong> Mỗi cạnh có hướng $u \to v$ thể hiện luồng điều khiển có thể nhảy trực tiếp từ cuối khối $u$ sang đầu khối $v$.</li>
        </ul>
        <div class="table-responsive">
          <table class="lesson-table">
            <thead>
              <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);">
                <th style="padding:8px;border:1px solid var(--border-subtle);">Tiêu chí</th>
                <th style="padding:8px;border:1px solid var(--border-subtle);">Flowchart thông thường</th>
                <th style="padding:8px;border:1px solid var(--border-subtle);">Control Flow Graph (CFG)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:8px;border:1px solid var(--border-subtle);font-weight:bold;">Mục đích</td>
                <td style="padding:8px;border:1px solid var(--border-subtle);">Giao tiếp giữa người với người; rèn tư duy logic</td>
                <td style="padding:8px;border:1px solid var(--border-subtle);">Trình biên dịch dùng để phân tích tĩnh, tối ưu hóa mã máy</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid var(--border-subtle);font-weight:bold;">Đơn vị mỗi nút</td>
                <td style="padding:8px;border:1px solid var(--border-subtle);">Từng phép toán đơn lẻ (gán, nhập, xuất, so sánh)</td>
                <td style="padding:8px;border:1px solid var(--border-subtle);">Một khối cơ bản gồm nhiều câu lệnh liên tiếp</td>
              </tr>
              <tr>
                <td style="padding:8px;border:1px solid var(--border-subtle);font-weight:bold;">Độ phức tạp hình học</td>
                <td style="padding:8px;border:1px solid var(--border-subtle);">Nhiều hình khối khác nhau (bầu dục, bình hành, thoi)</td>
                <td style="padding:8px;border:1px solid var(--border-subtle);">Chuẩn đồ thị toán học thuần túy (các nút đồng nhất)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'sec-3',
      title: 'Soi Basic Block trong Python 3.14 bằng module dis',
      badge: 'Python Bytecode',
      content: `
        <p>Bên trong Python 3.14, mã nguồn của bạn trước tiên được phân tích thành AST (Abstract Syntax Tree), sau đó được chuyển thành CFG gồm các khối Basic Block, rồi mới sinh ra Bytecode thực thi trên máy ảo Python.</p>
        <p>Hãy xem cách Python phân mảnh một hàm đơn giản thành các Basic Block thông qua module tích hợp <code>dis</code>:</p>
      `,
      codeExamples: [
        {
          title: 'Khảo sát CFG và Bytecode bằng dis',
          code: `import dis

def check_value(x):
    # Basic Block 1: So sánh và rẽ nhánh
    if x > 0:
        return "Số dương"  # Basic Block 2: Nhánh True
    else:
        return "Không dương"  # Basic Block 3: Nhánh False

print("BYTECODE VÀ CÁC ĐIỂM NHẢY TRONG PYTHON 3.14:")
dis.dis(check_value)`
        }
      ]
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'CFG được dùng ở đâu trong thực tế?',
      content: 'Mọi công cụ phân tích mã tĩnh như SonarQube, Pylint, các bộ quét bảo mật tìm lỗ hổng tràn bộ nhớ, và các bộ tối ưu hóa JIT (Just-In-Time) như PyPy hay Numba đều xây dựng và duyệt trên đồ thị CFG để phát hiện lỗi.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Phân tích số lượng Basic Block',
      description: 'Cho đoạn code sau, hãy xác định đoạn code này được chia thành bao nhiêu Basic Block riêng biệt:\n```python\na = 1\nb = 2\nif a < b:\n    c = a + b\nelse:\n    c = a - b\nprint(c)\n```',
      initialCode: `# Hãy điền số lượng Basic Block và giải thích:
num_blocks = 0
reason = ""
`,
      solution: `num_blocks = 4
reason = """
Đoạn code gồm 4 Basic Block:
- Block 1 (BB0): a = 1; b = 2; if a < b (khối khởi tạo và kiểm tra)
- Block 2 (BB1): c = a + b; goto BB3 (nhánh True)
- Block 3 (BB2): c = a - b; goto BB3 (nhánh False)
- Block 4 (BB3): print(c) (khối hội tụ và kết thúc)
"""
print(f"Tổng số Basic Blocks: {num_blocks}")
print(reason)`
    }
  ],

  quiz: [
    {
      question: 'Đặc điểm bắt buộc của một Khối cơ bản (Basic Block) trong lý thuyết trình biên dịch là gì?',
      options: [
        'Khối phải chứa ít nhất một lệnh lặp while.',
        'Khối chỉ có đúng một điểm vào duy nhất ở đầu và đúng một điểm thoát duy nhất ở cuối.',
        'Khối không được chứa quá 5 dòng lệnh.',
        'Khối bắt buộc phải trả về giá trị kiểu số nguyên.'
      ],
      correctIndex: 1,
      explanation: 'Định nghĩa toán học của Basic Block là chuỗi lệnh chỉ có duy nhất một cổng vào (Single Entry) và duy nhất một cổng ra (Single Exit). Khi đã bước vào dòng đầu, toàn bộ các dòng sau đều phải chạy.'
    }
  ],

  summary: 'Khối cơ bản (Basic Block) và Đồ thị luồng điều khiển (CFG) là nền tảng toán học đằng sau trình biên dịch và công cụ phân tích tĩnh. Nắm vững CFG giúp bạn hiểu cách máy tính và Python thực sự "nhìn" thuật toán của bạn.'
};
