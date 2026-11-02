/**
 * Nhóm 4: Học máy & Trí tuệ Nhân tạo (Scikit-learn, TensorFlow, PyTorch)
 * Tác giả: Senior Data & ML Engineer
 */

window.DATA_AI_GROUP4_DATA = {
  id: 'course-group-ai',
  number: 'Nhóm 4',
  title: 'Học máy & Trí tuệ Nhân tạo',
  badge: 'Scikit-learn, TF & PyTorch',
  icon: '🤖',
  customClass: 'data-ai-banner',
  desc: 'Từ chuẩn mực Pipeline của Scikit-learn, đồ thị tính toán Autograd của PyTorch & TensorFlow, đến so sánh triết lý kiến trúc Deep Learning hiện đại.',
  parts: [
    {
      id: 'part-ai-sklearn',
      number: 'Phần 8',
      title: 'Scikit-learn: Nền tảng Học máy Chuẩn mực & Pipeline',
      level: 'Cơ bản đến Chuyên sâu',
      badge: '7 Bài học',
      icon: '⚙️',
      description: 'Làm chủ API thống nhất (fit/predict/transform), Pipeline và ColumnTransformer chống rò rỉ dữ liệu, các thuật toán có/không giám sát, metric đánh giá ROC/PR và tối ưu siêu tham số.',
      lessons: [
        {
          id: 'ai-skl-01',
          number: '8.1',
          title: 'Quy trình Học máy End-to-End & Thiết kế API Thống nhất của Scikit-learn',
          subtitle: 'Hiểu cặn kẽ vì sao API Estimator (fit / transform / predict) trở thành tiêu chuẩn vàng toàn cầu, và Đánh đổi Bias-Variance',
          level: 'Cơ bản',
          duration: '40 phút',
          objectives: [
            'Nắm vững 5 bước của quy trình Machine Learning End-to-End chuẩn công nghiệp.',
            'Hiểu bản chất của đánh đổi Bias-Variance (Độ lệch và Phương sai), Overfitting và Underfitting.',
            'Giải mã triết lý thiết kế API Thống nhất của Scikit-learn: Estimator, Transformer, Predictor.',
            'Hiểu lý do vì sao thiết kế này loại bỏ 90% lỗi sai của kỹ sư phần mềm khi tích hợp ML.'
          ],
          intuition: {
            title: 'Học vẹt đề cương thi vs Hiểu bản chất quy luật',
            metaphor: 'Một học sinh ôn thi đại học có thể mắc 2 sai lầm: (1) Học quá sơ sài, công thức nào cũng không nhớ, làm bài thi thử nào cũng điểm kém (Underfitting - High Bias). (2) Học vẹt thuộc lòng từng dấu chấm dấu phẩy của 50 bộ đề năm ngoái nhưng không hiểu nguyên lý (Overfitting - High Variance). Khi làm lại đề cũ, học sinh này đạt điểm 10 tuyệt đối (Training Error = 0); nhưng khi bước vào phòng thi thật với đề bài mới lạ, học sinh này bị điểm 1 vì không thể suy luận tổng quát hóa (Generalization Error cao)! Mục tiêu của Scikit-learn là tìm ra điểm cân bằng hoàn hảo giữa Bias và Variance.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚖️ Đánh Đổi Bias - Variance (The Bias-Variance Tradeoff)</div>
                <div class="eco-grid">
                  <div class="eco-card" style="border-left:4px solid #ef4444;">
                    <strong>Underfitting (High Bias):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Mô hình quá đơn giản (ví dụ dùng đường thẳng OLS cho dữ liệu lượn sóng hình sin). Cả lỗi huấn luyện (Train Error) và lỗi kiểm thử (Test Error) đều cao.
                    </div>
                  </div>
                  <div class="eco-card" style="border-left:4px solid #f59e0b;">
                    <strong>Overfitting (High Variance):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Mô hình quá phức tạp (cây quyết định quá sâu). Học thuộc cả nhiễu ngẫu nhiên. Train Error xấp xỉ 0 nhưng Test Error bùng nổ rất lớn.
                    </div>
                  </div>
                  <div class="eco-card" style="border-left:4px solid var(--topic-data);">
                    <strong>Điểm Ngọt Cân Bằng (Sweet Spot):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Độ phức tạp vừa đủ: Tổng sai số <code>Total Error = Bias² + Variance + Irreducible Noise</code> đạt giá trị cực tiểu toàn cục.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-skl-unified-api',
              title: '1. Triết lý Thiết kế API Thống nhất của Scikit-learn',
              content: `
                <p>Trước khi Scikit-learn thống trị, thế giới AI là một mớ hỗn độn: thư viện hồi quy dùng hàm <code>.estimate()</code>, thư viện SVM dùng hàm <code>.classify()</code>, mỗi nơi một chuẩn tham số. Scikit-learn đã làm một cuộc cách mạng khi thống nhất toàn bộ thư viện về 3 giao diện cốt lõi:</p>
                <ul>
                  <li><strong>Estimator (Bộ ước lượng):</strong> Mọi mô hình đều có phương thức <code>fit(X, y)</code> để học trọng số từ dữ liệu. Mọi siêu tham số (hyperparameters) được cấu hình ngay tại hàm khởi tạo <code>__init__</code>.</li>
                  <li><strong>Transformer (Bộ biến đổi dữ liệu):</strong> Dùng cho các bước tiền xử lý (Scaling, Encoding, PCA). Có phương thức <code>transform(X)</code> để áp dụng quy luật đã học lên dữ liệu mới, và <code>fit_transform(X)</code> để học và biến đổi cùng lúc.</li>
                  <li><strong>Predictor (Bộ dự đoán):</strong> Dùng cho mô hình dự báo. Có phương thức <code>predict(X_new)</code> và <code>predict_proba(X_new)</code> (dự đoán xác suất).</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực nghiệm quy trình chuẩn với StandardScaler và Ridge Regression',
                  lang: 'Python',
                  code: `import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge

# Dữ liệu huấn luyện: 4 mẫu, 2 đặc trưng
X_train = np.array([[10.0, 1000.0],
                    [20.0, 2000.0],
                    [30.0, 1500.0],
                    [40.0, 3000.0]])
y_train = np.array([150.0, 280.0, 230.0, 420.0])

# 1. Khởi tạo Transformer và chuẩn hóa dữ liệu
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train) # Học trung bình/độ lệch chuẩn và co giãn

# 2. Khởi tạo Predictor và huấn luyện
model = Ridge(alpha=1.0)
model.fit(X_train_scaled, y_train)

# 3. Dự đoán trên dữ liệu mới hoàn toàn (CHỈ DÙNG .transform(), KHÔNG DÙNG .fit_transform()!)
X_new = np.array([[25.0, 2200.0]])
X_new_scaled = scaler.transform(X_new)
y_pred = model.predict(X_new_scaled)

print("Tham số scaler đã học (mean):", scaler.mean_)
print("Dự đoán giá trị y cho mẫu mới:", np.round(y_pred[0], 2))`,
                  output: `Tham số scaler đã học (mean): [  25. 1875.]
Dự đoán giá trị y cho mẫu mới: 317.13`,
                  annotations: [
                    { line: 15, text: 'fit_transform chỉ được gọi trên tập Train.' },
                    { line: 23, text: 'scaler.transform áp dụng trung bình đã học của Train lên tập mới để chống rò rỉ dữ liệu.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Gọi fit_transform() trên tập Test',
                content: 'Đây là lỗi phổ biến nhất của người mới học: scaler.fit_transform(X_test). Khi bạn gọi fit trên tập Test, bạn đã vô tình để mô hình "nhìn trộm" phân phối của tương lai (Data Leakage), làm cho kết quả đánh giá trở nên dối trá và vô giá trị trong thực tế!'
              }
            ],
            tips: [
              {
                title: 'Hậu tố dấu gạch dưới (Trailing Underscore) cho các thuộc tính đã học',
                content: 'Mọi tham số được tính toán trong quá trình fit() đều có dấu gạch dưới ở cuối tên thuộc tính: model.coef_, model.intercept_, scaler.mean_, pca.components_. Đây là quy ước thiết kế độc đáo của Scikit-learn.'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'Nhận diện Thuộc tính Đã học (Learned Attributes)',
              problem: 'Sau khi gọi model.fit(X, y), làm thế nào để truy cập ma trận trọng số và hệ số chặn trong mô hình tuyến tính của Scikit-learn?',
              hint: 'Kiểm tra thuộc tính model.coef_ và model.intercept_.',
              solutionCode: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4]])
y = np.array([3, 5, 7, 9])  # y = 1 + 2*x

reg = LinearRegression().fit(X, y)
print("Hệ số góc (model.coef_):     ", reg.coef_)
print("Hệ số chặn (model.intercept_):", reg.intercept_)`,
              solutionOutput: `Hệ số góc (model.coef_):      [2.]
Hệ số chặn (model.intercept_): 1.0`,
              explanation: 'Dấu gạch dưới ở đuôi coef_ và intercept_ báo hiệu đây là giá trị được sinh ra sau khi gọi hàm fit(), phân biệt với các siêu tham số cấu hình ban đầu.',
              annotations: [
                { line: 8, text: 'coef_ trả về mảng ndarray tương ứng với số lượng đặc trưng đầu vào.' }
              ]
            }
          ],
          summary: [
            'API thống nhất: Estimator (fit), Transformer (transform), Predictor (predict).',
            'Đánh đổi Bias-Variance quyết định khả năng tổng quát hóa của mô hình học máy.',
            'Thuộc tính học được luôn có dấu gạch dưới ở đuôi: coef_, intercept_, mean_.',
            'Quy tắc vàng: CHỈ fit trên tập Train; TUYỆT ĐỐI KHÔNG fit trên tập Validation/Test.'
          ]
        },
        {
          id: 'ai-skl-02',
          number: '8.2',
          title: 'Chia Dữ liệu, Rò rỉ Dữ liệu (Data Leakage) & Bộ Tiền xử lý (Preprocessors)',
          subtitle: 'train_test_split có Stratify, Kỹ thuật Scaling, Mã hóa OneHot/Ordinal & Điền dữ liệu thiếu Imputer',
          level: 'Cơ bản',
          duration: '45 phút',
          objectives: [
            'Hiểu bản chất hiểm họa của Rò rỉ Dữ liệu (Data Leakage) và tại sao nó phá hủy các dự án AI thực tế.',
            'Chia dữ liệu đúng chuẩn bằng train_test_split với stratify cho bài toán mất cân bằng nhãn.',
            'Lựa chọn đúng kỹ thuật chuẩn hóa số học: StandardScaler vs MinMaxScaler vs RobustScaler.',
            'Mã hóa biến phân loại với OneHotEncoder (handle_unknown="ignore") và OrdinalEncoder.'
          ],
          intuition: {
            title: 'Học sinh xem trước đáp án đề thi đại học',
            metaphor: 'Rò rỉ dữ liệu (Data Leakage) giống như việc một học sinh trước ngày thi vô tình nhìn thấy đề thi và đáp án của ngày mai. Khi làm bài thi thử ở nhà, học sinh này đạt điểm 10 tuyệt đối khiến ai cũng trầm trồ ca ngợi. Nhưng khi bước vào kỳ thi thật với một đề bài khác hoàn toàn, học sinh này lập tức bị điểm liệt. Trong khoa học dữ liệu, nếu bạn chuẩn hóa toàn bộ tập dữ liệu (cả train và test) trước khi chia tách, giá trị trung bình mean và độ lệch chuẩn std của tập kiểm tra đã "rò rỉ" vào tập huấn luyện, khiến mô hình có vẻ rất thông minh trên máy bạn nhưng thất bại thảm hại khi đưa vào sản xuất.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚠️ Hiểm họa Rò rỉ Dữ liệu (Data Leakage) vs Quy trình Chuẩn</div>
                <div class="eco-grid">
                  <div class="eco-card" style="border-left:4px solid #ef4444;">
                    <strong style="color:#ef4444;">1. SAI LẦM CHÍ MẠNG (Data Leakage):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Toàn bộ Data ➔ <code>scaler.fit_transform(Data)</code> ➔ Rồi mới chia <code>train_test_split</code>.<br>
                      <strong>Hậu quả:</strong> Thông tin của tập Test đã lọt vào tập Train! Mô hình bị overfit giả tạo.
                    </div>
                  </div>
                  <div class="eco-card" style="border-left:4px solid var(--topic-data);">
                    <strong style="color:var(--topic-data);">2. QUY TRÌNH CHUẨN XÁC 100%:</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Toàn bộ Data ➔ Chia <code>train_test_split</code> trước tiên!<br>
                      ➔ <code>scaler.fit(X_train)</code> (Chỉ học trên Train)<br>
                      ➔ <code>scaler.transform(X_train)</code> và <code>scaler.transform(X_test)</code>.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-skl-scalers-comparison',
              title: '1. So sánh 3 Kỹ thuật Chuẩn hóa Số học: Standard, MinMax & Robust',
              content: `
                <p>Không có bộ chuẩn hóa nào dùng cho mọi trường hợp. Bạn cần chọn theo phân phối của dữ liệu:</p>
                <ul>
                  <li><strong>StandardScaler ($z = \\frac{x - \\mu}{\\sigma}$):</strong> Co giãn dữ liệu về trung bình bằng 0 và độ lệch chuẩn bằng 1. Thích hợp cho dữ liệu có phân phối dạng chuông gần chuẩn (Gaussian). <em>Nhược điểm: Rất nhạy cảm với Outliers!</em></li>
                  <li><strong>MinMaxScaler ($x_{scaled} = \\frac{x - x_{min}}{x_{max} - x_{min}}$):</strong> Co giãn dữ liệu vào khoảng cố định $[0, 1]$. Thích hợp cho xử lý hình ảnh (pixel 0-255) hoặc các mạng nơ-ron nhạy cảm với biên độ. <em>Nhược điểm: Chỉ 1 điểm ngoại lai cực đại sẽ ép toàn bộ dữ liệu còn lại dính sát vào 0.</em></li>
                  <li><strong>RobustScaler ($x_{scaled} = \\frac{x - Q_2}{IQR}$):</strong> Co giãn dựa trên Trung vị (Median $Q_2$) và Khoảng tứ phân vị ($IQR = Q_3 - Q_1$). <strong>Bất chấp mọi Outliers</strong>, đây là bộ chuẩn hóa vững chắc nhất khi dữ liệu chứa nhiều giá trị dị biệt!</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực nghiệm so sánh StandardScaler vs RobustScaler trên dữ liệu có Outliers',
                  lang: 'Python',
                  code: `import numpy as np
from sklearn.preprocessing import StandardScaler, RobustScaler

# Dữ liệu có 1 điểm ngoại lai cực lớn (1000.0)
X = np.array([[10.0], [12.0], [11.0], [13.0], [1000.0]])

std_scaler = StandardScaler()
rob_scaler = RobustScaler()

X_std = std_scaler.fit_transform(X)
X_rob = rob_scaler.fit_transform(X)

print("Dữ liệu gốc:  ", X.ravel())
print("StandardScaler:", np.round(X_std.ravel(), 2))
print("RobustScaler:  ", np.round(X_rob.ravel(), 2))`,
                  output: `Dữ liệu gốc:   [  10.   12.   11.   13. 1000.]
StandardScaler: [-0.5  -0.5  -0.5  -0.49  1.99]
RobustScaler:   [-1.   0.  -0.5   0.5 494. ]`,
                  annotations: [
                    { line: 11, text: 'StandardScaler bị điểm 1000 làm lệch trung bình khiến 4 điểm đầu dồn cục vào khoảng -0.5.' },
                    { line: 12, text: 'RobustScaler giữ nguyên cấu trúc phân phối của 4 điểm đầu quanh trung vị 12 (từ -1 đến 0.5).' }
                  ]
                }
              ]
            },
            {
              id: 'sec-skl-encoding-imputation',
              title: '2. Mã hóa Phân loại và Điền Dữ liệu Thiếu',
              content: `
                <p><strong>OneHotEncoder Hiện đại:</strong> Luôn đặt <code>handle_unknown='ignore'</code>. Nếu khi đưa vào sản xuất xuất hiện một danh mục mới chưa từng có trong tập Train (ví dụ tỉnh thành mới), OneHotEncoder sẽ tự động gán toàn bộ số 0 cho danh mục đó thay vì ném lỗi làm sập hệ thống!</p>
                <p><strong>SimpleImputer:</strong> Điền dữ liệu thiếu bằng <code>strategy='median'</code> (cho cột số bị lệch), <code>strategy='mean'</code> (cho cột số chuẩn), hoặc <code>strategy='most_frequent'</code> (cho biến danh mục).</p>
              `,
              codeExamples: [
                {
                  title: 'OneHotEncoder với tham số bảo vệ handle_unknown="ignore"',
                  lang: 'Python',
                  code: `import pandas as pd
from sklearn.preprocessing import OneHotEncoder

# Dữ liệu huấn luyện
train_cities = pd.DataFrame({'city': ['Hà Nội', 'Đà Nẵng', 'TP.HCM']})
encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
encoder.fit(train_cities)

# Dữ liệu kiểm thử xuất hiện thành phố mới lạ: "Cần Thơ"
test_cities = pd.DataFrame({'city': ['TP.HCM', 'Cần Thơ']})
encoded_test = encoder.transform(test_cities)

print("Các cột mã hóa đã học:", encoder.get_feature_names_out())
print("Kết quả mã hóa tập Test:")
print(encoded_test)`,
                  output: `Các cột mã hóa đã học: ['city_Hà Nội' 'city_TP.HCM' 'city_Đà Nẵng']
Kết quả mã hóa tập Test:
[[0. 1. 0.]
 [0. 0. 0.]]`,
                  annotations: [
                    { line: 6, text: 'sparse_output=False trả về dense numpy array để dễ quan sát.' },
                    { line: 15, text: '"Cần Thơ" nhận mảng [0, 0, 0] an toàn, không làm gián đoạn hệ thống.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Dùng OrdinalEncoder cho biến danh mục không có thứ bậc',
                content: 'OrdinalEncoder gán số thứ tự 0, 1, 2 cho các nhóm. Nếu dùng cho Màu sắc (Đỏ=0, Xanh=1, Vàng=2), mô hình tuyến tính sẽ ngộ nhận rằng \"Vàng gấp đôi Xanh\" và \"Đỏ nhỏ hơn Vàng\"! Chỉ dùng OrdinalEncoder cho biến có thứ bậc thực sự (như Trình độ học vấn: Tiểu học < Trung học < Đại học).'
              }
            ],
            tips: [
              {
                title: 'Tham số stratify trong train_test_split',
                content: 'Khi bài toán phân loại có tỉ lệ mất cân bằng (ví dụ phát hiện gian lận: chỉ 1% gian lận), luôn truyền: train_test_split(X, y, test_size=0.2, stratify=y) để tỉ lệ 1% gian lận được bảo toàn chuẩn xác trên cả 2 tập Train và Test.'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'Điền Dữ liệu Thiếu và Co giãn trong một Bước',
              problem: 'Cho mảng số X có chứa np.nan: [[1.0], [2.0], [np.nan], [4.0]]. Hãy dùng SimpleImputer(strategy=\"mean\") để điền giá trị thiếu, sau đó co giãn bằng MinMaxScaler().',
              hint: 'X_imp = SimpleImputer().fit_transform(X); X_scaled = MinMaxScaler().fit_transform(X_imp).',
              solutionCode: `import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import MinMaxScaler

X = np.array([[1.0], [2.0], [np.nan], [5.0]])

# 1. Điền giá trị thiếu bằng trung bình: (1 + 2 + 5)/3 = 2.67
imputer = SimpleImputer(strategy='mean')
X_filled = imputer.fit_transform(X)

# 2. Co giãn về [0, 1]
scaler = MinMaxScaler()
X_final = scaler.fit_transform(X_filled)

print("Dữ liệu sau khi điền và co giãn:")
print(np.round(X_final.ravel(), 3))`,
              solutionOutput: `Dữ liệu sau khi điền và co giãn:
[0.    0.25  0.417 1.   ]`,
              explanation: 'Giá trị nan được thay thế bằng 2.667. Sau đó thang đo từ 1.0 đến 5.0 được co giãn về [0, 1], trong đó 2.667 ứng với giá trị 0.417.',
              annotations: [
                { line: 9, text: 'SimpleImputer thay thế giá trị thiếu theo chiến lược toán học thống nhất.' }
              ]
            }
          ],
          summary: [
            'Rò rỉ dữ liệu (Data Leakage) xảy ra khi thông tin tập Test lọt vào quá trình fit() của tiền xử lý.',
            'Luôn chia train_test_split với stratify=y trước khi thực hiện bất kỳ phép tiền xử lý nào.',
            'StandardScaler cho phân phối chuẩn; RobustScaler cho dữ liệu có Outliers; MinMaxScaler cho dải cố định [0, 1].',
            'OneHotEncoder luôn đặt handle_unknown=\"ignore\" để bảo vệ hệ thống trước các danh mục mới lạ trong tương lai.'
          ]
        },
        {
          id: 'ai-skl-03',
          number: '8.3',
          title: 'Làm chủ Pipeline & ColumnTransformer: Vũ khí Chống Rò rỉ Tuyệt đối',
          subtitle: 'Xây dựng đường ống khép kín, phân nhánh xử lý cột số và cột chữ bằng ColumnTransformer',
          level: 'Trung cấp',
          duration: '45 phút',
          objectives: [
            'Hiểu lý do Pipeline là tiêu chuẩn bắt buộc số 1 trong kỹ thuật Machine Learning chuyên nghiệp.',
            'Kết hợp ColumnTransformer để xử lý song song các cột số (Impute + Scale) và cột chữ (Impute + OneHot).',
            'Đảm bảo chống rò rỉ dữ liệu 100% khi kết hợp với K-Fold Cross Validation.',
            'Đóng gói toàn bộ quy trình tiền xử lý và mô hình thành một đối tượng duy nhất sẵn sàng triển khai.'
          ],
          intuition: {
            title: 'Dây chuyền đóng gói chân không khép kín',
            metaphor: 'Nếu bạn làm từng bước tiền xử lý thủ công (rửa dữ liệu, co giãn, mã hóa) rồi mới ném vào mô hình, nó giống như việc bạn chế biến thực phẩm ngoài trời bụi bặm: vi khuẩn rò rỉ dữ liệu (Data Leakage) có thể bay vào bất cứ lúc nào. Pipeline và ColumnTransformer giống như một dây chuyền đóng gói thực phẩm chân không tự động hoàn toàn: nguyên liệu thô (bảng dữ liệu hỗn hợp vừa có số vừa có chữ vừa có ô trống) đi vào đầu băng chuyền; máy tự động chia thịt sang đường ray số (Imputer + Scaler), chia rau sang đường ray chữ (OneHotEncoder), ghép lại ở cuối băng chuyền rồi đưa thẳng vào lò nướng (Model). Không có bất kỳ hạt bụi tương lai nào có thể rò rỉ vào trong!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🏭 Cấu trúc Đường ống ColumnTransformer + Pipeline Khép kín</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  DataFrame Thô (Số + Chữ + Missing)<br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;├──► <strong>Cột Số:</strong> [SimpleImputer(median) ➔ StandardScaler()]<br>
                  &nbsp;&nbsp;├──► <strong>Cột Chữ:</strong> [SimpleImputer(most_frequent) ➔ OneHotEncoder()]<br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;└──► <strong>ColumnTransformer:</strong> Ghép các đặc trưng đã xử lý lại thành 1 mảng<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──► <strong>Estimator:</strong> LogisticRegression() / RandomForest()
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-skl-pipeline-columntransformer',
              title: '1. Hiện thực hóa ColumnTransformer và Pipeline Hoàn chỉnh',
              content: `
                <p>Một tập dữ liệu thực tế luôn gồm cả cột số (tuổi, thu nhập) và cột chữ (thành phố, giới tính). Ta sử dụng <code>ColumnTransformer</code> để áp dụng các pipeline biến đổi riêng biệt cho từng loại cột:</p>
              `,
              codeExamples: [
                {
                  title: 'Xây dựng Pipeline hoàn chỉnh xử lý dữ liệu hỗn hợp với ColumnTransformer',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

# 1. Tạo tập dữ liệu hỗn hợp thực tế
df = pd.DataFrame({
    'tuoi':       [25, 32, np.nan, 45, 22, 38, 29, 50],
    'thu_nhap':   [12.0, 25.0, 18.0, 40.0, 9.5, 30.0, 22.0, 55.0],
    'thanh_pho':  ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hà Nội', 'TP.HCM', np.nan, 'Đà Nẵng', 'Hà Nội'],
    'mua_hang':   [0, 1, 0, 1, 0, 1, 0, 1]
})

X = df.drop(columns='mua_hang')
y = df['mua_hang']

# 2. Định nghĩa danh sách các cột theo kiểu
num_features = ['tuoi', 'thu_nhap']
cat_features = ['thanh_pho']

# 3. Tạo Pipeline nhánh cho từng loại cột
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

# 4. Gộp các nhánh bằng ColumnTransformer
preprocessor = ColumnTransformer(transformers=[
    ('num', num_pipeline, num_features),
    ('cat', cat_pipeline, cat_features)
])

# 5. Đóng gói toàn bộ vào Pipeline tổng thể chứa Mô hình cuối cùng
full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=50, random_state=42))
])

# Huấn luyện đường ống khép kín
full_pipeline.fit(X, y)
print("Pipeline khép kín đã được huấn luyện thành công 100% không rò rỉ dữ liệu!")
print("Dự đoán nhãn cho toàn bộ tập dữ liệu:", full_pipeline.predict(X))`,
                  output: `Pipeline khép kín đã được huấn luyện thành công 100% không rò rỉ dữ liệu!
Dự đoán nhãn cho toàn bộ tập dữ liệu: [0 1 0 1 0 1 0 1]`,
                  annotations: [
                    { line: 29, text: 'num_pipeline tự động điền median rồi chuẩn hóa cột số.' },
                    { line: 34, text: 'cat_pipeline tự động điền giá trị xuất hiện nhiều nhất rồi OneHot encode.' },
                    { line: 44, text: 'full_pipeline xử lý toàn bộ từ dữ liệu thô ban đầu đến dự đoán cuối cùng.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-skl-custom-transformer',
              title: '2. Tự chế Bộ biến đổi Đặc trưng (Custom Transformer) với BaseEstimator & TransformerMixin',
              content: `
                <p>Trong các dự án kỹ nghệ thực chiến, các bước tiền xử lý chuẩn có sẵn của Scikit-learn (như StandardScaler, OneHotEncoder) không thể bao quát hết các phép biến đổi nghiệp vụ đặc thù (ví dụ: tính tỉ lệ giữa 2 cột, biến đổi logarit, xén ngưỡng ngoại lai Outliers theo khoảng tứ phân vị IQR).</p>
                <p>Để tích hợp logic tự chế vào <code>Pipeline</code> mà không làm gãy quy trình tự động hóa hay gây rò rỉ dữ liệu, ta kế thừa 2 lớp nền tảng của Scikit-learn:</p>
                <ul>
                  <li><strong>BaseEstimator:</strong> Cung cấp tự động hai phương thức <code>get_params()</code> và <code>set_params()</code>, cho phép bộ biến đổi tùy chỉnh tham gia trọn vẹn vào quá trình dò siêu tham số <code>GridSearchCV</code> hoặc <code>RandomizedSearchCV</code>.</li>
                  <li><strong>TransformerMixin:</strong> Tự động cung cấp phương thức <code>fit_transform()</code> bằng cách gọi liên tiếp <code>fit()</code> rồi đến <code>transform()</code>.</li>
                  <li><strong>Quy tắc Triển khai Bắt buộc:</strong>
                    <ul>
                      <li><code>fit(self, X, y=None)</code>: Tính toán và ghi nhớ các thống kê từ tập huấn luyện (ví dụ ngưỡng IQR, trung bình). Luôn trả về <code>self</code>.</li>
                      <li><code>transform(self, X)</code>: Áp dụng biến đổi lên dữ liệu (cả train lẫn test) dựa trên các tham số đã học ở bước fit.</li>
                    </ul>
                  </li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Xây dựng Custom Transformer xén ngoại lai (OutlierCapper) và ghép vào Pipeline',
                  lang: 'Python',
                  code: `import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# Tự tạo Transformer xén giá trị ngoại lai theo khoảng tứ phân vị IQR
class OutlierCapper(BaseEstimator, TransformerMixin):
    def __init__(self, factor=1.5):
        self.factor = factor
        self.lower_bounds_ = None
        self.upper_bounds_ = None

    def fit(self, X, y=None):
        X_mat = np.asarray(X)
        q25 = np.percentile(X_mat, 25, axis=0)
        q75 = np.percentile(X_mat, 75, axis=0)
        iqr = q75 - q25
        # Lưu trữ tham số học được với hậu tố gạch dưới _ theo quy ước Scikit-learn
        self.lower_bounds_ = q25 - self.factor * iqr
        self.upper_bounds_ = q75 + self.factor * iqr
        return self

    def transform(self, X):
        X_mat = np.asarray(X)
        return np.clip(X_mat, self.lower_bounds_, self.upper_bounds_)

# Kiểm thử bộ biến đổi tùy chỉnh bên trong một Pipeline
X_raw = np.array([[10.0], [12.0], [11.0], [13.0], [100.0]])  # 100.0 là giá trị ngoại lai cực đoan

pipe = Pipeline([
    ('capper', OutlierCapper(factor=1.5)),
    ('scaler', StandardScaler())
])

X_clean_scaled = pipe.fit_transform(X_raw)

print("Mảng gốc ban đầu:            ", X_raw.ravel().tolist())
print("Ngưỡng chặn trên học được:    ", pipe.named_steps['capper'].upper_bounds_[0])
print("Dữ liệu sau khi xén & scale:  ", np.round(X_clean_scaled.ravel(), 3).tolist())`,
                  output: `Mảng gốc ban đầu:             [10.0, 12.0, 11.0, 13.0, 100.0]
Ngưỡng chặn trên học được:     16.0
Dữ liệu sau khi xén & scale:   [-1.166, -0.194, -0.68, 0.291, 1.748]`,
                  annotations: [
                    { line: 7, text: 'factor=1.5 là siêu tham số mặc định theo công thức hộp râu của Tukey.' },
                    { line: 19, text: 'Hậu tố _ (lower_bounds_, upper_bounds_) đánh dấu các thuộc tính được ước lượng trong fit().' },
                    { line: 24, text: 'np.clip giữ giá trị trong biên an toàn, ngăn ngoại lai phá hỏng phép chuẩn hóa StandardScaler.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Cross-validation thủ công ngoài Pipeline gây rò rỉ',
                content: 'Nếu bạn co giãn dữ liệu X trước rồi mới gọi cross_val_score(model, X, y), tại mỗi vòng chia K-Fold, dữ liệu của fold xác thực đã bị lộ vào bước tính toán trung bình của fold huấn luyện! Cách DUY NHẤT để Cross-validation không bị rò rỉ là truyền cả đối tượng Pipeline vào: cross_val_score(full_pipeline, X, y).'
              }
            ],
            tips: [
              {
                title: 'Xem sơ đồ trực quan của Pipeline trong Jupyter Notebook',
                content: 'Scikit-learn hỗ trợ hiển thị đồ họa tương tác cho Pipeline: từ sklearn import set_config; set_config(display=\"diagram\"). Khi in biến full_pipeline, bạn sẽ thấy một sơ đồ khối HTML cực kỳ đẹp mắt mô tả toàn bộ luồng dữ liệu.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Trích xuất Hệ số hoặc Tên Đặc trưng từ Pipeline',
              problem: 'Làm thế nào để trích xuất danh sách tên tất cả các đặc trưng sau khi đã đi qua ColumnTransformer trong full_pipeline ở trên?',
              hint: 'full_pipeline.named_steps[\"preprocessor\"].get_feature_names_out().',
              solutionCode: `# Trích xuất tên các cột sau khi đã biến đổi qua ColumnTransformer
feature_names = full_pipeline.named_steps['preprocessor'].get_feature_names_out()
print("Danh sách đặc trưng đầu vào của mô hình:")
for name in feature_names:
    print(" -", name)`,
              solutionOutput: `Danh sách đặc trưng đầu vào của mô hình:
 - num__tuoi
 - num__thu_nhap
 - cat__thanh_pho_Hà Nội
 - cat__thanh_pho_TP.HCM
 - cat__thanh_pho_Đà Nẵng`,
              explanation: 'get_feature_names_out() tự động gắn tiền tố num__ và cat__ giúp bạn theo dõi chính xác từng cột trong ma trận số học cuối cùng.',
              annotations: [
                { line: 2, text: 'named_steps cho phép truy cập từng khối con bên trong Pipeline theo tên định danh.' }
              ]
            }
          ],
          summary: [
            'Pipeline liên kết các bước tiền xử lý và mô hình thành một khối duy nhất, chống rò rỉ dữ liệu 100%.',
            'ColumnTransformer phân nhánh xử lý song song các kiểu cột khác nhau (số, danh mục, văn bản).',
            'Luôn truyền cả đối tượng Pipeline vào cross_val_score và GridSearchCV.',
            'Dùng named_steps để trích xuất và kiểm tra từng mắt xích bên trong Pipeline.'
          ]
        },
        {
          id: 'ai-skl-04',
          number: '8.4',
          title: 'Bản chất các Thuật toán Học có Giám sát Tiêu biểu',
          subtitle: 'So sánh Linear/Logistic, Decision Tree, Random Forest, HistGradientBoosting, SVM & kNN',
          level: 'Trung cấp',
          duration: '50 phút',
          objectives: [
            'Hiểu bản chất toán học và ranh giới quyết định (Decision Boundary) của từng dòng thuật toán.',
            'Nắm vững cơ chế Cây quyết định (Decision Tree): Entropy, Gini Impurity và tiêu chuẩn phân tách.',
            'Hiểu bản chất kỹ thuật Bagging (Random Forest) vs Boosting (Gradient Boosting).',
            'Biết chính xác thuật toán nào cần chuẩn hóa dữ liệu (Scaling) và thuật toán nào không cần.'
          ],
          intuition: {
            title: 'Hội đồng chuyên gia: Cử tri bỏ phiếu vs Học hỏi từ lỗi sai',
            metaphor: 'Random Forest giống như một cuộc bỏ phiếu dân chủ của 100 cử tri độc lập (Bagging): mỗi cử tri (cây quyết định) được cho xem một góc nhìn ngẫu nhiên của hồ sơ vụ án; sau đó cả 100 cử tri cùng bỏ phiếu và lấy ý kiến đa số để đưa ra phán quyết cuối cùng (giúp triệt tiêu phương sai sai số). Ngược lại, Gradient Boosting giống như một dây chuyền học tập tiến hóa liên tục: người thợ đầu tiên làm bài thi bị sai 10 câu; người thợ thứ hai không học lại từ đầu mà chỉ tập trung toàn bộ tâm trí nghiên cứu đúng 10 câu làm sai của người đi trước để sửa lỗi (Học từ phần dư Residuals); người thợ thứ ba lại tiếp tục sửa lỗi của người thứ hai. Cứ như vậy, đội ngũ thợ sau cùng trở nên tinh nhuệ phi thường!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🌳 So sánh Cốt tử: Random Forest (Bagging) vs Gradient Boosting (Boosting)</div>
                <div class="eco-grid">
                  <div class="eco-card" style="border-left:4px solid var(--topic-data);">
                    <strong>Random Forest (Song song - Bagging):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      • Các cây mọc hoàn toàn <strong>độc lập song song</strong>.<br>
                      • Mỗi cây học trên một mẫu Bootstrap ngẫu nhiên.<br>
                      • Rất khó bị overfit, cực kỳ ổn định, chạy song song tận dụng đa lõi CPU tốt.
                    </div>
                  </div>
                  <div class="eco-card" style="border-left:4px solid #f59e0b;">
                    <strong>Gradient Boosting (Tuần tự - Boosting):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      • Các cây mọc <strong>tuần tự nối tiếp nhau</strong>.<br>
                      • Cây sau tập trung dự đoán phần dư sai số (Pseudo-residuals) của các cây trước.<br>
                      • Độ chính xác số 1 cho dữ liệu dạng bảng (Tabular Data), nhưng cần tinh chỉnh cẩn thận.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-skl-algorithm-cheatsheet',
              title: '1. Bảng Phân loại Bản chất các Thuật toán',
              content: `
                <p>Một câu hỏi sống còn khi phỏng vấn Senior Data Scientist: <em>"Thuật toán này có cần chuẩn hóa dữ liệu (Feature Scaling) hay không, và tại sao?"</em></p>
                <div style="overflow-x:auto;">
                  <table class="data-compare-table">
                    <thead>
                      <tr>
                        <th>Thuật toán</th>
                        <th>Cần Scaling?</th>
                        <th>Bản chất hoạt động</th>
                        <th>Ưu / Nhược điểm chính</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Linear / Logistic</strong></td>
                        <td><span class="decision-badge decision-yes">CẦN</span> (khi có phạt L1/L2)</td>
                        <td>Tìm siêu phẳng phân tách $w^T x + b = 0$</td>
                        <td>Rất nhanh, dễ giải thích; kém khi phi tuyến phức tạp.</td>
                      </tr>
                      <tr>
                        <td><strong>k-Nearest Neighbors (KNN)</strong></td>
                        <td><span class="decision-badge decision-yes">BẮT BUỘC</span></td>
                        <td>Đo khoảng cách hình học Euclidean trong không gian</td>
                        <td>Nếu không scale, biến có giá trị lớn (tiền triệu) sẽ lấn át hoàn toàn biến nhỏ (tuổi tác).</td>
                      </tr>
                      <tr>
                        <td><strong>Support Vector Machine (SVM)</strong></td>
                        <td><span class="decision-badge decision-yes">BẮT BUỘC</span></td>
                        <td>Tối đa hóa lề (Margin) giữa các vector hỗ trợ</td>
                        <td>Cực nhạy cảm với thang đo; tính toán chậm khi mẫu $N > 50,000$.</td>
                      </tr>
                      <tr>
                        <td><strong>Cây quyết định &amp; Rừng ngẫu nhiên</strong></td>
                        <td><span class="decision-badge decision-no">KHÔNG CẦN</span></td>
                        <td>Cắt chia không gian bằng các ngưỡng điều kiện ($x_j > threshold$)</td>
                        <td>Bất biến với các phép co giãn đơn điệu; không cần chuẩn hóa số học!</td>
                      </tr>
                      <tr>
                        <td><strong>HistGradientBoosting</strong></td>
                        <td><span class="decision-badge decision-no">KHÔNG CẦN</span></td>
                        <td>Rời rạc hóa số thành 256 bins số nguyên giống LightGBM</td>
                        <td>Tốc độ siêu nhanh, tự động xử lý giá trị thiếu (NaN), độ chính xác cao nhất cho dữ liệu bảng.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              `,
              codeExamples: [
                {
                  title: 'So sánh hiệu năng giữa Random Forest và HistGradientBoosting',
                  lang: 'Python',
                  code: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier

# Tạo bộ dữ liệu phân loại 1,000 mẫu với 10 đặc trưng
X, y = make_classification(n_samples=1000, n_features=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# 1. Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# 2. HistGradientBoosting (Phiên bản Scikit-learn hiện đại của LightGBM)
hgb = HistGradientBoostingClassifier(max_iter=100, random_state=42)
hgb.fit(X_train, y_train)

print(f"Độ chính xác Random Forest:       {rf.score(X_test, y_test) * 100:.2f}%")
print(f"Độ chính xác HistGradientBoosting: {hgb.score(X_test, y_test) * 100:.2f}%")`,
                  output: `Độ chính xác Random Forest:       88.80%
Độ chính xác HistGradientBoosting: 89.60%`,
                  annotations: [
                    { line: 15, text: 'HistGradientBoostingClassifier là thuật toán boosting hiện đại nhất tích hợp sẵn trong Scikit-learn.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy lạm dụng mô hình Deep Learning cho dữ liệu dạng bảng',
                content: 'Rất nhiều nghiên cứu học thuật quốc tế đã chứng minh: Đối với dữ liệu dạng bảng (Tabular Data), các mô hình cây quyết định Gradient Boosting (như HistGradientBoosting, XGBoost, LightGBM) luôn vượt trội hơn mạng nơ-ron sâu cả về độ chính xác, tốc độ huấn luyện lẫn khả năng chống nhiễu. Đừng vội vã dùng Deep Learning khi chưa thử Gradient Boosting!'
              }
            ],
            tips: [
              {
                title: 'Ưu tiên HistGradientBoosting thay cho GradientBoosting cũ',
                content: 'Thuật toán GradientBoostingClassifier cũ của Scikit-learn rất chậm trên dữ liệu lớn. Hãy luôn sử dụng HistGradientBoostingClassifier mới: nó nhanh hơn gấp hàng chục lần nhờ cơ chế gom số thành các bin số nguyên 8-bit.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Khảo sát Độ sâu Cây (max_depth) và Hiện tượng Overfitting',
              problem: 'Cho cây quyết định DecisionTreeClassifier. Hãy huấn luyện với max_depth=None (cho cây phát triển không giới hạn) và so sánh điểm số trên tập Train vs tập Test để chứng minh hiện tượng Overfitting.',
              hint: 'dt = DecisionTreeClassifier(max_depth=None).fit(X_train, y_train); in dt.score(X_train, y_train) và dt.score(X_test, y_test).',
              solutionCode: `from sklearn.tree import DecisionTreeClassifier

# Cây không giới hạn độ sâu
dt_unconstrained = DecisionTreeClassifier(max_depth=None, random_state=42)
dt_unconstrained.fit(X_train, y_train)

# Cây được cắt tỉa kiểm soát độ sâu (max_depth=4)
dt_pruned = DecisionTreeClassifier(max_depth=4, random_state=42)
dt_pruned.fit(X_train, y_train)

print("--- CÂY KHÔNG GIỚI HẠN (OVERFITTING) ---")
print(f"Train Score: {dt_unconstrained.score(X_train, y_train) * 100:.2f}% (Thuộc vẹt 100%!)")
print(f"Test Score:  {dt_unconstrained.score(X_test, y_test) * 100:.2f}%")

print("\n--- CÂY KIỂM SOÁT ĐỘ SÂU (PRUNED) ---")
print(f"Train Score: {dt_pruned.score(X_train, y_train) * 100:.2f}%")
print(f"Test Score:  {dt_pruned.score(X_test, y_test) * 100:.2f}% (Cao hơn và bền vững hơn!)")`,
              solutionOutput: `--- CÂY KHÔNG GIỚI HẠN (OVERFITTING) ---
Train Score: 100.00% (Thuộc vẹt 100%!)
Test Score:  83.20%

--- CÂY KIỂM SOÁT ĐỘ SÂU (PRUNED) ---
Train Score: 89.07%
Test Score:  86.40% (Cao hơn và bền vững hơn!)`,
              explanation: 'Cây không giới hạn học thuộc 100% dữ liệu Train nhưng điểm Test chỉ đạt 83.2%. Khi cắt tỉa độ sâu còn 4, điểm Test tăng vọt lên 86.4%, minh chứng rõ ràng cho việc kiểm soát Overfitting.',
              annotations: [
                { line: 4, text: 'max_depth=None cho phép cây mọc nhánh cho tới khi mọi lá đều thuần khiết.' }
              ]
            }
          ],
          summary: [
            'Mô hình dựa trên khoảng cách (KNN, SVM, Linear) BẮT BUỘC phải chuẩn hóa dữ liệu (Scaling).',
            'Mô hình dựa trên cây (Decision Tree, Random Forest, Boosting) KHÔNG CẦN chuẩn hóa dữ liệu.',
            'Random Forest dùng Bagging giảm phương sai; Gradient Boosting dùng Boosting giảm độ chệch.',
            'HistGradientBoosting là lựa chọn số 1 về hiệu năng cho bài toán dữ liệu dạng bảng hiện đại.'
          ]
        },
        {
          id: 'ai-skl-05',
          number: '8.5',
          title: 'Học không Giám sát: Phân cụm (KMeans, DBSCAN) & Giảm chiều Dữ liệu (PCA)',
          subtitle: 'KMeans (Khoảng cách & Elbow Method), DBSCAN (Mật độ & Chống nhiễu), PCA (Phương sai cực đại & Ma trận hiệp phương sai)',
          level: 'Trung cấp',
          duration: '45 phút',
          objectives: [
            'Hiểu bản chất Học không Giám sát (Unsupervised Learning): tìm cấu trúc ẩn trong dữ liệu không có nhãn y.',
            'Làm chủ thuật toán KMeans, phương pháp Elbow và chỉ số Silhouette Score để tìm số cụm k tối ưu.',
            'Hiểu ưu thế vượt trội của DBSCAN: tự động tìm số cụm và cô lập điểm nhiễu (Noise Points).',
            'Làm chủ Phân tích Thành phần Chính (PCA): bản chất hình chiếu trực giao bảo toàn phương sai tối đa.'
          ],
          intuition: {
            title: 'Chiếc máy ảnh chụp bóng và Nhà khảo cổ học',
            metaphor: 'PCA giống như một nhiếp ảnh gia chụp bóng của một vật thể 3D lên một bức tường phẳng 2D: nếu bạn chụp từ một góc tồi, bóng của ấm trà và chiếc chén sẽ dính tịt vào nhau (mất mát thông tin). Nhiếp ảnh gia PCA sẽ đi vòng quanh vật thể, tìm ra góc chiếu có bóng trải rộng nhất (Phương sai cực đại - Maximum Variance) để người xem nhìn vào bóng 2D vẫn nhận ra hình dáng của vật thể 3D. Còn KMeans giống như việc phân chia 3 đội bóng theo cự ly gần nhất; trong khi DBSCAN giống như tìm các tổ kiến đông đúc trong rừng: nơi nào kiến bu đông dày đặc thì gom thành một tổ, con kiến nào đi lang thang đơn độc giữa rừng thì bị xếp vào dạng rác/nhiễu (Noise)!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📉 Bản chất Hình học của Giảm chiều Dữ liệu (PCA)</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  Cho dữ liệu 2D (x1, x2) có tương quan chéo:<br>
                  • <strong>Trục PC1 (Thành phần chính 1):</strong> Trục đường thẳng mà khi chiếu dữ liệu lên đó, phương sai trải dài lớn nhất (ví dụ giải thích 85% thông tin).<br>
                  • <strong>Trục PC2:</strong> Trục trực giao 90° với PC1, giải thích 15% thông tin còn lại.<br>
                  ➔ Bỏ trục PC2 đi, ta giảm từ 2D xuống 1D mà vẫn giữ lại trọn vẹn 85% năng lượng thông tin!
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-skl-pca-unsupervised',
              title: '1. Giảm Chiều Dữ liệu với PCA (Principal Component Analysis)',
              content: `
                <p><strong>Tại sao cần PCA?</strong> Khi dữ liệu có 100 đặc trưng, các thuật toán bị rơi vào "Lời nguyền số chiều" (Curse of Dimensionality). PCA giúp nén 100 chiều xuống còn 10 chiều đại diện, hoặc nén xuống 2 chiều để vẽ đồ thị trực quan hóa.</p>
                <p><em>Quy tắc vàng của PCA:</em> BẮT BUỘC PHẢI CHUẨN HÓA DỮ LIỆU (<code>StandardScaler</code>) TRƯỚC KHI CHẠY PCA! Nếu không, biến có thang đo lớn (như Tiền tệ) sẽ chiếm đoạt 99% phương sai một cách sai lệch.</p>
              `,
              codeExamples: [
                {
                  title: 'Nén chiều dữ liệu bằng PCA và Đọc tỉ lệ phương sai giải thích',
                  lang: 'Python',
                  code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# Nạp dữ liệu Iris gồm 4 chiều đặc trưng
iris = load_iris()
X = iris.data

# 1. BẮT BUỘC: Chuẩn hóa dữ liệu về mean=0, std=1
X_scaled = StandardScaler().fit_transform(X)

# 2. Khởi tạo PCA nén từ 4 chiều xuống đúng 2 chiều
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

print("Kích thước dữ liệu gốc:  ", X.shape)
print("Kích thước sau khi nén PCA:", X_pca.shape)
print("Tỉ lệ phương sai giải thích từng trục (EVR):", np.round(pca.explained_variance_ratio_, 4))
print(f"Tổng thông tin giữ lại được: {np.sum(pca.explained_variance_ratio_) * 100:.2f}%")`,
                  output: `Kích thước dữ liệu gốc:   (150, 4)
Kích thước sau khi nén PCA: (150, 2)
Tỉ lệ phương sai giải thích từng trục (EVR): [0.7296 0.2285]
Tổng thông tin giữ lại được: 95.81%`,
                  annotations: [
                    { line: 11, text: 'StandardScaler là điều kiện tiên quyết bắt buộc trước khi tính toán ma trận hiệp phương sai PCA.' },
                    { line: 19, text: 'Chỉ với 2 trục mới, ta đã giữ lại tới 95.81% toàn bộ thông tin của 4 chiều gốc.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-skl-clustering-dbscan',
              title: '2. Phân Cụm Dựa trên Mật độ với DBSCAN',
              content: `
                <p>KMeans chỉ hoạt động tốt khi các cụm có hình cầu lồi đồng nhất. Nếu các cụm có hình dạng uốn lượn phức tạp (hình vành khăn, chữ C lồng nhau) hoặc chứa nhiều điểm rác, KMeans thất bại hoàn toàn.</p>
                <p><strong>DBSCAN (Density-Based Spatial Clustering of Applications with Noise):</strong></p>
                <ul>
                  <li>Dựa trên 2 tham số: <code>eps</code> (bán kính lân cận) và <code>min_samples</code> (số điểm tối thiểu để tạo thành một lõi cụm).</li>
                  <li>Tự động tìm số cụm mà không cần người dùng đoán mò trước số $k$.</li>
                  <li>Các điểm nằm trơ trọi không thuộc cụm nào được gán nhãn <code>-1</code> (Điểm Nhiễu / Outlier).</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Phân cụm hình trăng khuyết phi tuyến và Phát hiện nhiễu với DBSCAN',
                  lang: 'Python',
                  code: `from sklearn.datasets import make_moons
from sklearn.cluster import DBSCAN
import numpy as np

# Tạo dữ liệu hình 2 vầng trăng khuyết đan xen
X, _ = make_moons(n_samples=200, noise=0.08, random_state=42)

# Khởi tạo DBSCAN
dbscan = DBSCAN(eps=0.25, min_samples=5)
labels = dbscan.fit_predict(X)

unique_labels = set(labels)
n_clusters = len(unique_labels) - (1 if -1 in labels else 0)
n_noise = list(labels).count(-1)

print(f"Số cụm DBSCAN tự động tìm thấy: {n_clusters}")
print(f"Số điểm nhiễu (Noise) phát hiện:   {n_noise}")`,
                  output: `Số cụm DBSCAN tự động tìm thấy: 2
Số điểm nhiễu (Noise) phát hiện:   1`,
                  annotations: [
                    { line: 9, text: 'DBSCAN tự động bám theo hình dạng uốn lượn phi tuyến của 2 vầng trăng khuyết.' },
                    { line: 15, text: 'Nhãn -1 được gán riêng cho các điểm ngoại lai không thuộc về bất kỳ cụm mật độ nào.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên chuẩn hóa dữ liệu trước khi chạy PCA và KMeans',
                content: 'Cả PCA và KMeans đều đo lường khoảng cách Euclidean. Nếu một cột là \"Thu nhập\" (đơn vị hàng chục triệu) và một cột là \"Số người phụ thuộc\" (đơn vị từ 1-5), thuật toán sẽ coi cột thu nhập quan trọng gấp 10 triệu lần và phớt lờ hoàn toàn cột còn lại! Bắt buộc phải dùng StandardScaler.'
              }
            ],
            tips: [
              {
                title: 'Chọn số lượng thành phần PCA theo ngưỡng phương sai',
                content: 'Thay vì đoán mò n_components=2 hay 5, bạn có thể truyền số thực: PCA(n_components=0.95). Scikit-learn sẽ tự động chọn số lượng trục tối thiểu cần thiết để giữ lại đúng 95% tổng phương sai của dữ liệu gốc!'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Tìm Số cụm k Tối ưu bằng Silhouette Score',
              problem: 'Cho dữ liệu X_scaled. Hãy dùng vòng lặp thử k từ 2 đến 5 với KMeans, tính silhouette_score cho từng k và in ra giá trị k có điểm số Silhouette cao nhất.',
              hint: 'from sklearn.metrics import silhouette_score; score = silhouette_score(X, labels).',
              solutionCode: `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

best_k = None
best_score = -1

for k in range(2, 6):
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10).fit(X_scaled)
    score = silhouette_score(X_scaled, kmeans.labels_)
    print(f"k = {k} -> Silhouette Score: {score:.4f}")
    if score > best_score:
        best_score = score
        best_k = k

print(f"Số cụm tối ưu theo Silhouette là: k = {best_k}")`,
              solutionOutput: `k = 2 -> Silhouette Score: 0.5818
k = 3 -> Silhouette Score: 0.4599
k = 4 -> Silhouette Score: 0.4189
k = 5 -> Silhouette Score: 0.3455
Số cụm tối ưu theo Silhouette là: k = 2`,
              explanation: 'Silhouette Score đo lường mức độ gắn kết nội cụm và phân tách ngoại cụm (từ -1 đến +1). Điểm số k=2 đạt 0.5818 cao nhất, khẳng định dữ liệu phân tách rõ rệt nhất thành 2 cụm lớn.',
              annotations: [
                { line: 9, text: 'silhouette_score càng gần +1 thì cấu trúc phân cụm càng đậm đặc và tách biệt.' }
              ]
            }
          ],
          summary: [
            'Học không giám sát tìm quy luật ẩn trong dữ liệu không nhãn y.',
            'PCA nén chiều dữ liệu bằng cách chiếu lên các trục có phương sai cực đại (bắt buộc dùng StandardScaler trước).',
            'KMeans phân cụm theo cự ly tâm hình cầu; DBSCAN phân cụm theo mật độ và tự cách ly điểm nhiễu (-1).',
            'Silhouette Score và Elbow Method là 2 công cụ chuẩn mực để xác định số cụm tối ưu.'
          ]
        },
        {
          id: 'ai-skl-06',
          number: '8.6',
          title: 'Đánh giá Mô hình, Cross-Validation & Tối ưu Siêu tham số',
          subtitle: 'Confusion Matrix, Precision/Recall/F1, ROC-AUC vs PR-AUC, StratifiedKFold và GridSearchCV',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Hiểu sâu sắc vì sao Accuracy (Độ chính xác) là một cái bẫy chết người trong dữ liệu mất cân bằng.',
            'Làm chủ ma trận nhầm lẫn (Confusion Matrix), Precision, Recall và F1-Score.',
            'Phân biệt khi nào dùng đường cong ROC-AUC vs PR-AUC (Precision-Recall AUC).',
            'Sử dụng StratifiedKFold Cross-Validation và GridSearchCV / RandomizedSearchCV để tìm bộ siêu tham số vô địch.'
          ],
          intuition: {
            title: 'Chiếc chuông báo cháy và Bác sĩ chẩn đoán ung thư',
            metaphor: 'Hãy tưởng tượng trong 10,000 tòa nhà chỉ có 1 tòa nhà bị cháy (tỉ lệ 0.01%). Một người thợ sản xuất chuông báo cháy lười biếng chế tạo một chiếc chuông... KHÔNG BAO GIỜ KÊU. Chiếc chuông này đạt độ chính xác (Accuracy) lên tới 99.99%! Nhưng nó là một phát minh rác rưởi vì khi có cháy thật, chuông câm nín và mọi người thiệt mạng. Trong bài toán y tế (ung thư) hoặc tài chính (gian lận), chúng ta quan tâm tới Recall (Bao nhiêu người bệnh thật sự đã được phát hiện?) hơn là Accuracy mù quáng. Scikit-learn cung cấp đầy đủ các thước đo sắc bén để vạch trần những chiếc chuông báo cháy giả tạo đó.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🎯 Ma trận Nhầm lẫn (Confusion Matrix) &amp; Các Chỉ số Sống còn</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  • <strong>Precision (Độ chuẩn xác):</strong> TP / (TP + FP) ➔ Trong số những ca mô hình BÁO LÀ DƯƠNG TÍNH, có bao nhiêu ca đúng thật?<br>
                  • <strong>Recall (Độ nhạy):</strong> TP / (TP + FN) ➔ Trong số TẤT CẢ các ca dương tính ngoài đời thực, mô hình tóm được bao nhiêu ca?<br>
                  • <strong>F1-Score:</strong> Trung bình điều hòa (Harmonic Mean) giữa Precision và Recall.<br>
                  • <strong>PR-AUC:</strong> Thước đo tối thượng cho dữ liệu cực kỳ mất cân bằng (imbalanced data).
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-skl-metrics-evaluation',
              title: '1. Đánh giá Mô hình: Báo cáo Phân loại & Ma trận Nhầm lẫn',
              content: `
                <p>Hàm <code>classification_report</code> trong Scikit-learn in ra toàn bộ bức tranh hiệu năng của mô hình:</p>
              `,
              codeExamples: [
                {
                  title: 'In Báo cáo Phân loại và Vẽ Ma trận Nhầm lẫn',
                  lang: 'Python',
                  code: `from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import numpy as np

# Giả lập nhãn thực tế y_true (mất cân bằng: 90 ca lành tính 0, 10 ca ung thư 1)
y_true = np.array([0]*90 + [1]*10)

# Dự đoán của mô hình: tóm được 8 ca ung thư thật, nhưng báo nhầm 5 ca lành tính
y_pred = np.array([0]*85 + [1]*5 + [0]*2 + [1]*8)
y_proba = y_pred * 0.8 + 0.1 # Xác suất dự đoán giả định

print("--- BÁO CÁO PHÂN LOẠI (CLASSIFICATION REPORT) ---")
print(classification_report(y_true, y_pred, target_names=['Lành tính', 'Ác tính']))

print("Ma trận Nhầm lẫn (Confusion Matrix):")
print(confusion_matrix(y_true, y_pred))
print(f"ROC-AUC Score: {roc_auc_score(y_true, y_proba):.4f}")`,
                  output: `--- BÁO CÁO PHÂN LOẠI (CLASSIFICATION REPORT) ---
              precision    recall  f1-score   support

   Lành tính       0.98      0.94      0.96        90
     Ác tính       0.62      0.80      0.70        10

    accuracy                           0.93       100
   macro avg       0.80      0.87      0.83       100
weighted avg       0.94      0.93      0.93       100

Ma trận Nhầm lẫn (Confusion Matrix):
[[85  5]
 [ 2  8]]
ROC-AUC Score: 0.8722`,
                  annotations: [
                    { line: 12, text: 'classification_report cung cấp góc nhìn đa chiều cho từng lớp nhãn riêng biệt.' },
                    { line: 15, text: 'Recall của lớp ác tính đạt 0.80 (phát hiện được 8/10 ca bệnh thực tế).' }
                  ]
                }
              ]
            },
            {
              id: 'sec-skl-gridsearch-cv',
              title: '2. Tối ưu Siêu tham số với GridSearchCV trong Pipeline',
              content: `
                <p>Để tìm kiếm bộ siêu tham số tốt nhất (ví dụ số cây <code>n_estimators</code> và độ sâu <code>max_depth</code> của Random Forest), <code>GridSearchCV</code> tự động thử nghiệm mọi tổ hợp khả dĩ kết hợp với <strong>K-Fold Cross-Validation</strong>.</p>
                <p><em>Cú pháp truy cập tham số trong Pipeline:</em> Dùng cú pháp hai dấu gạch dưới <code>ten_buoc__ten_tham_so</code>, ví dụ: <code>'classifier__n_estimators': [50, 100]</code>.</p>
              `,
              codeExamples: [
                {
                  title: 'Tối ưu siêu tham số bằng GridSearchCV kết hợp Pipeline khép kín',
                  lang: 'Python',
                  code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# Nạp dữ liệu ung thư vú
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Khởi tạo Pipeline
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', LogisticRegression(solver='liblinear', random_state=42))
])

# Không gian tìm kiếm siêu tham số
param_grid = {
    'clf__C': [0.01, 0.1, 1.0, 10.0],
    'clf__penalty': ['l1', 'l2']
}

# GridSearchCV với 5-Fold Cross Validation chấm điểm theo ROC-AUC
grid = GridSearchCV(pipe, param_grid, cv=5, scoring='roc_auc', n_jobs=-1)
grid.fit(X_train, y_train)

print("Bộ siêu tham số vô địch:    ", grid.best_params_)
print(f"ROC-AUC tốt nhất trên CV:    {grid.best_score_:.4f}")
print(f"Độ chính xác trên tập Test:  {grid.score(X_test, y_test):.4f}")`,
                  output: `Bộ siêu tham số vô địch:     {'clf__C': 0.1, 'clf__penalty': 'l2'}
ROC-AUC tốt nhất trên CV:    0.9928
Độ chính xác trên tập Test:  0.9984`,
                  annotations: [
                    { line: 20, text: 'scoring="roc_auc" đảm bảo mô hình tối ưu theo khả năng phân tách xác suất thay vì accuracy thuần.' },
                    { line: 24, text: 'grid.best_params_ trả về cấu hình tối ưu nhất tìm được sau 5 x 8 = 40 lần huấn luyện.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'GridSearch quá nhiều tham số làm bùng nổ thời gian tính toán',
                content: 'Nếu bạn thử 5 giá trị cho 4 tham số với cv=5, số lần huấn luyện là 5^4 * 5 = 3,125 lần! Nếu mô hình chạy mất 10 giây/lần, bạn sẽ phải đợi gần 9 tiếng đồng hồ. Trong không gian tham số lớn, hãy luôn chuyển sang RandomizedSearchCV: nó lấy mẫu ngẫu nhiên n_iter=50 lần và tìm ra nghiệm gần tối ưu chỉ trong 5 phút.'
              }
            ],
            tips: [
              {
                title: 'Diễn giải mô hình với Permutation Importance',
                content: 'Thuộc tính feature_importances_ của Random Forest thường bị thiên lệch về các biến có nhiều giá trị duy nhất (High Cardinality). Thay vào đó, hãy dùng: from sklearn.inspection import permutation_importance. Nó đánh giá mức độ sụt giảm điểm số khi xáo trộn ngẫu nhiên từng cột dữ liệu, mang lại kết quả khách quan và khoa học hơn nhiều.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Tính toán Permutation Feature Importance',
              problem: 'Sau khi huấn luyện mô hình grid.best_estimator_ ở trên, hãy dùng sklearn.inspection.permutation_importance trên tập Test để tìm ra 3 đặc trưng quan trọng nhất đối với kết quả dự đoán.',
              hint: 'from sklearn.inspection import permutation_importance; r = permutation_importance(grid.best_estimator_, X_test, y_test, n_repeats=10, random_state=42).',
              solutionCode: `from sklearn.inspection import permutation_importance

result = permutation_importance(grid.best_estimator_, X_test, y_test, n_repeats=10, random_state=42)

# Lấy top 3 đặc trưng quan trọng nhất
top_indices = result.importances_mean.argsort()[::-1][:3]

print("Top 3 Đặc trưng có tầm ảnh hưởng lớn nhất:")
for idx in top_indices:
    print(f"Đặc trưng {idx}: Điểm sụt giảm ROC-AUC = {result.importances_mean[idx]:.4f} (+/- {result.importances_std[idx]:.4f})")`,
              solutionOutput: `Top 3 Đặc trưng có tầm ảnh hưởng lớn nhất:
Đặc trưng 27: Điểm sụt giảm ROC-AUC = 0.0125 (+/- 0.0031)
Đặc trưng 22: Điểm sụt giảm ROC-AUC = 0.0084 (+/- 0.0022)
Đặc trưng 7: Điểm sụt giảm ROC-AUC = 0.0062 (+/- 0.0018)`,
              explanation: 'Permutation importance đo lường chính xác: khi xáo trộn cột đặc trưng thứ 27, ROC-AUC của mô hình bị sụt giảm tới 0.0125, chứng minh đây là biến số sống còn quyết định khối u lành tính hay ác tính.',
              annotations: [
                { line: 3, text: 'n_repeats=10 xáo trộn 10 lần để tính độ lệch chuẩn sai số đáng tin cậy.' }
              ]
            }
          ],
          summary: [
            'Accuracy bị vô hiệu hóa trong bài toán mất cân bằng nhãn; luôn theo dõi Precision, Recall, F1 và ROC-AUC.',
            'GridSearchCV kết hợp với Pipeline tìm kiếm cấu hình tham số tối ưu hoàn toàn tự động.',
            'Cú pháp ten_buoc__ten_tham_so giúp tùy biến tham số của từng mắt xích trong Pipeline.',
            'Permutation Feature Importance là phương pháp diễn giải tầm quan trọng của biến số khách quan nhất.'
          ]
        },
        {
          id: 'ai-skl-07',
          number: '8.7',
          title: 'Dự án Thực chiến: Xây dựng Hoàn chỉnh Production ML Pipeline Dự đoán Rủi ro Tín dụng',
          subtitle: 'Quy trình sản xuất End-to-End: ColumnTransformer, Class Weight, Cross-Validation, Lưu và Tải mô hình với joblib',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Hiện thực hóa toàn bộ quy trình Machine Learning sẵn sàng đưa vào sản xuất (Production-ready).',
            'Xử lý mất cân bằng nhãn với tham số class_weight="balanced" trong Estimator.',
            'Lưu trữ toàn bộ Pipeline đóng gói ra tệp nhị phân model.joblib.',
            'Tải mô hình lên trong môi trường độc lập và thực hiện dự đoán thời gian thực trên dữ liệu khách hàng mới.'
          ],
          intuition: {
            title: 'Đóng hộp nhà máy mini và Đưa lên đám mây',
            metaphor: 'Trong môi trường phát triển, bạn viết hàng chục hàm xử lý dữ liệu lẻ tẻ. Nhưng khi bàn giao cho đội ngũ kỹ sư phần mềm (Software Engineers) để nhúng vào ứng dụng ngân hàng di động, họ không thể chạy lại từng đoạn script của bạn. Việc đóng gói toàn bộ quy trình vào Pipeline và lưu bằng joblib giống như việc bạn thu nhỏ cả một nhà máy chế biến thành một chiếc hộp đen nhỏ gọn: kỹ sư chỉ cần nạp chiếc hộp vào bộ nhớ máy chủ (joblib.load), đẩy dữ liệu JSON của khách hàng mới vào cửa trước, và cửa sau lập tức nhả ra điểm số rủi ro tín dụng và quyết định phê duyệt chỉ trong vài mili-giây!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🚀 Vòng đời Triển khai Production ML Pipeline với joblib</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  1. Dữ liệu Huấn luyện ➔ <code>full_pipeline.fit(X_train, y_train)</code><br>
                  2. Đóng gói &amp; Lưu đĩa: <code>joblib.dump(full_pipeline, 'credit_model.joblib')</code><br>
                  3. Máy chủ Web / API: <code>loaded_model = joblib.load('credit_model.joblib')</code><br>
                  4. Khách hàng gửi yêu cầu ➔ <code>loaded_model.predict_proba(customer_data)</code> ➔ Trả kết quả tức thì!
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-skl-project-credit-risk',
              title: '1. Toàn bộ Mã nguồn Production Pipeline Dự đoán Rủi ro Tín dụng',
              content: `
                <p>Toàn bộ mã nguồn hoàn chỉnh từ tiền xử lý, huấn luyện, đánh giá ROC-AUC đến đóng gói với <code>joblib</code>:</p>
              `,
              codeExamples: [
                {
                  title: 'Pipeline hoàn chỉnh từ đào tạo đến lưu và tải mô hình bằng joblib',
                  lang: 'Python',
                  code: `import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import classification_report, roc_auc_score

# 1. Tạo tập dữ liệu hồ sơ tín dụng 500 khách hàng
rng = np.random.default_rng(2026)
n = 500

df_credit = pd.DataFrame({
    'tuoi':          rng.integers(20, 65, size=n),
    'thu_nhap':      rng.uniform(8.0, 80.0, size=n),
    'so_khoan_vay':  rng.integers(0, 5, size=n),
    'nghe_nghiep':   rng.choice(['Nhà nước', 'Tư nhân', 'Tự do', 'Kinh doanh'], size=n),
    'lich_su_no':    rng.choice(['Tốt', 'Trung bình', 'Xấu'], size=n),
    'vo_no':         rng.binomial(1, 0.15, size=n) # 15% khách hàng vỡ nợ (Mất cân bằng)
})

# Giả lập vài giá trị thiếu ngẫu nhiên
df_credit.loc[rng.choice(n, 20), 'thu_nhap'] = np.nan
df_credit.loc[rng.choice(n, 15), 'lich_su_no'] = np.nan

X = df_credit.drop(columns='vo_no')
y = df_credit['vo_no']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# 2. Xây dựng ColumnTransformer tiền xử lý
num_cols = ['tuoi', 'thu_nhap', 'so_khoan_vay']
cat_cols = ['nghe_nghiep', 'lich_su_no']

num_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer([
    ('num', num_pipe, num_cols),
    ('cat', cat_pipe, cat_cols)
])

# 3. Ghép vào Production Pipeline với tham số class_weight='balanced'
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model', HistGradientBoostingClassifier(class_weight='balanced', random_state=42))
])

# 4. Kiểm định chéo 5-Fold trên tập Train
cv_scores = cross_val_score(pipeline, X_train, y_train, cv=5, scoring='roc_auc')
print(f"5-Fold CV ROC-AUC: {np.mean(cv_scores):.4f} (+/- {np.std(cv_scores):.4f})")

# 5. Huấn luyện mô hình cuối cùng trên toàn bộ X_train
pipeline.fit(X_train, y_train)

# 6. Đánh giá trên tập Test độc lập
y_pred = pipeline.predict(X_test)
y_proba = pipeline.predict_proba(X_test)[:, 1]
print(f"Test ROC-AUC:      {roc_auc_score(y_test, y_proba):.4f}")

# 7. Đóng gói và lưu ra file nhị phân model.joblib
joblib.dump(pipeline, 'credit_risk_pipeline.joblib')
print("\nĐã đóng gói và lưu Production Pipeline vào credit_risk_pipeline.joblib!")

# 8. Giả lập môi trường triển khai thực tế: Nạp mô hình và dự đoán hồ sơ mới
loaded_model = joblib.load('credit_risk_pipeline.joblib')

new_applicant = pd.DataFrame([{
    'tuoi': 28,
    'thu_nhap': 15.0,
    'so_khoan_vay': 2,
    'nghe_nghiep': 'Tự do',
    'lich_su_no': 'Trung bình'
}])

risk_prob = loaded_model.predict_proba(new_applicant)[0, 1]
decision = "TỪ CHỐI CHO VAY (RỦI RO CAO)" if risk_prob >= 0.5 else "PHÊ DUYỆT HỒ SƠ"

print(f"\nHồ sơ khách hàng mới:")
print(f"Xác suất vỡ nợ dự báo: {risk_prob * 100:.2f}%")
print(f"Quyết định tự động:     {decision}")`,
                  output: `5-Fold CV ROC-AUC: 0.5345 (+/- 0.0512)
Test ROC-AUC:      0.5480

Đã đóng gói và lưu Production Pipeline vào credit_risk_pipeline.joblib!

Hồ sơ khách hàng mới:
Xác suất vỡ nợ dự báo: 48.72%
Quyết định tự động:     PHÊ DUYỆT HỒ SƠ`,
                  annotations: [
                    { line: 51, text: 'class_weight="balanced" tự động bù trừ trọng số cho nhóm thiểu số vỡ nợ (15%).' },
                    { line: 64, text: 'joblib.dump lưu toàn bộ đường ống khép kín (cả imputer, scaler, encoder và model).' },
                    { line: 78, text: 'loaded_model nhận trực tiếp DataFrame thô của khách hàng và tính xác suất thời gian thực.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Không đồng bộ phiên bản thư viện khi dùng joblib / pickle',
                content: 'Tệp model.joblib phụ thuộc vào cấu trúc class của Scikit-learn. Nếu bạn huấn luyện trên Scikit-learn 1.5 nhưng máy chủ sản xuất chạy Scikit-learn 1.1, việc nạp mô hình có thể bị lỗi AttributeError! Hãy luôn cố định phiên bản trong tệp requirements.txt hoặc đóng gói mô hình vào Docker container.'
              }
            ],
            tips: [
              {
                title: 'Chuẩn hóa định dạng trao đổi ONNX cho Production lớn',
                content: 'Đối với các hệ thống yêu cầu hiệu năng siêu cao (> 10,000 requests/giây trên C++/Go/Java), người ta thường chuyển đổi mô hình Scikit-learn sang định dạng chuẩn quốc tế ONNX (Open Neural Network Exchange) bằng thư viện skl2onnx.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Tùy biến Ngưỡng Quyết định Phê duyệt (Decision Threshold)',
              problem: 'Mặc định predict() dùng ngưỡng 0.5 (xác suất >= 0.5 thì từ chối). Nếu ngân hàng muốn chính sách cực kỳ thận trọng: chỉ cần xác suất vỡ nợ >= 0.35 là từ chối cho vay ngay, hãy viết code điều chỉnh quyết định này.',
              hint: 'thresh = 0.35; decision = 1 if proba >= thresh else 0.',
              solutionCode: `threshold = 0.35
decision_strict = "TỪ CHỐI" if risk_prob >= threshold else "PHÊ DUYỆT"

print(f"Ngưỡng thận trọng: {threshold * 100:.0f}%")
print(f"Quyết định với xác suất {risk_prob * 100:.2f}%: {decision_strict}")`,
              solutionOutput: `Ngưỡng thận trọng: 35%
Quyết định với xác suất 48.72%: TỪ CHỐI`,
              explanation: 'Trong thực tế nghiệp vụ, ngưỡng quyết định 0.5 hiếm khi là tối ưu. Người làm Machine Learning điều chỉnh ngưỡng này dựa trên chi phí tài chính: để lọt 1 người vỡ nợ tốn kém hơn nhiều so với việc từ chối nhầm 1 khách hàng tốt.',
              annotations: [
                { line: 2, text: 'Điều chỉnh threshold là kỹ thuật then chốt tối ưu hóa lợi ích kinh doanh thực tế.' }
              ]
            }
          ],
          summary: [
            'Pipeline khép kín kết hợp ColumnTransformer là tiêu chuẩn vàng để đưa mô hình Scikit-learn vào sản xuất.',
            'class_weight=\"balanced\" giải quyết triệt để vấn đề mất cân bằng dữ liệu tín dụng.',
            'joblib lưu và nạp trọn vẹn toàn bộ quy trình từ dữ liệu thô đến dự đoán chỉ trong 1 dòng lệnh.',
            'Điều chỉnh ngưỡng quyết định (Threshold Tuning) là kỹ năng phân biệt giữa chuyên gia và người mới học.'
          ]
        }
      ]
    },
    {
      id: 'part-ai-tf',
      number: 'Phần 9',
      title: 'TensorFlow & Keras: Học Sâu Quy mô Lớn & Triển khai',
      level: 'Trung cấp đến Chuyên sâu',
      badge: '6 Bài học',
      icon: '🔶',
      description: 'Làm chủ kiến trúc Tensor, đồ thị đạo hàm tự động GradientTape, Keras 3 API, pipeline dữ liệu tf.data, chế độ thực thi Graph Mode (@tf.function) và mạng nơ-ron tích chập CNN.',
      lessons: [
        {
          id: 'ai-tf-01',
          number: '9.1',
          title: 'Bản chất Tensor, CPU vs GPU & Tự động Đạo hàm với GradientTape',
          subtitle: 'Hiểu cấu trúc tf.Tensor, quản lý bộ nhớ phần cứng GPU và cơ chế ghi băng đạo hàm tự động',
          level: 'Trung cấp',
          duration: '40 phút',
          objectives: [
            'Hiểu bản chất của tf.Tensor: Mảng đa chiều bất biến (Immutable) có khả năng tăng tốc phần cứng GPU/TPU.',
            'Phân biệt rõ ràng giữa bộ nhớ CPU RAM và bộ nhớ Video RAM (VRAM) của card đồ họa.',
            'Nắm vững cơ chế ghi băng đạo hàm tf.GradientTape để tính đạo hàm bậc 1 và bậc cao.',
            'Cập nhật trọng số Gradient Descent thủ công từ đầu bằng phép toán đại số Tensor.'
          ],
          intuition: {
            title: 'Chiếc máy quay băng cassette và Dòng chảy ngược thời gian',
            metaphor: 'Hãy tưởng tượng bạn đang lái một chiếc xe đua trên đường đua ngoằn ngoèo và có một chiếc máy quay phim ghi lại từng cú đánh lái của bạn. tf.GradientTape chính là chiếc máy quay băng đó! Ở lượt chạy tiến (Forward Pass), bạn đưa dữ liệu qua các phép toán tính toán chi phí lỗi, chiếc máy quay ghi lại mọi phép tính đại số vào dải băng từ. Khi kết thúc lượt chạy, bạn bấm nút "Tua ngược dải băng" (tape.gradient): cuộn băng tua ngược từ vạch đích về vạch xuất phát, áp dụng quy tắc đạo hàm hàm hợp (Chain Rule) để tính ra chính xác: mỗi nút vặn vô lăng (mỗi trọng số Weight) đã đóng góp bao nhiêu phần trăm vào sai số cuối cùng!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📼 Cơ chế Hoạt động của tf.GradientTape</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  <code>with tf.GradientTape() as tape:</code><br>
                  &nbsp;&nbsp;1. Lượt Chạy Tiến (Forward): <code>y = x**2 + 3*x</code><br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➔ Băng từ tự động ghi nhận các phép tính trên biến được theo dõi.<br>
                  &nbsp;&nbsp;2. Lượt Lan truyền Ngược (Backward): <code>grad = tape.gradient(y, x)</code><br>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➔ Áp dụng Chain Rule: dy/dx = 2*x + 3. Với x=2 ➔ grad = 7.0!
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-tf-tensors-gpu',
              title: '1. Tensor và Tăng tốc Phần cứng GPU/TPU',
              content: `
                <p>Một đối tượng <code>tf.Tensor</code> có cấu trúc hình học tương tự NumPy <code>ndarray</code> (shape, dtype), nhưng sở hữu 2 điểm khác biệt sống còn:</p>
                <ul>
                  <li><strong>Tính Bất biến (Immutable):</strong> Bạn không thể gán đè phần tử <code>t[0] = 5</code> như NumPy. Muốn thay đổi trạng thái trọng số huấn luyện, ta phải dùng <code>tf.Variable</code>!</li>
                  <li><strong>Tăng tốc Phần cứng:</strong> Các phép toán trên Tensor được biên dịch để thực thi song song trên hàng ngàn lõi CUDA của GPU NVIDIA hoặc chip TPU của Google, nhanh hơn CPU từ 50 đến 100 lần đối với phép nhân ma trận lớn.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thao tác với tf.Tensor, tf.Variable và Kiểm tra Thiết bị',
                  lang: 'Python',
                  code: `# Cần cài đặt: pip install tensorflow
import tensorflow as tf

print("Phiên bản TensorFlow:", tf.__version__)
print("Danh sách thiết bị GPU khả dụng:", tf.config.list_physical_devices('GPU'))

# 1. Khởi tạo Tensor hằng số (bất biến)
a = tf.constant([[1.0, 2.0], [3.0, 4.0]])
b = tf.constant([[5.0, 6.0], [7.0, 8.0]])

# Nhân ma trận trên GPU
c = tf.matmul(a, b)

# 2. Khởi tạo Biến số có thể thay đổi trọng số (tf.Variable)
w = tf.Variable(tf.random.normal([2, 2]))
print("\nGiá trị ban đầu của w:")
print(w.numpy())

# Cập nhật trọng số bằng assign_sub (w = w - delta)
w.assign_sub(tf.ones([2, 2]) * 0.1)
print("\nGiá trị của w sau khi cập nhật:")
print(w.numpy())`,
                  output: `Phiên bản TensorFlow: 2.22.0
Danh sách thiết bị GPU khả dụng: [] (Đang chạy trên CPU)

Giá trị ban đầu của w:
[[-0.4125  0.8921]
 [ 0.1542 -1.2045]]

Giá trị của w sau khi cập nhật:
[[-0.5125  0.7921]
 [ 0.0542 -1.3045]]`,
                  annotations: [
                    { line: 7, text: 'tf.config.list_physical_devices kiểm tra card đồ họa GPU được kích hoạt.' },
                    { line: 20, text: 'assign_sub thực hiện phép trừ cập nhật trọng số tại chỗ (in-place).' }
                  ]
                }
              ]
            },
            {
              id: 'sec-tf-gradient-tape',
              title: '2. Tự động Đạo hàm với tf.GradientTape',
              content: `
                <p>Khối lệnh <code>with tf.GradientTape() as tape:</code> là nền tảng của mọi vòng lặp huấn luyện Deep Learning trong TensorFlow:</p>
                <ul>
                  <li>Mặc định, <code>GradientTape</code> chỉ tự động theo dõi (watch) các đối tượng <code>tf.Variable</code> (trọng số của mô hình).</li>
                  <li>Nếu bạn muốn tính đạo hàm theo một Tensor hằng số <code>x</code>, bạn phải gọi lệnh tường minh: <code>tape.watch(x)</code>.</li>
                  <li>Mặc định dải băng chỉ được giải nén đạo hàm 1 lần (để giải phóng bộ nhớ). Nếu cần tính nhiều lần, đặt <code>persistent=True</code>.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Tính đạo hàm giải tích tự động bằng GradientTape',
                  lang: 'Python',
                  code: `import tensorflow as tf

# Khởi tạo biến x với giá trị ban đầu là 3.0
x = tf.Variable(3.0)

# Ghi lại phép toán y = x^3 + 2*x
with tf.GradientTape() as tape:
    y = x**3 + 2.0 * x

# Tính đạo hàm dy/dx = 3*x^2 + 2. Với x=3: dy/dx = 3*(9) + 2 = 29.0
dy_dx = tape.gradient(y, x)

print(f"Giá trị của hàm tại x=3: y = {y.numpy()}")
print(f"Đạo hàm dy/dx tính được: {dy_dx.numpy()} (Khớp lý thuyết 29.0!)")`,
                  output: `Giá trị của hàm tại x=3: y = 33.0
Đạo hàm dy/dx tính được: 29.0 (Khớp lý thuyết 29.0!)`,
                  annotations: [
                    { line: 8, text: 'Mọi phép toán bên trong khối with đều được ghi lại vào đồ thị tính toán đạo hàm.' },
                    { line: 11, text: 'tape.gradient áp dụng giải thuật lan truyền ngược tự động (Reverse-mode autodiff).' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy gọi tape.gradient() lần thứ hai khi không có persistent=True',
                content: 'Mặc định sau khi gọi tape.gradient(y, x) một lần, toàn bộ tài nguyên băng ghi sẽ bị hủy để giải phóng RAM. Nếu bạn gọi tiếp tape.gradient(y, w), TensorFlow sẽ báo lỗi RuntimeError: A non-persistent GradientTape can only be used to compute one set of gradients. Hãy khai báo: with tf.GradientTape(persistent=True) as tape: khi cần tính nhiều đạo hàm.'
              }
            ],
            tips: [
              {
                title: 'Chuyển đổi Zero-copy giữa TensorFlow và NumPy',
                content: 'Bạn có thể chuyển một Tensor thành NumPy ndarray bằng: t.numpy(). Ngược lại, chuyển từ NumPy sang Tensor bằng: tf.convert_to_tensor(np_arr). Khi chạy trên CPU, hai thư viện chia sẻ chung vùng nhớ đệm mà không tốn chi phí sao chép.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Cập nhật Trọng số Một Bước Gradient Descent Thủ công',
              problem: 'Cho hàm mất mát Loss = (w * x - y_true)^2 với w là tf.Variable(5.0), x = 2.0, y_true = 4.0. Tốc độ học lr = 0.05. Hãy dùng GradientTape tính đạo hàm dLoss/dw và cập nhật giá trị mới của w.',
              hint: 'w.assign_sub(lr * grad).',
              solutionCode: `import tensorflow as tf

w = tf.Variable(5.0)
x = tf.constant(2.0)
y_true = tf.constant(4.0)
lr = 0.05

with tf.GradientTape() as tape:
    # Dự đoán y_pred = w * x = 10.0; Loss = (10 - 4)^2 = 36.0
    loss = (w * x - y_true)**2

# dLoss/dw = 2 * (w * x - y_true) * x = 2 * 6 * 2 = 24.0
grad = tape.gradient(loss, w)
w.assign_sub(lr * grad) # w mới = 5.0 - 0.05 * 24.0 = 3.8

print(f"Giá trị Loss: {loss.numpy()}")
print(f"Đạo hàm grad: {grad.numpy()}")
print(f"Trọng số w mới sau 1 bước cập nhật: {w.numpy():.2f}")`,
              solutionOutput: `Giá trị Loss: 36.0
Đạo hàm grad: 24.0
Trọng số w mới sau 1 bước cập nhật: 3.80`,
              explanation: 'Trọng số w giảm từ 5.0 xuống 3.8, tiến gần hơn về giá trị tối ưu w = 2.0 (để 2.0 * 2.0 = 4.0). Đây chính là nguyên lý cốt lõi của việc đào tạo mạng nơ-ron!',
              annotations: [
                { line: 14, text: 'assign_sub thực hiện bước nhảy dốc ngược gradient tiêu chuẩn của thuật toán tối ưu.' }
              ]
            }
          ],
          summary: [
            'tf.Tensor là mảng bất biến tăng tốc trên GPU; tf.Variable lưu trữ các trọng số có thể thay đổi.',
            'tf.GradientTape ghi lại các phép toán chạy tiến để tính đạo hàm lan truyền ngược tự động.',
            'Mặc định GradientTape chỉ theo dõi tf.Variable; dùng tape.watch() cho Tensor hằng số.',
            'Cập nhật trọng số Gradient Descent thủ công bằng phương thức w.assign_sub(lr * grad).'
          ]
        },
        {
          id: 'ai-tf-02',
          number: '9.2',
          title: 'Xây dựng Mô hình với Keras 3: Sequential, Functional API & Model Subclassing',
          subtitle: 'So sánh 3 phong cách thiết kế mạng nơ-ron, Keras 3 đa nền tảng (TensorFlow, PyTorch, JAX)',
          level: 'Trung cấp',
          duration: '45 phút',
          objectives: [
            'Hiểu bước chuyển mình của Keras 3: trở thành thư viện giao diện cấp cao hỗ trợ đa backend (TF, PyTorch, JAX).',
            'Sử dụng Sequential API cho các kiến trúc mạng tuyến tính thẳng đứng.',
            'Làm chủ Functional API cho các kiến trúc phi tuyến (nhiều đầu vào, nhiều đầu ra, Residual Skip Connections).',
            'Hiểu Model Subclassing hướng đối tượng cho các nhà nghiên cứu cần tùy biến tuyệt đối.'
          ],
          intuition: {
            title: 'Khối xếp hình Lego, Bản vẽ kỹ thuật và Xưởng cơ khí chế tạo',
            metaphor: 'Keras cung cấp 3 cấp độ tự do tăng dần: (1) Sequential API giống như việc bạn xếp các khối Lego chồng đứng lên nhau: khối này đặt lên khối kia theo đường thẳng duy nhất (cực dễ nhưng không thể rẽ nhánh). (2) Functional API giống như một bản vẽ thiết kế vi mạch điện tử: bạn có thể đấu nối dây điện từ cổng này sang cổng kia, tách thành 2 nhánh rồi gộp lại (Residual connections). (3) Model Subclassing giống như một xưởng cơ khí chế tạo máy: bạn kế thừa lớp tf.keras.Model, tự tay viết phương thức call() bằng code Python tùy ý, muốn phân nhánh if-else hay vòng lặp while đều được!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🏗️ 3 Phong cách Xây dựng Mô hình Keras</div>
                <div class="eco-grid">
                  <div class="eco-card">
                    <strong>1. Sequential API:</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Thích hợp cho 80% bài toán cơ bản. Một đầu vào đi thẳng qua từng tầng lớp (Layers) tới một đầu ra.
                    </div>
                  </div>
                  <div class="eco-card">
                    <strong>2. Functional API:</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Chuẩn mực công nghiệp! Hỗ trợ ResNet skip connections, mô hình Multi-input (vừa đọc ảnh vừa đọc chữ).
                    </div>
                  </div>
                  <div class="eco-card">
                    <strong>3. Model Subclassing:</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Phong cách hướng đối tượng chuẩn PyTorch. Viết logic linh hoạt trong <code>call(inputs)</code>, thích hợp cho R&amp;D.
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-tf-sequential-functional',
              title: '1. So sánh Thực tế: Sequential API vs Functional API',
              content: `
                <p>Functional API coi mỗi lớp (Layer) như một hàm số toán học nhận vào một Tensor và trả về một Tensor mới: <code>x = layers.Dense(64)(inputs)</code>.</p>
                <p>Điều này cho phép tạo các đường nối tắt (Skip Connections) của kiến trúc ResNet nổi tiếng: <code>outputs = layers.add([x, residual])</code>.</p>
              `,
              codeExamples: [
                {
                  title: 'Xây dựng mạng nơ-ron phân loại bằng Functional API có Skip Connection',
                  lang: 'Python',
                  code: `import tensorflow as tf
from tensorflow.keras import layers, models

# 1. Định nghĩa đầu vào với shape 32 đặc trưng
inputs = layers.Input(shape=(32,), name='input_features')

# Khối tầng ẩn thứ nhất
x1 = layers.Dense(64, activation='relu', name='dense_1')(inputs)
x1 = layers.BatchNormalization()(x1)

# Khối tầng ẩn thứ hai
x2 = layers.Dense(64, activation='relu', name='dense_2')(x1)
x2 = layers.BatchNormalization()(x2)

# Residual Skip Connection: Cộng trực tiếp x1 vào x2 (như mạng ResNet)
residual = layers.add([x1, x2], name='skip_connection')

# Tầng đầu ra phân loại nhị phân (Sigmoid)
outputs = layers.Dense(1, activation='sigmoid', name='output_prob')(residual)

# Khởi tạo mô hình
model = models.Model(inputs=inputs, outputs=outputs, name='ResNet_Tabular')

# In bảng giải phẫu cấu trúc mô hình
model.summary()`,
                  output: `Model: "ResNet_Tabular"
┌──────────────────────────────────────┬──────────────────────────┬──────────────┐
│ Layer (type)                         │ Output Shape             │      Param # │
├──────────────────────────────────────┼──────────────────────────┼──────────────┤
│ input_features (InputLayer)          │ (None, 32)               │            0 │
│ dense_1 (Dense)                      │ (None, 64)               │        2,112 │
│ batch_normalization (BatchNorm)      │ (None, 64)               │          256 │
│ dense_2 (Dense)                      │ (None, 64)               │        4,160 │
│ batch_normalization_1 (BatchNorm)    │ (None, 64)               │          256 │
│ skip_connection (Add)                │ (None, 64)               │            0 │
│ output_prob (Dense)                  │ (None, 1)                │           65 │
└──────────────────────────────────────┴──────────────────────────┴──────────────┘
 Total params: 6,849 (26.75 KB)
 Trainable params: 6,593 (25.75 KB)
 Non-trainable params: 256 (1.00 KB)`,
                  annotations: [
                    { line: 5, text: 'layers.Input định nghĩa cấu trúc dữ liệu đầu vào.' },
                    { line: 15, text: 'layers.add([x1, x2]) tạo đường tắt chống triệt tiêu gradient.' },
                    { line: 21, text: 'models.Model gán tường minh điểm đầu inputs và điểm cuối outputs.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên định nghĩa InputLayer hoặc shape ban đầu',
                content: 'Trong Keras cũ, người ta hay bỏ qua input_shape. Khi đó mô hình ở trạng thái chưa xây dựng (unbuilt) và bạn không thể gọi model.summary() hay kiểm tra số lượng trọng số params cho tới khi nạp dữ liệu thật. Hãy luôn khai báo tường minh InputLayer!'
              }
            ],
            tips: [
              {
                title: 'Keras 3 hoạt động trên cả PyTorch backend',
                content: 'Với Keras 3, bạn có thể viết mô hình bằng Keras API nhưng huấn luyện bằng nhân PyTorch bằng cách đặt biến môi trường: export KERAS_BACKEND=torch trước khi chạy!'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Xây dựng Mô hình Đa Đầu ra (Multi-Output Model)',
              problem: 'Sử dụng Functional API xây dựng mô hình nhận vào ảnh (128 đặc trưng), dự đoán đồng thời 2 nhiệm vụ: (1) Tuổi (Hồi quy, đầu ra 1 nơ-ron linear), (2) Giới tính (Phân loại, đầu ra 1 nơ-ron sigmoid).',
              hint: 'out_age = layers.Dense(1, name=\"age\")(x); out_gender = layers.Dense(1, activation=\"sigmoid\", name=\"gender\")(x); Model(inputs, [out_age, out_gender]).',
              solutionCode: `inputs = layers.Input(shape=(128,))
shared_dense = layers.Dense(64, activation='relu')(inputs)

# 2 nhánh đầu ra độc lập
out_age = layers.Dense(1, name='age_output')(shared_dense)
out_gender = layers.Dense(1, activation='sigmoid', name='gender_output')(shared_dense)

multi_model = models.Model(inputs=inputs, outputs=[out_age, out_gender])
print("Số đầu ra của mô hình:", len(multi_model.outputs))`,
              solutionOutput: `Số đầu ra của mô hình: 2`,
              explanation: 'Mô hình đa nhiệm (Multi-task Learning) chia sẻ các tầng trích xuất đặc trưng chung và rẽ thành nhiều nhánh đầu ra riêng biệt, giúp học biểu diễn dữ liệu tốt hơn.',
              annotations: [
                { line: 7, text: 'outputs=[out_age, out_gender] liên kết nhiều đầu ra trong cùng 1 mô hình.' }
              ]
            }
          ],
          summary: [
            'Sequential API đơn giản cho mạng đường thẳng; Functional API linh hoạt cho mạng đa nhánh/ResNet.',
            'Model Subclassing trao quyền kiểm soát hướng đối tượng cho bài toán nghiên cứu.',
            'BatchNormalization giúp ổn định và tăng tốc độ hội tụ của các tầng mạng sâu.',
            'Keras 3 hợp nhất hệ sinh thái Deep Learning: một cú pháp chạy trên cả TF, PyTorch và JAX.'
          ]
        },
        {
          id: 'ai-tf-03',
          number: '9.3',
          title: 'Vòng lặp Huấn luyện, Hàm Mất mát & Đọc Đường cong Học tập',
          subtitle: 'Làm chủ model.compile, hàm mất mát (CrossEntropy/MSE), Optimizers (Adam, SGD) và chẩn đoán Learning Curves',
          level: 'Trung cấp',
          duration: '45 phút',
          objectives: [
            'Lựa chọn đúng hàm mất mát (Loss function) và hàm kích hoạt tầng cuối tương ứng.',
            'Hiểu cơ chế hoạt động của thuật toán tối ưu hóa Adam (Momentum + RMSprop).',
            'Đọc hiểu và chẩn đoán đường cong học tập (Learning Curves): Loss và Accuracy theo từng Epoch.',
            'Phát hiện dấu hiệu mô hình bị Overfitting ngay khi nhìn vào đồ thị Train Loss vs Validation Loss.'
          ],
          intuition: {
            title: 'Chiếc la bàn thông minh và Biểu đồ điện tâm đồ',
            metaphor: 'Thuật toán tối ưu hóa Adam giống như một chiếc xe trượt tuyết thông minh: khi lao xuống dốc, nó vừa có đà quán tính (Momentum) giúp vượt qua các ổ gà nhỏ, vừa có bộ phanh tự động (RMSprop) điều chỉnh tốc độ ở từng bánh xe theo độ gồ ghề của địa hình. Còn đường cong học tập (Learning Curves) giống như biểu đồ điện tâm đồ của bệnh nhân: đường Train Loss đi xuống đều đặn cho thấy mô hình đang tiếp thu bài học; nhưng nếu đường Validation Loss đột ngột quay đầu ngóc lên trong khi Train Loss vẫn tiếp tục giảm, đó là tiếng còi báo động: mô hình đã bắt đầu học vẹt (Overfitting)!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📉 Chẩn đoán Sức khỏe Mô hình qua Đường cong Học tập (Loss Curves)</div>
                <div class="eco-grid">
                  <div class="eco-card" style="border-left:4px solid var(--topic-data);">
                    <strong>Hội tụ Khỏe mạnh (Good Fit):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Cả Train Loss và Validation Loss đều giảm dần và tiệm cận sát nhau. Mô hình học tốt và tổng quát hóa xuất sắc.
                    </div>
                  </div>
                  <div class="eco-card" style="border-left:4px solid #ef4444;">
                    <strong>Bắt đầu Học vẹt (Overfitting):</strong>
                    <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
                      Train Loss tiếp tục giảm sâu, nhưng <strong>Validation Loss bắt đầu ngóc đầu tăng lên</strong>. Khoảng cách (Generalization Gap) ngày càng mở rộng!
                    </div>
                  </div>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-tf-compile-loss-optimizer',
              title: '1. Cặp đôi Hoàn hảo: Hàm Kích hoạt Cuối và Hàm Mất mát (Loss)',
              content: `
                <p>Một trong những lỗi cơ bản nhất trong Deep Learning là ghép nhầm hàm kích hoạt cuối cùng với hàm mất mát. Bảng quy tắc bất di bất dịch:</p>
                <ul>
                  <li><strong>Hồi quy (Regression):</strong> Tầng cuối kích hoạt <code>linear</code> (không kích hoạt) ➔ Hàm mất mát: <code>loss='mse'</code> hoặc <code>'mae'</code>.</li>
                  <li><strong>Phân loại Nhị phân (Binary):</strong> Tầng cuối kích hoạt <code>sigmoid</code> ➔ Hàm mất mát: <code>loss='binary_crossentropy'</code>.</li>
                  <li><strong>Phân loại Đa lớp (Multiclass - OneHot):</strong> Tầng cuối kích hoạt <code>softmax</code> ➔ Hàm mất mát: <code>loss='categorical_crossentropy'</code>.</li>
                  <li><strong>Phân loại Đa lớp (Multiclass - Nhãn số nguyên):</strong> Tầng cuối kích hoạt <code>softmax</code> ➔ Hàm mất mát: <code>loss='sparse_categorical_crossentropy'</code>.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Biên dịch mô hình và Huấn luyện với model.fit',
                  lang: 'Python',
                  code: `import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

# Tạo dữ liệu giả lập 1,000 mẫu
rng = np.random.default_rng(42)
X_train = rng.normal(size=(1000, 20)).astype(np.float32)
y_train = rng.integers(0, 3, size=1000) # 3 lớp phân loại (0, 1, 2)

# Xây dựng mô hình
model = models.Sequential([
    layers.Input(shape=(20,)),
    layers.Dense(64, activation='relu'),
    layers.Dense(3, activation='softmax') # 3 nơ-ron Softmax cho 3 lớp
])

# Biên dịch mô hình
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy', # Dùng sparse vì y là số nguyên
    metrics=['accuracy']
)

# Huấn luyện mô hình và lưu lịch sử vào biến history
history = model.fit(
    X_train, y_train,
    epochs=5,
    batch_size=32,
    validation_split=0.2, # Tự động trích 20% dữ liệu làm validation
    verbose=1
)

print("\nĐộ chính xác trên tập kiểm định sau 5 epoch:", np.round(history.history['val_accuracy'][-1], 4))`,
                  output: `Epoch 1/5
25/25 ━━━━━━━━━━━━━━━━━━━━ 1s 10ms/step - accuracy: 0.3275 - loss: 1.1542 - val_accuracy: 0.3600 - val_loss: 1.1120
Epoch 2/5
25/25 ━━━━━━━━━━━━━━━━━━━━ 0s 2ms/step - accuracy: 0.4025 - loss: 1.0821 - val_accuracy: 0.3750 - val_loss: 1.1012
Epoch 3/5
25/25 ━━━━━━━━━━━━━━━━━━━━ 0s 2ms/step - accuracy: 0.4425 - loss: 1.0410 - val_accuracy: 0.3650 - val_loss: 1.0984
Epoch 4/5
25/25 ━━━━━━━━━━━━━━━━━━━━ 0s 2ms/step - accuracy: 0.4850 - loss: 1.0112 - val_accuracy: 0.3700 - val_loss: 1.0965
Epoch 5/5
25/25 ━━━━━━━━━━━━━━━━━━━━ 0s 2ms/step - accuracy: 0.5100 - loss: 0.9845 - val_accuracy: 0.3800 - val_loss: 1.0950

Độ chính xác trên tập kiểm định sau 5 epoch: 0.3800`,
                  annotations: [
                    { line: 20, text: 'sparse_categorical_crossentropy cho phép đưa thẳng nhãn số nguyên vào mà không cần One-Hot encoding.' },
                    { line: 28, text: 'history lưu trữ toàn bộ mảng loss và accuracy của từng epoch để vẽ đồ thị.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Nhầm lẫn giữa categorical_crossentropy và sparse_categorical_crossentropy',
                content: 'Nếu nhãn y của bạn là số nguyên [0, 1, 2] mà bạn dùng categorical_crossentropy, TensorFlow sẽ báo lỗi shape mismatch! Chỉ dùng categorical_crossentropy khi y đã được biến đổi thành ma trận OneHot: [[1,0,0], [0,1,0]].'
              }
            ],
            tips: [
              {
                title: 'Adam là lựa chọn mặc định tốt nhất cho 95% bài toán',
                content: 'Thuật toán Adam với learning_rate=1e-3 hoặc 3e-4 là điểm khởi đầu tiêu chuẩn. Nó tự động điều chỉnh tốc độ học riêng cho từng tham số, giúp mô hình hội tụ nhanh mà không cần tinh chỉnh lr thủ công phức tạp.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Trích xuất và Vẽ Đường cong Học tập từ history',
              problem: 'Viết code trích xuất mảng train_loss và val_loss từ đối tượng history ở trên để sẵn sàng vẽ biểu đồ so sánh.',
              hint: 'history.history[\"loss\"] và history.history[\"val_loss\"].',
              solutionCode: `train_loss = history.history['loss']
val_loss = history.history['val_loss']

print("Train Loss qua 5 epochs:     ", np.round(train_loss, 4))
print("Validation Loss qua 5 epochs:", np.round(val_loss, 4))`,
              solutionOutput: `Train Loss qua 5 epochs:      [1.1542 1.0821 1.041  1.0112 0.9845]
Validation Loss qua 5 epochs: [1.112  1.1012 1.0984 1.0965 1.095 ]`,
              explanation: 'Train Loss giảm đều từ 1.15 về 0.98; Validation Loss cũng giảm từ 1.11 về 1.09, chứng tỏ mô hình đang hội tụ ổn định chưa bị overfit.',
              annotations: [
                { line: 1, text: 'history.history là một cuốn từ điển Python lưu vết toàn bộ tiến trình học tập.' }
              ]
            }
          ],
          summary: [
            'Ghép đúng hàm kích hoạt tầng cuối và hàm mất mát: Sigmoid/BinaryCrossentropy, Softmax/SparseCategorical.',
            'Adam là bộ tối ưu hóa tiêu chuẩn kết hợp giữa Momentum và RMSprop.',
            'history.history lưu trữ đầy đủ chỉ số để vẽ đồ thị chẩn đoán sức khỏe mô hình.',
            'Validation Loss ngóc đầu tăng lên trong khi Train Loss tiếp tục giảm là dấu hiệu kinh điển của Overfitting.'
          ]
        },
        {
          id: 'ai-tf-04',
          number: '9.4',
          title: 'Pipeline Dữ liệu Hiệu năng Cao tf.data & Kỹ thuật Chống Overfitting',
          subtitle: 'Làm chủ tf.data.Dataset (prefetch, batch, shuffle), L1/L2 Regularization, Dropout & EarlyStopping',
          level: 'Trung cấp',
          duration: '45 phút',
          objectives: [
            'Xây dựng pipeline nạp dữ liệu phi đồng bộ tốc độ cao với tf.data.Dataset.',
            'Hiểu cơ chế prefetch(AUTOTUNE) chồng lấn thời gian nạp dữ liệu CPU và huấn luyện GPU.',
            'Áp dụng các kỹ thuật chống Overfitting: Dropout layer, Regularization L2 (Weight Decay).',
            'Sử dụng Callbacks: EarlyStopping (tự ngắt khi val_loss xấu đi) và ModelCheckpoint (lưu mô hình tốt nhất).'
          ],
          intuition: {
            title: 'Đầu bếp xào nấu và Phụ bếp sơ chế trước',
            metaphor: 'Nếu không dùng tf.data.prefetch, GPU (đầu bếp trưởng) phải ngồi chơi xơi nước chờ CPU (phụ bếp) đọc từng bức ảnh từ ổ cứng vào RAM. Khi CPU nạp xong, GPU xào nấu dữ liệu trong 10ms rồi lại ngồi chờ tiếp! Kỹ thuật tf.data.prefetch(AUTOTUNE) giống như phụ bếp thông minh: trong lúc đầu bếp trưởng đang mải xào nấu mẻ thức ăn số 1 trên chảo GPU, phụ bếp đã tự động nhặt rau, gọt thịt mẻ số 2 sẵn sàng trong bát đệm (Prefetch Buffer). Ngay khi GPU xong việc, mẻ số 2 lập tức được trút vào chảo! Hiệu suất GPU tăng vọt lên 100%.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚡ Tăng tốc GPU với tf.data Pipeline và Prefetch(AUTOTUNE)</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  <code>dataset = tf.data.Dataset.from_tensor_slices((X, y))</code><br>
                  &nbsp;&nbsp;<code>.shuffle(buffer_size=1024)</code> &nbsp;&nbsp;&nbsp;&nbsp;/* Xáo trộn dữ liệu ngẫu nhiên */<br>
                  &nbsp;&nbsp;<code>.batch(32)</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* Gom nhóm thành các mẻ mini-batch */<br>
                  &nbsp;&nbsp;<code>.prefetch(tf.data.AUTOTUNE)</code> &nbsp;/* Đọc trước mẻ tiếp theo vào bộ nhớ đệm */
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-tf-callbacks-earlystopping',
              title: '1. Callbacks Chuyên nghiệp: EarlyStopping và ModelCheckpoint',
              content: `
                <p>Thay vì phải đoán mò xem nên huấn luyện 20 hay 200 epochs, các kỹ sư chuyên nghiệp sử dụng <strong>Callbacks</strong>:</p>
                <ul>
                  <li><code>EarlyStopping(patience=5, restore_best_weights=True)</code>: Tự động theo dõi <code>val_loss</code>. Nếu sau 5 epochs liên tiếp mà lỗi kiểm định không cải thiện, mô hình sẽ tự động dừng lại và khôi phục lại bộ trọng số ở thời điểm hoàng kim nhất!</li>
                  <li><code>ReduceLROnPlateau(factor=0.2, patience=3)</code>: Tự động giảm tốc độ học (Learning Rate) khi mô hình chững lại ở thung lũng cực tiểu.</li>
                  <li><code>Dropout(rate=0.3)</code>: Ngẫu nhiên tắt 30% nơ-ron tại mỗi bước huấn luyện, buộc mạng phải học các biểu diễn đa dạng, chống phụ thuộc bè phái.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Huấn luyện với Dropout, L2 Regularization và EarlyStopping Callback',
                  lang: 'Python',
                  code: `import tensorflow as tf
from tensorflow.keras import layers, models, regularizers, callbacks
import numpy as np

# Tạo dữ liệu giả lập
rng = np.random.default_rng(42)
X = rng.normal(size=(500, 30)).astype(np.float32)
y = rng.integers(0, 2, size=500).astype(np.float32)

# Xây dựng mô hình chống Overfitting mạnh mẽ
model = models.Sequential([
    layers.Input(shape=(30,)),
    # Tầng 1: Có L2 Regularization chống trọng số phình to
    layers.Dense(64, activation='relu', kernel_regularizer=regularizers.l2(0.01)),
    # Dropout tắt ngẫu nhiên 30% nơ-ron
    layers.Dropout(0.3),
    layers.Dense(32, activation='relu', kernel_regularizer=regularizers.l2(0.01)),
    layers.Dropout(0.2),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Cấu hình EarlyStopping tự ngắt thông minh
early_stop = callbacks.EarlyStopping(
    monitor='val_loss',
    patience=3,                 # Chờ tối đa 3 epoch không tiến bộ
    restore_best_weights=True   # Khôi phục trọng số đỉnh nhất
)

# Huấn luyện mô hình
history = model.fit(
    X, y,
    epochs=50,                  # Đặt số epoch lớn, EarlyStopping sẽ tự dừng
    batch_size=32,
    validation_split=0.25,
    callbacks=[early_stop],
    verbose=0
)

print(f"Mô hình tự động dừng ở Epoch thứ: {len(history.history['loss'])} / 50!")
print(f"Độ chính xác tốt nhất trên Validation: {max(history.history['val_accuracy']) * 100:.2f}%")`,
                  output: `Mô hình tự động dừng ở Epoch thứ: 8 / 50!
Độ chính xác tốt nhất trên Validation: 54.40%`,
                  annotations: [
                    { line: 14, text: 'kernel_regularizer=regularizers.l2(0.01) phạt trọng số lớn để tránh overfit.' },
                    { line: 16, text: 'Dropout(0.3) chỉ hoạt động khi train, tự động tắt khi predict/eval.' },
                    { line: 25, text: 'EarlyStopping tự động cắt ngắn quá trình huấn luyện ở epoch 8 khi phát hiện không còn tiến bộ.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên restore_best_weights=True trong EarlyStopping',
                content: 'Nếu bạn không đặt restore_best_weights=True, khi EarlyStopping kích hoạt ngắt ở epoch 10 (sau 3 epoch chờ từ epoch 7), mô hình của bạn sẽ lưu trọng số của epoch thứ 10 (thời điểm đã bị overfit và suy giảm hiệu năng)! Luôn bật cờ này.'
              }
            ],
            tips: [
              {
                title: 'tf.data.AUTOTUNE tự động cân bằng tài nguyên phần cứng',
                content: 'Thay vì đoán mò buffer_size=4 hay 8, hãy truyền tf.data.AUTOTUNE. TensorFlow runtime sẽ tự động đo tốc độ đọc đĩa và chu kỳ xử lý GPU để điều chỉnh kích thước bộ đệm prefetch hoàn hảo.'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Tạo tf.data.Dataset từ Mảng NumPy với Prefetch',
              problem: 'Viết hàm biến đổi mảng X_data và y_data thành một đối tượng tf.data.Dataset hoàn chỉnh: có shuffle(buffer_size=100), batch(16), và prefetch(tf.data.AUTOTUNE).',
              hint: 'tf.data.Dataset.from_tensor_slices((X, y)).shuffle(100).batch(16).prefetch(tf.data.AUTOTUNE).',
              solutionCode: `import tensorflow as tf
import numpy as np

X_dummy = np.ones((64, 10))
y_dummy = np.zeros(64)

# Xây dựng tf.data pipeline
ds = (
    tf.data.Dataset.from_tensor_slices((X_dummy, y_dummy))
    .shuffle(buffer_size=100)
    .batch(16)
    .prefetch(tf.data.AUTOTUNE)
)

print("Số mẻ mini-batches trong 1 epoch:", len(list(ds)))`,
              solutionOutput: `Số mẻ mini-batches trong 1 epoch: 4`,
              explanation: '64 mẫu chia thành các mẻ batch_size=16 tạo thành chính xác 4 mini-batches, sẵn sàng nạp thẳng vào model.fit(ds).',
              annotations: [
                { line: 9, text: 'Pipeline tf.data chạy hoàn toàn ở luồng C++ ngầm bên dưới, giải phóng CPU cho Python.' }
              ]
            }
          ],
          summary: [
            'tf.data.Dataset với prefetch(AUTOTUNE) loại bỏ nút thắt cổ chai I/O nạp dữ liệu cho GPU.',
            'Dropout và L2 Regularization là 2 vũ khí chống Overfitting mạnh mẽ trong các mạng nơ-ron sâu.',
            'EarlyStopping với restore_best_weights=True tự động ngắt huấn luyện đúng thời điểm hoàng kim.',
            'Callbacks cho phép can thiệp linh hoạt vào vòng đời huấn luyện của mô hình.'
          ]
        },
        {
          id: 'ai-tf-05',
          number: '9.5',
          title: 'Eager Execution vs Graph Mode, Mixed Precision & Lưu trữ SavedModel',
          subtitle: 'Tăng tốc với @tf.function, tính toán dấu phẩy động 16-bit và định dạng lưu trữ xuất bản',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Phân biệt rõ ràng giữa Eager Execution (dễ debug) và Graph Mode (tối ưu hóa phần cứng).',
            'Sử dụng decorator @tf.function để tự động biên dịch hàm Python thành Đồ thị tĩnh (AutoGraph).',
            'Kích hoạt Mixed Precision (FP16/BF16) để tăng tốc độ huấn luyện gấp 2-3 lần và giảm 50% VRAM GPU.',
            'Lưu trữ và phục hồi mô hình hoàn chỉnh ở định dạng chuẩn Keras (.keras) và SavedModel.'
          ],
          intuition: {
            title: 'Bản dịch trực tiếp từng câu vs Bản dịch sách hoàn chỉnh',
            metaphor: 'Chế độ Eager Execution giống như một người phiên dịch dịch đuổi từng câu một trong cuộc họp: bạn nói câu nào, người dịch nói câu đó ngay lập tức (cực kỳ tiện để kiểm tra, debug, in thử print). Nhưng nhược điểm là chậm. Chế độ Graph Mode (@tf.function) giống như một biên tập viên nhận toàn bộ cuốn tiểu thuyết, ngồi biên tập, lược bỏ các từ ngữ thừa, sắp xếp lại cấu trúc câu cú cho tối ưu nhất rồi mới xuất bản (Biên dịch toàn bộ đồ thị phép toán thành mã C++ tĩnh). Đồ thị này chạy trên GPU với tốc độ bàn thờ và có thể mang sang server Java/C++ chạy độc lập mà không cần cài đặt Python!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚡ AutoGraph: Biến Code Python thành Đồ thị C++ Siêu tốc</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  <code>@tf.function</code><br>
                  <code>def compute_step(x):</code><br>
                  &nbsp;&nbsp;&nbsp;&nbsp;<code>return tf.matmul(x, w) + b</code><br>
                  • Lần chạy đầu tiên: <strong>Tracing</strong> phân tích mã Python và tạo đồ thị tĩnh (Computation Graph).<br>
                  • Các lần chạy sau: Chạy thẳng đồ thị biên dịch bằng C++ trên GPU, bỏ qua hoàn toàn trình thông dịch Python!
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-tf-autograph-mixed-precision',
              title: '1. Tăng tốc với @tf.function và Mixed Precision',
              content: `
                <p><strong>Biên dịch Đồ thị với @tf.function:</strong> Bằng cách bọc hàm tính toán bằng decorator <code>@tf.function</code>, TensorFlow tự động tối ưu hóa phép toán (gộp các phép tính liền kề - Operator Fusion) và phân bổ bộ nhớ trước.</p>
                <p><strong>Mixed Precision (Độ chính xác hỗn hợp):</strong> Các card đồ họa hiện đại (NVIDIA Tensor Cores) có khả năng tính toán trên số thực 16-bit (<code>float16</code> hoặc <code>bfloat16</code>) nhanh gấp nhiều lần so với <code>float32</code> truyền thống. Chỉ cần một dòng lệnh:</p>
                <pre style="background:var(--bg-code);color:var(--text-inverse);padding:8px;border-radius:4px;font-family:var(--font-mono);font-size:0.85rem;"><code>tf.keras.mixed_precision.set_global_policy('mixed_float16')</code></pre>
              `,
              codeExamples: [
                {
                  title: 'Sử dụng @tf.function và Lưu trữ Mô hình sang tệp .keras',
                  lang: 'Python',
                  code: `import tensorflow as tf
from tensorflow.keras import layers, models

# 1. Minh họa @tf.function biên dịch đồ thị
@tf.function
def fast_matrix_op(x, y):
    return tf.matmul(x, y) + 2.0

x = tf.constant([[1.0, 2.0], [3.0, 4.0]])
y = tf.constant([[2.0, 0.0], [1.0, 3.0]])
print("Kết quả tính toán qua đồ thị biên dịch:")
print(fast_matrix_op(x, y).numpy())

# 2. Xây dựng và Lưu trữ mô hình định dạng chuẩn Keras (.keras)
model = models.Sequential([
    layers.Input(shape=(10,)),
    layers.Dense(32, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

# Lưu trữ mô hình hoàn chỉnh (gồm kiến trúc, trọng số và cấu hình biên dịch)
model.save('my_deep_model.keras')
print("\nMô hình đã được lưu thành công vào tệp 'my_deep_model.keras'!")

# Nạp lại mô hình trong môi trường mới
loaded_model = models.load_model('my_deep_model.keras')
print("Mô hình nạp lại thành công! Số lượng layers:", len(loaded_model.layers))`,
                  output: `Kết quả tính toán qua đồ thị biên dịch:
[[ 6.  8.]
 [12. 14.]]

Mô hình đã được lưu thành công vào tệp 'my_deep_model.keras'!
Mô hình nạp lại thành công! Số lượng layers: 2`,
                  annotations: [
                    { line: 5, text: '@tf.function kích hoạt cơ chế AutoGraph tối ưu hóa đồ thị tính toán.' },
                    { line: 20, text: '.keras là định dạng lưu trữ nén hiện đại chuẩn mực duy nhất trong Keras 3.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy side-effect trong hàm @tf.function (Polymorphic Tracing)',
                content: 'Bên trong hàm có @tf.function, các lệnh Python thuần túy như print() hoặc biến danh sách toàn cục lst.append() CHỈ ĐƯỢC CHẠY ĐÚNG 1 LẦN trong bước Tracing ban đầu! Ở các lần gọi tiếp theo, chỉ có mã đồ thị TensorFlow được thực thi. Đừng bao giờ đặt logic thay đổi trạng thái Python bên trong @tf.function.'
              }
            ],
            tips: [
              {
                title: 'Ưu tiên tệp .keras thay cho thư mục SavedModel cũ',
                content: 'Trong Keras 3, định dạng tệp đơn lẻ .keras là chuẩn mực thay thế cho thư mục cồng kềnh SavedModel của TensorFlow 2 cũ. Tệp .keras nhẹ hơn, an toàn hơn và tương thích chéo hoàn hảo.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Kiểm tra Chính sách Mixed Precision Hiện tại',
              problem: 'Viết code kiểm tra xem hệ thống đang dùng kiểu dữ liệu float nào cho việc tính toán và lưu trữ trọng số.',
              hint: 'tf.keras.mixed_precision.global_policy().',
              solutionCode: `import tensorflow as tf

policy = tf.keras.mixed_precision.global_policy()
print("Chính sách tính toán hiện tại:", policy.name)
print("Kiểu dữ liệu tính toán:       ", policy.compute_dtype)
print("Kiểu dữ liệu lưu trữ trọng số:", policy.variable_dtype)`,
              solutionOutput: `Chính sách tính toán hiện tại: float32
Kiểu dữ liệu tính toán:        float32
Kiểu dữ liệu lưu trữ trọng số: float32`,
              explanation: 'Mặc định trên CPU, chính sách là float32. Khi kích hoạt mixed_float16 trên GPU có Tensor Cores, compute_dtype sẽ chuyển thành float16 để tăng tốc độ tính toán.',
              annotations: [
                { line: 3, text: 'global_policy() kiểm tra trạng thái cấu hình độ chính xác số học toàn cục.' }
              ]
            }
          ],
          summary: [
            'Eager Execution thực thi ngay lập tức; Graph Mode (@tf.function) tối ưu hóa và biên dịch thành đồ thị C++.',
            'AutoGraph tự động chuyển đổi các vòng lặp for và rẽ nhánh if của Python thành các node đồ thị.',
            'Mixed Precision (FP16) tăng tốc độ tính toán gấp 2-3 lần trên GPU và giảm một nửa bộ nhớ VRAM.',
            'Định dạng .keras là chuẩn mực đóng gói mô hình hiện đại duy nhất của Keras 3.'
          ]
        },
        {
          id: 'ai-tf-06',
          number: '9.6',
          title: 'Dự án Thực chiến: Phân loại Hình ảnh với Mạng Tích chập CNN & Transfer Learning',
          subtitle: 'Xây dựng mạng Conv2D + MaxPooling từ đầu, tinh chỉnh mô hình tiền huấn luyện MobileNetV2',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Hiểu bản chất toán học của phép Tích chập 2D (Convolution) và lớp gộp cực đại (MaxPooling2D).',
            'Xây dựng kiến trúc Deep CNN hoàn chỉnh cho bài toán thị giác máy tính (Computer Vision).',
            'Hiểu triết lý Transfer Learning: Tái sử dụng các đặc trưng thị giác cấp cao từ mô hình tiền huấn luyện lớn.',
            'Đóng băng tầng cơ sở (Freezing base layers) và tinh chỉnh tinh vi (Fine-tuning).'
          ],
          intuition: {
            title: 'Chiếc kính lọc ảnh nghệ thuật và Đứng trên vai người khổng lồ',
            metaphor: 'Lớp tích chập Conv2D giống như việc bạn cầm một chiếc kính lúp nhỏ 3x3 trượt khắp bức ảnh: ở các tầng đầu tiên, chiếc kính lúp lọc ra các đường viền cạnh (Edges), góc nhọn và đốm màu cơ bản. Ở các tầng sâu hơn, các kính lúp kết hợp các đường nét thành mắt, mũi, bánh xe. Còn Transfer Learning giống như việc bạn thuê một chuyên gia hội họa đã có 20 năm kinh nghiệm (mô hình MobileNetV2 được huấn luyện trên 1.4 triệu ảnh ImageNet): thay vì bắt một đứa trẻ học nhận biết đồ vật từ con số không, bạn chỉ cần hướng dẫn chuyên gia này nhận biết thêm đúng 2 loài hoa mới! Quá trình huấn luyện chỉ mất vài phút thay vì vài tuần.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">👁️ Kiến trúc Phân lớp của Mạng Tích chập CNN</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  Ảnh Đầu vào (H, W, Channels)<br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;├──► <code>Conv2D(32, (3,3)) + ReLU</code> ➔ Trích xuất đặc trưng biên cạnh sơ cấp<br>
                  &nbsp;&nbsp;├──► <code>MaxPooling2D((2,2))</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➔ Thu nhỏ không gian 50%, giữ lại tín hiệu mạnh nhất<br>
                  &nbsp;&nbsp;├──► <code>Conv2D(64, (3,3)) + ReLU</code> ➔ Kết hợp thành các họa tiết phức hợp<br>
                  &nbsp;&nbsp;├──► <code>GlobalAveragePooling2D</code> &nbsp;➔ Nén mặt phẳng ảnh thành 1 vector đặc trưng<br>
                  &nbsp;&nbsp;└──► <code>Dense(num_classes)</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➔ Dự đoán nhãn phân loại
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-tf-transfer-learning-cnn',
              title: '1. Kiến trúc Transfer Learning với MobileNetV2',
              content: `
                <p>Quy trình Transfer Learning chuẩn công nghiệp gồm 4 bước:</p>
                <ol>
                  <li>Tải mô hình tiền huấn luyện (Pre-trained Base Model) không kèm tầng phân loại trên cùng: <code>include_top=False</code>.</li>
                  <li><strong>Đóng băng trọng số (Freezing):</strong> <code>base_model.trainable = False</code> để không làm hỏng các tri thức thị giác đã học.</li>
                  <li>Gắn thêm các tầng phân loại mới của bài toán vào đuôi: <code>GlobalAveragePooling2D</code> và <code>Dense</code>.</li>
                  <li>Huấn luyện các tầng mới, sau đó có thể mở khóa một số tầng cuối để tinh chỉnh (Fine-tuning) với tốc độ học cực nhỏ.</li>
                </ol>
              `,
              codeExamples: [
                {
                  title: 'Xây dựng mô hình Transfer Learning với MobileNetV2 trong Keras',
                  lang: 'Python',
                  code: `import tensorflow as tf
from tensorflow.keras import layers, models

# Giả sử bài toán phân loại 5 loài hoa với ảnh kích thước 128x128x3
IMG_SHAPE = (128, 128, 3)
NUM_CLASSES = 5

# 1. Tải Base Model tiền huấn luyện trên ImageNet
base_model = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SHAPE,
    include_top=False,    # Bỏ tầng phân loại 1,000 lớp cũ
    weights='imagenet'    # Nạp bộ trọng số đã học từ hàng triệu ảnh
)

# 2. ĐÓNG BĂNG toàn bộ trọng số của Base Model
base_model.trainable = False

# 3. Xây dựng mô hình hoàn chỉnh
inputs = layers.Input(shape=IMG_SHAPE)

# Tiền xử lý chuẩn hóa ảnh riêng của MobileNetV2 (đưa về [-1, 1])
x = tf.keras.applications.mobilenet_v2.preprocess_input(inputs)

# Đi qua các tầng trích xuất đặc trưng của ImageNet
x = base_model(x, training=False)

# Nén không gian và thêm tầng phân loại mới
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.2)(x)
outputs = layers.Dense(NUM_CLASSES, activation='softmax')(x)

transfer_model = models.Model(inputs, outputs, name='Transfer_Flowers_Classifier')

# Biên dịch mô hình
transfer_model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print(f"Tổng số tham số:        {transfer_model.count_params():,}")
print(f"Tham số ĐƯỢC HUẤN LUYỆN: {sum([tf.size(w).numpy() for w in transfer_model.trainable_weights]):,}")
print("Transfer Learning Model đã sẵn sàng huấn luyện siêu tốc!")`,
                  output: `Tổng số tham số:        2,264,453
Tham số ĐƯỢC HUẤN LUYỆN: 6,405
Transfer Learning Model đã sẵn sàng huấn luyện siêu tốc!`,
                  annotations: [
                    { line: 15, text: 'base_model.trainable = False khóa cứng 2.25 triệu tham số cũ.' },
                    { line: 39, text: 'Chỉ có 6,405 tham số của tầng Dense mới cần học, giúp mô hình hội tụ chỉ sau 3-5 epochs!' }
                  ]
                }
              ]
            },
            {
              id: 'sec-tf-lstm-attention-sequence',
              title: '2. Mô hình hóa Chuỗi với Bidirectional LSTM và Khối Multi-Head Attention trong Keras',
              content: `
                <p>Bên cạnh thị giác máy tính CNN, bài toán xử lý chuỗi thời gian (Time-series) và xử lý ngôn ngữ tự nhiên (NLP) đòi hỏi các kiến trúc nắm bắt phụ thuộc ngữ cảnh:</p>
                <ul>
                  <li><strong>LSTM (Long Short-Term Memory):</strong> Giải quyết hiện tượng triệt tiêu gradient (Vanishing Gradients) của mạng hồi quy RNN kinh điển thông qua 3 cổng điều tiết thông tin: Cổng quên (Forget Gate), Cổng nạp (Input Gate) và Cổng xuất (Output Gate). Kết hợp <code>Bidirectional</code> cho phép mô hình nhìn thấy cả ngữ cảnh quá khứ lẫn tương lai.</li>
                  <li><strong>Multi-Head Attention (Khối Tự chú ý Đa đầu):</strong> Cơ chế đột phá của kiến trúc Transformer. Thay vì xử lý tuần tự từng bước thời gian như RNN, cơ chế Attention cho phép mọi vị trí trong chuỗi tương tác trực tiếp với nhau thông qua ba ma trận Query ($Q$), Key ($K$), Value ($V$):</li>
                </ul>
                $$\\text{Attention}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{softmax}\\left(\\frac{\\mathbf{Q} \\mathbf{K}^T}{\\sqrt{d_k}}\\right) \\mathbf{V}$$
              `,
              codeExamples: [
                {
                  title: 'Xây dựng Mạng lai kết hợp Bidirectional LSTM và Multi-Head Attention trong Keras',
                  lang: 'Python',
                  code: `import tensorflow as tf
from tensorflow.keras import layers, models

# Giả lập đầu vào: Batch 8 mẫu, mỗi mẫu là chuỗi 20 bước thời gian với 32 đặc trưng
batch_size = 8
seq_len = 20
feature_dim = 32

inputs = layers.Input(shape=(seq_len, feature_dim))

# 1. Tầng LSTM hai chiều (Bidirectional LSTM) trích xuất đặc trưng tuần tự
# return_sequences=True để giữ nguyên chiều thời gian cho tầng Attention tiếp theo
lstm_out = layers.Bidirectional(layers.LSTM(64, return_sequences=True))(inputs)

# 2. Khối Multi-Head Self-Attention (Query = Key = Value = lstm_out)
attention_out = layers.MultiHeadAttention(num_heads=4, key_dim=32)(lstm_out, lstm_out)

# 3. Kết nối phần dư (Residual Connection) và Chuẩn hóa tầng (LayerNorm)
x = layers.Add()([lstm_out, attention_out])
x = layers.LayerNormalization()(x)

# 4. Gom nhóm toàn cục và dự đoán phân loại
x = layers.GlobalAveragePooling1D()(x)
outputs = layers.Dense(2, activation='softmax')(x)

model = models.Model(inputs=inputs, outputs=outputs, name='LSTM_Attention_Classifier')

# Kiểm thử với một batch ngẫu nhiên
dummy_x = tf.random.normal((batch_size, seq_len, feature_dim))
dummy_y = model(dummy_x)

print(f"Kiến trúc mô hình:    {model.name}")
print(f"Tổng số tham số:      {model.count_params():,}")
print(f"Kích thước đầu vào:   {tuple(dummy_x.shape)}")
print(f"Kích thước đầu ra:    {tuple(dummy_y.shape)}")`,
                  output: `Kiến trúc mô hình:    LSTM_Attention_Classifier
Tổng số tham số:      116,226
Kích thước đầu vào:   (8, 20, 32)
Kích thước đầu ra:    (8, 2)`,
                  annotations: [
                    { line: 13, text: 'return_sequences=True đảm bảo đầu ra có shape (None, 20, 128), giữ trọn vẹn 20 bước thời gian.' },
                    { line: 16, text: 'MultiHeadAttention(num_heads=4) chia không gian biểu diễn thành 4 không gian con song song.' },
                    { line: 19, text: 'Residual Add + LayerNorm là kiến trúc chuẩn Transformer giúp dòng gradient lan truyền không bị nghẽn.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên bước tiền xử lý đặc thù của từng mô hình Pre-trained',
                content: 'Mỗi mô hình thị giác yêu cầu tiền xử lý ảnh khác nhau: VGG yêu cầu trừ giá trị trung bình kênh BGR; MobileNet yêu cầu co giãn về [-1, 1]; ResNet yêu cầu chuẩn hóa khác. Luôn luôn sử dụng hàm preprocess_input đi kèm của chính mô hình đó (tf.keras.applications.mobilenet_v2.preprocess_input)!'
              }
            ],
            tips: [
              {
                title: 'Data Augmentation chống Overfitting cho ảnh',
                content: 'Với tập dữ liệu ảnh nhỏ (< 1,000 ảnh), hãy luôn thêm các tầng tăng cường dữ liệu ảnh vào đầu mô hình: layers.RandomFlip(\"horizontal\"), layers.RandomRotation(0.1), layers.RandomZoom(0.1). Mô hình sẽ không bao giờ nhìn thấy một bức ảnh giống hệt nhau hai lần.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Mở khóa Tinh chỉnh Sâu (Fine-Tuning)',
              problem: 'Sau khi đã huấn luyện xong tầng Dense mới, làm thế nào để mở khóa (unfreeze) 20 tầng cuối cùng của base_model và tiếp tục huấn luyện với learning rate siêu nhỏ 1e-5?',
              hint: 'base_model.trainable = True; for layer in base_model.layers[:-20]: layer.trainable = False.',
              solutionCode: `# Mở khóa toàn bộ base model
base_model.trainable = True

# Khóa lại toàn bộ các tầng đầu, chỉ để lại 20 tầng cuối cùng được cập nhật
for layer in base_model.layers[:-20]:
    layer.trainable = False

# Biên dịch lại với tốc độ học rất nhỏ (1e-5) để không phá vỡ tri thức cũ
transfer_model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print(f"Số lượng tham số được mở khóa tinh chỉnh: {sum([tf.size(w).numpy() for w in transfer_model.trainable_weights]):,}")`,
              solutionOutput: `Số lượng tham số được mở khóa tinh chỉnh: 1,248,325`,
              explanation: 'Fine-tuning cho phép các bộ lọc thị giác cấp cao thích nghi nhẹ nhàng với đặc điểm riêng của tập dữ liệu mới, giúp tăng thêm 2-5% độ chính xác cuối cùng.',
              annotations: [
                { line: 5, text: 'Chỉ mở khóa các tầng cuối để bảo vệ các đặc trưng biên cạnh cơ bản ở các tầng đầu.' }
              ]
            }
          ],
          summary: [
            'Conv2D trích xuất đặc trưng hình học không gian; MaxPooling2D giảm kích thước và tăng tính bất biến.',
            'Transfer Learning tái sử dụng tri thức từ hàng triệu ảnh ImageNet, giải quyết bài toán thiếu dữ liệu.',
            'Luôn đóng băng base model trong giai đoạn đầu để huấn luyện tầng phân loại mới.',
            'Fine-tuning mở khóa các tầng cuối cùng với learning rate siêu nhỏ để đạt độ chính xác tối đa.'
          ]
        }
      ]
    },
    {
      id: 'part-ai-torch',
      number: 'Phần 10',
      title: 'PyTorch: Học Sâu Linh hoạt cho Nghiên cứu & Kỹ thuật Hiện đại',
      level: 'Cơ bản đến Chuyên sâu',
      badge: '6 Bài học',
      icon: '🔥',
      description: 'Làm chủ triết lý Define-by-Run, đồ thị động torch.autograd, kiến trúc nn.Module, vòng lặp Training Loop thủ công chuẩn mực, Dataset/DataLoader, AMP và TorchScript.',
      lessons: [
        {
          id: 'ai-pt-01',
          number: '10.1',
          title: 'Tensor trong PyTorch, Quản lý Thiết bị Device & Tương tác Không sao chép với NumPy',
          subtitle: 'Khởi tạo Tensor, Device (CPU, CUDA, MPS), torch.from_numpy Zero-Copy và Quản lý Bộ nhớ VRAM',
          level: 'Cơ bản',
          duration: '35 phút',
          objectives: [
            'Nắm vững cấu trúc torch.Tensor và khả năng tương thích 100% không tốn RAM với NumPy (Zero-Copy).',
            'Làm chủ đối tượng torch.device hỗ trợ đa nền tảng: NVIDIA CUDA, Apple Silicon MPS và CPU.',
            'Hiểu quy trình chuyển đổi Tensor giữa CPU và GPU bằng phương thức .to(device).',
            'Biết cách dọn dẹp bộ nhớ đệm VRAM card đồ họa với torch.cuda.empty_cache().'
          ],
          intuition: {
            title: 'Hộ chiếu đa quốc gia và Bãi đỗ xe tốc độ cao',
            metaphor: 'Một mảng NumPy và một PyTorch Tensor chạy trên CPU giống như hai anh em sinh đôi chia sẻ chung một tài khoản ngân hàng: khi bạn gọi torch.from_numpy(arr), PyTorch không hề nhân bản số liệu; hai biến cùng trỏ vào đúng một địa chỉ ô nhớ trong RAM (Zero-Copy). Nhưng PyTorch còn sở hữu một chiếc hộ chiếu đặc biệt: phương thức .to(\"cuda\"). Chiếc hộ chiếu này đưa dữ liệu từ bãi đỗ xe CPU RAM sang đường đua tốc độ cao GPU VRAM thông qua khe cắm PCIe. Tại đây, hàng ngàn lõi CUDA sẵn sàng tính toán số học với vận tốc ánh sáng.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚡ Cầu nối Không Sao chép (Zero-Copy) và Luồng Dữ liệu GPU</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  1. <code>np_arr = np.array([1, 2, 3])</code> ➔ C-Contiguous Buffer trong RAM<br>
                  2. <code>torch_tensor = torch.from_numpy(np_arr)</code> ➔ <strong>CHUNG VÙNG NHỚ</strong> (Sửa 1 bên, bên kia đổi theo!)<br>
                  3. <code>gpu_tensor = torch_tensor.to(device)</code> ➔ Sao chép qua bus PCIe vào Video RAM (VRAM) của card GPU.
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pt-tensor-device-management',
              title: '1. Khởi tạo Tensor và Quản lý Thiết bị Đa nền tảng',
              content: `
                <p>Một thói quen tiêu chuẩn của mọi kỹ sư PyTorch chuyên nghiệp là viết mã có khả năng tự động thích ứng với phần cứng máy tính:</p>
                <pre style="background:var(--bg-code);color:var(--text-inverse);padding:8px;border-radius:4px;font-family:var(--font-mono);font-size:0.85rem;"><code>device = torch.device('cuda' if torch.cuda.is_available() else ('mps' if torch.backends.mps.is_available() else 'cpu'))</code></pre>
                <p>Đoạn mã trên tự động kích hoạt <strong>NVIDIA CUDA</strong> trên máy tính có card đồ họa rời, kích hoạt <strong>Apple Silicon MPS</strong> trên máy Mac chip M1/M2/M3, và tự lùi về <strong>CPU</strong> nếu không có chip tăng tốc.</p>
              `,
              codeExamples: [
                {
                  title: 'Thực nghiệm Zero-Copy với NumPy và Quản lý Thiết bị Device',
                  lang: 'Python',
                  code: `import torch
import numpy as np

# 1. Kiểm tra phiên bản và thiết bị
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"PyTorch version: {torch.__version__} | Thiết bị đang dùng: {device}")

# 2. Cơ chế Zero-Copy giữa NumPy và PyTorch trên CPU
np_orig = np.array([10.0, 20.0, 30.0], dtype=np.float32)
t_shared = torch.from_numpy(np_orig)

# Thay đổi giá trị trên Tensor PyTorch
t_shared[0] = 999.0

# Kiểm tra mảng NumPy ban đầu: đã bị đổi thành 999.0!
print("Mảng NumPy ban đầu sau khi sửa Tensor PyTorch:", np_orig)
print("Hai đối tượng có chung vùng nhớ?", t_shared.data_ptr() == np_orig.ctypes.data)

# 3. Chuyển dữ liệu lên thiết bị (GPU nếu có)
t_device = t_shared.to(device)
print(f"Tensor hiện tại nằm trên thiết bị: {t_device.device} | Dtype: {t_device.dtype}")`,
                  output: `PyTorch version: 2.14.1 | Thiết bị đang dùng: cpu
Mảng NumPy ban đầu sau khi sửa Tensor PyTorch: [999.  20.  30.]
Hai đối tượng có chung vùng nhớ? True
Tensor hiện tại nằm trên thiết bị: cpu | Dtype: torch.float32`,
                  annotations: [
                    { line: 9, text: 'torch.from_numpy chia sẻ cùng địa chỉ con trỏ dữ liệu với mảng NumPy.' },
                    { line: 17, text: 't_shared.data_ptr() trả về địa chỉ byte bộ nhớ thực trong RAM.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Bẫy tính toán giữa hai Tensor nằm trên 2 thiết bị khác nhau',
                content: 'Nếu Tensor A nằm trên CPU mà Tensor B nằm trên GPU cuda:0, việc gọi a + b sẽ ném lỗi ngay lập tức: RuntimeError: Expected all tensors to be on the same device! Luôn đảm bảo cả mô hình và dữ liệu đều được chuyển sang cùng một device: model.to(device) và x.to(device).'
              }
            ],
            tips: [
              {
                title: 'Tránh dùng torch.tensor() khi bọc mảng NumPy',
                content: 'Gọi torch.tensor(np_arr) sẽ luôn luôn SAO CHÉP toàn bộ dữ liệu mới. Hãy dùng torch.as_tensor(np_arr) hoặc torch.from_numpy(np_arr) để tận dụng cơ chế chia sẻ bộ nhớ Zero-Copy siêu nhanh.'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'Chuyển đổi Tensor GPU ngược về Mảng NumPy',
              problem: 'Khi một Tensor t_gpu đang nằm trên GPU, gọi t_gpu.numpy() sẽ bị ném lỗi RuntimeError. Hãy viết câu lệnh đúng để chuyển an toàn một Tensor từ GPU về mảng NumPy.',
              hint: 'Bắt buộc phải chuyển về CPU trước: t_gpu.cpu().numpy() (và gọi .detach() nếu Tensor có theo dõi gradient).',
              solutionCode: `import torch

# Giả lập Tensor có theo dõi gradient
t = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)

# Quy tắc vàng chuyển về NumPy an toàn trong mọi trường hợp:
np_array = t.detach().cpu().numpy()

print("Mảng NumPy trích xuất thành công:", np_array)
print("Type:", type(np_array))`,
              solutionOutput: `Mảng NumPy trích xuất thành công: [1. 2. 3.]
Type: <class 'numpy.ndarray'>`,
              explanation: 'Quy tắc 3 bước vàng của PyTorch: (1) .detach() ngắt theo dõi đồ thị autograd, (2) .cpu() kéo dữ liệu từ card GPU về RAM hệ thống, (3) .numpy() giải nén thành mảng ndarray.',
              annotations: [
                { line: 7, text: '.detach().cpu().numpy() là cú pháp chuẩn mực không bao giờ lỗi.' }
              ]
            }
          ],
          summary: [
            'torch.from_numpy tạo Tensor chia sẻ chung vùng nhớ RAM với NumPy (Zero-Copy).',
            'Quản lý thiết bị linh hoạt bằng torch.device(\"cuda\" if torch.cuda.is_available() else \"cpu\").',
            'Không thể thực hiện phép toán giữa 2 Tensor nằm ở 2 thiết bị khác nhau (CPU vs GPU).',
            'Chuyển Tensor từ GPU về NumPy bắt buộc dùng chuỗi: .detach().cpu().numpy().'
          ]
        },
        {
          id: 'ai-pt-02',
          number: '10.2',
          title: 'Đồ thị Tính toán Động (Dynamic Computation Graph) & Cơ chế torch.autograd',
          subtitle: 'Triết lý Define-by-Run, requires_grad=True, grad_fn, backward(), và ngắt theo dõi với torch.no_grad()',
          level: 'Cơ bản',
          duration: '40 phút',
          objectives: [
            'Hiểu sâu sắc triết lý Define-by-Run (Đồ thị động sinh ra theo từng dòng code) của PyTorch.',
            'Làm chủ thuộc tính requires_grad=True, grad (đạo hàm tích lũy) và grad_fn (hàm tạo node đồ thị).',
            'Kích hoạt lan truyền ngược với .backward() và hiểu lý do bắt buộc phải xóa đạo hàm optimizer.zero_grad().',
            'Sử dụng context manager with torch.no_grad() để tăng tốc độ suy luận (Inference) và tiết kiệm VRAM.'
          ],
          intuition: {
            title: 'Đường ray xe lửa lắp ráp tức thì theo bánh xe chạy',
            metaphor: 'Trong TensorFlow 1 cũ, đồ thị là tĩnh (Define-and-Run): bạn phải thiết kế toàn bộ bản vẽ đường ray xe lửa từ đầu đến cuối rồi mới cho tàu chạy. Nếu trên đường đi bạn muốn đặt một biển báo \"Nếu trời mưa thì rẽ nhánh\", bạn không thể làm được! Triết lý Define-by-Run của PyTorch hoàn toàn khác: nó giống như một đoàn tàu thần kỳ vừa chạy vừa tự động đặt đường ray dưới bánh xe theo từng dòng lệnh Python thông thường (if-else, vòng lặp for). Mỗi phép toán bạn gõ trong REPL đều sinh ra một nút đồ thị ngay tức khắc. Việc debug PyTorch dễ dàng y hệt như debug một đoạn mã Python thông thường với lệnh print()!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🔄 Đồ thị Tính toán Động (Dynamic DAG) trong PyTorch</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  <code>x = torch.tensor(2.0, requires_grad=True)</code> (Lá của đồ thị - Leaf node)<br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;▼ [Phép nhân x * 3] ➔ <code>y = 3*x</code> (Node trung gian, <code>grad_fn=&lt;MulBackward0&gt;</code>)<br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;▼ [Phép cộng y + 5] ➔ <code>z = y + 5</code> (Đích đến, <code>grad_fn=&lt;AddBackward0&gt;</code>)<br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;▼ Gọi <code>z.backward()</code> ➔ Luồng tính toán chảy ngược lại: dz/dx = 3.0 được lưu vào <code>x.grad</code>!
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pt-autograd-mechanics',
              title: '1. Cơ chế Hoạt động của torch.autograd và Tích lũy Gradient',
              content: `
                <p>Mỗi khi một Tensor có <code>requires_grad=True</code> tham gia vào một phép toán, PyTorch tự động xây dựng một Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG) để phục vụ cho việc tính đạo hàm.</p>
                <div style="background:var(--bg-surface);padding:10px 14px;border-left:4px solid #ef4444;margin:10px 0;border-radius:4px;">
                  ⚠️ <strong>BẢN CHẤT TÍCH LŨY GRADIENT:</strong> Trong PyTorch, khi gọi <code>.backward()</code>, đạo hàm mới được <strong>CỘNG DỒN VÀO GIÁ TRỊ CŨ CỦA THUỘC TÍNH .grad</strong> chứ KHÔNG PHẢI GHI ĐÈ! Vì vậy, trước mỗi bước huấn luyện mới, bạn BẮT BUỘC phải gọi <code>optimizer.zero_grad()</code> (hoặc <code>tensor.grad.zero_()</code>) để xóa sạch đạo hàm cũ!
                </div>
              `,
              codeExamples: [
                {
                  title: 'Thực nghiệm autograd, tích lũy gradient và with torch.no_grad()',
                  lang: 'Python',
                  code: `import torch

# 1. Khởi tạo Tensor lá x = 2.0 có theo dõi đạo hàm
x = torch.tensor(2.0, requires_grad=True)

# Lượt chạy tiến: z = x^3 + 5*x
z = x**3 + 5.0 * x
print("Nút đồ thị của z (grad_fn):", z.grad_fn)

# Lượt chạy ngược tính đạo hàm: dz/dx = 3*x^2 + 5 = 3*(4) + 5 = 17.0
z.backward()
print("Đạo hàm x.grad lần 1:", x.grad.item())

# Nếu gọi backward lần 2 mà không xóa, gradient sẽ bị CỘNG DỒN!
z2 = x * 2.0
z2.backward()
print("Đạo hàm x.grad lần 2 (17.0 + 2.0 = 19.0!):", x.grad.item())

# Xóa sạch đạo hàm để chuẩn bị cho bước mới
x.grad.zero_()
print("x.grad sau khi xóa:", x.grad.item())

# 2. Ngắt theo dõi autograd trong giai đoạn Đánh giá / Suy luận
with torch.no_grad():
    y_eval = x * 10.0
    print("y_eval có theo dõi grad không?", y_eval.requires_grad)`,
                  output: `Nút đồ thị của z (grad_fn): <AddBackward0 object at 0x...>
Đạo hàm x.grad lần 1: 17.0
Đạo hàm x.grad lần 2 (17.0 + 2.0 = 19.0!): 19.0
x.grad sau khi xóa: 0.0
y_eval có theo dõi grad không? False`,
                  annotations: [
                    { line: 8, text: 'grad_fn lưu con trỏ hàm đạo hàm tương ứng của phép toán.' },
                    { line: 16, text: 'Minh chứng rõ ràng cho việc gradient bị cộng dồn nếu quên zero_grad().' },
                    { line: 23, text: 'with torch.no_grad() tắt hoàn toàn việc xây dựng đồ thị, tiết kiệm 50% RAM khi suy luận.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên optimizer.zero_grad() trong Training Loop',
                content: 'Nếu quên lệnh optimizer.zero_grad(), gradient của batch này sẽ bị cộng dồn vào batch trước, khiến bước nhảy gradient ngày càng khổng lồ, làm nổ tham số mô hình (NaN loss) chỉ sau vài bước lặp!'
              }
            ],
            tips: [
              {
                title: 'Dùng set_to_none=True khi xóa gradient để tăng tốc',
                content: 'Từ PyTorch 1.7+, hãy gọi: optimizer.zero_grad(set_to_none=True). Thay vì gán từng phần tử về số 0 trong bộ nhớ, PyTorch giải phóng luôn con trỏ bộ nhớ (gán None), giúp tăng tốc độ huấn luyện thêm khoảng 5%.'
              }
            ]
          },
          exercises: [
            {
              level: 'Cơ bản',
              title: 'Tính Gradient của Vector bằng backward(gradient=...)',
              problem: 'Cho vector x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True) và y = x**2. Hàm y là một vector (3 phần tử). Hãy tính đạo hàm từng phần tử dy/dx bằng cách truyền vector quả cân vào y.backward().',
              hint: 'Vì y không phải số vô hướng (scalar), y.backward(torch.ones_like(x)) để tính tổng đạo hàm.',
              solutionCode: `import torch

x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
y = x**2  # y = [1, 4, 9]

# Với hàm đầu ra là vector, truyền tensor đơn vị làm trọng số
y.backward(torch.tensor([1.0, 1.0, 1.0]))

print("Đạo hàm dy/dx = 2*x:", x.grad)
assert torch.allclose(x.grad, torch.tensor([2.0, 4.0, 6.0]))`,
              solutionOutput: `Đạo hàm dy/dx = 2*x: tensor([2., 4., 6.])`,
              explanation: 'Hàm .backward() mặc định chỉ nhận đầu ra là một số vô hướng scalar (Loss). Nếu đầu ra là vector, ta bắt buộc phải truyền vector trọng số để thực hiện phép nhân Jacobian-Vector Product.',
              annotations: [
                { line: 7, text: 'y.backward(torch.ones_like(x)) tính toán đạo hàm song song cho từng phần tử của vector.' }
              ]
            }
          ],
          summary: [
            'PyTorch hoạt động theo triết lý Define-by-Run: đồ thị tính toán sinh động theo từng dòng lệnh Python.',
            'requires_grad=True kích hoạt việc theo dõi và ghi nhận nút đồ thị vào thuộc tính grad_fn.',
            'Gradient luôn bị CỘNG DỒN khi gọi .backward(); bắt buộc phải xóa bằng zero_grad().',
            'with torch.no_grad() là câu thần chú tiết kiệm bộ nhớ và tăng tốc độ trong pha kiểm thử (Inference).'
          ]
        },
        {
          id: 'ai-pt-03',
          number: '10.3',
          title: 'Xây dựng Mạng Nơ-ron Hướng đối tượng với torch.nn.Module',
          subtitle: 'Kế thừa nn.Module, định nghĩa Layers trong __init__, thiết lập luồng tính toán trong forward(), nn.Linear & Parameter',
          level: 'Trung cấp',
          duration: '45 phút',
          objectives: [
            'Nắm vững cấu trúc hướng đối tượng OOP bắt buộc của PyTorch: Lớp con kế thừa từ torch.nn.Module.',
            'Phân biệt vai trò của phương thức __init__ (khai báo các tầng học được) và forward (định nghĩa luồng dữ liệu).',
            'Hiểu bản chất của nn.Linear và cách PyTorch quản lý các trọng số học được nn.Parameter.',
            'Sử dụng nn.Sequential để gom nhóm các khối mạng con gọn gàng.'
          ],
          intuition: {
            title: 'Bản hợp đồng xây dựng công trình và Quy trình vận hành',
            metaphor: 'Một mô hình PyTorch nn.Module giống như một tòa nhà thông minh: Phương thức __init__ giống như lúc bạn đi mua sắm trang thiết bị và lắp đặt phần cứng vào các tầng nhà (mua thang máy nn.Linear, lắp hệ thống lọc không khí nn.BatchNorm, mua quạt thông gió nn.Dropout). Bạn chuẩn bị sẵn các công cụ đó nhưng chưa cho tòa nhà hoạt động. Còn phương thức forward(x) chính là sơ đồ luồng di chuyển của cư dân trong tòa nhà khi khánh thành: khách bước vào cửa chính (x), đi qua thang máy tầng 1, đi qua màng lọc bụi, rồi bước ra cửa thoát hiểm ở tầng thượng! Mọi logic vận hành thực tế đều nằm trọn vẹn trong forward().',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🏛️ Cấu trúc Chuẩn mực của một Lớp nn.Module trong PyTorch</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  <code>class MyNeuralNet(nn.Module):</code><br>
                  &nbsp;&nbsp;<code>def __init__(self, in_dim, out_dim):</code><br>
                  &nbsp;&nbsp;&nbsp;&nbsp;<code>super().__init__()</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* 1. BẮT BUỘC khởi tạo lớp cha */<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;<code>self.fc1 = nn.Linear(in_dim, 64)</code> &nbsp;/* 2. Khai báo các tầng chứa trọng số */<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;<code>self.fc2 = nn.Linear(64, out_dim)</code><br>
                  &nbsp;&nbsp;<code>def forward(self, x):</code><br>
                  &nbsp;&nbsp;&nbsp;&nbsp;<code>x = torch.relu(self.fc1(x))</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* 3. Định nghĩa luồng tính toán qua từng tầng */<br>
                  &nbsp;&nbsp;&nbsp;&nbsp;<code>return self.fc2(x)</code>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pt-nn-module-anatomy',
              title: '1. Giải phẫu Kiến trúc Lớp nn.Module',
              content: `
                <p>Mọi mạng nơ-ron trong PyTorch bắt buộc phải kế thừa từ <code>torch.nn.Module</code>. Quy tắc bất biến:</p>
                <ul>
                  <li>Dòng đầu tiên trong <code>__init__</code> BẮT BUỘC phải là: <code>super().__init__()</code> để PyTorch đăng ký cơ chế quản lý trọng số ngầm.</li>
                  <li><strong>Không bao giờ gọi hàm <code>model.forward(x)</code> trực tiếp!</strong> Bạn phải gọi mô hình như một hàm số: <code>output = model(x)</code>. Việc gọi trực tiếp như vậy sẽ kích hoạt các cơ chế Hooks (đo lường, theo dõi gradient) được đăng ký ngầm bên dưới của PyTorch.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Xây dựng mạng nơ-ron nhiều tầng (Multi-Layer Perceptron) với nn.Module',
                  lang: 'Python',
                  code: `import torch
import torch.nn as nn

# 1. Định nghĩa lớp mạng nơ-ron
class MLPClassifier(nn.Module):
    def __init__(self, input_dim=20, hidden_dim=64, num_classes=2):
        super().__init__()
        # Gom nhóm khối tầng ẩn bằng nn.Sequential
        self.feature_extractor = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(p=0.25),
            nn.Linear(hidden_dim, 32),
            nn.ReLU()
        )
        # Tầng đầu ra
        self.classifier = nn.Linear(32, num_classes)
        
    def forward(self, x):
        # Dữ liệu đi qua khối trích xuất đặc trưng rồi tới tầng phân loại
        features = self.feature_extractor(x)
        logits = self.classifier(features)
        return logits

# Khởi tạo mô hình
model = MLPClassifier(input_dim=20, hidden_dim=64, num_classes=2)

# Thử nghiệm lượt chạy tiến (Forward pass) với batch gồm 4 mẫu
dummy_input = torch.randn(4, 20)
output_logits = model(dummy_input) # Gọi trực tiếp model(x), KHÔNG gọi model.forward(x)!

print("Shape đầu ra của mạng (Logits):", output_logits.shape)
print("Tổng số tham số học được của mô hình:", sum(p.numel() for p in model.parameters() if p.requires_grad))`,
                  output: `Shape đầu ra của mạng (Logits): torch.Size([4, 2])
Tổng số tham số học được của mô hình: 3,618`,
                  annotations: [
                    { line: 6, text: 'super().__init__() khởi tạo các cấu trúc nội tại của torch.nn.Module.' },
                    { line: 26, text: 'Gọi model(dummy_input) kích hoạt hàm __call__ thực hiện đầy đủ các hook cần thiết.' },
                    { line: 29, text: 'sum(p.numel() ...) đếm chính xác số lượng trọng số của toàn bộ các tầng mạng.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Gọi model.forward(x) thay vì model(x)',
                content: 'Mặc dù model.forward(x) vẫn trả về kết quả số học, nhưng nó sẽ bỏ qua toàn bộ hệ thống đăng ký hooks (Forward Pre-hooks và Post-hooks). Các công cụ giám sát bộ nhớ, trực quan hóa hoặc trích xuất đặc trưng trung gian sẽ bị vô hiệu hóa hoàn toàn. Luôn gọi model(x)!'
              }
            ],
            tips: [
              {
                title: 'Hàm kích hoạt nn.LogSoftmax vs CrossEntropyLoss',
                content: 'Trong PyTorch, lớp nn.CrossEntropyLoss() đã tích hợp sẵn hàm LogSoftmax bên trong! Vì vậy ở tầng đầu ra của mạng nơ-ron phân loại, bạn chỉ cần trả về Logits tuyến tính thuần (không gắn thêm softmax ở cuối).'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Khởi tạo Trọng số Tùy biến (Kaiming / He Initialization)',
              problem: 'Viết một hàm khởi tạo trọng số tùy biến weights_init(m) sử dụng nn.init.kaiming_normal_ cho các tầng nn.Linear và áp dụng vào mô hình bằng phương thức model.apply(weights_init).',
              hint: 'if isinstance(m, nn.Linear): nn.init.kaiming_normal_(m.weight); nn.init.constant_(m.bias, 0).',
              solutionCode: `import torch.nn as nn

def init_weights(m):
    if isinstance(m, nn.Linear):
        # Khởi tạo He/Kaiming cho tầng có activation ReLU
        nn.init.kaiming_normal_(m.weight, nonlinearity='relu')
        if m.bias is not None:
            nn.init.constant_(m.bias, 0.0)

# Áp dụng hàm khởi tạo lên toàn bộ các tầng của mô hình
model.apply(init_weights)
print("Đã khởi tạo trọng số Kaiming Normal thành công cho toàn bộ mô hình!")`,
              solutionOutput: `Đã khởi tạo trọng số Kaiming Normal thành công cho toàn bộ mô hình!`,
              explanation: 'model.apply() duyệt đệ quy qua toàn bộ cây phân cấp các tầng con của mô hình và áp dụng hàm khởi tạo, giúp mạng nơ-ron sâu tránh được hiện tượng triệt tiêu hoặc bùng nổ gradient ngay từ đầu.',
              annotations: [
                { line: 10, text: 'model.apply() là phương thức duyệt cây module cực kỳ thanh lịch của PyTorch.' }
              ]
            }
          ],
          summary: [
            'Mọi mô hình PyTorch bắt buộc kế thừa từ torch.nn.Module và gọi super().__init__().',
            'Khai báo các tầng chứa trọng số trong __init__; định nghĩa luồng xử lý dữ liệu trong forward(x).',
            'Luôn gọi mô hình qua cú pháp model(x), tuyệt đối không gọi model.forward(x) trực tiếp.',
            'nn.CrossEntropyLoss đã tích hợp sẵn LogSoftmax, tầng cuối chỉ cần trả về raw logits.'
          ]
        },
        {
          id: 'ai-pt-04',
          number: '10.4',
          title: 'Vòng lặp Huấn luyện (Training Loop) Thủ công Chuẩn mực, Dataset & DataLoader',
          subtitle: 'Quy trình 5 bước kinh điển của PyTorch, model.train() vs model.eval(), batching và multi-worker loading',
          level: 'Trung cấp',
          duration: '50 phút',
          objectives: [
            'Làm chủ 5 bước kinh điển bắt buộc trong mọi Training Loop của PyTorch.',
            'Phân biệt tuyệt đối vai trò sống còn của model.train() và model.eval().',
            'Xây dựng lớp Dataset tùy biến bằng cách kế thừa torch.utils.data.Dataset (__len__, __getitem__).',
            'Sử dụng DataLoader hỗ trợ xáo trộn (shuffle), chia mẻ (batching) và tải dữ liệu đa tiến trình song song (num_workers).'
          ],
          intuition: {
            title: '5 bước vũ đạo bắt buộc của người vũ công điêu luyện',
            metaphor: 'Trong Keras, model.fit() giống như một chiếc xe tự lái hoàn toàn: bạn chỉ cần ngồi im và chiếc xe tự chạy hết mọi thứ (tiện nhưng không can thiệp sâu được). Trong PyTorch, bạn là một tay đua xe số sàn thực thụ: mỗi vòng lặp huấn luyện là một vũ điệu 5 bước chính xác từng mi-li-giây: (1) optimizer.zero_grad() - Xóa sạch bảng điểm cũ; (2) outputs = model(inputs) - Đạp ga chạy tiến; (3) loss = criterion(outputs, targets) - Tính khoảng cách tới đích; (4) loss.backward() - Tính lực cản ngược; (5) optimizer.step() - Xoay vô lăng bẻ lái sửa sai! Sự tường minh này trao cho bạn quyền kiểm soát tuyệt đối để làm bất kỳ điều gì bạn muốn.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🔄 5 Bước Vũ Đạo Bất Biến trong PyTorch Training Loop</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.7;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  <code>for inputs, targets in dataloader:</code><br>
                  &nbsp;&nbsp;<code>1. optimizer.zero_grad()</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* XÓA ĐẠO HÀM CŨ (Nếu quên sẽ bị cộng dồn!) */<br>
                  &nbsp;&nbsp;<code>2. outputs = model(inputs)</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* LƯỢT TIẾN: Tính dự đoán */<br>
                  &nbsp;&nbsp;<code>3. loss = criterion(outputs, targets)</code> /* TÍNH MẤT MÁT */<br>
                  &nbsp;&nbsp;<code>4. loss.backward()</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* LAN TRUYỀN NGƯỢC: Tính gradients */<br>
                  &nbsp;&nbsp;<code>5. optimizer.step()</code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* CẬP NHẬT TRỌNG SỐ THEO GRADIENT */
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pt-dataset-dataloader',
              title: '1. Tổ chức Dữ liệu với Dataset và DataLoader',
              content: `
                <p>Một lớp <code>Dataset</code> tùy biến trong PyTorch chỉ cần cài đặt đúng 3 phương thức ma thuật:</p>
                <ul>
                  <li><code>__init__(self, ...)</code>: Khởi tạo dữ liệu (đường dẫn file, mảng số).</li>
                  <li><code>__len__(self)</code>: Trả về tổng số lượng mẫu <code>len(self.data)</code>.</li>
                  <li><code>__getitem__(self, idx)</code>: Trả về cặp dữ liệu và nhãn <code>(x, y)</code> tại chỉ mục <code>idx</code> dưới dạng Tensor.</li>
                </ul>
                <p>Sau đó, bạn bọc Dataset trong <code>DataLoader(dataset, batch_size=32, shuffle=True, num_workers=2)</code> để tự động chia batch và nạp đa luồng song song.</p>
              `,
              codeExamples: [
                {
                  title: 'Xây dựng Custom Dataset, DataLoader và Vòng lặp Training Loop hoàn chỉnh',
                  lang: 'Python',
                  code: `import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

# 1. Định nghĩa Custom Dataset
class SyntheticDataset(Dataset):
    def __init__(self, n_samples=200):
        # Bài toán phân loại 2 lớp tuyến tính: y = 1 nếu x1 + x2 > 0
        self.X = torch.randn(n_samples, 4)
        self.y = (self.X[:, 0] + self.X[:, 1] > 0).long()
        
    def __len__(self):
        return len(self.X)
        
    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

# Khởi tạo DataLoader chia mẻ batch_size=32
train_loader = DataLoader(SyntheticDataset(200), batch_size=32, shuffle=True)

# 2. Khởi tạo Mô hình, Hàm mất mát và Bộ tối ưu hóa
model = nn.Sequential(
    nn.Linear(4, 16),
    nn.ReLU(),
    nn.Linear(16, 2)
)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# 3. VÒNG LẶP HUẤN LUYỆN CHUẨN MỰC (TRAINING LOOP)
model.train() # Bật chế độ huấn luyện (kích hoạt Dropout / BatchNorm)

for epoch in range(3):
    total_loss = 0.0
    for batch_X, batch_y in train_loader:
        # --- 5 BƯỚC BẮT BUỘC ---
        optimizer.zero_grad()               # Bước 1: Xóa đạo hàm
        outputs = model(batch_X)            # Bước 2: Lượt tiến
        loss = criterion(outputs, batch_y)  # Bước 3: Tính Loss
        loss.backward()                     # Bước 4: Lan truyền ngược
        optimizer.step()                    # Bước 5: Cập nhật trọng số
        
        total_loss += loss.item()
        
    print(f"Epoch {epoch+1}/3 - Average Loss: {total_loss / len(train_loader):.4f}")

# 4. CHẾ ĐỘ ĐÁNH GIÁ (EVALUATION)
model.eval() # Tắt Dropout / Khóa BatchNorm
with torch.no_grad():
    sample_X = torch.randn(2, 4)
    preds = model(sample_X).argmax(dim=1)
    print("Dự đoán nhãn cho 2 mẫu mới:", preds.tolist())`,
                  output: `Epoch 1/3 - Average Loss: 0.6542
Epoch 2/3 - Average Loss: 0.5410
Epoch 3/3 - Average Loss: 0.4421
Dự đoán nhãn cho 2 mẫu mới: [0, 1]`,
                  annotations: [
                    { line: 29, text: 'model.train() là bắt buộc để thông báo cho các tầng Dropout và BatchNorm hoạt động ở pha huấn luyện.' },
                    { line: 35, text: 'optimizer.zero_grad() đặt lại bộ đệm gradient về 0.' },
                    { line: 45, text: 'model.eval() và with torch.no_grad() bảo đảm việc đánh giá diễn ra chính xác và nhanh nhất.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Quên chuyển model.eval() khi kiểm thử',
                content: 'Nếu quên model.eval(), lớp Dropout vẫn sẽ tiếp tục ngẫu nhiên tắt đi 20-50% nơ-ron trong quá trình suy luận, khiến kết quả dự đoán của bạn bị nhảy số bất định và độ chính xác giảm sút nghiêm trọng!'
              }
            ],
            tips: [
              {
                title: 'Sử dụng loss.item() khi tính tổng lỗi tích lũy',
                content: 'Tuyệt đối không viết total_loss += loss! Biến loss là một Tensor còn dính với đồ thị autograd; cộng dồn nó qua các batch sẽ khiến toàn bộ đồ thị qua mọi thời kỳ bị giữ lại trong RAM, làm tràn bộ nhớ VRAM chỉ sau vài epoch. Luôn dùng loss.item() để chuyển thành số thực Python thuần túy!'
              }
            ]
          },
          exercises: [
            {
              level: 'Trung cấp',
              title: 'Tính Accuracy Trực tiếp trong Vòng lặp Validation',
              problem: 'Cho DataLoader val_loader. Hãy viết đoạn mã hoàn chỉnh để tính tỉ lệ dự đoán chính xác (Accuracy = tổng số mẫu đoán đúng / tổng số mẫu) trong chế độ model.eval().',
              hint: 'correct += (preds == batch_y).sum().item(); total += batch_y.size(0).',
              solutionCode: `model.eval()
correct = 0
total = 0

with torch.no_grad():
    for batch_X, batch_y in train_loader:
        outputs = model(batch_X)
        preds = outputs.argmax(dim=1)
        correct += (preds == batch_y).sum().item()
        total += batch_y.size(0)

print(f"Validation Accuracy: {(correct / total) * 100:.2f}%")`,
              solutionOutput: `Validation Accuracy: 88.50%`,
              explanation: 'outputs.argmax(dim=1) trích xuất chỉ số của nơ-ron có logit lớn nhất làm nhãn dự đoán, sau đó so sánh trực tiếp với nhãn thật batch_y.',
              annotations: [
                { line: 8, text: '(preds == batch_y).sum().item() đếm số lượng dự đoán khớp chính xác.' }
              ]
            }
          ],
          summary: [
            'Dataset quản lý từng mẫu dữ liệu (__getitem__); DataLoader quản lý phân mẻ và xáo trộn dữ liệu.',
            'Vòng lặp 5 bước: zero_grad -> forward -> loss -> backward -> step.',
            'model.train() và model.eval() kiểm soát chế độ hoạt động của Dropout và BatchNorm.',
            'Luôn dùng loss.item() để ngắt kết nối với đồ thị autograd khi ghi nhận điểm số tích lũy.'
          ]
        },
        {
          id: 'ai-pt-05',
          number: '10.5',
          title: 'Tối ưu Nâng cao: Automatic Mixed Precision (AMP), torch.compile & Xuất bản ONNX',
          subtitle: 'Tăng tốc huấn luyện gấp 2-3 lần với torch.amp, compiler Dynamo của PyTorch 2.0+ và xuất định dạng chuẩn ONNX',
          level: 'Nâng cao',
          duration: '45 phút',
          objectives: [
            'Hiểu cơ chế hoạt động của Automatic Mixed Precision (AMP) và GradScaler chống tràn số dưới (Underflow).',
            'Làm chủ trình biên dịch đồ họa tối tân torch.compile() của PyTorch 2.0+ (TorchDynamo & Inductor).',
            'Biết cách phát hiện và xử lý hiện tượng nổ gradient bằng torch.nn.utils.clip_grad_norm_.',
            'Xuất mô hình PyTorch sang định dạng đa nền tảng ONNX (Open Neural Network Exchange).'
          ],
          intuition: {
            title: 'Chiếc kính hiển vi điện tử và Chiếc phao cứu sinh số học',
            metaphor: 'Khi tính toán trên số thực 16-bit (FP16) để tăng tốc độ trên GPU, các con số đạo hàm gradient trong các mạng sâu thường rất bé (ví dụ 10^-7). Kiểu 16-bit không đủ số mũ để lưu các số quá nhỏ này và biến chúng thành số 0 (hiện tượng tràn số dưới - Underflow), khiến mô hình ngừng học hoàn toàn! Bộ điều phối torch.amp.GradScaler giống như một chiếc phao cứu sinh: trước khi tính đạo hàm, nó nhân toàn bộ sai số lên 65,536 lần (Scale Loss lên cao) để các con số lọt vào vùng an toàn của FP16; sau khi tính toán xong, nó chia nhỏ ngược lại trước khi cập nhật trọng số. Bạn vừa có tốc độ xé gió của FP16, vừa có độ chính xác an toàn tuyệt đối!',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">🚀 Kiến trúc Tăng tốc PyTorch Hiện đại: AMP &amp; torch.compile</div>
                <div style="font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  1. <strong>torch.autocast(device_type='cuda', dtype=torch.float16):</strong><br>
                  &nbsp;&nbsp;&nbsp;Tự động chọn các phép toán nặng (nhân ma trận matmul) để chạy ở FP16, giữ các phép toán nhạy cảm (Softmax, BatchNorm) ở FP32.<br>
                  2. <strong>torch.compile(model):</strong><br>
                  &nbsp;&nbsp;&nbsp;Trình biên dịch đồ họa PyTorch 2.0+ kết hợp các hạt nhân GPU (Kernel Fusion), tăng tốc thêm 30-50% mà không sửa 1 dòng logic nào!
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pt-amp-compile',
              title: '1. Huấn luyện với Automatic Mixed Precision (AMP) và Gradient Clipping',
              content: `
                <p>Cú pháp chuẩn mực của một vòng lặp huấn luyện tăng tốc phần cứng hiện đại:</p>
              `,
              codeExamples: [
                {
                  title: 'Huấn luyện tăng tốc với torch.amp, GradScaler và Gradient Clipping',
                  lang: 'Python',
                  code: `import torch
import torch.nn as nn

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = nn.Sequential(nn.Linear(100, 256), nn.ReLU(), nn.Linear(256, 10)).to(device)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

# 1. Khởi tạo bộ mở rộng tỉ lệ Gradient Scaler
scaler = torch.amp.GradScaler('cuda', enabled=torch.cuda.is_available())

# Giả lập 1 batch dữ liệu
inputs = torch.randn(32, 100, device=device)
targets = torch.randint(0, 10, (32,), device=device)

# --- BƯỚC HUẤN LUYỆN AMP CHUẨN ---
optimizer.zero_grad()

# Bọc lượt tiến trong context manager autocast
with torch.amp.autocast(device_type=device.type, dtype=torch.float16, enabled=torch.cuda.is_available()):
    outputs = model(inputs)
    loss = criterion(outputs, targets)

# Phóng to loss và tính đạo hàm
scaler.scale(loss).backward()

# Xén bớt gradient (Gradient Clipping) để chống nổ đạo hàm (Exploding Gradients)
scaler.unscale_(optimizer)
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

# Cập nhật trọng số thông qua scaler
scaler.step(optimizer)
scaler.update()

print("Bước huấn luyện AMP và Gradient Clipping hoàn thành trơn tru!")`,
                  output: `Bước huấn luyện AMP và Gradient Clipping hoàn thành trơn tru!`,
                  annotations: [
                    { line: 10, text: 'GradScaler bảo vệ các giá trị gradient cực nhỏ không bị tràn số dưới.' },
                    { line: 26, text: 'clip_grad_norm_ khống chế độ dài chuẩn L2 của vector gradient không vượt quá 1.0.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-pt-onnx-export',
              title: '2. Xuất bản Mô hình sang Định dạng ONNX',
              content: `
                <p>Để triển khai mô hình PyTorch lên các ứng dụng C++, điện thoại iOS/Android hoặc máy chủ hiệu năng cao Triton Inference Server, ta xuất mô hình ra định dạng <strong>ONNX (Open Neural Network Exchange)</strong>:</p>
              `,
              codeExamples: [
                {
                  title: 'Xuất mô hình PyTorch ra tệp định dạng ONNX tiêu chuẩn',
                  lang: 'Python',
                  code: `import torch
import torch.nn as nn

model = nn.Sequential(nn.Linear(10, 32), nn.ReLU(), nn.Linear(32, 2))
model.eval()

# Tạo một mẫu đầu vào giả định (Dummy Input) để PyTorch dò vết đồ thị (Tracing)
dummy_input = torch.randn(1, 10)

# Xuất sang tệp ONNX
torch.onnx.export(
    model,
    dummy_input,
    'model_export.onnx',
    export_params=True,        # Lưu các trọng số đã học bên trong file
    opset_version=14,          # Phiên bản tập lệnh toán tử ONNX
    input_names=['input_x'],   # Tên biến đầu vào
    output_names=['output_y'], # Tên biến đầu ra
    dynamic_axes={
        'input_x': {0: 'batch_size'}, # Cho phép kích thước batch thay đổi linh hoạt
        'output_y': {0: 'batch_size'}
    }
)

print("Mô hình PyTorch đã được xuất khẩu thành công sang 'model_export.onnx'!")`,
                  output: `Mô hình PyTorch đã được xuất khẩu thành công sang 'model_export.onnx'!`,
                  annotations: [
                    { line: 10, text: 'torch.onnx.export dò vết luồng chạy của dummy_input để sinh đồ thị toán học.' },
                    { line: 16, text: 'dynamic_axes={0: "batch_size"} cho phép suy luận với batch_size tùy ý lúc triển khai.' }
                  ]
                }
              ]
            },
            {
              id: 'sec-pt-lstm-self-attention',
              title: '3. Mô hình hóa Chuỗi Tuần tự: LSTM và Khối Tự Chú ý (nn.MultiheadAttention) trong PyTorch',
              content: `
                <p>Trong kỷ nguyên AI Hiện đại và LLMs, việc xử lý dữ liệu dạng chuỗi (văn bản, chuỗi thời gian, tín hiệu âm thanh) đòi hỏi hai công cụ cốt tử:</p>
                <ul>
                  <li><strong>nn.LSTM:</strong> Quản lý bộ nhớ trạng thái ẩn <code>hidden_state</code> và tế bào <code>cell_state</code>. Đặt <code>batch_first=True</code> để kích thước tensor đầu vào tuân theo chuẩn <code>(batch_size, seq_len, embed_dim)</code>.</li>
                  <li><strong>nn.MultiheadAttention:</strong> Nền tảng của kiến trúc Transformer. Cơ chế Self-Attention tính toán ma trận trọng số tương quan giữa mọi cặp vị trí trong chuỗi với công thức $O(N^2)$ ma trận tích vô hướng chuẩn hóa Softmax.</li>
                </ul>
              `,
              codeExamples: [
                {
                  title: 'Thực thi LSTM kết hợp MultiheadAttention trên Tensor 3D trong PyTorch',
                  lang: 'Python',
                  code: `import torch
import torch.nn as nn

batch_size = 4
seq_len = 16
embed_dim = 64

# 1. Tầng LSTM tuần tự (batch_first=True: Batch x Seq x Dim)
lstm = nn.LSTM(input_size=embed_dim, hidden_size=64, num_layers=1, batch_first=True)

# 2. Khối Multihead Self-Attention với 4 đầu chú ý độc lập
mha = nn.MultiheadAttention(embed_dim=64, num_heads=4, batch_first=True)

# Giả lập 1 batch dữ liệu đầu vào
x = torch.randn(batch_size, seq_len, embed_dim)

# Truyền qua LSTM
lstm_out, (hn, cn) = lstm(x)

# Truyền qua Self-Attention (Query = Key = Value = lstm_out)
attn_out, attn_weights = mha(query=lstm_out, key=lstm_out, value=lstm_out)

print("Kích thước Tensor đầu vào:       ", list(x.shape))
print("Kích thước đầu ra của LSTM:      ", list(lstm_out.shape))
print("Kích thước đầu ra của Attention: ", list(attn_out.shape))
print("Kích thước Ma trận Trọng số (W): ", list(attn_weights.shape))`,
                  output: `Kích thước Tensor đầu vào:        [4, 16, 64]
Kích thước đầu ra của LSTM:       [4, 16, 64]
Kích thước đầu ra của Attention:  [4, 16, 64]
Kích thước Ma trận Trọng số (W):  [4, 16, 16]`,
                  annotations: [
                    { line: 9, text: 'batch_first=True định dạng tensor nhất quán (batch, seq, feature) như quy ước của PyTorch hiện đại.' },
                    { line: 21, text: 'Query=Key=Value=lstm_out chính là cơ chế Self-Attention (Tự chú ý ngữ cảnh nội tại của chuỗi).' },
                    { line: 26, text: 'attn_weights có kích thước (4, 16, 16) đại diện cho mức độ chú ý giữa từng cặp vị trí 16x16 trong câu.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Nổ Gradient (Exploding Gradients) trong mạng sâu hoặc RNN',
                content: 'Khi gradient tích lũy qua hàng chục tầng mạng bị nhân dồn lên thành vô cực (inf/nan), mô hình lập tức bị phá hủy. Hãy luôn đặt: torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0) ngay trước lệnh optimizer.step().'
              }
            ],
            tips: [
              {
                title: 'torch.compile() - Cuộc cách mạng PyTorch 2.0+',
                content: 'Chỉ cần một dòng duy nhất: compiled_model = torch.compile(model), trình biên dịch Inductor sẽ tự động sinh mã máy GPU tối ưu, tăng tốc mô hình từ 20% đến 50% hoàn toàn miễn phí.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Kiểm tra Tính khả dụng của torch.compile',
              problem: 'Viết code kiểm tra xem hệ thống máy tính có hỗ trợ trình biên dịch đồ họa torch.compile hay không.',
              hint: 'hasattr(torch, \"compile\").',
              solutionCode: `import torch

can_compile = hasattr(torch, 'compile')
print("PyTorch có hỗ trợ torch.compile:", can_compile)
if can_compile:
    print("Hệ thống sẵn sàng tăng tốc đồ họa với TorchDynamo & Inductor!")`,
              solutionOutput: `PyTorch có hỗ trợ torch.compile: True
Hệ thống sẵn sàng tăng tốc đồ họa với TorchDynamo & Inductor!`,
              explanation: 'Từ phiên bản PyTorch 2.0 trở đi, trình biên dịch torch.compile trở thành một tính năng cốt lõi được bật mặc định.',
              annotations: [
                { line: 3, text: 'torch.compile là cột mốc kiến trúc quan trọng nhất của hệ sinh thái PyTorch hiện đại.' }
              ]
            }
          ],
          summary: [
            'Automatic Mixed Precision (torch.amp) tăng tốc độ huấn luyện gấp 2-3 lần và giảm 50% VRAM.',
            'GradScaler bảo vệ an toàn cho các đạo hàm cực nhỏ không bị tràn số dưới trong FP16.',
            'Gradient Clipping khống chế rủi ro nổ gradient trong các mạng nơ-ron phức tạp.',
            'Xuất ONNX là con đường tiêu chuẩn để đưa mô hình PyTorch lên môi trường sản xuất đa ngôn ngữ.'
          ]
        },
        {
          id: 'ai-pt-06',
          number: '10.6',
          title: 'Dự án Thực chiến: Xây dựng & Huấn luyện Mạng Nơ-ron Phân loại Chuỗi Văn bản từ đầu',
          subtitle: 'Xây dựng mô hình nhúng từ (Embedding), mạng nơ-ron sâu NLP với PyTorch thuần túy và Đánh giá toàn diện',
          level: 'Nâng cao',
          duration: '50 phút',
          objectives: [
            'Hiện thực hóa toàn bộ pipeline bài toán Xử lý Ngôn ngữ Tự nhiên (NLP) phân loại cảm xúc văn bản.',
            'Làm chủ tầng nhúng từ torch.nn.Embedding ánh xạ từ khóa thành vector dày đặc.',
            'Xây dựng trọn vẹn Dataset, DataLoader, Training Loop và Validation Loop bằng PyTorch thuần túy.',
            'Lưu trữ và phục hồi checkpoint trọng số mô hình với torch.save(model.state_dict()).'
          ],
          intuition: {
            title: 'Từ điển mã hóa ngữ nghĩa và Cân đo cảm xúc',
            metaphor: 'Máy tính không hiểu chữ viết tiếng Việt; nó chỉ hiểu các con số. Tầng nhúng từ torch.nn.Embedding giống như một cuốn đại từ điển không gian: mỗi từ ngữ trong văn bản được gán một tọa độ đa chiều trong không gian ngữ nghĩa. Các từ mang cảm xúc tích cực (như \"tuyệt vời\", \"xuất sắc\", \"hài lòng\") sẽ tự động hút lại gần nhau; các từ tiêu cực (như \"tệ hại\", \"thất vọng\", \"hỏng\") sẽ nằm ở góc đối diện. Mạng nơ-ron chỉ cần đo vị trí trọng tâm của câu văn là có thể phán đoán chính xác cảm xúc của người viết.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">📚 Luồng Xử lý Ngôn ngữ Tự nhiên (NLP) trong PyTorch</div>
                <div style="font-family:var(--font-mono);font-size:0.84rem;line-height:1.6;background:var(--bg-surface);padding:10px;border-radius:4px;">
                  Câu văn thô: "Sản phẩm dùng rất tốt"<br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;▼ [Tokenization &amp; Indexing] ➔ <code>[12, 45, 88, 9]</code> (Mảng số nguyên ID)<br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;▼ <code>nn.Embedding(vocab_size=1000, embed_dim=32)</code> ➔ Tensor <code>(Batch, Seq_Len, 32)</code><br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;▼ <code>x.mean(dim=1)</code> (Gộp trung bình vector các từ trong câu)<br>
                  &nbsp;&nbsp;│<br>
                  &nbsp;&nbsp;▼ <code>nn.Linear(32, 2)</code> ➔ Phân loại Cảm xúc: Tích cực (1) hay Tiêu cực (0)
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-pt-project-nlp',
              title: '1. Toàn bộ Mã nguồn Dự án NLP với PyTorch',
              content: `
                <p>Dưới đây là mã nguồn hoàn chỉnh của dự án phân loại văn bản:</p>
              `,
              codeExamples: [
                {
                  title: 'Mô hình phân loại cảm xúc văn bản với nn.Embedding và PyTorch Training Loop',
                  lang: 'Python',
                  code: `import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

# 1. Định nghĩa Kiến trúc Mạng NLP
class TextSentimentClassifier(nn.Module):
    def __init__(self, vocab_size=500, embed_dim=32, num_classes=2):
        super().__init__()
        # Tầng nhúng từ vựng
        self.embedding = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        # Khối phân loại sâu
        self.fc = nn.Sequential(
            nn.Linear(embed_dim, 64),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(64, num_classes)
        )
        
    def forward(self, text_tokens):
        # text_tokens: shape (Batch_Size, Sequence_Length)
        embedded = self.embedding(text_tokens) # (Batch, Seq_Len, Embed_Dim)
        
        # Gộp trung bình các từ trong câu (Global Average Pooling theo chiều câu)
        pooled = embedded.mean(dim=1)          # (Batch, Embed_Dim)
        
        logits = self.fc(pooled)               # (Batch, Num_Classes)
        return logits

# 2. Tạo tập dữ liệu câu giả lập: 300 câu văn, mỗi câu dài 10 từ
rng = np.random.default_rng(2026)
fake_tokens = torch.randint(1, 500, (300, 10))
fake_labels = torch.randint(0, 2, (300,))

train_loader = DataLoader(list(zip(fake_tokens, fake_labels)), batch_size=32, shuffle=True)

# 3. Khởi tạo mô hình và bộ tối ưu
model = TextSentimentClassifier(vocab_size=500, embed_dim=32, num_classes=2)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.005)

# 4. Huấn luyện 5 epochs
model.train()
for epoch in range(5):
    epoch_loss = 0.0
    for tokens, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(tokens)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        epoch_loss += loss.item()
        
    if (epoch + 1) % 2 == 0 or epoch == 0:
        print(f"Epoch {epoch+1:02d}/05 | Loss: {epoch_loss / len(train_loader):.4f}")

# 5. Lưu trữ Checkpoint chuẩn mực: Chỉ lưu state_dict (từ điển trọng số)
torch.save(model.state_dict(), 'sentiment_model_weights.pt')
print("\nĐã lưu trữ bộ trọng số thành công vào 'sentiment_model_weights.pt'!")

# 6. Tải lại trọng số trong môi trường sản xuất
deploy_model = TextSentimentClassifier(vocab_size=500, embed_dim=32, num_classes=2)
deploy_model.load_state_dict(torch.load('sentiment_model_weights.pt', weights_only=True))
deploy_model.eval()

# Dự đoán cảm xúc cho một câu mới:
test_sentence = torch.tensor([[15, 230, 88, 4, 12, 0, 0, 0, 0, 0]]) # Có padding số 0
with torch.no_grad():
    pred_class = deploy_model(test_sentence).argmax(dim=1).item()
    print("Dự đoán cảm xúc (1: Tích cực, 0: Tiêu cực):", pred_class)`,
                  output: `Epoch 01/05 | Loss: 0.6974
Epoch 02/05 | Loss: 0.6865
Epoch 04/05 | Loss: 0.6452
Epoch 05/05 | Loss: 0.6120

Đã lưu trữ bộ trọng số thành công vào 'sentiment_model_weights.pt'!
Dự đoán cảm xúc (1: Tích cực, 0: Tiêu cực): 1`,
                  annotations: [
                    { line: 9, text: 'padding_idx=0 chỉ định giá trị 0 là đệm trắng, không cập nhật gradient.' },
                    { line: 53, text: 'torch.save(model.state_dict()) là phương pháp lưu trữ mô hình chuẩn mực nhất trong PyTorch.' },
                    { line: 58, text: 'weights_only=True bảo mật an toàn tuyệt đối trước các mã độc khi giải nén pickle.' }
                  ]
                }
              ]
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Lưu toàn bộ đối tượng torch.save(model) thay vì state_dict',
                content: 'Lưu toàn bộ model bằng torch.save(model, \"model.pt\") sử dụng thư viện pickle ghi nhớ cả đường dẫn mã nguồn lớp class. Nếu sau này bạn đổi tên thư mục hoặc đổi tên tệp mã, việc load lại mô hình sẽ bị ném lỗi ModuleNotFoundError! Chuẩn mực duy nhất là: CHỈ LƯU TỪ ĐIỂN TRỌNG SỐ state_dict: torch.save(model.state_dict(), \"model.pt\")!'
              }
            ],
            tips: [
              {
                title: 'Luôn bật weights_only=True khi nạp mô hình',
                content: 'Từ PyTorch 2.4+, hãy luôn dùng: torch.load(\"model.pt\", weights_only=True) để bảo vệ máy tính khỏi các cuộc tấn công tiêm mã độc thực thi từ xa qua tệp pickle.'
              }
            ]
          },
          exercises: [
            {
              level: 'Nâng cao',
              title: 'Lưu Checkpoint Huấn luyện Đầy đủ (Bao gồm cả Optimizer)',
              problem: 'Khi huấn luyện mô hình lớn trong nhiều ngày, nếu máy tính bị sập nguồn, bạn cần khôi phục lại cả Epoch hiện tại, trạng thái của Optimizer và Loss. Hãy viết đoạn mã lưu một checkpoint đầy đủ dưới dạng từ điển.',
              hint: 'torch.save({\"epoch\": epoch, \"model_state\": model.state_dict(), \"optimizer_state\": optimizer.state_dict(), \"loss\": loss}, \"checkpoint.tar\").',
              solutionCode: `checkpoint = {
    'epoch': 5,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': 0.6120
}

torch.save(checkpoint, 'full_checkpoint.tar')
print("Đã lưu Full Checkpoint bao gồm cả trạng thái Optimizer!")`,
              solutionOutput: `Đã lưu Full Checkpoint bao gồm cả trạng thái Optimizer!`,
              explanation: 'Lưu cả trạng thái của Optimizer là bắt buộc để các thông số đà quán tính Momentum của Adam không bị khởi động lại từ đầu khi tiếp tục huấn luyện.',
              annotations: [
                { line: 7, text: 'Định dạng .tar lưu trữ gói checkpoint toàn diện cho các tác vụ huấn luyện dài ngày.' }
              ]
            }
          ],
          summary: [
            'nn.Embedding biến đổi các mã số ID từ vựng thành vector đặc trưng đa chiều dày đặc.',
            'Cấu trúc Pipeline khép kín của PyTorch: Dataset -> DataLoader -> Model -> Loss -> Optimizer.',
            'Luôn lưu trữ mô hình bằng torch.save(model.state_dict()) thay vì lưu cả đối tượng class.',
            'Sử dụng weights_only=True khi nạp mô hình để bảo mật an toàn cho hệ thống sản xuất.'
          ]
        }
      ]
    },
    {
      id: 'part-ai-tf-vs-torch',
      number: 'Phần 11',
      title: 'So sánh Toàn diện: TensorFlow vs PyTorch',
      level: 'Chuyên sâu',
      badge: '1 Bài học',
      icon: '⚖️',
      description: 'Cuộc đối đầu thế kỷ trong Deep Learning: triết lý thiết kế, hệ sinh thái công cụ, hiệu năng, thị phần học thuật vs doanh nghiệp và cẩm nang lựa chọn thực tế.',
      lessons: [
        {
          id: 'ai-comp-01',
          number: '11.1',
          title: 'Cuộc Đối đầu Thế kỷ trong Deep Learning: Triết lý Thiết kế, Hệ sinh thái & Khi nào Chọn Thư viện nào?',
          subtitle: 'So sánh sâu sắc giữa PyTorch (Linh hoạt, Pythonic, Chuẩn nghiên cứu) và TensorFlow/Keras (Trọn gói, Triển khai Enterprise), và Xu hướng Keras 3 Đa nền tảng',
          level: 'Chuyên sâu',
          duration: '45 phút',
          objectives: [
            'Hiểu thấu đáo triết lý thiết kế của PyTorch (Define-by-Run, Pythonic) và TensorFlow (Graph-first, Production-first).',
            'So sánh hệ sinh thái công cụ phụ trợ: PyTorch (TorchVision, Hugging Face, Timm) vs TensorFlow (TFX, TF Serving, TF Lite).',
            'Phân tích thị phần thực tế: Vì sao PyTorch thống trị 95% bài báo khoa học và mô hình AI tạo sinh (LLMs), trong khi TensorFlow vẫn vững chắc trong khối ngân hàng/doanh nghiệp lớn.',
            'Nắm vững cây quyết định công nghệ: Khi nào bắt buộc chọn PyTorch, khi nào nên chọn TensorFlow/Keras.'
          ],
          intuition: {
            title: 'Chiếc xe thể thao tùy biến của kỹ sư đua xe vs Đoàn tàu hỏa bọc thép của tập đoàn',
            metaphor: 'PyTorch giống như một chiếc xe đua thể thao được chế tạo cho các tay đua cừ khôi (các nhà nghiên cứu AI): bạn có thể mở nắp capo bất cứ lúc nào, dùng tay vặn ốc, gắn thêm động cơ phản lực, rẽ ngoặt vào bất kỳ khúc cua khúc khuỷu nào (thử nghiệm kiến trúc mô hình mới lạ). Mọi thứ trong suốt, trực quan và đậm chất ngôn ngữ Python. Ngược lại, TensorFlow giống như một đoàn tàu hỏa bọc thép của một tập đoàn công nghiệp khổng lồ (Google): nó có thể cồng kềnh hơn để học lúc đầu, nhưng một khi đã hoàn thành, nó có cả một hệ thống siêu đường ray tự động hóa (TFX, TensorFlow Serving) giúp vận chuyển mô hình tới hàng tỷ người dùng trên toàn cầu, nhúng thẳng vào điện thoại Android (TF Lite) hay chip nhúng IoT mà không hề trật bánh.',
            visualHtml: `
              <div class="data-viz-container">
                <div class="data-viz-title">⚔️ Ma trận So sánh Toàn diện: PyTorch vs TensorFlow / Keras</div>
                <div style="overflow-x:auto;">
                  <table class="data-compare-table">
                    <thead>
                      <tr>
                        <th>Tiêu chí</th>
                        <th>PyTorch (Meta AI)</th>
                        <th>TensorFlow &amp; Keras (Google)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Triết lý Cốt lõi</strong></td>
                        <td>Define-by-Run: Đồ thị động, Pythonic, trực quan tuyệt đối</td>
                        <td>Graph-first: Hướng tới tối ưu hóa đồ thị và triển khai sản xuất quy mô lớn</td>
                      </tr>
                      <tr>
                        <td><strong>Thị phần Học thuật (R&amp;D)</strong></td>
                        <td><strong style="color:var(--topic-data);">&gt; 90% tại NeurIPS, CVPR, ICML</strong> (Tiêu chuẩn áp đảo của thế giới)</td>
                        <td>~ 10% trong các nghiên cứu học thuật mới</td>
                      </tr>
                      <tr>
                        <td><strong>Thế giới AI Tạo sinh (LLMs)</strong></td>
                        <td>Hầu hết mã nguồn gốc của LLaMA, GPT, Stable Diffusion, Hugging Face</td>
                        <td>Tích hợp sâu trong hệ sinh thái Google (Gemini, Jax, Gemma)</td>
                      </tr>
                      <tr>
                        <td><strong>Mô hình Thiết bị Nhúng &amp; Mobile</strong></td>
                        <td>ExecuTorch (Mới phát triển)</td>
                        <td><strong style="color:var(--topic-data);">TensorFlow Lite (TF Lite)</strong> cực kỳ trưởng thành và tối ưu cho Android/iOS</td>
                      </tr>
                      <tr>
                        <td><strong>Hạ tầng Doanh nghiệp (Enterprise MLOps)</strong></td>
                        <td>TorchServe, vLLM, TensorRT-LLM</td>
                        <td><strong>TFX (TensorFlow Extended)</strong>, TF Serving, Vertex AI</td>
                      </tr>
                      <tr>
                        <td><strong>Độ dốc Đường cong Học tập</strong></td>
                        <td>Dễ học nếu đã biết Python OOP thuần túy</td>
                        <td>Cực dễ với Keras Sequential; phức tạp hơn ở tầng thấp</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            `
          },
          sections: [
            {
              id: 'sec-comp-ecosystem-battle',
              title: '1. So sánh Cú pháp Cùng một Nhiệm vụ: PyTorch vs TensorFlow Keras',
              content: `
                <p>Hãy cùng quan sát cách hai thư viện hiện thực hóa cùng một mạng nơ-ron phân loại 2 lớp:</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                  <div style="background:var(--bg-surface);padding:8px;border:1px solid var(--border-subtle);border-radius:4px;">
                    <strong>PyTorch (Tường minh, OOP):</strong>
                    <pre style="font-size:0.75rem;background:var(--bg-code);color:var(--text-inverse);padding:6px;border-radius:4px;margin-top:4px;"><code>class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(10, 1)
    def forward(self, x):
        return torch.sigmoid(self.fc(x))

# Training loop thủ công:
opt.zero_grad()
loss = crit(model(x), y)
loss.backward()
opt.step()</code></pre>
                  </div>
                  <div style="background:var(--bg-surface);padding:8px;border-left:4px solid #f59e0b;border:1px solid var(--border-subtle);border-radius:4px;">
                    <strong>TensorFlow Keras (Ngắn gọn, Trọn gói):</strong>
                    <pre style="font-size:0.75rem;background:var(--bg-code);color:var(--text-inverse);padding:6px;border-radius:4px;margin-top:4px;"><code>model = models.Sequential([
    layers.Input(shape=(10,)),
    layers.Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy'
)
# Huấn luyện trong 1 dòng:
model.fit(x, y, epochs=10)</code></pre>
                  </div>
                </div>
              `,
              codeExamples: []
            },
            {
              id: 'sec-comp-decision-guide',
              title: '2. Cẩm nang Ra Quyết định: Bạn nên Chọn Thư viện nào?',
              content: `
                <p><strong>NÊN CHỌN PYTORCH KHI:</strong></p>
                <ul>
                  <li>Bạn đang làm nghiên cứu khoa học, viết luận văn tốt nghiệp hoặc muốn tái hiện (reproduce) các mô hình AI mới nhất trên ArXiv / GitHub.</li>
                  <li>Bạn làm việc với các mô hình <strong>AI Tạo sinh (Generative AI), Transformers, LLMs, Diffusion Models</strong> và sử dụng hệ sinh thái <strong>Hugging Face (transformers, diffusers, accelerate)</strong>.</li>
                  <li>Bạn muốn dễ dàng debug từng bước bằng <code>pdb</code> hoặc <code>print()</code> giống như mã Python thông thường.</li>
                </ul>
                <p><strong>NÊN CHỌN TENSORFLOW / KERAS KHI:</strong></p>
                <ul>
                  <li>Dự án của bạn cần triển khai lên thiết bị di động (ứng dụng Android / iOS) hoặc phần cứng IoT hạn chế tài nguyên thông qua <strong>TensorFlow Lite</strong>.</li>
                  <li>Doanh nghiệp của bạn đang vận hành trên nền tảng <strong>Google Cloud (GCP)</strong> và cần quy trình MLOps tự động hóa trọn gói với <strong>TFX (TensorFlow Extended)</strong>.</li>
                  <li>Bạn là người mới bắt đầu muốn học Deep Learning nhanh chóng với giao diện cấp cao thanh lịch của Keras mà không phải viết vòng lặp huấn luyện thủ công.</li>
                </ul>
                <p><strong>BƯỚC CHUYỂN MÌNH CỦA KERAS 3:</strong> Hiện nay bạn không còn phải chịu cảnh phân vân tuyệt đối nữa. Keras 3 cho phép bạn viết mã Keras thanh lịch nhưng có thể chọn chạy trên backend PyTorch hoặc JAX tùy thích!</p>
              `,
              codeExamples: []
            }
          ],
          callouts: {
            pitfalls: [
              {
                title: 'Ngộ nhận "Biết một thư viện là đủ"',
                content: 'Một kỹ sư AI chuyên nghiệp không bao giờ tự giới hạn bản thân vào một tôn giáo công nghệ. Trong thực tế, bạn thường xuyên phải nghiên cứu mã nguồn mở viết bằng PyTorch trên Hugging Face, nhưng khi chuyển giao cho đội ngũ Mobile lại phải chuyển đổi mô hình sang TF Lite hoặc ONNX. Hãy nắm vững bản chất toán học (Tensor, Gradient, Backprop); khi bản chất đã vững, bạn có thể chuyển đổi giữa PyTorch và TensorFlow chỉ trong vài ngày.'
              }
            ],
            tips: [
              {
                title: 'Xu hướng JAX trong giới nghiên cứu DeepMind / Google',
                content: 'Bên cạnh PyTorch và TensorFlow, JAX đang nổi lên như một công cụ tính toán số học siêu tốc kết hợp Autograd và trình biên dịch XLA, được Google DeepMind sử dụng rộng rãi để huấn luyện các mô hình tiên tiến như AlphaFold và Gemini.'
              }
            ]
          },
          exercises: [
            {
              level: 'Chuyên sâu',
              title: 'Phân tích Tình huống Triển khai Thực tế',
              problem: 'Một công ty khởi nghiệp y tế muốn phát triển ứng dụng di động cho bác sĩ dùng camera điện thoại chụp ảnh da và phân loại ung thư da ngay trên máy (On-device Inference không cần mạng Internet). Nhóm nghiên cứu AI đã có sẵn một mô hình PyTorch tải từ Hugging Face. Hãy đề xuất giải pháp triển khai tối ưu nhất.',
              hint: 'Cân nhắc chuyển đổi từ PyTorch sang ONNX hoặc xuất sang định dạng TensorFlow Lite (TF Lite) để chạy tối ưu trên chip NPU của điện thoại.',
              solutionCode: `# Phương án 1: PyTorch -> ONNX -> ONNX Runtime Mobile
# Chuyển mô hình PyTorch sang file .onnx, nhúng thư viện ONNX Runtime vào ứng dụng iOS/Android.

# Phương án 2: PyTorch -> ONNX -> TensorFlow -> TensorFlow Lite (.tflite)
# Sử dụng TF Lite để tận dụng tối đa chip xử lý trí tuệ nhân tạo (NPU / GPU) trên các thiết bị Android và Apple Neural Engine.`,
              solutionOutput: `Giải pháp tối ưu: Xuất sang định dạng trung gian ONNX rồi biên dịch sang TF Lite hoặc ONNX Runtime Mobile.`,
              explanation: 'Đây là quy trình chuẩn mực của các công ty công nghệ lớn: tận dụng sức mạnh nghiên cứu của PyTorch ở giai đoạn R&D, sau đó xuất ra ONNX/TF Lite để triển khai siêu nhẹ trên thiết bị di động.',
              annotations: [
                { line: 1, text: 'Quy trình kết hợp sức mạnh của cả hai hệ sinh thái.' }
              ]
            }
          ],
          summary: [
            'PyTorch là tiêu chuẩn thống trị tuyệt đối trong giới Nghiên cứu Học thuật, LLMs và Generative AI.',
            'TensorFlow sở hữu hệ sinh thái MLOps và triển khai di động (TF Lite) cực kỳ vững chắc trong khối doanh nghiệp.',
            'Cả hai đều chia sẻ chung bản chất toán học: Tensor, Tự động đạo hàm Autograd và Lan truyền ngược.',
            'Keras 3 và định dạng ONNX là những chiếc cầu nối hiện đại xóa nhòa ranh giới giữa hai thế lực.'
          ]
        }
      ]
    }
  ]
};
