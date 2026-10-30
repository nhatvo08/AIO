export default {
  id: 'p0b-10',
  partId: 'part-0b',
  partTitle: 'Phần 0B – Flowchart và tư duy thuật toán',
  number: 'B2.3',
  title: 'Thuật toán kinh điển qua Flowchart: Euclid GCD, Nguyên tố tối ưu, Binary Search và Bubble Sort',
  subtitle: 'Mổ xẻ 4 thuật toán bất hủ: Ý tưởng trực giác, sơ đồ chuẩn ISO 5807, bảng Dry Run từng bước và chứng minh tính dừng',
  level: 'Trung cấp',
  duration: '45 phút',
  isNew314: false,
  interactiveWidget: null,

  objectives: [
    'Hiểu sâu bản chất thuật toán Euclid tìm ước chung lớn nhất (GCD) ở cả hai phiên bản trừ dần và chia lấy dư.',
    'Nắm vững chứng minh toán học trực giác: Vì sao kiểm tra số nguyên tố chỉ cần thử đến căn bậc hai của n.',
    'Thành thạo cơ chế thu hẹp khoảng [left, right] của Tìm kiếm nhị phân (Binary Search).',
    'Hiểu nguyên lý hoạt động của Sắp xếp nổi bọt (Bubble Sort) và kỹ thuật tối ưu hóa bằng cờ hiệu (flag).'
  ],

  intuition: {
    title: '4 Viên ngọc quý trong kho tàng khoa học máy tính',
    metaphor: 'Nếu coi lập trình là môn võ thuật, thì 4 thuật toán này chính là 4 bài quyền cơ bản nhưng uy lực nhất mà bất kỳ võ sư nào cũng phải nằm lòng. Thuật toán Euclid (có từ hơn 2300 năm trước ở Hy Lạp cổ đại) dạy ta tư duy thu nhỏ bài toán bằng tính chất đồng dư. Kiểm tra nguyên tố dạy ta tư duy tối ưu hóa bước nhảy. Binary Search dạy ta nghệ thuật "chia để trị" (mỗi bước cắt bỏ một nửa thế giới). Bubble Sort dạy ta cách sắp xếp trật tự từ những tương tác cục bộ đơn giản nhất.',
    visualHtml: `
      <div style="display:flex;flex-direction:column;gap:12px;font-family:var(--font-mono);font-size:0.85rem;padding:16px;background:var(--bg-surface-alt);border:1px solid var(--border-subtle);border-radius:10px;">
        <div style="font-weight:700;color:var(--accent-text);text-align:center;">BẢN ĐỒ 4 THUẬT TOÁN KINH ĐIỂN</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="padding:10px;border:1px solid var(--border-subtle);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);">1. Euclid GCD</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Ước chung lớn nhất bằng Modulo: a, b = b, a % b</span>
          </div>
          <div style="padding:10px;border:1px solid var(--border-subtle);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);">2. Prime Check √n</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Tối ưu căn bậc hai: Chỉ thử d * d &lt;= n</span>
          </div>
          <div style="padding:10px;border:1px solid var(--border-subtle);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);">3. Binary Search</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Chia đôi không gian tìm kiếm: O(log n)</span>
          </div>
          <div style="padding:10px;border:1px solid var(--border-subtle);border-radius:8px;background:var(--bg-surface);">
            <strong style="color:var(--accent-primary);">4. Bubble Sort (Flag)</strong><br/>
            <span style="font-size:0.75rem;color:var(--text-muted);">Nổi bọt có cờ hiệu: Dừng sớm nếu đã có thứ tự</span>
          </div>
        </div>
      </div>
    `
  },

  sections: [
    {
      id: 'sec-1',
      title: 'Thuật toán 1: Euclid tìm Ước chung lớn nhất (GCD)',
      badge: 'Toán học cổ điển',
      content: `
        <p>Ước chung lớn nhất của hai số nguyên dương <code>a</code> và <code>b</code> là số nguyên lớn nhất chia hết cho cả hai số. Euclid nhận thấy một chân lý tuyệt đẹp: <strong>Ước chung của (a, b) cũng chính là ước chung của (b, a % b)</strong>.</p>
        <p>Thuật toán lặp liên tục bước <code>a, b = b, a % b</code> cho tới khi <code>b == 0</code>. Khi đó, <code>a</code> chính là GCD!</p>
        <div style="margin:20px 0;display:flex;justify-content:center;">
          <svg viewBox="0 0 500 280" style="max-width:100%;height:auto;font-family:var(--font-mono);font-size:12px;" role="img" aria-label="Sơ đồ Euclid GCD">
            <defs>
              <marker id="arrow-b2-3-euclid" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--text-muted)" />
              </marker>
            </defs>
            <!-- Start -->
            <ellipse cx="250" cy="25" rx="70" ry="18" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="250" y="30" fill="var(--text-primary)" text-anchor="middle" font-weight="bold">Bắt đầu: (a, b)</text>
            <path d="M 250 43 L 250 75" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-3-euclid)"/>

            <!-- Decision: b != 0 -->
            <polygon points="250,80 340,115 250,150 160,115" fill="var(--bg-surface)" stroke="var(--border-strong)" stroke-width="2"/>
            <text x="250" y="119" fill="var(--text-primary)" text-anchor="middle" font-weight="bold">b != 0 ?</text>

            <!-- Yes branch -->
            <path d="M 250 150 L 250 185" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-3-euclid)"/>
            <text x="260" y="170" fill="var(--accent-primary)" font-weight="bold">Đúng</text>

            <!-- Process: a, b = b, a % b -->
            <rect x="170" y="190" width="160" height="40" rx="4" fill="var(--bg-surface)" stroke="var(--py-gold)" stroke-width="2"/>
            <text x="250" y="215" fill="var(--text-primary)" text-anchor="middle">a, b = b, a % b</text>

            <!-- Loop back -->
            <path d="M 170 210 L 110 210 L 110 115 L 155 115" fill="none" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-3-euclid)"/>

            <!-- No branch -->
            <path d="M 340 115 L 400 115" stroke="var(--text-muted)" stroke-width="2" marker-end="url(#arrow-b2-3-euclid)"/>
            <text x="360" y="105" fill="var(--danger-text)" font-weight="bold">Sai</text>
            <ellipse cx="450" cy="115" rx="45" ry="20" fill="var(--bg-surface)" stroke="var(--accent-primary)" stroke-width="2"/>
            <text x="450" y="120" fill="var(--text-primary)" text-anchor="middle" font-weight="bold">Trả về a</text>
          </svg>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thuật toán Euclid trong Python',
          code: `def gcd(a, b):
    """Tìm ước chung lớn nhất của hai số nguyên dương."""
    while b != 0:
        a, b = b, a % b
    return a

print(gcd(48, 18))  # 6
print(gcd(1071, 462))  # 21`
        }
      ]
    },
    {
      id: 'sec-2',
      title: 'Thuật toán 2: Kiểm tra số nguyên tố tối ưu căn bậc hai (√n)',
      badge: 'Tối ưu độ phức tạp',
      content: `
        <p>Một số nguyên $n > 1$ là số nguyên tố nếu nó chỉ chia hết cho 1 và chính nó. Cách ngây thơ là thử chia $n$ cho mọi số từ 2 đến $n - 1$. Với $n = 10^9$, thuật toán ngây thơ phải chạy 1 tỷ phép tính!</p>
        <h4>Vì sao chỉ cần thử đến $\\sqrt{n}$?</h4>
        <p>Nếu $n = a \\times b$, thì không thể cả hai số $a$ và $b$ đều lớn hơn $\\sqrt{n}$ (vì nếu vậy $a \\times b > \\sqrt{n} \\times \\sqrt{n} = n$, vô lý!). Do đó, nếu $n$ là hợp số, <strong>chắc chắn nó phải có ít nhất một ước số nhỏ hơn hoặc bằng $\\sqrt{n}$</strong>.</p>
        <p>Với $n = 10^9$, $\\sqrt{n} \\approx 31,622$. Thay vì 1 tỷ bước, thuật toán chỉ mất tối đa 31,622 bước — nhanh gấp hơn 30,000 lần!</p>
      `,
      codeExamples: [
        {
          title: 'Kiểm tra số nguyên tố tối ưu',
          code: `def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    
    # Chỉ duyệt các ước số tiềm năng d thỏa mãn d * d <= n
    d = 5
    while d * d <= n:
        if n % d == 0 or n % (d + 2) == 0:
            return False
        d += 6  # Mọi số nguyên tố > 3 đều có dạng 6k ± 1
    return True

print(is_prime(29))         # True
print(is_prime(1_000_003))  # False`
        }
      ]
    },
    {
      id: 'sec-3',
      title: 'Thuật toán 3: Tìm kiếm nhị phân (Binary Search)',
      badge: 'Chia để trị',
      content: `
        <p>Điều kiện tiên quyết: <strong>Danh sách phải được sắp xếp theo thứ tự tăng dần</strong>.</p>
        <p>Ý tưởng: So sánh giá trị cần tìm (target) với phần tử ở chính giữa khoảng tìm kiếm (mid). Nếu target nhỏ hơn mid, ta vứt bỏ toàn bộ nửa bên phải. Nếu target lớn hơn mid, ta vứt bỏ nửa bên trái. Mỗi lần so sánh, ta <strong>giảm một nửa số lượng phần tử cần xét</strong>!</p>
        <h4>Bảng theo dõi giá trị (Dry Run) tìm số 23 trong mảng [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]:</h4>
        <div class="table-responsive">
          <table class="lesson-table">
          <thead>
            <tr style="background:var(--bg-surface-alt);border-bottom:2px solid var(--border-strong);">
              <th style="padding:6px;border:1px solid var(--border-subtle);">Bước</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">left</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">right</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">mid</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">arr[mid]</th>
              <th style="padding:6px;border:1px solid var(--border-subtle);">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">1</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">0</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">9</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">4</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">16</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">23 &gt; 16 ➔ left = mid + 1 = 5</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">2</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">5</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">9</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">7</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">56</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);">23 &lt; 56 ➔ right = mid - 1 = 6</td>
            </tr>
            <tr>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">3</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">5</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">6</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">5</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);text-align:center;">23</td>
              <td style="padding:6px;border:1px solid var(--border-subtle);color:var(--accent-primary);font-weight:bold;">Tìm thấy tại chỉ số 5! Thoát.</td>
            </tr>
          </tbody>
        </table>
        </div>
      `,
      codeExamples: [
        {
          title: 'Thuật toán Binary Search',
          code: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid       # Tìm thấy mục tiêu!
        elif arr[mid] < target:
            left = mid + 1   # Tìm ở nửa bên phải
        else:
            right = mid - 1  # Tìm ở nửa bên trái
            
    return -1                # Không tồn tại target trong mảng

arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(arr, 23))  # 5
print(binary_search(arr, 40))  # -1`
        }
      ]
    },
    {
      id: 'sec-4',
      title: 'Thuật toán 4: Sắp xếp nổi bọt (Bubble Sort) kèm cờ hiệu tối ưu',
      badge: 'Sắp xếp & Tối ưu',
      content: `
        <p>Thuật toán so sánh liên tiếp hai phần tử liền kề <code>arr[j]</code> và <code>arr[j+1]</code>. Nếu phần tử đứng trước lớn hơn phần tử đứng sau, ta tráo đổi vị trí của chúng. Sau mỗi lượt, phần tử lớn nhất sẽ "nổi" dần về cuối mảng giống như bọt khí nổi lên mặt nước.</p>
        <h4>Tối ưu hóa bằng Cờ hiệu (Flag <code>swapped</code>):</h4>
        <p>Nếu mảng ban đầu đã gần như được sắp xếp (hoặc đã sắp xếp xong sau vài vòng đầu), ta không cần cố duyệt hết $n-1$ lượt. Nếu trong suốt một lượt quét mà không có bất kỳ cặp nào bị hoán đổi (<code>swapped == False</code>), ta có thể <strong>kết thúc ngay lập tức</strong>, đưa độ phức tạp về $O(n)$ lý tưởng!</p>
      `,
      codeExamples: [
        {
          title: 'Bubble Sort với cờ hiệu dừng sớm',
          code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False  # Cờ hiệu kiểm tra
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # Nếu không có sự hoán đổi nào, mảng đã sắp xếp xong!
        if not swapped:
            break
    return arr

sample = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(sample))  # [11, 12, 22, 25, 34, 64, 90]`
        }
      ]
    }
  ],

  callouts: [
    {
      type: 'important',
      title: 'Tại sao Binary Search dừng lại khi left > right?',
      content: 'Khoảng tìm kiếm hợp lệ là `[left, right]`. Mỗi bước nếu không thấy target, ta co khoảng lại. Khi `left > right`, khoảng tìm kiếm trở nên rỗng (không còn phần tử nào bên trong), chứng minh một cách toán học rằng target hoàn toàn không tồn tại trong mảng.'
    }
  ],

  exercises: [
    {
      title: 'Bài tập: Tìm Bội chung nhỏ nhất (LCM) dựa trên GCD',
      description: 'Dựa trên hệ thức toán học $\\text{LCM}(a, b) = \\frac{|a \\times b|}{\\text{GCD}(a, b)}$, hãy viết hàm `lcm(a, b)` sử dụng lại hàm `gcd(a, b)` của Euclid.',
      initialCode: `def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def lcm(a, b):
    # Viết code tính BCNN tại đây
    pass
`,
      solution: `def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def lcm(a, b):
    if a == 0 or b == 0:
        return 0
    return abs(a * b) // gcd(a, b)

print(lcm(12, 18))  # 36
print(lcm(5, 7))    # 35`
    }
  ],

  quiz: [
    {
      question: 'Khi kiểm tra số n = 101 có phải số nguyên tố hay không, vòng lặp kiểm tra tối ưu cần thử các ước số tiềm năng đến tối đa là bao nhiêu?',
      options: [
        'Đến 100',
        'Đến 50',
        'Đến 10 (vì 10 * 10 <= 101 < 11 * 11)',
        'Đến 2'
      ],
      correctIndex: 2,
      explanation: 'Ta chỉ cần thử đến floor(sqrt(n)). Căn bậc hai của 101 xấp xỉ 10.049, do đó ước số tiềm năng chỉ cần thử đến tối đa là 10 (cụ thể chỉ cần kiểm tra các số nguyên tố 2, 3, 5, 7).'
    },
    {
      question: 'Nếu mảng đã được sắp xếp tăng dần sẵn [1, 2, 3, 4, 5], thuật toán Bubble Sort có cờ hiệu sẽ mất bao nhiêu lượt quét vòng ngoài?',
      options: [
        '4 lượt',
        'Đúng 1 lượt quét duy nhất',
        '5 lượt',
        '0 lượt'
      ],
      correctIndex: 1,
      explanation: 'Ở lượt quét đầu tiên (i = 0), các cặp liền kề đều thỏa mãn thứ tự nên không có lệnh hoán đổi nào xảy ra. Biến swapped vẫn giữ giá trị False. Ngay sau vòng lặp trong đầu tiên, điều kiện if not swapped: break được kích hoạt và thuật toán dừng ngay chỉ sau 1 lượt.'
    }
  ],

  summary: '4 thuật toán kinh điển đại diện cho 4 trường phái tư duy cốt lõi: Euclid (thu nhỏ bài toán bằng quan hệ đồng dư), Prime Check (cắt giảm không gian duyệt bằng cận căn bậc hai), Binary Search (chia đôi không gian tìm kiếm O(log n)), và Bubble Sort tối ưu (lắng nghe tín hiệu dừng sớm qua cờ hiệu).'
};
