export default {
  id: 'p0b-24',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B3.9',
  title: 'Đồ án Mini: Thiết kế Hệ thống Máy bán hàng tự động (Smart Vending Machine)',
  subtitle: 'Thử thách tư duy tổng hợp: Phân tích IPO, Flowchart hoàn chỉnh xử lý biên, FSM, code Python 3.14 và đánh giá McCabe',
  level: 'Chuyên sâu',
  duration: '60 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Tích hợp toàn bộ kiến thức 3 tầng của Phần 0B vào một dự án kỹ thuật thực tế hoàn chỉnh từ A đến Z.',
    'Thực hiện bài bản quy trình công nghiệp: Phân tích IPO ➔ Mô hình hóa trạng thái ➔ Vẽ Flowchart có xử lý biên ➔ Lập bảng Dry Run ➔ Viết Code ➔ Đo McCabe.',
    'So sánh và đánh giá sự đánh đổi (Trade-offs) giữa Thiết kế thủ tục tuần tự và Thiết kế hướng trạng thái (FSM).',
    'Chinh phục trọn vẹn tư duy thuật toán cốt lõi, tự tin bước tiếp sang Phần 1 (Các kiểu số trong Python).'
  ],

  intuition: {
    title: 'Bài thi tốt nghiệp của người kiến trúc sư giải thuật',
    metaphor: 'Trong ngành kiến trúc, người học viên sau khi đã học về độ bền của bê tông, kết cấu dầm cầu, phong thủy và thẩm mỹ, sẽ phải tự tay vẽ bản thiết kế cho một tòa nhà hoàn chỉnh từ móng đến nóc. Bài học B3.9 chính là "bản thiết kế kiến trúc tốt nghiệp" của bạn cho Phần 0B! Chúng ta sẽ cùng nhau xây dựng Hệ thống Máy bán hàng tự động thông minh: một bài toán kinh điển hội tụ đầy đủ: nhập xuất dữ liệu, cấu trúc điều khiển, thuật toán thối tiền tham lam (Greedy Change-Making), xử lý lỗi biên, cấu trúc hàm đa cấp và máy trạng thái.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">QUY TRÌNH KỸ THUẬT 6 BƯỚC ĐỒ ÁN MINI</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:8px;text-align:center;">
          <div style="padding:6px;border:1px solid var(--accent-primary);border-radius:6px;background:var(--bg-surface);"><strong>1. Phân tích IPO</strong></div>
          <div style="padding:6px;border:1px solid var(--accent-primary);border-radius:6px;background:var(--bg-surface);"><strong>2. Thiết kế FSM</strong></div>
          <div style="padding:6px;border:1px solid var(--accent-primary);border-radius:6px;background:var(--bg-surface);"><strong>3. Vẽ Flowchart</strong></div>
          <div style="padding:6px;border:1px solid var(--accent-primary);border-radius:6px;background:var(--bg-surface);"><strong>4. Bảng Dry Run</strong></div>
          <div style="padding:6px;border:1px solid var(--accent-primary);border-radius:6px;background:var(--bg-surface);"><strong>5. Code Python</strong></div>
          <div style="padding:6px;border:1px solid var(--accent-primary);border-radius:6px;background:var(--bg-surface);"><strong>6. Đo McCabe</strong></div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Bước 1 & 2: Phân tích IPO và Máy trạng thái FSM',
      badge: 'Phân tích yêu cầu',
      content: `
        <details class="deep-dive-details" open style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:8px;padding:12px;margin-bottom:16px;">
          <summary style="cursor:pointer;font-weight:bold;color:var(--accent-primary);">Thu gọn / Mở rộng kiến thức Chuyên sâu Tầng 3</summary>
          <div style="margin-top:12px;">
            <h4>Mô hình Đầu vào – Xử lý – Đầu ra (IPO):</h4>
            <ul>
              <li><strong>Input:</strong> Tiền nạp (các mệnh giá: 10k, 20k, 50k, 100k), Mã lựa chọn sản phẩm (A1, B2...), Lệnh hủy hoàn tiền (CANCEL).</li>
              <li><strong>Processing:</strong>
                <ul>
                  <li>Xác thực mệnh giá hợp lệ (chống tiền giả / sai mệnh giá).</li>
                  <li>Kiểm tra hàng tồn kho trong máy (Stock Availability).</li>
                  <li>So sánh số dư đã nạp với giá bán (Balance vs Price).</li>
                  <li>Thuật toán thối tiền tham lam (Greedy Change Dispensing) dùng các mệnh giá từ lớn đến bé.</li>
                </ul>
              </li>
              <li><strong>Output:</strong> Nhả sản phẩm cơ học, Nhả các tờ tiền thối, Xuất hóa đơn/thông báo màn hình LCD.</li>
            </ul>
            <h4>4 Trạng thái của FSM:</h4>
            <ol>
              <li><code>IDLE</code>: Máy ở trạng thái chờ khách, màn hình mời chọn món.</li>
              <li><code>ACCEPTING_MONEY</code>: Khách đang đút tiền, số dư tăng dần.</li>
              <li><code>DISPENSING</code>: Nhả lon nước cho khách.</li>
              <li><code>RETURNING_CHANGE</code>: Tính toán và nhả tiền thối cho khách.</li>
            </ol>
          </div>
        </details>
      `
    },
    {
      id: 'sec-2',
      title: 'Bước 3 & 4: Flowchart chuẩn và Bảng Dry Run kịch bản phức tạp',
      badge: 'Thiết kế chi tiết',
      content: `
        <p>Kịch bản kiểm thử: Khách nạp 50,000đ. Khách chọn món nước tăng lực giá 15,000đ. Máy còn hàng. Máy cần nhả nước và thối lại 35,000đ (1 tờ 20k, 1 tờ 10k, 1 tờ 5k).</p>
        <div class="table-responsive">
          <table class="lesson-table">
          <thead>
            <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);">
              <th style="padding:6px;border:1px solid var(--border-subtle);">Bước</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Hành động</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Trạng thái FSM</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Số dư (Balance)</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Tồn kho (Stock)</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Kết quả cơ học</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">1</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Khách bấm A1</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">IDLE</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">0đ</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">5 lon</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Màn hình hiện giá: 15,000đ</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">2</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Nạp tờ 50,000đ</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">ACCEPTING</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">50,000đ</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">5 lon</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Xác nhận đủ tiền (50k &gt;= 15k)</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">3</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Nhả nước</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">DISPENSING</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">35,000đ</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">4 lon</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Khay hàng mở, lon nước rơi xuống</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">4</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Thối tiền</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">RETURNING</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">0đ</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">4 lon</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">Khay tiền thối: 1x20k, 1x10k, 1x5k</td>
            </tr>
          </tbody>
        </table>
        </div>
      `
    },
    {
      id: 'sec-3',
      title: 'Bước 5 & 6: Code Python 3.14 chuẩn và Đánh giá McCabe',
      badge: 'Hiện thực hóa & Đo lường',
      content: `
        <p>Dưới đây là mã nguồn Python hoàn chỉnh của hệ thống, tuân thủ nguyên lý phân rã hàm (Modularization) và sử dụng thuật toán thối tiền tham lam:</p>
      `,
      codeExamples: [
        {
          title: 'Hệ thống Smart Vending Machine hoàn chỉnh',
          code: `class SmartVendingMachine:
    def __init__(self):
        # Kho hàng: mã -> {tên, giá, số_lượng}
        self.inventory = {
            "A1": {"name": "Trà xanh Không độ", "price": 10000, "stock": 3},
            "A2": {"name": "Nước ngọt có gas", "price": 15000, "stock": 5},
            "B1": {"name": "Cà phê lon đậm vị", "price": 20000, "stock": 0} # Hết hàng
        }
        self.balance = 0
        self.state = "IDLE"

    def insert_money(self, amount):
        """Khách nạp tiền vào máy"""
        valid_denominations = {10000, 20000, 50000, 100000, 200000, 500000}
        if amount not in valid_denominations:
            print(f"[!] Mệnh giá {amount:,}đ không hợp lệ. Trả lại tiền!")
            return False
            
        self.balance += amount
        self.state = "ACCEPTING_MONEY"
        print(f"[+] Đã nhận {amount:,}đ. Số dư hiện tại: {self.balance:,}đ")
        return True

    def calculate_change(self, change_amount):
        """Thuật toán thối tiền tham lam (Greedy Change-Making)"""
        denominations = [500000, 200000, 100000, 50000, 20000, 10000, 5000]
        change_bills = {}
        remaining = change_amount
        
        for d in denominations:
            if remaining >= d:
                count = remaining // d
                change_bills[d] = count
                remaining = remaining % d
                
        return change_bills

    def select_product(self, code):
        """Khách bấm chọn mã sản phẩm"""
        if code not in self.inventory:
            print(f"[!] Mã sản phẩm '{code}' không tồn tại!")
            return False

        item = self.inventory[code]
        if item["stock"] <= 0:
            print(f"[!] Sản phẩm '{item['name']}' đã HẾT HÀNG! Vui lòng chọn món khác.")
            return False

        if self.balance < item["price"]:
            missing = item["price"] - self.balance
            print(f"[!] Bạn còn thiếu {missing:,}đ để mua '{item['name']}' (Giá: {item['price']:,}đ)")
            return False

        # ĐỦ ĐIỀU KIỆN MUA HÀNG:
        self.state = "DISPENSING"
        item["stock"] -= 1
        change_amount = self.balance - item["price"]
        self.balance = 0
        
        print(f"\\n========================================")
        print(f"[*] ĐANG NHẢ SẢN PHẨM: {item['name']}")
        print(f"[*] Cảm ơn quý khách! Hàng đã rơi vào khay lấy.")
        
        if change_amount > 0:
            self.state = "RETURNING_CHANGE"
            bills = self.calculate_change(change_amount)
            print(f"[*] Tiền thối lại: {change_amount:,}đ gồm:")
            for denom, count in bills.items():
                print(f"    - {count} tờ {denom:,}đ")
        print(f"========================================\\n")
        
        self.state = "IDLE"
        return True

# CHẠY THỬ NGHIỆM KỊCH BẢN THỰC TẾ:
vm = SmartVendingMachine()
vm.insert_money(50000)
vm.select_product("B1")  # Hết hàng -> Cảnh báo
vm.select_product("A2")  # Mua lon 15k -> Nhả nước, thối 35k!`
        }
      ]
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Đánh giá độ phức tạp McCabe của hàm select_product',
      content: 'Hàm `select_product` có 4 điểm quyết định: `code not in inventory`, `item["stock"] <= 0`, `balance < item["price"]`, và `change_amount > 0`.\\nDo đó $D = 4 \\implies M = D + 1 = 5$. Chỉ số $M = 5$ nằm hoàn hảo trong vùng lý tưởng ($1 - 10$), bảo đảm code cực kỳ an toàn, sáng sủa và dễ bảo trì!'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Bổ sung tính năng Nút Hủy Hoàn Tiền (Cancel)',
      description: 'Hãy viết thêm phương thức `cancel_transaction()` cho class `SmartVendingMachine`. Khi khách bấm Hủy, nếu có số dư thì tính tiền thối và trả lại toàn bộ số dư, đưa số dư về 0 và chuyển FSM về IDLE.',
      initialCode: `def cancel_transaction(self):
    # Viết logic hủy đơn hoàn tiền tại đây
    pass
`,
      solution: `def cancel_transaction(self):
    if self.balance == 0:
        print("[*] Không có tiền dư trong máy để hoàn lại.")
        return False
        
    refund_amount = self.balance
    self.balance = 0
    self.state = "RETURNING_CHANGE"
    bills = self.calculate_change(refund_amount)
    
    print(f"[*] HỦY GIAO DỊCH! Hoàn lại {refund_amount:,}đ cho khách:")
    for denom, count in bills.items():
        print(f"    - {count} tờ {denom:,}đ")
        
    self.state = "IDLE"
    return True`
    }
  ],

  quiz: [
    {
      question: 'Trong thiết kế máy bán hàng tự động, việc tách riêng hàm calculate_change() ra khỏi hàm select_product() mang lại lợi ích gì theo nguyên lý bài học B2.4?',
      options: [
        'Làm tăng tốc độ quay của quạt tản nhiệt máy tính.',
        'Tuân thủ nguyên lý Đơn nhiệm (Single Responsibility), giúp thuật toán thối tiền có thể được tái sử dụng khi khách bấm Hủy đơn (Cancel).',
        'Làm cho mã máy bán hàng không cần dùng bộ nhớ RAM.',
        'Bắt buộc biến phải là số thực float.'
      ],
      correctIndex: 1,
      explanation: 'Khi tách rời thuật toán tính tiền thối thành hàm con, cả quy trình mua hàng thành công lẫn quy trình bấm nút Cancel đều có thể tái sử dụng chung một hàm calculate_change() mà không bị trùng lặp code.'
    }
  ],

  summary: 'Chúc mừng bạn đã hoàn thành Đồ án Mini và trọn vẹn 24 bài học của Phần 0B! Bạn đã làm chủ từ những nét vẽ Flowchart cơ bản nhất theo chuẩn ISO 5807 cho đến các đỉnh cao tư duy giải thuật: FSM, CFG, Bất biến vòng lặp, Big O và McCabe. Tư duy thuật toán vững chắc này là bệ phóng hoàn hảo để bạn tự tin bước tiếp vào Phần 1: Các kiểu số chuyên sâu trong Python!'
};
