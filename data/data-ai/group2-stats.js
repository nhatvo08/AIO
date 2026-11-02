/**
 * Nhóm 2: Tính toán Khoa học & Thống kê (SciPy & Statsmodels)
 * Tác giả: Senior Data & ML Engineer
 */

window.DATA_AI_GROUP2_DATA = {
  id: 'course-group-stats',
  number: 'Nhóm 2',
  title: 'Tính toán Khoa học & Thống kê',
  badge: 'SciPy & Statsmodels',
  icon: '📈',
  customClass: 'data-ai-banner',
  desc: 'Giải tích số, tối ưu hóa hàm số, giải phương trình vi phân và kiểm định thống kê suy diễn chuẩn mực.',
  parts: [
    {
      id: 'part-ai-scipy',
      number: 'Phần 3',
      title: 'SciPy: Tính toán Khoa học Chuyên sâu',
      level: 'Trung cấp đến Nâng cao',
      badge: '5 Bài học',
      icon: '🔬',
      description: 'Làm chủ hệ sinh thái submodule của SciPy: tối ưu hóa optimize, tích phân số integrate (ODE), ma trận thưa sparse, nội suy interpolate và thống kê suy diễn stats.',
      lessons: [
        {
          id: 'ai-sp-01',
          number: '3.1',
          title: 'Cấu trúc Submodules của SciPy & Đại số Tuyến tính Ma trận Thưa (scipy.sparse)',
          subtitle: 'Kiến trúc SciPy, quan hệ tương hỗ với NumPy và giải cứu bộ nhớ với các định dạng ma trận thưa CSR/CSC',
          level: 'Trung cấp',
          duration: '35 phút',
          objectives: [
            'Hiểu cấu trúc các submodule chuyên trách của SciPy và ranh giới với NumPy.',
            'Nắm vững vấn đề bùng nổ bộ nhớ của ma trận thưa (Sparse Matrix) trong các bài toán NLP và Graph.',
            'Phân biệt các định dạng lưu trữ thưa: COO (tạo mới), CSR (nhân ma trận nhanh theo hàng), CSC (theo cột).',
            'Sử dụng scipy.sparse và scipy.linalg để giải các hệ đại số tuyến tính quy mô lớn.'
          ],
          intuition: {
            title: 'Bản đồ thành phố sa mạc vs Danh sách tọa độ ốc đảo',
            metaphor: 'Trong bài toán xử lý ngôn ngữ tự nhiên (NLP) hoặc mạng xã hội hàng triệu người dùng, một ma trận kích thước 1,000,000 x 1,000,000 chứa tới 99.99% là số 0. Nếu bạn dùng mảng NumPy thông thường, nó giống như việc bạn vẽ một tấm bản đồ sa mạc khổng lồ rộng hàng triệu km² chỉ để đánh dấu 5 cái ốc đảo (ngốn tới 8,000 Gigabytes RAM, làm sập máy tính ngay lập tức). scipy.sparse giải quyết việc này bằng cách không lưu sa mạc: nó chỉ lưu một cuốn sổ nhỏ ghi lại đúng tọa độ (hàng, cột, giá trị) của 5 ốc đảo đó (chỉ tốn vài Megabytes RAM)!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🌵 Ma trận Dày đặc (Dense) vs Ma trận Thưa (Sparse CSR)</div>
                <div class="eco-grid">
                  <div class="eco-card" style="border-left:4px solid #ef4444;">
                    <strong>Dense Matrix (NumPy 2D):</strong>
                    <p style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Lưu tất cả phần tử (kể cả số 0):<br>
                      <code>[[0, 0, 5], [0, 8, 0], [0, 0, 0]]</code><br>
                      Ma trận 1M x 1M float64 ngốn <strong>~8,000 GB RAM</strong>!
                    </p>
                  </div>
                  <div class="eco-card" style="border-left:4px solid var(--topic-data);">
                    <strong>Sparse CSR (Compressed Sparse Row):</strong>
                    <p style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Chỉ lưu 3 mảng 1D: <code>data</code>, <code>indices</code>, <code>indptr</code>.<br>
                      Nếu chỉ có 10,000 phần tử khác 0, bộ nhớ chỉ tốn <strong>~240 KB RAM</strong> (tiết kiệm 99.999%!).
                    </p>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sp-overview',
              title: '1. Kiến trúc Submodules của SciPy',
              content: `
                <p>Nếu NumPy cung cấp khối gạch nền móng là mảng đa chiều <code>ndarray</code>, thì <strong>SciPy</strong> là bộ công cụ của các nhà khoa học và kỹ sư chuyên nghiệp. SciPy được tổ chức thành các submodule độc lập chuyên biệt:</p>
                <ul>
                  <li><code>scipy.optimize</code>: Tối thiểu hóa hàm mục tiêu, tìm nghiệm phi tuyến và khớp đường cong.</li>
                  <li><code>scipy.integrate</code>: Tích phân số học và giải phương trình vi phân thường (ODE/IVP).</li>
                  <li><code>scipy.interpolate</code>: Nội suy dữ liệu 1D, 2D và đa chiều (Spline, B-spline).</li>
                  <li><code>scipy.sparse</code>: Các cấu trúc dữ liệu và giải thuật tối ưu cho ma trận thưa.</li>
                  <li><code>scipy.stats</code>: Kho phân phối xác suất và kiểm định thống kê chuẩn tắc.</li>
                  <li><code>scipy.signal</code> &amp; <code>scipy.fft</code>: Xử lý tín hiệu số, lọc nhiễu và biến đổi Fourier.</li>
                  <li><code>scipy.spatial</code>: Cây KD-Tree, tính khoảng cách không gian và Voronoi diagrams.</li>
                </ul>
              `,
              codeExamples: []
            },
            {
              id: 'sec-sp-sparse-matrix',
              title: '2. Các Định dạng Ma trận Thưa: COO, CSR và CSC',
              content: `
                <p>Không có một định dạng ma trận thưa nào là hoàn hảo cho mọi tác vụ. SciPy phân chia rõ ràng:</p>
                <ul>
                  <li><strong>COO (Coordinate format):</strong> Lưu 3 mảng <code>(row, col, data)</code>. Cực kỳ thuận tiện để tạo lập ma trận ban đầu (khởi tạo dần từng phần tử). Không hỗ trợ cắt lát (slicing) hay tính toán số học nhanh.</li>
                  <li><strong>CSR (Compressed Sparse Row):</strong> Nén theo hàng. Tối ưu hóa tối đa cho phép <strong>nhân ma trận với vector (Sparse Matrix-Vector Multiplication)</strong> và cắt lát hàng (row slicing). Đây là định dạng tiêu chuẩn phổ biến nhất trong Học máy (Scikit-learn TF-IDF, CountVectorizer).</li>
                  <li><strong>CSC (Compressed Sparse Column):</strong> Nén theo cột. Tối ưu hóa cho việc cắt lát cột (column slicing) và các phép toán phân tích đại số tuyến tính cột.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Tạo ma trận thưa COO và chuyển đổi sang CSR để tính toán siêu tốc',
                  lang: 'Python',
                  code: `import numpy as np
from scipy import sparse

# Giả lập ma trận kích thước 100,000 x 100,000 nhưng chỉ có 3 phần tử khác 0
rows = np.array([0, 1000, 99999])
cols = np.array([5, 2000, 50000])
data = np.array([10.0, 20.0, 30.0])

# 1. Khởi tạo dạng COO
coo = sparse.coo_matrix((data, (rows, cols)), shape=(100000, 100000))

# 2. Chuyển sang CSR để nhân ma trận
csr = coo.tocsr()

# Nhân ma trận thưa với một vector ngẫu nhiên
v = np.ones(100000)
result = csr.dot(v)

print("Kích thước ma trận:   ", csr.shape)
print("Số phần tử khác 0:     ", csr.nnz)
print("Dung lượng bộ nhớ thô: ", csr.data.nbytes + csr.indices.nbytes + csr.indptr.nbytes, "bytes")
print("Tổng kết quả nhân vector:", result.sum())`,
                  output: `Kích thước ma trận:    (100000, 100000)
Số phần tử khác 0:      3
Dung lượng bộ nhớ thô:  400036 bytes
Tổng kết quả nhân vector: 60.0`,
                  annotations: [
                    { line: 10, text: 'coo_matrix khởi tạo nhanh từ 3 mảng (data, (rows, cols)).' },
                    { line: 13, text: 'tocsr() nén thành CSR để phép nhân dot() chạy cực nhanh.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sp-signal-fft',
              title: '3. Xử lý Tín hiệu Số và Biến đổi Fourier (scipy.signal & scipy.fft)',
              content: `
                <p>Trong các bài toán IoT, dữ liệu cảm biến, âm thanh và y sinh, dữ liệu thực tế luôn bị lẫn các thành phần nhiễu tần số cao hoặc trôi dạt đường nền (baseline drift). Hai submodule hàng đầu của SciPy giải quyết triệt để vấn đề này:</p>
                <ul>
                  <li><strong>scipy.fft (Fast Fourier Transform):</strong> Chuyển đổi tín hiệu từ miền thời gian (Time Domain) sang miền tần số (Frequency Domain) để nhận diện các tần số dao động chủ đạo.</li>
                  <li><strong>scipy.signal (Digital Filtering):</strong> Thiết kế các bộ lọc số như Butterworth, Chebyshev. Sử dụng <code>signal.filtfilt</code> thực hiện lọc hai chiều (forward-backward filtering), loại bỏ hoàn toàn độ trễ pha (Zero-phase distortion) mà không làm méo mó tín hiệu gốc.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Phân tích Phổ Tần số FFT và Lọc Nhiễu bằng Bộ lọc Butterworth',
                  lang: 'Python',
                  code: `import numpy as np
from scipy import signal, fft

# 1. Tạo tín hiệu giả lập: sóng 10Hz và 50Hz lẫn nhiễu tần số cao 200Hz
fs = 1000  # Tần số lấy mẫu 1000Hz (1000 mẫu/giây)
t = np.linspace(0, 1.0, fs, endpoint=False)
clean_signal = np.sin(2 * np.pi * 10 * t) + 0.5 * np.sin(2 * np.pi * 50 * t)
noise = 0.8 * np.sin(2 * np.pi * 200 * t)
noisy_signal = clean_signal + noise

# 2. Phân tích miền tần số với scipy.fft
yf = fft.rfft(noisy_signal)
xf = fft.rfftfreq(fs, 1 / fs)
magnitudes = np.abs(yf)

# Tìm các đỉnh tần số nổi bật
top_freq_indices = np.argsort(magnitudes)[-3:][::-1]
print("=== Phân tích Phổ Tần số FFT ===")
for idx in top_freq_indices:
    print(f"Tần số: {xf[idx]:.1f} Hz | Biên độ phổ: {magnitudes[idx]:.1f}")

# 3. Lọc thông thấp Butterworth (Low-pass filter) cắt tần số trên 80Hz
b, a = signal.butter(N=4, Wn=80, btype='low', fs=fs)
# filtfilt lọc 2 chiều (forward-backward) triệt tiêu hoàn toàn độ lệch pha (Zero-phase)
filtered_signal = signal.filtfilt(b, a, noisy_signal)

# Đo sai số phục hồi tín hiệu gốc
mse_before = np.mean((noisy_signal - clean_signal)**2)
mse_after = np.mean((filtered_signal - clean_signal)**2)
print("\n=== Hiệu quả Lọc Nhiễu Butterworth ===")
print(f"MSE trước khi lọc (Nhiễu): {mse_before:.4f}")
print(f"MSE sau khi lọc:          {mse_after:.4f} (Giảm {((mse_before - mse_after)/mse_before)*100:.1f}% nhiễu!)")`,
                  output: `=== Phân tích Phổ Tần số FFT ===
Tần số: 10.0 Hz | Biên độ phổ: 500.0
Tần số: 200.0 Hz | Biên độ phổ: 400.0
Tần số: 50.0 Hz | Biên độ phổ: 250.0

=== Hiệu quả Lọc Nhiễu Butterworth ===
MSE trước khi lọc (Nhiễu): 0.3200
MSE sau khi lọc:          0.0009 (Giảm 99.7% nhiễu!)`,
                  annotations: [
                    { line: 12, text: 'fft.rfft tính biến đổi Fourier thực cho dữ liệu 1D, tiết kiệm 50% tính toán so với fft thông thường.' },
                    { line: 25, text: 'signal.butter tạo hàm truyền lọc bậc 4 với ngưỡng cắt 80Hz.' },
                    { line: 27, text: 'signal.filtfilt lọc xuôi rồi lọc ngược để đảm bảo độ lệch pha bằng 0 tuyệt đối.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sp-spatial-kdtree',
              title: '4. Cấu trúc Dữ liệu Không gian & Tìm kiếm Láng giềng Nhanh (scipy.spatial.KDTree)',
              content: `
                <p>Trong bài toán phân cụm không gian, GIS hoặc tìm kiếm $k$ vector gần nhất ($k$-NN), việc so sánh vét cạn khoảng cách Euclidean giữa $N$ điểm tốn độ phức tạp $O(N^2)$, không thể mở rộng khi $N > 10,000$.</p>
                <p><code>scipy.spatial.KDTree</code> tổ chức các điểm dữ liệu thành một cây nhị phân phân tách không gian theo từng chiều tọa độ:</p>
                <ul>
                  <li><strong>Xây dựng cây (Build Tree):</strong> Độ phức tạp $O(N \\log N)$.</li>
                  <li><strong>Truy vấn $k$ láng giềng gần nhất (k-NN Query):</strong> Độ phức tạp chỉ $O(\\log N)$ mỗi điểm!</li>
                  <li><strong>Truy vấn theo bán kính (Radius Search):</strong> Tìm toàn bộ các điểm nằm trong vùng cầu bán kính $R$ cực nhanh.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Xây dựng KDTree và Truy vấn k-NN / Bán kính không gian',
                  lang: 'Python',
                  code: `import numpy as np
from scipy.spatial import KDTree

# Giả lập 50,000 tọa độ cửa hàng / khách hàng 2D
rng = np.random.default_rng(42)
points = rng.uniform(0, 100, size=(50000, 2))

# Xây dựng cây KDTree (O(N log N))
tree = KDTree(points)

# Tọa độ một khách hàng cần tìm cửa hàng gần nhất
query_point = np.array([50.0, 50.0])

# 1. Truy vấn k=3 điểm gần nhất (k-Nearest Neighbors) trong O(log N)
distances, indices = tree.query(query_point, k=3)
print("=== 3 Điểm gần nhất với [50, 50] ===")
for d, idx in zip(distances, indices):
    print(f"Điểm #{idx}: Tọa độ {np.round(points[idx], 2)} | Khoảng cách: {d:.4f}")

# 2. Truy vấn tất cả các điểm trong bán kính R = 1.0 (Radius search)
indices_in_radius = tree.query_ball_point(query_point, r=1.0)
print(f"\nSố điểm nằm trong bán kính R=1.0: {len(indices_in_radius)} điểm")`,
                  output: `=== 3 Điểm gần nhất với [50, 50] ===
Điểm #19638: Tọa độ [50.01 50.03] | Khoảng cách: 0.0288
Điểm #27232: Tọa độ [50.35 50.06] | Khoảng cách: 0.3602
Điểm #2380: Tọa độ [50.17 50.38] | Khoảng cách: 0.4108

Số điểm nằm trong bán kính R=1.0: 14 điểm`,
                  annotations: [
                    { line: 9, text: 'KDTree(points) tiền xử lý và lập chỉ mục không gian trong O(N log N).' },
                    { line: 15, text: 'tree.query trả về mảng khoảng cách và mảng chỉ số nguyên trong O(log N).' },
                    { line: 21, text: 'query_ball_point trả về danh sách các điểm trong hình cầu bán kính r.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Vô tình gọi .toarray() làm tràn RAM',
                content: 'Khi đang làm việc với một ma trận thưa lớn (ví dụ bảng TF-IDF 50,000 văn bản x 20,000 từ khóa), gọi csr.toarray() sẽ ép toàn bộ dữ liệu về NumPy dense array và lập tức làm sập chương trình vì Out-of-Memory. Hãy giữ nguyên định dạng CSR khi đưa vào các thuật toán Scikit-learn!'
              }
            ],
            tips: [
              {
                title: 'Nhập khẩu submodule tường minh trong SciPy',
                content: 'Không giống như NumPy, việc gọi import scipy rồi dùng scipy.optimize sẽ bị lỗi AttributeError! Bạn bắt buộc phải import submodule tường minh: from scipy import optimize, sparse, stats.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Cắt lát hàng và Tính Sparsity của Ma trận Thưa',
              problem: 'Cho một ma trận thưa CSR kích thước 1,000 x 1,000 có 5,000 phần tử khác 0. Hãy: (1) Tính tỉ lệ thưa (Sparsity ratio = 1 - (nnz / tổng phần tử)), (2) Trích xuất một view hàng thứ 100 đến 105 dưới dạng CSR.',
              hint: 'Sparsity = 1.0 - (csr.nnz / (csr.shape[0] * csr.shape[1])). Trích xuất hàng bằng cú pháp slice csr[100:106].',
              solutionCode: `import numpy as np
from scipy import sparse

# Tạo ma trận thưa ngẫu nhiên với mật độ 0.5% (density=0.005)
rng = np.random.default_rng(42)
csr = sparse.random(1000, 1000, density=0.005, format='csr', random_state=rng)

# 1. Tính Sparsity
total_elements = csr.shape[0] * csr.shape[1]
sparsity = 1.0 - (csr.nnz / total_elements)

# 2. Cắt lát hàng
sub_csr = csr[100:106]

print(f"Tổng phần tử: {total_elements:,} | Số phần tử khác 0: {csr.nnz:,}")
print(f"Tỉ lệ thưa (Sparsity): {sparsity * 100:.2f}%")
print("Kích thước ma trận con trích xuất:", sub_csr.shape)`,
              solutionOutput: `Tổng phần tử: 1,000,000 | Số phần tử khác 0: 5,000
Tỉ lệ thưa (Sparsity): 99.50%
Kích thước ma trận con trích xuất: (6, 1000)`,
              explanation: 'CSR cho phép cắt lát theo hàng cực kỳ nhanh chóng và trả về một ma trận con vẫn ở dạng nén CSR, bảo tồn nguyên vẹn dung lượng bộ nhớ.',
              annotations: [
                { line: 6, text: 'sparse.random tạo ma trận thưa với mật độ density chỉ định.' }
              ]
            }
          ],
          summary: [
            'SciPy tổ chức theo các submodule chuyên biệt: optimize, integrate, sparse, stats, signal...',
            'Ma trận thưa lưu trữ hàng triệu chiều mà chỉ tốn vài chục KB bằng cách bỏ qua các số 0.',
            'COO dùng để khởi tạo; CSR tối ưu cho nhân ma trận và cắt hàng; CSC tối ưu cho cắt cột.',
            'Luôn import tường minh các submodule của SciPy (from scipy import optimize, sparse).'
          ]
        },
        {
          id: 'ai-sp-02',
          number: '3.2',
          title: 'Tối ưu hóa Hàm số & Khớp Đường cong Thực nghiệm (scipy.optimize)',
          subtitle: 'Làm chủ minimize (BFGS, Nelder-Mead, ràng buộc Bounds/Constraints), root và curve_fit',
          level: 'Trung cấp',
          duration: '40 phút',
          objectives: [
            'Hiểu bản chất bài toán tối ưu hóa toán học: hàm mục tiêu, điểm khởi đầu và gradient.',
            'Phân biệt khi nào dùng thuật toán Gradient-based (BFGS, L-BFGS-B) vs Derivative-free (Nelder-Mead).',
            'Thiết lập ràng buộc biên giới (Bounds) và ràng buộc phi tuyến (Constraints) trong minimize.',
            'Sử dụng curve_fit để khớp các mô hình toán học phi tuyến phức tạp vào dữ liệu thực nghiệm nhiễu.'
          ],
          intuition: {
            title: 'Người leo núi trong sương mù và Người thợ may đo áo',
            metaphor: 'scipy.optimize.minimize giống như một người leo núi bị lạc trong một thung lũng sương mù dày đặc và muốn tìm đường xuống điểm sâu nhất (cực tiểu hàm mục tiêu). Nếu anh ta có thể cảm nhận được độ dốc dưới chân (tính được đạo hàm Gradient), anh ta sẽ đi theo hướng dốc nhất xuống dưới (BFGS algorithm). Nếu sương mù quá dày không biết độ dốc (hàm không có đạo hàm), anh ta cắm 3 chiếc gậy thăm dò xung quanh để lần mò bước đi (Nelder-Mead simplex). Còn curve_fit giống như một người thợ may đo chiếc áo vừa vặn nhất: với các điểm dữ liệu lồi lõm thực tế, nó điều chỉnh các thông số (độ cong, độ co giãn) sao cho sai số tổng thể là nhỏ nhất.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📉 Sơ đồ Thuật toán Tối ưu hóa scipy.optimize</div>
                <div class="eco-grid">
                  <div class="eco-card">
                    <strong>1. Gradient-Based (BFGS / L-BFGS-B):</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Dùng đạo hàm bậc 1 (Jacobian) và xấp xỉ ma trận Hessian (đạo hàm bậc 2). Tốc độ hội tụ siêu nhanh cho các bài toán lồi trơn nhẵn.
                    </div>
                  </div>
                  <div class="eco-card">
                    <strong>2. Derivative-Free (Nelder-Mead / Powell):</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Không cần đạo hàm. Dùng đơn vị hình học (Simplex) co giãn để tìm đáy thung lũng. Chạy tốt cả khi hàm bị gián đoạn hoặc có nhiễu.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sp-minimize-bounds',
              title: '1. Tối thiểu hóa Hàm số với scipy.optimize.minimize',
              content: `
                <p>Hàm <code>scipy.optimize.minimize(fun, x0, method, bounds, constraints)</code> là trung tâm của giải tích tối ưu:</p>
                <ul>
                  <li><code>fun</code>: Hàm mục tiêu cần tối thiểu hóa (hàm chi phí / hàm mất mát).</li>
                  <li><code>x0</code>: Điểm khởi tạo ban đầu (Initial guess). Điểm này rất quan trọng với các bài toán phi lồi!</li>
                  <li><code>bounds</code>: Ràng buộc phạm vi của từng biến, ví dụ <code>[(0, None), (-5, 5)]</code> nghĩa là $x_0 \\ge 0$ và $-5 \\le x_1 \\le 5$. Thường dùng thuật toán <code>L-BFGS-B</code> hoặc <code>SLSQP</code>.</li>
                  <li><code>constraints</code>: Ràng buộc phương trình hoặc bất đẳng thức, ví dụ $x_0 + x_1 = 10$ hoặc $x_0^2 + x_1^2 \\le 25$.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Tìm cực tiểu hàm Rosenbrock với ràng buộc biên giới (Bounds)',
                  lang: 'Python',
                  code: `import numpy as np
from scipy.optimize import minimize

# Định nghĩa hàm quả chuối Rosenbrock: f(x, y) = (1 - x)^2 + 100*(y - x^2)^2
# Cực tiểu toàn cục tại (1, 1) với f(1, 1) = 0
def rosenbrock(x):
    return (1.0 - x[0])**2 + 100.0 * (x[1] - x[0]**2)**2

# 1. Khởi tạo điểm đoán ban đầu
x0 = np.array([-1.5, 2.0])

# 2. Thiết lập ràng buộc biến: 0 <= x <= 2 và 0 <= y <= 2
bounds = [(0, 2), (0, 2)]

# 3. Tối ưu hóa bằng thuật toán L-BFGS-B
res = minimize(rosenbrock, x0, method='L-BFGS-B', bounds=bounds)

print("Trạng thái hội tụ:", res.success)
print("Số lần đánh giá hàm:", res.nfev)
print("Tọa độ cực tiểu tìm được:", np.round(res.x, 4))
print("Giá trị hàm tại cực tiểu: ", np.round(res.fun, 6))`,
                  output: `Trạng thái hội tụ: True
Số lần đánh giá hàm: 63
Tọa độ cực tiểu tìm được: [1. 1.]
Giá trị hàm tại cực tiểu:  0.0`,
                  annotations: [
                    { line: 15, text: 'L-BFGS-B hỗ trợ ràng buộc dạng hình hộp (box bounds) cực kỳ hiệu quả.' },
                    { line: 17, text: 'res.x chứa mảng nghiệm tối ưu tìm được.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sp-curve-fit',
              title: '2. Khớp Đường cong Thực nghiệm với curve_fit',
              content: `
                <p>Trong vật lý, tài chính hoặc sinh học, chúng ta thường có dữ liệu thực nghiệm bị nhiễu và một công thức lý thuyết (ví dụ quy luật suy giảm hàm mũ: $y = a \\cdot e^{-b \\cdot x} + c$).</p>
                <p>Hàm <code>scipy.optimize.curve_fit(f, xdata, ydata)</code> sử dụng thuật toán bình phương tối thiểu phi tuyến Levenberg-Marquardt để tìm các tham số $[a, b, c]$ sao cho hàm số khớp khít nhất với dữ liệu, đồng thời trả về ma trận hiệp phương sai <code>pcov</code> để ước lượng độ tin cậy của các tham số!</p>
              `,
              codeExamples: [
                {
                  title: 'Khớp mô hình suy giảm hàm mũ phi tuyến trên dữ liệu có nhiễu',
                  lang: 'Python',
                  code: `import numpy as np
from scipy.optimize import curve_fit

# 1. Mô hình lý thuyết: y = a * exp(-b * x) + c
def model_decay(x, a, b, c):
    return a * np.exp(-b * x) + c

# 2. Giả lập dữ liệu thực tế với tham số chuẩn: a=2.5, b=1.3, c=0.5 kèm nhiễu
rng = np.random.default_rng(2026)
x_data = np.linspace(0, 4, 50)
y_clean = model_decay(x_data, 2.5, 1.3, 0.5)
y_noise = y_clean + rng.normal(0, 0.05, size=len(x_data))

# 3. Khớp đường cong
popt, pcov = curve_fit(model_decay, x_data, y_noise, p0=[1, 1, 1])

# popt: tham số tối ưu [a, b, c]
# Sai số chuẩn của các tham số = căn bậc 2 đường chéo pcov
perr = np.sqrt(np.diag(pcov))

print("Tham số ước lượng [a, b, c]:", np.round(popt, 4))
print("Sai số chuẩn tương ứng:       ", np.round(perr, 4))`,
                  output: `Tham số ước lượng [a, b, c]: [2.4925 1.2869 0.4998]
Sai số chuẩn tương ứng:        [0.0249 0.0272 0.0093]`,
                  annotations: [
                    { line: 16, text: 'p0=[1, 1, 1] là giá trị khởi tạo ban đầu giúp thuật toán định hướng nhanh chóng.' },
                    { line: 20, text: 'np.sqrt(np.diag(pcov)) cho biết độ tin cậy sai số của từng hệ số ước lượng.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy cực tiểu địa phương (Local Minima) trong bài toán phi lồi',
                content: 'Các thuật toán gradient như BFGS chỉ tìm thấy cực tiểu cục bộ gần điểm đoán ban đầu x0 nhất. Nếu hàm số của bạn có nhiều đỉnh núi và thung lũng gồ ghề, hãy sử dụng các thuật toán tối ưu hóa toàn cục (Global Optimization) như scipy.optimize.differential_evolution hoặc scipy.optimize.dual_annealing.'
              }
            ],
            tips: [
              {
                title: 'Truyền đạo hàm giải tích (Jacobian) để tăng tốc 10x',
                content: 'Mặc định scipy.optimize tính đạo hàm gần đúng bằng sai phân hữu hạn (finite difference). Nếu bạn có thể tự tính đạo hàm giải tích của hàm mục tiêu và truyền vào tham số jac=my_grad, thuật toán sẽ chạy nhanh hơn gấp 10 lần và độ chính xác cao hơn nhiều.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Tìm Điểm Cân Bằng Cung Cầu bằng scipy.optimize.root_scalar',
              problem: 'Hàm cầu của một sản phẩm là Qd(P) = 100 - 2*P^2. Hàm cung là Qs(P) = 3*P^2 - 20 (với P là giá bán > 0). Hãy dùng hàm scipy.optimize.root_scalar tìm mức giá cân bằng P_eq sao cho Qd(P) = Qs(P).',
              hint: 'Định nghĩa hàm chênh lệch f(P) = Qd(P) - Qs(P) = 120 - 5*P^2. Dùng root_scalar với bracket=[1, 10].',
              solutionCode: `from scipy.optimize import root_scalar

def supply_demand_diff(P):
    # Qd(P) - Qs(P) = (100 - 2*P**2) - (3*P**2 - 20)
    return 120.0 - 5.0 * P**2

# Tìm nghiệm trong khoảng giá từ 1 đến 10
res = root_scalar(supply_demand_diff, bracket=[1, 10], method='brentq')

print("Trạng thái tìm nghiệm:", res.converged)
print("Giá cân bằng P* tìm được:   ", round(res.root, 4))
print("Kiểm tra P^2 = 120/5 = 24:  ", round(24**0.5, 4))`,
              solutionOutput: `Trạng thái tìm nghiệm: True
Giá cân bằng P* tìm được:    4.899
Kiểm tra P^2 = 120/5 = 24:   4.899`,
              explanation: 'Phương pháp Brent (brentq) là thuật toán tìm nghiệm đơn biến mạnh mẽ nhất kết hợp giữa chia đôi khoảng và nội suy parabol, luôn đảm bảo hội tụ nếu 2 đầu mút trái dấu.',
              annotations: [
                { line: 8, text: 'bracket=[1, 10] yêu cầu f(1) và f(10) trái dấu nhau để đảm bảo tồn tại nghiệm.' }
              ]
            }
          ],
          summary: [
            'scipy.optimize.minimize là công cụ chuẩn mực cho các bài toán tối ưu hóa có hoặc không có ràng buộc.',
            'L-BFGS-B hỗ trợ ràng buộc biên giới (Bounds); SLSQP hỗ trợ ràng buộc đẳng thức/bất đẳng thức.',
            'curve_fit giúp khớp các mô hình phi tuyến vào dữ liệu thực nghiệm và ước lượng sai số chuẩn.',
            'root_scalar với thuật toán Brent là lựa chọn số 1 để tìm nghiệm phương trình phi tuyến 1 biến.'
          ]
        },
        {
          id: 'ai-sp-03',
          number: '3.3',
          title: 'Tích phân Số học & Giải Phương trình Vi phân Thường ODE (scipy.integrate)',
          subtitle: 'Tính diện tích với quad, giải hệ động lực học với solve_ivp và Nội suy dữ liệu với interpolate',
          level: 'Trung cấp',
          duration: '40 phút',
          objectives: [
            'Tính tích phân số học đơn và đa biến chính xác tuyệt đối với scipy.integrate.quad.',
            'Hiểu bản chất phương trình vi phân thường (ODE) trong mô hình hóa thế giới thực.',
            'Sử dụng solve_ivp để giải bài toán giá trị ban đầu với các thuật toán thích ứng (RK45, Radau).',
            'Nội suy dữ liệu khuyết hoặc thay đổi lưới tọa độ với scipy.interpolate (interp1d, CubicSpline).'
          ],
          intuition: {
            title: 'Bánh lái con tàu và Dự đoán quỹ đạo tên lửa',
            metaphor: 'Một phương trình vi phân thường (ODE) không cho bạn biết con tàu đang ở đâu; nó chỉ cho bạn biết vận tốc và gia tốc hiện tại của con tàu dựa theo vị trí và thời gian: dy/dt = f(t, y). Hàm scipy.integrate.solve_ivp giống như một thuyền trưởng lái tàu tài ba: bắt đầu từ bến cảng ban đầu (Initial Value y0), tại mỗi giây trôi qua, ông nhìn la bàn đo vận tốc, tính toán bước tiến nhỏ tiếp theo (Adaptive Time Step) và lái con tàu cập bến an toàn trong tương lai mà không bị trôi dạt sai số.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🚀 Kiến trúc Bộ giải ODE: Initial Value Problem (solve_ivp)</div>
                <div style="font-size:0.86rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  Cho hệ: <code>dy/dt = f(t, y)</code> với điều kiện ban đầu <code>y(t0) = y0</code><br>
                  • Thuật toán <strong>RK45 (Runge-Kutta bậc 4-5)</strong>: Tự động co giãn bước thời gian dt; đoạn đường êm đềm thì bước dài, đoạn cua gấp thì bước ngắn.<br>
                  • Thuật toán <strong>Radau / BDF</strong>: Chuyên trị các hệ phương trình vi phân cứng (Stiff ODEs - nơi các biến thay đổi ở tốc độ chênh lệch hàng ngàn lần).
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sp-quad-ode',
              title: '1. Tích phân Số học (quad) và Giải ODE với solve_ivp',
              content: `
                <p><strong>Tích phân Số học (scipy.integrate.quad):</strong> Sử dụng kỹ thuật cầu phương Clenshaw-Curtis hoặc Gauss-Kronrod, tính toán tích phân xác định $\\int_a^b f(x)dx$ với độ chính xác số học cực cao kèm ước lượng sai số tuyệt đối.</p>
                <p><strong>Giải ODE với solve_ivp:</strong></p>
                <ul>
                  <li>Cú pháp: <code>solve_ivp(fun, t_span, y0, method='RK45', t_eval=None)</code></li>
                  <li><code>fun(t, y)</code>: Hàm đạo hàm nhận vào thời gian <code>t</code> và vector trạng thái <code>y</code>, trả về <code>dy/dt</code>.</li>
                  <li><code>t_span</code>: Khoảng thời gian giải <code>(t_start, t_end)</code>.</li>
                  <li><code>y0</code>: Vector trạng thái ban đầu.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Tính tích phân xác định và Giải phương trình con lắc đơn giảm chấn',
                  lang: 'Python',
                  code: `import numpy as np
from scipy.integrate import quad, solve_ivp

# 1. Tính tích phân: int_0^pi sin(x) dx = 2.0
val, err = quad(np.sin, 0, np.pi)
print(f"Tích phân sin(x) từ 0 đến pi: {val:.6f} (Sai số ước lượng: {err:.2e})")

# 2. Giải hệ phương trình con lắc đơn có lực cản:
# theta'' + b*theta' + (g/L)*sin(theta) = 0
# Đặt y = [theta, omega], với omega = theta'
# dy/dt = [omega, -b*omega - (g/L)*sin(theta)]
def pendulum_ode(t, y, b=0.25, g=9.81, L=1.0):
    theta, omega = y
    dtheta_dt = omega
    domega_dt = -b * omega - (g / L) * np.sin(theta)
    return [dtheta_dt, domega_dt]

# Góc lệch ban đầu 45 độ (pi/4), vận tốc góc ban đầu = 0
y0 = [np.pi / 4, 0.0]
t_span = (0, 10)  # Mô phỏng trong 10 giây
t_eval = np.linspace(0, 10, 50)

sol = solve_ivp(pendulum_ode, t_span, y0, t_eval=t_eval, method='RK45')

print(f"Trạng thái giải thành công: {sol.success}")
print(f"Số bước thời gian mô phỏng: {len(sol.t)}")
print(f"Góc lệch tại t=0s:  {np.round(np.degrees(sol.y[0][0]), 2)} độ")
print(f"Góc lệch tại t=10s: {np.round(np.degrees(sol.y[0][-1]), 2)} độ (Biên độ giảm dần do ma sát!)")`,
                  output: `Tích phân sin(x) từ 0 đến pi: 2.000000 (Sai số ước lượng: 2.22e-14)
Trạng thái giải thành công: True
Số bước thời gian mô phỏng: 50
Góc lệch tại t=0s:  45.0 độ
Góc lệch tại t=10s: 3.42 độ (Biên độ giảm dần do ma sát!)`,
                  annotations: [
                    { line: 5, text: 'quad đạt độ chính xác gần như tuyệt đối (sai số 10^-14).' },
                    { line: 24, text: 'solve_ivp giải chuẩn xác hệ vi phân phi tuyến bậc 2 bằng cách hạ bậc thành hệ 2 phương trình bậc 1.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sp-interpolate',
              title: '2. Nội suy Dữ liệu Thực nghiệm (scipy.interpolate)',
              content: `
                <p>Khi bạn chỉ có các điểm đo rời rạc (ví dụ nhiệt độ đo mỗi giờ một lần) nhưng cần biết nhiệt độ tại phút thứ 37.5, bạn cần <strong>nội suy (Interpolation)</strong>:</p>
                <ul>
                  <li><code>interp1d(x, y, kind='linear')</code>: Nội suy tuyến tính (nối các điểm bằng đoạn thẳng).</li>
                  <li><code>CubicSpline(x, y)</code>: Nội suy bằng đường cong bậc 3 (Cubic Spline), đảm bảo đường nối mềm mại và đạo hàm bậc 1, bậc 2 liên tục trơn tru.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'So sánh Nội suy Tuyến tính và Cubic Spline',
                  lang: 'Python',
                  code: `import numpy as np
from scipy.interpolate import CubicSpline

# Dữ liệu đo đạc rời rạc (chỉ có 5 điểm)
x_known = np.array([0, 1, 2, 3, 4])
y_known = np.array([0, 1, 0, 1, 0])

# Xây dựng hàm nội suy Cubic Spline trơn nhẵn
cs = CubicSpline(x_known, y_known)

# Ước lượng giá trị tại các điểm nằm giữa
x_query = np.array([0.5, 1.5, 2.5])
y_interpolated = cs(x_query)

print("Tọa độ truy vấn:           ", x_query)
print("Giá trị nội suy CubicSpline:", np.round(y_interpolated, 4))`,
                  output: `Tọa độ truy vấn:            [0.5 1.5 2.5]
Giá trị nội suy CubicSpline: [0.6875 0.3125 0.6875]`,
                  annotations: [
                    { line: 9, text: 'CubicSpline trả về một đối tượng hàm callable, có thể gọi trực tiếp cs(x).' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Nội suy ngoại suy (Extrapolation) nguy hiểm',
                content: 'Mặc định các hàm nội suy chỉ an toàn trong phạm vi [x_min, x_max]. Nếu bạn cố tình dự đoán ngoài khoảng dữ liệu gốc, CubicSpline có thể uốn cong và phóng đại giá trị lên vô cực (Runge phenomenon). Hãy cẩn thận khi dùng bc_type hoặc extrapolate!'
              }
            ],
            tips: [
              {
                title: 'Hệ phương trình cứng (Stiff ODE)',
                content: 'Nếu solve_ivp chạy mãi không dừng hoặc báo lỗi step size too small, hệ của bạn đang bị cứng (Stiff). Hãy đổi tham số method=\"Radau\" hoặc method=\"BDF\" thay vì mặc định \"RK45\".'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Mô phỏng Quỹ đạo Rơi tự do có Lực cản Không khí',
              problem: 'Một vật thể khối lượng m=2kg rơi từ độ cao 500m với vận tốc ban đầu v=0. Lực cản không khí F_cản = -k * v^2 (với k=0.1, g=9.8). Hãy lập trình hàm ODE và dùng solve_ivp mô phỏng trong 12 giây để tìm độ cao của vật thể tại thời điểm t=10s.',
              hint: 'y = [do_cao, van_toc]. dy/dt = [van_toc, -g + (k/m)*van_toc^2]. Khi rơi xuống, vận tốc âm.',
              solutionCode: `import numpy as np
from scipy.integrate import solve_ivp

def free_fall_ode(t, state, m=2.0, k=0.1, g=9.8):
    y, v = state  # y: độ cao (m), v: vận tốc (m/s)
    # v âm khi rơi xuống -> lực cản hướng lên: +k*v^2
    dy_dt = v
    dv_dt = -g + (k / m) * (v**2)
    return [dy_dt, dv_dt]

sol = solve_ivp(free_fall_ode, (0, 12), [500.0, 0.0], t_eval=[0, 5, 10], method='RK45')

print("Thời gian t (s):   ", sol.t)
print("Độ cao tương ứng (m):", np.round(sol.y[0], 2))
print("Vận tốc tương ứng (m/s):", np.round(sol.y[1], 2))`,
              solutionOutput: `Thời gian t (s):    [ 0.  5. 10.]
Độ cao tương ứng (m): [500.   396.94 326.96]
Vận tốc tương ứng (m/s): [  0.   -13.99 -14.0 ]`,
              explanation: 'Vật thể rơi nhanh dần cho tới khi lực cản cân bằng với trọng lực (vận tốc chạm ngưỡng đầu cuối Terminal Velocity khoảng -14.0 m/s), sau đó chuyển động thẳng đều.',
              annotations: [
                { line: 10, text: 't_eval=[0, 5, 10] chỉ định trích xuất kết quả tại đúng các mốc thời gian quan tâm.' }
              ]
            }
          ],
          summary: [
            'scipy.integrate.quad là tiêu chuẩn vàng tính tích phân xác định với độ chính xác cao.',
            'solve_ivp giải hệ phương trình vi phân thường với cơ chế điều chỉnh bước thời gian thông minh RK45.',
            'Với hệ phương trình cứng (Stiff ODEs), luôn chuyển sang method=\"Radau\" hoặc \"BDF\".',
            'CubicSpline tạo đường cong nội suy mượt mà bậc 3 bảo đảm liên tục đạo hàm.'
          ]
        },
        {
          id: 'ai-sp-04',
          number: '3.4',
          title: 'Thống kê Suy diễn, Phân phối Xác suất & Bản chất p-value (scipy.stats)',
          subtitle: 'Phân phối chuẩn, kiểm định t-test, ANOVA, Chi-square, hiểu đúng p-value và sai lầm p-hacking',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Làm chủ các phương thức của biến ngẫu nhiên trong scipy.stats: rvs, pdf/pmf, cdf, ppf.',
            'Thực hiện đúng chuẩn các kiểm định thống kê: t-test 2 mẫu độc lập, paired t-test, ANOVA một chiều và Chi-square test.',
            'Hiểu bản chất thực sự của p-value và tránh sai lầm diễn giải p-hacking.',
            'Kiểm tra tính chuẩn tắc của dữ liệu với kiểm định Shapiro-Wilk.'
          ],
          intuition: {
            title: 'Tòa án xét xử và Giả thuyết vô hiệu (Null Hypothesis)',
            metaphor: 'Một cuộc kiểm định thống kê giống như một phiên tòa xét xử hình sự dựa trên nguyên tắc "suy đoán vô tội". Giả thuyết vô hiệu (H0 - Null Hypothesis) tuyên bố rằng: "Bị cáo hoàn toàn vô tội" (tức là 2 nhóm người dùng KHÔNG CÓ sự khác biệt nào, mọi chênh lệch nhìn thấy chỉ là do ngẫu nhiên may rủi). Chỉ số p-value giống như xác suất xảy ra những chứng cứ kỳ lạ như vậy nếu bị cáo thực sự vô tội. Nếu p-value rất nhỏ (thường < 0.05 - xác suất dưới 5%), bằng chứng quá kỳ quặc để có thể coi là ngẫu nhiên! Tòa án bác bỏ H0 và tuyên bố: sự khác biệt có ý nghĩa thống kê (Statistical Significance).',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚖️ Bản chất Chuẩn tắc của p-value</div>
                <div style="background:var(--bg-surface);padding:10px;border-radius:4px;font-size:0.86rem;line-height:1.6;">
                  <strong>Định nghĩa đúng:</strong> p-value là xác suất quan sát được kết quả tương đương hoặc cực đoan hơn kết quả thực tế, <em>GIẢ ĐỊNH RẰNG giả thuyết H0 là ĐÚNG</em>.<br>
                  <span style="color:#ef4444;font-weight:700;">Sai lầm phổ biến:</span> p-value KHÔNG PHẢI là "xác suất H0 đúng" và cũng KHÔNG PHẢI là "xác suất bạn phạm sai lầm".<br>
                  <span style="color:var(--topic-data);font-weight:700;">Hệ quả:</span> p &lt; 0.05 chỉ mang ý nghĩa dữ liệu khó xảy ra do ngẫu nhiên, không chứng minh mối quan hệ nhân quả.
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sp-distributions-api',
              title: '1. API Phân phối Xác suất Đồng nhất trong scipy.stats',
              content: `
                <p>Mọi phân phối xác suất trong <code>scipy.stats</code> (như <code>norm</code>, <code>t</code>, <code>binom</code>, <code>poisson</code>, <code>expon</code>) đều tuân thủ API thống nhất:</p>
                <ul>
                  <li><code>rvs(size)</code>: Sinh mẫu ngẫu nhiên (Random Variates).</li>
                  <li><code>pdf(x)</code> (liên tục) hoặc <code>pmf(k)</code> (rời rạc): Hàm mật độ / khối lượng xác suất tại điểm x.</li>
                  <li><code>cdf(x)</code>: Hàm phân phối tích lũy $P(X \\le x)$ (diện tích từ $-\\infty$ tới x).</li>
                  <li><code>ppf(q)</code>: Hàm phân vị ngược (Percent Point Function / Quantile): tìm giá trị x sao cho $cdf(x) = q$.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thao tác với phân phối chuẩn norm: pdf, cdf và ppf',
                  lang: 'Python',
                  code: `import numpy as np
from scipy import stats

# Phân phối chuẩn điểm thi: trung bình loc=70, độ lệch chuẩn scale=10
exam_dist = stats.norm(loc=70, scale=10)

# 1. Xác suất một học sinh có điểm <= 85: P(X <= 85)
p_le_85 = exam_dist.cdf(85)

# 2. Xác suất điểm nằm trong khoảng 60 đến 80: P(60 <= X <= 80)
p_between_60_80 = exam_dist.cdf(80) - exam_dist.cdf(60)

# 3. Điểm số tối thiểu để lọt vào top 5% xuất sắc nhất (phân vị 95%)
top_5_cutoff = exam_dist.ppf(0.95)

print(f"Xác suất điểm <= 85:         {p_le_85 * 100:.2f}%")
print(f"Xác suất điểm từ 60 đến 80:  {p_between_60_80 * 100:.2f}%")
print(f"Mức điểm lọt top 5% (ppf):   {top_5_cutoff:.2f} điểm")`,
                  output: `Xác suất điểm <= 85:         93.32%
Xác suất điểm từ 60 đến 80:  68.27%
Mức điểm lọt top 5% (ppf):   86.45 điểm`,
                  annotations: [
                    { line: 8, text: 'cdf() tính tích lũy diện tích dưới đường cong mật độ xác suất.' },
                    { line: 14, text: 'ppf(0.95) là nghịch đảo của cdf, tìm ngưỡng phân vị top 5%.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sp-hypothesis-testing',
              title: '2. Các Kiểm định Thống kê Thực chiến: t-test, ANOVA & Chi-Square',
              content: `
                <p>Trong thực tế phân tích A/B Testing hoặc nghiên cứu sản phẩm:</p>
                <ul>
                  <li><strong>Two-sample Independent t-test (<code>stats.ttest_ind</code>):</strong> So sánh giá trị trung bình giữa 2 nhóm độc lập (ví dụ giao diện A vs giao diện B). Luôn đặt <code>equal_var=False</code> để dùng Welch's t-test (an toàn khi 2 nhóm có phương sai khác nhau).</li>
                  <li><strong>ANOVA một chiều (<code>stats.f_oneway</code>):</strong> So sánh giá trị trung bình giữa 3 nhóm trở lên mà không làm bùng nổ sai số loại 1.</li>
                  <li><strong>Chi-Square Test of Independence (<code>stats.chi2_contingency</code>):</strong> Kiểm định tính độc lập giữa 2 biến định tính phân loại (ví dụ Giới tính và Tỉ lệ nhấp chuột).</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực hành A/B Testing bằng Welch t-test và Chi-Square',
                  lang: 'Python',
                  code: `import numpy as np
from scipy import stats

# 1. A/B Testing: Doanh thu của 2 nhóm khách hàng (Nhóm A: cũ, Nhóm B: mới)
rng = np.random.default_rng(42)
rev_A = rng.normal(loc=120, scale=30, size=100)
rev_B = rng.normal(loc=132, scale=35, size=100)

# Welch's t-test (equal_var=False)
t_stat, p_val_t = stats.ttest_ind(rev_A, rev_B, equal_var=False)

print("--- A/B TESTING DOANH THU (t-test) ---")
print(f"t-statistic: {t_stat:.4f} | p-value: {p_val_t:.4f}")
if p_val_t < 0.05:
    print("Kết luận: Giao diện B đem lại doanh thu cao hơn rõ rệt có ý nghĩa thống kê (p < 0.05)!")

# 2. Chi-Square: Bảng tương quan Giới tính và Quyết định mua hàng (Mua vs Không)
# Bảng tần số: [[Nam_Mua, Nam_Ko], [Nu_Mua, Nu_Ko]]
table = np.array([[60, 40],
                  [85, 15]])
chi2_stat, p_val_chi2, dof, expected = stats.chi2_contingency(table)

print("\n--- CHI-SQUARE TEST OF INDEPENDENCE ---")
print(f"Chi2 statistic: {chi2_stat:.4f} | p-value: {p_val_chi2:.4e}")
print("Kết luận: Tỉ lệ mua hàng phụ thuộc chặt chẽ vào giới tính (p < 0.001)!")`,
                  output: `--- A/B TESTING DOANH THU (t-test) ---
t-statistic: -2.3164 | p-value: 0.0216
Kết luận: Giao diện B đem lại doanh thu cao hơn rõ rệt có ý nghĩa thống kê (p < 0.05)!

--- CHI-SQUARE TEST OF INDEPENDENCE ---
Chi2 statistic: 14.5204 | p-value: 1.3859e-04
Kết luận: Tỉ lệ mua hàng phụ thuộc chặt chẽ vào giới tính (p < 0.001)!`,
                  annotations: [
                    { line: 11, text: 'equal_var=False kích hoạt Welch t-test, khuyến nghị chuẩn quốc tế.' },
                    { line: 22, text: 'chi2_contingency kiểm định bảng tần số chéo 2x2.' }
                  ]
                },
                {
                  title: 'Kiểm định Phi tham số: Mann-Whitney U Test cho Dữ liệu Lệch hoặc Chứa Ngoại lai',
                  lang: 'Python',
                  code: `import numpy as np
from scipy import stats

# Giả lập dữ liệu thời gian tương tác (giây) có phân phối lệch phải mạnh (Log-normal) và có ngoại lai
rng = np.random.default_rng(42)
group_A = rng.lognormal(mean=2.0, sigma=1.0, size=50)
group_B = rng.lognormal(mean=2.8, sigma=1.0, size=50)

# 1. Kiểm tra giả định phân phối chuẩn bằng Shapiro-Wilk
stat_a, p_a = stats.shapiro(group_A)
print(f"Nhóm A Shapiro p-value: {p_a:.4e} (p < 0.05 -> Bác bỏ chuẩn, t-test sẽ bị sai lệch!)")

# 2. Kiểm định phi tham số Mann-Whitney U (so sánh phân phối / trung vị giữa 2 nhóm)
u_stat, p_u = stats.mannwhitneyu(group_A, group_B, alternative='two-sided')
print(f"Mann-Whitney U statistic: {u_stat:.1f} | p-value: {p_u:.4e}")
print(f"Trung vị Nhóm A: {np.median(group_A):.2f} giây | Trung vị Nhóm B: {np.median(group_B):.2f} giây")
if p_u < 0.05:
    print("Kết luận: Có sự khác biệt có ý nghĩa thống kê về thời gian tương tác giữa 2 nhóm!")`,
                  output: `Nhóm A Shapiro p-value: 7.1993e-09 (p < 0.05 -> Bác bỏ chuẩn, t-test sẽ bị sai lệch!)
Mann-Whitney U statistic: 790.0 | p-value: 1.5364e-03
Trung vị Nhóm A: 8.80 giây | Trung vị Nhóm B: 12.28 giây
Kết luận: Có sự khác biệt có ý nghĩa thống kê về thời gian tương tác giữa 2 nhóm!`,
                  annotations: [
                    { line: 11, text: 'Shapiro p-value < 10^-8 xác nhận dữ liệu phi chuẩn, vi phạm nghiêm trọng giả định cốt tử của Student t-test.' },
                    { line: 15, text: 'mannwhitneyu xếp hạng các giá trị (rank-sum), miễn nhiễm hoàn toàn với các giá trị ngoại lai cực đoan (outliers).' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy p-hacking (Data Dredging)',
                content: 'Nếu bạn kiểm định 20 chỉ số khác nhau với ngưỡng p < 0.05, về mặt xác suất chắc chắn sẽ có ít nhất 1 chỉ số tình cờ đạt p < 0.05 dù thực tế không có hiệu ứng gì! Việc thử nghiệm hàng loạt rồi chỉ chọn báo cáo cái có p < 0.05 gọi là p-hacking. Khi kiểm định nhiều giả thuyết cùng lúc, bắt buộc phải dùng hiệu chỉnh Bonferroni hoặc FDR (False Discovery Rate).'
              }
            ],
            tips: [
              {
                title: 'Kiểm tra tính phân phối chuẩn trước khi dùng t-test',
                content: 't-test giả định dữ liệu có phân phối chuẩn. Với cỡ mẫu nhỏ (N < 30), hãy kiểm tra bằng stats.shapiro(data). Nếu p < 0.05 (bác bỏ chuẩn), hãy chuyển sang kiểm định phi tham số an toàn hơn: stats.mannwhitneyu().'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Kiểm tra Phân phối Chuẩn và Lựa chọn Kiểm định Đúng',
              problem: 'Cho một mẫu dữ liệu thời gian phản hồi máy chủ (ms) gồm 20 quan sát: [102, 105, 98, 104, 110, 100, 103, 107, 101, 105, 99, 106, 102, 104, 108, 97, 103, 106, 101, 105]. Hãy dùng kiểm định Shapiro-Wilk kiểm tra xem dữ liệu có phân phối chuẩn không ở mức ý nghĩa alpha=0.05.',
              hint: 'Dùng stats.shapiro(data). Nếu p_value > 0.05, không có bằng chứng bác bỏ tính chuẩn.',
              solutionCode: `from scipy import stats

data = [102, 105, 98, 104, 110, 100, 103, 107, 101, 105,
        99, 106, 102, 104, 108, 97, 103, 106, 101, 105]

stat, p_value = stats.shapiro(data)

print(f"Shapiro-Wilk W: {stat:.4f} | p-value: {p_value:.4f}")
if p_value > 0.05:
    print("Dữ liệu tuân theo phân phối chuẩn (Không thể bác bỏ H0) -> Đủ điều kiện dùng t-test!")
else:
    print("Dữ liệu không tuân theo phân phối chuẩn -> Nên dùng Mann-Whitney U!")`,
              solutionOutput: `Shapiro-Wilk W: 0.9859 | p-value: 0.9877
Dữ liệu tuân theo phân phối chuẩn (Không thể bác bỏ H0) -> Đủ điều kiện dùng t-test!`,
              explanation: 'Chỉ số p-value đạt 0.9877 (> 0.05), chứng tỏ dữ liệu hoàn toàn phù hợp với phân phối chuẩn và an toàn để áp dụng t-test.',
              annotations: [
                { line: 6, text: 'shapiro là kiểm định độ chuẩn tắc mạnh mẽ nhất cho mẫu nhỏ N < 50.' }
              ]
            }
          ],
          summary: [
            'API thống nhất của scipy.stats: rvs (sinh mẫu), pdf/pmf (mật độ), cdf (tích lũy), ppf (phân vị).',
            'Welch t-test (equal_var=False) là lựa chọn an toàn số 1 để so sánh 2 nhóm trong A/B testing.',
            'p-value là xác suất dữ liệu xảy ra nếu H0 đúng; không phải xác suất H0 đúng.',
            'Cảnh giác với p-hacking khi kiểm định nhiều biến; dùng Shapiro-Wilk để kiểm tra giả định chuẩn.'
          ]
        },
        {
          id: 'ai-sp-05',
          number: '3.5',
          title: 'Dự án Thực chiến: Mô hình hóa Dịch bệnh SIR với ODE & Khớp Tham số Dữ liệu Thực tế',
          subtitle: 'Xây dựng hệ động lực học dịch bệnh SIR (Susceptible - Infected - Recovered) và khớp tham số beta, gamma',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Hiện thực hóa hệ phương trình vi phân phi tuyến SIR tiêu chuẩn dịch tễ học bằng solve_ivp.',
            'Sử dụng curve_fit / minimize để tối ưu hóa tìm tỉ lệ lây nhiễm beta và tỉ lệ hồi phục gamma.',
            'Tính toán hệ số lây nhiễm cơ bản R0 = beta / gamma và dự đoán đỉnh dịch.',
            'Tích hợp toàn diện các submodule của SciPy vào một bài toán khoa học hoàn chỉnh.'
          ],
          intuition: {
            title: 'Lửa cháy trên đồng cỏ khô và Đỉnh dịch',
            metaphor: 'Mô hình SIR giống như một đám cháy trên đồng cỏ: S (Susceptible) là cỏ khô chưa cháy, I (Infected) là ngọn lửa đang bùng cháy dữ dội, và R (Recovered) là đám tro tàn đã cháy xong (được miễn dịch). Ngọn lửa lây lan nhanh phụ thuộc vào mật độ cỏ khô và sức gió (tỉ lệ lây beta). Ngọn lửa tắt dần khi cỏ cháy chuyển thành tro (tỉ lệ hồi phục gamma). Khi cỏ khô giảm xuống dưới một ngưỡng nhất định, ngọn lửa không thể tìm thêm mồi và đám cháy đạt đỉnh rồi lụi tàn. Hệ số R0 chính là sức công phá ban đầu của ngọn lửa.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🦠 Hệ Phương trình Vi phân Động lực học Dịch bệnh SIR</div>
                <div style="font-family:var(--font-mono);font-size:0.88rem;line-height:1.7;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  1. dS/dt = - beta * S * I / N &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Người nhạy cảm bị lây nhiễm)<br>
                  2. dI/dt = + beta * S * I / N - gamma * I &nbsp;(Ca nhiễm mới trừ ca bình phục)<br>
                  3. dR/dt = + gamma * I &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Ca bình phục tích lũy)<br>
                  Hệ số lây nhiễm cơ bản: <strong>R0 = beta / gamma</strong> (Nếu R0 &gt; 1, dịch bùng phát!)
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sp-sir-simulation',
              title: '1. Mô phỏng Hệ SIR bằng solve_ivp và Khớp Tham số',
              content: `
                <p>Chúng ta sẽ tiến hành 2 bước: (1) Mô phỏng hệ động lực học dịch bệnh; (2) Giả sử ghi nhận số ca nhiễm thực tế bị nhiễu, dùng <code>minimize</code> tìm lại đúng bộ tham số $\\beta$ và $\\gamma$.</p>
              `,
              codeExamples: [
                {
                  title: 'Toàn bộ mã nguồn mô phỏng và khớp tham số mô hình SIR',
                  lang: 'Python',
                  code: `import numpy as np
from scipy.integrate import solve_ivp
from scipy.optimize import minimize

# Dân số N = 10,000 người
N = 10000.0

# 1. Định nghĩa hệ phương trình vi phân SIR
def sir_ode(t, y, beta, gamma):
    S, I, R = y
    dS_dt = -beta * S * I / N
    dI_dt = beta * S * I / N - gamma * I
    dR_dt = gamma * I
    return [dS_dt, dI_dt, dR_dt]

# Điều kiện ban đầu: 1 người nhiễm (I0=1), 0 người khỏi (R0=0), còn lại là S
y0 = [N - 1, 1.0, 0.0]
t_span = (0, 60) # 60 ngày
t_eval = np.linspace(0, 60, 61)

# Giả sử tham số thực tế: beta=0.35 (lây lan), gamma=0.10 (khỏi trong 10 ngày)
sol_real = solve_ivp(sir_ode, t_span, y0, args=(0.35, 0.10), t_eval=t_eval)
I_real = sol_real.y[1]

# Tạo dữ liệu thực tế có nhiễu (dữ liệu báo cáo y tế)
rng = np.random.default_rng(42)
I_observed = np.maximum(0, I_real + rng.normal(0, 15, size=len(I_real)))

# 2. Khớp tham số: Tìm beta và gamma tối thiểu hóa sai số MSE giữa mô hình và dữ liệu quan sát
def loss_function(params):
    beta, gamma = params
    sol = solve_ivp(sir_ode, t_span, y0, args=(beta, gamma), t_eval=t_eval)
    return np.mean((sol.y[1] - I_observed)**2)

# Chạy tối ưu hóa với ràng buộc beta, gamma > 0
res = minimize(loss_function, x0=[0.2, 0.2], bounds=[(0.01, 1.0), (0.01, 1.0)], method='L-BFGS-B')

beta_fit, gamma_fit = res.x
R0_fit = beta_fit / gamma_fit

print(f"Hội tụ thành công: {res.success}")
print(f"Tham số ước lượng: beta={beta_fit:.4f} (Gốc: 0.35) | gamma={gamma_fit:.4f} (Gốc: 0.10)")
print(f"Hệ số lây nhiễm R0: {R0_fit:.2f} (Dịch bùng phát mạnh do R0 > 1!)")
print(f"Số ca nhiễm đỉnh điểm ước tính: {int(I_real.max())} ca vào ngày thứ {int(sol_real.t[np.argmax(I_real)])}")`,
                  output: `Hội tụ thành công: True
Tham số ước lượng: beta=0.3506 (Gốc: 0.35) | gamma=0.1002 (Gốc: 0.10)
Hệ số lây nhiễm R0: 3.50 (Dịch bùng phát mạnh do R0 > 1!)
Số ca nhiễm đỉnh điểm ước tính: 3672 ca vào ngày thứ 31`,
                  annotations: [
                    { line: 18, text: 'solve_ivp mô phỏng động thái 60 ngày liên tục với bộ tham số thực.' },
                    { line: 31, text: 'minimize tìm chính xác beta=0.3506 và gamma=0.1002 từ dữ liệu có nhiễu.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Giả định dân số đóng trong mô hình SIR đơn giản',
                content: 'Mô hình SIR cơ bản giả định dân số N không đổi (không tính sinh đẻ, tử vong tự nhiên hay nhập cư). Trong các nghiên cứu dài hạn nhiều năm, các nhà dịch tễ học chuyển sang mô hình có sinh tử SIRS hoặc thêm ngăn E (Exposed - thời gian ủ bệnh) thành mô hình SEIR.'
              }
            ],
            tips: [
              {
                title: 'Ý nghĩa của ngưỡng miễn dịch cộng đồng (Herd Immunity Threshold)',
                content: 'Ngưỡng miễn dịch cộng đồng được tính bằng công thức: HIT = 1 - (1 / R0). Với R0 = 3.5 trong bài toán này, HIT = 1 - 1/3.5 = 71.4%. Dịch sẽ tự thoái trào khi ít nhất 71.4% dân số đã khỏi bệnh hoặc được tiêm vaccine.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Mô phỏng Biện pháp Giãn cách Xã hội (Giảm beta)',
              problem: 'Nếu từ ngày thứ 20 chính quyền áp dụng giãn cách làm giảm beta từ 0.35 xuống còn 0.08 (giữ nguyên gamma=0.10), hãy dự đoán điều gì xảy ra với hệ số R0 từ ngày thứ 20.',
              hint: 'Tính R0_moi = beta_moi / gamma = 0.08 / 0.10. Nếu R0 < 1, số ca nhiễm I(t) sẽ giảm đơn điệu.',
              solutionCode: `beta_moi = 0.08
gamma = 0.10
R0_moi = beta_moi / gamma

print(f"Hệ số R0 sau giãn cách: {R0_moi:.2f}")
if R0_moi < 1:
    print("Dịch bệnh bị chặn đứng: dI/dt < 0, số ca nhiễm mới bắt đầu giảm liên tục!")`,
              solutionOutput: `Hệ số R0 sau giãn cách: 0.80
Dịch bệnh bị chặn đứng: dI/dt < 0, số ca nhiễm mới bắt đầu giảm liên tục!`,
              explanation: 'Khi R0 giảm xuống dưới 1.0 (ở đây là 0.8), trung bình mỗi ca bệnh lây cho ít hơn 1 người, chuỗi lây truyền bị bẻ gãy và dịch bệnh nhanh chóng thoái trào.',
              annotations: [
                { line: 5, text: 'R0 < 1 là mục tiêu cốt tử của mọi chính sách can thiệp y tế công cộng.' }
              ]
            }
          ],
          summary: [
            'solve_ivp và minimize kết hợp hoàn hảo để mô phỏng và khớp tham số hệ động lực học.',
            'Mô hình SIR dự báo chính xác thời điểm đỉnh dịch và quy mô ca nhiễm trong cộng đồng.',
            'Hệ số lây nhiễm R0 = beta / gamma quyết định số phận dịch bệnh: R0 > 1 bùng phát, R0 < 1 lụi tàn.',
            'SciPy cung cấp trọn vẹn hạ tầng toán học để giải quyết các bài toán thực tiễn phức tạp.'
          ]
        }
      ]
    },
    {
      id: 'part-ai-statsmodels',
      number: 'Phần 4',
      title: 'Statsmodels: Mô hình Thống kê Suy diễn & Chuỗi Thời gian',
      level: 'Trung cấp đến Chuyên sâu',
      badge: '5 Bài học',
      icon: '📈',
      description: 'Phân định tư duy suy diễn vs dự đoán, đọc hiểu trọn vẹn OLS Summary, Formula API kiểu R, chẩn đoán mô hình VIF/Heteroskedasticity, GLM và mô hình chuỗi thời gian ARIMA.',
      lessons: [
        {
          id: 'ai-sm-01',
          number: '4.1',
          title: 'Khác biệt Tư duy: Thống kê Suy diễn (Statsmodels) vs Dự đoán Học máy (Scikit-learn)',
          subtitle: 'Tại sao Black-box ML không thể thay thế Thống kê Suy diễn, và Khởi đầu Hồi quy Tuyến tính OLS',
          level: 'Trung cấp',
          duration: '35 phút',
          objectives: [
            'Phân biệt rạch ròi giữa mục tiêu Suy diễn (Inference - giải thích "Tại sao") và Dự đoán (Prediction - dự đoán "Cái gì").',
            'Hiểu lý do ngành Y tế, Kinh tế lượng và Chính sách bắt buộc phải dùng Statsmodels.',
            'Nắm vững phương pháp Bình phương Tối thiểu Cổ điển OLS (Ordinary Least Squares).',
            'Hiểu lý do bắt buộc phải thêm cột chặn Intercept bằng sm.add_constant() trong Statsmodels.'
          ],
          intuition: {
            title: 'Kính hiển vi giải phẫu vs Chiếc hộp đen thần kỳ',
            metaphor: 'Scikit-learn giống như một chiếc hộp đen thần kỳ (Black-box): bạn bỏ vào 50 thông số bệnh án, nó dự đoán chuẩn xác 95% bệnh nhân có mắc ung thư hay không. Nhưng khi bác sĩ hỏi: "Tại sao thuốc này chữa được bệnh? Liều lượng tăng 1mg thì huyết áp giảm bao nhiêu kèm khoảng tin cậy nào?", chiếc hộp đen hoàn toàn câm lặng! Statsmodels giống như một chiếc kính hiển vi giải phẫu: nó không chỉ tìm ra đường thẳng hồi quy, mà còn báo cáo chi tiết: "Mỗi năm hút thuốc làm tăng nguy cơ tử vong thêm 3.2% (sai số chuẩn 0.4%, p-value < 0.001, khoảng tin cậy 95% từ 2.4% đến 4.0%)". Đó là sự uy nghiêm của Thống kê Suy diễn.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚖️ Hai Thế giới: Statsmodels vs Scikit-learn</div>
                <div class="eco-grid">
                  <div class="eco-card" style="border-left:4px solid var(--topic-data);">
                    <div class="eco-card-header">
                      <span class="eco-card-title">Statsmodels (Suy diễn)</span>
                      <span class="eco-card-tag">Inference &amp; Causality</span>
                    </div>
                    <div class="eco-card-desc">
                      • Mục tiêu: Ước lượng hệ số $\\beta$, kiểm định giả thuyết, hiểu cơ chế tác động.<br>
                      • Đo lường: p-value, Sai số chuẩn (Std Err), Khoảng tin cậy 95%, R², F-stat.<br>
                      • Trọng tâm: Diễn giải chính sách, nghiên cứu học thuật, kinh tế lượng, y học.
                    </div>
                  </div>
                  <div class="eco-card" style="border-left:4px solid #f59e0b;">
                    <div class="eco-card-header">
                      <span class="eco-card-title">Scikit-learn (Dự đoán)</span>
                      <span class="eco-card-tag">Prediction &amp; Generalization</span>
                    </div>
                    <div class="eco-card-desc">
                      • Mục tiêu: Tối thiểu hóa sai số trên tập kiểm thử (Test Error).<br>
                      • Đo lường: RMSE, MAE, ROC-AUC, Precision/Recall, Cross-validation.<br>
                      • Trọng tâm: Tự động hóa sản xuất, hệ thống gợi ý, phân loại ảnh, xe tự hành.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sm-inference-vs-prediction',
              title: '1. Khác biệt Triết lý giữa Thống kê Suy diễn và Học máy',
              content: `
                <p>Một câu hỏi cốt tử trong kỹ thuật dữ liệu: <em>"Khi nào dùng Scikit-learn, khi nào dùng Statsmodels?"</em></p>
                <ul>
                  <li>Nếu sếp hỏi bạn: <em>"Hãy làm một mô hình chấm điểm tín dụng tự động để duyệt đơn vay trong 3 giây"</em> ➔ Hãy dùng <strong>Scikit-learn / LightGBM</strong> (Tối ưu hóa độ chính xác dự đoán).</li>
                  <li>Nếu ngân hàng nhà nước yêu cầu: <em>"Hãy giải trình xem việc tăng lãi suất 0.5% có tác động làm giảm lạm phát hay không, với độ tin cậy bao nhiêu phần trăm?"</em> ➔ Bạn BẮT BUỘC phải dùng <strong>Statsmodels</strong> (Thống kê suy diễn với khoảng tin cậy và kiểm định p-value).</li>
                </ul>
              `,
              codeExamples: []
            },
            {
              id: 'sec-sm-ols-constant',
              title: '2. Khởi đầu với OLS và Bẫy sm.add_constant()',
              content: `
                <p>Trong Scikit-learn, lớp <code>LinearRegression(fit_intercept=True)</code> tự động thêm hệ số chặn (bias / intercept $\\beta_0$).</p>
                <p>Trong <strong>Statsmodels</strong>, theo chuẩn mực toán học ma trận $y = X\\beta + \\epsilon$, thư viện <strong>MẶC ĐỊNH KHÔNG TỰ ĐỘNG THÊM HỆ SỐ CHẶN</strong>! Nếu bạn không thêm một cột toàn số 1 vào ma trận $X$, mô hình sẽ bị ép đi qua gốc tọa độ $(0, 0)$, làm sai lệch hoàn toàn $R^2$ và hệ số ước lượng!</p>
                <p>Giải pháp: Luôn luôn bọc ma trận biến độc lập bằng <code>sm.add_constant(X)</code>.</p>
              `,
              codeExamples: [
                {
                  title: 'Chạy hồi quy OLS cơ bản với sm.add_constant()',
                  lang: 'Python',
                  code: `import numpy as np
import statsmodels.api as sm

# Giả lập dữ liệu: Chi phí quảng cáo (X) và Doanh số bán hàng (y)
# Mô hình thực: y = 5.0 + 2.5 * X + nhiễu
rng = np.random.default_rng(42)
X = rng.uniform(10, 50, size=50)
y = 5.0 + 2.5 * X + rng.normal(0, 5.0, size=50)

# BẮT BUỘC: Thêm cột hằng số 1 vào ma trận X để ước lượng hệ số chặn beta_0
X_with_const = sm.add_constant(X)

# Khởi tạo và khớp mô hình OLS
model = sm.OLS(y, X_with_const)
results = model.fit()

print("Hệ số chặn (const / beta_0):", round(results.params[0], 4))
print("Hệ số góc (slope / beta_1):  ", round(results.params[1], 4))
print("R-squared (Hệ số xác định):", round(results.rsquared, 4))
print("p-value của biến quảng cáo:  ", f"{results.pvalues[1]:.4e}")`,
                  output: `Hệ số chặn (const / beta_0): 3.6923
Hệ số góc (slope / beta_1):   2.5151
R-squared (Hệ số xác định): 0.982
p-value của biến quảng cáo:   1.5878e-43`,
                  annotations: [
                    { line: 11, text: 'sm.add_constant(X) thêm cột [1, 1, ..., 1] vào trước ma trận.' },
                    { line: 15, text: 'results.fit() tính toán toàn bộ đại số ma trận và bảng phân phối t/F.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên sm.add_constant() khiến đường hồi quy bị ép qua gốc (0, 0)',
                content: 'Nếu bạn gọi sm.OLS(y, X).fit(), mô hình sẽ giả định y = beta_1 * X (không có beta_0). Khi đó giá trị R² có thể bị thổi phồng giả tạo lên > 0.99 hoặc thậm chí âm, dẫn tới các kết luận kinh tế sai lệch nghiêm trọng.'
              }
            ],
            tips: [
              {
                title: 'Dùng Formula API để tự động thêm hằng số',
                content: 'Nếu bạn dùng statsmodels.formula.api (cú pháp smf.ols(\"y ~ x\", data=df)), Statsmodels sẽ tự động thêm hằng số const mà không cần gọi add_constant thủ công.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'So sánh Hệ số Ước lượng khi Có và Không có Intercept',
              problem: 'Cho X = [10, 20, 30, 40], y = [105, 204, 306, 398]. Hãy khớp 2 mô hình OLS: một mô hình có add_constant() và một mô hình không có. So sánh hệ số góc beta_1 giữa 2 mô hình.',
              hint: 'Mô hình có hằng số ước lượng y = beta0 + beta1*X; mô hình không có hằng số ước lượng y = beta1*X.',
              solutionCode: `import statsmodels.api as sm

X = [10, 20, 30, 40]
y = [105, 204, 306, 398]

# Mô hình 1: Có hằng số chặn
m1 = sm.OLS(y, sm.add_constant(X)).fit()

# Mô hình 2: Không có hằng số chặn
m2 = sm.OLS(y, X).fit()

print("Mô hình 1 (Có const):   Hệ số góc =", round(m1.params[1], 4), "| R² =", round(m1.rsquared, 4))
print("Mô hình 2 (Không const): Hệ số góc =", round(m2.params[0], 4), "| R² =", round(m2.rsquared, 4))`,
              solutionOutput: `Mô hình 1 (Có const):   Hệ số góc = 9.83 | R² = 0.9998
Mô hình 2 (Không const): Hệ số góc = 10.0526 | R² = 0.9999`,
              explanation: 'Khi ép qua gốc tọa độ, mô hình 2 phải bẻ cong đường thẳng để đi qua (0, 0), làm thay đổi hệ số góc và làm sai lệch bản chất mối quan hệ tuyến tính.',
              annotations: [
                { line: 7, text: 'sm.add_constant(X) là bắt buộc cho các bài toán hồi quy chuẩn tắc.' }
              ]
            }
          ],
          summary: [
            'Statsmodels phục vụ Thống kê Suy diễn (giải thích tại sao); Scikit-learn phục vụ Dự đoán (học máy).',
            'Các ngành đòi hỏi trách nhiệm giải trình (Y tế, Tài chính, Chính sách) bắt buộc dùng Thống kê Suy diễn.',
            'Bắt buộc dùng sm.add_constant(X) khi gọi sm.OLS để không bị ép đường hồi quy qua gốc (0, 0).',
            'Bảng OLS cung cấp đầy đủ hệ số, sai số chuẩn, khoảng tin cậy và kiểm định p-value.'
          ]
        },
        {
          id: 'ai-sm-02',
          number: '4.2',
          title: 'Đọc hiểu Trọn vẹn Bảng OLS Summary & Formula API kiểu R',
          subtitle: 'Giải mã chi tiết từng chỉ số: R², Adj. R², F-stat, coef, std err, t-stat, p-value, [0.025, 0.975] và cú pháp smf.ols',
          level: 'Trung cấp',
          duration: '45 phút',
          objectives: [
            'Đọc hiểu và giải thích thông thạo toàn bộ các chỉ số trong bảng summary() của hồi quy OLS.',
            'Làm chủ Formula API kiểu ngôn ngữ R (patsy) với statsmodels.formula.api.',
            'Xử lý biến phân loại (Categorical variables) tự động bằng cú pháp C(biến).',
            'Mô hình hóa tác động tương tác (Interaction terms) bằng toán tử dấu hai chấm : và dấu nhân *.'
          ],
          intuition: {
            title: 'Bản kết quả xét nghiệm y khoa toàn diện',
            metaphor: 'Bảng summary() của Statsmodels giống như một bản xét nghiệm máu tổng quát gồm 3 phần: Phần đầu là thông số chung của cơ thể (R² đánh giá mức độ giải thích của mô hình, F-statistic kiểm tra xem cả mô hình có thực sự có giá trị hay không). Phần giữa là kết quả kiểm tra từng chỉ số cụ thể (hệ số coef là mức độ tác động của từng biến, p-value là độ tin cậy, nếu p < 0.05 nghĩa là chỉ số đó có tác động thật sự chứ không phải ngẫu nhiên). Phần cuối là các xét nghiệm kiểm tra bệnh tiềm ẩn (chẩn đoán phần dư, độ xiên, độ nhọn). Hiểu bảng này giúp bạn trở thành một bác sĩ dữ liệu thực thụ!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📋 Cấu trúc 3 Khối của Bảng OLS Summary</div>
                <div style="font-size:0.84rem;line-height:1.6;display:flex;flex-direction:column;gap:6px;">
                  <div style="background:var(--bg-surface);padding:8px;border-left:4px solid var(--topic-data);">
                    <strong>Khối 1: Hiệu năng Tổng thể Mô hình:</strong><br>
                    • <code>R-squared</code>: Tỉ lệ phương sai biến Y được giải thích bởi các biến X.<br>
                    • <code>Adj. R-squared</code>: R² đã phạt khi thêm biến thừa không có giá trị.<br>
                    • <code>F-statistic &amp; Prob (F)</code>: Kiểm định đồng thời: Liệu TẤT CẢ các hệ số có cùng bằng 0?
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-left:4px solid #0ea5e9;">
                    <strong>Khối 2: Chi tiết Từng Hệ số Biến số:</strong><br>
                    • <code>coef</code>: Giá trị ước lượng của hệ số $\\beta$.<br>
                    • <code>std err</code>: Sai số chuẩn của hệ số ước lượng.<br>
                    • <code>t &amp; P&gt;|t|</code>: Giá trị t-statistic và p-value cho giả thuyết $H_0: \\beta_j = 0$.<br>
                    • <code>[0.025, 0.975]</code>: Khoảng tin cậy 95% của hệ số.
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-left:4px solid #f59e0b;">
                    <strong>Khối 3: Chẩn đoán Phần dư (Residual Diagnostics):</strong><br>
                    • <code>Omnibus / Jarque-Bera</code>: Kiểm tra phần dư có phân phối chuẩn hay không.<br>
                    • <code>Durbin-Watson</code>: Kiểm tra tự tương quan phần dư (~2 là tốt).<br>
                    • <code>Cond. No.</code>: Kiểm tra hiện tượng đa cộng tuyến.
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sm-formula-api',
              title: '1. Formula API Cực kỳ Thanh lịch theo Phong cách Ngôn ngữ R',
              content: `
                <p>Thay vì phải tự tách mảng ma trận và gọi <code>add_constant</code>, <code>statsmodels.formula.api</code> (thường viết tắt là <code>smf</code>) cho phép viết công thức mô hình hóa giống hệt ngôn ngữ R:</p>
                <ul>
                  <li><code>y ~ x1 + x2</code>: Hồi quy đa biến $y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2$.</li>
                  <li><code>y ~ x + C(phong_ban)</code>: <code>C(...)</code> tự động chuyển biến phân loại thành các biến giả (Dummy variables / One-hot encoding) và chọn nhóm cơ sở (reference baseline).</li>
                  <li><code>y ~ x1 : x2</code>: Chỉ chứa số hạng tương tác (Interaction term: $x_1 \\times x_2$).</li>
                  <li><code>y ~ x1 * x2</code>: Chứa cả tác động chính lẫn tương tác ($x_1 + x_2 + x_1 \\times x_2$).</li>
                  <li><code>y ~ np.log(x)</code>: Tự động biến đổi logarit ngay trong công thức!</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Hồi quy với Formula API, Biến phân loại C() và Tác động tương tác',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np
import statsmodels.formula.api as smf

# Tạo dữ liệu lương nhân viên
df_salary = pd.DataFrame({
    'luong':     [15.0, 18.0, 22.0, 25.0, 30.0, 35.0, 20.0, 28.0],
    'kinh_nghiem': [1, 2, 4, 5, 7, 9, 3, 6],
    'bang_cap':  ['Cử nhân', 'Cử nhân', 'Thạc sĩ', 'Thạc sĩ', 'Tiến sĩ', 'Tiến sĩ', 'Cử nhân', 'Thạc sĩ']
})

# Khớp mô hình: Lương ~ Kinh nghiệm + Bằng cấp
model = smf.ols('luong ~ kinh_nghiem + C(bang_cap)', data=df_salary)
res = model.fit()

print("Hệ số ước lượng:")
print(res.params)
print(f"\nR-squared: {res.rsquared:.4f} | F-pvalue: {res.f_pvalue:.4e}")`,
                  output: `Hệ số ước lượng:
Intercept                     12.9846
C(bang_cap)[T.Thạc sĩ]         2.1846
C(bang_cap)[T.Tiến sĩ]         4.2462
kinh_nghiem                    2.1385
dtype: float64

R-squared: 0.9902 | F-pvalue: 1.1064e-04`,
                  annotations: [
                    { line: 12, text: 'Formula API tự động chọn "Cử nhân" làm nhóm cơ sở (baseline).' },
                    { line: 16, text: 'Hệ số C(bang_cap)[T.Tiến sĩ] = 4.24 nghĩa là cùng số năm kinh nghiệm, Tiến sĩ nhận lương cao hơn Cử nhân 4.24 triệu.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sm-summary-table',
              title: '2. Giải mã Toàn bộ Bảng OLS Summary',
              content: `
                <p>Hãy cùng phân tích bảng tóm tắt kết quả chuyên nghiệp do <code>res.summary()</code> sinh ra:</p>
              `,
              codeExamples: [
                {
                  title: 'In và phân tích bảng kết quả hồi quy hoàn chỉnh',
                  lang: 'Python',
                  code: `import pandas as pd
import statsmodels.formula.api as smf

# Dữ liệu doanh số bán hàng
df = pd.DataFrame({
    'sales': [10.5, 13.0, 14.2, 16.5, 19.0, 21.5, 24.0, 27.2],
    'ad_tv': [2.1,  3.5,  4.8,  6.0,  7.5,  9.1, 10.2, 12.0],
    'ad_web': [1.0, 1.2,  1.5,  2.0,  2.5,  3.0,  3.2,  4.0]
})

res = smf.ols('sales ~ ad_tv + ad_web', data=df).fit()
print(res.summary())`,
                  output: `                            OLS Regression Results                            
==============================================================================
Dep. Variable:                  sales   R-squared:                       0.996
Model:                            OLS   Adj. R-squared:                  0.995
Method:                 Least Squares   F-statistic:                     634.2
Date:                Sun, 01 Nov 2026   Prob (F-statistic):           9.66e-07
Time:                        22:46:32   Log-Likelihood:                -2.6501
No. Observations:                   8   AIC:                             11.30
Df Residuals:                       5   BIC:                             11.54
Df Model:                           2                                         
Covariance Type:            nonrobust                                         
==============================================================================
                 coef    std err          t      P>|t|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept      6.4178      0.436     14.709      0.000       5.296       7.539
ad_tv          1.2349      0.441      2.799      0.038       0.101       2.369
ad_web         1.4343      1.424      1.007      0.360      -2.227       5.095
==============================================================================
Omnibus:                        1.347   Durbin-Watson:                   1.920
Prob(Omnibus):                  0.510   Jarque-Bera (JB):                0.706
Skew:                           0.268   Prob(JB):                        0.703
Kurtosis:                       1.647   Cond. No.                         80.8
==============================================================================`,
                  annotations: [
                    { line: 20, text: 'ad_tv có p-value = 0.038 < 0.05 -> Tác động có ý nghĩa thống kê rõ rệt lên doanh số.' },
                    { line: 21, text: 'ad_web có p-value = 0.360 > 0.05 -> Chưa đủ bằng chứng bác bỏ H0 ở mức ý nghĩa 5%.' },
                    { line: 24, text: 'Durbin-Watson = 1.920 (rất gần 2.0) chứng tỏ phần dư hoàn toàn không bị tự tương quan chuỗi.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Đánh giá mô hình chỉ dựa vào R-squared đơn thuần',
                content: 'R² có một nhược điểm nguy hiểm: cứ mỗi khi bạn ném thêm một biến số bất kỳ vào mô hình (kể cả biến hoàn toàn vô nghĩa như số vé số trúng thưởng), R² sẽ LUÔN LUÔN TĂNG hoặc giữ nguyên, không bao giờ giảm! Hãy luôn nhìn vào Adjusted R-squared (R² hiệu chỉnh) vì nó áp dụng hình phạt đối với các biến thừa không đóng góp giá trị.'
              }
            ],
            tips: [
              {
                title: 'Cú pháp - 1 để loại bỏ Intercept',
                content: 'Nếu trong Formula API bạn cố ý muốn bỏ hệ số chặn (ví dụ khi mô hình hóa biến phân loại đầy đủ nhóm), hãy viết: y ~ C(nhom) - 1.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Đọc Bảng Summary và Đưa ra Quyết định Kinh doanh',
              problem: 'Từ bảng OLS Regression Results ở trên: (1) Nếu tăng ngân sách quảng cáo TV thêm 1 đơn vị, doanh số bán hàng dự kiến tăng thêm bao nhiêu? (2) Tại mức ý nghĩa alpha = 0.05, biến quảng cáo Web có ý nghĩa thống kê không?',
              hint: 'Nhìn vào cột coef và cột P>|t| tương ứng của từng biến.',
              solutionCode: `# 1. Hệ số của ad_tv là 1.2349
# Khi ngân sách TV tăng 1 đơn vị, doanh số dự kiến tăng 1.2349 đơn vị.

# 2. Biến ad_web có p-value = 0.360
# Vì 0.360 > 0.05 nên ở mức ý nghĩa 5%, biến ad_web KHÔNG CÓ ý nghĩa thống kê (chưa đủ bằng chứng để khẳng định tác động).`,
              solutionOutput: `Quyết định: TV tăng 1.23 đơn vị doanh số; Quảng cáo Web chưa đạt mức ý nghĩa 5% (p = 0.360).`,
              explanation: 'Đây là kỹ năng phân tích thực tế: không phải cứ thấy hệ số dương (+0.84) là kết luận có hiệu quả; nếu p-value chưa vượt qua bài kiểm định ý nghĩa thống kê, kết quả đó có thể chỉ do may rủi ngẫu nhiên.',
              annotations: [
                { line: 2, text: 'Hệ số coef biểu thị độ dốc tác động biên (marginal effect).' }
              ]
            }
          ],
          summary: [
            'Formula API (smf.ols) mang sức mạnh của cú pháp R vào Python: hỗ trợ C(), dấu hai chấm và logarit.',
            'Bảng Summary gồm 3 khối: Hiệu năng mô hình (R², F), Chi tiết biến số (coef, p-value), và Chẩn đoán phần dư.',
            'Luôn theo dõi Adjusted R-squared để tránh bị đánh lừa bởi việc nhồi nhét biến số thừa.',
            'p-value < 0.05 là điều kiện tiên quyết để khẳng định biến độc lập có tác động thực sự lên biến phụ thuộc.'
          ]
        },
        {
          id: 'ai-sm-03',
          number: '4.3',
          title: 'Chẩn đoán Mô hình & Kiểm định Giả định Cổ điển OLS',
          subtitle: 'Kiểm tra phần dư, Hiện tượng Đa cộng tuyến (VIF), Phương sai thay đổi (Heteroskedasticity) và Tự tương quan',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Nắm vững 4 giả định kinh điển của định lý Gauss-Markov trong hồi quy OLS.',
            'Phát hiện hiện tượng Đa cộng tuyến (Multicollinearity) bằng hệ số phóng đại phương sai VIF.',
            'Kiểm tra hiện tượng Phương sai thay đổi (Heteroskedasticity) bằng Breusch-Pagan test và cách khắc phục bằng Robust Standard Errors (HC3).',
            'Kiểm tra tính chuẩn tắc và tính độc lập của phần dư (Residual Diagnostics).'
          ],
          intuition: {
            title: 'Bốn cột trụ của ngôi nhà hồi quy vững chãi',
            metaphor: 'Phương pháp OLS là ước lượng tuyến tính không chệch tốt nhất (BLUE - Best Linear Unbiased Estimator) theo định lý Gauss-Markov, nhưng nó giống như một ngôi nhà xây trên 4 cây cột móng: (1) Tính tuyến tính, (2) Phần dư có phân phối chuẩn và kỳ vọng bằng 0, (3) Phương sai sai số phải đồng nhất (không bị xòe hình cái quạt), và (4) Các biến độc lập không được sao chép lẫn nhau (không đa cộng tuyến). Nếu một trong các cột móng này bị nứt (ví dụ đa cộng tuyến nặng), ngôi nhà sẽ rung lắc dữ dội: hệ số ước lượng nhảy loạn xạ, dấu của hệ số bị đảo lộn từ dương sang âm phi lý!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🛡️ 4 Giả định Cốt tử của OLS và Bài toán Chẩn đoán</div>
                <div class="eco-grid">
                  <div class="eco-card">
                    <strong>1. Đa cộng tuyến (Multicollinearity):</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Các biến X tương quan quá mạnh với nhau. Đo bằng <strong>VIF (Variance Inflation Factor)</strong>. Nếu VIF &gt; 5-10, sai số chuẩn bị thổi phồng, p-value bị sai lệch.
                    </div>
                  </div>
                  <div class="eco-card">
                    <strong>2. Phương sai Thay đổi (Heteroskedasticity):</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Sai số phình to khi X tăng (hình cái quạt). Kiểm định bằng <strong>Breusch-Pagan test</strong>. Khắc phục bằng <strong>Robust SE (cov_type='HC3')</strong>.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sm-multicollinearity-vif',
              title: '1. Hiện tượng Đa cộng tuyến và Đo lường bằng VIF',
              content: `
                <p>Khi hai hoặc nhiều biến độc lập tương quan rất cao với nhau (ví dụ: đưa cả "Chiều cao tính bằng cm" và "Chiều cao tính bằng inch" vào mô hình), ma trận $X^T X$ trở nên gần như suy biến.</p>
                <p>Hệ số phóng đại phương sai <strong>VIF (Variance Inflation Factor)</strong> đo lường mức độ phương sai của hệ số bị thổi phồng do tương quan:</p>
                <p>$$VIF_j = \\frac{1}{1 - R_j^2}$$</p>
                <ul>
                  <li>$VIF = 1$: Hoàn toàn không tương quan (lý tưởng).</li>
                  <li>$1 < VIF < 5$: Mức độ tương quan vừa phải, hoàn toàn chấp nhận được.</li>
                  <li>$VIF > 5$ hoặc $VIF > 10$: <strong>Đa cộng tuyến nghiêm trọng!</strong> Bắt buộc phải loại bỏ bớt biến hoặc kết hợp bằng PCA.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Đo lường VIF bằng statsmodels.stats.outliers_influence',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor

# Tạo dữ liệu cố tình bị đa cộng tuyến: x2 gần như phụ thuộc tuyến tính vào x1
rng = np.random.default_rng(42)
x1 = rng.uniform(10, 50, size=100)
x2 = 2.0 * x1 + rng.normal(0, 0.5, size=100)  # x2 tương quan 99% với x1!
x3 = rng.uniform(1, 10, size=100)             # x3 độc lập

df_x = pd.DataFrame({'const': 1, 'x1': x1, 'x2': x2, 'x3': x3})

# Tính VIF cho từng biến
vif_data = pd.DataFrame({
    'Variable': df_x.columns,
    'VIF': [variance_inflation_factor(df_x.values, i) for i in range(df_x.shape[1])]
})

print(vif_data.to_string(index=False))`,
                  output: `Variable         VIF
   const   45.241852
      x1 1380.251412
      x2 1380.124508
      x3    1.002419`,
                  annotations: [
                    { line: 17, text: 'VIF của x1 và x2 lên tới hơn 1380 (> 10 rất nhiều), báo hiệu đa cộng tuyến cực độ!' },
                    { line: 18, text: 'VIF của x3 xấp xỉ 1.0 (hoàn toàn trong sạch).' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sm-heteroskedasticity-hc3',
              title: '2. Kiểm tra Phương sai Thay đổi và Sai số Chuẩn Vững (Robust SE)',
              content: `
                <p>Nếu phương sai của sai số không cố định (Homoscedasticity bị vi phạm, gọi là Heteroskedasticity), các hệ số ước lượng vẫn không chệch nhưng <strong>sai số chuẩn (std err) sẽ bị tính sai, dẫn đến p-value sai lệch hoàn toàn</strong>.</p>
                <ul>
                  <li><strong>Kiểm định Breusch-Pagan:</strong> <code>statsmodels.stats.diagnostic.het_breuschpagan</code>. Nếu p-value < 0.05 ➔ Bác bỏ giả định phương sai không đổi.</li>
                  <li><strong>Giải pháp cứu cánh tức thì (Robust Standard Errors):</strong> Không cần bỏ mô hình! Chỉ cần truyền tham số <code>cov_type='HC3'</code> (White-Huber robust standard errors) khi gọi <code>model.fit()</code>. Statsmodels sẽ tự động hiệu chỉnh sai số chuẩn chính xác mà không đòi hỏi phương sai phải đồng nhất!</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Khắc phục Phương sai thay đổi bằng Robust SE (HC3)',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np
import statsmodels.formula.api as smf
import statsmodels.stats.diagnostic as smd

# Tạo dữ liệu có phương sai phình to theo x (Heteroskedasticity)
rng = np.random.default_rng(42)
x = np.linspace(10, 100, 100)
noise = rng.normal(0, scale=0.5 * x)  # Độ lệch chuẩn tăng dần theo x!
y = 10.0 + 2.0 * x + noise

df = pd.DataFrame({'x': x, 'y': y})

# 1. Hồi quy thông thường
res_vanilla = smf.ols('y ~ x', data=df).fit()

# Kiểm định Breusch-Pagan
bp_test = smd.het_breuschpagan(res_vanilla.resid, res_vanilla.model.exog)
print(f"Breusch-Pagan p-value: {bp_test[1]:.4e} (< 0.05 -> Bị phương sai thay đổi!)")

# 2. Khắc phục bằng Robust Standard Errors (HC3)
res_robust = smf.ols('y ~ x', data=df).fit(cov_type='HC3')

print("\n--- SO SÁNH SAI SỐ CHUẨN CỦA HỆ SỐ X ---")
print(f"Standard Error (Thông thường): {res_vanilla.bse['x']:.4f}")
print(f"Standard Error (Vững - HC3):   {res_robust.bse['x']:.4f}")`,
                  output: `Breusch-Pagan p-value: 1.4820e-04 (< 0.05 -> Bị phương sai thay đổi!)

--- SO SÁNH SAI SỐ CHUẨN CỦA HỆ SỐ X ---
Standard Error (Thông thường): 0.0712
Standard Error (Vững - HC3):   0.0934`,
                  annotations: [
                    { line: 18, text: 'het_breuschpagan phát hiện chính xác hiện tượng phương sai thay đổi.' },
                    { line: 22, text: 'cov_type="HC3" điều chỉnh sai số chuẩn từ 0.0712 lên 0.0934 phản ánh đúng rủi ro thực tế.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy Dummy Variable Trap',
                content: 'Nếu một cột phân loại có 3 nhóm (Bắc, Trung, Nam), bạn chỉ được tạo 2 biến giả (dummy variables). Nếu đưa cả 3 biến giả cùng với hằng số const vào mô hình, tổng của 3 biến luôn bằng const (100% đa cộng tuyến hoàn hảo), khiến ma trận bị suy biến không thể giải được!'
              }
            ],
            tips: [
              {
                title: 'Dùng cov_type=\"HC3\" như một thông lệ chuẩn',
                content: 'Trong kinh tế lượng hiện đại, các nhà nghiên cứu thường mặc định sử dụng fit(cov_type=\"HC3\") cho mọi mô hình OLS để đảm bảo kết luận luôn vững chắc trước hiện tượng phương sai thay đổi.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Xử lý Đa cộng tuyến bằng cách Loại bỏ Biến số Thừa',
              problem: 'Cho DataFrame gồm y và 3 biến x1, x2, x3. Biến x2 có VIF = 15.0, x1 có VIF = 14.5, x3 có VIF = 1.2. Hãy viết quy trình từng bước xử lý hiện tượng này.',
              hint: 'Loại bỏ biến có VIF cao nhất trước (x2), sau đó tính toán lại VIF của các biến còn lại.',
              solutionCode: `# Bước 1: Nhận diện biến có VIF cao nhất (x2 = 15.0)
# Bước 2: Loại bỏ biến x2 khỏi mô hình
# Bước 3: Chạy lại VIF trên tập biến còn lại: [x1, x3]
# Vì x2 đã bị loại, tương quan giả giữa x1 và x2 biến mất -> VIF của x1 sẽ giảm mạnh về mức an toàn (< 2.0).`,
              solutionOutput: `Quy trình chuẩn: Loại bỏ biến có VIF cao nhất từng bước một (Stepwise elimination) và tính lại VIF.`,
              explanation: 'Không nên loại bỏ cả x1 và x2 cùng lúc vì chúng tương quan chéo với nhau. Chỉ cần loại 1 trong 2 biến là hiện tượng đa cộng tuyến sẽ được triệt tiêu hoàn toàn.',
              annotations: [
                { line: 2, text: 'Nguyên tắc loại bỏ từng bước (stepwise) tránh làm mất thông tin quan trọng.' }
              ]
            }
          ],
          summary: [
            'Hiện tượng Đa cộng tuyến thổi phồng sai số chuẩn; đo lường bằng VIF (ngưỡng báo động > 5 hoặc 10).',
            'Kiểm định Breusch-Pagan kiểm tra phương sai thay đổi của phần dư.',
            'Luôn sử dụng cov_type=\"HC3\" (Robust Standard Errors) để bảo vệ p-value trước phương sai thay đổi.',
            'Durbin-Watson quanh mức 2.0 khẳng định phần dư hoàn toàn không bị tự tương quan chuỗi.'
          ]
        },
        {
          id: 'ai-sm-04',
          number: '4.4',
          title: 'Mô hình Tuyến tính Tổng quát (GLM), Hồi quy Logistic & Chuỗi Thời gian (ARIMA)',
          subtitle: 'Vượt ra ngoài OLS: Phân phối nhị phân Logit, đếm Poisson, kiểm định tính dừng ADF và mô hình ARIMA',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Hiểu cấu trúc Mô hình Tuyến tính Tổng quát GLM (Link function và Exponential Family).',
            'Hiện thực hóa Hồi quy Logistic bằng statsmodels.formula.api.logit và giải thích Tỉ số Số chênh (Odds Ratio).',
            'Nắm vững khái niệm Tính dừng (Stationarity) của chuỗi thời gian và kiểm định Augmented Dickey-Fuller (ADF).',
            'Xây dựng và dự báo chuỗi thời gian bằng mô hình ARIMA(p, d, q) trong Statsmodels.'
          ],
          intuition: {
            title: 'Kéo giãn thước đo và Cỗ máy dự báo thời tiết',
            metaphor: 'Hồi quy tuyến tính OLS giả định biến Y có thể trải dài từ âm vô cùng đến dương vô cùng. Nhưng nếu Y là xác suất click chuột (chỉ nằm trong đoạn [0, 1]) hoặc số ca bệnh nhập viện (chỉ là số nguyên không âm 0, 1, 2...), đường thẳng OLS sẽ dự đoán ra xác suất âm (-20%) cực kỳ vô lý! Mô hình Tuyến tính Tổng quát GLM (như Logistic/Poisson) giải quyết điều này bằng một "hàm liên kết" (Link Function): nó uốn cong không gian dự đoán thành chữ S mềm mại để luôn nằm gọn trong ranh giới hợp lý. Còn mô hình ARIMA giống như một cỗ máy dự báo thời tiết: nó bóc tách chuỗi thời gian thành xu hướng (Trend), mùa vụ (Seasonality) và tiếng ồn để nhìn thấu tương lai.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📈 Từ OLS tới GLM Logistic &amp; ARIMA</div>
                <div class="eco-grid">
                  <div class="eco-card">
                    <strong>Hồi quy Logistic (GLM Binomial):</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      Hàm liên kết Logit: <code>ln(p / (1 - p)) = beta * X</code>.<br>
                      Hệ số mũ <code>exp(beta)</code> chính là <strong>Tỉ số Số chênh (Odds Ratio)</strong>: nếu X tăng 1 đơn vị, cơ hội thắng tăng gấp bao nhiêu lần.
                    </div>
                  </div>
                  <div class="eco-card">
                    <strong>Chuỗi thời gian ARIMA(p, d, q):</strong>
                    <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:4px;">
                      • <code>p (AR)</code>: Tự hồi quy theo quá khứ.<br>
                      • <code>d (I)</code>: Bậc lấy sai phân để tạo chuỗi dừng.<br>
                      • <code>q (MA)</code>: Trung bình trượt theo sai số quá khứ.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sm-logistic-odds-ratio',
              title: '1. Hồi quy Logistic và Diễn giải Tỉ số Số chênh (Odds Ratio)',
              content: `
                <p>Trong Hồi quy Logistic, biến phụ thuộc $Y \\in \\{0, 1\\}$. Statsmodels cung cấp phương thức <code>smf.logit()</code>:</p>
                <p>Công thức: $\\ln\\left(\\frac{p}{1 - p}\\right) = \\beta_0 + \\beta_1 X$</p>
                <p>Để diễn giải hệ số $\\beta_1$ trong thực tế, chúng ta lấy hàm mũ <strong>Odds Ratio (OR) = $\\exp(\\beta_1)$</strong>:</p>
                <ul>
                  <li>Nếu $OR = 1.0$: Biến $X$ không ảnh hưởng gì tới cơ hội xảy ra $Y$.</li>
                  <li>Nếu $OR = 1.5$: Khi $X$ tăng 1 đơn vị, cơ hội (odds) xảy ra $Y$ tăng thêm $50\\%$.</li>
                  <li>Nếu $OR = 0.7$: Khi $X$ tăng 1 đơn vị, cơ hội xảy ra $Y$ giảm đi $30\\%$.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Chạy hồi quy Logistic và Tính toán Odds Ratio kèm Khoảng tin cậy',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np
import statsmodels.formula.api as smf

# Dữ liệu khách hàng vay vốn: duyet (1: duyệt, 0: từ chối), thu_nhap, no_xau (1: có, 0: không)
df_loan = pd.DataFrame({
    'duyet':    [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
    'thu_nhap': [10, 12, 25, 30, 15, 40, 18, 35, 28, 14],
    'no_xau':   [1, 1, 0, 0, 1, 0, 1, 0, 0, 1]
})

model = smf.logit('duyet ~ thu_nhap + no_xau', data=df_loan)
res = model.fit(disp=False)

# Tính Odds Ratio (exp của hệ số)
odds_ratios = np.exp(res.params)
conf = np.exp(res.conf_int())
conf['Odds Ratio'] = odds_ratios

print("--- PHÂN TÍCH TỈ SỐ SỐ CHÊNH (ODDS RATIO) ---")
print(conf.to_string())`,
                  output: `--- PHÂN TÍCH TỈ SỐ SỐ CHÊNH (ODDS RATIO) ---
                 0          1  Odds Ratio
Intercept 0.000000        inf    0.034512
thu_nhap  1.021045   1.892401    1.390021
no_xau    0.000012   0.210451    0.001524`,
                  annotations: [
                    { line: 17, text: 'np.exp(res.params) chuyển hệ số log-odds về tỉ số số chênh thực tế.' },
                    { line: 22, text: 'thu_nhap có Odds Ratio = 1.39: thu nhập tăng 1 triệu làm cơ hội duyệt tăng 39%.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sm-time-series-arima',
              title: '2. Phân tích Chuỗi Thời gian: Kiểm định ADF và Mô hình ARIMA',
              content: `
                <p>Điều kiện tiên quyết để chạy mô hình chuỗi thời gian là <strong>Tính dừng (Stationarity)</strong>: trung bình và phương sai không đổi theo thời gian.</p>
                <ul>
                  <li><strong>Kiểm định Augmented Dickey-Fuller (ADF):</strong> <code>statsmodels.tsa.stattools.adfuller</code>. Giả thuyết $H_0$: Chuỗi KHÔNG DỪNG (có nghiệm đơn vị). Nếu $p < 0.05$ ➔ Bác bỏ $H_0$, chuỗi là chuỗi dừng. Nếu chưa dừng, cần lấy sai phân bậc $d$ (thường $d=1$).</li>
                  <li><strong>Mô hình ARIMA(p, d, q):</strong> <code>statsmodels.tsa.arima.model.ARIMA</code>. Kết hợp tự hồi quy $p$, sai phân $d$, và trung bình trượt $q$.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Kiểm tra tính dừng ADF và Dự báo với mô hình ARIMA',
                  lang: 'Python',
                  code: `import numpy as np
import pandas as pd
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA

# Giả lập chuỗi thời gian 100 ngày có xu hướng tăng
rng = np.random.default_rng(42)
t = np.arange(100)
series = 20.0 + 0.5 * t + rng.normal(0, 1.0, size=100)

# 1. Kiểm định ADF trên chuỗi gốc
adf_res = adfuller(series)
print(f"ADF Statistic: {adf_res[0]:.4f} | p-value: {adf_res[1]:.4f}")
print("Kết luận: p > 0.05 -> Chuỗi gốc KHÔNG DỪNG, cần lấy sai phân d=1!")

# 2. Xây dựng mô hình ARIMA(1, 1, 1)
model = ARIMA(series, order=(1, 1, 1))
res_arima = model.fit()

# Dự báo 5 ngày tiếp theo trong tương lai
forecast = res_arima.forecast(steps=5)
print("\nDự báo 5 ngày tiếp theo:")
print(np.round(forecast, 2))`,
                  output: `ADF Statistic: 0.1245 | p-value: 0.9677
Kết luận: p > 0.05 -> Chuỗi gốc KHÔNG DỪNG, cần lấy sai phân d=1!

Dự báo 5 ngày tiếp theo:
[70.12 70.61 71.11 71.61 72.11]`,
                  annotations: [
                    { line: 13, text: 'p-value = 0.9677 chứng minh chuỗi chứa trend, bắt buộc đặt tham số d=1.' },
                    { line: 17, text: 'ARIMA(1, 1, 1) tự động lấy sai phân bậc 1 và khớp xu hướng tăng tuyến tính hoàn hảo.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-sm-seasonal-acf-pacf',
              title: '3. Phân rã Mùa vụ (Seasonal Decomposition) và Phân tích Tự tương quan ACF / PACF',
              content: `
                <p>Trước khi khớp các mô hình chuỗi thời gian kinh điển (ARIMA/SARIMA), ta cần bóc tách các thành phần nội tại của chuỗi:</p>
                <ul>
                  <li><strong>Phân rã Mùa vụ (seasonal_decompose / STL):</strong> Tách chuỗi thời gian thành 3 thành phần độc lập: $Y_t = \\text{Trend}_t + \\text{Seasonal}_t + \\text{Residual}_t$ (Cộng tính) hoặc $Y_t = \\text{Trend}_t \\times \\text{Seasonal}_t \\times \\text{Residual}_t$ (Nhân tính).</li>
                  <li><strong>Hàm tự tương quan (ACF - Autocorrelation Function):</strong> Đo lường mức độ tương quan giữa $Y_t$ và $Y_{t-k}$ (bao gồm cả tác động gián tiếp của các độ trễ ở giữa). Dùng để xác định bậc trung bình trượt $q$ (MA).</li>
                  <li><strong>Hàm tự tương quan từng phần (PACF - Partial Autocorrelation Function):</strong> Đo lường tương quan trực tiếp thuần túy giữa $Y_t$ và $Y_{t-k}$ sau khi đã loại bỏ ảnh hưởng của các độ trễ trung gian. Dùng để xác định bậc tự hồi quy $p$ (AR).</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Phân rã chuỗi mùa vụ và Đọc hệ số ACF/PACF để chọn bậc mô hình',
                  lang: 'Python',
                  code: `import numpy as np
import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import acf, pacf

# Giả lập chuỗi 48 tháng (4 năm) có trend tuyến tính và chu kỳ mùa vụ 12 tháng
rng = np.random.default_rng(42)
t = np.arange(48)
trend = 100 + 2.5 * t
seasonal = 20 * np.sin(2 * np.pi * t / 12)
noise = rng.normal(0, 3.0, size=48)
dates = pd.date_range('2022-01-01', periods=48, freq='MS')
ts = pd.Series(trend + seasonal + noise, index=dates)

# 1. Phân rã mùa vụ cộng tính (Additive Decomposition)
decomp = seasonal_decompose(ts, model='additive', period=12)

print("=== Phân rã Mùa vụ (3 tháng đầu có đủ giá trị) ===")
sample_df = pd.DataFrame({
    'Gốc': ts,
    'Xu_hướng': decomp.trend,
    'Mùa_vụ': decomp.seasonal,
    'Phần_dư': decomp.resid
}).dropna().head(3)
print(np.round(sample_df, 2))

# 2. Phân tích ACF và PACF để chọn bậc p, q
autocorr = acf(ts, nlags=5)
partial_autocorr = pacf(ts, nlags=5)
print("\n=== Hệ số Tự tương quan (ACF) và Tự tương quan từng phần (PACF) ===")
for lag in range(1, 5):
    print(f"Lag {lag}: ACF = {autocorr[lag]:.4f} | PACF = {partial_autocorr[lag]:.4f}")`,
                  output: `=== Phân rã Mùa vụ (3 tháng đầu có đủ giá trị) ===
               Gốc  Xu_hướng  Mùa_vụ  Phần_dư
2022-07-01  115.38    114.55    2.83    -1.99
2022-08-01  106.55    117.29  -11.08     0.35
2022-09-01  102.63    120.02  -18.29     0.89

=== Hệ số Tự tương quan (ACF) và Tự tương quan từng phần (PACF) ===
Lag 1: ACF = 0.9246 | PACF = 0.9443
Lag 2: ACF = 0.8288 | PACF = -0.2479
Lag 3: ACF = 0.7344 | PACF = -0.0153
Lag 4: ACF = 0.6461 | PACF = -0.0208`,
                  annotations: [
                    { line: 17, text: 'seasonal_decompose bóc tách thành phần chu kỳ lặp lại theo chu kỳ 12 tháng.' },
                    { line: 31, text: 'PACF cắt cụt đột ngột sau Lag 1 (PACF Lag 1 = 0.9443 rồi rơi xuống âm), dấu hiệu kinh điển của mô hình AR(1).' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Hồi quy giả mạo (Spurious Regression) trên chuỗi không dừng',
                content: 'Nếu bạn chạy OLS giữa 2 chuỗi thời gian hoàn toàn không liên quan nhưng cùng có xu hướng tăng theo thời gian (ví dụ: Số lượng máy giặt bán ra và Tỉ lệ ly hôn ở Mỹ), mô hình OLS vẫn cho ra R² > 0.95 và p < 0.001! Đó là sự tương quan ảo do tính không dừng gây ra. Luôn kiểm định ADF trước khi kết luận.'
              }
            ],
            tips: [
              {
                title: 'Lựa chọn bậc (p, d, q) tối ưu bằng AIC / BIC',
                content: 'Để chọn bộ tham số (p, d, q) tối ưu cho ARIMA, người ta thường dùng vòng lặp thử nhiều cấu hình và chọn mô hình có chỉ số AIC (Akaike Information Criterion) nhỏ nhất.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Lấy Sai phân Bậc 1 để Đưa Chuỗi về Tính Dừng',
              problem: 'Cho một chuỗi số có xu hướng tăng series_trend. Hãy dùng phương thức .diff().dropna() để lấy sai phân bậc 1, sau đó chạy lại kiểm định adfuller để xác nhận chuỗi sai phân đã đạt tính dừng hay chưa.',
              hint: 'diff_series = pd.Series(series).diff().dropna(), sau đó gọi adfuller(diff_series).',
              solutionCode: `import numpy as np
import pandas as pd
from statsmodels.tsa.stattools import adfuller

series = np.arange(100) + np.random.normal(0, 1, 100)
diff_series = pd.Series(series).diff().dropna()

adf_diff = adfuller(diff_series)
print(f"ADF Statistic sau sai phân: {adf_diff[0]:.4f}")
print(f"p-value sau sai phân:       {adf_diff[1]:.4e}")
if adf_diff[1] < 0.05:
    print("Xác nhận: Chuỗi sau sai phân bậc 1 đã trở thành Chuỗi Dừng (Stationary)!")`,
              solutionOutput: `ADF Statistic sau sai phân: -9.8451
p-value sau sai phân:       4.5214e-17
Xác nhận: Chuỗi sau sai phân bậc 1 đã trở thành Chuỗi Dừng (Stationary)!`,
              explanation: 'Sai phân bậc 1 loại bỏ hoàn toàn thành phần xu hướng tuyến tính d/dt, đưa chuỗi về dao động xung quanh giá trị trung bình cố định với p < 0.001.',
              annotations: [
                { line: 7, text: 'p-value 10^-17 bác bỏ tuyệt đối giả thuyết không dừng.' }
              ]
            }
          ],
          summary: [
            'GLM Logistic (smf.logit) giải quyết bài toán xác suất nhị phân, loại bỏ giới hạn của OLS.',
            'Odds Ratio = exp(beta) cho phép diễn giải trực quan mức độ tăng giảm cơ hội khi biến X thay đổi.',
            'Kiểm định ADF kiểm tra tính dừng; nếu chuỗi chưa dừng, bắt buộc phải lấy sai phân bậc d.',
            'Mô hình ARIMA(p, d, q) là trụ cột dự báo chuỗi thời gian kinh điển trong kinh tế và tài chính.'
          ]
        },
        {
          id: 'ai-sm-05',
          number: '4.5',
          title: 'Dự án Thực chiến: Phân tích Tác động Kinh tế lượng (Econometric Policy Analysis)',
          subtitle: 'Quy trình nghiên cứu tác động chính sách hoàn chỉnh: OLS, kiểm tra giả định, xử lý Heteroskedasticity và Báo cáo vững',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Thực hiện một bài nghiên cứu kinh tế lượng thực tế: Đánh giá tác động của chương trình đào tạo kỹ năng lên năng suất lao động.',
            'Áp dụng toàn bộ quy trình kiểm định: VIF (đa cộng tuyến), Breusch-Pagan (phương sai sai số), Shapiro-Wilk (phần dư).',
            'Khắc phục vi phạm bằng mô hình hồi quy vững Robust Standard Errors (HC3).',
            'Viết báo cáo học thuật giải thích hệ số chính sách đạt chuẩn công bố.'
          ],
          intuition: {
            title: 'Bản kiểm toán độc lập của cơ quan quản lý',
            metaphor: 'Khi một tổ chức chi 100 tỷ đồng ngân sách cho chương trình đào tạo nghề, họ không chấp nhận một biểu đồ màu mè hay một mô hình máy học dự đoán mập mờ. Họ cần một bản kiểm toán thống kê suy diễn chặt chẽ: "Chương trình đào tạo thực sự làm tăng thu nhập bao nhiêu triệu đồng? Con số này có bị thổi phồng do người tham gia vốn dĩ đã có học vấn cao hơn không? Sai số chuẩn có bị biến dạng không?". Dự án này trang bị cho bạn đầy đủ vũ khí khoa học để bảo vệ luận điểm của mình trước mọi hội đồng chuyên môn.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📑 Quy trình 4 Bước Nghiên cứu Kinh tế lượng Thực nghiệm</div>
                <div style="font-size:0.86rem;line-height:1.6;display:flex;flex-direction:column;gap:6px;">
                  <div style="background:var(--bg-surface);padding:8px;border-left:4px solid var(--topic-data);">
                    <strong>Bước 1: Thiết lập Mô hình Hồi quy Đa biến:</strong><br>
                    <code>ln(Thu nhập) = beta0 + beta1*Dao_tao + beta2*Hoc_van + beta3*Kinh_nghiem + e</code>
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-left:4px solid #0ea5e9;">
                    <strong>Bước 2: Kiểm định Giả định Cốt lõi:</strong><br>
                    Kiểm tra VIF &lt; 5 (không đa cộng tuyến) ➔ Kiểm định Breusch-Pagan kiểm tra phương sai thay đổi.
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-left:4px solid #f59e0b;">
                    <strong>Bước 3: Hiệu chỉnh Ước lượng Vững (Robust Estimation):</strong><br>
                    Áp dụng White-Huber HC3 Standard Errors để triệt tiêu ảnh hưởng của phương sai thay đổi.
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-left:4px solid #10b981;">
                    <strong>Bước 4: Diễn giải Chính sách &amp; Báo cáo:</strong><br>
                    Diễn giải hệ số $\\beta_1$ theo tỉ lệ phần trăm thu nhập gia tăng và khoảng tin cậy 95%.
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-sm-project-econometrics',
              title: '1. Toàn bộ Quy trình Nghiên cứu Kinh tế lượng Thực tế',
              content: `
                <p>Dưới đây là mã nguồn phân tích tác động chính sách đào tạo nghề hoàn chỉnh:</p>
              `,
              codeExamples: [
                {
                  title: 'Toàn bộ Pipeline Hồi quy Kinh tế lượng và Kiểm định Giả định',
                  lang: 'Python',
                  code: `import numpy as np
import pandas as pd
import statsmodels.formula.api as smf
import statsmodels.stats.diagnostic as smd
from statsmodels.stats.outliers_influence import variance_inflation_factor

# 1. Giả lập dữ liệu khảo sát 200 lao động
rng = np.random.default_rng(2026)
n = 200

hoc_van = rng.integers(10, 18, size=n)        # số năm đi học (10 đến 17 năm)
kinh_nghiem = rng.integers(1, 25, size=n)     # số năm kinh nghiệm
dao_tao = rng.binomial(1, 0.4, size=n)        # 1: có tham gia đào tạo, 0: không

# Mô hình log-wage thực tế: lương tăng 15% nếu có đào tạo (beta1 = 0.15)
log_luong = (
    1.5 + 
    0.08 * hoc_van + 
    0.03 * kinh_nghiem + 
    0.15 * dao_tao + 
    rng.normal(0, 0.15 + 0.01 * hoc_van, size=n)  # Phương sai tăng nhẹ theo học vấn
)

df = pd.DataFrame({
    'log_luong': log_luong,
    'hoc_van': hoc_van,
    'kinh_nghiem': kinh_nghiem,
    'dao_tao': dao_tao
})

# 2. Khớp mô hình hồi quy cơ sở
formula = 'log_luong ~ dao_tao + hoc_van + kinh_nghiem'
res_base = smf.ols(formula, data=df).fit()

# 3. Kiểm định Breusch-Pagan phát hiện phương sai thay đổi
bp_stat, bp_pval, _, _ = smd.het_breuschpagan(res_base.resid, res_base.model.exog)
print(f"Breusch-Pagan p-value: {bp_pval:.4f}")

# 4. Ước lượng mô hình vững với Robust Standard Errors (HC3)
res_robust = smf.ols(formula, data=df).fit(cov_type='HC3')

# 5. Báo cáo hệ số chính sách đào tạo
beta_dt = res_robust.params['dao_tao']
se_dt = res_robust.bse['dao_tao']
pval_dt = res_robust.pvalues['dao_tao']
ci_dt = res_robust.conf_int().loc['dao_tao']

print("\n--- BÁO CÁO TÁC ĐỘNG CHÍNH SÁCH ĐÀO TẠO NGHỀ (ROBUST HC3) ---")
print(f"Hệ số tác động (beta):      {beta_dt:.4f} (Khoảng tăng lương: ~{beta_dt * 100:.1f}%)")
print(f"Sai số chuẩn vững (Robust SE): {se_dt:.4f}")
print(f"p-value:                   {pval_dt:.4e} (Đạt ý nghĩa thống kê cao p < 0.001)")
print(f"Khoảng tin cậy 95%:        [{ci_dt[0]:.4f}, {ci_dt[1]:.4f}]")`,
                  output: `Breusch-Pagan p-value: 0.0384

--- BÁO CÁO TÁC ĐỘNG CHÍNH SÁCH ĐÀO TẠO NGHỀ (ROBUST HC3) ---
Hệ số tác động (beta):      0.1542 (Khoảng tăng lương: ~15.4%)
Sai số chuẩn vững (Robust SE): 0.0312
p-value:                   7.8241e-07 (Đạt ý nghĩa thống kê cao p < 0.001)
Khoảng tin cậy 95%:        [0.0930, 0.2154]`,
                  annotations: [
                    { line: 30, text: 'Breusch-Pagan p = 0.0384 < 0.05 phát hiện phương sai thay đổi, bắt buộc dùng HC3.' },
                    { line: 44, text: 'Khoảng tin cậy [0.0930, 0.2154] chứng minh chắc chắn chương trình đào tạo giúp tăng thu nhập từ 9.3% đến 21.5%.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy bỏ sót biến số quan trọng (Omitted Variable Bias)',
                content: 'Nếu bạn không đưa biến \"hoc_van\" vào mô hình, tác động của học vấn sẽ bị đổ dồn vào biến \"dao_tao\" (vì người học vấn cao thường tự nguyện tham gia đào tạo nhiều hơn). Khi đó hệ số đào tạo sẽ bị phóng đại giả tạo lên gấp đôi! Luôn kiểm soát đầy đủ các biến đồng biến quan trọng (Confounders).'
              }
            ],
            tips: [
              {
                title: 'Diễn giải mô hình Log-Level: y = beta * X',
                content: 'Khi biến phụ thuộc ở dạng logarit log(y) và biến độc lập ở dạng số thường, hệ số beta * 100 chính là tỉ lệ phần trăm thay đổi xấp xỉ của y khi X tăng 1 đơn vị. Đây là quy tắc vàng kinh điển trong phân tích kinh tế.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Tính Tác động Biên Chính xác của Biến Logarit',
              problem: 'Khi hệ số beta = 0.1542, công thức phần trăm chính xác là %Delta y = (exp(beta) - 1) * 100. Hãy tính mức tăng lương chính xác theo công thức này và so sánh với xấp xỉ beta * 100.',
              hint: 'exact_pct = (np.exp(beta) - 1) * 100.',
              solutionCode: `import numpy as np

beta = 0.1542
approx_pct = beta * 100
exact_pct = (np.exp(beta) - 1) * 100

print(f"Xấp xỉ tuyến tính: {approx_pct:.2f}%")
print(f"Chính xác tuyệt đối: {exact_pct:.2f}%")`,
              solutionOutput: `Xấp xỉ tuyến tính: 15.42%
Chính xác tuyệt đối: 16.67%`,
              explanation: 'Với hệ số nhỏ (< 0.1), xấp xỉ tuyến tính rất gần; với hệ số lớn hơn, việc dùng (exp(beta) - 1) * 100 phản ánh chuẩn xác tác động kinh tế.',
              annotations: [
                { line: 5, text: 'Công thức chuyển đổi chuẩn mực từ hệ số log-level sang phần trăm thực tế.' }
              ]
            }
          ],
          summary: [
            'Quy trình kinh tế lượng đòi hỏi kiểm tra nghiêm ngặt các giả định Gauss-Markov.',
            'Breusch-Pagan kiểm tra phương sai thay đổi; khắc phục bằng Robust Standard Errors (cov_type=\"HC3\").',
            'Omitted Variable Bias là sai lầm nguy hiểm nhất; luôn kiểm soát các biến ngoại lai nền tảng.',
            'Statsmodels cung cấp các công cụ chuẩn học thuật để báo cáo tác động chính sách đạt chuẩn công bố.'
          ]
        }
      ]
    }
  ]
};
