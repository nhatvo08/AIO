export default {
  id: 'p0b-11',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B2.4',
  title: 'Kỹ thuật chia nhỏ bài toán (Modularization) và Flowchart nhiều cấp',
  subtitle: 'Tư duy phân rã Top-Down: Ký hiệu Predefined Process (hai vạch dọc), liên kết sơ đồ con, truyền nhận tham số và cấu trúc hàm',
  level: 'Trung cấp',
  duration: '35 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Làm chủ tư duy phân rã từ trên xuống (Top-Down Decomposition) để chế ngự các bài toán phức tạp.',
    'Sử dụng chuẩn xác ký hiệu Quy trình định nghĩa trước (Predefined Process) theo chuẩn ISO 5807.',
    'Hiểu cách thức tổ chức Flowchart đa cấp (sơ đồ tổng thể mức cao và các sơ đồ con chi tiết).',
    'Ánh xạ hoàn hảo giữa khái niệm Subroutine trên Flowchart với Hàm (Functions) và Phạm vi biến (Scope) trong Python.'
  ],

  intuition: {
    title: 'Bản đồ vệ tinh Google Maps và Nghệ thuật zoom',
    metaphor: 'Khi bạn mở ứng dụng bản đồ ở mức zoom toàn quốc, bạn chỉ thấy các thành phố lớn và đường quốc lộ huyết mạch. Nếu bản đồ hiển thị từng con hẻm, từng gốc cây trên toàn quốc cùng một lúc, màn hình sẽ biến thành một đám bùn đen đặc vô dụng! Lập trình cũng y như vậy: nếu bạn nhét từng dòng code kiểm tra cú pháp, tính toán lẻ tẻ vào chung một sơ đồ duy nhất, bạn sẽ tạo ra một "sơ đồ tổ quạ". Kỹ thuật Modularization cho phép bạn giữ sơ đồ chính ở mức zoom cao (High-level Architecture), và khi cần đào sâu chi tiết từng bước, bạn mới "zoom vào" sơ đồ con (Subroutine).',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">CẤU TRÚC PHÂN RÃ ĐA CẤP (TOP-DOWN)</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;">
          <div style="padding:10px;border:2px solid var(--accent-primary);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <strong>MỨC 0: Sơ đồ Tổng quan</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">main(): Luồng nghiệp vụ chính</span>
          </div>
          <span style="font-size:1.5rem;color:var(--accent-primary);">➔</span>
          <div style="padding:10px;border:2px solid var(--py-gold);border-radius:8px;background:var(--bg-surface);text-align:center;">
            <strong>MỨC 1: Các Hàm con độc lập</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">calc_tax(), apply_voucher()</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Ký hiệu Predefined Process (Quy trình xác định trước)',
      badge: 'Chuẩn ISO 5807',
      content: `
        <p>Theo tiêu chuẩn quốc tế ISO 5807, một chương trình con, hàm, hoặc thủ tục được ký hiệu bằng <strong>hình chữ nhật có hai đường viền dọc đôi ở hai bên</strong>.</p>
        <p>Ký hiệu này phát đi một thông điệp mạnh mẽ: <em>"Tại đây có một khối nghiệp vụ hoàn chỉnh đã được định nghĩa và kiểm thử ở một nơi khác. Khi luồng chạy đến ô này, hãy tạm dừng sơ đồ chính, nhảy vào chạy sơ đồ con, lấy kết quả trả về rồi mới tiếp tục đi tiếp!"</em></p>
        <div style="margin:20px 0;display:flex;justify-content:center;">
          <svg viewBox="0 0 450 140" style="max-width:100%;height:auto;font-family:var(--font-mono);font-size:12px;" role="img" aria-label="Ký hiệu Predefined Process">
            <!-- Box with vertical stripes -->
            <rect x="100" y="40" width="250" height="60" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="125" y1="40" x2="125" y2="100" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="325" y1="40" x2="325" y2="100" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="225" y="75" fill="var(--text-primary)" text-anchor="middle" font-weight="bold">calc_shipping_fee(order)</text>
          </svg>
        </div>
      `
    },
    {
      id: 'sec-2',
      title: 'Mô hình giao tiếp: Tham số đầu vào và Giá trị trả về',
      badge: 'Cơ chế Hàm',
      content: `
        <p>Một hàm con chuẩn mực là một "chiếc hộp đen" (Black Box) có ranh giới rõ ràng:</p>
        <ul>
          <li><strong>Input (Tham số):</strong> Nhận dữ liệu truyền từ bên ngoài vào qua danh sách tham số (Arguments). Hàm con không nên tùy tiện đọc các biến toàn cục bên ngoài.</li>
          <li><strong>Processing (Xử lý nội bộ):</strong> Toàn bộ biến tạo ra bên trong hàm đều là <strong>Biến cục bộ (Local Variables)</strong> và sẽ tự động bị xóa sổ khỏi bộ nhớ khi hàm kết thúc.</li>
          <li><strong>Output (Giá trị trả về):</strong> Gửi kết quả cuối cùng trở lại cho nơi gọi thông qua lệnh <code>return</code>.</li>
        </ul>
      `,
      codeExamples: [
        {
          title: 'Phân tách hàm chuẩn mực trong Python',
          code: `def calculate_discount(total_amount, is_vip):
    """Hàm con tính tiền giảm giá (Subroutine)"""
    if is_vip:
        discount_rate = 0.15  # Giảm 15% cho khách VIP
    elif total_amount >= 1_000_000:
        discount_rate = 0.10  # Giảm 10% cho đơn lớn
    else:
        discount_rate = 0.05
    return total_amount * discount_rate

def checkout_process(items, customer_is_vip):
    """Sơ đồ chính (Main Process)"""
    raw_total = sum(item['price'] * item['qty'] for item in items)
    
    # GỌI HÀM CON (Predefined Process)
    discount = calculate_discount(raw_total, customer_is_vip)
    
    final_bill = raw_total - discount
    return final_bill

cart = [
    {'name': 'Bàn phím cơ', 'price': 800_000, 'qty': 1},
    {'name': 'Chuột công thái học', 'price': 400_000, 'qty': 1}
]
print(f"Tổng thanh toán: {checkout_process(cart, is_vip=True):,.0f} VNĐ")`
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Ví dụ thực chiến: Quy trình thanh toán thương mại điện tử',
      badge: 'Kiến trúc hệ thống',
      content: `
        <p>Quan sát cách sơ đồ tổng thể giữ được sự trong sáng tuyệt đối nhờ ủy quyền cho các hàm con:</p>
        <div style="margin:20px 0;display:flex;justify-content:center;">
          <svg viewBox="0 0 540 380" style="max-width:100%;height:auto;font-family:var(--font-mono);font-size:11px;" role="img" aria-label="Sơ đồ Checkout Đa cấp">
            <defs>
              <marker id="arrow-b2-4" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--text-muted)" />
              </marker>
            </defs>
            <ellipse cx="270" cy="25" rx="60" ry="16" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="270" y="29" fill="var(--text-primary)" text-anchor="middle" font-weight="bold">Bắt đầu đơn</text>
            <path d="M 270 41 L 270 70" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-4)"/>

            <!-- Step 1: Subroutine check stock -->
            <rect x="150" y="70" width="240" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="170" y1="70" x2="170" y2="110" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="370" y1="70" x2="370" y2="110" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="270" y="95" fill="var(--text-primary)" text-anchor="middle">check_stock_availability()</text>
            <path d="M 270 110 L 270 140" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-4)"/>

            <!-- Step 2: Subroutine apply voucher -->
            <rect x="150" y="140" width="240" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="170" y1="140" x2="170" y2="180" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="370" y1="140" x2="370" y2="180" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="270" y="165" fill="var(--text-primary)" text-anchor="middle">calculate_voucher_discount()</text>
            <path d="M 270 180 L 270 210" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-4)"/>

            <!-- Step 3: Subroutine charge card -->
            <rect x="150" y="210" width="240" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="170" y1="210" x2="170" y2="250" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="370" y1="210" x2="370" y2="250" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="270" y="235" fill="var(--text-primary)" text-anchor="middle">process_payment_gateway()</text>
            <path d="M 270 250 L 270 280" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-4)"/>

            <!-- Step 4: Subroutine send email -->
            <rect x="150" y="280" width="240" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="170" y1="280" x2="170" y2="320" stroke="var(--accent-primary)" stroke-width="2"/>
            <line x1="370" y1="280" x2="370" y2="320" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="270" y="305" fill="var(--text-primary)" text-anchor="middle">send_invoice_email()</text>
            <path d="M 270 320 L 270 345" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-4)"/>

            <ellipse cx="270" cy="360" rx="60" ry="16" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="270" y="364" fill="var(--text-primary)" text-anchor="middle" font-weight="bold">Hoàn tất đơn</text>
          </svg>
        </div>
      `
    }
  ],

  callouts: [
    {
      type: 'tip',
      title: 'Quy tắc một mức độ trừu tượng (Single Level of Abstraction - SLA)',
      content: 'Trong cùng một sơ đồ hoặc một hàm, các bước thực hiện nên có cùng mức độ chi tiết. Đừng trộn lẫn việc gọi cấp cao như "Thanh toán hóa đơn" ngay cạnh một dòng chi tiết vụn vặt như "biến đếm i tăng lên 1". Hãy đóng gói thao tác vụn vặt vào hàm con.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Tái cấu trúc hàm khổng lồ',
      description: 'Cho một đoạn code làm quá nhiều việc trong một khối. Hãy phân rã đoạn code này thành 2 hàm con: một hàm tính thuế VAT (8%), một hàm tính tổng thanh toán cuối cùng.',
      initialCode: `# Code ban đầu gộp chung mọi việc:
def process_order(price, quantity):
    subtotal = price * quantity
    vat = subtotal * 0.08
    shipping = 30000 if subtotal < 500000 else 0
    total = subtotal + vat + shipping
    return total
`,
      solution: `def calc_vat(subtotal):
    """Hàm con tính thuế VAT"""
    return subtotal * 0.08

def calc_shipping(subtotal):
    """Hàm con tính phí giao hàng"""
    return 30000 if subtotal < 500000 else 0

def process_order(price, quantity):
    """Hàm điều phối chính"""
    subtotal = price * quantity
    vat = calc_vat(subtotal)
    shipping = calc_shipping(subtotal)
    return subtotal + vat + shipping

print("Tổng đơn:", process_order(200_000, 2))`
    }
  ],

  quiz: [
    {
      question: 'Theo chuẩn ISO 5807, ký hiệu nào đại diện cho một chương trình con (Subroutine / Hàm)?',
      options: [
        'Hình thoi có dấu chấm hỏi ở giữa.',
        'Hình bình hành nghiêng 45 độ.',
        'Hình chữ nhật có hai đường viền dọc đôi ở hai cạnh trái và phải.',
        'Hình lục giác đều.'
      ],
      correctIndex: 2,
      explanation: 'Hình chữ nhật có 2 đường kẻ dọc bên trong (Predefined Process) là ký hiệu quốc tế đại diện cho hàm, thủ tục hoặc module đã được định nghĩa ở sơ đồ khác.'
    }
  ],

  summary: 'Phân rã Top-Down giúp chuyển bài toán phức tạp thành các module con độc lập, dễ quản lý và dễ kiểm thử. Ký hiệu Predefined Process kết nối sơ đồ kiến trúc mức cao với các hàm con chi tiết trong code.'
};
