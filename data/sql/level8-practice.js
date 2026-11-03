window.SQL_LEVEL8_PART = {
  "id": "part-sql-8",
  "number": "Tầng 8",
  "title": "Thực Hành, Kiểm Thử & Dự Án Tổng Hợp",
  "level": "Tổng hợp",
  "badge": "Dự án thực chiến",
  "description": "Đấu trường tôi luyện kỹ năng toàn diện: Thử thách bài tập phân tích đa cấp độ, cẩm nang chẩn đoán gỡ lỗi chuyên sâu, SQL Master Cheat Sheet, bộ kiểm thử chất lượng dữ liệu tự động với CI/CD và dự án Modern Data Warehouse với DuckDB.",
  "lessons": [
    {
      "id": "sql-40-practice-challenges",
      "number": "8.1",
      "title": "Thử Thách Bài Tập Thực Hành Đa Cấp Độ (Dễ → Vừa → Khó) Kèm Lời Giải",
      "subtitle": "Đấu trường tôi luyện kỹ năng truy vấn toàn diện: Khám phá doanh số, hành vi khách hàng, khoảng cách retention và phân tích giỏ hàng đa chiều",
      "level": "Tổng hợp",
      "duration": "60 phút",
      "keywords": [
        "SQL Practice",
        "SQL Challenges",
        "Aggregation",
        "Subquery",
        "Window Functions",
        "Self Join",
        "Customer Retention",
        "Market Basket Analysis",
        "Cohort Analysis"
      ],
      "prerequisites": "Tất cả các kiến thức từ Tầng 1 đến Tầng 6 (SELECT, JOIN, GROUP BY, Window Functions, CTE).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+, SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân tích yêu cầu kinh doanh phức tạp và chuyển hóa thành chiến lược truy vấn CTE nhiều bước (Multi-step SQL Strategy).",
        "Vận dụng kết hợp hàm tổng hợp (SUM, COUNT, AVG) với GROUP BY, HAVING để giải quyết bài toán phân nhóm đa chiều.",
        "Làm chủ hàm cửa sổ (LEAD, LAG, ROW_NUMBER) để tính toán khoảng thời gian chu kỳ mua hàng (Retention & Repurchase Gap).",
        "Thực hiện kỹ thuật Self-Join để giải bài toán phân tích giỏ hàng (Market Basket Analysis - Tìm các cặp sản phẩm hay mua cùng nhau).",
        "Rèn luyện tư duy xử lý dữ liệu ngoại lệ: Dữ liệu NULL, chia cho 0, đơn hàng bị hủy và khách hàng chỉ mua 1 lần."
      ],
      "intuition": {
        "title": "Võ Đài Đối Kháng Thực Chiến vs Bài Học Lý Thuyết Trong Sách Giáo Khoa",
        "metaphor": "Học các cú đấm, thế võ trên lý thuyết rất khác so với khi bước lên võ đài đối kháng trực tiếp. Khi đối mặt với đề bài thực tế từ Giám đốc kinh doanh hoặc Nhà đầu tư, bạn không được ai nhắc trước: \"Chỗ này hãy dùng DENSE_RANK() hay LEFT JOIN\". Bạn phải tự mình quan sát cấu trúc dữ liệu, nhận diện chiếc bẫy NULL, lựa chọn \"vũ khí\" truy vấn phù hợp nhất và giải quyết bài toán với độ chính xác 100%! Bộ bài tập thử thách này chính là phòng tập thể lực và võ đài tôi luyện giúp bạn đạt được phản xạ tự nhiên của một Master SQL.",
        "boundary": "Các bài tập ở đây mô phỏng dữ liệu kinh doanh thực tế TechMart. Lời giải hướng đến sự tối ưu cả về tính dễ đọc (clean code) lẫn hiệu năng (chạy trên PostgreSQL/DuckDB/SQLite).",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">GAPS &amp; ISLANDS</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">date - ROW_NUMBER</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Tìm chuỗi ngày đăng nhập liên tiếp</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&bull;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:180px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">RETENTION COHORT</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">DATE_TRUNC + COUNT</div>\n                <div style=\"font-size:0.72rem;\">Phân tích tỷ lệ giữ chân người dùng</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&bull;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">MoM GROWTH</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">LAG(revenue, 1)</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Tốc độ tăng trưởng tháng qua tháng</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Bí kíp phỏng vấn:</span>\n              <span>Trước khi gõ code, luôn vẽ trạng thái trung gian ra giấy và xác định bài toán thuộc dạng: Phép trừ chuỗi liên tiếp (Gaps &amp; Islands) hay Cửa sổ trượt (Sliding Window).</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-40-problem-hook",
          "title": "Gợi Mở Vấn Đề: Khoảng Cách Giữa \"Hiểu Cú Pháp\" Và \"Tự Viết Được Truy Vấn Từ Con Số 0\"",
          "content": "\n        <p>Rất nhiều bạn khi học SQL rơi vào trạng thái <em>\"ảo tưởng về sự hiểu biết\"</em> (Illusion of Competence): Khi đọc một câu truy vấn có sẵn, bạn thấy nó rất dễ hiểu và hợp lý. Nhưng khi mở một cửa sổ soạn thảo trống rỗng và đối mặt với một câu hỏi nghiệp vụ kinh doanh thực tế:</p>\n        <div style=\"background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid var(--accent, #3b82f6); margin: 16px 0;\">\n          <p><em>\"Hãy tìm ra top 5 cặp sản phẩm thường xuyên được khách hàng mua cùng nhau nhất trong cùng một đơn hàng năm 2026, loại bỏ các đơn hàng đã bị hoàn hủy, và tính tỷ lệ phần trăm giỏ hàng có chứa cặp sản phẩm đó trên tổng số giỏ hàng của hệ thống.\"</em></p>\n        </div>\n        <p>Bạn bắt đầu cảm thấy hoang mang: Bắt đầu từ bảng nào? Viết JOIN hay GROUP BY trước? Làm sao ghép được sản phẩm A với sản phẩm B mà không bị trùng (A, B) và (B, A)?</p>\n        <p>Chương này được thiết kế để xóa bỏ hoàn toàn rào cản đó thông qua <strong>Khung Tư Duy 4 Bước (Framework 4D)</strong> và hệ thống bài tập thực chiến có lời giải chi tiết từng bước.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-40-mental-model",
          "title": "Mô Hình Tâm Trí: Khung Phân Tích 4 Bước Giải Quyết Mọi Bài Toán SQL Phức Tạp",
          "content": "\n        <p>Khi gặp bất kỳ bài toán truy vấn hóc búa nào, đừng vội gõ bàn phím ngay. Hãy áp dụng quy trình 4D:</p>\n        <ol>\n          <li><strong>D1 - Deconstruct (Bóc tách bài toán):</strong> Xác định rõ kết quả đầu ra cần những cột nào? Đơn vị của một dòng (Granularity) là gì (Mỗi dòng là 1 khách hàng, 1 đơn hàng hay 1 cặp sản phẩm)?</li>\n          <li><strong>D2 - Data Sources (Xác định nguồn dữ liệu):</strong> Cần những bảng nào? Quan hệ giữa chúng là 1-n hay n-n? Cần LEFT JOIN hay INNER JOIN?</li>\n          <li><strong>D3 - Draft CTE Pipeline (Thiết kế đường ống biến đổi):</strong> Chia bài toán thành 2-4 bước nhỏ, mỗi bước là một CTE có tên gọi mang ý nghĩa kinh doanh rõ ràng.</li>\n          <li><strong>D4 - Debug & Deliver (Kiểm tra dữ liệu biên & Tối ưu):</strong> Có đơn hàng nào bị NULL không? Có khách hàng nào chỉ mua 1 lần không? Kiểm tra số dòng kết quả có hợp lý không.</li>\n        </ol>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-40-core-syntax",
          "title": "Bộ Mẫu Thiết Kế (Design Patterns) Cho Các Bài Toán SQL Kinh Điển",
          "content": "\n        <p>Phần lớn các câu hỏi kinh doanh đều rơi vào 3 mẫu thiết kế cốt lõi sau:</p>\n        <ul>\n          <li><strong>Mẫu 1: Phân tích Khách hàng đa hành vi (HAVING COUNT DISTINCT):</strong> Tìm thực thể thỏa mãn nhiều điều kiện logic đồng thời (mua cả danh mục A và danh mục B).</li>\n          <li><strong>Mẫu 2: Phân tích Chu kỳ & Khoảng cách thời gian (Window LAG/LEAD):</strong> So sánh dòng hiện tại với dòng liền trước/sau trong cùng một nhóm phân vùng (Partition).</li>\n          <li><strong>Mẫu 3: Phân tích Cặp đôi liên kết (Self-Join với điều kiện a.id < b.id):</strong> Ghép một bảng với chính nó để tìm sự kết hợp không trùng lặp và không tự ghép với chính mình.</li>\n        </ul>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-40-worked-example",
          "title": "Ví Dụ Mẫu Thực Chiến TechMart: Giải Thử Thách Mua Hàng Đa Danh Mục (Cấp Độ Trung Bình)",
          "content": "\n        <p><strong>Đề bài:</strong> Giám đốc Marketing muốn tìm danh sách các khách hàng trung thành đã từng mua hàng ở <em>ít nhất 2 danh mục sản phẩm khác nhau</em>, đồng thời tổng chi tiêu tích lũy của họ phải lớn hơn 10.000.000 VNĐ. Sắp xếp theo tổng chi tiêu giảm dần.</p>\n      ",
          "codeExamples": [
            {
              "code": "-- Áp dụng Pipeline CTE giải bài toán khách hàng đa danh mục:\nWITH customer_spending AS (\n    SELECT \n        c.customer_id,\n        c.full_name,\n        c.email,\n        COUNT(DISTINCT p.category) AS distinct_categories_count,\n        SUM(oi.subtotal) AS total_spending,\n        COUNT(DISTINCT o.order_id) AS total_completed_orders\n    FROM customers c\n    JOIN orders o ON c.customer_id = o.customer_id\n    JOIN order_items oi ON o.order_id = oi.order_id\n    JOIN products p ON oi.product_id = p.product_id\n    WHERE o.status = 'completed'\n    GROUP BY c.customer_id, c.full_name, c.email\n)\nSELECT \n    customer_id,\n    full_name,\n    email,\n    distinct_categories_count,\n    total_spending,\n    total_completed_orders\nFROM customer_spending\nWHERE distinct_categories_count >= 2\n  AND total_spending > 10000000\nORDER BY total_spending DESC;",
              "explanation": "Bằng cách sử dụng COUNT(DISTINCT p.category), chúng ta đếm chính xác số lượng danh mục duy nhất mà khách hàng đã mua mà không sợ bị trùng lặp do nhiều sản phẩm cùng loại. Bộ lọc status = 'completed' loại trừ các đơn hàng thất bại.",
              "output": "Danh sách khách hàng chất lượng cao thỏa mãn cả 2 tiêu chí khắt khe: Chi tiêu > 10 triệu và trải nghiệm ít nhất 2 danh mục sản phẩm."
            }
          ]
        },
        {
          "id": "sec-40-predict-faded",
          "title": "Thử Thách Dự Đoán & Bài Tập Điền Khuyết Faded Example: Khoảng Cách Giữa 2 Đơn Hàng Đầu Tiên",
          "content": "\n        <p>Quan sát đoạn mã truy vấn phân tích chu kỳ khách hàng quay lại mua hàng lần thứ hai (Repurchase Gap). Hãy hoàn thành các vị trí còn khuyết <code>___[1]___</code> và <code>___[2]___</code> để lọc ra chính xác 2 đơn hàng đầu tiên của mỗi khách hàng và tính khoảng cách ngày giữa chúng.</p>\n        <pre><code class=\"language-sql\">WITH ranked_orders AS (\n    SELECT \n        customer_id,\n        order_id,\n        order_date,\n        ROW_NUMBER() OVER (\n            PARTITION BY customer_id \n            ORDER BY ___[1]___ ASC\n        ) AS order_sequence\n    FROM orders\n    WHERE status = 'completed'\n),\nfirst_two_orders AS (\n    SELECT \n        customer_id,\n        order_id,\n        order_date,\n        order_sequence,\n        LEAD(order_date) OVER (\n            PARTITION BY customer_id \n            ORDER BY order_sequence\n        ) AS second_order_date\n    FROM ranked_orders\n    WHERE order_sequence IN (1, 2)\n)\nSELECT \n    customer_id,\n    order_date AS first_order_date,\n    second_order_date,\n    (second_order_date::date - order_date::date) AS days_to_second_order\nFROM first_two_orders\nWHERE ___[2]___ = 1 AND second_order_date IS NOT NULL;</code></pre>\n        <div class=\"predict-details\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 14px; border-radius: 6px; margin: 12px 0;\">\n          <details>\n            <summary style=\"font-weight: 600; cursor: pointer; color: var(--accent, #3b82f6);\">Xem Đáp Án Điền Khuyết & Phân Tích Kỹ Thuật</summary>\n            <p style=\"margin-top: 8px;\"><strong>Đáp án điền khuyết:</strong></p>\n            <ul>\n              <li><code>___[1]___</code>: <code>order_date</code> (Sắp xếp theo ngày đặt hàng để đánh số thứ tự 1, 2)</li>\n              <li><code>___[2]___</code>: <code>order_sequence</code> (Chỉ lấy dòng của đơn hàng đầu tiên, nơi hàm LEAD kéo ngày của đơn thứ hai lên so sánh)</li>\n            </ul>\n            <p><strong>Cơ chế:</strong> <code>ROW_NUMBER()</code> phân định đơn thứ 1 và 2. Sau đó, <code>LEAD(order_date)</code> kéo ngày của đơn số 2 lên cùng một dòng với đơn số 1. Việc lọc <code>WHERE order_sequence = 1 AND second_order_date IS NOT NULL</code> loại bỏ những khách hàng chỉ mua duy nhất 1 lần, chỉ giữ lại những khách hàng đã thực sự quay lại!</p>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-40-pitfalls",
          "title": "Bẫy Thường Gặp & Sai Lầm Nghiêm Trọng Khi Giải Bài Toán Thực Tế",
          "content": "\n        <div style=\"background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 16px; border-radius: 8px; margin: 16px 0;\">\n          <h4 style=\"color: #ef4444; margin-top: 0;\">Top 3 Chiếc Bẫy Kinh Điển Khi Làm Bài Tập Tổng Hợp:</h4>\n          <ol>\n            <li>\n              <strong>Bẫy Bùng nổ Số dòng (Fan-out Duplication):</strong><br/>\n              <em>Sai lầm:</em> JOIN bảng <code>orders</code> với bảng <code>order_items</code> rồi dùng <code>SUM(orders.shipping_fee)</code>.<br/>\n              <em>Hậu quả:</em> Một đơn hàng có 5 sản phẩm thì phí giao hàng bị nhân lên gấp 5 lần! Phải tính tổng phí giao hàng ở mức <code>orders</code> trước, hoặc dùng CTE tách biệt.\n            </li>\n            <li>\n              <strong>Bẫy Tự Ghép Bản Thân (Self-Join Loop):</strong><br/>\n              <em>Sai lầm:</em> Khi tìm cặp sản phẩm, viết điều kiện <code>a.product_id != b.product_id</code> thay vì <code>a.product_id < b.product_id</code>.<br/>\n              <em>Hậu quả:</em> Kết quả sẽ vừa xuất hiện cặp (Bàn phím, Chuột) vừa xuất hiện cặp (Chuột, Bàn phím) làm số lượng cặp đôi bị nhân đôi sai lệch.\n            </li>\n            <li>\n              <strong>Bẫy Lỗi Chia Cho 0 (Division by Zero):</strong><br/>\n              <em>Sai lầm:</em> Viết <code>COUNT(returned_orders) / COUNT(total_orders)</code> mà không dùng <code>NULLIF(COUNT(total_orders), 0)</code>.<br/>\n              <em>Hậu quả:</em> Khi có một chi nhánh hoặc danh mục mới mở chưa có đơn hàng nào, toàn bộ câu truy vấn báo cáo sẽ văng lỗi sập hệ thống.\n            </li>\n          </ol>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-40-comparison",
          "title": "Bảng So Sánh Đa Chiều: Ba Chiến Lược Viết Truy Vấn Phức Tạp",
          "content": "\n        <p>Bảng phân tích giúp bạn lựa chọn công cụ thích hợp khi đối mặt với đề bài khó:</p>\n        <div style=\"overflow-x: auto; margin: 16px 0;\">\n          <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n            <thead>\n              <tr style=\"background: var(--bg-surface-elevated, #1e293b); text-align: left;\">\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Chiến Lược Viết Truy Vấn</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Độ Dễ Đọc (Readability)</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Khả Năng Tối Ưu Của CSDL</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Tình Huống Sử Dụng Lý Tưởng</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">CTE Pipeline (WITH c1 AS ..., c2 AS ...)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Tuyệt vời (Theo mạch đọc từ trên xuống)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Rất cao (Modern DB inlining CTE)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Báo cáo phức tạp, dự án dbt, ETL nhiều bước</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Subquery Lồng Nhau (Nested SELECT)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Kém (Phải đọc từ trong ra ngoài)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Tốt (Optimizer tự duỗi phẳng)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Các phép lọc nhanh đơn giản trong WHERE IN (...)</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Self-Join (Ghép Bảng Với Chính Nó)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Trung bình (Cần đặt alias rõ ràng)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Tốn kém nếu bảng không có Index</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Market Basket Analysis, cây phân cấp cha-con</td>\n              </tr>\n            </tbody>\n          </table>\n              </div>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-40-real-world",
          "title": "Ứng Dụng Thực Tế: Thuật Toán Phân Tích Giỏ Hàng (Market Basket Analysis) Chuẩn Quy Mô Lớn",
          "content": "\n        <p>Đây là bài toán trị giá hàng triệu đô la của các sàn thương mại điện tử như Amazon hay Shopee để đưa ra gợi ý: <em>\"Những người mua sản phẩm này cũng thường mua kèm sản phẩm kia\"</em>:</p>\n      ",
          "codeExamples": [
            {
              "code": "-- Market Basket Analysis: Tìm Top 3 cặp sản phẩm hay mua cùng nhau nhất\nWITH order_product_pairs AS (\n    SELECT \n        oi1.product_id AS product_a_id,\n        p1.product_name AS product_a_name,\n        oi2.product_id AS product_b_id,\n        p2.product_name AS product_b_name,\n        COUNT(DISTINCT oi1.order_id) AS times_bought_together\n    FROM order_items oi1\n    -- Ghép bảng với chính nó dựa trên cùng một đơn hàng\n    JOIN order_items oi2 \n        ON oi1.order_id = oi2.order_id \n       AND oi1.product_id < oi2.product_id  -- Chống lặp và chống ghép chính nó\n    JOIN products p1 ON oi1.product_id = p1.product_id\n    JOIN products p2 ON oi2.product_id = p2.product_id\n    GROUP BY \n        oi1.product_id, p1.product_name, \n        oi2.product_id, p2.product_name\n)\nSELECT \n    product_a_name,\n    product_b_name,\n    times_bought_together\nFROM order_product_pairs\nORDER BY times_bought_together DESC\nLIMIT 3;",
              "explanation": "Điều kiện then chốt oi1.product_id < oi2.product_id giúp loại bỏ sản phẩm tự ghép với chính nó và đảm bảo mỗi cặp sản phẩm chỉ xuất hiện đúng 1 lần duy nhất trong bảng tổng hợp.",
              "output": "Bảng xếp hạng các combo sản phẩm bán chạy nhất, làm dữ liệu đầu vào cho hệ thống Recommender System."
            }
          ]
        },
        {
          "id": "sec-40-next-step",
          "title": "Cầu Nối Thực Hành: Chuyển Giao Sang Cẩm Nang Gỡ Lỗi & Chẩn Đoán SQL",
          "content": "\n        <p>Khi tự tay viết các câu truy vấn thực hành phức tạp, chắc chắn bạn sẽ gặp phải các lỗi cú pháp bí hiểm hoặc kết quả truy vấn trả về rỗng một cách khó hiểu. Đừng lo lắng! Trong bài học tiếp theo (Bài 8.2), chúng ta sẽ trang bị chiếc kính hiển vi chẩn đoán lỗi để bắt trọn mọi lỗi hệ thống và lỗi logic ngầm.</p>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          "Không bao giờ viết câu lệnh SQL phân tích phức tạp trong một khối SELECT duy nhất; hãy chia nhỏ logic thành các khối WITH CTE độc lập để dễ kiểm tra từng bước.",
          "Cảnh giác cao độ với phép JOIN giữa các bảng có quan hệ 1-nhiều trước khi tính tổng (SUM); hãy tính tổng ở bảng lá trước hoặc dùng CTE tổng hợp để tránh nhân đôi số tiền."
        ],
        "tips": [
          "Luôn bắt đầu viết câu truy vấn với LIMIT 10 để kiểm tra cấu trúc dòng và giá trị dữ liệu mẫu trước khi chạy trên toàn bộ tập dữ liệu hàng triệu dòng.",
          "Áp dụng hàm NULLIF(denominator, 0) cho mọi phép toán chia để bảo vệ truy vấn không bao giờ bị sập do lỗi Division by zero."
        ],
        "deepDive": {
          "title": "Mô hình Gaps and Islands: Kỹ thuật hiệu số hai dãy số thứ tự (ROW_NUMBER Difference Method)",
          "content": "<p>Bài toán tìm các chuỗi ngày liên tiếp (Consecutive Streaks, ví dụ: 'Khách hàng đăng nhập 7 ngày liên tục') là bài toán kinh điển nhất trong các cuộc phỏng vấn Data Engineer tại FAANG.</p><p>Kỹ thuật thanh lịch nhất là <strong>Hiệu hai dãy số thứ tự</strong>: bạn lấy ngày thực tế trừ đi một số ngày tương ứng với <code>ROW_NUMBER() OVER (ORDER BY date)</code>:</p><pre class=\"code-pre\"><code>SELECT date, date - (ROW_NUMBER() OVER (ORDER BY date) * INTERVAL '1 day') AS group_anchor\nFROM user_logins;</code></pre><p>Về mặt toán học, nếu các ngày là liên tiếp nhau, cả <code>date</code> và <code>ROW_NUMBER</code> đều tăng đều đặn 1 đơn vị mỗi bước, do đó hiệu số <code>group_anchor</code> sẽ là <strong>một hằng số bất biến</strong>! Nhờ hằng số neo này, bạn có thể dễ dàng gom nhóm bằng <code>GROUP BY group_anchor</code> để tìm độ dài của chuỗi liên tiếp trong độ phức tạp tối ưu $O(N \\log N)$.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài Tập Cơ Bản: Báo Cáo Doanh Thu Và Số Lượng Đơn Theo Trạng Thái",
          "level": "Cơ bản",
          "problem": "Viết câu truy vấn tổng hợp từ bảng `orders`: Đếm tổng số đơn hàng, tổng số tiền (total_amount), và giá trị đơn hàng trung bình cho từng trạng thái (`status`). Chỉ xét các đơn hàng phát sinh trong năm 2026. Sắp xếp theo tổng tiền giảm dần.",
          "hint": "Dùng GROUP BY status, kết hợp các hàm COUNT(order_id), SUM(total_amount), ROUND(AVG(total_amount), 2) và WHERE order_date >= '2026-01-01'.",
          "solutionCode": "-- Tổng hợp doanh thu theo trạng thái đơn hàng năm 2026:\nSELECT \n    status,\n    COUNT(order_id) AS total_orders,\n    SUM(total_amount) AS total_revenue,\n    ROUND(AVG(total_amount), 2) AS avg_order_value\nFROM orders\nWHERE order_date >= '2026-01-01'\nGROUP BY status\nORDER BY total_revenue DESC;",
          "solutionOutput": "Bảng tổng hợp KPI đơn hàng phân nhóm theo trạng thái completed, pending, cancelled...",
          "explanation": "Câu truy vấn cơ bản giúp rèn luyện thói quen sử dụng GROUP BY kết hợp với hàm tổng hợp và lọc thời gian chính xác."
        },
        {
          "title": "Bài Tập Trung Bình: Tìm Khách Hàng Có Giá Trị Chi Tiêu Cao Hơn Trung Bình Toàn Hệ Thống",
          "level": "Trung bình",
          "problem": "Viết câu truy vấn tìm các khách hàng có tổng chi tiêu (cho các đơn `completed`) cao hơn mức chi tiêu trung bình của một khách hàng trong hệ thống. Trả về: customer_id, full_name, tổng chi tiêu cá nhân, và mức chênh lệch so với mức trung bình hệ thống.",
          "hint": "Dùng CTE tính tổng chi tiêu của từng khách hàng, sau đó dùng Subquery hoặc Window Function AVG() OVER () để lấy mức trung bình so sánh.",
          "solutionCode": "-- Khách hàng chi tiêu vượt mức trung bình:\nWITH customer_totals AS (\n    SELECT \n        c.customer_id,\n        c.full_name,\n        SUM(o.total_amount) AS customer_spending\n    FROM customers c\n    JOIN orders o ON c.customer_id = o.customer_id\n    WHERE o.status = 'completed'\n    GROUP BY c.customer_id, c.full_name\n),\nsystem_avg AS (\n    SELECT AVG(customer_spending) AS avg_spending\n    FROM customer_totals\n)\nSELECT \n    ct.customer_id,\n    ct.full_name,\n    ct.customer_spending,\n    ROUND(sa.avg_spending, 2) AS system_avg_spending,\n    ROUND(ct.customer_spending - sa.avg_spending, 2) AS diff_from_avg\nFROM customer_totals ct\nCROSS JOIN system_avg sa\nWHERE ct.customer_spending > sa.avg_spending\nORDER BY ct.customer_spending DESC;",
          "solutionOutput": "Danh sách khách hàng VIP chi tiêu vượt trội so với mặt bằng chung hệ thống.",
          "explanation": "Sử dụng 2 CTE kết hợp CROSS JOIN với bảng 1 dòng của mức trung bình giúp truy vấn sáng sủa, tách bạch logic phân nhóm và so sánh."
        },
        {
          "title": "Bài Tập Khá: Tìm Sản Phẩm Đạt Top 1 Doanh Thu Trong Mỗi Danh Mục Bằng Window Function",
          "level": "Khá",
          "problem": "Viết câu truy vấn xác định sản phẩm có doanh thu cao nhất (Best-selling product) trong từng danh mục (`category`). Nếu có 2 sản phẩm bằng doanh thu thì hiển thị cả 2. Kết quả gồm: category, product_name, total_revenue, xếp hạng trong danh mục.",
          "hint": "Dùng CTE tính doanh thu cho từng sản phẩm, sau đó dùng DENSE_RANK() OVER (PARTITION BY category ORDER BY total_revenue DESC). Ở truy vấn ngoài cùng, lọc WHERE rank = 1.",
          "solutionCode": "-- Tìm sản phẩm quán quân doanh số trong từng ngành hàng:\nWITH product_sales AS (\n    SELECT \n        p.category,\n        p.product_id,\n        p.product_name,\n        SUM(oi.subtotal) AS total_revenue\n    FROM products p\n    JOIN order_items oi ON p.product_id = oi.product_id\n    JOIN orders o ON oi.order_id = o.order_id\n    WHERE o.status = 'completed'\n    GROUP BY p.category, p.product_id, p.product_name\n),\nranked_products AS (\n    SELECT \n        category,\n        product_name,\n        total_revenue,\n        DENSE_RANK() OVER (\n            PARTITION BY category \n            ORDER BY total_revenue DESC\n        ) AS category_rank\n    FROM product_sales\n)\nSELECT \n    category,\n    product_name,\n    total_revenue,\n    category_rank\nFROM ranked_products\nWHERE category_rank = 1\nORDER BY total_revenue DESC;",
          "solutionOutput": "Danh sách các sản phẩm dẫn đầu doanh thu của từng nhóm ngành hàng.",
          "explanation": "DENSE_RANK() phân loại chính xác các sản phẩm đồng hạng mà không làm nhảy cóc số thứ tự, CTE giúp tách lớp tính tổng hợp và lớp chấm điểm phân hạng."
        },
        {
          "title": "Bài Tập Nâng Cao: Phân Tích Tỷ Lệ Giữ Chân Khách Hàng (Monthly Cohort Retention)",
          "level": "Nâng cao",
          "problem": "Xây dựng bảng phân tích Cohort giữ chân khách hàng: Với mỗi tháng gia nhập đầu tiên (First Order Month) của khách hàng, hãy tính số lượng khách hàng mới của tháng đó và số lượng người trong số họ tiếp tục có đơn hàng ở tháng thứ 1 tiếp theo (Retention Month 1).",
          "hint": "Dùng CTE tìm tháng mua đầu tiên (first_month = MIN(DATE_TRUNC('month', order_date))). Sau đó JOIN lại với các đơn hàng ở các tháng sau để tính khoảng cách số tháng.",
          "solutionCode": "-- Phân tích Cohort Retention Month 1:\nWITH customer_cohort AS (\n    -- Bước 1: Xác định tháng mua hàng đầu tiên của mỗi khách hàng\n    SELECT \n        customer_id,\n        MIN(DATE_TRUNC('month', order_date)) AS cohort_month\n    FROM orders\n    WHERE status = 'completed'\n    GROUP BY customer_id\n),\nmonthly_activities AS (\n    -- Bước 2: Lấy các tháng có phát sinh đơn hàng\n    SELECT DISTINCT\n        o.customer_id,\n        c.cohort_month,\n        DATE_TRUNC('month', o.order_date) AS activity_month\n    FROM orders o\n    JOIN customer_cohort c ON o.customer_id = c.customer_id\n    WHERE o.status = 'completed'\n),\ncohort_size AS (\n    -- Bước 3: Đếm quy mô của từng Cohort\n    SELECT \n        cohort_month,\n        COUNT(DISTINCT customer_id) AS total_new_customers\n    FROM customer_cohort\n    GROUP BY cohort_month\n),\nretention_m1 AS (\n    -- Bước 4: Đếm số khách hàng quay lại ở đúng tháng M+1\n    SELECT \n        cohort_month,\n        COUNT(DISTINCT customer_id) AS retained_customers_m1\n    FROM monthly_activities\n    WHERE activity_month = cohort_month + INTERVAL '1 month'\n    GROUP BY cohort_month\n)\nSELECT \n    TO_CHAR(cs.cohort_month, 'YYYY-MM') AS cohort,\n    cs.total_new_customers,\n    COALESCE(r.retained_customers_m1, 0) AS retained_m1,\n    ROUND(\n        COALESCE(r.retained_customers_m1, 0) * 100.0 / NULLIF(cs.total_new_customers, 0), \n        2\n    ) AS retention_rate_m1_percent\nFROM cohort_size cs\nLEFT JOIN retention_m1 r ON cs.cohort_month = r.cohort_month\nORDER BY cs.cohort_month ASC;",
          "solutionOutput": "Bảng chỉ số Cohort Retention chuẩn mực phân tích tỷ lệ khách hàng quay lại mua hàng tháng kế tiếp.",
          "explanation": "Pipeline 4 bước CTE bóc tách toàn bộ bài toán kinh tế khó bậc nhất thành các đơn vị tính toán rõ ràng, xử lý trơn tru các trường hợp không có khách quay lại bằng COALESCE và NULLIF."
        }
      ],
      "quiz": [
        {
          "question": "Để tìm các khách hàng từng mua hàng ở ÍT NHẤT 2 danh mục sản phẩm khác nhau, mệnh đề nào sau đây là chính xác?",
          "options": [
            "WHERE category >= 2",
            "HAVING COUNT(DISTINCT category) >= 2",
            "GROUP BY category HAVING COUNT(*) >= 2",
            "WHERE category IN (SELECT category FROM products WHERE count >= 2)"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Cần GROUP BY customer_id và dùng HAVING COUNT(DISTINCT category) >= 2 để đếm số danh mục duy nhất mà khách hàng đó đã mua."
        },
        {
          "question": "Trong bài toán Self-Join phân tích cặp sản phẩm mua cùng nhau, vì sao ta phải dùng điều kiện 'a.product_id < b.product_id'?",
          "options": [
            "Để sắp xếp tên sản phẩm theo thứ tự bảng chữ cái.",
            "Để tránh sản phẩm tự ghép với chính nó (a.id = b.id) và loại bỏ việc sinh ra các cặp đôi đảo chiều trùng lặp (ví dụ: đã có cặp (1, 2) thì không sinh ra cặp (2, 1)).",
            "Vì hệ quản trị PostgreSQL bắt buộc phải so sánh dấu nhỏ hơn.",
            "Để tăng tốc độ đọc từ ổ cứng SSD."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Điều kiện a.product_id < b.product_id vừa ngăn tự ghép vừa đảm bảo tính duy nhất của cặp kết hợp không có thứ tự."
        },
        {
          "question": "Hàm nào sau đây được sử dụng để lấy giá trị của dòng TIẾP THEO trong cùng một phân vùng (Partition)?",
          "options": [
            "LAG()",
            "LEAD()",
            "FIRST_VALUE()",
            "ROW_NUMBER()"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! LEAD() nhìn về phía trước (dòng tiếp theo), trong khi LAG() nhìn về phía sau (dòng liền trước)."
        },
        {
          "question": "Khi cần tính tỷ lệ phần trăm 'A / B' trong SQL, biểu thức nào sau đây an toàn tuyệt đối chống lại lỗi chia cho 0 (Division by zero)?",
          "options": [
            "A / B * 100",
            "A * 100.0 / NULLIF(B, 0)",
            "CASE WHEN A = 0 THEN 0 ELSE A / B END",
            "COALESCE(A / B, 0)"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! NULLIF(B, 0) sẽ biến giá trị 0 thành NULL. Trong SQL, phép chia cho NULL sẽ an toàn trả về NULL thay vì làm văng ngoại lệ sập truy vấn."
        },
        {
          "question": "Để xếp hạng doanh số sản phẩm mà các sản phẩm bằng điểm nhận CÙNG MỘT HẠNG và hạng tiếp theo KHÔNG BỊ NHẢY CÓC (ví dụ: hạng 1, 1, 2), ta dùng hàm nào?",
          "options": [
            "ROW_NUMBER()",
            "RANK()",
            "DENSE_RANK()",
            "NTILE(4)"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! DENSE_RANK() không để lại khoảng trống thứ hạng khi có đồng hạng, trong khi RANK() sẽ nhảy cóc (1, 1, 3)."
        }
      ],
      "summary": [
        "Khung tư duy 4D: Deconstruct (Bóc tách) -> Data Sources (Nguồn bảng) -> Draft CTE (Đường ống) -> Debug & Deliver (Kiểm tra biên).",
        "Phân tích giỏ hàng (Market Basket Analysis): Tận dụng Self-Join với điều kiện khóa a.id < b.id để tìm các cặp sản phẩm mua kèm.",
        "Phân tích chu kỳ khách hàng (Retention Gap): Sử dụng Window Functions ROW_NUMBER() và LEAD() để tính khoảng cách giữa các lần mua.",
        "Bảo vệ an toàn dữ liệu: Luôn dùng NULLIF(B, 0) chống chia cho 0 và COALESCE để làm sạch các giá trị rỗng.",
        "Đường ống CTE phân tầng: Tách bài toán phức tạp thành các khối WITH rõ nghĩa, nâng cao tối đa tính dễ bảo trì và hiệu năng thực thi.",
        "Ôn cách quãng: Tại sao việc hiểu rõ cấu trúc chỉ mục B-Tree (Bài 6.1) lại giúp bạn giải thích tại sao câu lệnh Self-Join trên bảng không có index lại chạy chậm như rùa?"
      ]
    },
    {
      "id": "sql-41-debugging-guide",
      "number": "8.2",
      "title": "Cẩm Nang Chẩn Đoán & Gỡ Lỗi SQL: Đọc Lỗi Hệ Thống & Bắt Lỗi Logic Ngầm",
      "subtitle": "Kỹ nghệ chẩn đoán và khắc phục sự cố SQL: Phân loại lỗi tường minh (Syntax, Type mismatch, Ambiguous, Division by zero) và lật tẩy lỗi logic ngầm (Cartesian join, NULL trap, Off-by-one)",
      "level": "Tổng hợp",
      "duration": "55 phút",
      "keywords": [
        "SQL Debugging",
        "Error Codes",
        "Syntax Error",
        "Ambiguous Column",
        "Cartesian Product",
        "NULL Trap",
        "NOT IN with NULL",
        "Off-by-one",
        "Silent Logic Errors",
        "Troubleshooting"
      ],
      "prerequisites": "Tất cả các bài học từ Tầng 1 đến Tầng 7, bài thực hành 8.1.",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+, SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Giải mã chính xác các thông điệp lỗi hệ thống phổ biến (Syntax error, Ambiguous column, Group by violation, Type mismatch) và định vị dòng code gây lỗi.",
        "Phân tích bản chất logic ba giá trị (Three-Valued Logic: TRUE, FALSE, UNKNOWN) và hóa giải chiếc bẫy chết người `NOT IN` khi tập con có chứa giá trị `NULL`.",
        "Nhận diện và triệt tiêu lỗi nhân đôi số dòng ngầm (Silent Fan-out / Cartesian Join) làm sai lệch các phép tổng hợp SUM, COUNT.",
        "Sửa chữa dứt điểm lỗi lệch 1 ngày (Off-by-one error) trong các phép lọc khoảng thời gian do sử dụng sai toán tử `BETWEEN` trên kiểu `TIMESTAMP`.",
        "Thực hành quy trình 5 bước gỡ lỗi SQL có hệ thống: Isolate (Cô lập), Simplify (Thu gọn), Sample (Lấy mẫu dòng), Type Check (Kiểm tra kiểu), và Assert Invariants (Kiểm tra tính bất biến)."
      ],
      "intuition": {
        "title": "Bác Sĩ Cấp Cứu: Triệu Chứng Sốt Tường Minh vs Căn Bệnh Tiềm Ẩn Không Triệu Chứng",
        "metaphor": "Trong y khoa, khi bệnh nhân bị sốt phát ban hoặc gãy xương (Lỗi hệ thống - Explicit Errors: CSDL báo lỗi đỏ, ngắt câu lệnh ngay lập tức), bác sĩ rất dễ định vị vị trí tổn thương. Nhưng nguy hiểm gấp trăm lần là những căn bệnh tiềm ẩn không có triệu chứng rõ ràng (Lỗi logic ngầm - Silent Logic Errors): Câu lệnh vẫn chạy trơn tru, không báo một lỗi nào, nhưng số liệu doanh thu lại bị phóng đại gấp 3 lần hoặc bỏ sót 30% khách hàng! Giám đốc tài chính nhìn vào số liệu đó và đưa ra quyết định sai lầm. Một kỹ sư SQL bậc thầy không chỉ biết sửa lỗi đỏ của compiler, mà còn phải là một chuyên gia giải phẫu bắt trọn mọi căn bệnh logic ngầm!",
        "boundary": "Cẩm nang này tập trung vào 2 nhóm: Lỗi cú pháp/hệ thống ném ra từ Database Engine và Lỗi ngữ nghĩa logic ngầm sinh ra kết quả sai lệch dù câu lệnh chạy thành công 100%.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">1. ISOLATE CTE</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">SELECT * FROM cte</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Kiểm tra từng khối</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">2. CHECK FAN-OUT</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">COUNT(*) trước/sau</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Bắt lỗi nhân dòng JOIN</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">3. TRACE NULL</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">3VL in WHERE/IN</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Bắt lỗi rỗng kết quả</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:140px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--success);font-weight:700;\">4. EXPLAIN BUFFERS</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">Disk Spill / Seq Scan</div>\n                <div style=\"font-size:0.7rem;\">Chẩn đoán nghẽn RAM</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--danger);\">⚠️ Triết lý gỡ lỗi:</span>\n              <span>Không bao giờ đoán mò; hãy sử dụng <code>COUNT(*)</code> và <code>COUNT(DISTINCT key)</code> ở từng tầng CTE để xác định chính xác dòng nào làm dữ liệu bị phình to hoặc biến mất.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-41-problem-hook",
          "title": "Gợi Mở Vấn Đề: Câu Lệnh Chạy Thành Công 100% Nhưng Báo Cáo Doanh Thu Bị Đội Lên 50 Tỷ!",
          "content": "\n        <p>Một ngày thứ Hai, đội ngũ kế toán TechMart hốt hoảng báo cáo: Số liệu doanh thu tháng vừa qua trên Dashboard hiển thị <strong>85 tỷ VNĐ</strong>, trong khi tiền thực tế chảy vào tài khoản ngân hàng chỉ có <strong>35 tỷ VNĐ</strong>!</p>\n        <p>Kỹ sư phụ trách khẳng định: <em>\"Câu lệnh SQL của em chạy mượt mà, không hề có bất kỳ lỗi đỏ nào từ PostgreSQL, làm sao sai được?\"</em></p>\n        <p>Sau 4 tiếng rà soát từng dòng, họ phát hiện ra một dòng JOIN ngây thơ:</p>\n        <pre><code class=\"language-sql\">FROM orders o\nJOIN order_items oi ON o.order_id = oi.order_id\nJOIN order_promotions op ON o.order_id = op.order_id  -- Mỗi đơn có trung bình 2 mã giảm giá!</code></pre>\n        <p>Bởi vì một đơn hàng có thể áp dụng 2 mã voucher, phép JOIN thứ ba đã vô tình nhân đôi từng dòng của <code>order_items</code>! Mỗi chiếc iPhone trị giá 30 triệu đồng được tính tổng tiền 2 lần, đẩy tổng doanh thu tăng vọt thêm 50 tỷ ảo!</p>\n        <p>Đây chính là bi kịch kinh điển của <strong>Lỗi Logic Ngầm (Silent Logic Error)</strong> — kẻ thù số 1 của mọi hệ thống phân tích dữ liệu.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-41-mental-model",
          "title": "Mô Hình Tâm Trí: Quy Trình 5 Bước Chẩn Đoán & Gỡ Lỗi SQL Có Hệ Thống",
          "content": "\n        <p>Khi gặp câu truy vấn bị lỗi hoặc cho ra kết quả đáng ngờ, hãy tuân thủ 5 bước khoa học:</p>\n        <div style=\"background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid var(--accent, #3b82f6); margin: 16px 0;\">\n          <ol>\n            <li><strong>Bước 1 - Isolate (Cô lập CTE / Subquery):</strong> Nếu câu lệnh có 4 CTE, hãy chạy riêng từng CTE từ trên xuống dưới: <code>SELECT * FROM cte_1 LIMIT 5;</code> để xác định chính xác bước nào bắt đầu sinh ra kết quả bất thường.</li>\n            <li><strong>Bước 2 - Count Check (Kiểm tra số dòng trước & sau JOIN):</strong> Trước khi JOIN, bảng A có 100 dòng. Sau khi JOIN bảng B, số dòng tăng lên 250 dòng &rarr; Bạn vừa bị Fan-out do quan hệ 1-nhiều mà không hay biết!</li>\n            <li><strong>Bước 3 - Inspect Column Granularity (Soi độ mịn cột):</strong> Đơn vị của mỗi dòng trong kết quả hiện tại là gì? Nếu là mức đơn hàng, tại sao lại xuất hiện cột mã sản phẩm mà không có hàm gom nhóm?</li>\n            <li><strong>Bước 4 - Verify Data Types & NULLs (Kiểm tra kiểu dữ liệu & giá trị rỗng):</strong> Có phép so sánh nào với NULL bằng dấu <code>=</code> không? Có trường ngày tháng nào bị cắt cụt múi giờ không?</li>\n            <li><strong>Bước 5 - Assert Invariants (Kiểm tra bất biến):</strong> Tổng số tiền trước khi tổng hợp có bằng tổng số tiền sau khi tổng hợp không?</li>\n          </ol>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-41-core-syntax",
          "title": "Bảng Tra Cứu Nhanh 5 Lỗi Hệ Thống Tường Minh Phổ Biến Nhất (Explicit Errors)",
          "content": "\n        <p>Khi hệ thống ném ra lỗi đỏ, hãy đối chiếu ngay với bảng tra cứu này:</p>\n        <div style=\"overflow-x: auto; margin: 16px 0;\">\n          <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n            <thead>\n              <tr style=\"background: var(--bg-surface-elevated, #1e293b); text-align: left;\">\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Thông Báo Lỗi</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Mã SQLSTATE</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Nguyên Nhân Gốc Rễ</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Cách Khắc Phục Tức Thì</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600; color: #ef4444;\">column \"col\" must appear in the GROUP BY clause or be used in an aggregate function</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">42803</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Bạn SELECT một cột không nằm trong GROUP BY và cũng không bọc trong hàm SUM/MAX/COUNT.</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Thêm cột đó vào GROUP BY hoặc bọc nó vào hàm tổng hợp (MAX, MIN, AVG).</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600; color: #ef4444;\">column reference \"col\" is ambiguous</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">42702</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Hai hoặc nhiều bảng tham gia JOIN có cùng tên cột (ví dụ: customer_id hoặc created_at).</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Ghi rõ tiền tố alias của bảng (ví dụ: c.customer_id hoặc o.created_at).</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600; color: #ef4444;\">division by zero</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">22012</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Mẫu số trong phép chia bằng 0.</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Bọc mẫu số trong <code>NULLIF(denominator, 0)</code>.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600; color: #ef4444;\">operator does not exist: text = integer</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">42883</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">So sánh hoặc JOIN hai cột không cùng kiểu dữ liệu mà không ép kiểu tường minh.</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Dùng toán tử ép kiểu <code>col::text = other_col::text</code>.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600; color: #ef4444;\">subquery must return only one column</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">42601</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Dùng WHERE id IN (SELECT id, name FROM ...) trả về nhiều hơn 1 cột.</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Chỉ giữ lại đúng 1 cột cần so sánh trong mệnh đề SELECT của Subquery.</td>\n              </tr>\n            </tbody>\n          </table>\n              </div>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-41-worked-example",
          "title": "Ví Dụ Mẫu Thực Chiến TechMart: Giải Quyết Lỗi Kép Group By Violation & Ambiguous Column",
          "content": "\n        <p>Quan sát đoạn mã gặp lỗi nghiêm trọng dưới đây khi người mới viết truy vấn tổng hợp báo cáo:</p>\n      ",
          "codeExamples": [
            {
              "code": "-- ĐOẠN MÃ LỖI (Ném ra lỗi 42702 Ambiguous và 42803 Group By):\n-- SELECT customer_id, full_name, SUM(total_amount)\n-- FROM customers c\n-- JOIN orders o ON customer_id = o.customer_id\n-- GROUP BY c.customer_id;\n\n-----------------------------------------------------------------------------\n-- LỜI GIẢI ĐÃ GỠ LỖI CHUẨN XÁC:\nSELECT \n    c.customer_id,                     -- 1. Giải quyết Ambiguous bằng tiền tố 'c.'\n    c.full_name,                       -- 2. Đưa full_name vào GROUP BY hoặc hàm MAX()\n    COALESCE(SUM(o.total_amount), 0) AS total_spent\nFROM customers c\nLEFT JOIN orders o \n    ON c.customer_id = o.customer_id   -- 3. Chỉ định rõ ràng c.customer_id\nGROUP BY \n    c.customer_id, \n    c.full_name;                       -- 4. Bổ sung c.full_name vào GROUP BY",
              "explanation": "Việc chỉ định rõ alias c.customer_id ở cả SELECT, ON và GROUP BY triệt tiêu hoàn toàn lỗi nhập nhằng (Ambiguous). Bổ sung c.full_name vào GROUP BY tuân thủ nguyên tắc: Mọi cột không tổng hợp đều phải có mặt trong GROUP BY.",
              "output": "Truy vấn thực thi trơn tru, liệt kê đầy đủ từng khách hàng kèm tổng chi tiêu chuẩn xác."
            }
          ]
        },
        {
          "id": "sec-41-predict-faded",
          "title": "Thử Thách Dự Đoán & Bài Tập Điền Khuyết Faded Example: Chiếc Bẫy Kinh Điển NOT IN With NULL",
          "content": "\n        <p><strong>Tình huống kinh điển:</strong> Bạn muốn tìm danh sách những khách hàng <em>chưa từng phát sinh bất kỳ đơn hàng nào</em>. Bạn viết:</p>\n        <pre><code class=\"language-sql\">-- Câu truy vấn bị lỗi logic ngầm:\nSELECT customer_id, full_name\nFROM customers\nWHERE customer_id NOT IN (\n    SELECT customer_id FROM orders  -- Giả sử có đúng 1 dòng orders bị customer_id = NULL!\n);</code></pre>\n        <p><strong>Kết quả:</strong> Truy vấn trả về <strong>0 dòng (Rỗng)</strong>, mặc dù thực tế có 50 khách hàng chưa từng mua hàng!</p>\n        <div class=\"predict-details\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 14px; border-radius: 6px; margin: 12px 0;\">\n          <details>\n            <summary style=\"font-weight: 600; cursor: pointer; color: var(--accent, #3b82f6);\">Xem Phân Tích Cơ Chế Ba Giá Trị & Cách Sửa Bằng NOT EXISTS</summary>\n            <p style=\"margin-top: 8px;\"><strong>Vì sao NOT IN trả về rỗng?</strong></p>\n            <p>Mệnh đề <code>x NOT IN (1, 2, NULL)</code> được SQL diễn dịch thành:</p>\n            <p><code>(x != 1) AND (x != 2) AND (x != NULL)</code></p>\n            <p>Trong hệ thống logic 3 giá trị của SQL: <code>x != NULL</code> luôn cho ra kết quả <strong>UNKNOWN</strong>! Phép toán <code>TRUE AND TRUE AND UNKNOWN</code> có kết quả là <code>UNKNOWN</code> (không phải TRUE). Vì mệnh đề WHERE chỉ giữ lại các dòng có kết quả TRUE, toàn bộ kết quả bị nuốt trọn thành rỗng!</p>\n            <p><strong>Cách sửa đúng 100% bằng NOT EXISTS:</strong></p>\n            <pre><code class=\"language-sql\">SELECT c.customer_id, c.full_name\nFROM customers c\nWHERE NOT EXISTS (\n    SELECT 1 \n    FROM orders o \n    WHERE o.customer_id = c.customer_id\n);</code></pre>\n            <p>Toán tử <code>NOT EXISTS</code> chỉ quan tâm có dòng khớp hay không, hoàn toàn miễn nhiễm với giá trị NULL trong bảng con!</p>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-41-silent-errors",
          "title": "Bộ Ba Lỗi Logic Ngầm Nguy Hiểm Nhất (Silent Logic Errors)",
          "content": "\n        <div style=\"background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 16px; border-radius: 8px; margin: 16px 0;\">\n          <h4 style=\"color: #ef4444; margin-top: 0;\">Ba Căn Bệnh Tiềm Ẩn Làm Sai Lệch Kết Quả Phân Tích:</h4>\n          <ol>\n            <li>\n              <strong>Bẫy BETWEEN với TIMESTAMP (Lỗi Off-by-one):</strong><br/>\n              <em>Sai lầm:</em> Viết <code>WHERE created_at BETWEEN '2026-01-01' AND '2026-01-31'</code>.<br/>\n              <em>Bản chất:</em> Chuỗi <code>'2026-01-31'</code> tự động được ép kiểu thành <code>'2026-01-31 00:00:00'</code>! Toàn bộ các đơn hàng phát sinh trong ngày 31 từ 00:00:01 đến 23:59:59 bị bỏ sót hoàn toàn!<br/>\n              <em>Sửa đúng:</em> <code>WHERE created_at >= '2026-01-01' AND created_at < '2026-02-01'</code> (Quy tắc nửa mở Half-Open Interval).\n            </li>\n            <li>\n              <strong>Bẫy COUNT(column) vs COUNT(*):</strong><br/>\n              <em>Bản chất:</em> <code>COUNT(*)</code> đếm số dòng bao gồm cả dòng rỗng; trong khi <code>COUNT(column_name)</code> chỉ đếm các dòng mà <code>column_name IS NOT NULL</code>. Nếu bạn đếm số lượng khách hàng bằng <code>COUNT(referred_by)</code>, kết quả sẽ bị thiếu tất cả những khách hàng tự đăng ký không có người giới thiệu!\n            </li>\n            <li>\n              <strong>Bẫy Tự Bịt Mắt Bằng DISTINCT:</strong><br/>\n              <em>Sai lầm:</em> Thấy câu lệnh JOIN ra dữ liệu trùng lặp, liền vội vã thêm <code>SELECT DISTINCT</code> ở đầu câu lệnh.<br/>\n              <em>Bản chất:</em> Thao tác này chỉ che giấu triệu chứng mà không chữa được nguyên nhân gốc rễ (phép JOIN bị sai). Nó khiến database phải tốn chi phí Sort dữ liệu khổng lồ trên đĩa cứng và làm sai lệch nghiêm trọng các phép tính <code>SUM()</code>!\n            </li>\n          </ol>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-41-pitfalls",
          "title": "Bẫy Thường Gặp & Quan Niệm Sai Lầm Khi Gỡ Lỗi SQL",
          "content": "\n        <p>Những thói quen xấu khi debug SQL cần loại bỏ ngay lập tức:</p>\n        <ul>\n          <li><strong>So sánh bằng với NULL:</strong> Viết <code>WHERE status = NULL</code> hoặc <code>WHERE status != NULL</code>. Trong SQL, biểu thức này luôn trả về UNKNOWN (false). Bắt buộc phải dùng <code>IS NULL</code> hoặc <code>IS NOT NULL</code>.</li>\n          <li><strong>Debug trên môi trường Production:</strong> Chạy các câu lệnh thử nghiệm chưa có LIMIT hoặc thiếu điều kiện WHERE thẳng trên máy chủ sản phẩm, gây Lock bảng và tê liệt ứng dụng.</li>\n          <li><strong>Bỏ qua kế hoạch thực thi EXPLAIN:</strong> Khi câu lệnh chạy quá lâu (treo), cố gắng bấm Cancel và đoán mò thay vì chạy <code>EXPLAIN</code> để tìm xem bảng nào đang bị Cartesian Product (Hash Join với hàng triệu dòng).</li>\n        </ul>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-41-comparison",
          "title": "Bảng So Sánh Đa Chiều: Ba Nhóm Sự Cố SQL Thường Gặp",
          "content": "\n        <p>Bảng phân loại giúp bạn nhận diện nhanh bản chất sự cố và áp dụng đúng phương pháp xử lý:</p>\n        <div style=\"overflow-x: auto; margin: 16px 0;\">\n          <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n            <thead>\n              <tr style=\"background: var(--bg-surface-elevated, #1e293b); text-align: left;\">\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Thuộc Tính</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Lỗi Hệ Thống Tường Minh (Explicit Error)</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Lỗi Logic Ngầm (Silent Logic Error)</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Lỗi Hiệu Năng (Performance Regression)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Dấu hiệu nhận biết</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Database ngắt câu lệnh, trả về thông báo lỗi đỏ kèm mã SQLSTATE</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Câu lệnh chạy thành công nhưng dữ liệu kết quả sai lệch</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Câu lệnh chạy đúng nhưng mất 30 phút thay vì 2 giây</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Mức độ nguy hiểm</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Thấp (Phát hiện ngay lập tức trước khi xuất bản)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Cực kỳ nguy hiểm (Dẫn tới quyết định kinh doanh sai lệch)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Cao (Làm nghẽn tài nguyên CPU/RAM máy chủ)</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Công cụ phát hiện</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">SQL Parser, Database Engine, SQLFluff</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">dbt test, Great Expectations, Assert Queries</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">EXPLAIN ANALYZE, pg_stat_statements</td>\n              </tr>\n            </tbody>\n          </table>\n              </div>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-41-real-world",
          "title": "Ứng Dụng Thực Tế: Viết Câu Truy Vấn Kiểm Tra Tính Bất Biến (Assert Invariants)",
          "content": "\n        <p>Để ngăn chặn vĩnh viễn lỗi Fan-out nhân đôi số tiền trong các pipeline báo cáo quan trọng, các kỹ sư Senior thường gắn thêm một khối CTE tự kiểm tra:</p>\n      ",
          "codeExamples": [
            {
              "code": "-- Kỹ thuật Assert Invariant: Tự động phát hiện lỗi Fan-out\nWITH raw_order_totals AS (\n    -- Bước 1: Tính tổng doanh thu gốc chuẩn xác từ bảng orders\n    SELECT SUM(total_amount) AS expected_total\n    FROM orders\n    WHERE order_date >= '2026-01-01' AND order_date < '2026-02-01'\n),\njoined_transformed AS (\n    -- Bước 2: Bảng sau khi JOIN nhiều tầng\n    SELECT SUM(oi.subtotal) AS actual_total\n    FROM orders o\n    JOIN order_items oi ON o.order_id = oi.order_id\n    WHERE o.order_date >= '2026-01-01' AND o.order_date < '2026-02-01'\n)\nSELECT \n    r.expected_total,\n    j.actual_total,\n    (j.actual_total - r.expected_total) AS discrepancy,\n    CASE \n        WHEN ABS(j.actual_total - r.expected_total) < 0.01 THEN 'PASSED: Dữ liệu toàn vẹn'\n        ELSE 'FAILED: Phát hiện lệch số liệu do lỗi JOIN!'\n    END AS integrity_status\nFROM raw_order_totals r\nCROSS JOIN joined_transformed j;",
              "explanation": "Nếu integrity_status trả về FAILED, hệ thống CI/CD sẽ chặn đứng pipeline ngay lập tức, không cho phép số liệu bẩn được công bố lên Dashboard.",
              "output": "Hệ thống tự động bảo vệ tính toàn vẹn số liệu tài chính trước mọi rủi ro biến đổi logic."
            }
          ]
        }
      ],
      "callouts": {
        "pitfalls": [
          "Tuyệt đối không dùng toán tử NOT IN khi tập con có khả năng chứa giá trị NULL; hãy thay thế 100% bằng NOT EXISTS hoặc LEFT JOIN ... WHERE ... IS NULL.",
          "Đừng bao giờ dùng toán tử BETWEEN để lọc ngày trên các cột có kiểu TIMESTAMP; hãy dùng khoảng nửa mở >= đầu tháng AND < đầu tháng sau."
        ],
        "tips": [
          "Luôn gán alias ngắn gọn và có ý nghĩa cho mọi bảng tham gia JOIN, đồng thời ghi rõ alias trước mọi tên cột để phòng ngừa vĩnh viễn lỗi Ambiguous.",
          "Sử dụng kỹ thuật CTE chia nhỏ để debug từng phần: Kiểm tra số dòng (COUNT(*)) ở từng chặng CTE để phát hiện ngay vị trí bắt đầu bị Fan-out."
        ],
        "deepDive": {
          "title": "Kỹ thuật Profile Memory Spilling: Đọc cờ Workfile và Temp Files trong PostgreSQL / DuckDB",
          "content": "<p>Khi một câu truy vấn báo cáo đột ngột chạy từ 1 giây vọt lên 5 phút, nguyên nhân số 1 trong 90% trường hợp là <strong>Memory Spilling (Tràn bộ nhớ ra đĩa)</strong>.</p><p>Khi chạy <code>EXPLAIN (ANALYZE, BUFFERS)</code>, hãy tìm kiếm các dòng thông báo:</p><pre class=\"code-pre\"><code>Sort Method: external merge  Disk: 42560kB\nBuckets: 1048576  Batches: 32  Memory Usage: 4096kB</code></pre><p>Dòng này cho thấy câu lệnh đã làm cạn kiệt bộ đệm <code>work_mem</code> trong RAM và phải ghi tràn 42MB dữ liệu tạm ra ổ đĩa! Để khắc phục ngay lập tức, bạn có thể tăng bộ đệm cục bộ cho riêng phiên làm việc hiện tại: <code>SET work_mem = '128MB';</code> mà không làm ảnh hưởng đến cấu hình toàn cục của các người dùng khác.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài Tập Cơ Bản: Sửa Lỗi Cú Pháp GROUP BY Violation",
          "level": "Cơ bản",
          "problem": "Câu truy vấn sau bị lỗi `column \"products.product_name\" must appear in the GROUP BY clause or be used in an aggregate function`: `SELECT category, product_name, COUNT(*) FROM products GROUP BY category;`. Hãy sửa lại câu lệnh sao cho hợp lệ: Trả về category, số lượng sản phẩm trong category đó, và tên sản phẩm có giá cao nhất trong category.",
          "hint": "Không thể SELECT product_name đơn thuần khi chỉ GROUP BY category. Sử dụng hàm tổng hợp MAX(product_name) hoặc đưa cả product_name vào GROUP BY nếu muốn chi tiết.",
          "solutionCode": "-- Sửa lỗi GROUP BY hợp lệ bằng hàm tổng hợp:\nSELECT \n    category,\n    MAX(product_name) AS sample_product_name,\n    COUNT(*) AS total_products\nFROM products\nGROUP BY category\nORDER BY total_products DESC;",
          "solutionOutput": "category | sample_product_name | total_products",
          "explanation": "Khi thực hiện GROUP BY category, mọi cột khác xuất hiện trong SELECT bắt buộc phải nằm trong hàm tổng hợp (như MAX, MIN, COUNT) để gom nhiều giá trị thành 1 đại diện duy nhất."
        },
        {
          "title": "Bài Tập Trung Bình: Chuyển Đổi Câu Lệnh NOT IN Chứa NULL Sang NOT EXISTS An Toàn",
          "level": "Trung bình",
          "problem": "Viết lại câu truy vấn tìm các sản phẩm chưa từng có ai mua bằng cách sử dụng toán tử `NOT EXISTS` để đảm bảo an toàn tuyệt đối ngay cả khi bảng `order_items` có chứa dòng bị `product_id IS NULL`.",
          "hint": "Sử dụng SELECT p.product_id, p.product_name FROM products p WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.product_id).",
          "solutionCode": "-- Tìm sản phẩm chưa từng bán bằng NOT EXISTS an toàn:\nSELECT \n    p.product_id,\n    p.product_name,\n    p.category,\n    p.price\nFROM products p\nWHERE NOT EXISTS (\n    SELECT 1 \n    FROM order_items oi \n    WHERE oi.product_id = p.product_id\n);",
          "solutionOutput": "Danh sách sản phẩm tồn kho chưa từng phát sinh giao dịch.",
          "explanation": "Toán tử NOT EXISTS đánh giá theo từng dòng tương quan (correlated subquery) và hoàn toàn không bị ảnh hưởng bởi sự tồn tại của giá trị NULL trong bảng con."
        },
        {
          "title": "Bài Tập Khá: Sửa Lỗi Lọc Thời Gian Off-By-One Với Kiểu TIMESTAMP",
          "level": "Khá",
          "problem": "Báo cáo doanh số tháng 1 năm 2026 đang bị thiếu mất dữ liệu của ngày cuối cùng 31/01/2026 do lập trình viên dùng: `WHERE order_date BETWEEN '2026-01-01' AND '2026-01-31'`. Biết rằng `order_date` có kiểu dữ liệu `TIMESTAMP`. Hãy viết lại mệnh đề WHERE theo chuẩn khoảng nửa mở (Half-open interval) để lấy chính xác và đầy đủ 100% dữ liệu từ giây đầu tiên đến giây cuối cùng của tháng 1.",
          "hint": "Dùng điều kiện: WHERE order_date >= '2026-01-01 00:00:00' AND order_date < '2026-02-01 00:00:00'.",
          "solutionCode": "-- Chuẩn hóa lọc khoảng thời gian TIMESTAMP bằng khoảng nửa mở:\nSELECT \n    DATE_TRUNC('month', order_date) AS report_month,\n    COUNT(order_id) AS total_orders,\n    SUM(total_amount) AS total_revenue\nFROM orders\nWHERE order_date >= '2026-01-01' \n  AND order_date < '2026-02-01'\n  AND status = 'completed'\nGROUP BY DATE_TRUNC('month', order_date);",
          "solutionOutput": "report_month = 2026-01-01 | total_orders đúng 100% không sót giây nào của ngày 31/01.",
          "explanation": "Khoảng nửa mở [Start, End) là tiêu chuẩn vàng của ngành phần mềm: Cận dưới lấy dấu >= ngày bắt đầu, cận trên lấy dấu < ngày đầu tiên của chu kỳ tiếp theo, loại bỏ hoàn toàn lỗi làm tròn mili-giây."
        },
        {
          "title": "Bài Tập Nâng Cao: Chẩn Đoán & Khắc Phục Lỗi Fan-Out Duplication Trong Báo Cáo Doanh Thu",
          "level": "Nâng cao",
          "problem": "Một báo cáo JOIN giữa bảng `orders` (1 đơn có nhiều sản phẩm) và bảng `shipping_logs` (1 đơn có nhiều lần cập nhật trạng thái giao hàng) làm cho tổng tiền `SUM(o.total_amount)` bị nhân lên gấp nhiều lần. Hãy tái cấu trúc câu truy vấn bằng kỹ thuật CTE tổng hợp độc lập trước khi JOIN để đưa ra số liệu chuẩn xác.",
          "hint": "Tính toán tổng số sản phẩm và tổng tiền trong một CTE riêng theo order_id, tính số lần giao hàng trong một CTE riêng, sau đó mới JOIN 2 kết quả tổng hợp lại ở mức đơn hàng.",
          "solutionCode": "-- Khắc phục triệt để lỗi Fan-out bằng Aggregate-Before-Join:\nWITH order_item_stats AS (\n    -- Tổng hợp mức order_id từ order_items\n    SELECT \n        order_id,\n        COUNT(item_id) AS total_items,\n        SUM(subtotal) AS calculated_items_total\n    FROM order_items\n    GROUP BY order_id\n),\norder_shipping_stats AS (\n    -- Tổng hợp số lần update vận chuyển từ shipping_logs\n    SELECT \n        order_id,\n        COUNT(log_id) AS total_tracking_updates,\n        MAX(updated_at) AS last_shipping_update\n    FROM shipping_logs\n    GROUP BY order_id\n)\nSELECT \n    o.order_id,\n    o.customer_id,\n    o.total_amount AS original_order_amount,\n    COALESCE(its.total_items, 0) AS total_items,\n    COALESCE(shs.total_tracking_updates, 0) AS shipping_updates_count\nFROM orders o\nLEFT JOIN order_item_stats its ON o.order_id = its.order_id\nLEFT JOIN order_shipping_stats shs ON o.order_id = shs.order_id\nWHERE o.status = 'completed';",
          "solutionOutput": "Mỗi order_id xuất hiện đúng 1 dòng duy nhất, không bị nhân đôi số tiền hay nhân đôi dòng.",
          "explanation": "Nguyên lý Aggregate-Before-Join: Khi có nhiều bảng con cùng quan hệ 1-nhiều với bảng cha, không bao giờ JOIN trực tiếp tất cả các bảng lá với nhau. Hãy gom nhóm từng bảng lá về mức khóa chính của bảng cha trước khi thực hiện phép nối."
        }
      ],
      "quiz": [
        {
          "question": "Vì sao câu truy vấn 'SELECT * FROM users WHERE status = NULL;' lại không trả về bất kỳ dòng nào ngay cả khi có bản ghi chứa status là NULL?",
          "options": [
            "Vì từ khóa NULL viết sai chính tả.",
            "Vì trong chuẩn SQL ba giá trị, phép so sánh bằng '= NULL' luôn trả về UNKNOWN (không phải TRUE), mệnh đề WHERE sẽ loại bỏ dòng đó.",
            "Vì máy chủ cơ sở dữ liệu tự động xóa các dòng có giá trị NULL.",
            "Vì trường status bắt buộc phải có kiểu số nguyên."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Trong SQL, NULL biểu thị trạng thái không xác định. Không thể so sánh bằng với một giá trị không xác định; bắt buộc phải sử dụng toán tử 'IS NULL'."
        },
        {
          "question": "Điều gì sẽ xảy ra khi thực hiện 'WHERE col NOT IN (SELECT other_col FROM table)' nếu tập kết quả của subquery có chứa ít nhất một giá trị NULL?",
          "options": [
            "Câu truy vấn sẽ ném ra lỗi cú pháp Syntax Error.",
            "Câu truy vấn sẽ tự động bỏ qua dòng NULL và chạy bình thường.",
            "Toàn bộ biểu thức NOT IN sẽ luôn trả về kết quả UNKNOWN, khiến toàn bộ câu truy vấn ngoài cùng trả về 0 dòng kết quả (rỗng).",
            "Máy chủ cơ sở dữ liệu sẽ bị treo hoàn toàn."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Đây là chiếc bẫy nguy hiểm bậc nhất trong SQL. Khi subquery có chứa NULL, biểu thức NOT IN luôn trả về UNKNOWN và nuốt trọn toàn bộ kết quả."
        },
        {
          "question": "Để khắc phục lỗi lệch thời gian Off-by-one khi lọc các cột kiểu TIMESTAMP cho tháng 1 năm 2026, cú pháp nào sau đây là chuẩn mực nhất?",
          "options": [
            "WHERE order_date BETWEEN '2026-01-01' AND '2026-01-31'",
            "WHERE order_date >= '2026-01-01' AND order_date < '2026-02-01'",
            "WHERE order_date <= '2026-01-31 23:59:59.999'",
            "WHERE order_date LIKE '2026-01%'"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Khoảng nửa mở [Start, End) với >= đầu tháng và < đầu tháng tiếp theo là tiêu chuẩn vàng xử lý kiểu TIMESTAMP an toàn tuyệt đối."
        },
        {
          "question": "Hiện tượng 'Fan-out Duplication' trong SQL bắt nguồn từ nguyên nhân nào?",
          "options": [
            "Do máy tính bị nóng quạt tản nhiệt.",
            "Do thực hiện phép JOIN giữa các bảng có quan hệ 1-nhiều hoặc nhiều-nhiều mà không gom nhóm trước, khiến số dòng của bảng chính bị nhân lên gấp nhiều lần.",
            "Do viết hoa từ khóa SELECT.",
            "Do sử dụng quá nhiều lệnh LIMIT."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Fan-out xảy ra khi 1 dòng ở bảng bên trái ghép với nhiều dòng ở bảng bên phải, làm bùng nổ số dòng và làm sai lệch nghiêm trọng các phép tính SUM, COUNT."
        },
        {
          "question": "Biện pháp nào sau đây là cách xử lý ĐÚNG ĐẮN NHẤT khi phát hiện câu truy vấn JOIN bị nhân đôi dòng?",
          "options": [
            "Thêm từ khóa DISTINCT ở đầu câu lệnh để ép xóa dòng trùng lặp.",
            "Giảm bớt bộ nhớ RAM của máy chủ Database.",
            "Tìm hiểu quan hệ dữ liệu giữa các bảng, kiểm tra khóa nối (Join Keys) và thực hiện gom nhóm (Aggregate) bảng lá trước khi JOIN.",
            "Chuyển toàn bộ dữ liệu sang file Excel để xóa dòng thủ công."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Thêm DISTINCT chỉ là bịt mắt che giấu triệu chứng. Cách xử lý chuyên nghiệp là phân tích lại mô hình quan hệ và gom nhóm dữ liệu đúng mức độ mịn (Granularity)."
        }
      ],
      "summary": [
        "Phân loại 3 nhóm sự cố: Lỗi hệ thống tường minh (Compiler ném lỗi đỏ), Lỗi logic ngầm (Chạy êm nhưng số liệu sai), và Lỗi hiệu năng (Treo hệ thống).",
        "Cạm bẫy NOT IN với NULL: Khi subquery có NULL, NOT IN bị vô hiệu hóa thành UNKNOWN; luôn ưu tiên sử dụng NOT EXISTS.",
        "Khoảng nửa mở [Start, End): Thay thế hoàn toàn BETWEEN trên kiểu TIMESTAMP bằng >= đầu kỳ AND < đầu kỳ kế tiếp để tránh lỗi lệch ngày.",
        "Hóa giải Fan-out bằng Aggregate-Before-Join: Gom nhóm các bảng lá về mức khóa chính của bảng cha trước khi JOIN để bảo vệ số tiền không bị nhân đôi.",
        "Tuyệt đối không lạm dụng DISTINCT để che đậy lỗi JOIN sai: Hãy chẩn đoán tận gốc mô hình quan hệ bằng quy trình 5 bước Isolate - Simplify - Sample - Types - Assert.",
        "Ôn cách quãng: Tại sao việc hiểu rõ nguyên lý ACID và cơ chế cô lập giao dịch (Bài 5.2) lại giúp bạn phân biệt được giữa lỗi dữ liệu do truy vấn sai và lỗi do Dirty Read / Phantom Read?"
      ]
    },
    {
      "id": "sql-42-cheatsheet-roadmap",
      "number": "8.3",
      "title": "SQL Master Cheat Sheet, Mindmap Tư Duy & Bảng Thuật Ngữ Anh - Việt",
      "subtitle": "Bản đồ tri thức và cẩm nang tra cứu một trang: Thứ tự thực thi câu lệnh, Bảng thuật ngữ kỹ nghệ dữ liệu chuẩn hóa và Lộ trình nghề nghiệp Data Engineer / Analytics Engineer",
      "level": "Tổng hợp",
      "duration": "50 phút",
      "keywords": [
        "Cheat Sheet",
        "SQL Roadmap",
        "Execution Order",
        "Glossary",
        "Data Engineer",
        "Analytics Engineer",
        "Modern Data Stack",
        "Terminology",
        "Mindmap",
        "Career Path"
      ],
      "prerequisites": "Toàn bộ các bài học từ Tầng 0 đến Tầng 8.",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+, SQLite 3.50.4, MySQL 8.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Nằm lòng thứ tự thực thi chuẩn mực 11 bước của mệnh đề SQL (từ FROM, ON, JOIN đến SELECT, WINDOW, ORDER BY, LIMIT).",
        "Tra cứu và tái hiện nhanh chóng các mẫu cú pháp cốt lõi: DDL, DQL, CTE Pipeline, Window Functions và JSON manipulation trong một màn hình.",
        "Sử dụng chính xác hệ thống thuật ngữ kỹ nghệ dữ liệu Anh - Việt (Idempotency, Data Lineage, Partition Pruning, Backfill, SCD).",
        "Phân tích sự khác biệt về vai trò, bộ công cụ và trách nhiệm cốt lõi giữa Data Analyst, Analytics Engineer và Data Engineer.",
        "Xây dựng lộ trình 12 tháng hoàn thiện hồ sơ năng lực cá nhân (Data Portfolio) tích hợp dbt, DuckDB, Airflow và GitHub Actions."
      ],
      "intuition": {
        "title": "Bản Đồ Hàng Hải & Chiếc La Bàn vs Đi Lạc Giữa Đại Dương Bao La",
        "metaphor": "Khi ra khơi giữa đại dương bao la của thế giới dữ liệu với hàng chục công nghệ thay đổi từng ngày (PostgreSQL, DuckDB, Spark, Airflow, dbt, Snowflake), nếu không có một tấm Bản Đồ Hàng Hải rõ nét và một chiếc La Bàn chuẩn xác, bạn sẽ rất dễ bị chìm đắm trong cảm giác choáng ngợp và hoang mang không biết mình đang đứng ở đâu và cần học gì tiếp theo. Cheat Sheet và Mindmap này chính là tấm bản đồ rút gọn tất cả tinh hoa của 8 tầng tri thức vào một trang duy nhất: Mỗi khi quên cú pháp hoặc cần quyết định kiến trúc, bạn chỉ cần mở ra liếc nhìn trong 30 giây là lập tức tìm thấy phương hướng chính xác!",
        "boundary": "Cheat Sheet mang tính chất tổng hợp và tra cứu nhanh; đối với chi tiết giải thuật hay cơ chế nội tại chuyên sâu, hãy đối chiếu lại các bài học chuyên đề tương ứng ở Tầng 1 đến Tầng 7.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">NỀN TẢNG (TẦNG 0-2)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Đa tập, CRUD, JOIN</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Thao tác &amp; tư duy tập hợp</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">CHUYÊN SÂU (TẦNG 3-5)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">Window, ACID, MVCC</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Giao dịch &amp; trượt cửa sổ</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:150px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--success);font-weight:700;\">KIẾN TRÚC SẢN XUẤT (TẦNG 6-8)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">CBO, Lakehouse, dbt</div>\n                <div style=\"font-size:0.7rem;\">Mở rộng quy mô tỷ dòng</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ 3 Mạch Chiến Lược:</span>\n              <span><strong>[DQ]</strong> Data Quality (Bảo vệ dữ liệu sạch) &bull; <strong>[FE]</strong> Feature Engineering (Phục vụ AI/ML) &bull; <strong>[SCALE]</strong> Big Data &amp; Modern Lakehouse.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-42-problem-hook",
          "title": "Gợi Mở Vấn Đề: Cơn Ác Mộng \"Học Trước Quên Sau\" & Sự Bối Rối Giữa Rừng Thuật Ngữ",
          "content": "\n        <p>Học SQL và Kỹ nghệ Dữ liệu giống như bước vào một thế giới đa ngôn ngữ khổng lồ:</p>\n        <ul>\n          <li>Bạn vừa học xong hàm cửa sổ hôm qua, hôm nay viết lại quên mất cú pháp <code>RANGE BETWEEN</code> hay <code>ROWS BETWEEN</code>.</li>\n          <li>Khi đi phỏng vấn hoặc đọc tài liệu công ty nước ngoài, người ta nhắc tới <em>\"Idempotent pipeline\"</em>, <em>\"Data Lineage\"</em>, <em>\"Star Schema\"</em>, <em>\"SCD Type 2\"</em>, <em>\"Fan-out\"</em>... và bạn cảm thấy lúng túng vì không biết dịch hoặc hiểu thế nào cho đúng bản chất.</li>\n          <li>Bạn tự hỏi: <em>\"Học xong toàn bộ khóa học này, mình nên ứng tuyển vị trí Data Analyst, Analytics Engineer hay Data Engineer? Mình còn thiếu những mảnh ghép nào trong thực tế?\"</em></li>\n        </ul>\n        <p>Bài học này chính là <strong>Bản Đồ Chỉ Đường (The Master Blueprint)</strong> giúp bạn hệ thống hóa toàn bộ tri thức thành một khối thống nhất, vững chắc và sẵn sàng bước vào thị trường lao động toàn cầu.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-42-mental-model",
          "title": "Mô Hình Tâm Trí: Thứ Tự Viết Mã (Lexical) vs Thứ Tự Thực Thi Thực Tế (Execution Order)",
          "content": "\n        <p>Bí mật lớn nhất giúp bạn không bao giờ viết sai cú pháp SQL chính là phân biệt rõ hai thứ tự:</p>\n        <div style=\"background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid var(--accent, #3b82f6); margin: 16px 0;\">\n          <h4 style=\"margin-top: 0; color: var(--accent, #3b82f6);\">Quy Trình 11 Bước Thực Thi Của CSDL (Logical Query Processing):</h4>\n          <ol>\n            <li><strong>FROM:</strong> Xác định các bảng nguồn dữ liệu đầu vào.</li>\n            <li><strong>ON:</strong> Áp dụng điều kiện lọc cho phép ghép nối bảng.</li>\n            <li><strong>JOIN (LEFT / INNER / FULL):</strong> Thực hiện ghép các tập dữ liệu vật lý.</li>\n            <li><strong>WHERE:</strong> Lọc bỏ các dòng dữ liệu không thỏa mãn điều kiện tiên quyết.</li>\n            <li><strong>GROUP BY:</strong> Gom các dòng còn lại vào các nhóm duy nhất theo khóa.</li>\n            <li><strong>HAVING:</strong> Lọc bỏ các nhóm không thỏa mãn điều kiện tổng hợp.</li>\n            <li><strong>WINDOW FUNCTIONS:</strong> Thực thi các hàm phân tích cửa sổ (OVER PARTITION BY).</li>\n            <li><strong>SELECT:</strong> Chiếu và tính toán các cột biểu thức mong muốn.</li>\n            <li><strong>DISTINCT:</strong> Loại bỏ các dòng hoàn toàn trùng lặp.</li>\n            <li><strong>ORDER BY:</strong> Sắp xếp tập kết quả cuối cùng theo tiêu chí.</li>\n            <li><strong>LIMIT / OFFSET:</strong> Cắt lấy số lượng dòng theo yêu cầu phân trang.</li>\n          </ol>\n        </div>\n        <p><strong>Hệ quả quan trọng:</strong> Vì <code>WHERE</code> (Bước 4) chạy trước <code>SELECT</code> (Bước 8), bạn <em>tuyệt đối không thể</em> dùng alias đặt trong SELECT để lọc trong WHERE!</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-42-core-syntax",
          "title": "SQL Master Cheat Sheet: Bảng Tra Cứu Cú Pháp Cốt Lõi Một Trang",
          "content": "\n        <p>Bản tóm tắt các cú pháp mạnh mẽ và thường dùng nhất trong thực tế doanh nghiệp:</p>\n        <div style=\"overflow-x: auto; margin: 16px 0;\">\n          <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n            <thead>\n              <tr style=\"background: var(--bg-surface-elevated, #1e293b); text-align: left;\">\n                <th style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Chuyên Đề</th>\n                <th style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Cú Pháp Chuẩn Mực</th>\n                <th style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Mục Đích Ứng Dụng</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">CTE Pipeline</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\"><code>WITH step_a AS (...), step_b AS (...) SELECT * FROM step_b;</code></td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Module hóa truy vấn phức tạp, loại bỏ Subquery lồng nhau.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Window Function</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\"><code>DENSE_RANK() OVER (PARTITION BY cat ORDER BY rev DESC)</code></td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Xếp hạng top sản phẩm trong từng danh mục mà không làm mất dòng.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Time Running Total</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\"><code>SUM(amount) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING)</code></td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Tính tổng lũy kế doanh thu dồn tích theo thời gian.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">JSONB Trích Xuất</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\"><code>payload->>'user_id'</code> hoặc <code>payload #>> '{meta, ip}'</code></td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Trích xuất chuỗi từ JSON bán cấu trúc trong PostgreSQL/DuckDB.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Idempotent MERGE</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\"><code>MERGE INTO target USING src ON ... WHEN MATCHED THEN UPDATE ...</code></td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Ghi đè/cập nhật dữ liệu tăng dần không sinh dòng trùng.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Chống chia cho 0</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\"><code>numerator * 100.0 / NULLIF(denominator, 0)</code></td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Bảo vệ công thức tính tỷ lệ an toàn tuyệt đối.</td>\n              </tr>\n            </tbody>\n          </table>\n              </div>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-42-worked-example",
          "title": "Ví Dụ Mẫu Thực Chiến TechMart: Bản Giao Hưởng SQL Kết Hợp Trọn Vẹn 11 Mệnh Đề",
          "content": "\n        <p>Quan sát một câu truy vấn hoàn chỉnh thể hiện sự kết hợp hài hòa của toàn bộ các mệnh đề SQL theo đúng thứ tự logic:</p>\n      ",
          "codeExamples": [
            {
              "code": "-- Bản giao hưởng SQL 11 mệnh đề hoàn chỉnh:\nSELECT \n    c.city,                                                     -- 8. SELECT\n    COUNT(DISTINCT o.order_id) AS total_orders,\n    SUM(oi.subtotal) AS city_revenue,\n    DENSE_RANK() OVER (ORDER BY SUM(oi.subtotal) DESC) AS revenue_rank  -- 7. WINDOW FUNCTION\nFROM customers c                                                -- 1. FROM\nINNER JOIN orders o ON c.customer_id = o.customer_id            -- 2 & 3. ON + JOIN\nINNER JOIN order_items oi ON o.order_id = oi.order_id\nWHERE o.order_date >= '2026-01-01' AND o.order_date < '2026-02-01' -- 4. WHERE (Khoảng nửa mở)\n  AND o.status = 'completed'\nGROUP BY c.city                                                 -- 5. GROUP BY\nHAVING SUM(oi.subtotal) >= 10000000                             -- 6. HAVING (Chỉ lấy thành phố >= 10tr)\nORDER BY city_revenue DESC                                      -- 10. ORDER BY (Có thể dùng alias ở đây!)\nLIMIT 5;                                                        -- 11. LIMIT (Cắt lấy Top 5)",
              "explanation": "Mỗi mệnh đề được đặt đúng vị trí cú pháp và tuân thủ chặt chẽ thứ tự thực thi: WHERE lọc trước khi GROUP BY, HAVING lọc sau khi GROUP BY, WINDOW tính toán xếp hạng, và ORDER BY sắp xếp trước khi LIMIT cắt 5 dòng.",
              "output": "Top 5 thành phố có doanh thu tháng 1 vượt trội nhất toàn hệ thống TechMart."
            }
          ]
        },
        {
          "id": "sec-42-predict-faded",
          "title": "Thử Thách Dự Đoán & Bài Tập Điền Khuyết Faded Example: Phán Đoán Lỗi Thứ Tự Thực Thi",
          "content": "\n        <p>Quan sát câu truy vấn sai lầm phổ biến dưới đây:</p>\n        <pre><code class=\"language-sql\">-- Câu truy vấn bị lỗi:\nSELECT \n    customer_id,\n    SUM(total_amount) AS customer_spending\nFROM orders\nWHERE customer_spending > 5000000   -- Lỗi ném ra: column \"customer_spending\" does not exist!\nGROUP BY customer_id;</code></pre>\n        <div class=\"predict-details\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 14px; border-radius: 6px; margin: 12px 0;\">\n          <details>\n            <summary style=\"font-weight: 600; cursor: pointer; color: var(--accent, #3b82f6);\">Xem Giải Thích Nguyên Nhân & Cách Sửa Bằng HAVING Hoặc CTE</summary>\n            <p style=\"margin-top: 8px;\"><strong>Vì sao cột customer_spending không tồn tại ở WHERE?</strong></p>\n            <p>Như đã phân tích ở Mô hình tâm trí: Mệnh đề <code>WHERE</code> (Bước 4) chạy <strong>TRƯỚC</strong> khi mệnh đề <code>SELECT</code> (Bước 8) được thực thi! Tại thời điểm WHERE đang lọc từng dòng của bảng <code>orders</code>, định danh alias <code>customer_spending</code> chưa hề được sinh ra trong bộ nhớ của CSDL!</p>\n            <p><strong>Cách sửa đúng 1: Dùng HAVING:</strong></p>\n            <pre><code class=\"language-sql\">SELECT customer_id, SUM(total_amount) AS customer_spending\nFROM orders\nGROUP BY customer_id\nHAVING SUM(total_amount) > 5000000;</code></pre>\n            <p><strong>Cách sửa đúng 2: Dùng CTE:</strong></p>\n            <pre><code class=\"language-sql\">WITH aggregated_orders AS (\n    SELECT customer_id, SUM(total_amount) AS customer_spending\n    FROM orders\n    GROUP BY customer_id\n)\nSELECT * FROM aggregated_orders\nWHERE customer_spending > 5000000;</code></pre>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-42-glossary",
          "title": "Bảng Thuật Ngữ Kỹ Nghệ Dữ Liệu Anh - Việt Chuẩn Hóa (Glossary)",
          "content": "\n        <p>Bảng chuẩn hóa thuật ngữ chuyên ngành giúp bạn tự tin giao tiếp trong các dự án quốc tế:</p>\n        <div style=\"overflow-x: auto; margin: 16px 0;\">\n          <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n            <thead>\n              <tr style=\"background: var(--bg-surface-elevated, #1e293b); text-align: left;\">\n                <th style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Thuật Ngữ Gốc (Tiếng Anh)</th>\n                <th style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Thuật Ngữ Chuẩn (Tiếng Việt)</th>\n                <th style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Định Nghĩa Bản Chất Kỹ Thuật</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Idempotency</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Tính khả lặp / Tính bất biến khi chạy lại</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Chạy 1 lần hay nhiều lần cùng tham số luôn ra cùng một kết quả nhất quán.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Data Lineage</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Dòng dõi dữ liệu / Phả hệ dữ liệu</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Bản đồ trực quan ghi nhận nguồn gốc và các bước biến đổi dữ liệu từ đầu tới cuối.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Slowly Changing Dimensions (SCD)</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Chiều thay đổi chậm</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Kỹ thuật lưu trữ lịch sử biến động thuộc tính (Type 1 ghi đè, Type 2 thêm dòng lịch sử).</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Cartesian Fan-out</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Bùng nổ số dòng do ghép nối</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Hiện tượng 1 dòng bị nhân lên nhiều dòng do quan hệ 1-nhiều khi JOIN.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Columnar Storage</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Lưu trữ định dạng cột</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Tổ chức dữ liệu trên đĩa theo từng cột (như Parquet, DuckDB) tối ưu cho phân tích OLAP.</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Partition Pruning</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Cắt tỉa phân vùng</td>\n                <td style=\"padding: 8px; border: 1px solid var(--border-color, #334155);\">Bộ tối ưu tự động bỏ qua các file/thư mục phân vùng không liên quan trong WHERE.</td>\n              </tr>\n            </tbody>\n          </table>\n              </div>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-42-pitfalls",
          "title": "Bẫy Thường Gặp & Hiểu Nhầm Về Con Đường Nghề Nghiệp Dữ Liệu",
          "content": "\n        <div style=\"background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 16px; border-radius: 8px; margin: 16px 0;\">\n          <h4 style=\"color: #ef4444; margin-top: 0;\">Top 3 Sai Lầm Định Hướng Nghề Nghiệp:</h4>\n          <ol>\n            <li>\n              <strong>Ảo tưởng \"Chỉ cần viết SQL cơ bản là đủ\":</strong><br/>\n              <em>Thực tế:</em> Thị trường tuyển dụng hiện đại đòi hỏi kỹ năng viết SQL chuẩn phần mềm (Software Engineering for Data): Biết dùng Git, hiểu kiểm thử tự động, biết tối ưu hóa B-Tree và đọc EXPLAIN ANALYZE.\n            </li>\n            <li>\n              <strong>Nhầm lẫn giữa Data Analyst và Analytics Engineer:</strong><br/>\n              <em>Thực tế:</em> Data Analyst tập trung vào tìm kiếm Insight kinh doanh và trực quan hóa (PowerBI, Tableau); trong khi Analytics Engineer tập trung vào xây dựng các mô hình dữ liệu sạch, có thể tái sử dụng, được kiểm thử tự động bằng dbt và quản lý phiên bản bằng Git.\n            </li>\n            <li>\n              <strong>Học quá nhiều công cụ hào nhoáng mà bỏ qua nền tảng:</strong><br/>\n              <em>Thực tế:</em> Công nghệ AI, Spark, Kafka hay LLM có thể đến rồi đi, nhưng nền tảng Đại số quan hệ (Relational Algebra), Cấu trúc dữ liệu B-Tree, Chuẩn hóa cơ sở dữ liệu và Kỹ luật viết SQL sạch sẽ là hành trang bền vững suốt 20 năm sự nghiệp của bạn.\n            </li>\n          </ol>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-42-comparison",
          "title": "Bảng So Sánh Đa Chiều: Ba Vai Trò Trọng Yếu Trong Đội Ngũ Dữ Liệu Hiện Đại",
          "content": "\n        <p>Bảng định vị giúp bạn xác định rõ mục tiêu nghề nghiệp phù hợp với đam mê:</p>\n        <div style=\"overflow-x: auto; margin: 16px 0;\">\n          <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n            <thead>\n              <tr style=\"background: var(--bg-surface-elevated, #1e293b); text-align: left;\">\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Tiêu Chí</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Data Analyst (DA)</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Analytics Engineer (AE)</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Data Engineer (DE)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Nhiệm vụ cốt lõi</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Khai phá insight, xây dựng Dashboard báo cáo</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Làm sạch, mô hình hóa dữ liệu (Marts/Facts/Dims), viết dbt</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Xây dựng hạ tầng nạp dữ liệu (Ingestion), hạ tầng phân tán</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Bộ công cụ chính</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">SQL, PowerBI, Tableau, Excel, Python EDA</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Advanced SQL, dbt Core, DuckDB, Snowflake, Git</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Python, Scala, Apache Spark, Airflow, Kafka, Docker</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Mức độ am hiểu SQL</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Khá (JOIN, GROUP BY, Window Funcs)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Bậc thầy (CTE, Jinja, Materialization, Refactoring)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Chuyên sâu hiệu năng (Partitioning, Query Plan, Storage)</td>\n              </tr>\n            </tbody>\n          </table>\n              </div>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-42-real-world",
          "title": "Ứng Dụng Thực Tế: Kế Hoạch 12 Tháng Xây Dựng Portfolio Data Đạt Chuẩn Quốc Tế",
          "content": "\n        <p>Để gây ấn tượng tuyệt đối với nhà tuyển dụng công nghệ cao, hãy xây dựng một dự án mã nguồn mở trên GitHub hội tụ đủ 5 yếu tố:</p>\n        <ol>\n          <li><strong>Dữ liệu thực tế:</strong> Không dùng Titanic hay Iris. Hãy cào dữ liệu thương mại điện tử hoặc thị trường tài chính với hàng triệu dòng.</li>\n          <li><strong>Mô hình hóa chuyên nghiệp:</strong> Phân chia thư mục dbt rõ ràng: <code>staging/</code>, <code>intermediate/</code>, <code>marts/</code>.</li>\n          <li><strong>Kiểm thử tự động:</strong> Có file <code>schema.yml</code> với các bài test <code>not_null</code>, <code>unique</code>, <code>relationships</code>.</li>\n          <li><strong>Kỷ luật mã nguồn:</strong> Có file cấu hình <code>.sqlfluff</code> và workflow GitHub Actions tự động kiểm tra code mỗi khi tạo PR.</li>\n          <li><strong>Tài liệu & Lineage:</strong> Xuất bản dbt docs trực quan trên GitHub Pages để người phỏng vấn có thể nhấp chuột khám phá đồ thị DAG dữ liệu.</li>\n        </ol>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          "Không bao giờ dùng alias của mệnh đề SELECT trong mệnh đề WHERE, vì WHERE luôn thực thi trước SELECT trong chu trình xử lý truy vấn.",
          "Đừng tự giới hạn bản thân chỉ ở mức viết truy vấn đơn giản; hãy làm chủ quy trình dbt và tư duy DataOps để nhân đôi giá trị nghề nghiệp."
        ],
        "tips": [
          "Lưu trang Cheat Sheet này vào Bookmark trình duyệt để tra cứu nhanh thứ tự thực thi và các mẫu cú pháp Window Functions khi làm việc thực tế.",
          "Khi chuẩn bị phỏng vấn, hãy tập giải thích các thuật ngữ cốt lõi (Idempotency, MVCC, B-Tree, SCD) bằng cả tiếng Anh và tiếng Việt một cách gãy gọn."
        ],
        "deepDive": {
          "title": "Tương lai của SQL trong kỷ nguyên Trí Tuệ Nhân Tạo: Text-to-SQL, DuckDB WASM & pgvector",
          "content": "<p>Mặc dù có nhiều ngôn ngữ mới ra đời, <strong>SQL vẫn là ngôn ngữ bất tử</strong> và đang trải qua cuộc phục hưng mạnh mẽ nhất trong lịch sử nhờ 3 làn sóng:</p><p><strong>1. Text-to-SQL &amp; AI Agents:</strong> Các mô hình ngôn ngữ lớn (LLMs) tạo mã SQL chính xác hơn bất kỳ ngôn ngữ lập trình nào khác vì SQL có ngữ nghĩa khai báo (Declarative) rõ ràng và cấu trúc bảng chặt chẽ.<br><strong>2. In-Browser Analytics (DuckDB WASM):</strong> Chạy toàn bộ kho dữ liệu phân tích trực tiếp ngay bên trong trình duyệt người dùng bằng WebAssembly mà không cần máy chủ backend.<br><strong>3. Hybrid Search:</strong> Sự bùng nổ của <code>pgvector</code> biến CSDL quan hệ thành một trung tâm tìm kiếm đa mô thức, vừa lọc điều kiện kinh doanh SQL chuẩn xác vừa tìm kiếm tương đồng vector nhúng AI trong cùng một câu lệnh duy nhất.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài Tập Cơ Bản: Sắp Xếp Thứ Tự Thực Thi 7 Mệnh Đề SQL Cốt Lõi",
          "level": "Cơ bản",
          "problem": "Cho danh sách 7 mệnh đề SQL lộn xộn sau: [SELECT, WHERE, FROM, HAVING, ORDER BY, GROUP BY, LIMIT]. Hãy sắp xếp chúng theo đúng thứ tự thực thi vật lý từ trước đến sau của bộ máy cơ sở dữ liệu.",
          "hint": "Bắt đầu từ nguồn bảng (FROM), qua bộ lọc dòng (WHERE), gom nhóm (GROUP BY)... và kết thúc bằng việc cắt dòng (LIMIT).",
          "solutionCode": "-- Thứ tự thực thi chuẩn xác của CSDL:\n-- 1. FROM\n-- 2. WHERE\n-- 3. GROUP BY\n-- 4. HAVING\n-- 5. SELECT\n-- 6. ORDER BY\n-- 7. LIMIT",
          "solutionOutput": "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT",
          "explanation": "Hiểu rõ thứ tự này giúp bạn giải thích tại sao WHERE không nhận alias của SELECT và tại sao HAVING có thể sử dụng các hàm tổng hợp."
        },
        {
          "title": "Bài Tập Trung Bình: Viết Lại Truy Vấn Tránh Lỗi Sử Dụng Alias Trong WHERE",
          "level": "Trung bình",
          "problem": "Cho câu truy vấn bị lỗi: `SELECT product_id, price * 1.1 AS price_with_tax FROM products WHERE price_with_tax > 500000;`. Hãy viết lại câu truy vấn bằng 2 cách khác nhau: Cách 1 dùng lặp biểu thức trong WHERE, Cách 2 dùng CTE.",
          "hint": "Cách 1: Lặp lại biểu thức price * 1.1 trong WHERE. Cách 2: Tạo CTE calculate_tax rồi lọc ở câu truy vấn ngoài.",
          "solutionCode": "-- Cách 1: Lặp lại biểu thức trong WHERE\nSELECT \n    product_id, \n    price * 1.1 AS price_with_tax\nFROM products\nWHERE (price * 1.1) > 500000;\n\n-- Cách 2: Module hóa bằng CTE (Khuyến nghị cho biểu thức phức tạp)\nWITH taxed_products AS (\n    SELECT \n        product_id, \n        price * 1.1 AS price_with_tax\n    FROM products\n)\nSELECT * \nFROM taxed_products\nWHERE price_with_tax > 500000;",
          "solutionOutput": "Cả 2 cách đều thực thi hoàn hảo, Cách 2 dễ bảo trì và sạch sẽ hơn khi biểu thức dài.",
          "explanation": "Vì WHERE chạy trước SELECT nên không thể dùng price_with_tax trực tiếp; CTE tạo ra một bảng ảo trung gian có sẵn cột price_with_tax cho tầng tiếp theo lọc."
        },
        {
          "title": "Bài Tập Khá: Viết Truy Vấn Kết Hợp Window Function Và Bộ Lọc HAVING",
          "level": "Khá",
          "problem": "Viết câu truy vấn thống kê danh mục sản phẩm (`category`): Lấy ra các danh mục có tổng doanh thu từ 50.000.000 VNĐ trở lên, đồng thời tính xếp hạng (RANK) của các danh mục này theo doanh thu và tỷ lệ phần trăm đóng góp của từng danh mục trên tổng doanh thu của toàn bộ các danh mục đạt chuẩn.",
          "hint": "Dùng CTE để GROUP BY category và lọc HAVING SUM(subtotal) >= 50000000. Ở tầng ngoài, dùng SUM() OVER () để lấy tổng doanh thu chung rồi chia tỷ lệ.",
          "solutionCode": "-- Phân tích xếp hạng danh mục doanh số cao:\nWITH qualified_categories AS (\n    SELECT \n        p.category,\n        SUM(oi.subtotal) AS category_revenue,\n        COUNT(DISTINCT o.order_id) AS total_orders\n    FROM products p\n    JOIN order_items oi ON p.product_id = oi.product_id\n    JOIN orders o ON oi.order_id = o.order_id\n    WHERE o.status = 'completed'\n    GROUP BY p.category\n    HAVING SUM(oi.subtotal) >= 50000000\n)\nSELECT \n    category,\n    category_revenue,\n    total_orders,\n    RANK() OVER (ORDER BY category_revenue DESC) AS rev_rank,\n    ROUND(\n        category_revenue * 100.0 / SUM(category_revenue) OVER (), \n        2\n    ) AS revenue_contribution_pct\nFROM qualified_categories\nORDER BY rev_rank ASC;",
          "solutionOutput": "Bảng xếp hạng các danh mục chủ lực kèm tỷ lệ đóng góp chuẩn xác 100%.",
          "explanation": "Sử dụng hàm cửa sổ SUM(category_revenue) OVER () không có PARTITION BY cho phép tính tổng gộp của toàn bộ tập hợp đã lọc mà không cần thêm một câu Subquery riêng."
        },
        {
          "title": "Bài Tập Nâng Cao: Thiết Kế Mô Hình Báo Cáo Star Schema Chuẩn Analytics Engineering",
          "level": "Nâng cao",
          "problem": "Viết câu lệnh SQL DDL và INSERT INTO để tạo bảng Fact tổng hợp doanh thu theo ngày và chi nhánh (`fct_daily_branch_sales`) phục vụ làm nguồn cho Dashboard BI. Yêu cầu bảng có cấu trúc Star Schema tinh gọn, bao gồm các Surrogate Keys, số đo tài chính (Additive Facts), và chỉ số đơn hàng.",
          "hint": "Bao gồm các cột: date_key (YYYYMMDD), branch_id, total_gross_revenue, total_net_revenue, total_order_count, avg_order_value.",
          "solutionCode": "-- Tạo bảng Fact Star Schema chuẩn phục vụ Dashboard:\nCREATE TABLE IF NOT EXISTS marts.fct_daily_branch_sales (\n    date_key INT NOT NULL,                  -- Surrogate Key ngày (ví dụ: 20260101)\n    branch_id INT NOT NULL,                 -- Dimension Key\n    total_gross_revenue NUMERIC(15, 2),     -- Doanh thu gộp\n    total_net_revenue NUMERIC(15, 2),       -- Doanh thu thuần (sau chiết khấu)\n    total_orders INT,                       -- Số lượng đơn\n    avg_order_value NUMERIC(15, 2),         -- Giá trị đơn trung bình\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    PRIMARY KEY (date_key, branch_id)\n);\n\n-- Nạp dữ liệu biến đổi Idempotent vào bảng Fact:\nINSERT INTO marts.fct_daily_branch_sales (\n    date_key, branch_id, total_gross_revenue, \n    total_net_revenue, total_orders, avg_order_value\n)\nSELECT \n    CAST(TO_CHAR(o.order_date, 'YYYYMMDD') AS INT) AS date_key,\n    o.branch_id,\n    SUM(o.total_amount) AS total_gross_revenue,\n    SUM(o.total_amount - COALESCE(o.discount_amount, 0)) AS total_net_revenue,\n    COUNT(DISTINCT o.order_id) AS total_orders,\n    ROUND(AVG(o.total_amount), 2) AS avg_order_value\nFROM orders o\nWHERE o.status = 'completed'\nGROUP BY \n    CAST(TO_CHAR(o.order_date, 'YYYYMMDD') AS INT),\n    o.branch_id\nON CONFLICT (date_key, branch_id) DO UPDATE \nSET \n    total_gross_revenue = EXCLUDED.total_gross_revenue,\n    total_net_revenue = EXCLUDED.total_net_revenue,\n    total_orders = EXCLUDED.total_orders,\n    avg_order_value = EXCLUDED.avg_order_value,\n    created_at = CURRENT_TIMESTAMP;",
          "solutionOutput": "Bảng Fact chuẩn Star Schema được tạo lập và nạp dữ liệu Idempotent với ON CONFLICT DO UPDATE.",
          "explanation": "Cấu trúc Fact Table với khóa chính phức hợp (date_key, branch_id) kết hợp ON CONFLICT DO UPDATE đảm bảo đường ống dữ liệu luôn an toàn, hỗ trợ Dashboard truy vấn tốc độ mili-giây."
        }
      ],
      "quiz": [
        {
          "question": "Trong quy trình thực thi truy vấn của CSDL (Logical Query Processing), mệnh đề nào được thực thi ĐẦU TIÊN?",
          "options": [
            "SELECT",
            "WHERE",
            "FROM (bao gồm cả JOIN và ON)",
            "ORDER BY"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! FROM là mệnh đề chạy đầu tiên để xác định và nạp các tập dữ liệu nguồn."
        },
        {
          "question": "Vì sao không thể sử dụng alias được đặt trong mệnh đề SELECT (ví dụ: SELECT price * 2 AS double_price) bên trong mệnh đề WHERE?",
          "options": [
            "Vì WHERE chỉ chấp nhận số nguyên.",
            "Vì mệnh đề WHERE được thực thi ở Bước 4, trước khi mệnh đề SELECT được thực thi ở Bước 8, nên tại thời điểm lọc dòng thì alias chưa tồn tại.",
            "Vì alias bị cấm trong chuẩn ANSI SQL.",
            "Vì CSDL không hỗ trợ phép nhân."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Thứ tự thực thi vật lý giải thích rõ ràng tại sao WHERE không thể nhìn thấy alias của SELECT."
        },
        {
          "question": "Thuật ngữ 'Idempotency' trong kỹ nghệ đường ống dữ liệu (Data Pipeline) có ý nghĩa là gì?",
          "options": [
            "Đường ống chỉ có thể chạy đúng 1 lần duy nhất trong đời.",
            "Việc thực thi đường ống nhiều lần với cùng dữ liệu đầu vào luôn sinh ra cùng một trạng thái kết quả nhất quán, không gây nhân đôi hay sai lệch dữ liệu.",
            "Đường ống tự động tăng tốc độ xử lý gấp đôi.",
            "Đường ống được viết hoàn toàn bằng ngôn ngữ C++."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Tính khả lặp (Idempotency) là nguyên lý sống còn của Data Engineering để đảm bảo việc chạy lại khi có lỗi không làm hỏng dữ liệu."
        },
        {
          "question": "Vai trò trọng tâm của một 'Analytics Engineer' trong Modern Data Stack là gì?",
          "options": [
            "Cài đặt hệ điều hành Linux cho máy chủ công ty.",
            "Cầu nối giữa Data Engineer và Data Analyst: Chuyên trách làm sạch, mô hình hóa dữ liệu dạng Star Schema, quản lý dbt models và kiểm thử chất lượng dữ liệu.",
            "Vẽ hình minh họa đồ họa cho website bán hàng.",
            "Sửa chữa phần cứng máy in và mạng Wi-Fi văn phòng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Analytics Engineer đưa tư duy kỹ nghệ phần mềm vào việc mô hình hóa dữ liệu (dbt, Data Testing, Git, Star Schema)."
        },
        {
          "question": "Kỹ thuật 'Partition Pruning' giúp tăng tốc độ truy vấn trên kho dữ liệu lớn bằng cách nào?",
          "options": [
            "Tự động nén toàn bộ dữ liệu thành file ZIP.",
            "Dựa vào điều kiện lọc thời gian trong WHERE để loại bỏ hoàn toàn các file hoặc thư mục phân vùng không liên quan, không cần quét toàn bộ bảng.",
            "Xóa vĩnh viễn các dòng dữ liệu cũ hơn 1 năm.",
            "Tăng dung lượng thanh RAM của máy chủ ảo."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Cắt tỉa phân vùng (Partition Pruning) giúp CSDL chỉ đọc đúng những file dữ liệu cần thiết, tiết kiệm hàng chục gigabyte I/O."
        }
      ],
      "summary": [
        "Thứ tự thực thi 11 mệnh đề: FROM -> ON -> JOIN -> WHERE -> GROUP BY -> HAVING -> WINDOW -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.",
        "Bản chất lỗi alias trong WHERE: Do WHERE chạy ở Bước 4 trong khi SELECT chạy ở Bước 8; sửa bằng HAVING hoặc CTE.",
        "Bảng từ điển thuật ngữ cốt lõi: Nắm vững Idempotency, Data Lineage, SCD Type 2, Fan-out và Columnar Storage.",
        "Định vị 3 vai trò Dữ liệu: Data Analyst (Insight), Analytics Engineer (Mô hình hóa & dbt), Data Engineer (Hạ tầng nạp & phân tán).",
        "Lộ trình xây dựng Portfolio: Tạo dự án dbt + DuckDB + GitHub Actions hoàn chỉnh với dữ liệu thực tế để chinh phục nhà tuyển dụng.",
        "Ôn cách quãng: Tại sao việc hiểu rõ cơ chế Index Scan vs Seq Scan (Bài 6.2) lại là vũ khí quyết định giúp bạn vượt qua vòng phỏng vấn kỹ thuật SQL?"
      ]
    },
    {
      "id": "sql-43-dq-test-suite-ci",
      "number": "8.4",
      "title": "[DQ] Bộ Kiểm Thử Chất Lượng Tự Động & Tích Hợp CI/CD",
      "subtitle": "Tự động hóa kiểm định chất lượng dữ liệu: So sánh dbt test vs Great Expectations vs Soda Core, Xây dựng bộ test suite SQL và Chạy trên GitHub Actions CI",
      "level": "Tổng hợp",
      "duration": "55 phút",
      "keywords": [
        "Data Quality",
        "dbt test",
        "Great Expectations",
        "Soda Core",
        "CI/CD",
        "GitHub Actions",
        "Data Testing",
        "Assertions",
        "Automated QA",
        "DataOps"
      ],
      "prerequisites": "Data Contracts (Bài 4.4), dbt Core (Bài 7.5), SQLFluff CI (Bài 7.7).",
      "verifiedEngines": "dbt Core 1.8+, Great Expectations 0.18+, Soda Core 3.0+, PostgreSQL 16.2, DuckDB 1.1+ (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "So sánh và lựa chọn chính xác giữa 3 công cụ kiểm thử dữ liệu hàng đầu thế giới: dbt test, Great Expectations và Soda Core theo quy mô hệ thống.",
        "Thiết kế bộ kiểm thử toàn diện bao phủ 4 chiều kích chất lượng dữ liệu: Tính đầy đủ (Completeness), Tính duy nhất (Uniqueness), Tính hợp lệ (Validity) và Tính nhất quán (Consistency).",
        "Tự phát triển các bài kiểm thử tùy chỉnh (Custom SQL Tests / Singular Tests) để phát hiện các vi phạm quy tắc nghiệp vụ phức tạp.",
        "Tích hợp quy trình kiểm thử tự động vào luồng CI/CD của GitHub Actions để ngăn chặn triệt để mã biến đổi dữ liệu lỗi sáp nhập vào nhánh main.",
        "Cấu hình phân cấp mức độ nghiêm trọng (Severity: warn vs error) và thiết lập cơ chế gửi cảnh báo tự động qua Slack Webhook."
      ],
      "intuition": {
        "title": "Hàng Rào Kiểm Nghiệm Vệ Sinh An Toàn Thực Phẩm Nhà Máy Nước Sạch",
        "metaphor": "Dữ liệu trong một doanh nghiệp giống như dòng nước sạch cung cấp cho toàn bộ cư dân thành phố (các báo cáo kinh doanh, mô hình AI, quyết định đầu tư). Nếu một nhà máy cấp nước không có hệ thống kiểm nghiệm tự động: Nước bị nhiễm chì, vi khuẩn độc hại hay bùn bẩn (dữ liệu NULL, duplicate, số tiền âm) sẽ chảy thẳng vào vòi nước của người dân mà không ai hay biết! dbt test và các bộ kiểm thử tự động chính là hệ thống cảm biến quang học đặt tại mọi chặng đường ống: Mỗi khi có một giọt nước không đạt chuẩn vệ sinh, van đóng khẩn cấp tự động sập xuống, còi báo động rú lên, và toàn bộ dòng nước ô nhiễm bị cách ly lập tức!",
        "boundary": "Bộ kiểm thử chất lượng dữ liệu (Data Testing) kiểm tra giá trị của **Dữ liệu thực tế đang chảy trong kho** (Data Values & Invariants), hoàn toàn khác với Unit test phần mềm thông thường chỉ kiểm tra logic code với dữ liệu giả lập (mock data).",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:150px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">1. SCHEMA ASSERTION</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">unique, not_null</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Bảo đảm không rỗng / trùng</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:160px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">2. BUSINESS RULES</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">amount &gt; 0, date &le; now</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Quy tắc nghiệp vụ cốt lõi</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:160px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--success);font-weight:700;\">3. CI/CD GATEWAY</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">COUNT(*) = 0 EXPECTED</div>\n                <div style=\"font-size:0.7rem;\">Lỗi &rarr; Chặn PR; Đạt &rarr; Deploy</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Nguyên lý Zero-Rows:</span>\n              <span>Mọi câu lệnh kiểm thử chất lượng dữ liệu đều được thiết kế để trả về các dòng vi phạm. Nếu câu lệnh trả về <strong>0 dòng</strong>, test PASS; nếu có dòng xuất hiện, test FAIL và xuất ngay mã vi phạm ra báo cáo.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-43-problem-hook",
          "title": "Gợi Mở Vấn Đề: Cơn Ác Mộng Phát Hiện Dữ Liệu Bẩn Sau Khi Khách Hàng Đã Đọc Báo Cáo",
          "content": "\n        <p>Tình huống tồi tệ nhất đối với bất kỳ đội ngũ kỹ nghệ dữ liệu nào:</p>\n        <div style=\"background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 16px; border-radius: 8px; margin: 16px 0;\">\n          <p><em>\"Lúc 09:15 sáng, Tổng Giám Đốc mở cuộc họp cổ đông và chỉ vào màn hình Dashboard: 'Tại sao doanh thu của đơn hàng #99881 lại là âm 250 tỷ đồng? Tại sao có 1.500 khách hàng mang customer_id bị NULL? Ai chịu trách nhiệm cho mớ dữ liệu rác rưởi này?'\"</em></p>\n        </div>\n        <p>Nguyên nhân? Một kỹ sư vừa sửa câu lệnh SQL ngày hôm qua và sáp nhập thẳng vào Production mà không có bất kỳ dòng kiểm tra tự động nào (No Automated Testing). Cơ sở dữ liệu vẫn chạy, không có lỗi cú pháp, nhưng kết quả đã bị ô nhiễm nặng nề!</p>\n        <p>Làm thế nào để đảm bảo 100% dữ liệu trước khi xuất bản ra Dashboard đều phải vượt qua bài kiểm tra nghiêm ngặt của <strong>Hệ Thống Kiểm Định Tự Động (Data Quality Gate)</strong>?</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-43-mental-model",
          "title": "Mô Hình Tâm Trí: 4 Trụ Cột Đánh Giá Chất Lượng Dữ Liệu Toàn Diện",
          "content": "\n        <p>Mọi bộ kiểm thử dữ liệu chuyên nghiệp đều được xây dựng dựa trên 4 trụ cột bất biến:</p>\n        <div style=\"background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid var(--accent, #3b82f6); margin: 16px 0;\">\n          <ul>\n            <li><strong>1. Completeness (Tính đầy đủ):</strong> Không được có giá trị NULL ở các cột khóa chính, ngày giao dịch hoặc các trường bắt buộc (<code>not_null</code>).</li>\n            <li><strong>2. Uniqueness (Tính duy nhất):</strong> Mỗi thực thể chỉ được xuất hiện đúng một lần ở mức độ mịn đã khai báo; khóa chính tuyệt đối không bị trùng lặp (<code>unique</code>).</li>\n            <li><strong>3. Validity (Tính hợp lệ):</strong> Giá trị dữ liệu phải nằm trong khoảng cho phép: Số tiền phải &ge; 0, trạng thái đơn hàng phải thuộc tập <code>['pending', 'completed', 'cancelled']</code>, email phải đúng định dạng Regex.</li>\n            <li><strong>4. Consistency (Tính nhất quán / Toàn vẹn tham chiếu):</strong> Mọi <code>customer_id</code> xuất hiện trong bảng <code>orders</code> đều bắt buộc phải tồn tại trong bảng <code>customers</code> (<code>relationships / foreign key integrity</code>).</li>\n          </ul>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-43-core-syntax",
          "title": "Khai Báo Bộ Kiểm Thử Chuẩn Mực Bằng dbt Schema Testing (schema.yml)",
          "content": "\n        <p>Trong dbt Core, bạn khai báo các ràng buộc chất lượng trực tiếp ngay cạnh mô hình dữ liệu trong file <code>schema.yml</code>:</p>\n      ",
          "codeExamples": [
            {
              "code": "# File: models/marts/schema.yml\nversion: 2\n\nmodels:\n  - name: fct_orders\n    description: \"Bảng Fact đơn hàng tổng hợp phục vụ báo cáo tài chính\"\n    columns:\n      - name: order_id\n        description: \"Khóa chính duy nhất của mỗi đơn hàng\"\n        tests:\n          - unique\n          - not_null\n\n      - name: customer_id\n        description: \"Khóa ngoại liên kết bảng khách hàng\"\n        tests:\n          - not_null\n          - relationships:\n              to: ref('dim_customers')\n              field: customer_id\n\n      - name: status\n        description: \"Trạng thái xử lý của đơn hàng\"\n        tests:\n          - accepted_values:\n              values: ['pending', 'processing', 'completed', 'cancelled', 'refunded']\n\n      - name: total_amount\n        description: \"Tổng tiền đơn hàng sau thuế\"\n        tests:\n          - not_null\n          # Kiểm tra tùy biến bằng macro generic:\n          - dbt_expectations.expect_column_values_to_be_between:\n              min_value: 0\n              max_value: 500000000",
              "explanation": "Chỉ với vài dòng YAML khai báo, khi chạy lệnh `dbt test`, dbt sẽ tự động biên dịch và thực thi 6 câu lệnh SQL kiểm tra trên kho dữ liệu.",
              "output": "Tự động biên dịch ra các câu lệnh SELECT COUNT(*) kiểm tra vi phạm."
            }
          ]
        },
        {
          "id": "sec-43-worked-example",
          "title": "Ví Dụ Mẫu Thực Chiến TechMart: Xây Dựng Singular Custom Test Bằng SQL Thuần Túy",
          "content": "\n        <p><strong>Yêu cầu nghiệp vụ:</strong> Đối với mọi đơn hàng có trạng thái là <code>completed</code>, tổng tiền <code>total_amount</code> phải bằng tổng thành tiền của các mặt hàng trong <code>order_items</code> cộng với phí vận chuyển (cho phép sai số làm tròn tối đa 1 đồng). Nếu có bất kỳ dòng nào vi phạm, bài kiểm tra phải thất bại!</p>\n      ",
          "codeExamples": [
            {
              "code": "-- File: tests/assert_order_total_matches_items_sum.sql\n-- Quy tắc vàng của dbt Singular Test:\n-- Câu lệnh SQL này tìm các dòng \"VI PHẠM\".\n-- Nếu câu lệnh trả về 0 dòng -> TEST PASS (Đạt chuẩn).\n-- Nếu câu lệnh trả về > 0 dòng -> TEST FAIL (Có lỗi chất lượng dữ liệu!).\n\nWITH calculated_items_total AS (\n    SELECT \n        order_id,\n        SUM(subtotal) AS items_total\n    FROM {{ ref('stg_order_items') }}\n    GROUP BY order_id\n)\nSELECT \n    o.order_id,\n    o.total_amount,\n    COALESCE(c.items_total, 0) AS items_total,\n    o.shipping_fee,\n    ABS(o.total_amount - (COALESCE(c.items_total, 0) + COALESCE(o.shipping_fee, 0))) AS discrepancy\nFROM {{ ref('fct_orders') }} o\nLEFT JOIN calculated_items_total c ON o.order_id = c.order_id\nWHERE o.status = 'completed'\n  -- Điều kiện vi phạm: Số tiền tổng lệch quá 1 đồng so với chi tiết\n  AND ABS(o.total_amount - (COALESCE(c.items_total, 0) + COALESCE(o.shipping_fee, 0))) > 1.0;",
              "explanation": "Mỗi file SQL trong thư mục tests/ của dbt là một bài kiểm thử nghiệp vụ độc lập. Khi lệnh dbt test được gọi, dbt sẽ chạy câu truy vấn này. Nếu tìm thấy dòng vi phạm, nó sẽ in ra mã lỗi và ngắt pipeline ngay lập tức.",
              "output": "Passed: 0 rows returned (Không có bất kỳ đơn hàng nào bị lệch tiền)."
            }
          ]
        },
        {
          "id": "sec-43-predict-faded",
          "title": "Thử Thách Dự Đoán & Bài Tập Điền Khuyết Faded Example: Cấu Hình Kiểm Thử Bằng Soda Core",
          "content": "\n        <p>Quan sát đoạn cấu hình kiểm thử dữ liệu bằng <strong>Soda Core</strong> (file <code>checks.yml</code>). Hãy hoàn thành các vị trí còn khuyết <code>___[1]___</code> và <code>___[2]___</code> để kiểm tra: Tỷ lệ giá trị rỗng của cột email phải dưới 1% và không được có dòng nào có giá trị âm ở cột giá tiền.</p>\n        <pre><code class=\"language-yaml\">checks for dim_customers:\n  - row_count > 0\n  - missing_percent(email) ___[1]___:\n      name: Email rỗng không được vượt quá 1%\n\nchecks for dim_products:\n  - min(price) ___[2]___:\n      name: Giá sản phẩm không được là số âm</code></pre>\n        <div class=\"predict-details\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 14px; border-radius: 6px; margin: 12px 0;\">\n          <details>\n            <summary style=\"font-weight: 600; cursor: pointer; color: var(--accent, #3b82f6);\">Xem Đáp Án Điền Khuyết & Phân Tích Kỹ Thuật</summary>\n            <p style=\"margin-top: 8px;\"><strong>Đáp án điền khuyết:</strong></p>\n            <ul>\n              <li><code>___[1]___</code>: <code>< 1%</code> (hoặc <code><= 1%</code>)</li>\n              <li><code>___[2]___</code>: <code>>= 0</code></li>\n            </ul>\n            <p><strong>Cơ chế của Soda Core:</strong> Soda Core là thư viện Python phân tích chất lượng dữ liệu độc lập. Nó quét trực tiếp trên DuckDB, Snowflake hay PostgreSQL, tự động đo lường các chỉ số thống kê (row_count, missing_percent, min, max) và so sánh với ngưỡng bạn đặt ra.</p>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-43-ci-integration",
          "title": "Tích Hợp Kiểm Thử Chất Lượng Tự Động Vào GitHub Actions CI Pipeline",
          "content": "\n        <p>Làm thế nào để biến việc kiểm thử thành <strong>Hàng Rào Bảo Vệ Bắt Buộc (Mandatory Quality Gate)</strong>?</p>\n        <p>Hãy thiết lập luồng GitHub Actions chạy kiểm thử trên cơ sở dữ liệu DuckDB thử nghiệm mỗi khi có ai mở Pull Request:</p>\n        <pre><code class=\"language-yaml\"># File: .github/workflows/data_quality_ci.yml\nname: Data Quality CI Gate\n\non:\n  pull_request:\n    branches: [ main ]\n\njobs:\n  test-data-pipeline:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Kéo mã nguồn\n        uses: actions/checkout@v4\n\n      - name: Cài đặt Python & dbt\n        uses: actions/setup-python@v5\n        with:\n          python-version: '3.11'\n\n      - name: Cài đặt thư viện kiểm thử\n        run: pip install dbt-duckdb sqlfluff\n\n      - name: 1. Kiểm tra định dạng mã SQL\n        run: sqlfluff lint models/ --dialect duckdb\n\n      - name: 2. Chạy biên dịch và nạp dữ liệu thử nghiệm\n        run: dbt run --target ci\n\n      - name: 3. Kích hoạt bộ kiểm định chất lượng dbt test\n        run: dbt test --target ci</code></pre>\n        <p>Nếu bất kỳ câu test nào phát hiện dữ liệu bẩn (như khóa chính bị trùng, số tiền âm, khách hàng mồ côi), GitHub sẽ lập tức chặn đứng nút Merge! Không một dòng code rác nào có cơ hội lọt vào môi trường Production.</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-43-pitfalls",
          "title": "Bẫy Thường Gặp & Sai Lầm Nghiêm Trọng Khi Thiết Kế Bộ Kiểm Thử Dữ Liệu",
          "content": "\n        <div style=\"background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); padding: 16px; border-radius: 8px; margin: 16px 0;\">\n          <h4 style=\"color: #ef4444; margin-top: 0;\">Top 3 Cạm Bẫy Trong Kiểm Thử Dữ Liệu:</h4>\n          <ol>\n            <li>\n              <strong>Chạy Full Test Trên Toàn Bộ Lịch Sử 10 Năm (CI Test Timeout):</strong><br/>\n              <em>Sai lầm:</em> Mỗi lần chạy CI lại quét toàn bộ 500 triệu dòng dữ liệu lịch sử để kiểm tra <code>unique</code>.<br/>\n              <em>Hậu quả:</em> CI chạy mất 2 tiếng đồng hồ, làm tê liệt toàn bộ tiến độ làm việc của đội ngũ. Giải pháp: Sử dụng bộ dữ liệu mẫu (Sample Test Dataset) trên DuckDB hoặc chỉ test trên phân vùng dữ liệu mới nhất (Test on New Partitions).\n            </li>\n            <li>\n              <strong>Lạm dụng mức độ nghiêm trọng ERROR cho các cảnh báo nhẹ:</strong><br/>\n              <em>Sai lầm:</em> Đặt mức <code>severity: error</code> cho trường <code>phone_number</code> khi người dùng không bắt buộc điền.<br/>\n              <em>Hậu quả:</em> Pipeline báo cáo tài chính bị ngắt đột ngột lúc 02:00 sáng chỉ vì một khách hàng không nhập số điện thoại! Hãy dùng <code>severity: warn</code> cho các trường không trọng yếu.\n            </li>\n            <li>\n              <strong>Không có cơ chế dọn dẹp dữ liệu rác sau khi test (No Teardown):</strong><br/>\n              <em>Sai lầm:</em> Tạo ra các bảng tạm <code>ci_test_schema</code> trong database production rồi bỏ quên, làm đầy ổ cứng sau vài tháng.\n            </li>\n          </ol>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-43-comparison",
          "title": "Bảng So Sánh Đa Chiều: Ba Công Cụ Kiểm Thử Dữ Liệu Hàng Đầu Thế Giới",
          "content": "\n        <p>Bảng phân tích giúp đội ngũ lựa chọn đúng công cụ kiểm định phù hợp với hạ tầng:</p>\n        <div style=\"overflow-x: auto; margin: 16px 0;\">\n          <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n            <thead>\n              <tr style=\"background: var(--bg-surface-elevated, #1e293b); text-align: left;\">\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Tiêu Chí</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">dbt Test (Core / Cloud)</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Great Expectations (GX)</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Soda Core</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Ngôn ngữ định nghĩa</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">YAML + Jinja SQL</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Python / JSON</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">YAML (SodaCL thuần túy)</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Vị trí tích hợp lý tưởng</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Bên trong quá trình biến đổi ELT (Trong Warehouse)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Trước khi nạp (Pre-ingestion) và Pipeline ML</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Kiểm tra độc lập đa nguồn (S3, Postgres, Snowflake)</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Độ dốc đường cong học tập</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Rất thấp (Cực kỳ trực quan cho người biết SQL)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Cao (Yêu cầu kiến thức lập trình Python tốt)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Thấp (Cú pháp SodaCL đọc như văn xuôi tiếng Anh)</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Tạo báo cáo Data Docs</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Tích hợp sẵn trong dbt docs</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Báo cáo HTML Data Docs cực kỳ chuyên nghiệp</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Gửi số liệu lên Soda Cloud Dashboard</td>\n              </tr>\n            </tbody>\n          </table>\n              </div>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-43-real-world",
          "title": "Ứng Dụng Thực Tế: Cơ Chế Báo Động Thông Minh (Smart Alerting) Qua Slack Webhook",
          "content": "\n        <p>Khi một bài test thất bại, đừng chỉ để nó nằm im trong file log trên máy chủ. Hãy thiết lập cơ chế tự động gửi thông báo trực tiếp đến kỹ sư trực ca:</p>\n        <pre><code class=\"language-python\"># Script Python: send_slack_alert.py\nimport requests\nimport json\nimport sys\n\ndef notify_slack(test_name, failure_count, model_name):\n    webhook_url = \"https://hooks.slack.com/services/T00/B00/XXXXX\"\n    payload = {\n        \"text\": f\":rotating_light: *CẢNH BÁO CHẤT LƯỢNG DỮ LIỆU TECHMART* :rotating_light:\\n\"\n                f\"- *Mô hình bị ảnh hưởng:* \\'{model_name}\\'\\n\"\n                f\"- *Bài kiểm thử thất bại:* \\'{test_name}\\'\\n\"\n                f\"- *Số dòng dữ liệu vi phạm:* \\'{failure_count}\\' dòng\\n\"\n                f\"- *Hành động:* Pipeline đã tự động ngắt để bảo vệ báo cáo tài chính.\"\n    }\n    requests.post(webhook_url, data=json.dumps(payload), headers={'Content-Type': 'application/json'})\n\nif __name__ == \"__main__\":\n    notify_slack(\"assert_order_total_matches_items_sum\", 12, \"fct_orders\")</code></pre>\n        <p>Thông tin cảnh báo kịp thời giúp đội ngũ phát hiện và xử lý sự cố trong vòng 15 phút, thay vì để dữ liệu sai lệch tồn tại suốt 3 tháng!</p>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          "Không bao giờ triển khai mô hình dữ liệu lên môi trường Production mà thiếu các bài test cơ bản: unique và not_null cho khóa chính.",
          "Cảnh giác với việc viết bài test kiểm tra quá chậm; hãy tận dụng partition filtering trong câu test để giảm thiểu thời gian quét bảng lớn."
        ],
        "tips": [
          "Tận dụng gói thư viện dbt-expectations để có sẵn hàng trăm bài kiểm thử nâng cao (kiểm tra phân phối dữ liệu, độ lệch chuẩn, độ dài chuỗi).",
          "Cấu hình cảnh báo Slack Webhook cho các lỗi severity: error để đội ngũ kỹ thuật có mặt xử lý ngay lập tức."
        ],
        "deepDive": {
          "title": "Thiết kế Assertion Framework trong SQL: Viết test theo nguyên lý 'Zero Rows Expected'",
          "content": "<p>Trong kiểm thử dữ liệu chuyên nghiệp, một truy vấn kiểm tra chất lượng (Data Quality Assertion) luôn được viết theo cấu trúc truy tìm kẻ vi phạm (Fault Finder):</p><pre class=\"code-pre\"><code>-- Test: Kiểm tra không có đơn hàng nào bị âm tiền\nSELECT order_id, total_amount, 'NEGATIVE_AMOUNT' AS failure_reason\nFROM clean_orders\nWHERE total_amount &lt;= 0;</code></pre><p>Quy ước này mang lại 2 lợi ích khổng lồ: (1) Nếu dữ liệu hoàn hảo, CSDL trả về <strong>0 dòng</strong> với chi phí CPU gần như bằng không; (2) Nếu test thất bại, kết quả trả về chính là danh sách đầy đủ các bản ghi phạm luật kèm thông tin ngữ cảnh, cho phép bot CI tự động đính kèm chi tiết lỗi vào thông báo Slack của kỹ sư mà không cần chạy lại câu lệnh debug phụ!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài Tập Cơ Bản: Khai Báo Ràng Buộc not_null Và accepted_values Trong dbt",
          "level": "Cơ bản",
          "problem": "Viết đoạn cấu hình YAML cho mô hình `dim_customers` trong dbt: Kiểm tra cột `customer_id` không được phép NULL và phải là duy nhất (unique); đồng thời kiểm tra cột `membership_tier` chỉ được phép nhận các giá trị: ['Standard', 'Silver', 'Gold', 'Platinum'].",
          "hint": "Dùng cú pháp models: - name: dim_customers, columns: - name: ... tests: [unique, not_null, accepted_values].",
          "solutionCode": "version: 2\n\nmodels:\n  - name: dim_customers\n    columns:\n      - name: customer_id\n        tests:\n          - unique\n          - not_null\n      - name: membership_tier\n        tests:\n          - accepted_values:\n              values: ['Standard', 'Silver', 'Gold', 'Platinum']",
          "solutionOutput": "File schema.yml hợp lệ sẵn sàng cho lệnh dbt test.",
          "explanation": "Đây là các bài kiểm tra chất lượng dữ liệu cơ bản nhưng có sức mạnh bảo vệ cao nhất, ngăn chặn các giá trị rác hoặc định dạng sai lệch thâm nhập vào bảng chiều khách hàng."
        },
        {
          "title": "Bài Tập Trung Bình: Viết Câu Lệnh SQL Singular Test Kiểm Tra Tính Hợp Lệ Của Ngày Tháng",
          "level": "Trung bình",
          "problem": "Viết một bài kiểm thử dbt Singular Test bằng SQL thuần túy (file `tests/assert_order_date_not_in_future.sql`): Tìm tất cả các dòng trong bảng `fct_orders` có ngày đặt hàng `order_date` lớn hơn ngày hiện tại (`CURRENT_DATE`) hoặc có ngày giao hàng `delivered_at` nhỏ hơn ngày đặt hàng `order_date`.",
          "hint": "Viết câu lệnh SELECT order_id, order_date, delivered_at FROM {{ ref('fct_orders') }} WHERE order_date > CURRENT_DATE OR delivered_at < order_date.",
          "solutionCode": "-- File: tests/assert_order_date_not_in_future.sql\n-- Tìm các dòng vi phạm logic thời gian vật lý:\nSELECT \n    order_id,\n    order_date,\n    delivered_at\nFROM {{ ref('fct_orders') }}\nWHERE order_date > CURRENT_DATE\n   OR (delivered_at IS NOT NULL AND delivered_at < order_date);",
          "solutionOutput": "Nếu trả về 0 dòng: TEST PASS. Nếu trả về > 0 dòng: TEST FAIL kèm chi tiết order_id vi phạm.",
          "explanation": "Trong thế giới thực, đơn hàng không thể phát sinh ở tương lai và không thể được giao trước thời điểm khách đặt hàng. Câu test này bắt trọn các lỗi sai lệch múi giờ hoặc bug từ ứng dụng bán hàng."
        },
        {
          "title": "Bài Tập Khá: Xây Dựng Generic Custom Test Kiểm Tra Cột Luôn Dương (is_positive)",
          "level": "Khá",
          "problem": "Viết một macro dbt Generic Test có tên `test_is_positive(model, column_name)` có thể tái sử dụng cho bất kỳ cột số nào trong dự án. Macro kiểm tra xem có bất kỳ dòng nào có giá trị cột đó nhỏ hơn hoặc bằng 0 hay không.",
          "hint": "Sử dụng cú pháp Jinja: {% test is_positive(model, column_name) %} SELECT {{ column_name }} FROM {{ model }} WHERE {{ column_name }} <= 0 {% endtest %}.",
          "solutionCode": "{# File: macros/test_is_positive.sql #}\n{% test is_positive(model, column_name) %}\n\nSELECT\n    {{ column_name }} AS non_positive_value,\n    COUNT(*) AS occurrence_count\nFROM {{ model }}\nWHERE {{ column_name }} <= 0\nGROUP BY {{ column_name }}\n\n{% endtest %}",
          "solutionOutput": "Generic test được định nghĩa thành công. Có thể dùng trong schema.yml như: tests: [is_positive].",
          "explanation": "Generic tests cho phép đóng gói logic kiểm thử lặp đi lặp lại thành một hàm tái sử dụng trên hàng trăm bảng khác nhau chỉ bằng một từ khóa trong file YAML."
        },
        {
          "title": "Bài Tập Nâng Cao: Thiết Lập Workflow GitHub Actions Kiểm Tra Tự Động Toàn Diện",
          "level": "Nâng cao",
          "problem": "Viết hoàn chỉnh file workflow GitHub Actions `.github/workflows/data_pipeline_ci.yml` kích hoạt khi có Pull Request thay đổi file trong thư mục `models/` hoặc `tests/`. Workflow thực hiện: Kiểm tra code bằng SQLFluff, chạy dbt build (vừa nạp vừa test) trên target `ci` dùng DuckDB, và nếu thất bại thì ghi log chi tiết.",
          "hint": "Sử dụng on: pull_request: paths:, các bước setup-python, pip install dbt-duckdb sqlfluff, và lệnh dbt build --select state:modified+.",
          "solutionCode": "name: Data Pipeline Continuous Integration\n\non:\n  pull_request:\n    paths:\n      - 'models/**'\n      - 'tests/**'\n      - 'dbt_project.yml'\n\njobs:\n  quality-gate:\n    name: Run SQLFluff and dbt Tests\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout Code\n        uses: actions/checkout@v4\n\n      - name: Set up Python 3.11\n        uses: actions/setup-python@v5\n        with:\n          python-version: '3.11'\n          cache: 'pip'\n\n      - name: Install Dependencies\n        run: |\n          pip install --upgrade pip\n          pip install dbt-duckdb sqlfluff\n\n      - name: Lint SQL Code\n        run: sqlfluff lint models/ --dialect duckdb\n\n      - name: Run dbt Build (Run Models + Run Tests)\n        run: dbt build --profiles-dir . --target ci\n\n      - name: Publish Test Report\n        if: failure()\n        run: echo \"::error::Data Quality Gate FAILED! Vui lòng kiểm tra lại log kiểm thử phía trên.\"",
          "solutionOutput": "Hệ thống CI tự động ngăn chặn mã lỗi sáp nhập vào kho lưu trữ chính.",
          "explanation": "Lệnh dbt build là bước tiến vượt bậc của dbt: Nó tự động nạp bảng và chạy ngay các bài test phụ thuộc; nếu model tầng trên fail test, nó sẽ lập tức dừng lại không chạy tiếp các model tầng dưới."
        }
      ],
      "quiz": [
        {
          "question": "Bốn trụ cột cơ bản của chất lượng dữ liệu (Data Quality Dimensions) bao gồm những yếu tố nào?",
          "options": [
            "Tốc độ, Màu sắc, Dung lượng, Độ dài.",
            "Completeness (Đầy đủ), Uniqueness (Duy nhất), Validity (Hợp lệ), và Consistency (Nhất quán).",
            "HTML, CSS, JavaScript, SQL.",
            "Đúng hạn, Giá rẻ, Hiện đại, Nhanh chóng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! 4 trụ cột Completeness, Uniqueness, Validity và Consistency tạo nên khung đánh giá toàn diện cho mọi tài sản dữ liệu."
        },
        {
          "question": "Trong dbt Core, một bài kiểm thử dạng 'Singular Test' được đánh giá là ĐẠT CHUẨN (PASS) khi nào?",
          "options": [
            "Khi câu truy vấn SQL trả về đúng 100 dòng.",
            "Khi câu truy vấn SQL trả về 0 dòng (không tìm thấy bất kỳ bản ghi nào vi phạm quy tắc).",
            "Khi câu lệnh SQL chạy mất hơn 10 phút.",
            "Khi cơ sở dữ liệu bị ngắt kết nối."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Tư duy của dbt test là: Câu truy vấn tìm các dòng VI PHẠM; do đó nếu kết quả trả về 0 dòng tức là hệ thống hoàn toàn trong sạch (PASS)."
        },
        {
          "question": "Điểm khác biệt cốt lõi giữa 'dbt test' và 'Great Expectations' là gì?",
          "options": [
            "dbt test chỉ chạy được trên điện thoại.",
            "dbt test tập trung kiểm thử dữ liệu bên trong Data Warehouse trong quá trình biến đổi ELT (bằng SQL); trong khi Great Expectations là framework Python toàn diện kiểm thử dữ liệu ở mọi chặng từ trước khi nạp đến các pipeline Machine Learning.",
            "Great Expectations không thể tạo báo cáo.",
            "Cả hai công cụ hoàn toàn giống hệt nhau."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! dbt test tối ưu hóa cho ELT trong kho dữ liệu, trong khi Great Expectations là giải pháp Python đa năng độc lập."
        },
        {
          "question": "Trong file cấu hình kiểm thử dbt, tùy chọn 'severity: warn' có ý nghĩa gì đối với tiến trình chạy pipeline?",
          "options": [
            "Lập tức xóa sạch bảng dữ liệu bị vi phạm.",
            "Nếu bài kiểm thử phát hiện lỗi, dbt sẽ in ra cảnh báo màu vàng nhưng VẪN TIẾP TỤC thực thi các bước tiếp theo của pipeline mà không ngắt hệ thống.",
            "Gửi tin nhắn SMS đến điện thoại của toàn bộ nhân viên công ty.",
            "Tự động sửa lỗi dữ liệu mà không cần báo cho ai."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Severity: warn giúp ghi nhận vấn đề mà không làm gián đoạn các đường ống báo cáo quan trọng đối với các lỗi không nghiêm trọng."
        },
        {
          "question": "Vì sao việc chạy kiểm thử chất lượng dữ liệu trong quy trình CI/CD của GitHub Actions lại được coi là 'Vũ khí tối thượng' của DataOps?",
          "options": [
            "Vì nó giúp máy chủ chạy mát hơn.",
            "Vì nó tự động phát hiện lỗi logic và dữ liệu bẩn ngay từ khâu Pull Request, chặn đứng mã lỗi trước khi nó kịp sáp nhập vào môi trường Production.",
            "Vì nó giúp nhân viên không phải viết mã SQL nữa.",
            "Vì nó thay thế hoàn toàn vai trò của giám đốc công nghệ."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Shift-left Testing trong DataOps đưa khâu kiểm thử về thời điểm sớm nhất có thể, bảo vệ tuyệt đối độ tin cậy của kho dữ liệu doanh nghiệp."
        }
      ],
      "summary": [
        "Bốn chiều kích chất lượng dữ liệu: Completeness (not_null), Uniqueness (unique), Validity (accepted_values/ranges), Consistency (relationships).",
        "Nguyên lý Singular Test trong dbt: Viết câu SQL tìm các dòng vi phạm; 0 dòng trả về = ĐẠT CHUẨN.",
        "Generic Custom Tests: Đóng gói logic kiểm tra tùy biến thành các macro Jinja có thể tái sử dụng cho hàng trăm cột trong toàn bộ dự án.",
        "Shift-left Testing trong CI/CD: Chạy dbt build và linter tự động trên GitHub Actions để chặn đứng mã lỗi ngay từ vòng Pull Request.",
        "Phân cấp nghiêm trọng (Severity Level): Dùng error cho các cột khóa chính/tiền bạc, dùng warn cho các trường thông tin phụ trợ.",
        "Ôn cách quãng: Tại sao việc áp dụng Data Contracts và Ràng Buộc Kiểm Tra (Bài 4.4) lại là tiền đề quan trọng giúp việc viết dbt test trở nên dễ dàng và chuẩn xác?"
      ]
    },
    {
      "id": "sql-44-scale-e2e-project",
      "number": "8.5",
      "title": "[SCALE][FE][DQ] Dự Án End-To-End: Xây Dựng Modern Data Warehouse Với DuckDB",
      "subtitle": "Dự án tổng kết đỉnh cao: Xây dựng kho dữ liệu hiện đại trọn gói từ Raw Parquet đến Star Schema Marts, kiểm thử tự động, Feature Store phục vụ ML và Dashboard phân tích",
      "level": "Tổng hợp",
      "duration": "90 phút",
      "keywords": [
        "Data Warehouse",
        "DuckDB",
        "Modern Data Stack",
        "Star Schema",
        "End-to-End Project",
        "Feature Store",
        "dbt",
        "Parquet",
        "Data Quality",
        "Analytics Engineering",
        "Portfolio"
      ],
      "prerequisites": "Toàn bộ các kiến thức từ Tầng 0 đến Tầng 8 (Tầng 0 đến 8.4).",
      "verifiedEngines": "DuckDB 1.1+ (2.0.0), PostgreSQL 16.2, SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Xây dựng kiến trúc kho dữ liệu hiện đại (Modern Lakehouse/Warehouse) theo chuẩn Medallion 3 tầng: Bronze (Raw) -> Silver (Conformed) -> Gold (Marts).",
        "Nạp và biến đổi trực tiếp tệp tin định dạng Parquet với DuckDB bằng kỹ thuật Columnar Vectorized Execution đạt tốc độ hàng triệu dòng/giây.",
        "Mô hình hóa dữ liệu Star Schema hoàn chỉnh bao gồm các bảng chiều Dimension (SCD Type 2) và bảng sự kiện Fact Table có độ mịn (granularity) chính xác.",
        "Thiết kế và hiện thực hóa bảng Feature Store Snapshot phục vụ trực tiếp cho các mô hình Học máy (Machine Learning Churn Prediction) không bị rò rỉ dữ liệu (Data Leakage).",
        "Tích hợp toàn diện bộ kiểm thử chất lượng dữ liệu (Data Quality Assertions) và tối ưu hóa phân vùng lưu trữ theo năm/tháng (Hive Partitioning)."
      ],
      "intuition": {
        "title": "Xây Dựng Tòa Nhà Chọc Trời Hiện Đại vs Túp Lều Dựng Tạm Bợ",
        "metaphor": "Nếu các bài học trước giống như việc bạn học cách đúc cột bê tông (INDEX B-Tree), lắp đường ống nước (SQL Join & Aggregate), đặt hệ thống điện an toàn (Transactions & ACID) và lắp chuông báo cháy (Data Testing)... thì dự án End-to-End này chính là ngày bạn đứng trên cương vị Tổng Công Trình Sư để xây dựng nên một Tòa Nhà Chọc Trời 81 Tầng hoàn chỉnh! Từng tầng dữ liệu (Raw Staging -> Clean Intermediate -> Business Marts) được liên kết ăn khớp với nhau, có hệ thống giám sát kiểm thử tự động ở mọi góc ngách, có sẵn các căn hộ Feature Store cao cấp cho các nhà khoa học dữ liệu AI vào sử dụng ngay lập tức, và đứng vững trước mọi cơn bão dữ liệu lớn hàng triệu bản ghi!",
        "boundary": "Dự án này sử dụng DuckDB làm Execution Engine vì khả năng chạy trực tiếp 100% trong môi trường trình duyệt và máy tính cá nhân mà không cần cài đặt cụm máy chủ phức tạp, nhưng toàn bộ kiến trúc và câu truy vấn tương thích 100% với Snowflake, BigQuery và Databricks.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:150px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">BRONZE / STAGING</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">raw_dirty_orders</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Dữ liệu thô bẩn ban đầu</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr; DQ &rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:160px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">SILVER / CLEANED</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">clean_orders + DLQ</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Khử trùng, chuẩn hóa, cách ly</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr; FE &rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:160px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--success);font-weight:700;\">GOLD / LAKEHOUSE</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">Parquet Feature Marts</div>\n                <div style=\"font-size:0.7rem;\">Vector AI &amp; BI sẵn sàng</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Tinh hoa hội tụ:</span>\n              <span>Dự án E2E hoàn chỉnh chứng minh năng lực kết hợp toàn diện giữa tư duy Mô hình quan hệ, Tối ưu hóa hiệu năng [SCALE], Rào chắn chất lượng [DQ] và Xây dựng đặc trưng [FE].</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-44-problem-hook",
          "title": "Gợi Mở Vấn Đề: Bài Kiểm Tra Năng Lực Tối Thượng Của Một Kỹ Sư Dữ Liệu Bậc Thầy",
          "content": "\n        <p>Chào mừng bạn đến với vạch đích của hành trình <strong>SQL Master & Data Engineering</strong>!</p>\n        <p>Trong các buổi phỏng vấn vị trí Senior Data Engineer hay Analytics Lead tại các tập đoàn công nghệ lớn, nhà tuyển dụng sẽ không bao giờ hỏi bạn những câu lý thuyết vụn vặt như <em>\"Cú pháp của LEFT JOIN là gì?\"</em>. Thay vào đó, họ sẽ trao cho bạn một thư mục chứa 10 triệu dòng log giao dịch thô dạng Parquet/JSON và đưa ra đề bài:</p>\n        <div style=\"background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid var(--accent, #3b82f6); margin: 16px 0;\">\n          <p><em>\"Trong vòng 60 phút, hãy thiết kế và xây dựng một kho dữ liệu trọn gói: Nạp dữ liệu thô, làm sạch, mô hình hóa Star Schema chuẩn phục vụ Dashboard Giám đốc, tạo bảng Feature Store phục vụ thuật toán AI dự đoán khách hàng rời bỏ, và viết kịch bản kiểm thử tự động đảm bảo không có bất kỳ dòng rác nào lọt qua.\"</em></p>\n        </div>\n        <p>Nếu bạn hoàn thành xuất sắc dự án này, bạn không chỉ chứng minh mình đã làm chủ 100% kiến thức của 8 tầng học, mà bạn đã chính thức nắm trong tay một <strong>Dự Án Portfolio Triệu Đô</strong> đủ sức thuyết phục bất kỳ hội đồng tuyển dụng khó tính nào trên thế giới!</p>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-44-mental-model",
          "title": "Mô Hình Tâm Trí: Kiến Trúc Medallion 3 Lớp Chuẩn Công Nghiệp (Bronze -> Silver -> Gold)",
          "content": "\n        <p>Kiến trúc kho dữ liệu hiện đại phân tách quy trình xử lý thành 3 lớp rõ rệt:</p>\n        <div style=\"background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid var(--accent, #3b82f6); margin: 16px 0;\">\n          <ul>\n            <li><strong>Lớp Bronze (Raw / Staging):</strong> Lưu trữ dữ liệu thô nguyên bản từ các tệp Parquet/CSV/JSON. Giữ nguyên 100% cấu trúc gốc, bổ sung thêm siêu dữ liệu (metadata: thời gian nạp <code>ingested_at</code>, tên file nguồn <code>source_file</code>).</li>\n            <li><strong>Lớp Silver (Conformed / Intermediate):</strong> Dữ liệu đã được làm sạch, chuẩn hóa kiểu dữ liệu (Cast types), loại bỏ dòng trùng lặp (Deduplication), xử lý giá trị rỗng (Handle NULLs), và giải mã cấu trúc JSON bán cấu trúc thành các cột phẳng.</li>\n            <li><strong>Lớp Gold (Marts / Business / Feature Store):</strong> Mô hình hóa theo chuẩn Star Schema phục vụ trực tiếp cho người dùng cuối: Bảng Fact (<code>fct_daily_orders</code>), Bảng Dimension (<code>dim_customers</code>, <code>dim_products</code>) và Bảng Feature Snapshot (<code>feat_customer_churn_features</code>) cho AI.</li>\n          </ul>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-44-core-syntax",
          "title": "Nền Tảng Công Nghệ: Sức Mạnh Xử Lý CSDL Cột Của DuckDB",
          "content": "\n        <p>DuckDB là công nghệ CSDL phân tích nhúng (Embedded OLAP) nhanh nhất hành tinh hiện nay:</p>\n        <ul>\n          <li><strong>Truy vấn trực tiếp Parquet:</strong> Đọc trực tiếp các file Parquet nén Snappy/ZSTD mà không cần nạp trước vào bảng: <code>SELECT * FROM read_parquet('data/*.parquet');</code>.</li>\n          <li><strong>Vectorized SIMD:</strong> Xử lý dữ liệu theo từng khối vector (2048 giá trị một lần) tận dụng tối đa tập lệnh AVX2/AVX-512 của CPU hiện đại.</li>\n          <li><strong>Zero-copy Export:</strong> Xuất kết quả phân tích ngược lại file Parquet có phân vùng Hive (Hive-partitioning) chỉ bằng một câu lệnh SQL duy nhất!</li>\n        </ul>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-44-worked-example",
          "title": "Toàn Văn Kịch Bản Thực Thi Dự Án TechMart Data Warehouse Trên DuckDB",
          "content": "\n        <p>Dưới đây là kịch bản SQL thực thi trọn vẹn từ đầu đến cuối của dự án. Bạn có thể sao chép và chạy trực tiếp trên DuckDB CLI hoặc qua Python:</p>\n      ",
          "codeExamples": [
            {
              "code": "-- ============================================================================\n-- DỰ ÁN TỔNG KẾT: MODERN DATA WAREHOUSE & FEATURE STORE VỚI DUCKDB\n-- ============================================================================\n\n-- BƯỚC 1: KHỞI TẠO CÁC SCHEMA THEO KIẾN TRÚC MEDALLION\nCREATE SCHEMA IF NOT EXISTS bronze;\nCREATE SCHEMA IF NOT EXISTS silver;\nCREATE SCHEMA IF NOT EXISTS gold;\n\n-- BƯỚC 2: TẦNG BRONZE - NẠP DỮ LIỆU NGUỒN VÀ BỔ SUNG AUDIT METADATA\nCREATE OR REPLACE TABLE bronze.raw_orders AS\nSELECT \n    order_id,\n    customer_id,\n    order_date,\n    total_amount,\n    status,\n    CURRENT_TIMESTAMP AS _ingested_at\nFROM orders;\n\nCREATE OR REPLACE TABLE bronze.raw_order_items AS\nSELECT \n    item_id,\n    order_id,\n    product_id,\n    quantity,\n    unit_price,\n    subtotal,\n    CURRENT_TIMESTAMP AS _ingested_at\nFROM order_items;\n\n-- BƯỚC 3: TẦNG SILVER - LÀM SẠCH, ÉP KIỂU VÀ DEDUPLICATION\nCREATE OR REPLACE TABLE silver.stg_orders AS\nWITH ranked_orders AS (\n    SELECT \n        order_id::INT AS order_id,\n        customer_id::INT AS customer_id,\n        order_date::TIMESTAMP AS order_timestamp,\n        order_date::DATE AS order_date,\n        COALESCE(total_amount, 0)::NUMERIC(15,2) AS total_amount,\n        LOWER(TRIM(status)) AS status,\n        _ingested_at,\n        ROW_NUMBER() OVER (\n            PARTITION BY order_id \n            ORDER BY _ingested_at DESC\n        ) AS dedup_rank\n    FROM bronze.raw_orders\n    WHERE order_id IS NOT NULL\n)\nSELECT \n    order_id,\n    customer_id,\n    order_timestamp,\n    order_date,\n    total_amount,\n    status,\n    _ingested_at\nFROM ranked_orders\nWHERE dedup_rank = 1;\n\n-- BƯỚC 4: TẦNG GOLD - STAR SCHEMA FACT & DIMENSIONS\n-- 4.1 Bảng Fact: fct_daily_orders\nCREATE OR REPLACE TABLE gold.fct_daily_orders AS\nSELECT \n    o.order_id,\n    o.customer_id,\n    o.order_date,\n    o.status,\n    COUNT(oi.item_id) AS total_distinct_items,\n    SUM(oi.quantity) AS total_quantity_ordered,\n    o.total_amount AS gross_revenue\nFROM silver.stg_orders o\nLEFT JOIN bronze.raw_order_items oi ON o.order_id = oi.order_id\nGROUP BY o.order_id, o.customer_id, o.order_date, o.status, o.total_amount;\n\n-- 4.2 Bảng Gold Feature Store: feat_customer_churn_features (Phục vụ AI Model)\nCREATE OR REPLACE TABLE gold.feat_customer_churn_features AS\nWITH customer_orders AS (\n    SELECT \n        customer_id,\n        COUNT(order_id) AS lifetime_orders,\n        SUM(gross_revenue) AS lifetime_value,\n        AVG(gross_revenue) AS avg_basket_size,\n        MAX(order_date) AS last_order_date,\n        MIN(order_date) AS first_order_date\n    FROM gold.fct_daily_orders\n    WHERE status = 'completed'\n    GROUP BY customer_id\n)\nSELECT \n    c.customer_id,\n    c.full_name,\n    c.city,\n    COALESCE(co.lifetime_orders, 0) AS lifetime_orders,\n    COALESCE(co.lifetime_value, 0) AS lifetime_value,\n    ROUND(COALESCE(co.avg_basket_size, 0), 2) AS avg_basket_size,\n    -- Recency: Số ngày kể từ lần mua cuối cùng tính đến mốc đánh giá\n    ('2026-03-01'::DATE - co.last_order_date::DATE) AS days_since_last_order,\n    -- Nhãn nhắm mục tiêu (Target Churn): Khách hàng không mua trong 60 ngày coi là Churn\n    CASE \n        WHEN ('2026-03-01'::DATE - co.last_order_date::DATE) > 60 THEN 1 \n        ELSE 0 \n    END AS is_churned\nFROM customers c\nLEFT JOIN customer_orders co ON c.customer_id = co.customer_id;\n\n-- BƯỚC 5: HÀNG RÀO KIỂM ĐỊNH CHẤT LƯỢNG DỮ LIỆU (DATA QUALITY ASSERTIONS)\n-- Test 1: Khóa chính order_id trong fct_daily_orders không được trùng lặp\nSELECT COUNT(*) AS failed_uniqueness_count\nFROM (\n    SELECT order_id \n    FROM gold.fct_daily_orders \n    GROUP BY order_id \n    HAVING COUNT(*) > 1\n);\n\n-- Test 2: Doanh thu trong bảng Fact không được âm\nSELECT COUNT(*) AS failed_negative_rev_count\nFROM gold.fct_daily_orders\nWHERE gross_revenue < 0;",
              "explanation": "Kịch bản hoàn chỉnh tái hiện quy trình kỹ nghệ dữ liệu thực tế: Từ nạp thô kèm audit log, khử trùng lặp bằng Window Function, xây dựng Star Schema, tạo bảng Feature Store cho AI, đến bộ kiểm định Data Quality đảm bảo 0 dòng vi phạm.",
              "output": "Toàn bộ 3 schema Bronze, Silver, Gold được khởi tạo và nạp thành công 100% trong vòng chưa đầy 0.2 giây."
            }
          ]
        },
        {
          "id": "sec-44-predict-faded",
          "title": "Thử Thách Dự Đoán & Bài Tập Điền Khuyết Faded Example: Bổ Sung Chỉ Số RFM Vào Feature Store",
          "content": "\n        <p>Quan sát câu truy vấn tính toán điểm <strong>RFM (Recency - Frequency - Monetary)</strong> cho Feature Store dưới đây. Hãy hoàn thành các vị trí còn khuyết <code>___[1]___</code> và <code>___[2]___</code> để chia đều toàn bộ khách hàng thành 4 nhóm điểm (Quartiles 1 đến 4) cho chỉ số Tần suất mua hàng (Frequency) và Tổng tiền chi tiêu (Monetary).</p>\n        <pre><code class=\"language-sql\">WITH rfm_metrics AS (\n    SELECT \n        customer_id,\n        lifetime_orders,\n        lifetime_value,\n        days_since_last_order\n    FROM gold.feat_customer_churn_features\n)\nSELECT \n    customer_id,\n    -- Frequency Score: Càng mua nhiều điểm càng cao (1 -> 4)\n    NTILE(4) OVER (ORDER BY lifetime_orders ASC) AS f_score,\n    -- Monetary Score: Càng chi nhiều tiền điểm càng cao (1 -> 4)\n    NTILE(4) OVER (ORDER BY ___[1]___ ASC) AS m_score,\n    -- Recency Score: Càng mới mua (số ngày càng ít) điểm càng cao (đảo chiều DESC)\n    NTILE(4) OVER (ORDER BY days_since_last_order ___[2]___) AS r_score\nFROM rfm_metrics;</code></pre>\n        <div class=\"predict-details\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 14px; border-radius: 6px; margin: 12px 0;\">\n          <details>\n            <summary style=\"font-weight: 600; cursor: pointer; color: var(--accent, #3b82f6);\">Xem Đáp Án Điền Khuyết & Phân Tích Kỹ Thuật</summary>\n            <p style=\"margin-top: 8px;\"><strong>Đáp án điền khuyết:</strong></p>\n            <ul>\n              <li><code>___[1]___</code>: <code>lifetime_value</code></li>\n              <li><code>___[2]___</code>: <code>DESC</code> (Vì số ngày ít hơn có nghĩa là mới mua gần đây hơn &rarr; xứng đáng nhận điểm cao 4)</li>\n            </ul>\n            <p><strong>Cơ chế:</strong> Hàm <code>NTILE(4)</code> phân chia tập hợp thành 4 phần bằng nhau (Quartiles). Khách hàng có điểm R=4, F=4, M=4 là nhóm khách hàng VIP trung thành nhất, trong khi nhóm R=1, F=1, M=1 là nhóm khách hàng có nguy cơ rời bỏ cao nhất cần chiến dịch chăm sóc khẩn cấp.</p>\n          </details>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-44-scale-challenge",
          "title": "Thử Thách Phản Chiếu Quy Mô (Reflection Challenge): Điều Gì Sẽ Vỡ Khi Dữ Liệu Tăng Gấp 100 Lần?",
          "content": "\n        <p>Hãy đặt câu hỏi tư duy kiến trúc sư: <em>\"Nếu tháng sau dữ liệu đơn hàng tăng từ 100.000 dòng lên 100 triệu dòng, câu lệnh trên sẽ gặp vấn đề gì?\"</em></p>\n        <div style=\"background: var(--bg-surface-elevated, #1e293b); padding: 16px; border-radius: 8px; border-left: 4px solid var(--accent, #3b82f6); margin: 16px 0;\">\n          <h4 style=\"margin-top: 0; color: #ef4444;\">3 Nút Thắt Hiệu Năng Cần Hóa Giải:</h4>\n          <ol>\n            <li><strong>Tràn bộ nhớ RAM khi chạy ROW_NUMBER() Deduplication:</strong> Phép <code>PARTITION BY order_id ORDER BY _ingested_at</code> trên 100 triệu dòng sẽ gây tràn bộ nhớ đệm nếu không cấu hình bộ nhớ tạm trên đĩa (Disk Spilling). Giải pháp: Lọc trước theo phân vùng thời gian mới nhất (Micro-batching).</li>\n            <li><strong>Quét toàn bộ bảng (Full Table Scan) khi truy vấn báo cáo ngày:</strong> Nếu lưu toàn bộ 100 triệu dòng trong 1 file Parquet duy nhất, mỗi lần tính KPI ngày sẽ phải đọc cả 10GB đĩa. Giải pháp: Xuất dữ liệu ra định dạng Hive-Partitioned theo năm và tháng: <code>COPY ... TO 'data/gold/' (FORMAT PARQUET, PARTITION_BY (year, month));</code>.</li>\n            <li><strong>Rò rỉ dữ liệu tương lai (Data Leakage) trong Feature Store:</strong> Khi tính toán <code>days_since_last_order</code>, nếu dùng ngày cố định mà không cắt theo mốc thời gian snapshot (Point-in-time correctness), mô hình AI sẽ bị rò rỉ dữ liệu của tương lai vào quá khứ, khiến mô hình hoạt động cực kỳ ảo trong phòng thí nghiệm nhưng thất bại thảm hại khi ra môi trường thực tế!</li>\n          </ol>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-44-pitfalls",
          "title": "Bẫy Thường Gặp & Sai Lầm Thiết Kế Trong Các Dự Án Kho Dữ Liệu Lớn",
          "content": "\n        <p>Những sai lầm chí mạng cần tránh khi xây dựng Modern Data Warehouse:</p>\n        <ul>\n          <li><strong>Bỏ qua lớp Silver mà nhảy cóc từ Bronze lên Gold:</strong> Cố gắng viết một câu SQL dài 500 dòng vừa làm sạch vừa JOIN vừa tính toán KPI. Khi có lỗi, bạn sẽ mất cả tuần để debug mớ hỗn độn này.</li>\n          <li><strong>Không lưu lại lịch sử thay đổi (Thiếu SCD Type 2):</strong> Khi khách hàng đổi thành phố từ Hà Nội vào TP.HCM, bạn dùng lệnh UPDATE ghi đè trực tiếp. Hậu quả: Toàn bộ doanh số bán hàng trong quá khứ của khách hàng đó ở Hà Nội bị biến thành doanh số của TP.HCM!</li>\n          <li><strong>Tạo vòng lặp phụ thuộc (Circular Dependency):</strong> Model A phụ thuộc Model B, trong khi Model B lại phụ thuộc ngược lại Model A, khiến trình điều phối DAG (dbt/Airflow) bị treo vô tận.</li>\n        </ul>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-44-comparison",
          "title": "Bảng So Sánh Đa Chiều: Kho Dữ Liệu Truyền Thống vs Modern Lakehouse / Warehouse",
          "content": "\n        <p>Bảng tổng hợp bước tiến hóa công nghệ của ngành dữ liệu trong thập kỷ qua:</p>\n        <div style=\"overflow-x: auto; margin: 16px 0;\">\n          <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n            <thead>\n              <tr style=\"background: var(--bg-surface-elevated, #1e293b); text-align: left;\">\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Đặc Tính Kiến Trúc</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Kho Dữ Liệu Truyền Thống (Legacy RDBMS)</th>\n                <th style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Modern Lakehouse / Warehouse (DuckDB / Snowflake)</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Mô hình đường ống</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">ETL nặng nề (Biến đổi ngoài trước khi nạp)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">ELT linh hoạt (Nạp thô trước, biến đổi nội bộ bằng SQL)</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Định dạng lưu trữ</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Định dạng dòng độc quyền (Row-based, nặng nề)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Định dạng cột mở (Columnar Parquet, nén cao, SIMD)</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Phục vụ Trí Tuệ Nhân Tạo (AI/ML)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Rất kém (Phải xuất ra file CSV riêng cho Data Science)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Xuất sắc (Tích hợp Feature Store, Zero-copy sang Arrow/Python)</td>\n              </tr>\n              <tr>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155); font-weight: 600;\">Chi phí hạ tầng</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Cực kỳ đắt đỏ (Bản quyền máy chủ Oracle/Teradata)</td>\n                <td style=\"padding: 10px; border: 1px solid var(--border-color, #334155);\">Cực kỳ tối ưu (Serverless, mã nguồn mở, chạy ngay trên laptop)</td>\n              </tr>\n            </tbody>\n          </table>\n              </div>\n        </div>\n      ",
          "codeExamples": []
        },
        {
          "id": "sec-44-conclusion",
          "title": "Lời Chào Tốt Nghiệp: Bản Tuyên Ngôn Của Một SQL Master & Data Engineer",
          "content": "\n        <div style=\"background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1)); border: 2px solid var(--accent, #3b82f6); padding: 20px; border-radius: 12px; margin: 16px 0;\">\n          <h3 style=\"color: var(--accent, #3b82f6); margin-top: 0;\">Chúc Mừng Bạn Đã Hoàn Thành Toàn Bộ 8 Tầng Của Khóa Học!</h3>\n          <p>Từ những dòng lệnh <code>SELECT * FROM table</code> bỡ ngỡ ban đầu ở Tầng 0, trải qua 44 bài học chuyên sâu với hàng ngàn dòng code kiểm chứng, bạn đã chính thức làm chủ:</p>\n          <ul>\n            <li>Tư duy Đại số quan hệ và cú pháp SQL chuẩn quốc tế.</li>\n            <li>Nghệ thuật thiết kế CSDL (Chuẩn hóa 3NF, Ràng buộc bất biến, SCD Type 2).</li>\n            <li>Bản chất giao dịch ACID, nhật ký WAL, cơ chế đa phiên bản MVCC và hóa giải Deadlock.</li>\n            <li>Kỹ thuật tối ưu hóa triệu đô: Giải phẫu B-Tree, đọc bản chụp EXPLAIN ANALYZE và tư duy CSDL Cột.</li>\n            <li>Bộ công cụ Modern Data Stack đỉnh cao: dbt Core, Apache Airflow, SQLFluff và DuckDB.</li>\n            <li>Kỷ luật kỹ nghệ phần mềm: Kiểm thử tự động Data Quality và CI/CD Pipeline.</li>\n          </ul>\n          <p style=\"font-weight: 600; margin-bottom: 0;\">Hãy tự tin mang những vũ khí tri thức này bước ra thế giới, giải quyết các bài toán dữ liệu lớn và kiến tạo giá trị đột phá cho doanh nghiệp và xã hội!</p>\n        </div>\n      ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          "Không bao giờ bỏ qua bước deduplication ở tầng Silver; luôn đảm bảo mỗi khóa nghiệp vụ chỉ xuất hiện đúng một dòng đại diện mới nhất.",
          "Cảnh giác cao độ với hiện tượng rò rỉ dữ liệu (Data Leakage) khi xây dựng bảng đặc trưng Machine Learning; luôn tuân thủ nguyên tắc Point-in-time correctness."
        ],
        "tips": [
          "Tận dụng cú pháp COPY ... TO 'data/*.parquet' (FORMAT PARQUET) của DuckDB để xuất dữ liệu đã làm sạch sang định dạng nén Parquet hiệu năng cao.",
          "Đưa toàn bộ dự án này lên một kho lưu trữ GitHub cá nhân kèm file README trực quan để biến nó thành viên ngọc sáng nhất trong hồ sơ xin việc của bạn."
        ],
        "deepDive": {
          "title": "Kiến trúc Data Lakehouse phi máy chủ (Serverless Lakehouse) bằng DuckDB + Parquet trên Cloud Storage",
          "content": "<p>Kiến trúc <strong>Serverless Lakehouse</strong> hiện đại loại bỏ hoàn toàn nhu cầu duy trì các cụm máy chủ đắt đỏ hoạt động 24/7:</p><p>Dữ liệu được tổ chức dưới dạng các file <strong>Apache Parquet</strong> phân vùng theo thư mục thời gian trên Cloud Storage (Amazon S3 / Google Cloud Storage / Cloudflare R2). Khi cần tính toán báo cáo hoặc huấn luyện mô hình Machine Learning, kỹ sư chỉ cần kích hoạt <strong>DuckDB</strong> đọc trực tiếp các file Parquet qua giao thức HTTP/S3 với extension <code>httpfs</code>.</p><p>Nhờ tận dụng siêu dữ liệu (Parquet Metadata Footer) để cắt tỉa phạm vi khối dữ liệu (Min/Max Chunk Pruning), DuckDB chỉ tải về đúng các byte cần thiết qua mạng, cho phép hoàn thành các phép tính tổng hợp trên hàng trăm triệu bản ghi trong vài giây với chi phí vận hành gần như bằng 0!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài Tập Cơ Bản: Nạp Trực Tiếp File Parquet Bằng DuckDB",
          "level": "Cơ bản",
          "problem": "Viết câu lệnh SQL trong DuckDB để đọc trực tiếp file Parquet có tên `orders_2026.parquet` nằm trong thư mục cục bộ, lọc ra các đơn hàng có trạng thái là `completed`, và tính tổng doanh thu cùng số lượng đơn hàng.",
          "hint": "Sử dụng hàm read_parquet('orders_2026.parquet') trực tiếp trong mệnh đề FROM.",
          "solutionCode": "-- Truy vấn trực tiếp file Parquet không cần tạo bảng trước:\nSELECT \n    COUNT(order_id) AS total_completed_orders,\n    SUM(total_amount) AS total_revenue,\n    ROUND(AVG(total_amount), 2) AS avg_order_value\nFROM read_parquet('orders_2026.parquet')\nWHERE status = 'completed';",
          "solutionOutput": "total_completed_orders | total_revenue | avg_order_value (Kết quả tính toán tức thì)",
          "explanation": "Sức mạnh độc nhất của DuckDB: Đọc trực tiếp các file dữ liệu định dạng cột Parquet mà không cần nạp tốn bộ nhớ vào bảng trung gian."
        },
        {
          "title": "Bài Tập Trung Bình: Khử Trùng Lặp Dữ Liệu Bằng Window Function Tại Tầng Silver",
          "level": "Trung bình",
          "problem": "Bảng `bronze.raw_customers` bị nạp trùng nhiều lần do lỗi mạng. Viết câu lệnh SQL tạo bảng `silver.dim_customers_clean`: Với mỗi `customer_id`, chỉ giữ lại bản ghi có thời gian nạp `_ingested_at` mới nhất. Đồng thời chuẩn hóa tên khách hàng viết hoa chữ cái đầu và xóa khoảng trắng thừa.",
          "hint": "Dùng CTE kết hợp ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY _ingested_at DESC) AS rn, sau đó lọc WHERE rn = 1.",
          "solutionCode": "-- Khử trùng lặp chuẩn mực tại tầng Silver:\nCREATE OR REPLACE TABLE silver.dim_customers_clean AS\nWITH deduplicated_customers AS (\n    SELECT \n        customer_id::INT AS customer_id,\n        TRIM(full_name) AS full_name,\n        LOWER(TRIM(email)) AS email,\n        TRIM(city) AS city,\n        _ingested_at,\n        ROW_NUMBER() OVER (\n            PARTITION BY customer_id \n            ORDER BY _ingested_at DESC\n        ) AS dedup_rank\n    FROM bronze.raw_customers\n    WHERE customer_id IS NOT NULL\n)\nSELECT \n    customer_id,\n    full_name,\n    email,\n    city,\n    _ingested_at\nFROM deduplicated_customers\nWHERE dedup_rank = 1;",
          "solutionOutput": "Bảng chiều khách hàng sạch sẽ 100%, mỗi customer_id duy nhất 1 bản ghi mới nhất.",
          "explanation": "Kỹ thuật ROW_NUMBER() Deduplication là mẫu thiết kế tiêu chuẩn vàng tại tầng Silver để xử lý dữ liệu phát tán trùng lặp từ Kafka hoặc CDC."
        },
        {
          "title": "Bài Tập Khá: Xây Dựng Bảng Snapshot Feature Store Theo Điểm Thời Gian (Point-In-Time)",
          "level": "Khá",
          "problem": "Để phục vụ huấn luyện mô hình AI dự đoán Churn tại thời điểm ngày 01/02/2026, hãy viết câu truy vấn tạo bảng đặc trưng `gold.feat_churn_training_20260201`. Yêu cầu quan trọng: CHỈ ĐƯỢC PHÉP tính toán trên các đơn hàng phát sinh TRƯỚC ngày 01/02/2026 để tránh rò rỉ dữ liệu (Data Leakage). Các đặc trưng gồm: số đơn hàng trong quá khứ, tổng chi tiêu, và số ngày kể từ lần mua cuối cùng tính đến ngày 01/02/2026.",
          "hint": "Thêm điều kiện WHERE order_date < '2026-02-01' trước khi thực hiện tổng hợp.",
          "solutionCode": "-- Tạo bảng Feature Store Point-in-time chống Data Leakage:\nCREATE OR REPLACE TABLE gold.feat_churn_training_20260201 AS\nWITH historical_orders AS (\n    SELECT \n        customer_id,\n        COUNT(order_id) AS orders_count_before_cutoff,\n        SUM(gross_revenue) AS spend_before_cutoff,\n        MAX(order_date) AS last_order_before_cutoff\n    FROM gold.fct_daily_orders\n    -- CHỐT CHẶN BẢO VỆ: Tuyệt đối không nhìn thấy tương lai\n    WHERE order_date < '2026-02-01' \n      AND status = 'completed'\n    GROUP BY customer_id\n)\nSELECT \n    c.customer_id,\n    c.full_name,\n    c.city,\n    COALESCE(h.orders_count_before_cutoff, 0) AS total_orders,\n    COALESCE(h.spend_before_cutoff, 0) AS total_spend,\n    ('2026-02-01'::DATE - h.last_order_before_cutoff::DATE) AS recency_days_at_cutoff\nFROM customers c\nLEFT JOIN historical_orders h ON c.customer_id = h.customer_id;",
          "solutionOutput": "Bảng đặc trưng ML chuẩn xác về mặt thời gian, sẵn sàng đưa vào thuật toán XGBoost/RandomForest.",
          "explanation": "Point-in-time Correctness là điều kiện tiên quyết trong Kỹ nghệ Dữ liệu cho AI: Dữ liệu huấn luyện chỉ được phép phản ánh đúng những gì hệ thống biết tại thời điểm Cutoff Date."
        },
        {
          "title": "Bài Tập Nâng Cao: Xuất Bảng Fact Ra Định Dạng Parquet Có Phân Vùng Hive (Hive Partitioning)",
          "level": "Nâng cao",
          "problem": "Viết lệnh SQL DuckDB để xuất toàn bộ dữ liệu bảng `gold.fct_daily_orders` ra thư mục `exports/gold_orders/` dưới định dạng tệp tin Parquet nén Snappy, tự động phân vùng theo 2 thư mục con: `year` và `month`.",
          "hint": "Sử dụng lệnh COPY (...) TO 'exports/gold_orders/' (FORMAT PARQUET, PARTITION_BY (year, month), COMPRESSION SNAPPY).",
          "solutionCode": "-- Xuất kho dữ liệu Parquet phân vùng Hive tối ưu:\nCOPY (\n    SELECT \n        *,\n        EXTRACT(YEAR FROM order_date)::INT AS order_year,\n        EXTRACT(MONTH FROM order_date)::INT AS order_month\n    FROM gold.fct_daily_orders\n) TO 'exports/gold_orders' (\n    FORMAT PARQUET,\n    PARTITION_BY (order_year, order_month),\n    COMPRESSION SNAPPY,\n    OVERWRITE_OR_IGNORE 1\n);",
          "solutionOutput": "Cấu trúc thư mục được tạo tự động: exports/gold_orders/order_year=2026/order_month=1/data.parquet...",
          "explanation": "Hive Partitioning cho phép các công cụ phân tích sau này (như AWS Athena, Snowflake hay DuckDB) tự động áp dụng Partition Pruning, chỉ đọc đúng thư mục tháng cần thiết mà không phải quét toàn bộ kho dữ liệu."
        }
      ],
      "quiz": [
        {
          "question": "Kiến trúc Medallion trong kho dữ liệu hiện đại phân chia dữ liệu thành 3 tầng chuẩn mực nào?",
          "options": [
            "Small -> Medium -> Large",
            "Bronze (Dữ liệu thô kèm Audit) -> Silver (Dữ liệu sạch, khử trùng lặp) -> Gold (Mô hình Star Schema & Feature Store)",
            "Input -> Processing -> Output",
            "Alpha -> Beta -> Release"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Mô hình Bronze -> Silver -> Gold (Medallion Architecture) là tiêu chuẩn công nghiệp được Databricks và toàn bộ ngành kỹ nghệ dữ liệu áp dụng rộng rãi."
        },
        {
          "question": "Vì sao DuckDB lại được ví như 'SQLite của thế giới phân tích dữ liệu (OLAP)'?",
          "options": [
            "Vì DuckDB không hỗ trợ ngôn ngữ SQL.",
            "Vì DuckDB là hệ CSDL phân tích nhúng chạy trực tiếp trong tiến trình (In-process), không cần cài đặt server, đọc trực tiếp Parquet và tối ưu hóa xử lý cột Vectorized.",
            "Vì DuckDB chỉ chạy được trên điện thoại thông minh.",
            "Vì DuckDB là phần mềm có phí rất đắt."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! DuckDB cực kỳ gọn nhẹ như SQLite nhưng sở hữu sức mạnh xử lý phân tích cột Vectorized tương đương với các Data Warehouse lớn như Snowflake."
        },
        {
          "question": "Khái niệm 'Data Leakage' (Rò rỉ dữ liệu) trong bài toán xây dựng Feature Store cho AI xảy ra khi nào?",
          "options": [
            "Khi máy tính bị mất kết nối mạng Internet.",
            "Khi các đặc trưng huấn luyện vô tình sử dụng dữ liệu phát sinh sau mốc thời gian đánh giá (sử dụng thông tin tương lai để dự đoán quá khứ).",
            "Khi file Parquet bị xóa mất.",
            "Khi có giá trị số 0 trong bảng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Rò rỉ thông tin tương lai vào tập huấn luyện sẽ khiến mô hình AI hoạt động sai lệch hoàn toàn khi đưa vào môi trường sản xuất thực tế."
        },
        {
          "question": "Mục đích cốt lõi của kỹ thuật 'Hive Partitioning' (chia thư mục dạng year=2026/month=01/) khi lưu trữ file Parquet là gì?",
          "options": [
            "Để các file trông đẹp mắt hơn.",
            "Cho phép bộ máy truy vấn kích hoạt cơ chế Cắt tỉa phân vùng (Partition Pruning), chỉ quét đúng thư mục cần thiết thay vì đọc toàn bộ hàng triệu file trên đĩa cứng.",
            "Bắt buộc theo quy định của hệ điều hành Linux.",
            "Để tăng dung lượng ổ cứng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Partition Pruning dựa trên Hive Partitioning giúp tiết kiệm 95-99% chi phí I/O đọc dữ liệu khi thực hiện các câu truy vấn lọc theo ngày tháng."
        },
        {
          "question": "Sau khi hoàn thành toàn bộ 8 tầng kiến thức của khóa học này, năng lực quan trọng nhất của bạn với tư cách là một Kỹ Sư Dữ Liệu là gì?",
          "options": [
            "Học vẹt thuộc lòng tất cả các hàm SQL trong từ điển.",
            "Khả năng tư duy hệ thống: Biến đổi dữ liệu thô thành tài sản kinh doanh tin cậy, tối ưu hóa hiệu năng, đảm bảo chất lượng dữ liệu tự động và xây dựng pipeline có khả năng mở rộng.",
            "Chỉ biết cài đặt phần mềm trên máy tính cá nhân.",
            "Gõ bàn phím thật nhanh mà không cần kiểm tra kết quả."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Tư duy kỹ nghệ hệ thống, giải quyết bài toán quy mô lớn và đảm bảo chất lượng dữ liệu tự động chính là phẩm chất của một Master SQL đích thực!"
        }
      ],
      "summary": [
        "Kiến trúc Medallion 3 lớp: Bronze (Nạp thô + Audit) -> Silver (Làm sạch + Deduplication) -> Gold (Star Schema Facts, Dims & Feature Store).",
        "Sức mạnh DuckDB OLAP: Truy vấn trực tiếp file Parquet không cần server, xử lý Vectorized SIMD tốc độ hàng triệu dòng/giây.",
        "Feature Store cho Machine Learning: Tuân thủ nghiêm ngặt tính đúng đắn theo điểm thời gian (Point-in-time correctness) chống rò rỉ dữ liệu (Data Leakage).",
        "Hive Partitioning: Xuất dữ liệu Parquet phân vùng theo thư mục năm/tháng để kích hoạt Partition Pruning tăng tốc truy vấn gấp trăm lần.",
        "Chất lượng dữ liệu tự động: Kết hợp kiểm định assertions trực tiếp trong pipeline để bảo vệ độ tin cậy tuyệt đối của tài sản dữ liệu.",
        "Ôn cách quãng: Nhìn lại toàn bộ 8 tầng học: Từ Đại số quan hệ (Tầng 0), Truy vấn cơ bản (Tầng 1), Nâng cao & Cửa sổ (Tầng 2-3), Thiết kế & Giao dịch (Tầng 4-5), Hiệu năng & Quy mô (Tầng 6), Tooling & Airflow (Tầng 7) đến Dự án hoàn chỉnh (Tầng 8) — Bạn đã sẵn sàng chinh phục đỉnh cao sự nghiệp dữ liệu!"
      ]
    }
  ]
};
