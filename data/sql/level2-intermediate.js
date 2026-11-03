window.SQL_LEVEL2_PART = {
  "id": "part-sql-2",
  "number": "Tầng 2",
  "title": "Trung Cấp, JOIN & Phức Hợp",
  "level": "Trung cấp",
  "badge": "Cốt lõi",
  "description": "Nắm vững kỹ nghệ gom nhóm và hàm tổng hợp, giải mã bản chất các phép JOIN và cạm bẫy nhân dòng (fan-out), thành thạo toán tử tập hợp, Subquery tương quan, CTE đệ quy duyệt cây phả hệ, và thiết lập chốt chặn kiểm định chất lượng dữ liệu [DQ] tự động.",
  "lessons": [
    {
      "id": "sql-08-aggregation-group-by",
      "number": "2.1",
      "title": "Gom Nhóm & Hàm Tổng Hợp: GROUP BY, HAVING, COUNT(*) vs COUNT(col) & Hành Vi Của NULL",
      "subtitle": "Bản chất co cụm dữ liệu, ma trận phân biệt các hàm COUNT, và cạm bẫy sai lệch mẫu số của hàm AVG khi có NULL",
      "level": "Trung cấp",
      "duration": "45 phút",
      "keywords": [
        "GROUP BY",
        "HAVING",
        "Aggregate Functions",
        "COUNT(*)",
        "COUNT(col)",
        "NULL in Aggregates",
        "Bucket Processing"
      ],
      "prerequisites": "Thành thạo vòng đời thực thi 8 bước (Bài 1.4) và logic 3 giá trị với NULL (Bài 0.3).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Hiểu bản chất toán học của phép gom nhóm (Partitioning into Buckets) và các hàm tổng hợp (SUM, AVG, MIN, MAX, COUNT).",
        "Phân biệt tuyệt đối giữa COUNT(*) (đếm dòng vật lý), COUNT(cột) (chỉ đếm dòng phi-NULL) và COUNT(DISTINCT cột).",
        "Giải mã cạm bẫy sai lệch mẫu số của hàm AVG khi cột chứa giá trị NULL và kỹ thuật xử lý an toàn bằng COALESCE.",
        "Vận dụng thành thạo mệnh đề HAVING để lọc các nhóm sau khi tính toán tổng hợp mà không vi phạm nguyên tắc tối ưu hiệu năng.",
        "Nhận diện lỗi cú pháp kinh điển: chọn cột tự do trong SELECT không nằm trong GROUP BY và không bọc hàm tổng hợp."
      ],
      "intuition": {
        "title": "Phân loại thư theo mã bưu chính và Cân thùng hàng",
        "metaphor": "Mệnh đề GROUP BY giống như một nhân viên bưu điện gom hàng nghìn lá thư vào các giỏ riêng dựa trên Mã bưu điện (Zip Code). Mỗi giỏ đại diện cho một nhóm. Sau khi đã gom giỏ xong, các hàm tổng hợp giống như chiếc cân: bạn chỉ có thể hỏi \"Cả giỏ này nặng bao nhiêu kg? (SUM)\" hoặc \"Trong giỏ có bao nhiêu lá thư? (COUNT)\". Bạn KHÔNG THỂ hỏi \"Người gửi của lá thư trong giỏ này tên gì?\" bởi vì trong giỏ có 50 lá thư với 50 người gửi khác nhau! Đó chính là lý do vì sao trong mệnh đề SELECT, bạn chỉ được phép chọn cột nằm trong GROUP BY hoặc nằm trong hàm tổng hợp.",
        "boundary": "Ẩn dụ này giải thích rõ lỗi cú pháp kinh điển của GROUP BY. Tuy nhiên lưu ý: nếu một giỏ thư chứa những lá thư rỗng ruột (NULL), chiếc cân COUNT(nội_dung) sẽ không thèm đếm những lá thư rỗng đó!",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">1. NGUỒN (RAW ROWS)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">100.000.000 dòng</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Stream dữ liệu đơn hàng thô</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:200px;\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;\">2. HASH AGGREGATE (BUCKETS)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">GROUP BY category</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Gom cụm theo khóa trong RAM, tính SUM/COUNT</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">3. KẾT QUẢ TÓM TẮT</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--success);font-family:monospace;\">Chỉ còn 5 dòng!</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Trả về client trong 0.2ms</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ FILTER (WHERE ...):</span>\n              <span>Chuẩn ISO hiện đại hỗ trợ <code>COUNT(*) FILTER (WHERE status = 'CANCELLED')</code>, chạy nhanh và sáng sủa hơn nhiều so với cú pháp cũ <code>COUNT(CASE WHEN ...)</code>.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-08-problem-hook",
          "title": "Gợi mở vấn đề: Nếu không có GROUP BY, chuyện gì xảy ra?",
          "content": "\n            <p>Hãy tưởng tượng bạn phải lập báo cáo doanh thu theo từng danh mục sản phẩm cho một sàn thương mại điện tử có <strong>100 triệu đơn hàng</strong>. Nếu ngôn ngữ SQL không có mệnh đề <code>GROUP BY</code> và các hàm tổng hợp:</p>\n            <ul>\n              <li>Ứng dụng của bạn buộc phải kéo toàn bộ 100 triệu dòng qua đường truyền mạng về máy chủ backend.</li>\n              <li>Lập trình viên phải viết vòng lặp <code>for</code> bằng Python/Java, dùng cấu trúc dữ liệu Dictionary / Hash Map để cộng dồn từng đồng tiền.</li>\n              <li><strong>Hậu quả:</strong> Máy chủ backend sập vì tràn bộ nhớ RAM (Out of Memory), đường truyền mạng nghẽn tắc, và một báo cáo mất tới 30 phút để hoàn thành!</li>\n            </ul>\n            <p>Trong khi đó, với <code>GROUP BY</code>, động cơ CSDL thực hiện phép băm gom nhóm (Hash Aggregate) trực tiếp ngay tại phiến đĩa và bộ đệm RAM của database, tính toán song song hàng triệu dòng và chỉ trả về đúng 5 dòng kết quả tóm tắt cho ứng dụng trong vỏn vẹn 0.2 giây!</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-08-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra nhanh WHERE vs HAVING & NULL",
          "content": "\n            <p>Trước khi gom nhóm phức tạp, hãy truy hồi 2 câu hỏi từ Bài 0.3 và Bài 1.4:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Theo vòng đời thực thi 8 bước, mệnh đề WHERE chạy ở bước mấy và mệnh đề HAVING chạy ở bước mấy?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Mệnh đề <code>WHERE</code> chạy ở <strong>Bước 2</strong> (lọc từng dòng thô trước gom nhóm). Mệnh đề <code>HAVING</code> chạy ở <strong>Bước 4</strong> (lọc các nhóm sau khi GROUP BY ở Bước 3).</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Các hàm tổng hợp như <code>SUM(col)</code> hay <code>AVG(col)</code> xử lý các ô có giá trị NULL như thế nào?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Các hàm tổng hợp (ngoại trừ COUNT(*)) <strong>tự động bỏ qua (ignore)</strong> toàn bộ các giá trị NULL, chỉ thực hiện tính toán trên các giá trị phi-NULL.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-08-concept-definition",
          "title": "Khái niệm cốt lõi: Gom Nhóm (Bucket Partitioning) & Hàm Tổng Hợp",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Thuật ngữ chuẩn</th>\n                    <th scope=\"col\">Tên tiếng Việt</th>\n                    <th scope=\"col\">Bản chất kỹ thuật</th>\n                    <th scope=\"col\">Ví dụ minh họa</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Grouping Key</strong></td>\n                    <td>Khóa gom nhóm</td>\n                    <td>Cột hoặc biểu thức dùng làm tiêu chí để phân bổ các dòng vào các thùng chứa (Buckets).</td>\n                    <td><code>GROUP BY category</code></td>\n                  </tr>\n                  <tr>\n                    <td><strong>Aggregate Function</strong></td>\n                    <td>Hàm tổng hợp</td>\n                    <td>Ánh xạ một tập hợp nhiều giá trị thành một giá trị vô hướng duy nhất.</td>\n                    <td><code>SUM()</code>, <code>AVG()</code>, <code>COUNT()</code>, <code>MIN()</code>, <code>MAX()</code></td>\n                  </tr>\n                  <tr>\n                    <td><strong>HAVING Clause</strong></td>\n                    <td>Mệnh đề lọc nhóm</td>\n                    <td>Vị từ lọc áp dụng trên kết quả của hàm tổng hợp sau khi đã gom cụm.</td>\n                    <td><code>HAVING COUNT(*) &gt;= 2</code></td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-08-internal-mechanism",
          "title": "Cơ chế bên trong: Hash Aggregate vs Sort Aggregate",
          "content": "\n            <p>Query Optimizer của CSDL thực thi phép gom nhóm theo 1 trong 2 thuật toán vật lý:</p>\n            <ul>\n              <li><strong>Hash Aggregate:</strong> CSDL quét qua bảng dữ liệu, áp dụng hàm băm (Hash Function) lên cột gom nhóm để phân phối các dòng vào một Bảng băm (Hash Table) trong bộ nhớ RAM. Khi gặp khóa đã có trong Hash Table, CSDL cập nhật ngay biến tích lũy (Accumulator: sum, count, min, max). Thuật toán này có độ phức tạp <strong>O(N)</strong>, cực nhanh trên các bảng lớn.</li>\n              <li><strong>Sort Aggregate (Group Aggregate):</strong> CSDL thực hiện sắp xếp toàn bộ bảng theo cột gom nhóm (độ phức tạp <strong>O(N log N)</strong>), sau đó dùng con trỏ duyệt tuần tự: khi giá trị khóa thay đổi thì chốt số tổng của nhóm trước. Được lựa chọn khi cột gom nhóm đã có chỉ mục B-tree sẵn hoặc khi dung lượng bảng băm vượt quá RAM.</li>\n            </ul>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-08-worked-example",
          "title": "Ví dụ mẫu có lời giải: Phân Tích Khách Hàng VIP TechMart Kết Hợp WHERE & HAVING",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Xét câu truy vấn sau trên bảng <code>orders</code> TechMart: Lọc đơn hàng có trạng thái 'COMPLETED', gom nhóm theo <code>customer_id</code>, và chỉ giữ lại khách hàng có tổng chi tiêu từ 3.000.000đ trở lên. Theo bạn, khách hàng số 1 (có 1 đơn 4 triệu và 1 đơn hủy 2.2 triệu) có thỏa mãn điều kiện HAVING không?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: CÓ THỎA MÃN! Khách hàng số 1 được giữ lại!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong> Mệnh đề WHERE lọc bỏ đơn CANCELLED ở Bước 2. Đơn COMPLETED 4.000.000đ được nạp vào Bước 3 gom nhóm. Ở Bước 4 (HAVING), <code>SUM(total_amount) = 4.000.000 &gt;= 3.000.000</code> nên khách hàng số 1 vượt qua bài kiểm tra thành công.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "GROUP BY và HAVING trên bảng orders TechMart",
              "code": "SELECT \n    customer_id,\n    COUNT(*) AS total_orders,\n    SUM(total_amount) AS total_spent,\n    ROUND(AVG(total_amount), 2) AS avg_order_value\nFROM orders\nWHERE status = 'COMPLETED'\nGROUP BY customer_id\nHAVING SUM(total_amount) >= 3000000\nORDER BY total_spent DESC;",
              "annotations": [
                {
                  "line": 7,
                  "text": "Lọc đơn COMPLETED ở Bước 2 trước khi gom nhóm"
                },
                {
                  "line": 9,
                  "text": "Lọc nhóm khách hàng có tổng chi tiêu đạt chuẩn ở Bước 4"
                }
              ],
              "explanation": "Đã kiểm chứng thành công trên DuckDB 2.0.0, PostgreSQL 16 và SQLite 3.50.4. Ba khách hàng 2, 4, 1 được xếp hạng theo mức chi tiêu.",
              "output": "+-------------+--------------+-------------+-----------------+\n| customer_id | total_orders | total_spent | avg_order_value |\n+-------------+--------------+-------------+-----------------+\n| 2           | 2            | 12500000.00 | 6250000.00      |\n| 4           | 1            | 6900000.00  | 6900000.00      |\n| 1           | 1            | 4000000.00  | 4000000.00      |\n+-------------+--------------+-------------+-----------------+\n(3 khách hàng VIP đạt chuẩn)"
            }
          ]
        },
        {
          "id": "sec-08-faded-example",
          "title": "Bài điền khuyết (Faded Example): Phân Tích Danh Mục Sản Phẩm Đa Chiều",
          "content": "\n            <p>Từ bảng <code>products</code>, hãy điền các từ khóa và hàm thích hợp vào vị trí <code>[___1___]</code> đến <code>[___4___]</code> để tính: tổng số sản phẩm, giá thấp nhất, giá cao nhất, và giá trung bình của từng danh mục có từ 2 sản phẩm trở lên:</p>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>SELECT \n    category,\n    COUNT(*) AS total_products,\n    [___1___](price) AS min_price,\n    [___2___](price) AS max_price,\n    ROUND([___3___](price), 2) AS avg_price\nFROM products\nGROUP BY category\n[___4___] COUNT(*) >= 2;</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = MIN</code> (Hàm tìm giá trị nhỏ nhất trong nhóm).</li>\n                  <li><code>[___2___] = MAX</code> (Hàm tìm giá trị lớn nhất trong nhóm).</li>\n                  <li><code>[___3___] = AVG</code> (Hàm tính trung bình cộng).</li>\n                  <li><code>[___4___] = HAVING</code> (Mệnh đề lọc sau khi gom nhóm).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-08-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Trong Gom Nhóm & Tổng Hợp",
          "content": "\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Chọn cột tự do không nằm trong GROUP BY</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> <code>SELECT customer_id, order_date, SUM(total_amount) FROM orders GROUP BY customer_id;</code></p>\n                <p><strong>Cơ chế sai:</strong> Mỗi khách hàng có thể có nhiều <code>order_date</code> khác nhau (ví dụ: khách 2 mua ngày 02/06 và ngày 20/06). CSDL không thể biết phải lấy ngày nào để đặt cạnh một con số tổng duy nhất! PostgreSQL báo lỗi ngay lập tức: <code>column \"orders.order_date\" must appear in the GROUP BY clause or be used in an aggregate function</code>.</p>\n                <p><strong>Quy tắc vàng:</strong> Mọi cột xuất hiện trong SELECT bắt buộc phải: hoặc nằm trong GROUP BY, hoặc được bọc trong một hàm tổng hợp (SUM, MAX, MIN...).</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Cạm bẫy mẫu số của hàm AVG khi có NULL</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Một lớp học có 4 học sinh làm bài thi với điểm số: <code>10, 8, 6, NULL</code> (học sinh thứ 4 bỏ thi bị NULL). Khi viết <code>SELECT AVG(score)</code>, kết quả trả về <code>8.0</code> chứ không phải <code>6.0</code>!</p>\n                <p><strong>Bản chất:</strong> Hàm <code>AVG(col)</code> thực chất là <code>SUM(col) / COUNT(col)</code> (chỉ chia cho 3 dòng phi-NULL) chứ KHÔNG PHẢI chia cho <code>COUNT(*)</code> (tổng 4 học sinh)!</p>\n                <p><strong>Cách sửa đúng:</strong> Nếu muốn tính cả học sinh bỏ thi là 0 điểm: <code>SELECT AVG(COALESCE(score, 0)) FROM exams;</code>.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-08-concept-comparison",
          "title": "So Sánh: Tam Giác COUNT(*) vs COUNT(cột) vs COUNT(DISTINCT cột)",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí</th>\n                    <th scope=\"col\">COUNT(*)</th>\n                    <th scope=\"col\">COUNT(cột)</th>\n                    <th scope=\"col\">COUNT(DISTINCT cột)</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Cơ chế đếm</strong></td>\n                    <td>Đếm tổng số dòng vật lý trong nhóm/bảng</td>\n                    <td>Đếm số lần xuất hiện giá trị của một cột</td>\n                    <td>Đếm số lượng giá trị duy nhất khác nhau</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Xử lý giá trị NULL</strong></td>\n                    <td><strong>ĐẾM TẤT CẢ</strong> (Kể cả dòng toàn NULL)</td>\n                    <td><span class=\"dirty-val\">BỎ QUA NULL</span> (Chỉ đếm NOT NULL)</td>\n                    <td><span class=\"dirty-val\">BỎ QUA NULL</span> (Khử trùng và bỏ NULL)</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Hiệu năng trên RDBMS</strong></td>\n                    <td>Cực nhanh (Chỉ đếm con trỏ dòng)</td>\n                    <td>Nhanh (Đọc giá trị cột kiểm tra)</td>\n                    <td>Chậm nhất (Cần cấu trúc băm hoặc sắp xếp)</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Kết quả trên raw_dirty_orders (cột status)</strong></td>\n                    <td><strong>6</strong> dòng</td>\n                    <td><strong>5</strong> dòng (bỏ qua raw_id: 4)</td>\n                    <td><strong>2</strong> giá trị ('COMPLETED', 'PENDING')</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-08-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Viết Tắt GROUP BY 1, 2 & Khác Biệt Giữa Các Hệ",
          "content": "\n            <p><strong>A. Cạm bẫy viết tắt GROUP BY 1, 2 trong mã nguồn Production:</strong></p>\n            <p>Nhiều hệ quản trị (PostgreSQL, DuckDB, SQLite) cho phép viết tắt <code>GROUP BY 1, 2</code> (nghĩa là gom nhóm theo cột thứ nhất và cột thứ hai trong mệnh đề SELECT). Kỹ thuật này rất tiện khi viết câu lệnh ad-hoc khám phá dữ liệu. Tuy nhiên, trong mã nguồn đường ống dữ liệu (ETL / Data Pipeline), <strong>tuyệt đối không được dùng</strong>: nếu một đồng nghiệp vô tình chèn thêm một cột vào đầu SELECT, toàn bộ logic gom nhóm của câu truy vấn sẽ bị lệch hoàn toàn mà không hề báo lỗi cú pháp!</p>\n\n            <p><strong>B. Sự nguy hiểm của tính năng nới lỏng trên SQLite:</strong></p>\n            <p>Trong SQLite, nếu bạn viết <code>SELECT customer_id, order_date, SUM(total_amount) FROM orders GROUP BY customer_id</code>, SQLite <strong>không hề báo lỗi</strong> mà tự động chọn ngẫu nhiên một ngày <code>order_date</code> bất kỳ để hiển thị! Đây là hành vi cực kỳ nguy hiểm khiến dữ liệu bị sai lệch âm thầm khi chuyển code từ SQLite sang PostgreSQL.</p>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi chọn cột tự do không nằm trong GROUP BY",
            "content": "Nếu bạn viết SELECT customer_id, order_date, SUM(total_amount) FROM orders GROUP BY customer_id, PostgreSQL sẽ báo lỗi ngay lập tức vì mỗi khách hàng có nhiều order_date khác nhau, DBMS không biết phải chọn ngày nào để hiển thị cạnh con số tổng!"
          },
          {
            "title": "Bẫy tính trung bình cộng của tỷ lệ (Average of Averages)",
            "content": "Không bao giờ tính tỷ lệ trung bình bằng AVG(conversion_rate) của từng ngày. Hãy luôn tính bằng SUM(conversions) / SUM(visits) để có kết quả trọng số chính xác tuyệt đối."
          }
        ],
        "tips": [
          {
            "title": "Lọc trước gom nhóm bằng WHERE để tối ưu hiệu năng",
            "content": "Luôn đẩy tất cả các điều kiện không phụ thuộc hàm tổng hợp vào WHERE để loại bỏ bớt dòng trước khi nạp vào bộ nhớ RAM gom nhóm của GROUP BY."
          }
        ],
        "deepDive": {
          "title": "Cơ chế vật lý: HashAggregate vs GroupAggregate trong Execution Engine",
          "content": "<p>Khi thực hiện mệnh đề <code>GROUP BY</code>, Query Optimizer của PostgreSQL chọn 1 trong 2 toán tử thực thi vật lý: <strong>HashAggregate</strong> hoặc <strong>GroupAggregate</strong>.</p><p>Nếu dữ liệu đầu vào đã được sắp xếp sẵn theo cột gom nhóm (nhờ B-Tree index hoặc ORDER BY trước đó), engine dùng <code>GroupAggregate</code>: nó chỉ cần duyệt tuần tự từ đầu đến cuối, hết giá trị của nhóm này thì xuất kết quả và nhảy sang nhóm kế tiếp với độ phức tạp bộ nhớ $O(1)$ RAM!</p><p>Ngược lại, nếu dữ liệu chưa sắp xếp, engine dùng <code>HashAggregate</code>: cấp phát một bảng băm trong bộ đệm <code>work_mem</code>. Nếu số lượng nhóm quá lớn làm tràn RAM, engine buộc phải băm dữ liệu thành nhiều phân vùng ghi tràn xuống đĩa (Disk Spilling), làm câu lệnh chạy chậm hơn gấp hàng chục lần.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 2.1-1 (Dự đoán kết quả): Hành vi của COUNT(*) vs COUNT(col) khi bảng toàn NULL",
          "level": "Cơ bản",
          "problem": "Một bảng tạm có 3 dòng, trong đó cột `bonus` mang giá trị NULL ở cả 3 dòng. Dự đoán kết quả trả về của câu truy vấn:\nSELECT COUNT(*) AS c1, COUNT(bonus) AS c2, SUM(bonus) AS c3 FROM temp_table;",
          "hint": "Đối chiếu quy tắc đếm dòng vật lý vs đếm giá trị phi-NULL.",
          "solutionCode": "-- Kết quả trên PostgreSQL và DuckDB:\n-- c1 = 3 (Đếm đủ 3 dòng vật lý)\n-- c2 = 0 (Không có dòng nào phi-NULL)\n-- c3 = NULL (Không có giá trị nào để cộng, SUM trả về NULL chứ không phải 0!)",
          "solutionOutput": "c1: 3 | c2: 0 | c3: NULL",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ c3 ra 0, hãy nhớ rằng SUM của một tập hợp rỗng hoặc toàn NULL trong chuẩn SQL luôn trả về NULL. Luôn dùng COALESCE(SUM(col), 0) nếu muốn nhận số 0."
        },
        {
          "title": "Bài tập 2.1-2 (Tìm & Sửa lỗi): Khắc phục lỗi chọn cột tự do trong SELECT",
          "level": "Trung bình",
          "problem": "Một lập trình viên viết câu lệnh tìm đơn hàng có giá trị lớn nhất của từng khách hàng:\n```sql\nSELECT customer_id, order_id, MAX(total_amount) AS max_amount\nFROM orders\nGROUP BY customer_id;\n```\nHãy giải thích vì sao PostgreSQL báo lỗi và sửa lại câu lệnh để lấy đúng mã order_id tương ứng với đơn hàng lớn nhất.",
          "hint": "Cột order_id không nằm trong GROUP BY. Hãy dùng Window function hoặc Subquery.",
          "solutionCode": "-- Cách sửa chuẩn mực dùng CTE và ROW_NUMBER:\nWITH ranked_orders AS (\n    SELECT \n        customer_id, \n        order_id, \n        total_amount,\n        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS rn\n    FROM orders\n)\nSELECT customer_id, order_id, total_amount AS max_amount\nFROM ranked_orders\nWHERE rn = 1;",
          "solutionOutput": "Mỗi khách hàng được hiển thị chính xác mã order_id tương ứng với đơn có giá trị lớn nhất.",
          "explanation": "Chẩn đoán lỗi: GROUP BY không thể biết order_id nào đi liền với MAX(total_amount). Sử dụng Window Function ROW_NUMBER() là kỹ thuật chuẩn tắc của kỹ sư dữ liệu."
        },
        {
          "title": "Bài tập 2.1-3 (Tự viết truy vấn): Phân tích hiệu suất bán hàng danh mục",
          "level": "Nâng cao",
          "problem": "Từ bảng `products`, hãy viết truy vấn tính: số lượng sản phẩm, giá bán thấp nhất, giá bán cao nhất và giá bán trung bình của từng danh mục (`category`). Chỉ lấy những danh mục có từ 2 sản phẩm trở lên và sắp xếp theo số lượng sản phẩm giảm dần.",
          "hint": "Dùng GROUP BY category và HAVING COUNT(*) >= 2.",
          "solutionCode": "SELECT \n    category,\n    COUNT(*) AS total_products,\n    MIN(price) AS min_price,\n    MAX(price) AS max_price,\n    ROUND(AVG(price), 2) AS avg_price\nFROM products\nGROUP BY category\nHAVING COUNT(*) >= 2\nORDER BY total_products DESC, category ASC;",
          "solutionOutput": "+-------------+----------------+------------+------------+------------+\n| category    | total_products | min_price  | max_price  | avg_price  |\n+-------------+----------------+------------+------------+------------+\n| Accessories | 3              | 450000.00  | 2200000.00 | 1483333.33 |\n+-------------+----------------+------------+------------+------------+",
          "explanation": "Danh mục Monitors và Audio chỉ có 1 sản phẩm nên bị mệnh đề HAVING loại bỏ chính xác."
        },
        {
          "title": "Bài tập 2.1-4 (Đánh đổi & Kiến trúc): Hash Aggregate vs Sort Aggregate",
          "level": "Nâng cao",
          "problem": "Khi nào Bộ tối ưu hóa truy vấn (Query Optimizer) sẽ quyết định chuyển từ Hash Aggregate sang Sort Aggregate khi thực hiện câu lệnh GROUP BY trên bảng 500 triệu dòng?",
          "hint": "Xem xét dung lượng bộ nhớ work_mem của RAM và trạng thái chỉ mục B-tree.",
          "solutionCode": "-- Phân tích kiến trúc:\n-- 1. Optimizer chọn Hash Aggregate khi: Bảng băm các nhóm (Unique keys) ước tính vừa vặn trong vùng nhớ RAM (work_mem).\n-- 2. Optimizer chuyển sang Sort Aggregate khi:\n--    - Số lượng nhóm duy nhất (Cardinality) quá lớn, bảng băm sẽ tràn RAM (Spill to disk).\n--    - Hoặc cột gom nhóm đã có sẵn chỉ mục B-tree được định thứ tự, engine chỉ việc quét tuần tự (Index Scan) mà không tốn công băm.",
          "solutionOutput": "Đánh đổi giữa chi phí CPU tính mã băm RAM vs chi phí I/O sắp xếp dữ liệu.",
          "explanation": "Hiểu rõ hai thuật toán này giúp kỹ sư điều chỉnh tham số work_mem hợp lý trong PostgreSQL."
        }
      ],
      "quiz": [
        {
          "question": "Giả sử cột bonus của bảng nhân viên có các giá trị: [100, 200, NULL]. Kết quả của hàm SUM(bonus) và AVG(bonus) trong chuẩn SQL lần lượt là bao nhiêu?",
          "options": [
            "SUM = 300, AVG = 100",
            "SUM = 300, AVG = 150",
            "SUM = NULL, AVG = NULL",
            "SUM = 300, AVG = Báo lỗi chia cho NULL"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! SQL lờ đi giá trị NULL trong hàm tổng hợp: SUM = 100 + 200 = 300; và AVG = 300 / 2 = 150 (chỉ chia cho 2 phần tử phi-NULL!)."
        },
        {
          "question": "Tại sao câu lệnh: SELECT category, product_name, SUM(price) FROM products GROUP BY category; lại bị báo lỗi cú pháp trên PostgreSQL?",
          "options": [
            "Vì hàm SUM chỉ hoạt động với số nguyên.",
            "Vì cột product_name không nằm trong mệnh đề GROUP BY và cũng không được bao bọc bởi một hàm tổng hợp.",
            "Vì bảng products có ít hơn 10 dòng dữ liệu.",
            "Vì PostgreSQL bắt buộc phải có mệnh đề HAVING khi dùng GROUP BY."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Trong mỗi danh mục có nhiều sản phẩm khác nhau, CSDL không thể biết phải chọn giá trị product_name nào để hiển thị bên cạnh một con số tổng duy nhất."
        },
        {
          "question": "Sự khác biệt cốt tử giữa COUNT(*) và COUNT(cột_cụ_thể) khi đếm dữ liệu trên bảng là gì?",
          "options": [
            "COUNT(*) chạy chậm hơn COUNT(cột_cụ_thể) 10 lần.",
            "COUNT(*) đếm tất cả các dòng vật lý (kể cả dòng chứa NULL), trong khi COUNT(cột_cụ_thể) tự động loại bỏ các dòng có giá trị NULL tại cột đó.",
            "COUNT(cột_cụ_thể) tự động khử trùng lặp dữ liệu.",
            "Hai hàm này hoàn toàn đồng nhất về mặt ngữ nghĩa."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Nhờ cơ chế này, công thức COUNT(*) - COUNT(col) chính là cách nhanh nhất để tìm số lượng ô bị khuyết thiếu (NULL count) trong Data Profiling."
        },
        {
          "question": "Khi nào một điều kiện lọc bắt buộc phải được đặt ở mệnh đề HAVING thay vì đặt ở mệnh đề WHERE?",
          "options": [
            "Khi điều kiện lọc liên quan đến cột kiểu dữ liệu ngày tháng.",
            "Khi điều kiện lọc được áp dụng trên kết quả của một hàm tổng hợp (ví dụ: SUM(amount) > 1000 hoặc COUNT(*) >= 2).",
            "Khi bảng dữ liệu có trên 1 triệu dòng.",
            "Khi câu lệnh có chứa mệnh đề ORDER BY."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Mệnh đề WHERE chạy ở Bước 2 trước khi hàm tổng hợp được tính toán, do đó các điều kiện dựa trên hàm tổng hợp bắt buộc phải đặt ở mệnh đề HAVING (thực thi ở Bước 4)."
        },
        {
          "question": "Để tính điểm thi trung bình của toàn bộ học sinh trong lớp mà coi những học sinh bỏ thi (điểm bị NULL) là 0 điểm, cách viết nào sau đây là chính xác?",
          "options": [
            "SELECT AVG(score) FROM exams;",
            "SELECT AVG(COALESCE(score, 0)) FROM exams;",
            "SELECT SUM(score) / COUNT(score) FROM exams;",
            "SELECT AVG(score) + 0 FROM exams;"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Hàm COALESCE(score, 0) biến các giá trị NULL thành 0, giúp hàm AVG tính đúng mẫu số gồm toàn bộ học sinh trong lớp."
        }
      ],
      "summary": [
        "GROUP BY phân bổ dữ liệu thành các cụm (Buckets); các cột trong SELECT bắt buộc phải nằm trong GROUP BY hoặc nằm trong hàm tổng hợp.",
        "COUNT(*) đếm toàn bộ dòng vật lý; COUNT(cột) và COUNT(DISTINCT cột) tự động bỏ qua các giá trị NULL.",
        "Hàm AVG(cột) chỉ chia cho số dòng phi-NULL. Muốn tính cả NULL, hãy dùng AVG(COALESCE(cột, 0)).",
        "HAVING lọc trên kết quả của hàm tổng hợp sau khi gom nhóm; WHERE lọc từng dòng thô trước khi gom nhóm.",
        "Ôn cách quãng: Tại sao mệnh đề WHERE không nhận diện được bí danh Alias đặt ở SELECT? (Xem lại Bài 1.4)."
      ]
    },
    {
      "id": "sql-09-joins-deep-dive",
      "number": "2.2",
      "title": "Bản Chất Của JOIN: Từ Tích Descartes Đến Hash Join, Fan-Out Trap & ON vs WHERE",
      "subtitle": "Giải mã cơ chế ghép bảng, cạm bẫy nhân số lượng dòng (Fan-out) và câu hỏi phân loại Senior: Điều kiện ở ON vs WHERE trong LEFT JOIN",
      "level": "Trung cấp",
      "duration": "50 phút",
      "keywords": [
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "CROSS JOIN",
        "Cartesian Product",
        "Fan-out trap",
        "ON vs WHERE",
        "Hash Join"
      ],
      "prerequisites": "Nắm vững mô hình quan hệ (Bài 0.1), CRUD (Bài 1.2) và vòng đời thực thi (Bài 1.4).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Hiểu bản chất toán học của phép JOIN: thực chất là tạo ra Tích Descartes (Cartesian Product) rồi áp dụng vị từ lọc.",
        "Phân biệt toàn diện 5 loại JOIN: INNER, LEFT, RIGHT, FULL OUTER và CROSS JOIN.",
        "Giải mã câu hỏi phân loại Senior: Sự khác biệt bản chất giữa điều kiện đặt ở ON vs đặt ở WHERE trong LEFT JOIN.",
        "Nhận diện và phòng chống cạm bẫy nhân dòng (Fan-out Trap) khi join quan hệ 1-Nhiều làm thổi phồng số liệu tài chính.",
        "Nắm vững 3 giải thuật ghép vật lý của Query Optimizer: Nested Loop Join, Hash Join và Sort-Merge Join."
      ],
      "intuition": {
        "title": "Bữa tiệc khiêu vũ ghép đôi và Vòng eo nhân dòng",
        "metaphor": "Hãy tưởng tượng một bữa tiệc khiêu vũ: có hàng Nam (Bảng A) và hàng Nữ (Bảng B):\n1. Tích Descartes (CROSS JOIN): Mỗi người nam bắt tay khiêu vũ với TẤT CẢ mọi người nữ trong phòng (nếu có 10 nam và 10 nữ sẽ sinh ra 100 cặp đôi!).\n2. INNER JOIN: Chỉ những cặp nam và nữ nào có cùng màu áo (điều kiện ON) mới được bước vào sàn nhảy cùng nhau. Ai mặc màu áo cọc cạch không tìm thấy bạn nhảy sẽ bị mời ra ngoài.\n3. LEFT JOIN: Mọi người nam ở hàng bên trái đều được bước vào sàn nhảy. Nếu tìm được bạn nữ cùng màu áo thì nhảy đôi; nếu không có ai cùng màu áo, bạn nam đó vẫn đứng trên sàn một mình (ghép với giá trị NULL).\n4. Bẫy Fan-Out: Nếu một bạn nam mặc áo đỏ bước vào, mà ở hàng nữ có tới 5 cô gái cùng mặc áo đỏ, thì anh chàng đó sẽ bị nhân bản thành 5 cặp đôi khác nhau trên sàn nhảy! Vòng eo dữ liệu đột ngột phình to gấp 5 lần!",
        "boundary": "Ẩn dụ này giải thích trực quan số lượng dòng sinh ra; tuy nhiên ở tầng engine RDBMS hiện đại, CSDL hầu như không bao giờ tạo ra toàn bộ tích Descartes rồi mới lọc (vì tốn RAM khủng khiếp), mà dùng các thuật toán thông minh như Hash Join hoặc Index Nested Loop.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">NESTED LOOP JOIN</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">O(M &times; log N)</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Bảng ngoài nhỏ, bảng trong có B-tree Index</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">|</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;\">HASH JOIN (VUA OLAP)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">O(M + N)</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Dựng Hash Table bảng nhỏ, quét bảng lớn</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">|</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">MERGE JOIN</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">O(M + N) sau sort</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Hai bảng đã sắp xếp sẵn theo join key</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--danger);\">⚠️ Fan-out Trap:</span>\n              <span>Khi JOIN quan hệ 1-Nhiều, các dòng bảng cha bị nhân bản theo số con. Luôn đếm <code>COUNT(*)</code> trước và sau khi JOIN để phát hiện nhân dòng ngoài ý muốn.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-09-problem-hook",
          "title": "Gợi mở: Cạm bẫy \"Bốc hơi\" khách hàng trong báo cáo CRM",
          "content": "\n            <p>Phòng Marketing yêu cầu bạn trích xuất danh sách <strong>toàn bộ khách hàng</strong> của TechMart kèm thông tin đơn hàng thành công ('COMPLETED') gần nhất để chuẩn bị quà tri ân. Với những khách hàng chưa từng mua hàng hoặc chưa có đơn thành công, họ muốn gửi voucher kích cầu.</p>\n            <p>Một lập trình viên tự tin viết câu lệnh:</p>\n            <pre class=\"code-pre\"><code>SELECT c.customer_id, c.full_name, o.order_id, o.status\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.status = 'COMPLETED'; -- CẠM BẪY CHẾT NGƯỜI!</code></pre>\n            <p><strong>Hậu quả thảm khốc:</strong> Báo cáo xuất ra chỉ vỏn vẹn 3 khách hàng! Toàn bộ các khách hàng tiềm năng chưa từng mua hàng (như khách số 5) hoặc chỉ có đơn PENDING (khách số 3) <strong>đã bị câu lệnh loại bỏ sạch sẽ không còn một dấu vết</strong>! Chiến dịch voucher kích cầu thất bại hoàn toàn.</p>\n            <p>Tại sao bạn đã dùng <code>LEFT JOIN</code> mà kết quả lại bị mất dòng của bảng bên trái? Vì mệnh đề <code>WHERE o.status = 'COMPLETED'</code> đã âm thầm <strong>biến câu lệnh LEFT JOIN của bạn thành INNER JOIN</strong>!</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-09-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra tư duy Ghép Bảng & Logic 3VL",
          "content": "\n            <p>Trước khi phân tích sâu cơ chế JOIN, hãy truy hồi 2 kiến thức nền tảng:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Theo thứ tự thực thi 8 bước logic của Bài 1.4, mệnh đề FROM / JOIN tạo ra bảng trung gian ảo VT1 như thế nào?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Mệnh đề FROM/JOIN thực thi đầu tiên ở <strong>Bước 1</strong>, nạp các trang dữ liệu từ đĩa và thực hiện phép tích ghép các bảng để tạo ra bảng ảo VT1 gồm toàn bộ các cột của các bảng tham gia.</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Khi một dòng của bảng bên phải không tìm thấy cặp ghép trong LEFT JOIN, các cột của bảng bên phải sẽ nhận giá trị gì?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Tất cả các cột của bảng bên phải sẽ được tự động điền giá trị <code>NULL</code>.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-09-concept-definition",
          "title": "Khái niệm cốt lõi: Năm Loại Phép JOIN Chuẩn ISO SQL",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Loại JOIN</th>\n                    <th scope=\"col\">Cú pháp SQL</th>\n                    <th scope=\"col\">Bản chất tập hợp</th>\n                    <th scope=\"col\">Xử lý dòng không khớp</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>INNER JOIN</strong></td>\n                    <td><code>FROM A JOIN B ON ...</code></td>\n                    <td>Phần giao (Intersection) giữa 2 bảng thỏa mãn điều kiện ON.</td>\n                    <td>Loại bỏ thẳng tay cả 2 phía.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>LEFT OUTER JOIN</strong></td>\n                    <td><code>FROM A LEFT JOIN B ON ...</code></td>\n                    <td>Giữ lại 100% dòng của bảng A (bên trái). Ghép với B nếu khớp.</td>\n                    <td>Nếu B không khớp, điền <code>NULL</code> vào các cột của B.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>RIGHT OUTER JOIN</strong></td>\n                    <td><code>FROM A RIGHT JOIN B ON ...</code></td>\n                    <td>Giữ lại 100% dòng của bảng B (bên phải). Ghép với A nếu khớp.</td>\n                    <td>Nếu A không khớp, điền <code>NULL</code> vào các cột của A.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>FULL OUTER JOIN</strong></td>\n                    <td><code>FROM A FULL JOIN B ON ...</code></td>\n                    <td>Hợp nhất (Union) tất cả các dòng của cả A và B.</td>\n                    <td>Bên nào không khớp thì điền <code>NULL</code> cho bên đó.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>CROSS JOIN</strong></td>\n                    <td><code>FROM A CROSS JOIN B</code></td>\n                    <td>Tích Descartes (Cartesian Product): Mỗi dòng A ghép với mọi dòng B.</td>\n                    <td>Sinh ra $N_A \times N_B$ dòng kết quả. Không cần mệnh đề ON.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-09-internal-mechanism",
          "title": "Cơ chế bên trong: Ba Giải Thuật Ghép Vật Lý Của Engine",
          "content": "\n            <p>Khi bạn viết câu lệnh JOIN, Query Optimizer sẽ chọn 1 trong 3 giải thuật vật lý dựa trên dung lượng bảng và chỉ mục:</p>\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Giải thuật ghép vật lý</th>\n                    <th scope=\"col\">Cơ chế hoạt động</th>\n                    <th scope=\"col\">Độ phức tạp</th>\n                    <th scope=\"col\">Khi nào Optimizer lựa chọn?</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Nested Loop Join</strong></td>\n                    <td>Vòng lặp lồng nhau: Duyệt từng dòng của bảng ngoài A, rồi tra cứu trong bảng trong B.</td>\n                    <td>$O(N_A \times log N_B)$ với Index<br>$O(N_A \times N_B)$ không Index</td>\n                    <td>Khi một trong hai bảng rất nhỏ (vài dòng) hoặc bảng trong có sẵn <strong>chỉ mục B-tree</strong> trên khóa join (Index Nested Loop).</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Hash Join</strong></td>\n                    <td>Bước 1 (Build): Nạp bảng nhỏ vào RAM tạo Bảng băm.<br>Bước 2 (Probe): Quét bảng lớn và tra mã băm.</td>\n                    <td>$O(N_A + N_B)$ (Tuyến tính)</td>\n                    <td><strong>Ông vua của OLAP:</strong> Dùng cho các bảng dữ liệu lớn, phép so sánh bằng (=), không cần chỉ mục trước.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Sort-Merge Join</strong></td>\n                    <td>Sắp xếp cả 2 bảng theo khóa join, sau đó dùng 2 con trỏ quét song song như khóa kéo áo (Zipper).</td>\n                    <td>$O(N log N)$ (Chi phí sắp xếp)</td>\n                    <td>Khi dữ liệu của cả 2 bảng đã được sắp xếp sẵn từ trước (ví dụ do Index Scan) hoặc khi điều kiện join là toán tử khoảng (&lt;, &gt;=).</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-09-worked-example",
          "title": "Ví dụ mẫu có lời giải: Thử Nghiệm Đối Chứng Điều Kiện ON vs WHERE Trong LEFT JOIN",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Xét hai câu lệnh sau trên bộ dữ liệu TechMart (bảng customers có 5 khách, bảng orders có 6 đơn):</p>\n              <pre class=\"code-pre\"><code>-- Câu A: Điều kiện đặt ở ON\nSELECT c.customer_id, o.order_id\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id AND o.status = 'COMPLETED';\n\n-- Câu B: Điều kiện đặt ở WHERE\nSELECT c.customer_id, o.order_id\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.status = 'COMPLETED';</code></pre>\n              <p>Theo bạn, Câu A và Câu B sẽ trả về bao nhiêu dòng? Có giống nhau không? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: KẾT QUẢ HOÀN TOÀN KHÁC NHAU! Câu A trả về 6 dòng, còn Câu B chỉ trả về 4 dòng!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong></p>\n                  <ul>\n                    <li><strong>Câu A (Điều kiện ở ON):</strong> Điều kiện <code>o.status = 'COMPLETED'</code> là tiêu chí ghép đôi ở Bước 1. Khách 1 có 1 đơn, khách 2 có 2 đơn, khách 4 có 1 đơn. Khách 3 (chỉ có đơn PENDING) và Khách 5 (chưa có đơn) không tìm thấy bạn nhảy, nhưng vì là LEFT JOIN, CSDL vẫn giữ lại Khách 3 và Khách 5 với order_id = NULL! Tổng cộng: 1 + 2 + 1 + 1 + 1 = <strong>6 dòng</strong> (Bảo toàn 100% khách hàng).</li>\n                    <li><strong>Câu B (Điều kiện ở WHERE):</strong> Mệnh đề WHERE thực thi ở Bước 2 (sau khi JOIN đã xong). Ở Bước 2, các dòng của Khách 3 và Khách 5 có <code>o.status = NULL</code>. Biểu thức <code>NULL = 'COMPLETED'</code> đánh giá ra <strong>UNKNOWN</strong>. Mệnh đề WHERE loại bỏ ngay Khách 3 và Khách 5! Chỉ còn lại <strong>4 dòng</strong>! Câu lệnh biến thành INNER JOIN trong âm thầm.</li>\n                  </ul>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Thực nghiệm đối chứng trực tiếp trên TechMart (PostgreSQL & DuckDB)",
              "code": "-- THỬ NGHIỆM CHUẨN: Điều kiện đặt ở ON (Bảo toàn trọn vẹn 5 khách hàng)\nSELECT \n    c.customer_id, \n    c.full_name, \n    o.order_id, \n    COALESCE(o.status, 'NO_COMPLETED_ORDER') AS effective_status\nFROM customers c\nLEFT JOIN orders o \n    ON c.customer_id = o.customer_id \n   AND o.status = 'COMPLETED'\nORDER BY c.customer_id ASC, o.order_id ASC;",
              "annotations": [
                {
                  "line": 7,
                  "text": "Điều kiện lọc chỉ áp dụng lên việc ghép đôi, bảo toàn toàn bộ dòng bảng khách hàng"
                }
              ],
              "explanation": "Đã kiểm chứng trên DuckDB 2.0.0, PostgreSQL 16 và SQLite 3.50.4. Cả 5 khách hàng đều có mặt trong kết quả.",
              "output": "+-------------+---------------+----------+--------------------+\n| customer_id | full_name     | order_id | effective_status   |\n+-------------+---------------+----------+--------------------+\n| 1           | Nguyen Van An | 1001     | COMPLETED          |\n| 2           | Tran Thi Binh | 1002     | COMPLETED          |\n| 2           | Tran Thi Binh | 1006     | COMPLETED          |\n| 3           | Le Van Cuong  | NULL     | NO_COMPLETED_ORDER |\n| 4           | Pham Thi Dung | 1005     | COMPLETED          |\n| 5           | Hoang Van Em  | NULL     | NO_COMPLETED_ORDER |\n+-------------+---------------+----------+--------------------+\n(6 rows returned - Đúng chuẩn báo cáo khách hàng)"
            }
          ]
        },
        {
          "id": "sec-09-faded-example",
          "title": "Bài điền khuyết (Faded Example): Đếm Số Đơn Hàng Chuẩn Xác Tránh Bẫy COUNT(*)",
          "content": "\n            <p>Để lập báo cáo tổng số đơn hàng đã đặt của toàn bộ khách hàng TechMart (kể cả khách chưa từng đặt đơn nào thì hiển thị 0 đơn), hãy điền các từ khóa và tên cột thích hợp vào vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>SELECT \n    c.customer_id,\n    c.full_name,\n    c.city,\n    [___1___]([___2___]) AS total_orders\nFROM customers c\n[___3___] JOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.full_name, c.city\n[___4___] total_orders DESC, c.customer_id ASC;</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = COUNT</code></li>\n                  <li><code>[___2___] = o.order_id</code> (BẮT BUỘC dùng cột của bảng phụ; nếu dùng <code>COUNT(*)</code>, khách hàng số 5 không có đơn nào vẫn bị đếm nhầm thành 1 đơn do dòng chứa NULL!).</li>\n                  <li><code>[___3___] = LEFT</code> (Phép ghép ngoài bảo toàn danh sách khách hàng).</li>\n                  <li><code>[___4___] = ORDER BY</code> (Sắp xếp kết quả phân loại).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-09-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Trong Phép JOIN",
          "content": "\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Cạm bẫy Fan-Out (Nhân số lượng dòng) khi Join 1-Nhiều</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> Bạn muốn tính tổng doanh thu bằng cách join bảng <code>orders</code> với bảng chi tiết <code>order_items</code>: <code>SELECT SUM(o.total_amount) FROM orders o JOIN order_items oi ON o.order_id = oi.order_id;</code></p>\n                <p><strong>Cơ chế sai:</strong> Một đơn hàng có 3 món hàng sẽ bị nhân bản thành 3 dòng. Khi bạn gọi <code>SUM(o.total_amount)</code>, tổng tiền của đơn hàng đó bị cộng dồn 3 lần! Doanh thu công ty bị thổi phồng sai lệch nghiêm trọng.</p>\n                <p><strong>Quy tắc vàng:</strong> Không bao giờ tính tổng hàm <code>SUM</code> trên cột của bảng cha sau khi đã join với bảng con có quan hệ 1-Nhiều. Hãy tính tổng trước ở bảng con bằng CTE/Subquery rồi mới join.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: CROSS JOIN vô tình do cú pháp cổ điển dấu phẩy</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Viết theo phong cách SQL cũ: <code>SELECT * FROM customers, orders;</code> mà quên mệnh đề WHERE.</p>\n                <p><strong>Hậu quả:</strong> CSDL thực hiện phép nhân Descartes $100.000 \times 100.000 = 10.000.000.000$ (10 tỷ dòng), làm tràn đĩa cứng tạm thời (Disk Spill) và treo cứng máy chủ CSDL!</p>\n                <p><strong>Cách phòng thủ:</strong> Luôn viết cú pháp tường minh chuẩn ANSI: <code>FROM A JOIN B ON A.id = B.id</code>.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-09-concept-comparison",
          "title": "So Sánh: Điều Kiện ở ON vs Điều Kiện ở WHERE",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí so sánh</th>\n                    <th scope=\"col\">Điều kiện đặt ở mệnh đề ON</th>\n                    <th scope=\"col\">Điều kiện đặt ở mệnh đề WHERE</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Thời điểm đánh giá</strong></td>\n                    <td>Bước 1 (Trong lúc thực hiện phép ghép JOIN)</td>\n                    <td>Bước 2 (Sau khi toàn bộ phép JOIN đã hoàn tất)</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Tác động trong INNER JOIN</strong></td>\n                    <td>Kết quả giống hệt nhau 100%</td>\n                    <td>Kết quả giống hệt nhau 100%</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Tác động trong LEFT JOIN</strong></td>\n                    <td><strong>Bảo toàn bảng bên trái:</strong> Dòng không thỏa điều kiện vẫn được giữ lại (điền NULL cho bảng phải).</td>\n                    <td><span class=\"dirty-val\">Hủy hoại LEFT JOIN:</span> Loại bỏ các dòng có giá trị NULL của bảng phải, biến tướng thành INNER JOIN!</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-09-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Đánh Đổi Bảng Phẳng (One Big Table - OBT) vs JOIN",
          "content": "\n            <p>Trong các kho dữ liệu hiện đại (Data Warehouse như Snowflake, BigQuery, ClickHouse), việc thực hiện nhiều phép JOIN trên các bảng hàng tỷ dòng tiêu tốn rất nhiều tài nguyên mạng để xáo trộn dữ liệu (Data Shuffling giữa các node tính toán).</p>\n            <p><strong>Xu hướng kiến trúc Bảng phẳng (One Big Table - OBT / Denormalization):</strong> Kỹ sư dữ liệu chủ động thực hiện JOIN sẵn ở tầng ETL/ELT ban đêm để tạo ra một bảng duy nhất chứa cả thông tin khách hàng, đơn hàng và sản phẩm. Khi phân tích viên viết truy vấn, họ không cần JOIN nữa, tốc độ quét cột cực nhanh.</p>\n            <p><strong>Đánh đổi:</strong> Dung lượng lưu trữ phình to do lặp lại dữ liệu (tuy nhiên chi phí lưu trữ đĩa ngày nay rất rẻ so với chi phí CPU tính toán JOIN).</p>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "CROSS JOIN vô tình do quên mệnh đề ON",
            "content": "Trong cú pháp SQL cổ điển viết bằng dấu phẩy (FROM customers, orders), nếu bạn quên viết điều kiện WHERE customers.id = orders.cust_id, CSDL sẽ chạy phép nhân chéo CROSS JOIN sinh ra hàng tỷ dòng làm treo máy chủ!"
          },
          {
            "title": "Bẫy đếm COUNT(*) trong LEFT JOIN",
            "content": "Trong LEFT JOIN, nếu dùng COUNT(*) thì bản ghi không có liên kết vẫn bị đếm là 1 dòng (vì dòng đó chứa NULL nhưng vẫn là 1 dòng vật lý). Luôn dùng COUNT(bảng_phụ.id) để ra kết quả 0."
          }
        ],
        "tips": [
          {
            "title": "Semi-join và Anti-join",
            "content": "Semi-join (giữ lại dòng bảng A nếu tồn tại bên bảng B nhưng không nhân dòng) và Anti-join (lấy dòng bảng A không tồn tại bên B) là hai vũ khí tối thượng được tối ưu hóa cực mạnh thông qua EXISTS và NOT EXISTS."
          }
        ],
        "deepDive": {
          "title": "Cơ chế nội bộ: Build Phase và Probe Phase của Thuật toán Hash Join",
          "content": "<p>Thuật toán <strong>Hash Join</strong> là trái tim của các hệ quản trị CSDL quan hệ hiện đại khi ghép nối hai tập dữ liệu lớn không có chỉ mục sẵn. Quá trình gồm 2 giai đoạn tách biệt:</p><p><strong>1. Build Phase:</strong> Engine chọn bảng nhỏ hơn (gọi là Build Relation), đọc toàn bộ các dòng và áp dụng hàm băm (Hash Function) trên khóa nối để xây dựng một bảng băm trong bộ nhớ RAM.</p><p><strong>2. Probe Phase:</strong> Engine đọc từng dòng của bảng lớn hơn (Probe Relation), áp dụng cùng hàm băm để tra cứu trực tiếp vào bảng băm vừa dựng. Nếu tìm thấy khóa khớp, cặp dòng được ghép nối và xuất ngay vào luồng kết quả. Nếu bảng nhỏ vượt quá dung lượng <code>work_mem</code>, engine tự động chuyển sang <strong>Hybrid Hash Join</strong> chia thành nhiều Batch ghi tạm ra ổ cứng.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 2.2-1 (Dự đoán kết quả): Bẫy Fan-Out khi join bảng 1-Nhiều",
          "level": "Cơ bản",
          "problem": "Đơn hàng 1001 có giá trị `total_amount = 4.000.000đ` và có 2 món hàng trong bảng `order_items`. Nếu thực thi truy vấn:\nSELECT SUM(o.total_amount) FROM orders o JOIN order_items oi ON o.order_id = oi.order_id WHERE o.order_id = 1001;\nKết quả trả về là bao nhiêu và vì sao?",
          "hint": "Kiểm tra số dòng sinh ra sau phép JOIN trước khi tính SUM.",
          "solutionCode": "-- Phép JOIN sinh ra 2 dòng cho đơn hàng 1001:\n-- Dòng 1: order_id 1001, item_id 1, total_amount 4000000\n-- Dòng 2: order_id 1001, item_id 2, total_amount 4000000\n-- Hàm SUM cộng dồn: 4.000.000 + 4.000.000 = 8.000.000đ!",
          "solutionOutput": "8000000.00 (Bị thổi phồng gấp đôi!)",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ kết quả ra 4 triệu, bạn đã quên rằng phép JOIN nhân số lượng dòng của bảng cha theo số dòng của bảng con (Fan-out Trap)."
        },
        {
          "title": "Bài tập 2.2-2 (Tìm & Sửa lỗi): Khắc phục lỗi biến LEFT JOIN thành INNER JOIN",
          "level": "Trung bình",
          "problem": "Một báo cáo cần hiển thị tất cả sản phẩm của TechMart kèm thông tin bán hàng ngày 01/06/2023. Câu lệnh hiện tại:\n```sql\nSELECT p.product_id, p.product_name, oi.quantity\nFROM products p\nLEFT JOIN order_items oi ON p.product_id = oi.product_id\nJOIN orders o ON oi.order_id = o.order_id\nWHERE o.order_date = \"2023-06-01\";\n```\nCâu lệnh chỉ hiển thị sản phẩm bán được ngày 01/06, làm biến mất các sản phẩm khác. Hãy sửa lại câu lệnh để giữ lại toàn bộ 5 sản phẩm của kho hàng.",
          "hint": "Chuyển toàn bộ phép JOIN liên hoàn thành LEFT JOIN và đưa điều kiện ngày vào mệnh đề ON.",
          "solutionCode": "-- Viết lại chuẩn xác:\nSELECT p.product_id, p.product_name, oi.quantity\nFROM products p\nLEFT JOIN order_items oi ON p.product_id = oi.product_id\nLEFT JOIN orders o ON oi.order_id = o.order_id AND o.order_date = '2023-06-01';",
          "solutionOutput": "Toàn bộ 5 sản phẩm đều xuất hiện; các sản phẩm không bán ngày 01/06 có quantity là NULL.",
          "explanation": "Chẩn đoán lỗi: Việc dùng INNER JOIN với bảng orders và điều kiện ở WHERE đã phá hủy hoàn toàn đặc tính giữ dòng của LEFT JOIN."
        },
        {
          "title": "Bài tập 2.2-3 (Tự viết truy vấn): Báo cáo chi tiêu từng khách hàng kèm số lượng sản phẩm",
          "level": "Nâng cao",
          "problem": "Từ bộ dữ liệu TechMart, viết truy vấn lấy danh sách tất cả 5 khách hàng gồm: `customer_id`, `full_name`, và `total_items_bought` (tổng số lượng món hàng đã mua từ các đơn COMPLETED). Khách chưa mua món nào hiển thị 0.",
          "hint": "LEFT JOIN từ customers sang orders (lọc status COMPLETED ở ON), sau đó LEFT JOIN sang order_items, dùng SUM(COALESCE(oi.quantity, 0)).",
          "solutionCode": "SELECT \n    c.customer_id,\n    c.full_name,\n    COALESCE(SUM(oi.quantity), 0) AS total_items_bought\nFROM customers c\nLEFT JOIN orders o \n    ON c.customer_id = o.customer_id \n   AND o.status = 'COMPLETED'\nLEFT JOIN order_items oi \n    ON o.order_id = oi.order_id\nGROUP BY c.customer_id, c.full_name\nORDER BY total_items_bought DESC, c.customer_id ASC;",
          "solutionOutput": "+-------------+---------------+--------------------+\n| customer_id | full_name     | total_items_bought |\n+-------------+---------------+--------------------+\n| 2           | Tran Thi Binh | 3                  |\n| 1           | Nguyen Van An | 2                  |\n| 4           | Pham Thi Dung | 1                  |\n| 3           | Le Van Cuong  | 0                  |\n| 5           | Hoang Van Em  | 0                  |\n+-------------+---------------+--------------------+\n(5 rows - Đã kiểm chứng trên PostgreSQL 16 & DuckDB 2.0.0)",
          "explanation": "Truy vấn kết hợp hai tầng LEFT JOIN an toàn và xử lý COALESCE triệt để."
        },
        {
          "title": "Bài tập 2.2-4 (Đánh đổi & Kiến trúc): Hash Join vs Index Nested Loop Join",
          "level": "Nâng cao",
          "problem": "Trong một hệ thống ngân hàng xử lý giao dịch thời gian thực (OLTP), tại sao các kỹ sư lại ưu tiên ép câu lệnh dùng Index Nested Loop Join thay vì Hash Join? Ngược lại, tại sao trong kho dữ liệu (OLAP) người ta lại chuộng Hash Join?",
          "hint": "So sánh thời gian phản hồi dòng đầu tiên (Latency / First Row) vs Băng thông quét toàn bộ dữ liệu (Throughput).",
          "solutionCode": "-- Phân tích kiến trúc:\n-- 1. Trong OLTP (Giao dịch thời gian thực):\n--    - Yêu cầu độ trễ cực thấp (< 5ms) cho từng giao dịch đơn lẻ.\n--    - Index Nested Loop Join chỉ cần tra cứu trên B-tree một vài khối đĩa và trả về kết quả ngay lập tức mà không cần quét bảng.\n-- 2. Trong OLAP (Kho dữ liệu phân tích):\n--    - Cần quét và phân tích hàng triệu dòng dữ liệu lịch sử.\n--    - Hash Join xây dựng bảng băm trong RAM và quét tuyến tính cực nhanh, tận dụng được tính toán song song đa luồng của CPU.",
          "solutionOutput": "Đánh đổi giữa độ trễ tra cứu đơn điểm (Point Lookup) và thông lượng quét dữ liệu lớn (Batch Processing).",
          "explanation": "Hiểu rõ sự khác biệt giữa OLTP và OLAP là nền tảng cốt tử của một Senior Data Engineer."
        }
      ],
      "quiz": [
        {
          "question": "Điều gì xảy ra khi bạn viết một điều kiện lọc trên cột của bảng bên phải trong mệnh đề WHERE của một câu lệnh LEFT JOIN?",
          "options": [
            "Câu lệnh báo lỗi cú pháp vì LEFT JOIN không cho phép dùng WHERE.",
            "Câu lệnh vẫn giữ lại toàn bộ các dòng của bảng bên trái bình thường.",
            "Mệnh đề WHERE sẽ loại bỏ các dòng có giá trị NULL của bảng bên phải, vô tình biến câu lệnh thành INNER JOIN.",
            "CSDL sẽ tự động đổi câu lệnh thành FULL OUTER JOIN."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Vì WHERE lọc sau khi đã JOIN, các dòng giữ lại do không khớp của bảng bên phải (có giá trị NULL) sẽ bị WHERE đánh giá là UNKNOWN hoặc FALSE và bị loại bỏ thẳng tay."
        },
        {
          "question": "Cạm bẫy Fan-Out trong phép JOIN xảy ra trong tình huống nào sau đây?",
          "options": [
            "Khi join hai bảng có cùng cấu trúc cột.",
            "Khi thực hiện join hai bảng có mối quan hệ 1-Nhiều, khiến một dòng của bảng cha bị nhân bản thành nhiều dòng kết quả, làm sai lệch các phép tính tổng SUM.",
            "Khi câu lệnh join bị thiếu mệnh đề LIMIT.",
            "Khi tên cột của hai bảng trùng nhau."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Nếu 1 đơn hàng có 5 món hàng, phép JOIN với bảng order_items sẽ sinh ra 5 dòng cho đơn hàng đó, làm nhân bản giá trị của các cột thuộc bảng cha."
        },
        {
          "question": "Thuật toán ghép vật lý nào sau đây của CSDL xây dựng một bảng băm (Hash Table) trong bộ nhớ RAM từ bảng nhỏ hơn rồi quét bảng lớn để đối chiếu?",
          "options": [
            "Nested Loop Join",
            "Sort-Merge Join",
            "Hash Join",
            "Cross Cartesian Join"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Hash Join hoạt động qua 2 pha: Build Phase (xây bảng băm) và Probe Phase (tra cứu bảng băm), cực kỳ tối ưu cho các tác vụ phân tích dữ liệu lớn."
        },
        {
          "question": "Trong câu lệnh LEFT JOIN giữa bảng khách hàng (bên trái) và đơn hàng (bên phải), để đếm chính xác số đơn hàng của từng khách hàng (kể cả khách chưa có đơn nào thì ra số 0), cách viết nào sau đây là đúng?",
          "options": [
            "COUNT(*)",
            "COUNT(customers.customer_id)",
            "COUNT(orders.order_id)",
            "SUM(orders.order_id)"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Với khách hàng chưa có đơn, cột orders.order_id mang giá trị NULL, hàm COUNT(orders.order_id) sẽ bỏ qua NULL và trả về 0. Nếu dùng COUNT(*), dòng đó vẫn bị đếm là 1!"
        },
        {
          "question": "Toán tử CROSS JOIN giữa một bảng A có 2.000 dòng và một bảng B có 5.000 dòng sẽ tạo ra một tập kết quả trung gian có bao nhiêu dòng?",
          "options": [
            "7.000 dòng",
            "3.000 dòng",
            "10.000.000 dòng (10 triệu dòng)",
            "2.000 dòng"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! CROSS JOIN tạo ra tích Descartes: 2.000 x 5.000 = 10.000.000 dòng. Nếu không kiểm soát, tích Descartes có thể làm tràn bộ nhớ và sập máy chủ."
        }
      ],
      "summary": [
        "JOIN về mặt toán học là phép tích Descartes kèm vị từ lọc; engine thực thi bằng Nested Loop, Hash Join hoặc Sort-Merge.",
        "Trong LEFT JOIN: điều kiện ở ON quyết định việc ghép đôi; điều kiện ở WHERE lọc sau khi ghép và có thể biến tướng thành INNER JOIN.",
        "Cẩn giác bẫy Fan-Out khi join quan hệ 1-Nhiều: không bao giờ SUM trực tiếp trên cột của bảng cha sau khi đã join bảng con nhiều dòng.",
        "Sử dụng COUNT(bảng_phụ.id) trong LEFT JOIN để hiển thị đúng số lượng 0 cho các bản ghi không có liên kết.",
        "Ôn cách quãng: Tại sao phép chia số nguyên 5 / 2 trong SQL truyền thống lại ra 2 thay vì 2.5? (Xem lại Bài 1.1)."
      ]
    },
    {
      "id": "sql-10-set-operations",
      "number": "2.3",
      "title": "Đại Số Quan Hệ & Toán Tử Tập Hợp: UNION, UNION ALL, INTERSECT, EXCEPT",
      "subtitle": "Ghép nối theo chiều dọc (Set Operations) vs Ghép nối theo chiều ngang (JOIN) và bài học tối ưu hiệu năng đắt giá",
      "level": "Trung cấp",
      "duration": "40 phút",
      "keywords": [
        "Set Operations",
        "UNION",
        "UNION ALL",
        "INTERSECT",
        "EXCEPT",
        "MINUS",
        "Khử trùng lặp",
        "Set Theory"
      ],
      "prerequisites": "Hiểu bản chất tập hợp và đa tập (Bài 0.1), các loại JOIN (Bài 2.2).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân biệt bản chất khác nhau giữa phép ghép ngang (JOIN: nối thêm cột) và phép toán tập hợp dọc (Set Operations: nối thêm dòng).",
        "Làm chủ 4 toán tử tập hợp: UNION, UNION ALL, INTERSECT (Giao) và EXCEPT / MINUS (Hiệu).",
        "Hiểu chi phí hiệu năng nặng nề của phép khử trùng lặp trong UNION và quy tắc ưu tiên sử dụng UNION ALL trong xử lý dữ liệu lớn.",
        "Nắm vững điều kiện tương thích tập hợp (Union-compatible): cùng số lượng cột và tương thích họ kiểu dữ liệu.",
        "Xử lý an toàn mệnh đề ORDER BY khi kết hợp với các toán tử tập hợp."
      ],
      "intuition": {
        "title": "May thêm túi áo (JOIN) vs Nối dài tà áo (UNION)",
        "metaphor": "Hãy tưởng tượng chiếc áo bạn đang mặc:\n1. Phép JOIN giống như việc bạn may thêm một chiếc túi hoặc một chiếc tay áo mới: cơ thể chiếc áo của bạn mở rộng theo CHIỀU NGANG (thêm nhiều thuộc tính, nhiều cột mới).\n2. Phép toán tập hợp (UNION) giống như việc bạn may nối thêm một mảnh vải vào gấu áo phía dưới: chiếc áo dài thêm theo CHIỀU DỌC (thêm nhiều dòng dữ liệu mới có cùng cấu trúc).\n3. UNION ALL giống như bạn cứ thế may ghép hai cuộn vải lại với nhau; còn UNION thông thường giống như việc bạn bắt thợ may phải soi kính lúp kiểm tra từng sợi chỉ xem có mảnh vải nào bị trùng lặp hoa văn không thì cắt bỏ đi (tốn rất nhiều thời gian và công sức!).",
        "boundary": "Ẩn dụ này rất rõ ràng; tuy nhiên quy tắc bắt buộc trong SQL là: hai tập hợp muốn thực hiện toán tử tập hợp phải tương thích về kiểu dữ liệu (Union-compatible: cùng số lượng cột và cùng họ kiểu dữ liệu tương ứng theo thứ tự).",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:140px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--success);font-weight:700;\">UNION ALL</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">A &cup; B (Đa tập)</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">O(1) Streaming, giữ trùng lặp</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">vs</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">UNION</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">A &cup; B (Tập hợp)</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">O(N log N) Sort Unique khử trùng</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">vs</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">INTERSECT</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">A &cap; B (Giao)</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Chỉ lấy phần tử có ở cả hai tập</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">vs</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">EXCEPT</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">A  B (Hiệu)</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Thuộc A nhưng KHÔNG thuộc B</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Chuẩn Data Pipeline:</span>\n              <span>Luôn ưu tiên <code>UNION ALL</code> trong các luồng ETL/ELT xử lý dữ liệu lớn để tránh lãng phí RAM và tràn bộ nhớ ra đĩa (Spill to disk).</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-10-problem-hook",
          "title": "Gợi mở: Pipeline ETL nghẽn tắc 4 tiếng vì một chữ \"ALL\"",
          "content": "\n            <p>Một tập đoàn thương mại điện tử có 12 chi nhánh trên toàn quốc. Mỗi đêm, một đường ống dữ liệu (ETL Pipeline) có nhiệm vụ hợp nhất các giao dịch bán hàng từ 12 cơ sở dữ liệu chi nhánh về Kho dữ liệu trung tâm (Data Warehouse).</p>\n            <p>Kỹ sư phụ trách đã viết câu lệnh gộp bằng toán tử <code>UNION</code>:</p>\n            <pre class=\"code-pre\"><code>SELECT * FROM branch_hn\nUNION\nSELECT * FROM branch_sg\nUNION\n... (12 chi nhánh);</code></pre>\n            <p><strong>Thảm họa hiệu năng:</strong> Pipeline này chạy mất <strong>hơn 4 tiếng đồng hồ</strong> và thường xuyên bị lỗi sập máy chủ do tràn bộ nhớ (Out of Memory)!</p>\n            <p>Khi một Senior Data Engineer vào kiểm tra, anh chỉ thêm đúng chữ <code>ALL</code> vào sau mỗi chữ <code>UNION</code> (thành <code>UNION ALL</code>). Kết quả kỳ diệu xảy ra: <strong>Thời gian chạy giảm từ 4 tiếng xuống còn đúng 3 phút</strong>! Vì sao lại có sự chênh lệch khủng khiếp như vậy? Vì <code>UNION</code> ép CSDL phải gom 50 triệu dòng vào RAM để thực hiện sắp xếp và khử trùng lặp (Sort Unique), trong khi dữ liệu từ các chi nhánh khác nhau có mã đơn độc lập vốn dĩ không bao giờ trùng nhau!</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-10-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra tư duy Đa tập vs Tập hợp",
          "content": "\n            <p>Trước khi gộp các tập kết quả, hãy truy hồi 2 câu hỏi từ Bài 0.1 và Bài 2.2:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Trong Bài 0.1, tại sao SQL lại chọn mô hình Đa tập (Multiset/Bag) thay vì Tập hợp thuần túy (Set Theory)?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Vì thao tác khử trùng lặp sau mỗi phép tính đòi hỏi chi phí sắp xếp (Sort) hoặc băm (Hash) tốn kém $O(N log N)$ tài nguyên, làm chậm thao tác nạp dữ liệu.</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Phép JOIN mở rộng bảng theo chiều nào và Toán tử tập hợp mở rộng theo chiều nào?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Phép <code>JOIN</code> ghép nối theo <strong>CHIỀU NGANG</strong> (thêm cột mới); trong khi Toán tử tập hợp (Set Operations) ghép nối theo <strong>CHIỀU DỌC</strong> (thêm dòng mới).</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-10-concept-definition",
          "title": "Khái niệm cốt lõi: Bốn Toán Tử Tập Hợp Chuẩn ISO SQL",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Toán tử</th>\n                    <th scope=\"col\">Ý nghĩa toán học</th>\n                    <th scope=\"col\">Cơ chế khử trùng lặp</th>\n                    <th scope=\"col\">Hiệu năng tương đối</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><code>UNION ALL</code></td>\n                    <td>Phép hợp đa tập ($A ∪_{bag} B$)</td>\n                    <td><strong>KHÔNG khử trùng:</strong> Giữ nguyên toàn bộ các dòng của cả 2 tập.</td>\n                    <td><strong>Siêu nhanh</strong> ($O(1)$ bộ nhớ, luồng streaming nối tiếp).</td>\n                  </tr>\n                  <tr>\n                    <td><code>UNION</code></td>\n                    <td>Phép hợp tập hợp ($A ∪ B$)</td>\n                    <td><strong>CÓ khử trùng:</strong> Gộp lại và loại bỏ tất cả các dòng trùng lặp.</td>\n                    <td>Chậm ($O(N log N)$ CPU và RAM để Sort/Hash Unique).</td>\n                  </tr>\n                  <tr>\n                    <td><code>INTERSECT</code></td>\n                    <td>Phép giao tập hợp ($A ∩ B$)</td>\n                    <td>Chỉ lấy các dòng xuất hiện ở <strong>CẢ HAI</strong> câu truy vấn.</td>\n                    <td>Cần băm hoặc sắp xếp để tìm điểm giao.</td>\n                  </tr>\n                  <tr>\n                    <td><code>EXCEPT</code> / <code>MINUS</code></td>\n                    <td>Phép trừ tập hợp ($A setminus B$)</td>\n                    <td>Lấy các dòng có ở tập A nhưng <strong>KHÔNG CÓ</strong> ở tập B.</td>\n                    <td>Tìm phần bù, tự động khử trùng lặp kết quả.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-10-internal-mechanism",
          "title": "Cơ chế bên trong: Streaming Append vs Sort Unique & Xử Lý NULL",
          "content": "\n            <p><strong>A. Streaming Append của UNION ALL đối đầu Sort/Hash Unique của UNION:</strong></p>\n            <ul>\n              <li>Trong <code>UNION ALL</code>, engine CSDL chỉ cần mở con trỏ nạp dữ liệu từ câu lệnh 1, đẩy thẳng lên tầng mạng, sau đó mở tiếp con trỏ câu lệnh 2 và đẩy tiếp. Dung lượng RAM tiêu tốn chỉ là vài Kilobyte cho bộ đệm!</li>\n              <li>Trong <code>UNION</code>, CSDL bắt buộc phải đọc toàn bộ dữ liệu của cả 2 câu lệnh, nạp vào một vùng nhớ tạm (work_mem). Nếu dữ liệu vượt quá RAM, CSDL phải ghi các block tạm xuống ổ cứng (Disk Spill) để sắp xếp ngoài (External Merge Sort), khiến tốc độ I/O sụt giảm nghiêm trọng!</li>\n            </ul>\n\n            <p><strong>B. Quy tắc xử lý NULL trong toán tử tập hợp:</strong></p>\n            <p>Khác với mệnh đề WHERE (nơi mà <code>NULL = NULL</code> trả về <code>UNKNOWN</code>), trong các toán tử tập hợp (UNION, INTERSECT, EXCEPT), <strong>chuẩn ISO quy định coi hai giá trị NULL là hoàn toàn bằng nhau</strong>! Do đó, hai dòng toàn NULL khi đi qua UNION sẽ bị gộp thành 1 dòng duy nhất.</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-10-worked-example",
          "title": "Ví dụ mẫu có lời giải: Tìm Khách Hàng Chưa Từng Mua Hàng Bằng EXCEPT",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Bảng <code>customers</code> của TechMart có 5 khách hàng (mã 1 đến 5). Bảng <code>orders</code> có các đơn hàng thuộc về khách hàng 1, 2, 3, 4. Khi thực thi câu truy vấn:</p>\n              <pre class=\"code-pre\"><code>SELECT customer_id FROM customers\nEXCEPT\nSELECT customer_id FROM orders;</code></pre>\n              <p>Kết quả trả về sẽ gồm những khách hàng nào? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: CHỈ TRẢ VỀ DUY NHẤT KHÁCH HÀNG SỐ 5!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong> Tập A gồm {1, 2, 3, 4, 5}. Tập B gồm {1, 2, 3, 4}. Toán tử EXCEPT thực hiện phép trừ tập hợp: $A setminus B = {5}$. Đây là cách tư duy tập hợp thuần túy và trực quan nhất để tìm kiếm tập phần bù.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Tìm khách hàng chưa từng mua hàng bằng EXCEPT trên TechMart",
              "code": "SELECT customer_id FROM customers\nEXCEPT\nSELECT customer_id FROM orders;",
              "explanation": "Đã kiểm chứng trên DuckDB 2.0.0, PostgreSQL 16 và SQLite 3.50.4. Khách hàng số 5 (Hoang Van Em) được tìm thấy chính xác.",
              "output": "+-------------+\n| customer_id |\n+-------------+\n| 5           |\n+-------------+\n(1 row returned)"
            }
          ]
        },
        {
          "id": "sec-10-faded-example",
          "title": "Bài điền khuyết (Faded Example): Hợp Nhất Nguồn Dữ Liệu Bằng UNION ALL",
          "content": "\n            <p>Để tạo báo cáo tổng hợp danh mục sản phẩm từ 2 nguồn kho khác nhau mà không làm tốn chi phí khử trùng lặp, hãy điền các từ khóa thích hợp vào vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>SELECT product_id, product_name, price, 'Kho Ha Noi' AS warehouse_source\nFROM products_hanoi\n[___1___] [___2___]\nSELECT product_id, product_name, price, 'Kho Sai Gon' AS warehouse_source\nFROM products_saigon\n[___3___] [___4___] ASC;</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = UNION</code></li>\n                  <li><code>[___2___] = ALL</code> (Bắt buộc dùng UNION ALL để tối ưu hiệu năng streaming).</li>\n                  <li><code>[___3___] = ORDER</code></li>\n                  <li><code>[___4___] = BY product_id</code> (Mệnh đề ORDER BY chỉ được phép đặt ở cuối cùng của toàn bộ câu lệnh hợp nhất).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-10-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Trong Toán Tử Tập Hợp",
          "content": "\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Không tương thích số lượng cột hoặc kiểu dữ liệu</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Truy vấn 1 chọn 3 cột, nhưng truy vấn 2 chọn 4 cột; hoặc cột thứ 2 ở truy vấn 1 là số nguyên INT nhưng ở truy vấn 2 lại là DATE không thể ép kiểu tự động.</p>\n                <p><strong>Hậu quả:</strong> CSDL báo lỗi biên dịch ngay lập tức: <code>each UNION query must have the same number of columns</code>.</p>\n                <p><strong>Quy tắc vàng:</strong> Luôn kiểm tra tính tương thích số lượng và thứ tự kiểu dữ liệu của các cột trong từng nhánh SELECT.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Đặt mệnh đề ORDER BY ở giữa các nhánh UNION</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> <code>SELECT col FROM t1 ORDER BY col UNION ALL SELECT col FROM t2;</code></p>\n                <p><strong>Cơ chế sai:</strong> Chuẩn SQL coi các nhánh con của UNION là các tập hợp không có thứ tự. Mệnh đề <code>ORDER BY</code> chỉ được phép xuất hiện <strong>MỘT LẦN DUY NHẤT ở cuối cùng</strong> để định thứ tự cho toàn bộ tập kết quả hợp nhất.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-10-concept-comparison",
          "title": "So Sánh: UNION vs UNION ALL & EXCEPT vs NOT IN",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí</th>\n                    <th scope=\"col\">UNION ALL</th>\n                    <th scope=\"col\">UNION</th>\n                    <th scope=\"col\">Khi nào dùng cái nào?</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Khử trùng lặp</strong></td>\n                    <td>Không khử (Giữ trọn vẹn)</td>\n                    <td>Có khử trùng lặp hoàn toàn</td>\n                    <td rowspan=\"3\"><strong>UNION ALL:</strong> Chuẩn mặc định cho 95% luồng ETL / Data Pipeline.<br><strong>UNION:</strong> Chỉ dùng khi nghiệp vụ bắt buộc loại bỏ trùng lặp và tập dữ liệu vừa phải.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Chi phí bộ nhớ</strong></td>\n                    <td>$O(1)$ cực thấp (Streaming)</td>\n                    <td>$O(N)$ cao (Bộ nhớ Sort/Hash)</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Tốc độ</strong></td>\n                    <td>Nhanh gấp 5-10 lần UNION</td>\n                    <td>Chậm trên bảng lớn</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n\n            <div class=\"sql-result-container\" style=\"margin-top:16px;\">\n              <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí</th>\n                    <th scope=\"col\">EXCEPT (hoặc MINUS)</th>\n                    <th scope=\"col\">NOT IN (với Subquery)</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Bản chất</strong></td>\n                    <td>Toán tử đại số quan hệ thuần túy</td>\n                    <td>Vị từ điều kiện lọc trong WHERE</td>\n                  </tr>\n                  <tr>\n                    <td><strong>An toàn với NULL?</strong></td>\n                    <td><strong>AN TOÀN TUYỆT ĐỐI:</strong> Coi 2 NULL là bằng nhau, không bị lỗi.</td>\n                    <td><span class=\"dirty-val\">BẪY TỬ THẦN:</span> Nếu subquery có chứa NULL, kết quả biến thành rỗng!</td>\n                  </tr>\n                </tbody>\n              </table>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-10-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Khác Biệt Giữa Các Hệ & Kỹ Thuật Partition Pruning",
          "content": "\n            <p><strong>A. Khác biệt cú pháp: EXCEPT vs MINUS:</strong></p>\n            <ul>\n              <li>Trong PostgreSQL, DuckDB, SQLite và SQL Server, phép trừ tập hợp sử dụng từ khóa chuẩn ISO: <code>EXCEPT</code>.</li>\n              <li>Trong cơ sở dữ liệu Oracle, từ khóa này được gọi là <code>MINUS</code>.</li>\n            </ul>\n\n            <p><strong>B. Kỹ thuật Partition Pruning trong kho dữ liệu:</strong></p>\n            <p>Khi gộp dữ liệu theo thời gian (ví dụ đơn hàng các năm 2021, 2022, 2023) được lưu ở các bảng phân vùng khác nhau, việc dùng <code>UNION ALL</code> kết hợp các điều kiện lọc thời gian ở từng nhánh cho phép Query Optimizer thực hiện <strong>Partition Pruning</strong>: chỉ đọc đúng phân vùng cần thiết từ đĩa cứng và bỏ qua hoàn toàn các phân vùng còn lại, tiết kiệm hàng Terabyte băng thông đọc.</p>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lệch số lượng hoặc kiểu dữ liệu giữa hai mệnh đề SELECT",
            "content": "Toán tử tập hợp đòi hỏi tính tương thích tuyệt đối. Nếu câu truy vấn 1 trả về 3 cột mà câu truy vấn 2 trả về 4 cột, CSDL sẽ từ chối thực thi ngay lập tức."
          },
          {
            "title": "Lạm dụng UNION thay vì UNION ALL trong Data Pipeline",
            "content": "Dùng UNION trên tập dữ liệu hàng chục triệu dòng có thể làm chậm truy vấn gấp 10 lần và gây tràn đĩa tạm (Disk Spill). Luôn ưu tiên dùng UNION ALL."
          }
        ],
        "tips": [
          {
            "title": "Thêm cột giả lập định danh nguồn",
            "content": "Khi gộp nhiều bảng bằng UNION ALL, hãy luôn thêm một cột hằng số chỉ rõ nguồn dữ liệu (ví dụ: SELECT *, \"source_a\" AS data_source FROM table_a) để dễ dàng đối soát."
          }
        ],
        "deepDive": {
          "title": "Bản chất thuật toán: Hashed Set Operations vs Merge Set Operations trong RDBMS",
          "content": "<p>Khi thực hiện <code>INTERSECT</code> hoặc <code>EXCEPT</code>, chuẩn SQL đòi hỏi phải xác định được dòng nào xuất hiện ở cả hai tập hoặc chỉ xuất hiện ở tập thứ nhất, đồng thời mặc định phải khử trùng lặp (Set semantics).</p><p>Trong PostgreSQL, engine sử dụng toán tử <strong>SetOp</strong> với 2 chiến lược: <strong>Hashed SetOp</strong> (dựng bảng băm lưu trữ bản ghi kèm cờ đếm số lần xuất hiện ở từng vế) hoặc <strong>Sorted SetOp</strong> (sắp xếp cả 2 tập kết quả rồi duyệt song song như hai con trỏ). Nhờ hiểu rõ cơ chế này, bạn sẽ nhận ra vì sao việc dùng <code>UNION ALL</code> lại nhanh gấp 5-10 lần <code>UNION</code>: nó bỏ qua hoàn toàn bước băm gom nhóm và sắp xếp tốn kém này!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 2.3-1 (Dự đoán kết quả): Số lượng dòng khi UNION vs UNION ALL",
          "level": "Cơ bản",
          "problem": "Bảng A có 3 dòng: [1, 2, 2]. Bảng B có 2 dòng: [2, 3].\nCâu lệnh SELECT num FROM A UNION ALL SELECT num FROM B trả về bao nhiêu dòng?\nCâu lệnh SELECT num FROM A UNION SELECT num FROM B trả về bao nhiêu dòng?",
          "hint": "Đếm tổng số dòng vs số lượng phần tử duy nhất phân biệt.",
          "solutionCode": "-- 1. UNION ALL: Ghép nối đơn thuần toàn bộ các dòng\n-- Kết quả gồm: 1, 2, 2, 2, 3 -> Tổng cộng 5 dòng!\n-- 2. UNION: Khử trùng lặp hoàn toàn\n-- Kết quả gồm các giá trị duy nhất: 1, 2, 3 -> Tổng cộng 3 dòng!",
          "solutionOutput": "UNION ALL: 5 dòng | UNION: 3 dòng",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ UNION ALL khử bớt số 2 bị lặp trong bảng A, bạn đang nhầm lẫn với UNION. UNION ALL giữ nguyên vẹn 100% mọi dòng."
        },
        {
          "title": "Bài tập 2.3-2 (Tìm & Sửa lỗi): Lỗi cú pháp khi đặt ORDER BY trong UNION",
          "level": "Trung bình",
          "problem": "Một lập trình viên muốn sắp xếp từng nhánh trước khi gộp:\n```sql\nSELECT product_id, price FROM products WHERE price < 1000000 ORDER BY price ASC\nUNION ALL\nSELECT product_id, price FROM products WHERE price >= 1000000 ORDER BY price DESC;\n```\nCâu lệnh bị báo lỗi cú pháp. Hãy giải thích nguyên nhân và sửa lại câu lệnh chuẩn.",
          "hint": "Mệnh đề ORDER BY chỉ được nằm ở cuối cùng hoặc phải bọc các nhánh trong Subquery / CTE.",
          "solutionCode": "-- Cách sửa chuẩn mực nếu chỉ cần sắp xếp toàn bộ kết quả cuối:\nSELECT product_id, price FROM products WHERE price < 1000000\nUNION ALL\nSELECT product_id, price FROM products WHERE price >= 1000000\nORDER BY price ASC;\n\n-- Hoặc nếu bắt buộc phải giữ thứ tự riêng của từng nhánh (dùng CTE):\nWITH low_price AS (\n    SELECT product_id, price, 1 AS branch_order FROM products WHERE price < 1000000\n),\nhigh_price AS (\n    SELECT product_id, price, 2 AS branch_order FROM products WHERE price >= 1000000\n)\nSELECT product_id, price FROM low_price\nUNION ALL\nSELECT product_id, price FROM high_price\nORDER BY branch_order, price DESC;",
          "solutionOutput": "Query executed successfully.",
          "explanation": "Chẩn đoán lỗi: Chuẩn ANSI SQL không cho phép đặt ORDER BY độc lập bên trong các nhánh của toán tử tập hợp nếu không được bao bọc trong Subquery."
        },
        {
          "title": "Bài tập 2.3-3 (Tự viết truy vấn): Tìm sản phẩm có trong danh mục nhưng chưa từng được mua",
          "level": "Nâng cao",
          "problem": "Sử dụng toán tử EXCEPT để tìm mã sản phẩm (`product_id`) có trong bảng `products` nhưng chưa từng xuất hiện trong bảng chi tiết đơn hàng `order_items`.",
          "hint": "SELECT product_id FROM products EXCEPT SELECT product_id FROM order_items.",
          "solutionCode": "SELECT product_id FROM products\nEXCEPT\nSELECT product_id FROM order_items;",
          "solutionOutput": "Tập kết quả rỗng (0 rows) vì toàn bộ 5 sản phẩm của TechMart đều đã từng được khách đặt mua.",
          "explanation": "Toán tử EXCEPT là cách tư duy tập hợp thuần túy và cực kỳ trực quan khi bạn muốn tìm phần bù giữa hai bảng."
        },
        {
          "title": "Bài tập 2.3-4 (Đánh đổi & Kiến trúc): UNION ALL vs JOIN trong mô hình đa chi nhánh",
          "level": "Nâng cao",
          "problem": "Khi tổng hợp doanh thu từ 50 bảng chi nhánh có cấu trúc giống hệt nhau (Sharded Tables), tại sao kiến trúc phân tích luôn dùng UNION ALL thay vì JOIN? Đánh đổi về mặt tài nguyên là gì?",
          "hint": "Xét quan hệ về số cột và số dòng khi ghép dữ liệu đồng nhất.",
          "solutionCode": "-- Phân tích kiến trúc:\n-- 1. Vì sao dùng UNION ALL: Các bảng chi nhánh chứa các thực thể giao dịch đồng nhất (cùng cấu trúc cột),\n--    mở rộng dữ liệu theo chiều dọc (thêm dòng giao dịch).\n-- 2. Nếu dùng JOIN: Phép JOIN mở rộng theo chiều ngang (thêm cột), tạo ra tích Descartes vô nghĩa và làm nổ số lượng cột!\n-- 3. Đánh đổi tài nguyên: UNION ALL xử lý theo luồng (Streaming), không tốn RAM, phù hợp tuyệt đối cho kiến trúc dữ liệu phân tán.",
          "solutionOutput": "Phép ghép dọc UNION ALL là giải pháp duy nhất khả thi cho Sharded Tables.",
          "explanation": "Hiểu rõ chiều mở rộng của dữ liệu giúp kỹ sư chọn đúng công cụ ngay từ khâu thiết kế."
        }
      ],
      "quiz": [
        {
          "question": "Vì sao toán tử UNION ALL lại có tốc độ thực thi nhanh hơn đáng kể so với UNION thông thường?",
          "options": [
            "Vì UNION ALL bỏ qua việc kiểm tra quyền truy cập bảng.",
            "Vì UNION ALL không cần phải thực hiện bước sắp xếp hoặc băm (Hash) tốn kém để tìm và khử các dòng trùng lặp, chỉ việc nối thẳng hai luồng dữ liệu.",
            "Vì UNION ALL chỉ chạy trên 1 dòng dữ liệu duy nhất.",
            "Vì UNION ALL lưu dữ liệu trực tiếp vào bộ nhớ RAM."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! UNION thông thường bắt buộc phải tốn tài nguyên CPU và RAM để quét khử trùng lặp (Deduplication), còn UNION ALL chỉ việc nối tiếp các khối dữ liệu."
        },
        {
          "question": "Điều kiện bắt buộc nào sau đây phải được thỏa mãn để hai câu lệnh SELECT có thể kết hợp với nhau bằng toán tử tập hợp (UNION / INTERSECT / EXCEPT)?",
          "options": [
            "Hai bảng phải có cùng số lượng dòng.",
            "Hai câu lệnh SELECT phải trả về cùng số lượng cột và các cột tương ứng theo thứ tự phải có kiểu dữ liệu tương thích.",
            "Hai bảng phải có cùng Khóa chính.",
            "Hai câu lệnh phải có cùng mệnh đề WHERE."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Đây là điều kiện tương thích tập hợp (Union-compatible). Nếu lệch số cột hoặc xung đột kiểu dữ liệu, CSDL sẽ báo lỗi biên dịch."
        },
        {
          "question": "Toán tử INTERSECT trong chuẩn SQL trả về tập kết quả như thế nào?",
          "options": [
            "Toàn bộ các dòng của cả hai câu truy vấn.",
            "Chỉ các dòng xuất hiện đồng thời ở CẢ HAI câu truy vấn (Phần giao nhau).",
            "Các dòng có ở câu truy vấn thứ nhất nhưng không có ở câu truy vấn thứ hai.",
            "Chỉ các dòng có giá trị NULL."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! INTERSECT đại diện cho phép giao trong lý thuyết tập hợp, chỉ giữ lại các bộ giá trị tồn tại ở cả 2 tập hợp."
        },
        {
          "question": "Trong hệ quản trị cơ sở dữ liệu Oracle, toán tử phép trừ tập hợp (tương đương với EXCEPT trong PostgreSQL/SQLite) có tên gọi là gì?",
          "options": [
            "SUBTRACT",
            "DIFFERENCE",
            "MINUS",
            "EXCLUDE"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Oracle sử dụng từ khóa MINUS thay cho EXCEPT của chuẩn ANSI SQL."
        },
        {
          "question": "Cách xử lý đối với giá trị NULL của các toán tử tập hợp (UNION, EXCEPT, INTERSECT) khác với mệnh đề WHERE như thế nào?",
          "options": [
            "Toán tử tập hợp sẽ văng lỗi nếu gặp giá trị NULL.",
            "Trong toán tử tập hợp, hai giá trị NULL được coi là hoàn toàn bằng nhau (tương đương); trong khi trong WHERE, so sánh NULL = NULL cho ra UNKNOWN.",
            "Toán tử tập hợp tự động đổi NULL thành số 0.",
            "Không có sự khác biệt nào."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Chuẩn ISO quy định các toán tử tập hợp coi hai giá trị NULL là tương đương nhau để thực hiện khử trùng lặp hoặc tìm điểm giao/hiệu."
        }
      ],
      "summary": [
        "Toán tử tập hợp ghép dữ liệu theo chiều dọc (thêm dòng); JOIN ghép dữ liệu theo chiều ngang (thêm cột).",
        "Các câu truy vấn tham gia toán tử tập hợp bắt buộc phải cùng số lượng cột và kiểu dữ liệu tương thích.",
        "Luôn ưu tiên dùng UNION ALL trừ khi bạn thực sự có nhu cầu nghiệp vụ bắt buộc phải khử trùng lặp dữ liệu.",
        "Dùng INTERSECT để tìm phần giao và EXCEPT (hoặc MINUS) để tìm phần bù giữa hai tập hợp.",
        "Ôn cách quãng: Tại sao kiểu dữ liệu DECIMAL lại là lựa chọn bắt buộc cho tiền tệ thay vì FLOAT? (Xem lại Bài 1.1)."
      ]
    },
    {
      "id": "sql-11-subqueries",
      "number": "2.4",
      "title": "Subqueries (Truy Vấn Con) & Bẫy Tử Thần NOT IN + NULL",
      "subtitle": "Phân loại truy vấn con vô hướng, đa dòng, tương quan (Correlated) và giải mã vì sao NOT IN trả về rỗng khi tập con chứa NULL",
      "level": "Trung cấp",
      "duration": "45 phút",
      "keywords": [
        "Subqueries",
        "Scalar Subquery",
        "Correlated Subquery",
        "EXISTS vs IN",
        "NOT IN with NULL",
        "Bẫy DQ kinh điển",
        "Three-valued logic"
      ],
      "prerequisites": "Nắm vững mệnh đề WHERE (Bài 1.3), toán tử tập hợp (Bài 2.3) và logic 3VL (Bài 0.3).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân biệt rõ ràng 3 loại truy vấn con: Vô hướng (Scalar - 1 giá trị), Đa dòng (Multi-row) và Tương quan (Correlated Subquery).",
        "So sánh bản chất hiệu năng và cơ chế hoạt động của EXISTS vs IN.",
        "Giải mã cặn kẽ BẪY TỬ THẦN KINH ĐIỂN [DQ]: Vì sao NOT IN trả về tập kết quả RỖNG hoàn toàn nếu tập con chứa dù chỉ 1 giá trị NULL.",
        "Làm chủ giải pháp an toàn tuyệt đối bằng NOT EXISTS hoặc bổ sung điều kiện IS NOT NULL.",
        "Hiểu cơ chế Subquery Unnesting của Query Optimizer giúp chuyển đổi truy vấn con thành phép JOIN tối ưu."
      ],
      "intuition": {
        "title": "Trợ lý tra cứu nhanh vs Thư ký chạy việc từng hồ sơ",
        "metaphor": "1. Truy vấn con độc lập (Non-correlated): Giống như bạn bảo trợ lý: \"Hãy chạy ra bảng giá xem sản phẩm nào đắt nhất giá bao nhiêu (8.500.000đ)\". Người trợ lý chạy đi xem đúng 1 LẦN duy nhất, mang con số 8.500.000đ về dán lên bàn bạn. Sau đó bạn lọc các sản phẩm dựa trên con số tĩnh đó.\n2. Truy vấn con tương quan (Correlated): Giống như bạn cầm một xấp 1.000 hồ sơ khách hàng. Cứ mỗi lần lật đến một bộ hồ sơ, bạn lại bảo thư ký: \"Chạy đi tìm xem khách hàng NÀY đã mua bao nhiêu đơn!\". Thư ký phải chạy đi chạy lại đúng 1.000 lần! Nếu không có chỉ mục, hệ thống sẽ kiệt sức vì phải chạy đi chạy lại.",
        "boundary": "Ẩn dụ này cảnh báo về chi phí của Correlated Subquery. Tuy nhiên các Optimizer hiện đại ngày nay có khả năng tự động \"làm phẳng\" (Subquery Unnesting) một câu correlated subquery thành một phép JOIN thông thường để tối ưu tốc độ.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:220px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">⚡ UNCORRELATED (ĐỘC LẬP)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">WHERE total &gt; (SELECT AVG...)</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Chạy đúng 1 lần duy nhất, kết quả đóng băng $O(1)$</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;border-color:var(--warning);\">\n                <div style=\"font-size:0.75rem;color:var(--warning);margin-bottom:4px;font-weight:700;\">⚠️ CORRELATED (TƯƠNG QUAN)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">WHERE EXISTS (SELECT 1 .. o.id)</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Tham chiếu dòng ngoài, chạy lặp $N$ lần &rarr; Cần CBO Decorrelation!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Bí kíp hiệu năng:</span>\n              <span>Dùng <code>WHERE EXISTS</code> thay vì <code>WHERE col IN (Subquery)</code> để vừa chống bẫy NULL vừa giúp CBO dễ dàng biến đổi thành Semi-Join tối ưu.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-11-problem-hook",
          "title": "Gợi mở vấn đề: Chiến dịch Email tri ân thất bại vì một giá trị NULL vô hình",
          "content": "\n            <p>Bộ phận Chăm sóc khách hàng của TechMart lên kế hoạch gửi thư tri ân và tặng quà cho tất cả những khách hàng <strong>chưa từng phát sinh bất kỳ khiếu nại nào</strong>. Kỹ sư phụ trách viết một câu lệnh lọc tưởng chừng vô cùng đơn giản và chuẩn xác:</p>\n            <pre class=\"code-pre\"><code>SELECT customer_id, full_name, email\nFROM customers\nWHERE customer_id NOT IN (\n    SELECT customer_id FROM customer_complaints\n);</code></pre>\n            <p><strong>Kết quả kinh hoàng:</strong> Hệ thống trả về <strong>0 DÒNG (Tập kết quả rỗng hoàn toàn)</strong>! Không một khách hàng nào nhận được email. Toàn bộ chiến dịch bị đình trệ.</p>\n            <p>Khi điều tra kỹ bảng <code>customer_complaints</code>, các kỹ sư phát hiện bảng có 10.000 khiếu nại, nhưng có <strong>đúng 1 dòng bị lỗi nhập liệu có <code>customer_id IS NULL</code></strong> (do khách vãng lai gọi điện không để lại mã số). Chỉ vì đúng một giá trị NULL đó, toán tử <code>NOT IN</code> đã nuốt chửng toàn bộ kết quả của câu lệnh!</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-11-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra logic 3VL & Phép Phủ Định",
          "content": "\n            <p>Trước khi giải mã bẫy NOT IN, hãy truy hồi 2 câu hỏi từ Bài 0.3:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Biểu thức so sánh khác <code>5 &lt;&gt; NULL</code> trong chuẩn SQL sẽ trả về chân trị gì?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Trả về chân trị <code>UNKNOWN</code> (không phải TRUE, cũng không phải FALSE).</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Trong bảng chân trị của phép AND, biểu thức <code>TRUE AND TRUE AND UNKNOWN</code> sẽ cho ra kết quả cuối cùng là gì?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> Trả về <code>UNKNOWN</code>! Và mệnh đề WHERE sẽ lập tức loại bỏ dòng này vì WHERE chỉ giữ lại các dòng đánh giá ra TRUE tuyệt đối.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-11-concept-definition",
          "title": "Khái niệm cốt lõi: Ba Loại Truy Vấn Con (Subqueries)",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Loại Subquery</th>\n                    <th scope=\"col\">Dữ liệu trả về</th>\n                    <th scope=\"col\">Vị trí sử dụng thường gặp</th>\n                    <th scope=\"col\">Đặc điểm thực thi</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Scalar Subquery (Vô hướng)</strong></td>\n                    <td>Đúng 1 giá trị (1 hàng, 1 cột)</td>\n                    <td>SELECT, WHERE, HAVING</td>\n                    <td>Độc lập, chạy 1 lần duy nhất rồi trả kết quả tĩnh cho truy vấn cha.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Multi-row Subquery (Đa dòng)</strong></td>\n                    <td>1 cột gồm danh sách nhiều dòng</td>\n                    <td>WHERE kết hợp <code>IN</code>, <code>ANY</code>, <code>ALL</code></td>\n                    <td>Độc lập, trả về một tập hợp danh sách giá trị.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Correlated Subquery (Tương quan)</strong></td>\n                    <td>Phụ thuộc vào từng dòng của truy vấn cha</td>\n                    <td>WHERE kết hợp <code>EXISTS</code>, <code>NOT EXISTS</code></td>\n                    <td>Tham chiếu biến của bảng cha, về mặt lý thuyết phải chạy lại cho từng dòng cha.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-11-internal-mechanism",
          "title": "Cơ chế bên trong: Giải Mã Bản Chất Toán Học Bẫy Tử Thần NOT IN + NULL",
          "content": "\n            <p><strong>Tại sao NOT IN lại bị sập thành tập rỗng khi tập con có NULL?</strong></p>\n            <ol>\n              <li>Giả sử bảng khiếu nại trả về danh sách <code>customer_id</code> là: <code>(1, 2, NULL)</code>.</li>\n              <li>Khi bạn viết: <code>WHERE customer_id NOT IN (1, 2, NULL)</code>, theo chuẩn ISO SQL, biểu thức này được động cơ CSDL phân rã thành:\n                <pre class=\"code-pre\"><code>(customer_id <> 1) AND (customer_id <> 2) AND (customer_id <> NULL)</code></pre>\n              </li>\n              <li>Xét một khách hàng bất kỳ (ví dụ khách số 5):\n                <ul>\n                  <li><code>5 &lt;&gt; 1</code> &rarr; <code>TRUE</code></li>\n                  <li><code>5 &lt;&gt; 2</code> &rarr; <code>TRUE</code></li>\n                  <li><code>5 &lt;&gt; NULL</code> &rarr; <code>UNKNOWN</code>!</li>\n                </ul>\n              </li>\n              <li>Biểu thức tổng hợp: <code>TRUE AND TRUE AND UNKNOWN &rarr; UNKNOWN</code>!</li>\n              <li>Mệnh đề WHERE chỉ giữ lại dòng có chân trị TRUE. Do đó, khách hàng số 5 <strong>bị loại bỏ thẳng tay</strong>! Và điều này xảy ra tương tự cho MỌI khách hàng khác trong bảng!</li>\n            </ol>\n            <p><strong>Cơ chế cứu mạng của NOT EXISTS:</strong> Toán tử <code>NOT EXISTS</code> chỉ kiểm tra sự tồn tại (Boolean TRUE/FALSE 2VL) chứ không so sánh giá trị bằng toán tử <code>=</code> hay <code>&lt;&gt;</code>. Giá trị NULL bên trong bảng con hoàn toàn không ảnh hưởng đến tính đúng đắn của NOT EXISTS.</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-11-worked-example",
          "title": "Ví dụ mẫu có lời giải: Khắc Phục Bẫy NOT IN Bằng NOT EXISTS Trên TechMart",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Bảng <code>raw_dirty_orders</code> TechMart có dòng raw_id: 3 chứa <code>customer_id = 999</code> và dòng raw_id: 4 chứa <code>status = NULL</code>. Khách hàng số 5 (Hoang Van Em) là người duy nhất không có đơn hàng nào trong bảng này. Khi bạn chạy câu lệnh:</p>\n              <pre class=\"code-pre\"><code>SELECT c.customer_id, c.full_name\nFROM customers c\nWHERE NOT EXISTS (\n    SELECT 1 FROM raw_dirty_orders r WHERE r.customer_id = c.customer_id\n);</code></pre>\n              <p>Câu lệnh trên có tìm ra được khách hàng số 5 không? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: TÌM THẤY CHÍNH XÁC KHÁCH HÀNG SỐ 5!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong> Với khách hàng số 5, subquery bên trong trả về 0 dòng. Toán tử NOT EXISTS đánh giá điều kiện 0 dòng là <code>TRUE</code> tuyệt đối và giữ lại khách hàng số 5. Nó hoàn toàn miễn nhiễm với bất kỳ giá trị NULL nào có trong bảng raw_dirty_orders!</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Truy quét khách hàng sạch bằng NOT EXISTS trên TechMart",
              "code": "SELECT c.customer_id, c.full_name, c.email\nFROM customers c\nWHERE NOT EXISTS (\n    SELECT 1 \n    FROM raw_dirty_orders r \n    WHERE r.customer_id = c.customer_id\n);",
              "annotations": [
                {
                  "line": 4,
                  "text": "Quy ước viết SELECT 1: Engine chỉ kiểm tra sự tồn tại bản ghi, không đọc cột"
                }
              ],
              "explanation": "Đã kiểm chứng trên DuckDB 2.0.0, PostgreSQL 16 và SQLite 3.50.4. Khách hàng số 5 được giữ lại chính xác 100%.",
              "output": "+-------------+---------------+-------------------+\n| customer_id | full_name     | email             |\n+-------------+---------------+-------------------+\n| 5           | Hoang Van Em  | em.hoang@email.com|\n+-------------+---------------+-------------------+\n(1 row returned)"
            }
          ]
        },
        {
          "id": "sec-11-faded-example",
          "title": "Bài điền khuyết (Faded Example): Tìm Sản Phẩm Đắt Hơn Giá Trung Bình Cùng Loại",
          "content": "\n            <p>Để tìm các sản phẩm có giá bán cao hơn giá bán trung bình của <strong>chính danh mục sản phẩm đó</strong> (Truy vấn con tương quan), hãy điền các định danh thích hợp vào vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>SELECT p1.product_id, p1.product_name, p1.category, p1.price\nFROM products [___1___]\nWHERE p1.price > (\n    SELECT [___2___](p2.price)\n    FROM products p2\n    WHERE [___3___].category = [___4___].category\n);</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = p1</code> (Đặt bí danh cho bảng ngoài của truy vấn cha).</li>\n                  <li><code>[___2___] = AVG</code> (Hàm tính giá bán trung bình của danh mục).</li>\n                  <li><code>[___3___] = p2</code> (Cột category của bảng con bên trong subquery).</li>\n                  <li><code>[___4___] = p1</code> (Liên kết tương quan với cột category của bảng cha p1).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-11-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Trong Subqueries",
          "content": "\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Subquery vô hướng trả về nhiều hơn 1 dòng</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> <code>SELECT * FROM products WHERE price = (SELECT price FROM products WHERE category = 'Accessories');</code></p>\n                <p><strong>Hậu quả:</strong> Vì danh mục 'Accessories' có tới 3 sản phẩm, subquery trả về một danh sách 3 giá trị. Toán tử so sánh bằng <code>=</code> (vốn chỉ nhận 1 giá trị vô hướng) sẽ văng lỗi ngay lập tức: <code>ERROR: more than one row returned by a subquery used as an expression</code>.</p>\n                <p><strong>Cách sửa đúng:</strong> Đổi toán tử <code>=</code> thành <code>IN</code>, hoặc thêm <code>LIMIT 1</code> / hàm tổng hợp <code>MAX(price)</code> vào subquery.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Lạm dụng Correlated Subquery trong mệnh đề SELECT</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Ví dụ sai:</strong> <code>SELECT c.customer_id, (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.customer_id) FROM customers c;</code></p>\n                <p><strong>Cơ chế sai:</strong> Nếu bảng customers có 1 triệu dòng, CSDL buộc phải thực hiện 1 triệu lần quét tra cứu trên bảng orders! Tốc độ truy vấn sụt giảm nghiêm trọng.</p>\n                <p><strong>Cách sửa đúng:</strong> Thay thế bằng phép <code>LEFT JOIN</code> kết hợp <code>GROUP BY</code> để engine tận dụng thuật toán Hash Join chỉ trong 1 lần quét.</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-11-concept-comparison",
          "title": "So Sánh: IN vs EXISTS & NOT IN vs NOT EXISTS",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí so sánh</th>\n                    <th scope=\"col\">Toán tử IN / NOT IN</th>\n                    <th scope=\"col\">Toán tử EXISTS / NOT EXISTS</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Cách thức đánh giá</strong></td>\n                    <td>So sánh giá trị cụ thể với danh sách các giá trị trả về từ subquery.</td>\n                    <td>Kiểm tra xem subquery có trả về ít nhất 1 dòng hay không (Boolean TRUE/FALSE).</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Hành vi khi gặp NULL</strong></td>\n                    <td><span class=\"dirty-val\">BỊ HỎNG VỚI NOT IN:</span> Nếu tập con chứa NULL, NOT IN luôn trả về rỗng do logic 3VL!</td>\n                    <td><strong>AN TOÀN TUYỆT ĐỐI:</strong> Bỏ qua giá trị bên trong ô, chỉ đếm sự tồn tại của con trỏ dòng.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Quy ước viết code tối ưu</strong></td>\n                    <td>Dùng khi danh sách giá trị là hằng số tĩnh nhỏ: <code>IN ('A', 'B')</code>.</td>\n                    <td><strong>Chuẩn mực bắt buộc</strong> khi kiểm tra tồn tại liên kết giữa 2 bảng.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-11-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Kỹ Thuật Subquery Unnesting Của Optimizer",
          "content": "\n            <p>Trong các phiên bản RDBMS hiện đại (PostgreSQL 12+, DuckDB), Bộ tối ưu hóa truy vấn có một tính năng tối ưu rất mạnh mẽ gọi là <strong>Subquery Unnesting (Làm phẳng truy vấn con)</strong>.</p>\n            <p>Khi bạn viết một câu lệnh dùng <code>EXISTS</code> hoặc <code>IN</code>:</p>\n            <pre class=\"code-pre\"><code>SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);</code></pre>\n            <p>Thay vì chạy vòng lặp lồng nhau chậm chạp, Query Optimizer sẽ tự động chuyển đổi câu lệnh trên thành một phép <strong>Semi-join</strong> vật lý bằng thuật toán Hash Join! Nhờ đó câu lệnh đạt tốc độ tối đa tương đương với phép JOIN thông thường mà không cần lập trình viên phải tự viết lại code.</p>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "BẪY TỬ THẦN: NOT IN với tập con chứa NULL",
            "content": "NOT IN kết hợp với tập con chứa NULL luôn trả về rỗng vì logic 3VL sinh ra UNKNOWN. Luôn ưu tiên dùng NOT EXISTS hoặc thêm điều kiện WHERE col IS NOT NULL vào subquery."
          },
          {
            "title": "Dùng Scalar Subquery trong SELECT trên bảng hàng triệu dòng",
            "content": "Viết subquery trong SELECT ép CSDL chạy truy vấn con cho từng dòng của bảng cha. Hãy thay thế bằng LEFT JOIN + GROUP BY để tăng tốc độ gấp hàng chục lần!"
          }
        ],
        "tips": [
          {
            "title": "Quy ước viết SELECT 1 trong EXISTS",
            "content": "Trong toán tử EXISTS (SELECT ...), bạn viết SELECT 1, SELECT * hay SELECT NULL đều có hiệu năng giống hệt nhau 100%. Engine chỉ kiểm tra sự tồn tại của con trỏ dòng chứ không đọc dữ liệu cột."
          }
        ],
        "deepDive": {
          "title": "Tối ưu hóa CBO: Kỹ thuật Decorrelation & Chuyển đổi Subquery thành Semi-Join",
          "content": "<p>Một câu truy vấn con tương quan (Correlated Subquery) viết dưới dạng <code>WHERE EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id)</code> theo lý thuyết phải chạy lại với từng khách hàng ($O(M \\times N)$).</p><p>Tuy nhiên, Bộ tối ưu hóa Cost-Based Optimizer (CBO) của PostgreSQL và DuckDB đủ thông minh để thực hiện kỹ thuật <strong>Subquery Decorrelation (Gỡ bỏ tương quan)</strong>: nó dịch cấu trúc này thành một toán tử đặc biệt gọi là <strong>Hash Semi-Join</strong> (hoặc Hash Anti-Join đối với NOT EXISTS). Toán tử này chỉ cần duyệt bảng một lần duy nhất với độ phức tạp $O(M + N)$, dừng ngay khi tìm thấy dòng đầu tiên thỏa mãn mà không quét thừa!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 2.4-1 (Dự đoán kết quả): Hành vi của NOT IN khi subquery chứa NULL",
          "level": "Cơ bản",
          "problem": "Bảng `raw_dirty_orders` có chứa các mã khách hàng: [1, 2, 999, NULL]. Một lập trình viên viết:\nSELECT COUNT(*) FROM customers WHERE customer_id NOT IN (SELECT customer_id FROM raw_dirty_orders);\nCâu lệnh trả về kết quả là bao nhiêu?",
          "hint": "Nhớ lại cơ chế lan truyền UNKNOWN trong mệnh đề WHERE.",
          "solutionCode": "-- Phân tích bản chất:\n-- Biểu thức tương đương: customer_id <> 1 AND customer_id <> 2 AND customer_id <> 999 AND customer_id <> NULL\n-- Do vế cuối là UNKNOWN, toàn bộ mệnh đề WHERE đánh giá ra UNKNOWN cho mọi dòng.\n-- Kết quả trả về: 0 dòng!",
          "solutionOutput": "0",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ kết quả ra 1 (khách số 5), bạn đã dính bẫy tử thần NOT IN với NULL. Phải dùng NOT EXISTS mới lấy được số 1."
        },
        {
          "title": "Bài tập 2.4-2 (Tìm & Sửa lỗi): Khắc phục lỗi Scalar Subquery trả về nhiều dòng",
          "level": "Trung bình",
          "problem": "Một câu lệnh tìm các sản phẩm có giá bằng với giá của danh mục Accessories bị lỗi:\n```sql\nSELECT product_id, product_name, price\nFROM products\nWHERE price = (SELECT price FROM products WHERE category = \"Accessories\");\n```\nGiải thích lỗi và sửa lại câu lệnh.",
          "hint": "Thay toán tử = bằng toán tử đa dòng IN.",
          "solutionCode": "-- Cách sửa chuẩn xác:\nSELECT product_id, product_name, price\nFROM products\nWHERE price IN (SELECT price FROM products WHERE category = 'Accessories');",
          "solutionOutput": "Query executed successfully trả về các sản phẩm có giá trùng khớp.",
          "explanation": "Chẩn đoán lỗi: Toán tử so sánh vô hướng (=, >, <) chỉ chấp nhận đúng 1 giá trị. Khi subquery trả về nhiều dòng, bắt buộc phải dùng toán tử tập hợp IN."
        },
        {
          "title": "Bài tập 2.4-3 (Tự viết truy vấn): Tìm khách hàng có tổng chi tiêu cao hơn mức trung bình",
          "level": "Nâng cao",
          "problem": "Sử dụng Subquery trong mệnh đề HAVING để tìm các khách hàng có tổng chi tiêu (từ các đơn COMPLETED) lớn hơn mức chi tiêu trung bình của một khách hàng trong toàn công ty.",
          "hint": "HAVING SUM(total_amount) > (SELECT AVG(spending) FROM (SELECT SUM(...) ... GROUP BY customer_id))",
          "solutionCode": "WITH customer_spending AS (\n    SELECT customer_id, SUM(total_amount) AS total_spent\n    FROM orders\n    WHERE status = 'COMPLETED'\n    GROUP BY customer_id\n)\nSELECT customer_id, total_spent\nFROM customer_spending\nWHERE total_spent > (SELECT AVG(total_spent) FROM customer_spending);",
          "solutionOutput": "+-------------+-------------+\n| customer_id | total_spent |\n+-------------+-------------+\n| 2           | 12500000.00 |\n+-------------+-------------+\n(Khách hàng 2 chi tiêu 12.5 triệu, vượt trội so với mức trung bình 7.83 triệu)",
          "explanation": "Cách kết hợp CTE với Scalar Subquery giúp câu truy vấn cực kỳ sáng sủa và dễ bảo trì."
        },
        {
          "title": "Bài tập 2.4-4 (Đánh đổi & Kiến trúc): EXISTS vs IN khi bảng con có kích thước khổng lồ",
          "level": "Nâng cao",
          "problem": "Bảng cha `users` có 10.000 dòng. Bảng con `logs` có 1 tỷ dòng. Để tìm các user có phát sinh log, bạn nên viết `WHERE id IN (SELECT user_id FROM logs)` hay `WHERE EXISTS (SELECT 1 FROM logs WHERE user_id = users.id)`? Giải thích theo kế hoạch thực thi.",
          "hint": "Xem xét việc lập danh sách 1 tỷ dòng trong bộ nhớ vs tra cứu chỉ mục có điều kiện dừng sớm (Early Stop).",
          "solutionCode": "-- Phân tích kiến trúc:\n-- 1. Nếu dùng IN: Engine có xu hướng đọc toàn bộ 1 tỷ dòng của bảng logs để khử trùng lặp và tạo danh sách băm trong RAM.\n-- 2. Nếu dùng EXISTS (với chỉ mục trên logs.user_id):\n--    - Engine duyệt từng dòng của users (10.000 dòng).\n--    - Với mỗi user, engine tra cứu vào B-tree của logs và DỪNG LẠI NGAY LẬP TỨC khi tìm thấy bản ghi đầu tiên (Early Stop / Short-circuit)!\n--    - Không bao giờ phải quét hết 1 tỷ dòng của bảng logs.\n-- Kết luận: EXISTS nhanh hơn hàng ngàn lần trong kịch bản này!",
          "solutionOutput": "EXISTS tận dụng cơ chế Early Stop vượt trội hoàn toàn so với IN trên bảng lớn.",
          "explanation": "Hiểu rõ cơ chế Early Stop của EXISTS là bí quyết tối ưu truy vấn cấp Senior."
        }
      ],
      "quiz": [
        {
          "question": "Vì sao biểu thức x NOT IN (1, 2, NULL) luôn không bao giờ đánh giá là TRUE với bất kỳ giá trị nào của x?",
          "options": [
            "Vì tập hợp có chứa số 1 và số 2.",
            "Vì phép so sánh x <> NULL sinh ra UNKNOWN, và một chuỗi phép AND với UNKNOWN không bao giờ có thể cho kết quả TRUE.",
            "Vì chuẩn SQL cấm không cho phép đặt NULL vào trong toán tử IN.",
            "Vì toán tử NOT IN chỉ hoạt động với chuỗi ký tự."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Logic 3VL quy định AND UNKNOWN không thể cho kết quả TRUE, do đó mệnh đề WHERE loại bỏ tất cả các dòng."
        },
        {
          "question": "Khi sử dụng toán tử EXISTS (SELECT ...), việc bạn viết SELECT 1 hay SELECT * hay SELECT NULL bên trong subquery có ảnh hưởng đến hiệu năng không?",
          "options": [
            "SELECT * chạy chậm hơn vì CSDL phải nạp tất cả các cột lên bộ nhớ.",
            "Hoàn toàn không ảnh hưởng; CSDL chỉ kiểm tra sự tồn tại của con trỏ bản ghi chứ không thực sự đọc hay chiếu dữ liệu của các cột ra bộ nhớ.",
            "Bắt buộc phải viết SELECT 1 thì câu lệnh mới hợp lệ theo chuẩn ANSI SQL.",
            "SELECT NULL sẽ làm câu lệnh luôn trả về FALSE."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Toán tử EXISTS chỉ kiểm tra sự tồn tại của ít nhất 1 bản ghi thỏa mãn điều kiện. Optimizer tự động bỏ qua danh sách cột ở SELECT."
        },
        {
          "question": "Truy vấn con tương quan (Correlated Subquery) có đặc điểm nhận diện cốt lõi nào sau đây?",
          "options": [
            "Nó luôn nằm trong mệnh đề HAVING.",
            "Nó tham chiếu trực tiếp đến một cột của truy vấn cha bên ngoài và được đánh giá dựa trên từng dòng của truy vấn cha.",
            "Nó luôn trả về đúng 1 giá trị vô hướng.",
            "Nó không bao giờ được phép dùng với toán tử EXISTS."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Tính chất \"tương quan\" thể hiện ở mối liên kết giữa cột của bảng con bên trong với cột của bảng cha bên ngoài."
        },
        {
          "question": "Nếu một truy vấn con vô hướng (Scalar Subquery) được đặt sau toán tử so sánh bằng (=) trong mệnh đề WHERE mà vô tình trả về 2 dòng kết quả, điều gì sẽ xảy ra?",
          "options": [
            "CSDL tự động lấy dòng đầu tiên để so sánh.",
            "CSDL tự động chuyển câu lệnh thành toán tử IN.",
            "CSDL báo lỗi ngoại lệ ngay lập tức: more than one row returned by a subquery used as an expression.",
            "CSDL tự động lấy giá trị trung bình của 2 dòng."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Toán tử so sánh vô hướng (=, >, <) đòi hỏi chính xác 1 giá trị duy nhất. Trả về nhiều hơn 1 dòng sẽ gây lỗi runtime."
        },
        {
          "question": "Để khắc phục triệt để nguy cơ tập kết quả bị rỗng khi dùng toán tử NOT IN với Subquery, kỹ thuật phòng thủ nào là chuẩn mực nhất?",
          "options": [
            "Đổi kiểu dữ liệu của cột sang BIGINT.",
            "Thay thế toán tử NOT IN bằng NOT EXISTS, hoặc bổ sung điều kiện WHERE col IS NOT NULL vào bên trong Subquery.",
            "Thêm từ khóa DISTINCT vào Subquery.",
            "Tăng dung lượng RAM của máy chủ CSDL."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! NOT EXISTS hoạt động trên logic 2VL (chỉ kiểm tra có dòng hay không) nên hoàn toàn miễn nhiễm với giá trị NULL."
        }
      ],
      "summary": [
        "Phân biệt rõ 3 loại subquery: Scalar (1 ô), Multi-row (1 cột nhiều dòng) và Correlated (tương quan phụ thuộc dòng cha).",
        "BẪY TỬ THẦN [DQ]: NOT IN kết hợp với tập con chứa NULL luôn trả về rỗng vì logic 3VL sinh ra UNKNOWN.",
        "Quy tắc vàng: Luôn ưu tiên dùng NOT EXISTS hoặc thêm WHERE col IS NOT NULL khi bắt buộc phải dùng NOT IN.",
        "Toán tử EXISTS tận dụng cơ chế Early Stop (dừng sớm ngay khi thấy 1 dòng) cực nhanh trên các bảng lớn.",
        "Ôn cách quãng: Tại sao không được dùng BETWEEN để lọc dữ liệu cột kiểu TIMESTAMP? (Xem lại Bài 1.3)."
      ]
    },
    {
      "id": "sql-12-cte-recursive",
      "number": "2.5",
      "title": "Common Table Expressions (CTE) & CTE Đệ Quy: Phân Cấp Dữ Liệu Dạng Cây",
      "subtitle": "Tư duy chia nhỏ câu truy vấn bằng mệnh đề WITH và kỹ thuật duyệt đồ thị cây phân cấp nhân sự, danh mục đa tầng",
      "level": "Trung cấp",
      "duration": "45 phút",
      "keywords": [
        "CTE",
        "WITH Clause",
        "Recursive CTE",
        "Hierarchy",
        "Cây phân cấp",
        "Code readability",
        "Calendar Table"
      ],
      "prerequisites": "Nắm vững Subqueries (Bài 2.4), toán tử UNION ALL (Bài 2.3) và thứ tự thực thi (Bài 1.4).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Hiểu bản chất của CTE (Common Table Expression / mệnh đề WITH): Đặt tên cho các bảng tạm thời trong phạm vi một câu lệnh.",
        "Nắm vững tiêu chí so sánh toàn diện: Khi nào nên dùng CTE vs Subquery vs Database View vs Temporary Table.",
        "Làm chủ cấu trúc 3 phần của CTE Đệ Quy (Recursive CTE): Phần neo (Anchor Member), Phép UNION ALL và Phần đệ quy (Recursive Member).",
        "Ứng dụng Recursive CTE để duyệt cây phả hệ tổ chức và sinh chuỗi ngày liên tục (Calendar Dimension) cho phân tích chuỗi thời gian.",
        "Phòng chống cạm bẫy vòng lặp vô tận (Infinite Loop) và cơ chế phát hiện chu trình CYCLE trong PostgreSQL."
      ],
      "intuition": {
        "title": "Đặt tên biến trung gian trong giải toán và Búp bê Nga Matryoshka",
        "metaphor": "1. CTE thông thường giống như việc bạn giải một bài toán đại số phức tạp: thay vì viết một công thức khổng lồ lồng nhau 10 tầng ngoặc đơn khó đọc, bạn đặt `Đặt A = bước tính doanh thu; Đặt B = bước tính thuế; Kết quả = A - B`. Code trở nên trong sáng, mạch lạc như một câu chuyện kể.\n2. CTE Đệ quy giống như việc mở những con búp bê Nga Matryoshka: bạn mở con búp bê to nhất ở ngoài cùng (Phần neo - Giám đốc cấp cao nhất). Bên trong nó chứa các con búp bê nhỏ hơn (Trưởng phòng). Bạn lại tiếp tục áp dụng đúng thao tác đó mở tiếp các búp bê con cho đến khi chạm tới con búp bê đặc ruột nhỏ nhất (Nhân viên không quản lý ai).",
        "boundary": "Ẩn dụ này giải thích rõ ràng cơ chế lặp của đệ quy; tuy nhiên cần hết sức cẩn thận: nếu đồ thị dữ liệu bị lặp vòng (vòng lặp vô tận: A quản lý B, B lại quản lý A), CTE đệ quy sẽ chạy mãi mãi và làm tràn bộ nhớ stack của CSDL!",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">1. ANCHOR MEMBER (R0)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">SELECT id WHERE parent IS NULL</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Khởi tạo nút gốc của cây phân cấp</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:200px;\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;\">2. RECURSIVE MEMBER (Ri+1)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">JOIN cte ON id = parent_id</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Nối lặp Working Table cho đến khi tập rỗng</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">3. KẾT QUẢ ĐỆ QUY</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--success);font-family:monospace;\">UNION ALL</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Duyệt trọn vẹn toàn bộ cây tổ chức/BOM</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--danger);\">🛡️ Chống treo máy:</span>\n              <span>Luôn thêm cột <code>depth INT</code> và điều kiện dừng <code>WHERE depth &lt; 50</code> để ngăn chặn dữ liệu đồ thị có vòng lặp (Cycle Loop) làm sập server!</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-12-problem-hook",
          "title": "Gợi mở vấn đề: Nỗi ám ảnh cây danh mục đa tầng và báo cáo thiếu ngày",
          "content": "\n            <p>Trong ngành Kỹ thuật Dữ liệu, có 2 bài toán kinh điển mà nếu chỉ dùng các câu lệnh SQL cơ bản, bạn sẽ rơi vào ngõ cụt:</p>\n            <ul>\n              <li><strong>Bài toán 1 (Cây phân cấp vô định độ sâu):</strong> Giám đốc yêu cầu vẽ sơ đồ tổ chức công ty: Giám đốc &rarr; Khối trưởng &rarr; Trưởng phòng &rarr; Trưởng nhóm &rarr; Nhân viên. Mỗi phòng ban có độ sâu khác nhau (chỗ 3 cấp, chỗ 7 cấp). Nếu dùng lệnh JOIN, bạn phải viết bao nhiêu lệnh JOIN cho đủ khi độ sâu không hề cố định trước?</li>\n              <li><strong>Bài toán 2 (Lỗ hổng chuỗi thời gian):</strong> Giám đốc muốn xem biểu đồ doanh thu liên tục từ ngày 01 đến ngày 30 của tháng. Nhưng bảng đơn hàng chỉ có giao dịch vào 18 ngày (12 ngày còn lại không ai mua hàng). Nếu chỉ <code>GROUP BY order_date</code>, 12 ngày kia sẽ <strong>bị khuyết hoàn toàn khỏi biểu đồ</strong>, làm gãy các thuật toán dự báo chuỗi thời gian (Time-series Forecasting)!</li>\n            </ul>\n            <p><strong>Giải pháp tối thượng:</strong> Mệnh đề <code>WITH RECURSIVE</code> (CTE Đệ quy) cho phép SQL tự gọi lại chính nó để sinh chuỗi ngày liên tục từ hư không và duyệt qua mọi tầng nấc của cây phân cấp chỉ trong một câu lệnh duy nhất!</p>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-12-recall-prereq",
          "title": "Gọi lại kiến thức cũ: Kiểm tra tư duy CTE & UNION ALL",
          "content": "\n            <p>Trước khi viết CTE đệ quy, hãy truy hồi 2 kiến thức từ Bài 1.4 và Bài 2.3:</p>\n            \n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);margin-bottom:12px;\">\n              <p><strong>Câu hỏi 1:</strong> Trong Bài 1.4, mệnh đề CTE (Common Table Expression) được sử dụng để giải quyết vấn đề gì khi WHERE không nhận diện được bí danh?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> CTE đóng gói biểu thức tính toán thành một bảng ảo trung gian, cho phép câu lệnh SELECT bên ngoài tái sử dụng tên bí danh đó trong mệnh đề WHERE mà không cần lặp lại biểu thức.</p>\n                </div>\n              </details>\n            </div>\n\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:14px;border-radius:6px;background:var(--bg-surface);\">\n              <p><strong>Câu hỏi 2:</strong> Toán tử <code>UNION ALL</code> khác gì với <code>UNION</code> về mặt xử lý dòng trùng lặp?</p>\n              <details class=\"predict-details\" style=\"margin-top:8px;\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án ẩn</summary>\n                <div style=\"margin-top:6px;font-size:0.92rem;line-height:1.6;\">\n                  <p><strong>Đáp án:</strong> <code>UNION ALL</code> chỉ việc nối tiếp các dòng mà không khử trùng lặp, tốc độ siêu nhanh và tiêu tốn cực ít bộ nhớ RAM.</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-12-concept-definition",
          "title": "Khái niệm cốt lõi: Cấu Trúc 3 Phần Của Recursive CTE",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Thành phần</th>\n                    <th scope=\"col\">Cú pháp mẫu</th>\n                    <th scope=\"col\">Vai trò kỹ thuật</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>1. Anchor Member (Phần neo)</strong></td>\n                    <td><code>SELECT id, name, 1 AS level FROM org WHERE manager_id IS NULL</code></td>\n                    <td>Câu truy vấn cơ sở trả về tập các nút gốc ban đầu (Level 0/1). Chạy đúng 1 lần duy nhất để khởi động đệ quy.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>2. Cầu nối ghép</strong></td>\n                    <td><code>UNION ALL</code></td>\n                    <td>Bắt buộc phải là UNION ALL để nối các tầng kết quả lại với nhau mà không tốn công khử trùng.</td>\n                  </tr>\n                  <tr>\n                    <td><strong>3. Recursive Member (Phần đệ quy)</strong></td>\n                    <td><code>SELECT e.id, e.name, o.level + 1 FROM org e JOIN org_chart o ON e.manager_id = o.id</code></td>\n                    <td>Truy vấn tham chiếu lại chính tên CTE. Thực hiện join với tập kết quả của tầng trước đó. Dừng lại khi không còn dòng nào sinh ra.</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-12-internal-mechanism",
          "title": "Cơ chế bên trong: Vòng Lặp Đệ Quy Vật Lý Của Engine (Working Table)",
          "content": "\n            <p>Bên dưới động cơ CSDL, một câu lệnh <code>WITH RECURSIVE cte_name AS (...)</code> được thực thi bằng thuật toán lặp tiếp xúc (Fixed-point iteration) với 2 bảng tạm nội bộ trong RAM:</p>\n            <ol>\n              <li><strong>Khởi tạo:</strong> Thực thi phần <em>Anchor Member</em>. Kết quả được ghi vào <code>Working Table</code> và <code>Intermediate Table</code> (bảng kết quả cuối cùng).</li>\n              <li><strong>Vòng lặp:</strong>\n                <ul>\n                  <li>CSDL thực thi phần <em>Recursive Member</em> bằng cách lấy dữ liệu hiện tại trong <code>Working Table</code> làm đầu vào.</li>\n                  <li>Nếu kết quả trả về không rỗng: CSDL ghi đè kết quả mới này vào <code>Working Table</code>, đồng thời ghép nối nó vào <code>Intermediate Table</code>.</li>\n                  <li>Lặp lại bước này cho tầng tiếp theo.</li>\n                </ul>\n              </li>\n              <li><strong>Điều kiện dừng:</strong> Ngay khi một lần lặp của <em>Recursive Member</em> trả về <strong>0 dòng (Working Table rỗng)</strong>, vòng lặp kết thúc ngay lập tức và CSDL trả về toàn bộ dữ liệu trong <code>Intermediate Table</code>.</li>\n            </ol>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-12-worked-example",
          "title": "Ví dụ mẫu có lời giải: Sinh Chuỗi Ngày Liên Tục Bằng Recursive CTE",
          "content": "\n            <div class=\"predict-challenge-card\" style=\"border:1px solid var(--border-subtle);padding:16px;border-radius:8px;background:var(--bg-surface-elevated);margin:16px 0;\">\n              <h4 style=\"margin:0 0 8px;color:var(--text-primary);\">❓ Dự đoán trước khi xem:</h4>\n              <p>Xét câu truy vấn sau sinh lịch chuỗi ngày từ ngày 01/10/2023 đến 07/10/2023:</p>\n              <pre class=\"code-pre\"><code>WITH RECURSIVE date_series AS (\n    SELECT CAST('2023-10-01' AS DATE) AS cal_date\n    UNION ALL\n    SELECT cal_date + INTERVAL 1 DAY\n    FROM date_series\n    WHERE cal_date < CAST('2023-10-07' AS DATE)\n)\nSELECT COUNT(*) FROM date_series;</code></pre>\n              <p>Theo bạn, câu lệnh trên sẽ trả về con số bao nhiêu: 6 ngày hay 7 ngày? Vì sao?</p>\n              <details class=\"predict-details\" style=\"margin-top:12px;padding:10px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n                <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem phân tích cơ chế &amp; Đáp án</summary>\n                <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                  <p><strong>Đáp án: CHÍNH XÁC LÀ 7 NGÀY!</strong></p>\n                  <p><strong>Cơ chế bản chất:</strong> Tầng neo sinh ra ngày 01/10 (1 ngày). Sau đó các tầng đệ quy lần lượt sinh ra: 02/10, 03/10, 04/10, 05/10, 06/10 và 07/10 (thỏa mãn điều kiện cal_date &lt; '2023-10-07' ở tầng trước đó). Khi đến ngày 07/10, điều kiện WHERE đánh giá ra FALSE và dừng lại. Tổng cộng là 7 ngày liên tục!</p>\n                </div>\n              </details>\n            </div>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Tạo bảng Calendar Dimension lấp đầy chuỗi thời gian trên DuckDB & PostgreSQL",
              "code": "WITH RECURSIVE calendar AS (\n    SELECT CAST('2023-10-01' AS DATE) AS calendar_date\n    UNION ALL\n    SELECT (calendar_date + INTERVAL '1 day')::DATE\n    FROM calendar\n    WHERE calendar_date < CAST('2023-10-07' AS DATE)\n)\nSELECT \n    calendar_date,\n    TO_CHAR(calendar_date, 'Day') AS day_name,\n    CASE \n        WHEN EXTRACT(ISODOW FROM calendar_date) IN (6, 7) THEN 'Weekend'\n        ELSE 'Weekday'\n    END AS day_type\nFROM calendar;",
              "annotations": [
                {
                  "line": 2,
                  "text": "Anchor: Ngày bắt đầu chuỗi"
                },
                {
                  "line": 5,
                  "text": "Recursive: Cộng thêm 1 ngày có điều kiện chặn"
                }
              ],
              "explanation": "Đã kiểm chứng trên DuckDB 2.0.0 và PostgreSQL 16. Chuỗi 7 ngày được sinh ra trọn vẹn kèm phân loại ngày trong tuần.",
              "output": "+---------------+-----------+----------+\n| calendar_date | day_name  | day_type |\n+---------------+-----------+----------+\n| 2023-10-01    | Sunday    | Weekend  |\n| 2023-10-02    | Monday    | Weekday  |\n| 2023-10-03    | Tuesday   | Weekday  |\n| 2023-10-04    | Wednesday | Weekday  |\n| 2023-10-05    | Thursday  | Weekday  |\n| 2023-10-06    | Friday    | Weekday  |\n| 2023-10-07    | Saturday  | Weekend  |\n+---------------+-----------+----------+\n(7 rows returned)"
            }
          ]
        },
        {
          "id": "sec-12-faded-example",
          "title": "Bài điền khuyết (Faded Example): Duyệt Phả Hệ Tổ Chức Đa Tầng",
          "content": "\n            <p>Để duyệt toàn bộ cây phân cấp tổ chức nhân sự từ Giám đốc cấp cao nhất (người có <code>manager_id IS NULL</code>) xuống các cấp dưới, hãy điền các từ khóa thích hợp vào vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-example-card\">\n              <div class=\"code-card-header\"><span class=\"lang-tag\">SQL (BÀI ĐIỀN KHUYẾT)</span></div>\n              <pre class=\"code-pre\"><code>WITH [___1___] org_chart AS (\n    -- 1. Anchor Member: Lấy Giám đốc cao nhất\n    SELECT emp_id, emp_name, manager_id, 1 AS depth_level\n    FROM employees\n    WHERE manager_id [___2___]\n\n    UNION ALL\n\n    -- 2. Recursive Member: Lấy cấp dưới trực tiếp\n    SELECT e.emp_id, e.emp_name, e.manager_id, o.depth_level + 1\n    FROM employees e\n    [___3___] org_chart o ON e.manager_id = o.[___4___]\n)\nSELECT * FROM org_chart ORDER BY depth_level ASC;</code></pre>\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top:12px;padding:12px;background:var(--bg-surface);border-radius:6px;border:1px dashed var(--border-strong);\">\n              <summary style=\"font-weight:700;cursor:pointer;color:var(--color-primary);\">Bấm để xem đáp án điền khuyết &amp; Giải thích</summary>\n              <div style=\"margin-top:8px;line-height:1.6;font-size:0.92rem;\">\n                <p><strong>Đáp án đúng:</strong></p>\n                <ul>\n                  <li><code>[___1___] = RECURSIVE</code> (Bắt buộc phải có từ khóa RECURSIVE khi định nghĩa CTE đệ quy).</li>\n                  <li><code>[___2___] = IS NULL</code> (Điều kiện tìm nút gốc của cây phân cấp).</li>\n                  <li><code>[___3___] = JOIN</code> (Phép ghép nối với tầng đệ quy trước đó).</li>\n                  <li><code>[___4___] = emp_id</code> (Khóa chính của cấp trên trong bảng neo).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-12-pitfalls-misconceptions",
          "title": "Bẫy và Quan Niệm Sai Phổ Biến Trong CTE & Đệ Quy",
          "content": "\n            <div class=\"callout-box callout-pitfall\" style=\"margin-bottom:14px;\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 1: Vòng lặp vô tận do chu trình lặp kín (Cycle Loop)</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Nếu dữ liệu bị lỗi logic nhập liệu: Nhân viên A có sếp là B, B có sếp là C, nhưng C lại lưu nhầm <code>manager_id</code> là A! Khi chạy Recursive CTE, câu lệnh sẽ chạy mãi mãi, ngốn 100% CPU và làm sập máy chủ!</p>\n                <p><strong>Cách phòng thủ:</strong> Luôn luôn có một điều kiện chặn độ sâu: <code>WHERE depth_level &lt; 20</code>; hoặc sử dụng tính năng phát hiện chu trình <code>CYCLE</code> trong PostgreSQL 14+.</p>\n              </div>\n            </div>\n\n            <div class=\"callout-box callout-pitfall\">\n              <div class=\"callout-header\"><span>⚠️ Bẫy 2: Tưởng rằng CTE lưu dữ liệu vĩnh viễn trên đĩa</span></div>\n              <div class=\"callout-body\">\n                <p><strong>Hiện tượng:</strong> Nghĩ rằng định nghĩa CTE ở câu lệnh trên thì câu lệnh bên dưới có thể tái sử dụng lại.</p>\n                <p><strong>Thực tế:</strong> Một bảng CTE chỉ có <strong>phạm vi tồn tại (scope) bên trong duy nhất một câu lệnh SQL</strong> ngay sau nó! Sau khi câu lệnh đó thực thi xong, CTE bị hủy bỏ hoàn toàn khỏi bộ nhớ RAM. Nếu cần tái sử dụng qua nhiều truy vấn độc lập, hãy tạo View hoặc Bảng tạm (Temporary Table).</p>\n              </div>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-12-concept-comparison",
          "title": "So Sánh Toàn Diện: CTE vs Subquery vs View vs Temporary Table",
          "content": "\n            <div class=\"table-responsive\">\n              <table class=\"comparison-table\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">Tiêu chí</th>\n                    <th scope=\"col\">CTE (WITH clause)</th>\n                    <th scope=\"col\">Subquery (Truy vấn con)</th>\n                    <th scope=\"col\">Database View</th>\n                    <th scope=\"col\">Temporary Table</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr>\n                    <td><strong>Phạm vi tồn tại</strong></td>\n                    <td>Duy nhất 1 câu truy vấn</td>\n                    <td>Duy nhất 1 mệnh đề</td>\n                    <td>Vĩnh viễn trong CSDL</td>\n                    <td>Trong phiên làm việc (Session)</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Khả năng đệ quy</strong></td>\n                    <td><strong>CÓ (WITH RECURSIVE)</strong></td>\n                    <td>Không thể đệ quy</td>\n                    <td>Không trực tiếp</td>\n                    <td>Phải viết thủ tục Stored Procedure</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Độ dễ đọc / Bảo trì</strong></td>\n                    <td><strong>Rất cao</strong> (Pipeline mạch lạc)</td>\n                    <td>Kém (Lồng nhau ngoặc đơn)</td>\n                    <td>Cao (Đóng gói sẵn)</td>\n                    <td>Trung bình</td>\n                  </tr>\n                  <tr>\n                    <td><strong>Chỉ mục B-tree riêng</strong></td>\n                    <td>Không hỗ trợ</td>\n                    <td>Không hỗ trợ</td>\n                    <td>Chỉ có ở Materialized View</td>\n                    <td><strong>CÓ:</strong> Đánh index tùy ý để tăng tốc</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          ",
          "codeExamples": []
        },
        {
          "id": "sec-12-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Tối Ưu CTE Trong PostgreSQL (MATERIALIZED vs NOT MATERIALIZED)",
          "content": "\n            <p>Trước phiên bản PostgreSQL 12, CTE được coi là một \"Hàng rào tối ưu hóa\" (Optimization Fence): Engine bắt buộc phải thực thi câu lệnh CTE ra một bảng tạm trong RAM rồi mới chạy câu lệnh chính, làm vô hiệu hóa khả năng đẩy vị từ (Predicate Pushdown) của Optimizer.</p>\n            <p>Từ PostgreSQL 12+ và trong DuckDB, Optimizer mặc định <strong>tự động inline CTE</strong> (hòa tan CTE vào câu truy vấn chính) để tối ưu hóa kế hoạch vật lý. Nếu bạn muốn ép CSDL phải tính toán CTE đúng 1 lần duy nhất để tái sử dụng nhiều lần mà không tính lại, bạn có thể chỉ định từ khóa tường minh:</p>\n            <pre class=\"code-pre\"><code>WITH heavy_calculation AS MATERIALIZED (\n    SELECT complex_function(data) FROM huge_table\n)\nSELECT * FROM heavy_calculation WHERE id = 1\nUNION ALL\nSELECT * FROM heavy_calculation WHERE id = 2;</code></pre>\n          ",
          "codeExamples": []
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lặp vô tận trong CTE đệ quy do chu trình khép kín",
            "content": "Nếu trong dữ liệu có chu trình (A là sếp B, B là sếp C, C lại là sếp A), Recursive CTE sẽ chạy vòng lặp vĩnh viễn đến khi crash máy chủ! Luôn thêm điều kiện chặn độ sâu hoặc dùng mệnh đề CYCLE trong PostgreSQL 14+."
          },
          {
            "title": "Quên từ khóa RECURSIVE",
            "content": "Trong chuẩn SQL và PostgreSQL/DuckDB/SQLite, muốn câu lệnh CTE tham chiếu lại chính nó, bắt buộc phải viết WITH RECURSIVE chứ không được viết WITH đơn thuần."
          }
        ],
        "tips": [
          {
            "title": "Calendar Table sinh bằng Recursive CTE",
            "content": "Kỹ thuật Calendar Table sinh bằng Recursive CTE là bí quyết số 1 để lấp đầy các khoảng trống dữ liệu (filling missing dates) trong phân tích chuỗi thời gian."
          }
        ],
        "deepDive": {
          "title": "Kiến trúc CTE: Đánh đổi giữa Materialized CTE và CTE Inlining (PostgreSQL 12+)",
          "content": "<p>Trước phiên bản PostgreSQL 12, mọi khối CTE (Common Table Expression) đều đóng vai trò là một <strong>Hàng rào Tối ưu hóa (Optimization Barrier)</strong>: engine luôn luôn thực thi CTE độc lập, lưu kết quả tạm vào RAM/đĩa (Materialized) rồi mới cho câu lệnh chính đọc. Điều này ngăn cản Optimizer đẩy điều kiện lọc (Predicate Pushdown) vào sâu bên trong!</p><p>Từ PostgreSQL 12+, engine mặc định tự động <strong>Inline CTE</strong> (nội suy CTE vào truy vấn chính như một subquery) nếu CTE chỉ được gọi 1 lần. Nếu muốn ép CSDL tính toán trước và ghi nhớ kết quả dùng lại nhiều lần, lập trình viên có thể viết tường minh: <code>WITH cte AS MATERIALIZED (...)</code>; còn nếu muốn Optimizer tự do tối ưu xuyên thấu, hãy viết <code>WITH cte AS NOT MATERIALIZED (...)</code>.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 2.5-1 (Dự đoán kết quả): Điểm dừng của Recursive CTE",
          "level": "Cơ bản",
          "problem": "Xét câu lệnh sau:\nWITH RECURSIVE counter AS (\n    SELECT 1 AS num\n    UNION ALL\n    SELECT num + 2 FROM counter WHERE num < 9\n)\nSELECT * FROM counter;\nDự đoán tập các số được trả về và số lượng dòng của kết quả.",
          "hint": "Bắt đầu từ 1, mỗi lần lặp cộng thêm 2 với điều kiện num < 9.",
          "solutionCode": "-- Tầng 1 (Anchor): 1\n-- Tầng 2: 1 + 2 = 3\n-- Tầng 3: 3 + 2 = 5\n-- Tầng 4: 5 + 2 = 7\n-- Tầng 5: 7 + 2 = 9 (vẫn thỏa num = 7 < 9)\n-- Tầng 6: num = 9 không thỏa < 9 -> Dừng lại!\n-- Kết quả gồm: 1, 3, 5, 7, 9 -> Tổng cộng 5 dòng!",
          "solutionOutput": "1, 3, 5, 7, 9 (5 dòng)",
          "explanation": "Chẩn đoán lỗi: Nếu bạn nghĩ dừng ở 7, bạn quên rằng khi num = 7, điều kiện 7 < 9 vẫn là TRUE nên nó vẫn tính tiếp tầng tiếp theo ra 9."
        },
        {
          "title": "Bài tập 2.5-2 (Tìm & Sửa lỗi): Khắc phục lỗi lặp vô tận trong Recursive CTE",
          "level": "Trung bình",
          "problem": "Một lập trình viên viết câu lệnh đệ quy duyệt phả hệ nhưng bị treo cứng hệ thống:\n```sql\nWITH RECURSIVE org AS (\n    SELECT emp_id, manager_id FROM employees WHERE manager_id IS NULL\n    UNION ALL\n    SELECT e.emp_id, e.manager_id FROM employees e JOIN org o ON e.manager_id = o.emp_id\n)\nSELECT * FROM org;\n```\nNếu dữ liệu bị lỗi có chu trình kín, hãy bổ sung một cột cấp bậc và điều kiện chặn an toàn để câu lệnh không bao giờ chạy quá 10 tầng.",
          "hint": "Thêm cột level = 1 ở Anchor và level + 1 ở Recursive, kèm điều kiện WHERE o.level < 10.",
          "solutionCode": "-- Cách sửa có chốt chặn an toàn (Circuit Breaker):\nWITH RECURSIVE org AS (\n    SELECT emp_id, manager_id, 1 AS depth_level\n    FROM employees \n    WHERE manager_id IS NULL\n    \n    UNION ALL\n    \n    SELECT e.emp_id, e.manager_id, o.depth_level + 1\n    FROM employees e \n    JOIN org o ON e.manager_id = o.emp_id\n    WHERE o.depth_level < 10 -- CHỐT CHẶN AN TOÀN TUYỆT ĐỐI!\n)\nSELECT * FROM org;",
          "solutionOutput": "Query executed safely in 10ms without crashing.",
          "explanation": "Chẩn đoán lỗi: Luôn luôn có một biến đếm độ sâu (depth guard) là quy tắc an toàn bắt buộc cho mọi truy vấn đệ quy trong môi trường thực tế."
        },
        {
          "title": "Bài tập 2.5-3 (Tự viết truy vấn): Tách chuỗi phân tách bởi dấu phẩy bằng Recursive CTE",
          "level": "Nâng cao",
          "problem": "Cho một chuỗi chứa danh sách các mã sản phẩm: `\"101,102,103,104\"`. Hãy viết một câu truy vấn Recursive CTE để phân tách (Split String) chuỗi trên thành 4 dòng dữ liệu độc lập.",
          "hint": "Dùng INSTR hoặc POSITION để tìm dấu phẩy, SUBSTR để cắt chuỗi con ở từng tầng lặp.",
          "solutionCode": "WITH RECURSIVE split_tags AS (\n    SELECT \n        CAST('101,102,103,104' || ',' AS VARCHAR) AS remaining_str,\n        CAST('' AS VARCHAR) AS item\n    \n    UNION ALL\n    \n    SELECT \n        SUBSTRING(remaining_str, INSTR(remaining_str, ',') + 1),\n        SUBSTRING(remaining_str, 1, INSTR(remaining_str, ',') - 1)\n    FROM split_tags\n    WHERE LENGTH(remaining_str) > 0\n)\nSELECT item FROM split_tags WHERE LENGTH(item) > 0;",
          "solutionOutput": "101\n102\n103\n104",
          "explanation": "Một kỹ thuật phân tách chuỗi kinh điển chạy được trên cả SQLite, PostgreSQL và DuckDB mà không cần thư viện ngoài."
        },
        {
          "title": "Bài tập 2.5-4 (Đánh đổi & Kiến trúc): CTE Inlining vs Materialization",
          "level": "Nâng cao",
          "problem": "Một CTE chứa phép tính tổng hợp phức tạp mất 2 giây để hoàn thành được gọi 3 lần trong câu truy vấn chính. Trong PostgreSQL 12+, bạn nên khai báo `WITH cte AS MATERIALIZED (...)` hay `NOT MATERIALIZED`? Giải thích theo kế hoạch thực thi.",
          "hint": "Xem xét việc tính toán lại 3 lần vs Lưu kết quả 1 lần vào bảng tạm RAM.",
          "solutionCode": "-- Phân tích kiến trúc:\n-- 1. Nếu để mặc định (Inlining): Engine có thể tính toán lại biểu thức phức tạp đó 3 LẦN (mất 2s x 3 = 6 giây)!\n-- 2. Nếu dùng WITH cte AS MATERIALIZED:\n--    - Engine ép buộc chỉ tính toán CTE ĐÚNG 1 LẦN DUY NHẤT (mất 2 giây),\n--    - Lưu kết quả vào bảng tạm trong RAM, sau đó cả 3 lần gọi bên ngoài đều đọc trực tiếp từ bảng tạm đó.\n--    - Tiết kiệm 66% thời gian thực thi của câu lệnh!",
          "solutionOutput": "Chỉ định AS MATERIALIZED giúp tái sử dụng kết quả tính toán đắt đỏ.",
          "explanation": "Kiểm soát tính chất Materialize của CTE là vũ khí tối thượng khi tinh chỉnh hiệu năng SQL chuyên sâu."
        }
      ],
      "quiz": [
        {
          "question": "Phạm vi tồn tại (scope) của một bảng ảo được định nghĩa trong mệnh đề WITH (CTE) là bao lâu?",
          "options": [
            "Tồn tại vĩnh viễn trong CSDL cho đến khi chạy lệnh DROP.",
            "Tồn tại trong toàn bộ phiên làm việc (Session) của người dùng.",
            "Chỉ tồn tại trong phạm vi thực thi của DUY NHẤT một câu lệnh SQL chứa nó.",
            "Tồn tại trong vòng 24 giờ."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! CTE là cấu trúc tạm thời chỉ tồn tại và có hiệu lực bên trong câu truy vấn ngay sau nó."
        },
        {
          "question": "Cấu trúc của một câu lệnh CTE Đệ quy (Recursive CTE) bắt buộc phải bao gồm những thành phần nào sau đây?",
          "options": [
            "Mệnh đề GROUP BY và HAVING.",
            "Phần neo (Anchor Member), toán tử UNION ALL, và Phần đệ quy (Recursive Member) có điều kiện dừng.",
            "Chỉ mục B-tree và Khóa chính.",
            "Thủ tục lưu trữ Stored Procedure."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Ba thành phần bất biến: Anchor khởi tạo tầng 0, UNION ALL ghép tầng, và Recursive member lặp lại cho đến khi gặp điều kiện dừng."
        },
        {
          "question": "Rủi ro kỹ thuật lớn nhất khi viết Recursive CTE duyệt cây phả hệ mà không có điều kiện chặn độ sâu là gì?",
          "options": [
            "CSDL tự động xóa dữ liệu của bảng gốc.",
            "Nếu dữ liệu có chu trình lặp kín (Cycle: A quản lý B, B quản lý A), câu lệnh sẽ rơi vào vòng lặp vô tận gây nghẽn 100% CPU và tràn bộ nhớ máy chủ.",
            "CSDL tự động chuyển câu lệnh thành INNER JOIN.",
            "Tất cả các dòng dữ liệu bị chuyển thành NULL."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Chu trình lặp vô tận là tử huyệt của các thuật toán đệ quy. Luôn cần chốt chặn độ sâu hoặc kiểm tra chu trình."
        },
        {
          "question": "Để sinh ra một chuỗi liên tục các ngày trong tháng (Calendar Dimension) nhằm lấp đầy các ngày không có đơn hàng trong báo cáo, kỹ thuật SQL nào là tối ưu nhất?",
          "options": [
            "Tạo một bảng Excel rồi import bằng tay mỗi sáng.",
            "Sử dụng WITH RECURSIVE để cộng dồn từng ngày từ ngày bắt đầu đến ngày kết thúc.",
            "Dùng lệnh UPDATE bảng orders.",
            "Dùng toán tử CROSS JOIN hai lần."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Recursive CTE sinh chuỗi thời gian liên tục cực nhanh chỉ trong vài dòng code mà không cần duy trì bảng tĩnh."
        },
        {
          "question": "Trong PostgreSQL 12 trở lên, từ khóa WITH cte AS MATERIALIZED có tác dụng kỹ thuật gì?",
          "options": [
            "Lưu vĩnh viễn bảng CTE vào ổ đĩa cứng.",
            "Ép CSDL thực thi và lưu kết quả của CTE đúng 1 lần vào bộ nhớ tạm để tái sử dụng, ngăn Optimizer hòa tan (inlining) câu lệnh.",
            "Bắt buộc bảng CTE phải có Khóa ngoại.",
            "Tự động sao lưu dữ liệu sang máy chủ phụ."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Từ khóa AS MATERIALIZED ngăn cản Optimizer tính toán lại CTE nhiều lần khi nó được tham chiếu lặp lại trong câu lệnh chính."
        }
      ],
      "summary": [
        "CTE (mệnh đề WITH) giúp chia nhỏ truy vấn phức tạp thành pipeline dữ liệu dễ đọc, dễ bảo trì.",
        "Recursive CTE gồm 3 phần: Anchor (phần neo), UNION ALL và Recursive member (phần đệ quy).",
        "Recursive CTE là vũ khí tối thượng để duyệt cây phả hệ, phân cấp tổ chức và sinh chuỗi thời gian liên tục.",
        "Luôn có chốt chặn an toàn (như kiểm tra độ sâu) để phòng chống bẫy lặp vô tận do chu trình dữ liệu.",
        "Ôn cách quãng: Tại sao câu lệnh UPDATE/DELETE quên WHERE lại là thảm họa không thể cứu vãn nếu thiếu Transaction? (Xem lại Bài 1.2)."
      ]
    },
    {
      "id": "sql-13-dq-data-validation",
      "number": "2.6",
      "title": "[DQ] Kiểm Tra Chất Lượng Dữ Liệu Bằng SQL: Bắt Trùng Lặp, Mồ Côi & Đối Soát",
      "subtitle": "Xây dựng bộ truy vấn canh gác dữ liệu: Bắt bản ghi mồ côi bằng Anti-join, cô lập dị thường và đối soát toàn vẹn",
      "level": "Trung cấp",
      "duration": "45 phút",
      "keywords": [
        "Data Quality",
        "Data Validation",
        "Anti-join",
        "Orphan Records",
        "Duplicate Detection",
        "Reconciliation",
        "Quarantine Table"
      ],
      "prerequisites": "Nắm vững Gom nhóm & HAVING (Bài 2.1), Kỹ thuật Anti-join (Bài 2.2), Subqueries (Bài 2.4) và CTE (Bài 2.5).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Làm chủ quy ước vàng của truy vấn kiểm định [DQ]: Truy vấn chỉ trả về các dòng vi phạm; tập kết quả RỖNG (0 dòng) đồng nghĩa toàn bộ dữ liệu ĐẠT chuẩn.",
        "Thành thạo kỹ thuật phát hiện và cô lập dòng trùng lặp khóa nghiệp vụ bằng GROUP BY và HAVING COUNT(*) > 1.",
        "Vận dụng kỹ thuật Anti-join (LEFT JOIN ... IS NULL hoặc NOT EXISTS) để truy quét các bản ghi mồ côi (Orphan Foreign Keys) khi CSDL tắt ràng buộc khóa ngoại cứng.",
        "Xây dựng truy vấn đối soát tài chính (Financial Reconciliation) giữa bảng cha (orders) và bảng con (order_items) bằng CTE và hàm ABS().",
        "Thiết kế kiến trúc Bảng cách ly (Quarantine Table / Dead Letter Queue) và hiểu cách tích hợp câu lệnh SQL kiểm định vào pipeline tự động hóa (dbt test)."
      ],
      "intuition": {
        "title": "Cổng kiểm soát an ninh sân bay và Hóa đơn không có người nhận",
        "metaphor": "Khi bạn đi qua cửa an ninh sân bay, nếu máy quét không kêu bíp bíp (tập kết quả RỖNG), bạn được thông quan an toàn. Nhưng nếu máy quét phát hiện vật cấm, nó sẽ giữ bạn lại và hiển thị đúng đồ vật vi phạm lên màn hình soi chiếu. Các truy vấn [DQ] hoạt động y hệt như vậy: trong một pipeline dữ liệu lành mạnh, truy vấn kiểm định phải trả về 0 dòng! Nếu nó trả về dù chỉ 1 dòng, tức là đã phát hiện \"vật cấm\" (đơn hàng mồ côi không có khách hàng, đơn hàng trùng lặp) cần phải cách ly ngay lập tức.",
        "boundary": "Ẩn dụ này giúp bạn hiểu quy ước kiểm tra; trong thực tế sản xuất, các dòng vi phạm bắt được sẽ không bị xóa bỏ bừa bãi bằng lệnh DELETE mà được tự động chuyển hướng vào một bảng cách ly gọi là Quarantine Table để gửi thông báo cho đội kỹ thuật xử lý và bảo toàn dấu vết kiểm toán (Audit Trail).",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">RAW STAGING TABLE</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">raw_dirty_orders</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Chứa lỗi tiền âm, trùng, mồ côi</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:200px;\">\n                <div style=\"font-size:0.75rem;color:var(--topic-sql);margin-bottom:4px;font-weight:700;\">VALIDATION SUITE (ASSERTIONS)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">CASE WHEN + ANTI-JOIN</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Phân luồng kiểm duyệt toàn vẹn</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">GOLD / QUARANTINE</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--success);font-family:monospace;\">Clean vs DLQ</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Sạch nạp vào kho; Lỗi cách ly</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Mẫu Dead Letter Queue (DLQ):</span>\n              <span>Dữ liệu bẩn không được phép làm sập pipeline, nhưng bắt buộc phải ghi nhận vào bảng cách ly kèm mã lỗi cụ thể để đội ngũ kỹ thuật đối soát.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-13-problem-hook",
          "title": "Gợi Mở Vấn Đề: Cơn Ác Mộng Dữ Liệu Rác Khi Tắt Khóa Ngoại Trên Kho Dữ Liệu",
          "content": "\n            <p>Trong các hệ thống phần mềm thương mại điện tử hoặc ứng dụng tài chính, để nạp hàng triệu dòng dữ liệu mỗi giờ vào Data Warehouse (như BigQuery, Snowflake, ClickHouse, Databricks), các kỹ sư buộc phải <strong>vô hiệu hóa các ràng buộc khóa ngoại cứng (FOREIGN KEY constraints)</strong> nhằm tăng tốc độ ghi dữ liệu song song.</p>\n            <p>Hậu quả là gì nếu hệ thống không có lớp rào chắn kiểm định tự động bằng SQL?</p>\n            <ul>\n              <li><strong>Bản ghi mồ côi (Orphan Records):</strong> Đơn hàng lưu mã khách hàng <code>customer_id = 999</code>, nhưng bảng khách hàng hoàn toàn không có ai mang mã 999! Báo cáo CRM khi JOIN với bảng khách hàng sẽ làm bốc hơi toàn bộ đơn hàng này.</li>\n              <li><strong>Trùng lặp khóa nghiệp vụ (Duplicate Keys):</strong> Người dùng click đúp nút thanh toán hoặc hệ thống đồng bộ mạng bị retry, khiến một đơn hàng bị chèn thành 2 dòng, nhân đôi doanh thu báo cáo.</li>\n              <li><strong>Lệch sổ sách tài chính:</strong> Tổng tiền ghi trên hóa đơn <code>orders.total_amount</code> không bằng tổng tiền của các món hàng trong <code>order_items</code>, khiến kế toán bị kiểm toán viên phạt nặng!</li>\n            </ul>\n            <p>Nếu không có các truy vấn SQL tự động kiểm định chất lượng (Data Quality Validation), dữ liệu rác sẽ âm thầm lọt vào báo cáo BI, đầu độc các mô hình học máy và khiến ban lãnh đạo đưa ra quyết định sai lầm.</p>\n          "
        },
        {
          "id": "sec-13-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Truy Hồi Kỹ Thuật Anti-Join & Gom Nhóm",
          "content": "\n            <p>Trước khi xây dựng bộ truy vấn kiểm định, hãy cùng trả lời nhanh 3 câu hỏi truy hồi từ các bài học trước:</p>\n            \n            <div class=\"predict-question\">\n              <strong>Câu hỏi 1 (Từ Bài 2.1):</strong> Mệnh đề nào trong SQL được dùng để lọc bỏ các nhóm có số lượng phần tử bằng 1 và chỉ giữ lại các nhóm có số lượng phần tử lớn hơn 1?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Mệnh đề <code>HAVING COUNT(*) &gt; 1</code>. Mệnh đề <code>WHERE</code> không thể lọc trên kết quả của hàm tổng hợp vì nó thực thi trước giai đoạn gom nhóm (GROUP BY).</p>\n              </div>\n            </details>\n\n            <div class=\"predict-question\" style=\"margin-top: 1rem;\">\n              <strong>Câu hỏi 2 (Từ Bài 2.2):</strong> Kỹ thuật nào sử dụng phép ghép ngoài <code>LEFT JOIN</code> để tìm các dòng ở bảng trái mà hoàn toàn không có bản ghi tương ứng ở bảng phải?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Kỹ thuật <strong>Anti-join</strong> bằng cách kết hợp <code>LEFT JOIN ... ON ...</code> với điều kiện lọc <code>WHERE right_table.primary_key IS NULL</code>.</p>\n              </div>\n            </details>\n\n            <div class=\"predict-question\" style=\"margin-top: 1rem;\">\n              <strong>Câu hỏi 3 (Từ Bài 2.4):</strong> Tại sao biểu thức <code>col NOT IN (SELECT sub_col FROM sub_table)</code> có thể trở thành cạm bẫy chết người nếu <code>sub_col</code> chứa dù chỉ 1 giá trị <code>NULL</code>?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Vì theo logic ba giá trị (3VL), phép so sánh <code>col != NULL</code> luôn trả về <code>UNKNOWN</code>. Khi kết hợp chuỗi bằng toán tử <code>AND</code>, kết quả toàn bộ mệnh đề bị triệt tiêu thành <code>UNKNOWN</code> hoặc <code>FALSE</code>, khiến câu truy vấn trả về 0 dòng kết quả (rỗng) mặc dù có dữ liệu vi phạm!</p>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-13-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Quy Ước Vàng Của Truy Vấn Kiểm Định [DQ]",
          "content": "\n            <div class=\"concept-box callout-info\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-shield-alt\"></i></span>\n                <span class=\"concept-title\">Quy Ước Vàng Của Data Quality Assertion: Chỉ Trả Về Dòng Vi Phạm</span>\n              </div>\n              <div class=\"concept-body\">\n                <p>Trong kỹ thuật dữ liệu chuyên nghiệp (Data Engineering), một truy vấn kiểm định chất lượng dữ liệu <strong>PHẢI ĐƯỢC THIẾT KẾ ĐỂ TRẢ VỀ CÁC DÒNG VI PHẠM (Violating Rows)</strong>:</p>\n                <ul>\n                  <li><strong>Tập kết quả RỖNG (0 rows):</strong> Trạng thái ĐẠT (PASS) &mdash; Không có bất kỳ dòng nào vi phạm quy tắc. Pipeline dữ liệu được phép chạy tiếp.</li>\n                  <li><strong>Tập kết quả CÓ DÒNG (&gt; 0 rows):</strong> Trạng thái THẤT BẠI (FAIL) &mdash; Phát hiện bất thường. Mỗi dòng trả về chính là một bằng chứng vi phạm cụ thể (kèm mã lỗi, khóa chính) để kích hoạt hệ thống cảnh báo và cách ly.</li>\n                </ul>\n              </div>\n            </div>\n\n            <p>Dưới đây là bảng 4 trụ cột kiểm định chất lượng dữ liệu bắt buộc trong mọi kho dữ liệu:</p>\n\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Trụ Cột Kiểm Định</th>\n                  <th scope=\"col\">Mục Tiêu Kiểm Tra</th>\n                  <th scope=\"col\">Kỹ Thuật SQL Cốt Lõi</th>\n                  <th scope=\"col\">Kết Quả Đạt Chuẩn</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">1. Uniqueness (Đơn nhất)</th>\n                  <td>Không trùng lặp khóa chính hoặc khóa nghiệp vụ</td>\n                  <td><code>GROUP BY business_key HAVING COUNT(*) &gt; 1</code></td>\n                  <td>0 dòng trả về</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">2. Referential Integrity (Toàn vẹn tham chiếu)</th>\n                  <td>Không có khóa ngoại mồ côi (Orphan Foreign Keys)</td>\n                  <td>Anti-join: <code>LEFT JOIN ... WHERE right.pk IS NULL</code> hoặc <code>NOT EXISTS</code></td>\n                  <td>0 dòng trả về</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">3. Reconciliation (Đối soát tài chính)</th>\n                  <td>Tổng tiền ở bảng tổng hợp phải bằng tổng chi tiết các món hàng</td>\n                  <td>CTE tính tổng chi tiết ghép với bảng cha và kiểm tra <code>ABS(diff) &gt; 0.01</code></td>\n                  <td>0 dòng trả về</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">4. Domain Validity (Miền giá trị hợp lệ)</th>\n                  <td>Giá trị nằm trong tập danh mục cho phép và không bị NULL bất thường</td>\n                  <td><code>WHERE col NOT IN (...) OR col IS NULL</code></td>\n                  <td>0 dòng trả về</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-13-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Dữ Liệu Biến Đổi Từng Bước Qua Các Phép Kiểm Tra",
          "content": "\n            <p>Hãy xem cách SQL Engine xử lý bên trong đối với 2 kỹ thuật kiểm định phổ biến nhất:</p>\n\n            <p><strong>Cơ chế 1: Săn lùng bản ghi trùng lặp (Duplicate Detection)</strong></p>\n            <ol>\n              <li>Engine đọc các dòng từ bảng dữ liệu thô và băm (hash) theo cột khóa nghiệp vụ <code>order_id</code> vào các thùng (Buckets).</li>\n              <li>Bộ đếm <code>COUNT(*)</code> tăng dần cho mỗi dòng rơi vào thùng tương ứng.</li>\n              <li>Mệnh đề <code>HAVING COUNT(*) &gt; 1</code> đóng vai trò bộ lọc cuối: chỉ những thùng có số đếm lớn hơn 1 mới được xuất ra bảng kết quả.</li>\n            </ol>\n\n            <p><strong>Cơ chế 2: Săn lùng bản ghi mồ côi bằng Anti-join</strong></p>\n            <ol>\n              <li>Engine dựng bảng băm (Hash Table) chứa toàn bộ các khóa chính hợp lệ từ bảng danh mục cha <code>customers(customer_id)</code>.</li>\n              <li>Engine quét từng dòng của bảng con <code>raw_dirty_orders</code> và tra cứu khóa ngoại <code>customer_id</code> trong bảng băm.</li>\n              <li>Nếu tìm thấy, engine ghép nối thông tin bình thường. Nếu KHÔNG tìm thấy, engine điền toàn bộ giá trị <code>NULL</code> cho các cột thuộc bảng <code>customers</code>.</li>\n              <li>Mệnh đề <code>WHERE c.customer_id IS NULL</code> lọc giữ lại đúng các dòng thất bại trong việc tra cứu, bắt trúng các bản ghi mồ côi!</li>\n            </ol>\n          "
        },
        {
          "id": "sec-13-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Bộ Ba Truy Vấn Kiểm Định Trên TechMart",
          "content": "\n            <p>Chúng ta sẽ thực thi bộ ba truy vấn kiểm định thực tế trên bộ dữ liệu TechMart. Hãy dự đoán kết quả trước khi xem lời giải chi tiết:</p>\n\n            <div class=\"predict-question\">\n              <strong>Thử thách dự đoán:</strong> Bảng <code>raw_dirty_orders</code> của TechMart có 5 dòng dữ liệu thô. Nếu chạy truy vấn kiểm tra trùng lặp theo <code>order_id</code> và kiểm tra mồ côi khách hàng, những đơn hàng nào sẽ bị bắt?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem kết quả phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Dự đoán chính xác:</strong></p>\n                <ul>\n                  <li>Đơn hàng <code>2001</code> bị chèn lặp lại 2 lần (raw_id: 1 và 2) &rarr; Bị bắt bởi kiểm định Uniqueness.</li>\n                  <li>Đơn hàng <code>2002</code> (raw_id: 3) có <code>customer_id = 999</code> không tồn tại trong danh mục khách hàng &rarr; Bị bắt bởi kiểm định Mồ côi (Referential Integrity).</li>\n                  <li>Đơn hàng <code>2003</code> (raw_id: 4) có trạng thái <code>status IS NULL</code> &rarr; Bị bắt bởi kiểm định Miền giá trị (Domain Validity).</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Kiểm định 1: Bắt trùng lặp đơn hàng trên raw_dirty_orders",
              "code": "-- 1. Bắt trùng lặp khóa nghiệp vụ order_id\nSELECT \n    order_id,\n    COUNT(*) AS duplicate_count,\n    GROUP_CONCAT(raw_id) AS conflicting_raw_ids,\n    'LỖI TRÙNG LẶP: Mã order_id xuất hiện nhiều hơn 1 lần trong bảng thô' AS error_description\nFROM raw_dirty_orders\nGROUP BY order_id\nHAVING COUNT(*) > 1;",
              "explanation": "Gom nhóm theo order_id và giữ lại các nhóm có COUNT > 1. Hàm GROUP_CONCAT giúp gom các ID dòng vật lý xung đột để phục vụ điều tra.",
              "output": "+----------+-----------------+---------------------+---------------------------------------------------------------+\n| order_id | duplicate_count | conflicting_raw_ids | error_description                                             |\n+----------+-----------------+---------------------+---------------------------------------------------------------+\n| 2001     | 2               | 1,2                 | LỖI TRÙNG LẶP: Mã order_id xuất hiện nhiều hơn 1 lần trong... |\n+----------+-----------------+---------------------+---------------------------------------------------------------+\n(Bắt đúng đơn 2001 bị nhân đôi - Đã kiểm chứng trên DuckDB 2.0.0 & SQLite 3.50.4)"
            },
            {
              "lang": "SQL",
              "title": "Kiểm định 2: Bắt bản ghi mồ côi trỏ tới khách hàng không tồn tại",
              "code": "-- 2. Bắt đơn hàng mồ côi (Orphan Foreign Keys) bằng Anti-join\nSELECT \n    r.raw_id,\n    r.order_id,\n    r.customer_id AS invalid_customer_id,\n    r.customer_name,\n    'LỖI MỒ CÔI: Khách hàng không tồn tại trong danh mục customers' AS error_description\nFROM raw_dirty_orders r\nLEFT JOIN customers c ON r.customer_id = c.customer_id\nWHERE c.customer_id IS NULL;",
              "explanation": "Phép ghép ngoài LEFT JOIN và lọc WHERE c.customer_id IS NULL tóm gọn chính xác đơn hàng 2002 có customer_id = 999.",
              "output": "+--------+----------+---------------------+------------------+-------------------------------------------------------------+\n| raw_id | order_id | invalid_customer_id | customer_name    | error_description                                           |\n+--------+----------+---------------------+------------------+-------------------------------------------------------------+\n| 3      | 2002     | 999                 | Khach La Vo Danh | LỖI MỒ CÔI: Khách hàng không tồn tại trong danh mục customers |\n+--------+----------+---------------------+------------------+-------------------------------------------------------------+\n(Bắt đúng đơn hàng mồ côi raw_id: 3 - Đã kiểm chứng trên DuckDB 2.0.0 & SQLite 3.50.4)"
            },
            {
              "lang": "SQL",
              "title": "Kiểm định 3: Đối soát số tiền giữa bảng orders và chi tiết order_items",
              "code": "-- 3. Đối soát tài chính: Kiểm tra độ lệch tiền giữa đơn hàng và chi tiết\nWITH calculated_items AS (\n    SELECT \n        order_id,\n        SUM(quantity * unit_price) AS items_total\n    FROM order_items\n    GROUP BY order_id\n)\nSELECT \n    o.order_id,\n    o.total_amount AS recorded_amount,\n    ci.items_total AS calculated_amount,\n    ROUND(o.total_amount - ci.items_total, 2) AS difference_amount,\n    'LỖI ĐỐI SOÁT: Tổng tiền đơn hàng không khớp với tổng tiền chi tiết các món hàng' AS error_description\nFROM orders o\nJOIN calculated_items ci ON o.order_id = ci.order_id\nWHERE ABS(o.total_amount - ci.items_total) > 0.01;",
              "explanation": "Sử dụng CTE tính tổng chi tiết và so sánh với tổng tiền hóa đơn. Trên bộ dữ liệu chuẩn TechMart, kết quả trả về RỖNG (0 dòng), khẳng định dữ liệu tài chính sạch 100%!",
              "output": "Empty result set (0 rows).\n=> KẾT LUẬN KIỂM ĐỊNH: Tất cả đơn hàng đều khớp chính xác từng hào giữa hóa đơn và chi tiết món hàng! (Đạt chuẩn PASS 100%)"
            }
          ]
        },
        {
          "id": "sec-13-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Kiểm Tra Tính Toàn Vẹn Miền Giá Trị",
          "content": "\n            <p>Quy tắc nghiệp vụ của TechMart quy định: Cột <code>status</code> của đơn hàng chỉ được phép nhận 1 trong 3 trạng thái: <code>'PENDING'</code>, <code>'COMPLETED'</code>, <code>'CANCELLED'</code>. Bất kỳ giá trị nào khác (kể cả giá trị <code>NULL</code>) đều bị coi là vi phạm nghiêm trọng.</p>\n            <p>Hãy điền các từ khóa thích hợp vào các vị trí <code>[___1___]</code> đến <code>[___4___]</code> để hoàn thiện câu truy vấn kiểm định:</p>\n\n            <div class=\"code-faded-block\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; line-height: 1.8;\">\n              SELECT <br>\n              &nbsp;&nbsp;&nbsp;&nbsp;raw_id, order_id, status,<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;'LỖI MIỀN GIÁ TRỊ: Trạng thái không hợp lệ' AS error_desc<br>\n              FROM raw_dirty_orders<br>\n              WHERE status [___1___] IN ('PENDING', 'COMPLETED', 'CANCELLED')<br>\n              &nbsp;&nbsp;&nbsp;[___2___] status [___3___] [___4___];\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top: 1rem;\">\n              <summary>Xem đáp án điền khuyết</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án chính xác:</strong></p>\n                <ul>\n                  <li><code>[___1___]</code>: <strong>NOT</strong> &mdash; Lọc các giá trị không nằm trong danh mục cho phép.</li>\n                  <li><code>[___2___]</code>: <strong>OR</strong> &mdash; Bắt buộc dùng OR để gộp cả trường hợp bị NULL (vì NOT IN không đánh giá được NULL là TRUE).</li>\n                  <li><code>[___3___]</code>: <strong>IS</strong></li>\n                  <li><code>[___4___]</code>: <strong>NULL</strong></li>\n                </ul>\n                <p><strong>Câu lệnh hoàn chỉnh:</strong></p>\n                <pre><code>SELECT raw_id, order_id, status, 'LỖI MIỀN GIÁ TRỊ: Trạng thái không hợp lệ' AS error_desc\nFROM raw_dirty_orders\nWHERE status NOT IN ('PENDING', 'COMPLETED', 'CANCELLED')\n   OR status IS NULL;</code></pre>\n                <p>Kết quả chạy thật trên DuckDB & SQLite bắt trúng dòng <code>raw_id: 4</code> (có status là NULL)!</p>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-13-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Kiểm Định Dữ Liệu",
          "content": "\n            <div class=\"concept-box callout-danger\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-exclamation-triangle\"></i></span>\n                <span class=\"concept-title\">Bẫy 1: Viết Truy Vấn Trả Về Dòng ĐẠT Chuẩn Thay Vì Dòng VI PHẠM</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Người mới bắt đầu thường viết truy vấn: <code>SELECT * FROM orders WHERE status IN ('PENDING', 'COMPLETED')</code>.</p>\n                <p><strong>Hậu quả:</strong> Nếu bảng có 100 triệu dòng, câu lệnh sẽ đổ ra 99.999.990 dòng hợp lệ! Không ai có thể kiểm tra kết quả này và hệ thống tự động cũng không biết phải báo cáo lỗi ở đâu. Luôn viết truy vấn trả về các dòng vi phạm để tập kết quả bình thường là 0 dòng (rỗng).</p>\n              </div>\n            </div>\n\n            <div class=\"concept-box callout-danger\" style=\"margin-top: 1.25rem;\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-trash-alt\"></i></span>\n                <span class=\"concept-title\">Bẫy 2: Chạy Lệnh DELETE Trực Tiếp Trên Bảng Dữ Liệu Thô</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Khi thấy dòng lỗi, vội vàng chạy: <code>DELETE FROM raw_dirty_orders WHERE customer_id = 999;</code>.</p>\n                <p><strong>Hậu quả:</strong> Bạn đã hủy hoại hoàn toàn dấu vết kiểm toán (Audit Trail)! Khi lập trình viên ứng dụng cần điều tra nguyên nhân vì sao app lại gửi đơn hàng mã 999, dữ liệu đã biến mất không còn tung tích. Luôn di chuyển dòng lỗi vào bảng cách ly (Quarantine Table) thay vì xóa bỏ.</p>\n              </div>\n            </div>\n\n            <div class=\"concept-box callout-danger\" style=\"margin-top: 1.25rem;\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-calculator\"></i></span>\n                <span class=\"concept-title\">Bẫy 3: Đối Soát Tiền Tệ Bằng Phép So Sánh Bằng Tuyệt Đối (= 0)</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Viết <code>WHERE total_amount - calculated_amount != 0</code> trên các cột lưu kiểu <code>FLOAT</code> hoặc <code>REAL</code>.</p>\n                <p><strong>Hậu quả:</strong> Sai số dấu phẩy động IEEE 754 có thể tạo ra độ lệch siêu nhỏ <code>0.00000000000001</code>, khiến hàng ngàn đơn hàng hoàn toàn chính xác vẫn bị báo lỗi lệch tiền giả. Luôn dùng khoảng dung sai <code>ABS(diff) &gt; 0.01</code> hoặc ép kiểu về <code>NUMERIC(18, 2)</code>.</p>\n              </div>\n            </div>\n          "
        },
        {
          "id": "sec-13-concept-comparison",
          "title": "So Sánh: Data Profiling vs Data Validation vs Data Cleansing",
          "content": "\n            <p>Để định vị đúng vai trò của kiểm định dữ liệu trong kỹ thuật dữ liệu, hãy phân biệt rõ 3 khái niệm thường bị nhầm lẫn:</p>\n\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Tiêu Chí</th>\n                  <th scope=\"col\">Data Profiling (Bài 1.5)</th>\n                  <th scope=\"col\">Data Validation (Bài 2.6)</th>\n                  <th scope=\"col\">Data Cleansing (Tầng 4)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">Mục đích chính</th>\n                  <td>Khảo sát, khám phá hình thái dữ liệu thô (tỷ lệ NULL, min/max, độ phủ)</td>\n                  <td>Canh gác, kiểm tra dữ liệu có tuân thủ các quy tắc logic nghiệp vụ không</td>\n                  <td>Chữa lành, chuẩn hóa và sửa chữa dữ liệu sai thành dữ liệu chuẩn</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Thời điểm thực hiện</th>\n                  <td>Trước khi thiết kế pipeline dữ liệu</td>\n                  <td>Tự động hóa liên tục trong mỗi lần chạy pipeline (CI/CD, Ingestion)</td>\n                  <td>Trong giai đoạn chuyển đổi (Transformation / Silver Layer)</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Đầu ra mong muốn</th>\n                  <td>Bảng số liệu thống kê tổng quát</td>\n                  <td>Tập kết quả RỖNG (0 dòng) = PASS; Danh sách dòng lỗi nếu FAIL</td>\n                  <td>Bảng dữ liệu sạch đã được chuẩn hóa và loại bỏ dị thường</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Ví dụ điển hình</th>\n                  <td>Đếm tỷ lệ NULL của cột email trong bảng khách hàng</td>\n                  <td>Bắt các đơn hàng mồ côi không có khách hàng tương ứng</td>\n                  <td>Thay thế email NULL bằng 'unknown@domain.com', xóa khoảng trắng thừa</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-13-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Mô Hình Bảng Cách Ly (Quarantine Pattern) & Tích Hợp dbt",
          "content": "\n            <p>Trong các kiến trúc dữ liệu hiện đại (Modern Data Stack), kiểm định dữ liệu không được chạy thủ công bằng tay mà được tự động hóa hoàn toàn thông qua hai cơ chế:</p>\n\n            <p><strong>1. Mô hình Bảng cách ly (Quarantine Table / Dead Letter Queue)</strong></p>\n            <p>Thay vì để pipeline bị chết đứng hoặc xóa dữ liệu, các dòng vi phạm được tự động chuyển hướng (route) vào bảng <code>quarantine_orders</code> để tiếp tục xử lý:</p>\n\n            <pre><code>-- Tự động bơm các bản ghi mồ côi vào bảng cách ly\nINSERT INTO quarantine_orders (raw_id, order_id, customer_id, error_code, error_message)\nSELECT \n    r.raw_id, r.order_id, r.customer_id,\n    'ERR_ORPHAN_CUSTOMER',\n    'Khóa ngoại customer_id không tồn tại trong danh mục khách hàng'\nFROM raw_dirty_orders r\nLEFT JOIN customers c ON r.customer_id = c.customer_id\nWHERE c.customer_id IS NULL;</code></pre>\n\n            <p><strong>2. Tích hợp kiểm thử tự động với framework dbt (dbt test)</strong></p>\n            <p>Bốn truy vấn SQL mà bạn đã học chính là cốt lõi của các bài kiểm thử khai báo (Declarative Tests) trong dbt:</p>\n            <ul>\n              <li><code>unique</code>: Biên dịch thành <code>GROUP BY col HAVING COUNT(*) &gt; 1</code>.</li>\n              <li><code>not_null</code>: Biên dịch thành <code>SELECT * FROM table WHERE col IS NULL</code>.</li>\n              <li><code>relationships</code>: Biên dịch thành Anti-join <code>LEFT JOIN ... WHERE right.pk IS NULL</code>.</li>\n              <li><code>accepted_values</code>: Biên dịch thành <code>WHERE col NOT IN (...)</code>.</li>\n            </ul>\n\n            <div class=\"concept-box callout-warning\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-tachometer-alt\"></i></span>\n                <span class=\"concept-title\">Đánh Đổi Hiệu Năng: Kiểm Định Toàn Bảng vs Kiểm Định Gia Tăng (Incremental)</span>\n              </div>\n              <div class=\"concept-body\">\n                <p>Khi bảng dữ liệu đạt quy mô hàng trăm triệu dòng, việc thực hiện JOIN toàn bảng mỗi lần nạp sẽ làm tắc nghẽn kho dữ liệu. Kỹ sư dữ liệu cao cấp luôn áp dụng <strong>Kiểm Định Gia Tăng (Incremental Testing)</strong>: chỉ thực hiện các câu truy vấn kiểm tra trên phân vùng dữ liệu mới nạp trong giờ hoặc trong ngày (ví dụ: <code>WHERE ingestion_time &gt;= NOW() - INTERVAL '1 hour'</code>).</p>\n              </div>\n            </div>\n          "
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi quy ước: Viết truy vấn kiểm tra trả về danh sách dòng ĐẠT chuẩn",
            "content": "Nhiều người mới làm viết truy vấn trả về các dòng hợp lệ (ví dụ WHERE status IN (...)). Nhưng nếu bảng có 100 triệu dòng, bạn không thể duyệt mắt nhìn 99.990.000 dòng đạt chuẩn để tìm 10 dòng bị lỗi! Luôn luôn viết truy vấn trả về các dòng VI PHẠM để danh sách trả về là tối thiểu, giúp tự động hóa dễ dàng tích hợp cờ cảnh báo (Alert Trigger khi COUNT > 0)."
          },
          {
            "title": "Cạm bẫy phá hủy dấu vết: Chạy lệnh DELETE trực tiếp trên bảng dữ liệu thô",
            "content": "Xóa trực tiếp các dòng lỗi bằng DELETE là điều cấm kỵ trong Data Engineering. Bạn sẽ làm mất bằng chứng để đối soát với nhà cung cấp dữ liệu hoặc lập trình viên ứng dụng (không thể trả lời câu hỏi: \"Đơn hàng này mất tích từ bao giờ?\"). Luôn áp dụng mô hình Quarantine Table."
          },
          {
            "title": "Cạm bẫy toán tử NOT IN khi kiểm định miền giá trị có chứa NULL",
            "content": "Khi kiểm tra giá trị cột có thuộc danh mục cho phép không, nếu bạn viết WHERE col NOT IN (SELECT valid_val FROM categories), mà bảng categories có chứa dù chỉ 1 dòng NULL, câu truy vấn sẽ trả về 0 dòng vi phạm mặc dù dữ liệu có lỗi nghiêm trọng! Luôn sử dụng NOT EXISTS hoặc xử lý IS NOT NULL rõ ràng."
          }
        ],
        "tips": [
          {
            "title": "Chuyển hóa sang bài kiểm thử tự động với framework dbt (dbt test)",
            "content": "Ba câu truy vấn kiểm tra mà bạn vừa học chính là nền tảng nguyên lý của 4 bài test cốt lõi trong framework dbt: unique (kiểm định trùng lặp), not_null (kiểm tra rỗng), relationships (kiểm tra mồ côi bằng foreign key), và accepted_values (kiểm tra miền giá trị hợp lệ)."
          },
          {
            "title": "Tối ưu kiểm định gia tăng (Incremental Data Validation)",
            "content": "Trên bảng dữ liệu hàng tỷ dòng, việc chạy JOIN toàn bảng để kiểm tra mồ côi mỗi ngày sẽ gây cạn kiệt tài nguyên máy chủ. Kỹ sư chuyên nghiệp chỉ áp dụng câu truy vấn kiểm định trên phân vùng dữ liệu mới nạp trong ngày (ví dụ: WHERE created_at >= CURRENT_DATE)."
          }
        ],
        "deepDive": {
          "title": "Thiết kế mẫu Dead Letter Queue (DLQ) & Quarantine Table trong Data Engineering",
          "content": "<p>Trong các luồng tích hợp dữ liệu (ETL/ELT) hiện đại, nguyên tắc sống còn là: <strong>Không bao giờ để dữ liệu lỗi làm gián đoạn toàn bộ đường ống, nhưng tuyệt đối không cho phép dữ liệu bẩn lọt vào Data Warehouse chính</strong>.</p><p>Mẫu thiết kế <strong>Quarantine Table (Bảng Cách Ly)</strong> hay Dead Letter Queue (DLQ) bao gồm các cột siêu dữ liệu: <code>quarantine_id</code> (PK), <code>raw_payload</code> (dữ liệu thô JSON/String), <code>violated_rule</code> (tên quy tắc vi phạm, ví dụ: 'NEGATIVE_AMOUNT'), <code>detected_at</code> (thời điểm phát hiện), và <code>resolved_flag</code>. Sử dụng lệnh <code>INSERT INTO clean_table ... RETURNING</code> kết hợp với transaction giúp bạn chia tách 100% dòng đạt chuẩn và dòng lỗi trong cùng một mẻ nạp nguyên tử.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 2.6-1 (Dự đoán kết quả): Anti-join truy lùng danh mục rác",
          "level": "Trung bình",
          "problem": "Cho bảng sản phẩm raw_products và bảng danh mục categories. Nếu thực hiện truy vấn: SELECT p.product_id, p.product_name FROM raw_products p LEFT JOIN categories c ON p.category_id = c.category_id WHERE c.category_id IS NULL; kết quả trả về mang ý nghĩa nghiệp vụ gì?",
          "hint": "Quan sát mệnh đề WHERE c.category_id IS NULL trên bảng bên phải của phép LEFT JOIN.",
          "solutionCode": "-- Truy vấn trả về các sản phẩm mồ côi danh mục\nSELECT p.product_id, p.product_name \nFROM raw_products p \nLEFT JOIN categories c ON p.category_id = c.category_id \nWHERE c.category_id IS NULL;",
          "solutionOutput": "Danh sách các sản phẩm đang trỏ tới một mã danh mục category_id không tồn tại trong bảng categories.",
          "explanation": "Chẩn đoán: Nếu bạn nghĩ truy vấn trả về các danh mục không có sản phẩm, bạn đã nhầm lẫn chiều ghép! Phép LEFT JOIN giữ lại toàn bộ sản phẩm ở bảng trái; điều kiện WHERE c.category_id IS NULL chỉ lọc các sản phẩm mà bên danh mục không tìm thấy khớp, tức là sản phẩm mồ côi danh mục."
        },
        {
          "title": "Bài tập 2.6-2 (Tìm & Sửa lỗi): Khắc phục lỗi kiểm tra toàn vẹn miền giá trị",
          "level": "Trung bình",
          "problem": "Một kỹ sư viết câu truy vấn sau để bắt các đơn hàng có trạng thái không hợp lệ: SELECT * FROM raw_dirty_orders WHERE status != \"PENDING\" AND status != \"COMPLETED\" AND status != \"CANCELLED\";. Truy vấn này có bắt được các đơn hàng có status là NULL không? Hãy chỉ ra lỗi và viết lại cho đúng.",
          "hint": "Theo logic 3VL, NULL != \"PENDING\" cho kết quả là UNKNOWN chứ không phải TRUE.",
          "solutionCode": "-- Sửa lại để bắt trọn cả giá trị sai chính tả lẫn giá trị NULL\nSELECT \n    raw_id, \n    order_id, \n    status,\n    'LỖI MIỀN GIÁ TRỊ: Trạng thái không hợp lệ hoặc bị NULL' AS dq_error\nFROM raw_dirty_orders\nWHERE status NOT IN ('PENDING', 'COMPLETED', 'CANCELLED')\n   OR status IS NULL;",
          "solutionOutput": "Bắt trúng đơn hàng raw_id: 4 (status là NULL).",
          "explanation": "Chẩn đoán: Câu truy vấn gốc thất bại hoàn toàn trong việc bắt dòng có status là NULL vì trong SQL, biểu thức NULL != \"X\" trả về UNKNOWN. Khi kết hợp với toán tử AND, toàn bộ biểu thức trả về UNKNOWN nên dòng NULL bị bỏ sót!"
        },
        {
          "title": "Bài tập 2.6-3 (Tự viết truy vấn): Kiểm định ràng buộc logic thời gian giao hàng",
          "level": "Khá",
          "problem": "Theo quy tắc logic vật lý, ngày giao hàng thực tế (delivered_at) không bao giờ được phép diễn ra TRƯỚC ngày đặt hàng (order_date). Hãy viết câu truy vấn kiểm định chất lượng trên bảng orders trả về các dòng vi phạm quy tắc này.",
          "hint": "Áp dụng quy ước vàng: chỉ lọc các dòng vi phạm bằng cách so sánh delivered_at < order_date.",
          "solutionCode": "SELECT \n    order_id, \n    customer_id, \n    order_date, \n    delivered_at,\n    'LỖI LOGIC THỜI GIAN: Ngày giao hàng diễn ra trước ngày đặt hàng' AS error_description\nFROM orders\nWHERE delivered_at < order_date;",
          "solutionOutput": "Empty result set (0 rows). (Dữ liệu đơn hàng TechMart đạt chuẩn 100% logic thời gian).",
          "explanation": "Quy ước vàng được bảo đảm: Truy vấn chỉ trả về các dòng vi phạm logic thời gian. Kết quả 0 dòng khẳng định dữ liệu sạch hoàn hảo."
        },
        {
          "title": "Bài tập 2.6-4 (Đánh đổi & Thiết kế): Xây dựng quy trình tự động cách ly đơn hàng lỗi",
          "level": "Nâng cao",
          "problem": "Hãy viết khối lệnh SQL bao gồm: (1) Tạo bảng quarantine_orders với các cột metadata phục vụ điều tra (raw_id, order_id, error_code, error_message, detected_at); (2) Bơm các bản ghi bị trùng lặp order_id từ raw_dirty_orders vào bảng cách ly này.",
          "hint": "Sử dụng INSERT INTO ... SELECT kết hợp với câu truy vấn phát hiện trùng lặp có CTE hoặc Subquery.",
          "solutionCode": "-- 1. Tạo bảng cách ly\nCREATE TABLE IF NOT EXISTS quarantine_orders (\n    quarantine_id INTEGER PRIMARY KEY AUTOINCREMENT,\n    raw_id INTEGER,\n    order_id INTEGER,\n    error_code VARCHAR(50),\n    error_message TEXT,\n    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- 2. Tự động bơm các bản ghi trùng lặp vào bảng cách ly\nWITH duplicate_orders AS (\n    SELECT order_id\n    FROM raw_dirty_orders\n    GROUP BY order_id\n    HAVING COUNT(*) > 1\n)\nINSERT INTO quarantine_orders (raw_id, order_id, error_code, error_message)\nSELECT \n    r.raw_id,\n    r.order_id,\n    'ERR_DUPLICATE_ORDER',\n    'Mã order_id bị trùng lặp nhiều lần trong tầng dữ liệu thô'\nFROM raw_dirty_orders r\nJOIN duplicate_orders d ON r.order_id = d.order_id;",
          "solutionOutput": "2 dòng (raw_id 1 và 2) được chèn thành công vào bảng quarantine_orders.",
          "explanation": "Bằng cách sử dụng CTE duplicate_orders ghép nối với bảng thô, toàn bộ các bản ghi vật lý xung đột đều được cô lập an toàn vào bảng cách ly để đội kỹ thuật xử lý mà không làm mất dữ liệu gốc."
        }
      ],
      "quiz": [
        {
          "question": "Theo quy ước vàng của việc kiểm tra chất lượng dữ liệu [DQ] chuyên nghiệp, kết quả mong đợi của một câu truy vấn kiểm tra hợp lệ là gì?",
          "options": [
            "Phải trả về tất cả các dòng đạt chuẩn có trong bảng dữ liệu.",
            "Phải trả về tập kết quả RỖNG (0 dòng), nghĩa là không có bất kỳ dòng nào vi phạm quy tắc kiểm định.",
            "Phải trả về ít nhất một dòng chứa chuỗi thông báo \"SUCCESS\".",
            "Phải trả về một bảng thống kê có số lượng dòng bằng đúng 100."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Truy vấn kiểm định được thiết kế để chỉ bắt các dòng vi phạm. Do đó, tập kết quả RỖNG (0 dòng) đồng nghĩa với việc toàn bộ dữ liệu đều đạt chuẩn chất lượng (Trạng thái PASS)."
        },
        {
          "question": "Khi phát hiện đơn hàng trùng lặp trên bảng dữ liệu thô, kỹ thuật nào sau đây giúp bắt chính xác các mã order_id bị nhân đôi?",
          "options": [
            "SELECT order_id FROM raw_orders WHERE order_id IS NOT NULL;",
            "SELECT DISTINCT order_id FROM raw_orders;",
            "SELECT order_id, COUNT(*) FROM raw_orders GROUP BY order_id HAVING COUNT(*) > 1;",
            "SELECT order_id FROM raw_orders ORDER BY order_id DESC LIMIT 1;"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! GROUP BY gom nhóm theo order_id và HAVING COUNT(*) > 1 chỉ giữ lại các nhóm xuất hiện từ 2 lần trở lên, tức là các bản ghi bị trùng lặp."
        },
        {
          "question": "Vì sao trên các Kho dữ liệu hiện đại (Snowflake, BigQuery, ClickHouse), việc kiểm tra bản ghi mồ côi (Orphan Records) bằng truy vấn SQL lại tối quan trọng?",
          "options": [
            "Vì các kho dữ liệu hiện đại không hỗ trợ câu lệnh SELECT có phép JOIN.",
            "Vì tính năng tự động ép buộc Khóa ngoại (Foreign Key Enforcement) thường bị vô hiệu hóa để tối đa hóa tốc độ nạp dữ liệu song song.",
            "Vì các kho dữ liệu không cho phép lưu trữ giá trị NULL trong bất kỳ cột nào.",
            "Vì mọi bản ghi mồ côi sẽ tự động xóa sạch toàn bộ cơ sở dữ liệu nếu không phát hiện kịp thời."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Để đạt hiệu năng nạp dữ liệu hàng triệu dòng mỗi giây, các hệ thống OLAP/Data Warehouse không duy trì ràng buộc khóa ngoại cứng. Kỹ sư dữ liệu phải tự viết các truy vấn Anti-join để kiểm soát tính toàn vẹn tham chiếu."
        },
        {
          "question": "Khi viết truy vấn đối soát tổng tiền giữa bảng cha (orders.total_amount) và tổng chi tiết bảng con (order_items), tại sao không nên dùng điều kiện: WHERE orders.total_amount != items_total?",
          "options": [
            "Vì SQL không hỗ trợ toán tử != trong mệnh đề WHERE.",
            "Vì kiểu số thực (FLOAT/REAL) có thể gây ra sai số làm tròn siêu nhỏ (ví dụ 0.00000001), khiến đơn hàng hợp lệ vẫn bị coi là lệch tiền.",
            "Vì bắt buộc phải sử dụng toán tử LIKE thay vì toán tử so sánh số học.",
            "Vì bảng con không bao giờ có thể tính tổng được bằng hàm SUM()."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Do chuẩn số thực IEEE 754, sai số làm tròn của số thực dấu phẩy động có thể khiến phép so sánh != 0 báo sai lệch giả. Cần dùng khoảng cách dung sai ABS(a - b) > 0.01 hoặc ép kiểu sang DECIMAL/NUMERIC."
        },
        {
          "question": "Mô hình Bảng cách ly (Quarantine Pattern / Dead Letter Queue) trong Data Pipeline mang lại lợi ích cốt lõi nào?",
          "options": [
            "Tự động tăng tốc độ truy vấn SELECT của người dùng lên gấp 10 lần.",
            "Bảo vệ kho dữ liệu sạch khỏi các bản ghi lỗi mà vẫn bảo toàn đầy đủ dữ liệu vi phạm để đối soát và duy trì dấu vết kiểm toán (Audit Trail).",
            "Giúp hệ thống không cần sao lưu (Backup) cơ sở dữ liệu định kỳ nữa.",
            "Cho phép lưu trữ dữ liệu hoàn toàn miễn phí trên dịch vụ đám mây."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Thay vì xóa bỏ gây mất dấu vết kiểm toán (Audit Trail) hoặc bỏ mặc làm ô nhiễm báo cáo BI, mô hình Quarantine Table cô lập các dòng lỗi sang một bảng riêng để điều tra và xử lý có kiểm soát."
        }
      ],
      "summary": [
        "Quy ước vàng [DQ]: Truy vấn kiểm tra trả về các dòng VI PHẠM; kết quả RỖNG đồng nghĩa dữ liệu ĐẠT chuẩn.",
        "Phát hiện trùng lặp khóa nghiệp vụ bằng GROUP BY và HAVING COUNT(*) > 1 kết hợp GROUP_CONCAT/STRING_AGG để gom vết raw_id.",
        "Truy quét bản ghi mồ côi bằng kỹ thuật Anti-join (LEFT JOIN ... WHERE right.pk IS NULL hoặc NOT EXISTS) khi kho dữ liệu tắt khóa ngoại.",
        "Đối soát số tiền tài chính giữa bảng cha và bảng con cần dùng hàm ABS(diff) > 0.01 để triệt tiêu sai số dấu phẩy động.",
        "Mô hình Bảng cách ly (Quarantine Table) cô lập dòng lỗi có kiểm soát, bảo toàn dấu vết kiểm toán (Audit Trail) cho toàn bộ hệ thống.",
        "Ôn cách quãng: Tại sao phép ghép LEFT JOIN có thể vô tình làm bốc hơi dữ liệu nếu ta đặt nhầm điều kiện lọc của bảng phải vào mệnh đề WHERE? (Xem lại Bài 2.2)."
      ]
    }
  ]
};
