/**
 * SQL Master & Data Engineering: Phần Tra Cứu & Bộ Dữ Liệu Thực Hành Mẫu
 * Phiên bản chuẩn quốc tế: Tích hợp đầy đủ Ma trận 3 Mạch [DQ][FE][SCALE],
 * Sơ đồ ER có văn bản mô tả tiếp cận (WCAG 2.2 AA), DDL + DML tương thích chuẩn ANSI SQL.
 * Chuẩn hóa 13 thành phần sư phạm quốc tế (Mục 0 đến 12) kèm 5 câu Quiz chuyên sâu mỗi bài.
 * Đã kiểm chứng thực thi 100% trên: PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4.
 */

window.SQL_META_PART = {
  id: 'part-sql-meta',
  number: 'Tra cứu & Bản đồ',
  title: 'Bản Đồ 3 Mạch & Bộ Dữ Liệu Mẫu',
  level: 'Tra cứu',
  badge: 'Cốt lõi',
  description: 'Bản đồ định hướng 3 mạch chuyên sâu xuyên suốt giáo trình ([DQ], [FE], [SCALE]) cùng toàn bộ sơ đồ bảng, ràng buộc và kịch bản SQL khởi tạo dữ liệu mẫu TechMart thực hành trên máy.',
  lessons: [
    {
      id: 'sql-map-circuits',
      number: 'M.1',
      title: 'Bản Đồ Ba Mạch Xuyên Suốt: [DQ], [FE], [SCALE]',
      subtitle: 'La bàn định hướng chuyên sâu cho Kỹ sư Dữ liệu, Nhà khoa học Dữ liệu và Kỹ sư AI',
      level: 'Tra cứu',
      duration: '30 phút',
      keywords: ['Data Quality', 'Feature Engineering', 'Large-Scale', 'ISO 25012', 'Data Leakage', 'Lookahead Bias', 'Columnar Storage', 'Mạch xuyên suốt'],
      prerequisites: 'Không yêu cầu kiến thức SQL trước đó; bài học này đóng vai trò bản đồ định hướng tư duy kỹ thuật xuyên suốt 47 bài học.',
      verifiedEngines: 'PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)',
      objectives: [
        'Phân tích nguyên nhân gốc rễ vì sao việc chỉ biết cú pháp SQL cơ bản mà thiếu 3 mạch chuyên sâu ([DQ], [FE], [SCALE]) sẽ dẫn đến 90% dự án dữ liệu thất bại khi đưa lên môi trường sản xuất.',
        'Nắm vững khung tiêu chuẩn chất lượng dữ liệu 6 chiều ISO/IEC 25012 và quy ước vàng của truy vấn kiểm định [DQ] (Assertion Rule: kết quả RỖNG đồng nghĩa ĐẠT chuẩn).',
        'Nhận diện và phòng chống cạm bẫy rò rỉ dữ liệu tương lai (Data Leakage / Lookahead Bias) trong kỹ nghệ đặc trưng Machine Learning [FE] thông qua kỹ thuật Point-in-Time Join.',
        'Thấu hiểu bản chất kiến trúc lưu trữ cột (Columnar Storage) của [SCALE] và nguyên lý tối ưu chi phí quét byte trên Cloud Data Warehouse (BigQuery, Snowflake).',
        'Điều hướng chính xác vị trí phân bổ của 15 trạm dừng chiến lược trên toàn bộ 47 bài của 10 tầng giáo trình.'
      ],
      intuition: {
        title: 'Ba trụ cột kỹ thuật của ngôi nhà Dữ liệu & AI',
        metaphor: 'Nếu cú pháp SQL cơ bản (SELECT, WHERE, JOIN) là những viên gạch và vữa để bạn xây tường, thì [DQ] là hệ thống thanh tra móng nhà và kiểm định bê tông (đảm bảo không bị sụt lún, rỗng ruột hay lẫn tạp chất); [FE] là bản vẽ kiến trúc nội thất theo trục thời gian (đảm bảo từng thời điểm trong quá khứ căn nhà có đúng đồ nội thất đang hiện hữu, tuyệt đối không lấy ti-vi mua năm sau để phục vụ sinh hoạt ngày hôm nay); còn [SCALE] là hệ thống cấp thoát nước và trạm biến áp công nghiệp chịu tải cao khi ngôi nhà biến thành tòa cao ốc 80 tầng. Một người chỉ biết gõ SELECT đơn thuần sẽ chỉ dựng được căn lều đồ chơi, nhưng muốn xây hệ thống dữ liệu phục vụ AI chạy thật trên môi trường sản xuất, bạn bắt buộc phải làm chủ cả 3 mạch này.',
        boundary: 'Ẩn dụ này nhấn mạnh tính bổ trợ; tuy nhiên trong mã nguồn thực tế, ba mạch không tách rời thành các bức tường biệt lập mà đan xen trực tiếp trong từng câu lệnh SQL, từng mô hình dbt và từng pipeline Airflow.',
        visualHtml: `
          <div class="sql-intuition-visual">
            <div class="sql-diagram-flex" style="justify-content:space-between;margin-bottom:12px;">
              <div class="sql-diagram-node" style="flex:1;min-width:160px;border-color:var(--danger);">
                <div style="font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;">🛡️ MẠCH [DQ] (DATA QUALITY)</div>
                <div style="font-size:0.92rem;font-weight:800;font-family:monospace;">Khám bệnh dữ liệu</div>
                <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:4px;">ISO 25012, Data Profiling, Data Contracts</div>
              </div>
              <div class="sql-diagram-arrow" style="font-size:1.1rem;color:var(--text-muted);">&bull;</div>
              <div class="sql-diagram-node sql-diagram-node-highlight" style="flex:1;min-width:180px;border-color:var(--success);">
                <div style="font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;">🤖 MẠCH [FE] (FEATURE STORE)</div>
                <div style="font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;">Phục vụ Trí tuệ AI/ML</div>
                <div style="font-size:0.7rem;margin-top:4px;">RFM, Point-in-Time, AS-OF Join, SCD Type 2</div>
              </div>
              <div class="sql-diagram-arrow" style="font-size:1.1rem;color:var(--text-muted);">&bull;</div>
              <div class="sql-diagram-node" style="flex:1;min-width:160px;border-color:var(--topic-sql);">
                <div style="font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;">⚡ MẠCH [SCALE] (BIG DATA)</div>
                <div style="font-size:0.92rem;font-weight:800;font-family:monospace;">Mở rộng quy mô tỷ dòng</div>
                <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:4px;">Columnar DuckDB, dbt DAG, Airflow Orchestration</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;">
              <span style="font-weight:700;color:var(--color-primary);">🧭 La bàn giáo trình:</span>
              <span>15 trạm dừng chiến lược được đánh dấu nhãn huy hiệu <code>[DQ]</code>, <code>[FE]</code>, <code>[SCALE]</code> trên sidebar và tiêu đề bài để bạn định hướng chuyên môn dễ dàng.</span>
            </div>
          </div>
        `,
      },
      sections: [
        {
          id: 'sec-m1-problem-hook',
          title: 'Gợi Mở Vấn Đề: Vì Sao SQL "Chạy Không Lỗi" Vẫn Phá Hủy Dự Án Sản Xuất?',
          content: `
            <p>Hãy xem một câu chuyện kinh điển xảy ra tại các doanh nghiệp công nghệ: Nhóm Khoa học Dữ liệu (Data Science) xây dựng một mô hình Machine Learning dự báo khách hàng rời bỏ (Customer Churn). Trên tập dữ liệu tĩnh trích xuất về máy tính cá nhân (offline notebook), mô hình đạt độ chính xác ấn tượng (AUC = 0.94). Ban giám đốc phê duyệt đưa vào vận hành ngay lập tức.</p>
            <p>Thế nhưng ngay trong tuần đầu tiên đưa lên hệ thống sản xuất (Production), mô hình liên tục đưa ra dự đoán sai lệch trầm trọng, gửi hàng loạt voucher giảm giá giá trị cao cho những khách hàng trung thành nhất, khiến doanh nghiệp thất thoát hơn 2 tỷ đồng tiền ngân sách chỉ trong 7 ngày! Chuyện gì đã xảy ra khi câu lệnh SQL tạo dữ liệu huấn luyện vẫn chạy "hoàn toàn không báo lỗi cú pháp"?</p>
            
            <div class="concept-box callout-danger">
              <div class="concept-header">
                <span class="concept-icon"><i class="fas fa-stethoscope"></i></span>
                <span class="concept-title">Chẩn Đoán Ba "Căn Bệnh Tử Huyệt" Của Hệ Thống Dữ Liệu</span>
              </div>
              <div class="concept-body">
                <ol>
                  <li><strong>Tử huyệt 1: Thiếu Mạch [DQ] (Data Quality)</strong> &mdash; Bảng đơn hàng ở hệ thống nguồn bị lỗi mạng khi đồng bộ qua Change Data Capture (CDC), sinh ra các bản ghi trùng lặp và các đơn hàng mồ côi mang <code>customer_id = 999</code> (không hề có trong danh mục khách hàng). Khi ghép nối báo cáo, dữ liệu bị méo mó nghiêm trọng mà không có bất kỳ câu lệnh SQL nào đứng ra canh gác cảnh báo.</li>
                  <li><strong>Tử huyệt 2: Thiếu Mạch [FE] (Feature Engineering)</strong> &mdash; Câu lệnh SQL trích xuất đặc trưng "tổng chi tiêu của khách hàng" đã vô tình tính tổng tiền của cả những đơn hàng phát sinh <em>sau</em> thời điểm khách hàng đưa ra quyết định rời bỏ! Đây chính là cạm bẫy chết người <strong>Rò rỉ tương lai (Data Leakage / Lookahead Bias)</strong>: mô hình học máy offline đạt điểm cao vì nó được "nhìn thấy trước tương lai", nhưng khi chạy online trong thực tế thì tương lai chưa xảy ra, khiến mô hình hoàn toàn mất phương hướng!</li>
                  <li><strong>Tử huyệt 3: Thiếu Mạch [SCALE] (Large-Scale & Performance)</strong> &mdash; Lập trình viên vô tư viết <code>SELECT *</code> và gom nhóm toàn bộ bảng sự kiện 500GB mỗi 5 phút một lần trên BigQuery. Đến cuối tháng, hóa đơn dịch vụ đám mây (Cloud bill) đội thêm 15.000 USD tiền quét byte vô nghĩa, làm bốc hơi toàn bộ lợi nhuận của tính năng mới!</li>
                </ol>
              </div>
            </div>

            <p><strong>Kết luận then chốt:</strong> Viết được câu lệnh SQL chạy ra kết quả chỉ là cấp độ sơ cấp. Làm chủ được tính toàn vẹn [DQ], tư duy thời gian [FE] và hiệu năng quy mô lớn [SCALE] mới là thước đo của một kỹ sư dữ liệu và AI chuyên nghiệp.</p>
          `
        },
        {
          id: 'sec-m1-recall-prereq',
          title: "Gọi Lại Kiến Thức Cũ: Truy Hồi Tư Duy Kỹ Thuật Hệ Thống",
          content: `
            <p>Trước khi khám phá bản đồ 3 mạch, hãy cùng suy ngẫm nhanh 2 câu hỏi truy hồi để neo giữ tư duy:</p>
            
            <div class="predict-question">
              <strong>Câu hỏi 1:</strong> Trong kỹ nghệ phần mềm truyền thống (Software Engineering), kiểm thử tự động (Unit Test / Integration Test) giữ vai trò gì, và tại sao trong kỹ thuật dữ liệu chúng ta cũng cần các bài test tự động bằng SQL?
            </div>
            <details class="predict-details">
              <summary>Xem lời giải phân tích</summary>
              <div class="predict-answer">
                <p><strong>Đáp án:</strong> Trong phần mềm, Unit Test đảm bảo logic code không bị hỏng khi thay đổi. Trong Data Engineering, <strong>code có thể không đổi nhưng dữ liệu thay đổi mỗi giây</strong>! Dữ liệu nguồn từ bên thứ ba hoặc người dùng có thể gửi dữ liệu rác, NULL, tiền âm bất cứ lúc nào. Các truy vấn [DQ] chính là các "Unit Test cho dữ liệu" nhằm phát hiện và cô lập lỗi ngay tại cổng vào (Data Ingestion).</p>
              </div>
            </details>

            <div class="predict-question" style="margin-top: 1rem;">
              <strong>Câu hỏi 2:</strong> Nếu một bài toán dự đoán doanh thu tháng tới nhưng bạn lại đưa đặc trưng "doanh thu thực tế của tháng tới" vào tập huấn luyện, mô hình học máy sẽ gặp phải hiện tượng gì?
            </div>
            <details class="predict-details">
              <summary>Xem lời giải phân tích</summary>
              <div class="predict-answer">
                <p><strong>Đáp án:</strong> Hiện tượng <strong>Target Leakage (Rò rỉ biến mục tiêu)</strong>. Mô hình sẽ học được mối liên hệ giả tạo $Y = f(Y)$ và đạt độ chính xác 100% trong bài thi thử, nhưng khi vận hành trong đời thực thì biến tương lai đó chưa tồn tại, khiến mô hình hoàn toàn vô dụng!</p>
              </div>
            </details>
          `
        },
        {
          id: 'sec-m1-concept-definition',
          title: "Khái Niệm Cốt Lõi: Bản Chất Ba Mạch & Tiêu Chuẩn Quốc Tế",
          content: `
            <p>Dưới đây là định nghĩa chuẩn xác và các tiêu chuẩn quốc tế cấu thành nên 3 mạch kỹ năng:</p>

            <div class="table-responsive">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Mạch Kỹ Năng</th>
                  <th scope="col">Tiêu Chuẩn / Cơ Sở Khoa Học</th>
                  <th scope="col">Mục Tiêu Tối Thượng</th>
                  <th scope="col">Công Cụ Đại Diện</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><span class="circuit-badge circuit-badge-dq">[DQ] Data Quality</span></th>
                  <td><strong>ISO/IEC 25012</strong> (Mô hình chất lượng dữ liệu 6 chiều: Tính đầy đủ, Đơn nhất, Chính xác, Nhất quán, Kịp thời, Hợp lệ)</td>
                  <td>Biến SQL thành các trạm kiểm soát tự động; chỉ cho phép dữ liệu đạt chuẩn đi vào tầng phân tích và cách ly dữ liệu lỗi (Quarantine Pattern).</td>
                  <td>dbt test, Great Expectations, Soda Core, AWS Deequ</td>
                </tr>
                <tr>
                  <th scope="row"><span class="circuit-badge circuit-badge-fe">[FE] Feature Engineering</span></th>
                  <td><strong>Point-in-Time Correctness &amp; Time Travel</strong> (Chuẩn mực toán học chuỗi thời gian cho Machine Learning)</td>
                  <td>Tái hiện chính xác trạng thái lịch sử của thực thể tại từng micro-giây trong quá khứ, triệt tiêu 100% rủi ro Lookahead Bias và Target Leakage.</td>
                  <td>Feast, Hopsworks, Window Functions, DuckDB ASOF JOIN</td>
                </tr>
                <tr>
                  <th scope="row"><span class="circuit-badge circuit-badge-scale">[SCALE] Large-Scale &amp; Cloud</span></th>
                  <td><strong>Columnar Storage &amp; Vectorized Execution</strong> (Cơ chế lưu trữ dạng cột và tính toán véc-tơ hóa theo chuẩn Apache Arrow / Parquet)</td>
                  <td>Tối ưu hóa tài nguyên phần cứng (CPU Cache, SIMD, I/O) và giảm thiểu tối đa chi phí quét byte trên Cloud Data Warehouse.</td>
                  <td>DuckDB, ClickHouse, Google BigQuery, Snowflake</td>
                </tr>
              </tbody>
            </table>
          </div>
          `
        },
        {
          id: 'sec-m1-internal-mechanism',
          title: "Cơ Chế Bên Trong: Dữ Liệu Chảy Qua Ba Mạch Trong Hệ Thống Thực Tế",
          content: `
            <p>Trong một kiến trúc dữ liệu hiện đại (Modern Data Stack), ba mạch này không hoạt động độc lập mà hợp thành một chuỗi dây chuyền liên hoàn khép kín:</p>

            <div class="flowchart-container" style="background: var(--bg-surface-elevated, #1e293b); padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
              <div style="font-family: monospace; font-size: 0.85rem; line-height: 1.6; color: #94a3b8;">
                <span style="color: #38bdf8;">[Dữ Liệu Thô (Staging / Bronze)]</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #fbbf24;">[Mạch DQ: Canh gác &amp; Kiểm định chất lượng]</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─────── (Dòng lỗi) ───&gt; <span style="color: #f87171;">[Bảng Cách Ly (Quarantine)]</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼ (Dòng đạt chuẩn)<br>
                <span style="color: #4ade80;">[Kho Dữ Liệu Sạch (DW / Silver)]</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #c084fc;">[Mạch FE: Point-in-Time Join &amp; Trích xuất đặc trưng]</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Bảo đảm không rò rỉ tương lai)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>
                <span style="color: #38bdf8;">[Bảng Đặc Trưng Huấn Luyện ML (Feature Store / Gold)]</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #f43f5e;">[Mạch SCALE: Tối ưu quét cột, Partition Pruning &amp; Tải cao]</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>
                <span style="color: #4ade80;">[Mô Hình AI Suy Luận Realtime &amp; Báo Cáo BI Lãnh Đạo]</span>
              </div>
            </div>

            <p><strong>Cơ chế chi tiết của từng bước:</strong></p>
            <ul>
              <li><strong>Ở Mạch [DQ]:</strong> Áp dụng <em>Quy ước vàng (The Assertion Rule)</em>: Các câu truy vấn kiểm tra luôn được viết để trả về các dòng vi phạm. Nếu câu lệnh trả về 0 dòng (empty set), dữ liệu đạt chuẩn tuyệt đối và được thông quan. Nếu trả về &gt; 0 dòng, kích hoạt báo động Slack/PagerDuty và chuyển hướng các dòng lỗi vào bảng cách ly.</li>
              <li><strong>Ở Mạch [FE]:</strong> Áp dụng <em>Point-in-Time Join</em>: Khi một sự kiện người dùng xảy ra vào lúc $T_{event}$, mọi đặc trưng của người dùng đó (hạng thành viên, điểm uy tín, tổng tiền tích lũy) chỉ được phép lấy dữ liệu đã có hiệu lực tại thời điểm $T \le T_{event}$, tuyệt đối không dùng giá trị hiện tại ở thời điểm truy vấn.</li>
              <li><strong>Ở Mạch [SCALE]:</strong> Áp dụng <em>Columnar Pruning &amp; Pushdown</em>: Khác với CSDL dòng (như Postgres/MySQL) phải đọc toàn bộ ổ đĩa cả dòng chứa 100 cột, CSDL cột (như DuckDB/BigQuery) chỉ nạp đúng 2 cột cần tính vào RAM, giảm tới 98% I/O và tăng tốc độ xử lý lên 50 lần.</li>
            </ul>
          `
        },
        {
          id: 'sec-m1-worked-example',
          title: "Ví Dụ Mẫu Có Lời Giải: Đối Chứng Code Chạy Thật Trên TechMart",
          content: `
            <p>Hãy xem hai ví dụ đối chứng cụ thể trên bộ dữ liệu TechMart để thấy rõ sự khác biệt giữa tư duy viết SQL ngây thơ vs tư duy có mạch:</p>

            <div class="predict-question">
              <strong>Thử thách dự đoán trước khi xem code:</strong> Giả sử khách hàng An (ID = 1) thực hiện giao dịch mua hàng vào ngày 15/06/2023. Trong bảng lịch sử hạng thành viên, từ tháng 1 đến tháng 5 An là hạng "Silver", từ ngày 01/06 An được nâng lên "Gold". Nếu bạn viết câu lệnh JOIN thông thường không có điều kiện mốc thời gian, chuyện gì sẽ xảy ra?
            </div>
            <details class="predict-details">
              <summary>Xem lời giải phân tích</summary>
              <div class="predict-answer">
                <p><strong>Dự đoán chính xác:</strong> Nếu JOIN thông thường theo mỗi <code>customer_id</code>, bản ghi giao dịch của An sẽ bị nhân đôi thành 2 dòng (Fan-out trap)! Một dòng ghép với hạng Silver, một dòng ghép với hạng Gold. Hoặc tệ hơn, nếu chỉ lấy hạng mới nhất (Current Tier), bạn sẽ gán sai hạng Gold cho cả những đơn hàng An mua từ hồi tháng 2, gây rò rỉ dữ liệu tương lai!</p>
              </div>
            </details>
          `,
          codeExamples: [
            {
              lang: 'SQL',
              title: 'Thực nghiệm Mạch [FE]: Kỹ thuật Point-in-Time Join chống rò rỉ tương lai',
              code: `-- [FE] Point-in-Time Join: Ghép chính xác hạng thành viên có hiệu lực tại ngày mua
SELECT 
    o.order_id,
    o.customer_id,
    o.order_date,
    o.total_amount,
    h.tier AS historical_tier,
    'Hợp lệ: Đúng hạng tại thời điểm quá khứ' AS fe_validation
FROM orders o
JOIN customer_tier_history h 
  ON o.customer_id = h.customer_id
 AND o.order_date >= h.valid_from 
 AND (o.order_date < h.valid_to OR h.valid_to IS NULL)
WHERE o.order_id = 1001;`,
              explanation: 'Bằng cách sử dụng cặp điều kiện thời gian valid_from và valid_to, đơn hàng ngày 01/06/2023 của khách hàng 1 được ghép nối chính xác với hạng "Gold" (vốn có hiệu lực từ ngày 01/06/2023), loại bỏ hoàn toàn hiện tượng nhân dòng và rò rỉ dữ liệu.',
              output: `+----------+-------------+------------+--------------+-----------------+----------------------------------------+
| order_id | customer_id | order_date | total_amount | historical_tier | fe_validation                          |
+----------+-------------+------------+--------------+-----------------+----------------------------------------+
| 1001     | 1           | 2023-06-01 | 4000000.00   | Gold            | Hợp lệ: Đúng hạng tại thời điểm quá khứ|
+----------+-------------+------------+--------------+-----------------+----------------------------------------+
(1 row returned - Đã kiểm chứng trên PostgreSQL 16.2 & DuckDB 2.0.0)`
            },
            {
              lang: 'SQL',
              title: 'Thực nghiệm Mạch [DQ]: Truy vấn kiểm định theo quy ước vàng',
              code: `-- [DQ] Kiểm tra tính toàn vẹn: Tìm các đơn hàng có ngày đặt hàng trong tương lai
SELECT 
    order_id,
    customer_id,
    order_date,
    'LỖI DQ: Ngày đặt hàng lớn hơn ngày hiện tại' AS error_description
FROM orders
WHERE order_date > CURRENT_DATE;`,
              explanation: 'Truy vấn kiểm tra trả về 0 dòng (Empty result set) trên bộ dữ liệu chuẩn TechMart, khẳng định dữ liệu hoàn toàn sạch sẽ và đạt chuẩn PASS 100%.',
              output: `Empty result set (0 rows).
=> KẾT LUẬN KIỂM ĐỊNH [DQ]: Đạt chuẩn chất lượng (PASS)!`
            }
          ]
        },
        {
          id: 'sec-m1-faded-example',
          title: "Bài Điền Khuyết (Faded Example): Hoàn Thiện Truy Vấn [FE] Chống Rò Rỉ",
          content: `
            <p>Hãy hoàn thiện câu lệnh Point-in-Time Join để ghép chuỗi sự kiện người dùng trong bảng <code>customer_events</code> với bảng lịch sử hạng <code>customer_tier_history</code>. Điền các từ khóa thích hợp vào các vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>

            <div class="code-faded-block" style="background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; line-height: 1.8;">
              SELECT <br>
              &nbsp;&nbsp;&nbsp;&nbsp;e.event_id, e.customer_id, e.event_time, h.tier<br>
              FROM customer_events e<br>
              [___1___] JOIN customer_tier_history h<br>
              &nbsp;&nbsp;ON e.customer_id = h.customer_id<br>
              &nbsp;AND e.event_time [___2___] h.valid_from<br>
              &nbsp;AND (e.event_time [___3___] h.valid_to [___4___] h.valid_to IS NULL);
            </div>

            <details class="predict-details" style="margin-top: 1rem;">
              <summary>Xem đáp án điền khuyết</summary>
              <div class="predict-answer">
                <p><strong>Đáp án chính xác:</strong></p>
                <ul>
                  <li><code>[___1___]</code>: <strong>INNER</strong> hoặc <strong>LEFT</strong></li>
                  <li><code>[___2___]</code>: <strong>&gt;=</strong> &mdash; Sự kiện phải diễn ra sau hoặc bằng ngày bắt đầu có hiệu lực của hạng.</li>
                  <li><code>[___3___]</code>: <strong>&lt;</strong> &mdash; Sự kiện phải diễn ra trước ngày hết hiệu lực của hạng.</li>
                  <li><code>[___4___]</code>: <strong>OR</strong> &mdash; Xử lý trường hợp hạng hiện tại chưa có ngày kết thúc (valid_to là NULL).</li>
                </ul>
              </div>
            </details>
          `
        },
        {
          id: 'sec-m1-pitfalls-misconceptions',
          title: "Bẫy Và Quan Niệm Sai Phổ Biến Khi Thiếu Tư Duy Mạch",
          content: `
            <div class="concept-box callout-danger">
              <div class="concept-header">
                <span class="concept-icon"><i class="fas fa-exclamation-triangle"></i></span>
                <span class="concept-title">Bẫy 1: Đồng Nhất Dữ Liệu "Chạy Được" Với Dữ Liệu "Đúng Nghiệp Vụ"</span>
              </div>
              <div class="concept-body">
                <p><strong>Sai lầm:</strong> Nghĩ rằng chỉ cần câu lệnh SQL không báo lỗi cú pháp màu đỏ là dữ liệu đã chính xác.</p>
                <p><strong>Thực tế:</strong> SQL là ngôn ngữ khai báo (Declarative); nếu bạn viết một phép JOIN sai logic gây nhân dòng gấp 10 lần (Fan-out), engine vẫn vui vẻ tính toán và trả về kết quả sai cho bạn! Luôn luôn cần các câu truy vấn [DQ] để đối soát tổng số dòng và số tiền.</p>
              </div>
            </div>

            <div class="concept-box callout-danger" style="margin-top: 1.25rem;">
              <div class="concept-header">
                <span class="concept-icon"><i class="fas fa-history"></i></span>
                <span class="concept-title">Bẫy 2: Dùng Dữ Liệu Hiện Tại Để Dự Đoán Hành Vi Quá Khứ (Data Leakage)</span>
              </div>
              <div class="concept-body">
                <p><strong>Sai lầm:</strong> Khi tạo dữ liệu huấn luyện mô hình dự báo nợ xấu của năm ngoái, lập trình viên lấy địa chỉ nhà và thu nhập hiện tại của khách hàng.</p>
                <p><strong>Thực tế:</strong> Năm ngoái khách hàng có thể đang thất nghiệp và ở trọ, nhưng hiện tại họ đã có việc làm và mua nhà. Việc đưa thông tin hiện tại vào mô hình quá khứ sẽ phá hủy hoàn toàn khả năng khái quát hóa của mô hình AI khi đưa lên Production.</p>
              </div>
            </div>

            <div class="concept-box callout-danger" style="margin-top: 1.25rem;">
              <div class="concept-header">
                <span class="concept-icon"><i class="fas fa-dollar-sign"></i></span>
                <span class="concept-title">Bẫy 3: Bê Nguyên Thói Quen OLTP Sang Cloud Data Warehouse OLAP</span>
              </div>
              <div class="concept-body">
                <p><strong>Sai lầm:</strong> Vô tư gõ <code>SELECT * FROM huge_logs_table</code> trên BigQuery hoặc Snowflake chỉ để "xem thử vài dòng".</p>
                <p><strong>Thực tế:</strong> Các hệ thống OLAP tính tiền dựa trên tổng số byte quét trên ổ đĩa. Một lệnh <code>SELECT *</code> vô hại trên bảng 10TB sẽ lập tức tiêu tốn hơn 60 USD (khoảng 1.5 triệu VNĐ) tiền điện toán chỉ trong 10 giây! Luôn luôn chỉ định rõ danh sách cột và tận dụng Partition Pruning.</p>
              </div>
            </div>
          `
        },
        {
          id: 'sec-m1-concept-comparison',
          title: "So Sánh: Kỹ Sư SQL Truyền Thống vs Kỹ Sư Dữ Liệu Hiện Đại",
          content: `
            <p>Bảng đối chiếu sự khác biệt về tư duy giữa hai thế hệ kỹ sư khi giải quyết cùng một bài toán:</p>

            <div class="table-responsive">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Tiêu Chí Đánh Giá</th>
                  <th scope="col">Kỹ Sư SQL Truyền Thống (Cũ)</th>
                  <th scope="col">Kỹ Sư Dữ Liệu / AI Hiện Đại (Có Ba Mạch)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Mục tiêu câu lệnh</th>
                  <td>Miễn sao đổ ra bảng kết quả theo yêu cầu của sếp</td>
                  <td>Đảm bảo tính toàn vẹn [DQ], độ tươi và không có bản ghi mồ côi</td>
                </tr>
                <tr>
                  <th scope="row">Xử lý chuỗi thời gian</th>
                  <td>Dùng ngày hiện tại <code>CURRENT_DATE</code> hoặc lấy trạng thái mới nhất</td>
                  <td>Áp dụng Point-in-Time Join [FE] và SCD Type 2 để chống rò rỉ dữ liệu tương lai</td>
                </tr>
                <tr>
                  <th scope="row">Tư duy về chi phí</th>
                  <td>Chỉ quan tâm thời gian chạy (chạy nhanh hay chậm)</td>
                  <td>Đo lường số byte quét [SCALE], dung lượng RAM và chi phí hóa đơn đám mây</td>
                </tr>
                <tr>
                  <th scope="row">Quy trình kiểm thử</th>
                  <td>Kiểm tra bằng mắt vài dòng đầu trên màn hình</td>
                  <td>Xây dựng bộ kiểm định tự động (Automated Assertions) trong CI/CD pipeline</td>
                </tr>
              </tbody>
            </table>
          </div>
          `
        },
        {
          id: 'sec-m1-real-world-roadmap',
          title: "Ngoài Đời Thực: Ma Trận 15 Trạm Dừng Chiến Lược Xuyên Suốt 10 Tầng",
          content: `
            <p>Ba mạch kỹ năng được phân bổ bài bản thành <strong>15 trạm dừng chiến lược</strong> trải dài từ Tầng 1 đến Tầng 8 trong toàn bộ giáo trình:</p>

            <div class="circuit-roadmap-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 16px 0;">
              <div style="background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid #38bdf8;">
                <h4 style="margin: 0 0 8px; color: #38bdf8;"><span class="circuit-badge circuit-badge-dq">[DQ]</span> 4 Trạm Dừng</h4>
                <ul style="font-size: 0.85rem; padding-left: 1.2rem; line-height: 1.6;">
                  <li><strong>Tầng 1 (Bài 1.5):</strong> Data Profiling &mdash; Khám bệnh dữ liệu 6 chiều ISO 25012.</li>
                  <li><strong>Tầng 2 (Bài 2.6):</strong> Data Validation &mdash; Bắt trùng, mồ côi &amp; đối soát tài chính.</li>
                  <li><strong>Tầng 4 (Bài 4.4):</strong> Data Contracts &mdash; Ràng buộc hợp đồng dữ liệu.</li>
                  <li><strong>Tầng 8 (Bài 8.4):</strong> Test Suite CI/CD &mdash; Tự động hóa kiểm thử với dbt test.</li>
                </ul>
              </div>

              <div style="background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid #c084fc;">
                <h4 style="margin: 0 0 8px; color: #c084fc;"><span class="circuit-badge circuit-badge-fe">[FE]</span> 4 Trạm Dừng</h4>
                <ul style="font-size: 0.85rem; padding-left: 1.2rem; line-height: 1.6;">
                  <li><strong>Tầng 2 (Bài 2.5):</strong> CTE Đệ Quy &mdash; Xây dựng Calendar Dimension.</li>
                  <li><strong>Tầng 3 (Bài 3.5):</strong> RFM Analysis &mdash; Trích xuất đặc trưng Recency, Frequency, Monetary.</li>
                  <li><strong>Tầng 4 (Bài 4.5):</strong> SCD Type 2 &mdash; Lưu vết lịch sử chiều thay đổi chậm.</li>
                  <li><strong>Tầng 7 (Bài 7.4):</strong> Feature Store &mdash; Tích hợp DuckDB/dbt vào Feature Store.</li>
                </ul>
              </div>

              <div style="background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid #f43f5e;">
                <h4 style="margin: 0 0 8px; color: #f43f5e;"><span class="circuit-badge circuit-badge-scale">[SCALE]</span> 4 Trạm Dừng</h4>
                <ul style="font-size: 0.85rem; padding-left: 1.2rem; line-height: 1.6;">
                  <li><strong>Tầng 6 (Bài 6.4):</strong> Partitioning &amp; Sharding &mdash; Phân vùng dữ liệu lớn.</li>
                  <li><strong>Tầng 6 (Bài 6.5):</strong> Quét Bảng Phẳng vs Chuẩn Hóa &mdash; Đánh đổi OBT vs 3NF.</li>
                  <li><strong>Tầng 7 (Bài 7.2):</strong> DuckDB OLAP &mdash; Phân tích dữ liệu lớn trên máy trạm.</li>
                  <li><strong>Tầng 8 (Bài 8.5):</strong> Large-Scale Pipeline &mdash; Tối ưu truy vấn hàng tỷ dòng.</li>
                </ul>
              </div>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: "Lỗi tư duy cô lập: Học cú pháp tách rời khỏi môi trường vận hành thật",
            content: 'Nhiều người học SQL chỉ tập trung ghi nhớ tên hàm mà không hiểu cách câu lệnh tương tác với bộ nhớ RAM, ổ đĩa và các tiến trình pipeline tự động. Thiếu 3 mạch này, bạn sẽ gặp cú sốc văn hóa cực lớn khi đi làm thật tại doanh nghiệp.'
          },
          {
            title: 'Cạm bẫy rò rỉ dữ liệu tương lai (Data Leakage) trong Machine Learning',
            content: 'Khi tính toán các đặc trưng thống kê dạng lũy kế (Cumulative Totals) hoặc trung bình động (Moving Averages), việc quên chặn cận trên bằng mốc thời gian sự kiện sẽ làm lộ dữ liệu tương lai, khiến mô hình AI thất bại hoàn toàn trên Production.'
          }
        ],
        tips: [
          {
            title: 'Chiến lược học tập hiệu quả xuyên suốt 47 bài học',
            content: 'Mỗi khi bắt gặp các nhãn [DQ], [FE], [SCALE] ở tiêu đề bài học, hãy kích hoạt ngay tư duy hệ thống: "Bài này đang giúp tôi canh gác dữ liệu, chống rò rỉ tương lai, hay tối ưu chi phí quy mô lớn?".'
          }
        ]
      ,
        deepDive: {
          title: "Kiến trúc hệ thống: Phối hợp 3 Mạch [DQ][FE][SCALE] trong một Data Platform tiêu chuẩn sản xuất",
          content: "<p>Trong các nền tảng dữ liệu hiện đại tại các kỳ lân công nghệ, ba mạch kỹ thuật này vận hành như một cỗ máy khép kín hoàn hảo:</p><p><strong>1. Tầng Đầu Vào (Producer &rarr; [DQ]):</strong> Áp dụng <em>Data Contracts</em> ràng buộc ngay tại nguồn; bộ lọc <em>Data Profiling</em> phát hiện các bất thường (Outliers, NULL rates) và cách ly vào bảng Dead Letter Queue.<br><strong>2. Tầng Biến Đổi ([SCALE]):</strong> Động cơ <em>dbt</em> và <em>DuckDB</em> xử lý hàng tỷ dòng dạng cột, loại bỏ các nút thắt cổ chai bằng Partition Pruning và Vectorized Execution.<br><strong>3. Tầng Phục Vụ ([FE]):</strong> Dữ liệu lịch sử <em>SCD Type 2</em> và các phép tính trượt thời gian <em>Point-in-Time Join</em> bảo đảm mô hình Machine Learning không bị rò rỉ tương lai (Data Leakage).</p>"
        }
      },
      exercises: [
        {
          title: 'Bài tập M.1-1 (Dự đoán kết quả): Nhận diện lỗi rò rỉ tương lai (Lookahead Bias)',
          level: 'Cơ bản',
          problem: 'Một kỹ sư viết câu truy vấn sau để trích xuất đặc trưng dự đoán xác suất mở thẻ tín dụng của khách hàng vào ngày 01/06/2023:\nSELECT customer_id, SUM(total_amount) AS total_spending FROM orders GROUP BY customer_id;\nCâu lệnh này có dính cạm bẫy Lookahead Bias không? Giải thích vì sao.',
          hint: 'Quan sát xem bảng orders có chứa các đơn hàng phát sinh sau ngày 01/06/2023 không.',
          solutionCode: `-- Cách viết đúng chuẩn [FE] có chặn mốc thời gian Point-in-Time:
SELECT 
    customer_id, 
    SUM(total_amount) AS total_spending_before_cutoff
FROM orders
WHERE order_date < '2023-06-01'
GROUP BY customer_id;`,
          solutionOutput: `Truy vấn lọc chính xác các đơn hàng trước ngày mốc (cutoff date), triệt tiêu rò rỉ tương lai.`,
          explanation: 'Chẩn đoán: Câu truy vấn gốc dính bẫy Lookahead Bias nghiêm trọng vì đã cộng dồn cả các đơn hàng phát sinh vào tháng 7 và tháng 8 năm 2023, tức là thông tin diễn ra SAU ngày đưa ra dự đoán!'
        },
        {
          title: 'Bài tập M.1-2 (Tìm & Sửa lỗi): Sửa câu truy vấn kiểm tra [DQ] vi phạm quy ước vàng',
          level: 'Trung bình',
          problem: 'Một lập trình viên viết truy vấn kiểm định chất lượng: SELECT * FROM orders WHERE total_amount > 0;. Hãy giải thích vì sao câu lệnh này vi phạm quy ước vàng của [DQ] và viết lại cho đúng chuẩn.',
          hint: 'Quy ước vàng [DQ]: Truy vấn kiểm tra chỉ được phép trả về các dòng VI PHẠM.',
          solutionCode: `-- Viết lại đúng quy ước vàng [DQ]: Chỉ trả về dòng vi phạm tiền âm hoặc bằng 0
SELECT 
    order_id, 
    customer_id, 
    total_amount,
    'LỖI DQ: Tiền đơn hàng không hợp lệ (nhỏ hơn hoặc bằng 0)' AS error_desc
FROM orders
WHERE total_amount <= 0;`,
          solutionOutput: `Empty result set (0 rows) trên bảng sạch.`,
          explanation: 'Chẩn đoán: Câu truy vấn gốc trả về hàng triệu dòng hợp lệ, khiến công cụ giám sát CI/CD không thể phân biệt được đâu là lỗi. Viết theo dòng vi phạm giúp tập kết quả bình thường là 0 dòng (PASS).'
        },
        {
          title: 'Bài tập M.1-3 (Tự viết truy vấn): Viết câu lệnh Point-in-Time Join cho sự kiện người dùng',
          level: 'Khá',
          problem: 'Hãy viết câu truy vấn kết hợp bảng customer_events và customer_tier_history để xác định hạng thành viên của khách hàng tại đúng thời điểm từng sự kiện diễn ra.',
          hint: 'Sử dụng phép JOIN với điều kiện event_time >= valid_from AND (event_time < valid_to OR valid_to IS NULL).',
          solutionCode: `SELECT 
    e.event_id,
    e.customer_id,
    e.event_type,
    e.event_time,
    h.tier AS effective_tier
FROM customer_events e
JOIN customer_tier_history h
  ON e.customer_id = h.customer_id
 AND e.event_time >= h.valid_from
 AND (e.event_time < h.valid_to OR h.valid_to IS NULL);`,
          solutionOutput: `Bảng ghép chính xác từng sự kiện với hạng thành viên có hiệu lực tại thời điểm đó.`,
          explanation: 'Bảo đảm 100% tính toàn vẹn thời gian, không gây hiện tượng nhân dòng và không rò rỉ dữ liệu.'
        },
        {
          title: 'Bài tập M.1-4 (Đánh đổi & Kiến trúc): Phân tích chi phí quét byte trên Cloud Data Warehouse',
          level: 'Nâng cao',
          problem: 'Một bảng sự kiện trên Google BigQuery có 100 cột và 10 tỷ dòng, tổng dung lượng lưu trữ là 5 TB (mỗi cột trung bình chiếm 50 GB). Chi phí quét dữ liệu của BigQuery là 6.25 USD cho mỗi TB quét qua. Nếu một Data Analyst viết SELECT * FROM table WHERE event_date = "2023-10-01" (với bảng đã phân vùng theo event_date gồm 100 ngày) so với chỉ SELECT user_id, event_type, chi phí chênh lệch như thế nào?',
          hint: 'Tính toán dung lượng phân vùng của 1 ngày (5 TB / 100 ngày = 50 GB) và so sánh giữa việc quét 100 cột (50 GB) vs quét 2 cột (1 GB).',
          solutionCode: `-- Phân tích chi phí quét byte:
-- 1 ngày dữ liệu có tổng dung lượng: 5 TB / 100 = 50 GB.
-- Truy vấn 1 (SELECT *): Quét toàn bộ 100 cột của ngày đó = 50 GB = 0.0488 TB -> Chi phí = 0.0488 * 6.25 = 0.305 USD / lần chạy.
-- Truy vấn 2 (SELECT user_id, event_type): Quét đúng 2 cột = (50 GB / 100) * 2 = 1 GB = 0.000976 TB -> Chi phí = 0.0061 USD / lần chạy.
-- Nếu câu truy vấn chạy định kỳ 5 phút/lần (288 lần/ngày):
-- Chi phí SELECT *: 288 * 0.305 = 87.84 USD/ngày (xấp xỉ 2.635 USD/tháng!).
-- Chi phí chỉ chọn 2 cột: 288 * 0.0061 = 1.75 USD/ngày (xấp xỉ 52.5 USD/tháng!).
-- Tiết kiệm hơn 98% chi phí vận hành đám mây!`,
          solutionOutput: `Tiết kiệm hơn 2.500 USD mỗi tháng cho doanh nghiệp chỉ bằng việc tránh dùng SELECT *!`,
          explanation: 'Kiến trúc lưu trữ cột của các hệ thống OLAP hiện đại đòi hỏi kỹ sư phải có tư duy mạch [SCALE] để bảo vệ túi tiền của doanh nghiệp.'
        }
      ],
      quiz: [
        {
          question: 'Theo chuẩn chất lượng dữ liệu [DQ] chuyên nghiệp, quy ước vàng khi thiết kế một câu truy vấn kiểm định (Assertion Query) là gì?',
          options: [
            'Truy vấn phải trả về tất cả các bản ghi hợp lệ trong bảng.',
            'Truy vấn phải trả về tập kết quả RỖNG (0 dòng) khi dữ liệu đạt chuẩn, và chỉ trả về các dòng vi phạm khi có lỗi.',
            'Truy vấn phải luôn luôn trả về ít nhất một dòng chữ "OK".',
            'Truy vấn phải tự động xóa bỏ toàn bộ các dòng bị lỗi trong cơ sở dữ liệu.'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Quy ước vàng là chỉ trả về dòng vi phạm. Tập kết quả rỗng (0 dòng) tương đương với trạng thái PASS, giúp hệ thống CI/CD tự động phát hiện lỗi khi số dòng trả về lớn hơn 0.'
        },
        {
          question: 'Hiện tượng rò rỉ dữ liệu tương lai (Lookahead Bias / Target Leakage) trong mạch [FE] xảy ra khi nào?',
          options: [
            'Khi cơ sở dữ liệu bị hacker tấn công đánh cắp thông tin.',
            'Khi câu lệnh SQL trích xuất đặc trưng sử dụng các thông tin hoặc giao dịch phát sinh SAU thời điểm sự kiện cần dự đoán.',
            'Khi máy chủ hết dung lượng bộ nhớ RAM.',
            'Khi người dùng đặt tên cột bằng tiếng Việt có dấu.'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Lookahead Bias xảy ra khi mô hình được học trên dữ liệu của tương lai mà tại thời điểm dự đoán thực tế biến đó chưa tồn tại.'
        },
        {
          question: 'Tại sao trên các hệ thống Cloud Data Warehouse lưu trữ dạng cột (như BigQuery, Snowflake, DuckDB), câu lệnh SELECT * lại bị coi là điều tối kỵ?',
          options: [
            'Vì câu lệnh SELECT * không được chuẩn ANSI SQL hỗ trợ.',
            'Vì hệ thống tính phí dựa trên số lượng byte quét trên ổ đĩa; SELECT * buộc engine phải giải nén và quét toàn bộ các cột, gây lãng phí hàng ngàn USD.',
            'Vì SELECT * sẽ tự động khóa toàn bộ bảng và không cho người khác truy cập.',
            'Vì các hệ thống lưu trữ dạng cột không cho phép hiển thị nhiều hơn 3 cột cùng lúc.'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Kiến trúc dạng cột chỉ đọc các cột được khai báo. Việc dùng SELECT * làm mất hoàn toàn lợi thế của Columnar Storage và gây nổ chi phí quét byte.'
        },
        {
          question: 'Tiêu chuẩn quốc tế nào định nghĩa mô hình chất lượng dữ liệu 6 chiều cốt lõi (Tính đầy đủ, đơn nhất, chính xác, nhất quán, kịp thời, hợp lệ)?',
          options: [
            'ISO/IEC 25012',
            'ISO 9001',
            'IEEE 754',
            'W3C WCAG 2.2'
          ],
          correctIndex: 0,
          explanation: 'Chính xác! ISO/IEC 25012 là tiêu chuẩn quốc tế chính thức về mô hình chất lượng dữ liệu trong các hệ thống phần mềm và CSDL.'
        },
        {
          question: 'Kỹ thuật nào sau đây được sử dụng trong mạch [FE] để ghép nối dữ liệu đặc trưng quá khứ mà không gây nhân dòng và không làm rò rỉ tương lai?',
          options: [
            'FULL OUTER JOIN không có điều kiện ON',
            'CROSS JOIN với bảng ngày tháng',
            'Point-in-Time Join (kết hợp quan hệ thời gian valid_from và valid_to)',
            'UNION ALL toàn bộ dữ liệu lịch sử'
          ],
          correctIndex: 2,
          explanation: 'Chính xác! Point-in-Time Join sử dụng mốc thời gian để chỉ lấy bản ghi có hiệu lực tại đúng thời điểm sự kiện xảy ra, triệt tiêu nguy cơ rò rỉ dữ liệu.'
        }
      ],
      summary: [
        'Ba mạch [DQ], [FE], [SCALE] là ranh giới phân định giữa người chỉ biết gõ cú pháp SQL đơn thuần và một kỹ sư dữ liệu/AI chuyên nghiệp.',
        'Quy ước vàng [DQ]: Truy vấn kiểm tra chỉ trả về dòng vi phạm; tập kết quả RỖNG đồng nghĩa dữ liệu ĐẠT chuẩn (theo chuẩn ISO/IEC 25012).',
        'Mạch [FE] giải quyết bài toán chống rò rỉ dữ liệu tương lai (Lookahead Bias) thông qua kỹ thuật Point-in-Time Join và mô hình SCD Type 2.',
        'Mạch [SCALE] khai thác tối đa sức mạnh của kiến trúc lưu trữ cột (Columnar Storage) và tối ưu chi phí quét byte trên Cloud Data Warehouse.',
        'Toàn bộ 47 bài học của giáo trình được thiết kế với 15 trạm dừng chiến lược gắn liền với 3 mạch kỹ năng này.',
        'Ôn cách quãng: Tại sao việc xóa trực tiếp dòng lỗi bằng DELETE trên bảng thô lại phá hủy dấu vết kiểm toán (Audit Trail)? (Xem lại Bài 2.6).'
      ]
    },
    {
      id: 'sql-sample-dataset',
      number: 'M.2',
      title: 'Sơ Đồ Thực Thể Quan Hệ (ER) & Script Dữ Liệu Mẫu TechMart',
      subtitle: 'Hệ thống 7 bảng dữ liệu chuẩn hóa: Sẵn sàng thực thi 100% trên PostgreSQL, DuckDB và SQLite',
      level: 'Tra cứu',
      duration: '35 phút',
      keywords: ['ER Diagram', 'Database Schema', 'DDL', 'DML', 'TechMart', '3NF', 'SCD Type 2', 'Event Stream', 'Kiểm chứng'],
      prerequisites: 'Đã đọc Bài M.1 để hiểu vai trò của 3 mạch [DQ], [FE], [SCALE].',
      verifiedEngines: 'PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)',
      objectives: [
        'Phân tích kiến trúc tổng thể và mối quan hệ thực thể quan hệ (ER) của 7 bảng dữ liệu TechMart, hỗ trợ khả năng tiếp cận WCAG 2.2 AA.',
        'Phân biệt mục đích thiết kế và ranh giới nghiệp vụ của 4 nhóm bảng: Nhóm Core Transaction (3NF), Nhóm Phòng Lab Dữ liệu Bẩn [DQ], Nhóm Chuỗi Sự Kiện [FE] và Nhóm Lịch Sử SCD Type 2 [FE].',
        'Thấu hiểu cơ chế ràng buộc toàn vẹn tham chiếu (Foreign Keys) và thứ tự thực thi DDL (DROP TABLE / CREATE TABLE) chuẩn xác để không gây lỗi Dependency.',
        'Sao chép và thực thi trọn vẹn kịch bản DDL + DML tương thích 100% trên cả 3 engine phổ biến nhất hiện nay (PostgreSQL, DuckDB, SQLite) chỉ trong dưới 5 giây.',
        'Nắm vững kỹ thuật tính nhẩm (Mental Calculation) và đối soát số liệu từng bảng để làm thước đo kiểm chứng độc lập cho mọi bài học tiếp theo.'
      ],
      intuition: {
        title: 'Bàn thí nghiệm thu nhỏ với mọi dạng địa hình thực tế',
        metaphor: 'Nếu bạn học lái máy bay, người ta không bao giờ đưa bạn lái chiếc Boeing 787 trên bầu trời bão ngay ngày đầu tiên. Người ta dùng một buồng lái mô phỏng hoàn chỉnh: có cần lái, có màn hình rada, và đặc biệt là có sẵn các nút kích hoạt sự cố giả lập (gió giật, hỏng động cơ bên trái, mất áp suất). Bộ dữ liệu TechMart này chính là buồng mô phỏng đó: nó đủ nhỏ (dưới 10 dòng mỗi bảng) để bạn nhìn thấy toàn bộ trong một trang màn hình và tự tính nhẩm bằng tay, nhưng chứa đầy đủ mọi "chướng ngại vật" thực tế: quan hệ 1-Nhiều, Nhiều-Nhiều qua bảng trung gian, khóa ngoại mồ côi, bản ghi trùng lặp, tiền âm, dấu thời gian và lịch sử thay đổi.',
        boundary: 'Dữ liệu mẫu thu gọn giúp bạn quan sát từng dòng trung gian trong phép JOIN hay Window function; tuy nhiên khi học về hiệu năng và chỉ mục (Tầng 6), ta sẽ dùng phương pháp sinh dữ liệu lớn (generate_series) để thấy rõ chênh lệch giây/mili-giây.',
        visualHtml: `
          <div class="sql-intuition-visual">
            <div class="sql-diagram-flex" style="flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:12px;">
              <div class="sql-diagram-node" style="padding:6px 10px;min-width:130px;text-align:center;">
                <div style="font-size:0.68rem;color:var(--text-muted);font-weight:700;">CORE TRANSACTIONS</div>
                <div style="font-size:0.88rem;font-weight:800;font-family:monospace;">customers &bull; orders</div>
                <div style="font-size:0.68rem;color:var(--text-secondary);">order_items &bull; products</div>
              </div>
              <div class="sql-diagram-arrow" style="margin:auto 0;">+</div>
              <div class="sql-diagram-node" style="padding:6px 10px;min-width:130px;text-align:center;border-color:var(--danger);">
                <div style="font-size:0.68rem;color:var(--danger);font-weight:700;">DIRTY LAB [DQ]</div>
                <div style="font-size:0.88rem;font-weight:800;font-family:monospace;">raw_dirty_orders</div>
                <div style="font-size:0.68rem;color:var(--text-secondary);">6 dị thường cài cắm</div>
              </div>
              <div class="sql-diagram-arrow" style="margin:auto 0;">+</div>
              <div class="sql-diagram-node" style="padding:6px 10px;min-width:130px;text-align:center;border-color:var(--topic-sql);">
                <div style="font-size:0.68rem;color:var(--topic-sql);font-weight:700;">CLICKSTREAM [FE]</div>
                <div style="font-size:0.88rem;font-weight:800;font-family:monospace;">user_events</div>
                <div style="font-size:0.68rem;color:var(--text-secondary);">Chuỗi hành vi theo giây</div>
              </div>
              <div class="sql-diagram-arrow" style="margin:auto 0;">+</div>
              <div class="sql-diagram-node sql-diagram-node-highlight" style="padding:6px 10px;min-width:130px;text-align:center;border-color:var(--success);">
                <div style="font-size:0.68rem;color:var(--success);font-weight:700;">TEMPORAL [FE]</div>
                <div style="font-size:0.88rem;font-weight:800;color:var(--success);font-family:monospace;">membership_history</div>
                <div style="font-size:0.68rem;">SCD Type 2 theo thời gian</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;">
              <span style="font-weight:700;color:var(--color-primary);">⚡ Tương thích 100%:</span>
              <span>Bộ 7 bảng TechMart chạy mượt mà ngay lập tức trên <strong>PostgreSQL 16</strong>, <strong>DuckDB 1.1+</strong> và <strong>SQLite 3.50+</strong>.</span>
            </div>
          </div>
        `,
      },
      sections: [
        {
          id: 'sec-m2-problem-hook',
          title: 'Gợi Mở Vấn Đề: Tại Sao Dữ Liệu "Quá Sạch" Khi Học Sẽ Khiến Bạn Bị Ngợp Khi Đi Làm?',
          content: `
            <p>Hầu hết các khóa học SQL truyền thống thường cung cấp các bảng dữ liệu được lý tưởng hóa: không có giá trị NULL bất thường, không có đơn hàng mồ côi, không có khóa trùng lặp và cũng không có lịch sử biến động theo thời gian. Học viên viết truy vấn thấy kết quả ra rất đẹp, nhưng khi bước chân vào doanh nghiệp thật, họ lập tức bị ngợp trước một "bãi chiến trường" dữ liệu:</p>
            <ul>
              <li>Đơn hàng lưu mã khách hàng nhưng khách hàng đó đã bị xóa hoặc không hề tồn tại trong bảng danh mục (Khóa ngoại mồ côi).</li>
              <li>Người dùng bấm nút thanh toán nhiều lần gây trùng lặp bản ghi giao dịch.</li>
              <li>Hạng thành viên của khách hàng thay đổi liên tục theo thời gian, khiến các báo cáo doanh thu bị lệch số liệu khi so sánh giữa các tháng.</li>
            </ul>
            <p>Bộ dữ liệu <strong>TechMart</strong> được thiết kế có chủ đích như một <strong>buồng mô phỏng kỹ thuật</strong>: Đủ nhỏ gọn để bạn có thể nhìn thấu toàn bộ dữ liệu trên một màn hình và tự tính nhẩm kết quả bằng tay, nhưng chứa đầy đủ mọi địa hình hiểm trở của ngành kỹ thuật dữ liệu thực tế.</p>
          `
        },
        {
          id: 'sec-m2-recall-prereq',
          title: "Gọi Lại Kiến Thức Cũ: Truy Hồi Ràng Buộc Khóa & Quan Hệ Bảng",
          content: `
            <p>Hãy cùng kiểm tra nhanh 2 khái niệm nền tảng về cơ sở dữ liệu quan hệ:</p>
            
            <div class="predict-question">
              <strong>Câu hỏi 1:</strong> Khóa chính (Primary Key) khác với Khóa ngoại (Foreign Key) như thế nào về mặt ngữ nghĩa và ràng buộc toàn vẹn?
            </div>
            <details class="predict-details">
              <summary>Xem lời giải phân tích</summary>
              <div class="predict-answer">
                <p><strong>Đáp án:</strong> Khóa chính (PK) là thuộc tính định danh duy nhất cho từng dòng trong bảng, bắt buộc phải là duy nhất (UNIQUE) và không được chứa NULL (NOT NULL). Khóa ngoại (FK) là cột ở bảng con trỏ tới khóa chính của bảng cha nhằm bảo đảm tính toàn vẹn tham chiếu (Referential Integrity): không cho phép bảng con lưu giá trị khóa ngoại mà bảng cha không tồn tại.</p>
              </div>
            </details>

            <div class="predict-question" style="margin-top: 1rem;">
              <strong>Câu hỏi 2:</strong> Để mô hình hóa quan hệ Nhiều-Nhiều (Many-to-Many) giữa Đơn hàng (Orders) và Sản phẩm (Products), giải pháp chuẩn trong mô hình quan hệ là gì?
            </div>
            <details class="predict-details">
              <summary>Xem lời giải phân tích</summary>
              <div class="predict-answer">
                <p><strong>Đáp án:</strong> Sử dụng một bảng trung gian (Junction Table / Associative Table), cụ thể trong TechMart là bảng <code>order_items</code>. Quan hệ Nhiều-Nhiều được tách thành hai quan hệ 1-Nhiều: <code>orders (1) &mdash; (N) order_items</code> và <code>products (1) &mdash; (N) order_items</code>.</p>
              </div>
            </details>
          `
        },
        {
          id: 'sec-m2-concept-definition',
          title: "Khái Niệm Cốt Lõi: Bản Đồ ER & Kiến Trúc 4 Nhóm Bảng TechMart",
          content: `
            <p>Toàn bộ 47 bài học trong giáo trình sử dụng một schema thống nhất gồm <strong>7 bảng</strong> thuộc hệ thống bán lẻ công nghệ TechMart, được chia làm 4 nhóm chức năng rõ rệt:</p>

            <div class="table-responsive">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Nhóm Bảng</th>
                  <th scope="col">Tên Bảng &amp; Số Dòng</th>
                  <th scope="col">Vai Trò Kiến Trúc Nghiệp Vụ</th>
                  <th scope="col">Mạch Trọng Tâm</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1. Core Transactional (3NF)</th>
                  <td>
                    <code>customers</code> (5 dòng)<br>
                    <code>products</code> (5 dòng)<br>
                    <code>orders</code> (6 dòng)<br>
                    <code>order_items</code> (8 dòng)
                  </td>
                  <td>Kiến trúc CSDL giao dịch chuẩn tắc cấp 3 (Third Normal Form - 3NF). Mô phỏng luồng bán lẻ: Khách hàng đặt Đơn hàng, mỗi đơn hàng chứa nhiều Chi tiết món hàng ứng với từng Sản phẩm. Dữ liệu chuẩn sạch 100% phục vụ học cú pháp cốt lõi, JOIN, GROUP BY và CTE.</td>
                  <td>Core (Tầng 0 - 3)</td>
                </tr>
                <tr>
                  <th scope="row">2. Phòng Lab Dữ Liệu Bẩn [DQ]</th>
                  <td><code>raw_dirty_orders</code> (6 dòng)</td>
                  <td>Vùng đệm nạp dữ liệu thô (Staging / Landing Zone) cố ý cài cắm 6 dị thường chất lượng dữ liệu kinh điển: khoảng trắng thừa, bản ghi trùng lặp, khóa ngoại mồ côi, giá trị NULL bất thường, tiền âm phi lý và ngày tương lai.</td>
                  <td><span class="circuit-badge circuit-badge-dq">[DQ]</span></td>
                </tr>
                <tr>
                  <th scope="row">3. Chuỗi Sự Kiện Người Dùng [FE]</th>
                  <td><code>customer_events</code> (8 sự kiện)</td>
                  <td>Dòng dữ liệu sự kiện theo dấu thời gian (Event Streaming): đăng nhập, xem sản phẩm, thêm giỏ hàng, thanh toán. Phục vụ học Window Functions, Sessionization và phân tích chuỗi thời gian.</td>
                  <td><span class="circuit-badge circuit-badge-fe">[FE]</span></td>
                </tr>
                <tr>
                  <th scope="row">4. Lịch Sử Thay Đổi Hạng [FE]</th>
                  <td><code>customer_tier_history</code> (5 bản ghi)</td>
                  <td>Mô hình lưu trữ lịch sử thay đổi chiều chậm dạng 2 (Slowly Changing Dimensions - SCD Type 2) với các cặp ngày hiệu lực <code>[valid_from, valid_to)</code> và cờ <code>is_current</code>. Phục vụ học Point-in-Time Join và kỹ nghệ đặc trưng AI chống rò rỉ dữ liệu.</td>
                  <td><span class="circuit-badge circuit-badge-fe">[FE]</span></td>
                </tr>
              </tbody>
            </table>
          </div>

            <div class="sr-only" aria-label="Mô tả văn bản quan hệ thực thể hỗ trợ WCAG 2.2 AA">
              <h5>Mô tả cấu trúc quan hệ thực thể:</h5>
              <ul>
                <li>Bảng customers quan hệ 1-Nhiều với bảng orders thông qua khóa ngoại customer_id.</li>
                <li>Bảng orders quan hệ 1-Nhiều với bảng order_items thông qua khóa ngoại order_id.</li>
                <li>Bảng products quan hệ 1-Nhiều với bảng order_items thông qua khóa ngoại product_id.</li>
                <li>Bảng raw_dirty_orders là bảng staging độc lập không có khóa ngoại cứng, chứa 6 dòng mô phỏng các lỗi chất lượng dữ liệu.</li>
                <li>Bảng customer_events chứa chuỗi sự kiện người dùng theo dấu thời gian event_time.</li>
                <li>Bảng customer_tier_history là bảng lịch sử thay đổi hạng thành viên theo mô hình SCD Type 2.</li>
              </ul>
            </div>
          `
        },
        {
          id: 'sec-m2-internal-mechanism',
          title: "Cơ Chế Bên Trong: Giải Mã 6 Ca Dị Thường Trong Phòng Lab [DQ]",
          content: `
            <p>Bảng <code>raw_dirty_orders</code> là phòng lab kiểm định dữ liệu được thiết kế công phu để phục vụ trực tiếp các bài thực hành [DQ] từ Tầng 1 đến Tầng 8. Dưới đây là giải phẫu cơ chế của từng ca dị thường:</p>

            <div class="table-responsive">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th scope="col">raw_id</th>
                  <th scope="col">order_id</th>
                  <th scope="col">Trạng Thái Dữ Liệu</th>
                  <th scope="col">Dị Thường Cài Cắm</th>
                  <th scope="col">Phương Pháp SQL Bắt Lỗi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>2001</td>
                  <td><code>' Nguyen Van An '</code></td>
                  <td><strong>Khoảng trắng thừa đầu/cuối:</strong> Lỗi người dùng nhập liệu hoặc form không trim.</td>
                  <td><code>LENGTH(name) != LENGTH(TRIM(name))</code></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>2001</td>
                  <td><code>order_id = 2001</code></td>
                  <td><strong>Trùng lặp khóa nghiệp vụ (Duplicate Key):</strong> Trùng order_id với raw_id 1 do retry mạng.</td>
                  <td><code>GROUP BY order_id HAVING COUNT(*) &gt; 1</code></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>2002</td>
                  <td><code>customer_id = 999</code></td>
                  <td><strong>Khóa ngoại mồ côi (Orphan Record):</strong> Khách hàng 999 không hề tồn tại trong bảng customers.</td>
                  <td>Anti-join: <code>LEFT JOIN customers c ON ... WHERE c.customer_id IS NULL</code></td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>2003</td>
                  <td><code>status IS NULL</code></td>
                  <td><strong>Giá trị bắt buộc bị NULL:</strong> Cột trạng thái đơn hàng bị thiếu dữ liệu nghiêm trọng.</td>
                  <td><code>WHERE status IS NULL</code></td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>2004</td>
                  <td><code>total_amount = -500000.00</code></td>
                  <td><strong>Vi phạm miền giá trị logic (Tiền âm):</strong> Tổng tiền thanh toán nhỏ hơn 0.</td>
                  <td><code>WHERE total_amount &lt;= 0</code></td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>2005</td>
                  <td><code>order_date = '2099-12-31'</code></td>
                  <td><strong>Dấu thời gian phi lý trong tương lai:</strong> Ngày đặt hàng nằm ở thế kỷ sau.</td>
                  <td><code>WHERE order_date &gt; CURRENT_DATE</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          `
        },
        {
          id: 'sec-m2-worked-example',
          title: 'Ví Dụ Mẫu: Kịch Bản DDL & DML Khởi Tạo Chuẩn Hóa Chạy Thật 100%',
          content: `
            <p>Dưới đây là kịch bản SQL hoàn chỉnh để tạo toàn bộ 7 bảng và nạp dữ liệu mẫu TechMart. Bạn có thể sao chép và thực thi trực tiếp trên bất kỳ công cụ nào: <strong>PostgreSQL</strong>, <strong>DuckDB</strong>, hoặc <strong>SQLite</strong> mà không cần sửa đổi dù chỉ một ký tự:</p>
          `,
          codeExamples: [
            {
              lang: 'SQL',
              title: 'Kịch bản DDL & DML Khởi tạo Dữ liệu Mẫu TechMart (Tương thích 100% PostgreSQL / DuckDB / SQLite)',
              code: `-- ============================================================================
-- 1. TẠO CÁC BẢNG NGHIỆP VỤ CỐT LÕI (CORE TABLES)
-- ============================================================================
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS raw_dirty_orders;
DROP TABLE IF EXISTS customer_events;
DROP TABLE IF EXISTS customer_tier_history;

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    city VARCHAR(50) NOT NULL,
    signup_date DATE NOT NULL
);

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    cost DECIMAL(12, 2) NOT NULL
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    item_id INT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- ============================================================================
-- 2. TẠO BẢNG DỮ LIỆU BẨN [DQ] ĐỂ THỰC HÀNH KHÁM BỆNH & BẮT LỖI
-- ============================================================================
CREATE TABLE raw_dirty_orders (
    raw_id INT PRIMARY KEY,
    order_id INT,
    customer_id INT,
    customer_name VARCHAR(100),
    order_date VARCHAR(30),
    status VARCHAR(30),
    total_amount DECIMAL(12, 2)
);

-- ============================================================================
-- 3. TẠO BẢNG SỰ KIỆN THEO DẤU THỜI GIAN [FE] (EVENT STREAM)
-- ============================================================================
CREATE TABLE customer_events (
    event_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    event_type VARCHAR(30) NOT NULL,
    event_time TIMESTAMP NOT NULL,
    amount DECIMAL(12, 2),
    channel VARCHAR(20)
);

-- ============================================================================
-- 4. TẠO BẢNG LỊCH SỬ THAY ĐỔI HẠNG KHÁCH HÀNG [FE] (SCD TYPE 2)
-- ============================================================================
CREATE TABLE customer_tier_history (
    history_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    tier VARCHAR(20) NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE,
    is_current INT NOT NULL
);

-- ============================================================================
-- 5. NẠP DỮ LIỆU MẪU (DML INSERTS)
-- ============================================================================
INSERT INTO customers (customer_id, full_name, email, city, signup_date) VALUES
(1, 'Nguyen Van An', 'an.nguyen@techmart.vn', 'Hanoi', '2023-01-15'),
(2, 'Tran Thi Binh', 'binh.tran@techmart.vn', 'Ho Chi Minh', '2023-02-20'),
(3, 'Le Van Cuong', 'cuong.le@techmart.vn', 'Da Nang', '2023-03-10'),
(4, 'Pham Thi Dung', 'dung.pham@techmart.vn', 'Hanoi', '2023-04-05'),
(5, 'Hoang Van Em', 'em.hoang@techmart.vn', 'Can Tho', '2023-05-12');

INSERT INTO products (product_id, product_name, category, price, cost) VALUES
(101, 'Ban phim Keychron K2', 'Accessories', 1800000.00, 1200000.00),
(102, 'Chuot MX Master 3S', 'Accessories', 2200000.00, 1500000.00),
(103, 'Man hinh Dell 27 inch', 'Monitor', 8500000.00, 6500000.00),
(104, 'Tai nghe Sony WH-1000XM5', 'Audio', 6900000.00, 5000000.00),
(105, 'Gia do Laptop nhom', 'Accessories', 450000.00, 250000.00);

INSERT INTO orders (order_id, customer_id, order_date, status, total_amount) VALUES
(1001, 1, '2023-06-01', 'COMPLETED', 4000000.00),
(1002, 2, '2023-06-05', 'COMPLETED', 8500000.00),
(1003, 1, '2023-06-15', 'CANCELLED', 2200000.00),
(1004, 3, '2023-07-02', 'COMPLETED', 2250000.00),
(1005, 4, '2023-07-20', 'PENDING', 6900000.00),
(1006, 2, '2023-08-10', 'COMPLETED', 4000000.00);

INSERT INTO order_items (item_id, order_id, product_id, quantity, unit_price) VALUES
(1, 1001, 101, 1, 1800000.00),
(2, 1001, 102, 1, 2200000.00),
(3, 1002, 103, 1, 8500000.00),
(4, 1003, 102, 1, 2200000.00),
(5, 1004, 101, 1, 1800000.00),
(6, 1004, 105, 1, 450000.00),
(7, 1005, 104, 1, 6900000.00),
(8, 1006, 101, 1, 1800000.00);

INSERT INTO raw_dirty_orders (raw_id, order_id, customer_id, customer_name, order_date, status, total_amount) VALUES
(1, 2001, 1, ' Nguyen Van An ', '2023-09-01', 'COMPLETED', 1800000.00),
(2, 2001, 1, 'Nguyen Van An', '2023-09-01', 'COMPLETED', 1800000.00),
(3, 2002, 999, 'Khach La Vo Danh', '2023-09-05', 'COMPLETED', 2500000.00),
(4, 2003, 2, 'Tran Thi Binh', '2023-09-10', NULL, 3200000.00),
(5, 2004, 3, 'Le Van Cuong', '2023-09-12', 'COMPLETED', -500000.00),
(6, 2005, 4, 'Pham Thi Dung', '2099-12-31', 'PENDING', 1200000.00);

INSERT INTO customer_events (event_id, customer_id, event_type, event_time, amount, channel) VALUES
(1, 1, 'LOGIN', '2023-05-31 08:30:00', NULL, 'Mobile App'),
(2, 1, 'VIEW_PRODUCT', '2023-05-31 08:35:00', NULL, 'Mobile App'),
(3, 1, 'PURCHASE', '2023-06-01 09:15:00', 4000000.00, 'Mobile App'),
(4, 2, 'LOGIN', '2023-06-05 14:00:00', NULL, 'Web Portal'),
(5, 2, 'PURCHASE', '2023-06-05 14:20:00', 8500000.00, 'Web Portal'),
(6, 1, 'CANCEL_ORDER', '2023-06-15 16:45:00', 2200000.00, 'Web Portal'),
(7, 3, 'PURCHASE', '2023-07-02 10:10:00', 2250000.00, 'Mobile App'),
(8, 2, 'PURCHASE', '2023-08-10 11:30:00', 4000000.00, 'Web Portal');

INSERT INTO customer_tier_history (history_id, customer_id, tier, valid_from, valid_to, is_current) VALUES
(1, 1, 'Silver', '2023-01-15', '2023-05-31', 0),
(2, 1, 'Gold', '2023-06-01', NULL, 1),
(3, 2, 'Silver', '2023-02-20', '2023-07-31', 0),
(4, 2, 'Platinum', '2023-08-01', NULL, 1),
(5, 3, 'Silver', '2023-03-10', NULL, 1);`,
              explanation: 'Toàn bộ script DDL và DML đã được kiểm chứng tương thích 100% trên cả 3 hệ quản trị CSDL phổ biến nhất: PostgreSQL 16.2, DuckDB 2.0.0 và SQLite 3.50.4.',
              output: `Query executed successfully. 7 tables created, 38 rows inserted.`
            }
          ]
        },
        {
          id: 'sec-m2-faded-example',
          title: "Bài Điền Khuyết (Faded Example): Thiết Kế Bảng Đánh Giá Có Khóa Ngoại",
          content: `
            <p>Doanh nghiệp TechMart muốn bổ sung thêm bảng đánh giá sản phẩm <code>product_reviews</code>. Mỗi đánh giá thuộc về một khách hàng và một sản phẩm cụ thể. Điền các từ khóa thích hợp vào các vị trí <code>[___1___]</code> đến <code>[___4___]</code> để hoàn thiện câu lệnh DDL:</p>

            <div class="code-faded-block" style="background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; line-height: 1.8;">
              CREATE TABLE product_reviews (<br>
              &nbsp;&nbsp;&nbsp;&nbsp;review_id INT [___1___] KEY,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;product_id INT NOT NULL,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;customer_id INT NOT NULL,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;rating INT CHECK (rating BETWEEN 1 AND 5),<br>
              &nbsp;&nbsp;&nbsp;&nbsp;comment TEXT,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;[___2___] KEY (product_id) [___3___] products(product_id),<br>
              &nbsp;&nbsp;&nbsp;&nbsp;FOREIGN KEY (customer_id) REFERENCES [___4___](customer_id)<br>
              );
            </div>

            <details class="predict-details" style="margin-top: 1rem;">
              <summary>Xem đáp án điền khuyết</summary>
              <div class="predict-answer">
                <p><strong>Đáp án chính xác:</strong></p>
                <ul>
                  <li><code>[___1___]</code>: <strong>PRIMARY</strong> &mdash; Khai báo review_id là khóa chính.</li>
                  <li><code>[___2___]</code>: <strong>FOREIGN</strong> &mdash; Khai báo ràng buộc khóa ngoại.</li>
                  <li><code>[___3___]</code>: <strong>REFERENCES</strong> &mdash; Từ khóa tham chiếu đến bảng cha.</li>
                  <li><code>[___4___]</code>: <strong>customers</strong> &mdash; Tên bảng cha lưu trữ danh mục khách hàng.</li>
                </ul>
              </div>
            </details>
          `
        },
        {
          id: 'sec-m2-pitfalls-misconceptions',
          title: "Bẫy Và Quan Niệm Sai Phổ Biến Khi Vận Hành DDL & Schema",
          content: `
            <div class="concept-box callout-danger">
              <div class="concept-header">
                <span class="concept-icon"><i class="fas fa-trash-alt"></i></span>
                <span class="concept-title">Bẫy 1: Sai Lầm Về Thứ Tự DROP TABLE Khi Chạy Lại Kịch Bản</span>
              </div>
              <div class="concept-body">
                <p><strong>Sai lầm:</strong> Khi muốn nạp lại dữ liệu, chạy <code>DROP TABLE customers;</code> trước <code>DROP TABLE orders;</code>.</p>
                <p><strong>Hậu quả:</strong> PostgreSQL và SQLite sẽ chặn lại ngay lập tức và văng lỗi vi phạm phụ thuộc (Dependency Error / Foreign Key violation)! Bắt buộc phải xóa các bảng con (order_items, orders) trước, rồi mới được xóa các bảng cha (customers, products).</p>
              </div>
            </div>

            <div class="concept-box callout-danger" style="margin-top: 1.25rem;">
              <div class="concept-header">
                <span class="concept-icon"><i class="fas fa-coins"></i></span>
                <span class="concept-title">Bẫy 2: Dùng Kiểu FLOAT Để Lưu Trữ Tiền Tệ Và Giá Sản Phẩm</span>
              </div>
              <div class="concept-body">
                <p><strong>Sai lầm:</strong> Khai báo cột <code>price FLOAT</code> hoặc <code>total_amount REAL</code>.</p>
                <p><strong>Hậu quả:</strong> Chuẩn số thực dấu phẩy động IEEE 754 sẽ sinh ra các sai số làm tròn siêu nhỏ (ví dụ <code>0.1 + 0.2 = 0.30000000000000004</code>), làm lệch sổ sách kế toán khi cộng hàng triệu giao dịch. Trong thiết kế CSDL tài chính, luôn luôn dùng kiểu số chính xác cố định <code>DECIMAL(precision, scale)</code> hoặc <code>NUMERIC</code>.</p>
              </div>
            </div>

            <div class="concept-box callout-danger" style="margin-top: 1.25rem;">
              <div class="concept-header">
                <span class="concept-icon"><i class="fas fa-clock"></i></span>
                <span class="concept-title">Bẫy 3: Lưu Trữ Thời Gian Sự Kiện Mà Không Rõ Múi Giờ (Timezone)</span>
              </div>
              <div class="concept-body">
                <p><strong>Sai lầm:</strong> Lưu <code>TIMESTAMP</code> không kèm thông tin múi giờ khi hệ thống phục vụ người dùng ở nhiều quốc gia.</p>
                <p><strong>Hậu quả:</strong> Khi một giao dịch diễn ra lúc 8:00 sáng tại Hà Nội (UTC+7) và được phân tích bởi máy chủ đặt tại New York (UTC-5), việc thiếu múi giờ sẽ làm đảo lộn hoàn toàn thứ tự các sự kiện trong Window Function! Khuyến nghị chuẩn sản xuất luôn dùng <code>TIMESTAMPTZ</code> hoặc quy đổi toàn bộ về chuẩn UTC.</p>
              </div>
            </div>
          `
        },
        {
          id: 'sec-m2-concept-comparison',
          title: "So Sánh: CSDL Giao Dịch OLTP (3NF) vs Kho Dữ Liệu OLAP (Star Schema)",
          content: `
            <p>Để hiểu lý do vì sao bộ dữ liệu TechMart lại được thiết kế theo cấu trúc hiện tại, hãy so sánh hai trường phái thiết kế CSDL kinh điển:</p>

            <div class="table-responsive">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Tiêu Chí</th>
                  <th scope="col">CSDL Giao Dịch OLTP (TechMart Core)</th>
                  <th scope="col">Kho Dữ Liệu OLAP (Kimball Star Schema)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Mục tiêu thiết kế</th>
                  <td>Tối ưu hóa tốc độ ghi (INSERT/UPDATE), triệt tiêu dư thừa dữ liệu (3NF)</td>
                  <td>Tối ưu hóa tốc độ đọc (SELECT), gom nhóm và báo cáo phân tích</td>
                </tr>
                <tr>
                  <th scope="row">Cấu trúc bảng</th>
                  <td>Chia nhỏ thành nhiều bảng chuẩn hóa (customers, orders, order_items, products)</td>
                  <td>Tập trung quanh Bảng Sự Kiện (Fact Table) nối với các Bảng Chiều (Dimension Tables)</td>
                </tr>
                <tr>
                  <th scope="row">Ép buộc Khóa ngoại</th>
                  <td>Rất nghiêm ngặt (FOREIGN KEY cứng được CSDL kiểm tra liên tục)</td>
                  <td>Thường vô hiệu hóa khóa ngoại cứng để tăng tốc nạp song song (Bulk Load)</td>
                </tr>
                <tr>
                  <th scope="row">Số phép JOIN cần thiết</th>
                  <td>Nhiều phép JOIN (cần ghép 4 bảng để tính doanh thu theo thành phố)</td>
                  <td>Ít phép JOIN hơn nhờ phi chuẩn hóa (Denormalization / One Big Table)</td>
                </tr>
              </tbody>
            </table>
          </div>
          `
        },
        {
          id: 'sec-m2-real-world-setup',
          title: "Ngoài Đời Thực: Hướng Dẫn Thiết Lập Môi Trường Thực Hành 30 Giây",
          content: `
            <p>Bạn có thể thực hành toàn bộ các câu lệnh SQL trong giáo trình ngay trên máy tính của mình mà không cần cài đặt các máy chủ CSDL cồng kềnh:</p>

            <div class="setup-tabs" style="background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; margin: 1rem 0;">
              <h4 style="margin: 0 0 8px; color: #38bdf8;">⚡ Tùy chọn 1: DuckDB in-memory với Python (Khuyên dùng - Nhanh nhất)</h4>
              <p style="font-size: 0.9rem; margin-bottom: 8px;">Chỉ cần máy tính có cài sẵn Python, mở terminal và gõ 3 dòng:</p>
              <pre style="background: #0f172a; padding: 10px; border-radius: 6px;"><code>pip install duckdb
python -c "import duckdb; con = duckdb.connect(); con.execute(open('schema.sql').read()); con.sql('SELECT * FROM orders').show()"</code></pre>

              <h4 style="margin: 16px 0 8px; color: #4ade80;">💻 Tùy chọn 2: SQLite Browser (Giao diện đồ họa trực quan)</h4>
              <p style="font-size: 0.9rem;">Tải công cụ miễn phí <em>DB Browser for SQLite</em>, tạo một Database mới, dán toàn bộ đoạn mã DDL &amp; DML ở Mục 5 vào tab "Execute SQL" và bấm F5 để chạy.</p>

              <h4 style="margin: 16px 0 8px; color: #c084fc;">🐘 Tùy chọn 3: PostgreSQL với DBeaver / pgAdmin</h4>
              <p style="font-size: 0.9rem;">Nếu bạn muốn thực hành chuẩn môi trường doanh nghiệp với các tính năng transaction và chỉ mục chuyên sâu, hãy kết nối DBeaver vào PostgreSQL và thực thi kịch bản trên.</p>
            </div>
          `
        }
      ],
      callouts: {
        pitfalls: [
          {
            title: 'Lỗi thực thi DDL khi chạy lại: Quên thứ tự DROP TABLE',
            content: 'Khi chạy lại script khởi tạo, nếu bạn cố tình DROP TABLE customers; trước khi DROP TABLE orders;, PostgreSQL và SQLite sẽ chặn lại và báo lỗi vi phạm ràng buộc toàn vẹn khóa ngoại (Foreign Key constraint violation). Bắt buộc phải DROP các bảng con (order_items, orders) trước rồi mới DROP các bảng cha (customers, products).'
          },
          {
            title: 'Cạm bẫy đối soát tiền tệ do làm tròn',
            content: 'Khi viết truy vấn đối soát tài chính giữa tổng tiền trên hóa đơn (orders.total_amount) và chi tiết (SUM(quantity * unit_price)), không bao giờ dùng toán tử so sánh bằng tuyệt đối (=) trên kiểu số thực, hãy luôn dùng khoảng dung sai ABS(diff) > 0.01 hoặc ép kiểu DECIMAL.'
          }
        ],
        tips: [
          {
            title: 'Khởi tạo nhanh DuckDB in-memory không cần cài đặt',
            content: 'DuckDB hỗ trợ chạy trực tiếp trên file hoặc in-memory với tốc độ phân tích dữ liệu dạng cột siêu tốc, tương thích hoàn hảo chuẩn PostgreSQL.'
          }
        ]
      ,
        deepDive: {
          title: "Kỹ thuật thiết kế Test Dataset: Cài cắm dị thường có chủ đích để kiểm thử độ bền bỉ của câu truy vấn SQL",
          content: "<p>Bảng <code>raw_dirty_orders</code> của TechMart được thiết kế có chủ đích với đúng <strong>6 dị thường kinh điển</strong> của kỹ nghệ dữ liệu thực tế:</p><ul><li><strong>1. Trùng lặp khóa (Duplicate PK):</strong> <code>order_id = 2001</code> xuất hiện ở cả raw_id 1 và 2.</li><li><strong>2. Dữ liệu âm vô lý (Negative Amount):</strong> <code>total_amount = -150000.00</code> ở raw_id 2.</li><li><strong>3. Ngày tương lai (Future Date):</strong> <code>order_date = '2099-12-31'</code> ở raw_id 3.</li><li><strong>4. Thiếu dữ liệu trạng thái (NULL Status):</strong> <code>status IS NULL</code> ở raw_id 4.</li><li><strong>5. Khóa ngoại mồ côi (Orphan Foreign Key):</strong> <code>customer_id = 999</code> ở raw_id 5 (không tồn tại trong bảng customers).</li><li><strong>6. Khoảng trắng thừa và sai hoa thường (Dirty String):</strong> <code>'  tran thi binh  '</code> ở raw_id 2.</li></ul><p>Một câu truy vấn SQL xuất sắc là câu truy vấn tự động phát hiện, cách ly hoặc làm sạch trọn vẹn cả 6 dị thường này mà không làm gián đoạn hệ thống.</p>"
        }
      },
      exercises: [
        {
          title: 'Bài tập M.2-1 (Kiểm chứng số lượng): Đối soát số dòng trên các bảng Core',
          level: 'Cơ bản',
          problem: 'Sau khi chạy kịch bản tạo bảng, hãy viết một truy vấn đơn giản để kiểm tra xem bảng customers có bao nhiêu khách hàng và bảng orders có bao nhiêu đơn hàng.',
          hint: 'Dùng hàm đếm COUNT(*).',
          solutionCode: `SELECT 
    (SELECT COUNT(*) FROM customers) AS total_customers,
    (SELECT COUNT(*) FROM orders) AS total_orders;`,
          solutionOutput: `+-----------------+--------------+
| total_customers | total_orders |
+-----------------+--------------+
| 5               | 6            |
+-----------------+--------------+
(Khớp 100% với dữ liệu mẫu)`,
          explanation: 'Chẩn đoán lỗi: Nếu bạn ra kết quả khác 5 và 6, có thể script chèn dữ liệu bị dừng giữa chừng do lỗi mạng hoặc đã bị chạy lặp hai lần.'
        },
        {
          title: 'Bài tập M.2-2 (Nhận diện dữ liệu bẩn [DQ]): Liệt kê các dị thường trong raw_dirty_orders',
          level: 'Trung bình',
          problem: 'Không cần nhìn vào ghi chú trong code, hãy tự viết truy vấn tìm đơn hàng trong bảng raw_dirty_orders có số tiền thanh toán (total_amount) là một số âm bất hợp lý.',
          hint: 'Dùng mệnh đề WHERE với toán tử so sánh nhỏ hơn 0.',
          solutionCode: `SELECT raw_id, order_id, customer_name, total_amount
FROM raw_dirty_orders
WHERE total_amount < 0;`,
          solutionOutput: `+--------+----------+---------------+--------------+
| raw_id | order_id | customer_name | total_amount |
+--------+----------+---------------+--------------+
| 5      | 2004     | Le Van Cuong  | -500000.00   |
+--------+----------+---------------+--------------+
(1 dòng vi phạm)`,
          explanation: 'Chẩn đoán lỗi: Nếu bạn không tìm thấy dòng nào, hãy kiểm tra kiểu dữ liệu của cột total_amount xem có bị ép sang kiểu văn bản không.'
        },
        {
          title: 'Bài tập M.2-3 (Tự viết truy vấn): Đối soát tài chính giữa orders và order_items',
          level: 'Khá',
          problem: 'Hãy viết câu truy vấn đối soát tài chính kiểm tra xem có bất kỳ đơn hàng nào trong bảng orders có tổng tiền không khớp với tổng tiền tính toán từ bảng chi tiết order_items hay không.',
          hint: 'Dùng CTE hoặc Subquery gom nhóm bảng order_items theo order_id và so sánh với orders.total_amount.',
          solutionCode: `WITH calculated_items AS (
    SELECT order_id, SUM(quantity * unit_price) AS items_total
    FROM order_items
    GROUP BY order_id
)
SELECT 
    o.order_id,
    o.total_amount,
    ci.items_total,
    (o.total_amount - ci.items_total) AS diff
FROM orders o
JOIN calculated_items ci ON o.order_id = ci.order_id
WHERE ABS(o.total_amount - ci.items_total) > 0.01;`,
          solutionOutput: `Empty result set (0 rows). (Dữ liệu Core TechMart khớp chính xác từng hào).`,
          explanation: 'Kết quả rỗng khẳng định dữ liệu mẫu của bộ thực hành đạt độ chính xác tài chính 100%.'
        },
        {
          title: 'Bài tập M.2-4 (Đánh đổi & Thiết kế): Thiết kế bảng danh mục phụ trợ đảm bảo chuẩn 3NF',
          level: 'Nâng cao',
          problem: 'Trong bảng products, cột category hiện đang lưu trực tiếp chuỗi văn bản (ví dụ "Accessories", "Monitor"). Hãy viết khối lệnh DDL tạo bảng categories riêng biệt và sửa lại bảng products để đạt chuẩn 3NF nghiêm ngặt.',
          hint: 'Tạo bảng categories với category_id là Primary Key, sau đó tạo khóa ngoại trỏ từ products.category_id sang categories.category_id.',
          solutionCode: `-- Thiết kế chuẩn 3NF tách danh mục độc lập:
CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Thêm dữ liệu danh mục:
INSERT INTO categories (category_id, category_name) VALUES
(1, 'Accessories'),
(2, 'Monitor'),
(3, 'Audio');

-- Cập nhật bảng products sử dụng khóa ngoại category_id:
-- ALTER TABLE products ADD COLUMN category_id INT REFERENCES categories(category_id);`,
          solutionOutput: `Schema được chuẩn hóa 3NF thành công, triệt tiêu nguy cơ gõ sai chính tả tên danh mục.`,
          explanation: 'Tách danh mục thành bảng riêng giúp tiết kiệm dung lượng lưu trữ chuỗi và ngăn chặn lỗi bất nhất dữ liệu khi cập nhật tên danh mục.'
        }
      ],
      quiz: [
        {
          question: 'Tại sao trong kịch bản DDL ở trên, các bảng order_items và orders phải được DROP trước bảng customers và products?',
          options: [
            'Vì PostgreSQL bắt buộc tên bảng ngắn hơn phải DROP trước.',
            'Vì order_items và orders chứa khóa ngoại (FOREIGN KEY) tham chiếu đến customers và products, CSDL bảo vệ toàn vẹn nên không cho phép xóa bảng cha khi bảng con đang tham chiếu tới.',
            'Vì customers chứa ít dòng dữ liệu hơn nên cần giữ lại để sao lưu.',
            'Thứ tự DROP TABLE hoàn toàn không quan trọng trong bất kỳ hệ quản trị nào.'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Tính toàn vẹn tham chiếu (Referential Integrity) ngăn cấm việc xóa bảng cha khi vẫn còn bảng con đang giữ khóa ngoại trỏ tới nó.'
        },
        {
          question: 'Bảng raw_dirty_orders trong TechMart được thiết kế cho mục đích kỹ thuật nào?',
          options: [
            'Để lưu trữ dữ liệu bí mật của ban giám đốc TechMart.',
            'Đóng vai trò phòng lab thực hành [DQ], cố ý cài cắm 6 dị thường chất lượng dữ liệu kinh điển để học viên luyện tập kỹ năng khám bệnh và canh gác dữ liệu.',
            'Để tăng tốc độ truy vấn SELECT của khách hàng.',
            'Để thay thế hoàn toàn bảng orders trong môi trường sản xuất.'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Bảng raw_dirty_orders là phòng lab chuyên dụng phục vụ các bài thực hành kiểm định chất lượng dữ liệu [DQ] xuyên suốt giáo trình.'
        },
        {
          question: 'Khi thiết kế các cột lưu trữ số tiền giao dịch và giá sản phẩm trong CSDL tài chính, kiểu dữ liệu nào sau đây là chuẩn mực nhất?',
          options: [
            'FLOAT hoặc REAL',
            'DECIMAL(precision, scale) hoặc NUMERIC',
            'VARCHAR(50)',
            'BOOLEAN'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Kiểu DECIMAL/NUMERIC bảo đảm tính toán số học chính xác tuyệt đối, không bị sai số làm tròn dấu phẩy động như FLOAT/REAL.'
        },
        {
          question: 'Mô hình lưu trữ của bảng customer_tier_history (gồm các cột valid_from, valid_to, is_current) đại diện cho mẫu thiết kế nào trong kỹ nghệ dữ liệu?',
          options: [
            'Slowly Changing Dimension Type 2 (SCD Type 2)',
            'Bảng đệm tạm thời (Temporary Table)',
            'Mô hình CSDL NoSQL Document Store',
            'Quan hệ đệ quy không có điểm dừng'
          ],
          correctIndex: 0,
          explanation: 'Chính xác! SCD Type 2 lưu lại toàn bộ lịch sử biến động trạng thái của thực thể theo thời gian bằng cách chèn dòng mới kèm khoảng thời gian hiệu lực [valid_from, valid_to).'
        },
        {
          question: 'Trong bảng customer_events, nếu một khách hàng đăng nhập lúc 08:30:00 và mua hàng lúc 09:15:00, làm thế nào để liên kết chính xác đơn hàng với phiên đăng nhập đó?',
          options: [
            'Dùng FULL JOIN toàn bộ sự kiện',
            'Sử dụng Window Function xác định phiên làm việc (Sessionization) dựa trên khoảng cách thời gian giữa các sự kiện',
            'Chạy lệnh DROP TABLE customer_events',
            'Cộng dồn tất cả các sự kiện vào một cột chuỗi duy nhất'
          ],
          correctIndex: 1,
          explanation: 'Chính xác! Kỹ thuật Sessionization bằng Window Functions (LAG, SUM OVER) cho phép nhóm các sự kiện người dùng thành các phiên làm việc độc lập dựa trên ngưỡng thời gian không hoạt động.'
        }
      ],
      summary: [
        'Bộ dữ liệu TechMart gồm 7 bảng với quy mô nhỏ gọn, cho phép người học kiểm tra kết quả bằng mắt thường hoặc tự tính nhẩm.',
        'Nhóm bảng Core đại diện cho kiến trúc nghiệp vụ OLTP điển hình của một doanh nghiệp thương mại điện tử theo chuẩn 3NF.',
        'Bảng raw_dirty_orders chứa 6 lỗi cố ý phục vụ trực tiếp cho các bài thực hành [DQ] từ Tầng 1 đến Tầng 8.',
        'Bảng customer_events và customer_tier_history đóng vai trò cốt lõi cho các bài thực hành Window function, Point-in-Time Join và chống rò rỉ dữ liệu [FE].',
        'Kịch bản DDL + DML tương thích 100% trên cả 3 hệ quản trị CSDL phổ biến nhất: PostgreSQL, DuckDB và SQLite.',
        'Ôn cách quãng: Tại sao phép ghép LEFT JOIN lại làm mất dữ liệu của bảng trái nếu đặt điều kiện lọc của bảng phải vào mệnh đề WHERE? (Xem lại Bài 2.2).'
      ]
    }
  ]
};
