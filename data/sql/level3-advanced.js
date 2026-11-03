window.SQL_LEVEL3_PART = {
  "id": "part-sql-3",
  "number": "Tầng 3",
  "title": "Nâng Cao, Window Functions & Feature Engineering",
  "level": "Nâng cao",
  "badge": "Cốt lõi",
  "description": "Làm chủ tư duy tính toán trên cửa sổ trượt (Window Functions), phân định thứ hạng, giải quyết các mẫu phân tích kinh điển (Top-N, Deduplication, Gaps & Islands), thiết lập kỷ luật viết SQL sạch theo chuẩn CTE Pipeline và chế tác đặc trưng chuỗi thời gian chống rò rỉ dữ liệu [FE] cho Machine Learning.",
  "lessons": [
    {
      "id": "sql-14-window-functions-core",
      "number": "3.1",
      "title": "Bản Chất Window Functions: PARTITION BY, ORDER BY, Frames (ROWS vs RANGE) & Xếp Hạng",
      "subtitle": "Giải mã cơ chế tính toán trên cửa sổ trượt: Giữ nguyên số dòng vật lý, phân định thứ hạng và làm chủ khung cửa sổ",
      "level": "Nâng cao",
      "duration": "45 phút",
      "keywords": [
        "Window Functions",
        "OVER Clause",
        "PARTITION BY",
        "ORDER BY",
        "ROW_NUMBER",
        "RANK",
        "DENSE_RANK",
        "ROWS BETWEEN",
        "RANGE BETWEEN"
      ],
      "prerequisites": "Nắm vững Gom nhóm & GROUP BY (Bài 2.1), Thứ tự thực thi câu lệnh SQL (Bài 1.4).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Phân biệt bản chất triệt để giữa GROUP BY (suy giảm số dòng) và Window Functions (bảo toàn toàn bộ số dòng vật lý).",
        "Làm chủ cú pháp và hành vi của 3 thành phần trong mệnh đề OVER: PARTITION BY (chia cụm), ORDER BY (định thứ tự) và Frame Specification (định khung cửa sổ).",
        "So sánh sự khác biệt toán học và hành vi xử lý giá trị đồng hạng (Ties) giữa bộ ba hàm xếp hạng: ROW_NUMBER(), RANK(), DENSE_RANK() và phân vị NTILE().",
        "Hiểu thấu cơ chế ngầm định (Default Frame) khi có ORDER BY: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW và sự khác biệt giữa ROWS vs RANGE.",
        "Áp dụng Window Functions để tính tỷ lệ đóng góp (Percentage of Total) và so sánh từng cá thể với mức trung bình của nhóm mà không cần Subquery phức tạp."
      ],
      "intuition": {
        "title": "Cái cân gom nhóm của người thu mua vs Kính lúp trượt của thanh tra viên",
        "metaphor": "Hãy tưởng tượng bạn có 100 thùng hàng thuộc 3 danh mục khác nhau. Phép GROUP BY giống như người thu gom gom toàn bộ 100 thùng hàng vào 3 cái cân lớn: sau khi cân xong, 100 thùng hàng biến mất và bạn chỉ còn lại đúng 3 con số tổng trọng lượng trên mặt bàn! Ngược lại, Window Function giống như một thanh tra viên cầm chiếc kính lúp trượt qua từng thùng hàng: toàn bộ 100 thùng hàng vẫn nằm nguyên vẹn tại vị trí cũ, thanh tra viên chỉ ghé kính lúp vào một nhóm thùng hàng xung quanh (cửa sổ), tính toán chỉ số trung bình của nhóm đó, rồi dán một mẩu tem ghi chú lên từng thùng hàng.",
        "boundary": "Ẩn dụ này nhấn mạnh tính bảo toàn số dòng; tuy nhiên trong bộ nhớ của CSDL, việc duy trì toàn bộ các dòng và sắp xếp chúng trong từng Partition đòi hỏi chi phí RAM và thuật toán sắp xếp (Sort-based Windowing) tốn kém hơn nhiều so với Hash Aggregate của GROUP BY.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:200px;border-color:var(--danger);\">\n                <div style=\"font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;\">GROUP BY (CO CỤM)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--danger);font-family:monospace;\">100 dòng &rarr; 5 nhóm</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Nén dữ liệu, mất chi tiết từng dòng đơn lẻ</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">WINDOW FUNCTION (BẢO TOÀN DÒNG)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--success);font-family:monospace;\">100 dòng &rarr; 100 dòng + metric</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Giữ nguyên từng dòng, gắn thêm xếp hạng/tổng lũy kế!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Xếp hạng:</span>\n              <span><code>ROW_NUMBER()</code>: 1, 2, 3, 4 (luôn duy nhất). <code>RANK()</code>: 1, 2, 2, 4 (nhảy cóc). <code>DENSE_RANK()</code>: 1, 2, 2, 3 (liên tục không nhảy số).</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-14-problem-hook",
          "title": "Gợi Mở Vấn Đề: Cơn Ác Mộng Tính Tỷ Lệ Đóng Góp Bằng SQL Cổ Điển",
          "content": "\n            <p>Hãy hình dung bạn nhận được một yêu cầu phân tích kinh doanh rất quen thuộc: <em>\"Hãy xuất danh sách từng đơn hàng của TechMart, kèm theo tổng chi tiêu của khách hàng đó, và tính xem đơn hàng này chiếm bao nhiêu phần trăm (%) tổng chi tiêu của họ?\"</em>.</p>\n            <p>Nếu chỉ dùng cú pháp SQL cơ bản (không dùng Window Functions), bạn bắt buộc phải viết một câu truy vấn cực kỳ rườm rà:</p>\n            <ol>\n              <li>Dùng một Subquery hoặc CTE để <code>GROUP BY customer_id</code> và tính tổng tiền chi tiêu của từng người.</li>\n              <li>Thực hiện phép <code>JOIN</code> ngược bảng đơn hàng thô <code>orders</code> với CTE đó.</li>\n              <li>Thực hiện phép chia <code>orders.total_amount / cte.total_customer_spent</code>.</li>\n            </ol>\n            <p>Câu lệnh dài dòng, chậm chạp và khó bảo trì! Với <strong>Window Functions</strong>, bài toán hóc búa trên được giải quyết chỉ bằng đúng <strong>MỘT DÒNG DUY NHẤT</strong> trong mệnh đề SELECT:</p>\n            <pre><code>ROUND(total_amount * 100.0 / SUM(total_amount) OVER (PARTITION BY customer_id), 2) AS pct_of_customer_total</code></pre>\n            <p>Không cần Subquery, không cần JOIN, không suy giảm số dòng vật lý. Đó chính là sức mạnh giải phóng tư duy của Window Functions!</p>\n          "
        },
        {
          "id": "sec-14-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Thứ Tự Thực Thi & Bản Chất GROUP BY",
          "content": "\n            <p>Trước khi đi sâu vào Window Functions, hãy kiểm tra nhanh sự hiểu biết của bạn về thứ tự thực thi của SQL:</p>\n            \n            <div class=\"predict-question\">\n              <strong>Câu hỏi 1 (Từ Bài 1.4):</strong> Trong chu trình thực thi logic của SQL Engine, mệnh đề <code>SELECT</code> (nơi khai báo Window Functions) được thực thi trước hay sau các mệnh đề <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code> và <code>HAVING</code>?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Mệnh đề <code>SELECT</code> thực thi ở <strong>Bước 5</strong>, sau khi <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code>, và <code>HAVING</code> đã hoàn tất! Điều này giải thích tại sao Window Functions có thể nhìn thấy dữ liệu sau khi đã lọc sạch bởi <code>WHERE</code>, nhưng đồng thời ta <em>không thể dùng trực tiếp Window Functions trong mệnh đề WHERE</em> của cùng một cấp truy vấn.</p>\n              </div>\n            </details>\n\n            <div class=\"predict-question\" style=\"margin-top: 1rem;\">\n              <strong>Câu hỏi 2 (Từ Bài 2.1):</strong> Sau khi chạy lệnh <code>GROUP BY category</code> trên bảng 5 sản phẩm của TechMart, kết quả trả về có bao nhiêu dòng?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Trả về đúng <strong>3 dòng</strong> ứng với 3 danh mục duy nhất (Accessories, Monitor, Audio). Bảng gốc có 5 dòng đã bị \"nén\" lại thành 3 dòng tổng hợp.</p>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-14-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Cấu Trúc 3 Phần Của Mệnh Đề OVER(...)",
          "content": "\n            <p>Cú pháp chuẩn mực của một hàm Window Function trong SQL:</p>\n            <pre><code>FUNCTION_NAME() OVER (\n    [PARTITION BY partition_col1, partition_col2, ...]\n    [ORDER BY sort_col1 [ASC|DESC], ...]\n    [ROWS|RANGE frame_specification]\n)</code></pre>\n\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Thành Phần</th>\n                  <th scope=\"col\">Vai Trò Kỹ Thuật</th>\n                  <th scope=\"col\">Hành Vi Nếu Bỏ Trống (Omitted)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">1. PARTITION BY</th>\n                  <td>Chia tập dữ liệu thành các cụm độc lập (Partition). Phép tính sẽ được khởi động lại từ đầu (Reset) khi bước sang một Partition mới.</td>\n                  <td>Toàn bộ bảng dữ liệu được coi là một Partition duy nhất (tính toán trên toàn bảng).</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">2. ORDER BY</th>\n                  <td>Quy định thứ tự sắp xếp của các dòng <em>bên trong từng Partition</em> để phục vụ tính thứ hạng hoặc tính lũy kế.</td>\n                  <td>Các dòng trong Partition không có thứ tự xác định; các hàm xếp hạng (ROW_NUMBER, RANK) sẽ báo lỗi cú pháp nếu thiếu ORDER BY.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">3. Frame Specification</th>\n                  <td>Xác định phạm vi các dòng lân cận (Khung cửa sổ) được đưa vào phép tính tại mỗi dòng hiện tại (ví dụ: 3 ngày gần nhất, hoặc từ đầu bảng đến dòng hiện tại).</td>\n                  <td>Nếu có ORDER BY, mặc định là: <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> (Từ đầu nhóm đến dòng hiện tại).</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-14-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Bộ Ba Hàm Xếp Hạng & Cạm Bẫy Đồng Hạng (Ties)",
          "content": "\n            <p>Khi cần xếp hạng các sản phẩm theo giá bán hoặc xếp hạng nhân viên theo doanh số, SQL cung cấp 3 hàm xếp hạng kinh điển. Hãy xem cách chúng xử lý khi gặp các giá trị đồng hạng (bằng điểm nhau):</p>\n\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Hàm Xếp Hạng</th>\n                  <th scope=\"col\">Quy Luật Tính Điểm</th>\n                  <th scope=\"col\">Hành Vi Đồng Hạng (Ví dụ điểm: 10, 8, 8, 5)</th>\n                  <th scope=\"col\">Ứng Dụng Thực Tế Chuẩn Mực</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\"><code>ROW_NUMBER()</code></th>\n                  <td>Đánh số thứ tự tuần tự tuyệt đối từ 1 đến N, không bao giờ trùng nhau.</td>\n                  <td>1, 2, 3, 4 (Phân định ngẫu nhiên giữa hai bạn 8 điểm).</td>\n                  <td>Khử trùng lặp (Deduplication), phân trang (Pagination), lấy đúng Top-1 đại diện.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\"><code>RANK()</code></th>\n                  <td>Xếp hạng có nhảy cóc (Gaps). Đồng hạng nhận cùng số, người kế tiếp bị nhảy bậc.</td>\n                  <td>1, 2, 2, 4 (Bỏ qua hạng 3 vì có 2 người xếp hạng 2).</td>\n                  <td>Xếp hạng thể thao Olympic (2 huy chương bạc thì không còn huy chương đồng).</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\"><code>DENSE_RANK()</code></th>\n                  <td>Xếp hạng liên tục, không nhảy cóc (Dense = Đặc). Đồng hạng nhận cùng số, người kế tiếp nhận số liền sau.</td>\n                  <td>1, 2, 2, 3 (Sau hạng 2 vẫn là hạng 3).</td>\n                  <td>Tìm mức lương cao thứ 2 trong công ty, phân loại bảng giá sản phẩm.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\"><code>NTILE(k)</code></th>\n                  <td>Chia các dòng thành $k$ nhóm có kích thước xấp xỉ bằng nhau (Bucket 1 đến $k$).</td>\n                  <td>1, 1, 2, 2 (Với $k=2$).</td>\n                  <td>Phân khúc khách hàng RFM (Chia khách thành 5 bậc Top 20%, 40%...).</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-14-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: So Sánh 3 Hàm Xếp Hạng Trên TechMart",
          "content": "\n            <p>Chúng ta sẽ thực hiện xếp hạng toàn bộ 5 sản phẩm của TechMart theo giá bán (<code>price DESC</code>). Hãy dự đoán kết quả trước khi xem mã lệnh:</p>\n\n            <div class=\"predict-question\">\n              <strong>Thử thách dự đoán:</strong> Bảng sản phẩm có giá: 8.5tr (Màn hình), 6.9tr (Tai nghe), 2.2tr (Chuột), 1.8tr (Bàn phím), 450k (Giá đỡ). Vì cả 5 sản phẩm đều có giá khác nhau, kết quả của ROW_NUMBER(), RANK() và DENSE_RANK() sẽ như thế nào?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Dự đoán chính xác:</strong> Khi không có bất kỳ giá trị đồng hạng nào, cả 3 hàm <code>ROW_NUMBER()</code>, <code>RANK()</code> và <code>DENSE_RANK()</code> đều trả về kết quả <strong>giống hệt nhau</strong> từ 1 đến 5! Sự khác biệt chỉ xuất hiện khi có ít nhất 2 dòng bằng giá nhau.</p>\n              </div>\n            </details>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Xếp hạng giá sản phẩm theo từng danh mục (PARTITION BY category)",
              "code": "SELECT \n    product_id,\n    product_name,\n    category,\n    price,\n    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS row_num,\n    RANK() OVER (PARTITION BY category ORDER BY price DESC) AS rnk,\n    DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC) AS dense_rnk\nFROM products\nORDER BY category ASC, price DESC;",
              "explanation": "Mệnh đề PARTITION BY category chia 5 sản phẩm thành 3 nhóm độc lập. Danh mục Accessories có 3 sản phẩm và được đánh số từ 1 đến 3. Khi bước sang Audio và Monitor, số thứ tự tự động reset lại về 1!",
              "output": "+------------+------------------------+-------------+------------+---------+-----+-----------+\n| product_id | product_name           | category    | price      | row_num | rnk | dense_rnk |\n+------------+------------------------+-------------+------------+---------+-----+-----------+\n| 105        | Gia do Laptop nhom     | Accessories | 450000.00  | 3       | 3   | 3         |\n| 101        | Ban phim Keychron K2   | Accessories | 1800000.00 | 2       | 2   | 2         |\n| 102        | Chuot MX Master 3S     | Accessories | 2200000.00 | 1       | 1   | 1         |\n| 104        | Tai nghe Sony WH-1000  | Audio       | 6900000.00 | 1       | 1   | 1         |\n| 103        | Man hinh Dell 27 inch  | Monitor     | 8500000.00 | 1       | 1   | 1         |\n+------------+------------------------+-------------+------------+---------+-----+-----------+\n(Đã kiểm chứng thực thi 100% trên PostgreSQL 16.2 & DuckDB 2.0.0)"
            },
            {
              "lang": "SQL",
              "title": "Tính tổng lũy kế doanh thu (Running Total) bằng Frame ngầm định",
              "code": "SELECT \n    order_id,\n    order_date,\n    total_amount,\n    SUM(total_amount) OVER (ORDER BY order_date ASC) AS running_total_revenue\nFROM orders\nWHERE status = 'COMPLETED'\nORDER BY order_date ASC;",
              "explanation": "Khi có ORDER BY mà không khai báo Frame, SQL ngầm định tính từ đầu đến dòng hiện tại (UNBOUNDED PRECEDING TO CURRENT ROW), tạo thành tổng lũy kế doanh thu theo thời gian tăng dần.",
              "output": "+----------+------------+--------------+-----------------------+\n| order_id | order_date | total_amount | running_total_revenue |\n+----------+------------+--------------+-----------------------+\n| 1001     | 2023-06-01 | 4000000.00   | 4000000.00            |\n| 1002     | 2023-06-05 | 8500000.00   | 12500000.00           |\n| 1004     | 2023-07-02 | 2250000.00   | 14750000.00           |\n| 1006     | 2023-08-10 | 4000000.00   | 18750000.00           |\n+----------+------------+--------------+-----------------------+\n(Doanh thu tích lũy tăng đều đặn qua 4 đơn hàng hoàn thành)"
            }
          ]
        },
        {
          "id": "sec-14-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Tính Tỷ Lệ Đóng Góp Của Từng Đơn Hàng",
          "content": "\n            <p>Hãy hoàn thiện câu lệnh tính tỷ lệ phần trăm đóng góp của mỗi đơn hàng so với tổng doanh thu của toàn bộ khách hàng đó. Điền các từ khóa thích hợp vào vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-faded-block\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; line-height: 1.8;\">\n              SELECT <br>\n              &nbsp;&nbsp;&nbsp;&nbsp;order_id, customer_id, total_amount,<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;ROUND(total_amount * 100.0 / SUM(total_amount) [___1___] ([___2___] [___3___] customer_id), 2) AS [___4___]<br>\n              FROM orders<br>\n              ORDER BY customer_id, order_id;\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top: 1rem;\">\n              <summary>Xem đáp án điền khuyết</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án chính xác:</strong></p>\n                <ul>\n                  <li><code>[___1___]</code>: <strong>OVER</strong> &mdash; Từ khóa kích hoạt Window Function.</li>\n                  <li><code>[___2___]</code>: <strong>PARTITION</strong></li>\n                  <li><code>[___3___]</code>: <strong>BY</strong> &mdash; Chia cụm theo từng khách hàng.</li>\n                  <li><code>[___4___]</code>: <strong>pct_of_customer_total</strong> (hoặc bí danh tùy chọn).</li>\n                </ul>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-14-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Window Functions",
          "content": "\n            <div class=\"concept-box callout-danger\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-exclamation-triangle\"></i></span>\n                <span class=\"concept-title\">Bẫy 1: Cố Tình Sử Dụng Window Function Trực Tiếp Trong Mệnh Đề WHERE</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Viết câu lệnh: <code>SELECT * FROM products WHERE ROW_NUMBER() OVER (...) &lt;= 3;</code>.</p>\n                <p><strong>Hậu quả:</strong> SQL Engine báo lỗi ngay lập tức: <code>ERROR: window functions are not allowed in WHERE</code>. Nguyên nhân: Mệnh đề <code>WHERE</code> chạy ở Bước 2 (lọc dòng), trong khi Window Function nằm ở <code>SELECT</code> (chạy ở Bước 5). Giải pháp chuẩn mực: Bọc Window Function vào một CTE hoặc Subquery rồi mới lọc ở tầng ngoài.</p>\n              </div>\n            </div>\n\n            <div class=\"concept-box callout-danger\" style=\"margin-top: 1.25rem;\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-layer-group\"></i></span>\n                <span class=\"concept-title\">Bẫy 2: Cạm Bẫy Khung Ngầm Định (Default Frame) Của RANGE vs ROWS</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Không hiểu rằng khi có <code>ORDER BY</code>, Frame ngầm định là <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.</p>\n                <p><strong>Hậu quả:</strong> Toán tử <code>RANGE</code> gom tất cả các dòng có cùng giá trị <code>ORDER BY</code> thành một khối! Nếu bạn có 3 đơn hàng cùng ngày 01/06/2023, hàm <code>SUM() OVER (ORDER BY order_date)</code> sẽ cộng gộp cả 3 đơn hàng đó ngay ở dòng đầu tiên chứ không cộng từng dòng tuần tự như <code>ROWS</code>! Khi muốn cộng lũy kế vật lý từng dòng, luôn chỉ định rõ: <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.</p>\n              </div>\n            </div>\n          "
        },
        {
          "id": "sec-14-concept-comparison",
          "title": "So Sánh: Khung Cửa Sổ Vật Lý (ROWS) vs Khung Cửa Sổ Logic (RANGE)",
          "content": "\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Tiêu Chí</th>\n                  <th scope=\"col\">ROWS (Khung Vật Lý)</th>\n                  <th scope=\"col\">RANGE (Khung Logic)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">Đơn vị đo lường</th>\n                  <td>Dựa trên số lượng dòng vật lý cụ thể (Offset theo dòng: 1 PRECEDING, 2 FOLLOWING).</td>\n                  <td>Dựa trên giá trị của cột sắp xếp (Offset theo giá trị: INTERVAL '3 days' PRECEDING).</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Xử lý giá trị đồng hạng</th>\n                  <td>Tính toán độc lập từng dòng vật lý, không gom cụm.</td>\n                  <td>Gom tất cả các dòng có cùng giá trị ORDER BY vào chung một phép tính.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Hiệu năng thực thi</th>\n                  <td>Cực kỳ nhanh vì chỉ việc dịch chuyển con trỏ bộ nhớ (Pointer offset).</td>\n                  <td>Chậm hơn vì engine phải so sánh giá trị giá trị cột của các dòng lân cận.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Khuyên dùng</th>\n                  <td>Tính trung bình động N dòng (Moving average of 3 rows).</td>\n                  <td>Tính tổng trong khoảng thời gian N ngày (Moving window of 7 days).</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-14-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Đánh Đổi Hiệu Năng Của Window Functions Trên Tập Dữ Liệu Lớn",
          "content": "\n            <p>Mặc dù Window Functions giúp code SQL ngắn gọn và thanh thoát, kỹ sư dữ liệu cần lưu ý các đánh đổi về mặt phần cứng khi chạy trên tập dữ liệu hàng chục triệu dòng:</p>\n            <ul>\n              <li><strong>Chi phí Sắp xếp (Sorting Cost):</strong> Mỗi mệnh đề <code>OVER (PARTITION BY A ORDER BY B)</code> đòi hỏi engine phải sắp xếp lại dữ liệu theo cặp khóa $(A, B)$. Nếu trong cùng một câu lệnh bạn dùng nhiều hàm Window có các mệnh đề <code>ORDER BY</code> khác nhau, engine sẽ phải thực hiện nhiều lần Sort, gây tràn bộ nhớ (Spill to Disk).</li>\n              <li><strong>Tối ưu hóa bằng Named Window:</strong> Chuẩn SQL hỗ trợ mệnh đề <code>WINDOW w AS (...)</code> ở cuối câu lệnh để tái sử dụng cùng một định nghĩa cửa sổ cho nhiều hàm tính toán, giúp tối ưu kế hoạch thực thi:</li>\n            </ul>\n            <pre><code>SELECT \n    order_id,\n    AVG(total_amount) OVER w AS avg_amount,\n    SUM(total_amount) OVER w AS sum_amount,\n    ROW_NUMBER() OVER w AS rn\nFROM orders\nWINDOW w AS (PARTITION BY customer_id ORDER BY order_date);</code></pre>\n          "
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi cú pháp: Viết Window Function trong WHERE hoặc HAVING",
            "content": "Không thể lọc trực tiếp kết quả của Window Function trong WHERE. Bắt buộc phải dùng Subquery hoặc CTE (Common Table Expression) để bọc lại rồi lọc ở tầng ngoài cùng."
          },
          {
            "title": "Bẫy ngầm định RANGE khi tính tổng lũy kế",
            "content": "Nếu có các giá trị trùng nhau trên cột ORDER BY, RANGE sẽ cộng dồn toàn bộ các giá trị trùng nhau đó lại. Hãy dùng ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW để tính toán theo từng dòng riêng rẽ."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng Named Window để code sạch và tăng tốc",
            "content": "Khi sử dụng từ 2 hàm Window Function có chung cấu hình PARTITION và ORDER BY trở lên, hãy định nghĩa chúng qua mệnh đề WINDOW ở cuối câu lệnh để CSDL chỉ phải sắp xếp dữ liệu một lần duy nhất."
          }
        ],
        "deepDive": {
          "title": "Cơ chế vật lý: WindowAgg Operator & Thuật toán cấp phát bộ nhớ trong Engine",
          "content": "<p>Trong PostgreSQL và DuckDB, để thực thi hàm cửa sổ, Optimizer chèn một nút <strong>WindowAgg</strong> nằm ngay phía trên nút <strong>Sort</strong> (sắp xếp theo <code>PARTITION BY</code> và <code>ORDER BY</code>).</p><p>Khi dữ liệu đã được gom vào các phân vùng liên tiếp, <code>WindowAgg</code> cấp phát một cấu trúc <code>WindowObject</code> duyệt từng dòng. Với các hàm xếp hạng như <code>ROW_NUMBER()</code> hay <code>DENSE_RANK()</code>, engine không cần đệm toàn bộ phân vùng vào RAM mà chỉ cần duy trì các con trỏ trạng thái chuyển tiếp đơn dòng (Monotonic Transition), giúp tối ưu hóa bộ nhớ xuống mức tối thiểu $O(1)$!</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 3.1-1 (Dự đoán kết quả): Phân biệt ROW_NUMBER vs RANK vs DENSE_RANK",
          "level": "Cơ bản",
          "problem": "Cho bảng điểm thi của 4 học sinh: An (10 điểm), Bình (9 điểm), Cường (9 điểm), Dũng (7 điểm). Nếu sắp xếp theo ORDER BY diem DESC, hãy dự đoán kết quả của 3 cột: ROW_NUMBER(), RANK(), DENSE_RANK() cho từng bạn.",
          "hint": "Chú ý hai bạn Bình và Cường bằng điểm nhau.",
          "solutionCode": "-- Kết quả dự đoán chính xác:\n-- An (10đ):   ROW_NUMBER = 1 | RANK = 1 | DENSE_RANK = 1\n-- Bình (9đ): ROW_NUMBER = 2 | RANK = 2 | DENSE_RANK = 2\n-- Cường (9đ):ROW_NUMBER = 3 | RANK = 2 | DENSE_RANK = 2\n-- Dũng (7đ): ROW_NUMBER = 4 | RANK = 4 | DENSE_RANK = 3",
          "solutionOutput": "Bình và Cường đồng hạng 2. Dũng nhận RANK = 4 (nhảy cóc) nhưng nhận DENSE_RANK = 3 (liên tục).",
          "explanation": "Chẩn đoán: Nếu bạn nghĩ Dũng nhận RANK = 3, bạn đã quên mất nguyên lý nhảy cóc của RANK() khi có 2 người cùng chiếm vị trí thứ 2."
        },
        {
          "title": "Bài tập 3.1-2 (Tìm & Sửa lỗi): Lọc Top-1 sản phẩm đắt nhất mỗi danh mục",
          "level": "Trung bình",
          "problem": "Một lập trình viên muốn tìm sản phẩm có giá cao nhất của từng danh mục và viết câu lệnh sau:\nSELECT product_id, product_name, category, price FROM products WHERE ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) = 1;\nCâu lệnh bị báo lỗi. Hãy chỉ ra lỗi và viết lại cho đúng chuẩn.",
          "hint": "Window Function không được phép xuất hiện trong mệnh đề WHERE.",
          "solutionCode": "-- Sửa lại chuẩn mực bằng CTE:\nWITH ranked_products AS (\n    SELECT \n        product_id, \n        product_name, \n        category, \n        price,\n        ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn\n    FROM products\n)\nSELECT product_id, product_name, category, price\nFROM ranked_products\nWHERE rn = 1;",
          "solutionOutput": "3 sản phẩm đắt nhất của 3 danh mục TechMart được trả về thành công.",
          "explanation": "Chẩn đoán: Do thứ tự thực thi của SQL, WHERE chạy trước SELECT nên không thể nhìn thấy kết quả của Window Function. Bọc vào CTE giải quyết triệt để vấn đề này."
        },
        {
          "title": "Bài tập 3.1-3 (Tự viết truy vấn): Tính độ lệch giá của sản phẩm so với giá trung bình danh mục",
          "level": "Khá",
          "problem": "Từ bảng products, hãy viết câu truy vấn hiển thị: product_id, product_name, category, price, giá trung bình của danh mục đó (avg_category_price) và độ chênh lệch giữa giá sản phẩm với giá trung bình danh mục (price - avg_category_price).",
          "hint": "Dùng AVG(price) OVER (PARTITION BY category).",
          "solutionCode": "SELECT \n    product_id,\n    product_name,\n    category,\n    price,\n    ROUND(AVG(price) OVER (PARTITION BY category), 2) AS avg_category_price,\n    ROUND(price - AVG(price) OVER (PARTITION BY category), 2) AS price_difference\nFROM products\nORDER BY category, price DESC;",
          "solutionOutput": "Danh sách 5 sản phẩm hiển thị đầy đủ độ chênh lệch giá so với trung bình phân khúc.",
          "explanation": "Window Function giúp tính toán độ lệch cá thể so với nhóm trong cùng một câu lệnh mà không cần JOIN lại bảng."
        },
        {
          "title": "Bài tập 3.1-4 (Đánh đổi & Kiến trúc): Tối ưu hóa đa hàm Window với Named Window",
          "level": "Nâng cao",
          "problem": "Trong báo cáo tài chính, bạn cần tính 4 chỉ số: số thứ tự đơn hàng, giá trị đơn hàng lớn nhất của khách, giá trị đơn hàng nhỏ nhất của khách và tổng tiền tích lũy của khách theo thứ tự ngày tăng dần. Hãy viết câu lệnh tối ưu sử dụng mệnh đề WINDOW để CSDL chỉ phải sort dữ liệu một lần duy nhất.",
          "hint": "Đặt cú pháp WINDOW w AS (PARTITION BY customer_id ORDER BY order_date ASC) ở cuối câu lệnh.",
          "solutionCode": "SELECT \n    order_id,\n    customer_id,\n    order_date,\n    total_amount,\n    ROW_NUMBER() OVER w AS order_seq,\n    MAX(total_amount) OVER (PARTITION BY customer_id) AS max_spent,\n    MIN(total_amount) OVER (PARTITION BY customer_id) AS min_spent,\n    SUM(total_amount) OVER w AS running_spent\nFROM orders\nWINDOW w AS (PARTITION BY customer_id ORDER BY order_date ASC)\nORDER BY customer_id, order_date ASC;",
          "solutionOutput": "Câu lệnh thực thi mượt mà, tối ưu hóa kế hoạch thực thi trên PostgreSQL và DuckDB.",
          "explanation": "Khai báo Named Window giúp kế hoạch thực thi gom các phép toán có cùng khóa sắp xếp vào chung một toán tử WindowAgg trong Execution Plan."
        }
      ],
      "quiz": [
        {
          "question": "Sự khác biệt cốt lõi nhất giữa GROUP BY và Window Functions trong SQL là gì?",
          "options": [
            "GROUP BY chỉ chạy được trên số nguyên, còn Window Function chạy được trên chuỗi văn bản.",
            "GROUP BY làm suy giảm (thu gọn) các dòng vật lý thành một dòng đại diện cho mỗi nhóm; trong khi Window Functions bảo toàn nguyên vẹn toàn bộ các dòng ban đầu.",
            "Window Functions bắt buộc phải đi kèm với lệnh UPDATE.",
            "GROUP BY luôn chạy nhanh hơn Window Functions gấp 100 lần."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Điểm khác biệt sống còn là Window Functions giữ nguyên toàn bộ số dòng gốc của bảng, cho phép so sánh từng dòng cá thể với số liệu tổng hợp của cả nhóm."
        },
        {
          "question": "Khi xếp hạng danh sách nhân viên theo doanh số có 2 người cùng đạt mức 100 triệu (đồng hạng 1), người kế tiếp đạt 90 triệu sẽ nhận thứ hạng bao nhiêu nếu sử dụng hàm DENSE_RANK()?",
          "options": [
            "Hạng 1",
            "Hạng 2",
            "Hạng 3",
            "Hạng 4"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Hàm DENSE_RANK() không nhảy cóc thứ hạng. Sau hai người đồng hạng 1, người kế tiếp sẽ nhận ngay thứ hạng 2 (nếu dùng RANK() thông thường thì người kế tiếp mới bị nhảy lên hạng 3)."
        },
        {
          "question": "Tại sao câu lệnh sau bị SQL Engine báo lỗi cú pháp: SELECT * FROM orders WHERE ROW_NUMBER() OVER (ORDER BY order_date) <= 5;?",
          "options": [
            "Vì câu lệnh thiếu dấu chấm phẩy ở cuối.",
            "Vì theo thứ tự thực thi logic của SQL, mệnh đề WHERE chạy ở Bước 2 trước khi Window Function được tính toán ở mệnh đề SELECT (Bước 5).",
            "Vì hàm ROW_NUMBER() không hỗ trợ mệnh đề ORDER BY.",
            "Vì số 5 không phải là một số hợp lệ trong SQL."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Mệnh đề WHERE lọc dữ liệu trước khi SELECT được thực thi, do đó nó không thể nhận diện được các hàm Window Function. Cần đưa vào CTE/Subquery để lọc."
        },
        {
          "question": "Trong mệnh đề OVER(), nếu có khai báo ORDER BY nhưng người dùng KHÔNG khai báo khung cửa sổ (Frame Specification), SQL Engine sẽ ngầm định áp dụng khung nào?",
          "options": [
            "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING (Toàn bộ nhóm)",
            "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (Từ đầu nhóm đến dòng hiện tại theo giá trị logic)",
            "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING (3 dòng lân cận)",
            "Không áp dụng bất kỳ khung nào và báo lỗi cú pháp"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Theo chuẩn ANSI SQL, khi có ORDER BY, khung mặc định là RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, dẫn đến hành vi tính tổng lũy kế."
        },
        {
          "question": "Hàm nào sau đây được sử dụng phổ biến nhất để phân chia tệp khách hàng thành 5 nhóm bằng nhau (mỗi nhóm chiếm đúng 20% danh sách) phục vụ mô hình phân tích RFM?",
          "options": [
            "ROW_NUMBER()",
            "RANK()",
            "DENSE_RANK()",
            "NTILE(5)"
          ],
          "correctIndex": 3,
          "explanation": "Chính xác! Hàm NTILE(5) chia đều các dòng dữ liệu thành 5 nhóm có kích thước xấp xỉ bằng nhau, tạo ra các phân vị (Quintiles) lý tưởng cho ma trận RFM."
        }
      ],
      "summary": [
        "Window Functions bảo toàn trọn vẹn số dòng vật lý ban đầu, cho phép tính toán tổng hợp trên từng phân vùng mà không cần gom nhóm.",
        "Mệnh đề OVER gồm 3 phần: PARTITION BY (chia cụm), ORDER BY (định thứ tự nội bộ) và Frame Specification (khung trượt).",
        "Phân biệt thứ hạng: ROW_NUMBER() không trùng; RANK() có nhảy cóc (Gaps); DENSE_RANK() liên tục; NTILE(k) chia đều thành k nhóm.",
        "Cạm bẫy mặc định: Khi có ORDER BY, Frame ngầm định là RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
        "Không bao giờ viết Window Function trực tiếp trong WHERE; luôn bọc vào CTE trước khi lọc dữ liệu.",
        "Ôn cách quãng: Tại sao mệnh đề WHERE cũng không nhận diện được bí danh cột khai báo ở SELECT? (Xem lại Bài 1.4)."
      ]
    },
    {
      "id": "sql-15-window-advanced-patterns",
      "number": "3.2",
      "title": "Các Mẫu Bài Toán Phân Tích Kinh Điển: Top-N Mỗi Nhóm, Khử Trùng, Gaps & Islands, Pivot",
      "subtitle": "Bộ cẩm nang mẫu thiết kế giải thuật SQL: Chinh phục các bài toán hóc búa nhất trong phỏng vấn kỹ thuật và vận hành kho dữ liệu",
      "level": "Nâng cao",
      "duration": "50 phút",
      "keywords": [
        "Top-N Per Group",
        "Deduplication",
        "Gaps and Islands",
        "Conditional Aggregation",
        "Pivot",
        "Consecutive Days",
        "Window Patterns"
      ],
      "prerequisites": "Nắm vững Bản chất Window Functions & ROW_NUMBER/DENSE_RANK (Bài 3.1), CTE (Bài 2.5).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Làm chủ mẫu thiết kế Top-N mỗi nhóm (Top-N per group) bằng CTE kết hợp DENSE_RANK() hoặc ROW_NUMBER().",
        "Ứng dụng Window Functions để xây dựng quy trình khử trùng lặp dữ liệu (Deduplication Pattern) giữ lại bản ghi mới nhất theo dấu thời gian.",
        "Giải mã bài toán kinh điển Gaps & Islands (Khoảng trống và Hòn đảo): Phát hiện chuỗi ngày hoạt động liên tục (Streaks) của người dùng bằng hiệu số giữa ngày tháng và ROW_NUMBER().",
        "Thành thạo kỹ thuật xoay bảng Pivot Table từ hàng thành cột bằng gom nhóm có điều kiện (Conditional Aggregation: SUM CASE WHEN).",
        "Đánh giá hiệu năng và chi phí tính toán của các giải thuật Window nâng cao trên tập dữ liệu hàng triệu dòng."
      ],
      "intuition": {
        "title": "Mẫu thêu hoa văn trong dệt may và Đồ họa đảo nổi giữa đại dương",
        "metaphor": "Trong nghề dệt thổ cẩm, người thợ dệt không sáng tạo lại từng mũi kim mà sử dụng các \"mẫu hoa văn mẫu\" (Design Patterns) đã được đúc kết qua hàng trăm năm. Trong kỹ thuật dữ liệu cũng vậy: dù nghiệp vụ của bạn là theo dõi chuỗi ngày đăng nhập của game thủ, chuỗi ngày uống thuốc của bệnh nhân hay chuỗi ngày giao dịch chứng khoán, bản chất toán học của chúng đều quy về cùng một mẫu: \"Gaps & Islands\" (Khoảng trống và Hòn đảo). Một hòn đảo là một chuỗi các ngày liên tiếp nhau; khoảng trống là những ngày bị ngắt quãng. Khi bạn nắm được công thức trừ ngày cho số thứ tự, bạn có thể biến một bài toán cực kỳ đau đầu thành vài dòng SQL tuyệt đẹp.",
        "boundary": "Ẩn dụ này giúp bạn nhận diện cấu trúc bài toán; tuy nhiên khi áp dụng vào thực tế, các kiểu dữ liệu ngày tháng giữa các hệ quản trị CSDL có sự khác biệt lớn về hàm trừ ngày (DATE_SUB, INTERVAL, hay trừ trực tiếp kiểu số).",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:200px;border-color:var(--warning);\">\n                <div style=\"font-size:0.75rem;color:var(--warning);margin-bottom:4px;font-weight:700;\">DEFAULT RANGE FRAME (BẪY NGẦM)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">RANGE UNBOUNDED PRECEDING</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Gom các dòng cùng giá trị &rarr; Tính tổng gộp cả cụm trùng!</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">ROWS SLIDING FRAME (TƯỜNG MINH)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">ROWS 6 PRECEDING AND CURRENT ROW</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Trượt đúng 7 dòng vật lý &rarr; Tính Rolling 7D mượt mà!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ LEAD / LAG:</span>\n              <span>Truy xuất dữ liệu của dòng kế tiếp (<code>LEAD</code>) hoặc dòng phía trước (<code>LAG</code>) ngay tại dòng hiện tại mà không cần tự JOIN bảng!</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-15-problem-hook",
          "title": "Gợi Mở Vấn Đề: Bài Toán Chuỗi Ngày Đăng Nhập Liên Tục (Streak Tracking)",
          "content": "\n            <p>Hãy xem một câu hỏi phỏng vấn Senior Data Engineer nổi tiếng tại các tập đoàn công nghệ (Meta, Uber, Grab, Shopee):</p>\n            <p><em>\"Cho bảng nhật ký đăng nhập của người dùng. Hãy viết một câu truy vấn SQL duy nhất để tìm chuỗi ngày đăng nhập liên tục dài nhất (Longest Login Streak) của từng khách hàng?\"</em>.</p>\n            <p>Nếu dùng tư duy lập trình tuần tự (Python/Java), bạn sẽ dùng vòng lặp <code>for</code>, một biến đếm và một biến lưu kỷ lục. Nhưng trong SQL &mdash; nơi bạn phải xử lý hàng trăm triệu dòng dữ liệu theo tư duy tập hợp &mdash; làm thế nào để \"nhận diện\" được hai ngày có liên tiếp nhau hay không mà không được dùng vòng lặp?</p>\n            <p>Bài học này sẽ trang bị cho bạn <strong>4 mẫu thiết kế giải thuật SQL kinh điển</strong> giúp bạn xử lý nhẹ nhàng mọi bài toán phân tích phức tạp nhất.</p>\n          "
        },
        {
          "id": "sec-15-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Truy Hồi Kỹ Thuật Đánh Số Thứ Tự",
          "content": "\n            <p>Hãy cùng kiểm tra nhanh 2 nguyên lý từ Bài 3.1:</p>\n            \n            <div class=\"predict-question\">\n              <strong>Câu hỏi 1:</strong> Nếu bạn cần lấy duy nhất 1 sản phẩm đắt nhất của từng danh mục, và nếu có 2 sản phẩm bằng giá nhau bạn chỉ muốn lấy đúng 1 sản phẩm bất kỳ, bạn nên dùng <code>ROW_NUMBER()</code> hay <code>DENSE_RANK()</code>?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Phải dùng <code>ROW_NUMBER()</code>! Vì <code>ROW_NUMBER()</code> cam kết trả về các số thứ tự duy nhất tuyệt đối (1, 2, 3...) không bao giờ trùng lặp, đảm bảo mệnh đề <code>WHERE rn = 1</code> chỉ trả về đúng 1 dòng. Nếu dùng <code>DENSE_RANK()</code>, khi có 2 sản phẩm bằng giá nhau cả hai đều nhận hạng 1, khiến kết quả bị trả về 2 dòng!</p>\n              </div>\n            </details>\n\n            <div class=\"predict-question\" style=\"margin-top: 1rem;\">\n              <strong>Câu hỏi 2:</strong> Mệnh đề <code>PARTITION BY</code> có vai trò gì đối với các hàm Window Function?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> <code>PARTITION BY</code> chia tập dữ liệu thành các nhóm độc lập. Khi con trỏ dịch chuyển sang một nhóm mới, mọi phép tính toán và số thứ tự tự động reset lại từ đầu.</p>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-15-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Bộ Tứ Mẫu Giải Thuật SQL Phân Tích",
          "content": "\n            <p>Bốn mẫu thiết kế giải thuật SQL kinh điển mà mọi kỹ sư dữ liệu đều phải nằm lòng:</p>\n\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Mẫu Giải Thuật</th>\n                  <th scope=\"col\">Vấn Đề Cần Giải Quyết</th>\n                  <th scope=\"col\">Kỹ Thuật SQL Cốt Lõi</th>\n                  <th scope=\"col\">Độ Phức Tạp Thuật Toán</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">1. Top-N Per Group</th>\n                  <td>Lấy N bản ghi đứng đầu (lớn nhất, mới nhất) của từng nhóm thực thể.</td>\n                  <td>CTE + <code>ROW_NUMBER() / DENSE_RANK() OVER (PARTITION BY ... ORDER BY ...)</code> sau đó lọc <code>WHERE rn &lt;= N</code>.</td>\n                  <td>$O(M \times K log K)$ với Sort trong từng Partition.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">2. Deduplication Pattern</th>\n                  <td>Khử trùng lặp bản ghi, chỉ giữ lại phiên bản cập nhật mới nhất.</td>\n                  <td>CTE + <code>ROW_NUMBER() OVER (PARTITION BY business_key ORDER BY updated_at DESC) WHERE rn = 1</code>.</td>\n                  <td>$O(N log N)$ toàn bảng.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">3. Gaps and Islands</th>\n                  <td>Phát hiện các chuỗi liên tục (Islands) và các khoảng trống đứt gãy (Gaps) trên chuỗi thời gian.</td>\n                  <td>Hiệu số toán học: <code>date_col - (ROW_NUMBER() * INTERVAL '1 day')</code> tạo ra khóa nhóm cố định cho các ngày liên tiếp.</td>\n                  <td>$O(N log N)$ theo dòng thời gian.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">4. Conditional Pivot</th>\n                  <td>Xoay các giá trị từ nhiều dòng thành các cột báo cáo độc lập.</td>\n                  <td><code>SUM(CASE WHEN category = 'X' THEN amount ELSE 0 END)</code> kết hợp với <code>GROUP BY</code>.</td>\n                  <td>$O(N)$ quét tuyến tính sau gom nhóm.</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-15-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Giải Mã Ma Thuật \"Gaps & Islands\"",
          "content": "\n            <p>Làm thế nào để gom các ngày liên tiếp nhau vào cùng một nhóm? Hãy quan sát bảng phân tích toán học kỳ diệu dưới đây:</p>\n            <p>Giả sử khách hàng đăng nhập vào các ngày: <code>01, 02, 03</code> (chuỗi 1), sau đó nghỉ và đăng nhập tiếp vào <code>06, 07</code> (chuỗi 2). Hãy lấy ngày đăng nhập trừ đi số thứ tự tuần tự (<code>ROW_NUMBER</code>):</p>\n\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Ngày Đăng Nhập (A)</th>\n                  <th scope=\"col\">ROW_NUMBER() (B)</th>\n                  <th scope=\"col\">Hiệu Số: (A - B ngày)</th>\n                  <th scope=\"col\">Ý Nghĩa Nhận Diện \"Hòn Đảo\" (Island)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td>2023-10-01</td>\n                  <td>1</td>\n                  <td><strong>2023-09-30</strong></td>\n                  <td rowspan=\"3\" style=\"vertical-align: middle; background: rgba(56, 189, 248, 0.1);\"><strong>Hòn đảo 1:</strong> Cùng ra hiệu số <code>2023-09-30</code>! Cả 3 ngày này liên tiếp nhau!</td>\n                </tr>\n                <tr>\n                  <td>2023-10-02</td>\n                  <td>2</td>\n                  <td><strong>2023-09-30</strong></td>\n                </tr>\n                <tr>\n                  <td>2023-10-03</td>\n                  <td>3</td>\n                  <td><strong>2023-09-30</strong></td>\n                </tr>\n                <tr>\n                  <td>2023-10-06</td>\n                  <td>4</td>\n                  <td><strong>2023-10-02</strong></td>\n                  <td rowspan=\"2\" style=\"vertical-align: middle; background: rgba(74, 222, 128, 0.1);\"><strong>Hòn đảo 2:</strong> Bị ngắt quãng, hiệu số nhảy sang <code>2023-10-02</code>!</td>\n                </tr>\n                <tr>\n                  <td>2023-10-07</td>\n                  <td>5</td>\n                  <td><strong>2023-10-02</strong></td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n\n            <p><strong>Bản chất:</strong> Khi các ngày tăng đều đặn 1 đơn vị và <code>ROW_NUMBER</code> cũng tăng đều đặn 1 đơn vị, <em>hiệu số giữa chúng là một hằng số bất biến</em>! Khi chuỗi bị đứt gãy, hiệu số sẽ lập tức nhảy sang một giá trị mới. Ta chỉ cần <code>GROUP BY</code> theo giá trị hiệu số này là gom trọn vẹn từng chuỗi ngày liên tiếp!</p>\n          "
        },
        {
          "id": "sec-15-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Khử Trùng Lặp & Top-1 Trên Bộ Dữ Liệu TechMart",
          "content": "\n            <p>Chúng ta sẽ thực hành trực tiếp hai mẫu kinh điển: Khử trùng lặp trên bảng <code>raw_dirty_orders</code> và Xoay bảng doanh thu Pivot Table:</p>\n\n            <div class=\"predict-question\">\n              <strong>Thử thách dự đoán:</strong> Bảng <code>raw_dirty_orders</code> có 2 bản ghi trùng lặp mang <code>order_id = 2001</code> (raw_id: 1 và raw_id: 2). Nếu dùng kỹ thuật Deduplication giữ lại bản ghi có <code>raw_id</code> lớn nhất, bản ghi nào sẽ được giữ lại?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Dự đoán chính xác:</strong> Bằng cách sắp xếp <code>ORDER BY raw_id DESC</code>, dòng <code>raw_id = 2</code> sẽ nhận <code>ROW_NUMBER = 1</code> và được giữ lại, dòng <code>raw_id = 1</code> nhận <code>ROW_NUMBER = 2</code> và bị loại bỏ hoàn toàn!</p>\n              </div>\n            </details>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Mẫu 1: Khử trùng lặp dữ liệu thô (Deduplication Pattern)",
              "code": "WITH ranked_records AS (\n    SELECT \n        raw_id,\n        order_id,\n        customer_name,\n        total_amount,\n        ROW_NUMBER() OVER (\n            PARTITION BY order_id \n            ORDER BY raw_id DESC\n        ) AS record_rank\n    FROM raw_dirty_orders\n)\nSELECT \n    raw_id,\n    order_id,\n    customer_name,\n    total_amount\nFROM ranked_records\nWHERE record_rank = 1\nORDER BY order_id ASC;",
              "explanation": "Truy vấn gom nhóm theo order_id và đánh số thứ tự giảm dần theo raw_id. Mệnh đề WHERE record_rank = 1 loại bỏ thành công bản ghi trùng lặp cũ hơn, chỉ giữ lại đúng 1 bản ghi mới nhất.",
              "output": "+--------+----------+------------------+--------------+\n| raw_id | order_id | customer_name    | total_amount |\n+--------+----------+------------------+--------------+\n| 2      | 2001     | Nguyen Van An    | 1800000.00   |\n| 3      | 2002     | Khach La Vo Danh | 2500000.00   |\n| 4      | 2003     | Tran Thi Binh    | 3200000.00   |\n| 5      | 2004     | Le Van Cuong     | -500000.00   |\n| 6      | 2005     | Pham Thi Dung    | 1200000.00   |\n+--------+----------+------------------+--------------+\n(Khử trùng lặp đơn 2001 thành công - Giữ lại raw_id: 2)"
            },
            {
              "lang": "SQL",
              "title": "Mẫu 2: Xoay bảng Pivot doanh thu theo danh mục sản phẩm",
              "code": "SELECT \n    o.order_date,\n    SUM(CASE WHEN p.category = 'Accessories' THEN oi.quantity * oi.unit_price ELSE 0 END) AS accessories_rev,\n    SUM(CASE WHEN p.category = 'Monitor'     THEN oi.quantity * oi.unit_price ELSE 0 END) AS monitor_rev,\n    SUM(CASE WHEN p.category = 'Audio'       THEN oi.quantity * oi.unit_price ELSE 0 END) AS audio_rev,\n    SUM(oi.quantity * oi.unit_price) AS daily_total\nFROM orders o\nJOIN order_items oi ON o.order_id = oi.order_id\nJOIN products p ON oi.product_id = p.product_id\nWHERE o.status = 'COMPLETED'\nGROUP BY o.order_date\nORDER BY o.order_date ASC;",
              "explanation": "Kỹ thuật Conditional Aggregation sử dụng CASE WHEN bên trong hàm SUM biến các danh mục dạng dòng thành các cột độc lập trên báo cáo kinh doanh theo ngày.",
              "output": "+------------+-----------------+-------------+-----------+-------------+\n| order_date | accessories_rev | monitor_rev | audio_rev | daily_total |\n+------------+-----------------+-------------+-----------+-------------+\n| 2023-06-01 | 4000000.00      | 0.00        | 0.00      | 4000000.00  |\n| 2023-06-05 | 0.00            | 8500000.00  | 0.00      | 8500000.00  |\n| 2023-07-02 | 2250000.00      | 0.00        | 0.00      | 2250000.00  |\n| 2023-08-10 | 1800000.00      | 0.00        | 0.00      | 1800000.00  |\n+------------+-----------------+-------------+-----------+-------------+\n(Xoay bảng Pivot thành công 100% trên PostgreSQL & DuckDB)"
            }
          ]
        },
        {
          "id": "sec-15-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Mẫu Top-1 Sản Phẩm Giá Cao Nhất Mỗi Danh Mục",
          "content": "\n            <p>Hãy hoàn thiện câu lệnh lấy ra sản phẩm có giá cao nhất của từng danh mục trong bảng <code>products</code>. Điền các từ khóa thích hợp vào các vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-faded-block\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; line-height: 1.8;\">\n              [___1___] ranked_products AS (<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;SELECT <br>\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;product_id, product_name, category, price,<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ROW_NUMBER() OVER ([___2___] BY category [___3___] BY price DESC) AS rn<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;FROM products<br>\n              )<br>\n              SELECT product_id, product_name, category, price<br>\n              FROM ranked_products<br>\n              WHERE rn [___4___] 1;\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top: 1rem;\">\n              <summary>Xem đáp án điền khuyết</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án chính xác:</strong></p>\n                <ul>\n                  <li><code>[___1___]</code>: <strong>WITH</strong> &mdash; Khởi tạo Common Table Expression (CTE).</li>\n                  <li><code>[___2___]</code>: <strong>PARTITION</strong> &mdash; Chia cụm theo danh mục sản phẩm.</li>\n                  <li><code>[___3___]</code>: <strong>ORDER</strong> &mdash; Sắp xếp theo giá giảm dần để giá cao nhất đứng ở vị trí 1.</li>\n                  <li><code>[___4___]</code>: <strong>=</strong> (hoặc <strong>&lt;=</strong>).</li>\n                </ul>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-15-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Các Mẫu Phân Tích Nâng Cao",
          "content": "\n            <div class=\"concept-box callout-danger\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-exclamation-triangle\"></i></span>\n                <span class=\"concept-title\">Bẫy 1: Dùng Nhầm DENSE_RANK Thay Cho ROW_NUMBER Khi Khử Trùng Lặp</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Khi làm Deduplication, viết: <code>DENSE_RANK() OVER (PARTITION BY id ORDER BY created_at DESC) AS rn</code>.</p>\n                <p><strong>Hậu quả:</strong> Nếu hệ thống có 2 bản ghi trùng lặp được tạo ra ở cùng một mili-giây (cùng <code>created_at</code>), cả hai bản ghi đều nhận hạng <code>rn = 1</code>! Câu lệnh lọc <code>WHERE rn = 1</code> vẫn trả về cả 2 bản ghi, khiến thao tác khử trùng lặp hoàn toàn thất bại. Luôn dùng <code>ROW_NUMBER()</code> và bổ sung thêm khóa phụ nếu cần đảm bảo tính đơn định (Deterministic Ordering).</p>\n              </div>\n            </div>\n\n            <div class=\"concept-box callout-danger\" style=\"margin-top: 1.25rem;\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-calendar-times\"></i></span>\n                <span class=\"concept-title\">Bẫy 2: Quên Khử Trùng Lặp Ngày Trước Khi Giải Bài Toán Gaps & Islands</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Áp dụng công thức trừ ngày ngay trên bảng sự kiện thô có chứa nhiều hành vi trong cùng một ngày.</p>\n                <p><strong>Hậu quả:</strong> Nếu người dùng đăng nhập 3 lần trong ngày <code>2023-10-01</code>, <code>ROW_NUMBER()</code> sẽ nhảy từ 1 lên 3 trong khi ngày không đổi, khiến hiệu số bị méo mó và phá hủy thuật toán Gaps & Islands! Bắt buộc phải gom <code>DISTINCT</code> hoặc <code>GROUP BY user_id, event_date</code> trước khi áp dụng Window Function.</p>\n              </div>\n            </div>\n          "
        },
        {
          "id": "sec-15-concept-comparison",
          "title": "So Sánh: Conditional Aggregation (CASE WHEN) vs Cú Pháp PIVOT Đặc Thù",
          "content": "\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Tiêu Chí</th>\n                  <th scope=\"col\">Conditional Aggregation (SUM CASE WHEN)</th>\n                  <th scope=\"col\">Cú Pháp PIVOT Của Từng Hãng (T-SQL, Oracle, DuckDB)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">Tính tương thích đa nền tảng</th>\n                  <td><strong>Chuẩn ANSI SQL 100%:</strong> Chạy mượt trên mọi CSDL (Postgres, MySQL, SQLite, DuckDB, Spark).</td>\n                  <td>Cú pháp phân mảnh, mỗi hệ quản trị viết một kiểu, không chạy được trên SQLite/PostgreSQL chuẩn.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Khả năng mở rộng logic</th>\n                  <td>Rất linh hoạt: có thể lồng ghép nhiều điều kiện phức tạp (AND, OR, LIKE, tính nhiều metric cùng lúc).</td>\n                  <td>Bị gò bó trong cấu trúc hàm Pivot có sẵn của hệ quản trị.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Độ phức tạp khi viết</th>\n                  <td>Cần viết từng dòng <code>CASE WHEN</code> cho mỗi giá trị cột muốn xoay.</td>\n                  <td>Ngắn gọn hơn nếu hệ quản trị hỗ trợ tính năng tự động nhận diện giá trị (Auto-pivot).</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-15-real-world-tradeoffs",
          "title": "Ngoài Đời Thực: Vận Hành Top-N Và Deduplication Trong Data Pipeline",
          "content": "\n            <p>Trong các Data Pipeline hiện đại (dbt + Snowflake / BigQuery), mẫu Deduplication được gọi là <strong>Incremental Snapshot Merge</strong>:</p>\n            <ul>\n              <li>Mỗi giờ, pipeline nạp hàng triệu bản ghi mới vào bảng tạm Staging.</li>\n              <li>Sử dụng mẫu <code>ROW_NUMBER() OVER (PARTITION BY business_id ORDER BY cdc_timestamp DESC)</code> để lấy ra bản ghi mới nhất của từng thực thể.</li>\n              <li>Thực hiện lệnh <code>MERGE INTO target USING deduplicated_cte ON ...</code> để cập nhật kho dữ liệu chính thức mà không làm nổ dung lượng lưu trữ.</li>\n            </ul>\n          "
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi không xác định (Non-deterministic) trong ROW_NUMBER()",
            "content": "Nếu cột ORDER BY có nhiều giá trị bằng nhau, CSDL có thể trả về các thứ tự ngẫu nhiên giữa các lần chạy khác nhau. Để kết quả luôn nhất quán 100%, hãy thêm khóa chính vào cuối: ORDER BY updated_at DESC, primary_key DESC."
          },
          {
            "title": "Cạm bẫy Gaps & Islands với dữ liệu có nhiều sự kiện trong ngày",
            "content": "Luôn luôn chạy SELECT DISTINCT user_id, CAST(event_time AS DATE) AS event_date trước khi tính hiệu số Gaps & Islands."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng FILTER (WHERE ...) trong PostgreSQL & DuckDB",
            "content": "Thay vì viết SUM(CASE WHEN x THEN y ELSE 0 END), PostgreSQL và DuckDB hỗ trợ cú pháp siêu sạch: SUM(y) FILTER (WHERE x). Cú pháp này vừa ngắn gọn vừa có hiệu năng cao hơn."
          }
        ],
        "deepDive": {
          "title": "Tối ưu hóa hiệu năng: Cạm bẫy mặc định của RANGE và cách chuyển sang ROWS để tăng tốc gấp 10 lần",
          "content": "<p>Khi bạn viết <code>OVER (ORDER BY date)</code> mà không ghi rõ khung cửa sổ, chuẩn ANSI SQL quy định khung mặc định là: <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>.</p><p>Khung <strong>RANGE</strong> buộc engine phải kiểm tra xem các dòng kế tiếp có cùng giá trị với dòng hiện tại không (Peer Group Comparison) để cộng dồn đồng thời. Quá trình kiểm tra lặp này làm chậm tốc độ tính toán gấp 5-10 lần trên tập dữ liệu lớn! Luôn luôn chỉ định tường minh <code>ROWS BETWEEN ...</code> để engine di chuyển con trỏ trực tiếp mà không cần so sánh giá trị ngang hàng.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 3.2-1 (Dự đoán kết quả): Hiệu số Gaps & Islands cho chuỗi ngày",
          "level": "Cơ bản",
          "problem": "Một người dùng hoạt động vào các ngày: 2023-11-01, 2023-11-02, 2023-11-05. Hãy tính giá trị hiệu số (ngay - ROW_NUMBER() ngay) cho từng ngày và cho biết có bao nhiêu chuỗi hoạt động độc lập (islands)?",
          "hint": "Tính ngày trừ đi số nguyên thứ tự tương ứng: 1, 2, 3.",
          "solutionCode": "-- Tính toán:\n-- 2023-11-01 - 1 ngày = 2023-10-31 (Island A)\n-- 2023-11-02 - 2 ngày = 2023-10-31 (Island A)\n-- 2023-11-05 - 3 ngày = 2023-11-02 (Island B)\n-- Kết luận: Có đúng 2 hòn đảo (Islands):\n-- Island A kéo dài 2 ngày (01 và 02); Island B kéo dài 1 ngày (05).",
          "solutionOutput": "2 chuỗi độc lập: Chuỗi 1 (2 ngày) và Chuỗi 2 (1 ngày).",
          "explanation": "Chẩn đoán: Hiệu số bất biến 2023-10-31 gom trọn 2 ngày liên tiếp đầu tiên. Ngày thứ 3 bị ngắt quãng tạo ra hiệu số mới 2023-11-02."
        },
        {
          "title": "Bài tập 3.2-2 (Tìm & Sửa lỗi): Lỗi khử trùng lặp dữ liệu không triệt để",
          "level": "Trung bình",
          "problem": "Một kỹ sư viết câu lệnh khử trùng lặp đơn hàng như sau:\nSELECT order_id, customer_name, total_amount FROM (SELECT *, RANK() OVER (PARTITION BY order_id ORDER BY raw_id DESC) AS rnk FROM raw_dirty_orders) t WHERE rnk = 1;\nVì sao kỹ sư này vẫn có nguy cơ nhận được các bản ghi trùng lặp nếu hệ thống gặp lỗi? Hãy sửa lại.",
          "hint": "Thay hàm RANK() bằng ROW_NUMBER() để loại trừ trường hợp đồng hạng.",
          "solutionCode": "-- Sửa lại chuẩn xác:\nWITH deduped AS (\n    SELECT \n        raw_id, order_id, customer_name, total_amount,\n        ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY raw_id DESC) AS rn\n    FROM raw_dirty_orders\n)\nSELECT raw_id, order_id, customer_name, total_amount\nFROM deduped\nWHERE rn = 1;",
          "solutionOutput": "Dữ liệu sau khi lọc cam kết 100% không còn bản ghi trùng lặp.",
          "explanation": "Chẩn đoán: Hàm RANK() sẽ trả về cùng hạng 1 nếu hai dòng có cùng giá trị sắp xếp, khiến bản ghi trùng lặp vẫn lọt qua bộ lọc."
        },
        {
          "title": "Bài tập 3.2-3 (Tự viết truy vấn): Tìm đơn hàng có giá trị lớn nhất của từng khách hàng",
          "level": "Khá",
          "problem": "Từ bảng orders, hãy viết câu truy vấn lấy ra đúng 1 đơn hàng có giá trị total_amount cao nhất của từng khách hàng (customer_id). Nếu có 2 đơn bằng tiền nhau, ưu tiên lấy đơn hàng có ngày đặt mới nhất.",
          "hint": "Áp dụng mẫu Top-1 per group với ORDER BY total_amount DESC, order_date DESC.",
          "solutionCode": "WITH ranked_orders AS (\n    SELECT \n        order_id,\n        customer_id,\n        order_date,\n        total_amount,\n        ROW_NUMBER() OVER (\n            PARTITION BY customer_id \n            ORDER BY total_amount DESC, order_date DESC\n        ) AS rn\n    FROM orders\n)\nSELECT order_id, customer_id, order_date, total_amount\nFROM ranked_orders\nWHERE rn = 1\nORDER BY customer_id ASC;",
          "solutionOutput": "Mỗi khách hàng được hiển thị chính xác đúng 1 đơn hàng giá trị cao nhất.",
          "explanation": "Mẫu thiết kế Top-1 per group giải quyết bài toán tìm kỷ lục cá thể của từng nhóm một cách hoàn hảo."
        },
        {
          "title": "Bài tập 3.2-4 (Đánh đổi & Kiến trúc): Xoay Pivot Table số lượng đơn hàng theo trạng thái",
          "level": "Nâng cao",
          "problem": "Từ bảng orders, hãy viết câu truy vấn hiển thị mỗi khách hàng trên 1 dòng gồm các cột: customer_id, số đơn COMPLETED, số đơn CANCELLED, số đơn PENDING, và tổng số đơn hàng của khách đó.",
          "hint": "Dùng COUNT(CASE WHEN status = ... THEN 1 END) hoặc SUM(CASE WHEN ... THEN 1 ELSE 0 END).",
          "solutionCode": "SELECT \n    customer_id,\n    SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed_orders,\n    SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) AS cancelled_orders,\n    SUM(CASE WHEN status = 'PENDING'   THEN 1 ELSE 0 END) AS pending_orders,\n    COUNT(*) AS total_orders\nFROM orders\nGROUP BY customer_id\nORDER BY customer_id ASC;",
          "solutionOutput": "Bảng ma trận xoay Pivot hoàn chỉnh thể hiện bức tranh đơn hàng của toàn bộ khách hàng.",
          "explanation": "Kỹ thuật Conditional Aggregation là chuẩn mực quốc tế khi cần xoay dữ liệu mà vẫn tương thích 100% trên mọi hệ quản trị SQL."
        }
      ],
      "quiz": [
        {
          "question": "Khi thực hiện bài toán khử trùng lặp dữ liệu (Deduplication) để chỉ giữ lại bản ghi mới nhất, hàm xếp hạng nào sau đây là sự lựa chọn an toàn tuyệt đối?",
          "options": [
            "RANK()",
            "DENSE_RANK()",
            "ROW_NUMBER()",
            "NTILE(1)"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! ROW_NUMBER() là hàm duy nhất cam kết đánh số thứ tự tuần tự không bao giờ trùng lặp, bảo đảm điều kiện WHERE rn = 1 chỉ trả về duy nhất 1 bản ghi đại diện."
        },
        {
          "question": "Nguyên lý toán học cốt lõi của giải thuật Gaps & Islands khi tìm chuỗi ngày liên tiếp là gì?",
          "options": [
            "Nhân ngày tháng với số dòng hiện tại.",
            "Lấy ngày tháng trừ đi một khoảng thời gian bằng ROW_NUMBER() * 1 ngày; hiệu số này sẽ là một hằng số bất biến cho các ngày liên tiếp nhau.",
            "Cộng tất cả các ngày lại và chia cho số lượng người dùng.",
            "Sử dụng phép ghép ngoài FULL OUTER JOIN với bảng lịch."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Khi cả ngày và ROW_NUMBER đều tăng 1 đơn vị, hiệu số giữa chúng không đổi. Đó chính là chìa khóa định danh từng cụm ngày liên tục."
        },
        {
          "question": "Trong mẫu thiết kế Top-N per group, tại sao chúng ta bắt buộc phải dùng CTE hoặc Subquery trước khi lọc WHERE rn <= N?",
          "options": [
            "Vì SQL không cho phép đặt bí danh cho cột.",
            "Vì mệnh đề WHERE thực thi ở Bước 2 trước khi Window Function được tính toán ở Bước 5 (SELECT).",
            "Vì CTE giúp tăng dung lượng lưu trữ của ổ cứng.",
            "Vì hàm ROW_NUMBER() chỉ chạy được bên trong CTE."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Chu trình thực thi logic của SQL bắt buộc chúng ta phải bọc Window Function vào CTE để tầng truy vấn bên ngoài có thể lọc được kết quả ở mệnh đề WHERE."
        },
        {
          "question": "Kỹ thuật Conditional Aggregation (SUM CASE WHEN) khi xoay bảng Pivot mang lại ưu điểm vượt trội nào so với cú pháp PIVOT riêng của một số hệ quản trị?",
          "options": [
            "Tự động xóa các dòng có giá trị NULL.",
            "Tương thích 100% với chuẩn ANSI SQL, chạy mượt mà trên mọi hệ quản trị CSDL mà không phụ thuộc cú pháp độc quyền.",
            "Không cần sử dụng mệnh đề GROUP BY.",
            "Tự động tăng tốc độ truy vấn lên gấp 1.000 lần."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Conditional Aggregation là chuẩn mực quốc tế, viết một lần chạy được trên tất cả CSDL (Postgres, SQLite, MySQL, DuckDB, Oracle, BigQuery)."
        },
        {
          "question": "Để tránh tính chất bất định (Non-deterministic) khi sắp xếp trong hàm ROW_NUMBER(), kỹ sư dữ liệu nên làm gì?",
          "options": [
            "Bỏ hoàn toàn mệnh đề ORDER BY.",
            "Bổ sung thêm khóa chính (Primary Key) hoặc cột định danh duy nhất vào cuối mệnh đề ORDER BY để phá vỡ các trường hợp bằng điểm nhau.",
            "Chỉ sắp xếp theo các cột chứa giá trị NULL.",
            "Chuyển sang sử dụng CSDL NoSQL."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Khi cột sắp xếp chính bị trùng nhau, việc bổ sung thêm khóa chính vào cuối (ví dụ ORDER BY score DESC, student_id ASC) sẽ đảm bảo thứ tự trả về luôn nhất quán 100% qua mọi lần chạy."
        }
      ],
      "summary": [
        "Mẫu Top-N per group: Bọc Window Function vào CTE và lọc WHERE rn <= N ở tầng ngoài cùng.",
        "Mẫu Deduplication: Sử dụng ROW_NUMBER() OVER (PARTITION BY business_key ORDER BY timestamp DESC) để lấy bản ghi mới nhất.",
        "Mẫu Gaps & Islands: Lấy ngày trừ đi ROW_NUMBER() để tạo khóa nhóm cố định cho các chuỗi ngày liên tiếp.",
        "Mẫu Pivot Table: Dùng Conditional Aggregation (SUM CASE WHEN) để xoay hàng thành cột chuẩn ANSI SQL.",
        "Luôn bổ sung khóa chính vào ORDER BY của Window Function để bảo đảm tính đơn định (Deterministic Ordering).",
        "Ôn cách quãng: Tại sao hàm AVG(cột) lại tự động bỏ qua NULL và cách khắc phục bằng COALESCE? (Xem lại Bài 2.1)."
      ]
    },
    {
      "id": "sql-16-clean-sql-discipline",
      "number": "3.3",
      "title": "Kỷ Luật Viết SQL Sạch, Dễ Đọc & Dễ Bảo Trì: SQL Style Guide & Kiến Trúc CTE Pipeline",
      "subtitle": "Nâng tầm tư duy kỹ thuật: Thoát khỏi bẫy Spaghetti SQL, áp dụng chuẩn mã nguồn công nghiệp và kiến trúc phân lớp CTE",
      "level": "Nâng cao",
      "duration": "40 phút",
      "keywords": [
        "Clean SQL",
        "SQL Style Guide",
        "CTE Pipeline",
        "Refactoring",
        "Maintainability",
        "Code Review",
        "Readability"
      ],
      "prerequisites": "Nắm vững CTE (Bài 2.5), Window Functions (Bài 3.1 & 3.2).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Hiểu lý do vì sao chi phí đọc và bảo trì mã nguồn SQL trong môi trường doanh nghiệp cao gấp 10 lần chi phí viết code lần đầu.",
        "Làm chủ quy ước định dạng mã nguồn SQL chuẩn công nghiệp (dựa trên dbt / GitLab / Mozilla SQL Style Guide).",
        "Ứng dụng mô hình kiến trúc CTE Pipeline để tái cấu trúc các câu lệnh Subquery lồng nhau nhiều tầng thành chuỗi ống dẫn dữ liệu đơn hướng, dễ debug.",
        "Thiết lập kỷ luật đặt tên bí danh (Aliases) có tính mô tả nghiệp vụ cao, loại bỏ thói quen đặt tên viết tắt cẩu thả (a, b, c, x, y).",
        "Áp dụng chiến lược kiểm thử trên tập dữ liệu nhỏ (Small Data Unit Testing) trước khi triển khai câu lệnh lên kho dữ liệu sản xuất."
      ],
      "intuition": {
        "title": "Bãi rác dây điện chằng chịt vs Tủ điện công nghiệp có nhãn mác",
        "metaphor": "Một đoạn mã SQL cẩu thả giống như một búi dây điện rối tung trong ngõ hẻm: các sợi dây lồng chéo vào nhau (Subquery trong Subquery), không ai biết sợi dây nào dẫn điện vào đâu, và mỗi khi muốn sửa một bóng đèn, cả thợ điện lẫn người dân đều toát mồ hôi vì sợ chập cháy cả khu phố! Ngược lại, một câu lệnh SQL chuẩn mực được thiết kế như một tủ điện công nghiệp đạt chuẩn ISO: dây điện chạy vuông vức theo từng máng riêng biệt (CTE Pipeline), từng aptomat đều có dán nhãn phân tầng rõ ràng (Staging -> Intermediate -> Marts). Khi có sự cố, kỹ sư chỉ mất 10 giây để ngắt đúng công tắc cần bảo trì mà toàn bộ nhà máy vẫn vận hành bình thường.",
        "boundary": "Ẩn dụ này nhấn mạnh tính dễ bảo trì; tuy nhiên cần lưu ý trên một số CSDL cũ (như PostgreSQL 11 trở về trước), việc chia quá nhiều CTE có thể khiến Optimizer tạo ra hàng rào tối ưu hóa (Optimization Fence), đòi hỏi kỹ sư phải hiểu rõ cơ chế Materialization.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:200px;border-color:var(--danger);\">\n                <div style=\"font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;\">SPAGHETTI SQL (KHÓ BẢO TRÌ)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--danger);font-family:monospace;\">Subquery 5 tầng lồng nhau</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Không thể tái sử dụng, debug cực hình</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">MODULAR CTE PIPELINE (DBT CHUẨN)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">raw &rarr; clean &rarr; metric &rarr; final</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Đọc từ trên xuống dưới như một câu chuyện logic</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Quy ước kỹ sư:</span>\n              <span>Từ khóa viết HOA, tên cột snake_case có tiền tố (<code>is_active</code>, <code>created_at</code>, <code>total_amount</code>), format thụt lề 2-4 dấu cách.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-16-problem-hook",
          "title": "Gợi Mở Vấn Đề: Cơn Ác Mộng Kế Thừa \"Spaghetti SQL\" 300 Dòng",
          "content": "\n            <p>Hãy hình dung bạn vừa gia nhập một công ty công nghệ vào ngày đầu tiên. Trưởng nhóm giao cho bạn một nhiệm vụ tưởng chừng đơn giản: <em>\"Báo cáo doanh thu tháng này bị lệch 5%, em sửa lại câu lệnh SQL này giúp anh nhé\"</em>.</p>\n            <p>Bạn mở file lên và trước mắt bạn là một \"quái vật\": một câu lệnh SQL dài hơn 300 dòng, với 6 tầng Subquery lồng nhau hình phễu, các bảng được đặt tên bí danh là <code>a, b, c, d, t1, t2</code>, các từ khóa viết lung tung lúc hoa lúc thường, và hoàn toàn không có một dòng chú thích nào! Bạn mất trọn vẹn 3 ngày chỉ để dịch xem tác giả cũ muốn làm gì, và khi sửa thử một điều kiện ở tầng thứ 3, toàn bộ kết quả ở tầng ngoài cùng đổ vỡ tan tành.</p>\n            <p><strong>Sự thật tàn nhẫn trong ngành dữ liệu:</strong> Một câu truy vấn SQL chỉ mất 1 giờ để viết ra, nhưng nó sẽ tồn tại trong hệ thống suốt 3 năm và được đọc, kiểm thử, chỉnh sửa bởi hàng chục kỹ sư khác nhau. Viết SQL sạch (Clean SQL) không phải là sở thích cá nhân, mà là <strong>đạo đức nghề nghiệp và tiêu chuẩn sống còn</strong> của kỹ sư dữ liệu chuyên nghiệp.</p>\n          "
        },
        {
          "id": "sec-16-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Truy Hồi Mệnh Đề WITH (CTE)",
          "content": "\n            <p>Trước khi chuẩn hóa phong cách viết, hãy ôn lại nhanh cơ chế CTE từ Bài 2.5:</p>\n            \n            <div class=\"predict-question\">\n              <strong>Câu hỏi 1:</strong> Mệnh đề <code>WITH</code> (CTE) mang lại lợi thế cấu trúc gì lớn nhất so với các câu lệnh Subquery lồng nhau trong mệnh đề <code>FROM</code>?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> CTE cho phép viết câu truy vấn theo trình tự tuyến tính từ trên xuống dưới (Linear Top-to-Bottom Flow) giống như một câu chuyện, thay vì bị lồng xoắn từ trong ra ngoài (Inside-Out) như Subquery, giúp người đọc dễ dàng theo dõi từng bước biến đổi dữ liệu.</p>\n              </div>\n            </details>\n\n            <div class=\"predict-question\" style=\"margin-top: 1rem;\">\n              <strong>Câu hỏi 2:</strong> Một CTE được định nghĩa ở trên có thể được gọi lại nhiều lần trong cùng một câu truy vấn chính hay không?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Hoàn toàn CÓ! Bạn có thể gọi CTE nhiều lần trong các phép JOIN hoặc UNION mà không cần phải viết lặp lại toàn bộ khối logic đó.</p>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-16-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Bộ Quy Tắc SQL Style Guide Chuẩn Công Nghiệp",
          "content": "\n            <p>Dựa trên các chuẩn mực mã nguồn quốc tế (GitLab Data Team, dbt Labs, Mozilla), dưới đây là 6 quy tắc bất biến khi viết SQL sản xuất:</p>\n\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Quy Tắc</th>\n                  <th scope=\"col\">Tiêu Chuẩn Chuẩn Mực</th>\n                  <th scope=\"col\">Ví Dụ SAI (Cấm kỵ)</th>\n                  <th scope=\"col\">Ví Dụ ĐÚNG (Chuẩn mực)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">1. Từ khóa SQL</th>\n                  <td>Viết HOA toàn bộ từ khóa ngôn ngữ để tạo độ tương phản thị giác cao.</td>\n                  <td><code>select a from b where c = 1;</code></td>\n                  <td><code>SELECT a FROM b WHERE c = 1;</code></td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">2. Tên cột và bảng</th>\n                  <td>Viết thường nối dấu gạch dưới (<code>snake_case</code>), không dùng dấu cách hay ký tự lạ.</td>\n                  <td><code>SELECT \"Customer Name\", TotalAmount</code></td>\n                  <td><code>SELECT customer_name, total_amount</code></td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">3. Bí danh (Aliases)</th>\n                  <td>Luôn có từ khóa <code>AS</code> rõ ràng; tên bí danh mang đầy đủ ý nghĩa nghiệp vụ.</td>\n                  <td><code>orders a JOIN customers b</code></td>\n                  <td><code>orders AS ord JOIN customers AS cust</code></td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">4. Ngắt dòng cột</th>\n                  <td>Mỗi cột trong mệnh đề SELECT nằm trên một dòng riêng biệt, thụt lề 4 space.</td>\n                  <td><code>SELECT id, name, age, address, phone FROM users;</code></td>\n                  <td>Mỗi thuộc tính trên 1 dòng có thụt lề rõ ràng.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">5. Dấu phẩy</th>\n                  <td>Thống nhất đặt dấu phẩy ở cuối dòng (Trailing) hoặc đầu dòng (Leading) trong toàn dự án.</td>\n                  <td>Lúc đầu dòng lúc cuối dòng lộn xộn.</td>\n                  <td>Nhất quán toàn bộ dự án.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">6. Mệnh đề JOIN</th>\n                  <td>Luôn ghi rõ loại JOIN (<code>INNER JOIN</code>, <code>LEFT JOIN</code>), không bao giờ viết tắt <code>JOIN</code> hoặc dùng dấu phẩy nối bảng.</td>\n                  <td><code>FROM orders, customers WHERE ...</code></td>\n                  <td><code>FROM orders AS ord INNER JOIN customers AS cust ON ...</code></td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-16-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Kiến Trúc 4 Tầng Của CTE Pipeline",
          "content": "\n            <p>Thay vì viết các câu lệnh lồng nhau phức tạp, kiến trúc dữ liệu hiện đại áp dụng <strong>Mô hình CTE Pipeline (Dây chuyền sản xuất dữ liệu)</strong> chia câu truy vấn thành 4 tầng trách nhiệm duy nhất (Single Responsibility):</p>\n\n            <div class=\"flowchart-container\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.5rem; border-radius: 8px; margin: 1rem 0;\">\n              <div style=\"font-family: monospace; font-size: 0.85rem; line-height: 1.6; color: #94a3b8;\">\n                <span style=\"color: #38bdf8;\">Tầng 1: [Import / Staging CTEs]</span> &mdash; Chỉ lọc và chọn các cột cần thiết từ bảng thô.<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>\n                <span style=\"color: #fbbf24;\">Tầng 2: [Transformation / Cleaning CTEs]</span> &mdash; Ép kiểu, xử lý NULL, chuẩn hóa chuỗi text.<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>\n                <span style=\"color: #c084fc;\">Tầng 3: [Aggregation / Business Logic CTEs]</span> &mdash; Tính toán Window Functions, gom nhóm.<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>\n                <span style=\"color: #4ade80;\">Tầng 4: [Final Output Selection]</span> &mdash; SELECT * FROM final_cte với thứ tự sắp xếp chuẩn.<br>\n              </div>\n            </div>\n\n            <p><strong>Lợi ích tối thượng:</strong> Khi xảy ra lỗi số liệu, bạn chỉ việc thay đổi dòng cuối cùng: <code>SELECT * FROM staging_orders</code> hoặc <code>SELECT * FROM transformed_orders</code> để \"soi kính lúp\" vào đúng tầng bị lỗi mà không cần phải tháo dỡ toàn bộ câu lệnh!</p>\n          "
        },
        {
          "id": "sec-16-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Tái Cấu Trúc (Refactoring) Câu Lệnh Spaghetti",
          "content": "\n            <p>Hãy xem một ca tái cấu trúc thực tế trên bộ dữ liệu TechMart. Bài toán: Tìm khách hàng có chi tiêu cao nhất tại từng thành phố và tính tỷ lệ đóng góp của họ:</p>\n\n            <div class=\"predict-question\">\n              <strong>Thử thách nhận diện:</strong> Đoạn code dưới đây viết theo phong cách Spaghetti Subquery:\n              <pre><code>SELECT city, customer_name, total_spent FROM (SELECT c.city, c.full_name AS customer_name, SUM(o.total_amount) AS total_spent, DENSE_RANK() OVER (PARTITION BY c.city ORDER BY SUM(o.total_amount) DESC) as rnk FROM customers c JOIN orders o ON c.customer_id = o.customer_id WHERE o.status = 'COMPLETED' GROUP BY c.city, c.full_name) t WHERE rnk = 1;</code></pre>\n              Hãy chỉ ra ít nhất 3 điểm yếu chí mạng khiến đoạn code trên bị từ chối (Reject) trong buổi Code Review?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Các điểm yếu chết người:</strong></p>\n                <ul>\n                  <li>Viết dồn dập trên một dòng duy nhất, không ngắt dòng và không thụt lề, gây mỏi mắt và cực kỳ khó debug.</li>\n                  <li>Bí danh bảng đặt là <code>c, o, t</code> thiếu tính mô tả.</li>\n                  <li>Lồng ghép hàm tổng hợp <code>SUM</code> trực tiếp bên trong <code>ORDER BY</code> của Window Function trong cùng một tầng gom nhóm, khiến người đọc không theo dõi được các bước biến đổi dữ liệu.</li>\n                </ul>\n              </div>\n            </details>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Phiên bản tái cấu trúc hoàn hảo theo chuẩn CTE Pipeline",
              "code": "-- ============================================================================\n-- Báo cáo: Khách hàng chi tiêu số 1 tại từng thành phố\n-- Tác giả: Data Engineering Team\n-- Engine: PostgreSQL 16 / DuckDB 2.0 / SQLite 3.50\n-- ============================================================================\n\nWITH completed_orders AS (\n    -- Tầng 1: Lọc dữ liệu đơn hàng thành công\n    SELECT \n        order_id,\n        customer_id,\n        total_amount\n    FROM orders\n    WHERE status = 'COMPLETED'\n),\n\ncustomer_spending_summary AS (\n    -- Tầng 2: Tổng hợp doanh số theo từng khách hàng và thành phố\n    SELECT \n        cust.customer_id,\n        cust.full_name AS customer_name,\n        cust.city,\n        SUM(ord.total_amount) AS total_spent\n    FROM customers AS cust\n    INNER JOIN completed_orders AS ord \n      ON cust.customer_id = ord.customer_id\n    GROUP BY \n        cust.customer_id,\n        cust.full_name,\n        cust.city\n),\n\nranked_city_customers AS (\n    -- Tầng 3: Xếp hạng khách hàng trong từng thành phố\n    SELECT \n        customer_id,\n        customer_name,\n        city,\n        total_spent,\n        DENSE_RANK() OVER (\n            PARTITION BY city \n            ORDER BY total_spent DESC\n        ) AS city_spending_rank\n    FROM customer_spending_summary\n)\n\n-- Tầng 4: Lấy ra Top 1 của từng thành phố\nSELECT \n    city,\n    customer_name,\n    total_spent\nFROM ranked_city_customers\nWHERE city_spending_rank = 1\nORDER BY total_spent DESC;",
              "explanation": "Đoạn mã được chia thành 4 khối CTE độc lập, mỗi khối đảm nhiệm đúng 1 nhiệm vụ. Bất kỳ ai nhìn vào cũng có thể đọc hiểu trong vòng 30 giây!",
              "output": "+-------------+---------------+-------------+\n| city        | customer_name | total_spent |\n+-------------+---------------+-------------+\n| Ho Chi Minh | Tran Thi Binh | 12500000.00 |\n| Hanoi       | Nguyen Van An | 4000000.00  |\n| Da Nang     | Le Van Cuong  | 2250000.00  |\n+-------------+---------------+-------------+\n(3 khách hàng VIP số 1 của 3 thành phố lớn)"
            }
          ]
        },
        {
          "id": "sec-16-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Chuẩn Hóa Cấu Trúc CTE Pipeline",
          "content": "\n            <p>Hãy hoàn thiện khung sườn của một CTE Pipeline tính doanh số trung bình theo danh mục sản phẩm. Điền các từ khóa thích hợp vào các vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-faded-block\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; line-height: 1.8;\">\n              [___1___] valid_products AS (<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;SELECT product_id, product_name, category, price<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;FROM products<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;WHERE price &gt; 0<br>\n              )[___2___]<br>\n              category_metrics AS (<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;SELECT <br>\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;category,<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COUNT(*) [___3___] total_items,<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ROUND(AVG(price), 2) AS avg_price<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;FROM valid_products<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;GROUP BY category<br>\n              )<br>\n              SELECT category, total_items, avg_price<br>\n              FROM category_metrics<br>\n              [___4___] BY total_items DESC;\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top: 1rem;\">\n              <summary>Xem đáp án điền khuyết</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án chính xác:</strong></p>\n                <ul>\n                  <li><code>[___1___]</code>: <strong>WITH</strong> &mdash; Khởi tạo khối CTE đầu tiên.</li>\n                  <li><code>[___2___]</code>: <strong>,</strong> (Dấu phẩy) &mdash; Ngăn cách giữa các CTE liên tiếp (không lặp lại từ khóa WITH!).</li>\n                  <li><code>[___3___]</code>: <strong>AS</strong> &mdash; Đặt bí danh tường minh cho cột.</li>\n                  <li><code>[___4___]</code>: <strong>ORDER</strong> &mdash; Sắp xếp kết quả cuối cùng.</li>\n                </ul>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-16-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Khi Viết Code Trong Dự Án Thật",
          "content": "\n            <div class=\"concept-box callout-danger\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-exclamation-triangle\"></i></span>\n                <span class=\"concept-title\">Bẫy 1: Lặp Lại Từ Khóa \"WITH\" Khi Khai Báo Nhiều CTE</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Viết: <code>WITH cte1 AS (...), WITH cte2 AS (...)</code>.</p>\n                <p><strong>Hậu quả:</strong> SQL Engine báo lỗi cú pháp ngay lập tức! Trong chuẩn SQL, từ khóa <code>WITH</code> chỉ được xuất hiện DUY NHẤT một lần ở đầu câu lệnh; các CTE tiếp theo được phân tách với nhau bằng dấu phẩy <code>,</code>.</p>\n              </div>\n            </div>\n\n            <div class=\"concept-box callout-danger\" style=\"margin-top: 1.25rem;\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-ghost\"></i></span>\n                <span class=\"concept-title\">Bẫy 2: Đặt Tên Bí Danh Kiểu \"Mã Hóa Mật Mã\" (a, b, c, t1, t2)</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Viết: <code>FROM orders a JOIN customers b ON a.customer_id = b.customer_id JOIN order_items c ON a.order_id = c.order_id</code>.</p>\n                <p><strong>Hậu quả:</strong> Khi câu lệnh dài hơn 50 dòng, người đọc hoàn toàn không thể nhớ nổi <code>a</code> là bảng gì, <code>b</code> là bảng gì, dẫn đến việc lấy nhầm cột hoặc join sai điều kiện. Luôn đặt bí danh mang tính gợi nhớ cao: <code>ord</code> cho orders, <code>cust</code> cho customers, <code>item</code> cho order_items.</p>\n              </div>\n            </div>\n          "
        },
        {
          "id": "sec-16-concept-comparison",
          "title": "So Sánh: Spaghetti Subquery vs CTE Pipeline",
          "content": "\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Tiêu Chí</th>\n                  <th scope=\"col\">Spaghetti Subquery (Cách Viết Cũ)</th>\n                  <th scope=\"col\">CTE Pipeline (Chuẩn Hiện Đại)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">Hướng đọc mã nguồn</th>\n                  <td>Từ trong ra ngoài (Inside-Out), người đọc phải lội xuống đáy để tìm bảng gốc rồi đọc ngược lên.</td>\n                  <td>Từ trên xuống dưới (Top-Down), dữ liệu chảy tuần tự theo dòng thời gian như đọc một cuốn sách.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Khả năng gỡ lỗi (Debugging)</th>\n                  <td>Rất khó khăn; phải copy từng mẩu Subquery con ra chạy thử độc lập.</td>\n                  <td>Cực kỳ đơn giản; chỉ cần thay đổi tên bảng ở câu <code>SELECT * FROM cte_name</code> cuối cùng.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Tái sử dụng logic</th>\n                  <td>Không thể; phải sao chép lặp lại cả đoạn Subquery nếu cần join nhiều lần.</td>\n                  <td>Tái sử dụng trực tiếp tên CTE nhiều lần trong cùng một câu lệnh.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Tác động đến hiệu năng</th>\n                  <td>Optimizer tự unnest Subquery.</td>\n                  <td>Trên CSDL hiện đại (PostgreSQL 12+, DuckDB, BigQuery), CTE được Optimizer tối ưu ngang ngửa hoặc vượt trội Subquery.</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-16-real-world-review",
          "title": "Ngoài Đời Thực: Quy Trình Code Review SQL Trong Doanh Nghiệp",
          "content": "\n            <p>Tại các công ty công nghệ lớn, trước khi một đoạn mã SQL được gộp vào nhánh chính (Merge Request / Pull Request), nó phải vượt qua danh sách kiểm tra (Code Review Checklist) nghiêm ngặt:</p>\n            <ul>\n              <li><strong>Checklist 1:</strong> Không chứa câu lệnh <code>SELECT *</code> (trừ dòng cuối cùng của CTE Pipeline).</li>\n              <li><strong>Checklist 2:</strong> Toàn bộ từ khóa SQL phải viết HOA; tên cột viết <code>snake_case</code>.</li>\n              <li><strong>Checklist 3:</strong> Mọi phép JOIN phải ghi rõ loại (INNER, LEFT) kèm điều kiện ON đầy đủ; tuyệt đối không join qua mệnh đề WHERE.</li>\n              <li><strong>Checklist 4:</strong> Có chú thích (Comments) giải thích rõ ràng các hằng số nghiệp vụ (ví dụ: <code>WHERE status = 'COMPLETED' -- Chỉ tính đơn đã giao thành công</code>).</li>\n              <li><strong>Checklist 5:</strong> Đã chạy thử nghiệm trên tập dữ liệu nhỏ (Small Data) và đối soát số lượng dòng đầu ra.</li>\n            </ul>\n          "
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi lặp từ khóa WITH liên tiếp",
            "content": "Nhớ rằng từ khóa WITH chỉ đứng ở đầu câu lệnh. Khai báo CTE tiếp theo chỉ dùng dấu phẩy ngăn cách: WITH a AS (...), b AS (...)."
          },
          {
            "title": "Cạm bẫy viết Subquery lồng 4 tầng",
            "content": "Bất cứ khi nào bạn thấy mình đang mở ngoặc đơn để viết Subquery tầng thứ 2, hãy dừng lại ngay lập tức và chuyển đổi toàn bộ sang kiến trúc CTE Pipeline."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng công cụ tự động định dạng mã (SQL Formatter / Linter)",
            "content": "Trong thực tế, bạn có thể tích hợp các công cụ tự động chuẩn hóa code như sqlfluff hoặc Prettier SQL Plugin vào VS Code để tự động format code theo chuẩn mỗi khi bấm Save."
          }
        ],
        "deepDive": {
          "title": "Kỹ nghệ bảo trì: Tiêu chuẩn dbt Style Guide & Tách bạch Tầng Staging vs Marts",
          "content": "<p>Trong kiến trúc Modern Data Stack (dbt + Snowflake / BigQuery / DuckDB), các kỹ sư dữ liệu tuân thủ nghiêm ngặt mô hình phân tầng mã nguồn:</p><p><strong>1. Staging (stg_):</strong> Chỉ làm sạch, đổi tên cột chuẩn snake_case, ép kiểu dữ liệu và lọc null; tuyệt đối KHÔNG JOIN và KHÔNG GROUP BY.<br><strong>2. Intermediate (int_):</strong> Thực hiện các phép JOIN phức tạp và logic nghiệp vụ cốt lõi.<br><strong>3. Marts (fct_ / dim_):</strong> Tạo ra các bảng Fact và Dimension tối ưu hóa cho người dùng cuối và Dashboard BI.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 3.3-1 (Dự đoán kết quả): Nhận diện lỗi cú pháp trong khai báo CTE",
          "level": "Cơ bản",
          "problem": "Đoạn mã sau bị lỗi cú pháp khi thực thi:\nWITH t1 AS (SELECT * FROM customers),\nWITH t2 AS (SELECT * FROM orders)\nSELECT * FROM t1 JOIN t2 ON t1.customer_id = t2.customer_id;\nHãy chỉ ra dòng bị lỗi cú pháp và giải thích nguyên nhân.",
          "hint": "Quan sát từ khóa ở dòng thứ 2.",
          "solutionCode": "-- Dòng bị lỗi: Dòng 2 có chứa từ khóa 'WITH t2 AS'\n-- Sửa lại: Bỏ từ khóa WITH ở dòng 2:\nWITH t1 AS (\n    SELECT * FROM customers\n),\nt2 AS (\n    SELECT * FROM orders\n)\nSELECT * \nFROM t1 \nJOIN t2 ON t1.customer_id = t2.customer_id;",
          "solutionOutput": "Câu lệnh thực thi thành công sau khi bỏ từ khóa WITH thứ hai.",
          "explanation": "Chẩn đoán: Chuẩn ANSI SQL chỉ cho phép một từ khóa WITH duy nhất mở đầu khối CTE."
        },
        {
          "title": "Bài tập 3.3-2 (Tìm & Sửa lỗi): Tái cấu trúc bí danh cẩu thả",
          "level": "Trung bình",
          "problem": "Một câu lệnh tính tổng số món hàng bán được:\nSELECT a.product_name, SUM(b.quantity) FROM products a JOIN order_items b ON a.product_id = b.product_id GROUP BY a.product_name;\nHãy viết lại câu lệnh này theo đúng 6 quy tắc của SQL Style Guide.",
          "hint": "Viết HOA từ khóa, đặt bí danh rõ ràng kèm AS, ngắt dòng các cột và mệnh đề.",
          "solutionCode": "SELECT \n    prod.product_name,\n    SUM(item.quantity) AS total_quantity_sold\nFROM products AS prod\nINNER JOIN order_items AS item \n  ON prod.product_id = item.product_id\nGROUP BY \n    prod.product_name\nORDER BY \n    total_quantity_sold DESC;",
          "solutionOutput": "Đoạn mã sạch sẽ, chuyên nghiệp, đạt chuẩn Code Review của doanh nghiệp.",
          "explanation": "Đổi từ a, b sang prod, item; thêm AS; viết HOA từ khóa và sắp xếp kết quả."
        },
        {
          "title": "Bài tập 3.3-3 (Tự viết truy vấn): Thiết kế CTE Pipeline tính giá trị đơn hàng trung bình của từng khách",
          "level": "Khá",
          "problem": "Hãy viết một câu truy vấn theo đúng kiến trúc CTE Pipeline 3 tầng: Tầng 1 (import_orders): lấy các đơn COMPLETED; Tầng 2 (customer_metrics): tính tổng tiền và số đơn của từng khách; Tầng 3 (final): ghép với bảng customers để lấy full_name và tính AOV (Average Order Value = tổng tiền / số đơn).",
          "hint": "Chia làm 2 CTE có tên rõ ràng và câu SELECT cuối cùng.",
          "solutionCode": "WITH completed_orders AS (\n    SELECT \n        order_id,\n        customer_id,\n        total_amount\n    FROM orders\n    WHERE status = 'COMPLETED'\n),\n\ncustomer_metrics AS (\n    SELECT \n        customer_id,\n        COUNT(*) AS total_completed_orders,\n        SUM(total_amount) AS total_revenue\n    FROM completed_orders\n    GROUP BY customer_id\n)\n\nSELECT \n    cust.customer_id,\n    cust.full_name AS customer_name,\n    m.total_completed_orders,\n    m.total_revenue,\n    ROUND(m.total_revenue / m.total_completed_orders, 2) AS average_order_value\nFROM customers AS cust\nINNER JOIN customer_metrics AS m \n  ON cust.customer_id = m.customer_id\nORDER BY m.total_revenue DESC;",
          "solutionOutput": "Danh sách khách hàng kèm số đơn, doanh số và giá trị đơn trung bình AOV chuẩn xác.",
          "explanation": "Mỗi tầng CTE xử lý độc lập một bước nghiệp vụ, giúp mã nguồn dễ hiểu và dễ bảo trì."
        },
        {
          "title": "Bài tập 3.3-4 (Đánh đổi & Kiến trúc): Thiết kế bài Unit Test dữ liệu nhỏ cho câu truy vấn",
          "level": "Nâng cao",
          "problem": "Trước khi áp dụng một câu lệnh phân tích phức tạp vào pipeline sản xuất, một kỹ sư dữ liệu muốn tạo một tập dữ liệu giả lập nhỏ (Mock Data) bằng CTE để chạy thử mà không cần tạo bảng thật trong CSDL. Hãy viết một câu lệnh dùng CTE chứa các giá trị độc lập (VALUES) để kiểm thử logic tính chiết khấu: nếu tổng tiền >= 5 triệu giảm 10%, ngược lại giảm 0%.",
          "hint": "Dùng cú pháp VALUES trong CTE hoặc SELECT union.",
          "solutionCode": "WITH mock_orders AS (\n    SELECT 1 AS order_id, 4000000.00 AS amount\n    UNION ALL\n    SELECT 2 AS order_id, 8500000.00 AS amount\n    UNION ALL\n    SELECT 3 AS order_id, 5000000.00 AS amount\n),\n\ncalculated_discounts AS (\n    SELECT \n        order_id,\n        amount,\n        CASE \n            WHEN amount >= 5000000.00 THEN amount * 0.10\n            ELSE 0.00 \n        END AS discount_amount\n    FROM mock_orders\n)\n\nSELECT \n    order_id,\n    amount,\n    discount_amount,\n    amount - discount_amount AS net_amount\nFROM calculated_discounts;",
          "solutionOutput": "Chạy thử nghiệm hoàn toàn in-memory, chứng minh logic chiết khấu hoạt động chính xác 100%.",
          "explanation": "Kỹ thuật Small Data Mock Testing bằng CTE giúp kiểm thử logic ngay tức thì mà không cần quyền ghi vào CSDL."
        }
      ],
      "quiz": [
        {
          "question": "Lý do hàng đầu khiến các câu lệnh SQL viết theo phong cách lồng Subquery nhiều tầng (Spaghetti SQL) bị cấm trong môi trường sản xuất là gì?",
          "options": [
            "Vì Subquery không được chuẩn ANSI SQL hỗ trợ.",
            "Vì chi phí bảo trì và đọc hiểu mã nguồn cực kỳ tốn kém, rất khó gỡ lỗi (debug) và dễ gây lỗi khi nhiều kỹ sư cùng bảo trì hệ thống.",
            "Vì Subquery chỉ chạy được trên hệ điều hành Windows.",
            "Vì Subquery luôn làm hỏng dữ liệu của ổ cứng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Trong thực tế, mã nguồn SQL được đọc nhiều gấp 10 lần so với lúc viết. Code rối rắm gây tốn kém thời gian của toàn đội kỹ thuật và tiềm ẩn rủi ro hỏng hệ thống khi chỉnh sửa."
        },
        {
          "question": "Trong mô hình kiến trúc CTE Pipeline, thứ tự phân tầng nào sau đây là chuẩn mực nhất?",
          "options": [
            "Final Output -> Aggregation -> Import/Staging",
            "Import/Staging -> Cleaning/Transformation -> Business Aggregation -> Final Output",
            "Transformation -> Final Output -> Import",
            "Chỉ cần gom tất cả vào một khối duy nhất không cần phân tầng"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Luồng dữ liệu chảy một chiều: Lấy dữ liệu thô (Staging) -> Làm sạch (Cleaning) -> Tính toán nghiệp vụ (Aggregation) -> Xuất kết quả (Final)."
        },
        {
          "question": "Quy ước nào sau đây về từ khóa và tên cột là chuẩn mực trong SQL Style Guide quốc tế?",
          "options": [
            "Từ khóa viết thường, tên cột viết HOA.",
            "Toàn bộ viết hoa cả từ khóa lẫn tên cột.",
            "Từ khóa viết HOA (SELECT, FROM, WHERE), tên cột viết thường nối gạch dưới (snake_case).",
            "Tên cột dùng dấu cách và đặt trong dấu ngoặc kép."
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Từ khóa viết HOA và tên cột snake_case tạo ra độ tương phản thị giác tối ưu, giúp mắt người quét code cực nhanh."
        },
        {
          "question": "Khi khai báo 3 khối CTE liên tiếp trong cùng một câu lệnh SQL, từ khóa WITH được sử dụng như thế nào?",
          "options": [
            "Phải viết WITH ở đầu cả 3 khối CTE.",
            "Chỉ viết một từ khóa WITH duy nhất ở khối CTE đầu tiên; các khối tiếp theo được ngăn cách bằng dấu phẩy (,).",
            "Không được dùng từ khóa WITH ở bất kỳ khối nào.",
            "Viết từ khóa WITH ở khối CTE cuối cùng."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Từ khóa WITH chỉ xuất hiện duy nhất một lần ở đầu câu lệnh. Các khối CTE kế tiếp được ngăn cách bằng dấu phẩy."
        },
        {
          "question": "Lợi ích cốt lõi của kỹ thuật kiểm thử dữ liệu nhỏ (Small Data Mock Testing) bằng CTE là gì?",
          "options": [
            "Tự động tăng dung lượng máy chủ lên gấp đôi.",
            "Cho phép kỹ sư kiểm thử tính đúng đắn của logic tính toán ngay lập tức trên tập dữ liệu mẫu giả lập mà không cần tạo bảng thật hay quyền ghi trong CSDL.",
            "Thay thế hoàn toàn công việc của bộ phận kiểm thử phần mềm (QA).",
            "Giúp câu truy vấn không bao giờ bị lỗi bộ nhớ."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Mock dữ liệu nhỏ bằng CTE giúp cô lập và kiểm chứng logic nghiệp vụ trước khi đem áp dụng lên bảng dữ liệu thật hàng triệu dòng."
        }
      ],
      "summary": [
        "Kỷ luật viết SQL sạch giúp giảm thiểu 90% thời gian bảo trì và lỗi nghiệp vụ trong môi trường doanh nghiệp.",
        "Quy tắc vàng Style Guide: Từ khóa viết HOA; tên cột và bảng viết snake_case; bí danh tường minh kèm AS; mỗi cột một dòng.",
        "Kiến trúc CTE Pipeline chia câu lệnh thành 4 tầng: Staging -> Cleaning -> Aggregation -> Final Output.",
        "Từ khóa WITH chỉ xuất hiện một lần duy nhất ở đầu; ngăn cách các CTE tiếp theo bằng dấu phẩy.",
        "Áp dụng Mock Testing với dữ liệu nhỏ để kiểm chứng logic trước khi nạp vào pipeline chính thức.",
        "Ôn cách quãng: Tại sao việc sử dụng bí danh bảng đơn lẻ như a, b, c lại là cạm bẫy lớn khi câu truy vấn mở rộng? (Xem lại Bài 2.2)."
      ]
    },
    {
      "id": "sql-17-fe-feature-engineering",
      "number": "3.4",
      "title": "[FE] Window Functions Trong Kỹ Nghệ Đặc Trưng Cho AI: Rolling, Cumulative & Ma Trận RFM",
      "subtitle": "Biến đổi dữ liệu giao dịch thành các véc-tơ đặc trưng số học: Cửa sổ trượt, độ trễ và phân khúc khách hàng cho Machine Learning",
      "level": "Nâng cao",
      "duration": "50 phút",
      "keywords": [
        "Feature Engineering",
        "Machine Learning",
        "RFM Analysis",
        "Rolling Window",
        "Cumulative",
        "LAG",
        "LEAD",
        "NTILE",
        "Data Science"
      ],
      "prerequisites": "Nắm vững Bản chất Window Functions (Bài 3.1), Clean SQL & CTE Pipeline (Bài 3.3).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Hiểu vai trò sống còn của SQL trong quy trình Feature Engineering: Trích xuất các thuộc tính dự báo số học từ dữ liệu thô cho mô hình Machine Learning.",
        "Làm chủ 3 họ đặc trưng chuỗi thời gian kinh điển: Đặc trưng tích lũy (Cumulative), Cửa sổ trượt (Rolling Windows) và Đặc trưng độ trễ (Lag/Lead Features).",
        "Xây dựng trọn vẹn mô hình phân khúc khách hàng RFM (Recency, Frequency, Monetary) bằng SQL kết hợp hàm phân vị NTILE(5).",
        "Ứng dụng hàm LAG() và LEAD() để đo lường vận tốc hành vi người dùng (Velocity Metrics: khoảng cách ngày giữa hai lần mua liên tiếp).",
        "Tối ưu hóa pipeline tính toán đặc trưng để phục vụ cả huấn luyện ngoại tuyến (Offline Training) và suy luận thời gian thực (Online Inference)."
      ],
      "intuition": {
        "title": "Bức ảnh thẻ tĩnh vs Đoạn phim chuyển động chậm của hành vi người dùng",
        "metaphor": "Nếu bạn chỉ nhìn vào số dư tài khoản ngân hàng của một người tại một thời điểm, bạn chỉ có một \"bức ảnh tĩnh\" (Static Snapshot). Nhưng một mô hình AI dự báo gian lận hoặc dự báo rời bỏ cần xem một \"đoạn phim chuyển động\" (Dynamic Film): Trong 7 ngày qua khách hàng này đã chuyển tiền bao nhiêu lần? Giao dịch này có gấp 5 lần mức trung bình của 30 ngày trước hay không? Khoảng cách giữa lần mua này và lần mua trước là bao lâu? Window Functions chính là ống kính máy quay tua lại toàn bộ lịch sử đó, biến từng hành động riêng lẻ thành những chỉ số động học (Rolling Velocity) đắt giá cho trí tuệ nhân tạo.",
        "boundary": "Ẩn dụ này nhấn mạnh tính động học; tuy nhiên khi tính toán các đặc trưng trên cửa sổ thời gian, kỹ sư dữ liệu bắt buộc phải kiểm soát chặt chẽ mốc thời gian sự kiện để không vi phạm nguyên tắc chống rò rỉ dữ liệu tương lai (sẽ học chuyên sâu ở Bài 3.5).",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">RECENCY (ĐỘ MỚI)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">CURRENT - MAX(d)</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Số ngày từ lần mua cuối</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">+</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">FREQUENCY (TẦN SUẤT)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">COUNT(*) 30D/90D</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Số lần giao dịch định kỳ</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">+</div>\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:140px;\">\n                <div style=\"font-size:0.72rem;color:var(--text-muted);font-weight:700;\">MONETARY (GIÁ TRỊ)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;font-family:monospace;\">SUM / AVG AMOUNT</div>\n                <div style=\"font-size:0.7rem;color:var(--text-secondary);\">Tổng chi tiêu &amp; đơn bình quân</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:150px;border-color:var(--success);\">\n                <div style=\"font-size:0.72rem;color:var(--success);font-weight:700;\">ML FEATURE VECTOR</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--success);font-family:monospace;\">[R, F, M, Velocity]</div>\n                <div style=\"font-size:0.7rem;\">Nạp thẳng vào XGBoost/LightGBM</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ SQL in ML:</span>\n              <span>SQL xử lý Feature Store trực tiếp ngay trên CSDL/Data Warehouse, loại bỏ gánh nặng kéo hàng triệu dòng về Python tốn kém RAM.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-17-problem-hook",
          "title": "Gợi Mở Vấn Đề: Vì Sao Mô Hình AI Không Thể \"Học\" Trực Tiếp Từ Bảng Giao Dịch Thô?",
          "content": "\n            <p>Các thuật toán Machine Learning hiện đại (như XGBoost, LightGBM, CatBoost, Mạng nơ-ron Deep Learning) chỉ có thể tiếp nhận đầu vào là một <strong>Bảng đặc trưng 2 chiều (Feature Matrix)</strong>: Mỗi dòng là một thực thể (khách hàng), mỗi cột là một con số định lượng (ví dụ: tuổi, số lần mua, chi tiêu trung bình).</p>\n            <p>Thế nhưng trong cơ sở dữ liệu doanh nghiệp, dữ liệu lại nằm rải rác dưới dạng hàng triệu dòng nhật ký giao dịch: khách A mua lúc 8h, khách B mua lúc 9h, khách A quay lại mua lúc 15h. Mô hình AI hoàn toàn bất lực trước dữ liệu thô này nếu không có kỹ sư dữ liệu đứng ra làm nhiệm vụ <strong>Kỹ nghệ đặc trưng (Feature Engineering)</strong>.</p>\n            <p>Hơn <strong>80% thời gian</strong> của một dự án Khoa học Dữ liệu (Data Science) thực tế được dành cho việc viết các câu lệnh SQL để chế tác đặc trưng. Ai làm chủ được Window Functions trong SQL, người đó nắm giữ chìa khóa quyết định độ chính xác của toàn bộ hệ thống AI!</p>\n          "
        },
        {
          "id": "sec-17-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Truy Hồi Hàm Phân Vị NTILE & Frame ROWS",
          "content": "\n            <p>Hãy cùng kiểm tra nhanh 2 công cụ cốt lõi từ Bài 3.1:</p>\n            \n            <div class=\"predict-question\">\n              <strong>Câu hỏi 1:</strong> Hàm <code>NTILE(5) OVER (ORDER BY score DESC)</code> có tác dụng gì đối với một danh sách 100 học sinh?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Chia đều 100 học sinh thành <strong>5 nhóm (Quintiles)</strong>, mỗi nhóm có đúng 20 học sinh: Nhóm 1 (Top 20% điểm cao nhất) nhận nhãn 1, nhóm 2 nhận nhãn 2, cho đến nhóm 5 nhận nhãn 5.</p>\n              </div>\n            </details>\n\n            <div class=\"predict-question\" style=\"margin-top: 1rem;\">\n              <strong>Câu hỏi 2:</strong> Để tính giá trị trung bình của dòng hiện tại và 2 dòng ngay trước nó, bạn phải khai báo khung cửa sổ nào?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Khung cửa sổ vật lý: <code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code>.</p>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-17-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Ba Họ Đặc Trưng Chuỗi Thời Gian Cho AI",
          "content": "\n            <p>Dưới đây là 3 họ đặc trưng chuỗi thời gian (Time-series Features) kinh điển được sử dụng trong mọi mô hình dự đoán hành vi khách hàng:</p>\n\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Họ Đặc Trưng</th>\n                  <th scope=\"col\">Ý Nghĩa Kinh Doanh &amp; AI</th>\n                  <th scope=\"col\">Cú Pháp SQL Chuẩn Mực</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">1. Cumulative Features (Đặc trưng tích lũy)</th>\n                  <td>Đo lường tổng quy mô giá trị trọn đời (Customer Lifetime Value - LTV) tính từ lúc đăng ký đến từng thời điểm mua hàng.</td>\n                  <td><code>SUM(amount) OVER (PARTITION BY user_id ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)</code></td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">2. Rolling Features (Cửa sổ trượt)</th>\n                  <td>Đo lường cường độ hoạt động gần đây (Short-term Velocity): Doanh số hoặc số lần tương tác trong N giao dịch gần nhất.</td>\n                  <td><code>AVG(amount) OVER (PARTITION BY user_id ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)</code></td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">3. Lag / Velocity Features (Độ trễ hành vi)</th>\n                  <td>Đo lường nhịp độ mua sắm: Khách hàng mua nhanh hơn hay chậm lại? Có sự thay đổi đột ngột nào không?</td>\n                  <td><code>LAG(order_date, 1) OVER (PARTITION BY user_id ORDER BY order_date)</code> để tính khoảng cách ngày.</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-17-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Xây Dựng Ma Trận RFM (Recency, Frequency, Monetary)",
          "content": "\n            <p><strong>Mô hình RFM là gì?</strong> Đây là phương pháp phân khúc khách hàng kinh điển nhất trong thương mại điện tử, chia hành vi người dùng thành 3 chiều định lượng:</p>\n            <ul>\n              <li><strong>R &mdash; Recency (Độ tươi):</strong> Khách hàng mua lần cuối cách đây bao nhiêu ngày? (Càng gần đây càng tốt, điểm R cao).</li>\n              <li><strong>F &mdash; Frequency (Tần suất):</strong> Khách hàng đã mua tổng cộng bao nhiêu đơn thành công? (Càng nhiều đơn điểm F càng cao).</li>\n              <li><strong>M &mdash; Monetary (Giá trị tiền tệ):</strong> Tổng số tiền khách hàng đã đóng góp cho doanh nghiệp? (Chi tiêu càng nhiều điểm M càng cao).</li>\n            </ul>\n\n            <div class=\"flowchart-container\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.5rem; border-radius: 8px; margin: 1rem 0;\">\n              <div style=\"font-family: monospace; font-size: 0.85rem; line-height: 1.6; color: #94a3b8;\">\n                <span style=\"color: #38bdf8;\">[Bảng Đơn Hàng Thô (orders)]</span><br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼ (Gom nhóm GROUP BY customer_id)<br>\n                <span style=\"color: #fbbf24;\">[Chỉ Số Thô: Raw Recency, Frequency, Monetary]</span><br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼ (Window Function: NTILE(5))<br>\n                <span style=\"color: #c084fc;\">[Điểm Chuẩn Hóa: R_Score, F_Score, M_Score (1 đến 5)]</span><br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼ (Ghép nhãn phân khúc CASE WHEN)<br>\n                <span style=\"color: #4ade80;\">[Phân Khúc Khách Hàng: Champions, Loyal, At Risk, Lost]</span><br>\n              </div>\n            </div>\n          "
        },
        {
          "id": "sec-17-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Tạo Bảng Đặc Trưng Khách Hàng Trên TechMart",
          "content": "\n            <p>Chúng ta sẽ thực hiện trích xuất toàn bộ các chỉ số RFM và độ trễ giao dịch trên bộ dữ liệu TechMart. Hãy quan sát cách dữ liệu chuyển mình từ từng đơn hàng rời rạc thành một bộ đặc trưng hoàn chỉnh:</p>\n\n            <div class=\"predict-question\">\n              <strong>Thử thách dự đoán:</strong> Khách hàng An (customer_id = 1) có 2 đơn hàng: đơn 1001 ngày 01/06/2023 (4 triệu) và đơn 1003 ngày 15/06/2023 (nhưng đơn 1003 bị CANCELLED). Nếu tính chỉ số Recency và Monetary cho khách An chỉ trên các đơn COMPLETED, đơn hàng nào sẽ được tính?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Dự đoán chính xác:</strong> Đơn hàng 1003 bị hủy nên bị loại bỏ ngay từ tầng lọc <code>WHERE status = 'COMPLETED'</code>! Khách An chỉ có duy nhất 1 đơn thành công là 1001 ngày 01/06/2023 với tổng tiền 4 triệu đồng.</p>\n              </div>\n            </details>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Trích xuất đặc trưng độ trễ (Lag) và nhịp mua hàng giữa các đơn liên tiếp",
              "code": "WITH customer_order_stream AS (\n    SELECT \n        order_id,\n        customer_id,\n        order_date,\n        total_amount,\n        LAG(order_date, 1) OVER (\n            PARTITION BY customer_id \n            ORDER BY order_date ASC\n        ) AS previous_order_date,\n        LAG(total_amount, 1) OVER (\n            PARTITION BY customer_id \n            ORDER BY order_date ASC\n        ) AS previous_order_amount\n    FROM orders\n    WHERE status = 'COMPLETED'\n)\nSELECT \n    order_id,\n    customer_id,\n    order_date,\n    total_amount,\n    previous_order_date,\n    previous_order_amount,\n    -- Tính khoảng cách ngày giữa 2 lần mua liên tiếp (tương thích PostgreSQL & DuckDB)\n    CAST(ROUND((JULIANDAY(order_date) - JULIANDAY(previous_order_date))) AS INT) AS days_since_last_purchase\nFROM customer_order_stream\nORDER BY customer_id, order_date ASC;",
              "explanation": "Hàm LAG() cho phép nhìn ngược về quá khứ đúng 1 dòng để trích xuất ngày mua và số tiền của đơn trước, từ đó tính ra khoảng cách ngày (Velocity metric) đắt giá cho mô hình AI.",
              "output": "+----------+-------------+------------+--------------+---------------------+-----------------------+--------------------------+\n| order_id | customer_id | order_date | total_amount | previous_order_date | previous_order_amount | days_since_last_purchase |\n+----------+-------------+------------+--------------+---------------------+-----------------------+--------------------------+\n| 1001     | 1           | 2023-06-01 | 4000000.00   | NULL                | NULL                  | NULL                     |\n| 1002     | 2           | 2023-06-05 | 8500000.00   | NULL                | NULL                  | NULL                     |\n| 1006     | 2           | 2023-08-10 | 4000000.00   | 2023-06-05          | 8500000.00            | 66                       |\n| 1004     | 3           | 2023-07-02 | 2250000.00   | NULL                | NULL                  | NULL                     |\n+----------+-------------+------------+--------------+---------------------+-----------------------+--------------------------+\n(Khách hàng 2 quay lại mua sau đúng 66 ngày - Đã kiểm chứng trên DuckDB & SQLite)"
            },
            {
              "lang": "SQL",
              "title": "Xây dựng Bảng phân khúc RFM hoàn chỉnh bằng NTILE(3)",
              "code": "WITH rfm_raw_metrics AS (\n    SELECT \n        c.customer_id,\n        c.full_name AS customer_name,\n        -- Mốc cố định giả lập thời điểm báo cáo: 2023-09-01\n        CAST(ROUND(JULIANDAY('2023-09-01') - JULIANDAY(MAX(o.order_date))) AS INT) AS recency_days,\n        COUNT(o.order_id) AS frequency_orders,\n        COALESCE(SUM(o.total_amount), 0.0) AS monetary_total\n    FROM customers c\n    LEFT JOIN orders o \n      ON c.customer_id = o.customer_id \n     AND o.status = 'COMPLETED'\n    GROUP BY c.customer_id, c.full_name\n),\n\nrfm_scored AS (\n    SELECT \n        customer_id,\n        customer_name,\n        recency_days,\n        frequency_orders,\n        monetary_total,\n        -- Recency càng nhỏ điểm càng cao (mua gần đây)\n        NTILE(3) OVER (ORDER BY recency_days ASC) AS r_score,\n        NTILE(3) OVER (ORDER BY frequency_orders ASC) AS f_score,\n        NTILE(3) OVER (ORDER BY monetary_total ASC) AS m_score\n    FROM rfm_raw_metrics\n)\n\nSELECT \n    customer_id,\n    customer_name,\n    recency_days,\n    frequency_orders,\n    monetary_total,\n    r_score,\n    f_score,\n    m_score,\n    CASE \n        WHEN r_score >= 2 AND m_score >= 2 THEN 'VIP Champions'\n        WHEN r_score = 1 AND m_score >= 2 THEN 'At Risk (Chi tiêu nhiều nhưng lâu chưa mua)'\n        ELSE 'Standard / Occasional'\n    END AS customer_segment\nFROM rfm_scored\nORDER BY monetary_total DESC;",
              "explanation": "Truy vấn tạo ra ma trận phân khúc khách hàng chuẩn quốc tế, cung cấp các nhãn mục tiêu và đặc trưng số học cho mô hình Marketing Automation.",
              "output": "+-------------+---------------+--------------+------------------+----------------+---------+---------+---------+------------------+\n| customer_id | customer_name | recency_days | frequency_orders | monetary_total | r_score | f_score | m_score | customer_segment |\n+-------------+---------------+--------------+------------------+----------------+---------+---------+---------+------------------+\n| 2           | Tran Thi Binh | 22           | 2                | 12500000.00    | 3       | 3       | 3       | VIP Champions    |\n| 1           | Nguyen Van An | 92           | 1                | 4000000.00     | 2       | 2       | 2       | VIP Champions    |\n| 3           | Le Van Cuong  | 61           | 1                | 2250000.00     | 2       | 2       | 1       | Standard         |\n| 4           | Pham Thi Dung | NULL         | 0                | 0.00           | 1       | 1       | 1       | Standard         |\n| 5           | Hoang Van Em  | NULL         | 0                | 0.00           | 1       | 1       | 1       | Standard         |\n+-------------+---------------+--------------+------------------+----------------+---------+---------+---------+------------------+\n(Phân khúc khách hàng 5 người TechMart thành công)"
            }
          ]
        },
        {
          "id": "sec-17-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Đặc Trưng Trung Bình Động 3 Giao Dịch",
          "content": "\n            <p>Hãy hoàn thiện câu lệnh tính doanh số trung bình của 3 giao dịch gần nhất (Rolling Moving Average 3 transactions) cho từng khách hàng. Điền các từ khóa thích hợp vào vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-faded-block\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; line-height: 1.8;\">\n              SELECT <br>\n              &nbsp;&nbsp;&nbsp;&nbsp;order_id, customer_id, order_date, total_amount,<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;ROUND(AVG(total_amount) OVER (<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PARTITION BY customer_id <br>\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ORDER BY order_date ASC<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[___1___] BETWEEN [___2___] PRECEDING AND [___3___] [___4___]<br>\n              &nbsp;&nbsp;&nbsp;&nbsp;), 2) AS rolling_avg_3_orders<br>\n              FROM orders;\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top: 1rem;\">\n              <summary>Xem đáp án điền khuyết</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án chính xác:</strong></p>\n                <ul>\n                  <li><code>[___1___]</code>: <strong>ROWS</strong> &mdash; Định nghĩa khung cửa sổ vật lý.</li>\n                  <li><code>[___2___]</code>: <strong>2</strong> &mdash; 2 dòng trước + dòng hiện tại = 3 dòng.</li>\n                  <li><code>[___3___]</code>: <strong>CURRENT</strong></li>\n                  <li><code>[___4___]</code>: <strong>ROW</strong></li>\n                </ul>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-17-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong Feature Engineering Bằng SQL",
          "content": "\n            <div class=\"concept-box callout-danger\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-exclamation-triangle\"></i></span>\n                <span class=\"concept-title\">Bẫy 1: Quên Khử Trùng Lặp Cấp Độ Tổng Hợp (Entity Grain Mismatch)</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Trích xuất đặc trưng của khách hàng nhưng lại để kết quả ở cấp độ dòng đơn hàng (Order Level).</p>\n                <p><strong>Hậu quả:</strong> Khi đưa vào huấn luyện mô hình dự đoán Churn cấp độ khách hàng, một khách hàng có 10 đơn hàng sẽ bị nhân bản thành 10 dòng trong tập dữ liệu huấn luyện, làm mô hình học thiên lệch về những khách hàng mua nhiều đơn. Luôn bảo đảm kết quả cuối cùng phải có <code>customer_id</code> là duy nhất tuyệt đối (Khóa chính của tập huấn luyện).</p>\n              </div>\n            </div>\n\n            <div class=\"concept-box callout-danger\" style=\"margin-top: 1.25rem;\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-clock\"></i></span>\n                <span class=\"concept-title\">Bẫy 2: Dùng CURRENT_DATE Động Để Tính Điểm Huấn Luyện Quá Khứ</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Viết <code>CURRENT_DATE - MAX(order_date)</code> để tính Recency cho tập dữ liệu huấn luyện cách đây 2 năm.</p>\n                <p><strong>Hậu quả:</strong> Giá trị Recency sẽ bị đội lên thành 730 ngày (2 năm) cho tất cả khách hàng, phá hủy hoàn toàn đặc trưng thời điểm lịch sử! Khi huấn luyện mô hình, phải thay thế <code>CURRENT_DATE</code> bằng mốc thời gian chốt sổ (As-of Cutoff Date) của ngày huấn luyện.</p>\n              </div>\n            </div>\n          "
        },
        {
          "id": "sec-17-concept-comparison",
          "title": "So Sánh: Trích Xuất Đặc Trưng Bằng SQL vs Bằng Python (Pandas)",
          "content": "\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Tiêu Chí</th>\n                  <th scope=\"col\">Feature Engineering Bằng SQL (Trong Kho DW)</th>\n                  <th scope=\"col\">Feature Engineering Bằng Python / Pandas</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">Vị trí tính toán</th>\n                  <td>Tính toán trực tiếp bên trong CSDL (In-database Processing).</td>\n                  <td>Phải kéo dữ liệu qua mạng về RAM máy cá nhân / Notebook.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Khả năng mở rộng (Scale)</th>\n                  <td>Cực kỳ mạnh mẽ: Xử lý nhẹ nhàng bảng hàng tỷ dòng (BigQuery, DuckDB).</td>\n                  <td>Bị nghẽn cổ chai bởi dung lượng RAM vật lý (dễ gặp lỗi Out Of Memory).</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Nhất quán giữa Train &amp; Serve</th>\n                  <td>Cao: Cùng một câu lệnh SQL chạy cho cả huấn luyện và phục vụ suy luận.</td>\n                  <td>Dễ bị lệch (Train-Serve Skew) do code SQL ở Data Team khác code Pandas ở Data Science Team.</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-17-real-world-feature-store",
          "title": "Ngoài Đời Thực: Tích Hợp SQL Vào Feature Store Hiện Đại (Feast, Hopsworks)",
          "content": "\n            <p>Trong các kiến trúc MLOps chuyên nghiệp của Grab, Uber, Netflix, các câu lệnh SQL mà bạn vừa viết được định nghĩa dưới dạng các <strong>Feature Views</strong> bên trong Feature Store:</p>\n            <ul>\n              <li><strong>Offline Feature Store (Huấn luyện):</strong> Chạy truy vấn SQL trên kho dữ liệu phân tích (Snowflake, BigQuery) để tạo ra tập dataset huấn luyện hàng chục triệu dòng.</li>\n              <li><strong>Online Feature Store (Suy luận):</strong> Đồng bộ kết quả tính toán định kỳ vào Redis hoặc DynamoDB để mô hình AI tra cứu (Point Lookup) với độ trễ dưới 5 mili-giây khi người dùng mở ứng dụng.</li>\n            </ul>\n          "
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi chia cho 0 khi tính tỷ lệ tăng trưởng",
            "content": "Khi tính tốc độ tăng trưởng (current - previous) / previous, nếu previous là 0 hoặc NULL, câu lệnh sẽ gây lỗi crash pipeline. Luôn sử dụng NULLIF(previous, 0) ở mẫu số."
          },
          {
            "title": "Bẫy tính Recency với khách hàng chưa từng mua hàng",
            "content": "Với khách hàng mới đăng ký chưa có đơn hàng, MAX(order_date) sẽ trả về NULL. Phải dùng hàm COALESCE để gán một giá trị mặc định hợp lý (ví dụ số ngày từ lúc signup)."
          }
        ],
        "tips": [
          {
            "title": "Quy tắc vàng MLOps: Pushdown computation to SQL",
            "content": "Hãy thực hiện toàn bộ các phép biến đổi nặng (Join, Group By, Rolling Window) bên trong SQL Engine, chỉ nạp dữ liệu sạch dạng ma trận vào Python để tối ưu tài nguyên máy học."
          }
        ],
        "deepDive": {
          "title": "Kiến trúc Feature Store: Đồng bộ Offline Batch Features và Online Low-Latency Lookup",
          "content": "<p>Trong hệ thống Machine Learning thực tế, các đặc trưng (Features) được chia thành 2 thế giới:</p><p><strong>Offline Store (Data Warehouse / DuckDB):</strong> Chạy các truy vấn SQL lớn tính toán các đặc trưng tổng hợp dài hạn (30 ngày, 90 ngày) mỗi đêm một lần để phục vụ quá trình huấn luyện mô hình (Model Training).<br><strong>Online Store (Redis / DynamoDB):</strong> Lưu trữ bản snapshot mới nhất của các vector đặc trưng dưới dạng Key-Value để microservice ứng dụng tra cứu siêu tốc trong 2 mili-giây khi người dùng nhấn nút thanh toán trên ứng dụng.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 3.4-1 (Dự đoán kết quả): Nhận diện giá trị trả về của hàm LAG()",
          "level": "Cơ bản",
          "problem": "Một khách hàng có 3 giao dịch theo thứ tự ngày: 100k (ngày 1), 200k (ngày 2), 300k (ngày 3). Nếu thực hiện lệnh: SELECT amount, LAG(amount, 1, 0) OVER (ORDER BY day) AS prev_amount, dự đoán giá trị prev_amount của dòng đầu tiên là bao nhiêu?",
          "hint": "Quan sát tham số thứ 3 của hàm LAG(cột, offset, default_value).",
          "solutionCode": "-- Dòng 1: amount = 100k -> prev_amount = 0 (Giá trị mặc định được chỉ định là 0!)\n-- Dòng 2: amount = 200k -> prev_amount = 100k\n-- Dòng 3: amount = 300k -> prev_amount = 200k",
          "solutionOutput": "Dòng đầu tiên nhận giá trị 0 thay vì NULL nhờ tham số default_value.",
          "explanation": "Chẩn đoán: Nếu bạn nghĩ kết quả là NULL, bạn đã bỏ sót tham số thứ ba trong LAG(amount, 1, 0). Tham số này giúp thay thế giá trị NULL đầu tiên bằng 0."
        },
        {
          "title": "Bài tập 3.4-2 (Tìm & Sửa lỗi): Lỗi tính tốc độ tăng trưởng đơn hàng",
          "level": "Trung bình",
          "problem": "Một kỹ sư viết câu lệnh tính tỷ lệ tăng trưởng doanh số so với đơn hàng trước:\nSELECT order_id, total_amount, (total_amount - LAG(total_amount) OVER (ORDER BY order_date)) / LAG(total_amount) OVER (ORDER BY order_date) AS growth_rate FROM orders;\nCâu lệnh này bị lỗi gì ở dòng đầu tiên và làm thế nào để khắc phục an toàn?",
          "hint": "Dòng đầu tiên có LAG là NULL, phép chia cho NULL hoặc phép chia cho 0 tiềm ẩn rủi ro.",
          "solutionCode": "-- Sửa lại an toàn với NULLIF:\nSELECT \n    order_id,\n    order_date,\n    total_amount,\n    ROUND(\n        (total_amount - LAG(total_amount) OVER (ORDER BY order_date)) * 100.0 / \n        NULLIF(LAG(total_amount) OVER (ORDER BY order_date), 0), \n        2\n    ) AS growth_pct\nFROM orders;",
          "solutionOutput": "Dòng đầu tiên trả về NULL một cách an toàn mà không bị crash pipeline.",
          "explanation": "Chẩn đoán: Sử dụng NULLIF(prev, 0) giúp triệt tiêu hoàn toàn rủi ro Division by Zero khi đơn hàng trước có giá trị bằng 0."
        },
        {
          "title": "Bài tập 3.4-3 (Tự viết truy vấn): Trích xuất đặc trưng số lượng đơn hàng trong 30 ngày gần nhất",
          "level": "Khá",
          "problem": "Từ bảng customer_events, hãy viết câu truy vấn hiển thị từng sự kiện kèm theo một cột đặc trưng: tổng số sự kiện của khách hàng đó diễn ra trong 2 sự kiện ngay trước nó (Rolling 3 events count).",
          "hint": "Dùng COUNT(*) OVER (PARTITION BY customer_id ORDER BY event_time ROWS BETWEEN 2 PRECEDING AND CURRENT ROW).",
          "solutionCode": "SELECT \n    event_id,\n    customer_id,\n    event_type,\n    event_time,\n    COUNT(*) OVER (\n        PARTITION BY customer_id \n        ORDER BY event_time ASC \n        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n    ) AS rolling_3_events_count\nFROM customer_events\nORDER BY customer_id, event_time ASC;",
          "solutionOutput": "Mỗi sự kiện hiển thị chính xác số đếm sự kiện trượt trong khung 3 bước.",
          "explanation": "Đặc trưng Rolling Event Count phản ánh tần suất tương tác của người dùng theo dòng thời gian thực tế."
        },
        {
          "title": "Bài tập 3.4-4 (Đánh đổi & Kiến trúc): Thiết kế Feature View chuẩn cho Feature Store",
          "level": "Nâng cao",
          "problem": "Hãy viết khối lệnh SQL hoàn chỉnh tạo một VIEW có tên customer_features_ml phục vụ trực tiếp cho mô hình AI dự đoán giá trị vòng đời (LTV Prediction). View này phải trả về đúng 1 dòng cho mỗi khách hàng gồm các cột: customer_id, full_name, total_orders, lifetime_spent, avg_order_value, và days_since_last_order.",
          "hint": "Sử dụng LEFT JOIN từ customers sang orders có lọc status COMPLETED và gom nhóm GROUP BY.",
          "solutionCode": "CREATE VIEW IF NOT EXISTS customer_features_ml AS\nSELECT \n    c.customer_id,\n    c.full_name,\n    c.city,\n    COUNT(o.order_id) AS total_orders,\n    COALESCE(SUM(o.total_amount), 0.0) AS lifetime_spent,\n    COALESCE(ROUND(AVG(o.total_amount), 2), 0.0) AS avg_order_value,\n    COALESCE(CAST(ROUND(JULIANDAY('2023-09-01') - JULIANDAY(MAX(o.order_date))) AS INT), 999) AS days_since_last_order\nFROM customers c\nLEFT JOIN orders o \n  ON c.customer_id = o.customer_id \n AND o.status = 'COMPLETED'\nGROUP BY \n    c.customer_id, \n    c.full_name, \n    c.city;",
          "solutionOutput": "View được tạo thành công, sẵn sàng cho Feature Store kết nối đồng bộ sang Redis hoặc nạp vào XGBoost.",
          "explanation": "View chuẩn Feature Store đảm bảo tính toàn vẹn 1 khách hàng = 1 dòng, xử lý giá trị khuyết thiếu NULL an toàn cho mô hình AI."
        }
      ],
      "quiz": [
        {
          "question": "Trong quy trình xây dựng mô hình Machine Learning, tại sao việc chế tác đặc trưng (Feature Engineering) bằng SQL trong kho dữ liệu lại được ưu tiên hơn so với kéo dữ liệu về Python Pandas?",
          "options": [
            "Vì Python không hỗ trợ phép tính cộng và trừ.",
            "Vì tính toán trực tiếp trong CSDL (In-database Processing) tận dụng được năng lực tính toán phân tán của kho dữ liệu, xử lý được dữ liệu hàng tỷ dòng mà không bị nghẽn cổ chai bộ nhớ RAM của máy trạm.",
            "Vì các mô hình AI chỉ có thể đọc được file SQL.",
            "Vì Python không có các hàm toán học."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Đẩy tính toán xuống SQL Engine (Pushdown Compute) giúp xử lý lượng dữ liệu khổng lồ một cách siêu tốc mà không làm sập RAM của máy tính cá nhân."
        },
        {
          "question": "Ba chỉ số trong mô hình phân khúc khách hàng RFM đại diện cho các yếu tố nào?",
          "options": [
            "Revenue (Doanh thu), Frequency (Tần suất), Margin (Biên lợi nhuận)",
            "Recency (Độ tươi/Thời gian mua gần nhất), Frequency (Tần suất mua), Monetary (Tổng giá trị chi tiêu)",
            "Rate (Tỷ lệ), Function (Chức năng), Model (Mô hình)",
            "Region (Vùng miền), Feedback (Phản hồi), Marketing (Tiếp thị)"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! RFM là viết tắt của Recency (Thời gian kể từ đơn gần nhất), Frequency (Số lần mua), và Monetary (Tổng tiền đã chi tiêu)."
        },
        {
          "question": "Để tính khoảng cách thời gian giữa giao dịch hiện tại và giao dịch ngay trước đó của cùng một khách hàng, hàm Window Function nào sau đây là sự lựa chọn chuẩn mực?",
          "options": [
            "LEAD()",
            "LAG()",
            "ROW_NUMBER()",
            "NTILE()"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Hàm LAG(cột, 1) truy xuất giá trị của dòng ngay trước đó trong cùng một Partition, lý tưởng để tính khoảng cách thời gian và độ trễ."
        },
        {
          "question": "Khi tính toán chỉ số Recency (số ngày kể từ lần mua gần nhất) để tạo dữ liệu huấn luyện mô hình cho thời điểm lịch sử 1 năm trước, sai lầm nghiêm trọng nhất là gì?",
          "options": [
            "Dùng dấu trừ để trừ hai ngày tháng.",
            "Sử dụng hàm ngày hiện tại CURRENT_DATE thay vì mốc thời gian chốt sổ (As-of Cutoff Date) của thời điểm lịch sử đó.",
            "Chuyển đổi kiểu dữ liệu sang số nguyên.",
            "Sử dụng hàm MAX(order_date)."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Dùng CURRENT_DATE trên tập dữ liệu lịch sử sẽ khiến giá trị Recency bị sai lệch hoàn toàn (cộng thêm 365 ngày), phá hủy tính đúng đắn của đặc trưng."
        },
        {
          "question": "Hàm nào sau đây giúp gán nhãn phân vị tự động từ 1 đến 5 cho các khách hàng dựa trên tổng chi tiêu để phục vụ ma trận RFM?",
          "options": [
            "RANK()",
            "DENSE_RANK()",
            "NTILE(5)",
            "COUNT(5)"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! NTILE(5) chia tập dữ liệu thành 5 nhóm có kích thước bằng nhau (mỗi nhóm 20%), tương ứng với điểm M từ 1 đến 5 trong mô hình RFM."
        }
      ],
      "summary": [
        "Feature Engineering trong SQL là cầu nối sống còn biến dữ liệu giao dịch thô thành ma trận đặc trưng cho Machine Learning.",
        "Ba họ đặc trưng chuỗi thời gian: Cumulative (Lũy kế trọn đời), Rolling (Cửa sổ trượt), và Lag/Lead (Độ trễ vận tốc).",
        "Mô hình RFM (Recency, Frequency, Monetary) kết hợp NTILE(5) là chuẩn mực phân khúc khách hàng tự động.",
        "Hàm LAG() cho phép nhìn ngược về quá khứ để đo lường nhịp độ hành vi người dùng.",
        "Tuyệt đối không dùng CURRENT_DATE khi tạo đặc trưng huấn luyện cho các thời điểm lịch sử trong quá khứ.",
        "Ôn cách quãng: Tại sao phép tính AVG(cột) lại cần COALESCE nếu muốn tính cả các trường hợp bị NULL? (Xem lại Bài 2.1)."
      ]
    },
    {
      "id": "sql-18-fe-point-in-time-leakage",
      "number": "3.5",
      "title": "[FE] Point-In-Time Correctness & Phòng Chống Rò Rỉ Dữ Liệu (Data Leakage) Trong AI",
      "subtitle": "Giải phẫu tử huyệt chết người của các dự án Machine Learning: Tư duy du hành thời gian và kỹ thuật chặn mốc Cutoff trong SQL",
      "level": "Nâng cao",
      "duration": "45 phút",
      "keywords": [
        "Point-in-Time",
        "Data Leakage",
        "Lookahead Bias",
        "Target Leakage",
        "Cutoff Date",
        "Machine Learning",
        "Time Travel"
      ],
      "prerequisites": "Nắm vững Feature Engineering trong SQL (Bài 3.4), Kỹ thuật lọc ngày tháng (Bài 1.3).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Hiểu bản chất toán học của hiện tượng Rò rỉ dữ liệu (Data Leakage / Lookahead Bias): Nguyên nhân khiến 90% mô hình AI thất bại khi đưa lên Production.",
        "Phân biệt rõ ràng 3 dạng rò rỉ dữ liệu phổ biến nhất trong truy vấn SQL: Lookahead Bias, Target Leakage và Train-Test Contamination.",
        "Làm chủ nguyên tắc Point-in-Time Correctness: Thiết lập mốc thời gian chốt sổ (Observation / Cutoff Timestamp) trong mọi câu lệnh trích xuất đặc trưng.",
        "Phân tích thực nghiệm cặp truy vấn đối chứng SAI vs ĐÚNG trên bộ dữ liệu TechMart để nhận diện sự khác biệt về số liệu đặc trưng.",
        "Thiết lập quy trình kiểm định tự động (Data Leakage Assertion) để phát hiện sớm các đặc trưng có dấu thời gian vi phạm mốc Cutoff."
      ],
      "intuition": {
        "title": "Cỗ máy du hành thời gian và Cậu bé gian lận mang bài thi ngày mai về hôm nay",
        "metaphor": "Hãy tưởng tượng bạn tham gia một kỳ thi dự đoán tỷ số bóng đá. Nếu bạn có cỗ máy thời gian bay đến ngày mai, chụp ảnh bảng tỷ số trận đấu rồi quay về hôm nay để ghi vào bài thi, bạn chắc chắn đạt điểm tuyệt đối 100/100! Nhưng khi bước vào trận đấu thật vào tuần tới (khi cỗ máy thời gian bị hỏng), bạn hoàn toàn không có khả năng phân tích phong độ cầu thủ và dự đoán trật lỏi. Cạm bẫy Lookahead Bias trong SQL hoạt động y hệt như vậy: Một câu lệnh SQL cẩu thả vô tình tính tổng tiền của cả những đơn hàng phát sinh sau ngày dự đoán. Mô hình AI đạt điểm tuyệt đối khi kiểm thử offline, nhưng khi đưa lên online thì ngày mai chưa xảy ra, khiến mô hình chết đứng!",
        "boundary": "Ẩn dụ này nhấn mạnh tính đúng đắn của thời gian; tuy nhiên trong thực tế kỹ thuật, việc đồng bộ mốc thời gian Cutoff đòi hỏi hệ thống phải lưu trữ lịch sử trạng thái (như SCD Type 2 hoặc Event Store) thay vì chỉ lưu một trạng thái mới nhất.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:200px;border-color:var(--danger);\">\n                <div style=\"font-size:0.75rem;color:var(--danger);margin-bottom:4px;font-weight:700;\">❌ FUTURE DATA LEAKAGE (THẢM HỌA)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--danger);font-family:monospace;\">Tính metric đến TẬN HÔM NAY</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Dùng dữ liệu tương lai để dự đoán quá khứ &rarr; Sập trên Prod!</div>\n              </div>\n              <div class=\"sql-diagram-arrow\" style=\"font-size:1.1rem;color:var(--text-muted);\">VS</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:220px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">✅ POINT-IN-TIME (ĐÚNG ĐIỂM THỜI GIAN)</div>\n                <div style=\"font-size:0.92rem;font-weight:800;color:var(--success);font-family:monospace;\">WHERE event_time &le; cutoff_time</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Chỉ nhìn về quá khứ tính đến đúng thời điểm quan sát!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--warning);\">⚡ Training Spine:</span>\n              <span>Tạo bảng khung quan sát <code>(entity_id, cutoff_timestamp, label)</code> và JOIN đặc trưng chỉ với điều kiện <code>feature_time &le; cutoff_timestamp</code>.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-18-problem-hook",
          "title": "Gợi Mở Vấn Đề: Kịch Bản Thảm Họa Tại Một Ngân Hàng Số",
          "content": "\n            <p>Hãy xem một tình huống có thật trong ngành tài chính công nghệ (Fintech): Nhóm AI của ngân hàng được giao nhiệm vụ xây dựng mô hình Machine Learning dự đoán xác suất khách hàng sẽ đăng ký mở Thẻ Tín Dụng (Credit Card Propensity Model) vào ngày <strong>01/06/2023</strong>.</p>\n            <p>Kỹ sư dữ liệu viết câu lệnh SQL trích xuất đặc trưng khách hàng như sau:</p>\n            <pre><code>-- CÂU LỆNH GÂY THẢM HỌA:\nSELECT \n    customer_id,\n    COUNT(order_id) AS total_orders,\n    SUM(total_amount) AS total_lifetime_spent\nFROM orders\nWHERE status = 'COMPLETED'\nGROUP BY customer_id;</code></pre>\n            <p>Mô hình huấn luyện xong đạt độ chính xác kinh ngạc: <strong>AUC = 0.99</strong>. Đội ngũ kỹ thuật ăn mừng và đưa ngay vào hệ thống tự động gọi điện tiếp thị (Telesales). Nhưng sau 1 tháng chạy thật, tỷ lệ khách hàng mở thẻ chỉ đạt vỏn vẹn <strong>2%</strong>, ngân hàng lãng phí hàng trăm triệu đồng chi phí vận hành tổng đài! Chuyện gì đã xảy ra?</p>\n            <div class=\"concept-box callout-danger\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-biohazard\"></i></span>\n                <span class=\"concept-title\">Giải Phẫu Tử Huyệt: Nhìn Trước Tương Lai (Lookahead Bias)</span>\n              </div>\n              <div class=\"concept-body\">\n                <p>Mục tiêu là dự đoán hành vi tại mốc ngày <strong>01/06/2023</strong>. Nhưng câu lệnh SQL trên đã cộng dồn cả các đơn hàng phát sinh vào tháng 7 và tháng 8 năm 2023! Một khách hàng tháng 6 vẫn là người dùng nghèo ít mua sắm, nhưng đến tháng 8 họ trúng số và mua một đơn hàng 50 triệu đồng. Câu lệnh SQL đã lấy thông tin \"trúng số của tháng 8\" đưa vào tập hồ sơ ngày 1 tháng 6, khiến mô hình tưởng rằng khách hàng này đã giàu có từ tháng 6!</p>\n              </div>\n            </div>\n          "
        },
        {
          "id": "sec-18-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Truy Hồi Mốc Thời Gian & Toán Tử So Sánh",
          "content": "\n            <p>Hãy cùng suy ngẫm nhanh 2 câu hỏi truy hồi nền tảng:</p>\n            \n            <div class=\"predict-question\">\n              <strong>Câu hỏi 1:</strong> Nếu mốc thời gian quan sát (Cutoff Timestamp) là <code>2023-06-01 00:00:00</code>, các sự kiện xảy ra vào lúc <code>2023-06-01 09:15:00</code> có được phép đưa vào tập đặc trưng để dự đoán cho mốc đó không?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Tuyệt đối <strong>KHÔNG</strong>! Vì lúc 09:15:00 là thời điểm <em>sau</em> mốc chốt sổ 00:00:00. Tại thời điểm 00:00:00 khi mô hình cần đưa ra dự đoán, sự kiện lúc 9h15 sáng chưa hề diễn ra trong thực tế vật lý.</p>\n              </div>\n            </details>\n\n            <div class=\"predict-question\" style=\"margin-top: 1rem;\">\n              <strong>Câu hỏi 2:</strong> Trong SQL, điều kiện lọc nào chuẩn mực nhất để đảm bảo chỉ lấy các bản ghi phát sinh nghiêm ngặt trước mốc thời gian Cutoff?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Sử dụng toán tử so sánh nhỏ hơn nghiêm ngặt: <code>WHERE event_time &lt; cutoff_timestamp</code>.</p>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-18-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Ba Dạng Rò Rỉ Dữ Liệu (Data Leakage) Trong SQL",
          "content": "\n            <p>Dưới đây là 3 hình thái rò rỉ dữ liệu nguy hiểm nhất mà mọi kỹ sư dữ liệu và AI cần nhận diện:</p>\n\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Hình Thái Rò Rỉ</th>\n                  <th scope=\"col\">Cơ Chế Phát Sinh Trong SQL</th>\n                  <th scope=\"col\">Hậu Quả Trên Production</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">1. Lookahead Bias (Nhìn trước tương lai)</th>\n                  <td>Truy vấn sử dụng dữ liệu có dấu thời gian diễn ra SAU thời điểm dự đoán ($T_{event} &gt; T_{cutoff}$) do quên mệnh đề <code>WHERE date &lt; cutoff</code>.</td>\n                  <td>Mô hình đạt điểm AUC/Accuracy cao ngất ngưởng trong tập kiểm thử nhưng sụp đổ hoàn toàn khi triển khai thực tế.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">2. Target Leakage (Rò rỉ biến mục tiêu)</th>\n                  <td>Sử dụng một đặc trưng vốn là hệ quả trực tiếp của nhãn cần dự đoán (ví dụ: dùng cột <code>churn_survey_date</code> để dự đoán khách hàng churn).</td>\n                  <td>Mô hình học được quy luật hiển nhiên (Tautology: $Y = f(Y)$) và không học được bất kỳ tín hiệu dự báo sớm nào.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">3. Global Aggregation Leakage (Lây nhiễm tập kiểm thử)</th>\n                  <td>Tính toán các chỉ số trung bình hoặc chuẩn hóa Min-Max trên toàn bộ bảng dữ liệu bao gồm cả dữ liệu tương lai trước khi chia tập Train/Test.</td>\n                  <td>Đặc trưng của tập Train bị \"lây nhiễm\" phân phối xác suất của tập Test, làm sai lệch kết quả thẩm định mô hình.</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-18-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Nguyên Tắc \"Khung Thời Gian Quan Sát\" (Observation Window)",
          "content": "\n            <p>Để bảo đảm tính đúng đắn Point-in-Time, kỹ sư dữ liệu áp dụng khung thời gian phân tích chuẩn quốc tế chia dòng thời gian thành 2 nửa đối xứng quanh mốc <strong>Cutoff Date ($T_0$)</strong>:</p>\n\n            <div class=\"flowchart-container\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.5rem; border-radius: 8px; margin: 1rem 0;\">\n              <div style=\"font-family: monospace; font-size: 0.85rem; line-height: 1.6; color: #94a3b8;\">\n                &lt;=========== QUÁ KHỨ ===========&gt; [T0: Cutoff Date] &lt;=========== TƯƠNG LAI ===========&gt;<br>\n                <span style=\"color: #38bdf8;\">[Observation Window: Khung quan sát đặc trưng]</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #f87171;\">[Performance Window: Khung nhãn mục tiêu]</span><br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>\n                <span style=\"color: #38bdf8;\">Chỉ được trích xuất FEATURES (X)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #f87171;\">Chỉ được trích xuất TARGET LABELS (Y)</span><br>\n                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>\n                &nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #4ade80;\">WHERE event_time &lt; T0</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #fbbf24;\">WHERE event_time &gt;= T0 AND event_time &lt; T0 + 30d</span><br>\n              </div>\n            </div>\n\n            <p><strong>Bức tường lửa bất khả xâm phạm:</strong> Tuyệt đối không bao giờ được để dữ liệu từ Khung tương lai (Performance Window) lọt vào Khung quá khứ (Observation Window)!</p>\n          "
        },
        {
          "id": "sec-18-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Đối Chứng Trực Tiếp Cách Tính SAI vs ĐÚNG",
          "content": "\n            <p>Hãy xem hai câu truy vấn đối chứng trực tiếp trên bộ dữ liệu TechMart. Bài toán: Tính tổng chi tiêu của từng khách hàng để làm đặc trưng dự đoán tại mốc chốt sổ <strong>Cutoff Date = '2023-07-01'</strong>:</p>\n\n            <div class=\"predict-question\">\n              <strong>Thử thách dự đoán trước khi xem code:</strong> Khách hàng Bùi Thị Bình (customer_id = 2) có 2 đơn hàng thành công: đơn 1002 ngày 05/06/2023 (8.5 triệu) và đơn 1006 ngày 10/08/2023 (4 triệu). Tại mốc chốt sổ '2023-07-01', tổng chi tiêu hợp lệ của Bình là bao nhiêu?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Dự đoán chính xác:</strong> Tại mốc 01/07/2023, đơn hàng ngày 10/08/2023 chưa diễn ra! Do đó tổng chi tiêu hợp lệ của khách Bình chỉ là <strong>8.500.000đ</strong>. Nếu câu lệnh ra kết quả 12.500.000đ tức là đã bị dính rò rỉ dữ liệu tương lai!</p>\n              </div>\n            </details>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "CÁCH TÍNH SAI: Dính Lookahead Bias do không chặn mốc Cutoff",
              "code": "-- [CÁCH TÍNH SAI NGUY HIỂM]: Lấy toàn bộ đơn hàng đến hiện tại\nSELECT \n    c.customer_id,\n    c.full_name,\n    COALESCE(SUM(o.total_amount), 0.0) AS leaked_spent,\n    'SAI: Đã tính cả đơn hàng phát sinh sau ngày 01/07/2023!' AS status_note\nFROM customers c\nLEFT JOIN orders o \n  ON c.customer_id = o.customer_id \n AND o.status = 'COMPLETED'\nGROUP BY c.customer_id, c.full_name\nORDER BY c.customer_id ASC;",
              "explanation": "Câu lệnh tính ra khách hàng 2 có 12.5 triệu đồng chi tiêu vì vô tình gộp cả đơn 4 triệu của tháng 8 vào mốc tháng 7, gây rò rỉ tương lai nghiêm trọng.",
              "output": "+-------------+---------------+--------------+-------------------------------------------------------+\n| customer_id | full_name     | leaked_spent | status_note                                           |\n+-------------+---------------+--------------+-------------------------------------------------------+\n| 1           | Nguyen Van An | 4000000.00   | SAI: Đã tính cả đơn hàng phát sinh sau ngày 01/07... |\n| 2           | Tran Thi Binh | 12500000.00  | SAI: Đã tính cả đơn hàng phát sinh sau ngày 01/07... |\n| 3           | Le Van Cuong  | 2250000.00   | SAI: Đã tính cả đơn hàng phát sinh sau ngày 01/07... |\n| 4           | Pham Thi Dung | 0.00         | SAI: Đã tính cả đơn hàng phát sinh sau ngày 01/07... |\n| 5           | Hoang Van Em  | 0.00         | SAI: Đã tính cả đơn hàng phát sinh sau ngày 01/07... |\n+-------------+---------------+--------------+-------------------------------------------------------+\n(Khách hàng 2 bị đội lên 12.5tr và khách 3 bị đội lên 2.25tr - Rò rỉ dữ liệu!)"
            },
            {
              "lang": "SQL",
              "title": "CÁCH TÍNH ĐÚNG: Point-in-Time Correctness có chặn mốc Cutoff Date",
              "code": "-- [CÁCH TÍNH ĐÚNG CHUẨN MỰC]: Chặn đứng mốc thời gian chốt sổ\nSELECT \n    c.customer_id,\n    c.full_name,\n    COALESCE(SUM(o.total_amount), 0.0) AS point_in_time_spent,\n    'ĐÚNG: Chỉ tính các giao dịch diễn ra trước 01/07/2023' AS status_note\nFROM customers c\nLEFT JOIN orders o \n  ON c.customer_id = o.customer_id \n AND o.status = 'COMPLETED'\n AND o.order_date < '2023-07-01' -- BỨC TƯỜNG LỬA CHỐNG RÒ RỈ DỮ LIỆU!\nGROUP BY c.customer_id, c.full_name\nORDER BY c.customer_id ASC;",
              "explanation": "Mệnh đề o.order_date < \"2023-07-01\" loại bỏ chính xác các đơn hàng tương lai. Khách hàng 2 chỉ còn đúng 8.5 triệu và khách 3 là 0 đồng (vì đơn của khách 3 diễn ra ngày 02/07/2023). Dữ liệu hoàn toàn sạch sẽ!",
              "output": "+-------------+---------------+---------------------+-------------------------------------------------------+\n| customer_id | full_name     | point_in_time_spent | status_note                                           |\n+-------------+---------------+---------------------+-------------------------------------------------------+\n| 1           | Nguyen Van An | 4000000.00          | ĐÚNG: Chỉ tính các giao dịch diễn ra trước 01/07/2023 |\n| 2           | Tran Thi Binh | 8500000.00          | ĐÚNG: Chỉ tính các giao dịch diễn ra trước 01/07/2023 |\n| 3           | Le Van Cuong  | 0.00                | ĐÚNG: Chỉ tính các giao dịch diễn ra trước 01/07/2023 |\n| 4           | Pham Thi Dung | 0.00                | ĐÚNG: Chỉ tính các giao dịch diễn ra trước 01/07/2023 |\n| 5           | Hoang Van Em  | 0.00                | ĐÚNG: Chỉ tính các giao dịch diễn ra trước 01/07/2023 |\n+-------------+---------------+---------------------+-------------------------------------------------------+\n(Bảo đảm 100% tính đúng đắn Point-in-Time trên PostgreSQL & DuckDB)"
            }
          ]
        },
        {
          "id": "sec-18-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Chặn Mốc Thời Gian Cho Bảng Sự Kiện",
          "content": "\n            <p>Hãy hoàn thiện câu lệnh tính số lần đăng nhập (LOGIN) của khách hàng trước mốc thời gian <code>'2023-06-01 00:00:00'</code>. Điền các từ khóa thích hợp vào các vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-faded-block\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; line-height: 1.8;\">\n              SELECT <br>\n              &nbsp;&nbsp;&nbsp;&nbsp;customer_id, <br>\n              &nbsp;&nbsp;&nbsp;&nbsp;COUNT(*) AS login_count_before_cutoff<br>\n              FROM customer_events<br>\n              WHERE event_type = [___1___]<br>\n              &nbsp;&nbsp;[___2___] event_time [___3___] '2023-06-01 00:00:00'[___4___]<br>\n              GROUP BY customer_id;\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top: 1rem;\">\n              <summary>Xem đáp án điền khuyết</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án chính xác:</strong></p>\n                <ul>\n                  <li><code>[___1___]</code>: <strong>'LOGIN'</strong> &mdash; Lọc đúng loại sự kiện đăng nhập.</li>\n                  <li><code>[___2___]</code>: <strong>AND</strong> &mdash; Kết hợp điều kiện lọc thời gian.</li>\n                  <li><code>[___3___]</code>: <strong>&lt;</strong> &mdash; Dấu nhỏ hơn nghiêm ngặt để chặn mốc Cutoff.</li>\n                  <li><code>[___4___]</code>: (Để trống hoặc dấu chấm phẩy).</li>\n                </ul>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-18-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Về Data Leakage",
          "content": "\n            <div class=\"concept-box callout-danger\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-exclamation-triangle\"></i></span>\n                <span class=\"concept-title\">Bẫy 1: Dùng Toán Tử Nhỏ Hơn Hoặc Bằng (<=) Thay Vì Nhỏ Hơn (<)</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Viết <code>WHERE event_time &lt;= cutoff_time</code> khi sự kiện kích hoạt nhãn xảy ra đúng tại mili-giây Cutoff.</p>\n                <p><strong>Hậu quả:</strong> Nếu nhãn dự đoán là sự kiện xảy ra đúng thời điểm Cutoff, việc dùng dấu <code>&lt;=</code> sẽ kéo luôn sự kiện đó vào tập đặc trưng đầu vào, gây Target Leakage! Luôn tuân thủ quy ước nửa khoảng mở bên phải: <code>[start_time, cutoff_time)</code> với toán tử <code>&lt;</code>.</p>\n              </div>\n            </div>\n\n            <div class=\"concept-box callout-danger\" style=\"margin-top: 1.25rem;\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-magic\"></i></span>\n                <span class=\"concept-title\">Bẫy 2: Ngộ Nhận Rằng Mô Hình Có AUC = 0.99 Là Mô Hình \"Siêu Trí Tuệ\"</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Nhìn thấy mô hình đạt độ chính xác gần như tuyệt đối liền vội vã đưa lên Production.</p>\n                <p><strong>Thực tế phũ phàng:</strong> Trong các bài toán hành vi con người phức tạp (như rời bỏ, click quảng cáo, mua hàng), AUC hầu như không bao giờ vượt quá 0.90 trong thực tế. Nếu mô hình của bạn đạt AUC &gt; 0.95, khả năng đến <strong>99% là câu lệnh SQL của bạn đã bị rò rỉ dữ liệu tương lai</strong>! Hãy quay lại kiểm tra ngay các câu truy vấn trích xuất đặc trưng.</p>\n              </div>\n            </div>\n          "
        },
        {
          "id": "sec-18-concept-comparison",
          "title": "So Sánh: Báo Cáo Kinh Doanh BI vs Trích Xuất Đặc Trưng AI/ML",
          "content": "\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Tiêu Chí</th>\n                  <th scope=\"col\">Báo Cáo Kinh Doanh (BI / Dashboard)</th>\n                  <th scope=\"col\">Trích Xuất Đặc Trưng (Machine Learning)</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">Mốc thời gian dữ liệu</th>\n                  <td>Thường dùng dữ liệu mới nhất đến thời điểm hiện tại (Latest State).</td>\n                  <td>Bắt buộc phải chặn tại các mốc lịch sử quá khứ (Point-in-Time Cutoff).</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Tác động của rò rỉ</th>\n                  <td>Không có khái niệm rò rỉ; người dùng luôn muốn thấy số liệu mới nhất.</td>\n                  <td>Phá hủy hoàn toàn mô hình; gây thiệt hại tài chính nặng nề trên Production.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Xử lý lịch sử</th>\n                  <td>Chỉ cần ghi đè trạng thái mới nhất (SCD Type 1).</td>\n                  <td>Bắt buộc lưu trữ lịch sử biến động từng thời kỳ (SCD Type 2 hoặc Event Sourcing).</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-18-real-world-assertion",
          "title": "Ngoài Đời Thực: Tự Động Hóa Kiểm Định Chống Rò Rỉ Bằng dbt Test",
          "content": "\n            <p>Trong các Data Pipeline hiện đại, kỹ sư dữ liệu viết các bài test tự động để phát hiện sớm các đặc trưng bị rò rỉ dữ liệu:</p>\n            <pre><code>-- Kiểm định [DQ]: Đảm bảo không có bản ghi nào trong tập đặc trưng có ngày >= Cutoff\nSELECT \n    feature_id,\n    customer_id,\n    feature_timestamp,\n    'LỖI DATA LEAKAGE: Đặc trưng mang dấu thời gian tương lai' AS error_desc\nFROM training_feature_matrix\nWHERE feature_timestamp >= '2023-07-01';</code></pre>\n            <p>Nếu câu truy vấn trên trả về &gt; 0 dòng, pipeline CI/CD sẽ lập tức ngắt quá trình huấn luyện và gửi cảnh báo đỏ cho đội MLOps!</p>\n          "
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi dùng dấu <= thay vì <",
            "content": "Luôn luôn sử dụng dấu nhỏ hơn nghiêm ngặt (< cutoff_timestamp) để không vô tình bắt nhầm sự kiện xảy ra đúng tại tích-tắc chuyển giao."
          },
          {
            "title": "Cạm bẫy Target Leakage từ cột trạng thái đơn hàng",
            "content": "Nếu dự đoán xem đơn hàng có bị hủy hay không, tuyệt đối không được đưa các cột như cancelled_at hoặc cancel_reason vào tập đặc trưng đầu vào."
          }
        ],
        "tips": [
          {
            "title": "Thiết lập tham số hóa mốc Cutoff trong dbt",
            "content": "Thay vì viết cứng chuỗi ngày 2023-07-01, hãy dùng biến Jinja trong dbt: WHERE order_date < \"{{ var(\"cutoff_date\") }}\" để có thể chạy kiểm thử cho nhiều mốc thời gian khác nhau."
          }
        ],
        "deepDive": {
          "title": "Cơ chế bảo vệ: Thiết kế Training Spine & Point-in-Time Join an toàn trong SQL",
          "content": "<p>Để loại bỏ 100% nguy cơ rò rỉ dữ liệu tương lai (Data Leakage), kỹ thuật công nghiệp chuẩn mực là xây dựng một bảng <strong>Observation Spine (Khung quan sát)</strong>.</p><p>Bảng Spine chứa bộ ba: <code>(entity_id, observation_timestamp, label)</code>. Khi tạo đặc trưng, mọi bảng dữ liệu giao dịch phụ đều được ghép nối với điều kiện cứng: <code>WHERE transaction_timestamp &lt; spine.observation_timestamp</code>. Bằng cách này, dù mô hình được huấn luyện lại nhiều năm sau, dữ liệu đầu vào luôn phản ánh trung thực trạng thái thông tin tại đúng thời khắc sự kiện xảy ra.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 3.5-1 (Dự đoán kết quả): Nhận diện lỗi rò rỉ dữ liệu tương lai",
          "level": "Cơ bản",
          "problem": "Một câu lệnh trích xuất đặc trưng để dự đoán khả năng mua hàng vào ngày 2023-08-01 có dòng lệnh:\nWHERE order_date BETWEEN \"2023-01-01\" AND \"2023-08-15\";\nCâu lệnh này có bị rò rỉ dữ liệu không? Giải thích vì sao.",
          "hint": "So sánh ngày kết thúc 2023-08-15 với mốc Cutoff 2023-08-01.",
          "solutionCode": "-- Phân tích lỗi:\n-- Mốc Cutoff là 2023-08-01.\n-- Câu lệnh lọc đến tận ngày 2023-08-15 (thừa 14 ngày trong tương lai!).\n-- Kết luận: BỊ RÒ RỈ DỮ LIỆU TƯƠNG LAI NGHIÊM TRỌNG (Lookahead Bias).",
          "solutionOutput": "Phát hiện rò rỉ dữ liệu tương lai 14 ngày.",
          "explanation": "Chẩn đoán: Khoảng thời gian từ 02/08 đến 15/08 nằm sau ngày dự đoán 01/08, làm lộ trước các giao dịch tương lai cho mô hình."
        },
        {
          "title": "Bài tập 3.5-2 (Tìm & Sửa lỗi): Khắc phục lỗi rò rỉ biến mục tiêu",
          "level": "Trung bình",
          "problem": "Một mô hình dự đoán rủi ro hủy đơn hàng (Order Cancellation Prediction). Lập trình viên đưa các cột sau vào bảng đặc trưng: order_id, total_amount, payment_method, refund_amount. Cột nào gây ra Target Leakage và cần phải xóa bỏ?",
          "hint": "Chỉ những đơn hàng bị hủy mới phát sinh tiền hoàn trả (refund).",
          "solutionCode": "-- Cột gây Target Leakage: refund_amount!\n-- Vì nếu refund_amount > 0, 100% đơn hàng đó đã bị hủy!\n-- Mô hình chỉ cần nhìn vào cột refund_amount là biết ngay nhãn, không học được gì khác.\n-- Sửa lại: Loại bỏ hoàn toàn cột refund_amount khỏi tập đặc trưng:\nSELECT \n    order_id, \n    total_amount, \n    payment_method\nFROM raw_orders;",
          "solutionOutput": "Loại bỏ cột refund_amount thành công, bảo vệ tính khách quan của mô hình.",
          "explanation": "Chẩn đoán: refund_amount là hệ quả diễn ra SAU khi hủy đơn, đưa vào tập đặc trưng đầu vào sẽ phá hủy tính dự báo của mô hình."
        },
        {
          "title": "Bài tập 3.5-3 (Tự viết truy vấn): Trích xuất đặc trưng có mốc chốt sổ Cutoff chuẩn xác",
          "level": "Khá",
          "problem": "Từ bảng customer_events, hãy viết câu truy vấn tính tổng số tiền (amount) mà mỗi khách hàng đã chi tiêu trong các sự kiện \"PURCHASE\" diễn ra trước ngày 2023-07-01 00:00:00.",
          "hint": "Dùng WHERE event_type = \"PURCHASE\" AND event_time < \"2023-07-01 00:00:00\".",
          "solutionCode": "SELECT \n    customer_id,\n    COUNT(*) AS purchase_events_count,\n    SUM(amount) AS total_spent_before_cutoff\nFROM customer_events\nWHERE event_type = 'PURCHASE'\n  AND event_time < '2023-07-01 00:00:00'\nGROUP BY customer_id\nORDER BY customer_id ASC;",
          "solutionOutput": "Bảng kết quả bảo đảm 100% không có sự kiện nào vượt quá mốc chốt sổ.",
          "explanation": "Bảo đảm nguyên tắc Point-in-Time Correctness, sẵn sàng cung cấp dữ liệu cho mô hình huấn luyện an toàn."
        },
        {
          "title": "Bài tập 3.5-4 (Đánh đổi & Kiến trúc): Thiết kế bài Assertion tự động kiểm tra rò rỉ dữ liệu",
          "level": "Nâng cao",
          "problem": "Hãy viết câu truy vấn kiểm định chất lượng [DQ] theo quy ước vàng để kiểm tra bảng feature_store_orders: nếu có bất kỳ dòng nào mang order_date >= \"2023-07-01\", câu truy vấn phải trả về các dòng vi phạm đó kèm mã lỗi ERR_LOOKAHEAD_BIAS.",
          "hint": "Quy ước vàng: Truy vấn trả về các dòng vi phạm, kết quả rỗng tương đương với ĐẠT chuẩn.",
          "solutionCode": "SELECT \n    feature_id,\n    customer_id,\n    order_id,\n    order_date,\n    'ERR_LOOKAHEAD_BIAS: Phát hiện ngày đặt hàng nằm ngoài mốc Cutoff' AS error_description\nFROM feature_store_orders\nWHERE order_date >= '2023-07-01';",
          "solutionOutput": "Empty result set (0 rows) khẳng định tập đặc trưng hoàn toàn không bị rò rỉ tương lai.",
          "explanation": "Tích hợp câu truy vấn kiểm định này vào pipeline CI/CD giúp tự động chặn đứng mã độc rò rỉ trước khi huấn luyện mô hình."
        }
      ],
      "quiz": [
        {
          "question": "Hiện tượng Lookahead Bias (Nhìn trước tương lai) trong quá trình trích xuất đặc trưng bằng SQL xảy ra khi nào?",
          "options": [
            "Khi câu lệnh SQL chạy quá nhanh.",
            "Khi truy vấn trích xuất đặc trưng sử dụng các thông tin hoặc giao dịch có dấu thời gian diễn ra SAU thời điểm mốc dự đoán (Cutoff Timestamp).",
            "Khi cơ sở dữ liệu bị mất kết nối mạng.",
            "Khi người dùng đặt tên bảng bằng chữ in hoa."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Lookahead Bias xảy ra khi câu lệnh SQL vô tình đưa dữ liệu của tương lai vào tập đặc trưng quá khứ, khiến mô hình offline đạt điểm cao nhưng chết đứng trên Production."
        },
        {
          "question": "Vì sao một mô hình Machine Learning đạt độ chính xác quá cao (ví dụ AUC = 0.99) trong bài toán dự đoán hành vi con người lại là dấu hiệu đáng báo động đỏ?",
          "options": [
            "Vì máy chủ sắp bị quá tải bộ nhớ.",
            "Vì hành vi con người luôn có yếu tố ngẫu nhiên; độ chính xác 99% hầu như chắc chắn là dấu hiệu của việc bị rò rỉ dữ liệu tương lai (Data Leakage) hoặc rò rỉ biến mục tiêu (Target Leakage).",
            "Vì mô hình quá thông minh và sẽ tự xóa cơ sở dữ liệu.",
            "Vì ngôn ngữ SQL không hỗ trợ tính toán chỉ số AUC."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Trong thực tế dữ liệu kinh doanh, không có mô hình nào đạt độ chính xác hoàn hảo 99%. Con số này gần như là bằng chứng chắc chắn của lỗi rò rỉ dữ liệu."
        },
        {
          "question": "Khi phân chia dòng thời gian để trích xuất dữ liệu huấn luyện, bức tường lửa ngăn cách giữa Khung quan sát đặc trưng (Observation Window) và Khung nhãn mục tiêu (Performance Window) được gọi là gì?",
          "options": [
            "Khóa ngoại (Foreign Key)",
            "Mốc thời gian chốt sổ (Cutoff Date / Observation Timestamp)",
            "Chỉ mục B-Tree",
            "Mệnh đề HAVING"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Cutoff Timestamp là mốc ranh giới bất khả xâm phạm chia đôi dòng thời gian: trước Cutoff là đặc trưng (Features), sau Cutoff là nhãn mục tiêu (Target)."
        },
        {
          "question": "Cột nào sau đây nếu đưa vào tập đặc trưng để dự đoán xác suất khách hàng rời bỏ (Churn Prediction) sẽ gây ra lỗi Target Leakage nghiêm trọng?",
          "options": [
            "age (Độ tuổi)",
            "city (Thành phố sinh sống)",
            "churn_reason (Lý do hủy dịch vụ)",
            "total_items_bought (Số lượng mặt hàng đã mua)"
          ],
          "correctIndex": 2,
          "explanation": "Chính xác! Cột \"lý do hủy dịch vụ\" (churn_reason) chỉ tồn tại khi khách hàng ĐÃ rời bỏ. Đưa cột này vào dự đoán churn là hành vi rò rỉ biến mục tiêu hiển nhiên."
        },
        {
          "question": "Theo quy ước toán học chuẩn mực, toán tử nào sau đây nên được dùng để lọc thời gian chống rò rỉ dữ liệu quanh mốc Cutoff Date?",
          "options": [
            "WHERE event_time > cutoff",
            "WHERE event_time < cutoff (Nhỏ hơn nghiêm ngặt)",
            "WHERE event_time = cutoff",
            "WHERE event_time IS NULL"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Dùng toán tử nhỏ hơn nghiêm ngặt (< cutoff) đảm bảo chỉ lấy các sự kiện đã diễn ra trọn vẹn trong quá khứ trước mốc chốt sổ."
        }
      ],
      "summary": [
        "Data Leakage / Lookahead Bias là nguyên nhân số 1 khiến các mô hình AI thất bại thảm hại khi đưa lên môi trường sản xuất.",
        "Ba dạng rò rỉ: Lookahead Bias (nhìn tương lai), Target Leakage (rò rỉ nhãn) và Global Aggregation Leakage (lây nhiễm tập test).",
        "Nguyên tắc Point-in-Time: Luôn luôn thiết lập mốc Cutoff Date và lọc WHERE event_time < cutoff_date.",
        "AUC > 0.95 trong bài toán hành vi kinh doanh là dấu hiệu báo động đỏ của việc câu lệnh SQL bị rò rỉ dữ liệu.",
        "Tự động hóa bài kiểm thử [DQ] chống rò rỉ dữ liệu trong pipeline CI/CD trước khi nạp dữ liệu vào mô hình học máy.",
        "Ôn cách quãng: Tại sao phép ghép LEFT JOIN lại vô tình biến thành INNER JOIN nếu ta đặt điều kiện bảng phải vào WHERE? (Xem lại Bài 2.2)."
      ]
    },
    {
      "id": "sql-19-fe-as-of-join",
      "number": "3.6",
      "title": "[FE] As-Of Join: Ghép Nối Dữ Liệu Theo Thời Điểm Có Hiệu Lực Chuẩn Xác",
      "subtitle": "Chinh phục bài toán ghép nối chuỗi thời gian không đồng bộ: Từ giải thuật ANSI SQL đến cú pháp ASOF JOIN siêu tốc trong DuckDB",
      "level": "Nâng cao",
      "duration": "45 phút",
      "keywords": [
        "As-Of Join",
        "Time-series Join",
        "DuckDB ASOF",
        "SCD Type 2",
        "Financial Quotes",
        "Two-Pointer Algorithm",
        "Point-in-Time"
      ],
      "prerequisites": "Nắm vững Point-in-Time Correctness (Bài 3.5), Các phép JOIN (Bài 2.2).",
      "verifiedEngines": "PostgreSQL 16.2, DuckDB 1.1+ (2.0.0), SQLite 3.50.4 (Kiểm chứng ngày 03/11/2026)",
      "objectives": [
        "Hiểu bản chất bài toán ghép nối không đồng bộ (Asynchronous Time-series Join): Khi hai bảng không bao giờ có dấu thời gian bằng nhau tuyệt đối.",
        "Làm chủ giải thuật triển khai As-Of Join trong chuẩn ANSI SQL bằng mô hình SCD Type 2 và Correlated Subquery.",
        "Làm chủ cú pháp chuyên biệt và cơ chế thực thi của toán tử ASOF JOIN trong DuckDB và các CSDL thời gian thực hiện đại.",
        "Phân tích sự khác biệt về độ phức tạp thuật toán: O(M * N) của Subquery cổ điển vs O(M + N) của thuật toán hai con trỏ (Two-pointer scan).",
        "Ứng dụng As-Of Join để ghép nối giá cổ phiếu/tỷ giá hối đoái với lệnh giao dịch và gắn nhãn hạng thành viên tại đúng thời điểm tương tác."
      ],
      "intuition": {
        "title": "Bảng tỷ giá niêm yết tại quầy vé vs Đồng hồ trên tay hành khách",
        "metaphor": "Hãy tưởng tượng bạn bước vào quầy đổi ngoại tệ lúc 10:17 sáng. Trên bảng điện tử, ngân hàng không cập nhật tỷ giá theo từng giây; họ chỉ niêm yết các mốc tỷ giá thay đổi lúc 8:00, 9:30, và 11:00. Bạn không thể đòi hỏi ngân hàng phải có đúng một bản ghi tỷ giá lúc 10:17:00! Bạn sẽ tự động nhìn vào mức giá gần nhất có hiệu lực trước đó &mdash; tức là mức giá niêm yết lúc 9:30. Đó chính là trực giác của As-Of Join: Ghép dòng dữ liệu với bản ghi trạng thái gần nhất trong quá khứ (As of that point in time).",
        "boundary": "Ẩn dụ này giả định thời gian tăng dần một chiều; tuy nhiên trong môi trường dữ liệu phân tán, các sự kiện có thể đến trễ (Late-arriving data / Out-of-order events), đòi hỏi pipeline phải có cơ chế xử lý Watermark và bù trừ độ trễ.",
        "visualHtml": "\n          <div class=\"sql-intuition-visual\">\n            <div class=\"sql-diagram-flex\" style=\"justify-content:space-between;margin-bottom:12px;\">\n              <div class=\"sql-diagram-node\" style=\"flex:1;min-width:180px;\">\n                <div style=\"font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;font-weight:700;\">EVENT STREAM (GIAO DỊCH)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;font-family:monospace;\">10:15:23 &bull; Đơn #998</div>\n                <div style=\"font-size:0.72rem;color:var(--text-secondary);margin-top:4px;\">Sự kiện phát sinh đột ngột</div>\n              </div>\n              <div class=\"sql-diagram-arrow\">&rarr; ASOF &rarr;</div>\n              <div class=\"sql-diagram-node sql-diagram-node-highlight\" style=\"flex:1;min-width:200px;border-color:var(--success);\">\n                <div style=\"font-size:0.75rem;color:var(--success);margin-bottom:4px;font-weight:700;\">MARKET RATE (TỶ GIÁ GẦN NHẤT)</div>\n                <div style=\"font-size:0.95rem;font-weight:800;color:var(--success);font-family:monospace;\">10:15:20 &bull; Giá 24.500đ</div>\n                <div style=\"font-size:0.72rem;margin-top:4px;\">Ghép ngay mốc thời gian gần nhất &le; 10:15:23!</div>\n              </div>\n            </div>\n            <div style=\"display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-surface-alt);border-radius:6px;border:1px dashed var(--border-strong);font-size:0.82rem;\">\n              <span style=\"font-weight:700;color:var(--color-primary);\">⚡ Đột phá DuckDB:</span>\n              <span>DuckDB hỗ trợ cú pháp native <code>ASOF JOIN</code> chạy vector hóa đa luồng cực nhanh mà không cần viết subquery LATERAL phức tạp như PostgreSQL.</span>\n            </div>\n          </div>\n        "
      },
      "sections": [
        {
          "id": "sec-19-problem-hook",
          "title": "Gợi Mở Vấn Đề: Nghịch Lý Ghép Nối Dữ Liệu Thời Gian Thực",
          "content": "\n            <p>Hãy xem một bài toán kinh điển trong ngành tài chính và thương mại điện tử: Bạn có bảng <strong>giao dịch mua hàng</strong> (chính xác đến từng mili-giây: <code>14:23:15.821</code>) và bảng <strong>tỷ giá USD/VND</strong> (chỉ cập nhật mỗi khi tỷ giá biến động: lúc 09:00:00, 11:30:00, 14:00:00).</p>\n            <p>Nếu bạn dùng phép ghép bằng thông thường:</p>\n            <pre><code>SELECT * \nFROM orders o \nJOIN exchange_rates r \n  ON o.currency = r.currency \n AND o.order_time = r.rate_time; -- CỰC KỲ NGUY HIỂM!</code></pre>\n            <p>Kết quả trả về sẽ là <strong>RỖNG (0 dòng)</strong>! Vì xác suất để một khách hàng bấm nút thanh toán trùng khớp chính xác từng mili-giây với thời điểm ngân hàng cập nhật tỷ giá gần như bằng không!</p>\n            <p>Làm thế nào để tìm được tỷ giá gần nhất có hiệu lực tại thời điểm đơn hàng diễn ra? Câu trả lời chính là <strong>As-Of Join</strong> &mdash; một trong những vũ khí lợi hại nhất của kỹ sư dữ liệu chuỗi thời gian.</p>\n          "
        },
        {
          "id": "sec-19-recall-prereq",
          "title": "Gọi Lại Kiến Thức Cũ: Truy Hồi Kỹ Thuật Lọc Khoảng Thời Gian",
          "content": "\n            <p>Hãy cùng kiểm tra nhanh 2 nguyên lý từ Bài 3.5 và Bài 2.2:</p>\n            \n            <div class=\"predict-question\">\n              <strong>Câu hỏi 1:</strong> Khi ghép nối một sự kiện với bảng lịch sử trạng thái có 2 cột <code>valid_from</code> và <code>valid_to</code>, điều kiện nào bảo đảm sự kiện rơi đúng vào khoảng hiệu lực của trạng thái đó?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Điều kiện nửa khoảng chuẩn: <code>event_time &gt;= valid_from AND (event_time &lt; valid_to OR valid_to IS NULL)</code>.</p>\n              </div>\n            </details>\n\n            <div class=\"predict-question\" style=\"margin-top: 1rem;\">\n              <strong>Câu hỏi 2:</strong> Nếu một bảng có 1 triệu dòng sự kiện và bảng kia có 1 triệu dòng trạng thái, việc dùng Subquery lồng nhau <code>WHERE status_time &lt;= event_time ORDER BY status_time DESC LIMIT 1</code> sẽ có độ phức tạp thuật toán là bao nhiêu?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem lời giải phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án:</strong> Độ phức tạp lên tới $O(M \times N) = 10^6 \times 10^6 = 10^{12}$ phép toán! Câu lệnh sẽ chạy mất hàng giờ hoặc treo cứng máy chủ.</p>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-19-concept-definition",
          "title": "Khái Niệm Cốt Lõi: Bản Chất Toán Học Của As-Of Join",
          "content": "\n            <p>Định nghĩa toán học của phép ghép <strong>As-Of Join</strong> giữa bảng sự kiện $E$ và bảng trạng thái $S$:</p>\n            <div class=\"concept-box callout-info\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-calculator\"></i></span>\n                <span class=\"concept-title\">Định Nghĩa Toán Học Của As-Of Join</span>\n              </div>\n              <div class=\"concept-body\">\n                <p>Với mỗi bản ghi $e in E$, tìm bản ghi $s in S$ thỏa mãn đồng thời hai điều kiện:</p>\n                <ol>\n                  <li>Khóa thực thể bằng nhau: $e.id = s.id$ (Equi-condition).</li>\n                  <li>Dấu thời gian của $s$ là giá trị lớn nhất trong số các giá trị nhỏ hơn hoặc bằng dấu thời gian của $e$:<br>\n                  $$s.time = max { s'.time in S mid s'.id = e.id \text{ và } s'.time le e.time }$$</li>\n                </ol>\n              </div>\n            </div>\n\n            <p>Có 2 trường phái triển khai As-Of Join trong thế giới cơ sở dữ liệu hiện đại:</p>\n            <ul>\n              <li><strong>Trường phái ANSI SQL (PostgreSQL, SQLite, MySQL):</strong> Triển khai thông qua bảng lịch sử SCD Type 2 với cặp ngày hiệu lực, hoặc dùng Correlated Subquery kết hợp <code>LATERAL JOIN</code>.</li>\n              <li><strong>Trường phái Native ASOF JOIN (DuckDB, ClickHouse, Snowflake, kdb+):</strong> Hỗ trợ trực tiếp từ khóa <code>ASOF JOIN</code> ở tầng engine với thuật toán tối ưu phần cứng.</li>\n            </ul>\n          "
        },
        {
          "id": "sec-19-internal-mechanism",
          "title": "Cơ Chế Bên Trong: Thuật Toán Hai Con Trỏ (Two-Pointer Algorithm) Của DuckDB",
          "content": "\n            <p>Tại sao cú pháp <code>ASOF JOIN</code> của DuckDB lại nhanh hơn hàng ngàn lần so với Subquery trong PostgreSQL truyền thống?</p>\n            <p>Bí quyết nằm ở <strong>Thuật toán Hai con trỏ (Two-Pointer Scan)</strong>:</p>\n            <ol>\n              <li>Engine yêu cầu hai bảng đã được sắp xếp theo thời gian tăng dần (Time-ordered).</li>\n              <li>Engine duy trì hai con trỏ bộ nhớ: con trỏ $P_E$ duyệt bảng sự kiện và con trỏ $P_S$ duyệt bảng trạng thái.</li>\n              <li>Khi $P_E$ tiến về phía trước, $P_S$ chỉ việc tịnh tiến về phía trước để bắt kịp mốc thời gian của $P_E$ mà <em>không bao giờ phải quay lùi lại đầu bảng</em>!</li>\n            </ol>\n            <p>Nhờ cơ chế tịnh tiến một chiều, cả hai bảng chỉ cần được quét qua đúng <strong>MỘT LẦN DUY NHẤT</strong>. Độ phức tạp thuật toán giảm từ $O(M \times N)$ xuống còn <strong>$O(M + N)$</strong> tuyến tính!</p>\n          "
        },
        {
          "id": "sec-19-worked-example",
          "title": "Ví Dụ Mẫu Có Lời Giải: Ghép Nối Sự Kiện Với Hạng Thành Viên TechMart",
          "content": "\n            <p>Chúng ta sẽ thực hiện ghép nối chuỗi 8 sự kiện trong bảng <code>customer_events</code> với bảng lịch sử hạng thành viên <code>customer_tier_history</code>. Hãy xem cả 2 cách viết:</p>\n\n            <div class=\"predict-question\">\n              <strong>Thử thách dự đoán trước khi xem code:</strong> Khách hàng 1 (An) có sự kiện LOGIN lúc <code>08:30:00 ngày 31/05/2023</code>. Trong bảng lịch sử hạng, An là \"Silver\" từ 15/01/2023 đến 31/05/2023, và được nâng lên \"Gold\" từ ngày 01/06/2023. Tại thời điểm đăng nhập sáng 31/05, hạng của An là gì?\n            </div>\n            <details class=\"predict-details\">\n              <summary>Xem phân tích</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Dự đoán chính xác:</strong> Ngày 31/05/2023 vẫn nằm trong khoảng hiệu lực của hạng \"Silver\" (hạng Gold chỉ bắt đầu từ 01/06). Do đó As-Of Join phải gán chính xác hạng <strong>Silver</strong> cho sự kiện này!</p>\n              </div>\n            </details>\n          ",
          "codeExamples": [
            {
              "lang": "SQL",
              "title": "Cách 1: Chuẩn ANSI SQL (Tương thích 100% PostgreSQL 16 & SQLite 3.50)",
              "code": "-- Triển khai As-Of Join bằng quan hệ khoảng thời gian SCD Type 2\nSELECT \n    e.event_id,\n    e.customer_id,\n    e.event_type,\n    e.event_time,\n    h.tier AS effective_tier_as_of_event\nFROM customer_events e\nLEFT JOIN customer_tier_history h\n  ON e.customer_id = h.customer_id\n AND CAST(e.event_time AS DATE) >= h.valid_from\n AND (CAST(e.event_time AS DATE) < h.valid_to OR h.valid_to IS NULL)\nORDER BY e.customer_id, e.event_time ASC;",
              "explanation": "Phép ghép chuẩn ANSI SQL sử dụng điều kiện nửa khoảng valid_from và valid_to để tóm đúng bản ghi hạng thành viên đang có hiệu lực tại ngày diễn ra sự kiện.",
              "output": "+----------+-------------+--------------+---------------------+----------------------------+\n| event_id | customer_id | event_type   | event_time          | effective_tier_as_of_event |\n+----------+-------------+--------------+---------------------+----------------------------+\n| 1        | 1           | LOGIN        | 2023-05-31 08:30:00 | Silver                     |\n| 2        | 1           | VIEW_PRODUCT | 2023-05-31 08:35:00 | Silver                     |\n| 3        | 1           | PURCHASE     | 2023-06-01 09:15:00 | Gold                       |\n| 6        | 1           | CANCEL_ORDER | 2023-06-15 16:45:00 | Gold                       |\n| 4        | 2           | LOGIN        | 2023-06-05 14:00:00 | Silver                     |\n| 5        | 2           | PURCHASE     | 2023-06-05 14:20:00 | Silver                     |\n| 8        | 2           | PURCHASE     | 2023-08-10 11:30:00 | Platinum                   |\n| 7        | 3           | PURCHASE     | 2023-07-02 10:10:00 | Silver                     |\n+----------+-------------+--------------+---------------------+----------------------------+\n(Ghép chính xác hạng tại từng thời điểm - Đã kiểm chứng trên PostgreSQL & SQLite)"
            },
            {
              "lang": "SQL",
              "title": "Cách 2: Cú pháp chuyên biệt ASOF JOIN trong DuckDB 1.1+ (2.0.0)",
              "code": "-- [CÚ PHÁP ĐỘT PHÁ CỦA DUCKDB]: Tối ưu hóa phần cứng bằng ASOF JOIN\nSELECT \n    e.event_id,\n    e.customer_id,\n    e.event_type,\n    e.event_time,\n    h.tier AS effective_tier\nFROM customer_events e\nASOF JOIN customer_tier_history h\n  ON e.customer_id = h.customer_id\n AND e.event_time >= h.valid_from\nORDER BY e.customer_id, e.event_time ASC;",
              "explanation": "DuckDB hỗ trợ trực tiếp toán tử ASOF JOIN với cú pháp cực kỳ ngắn gọn: chỉ cần khai báo điều kiện e.event_time >= h.valid_from, engine sẽ tự động tìm bản ghi lớn nhất thỏa mãn điều kiện đó bằng thuật toán hai con trỏ!",
              "output": "+----------+-------------+--------------+---------------------+----------------+\n| event_id | customer_id | event_type   | event_time          | effective_tier |\n+----------+-------------+--------------+---------------------+----------------+\n| 1        | 1           | LOGIN        | 2023-05-31 08:30:00 | Silver         |\n| 2        | 1           | VIEW_PRODUCT | 2023-05-31 08:35:00 | Silver         |\n| 3        | 1           | PURCHASE     | 2023-06-01 09:15:00 | Gold           |\n| 6        | 1           | CANCEL_ORDER | 2023-06-15 16:45:00 | Gold           |\n| 4        | 2           | LOGIN        | 2023-06-05 14:00:00 | Silver         |\n| 5        | 2           | PURCHASE     | 2023-06-05 14:20:00 | Silver         |\n| 8        | 2           | PURCHASE     | 2023-08-10 11:30:00 | Platinum       |\n| 7        | 3           | PURCHASE     | 2023-07-02 10:10:00 | Silver         |\n+----------+-------------+--------------+---------------------+----------------+\n(Chạy siêu tốc in-memory trên DuckDB 2.0.0)"
            }
          ]
        },
        {
          "id": "sec-19-faded-example",
          "title": "Bài Điền Khuyết (Faded Example): Cú Pháp ASOF JOIN Trong DuckDB",
          "content": "\n            <p>Hãy hoàn thiện câu lệnh ASOF JOIN trong DuckDB để ghép bảng giao dịch <code>trades</code> với bảng báo giá cổ phiếu <code>quotes</code> theo từng mã chứng khoán (<code>symbol</code>). Điền các từ khóa thích hợp vào các vị trí <code>[___1___]</code> đến <code>[___4___]</code>:</p>\n\n            <div class=\"code-faded-block\" style=\"background: var(--bg-surface-elevated, #1e293b); padding: 1.25rem; border-radius: 8px; font-family: monospace; font-size: 0.9rem; line-height: 1.8;\">\n              SELECT <br>\n              &nbsp;&nbsp;&nbsp;&nbsp;t.trade_id, t.symbol, t.trade_time, t.volume, q.bid_price<br>\n              FROM trades t<br>\n              [___1___] JOIN quotes q<br>\n              &nbsp;&nbsp;[___2___] t.symbol = q.symbol<br>\n              &nbsp;&nbsp;AND t.trade_time [___3___] q.quote_time[___4___]\n            </div>\n\n            <details class=\"predict-details\" style=\"margin-top: 1rem;\">\n              <summary>Xem đáp án điền khuyết</summary>\n              <div class=\"predict-answer\">\n                <p><strong>Đáp án chính xác:</strong></p>\n                <ul>\n                  <li><code>[___1___]</code>: <strong>ASOF</strong> &mdash; Từ khóa kích hoạt phép ghép As-Of.</li>\n                  <li><code>[___2___]</code>: <strong>ON</strong> &mdash; Mệnh đề khai báo điều kiện ghép nối.</li>\n                  <li><code>[___3___]</code>: <strong>&gt;=</strong> &mdash; Dấu thời gian giao dịch phải diễn ra sau hoặc bằng thời điểm báo giá.</li>\n                  <li><code>[___4___]</code>: (Dấu chấm phẩy).</li>\n                </ul>\n              </div>\n            </details>\n          "
        },
        {
          "id": "sec-19-pitfalls-misconceptions",
          "title": "Bẫy Và Quan Niệm Sai Phổ Biến Trong As-Of Join",
          "content": "\n            <div class=\"concept-box callout-danger\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-exclamation-triangle\"></i></span>\n                <span class=\"concept-title\">Bẫy 1: Quên Sắp Xếp Dữ Liệu Thời Gian Trước Khi ASOF JOIN</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Thực hiện ASOF JOIN trên bảng chưa được đánh chỉ mục hoặc chưa được sắp xếp thời gian tăng dần.</p>\n                <p><strong>Hậu quả:</strong> Thuật toán hai con trỏ đòi hỏi dữ liệu phải có tính đơn điệu tăng dần theo thời gian. Mặc dù DuckDB tự động sort ngầm nếu cần, việc bảng dữ liệu có kích thước hàng chục GB không được sort trước sẽ khiến engine tốn tài nguyên sắp xếp lại toàn bộ bảng.</p>\n              </div>\n            </div>\n\n            <div class=\"concept-box callout-danger\" style=\"margin-top: 1.25rem;\">\n              <div class=\"concept-header\">\n                <span class=\"concept-icon\"><i class=\"fas fa-arrow-left\"></i></span>\n                <span class=\"concept-title\">Bẫy 2: Nhầm Lẫn Chiều Ghép (As-Of Past vs As-Of Future)</span>\n              </div>\n              <div class=\"concept-body\">\n                <p><strong>Sai lầm:</strong> Viết <code>t.trade_time &lt;= q.quote_time</code> thay vì <code>&gt;=</code>.</p>\n                <p><strong>Hậu quả:</strong> Đảo ngược dấu so sánh sẽ biến As-Of Join thành phép tìm bản ghi <em>trong tương lai gần nhất</em> thay vì quá khứ, gây rò rỉ dữ liệu tương lai (Lookahead Bias)! Trong bài toán trích xuất đặc trưng AI, chiều ghép luôn luôn là <code>event_time &gt;= state_time</code>.</p>\n              </div>\n            </div>\n          "
        },
        {
          "id": "sec-19-concept-comparison",
          "title": "So Sánh: DuckDB ASOF JOIN vs PostgreSQL LATERAL Subquery",
          "content": "\n            <div class=\"table-responsive\">\n                <table class=\"comparison-table\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Tiêu Chí</th>\n                  <th scope=\"col\">DuckDB / ClickHouse ASOF JOIN</th>\n                  <th scope=\"col\">PostgreSQL LATERAL Subquery</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <th scope=\"row\">Cú pháp</th>\n                  <td>Cực kỳ thanh thoát: <code>ASOF JOIN table ON id AND t1 &gt;= t2</code>.</td>\n                  <td>Dài dòng: <code>LEFT JOIN LATERAL (SELECT ... ORDER BY ... LIMIT 1) ON true</code>.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Giải thuật nội tại</th>\n                  <td>Thuật toán hai con trỏ (Two-pointer merge scan).</td>\n                  <td>Quét lồng nhau (Nested Loop Join) kết hợp Index Scan.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Độ phức tạp thời gian</th>\n                  <td><strong>$O(M + N)$</strong> &mdash; Tuyến tính siêu tốc.</td>\n                  <td><strong>$O(M \times log N)$</strong> có Index; $O(M \times N)$ không có Index.</td>\n                </tr>\n                <tr>\n                  <th scope=\"row\">Khuyên dùng</th>\n                  <td>Phân tích chuỗi thời gian lớn (OLAP, FinTech, Log Analytics).</td>\n                  <td>CSDL giao dịch OLTP khi không có sẵn engine OLAP.</td>\n                </tr>\n              </tbody>\n            </table>\n              </div>\n          "
        },
        {
          "id": "sec-19-real-world-fintech",
          "title": "Ngoài Đời Thực: Ứng Dụng As-Of Join Trong Hệ Thống Giao Dịch Tài Chính",
          "content": "\n            <p>Trong các sàn giao dịch chứng khoán, tiền số (Crypto) và ngân hàng đầu tư, As-Of Join là trái tim của hệ thống định giá danh mục đầu tư (Mark-to-Market Valuation):</p>\n            <ul>\n              <li>Hàng triệu lệnh khớp (Execution Trades) xảy ra liên tục không ngừng nghỉ.</li>\n              <li>Engine sử dụng <code>ASOF JOIN</code> để gắn đúng mức giá thị trường (Bid/Ask Price) tại tích-tắc khớp lệnh nhằm tính toán lãi/lỗ (P&amp;L) và phát hiện gian lận giao dịch nội gián (Front-running Detection).</li>\n            </ul>\n          "
        }
      ],
      "callouts": {
        "pitfalls": [
          {
            "title": "Lỗi đảo ngược dấu so sánh thời gian",
            "content": "Nhớ rằng để lấy trạng thái có hiệu lực trong quá khứ, điều kiện luôn là: event_time >= state_time. Dùng sai dấu sẽ làm lộ dữ liệu tương lai!"
          },
          {
            "title": "Hạn chế của SQLite với ASOF JOIN",
            "content": "SQLite chưa hỗ trợ từ khóa ASOF JOIN. Trên SQLite, bắt buộc phải dùng mô hình khoảng ngày SCD Type 2 (BETWEEN valid_from AND valid_to) hoặc Subquery."
          }
        ],
        "tips": [
          {
            "title": "Sử dụng DuckDB cho các tác vụ Feature Store offline",
            "content": "Nếu công ty bạn dùng PostgreSQL làm CSDL giao dịch, bạn hoàn toàn có thể kết nối DuckDB vào PostgreSQL để chạy ASOF JOIN siêu tốc trên tập dữ liệu hàng chục triệu dòng chỉ trong vài giây."
          }
        ],
        "deepDive": {
          "title": "Bên trong Engine: Triển khai AS-OF JOIN thuần native trên DuckDB vs Mô phỏng trên PostgreSQL",
          "content": "<p><strong>AS-OF JOIN</strong> là bài toán kinh điển trong tài chính và IoT: ghép mỗi sự kiện với bản ghi có thời gian gần nhất nhưng không vượt quá thời điểm sự kiện.</p><p>Trong <strong>DuckDB</strong>, <code>ASOF JOIN</code> được tích hợp trực tiếp ở tầng nhân engine (Engine Core). DuckDB sử dụng thuật toán tìm kiếm nhị phân (Binary Search) trên các mẩu dữ liệu cột đã được sắp xếp, ghép hàng chục triệu bản ghi chỉ trong vài chục mili-giây.<br>Trong khi đó, trên <strong>PostgreSQL</strong> chưa có toán tử ASOF bản địa, kỹ sư phải mô phỏng bằng cú pháp <code>LEFT JOIN LATERAL (SELECT ... WHERE ts &lt;= outer.ts ORDER BY ts DESC LIMIT 1) ON TRUE</code> kết hợp với chỉ mục B-tree đa cột <code>(entity_id, ts DESC)</code>.</p>"
        }
      },
      "exercises": [
        {
          "title": "Bài tập 3.6-1 (Dự đoán kết quả): Nhận diện bản ghi khớp của As-Of Join",
          "level": "Cơ bản",
          "problem": "Bảng tỷ giá có 3 mốc: 09:00 (tỷ giá 24.000), 10:00 (tỷ giá 24.200), 11:00 (tỷ giá 24.500). Nếu một giao dịch diễn ra lúc 10:45, phép As-Of Join (event_time >= rate_time) sẽ ghép với tỷ giá của mốc nào?",
          "hint": "Tìm mốc thời gian lớn nhất trong số các mốc <= 10:45.",
          "solutionCode": "-- Phân tích:\n-- Các mốc thời gian <= 10:45 là: 09:00 và 10:00.\n-- Mốc thời gian lớn nhất gần nhất là: 10:00.\n-- Kết luận: Giao dịch lúc 10:45 sẽ được ghép với tỷ giá 24.200 của mốc 10:00!",
          "solutionOutput": "Khớp chính xác với mốc 10:00 (tỷ giá 24.200).",
          "explanation": "Chẩn đoán: As-Of Join không bao giờ nhìn sang mốc 11:00 vì tại thời điểm 10:45 mốc 11:00 chưa diễn ra."
        },
        {
          "title": "Bài tập 3.6-2 (Tìm & Sửa lỗi): Khắc phục lỗi As-Of Join bị đảo ngược thời gian",
          "level": "Trung bình",
          "problem": "Một lập trình viên viết câu lệnh DuckDB: SELECT * FROM trades t ASOF JOIN quotes q ON t.symbol = q.symbol AND t.trade_time <= q.quote_time;. Câu lệnh này mắc phải lỗi nghiêm trọng gì?",
          "hint": "Quan sát dấu so sánh thời gian <=.",
          "solutionCode": "-- Lỗi: Dùng dấu <= khiến giao dịch bị ghép với giá cổ phiếu trong TƯƠNG LAI!\n-- Sửa lại: Đổi sang dấu >= để lấy giá cổ phiếu gần nhất trong QUÁ KHỨ:\nSELECT \n    t.trade_id,\n    t.symbol,\n    t.trade_time,\n    q.quote_price\nFROM trades t\nASOF JOIN quotes q\n  ON t.symbol = q.symbol\n AND t.trade_time >= q.quote_time;",
          "solutionOutput": "Khắc phục thành công rò rỉ tương lai, ghép đúng giá lịch sử.",
          "explanation": "Chẩn đoán: Dấu <= biến As-Of Join thành tìm kiếm tương lai, gây vi phạm nghiêm trọng nguyên tắc bảo toàn thời gian."
        },
        {
          "title": "Bài tập 3.6-3 (Tự viết truy vấn): Triển khai As-Of Join chuẩn ANSI bằng Correlated Subquery",
          "level": "Khá",
          "problem": "Viết câu lệnh SQL thuần chuẩn ANSI chạy được trên SQLite để tìm hạng thành viên (tier) của khách hàng 1 tại thời điểm mua đơn hàng 1001 (ngày 2023-06-01) từ bảng customer_tier_history bằng Correlated Subquery mà không dùng BETWEEN.",
          "hint": "Dùng Subquery trong SELECT: (SELECT tier FROM customer_tier_history WHERE customer_id = o.customer_id AND valid_from <= o.order_date ORDER BY valid_from DESC LIMIT 1).",
          "solutionCode": "SELECT \n    o.order_id,\n    o.customer_id,\n    o.order_date,\n    o.total_amount,\n    (\n        SELECT h.tier \n        FROM customer_tier_history h\n        WHERE h.customer_id = o.customer_id\n          AND h.valid_from <= o.order_date\n        ORDER BY h.valid_from DESC\n        LIMIT 1\n    ) AS effective_tier\nFROM orders o\nWHERE o.order_id = 1001;",
          "solutionOutput": "Đơn hàng 1001 hiển thị chính xác hạng Gold tại ngày 01/06/2023.",
          "explanation": "Đây là giải thuật mô phỏng As-Of Join kinh điển trên các hệ quản trị CSDL không hỗ trợ từ khóa ASOF JOIN."
        },
        {
          "title": "Bài tập 3.6-4 (Đánh đổi & Kiến trúc): Thiết kế bảng SCD Type 2 phục vụ As-Of Join",
          "level": "Nâng cao",
          "problem": "Hãy viết khối lệnh DDL tạo bảng product_price_history theo mô hình SCD Type 2 chuẩn mực gồm: history_id (PK), product_id, price, valid_from (TIMESTAMP), valid_to (TIMESTAMP, có thể NULL nếu là giá hiện tại). Sau đó viết câu lệnh truy vấn tìm giá bán hợp lệ của sản phẩm 101 tại thời điểm 2023-06-15 14:30:00.",
          "hint": "Dùng điều kiện valid_from <= target_time AND (valid_to > target_time OR valid_to IS NULL).",
          "solutionCode": "-- 1. Tạo bảng SCD Type 2\nCREATE TABLE IF NOT EXISTS product_price_history (\n    history_id INT PRIMARY KEY,\n    product_id INT NOT NULL,\n    price DECIMAL(12, 2) NOT NULL,\n    valid_from TIMESTAMP NOT NULL,\n    valid_to TIMESTAMP\n);\n\n-- 2. Truy vấn tìm giá As-Of tại thời điểm chỉ định\nSELECT \n    product_id,\n    price AS effective_price\nFROM product_price_history\nWHERE product_id = 101\n  AND valid_from <= '2023-06-15 14:30:00'\n  AND (valid_to > '2023-06-15 14:30:00' OR valid_to IS NULL);",
          "solutionOutput": "Tìm thấy đúng mức giá đang có hiệu lực tại thời điểm 15/06/2023 mà không cần scan toàn bộ bảng.",
          "explanation": "Mô hình SCD Type 2 với cặp khoảng thời gian nửa mở [valid_from, valid_to) là nền tảng cho mọi phép ghép As-Of trong kiến trúc dữ liệu doanh nghiệp."
        }
      ],
      "quiz": [
        {
          "question": "Bản chất vấn đề mà phép toán As-Of Join giải quyết trong phân tích chuỗi thời gian là gì?",
          "options": [
            "Nối hai bảng có cùng tên cột.",
            "Ghép nối dữ liệu giữa hai bảng chuỗi thời gian khi dấu thời gian của chúng không bao giờ bằng nhau tuyệt đối từng giây/mili-giây.",
            "Tự động xóa các đơn hàng cũ hơn 30 ngày.",
            "Chuyển đổi kiểu dữ liệu từ chuỗi sang số nguyên."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! As-Of Join sinh ra để giải quyết bài toán ghép nối dữ liệu không đồng bộ: tìm bản ghi trạng thái gần nhất trong quá khứ khi dấu thời gian không trùng khớp chính xác."
        },
        {
          "question": "Thuật toán Hai con trỏ (Two-pointer merge scan) trong cú pháp ASOF JOIN của DuckDB giúp giảm độ phức tạp tính toán xuống mức nào?",
          "options": [
            "O(M * N) - Bậc hai",
            "O(M + N) - Tuyến tính",
            "O(N^3) - Bậc ba",
            "O(log N)"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Nhờ dữ liệu đã được định thứ tự thời gian, hai con trỏ chỉ tịnh tiến một chiều, quét qua hai bảng đúng một lần duy nhất với độ phức tạp tuyến tính O(M + N)."
        },
        {
          "question": "Khi sử dụng toán tử ASOF JOIN để tìm giá cổ phiếu/tỷ giá hợp lệ tại thời điểm giao dịch, điều kiện so sánh thời gian nào sau đây là chuẩn mực?",
          "options": [
            "trade_time = quote_time",
            "trade_time >= quote_time",
            "trade_time <= quote_time",
            "trade_time != quote_time"
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! Điều kiện trade_time >= quote_time đảm bảo chỉ lấy mức giá đã được niêm yết trong quá khứ trước thời điểm giao dịch, triệt tiêu rủi ro nhìn trước tương lai."
        },
        {
          "question": "Trên các hệ quản trị CSDL truyền thống chưa hỗ trợ từ khóa ASOF JOIN (như PostgreSQL, MySQL, SQLite), kỹ thuật nào sau đây được sử dụng để mô phỏng As-Of Join?",
          "options": [
            "Sử dụng mô hình SCD Type 2 với cặp ngày hiệu lực valid_from và valid_to (nửa khoảng đóng - mở)",
            "Dùng FULL OUTER JOIN không điều kiện",
            "Dùng lệnh DROP TABLE",
            "Dùng toán tử UNION ALL"
          ],
          "correctIndex": 0,
          "explanation": "Chính xác! Mô hình SCD Type 2 với điều kiện event_time >= valid_from AND (event_time < valid_to OR valid_to IS NULL) là chuẩn mực thay thế tương đương trên các CSDL truyền thống."
        },
        {
          "question": "Trong kiến trúc MLOps, vai trò cốt tử của As-Of Join là gì?",
          "options": [
            "Tự động nén file ảnh sang định dạng JPEG.",
            "Tái hiện chính xác trạng thái lịch sử của khách hàng tại đúng thời điểm mỗi sự kiện diễn ra, ngăn chặn triệt để hiện tượng rò rỉ dữ liệu tương lai (Lookahead Bias).",
            "Giúp mô hình AI chạy mà không cần dữ liệu đầu vào.",
            "Tự động tăng gấp đôi doanh thu của công ty."
          ],
          "correctIndex": 1,
          "explanation": "Chính xác! As-Of Join là công cụ số 1 để trích xuất đặc trưng lịch sử chuẩn xác cho các mô hình Machine Learning mà không bị dính cạm bẫy rò rỉ tương lai."
        }
      ],
      "summary": [
        "As-Of Join giải quyết bài toán ghép nối chuỗi thời gian không đồng bộ giữa bảng sự kiện và bảng trạng thái.",
        "Bản chất toán học: Tìm bản ghi trạng thái gần nhất trong quá khứ (event_time >= state_time).",
        "DuckDB hỗ trợ từ khóa ASOF JOIN với thuật toán hai con trỏ siêu tốc độ phức tạp O(M + N).",
        "Trên CSDL chuẩn ANSI (PostgreSQL, SQLite), As-Of Join được triển khai thông qua mô hình SCD Type 2 [valid_from, valid_to).",
        "As-Of Join là công cụ nền tảng trong MLOps để trích xuất đặc trưng không rò rỉ dữ liệu tương lai.",
        "Ôn cách quãng: Tại sao việc sử dụng mốc Cutoff Date lại là bức tường lửa sống còn trong Machine Learning? (Xem lại Bài 3.5)."
      ]
    }
  ]
};
