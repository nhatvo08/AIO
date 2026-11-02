/**
 * Dữ liệu Phụ lục & Bản đồ Hệ sinh thái Python Data & AI
 * Tác giả: Senior Data & ML Engineer
 */

window.DATA_AI_REFERENCE_DATA = {
  id: 'part-ai-ref',
  number: 'Tra cứu & Tổng quan',
  title: 'Bản đồ Hệ sinh thái & Định hướng',
  level: 'Tra cứu',
  badge: 'Bản đồ',
  description: 'Toàn cảnh 12 thư viện Python cho Dữ liệu và AI: quan hệ phụ thuộc, kiến trúc các tầng, ma trận so sánh và cẩm nang lựa chọn công nghệ đúng ngữ cảnh.',
  lessons: [
    {
      id: 'data-ai-ecosystem-map',
      number: 'Map 1',
      title: 'Bản đồ Hệ sinh thái Thư viện Python cho Dữ liệu & AI',
      subtitle: 'Toàn cảnh 12 thư viện, quan hệ phụ thuộc nền tảng, kiến trúc 5 tầng và ma trận quyết định công nghệ',
      level: 'Tra cứu',
      duration: '30 phút',
      objectives: [
        'Nắm trọn vẹn bức tranh tổng thể 12 thư viện Python Data/AI và lý do chúng cùng tồn tại.',
        'Hiểu rõ quan hệ phụ thuộc: NumPy và Apache Arrow đóng vai trò xương sống dữ liệu bên dưới ra sao.',
        'Sử dụng ma trận quyết định (Decision Matrix) để chọn đúng công cụ theo quy mô dữ liệu và bài toán.',
        'Nắm vững 4 lộ trình học tập và làm việc: Data Analyst, Data Engineer, Data Scientist và AI Engineer.'
      ],
      intuition: {
        title: 'Thành phố Thư viện và Các tầng Hạ tầng Dữ liệu',
        metaphor: 'Hãy hình dung hệ sinh thái Python cho Dữ liệu và AI giống như một đại đô thị hiện đại. Ở dưới lòng đất là hạ tầng móng cọc bê tông cốt thép siêu bền (NumPy ndarray và Apache Arrow). Các tòa nhà dân cư và văn phòng dạng bảng (Pandas, Polars) được xây dựng ngay trên nền móng đó. Những công viên triển lãm nghệ thuật (Matplotlib, Seaborn, Plotly) giúp cư dân ngắm nhìn dữ liệu trực quan sinh động. Những viện nghiên cứu và phòng thí nghiệm (SciPy, Statsmodels, Scikit-learn) giải mã các quy luật tự nhiên và dự đoán tương lai. Và trên đỉnh cao nhất là những nhà máy siêu thông minh (PyTorch, TensorFlow) cùng hệ thống siêu xa lộ phân tán (Dask, PySpark) vận hành những cỗ máy khổng lồ vượt qua giới hạn của một máy tính đơn lẻ.',
        visualHtml: `
          <div class="data-viz-container">
            <div class="data-viz-title">🗺️ Sơ đồ Kiến trúc 5 Tầng Hệ sinh thái Python Data &amp; AI</div>
            <div class="eco-grid">
              <div class="eco-card" style="border-top: 4px solid #10b981;">
                <div class="eco-card-header">
                  <span class="eco-card-title">Tầng 1: Nền tảng Dữ liệu</span>
                  <span class="eco-card-tag">Core Engine</span>
                </div>
                <div class="eco-card-desc">
                  <strong>NumPy (ndarray)</strong>: Bộ nhớ liên tục C-contiguous, vectorization và ufuncs.<br>
                  <strong>Pandas (DataFrame)</strong>: Dữ liệu dạng bảng có nhãn, Index alignment, Split-Apply-Combine.
                </div>
                <div class="eco-card-deps">Xương sống của 95% thư viện khoa học dữ liệu còn lại.</div>
              </div>
              <div class="eco-card" style="border-top: 4px solid #0ea5e9;">
                <div class="eco-card-header">
                  <span class="eco-card-title">Tầng 2: Thống kê &amp; Khoa học</span>
                  <span class="eco-card-tag">Math &amp; Stats</span>
                </div>
                <div class="eco-card-desc">
                  <strong>SciPy</strong>: Giải tích số, tối ưu hóa (optimize), tích phân (integrate), ma trận thưa (sparse).<br>
                  <strong>Statsmodels</strong>: Thống kê suy diễn, kiểm định giả thuyết p-value, OLS summary, chuỗi thời gian ARIMA.
                </div>
                <div class="eco-card-deps">Phụ thuộc trực tiếp vào NumPy và SciPy.</div>
              </div>
              <div class="eco-card" style="border-top: 4px solid #8b5cf6;">
                <div class="eco-card-header">
                  <span class="eco-card-title">Tầng 3: Trực quan hóa</span>
                  <span class="eco-card-tag">Visualization</span>
                </div>
                <div class="eco-card-desc">
                  <strong>Matplotlib</strong>: Kiến trúc OOP Figure/Axes, vẽ đồ thị xuất bản học thuật.<br>
                  <strong>Seaborn</strong>: Thống kê trực quan, dữ liệu long-form, FacetGrid, tự tính khoảng tin cậy.<br>
                  <strong>Plotly &amp; Bokeh</strong>: Đồ thị tương tác Web (hover, zoom, slider, dashboard).
                </div>
                <div class="eco-card-deps">Seaborn xây trên Matplotlib; Plotly xuất cấu trúc JSON.</div>
              </div>
              <div class="eco-card" style="border-top: 4px solid #f59e0b;">
                <div class="eco-card-header">
                  <span class="eco-card-title">Tầng 4: Học máy &amp; AI</span>
                  <span class="eco-card-tag">ML &amp; Deep Learning</span>
                </div>
                <div class="eco-card-desc">
                  <strong>Scikit-learn</strong>: API thống nhất (fit/predict/transform), Pipeline, Classical ML.<br>
                  <strong>PyTorch</strong>: Đồ thị tính toán động autograd, linh hoạt cho R&amp;D và AI hiện đại.<br>
                  <strong>TensorFlow / Keras</strong>: Hệ sinh thái trọn gói từ huấn luyện đến mobile/cloud deployment.
                </div>
                <div class="eco-card-deps">Dùng Tensor tính toán trên phần cứng GPU/TPU qua CUDA.</div>
              </div>
              <div class="eco-card" style="border-top: 4px solid #ef4444;">
                <div class="eco-card-header">
                  <span class="eco-card-title">Tầng 5: Dữ liệu lớn &amp; Phân tán</span>
                  <span class="eco-card-tag">Big Data &amp; Scale</span>
                </div>
                <div class="eco-card-desc">
                  <strong>Polars</strong>: Đa luồng Rust + Apache Arrow cột, Lazy query pushdown, siêu tốc đơn máy.<br>
                  <strong>Dask</strong>: Đồ thị tác vụ phân tán, mở rộng NumPy/Pandas ra nhiều lõi và nhiều máy.<br>
                  <strong>PySpark</strong>: Xử lý cụm phân tán tiêu chuẩn công nghiệp với Catalyst Optimizer &amp; Spark SQL.
                </div>
                <div class="eco-card-deps">Vượt qua giới hạn bộ nhớ RAM vật lý đơn máy tính.</div>
              </div>
            </div>
          </div>
        `
      },
      sections: [
        {
          id: 'sec-ecosystem-overview',
          title: '1. Tại sao Python thống trị thế giới Dữ liệu và Trí tuệ Nhân tạo?',
          content: `
            <p>Python thuần túy vốn là ngôn ngữ thông dịch (interpreted language) có tốc độ thực thi số học tương đối chậm do cơ chế kiểm tra kiểu động (dynamic typing) và khóa thông dịch toàn cục (GIL - Global Interpreter Lock). Tuy nhiên, Python đã trở thành <strong>ngôn ngữ số 1 toàn cầu cho Khoa học Dữ liệu và AI</strong> nhờ một chiến lược kiến trúc thiên tài: <em>"Python làm giao diện điều khiển thanh lịch bên trên, còn phần tính toán nặng nề được đẩy xuống nhân C, C++, Rust và CUDA bên dưới"</em>.</p>
            <p>Hệ sinh thái này không phải một khối đơn lẻ (monolith) mà là tập hợp các thư viện chuyên biệt cao độ, bổ trợ cho nhau qua các tiêu chuẩn bộ nhớ chung (NumPy C-buffer và Apache Arrow Columnar Format).</p>
          `,
          codeExamples: []
        },
        {
          id: 'sec-dependencies',
          title: '2. Bản đồ Quan hệ Phụ thuộc (Dependency Tree)',
          content: `
            <p>Mỗi thư viện trong hệ sinh thái đóng một vai trò được định nghĩa rõ ràng. Hãy quan sát cách các thư viện dựa vào nhau:</p>
            <ul>
              <li><strong>NumPy</strong> là gốc rễ. <code>Pandas</code>, <code>SciPy</code>, <code>Scikit-learn</code>, <code>Matplotlib</code> đều coi mảng NumPy <code>ndarray</code> là đơn vị trao đổi dữ liệu tiêu chuẩn.</li>
              <li><strong>Pandas</strong> xây dựng trên NumPy, bổ sung hệ thống nhãn hàng/cột (Index) và cơ chế căn chỉnh dữ liệu tự động.</li>
              <li><strong>SciPy</strong> kế thừa NumPy, bổ sung các thuật toán giải tích và giải thuật toán học cao cấp mà NumPy không chứa.</li>
              <li><strong>Statsmodels</strong> dựa trên NumPy, SciPy và Pandas để cung cấp các mô hình kiểm định thống kê chuẩn mực theo phong cách ngôn ngữ R.</li>
              <li><strong>Seaborn</strong> nhận DataFrame từ Pandas và vẽ trực tiếp thông qua hệ thống phân cấp Figure/Axes của <strong>Matplotlib</strong>.</li>
              <li><strong>Polars</strong> chọn một con đường hiện đại: không phụ thuộc NumPy mà dựa trên định dạng cột <strong>Apache Arrow</strong> và ngôn ngữ Rust, đem lại tốc độ nhanh hơn Pandas gấp 10-50 lần.</li>
              <li><strong>PyTorch và TensorFlow</strong> định nghĩa kiểu dữ liệu <code>Tensor</code> riêng biệt có khả năng tính toán trên GPU và theo dõi đạo hàm tự động (Autograd), nhưng luôn hỗ trợ chuyển đổi không tốn chi phí (Zero-copy) với NumPy.</li>
            </ul>
          `,
          codeExamples: [
            {
              title: 'Kiểm tra phiên bản các thư viện lõi trong môi trường thực tế',
              lang: 'Python',
              code: `import numpy as np
import pandas as pd
import scipy
import matplotlib
import sklearn
import torch

print(f"NumPy version:      {np.__version__}")
print(f"Pandas version:     {pd.__version__}")
print(f"SciPy version:      {scipy.__version__}")
print(f"Matplotlib version: {matplotlib.__version__}")
print(f"Scikit-learn:       {sklearn.__version__}")
print(f"PyTorch version:    {torch.__version__}")
print(f"PyTorch CUDA:       {torch.cuda.is_available()}")`,
              output: `NumPy version:      2.5.4
Pandas version:     2.2.3
SciPy version:      1.15.1
Matplotlib version: 3.11.2
Scikit-learn:       1.6.1
PyTorch version:    2.14.1
PyTorch CUDA:       False (Chạy trên CPU)`,
              annotations: [
                { line: 1, text: 'Nạp các thư viện trụ cột tiêu biểu đại diện cho từng tầng hạ tầng.' },
                { line: 14, text: 'torch.cuda.is_available() kiểm tra máy có card đồ họa NVIDIA và driver CUDA tương thích hay không.' }
              ]
            }
          ]
        },
        {
          id: 'sec-decision-matrix',
          title: '3. Ma trận Quyết định Công nghệ: Khi nào nên dùng thư viện nào?',
          content: `
            <p>Một trong những sai lầm lớn nhất của người mới học là dùng "dao mổ trâu để giết gà" (ví dụ dùng PySpark cho file Excel 50MB) hoặc cố chấp ép công cụ quá tải (dùng Pandas đọc file CSV 80GB khiến máy bị sập vì Out-of-Memory). Bảng quyết định dưới đây là kim chỉ nam trong thực tế:</p>
            <div style="overflow-x:auto;">
              <table class="data-compare-table">
                <thead>
                  <tr>
                    <th>Bài toán / Tình huống</th>
                    <th>Công cụ khuyến nghị</th>
                    <th>Lý do chọn</th>
                    <th>Công cụ nên tránh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dữ liệu bảng &lt; 2GB, cần thao tác linh hoạt, làm sạch thô</td>
                    <td><strong>Pandas</strong></td>
                    <td>API phong phú nhất, cộng đồng hỗ trợ lớn nhất thế giới, tích hợp mọi nơi.</td>
                    <td>PySpark (quá cồng kềnh, chi phí khởi tạo JVM cao).</td>
                  </tr>
                  <tr>
                    <td>Dữ liệu bảng 2GB - 50GB trên 1 máy tính đơn</td>
                    <td><strong>Polars</strong></td>
                    <td>Đa luồng Rust, Apache Arrow, cơ chế Lazy Evaluation và Streaming engine không tràn RAM.</td>
                    <td>Pandas (dễ gặp lỗi OOM vì cơ chế copy dữ liệu).</td>
                  </tr>
                  <tr>
                    <td>Dữ liệu bảng &gt; 100GB - nhiều Terabytes trên cụm máy chủ</td>
                    <td><strong>PySpark</strong></td>
                    <td>Tính toán phân tán chịu lỗi cao (fault-tolerant), tối ưu hóa Catalyst DAG trên cluster.</td>
                    <td>Pandas hoặc Polars (bị giới hạn bởi phần cứng 1 máy).</td>
                  </tr>
                  <tr>
                    <td>Cần giải thích hệ số, p-value, khoảng tin cậy của biến</td>
                    <td><strong>Statsmodels</strong></td>
                    <td>Thống kê suy diễn chuẩn tắc, bảng OLS Summary chi tiết như R/Stata.</td>
                    <td>Scikit-learn (Scikit-learn chỉ tập trung tối ưu sai số dự đoán).</td>
                  </tr>
                  <tr>
                    <td>Xây dựng mô hình học máy dạng bảng (Tabular Data)</td>
                    <td><strong>Scikit-learn</strong> + <strong>LightGBM/XGBoost</strong></td>
                    <td>Pipeline chuẩn mực, chống rò rỉ dữ liệu, hiệu quả vượt trội so với Deep Learning trên dữ liệu bảng.</td>
                    <td>Mạng nơ-ron sâu phức tạp (thường tốn tài nguyên mà không hiệu quả hơn).</td>
                  </tr>
                  <tr>
                    <td>Nghiên cứu AI, xử lý ảnh (CV), ngôn ngữ (NLP), LLM</td>
                    <td><strong>PyTorch</strong></td>
                    <td>Đồ thị động (Dynamic Graph), cú pháp Pythonic chuẩn học thuật toàn cầu, dễ debug.</td>
                    <td>Scikit-learn (không thiết kế cho kiến trúc mạng nơ-ron sâu đa lớp).</td>
                  </tr>
                  <tr>
                    <td>Biểu đồ tương tác nhúng lên ứng dụng Web / Dashboard</td>
                    <td><strong>Plotly</strong></td>
                    <td>Sinh mã JSON thuần, tương tác zoom/pan/hover mượt mà trực tiếp trên trình duyệt.</td>
                    <td>Matplotlib thuần (chỉ sinh ảnh tĩnh PNG/SVG không tương tác).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `,
          codeExamples: []
        },
        {
          id: 'sec-learning-pathways',
          title: '4. Bốn Lộ trình Chuyên môn hóa Nghề nghiệp',
          content: `
            <p>Tùy theo định hướng công việc cụ thể, bạn không nhất thiết phải học cả 12 thư viện cùng một lúc. Hãy tập trung theo trọng tâm sau:</p>
            <ul>
              <li><strong>1. Data Analyst (Chuyên viên Phân tích Dữ liệu)</strong>:
                <br>Trọng tâm: <code>NumPy</code> (cơ bản) → <code>Pandas</code> (chuyên sâu) → <code>Matplotlib &amp; Seaborn</code> → <code>Plotly</code> → <code>Statsmodels</code> (cơ bản).
              </li>
              <li><strong>2. Data Scientist (Nhà Khoa học Dữ liệu)</strong>:
                <br>Trọng tâm: Toàn bộ Tầng 1, 2, 3 → <code>Scikit-learn</code> (làm chủ) → <code>Statsmodels</code> (suy diễn) → <code>Polars</code> → Làm quen <code>PyTorch</code> cơ bản.
              </li>
              <li><strong>3. Machine Learning / AI Engineer (Kỹ sư Học máy &amp; AI)</strong>:
                <br>Trọng tâm: <code>NumPy</code> (hiểu sâu strides/vectorization) → <code>Scikit-learn</code> (pipeline chuẩn) → <code>PyTorch</code> (chuyên sâu) → <code>TensorFlow/Keras</code> (so sánh &amp; triển khai).
              </li>
              <li><strong>4. Data Engineer (Kỹ sư Dữ liệu)</strong>:
                <br>Trọng tâm: <code>Polars</code> (xử lý đơn máy hiệu năng cao) → <code>PySpark</code> (ETL phân tán cụm lớn) → <code>Dask</code> → Hiểu định dạng Parquet &amp; Apache Arrow.
              </li>
            </ul>
          `,
          codeExamples: []
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Học vẹt danh sách tên hàm mà không hiểu mô hình dữ liệu bên dưới',
            content: 'Nhiều người học thuộc lòng hàng chục hàm Pandas nhưng vẫn viết vòng lặp for chậm chạp hoặc gặp lỗi SettingWithCopyWarning liên tục. Chìa khóa để giỏi là hiểu: "Bên dưới dữ liệu được xếp trong RAM như thế nào? Phép toán này tạo view (chia sẻ bộ nhớ) hay tạo bản sao copy?"'
          }
        ],
        tips: [
          {
            title: 'Quy tắc 80/20 trong Khoa học Dữ liệu',
            content: 'Trong thực tế, 80% thời gian của một dự án dữ liệu là làm sạch, biến đổi và hiểu dữ liệu (NumPy, Pandas, Polars, Matplotlib). Mô hình AI phức tạp chỉ phát huy sức mạnh khi dữ liệu đầu vào thực sự sạch và được biểu diễn đúng đắn.'
          }
        ]
      },
      exercises: [
        {
          level: 'Cơ bản',
          title: 'Nhận diện công cụ phù hợp với kịch bản thực tế',
          problem: 'Công ty của bạn có 100GB log truy cập máy chủ web ở định dạng CSV lưu trên cụm Hadoop S3. Nhóm cần làm sạch dữ liệu hàng ngày và đào tạo mô hình phân loại dự đoán khách hàng rời bỏ (churn prediction). Hãy đề xuất 2 thư viện phù hợp nhất cho 2 bước này và giải thích vì sao.',
          hint: 'Phân biệt giữa bước ETL xử lý dữ liệu lớn phân tán và bước huấn luyện mô hình học máy có giám sát dạng bảng.',
          solutionCode: `# Bước 1: Xử lý dữ liệu lớn 100GB -> Dùng PySpark
# PySpark đọc song song từ cụm, lọc dữ liệu và tổng hợp thành đặc trưng (features) rút gọn (ví dụ còn 500MB).

# Bước 2: Huấn luyện mô hình phân loại churn -> Dùng Scikit-learn (hoặc LightGBM)
# Dữ liệu đặc trưng 500MB vừa vặn trong RAM máy đơn, dùng Scikit-learn Pipeline để huấn luyện và đánh giá.`,
          solutionOutput: `Đề xuất chuẩn xác: PySpark cho Big Data ETL + Scikit-learn cho Huấn luyện Mô hình.`,
          explanation: 'Dữ liệu 100GB vượt quá RAM máy cá nhân thông thường nên cần PySpark trên cụm phân tán để lọc và tổng hợp. Sau khi rút trích còn bảng đặc trưng nhỏ (features table), việc đưa vào Scikit-learn giúp tận dụng kho thuật toán phong phú, Cross-Validation và tối ưu siêu tham số nhanh chóng.',
          annotations: [
            { line: 2, text: 'Chiến lược tách biệt: Dữ liệu lớn xử lý phân tán, dữ liệu đặc trưng huấn luyện tập trung.' }
          ]
        }
      ],
      summary: [
        'Hệ sinh thái Python Data/AI được chia làm 5 tầng: Nền tảng dữ liệu, Thống kê, Trực quan hóa, Học máy/AI, và Dữ liệu lớn.',
        'NumPy và Apache Arrow là 2 xương sống định dạng bộ nhớ liên kết toàn bộ các thư viện lại với nhau.',
        'Chọn công cụ đúng theo quy mô dữ liệu: Pandas cho &lt;2GB, Polars cho 2-50GB, PySpark cho hàng trăm GB đến TBs.',
        'Scikit-learn thống trị dữ liệu dạng bảng truyền thống; PyTorch thống trị nghiên cứu Deep Learning và mô hình AI tiên tiến.'
      ]
    }
  ]
};
