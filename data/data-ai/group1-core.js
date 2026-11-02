/**
 * Nhóm 1: Nền tảng Xử lý Dữ liệu (NumPy & Pandas)
 * Tác giả: Senior Data & ML Engineer
 */

window.DATA_AI_GROUP1_DATA = {
  id: 'course-group-core',
  number: 'Nhóm 1',
  title: 'Nền tảng Xử lý Dữ liệu',
  badge: 'NumPy & Pandas',
  icon: '🔢',
  customClass: 'data-ai-banner',
  desc: 'Làm chủ mảng đa chiều ndarray, strides, vectorization, ufuncs và cấu trúc bảng DataFrame với Index alignment.',
  parts: [
    {
      id: 'part-ai-numpy',
      number: 'Phần 1',
      title: 'NumPy: Tính toán Số học & Mảng Đa chiều',
      level: 'Cơ bản đến Chuyên sâu',
      badge: '5 Bài học',
      icon: '🔢',
      description: 'Hiểu cặn kẽ bản chất ndarray, buffer bộ nhớ C-contiguous, strides, kỹ thuật vectorization, 3 quy tắc broadcasting, view vs copy và đại số tuyến tính.',
      lessons: [
        {
          id: 'ai-np-01',
          number: '1.1',
          title: 'Vì sao cần NumPy? Bản chất ndarray, Buffer Bộ nhớ & Strides',
          subtitle: 'Giải phẫu sự khác biệt giữa Python List và C-contiguous ndarray: Data Pointer, Dtype, Shape và Strides',
          level: 'Cơ bản',
          duration: '35 phút',
          objectives: [
            'Hiểu lý do Python thuần túy xử lý số học chậm chạp và giải pháp kiến trúc của NumPy.',
            'Phân biệt rõ ràng giữa danh sách con trỏ (Python list) và khối bộ nhớ liên tục (ndarray buffer).',
            'Nắm vững 4 thuộc tính cấu thành ndarray: Data Pointer, Shape, Dtype và Strides.',
            'Giải thích được cách NumPy tính toán vị trí byte trong RAM thông qua strides.'
          ],
          intuition: {
            title: 'Hộp bánh kẹo rải rác vs Khay đá viên nguyên khối',
            metaphor: 'Một danh sách Python list [1, 2, 3] giống như một hộp đựng các mẩu giấy ghi địa chỉ dẫn đến các ngăn tủ rải rác khắp căn nhà (mỗi phần tử là một PyObject độc lập mang header 28 bytes chứa refcount, type pointer). Khi CPU muốn đọc 1 triệu số, nó phải chạy đi chạy lại khắp bộ nhớ RAM (gây cache miss liên tục). Ngược lại, NumPy ndarray giống như một khay đá viên đông lạnh nguyên khối: một dải ô nhớ đồng nhất, kích thước cố định, nằm sát cạnh nhau thành một dải liên tục (C-contiguous). CPU chỉ cần nạp cả khối vào bộ đệm L1/L2 Cache và xử lý cực nhanh bằng các tập lệnh SIMD của phần cứng.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🧠 So sánh Cấu trúc Bộ nhớ trong RAM</div>
                <div style="margin-bottom: 12px;">
                  <strong style="color:var(--danger, #ef4444);">1. Python List (Mảng con trỏ rời rạc):</strong>
                  <div style="font-size:0.84rem;color:var(--text-muted);margin:4px 0;">[PyObject*] ➔ Trỏ tới các đối tượng PyLongObject nằm phân tán ngẫu nhiên trong heap</div>
                  <div class="memory-block-diagram">
                    <div class="memory-cell" style="background:#fee2e2;border-color:#f87171;">Ptr 0 ➔</div>
                    <div class="memory-cell" style="background:#fee2e2;border-color:#f87171;">Ptr 1 ➔</div>
                    <div class="memory-cell" style="background:#fee2e2;border-color:#f87171;">Ptr 2 ➔</div>
                    <span style="font-size:0.8rem;color:var(--text-muted);padding-left:8px;">Mỗi số tốn ~28 bytes + 8 bytes con trỏ = 36 bytes/số!</span>
                  </div>
                </div>
                <div>
                  <strong style="color:var(--topic-data);">2. NumPy ndarray (Khối C-Contiguous Buffer):</strong>
                  <div style="font-size:0.84rem;color:var(--text-muted);margin:4px 0;">Vùng nhớ liên tục (Raw byte buffer), không header trên từng phần tử</div>
                  <div class="memory-block-diagram">
                    <div class="memory-cell highlight">10 (4B)<span class="memory-cell-meta">Offset 0</span></div>
                    <div class="memory-cell highlight">20 (4B)<span class="memory-cell-meta">Offset 4</span></div>
                    <div class="memory-cell highlight">30 (4B)<span class="memory-cell-meta">Offset 8</span></div>
                    <div class="memory-cell highlight">40 (4B)<span class="memory-cell-meta">Offset 12</span></div>
                    <span style="font-size:0.8rem;color:var(--topic-data);font-weight:700;padding-left:8px;">int32 chỉ tốn đúng 4 bytes/số! Nhanh gấp hàng chục lần.</span>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-np-why',
              title: '1. Vấn đề của Python thuần túy với Tính toán Khoa học & Cơ chế SIMD',
              content: `
                <p>Tại sao chúng ta không thể dùng <code>list</code> của Python để tính toán 10 triệu điểm dữ liệu? Hãy xem xét 3 rào cản chí mạng:</p>
                <ul>
                  <li><strong>Lãng phí bộ nhớ khủng khiếp:</strong> Mỗi số nguyên trong Python là một đối tượng C <code>PyLongObject</code> chứa metadata kích thước, cờ tham chiếu và giá trị, ngốn từ 28 đến 36 bytes. Trong khi đó, chuẩn phần cứng máy tính chỉ cần đúng 4 bytes (32-bit) hoặc 8 bytes (64-bit) để lưu một số.</li>
                  <li><strong>Cache Miss liên tục:</strong> Vì list Python chỉ lưu con trỏ (pointers), các con trỏ này trỏ đến các địa chỉ bộ nhớ phân tán ngẫu nhiên trong RAM. CPU không thể tận dụng cơ chế nạp trước dòng nhớ 64-byte (prefetching) của L1/L2 Cache.</li>
                  <li><strong>Type-checking Overhead trong vòng lặp:</strong> Trong vòng lặp <code>for x in lst: total += x</code>, tại mỗi bước lặp trình thông dịch Python đều phải kiểm tra kiểu của <code>x</code>, tìm phương thức cộng <code>__add__</code> tương ứng và giải nén giá trị số, gây chậm trễ hàng chục lần.</li>
                  <li><strong>Khai thác Tập lệnh SIMD phần cứng:</strong> Nhờ buffer đồng nhất và liên tục, NumPy biên dịch sẵn các phép toán bằng C/Fortran để tận dụng tập lệnh SIMD (Single Instruction, Multiple Data) của CPU như AVX2 (thanh ghi 256-bit xử lý đồng thời 8 số float32 hoặc 4 số float64 trong đúng 1 chu kỳ xung nhịp) hoặc AVX-512 (thanh ghi 512-bit xử lý 16 số float32 cùng lúc). Khi kích thước mảng vượt quá dung lượng L3 Cache (vài chục MB), tốc độ tính toán sẽ chuyển từ trạng thái Compute-Bound sang Memory-Bandwidth-Bound (nghẽn băng thông bus RAM).</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Đo lường thời gian và bộ nhớ: Python List vs NumPy ndarray',
                  lang: 'Python',
                  code: `import numpy as np
import time
import sys

# Khởi tạo 1 triệu số nguyên
N = 1_000_000

# 1. Thử nghiệm với Python List
t0 = time.perf_counter()
py_list = [i * 2 for i in range(N)]
t_list = time.perf_counter() - t0

# 2. Thử nghiệm với NumPy ndarray (Vectorization)
t0 = time.perf_counter()
np_arr = np.arange(N, dtype=np.int32) * 2
t_np = time.perf_counter() - t0

# Đo lường bộ nhớ thuần của mảng số
mem_list = sys.getsizeof(py_list) + sum(sys.getsizeof(x) for x in py_list[:1000]) * 1000
mem_np = np_arr.nbytes

print(f"Thời gian List:   {t_list * 1000:.2f} ms")
print(f"Thời gian NumPy:  {t_np * 1000:.2f} ms (Nhanh gấp ~{t_list/t_np:.1f} lần)")
print(f"Dung lượng NumPy: {mem_np / 1024 / 1024:.2f} MB (Chỉ tốn đúng 4MB cho 1M số int32)")`,
                  output: `Thời gian List:   68.84 ms
Thời gian NumPy:  2.97 ms (Nhanh gấp ~23.2 lần)
Dung lượng NumPy: 3.81 MB (Chỉ tốn đúng 4MB cho 1M số int32)`,
                  annotations: [
                    { line: 15, text: 'Phép toán nhân vô hướng thực thi ở tầng C, không chạy qua vòng lặp thông dịch Python.' },
                    { line: 20, text: 'np_arr.nbytes trả về số byte thực tế của toàn bộ mảng dữ liệu thô.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-np-anatomy',
              title: '2. Giải phẫu Bản chất ndarray: 4 Trụ Cột',
              content: `
                <p>Một đối tượng <code>np.ndarray</code> thực chất chỉ là một <strong>bộ điều khiển mỏng (thin wrapper)</strong> bao bọc một khối bộ nhớ thô. Cụ thể gồm 4 thuộc tính cốt lõi:</p>
                <ol>
                  <li><strong>Data Pointer (Con trỏ dữ liệu):</strong> Địa chỉ bộ nhớ bắt đầu của mảng byte liên tục trong RAM.</li>
                  <li><strong>dtype (Data Type):</strong> Mô tả kiểu dữ liệu và số byte của từng phần tử (ví dụ <code>np.int32</code> tốn 4 bytes, <code>np.float64</code> tốn 8 bytes). Mọi phần tử trong ndarray BẮT BUỘC phải cùng kiểu (homogeneous).</li>
                  <li><strong>shape (Kích thước các chiều):</strong> Một tuple số nguyên xác định số phần tử dọc theo mỗi trục (axis), ví dụ <code>(2, 3)</code> nghĩa là 2 hàng và 3 cột.</li>
                  <li><strong>strides (Bước nhảy byte):</strong> Một tuple số nguyên cho biết <em>cần nhảy bao nhiêu byte trong bộ nhớ vật lý</em> để di chuyển đến phần tử tiếp theo dọc theo mỗi trục!</li>
                </ol>
                <p>Công thức kỳ diệu của strides: Để truy cập phần tử <code>arr[i, j]</code> của ma trận 2D có strides <code>(s0, s1)</code>, vị trí byte tương đối trong RAM được tính tức thì bằng: <code>offset = i * s0 + j * s1</code> mà không cần duyệt hay tìm kiếm.</p>
              `,
              codeExamples: [
                {
                  title: 'Khảo sát cấu trúc nội tại: Shape, Dtype và Strides',
                  lang: 'Python',
                  code: `import numpy as np

# Tạo ma trận 2 hàng, 3 cột với kiểu int32 (mỗi số 4 bytes)
b = np.array([[10, 20, 30],
              [40, 50, 60]], dtype=np.int32)

print("Shape (Kích thước):", b.shape)
print("Dtype (Kiểu dữ liệu):", b.dtype)
print("Itemsize (Byte mỗi phần tử):", b.itemsize)
print("Strides (Bước nhảy byte):", b.strides)

# Giải thích strides (12, 4):
# - Để sang hàng tiếp theo (i+1): nhảy 3 phần tử * 4 bytes = 12 bytes
# - Để sang cột tiếp theo (j+1): nhảy 1 phần tử * 4 bytes = 4 bytes`,
                  output: `Shape (Kích thước): (2, 3)
Dtype (Kiểu dữ liệu): int32
Itemsize (Byte mỗi phần tử): 4
Strides (Bước nhảy byte): (12, 4)`,
                  annotations: [
                    { line: 11, text: 'Strides (12, 4) cho biết CPU cần cộng 12 bytes vào con trỏ để xuống hàng dưới, cộng 4 bytes để sang cột kế.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy tự động ép kiểu thành object dtype khi danh sách không đồng nhất',
                content: 'Nếu bạn vô tình đưa một chuỗi ký tự hoặc None vào mảng số: np.array([1, 2, "3"]), NumPy sẽ tự động ép dtype thành kiểu chuỗi hoặc object. Khi dtype là object, mảng quay trở lại lưu con trỏ PyObject và mất hoàn toàn lợi thế tốc độ của vectorization!'
              }
            ],
            tips: [
              {
                title: 'Chọn đúng dtype để tiết kiệm bộ nhớ',
                content: 'Nếu dữ liệu của bạn là điểm số từ 0 đến 100, hãy dùng np.uint8 (1 byte/số) thay vì mặc định np.int64 (8 bytes/số). Mảng của bạn sẽ giảm dung lượng tới 8 lần và chạy nhanh hơn đáng kể nhờ vừa vặn hơn trong CPU Cache.'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'Tính toán Strides thủ công và Kiểm chứng với NumPy',
              problem: 'Cho một mảng 3D có shape là (2, 3, 4) và dtype là np.float64 (8 bytes mỗi phần tử). Mảng được lưu theo thứ tự hàng liên tục (C-order). Hãy tính nhẩm strides của mảng này là bao nhiêu, sau đó viết code NumPy kiểm tra lại.',
              hint: 'Trục cuối cùng (cột) bước nhảy là itemsize (8). Trục giữa bước nhảy là số cột * 8. Trục đầu tiên bước nhảy là số hàng * số cột * 8.',
              solutionCode: `import numpy as np

# Tạo mảng mẫu 3D
arr = np.zeros((2, 3, 4), dtype=np.float64)

# Tính nhẩm:
# Trục 2: 1 phần tử = 8 bytes
# Trục 1: 4 phần tử * 8 = 32 bytes
# Trục 0: 3 * 4 * 8 = 96 bytes
print("Strides tính toán:", (96, 32, 8))
print("Strides thực tế từ NumPy:", arr.strides)
assert arr.strides == (96, 32, 8), "Tính toán chưa chính xác!"`,
              solutionOutput: `Strides tính toán: (96, 32, 8)
Strides thực tế từ NumPy: (96, 32, 8)`,
              explanation: 'Trong quy ước C-order (row-major), trục sau cùng di chuyển nhanh nhất (8 bytes/bước). Mỗi khi tiến 1 đơn vị trên trục 1, ta nhảy qua 4 phần tử float64 (4 * 8 = 32 bytes). Mỗi khi tiến 1 đơn vị trên trục 0, ta nhảy qua cả một mặt phẳng gồm 3 * 4 = 12 phần tử (12 * 8 = 96 bytes).',
              annotations: [
                { line: 10, text: 'Kiểm tra bằng assert để đảm bảo hiểu sâu cơ chế tính địa chỉ byte.' }
              ]
            }
          ],
          summary: [
            'Python List tốn từ 28-36 byte cho mỗi số và gây cache miss vì con trỏ phân tán trong RAM.',
            'NumPy ndarray là khối bộ nhớ liên tục (contiguous buffer) với kiểu dữ liệu đồng nhất (homogeneous).',
            '4 thuộc tính định nghĩa ndarray: Data pointer, dtype, shape và strides.',
            'Strides là chiếc chìa khóa tối ưu: cho phép biến đổi hình dạng và cắt lát dữ liệu mà không cần sao chép bộ nhớ.'
          ]
        },
        {
          id: 'ai-np-02',
          number: '1.2',
          title: 'Vectorization & Broadcasting: Sức mạnh Tính toán Song song Cốt lõi',
          subtitle: 'Hiểu đúng Universal Functions (ufunc), bản chất axis và 3 quy tắc vàng của Broadcasting',
          level: 'Cơ bản',
          duration: '40 phút',
          objectives: [
            'Hiểu bản chất kỹ thuật của Vectorization và tại sao nó loại bỏ hoàn toàn vòng lặp Python.',
            'Nắm vững khái niệm ufunc (Universal Function) và các phương thức rút gọn theo axis.',
            'Làm rõ trực giác về trục (axis 0 vs axis 1): trục nào bị triệt tiêu sau phép thu gọn.',
            'Làm chủ 3 quy tắc vàng của Broadcasting và hình dung cơ chế strides = 0 không tốn RAM.'
          ],
          intuition: {
            title: 'Dây chuyền lắp ráp công nghiệp vs Thợ thủ công đơn độc',
            metaphor: 'Vòng lặp for của Python giống như một người thợ thủ công cặm cụi mở từng chiếc hộp, lấy từng con ốc ra, vặn từng vòng rồi mới chuyển sang chiếc hộp tiếp theo. Vectorization trong NumPy giống như một nhà máy tự động hóa hoàn toàn: các con ốc chạy trên băng chuyền công nghiệp với tốc độ cao, cả một hàng 8 hoặc 16 con ốc được một cánh tay robot SIMD dập xuống cùng một tích tắc chu kỳ xung nhịp CPU. Còn Broadcasting giống như một máy chiếu hình ảnh: thay vì phải in ra hàng ngàn tờ giấy giống nhau (nhân bản dữ liệu tốn RAM), máy chiếu chỉ cần phóng to hình ảnh một chiếc thước kẻ phủ đều lên toàn bộ bảng dữ liệu mà không tốn thêm một gam giấy nào.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📐 Minh họa Cơ chế Broadcasting: Ma trận (3, 1) + Ma trận (1, 4) ➔ Ma trận (3, 4)</div>
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:12px 0;">
                  <div style="text-align:center;">
                    <div style="font-weight:700;color:var(--text-muted);font-size:0.8rem;margin-bottom:4px;">Shape (3, 1)</div>
                    <div class="memory-cell" style="margin-bottom:2px;">[ 1 ]</div>
                    <div class="memory-cell" style="margin-bottom:2px;">[ 2 ]</div>
                    <div class="memory-cell">[ 3 ]</div>
                  </div>
                  <div style="font-size:1.5rem;font-weight:700;color:var(--topic-data);">+</div>
                  <div style="text-align:center;">
                    <div style="font-weight:700;color:var(--text-muted);font-size:0.8rem;margin-bottom:4px;">Shape (1, 4)</div>
                    <div style="display:flex;gap:2px;">
                      <div class="memory-cell">[ 10 ]</div>
                      <div class="memory-cell">[ 20 ]</div>
                      <div class="memory-cell">[ 30 ]</div>
                      <div class="memory-cell">[ 40 ]</div>
                    </div>
                  </div>
                  <div style="font-size:1.5rem;font-weight:700;color:var(--topic-data);">=</div>
                  <div style="text-align:center;">
                    <div style="font-weight:700;color:var(--topic-data);font-size:0.8rem;margin-bottom:4px;">Kết quả Shape (3, 4)</div>
                    <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:2px;">
                      <div class="memory-cell highlight">11</div><div class="memory-cell highlight">21</div><div class="memory-cell highlight">31</div><div class="memory-cell highlight">41</div>
                      <div class="memory-cell highlight">12</div><div class="memory-cell highlight">22</div><div class="memory-cell highlight">32</div><div class="memory-cell highlight">42</div>
                      <div class="memory-cell highlight">13</div><div class="memory-cell highlight">23</div><div class="memory-cell highlight">33</div><div class="memory-cell highlight">43</div>
                    </div>
                  </div>
                </div>
                <div style="font-size:0.82rem;color:var(--text-muted);">NumPy không hề tạo bản sao bộ nhớ; nó đặt stride của trục có chiều dài 1 về giá trị 0 (tái sử dụng ô nhớ)!</div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-np-ufunc-axis',
              title: '1. Universal Functions (ufunc) và Hiểu đúng bản chất của Axis',
              content: `
                <p>Một <strong>ufunc</strong> là một hàm hoạt động trên ndarray theo từng phần tử (element-by-element). Không chỉ hỗ trợ các phép toán cơ bản (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>np.exp</code>, <code>np.sin</code>), ufunc còn đi kèm các phương thức mạnh mẽ:</p>
                <ul>
                  <li><code>ufunc.reduce()</code>: Rút gọn mảng theo một trục (ví dụ <code>np.add.reduce(arr)</code> chính là <code>np.sum(arr)</code>).</li>
                  <li><code>ufunc.accumulate()</code>: Tính tổng tích lũy (ví dụ <code>np.cumsum</code>).</li>
                  <li><code>ufunc.outer()</code>: Áp dụng phép toán lên mọi cặp phần tử khả dĩ (nhân ngoài ma trận).</li>
                </ul>
                <p><strong>Hiểu đúng tham số <code>axis</code>:</strong> Sai lầm phổ biến nhất của người mới học là nghĩ <em>"axis=0 là thao tác trên hàng, axis=1 là thao tác trên cột"</em>. Cách hiểu đúng là:</p>
                <div style="background:var(--bg-surface);padding:10px 14px;border-left:4px solid var(--topic-data);margin:10px 0;border-radius:4px;">
                  <strong>Quy tắc vàng về Axis:</strong> Tham số <code>axis</code> chỉ định <em>trục nào sẽ bị nén (sụp đổ / triệt tiêu)</em> trong phép tính!
                  <br>• Khi tính <code>arr.sum(axis=0)</code> trên ma trận shape (3, 4): Chiều 0 bị ép lại, kết quả còn lại shape (4,) (tổng từng cột).
                  <br>• Khi tính <code>arr.sum(axis=1)</code> trên ma trận shape (3, 4): Chiều 1 bị ép lại, kết quả còn lại shape (3,) (tổng từng hàng).
                </div>
              `,
              codeExamples: [
                {
                  title: 'Thực hành các phép toán theo Axis và ufunc reduce',
                  lang: 'Python',
                  code: `import numpy as np

# Tạo ma trận 3 hàng, 4 cột
X = np.array([[1, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10, 11, 12]])

# 1. Tính tổng theo axis=0 (triệt tiêu hàng -> tính tổng theo từng cột)
col_sum = X.sum(axis=0)

# 2. Tính giá trị trung bình theo axis=1 (triệt tiêu cột -> tính TB từng hàng)
row_mean = X.mean(axis=1)

print("X shape:           ", X.shape)
print("Tổng axis=0 (cột): ", col_sum, "-> Shape:", col_sum.shape)
print("TB axis=1 (hàng):  ", row_mean, "-> Shape:", row_mean.shape)`,
                  output: `X shape:            (3, 4)
Tổng axis=0 (cột):  [15 18 21 24] -> Shape: (4,)
TB axis=1 (hàng):   [ 2.5  6.5 10.5] -> Shape: (3,)`,
                  annotations: [
                    { line: 9, text: 'axis=0 loại bỏ chiều đầu tiên (3), kết quả còn chiều (4).' },
                    { line: 12, text: 'axis=1 loại bỏ chiều thứ hai (4), kết quả còn chiều (3).' }
                  ]
                }
              ]
            },
            {
              id: 'sec-np-broadcasting',
              title: '2. Cơ chế Broadcasting: 3 Quy tắc Vàng',
              content: `
                <p>Broadcasting mô tả cách NumPy thực hiện các phép toán giữa các mảng có hình dạng (shape) khác nhau. Thay vì báo lỗi, NumPy tự động mở rộng mảng nhỏ hơn để khớp với mảng lớn hơn.</p>
                <p>Để xác định hai mảng có tương thích broadcasting hay không, NumPy <strong>so sánh các chiều từ PHẢI sang TRÁI (từ chiều cuối cùng ngược về chiều đầu tiên)</strong> theo 3 quy tắc:</p>
                <ol>
                  <li>Nếu hai mảng có số chiều khác nhau, mảng có số chiều ít hơn sẽ được đệm thêm các chiều có kích thước là <code>1</code> vào <em>phía bên trái</em>.</li>
                  <li>Tại mỗi chiều so sánh (từ phải sang trái), hai chiều được coi là tương thích nếu: <strong>(a) Chúng bằng nhau</strong>, HOẶC <strong>(b) Một trong hai chiều có kích thước bằng 1</strong>.</li>
                  <li>Nếu ở bất kỳ chiều nào hai số khác nhau và không có số nào bằng 1, NumPy lập tức quăng lỗi <code>ValueError: operands could not be broadcast together</code>!</li>
                </ol>
                <p><em>Kỹ thuật bên dưới bộ nhớ:</em> Khi một chiều có kích thước 1 được mở rộng, NumPy không hề sao chép dữ liệu trong RAM. Nó chỉ đặt bước nhảy <code>stride = 0</code> trên trục đó. Khi CPU duyệt qua trục này, con trỏ dữ liệu không dịch chuyển mà tái sử dụng luôn phần tử cũ!</p>
              `,
              codeExamples: [
                {
                  title: 'Áp dụng Broadcasting: Chuẩn hóa dữ liệu ma trận (Z-score Normalization)',
                  lang: 'Python',
                  code: `import numpy as np

# Giả sử có 4 mẫu dữ liệu, mỗi mẫu có 3 đặc trưng (shape: 4, 3)
data = np.array([[10.0, 200.0, 1.2],
                 [12.0, 180.0, 1.5],
                 [15.0, 220.0, 1.1],
                 [11.0, 190.0, 1.4]])

# 1. Tính giá trị trung bình của từng đặc trưng (shape: 3,)
mean = data.mean(axis=0)

# 2. Tính độ lệch chuẩn của từng đặc trưng (shape: 3,)
std = data.std(axis=0)

# 3. Chuẩn hóa: (4, 3) - (3,) -> (3,) tự động broadcast thành (1, 3) rồi (4, 3)
normalized = (data - mean) / std

print("Data shape:       ", data.shape)
print("Mean shape:       ", mean.shape)
print("Normalized shape: ", normalized.shape)
print("Trung bình sau chuẩn hóa (gần bằng 0):", np.round(normalized.mean(axis=0), 4))`,
                  output: `Data shape:        (4, 3)
Mean shape:        (3,)
Normalized shape:  (4, 3)
Trung bình sau chuẩn hóa (gần bằng 0): [-0.  0. -0.]`,
                  annotations: [
                    { line: 16, text: 'mean có shape (3,) được tự động khớp với data shape (4, 3) theo chiều cột.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Nhầm lẫn giữa mảng 1D (N,) và ma trận cột (N, 1)',
                content: 'Mảng shape (N,) trong NumPy là mảng 1D không có khái niệm hàng hay cột. Khi bạn muốn trừ một vector cột khỏi ma trận (N, M), vector shape (N,) sẽ gây lỗi hoặc broadcast sai thành phép toán trên hàng! Hãy dùng arr[:, np.newaxis] hoặc arr.reshape(-1, 1) để tạo tường minh ma trận cột shape (N, 1).'
              }
            ],
            tips: [
              {
                title: 'Khi nào Vectorization không nhanh bằng vòng lặp?',
                content: 'Với các mảng kích thước cực nhỏ (< 100 phần tử), chi phí gọi hàm C (function call overhead) của NumPy có thể lớn hơn thời gian thực thi mã Python thuần túy. Ngoài ra, các thuật toán đệ quy hoặc có logic phân nhánh if-else phức tạp phụ thuộc vào trạng thái bước trước cũng không thể vectorize trực tiếp.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Tính Ma trận Khoảng cách Euclidean giữa các cặp điểm bằng Broadcasting',
              problem: 'Cho một mảng A gồm 3 điểm 2D (shape: 3, 2) và mảng B gồm 4 điểm 2D (shape: 4, 2). Hãy dùng cơ chế Broadcasting (không dùng bất kỳ vòng lặp nào) để tính ma trận khoảng cách dist[i, j] là khoảng cách Euclidean giữa điểm A[i] và điểm B[j]. Kết quả phải có shape là (3, 4).',
              hint: 'Biến đổi A thành shape (3, 1, 2) và B thành shape (1, 4, 2). Khi trừ cho nhau, kết quả sẽ có shape (3, 4, 2). Sau đó bình phương, tính tổng theo axis=-1 và lấy căn bậc hai.',
              solutionCode: `import numpy as np

A = np.array([[0, 0], [1, 1], [2, 2]])  # (3, 2)
B = np.array([[0, 1], [1, 0], [2, 1], [3, 3]])  # (4, 2)

# Mở rộng chiều: A -> (3, 1, 2), B -> (1, 4, 2)
diff = A[:, np.newaxis, :] - B[np.newaxis, :, :]  # shape: (3, 4, 2)

# Tính khoảng cách Euclidean
dist_matrix = np.sqrt(np.sum(diff**2, axis=-1))  # shape: (3, 4)

print("Shape ma trận khoảng cách:", dist_matrix.shape)
print("Khoảng cách từ A[0] (0,0) tới B:", np.round(dist_matrix[0], 2))`,
              solutionOutput: `Shape ma trận khoảng cách: (3, 4)
Khoảng cách từ A[0] (0,0) tới B: [1.   1.   2.24 4.24]`,
              explanation: 'Bằng cách biến A thành (3, 1, 2) và B thành (1, 4, 2), phép trừ diff thực hiện trên từng cặp điểm (3, 4). Trục cuối cùng kích thước 2 là tọa độ (x, y). Lấy tổng bình phương trên axis=-1 rồi căn bậc hai cho ra chính xác khoảng cách giữa mọi cặp điểm chỉ trong 1 dòng code.',
              annotations: [
                { line: 7, text: 'np.newaxis thêm một chiều mới có kích thước 1 để kích hoạt broadcasting đa chiều.' }
              ]
            }
          ],
          summary: [
            'Vectorization đẩy toàn bộ vòng lặp xuống tầng máy tính biên dịch C/SIMD.',
            'Axis chỉ định trục nào bị triệt tiêu/nén lại sau phép toán rút gọn.',
            'Broadcasting so sánh shape từ phải sang trái: tương thích khi bằng nhau hoặc có một chiều bằng 1.',
            'NumPy tận dụng stride = 0 khi broadcast, không nhân bản dữ liệu và không tiêu tốn thêm RAM.'
          ]
        },
        {
          id: 'ai-np-03',
          number: '1.3',
          title: 'Chỉ mục Chuyên sâu: Phân định Tuyệt đối View vs Copy & Thứ tự Bộ nhớ',
          subtitle: 'Làm chủ Basic Slicing (View) vs Fancy/Boolean Indexing (Copy), C-Order vs Fortran-Order',
          level: 'Trung cấp',
          duration: '35 phút',
          objectives: [
            'Phân biệt tuyệt đối giữa View (chia sẻ chung vùng nhớ) và Copy (nhân bản mảng mới độc lập).',
            'Biết cách kiểm chứng bộ nhớ bằng thuộc tính .base và hàm np.shares_memory().',
            'Hiểu sự khác biệt về lưu trữ: C-contiguous (hàng liên tục) vs Fortran-contiguous (cột liên tục).',
            'Nắm vững hành vi của reshape, flatten vs ravel, concatenate và stack.'
          ],
          intuition: {
            title: 'Khung cửa sổ kính soi vs Bức ảnh chụp in ra giấy',
            metaphor: 'Khi bạn mở một chiếc khung cửa sổ kính nhìn vào một khu vườn, bạn nhìn thấy các bông hoa (Basic Slicing tạo View). Nếu ai đó xịt sơn lên bông hoa thật ngoài vườn, bạn nhìn qua khung cửa sổ cũng thấy bông hoa bị dính sơn. Chiếc cửa sổ không tạo ra một khu vườn mới mà chỉ là một góc nhìn khác vào khu vườn cũ. Ngược lại, nếu bạn cầm máy ảnh chụp lại khu vườn rồi in ra giấy (Fancy Indexing tạo Copy), thì bức ảnh trên tay bạn là một vật thể hoàn toàn độc lập trong túi bạn. Bạn có dùng bút vẽ bậy lên bức ảnh thì khu vườn ngoài đời thực cũng không hề hấn gì.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🔍 Bản đồ Bộ nhớ: View vs Copy</div>
                <div class="eco-grid">
                  <div class="eco-card" style="border-left:4px solid var(--topic-data);">
                    <div class="eco-card-header">
                      <span class="eco-card-title">VIEW (Chia sẻ Buffer)</span>
                      <span class="eco-card-tag" style="background:#dcfce7;color:#166534;">Zero-Copy</span>
                    </div>
                    <div class="eco-card-desc">
                      Sinh ra bởi: <code>arr[1:4]</code>, <code>arr.reshape()</code>, <code>arr.T</code>, <code>arr.ravel()</code>.<br>
                      Đặc điểm: Cùng trỏ vào 1 data pointer gốc, chỉ khác <code>shape</code> và <code>strides</code>.<br>
                      <strong>Thay đổi giá trị view ➔ Mảng gốc bị thay đổi ngay lập tức!</strong>
                    </div>
                  </div>
                  <div class="eco-card" style="border-left:4px solid #ef4444;">
                    <div class="eco-card-header">
                      <span class="eco-card-title">COPY (Cấp phát Buffer mới)</span>
                      <span class="eco-card-tag" style="background:#fee2e2;color:#991b1b;">Tốn thêm RAM</span>
                    </div>
                    <div class="eco-card-desc">
                      Sinh ra bởi: <code>arr[[0, 2]]</code> (Fancy Index), <code>arr[arr &gt; 5]</code> (Boolean Mask), <code>arr.flatten()</code>, <code>arr.copy()</code>.<br>
                      Đặc điểm: Cấp phát một vùng nhớ hoàn toàn mới trong RAM.<br>
                      <strong>Thay đổi giá trị copy ➔ Hoàn toàn không ảnh hưởng mảng gốc.</strong>
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-np-view-copy',
              title: '1. Nhận diện và Kiểm tra View vs Copy bằng Mã nguồn',
              content: `
                <p>Một trong những nguyên nhân phổ biến nhất gây ra lỗi âm thầm (silent bugs) trong các dự án dữ liệu là sửa đổi một biến mà không biết rằng nó đang chia sẻ bộ nhớ với một biến khác.</p>
                <p>Để kiểm tra hai mảng có chung bộ nhớ hay không, NumPy cung cấp 2 công cụ chuẩn xác:</p>
                <ul>
                  <li><code>mảng.base</code>: Nếu mảng là một <strong>View</strong>, thuộc tính <code>.base</code> sẽ trỏ tới đối tượng mảng gốc đã cấp phát bộ nhớ. Nếu mảng là chủ sở hữu bộ nhớ (hoặc là Copy), <code>.base</code> sẽ trả về <code>None</code>.</li>
                  <li><code>np.shares_memory(a, b)</code>: Trả về <code>True</code> nếu hai mảng chia sẻ bất kỳ byte bộ nhớ nào.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực nghiệm phân biệt Basic Slicing (View) và Fancy Indexing (Copy)',
                  lang: 'Python',
                  code: `import numpy as np

# Tạo mảng gốc
goc = np.array([10, 20, 30, 40, 50])

# 1. Basic Slicing -> TẠO VIEW
view_arr = goc[1:4]
print("view_arr.base is goc:", view_arr.base is goc)  # True
print("np.shares_memory:", np.shares_memory(goc, view_arr))  # True

# Sửa giá trị trên view
view_arr[0] = 999
print("Mảng gốc sau khi sửa view:", goc)  # Phần tử số 20 đã biến thành 999!

# 2. Fancy Indexing (dùng danh sách chỉ mục) -> TẠO COPY
goc2 = np.array([10, 20, 30, 40, 50])
copy_arr = goc2[[1, 2, 3]]
print("\ncopy_arr.base is None:", copy_arr.base is None)  # True
print("np.shares_memory:", np.shares_memory(goc2, copy_arr))  # False

# Sửa giá trị trên copy
copy_arr[0] = 888
print("Mảng goc2 sau khi sửa copy:", goc2)  # goc2 hoàn toàn nguyên vẹn!`,
                  output: `view_arr.base is goc: True
np.shares_memory: True
Mảng gốc sau khi sửa view: [ 10 999  30  40  50]

copy_arr.base is None: True
np.shares_memory: False
Mảng goc2 sau khi sửa copy: [10 20 30 40 50]`,
                  annotations: [
                    { line: 12, text: 'Sửa view làm thay đổi mảng gốc ngay lập tức vì cùng chung một data pointer trong RAM.' },
                    { line: 22, text: 'Copy hoàn toàn độc lập, thay đổi trên nó không ảnh hưởng mảng ban đầu.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-np-memory-order',
              title: '2. Thứ tự Bộ nhớ C-Order vs Fortran-Order và Định hình lại (Reshape)',
              content: `
                <p>Một ma trận 2D được trải phẳng ra dải RAM 1D theo thứ tự nào? Có 2 tiêu chuẩn công nghiệp:</p>
                <ul>
                  <li><strong>C-Order (Row-Major):</strong> Tiêu chuẩn của ngôn ngữ C/C++ và Python. Các phần tử trong cùng một hàng nằm sát nhau trong RAM. Khi duyệt theo hàng, tốc độ là nhanh nhất.</li>
                  <li><strong>Fortran-Order (Column-Major):</strong> Tiêu chuẩn của ngôn ngữ Fortran và MATLAB/R. Các phần tử trong cùng một cột nằm sát nhau trong RAM.</li>
                </ul>
                <p><strong>flatten() vs ravel():</strong></p>
                <ul>
                  <li><code>arr.flatten()</code>: Luôn tạo ra một bản sao (Copy) mới độc lập trong bộ nhớ.</li>
                  <li><code>arr.ravel()</code>: Trả về một View phẳng nếu dữ liệu gốc là contiguous trong bộ nhớ; chỉ tạo copy khi bắt buộc. Vì vậy <code>ravel()</code> nhanh hơn và tiết kiệm RAM hơn.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực nghiệm Benchmark Bộ nhớ: C-order vs Fortran-order và L1 Cache Miss',
                  lang: 'Python',
                  code: `import numpy as np
import time

# Tạo ma trận C-order và Fortran-order kích thước 5000 x 5000 (khoảng 200MB RAM mỗi mảng)
N = 5000
c_arr = np.ones((N, N), dtype=np.float64, order='C')
f_arr = np.ones((N, N), dtype=np.float64, order='F')

print("c_arr strides:", c_arr.strides)  # (40000, 8) -> các phần tử trong 1 hàng nằm liên tục nhau 8 bytes
print("f_arr strides:", f_arr.strides)  # (8, 40000) -> các phần tử trong 1 cột nằm liên tục nhau

# Đo thời gian duyệt theo hàng trên mảng C-order (truy cập liên tục bộ nhớ)
t0 = time.perf_counter()
res_c = [np.sum(row) for row in c_arr]
t_c = time.perf_counter() - t0

# Đo thời gian duyệt theo hàng trên mảng Fortran-order (mỗi bước nhảy 40000 bytes -> L1 Cache Miss liên tục)
t0 = time.perf_counter()
res_f = [np.sum(row) for row in f_arr]
t_f = time.perf_counter() - t0

print(f"Duyệt theo hàng trên C-order: {t_c*1000:.2f} ms")
print(f"Duyệt theo hàng trên F-order: {t_f*1000:.2f} ms")
print(f"Chênh lệch: F-order chậm hơn xấp xỉ {t_f/t_c:.1f} lần do L1/L2 Cache Miss!")`,
                  output: `c_arr strides: (40000, 8)
f_arr strides: (8, 40000)
Duyệt theo hàng trên C-order: 48.29 ms
Duyệt theo hàng trên F-order: 150.98 ms
Chênh lệch: F-order chậm hơn xấp xỉ 3.1 lần do L1/L2 Cache Miss!`,
                  annotations: [
                    { line: 8, text: 'c_arr có stride cột là 8 bytes (liên tục). Mỗi dòng nạp sẵn cả Cache Line 64 bytes.' },
                    { line: 9, text: 'f_arr có stride hàng lên tới 40,000 bytes. Mỗi lần đọc 1 số float64 phải lãng phí 56 bytes còn lại của Cache line.' },
                    { line: 22, text: 'Tốc độ chênh lệch hơn 3 lần chỉ vì thứ tự bố trí các byte trong thanh RAM vật lý!' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy kết hợp Slicing và Fancy Indexing',
                content: 'Khi bạn kết hợp cả basic slice và fancy index (ví dụ: arr[1:3, [0, 2]]), kết quả LUÔN LUÔN là một Copy. Đừng bao giờ gán dữ liệu qua cách này với hy vọng cập nhật mảng gốc!'
              }
            ],
            tips: [
              {
                title: 'Ưu tiên dùng ravel() thay vì flatten()',
                content: 'Trong các thuật toán Machine Learning hoặc xử lý hình ảnh, hãy dùng .ravel() khi cần làm phẳng mảng ảnh 2D thành vector 1D để tránh lãng phí RAM cấp phát mảng mới.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Tạo View đảo ngược ma trận không tốn RAM',
              problem: 'Cho một ma trận 2D M. Không dùng hàm np.copy(), hãy tạo một ma trận mới M_flipped lật ngược cả theo chiều dọc lẫn chiều ngang (đảo hàng và đảo cột). Kiểm tra xem M_flipped có phải là View của M hay không.',
              hint: 'Sử dụng bước nhảy âm trong cú pháp slice: arr[::-1, ::-1].',
              solutionCode: `import numpy as np

M = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

# Lật ngược cả 2 chiều bằng bước nhảy -1
M_flipped = M[::-1, ::-1]

print("Ma trận đảo ngược:\n", M_flipped)
print("M_flipped có phải là View?", M_flipped.base is M)
print("Strides của M gốc:    ", M.strides)
print("Strides của M_flipped:", M_flipped.strides)`,
              solutionOutput: `Ma trận đảo ngược:
 [[9 8 7]
 [6 5 4]
 [3 2 1]]
M_flipped có phải là View? True
Strides của M gốc:     (24, 8)
Strides của M_flipped: (-24, -8)`,
              explanation: 'Khi dùng bước nhảy -1, NumPy chỉ đơn giản đảo dấu của strides thành số âm (-24, -8) và dời con trỏ bắt đầu tới cuối mảng. Không có bất kỳ byte dữ liệu nào bị sao chép trong RAM!',
              annotations: [
                { line: 12, text: 'Strides âm chứng minh NumPy chỉ đảo hướng duyệt con trỏ trên vùng nhớ cũ.' }
              ]
            }
          ],
          summary: [
            'Basic Slicing tạo View (chia sẻ bộ nhớ gốc); sửa view làm thay đổi mảng gốc.',
            'Fancy Indexing và Boolean Masking luôn tạo Copy mới độc lập trong bộ nhớ.',
            'Kiểm tra view bằng arr.base hoặc np.shares_memory(a, b).',
            'C-order lưu liên tục theo hàng; Fortran-order lưu liên tục theo cột; strides âm cho phép lật mảng không tốn RAM.'
          ]
        },
        {
          id: 'ai-np-04',
          number: '1.4',
          title: 'Đại số Tuyến tính, Generator Số Ngẫu nhiên & Kỹ thuật Nâng cao',
          subtitle: 'Làm chủ np.linalg, np.random.default_rng(), Einstein Summation (einsum) và Bẫy Số thực IEEE 754',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Thành thạo các phép toán đại số tuyến tính lõi: matmul (@), solve, SVD, eigenvalues.',
            'Chuyển đổi từ API số ngẫu nhiên cũ sang Generator API hiện đại (np.random.default_rng).',
            'Hiểu bản chất phép co chỉ số Einstein với np.einsum để tối ưu hóa tính toán ma trận đa chiều.',
            'Hiểu rõ bẫy độ chính xác số thực IEEE 754 và kỹ thuật so sánh an toàn bằng np.isclose().'
          ],
          intuition: {
            title: 'Ký hiệu Einstein: Chiếc dao mổ đa năng của Đại số Đa chiều',
            metaphor: 'Nếu như các phép toán nhân ma trận np.dot, np.matmul, np.tensordot giống như những chiếc cờ lê chuyên dụng có kích cỡ cố định, thì np.einsum giống như một chiếc dao đa năng của người thợ máy thiên tài. Bằng cách viết ra các ký hiệu chỉ số (index notation) như "ij,jk->ik", bạn mô tả chính xác cách từng chiều dữ liệu tương tác và triệt tiêu lẫn nhau. CPU sẽ thực hiện toàn bộ quá trình nhân, chuyển vị và cộng dồn trong một vòng lặp C duy nhất mà không sinh ra bất kỳ ma trận trung gian nào làm tràn bộ nhớ.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚡ Minh họa np.einsum('ij,jk->ik', A, B)</div>
                <div style="font-family:var(--font-mono);font-size:0.9rem;line-height:1.6;color:var(--text-primary);padding:8px;background:var(--bg-surface);border-radius:4px;">
                  A có shape (i, j) ➔ B có shape (j, k)<br>
                  Chỉ số <strong>j</strong> xuất hiện ở cả 2 vế đầu vào nhưng biến mất ở vế đầu ra (->ik)<br>
                  ➔ <strong>j</strong> được tính tổng co lại (Summation Contracted): C[i, k] = ∑_j (A[i, j] * B[j, k])
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-np-linalg-rng',
              title: '1. Đại số Tuyến tính Hiện đại và Generator Số Ngẫu nhiên',
              content: `
                <p>Trong Python 3.5+, toán tử <code>@</code> được chính thức bổ sung vào ngữ pháp ngôn ngữ để làm toán tử nhân ma trận (tương đương <code>np.matmul</code>). Đừng bao giờ dùng toán tử <code>*</code> khi muốn nhân ma trận vì <code>*</code> là phép nhân từng phần tử (Hadamard product)!</p>
                <p><strong>Generator API Hiện đại (NumPy 1.17+):</strong> Trước đây chúng ta hay dùng <code>np.random.seed(42)</code> và <code>np.random.rand()</code>. Cách này sử dụng một bộ sinh số ngẫu nhiên toàn cục (global state) không an toàn khi chạy đa luồng. Chuẩn mực hiện đại khuyến nghị sử dụng <code>np.random.default_rng(seed)</code>:</p>
              `,
              codeExamples: [
                {
                  title: 'Thực hành Đại số tuyến tính và Generator API',
                  lang: 'Python',
                  code: `import numpy as np

# 1. Khởi tạo bộ sinh số ngẫu nhiên hiện đại với PCG64 algorithm
rng = np.random.default_rng(seed=2026)

# Sinh ma trận ngẫu nhiên 3x3 và vector 3x1
A = rng.normal(loc=0.0, scale=1.0, size=(3, 3))
b = rng.uniform(low=1.0, high=10.0, size=3)

# 2. Giải hệ phương trình tuyến tính A * x = b
# Thay vì tính nghịch đảo inv(A) @ b (chậm và kém chính xác), dùng solve:
x = np.linalg.solve(A, b)

# 3. Kiểm tra lại kết quả bằng toán tử @
b_reconstructed = A @ x

print("Nghiệm x của hệ PT:", np.round(x, 4))
print("Sai số tái tạo ||Ax - b||:", np.linalg.norm(A @ x - b))`,
                  output: `Nghiệm x của hệ PT: [-1.4502  4.2319  2.1105]
Sai số tái tạo ||Ax - b||: 4.440892098500626e-16`,
                  annotations: [
                    { line: 4, text: 'default_rng() là chuẩn mực mới thay thế cho np.random.seed() cũ.' },
                    { line: 12, text: 'np.linalg.solve dùng phân tích LU, ổn định số học hơn nhiều so với tính nghịch đảo ma trận.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-np-einsum-floats',
              title: '2. Ký hiệu Einstein (einsum) và Bẫy Số thực IEEE 754',
              content: `
                <p><strong>Ký hiệu Einstein (einsum):</strong> Cho phép thực hiện hầu như mọi phép toán ma trận chỉ với một chuỗi mô tả ngắn gọn:</p>
                <ul>
                  <li>Đường chéo ma trận (Trace): <code>np.einsum('ii->', A)</code></li>
                  <li>Chuyển vị (Transpose): <code>np.einsum('ij->ji', A)</code></li>
                  <li>Nhân ma trận: <code>np.einsum('ij,jk->ik', A, B)</code></li>
                  <li>Tính tổng ma trận 3D theo từng batch: <code>np.einsum('bij,bjk->bik', A, B)</code></li>
                </ul>
                <p><strong>Bẫy Độ chính xác Số thực (IEEE 754 Floating-point):</strong> Trong máy tính, các số thực dấu phẩy động 64-bit không thể biểu diễn chính xác tuyệt đối mọi phân số thập phân (ví dụ <code>0.1 + 0.2 != 0.3</code> vì bị làm tròn nhị phân). Khi trừ 2 số rất gần nhau, hiện tượng mất độ chính xác nghiêm trọng (Catastrophic Cancellation) xảy ra.</p>
                <div style="background:var(--bg-surface);padding:10px 14px;border-left:4px solid #ef4444;margin:10px 0;border-radius:4px;">
                  ⚠️ <strong>Cảnh báo:</strong> Tuyệt đối KHÔNG BAO GIỜ dùng toán tử <code>arr == 0.3</code> để so sánh số thực! Hãy luôn dùng <code>np.isclose(a, b, rtol=1e-5, atol=1e-8)</code> hoặc <code>np.allclose(a, b)</code>.
                </div>
              `,
              codeExamples: [
                {
                  title: 'So sánh ma trận bằng einsum và So sánh số thực an toàn',
                  lang: 'Python',
                  code: `import numpy as np

# 1. Minh họa einsum tính tổng đường chéo (Trace) và Batch Matrix Multiplication
M = np.array([[1, 2], [3, 4]])
trace_val = np.einsum('ii->', M)
print("Tổng đường chéo M:", trace_val)

# 2. Bẫy số thực IEEE 754
x = 0.1 + 0.2
print("0.1 + 0.2 == 0.3 trong Python:", x == 0.3)  # False!
print("Giá trị thực sự lưu trong RAM:  ", repr(x))  # 0.30000000000000004

# Giải pháp chuẩn xác trong Khoa học Dữ liệu:
a_arr = np.array([0.1 + 0.2, 0.4 + 0.4])
b_arr = np.array([0.3,       0.8])
print("So sánh an toàn bằng np.isclose():", np.isclose(a_arr, b_arr))`,
                  output: `Tổng đường chéo M: 5
0.1 + 0.2 == 0.3 trong Python: False
Giá trị thực sự lưu trong RAM:   0.30000000000000004
So sánh an toàn bằng np.isclose(): [ True  True]`,
                  annotations: [
                    { line: 11, text: 'Sự thật về biểu diễn số thực dấu phẩy động: luôn có sai số ở bit cuối cùng.' },
                    { line: 16, text: 'np.isclose() so sánh với sai số tương đối và tuyệt đối an toàn.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-np-svd-rank-k',
              title: '3. Phân tích Suy biến SVD (np.linalg.svd) và Nén ma trận Rank-k Truncation',
              content: `
                <p><strong>Bản chất Hình học của SVD:</strong> Định lý phân tích giá trị suy biến (Singular Value Decomposition) khẳng định: Bất kỳ ma trận thực nào $A \\in \\mathbb{R}^{m \\times n}$ (kể cả không vuông) đều có thể phân rã thành tích của 3 ma trận:</p>
                $$\\mathbf{A} = \\mathbf{U} \\mathbf{\\Sigma} \\mathbf{V}^T$$
                <ul>
                  <li>$\\mathbf{U} \\in \\mathbb{R}^{m \\times m}$: Ma trận trực giao chứa các vector suy biến trái (Left Singular Vectors), đại diện cho phép quay tọa độ trong không gian đầu ra.</li>
                  <li>$\\mathbf{\\Sigma} \\in \\mathbb{R}^{m \\times n}$: Ma trận đường chéo chứa các giá trị suy biến $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0$, đại diện cho hệ số co giãn dọc theo từng trục.</li>
                  <li>$\\mathbf{V}^T \\in \\mathbb{R}^{n \\times n}$: Ma trận trực giao chứa các vector suy biến phải (Right Singular Vectors), đại diện cho phép quay tọa độ trong không gian đầu vào.</li>
                </ul>
                <p><strong>Định lý Eckart-Young-Mirsky (Xấp xỉ Hạng thấp - Low-Rank Approximation):</strong> Ma trận hạng $k$ ($k < r$) gần với $A$ nhất theo chuẩn Frobenius chính là việc giữ lại $k$ giá trị suy biến lớn nhất: $\\mathbf{A}_k = \\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T$. Đây là nền tảng toán học của thuật toán PCA, nén ảnh, khử nhiễu tín hiệu và hệ thống gợi ý Collaborative Filtering.</p>
              `,
              codeExamples: [
                {
                  title: 'Phân tích SVD và Nén dữ liệu bảo toàn năng lượng với Rank-k',
                  lang: 'Python',
                  code: `import numpy as np

# Tạo ma trận dữ liệu giả lập đánh giá phim (6 người dùng x 5 bộ phim)
A = np.array([
    [5, 5, 0, 0, 1],
    [5, 4, 1, 0, 0],
    [4, 5, 0, 1, 0],
    [0, 1, 4, 5, 4],
    [1, 0, 5, 4, 5],
    [0, 0, 4, 5, 5]
], dtype=np.float64)

# Phân rã SVD: A = U @ diag(S) @ Vt
U, S, Vt = np.linalg.svd(A, full_matrices=False)

print("Shape U:", U.shape, "| Shape S:", S.shape, "| Shape Vt:", Vt.shape)
print("Singular values (S):", np.round(S, 3))

# Tái tạo xấp xỉ rank-k (Eckart-Young-Mirsky Theorem) với k = 2
k = 2
A_approx_k2 = U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]
frobenius_error = np.linalg.norm(A - A_approx_k2, 'fro')
energy_retained = np.sum(S[:k]**2) / np.sum(S**2)

print(f"Năng lượng giữ lại với Rank-{k}: {energy_retained * 100:.2f}%")
print(f"Sai số Frobenius xấp xỉ Rank-{k}: {frobenius_error:.4f}")`,
                  output: `Shape U: (6, 5) | Shape S: (5,) | Shape Vt: (5, 5)
Singular values (S): [14.003 11.142  2.085  1.14   0.364]
Năng lượng giữ lại với Rank-2: 98.23%
Sai số Frobenius xấp xỉ Rank-2: 2.4037`,
                  annotations: [
                    { line: 14, text: 'full_matrices=False tính phân tích kinh tế (thin/reduced SVD), tiết kiệm bộ nhớ.' },
                    { line: 21, text: 'Chỉ cần k=2 chiều tiềm ẩn đã nắm bắt tới 98.23% tổng phương sai (năng lượng) của toàn bộ ma trận gốc!' }
                  ]
                }
              ]
            },
            {
              id: 'sec-np-structured-arrays',
              title: '4. Mảng có Cấu trúc (Structured Arrays) và Cấu trúc Bộ nhớ C-Struct',
              content: `
                <p>Mặc dù <code>ndarray</code> thông thường là mảng đồng nhất (homogeneous), NumPy cho phép định nghĩa các kiểu bản ghi không đồng nhất (heterogeneous) thông qua <strong>Structured Arrays</strong>:</p>
                <ul>
                  <li><strong>Bản chất C-Struct trong RAM:</strong> Thay vì mỗi ô là một con số, mỗi phần tử là một cấu trúc C (struct) chiếm đúng số byte cố định trong dải RAM liên tục, không hề phát sinh overhead đối tượng Python.</li>
                  <li><strong>Memory Alignment:</strong> Khi truyền <code>align=True</code>, NumPy chèn thêm các byte đệm (padding bytes) để địa chỉ từng trường luôn chia hết cho kích thước của nó (ví dụ int32 nằm ở địa chỉ chia hết cho 4, float64 chia hết cho 8). Điều này cho phép CPU nạp dữ liệu vào thanh ghi trong đúng 1 chu kỳ bộ nhớ.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Định nghĩa Structured Array, Offset byte và Lọc dữ liệu',
                  lang: 'Python',
                  code: `import numpy as np

# Định nghĩa struct C với byte alignment
dt = np.dtype([
    ('name', 'U16'),       # Chuỗi Unicode tối đa 16 ký tự (64 bytes)
    ('age', np.int32),     # Số nguyên 32-bit (4 bytes)
    ('salary', np.float64) # Số thực 64-bit (8 bytes)
], align=True)

employees = np.array([
    ('An', 28, 2500.5),
    ('Bình', 34, 3800.0),
    ('Chi', 22, 1850.0)
], dtype=dt)

print("Kích thước mỗi bản ghi (itemsize):", dt.itemsize, "bytes")
print("Byte offsets từng trường:", {k: v[1] for k, v in dt.fields.items()})
print("Cột name:", employees['name'].tolist())
print("Lương > 2000:", employees[employees['salary'] > 2000]['name'].tolist())`,
                  output: `Kích thước mỗi bản ghi (itemsize): 80 bytes
Byte offsets từng trường: {'name': 0, 'age': 64, 'salary': 72}
Cột name: ['An', 'Bình', 'Chi']
Lương > 2000: ['An', 'Bình']`,
                  annotations: [
                    { line: 7, text: 'align=True tự động chèn 4 bytes padding giữa age (offset 64+4=68) và salary (offset 72) để căn chỉnh 8-byte.' },
                    { line: 18, text: 'Truy xuất theo tên trường trả về một view mảng 1D trực tiếp trên khối byte struct mà không tốn công copy.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Nghịch đảo ma trận suy biến (Singular Matrix)',
                content: 'Khi ma trận vuông có định thức det(A) = 0 (các hàng phụ thuộc tuyến tính), np.linalg.inv(A) sẽ ném lỗi LinAlgError: Singular matrix. Trong thực tế khi khớp mô hình hồi quy, luôn ưu tiên dùng giả nghịch đảo Moore-Penrose: np.linalg.pinv(A).'
              }
            ],
            tips: [
              {
                title: 'Tăng tốc einsum với optimize=True',
                content: 'Khi tính toán einsum trên các mảng nhiều hơn 2 toán hạng, hãy truyền tham số np.einsum(..., optimize=True). NumPy sẽ tự động tìm đường co chỉ số tối ưu nhất theo thuật toán quy hoạch động, giúp giảm độ phức tạp tính toán từ O(N^4) xuống O(N^3)!'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Batch Cosine Similarity bằng einsum',
              problem: 'Cho một tập 100 vector truy vấn Q (shape: 100, 64) và 1000 vector tài liệu D (shape: 1000, 64). Hãy chuẩn hóa các vector về độ dài L2 = 1, sau đó dùng một lệnh np.einsum duy nhất để tính ma trận độ tương đồng Cosine giữa mọi truy vấn và mọi tài liệu. Kết quả có shape là (100, 1000).',
              hint: 'Chuẩn hóa bằng Q / np.linalg.norm(Q, axis=1, keepdims=True). Khi 2 vector đã chuẩn hóa đơn vị, Cosine Similarity chính là tích vô hướng Q @ D.T. Viết einsum với các chỉ số thích hợp.',
              solutionCode: `import numpy as np

rng = np.random.default_rng(42)
Q = rng.normal(size=(100, 64))
D = rng.normal(size=(1000, 64))

# Chuẩn hóa L2 norm
Q_norm = Q / np.linalg.norm(Q, axis=1, keepdims=True)
D_norm = D / np.linalg.norm(D, axis=1, keepdims=True)

# Tính Cosine Similarity bằng einsum: (100, 64) và (1000, 64) -> (100, 1000)
cos_sim = np.einsum('id,jd->ij', Q_norm, D_norm)

print("Shape ma trận tương đồng:", cos_sim.shape)
print("Giá trị tương đồng cực đại:", np.round(cos_sim.max(), 4))
print("Giá trị tương đồng cực tiểu:", np.round(cos_sim.min(), 4))`,
              solutionOutput: `Shape ma trận tương đồng: (100, 1000)
Giá trị tương đồng cực đại: 0.4875
Giá trị tương đồng cực tiểu: -0.5207`,
              explanation: 'Chuỗi einsum id,jd->ij cho biết: chỉ số chiều không gian d (64) được nhân và cộng dồn lại giữa truy vấn thứ i và tài liệu thứ j. Kết quả là ma trận điểm tương đồng (100, 1000) cực kỳ nhỏ gọn và tối ưu bộ nhớ.',
              annotations: [
                { line: 12, text: 'Ký hiệu "id,jd->ij" loại bỏ chiều d và tạo ra ma trận tương đồng kích thước (i, j).' }
              ]
            }
          ],
          summary: [
            'Sử dụng toán tử @ cho nhân ma trận; dùng np.linalg.solve thay vì tính ma trận nghịch đảo.',
            'Dùng np.random.default_rng(seed) thay cho np.random.seed cũ để đảm bảo thread-safe.',
            'Phân tích SVD (np.linalg.svd) cho phép nén dữ liệu và xấp xỉ ma trận tối ưu theo định lý Eckart-Young-Mirsky.',
            'Structured Arrays ánh xạ cấu trúc C-struct liên tục trong RAM với byte alignment, tiết kiệm tối đa bộ nhớ.',
            'np.einsum là công cụ tối thượng để thực hiện các phép co ma trận đa chiều không sinh biến tạm.',
            'Số thực IEEE 754 luôn có sai số làm tròn; tuyệt đối dùng np.isclose() để so sánh an toàn.'
          ]
        },
        {
          id: 'ai-np-05',
          number: '1.5',
          title: 'Dự án Thực chiến: Xây dựng Thuật toán Phân tích Cụm K-Means từ đầu bằng NumPy',
          subtitle: 'Hiện thực hóa toàn bộ thuật toán K-Means không dùng vòng lặp lồng: Vectorization, Broadcasting & Benchmark',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Áp dụng toàn bộ kiến thức NumPy (Broadcasting, Axis, Vectorization) để lập trình thuật toán K-Means hoàn chỉnh.',
            'Loại bỏ 100% vòng lặp lồng giữa các điểm dữ liệu và tâm cụm.',
            'Thực hiện đo lường hiệu năng (Benchmark) so sánh với mã Python lặp thủ công.',
            'Hiểu lý do và bước chuyển tiếp tự nhiên từ NumPy sang Pandas khi cấu trúc dữ liệu cần nhãn.'
          ],
          intuition: {
            title: 'Hội tụ bầy đàn trong không gian số học',
            metaphor: 'Thuật toán K-Means giống như việc tìm địa điểm đặt 3 siêu thị trung tâm cho cư dân của một thành phố. Ban đầu bạn cắm cọc bừa 3 vị trí. Mỗi cư dân trong thành phố đồng loạt đo khoảng cách tới 3 chiếc cọc và chọn chiếc cọc gần nhà mình nhất (Bước gán cụm - Assignment Step). Sau đó, mỗi chiếc cọc được nhổ lên và cắm lại vào đúng trọng tâm (tọa độ trung bình) của nhóm cư dân vừa chọn nó (Bước cập nhật tâm - Update Step). Quá trình này lặp lại vài lần cho đến khi các chiếc cọc không còn dịch chuyển nữa. Trong NumPy, toàn bộ hàng vạn cư dân được tính khoảng cách đồng loạt chỉ trong 1 dòng broadcasting duy nhất!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🔄 Chu trình Lặp của Thuật toán K-Means Vectorized</div>
                <div class="eco-grid">
                  <div class="eco-card">
                    <strong>1. Ma trận Khoảng cách:</strong>
                    <p style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Dữ liệu <code>X (N, D)</code> và Tâm <code>C (K, D)</code><br>
                      Broadcasting: <code>X[:, None, :] - C[None, :, :]</code> ➔ shape <code>(N, K, D)</code><br>
                      Khoảng cách Euclidean ➔ shape <code>(N, K)</code>
                    </p>
                  </div>
                  <div class="eco-card">
                    <strong>2. Gán Cụm &amp; Cập nhật:</strong>
                    <p style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Tìm tâm gần nhất: <code>labels = np.argmin(dist, axis=1)</code><br>
                      Tính trọng tâm mới: <code>C_new = [X[labels == k].mean(axis=0)]</code><br>
                      Kiểm tra hội tụ: <code>np.allclose(C, C_new)</code>
                    </p>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-np-project-impl',
              title: '1. Hiện thực hóa Thuật toán Vectorized K-Means',
              content: `
                <p>Chúng ta sẽ xây dựng một hàm <code>kmeans_numpy(X, k, max_iters)</code> giải quyết bài toán phân cụm không gian 2D/đa chiều một cách hoàn toàn tối ưu:</p>
              `,
              codeExamples: [
                {
                  title: 'Thuật toán K-Means hoàn chỉnh viết bằng NumPy thuần túy',
                  lang: 'Python',
                  code: `import numpy as np

def kmeans_numpy(X, k, max_iters=100, tol=1e-4, seed=42):
    rng = np.random.default_rng(seed)
    n_samples, n_features = X.shape
    
    # 1. Khởi tạo ngẫu nhiên k tâm cụm từ các điểm dữ liệu có sẵn
    random_idx = rng.choice(n_samples, size=k, replace=False)
    centroids = X[random_idx].copy()
    
    for iteration in range(max_iters):
        # 2. VECTORIZED DISTANCE: shape (N, 1, D) - (1, K, D) -> (N, K, D)
        # Khoảng cách Euclidean từ N điểm tới K tâm cụm
        distances = np.linalg.norm(X[:, np.newaxis, :] - centroids[np.newaxis, :, :], axis=2)
        
        # 3. Gán nhãn cho từng điểm: chỉ số của tâm gần nhất (shape: N,)
        labels = np.argmin(distances, axis=1)
        
        # 4. Cập nhật vị trí tâm cụm mới bằng trung bình cộng các điểm trong cụm
        new_centroids = np.zeros_like(centroids)
        for j in range(k):
            cluster_points = X[labels == j]
            if len(cluster_points) > 0:
                new_centroids[j] = cluster_points.mean(axis=0)
            else:
                new_centroids[j] = X[rng.choice(n_samples)]
                
        # 5. Kiểm tra điều kiện dừng (Hội tụ)
        shift = np.linalg.norm(new_centroids - centroids)
        centroids = new_centroids
        if shift < tol:
            print(f"Thuật toán hội tụ sau {iteration + 1} vòng lặp!")
            break
            
    return centroids, labels

# Chạy thử nghiệm trên 1000 điểm dữ liệu giả lập 3 cụm
rng = np.random.default_rng(100)
c1 = rng.normal(loc=[-5, -5], scale=1.0, size=(300, 2))
c2 = rng.normal(loc=[0, 5], scale=1.2, size=(400, 2))
c3 = rng.normal(loc=[6, -2], scale=0.9, size=(300, 2))
X_data = np.vstack([c1, c2, c3])

centroids, labels = kmeans_numpy(X_data, k=3)
print("Tọa độ 3 tâm cụm tìm được:\n", np.round(centroids, 2))`,
                  output: `Thuật toán hội tụ sau 5 vòng lặp!
Tọa độ 3 tâm cụm tìm được:
 [[-4.99 -4.95]
 [ 0.04  5.08]
 [ 6.01 -2.01]]`,
                  annotations: [
                    { line: 14, text: 'Kỹ thuật broadcasting (N, 1, D) - (1, K, D) loại bỏ hoàn toàn vòng lặp kép duyệt qua từng điểm dữ liệu.' },
                    { line: 36, text: 'Hội tụ cực nhanh chỉ sau 5 vòng lặp và tìm ra chính xác tâm gốc [-5, -5], [0, 5], [6, -2].' }
                  ]
                }
              ]
            },
            {
              id: 'sec-np-transition-pandas',
              title: '2. Giới hạn của NumPy và Vì sao chúng ta cần bước tiếp sang Pandas',
              content: `
                <p>Mặc dù NumPy có tốc độ xử lý số học vô địch, nhưng trong thực tế dữ liệu doanh nghiệp không chỉ toàn là những mảng số thuần khiết:</p>
                <ul>
                  <li><strong>Thiếu nhãn nhận diện:</strong> Khi bạn có mảng 2D kích thước (1000, 5), bạn phải tự ghi nhớ rằng cột 0 là "Tuổi", cột 1 là "Thu nhập", cột 2 là "Ngày mua hàng". Nếu đảo nhầm thứ tự cột, code sẽ sai mà không hề báo lỗi.</li>
                  <li><strong>Dữ liệu không đồng nhất (Heterogeneous Data):</strong> Một bảng dữ liệu thực tế gồm tên khách hàng (chuỗi), ngày sinh (datetime), giới tính (phân loại) và số tiền (float). NumPy không thể xử lý tốt bảng hỗn hợp này.</li>
                  <li><strong>Dữ liệu khuyết thiếu (Missing Data):</strong> Trong thực tế luôn có các ô trống, khảo sát bị bỏ lỡ, hoặc giá trị lỗi.</li>
                </ul>
                <p>Đó chính là lý do <strong>Pandas</strong> ra đời: xây dựng ngay trên nền móng ndarray của NumPy, nhưng bổ sung thêm <strong>Hệ thống Nhãn (Index & Column Names)</strong>, khả năng xử lý bảng hỗn hợp và cơ chế căn chỉnh nhãn tự động!</p>
              `,
              codeExamples: []
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'K-Means bị bẫy cực tiểu địa phương (Local Minima)',
                content: 'Thuật toán K-Means rất nhạy cảm với vị trí khởi tạo tâm cụm ban đầu. Nếu khởi tạo xui xẻo, nó có thể hội tụ về nghiệm phụ kém chất lượng. Trong thực tế (như Scikit-learn), người ta dùng phương pháp khởi tạo K-Means++ và chạy lại thuật toán nhiều lần (n_init=10) để chọn kết quả tốt nhất.'
              }
            ],
            tips: [
              {
                title: 'Bộ nhớ khi tính ma trận khoảng cách lớn',
                content: 'Khi số điểm N lên tới 1 triệu, mảng trung gian (N, K, D) có thể tốn vài gigabytes RAM. Trong trường hợp đó, người ta chia N thành các mẻ nhỏ (batch) hoặc dùng công thức phân rã đại số: ||a - b||^2 = ||a||^2 + ||b||^2 - 2 * (a @ b.T) để tiết kiệm bộ nhớ.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Tính toán Inertia (Tổng bình phương khoảng cách tới tâm cụm)',
              problem: 'Viết một hàm tính giá trị Inertia (Within-Cluster Sum of Squares - WCSS) cho kết quả phân cụm K-Means ở trên. Đây là chỉ số quan trọng dùng để vẽ đồ thị Elbow Method nhằm tìm số cụm k tối ưu.',
              hint: 'Inertia là tổng khoảng cách bình phương từ mỗi điểm X[i] tới tâm cụm centroids[labels[i]] tương ứng của nó.',
              solutionCode: `import numpy as np

def compute_inertia(X, centroids, labels):
    # Lấy tâm cụm tương ứng cho từng điểm dữ liệu: shape (N, D)
    assigned_centroids = centroids[labels]
    
    # Tính tổng bình phương khoảng cách
    squared_distances = np.sum((X - assigned_centroids)**2, axis=1)
    return np.sum(squared_distances)

inertia_val = compute_inertia(X_data, centroids, labels)
print("Inertia của mô hình 3 cụm:", np.round(inertia_val, 2))`,
              solutionOutput: `Inertia của mô hình 3 cụm: 2049.78`,
              explanation: 'Bằng cách dùng Fancy Indexing centroids[labels], ta trích xuất tức thì mảng tọa độ tâm tương ứng của 1000 điểm dữ liệu mà không cần vòng lặp, sau đó tính tổng bình phương sai lệch cực kỳ nhanh chóng.',
              annotations: [
                { line: 5, text: 'centroids[labels] biến mảng (3, 2) thành (1000, 2) dựa theo nhãn của từng điểm.' }
              ]
            }
          ],
          summary: [
            'Thuật toán K-Means có thể được lập trình hoàn toàn bằng Vectorization và Broadcasting của NumPy.',
            'Broadcasting loại bỏ triệt để vòng lặp lồng giữa N điểm dữ liệu và K tâm cụm.',
            'NumPy đạt tốc độ tối đa khi xử lý mảng số thuần khiết, nhưng thiếu cơ chế quản lý nhãn và kiểu dữ liệu hỗn hợp.',
            'Pandas kế thừa sức mạnh bộ nhớ của NumPy và bổ sung hệ thống nhãn (Index/Columns) để làm việc với bảng thực tế.'
          ]
        }
      ]
    },
    {
      id: 'part-ai-pandas',
      number: 'Phần 2',
      title: 'Pandas: Xử lý & Phân tích Dữ liệu Dạng bảng',
      level: 'Cơ bản đến Chuyên sâu',
      badge: '6 Bài học',
      icon: '🐼',
      description: 'Hiểu cặn kẽ triết lý Index Alignment, lọc dữ liệu với loc/iloc/query, mô hình Split-Apply-Combine, tái định hình Pivot/Melt, cơ chế Copy-on-Write và tối ưu hiệu năng I/O Parquet.',
      lessons: [
        {
          id: 'ai-pd-01',
          number: '2.1',
          title: 'Series và Index: Triết lý Căn chỉnh Nhãn (Index Alignment) là Ý tưởng Cốt lõi',
          subtitle: 'Hiểu rõ sự khác biệt giữa mảng số vô danh và cấu trúc dữ liệu có nhãn định danh: Series & DataFrame',
          level: 'Cơ bản',
          duration: '35 phút',
          objectives: [
            'Hiểu cấu trúc cốt lõi của Pandas Series: 1D NumPy array kết hợp cùng Index.',
            'Nắm vững triết lý Index Alignment (căn chỉnh theo nhãn) và vì sao nó bảo vệ tính toàn vẹn dữ liệu.',
            'Hiểu cấu trúc DataFrame: một tập hợp các cột Series có chung Index hàng.',
            'Khám phá mối liên kết bộ nhớ giữa Pandas DataFrame và NumPy bên dưới.'
          ],
          intuition: {
            title: 'Danh sách số báo danh vs Bảng điểm có họ tên học sinh',
            metaphor: 'Trong NumPy, một mảng giống như một danh sách điểm thi không ghi tên học sinh: [8.5, 9.0, 7.5]. Nếu ai đó vô tình xóa mất một số ở giữa, toàn bộ điểm số của các học sinh phía sau sẽ bị dịch chuyển và gán sai người mà không ai hay biết! Pandas Series giải quyết triệt để rủi ro này bằng cách dán chặt một "tấm thẻ căn cước" (Index) vào từng giá trị: {"An": 8.5, "Bình": 9.0, "Cường": 7.5}. Khi bạn thực hiện phép tính giữa 2 bảng dữ liệu, Pandas không bao giờ cộng mù quáng theo vị trí hàng; nó tự động tìm đúng tên "An" ở cả 2 bảng để cộng lại với nhau.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🧩 Minh họa Cơ chế Index Alignment trong Pandas</div>
                <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin:12px 0;">
                  <div style="background:var(--bg-surface);padding:8px 12px;border:1px solid var(--border-subtle);border-radius:4px;">
                    <div style="font-weight:700;font-size:0.8rem;color:var(--text-muted);margin-bottom:4px;">Series 1</div>
                    <div>Nhãn <strong>a</strong>: 10</div>
                    <div>Nhãn <strong>b</strong>: 20</div>
                    <div>Nhãn <strong>c</strong>: 30</div>
                  </div>
                  <div style="font-size:1.5rem;font-weight:700;color:var(--topic-data);">+</div>
                  <div style="background:var(--bg-surface);padding:8px 12px;border:1px solid var(--border-subtle);border-radius:4px;">
                    <div style="font-weight:700;font-size:0.8rem;color:var(--text-muted);margin-bottom:4px;">Series 2</div>
                    <div>Nhãn <strong>b</strong>: 1</div>
                    <div>Nhãn <strong>c</strong>: 2</div>
                    <div>Nhãn <strong>d</strong>: 3</div>
                  </div>
                  <div style="font-size:1.5rem;font-weight:700;color:var(--topic-data);">=</div>
                  <div style="background:var(--topic-data-soft);padding:8px 12px;border:1px solid var(--topic-data);border-radius:4px;">
                    <div style="font-weight:700;font-size:0.8rem;color:var(--topic-data);margin-bottom:4px;">Kết quả Series 1 + 2</div>
                    <div>Nhãn <strong>a</strong>: <span style="color:#ef4444;font-weight:700;">NaN</span> (thiếu ở S2)</div>
                    <div>Nhãn <strong>b</strong>: <strong>21.0</strong> (20 + 1)</div>
                    <div>Nhãn <strong>c</strong>: <strong>32.0</strong> (30 + 2)</div>
                    <div>Nhãn <strong>d</strong>: <span style="color:#ef4444;font-weight:700;">NaN</span> (thiếu ở S1)</div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pd-series-index',
              title: '1. Bản chất Series và Cơ chế Tự động Căn chỉnh Nhãn (Alignment)',
              content: `
                <p>Một đối tượng <code>pd.Series</code> gồm hai thành phần thiết yếu:</p>
                <ul>
                  <li><strong>Data:</strong> Mảng 1D (thường là NumPy ndarray hoặc ExtensionArray) lưu trữ giá trị thực.</li>
                  <li><strong>Index:</strong> Mảng nhãn định danh bất biến (Immutable Index) gắn liền với từng hàng.</li>
                </ul>
                <p>Khi thực hiện bất kỳ phép toán nào giữa hai Series (<code>s1 + s2</code>, <code>s1 * s2</code>), Pandas <strong>luôn luôn căn chỉnh theo Index trước tiên</strong>. Các nhãn khớp nhau ở cả 2 bên sẽ được tính toán; các nhãn chỉ xuất hiện ở một bên sẽ tự động được gán giá trị <code>NaN</code> (Not a Number) để bảo vệ bạn khỏi việc tính toán sai lệch ngữ cảnh!</p>
              `,
              codeExamples: [
                {
                  title: 'Thực nghiệm Index Alignment giữa hai Series khác nhãn',
                  lang: 'Python',
                  code: `import pandas as pd

# Doanh thu tháng 1 và tháng 2 của các chi nhánh
t1 = pd.Series([100, 200, 300], index=['Hà Nội', 'Đà Nẵng', 'TP.HCM'])
t2 = pd.Series([50, 150, 80],   index=['Đà Nẵng', 'TP.HCM', 'Cần Thơ'])

# Phép cộng căn chỉnh tự động theo nhãn
tong = t1 + t2

print("Tổng doanh thu 2 tháng:")
print(tong)
print("\nĐiền giá trị mặc định 0 trước khi cộng (fill_value=0):")
tong_sach = t1.add(t2, fill_value=0)
print(tong_sach)`,
                  output: `Tổng doanh thu 2 tháng:
Cần Thơ      NaN
Hà Nội       NaN
TP.HCM     450.0
Đà Nẵng    250.0
dtype: float64

Điền giá trị mặc định 0 trước khi cộng (fill_value=0):
Cần Thơ     80.0
Hà Nội     100.0
TP.HCM     450.0
Đà Nẵng    250.0
dtype: float64`,
                  annotations: [
                    { line: 8, text: 'Hà Nội và Cần Thơ bị NaN vì mỗi chi nhánh chỉ xuất hiện trong 1 tháng.' },
                    { line: 14, text: 'Dùng phương thức t1.add(t2, fill_value=0) để tránh sinh ra NaN khi thiếu dữ liệu.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-pd-dataframe-arch',
              title: '2. Kiến trúc DataFrame và Mối quan hệ với NumPy bên dưới',
              content: `
                <p>Một <code>pd.DataFrame</code> có thể được xem như một cuốn từ điển đặc biệt chứa các Series, trong đó tất cả các Series đều <strong>chia sẻ chung một Index hàng</strong>.</p>
                <p>Mỗi cột trong DataFrame có thể có một kiểu dữ liệu riêng biệt (heterogeneous columnar data). Bên dưới bộ nhớ, Pandas quản lý các cột này thông qua cấu trúc <code>BlockManager</code> hoặc <code>ArrayManager</code>, kết nối trực tiếp với các mảng NumPy ndarray hoặc Apache Arrow arrays.</p>
              `,
              codeExamples: [
                {
                  title: 'Khảo sát cấu trúc nội tại DataFrame: dtypes, index và columns',
                  lang: 'Python',
                  code: `import pandas as pd

# Khởi tạo DataFrame thông tin nhân sự
df = pd.DataFrame({
    'ho_ten': ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'],
    'tuoi':   [25, 32, 28],
    'luong':  [15.5, 22.0, 18.2]
}, index=['NV01', 'NV02', 'NV03'])

print("Cột 'luong' thực chất là 1 Series:")
print(type(df['luong']), "Dtype:", df['luong'].dtype)
print("\nKiểu dữ liệu của từng cột:")
print(df.dtypes)
print("\nMảng giá trị NumPy bên dưới của cột tuoi:")
print(df['tuoi'].to_numpy(), "Type:", type(df['tuoi'].to_numpy()))`,
                  output: `Cột 'luong' thực chất là 1 Series:
<class 'pandas.core.series.Series'> Dtype: float64

Kiểu dữ liệu của từng cột:
ho_ten     object
tuoi        int64
luong     float64
dtype: object

Mảng giá trị NumPy bên dưới của cột tuoi:
[25 32 28] Type: <class 'numpy.ndarray'>`,
                  annotations: [
                    { line: 10, text: 'Mỗi cột trong DataFrame là một Series chuẩn, có thuộc tính dtype riêng.' },
                    { line: 15, text: '.to_numpy() trả về mảng ndarray bên dưới không tốn chi phí copy.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Nhầm lẫn giữa Index số thứ tự mặc định và Vị trí hàng',
                content: 'Khi một DataFrame có Index là số nhưng không liên tục (ví dụ sau khi lọc dữ liệu: index là [2, 5, 9]), việc gọi s[2] sẽ tìm nhãn có tên là 2 chứ KHÔNG PHẢI phần tử ở vị trí thứ 2! Luôn sử dụng .loc hoặc .iloc để tránh nhầm lẫn tai hại này.'
              }
            ],
            tips: [
              {
                title: 'Đặt tên cho Index và Columns',
                content: 'Bạn có thể gán df.index.name = "ma_nv" và df.columns.name = "chi_so" để khi xuất dữ liệu ra CSV/Excel, file đầu ra có tiêu đề rõ ràng, chuyên nghiệp.'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'Căn chỉnh dữ liệu doanh số và hàng tồn kho',
              problem: 'Cho Series s_sales ghi nhận số lượng bán ra của các mã hàng [A, B, C] và Series s_stock ghi nhận số lượng tồn kho của các mã hàng [B, C, D]. Hãy tính tỉ lệ bán trên tồn kho (s_sales / s_stock). Xử lý các mã hàng bị thiếu để không xuất hiện NaN.',
              hint: 'Dùng phương thức s_sales.divide(s_stock, fill_value=0) hoặc kết hợp reindex().',
              solutionCode: `import pandas as pd

s_sales = pd.Series([100, 50, 80], index=['A', 'B', 'C'])
s_stock = pd.Series([200, 160, 90], index=['B', 'C', 'D'])

# Phép chia có căn chỉnh nhãn
ti_le = s_sales.divide(s_stock)

print("Tỉ lệ chia mặc định (có NaN):")
print(ti_le)

print("\nChỉ giữ các mã có đầy đủ cả bán và tồn:")
ti_le_valid = ti_le.dropna()
print(ti_le_valid)`,
              solutionOutput: `Tỉ lệ chia mặc định (có NaN):
A     NaN
B    0.25
C    0.50
D     NaN
dtype: float64

Chỉ giữ các mã có đầy đủ cả bán và tồn:
B    0.25
C    0.50
dtype: float64`,
              explanation: 'Mã A chỉ có bán không có tồn kho ghi nhận (NaN); Mã D chỉ có tồn kho không có bán (NaN). Pandas tự căn chỉnh chính xác hai mã B và C để tính tỉ lệ 50/200 = 0.25 và 80/160 = 0.5.',
              annotations: [
                { line: 7, text: 'divide() tự căn chỉnh Index trước khi thực hiện phép chia.' }
              ]
            }
          ],
          summary: [
            'Series = 1D ndarray + Immutable Index.',
            'Index Alignment là ý tưởng cốt lõi của Pandas: tính toán luôn căn chỉnh theo nhãn, không theo vị trí mù quáng.',
            'DataFrame là tập hợp các Series chia sẻ chung một Index hàng.',
            'Mỗi cột DataFrame có kiểu dữ liệu riêng và kết nối trực tiếp với bộ nhớ NumPy bên dưới.'
          ]
        },
        {
          id: 'ai-pd-02',
          number: '2.2',
          title: 'Chọn lọc Dữ liệu & Hệ thống Kiểu Dữ liệu Hiện đại',
          subtitle: 'Phân định loc vs iloc, Boolean Masking, truy vấn .query(), Nullable dtypes & Category',
          level: 'Cơ bản',
          duration: '40 phút',
          objectives: [
            'Phân biệt tuyệt đối giữa .loc[] (chọn theo nhãn, inclusive) và .iloc[] (chọn theo vị trí số, exclusive).',
            'Làm chủ lọc dữ liệu nâng cao bằng Boolean Masking và phương thức .query().',
            'Hiểu sự khác biệt giữa np.nan (float), None (Python object) và pd.NA (Nullable types).',
            'Sử dụng kiểu category để giảm dung lượng bộ nhớ từ 80% đến 90% cho các cột chuỗi lặp lại.'
          ],
          intuition: {
            title: 'Tên địa chỉ nhà vs Số thứ tự trên bản đồ quy hoạch',
            metaphor: 'Hãy tưởng tượng một con phố cổ. .loc[] giống như việc bạn gọi tên theo biển số nhà thực tế: "Hãy lấy từ nhà số 10 đến nhà số 14 phố Hàng Bạc" (vì là tên gọi thực tế, cả nhà số 10 và nhà số 14 đều ĐƯỢC LẤY - inclusive). Còn .iloc[] giống như việc thanh tra đo đạc bằng thước dây số học: "Hãy lấy từ vị trí mét thứ 0 đến mét thứ 2" (theo quy ước chỉ số chuẩn Python, vị trí cuối cùng là ranh giới dừng, KHÔNG LẤY điểm cuối - exclusive).',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🎯 So sánh Cốt tử: .loc[] vs .iloc[]</div>
                <div class="eco-grid">
                  <div class="eco-card" style="border-left:4px solid var(--topic-data);">
                    <div class="eco-card-header">
                      <span class="eco-card-title">.loc[nhãn_hàng, nhãn_cột]</span>
                      <span class="eco-card-tag">Label-based</span>
                    </div>
                    <div class="eco-card-desc">
                      • Chọn theo tên nhãn index và tên cột.<br>
                      • Cú pháp slice <code>'A':'C'</code> bao gồm <strong>CẢ ĐIỂM CUỐI</strong> (Inclusive).<br>
                      • Hỗ trợ boolean series mask.
                    </div>
                  </div>
                  <div class="eco-card" style="border-left:4px solid #0ea5e9;">
                    <div class="eco-card-header">
                      <span class="eco-card-title">.iloc[vị_trí_hàng, vị_trí_cột]</span>
                      <span class="eco-card-tag">Integer-based</span>
                    </div>
                    <div class="eco-card-desc">
                      • Chọn theo số thứ tự nguyên từ <code>0</code> đến <code>N-1</code>.<br>
                      • Cú pháp slice <code>0:2</code> <strong>KHÔNG LẤY ĐIỂM CUỐI</strong> (Exclusive: chỉ lấy 0 và 1).<br>
                      • Hoàn toàn phớt lờ tên nhãn thực tế.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pd-loc-iloc-query',
              title: '1. Chọn lọc Dữ liệu Chuẩn xác: loc, iloc và .query()',
              content: `
                <p>Quy tắc bất di bất dịch trong Pandas hiện đại: <strong>Không bao giờ dùng cú pháp gán kép <code>df['a'][0]</code> (Chained Indexing)</strong> vì nó gây ra lỗi khó lường và cảnh báo SettingWithCopy. Luôn dùng <code>.loc</code> hoặc <code>.iloc</code>:</p>
                <ul>
                  <li><strong>Boolean Masking:</strong> Khi kết hợp nhiều điều kiện, bắt buộc phải bọc từng điều kiện trong dấu ngoặc đơn <code>()</code> và dùng toán tử bitwise <code>&amp;</code> (AND), <code>|</code> (OR), <code>~</code> (NOT). Không được dùng <code>and</code>, <code>or</code> của Python vì chúng không thể vectorize trên mảng.</li>
                  <li><strong>Phương thức .query():</strong> Viết biểu thức lọc dưới dạng chuỗi ngắn gọn, dễ đọc, và có thể tham chiếu biến bên ngoài bằng tiền tố <code>@biến</code>.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực hành loc, iloc, Boolean Masking và .query()',
                  lang: 'Python',
                  code: `import pandas as pd

df = pd.DataFrame({
    'ten':    ['An', 'Bình', 'Chi', 'Dũng', 'Giang'],
    'tuoi':   [22, 35, 28, 42, 19],
    'luong':  [12.0, 30.0, 25.0, 45.0, 9.5],
    'phong':  ['IT', 'HR', 'IT', 'Finance', 'IT']
}, index=['NV1', 'NV2', 'NV3', 'NV4', 'NV5'])

# 1. loc lấy từ NV1 đến NV3 (INCLUSIVE: lấy cả NV1, NV2, NV3)
print("--- df.loc['NV1':'NV3', ['ten', 'luong']] ---")
print(df.loc['NV1':'NV3', ['ten', 'luong']])

# 2. iloc lấy 2 hàng đầu tiên (EXCLUSIVE: chỉ lấy vị trí 0, 1)
print("\n--- df.iloc[0:2, 0:2] ---")
print(df.iloc[0:2, 0:2])

# 3. Lọc Boolean: Nhân viên IT có lương >= 20.0
it_high = df[(df['phong'] == 'IT') & (df['luong'] >= 20.0)]
print("\n--- Boolean Masking: IT và Lương >= 20 ---")
print(it_high[['ten', 'luong']])

# 4. Lọc bằng .query() với biến tham chiếu @min_tuoi
min_tuoi = 30
filtered = df.query("phong == 'IT' or tuoi >= @min_tuoi")
print("\n--- df.query('phong == IT or tuoi >= @min_tuoi') ---")
print(filtered[['ten', 'tuoi', 'phong']])`,
                  output: `--- df.loc['NV1':'NV3', ['ten', 'luong']] ---
       ten  luong
NV1     An   12.0
NV2   Bình   30.0
NV3    Chi   25.0

--- df.iloc[0:2, 0:2] ---
      ten  tuoi
NV1    An    22
NV2  Bình    35

--- Boolean Masking: IT và Lương >= 20 ---
     ten  luong
NV3  Chi   25.0

--- df.query('phong == IT or tuoi >= @min_tuoi') ---
       ten  tuoi    phong
NV1     An    22       IT
NV2   Bình    35       HR
NV3    Chi    28       IT
NV4   Dũng    42  Finance
NV5  Giang    19       IT`,
                  annotations: [
                    { line: 11, text: 'loc slice có tính chất inclusive (lấy cả NV3).' },
                    { line: 15, text: 'iloc slice theo chuẩn Python: 0:2 chỉ lấy chỉ số 0 và 1.' },
                    { line: 25, text: '@min_tuoi trỏ tới biến Python cục bộ trong môi trường.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-pd-dtypes-category',
              title: '2. Dữ liệu Thiếu Hiện đại và Tối ưu Bộ nhớ với Kiểu Category',
              content: `
                <p>Trước đây trong Pandas, giá trị thiếu luôn là <code>np.nan</code> (một giá trị float). Điều này dẫn tới một nghịch lý tai hại: nếu một cột số nguyên <code>int64</code> có dù chỉ 1 ô trống, toàn bộ cột đó bị ép kiểu thành <code>float64</code>! Trong Pandas hiện đại (từ phiên bản 2.0+), hệ thống <strong>Nullable Data Types</strong> ra đời:</p>
                <ul>
                  <li><code>pd.NA</code>: Đại diện chuẩn tắc cho giá trị thiếu.</li>
                  <li><code>Int64</code>, <code>Float64</code>, <code>boolean</code> (chữ cái đầu viết hoa): Các kiểu dữ liệu nullable cho phép cột số nguyên chứa ô trống mà không bị ép thành số thực!</li>
                </ul>
                <p><strong>Kiểu dữ liệu <code>category</code>:</strong> Nếu một cột dạng chuỗi (ví dụ: Tỉnh/Thành phố, Giới tính, Trạng thái) chỉ có vài chục giá trị duy nhất lặp đi lặp lại hàng triệu lần, việc lưu dạng chuỗi <code>object</code> sẽ ngốn hàng trăm MB RAM. Chuyển sang <code>category</code> sẽ biến cột đó thành một bảng tra cứu số nguyên (mã hóa số nguyên 1 byte), giảm tới 90% bộ nhớ!</p>
              `,
              codeExamples: [
                {
                  title: 'So sánh bộ nhớ: Object String vs Category Dtype',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np

# Tạo 100,000 dòng dữ liệu với cột thành phố lặp lại
cities = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ']
rng = np.random.default_rng(42)
city_col = rng.choice(cities, size=100_000)

s_obj = pd.Series(city_col, dtype='object')
s_cat = pd.Series(city_col, dtype='category')

mem_obj = s_obj.memory_usage(deep=True) / 1024 / 1024
mem_cat = s_cat.memory_usage(deep=True) / 1024 / 1024

print(f"Dung lượng dạng chuỗi (Object):   {mem_obj:.2f} MB")
print(f"Dung lượng dạng Danh mục (Category): {mem_cat:.2f} MB")
print(f"Tiết kiệm được: {((mem_obj - mem_cat) / mem_obj) * 100:.1f}% RAM!")`,
                  output: `Dung lượng dạng chuỗi (Object):   7.65 MB
Dung lượng dạng Danh mục (Category): 0.10 MB
Tiết kiệm được: 98.7% RAM!`,
                  annotations: [
                    { line: 15, text: 'Giảm từ 7.65 MB xuống chỉ còn 0.10 MB (tiết kiệm gần 99% RAM) nhờ mã hóa category.' }
                  ]
                },
                {
                  title: 'Hệ thống Nullable Data Types và Logic Ba Giá Trị (Three-valued Kleene Logic)',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np

# 1. So sánh kiểu cũ (np.nan ép int thành float) vs kiểu mới (Int64 giữ nguyên số nguyên)
s_legacy = pd.Series([1, 2, np.nan, 4])
s_modern = pd.Series([1, 2, pd.NA, 4], dtype='Int64')

print("--- Dtype & Giá trị ---")
print("Legacy dtype (với np.nan):", s_legacy.dtype)
print("Modern dtype (với pd.NA): ", s_modern.dtype)

# 2. Logic 3 giá trị (Three-valued Kleene logic) với kiểu boolean
b_series = pd.Series([True, False, pd.NA], dtype='boolean')
print("\n--- Logic Ba Giá Trị (Kleene Logic) ---")
print("b & True: ", (b_series & True).tolist())
print("b & False:", (b_series & False).tolist())
print("b | True: ", (b_series | True).tolist())
print("b | False:", (b_series | False).tolist())`,
                  output: `--- Dtype & Giá trị ---
Legacy dtype (với np.nan): float64
Modern dtype (với pd.NA):  Int64

--- Logic Ba Giá Trị (Kleene Logic) ---
b & True:  [True, False, <NA>]
b & False: [False, False, False]
b | True:  [True, True, True]
b | False: [True, False, <NA>]`,
                  annotations: [
                    { line: 6, text: 'Kiểu Int64 viết hoa sử dụng bitmask array riêng biệt cho giá trị thiếu, không làm méo mó kiểu nguyên gốc.' },
                    { line: 17, text: 'Logic Kleene: Một mệnh đề AND với False luôn là False (kể cả khi vế kia là NA); mệnh đề OR với True luôn là True.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên đóng mở ngoặc đơn khi lọc nhiều điều kiện',
                content: 'Viết df[df[\"tuoi\"] > 20 & df[\"luong\"] > 10] sẽ ném lỗi TypeError hoặc tính toán sai vì trong Python toán tử & có độ ưu tiên cao hơn toán tử >! Bắt buộc phải viết: df[(df[\"tuoi\"] > 20) & (df[\"luong\"] > 10)].'
              }
            ],
            tips: [
              {
                title: 'Khi nào KHÔNG NÊN dùng category?',
                content: 'Chỉ dùng category khi số lượng giá trị duy nhất (cardinality) nhỏ hơn nhiều so với tổng số dòng (thường là < 5% số dòng). Nếu mỗi dòng là một mã định danh duy nhất (như UUID, số CCCD), dùng category sẽ tốn thêm RAM vì phải lưu thêm bảng mã hóa index!'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'Lọc và Tối ưu hóa Kiểu Dữ liệu Bảng Giao dịch',
              problem: 'Cho một DataFrame ghi nhận 1,000 đơn hàng gồm các cột: "ma_don" (chuỗi), "trang_thai" (chỉ gồm: Hoàn thành, Đang giao, Đã hủy), "gia_tri" (số thực). Hãy: (1) Chuyển cột trang_thai sang category, (2) Dùng .query() để trích xuất các đơn Hoàn thành có giá_tri > 500,000.',
              hint: 'Dùng df[\"trang_thai\"] = df[\"trang_thai\"].astype(\"category\") và df.query(\"...\").',
              solutionCode: `import pandas as pd

df_orders = pd.DataFrame({
    'ma_don': ['HD01', 'HD02', 'HD03', 'HD04'],
    'trang_thai': ['Hoàn thành', 'Đang giao', 'Hoàn thành', 'Đã hủy'],
    'gia_tri': [650000.0, 400000.0, 720000.0, 300000.0]
})

# 1. Ép kiểu category
df_orders['trang_thai'] = df_orders['trang_thai'].astype('category')

# 2. Lọc bằng .query()
result = df_orders.query("trang_thai == 'Hoàn thành' and gia_tri > 500000")

print("Kết quả lọc:")
print(result)`,
              solutionOutput: `Kết quả lọc:
  ma_don  trang_thai   gia_tri
0   HD01  Hoàn thành  650000.0
2   HD03  Hoàn thành  720000.0`,
              explanation: 'df_orders.query() cho phép viết cú pháp tự nhiên như SQL mà vẫn tận dụng được tốc độ xử lý nhanh của kiểu category.',
              annotations: [
                { line: 10, text: 'astype("category") tối ưu hóa dung lượng cột trạng thái.' }
              ]
            }
          ],
          summary: [
            '.loc[] chọn theo nhãn (inclusive); .iloc[] chọn theo vị trí số nguyên (exclusive).',
            'Boolean Masking bắt buộc dùng dấu ngoặc đơn và toán tử bitwise (&, |, ~).',
            '.query() giúp viết biểu thức lọc dữ liệu trong sáng, dễ đọc và hỗ trợ biến tham chiếu @biến.',
            'Kiểu category giúp tiết kiệm tới 90-98% bộ nhớ RAM cho các cột chuỗi có ít giá trị duy nhất.'
          ]
        },
        {
          id: 'ai-pd-03',
          number: '2.3',
          title: 'Làm sạch, Biến đổi & Groupby theo Mô hình Split-Apply-Combine',
          subtitle: 'Làm chủ accessor .str, xử lý Outlier, .agg(), .transform() và .apply() chuyên sâu',
          level: 'Trung cấp',
          duration: '45 phút',
          objectives: [
            'Làm sạch văn bản với String Accessor (.str) và ép kiểu an toàn với pd.to_numeric.',
            'Phát hiện và xử lý giá trị ngoại lai (Outliers) bằng phương pháp biên độ tứ phân vị (IQR).',
            'Hiểu bản chất 3 giai đoạn của mô hình Split-Apply-Combine trong GroupBy.',
            'Phân biệt rõ ràng giữa .agg() (thu gọn dữ liệu) và .transform() (giữ nguyên hình dạng mảng).'
          ],
          intuition: {
            title: 'Chia tổ làm việc, Giao chỉ tiêu và Tổng hợp báo cáo',
            metaphor: 'Mô hình Split-Apply-Combine giống như cách giám đốc quản lý một công ty lớn. Đầu tiên, giám đốc chia toàn bộ 500 nhân viên thành các phòng ban riêng biệt: Marketing, Kỹ thuật, Bán hàng (Bước SPLIT). Sau đó, ông giao nhiệm vụ cho từng phòng ban (Bước APPLY). Nếu ông yêu cầu mỗi phòng ban báo cáo một con số tổng kết doanh số (sử dụng .agg()), kết quả trả về là một bảng tóm tắt ngắn gọn gồm đúng 3 dòng. Nhưng nếu ông yêu cầu tính xem mỗi nhân viên đóng góp bao nhiêu phần trăm vào tổng doanh số của phòng mình (sử dụng .transform()), kết quả trả về vẫn giữ nguyên 500 dòng khớp với từng người ban đầu.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📊 Sơ đồ Phân nhánh: Split-Apply-Combine (.agg vs .transform)</div>
                <div style="display:flex;flex-direction:column;gap:8px;font-size:0.86rem;">
                  <div style="background:var(--bg-surface);padding:8px;border-radius:4px;border:1px solid var(--border-subtle);">
                    <strong>1. SPLIT:</strong> DataFrame (100 dòng) ➔ Chia theo 'Khu_vuc' thành 3 nhóm: Bắc (40), Trung (25), Nam (35)
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                    <div style="background:var(--topic-data-soft);padding:8px;border-radius:4px;border:1px solid var(--topic-data);">
                      <strong>2A. .agg('mean'):</strong><br>
                      Tính TB cho từng nhóm ➔ Kết quả <strong>thu gọn còn 3 dòng</strong> (Bắc, Trung, Nam).
                    </div>
                    <div style="background:rgba(14,165,233,0.12);padding:8px;border-radius:4px;border:1px solid #0ea5e9;">
                      <strong>2B. .transform('mean'):</strong><br>
                      Tính TB từng nhóm rồi phát ngược lại ➔ Kết quả <strong>vẫn đủ 100 dòng</strong> để ghép vào cột mới.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pd-cleaning-outliers',
              title: '1. Làm sạch Dữ liệu và Xử lý Ngoại lai (Outliers) bằng IQR',
              content: `
                <p>Quy trình làm sạch dữ liệu chuẩn gồm:</p>
                <ul>
                  <li><strong>Ép kiểu an toàn:</strong> Sử dụng <code>pd.to_numeric(col, errors='coerce')</code>. Các ô chứa ký tự bẩn (như "N/A", "?", "null") sẽ tự động biến thành <code>NaN</code> thay vì ném lỗi dừng chương trình.</li>
                  <li><strong>Xử lý chuỗi với <code>.str</code>:</strong> <code>df['ten'].str.strip().str.title()</code>, <code>df['email'].str.contains('@gmail.com')</code>.</li>
                  <li><strong>Phát hiện Outlier bằng IQR (Interquartile Range):</strong>
                    <br>Độ trải giữa $IQR = Q_3 - Q_1$. Một điểm dữ liệu được coi là ngoại lai nếu nằm ngoài khoảng: $[Q_1 - 1.5 \\times IQR,\\; Q_3 + 1.5 \\times IQR]$.
                  </li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Phát hiện và Lọc Outlier bằng phương pháp IQR',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np

# Giả lập dữ liệu tiền lương có 2 điểm ngoại lai bất thường (outliers)
data = {'nhan_vien': [f'NV{i}' for i in range(1, 11)],
        'luong': [15, 16, 17, 18, 19, 20, 21, 22, 120, -50]}  # 120 và -50 là outlier
df = pd.DataFrame(data)

# 1. Tính Q1, Q3 và IQR
Q1 = df['luong'].quantile(0.25)
Q3 = df['luong'].quantile(0.75)
IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# 2. Lọc bỏ các dòng ngoại lai
df_clean = df[(df['luong'] >= lower_bound) & (df['luong'] <= upper_bound)]

print(f"Ranh giới hợp lệ: [{lower_bound:.1f}, {upper_bound:.1f}]")
print(f"Số dòng ban đầu: {len(df)} | Số dòng sau khi loại outlier: {len(df_clean)}")
print("Các ngoại lai bị loại bỏ:")
print(df[~df.index.isin(df_clean.index)])`,
                  output: `Ranh giới hợp lệ: [10.4, 26.6]
Số dòng ban đầu: 10 | Số dòng sau khi loại outlier: 8
Các ngoại lai bị loại bỏ:
  nhan_vien  luong
8       NV9    120
9      NV10    -50`,
                  annotations: [
                    { line: 11, text: 'quantile(0.25) và quantile(0.75) xác định phân vị 25% và 75%.' },
                    { line: 20, text: '~df.index.isin(...) đảo ngược mask để xem các dòng bị loại.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-pd-groupby-agg-transform',
              title: '2. Làm chủ Groupby: .agg() vs .transform() vs .apply()',
              content: `
                <p>Một trong những điểm phân hóa giữa trình độ cơ bản và trung cấp trong Pandas là khả năng sử dụng linh hoạt <code>.agg()</code> và <code>.transform()</code>:</p>
                <ul>
                  <li><code>.agg()</code>: Thu gọn dữ liệu (Aggregation). Mỗi nhóm trả về 1 dòng. Thích hợp để làm báo cáo tổng hợp (KPI, doanh thu trung bình, số lượng).</li>
                  <li><code>.transform()</code>: Biến đổi dữ liệu (Transformation). Mỗi nhóm trả về một chuỗi có <strong>cùng kích thước với nhóm ban đầu</strong>. Rất hữu ích khi cần tạo cột mới so sánh từng cá nhân với mức trung bình của phòng ban!</li>
                  <li><code>.apply()</code>: Đưa toàn bộ DataFrame con của từng nhóm vào một hàm Python tùy ý. Linh hoạt nhất nhưng chậm nhất vì không tận dụng được tối ưu hóa C của Pandas.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'So sánh thực tiễn .agg() và .transform() trong phân tích tiền lương',
                  lang: 'Python',
                  code: `import pandas as pd

df = pd.DataFrame({
    'phong_ban': ['IT', 'IT', 'IT', 'Kinh Doanh', 'Kinh Doanh', 'HR'],
    'nhan_vien': ['An', 'Bình', 'Chi', 'Dũng', 'Giang', 'Hương'],
    'luong':     [25.0, 18.0, 32.0, 15.0, 22.0, 16.0]
})

# 1. Sử dụng .agg() để tóm tắt theo phòng ban
bao_cao = df.groupby('phong_ban')['luong'].agg(
    luong_tb='mean',
    luong_max='max',
    so_nguoi='count'
).reset_index()

print("--- 1. BÁO CÁO TỔNG HỢP (.agg) ---")
print(bao_cao)

# 2. Sử dụng .transform() để tính tỉ lệ lương so với trung bình phòng ban
df['luong_tb_phong'] = df.groupby('phong_ban')['luong'].transform('mean')
df['chenh_lech_pct'] = ((df['luong'] - df['luong_tb_phong']) / df['luong_tb_phong']) * 100

print("\n--- 2. TẠO CỘT MỚI GHÉP VÀO BẢNG GỐC (.transform) ---")
print(df[['phong_ban', 'nhan_vien', 'luong', 'luong_tb_phong', 'chenh_lech_pct']])`,
                  output: `--- 1. BÁO CÁO TỔNG HỢP (.agg) ---
    phong_ban   luong_tb  luong_max  so_nguoi
0          HR  16.000000       16.0         1
1          IT  25.000000       32.0         3
2  Kinh Doanh  18.500000       22.0         2

--- 2. TẠO CỘT MỚI GHÉP VÀO BẢNG GỐC (.transform) ---
    phong_ban nhan_vien  luong  luong_tb_phong  chenh_lech_pct
0          IT        An   25.0            25.0            0.00
1          IT      Bình   18.0            25.0          -28.00
2          IT       Chi   32.0            25.0           28.00
3  Kinh Doanh      Dũng   15.0            18.5          -18.92
4  Kinh Doanh     Giang   22.0            18.5           18.92
5          HR     Hương   16.0            16.0            0.00`,
                  annotations: [
                    { line: 9, text: '.agg() hỗ trợ đặt tên cột mới ngay trong cú pháp: ten_moi="ham".' },
                    { line: 19, text: '.transform("mean") trả về Series có độ dài 6, khớp chính xác từng hàng của bảng gốc.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Tránh dùng .apply() khi .agg() hoặc .transform() đã hỗ trợ',
                content: 'Hàm df.groupby(...).apply(lambda g: ...) chạy một vòng lặp Python thuần trên từng nhóm, chậm hơn từ 10 đến 50 lần so với các hàm built-in như transform(\"mean\") hoặc agg([\"sum\", \"std\"]). Hãy chỉ dùng apply khi logic bắt buộc phải xử lý phụ thuộc chéo nhiều cột phức tạp.'
              }
            ],
            tips: [
              {
                title: 'Phương thức ngắt nhóm as_index=False',
                content: 'Khi gọi df.groupby(\"phong_ban\", as_index=False)[\"luong\"].mean(), cột phòng ban sẽ giữ nguyên là một cột dữ liệu thông thường thay vì biến thành Index, giúp bạn không cần phải gọi thêm hàm .reset_index() ở cuối.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Chuẩn hóa Z-Score theo từng Phân khúc Khách hàng',
              problem: 'Cho bảng chi tiêu của khách hàng thuộc 2 phân khúc (VIP và Thường). Hãy dùng groupby kết hợp .transform() để tính Z-Score chi tiêu của mỗi khách hàng so với chính phân khúc của họ: Z = (chi_tieu - mean) / std.',
              hint: 'Viết hàm lambda bên trong .transform(): transform(lambda x: (x - x.mean()) / x.std()).',
              solutionCode: `import pandas as pd

df = pd.DataFrame({
    'phan_khuc': ['VIP', 'VIP', 'VIP', 'Thường', 'Thường', 'Thường'],
    'chi_tieu':  [120.0, 150.0, 90.0, 20.0, 35.0, 15.0]
})

# Tính Z-Score riêng theo từng phân khúc
df['z_score_phan_khuc'] = df.groupby('phan_khuc')['chi_tieu'].transform(
    lambda x: (x - x.mean()) / x.std()
)

print(df)`,
              solutionOutput: `  phan_khuc  chi_tieu  z_score_phan_khuc
0       VIP     120.0           0.000000
1       VIP     150.0           1.000000
2       VIP      90.0          -1.000000
3    Thường      20.0          -0.316228
4    Thường      35.0           1.161168
5    Thường      15.0          -0.844941`,
              explanation: 'Mỗi khách hàng VIP được chuẩn hóa dựa trên trung bình và độ lệch chuẩn của nhóm VIP; khách hàng Thường được chuẩn hóa theo nhóm Thường, không làm sai lệch thang đo.',
              annotations: [
                { line: 8, text: 'transform(lambda x: ...) xử lý từng vector của nhóm và trả về kích thước mảng ban đầu.' }
              ]
            }
          ],
          summary: [
            'Làm sạch an toàn bằng pd.to_numeric(errors=\"coerce\") và các hàm chuỗi .str.',
            'Phát hiện outlier bằng quy tắc IQR: [Q1 - 1.5*IQR, Q3 + 1.5*IQR].',
            'Split-Apply-Combine là mô hình trung tâm của xử lý dữ liệu nhóm.',
            '.agg() thu gọn dữ liệu thành ít dòng hơn; .transform() giữ nguyên số dòng để tạo cột mới.'
          ]
        },
        {
          id: 'ai-pd-04',
          number: '2.4',
          title: 'Kết hợp Dữ liệu & Định hình lại: Merge, Concat, Pivot & MultiIndex',
          subtitle: 'Làm chủ các kiểu JOIN, ghép nối Concat, xoay bảng Pivot/Melt và Chuỗi thời gian (Resample)',
          level: 'Trung cấp',
          duration: '40 phút',
          objectives: [
            'Thành thạo các kiểu JOIN trong pd.merge: inner, left, right, outer, cross.',
            'Nối ghép dữ liệu bằng pd.concat theo chiều dọc (axis=0) và chiều ngang (axis=1).',
            'Biến đổi cấu trúc bảng linh hoạt giữa dạng rộng (Wide) và dạng dài (Long/Tidy) bằng pivot_table và melt.',
            'Làm việc với chuỗi thời gian: thiết lập DatetimeIndex, lấy mẫu lại resample() và tạo biến trễ shift().'
          ],
          intuition: {
            title: 'Ghép bản đồ vệ tinh và Xoay khối Rubik dữ liệu',
            metaphor: 'pd.merge() giống như việc ghép nối hai cuốn sổ hộ khẩu theo số Căn cước công dân: dù một bên ghi địa chỉ nhà còn một bên ghi số tài khoản ngân hàng, chỉ cần khớp đúng mã định danh, hai thông tin sẽ được nối dài thành một dòng trọn vẹn. Còn pivot_table và melt giống như việc bạn xoay một khối Rubik: khi cần in báo cáo cho ban giám đốc dễ đọc bằng mắt thường, bạn xoay thành bảng rộng (Pivot: mỗi tháng là 1 cột). Khi cần đưa dữ liệu vào các mô hình Machine Learning hoặc thư viện vẽ đồ thị Seaborn, bạn duỗi phẳng ra thành bảng dài (Melt: 1 cột tháng, 1 cột doanh thu).',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🔄 Chuyển dịch Hai Chiều: Pivot (Bảng Rộng) vs Melt (Bảng Dài Tidy)</div>
                <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;">
                  <div style="background:var(--bg-surface);padding:8px;border-radius:4px;border:1px solid var(--border-subtle);font-size:0.82rem;">
                    <strong>Bảng Rộng (Wide-form):</strong>
                    <div>SP &nbsp; | T1 &nbsp; | T2 &nbsp; | T3</div>
                    <div>A &nbsp;&nbsp; | 100 | 120 | 150</div>
                  </div>
                  <div style="text-align:center;font-weight:700;color:var(--topic-data);">
                    ➔ melt() ➔<br>
                    ⬅ pivot() ⬅
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-radius:4px;border:1px solid var(--border-subtle);font-size:0.82rem;">
                    <strong>Bảng Dài (Tidy/Long-form):</strong>
                    <div>SP | Thang | DoanhThu</div>
                    <div>A &nbsp;| T1 &nbsp;&nbsp;&nbsp;| 100</div>
                    <div>A &nbsp;| T2 &nbsp;&nbsp;&nbsp;| 120</div>
                    <div>A &nbsp;| T3 &nbsp;&nbsp;&nbsp;| 150</div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pd-merge-concat',
              title: '1. Kết hợp Bảng Dữ liệu: pd.merge và pd.concat',
              content: `
                <p><strong>pd.merge (Tương đương SQL JOIN):</strong></p>
                <ul>
                  <li><code>how='inner'</code> (Mặc định): Chỉ giữ lại các khóa xuất hiện ở CẢ HAI bảng.</li>
                  <li><code>how='left'</code>: Giữ lại toàn bộ hàng của bảng trái; bảng phải không có thì điền <code>NaN</code>.</li>
                  <li><code>how='outer'</code>: Giữ lại toàn bộ hàng của cả hai bên (Full Outer Join).</li>
                  <li><code>how='cross'</code>: Tích Descartes (Cartesian product), ghép mọi hàng của bảng 1 với mọi hàng của bảng 2.</li>
                </ul>
                <p><strong>pd.concat:</strong> Xếp chồng các bảng lên nhau. <code>axis=0</code> (mặc định) là nối thêm hàng vào đuôi; <code>axis=1</code> là nối thêm cột sang bên phải dựa trên Index.</p>
              `,
              codeExamples: [
                {
                  title: 'Thực hành pd.merge (Left Join) và pd.concat',
                  lang: 'Python',
                  code: `import pandas as pd

# Bảng khách hàng và bảng đơn hàng
khach = pd.DataFrame({'id_kh': [1, 2, 3], 'ten': ['An', 'Bình', 'Chi']})
don_hang = pd.DataFrame({'id_don': [101, 102, 103], 'id_kh': [1, 2, 99], 'tien': [250, 400, 150]})

# 1. Left Join: Giữ tất cả khách hàng, dù chưa có đơn hàng nào
merged_left = pd.merge(khach, don_hang, on='id_kh', how='left')
print("--- 1. LEFT JOIN (khach hàng & đơn hàng) ---")
print(merged_left)

# 2. Concat: Nối thêm dữ liệu khách hàng mới vào đuôi bảng
khach_moi = pd.DataFrame({'id_kh': [4, 5], 'ten': ['Dũng', 'Hương']})
khach_tong = pd.concat([khach, khach_moi], ignore_index=True)
print("\n--- 2. CONCAT NỐI HÀNG (ignore_index=True) ---")
print(khach_tong)`,
                  output: `--- 1. LEFT JOIN (khach hàng & đơn hàng) ---
   id_kh   ten  id_don   tien
0      1    An   101.0  250.0
1      2  Bình   102.0  400.0
2      3   Chi     NaN    NaN

--- 2. CONCAT NỐI HÀNG (ignore_index=True) ---
   id_kh    ten
0      1     An
1      2   Bình
2      3    Chi
3      4   Dũng
4      5  Hương`,
                  annotations: [
                    { line: 8, text: 'Khách hàng "Chi" (id=3) chưa mua đơn nào nên id_don và tien nhận giá trị NaN.' },
                    { line: 15, text: 'ignore_index=True đánh lại số thứ tự index từ 0 đến N-1 liên tục.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-pd-pivot-melt-timeseries',
              title: '2. Tái cấu trúc Bảng (Pivot/Melt) và Phân tích Chuỗi Thời gian',
              content: `
                <p><strong>pivot_table vs melt:</strong></p>
                <ul>
                  <li><code>pivot_table(index, columns, values, aggfunc='mean')</code>: Xoay bảng từ dạng dài sang dạng bảng 2 chiều, tự động tính tổng hợp khi có nhiều giá trị trùng khóa.</li>
                  <li><code>melt(id_vars, value_vars, var_name, value_name)</code>: Ngược lại với pivot, "làm tan chảy" các cột rộng thành các hàng dài, đưa dữ liệu về chuẩn Tidy Data.</li>
                </ul>
                <p><strong>Chuỗi thời gian (Time Series):</strong> Khi Index là <code>pd.DatetimeIndex</code>, bạn sở hữu những siêu năng lực phân tích:</p>
                <ul>
                  <li><code>df.resample('M').sum()</code>: Gom nhóm và lấy mẫu lại theo Tháng, Quý, Năm (Downsampling).</li>
                  <li><code>df['gia'].rolling(window=7).mean()</code>: Tính đường trung bình động 7 ngày (Moving Average).</li>
                  <li><code>df['gia'].shift(1)</code>: Dịch lùi dữ liệu 1 bước thời gian để tính mức tăng trưởng (Lag feature).</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Phân tích Chuỗi thời gian: shift(1), rolling(7) và Lấy mẫu lại resample("ME")',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np

# Tạo chuỗi thời gian 60 ngày liên tiếp
dates = pd.date_range('2026-01-01', periods=60, freq='D')
rng = np.random.default_rng(42)
df_ts = pd.DataFrame({
    'doanh_thu': rng.integers(100, 300, size=60)
}, index=dates)

# 1. Tính toán chuỗi: Shift (Lag feature) và Rolling (Moving Average 7 ngày)
df_ts['doanh_thu_hom_qua'] = df_ts['doanh_thu'].shift(1)
df_ts['ma_7ngay'] = df_ts['doanh_thu'].rolling(window=7).mean()

print("--- 1. Chuỗi thời gian: shift(1) và rolling(7) (5 dòng đầu) ---")
print(df_ts.head(5))

# 2. Lấy mẫu lại theo Tháng (Downsampling resample với 'ME' - Month End)
monthly_summary = df_ts.resample('ME').agg({
    'doanh_thu': ['count', 'sum', 'mean']
})
print("\n--- 2. Tổng hợp theo Tháng bằng .resample('ME') ---")
print(monthly_summary)`,
                  output: `--- 1. Chuỗi thời gian: shift(1) và rolling(7) (5 dòng đầu) ---
            doanh_thu  doanh_thu_hom_qua  ma_7ngay
2026-01-01        117                NaN       NaN
2026-01-02        254              117.0       NaN
2026-01-03        230              254.0       NaN
2026-01-04        187              230.0       NaN
2026-01-05        186              187.0       NaN

--- 2. Tổng hợp theo Tháng bằng .resample('ME') ---
           doanh_thu                  
               count   sum        mean
2026-01-31        31  6452  208.129032
2026-02-28        28  5585  199.464286
2026-03-31         1   236  236.000000`,
                  annotations: [
                    { line: 12, text: 'shift(1) dịch chuyển lùi 1 chu kỳ để tính sai phân hoặc tỷ lệ tăng trưởng so với ngày trước.' },
                    { line: 13, text: 'rolling(window=7) tạo cửa sổ trượt 7 ngày để làm mịn nhiễu dao động ngắn hạn.' },
                    { line: 20, text: 'resample("ME") gom nhóm theo mốc cuối tháng tương tự SQL GROUP BY DATE_TRUNC("month", date).' }
                  ]
                }
              ]
            },
            {
              id: 'sec-pd-stack-unstack-multiindex',
              title: '3. Xoay Trục Đa Cấp với stack() và unstack() trên MultiIndex',
              content: `
                <p>Khi làm việc với các báo cáo tài chính hoặc chuỗi dữ liệu đa chiều, cấu trúc <strong>MultiIndex</strong> (Chỉ mục phân cấp) cho phép biểu diễn dữ liệu nhiều chiều trong một bảng 2D. Hai thao tác xoay trục then chốt là:</p>
                <ul>
                  <li><strong>unstack(level):</strong> Chuyển một cấp chỉ mục từ <em>Hàng (Index) sang Cột (Columns)</em>. Bảng trở nên "thấp hơn và rộng hơn" (Dạng bảng tổng hợp Pivot).</li>
                  <li><strong>stack(level):</strong> Chuyển một cấp chỉ mục từ <em>Cột (Columns) xuống Hàng (Index)</em>. Bảng trở nên "hẹp hơn và sâu hơn" (Dạng bảng chuẩn Tidy Data).</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực hành Xoay trục MultiIndex với stack() và unstack()',
                  lang: 'Python',
                  code: `import pandas as pd

# Tạo bảng tổng hợp doanh số đa cấp theo Chi nhánh, Năm và Chỉ số tài chính
df_multi = pd.DataFrame({
    ('2026', 'Doanh thu'): [100, 150, 200],
    ('2026', 'Lợi nhuận'): [20, 35, 50],
    ('2027', 'Doanh thu'): [120, 180, 240],
    ('2027', 'Lợi nhuận'): [25, 45, 65]
}, index=['Chi nhánh A', 'Chi nhánh B', 'Chi nhánh C'])
df_multi.columns.names = ['Năm', 'Chỉ số']

print("--- 1. Bảng ban đầu (MultiIndex Columns) ---")
print(df_multi)

# stack() dồn mức 'Năm' từ Cột xuống làm Index Hàng (Dài hơn, hẹp hơn)
stacked = df_multi.stack(level='Năm')
print("\n--- 2. Sau khi df.stack(level='Năm') ---")
print(stacked)

# unstack() xoay ngược lại một mức từ Hàng lên thành Cột
unstacked = stacked.unstack(level='Năm')
print("\n--- 3. Sau khi df.unstack(level='Năm') ---")
print(unstacked)`,
                  output: `--- 1. Bảng ban đầu (MultiIndex Columns) ---
Năm              2026                2027          
Chỉ số      Doanh thu Lợi nhuận Doanh thu Lợi nhuận
Chi nhánh A       100        20       120        25
Chi nhánh B       150        35       180        45
Chi nhánh C       200        50       240        65

--- 2. Sau khi df.stack(level='Năm') ---
Chỉ số            Doanh thu  Lợi nhuận
            Năm                       
Chi nhánh A 2026        100         20
            2027        120         25
Chi nhánh B 2026        150         35
            2027        180         45
Chi nhánh C 2026        200         50
            2027        240         65

--- 3. Sau khi df.unstack(level='Năm') ---
Chỉ số      Doanh thu      Lợi nhuận     
Năm              2026 2027      2026 2027
Chi nhánh A       100  120        20   25
Chi nhánh B       150  180        35   45
Chi nhánh C       200  240        50   65`,
                  annotations: [
                    { line: 15, text: 'df.stack(level="Năm") biến cấp cột "Năm" thành một mức cấp 2 của Index hàng.' },
                    { line: 20, text: 'df.unstack(level="Năm") khôi phục lại cột theo đúng cấu trúc ban đầu.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bùng nổ số dòng khi Merge do khóa bị trùng lặp (Many-to-Many)',
                content: 'Nếu cột khóa on=\"id\" xuất hiện trùng lặp nhiều lần ở CẢ HAI bảng, phép merge sẽ sinh ra tích chéo (n x m dòng), khiến kích thước dữ liệu tăng vọt ngoài tầm kiểm soát. Hãy luôn kiểm tra df[col].duplicated().any() trước khi merge!'
              }
            ],
            tips: [
              {
                title: 'Tham số validate trong pd.merge',
                content: 'Pandas hỗ trợ tham số cực hay: pd.merge(..., validate=\"1:m\"). Pandas sẽ tự động kiểm tra và quăng lỗi ngay lập tức nếu bảng bên trái có khóa bị trùng lặp, giúp bạn bảo vệ dữ liệu tuyệt đối.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Chuyển đổi Bảng Chấm công từ Rộng sang Dài bằng melt',
              problem: 'Cho bảng chấm công rộng gồm các cột: \"ma_nv\", \"thu_2\", \"thu_3\", \"thu_4\" ghi nhận số giờ làm. Hãy dùng hàm pd.melt() biến đổi bảng này thành dạng dài có đúng 3 cột: \"ma_nv\", \"ngay_trong_tuan\", \"so_gio\".',
              hint: 'pd.melt(df, id_vars=[\"ma_nv\"], var_name=\"ngay_trong_tuan\", value_name=\"so_gio\").',
              solutionCode: `import pandas as pd

df_cham_cong = pd.DataFrame({
    'ma_nv': ['NV1', 'NV2'],
    'thu_2': [8, 8],
    'thu_3': [8, 7],
    'thu_4': [9, 8]
})

# Dùng melt để chuyển thành dạng dài chuẩn Tidy Data
df_long = pd.melt(
    df_cham_cong,
    id_vars=['ma_nv'],
    var_name='ngay_trong_tuan',
    value_name='so_gio'
)

print(df_long)`,
              solutionOutput: `  ma_nv ngay_trong_tuan  so_gio
0   NV1           thu_2       8
1   NV2           thu_2       8
2   NV1           thu_3       8
3   NV2           thu_3       7
4   NV1           thu_4       9
5   NV2           thu_4       8`,
              explanation: 'Dạng dài (long-form) giúp bạn dễ dàng đưa dữ liệu vào các biểu đồ phân tích xu hướng hoặc lọc dữ liệu theo ngày trong tuần.',
              annotations: [
                { line: 9, text: 'id_vars giữ nguyên cột định danh; các cột còn lại bị gập xuống thành 2 cột tên và giá trị.' }
              ]
            }
          ],
          summary: [
            'pd.merge thực hiện các phép JOIN chuẩn mực: inner, left, right, outer, cross.',
            'pd.concat nối thêm hàng (axis=0) hoặc nối thêm cột (axis=1).',
            'pivot_table chuyển từ dài sang rộng; melt chuyển từ rộng sang dài chuẩn Tidy Data.',
            'DatetimeIndex mở ra các công cụ chuỗi thời gian mạnh mẽ: resample, rolling và shift.'
          ]
        },
        {
          id: 'ai-pd-05',
          number: '2.5',
          title: 'Hiệu năng Cao, Copy-on-Write & Đọc/Ghi Dữ liệu Lớn theo Chunk',
          subtitle: 'Bậc thang tốc độ Pandas, hiểu rõ Copy-on-Write (CoW), đọc file khổng lồ với chunksize và Parquet',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Nắm vững bậc thang hiệu năng: Vectorization >> itertuples >> apply >> iterrows.',
            'Hiểu cơ chế mang tính cách mạng Copy-on-Write (CoW) trong Pandas 2.0+ và chấm dứt SettingWithCopyWarning.',
            'Thành thạo kỹ thuật xử lý tệp dữ liệu vượt quá dung lượng RAM bằng tham số chunksize.',
            'So sánh sự vượt trội về tốc độ và dung lượng của định dạng cột Parquet so với CSV truyền thống.'
          ],
          intuition: {
            title: 'Quy tắc Bản quyền Mượn sách và Đường ray Xe lửa Chở than',
            metaphor: 'Cơ chế Copy-on-Write (CoW) giống như một thư viện thông minh: khi bạn mượn một cuốn sách (tạo slice con từ DataFrame gốc), thư viện không in ngay một cuốn sách mới cho bạn (không tốn thêm RAM). Bạn và người mượn trước cùng đọc chung một bản in. Nhưng ngay khoảnh khắc bạn cầm bút chuẩn bị viết sửa một chữ vào trang sách, thủ thư lập tức photo nhanh trang sách đó cho bạn sửa riêng (Copy on Write!). Nhờ vậy, sách gốc không bao giờ bị bôi bẩn oan uổng. Còn kỹ thuật đọc chunksize giống như một đoàn tàu chở than: nếu kho than quá nhỏ không chứa nổi 100 tấn than cùng lúc, tàu sẽ chở từng toa 5 tấn đến dỡ hàng, xử lý xong rồi mới quay lại lấy toa tiếp theo.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚡ Bậc thang Hiệu năng Xử lý Hàng triệu Dòng trong Pandas</div>
                <div style="display:flex;flex-direction:column;gap:6px;font-size:0.84rem;">
                  <div style="background:#dcfce7;color:#166534;padding:8px;border-radius:4px;font-weight:700;">
                    1. Vectorization / NumPy Expressions ➔ Tốc độ: ~1x (Chuẩn tham chiếu, ~2ms cho 1M dòng)
                  </div>
                  <div style="background:#e0f2fe;color:#075985;padding:8px;border-radius:4px;">
                    2. List Comprehension trên mảng Series ➔ Chậm hơn ~3-5x
                  </div>
                  <div style="background:#fef3c7;color:#92400e;padding:8px;border-radius:4px;">
                    3. df.itertuples() (Namedtuple duyệt C) ➔ Chậm hơn ~20-50x
                  </div>
                  <div style="background:#fee2e2;color:#991b1b;padding:8px;border-radius:4px;">
                    4. df.apply(lambda row: ...) (Python function call) ➔ Chậm hơn ~100-300x
                  </div>
                  <div style="background:#f3f4f6;color:#374151;padding:8px;border-radius:4px;border:1px solid #d1d5db;">
                    5. df.iterrows() (Tạo Series mỗi dòng) ➔ Chậm hơn ~1000x! (TUYỆT ĐỐI KHÔNG DÙNG)
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pd-cow',
              title: '1. Cuộc Cách mạng Copy-on-Write (CoW) trong Pandas',
              content: `
                <p>Trước phiên bản Pandas 2.0, một trong những nỗi bức xúc lớn nhất của lập trình viên là cảnh báo khó hiểu: <code>SettingWithCopyWarning</code>. Nguyên nhân là vì người dùng không thể biết chắc một lệnh slice trả về View hay Copy.</p>
                <p><strong>Cơ chế Copy-on-Write (CoW):</strong></p>
                <ul>
                  <li>Mọi thao tác trích xuất dữ liệu (slice, index) mặc định <strong>hoàn toàn là View (Zero-Copy)</strong>, không tốn thêm byte RAM nào.</li>
                  <li>Nếu bạn cố gắng sửa đổi dữ liệu trên view con (<code>sub_df['col'] = 10</code>), Pandas sẽ <strong>tự động tạo một bản sao độc lập (Copy) NGAY TRƯỚC KHI GHI</strong>.</li>
                  <li>Kết quả: Mảng gốc không bao giờ bị biến đổi ngoài ý muốn, và <code>SettingWithCopyWarning</code> hoàn toàn biến mất khỏi lịch sử!</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Bật Copy-on-Write và Kiểm chứng cơ chế bảo vệ dữ liệu',
                  lang: 'Python',
                  code: `import pandas as pd

# Kích hoạt Copy-on-Write (từ Pandas 3.0 sẽ là mặc định toàn cầu)
pd.options.mode.copy_on_write = True

# Tạo DataFrame gốc
df_goc = pd.DataFrame({'gia': [100, 200, 300], 'sl': [1, 2, 3]})

# Tạo view con bằng slicing
view_con = df_goc[['gia']]

# Thay đổi giá trị trên view_con
view_con['gia'] = [999, 888, 777]

print("View con sau khi sửa:")
print(view_con)
print("\nDataFrame gốc (Vẫn nguyên vẹn 100% nhờ Copy-on-Write!):")
print(df_goc)`,
                  output: `View con sau khi sửa:
   gia
0  999
1  888
2  777

DataFrame gốc (Vẫn nguyên vẹn 100% nhờ Copy-on-Write!):
   gia  sl
0  100   1
1  200   2
2  300   3`,
                  annotations: [
                    { line: 4, text: 'Copy-on-Write bảo đảm tính toàn vẹn: việc ghi đè trên view không làm hỏng mảng gốc.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-pd-chunks-parquet',
              title: '2. Xử lý Tệp Siêu lớn: Đọc theo Chunk và Định dạng Parquet',
              content: `
                <p>Khi tệp CSV có kích thước 20GB mà máy tính của bạn chỉ có 8GB RAM, việc gọi <code>pd.read_csv('file.csv')</code> sẽ làm sập chương trình với lỗi <code>MemoryError (OOM)</code>.</p>
                <p><strong>Giải pháp 1: Đọc theo từng khối (Chunking):</strong> Truyền tham số <code>chunksize=100_000</code> vào <code>read_csv()</code>. Pandas sẽ trả về một Iterator cho phép xử lý và tổng hợp từng mẩu dữ liệu nhỏ rồi giải phóng RAM trước khi đọc tiếp.</p>
                <p><strong>Giải pháp 2: Chuyển sang định dạng Parquet:</strong> Định dạng CSV lưu văn bản thô, tốn dung lượng và phải quét tuần tự toàn bộ file. Ngược lại, <strong>Apache Parquet</strong> lưu trữ dạng cột (Columnar format), nén dữ liệu bằng thuật toán Snappy và hỗ trợ đọc chính xác cột cần thiết mà không phải nạp các cột thừa!</p>
              `,
              codeExamples: [
                {
                  title: 'Kỹ thuật đọc dữ liệu lớn theo Chunksize',
                  lang: 'Python',
                  code: `import pandas as pd
import io

# Giả lập luồng dữ liệu CSV lớn
csv_data = """ma_don,doanh_thu
HD01,500
HD02,700
HD03,300
HD04,900
HD05,400
HD06,600"""

# Đọc từng khối 2 dòng một (chunksize=2)
total_revenue = 0
total_orders = 0

for chunk in pd.read_csv(io.StringIO(csv_data), chunksize=2):
    # Xử lý tổng hợp trên từng mẩu nhỏ
    total_revenue += chunk['doanh_thu'].sum()
    total_orders += len(chunk)

print(f"Tổng doanh thu tích lũy: {total_revenue:,} VNĐ")
print(f"Tổng số đơn hàng:       {total_orders} đơn")`,
                  output: `Tổng doanh thu tích lũy: 3,400 VNĐ
Tổng số đơn hàng:       6 đơn`,
                  annotations: [
                    { line: 17, text: 'chunksize=2 trả về TextFileReader iterator, mỗi lần lặp chỉ nạp đúng 2 dòng vào RAM.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Dùng df.iterrows() trong các bài toán thực tế',
                content: 'df.iterrows() đóng gói từng dòng thành một Series riêng biệt nên chậm khủng khiếp. Nếu phải duyệt dòng vì một lý do bất khả kháng, hãy luôn dùng df.itertuples() (nhanh hơn ít nhất 20 đến 50 lần) hoặc gom mảng thành zip(df[\"cot1\"], df[\"cot2\"]).'
              }
            ],
            tips: [
              {
                title: 'Lưu trữ Parquet thay vì CSV trong Production',
                content: 'Tệp Parquet có dung lượng nhỏ hơn CSV từ 3 đến 5 lần và tốc độ đọc/ghi nhanh hơn gấp 10 lần. Ngoài ra, Parquet lưu trữ chính xác schema (dtypes) của từng cột, không bao giờ lo bị đọc nhầm ngày tháng hay số 0 ở đầu mã số điện thoại.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Tối ưu hóa Bảng Dữ liệu Tiết kiệm 75% Bộ nhớ RAM',
              problem: 'Cho một DataFrame có 1 triệu dòng gồm 3 cột: id (từ 1 đến 1M), status (chỉ gồm: new, pending, done), score (từ 0.0 đến 100.0). Hãy tối ưu dtypes của bảng này bằng cách ép kiểu id sang uint32, status sang category, score sang float32 để giảm thiểu RAM.',
              hint: 'Dùng df.astype({\"id\": \"uint32\", \"status\": \"category\", \"score\": \"float32\"}).',
              solutionCode: `import pandas as pd
import numpy as np

N = 100_000
df = pd.DataFrame({
    'id': np.arange(N, dtype=np.int64),
    'status': np.random.choice(['new', 'pending', 'done'], size=N),
    'score': np.random.uniform(0, 100, size=N)  # mặc định float64
})

mem_before = df.memory_usage(deep=True).sum() / 1024 / 1024

# Tối ưu hóa kiểu dữ liệu
df_opt = df.astype({
    'id': 'uint32',
    'status': 'category',
    'score': 'float32'
})

mem_after = df_opt.memory_usage(deep=True).sum() / 1024 / 1024

print(f"Bộ nhớ trước tối ưu: {mem_before:.2f} MB")
print(f"Bộ nhớ sau tối ưu:   {mem_after:.2f} MB")
print(f"Tiết kiệm được:      {((mem_before - mem_after) / mem_before) * 100:.1f}% RAM!")`,
              solutionOutput: `Bộ nhớ trước tối ưu: 8.01 MB
Bộ nhớ sau tối ưu:   0.88 MB
Tiết kiệm được:      89.0% RAM!`,
              explanation: 'Bằng cách chuyển int64 sang uint32 (giảm 50%), float64 sang float32 (giảm 50%) và chuỗi sang category (giảm 95%), ta tiết kiệm được tới 89% RAM mà dữ liệu hoàn toàn không suy hao chất lượng.',
              annotations: [
                { line: 15, text: 'Chỉ định tường minh dictionary dtypes trong astype() để ép kiểu hàng loạt.' }
              ]
            }
          ],
          summary: [
            'Vectorization là ưu tiên số 1; tuyệt đối tránh dùng df.iterrows() vì quá chậm.',
            'Copy-on-Write (CoW) trong Pandas hiện đại tự động tạo bản sao khi ghi, chấm dứt hoàn toàn lỗi SettingWithCopyWarning.',
            'Đọc dữ liệu vượt RAM bằng cách chia nhỏ với tham số chunksize trong pd.read_csv.',
            'Parquet là định dạng lưu trữ dạng cột tiêu chuẩn công nghiệp: nén tốt hơn, đọc nhanh hơn và bảo tồn schema.'
          ]
        },
        {
          id: 'ai-pd-06',
          number: '2.6',
          title: 'Dự án Thực chiến: Phân tích & Làm sạch Bộ Dữ liệu Thương mại Điện tử Thực tế',
          subtitle: 'Quy trình xử lý hoàn chỉnh từ dữ liệu thô, loại bỏ hoàn tiền, phân tích RFM đến xuất báo cáo Parquet',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Xây dựng pipeline làm sạch dữ liệu thương mại điện tử thực tế từ đầu đến cuối.',
            'Phân tích chỉ số RFM (Recency, Frequency, Monetary) để phân khúc khách hàng.',
            'Sử dụng qcut() và groupby để chấm điểm giá trị khách hàng.',
            'Xuất kết quả sang định dạng Parquet nén Snappy đạt chuẩn sản xuất.'
          ],
          intuition: {
            title: 'Sàng lọc cát vàng từ mỏ quặng thô',
            metaphor: 'Dữ liệu giao dịch thương mại điện tử trong thực tế luôn chứa đầy "rác": đơn hàng bị hủy, hàng bị trả lại, khách hàng điền sai định dạng, giá trị âm. Dự án này giống như một dây chuyền tuyển quặng hiện đại: quặng thô đi qua các lưới lọc kiểu dữ liệu, các nam châm hút sắt loại bỏ đơn hoàn tiền, các buồng phân loại (RFM Segmentation) chia khách hàng thành các nhóm kim cương, vàng, bạc. Cuối cùng, những thỏi vàng tinh khiết được đóng gói vào các thùng hàng tiêu chuẩn Parquet gọn nhẹ sẵn sàng chuyển tới các mô hình AI.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">💎 Mô hình Phân khúc Khách hàng RFM (Recency - Frequency - Monetary)</div>
                <div class="eco-grid">
                  <div class="eco-card">
                    <strong style="color:var(--topic-data);">R - Recency:</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">Bao nhiêu ngày kể từ lần mua sắm cuối cùng của khách hàng? Càng gần đây càng tốt!</div>
                  </div>
                  <div class="eco-card">
                    <strong style="color:#0ea5e9;">F - Frequency:</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">Khách hàng đã mua tổng cộng bao nhiêu đơn trong suốt lịch sử?</div>
                  </div>
                  <div class="eco-card">
                    <strong style="color:#8b5cf6;">M - Monetary:</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">Tổng số tiền khách hàng đã chi trả là bao nhiêu?</div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pd-project-rfm',
              title: '1. Hiện thực hóa Pipeline Phân tích RFM Toàn diện',
              content: `
                <p>Dưới đây là mã nguồn Python hoàn chỉnh của pipeline xử lý dữ liệu giao dịch và phân tích phân khúc khách hàng:</p>
              `,
              codeExamples: [
                {
                  title: 'Toàn bộ Pipeline Làm sạch Dữ liệu và Phân khúc RFM',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np

# 1. Giả lập dữ liệu giao dịch thực tế gồm 6 đơn hàng
raw_data = {
    'ma_don':      ['HD01', 'HD02', 'HD03', 'HD04', 'HD05', 'HD06'],
    'ma_kh':       ['KH01', 'KH02', 'KH01', 'KH03', 'KH02', 'KH01'],
    'ngay_mua':    ['2026-01-05', '2026-01-10', '2026-02-15', '2026-01-02', '2026-02-20', '2026-02-28'],
    'so_luong':    [2, 1, 3, 5, -1, 1],          # -1 là đơn bị trả hàng!
    'don_gia':     [150.0, 300.0, 150.0, 50.0, 300.0, 200.0]
}
df = pd.DataFrame(raw_data)

# 2. Bước làm sạch: Chuyển ngày tháng và loại bỏ đơn trả hàng
df['ngay_mua'] = pd.to_datetime(df['ngay_mua'])
df_clean = df[df['so_luong'] > 0].copy()
df_clean['thanh_tien'] = df_clean['so_luong'] * df_clean['don_gia']

# 3. Tính toán RFM: Giả sử ngày chốt phân tích là 2026-03-01
ngay_chot = pd.to_datetime('2026-03-01')

rfm = df_clean.groupby('ma_kh').agg(
    Recency=('ngay_mua', lambda dates: (ngay_chot - dates.max()).days),
    Frequency=('ma_don', 'count'),
    Monetary=('thanh_tien', 'sum')
).reset_index()

# 4. Phân loại phân khúc khách hàng dựa trên Monetary
def gan_nhom(tien):
    if tien >= 500: return 'Khách hàng VIP'
    elif tien >= 250: return 'Khách hàng Thân thiết'
    else: return 'Khách hàng Tiềm năng'

rfm['phan_khuc'] = rfm['Monetary'].apply(gan_nhom)

print("--- KẾT QUẢ BẢNG PHÂN KHÚC KHÁCH HÀNG RFM ---")
print(rfm)

# 5. Xuất báo cáo sang định dạng Parquet
rfm.to_parquet('rfm_report.parquet', index=False)`,
                  output: `--- KẾT QUẢ BẢNG PHÂN KHÚC KHÁCH HÀNG RFM ---
  ma_kh  Recency  Frequency  Monetary              phan_khuc
0  KH01        1          3     950.0         Khách hàng VIP
1  KH02       50          1     300.0  Khách hàng Thân thiết
2  KH03       58          1     250.0  Khách hàng Thân thiết`,
                  annotations: [
                    { line: 15, text: 'Lọc bỏ đơn hàng âm (so_luong > 0) để không làm sai lệch số liệu doanh thu.' },
                    { line: 20, text: 'agg() với named aggregation giúp tính đồng thời R, F, M chỉ trong một lượt duyệt.' },
                    { line: 36, text: 'to_parquet lưu trữ dữ liệu nén đạt chuẩn trao đổi trong Data Lake / Data Warehouse.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy chia phân vị pd.qcut khi dữ liệu có nhiều giá trị trùng nhau',
                content: 'Khi nhiều khách hàng có cùng số lần mua hàng (ví dụ 80% khách chỉ mua đúng 1 lần), hàm pd.qcut(df[\"Frequency\"], q=4) sẽ báo lỗi Bin edges must be unique. Hãy truyền thêm tham số duplicates=\"drop\" hoặc chuyển sang pd.cut() với các mốc thủ công.'
              }
            ],
            tips: [
              {
                title: 'Tự động hóa với Method Chaining trong Pandas',
                content: 'Bạn có thể viết toàn bộ pipeline làm sạch liên hoàn mà không cần tạo biến tạm bằng cú pháp đóng ngoặc: df_clean = (df.pipe(loc_am).assign(thanh_tien=...).dropna()). Phong cách này giúp code trong sáng và dễ viết Unit Test.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Thêm chỉ số AOV (Average Order Value) vào Bảng RFM',
              problem: 'Từ bảng rfm ở trên, hãy tính thêm cột AOV = Monetary / Frequency (Giá trị trung bình trên mỗi đơn hàng) và tìm xem khách hàng nào có AOV cao nhất.',
              hint: 'rfm[\"AOV\"] = rfm[\"Monetary\"] / rfm[\"Frequency\"], sau đó dùng .nlargest(1, \"AOV\").',
              solutionCode: `import pandas as pd

# Giả định bảng rfm đã có sẵn
rfm['AOV'] = rfm['Monetary'] / rfm['Frequency']
top_aov = rfm.nlargest(1, 'AOV')

print("Khách hàng có giá trị đơn hàng trung bình cao nhất:")
print(top_aov[['ma_kh', 'AOV', 'phan_khuc']])`,
              solutionOutput: `Khách hàng có giá trị đơn hàng trung bình cao nhất:
  ma_kh         AOV       phan_khuc
0  KH01  316.666667  Khách hàng VIP`,
              explanation: 'Khách hàng KH01 không chỉ mua nhiều lần nhất (Frequency=3) mà còn có giá trị trung bình mỗi lần mua cao nhất (316.67), xứng đáng là khách hàng VIP cốt lõi của doanh nghiệp.',
              annotations: [
                { line: 5, text: 'nlargest(1, "AOV") trích xuất dòng có giá trị lớn nhất nhanh hơn sắp xếp toàn bộ bảng.' }
              ]
            }
          ],
          summary: [
            'Pipeline làm sạch chuyên nghiệp loại bỏ đơn hàng âm, xử lý định dạng ngày tháng và tính cột phát sinh.',
            'Phân tích RFM là chuẩn mực phân khúc khách hàng trong thương mại điện tử dựa trên Recency, Frequency, Monetary.',
            'Method Chaining và Named Aggregation giúp code xử lý dữ liệu ngắn gọn, thanh lịch và ít lỗi.',
            'Định dạng Parquet là bước chốt hạ hoàn hảo để lưu trữ dữ liệu sạch sẵn sàng cho Dashboard và Machine Learning.'
          ]
        }
      ]
    }
  ]
};
